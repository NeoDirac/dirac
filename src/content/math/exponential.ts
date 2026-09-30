/**
 * MATH · Exponential Functions
 *
 * Growth, decay, transformations, equations and applications.
 * Includes function-graph diagrams of growth and decay curves.
 */

import { template, L, step, tok } from "@/lib/problem";
import type { ProblemTemplate, McOption } from "@/lib/types";

export const templates: ProblemTemplate[] = [
  /* ---------------------------------------------------------------- */
  /* Growth: evaluate b^x                                             */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "exp-grow-01",
      subject: "math",
      topicId: "exponential",
      subtopicId: "growth",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 60,
      tags: ["exponential-growth", "powers"],
      prerequisites: ["functions"],
    },
    (rng) => {
      const b = rng.pick([2, 3]);
      const k = b === 2 ? rng.int(3, 9) : rng.int(3, 5);
      const value = Math.pow(b, k);
      return {
        skill: L("Evaluar una función exponencial", "Evaluating an exponential function"),
        statement: L(
          `La función $f(x) = ${b}^{x}$ describe un crecimiento exponencial. Calcula $f(${k})$.`,
          `The function $f(x) = ${b}^{x}$ describes exponential growth. Compute $f(${k})$.`,
        ),
        answer: { kind: "numeric", value },
        hints: [
          L(
            "Sustituye la $x$ por el valor indicado en el exponente.",
            "Substitute the given value for $x$ in the exponent.",
          ),
          L(
            `Se trata de la potencia $${b}^{${k}}$.`,
            `It is the power $${b}^{${k}}$.`,
          ),
          L(
            `Puedes comprobarlo dividiendo entre $${b}$: debe resultar $${b}^{${k - 1}}$.`,
            `You can check by dividing by $${b}$: it should give $${b}^{${k - 1}}$.`,
          ),
        ],
        answerDisplay: L(`$f(${k}) = ${value}$`, `$f(${k}) = ${value}$`),
        solution: [
          step("given", `$f(x) = ${b}^{x}$`, `$f(x) = ${b}^{x}$`),
          step(
            "approach",
            "Evaluamos sustituyendo el exponente y calculando la potencia.",
            "Evaluate by substituting the exponent and computing the power.",
          ),
          step(
            "calculation",
            `$f(${k}) = ${b}^{${k}} = ${value}$`,
            `$f(${k}) = ${b}^{${k}} = ${value}$`,
          ),
          step("result", `$f(${k}) = ${value}$`, `$f(${k}) = ${value}$`),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Decay: repeated halving                                          */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "exp-decay-01",
      subject: "math",
      topicId: "exponential",
      subtopicId: "decay",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 90,
      tags: ["exponential-decay", "half-life"],
      prerequisites: ["functions"],
    },
    (rng) => {
      const j = rng.int(2, 4);
      const h = rng.pick([5, 10]);
      const m = rng.int(4, 40);
      const n0 = m * Math.pow(2, j);
      const t = j * h;
      return {
        skill: L("Decaimiento a la mitad", "Halving decay"),
        statement: L(
          `Una muestra de $${n0}\\ \\text{g}$ de un isótopo se reduce a la mitad cada $${h}$ años. ¿Cuántos gramos quedan tras $${t}$ años?`,
          `A $${n0}\\ \\text{g}$ sample of an isotope halves every $${h}$ years. How many grams remain after $${t}$ years?`,
        ),
        answer: { kind: "numeric", value: m, unitSuffix: "g" },
        hints: [
          L(
            "Cuenta cuántos períodos de semidesintegración caben en ese tiempo.",
            "Count how many half-lives fit into that time.",
          ),
          L(
            `En $${t}$ años hay $${t} \\div ${h} = ${j}$ períodos.`,
            `In $${t}$ years there are $${t} \\div ${h} = ${j}$ periods.`,
          ),
          L(
            `Cada período divide la masa entre $2$: quedarán $${n0} \\div 2^{${j}}$ gramos.`,
            `Each period divides the mass by $2$: the remainder is $${n0} \\div 2^{${j}}$ grams.`,
          ),
        ],
        answerDisplay: L(`$${m}\\ \\text{g}$`, `$${m}\\ \\text{g}$`),
        solution: [
          step(
            "given",
            `Masa inicial: $${n0}\\ \\text{g}$. Se reduce a la mitad cada $${h}$ años. Tiempo: $${t}$ años.`,
            `Initial mass: $${n0}\\ \\text{g}$. It halves every $${h}$ years. Time: $${t}$ years.`,
          ),
          step(
            "approach",
            "Modelizamos con $N(t) = N_{0} \\cdot \\left(\\frac{1}{2}\\right)^{t/h}$.",
            "Model with $N(t) = N_{0} \\cdot \\left(\\frac{1}{2}\\right)^{t/h}$.",
          ),
          step(
            "calculation",
            `$\\frac{t}{h} = ${j}$ períodos<br>$N = ${n0} \\cdot \\left(\\frac{1}{2}\\right)^{${j}} = \\frac{${n0}}{${Math.pow(2, j)}} = ${m}\\ \\text{g}$`,
            `$\\frac{t}{h} = ${j}$ periods<br>$N = ${n0} \\cdot \\left(\\frac{1}{2}\\right)^{${j}} = \\frac{${n0}}{${Math.pow(2, j)}} = ${m}\\ \\text{g}$`,
          ),
          step(
            "result",
            `Tras $${t}$ años quedan $${m}\\ \\text{g}$.`,
            `After $${t}$ years, $${m}\\ \\text{g}$ remain.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Growth curve → equation (MC + diagram)                           */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "exp-graph-01",
      subject: "math",
      topicId: "exponential",
      subtopicId: "growth",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["graphs", "exponential-growth", "reading-graphs"],
      prerequisites: ["functions"],
    },
    (rng) => {
      const b = rng.pick([2, 3]);
      const options: McOption[] = [
        { id: "a", text: L(`$y = ${b}^{x}$`, `$y = ${b}^{x}$`), correct: true },
        { id: "b", text: L(`$y = x^{${b}}$`, `$y = x^{${b}}$`), correct: false },
        { id: "c", text: L(`$y = ${b}x + 1$`, `$y = ${b}x + 1$`), correct: false },
        { id: "d", text: L(`$y = ${b}^{x+1}$`, `$y = ${b}^{x+1}$`), correct: false },
      ];
      return {
        skill: L("Reconocer una curva de crecimiento", "Recognizing a growth curve"),
        statement: L(
          "La gráfica muestra una función exponencial con dos puntos marcados. ¿Qué ecuación la representa?",
          "The graph shows an exponential function with two marked points. Which equation represents it?",
        ),
        diagram: {
          kind: "function-graph",
          xMin: -4,
          xMax: 4,
          yMin: -2,
          yMax: 10,
          curves: [{ fn: `${b}^x`, color: "primary" }],
          points: [
            { x: 0, y: 1, label: "(0, 1)" },
            { x: 1, y: b, label: `(1, ${b})` },
          ],
          showGrid: true,
          xLabel: "x",
          yLabel: "y",
        },
        diagramLabel: L(
          "Curva creciente que pasa por (0, 1) y (1, " + b + ").",
          `Increasing curve passing through (0, 1) and (1, ${b}).`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Los dos puntos marcados deben cumplir la ecuación.",
            "Both marked points must satisfy the equation.",
          ),
          L(
            "El punto $(0, 1)$ es muy selectivo: sustitúyelo en cada opción.",
            "The point $(0, 1)$ is very discriminating: substitute it into each option.",
          ),
          L(
            `Comprueba con $(1, ${b})$: la base elevada a 1 debe dar exactamente $${b}$.`,
            `Check with $(1, ${b})$: the base raised to 1 must give exactly $${b}$.`,
          ),
        ],
        answerDisplay: L(`$y = ${b}^{x}$`, `$y = ${b}^{x}$`),
        solution: [
          step(
            "given",
            `La curva pasa por $(0, 1)$ y $(1, ${b})$.`,
            `The curve passes through $(0, 1)$ and $(1, ${b})$.`,
          ),
          step(
            "approach",
            "Probamos cada candidato sustituyendo los dos puntos marcados.",
            "Test each candidate by substituting the two marked points.",
          ),
          step(
            "calculation",
            `$${b}^{0} = 1$ ✓ y $${b}^{1} = ${b}$ ✓<br>$x^{${b}}$ en $x = 0$ da $0$ ✗<br>$${b}x + 1$ en $x = 1$ da $${b + 1}$ ✗<br>$${b}^{x+1}$ en $x = 0$ da $${b}$ ✗`,
            `$${b}^{0} = 1$ ✓ and $${b}^{1} = ${b}$ ✓<br>$x^{${b}}$ at $x = 0$ gives $0$ ✗<br>$${b}x + 1$ at $x = 1$ gives $${b + 1}$ ✗<br>$${b}^{x+1}$ at $x = 0$ gives $${b}$ ✗`,
          ),
          step("result", `$y = ${b}^{x}$`, `$y = ${b}^{x}$`),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Decay curve → equation (MC + diagram)                            */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "exp-graph-02",
      subject: "math",
      topicId: "exponential",
      subtopicId: "decay",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["graphs", "exponential-decay", "reading-graphs"],
      prerequisites: ["functions"],
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$y = 2^{-x}$", "$y = 2^{-x}$"), correct: true },
        { id: "b", text: L("$y = 2^{x}$", "$y = 2^{x}$"), correct: false },
        { id: "c", text: L("$y = \\frac{1}{2}x + 1$", "$y = \\frac{1}{2}x + 1$"), correct: false },
        { id: "d", text: L("$y = -2^{-x}$", "$y = -2^{-x}$"), correct: false },
      ];
      return {
        skill: L("Reconocer una curva de decaimiento", "Recognizing a decay curve"),
        statement: L(
          "La gráfica muestra una función exponencial con dos puntos marcados. ¿Qué ecuación la representa?",
          "The graph shows an exponential function with two marked points. Which equation represents it?",
        ),
        diagram: {
          kind: "function-graph",
          xMin: -4,
          xMax: 4,
          yMin: -2,
          yMax: 10,
          curves: [{ fn: "2^(-x)", color: "primary" }],
          points: [
            { x: 0, y: 1, label: "(0, 1)" },
            { x: 1, y: 0.5, label: "(1, 0.5)" },
          ],
          showGrid: true,
          xLabel: "x",
          yLabel: "y",
        },
        diagramLabel: L(
          "Curva decreciente que pasa por (0, 1) y (1, 0.5).",
          "Decreasing curve passing through (0, 1) and (1, 0.5).",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Observa si la curva crece o decrece al avanzar hacia la derecha.",
            "Watch whether the curve rises or falls as you move to the right.",
          ),
          L(
            "Pasa por $(0, 1)$ y por $(1, 0{,}5)$: cada paso entero divide el valor entre 2.",
            "It passes through $(0, 1)$ and $(1, 0.5)$: each integer step halves the value.",
          ),
          L(
            "Un exponente negativo (o una base entre 0 y 1) produce decaimiento.",
            "A negative exponent (or a base between 0 and 1) produces decay.",
          ),
        ],
        answerDisplay: L("$y = 2^{-x}$", "$y = 2^{-x}$"),
        solution: [
          step(
            "given",
            `La curva pasa por $(0, 1)$ y $(1, ${tok(0.5)})$ y decrece.`,
            `The curve passes through $(0, 1)$ and $(1, ${tok(0.5)})$ and decreases.`,
          ),
          step(
            "approach",
            "Comprobamos los puntos en cada opción y la monotonía.",
            "Check the points on each option and the monotonicity.",
          ),
          step(
            "calculation",
            `$2^{-0} = 1$ ✓, $2^{-1} = ${tok(0.5)}$ ✓<br>$2^{x}$ crece en vez de decrecer ✗<br>$\\frac{1}{2}x + 1$ es una recta ✗<br>$-2^{-x}$ está por debajo del eje $x$ ✗`,
            `$2^{-0} = 1$ ✓, $2^{-1} = ${tok(0.5)}$ ✓<br>$2^{x}$ grows instead of decaying ✗<br>$\\frac{1}{2}x + 1$ is a straight line ✗<br>$-2^{-x}$ lies below the $x$-axis ✗`,
          ),
          step("result", "$y = 2^{-x}$", "$y = 2^{-x}$"),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Equations: same base, different power                             */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "exp-eq-01",
      subject: "math",
      topicId: "exponential",
      subtopicId: "equations",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 150,
      tags: ["exponential-equations", "exponent-laws"],
      prerequisites: ["functions"],
    },
    (rng) => {
      const a = rng.pick([2, 3, 5]);
      const c = rng.int(2, 8);
      const B = a * a;
      return {
        skill: L("Ecuación exponencial con la misma base", "Exponential equation with a common base"),
        statement: L(
          `Resuelve: $${B}^{x} = ${a}^{x + ${c}}$`,
          `Solve: $${B}^{x} = ${a}^{x + ${c}}$`,
        ),
        answer: { kind: "numeric", value: c },
        hints: [
          L(
            "Expresa los dos lados con la **misma base**.",
            "Write both sides with the **same base**.",
          ),
          L(
            `$${B} = ${a}^{2}$, así que el lado izquierdo es $${a}^{2x}$.`,
            `$${B} = ${a}^{2}$, so the left side is $${a}^{2x}$.`,
          ),
          L(
            "Con la misma base, los exponentes deben ser iguales.",
            "With the same base, the exponents must be equal.",
          ),
        ],
        answerDisplay: L(`$x = ${c}$`, `$x = ${c}$`),
        solution: [
          step("given", `$${B}^{x} = ${a}^{x + ${c}}$`, `$${B}^{x} = ${a}^{x + ${c}}$`),
          step(
            "approach",
            "Reducimos a base común y ecuamos exponentes.",
            "Reduce to a common base and equate the exponents.",
          ),
          step(
            "calculation",
            `$${B}^{x} = (${a}^{2})^{x} = ${a}^{2x}$<br>$${a}^{2x} = ${a}^{x + ${c}}$<br>$2x = x + ${c}$<br>$x = ${c}$`,
            `$${B}^{x} = (${a}^{2})^{x} = ${a}^{2x}$<br>$${a}^{2x} = ${a}^{x + ${c}}$<br>$2x = x + ${c}$<br>$x = ${c}$`,
          ),
          step("result", `$x = ${c}$`, `$x = ${c}$`),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Transformations: identify the shift (MC)                          */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "exp-trans-01",
      subject: "math",
      topicId: "exponential",
      subtopicId: "transformations",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["transformations"],
      prerequisites: ["functions"],
    },
    (rng) => {
      const b = rng.pick([2, 3]);
      const h = rng.int(1, 3);
      const k = rng.int(1, 4);
      const mk = (left: boolean, up: boolean): string =>
        `$${h}$ unidades a la ${left ? "izquierda" : "derecha"} y $${k}$ hacia ${up ? "arriba" : "abajo"}`;
      const mkEn = (left: boolean, up: boolean): string =>
        `$${h}$ units to the ${left ? "left" : "right"} and $${k}$ ${up ? "up" : "down"}`;
      const options: McOption[] = [
        { id: "a", text: L(mk(false, true), mkEn(false, true)), correct: true },
        { id: "b", text: L(mk(true, true), mkEn(true, true)), correct: false },
        { id: "c", text: L(mk(false, false), mkEn(false, false)), correct: false },
        { id: "d", text: L(mk(true, false), mkEn(true, false)), correct: false },
      ];
      return {
        skill: L("Traslaciones de una exponencial", "Translations of an exponential"),
        statement: L(
          `La gráfica de $f(x) = ${b}^{x}$ se traslada para obtener $g(x) = ${b}^{x - ${h}} + ${k}$. ¿Qué traslación se ha aplicado?`,
          `The graph of $f(x) = ${b}^{x}$ is translated to obtain $g(x) = ${b}^{x - ${h}} + ${k}$. Which translation was applied?`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Compara con la forma $y = b^{x - h} + k$.",
            "Compare with the form $y = b^{x - h} + k$.",
          ),
          L(
            "Dentro del exponente, **restar** desplaza a la derecha.",
            "Inside the exponent, **subtracting** shifts to the right.",
          ),
          L(
            "Fuera del exponente, sumar sube la curva (y su asíntota).",
            "Outside the exponent, adding raises the curve (and its asymptote).",
          ),
        ],
        answerDisplay: L(mk(false, true), mkEn(false, true)),
        solution: [
          step(
            "given",
            `$g(x) = ${b}^{x - ${h}} + ${k}$`,
            `$g(x) = ${b}^{x - ${h}} + ${k}$`,
          ),
          step(
            "approach",
            "En $y = b^{x - h} + k$, $h$ desplaza en horizontal y $k$ en vertical.",
            "In $y = b^{x - h} + k$, $h$ shifts horizontally and $k$ vertically.",
          ),
          step(
            "calculation",
            `Exponente: $x - ${h}$ ⇒ $${h}$ unidades a la derecha<br>Término exterior: $+ ${k}$ ⇒ $${k}$ unidades hacia arriba`,
            `Exponent: $x - ${h}$ ⇒ $${h}$ units to the right<br>Outer term: $+ ${k}$ ⇒ $${k}$ units up`,
          ),
          step(
            "result",
            `La gráfica se mueve $${h}$ unidades a la derecha y $${k}$ hacia arriba.`,
            `The graph moves $${h}$ units right and $${k}$ up.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Applications: compound growth (rounding + tolerance)              */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "exp-app-01",
      subject: "math",
      topicId: "exponential",
      subtopicId: "applications",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 180,
      tags: ["compound-growth", "applications", "rounding"],
      prerequisites: ["functions"],
    },
    (rng) => {
      const C = rng.pick([1000, 1500, 2000, 2500, 5000]);
      const r = rng.pick([5, 8]);
      const n = rng.pick([2, 3]);
      const factor = Math.pow(1 + r / 100, n);
      const value = Math.round(C * factor * 100) / 100;
      const factorTok = tok(Math.round(factor * 10000) / 10000);
      return {
        skill: L("Interés compuesto", "Compound growth"),
        statement: L(
          `Depositas $${C}\\,€$ en una cuenta que rinde un $${r}\\%$ anual con capitalización anual. ¿Cuánto capital tendrás después de $${n}$ años? (redondea a 2 decimales)`,
          `You deposit $${C}\\,€$ in an account earning $${r}\\%$ per year compounded annually. How much capital will you have after $${n}$ years? (round to 2 decimal places)`,
        ),
        answer: {
          kind: "numeric",
          value,
          tolerance: { mode: "relative", value: 0.02 },
        },
        hints: [
          L(
            "Cada año el capital se multiplica por $(1 + \\text{tanto por uno})$.",
            "Each year the capital is multiplied by $(1 + \\text{decimal rate})$.",
          ),
          L(
            `El factor anual es $1 + ${tok(r / 100)}$.`,
            `The yearly factor is $1 + ${tok(r / 100)}$.`,
          ),
          L(
            `Tras $${n}$ años: $${C} \\cdot (1 + ${tok(r / 100)})^{${n}}$.`,
            `After $${n}$ years: $${C} \\cdot (1 + ${tok(r / 100)})^{${n}}$.`,
          ),
        ],
        answerDisplay: L(`$\\approx ${tok(value)}\\,€$`, `$\\approx ${tok(value)}\\,€$`),
        solution: [
          step(
            "given",
            `Capital inicial: $${C}\\,€$. Interés anual: $${r}\\%$. Años: $${n}$.`,
            `Initial capital: $${C}\\,€$. Annual interest: $${r}\\%$. Years: $${n}$.`,
          ),
          step(
            "approach",
            "Con capitalización anual, $M = C\\,(1 + \\frac{r}{100})^{n}$.",
            "With annual compounding, $M = C\\,(1 + \\frac{r}{100})^{n}$.",
          ),
          step(
            "calculation",
            `$M = ${C} \\cdot (1 + ${tok(r / 100)})^{${n}} = ${C} \\cdot ${factorTok} \\approx ${tok(value)}\\,€$`,
            `$M = ${C} \\cdot (1 + ${tok(r / 100)})^{${n}} = ${C} \\cdot ${factorTok} \\approx ${tok(value)}\\,€$`,
          ),
          step(
            "result",
            `Tras $${n}$ años tendrás aproximadamente $${tok(value)}\\,€$.`,
            `After $${n}$ years you will have about $${tok(value)}\\,€$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Equations: linear equation inside the exponent                    */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "exp-eq-02",
      subject: "math",
      topicId: "exponential",
      subtopicId: "equations",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 210,
      tags: ["exponential-equations", "exponent-laws"],
      prerequisites: ["functions"],
    },
    (rng) => {
      const [s, p] = rng.pick([
        [1, 5],
        [1, 7],
        [3, 5],
        [3, 7],
        [5, 7],
      ]);
      const x = (p + s) / 2;
      return {
        skill: L("Ecuación con un binomio en el exponente", "Equation with a binomial exponent"),
        statement: L(
          `Resuelve: $3^{2x - ${s}} = ${Math.pow(3, p)}$`,
          `Solve: $3^{2x - ${s}} = ${Math.pow(3, p)}$`,
        ),
        answer: { kind: "numeric", value: x },
        hints: [
          L(
            "Escribe el lado derecho como potencia de $3$.",
            "Write the right-hand side as a power of $3$.",
          ),
          L(
            `$${Math.pow(3, p)} = 3^{${p}}$.`,
            `$${Math.pow(3, p)} = 3^{${p}}$.`,
          ),
          L(
            "Iguala los exponentes y despeja $x$ paso a paso.",
            "Equate the exponents and solve for $x$ step by step.",
          ),
        ],
        answerDisplay: L(`$x = ${x}$`, `$x = ${x}$`),
        solution: [
          step(
            "given",
            `$3^{2x - ${s}} = ${Math.pow(3, p)}$`,
            `$3^{2x - ${s}} = ${Math.pow(3, p)}$`,
          ),
          step(
            "approach",
            "Expresamos ambos lados en base 3 y ecuamos exponentes.",
            "Express both sides in base 3 and equate exponents.",
          ),
          step(
            "calculation",
            `$3^{2x - ${s}} = 3^{${p}}$<br>$2x - ${s} = ${p}$<br>$2x = ${p + s}$<br>$x = \\frac{${p + s}}{2} = ${x}$`,
            `$3^{2x - ${s}} = 3^{${p}}$<br>$2x - ${s} = ${p}$<br>$2x = ${p + s}$<br>$x = \\frac{${p + s}}{2} = ${x}$`,
          ),
          step("result", `$x = ${x}$`, `$x = ${x}$`),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Transformations: write the shifted equation (expression)          */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "exp-trans-02",
      subject: "math",
      topicId: "exponential",
      subtopicId: "transformations",
      difficulty: "hard",
      questionType: "expression",
      estimatedTimeSec: 210,
      tags: ["transformations", "exponent-laws"],
      prerequisites: ["functions"],
    },
    (rng) => {
      const h = rng.int(1, 4);
      const k = rng.int(1, 6);
      return {
        skill: L("Escribir una exponencial trasladada", "Writing a shifted exponential"),
        statement: L(
          `La gráfica de $f(x) = 2^{x}$ se desplaza $${h}$ unidades a la derecha y $${k}$ hacia abajo. Escribe la ecuación de $g(x)$ (por ejemplo: 2^(x-6)-7).`,
          `The graph of $f(x) = 2^{x}$ is shifted $${h}$ units right and $${k}$ down. Write the equation of $g(x)$ (e.g. 2^(x-6)-7).`,
        ),
        answer: {
          kind: "expression",
          accepted: [`2^(x-${h})-${k}`, `(2^x)/${Math.pow(2, h)} - ${k}`],
          variables: ["x"],
        },
        hints: [
          L(
            "Parte de la forma $g(x) = 2^{x - h} - k$.",
            "Start from the form $g(x) = 2^{x - h} - k$.",
          ),
          L(
            `Derecha significa $x - ${h}$ dentro del exponente; abajo significa $-${k}$ fuera.`,
            `Right means $x - ${h}$ inside the exponent; down means $-${k}$ outside.`,
          ),
          L(
            "Comprueba un valor: $g(0)$ debería ser una fracción pequeña menos $k$.",
            "Check one value: $g(0)$ should be a small fraction minus $k$.",
          ),
        ],
        answerDisplay: L(
          `$g(x) = 2^{x - ${h}} - ${k}$`,
          `$g(x) = 2^{x - ${h}} - ${k}$`,
        ),
        solution: [
          step(
            "given",
            `Traslación: $${h}$ a la derecha y $${k}$ hacia abajo desde $f(x) = 2^{x}$.`,
            `Shift: $${h}$ right and $${k}$ down from $f(x) = 2^{x}$.`,
          ),
          step(
            "approach",
            "La traslación horizontal actúa dentro del exponente; la vertical, fuera.",
            "The horizontal shift acts inside the exponent; the vertical one, outside.",
          ),
          step(
            "calculation",
            `$g(x) = 2^{\\,x - ${h}\\,} - ${k}$<br>Forma equivalente: $2^{x - ${h}} = \\dfrac{2^{x}}{2^{${h}}} = \\dfrac{2^{x}}{${Math.pow(2, h)}}$, así que $g(x) = \\dfrac{2^{x}}{${Math.pow(2, h)}} - ${k}$`,
            `$g(x) = 2^{\\,x - ${h}\\,} - ${k}$<br>Equivalent form: $2^{x - ${h}} = \\dfrac{2^{x}}{2^{${h}}} = \\dfrac{2^{x}}{${Math.pow(2, h)}}$, so $g(x) = \\dfrac{2^{x}}{${Math.pow(2, h)}} - ${k}$`,
          ),
          step(
            "result",
            `$g(x) = 2^{x - ${h}} - ${k}$`,
            `$g(x) = 2^{x - ${h}} - ${k}$`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Applications: doubling time                                       */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "exp-app-02",
      subject: "math",
      topicId: "exponential",
      subtopicId: "applications",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 210,
      tags: ["doubling-time", "applications", "word-problems"],
      prerequisites: ["functions"],
    },
    (rng) => {
      const n0 = rng.pick([100, 250, 500, 1000]);
      const k = rng.int(3, 6);
      const d = rng.pick([2, 3]);
      const M = n0 * Math.pow(2, k);
      const value = d * k;
      return {
        skill: L("Tiempo de duplicación", "Doubling time"),
        statement: L(
          `Un cultivo comienza con $${n0}$ bacterias y **se duplica** cada $${d}$ horas. ¿Cuántas horas tarda en alcanzar $${M}$ bacterias?`,
          `A culture starts with $${n0}$ bacteria and **doubles** every $${d}$ hours. How many hours does it take to reach $${M}$ bacteria?`,
        ),
        answer: { kind: "numeric", value, unitSuffix: "h" },
        hints: [
          L(
            "Modeliza con $N(t) = N_{0} \\cdot 2^{\\,t/d\\,}$.",
            "Model with $N(t) = N_{0} \\cdot 2^{\\,t/d\\,}$.",
          ),
          L(
            `Cuenta cuántos dobleces hay desde $${n0}$ hasta $${M}$.`,
            `Count how many doublings take you from $${n0}$ to $${M}$.`,
          ),
          L(
            `Divide: $\\frac{${M}}{${n0}} = ${Math.pow(2, k)} = 2^{${k}}$.`,
            `Divide: $\\frac{${M}}{${n0}} = ${Math.pow(2, k)} = 2^{${k}}$.`,
          ),
        ],
        answerDisplay: L(`$t = ${value}\\ \\text{h}$`, `$t = ${value}\\ \\text{h}$`),
        solution: [
          step(
            "given",
            `$N_{0} = ${n0}$ bacterias. Se duplica cada $${d}$ horas. Objetivo: $${M}$.`,
            `$N_{0} = ${n0}$ bacteria. Doubles every $${d}$ hours. Target: $${M}$.`,
          ),
          step(
            "approach",
            "Con $N(t) = N_{0} \\cdot 2^{t/d}$, igualamos al objetivo y despejamos $t$.",
            "With $N(t) = N_{0} \\cdot 2^{t/d}$, set it equal to the target and solve for $t$.",
          ),
          step(
            "calculation",
            `$${n0} \\cdot 2^{t/${d}} = ${M}$<br>$2^{t/${d}} = \\frac{${M}}{${n0}} = ${Math.pow(2, k)} = 2^{${k}}$<br>$\\frac{t}{${d}} = ${k}$<br>$t = ${value}\\ \\text{h}$`,
            `$${n0} \\cdot 2^{t/${d}} = ${M}$<br>$2^{t/${d}} = \\frac{${M}}{${n0}} = ${Math.pow(2, k)} = 2^{${k}}$<br>$\\frac{t}{${d}} = ${k}$<br>$t = ${value}\\ \\text{h}$`,
          ),
          step(
            "result",
            `Se necesitan $${value}$ horas ($${k}$ duplicaciones).`,
            `It takes $${value}$ hours ($${k}$ doublings).`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Challenge: paper folding                                          */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "exp-chal-01",
      subject: "math",
      topicId: "exponential",
      subtopicId: "applications",
      difficulty: "challenge",
      questionType: "numeric",
      estimatedTimeSec: 300,
      tags: ["exponential-growth", "applications", "inequalities"],
      prerequisites: ["functions"],
    },
    (rng) => {
      const t0 = rng.pick([0.1, 0.2]);
      const T = rng.pick([1000, 2000, 5000]);
      let n = 1;
      while (t0 * Math.pow(2, n) <= T) n++;
      const ratio = T / t0;
      return {
        skill: L("Crecimiento exponencial extremo", "Extreme exponential growth"),
        statement: L(
          `Una hoja de papel tiene un grosor de $${tok(t0)}\\ \\text{mm}$ y, en un experimento ideal, cada doblez **duplica** el grosor. ¿Cuál es el número mínimo de dobleces para que el grosor supere los $${T / 1000}\\ \\text{m}$ de altura? (Recuerda: $${T / 1000}\\ \\text{m} = ${T}\\ \\text{mm}$)`,
          `A sheet of paper is $${tok(t0)}\\ \\text{mm}$ thick and, in an ideal experiment, each fold **doubles** the thickness. What is the minimum number of folds for the thickness to exceed $${T / 1000}\\ \\text{m}$? (Remember: $${T / 1000}\\ \\text{m} = ${T}\\ \\text{mm}$)`,
        ),
        answer: { kind: "numeric", value: n },
        hints: [
          L(
            "Tras $n$ dobleces, el grosor es $t_{0} \\cdot 2^{n}$ milímetros.",
            "After $n$ folds, the thickness is $t_{0} \\cdot 2^{n}$ millimetres.",
          ),
          L(
            `Busca el menor $n$ con $${tok(t0)} \\cdot 2^{n} > ${T}$.`,
            `Find the smallest $n$ with $${tok(t0)} \\cdot 2^{n} > ${T}$.`,
          ),
          L(
            `Equivale a $2^{n} > ${ratio}$. Usa que $2^{10} = 1024$ para estimar.`,
            `This is equivalent to $2^{n} > ${ratio}$. Use $2^{10} = 1024$ to estimate.`,
          ),
        ],
        answerDisplay: L(`$n = ${n}$ dobleces`, `$n = ${n}$ folds`),
        solution: [
          step(
            "given",
            `Grosor inicial: $${tok(t0)}\\ \\text{mm}$. Objetivo: superar $${T}\\ \\text{mm}$.`,
            `Initial thickness: $${tok(t0)}\\ \\text{mm}$. Target: exceed $${T}\\ \\text{mm}$.`,
          ),
          step(
            "approach",
            "Planteamos la desigualdad $t_{0} \\cdot 2^{n} > T$ y buscamos el menor entero $n$ que la cumple.",
            "Set up the inequality $t_{0} \\cdot 2^{n} > T$ and find the smallest integer $n$ satisfying it.",
          ),
          step(
            "calculation",
            `$2^{n} > \\frac{${T}}{ ${tok(t0)}} = ${ratio}$<br>$2^{${n - 1}} = ${Math.pow(2, n - 1)} \\le ${ratio}$ (no basta)<br>$2^{${n}} = ${Math.pow(2, n)} > ${ratio}$ (sí supera)`,
            `$2^{n} > \\frac{${T}}{ ${tok(t0)}} = ${ratio}$<br>$2^{${n - 1}} = ${Math.pow(2, n - 1)} \\le ${ratio}$ (not enough)<br>$2^{${n}} = ${Math.pow(2, n)} > ${ratio}$ (exceeds it)`,
          ),
          step(
            "result",
            `Hacen falta $${n}$ dobleces para superar la altura establecida.`,
            `It takes $${n}$ folds to exceed the stated height.`,
          ),
        ],
      };
    },
  ),
];
