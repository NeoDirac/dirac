/**
 * Exam-mode engine.
 *
 * An exam = one question per selected tema. Every tema owns a pool of problems
 * (templates matched by id prefix — one pool per worksheet section). Pools are
 * ranked "hardest first": difficulty tier, then estimated time, then id — and
 * version v of the exam takes the problem at rank v (A = rank 0, B = rank 1…).
 * Everything is deterministic per (profile, version, tema) so an exam link is
 * reproducible and shareable, like any session.
 */

import type { ExamProfile, ExamTema } from "@/content/exams/profiles";
import { hashString } from "./rng";
import { instantiateProblem } from "./session";
import type { Difficulty, Problem, ProblemTemplate } from "./types";

const DIFFICULTY_RANK: Record<Difficulty, number> = {
  challenge: 3,
  hard: 2,
  medium: 1,
  easy: 0,
};

/** A tema's pool: every template whose id starts with one of its prefixes. */
export function examTemaPool(tema: ExamTema, templates: ProblemTemplate[]): ProblemTemplate[] {
  return templates.filter((t) => tema.prefixes.some((p) => t.id.startsWith(p)));
}

/** Hardest-first ordering: difficulty, then estimated time, then id (stable). */
export function rankExamPool(pool: ProblemTemplate[]): ProblemTemplate[] {
  return pool
    .slice()
    .sort(
      (a, b) =>
        DIFFICULTY_RANK[b.difficulty] - DIFFICULTY_RANK[a.difficulty] ||
        b.estimatedTimeSec - a.estimatedTimeSec ||
        (a.id < b.id ? -1 : a.id > b.id ? 1 : 0),
    );
}

export interface ExamDeckResult {
  /** the exam problems, in tema order */
  problems: Problem[];
  /** per-tema rows for the header/report, parallel to `problems` */
  rows: {
    tema: ExamTema;
    problem: Problem;
    /** rank 0 = the single hardest, 1 = second hardest… */
    rank: number;
  }[];
}

export function buildExamDeck(
  profile: ExamProfile,
  temaIds: string[],
  versionIndex: number,
  templates: ProblemTemplate[],
): ExamDeckResult {
  const wanted =
    temaIds.length > 0 ? profile.temas.filter((t) => temaIds.includes(t.id)) : profile.temas;
  const problems: Problem[] = [];
  const rows: ExamDeckResult["rows"] = [];
  for (const tema of wanted) {
    const ranked = rankExamPool(examTemaPool(tema, templates));
    if (ranked.length === 0) continue;
    const rank = Math.min(versionIndex, ranked.length - 1);
    const template = ranked[rank];
    // stable per (profile, version, tema): same link → same exam
    const seed = hashString(`${profile.id}|v${versionIndex}|${tema.id}`) || 1;
    const problem = instantiateProblem(template, seed);
    problems.push(problem);
    rows.push({ tema, problem, rank });
  }
  return { problems, rows };
}

/** Rank label used in the report: «la más difícil» / «2ª más difícil» … */
export function examRankLabel(rank: number): { es: string; en: string } {
  if (rank <= 0) return { es: "la más difícil", en: "the hardest" };
  if (rank === 1) return { es: "la 2ª más difícil", en: "the 2nd hardest" };
  return { es: `la ${rank + 1}ª más difícil`, en: `the ${rank + 1}th hardest` };
}
