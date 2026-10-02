/**
 * Content policy for the math section (tutor's directive, 2026-10-02):
 *
 *   "En la sección de matemáticas solo permitiré que los ejercicios de
 *    nivel fácil sean los generados; arriba de eso solo pueden ser
 *    ejercicios de fuentes reales, si no hay aún suficientes ejercicios
 *    deberás marcarlos."
 *
 * Only Foundation-level (easy) math exercises may be procedurally
 * generated. Every Standard/Advanced/Challenge math exercise must be
 * transcribed from a real source (template.source). Generated templates
 * above easy are KEPT in the bank — the tutor will progressively replace
 * them with real material (ESPOL book and others) — but they must be
 * MARKED as provisional everywhere they surface.
 *
 * Physics is out of scope: only the math section is governed by this rule.
 */

import type { Difficulty, ProblemTemplate, Subject } from "@/lib/types";

/** Minimal shape needed to evaluate the policy (works for templates and problems). */
export interface PolicyProbe {
  subject: Subject;
  difficulty: Difficulty;
  source?: unknown;
}

/**
 * True when a template/problem violates the math content policy:
 * a math exercise above "easy" that was generated (no real source).
 * These are provisional and awaiting replacement by real-source material.
 */
export function isPendingRealSource(t: PolicyProbe): boolean {
  return t.subject === "math" && t.difficulty !== "easy" && !t.source;
}

export interface TopicPolicyStats {
  /** medium+ templates in the pool */
  mediumPlus: number;
  /** of those, how many carry a real source */
  withSource: number;
  /** generated ones pending replacement (= mediumPlus - withSource) */
  pending: number;
}

/** Policy stats for a set of templates (a topic or subtopic pool). */
export function topicPolicyStats(templates: ProblemTemplate[]): TopicPolicyStats {
  const mediumPlus = templates.filter((t) => t.difficulty !== "easy");
  const withSource = mediumPlus.filter((t) => t.source).length;
  return { mediumPlus: mediumPlus.length, withSource, pending: mediumPlus.length - withSource };
}
