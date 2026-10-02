/**
 * Session builder — turns a SessionConfig into a deck of instantiated problems.
 *
 * Deterministic: a session with the same seed always produces the same
 * problem sequence, which makes sessions deep-linkable and reproducible.
 */

import { Rng, hashString } from "./rng";
import type { Difficulty, Problem, ProblemTemplate, SessionConfig } from "./types";

export interface DeckOptions {
  /** which batch (unlimited sessions pull batches of 10) */
  batchIndex?: number;
  /** how many problems in this batch */
  batchSize: number;
  /** subtopicKey (`subject:topicId:subtopicId`) → first-try accuracy 0..1.
   *  Used only by interleaved mode to order topics weakest-first and prefer
   *  weak subtopics within a topic; every other mode ignores it. */
  weakSubtopics?: Record<string, number>;
}

export interface DeckResult {
  problems: Problem[];
  /** true when the difficulty filter had to be relaxed (topic lacks that level) */
  difficultyRelaxed: boolean;
}

function filterTemplates(config: SessionConfig, templates: ProblemTemplate[]): ProblemTemplate[] {
  let pool = templates.filter((t) => config.subjects.includes(t.subject));

  // honor an explicit topic/subtopic restriction in any mode
  if (config.topicId) {
    pool = pool.filter((t) => t.topicId === config.topicId);
    if (config.subtopicId) {
      pool = pool.filter((t) => t.subtopicId === config.subtopicId);
    }
  }
  if (config.mode === "challenge") {
    pool = pool.filter((t) => t.difficulty === "challenge");
  } else if (config.difficulty !== "any") {
    pool = pool.filter((t) => t.difficulty === config.difficulty);
  }
  if (config.excludeEasy) {
    // "serious mode": Foundation-level exercises are worked in class
    pool = pool.filter((t) => t.difficulty !== "easy");
  }
  if (config.curatedOnly) {
    pool = pool.filter((t) => Boolean(t.source));
  }
  return pool;
}

