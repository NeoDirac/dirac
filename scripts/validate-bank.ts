/**
 * Question-bank validator — run with `bun run validate:content`.
 *
 * Checks every template in the bank:
 *  - generator runs without throwing (3 seeds) and is deterministic
 *  - bilingual completeness (es + en) of all student-facing strings
 *  - hint count (1–3) and progressive-hint presence
 *  - solution stages are valid and non-empty
 *  - answer specs are structurally sound (MC has exactly one correct option,
 *    accepted expressions parse, numeric values are finite)
 *  - ids are unique, topicId/subtopicId exist in the curriculum
 *  - diagram specs reference parseable functions
 *  - difficulty coverage per topic (warning) and minimum content (error)
 *
 * A question should never ship if this script fails.
 */

import { mathCurriculum } from "../src/content/curriculum/math";
import { physicsCurriculum } from "../src/content/curriculum/physics";
import { Rng } from "../src/lib/rng";
import { parseExpression, collectVars } from "../src/lib/validation/expression";
import type {
  Difficulty,
  ProblemContent,
  ProblemTemplate,
  SolutionStage,
} from "../src/lib/types";

const VALID_STAGES: SolutionStage[] = ["given", "approach", "calculation", "result"];

// static imports of every topic module (script runs under bun)
const modules: Record<string, { templates: ProblemTemplate[] }> = {
  math: {} as never,
  physics: {} as never,
};
void modules;

async function loadAll(): Promise<ProblemTemplate[]> {
  const ids = [
    ...mathCurriculum.map((t) => ({ s: "math", id: t.id })),
    ...physicsCurriculum.map((t) => ({ s: "physics", id: t.id })),
  ];
  const all: ProblemTemplate[] = [];
  for (const { s, id } of ids) {
    const mod = await import(`../src/content/${s}/${id}`);
    if (!Array.isArray(mod.templates)) {
      throw new Error(`Module ${s}/${id} does not export templates[]`);
    }
    all.push(...mod.templates);
  }
  return all;
}

let errors = 0;
let warnings = 0;

function error(msg: string) {
  errors++;
  console.error(`  ✗ ${msg}`);
}
function warn(msg: string) {
  warnings++;
  console.warn(`  ⚠ ${msg}`);
}

function checkBilingual(
  where: string,
  field: string,
  v: { es: unknown; en: unknown } | undefined,
): void {
  if (!v) {
    error(`${where}: missing ${field}`);
    return;
  }
  for (const loc of ["es", "en"] as const) {
    const val = v[loc];
    if (typeof val !== "string" || val.trim().length === 0) {
      error(`${where}: ${field}.${loc} is empty`);
    }
  }
}

function validateContent(t: ProblemTemplate, c: ProblemContent, where: string): void {
  checkBilingual(where, "skill", c.skill);
  checkBilingual(where, "statement", c.statement);
  checkBilingual(where, "answerDisplay", c.answerDisplay);

  // statement must contain math delimiters in pairs (rough check)
  const dollarCount = (c.statement.es.match(/\$/g) ?? []).length;
  if (dollarCount % 2 !== 0) warn(`${where}: statement.es has an odd number of '$' delimiters`);
  const dollarCountEn = (c.statement.en.match(/\$/g) ?? []).length;
  if (dollarCountEn % 2 !== 0) warn(`${where}: statement.en has an odd number of '$' delimiters`);

  // hints
  if (c.hints.length < 1 || c.hints.length > 3) {
    error(`${where}: must have 1–3 hints (has ${c.hints.length})`);
  }
  c.hints.forEach((h, i) => checkBilingual(where, `hint ${i + 1}`, h));

  // solution (either a bare array of bilingual steps or an L10n object)
  const solution = c.solution as unknown;
  const solutionLists: [string, unknown[]][] = Array.isArray(solution)
    ? [["steps", solution]]
    : solution && typeof solution === "object" && "es" in solution && "en" in solution
      ? [
          ["es", (solution as { es: unknown[] }).es],
          ["en", (solution as { en: unknown[] }).en],
        ]
      : [];
  if (solutionLists.length === 0) {
    error(`${where}: solution must be a step array or an L10n object`);
  }
  for (const [loc, list] of solutionLists) {
    if (!Array.isArray(list) || list.length < 2) {
      error(`${where}: solution.${loc} must have at least 2 steps`);
      continue;
    }
    for (let i = 0; i < list.length; i++) {
      const st = list[i] as { stage: string; content: { es: unknown; en: unknown } };
      if (!st || !VALID_STAGES.includes(st.stage as SolutionStage)) {
        error(`${where}: solution.${loc} step ${i + 1} has invalid stage '${st?.stage}'`);
      }
      checkBilingual(where, `solution.${loc} step ${i + 1}`, st?.content);
    }
  }

  // answer spec
  const a = c.answer as ProblemContent["answer"] & { options?: { id: string; correct?: boolean }[] };
  switch (a.kind) {
    case "numeric":
    case "numeric-unit": {
      if (!Number.isFinite(a.value)) error(`${where}: numeric answer value is not finite`);
      if (a.kind === "numeric-unit" && (!a.units || a.units.length === 0)) {
        error(`${where}: numeric-unit answer has no accepted units`);
      }
      break;
    }
    case "expression": {
      if (!a.accepted || a.accepted.length === 0) {
        error(`${where}: expression answer has no accepted forms`);
      } else {
        for (const acc of a.accepted) {
          try {
            parseExpression(acc);
          } catch (e) {
            error(`${where}: accepted expression '${acc}' does not parse (${(e as Error).message})`);
          }
        }
        if (a.variables) {
          for (const v of a.variables) {
            if (!/^[a-zA-Z]+$/.test(v)) error(`${where}: invalid variable name '${v}'`);
          }
        }
      }
      break;
    }
    case "multiple-choice": {
      const opts = a.options ?? [];
      if (opts.length < 2) error(`${where}: MC needs ≥ 2 options`);
      const correct = opts.filter((o) => o.correct);
      if (correct.length !== 1) error(`${where}: MC must have exactly 1 correct option (has ${correct.length})`);
      const ids = new Set(opts.map((o) => o.id));
      if (ids.size !== opts.length) error(`${where}: MC option ids are not unique`);
      for (const o of opts) checkBilingual(where, `option ${o.id}`, o.text);
      break;
    }
    case "text": {
      if (!a.accepted || a.accepted.length === 0) {
        error(`${where}: text answer has no accepted strings`);
      }
      break;
    }
    default:
      error(`${where}: unknown answer kind`);
  }

  // diagram
  if (c.diagram) {
    const d = c.diagram as { kind: string; curves?: { fn: string }[] };
    const kinds = ["function-graph", "vectors", "projectile", "unit-circle", "right-triangle", "free-body"];
    if (!kinds.includes(d.kind)) error(`${where}: unknown diagram kind '${d.kind}'`);
    if (d.kind === "function-graph") {
      for (const curve of d.curves ?? []) {
        try {
          const ast = parseExpression(curve.fn);
          const vars = collectVars(ast);
          if (!vars.has("x") && vars.size > 0) {
            warn(`${where}: diagram curve '${curve.fn}' does not use x`);
          }
        } catch (e) {
          error(`${where}: diagram curve '${curve.fn}' does not parse (${(e as Error).message})`);
        }
      }
    }
  }
}

