/**
 * MATH · Mixed Pre-Calculus Practice
 *
 * Exam-style problems that combine several topics (functions, quadratics,
 * exponentials, logarithms, trig and geometry) with multi-step reasoning.
 */

import { template, L, step, tok } from "@/lib/problem";
import type { ProblemTemplate, McOption } from "@/lib/types";

/* ------------------------------------------------------------------ */
/* Helpers for the "bridge" batch (hard multi-concept compositions,    */
/* Task 17-b). All of them build LaTeX from parameters.               */
/* ------------------------------------------------------------------ */

/** "+ 5" | "- 5" — joins a signed constant */
const bop = (n: number): string => (n < 0 ? `- ${Math.abs(n)}` : `+ ${n}`);

/** "+ 5x" | "- x" | "" (coefficient 0 omitted) — joins a signed term */
const bterm = (n: number, v: string): string =>
  n === 0 ? "" : `${n < 0 ? "- " : "+ "}${Math.abs(n) === 1 ? "" : Math.abs(n)}${v}`;

/** LaTeX of a monic quadratic x² + px + q (zero terms omitted) */
const bquad = (p: number, q: number): string =>
  `x^2${p === 0 ? "" : ` ${bterm(p, "x")}`}${q === 0 ? "" : ` ${bop(q)}`}`;

/** LaTeX of a linear argument "x + 3" | "x - 3" | "x" */
const blin = (b: number): string => (b === 0 ? "x" : `x ${bop(b)}`);

/** LaTeX of "|x - v|" handling v ≤ 0 */
const babs = (v: number): string =>
  v === 0 ? "|x|" : `\\left|x ${v > 0 ? "- " : "+ "}${Math.abs(v)}\\right|`;

const bgcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : bgcd(b, a % b));

/** LaTeX of the reduced fraction (n/d)·π, e.g. bpi(1, 6) → "\frac{\pi}{6}" */
const bpi = (n: number, d: number): string => {
  const g = bgcd(n, d) || 1;
  const nn = n / g;
  const dd = d / g;
  if (dd === 1) return nn === 1 ? "\\pi" : `${nn}\\pi`;
  if (nn === 1) return `\\frac{\\pi}{${dd}}`;
  return `\\frac{${nn}\\pi}{${dd}}`;
};

/** "(a, b)" — renders an ordered pair */
const bpt = (x: number, y: number): string => `(${x}, ${y})`;

