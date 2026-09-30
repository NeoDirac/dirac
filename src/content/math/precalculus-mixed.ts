/**
 * MATH · Mixed Pre-Calculus Practice
 *
 * Exam-style problems that combine several topics (functions, quadratics,
 * exponentials, logarithms, trig and geometry) with multi-step reasoning.
 */

import { template, L, step, tok } from "@/lib/problem";
import type { ProblemTemplate, McOption } from "@/lib/types";

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
];