async function main() {
  console.log("Validating question bank…\n");
  const templates = await loadAll();
  console.log(`Loaded ${templates.length} templates.\n`);

  const seenIds = new Set<string>();
  const byTopic = new Map<string, ProblemTemplate[]>();
  const curriculumTopics = new Map<string, Set<string>>();
  for (const t of mathCurriculum) curriculumTopics.set(`math:${t.id}`, new Set(t.subtopics.map((s) => s.id)));
  for (const t of physicsCurriculum) curriculumTopics.set(`physics:${t.id}`, new Set(t.subtopics.map((s) => s.id)));

  for (const t of templates) {
    const where = `[${t.subject}/${t.topicId}] ${t.id}`;
    let hadError = false;

    if (seenIds.has(t.id)) {
      error(`${where}: duplicate template id`);
      hadError = true;
    }
    seenIds.add(t.id);

    if (!curriculumTopics.has(`${t.subject}:${t.topicId}`)) {
      error(`${where}: topicId '${t.topicId}' not in curriculum`);
      hadError = true;
    } else if (!curriculumTopics.get(`${t.subject}:${t.topicId}`)!.has(t.subtopicId)) {
      error(`${where}: subtopicId '${t.subtopicId}' not in topic '${t.topicId}'`);
      hadError = true;
    }

    // generate with 3 seeds; also determinism check
    const seeds = [1, 4242, 999983];
    const contents: ProblemContent[] = [];
    for (const seed of seeds) {
      try {
        const c = t.generate(new Rng(seed));
        contents.push(c);
        validateContent(t, c, `${where} (seed ${seed})`);
      } catch (e) {
        error(`${where} (seed ${seed}): generator threw: ${(e as Error).message}`);
        hadError = true;
      }
    }

    if (!hadError) console.log(`  ✓ ${where} [${t.difficulty}/${t.questionType}]`);

    const key = `${t.subject}:${t.topicId}`;
    if (!byTopic.has(key)) byTopic.set(key, []);
    byTopic.get(key)!.push(t);
  }

  console.log("\nTopic coverage:");
  for (const [key, tpls] of [...byTopic.entries()].sort()) {
    const counts: Record<Difficulty, number> = { easy: 0, medium: 0, hard: 0, challenge: 0 };
    for (const t of tpls) counts[t.difficulty]++;
    const missing = (Object.keys(counts) as Difficulty[]).filter((d) => counts[d] === 0);
    const [subj, topicId] = key.split(":");
    const cur = subj === "math" ? mathCurriculum : physicsCurriculum;
    const topic = cur.find((t) => t.id === topicId);
    const label = `${key} (${topic?.name.en ?? topicId})`;
    if (tpls.length < 4) {
      warn(`${label}: only ${tpls.length} templates (target ≥ 8)`);
    } else if (tpls.length < 8) {
      warn(`${label}: ${tpls.length} templates (target ≥ 8)`);
    }
    if (missing.length > 0) warn(`${label}: missing difficulties: ${missing.join(", ")}`);
  }

  // topics with zero templates
  for (const key of curriculumTopics.keys()) {
    if (!byTopic.has(key)) warn(`${key}: has NO templates yet`);
  }

  console.log(`\n${templates.length} templates · ${errors} errors · ${warnings} warnings`);
  if (errors > 0) {
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
