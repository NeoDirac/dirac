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

  /* ================================================================== */
  /* Curated — ESPOL Fundamentos, EDICIÓN DIGITAL (TUTOR_LICENSED).      */
  /* Chapter 3 «Funciones de variable real»: §3.13 Función              */
  /* exponencial (pp. 389-393) / §3.14 Función logarítmica              */
  /* (pp. 391-396). Tutor's brief: «vayas a por los ejercicios del      */
  /* cap 3». Every answer double-verified: printed key pp. 939-940 +    */
  /* sympy (download/verify_espol_ch3.py).                               */
  /* ================================================================== */

  /* 103a — 3^(x+1)+3^x+3^(x−1)=39 → factor 3^x → {2}. Printed key: a){2}. */
  template(
    {
      id: "exp-espol-ch3-103a",
      subject: "math",
      topicId: "exponential",
      subtopicId: "equations",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 210,
      tags: ["exponential-equation", "factoring"],
      prerequisites: ["equations"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3 · 103a",
        page: 389,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L("Factorizar la potencia común en una ecuación exponencial", "Factoring out the common power in an exponential equation"),
      statement: L(
        "Halla el conjunto de verdad del predicado $p(x):\\ 3^{x+1} + 3^{x} + 3^{x-1} = 39$ con $x \\in \\mathbb{R}$ (da el valor de $x$):",
        "Find the truth set of the predicate $p(x):\\ 3^{x+1} + 3^{x} + 3^{x-1} = 39$ with $x \\in \\mathbb{R}$ (give the value of $x$):",
      ),
      answer: { kind: "numeric", value: 2 },
      hints: [
        L(
          "Los tres términos son potencias de $3$: escribe los exponentes como $x$ más (o menos) una constante y extrae el factor común $3^{x}$.",
          "All three terms are powers of $3$: write the exponents as $x$ plus (or minus) a constant and pull out the common factor $3^{x}$.",
        ),
        L(
          "$3^{x+1} = 3 \\cdot 3^{x}$ y $3^{x-1} = \\tfrac{1}{3} \\cdot 3^{x}$: la suma de los coeficientes es una fracción con denominador $3$.",
          "$3^{x+1} = 3 \\cdot 3^{x}$ and $3^{x-1} = \\tfrac{1}{3} \\cdot 3^{x}$: the sum of the coefficients is a fraction with denominator $3$.",
        ),
        L(
          "Tras factorizar, despeja $3^{x}$: te debe quedar una potencia exacta de $3$ (concretamente, un cuadrado perfecto de base $3$).",
          "After factoring, isolate $3^{x}$: you should be left with an exact power of $3$ (a perfect square with base $3$, in fact).",
        ),
      ],
      answerDisplay: L("$A_{p(x)} = \\{2\\}$", "$A_{p(x)} = \\{2\\}$"),
      solution: [
        step(
          "given",
          "El predicado $p(x):\\ 3^{x+1} + 3^{x} + 3^{x-1} = 39$, con $x \\in \\mathbb{R}$.",
          "The predicate $p(x):\\ 3^{x+1} + 3^{x} + 3^{x-1} = 39$, with $x \\in \\mathbb{R}$.",
        ),
        step(
          "approach",
          "Los exponentes difieren solo en constantes: factorizando $3^{x}$, la ecuación se reduce a una sola potencia de $3$ igualada a un número.",
          "The exponents differ only by constants: factoring out $3^{x}$ reduces the equation to a single power of $3$ set equal to a number.",
        ),
        step(
          "calculation",
          "$3^{x+1} + 3^{x} + 3^{x-1} = 3^{x}\\left(3 + 1 + \\tfrac{1}{3}\\right) = 3^{x} \\cdot \\tfrac{13}{3} = 39 \\Rightarrow 3^{x} = 39 \\cdot \\tfrac{3}{13} = 9 = 3^{2} \\Rightarrow x = 2$.",
          "$3^{x+1} + 3^{x} + 3^{x-1} = 3^{x}\\left(3 + 1 + \\tfrac{1}{3}\\right) = 3^{x} \\cdot \\tfrac{13}{3} = 39 \\Rightarrow 3^{x} = 39 \\cdot \\tfrac{3}{13} = 9 = 3^{2} \\Rightarrow x = 2$.",
        ),
        step(
          "result",
          "$A_{p(x)} = \\{2\\}$. Verificación: $x = 2 \\Rightarrow 3^{3} + 3^{2} + 3^{1} = 27 + 9 + 3 = 39$ ✓.",
          "$A_{p(x)} = \\{2\\}$. Check: $x = 2 \\Rightarrow 3^{3} + 3^{2} + 3^{1} = 27 + 9 + 3 = 39$ ✓.",
        ),
      ],
    }),
  ),

  /* 103b — 2^(x+1)+4^x=80 → t=2^x quadratic → {3}. Printed key: b){3}. */
  template(
    {
      id: "exp-espol-ch3-103b",
      subject: "math",
      topicId: "exponential",
      subtopicId: "equations",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 180,
      tags: ["exponential-equation", "substitution", "quadratic"],
      prerequisites: ["equations", "quadratic-formula"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3 · 103b",
        page: 389,
      },
      reasoning: "parameters",
    },
    () => ({
      skill: L("Sustitución $t = 2^{x}$: de exponencial a cuadrática", "Substitution $t = 2^{x}$: from exponential to quadratic"),
      statement: L(
        "Halla el conjunto de verdad del predicado $q(x):\\ 2^{x+1} + 4^{x} = 80$ con $x \\in \\mathbb{R}$ (da el valor de $x$):",
        "Find the truth set of the predicate $q(x):\\ 2^{x+1} + 4^{x} = 80$ with $x \\in \\mathbb{R}$ (give the value of $x$):",
      ),
      answer: { kind: "numeric", value: 3 },
      hints: [
        L(
          "Escribe todo en la base $2$: $4^{x} = (2^{x})^{2}$ y $2^{x+1} = 2 \\cdot 2^{x}$.",
          "Write everything in base $2$: $4^{x} = (2^{x})^{2}$ and $2^{x+1} = 2 \\cdot 2^{x}$.",
        ),
        L(
          "Con la sustitución $t = 2^{x}$ (nota que $t > 0$ siempre), obtienes una ecuación cuadrática en $t$ que factoriza bien.",
          "With the substitution $t = 2^{x}$ (note that $t > 0$ always), you get a quadratic equation in $t$ that factors nicely.",
        ),
        L(
          "Una de las raíces de la cuadrática es negativa: recuérdalo, ninguna potencia de $2$ con exponente real puede ser negativa.",
          "One of the quadratic's roots is negative: remember, no power of $2$ with a real exponent can be negative.",
        ),
      ],
      answerDisplay: L("$A_{q(x)} = \\{3\\}$", "$A_{q(x)} = \\{3\\}$"),
      solution: [
        step(
          "given",
          "$q(x):\\ 2^{x+1} + 4^{x} = 80$, $x \\in \\mathbb{R}$.",
          "$q(x):\\ 2^{x+1} + 4^{x} = 80$, $x \\in \\mathbb{R}$.",
        ),
        step(
          "approach",
          "Unificar la base $2$ y sustituir $t = 2^{x} > 0$; la ecuación resultante en $t$ es una cuadrática factorizable.",
          "Unify the base $2$ and substitute $t = 2^{x} > 0$; the resulting equation in $t$ is a factorable quadratic.",
        ),
        step(
          "calculation",
          "$2 \\cdot 2^{x} + (2^{x})^{2} = 80$; con $t = 2^{x}$: $t^{2} + 2t - 80 = 0 \\Rightarrow (t + 10)(t - 8) = 0 \\Rightarrow t = 8$ (se descarta $t = -10 < 0$, pues las exponenciales son positivas). Entonces $2^{x} = 8 = 2^{3} \\Rightarrow x = 3$.",
          "$2 \\cdot 2^{x} + (2^{x})^{2} = 80$; with $t = 2^{x}$: $t^{2} + 2t - 80 = 0 \\Rightarrow (t + 10)(t - 8) = 0 \\Rightarrow t = 8$ ($t = -10 < 0$ is rejected, exponentials are positive). Then $2^{x} = 8 = 2^{3} \\Rightarrow x = 3$.",
        ),
        step(
          "result",
          "$A_{q(x)} = \\{3\\}$. Verificación: $x = 3 \\Rightarrow 2^{4} + 4^{3} = 16 + 64 = 80$ ✓.",
          "$A_{q(x)} = \\{3\\}$. Check: $x = 3 \\Rightarrow 2^{4} + 4^{3} = 16 + 64 = 80$ ✓.",
        ),
      ],
    }),
  ),

  /* 106 — f(x)=e^(x−1)−1: horizontal asymptote y=−1. Printed key: b). */
  template(
    {
      id: "exp-espol-ch3-106",
      subject: "math",
      topicId: "exponential",
      subtopicId: "transformations",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 210,
      tags: ["exponential-function", "asymptote", "properties"],
      prerequisites: ["transformations"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3 · 106",
        page: 390,
      },
      reasoning: "graphical",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$f$ es decreciente en todo $\\mathbb{R}$", "$f$ is decreasing on all of $\\mathbb{R}$"), correct: false },
        { id: "b", text: L("$y = -1$ es una asíntota de la gráfica de $f$", "$y = -1$ is an asymptote of the graph of $f$"), correct: true },
        { id: "c", text: L("$f(-1) = 0$", "$f(-1) = 0$"), correct: false },
        { id: "d", text: L("$f$ es impar", "$f$ is odd"), correct: false },
        { id: "e", text: L("para todo $x \\in \\mathbb{R}$, $\\mu(f(x)) = 1$", "for all $x \\in \\mathbb{R}$, $\\mu(f(x)) = 1$"), correct: false },
      ];
      return {
        skill: L("Propiedades globales de $e^{x}$ desplazada: monotonía, asíntota y paridad", "Global properties of a shifted $e^{x}$: monotonicity, asymptote and parity"),
        statement: L(
          "Si $f: \\mathbb{R} \\to \\mathbb{R}$ tiene regla $f(x) = e^{x-1} - 1$, es **verdadero** que: (en la opción e), $\\mu$ es la función escalón unitario: $\\mu(u) = 1$ si $u > 0$ y $\\mu(u) = 0$ si $u \\leq 0$)",
          "If $f: \\mathbb{R} \\to \\mathbb{R}$ has rule $f(x) = e^{x-1} - 1$, it is **true** that: (in option e), $\\mu$ is the unit-step function: $\\mu(u) = 1$ if $u > 0$ and $\\mu(u) = 0$ if $u \\leq 0$)",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Piensa en la gráfica de $y = e^{x}$ y en los dos desplazamientos que producen $f(x) = e^{x-1} - 1$: uno horizontal (a la derecha) y otro vertical (hacia abajo).",
            "Think of the graph of $y = e^{x}$ and the two shifts that produce $f(x) = e^{x-1} - 1$: one horizontal (to the right) and one vertical (downwards).",
          ),
          L(
            "Cuando $x \\to -\\infty$, el término $e^{x-1}$ tiende a $0$; por eso $f(x)$ se acerca a un valor constante — un candidato a asíntota horizontal.",
            "As $x \\to -\\infty$, the term $e^{x-1}$ tends to $0$; that is why $f(x)$ approaches a constant value — a candidate horizontal asymptote.",
          ),
          L(
            "Repasa cada opción con su definición: crecimiento del exponente, el valor exacto de $f(-1)$, la condición de imparidad ($f(0)$ debería ser $0$) y cuándo vale $\\mu(f(x)) = 1$.",
            "Review each option against its definition: growth of the exponent, the exact value of $f(-1)$, the oddness condition ($f(0)$ should be $0$) and when $\\mu(f(x)) = 1$ holds.",
          ),
        ],
        answerDisplay: L("$y = -1$ es una asíntota horizontal de la gráfica de $f$", "$y = -1$ is a horizontal asymptote of the graph of $f$"),
        solution: [
          step(
            "given",
            "$f(x) = e^{x-1} - 1$ definida en todo $\\mathbb{R}$.",
            "$f(x) = e^{x-1} - 1$ defined on all of $\\mathbb{R}$.",
          ),
          step(
            "approach",
            "Analizar el comportamiento cuando $x \\to \\pm\\infty$ (asíntotas), la monotonía y valores puntuales, contrastando cada afirmación con su definición.",
            "Analyze the behaviour as $x \\to \\pm\\infty$ (asymptotes), the monotonicity and point values, checking each claim against its definition.",
          ),
          step(
            "calculation",
            "Cuando $x \\to -\\infty$: $e^{x-1} \\to 0$, luego $f(x) \\to -1$ → la recta $y = -1$ es asíntota horizontal ✓ (opción b).<br>a) Falso: $e^{x-1}$ crece con $x$, así que $f$ es estrictamente creciente ($f'(x) = e^{x-1} > 0$).<br>c) Falso: $f(-1) = e^{-2} - 1 \\approx -0{,}865 \\neq 0$.<br>d) Falso: una función impar cumple $f(0) = 0$, pero aquí $f(0) = e^{-1} - 1 < 0$.<br>e) Falso: $\\mu(f(x)) = 1$ exige $f(x) > 0$, es decir $x > 1$; no vale para todo $x$.",
            "As $x \\to -\\infty$: $e^{x-1} \\to 0$, so $f(x) \\to -1$ → the line $y = -1$ is a horizontal asymptote ✓ (option b).<br>a) False: $e^{x-1}$ grows with $x$, so $f$ is strictly increasing ($f'(x) = e^{x-1} > 0$).<br>c) False: $f(-1) = e^{-2} - 1 \\approx -0.865 \\neq 0$.<br>d) False: an odd function satisfies $f(0) = 0$, but here $f(0) = e^{-1} - 1 < 0$.<br>e) False: $\\mu(f(x)) = 1$ requires $f(x) > 0$, i.e. $x > 1$; it does not hold for all $x$.",
          ),
          step(
            "result",
            "La afirmación verdadera es la b): $y = -1$ es una asíntota de la gráfica de $f$. Verificación numérica: $f(-6) = e^{-7} - 1 \\approx -0{,}9991$, ya prácticamente sobre la asíntota ✓.",
            "The true statement is b): $y = -1$ is an asymptote of the graph of $f$. Numeric check: $f(-6) = e^{-7} - 1 \\approx -0.9991$, practically on the asymptote already ✓.",
          ),
        ],
      };
    },
  ),

  /* 121 — 3^x·4^(2x+1)=6^(x+2) → x=ln9/ln8. Printed key: ln 9/ln 8. */
  template(
    {
      id: "exp-espol-ch3-121",
      subject: "math",
      topicId: "exponential",
      subtopicId: "equations",
      difficulty: "hard",
      questionType: "expression",
      estimatedTimeSec: 300,
      tags: ["exponential-equation", "logs", "change-of-base"],
      prerequisites: ["equations", "properties"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3 · 121",
        page: 392,
      },
      reasoning: "multi-concept",
    },
    () => ({
      skill: L("Ecuación exponencial con bases no comunes: logaritmos y factorización", "Exponential equation with non-common bases: logarithms and factoring"),
      statement: L(
        "Determina el valor exacto de $x$ que satisface $3^{x} \\cdot 4^{2x+1} = 6^{x+2}$. Expresa la respuesta en la forma $\\ln(a)/\\ln(b)$ o cualquier expresión equivalente:",
        "Determine the exact value of $x$ satisfying $3^{x} \\cdot 4^{2x+1} = 6^{x+2}$. Express the answer in the form $\\ln(a)/\\ln(b)$ or any equivalent expression:",
      ),
      answer: {
        kind: "expression",
        accepted: ["ln(9)/ln(8)", "log(9)/log(8)", "2ln(3)/(3ln(2))"],
      },
      hints: [
        L(
          "Las bases $3$, $4$ y $6$ no comparten ninguna base común: toma $\\ln$ en ambos lados y despliega los exponentes con las leyes del logaritmo.",
          "The bases $3$, $4$ and $6$ share no common base: take $\\ln$ of both sides and expand the exponents with the logarithm laws.",
        ),
        L(
          "Descompón en primos: $4 = 2^{2}$ y $6 = 2 \\cdot 3$. Así todo queda en función de $\\ln 2$ y $\\ln 3$.",
          "Factor into primes: $4 = 2^{2}$ and $6 = 2 \\cdot 3$. Everything then lives in terms of $\\ln 2$ and $\\ln 3$.",
        ),
        L(
          "Agrupa los términos con $x$: casi todo se cancela y queda una ecuación de la forma $c_{1}\\,x\\ln 2 = c_{2}\\,\\ln 3$.",
          "Group the $x$-terms: almost everything cancels and you are left with an equation of the form $c_{1}\\,x\\ln 2 = c_{2}\\,\\ln 3$.",
        ),
      ],
      answerDisplay: L(
        "$x = \\dfrac{\\ln 9}{\\ln 8} = \\dfrac{2\\ln 3}{3\\ln 2} \\approx 1{,}0566$",
        "$x = \\dfrac{\\ln 9}{\\ln 8} = \\dfrac{2\\ln 3}{3\\ln 2} \\approx 1.0566$",
      ),
      solution: [
        step(
          "given",
          "$3^{x} \\cdot 4^{2x+1} = 6^{x+2}$, con $x \\in \\mathbb{R}$.",
          "$3^{x} \\cdot 4^{2x+1} = 6^{x+2}$, with $x \\in \\mathbb{R}$.",
        ),
        step(
          "approach",
          "Tomar $\\ln$ en ambos lados y usar $4 = 2^{2}$, $6 = 2 \\cdot 3$ para obtener una ecuación lineal en $x$ sobre $\\ln 2$ y $\\ln 3$.",
          "Take $\\ln$ of both sides and use $4 = 2^{2}$, $6 = 2 \\cdot 3$ to obtain a linear equation in $x$ over $\\ln 2$ and $\\ln 3$.",
        ),
        step(
          "calculation",
          "$x \\ln 3 + (2x+1) \\cdot 2\\ln 2 = (x+2)(\\ln 2 + \\ln 3)$<br>$x \\ln 3 + 4x\\ln 2 + 2\\ln 2 = x\\ln 2 + x\\ln 3 + 2\\ln 2 + 2\\ln 3$<br>Cancelando $x\\ln 3$ y $2\\ln 2$ en ambos lados: $4x\\ln 2 = x\\ln 2 + 2\\ln 3 \\Rightarrow 3x\\ln 2 = 2\\ln 3$<br>$x = \\dfrac{2\\ln 3}{3\\ln 2} = \\dfrac{\\ln 3^{2}}{\\ln 2^{3}} = \\dfrac{\\ln 9}{\\ln 8}$",
          "$x \\ln 3 + (2x+1) \\cdot 2\\ln 2 = (x+2)(\\ln 2 + \\ln 3)$<br>$x \\ln 3 + 4x\\ln 2 + 2\\ln 2 = x\\ln 2 + x\\ln 3 + 2\\ln 2 + 2\\ln 3$<br>Cancelling $x\\ln 3$ and $2\\ln 2$ on both sides: $4x\\ln 2 = x\\ln 2 + 2\\ln 3 \\Rightarrow 3x\\ln 2 = 2\\ln 3$<br>$x = \\dfrac{2\\ln 3}{3\\ln 2} = \\dfrac{\\ln 3^{2}}{\\ln 2^{3}} = \\dfrac{\\ln 9}{\\ln 8}$",
        ),
        step(
          "result",
          "$x = \\dfrac{\\ln 9}{\\ln 8} \\approx 1{,}0566$. Verificación numérica: $3^{1{,}0566} \\approx 3{,}19$ y $4^{3{,}1133} \\approx 74{,}9$, así que $3^{x} \\cdot 4^{2x+1} \\approx 239$; por el otro lado, $6^{3{,}0566} \\approx 239$ ✓.",
          "$x = \\dfrac{\\ln 9}{\\ln 8} \\approx 1.0566$. Numeric check: $3^{1.0566} \\approx 3.19$ and $4^{3.1133} \\approx 74.9$, so $3^{x} \\cdot 4^{2x+1} \\approx 239$; on the other side, $6^{3.0566} \\approx 239$ ✓.",
        ),
      ],
    }),
  ),

  /* 123 — 2^x+(0.5)^(2x−3)−6(0.5)^x=1 → cubic in t → {1, log₂((√17−1)/2)}. */
  template(
    {
      id: "exp-espol-ch3-123",
      subject: "math",
      topicId: "exponential",
      subtopicId: "equations",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 360,
      tags: ["exponential-equation", "cubic-substitution", "two-solutions"],
      prerequisites: ["equations"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3 · 123",
        page: 393,
      },
      reasoning: "parameters",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("solo $x = 1$", "only $x = 1$"), correct: false },
        {
          id: "b",
          text: L(
            "$x = 1$ y $x = \\log_{2}\\left(\\dfrac{\\sqrt{17} - 1}{2}\\right)$",
            "$x = 1$ and $x = \\log_{2}\\left(\\dfrac{\\sqrt{17} - 1}{2}\\right)$",
          ),
          correct: true,
        },
        {
          id: "c",
          text: L(
            "solo $x = \\log_{2}\\left(\\dfrac{\\sqrt{17} - 1}{2}\\right)$",
            "only $x = \\log_{2}\\left(\\dfrac{\\sqrt{17} - 1}{2}\\right)$",
          ),
          correct: false,
        },
        { id: "d", text: L("$x = 1$ y $x = 2$", "$x = 1$ and $x = 2$"), correct: false },
        { id: "e", text: L("$\\emptyset$ (no hay soluciones reales)", "$\\emptyset$ (there are no real solutions)"), correct: false },
      ];
      return {
        skill: L("Sustitución $t = 2^{x}$ que lleva a una cúbica con dos soluciones válidas", "Substitution $t = 2^{x}$ leading to a cubic with two valid solutions"),
        statement: L(
          "Sea $p(x):\\ 2^{x} + (0{,}5)^{2x-3} - 6(0{,}5)^{x} = 1$ con $x \\in \\mathbb{R}$. El conjunto de verdad $A_{p(x)}$ es:",
          "Let $p(x):\\ 2^{x} + (0.5)^{2x-3} - 6(0.5)^{x} = 1$ with $x \\in \\mathbb{R}$. The truth set $A_{p(x)}$ is:",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Reescribe los términos con base $0{,}5$ usando $t = 2^{x}$: como $(0{,}5)^{x} = \\dfrac{1}{2^{x}} = \\dfrac{1}{t}$ y $(0{,}5)^{-3} = 8$, todo se puede expresar en función de $t$.",
            "Rewrite the base-$0.5$ terms using $t = 2^{x}$: since $(0.5)^{x} = \\dfrac{1}{2^{x}} = \\dfrac{1}{t}$ and $(0.5)^{-3} = 8$, everything can be expressed in terms of $t$.",
          ),
          L(
            "Con $t = 2^{x}$ queda $t + \\dfrac{8}{t^{2}} - \\dfrac{6}{t} = 1$: multiplica por $t^{2} > 0$ y obtendrás una ecuación cúbica.",
            "With $t = 2^{x}$ you get $t + \\dfrac{8}{t^{2}} - \\dfrac{6}{t} = 1$: multiply by $t^{2} > 0$ and you will have a cubic equation.",
          ),
          L(
            "La cúbica tiene una raíz entera pequeña (búscala probando valores): factoriza por división sintética y resuelve el factor cuadrático; convierte cada raíz $t > 0$ con $x = \\log_{2} t$.",
            "The cubic has a small integer root (look for it by testing values): factor it by synthetic division and solve the quadratic factor; convert each root $t > 0$ using $x = \\log_{2} t$.",
          ),
        ],
        answerDisplay: L(
          "$A_{p(x)} = \\left\\{1,\\ \\log_{2}\\left(\\dfrac{\\sqrt{17} - 1}{2}\\right)\\right\\}$",
          "$A_{p(x)} = \\left\\{1,\\ \\log_{2}\\left(\\dfrac{\\sqrt{17} - 1}{2}\\right)\\right\\}$",
        ),
        solution: [
          step(
            "given",
            "$p(x):\\ 2^{x} + (0{,}5)^{2x-3} - 6(0{,}5)^{x} = 1$, $x \\in \\mathbb{R}$.",
            "$p(x):\\ 2^{x} + (0.5)^{2x-3} - 6(0.5)^{x} = 1$, $x \\in \\mathbb{R}$.",
          ),
          step(
            "approach",
            "Reducir todo a la base $2$ con la sustitución $t = 2^{x} > 0$: así $(0{,}5)^{x} = \\dfrac{1}{t}$ y $(0{,}5)^{2x-3} = (0{,}5)^{2x} \\cdot (0{,}5)^{-3} = \\dfrac{8}{t^{2}}$; luego resolver la cúbica resultante en $t$.",
            "Reduce everything to base $2$ with the substitution $t = 2^{x} > 0$: then $(0.5)^{x} = \\dfrac{1}{t}$ and $(0.5)^{2x-3} = (0.5)^{2x} \\cdot (0.5)^{-3} = \\dfrac{8}{t^{2}}$; next solve the resulting cubic in $t$.",
          ),
          step(
            "calculation",
            "$t + \\dfrac{8}{t^{2}} - \\dfrac{6}{t} = 1 \\;\\Longrightarrow\\; t^{3} - t^{2} - 6t + 8 = 0$ (multiplicando por $t^{2}$).<br>$t = 2$ es raíz: $8 - 4 - 12 + 8 = 0$. Factorando: $(t - 2)(t^{2} + t - 4) = 0 \\Rightarrow t = 2$ o $t = \\dfrac{-1 + \\sqrt{17}}{2} \\approx 1{,}562$ (la raíz negativa $\\dfrac{-1 - \\sqrt{17}}{2}$ se descarta).<br>Volviendo a $x$: $2^{x} = 2 \\Rightarrow x = 1$; $2^{x} = \\dfrac{\\sqrt{17} - 1}{2} \\Rightarrow x = \\log_{2}\\left(\\dfrac{\\sqrt{17} - 1}{2}\\right) \\approx 0{,}643$.",
            "$t + \\dfrac{8}{t^{2}} - \\dfrac{6}{t} = 1 \\;\\Longrightarrow\\; t^{3} - t^{2} - 6t + 8 = 0$ (multiplying by $t^{2}$).<br>$t = 2$ is a root: $8 - 4 - 12 + 8 = 0$. Factoring: $(t - 2)(t^{2} + t - 4) = 0 \\Rightarrow t = 2$ or $t = \\dfrac{-1 + \\sqrt{17}}{2} \\approx 1.562$ (the negative root $\\dfrac{-1 - \\sqrt{17}}{2}$ is rejected).<br>Back to $x$: $2^{x} = 2 \\Rightarrow x = 1$; $2^{x} = \\dfrac{\\sqrt{17} - 1}{2} \\Rightarrow x = \\log_{2}\\left(\\dfrac{\\sqrt{17} - 1}{2}\\right) \\approx 0.643$.",
          ),
          step(
            "result",
            "$A_{p(x)} = \\left\\{1,\\ \\log_{2}\\left(\\dfrac{\\sqrt{17} - 1}{2}\\right)\\right\\}$. Verificación: con $x = 1$: $2 + (0{,}5)^{-1} - 6\\,(0{,}5)^{1} = 2 + 2 - 3 = 1$ ✓; con $t \\approx 1{,}562$: $t + \\dfrac{8}{t^{2}} - \\dfrac{6}{t} \\approx 1{,}562 + 3{,}281 - 3{,}842 \\approx 1$ ✓.",
            "$A_{p(x)} = \\left\\{1,\\ \\log_{2}\\left(\\dfrac{\\sqrt{17} - 1}{2}\\right)\\right\\}$. Check: at $x = 1$: $2 + (0.5)^{-1} - 6\\,(0.5)^{1} = 2 + 2 - 3 = 1$ ✓; at $t \\approx 1.562$: $t + \\dfrac{8}{t^{2}} - \\dfrac{6}{t} \\approx 1.562 + 3.281 - 3.842 \\approx 1$ ✓.",
          ),
        ],
      };
    },
  ),
];
