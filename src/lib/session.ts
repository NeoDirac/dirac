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

  if (strict.length === 0 && config.difficulty !== "any" && config.mode !== "challenge") {
    // relax the difficulty filter rather than showing nothing
    strict = filterTemplates({ ...config, difficulty: "any" }, templates);
    relaxed = true;
  }
  if (strict.length === 0) {
    return { problems: [], difficultyRelaxed: relaxed };
  }

  const source = config.easyWeighted ? weightedPool(strict) : strict;
  const rng = new Rng(hashString(`session:${config.seed}:${batchIndex}`));
  const order = rng.shuffle(source);

  const problems: Problem[] = [];
  for (let i = 0; i < opts.batchSize; i++) {
    const globalIndex = batchIndex * 64 + i;
    let pick = order[globalIndex % order.length];
    // avoid immediate repetition when the pool allows it
    if (order.length > 1 && problems.length > 0) {
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
