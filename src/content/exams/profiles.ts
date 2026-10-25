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
  {
    id: "antonio-polinomios",
    student: "Antonio",
    title: l10n("Examen de polinomios · Matemáticas I", "Polynomials exam · Mathematics I"),
    subtitle: l10n(
      "Una pregunta por tema, siempre la más difícil. Fuente: encargo del tutor para la unidad de polinomios (11 temas del syllabus).",
      "One question per tema, always the hardest. Source: tutor-commissioned for the polynomials unit (11 syllabus temas).",
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
      {
        id: "t01",
        name: l10n("Productos notables", "Special products"),
        // pn-uees-19..44: the worksheet's pure special products (45..48 are its
        // algebraic divisions — they feed tema 5 instead, so no tema repeats a
        // skill and no division pollutes this pool's ranking).
        prefixes: [
          "pn-uees-1",
          "pn-uees-2",
          "pn-uees-3",
          "pn-uees-40",
          "pn-uees-41",
          "pn-uees-42",
          "pn-uees-43",
          "pn-uees-44",
        ],
      },
      { id: "t02", name: l10n("Cubo de un binomio", "Cube of a binomial"), prefixes: ["cb-ant-"] },
      {
        id: "t03",
        name: l10n("Operaciones con polinomios", "Polynomial operations"),
        prefixes: ["ops-ant-"],
      },
      { id: "t04", name: l10n("Lenguaje algebraico", "Algebraic language"), prefixes: ["alg-ant-"] },
      {
        id: "t05",
        name: l10n("División de polinomios", "Polynomial division"),
        // the worksheet's 4 monomial divisions (pn-uees-45..48) + the
        // commissioned quotient/remainder pool (long division, Ruffini,
        // remainder theorem).
        prefixes: ["pn-uees-45", "pn-uees-46", "pn-uees-47", "pn-uees-48", "div-ant-"],
      },
      {
        id: "t06",
        name: l10n("Teorema del binomio", "Binomial theorem"),
        prefixes: ["poly-espol-ch2-1"], // ESPOL ch.2 #116..124 (real book source)
      },
      { id: "t07", name: l10n("Triángulo de Pascal", "Pascal's triangle"), prefixes: ["pas-ant-"] },
      {
        id: "t08",
        name: l10n("Términos de un desarrollo", "Terms of an expansion"),
        prefixes: ["tmr-ant-"],
      },
      { id: "t09", name: l10n("Patrones algebraicos", "Algebraic patterns"), prefixes: ["pat-ant-"] },
      {
        id: "t10",
        name: l10n("Factorización", "Factoring"),
        // worksheet S2 (32) + ESPOL ch.2 factoring #34e/36a/b/d/e (5).
        prefixes: ["fc-uees-", "poly-espol-ch2-3"],
      },
      {
        id: "t11",
        name: l10n("Verificación algebraica", "Algebraic verification"),
        prefixes: ["ver-ant-"],
      },
    ],
  },
];

export function examProfileById(id: string): ExamProfile | undefined {
  return examProfiles.find((p) => p.id === id);
}