export const templates: ProblemTemplate[] = [
  /* ---------------------------------------------------------------- */
  /* Composition of functions (easy)                                   */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pcm-fncomp-01",
      subject: "math",
      topicId: "precalculus-mixed",
      subtopicId: "mixed-topics",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 90,
      tags: ["composition", "functions"],
      prerequisites: ["functions"],
    },
    (rng) => {
      const a = rng.pick([2, 3, 4, 5]);
      const b = rng.nonZeroInt(-5, 6);
      const useSqrt = rng.bool();
      const k = useSqrt ? rng.pick([4, 9, 16, 25]) : rng.int(2, 6);
      const gLatex = useSqrt ? "g(x) = \\sqrt{x}" : "g(x) = x^2";
      const gInner = useSqrt ? Math.sqrt(k) : k * k;
      const value = a * gInner + b;
      return {
        skill: L("Composición de funciones", "Composition of functions"),
        statement: L(
          `Si $f(x) = ${a}x ${b > 0 ? "+" : "-"} ${Math.abs(b)}$ y $${gLatex}$, calcula $f\\bigl(g(${k})\\bigr)$.`,
          `If $f(x) = ${a}x ${b > 0 ? "+" : "-"} ${Math.abs(b)}$ and $${gLatex}$, evaluate $f\\bigl(g(${k})\\bigr)$.`,
        ),
        answer: { kind: "numeric", value },
        hints: [
          L(
            "Trabaja desde dentro hacia fuera: primero la función interior.",
            "Work from the inside out: the inner function first.",
          ),
          L(
            `Calcula $g(${k})$.`,
            `Compute $g(${k})$.`,
          ),
          L(
            "Sustituye ese resultado en $f$.",
            "Substitute that result into $f$.",
          ),
        ],
        answerDisplay: L(
          `$f\\bigl(g(${k})\\bigr) = ${value}$`,
          `$f\\bigl(g(${k})\\bigr) = ${value}$`,
        ),
        solution: [
          step(
            "given",
            `$f(x) = ${a}x ${b > 0 ? "+" : "-"} ${Math.abs(b)}$, $${gLatex}$; queremos $f(g(${k}))$.`,
            `$f(x) = ${a}x ${b > 0 ? "+" : "-"} ${Math.abs(b)}$, $${gLatex}$; we want $f(g(${k}))$.`,
          ),
          step(
            "approach",
            "Evaluamos la función interior y el resultado lo metemos en la exterior.",
            "Evaluate the inner function and feed its output into the outer one.",
          ),
          step(
            "calculation",
            `$g(${k}) = ${gInner}$<br>$f(${gInner}) = ${a}\\cdot${gInner} ${b > 0 ? "+" : "-"} ${Math.abs(b)} = ${value}$`,
            `$g(${k}) = ${gInner}$<br>$f(${gInner}) = ${a}\\cdot${gInner} ${b > 0 ? "+" : "-"} ${Math.abs(b)} = ${value}$`,
          ),
          step(
            "result",
            `$f\\bigl(g(${k})\\bigr) = ${value}$.`,
            `$f\\bigl(g(${k})\\bigr) = ${value}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Expand a binomial product (easy, expression)                      */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pcm-expand-01",
      subject: "math",
      topicId: "precalculus-mixed",
      subtopicId: "mixed-topics",
      difficulty: "easy",
      questionType: "expression",
      estimatedTimeSec: 90,
      tags: ["polynomials", "expand"],
      prerequisites: ["polynomials"],
    },
    (rng) => {
      const a = rng.int(2, 9);
      const b = rng.int(2, 9);
      const minus = rng.bool();
      const c1 = minus ? a - b : a + b;
      const c0 = minus ? -a * b : a * b;
      const linTerm =
        c1 === 0
          ? ""
          : c1 === 1
            ? " + x"
            : c1 === -1
              ? " - x"
              : c1 > 0
                ? ` + ${c1}x`
                : ` - ${Math.abs(c1)}x`;
      const constTerm = c0 > 0 ? ` + ${c0}` : ` - ${Math.abs(c0)}`;
      const accepted = `x^2${linTerm}${constTerm}`;
      const latexTerm =
        c1 === 0
          ? ""
          : c1 === 1
            ? "+ x"
            : c1 === -1
              ? "- x"
              : `${c1 > 0 ? "+" : "-"} ${Math.abs(c1)}x`;
      return {
        skill: L("Producto de binomios", "Product of binomials"),
        statement: L(
          `Expande y simplifica: $(x + ${a})(x ${minus ? "-" : "+"} ${b})$ (escribe por ejemplo x^2 + 3x - 10).`,
          `Expand and simplify: $(x + ${a})(x ${minus ? "-" : "+"} ${b})$ (write e.g. x^2 + 3x - 10).`,
        ),
        answer: { kind: "expression", accepted: [accepted], variables: ["x"] },
        hints: [
          L(
            "Aplica la propiedad distributiva término a término.",
            "Apply the distributive property term by term.",
          ),
          L(
            "Los productos cruzado (externo e interno) dan los términos con $x$.",
            "The cross products (outer and inner) give the $x$ terms.",
          ),
          L(
            "Suma los términos semejantes: los que llevan $x$ y los números.",
            "Combine like terms: the ones with $x$ and the constants.",
          ),
        ],
        answerDisplay: L(
          `$x^2 ${latexTerm} ${c0 > 0 ? "+" : "-"} ${Math.abs(c0)}$`,
          `$x^2 ${latexTerm} ${c0 > 0 ? "+" : "-"} ${Math.abs(c0)}$`,
        ),
        solution: [
          step(
            "given",
            `$(x + ${a})(x ${minus ? "-" : "+"} ${b})$`,
            `$(x + ${a})(x ${minus ? "-" : "+"} ${b})$`,
          ),
          step(
            "approach",
            "Multiplicamos cada término del primer paréntesis por cada término del segundo y reducimos.",
            "Multiply each term of the first parenthesis by each term of the second and combine.",
          ),
          step(
            "calculation",
            `$(x + ${a})(x ${minus ? "-" : "+"} ${b}) = x^2 ${minus ? "-" : "+"} ${b}x + ${a}x ${minus ? "-" : "+"} ${a * b}$<br>$= x^2 ${latexTerm} ${c0 > 0 ? "+" : "-"} ${Math.abs(c0)}$`,
            `$(x + ${a})(x ${minus ? "-" : "+"} ${b}) = x^2 ${minus ? "-" : "+"} ${b}x + ${a}x ${minus ? "-" : "+"} ${a * b}$<br>$= x^2 ${latexTerm} ${c0 > 0 ? "+" : "-"} ${Math.abs(c0)}$`,
          ),
          step(
            "result",
            `El resultado es $${accepted}$.`,
            `The result is $${accepted}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Exponential growth (medium)                                       */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pcm-expo-01",
      subject: "math",
      topicId: "precalculus-mixed",
      subtopicId: "exam-style",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 120,
      tags: ["exponential", "growth", "word-problems"],
      prerequisites: ["exponential"],
    },
    (rng) => {
      const P0 = rng.pick([100, 200, 500, 1000, 2000]);
      const t = rng.pick([3, 4, 5]);
      const value = P0 * 2 ** t;
      return {
        skill: L("Crecimiento exponencial", "Exponential growth"),
        statement: L(
          `Una cultura de bacterias comienza con $${P0}$ bacterias y su población se **duplica** cada hora. ¿Cuántas bacterias hay tras $${t}$ horas?`,
          `A bacteria culture starts with $${P0}$ bacteria and its population **doubles** every hour. How many bacteria are there after $${t}$ hours?`,
        ),
        answer: { kind: "numeric", value },
        hints: [
          L(
            "Cada hora la población se multiplica por $2$: no se suma una cantidad fija.",
            "Each hour the population is multiplied by $2$: a fixed amount is not added.",
          ),
          L(
            "Tras $t$ horas: $P = P_0\\cdot 2^{t}$.",
            "After $t$ hours: $P = P_0\\cdot 2^{t}$.",
          ),
          L(
            `Calcula primero $2^{${t}}$.`,
            `Compute $2^{${t}}$ first.`,
          ),
        ],
        answerDisplay: L(`$P = ${value}$ bacterias`, `$P = ${value}$ bacteria`),
        solution: [
          step(
            "given",
            `$P_0 = ${P0}$, duplicación cada hora, $t = ${t}\\ \\text{h}$.`,
            `$P_0 = ${P0}$, doubling every hour, $t = ${t}\\ \\text{h}$.`,
          ),
          step(
            "approach",
            "Modelo de crecimiento exponencial con base 2.",
            "Exponential growth model with base 2.",
          ),
          step(
            "calculation",
            `$P = ${P0}\\cdot 2^{${t}} = ${P0}\\cdot ${2 ** t} = ${value}$`,
            `$P = ${P0}\\cdot 2^{${t}} = ${P0}\\cdot ${2 ** t} = ${value}$`,
          ),
          step(
            "result",
            `Tras $${t}$ horas hay $${value}$ bacterias.`,
            `After $${t}$ hours there are $${value}$ bacteria.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Evaluate logs (medium)                                            */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pcm-log-01",
      subject: "math",
      topicId: "precalculus-mixed",
      subtopicId: "exam-style",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 120,
      tags: ["logarithms"],
      prerequisites: ["logarithmic"],
    },
    (rng) => {
      const f1 = rng.pick([
        { b: 2, k: 4 },
        { b: 2, k: 5 },
        { b: 2, k: 6 },
        { b: 3, k: 3 },
        { b: 3, k: 4 },
        { b: 5, k: 3 },
        { b: 10, k: 3 },
        { b: 10, k: 4 },
      ]);
      const f2 = rng.pick([
        { b: 2, k: 3 },
        { b: 2, k: 4 },
        { b: 3, k: 2 },
        { b: 3, k: 3 },
        { b: 5, k: 2 },
        { b: 10, k: 2 },
        { b: 10, k: 3 },
      ]);
      const n1 = f1.b ** f1.k;
      const n2 = f2.b ** f2.k;
      const value = f1.k + f2.k;
      return {
        skill: L("Evaluar logaritmos", "Evaluating logarithms"),
        statement: L(
          `Calcula: $\\log_{${f1.b}} ${n1} + \\log_{${f2.b}} ${n2}$.`,
          `Evaluate: $\\log_{${f1.b}} ${n1} + \\log_{${f2.b}} ${n2}$.`,
        ),
        answer: { kind: "numeric", value },
        hints: [
          L(
            "Un logaritmo pregunta: ¿a qué exponente hay que elevar la base para obtener el argumento?",
            "A logarithm asks: to which exponent must the base be raised to obtain the argument?",
          ),
          L(
            "Escribe cada argumento como potencia de su base.",
            "Write each argument as a power of its base.",
          ),
          L(
            "El logaritmo de una potencia de la base es simplemente el exponente.",
            "The logarithm of a power of the base is just the exponent.",
          ),
        ],
        answerDisplay: L(
          `$\\log_{${f1.b}} ${n1} + \\log_{${f2.b}} ${n2} = ${value}$`,
          `$\\log_{${f1.b}} ${n1} + \\log_{${f2.b}} ${n2} = ${value}$`,
        ),
        solution: [
          step(
            "given",
            `$\\log_{${f1.b}} ${n1} + \\log_{${f2.b}} ${n2}$`,
            `$\\log_{${f1.b}} ${n1} + \\log_{${f2.b}} ${n2}$`,
          ),
          step(
            "approach",
            "Expresamos cada argumento como potencia de la base del logaritmo.",
            "Write each argument as a power of its logarithm's base.",
          ),
          step(
            "calculation",
            `${n1} = ${f1.b}^{${f1.k}} \\Rightarrow \\log_{${f1.b}} ${n1} = ${f1.k}$<br>${n2} = ${f2.b}^{${f2.k}} \\Rightarrow \\log_{${f2.b}} ${n2} = ${f2.k}$<br>Suma: $${f1.k} + ${f2.k} = ${value}$`,
            `${n1} = ${f1.b}^{${f1.k}} \\Rightarrow \\log_{${f1.b}} ${n1} = ${f1.k}$<br>${n2} = ${f2.b}^{${f2.k}} \\Rightarrow \\log_{${f2.b}} ${n2} = ${f2.k}$<br>Sum: $${f1.k} + ${f2.k} = ${value}$`,
          ),
          step(
            "result",
            `El valor de la expresión es $${value}$.`,
            `The value of the expression is $${value}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Quadratic model: maximum height (medium)                          */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pcm-quadapp-01",
      subject: "math",
      topicId: "precalculus-mixed",
      subtopicId: "multi-step",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 180,
      tags: ["quadratics", "vertex", "modeling"],
      prerequisites: ["quadratics"],
    },
    (rng) => {
      const v = rng.pick([20, 30, 40, 60]);
      const tStar = v / 10;
      const hMax = (v * v) / 20;
      return {
        skill: L("Altura máxima de un lanzamiento", "Maximum height of a launch"),
        statement: L(
          `Se lanza un objeto verticalmente hacia arriba y su altura (en metros) tras $t$ segundos es $h(t) = -5t^2 + ${v}t$. ¿Qué **altura máxima** alcanza?`,
          `An object is thrown straight up and its height (in metres) after $t$ seconds is $h(t) = -5t^2 + ${v}t$. What is its **maximum height**?`,
        ),
        answer: { kind: "numeric", value: hMax, unitSuffix: "m" },
        hints: [
          L(
            "La altura es una función cuadrática con coeficiente principal negativo: su máximo está en el vértice.",
            "The height is a quadratic function with negative leading coefficient: its maximum is at the vertex.",
          ),
          L(
            `El tiempo del vértice es $t_v = \\frac{-b}{2a}$ con $a = -5$ y $b = ${v}$.`,
            `The vertex time is $t_v = \\frac{-b}{2a}$ with $a = -5$ and $b = ${v}$.`,
          ),
          L(
            "Sustituye $t_v$ en $h(t)$.",
            "Substitute $t_v$ into $h(t)$.",
          ),
        ],
        answerDisplay: L(
          `Altura máxima $= ${hMax}\\ \\text{m}$`,
          `Maximum height $= ${hMax}\\ \\text{m}$`,
        ),
        solution: [
          step(
            "given",
            `$h(t) = -5t^2 + ${v}t$ (metros, segundos).`,
            `$h(t) = -5t^2 + ${v}t$ (metres, seconds).`,
          ),
          step(
            "approach",
            "Hallamos el vértice de la parábola y evaluamos la función allí.",
            "Find the vertex of the parabola and evaluate the function there.",
          ),
          step(
            "calculation",
            `$t_v = \\frac{-${v}}{2\\cdot(-5)} = ${tStar}\\ \\text{s}$<br>$h(${tStar}) = -5\\cdot${tStar * tStar} + ${v}\\cdot${tStar} = ${hMax}$`,
            `$t_v = \\frac{-${v}}{2\\cdot(-5)} = ${tStar}\\ \\text{s}$<br>$h(${tStar}) = -5\\cdot${tStar * tStar} + ${v}\\cdot${tStar} = ${hMax}$`,
          ),
          step(
            "result",
            `La altura máxima es $${hMax}\\ \\text{m}$, alcanzada a los $${tStar}\\ \\text{s}$.`,
            `The maximum height is $${hMax}\\ \\text{m}$, reached at $t = ${tStar}\\ \\text{s}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Trig ratio with Pythagorean triple (medium, MC)                   */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pcm-trigratio-01",
      subject: "math",
      topicId: "precalculus-mixed",
      subtopicId: "mixed-topics",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["trig", "pythagorean-triples"],
      prerequisites: ["trig-foundations"],
    },
    (rng) => {
      const t = rng.pick([
        { a: 3, b: 4, c: 5 },
        { a: 5, b: 12, c: 13 },
        { a: 8, b: 15, c: 17 },
        { a: 7, b: 24, c: 25 },
      ]);
      const ask = rng.pick(["cos", "tan"] as const);
      const options: McOption[] =
        ask === "cos"
          ? [
              { id: "a", text: L(`$\\frac{${t.b}}{${t.c}}$`, `$\\frac{${t.b}}{${t.c}}$`), correct: true },
              { id: "b", text: L(`$\\frac{${t.a}}{${t.c}}$`, `$\\frac{${t.a}}{${t.c}}$`), correct: false },
              { id: "c", text: L(`$\\frac{${t.c}}{${t.b}}$`, `$\\frac{${t.c}}{${t.b}}$`), correct: false },
              { id: "d", text: L(`$\\frac{${t.b}}{${t.a}}$`, `$\\frac{${t.b}}{${t.a}}$`), correct: false },
            ]
          : [
              { id: "a", text: L(`$\\frac{${t.a}}{${t.b}}$`, `$\\frac{${t.a}}{${t.b}}$`), correct: true },
              { id: "b", text: L(`$\\frac{${t.b}}{${t.a}}$`, `$\\frac{${t.b}}{${t.a}}$`), correct: false },
              { id: "c", text: L(`$\\frac{${t.a}}{${t.c}}$`, `$\\frac{${t.a}}{${t.c}}$`), correct: false },
              { id: "d", text: L(`$\\frac{${t.b}}{${t.c}}$`, `$\\frac{${t.b}}{${t.c}}$`), correct: false },
            ];
      const answerFrac = ask === "cos" ? `\\frac{${t.b}}{${t.c}}` : `\\frac{${t.a}}{${t.b}}`;
      return {
        skill: L("Razones con ternas pitagóricas", "Ratios with Pythagorean triples"),
        statement: L(
          `Si $\\sin\\theta = \\frac{${t.a}}{${t.c}}$ y $\\theta$ es un ángulo agudo, ¿cuánto vale $\\${ask}\\theta$?`,
          `If $\\sin\\theta = \\frac{${t.a}}{${t.c}}$ and $\\theta$ is acute, what is $\\${ask}\\theta$?`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "$\\sin\\theta = \\frac{\\text{opuesto}}{\\text{hipotenusa}}$: marca esos dos lados en un triángulo rectángulo.",
            "$\\sin\\theta = \\frac{\\text{opposite}}{\\text{hypotenuse}}$: mark those two sides on a right triangle.",
          ),
          L(
            `La hipotenusa mide $${t.c}$ y el cateto opuesto $${t.a}$; halla el tercer lado con Pitágoras.`,
            `The hypotenuse is $${t.c}$ and the opposite leg is $${t.a}$; find the third side with Pythagoras.`,
          ),
          L(
            `Con los tres lados, $\\cos\\theta = \\frac{\\text{adyacente}}{\\text{hipotenusa}}$ y $\\tan\\theta = \\frac{\\text{opuesto}}{\\text{adyacente}}$.`,
            `With all three sides, $\\cos\\theta = \\frac{\\text{adjacent}}{\\text{hypotenuse}}$ and $\\tan\\theta = \\frac{\\text{opposite}}{\\text{adjacent}}$.`,
          ),
        ],
        answerDisplay: L(`$\\${ask}\\theta = ${answerFrac}$`, `$\\${ask}\\theta = ${answerFrac}$`),
        solution: [
          step(
            "given",
            `$\\sin\\theta = \\frac{${t.a}}{${t.c}}$, $\\theta$ agudo.`,
            `$\\sin\\theta = \\frac{${t.a}}{${t.c}}$, $\\theta$ acute.`,
          ),
          step(
            "approach",
            "Construimos el triángulo rectángulo asociado y completamos el lado que falta.",
            "Build the associated right triangle and complete the missing side.",
          ),
          step(
            "calculation",
            `Hipotenusa $= ${t.c}$, opuesto $= ${t.a}$.<br>Adyacente: $\\sqrt{${t.c}^2 - ${t.a}^2} = \\sqrt{${t.c * t.c} - ${t.a * t.a}} = ${t.b}$.<br>$${ask === "cos" ? `\\cos\\theta = \\frac{${t.b}}{${t.c}}` : `\\tan\\theta = \\frac{${t.a}}{${t.b}}`}$`,
            `Hypotenuse $= ${t.c}$, opposite $= ${t.a}$.<br>Adjacent: $\\sqrt{${t.c}^2 - ${t.a}^2} = \\sqrt{${t.c * t.c} - ${t.a * t.a}} = ${t.b}$.<br>$${ask === "cos" ? `\\cos\\theta = \\frac{${t.b}}{${t.c}}` : `\\tan\\theta = \\frac{${t.a}}{${t.b}}`}$`,
          ),
          step(
            "result",
            `$\\${ask}\\theta = ${answerFrac}$.`,
            `$\\${ask}\\theta = ${answerFrac}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Radius of a circle through a point (medium)                       */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pcm-geom-01",
      subject: "math",
      topicId: "precalculus-mixed",
      subtopicId: "mixed-topics",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 150,
      tags: ["circles", "distance", "analytic-geometry"],
      prerequisites: ["analytic-geometry"],
    },
    (rng) => {
      const off = rng.pick([
        { dx: 3, dy: 4, r: 5 },
        { dx: 4, dy: 3, r: 5 },
        { dx: 6, dy: 8, r: 10 },
        { dx: 5, dy: 12, r: 13 },
        { dx: 9, dy: 12, r: 15 },
      ]);
      const h = rng.int(-4, 4);
      const k = rng.int(-4, 4);
      const px = h + off.dx;
      const py = k + off.dy;
      return {
        skill: L("Radio de una circunferencia", "Radius of a circle"),
        statement: L(
          `Una circunferencia tiene centro en $(${h}, ${k})$ y pasa por el punto $(${px}, ${py})$. ¿Cuánto mide su radio $r$?`,
          `A circle has centre $(${h}, ${k})$ and passes through the point $(${px}, ${py})$. What is its radius $r$?`,
        ),
        answer: { kind: "numeric", value: off.r },
        hints: [
          L(
            "El radio es la distancia del centro a cualquier punto de la circunferencia.",
            "The radius is the distance from the centre to any point on the circle.",
          ),
          L(
            "La distancia entre dos puntos usa las **diferencias** de coordenadas.",
            "The distance between two points uses the coordinate **differences**.",
          ),
          L(
            `$r = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$: las diferencias aquí son $${off.dx}$ y $${off.dy}$.`,
            `$r = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$: here the differences are $${off.dx}$ and $${off.dy}$.`,
          ),
        ],
        answerDisplay: L(`$r = ${off.r}$`, `$r = ${off.r}$`),
        solution: [
          step(
            "given",
            `Centro $(${h}, ${k})$, punto de la circunferencia $(${px}, ${py})$.`,
            `Centre $(${h}, ${k})$, point on the circle $(${px}, ${py})$.`,
          ),
          step(
            "approach",
            "El radio es la distancia entre el centro y el punto, con la fórmula de la distancia.",
            "The radius is the distance between the centre and the point, via the distance formula.",
          ),
          step(
            "calculation",
            `$r = \\sqrt{(${px} - (${h}))^2 + (${py} - (${k}))^2} = \\sqrt{${off.dx}^2 + ${off.dy}^2} = \\sqrt{${off.dx * off.dx} + ${off.dy * off.dy}} = ${off.r}$`,
            `$r = \\sqrt{(${px} - (${h}))^2 + (${py} - (${k}))^2} = \\sqrt{${off.dx}^2 + ${off.dy}^2} = \\sqrt{${off.dx * off.dx} + ${off.dy * off.dy}} = ${off.r}$`,
          ),
          step(
            "result",
            `El radio mide $${off.r}$.`,
            `The radius is $${off.r}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Rectangle: area + perimeter → sides (hard)                        */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pcm-syseq-01",
      subject: "math",
      topicId: "precalculus-mixed",
      subtopicId: "multi-step",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 240,
      tags: ["systems", "quadratics", "geometry"],
      prerequisites: ["quadratics", "systems"],
    },
    (rng) => {
      const cfg = rng.pick([
        { w: 5, l: 7 },
        { w: 6, l: 10 },
        { w: 4, l: 9 },
        { w: 7, l: 12 },
        { w: 8, l: 13 },
        { w: 5, l: 12 },
      ]);
      const area = cfg.w * cfg.l;
      const per = 2 * (cfg.w + cfg.l);
      const sum = cfg.w + cfg.l;
      return {
        skill: L("Rectángulo con área y perímetro", "Rectangle from area and perimeter"),
        statement: L(
          `El área de un rectángulo es $${area}\\ \\text{cm}^2$ y su perímetro es $${per}\\ \\text{cm}$. ¿Cuánto mide su **lado mayor**?`,
          `A rectangle has area $${area}\\ \\text{cm}^2$ and perimeter $${per}\\ \\text{cm}$. How long is its **longer side**?`,
        ),
        answer: { kind: "numeric", value: cfg.l, unitSuffix: "cm" },
        hints: [
          L(
            "Llama $x$ e $y$ a los lados: su suma es el semiperímetro y su producto es el área.",
            "Call the sides $x$ and $y$: their sum is the semiperimeter and their product is the area.",
          ),
          L(
            `Dos números con suma $${sum}$ y producto $${area}$ son las raíces de $u^2 - ${sum}u + ${area} = 0$.`,
            `Two numbers with sum $${sum}$ and product $${area}$ are the roots of $u^2 - ${sum}u + ${area} = 0$.`,
          ),
          L(
            "Factoriza la cuadrática (o usa la fórmula) y quédate con la raíz mayor.",
            "Factor the quadratic (or use the formula) and keep the larger root.",
          ),
        ],
        answerDisplay: L(
          `Lados: $${cfg.w}\\ \\text{cm}$ y $${cfg.l}\\ \\text{cm}$; el mayor es $${cfg.l}\\ \\text{cm}$`,
          `Sides: $${cfg.w}\\ \\text{cm}$ and $${cfg.l}\\ \\text{cm}$; the longer one is $${cfg.l}\\ \\text{cm}$`,
        ),
        solution: [
          step(
            "given",
            `Área $= ${area}\\ \\text{cm}^2$, perímetro $= ${per}\\ \\text{cm}$.`,
            `Area $= ${area}\\ \\text{cm}^2$, perimeter $= ${per}\\ \\text{cm}$.`,
          ),
          step(
            "approach",
            "Planteamos suma y producto de los lados y resolvemos la ecuación cuadrática resultante.",
            "Set up the sum and product of the sides and solve the resulting quadratic equation.",
          ),
          step(
            "calculation",
            `$x + y = \\frac{${per}}{2} = ${sum}$, $xy = ${area}$<br>$u^2 - ${sum}u + ${area} = 0$<br>$(u - ${cfg.w})(u - ${cfg.l}) = 0 \\Rightarrow u \\in \\{${cfg.w},\\ ${cfg.l}\\}$`,
            `$x + y = \\frac{${per}}{2} = ${sum}$, $xy = ${area}$<br>$u^2 - ${sum}u + ${area} = 0$<br>$(u - ${cfg.w})(u - ${cfg.l}) = 0 \\Rightarrow u \\in \\{${cfg.w},\\ ${cfg.l}\\}$`,
          ),
          step(
            "result",
            `Los lados miden $${cfg.w}\\ \\text{cm}$ y $${cfg.l}\\ \\text{cm}$: el mayor es $${cfg.l}\\ \\text{cm}$.`,
            `The sides are $${cfg.w}\\ \\text{cm}$ and $${cfg.l}\\ \\text{cm}$: the longer one is $${cfg.l}\\ \\text{cm}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Logarithmic equation with extraneous root (hard)                  */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pcm-logeq-01",
      subject: "math",
      topicId: "precalculus-mixed",
      subtopicId: "multi-step",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 240,
      tags: ["logarithms", "equations", "domain"],
      prerequisites: ["logarithmic"],
    },
    (rng) => {
      const cfg = rng.pick([
        { x: 4, d: 2, k: 3 },
        { x: 8, d: 6, k: 4 },
        { x: 8, d: 4, k: 5 },
        { x: 16, d: 14, k: 5 },
        { x: 16, d: 12, k: 6 },
        { x: 16, d: 8, k: 7 },
        { x: 32, d: 30, k: 6 },
        { x: 32, d: 24, k: 8 },
      ]);
      const pw = 2 ** cfg.k;
      const otherRoot = cfg.d - cfg.x; // always negative here
      return {
        skill: L("Ecuación logarítmica", "Logarithmic equation"),
        statement: L(
          `Resuelve $\\log_2 x + \\log_2(x - ${cfg.d}) = ${cfg.k}$ y escribe la solución **válida**.`,
          `Solve $\\log_2 x + \\log_2(x - ${cfg.d}) = ${cfg.k}$ and write the **valid** solution.`,
        ),
        answer: { kind: "numeric", value: cfg.x },
        hints: [
          L(
            "Combina los dos logaritmos en uno con la propiedad del producto.",
            "Combine the two logarithms into one with the product property.",
          ),
          L(
            `Pasa a forma exponencial: el argumento debe valer $2^{${cfg.k}}$.`,
            `Rewrite in exponential form: the argument must equal $2^{${cfg.k}}$.`,
          ),
          L(
            `Resuelve la cuadrática y comprueba el dominio: se necesita $x > ${cfg.d}$; una raíz no lo cumple.`,
            `Solve the quadratic and check the domain: you need $x > ${cfg.d}$; one root fails this.`,
          ),
        ],
        answerDisplay: L(`$x = ${cfg.x}$`, `$x = ${cfg.x}$`),
        solution: [
          step(
            "given",
            `$\\log_2 x + \\log_2(x - ${cfg.d}) = ${cfg.k}$, con dominio $x > ${cfg.d}$.`,
            `$\\log_2 x + \\log_2(x - ${cfg.d}) = ${cfg.k}$, with domain $x > ${cfg.d}$.`,
          ),
          step(
            "approach",
            "Aplicamos la propiedad del producto, pasamos a forma exponencial y resolvemos la cuadrática; al final descartamos la raíz fuera del dominio.",
            "Apply the product property, rewrite in exponential form, solve the quadratic; finally discard the root outside the domain.",
          ),
          step(
            "calculation",
            `$\\log_2\\bigl(x(x - ${cfg.d})\\bigr) = ${cfg.k}$<br>$x(x - ${cfg.d}) = ${pw} \\Rightarrow x^2 - ${cfg.d}x - ${pw} = 0$<br>$(x - ${cfg.x})(x + ${cfg.x - cfg.d}) = 0 \\Rightarrow x \\in \\{${cfg.x},\\ ${otherRoot}\\}$<br>${otherRoot} no cumple $x > ${cfg.d}$.`,
            `$\\log_2\\bigl(x(x - ${cfg.d})\\bigr) = ${cfg.k}$<br>$x(x - ${cfg.d}) = ${pw} \\Rightarrow x^2 - ${cfg.d}x - ${pw} = 0$<br>$(x - ${cfg.x})(x + ${cfg.x - cfg.d}) = 0 \\Rightarrow x \\in \\{${cfg.x},\\ ${otherRoot}\\}$<br>${otherRoot} fails $x > ${cfg.d}$.`,
          ),
          step(
            "result",
            `La solución válida es $x = ${cfg.x}$ (comprueba: $\\log_2 ${cfg.x} + \\log_2 ${cfg.x - cfg.d} = ${Math.log2(cfg.x)} + ${Math.log2(cfg.x - cfg.d)} = ${cfg.k}$).`,
            `The valid solution is $x = ${cfg.x}$ (check: $\\log_2 ${cfg.x} + \\log_2 ${cfg.x - cfg.d} = ${Math.log2(cfg.x)} + ${Math.log2(cfg.x - cfg.d)} = ${cfg.k}$).`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Challenge: compound-interest doubling time                        */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pcm-chal-01",
      subject: "math",
      topicId: "precalculus-mixed",
      subtopicId: "exam-style",
      difficulty: "challenge",
      questionType: "numeric",
      estimatedTimeSec: 300,
      tags: ["exponential", "compound-interest", "inequalities"],
      prerequisites: ["exponential", "quadratics"],
    },
    (rng) => {
      const cfg = rng.pick([
        { r: 10, factor: 1.1 },
        { r: 20, factor: 1.2 },
        { r: 25, factor: 1.25 },
        { r: 50, factor: 1.5 },
      ]);
      const C0 = rng.pick([1000, 2000, 5000]);
      let n = 1;
      while (cfg.factor ** n < 2) n++;
      const powers: string[] = [];
      for (let i = 1; i <= n; i++) {
        powers.push(`$${tok(cfg.factor)}^{${i}} \\approx ${tok(Number((cfg.factor ** i).toFixed(3)))}$`);
      }
      return {
        skill: L("Tiempo de duplicación", "Doubling time"),
        statement: L(
          `Un capital de $${C0}\\,€$ se invierte a interés compuesto del $${cfg.r}\\%$ anual. ¿Cuántos **años completos** deben pasar para que el capital se haya **más que duplicado**?`,
          `A sum of $${C0}\\,€$ is invested at $${cfg.r}\\%$ compound interest per year. How many **whole years** must pass before the capital has **more than doubled**?`,
        ),
        answer: { kind: "numeric", value: n },
        hints: [
          L(
            `Cada año el capital se multiplica por $1 + \\frac{${cfg.r}}{100} = ${tok(cfg.factor)}$.`,
            `Each year the capital is multiplied by $1 + \\frac{${cfg.r}}{100} = ${tok(cfg.factor)}$.`,
          ),
          L(
            `Busca el menor $n$ con $\\left(${tok(cfg.factor)}\\right)^{n} \\ge 2$; el importe inicial no influye.`,
            `Find the smallest $n$ with $\\left(${tok(cfg.factor)}\\right)^{n} \\ge 2$; the initial amount does not matter.`,
          ),
          L(
            "Prueba potencias sucesivas hasta superar 2.",
            "Test successive powers until you pass 2.",
          ),
        ],
        answerDisplay: L(`$n = ${n}$ años`, `$n = ${n}$ years`),
        solution: [
          step(
            "given",
            `Capital inicial $${C0}\\,€$, interés compuesto del $${cfg.r}\\%$ anual.`,
            `Initial capital $${C0}\\,€$, $${cfg.r}\\%$ compound interest per year.`,
          ),
          step(
            "approach",
            `Tras $n$ años el capital es $${C0}\\cdot ${tok(cfg.factor)}^{n}$; el doble sería $${2 * C0}\\,€$. El importe inicial se cancela al comparar.`,
            `After $n$ years the capital is $${C0}\\cdot ${tok(cfg.factor)}^{n}$; twice as much would be $${2 * C0}\\,€$. The initial amount cancels out in the comparison.`,
          ),
          step(
            "calculation",
            `${powers.join(", ")}<br>La primera potencia que alcanza o supera $2$ es $${tok(cfg.factor)}^{${n}}$.`,
            `${powers.join(", ")}<br>The first power that reaches or exceeds $2$ is $${tok(cfg.factor)}^{${n}}$.`,
          ),
          step(
            "result",
            `Se necesitan $${n}$ años completos para que el capital se haya más que duplicado.`,
            `It takes $${n}$ whole years for the capital to more than double.`,
          ),
        ],
      };
    },
  ),


  /* ---------------------------------------------------------------- */
  /* Curated Phase 2 — FOS/BOS 2010 §4.0 y FOS/BOS 2011 §4            */
  /* (geometría: sección de semiesfera, estrella de arcos, trébol).   */
  /* Transcribed as printed; verified independently (incl. Monte      */
  /* Carlo para la región estrella). Fixed problems.                   */
  /* ---------------------------------------------------------------- */

  /* FOS/BOS 2010, 4.1 — sección plana de una semiesfera. */
  template(
    {
      id: "pcm-geom-02",
      subject: "math",
      topicId: "precalculus-mixed",
      subtopicId: "exam-style",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 180,
      tags: ["geometry", "pythagoras", "sphere", "cross-section", "exam"],
      prerequisites: [],
      source: {
        sourceId: "fos-bos-2010-ht",
        license: "OPEN_LICENSE",
        exerciseNumber: "4.1",
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      return {
        skill: L("Sección plana de una semiesfera (examen real)", "Plane cross-section of a hemisphere (real exam)"),
        statement: L(
          "De una semiesfera de radio $R = 5$ cm se corta la parte superior con un plano paralelo a la base, a una altura de $3$ cm sobre la base. ¿Qué radio $r$ tiene el círculo de corte? (El centro de la esfera está en el centro de la base.)",
          "From a hemisphere of radius $R = 5$ cm the top is cut off with a plane parallel to the base, at a height of $3$ cm above the base. What radius $r$ does the cut circle have? (The sphere's centre lies at the centre of the base.)",
        ),
        answer: {
          kind: "numeric-unit",
          value: 4,
          units: ["cm"],
        },
        hints: [
          L(
            "Piensa en el corte **lateral** (de perfil): radio del corte, altura y radio de la esfera forman un triángulo rectángulo.",
            "Think of the **side** view (in profile): the cut radius, the height and the sphere's radius form a right triangle.",
          ),
          L(
            "La hipotenusa es el radio de la esfera $R = 5$: va del centro a cualquier punto del círculo de corte.",
            "The hypotenuse is the sphere's radius $R = 5$: it goes from the centre to any point of the cut circle.",
          ),
          L(
            "El cateto vertical mide $3$ (la altura del corte sobre el centro). Aplica Pitágoras: $r^2 = R^2 - 3^2$.",
            "The vertical leg is $3$ (the cut's height above the centre). Apply Pythagoras: $r^2 = R^2 - 3^2$.",
          ),
        ],
        answerDisplay: L("$r = 4$ cm", "$r = 4$ cm"),
        solution: [
          step(
            "given",
            "Semiesfera de radio $R = 5$ cm (centro de la esfera en el plano de la base); corte horizontal a altura $3$ cm sobre la base.",
            "Hemisphere of radius $R = 5$ cm (sphere's centre in the base plane); horizontal cut at $3$ cm above the base.",
          ),
          step(
            "approach",
            "Toda sección plana de una esfera es un círculo. En el triángulo rectángulo del perfil, la hipotenusa es $R$, el cateto vertical es la altura de corte $h$ y el otro cateto es el radio buscado $r$.",
            "Every plane section of a sphere is a circle. In the profile right triangle, the hypotenuse is $R$, the vertical leg is the cut height $h$ and the other leg is the sought radius $r$.",
          ),
          step(
            "calculation",
            "Triángulo: $r^2 + h^2 = R^2$.<br>$r^2 = 5^2 - 3^2 = 25 - 9 = 16 \\Rightarrow r = 4$ cm (el radio es positivo).<br>El triángulo es el clásico $3$-$4$-$5$.",
            "Triangle: $r^2 + h^2 = R^2$.<br>$r^2 = 5^2 - 3^2 = 25 - 9 = 16 \\Rightarrow r = 4$ cm (the radius is positive).<br>The triangle is the classic $3$-$4$-$5$.",
          ),
          step(
            "result",
            "El círculo de corte tiene radio $r = 4$ cm — Pitágoras sobre la sección de perfil de la esfera.",
            "The cut circle has radius $r = 4$ cm — Pythagoras on the sphere's profile section.",
          ),
        ],
      };
    },
  ),

  /* FOS/BOS 2010, 4.2 — estrella central de cuatro arcos. */
  template(
    {
      id: "pcm-geom-03",
      subject: "math",
      topicId: "precalculus-mixed",
      subtopicId: "exam-style",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 300,
      tags: ["geometry", "area", "decomposition", "exam"],
      prerequisites: [],
      source: {
        sourceId: "fos-bos-2010-ht",
        license: "OPEN_LICENSE",
        exerciseNumber: "4.2",
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      return {
        skill: L("Área de la estrella de cuatro arcos (examen real)", "Area of the four-arc star (real exam)"),
        statement: L(
          "En un cuadrado de lado $4$ cm se dibujan cuatro cuartos de círculo iguales de radio $r = 2$ cm, cada uno centrado en una esquina. Los arcos se tocan en los puntos medios de los lados y delimitan la región gris central (un 'rombo curvo'). Calcula el área de la región gris en cm². (Usa $\\pi \\approx 3.1416$; redondea a dos decimales.)",
          "In a square of side $4$ cm, four equal quarter circles of radius $r = 2$ cm are drawn, each centred at a corner. The arcs touch at the side midpoints and enclose the central gray region (a 'curvy diamond'). Compute the area of the gray region in cm². (Use $\\pi \\approx 3.1416$; round to two decimals.)",
        ),
        answer: {
          kind: "numeric",
          value: 3.43,
          tolerance: { mode: "absolute", value: 0.03 },
        },
        hints: [
          L(
            "Piensa al revés: en lugar de sumar la estrella, resta lo que **no** es estrella.",
            "Think in reverse: instead of adding up the star, subtract what is **not** star.",
          ),
          L(
            "Los cuatro cuartos de círculo (dos círculos completos en total) cubren el cuadrado salvo la región gris. ¿Se solapan entre ellos? Fíjate en la distancia entre centros vecinos.",
            "The four quarter circles (two full circles in total) cover the square except the gray region. Do they overlap each other? Look at the distance between neighbouring centres.",
          ),
          L(
            "Centros vecinos distan $4$ cm y las dos radios suman $2 + 2 = 4$: los círculos son **tangentes** (se tocan en un punto, sin solaparse). Área gris $= (2r)^2 - \\pi r^2$.",
            "Neighbouring centres are $4$ cm apart and the two radii add to $2 + 2 = 4$: the circles are **tangent** (touching at one point, no overlap). Gray area $= (2r)^2 - \\pi r^2$.",
          ),
        ],
        answerDisplay: L(
          "$A_{gris} = 16 - 4\\pi \\approx 3.43$ cm²",
          "$A_{gray} = 16 - 4\\pi \\approx 3.43$ cm²",
        ),
        solution: [
          step(
            "given",
            "Cuadrado de lado $2r = 4$ cm; cuatro cuartos de círculo de radio $r = 2$ centrados en las esquinas; región gris = 'rombo curvo' central.",
            "Square of side $2r = 4$ cm; four quarter circles of radius $r = 2$ centred at the corners; gray region = central 'curvy diamond'.",
          ),
          step(
            "approach",
            "Descomposición por complemento: gris = cuadrado − unión de los cuatro cuartos de círculo. La clave es decidir si los cuartos se solapan (habría que sumar y restar solapes).",
            "Decomposition by complement: gray = square − union of the four quarter circles. The key is deciding whether the quarters overlap (overlaps would need adding and subtracting).",
          ),
          step(
            "calculation",
            "Dos centros vecinos (esquinas de un mismo lado) distan $4$ cm; los radios suman $2 + 2 = 4$ cm → los círculos son tangentes exactamente en el punto medio de cada lado: **cero solape**.<br>Unión de los 4 cuartos $= 4 \\cdot \\frac{\\pi r^2}{4} = \\pi r^2 = 4\\pi \\approx 12.566$ cm².<br>Cuadrado $= 4^2 = 16$ cm².<br>Gris $= 16 - 4\\pi \\approx 16 - 12.566 = 3.434 \\approx 3.43$ cm².",
            "Two neighbouring centres (corners of the same side) are $4$ cm apart; the radii add to $2 + 2 = 4$ cm → the circles are tangent exactly at each side's midpoint: **zero overlap**.<br>Union of the 4 quarters $= 4 \\cdot \\frac{\\pi r^2}{4} = \\pi r^2 = 4\\pi \\approx 12.566$ cm².<br>Square $= 4^2 = 16$ cm².<br>Gray $= 16 - 4\\pi \\approx 16 - 12.566 = 3.434 \\approx 3.43$ cm².",
          ),
          step(
            "result",
            "$A_{gris} = r^2(4 - \\pi) = 4(4 - \\pi) \\approx 3.43$ cm². La tangencia es lo que hace el problema limpio: sin ella habría intersecciones de lente que sumar.",
            "$A_{gray} = r^2(4 - \\pi) = 4(4 - \\pi) \\approx 3.43$ cm². The tangency is what keeps the problem clean: without it there would be lens intersections to add.",
          ),
        ],
      };
    },
  ),

  /* FOS/BOS 2011, 4.1 — área del trébol (cuadrado + semicírculos). */
  template(
    {
      id: "pcm-geom-04",
      subject: "math",
      topicId: "precalculus-mixed",
      subtopicId: "exam-style",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 240,
      tags: ["geometry", "area", "semicircles", "exam"],
      prerequisites: [],
      source: {
        sourceId: "fos-bos-2011",
        license: "OPEN_LICENSE",
        exerciseNumber: "4.1",
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      return {
        skill: L("Área del trébol: cuadrado + semicírculos (examen real 2011)", "Cloverleaf area: square + semicircles (real 2011 exam)"),
        statement: L(
          "Se estampa un «trébol» sobre una placa: un cuadrado de lado $3$ cm con cuatro **semicírculos** pegados a sus lados (cada lado del cuadrado es el **diámetro** de su semicírculo). Calcula el área del trébol en cm². (Usa $\\pi \\approx 3.1416$; redondea a dos decimales.)",
          "A «cloverleaf» is stamped on a plate: a square of side $3$ cm with four **semicircles** attached to its sides (each side of the square is the **diameter** of its semicircle). Compute the cloverleaf's area in cm². (Use $\\pi \\approx 3.1416$; round to two decimals.)",
        ),
        answer: {
          kind: "numeric",
          value: 23.14,
          tolerance: { mode: "absolute", value: 0.03 },
        },
        hints: [
          L(
            "Descompón: el trébol es un cuadrado más cuatro piezas curvas.",
            "Decompose: the cloverleaf is a square plus four curved pieces.",
          ),
          L(
            "Cada lado ($3$ cm) es el **diámetro** de su semicírculo, así que el radio mide $1.5$ cm.",
            "Each side ($3$ cm) is the **diameter** of its semicircle, so the radius is $1.5$ cm.",
          ),
          L(
            "Cuatro semicírculos de radio $1.5$ equivalen a **dos círculos completos**: $2\\pi(1.5)^2 = 4.5\\pi$.",
            "Four semicircles of radius $1.5$ equal **two full circles**: $2\\pi(1.5)^2 = 4.5\\pi$.",
          ),
        ],
        answerDisplay: L(
          "$A = 9 + 4.5\\pi \\approx 23.14$ cm²",
          "$A = 9 + 4.5\\pi \\approx 23.14$ cm²",
        ),
        solution: [
          step(
            "given",
            "Trébol = cuadrado de lado $3$ cm + cuatro semicírculos cuyo diámetro es cada lado → radio $1.5$ cm.",
            "Cloverleaf = square of side $3$ cm + four semicircles whose diameter is each side → radius $1.5$ cm.",
          ),
          step(
            "approach",
            "Sumar piezas sin que se solapen: el cuadrado y los cuatro semicírculos solo se tocan por los lados.",
            "Add non-overlapping pieces: the square and the four semicircles only touch along the sides.",
          ),
          step(
            "calculation",
            "Cuadrado: $3^2 = 9$ cm².<br>Semicírculos: $4 \\cdot \\frac{\\pi (1.5)^2}{2} = 4 \\cdot \\frac{2.25\\pi}{2} = 4.5\\pi \\approx 14.137$ cm².<br>Total: $9 + 4.5\\pi \\approx 9 + 14.137 = 23.137 \\approx 23.14$ cm².",
            "Square: $3^2 = 9$ cm².<br>Semicircles: $4 \\cdot \\frac{\\pi (1.5)^2}{2} = 4 \\cdot \\frac{2.25\\pi}{2} = 4.5\\pi \\approx 14.137$ cm².<br>Total: $9 + 4.5\\pi \\approx 9 + 14.137 = 23.137 \\approx 23.14$ cm².",
          ),
          step(
            "result",
            "$A_{trébol} = 9 + 4.5\\pi \\approx 23.14$ cm² — coincide con el Lösungsvorschlag oficial ($A_{Quadrat} = 9$, $A_{Kreiszone} = 2 \\cdot 1.5^2 \\pi \\approx 14.14$).",
            "$A_{cloverleaf} = 9 + 4.5\\pi \\approx 23.14$ cm² — matches the official Lösungsvorschlag ($A_{Quadrat} = 9$, $A_{Kreiszone} = 2 \\cdot 1.5^2 \\pi \\approx 14.14$).",
          ),
        ],
      };
    },
  ),

  /* FOS/BOS 2011, 4.2 — porcentaje de desperdicio. */
  template(
    {
      id: "pcm-geom-05",
      subject: "math",
      topicId: "precalculus-mixed",
      subtopicId: "exam-style",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 180,
      tags: ["geometry", "percent", "waste", "exam"],
      prerequisites: [],
      source: {
        sourceId: "fos-bos-2011",
        license: "OPEN_LICENSE",
        exerciseNumber: "4.2",
      },
      reasoning: "modeling",
    },
    (rng) => {
      return {
        skill: L("Porcentaje de desperdicio (examen real 2011)", "Waste percentage (real 2011 exam)"),
        statement: L(
          "El trébol del problema anterior (cuadrado de lado $3$ cm + cuatro semicírculos de radio $1.5$ cm) se corta de una placa cuadrada de $6 \\times 6$ cm (el trébol toca justo los cuatro bordes). ¿Qué **porcentaje** de la placa se desperdicia? (Redondea a un decimal.)",
          "The previous cloverleaf (square of side $3$ cm + four semicircles of radius $1.5$ cm) is cut from a $6 \\times 6$ cm plate (the cloverleaf just touches all four edges). What **percentage** of the plate is wasted? (Round to one decimal.)",
        ),
        answer: {
          kind: "numeric",
          value: 35.7,
          tolerance: { mode: "absolute", value: 0.2 },
          unitSuffix: "%",
        },
        hints: [
          L(
            "Necesitas dos áreas: la del trébol (del problema anterior: $9 + 4.5\\pi$) y la de la placa.",
            "You need two areas: the cloverleaf's (from the previous problem: $9 + 4.5\\pi$) and the plate's.",
          ),
          L(
            "La placa mide $6 \\times 6$ porque el trébol ocupa $3 + 1.5 + 1.5$ en cada dirección (cuadrado + dos radios).",
            "The plate is $6 \\times 6$ because the cloverleaf spans $3 + 1.5 + 1.5$ in each direction (square + two radii).",
          ),
          L(
            "Desperdicio $= \\dfrac{A_{placa} - A_{trébol}}{A_{placa}} \\cdot 100$.",
            "Waste $= \\dfrac{A_{plate} - A_{cloverleaf}}{A_{plate}} \\cdot 100$.",
          ),
        ],
        answerDisplay: L(
          "Desperdicio $= \\dfrac{36 - 23.14}{36} \\approx 35.7\\%$",
          "Waste $= \\dfrac{36 - 23.14}{36} \\approx 35.7\\%$",
        ),
        solution: [
          step(
            "given",
            "Trébol con área $9 + 4.5\\pi \\approx 23.14$ cm²; placa cuadrada de $6 \\times 6 = 36$ cm².",
            "Cloverleaf with area $9 + 4.5\\pi \\approx 23.14$ cm²; square plate $6 \\times 6 = 36$ cm².",
          ),
          step(
            "approach",
            "Modelar la placa: el trébol mide $3 + 1.5 + 1.5 = 6$ de lado total (cuadrado + dos semicírculos que sobresalen), así que la placa mínima es exactamente $36$ cm². El porcentaje se refiere a la placa.",
            "Model the plate: the cloverleaf spans $3 + 1.5 + 1.5 = 6$ total per direction (square + two protruding semicircles), so the minimal plate is exactly $36$ cm². The percentage refers to the plate.",
          ),
          step(
            "calculation",
            "Desperdicio absoluto: $36 - (9 + 4.5\\pi) \\approx 36 - 23.137 = 12.863$ cm².<br>Porcentaje: $\\dfrac{12.863}{36} \\cdot 100 \\approx 35.73\\% \\approx 35.7\\%$.",
            "Absolute waste: $36 - (9 + 4.5\\pi) \\approx 36 - 23.137 = 12.863$ cm².<br>Percentage: $\\dfrac{12.863}{36} \\cdot 100 \\approx 35.73\\% \\approx 35.7\\%$.",
          ),
          step(
            "result",
            "Se desperdicia $\\approx 35.7\\%$ de la placa — coincide con el Lösungsvorschlag oficial del 2011.",
            "About $35.7\\%$ of the plate is wasted — matches the official 2011 Lösungsvorschlag.",
          ),
        ],
      };
    },
  ),

  /* ================================================================== */
  /* BRIDGE BATCH (Task 17-b) — heavy multi-concept compositions.        */
  /* Every template chains ≥2 curriculum topics through a labelled      */
  /* Paso 1/2/3 (tema) chain in the worked solution. Original           */
  /* compositions by the tutor's request: "más pesados, que consoliden  */
  /* los conocimientos entre sí". No source (not transcriptions).       */
  /* ================================================================== */

  /* pcm-bridge-01 — composition of a log with a quadratic (functions → */
  /* logarithms → quadratics → domain discussion).                     */
  template(
    {
      id: "pcm-bridge-01",
      subject: "math",
      topicId: "precalculus-mixed",
      subtopicId: "mixed-topics",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 300,
      tags: ["composition", "functions", "logarithmic", "quadratics", "domain"],
      prerequisites: ["functions", "logarithmic"],
      reasoning: "multi-concept",
    },
    (rng) => {
      const r1 = rng.int(3, 8);
      const r2 = rng.int(-6, -1);
      const C = rng.pick([3, 4]);
      const b = rng.int(-3, 3);
      const pw = 2 ** C;
      const p = -(r1 + r2);
      const q = r1 * r2 - b + pw;
      /** "+ 3" appended to g(x), or "" when b = 0 (avoids "+ 0") */
      const bT = b === 0 ? "" : ` ${bop(b)}`;
      return {
        skill: L("Logaritmo de un polinomio (composición)", "Logarithm of a polynomial (composition)"),
        statement: L(
          `Sean $f(x) = \\log_2\\bigl(${blin(b)}\\bigr)$ y $g(x) = ${bquad(p, q)}$. Resuelve la ecuación $f\\bigl(g(x)\\bigr) = ${C}$ y da la **mayor** de sus soluciones.`,
          `Let $f(x) = \\log_2\\bigl(${blin(b)}\\bigr)$ and $g(x) = ${bquad(p, q)}$. Solve the equation $f\\bigl(g(x)\\bigr) = ${C}$ and give the **largest** of its solutions.`,
        ),
        answer: { kind: "numeric", value: r1 },
        hints: [
          L(
            "Compón desde dentro: $f(g(x))$ evalúa $f$ en el polinomio $g(x)$.",
            "Compose from the inside out: $f(g(x))$ evaluates $f$ at the polynomial $g(x)$.",
          ),
          L(
            "Pasa a forma exponencial: $\\log_2(u) = " + C + "$ equivale a $u = 2^" + C + "$; aquí $u = g(x) " + (b < 0 ? "- " + Math.abs(b) : b > 0 ? "+ " + b : "") + "$.",
            "Rewrite in exponential form: $\\log_2(u) = " + C + "$ means $u = 2^" + C + "$; here $u = g(x) " + (b < 0 ? "- " + Math.abs(b) : b > 0 ? "+ " + b : "") + "$.",
          ),
          L(
            "Obtendrás una cuadrática en $x$: factorízala y comprueba que cada raíz deja el argumento del logaritmo positivo.",
            "You will get a quadratic in $x$: factor it and check that each root keeps the logarithm's argument positive.",
          ),
        ],
        answerDisplay: L(
          `Las soluciones son $x = ${r2}$ y $x = ${r1}$; la mayor es $${r1}$`,
          `The solutions are $x = ${r2}$ and $x = ${r1}$; the largest is $${r1}$`,
        ),
        solution: [
          step(
            "given",
          `$f(x) = \\log_2(${blin(b)})$, $g(x) = ${bquad(p, q)}$; buscamos $x$ con $f(g(x)) = ${C}$. El argumento del logaritmo debe ser positivo.`,
          `$f(x) = \\log_2(${blin(b)})$, $g(x) = ${bquad(p, q)}$; we want $x$ with $f(g(x)) = ${C}$. The logarithm's argument must be positive.`,
          ),
          step(
            "approach",
            "Encadenamos tres temas: composición de funciones (meter $g$ dentro de $f$), definición de logaritmo (forma exponencial) y resolución de la cuadrática resultante.",
            "We chain three topics: function composition (put $g$ inside $f$), the definition of logarithm (exponential form) and solving the resulting quadratic.",
          ),
          step(
            "calculation",
          `Paso 1 (funciones): $f(g(x)) = \\log_2\\bigl(g(x)${bT}\\bigr) = ${C}$.<br>Paso 2 (logaritmos): $g(x)${bT} = ${pw}$, es decir, $${bquad(p, q)}${bT} = ${pw}$.<br>Paso 3 (cuadráticas): $${bquad(p, q + b - pw)} = 0 \\Rightarrow (x - ${r1})(x + ${-r2}) = 0 \\Rightarrow x = ${r1}$ o $x = ${r2}$.<br>Paso 4 (dominio): ambas raíces dan $g(x)${bT} = ${pw} > 0$: las dos son válidas (ninguna se descarta).`,
          `Paso 1 (functions): $f(g(x)) = \\log_2\\bigl(g(x)${bT}\\bigr) = ${C}$.<br>Paso 2 (logarithms): $g(x)${bT} = ${pw}$, that is, $${bquad(p, q)}${bT} = ${pw}$.<br>Paso 3 (quadratics): $${bquad(p, q + b - pw)} = 0 \\Rightarrow (x - ${r1})(x + ${-r2}) = 0 \\Rightarrow x = ${r1}$ or $x = ${r2}$.<br>Paso 4 (domain): both roots give $g(x)${bT} = ${pw} > 0$: both are valid (neither is discarded).`,
          ),
          step(
            "result",
          `La ecuación tiene dos soluciones, $x = ${r2}$ y $x = ${r1}$; la mayor es $${r1}$.`,
          `The equation has two solutions, $x = ${r2}$ and $x = ${r1}$; the largest is $${r1}$.`,
          ),
        ],
      };
    },
  ),

  /* pcm-bridge-02 — right triangle from area + leg difference */
  /* (geometry → quadratics → Pythagoras/radicals).                    */
  template(
    {
      id: "pcm-bridge-02",
      subject: "math",
      topicId: "precalculus-mixed",
      subtopicId: "mixed-topics",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 300,
      tags: ["geometry", "quadratics", "pythagoras", "area", "radicals"],
      prerequisites: ["quadratics", "radicals"],
      reasoning: "multi-concept",
    },
    (rng) => {
      const cfg = rng.pick([
        { a: 3, b: 4, c: 5 },
        { a: 6, b: 8, c: 10 },
        { a: 5, b: 12, c: 13 },
        { a: 9, b: 12, c: 15 },
        { a: 8, b: 15, c: 17 },
        { a: 12, b: 16, c: 20 },
        { a: 7, b: 24, c: 25 },
        { a: 15, b: 20, c: 25 },
        { a: 10, b: 24, c: 26 },
        { a: 20, b: 21, c: 29 },
        { a: 18, b: 24, c: 30 },
        { a: 16, b: 30, c: 34 },
        { a: 21, b: 28, c: 35 },
        { a: 12, b: 35, c: 37 },
      ]);
      const d = cfg.b - cfg.a;
      const area = (cfg.a * cfg.b) / 2;
      return {
        skill: L("Triángulo rectángulo desde su área", "Right triangle from its area"),
        statement: L(
          `En un triángulo rectángulo, un cateto mide $${d}\\ \\text{cm}$ más que el otro y su área es de $${area}\\ \\text{cm}^2$. ¿Cuánto mide la **hipotenusa**?`,
          `In a right triangle, one leg is $${d}\\ \\text{cm}$ longer than the other and its area is $${area}\\ \\text{cm}^2$. How long is the **hypotenuse**?`,
        ),
        answer: { kind: "numeric", value: cfg.c, unitSuffix: "cm" },
        hints: [
          L(
            "Llama $x$ al cateto menor; el otro cateto mide $x " + (d > 0 ? "+ " + d : "- " + Math.abs(d)) + "$ y el área te da la ecuación.",
            "Call the shorter leg $x$; the other leg measures $x " + (d > 0 ? "+ " + d : "- " + Math.abs(d)) + "$ and the area gives you the equation.",
          ),
          L(
            "El área $\\frac{x(x " + (d > 0 ? "+ " + d : "- " + Math.abs(d)) + ")}{2} = " + area + "$ lleva a una cuadrática que se factoriza como producto de dos binomios.",
            "The area $\\frac{x(x " + (d > 0 ? "+ " + d : "- " + Math.abs(d)) + ")}{2} = " + area + "$ leads to a quadratic that factors as a product of two binomials.",
          ),
          L(
            "Con los dos catetos hallados, la hipotenusa sale de Pitágoras y queda una raíz exacta.",
            "With both legs found, the hypotenuse comes from Pythagoras and is an exact root.",
          ),
        ],
        answerDisplay: L(
          `Catetos $${cfg.a}\\ \\text{cm}$ y $${cfg.b}\\ \\text{cm}$; hipotenusa $${cfg.c}\\ \\text{cm}$`,
          `Legs $${cfg.a}\\ \\text{cm}$ and $${cfg.b}\\ \\text{cm}$; hypotenuse $${cfg.c}\\ \\text{cm}$`,
        ),
        solution: [
          step(
            "given",
          `Un cateto mide ${d} cm más que el otro; área = ${area} cm².`,
          `One leg is ${d} cm longer than the other; area = ${area} cm².`,
          ),
          step(
            "approach",
            "Modelamos con una variable (geometría), la ecuación del área resulta cuadrática y la hipotenusa sale con Pitágoras.",
            "We model with one variable (geometry), the area equation becomes quadratic, and the hypotenuse comes from Pythagoras.",
          ),
          step(
            "calculation",
          `Paso 1 (geometría): sea $x$ el cateto menor; el otro es $x ${bop(d)}$ y $\\frac{x\\,(x ${bop(d)})}{2} = ${area}$.<br>Paso 2 (cuadráticas): multiplicando por 2 y expandiendo: $x^2 ${bterm(d, "x")} - ${cfg.a * cfg.b} = 0$, que se factoriza como $(x ${bop(cfg.b)})(x - ${cfg.a}) = 0$. Las raíces son $x = ${-cfg.b}$ (negativa, se descarta) y $x = ${cfg.a}$.<br>Paso 3 (radicales/Pitágoras): los catetos son $${cfg.a}$ y $${cfg.b}$, así que $h = \\sqrt{${cfg.a}^2 + ${cfg.b}^2} = \\sqrt{${cfg.a * cfg.a + cfg.b * cfg.b}} = ${cfg.c}$.`,
          `Paso 1 (geometry): let $x$ be the shorter leg; the other is $x ${bop(d)}$ and $\\frac{x\\,(x ${bop(d)})}{2} = ${area}$.<br>Paso 2 (quadratics): multiplying by 2 and expanding: $x^2 ${bterm(d, "x")} - ${cfg.a * cfg.b} = 0$, which factors as $(x ${bop(cfg.b)})(x - ${cfg.a}) = 0$. The roots are $x = ${-cfg.b}$ (negative, discarded) and $x = ${cfg.a}$.<br>Paso 3 (radicals/Pythagoras): the legs are $${cfg.a}$ and $${cfg.b}$, so $h = \\sqrt{${cfg.a}^2 + ${cfg.b}^2} = \\sqrt{${cfg.a * cfg.a + cfg.b * cfg.b}} = ${cfg.c}$.`,
          ),
          step(
            "result",
          `La hipotenusa mide $${cfg.c}\\ \\text{cm}$ (catetos $${cfg.a}$ cm y $${cfg.b}$ cm).`,
          `The hypotenuse is $${cfg.c}\\ \\text{cm}$ (legs $${cfg.a}$ cm and $${cfg.b}$ cm).`,
          ),
        ],
      };
    },
  ),

  /* pcm-bridge-03 — tangent line: find k (analytic geometry → systems → */
  /* discriminant/parameters).                                        */
  template(
    {
      id: "pcm-bridge-03",
      subject: "math",
      topicId: "precalculus-mixed",
      subtopicId: "mixed-topics",
      difficulty: "challenge",
      questionType: "numeric",
      estimatedTimeSec: 300,
      tags: ["tangency", "discriminant", "quadratics", "analytic-geometry", "parameters"],
      prerequisites: ["quadratics", "systems"],
      reasoning: "multi-concept",
    },
    (rng) => {
      const m = rng.int(-4, 4);
      const h = rng.nonZeroInt(-4, 4);
      const q = rng.int(-5, 5);
      const p = m + 2 * h;
      const k = q - h * h;
      /** "+ 5" after the x-term, or "" when q = 0 (avoids "+ 0") */
      const qT = q === 0 ? "" : ` ${bop(q)}`;
      const lineStr =
        m === 0
          ? "k"
          : `${m === 1 ? "" : m === -1 ? "-" : m}x + k`;
      const lineFull = m === 0 ? "y = k" : `y = ${lineStr}`;
      return {
        skill: L("Recta tangente a una parábola", "Line tangent to a parabola"),
        statement: L(
          `La recta $${lineFull}$ es tangente a la parábola $y = ${bquad(p, q)}$. Halla el valor de $k$.`,
          `The line $${lineFull}$ is tangent to the parabola $y = ${bquad(p, q)}$. Find the value of $k$.`,
        ),
        answer: { kind: "numeric", value: k },
        hints: [
          L(
            "Tangente significa **un único punto de corte**: la ecuación que iguala recta y parábola debe tener exactamente una solución.",
            "Tangent means **exactly one intersection point**: the equation equating line and parabola must have exactly one solution.",
          ),
          L(
            "Iguala las dos expresiones y agrupa: queda una cuadrática en $x$ cuyo discriminante debe valer $0$.",
            "Equate both expressions and collect terms: you get a quadratic in $x$ whose discriminant must equal $0$.",
          ),
          L(
            `Escribe $\\Delta = (${p - m})^2 - 4(${q} - k) = 0$ y despeja $k$.`,
            `Write $\\Delta = (${p - m})^2 - 4(${q} - k) = 0$ and solve for $k$.`,
          ),
        ],
        answerDisplay: L(`$k = ${k}$`, `$k = ${k}$`),
        solution: [
          step(
            "given",
          `Recta $${lineFull}$, parábola $y = ${bquad(p, q)}$; condición: tangencia.`,
          `Line $${lineFull}$, parabola $y = ${bquad(p, q)}$; condition: tangency.`,
          ),
          step(
            "approach",
            "Traducimos la condición geométrica (tangencia) a una condición algebraica sobre un parámetro: el sistema recta–parábola debe tener solución única, lo que equivale a discriminante nulo.",
            "We translate the geometric condition (tangency) into an algebraic condition on a parameter: the line–parabola system must have a unique solution, which is equivalent to a null discriminant.",
          ),
          step(
            "calculation",
          `Paso 1 (sistemas): igualamos $${bquad(p, q)} = ${m === 0 ? "k" : `${m === 1 ? "" : m === -1 ? "-" : m}x + k`}$ y agrupamos: $x^2 ${bterm(p - m, "x")}${qT} - k = 0$.<br>Paso 2 (discriminante): tangencia ⟹ una raíz doble ⟹ $\\Delta = (${p - m})^2 - 4(${q} - k) = ${4 * h * h} - 4(${q} - k) = 0$.<br>Paso 3 (despeje del parámetro): $4(${q} - k) = ${4 * h * h}$ ⟹ $k = ${q} - ${h * h} = ${k}$.`,
          `Paso 1 (systems): equate $${bquad(p, q)} = ${m === 0 ? "k" : `${m === 1 ? "" : m === -1 ? "-" : m}x + k`}$ and collect: $x^2 ${bterm(p - m, "x")}${qT} - k = 0$.<br>Paso 2 (discriminant): tangency ⟹ a double root ⟹ $\\Delta = (${p - m})^2 - 4(${q} - k) = ${4 * h * h} - 4(${q} - k) = 0$.<br>Paso 3 (solving for the parameter): $4(${q} - k) = ${4 * h * h}$ ⟹ $k = ${q} - ${h * h} = ${k}$.`,
          ),
          step(
            "result",
          `$k = ${k}$: con ese valor la recta toca a la parábola en un único punto (de abscisa $x = ${-h}$).`,
          `$k = ${k}$: with that value the line touches the parabola at a single point (of abscissa $x = ${-h}$).`,
          ),
        ],
      };
    },
  ),

  /* pcm-bridge-04 — arithmetic series: which n (sequences → quadratics → */
  /* discarding the negative root).                                  */
  template(
    {
      id: "pcm-bridge-04",
      subject: "math",
      topicId: "precalculus-mixed",
      subtopicId: "mixed-topics",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 300,
      tags: ["sequences", "arithmetic", "quadratics", "spurious"],
      prerequisites: ["sequences", "quadratics"],
      reasoning: "multi-concept",
    },
    (rng) => {
      let n0 = 10;
      let a = 2;
      let d = 3;
      let S = 155;
      for (let i = 0; i < 200; i++) {
        const n = rng.int(6, 12);
        const aa = rng.int(-4, 5);
        const dd = rng.int(1, 4);
        const raw = (n * (2 * aa + (n - 1) * dd)) / 2;
        if (raw > 0) {
          n0 = n;
          a = aa;
          d = dd;
          S = raw;
          break;
        }
      }
      return {
        skill: L("¿Cuántos términos sumados? (serie aritmética)", "How many terms were added? (arithmetic series)"),
        statement: L(
          `Una sucesión aritmética tiene primer término $a_1 = ${a}$ y diferencia común $d = ${d}$. Si la suma de los primeros $n$ términos vale $S_n = ${S}$, ¿cuál es el valor de $n$?`,
          `An arithmetic sequence has first term $a_1 = ${a}$ and common difference $d = ${d}$. If the sum of the first $n$ terms is $S_n = ${S}$, what is the value of $n$?`,
        ),
        answer: { kind: "numeric", value: n0 },
        hints: [
          L(
            "Usa la fórmula de la suma: $S_n = \\frac{n}{2}\\bigl(2a_1 + (n-1)d\\bigr)$. Aquí la incógnita es $n$.",
            "Use the sum formula: $S_n = \\frac{n}{2}\\bigl(2a_1 + (n-1)d\\bigr)$. Here the unknown is $n$.",
          ),
          L(
            "Al sustituir te queda una **cuadrática en $n$** (multiplica antes por 2 para quitar el denominador).",
            "Substituting leaves a **quadratic in $n$** (multiply through by 2 first to clear the denominator).",
          ),
          L(
            "Resuélvela: una raíz es negativa y no tiene sentido como número de términos.",
            "Solve it: one root is negative and makes no sense as a number of terms.",
          ),
        ],
        answerDisplay: L(`$n = ${n0}$`, `$n = ${n0}$`),
        solution: [
          step(
            "given",
          `$a_1 = ${a}$, $d = ${d}$, $S_n = ${S}$; incógnita: $n$.`,
          `$a_1 = ${a}$, $d = ${d}$, $S_n = ${S}$; unknown: $n$.`,
          ),
          step(
            "approach",
            "La fórmula de la suma es cuadrática en $n$: al sustituir los datos obtenemos una ecuación cuadrática y nos quedamos con la raíz positiva (el número de términos no puede ser negativo).",
            "The sum formula is quadratic in $n$: substituting the data yields a quadratic equation, and we keep the positive root (a number of terms cannot be negative).",
          ),
          step(
            "calculation",
          `Paso 1 (sucesiones): $S_n = \\frac{n}{2}\\bigl(2\\cdot(${a}) + (n-1)\\cdot(${d})\\bigr) = ${S}$.<br>Paso 2 (cuadráticas): multiplicando por 2 y expandiendo: $${d === 1 ? "" : d}n^2 ${bterm(2 * a - d, "n")} ${bop(-2 * S)} = 0$.<br>Paso 3 (descarte): por Vieta, el producto de las raíces es $-\\frac{${2 * S}}{${d}} < 0$, así que una raíz es negativa y se descarta. La raíz positiva es $n = ${n0}$ (comprueba: $S_{${n0}} = ${S}$).`,
          `Paso 1 (sequences): $S_n = \\frac{n}{2}\\bigl(2\\cdot(${a}) + (n-1)\\cdot(${d})\\bigr) = ${S}$.<br>Paso 2 (quadratics): multiplying by 2 and expanding: $${d === 1 ? "" : d}n^2 ${bterm(2 * a - d, "n")} ${bop(-2 * S)} = 0$.<br>Paso 3 (discard): by Vieta, the product of the roots is $-\\frac{${2 * S}}{${d}} < 0$, so one root is negative and is discarded. The positive root is $n = ${n0}$ (check: $S_{${n0}} = ${S}$).`,
          ),
          step(
            "result",
          `Se sumaron $n = ${n0}$ términos.`,
          `$n = ${n0}$ terms were added.`,
          ),
        ],
      };
    },
  ),

  /* pcm-bridge-05 — circle through three points (systems → analytic */
  /* geometry → general form).                                     */
  template(
    {
      id: "pcm-bridge-05",
      subject: "math",
      topicId: "precalculus-mixed",
      subtopicId: "mixed-topics",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 360,
      tags: ["circles", "systems", "analytic-geometry", "general-form"],
      prerequisites: ["systems", "analytic-geometry"],
      reasoning: "multi-concept",
    },
    (rng) => {
      const c1 = rng.int(-4, 4);
      const c2 = rng.int(-4, 4);
      const tri = rng.pick([
        { a: 3, b: 4, r: 5 },
        { a: 4, b: 3, r: 5 },
        { a: 6, b: 8, r: 10 },
        { a: 8, b: 6, r: 10 },
        { a: 5, b: 12, r: 13 },
        { a: 12, b: 5, r: 13 },
        { a: 9, b: 12, r: 15 },
        { a: 12, b: 9, r: 15 },
      ]);
      const P1 = { x: c1 + tri.r, y: c2 };
      const P2 = { x: c1 - tri.a, y: c2 + tri.b };
      const P3 = { x: c1 + tri.a, y: c2 - tri.b };
      const D = -2 * c1;
      const E = -2 * c2;
      const F = c1 * c1 + c2 * c2 - tri.r * tri.r;
      // equations displayed below: (P3 − P2) and (P1 − P3):
      const rhsA = 4 * (tri.b * c2 - tri.a * c1);
      const rhsB = -((tri.r - tri.a) * (2 * c1 + tri.r + tri.a) + tri.b * (2 * c2 - tri.b));
      /** numeric "+ 25" / "− 25" term for −F, or "" when F = 0 (circle through the origin) */
      const fTerm = F === 0 ? "" : ` ${F < 0 ? "+" : "-"} ${Math.abs(F)}`;
      return {
        skill: L("Circunferencia por tres puntos", "Circle through three points"),
        statement: L(
          `Una circunferencia de ecuación $x^2 + y^2 + Dx + Ey + F = 0$ pasa por los puntos $${bpt(P1.x, P1.y)}$, $${bpt(P2.x, P2.y)}$ y $${bpt(P3.x, P3.y)}$. Halla su radio $r$.`,
          `A circle with equation $x^2 + y^2 + Dx + Ey + F = 0$ passes through the points $${bpt(P1.x, P1.y)}$, $${bpt(P2.x, P2.y)}$ and $${bpt(P3.x, P3.y)}$. Find its radius $r$.`,
        ),
        answer: { kind: "numeric", value: tri.r },
        hints: [
          L(
            "Sustituye cada punto en la ecuación general: cada uno da una ecuación lineal en $D$, $E$ y $F$.",
            "Substitute each point into the general equation: each one gives a linear equation in $D$, $E$ and $F$.",
          ),
          L(
            "Resta dos de esas ecuaciones miembro a miembro: $F$ se cancela y queda un sistema lineal $2\\times2$ en $D$ y $E$.",
            "Subtract two of those equations side by side: $F$ cancels and a $2\\times2$ linear system in $D$ and $E$ remains.",
          ),
          L(
            "El centro de la circunferencia es $(-D/2, -E/2)$ y el radio cumple $r^2 = \\frac{D^2+E^2}{4} - F$.",
            "The circle's centre is $(-D/2, -E/2)$ and the radius satisfies $r^2 = \\frac{D^2+E^2}{4} - F$.",
          ),
        ],
        answerDisplay: L(
          `Centro $(${c1}, ${c2})$, $r = ${tri.r}$`,
          `Centre $(${c1}, ${c2})$, $r = ${tri.r}$`,
        ),
        solution: [
          step(
            "given",
          `Circunferencia $x^2 + y^2 + Dx + Ey + F = 0$ por $${bpt(P1.x, P1.y)}$, $${bpt(P2.x, P2.y)}$, $${bpt(P3.x, P3.y)}$.`,
          `Circle $x^2 + y^2 + Dx + Ey + F = 0$ through $${bpt(P1.x, P1.y)}$, $${bpt(P2.x, P2.y)}$, $${bpt(P3.x, P3.y)}$.`,
          ),
          step(
            "approach",
            "Cada punto produce una ecuación; restando pares se eliminan $F$ y los términos cuadráticos, dejando un sistema lineal que resolvemos (sistemas) para después extraer centro y radio (geometría analítica).",
            "Each point produces an equation; subtracting pairs eliminates $F$ and the quadratic terms, leaving a linear system we solve (systems) before extracting centre and radius (analytic geometry).",
          ),
          step(
            "calculation",
          `Paso 1 (sustitución): los tres puntos dan tres ecuaciones lineales en $D$, $E$, $F$.<br>Paso 2 (sistemas): restando la ecuación de $${bpt(P2.x, P2.y)}$ a la de $${bpt(P3.x, P3.y)}$, y la de $${bpt(P3.x, P3.y)}$ a la de $${bpt(P1.x, P1.y)}$: $${2 * tri.a}D ${bterm(-2 * tri.b, "E")} = ${rhsA}$ y $${tri.r - tri.a === 1 ? "" : tri.r - tri.a}D ${bterm(tri.b, "E")} = ${rhsB}$. Resolviendo el sistema: $D = ${D}$, $E = ${E}$; sustituyendo cualquiera de los puntos, $F = ${F}$.<br>Paso 3 (geometría analítica): el centro es $(-D/2, -E/2) = (${c1}, ${c2})$ y $r^2 = \\frac{D^2 + E^2}{4} - F = ${c1 * c1 + c2 * c2}${fTerm} = ${tri.r * tri.r}$, así que $r = ${tri.r}$.`,
          `Paso 1 (substitution): the three points give three linear equations in $D$, $E$, $F$.<br>Paso 2 (systems): subtracting the equation of $${bpt(P2.x, P2.y)}$ from that of $${bpt(P3.x, P3.y)}$, and that of $${bpt(P3.x, P3.y)}$ from $${bpt(P1.x, P1.y)}$: $${2 * tri.a}D ${bterm(-2 * tri.b, "E")} = ${rhsA}$ and $${tri.r - tri.a === 1 ? "" : tri.r - tri.a}D ${bterm(tri.b, "E")} = ${rhsB}$. Solving the system: $D = ${D}$, $E = ${E}$; substituting any of the points, $F = ${F}$.<br>Paso 3 (analytic geometry): the centre is $(-D/2, -E/2) = (${c1}, ${c2})$ and $r^2 = \\frac{D^2 + E^2}{4} - F = ${c1 * c1 + c2 * c2}${fTerm} = ${tri.r * tri.r}$, so $r = ${tri.r}$.`,
          ),
          step(
            "result",
          `La circunferencia tiene centro $(${c1}, ${c2})$ y radio $r = ${tri.r}$.`,
          `The circle has centre $(${c1}, ${c2})$ and radius $r = ${tri.r}$.`,
          ),
        ],
      };
    },
  ),

  /* pcm-bridge-06 — compound vs simple interest: first year compound */
  /* wins (exponential → linear model → inequality/table search).     */
  template(
    {
      id: "pcm-bridge-06",
      subject: "math",
      topicId: "precalculus-mixed",
      subtopicId: "mixed-topics",
      difficulty: "challenge",
      questionType: "numeric",
      estimatedTimeSec: 420,
      tags: ["exponential", "compound-interest", "simple-interest", "inequalities", "modeling"],
      prerequisites: ["exponential"],
      reasoning: "multi-concept",
    },
    (rng) => {
      const cfg = rng.pick([
        { c: 20, s: 50 },
        { c: 15, s: 35 },
        { c: 12, s: 30 },
        { c: 10, s: 25 },
        { c: 8, s: 40 },
      ]);
      const C0 = rng.pick([500, 1000, 2000, 5000]);
      const factor = 1 + cfg.c / 100;
      let n = 1;
      while (factor ** n <= 1 + (cfg.s / 100) * n) n++;
      const years = [...new Set(
        [Math.max(1, Math.round(n / 4)), Math.round(n / 2), Math.round((3 * n) / 4), n - 1, n].filter((y) => y >= 1),
      )].sort((x, y) => x - y);
      const r2 = (v: number) => Number(v.toFixed(2));
      const table = years
        .map((y) => {
          const comp = r2(factor ** y);
          const simp = r2(1 + (cfg.s / 100) * y);
          return `$${y}$: $${tok(comp)}$ ${comp > simp ? ">" : "<"} $${tok(simp)}$`;
        })
        .join(", ");
      return {
        skill: L("Interés compuesto contra interés simple", "Compound interest versus simple interest"),
        statement: L(
          `Dos bancos ofrecen depósitos a un año: el Banco A paga el $${cfg.c}\\%$ anual con capitalización (interés **compuesto**); el Banco B paga el $${cfg.s}\\%$ anual **simple**, sin capitalizar. Se depositan $${C0}$ dólares en cada banco el mismo día. ¿Tras cuántos **años completos** el saldo del Banco A supera por primera vez al del Banco B?`,
          `Two banks offer one-year deposits: Bank A pays $${cfg.c}\\%$ per year compounded (**compound** interest); Bank B pays $${cfg.s}\\%$ per year **simple**, without compounding. $${C0}$ dollars are deposited at each bank on the same day. After how many **whole years** does Bank A's balance first exceed Bank B's?`,
        ),
        answer: { kind: "numeric", value: n },
        hints: [
          L(
            "Escribe el saldo de cada banco tras $n$ años: A: $C_0\\,(1 + \\text{tasa})^n$; B: $C_0\\,(1 + \\text{tasa}\\cdot n)$.",
            "Write each bank's balance after $n$ years: A: $C_0\\,(1 + \\text{rate})^n$; B: $C_0\\,(1 + \\text{rate}\\cdot n)$.",
          ),
          L(
            "El capital inicial $C_0$ multiplica a los dos lados: se cancela. Solo queda comparar el factor de crecimiento elevado a $n$ contra $1 + \\text{tasa}\\cdot n$ (con la tasa de cada banco).",
            "The initial capital $C_0$ multiplies both sides: it cancels out. You only need to compare the growth factor raised to $n$ against $1 + \\text{rate}\\cdot n$.",
          ),
          L(
            "Con calculadora, evalúa el factor compuesto para años crecientes (potencias sucesivas o elevando al cuadrado) hasta superar el valor del interés simple.",
            "With a calculator, evaluate the compound factor for increasing years (successive powers or repeated squaring) until it exceeds the simple-interest value.",
          ),
        ],
        answerDisplay: L(`$n = ${n}$ años`, `$n = ${n}$ years`),
        solution: [
          step(
            "given",
          `Banco A: compuesto del $${cfg.c}\\%$ anual; Banco B: simple del $${cfg.s}\\%$ anual; mismo capital de $${C0}$ dólares.`,
          `Bank A: $${cfg.c}\\%$ compound per year; Bank B: $${cfg.s}\\%$ simple per year; same capital of $${C0}$ dollars.`,
          ),
          step(
            "approach",
            "Modelamos ambos saldos (exponencial contra lineal) y buscamos el primer año en que el compuesto gana. Como el capital inicial es el mismo, se cancela: la comparación no depende de $C_0$.",
            "We model both balances (exponential versus linear) and search for the first year the compound one wins. Since the initial capital is the same, it cancels: the comparison does not depend on $C_0$.",
          ),
          step(
            "calculation",
          `Paso 1 (modelos): el saldo del Banco A es $A(n) = ${C0}\\cdot ${tok(factor)}^{n}$ (exponencial) y el del Banco B es $B(n) = ${C0}\\bigl(1 + ${tok(cfg.s / 100)}n\\bigr)$ (lineal).<br>Paso 2 (desigualdad): $A(n) > B(n) \\iff ${tok(factor)}^{n} > 1 + ${tok(cfg.s / 100)}n$ (el $${C0}$ se cancela).<br>Paso 3 (tabla año → compuesto vs simple): ${table}.<br>La primera vez que el compuesto supera al simple es el año $${n}$.`,
          `Paso 1 (models): Bank A's balance is $A(n) = ${C0}\\cdot ${tok(factor)}^{n}$ (exponential) and Bank B's is $B(n) = ${C0}\\bigl(1 + ${tok(cfg.s / 100)}n\\bigr)$ (linear).<br>Paso 2 (inequality): $A(n) > B(n) \\iff ${tok(factor)}^{n} > 1 + ${tok(cfg.s / 100)}n$ (the $${C0}$ cancels).<br>Paso 3 (table year → compound vs simple): ${table}.<br>The first time compound beats simple is year $${n}$.`,
          ),
          step(
            "result",
          `Tras $${n}$ años completos, el saldo del Banco A supera por primera vez al del Banco B.`,
          `After $${n}$ whole years, Bank A's balance exceeds Bank B's for the first time.`,
          ),
        ],
      };
    },
  ),

  /* pcm-bridge-07 — rational equation → quadratic with a spurious */
  /* root (rational → domain → quadratics). MC with error-mapped    */
  /* distractors.                                                   */
  template(
    {
      id: "pcm-bridge-07",
      subject: "math",
      topicId: "precalculus-mixed",
      subtopicId: "mixed-topics",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["rational", "quadratics", "domain", "spurious", "equations"],
      prerequisites: ["rational", "quadratics"],
      reasoning: "multi-concept",
    },
    (rng) => {
      const a = rng.int(2, 5);
      const B = rng.int(1, 6);
      const c = 2 * a * a - a;
      const valid = 1 - 2 * a - B;
      const options: McOption[] = [
        { id: "a", text: L(`$x = ${valid}$`, `$x = ${valid}$`), correct: true },
        { id: "b", text: L(`$x = ${a}$`, `$x = ${a}$`), correct: false },
        { id: "c", text: L(`$x = ${a}$ y $x = ${valid}$`, `$x = ${a}$ and $x = ${valid}$`), correct: false },
        { id: "d", text: L("No tiene solución", "It has no solution"), correct: false },
      ];
      return {
        skill: L("Ecuación racional con raíz espuria", "Rational equation with a spurious root"),
        statement: L(
          `Resuelve en los reales: $$\\frac{x}{x - ${a}} + \\frac{${B}}{x + ${a}} = \\frac{x + ${c}}{x^2 - ${a * a}}$$`,
          `Solve over the reals: $$\\frac{x}{x - ${a}} + \\frac{${B}}{x + ${a}} = \\frac{x + ${c}}{x^2 - ${a * a}}$$`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El denominador común es $(x - " + a + ")(x + " + a + ")$. Multiplica por él — pero antes anota qué valores de $x$ quedan prohibidos.",
            "The common denominator is $(x - " + a + ")(x + " + a + ")$. Multiply through by it — but first note which values of $x$ are forbidden.",
          ),
          L(
            "Tras multiplicar y simplificar queda una cuadrática; resuélvela por factorización.",
            "After multiplying and simplifying you get a quadratic; solve it by factoring.",
          ),
          L(
            "Comprueba cada raíz en la ecuación ORIGINAL: una de ellas anula los denominadores y debe rechazarse.",
            "Test each root in the ORIGINAL equation: one of them zeroes the denominators and must be rejected.",
          ),
        ],
        answerDisplay: L(
          `La única solución válida es $x = ${valid}$; $x = ${a}$ se descarta (anula los denominadores)`,
          `The only valid solution is $x = ${valid}$; $x = ${a}$ is discarded (it zeroes the denominators)`,
        ),
        solution: [
          step(
            "given",
          `$\\frac{x}{x - ${a}} + \\frac{${B}}{x + ${a}} = \\frac{x + ${c}}{x^2 - ${a * a}}$, con $x \\ne ${a}$ y $x \\ne ${-a}$.`,
          `$\\frac{x}{x - ${a}} + \\frac{${B}}{x + ${a}} = \\frac{x + ${c}}{x^2 - ${a * a}}$, with $x \\ne ${a}$ and $x \\ne ${-a}$.`,
          ),
          step(
            "approach",
            "Reducimos a ecuación cuadrática multiplicando por el denominador común y después verificamos las raíces contra el dominio (raíces espurias).",
            "We reduce to a quadratic by multiplying by the common denominator and then verify the roots against the domain (spurious roots).",
          ),
          step(
            "calculation",
          `Paso 1 (dominio): $x \\ne ${a}$, $x \\ne ${-a}$.<br>Paso 2 (racionales): multiplicando por $(x^2 - ${a * a})$: $x(x ${bop(a)}) + ${B}(x ${bop(-a)}) = x + ${c}$.<br>Paso 3 (cuadráticas): $x^2 ${bterm(a + B - 1, "x")} - ${a * B + c} = 0 \\Rightarrow (x - ${a})(x + ${-valid}) = 0 \\Rightarrow x = ${a}$ o $x = ${valid}$.<br>Paso 4 (comprobación): $x = ${a}$ anula los denominadores → se rechaza. Para $x = ${valid}$: $\\frac{${valid}}{${valid - a}} + \\frac{${B}}{${valid + a}} = \\frac{${valid + c}}{${valid * valid - a * a}}$ (se cumple).`,
          `Paso 1 (domain): $x \\ne ${a}$, $x \\ne ${-a}$.<br>Paso 2 (rational): multiplying by $(x^2 - ${a * a})$: $x(x ${bop(a)}) + ${B}(x ${bop(-a)}) = x + ${c}$.<br>Paso 3 (quadratics): $x^2 ${bterm(a + B - 1, "x")} - ${a * B + c} = 0 \\Rightarrow (x - ${a})(x + ${-valid}) = 0 \\Rightarrow x = ${a}$ or $x = ${valid}$.<br>Paso 4 (check): $x = ${a}$ zeroes the denominators → rejected. For $x = ${valid}$: $\\frac{${valid}}{${valid - a}} + \\frac{${B}}{${valid + a}} = \\frac{${valid + c}}{${valid * valid - a * a}}$ (it holds).`,
          ),
          step(
            "result",
          `La única solución válida es $x = ${valid}$. Las otras opciones son errores clásicos: dar solo $x = ${a}$ (raíz espuria) o dar las dos raíces sin comprobar el dominio.`,
          `The only valid solution is $x = ${valid}$. The other options are classic errors: giving only $x = ${a}$ (the spurious root) or giving both roots without checking the domain.`,
          ),
        ],
      };
    },
  ),

  /* pcm-bridge-08 — trig equation via double angle, count solutions */
  /* on [0, 2π) (identities → quadratics → interval). MC.           */
  template(
    {
      id: "pcm-bridge-08",
      subject: "math",
      topicId: "precalculus-mixed",
      subtopicId: "mixed-topics",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 360,
      tags: ["trig", "double-angle", "identities", "intervals", "counting"],
      prerequisites: ["trig-functions", "trig-equations"],
      reasoning: "multi-concept",
    },
    (rng) => {
      const V = rng.pick([
        {
          eq: "\\cos(2x) = \\sin x",
          transform: "\\cos(2x) = 1 - 2\\sin^2 x \\Rightarrow 2\\sin^2 x + \\sin x - 1 = 0 \\Rightarrow (2\\sin x - 1)(\\sin x + 1) = 0",
          fams: [
            { cond: "\\sin x = \\tfrac{1}{2}", sols: [bpi(1, 6), bpi(5, 6)] },
            { cond: "\\sin x = -1", sols: [bpi(3, 2)] },
          ],
          count: 3,
        },
        {
          eq: "\\cos(2x) = -\\sin x",
          transform: "\\cos(2x) = 1 - 2\\sin^2 x \\Rightarrow 2\\sin^2 x - \\sin x - 1 = 0 \\Rightarrow (2\\sin x + 1)(\\sin x - 1) = 0",
          fams: [
            { cond: "\\sin x = -\\tfrac{1}{2}", sols: [bpi(7, 6), bpi(11, 6)] },
            { cond: "\\sin x = 1", sols: [bpi(1, 2)] },
          ],
          count: 3,
        },
        {
          eq: "\\cos(2x) = \\cos x",
          transform: "\\cos(2x) = 2\\cos^2 x - 1 \\Rightarrow 2\\cos^2 x - \\cos x - 1 = 0 \\Rightarrow (2\\cos x + 1)(\\cos x - 1) = 0",
          fams: [
            { cond: "\\cos x = -\\tfrac{1}{2}", sols: [bpi(2, 3), bpi(4, 3)] },
            { cond: "\\cos x = 1", sols: ["0"] },
          ],
          count: 3,
        },
        {
          eq: "\\sin(2x) = \\sin x",
          transform: "\\sin(2x) - \\sin x = 0 \\Rightarrow 2\\sin x\\cos x - \\sin x = 0 \\Rightarrow \\sin x\\,(2\\cos x - 1) = 0",
          fams: [
            { cond: "\\sin x = 0", sols: ["0", "\\pi"] },
            { cond: "\\cos x = \\tfrac{1}{2}", sols: [bpi(1, 3), bpi(5, 3)] },
          ],
          count: 4,
        },
        {
          eq: "\\sin(2x) = \\cos x",
          transform: "\\sin(2x) - \\cos x = 0 \\Rightarrow \\cos x\\,(2\\sin x - 1) = 0",
          fams: [
            { cond: "\\cos x = 0", sols: [bpi(1, 2), bpi(3, 2)] },
            { cond: "\\sin x = \\tfrac{1}{2}", sols: [bpi(1, 6), bpi(5, 6)] },
          ],
          count: 4,
        },
        {
          eq: "\\sin(2x) = -\\sin x",
          transform: "\\sin(2x) + \\sin x = 0 \\Rightarrow \\sin x\\,(2\\cos x + 1) = 0",
          fams: [
            { cond: "\\sin x = 0", sols: ["0", "\\pi"] },
            { cond: "\\cos x = -\\tfrac{1}{2}", sols: [bpi(2, 3), bpi(4, 3)] },
          ],
          count: 4,
        },
      ]);
      const opts: McOption[] = [
        { id: "a", text: L(`$${V.count}$`, `$${V.count}$`), correct: true },
        { id: "b", text: L(`$${V.count - 1}$`, `$${V.count - 1}$`), correct: false },
        { id: "c", text: L(`$${V.count + 1}$`, `$${V.count + 1}$`), correct: false },
        { id: "d", text: L(`$${2 * V.count}$`, `$${2 * V.count}$`), correct: false },
      ];
      const solList = V.fams.map((f) => f.sols).flat().join(",\\ ");
      return {
        skill: L("Contar soluciones de una ecuación trigonométrica", "Counting solutions of a trig equation"),
        statement: L(
          `Resuelve la ecuación $${V.eq}$ en el intervalo $[0, 2\\pi)$. ¿Cuántas soluciones tiene?`,
          `Solve the equation $${V.eq}$ on the interval $[0, 2\\pi)$. How many solutions does it have?`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(opts) },
        hints: [
          L(
            "Usa una identidad de ángulo doble para que toda la ecuación quede en función del seno (o del coseno) nada más.",
            "Use a double-angle identity so the whole equation is in terms of sine (or cosine) alone.",
          ),
          L(
            "Te quedará una **cuadrática** en $\\sin x$ (o $\\cos x$): factorízala como producto de factores lineales.",
            "You will get a **quadratic** in $\\sin x$ (or $\\cos x$): factor it as a product of linear factors.",
          ),
          L(
            "Resuelve cada familia en $[0, 2\\pi)$ y cuenta todas las soluciones — incluida la del factor que vale $0$, $1$ o $-1$ (ahí está el detalle).",
            "Solve each family on $[0, 2\\pi)$ and count all the solutions — including the one from the factor equal to $0$, $1$ or $-1$ (that is the catch).",
          ),
        ],
        answerDisplay: L(
          `Soluciones: $x \\in \\{${solList}\\}$ — en total, $${V.count}$`,
          `Solutions: $x \\in \\{${solList}\\}$ — $${V.count}$ in total`,
        ),
        solution: [
          step(
            "given",
          `$${V.eq}$, $x \\in [0, 2\\pi)$.`,
          `$${V.eq}$, $x \\in [0, 2\\pi)$.`,
          ),
          step(
            "approach",
            "Encadenamos identidades trigonométricas (ángulo doble) con una cuadrática factorizada y terminamos enumerando las soluciones de cada familia dentro del intervalo.",
            "We chain trigonometric identities (double angle) with a factored quadratic and finish by enumerating each family's solutions inside the interval.",
          ),
          step(
            "calculation",
          `Paso 1 (identidades): $${V.transform}$.<br>Paso 2 (ecuaciones trigonométricas): ${V.fams.map((f) => `$${f.cond} \\Rightarrow x = ${f.sols.join(", ")}$`).join("; ")}.<br>Paso 3 (intervalo): todos esos valores están en $[0, 2\\pi)$; el $x = 2\\pi$ está excluido y no añade ninguna solución.`,
          `Paso 1 (identities): $${V.transform}$.<br>Paso 2 (trig equations): ${V.fams.map((f) => `$${f.cond} \\Rightarrow x = ${f.sols.join(", ")}$`).join("; ")}.<br>Paso 3 (interval): all of those values lie in $[0, 2\\pi)$; $x = 2\\pi$ is excluded and adds no solution.`,
          ),
          step(
            "result",
          `Hay $${V.count}$ soluciones: $x \\in \\{${solList}\\}$. (Los errores típicos: dividir entre $\\sin x$ o $\\cos x$ y perder una familia, o contar el extremo $2\\pi$.)`,
          `There are $${V.count}$ solutions: $x \\in \\{${solList}\\}$. (Typical errors: dividing by $\\sin x$ or $\\cos x$ and losing one family, or counting the endpoint $2\\pi$.)`,
          ),
        ],
      };
    },
  ),

  /* pcm-bridge-09 — two pens against a wall: max area by vertex */
  /* (modeling → linear constraint → quadratic vertex).         */
  template(
    {
      id: "pcm-bridge-09",
      subject: "math",
      topicId: "precalculus-mixed",
      subtopicId: "mixed-topics",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 300,
      tags: ["modeling", "quadratics", "vertex", "optimization", "geometry"],
      prerequisites: ["quadratics", "poly-functions"],
      reasoning: "multi-concept",
    },
    (rng) => {
      const mult = rng.int(2, 8);
      const F = 12 * mult;
      const w = F / 6;
      const l = (F - 3 * w) / 2;
      const A = (F * F) / 12;
      return {
        skill: L("Corrales con área máxima (sin cálculo)", "Pens with maximum area (no calculus)"),
        statement: L(
          `Se dispone de $${F}\\ \\text{m}$ de malla para construir **dos corrales rectangulares idénticos y contiguos**, aprovechando un muro recto como uno de los lados (sobre el muro no se pone malla). Los corrales quedan separados por una división interior **perpendicular** al muro. ¿Cuál es el **área total máxima** que se puede cercar?`,
          `You have $${F}\\ \\text{m}$ of wire mesh to build **two identical adjoining rectangular pens**, using a straight wall as one of the sides (no mesh is placed along the wall). The pens are separated by an interior partition **perpendicular** to the wall. What is the **maximum total area** that can be enclosed?`,
        ),
        answer: { kind: "numeric", value: A, unitSuffix: "m²" },
        hints: [
          L(
            "Dibuja el recinto: la malla forma un lado paralelo al muro de largo total $2l$, dos extremos de profundidad $w$ y la división central (otro segmento de $w$).",
            "Draw the enclosure: the mesh forms one side parallel to the wall of total length $2l$, two ends of depth $w$, and the central partition (another $w$ segment).",
          ),
          L(
            "La malla alcanza para $2l + 3w$: despeja $l$ en función de $w$ y escribe el área total como función de $w$ solo.",
            "The mesh covers $2l + 3w$: solve for $l$ in terms of $w$ and write the total area as a function of $w$ alone.",
          ),
          L(
            "El área queda como una cuadrática en $w$: su máximo está en el vértice, $w = -\\frac{b}{2a}$.",
            "The area becomes a quadratic in $w$: its maximum is at the vertex, $w = -\\frac{b}{2a}$.",
          ),
        ],
        answerDisplay: L(
          `$w = ${w}\\ \\text{m}$, $l = ${l}\\ \\text{m}$ ⟹ área total máxima $${A}\\ \\text{m}^2$`,
          `$w = ${w}\\ \\text{m}$, $l = ${l}\\ \\text{m}$ ⟹ maximum total area $${A}\\ \\text{m}^2$`,
        ),
        solution: [
          step(
            "given",
          `$${F}\\ \\text{m}$ de malla; muro en un lado; dos corrales idénticos contiguos con división perpendicular al muro.`,
          `$${F}\\ \\text{m}$ of mesh; wall along one side; two identical adjoining pens with a partition perpendicular to the wall.`,
          ),
          step(
            "approach",
            "Traducimos la geometría a una restricción lineal (modelización) y el área total resulta una función cuadrática, que maximizamos por su vértice, sin cálculo diferencial.",
            "We translate the geometry into a linear constraint (modeling); the total area becomes a quadratic function, which we maximize via its vertex, with no calculus.",
          ),
          step(
            "calculation",
          `Paso 1 (modelización): sea $w$ la profundidad y $l$ el lado de cada corral paralelo al muro. La malla cubre un lado de largo $2l$, dos extremos $w$ y la división $w$: $2l + 3w = ${F}$.<br>Paso 2 (cuadráticas): $l = \\frac{${F} - 3w}{2}$, así que el área total es $A(w) = 2lw = w(${F} - 3w) = -3w^2 ${bterm(F, "w")}$.<br>Paso 3 (vértice): $w_v = \\frac{-${F}}{2\\cdot(-3)} = ${w}\\ \\text{m}$; entonces $l = \\frac{${F} - ${3 * w}}{2} = ${l}\\ \\text{m}$ y $A_{\\max} = ${w}\\cdot${2 * l} = ${A}$.`,
          `Paso 1 (modeling): let $w$ be the depth and $l$ each pen's side parallel to the wall. The mesh covers one side of length $2l$, two ends $w$ and the partition $w$: $2l + 3w = ${F}$.<br>Paso 2 (quadratics): $l = \\frac{${F} - 3w}{2}$, so the total area is $A(w) = 2lw = w(${F} - 3w) = -3w^2 ${bterm(F, "w")}$.<br>Paso 3 (vertex): $w_v = \\frac{-${F}}{2\\cdot(-3)} = ${w}\\ \\text{m}$; then $l = \\frac{${F} - ${3 * w}}{2} = ${l}\\ \\text{m}$ and $A_{\\max} = ${w}\\cdot${2 * l} = ${A}$.`,
          ),
          step(
            "result",
          `El área total máxima es $${A}\\ \\text{m}^2$, con $w = ${w}\\ \\text{m}$ y $l = ${l}\\ \\text{m}$ (cada corral mide $${l} \\times ${w}$).`,
          `The maximum total area is $${A}\\ \\text{m}^2$, with $w = ${w}\\ \\text{m}$ and $l = ${l}\\ \\text{m}$ (each pen is $${l} \\times ${w}$).`,
          ),
        ],
      };
    },
  ),

  /* pcm-bridge-10 — |x−a| + |x−b| = k: smallest integer k with */
  /* exactly two solutions (case analysis + parameter threshold). */
  template(
    {
      id: "pcm-bridge-10",
      subject: "math",
      topicId: "precalculus-mixed",
      subtopicId: "mixed-topics",
      difficulty: "challenge",
      questionType: "numeric",
      estimatedTimeSec: 300,
      tags: ["absolute-value", "piecewise", "case-analysis", "parameters", "functions"],
      prerequisites: ["linear-equations", "functions"],
      reasoning: "multi-concept",
    },
    (rng) => {
      const a = rng.int(-7, 4);
      const d = rng.int(3, 9);
      const b = a + d;
      const kAns = d + 1;
      /** outer branches of f, "0 − 2x" avoided when a + b = 0 */
      const sL = a + b === 0 ? "-2x" : `${a + b} - 2x`;
      const sR = a + b === 0 ? "2x" : `2x - ${a + b}`;
      return {
        skill: L("Valor absoluto a trozos: ¿cuántas soluciones?", "Piecewise absolute value: how many solutions?"),
        statement: L(
          `Considera $f(x) = ${babs(a)} + ${babs(b)}$. ¿Cuál es el **menor valor entero** de $k$ para el que la ecuación $f(x) = k$ tiene **exactamente dos** soluciones?`,
          `Consider $f(x) = ${babs(a)} + ${babs(b)}$. What is the **smallest integer value** of $k$ for which the equation $f(x) = k$ has **exactly two** solutions?`,
        ),
        answer: { kind: "numeric", value: kAns },
        hints: [
          L(
            `Analiza $f$ por tramos: $x < ${a}$, $${a} \\le x \\le ${b}$ y $x > ${b}$.`,
            `Analyse $f$ piecewise: $x < ${a}$, $${a} \\le x \\le ${b}$ and $x > ${b}$.`,
          ),
          L(
            "En el tramo central los dos valores absolutos se cancelan entre sí y $f$ queda **constante**; fuera, $f$ es lineal con pendiente $\\pm 2$.",
            "On the middle interval the two absolute values cancel each other and $f$ is **constant**; outside, $f$ is linear with slope $\\pm 2$.",
          ),
          L(
            "Para el valor mínimo de $f$ la ecuación tiene infinitas soluciones; para cualquier valor mayor, exactamente dos. Busca el menor entero **mayor** que ese mínimo.",
            "At the minimum value of $f$ the equation has infinitely many solutions; for any larger value, exactly two. Look for the smallest integer **greater** than that minimum.",
          ),
        ],
        answerDisplay: L(
          `El mínimo de $f$ es $${d}$; el menor entero $k$ con exactamente dos soluciones es $${d + 1}$`,
          `The minimum of $f$ is $${d}$; the smallest integer $k$ with exactly two solutions is $${d + 1}$`,
        ),
        solution: [
          step(
            "given",
          `$f(x) = ${babs(a)} + ${babs(b)}$; buscamos el menor entero $k$ con exactamente dos soluciones de $f(x) = k$.`,
          `$f(x) = ${babs(a)} + ${babs(b)}$; we look for the smallest integer $k$ with exactly two solutions of $f(x) = k$.`,
          ),
          step(
            "approach",
            "Hacemos análisis por casos (valor absoluto a trozos) para dibujar la gráfica de $f$ y después razonamos sobre la recta horizontal $y = k$ (interpretación de parámetros).",
            "We do a case analysis (piecewise absolute value) to sketch the graph of $f$ and then reason about the horizontal line $y = k$ (parameter interpretation).",
          ),
          step(
            "calculation",
          `Paso 1 (casos): si $x < ${a}$: $f(x) = ${sL}$ (decrece hasta $${d}$); si $${a} \\le x \\le ${b}$: $f(x) = ${d}$ (constante); si $x > ${b}$: $f(x) = ${sR}$ (crece desde $${d}$).<br>Paso 2 (interpretación): el mínimo de $f$ es $${d}$ y se alcanza en **todo** el segmento $[${a}, ${b}]$: para $k = ${d}$ hay infinitas soluciones, y para $k < ${d}$, ninguna.<br>Paso 3 (umbral): para cualquier $k > ${d}$, la recta $y = k$ corta a las dos ramas exteriores exactamente una vez cada una: dos soluciones. El menor entero mayor que $${d}$ es $k = ${d + 1}$.`,
          `Paso 1 (cases): if $x < ${a}$: $f(x) = ${sL}$ (decreases down to $${d}$); if $${a} \\le x \\le ${b}$: $f(x) = ${d}$ (constant); if $x > ${b}$: $f(x) = ${sR}$ (increases from $${d}$).<br>Paso 2 (interpretation): the minimum of $f$ is $${d}$ and it is attained on the **whole** segment $[${a}, ${b}]$: for $k = ${d}$ there are infinitely many solutions, and for $k < ${d}$, none.<br>Paso 3 (threshold): for any $k > ${d}$, the line $y = k$ cuts the two outer branches exactly once each: two solutions. The smallest integer greater than $${d}$ is $k = ${d + 1}$.`,
          ),
          step(
            "result",
          `El menor entero es $k = ${d + 1}$: con ese valor la ecuación tiene exactamente dos soluciones (una a cada lado del segmento $[${a}, ${b}]$).`,
          `The smallest integer is $k = ${d + 1}$: with that value the equation has exactly two solutions (one on each side of the segment $[${a}, ${b}]$).`,
          ),
        ],
      };
    },
  ),

  /* pcm-bridge-11 — exponential system disguised as powers */
  /* (exponent laws → prime factorization → 2×2 linear system). */
  template(
    {
      id: "pcm-bridge-11",
      subject: "math",
      topicId: "precalculus-mixed",
      subtopicId: "mixed-topics",
      difficulty: "hard",
      questionType: "text",
      estimatedTimeSec: 300,
      tags: ["exponents", "exponential", "systems", "factorization"],
      prerequisites: ["exponential", "systems"],
      reasoning: "multi-concept",
    },
    (rng) => {
      let x0 = 3;
      let y0 = 2;
      for (let i = 0; i < 100; i++) {
        const xx = rng.int(1, 4);
        const yy = rng.int(1, 4);
        if (2 * xx + 3 * yy <= 18 && 3 * xx - 2 * yy >= 1) {
          x0 = xx;
          y0 = yy;
          break;
        }
      }
      const K1 = 2 * x0 + 3 * y0;
      const K2 = 3 * x0 - 2 * y0;
      return {
        skill: L("Sistema exponencial con potencias compuestas", "Exponential system with composite powers"),
        statement: L(
          `Resuelve el sistema y escribe la solución como par ordenado $(x, y)$, por ejemplo $(2, -3)$: $$\\begin{cases} 4^x \\cdot 8^y = ${2 ** K1} \\\\ \\dfrac{27^x}{9^y} = ${3 ** K2} \\end{cases}$$`,
          `Solve the system and write the solution as an ordered pair $(x, y)$, e.g. $(2, -3)$: $$\\begin{cases} 4^x \\cdot 8^y = ${2 ** K1} \\\\ \\dfrac{27^x}{9^y} = ${3 ** K2} \\end{cases}$$`,
        ),
        answer: {
          kind: "text",
          accepted: [
            `(${x0}, ${y0})`,
            `(${x0},${y0})`,
            `( ${x0}, ${y0} )`,
            `(${x0} , ${y0})`,
            `x = ${x0}, y = ${y0}`,
          ],
        },
        hints: [
          L(
            "Escribe todo como potencia de $2$ en la primera ecuación y de $3$ en la segunda ($4 = 2^2$, $8 = 2^3$, $27 = 3^3$, $9 = 3^2$).",
            "Write everything as a power of $2$ in the first equation and of $3$ in the second ($4 = 2^2$, $8 = 2^3$, $27 = 3^3$, $9 = 3^2$).",
          ),
          L(
            "El número de la derecha también es potencia: descompónlo en factores primos para hallar el exponente.",
            "The number on the right is a power too: decompose it into prime factors to find the exponent.",
          ),
          L(
            "Te queda un sistema lineal $2\\times2$ en $x$ e $y$: resuélvelo por eliminación.",
            "You are left with a $2\\times2$ linear system in $x$ and $y$: solve it by elimination.",
          ),
        ],
        answerDisplay: L(`$(x, y) = (${x0}, ${y0})$`, `$(x, y) = (${x0}, ${y0})$`),
        solution: [
          step(
            "given",
          `$$\\begin{cases} 4^x \\cdot 8^y = ${2 ** K1} \\\\ \\dfrac{27^x}{9^y} = ${3 ** K2} \\end{cases}$$`,
          `$$\\begin{cases} 4^x \\cdot 8^y = ${2 ** K1} \\\\ \\dfrac{27^x}{9^y} = ${3 ** K2} \\end{cases}$$`,
          ),
          step(
            "approach",
            "Homogeneizamos bases (leyes de exponentes + factorización prima) para convertir cada ecuación exponencial en una lineal, y resolvemos el sistema resultante.",
            "We homogenize bases (exponent laws + prime factorization) to turn each exponential equation into a linear one, then solve the resulting system.",
          ),
          step(
            "calculation",
          `Paso 1 (potencias): $4^x \\cdot 8^y = 2^{2x}\\cdot 2^{3y} = 2^{2x + 3y}$ y $${2 ** K1} = 2^{${K1}}$ ⟹ $2x + 3y = ${K1}$.<br>Paso 2 (factorización): $\\dfrac{27^x}{9^y} = \\dfrac{3^{3x}}{3^{2y}} = 3^{3x - 2y}$ y $${3 ** K2} = 3^{${K2}}$ ⟹ $3x - 2y = ${K2}$.<br>Paso 3 (sistemas): $$\\begin{cases} 2x ${bterm(3, "y")} = ${K1} \\\\ 3x ${bterm(-2, "y")} = ${K2} \\end{cases}$$ Multiplicando la primera por $2$ y la segunda por $3$ y sumando: $13x = ${2 * K1 + 3 * K2}$ ⟹ $x = ${x0}$; sustituyendo, $y = ${y0}$.`,
          `Paso 1 (powers): $4^x \\cdot 8^y = 2^{2x}\\cdot 2^{3y} = 2^{2x + 3y}$ and $${2 ** K1} = 2^{${K1}}$ ⟹ $2x + 3y = ${K1}$.<br>Paso 2 (factorization): $\\dfrac{27^x}{9^y} = \\dfrac{3^{3x}}{3^{2y}} = 3^{3x - 2y}$ and $${3 ** K2} = 3^{${K2}}$ ⟹ $3x - 2y = ${K2}$.<br>Paso 3 (systems): $$\\begin{cases} 2x ${bterm(3, "y")} = ${K1} \\\\ 3x ${bterm(-2, "y")} = ${K2} \\end{cases}$$ Multiplying the first by $2$ and the second by $3$ and adding: $13x = ${2 * K1 + 3 * K2}$ ⟹ $x = ${x0}$; substituting, $y = ${y0}$.`,
          ),
          step(
            "result",
          `La solución es $(x, y) = (${x0}, ${y0})$.`,
          `The solution is $(x, y) = (${x0}, ${y0})$.`,
          ),
        ],
      };
    },
  ),

  /* pcm-bridge-12 — right triangle whose sides form an AP */
  /* (sequences → Pythagoras → quadratic simplification). */
  template(
    {
      id: "pcm-bridge-12",
      subject: "math",
      topicId: "precalculus-mixed",
      subtopicId: "mixed-topics",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 300,
      tags: ["sequences", "arithmetic", "pythagoras", "quadratics", "geometry"],
      prerequisites: ["sequences", "quadratics"],
      reasoning: "multi-concept",
    },
    (rng) => {
      const mult = rng.int(2, 9);
      const P = 12 * mult;
      const hyp = 5 * mult;
      return {
        skill: L("Triángulo rectángulo en progresión aritmética", "Right triangle in arithmetic progression"),
        statement: L(
          `Los tres lados de un triángulo rectángulo están en **progresión aritmética** (ordenados de menor a mayor). Si el perímetro mide $${P}\\ \\text{cm}$, ¿cuánto mide la hipotenusa?`,
          `The three sides of a right triangle form an **arithmetic progression** (ordered from smallest to largest). If the perimeter is $${P}\\ \\text{cm}$, how long is the hypotenuse?`,
        ),
        answer: { kind: "numeric", value: hyp, unitSuffix: "cm" },
        hints: [
          L(
            "Llama a los lados $a - d$, $a$, $a + d$, con $a + d$ la hipotenusa y $d > 0$.",
            "Call the sides $a - d$, $a$, $a + d$, with $a + d$ the hypotenuse and $d > 0$.",
          ),
          L(
            "Aplica el teorema de Pitágoras a esos tres lados: obtendrás una ecuación con $a$ y $d$.",
            "Apply the Pythagorean theorem to those three sides: you will get an equation in $a$ and $d$.",
          ),
          L(
            "Al expandir, varios términos cuadrados se cancelan y queda una relación **lineal** entre $a$ y $d$.",
            "When expanding, several quadratic terms cancel and a **linear** relation between $a$ and $d$ remains.",
          ),
        ],
        answerDisplay: L(
          `Lados $${3 * mult}$, $${4 * mult}$, $${5 * mult}$ cm; hipotenusa $${hyp}\\ \\text{cm}$`,
          `Sides $${3 * mult}$, $${4 * mult}$, $${5 * mult}$ cm; hypotenuse $${hyp}\\ \\text{cm}$`,
        ),
        solution: [
          step(
            "given",
          `Lados en progresión aritmética; perímetro $${P}$ cm; triángulo rectángulo.`,
          `Sides in arithmetic progression; perimeter $${P}$ cm; right triangle.`,
          ),
          step(
            "approach",
            "Usamos la estructura de la progresión (sucesiones) dentro del teorema de Pitágoras (geometría); la ecuación resultante simplifica a una relación lineal y el perímetro cierra el problema.",
            "We use the progression's structure (sequences) inside the Pythagorean theorem (geometry); the resulting equation simplifies to a linear relation, and the perimeter closes the problem.",
          ),
          step(
            "calculation",
          `Paso 1 (sucesiones): lados $a - d$, $a$, $a + d$ (hipotenusa $a + d$), $d > 0$.<br>Paso 2 (geometría + cuadráticas): Pitágoras: $(a - d)^2 + a^2 = (a + d)^2$ ⟹ $a^2 - 2ad + d^2 + a^2 = a^2 + 2ad + d^2$ ⟹ $a^2 = 4ad$ ⟹ $a = 4d$.<br>Paso 3 (perímetro): los lados son $3d$, $4d$, $5d$, así que $12d = ${P}$ ⟹ $d = ${mult}$ y la hipotenusa es $5d = ${hyp}$.`,
          `Paso 1 (sequences): sides $a - d$, $a$, $a + d$ (hypotenuse $a + d$), $d > 0$.<br>Paso 2 (geometry + quadratics): Pythagoras: $(a - d)^2 + a^2 = (a + d)^2$ ⟹ $a^2 - 2ad + d^2 + a^2 = a^2 + 2ad + d^2$ ⟹ $a^2 = 4ad$ ⟹ $a = 4d$.<br>Paso 3 (perimeter): the sides are $3d$, $4d$, $5d$, so $12d = ${P}$ ⟹ $d = ${mult}$ and the hypotenuse is $5d = ${hyp}$.`,
          ),
          step(
            "result",
          `La hipotenusa mide $${hyp}\\ \\text{cm}$ (lados $${3 * mult}$, $${4 * mult}$ y $${5 * mult}$ cm).`,
          `The hypotenuse is $${hyp}\\ \\text{cm}$ (sides $${3 * mult}$, $${4 * mult}$ and $${5 * mult}$ cm).`,
          ),
        ],
      };
    },
  ),

  /* pcm-bridge-13 — inverse of a restricted quadratic */
  /* (inverse functions → quadratic → branch/domain choice). */
  template(
    {
      id: "pcm-bridge-13",
      subject: "math",
      topicId: "precalculus-mixed",
      subtopicId: "mixed-topics",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 300,
      tags: ["inverse-functions", "quadratics", "domain", "functions", "completing-square"],
      prerequisites: ["functions", "quadratics"],
      reasoning: "multi-concept",
    },
    (rng) => {
      const b = rng.int(-3, 3);
      const c = rng.int(-4, 5);
      const x0 = rng.int(b + 1, b + 5);
      const v = x0 * x0 - 2 * b * x0 + c;
      /** "(x − b)²", or plain "x²" when b = 0 (avoids "(x + 0)²") */
      const sq = b === 0 ? "x^2" : `(x ${bop(-b)})^2`;
      return {
        skill: L("Inversa de una cuadrática restringida", "Inverse of a restricted quadratic"),
        statement: L(
          `La función $f(x) = ${bquad(-2 * b, c)}$ se restringe al dominio $x \\ge ${b}$, donde es biyectiva. Calcula $f^{-1}(${v})$.`,
          `The function $f(x) = ${bquad(-2 * b, c)}$ is restricted to the domain $x \\ge ${b}$, where it is one-to-one. Compute $f^{-1}(${v})$.`,
        ),
        answer: { kind: "numeric", value: x0 },
        hints: [
          L(
            `$f^{-1}(${v})$ es el valor de $x$ (dentro del dominio $x \\ge ${b}$) que cumple $f(x) = ${v}$: resuelve esa ecuación.`,
            `$f^{-1}(${v})$ is the value of $x$ (within the domain $x \\ge ${b}$) satisfying $f(x) = ${v}$: solve that equation.`,
          ),
          L(
            "Te queda una cuadrática con **dos** raíces: la restricción del dominio decide cuál sirve.",
            "You get a quadratic with **two** roots: the domain restriction decides which one is valid.",
          ),
          L(
            "Completa el cuadrado (o usa la fórmula cuadrática) y quédate con la raíz que cumple $x \\ge " + b + "$.",
            "Complete the square (or use the quadratic formula) and keep the root satisfying $x \\ge " + b + "$.",
          ),
        ],
        answerDisplay: L(`$f^{-1}(${v}) = ${x0}$`, `$f^{-1}(${v}) = ${x0}$`),
        solution: [
          step(
            "given",
          `$f(x) = ${bquad(-2 * b, c)}$ con dominio $x \\ge ${b}$; buscamos $f^{-1}(${v})$.`,
          `$f(x) = ${bquad(-2 * b, c)}$ with domain $x \\ge ${b}$; we want $f^{-1}(${v})$.`,
          ),
          step(
            "approach",
            "Calculamos la inversa resolviendo $y = f(x)$ (funciones): aparece una cuadrática con dos raíces y la restricción del dominio selecciona la correcta (análisis de rama).",
            "We compute the inverse by solving $y = f(x)$ (functions): a quadratic appears with two roots, and the domain restriction selects the correct one (branch analysis).",
          ),
          step(
            "calculation",
          `Paso 1 (funciones): $f^{-1}(${v})$ es el $x \\ge ${b}$ tal que $f(x) = ${v}$.<br>Paso 2 (cuadráticas): $${bquad(-2 * b, c - v)} = 0$. Completando el cuadrado: $${sq} = ${v - c + b * b}$ ⟹ $x = ${b} \\pm ${Math.sqrt(v - c + b * b)}$.<br>Paso 3 (dominio): solo la raíz $x \\ge ${b}$ pertenece al dominio de $f$: $f^{-1}(${v}) = ${x0}$.`,
          `Paso 1 (functions): $f^{-1}(${v})$ is the $x \\ge ${b}$ such that $f(x) = ${v}$.<br>Paso 2 (quadratics): $${bquad(-2 * b, c - v)} = 0$. Completing the square: $${sq} = ${v - c + b * b}$ ⟹ $x = ${b} \\pm ${Math.sqrt(v - c + b * b)}$.<br>Paso 3 (domain): only the root $x \\ge ${b}$ belongs to the domain of $f$: $f^{-1}(${v}) = ${x0}$.`,
          ),
          step(
            "result",
          `$f^{-1}(${v}) = ${x0}$ (la otra raíz, $x = ${2 * b - x0}$, está fuera del dominio y se descarta).`,
          `$f^{-1}(${v}) = ${x0}$ (the other root, $x = ${2 * b - x0}$, lies outside the domain and is discarded).`,
          ),
        ],
      };
    },
  ),

  /* pcm-bridge-14 — log system → xy and x/y → powers of 2 */
  /* (logarithm properties → system → exponents). */
  template(
    {
      id: "pcm-bridge-14",
      subject: "math",
      topicId: "precalculus-mixed",
      subtopicId: "mixed-topics",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 300,
      tags: ["logarithms", "systems", "exponents", "equations"],
      prerequisites: ["logarithmic", "systems"],
      reasoning: "multi-concept",
    },
    (rng) => {
      const cfg = rng.pick([
        { p: 6, q: 2 },
        { p: 6, q: 4 },
        { p: 8, q: 4 },
        { p: 7, q: 3 },
        { p: 5, q: 1 },
        { p: 8, q: 2 },
        { p: 7, q: 1 },
        { p: 5, q: 3 },
        { p: 9, q: 3 },
      ]);
      const x = 2 ** ((cfg.p + cfg.q) / 2);
      const y = 2 ** ((cfg.p - cfg.q) / 2);
      const sum = x + y;
      return {
        skill: L("Sistema logarítmico con suma y resta", "Logarithmic system with sum and difference"),
        statement: L(
          `Sabemos que $\\log_2 x + \\log_2 y = ${cfg.p}$ y $\\log_2 x - \\log_2 y = ${cfg.q}$, con $x > y > 0$. ¿Cuánto vale $x + y$?`,
          `We know that $\\log_2 x + \\log_2 y = ${cfg.p}$ and $\\log_2 x - \\log_2 y = ${cfg.q}$, with $x > y > 0$. What is $x + y$?`,
        ),
        answer: { kind: "numeric", value: sum },
        hints: [
          L(
            "Combina con las propiedades del logaritmo: la suma se convierte en producto y la resta, en cociente.",
            "Combine with logarithm properties: the sum turns into a product and the difference into a quotient.",
          ),
          L(
            `Obtendrás $xy = 2^{${cfg.p}}$ y $\\frac{x}{y} = 2^{${cfg.q}}$ (dos ecuaciones sin logaritmos).`,
            `You will get $xy = 2^{${cfg.p}}$ and $\\frac{x}{y} = 2^{${cfg.q}}$ (two equations without logarithms).`,
          ),
          L(
            "Sustituye $x = 2^{q}\\cdot y$ en la primera: queda una ecuación en $y$ que se resuelve con potencias de $2$.",
            "Substitute $x = 2^{q}\\cdot y$ into the first one: an equation in $y$ remains, solvable with powers of $2$.",
          ),
        ],
        answerDisplay: L(`$x = ${x}$, $y = ${y}$ ⟹ $x + y = ${sum}$`, `$x = ${x}$, $y = ${y}$ ⟹ $x + y = ${sum}$`),
        solution: [
          step(
            "given",
          `$\\log_2 x + \\log_2 y = ${cfg.p}$, $\\log_2 x - \\log_2 y = ${cfg.q}$, $x > y > 0$.`,
          `$\\log_2 x + \\log_2 y = ${cfg.p}$, $\\log_2 x - \\log_2 y = ${cfg.q}$, $x > y > 0$.`,
          ),
          step(
            "approach",
            "Las propiedades del logaritmo convierten el sistema en uno algebraico (producto y cociente); después resolvemos por sustitución y damos el resultado con potencias de 2.",
            "Logarithm properties turn the system into an algebraic one (product and quotient); we then solve by substitution and give the result with powers of 2.",
          ),
          step(
            "calculation",
          `Paso 1 (logaritmos): $\\log_2(xy) = ${cfg.p}$ y $\\log_2\\left(\\frac{x}{y}\\right) = ${cfg.q}$, es decir, $xy = ${2 ** cfg.p}$ y $\\frac{x}{y} = ${2 ** cfg.q}$.<br>Paso 2 (sistemas): de la segunda, $x = ${2 ** cfg.q}\\,y$. Sustituyendo: $${2 ** cfg.q}y^2 = ${2 ** cfg.p}$ ⟹ $y^2 = ${2 ** (cfg.p - cfg.q)}$ ⟹ $y = ${y}$ (positivo) y $x = ${x}$.<br>Paso 3 (resultado): $x + y = ${x} + ${y} = ${sum}$.`,
          `Paso 1 (logarithms): $\\log_2(xy) = ${cfg.p}$ and $\\log_2\\left(\\frac{x}{y}\\right) = ${cfg.q}$, that is, $xy = ${2 ** cfg.p}$ and $\\frac{x}{y} = ${2 ** cfg.q}$.<br>Paso 2 (systems): from the second one, $x = ${2 ** cfg.q}\\,y$. Substituting: $${2 ** cfg.q}y^2 = ${2 ** cfg.p}$ ⟹ $y^2 = ${2 ** (cfg.p - cfg.q)}$ ⟹ $y = ${y}$ (positive) and $x = ${x}$.<br>Paso 3 (result): $x + y = ${x} + ${y} = ${sum}$.`,
          ),
          step(
            "result",
          `$x + y = ${sum}$.`,
          `$x + y = ${sum}$.`,
          ),
        ],
      };
    },
  ),

  /* pcm-bridge-15 — monic quadratic with roots α², β² */
  /* (Vieta → symmetric identities → constructing an equation). */
  template(
    {
      id: "pcm-bridge-15",
      subject: "math",
      topicId: "precalculus-mixed",
      subtopicId: "mixed-topics",
      difficulty: "challenge",
      questionType: "expression",
      estimatedTimeSec: 360,
      tags: ["vieta", "quadratics", "symmetric-functions", "polynomials"],
      prerequisites: ["quadratics", "polynomials"],
      reasoning: "multi-concept",
    },
    (rng) => {
      let p = -5;
      let q = 4;
      for (let i = 0; i < 200; i++) {
        const pp = rng.nonZeroInt(-9, 9);
        const qq = rng.nonZeroInt(-9, 9);
        if (pp * pp - 4 * qq > 0) {
          p = pp;
          q = qq;
          break;
        }
      }
      const S = p * p - 2 * q;
      const P = q * q;
      const eqStr = `x^2 - ${S}x + ${P}`;
      return {
        skill: L("Ecuación con raíces al cuadrado (Vieta)", "Equation with squared roots (Vieta)"),
        statement: L(
          `La ecuación $${bquad(p, q)} = 0$ tiene dos raíces reales distintas, $\\alpha$ y $\\beta$. Halla la ecuación cuadrática **mónica** (coeficiente principal $1$) cuyas raíces son $\\alpha^2$ y $\\beta^2$. (Formato de respuesta, p. ej.: x^2 - 7x + 12)`,
          `The equation $${bquad(p, q)} = 0$ has two distinct real roots, $\\alpha$ and $\\beta$. Find the **monic** quadratic (leading coefficient $1$) whose roots are $\\alpha^2$ and $\\beta^2$. (Answer format, e.g.: x^2 - 7x + 12)`,
        ),
        answer: { kind: "expression", accepted: [eqStr], variables: ["x"] },
        hints: [
          L(
            "No necesitas las raíces por separado: usa las relaciones de Vieta en la ecuación original.",
            "You do not need the roots separately: use Vieta's relations on the original equation.",
          ),
          L(
            "Necesitas $\\alpha^2 + \\beta^2$ y $\\alpha^2\\beta^2$. El primero se escribe con $(\\alpha + \\beta)^2$; el segundo, con $(\\alpha\\beta)^2$.",
            "You need $\\alpha^2 + \\beta^2$ and $\\alpha^2\\beta^2$. The first one can be written with $(\\alpha + \\beta)^2$; the second with $(\\alpha\\beta)^2$.",
          ),
          L(
            "La monica con raíces $r_1$ y $r_2$ es $x^2 - (r_1 + r_2)x + r_1 r_2 = 0$: sustituye las expresiones anteriores.",
            "The monic quadratic with roots $r_1$ and $r_2$ is $x^2 - (r_1 + r_2)x + r_1 r_2 = 0$: substitute the expressions above.",
          ),
        ],
        answerDisplay: L(`$${eqStr} = 0$`, `$${eqStr} = 0$`),
        solution: [
          step(
            "given",
          `$${bquad(p, q)} = 0$ con raíces reales distintas $\\alpha$, $\\beta$; buscamos la monica de raíces $\\alpha^2$, $\\beta^2$.`,
          `$${bquad(p, q)} = 0$ with distinct real roots $\\alpha$, $\\beta$; we want the monic one with roots $\\alpha^2$, $\\beta^2$.`,
          ),
          step(
            "approach",
            "Con Vieta expresamos la suma y el producto de las raíces nuevas mediante identidades simétricas, y después construimos la ecuación monica con esa suma y producto.",
            "With Vieta we express the new roots' sum and product through symmetric identities, then build the monic equation from that sum and product.",
          ),
          step(
            "calculation",
          `Paso 1 (Vieta): $\\alpha + \\beta = ${-p}$ y $\\alpha\\beta = ${q}$.<br>Paso 2 (identidades simétricas): $\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta = ${p * p} ${bop(-2 * q)} = ${S}$; $\\alpha^2\\beta^2 = (\\alpha\\beta)^2 = ${P}$.<br>Paso 3 (construcción): la monica buscada es $x^2 - (\\alpha^2 + \\beta^2)x + \\alpha^2\\beta^2 = 0$, es decir, $${eqStr} = 0$.`,
          `Paso 1 (Vieta): $\\alpha + \\beta = ${-p}$ and $\\alpha\\beta = ${q}$.<br>Paso 2 (symmetric identities): $\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta = ${p * p} ${bop(-2 * q)} = ${S}$; $\\alpha^2\\beta^2 = (\\alpha\\beta)^2 = ${P}$.<br>Paso 3 (construction): the sought monic equation is $x^2 - (\\alpha^2 + \\beta^2)x + \\alpha^2\\beta^2 = 0$, that is, $${eqStr} = 0$.`,
          ),
          step(
            "result",
          `La ecuación es $${eqStr} = 0$.`,
          `The equation is $${eqStr} = 0$.`,
          ),
        ],
      };
    },
  ),
];
