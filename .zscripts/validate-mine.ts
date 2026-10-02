/** Targeted validator for the files authored by agent 2-d (same checks as validate-bank.ts). */
import { physicsCurriculum } from "../src/content/curriculum/physics";
import { Rng } from "../src/lib/rng";
import { parseExpression, collectVars } from "../src/lib/validation/expression";
import type { ProblemContent, ProblemTemplate, SolutionStage } from "../src/lib/types";

const VALID_STAGES: SolutionStage[] = ["given", "approach", "calculation", "result"];
const files = process.argv.slice(2);
let errors = 0;
let warnings = 0;
const err = (m: string) => { errors++; console.error(`  ✗ ${m}`); };
const warn = (m: string) => { warnings++; console.warn(`  ⚠ ${m}`); };

function checkBilingual(where: string, field: string, v: { es: unknown; en: unknown } | undefined): void {
  if (!v) { err(`${where}: missing ${field}`); return; }
  for (const loc of ["es", "en"] as const) {
    const val = v[loc];
    if (typeof val !== "string" || val.trim().length === 0) err(`${where}: ${field}.${loc} is empty`);
  }
}

function validateContent(t: ProblemTemplate, c: ProblemContent, where: string): void {
  checkBilingual(where, "skill", c.skill);
  checkBilingual(where, "statement", c.statement);
  checkBilingual(where, "answerDisplay", c.answerDisplay);
  const dollarCount = (c.statement.es.match(/\$/g) ?? []).length;
  if (dollarCount % 2 !== 0) warn(`${where}: statement.es has an odd number of '$' delimiters`);
  const dollarCountEn = (c.statement.en.match(/\$/g) ?? []).length;
  if (dollarCountEn % 2 !== 0) warn(`${where}: statement.en has an odd number of '$' delimiters`);
  if (c.hints.length < 1 || c.hints.length > 3) err(`${where}: must have 1–3 hints (has ${c.hints.length})`);
  c.hints.forEach((h, i) => checkBilingual(where, `hint ${i + 1}`, h));
  const solution = c.solution as unknown;
  const solutionLists: [string, unknown[]][] = Array.isArray(solution)
    ? [["steps", solution]]
    : solution && typeof solution === "object" && "es" in solution && "en" in solution
      ? [["es", (solution as { es: unknown[] }).es], ["en", (solution as { en: unknown[] }).en]]
      : [];
  if (solutionLists.length === 0) err(`${where}: solution must be a step array or an L10n object`);
  for (const [loc, list] of solutionLists) {
    if (!Array.isArray(list) || list.length < 2) { err(`${where}: solution.${loc} must have at least 2 steps`); continue; }
    for (let i = 0; i < list.length; i++) {
      const st = list[i] as { stage: string; content: { es: unknown; en: unknown } };
      if (!st || !VALID_STAGES.includes(st.stage as SolutionStage)) err(`${where}: solution.${loc} step ${i + 1} has invalid stage '${st?.stage}'`);
      checkBilingual(where, `solution.${loc} step ${i + 1}`, st?.content);
    }
  }
  const a = c.answer as ProblemContent["answer"] & { options?: { id: string; correct?: boolean }[] };
  switch (a.kind) {
    case "numeric":
    case "numeric-unit": {
      if (!Number.isFinite(a.value)) err(`${where}: numeric answer value is not finite`);
      if (a.kind === "numeric-unit" && (!a.units || a.units.length === 0)) err(`${where}: numeric-unit answer has no accepted units`);
      break;
    }
    case "expression": {
      if (!a.accepted || a.accepted.length === 0) err(`${where}: expression answer has no accepted forms`);
      else {
        for (const acc of a.accepted) {
          try { parseExpression(acc); } catch (e) { err(`${where}: accepted expression '${acc}' does not parse (${(e as Error).message})`); }
        }
        if (a.variables) for (const v of a.variables) if (!/^[a-zA-Z]+$/.test(v)) err(`${where}: invalid variable name '${v}'`);
      }
      break;
    }
    case "multiple-choice": {
      const opts = a.options ?? [];
      if (opts.length < 2) err(`${where}: MC needs ≥ 2 options`);
      const correct = opts.filter((o) => o.correct);
      if (correct.length !== 1) err(`${where}: MC must have exactly 1 correct option (has ${correct.length})`);
      const ids = new Set(opts.map((o) => o.id));
      if (ids.size !== opts.length) err(`${where}: MC option ids are not unique`);
      for (const o of opts) checkBilingual(where, `option ${o.id}`, o.text);
      break;
    }
    case "text": {
      if (!a.accepted || a.accepted.length === 0) err(`${where}: text answer has no accepted strings`);
      break;
    }
    default: err(`${where}: unknown answer kind`);
  }
  if (c.diagram) {
    const d = c.diagram as { kind: string; curves?: { fn: string }[] };
    const kinds = ["function-graph", "vectors", "projectile", "unit-circle", "right-triangle", "free-body"];
    if (!kinds.includes(d.kind)) err(`${where}: unknown diagram kind '${d.kind}'`);
    if (d.kind === "function-graph") {
      for (const curve of d.curves ?? []) {
        try {
          const ast = parseExpression(curve.fn);
          const vars = collectVars(ast);
          if (!vars.has("x") && vars.size > 0) warn(`${where}: diagram curve '${curve.fn}' does not use x`);
        } catch (e) { err(`${where}: diagram curve '${curve.fn}' does not parse (${(e as Error).message})`); }
      }
    }
  }
}

async function main() {
  const seenIds = new Set<string>();
  let total = 0;
  const curriculumTopics = new Map<string, Set<string>>();
  for (const t of physicsCurriculum) curriculumTopics.set(t.id, new Set(t.subtopics.map((s) => s.id)));
  for (const f of files) {
    const mod = await import(f);
    const templates: ProblemTemplate[] = mod.templates;
    console.log(`${f}: ${templates.length} templates`);
    for (const t of templates) {
      total++;
      const where = `[${t.topicId}] ${t.id}`;
      let hadError = false;
      if (seenIds.has(t.id)) { err(`${where}: duplicate template id`); hadError = true; }
      seenIds.add(t.id);
      if (!curriculumTopics.has(t.topicId)) { err(`${where}: topicId '${t.topicId}' not in curriculum`); hadError = true; }
      else if (!curriculumTopics.get(t.topicId)!.has(t.subtopicId)) { err(`${where}: subtopicId '${t.subtopicId}' not in topic '${t.topicId}'`); hadError = true; }
      for (const seed of [1, 4242, 999983]) {
        try {
          const c = t.generate(new Rng(seed));
          validateContent(t, c, `${where} (seed ${seed})`);
        } catch (e) { err(`${where} (seed ${seed}): generator threw: ${(e as Error).message}`); hadError = true; }
      }
      if (!hadError) console.log(`  ✓ ${where} [${t.difficulty}/${t.questionType}]`);
    }
  }
  console.log(`\n${total} templates · ${errors} errors · ${warnings} warnings`);
  if (errors > 0) process.exit(1);
}

main().catch((e) => { console.error(e); process.exit(1); });