function weightedPool(pool: ProblemTemplate[]): ProblemTemplate[] {
  // quick-practice bias toward accessible levels
  const out: ProblemTemplate[] = [];
  for (const t of pool) {
    const w = t.difficulty === "easy" ? 3 : t.difficulty === "medium" ? 2 : 1;
    for (let i = 0; i < w; i++) out.push(t);
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Interleaved consolidation ("Repaso integrador")                     */
/* ------------------------------------------------------------------ */

/** subtopicKey of a template (matches progress.subtopicKey). */
const subtopicKeyOf = (t: ProblemTemplate) => `${t.subject}:${t.topicId}:${t.subtopicId}`;

/** First-try accuracy of a template's subtopic. Unknown subtopics count as 1
 *  ("not weak") so they never outrank a measured weakness — a fresh student
 *  simply gets the plain shuffled round-robin. */
function accuracyOf(t: ProblemTemplate, weak: Record<string, number> | undefined): number {
  if (!weak) return 1;
  const a = weak[subtopicKeyOf(t)];
  return typeof a === "number" && a >= 0 ? a : 1;
}

interface InterleaveGroup {
  key: string;
  templates: ProblemTemplate[];
  /** mean first-try accuracy across templates with history — lower = weaker */
  weakness: number;
}

/** Group the pool by topicId (falls back to subtopicId when the whole pool is
 *  a single topic, so even a one-topic pool still interleaves its sections). */
function groupPool(pool: ProblemTemplate[], weak: Record<string, number> | undefined): InterleaveGroup[] {
  const byKey = new Map<string, ProblemTemplate[]>();
  for (const t of pool) {
    const list = byKey.get(t.topicId);
    if (list) list.push(t);
    else byKey.set(t.topicId, [t]);
  }
  if (byKey.size <= 1) {
    byKey.clear();
    for (const t of pool) {
      const list = byKey.get(t.subtopicId);
      if (list) list.push(t);
      else byKey.set(t.subtopicId, [t]);
    }
  }
  const groups: InterleaveGroup[] = [];
  for (const [key, templates] of byKey) {
    const known = weak
      ? templates
          .map((t) => weak[subtopicKeyOf(t)])
          .filter((a): a is number => typeof a === "number" && a >= 0)
      : [];
    groups.push({
      key,
      templates,
      weakness: known.length > 0 ? known.reduce((a, b) => a + b, 0) / known.length : 1,
    });
  }
  return groups;
}

/**
 * Interleaved sequence with discipline — the answer to "los temas van de forma
 * lineal": strict round-robin through topic groups (weakest first), so no two
 * consecutive problems come from the same topic and each pass touches as many
 * different topics as the pool allows. Within a topic, weaker subtopics are
 * dealt first. When a topic's stack is spent it is re-dealt (fresh shuffle),
 * keeping the spacing alive for long sessions. All randomness flows through
 * the provided Rng → deterministic per seed; the stream is generated left to
 * right, so requesting a longer length keeps the same prefix (batches of an
 * unlimited session continue the rotation seamlessly).
 */
function interleavedOrder(
  pool: ProblemTemplate[],
  weak: Record<string, number> | undefined,
  rng: Rng,
  length: number,
): ProblemTemplate[] {
  const groups = groupPool(pool, weak);
  if (groups.length === 0) return [];

  // fixed group order: random tiebreak, then weakest-first (stable sort)
  const queues = rng
    .shuffle(groups)
    .sort((a, b) => a.weakness - b.weakness)
    .map((g) => ({ key: g.key, templates: g.templates, queue: dealStack(g.templates, weak, rng) }));

  const order: ProblemTemplate[] = [];
  let last = queues.length - 1; // so the first pick comes from queues[0] (weakest)
  while (order.length < length) {
    last = (last + 1) % queues.length;
    const q = queues[last];
    if (q.queue.length === 0) q.queue = dealStack(q.templates, weak, rng);
    order.push(q.queue.shift()!);
  }
  return order;
}

/** One shuffled stack of a group's templates, weak subtopics dealt first. */
function dealStack(
  templates: ProblemTemplate[],
  weak: Record<string, number> | undefined,
  rng: Rng,
): ProblemTemplate[] {
  const shuffled = rng.shuffle(templates);
  if (!weak) return shuffled;
  // stable sort keeps the shuffle as tiebreak between equally-known subtopics
  return shuffled.slice().sort((a, b) => accuracyOf(a, weak) - accuracyOf(b, weak));
}

export function buildDeck(
  config: SessionConfig,
  templates: ProblemTemplate[],
  opts: DeckOptions,
): DeckResult {
  const batchIndex = opts.batchIndex ?? 0;

  // single-problem share links: pin the deck to exactly one template+seed
  if (config.mode === "single" && config.singleTemplateId) {
    const tpl = templates.find((t) => t.id === config.singleTemplateId);
    if (!tpl) return { problems: [], difficultyRelaxed: false };
    return {
      problems: [instantiateProblem(tpl, config.seed || 1)],
      difficultyRelaxed: false,
    };
  }

  let strict = filterTemplates(config, templates);
  let relaxed = false;

  if (
    strict.length === 0 &&
    (config.difficulty !== "any" || config.excludeEasy) &&
    config.mode !== "challenge"
  ) {
    // relax the difficulty/excludeEasy filters rather than showing nothing
    strict = filterTemplates({ ...config, difficulty: "any", excludeEasy: false }, templates);
    relaxed = true;
  }
  if (strict.length === 0) {
    return { problems: [], difficultyRelaxed: relaxed };
  }

  const source = config.easyWeighted ? weightedPool(strict) : strict;
  const rng = new Rng(hashString(`session:${config.seed}:${batchIndex}`));

  // interleaved consolidation: one deterministic stream per seed — each batch
  // continues the rotation exactly where the previous one ended, so the topic
  // spacing never breaks at a batch seam
  const batchOffset = batchIndex * opts.batchSize;
  const interleave = config.mode === "interleaved"
    ? interleavedOrder(
        strict,
        opts.weakSubtopics,
        new Rng(hashString(`interleave:${config.seed}`)),
        batchOffset + opts.batchSize,
      )
    : null;
  const order = interleave ?? rng.shuffle(source);

  const problems: Problem[] = [];
  for (let i = 0; i < opts.batchSize; i++) {
    // problem-seed space (64 slots per batch — stable across modes, keeps
    // variants fresh); the interleaved stream uses its own dense positions
    const globalIndex = batchIndex * 64 + i;
    let pick = interleave ? order[batchOffset + i] : order[globalIndex % order.length];
    // avoid immediate repetition when the pool allows it (plain modes)
    if (!interleave && order.length > 1 && problems.length > 0) {
      const prev = problems[problems.length - 1].templateId;
      let guard = 0;
      while (pick.id === prev && guard < 8) {
        const alt = order[(globalIndex + guard + 1) % order.length];
        if (alt.id !== prev) { pick = alt; break; }
        guard++;
      }
    }
    // fresh variant per occurrence
    const problemSeed = hashString(`${config.seed}|${pick.id}|${globalIndex}`) || 1;
    const prng = new Rng(problemSeed);
    const content = pick.generate(prng);
    problems.push({
      ...content,
      templateId: pick.id,
      seed: problemSeed,
      subject: pick.subject,
      topicId: pick.topicId,
      subtopicId: pick.subtopicId,
      difficulty: pick.difficulty,
      questionType: pick.questionType,
      estimatedTimeSec: pick.estimatedTimeSec,
      tags: pick.tags,
      prerequisites: pick.prerequisites,
      source: pick.source,
      reasoning: pick.reasoning,
    });
  }
  return { problems, difficultyRelaxed: relaxed };
}

/* ------------------------------------------------------------------ */
/* Instantiation helpers                                               */
/* ------------------------------------------------------------------ */

/** Instantiate a single template with a fresh seed (used by "new variant"). */
export function instantiateProblem(
  template: ProblemTemplate,
  seed: number,
): Problem {
  const prng = new Rng(seed);
  const content = template.generate(prng);
  return {
    ...content,
    templateId: template.id,
    seed,
    subject: template.subject,
    topicId: template.topicId,
    subtopicId: template.subtopicId,
    difficulty: template.difficulty,
    questionType: template.questionType,
    estimatedTimeSec: template.estimatedTimeSec,
    tags: template.tags,
    prerequisites: template.prerequisites,
    source: template.source,
    reasoning: template.reasoning,
  };
}

export function findTemplate(
  templates: ProblemTemplate[],
  id: string,
): ProblemTemplate | undefined {
  return templates.find((t) => t.id === id);
}

/* ------------------------------------------------------------------ */
/* Template statistics for catalog pages                               */
/* ------------------------------------------------------------------ */

export interface TemplateStats {
  total: number;
  byDifficulty: Record<Difficulty, number>;
  subtopicIds: string[];
  hasParameterized: boolean;
}

export function templateStats(templates: ProblemTemplate[]): TemplateStats {
  const byDifficulty: Record<Difficulty, number> = { easy: 0, medium: 0, hard: 0, challenge: 0 };
  const subtopics = new Set<string>();
  let hasParameterized = false;
  for (const t of templates) {
    byDifficulty[t.difficulty] += 1;
    subtopics.add(t.subtopicId);
    // heuristic: template using rng beyond first call is parameterized —
    // conservatively flag templates whose generate uses the rng meaningfully
    try {
      const rng = new Rng(7);
      const a = JSON.stringify(t.generate(rng));
      const rng2 = new Rng(991);
      const b = JSON.stringify(t.generate(rng2));
      if (a !== b) hasParameterized = true;
    } catch {
      /* validation script reports generator errors */
    }
  }
  return { total: templates.length, byDifficulty, subtopicIds: [...subtopics], hasParameterized };
}
