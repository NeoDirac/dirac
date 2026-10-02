/**
 * Problem template factory + small authoring helpers.
 *
 * Authors write content files like:
 *
 *   export const templates: ProblemTemplate[] = [
 *     template({
 *       id: "lin-eq-two-step",
 *       subject: "math",
 *       topicId: "linear-equations",
 *       subtopicId: "multi-step",
 *       difficulty: "easy",
 *       questionType: "numeric",
 *       estimatedTimeSec: 90,
 *       tags: ["equations"],
 *       prerequisites: ["foundations"],
 *     }, (rng) => {
 *       const a = rng.nonZeroInt(2, 9);
 *       ...
 *       return { skill: ..., statement: ..., answer: ..., hints: ..., ... };
 *     }),
 *   ];
 */

import type {
  L10n,
  ProblemContent,
  ProblemTemplate,
  SolutionStage,
  SolutionStep,
} from "./types";

export type TemplateMeta = Omit<ProblemTemplate, "generate">;

export function template(
  meta: TemplateMeta,
  generate: (rng: import("./rng").Rng) => ProblemContent,
): ProblemTemplate {
  return { ...meta, generate };
}

/** bilingual literal helper */
export const L = <T>(es: T, en: T): L10n<T> => ({ es, en });

/** staged solution helper */
export function step(
  stage: SolutionStage,
  es: string,
  en: string,
): SolutionStep {
  return { stage, content: { es, en } };
}

/* ------------------------------------------------------------------ */
/* Number formatting helpers for generated content                     */
/* ------------------------------------------------------------------ */

/** Trims floating point noise: 0.30000000000000004 → 0.3 */
export function round(n: number, decimals = 6): number {
  const f = Math.pow(10, decimals);
  return Math.round(n * f) / f;
}

/**
 * Formats a number for embedding in plain (non-math) text.
 * Uses the locale decimal separator. Inside $...$ math mode authors should
 * prefer {{token}} syntax handled by MathText.
 */
export function num(n: number, locale: "es" | "en"): string {
  return formatNumberToken(n, locale);
}

/** Renders a number for a {{token}}: comma decimal for es, point for en. */
export function formatNumberToken(n: number, locale: "es" | "en"): string {
  const s =
    Math.abs(n) >= 1e15
      ? n.toExponential(3)
      : String(round(n, 10));
  return locale === "es" ? s.replace(".", ",") : s;
}

/**
 * Locale-format token for use inside template literals:
 *   `La masa es $${tok(m)}\\ \\text{kg}$`  →  renders "m" with a comma
 *   decimal separator in Spanish and a point in English.
 */
export function tok(n: number | string): string {
  return `{{${n}}}`;
}

/** Formats a fraction a/b as LaTeX \frac (used inside math mode). */
export function frac(a: number | string, b: number | string): string {
  return `\\frac{${a}}{${b}}`;
}

/** Formats a signed coefficient for expressions, e.g. coefTerm(3,"x") → "3x", coefTerm(-1,"x") → "-x" */
export function coefTerm(c: number, v: string): string {
  if (c === 1) return v;
  if (c === -1) return `-${v}`;
  return `${c}${v}`;
}
