/**
 * Mathematics curriculum: 18 topics from algebra foundations to pre-calculus.
 *
 * Topic/subtopic ids are the contract used by content files in
 * src/content/math/<topicId>.ts — keep them stable.
 */

import { l10n, type L10n, type Subject } from "@/lib/types";

export interface SubtopicDef {
  id: string;
  name: L10n<string>;
}

export interface TopicDef {
  id: string;
  name: L10n<string>;
  /** one-line, practice-oriented description */
  short: L10n<string>;
  /** lucide icon key (mapped in src/components/site/topic-icon.tsx) */
  icon: string;
  subtopics: SubtopicDef[];
  /** recommended prior topic ids (same subject) */
  prerequisites: string[];
}

export const mathCurriculum: TopicDef[] = [
  {
    id: "foundations",
    name: l10n("Fundamentos de aritmética y álgebra", "Arithmetic & Algebra Foundations"),
    short: l10n(
      "Operaciones, fracciones, potencias y el lenguaje del álgebra.",
      "Operations, fractions, powers and the language of algebra.",
    ),
    icon: "calculator",
    subtopics: [
      { id: "order-of-operations", name: l10n("Jerarquía de operaciones", "Order of operations") },
      { id: "fractions", name: l10n("Fracciones", "Fractions") },
      { id: "ratios-proportions", name: l10n("Razones y proporciones", "Ratios & proportions") },
      { id: "percentages", name: l10n("Porcentajes", "Percentages") },
      { id: "signed-numbers", name: l10n("Números con signo", "Signed numbers") },
      { id: "powers", name: l10n("Potencias", "Powers") },
      { id: "roots", name: l10n("Raíces", "Roots") },
      { id: "scientific-notation", name: l10n("Notación científica", "Scientific notation") },
      { id: "venn-diagrams", name: l10n("Conjuntos y diagramas de Venn", "Sets & Venn diagrams") },
      { id: "algebraic-notation", name: l10n("Notación algebraica", "Algebraic notation") },
      { id: "simplifying", name: l10n("Simplificar expresiones", "Simplifying expressions") },
      { id: "distributive", name: l10n("Propiedad distributiva", "Distributive property") },
      { id: "like-terms", name: l10n("Términos semejantes", "Combining like terms") },
    ],
    prerequisites: [],
  },
  {
    id: "linear-equations",
    name: l10n("Ecuaciones y desigualdades lineales", "Linear Equations & Inequalities"),
    short: l10n(
      "Resolver ecuaciones de todo tipo y desigualdades con valor absoluto.",
      "Solving equations of every stripe and absolute-value inequalities.",
    ),
    icon: "equal",
    subtopics: [
      { id: "one-step", name: l10n("Ecuaciones de un paso", "One-step equations") },
      { id: "multi-step", name: l10n("Ecuaciones de varios pasos", "Multi-step equations") },
      { id: "fractions", name: l10n("Ecuaciones con fracciones", "Equations with fractions") },
      { id: "decimals", name: l10n("Ecuaciones con decimales", "Equations with decimals") },
      { id: "parentheses", name: l10n("Ecuaciones con paréntesis", "Equations with parentheses") },
      { id: "literal", name: l10n("Ecuaciones literales", "Literal equations") },
      { id: "inequalities", name: l10n("Desigualdades lineales", "Linear inequalities") },
      { id: "compound", name: l10n("Desigualdades compuestas", "Compound inequalities") },
      { id: "interval-notation", name: l10n("Notación de intervalos", "Interval notation") },
      { id: "abs-equations", name: l10n("Ecuaciones con valor absoluto", "Absolute value equations") },
      { id: "abs-inequalities", name: l10n("Desigualdades con valor absoluto", "Absolute value inequalities") },
    ],
    prerequisites: ["foundations"],
  },
  {
    id: "systems",
    name: l10n("Sistemas de ecuaciones", "Systems of Equations"),
    short: l10n(
      "Sustitución, eliminación, gráficas y problemas de aplicación.",
      "Substitution, elimination, graphing and application problems.",
    ),
    icon: "git-merge",
    subtopics: [
      { id: "substitution", name: l10n("Método de sustitución", "Substitution method") },
      { id: "elimination", name: l10n("Método de eliminación", "Elimination method") },
      { id: "gauss", name: l10n("Método de Gauss (3×3)", "Gaussian elimination (3×3)") },
      { id: "graphing", name: l10n("Resolución gráfica", "Graphing method") },
      { id: "parameters", name: l10n("Sistemas con parámetros", "Systems with parameters") },
      { id: "applications", name: l10n("Problemas de aplicación", "Application problems") },
    ],
    prerequisites: ["linear-equations"],
  },
  {
    id: "polynomials",
    name: l10n("Polinomios", "Polynomials"),
    short: l10n(
      "Operaciones, productos notables, factorización y división sintética.",
      "Operations, special products, factoring and synthetic division.",
    ),
    icon: "layers",
    subtopics: [
      { id: "operations", name: l10n("Operaciones con polinomios", "Polynomial operations") },
      { id: "special-products", name: l10n("Productos notables", "Special products") },
      { id: "factoring", name: l10n("Factorización", "Factoring") },
      { id: "equations", name: l10n("Ecuaciones polinómicas", "Polynomial equations") },
      { id: "remainder-theorem", name: l10n("Teorema del resto y del factor", "Remainder & factor theorems") },
      { id: "synthetic-division", name: l10n("División sintética", "Synthetic division") },
      { id: "inequalities", name: l10n("Desigualdades polinómicas", "Polynomial inequalities") },
    ],
    prerequisites: ["linear-equations"],
  },
  {
    id: "quadratics",
    name: l10n("Funciones y ecuaciones cuadráticas", "Quadratic Functions & Equations"),
    short: l10n(
      "Factorización, formula cuadrática, vértice y aplicaciones.",
      "Factoring, the quadratic formula, the vertex and applications.",
    ),
    icon: "flip-vertical",
    subtopics: [
      { id: "standard-form", name: l10n("Forma general y factorizada", "Standard & factored form") },
      { id: "factoring", name: l10n("Resolución por factorización", "Solving by factoring") },
      { id: "completing-square", name: l10n("Completar el cuadrado", "Completing the square") },
      { id: "quadratic-formula", name: l10n("Fórmula cuadrática", "Quadratic formula") },
      { id: "discriminant", name: l10n("Discriminante", "Discriminant") },
      { id: "roots", name: l10n("Raíces y suma/producto", "Roots and sum/product") },
      { id: "vertex", name: l10n("Vértice y extremos", "Vertex and extrema") },
      { id: "graphs", name: l10n("Interpretación de gráficas", "Graph interpretation") },
      { id: "applications", name: l10n("Problemas de aplicación", "Applications") },
    ],
    prerequisites: ["polynomials"],
  },
  {
    id: "rational",
    name: l10n("Expresiones y ecuaciones racionales", "Rational Expressions & Equations"),
    short: l10n(
      "Simplificar, operar y resolver con fracciones algebraicas.",
      "Simplify, combine and solve with algebraic fractions.",
    ),
    icon: "divide",
    subtopics: [
      { id: "simplifying", name: l10n("Simplificación", "Simplifying") },
      { id: "mult-div", name: l10n("Multiplicación y división", "Multiplication & division") },
      { id: "add-sub", name: l10n("Suma y resta", "Addition & subtraction") },
      { id: "equations", name: l10n("Ecuaciones racionales", "Rational equations") },
      { id: "domain", name: l10n("Restricciones del dominio", "Domain restrictions") },
      { id: "inequalities", name: l10n("Desigualdades racionales", "Rational inequalities") },
    ],
    prerequisites: ["polynomials"],
  },
  {
    id: "radicals",
    name: l10n("Radicales y exponentes fraccionarios", "Radicals & Fractional Exponents"),
    short: l10n(
      "Simplificar radicales, racionalizar y pasar a exponentes.",
      "Simplify radicals, rationalize and switch to exponents.",
    ),
    icon: "radical",
    subtopics: [
      { id: "simplifying", name: l10n("Simplificación de radicales", "Simplifying radicals") },
      { id: "operations", name: l10n("Operaciones con radicales", "Operations with radicals") },
      { id: "rationalizing", name: l10n("Racionalizar denominadores", "Rationalizing denominators") },
      { id: "equations", name: l10n("Ecuaciones con radicales", "Radical equations") },
      { id: "fractional-exponents", name: l10n("Exponentes fraccionarios", "Fractional exponents") },
    ],
    prerequisites: ["polynomials"],
  },
  {
    id: "functions",
    name: l10n("Funciones", "Functions"),
    short: l10n(
      "Notación, dominio, composición, inversas y transformaciones.",
      "Notation, domain, composition, inverses and transformations.",
    ),
    icon: "function-square",
    subtopics: [
      { id: "notation", name: l10n("Notación funcional", "Function notation") },
      { id: "domain-range", name: l10n("Dominio y rango", "Domain & range") },
      { id: "evaluation", name: l10n("Evaluación", "Evaluation") },
      { id: "composition", name: l10n("Composición de funciones", "Composition") },
      { id: "inverse", name: l10n("Funciones inversas", "Inverse functions") },
      { id: "transformations", name: l10n("Transformaciones", "Transformations") },
      { id: "piecewise", name: l10n("Funciones a trozos", "Piecewise functions") },
      { id: "interpreting-graphs", name: l10n("Interpretación de gráficas", "Interpreting graphs") },
      { id: "rate-of-change", name: l10n("Tasa de cambio media", "Average rate of change") },
    ],
    prerequisites: ["linear-equations"],
  },
  {
    id: "poly-functions",
    name: l10n("Funciones lineales, cuadráticas y polinómicas", "Linear, Quadratic & Polynomial Functions"),
    short: l10n(
      "Gráficas, cortes, transformaciones y modelización.",
      "Graphs, intercepts, transformations and modeling.",
    ),
    icon: "spline",
    subtopics: [
      { id: "graphs", name: l10n("Gráficas", "Graphs") },
      { id: "intercepts", name: l10n("Cortes con los ejes", "Intercepts") },
      { id: "transformations", name: l10n("Transformaciones", "Transformations") },
      { id: "modeling", name: l10n("Modelización", "Modeling") },
      { id: "comparisons", name: l10n("Comparación de modelos", "Comparing models") },
    ],
    prerequisites: ["functions", "quadratics"],
  },
  {
    id: "exponential",
    name: l10n("Funciones exponenciales", "Exponential Functions"),
    short: l10n(
      "Crecimiento, decaimiento y ecuaciones exponenciales.",
      "Growth, decay and exponential equations.",
    ),
    icon: "trending-up",
    subtopics: [
      { id: "growth", name: l10n("Crecimiento exponencial", "Exponential growth") },
      { id: "decay", name: l10n("Decaimiento exponencial", "Exponential decay") },
      { id: "transformations", name: l10n("Transformaciones", "Transformations") },
      { id: "equations", name: l10n("Ecuaciones exponenciales", "Exponential equations") },
      { id: "applications", name: l10n("Aplicaciones", "Applications") },
    ],
    prerequisites: ["functions"],
  },
  {
    id: "logarithmic",
    name: l10n("Funciones logarítmicas", "Logarithmic Functions"),
    short: l10n(
      "Propiedades, evaluación y ecuaciones logarítmicas.",
      "Properties, evaluation and logarithmic equations.",
    ),
    icon: "subscript",
    subtopics: [
      { id: "properties", name: l10n("Propiedades de los logaritmos", "Logarithm properties") },
      { id: "evaluating", name: l10n("Evaluar logaritmos", "Evaluating logs") },
      { id: "conversion", name: l10n("Conversión exponencial/logarítmica", "Exponential/log conversion") },
      { id: "equations", name: l10n("Ecuaciones logarítmicas", "Logarithmic equations") },
      { id: "applications", name: l10n("Aplicaciones", "Applications") },
    ],
    prerequisites: ["exponential"],
  },
  {
    id: "sequences",
    name: l10n("Sucesiones y series", "Sequences & Series"),
    short: l10n(
      "Aritméticas, geométricas, fórmulas y sumas.",
      "Arithmetic, geometric, formulas and sums.",
    ),
    icon: "list-ordered",
    subtopics: [
      { id: "arithmetic", name: l10n("Sucesiones aritméticas", "Arithmetic sequences") },
      { id: "geometric", name: l10n("Sucesiones geométricas", "Geometric sequences") },
      { id: "explicit", name: l10n("Fórmulas explícitas", "Explicit formulas") },
      { id: "recursive", name: l10n("Fórmulas recursivas", "Recursive formulas") },
      { id: "finite-sums", name: l10n("Sumas finitas", "Finite sums") },
      { id: "geometric-sums", name: l10n("Sumas geométricas", "Geometric sums") },
    ],
    prerequisites: ["linear-equations"],
  },
  {
    id: "analytic-geometry",
    name: l10n("Geometría analítica", "Analytic Geometry"),
    short: l10n(
      "Distancia, punto medio, rectas, circunferencias y cónicas.",
      "Distance, midpoint, lines, circles and conics.",
    ),
    icon: "circle-dot",
    subtopics: [
      { id: "coordinate-geometry", name: l10n("Geometría de coordenadas", "Coordinate geometry") },
      { id: "distance", name: l10n("Distancia entre puntos", "Distance between points") },
      { id: "midpoint", name: l10n("Punto medio", "Midpoint") },
      { id: "slope", name: l10n("Pendiente", "Slope") },
      { id: "line-equations", name: l10n("Ecuaciones de la recta", "Line equations") },
      { id: "circles", name: l10n("Circunferencias", "Circles") },
      { id: "parabolas", name: l10n("Parábolas", "Parabolas") },
      { id: "conics", name: l10n("Secciones cónicas básicas", "Basic conic sections") },
    ],
    prerequisites: ["functions"],
  },
  {
    id: "trig-foundations",
    name: l10n("Fundamentos de trigonometría", "Trigonometry Foundations"),
    short: l10n(
      "Grados y radianes, circunferencia unitaria y triángulos rectángulos.",
      "Degrees and radians, the unit circle and right triangles.",
    ),
    icon: "triangle",
    subtopics: [
      { id: "degrees-radians", name: l10n("Grados y radianes", "Degrees & radians") },
      { id: "unit-circle", name: l10n("Circunferencia unitaria", "Unit circle") },
      { id: "sin-cos-tan", name: l10n("Seno, coseno y tangente", "Sine, cosine & tangent") },
      { id: "reciprocal", name: l10n("Funciones recíprocas", "Reciprocal functions") },
      { id: "exact-values", name: l10n("Valores exactos", "Exact values") },
      { id: "right-triangles", name: l10n("Triángulos rectángulos", "Right triangles") },
      { id: "graphs", name: l10n("Gráficas básicas", "Basic graphs") },
    ],
    prerequisites: ["radicals", "functions"],
  },
  {
    id: "trig-functions",
    name: l10n("Funciones trigonométricas", "Trigonometric Functions"),
    short: l10n(
      "Amplitud, periodo, desfasamientos e identidades.",
      "Amplitude, period, phase shifts and identities.",
    ),
    icon: "waves",
    subtopics: [
      { id: "transformations", name: l10n("Transformaciones", "Transformations") },
      { id: "amplitude", name: l10n("Amplitud", "Amplitude") },
      { id: "period", name: l10n("Periodo", "Period") },
      { id: "phase-shift", name: l10n("Desfasamiento", "Phase shift") },
      { id: "inverse-trig", name: l10n("Funciones trigonométricas inversas", "Inverse trig functions") },
      { id: "identities", name: l10n("Identidades", "Identities") },
      { id: "simplification", name: l10n("Simplificación", "Simplification") },
    ],
    prerequisites: ["trig-foundations"],
  },
  {
    id: "trig-equations",
    name: l10n("Ecuaciones trigonométricas", "Trigonometric Equations"),
    short: l10n(
      "Resolver en un intervalo y soluciones generales.",
      "Solving on intervals and general solutions.",
    ),
    icon: "sigma",
    subtopics: [
      { id: "basic", name: l10n("Ecuaciones básicas", "Basic equations") },
      { id: "with-identities", name: l10n("Ecuaciones con identidades", "Equations using identities") },
      { id: "intervals", name: l10n("Soluciones en un intervalo", "Solutions on an interval") },
      { id: "general", name: l10n("Soluciones generales", "General solutions") },
    ],
    prerequisites: ["trig-functions"],
  },
  {
    id: "trig-applications",
    name: l10n("Aplicaciones de la trigonometría", "Applications of Trigonometry"),
    short: l10n(
      "Teoremas del seno y del coseno, y problemas de triángulos.",
      "Law of sines and cosines, and triangle problems.",
    ),
    icon: "compass",
    subtopics: [
      { id: "law-of-sines", name: l10n("Teorema del seno", "Law of sines") },
      { id: "law-of-cosines", name: l10n("Teorema del coseno", "Law of cosines") },
      { id: "triangle-problems", name: l10n("Problemas de triángulos", "Triangle problems") },
      { id: "vectors", name: l10n("Vectores y aplicaciones", "Vectors & applications") },
    ],
    prerequisites: ["trig-foundations"],
  },
  {
    id: "precalculus-mixed",
    name: l10n("Práctica mixta de pre-cálculo", "Mixed Pre-Calculus Practice"),
    short: l10n(
      "Problemas de examen que combinan varios temas.",
      "Exam-style problems combining several topics.",
    ),
    icon: "shuffle",
    subtopics: [
      { id: "mixed-topics", name: l10n("Temas mezclados", "Mixed topics") },
      { id: "exam-style", name: l10n("Estilo examen", "Exam-style problems") },
      { id: "multi-step", name: l10n("Problemas de varios pasos", "Multi-step problems") },
    ],
    prerequisites: ["quadratics", "functions", "trig-foundations", "exponential"],
  },
];

export const mathTopicIds = mathCurriculum.map((t) => t.id);
export const mathCurriculumBySubject: Subject = "math";
