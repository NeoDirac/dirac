/**
 * Exam profiles — tutor-defined exam blueprints for the EXAM MODE (#/exam).
 *
 * A profile models one exam the tutor prepares for one student: a fixed tema
 * list (each tema = one worksheet section / course unit, backed by a pool of
 * real-source problems identified by template-id prefixes) plus one or more
 * VERSIONS. Each version draws, for every selected tema, the single most
 * difficult problem of that tema's pool (version index 0), the second most
 * difficult (index 1), and so on — see src/lib/exams.ts.
 *
 * Add new profiles by appending to examProfiles — the #/exam view picks them
 * up automatically.
 */

import { l10n } from "@/lib/types";

export interface ExamTema {
  /** stable key used in the #/session?m=exam&tp=… deep link */
  id: string;
  name: { es: string; en: string };
  /** template-id prefixes that make up this tema's problem pool */
  prefixes: string[];
}

export interface ExamVersion {
  /** short label, e.g. "A" */
  label: string;
  description: { es: string; en: string };
}

export interface ExamProfile {
  id: string;
  /** student this exam is prepared for */
  student: string;
  title: { es: string; en: string };
  subtitle: { es: string; en: string };
  versions: ExamVersion[];
  temas: ExamTema[];
}

export const examProfiles: ExamProfile[] = [
  {
    id: "pedro-parcial1",
    student: "Pedro",
    title: l10n(
      "Examen de repaso · 1er parcial de Matemáticas I",
      "Review exam · Mathematics I first partial",
    ),
    subtitle: l10n(
      "Una pregunta por tema, siempre la más difícil. Fuente: la tarea de repaso del 1er parcial (UEES).",
      "One question per tema, always the hardest one. Source: the 1st-partial review assignment (UEES).",
    ),
    versions: [
      {
        label: "A",
        description: l10n(
          "La más difícil de cada tema",
          "The single hardest problem of each tema",
        ),
      },
      {
        label: "B",
        description: l10n(
          "La segunda más difícil — el mismo nivel, otros problemas",
          "The second hardest — same level, different problems",
        ),
      },
    ],
    temas: [
      { id: "t01", name: l10n("Productos notables", "Special products"), prefixes: ["pn-uees-"] },
      { id: "t02", name: l10n("Factorización", "Factoring"), prefixes: ["fc-uees-"] },
      {
        id: "t03",
        name: l10n("Ecuaciones lineales", "Linear equations"),
        prefixes: ["lin-uees-4", "lin-uees-5", "lin-uees-6", "lin-uees-app-"],
      },
      {
        id: "t04",
        name: l10n("Ecuaciones cuadráticas", "Quadratic equations"),
        prefixes: ["quad-uees-4", "quad-uees-5", "quad-uees-6", "qap-uees-", "exp-uees-"],
      },
      {
        id: "t05",
        name: l10n("Desigualdades lineales", "Linear inequalities"),
        prefixes: ["des-uees-2", "des-uees-3", "des-uees-app-"],
      },
      {
        id: "t06",
        name: l10n("Valor absoluto", "Absolute value"),
        prefixes: ["abseq-uees-", "absdes-uees-"],
      },
      { id: "t07", name: l10n("Sumatorias", "Summations"), prefixes: ["sum-uees-"] },
      { id: "t08", name: l10n("Dominio de una función", "Domain of a function"), prefixes: ["dom-uees-"] },
      { id: "t09", name: l10n("Evaluación de funciones", "Evaluating functions"), prefixes: ["ev-uees-"] },
      {
        id: "t10",
        name: l10n("Expresar en forma de funciones", "Expressing functions"),
        prefixes: ["ef-uees-"],
      },
      {
        id: "t11",
        name: l10n("Composición de funciones", "Composition of functions"),
        prefixes: ["comp-uees-"],
      },
      { id: "t12", name: l10n("Función inversa", "Inverse functions"), prefixes: ["inv-uees-"] },
      {
        id: "t13",
        name: l10n("Gráfica de funciones", "Graphing functions"),
        prefixes: ["pt-uees-", "pw-uees-"],
      },
      {
        id: "t14",
        name: l10n("Funciones de varias variables", "Functions of several variables"),
        prefixes: ["mv-uees-"],
      },
      {
        id: "t15",
        name: l10n("Ecuación de la recta", "Equation of a line"),
        prefixes: ["slope-uees-", "lineq-uees-"],
      },
      {
        id: "t16",
        name: l10n("Funciones lineales", "Linear functions"),
        prefixes: ["linfun-uees-", "lf-uees-", "dem-uees-"],
      },
      {
        id: "t17",
        name: l10n("Funciones cuadráticas", "Quadratic functions"),
        prefixes: ["qvf-uees-"],
      },
    ],
  },
];

export function examProfileById(id: string): ExamProfile | undefined {
  return examProfiles.find((p) => p.id === id);
}
