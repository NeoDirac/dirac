/**
 * MATH · Trigonometric Functions
 *
 * Amplitude, period, phase shifts, inverse trig, identities and
 * simplification. Includes a function-graph diagram with a transformed
 * sine curve, multiple-choice and expression answer types.
 */

import { template, L, step, tok } from "@/lib/problem";
import type { ProblemTemplate, McOption } from "@/lib/types";

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));

/** LaTeX for the reduced fraction (n/d)·π, e.g. piFrac(2, 3) → "\frac{2\pi}{3}" */
const piFrac = (n: number, d: number): string => {
  const g = gcd(n, d) || 1;
  const nn = n / g;
  const dd = d / g;
  if (dd === 1) return nn === 1 ? "\\pi" : `${nn}\\pi`;
  if (nn === 1) return `\\frac{\\pi}{${dd}}`;
  return `\\frac{${nn}\\pi}{${dd}}`;
};

/** Plain-text expression for (n/d)·π accepted by the expression checker */
const piExpr = (n: number, d: number): string => {
  const g = gcd(n, d) || 1;
  const nn = n / g;
  const dd = d / g;
  if (dd === 1) return nn === 1 ? "pi" : `${nn}*pi`;
  return `${nn}*pi/${dd}`;
};

export const templates: ProblemTemplate[] = [
  /* ---------------------------------------------------------------- */
  /* Amplitude (easy)                                                  */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "trigfn-amp-01",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "amplitude",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 60,
      tags: ["amplitude", "sine", "cosine"],
      prerequisites: ["trig-foundations"],
    },
    (rng) => {
      const A = rng.pick([2, 3, 4, 5, 6]);
      const b = rng.pick([1, 2, 3]);
      const fn = rng.bool() ? "\\sin" : "\\cos";
      return {
        skill: L("Leer la amplitud", "Reading the amplitude"),
        statement: L(
          `La función $y = ${A}${fn}(${b === 1 ? "" : b}x)$ describe una oscilación. ¿Cuál es su **amplitud**?`,
          `The function $y = ${A}${fn}(${b === 1 ? "" : b}x)$ describes an oscillation. What is its **amplitude**?`,
        ),
        answer: { kind: "numeric", value: A },
        hints: [
          L(
            "La amplitud es la distancia desde la línea media hasta un punto máximo.",
            "The amplitude is the distance from the midline to a maximum point.",
          ),
          L(
            "En $y = A\\sin(bx)$ (o $A\\cos(bx)$), la amplitud es el valor absoluto del coeficiente que multiplica a la función.",
            "In $y = A\\sin(bx)$ (or $A\\cos(bx)$), the amplitude is the absolute value of the coefficient multiplying the function.",
          ),
          L(
            "El coeficiente buscado es el número que está justo delante del seno o del coseno.",
            "The coefficient you want is the number right in front of the sine or cosine.",
          ),
        ],
        answerDisplay: L(`Amplitud $= ${A}$`, `Amplitude $= ${A}$`),
        solution: [
          step(
            "given",
            `Función: $y = ${A}${fn}(${b === 1 ? "" : b}x)$`,
            `Function: $y = ${A}${fn}(${b === 1 ? "" : b}x)$`,
          ),
          step(
            "approach",
            "La amplitud es la mitad de la distancia entre el máximo y el mínimo, y coincide con el coeficiente de la función trigonométrica.",
            "The amplitude is half the distance between the maximum and the minimum, and it equals the coefficient of the trig function.",
          ),
          step(
            "calculation",
            `Máximo $= ${A}$, mínimo $= -${A}$<br>$A = \\frac{${A} - (-${A})}{2} = ${A}$`,
            `Maximum $= ${A}$, minimum $= -${A}$<br>$A = \\frac{${A} - (-${A})}{2} = ${A}$`,
          ),
          step("result", `La amplitud es $${A}$.`, `The amplitude is $${A}$.`),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Pythagorean identities (easy, expression)                         */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "trigfn-ident-01",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "identities",
      difficulty: "easy",
      questionType: "expression",
      estimatedTimeSec: 90,
      tags: ["identities", "pythagorean"],
      prerequisites: ["trig-foundations"],
    },
    (rng) => {
      const variant = rng.pick(["pyth", "oneMinusSin", "oneMinusCos"] as const);
      const isPyth = variant === "pyth";
      const target = variant === "oneMinusSin" ? "cos" : "sin";
      const q = isPyth
        ? "\\sin^2 x + \\cos^2 x"
        : variant === "oneMinusSin"
          ? "1 - \\sin^2 x"
          : "1 - \\cos^2 x";
      const accepted = isPyth ? ["1"] : [`${target}(x)^2`];
      const display = isPyth ? "$1$" : `$${target}^2 x$`;
      return {
        skill: L("Identidad pitagórica", "Pythagorean identity"),
        statement: L(
          `Simplifica al máximo: $${q}$ (si aparece una función, escríbela con paréntesis, por ejemplo cos(x)^2).`,
          `Simplify completely: $${q}$ (if a function appears, write it with parentheses, e.g. cos(x)^2).`,
        ),
        answer: { kind: "expression", accepted, variables: ["x"] },
        hints: [
          L(
            "Reconoce la identidad pitagórica escondida en la expresión.",
            "Recognize the Pythagorean identity hidden in the expression.",
          ),
          L(
            "En la circunferencia unitaria, $\\cos x$ y $\\sin x$ son las coordenadas de un punto y el radio mide $1$.",
            "On the unit circle, $\\cos x$ and $\\sin x$ are the coordinates of a point whose distance from the origin is $1$.",
          ),
          isPyth
            ? L(
                "Aplica el teorema de Pitágoras al punto de la circunferencia.",
                "Apply the Pythagorean theorem to the point on the circle.",
              )
            : L(
                `Despeja el cuadrado que falta de $\\sin^2 x + \\cos^2 x = 1$ y sustituye.`,
                `Solve the identity $\\sin^2 x + \\cos^2 x = 1$ for the missing square and substitute.`,
              ),
        ],
        answerDisplay: L(display, display),
        solution: isPyth
          ? [
              step("given", `$\\sin^2 x + \\cos^2 x$`, `$\\sin^2 x + \\cos^2 x$`),
              step(
                "approach",
                "Todo punto $(\\cos x, \\sin x)$ de la circunferencia unitaria cumple $x^2 + y^2 = 1$.",
                "Every point $(\\cos x, \\sin x)$ on the unit circle satisfies $x^2 + y^2 = 1$.",
              ),
              step(
                "calculation",
                "$(\\cos x)^2 + (\\sin x)^2 = 1^2$",
                "$(\\cos x)^2 + (\\sin x)^2 = 1^2$",
              ),
              step("result", `$\\sin^2 x + \\cos^2 x = 1$`, `$\\sin^2 x + \\cos^2 x = 1$`),
            ]
          : [
              step("given", `$${q}$`, `$${q}$`),
              step(
                "approach",
                `Usamos la identidad pitagórica despejando $${target}^2 x$.`,
                `Use the Pythagorean identity, solving for $${target}^2 x$.`,
              ),
              step(
                "calculation",
                variant === "oneMinusSin"
                  ? `$1 - \\sin^2 x = 1 - (1 - \\cos^2 x) = \\cos^2 x$`
                  : `$1 - \\cos^2 x = 1 - (1 - \\sin^2 x) = \\sin^2 x$`,
                variant === "oneMinusSin"
                  ? `$1 - \\sin^2 x = 1 - (1 - \\cos^2 x) = \\cos^2 x$`
                  : `$1 - \\cos^2 x = 1 - (1 - \\sin^2 x) = \\sin^2 x$`,
              ),
              step("result", `El resultado es $${target}^2 x$.`, `The result is $${target}^2 x$.`),
            ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Period (medium, MC)                                               */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "trigfn-period-01",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "period",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 90,
      tags: ["period", "frequency"],
      prerequisites: ["trig-foundations"],
    },
    (rng) => {
      const b = rng.pick([2, 3, 4, 6]);
      const fn = rng.bool() ? "\\sin" : "\\cos";
      const correct = piFrac(2, b);
      const options: McOption[] = [
        { id: "a", text: L(`$${correct}$`, `$${correct}$`), correct: true },
        { id: "b", text: L("$2\\pi$", "$2\\pi$"), correct: false },
        { id: "c", text: L(`$${piFrac(1, b)}$`, `$${piFrac(1, b)}$`), correct: false },
        { id: "d", text: L(`$${piFrac(2 * b, 1)}$`, `$${piFrac(2 * b, 1)}$`), correct: false },
      ];
      return {
        skill: L("Periodo de una sinusoide", "Period of a sinusoid"),
        statement: L(
          `¿Cuál es el **periodo** de $y = ${fn}(${b}x)$?`,
          `What is the **period** of $y = ${fn}(${b}x)$?`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El seno y el coseno básicos tienen periodo $2\\pi$.",
            "The basic sine and cosine have period $2\\pi$.",
          ),
          L(
            "Multiplicar la variable por $b$ comprime la gráfica $b$ veces: el periodo se **divide** entre $b$.",
            "Multiplying the input by $b$ compresses the graph by a factor of $b$: the period is **divided** by $b$.",
          ),
          L(
            `Calcula $\\frac{2\\pi}{${b}}$.`,
            `Compute $\\frac{2\\pi}{${b}}$.`,
          ),
        ],
        answerDisplay: L(`Periodo $= ${correct}$`, `Period $= ${correct}$`),
        solution: [
          step("given", `$y = ${fn}(${b}x)$`, `$y = ${fn}(${b}x)$`),
          step(
            "approach",
            "Para $y = \\sin(bx)$ o $y = \\cos(bx)$, el periodo es $T = \\frac{2\\pi}{b}$.",
            "For $y = \\sin(bx)$ or $y = \\cos(bx)$, the period is $T = \\frac{2\\pi}{b}$.",
          ),
          step(
            "calculation",
            `$T = \\frac{2\\pi}{${b}} = ${correct}$`,
            `$T = \\frac{2\\pi}{${b}} = ${correct}$`,
          ),
          step(
            "result",
            `El periodo es $${correct}$: la gráfica completa ${b} ciclos en cada intervalo de longitud $2\\pi$.`,
            `The period is $${correct}$: the graph completes ${b} cycles on every interval of length $2\\pi$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Transformations: read equation from graph (medium, MC + diagram)  */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "trigfn-trans-01",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "transformations",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["transformations", "graphs", "sine"],
      prerequisites: ["trig-foundations"],
    },
    (rng) => {
      const A = rng.pick([2, 3]);
      const k = rng.pick([-3, -2, 2, 3]);
      const kOp = k > 0 ? `+ ${k}` : `- ${Math.abs(k)}`;
      const kOpInv = k > 0 ? `- ${Math.abs(k)}` : `+ ${Math.abs(k)}`;
      const ySpan = A + Math.abs(k) + 1;
      const curve = k > 0 ? `${A}*sin(x) + ${k}` : `${A}*sin(x) - ${Math.abs(k)}`;
      const options: McOption[] = [
        {
          id: "a",
          text: L(`$y = ${A}\\sin(x) ${kOp}$`, `$y = ${A}\\sin(x) ${kOp}$`),
          correct: true,
        },
        {
          id: "b",
          text: L(`$y = ${A}\\cos(x) ${kOp}$`, `$y = ${A}\\cos(x) ${kOp}$`),
          correct: false,
        },
        {
          id: "c",
          text: L(`$y = ${A}\\sin(x) ${kOpInv}$`, `$y = ${A}\\sin(x) ${kOpInv}$`),
          correct: false,
        },
        {
          id: "d",
          text: L(`$y = -${A}\\sin(x) ${kOp}$`, `$y = -${A}\\sin(x) ${kOp}$`),
          correct: false,
        },
      ];
      return {
        skill: L("Leer una sinusoide transformada", "Reading a transformed sinusoid"),
        statement: L(
          "La gráfica muestra una sinusoide. ¿Qué ecuación la representa?",
          "The graph shows a sinusoid. Which equation represents it?",
        ),
        diagram: {
          kind: "function-graph",
          xMin: -7,
          xMax: 7,
          yMin: -ySpan,
          yMax: ySpan,
          curves: [{ fn: curve, color: "primary" }],
          points: [{ x: 0, y: k, label: `(0, ${k})` }],
          showGrid: true,
          xLabel: "x",
          yLabel: "y",
        },
        diagramLabel: L(
          `Gráfica de una sinusoide que pasa por el punto (0, ${k}).`,
          `Graph of a sinusoid passing through the point (0, ${k}).`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Localiza la línea media: el valor intermedio entre un máximo y un mínimo de la curva.",
            "Locate the midline: the value halfway between a maximum and a minimum of the curve.",
          ),
          L(
            `La curva pasa por $(0, ${k})$: ese es el valor en $x = 0$ y coincide con la línea media.`,
            `The curve passes through $(0, ${k})$: that is its value at $x = 0$ and matches the midline.`,
          ),
          L(
            "Mira qué hace la curva justo después de $x = 0$: si parte de la línea media y **sube**, es $+A\\sin(x)$; si empieza en un máximo, es $\\cos(x)$.",
            "Look at what the curve does just after $x = 0$: if it leaves the midline going **up**, it is $+A\\sin(x)$; if it starts at a maximum, it is $\\cos(x)$.",
          ),
        ],
        answerDisplay: L(`$y = ${A}\\sin(x) ${kOp}$`, `$y = ${A}\\sin(x) ${kOp}$`),
        solution: [
          step(
            "given",
            `La curva pasa por $(0, ${k})$, alcanza un máximo de $${A + k}$ y un mínimo de $${-A + k}$.`,
            `The curve passes through $(0, ${k})$, reaches a maximum of $${A + k}$ and a minimum of $${-A + k}$.`,
          ),
          step(
            "approach",
            "Para $y = A\\sin(x) + c$: la línea media es $y = c$, la amplitud es la distancia de la línea media a un extremo, y el valor en $x = 0$ distingue seno de coseno.",
            "For $y = A\\sin(x) + c$: the midline is $y = c$, the amplitude is the distance from the midline to an extreme, and the value at $x = 0$ tells sine from cosine.",
          ),
          step(
            "calculation",
            `Línea media: $y = \\frac{${A + k} + (${-A + k})}{2} = ${k}$ → término independiente $${k}$.<br>Amplitud: $\\frac{${A + k} - (${-A + k})}{2} = ${A}$ → coeficiente $${A}$.<br>En $x = 0$ la curva vale $${k}$ (línea media) y luego **sube**: es $+${A}\\sin(x)$.`,
            `Midline: $y = \\frac{${A + k} + (${-A + k})}{2} = ${k}$ → constant term $${k}$.<br>Amplitude: $\\frac{${A + k} - (${-A + k})}{2} = ${A}$ → coefficient $${A}$.<br>At $x = 0$ the curve equals $${k}$ (the midline) and then **rises**: it is $+${A}\\sin(x)$.`,
          ),
          step(
            "result",
            `$y = ${A}\\sin(x) ${kOp}$`,
            `$y = ${A}\\sin(x) ${kOp}$`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Phase shift of sin(x − c) (medium, expression)                    */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "trigfn-phase-01",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "phase-shift",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 120,
      tags: ["phase-shift", "transformations"],
      prerequisites: ["trig-foundations"],
    },
    (rng) => {
      const fr = rng.pick([
        { n: 1, d: 2 },
        { n: 1, d: 3 },
        { n: 1, d: 4 },
        { n: 1, d: 6 },
        { n: 2, d: 3 },
        { n: 3, d: 4 },
        { n: 1, d: 1 },
      ]);
      const fn = rng.bool() ? "\\sin" : "\\cos";
      const cLatex = piFrac(fr.n, fr.d);
      const accepted = piExpr(fr.n, fr.d);
      return {
        skill: L("Desfasamiento horizontal", "Horizontal phase shift"),
        statement: L(
          `La gráfica de $y = ${fn}\\left(x - ${cLatex}\\right)$ se obtiene desplazando la gráfica básica. ¿Cuál es el **desfasamiento** (corrimiento horizontal)? Escribe el valor exacto como múltiplo de $\\pi$ (por ejemplo pi/5).`,
          `The graph of $y = ${fn}\\left(x - ${cLatex}\\right)$ is obtained by shifting the basic graph. What is the **phase shift** (horizontal shift)? Write the exact value as a multiple of $\\pi$ (e.g. pi/5).`,
        ),
        answer: { kind: "expression", accepted: [accepted], variables: [] },
        hints: [
          L(
            "Compara con la forma general $y = f(x - h)$.",
            "Compare with the general form $y = f(x - h)$.",
          ),
          L(
            "En $y = f(x - h)$, el gráfico se desplaza $h$ unidades a la **derecha** (si $h > 0$).",
            "In $y = f(x - h)$, the graph shifts $h$ units to the **right** (when $h > 0$).",
          ),
          L(
            "El desfasamiento es el número que se **resta** a $x$ dentro del paréntesis.",
            "The phase shift is the number **subtracted** from $x$ inside the parentheses.",
          ),
        ],
        answerDisplay: L(`$h = ${cLatex}$ a la derecha`, `$h = ${cLatex}$ to the right`),
        solution: [
          step(
            "given",
            `$y = ${fn}\\left(x - ${cLatex}\\right)$`,
            `$y = ${fn}\\left(x - ${cLatex}\\right)$`,
          ),
          step(
            "approach",
            "Escribimos la función como $y = f(x - h)$ y leemos $h$.",
            "Write the function as $y = f(x - h)$ and read off $h$.",
          ),
          step(
            "calculation",
            `$y = ${fn}(x - h)$ con $h = ${cLatex}$`,
            `$y = ${fn}(x - h)$ with $h = ${cLatex}$`,
          ),
          step(
            "result",
            `El desfasamiento es $${cLatex}$ hacia la derecha.`,
            `The phase shift is $${cLatex}$ to the right.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Inverse trig values (medium, numeric)                             */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "trigfn-inverse-01",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "inverse-trig",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 90,
      tags: ["inverse-trig", "special-angles"],
      prerequisites: ["trig-foundations"],
    },
    (rng) => {
      const cfg = rng.pick([
        { fn: "arcsin", arg: "\\frac{1}{2}", deg: 30, check: "\\sin 30^\\circ = \\frac{1}{2}" },
        {
          fn: "arcsin",
          arg: "\\frac{\\sqrt{2}}{2}",
          deg: 45,
          check: "\\sin 45^\\circ = \\frac{\\sqrt{2}}{2}",
        },
        {
          fn: "arcsin",
          arg: "\\frac{\\sqrt{3}}{2}",
          deg: 60,
          check: "\\sin 60^\\circ = \\frac{\\sqrt{3}}{2}",
        },
        { fn: "arccos", arg: "\\frac{1}{2}", deg: 60, check: "\\cos 60^\\circ = \\frac{1}{2}" },
        {
          fn: "arccos",
          arg: "\\frac{\\sqrt{2}}{2}",
          deg: 45,
          check: "\\cos 45^\\circ = \\frac{\\sqrt{2}}{2}",
        },
        {
          fn: "arccos",
          arg: "\\frac{\\sqrt{3}}{2}",
          deg: 30,
          check: "\\cos 30^\\circ = \\frac{\\sqrt{3}}{2}",
        },
        {
          fn: "arctan",
          arg: "\\frac{\\sqrt{3}}{3}",
          deg: 30,
          check: "\\tan 30^\\circ = \\frac{\\sqrt{3}}{3}",
        },
        { fn: "arctan", arg: "1", deg: 45, check: "\\tan 45^\\circ = 1" },
        { fn: "arctan", arg: "\\sqrt{3}", deg: 60, check: "\\tan 60^\\circ = \\sqrt{3}" },
      ]);
      const isCos = cfg.fn === "arccos";
      const range = isCos
        ? "$[0^\\circ, 180^\\circ]$"
        : "$[-90^\\circ, 90^\\circ]$";
      return {
        skill: L("Valores de las inversas", "Values of the inverse functions"),
        statement: L(
          `Calcula (el resultado está en grados): $\\${cfg.fn}\\left(${cfg.arg}\\right)$`,
          `Evaluate (the result is in degrees): $\\${cfg.fn}\\left(${cfg.arg}\\right)$`,
        ),
        answer: { kind: "numeric", value: cfg.deg, unitSuffix: "°" },
        hints: [
          L(
            "La función inversa devuelve un **ángulo**, no una razón.",
            "The inverse function returns an **angle**, not a ratio.",
          ),
          L(
            `El resultado debe estar en el rango principal: ${range}.`,
            `The result must lie in the principal range: ${range}.`,
          ),
          L(
            "Busca el ángulo notable cuyo seno, coseno o tangente es el valor dado.",
            "Find the special angle whose sine, cosine or tangent equals the given value.",
          ),
        ],
        answerDisplay: L(
          `$\\${cfg.fn}\\left(${cfg.arg}\\right) = ${cfg.deg}^\\circ$`,
          `$\\${cfg.fn}\\left(${cfg.arg}\\right) = ${cfg.deg}^\\circ$`,
        ),
        solution: [
          step(
            "given",
            `$\\${cfg.fn}\\left(${cfg.arg}\\right)$, resultado en grados`,
            `$\\${cfg.fn}\\left(${cfg.arg}\\right)$, result in degrees`,
          ),
          step(
            "approach",
            `Si $\\${cfg.fn}(v) = \\theta$, entonces la función trigonométrica de $\\theta$ vale $v$, con $\\theta$ en ${range}.`,
            `If $\\${cfg.fn}(v) = \\theta$, then the trig function of $\\theta$ equals $v$, with $\\theta$ in ${range}.`,
          ),
          step(
            "calculation",
            `$${cfg.check}$ y $${cfg.deg}^\\circ$ está en el rango principal.`,
            `$${cfg.check}$ and $${cfg.deg}^\\circ$ lies in the principal range.`,
          ),
          step(
            "result",
            `$\\${cfg.fn}\\left(${cfg.arg}\\right) = ${cfg.deg}^\\circ$.`,
            `$\\${cfg.fn}\\left(${cfg.arg}\\right) = ${cfg.deg}^\\circ$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Quotient identity simplifications (medium, expression)            */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "trigfn-ident-02",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "simplification",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 120,
      tags: ["identities", "quotient", "simplification"],
      prerequisites: ["trig-foundations"],
    },
    (rng) => {
      const variant = rng.pick(["numPyth", "cosTan", "sinDivTan"] as const);
      if (variant === "numPyth") {
        const useSin = rng.bool();
        const target = useSin ? "cos" : "sin";
        const other = useSin ? "sin" : "cos";
        return {
          skill: L("Simplificar con identidades", "Simplifying with identities"),
          statement: L(
            `Simplifica: $\\frac{1 - ${other}^2 x}{${target} x}$ (escribe por ejemplo cos(x)).`,
            `Simplify: $\\frac{1 - ${other}^2 x}{${target} x}$ (write e.g. cos(x)).`,
          ),
          answer: { kind: "expression", accepted: [`${target}(x)`], variables: ["x"] },
          hints: [
            L(
              "El numerador es un pedazo de la identidad pitagórica.",
              "The numerator is a piece of the Pythagorean identity.",
            ),
            L(
              `$1 - ${other}^2 x = ${target}^2 x$.`,
              `$1 - ${other}^2 x = ${target}^2 x$.`,
            ),
            L(
              "Simplifica el factor común del numerador con el denominador.",
              "Cancel the common factor between numerator and denominator.",
            ),
          ],
          answerDisplay: L(`$${target} x$`, `$${target} x$`),
          solution: [
            step(
              "given",
              `$\\frac{1 - ${other}^2 x}{${target} x}$`,
              `$\\frac{1 - ${other}^2 x}{${target} x}$`,
            ),
            step(
              "approach",
              "Sustituimos el numerador usando la identidad pitagórica y simplificamos.",
              "Replace the numerator using the Pythagorean identity and simplify.",
            ),
            step(
              "calculation",
              `$\\frac{1 - ${other}^2 x}{${target} x} = \\frac{${target}^2 x}{${target} x} = ${target} x$`,
              `$\\frac{1 - ${other}^2 x}{${target} x} = \\frac{${target}^2 x}{${target} x} = ${target} x$`,
            ),
            step("result", `El resultado es $${target} x$.`, `The result is $${target} x$.`),
          ],
        };
      }
      if (variant === "cosTan") {
        return {
          skill: L("Simplificar con identidades", "Simplifying with identities"),
          statement: L(
            "Simplifica: $\\cos x \\cdot \\tan x$ (escribe por ejemplo cos(x)).",
            "Simplify: $\\cos x \\cdot \\tan x$ (write e.g. cos(x)).",
          ),
          answer: { kind: "expression", accepted: ["sin(x)"], variables: ["x"] },
          hints: [
            L(
              "Escribe la tangente en términos de seno y coseno.",
              "Write the tangent in terms of sine and cosine.",
            ),
            L(
              "$\\tan x = \\frac{\\sin x}{\\cos x}$.",
              "$\\tan x = \\frac{\\sin x}{\\cos x}$.",
            ),
            L(
              "Multiplica y simplifica el coseno del denominador.",
              "Multiply and cancel the cosine in the denominator.",
            ),
          ],
          answerDisplay: L("$\\sin x$", "$\\sin x$"),
          solution: [
            step("given", "$\\cos x \\cdot \\tan x$", "$\\cos x \\cdot \\tan x$"),
            step(
              "approach",
              "Usamos la identidad del cociente $\\tan x = \\frac{\\sin x}{\\cos x}$.",
              "Use the quotient identity $\\tan x = \\frac{\\sin x}{\\cos x}$.",
            ),
            step(
              "calculation",
              "$\\cos x \\cdot \\tan x = \\cos x \\cdot \\frac{\\sin x}{\\cos x} = \\sin x$",
              "$\\cos x \\cdot \\tan x = \\cos x \\cdot \\frac{\\sin x}{\\cos x} = \\sin x$",
            ),
            step("result", "El resultado es $\\sin x$.", "The result is $\\sin x$."),
          ],
        };
      }
      return {
        skill: L("Simplificar con identidades", "Simplifying with identities"),
        statement: L(
          "Simplifica: $\\frac{\\sin x}{\\tan x}$ (escribe por ejemplo cos(x)).",
          "Simplify: $\\frac{\\sin x}{\\tan x}$ (write e.g. cos(x)).",
        ),
        answer: { kind: "expression", accepted: ["cos(x)"], variables: ["x"] },
        hints: [
          L(
            "Escribe la tangente en términos de seno y coseno.",
            "Write the tangent in terms of sine and cosine.",
          ),
          L(
            "Al dividir por $\\tan x$ estás dividiendo por $\\frac{\\sin x}{\\cos x}$.",
            "Dividing by $\\tan x$ means dividing by $\\frac{\\sin x}{\\cos x}$.",
          ),
          L(
            "Recuerda que dividir entre una fracción es multiplicar por su inversa.",
            "Recall that dividing by a fraction means multiplying by its reciprocal.",
          ),
        ],
        answerDisplay: L("$\\cos x$", "$\\cos x$"),
        solution: [
          step("given", "$\\frac{\\sin x}{\\tan x}$", "$\\frac{\\sin x}{\\tan x}$"),
          step(
            "approach",
            "Sustituimos $\\tan x = \\frac{\\sin x}{\\cos x}$ y multiplicamos por la inversa.",
            "Substitute $\\tan x = \\frac{\\sin x}{\\cos x}$ and multiply by the reciprocal.",
          ),
          step(
            "calculation",
            "$\\frac{\\sin x}{\\tan x} = \\sin x \\cdot \\frac{\\cos x}{\\sin x} = \\cos x$",
            "$\\frac{\\sin x}{\\tan x} = \\sin x \\cdot \\frac{\\cos x}{\\sin x} = \\cos x$",
          ),
          step("result", "El resultado es $\\cos x$.", "The result is $\\cos x$."),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Phase shift with B(x − h) factoring (hard, expression)            */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "trigfn-phase-02",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "phase-shift",
      difficulty: "hard",
      questionType: "expression",
      estimatedTimeSec: 180,
      tags: ["phase-shift", "factoring", "transformations"],
      prerequisites: ["trig-foundations"],
    },
    (rng) => {
      const A = rng.pick([2, 3, 4]);
      const B = rng.pick([2, 3]);
      const fr = rng.pick([
        { n: 1, d: 2 },
        { n: 1, d: 3 },
        { n: 2, d: 3 },
        { n: 1, d: 4 },
        { n: 1, d: 6 },
        { n: 1, d: 1 },
      ]);
      const cLatex = piFrac(B * fr.n, fr.d);
      const hLatex = piFrac(fr.n, fr.d);
      const accepted = piExpr(fr.n, fr.d);
      return {
        skill: L("Factorar para hallar el desfasamiento", "Factoring out the phase shift"),
        statement: L(
          `La función $y = ${A}\\sin\\left(${B}x - ${cLatex}\\right)$ puede escribirse como $y = ${A}\\sin\\left(${B}(x - h)\\right)$. ¿Cuál es $h$? Escribe el valor exacto con $\\pi$ (por ejemplo pi/5).`,
          `The function $y = ${A}\\sin\\left(${B}x - ${cLatex}\\right)$ can be written as $y = ${A}\\sin\\left(${B}(x - h)\\right)$. What is $h$? Write the exact value with $\\pi$ (e.g. pi/5).`,
        ),
        answer: { kind: "expression", accepted: [accepted], variables: [] },
        hints: [
          L(
            "El desfasamiento está «escondido» porque $B$ también multiplica a $x$.",
            "The phase shift is “hidden” because $B$ also multiplies $x$.",
          ),
          L(
            `Factora $${B}$ en el argumento: $${B}x - ${cLatex} = ${B}\\left(x - \\frac{${cLatex}}{${B}}\\right)$.`,
            `Factor out $${B}$ from the argument: $${B}x - ${cLatex} = ${B}\\left(x - \\frac{${cLatex}}{${B}}\\right)$.`,
          ),
          L(
            "El desfasamiento es lo que queda restando dentro del paréntesis: $h = \\frac{C}{B}$.",
            "The phase shift is what remains subtracted inside the parentheses: $h = \\frac{C}{B}$.",
          ),
        ],
        answerDisplay: L(`$h = ${hLatex}$`, `$h = ${hLatex}$`),
        solution: [
          step(
            "given",
            `$y = ${A}\\sin\\left(${B}x - ${cLatex}\\right)$`,
            `$y = ${A}\\sin\\left(${B}x - ${cLatex}\\right)$`,
          ),
          step(
            "approach",
            "Factoramos $B$ en el argumento para dejarlo como $B(x - h)$.",
            "Factor $B$ out of the argument to write it as $B(x - h)$.",
          ),
          step(
            "calculation",
            `$${B}x - ${cLatex} = ${B}\\left(x - ${hLatex}\\right)$<br>Por tanto $h = ${hLatex}$.`,
            `$${B}x - ${cLatex} = ${B}\\left(x - ${hLatex}\\right)$<br>Therefore $h = ${hLatex}$.`,
          ),
          step(
            "result",
            `$h = ${hLatex}$: la gráfica se desplaza $${hLatex}$ a la derecha.`,
            `$h = ${hLatex}$: the graph shifts $${hLatex}$ to the right.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Compositions sin(arccos x) with triples (hard, numeric)           */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "trigfn-inverse-02",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "inverse-trig",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 210,
      tags: ["inverse-trig", "pythagorean-triples"],
      prerequisites: ["trig-foundations"],
    },
    (rng) => {
      const t = rng.pick([
        { a: 3, b: 4, c: 5 },
        { a: 5, b: 12, c: 13 },
        { a: 8, b: 15, c: 17 },
        { a: 7, b: 24, c: 25 },
      ]);
      const kind = rng.pick(["sinArccos", "cosArcsin", "sinArctan"] as const);
      let value: number;
      let q: string;
      let work: string;
      if (kind === "sinArccos") {
        value = t.b / t.c;
        q = `\\sin\\left(\\arccos\\frac{${t.a}}{${t.c}}\\right)`;
        work = `Sea $\\theta = \\arccos\\frac{${t.a}}{${t.c}}$. Entonces $\\cos\\theta = \\frac{${t.a}}{${t.c}}$: cateto adyacente $${t.a}$, hipotenusa $${t.c}$.<br>El cateto opuesto mide $\\sqrt{${t.c}^2 - ${t.a}^2} = ${t.b}$.<br>$\\sin\\theta = \\frac{${t.b}}{${t.c}}$`;
      } else if (kind === "cosArcsin") {
        value = t.b / t.c;
        q = `\\cos\\left(\\arcsin\\frac{${t.a}}{${t.c}}\\right)`;
        work = `Sea $\\theta = \\arcsin\\frac{${t.a}}{${t.c}}$. Entonces $\\sin\\theta = \\frac{${t.a}}{${t.c}}$: cateto opuesto $${t.a}$, hipotenusa $${t.c}$.<br>El cateto adyacente mide $\\sqrt{${t.c}^2 - ${t.a}^2} = ${t.b}$.<br>$\\cos\\theta = \\frac{${t.b}}{${t.c}}$`;
      } else {
        value = t.a / t.c;
        q = `\\sin\\left(\\arctan\\frac{${t.a}}{${t.b}}\\right)`;
        work = `Sea $\\theta = \\arctan\\frac{${t.a}}{${t.b}}$. Entonces $\\tan\\theta = \\frac{${t.a}}{${t.b}}$: cateto opuesto $${t.a}$, cateto adyacente $${t.b}$.<br>La hipotenusa mide $\\sqrt{${t.a}^2 + ${t.b}^2} = ${t.c}$.<br>$\\sin\\theta = \\frac{${t.a}}{${t.c}}$`;
      }
      const num = Math.round(value * 1000) / 1000;
      return {
        skill: L("Composiciones con inversas", "Compositions with inverse functions"),
        statement: L(
          `Calcula $${q}$. (Puedes escribir el resultado como fracción, por ejemplo 4/5, o como decimal.)`,
          `Evaluate $${q}$. (You may write the result as a fraction, e.g. 4/5, or as a decimal.)`,
        ),
        answer: {
          kind: "numeric",
          value,
          tolerance: { mode: "relative", value: 0.005 },
        },
        hints: [
          L(
            "No calcules el ángulo: da nombre al ángulo interior, por ejemplo $\\theta$.",
            "Don't compute the angle: give the inner angle a name, say $\\theta$.",
          ),
          L(
            "$\\theta$ es un ángulo de un triángulo rectángulo: identifica los dos lados que conoces.",
            "$\\theta$ is an angle of a right triangle: identify the two sides you know.",
          ),
          L(
            "Hallar el tercer lado con el teorema de Pitágoras (son números enteros) y luego la razón pedida.",
            "Find the third side with the Pythagorean theorem (they are whole numbers), then the requested ratio.",
          ),
        ],
        answerDisplay: L(
          `$${q} = ${tok(num)}$`,
          `$${q} = ${tok(num)}$`,
        ),
        solution: [
          step("given", `$${q}$`, `$${q}$`),
          step(
            "approach",
            "Interpretamos la inversa como un ángulo de un triángulo rectángulo y usamos el teorema de Pitágoras.",
            "Interpret the inverse value as an angle of a right triangle and use the Pythagorean theorem.",
          ),
          step("calculation", work, work),
          step(
            "result",
            `$${q} \\approx ${tok(num)}$.`,
            `$${q} \\approx ${tok(num)}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Hard simplification with identities (hard, expression)            */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "trigfn-simpl-01",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "simplification",
      difficulty: "hard",
      questionType: "expression",
      estimatedTimeSec: 210,
      tags: ["identities", "simplification", "factoring"],
      prerequisites: ["trig-foundations"],
    },
    (rng) => {
      const variant = rng.pick(["conj", "diffSq", "tanProd"] as const);
      if (variant === "conj") {
        return {
          skill: L("Simplificación avanzada", "Advanced simplification"),
          statement: L(
            "Simplifica: $\\frac{\\sin^2 x}{1 + \\cos x}$ (escribe por ejemplo 1 - cos(x)).",
            "Simplify: $\\frac{\\sin^2 x}{1 + \\cos x}$ (write e.g. 1 - cos(x)).",
          ),
          answer: { kind: "expression", accepted: ["1 - cos(x)"], variables: ["x"] },
          hints: [
            L(
              "El denominador $1 + \\cos x$ sugiere una diferencia de cuadrados.",
              "The denominator $1 + \\cos x$ suggests a difference of squares.",
            ),
            L(
              "Escribe $\\sin^2 x = 1 - \\cos^2 x = (1 - \\cos x)(1 + \\cos x)$.",
              "Write $\\sin^2 x = 1 - \\cos^2 x = (1 - \\cos x)(1 + \\cos x)$.",
            ),
            L(
              "Simplifica el factor $(1 + \\cos x)$ común.",
              "Cancel the common factor $(1 + \\cos x)$.",
            ),
          ],
          answerDisplay: L("$1 - \\cos x$", "$1 - \\cos x$"),
          solution: [
            step("given", "$\\frac{\\sin^2 x}{1 + \\cos x}$", "$\\frac{\\sin^2 x}{1 + \\cos x}$"),
            step(
              "approach",
              "Usamos la identidad pitagórica y factorizamos el numerador.",
              "Use the Pythagorean identity and factor the numerator.",
            ),
            step(
              "calculation",
              "$\\frac{\\sin^2 x}{1 + \\cos x} = \\frac{1 - \\cos^2 x}{1 + \\cos x} = \\frac{(1 - \\cos x)(1 + \\cos x)}{1 + \\cos x} = 1 - \\cos x$",
              "$\\frac{\\sin^2 x}{1 + \\cos x} = \\frac{1 - \\cos^2 x}{1 + \\cos x} = \\frac{(1 - \\cos x)(1 + \\cos x)}{1 + \\cos x} = 1 - \\cos x$",
            ),
            step("result", "El resultado es $1 - \\cos x$.", "The result is $1 - \\cos x$."),
          ],
        };
      }
      if (variant === "diffSq") {
        return {
          skill: L("Simplificación avanzada", "Advanced simplification"),
          statement: L(
            "Simplifica: $\\frac{\\cos^2 x - \\sin^2 x}{\\cos x - \\sin x}$ (escribe por ejemplo cos(x) + sin(x)).",
            "Simplify: $\\frac{\\cos^2 x - \\sin^2 x}{\\cos x - \\sin x}$ (write e.g. cos(x) + sin(x)).",
          ),
          answer: { kind: "expression", accepted: ["cos(x) + sin(x)"], variables: ["x"] },
          hints: [
            L(
              "El numerador es una diferencia de cuadrados.",
              "The numerator is a difference of squares.",
            ),
            L(
              "$\\cos^2 x - \\sin^2 x = (\\cos x - \\sin x)(\\cos x + \\sin x)$.",
              "$\\cos^2 x - \\sin^2 x = (\\cos x - \\sin x)(\\cos x + \\sin x)$.",
            ),
            L(
              "Simplifica el factor común $(\\cos x - \\sin x)$.",
              "Cancel the common factor $(\\cos x - \\sin x)$.",
            ),
          ],
          answerDisplay: L("$\\cos x + \\sin x$", "$\\cos x + \\sin x$"),
          solution: [
            step(
              "given",
              "$\\frac{\\cos^2 x - \\sin^2 x}{\\cos x - \\sin x}$",
              "$\\frac{\\cos^2 x - \\sin^2 x}{\\cos x - \\sin x}$",
            ),
            step(
              "approach",
              "Factorizamos el numerador como diferencia de cuadrados.",
              "Factor the numerator as a difference of squares.",
            ),
            step(
              "calculation",
              "$\\frac{\\cos^2 x - \\sin^2 x}{\\cos x - \\sin x} = \\frac{(\\cos x - \\sin x)(\\cos x + \\sin x)}{\\cos x - \\sin x} = \\cos x + \\sin x$",
              "$\\frac{\\cos^2 x - \\sin^2 x}{\\cos x - \\sin x} = \\frac{(\\cos x - \\sin x)(\\cos x + \\sin x)}{\\cos x - \\sin x} = \\cos x + \\sin x$",
            ),
            step(
              "result",
              "El resultado es $\\cos x + \\sin x$.",
              "The result is $\\cos x + \\sin x$.",
            ),
          ],
        };
      }
      return {
        skill: L("Simplificación avanzada", "Advanced simplification"),
        statement: L(
          "Simplifica: $\\sin x \\cdot \\cos x \\cdot \\tan x$ (escribe por ejemplo sin(x)^2).",
          "Simplify: $\\sin x \\cdot \\cos x \\cdot \\tan x$ (write e.g. sin(x)^2).",
        ),
        answer: { kind: "expression", accepted: ["sin(x)^2"], variables: ["x"] },
        hints: [
          L(
            "Sustituye la tangente por su definición.",
            "Replace the tangent with its definition.",
          ),
          L(
            "$\\tan x = \\frac{\\sin x}{\\cos x}$.",
            "$\\tan x = \\frac{\\sin x}{\\cos x}$.",
          ),
          L(
            "Multiplica y simplifica el factor $\\cos x$.",
            "Multiply and cancel the $\\cos x$ factor.",
          ),
        ],
        answerDisplay: L("$\\sin^2 x$", "$\\sin^2 x$"),
        solution: [
          step("given", "$\\sin x \\cdot \\cos x \\cdot \\tan x$", "$\\sin x \\cdot \\cos x \\cdot \\tan x$"),
          step(
            "approach",
            "Usamos la identidad del cociente y simplificamos.",
            "Use the quotient identity and simplify.",
          ),
          step(
            "calculation",
            "$\\sin x \\cdot \\cos x \\cdot \\tan x = \\sin x \\cdot \\cos x \\cdot \\frac{\\sin x}{\\cos x} = \\sin^2 x$",
            "$\\sin x \\cdot \\cos x \\cdot \\tan x = \\sin x \\cdot \\cos x \\cdot \\frac{\\sin x}{\\cos x} = \\sin^2 x$",
          ),
          step("result", "El resultado es $\\sin^2 x$.", "The result is $\\sin^2 x$."),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Range of a transformed sinusoid (hard, MC)                        */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "trigfn-range-01",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "transformations",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 180,
      tags: ["range", "transformations"],
      prerequisites: ["trig-foundations"],
    },
    (rng) => {
      const A = rng.pick([3, 4, 5]);
      const k = rng.pick([1, 2, 3]);
      const s = rng.sign();
      const mid = s * k;
      const fn = rng.bool() ? "\\sin" : "\\cos";
      const midOp = mid > 0 ? `+ ${mid}` : `- ${Math.abs(mid)}`;
      const min = mid - A;
      const max = mid + A;
      const interval = (lo: number, hi: number) => `$[${lo},\\ ${hi}]$`;
      const options: McOption[] = [
        { id: "a", text: L(interval(min, max), interval(min, max)), correct: true },
        { id: "b", text: L(interval(-A - k, A + k), interval(-A - k, A + k)), correct: false },
        { id: "c", text: L(interval(-A, A), interval(-A, A)), correct: false },
        { id: "d", text: L(interval(mid, mid + A), interval(mid, mid + A)), correct: false },
      ];
      return {
        skill: L("Rango de una sinusoide", "Range of a sinusoid"),
        statement: L(
          `¿Cuál es el **rango** (recorrido) de la función $y = ${A}${fn}(x) ${midOp}$?`,
          `What is the **range** of the function $y = ${A}${fn}(x) ${midOp}$?`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El seno y el coseno básicos solo toman valores entre $-1$ y $1$.",
            "The basic sine and cosine only take values between $-1$ and $1$.",
          ),
          L(
            `Multiplicar por $${A}$ lleva el intervalo $[-1, 1]$ a $[-${A}, ${A}]$.`,
            `Multiplying by $${A}$ takes $[-1, 1]$ to $[-${A}, ${A}]$.`,
          ),
          L(
            `Al final se suma ${midOp}: ese corrimiento vertical desplaza todo el intervalo.`,
            `Finally ${midOp} is added: that vertical shift moves the whole interval.`,
          ),
        ],
        answerDisplay: L(`$[${min}, ${max}]$`, `$[${min}, ${max}]$`),
        solution: [
          step(
            "given",
            `$y = ${A}${fn}(x) ${midOp}$`,
            `$y = ${A}${fn}(x) ${midOp}$`,
          ),
          step(
            "approach",
            "Partimos de $-1 \\le \\sin(x) \\le 1$, multiplicamos por la amplitud y sumamos el corrimiento vertical.",
            "Start from $-1 \\le \\sin(x) \\le 1$, multiply by the amplitude and add the vertical shift.",
          ),
          step(
            "calculation",
            `$-${A} \\le ${A}${fn}(x) \\le ${A}$<br>Sumando ${midOp}: $${min} \\le y \\le ${max}$`,
            `$-${A} \\le ${A}${fn}(x) \\le ${A}$<br>Adding ${midOp}: $${min} \\le y \\le ${max}$`,
          ),
          step(
            "result",
            `El rango es $[${min}, ${max}]$.`,
            `The range is $[${min}, ${max}]$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Challenge: tide model                                             */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "trigfn-chal-01",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "transformations",
      difficulty: "challenge",
      questionType: "numeric",
      estimatedTimeSec: 300,
      tags: ["modeling", "midline", "word-problems"],
      prerequisites: ["trig-foundations"],
    },
    (rng) => {
      const cfg = rng.pick([
        { M: 7, m: 1 },
        { M: 9, m: 1 },
        { M: 10, m: 2 },
        { M: 11, m: 3 },
        { M: 8, m: 2 },
        { M: 12, m: 4 },
      ]);
      const mid = (cfg.M + cfg.m) / 2;
      const amp = (cfg.M - cfg.m) / 2;
      return {
        skill: L("Interpretar un modelo de marea", "Interpreting a tide model"),
        statement: L(
          `El nivel del agua de un puerto sube y baja con la marea. Hoy el **máximo** se alcanza a las 6:00 y mide $${cfg.M}\\ \\text{m}$; el **mínimo** se alcanza a las 12:00 y mide $${cfg.m}\\ \\text{m}$. El nivel se modela con una sinusoide $h(t) = A\\sin(bt) + k$. ¿Qué nivel tendrá el agua a las **15:00**?`,
          `The water level of a harbour rises and falls with the tide. Today the **maximum** occurs at 6:00 and reads $${cfg.M}\\ \\text{m}$; the **minimum** occurs at 12:00 and reads $${cfg.m}\\ \\text{m}$. The level is modeled by a sinusoid $h(t) = A\\sin(bt) + k$. What will the water level be at **15:00**?`,
        ),
        answer: { kind: "numeric", value: mid, unitSuffix: "m" },
        hints: [
          L(
            "Del máximo al mínimo pasa **medio periodo**: primero determina el periodo y la línea media.",
            "From a maximum to a minimum takes **half a period**: first find the period and the midline.",
          ),
          L(
            "La línea media es el valor intermedio entre el máximo y el mínimo: $k = \\frac{\\text{máx} + \\text{mín}}{2}$.",
            "The midline is the value halfway between the maximum and the minimum: $k = \\frac{\\max + \\min}{2}$.",
          ),
          L(
            "15:00 está exactamente entre el mínimo (12:00) y el siguiente máximo (18:00): ahí la sinusoide cruza la línea media.",
            "15:00 lies exactly halfway between the minimum (12:00) and the next maximum (18:00): there the sinusoid crosses the midline.",
          ),
        ],
        answerDisplay: L(`A las 15:00, $h = ${mid}\\ \\text{m}$`, `At 15:00, $h = ${mid}\\ \\text{m}$`),
        solution: [
          step(
            "given",
            `Máximo: $${cfg.M}\\ \\text{m}$ a las 6:00. Mínimo: $${cfg.m}\\ \\text{m}$ a las 12:00.`,
            `Maximum: $${cfg.M}\\ \\text{m}$ at 6:00. Minimum: $${cfg.m}\\ \\text{m}$ at 12:00.`,
          ),
          step(
            "approach",
            "De máximo a mínimo hay medio periodo (6 horas), así que el periodo es 12 h. Entre un mínimo y el siguiente máximo la sinusoide pasa por la línea media; a las 15:00 estamos justo en ese punto medio.",
            "From a maximum to a minimum is half a period (6 hours), so the period is 12 h. Between a minimum and the next maximum the sinusoid passes through the midline; at 15:00 we are exactly at that halfway point.",
          ),
          step(
            "calculation",
            `$k = \\frac{${cfg.M} + ${cfg.m}}{2} = ${mid}$<br>$A = \\frac{${cfg.M} - ${cfg.m}}{2} = ${amp}$<br>$h(\\text{15:00}) = k = ${mid}\\ \\text{m}$`,
            `$k = \\frac{${cfg.M} + ${cfg.m}}{2} = ${mid}$<br>$A = \\frac{${cfg.M} - ${cfg.m}}{2} = ${amp}$<br>$h(\\text{15:00}) = k = ${mid}\\ \\text{m}$`,
          ),
          step(
            "result",
            `A las 15:00 el nivel del agua es $${mid}\\ \\text{m}$ (la línea media del modelo).`,
            `At 15:00 the water level is $${mid}\\ \\text{m}$ (the midline of the model).`,
          ),
        ],
      };
    },
  ),
  /* ================================================================== */
  /* Curated — Fundamentos ESPOL, §5.6 ejercicio 58 (presión arterial), */
  /* p. 670. Verified with sympy (period 6/5 s; P=100 at t=0.3, 0.9).   */
  /* ================================================================== */

  /* 58a — period of the blood-pressure model */
  template(
    {
      id: "trigfn-espol-58a",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "period",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 180,
      tags: ["modeling", "period", "health"],
      prerequisites: ["trig-functions"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5.6 · 58a",
        page: 670,
      },
      reasoning: "modeling",
    },
    () => ({
      skill: L("Periodo de un modelo real", "Period of a real-world model"),
      statement: L(
        `En reposo, la presión arterial de una persona (en milímetros de mercurio, en cualquier segundo $t \\geq 0$) puede aproximarse por $$P(t) = -20\\cos\\!\\left(\\frac{5\\pi}{3}t\\right) + 100.$$ ¿Cuál es el **periodo fundamental** de $P$, en segundos?`,
        `At rest, a person's blood pressure (in millimeters of mercury, at any second $t \\geq 0$) can be approximated by $$P(t) = -20\\cos\\!\\left(\\frac{5\\pi}{3}t\\right) + 100.$$ What is the **fundamental period** of $P$, in seconds?`,
      ),
      answer: {
        kind: "numeric",
        value: 1.2,
        tolerance: { mode: "relative", value: 0.02 },
      },
      hints: [
        L(
          "Para $f(t) = A\\cos(\\omega t) + C$, el periodo es $T = \\frac{2\\pi}{\\omega}$.",
          "For $f(t) = A\\cos(\\omega t) + C$, the period is $T = \\frac{2\\pi}{\\omega}$.",
        ),
        L(
          "Aquí $\\omega = \\frac{5\\pi}{3}$.",
          "Here $\\omega = \\frac{5\\pi}{3}$.",
        ),
        L(
          "$T = \\frac{2\\pi}{5\\pi/3} = \\frac{6}{5} = 1{,}2$ segundos (puedes teclear \\`6/5\\` o \\`1,2\\`).",
          "$T = \\frac{2\\pi}{5\\pi/3} = \\frac{6}{5} = 1.2$ seconds (you may type \\`6/5\\` or \\`1.2\\`).",
        ),
      ],
      answerDisplay: L(
        `$T = \\frac{6}{5}\\ \\text{s} = 1{,}2\\ \\text{s}$`,
        `$T = \\frac{6}{5}\\ \\text{s} = 1.2\\ \\text{s}$`,
      ),
      solution: [
        step(
          "given",
          "$P(t) = -20\\cos\\!\\left(\\frac{5\\pi}{3}t\\right) + 100$: amplitud $20$, línea media $100$, frecuencia angular $\\omega = \\frac{5\\pi}{3}$.",
          "$P(t) = -20\\cos\\!\\left(\\frac{5\\pi}{3}t\\right) + 100$: amplitude $20$, midline $100$, angular frequency $\\omega = \\frac{5\\pi}{3}$.",
        ),
        step(
          "approach",
          "El periodo de un coseno con argumento $\\omega t$ es el $T$ que hace que el argumento avance exactamente $2\\pi$.",
          "The period of a cosine with argument $\\omega t$ is the $T$ that makes the argument advance exactly $2\\pi$.",
        ),
        step(
          "calculation",
          `$\\omega T = 2\\pi$<br>$T = \\frac{2\\pi}{5\\pi/3} = \\frac{2\\pi \\cdot 3}{5\\pi} = \\frac{6}{5} = 1{,}2$`,
          `$\\omega T = 2\\pi$<br>$T = \\frac{2\\pi}{5\\pi/3} = \\frac{2\\pi \\cdot 3}{5\\pi} = \\frac{6}{5} = 1.2$`,
        ),
        step(
          "result",
          `El periodo fundamental es $\\frac{6}{5} = 1{,}2$ segundos: el ciclo cardíaco se repite cada 1,2 s (50 latidos por minuto en reposo, dato coherente).`,
          `The fundamental period is $\\frac{6}{5} = 1.2$ seconds: the cardiac cycle repeats every 1.2 s (50 beats per minute at rest — consistent).`,
        ),
      ],
    }),
  ),

  /* 58d — first t > 0 with P(t) = 100 */
  template(
    {
      id: "trigfn-espol-58d",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "amplitude",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 300,
      tags: ["modeling", "cosine", "equation"],
      prerequisites: ["trig-functions"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5.6 · 58d",
        page: 670,
      },
      reasoning: "modeling",
    },
    () => ({
      skill: L("Modelo: ¿cuándo cruza la línea media?", "Model: when does it cross the midline?"),
      statement: L(
        `En reposo, la presión arterial (en mm Hg, en cualquier segundo $t \\geq 0$) se aproxima por $$P(t) = -20\\cos\\!\\left(\\frac{5\\pi}{3}t\\right) + 100.$$ Determina el **primer instante $t > 0$** en que la presión vale exactamente $100$ mm Hg (en segundos).`,
        `At rest, blood pressure (in mm Hg, at any second $t \\geq 0$) is approximated by $$P(t) = -20\\cos\\!\\left(\\frac{5\\pi}{3}t\\right) + 100.$$ Find the **first instant $t > 0$** at which the pressure equals exactly $100$ mm Hg (in seconds).`,
      ),
      answer: {
        kind: "numeric",
        value: 0.3,
        tolerance: { mode: "absolute", value: 0.005 },
      },
      hints: [
        L(
          "$P(t) = 100$ obliga al coseno a valer cero: $-20\\cos(\\cdot) + 100 = 100$.",
          "$P(t) = 100$ forces the cosine to vanish: $-20\\cos(\\cdot) + 100 = 100$.",
        ),
        L(
          "$\\cos\\!\\left(\\frac{5\\pi}{3}t\\right) = 0 \\Rightarrow \\frac{5\\pi}{3}t = \\frac{\\pi}{2} + k\\pi$.",
          "$\\cos\\!\\left(\\frac{5\\pi}{3}t\\right) = 0 \\Rightarrow \\frac{5\\pi}{3}t = \\frac{\\pi}{2} + k\\pi$.",
        ),
        L(
          "$t = \\frac{3}{10} + \\frac{3k}{5}$: el primer positivo es con $k = 0$.",
          "$t = \\frac{3}{10} + \\frac{3k}{5}$: the first positive one uses $k = 0$.",
        ),
      ],
      answerDisplay: L(
        `$t = \\frac{3}{10} = 0{,}3\\ \\text{s}$ (y luego $t = 0{,}9\\ \\text{s}$ dentro del primer periodo)`,
        `$t = \\frac{3}{10} = 0.3\\ \\text{s}$ (then $t = 0.9\\ \\text{s}$ within the first period)`,
      ),
      solution: [
        step(
          "given",
          "$P(t) = -20\\cos\\!\\left(\\frac{5\\pi}{3}t\\right) + 100$; pedimos $P(t) = 100$ (la línea media).",
          "$P(t) = -20\\cos\\!\\left(\\frac{5\\pi}{3}t\\right) + 100$; we want $P(t) = 100$ (the midline).",
        ),
        step(
          "approach",
          "Igualar a la línea media reduce todo a $\\cos(\\cdot) = 0$: la mitad de la velocidad del coseno son cruces por la media.",
          "Setting it equal to the midline reduces everything to $\\cos(\\cdot) = 0$: every half-cycle of the cosine crosses the midline.",
        ),
        step(
          "calculation",
          `$-20\\cos\\!\\left(\\frac{5\\pi}{3}t\\right) + 100 = 100$<br>$\\cos\\!\\left(\\frac{5\\pi}{3}t\\right) = 0$<br>$\\frac{5\\pi}{3}t = \\frac{\\pi}{2} + k\\pi$<br>$t = \\frac{3}{10} + \\frac{3k}{5}$<br>Primer periodo $[0, 1{,}2)$: $t = 0{,}3$ y $t = 0{,}9$`,
          `$-20\\cos\\!\\left(\\frac{5\\pi}{3}t\\right) + 100 = 100$<br>$\\cos\\!\\left(\\frac{5\\pi}{3}t\\right) = 0$<br>$\\frac{5\\pi}{3}t = \\frac{\\pi}{2} + k\\pi$<br>$t = \\frac{3}{10} + \\frac{3k}{5}$<br>First period $[0, 1.2)$: $t = 0.3$ and $t = 0.9$`,
        ),
        step(
          "result",
          `El primer instante positivo es $t = \\frac{3}{10} = 0{,}3$ s (dentro del primer periodo vuelve a ocurrir en $t = 0{,}9$ s).`,
          `The first positive instant is $t = \\frac{3}{10} = 0.3$ s (within the first period it happens again at $t = 0.9$ s).`,
        ),
      ],
    }),
  ),

  /* ================================================================== */
  /* Segunda tanda ESPOL §5.5/§5.6 — transcrita con el modelo de visión */
  /* (VLM), cruzada con la clave impresa (pp. 799+) y re-derivada.      */
  /* ================================================================== */

  /* 5.5 · 45e — sen(x+y)·sen(x−y) = sen²x − Δ; Δ = sen²y */
  template(
    {
      id: "trigf-espol-45e",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "identities",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["identities", "product-to-sum", "placeholder"],
      prerequisites: ["trig-foundations"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5.5 · 45e",
        page: 666,
      },
      reasoning: "multi-concept",
    },
    () => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\Delta = \\operatorname{sen}^2 y$`, `$\\Delta = \\sin^2 y$`), correct: true },
        { id: "b", text: L(`$\\Delta = \\cos^2 y$`, `$\\Delta = \\cos^2 y$`), correct: false },
        { id: "c", text: L(`$\\Delta = \\operatorname{sen}\\,y$`, `$\\Delta = \\sin y$`), correct: false },
        { id: "d", text: L(`$\\Delta = \\cos^2 x$`, `$\\Delta = \\cos^2 x$`), correct: false },
      ];
      return {
        skill: L("Producto a suma para hallar el hueco", "Product-to-sum to find the gap"),
        statement: L(
          `Identifica la expresión por la cual debe reemplazarse $\\Delta$ para que la igualdad sea una identidad trigonométrica (considera las restricciones del caso): $\\quad \\operatorname{sen}(x+y)\\,\\operatorname{sen}(x-y) = \\operatorname{sen}^2 x - \\Delta$.`,
          `Identify the expression that must replace $\\Delta$ so the equality becomes a trigonometric identity (consider the domain restrictions): $\\quad \\sin(x+y)\\,\\sin(x-y) = \\sin^2 x - \\Delta$.`,
        ),
        answer: { kind: "multiple-choice", options },
        hints: [
          L(
            "Convierte el producto en suma: $\\operatorname{sen} A\\,\\operatorname{sen} B = \\frac{1}{2}\\left[\\cos(A-B) - \\cos(A+B)\\right]$.",
            "Turn the product into a sum: $\\sin A\\,\\sin B = \\frac{1}{2}\\left[\\cos(A-B) - \\cos(A+B)\\right]$.",
          ),
          L(
            "Con $A = x+y$ y $B = x-y$: el producto queda $\\frac{1}{2}\\left[\\cos(2y) - \\cos(2x)\\right]$.",
            "With $A = x+y$ and $B = x-y$: the product becomes $\\frac{1}{2}\\left[\\cos(2y) - \\cos(2x)\\right]$.",
          ),
          L(
            "Usa $\\cos(2u) = 1 - 2\\operatorname{sen}^2 u$ en ambos términos y simplifica.",
            "Use $\\cos(2u) = 1 - 2\\sin^2 u$ on both terms and simplify.",
          ),
        ],
        answerDisplay: L(
          `$\\Delta = \\operatorname{sen}^2 y$, la identidad de producto: $\\operatorname{sen}(x+y)\\operatorname{sen}(x-y) = \\operatorname{sen}^2 x - \\operatorname{sen}^2 y$.`,
          `$\\Delta = \\sin^2 y$, the product identity: $\\sin(x+y)\\sin(x-y) = \\sin^2 x - \\sin^2 y$.`,
        ),
        solution: [
          step(
            "given",
            "$\\operatorname{sen}(x+y)\\,\\operatorname{sen}(x-y) = \\operatorname{sen}^2 x - \\Delta$, válida para todo $x, y$ donde las funciones existan.",
            "$\\sin(x+y)\\,\\sin(x-y) = \\sin^2 x - \\Delta$, valid for all $x, y$ where the functions exist.",
          ),
          step(
            "approach",
            "Desarrollar el producto con la fórmula producto→suma y reescribir los cosenos dobles con la identidad $\\cos(2u) = 1 - 2\\operatorname{sen}^2 u$; el hueco $\\Delta$ saldrá por comparación.",
            "Expand the product with the product-to-sum formula and rewrite the double cosines with $\\cos(2u) = 1 - 2\\sin^2 u$; the gap $\\Delta$ emerges by comparison.",
          ),
          step(
            "calculation",
            `$\\operatorname{sen}(x+y)\\operatorname{sen}(x-y) = \\tfrac{1}{2}\\left[\\cos(2y) - \\cos(2x)\\right]$<br>$= \\tfrac{1}{2}\\left[(1 - 2\\operatorname{sen}^2 y) - (1 - 2\\operatorname{sen}^2 x)\\right]$<br>$= \\operatorname{sen}^2 x - \\operatorname{sen}^2 y$`,
            `$\\sin(x+y)\\sin(x-y) = \\tfrac{1}{2}\\left[\\cos(2y) - \\cos(2x)\\right]$<br>$= \\tfrac{1}{2}\\left[(1 - 2\\sin^2 y) - (1 - 2\\sin^2 x)\\right]$<br>$= \\sin^2 x - \\sin^2 y$`,
          ),
          step(
            "result",
            `Comparando con $\\operatorname{sen}^2 x - \\Delta$ resulta $\\Delta = \\operatorname{sen}^2 y$. Comprobación numérica con $x = \\frac{\\pi}{2}$, $y = \\frac{\\pi}{6}$: LHS $= \\operatorname{sen}\\frac{2\\pi}{3}\\operatorname{sen}\\frac{\\pi}{3} = \\frac{3}{4}$; RHS $= 1 - \\frac{1}{4} = \\frac{3}{4}$ ✓.`,
            `Comparing with $\\sin^2 x - \\Delta$ gives $\\Delta = \\sin^2 y$. Numerical check with $x = \\frac{\\pi}{2}$, $y = \\frac{\\pi}{6}$: LHS $= \\sin\\frac{2\\pi}{3}\\sin\\frac{\\pi}{3} = \\frac{3}{4}$; RHS $= 1 - \\frac{1}{4} = \\frac{3}{4}$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 5.5 · 45i — (1+cos x)/csc x = (sen x + tan x)/(2Δ·sec x); Δ = 1/2 */
  template(
    {
      id: "trigf-espol-45i",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "identities",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 360,
      tags: ["identities", "reciprocals", "placeholder"],
      prerequisites: ["trig-foundations"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5.5 · 45i",
        page: 667,
      },
      reasoning: "multi-concept",
    },
    () => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\Delta = \\dfrac{1}{2}$`, `$\\Delta = \\dfrac{1}{2}$`), correct: true },
        { id: "b", text: L(`$\\Delta = 1$`, `$\\Delta = 1$`), correct: false },
        { id: "c", text: L(`$\\Delta = \\cos x$`, `$\\Delta = \\cos x$`), correct: false },
        { id: "d", text: L(`$\\Delta = 2$`, `$\\Delta = 2$`), correct: false },
      ];
      return {
        skill: L("Recíprocas y tangent en un hueco constante", "Reciprocals and tangent with a constant gap"),
        statement: L(
          `Identifica la expresión por la cual debe reemplazarse $\\Delta$ para que la igualdad sea una identidad trigonométrica: $\\quad \\dfrac{1 + \\cos x}{\\csc x} = \\dfrac{\\operatorname{sen} x + \\tan x}{2\\,\\Delta\\,\\sec x}$.`,
          `Identify the expression that must replace $\\Delta$ so the equality becomes a trigonometric identity: $\\quad \\dfrac{1 + \\cos x}{\\csc x} = \\dfrac{\\sin x + \\tan x}{2\\,\\Delta\\,\\sec x}$.`,
        ),
        answer: { kind: "multiple-choice", options },
        hints: [
          L(
            "Reescribe todo con senos y cosenos: $\\csc x = \\frac{1}{\\operatorname{sen} x}$, $\\sec x = \\frac{1}{\\cos x}$, $\\tan x = \\frac{\\operatorname{sen} x}{\\cos x}$.",
            "Rewrite everything with sines and cosines: $\\csc x = \\frac{1}{\\sin x}$, $\\sec x = \\frac{1}{\\cos x}$, $\\tan x = \\frac{\\sin x}{\\cos x}$.",
          ),
          L(
            "LHS $= (1 + \\cos x)\\operatorname{sen} x$. ¿Puedes llegar a esa misma forma desde el lado derecho?",
            "LHS $= (1 + \\cos x)\\sin x$. Can you reach that same form from the right-hand side?",
          ),
          L(
            "RHS $= \\frac{\\operatorname{sen} x (1 + 1/\\cos x)}{2\\Delta / \\cos x} = \\frac{\\operatorname{sen} x (1 + \\cos x)}{2\\Delta}$: compara con LHS.",
            "RHS $= \\frac{\\sin x (1 + 1/\\cos x)}{2\\Delta / \\cos x} = \\frac{\\sin x (1 + \\cos x)}{2\\Delta}$: compare with LHS.",
          ),
        ],
        answerDisplay: L(
          `$\\Delta = \\frac{1}{2}$: con ese valor ambos lados valen $(1 + \\cos x)\\operatorname{sen} x$.`,
          `$\\Delta = \\frac{1}{2}$: with that value both sides equal $(1 + \\cos x)\\sin x$.`,
        ),
        solution: [
          step(
            "given",
            "$\\dfrac{1 + \\cos x}{\\csc x} = \\dfrac{\\operatorname{sen} x + \\tan x}{2\\,\\Delta\\,\\sec x}$, con $\\operatorname{sen} x \\ne 0$, $\\cos x \\ne 0$.",
            "$\\dfrac{1 + \\cos x}{\\csc x} = \\dfrac{\\sin x + \\tan x}{2\\,\\Delta\\,\\sec x}$, with $\\sin x \\ne 0$, $\\cos x \\ne 0$.",
          ),
          step(
            "approach",
            "Traducir las funciones recíprocas a cocientes de seno y coseno; ambos lados colapsan a la misma forma y el $\\Delta$ queda determinado por comparación de coeficientes.",
            "Translate the reciprocal functions into sine/cosine quotients; both sides collapse to the same form and $\\Delta$ is pinned down by comparing coefficients.",
          ),
          step(
            "calculation",
            `LHS $= (1 + \\cos x)\\operatorname{sen} x$<br>RHS $= \\dfrac{\\operatorname{sen} x + \\frac{\\operatorname{sen} x}{\\cos x}}{\\frac{2\\Delta}{\\cos x}} = \\dfrac{\\operatorname{sen} x\\left(1 + \\frac{1}{\\cos x}\\right)\\cos x}{2\\Delta} = \\dfrac{\\operatorname{sen} x\\,(1 + \\cos x)}{2\\Delta}$<br>Igualando: $\\operatorname{sen} x(1 + \\cos x) = \\dfrac{\\operatorname{sen} x (1 + \\cos x)}{2\\Delta} \\Rightarrow 2\\Delta = 1$`,
            `LHS $= (1 + \\cos x)\\sin x$<br>RHS $= \\dfrac{\\sin x + \\frac{\\sin x}{\\cos x}}{\\frac{2\\Delta}{\\cos x}} = \\dfrac{\\sin x\\left(1 + \\frac{1}{\\cos x}\\right)\\cos x}{2\\Delta} = \\dfrac{\\sin x\\,(1 + \\cos x)}{2\\Delta}$<br>Equating: $\\sin x(1 + \\cos x) = \\dfrac{\\sin x (1 + \\cos x)}{2\\Delta} \\Rightarrow 2\\Delta = 1$`,
          ),
          step(
            "result",
            `$\\Delta = \\frac{1}{2}$. Comprobación con $x = \\frac{\\pi}{3}$: LHS $= \\frac{1 + 0{.}5}{\\frac{2}{\\sqrt{3}}} = \\frac{3\\sqrt{3}}{4}$; RHS con $\\Delta = \\frac{1}{2}$ $= \\frac{\\frac{\\sqrt{3}}{2} + \\sqrt{3}}{2 \\cdot \\frac{1}{2} \\cdot 2} = \\frac{3\\sqrt{3}}{4}$ ✓.`,
            `$\\Delta = \\frac{1}{2}$. Check with $x = \\frac{\\pi}{3}$: LHS $= \\frac{1 + 0{.}5}{\\frac{2}{\\sqrt{3}}} = \\frac{3\\sqrt{3}}{4}$; RHS with $\\Delta = \\frac{1}{2}$ $= \\frac{\\frac{\\sqrt{3}}{2} + \\sqrt{3}}{2 \\cdot \\frac{1}{2} \\cdot 2} = \\frac{3\\sqrt{3}}{4}$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 5.5 · 46c — tan(15°) sin calculadora = 2 − √3 */
  template(
    {
      id: "trigf-espol-46c",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "identities",
      difficulty: "hard",
      questionType: "expression",
      estimatedTimeSec: 300,
      tags: ["exact-values", "difference-formula", "no-calculator"],
      prerequisites: ["trig-foundations"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5.5 · 46c",
        page: 667,
      },
      reasoning: "multi-concept",
    },
    () => ({
      skill: L("Valor exacto con ángulo diferencia", "Exact value with a difference angle"),
      statement: L(
        `Sin usar calculadora, determina el valor exacto de $\\tan(15^\\circ)$. Escríbelo como expresión (p. ej. \`sqrt(3)/2\` o \`2 - sqrt(3)\`).`,
        `Without a calculator, find the exact value of $\\tan(15^\\circ)$. Enter it as an expression (e.g. \`sqrt(3)/2\` or \`2 - sqrt(3)\`).`,
      ),
      answer: { kind: "expression", accepted: ["2 - sqrt(3)"], variables: [] },
      hints: [
        L(
          "Escribe $15^\\circ$ como diferencia de ángulos notables: $15^\\circ = 45^\\circ - 30^\\circ$.",
          "Write $15^\\circ$ as a difference of notable angles: $15^\\circ = 45^\\circ - 30^\\circ$.",
        ),
        L(
          "Aplica $\\tan(A - B) = \\dfrac{\\tan A - \\tan B}{1 + \\tan A\\,\\tan B}$ con $\\tan 45^\\circ = 1$ y $\\tan 30^\\circ = \\frac{\\sqrt{3}}{3}$.",
          "Apply $\\tan(A - B) = \\dfrac{\\tan A - \\tan B}{1 + \\tan A\\,\\tan B}$ with $\\tan 45^\\circ = 1$ and $\\tan 30^\\circ = \\frac{\\sqrt{3}}{3}$.",
        ),
        L(
          "Obtendrás $\\frac{\\sqrt{3}-1}{\\sqrt{3}+1}$: racionaliza multiplicando por $\\sqrt{3}-1$.",
          "You will get $\\frac{\\sqrt{3}-1}{\\sqrt{3}+1}$: rationalize by multiplying by $\\sqrt{3}-1$.",
        ),
      ],
      answerDisplay: L(
        `$\\tan(15^\\circ) = 2 - \\sqrt{3} \\approx 0{.}268$`,
        `$\\tan(15^\\circ) = 2 - \\sqrt{3} \\approx 0{.}268$`,
      ),
      solution: [
        step(
          "given",
          "$\\tan(15^\\circ)$, sin calculadora.",
          "$\\tan(15^\\circ)$, no calculator.",
        ),
        step(
          "approach",
          "Descomponer el ángulo en una diferencia de ángulos notables y aplicar la fórmula de la tangente de una diferencia.",
          "Split the angle into a difference of notable angles and apply the tangent difference formula.",
        ),
        step(
          "calculation",
          `$\\tan(45^\\circ - 30^\\circ) = \\dfrac{1 - \\frac{\\sqrt{3}}{3}}{1 + 1 \\cdot \\frac{\\sqrt{3}}{3}} = \\dfrac{3 - \\sqrt{3}}{3 + \\sqrt{3}}$<br>$= \\dfrac{(3 - \\sqrt{3})^2}{(3 + \\sqrt{3})(3 - \\sqrt{3})} = \\dfrac{9 - 6\\sqrt{3} + 3}{6} = \\dfrac{12 - 6\\sqrt{3}}{6} = 2 - \\sqrt{3}$`,
          `$\\tan(45^\\circ - 30^\\circ) = \\dfrac{1 - \\frac{\\sqrt{3}}{3}}{1 + 1 \\cdot \\frac{\\sqrt{3}}{3}} = \\dfrac{3 - \\sqrt{3}}{3 + \\sqrt{3}}$<br>$= \\dfrac{(3 - \\sqrt{3})^2}{(3 + \\sqrt{3})(3 - \\sqrt{3})} = \\dfrac{9 - 6\\sqrt{3} + 3}{6} = \\dfrac{12 - 6\\sqrt{3}}{6} = 2 - \\sqrt{3}$`,
        ),
        step(
          "result",
          `$\\tan(15^\\circ) = 2 - \\sqrt{3} \\. \\approx 0{.}2679$, un valor clásico de los exámenes (junto con su hermano $\\tan 75^\\circ = 2 + \\sqrt{3}$).`,
          `$\\tan(15^\\circ) = 2 - \\sqrt{3}$, $\\approx 0{.}2679$, a classic exam value (together with its sibling $\\tan 75^\\circ = 2 + \\sqrt{3}$).`,
        ),
      ],
    }),
  ),

  /* 5.5 · 46e — sec(−75°) = √6 + √2 */
  template(
    {
      id: "trigf-espol-46e",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "identities",
      difficulty: "hard",
      questionType: "expression",
      estimatedTimeSec: 300,
      tags: ["exact-values", "sum-formula", "even-odd", "no-calculator"],
      prerequisites: ["trig-foundations"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5.5 · 46e",
        page: 667,
      },
      reasoning: "multi-concept",
    },
    () => ({
      skill: L("Secante de ángulo negativo con suma", "Secant of a negative angle with a sum"),
      statement: L(
        `Sin usar calculadora, determina el valor exacto de $\\sec(-75^\\circ)$. Escríbelo como expresión (p. ej. \`sqrt(6) + sqrt(2)\`).`,
        `Without a calculator, find the exact value of $\\sec(-75^\\circ)$. Enter it as an expression (e.g. \`sqrt(6) + sqrt(2)\`).`,
      ),
      answer: { kind: "expression", accepted: ["sqrt(6) + sqrt(2)"], variables: [] },
      hints: [
        L(
          "$\\sec(-75^\\circ) = \\dfrac{1}{\\cos(-75^\\circ)}$ y el coseno es par: $\\cos(-75^\\circ) = \\cos(75^\\circ)$.",
          "$\\sec(-75^\\circ) = \\dfrac{1}{\\cos(-75^\\circ)}$ and cosine is even: $\\cos(-75^\\circ) = \\cos(75^\\circ)$.",
        ),
        L(
          "Escribe $75^\\circ = 45^\\circ + 30^\\circ$ y usa $\\cos(A+B) = \\cos A\\cos B - \\operatorname{sen}A\\operatorname{sen}B$.",
          "Write $75^\\circ = 45^\\circ + 30^\\circ$ and use $\\cos(A+B) = \\cos A\\cos B - \\sin A\\sin B$.",
        ),
        L(
          "$\\cos 75^\\circ = \\frac{\\sqrt{6} - \\sqrt{2}}{4}$; al tomar el recíproco, racionaliza multiplicando por $\\sqrt{6} + \\sqrt{2}$.",
          "$\\cos 75^\\circ = \\frac{\\sqrt{6} - \\sqrt{2}}{4}$; when taking the reciprocal, rationalize by multiplying by $\\sqrt{6} + \\sqrt{2}$.",
        ),
      ],
      answerDisplay: L(
        `$\\sec(-75^\\circ) = \\sqrt{6} + \\sqrt{2} \\approx 3{.}864$`,
        `$\\sec(-75^\\circ) = \\sqrt{6} + \\sqrt{2} \\approx 3{.}864$`,
      ),
      solution: [
        step(
          "given",
          "$\\sec(-75^\\circ)$, sin calculadora.",
          "$\\sec(-75^\\circ)$, no calculator.",
        ),
        step(
          "approach",
          "Usar la paridad del coseno para voltear el signo del ángulo, descomponer $75^\\circ$ en suma de ángulos notables y racionalizar el recíproco.",
          "Use the parity of cosine to flip the angle's sign, split $75^\\circ$ into notable angles, and rationalize the reciprocal.",
        ),
        step(
          "calculation",
          `$\\cos 75^\\circ = \\cos(45^\\circ + 30^\\circ) = \\frac{\\sqrt{2}}{2}\\cdot\\frac{\\sqrt{3}}{2} - \\frac{\\sqrt{2}}{2}\\cdot\\frac{1}{2} = \\frac{\\sqrt{6} - \\sqrt{2}}{4}$<br>$\\sec(-75^\\circ) = \\frac{1}{\\cos 75^\\circ} = \\frac{4}{\\sqrt{6} - \\sqrt{2}} = \\frac{4(\\sqrt{6} + \\sqrt{2})}{(\\sqrt{6})^2 - (\\sqrt{2})^2} = \\frac{4(\\sqrt{6} + \\sqrt{2})}{4}$`,
          `$\\cos 75^\\circ = \\cos(45^\\circ + 30^\\circ) = \\frac{\\sqrt{2}}{2}\\cdot\\frac{\\sqrt{3}}{2} - \\frac{\\sqrt{2}}{2}\\cdot\\frac{1}{2} = \\frac{\\sqrt{6} - \\sqrt{2}}{4}$<br>$\\sec(-75^\\circ) = \\frac{1}{\\cos 75^\\circ} = \\frac{4}{\\sqrt{6} - \\sqrt{2}} = \\frac{4(\\sqrt{6} + \\sqrt{2})}{(\\sqrt{6})^2 - (\\sqrt{2})^2} = \\frac{4(\\sqrt{6} + \\sqrt{2})}{4}$`,
        ),
        step(
          "result",
          `$\\sec(-75^\\circ) = \\sqrt{6} + \\sqrt{2} \\. \\approx 3{.}86$. El mismo valor con signo menos es $\\csc(345^\\circ) = -(\\sqrt{6} + \\sqrt{2})$, el literal f) del mismo ejercicio.`,
          `$\\sec(-75^\\circ) = \\sqrt{6} + \\sqrt{2}$, $\\approx 3{.}86$. The same value with a minus sign is $\\csc(345^\\circ) = -(\\sqrt{6} + \\sqrt{2})$, literal f) of the same exercise.`,
        ),
      ],
    }),
  ),

  /* 5.5 · 47a — sen[arccos(1/2) + arccos(1/4)] = (√15 + √3)/8 */
  template(
    {
      id: "trigf-espol-47a",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "inverse-trig",
      difficulty: "challenge",
      questionType: "expression",
      estimatedTimeSec: 420,
      tags: ["inverse-trig", "sum-formula", "exact-values"],
      prerequisites: ["trig-functions"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5.5 · 47a",
        page: 667,
      },
      reasoning: "multi-concept",
    },
    () => ({
      skill: L("Suma de arccosenos dentro de un seno", "Sum of arccosines inside a sine"),
      statement: L(
        `Calcula el valor exacto de $\\sin\\left[\\arccos\\left(\\dfrac{1}{2}\\right) + \\arccos\\left(\\dfrac{1}{4}\\right)\\right]$. Escríbelo como expresión (p. ej. \`(sqrt(15) + sqrt(3))/8\`).`,
        `Find the exact value of $\\sin\\left[\\arccos\\left(\\dfrac{1}{2}\\right) + \\arccos\\left(\\dfrac{1}{4}\\right)\\right]$. Enter it as an expression (e.g. \`(sqrt(15) + sqrt(3))/8\`).`,
      ),
      answer: { kind: "expression", accepted: ["(sqrt(15) + sqrt(3))/8"], variables: [] },
      hints: [
        L(
          "Llama $A = \\arccos\\left(\\frac{1}{2}\\right)$ y $B = \\arccos\\left(\\frac{1}{4}\\right)$: necesitas $\\sin(A + B)$.",
          "Let $A = \\arccos\\left(\\frac{1}{2}\\right)$ and $B = \\arccos\\left(\\frac{1}{4}\\right)$: you need $\\sin(A + B)$.",
        ),
        L(
          "De cada arco obtén seno y coseno: para $A$ son valores notables; para $B$ usa $\\sin B = \\sqrt{1 - \\frac{1}{16}}$ (el rango de $\\arccos$ garantiza $\\sin B \\ge 0$).",
          "From each arc get sine and cosine: for $A$ they are notable values; for $B$ use $\\sin B = \\sqrt{1 - \\frac{1}{16}}$ (the range of $\\arccos$ guarantees $\\sin B \\ge 0$).",
        ),
        L(
          "Aplica $\\sin(A+B) = \\sin A\\cos B + \\cos A\\sin B = \\frac{\\sqrt{3}}{2}\\cdot\\frac{1}{4} + \\frac{1}{2}\\cdot\\frac{\\sqrt{15}}{4}$.",
          "Apply $\\sin(A+B) = \\sin A\\cos B + \\cos A\\sin B = \\frac{\\sqrt{3}}{2}\\cdot\\frac{1}{4} + \\frac{1}{2}\\cdot\\frac{\\sqrt{15}}{4}$.",
        ),
      ],
      answerDisplay: L(
        `$\\dfrac{\\sqrt{15} + \\sqrt{3}}{8} \\approx 0{.}726$`,
        `$\\dfrac{\\sqrt{15} + \\sqrt{3}}{8} \\approx 0{.}726$`,
      ),
      solution: [
        step(
          "given",
          "$\\sin\\left[\\arccos\\left(\\frac{1}{2}\\right) + \\arccos\\left(\\frac{1}{4}\\right)\\right]$, con ambos arcos en $[0, \\pi]$.",
          "$\\sin\\left[\\arccos\\left(\\frac{1}{2}\\right) + \\arccos\\left(\\frac{1}{4}\\right)\\right]$, both arcs in $[0, \\pi]$.",
        ),
        step(
          "approach",
          "Nombrar los arcos, extraer sus senos y cosenos (el rango de $\\arccos$ fija los signos) y expandir con la fórmula del seno de una suma.",
          "Name the arcs, extract their sines and cosines (the range of $\\arccos$ fixes the signs) and expand with the sine addition formula.",
        ),
        step(
          "calculation",
          `$A = \\arccos\\frac{1}{2} = \\frac{\\pi}{3}:\\ \\sin A = \\frac{\\sqrt{3}}{2},\\ \\cos A = \\frac{1}{2}$<br>$B = \\arccos\\frac{1}{4}:\\ \\cos B = \\frac{1}{4},\\ \\sin B = \\sqrt{1 - \\frac{1}{16}} = \\frac{\\sqrt{15}}{4}$<br>$\\sin(A + B) = \\frac{\\sqrt{3}}{2}\\cdot\\frac{1}{4} + \\frac{1}{2}\\cdot\\frac{\\sqrt{15}}{4} = \\frac{\\sqrt{3} + \\sqrt{15}}{8}$`,
          `$A = \\arccos\\frac{1}{2} = \\frac{\\pi}{3}:\\ \\sin A = \\frac{\\sqrt{3}}{2},\\ \\cos A = \\frac{1}{2}$<br>$B = \\arccos\\frac{1}{4}:\\ \\cos B = \\frac{1}{4},\\ \\sin B = \\sqrt{1 - \\frac{1}{16}} = \\frac{\\sqrt{15}}{4}$<br>$\\sin(A + B) = \\frac{\\sqrt{3}}{2}\\cdot\\frac{1}{4} + \\frac{1}{2}\\cdot\\frac{\\sqrt{15}}{4} = \\frac{\\sqrt{3} + \\sqrt{15}}{8}$`,
        ),
        step(
          "result",
          `El valor exacto es $\\frac{\\sqrt{15} + \\sqrt{3}}{8} \\. \\approx 0{.}7262$. Comprobación numérica: $\\arccos\\left(\\frac{1}{2}\\right) = \\frac{\\pi}{3} \\. \\approx 1{.}0472$ y $\\arccos\\left(\\frac{1}{4}\\right) \\. \\approx 1{.}3181$ rad, así que $\\sin(2{.}3653) \\. \\approx 0{.}7262$ ✓.`,
          `The exact value is $\\frac{\\sqrt{15} + \\sqrt{3}}{8}$, $\\approx 0{.}726$. Numerical check: $\\arccos 0{.}25 \\approx 1{.}318$ rad and $\\sin(1{.}047 + 1{.}318) = \\sin(2{.}365) \\approx 0{.}726$ ✓.`,
        ),
      ],
    }),
  ),

  /* 5.5 · 47d — cot[2·arctan(1/2)] = 3/4 */
  template(
    {
      id: "trigf-espol-47d",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "inverse-trig",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 300,
      tags: ["inverse-trig", "double-angle", "exact-values"],
      prerequisites: ["trig-functions"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5.5 · 47d",
        page: 667,
      },
      reasoning: "multi-concept",
    },
    () => ({
      skill: L("Ángulo doble dentro de arctan", "Double angle inside arctan"),
      statement: L(
        `Calcula el valor exacto de $\\cot\\left[2\\arctan\\left(\\dfrac{1}{2}\\right)\\right]$ (fracción o decimal).`,
        `Find the exact value of $\\cot\\left[2\\arctan\\left(\\dfrac{1}{2}\\right)\\right]$ (fraction or decimal).`,
      ),
      answer: {
        kind: "numeric",
        value: 0.75,
        tolerance: { mode: "absolute", value: 0.005 },
      },
      hints: [
        L(
          "Llama $\\alpha = \\arctan\\left(\\frac{1}{2}\\right)$: necesitas $\\cot(2\\alpha) = \\frac{1}{\\tan(2\\alpha)}$.",
          "Let $\\alpha = \\arctan\\left(\\frac{1}{2}\\right)$: you need $\\cot(2\\alpha) = \\frac{1}{\\tan(2\\alpha)}$.",
        ),
        L(
          "Con $\\tan\\alpha = \\frac{1}{2}$: $\\tan(2\\alpha) = \\dfrac{2\\tan\\alpha}{1 - \\tan^2\\alpha}$.",
          "With $\\tan\\alpha = \\frac{1}{2}$: $\\tan(2\\alpha) = \\dfrac{2\\tan\\alpha}{1 - \\tan^2\\alpha}$.",
        ),
        L(
          "$\\tan(2\\alpha) = \\frac{1}{1 - \\frac{1}{4}} = \\frac{4}{3}$, así que la cotangente es su recíproco.",
          "$\\tan(2\\alpha) = \\frac{1}{1 - \\frac{1}{4}} = \\frac{4}{3}$, so the cotangent is its reciprocal.",
        ),
      ],
      answerDisplay: L(
        `$\\cot\\left[2\\arctan\\left(\\frac{1}{2}\\right)\\right] = \\dfrac{3}{4}$`,
        `$\\cot\\left[2\\arctan\\left(\\frac{1}{2}\\right)\\right] = \\dfrac{3}{4}$`,
      ),
      solution: [
        step(
          "given",
          "$\\cot\\left[2\\arctan\\left(\\frac{1}{2}\\right)\\right]$, con $\\arctan\\left(\\frac{1}{2}\\right) \\in \\left(0, \\frac{\\pi}{2}\\right)$.",
          "$\\cot\\left[2\\arctan\\left(\\frac{1}{2}\\right)\\right]$, with $\\arctan\\left(\\frac{1}{2}\\right) \\in \\left(0, \\frac{\\pi}{2}\\right)$.",
        ),
        step(
          "approach",
          "Nombrar el arco, aplicar la fórmula del ángulo doble de la tangente y tomar el recíproco para la cotangente.",
          "Name the arc, apply the double-angle formula for tangent, and take the reciprocal for the cotangent.",
        ),
        step(
          "calculation",
          `$\\alpha = \\arctan\\frac{1}{2} \\Rightarrow \\tan\\alpha = \\frac{1}{2}$<br>$\\tan(2\\alpha) = \\dfrac{2\\cdot\\frac{1}{2}}{1 - \\left(\\frac{1}{2}\\right)^2} = \\dfrac{1}{\\frac{3}{4}} = \\frac{4}{3}$<br>$\\cot(2\\alpha) = \\dfrac{1}{\\tan(2\\alpha)} = \\dfrac{3}{4}$`,
          `$\\alpha = \\arctan\\frac{1}{2} \\Rightarrow \\tan\\alpha = \\frac{1}{2}$<br>$\\tan(2\\alpha) = \\dfrac{2\\cdot\\frac{1}{2}}{1 - \\left(\\frac{1}{2}\\right)^2} = \\dfrac{1}{\\frac{3}{4}} = \\frac{4}{3}$<br>$\\cot(2\\alpha) = \\dfrac{1}{\\tan(2\\alpha)} = \\dfrac{3}{4}$`,
        ),
        step(
          "result",
          `El valor exacto es $\\frac{3}{4}$. Comprobación: $\\arctan(0{.}5) \\. \\approx 26{.}57^\\circ$, y $\\cot(53{.}13^\\circ) = \\frac{\\cos}{\\sin} = \\frac{0{.}6}{0{.}8} = 0{.}75$ ✓ (¡el triángulo 3-4-5 aparece aquí!).`,
          `The exact value is $\\frac{3}{4}$. Check: $\\arctan(0{.}5) \\approx 26{.}57^\\circ$ and $\\cot(53{.}13^\\circ) = \\frac{\\cos}{\\sin} = \\frac{0{.}6}{0{.}8} = 0{.}75$ ✓ (the 3-4-5 triangle shows up here!).`,
        ),
      ],
    }),
  ),

  /* 5.5 · 49a — 8·cos10°·cos20°·cos40° = cot(10°) */
  template(
    {
      id: "trigf-espol-49a",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "simplification",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 420,
      tags: ["simplification", "double-angle", "product"],
      prerequisites: ["trig-functions"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5.5 · 49a",
        page: 667,
      },
      reasoning: "multi-concept",
    },
    () => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\cot(10^\\circ)$`, `$\\cot(10^\\circ)$`), correct: true },
        { id: "b", text: L(`$\\tan(10^\\circ)$`, `$\\tan(10^\\circ)$`), correct: false },
        { id: "c", text: L(`$\\dfrac{1}{8}$`, `$\\dfrac{1}{8}$`), correct: false },
        { id: "d", text: L(`$\\sqrt{3}$`, `$\\sqrt{3}$`), correct: false },
      ];
      return {
        skill: L("Cadena de cosenos con ángulos dobles", "Chain of cosines with doubling angles"),
        statement: L(
          `Simplifica la expresión $8\\cos(10^\\circ)\\cos(20^\\circ)\\cos(40^\\circ)$.`,
          `Simplify the expression $8\\cos(10^\\circ)\\cos(20^\\circ)\\cos(40^\\circ)$.`,
        ),
        answer: { kind: "multiple-choice", options },
        hints: [
          L(
            "Multiplica y divide por $2\\sin(10^\\circ)$: aparece $2\\sin(10^\\circ)\\cos(10^\\circ) = \\sin(20^\\circ)$.",
            "Multiply and divide by $2\\sin(10^\\circ)$: $2\\sin(10^\\circ)\\cos(10^\\circ) = \\sin(20^\\circ)$ appears.",
          ),
          L(
            "El seno recién creado se cancela con el $\\sin(20^\\circ)$ del denominador al aplicar otra vez el ángulo doble con $\\cos(20^\\circ)$.",
            "The newly created sine cancels the $\\sin(20^\\circ)$ in the denominator when you apply the double angle again with $\\cos(20^\\circ)$.",
          ),
          L(
            "La cadena termina en $\\frac{\\sin(80^\\circ)}{\\sin(10^\\circ)}$; usa $\\sin(80^\\circ) = \\cos(10^\\circ)$.",
            "The chain ends at $\\frac{\\sin(80^\\circ)}{\\sin(10^\\circ)}$; use $\\sin(80^\\circ) = \\cos(10^\\circ)$.",
          ),
        ],
        answerDisplay: L(
          `$8\\cos(10^\\circ)\\cos(20^\\circ)\\cos(40^\\circ) = \\cot(10^\\circ) \\approx 5{.}671$`,
          `$8\\cos(10^\\circ)\\cos(20^\\circ)\\cos(40^\\circ) = \\cot(10^\\circ) \\approx 5{.}671$`,
        ),
        solution: [
          step(
            "given",
            "$8\\cos(10^\\circ)\\cos(20^\\circ)\\cos(40^\\circ)$.",
            "$8\\cos(10^\\circ)\\cos(20^\\circ)\\cos(40^\\circ)$.",
          ),
          step(
            "approach",
            "Los ángulos se duplican ($10 \\to 20 \\to 40$): multiplicar por $\\frac{2\\sin 10^\\circ}{2\\sin 10^\\circ}$ dispara una reacción en cadena de ángulos dobles que consume cada coseno.",
            "The angles double ($10 \\to 20 \\to 40$): multiplying by $\\frac{2\\sin 10^\\circ}{2\\sin 10^\\circ}$ triggers a chain reaction of double angles that consumes each cosine.",
          ),
          step(
            "calculation",
            `$8\\cos 10^\\circ \\cos 20^\\circ \\cos 40^\\circ \\cdot \\frac{2\\sin 10^\\circ}{2\\sin 10^\\circ} = \\frac{4\\sin 20^\\circ \\cos 20^\\circ \\cos 40^\\circ}{\\sin 10^\\circ}$<br>$= \\frac{2\\sin 40^\\circ \\cos 40^\\circ}{\\sin 10^\\circ} = \\frac{\\sin 80^\\circ}{\\sin 10^\\circ}$<br>$= \\frac{\\cos 10^\\circ}{\\sin 10^\\circ} = \\cot 10^\\circ$`,
            `$8\\cos 10^\\circ \\cos 20^\\circ \\cos 40^\\circ \\cdot \\frac{2\\sin 10^\\circ}{2\\sin 10^\\circ} = \\frac{4\\sin 20^\\circ \\cos 20^\\circ \\cos 40^\\circ}{\\sin 10^\\circ}$<br>$= \\frac{2\\sin 40^\\circ \\cos 40^\\circ}{\\sin 10^\\circ} = \\frac{\\sin 80^\\circ}{\\sin 10^\\circ}$<br>$= \\frac{\\cos 10^\\circ}{\\sin 10^\\circ} = \\cot 10^\\circ$`,
          ),
          step(
            "result",
            `La expresión vale $\\cot(10^\\circ) \\. \\approx 5{.}671$. El truco de multiplicar por $\\frac{2\\sin\\theta}{2\\sin\\theta}$ funciona siempre que los ángulos se dupliquen — memorízalo.`,
            `The expression equals $\\cot(10^\\circ) \\approx 5{.}671$. The trick of multiplying by $\\frac{2\\sin\\theta}{2\\sin\\theta}$ works whenever the angles double — worth memorizing.`,
          ),
        ],
      };
    },
  ),

  /* 5.5 · 49b — product of six cosines π/65…32π/65 = 1/64 */
  template(
    {
      id: "trigf-espol-49b",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "simplification",
      difficulty: "challenge",
      questionType: "numeric",
      estimatedTimeSec: 540,
      tags: ["simplification", "double-angle", "product", "identity"],
      prerequisites: ["trig-functions"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5.5 · 49b",
        page: 667,
      },
      reasoning: "multi-concept",
    },
    () => ({
      skill: L("Seis cosenos en cadena hacia 1/64", "Six chained cosines heading to 1/64"),
      statement: L(
        `Simplifica y calcula el valor exacto de $\\cos\\left(\\dfrac{\\pi}{65}\\right)\\cos\\left(\\dfrac{2\\pi}{65}\\right)\\cos\\left(\\dfrac{4\\pi}{65}\\right)\\cos\\left(\\dfrac{8\\pi}{65}\\right)\\cos\\left(\\dfrac{16\\pi}{65}\\right)\\cos\\left(\\dfrac{32\\pi}{65}\\right)$.`,
        `Simplify and compute the exact value of $\\cos\\left(\\dfrac{\\pi}{65}\\right)\\cos\\left(\\dfrac{2\\pi}{65}\\right)\\cos\\left(\\dfrac{4\\pi}{65}\\right)\\cos\\left(\\dfrac{8\\pi}{65}\\right)\\cos\\left(\\dfrac{16\\pi}{65}\\right)\\cos\\left(\\dfrac{32\\pi}{65}\\right)$.`,
      ),
      answer: {
        kind: "numeric",
        value: 1 / 64,
        tolerance: { mode: "absolute", value: 0.0005 },
      },
      hints: [
        L(
          "Los ángulos se duplican seis veces: $\\frac{\\pi}{65} \\to \\frac{2\\pi}{65} \\to \\cdots \\to \\frac{32\\pi}{65}$. Multiplica y divide por $2\\sin\\left(\\frac{\\pi}{65}\\right)$.",
          "The angles double six times: $\\frac{\\pi}{65} \\to \\frac{2\\pi}{65} \\to \\cdots \\to \\frac{32\\pi}{65}$. Multiply and divide by $2\\sin\\left(\\frac{\\pi}{65}\\right)$.",
        ),
        L(
          "La identidad general: $\\prod_{k=0}^{n-1}\\cos(2^k x) = \\dfrac{\\sin(2^n x)}{2^n\\sin x}$.",
          "The general identity: $\\prod_{k=0}^{n-1}\\cos(2^k x) = \\dfrac{\\sin(2^n x)}{2^n\\sin x}$.",
        ),
        L(
          "Con $n = 6$: el numerador es $\\sin\\left(\\frac{64\\pi}{65}\\right)$. ¿Cuánto vale $\\sin\\left(\\pi - \\frac{\\pi}{65}\\right)$?",
          "With $n = 6$: the numerator is $\\sin\\left(\\frac{64\\pi}{65}\\right)$. What is $\\sin\\left(\\pi - \\frac{\\pi}{65}\\right)$?",
        ),
      ],
      answerDisplay: L(
        `El producto vale $\\dfrac{1}{64} = 0{.}015625$.`,
        `The product equals $\\dfrac{1}{64} = 0{.}015625$.`,
      ),
      solution: [
        step(
          "given",
          "$\\cos\\frac{\\pi}{65}\\cos\\frac{2\\pi}{65}\\cos\\frac{4\\pi}{65}\\cos\\frac{8\\pi}{65}\\cos\\frac{16\\pi}{65}\\cos\\frac{32\\pi}{65}$.",
          "$\\cos\\frac{\\pi}{65}\\cos\\frac{2\\pi}{65}\\cos\\frac{4\\pi}{65}\\cos\\frac{8\\pi}{65}\\cos\\frac{16\\pi}{65}\\cos\\frac{32\\pi}{65}$.",
        ),
        step(
          "approach",
          "Los seis ángulos son $2^k \\cdot \\frac{\\pi}{65}$ para $k = 0,\\dots,5$: la identidad del producto en cadena $\\prod_{k=0}^{n-1}\\cos(2^k x) = \\frac{\\sin(2^n x)}{2^n \\sin x}$ colapsa todo, y el numerador es casi $\\pi$.",
          "The six angles are $2^k \\cdot \\frac{\\pi}{65}$ for $k = 0,\\dots,5$: the chain-product identity $\\prod_{k=0}^{n-1}\\cos(2^k x) = \\frac{\\sin(2^n x)}{2^n \\sin x}$ collapses everything, and the numerator is almost $\\pi$.",
        ),
        step(
          "calculation",
          `$\\prod_{k=0}^{5}\\cos\\left(2^k \\frac{\\pi}{65}\\right) = \\frac{\\sin\\left(2^6 \\frac{\\pi}{65}\\right)}{2^6 \\sin\\left(\\frac{\\pi}{65}\\right)} = \\frac{\\sin\\left(\\frac{64\\pi}{65}\\right)}{64\\sin\\left(\\frac{\\pi}{65}\\right)}$<br>$\\sin\\left(\\frac{64\\pi}{65}\\right) = \\sin\\left(\\pi - \\frac{\\pi}{65}\\right) = \\sin\\left(\\frac{\\pi}{65}\\right)$<br>$\\Rightarrow \\text{producto} = \\frac{\\sin\\left(\\frac{\\pi}{65}\\right)}{64\\sin\\left(\\frac{\\pi}{65}\\right)} = \\frac{1}{64}$`,
          `$\\prod_{k=0}^{5}\\cos\\left(2^k \\frac{\\pi}{65}\\right) = \\frac{\\sin\\left(2^6 \\frac{\\pi}{65}\\right)}{2^6 \\sin\\left(\\frac{\\pi}{65}\\right)} = \\frac{\\sin\\left(\\frac{64\\pi}{65}\\right)}{64\\sin\\left(\\frac{\\pi}{65}\\right)}$<br>$\\sin\\left(\\frac{64\\pi}{65}\\right) = \\sin\\left(\\pi - \\frac{\\pi}{65}\\right) = \\sin\\left(\\frac{\\pi}{65}\\right)$<br>$\\Rightarrow \\text{product} = \\frac{\\sin\\left(\\frac{\\pi}{65}\\right)}{64\\sin\\left(\\frac{\\pi}{65}\\right)} = \\frac{1}{64}$`,
        ),
        step(
          "result",
          `El producto exacto es $\\frac{1}{64} = 0{.}015625$, independiente del valor de $\\pi/65$: solo importa que $64 \\cdot \\frac{\\pi}{65}$ y $\\frac{\\pi}{65}$ sean suplementarios. Comprobación con la calculadora: $\\cos(2{.}77^\\circ)\\cos(5{.}54^\\circ)\\cdots\\cos(88{.}6^\\circ) \\. \\approx 0{.}0156$ ✓.`,
          `The exact product is $\\frac{1}{64} = 0{.}015625$, independent of the actual value of $\\pi/65$: all that matters is that $64 \\cdot \\frac{\\pi}{65}$ and $\\frac{\\pi}{65}$ are supplementary. Calculator check: $\\cos(2{.}77^\\circ)\\cos(5{.}54^\\circ)\\cdots\\cos(88{.}6^\\circ) \\approx 0{.}0156$ ✓.`,
        ),
      ],
    }),
  ),

  /* 5.6 · 57a — domain of f(x) = ln(sen(x/2)cos(x/2) − 1/4) on [0, 2π] */
  template(
    {
      id: "trigf-espol-57a",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "simplification",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 420,
      tags: ["domain", "logarithm", "double-angle", "inequality"],
      prerequisites: ["trig-functions"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5.6 · 57a",
        page: 670,
      },
      reasoning: "multi-concept",
    },
    () => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\left(\\frac{\\pi}{6},\\ \\frac{5\\pi}{6}\\right)$`, `$\\left(\\frac{\\pi}{6},\\ \\frac{5\\pi}{6}\\right)$`), correct: true },
        { id: "b", text: L(`$\\left[\\frac{\\pi}{6},\\ \\frac{5\\pi}{6}\\right]$`, `$\\left[\\frac{\\pi}{6},\\ \\frac{5\\pi}{6}\\right]$`), correct: false },
        { id: "c", text: L(`$(0,\\ \\pi)$`, `$(0,\\ \\pi)$`), correct: false },
        { id: "d", text: L(`$\\left(\\frac{\\pi}{3},\\ \\frac{2\\pi}{3}\\right)$`, `$\\left(\\frac{\\pi}{3},\\ \\frac{2\\pi}{3}\\right)$`), correct: false },
      ];
      return {
        skill: L("Dominio de un logaritmo trigonométrico", "Domain of a trigonometric logarithm"),
        statement: L(
          `Sea $f(x) = \\ln\\left(\\operatorname{sen}\\left(\\frac{x}{2}\\right)\\cos\\left(\\frac{x}{2}\\right) - \\frac{1}{4}\\right)$. Determina el conjunto de verdad de $p(x):\\ f(x)$ es un número real, con $x \\in [0, 2\\pi]$.`,
          `Let $f(x) = \\ln\\left(\\sin\\left(\\frac{x}{2}\\right)\\cos\\left(\\frac{x}{2}\\right) - \\frac{1}{4}\\right)$. Determine the truth set of $p(x):\\ f(x)$ is a real number, with $x \\in [0, 2\\pi]$.`,
        ),
        answer: { kind: "multiple-choice", options },
        hints: [
          L(
            "El logaritmo solo existe cuando su argumento es positivo.",
            "The logarithm exists only when its argument is positive.",
          ),
          L(
            "Simplifica primero: $\\operatorname{sen}\\left(\\frac{x}{2}\\right)\\cos\\left(\\frac{x}{2}\\right) = \\frac{1}{2}\\operatorname{sen}(x)$.",
            "Simplify first: $\\sin\\left(\\frac{x}{2}\\right)\\cos\\left(\\frac{x}{2}\\right) = \\frac{1}{2}\\sin(x)$.",
          ),
          L(
            "Necesitas $\\frac{1}{2}\\operatorname{sen}(x) > \\frac{1}{4}$, es decir $\\operatorname{sen}(x) > \\frac{1}{2}$.",
            "You need $\\frac{1}{2}\\sin(x) > \\frac{1}{4}$, i.e. $\\sin(x) > \\frac{1}{2}$.",
          ),
        ],
        answerDisplay: L(
          `$A_{p(x)} = \\left(\\frac{\\pi}{6}, \\frac{5\\pi}{6}\\right)$`,
          `$A_{p(x)} = \\left(\\frac{\\pi}{6}, \\frac{5\\pi}{6}\\right)$`,
        ),
        solution: [
          step(
            "given",
            "$f(x) = \\ln\\left(\\operatorname{sen}\\left(\\frac{x}{2}\\right)\\cos\\left(\\frac{x}{2}\\right) - \\frac{1}{4}\\right)$, con $x \\in [0, 2\\pi]$.",
            "$f(x) = \\ln\\left(\\sin\\left(\\frac{x}{2}\\right)\\cos\\left(\\frac{x}{2}\\right) - \\frac{1}{4}\\right)$, with $x \\in [0, 2\\pi]$.",
          ),
          step(
            "approach",
            "La condición de realidad del logaritmo es una desigualdad estricta sobre su argumento; el producto de ángulo medio es medio seno doble, y la desigualdad se lee directo en la circunferencia.",
            "The reality condition for the logarithm is a strict inequality on its argument; the half-angle product is half a double sine, and the inequality reads directly off the unit circle.",
          ),
          step(
            "calculation",
            `$\\operatorname{sen}\\left(\\frac{x}{2}\\right)\\cos\\left(\\frac{x}{2}\\right) = \\frac{1}{2}\\operatorname{sen}(x)$<br>$\\frac{1}{2}\\operatorname{sen}(x) - \\frac{1}{4} > 0 \\Leftrightarrow \\operatorname{sen}(x) > \\frac{1}{2}$<br>En $[0, 2\\pi]$: $x \\in \\left(\\frac{\\pi}{6}, \\frac{5\\pi}{6}\\right)$`,
            `$\\sin\\left(\\frac{x}{2}\\right)\\cos\\left(\\frac{x}{2}\\right) = \\frac{1}{2}\\sin(x)$<br>$\\frac{1}{2}\\sin(x) - \\frac{1}{4} > 0 \\Leftrightarrow \\sin(x) > \\frac{1}{2}$<br>On $[0, 2\\pi]$: $x \\in \\left(\\frac{\\pi}{6}, \\frac{5\\pi}{6}\\right)$`,
          ),
          step(
            "result",
            `El conjunto de verdad es $\\left(\\frac{\\pi}{6}, \\frac{5\\pi}{6}\\right)$, abierto por la desigualdad estricta: en los extremos el argumento del logaritmo valdría $0$ y $\\ln(0)$ no existe. Comprobación con $x = \\frac{\\pi}{2}$: $\\frac{1}{2} - \\frac{1}{4} = \\frac{1}{4} > 0$ ✓.`,
            `The truth set is $\\left(\\frac{\\pi}{6}, \\frac{5\\pi}{6}\\right)$, open due to the strict inequality: at the endpoints the logarithm's argument would be $0$ and $\\ln(0)$ does not exist. Check with $x = \\frac{\\pi}{2}$: $\\frac{1}{2} - \\frac{1}{4} = \\frac{1}{4} > 0$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 5.6 · 57b — domain of g(x) = 1/√(cos⁴x − cos²x + sen²x) on [0, 2π] */
  template(
    {
      id: "trigf-espol-57b",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "simplification",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 420,
      tags: ["domain", "square-root", "pythagorean", "perfect-square"],
      prerequisites: ["trig-functions"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5.6 · 57b",
        page: 670,
      },
      reasoning: "multi-concept",
    },
    () => {
      const options: McOption[] = [
        { id: "a", text: L(`$(0, 2\\pi) \\smallsetminus \\{\\pi\\}$`, `$(0, 2\\pi) \\smallsetminus \\{\\pi\\}$`), correct: true },
        { id: "b", text: L(`$[0, 2\\pi]$`, `$[0, 2\\pi]$`), correct: false },
        { id: "c", text: L(`$(0, 2\\pi) \\smallsetminus \\left\\{\\frac{\\pi}{2}\\right\\}$`, `$(0, 2\\pi) \\smallsetminus \\left\\{\\frac{\\pi}{2}\\right\\}$`), correct: false },
        { id: "d", text: L(`$\\varnothing$`, `$\\varnothing$`), correct: false },
      ];
      return {
        skill: L("Un trinomio que es un cuadrado perfecto disfrazado", "A trinomial that is a perfect square in disguise"),
        statement: L(
          `Sea $g(x) = \\dfrac{1}{\\sqrt{\\cos^4 x - \\cos^2 x + \\operatorname{sen}^2 x}}$. Determina el conjunto de verdad de $q(x):\\ g(x)$ es un número real, con $x \\in [0, 2\\pi]$.`,
          `Let $g(x) = \\dfrac{1}{\\sqrt{\\cos^4 x - \\cos^2 x + \\sin^2 x}}$. Determine the truth set of $q(x):\\ g(x)$ is a real number, with $x \\in [0, 2\\pi]$.`,
        ),
        answer: { kind: "multiple-choice", options },
        hints: [
          L(
            "Necesitas que el radicando sea estrictamente positivo (es un denominador).",
            "You need the radicand to be strictly positive (it is a denominator).",
          ),
          L(
            "Sustituye $\\operatorname{sen}^2 x = 1 - \\cos^2 x$ dentro del trinomio.",
            "Substitute $\\sin^2 x = 1 - \\cos^2 x$ inside the trinomial.",
          ),
          L(
            "Con $u = \\cos^2 x$: $u^2 - 2u + 1 = (u - 1)^2 = (1 - \\cos^2 x)^2 = \\operatorname{sen}^4 x$.",
            "With $u = \\cos^2 x$: $u^2 - 2u + 1 = (u - 1)^2 = (1 - \\cos^2 x)^2 = \\sin^4 x$.",
          ),
        ],
        answerDisplay: L(
          `$A_{q(x)} = (0, 2\\pi) \\smallsetminus \\{\\pi\\}$`,
          `$A_{q(x)} = (0, 2\\pi) \\smallsetminus \\{\\pi\\}$`,
        ),
        solution: [
          step(
            "given",
            "$g(x) = \\dfrac{1}{\\sqrt{\\cos^4 x - \\cos^2 x + \\operatorname{sen}^2 x}}$, con $x \\in [0, 2\\pi]$.",
            "$g(x) = \\dfrac{1}{\\sqrt{\\cos^4 x - \\cos^2 x + \\sin^2 x}}$, with $x \\in [0, 2\\pi]$.",
          ),
          step(
            "approach",
            "La condición es que el radicando sea $> 0$ (denominador). El trinomio parece depender de dos funciones, pero la identidad pitagórica lo convierte en un cuadrado perfecto.",
            "The condition is that the radicand be $> 0$ (a denominator). The trinomial seems to involve two functions, but the Pythagorean identity turns it into a perfect square.",
          ),
          step(
            "calculation",
            `$\\cos^4 x - \\cos^2 x + \\operatorname{sen}^2 x = \\cos^4 x - \\cos^2 x + (1 - \\cos^2 x)$<br>$= \\cos^4 x - 2\\cos^2 x + 1 = (1 - \\cos^2 x)^2 = \\operatorname{sen}^4 x$<br>$\\operatorname{sen}^4 x > 0 \\Leftrightarrow \\operatorname{sen} x \\ne 0 \\Leftrightarrow x \\notin \\{0, \\pi, 2\\pi\\}$`,
            `$\\cos^4 x - \\cos^2 x + \\sin^2 x = \\cos^4 x - \\cos^2 x + (1 - \\cos^2 x)$<br>$= \\cos^4 x - 2\\cos^2 x + 1 = (1 - \\cos^2 x)^2 = \\sin^4 x$<br>$\\sin^4 x > 0 \\Leftrightarrow \\sin x \\ne 0 \\Leftrightarrow x \\notin \\{0, \\pi, 2\\pi\\}$`,
          ),
          step(
            "result",
            `Dentro de $[0, 2\\pi]$ se excluyen $0$, $\\pi$ y $2\\pi$, así que $A_{q(x)} = (0, 2\\pi) \\smallsetminus \\{\\pi\\}$. La sorpresa: la expresión original parecía exigir mucho más, pero $g(x) = \\frac{1}{\\operatorname{sen}^2 x}$ donde existe.`,
            `Inside $[0, 2\\pi]$ we exclude $0$, $\\pi$ and $2\\pi$, so $A_{q(x)} = (0, 2\\pi) \\smallsetminus \\{\\pi\\}$. The surprise: the original expression looked far more demanding, but $g(x) = \\frac{1}{\\sin^2 x}$ wherever it exists.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Cap. 4 «Trigonometría» (ed. digital) — ronda 1 en funciones:      */
  /* modelización sinusoidal (15, 17, 19), trig. inversa (20-22) y la  */
  /* forma armónica R·cos(x−α) (48). Clave impresa + sympy:            */
  /* download/verify_espol_ch4.py.                                      */
  /* ---------------------------------------------------------------- */

  /* 4 · 15 — y = p + q·cos(x) por (0, 3) y (π, −1) → p = 1, q = 2,
     p² − q² = −3. La opción impresa «p + q = −3» se descarta para
     respetar la regla de casa de exactamente 4 opciones. */
  template(
    {
      id: "trigfn-espol-ch4-15",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "amplitude",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["sinusoid", "parameters", "points-on-graph"],
      prerequisites: ["amplitude"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "4 · 15",
        page: 468,
      },
      reasoning: "parameters",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$p^{2} - q^{2} = -3$`, `$p^{2} - q^{2} = -3$`), correct: true },
        { id: "b", text: L(`$p^{2} + q^{2} = 9$`, `$p^{2} + q^{2} = 9$`), correct: false },
        { id: "c", text: L(`$p^{2} - q^{2} = 3$`, `$p^{2} - q^{2} = 3$`), correct: false },
        { id: "d", text: L(`$p^{2} - q^{2} = -9$`, `$p^{2} - q^{2} = -9$`), correct: false },
      ];
      return {
        skill: L(
          "Parámetros de una sinusoidal a partir de dos puntos",
          "Parameters of a sinusoid from two points",
        ),
        statement: L(
          `Parte de la gráfica de $y = p + q\\cos(x)$ contiene los puntos $(0, 3)$ y $(\\pi, -1)$. Determine cuál de los siguientes enunciados es verdadero:`,
          `Part of the graph of $y = p + q\\cos(x)$ contains the points $(0, 3)$ and $(\\pi, -1)$. Determine which of the following statements is true:`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "En $x = 0$ el coseno vale $1$ y en $x = \\pi$ vale $-1$: sustituye cada punto en $y = p + q\\cos(x)$.",
            "At $x = 0$ the cosine equals $1$ and at $x = \\pi$ it equals $-1$: substitute each point into $y = p + q\\cos(x)$.",
          ),
          L(
            "Los dos puntos dan un sistema lineal $2 \\times 2$ en $p$ y $q$; súmalo y réstalo para despejar ambos parámetros.",
            "The two points give a $2 \\times 2$ linear system in $p$ and $q$; add and subtract it to solve for both parameters.",
          ),
          L(
            "Con $p$ y $q$ ya conocidos, sustituye en cada enunciado candidato: solo uno es una igualdad numérica verdadera.",
            "With $p$ and $q$ known, substitute into each candidate statement: only one is a true numerical equality.",
          ),
        ],
        answerDisplay: L(
          `Con $p = 1$ y $q = 2$: $p^{2} - q^{2} = 1 - 4 = -3$`,
          `With $p = 1$ and $q = 2$: $p^{2} - q^{2} = 1 - 4 = -3$`,
        ),
        solution: [
          step(
            "given",
            "La gráfica de $y = p + q\\cos(x)$ pasa por $(0, 3)$ y $(\\pi, -1)$.",
            "The graph of $y = p + q\\cos(x)$ passes through $(0, 3)$ and $(\\pi, -1)$.",
          ),
          step(
            "approach",
            "Los dos puntos son un máximo y un mínimo del coseno: al sustituirlos, $q$ aparece con signos opuestos y el sistema lineal resultante se resuelve de inmediato.",
            "The two points are a maximum and a minimum of the cosine: substituting them makes $q$ appear with opposite signs, and the resulting linear system solves at once.",
          ),
          step(
            "calculation",
            `$x = 0:\\ p + q\\cos(0) = p + q = 3$<br>$x = \\pi:\\ p + q\\cos(\\pi) = p - q = -1$<br>Sumando: $2p = 2 \\Rightarrow p = 1$; restando: $2q = 4 \\Rightarrow q = 2$<br>$p^{2} - q^{2} = 1^{2} - 2^{2} = 1 - 4 = -3$`,
            `$x = 0:\\ p + q\\cos(0) = p + q = 3$<br>$x = \\pi:\\ p + q\\cos(\\pi) = p - q = -1$<br>Adding: $2p = 2 \\Rightarrow p = 1$; subtracting: $2q = 4 \\Rightarrow q = 2$<br>$p^{2} - q^{2} = 1^{2} - 2^{2} = 1 - 4 = -3$`,
          ),
          step(
            "result",
            `El enunciado verdadero es $p^{2} - q^{2} = -3$. Comprobación con la curva recuperada $y = 1 + 2\\cos(x)$: $y(0) = 1 + 2 = 3$ ✓ y $y(\\pi) = 1 - 2 = -1$ ✓ (las demás opciones fallan: $p^{2} + q^{2} = 5 \\ne 9$).`,
            `The true statement is $p^{2} - q^{2} = -3$. Check with the recovered curve $y = 1 + 2\\cos(x)$: $y(0) = 1 + 2 = 3$ ✓ and $y(\\pi) = 1 - 2 = -1$ ✓ (the other options fail: $p^{2} + q^{2} = 5 \\ne 9$).`,
          ),
        ],
      };
    },
  ),

  /* 4 · 17 — senoidal f(x) = p + q·sen(kx): período 4π, mínimo 3,
     máximo 11 → (p, q, k) = (7, 4, 1/2) */
  template(
    {
      id: "trigfn-espol-ch4-17",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "amplitude",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["sinusoid", "period", "parameters"],
      prerequisites: ["amplitude", "period"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "4 · 17",
        page: 469,
      },
      reasoning: "parameters",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\left(7, 4, \\dfrac{1}{2}\\right)$`, `$\\left(7, 4, \\dfrac{1}{2}\\right)$`), correct: true },
        { id: "b", text: L(`$\\left(7, 4, 2\\right)$`, `$\\left(7, 4, 2\\right)$`), correct: false },
        { id: "c", text: L(`$\\left(7, 8, \\dfrac{1}{2}\\right)$`, `$\\left(7, 8, \\dfrac{1}{2}\\right)$`), correct: false },
        { id: "d", text: L(`$\\left(14, 4, \\dfrac{1}{2}\\right)$`, `$\\left(14, 4, \\dfrac{1}{2}\\right)$`), correct: false },
      ];
      return {
        skill: L(
          "Línea media, amplitud y frecuencia de una senoidal",
          "Midline, amplitude and frequency of a sinusoid",
        ),
        statement: L(
          `El diagrama muestra parte de la gráfica de una curva senoidal $f(x) = p + q\\,\\operatorname{sen}(kx)$. El período es $4\\pi$, el valor mínimo es 3 y el valor máximo es 11. Halle el valor de $(p, q, k)$.`,
          `The diagram shows part of the graph of a sinusoidal curve $f(x) = p + q\\,\\sin(kx)$. The period is $4\\pi$, the minimum value is 3 and the maximum value is 11. Find the value of $(p, q, k)$.`,
        ),
        diagram: {
          kind: "function-graph",
          xMin: 0,
          xMax: 12.6,
          yMin: 0,
          yMax: 12,
          curves: [{ fn: "7 + 4*sin(x/2)", color: "primary" }],
          points: [
            { x: Math.PI, y: 11, label: "(π, 11)" },
            { x: 3 * Math.PI, y: 3, label: "(3π, 3)" },
          ],
          showGrid: true,
          xLabel: "x",
          yLabel: "f(x)",
        },
        diagramLabel: L(
          "Curva senoidal: máximo 11 en x = π y mínimo 3 en x = 3π (un período completo mide 4π).",
          "Sinusoidal curve: maximum 11 at x = π and minimum 3 at x = 3π (a full period measures 4π).",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "La línea media es el promedio del máximo y el mínimo, y la amplitud es la mitad del recorrido total: de ahí salen $p$ y $q$.",
            "The midline is the average of the maximum and the minimum, and the amplitude is half the total swing: that gives $p$ and $q$.",
          ),
          L(
            "Para $k$ usa el período: un ciclo completo ocurre cuando $kx$ recorre $2\\pi$, así que $\\frac{2\\pi}{k} = 4\\pi$.",
            "For $k$ use the period: a full cycle happens when $kx$ covers $2\\pi$, so $\\frac{2\\pi}{k} = 4\\pi$.",
          ),
          L(
            "Comprueba tu triple con un punto del diagrama: la curva alcanza su máximo 11 exactamente en $x = \\pi$.",
            "Check your triple with a point from the diagram: the curve reaches its maximum 11 exactly at $x = \\pi$.",
          ),
        ],
        answerDisplay: L(
          `$(p, q, k) = \\left(7, 4, \\dfrac{1}{2}\\right)$`,
          `$(p, q, k) = \\left(7, 4, \\dfrac{1}{2}\\right)$`,
        ),
        solution: [
          step(
            "given",
            "Curva senoidal $f(x) = p + q\\,\\operatorname{sen}(kx)$ con período $4\\pi$, valor mínimo 3 y valor máximo 11.",
            "Sinusoidal curve $f(x) = p + q\\,\\sin(kx)$ with period $4\\pi$, minimum value 3 and maximum value 11.",
          ),
          step(
            "approach",
            "De los extremos salen la línea media $p$ y la amplitud $q$; del período sale la frecuencia $k$ mediante $\\frac{2\\pi}{k} = 4\\pi$.",
            "The extremes give the midline $p$ and the amplitude $q$; the period gives the frequency $k$ through $\\frac{2\\pi}{k} = 4\\pi$.",
          ),
          step(
            "calculation",
            `$p = \\dfrac{3 + 11}{2} = 7$<br>$q = \\dfrac{11 - 3}{2} = 4$<br>$\\dfrac{2\\pi}{k} = 4\\pi \\Rightarrow k = \\dfrac{2\\pi}{4\\pi} = \\dfrac{1}{2}$`,
            `$p = \\dfrac{3 + 11}{2} = 7$<br>$q = \\dfrac{11 - 3}{2} = 4$<br>$\\dfrac{2\\pi}{k} = 4\\pi \\Rightarrow k = \\dfrac{2\\pi}{4\\pi} = \\dfrac{1}{2}$`,
          ),
          step(
            "result",
            `$(p, q, k) = \\left(7, 4, \\dfrac{1}{2}\\right)$. Comprobación con el máximo del diagrama: $f(\\pi) = 7 + 4\\,\\operatorname{sen}\\left(\\dfrac{\\pi}{2}\\right) = 7 + 4 = 11$ ✓ (con $k = 2$ el máximo aparecería en $x = \\dfrac{\\pi}{4}$, y con $q = 8$ el máximo sería 15).`,
            `$(p, q, k) = \\left(7, 4, \\dfrac{1}{2}\\right)$. Check with the diagram's maximum: $f(\\pi) = 7 + 4\\,\\sin\\left(\\dfrac{\\pi}{2}\\right) = 7 + 4 = 11$ ✓ (with $k = 2$ the maximum would appear at $x = \\dfrac{\\pi}{4}$, and with $q = 8$ the maximum would be 15).`,
          ),
        ],
      };
    },
  ),

  /* 4 · 19a — marea de Tahiti h(t) = a·cos(bt) + 3 → a = 3/2, b = π/4 */
  template(
    {
      id: "trigfn-espol-ch4-19a",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "amplitude",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["modeling", "tides", "amplitude", "period"],
      prerequisites: ["amplitude", "period"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "4 · 19a",
        page: 470,
      },
      reasoning: "modeling",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\left(\\dfrac{3}{2}, \\dfrac{\\pi}{4}\\right)$`, `$\\left(\\dfrac{3}{2}, \\dfrac{\\pi}{4}\\right)$`), correct: true },
        { id: "b", text: L(`$\\left(2, \\dfrac{\\pi}{4}\\right)$`, `$\\left(2, \\dfrac{\\pi}{4}\\right)$`), correct: false },
        { id: "c", text: L(`$\\left(\\dfrac{3}{2}, \\dfrac{\\pi}{2}\\right)$`, `$\\left(\\dfrac{3}{2}, \\dfrac{\\pi}{2}\\right)$`), correct: false },
        { id: "d", text: L(`$\\left(\\dfrac{1}{2}, \\dfrac{\\pi}{4}\\right)$`, `$\\left(\\dfrac{1}{2}, \\dfrac{\\pi}{4}\\right)$`), correct: false },
      ];
      return {
        skill: L(
          "Mareas: amplitud y frecuencia desde la gráfica",
          "Tides: amplitude and frequency from the graph",
        ),
        statement: L(
          `La gráfica muestra la altura $h$ de las mareas, en metros, a las $t$ horas pasadas la media noche en la isla de Tahiti: máximo de $4{,}5$ m en $t = 0$, mínimo de $1{,}5$ m y período de 8 horas. La altura puede modelarse con $h(t) = a\\cos(bt) + 3$. Use la gráfica para hallar $(a, b)$.`,
          `The graph shows the height $h$ of the tides, in meters, $t$ hours after midnight on the island of Tahiti: maximum of 4.5 m at $t = 0$, minimum of 1.5 m, and an 8-hour period. The height can be modeled with $h(t) = a\\cos(bt) + 3$. Use the graph to find $(a, b)$.`,
        ),
        diagram: {
          kind: "function-graph",
          xMin: 0,
          xMax: 16,
          yMin: 0,
          yMax: 6,
          curves: [{ fn: "1.5*cos(pi*x/4)+3", color: "primary" }],
          points: [
            { x: 0, y: 4.5, label: "(0, 4.5)" },
            { x: 4, y: 1.5, label: "(4, 1.5)" },
            { x: 12, y: 1.5, label: "(12, 1.5)" },
          ],
          showGrid: true,
          xLabel: "t (h)",
          yLabel: "h (m)",
        },
        diagramLabel: L(
          "Marea en Tahiti: máximo 4,5 m a la media noche, mínimo 1,5 m, período 8 horas.",
          "Tahiti tide: maximum 4.5 m at midnight, minimum 1.5 m, 8-hour period.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "La línea media ya está dada: $y = 3$. La amplitud $|a|$ es la distancia del máximo a la línea media.",
            "The midline is already given: $y = 3$. The amplitude $|a|$ is the distance from the maximum to the midline.",
          ),
          L(
            "El máximo ocurre en $t = 0$, donde $\\cos(bt) = \\cos(0) = 1$: eso fija el valor (y el signo) de $a$ con la altura máxima.",
            "The maximum occurs at $t = 0$, where $\\cos(bt) = \\cos(0) = 1$: that fixes the value (and sign) of $a$ from the maximum height.",
          ),
          L(
            "Para $b$ usa el período: de un máximo al siguiente pasan 8 horas, así que $\\frac{2\\pi}{b} = 8$.",
            "For $b$ use the period: from one maximum to the next 8 hours elapse, so $\\frac{2\\pi}{b} = 8$.",
          ),
        ],
        answerDisplay: L(
          `$a = \\dfrac{3}{2}$ (amplitud) y $b = \\dfrac{\\pi}{4}$ (período de 8 horas)`,
          `$a = \\dfrac{3}{2}$ (amplitude) and $b = \\dfrac{\\pi}{4}$ (8-hour period)`,
        ),
        solution: [
          step(
            "given",
            "Marea de Tahiti modelada por $h(t) = a\\cos(bt) + 3$, con línea media $y = 3$: máximo $4{,}5$ m en $t = 0$, mínimo $1{,}5$ m y período de 8 horas.",
            "Tahiti tide modeled by $h(t) = a\\cos(bt) + 3$, with midline $y = 3$: maximum $4.5$ m at $t = 0$, minimum $1.5$ m, and an 8-hour period.",
          ),
          step(
            "approach",
            "El máximo en $t = 0$ determina $a$ (allí $\\cos(0) = 1$) y el período determina $b$ mediante $\\frac{2\\pi}{b} = 8$.",
            "The maximum at $t = 0$ determines $a$ (there $\\cos(0) = 1$) and the period determines $b$ through $\\frac{2\\pi}{b} = 8$.",
          ),
          step(
            "calculation",
            `$a = 4{,}5 - 3 = 1{,}5 = \\dfrac{3}{2}$ (máximo en $t = 0$: $\\cos(0) = 1$)<br>$\\dfrac{2\\pi}{b} = 8 \\Rightarrow b = \\dfrac{2\\pi}{8} = \\dfrac{\\pi}{4}$`,
            `$a = 4.5 - 3 = 1.5 = \\dfrac{3}{2}$ (maximum at $t = 0$: $\\cos(0) = 1$)<br>$\\dfrac{2\\pi}{b} = 8 \\Rightarrow b = \\dfrac{2\\pi}{8} = \\dfrac{\\pi}{4}$`,
          ),
          step(
            "result",
            `$(a, b) = \\left(\\dfrac{3}{2}, \\dfrac{\\pi}{4}\\right)$. Comprobación con los mínimos marcados en la gráfica: $h(4) = \\dfrac{3}{2}\\cos(\\pi) + 3 = 1{,}5$ ✓ y $h(12) = \\dfrac{3}{2}\\cos(3\\pi) + 3 = 1{,}5$ ✓ (el mínimo se repite cada 8 horas).`,
            `$(a, b) = \\left(\\dfrac{3}{2}, \\dfrac{\\pi}{4}\\right)$. Check with the minima marked on the graph: $h(4) = \\dfrac{3}{2}\\cos(\\pi) + 3 = 1.5$ ✓ and $h(12) = \\dfrac{3}{2}\\cos(3\\pi) + 3 = 1.5$ ✓ (the minimum repeats every 8 hours).`,
          ),
        ],
      };
    },
  ),

  /* 4 · 19b — h(13) = 3 − 3√2/4 ≈ 1,94 m */
  template(
    {
      id: "trigfn-espol-ch4-19b",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "amplitude",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 240,
      tags: ["modeling", "tides", "evaluation"],
      prerequisites: ["amplitude", "period"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "4 · 19b",
        page: 470,
      },
      reasoning: "modeling",
    },
    () => ({
      skill: L(
        "Evaluar el modelo de marea en un instante dado",
        "Evaluating the tide model at a given instant",
      ),
      statement: L(
        `Con el modelo de marea de la parte anterior, $h(t) = \\dfrac{3}{2}\\cos\\left(\\dfrac{\\pi}{4}t\\right) + 3$, calcule la altura de la marea a las 13:00 (en metros, redondeada a dos decimales).`,
        `With the tide model from the previous part, $h(t) = \\dfrac{3}{2}\\cos\\left(\\dfrac{\\pi}{4}t\\right) + 3$, compute the height of the tide at 13:00 (in meters, rounded to two decimals).`,
      ),
      answer: {
        kind: "numeric-unit",
        value: 1.94,
        tolerance: { mode: "relative", value: 0.02 },
        units: ["m", "metros", "meters"],
        unitChoices: ["m", "cm", "km", "m2", "m3"],
      },
      hints: [
        L(
          "Las 13:00 corresponden a $t = 13$ horas pasadas la media noche: sustituye para obtener $h(13) = \\dfrac{3}{2}\\cos\\left(\\dfrac{13\\pi}{4}\\right) + 3$.",
          "13:00 corresponds to $t = 13$ hours after midnight: substitute to get $h(13) = \\dfrac{3}{2}\\cos\\left(\\dfrac{13\\pi}{4}\\right) + 3$.",
        ),
        L(
          "El argumento $\\dfrac{13\\pi}{4}$ supera $2\\pi$: réstale $2\\pi$ (una marea completa, 8 horas) sin cambiar el coseno.",
          "The argument $\\dfrac{13\\pi}{4}$ exceeds $2\\pi$: subtract $2\\pi$ (a full tide cycle, 8 hours) without changing the cosine.",
        ),
        L(
          "Queda un ángulo notable del tercer cuadrante, con coseno negativo; multiplica por $\\dfrac{3}{2}$ y suma 3.",
          "What remains is a notable third-quadrant angle with a negative cosine; multiply by $\\dfrac{3}{2}$ and add 3.",
        ),
      ],
      answerDisplay: L(
        `$h(13) = 3 - \\dfrac{3\\sqrt{2}}{4} \\approx 1{,}94$ m`,
        `$h(13) = 3 - \\dfrac{3\\sqrt{2}}{4} \\approx 1.94$ m`,
      ),
      solution: [
        step(
          "given",
          "Modelo de marea $h(t) = \\dfrac{3}{2}\\cos\\left(\\dfrac{\\pi}{4}t\\right) + 3$; se pide la altura a las 13:00, es decir $h(13)$.",
          "Tide model $h(t) = \\dfrac{3}{2}\\cos\\left(\\dfrac{\\pi}{4}t\\right) + 3$; the height at 13:00 is requested, i.e. $h(13)$.",
        ),
        step(
          "approach",
          "Evaluar $h(13)$ reduciendo antes el argumento $\\dfrac{13\\pi}{4}$ con el período $2\\pi$ del coseno.",
          "Evaluate $h(13)$ by first reducing the argument $\\dfrac{13\\pi}{4}$ using the cosine's $2\\pi$ period.",
        ),
        step(
          "calculation",
          `$\\dfrac{13\\pi}{4} - 2\\pi = \\dfrac{13\\pi - 8\\pi}{4} = \\dfrac{5\\pi}{4}$<br>$h(13) = \\dfrac{3}{2}\\cos\\left(\\dfrac{5\\pi}{4}\\right) + 3 = \\dfrac{3}{2}\\left(-\\dfrac{\\sqrt{2}}{2}\\right) + 3 = 3 - \\dfrac{3\\sqrt{2}}{4} \\approx 1{,}94$`,
          `$\\dfrac{13\\pi}{4} - 2\\pi = \\dfrac{13\\pi - 8\\pi}{4} = \\dfrac{5\\pi}{4}$<br>$h(13) = \\dfrac{3}{2}\\cos\\left(\\dfrac{5\\pi}{4}\\right) + 3 = \\dfrac{3}{2}\\left(-\\dfrac{\\sqrt{2}}{2}\\right) + 3 = 3 - \\dfrac{3\\sqrt{2}}{4} \\approx 1.94$`,
        ),
        step(
          "result",
          `A las 13:00 la marea mide $3 - \\dfrac{3\\sqrt{2}}{4} \\approx 1{,}94$ m. Comprobación: las 13:00 están una hora después del mínimo de las 12:00, donde $h(12) = \\dfrac{3}{2}\\cos(3\\pi) + 3 = 1{,}5$ ✓, y el nivel ya sube hacia la línea media: $1{,}5 < 1{,}94 < 3$ ✓.`,
          `At 13:00 the tide measures $3 - \\dfrac{3\\sqrt{2}}{4} \\approx 1.94$ m. Check: 13:00 is one hour after the 12:00 minimum, where $h(12) = \\dfrac{3}{2}\\cos(3\\pi) + 3 = 1.5$ ✓, and the level is already rising toward the midline: $1.5 < 1.94 < 3$ ✓.`,
        ),
      ],
    }),
  ),

  /* 4 · 20 — sen(2π/3) + tan(5π/3) = −√3/2 */
  template(
    {
      id: "trigfn-espol-ch4-20",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "inverse-trig",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 270,
      tags: ["inverse-trig", "exact-values", "quadrants"],
      prerequisites: ["inverse-trig"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "4 · 20",
        page: 470,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$-\\dfrac{\\sqrt{3}}{2}$`, `$-\\dfrac{\\sqrt{3}}{2}$`), correct: true },
        { id: "b", text: L(`$\\dfrac{\\sqrt{3}}{2}$`, `$\\dfrac{\\sqrt{3}}{2}$`), correct: false },
        { id: "c", text: L(`$-\\sqrt{3}$`, `$-\\sqrt{3}$`), correct: false },
        { id: "d", text: L(`$0$`, `$0$`), correct: false },
      ];
      return {
        skill: L(
          "Arcos con rangos no principales: valores exactos",
          "Arcs with non-principal ranges: exact values",
        ),
        statement: L(
          `Sea $\\alpha = \\arccos\\left(-\\dfrac{1}{2}\\right)$, con $\\dfrac{\\pi}{2} < \\alpha < \\pi$, y $\\beta = \\operatorname{arcsen}\\left(-\\dfrac{\\sqrt{3}}{2}\\right)$, con $\\dfrac{3\\pi}{2} < \\beta < 2\\pi$. Encuentre el valor de $\\operatorname{sen}(\\alpha) + \\tan(\\beta)$.`,
          `Let $\\alpha = \\arccos\\left(-\\dfrac{1}{2}\\right)$, with $\\dfrac{\\pi}{2} < \\alpha < \\pi$, and $\\beta = \\arcsin\\left(-\\dfrac{\\sqrt{3}}{2}\\right)$, with $\\dfrac{3\\pi}{2} < \\beta < 2\\pi$. Find the value of $\\sin(\\alpha) + \\tan(\\beta)$.`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El intervalo que acompaña a cada arco dice en qué cuadrante vive el ángulo: ahí está toda la información de los signos.",
            "The interval accompanying each arc tells which quadrant the angle lives in: that is where all the sign information lies.",
          ),
          L(
            "Para $\\alpha$: ángulo del segundo cuadrante con coseno $-\\dfrac{1}{2}$ (ángulo de referencia $\\dfrac{\\pi}{3}$). Para $\\beta$: ángulo del cuarto cuadrante con seno $-\\dfrac{\\sqrt{3}}{2}$.",
            "For $\\alpha$: a second-quadrant angle with cosine $-\\dfrac{1}{2}$ (reference angle $\\dfrac{\\pi}{3}$). For $\\beta$: a fourth-quadrant angle with sine $-\\dfrac{\\sqrt{3}}{2}$.",
          ),
          L(
            "Con los dos ángulos hallados, evalúa seno y tangente con valores notables y súmalos; cuida el signo de cada término.",
            "With both angles found, evaluate the sine and tangent with notable values and add them; mind the sign of each term.",
          ),
        ],
        answerDisplay: L(
          `$\\operatorname{sen}\\left(\\dfrac{2\\pi}{3}\\right) + \\tan\\left(\\dfrac{5\\pi}{3}\\right) = \\dfrac{\\sqrt{3}}{2} - \\sqrt{3} = -\\dfrac{\\sqrt{3}}{2}$`,
          `$\\sin\\left(\\dfrac{2\\pi}{3}\\right) + \\tan\\left(\\dfrac{5\\pi}{3}\\right) = \\dfrac{\\sqrt{3}}{2} - \\sqrt{3} = -\\dfrac{\\sqrt{3}}{2}$`,
        ),
        solution: [
          step(
            "given",
            "$\\alpha = \\arccos\\left(-\\frac{1}{2}\\right)$ con $\\frac{\\pi}{2} < \\alpha < \\pi$, y $\\beta = \\operatorname{arcsen}\\left(-\\frac{\\sqrt{3}}{2}\\right)$ con $\\frac{3\\pi}{2} < \\beta < 2\\pi$.",
            "$\\alpha = \\arccos\\left(-\\frac{1}{2}\\right)$ with $\\frac{\\pi}{2} < \\alpha < \\pi$, and $\\beta = \\arcsin\\left(-\\frac{\\sqrt{3}}{2}\\right)$ with $\\frac{3\\pi}{2} < \\beta < 2\\pi$.",
          ),
          step(
            "approach",
            "Los rangos dados no son los principales: hay que identificar los ángulos concretos de esos cuadrantes que cumplen cada condición y luego evaluar con valores notables.",
            "The given ranges are not the principal ones: identify the concrete angles in those quadrants satisfying each condition, then evaluate with notable values.",
          ),
          step(
            "calculation",
            `$\\alpha = \\dfrac{2\\pi}{3}$ (II cuadrante: $\\cos\\alpha = -\\dfrac{1}{2}$)<br>$\\beta = \\dfrac{5\\pi}{3}$ (IV cuadrante: $\\operatorname{sen}\\beta = -\\dfrac{\\sqrt{3}}{2}$)<br>$\\operatorname{sen}\\left(\\dfrac{2\\pi}{3}\\right) = \\dfrac{\\sqrt{3}}{2}$, y $\\tan\\left(\\dfrac{5\\pi}{3}\\right) = \\dfrac{-\\sqrt{3}/2}{1/2} = -\\sqrt{3}$`,
            `$\\alpha = \\dfrac{2\\pi}{3}$ (quadrant II: $\\cos\\alpha = -\\dfrac{1}{2}$)<br>$\\beta = \\dfrac{5\\pi}{3}$ (quadrant IV: $\\sin\\beta = -\\dfrac{\\sqrt{3}}{2}$)<br>$\\sin\\left(\\dfrac{2\\pi}{3}\\right) = \\dfrac{\\sqrt{3}}{2}$, and $\\tan\\left(\\dfrac{5\\pi}{3}\\right) = \\dfrac{-\\sqrt{3}/2}{1/2} = -\\sqrt{3}$`,
          ),
          step(
            "result",
            `El valor es $-\\dfrac{\\sqrt{3}}{2} \\approx -0{,}866$. Comprobación: $\\operatorname{sen}\\left(\\dfrac{2\\pi}{3}\\right) + \\tan\\left(\\dfrac{5\\pi}{3}\\right) = \\dfrac{\\sqrt{3}}{2} - \\sqrt{3} = -\\dfrac{\\sqrt{3}}{2}$ ✓.`,
            `The value is $-\\dfrac{\\sqrt{3}}{2} \\approx -0.866$. Check: $\\sin\\left(\\dfrac{2\\pi}{3}\\right) + \\tan\\left(\\dfrac{5\\pi}{3}\\right) = \\dfrac{\\sqrt{3}}{2} - \\sqrt{3} = -\\dfrac{\\sqrt{3}}{2}$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 4 · 21 — arctan(4/7) con x ∈ (π, 3π/2) → cos x = −7√65/65 */
  template(
    {
      id: "trigfn-espol-ch4-21",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "inverse-trig",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 270,
      tags: ["inverse-trig", "quadrants", "rationalization"],
      prerequisites: ["inverse-trig"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "4 · 21",
        page: 470,
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$-\\dfrac{7\\sqrt{65}}{65}$`, `$-\\dfrac{7\\sqrt{65}}{65}$`), correct: true },
        { id: "b", text: L(`$\\dfrac{7\\sqrt{65}}{65}$`, `$\\dfrac{7\\sqrt{65}}{65}$`), correct: false },
        { id: "c", text: L(`$-\\dfrac{4\\sqrt{65}}{65}$`, `$-\\dfrac{4\\sqrt{65}}{65}$`), correct: false },
        { id: "d", text: L(`$-\\dfrac{\\sqrt{65}}{7}$`, `$-\\dfrac{\\sqrt{65}}{7}$`), correct: false },
      ];
      return {
        skill: L(
          "Arctan en el tercer cuadrante: triángulo de referencia",
          "Arctan in the third quadrant: reference triangle",
        ),
        statement: L(
          `Encuentre el valor de $\\cos(x)$ si $x = \\arctan\\left(\\dfrac{4}{7}\\right)$, $x \\in \\left(\\pi, \\dfrac{3\\pi}{2}\\right)$.`,
          `Find the value of $\\cos(x)$ if $x = \\arctan\\left(\\dfrac{4}{7}\\right)$, $x \\in \\left(\\pi, \\dfrac{3\\pi}{2}\\right)$.`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "La tangente tiene período $\\pi$: el intervalo $\\left(\\pi, \\frac{3\\pi}{2}\\right)$ elige la copia del tercer cuadrante del ángulo cuya tangente es $\\frac{4}{7}$.",
            "The tangent has period $\\pi$: the interval $\\left(\\pi, \\frac{3\\pi}{2}\\right)$ picks the third-quadrant copy of the angle whose tangent is $\\frac{4}{7}$.",
          ),
          L(
            "Construye el triángulo de referencia: cateto opuesto $4$, cateto adyacente $7$; la hipotenusa sale con Pitágoras.",
            "Build the reference triangle: opposite leg $4$, adjacent leg $7$; the hypotenuse comes from Pythagoras.",
          ),
          L(
            "En el tercer cuadrante seno y coseno son negativos; al final racionaliza: $\\dfrac{1}{\\sqrt{65}} = \\dfrac{\\sqrt{65}}{65}$.",
            "In the third quadrant both sine and cosine are negative; rationalize at the end: $\\dfrac{1}{\\sqrt{65}} = \\dfrac{\\sqrt{65}}{65}$.",
          ),
        ],
        answerDisplay: L(
          `$\\cos(x) = -\\dfrac{7}{\\sqrt{65}} = -\\dfrac{7\\sqrt{65}}{65}$`,
          `$\\cos(x) = -\\dfrac{7}{\\sqrt{65}} = -\\dfrac{7\\sqrt{65}}{65}$`,
        ),
        solution: [
          step(
            "given",
            "$x$ con $\\tan(x) = \\dfrac{4}{7}$ y $x \\in \\left(\\pi, \\dfrac{3\\pi}{2}\\right)$ (tercer cuadrante).",
            "$x$ with $\\tan(x) = \\dfrac{4}{7}$ and $x \\in \\left(\\pi, \\dfrac{3\\pi}{2}\\right)$ (third quadrant).",
          ),
          step(
            "approach",
            "Triángulo de referencia para la tangente $\\frac{4}{7}$, signos del tercer cuadrante y racionalización del denominador.",
            "Reference triangle for the tangent $\\frac{4}{7}$, third-quadrant signs, and rationalization of the denominator.",
          ),
          step(
            "calculation",
            `$\\text{hipotenusa} = \\sqrt{4^{2} + 7^{2}} = \\sqrt{16 + 49} = \\sqrt{65}$<br>$|\\cos(x)| = \\dfrac{7}{\\sqrt{65}}$; en el III cuadrante $\\cos(x) < 0$<br>$\\cos(x) = -\\dfrac{7}{\\sqrt{65}} = -\\dfrac{7\\sqrt{65}}{65}$`,
            `$\\text{hypotenuse} = \\sqrt{4^{2} + 7^{2}} = \\sqrt{16 + 49} = \\sqrt{65}$<br>$|\\cos(x)| = \\dfrac{7}{\\sqrt{65}}$; in quadrant III $\\cos(x) < 0$<br>$\\cos(x) = -\\dfrac{7}{\\sqrt{65}} = -\\dfrac{7\\sqrt{65}}{65}$`,
          ),
          step(
            "result",
            `$\\cos(x) = -\\dfrac{7\\sqrt{65}}{65} \\approx -0{,}868$. Comprobación: $\\tan(x) = \\dfrac{\\operatorname{sen}(x)}{\\cos(x)} = \\dfrac{-4/\\sqrt{65}}{-7/\\sqrt{65}} = \\dfrac{4}{7}$ ✓, con $x = \\pi + \\arctan\\left(\\frac{4}{7}\\right) \\approx 3{,}66$ rad dentro de $\\left(\\pi, \\frac{3\\pi}{2}\\right)$ ✓.`,
            `$\\cos(x) = -\\dfrac{7\\sqrt{65}}{65} \\approx -0.868$. Check: $\\tan(x) = \\dfrac{\\sin(x)}{\\cos(x)} = \\dfrac{-4/\\sqrt{65}}{-7/\\sqrt{65}} = \\dfrac{4}{7}$ ✓, with $x = \\pi + \\arctan\\left(\\frac{4}{7}\\right) \\approx 3.66$ rad inside $\\left(\\pi, \\frac{3\\pi}{2}\\right)$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 4 · 22a — cos(arcsen x) = √(1−x²) */
  template(
    {
      id: "trigfn-espol-ch4-22a",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "inverse-trig",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["inverse-trig", "reference-triangle", "simplification"],
      prerequisites: ["inverse-trig"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "4 · 22a",
        page: 470,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\sqrt{1 - x^{2}}$`, `$\\sqrt{1 - x^{2}}$`), correct: true },
        { id: "b", text: L(`$1 - x^{2}$`, `$1 - x^{2}$`), correct: false },
        { id: "c", text: L(`$\\sqrt{1 + x^{2}}$`, `$\\sqrt{1 + x^{2}}$`), correct: false },
        { id: "d", text: L(`$-\\sqrt{1 - x^{2}}$`, `$-\\sqrt{1 - x^{2}}$`), correct: false },
      ];
      return {
        skill: L(
          "Coseno de un arcseno: triángulo de referencia",
          "Cosine of an arcsine: reference triangle",
        ),
        statement: L(
          `Simplificar: $\\cos\\left(\\operatorname{arcsen}(x)\\right)$`,
          `Simplify: $\\cos\\left(\\arcsin(x)\\right)$`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Nombra el arco: $\\theta = \\operatorname{arcsen}(x)$ significa $\\operatorname{sen}(\\theta) = x$ con $\\theta \\in \\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]$.",
            "Name the arc: $\\theta = \\arcsin(x)$ means $\\sin(\\theta) = x$ with $\\theta \\in \\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]$.",
          ),
          L(
            "Dibuja el triángulo de referencia: hipotenusa $1$ y cateto opuesto $x$; el cateto adyacente sale por Pitágoras.",
            "Draw the reference triangle: hypotenuse $1$ and opposite leg $x$; the adjacent leg comes from Pythagoras.",
          ),
          L(
            "El rango de $\\operatorname{arcsen}$ garantiza $\\cos(\\theta) \\ge 0$: elige el signo de la raíz en consecuencia.",
            "The range of $\\arcsin$ guarantees $\\cos(\\theta) \\ge 0$: choose the sign of the root accordingly.",
          ),
        ],
        answerDisplay: L(
          `$\\cos\\left(\\operatorname{arcsen}(x)\\right) = \\sqrt{1 - x^{2}}$`,
          `$\\cos\\left(\\arcsin(x)\\right) = \\sqrt{1 - x^{2}}$`,
        ),
        solution: [
          step(
            "given",
            "$\\cos\\left(\\operatorname{arcsen}(x)\\right)$, con $\\operatorname{arcsen}(x) \\in \\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]$.",
            "$\\cos\\left(\\arcsin(x)\\right)$, with $\\arcsin(x) \\in \\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]$.",
          ),
          step(
            "approach",
            "Nombrar el arco, dibujar su triángulo de referencia y leer el coseno; el rango de $\\operatorname{arcsen}$ fija el signo.",
            "Name the arc, draw its reference triangle and read off the cosine; the range of $\\arcsin$ fixes the sign.",
          ),
          step(
            "calculation",
            `$\\theta = \\operatorname{arcsen}(x) \\Rightarrow \\operatorname{sen}(\\theta) = x = \\dfrac{x}{1}$<br>Triángulo: opuesto $x$, hipotenusa $1$ $\\Rightarrow$ adyacente $= \\sqrt{1 - x^{2}}$<br>$\\cos(\\theta) = \\dfrac{\\text{adyacente}}{\\text{hipotenusa}} = \\sqrt{1 - x^{2}}$ (positivo: $\\theta \\in \\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]$)`,
            `$\\theta = \\arcsin(x) \\Rightarrow \\sin(\\theta) = x = \\dfrac{x}{1}$<br>Triangle: opposite $x$, hypotenuse $1$ $\\Rightarrow$ adjacent $= \\sqrt{1 - x^{2}}$<br>$\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypotenuse}} = \\sqrt{1 - x^{2}}$ (positive: $\\theta \\in \\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]$)`,
          ),
          step(
            "result",
            `$\\cos\\left(\\operatorname{arcsen}(x)\\right) = \\sqrt{1 - x^{2}}$. Comprobación con $x = 0{,}6$: $\\operatorname{arcsen}(0{,}6) \\approx 0{,}6435$ rad y $\\cos(0{,}6435) = 0{,}8 = \\sqrt{1 - 0{,}36}$ ✓ (con $x = -0{,}6$ también da $0{,}8 > 0$, lo que descarta la raíz negativa).`,
            `$\\cos\\left(\\arcsin(x)\\right) = \\sqrt{1 - x^{2}}$. Check with $x = 0.6$: $\\arcsin(0.6) \\approx 0.6435$ rad and $\\cos(0.6435) = 0.8 = \\sqrt{1 - 0.36}$ ✓ (with $x = -0.6$ it also gives $0.8 > 0$, which rules out the negative root).`,
          ),
        ],
      };
    },
  ),

  /* 4 · 22b — cos(arctan x) = 1/√(1+x²) = √(1+x²)/(1+x²) */
  template(
    {
      id: "trigfn-espol-ch4-22b",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "inverse-trig",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["inverse-trig", "reference-triangle", "rationalization"],
      prerequisites: ["inverse-trig"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "4 · 22b",
        page: 470,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\dfrac{1}{\\sqrt{1 + x^{2}}}$`, `$\\dfrac{1}{\\sqrt{1 + x^{2}}}$`), correct: true },
        { id: "b", text: L(`$\\sqrt{1 + x^{2}}$`, `$\\sqrt{1 + x^{2}}$`), correct: false },
        { id: "c", text: L(`$\\dfrac{1}{1 + x^{2}}$`, `$\\dfrac{1}{1 + x^{2}}$`), correct: false },
        { id: "d", text: L(`$\\dfrac{x}{\\sqrt{1 + x^{2}}}$`, `$\\dfrac{x}{\\sqrt{1 + x^{2}}}$`), correct: false },
      ];
      return {
        skill: L(
          "Coseno de un arctan: triángulo de referencia",
          "Cosine of an arctan: reference triangle",
        ),
        statement: L(
          `Simplificar: $\\cos\\left(\\arctan(x)\\right)$`,
          `Simplify: $\\cos\\left(\\arctan(x)\\right)$`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Nombra el arco: $\\theta = \\arctan(x)$ significa $\\tan(\\theta) = \\dfrac{x}{1}$ (cateto opuesto $x$, cateto adyacente $1$).",
            "Name the arc: $\\theta = \\arctan(x)$ means $\\tan(\\theta) = \\dfrac{x}{1}$ (opposite leg $x$, adjacent leg $1$).",
          ),
          L(
            "La hipotenusa del triángulo de referencia sale de Pitágoras y es la misma raíz que aparece en las opciones.",
            "The hypotenuse of the reference triangle comes from Pythagoras and is the same root that appears in the options.",
          ),
          L(
            "El coseno es adyacente sobre hipotenusa; como $\\theta \\in \\left(-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right)$, el resultado siempre es positivo.",
            "The cosine is adjacent over hypotenuse; since $\\theta \\in \\left(-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right)$, the result is always positive.",
          ),
        ],
        answerDisplay: L(
          `$\\cos\\left(\\arctan(x)\\right) = \\dfrac{1}{\\sqrt{1 + x^{2}}} = \\dfrac{\\sqrt{1 + x^{2}}}{1 + x^{2}}$`,
          `$\\cos\\left(\\arctan(x)\\right) = \\dfrac{1}{\\sqrt{1 + x^{2}}} = \\dfrac{\\sqrt{1 + x^{2}}}{1 + x^{2}}$`,
        ),
        solution: [
          step(
            "given",
            "$\\cos\\left(\\arctan(x)\\right)$, con $\\arctan(x) \\in \\left(-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right)$.",
            "$\\cos\\left(\\arctan(x)\\right)$, with $\\arctan(x) \\in \\left(-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right)$.",
          ),
          step(
            "approach",
            "Triángulo de referencia de la tangente $\\frac{x}{1}$ y lectura del coseno; el libro imprime el resultado racionalizado.",
            "Reference triangle of the tangent $\\frac{x}{1}$ and reading of the cosine; the book prints the result rationalized.",
          ),
          step(
            "calculation",
            `$\\theta = \\arctan(x) \\Rightarrow \\tan(\\theta) = \\dfrac{x}{1}$<br>Hipotenusa: $\\sqrt{x^{2} + 1^{2}} = \\sqrt{1 + x^{2}}$<br>$\\cos(\\theta) = \\dfrac{1}{\\sqrt{1 + x^{2}}} = \\dfrac{\\sqrt{1 + x^{2}}}{1 + x^{2}}$ (forma racionalizada del libro)`,
            `$\\theta = \\arctan(x) \\Rightarrow \\tan(\\theta) = \\dfrac{x}{1}$<br>Hypotenuse: $\\sqrt{x^{2} + 1^{2}} = \\sqrt{1 + x^{2}}$<br>$\\cos(\\theta) = \\dfrac{1}{\\sqrt{1 + x^{2}}} = \\dfrac{\\sqrt{1 + x^{2}}}{1 + x^{2}}$ (the book's rationalized form)`,
          ),
          step(
            "result",
            `$\\cos\\left(\\arctan(x)\\right) = \\dfrac{1}{\\sqrt{1 + x^{2}}}$. Comprobación con $x = 1$: $\\arctan(1) = \\frac{\\pi}{4}$ y $\\cos\\left(\\frac{\\pi}{4}\\right) = \\frac{\\sqrt{2}}{2} \\approx 0{,}707 = \\dfrac{1}{\\sqrt{2}}$ ✓ (y con $x = 2$: $\\cos(\\arctan(2)) \\approx 0{,}447 = \\frac{1}{\\sqrt{5}}$ ✓).`,
            `$\\cos\\left(\\arctan(x)\\right) = \\dfrac{1}{\\sqrt{1 + x^{2}}}$. Check with $x = 1$: $\\arctan(1) = \\frac{\\pi}{4}$ and $\\cos\\left(\\frac{\\pi}{4}\\right) = \\frac{\\sqrt{2}}{2} \\approx 0.707 = \\dfrac{1}{\\sqrt{2}}$ ✓ (and with $x = 2$: $\\cos(\\arctan(2)) \\approx 0.447 = \\frac{1}{\\sqrt{5}}$ ✓).`,
          ),
        ],
      };
    },
  ),

  /* 4 · 22c — arccos[cos(−17π/5)] = 3π/5 */
  template(
    {
      id: "trigfn-espol-ch4-22c",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "inverse-trig",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 270,
      tags: ["inverse-trig", "periodicity", "principal-range"],
      prerequisites: ["inverse-trig"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "4 · 22c",
        page: 470,
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\dfrac{3\\pi}{5}$`, `$\\dfrac{3\\pi}{5}$`), correct: true },
        { id: "b", text: L(`$-\\dfrac{17\\pi}{5}$`, `$-\\dfrac{17\\pi}{5}$`), correct: false },
        { id: "c", text: L(`$-\\dfrac{2\\pi}{5}$`, `$-\\dfrac{2\\pi}{5}$`), correct: false },
        { id: "d", text: L(`$\\dfrac{2\\pi}{5}$`, `$\\dfrac{2\\pi}{5}$`), correct: false },
      ];
      return {
        skill: L(
          "arccos∘cos solo se cancela dentro de [0, π]",
          "arccos∘cos cancels only inside [0, π]",
        ),
        statement: L(
          `Simplificar: $\\arccos\\left[\\cos\\left(-\\dfrac{17\\pi}{5}\\right)\\right]$`,
          `Simplify: $\\arccos\\left[\\cos\\left(-\\dfrac{17\\pi}{5}\\right)\\right]$`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "$\\arccos$ solo devuelve ángulos en $[0, \\pi]$: eso ya descarta las opciones negativas.",
            "$\\arccos$ only returns angles in $[0, \\pi]$: that already rules out the negative options.",
          ),
          L(
            "El coseno tiene período $2\\pi$: puedes sumar $2\\pi$ al ángulo interior sin cambiar su coseno.",
            "The cosine has period $2\\pi$: you may add $2\\pi$ to the inner angle without changing its cosine.",
          ),
          L(
            "Una sola vuelta no basta: $-\\dfrac{17\\pi}{5} + 2\\pi$ sigue siendo negativo; suma $2\\pi$ otra vez y mira en qué cuadrante cae.",
            "One full turn is not enough: $-\\dfrac{17\\pi}{5} + 2\\pi$ is still negative; add $2\\pi$ once more and see which quadrant it lands in.",
          ),
        ],
        answerDisplay: L(
          `$\\arccos\\left[\\cos\\left(-\\dfrac{17\\pi}{5}\\right)\\right] = \\dfrac{3\\pi}{5}$`,
          `$\\arccos\\left[\\cos\\left(-\\dfrac{17\\pi}{5}\\right)\\right] = \\dfrac{3\\pi}{5}$`,
        ),
        solution: [
          step(
            "given",
            "$\\arccos\\left[\\cos\\left(-\\frac{17\\pi}{5}\\right)\\right]$, donde $\\arccos$ devuelve valores en $[0, \\pi]$.",
            "$\\arccos\\left[\\cos\\left(-\\frac{17\\pi}{5}\\right)\\right]$, where $\\arccos$ returns values in $[0, \\pi]$.",
          ),
          step(
            "approach",
            "Como $-\\frac{17\\pi}{5} \\notin [0, \\pi]$, reducir el argumento módulo $2\\pi$ hasta caer en el rango principal; allí $\\arccos$ y $\\cos$ sí se cancelan.",
            "Since $-\\frac{17\\pi}{5} \\notin [0, \\pi]$, reduce the argument modulo $2\\pi$ until it falls in the principal range; there $\\arccos$ and $\\cos$ do cancel.",
          ),
          step(
            "calculation",
            `$-\\dfrac{17\\pi}{5} + 2\\pi = -\\dfrac{7\\pi}{5}$ (todavía negativo)<br>$-\\dfrac{17\\pi}{5} + 4\\pi = \\dfrac{3\\pi}{5} \\in [0, \\pi]$<br>$\\arccos\\left[\\cos\\left(-\\dfrac{17\\pi}{5}\\right)\\right] = \\arccos\\left[\\cos\\left(\\dfrac{3\\pi}{5}\\right)\\right] = \\dfrac{3\\pi}{5}$`,
            `$-\\dfrac{17\\pi}{5} + 2\\pi = -\\dfrac{7\\pi}{5}$ (still negative)<br>$-\\dfrac{17\\pi}{5} + 4\\pi = \\dfrac{3\\pi}{5} \\in [0, \\pi]$<br>$\\arccos\\left[\\cos\\left(-\\dfrac{17\\pi}{5}\\right)\\right] = \\arccos\\left[\\cos\\left(\\dfrac{3\\pi}{5}\\right)\\right] = \\dfrac{3\\pi}{5}$`,
          ),
          step(
            "result",
            `El valor es $\\dfrac{3\\pi}{5} \\approx 1{,}885$ rad. Comprobación numérica: $\\cos\\left(-\\dfrac{17\\pi}{5}\\right) = \\cos\\left(\\dfrac{3\\pi}{5}\\right) \\approx -0{,}309$ y $\\arccos(-0{,}309) \\approx 1{,}885 = \\dfrac{3\\pi}{5}$ ✓.`,
            `The value is $\\dfrac{3\\pi}{5} \\approx 1.885$ rad. Numerical check: $\\cos\\left(-\\dfrac{17\\pi}{5}\\right) = \\cos\\left(\\dfrac{3\\pi}{5}\\right) \\approx -0.309$ and $\\arccos(-0.309) \\approx 1.885 = \\dfrac{3\\pi}{5}$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 4 · 22d — sen[arctan(−5/3)] = −5√34/34 */
  template(
    {
      id: "trigfn-espol-ch4-22d",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "inverse-trig",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["inverse-trig", "reference-triangle", "quadrants"],
      prerequisites: ["inverse-trig"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "4 · 22d",
        page: 470,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$-\\dfrac{5\\sqrt{34}}{34}$`, `$-\\dfrac{5\\sqrt{34}}{34}$`), correct: true },
        { id: "b", text: L(`$\\dfrac{5\\sqrt{34}}{34}$`, `$\\dfrac{5\\sqrt{34}}{34}$`), correct: false },
        { id: "c", text: L(`$-\\dfrac{3\\sqrt{34}}{34}$`, `$-\\dfrac{3\\sqrt{34}}{34}$`), correct: false },
        { id: "d", text: L(`$-\\dfrac{\\sqrt{34}}{5}$`, `$-\\dfrac{\\sqrt{34}}{5}$`), correct: false },
      ];
      return {
        skill: L(
          "Seno de un arctan negativo: triángulo y signo",
          "Sine of a negative arctan: triangle and sign",
        ),
        statement: L(
          `Simplificar: $\\operatorname{sen}\\left[\\arctan\\left(-\\dfrac{5}{3}\\right)\\right]$`,
          `Simplify: $\\sin\\left[\\arctan\\left(-\\dfrac{5}{3}\\right)\\right]$`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Sea $\\theta = \\arctan\\left(-\\frac{5}{3}\\right)$: la tangente es $-\\frac{5}{3}$ y $\\theta \\in \\left(-\\frac{\\pi}{2}, 0\\right)$ (cuarto cuadrante).",
            "Let $\\theta = \\arctan\\left(-\\frac{5}{3}\\right)$: the tangent is $-\\frac{5}{3}$ and $\\theta \\in \\left(-\\frac{\\pi}{2}, 0\\right)$ (fourth quadrant).",
          ),
          L(
            "Triángulo de referencia con catetos $5$ y $3$: la hipotenusa mide $\\sqrt{34}$.",
            "Reference triangle with legs $5$ and $3$: the hypotenuse measures $\\sqrt{34}$.",
          ),
          L(
            "El seno es opuesto sobre hipotenusa y en el cuarto cuadrante es negativo; racionaliza al final.",
            "The sine is opposite over hypotenuse and in the fourth quadrant it is negative; rationalize at the end.",
          ),
        ],
        answerDisplay: L(
          `$\\operatorname{sen}\\left[\\arctan\\left(-\\dfrac{5}{3}\\right)\\right] = -\\dfrac{5\\sqrt{34}}{34}$`,
          `$\\sin\\left[\\arctan\\left(-\\dfrac{5}{3}\\right)\\right] = -\\dfrac{5\\sqrt{34}}{34}$`,
        ),
        solution: [
          step(
            "given",
            "$\\operatorname{sen}\\left[\\arctan\\left(-\\frac{5}{3}\\right)\\right]$, con $\\arctan\\left(-\\frac{5}{3}\\right) \\in \\left(-\\frac{\\pi}{2}, 0\\right)$.",
            "$\\sin\\left[\\arctan\\left(-\\frac{5}{3}\\right)\\right]$, with $\\arctan\\left(-\\frac{5}{3}\\right) \\in \\left(-\\frac{\\pi}{2}, 0\\right)$.",
          ),
          step(
            "approach",
            "Triángulo de referencia de la tangente $-\\frac{5}{3}$, signo del cuarto cuadrante y racionalización.",
            "Reference triangle of the tangent $-\\frac{5}{3}$, fourth-quadrant sign, and rationalization.",
          ),
          step(
            "calculation",
            `$\\theta = \\arctan\\left(-\\dfrac{5}{3}\\right) \\Rightarrow \\tan(\\theta) = -\\dfrac{5}{3}$ (opuesto $-5$, adyacente $3$)<br>Hipotenusa: $\\sqrt{5^{2} + 3^{2}} = \\sqrt{34}$<br>$\\operatorname{sen}(\\theta) = \\dfrac{-5}{\\sqrt{34}} = -\\dfrac{5\\sqrt{34}}{34}$`,
            `$\\theta = \\arctan\\left(-\\dfrac{5}{3}\\right) \\Rightarrow \\tan(\\theta) = -\\dfrac{5}{3}$ (opposite $-5$, adjacent $3$)<br>Hypotenuse: $\\sqrt{5^{2} + 3^{2}} = \\sqrt{34}$<br>$\\sin(\\theta) = \\dfrac{-5}{\\sqrt{34}} = -\\dfrac{5\\sqrt{34}}{34}$`,
          ),
          step(
            "result",
            `$\\operatorname{sen}\\left[\\arctan\\left(-\\dfrac{5}{3}\\right)\\right] = -\\dfrac{5\\sqrt{34}}{34} \\approx -0{,}857$. Comprobación: $\\arctan\\left(-\\frac{5}{3}\\right) \\approx -1{,}0304$ rad y $\\operatorname{sen}(-1{,}0304) \\approx -0{,}857$ ✓.`,
            `$\\sin\\left[\\arctan\\left(-\\dfrac{5}{3}\\right)\\right] = -\\dfrac{5\\sqrt{34}}{34} \\approx -0.857$. Check: $\\arctan\\left(-\\frac{5}{3}\\right) \\approx -1.0304$ rad and $\\sin(-1.0304) \\approx -0.857$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 4 · 48 a+b — cos x + √3·sen x = 2·cos(x − π/3); rango en [0, π/2]: [1, 2] */
  template(
    {
      id: "trigfn-espol-ch4-48ab",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "transformations",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 360,
      tags: ["harmonic-form", "range", "amplitude", "phase-shift"],
      prerequisites: ["transformations", "amplitude"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "4 · 48 a+b",
        page: 474,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\left(2, \\dfrac{\\pi}{3}, [1, 2]\\right)$`, `$\\left(2, \\dfrac{\\pi}{3}, [1, 2]\\right)$`), correct: true },
        { id: "b", text: L(`$\\left(2, \\dfrac{\\pi}{6}, [1, 2]\\right)$`, `$\\left(2, \\dfrac{\\pi}{6}, [1, 2]\\right)$`), correct: false },
        { id: "c", text: L(`$\\left(2, \\dfrac{\\pi}{3}, [-2, 2]\\right)$`, `$\\left(2, \\dfrac{\\pi}{3}, [-2, 2]\\right)$`), correct: false },
        { id: "d", text: L(`$\\left(2, \\dfrac{\\pi}{3}, [1, \\sqrt{3}]\\right)$`, `$\\left(2, \\dfrac{\\pi}{3}, [1, \\sqrt{3}]\\right)$`), correct: false },
      ];
      return {
        skill: L(
          "Forma armónica R·cos(x−α) y rango en un dominio recortado",
          "Harmonic form R·cos(x−α) and range on a clipped domain",
        ),
        statement: L(
          `La función $f$, de dominio $\\left[0, \\dfrac{\\pi}{2}\\right]$, se define como $f(x) = \\cos(x) + \\sqrt{3}\\,\\operatorname{sen}(x)$. Esta función puede expresarse de la forma $f(x) = R\\cos(x - \\alpha)$, con $R > 0$ y $0 < \\alpha < \\dfrac{\\pi}{2}$. Halle $R$, $\\alpha$ y el rango de $f$.`,
          `The function $f$, with domain $\\left[0, \\dfrac{\\pi}{2}\\right]$, is defined by $f(x) = \\cos(x) + \\sqrt{3}\\,\\sin(x)$. This function can be written in the form $f(x) = R\\cos(x - \\alpha)$, with $R > 0$ and $0 < \\alpha < \\dfrac{\\pi}{2}$. Find $R$, $\\alpha$ and the range of $f$.`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Desarrolla $R\\cos(x - \\alpha) = R\\cos(\\alpha)\\cos(x) + R\\operatorname{sen}(\\alpha)\\operatorname{sen}(x)$ y compara coeficiente a coeficiente con $f$.",
            "Expand $R\\cos(x - \\alpha) = R\\cos(\\alpha)\\cos(x) + R\\sin(\\alpha)\\sin(x)$ and match coefficients with $f$.",
          ),
          L(
            "De la comparación: $R\\cos(\\alpha) = 1$ y $R\\operatorname{sen}(\\alpha) = \\sqrt{3}$. Eleva al cuadrado y suma para obtener $R$; divide para obtener $\\tan(\\alpha)$.",
            "From the comparison: $R\\cos(\\alpha) = 1$ and $R\\sin(\\alpha) = \\sqrt{3}$. Square and add to get $R$; divide to get $\\tan(\\alpha)$.",
          ),
          L(
            "El máximo de $R\\cos(x - \\alpha)$ es claro, pero el dominio está recortado: evalúa $f$ en los DOS extremos de $\\left[0, \\frac{\\pi}{2}\\right]$ para decidir el mínimo.",
            "The maximum of $R\\cos(x - \\alpha)$ is clear, but the domain is clipped: evaluate $f$ at BOTH endpoints of $\\left[0, \\frac{\\pi}{2}\\right]$ to decide the minimum.",
          ),
        ],
        answerDisplay: L(
          `$R = 2$, $\\alpha = \\dfrac{\\pi}{3}$, rango de $f$: $[1, 2]$`,
          `$R = 2$, $\\alpha = \\dfrac{\\pi}{3}$, range of $f$: $[1, 2]$`,
        ),
        solution: [
          step(
            "given",
            "$f(x) = \\cos(x) + \\sqrt{3}\\,\\operatorname{sen}(x)$ en $\\left[0, \\frac{\\pi}{2}\\right]$, en la forma $f(x) = R\\cos(x - \\alpha)$ con $R > 0$ y $0 < \\alpha < \\frac{\\pi}{2}$.",
            "$f(x) = \\cos(x) + \\sqrt{3}\\,\\sin(x)$ on $\\left[0, \\frac{\\pi}{2}\\right]$, in the form $f(x) = R\\cos(x - \\alpha)$ with $R > 0$ and $0 < \\alpha < \\frac{\\pi}{2}$.",
          ),
          step(
            "approach",
            "Comparar coeficientes con el desarrollo de $R\\cos(x - \\alpha)$ para hallar $R$ y $\\alpha$; después hallar máximo y mínimo de la cosenoidal sobre el dominio recortado.",
            "Match coefficients with the expansion of $R\\cos(x - \\alpha)$ to find $R$ and $\\alpha$; then find the maximum and minimum of the cosine wave over the clipped domain.",
          ),
          step(
            "calculation",
            `$R\\cos(\\alpha) = 1$, $R\\operatorname{sen}(\\alpha) = \\sqrt{3}$<br>$R^{2} = 1^{2} + (\\sqrt{3})^{2} = 4 \\Rightarrow R = 2$; $\\tan(\\alpha) = \\sqrt{3} \\Rightarrow \\alpha = \\dfrac{\\pi}{3}$<br>$f(x) = 2\\cos\\left(x - \\dfrac{\\pi}{3}\\right)$: máximo $2$ en $x = \\frac{\\pi}{3}$<br>Extremos: $f(0) = 2\\cos\\left(-\\frac{\\pi}{3}\\right) = 1$; $f\\left(\\frac{\\pi}{2}\\right) = 2\\cos\\left(\\frac{\\pi}{6}\\right) = \\sqrt{3}$`,
            `$R\\cos(\\alpha) = 1$, $R\\sin(\\alpha) = \\sqrt{3}$<br>$R^{2} = 1^{2} + (\\sqrt{3})^{2} = 4 \\Rightarrow R = 2$; $\\tan(\\alpha) = \\sqrt{3} \\Rightarrow \\alpha = \\dfrac{\\pi}{3}$<br>$f(x) = 2\\cos\\left(x - \\dfrac{\\pi}{3}\\right)$: maximum $2$ at $x = \\frac{\\pi}{3}$<br>Endpoints: $f(0) = 2\\cos\\left(-\\frac{\\pi}{3}\\right) = 1$; $f\\left(\\frac{\\pi}{2}\\right) = 2\\cos\\left(\\frac{\\pi}{6}\\right) = \\sqrt{3}$`,
          ),
          step(
            "result",
            `$R = 2$, $\\alpha = \\dfrac{\\pi}{3}$ y el rango de $f$ es $[1, 2]$. Comprobación directa: $f\\left(\\frac{\\pi}{3}\\right) = \\cos\\left(\\frac{\\pi}{3}\\right) + \\sqrt{3}\\,\\operatorname{sen}\\left(\\frac{\\pi}{3}\\right) = \\frac{1}{2} + \\frac{3}{2} = 2$ ✓ y $f(0) = 1 + 0 = 1$ ✓ (el mínimo está en el extremo $x = 0$, no en un valle del coseno).`,
            `$R = 2$, $\\alpha = \\dfrac{\\pi}{3}$ and the range of $f$ is $[1, 2]$. Direct check: $f\\left(\\frac{\\pi}{3}\\right) = \\cos\\left(\\frac{\\pi}{3}\\right) + \\sqrt{3}\\,\\sin\\left(\\frac{\\pi}{3}\\right) = \\frac{1}{2} + \\frac{3}{2} = 2$ ✓ and $f(0) = 1 + 0 = 1$ ✓ (the minimum sits at the endpoint $x = 0$, not at a trough of the cosine).`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Cap. 4 (ed. digital) — ronda 2 en funciones: identidades y        */
  /* simplificación (ítems 24-42). Clave impresa (p. 941) + sympy:     */
  /* download/verify_espol_ch4.py.                                      */
  /* ---------------------------------------------------------------- */

  /* 4 · 24 — 8·cos(10°)·cos(20°)·cos(40°) = cot(10°) vía la cadena de
     ángulo doble (sen(80°)/sen(10°)). El libro repite este ejercicio
     como 5.5 · 49a (ya importado como trigf-espol-49a con otros
     distractores); aquí llega con las opciones impresas del Cap. 4.
     La opción impresa «8» se descarta (regla de casa: exactamente 4
     opciones). */
  template(
    {
      id: "trigfn-espol-ch4-24",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "identities",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 420,
      tags: ["identities", "double-angle", "product"],
      prerequisites: ["identities"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "4 · 24",
        page: 471,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\cot(10^\\circ)$`, `$\\cot(10^\\circ)$`), correct: true },
        { id: "b", text: L(`$8\\cos(70^\\circ)$`, `$8\\cos(70^\\circ)$`), correct: false },
        { id: "c", text: L(`$1$`, `$1$`), correct: false },
        { id: "d", text: L(`$\\tan(10^\\circ)$`, `$\\tan(10^\\circ)$`), correct: false },
      ];
      return {
        skill: L(
          "Cadena de ángulo doble en un producto de cosenos",
          "Double-angle chain in a product of cosines",
        ),
        statement: L(
          `El valor de la expresión $8\\cos(10^\\circ)\\cos(20^\\circ)\\cos(40^\\circ)$ es:`,
          `The value of the expression $8\\cos(10^\\circ)\\cos(20^\\circ)\\cos(40^\\circ)$ is:`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Los ángulos se duplican ($10^\\circ \\to 20^\\circ \\to 40^\\circ$): multiplica y divide por $2\\operatorname{sen}(10^\\circ)$.",
            "The angles double ($10^\\circ \\to 20^\\circ \\to 40^\\circ$): multiply and divide by $2\\sin(10^\\circ)$.",
          ),
          L(
            "Cada aplicación de $2\\operatorname{sen}(u)\\cos(u) = \\operatorname{sen}(2u)$ consume un coseno y produce el seno del siguiente ángulo.",
            "Each application of $2\\sin(u)\\cos(u) = \\sin(2u)$ consumes one cosine and produces the sine of the next angle.",
          ),
          L(
            "La cadena termina en el cociente $\\frac{\\operatorname{sen}(80^\\circ)}{\\operatorname{sen}(10^\\circ)}$, con ángulos complementarios en numerador y denominador.",
            "The chain ends at the quotient $\\frac{\\sin(80^\\circ)}{\\sin(10^\\circ)}$, with complementary angles in numerator and denominator.",
          ),
        ],
        answerDisplay: L(
          `$8\\cos(10^\\circ)\\cos(20^\\circ)\\cos(40^\\circ) = \\dfrac{\\operatorname{sen}(80^\\circ)}{\\operatorname{sen}(10^\\circ)} = \\cot(10^\\circ)$`,
          `$8\\cos(10^\\circ)\\cos(20^\\circ)\\cos(40^\\circ) = \\dfrac{\\sin(80^\\circ)}{\\sin(10^\\circ)} = \\cot(10^\\circ)$`,
        ),
        solution: [
          step(
            "given",
            "La expresión $8\\cos(10^\\circ)\\cos(20^\\circ)\\cos(40^\\circ)$.",
            "The expression $8\\cos(10^\\circ)\\cos(20^\\circ)\\cos(40^\\circ)$.",
          ),
          step(
            "approach",
            "Como los ángulos se duplican, multiplicar por $\\frac{2\\operatorname{sen}(10^\\circ)}{2\\operatorname{sen}(10^\\circ)}$ dispara una reacción en cadena de identidades de ángulo doble que consume cada coseno.",
            "Since the angles double, multiplying by $\\frac{2\\sin(10^\\circ)}{2\\sin(10^\\circ)}$ triggers a chain reaction of double-angle identities that consumes each cosine.",
          ),
          step(
            "calculation",
            `$8\\cos(10^\\circ)\\cos(20^\\circ)\\cos(40^\\circ) \\cdot \\dfrac{2\\operatorname{sen}(10^\\circ)}{2\\operatorname{sen}(10^\\circ)} = \\dfrac{4\\operatorname{sen}(20^\\circ)\\cos(20^\\circ)\\cos(40^\\circ)}{\\operatorname{sen}(10^\\circ)}$<br>$= \\dfrac{2\\operatorname{sen}(40^\\circ)\\cos(40^\\circ)}{\\operatorname{sen}(10^\\circ)} = \\dfrac{\\operatorname{sen}(80^\\circ)}{\\operatorname{sen}(10^\\circ)}$<br>$= \\dfrac{\\cos(10^\\circ)}{\\operatorname{sen}(10^\\circ)} = \\cot(10^\\circ)$`,
            `$8\\cos(10^\\circ)\\cos(20^\\circ)\\cos(40^\\circ) \\cdot \\dfrac{2\\sin(10^\\circ)}{2\\sin(10^\\circ)} = \\dfrac{4\\sin(20^\\circ)\\cos(20^\\circ)\\cos(40^\\circ)}{\\sin(10^\\circ)}$<br>$= \\dfrac{2\\sin(40^\\circ)\\cos(40^\\circ)}{\\sin(10^\\circ)} = \\dfrac{\\sin(80^\\circ)}{\\sin(10^\\circ)}$<br>$= \\dfrac{\\cos(10^\\circ)}{\\sin(10^\\circ)} = \\cot(10^\\circ)$`,
          ),
          step(
            "result",
            `El valor es $\\cot(10^\\circ)$. Comprobación numérica: $8 \\cdot 0{,}9848 \\cdot 0{,}9397 \\cdot 0{,}7660 \\approx 5{,}671$ y $\\cot(10^\\circ) = \\frac{0{,}9848}{0{,}1736} \\approx 5{,}671$ ✓ (los distractores fallan: $8\\cos(70^\\circ) \\approx 2{,}736$, $\\tan(10^\\circ) \\approx 0{,}176$).`,
            `The value is $\\cot(10^\\circ)$. Numeric check: $8 \\cdot 0.9848 \\cdot 0.9397 \\cdot 0.7660 \\approx 5.671$ and $\\cot(10^\\circ) = \\frac{0.9848}{0.1736} \\approx 5.671$ ✓ (the distractors fail: $8\\cos(70^\\circ) \\approx 2.736$, $\\tan(10^\\circ) \\approx 0.176$).`,
          ),
        ],
      };
    },
  ),

  /* 4 · 26 — QII con sen(x) = 5/13: cos(x + π/3) = −(12 + 5√3)/26.
     Distractores impresos (lectura VLM): (5√3+7)/√74 y (3√3−1)/74; la
     opción impresa (5−7√3)/√74 se descarta (regla de casa: exactamente
     4 opciones). */
  template(
    {
      id: "trigfn-espol-ch4-26",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "identities",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["identities", "angle-addition", "quadrants"],
      prerequisites: ["identities"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "4 · 26",
        page: 471,
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$-\\dfrac{12+5\\sqrt{3}}{26}$`, `$-\\dfrac{12+5\\sqrt{3}}{26}$`), correct: true },
        { id: "b", text: L(`$\\dfrac{5\\sqrt{3}+7}{\\sqrt{74}}$`, `$\\dfrac{5\\sqrt{3}+7}{\\sqrt{74}}$`), correct: false },
        { id: "c", text: L(`$\\dfrac{3\\sqrt{3}-1}{74}$`, `$\\dfrac{3\\sqrt{3}-1}{74}$`), correct: false },
        { id: "d", text: L(`$\\dfrac{3-7\\sqrt{3}}{26}$`, `$\\dfrac{3-7\\sqrt{3}}{26}$`), correct: false },
      ];
      return {
        skill: L(
          "Coseno de una suma con cuadrante negativo",
          "Cosine of a sum with a negative-quadrant sign",
        ),
        statement: L(
          `Si $\\dfrac{\\pi}{2} < x < \\pi$ y $\\operatorname{sen}(x) = \\dfrac{5}{13}$, entonces el valor de $\\cos\\left(x + \\dfrac{\\pi}{3}\\right)$ es:`,
          `If $\\dfrac{\\pi}{2} < x < \\pi$ and $\\sin(x) = \\dfrac{5}{13}$, then the value of $\\cos\\left(x + \\dfrac{\\pi}{3}\\right)$ is:`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Con $x$ en el segundo cuadrante el coseno es negativo: $\\cos(x) = -\\sqrt{1 - \\operatorname{sen}^{2}(x)}$ (triángulo $5$-$12$-$13$).",
            "With $x$ in the second quadrant the cosine is negative: $\\cos(x) = -\\sqrt{1 - \\sin^{2}(x)}$ ($5$-$12$-$13$ triangle).",
          ),
          L(
            "Desarrolla el coseno de la suma: $\\cos\\left(x + \\frac{\\pi}{3}\\right) = \\cos(x)\\cos\\left(\\frac{\\pi}{3}\\right) - \\operatorname{sen}(x)\\operatorname{sen}\\left(\\frac{\\pi}{3}\\right)$.",
            "Expand the cosine of the sum: $\\cos\\left(x + \\frac{\\pi}{3}\\right) = \\cos(x)\\cos\\left(\\frac{\\pi}{3}\\right) - \\sin(x)\\sin\\left(\\frac{\\pi}{3}\\right)$.",
          ),
          L(
            "Sustituye $\\cos\\left(\\frac{\\pi}{3}\\right) = \\frac{1}{2}$ y $\\operatorname{sen}\\left(\\frac{\\pi}{3}\\right) = \\frac{\\sqrt{3}}{2}$, y reúne los dos términos sobre el denominador común $26$.",
            "Substitute $\\cos\\left(\\frac{\\pi}{3}\\right) = \\frac{1}{2}$ and $\\sin\\left(\\frac{\\pi}{3}\\right) = \\frac{\\sqrt{3}}{2}$, and gather both terms over the common denominator $26$.",
          ),
        ],
        answerDisplay: L(
          `$\\cos\\left(x + \\dfrac{\\pi}{3}\\right) = -\\dfrac{12+5\\sqrt{3}}{26} \\approx -0{,}795$`,
          `$\\cos\\left(x + \\dfrac{\\pi}{3}\\right) = -\\dfrac{12+5\\sqrt{3}}{26} \\approx -0.795$`,
        ),
        solution: [
          step(
            "given",
            "$\\dfrac{\\pi}{2} < x < \\pi$ y $\\operatorname{sen}(x) = \\dfrac{5}{13}$; se pide $\\cos\\left(x + \\dfrac{\\pi}{3}\\right)$.",
            "$\\dfrac{\\pi}{2} < x < \\pi$ and $\\sin(x) = \\dfrac{5}{13}$; find $\\cos\\left(x + \\dfrac{\\pi}{3}\\right)$.",
          ),
          step(
            "approach",
            "El intervalo fija el cuadrante (II) y con ello el signo del coseno; después interviene la fórmula del coseno de una suma con los valores notales de $\\frac{\\pi}{3}$.",
            "The interval fixes the quadrant (II) and hence the sign of the cosine; then the cosine-of-a-sum formula enters with the notable values of $\\frac{\\pi}{3}$.",
          ),
          step(
            "calculation",
            `$\\cos(x) = -\\sqrt{1 - \\left(\\frac{5}{13}\\right)^{2}} = -\\sqrt{\\frac{144}{169}} = -\\frac{12}{13}$ (cuadrante II)<br>$\\cos\\left(x + \\frac{\\pi}{3}\\right) = \\left(-\\frac{12}{13}\\right) \\cdot \\frac{1}{2} - \\frac{5}{13} \\cdot \\frac{\\sqrt{3}}{2} = \\frac{-12 - 5\\sqrt{3}}{26} = -\\frac{12+5\\sqrt{3}}{26}$`,
            `$\\cos(x) = -\\sqrt{1 - \\left(\\frac{5}{13}\\right)^{2}} = -\\sqrt{\\frac{144}{169}} = -\\frac{12}{13}$ (second quadrant)<br>$\\cos\\left(x + \\frac{\\pi}{3}\\right) = \\left(-\\frac{12}{13}\\right) \\cdot \\frac{1}{2} - \\frac{5}{13} \\cdot \\frac{\\sqrt{3}}{2} = \\frac{-12 - 5\\sqrt{3}}{26} = -\\frac{12+5\\sqrt{3}}{26}$`,
          ),
          step(
            "result",
            `El valor es $-\\frac{12+5\\sqrt{3}}{26} \\approx -0{,}795$. Comprobación: $x = \\pi - \\operatorname{arcsen}\\left(\\frac{5}{13}\\right) \\approx 2{,}7468$ rad, así que $\\cos\\left(x + \\frac{\\pi}{3}\\right) = \\cos(3{,}7940) \\approx -0{,}795$ ✓ (los distractores impresos valen $\\approx 1{,}820$, $0{,}057$ y $-0{,}351$).`,
            `The value is $-\\frac{12+5\\sqrt{3}}{26} \\approx -0.795$. Check: $x = \\pi - \\arcsin\\left(\\frac{5}{13}\\right) \\approx 2.7468$ rad, so $\\cos\\left(x + \\frac{\\pi}{3}\\right) = \\cos(3.7940) \\approx -0.795$ ✓ (the printed distractors equal $\\approx 1.820$, $0.057$ and $-0.351$).`,
          ),
        ],
      };
    },
  ),

  /* 4 · 27 — sen(2x) con sen(x) = 5/13 en QII: 2·(5/13)·(−12/13) =
     −120/169. La opción impresa 120/169 (sin signo) se descarta
     (regla de casa: exactamente 4 opciones). */
  template(
    {
      id: "trigfn-espol-ch4-27",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "identities",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["identities", "double-angle", "quadrants"],
      prerequisites: ["identities"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "4 · 27",
        page: 471,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$-\\dfrac{120}{169}$`, `$-\\dfrac{120}{169}$`), correct: true },
        { id: "b", text: L(`$-\\dfrac{10}{13}$`, `$-\\dfrac{10}{13}$`), correct: false },
        { id: "c", text: L(`$\\dfrac{12}{13}$`, `$\\dfrac{12}{13}$`), correct: false },
        { id: "d", text: L(`$-\\dfrac{12}{13}$`, `$-\\dfrac{12}{13}$`), correct: false },
      ];
      return {
        skill: L(
          "Seno del ángulo doble con control de cuadrante",
          "Double-angle sine with quadrant control",
        ),
        statement: L(
          `Si $\\dfrac{\\pi}{2} < x < \\pi$ y $\\operatorname{sen}(x) = \\dfrac{5}{13}$, entonces el valor de $\\operatorname{sen}(2x)$ es:`,
          `If $\\dfrac{\\pi}{2} < x < \\pi$ and $\\sin(x) = \\dfrac{5}{13}$, then the value of $\\sin(2x)$ is:`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "En el segundo cuadrante el coseno es negativo: del triángulo $5$-$12$-$13$ sale $\\cos(x) = -\\frac{12}{13}$.",
            "In the second quadrant the cosine is negative: the $5$-$12$-$13$ triangle gives $\\cos(x) = -\\frac{12}{13}$.",
          ),
          L(
            "La identidad del seno doble: $\\operatorname{sen}(2x) = 2\\operatorname{sen}(x)\\cos(x)$.",
            "The double-angle identity for sine: $\\sin(2x) = 2\\sin(x)\\cos(x)$.",
          ),
          L(
            "Multiplica conservando el signo: $2 \\cdot \\frac{5}{13} \\cdot \\left(-\\frac{12}{13}\\right)$ es un cociente con numerador negativo.",
            "Multiply keeping the sign: $2 \\cdot \\frac{5}{13} \\cdot \\left(-\\frac{12}{13}\\right)$ is a quotient with a negative numerator.",
          ),
        ],
        answerDisplay: L(
          `$\\operatorname{sen}(2x) = 2 \\cdot \\dfrac{5}{13} \\cdot \\left(-\\dfrac{12}{13}\\right) = -\\dfrac{120}{169}$`,
          `$\\sin(2x) = 2 \\cdot \\dfrac{5}{13} \\cdot \\left(-\\dfrac{12}{13}\\right) = -\\dfrac{120}{169}$`,
        ),
        solution: [
          step(
            "given",
            "$\\dfrac{\\pi}{2} < x < \\pi$ y $\\operatorname{sen}(x) = \\dfrac{5}{13}$; se pide $\\operatorname{sen}(2x)$.",
            "$\\dfrac{\\pi}{2} < x < \\pi$ and $\\sin(x) = \\dfrac{5}{13}$; find $\\sin(2x)$.",
          ),
          step(
            "approach",
            "El cuadrante II fija el signo del coseno; la identidad del seno doble hace el resto sin calcular $2x$.",
            "Quadrant II fixes the sign of the cosine; the double-angle identity for sine does the rest without computing $2x$.",
          ),
          step(
            "calculation",
            `$\\cos(x) = -\\sqrt{1 - \\left(\\frac{5}{13}\\right)^{2}} = -\\frac{12}{13}$ (cuadrante II)<br>$\\operatorname{sen}(2x) = 2\\operatorname{sen}(x)\\cos(x) = 2 \\cdot \\frac{5}{13} \\cdot \\left(-\\frac{12}{13}\\right) = -\\frac{120}{169}$`,
            `$\\cos(x) = -\\sqrt{1 - \\left(\\frac{5}{13}\\right)^{2}} = -\\frac{12}{13}$ (second quadrant)<br>$\\sin(2x) = 2\\sin(x)\\cos(x) = 2 \\cdot \\frac{5}{13} \\cdot \\left(-\\frac{12}{13}\\right) = -\\frac{120}{169}$`,
          ),
          step(
            "result",
            `El valor es $-\\frac{120}{169} \\approx -0{,}710$. Comprobación: $x \\approx 2{,}7468$ rad, así que $\\operatorname{sen}(2x) = \\operatorname{sen}(5{,}4936) = \\operatorname{sen}(-0{,}7896) \\approx -0{,}710$ ✓ (los distractores $-\\frac{10}{13} \\approx -0{,}769$ y $\\pm\\frac{12}{13} \\approx \\pm 0{,}923$ no coinciden).`,
            `The value is $-\\frac{120}{169} \\approx -0.710$. Check: $x \\approx 2.7468$ rad, so $\\sin(2x) = \\sin(5.4936) = \\sin(-0.7896) \\approx -0.710$ ✓ (the distractors $-\\frac{10}{13} \\approx -0.769$ and $\\pm\\frac{12}{13} \\approx \\pm 0.923$ do not match).`,
          ),
        ],
      };
    },
  ),

  /* 4 · 28 — √(2sec(3x)/(1+sec(3x))) = sec(3x/2): 2/(1+cos θ) =
     sec²(θ/2) con θ = 3x, y la raíz devuelve el valor positivo. La
     opción impresa «−1» se descarta (regla de casa: 4 opciones). */
  template(
    {
      id: "trigfn-espol-ch4-28",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "identities",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 360,
      tags: ["identities", "half-angle", "secant"],
      prerequisites: ["identities"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "4 · 28",
        page: 471,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\sec\\left(\\dfrac{3x}{2}\\right)$`, `$\\sec\\left(\\dfrac{3x}{2}\\right)$`), correct: true },
        { id: "b", text: L(`$\\sec(3x)$`, `$\\sec(3x)$`), correct: false },
        { id: "c", text: L(`$\\sec(2x)$`, `$\\sec(2x)$`), correct: false },
        { id: "d", text: L(`$\\cos\\left(\\dfrac{3x}{2}\\right)$`, `$\\cos\\left(\\dfrac{3x}{2}\\right)$`), correct: false },
      ];
      return {
        skill: L(
          "De la secante al ángulo medio bajo un radical",
          "From secant to the half angle under a radical",
        ),
        statement: L(
          `La expresión $\\sqrt{\\dfrac{2\\sec(3x)}{1+\\sec(3x)}}$ es equivalente a:`,
          `The expression $\\sqrt{\\dfrac{2\\sec(3x)}{1+\\sec(3x)}}$ is equivalent to:`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Escribe $\\sec(3x) = \\frac{1}{\\cos(3x)}$ y multiplica numerador y denominador por $\\cos(3x)$: la fracción queda $\\frac{2}{1+\\cos(3x)}$.",
            "Write $\\sec(3x) = \\frac{1}{\\cos(3x)}$ and multiply numerator and denominator by $\\cos(3x)$: the fraction becomes $\\frac{2}{1+\\cos(3x)}$.",
          ),
          L(
            "La identidad de ángulo medio $1+\\cos(\\theta) = 2\\cos^{2}\\left(\\frac{\\theta}{2}\\right)$ convierte el denominador en un cuadrado perfecto.",
            "The half-angle identity $1+\\cos(\\theta) = 2\\cos^{2}\\left(\\frac{\\theta}{2}\\right)$ turns the denominator into a perfect square.",
          ),
          L(
            "Con $\\theta = 3x$, el radicando queda como $\\sec^{2}\\left(\\frac{3x}{2}\\right)$; solo falta decidir qué hace la raíz cuadrada con ese cuadrado.",
            "With $\\theta = 3x$, the radicand becomes $\\sec^{2}\\left(\\frac{3x}{2}\\right)$; it only remains to decide what the square root does to that square.",
          ),
        ],
        answerDisplay: L(
          `$\\sqrt{\\dfrac{2\\sec(3x)}{1+\\sec(3x)}} = \\sqrt{\\sec^{2}\\left(\\dfrac{3x}{2}\\right)} = \\sec\\left(\\dfrac{3x}{2}\\right)$`,
          `$\\sqrt{\\dfrac{2\\sec(3x)}{1+\\sec(3x)}} = \\sqrt{\\sec^{2}\\left(\\dfrac{3x}{2}\\right)} = \\sec\\left(\\dfrac{3x}{2}\\right)$`,
        ),
        solution: [
          step(
            "given",
            "La expresión $\\sqrt{\\dfrac{2\\sec(3x)}{1+\\sec(3x)}}$, con $\\sec(3x) = \\frac{1}{\\cos(3x)}$.",
            "The expression $\\sqrt{\\dfrac{2\\sec(3x)}{1+\\sec(3x)}}$, with $\\sec(3x) = \\frac{1}{\\cos(3x)}$.",
          ),
          step(
            "approach",
            "Convertir la secante en coseno, multiplicar por $\\cos(3x)$ arriba y abajo, y usar el ángulo medio $1+\\cos(3x) = 2\\cos^{2}\\left(\\frac{3x}{2}\\right)$: el radicando se vuelve un cuadrado perfecto.",
            "Turn the secant into a cosine, multiply by $\\cos(3x)$ top and bottom, and use the half angle $1+\\cos(3x) = 2\\cos^{2}\\left(\\frac{3x}{2}\\right)$: the radicand becomes a perfect square.",
          ),
          step(
            "calculation",
            `$\\dfrac{2\\sec(3x)}{1+\\sec(3x)} = \\dfrac{\\frac{2}{\\cos(3x)}}{\\frac{1+\\cos(3x)}{\\cos(3x)}} = \\dfrac{2}{1+\\cos(3x)} = \\dfrac{2}{2\\cos^{2}\\left(\\frac{3x}{2}\\right)} = \\sec^{2}\\left(\\dfrac{3x}{2}\\right)$<br>$\\sqrt{\\sec^{2}\\left(\\frac{3x}{2}\\right)} = \\sec\\left(\\dfrac{3x}{2}\\right)$`,
            `$\\dfrac{2\\sec(3x)}{1+\\sec(3x)} = \\dfrac{\\frac{2}{\\cos(3x)}}{\\frac{1+\\cos(3x)}{\\cos(3x)}} = \\dfrac{2}{1+\\cos(3x)} = \\dfrac{2}{2\\cos^{2}\\left(\\frac{3x}{2}\\right)} = \\sec^{2}\\left(\\dfrac{3x}{2}\\right)$<br>$\\sqrt{\\sec^{2}\\left(\\frac{3x}{2}\\right)} = \\sec\\left(\\dfrac{3x}{2}\\right)$`,
          ),
          step(
            "result",
            `La expresión equivale a $\\sec\\left(\\frac{3x}{2}\\right)$: en el dominio natural de la expresión la raíz devuelve el valor positivo del cuadrado. Comprobación numérica con $x = 0{,}2$: $\\sqrt{\\frac{2\\sec(0{,}6)}{1+\\sec(0{,}6)}} \\approx 1{,}0468$ y $\\sec(0{,}3) = \\frac{1}{\\cos(0{,}3)} \\approx 1{,}0468$ ✓ (los distractores valen $\\approx 1{,}2116$, $1{,}0857$ y $0{,}9553$ en ese mismo punto).`,
            `The expression equals $\\sec\\left(\\frac{3x}{2}\\right)$: on the expression's natural domain the root returns the positive value of the square. Numeric check at $x = 0.2$: $\\sqrt{\\frac{2\\sec(0.6)}{1+\\sec(0.6)}} \\approx 1.0468$ and $\\sec(0.3) = \\frac{1}{\\cos(0.3)} \\approx 1.0468$ ✓ (the distractors equal $\\approx 1.2116$, $1.0857$ and $0.9553$ at that same point).`,
          ),
        ],
      };
    },
  ),

  /* 4 · 29 — la pitagórica con u = 2x da 1, no 2: la única NO
     identidad. La opción impresa «tan(x)cos(x) = 1/csc(x)» (que sí es
     identidad) se descarta (regla de casa: 4 opciones). */
  template(
    {
      id: "trigfn-espol-ch4-29",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "identities",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 210,
      tags: ["identities", "pythagorean", "double-angle"],
      prerequisites: ["identities"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "4 · 29",
        page: 471,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\operatorname{sen}^{2}(2x) + \\cos^{2}(2x) = 2$`, `$\\sin^{2}(2x) + \\cos^{2}(2x) = 2$`), correct: true },
        { id: "b", text: L(`$\\operatorname{sen}\\left(\\dfrac{x}{2}\\right)\\cos\\left(\\dfrac{x}{2}\\right) = \\dfrac{1}{2}\\operatorname{sen}(x)$`, `$\\sin\\left(\\dfrac{x}{2}\\right)\\cos\\left(\\dfrac{x}{2}\\right) = \\dfrac{1}{2}\\sin(x)$`), correct: false },
        { id: "c", text: L(`$\\cos(4x) = \\cos^{2}(2x) - \\operatorname{sen}^{2}(2x)$`, `$\\cos(4x) = \\cos^{2}(2x) - \\sin^{2}(2x)$`), correct: false },
        { id: "d", text: L(`$\\tan(2x) = \\dfrac{2\\tan(x)}{1-\\tan^{2}(x)}$`, `$\\tan(2x) = \\dfrac{2\\tan(x)}{1-\\tan^{2}(x)}$`), correct: false },
      ];
      return {
        skill: L(
          "Detectar la identidad falsa entre cuatro candidatas",
          "Spotting the false identity among four candidates",
        ),
        statement: L(
          `La expresión que NO representa una identidad trigonométrica es:`,
          `The expression that does NOT represent a trigonometric identity is:`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Una identidad debe cumplirse para **todo** valor de $x$ del dominio común: basta un contraejemplo para descalificar una candidata.",
            "An identity must hold for **every** value of $x$ in the common domain: a single counterexample disqualifies a candidate.",
          ),
          L(
            "Tres candidatas son fórmulas estándar: el seno doble leído al revés, el coseno doble y la tangente doble.",
            "Three candidates are standard formulas: the double-angle sine read backwards, the double-angle cosine, and the double-angle tangent.",
          ),
          L(
            "Aplica la pitagórica con $u = 2x$ a la primera candidata: $\\operatorname{sen}^{2}(u) + \\cos^{2}(u)$ produce una constante; compárala con el lado derecho.",
            "Apply the Pythagorean identity with $u = 2x$ to the first candidate: $\\sin^{2}(u) + \\cos^{2}(u)$ produces a constant; compare it with the right-hand side.",
          ),
        ],
        answerDisplay: L(
          `No es identidad: $\\operatorname{sen}^{2}(2x) + \\cos^{2}(2x) = 1 \\ne 2$`,
          `Not an identity: $\\sin^{2}(2x) + \\cos^{2}(2x) = 1 \\ne 2$`,
        ),
        solution: [
          step(
            "given",
            "Cuatro ecuaciones candidatas a identidad trigonométrica; una de ellas falla.",
            "Four candidate trigonometric identities; one of them fails.",
          ),
          step(
            "approach",
            "Probar cada candidata contra las identidades fundamentales (pitagórica y ángulos dobles); la que no llegue a su lado derecho es la respuesta.",
            "Test each candidate against the fundamental identities (Pythagorean and double angles); the one that does not reach its right-hand side is the answer.",
          ),
          step(
            "calculation",
            `$\\operatorname{sen}^{2}(2x) + \\cos^{2}(2x) = 1 \\ne 2$: falla para todo $x$<br>$\\operatorname{sen}\\left(\\frac{x}{2}\\right)\\cos\\left(\\frac{x}{2}\\right) = \\frac{1}{2}\\operatorname{sen}(x)$: seno doble ✓<br>$\\cos(4x) = \\cos^{2}(2x) - \\operatorname{sen}^{2}(2x)$: coseno doble ✓<br>$\\tan(2x) = \\frac{2\\tan(x)}{1-\\tan^{2}(x)}$: tangente doble ✓`,
            `$\\sin^{2}(2x) + \\cos^{2}(2x) = 1 \\ne 2$: fails for every $x$<br>$\\sin\\left(\\frac{x}{2}\\right)\\cos\\left(\\frac{x}{2}\\right) = \\frac{1}{2}\\sin(x)$: double-angle sine ✓<br>$\\cos(4x) = \\cos^{2}(2x) - \\sin^{2}(2x)$: double-angle cosine ✓<br>$\\tan(2x) = \\frac{2\\tan(x)}{1-\\tan^{2}(x)}$: double-angle tangent ✓`,
          ),
          step(
            "result",
            `La que NO es identidad es $\\operatorname{sen}^{2}(2x) + \\cos^{2}(2x) = 2$: el lado izquierdo vale $1$ para todo $x$. Comprobación con $x = \\frac{\\pi}{6}$: $\\operatorname{sen}^{2}\\left(\\frac{\\pi}{3}\\right) + \\cos^{2}\\left(\\frac{\\pi}{3}\\right) = \\frac{3}{4} + \\frac{1}{4} = 1 \\ne 2$ ✓, mientras que las otras tres se cumplen en ese mismo punto: $\\operatorname{sen}\\left(\\frac{\\pi}{12}\\right)\\cos\\left(\\frac{\\pi}{12}\\right) = \\frac{1}{4} = \\frac{1}{2}\\operatorname{sen}\\left(\\frac{\\pi}{6}\\right)$, $\\cos\\left(\\frac{2\\pi}{3}\\right) = -\\frac{1}{2} = \\cos^{2}\\left(\\frac{\\pi}{3}\\right) - \\operatorname{sen}^{2}\\left(\\frac{\\pi}{3}\\right)$ y $\\tan\\left(\\frac{\\pi}{3}\\right) = \\sqrt{3} = \\frac{2\\tan\\left(\\frac{\\pi}{6}\\right)}{1-\\tan^{2}\\left(\\frac{\\pi}{6}\\right)}$.`,
            `The one that is NOT an identity is $\\sin^{2}(2x) + \\cos^{2}(2x) = 2$: the left-hand side equals $1$ for every $x$. Check at $x = \\frac{\\pi}{6}$: $\\sin^{2}\\left(\\frac{\\pi}{3}\\right) + \\cos^{2}\\left(\\frac{\\pi}{3}\\right) = \\frac{3}{4} + \\frac{1}{4} = 1 \\ne 2$ ✓, while the other three hold at that same point: $\\sin\\left(\\frac{\\pi}{12}\\right)\\cos\\left(\\frac{\\pi}{12}\\right) = \\frac{1}{4} = \\frac{1}{2}\\sin\\left(\\frac{\\pi}{6}\\right)$, $\\cos\\left(\\frac{2\\pi}{3}\\right) = -\\frac{1}{2} = \\cos^{2}\\left(\\frac{\\pi}{3}\\right) - \\sin^{2}\\left(\\frac{\\pi}{3}\\right)$ and $\\tan\\left(\\frac{\\pi}{3}\\right) = \\sqrt{3} = \\frac{2\\tan\\left(\\frac{\\pi}{6}\\right)}{1-\\tan^{2}\\left(\\frac{\\pi}{6}\\right)}$.`,
          ),
        ],
      };
    },
  ),

  /* 4 · 32 — con a = tan(25°): tan(245°) = 1/a, tan(335°) = −a,
     tan(205°) = a, tan(115°) = −1/a → (1−a²)/(1+a²). El orden
     numerador/denominador (245+335 sobre 205−115) está confirmado por
     la clave impresa (1−a²)/(1+a²); una pasada de VLM lo invirtió. */
  template(
    {
      id: "trigfn-espol-ch4-32",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "simplification",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 420,
      tags: ["simplification", "periodicity", "tangent"],
      prerequisites: ["simplification"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "4 · 32",
        page: 471,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\dfrac{1-a^{2}}{1+a^{2}}$`, `$\\dfrac{1-a^{2}}{1+a^{2}}$`), correct: true },
        { id: "b", text: L(`$\\dfrac{a^{2}-1}{1+a^{2}}$`, `$\\dfrac{a^{2}-1}{1+a^{2}}$`), correct: false },
        { id: "c", text: L(`$\\dfrac{1-a^{2}}{a^{2}-1}$`, `$\\dfrac{1-a^{2}}{a^{2}-1}$`), correct: false },
        { id: "d", text: L(`$\\dfrac{1+a^{2}}{1-a^{2}}$`, `$\\dfrac{1+a^{2}}{1-a^{2}}$`), correct: false },
      ];
      return {
        skill: L(
          "Reducir ángulos por período a una tangente dada",
          "Reducing angles by period to a given tangent",
        ),
        statement: L(
          `Si $\\tan(25^\\circ) = a$, representar en términos de $a$ la expresión $\\dfrac{\\tan(245^\\circ)+\\tan(335^\\circ)}{\\tan(205^\\circ)-\\tan(115^\\circ)}$.`,
          `If $\\tan(25^\\circ) = a$, express in terms of $a$ the value of $\\dfrac{\\tan(245^\\circ)+\\tan(335^\\circ)}{\\tan(205^\\circ)-\\tan(115^\\circ)}$.`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "La tangente tiene período $180^\\circ$: réstale $180^\\circ$ a cada ángulo mayor que $180^\\circ$, y $360^\\circ$ al que pase de $270^\\circ$.",
            "The tangent has period $180^\\circ$: subtract $180^\\circ$ from every angle above $180^\\circ$, and $360^\\circ$ from the one above $270^\\circ$.",
          ),
          L(
            "Los ángulos reducidos caen en $\\pm 25^\\circ$ o en $\\pm 65^\\circ$; como $65^\\circ = 90^\\circ - 25^\\circ$, sus tangentes valen $\\cot(25^\\circ) = \\frac{1}{a}$ con su signo.",
            "The reduced angles land on $\\pm 25^\\circ$ or $\\pm 65^\\circ$; since $65^\\circ = 90^\\circ - 25^\\circ$, their tangents equal $\\cot(25^\\circ) = \\frac{1}{a}$ with the corresponding sign.",
          ),
          L(
            "Sustituye las cuatro tangentes reducidas: al reunir cada par aparece el denominador $a$, común al numerador y al denominador de la fracción compuesta.",
            "Substitute the four reduced tangents: combining each pair produces the denominator $a$, shared by the numerator and the denominator of the compound fraction.",
          ),
        ],
        answerDisplay: L(
          `$\\dfrac{\\tan(245^\\circ)+\\tan(335^\\circ)}{\\tan(205^\\circ)-\\tan(115^\\circ)} = \\dfrac{\\frac{1}{a}-a}{a+\\frac{1}{a}} = \\dfrac{1-a^{2}}{1+a^{2}}$`,
          `$\\dfrac{\\tan(245^\\circ)+\\tan(335^\\circ)}{\\tan(205^\\circ)-\\tan(115^\\circ)} = \\dfrac{\\frac{1}{a}-a}{a+\\frac{1}{a}} = \\dfrac{1-a^{2}}{1+a^{2}}$`,
        ),
        solution: [
          step(
            "given",
            "$\\tan(25^\\circ) = a$; hay que escribir $\\dfrac{\\tan(245^\\circ)+\\tan(335^\\circ)}{\\tan(205^\\circ)-\\tan(115^\\circ)}$ en términos de $a$.",
            "$\\tan(25^\\circ) = a$; the value of $\\dfrac{\\tan(245^\\circ)+\\tan(335^\\circ)}{\\tan(205^\\circ)-\\tan(115^\\circ)}$ must be written in terms of $a$.",
          ),
          step(
            "approach",
            "Reducir cada ángulo con el período $180^\\circ$ de la tangente y la relación $\\tan(90^\\circ - \\theta) = \\cot(\\theta) = \\frac{1}{\\tan(\\theta)}$; después simplificar la fracción compuesta.",
            "Reduce each angle using the tangent's $180^\\circ$ period and the relation $\\tan(90^\\circ - \\theta) = \\cot(\\theta) = \\frac{1}{\\tan(\\theta)}$; then simplify the compound fraction.",
          ),
          step(
            "calculation",
            `$\\tan(245^\\circ) = \\tan(65^\\circ) = \\frac{1}{a}$, $\\quad \\tan(335^\\circ) = -\\tan(25^\\circ) = -a$<br>$\\tan(205^\\circ) = \\tan(25^\\circ) = a$, $\\quad \\tan(115^\\circ) = -\\tan(65^\\circ) = -\\frac{1}{a}$<br>$\\dfrac{\\frac{1}{a}-a}{a+\\frac{1}{a}} = \\dfrac{\\frac{1-a^{2}}{a}}{\\frac{1+a^{2}}{a}} = \\dfrac{1-a^{2}}{1+a^{2}}$`,
            `$\\tan(245^\\circ) = \\tan(65^\\circ) = \\frac{1}{a}$, $\\quad \\tan(335^\\circ) = -\\tan(25^\\circ) = -a$<br>$\\tan(205^\\circ) = \\tan(25^\\circ) = a$, $\\quad \\tan(115^\\circ) = -\\tan(65^\\circ) = -\\frac{1}{a}$<br>$\\dfrac{\\frac{1}{a}-a}{a+\\frac{1}{a}} = \\dfrac{\\frac{1-a^{2}}{a}}{\\frac{1+a^{2}}{a}} = \\dfrac{1-a^{2}}{1+a^{2}}$`,
          ),
          step(
            "result",
            `La expresión vale $\\frac{1-a^{2}}{1+a^{2}}$. Comprobación numérica con $a = \\tan(25^\\circ) \\approx 0{,}4663$: la fórmula da $\\frac{1-0{,}2174}{1+0{,}2174} \\approx 0{,}6428$, y evaluando directo $\\frac{\\tan(245^\\circ)+\\tan(335^\\circ)}{\\tan(205^\\circ)-\\tan(115^\\circ)} \\approx \\frac{2{,}1445-0{,}4663}{0{,}4663+2{,}1445} \\approx 0{,}6428$ ✓ (los distractores valen $\\approx -0{,}6428$, $-1$ y $\\approx 1{,}556$).`,
            `The expression equals $\\frac{1-a^{2}}{1+a^{2}}$. Numeric check with $a = \\tan(25^\\circ) \\approx 0.4663$: the formula gives $\\frac{1-0.2174}{1+0.2174} \\approx 0.6428$, and direct evaluation gives $\\frac{\\tan(245^\\circ)+\\tan(335^\\circ)}{\\tan(205^\\circ)-\\tan(115^\\circ)} \\approx \\frac{2.1445-0.4663}{0.4663+2.1445} \\approx 0.6428$ ✓ (the distractors equal $\\approx -0.6428$, $-1$ and $\\approx 1.556$).`,
          ),
        ],
      };
    },
  ),

  /* 4 · 33a — 1/(2sen(10°)) − 2sen(70°) = 1: común denominador y
     producto a suma con cos(80°) = sen(10°) (4sen10·sen70 = 1−2sen10). */
  template(
    {
      id: "trigfn-espol-ch4-33a",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "simplification",
      difficulty: "challenge",
      questionType: "numeric",
      estimatedTimeSec: 360,
      tags: ["simplification", "product-to-sum", "cofunction"],
      prerequisites: ["simplification"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "4 · 33a",
        page: 472,
      },
      reasoning: "estimation",
    },
    () => ({
      skill: L(
        "Producto a suma para cancelar un denominador",
        "Product-to-sum to cancel a denominator",
      ),
      statement: L(
        `Simplificar y hallar el valor de: $\\dfrac{1}{2\\operatorname{sen}(10^\\circ)} - 2\\operatorname{sen}(70^\\circ)$`,
        `Simplify and find the value of: $\\dfrac{1}{2\\sin(10^\\circ)} - 2\\sin(70^\\circ)$`,
      ),
      answer: {
        kind: "numeric",
        value: 1,
        tolerance: { mode: "absolute", value: 0.05 },
      },
      hints: [
        L(
          "Escribe todo sobre el denominador común $2\\operatorname{sen}(10^\\circ)$: el numerador queda $1 - 4\\operatorname{sen}(10^\\circ)\\operatorname{sen}(70^\\circ)$.",
          "Put everything over the common denominator $2\\sin(10^\\circ)$: the numerator becomes $1 - 4\\sin(10^\\circ)\\sin(70^\\circ)$.",
        ),
        L(
          "Convierte el producto con $2\\operatorname{sen}(u)\\operatorname{sen}(v) = \\cos(u-v) - \\cos(u+v)$: aparece $\\cos(60^\\circ)$, un valor notable.",
          "Convert the product with $2\\sin(u)\\sin(v) = \\cos(u-v) - \\cos(u+v)$: $\\cos(60^\\circ)$ appears, a notable value.",
        ),
        L(
          "El otro término que aparece es $\\cos(80^\\circ)$; usa $\\cos(80^\\circ) = \\operatorname{sen}(10^\\circ)$ para cerrar el numerador.",
          "The other term that appears is $\\cos(80^\\circ)$; use $\\cos(80^\\circ) = \\sin(10^\\circ)$ to close off the numerator.",
        ),
      ],
      answerDisplay: L(
        `$\\dfrac{1}{2\\operatorname{sen}(10^\\circ)} - 2\\operatorname{sen}(70^\\circ) = \\dfrac{2\\operatorname{sen}(10^\\circ)}{2\\operatorname{sen}(10^\\circ)} = 1$`,
        `$\\dfrac{1}{2\\sin(10^\\circ)} - 2\\sin(70^\\circ) = \\dfrac{2\\sin(10^\\circ)}{2\\sin(10^\\circ)} = 1$`,
      ),
      solution: [
        step(
          "given",
          "La expresión $\\dfrac{1}{2\\operatorname{sen}(10^\\circ)} - 2\\operatorname{sen}(70^\\circ)$.",
          "The expression $\\dfrac{1}{2\\sin(10^\\circ)} - 2\\sin(70^\\circ)$.",
        ),
        step(
          "approach",
          "Común denominador y producto a suma: el numerador $1 - 4\\operatorname{sen}(10^\\circ)\\operatorname{sen}(70^\\circ)$ se evalúa con $2\\operatorname{sen}(u)\\operatorname{sen}(v) = \\cos(u-v) - \\cos(u+v)$ y la cofunción $\\cos(80^\\circ) = \\operatorname{sen}(10^\\circ)$.",
          "Common denominator and product-to-sum: the numerator $1 - 4\\sin(10^\\circ)\\sin(70^\\circ)$ is evaluated with $2\\sin(u)\\sin(v) = \\cos(u-v) - \\cos(u+v)$ and the cofunction $\\cos(80^\\circ) = \\sin(10^\\circ)$.",
        ),
        step(
          "calculation",
          `$1 - 4\\operatorname{sen}(10^\\circ)\\operatorname{sen}(70^\\circ) = 1 - 2\\left[\\cos(60^\\circ) - \\cos(80^\\circ)\\right] = 1 - 2\\left(\\frac{1}{2} - \\operatorname{sen}(10^\\circ)\\right) = 2\\operatorname{sen}(10^\\circ)$<br>$\\Rightarrow \\dfrac{1}{2\\operatorname{sen}(10^\\circ)} - 2\\operatorname{sen}(70^\\circ) = \\dfrac{2\\operatorname{sen}(10^\\circ)}{2\\operatorname{sen}(10^\\circ)} = 1$`,
          `$1 - 4\\sin(10^\\circ)\\sin(70^\\circ) = 1 - 2\\left[\\cos(60^\\circ) - \\cos(80^\\circ)\\right] = 1 - 2\\left(\\frac{1}{2} - \\sin(10^\\circ)\\right) = 2\\sin(10^\\circ)$<br>$\\Rightarrow \\dfrac{1}{2\\sin(10^\\circ)} - 2\\sin(70^\\circ) = \\dfrac{2\\sin(10^\\circ)}{2\\sin(10^\\circ)} = 1$`,
        ),
        step(
          "result",
          `El valor exacto es $1$. Comprobación numérica: $\\frac{1}{2\\operatorname{sen}(10^\\circ)} \\approx 2{,}8794$ y $2\\operatorname{sen}(70^\\circ) \\approx 1{,}8794$, así que la expresión vale $2{,}8794 - 1{,}8794 = 1{,}0000$ ✓ (la clave de la cancelación perfecta es $\\cos(80^\\circ) = \\operatorname{sen}(10^\\circ)$, ángulos complementarios).`,
          `The exact value is $1$. Numeric check: $\\frac{1}{2\\sin(10^\\circ)} \\approx 2.8794$ and $2\\sin(70^\\circ) \\approx 1.8794$, so the expression equals $2.8794 - 1.8794 = 1.0000$ ✓ (the key to the perfect cancellation is $\\cos(80^\\circ) = \\sin(10^\\circ)$, complementary angles).`,
        ),
      ],
    }),
  ),

  /* 4 · 33b — sen(π/12)cos(π/12) = ½·sen(π/6) = 1/4. */
  template(
    {
      id: "trigfn-espol-ch4-33b",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "simplification",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 180,
      tags: ["simplification", "double-angle", "exact-values"],
      prerequisites: ["simplification"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "4 · 33b",
        page: 472,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L(
        "Producto seno-coseno vía el ángulo doble",
        "Sine-cosine product via the double angle",
      ),
      statement: L(
        `Simplificar y hallar el valor de: $\\operatorname{sen}\\left(\\dfrac{\\pi}{12}\\right)\\cos\\left(\\dfrac{\\pi}{12}\\right)$`,
        `Simplify and find the value of: $\\sin\\left(\\dfrac{\\pi}{12}\\right)\\cos\\left(\\dfrac{\\pi}{12}\\right)$`,
      ),
      answer: {
        kind: "numeric",
        value: 0.25,
        tolerance: { mode: "relative", value: 0.02 },
      },
      hints: [
        L(
          "El ángulo doble de $\\frac{\\pi}{12}$ es $\\frac{\\pi}{6}$, un valor notable de la tabla.",
          "The double of $\\frac{\\pi}{12}$ is $\\frac{\\pi}{6}$, a notable value from the table.",
        ),
        L(
          "La identidad del seno doble leída al revés: $\\operatorname{sen}(u)\\cos(u) = \\frac{1}{2}\\operatorname{sen}(2u)$.",
          "The double-angle identity for sine read backwards: $\\sin(u)\\cos(u) = \\frac{1}{2}\\sin(2u)$.",
        ),
        L(
          "Sustituye el valor exacto de $\\operatorname{sen}\\left(\\frac{\\pi}{6}\\right)$ y divide entre $2$.",
          "Substitute the exact value of $\\sin\\left(\\frac{\\pi}{6}\\right)$ and divide by $2$.",
        ),
      ],
      answerDisplay: L(
        `$\\operatorname{sen}\\left(\\dfrac{\\pi}{12}\\right)\\cos\\left(\\dfrac{\\pi}{12}\\right) = \\dfrac{1}{2}\\operatorname{sen}\\left(\\dfrac{\\pi}{6}\\right) = \\dfrac{1}{4}$`,
        `$\\sin\\left(\\dfrac{\\pi}{12}\\right)\\cos\\left(\\dfrac{\\pi}{12}\\right) = \\dfrac{1}{2}\\sin\\left(\\dfrac{\\pi}{6}\\right) = \\dfrac{1}{4}$`,
      ),
      solution: [
        step(
          "given",
          "El producto $\\operatorname{sen}\\left(\\dfrac{\\pi}{12}\\right)\\cos\\left(\\dfrac{\\pi}{12}\\right)$.",
          "The product $\\sin\\left(\\dfrac{\\pi}{12}\\right)\\cos\\left(\\dfrac{\\pi}{12}\\right)$.",
        ),
        step(
          "approach",
          "Reconocer el patrón $\\operatorname{sen}(u)\\cos(u)$ con $u = \\frac{\\pi}{12}$: es medio seno del ángulo doble $2u = \\frac{\\pi}{6}$, un valor notable.",
          "Recognize the pattern $\\sin(u)\\cos(u)$ with $u = \\frac{\\pi}{12}$: it is half the sine of the double angle $2u = \\frac{\\pi}{6}$, a notable value.",
        ),
        step(
          "calculation",
          `$\\operatorname{sen}\\left(\\frac{\\pi}{12}\\right)\\cos\\left(\\frac{\\pi}{12}\\right) = \\frac{1}{2}\\operatorname{sen}\\left(\\frac{\\pi}{6}\\right) = \\frac{1}{2} \\cdot \\frac{1}{2} = \\frac{1}{4}$`,
          `$\\sin\\left(\\frac{\\pi}{12}\\right)\\cos\\left(\\frac{\\pi}{12}\\right) = \\frac{1}{2}\\sin\\left(\\frac{\\pi}{6}\\right) = \\frac{1}{2} \\cdot \\frac{1}{2} = \\frac{1}{4}$`,
        ),
        step(
          "result",
          `El valor es $\\frac{1}{4} = 0{,}25$. Comprobación con los valores exactos $\\operatorname{sen}\\left(\\frac{\\pi}{12}\\right) = \\frac{\\sqrt{6}-\\sqrt{2}}{4}$ y $\\cos\\left(\\frac{\\pi}{12}\\right) = \\frac{\\sqrt{6}+\\sqrt{2}}{4}$: el producto es $\\frac{(\\sqrt{6})^{2}-(\\sqrt{2})^{2}}{16} = \\frac{6-2}{16} = \\frac{1}{4}$ ✓.`,
          `The value is $\\frac{1}{4} = 0.25$. Check with the exact values $\\sin\\left(\\frac{\\pi}{12}\\right) = \\frac{\\sqrt{6}-\\sqrt{2}}{4}$ and $\\cos\\left(\\frac{\\pi}{12}\\right) = \\frac{\\sqrt{6}+\\sqrt{2}}{4}$: the product is $\\frac{(\\sqrt{6})^{2}-(\\sqrt{2})^{2}}{16} = \\frac{6-2}{16} = \\frac{1}{4}$ ✓.`,
        ),
      ],
    }),
  ),

  /* 4 · 33c — tan(55°) − tan(35°) = sen(20°)/(cos(55°)cos(35°)) =
     2tan(20°); la clave del libro DEJA la respuesta como expresión
     trigonométrica (2tan(20°)). */
  template(
    {
      id: "trigfn-espol-ch4-33c",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "simplification",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["simplification", "product-to-sum", "tangent"],
      prerequisites: ["simplification"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "4 · 33c",
        page: 472,
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$2\\tan(20^\\circ)$`, `$2\\tan(20^\\circ)$`), correct: true },
        { id: "b", text: L(`$2\\cot(20^\\circ)$`, `$2\\cot(20^\\circ)$`), correct: false },
        { id: "c", text: L(`$\\tan(20^\\circ)$`, `$\\tan(20^\\circ)$`), correct: false },
        { id: "d", text: L(`$\\cot(20^\\circ)$`, `$\\cot(20^\\circ)$`), correct: false },
      ];
      return {
        skill: L(
          "Diferencia de tangentes con producto a suma",
          "Tangent difference via product-to-sum",
        ),
        statement: L(
          `Simplificar y hallar el valor de: $\\tan(55^\\circ) - \\tan(35^\\circ)$`,
          `Simplify and find the value of: $\\tan(55^\\circ) - \\tan(35^\\circ)$`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Pasa cada tangente a $\\frac{\\operatorname{sen}}{\\cos}$ con denominador común $\\cos(55^\\circ)\\cos(35^\\circ)$: el numerador es un seno de diferencia.",
            "Rewrite each tangent as $\\frac{\\sin}{\\cos}$ over the common denominator $\\cos(55^\\circ)\\cos(35^\\circ)$: the numerator is a sine of a difference.",
          ),
          L(
            "El numerador es $\\operatorname{sen}(55^\\circ)\\cos(35^\\circ) - \\cos(55^\\circ)\\operatorname{sen}(35^\\circ) = \\operatorname{sen}(20^\\circ)$.",
            "The numerator is $\\sin(55^\\circ)\\cos(35^\\circ) - \\cos(55^\\circ)\\sin(35^\\circ) = \\sin(20^\\circ)$.",
          ),
          L(
            "Para el denominador usa $2\\cos(55^\\circ)\\cos(35^\\circ) = \\cos(90^\\circ) + \\cos(20^\\circ)$: uno de los dos términos se anula.",
            "For the denominator use $2\\cos(55^\\circ)\\cos(35^\\circ) = \\cos(90^\\circ) + \\cos(20^\\circ)$: one of the two terms vanishes.",
          ),
        ],
        answerDisplay: L(
          `$\\tan(55^\\circ) - \\tan(35^\\circ) = \\dfrac{\\operatorname{sen}(20^\\circ)}{\\frac{1}{2}\\cos(20^\\circ)} = 2\\tan(20^\\circ)$`,
          `$\\tan(55^\\circ) - \\tan(35^\\circ) = \\dfrac{\\sin(20^\\circ)}{\\frac{1}{2}\\cos(20^\\circ)} = 2\\tan(20^\\circ)$`,
        ),
        solution: [
          step(
            "given",
            "La diferencia $\\tan(55^\\circ) - \\tan(35^\\circ)$.",
            "The difference $\\tan(55^\\circ) - \\tan(35^\\circ)$.",
          ),
          step(
            "approach",
            "Pasar a senos y cosenos: el numerador se convierte en $\\operatorname{sen}(55^\\circ - 35^\\circ)$ y el denominador $\\cos(55^\\circ)\\cos(35^\\circ)$ se ataca con producto a suma.",
            "Convert to sines and cosines: the numerator becomes $\\sin(55^\\circ - 35^\\circ)$ and the denominator $\\cos(55^\\circ)\\cos(35^\\circ)$ is attacked with product-to-sum.",
          ),
          step(
            "calculation",
            `$\\tan(55^\\circ) - \\tan(35^\\circ) = \\dfrac{\\operatorname{sen}(55^\\circ)\\cos(35^\\circ) - \\cos(55^\\circ)\\operatorname{sen}(35^\\circ)}{\\cos(55^\\circ)\\cos(35^\\circ)} = \\dfrac{\\operatorname{sen}(20^\\circ)}{\\cos(55^\\circ)\\cos(35^\\circ)}$<br>$2\\cos(55^\\circ)\\cos(35^\\circ) = \\cos(90^\\circ) + \\cos(20^\\circ) = \\cos(20^\\circ) \\Rightarrow \\cos(55^\\circ)\\cos(35^\\circ) = \\dfrac{\\cos(20^\\circ)}{2}$<br>$\\Rightarrow \\tan(55^\\circ) - \\tan(35^\\circ) = \\dfrac{\\operatorname{sen}(20^\\circ)}{\\frac{1}{2}\\cos(20^\\circ)} = 2\\tan(20^\\circ)$`,
            `$\\tan(55^\\circ) - \\tan(35^\\circ) = \\dfrac{\\sin(55^\\circ)\\cos(35^\\circ) - \\cos(55^\\circ)\\sin(35^\\circ)}{\\cos(55^\\circ)\\cos(35^\\circ)} = \\dfrac{\\sin(20^\\circ)}{\\cos(55^\\circ)\\cos(35^\\circ)}$<br>$2\\cos(55^\\circ)\\cos(35^\\circ) = \\cos(90^\\circ) + \\cos(20^\\circ) = \\cos(20^\\circ) \\Rightarrow \\cos(55^\\circ)\\cos(35^\\circ) = \\dfrac{\\cos(20^\\circ)}{2}$<br>$\\Rightarrow \\tan(55^\\circ) - \\tan(35^\\circ) = \\dfrac{\\sin(20^\\circ)}{\\frac{1}{2}\\cos(20^\\circ)} = 2\\tan(20^\\circ)$`,
          ),
          step(
            "result",
            `El valor queda como $2\\tan(20^\\circ)$ (así lo deja el libro: expresión trigonométrica, no decimal). Comprobación numérica: $\\tan(55^\\circ) - \\tan(35^\\circ) \\approx 1{,}4281 - 0{,}7002 = 0{,}7279$ y $2\\tan(20^\\circ) \\approx 2 \\cdot 0{,}3640 = 0{,}7279$ ✓ (los distractores valen $\\approx 5{,}495$, $0{,}364$ y $2{,}747$).`,
            `The value stays as $2\\tan(20^\\circ)$ (that is how the book leaves it: a trig expression, not a decimal). Numeric check: $\\tan(55^\\circ) - \\tan(35^\\circ) \\approx 1.4281 - 0.7002 = 0.7279$ and $2\\tan(20^\\circ) \\approx 2 \\cdot 0.3640 = 0.7279$ ✓ (the distractors equal $\\approx 5.495$, $0.364$ and $2.747$).`,
          ),
        ],
      };
    },
  ),

  /* 4 · 33d — cos(π/5)cos(3π/5) = ½[cos(4π/5)+cos(2π/5)] = −1/4 por
     la suma de las raíces quintas de la unidad (pentágono regular). */
  template(
    {
      id: "trigfn-espol-ch4-33d",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "simplification",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["simplification", "product-to-sum", "exact-values", "roots-of-unity"],
      prerequisites: ["simplification"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "4 · 33d",
        page: 472,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$-\\dfrac{1}{4}$`, `$-\\dfrac{1}{4}$`), correct: true },
        { id: "b", text: L(`$\\dfrac{1}{4}$`, `$\\dfrac{1}{4}$`), correct: false },
        { id: "c", text: L(`$-\\dfrac{1}{2}$`, `$-\\dfrac{1}{2}$`), correct: false },
        { id: "d", text: L(`$\\dfrac{1}{2}$`, `$\\dfrac{1}{2}$`), correct: false },
      ];
      return {
        skill: L(
          "Producto de cosenos y la suma de las raíces quintas",
          "Cosine product and the fifth-roots sum",
        ),
        statement: L(
          `Simplificar y hallar el valor de: $\\cos\\left(\\dfrac{\\pi}{5}\\right)\\cos\\left(\\dfrac{3\\pi}{5}\\right)$`,
          `Simplify and find the value of: $\\cos\\left(\\dfrac{\\pi}{5}\\right)\\cos\\left(\\dfrac{3\\pi}{5}\\right)$`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Producto a suma: $2\\cos\\left(\\frac{\\pi}{5}\\right)\\cos\\left(\\frac{3\\pi}{5}\\right) = \\cos\\left(\\frac{4\\pi}{5}\\right) + \\cos\\left(\\frac{2\\pi}{5}\\right)$.",
            "Product-to-sum: $2\\cos\\left(\\frac{\\pi}{5}\\right)\\cos\\left(\\frac{3\\pi}{5}\\right) = \\cos\\left(\\frac{4\\pi}{5}\\right) + \\cos\\left(\\frac{2\\pi}{5}\\right)$.",
          ),
          L(
            "Los ángulos $\\frac{2\\pi}{5}$ y $\\frac{4\\pi}{5}$ son los pasos del pentágono regular: sus cosenos aparecen al sumar las cinco raíces quintas de la unidad.",
            "The angles $\\frac{2\\pi}{5}$ and $\\frac{4\\pi}{5}$ are the steps of the regular pentagon: their cosines appear when adding the five fifth roots of unity.",
          ),
          L(
            "De $1 + 2\\cos\\left(\\frac{2\\pi}{5}\\right) + 2\\cos\\left(\\frac{4\\pi}{5}\\right) = 0$ sale la suma que necesitas; no olvides el factor $\\frac{1}{2}$ del paso inicial.",
            "From $1 + 2\\cos\\left(\\frac{2\\pi}{5}\\right) + 2\\cos\\left(\\frac{4\\pi}{5}\\right) = 0$ comes the sum you need; do not forget the $\\frac{1}{2}$ factor from the first step.",
          ),
        ],
        answerDisplay: L(
          `$\\cos\\left(\\dfrac{\\pi}{5}\\right)\\cos\\left(\\dfrac{3\\pi}{5}\\right) = \\dfrac{1}{2}\\left[\\cos\\left(\\dfrac{4\\pi}{5}\\right) + \\cos\\left(\\dfrac{2\\pi}{5}\\right)\\right] = -\\dfrac{1}{4}$`,
          `$\\cos\\left(\\dfrac{\\pi}{5}\\right)\\cos\\left(\\dfrac{3\\pi}{5}\\right) = \\dfrac{1}{2}\\left[\\cos\\left(\\dfrac{4\\pi}{5}\\right) + \\cos\\left(\\dfrac{2\\pi}{5}\\right)\\right] = -\\dfrac{1}{4}$`,
        ),
        solution: [
          step(
            "given",
            "El producto $\\cos\\left(\\dfrac{\\pi}{5}\\right)\\cos\\left(\\dfrac{3\\pi}{5}\\right)$.",
            "The product $\\cos\\left(\\dfrac{\\pi}{5}\\right)\\cos\\left(\\dfrac{3\\pi}{5}\\right)$.",
          ),
          step(
            "approach",
            "Producto a suma para juntar $\\cos\\left(\\frac{4\\pi}{5}\\right) + \\cos\\left(\\frac{2\\pi}{5}\\right)$, y la suma de las raíces quintas de la unidad (el pentágono regular) para evaluarla.",
            "Product-to-sum to gather $\\cos\\left(\\frac{4\\pi}{5}\\right) + \\cos\\left(\\frac{2\\pi}{5}\\right)$, and the sum of the fifth roots of unity (the regular pentagon) to evaluate it.",
          ),
          step(
            "calculation",
            `$2\\cos\\left(\\frac{\\pi}{5}\\right)\\cos\\left(\\frac{3\\pi}{5}\\right) = \\cos\\left(\\frac{4\\pi}{5}\\right) + \\cos\\left(\\frac{2\\pi}{5}\\right)$<br>Las cinco raíces de $z^{5} = 1$ suman $0$: $1 + 2\\cos\\left(\\frac{2\\pi}{5}\\right) + 2\\cos\\left(\\frac{4\\pi}{5}\\right) = 0 \\Rightarrow \\cos\\left(\\frac{4\\pi}{5}\\right) + \\cos\\left(\\frac{2\\pi}{5}\\right) = -\\frac{1}{2}$<br>$\\Rightarrow \\cos\\left(\\frac{\\pi}{5}\\right)\\cos\\left(\\frac{3\\pi}{5}\\right) = \\frac{1}{2}\\left(-\\frac{1}{2}\\right) = -\\frac{1}{4}$`,
            `$2\\cos\\left(\\frac{\\pi}{5}\\right)\\cos\\left(\\frac{3\\pi}{5}\\right) = \\cos\\left(\\frac{4\\pi}{5}\\right) + \\cos\\left(\\frac{2\\pi}{5}\\right)$<br>The five roots of $z^{5} = 1$ add up to $0$: $1 + 2\\cos\\left(\\frac{2\\pi}{5}\\right) + 2\\cos\\left(\\frac{4\\pi}{5}\\right) = 0 \\Rightarrow \\cos\\left(\\frac{4\\pi}{5}\\right) + \\cos\\left(\\frac{2\\pi}{5}\\right) = -\\frac{1}{2}$<br>$\\Rightarrow \\cos\\left(\\frac{\\pi}{5}\\right)\\cos\\left(\\frac{3\\pi}{5}\\right) = \\frac{1}{2}\\left(-\\frac{1}{2}\\right) = -\\frac{1}{4}$`,
          ),
          step(
            "result",
            `El producto vale $-\\frac{1}{4}$. Comprobación con los valores exactos del pentágono: $\\cos\\left(\\frac{\\pi}{5}\\right) = \\frac{1+\\sqrt{5}}{4}$ y $\\cos\\left(\\frac{3\\pi}{5}\\right) = \\frac{1-\\sqrt{5}}{4}$, así que el producto es $\\frac{(1+\\sqrt{5})(1-\\sqrt{5})}{16} = \\frac{1-5}{16} = -\\frac{1}{4}$ ✓ (numéricamente, $0{,}8090 \\cdot (-0{,}3090) = -0{,}25$).`,
            `The product equals $-\\frac{1}{4}$. Check with the pentagon's exact values: $\\cos\\left(\\frac{\\pi}{5}\\right) = \\frac{1+\\sqrt{5}}{4}$ and $\\cos\\left(\\frac{3\\pi}{5}\\right) = \\frac{1-\\sqrt{5}}{4}$, so the product is $\\frac{(1+\\sqrt{5})(1-\\sqrt{5})}{16} = \\frac{1-5}{16} = -\\frac{1}{4}$ ✓ (numerically, $0.8090 \\cdot (-0.3090) = -0.25$).`,
          ),
        ],
      };
    },
  ),

  /* 4 · 33f — producto de seis cosenos π/65 … 32π/65 = 1/64 (cadena
     de ángulo doble; sen(64π/65) = sen(π/65)). El libro repite el
     ejercicio como 5.5 · 49b (ya importado como trigf-espol-49b en
     versión numérica); aquí llega como MC con las opciones impresas
     del Cap. 4. */
  template(
    {
      id: "trigfn-espol-ch4-33f",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "simplification",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 420,
      tags: ["simplification", "double-angle", "product"],
      prerequisites: ["simplification"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "4 · 33f",
        page: 472,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\dfrac{1}{64}$`, `$\\dfrac{1}{64}$`), correct: true },
        { id: "b", text: L(`$\\dfrac{1}{32}$`, `$\\dfrac{1}{32}$`), correct: false },
        { id: "c", text: L(`$\\dfrac{1}{128}$`, `$\\dfrac{1}{128}$`), correct: false },
        { id: "d", text: L(`$\\dfrac{1}{2}$`, `$\\dfrac{1}{2}$`), correct: false },
      ];
      return {
        skill: L(
          "Seis cosenos en cadena hacia una potencia de 2",
          "Six chained cosines heading to a power of 2",
        ),
        statement: L(
          `Simplificar y hallar el valor de: $$\\cos\\left(\\dfrac{\\pi}{65}\\right)\\cos\\left(\\dfrac{2\\pi}{65}\\right)\\cos\\left(\\dfrac{4\\pi}{65}\\right)\\cos\\left(\\dfrac{8\\pi}{65}\\right)\\cos\\left(\\dfrac{16\\pi}{65}\\right)\\cos\\left(\\dfrac{32\\pi}{65}\\right)$$`,
          `Simplify and find the value of: $$\\cos\\left(\\dfrac{\\pi}{65}\\right)\\cos\\left(\\dfrac{2\\pi}{65}\\right)\\cos\\left(\\dfrac{4\\pi}{65}\\right)\\cos\\left(\\dfrac{8\\pi}{65}\\right)\\cos\\left(\\dfrac{16\\pi}{65}\\right)\\cos\\left(\\dfrac{32\\pi}{65}\\right)$$`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Los seis ángulos son $2^{k} \\cdot \\frac{\\pi}{65}$, $k = 0, \\dots, 5$: se duplican. Multiplica y divide por $2\\operatorname{sen}\\left(\\frac{\\pi}{65}\\right)$.",
            "The six angles are $2^{k} \\cdot \\frac{\\pi}{65}$, $k = 0, \\dots, 5$: they double. Multiply and divide by $2\\sin\\left(\\frac{\\pi}{65}\\right)$.",
          ),
          L(
            "La identidad general de la cadena: $\\prod_{k=0}^{n-1}\\cos(2^{k}x) = \\dfrac{\\operatorname{sen}(2^{n}x)}{2^{n}\\operatorname{sen}(x)}$.",
            "The general chain identity: $\\prod_{k=0}^{n-1}\\cos(2^{k}x) = \\dfrac{\\sin(2^{n}x)}{2^{n}\\sin(x)}$.",
          ),
          L(
            "Con $n = 6$ el numerador es $\\operatorname{sen}\\left(\\frac{64\\pi}{65}\\right)$; como $\\frac{64\\pi}{65}$ y $\\frac{\\pi}{65}$ son suplementarios, ese seno es igual al del denominador.",
            "With $n = 6$ the numerator is $\\sin\\left(\\frac{64\\pi}{65}\\right)$; since $\\frac{64\\pi}{65}$ and $\\frac{\\pi}{65}$ are supplementary, that sine equals the one in the denominator.",
          ),
        ],
        answerDisplay: L(
          `$\\prod_{k=0}^{5}\\cos\\left(2^{k}\\dfrac{\\pi}{65}\\right) = \\dfrac{\\operatorname{sen}\\left(\\frac{64\\pi}{65}\\right)}{64\\,\\operatorname{sen}\\left(\\frac{\\pi}{65}\\right)} = \\dfrac{1}{64}$`,
          `$\\prod_{k=0}^{5}\\cos\\left(2^{k}\\dfrac{\\pi}{65}\\right) = \\dfrac{\\sin\\left(\\frac{64\\pi}{65}\\right)}{64\\,\\sin\\left(\\frac{\\pi}{65}\\right)} = \\dfrac{1}{64}$`,
        ),
        solution: [
          step(
            "given",
            "El producto de los seis cosenos $\\cos\\left(2^{k}\\frac{\\pi}{65}\\right)$, $k = 0, \\dots, 5$.",
            "The product of the six cosines $\\cos\\left(2^{k}\\frac{\\pi}{65}\\right)$, $k = 0, \\dots, 5$.",
          ),
          step(
            "approach",
            "Cadena de ángulo doble: multiplicar por $\\frac{2\\operatorname{sen}(\\pi/65)}{2\\operatorname{sen}(\\pi/65)}$ dispara la identidad $\\prod_{k=0}^{n-1}\\cos(2^{k}x) = \\frac{\\operatorname{sen}(2^{n}x)}{2^{n}\\operatorname{sen}(x)}$; el numerador cae justo junto a $\\pi$.",
            "Double-angle chain: multiplying by $\\frac{2\\sin(\\pi/65)}{2\\sin(\\pi/65)}$ triggers the identity $\\prod_{k=0}^{n-1}\\cos(2^{k}x) = \\frac{\\sin(2^{n}x)}{2^{n}\\sin(x)}$; the numerator lands right next to $\\pi$.",
          ),
          step(
            "calculation",
            `$\\prod_{k=0}^{5}\\cos\\left(2^{k}\\frac{\\pi}{65}\\right) = \\dfrac{\\operatorname{sen}\\left(2^{6}\\frac{\\pi}{65}\\right)}{2^{6}\\operatorname{sen}\\left(\\frac{\\pi}{65}\\right)} = \\dfrac{\\operatorname{sen}\\left(\\frac{64\\pi}{65}\\right)}{64\\,\\operatorname{sen}\\left(\\frac{\\pi}{65}\\right)}$<br>$\\operatorname{sen}\\left(\\frac{64\\pi}{65}\\right) = \\operatorname{sen}\\left(\\pi - \\frac{\\pi}{65}\\right) = \\operatorname{sen}\\left(\\frac{\\pi}{65}\\right)$<br>$\\Rightarrow \\text{producto} = \\dfrac{\\operatorname{sen}\\left(\\frac{\\pi}{65}\\right)}{64\\,\\operatorname{sen}\\left(\\frac{\\pi}{65}\\right)} = \\dfrac{1}{64}$`,
            `$\\prod_{k=0}^{5}\\cos\\left(2^{k}\\frac{\\pi}{65}\\right) = \\dfrac{\\sin\\left(2^{6}\\frac{\\pi}{65}\\right)}{2^{6}\\sin\\left(\\frac{\\pi}{65}\\right)} = \\dfrac{\\sin\\left(\\frac{64\\pi}{65}\\right)}{64\\,\\sin\\left(\\frac{\\pi}{65}\\right)}$<br>$\\sin\\left(\\frac{64\\pi}{65}\\right) = \\sin\\left(\\pi - \\frac{\\pi}{65}\\right) = \\sin\\left(\\frac{\\pi}{65}\\right)$<br>$\\Rightarrow \\text{product} = \\dfrac{\\sin\\left(\\frac{\\pi}{65}\\right)}{64\\,\\sin\\left(\\frac{\\pi}{65}\\right)} = \\dfrac{1}{64}$`,
          ),
          step(
            "result",
            `El producto exacto es $\\frac{1}{64} = 0{,}015625$: solo importa que $\\frac{64\\pi}{65}$ y $\\frac{\\pi}{65}$ sean suplementarios. Comprobación con calculadora: $\\cos(2{,}77^\\circ)\\cos(5{,}54^\\circ)\\cos(11{,}08^\\circ)\\cos(22{,}15^\\circ)\\cos(44{,}31^\\circ)\\cos(88{,}62^\\circ) \\approx 0{,}0156$ ✓ (los distractores $\\frac{1}{32}$, $\\frac{1}{128}$ y $\\frac{1}{2}$ corresponden a usar $2^{5}$, $2^{7}$ o $2^{1}$ en el denominador).`,
            `The exact product is $\\frac{1}{64} = 0.015625$: all that matters is that $\\frac{64\\pi}{65}$ and $\\frac{\\pi}{65}$ are supplementary. Calculator check: $\\cos(2.77^\\circ)\\cos(5.54^\\circ)\\cos(11.08^\\circ)\\cos(22.15^\\circ)\\cos(44.31^\\circ)\\cos(88.62^\\circ) \\approx 0.0156$ ✓ (the distractors $\\frac{1}{32}$, $\\frac{1}{128}$ and $\\frac{1}{2}$ correspond to using $2^{5}$, $2^{7}$ or $2^{1}$ in the denominator).`,
          ),
        ],
      };
    },
  ),

  /* 4 · 36 — (1−sen²θ)(1+tan²θ) = cos²θ·sec²θ = 1, no −1: la única
     NO identidad (las otras tres salen de las pitagóricas). */
  template(
    {
      id: "trigfn-espol-ch4-36",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "identities",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["identities", "pythagorean", "reciprocals"],
      prerequisites: ["identities"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "4 · 36",
        page: 472,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\left(1-\\operatorname{sen}^{2}(\\theta)\\right)\\left(1+\\tan^{2}(\\theta)\\right) = -1$`, `$\\left(1-\\sin^{2}(\\theta)\\right)\\left(1+\\tan^{2}(\\theta)\\right) = -1$`), correct: true },
        { id: "b", text: L(`$\\operatorname{sen}^{2}(\\theta)\\left(1+\\cot^{2}(\\theta)\\right) = 1$`, `$\\sin^{2}(\\theta)\\left(1+\\cot^{2}(\\theta)\\right) = 1$`), correct: false },
        { id: "c", text: L(`$1-\\csc^{2}(\\theta) = -\\cot^{2}(\\theta)$`, `$1-\\csc^{2}(\\theta) = -\\cot^{2}(\\theta)$`), correct: false },
        { id: "d", text: L(`$\\operatorname{sen}(\\theta)\\left(\\cot(\\theta)+\\tan(\\theta)\\right) = \\sec(\\theta)$`, `$\\sin(\\theta)\\left(\\cot(\\theta)+\\tan(\\theta)\\right) = \\sec(\\theta)$`), correct: false },
      ];
      return {
        skill: L(
          "Cazar la pseudo-identidad pitagórica",
          "Hunting down the fake Pythagorean identity",
        ),
        statement: L(
          `Una de las siguientes expresiones NO constituye una identidad trigonométrica; identifíquela:`,
          `One of the following expressions does NOT constitute a trigonometric identity; identify it:`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Tres de las cuatro salen de las pitagóricas $\\operatorname{sen}^{2}(\\theta)+\\cos^{2}(\\theta) = 1$, $1+\\tan^{2}(\\theta) = \\sec^{2}(\\theta)$ y $1+\\cot^{2}(\\theta) = \\csc^{2}(\\theta)$.",
            "Three of the four follow from the Pythagorean identities $\\sin^{2}(\\theta)+\\cos^{2}(\\theta) = 1$, $1+\\tan^{2}(\\theta) = \\sec^{2}(\\theta)$ and $1+\\cot^{2}(\\theta) = \\csc^{2}(\\theta)$.",
          ),
          L(
            "En la primera candidata, $1-\\operatorname{sen}^{2}(\\theta) = \\cos^{2}(\\theta)$ y $1+\\tan^{2}(\\theta) = \\sec^{2}(\\theta)$: multiplica los dos resultados.",
            "In the first candidate, $1-\\sin^{2}(\\theta) = \\cos^{2}(\\theta)$ and $1+\\tan^{2}(\\theta) = \\sec^{2}(\\theta)$: multiply the two results.",
          ),
          L(
            "El producto $\\cos^{2}(\\theta)\\sec^{2}(\\theta)$ se reduce a una sola potencia; compara el signo del resultado con el lado derecho impreso.",
            "The product $\\cos^{2}(\\theta)\\sec^{2}(\\theta)$ reduces to a single power; compare the sign of the result with the printed right-hand side.",
          ),
        ],
        answerDisplay: L(
          `No es identidad: $\\left(1-\\operatorname{sen}^{2}(\\theta)\\right)\\left(1+\\tan^{2}(\\theta)\\right) = 1 \\ne -1$`,
          `Not an identity: $\\left(1-\\sin^{2}(\\theta)\\right)\\left(1+\\tan^{2}(\\theta)\\right) = 1 \\ne -1$`,
        ),
        solution: [
          step(
            "given",
            "Cuatro ecuaciones candidatas a identidad trigonométrica en $\\theta$; una NO lo es.",
            "Four candidate trigonometric identities in $\\theta$; one of them is NOT one.",
          ),
          step(
            "approach",
            "Simplificar cada lado izquierdo con las pitagóricas y las definiciones recíprocas; la que no llegue a su lado derecho es la respuesta.",
            "Simplify each left-hand side with the Pythagorean identities and the reciprocal definitions; the one that does not reach its right-hand side is the answer.",
          ),
          step(
            "calculation",
            `$\\left(1-\\operatorname{sen}^{2}(\\theta)\\right)\\left(1+\\tan^{2}(\\theta)\\right) = \\cos^{2}(\\theta)\\sec^{2}(\\theta) = 1 \\ne -1$: falla<br>$\\operatorname{sen}^{2}(\\theta)\\left(1+\\cot^{2}(\\theta)\\right) = \\operatorname{sen}^{2}(\\theta)\\csc^{2}(\\theta) = 1$ ✓<br>$1-\\csc^{2}(\\theta) = -\\cot^{2}(\\theta)$, de $1+\\cot^{2}(\\theta) = \\csc^{2}(\\theta)$ ✓<br>$\\operatorname{sen}(\\theta)\\left(\\cot(\\theta)+\\tan(\\theta)\\right) = \\cos(\\theta) + \\frac{\\operatorname{sen}^{2}(\\theta)}{\\cos(\\theta)} = \\frac{1}{\\cos(\\theta)} = \\sec(\\theta)$ ✓`,
            `$\\left(1-\\sin^{2}(\\theta)\\right)\\left(1+\\tan^{2}(\\theta)\\right) = \\cos^{2}(\\theta)\\sec^{2}(\\theta) = 1 \\ne -1$: fails<br>$\\sin^{2}(\\theta)\\left(1+\\cot^{2}(\\theta)\\right) = \\sin^{2}(\\theta)\\csc^{2}(\\theta) = 1$ ✓<br>$1-\\csc^{2}(\\theta) = -\\cot^{2}(\\theta)$, from $1+\\cot^{2}(\\theta) = \\csc^{2}(\\theta)$ ✓<br>$\\sin(\\theta)\\left(\\cot(\\theta)+\\tan(\\theta)\\right) = \\cos(\\theta) + \\frac{\\sin^{2}(\\theta)}{\\cos(\\theta)} = \\frac{1}{\\cos(\\theta)} = \\sec(\\theta)$ ✓`,
          ),
          step(
            "result",
            `La que NO es identidad es $\\left(1-\\operatorname{sen}^{2}(\\theta)\\right)\\left(1+\\tan^{2}(\\theta)\\right) = -1$: el lado izquierdo vale $\\cos^{2}(\\theta)\\sec^{2}(\\theta) = 1$, con signo contrario al impreso. Comprobación con $\\theta = \\frac{\\pi}{3}$: $\\left(1-\\frac{3}{4}\\right)(1+3) = \\frac{1}{4} \\cdot 4 = 1 \\ne -1$ ✓, mientras que las otras tres se cumplen en ese punto: $\\frac{3}{4}\\left(1+\\frac{1}{3}\\right) = 1$, $1-\\frac{4}{3} = -\\frac{1}{3} = -\\cot^{2}\\left(\\frac{\\pi}{3}\\right)$ y $\\frac{\\sqrt{3}}{2}\\left(\\frac{1}{\\sqrt{3}}+\\sqrt{3}\\right) = 2 = \\sec\\left(\\frac{\\pi}{3}\\right)$.`,
            `The one that is NOT an identity is $\\left(1-\\sin^{2}(\\theta)\\right)\\left(1+\\tan^{2}(\\theta)\\right) = -1$: the left-hand side equals $\\cos^{2}(\\theta)\\sec^{2}(\\theta) = 1$, opposite in sign to what is printed. Check at $\\theta = \\frac{\\pi}{3}$: $\\left(1-\\frac{3}{4}\\right)(1+3) = \\frac{1}{4} \\cdot 4 = 1 \\ne -1$ ✓, while the other three hold at that point: $\\frac{3}{4}\\left(1+\\frac{1}{3}\\right) = 1$, $1-\\frac{4}{3} = -\\frac{1}{3} = -\\cot^{2}\\left(\\frac{\\pi}{3}\\right)$ and $\\frac{\\sqrt{3}}{2}\\left(\\frac{1}{\\sqrt{3}}+\\sqrt{3}\\right) = 2 = \\sec\\left(\\frac{\\pi}{3}\\right)$.`,
          ),
        ],
      };
    },
  ),

  /* 4 · 37 — QIII con sen(α) = −3/5: cos(α) = −4/5, tan(α) = 3/4,
     tan(2α) = 2t/(1−t²) = 24/7. */
  template(
    {
      id: "trigfn-espol-ch4-37",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "identities",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 270,
      tags: ["identities", "double-angle", "quadrants"],
      prerequisites: ["identities"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "4 · 37",
        page: 473,
      },
      reasoning: "case-analysis",
    },
    () => ({
      skill: L(
        "Tangente doble desde un ángulo del tercer cuadrante",
        "Double tangent from a third-quadrant angle",
      ),
      statement: L(
        `Si $\\pi < \\alpha < \\dfrac{3\\pi}{2}$ y $\\operatorname{sen}(\\alpha) = -\\dfrac{3}{5}$, hallar el valor de $\\tan(2\\alpha)$.`,
        `If $\\pi < \\alpha < \\dfrac{3\\pi}{2}$ and $\\sin(\\alpha) = -\\dfrac{3}{5}$, find the value of $\\tan(2\\alpha)$.`,
      ),
      answer: {
        kind: "numeric",
        value: 24 / 7,
        tolerance: { mode: "relative", value: 0.01 },
      },
      hints: [
        L(
          "Con $\\alpha$ en el tercer cuadrante, seno y coseno son ambos negativos: $\\cos(\\alpha) = -\\sqrt{1-\\operatorname{sen}^{2}(\\alpha)}$ (triángulo $3$-$4$-$5$).",
          "With $\\alpha$ in the third quadrant, sine and cosine are both negative: $\\cos(\\alpha) = -\\sqrt{1-\\sin^{2}(\\alpha)}$ ($3$-$4$-$5$ triangle).",
        ),
        L(
          "Primero $\\tan(\\alpha) = \\frac{\\operatorname{sen}(\\alpha)}{\\cos(\\alpha)}$ — positiva en el cuadrante III — y después la tangente doble $\\tan(2\\alpha) = \\frac{2\\tan(\\alpha)}{1-\\tan^{2}(\\alpha)}$.",
          "First $\\tan(\\alpha) = \\frac{\\sin(\\alpha)}{\\cos(\\alpha)}$ — positive in quadrant III — and then the double tangent $\\tan(2\\alpha) = \\frac{2\\tan(\\alpha)}{1-\\tan^{2}(\\alpha)}$.",
        ),
        L(
          "Con $\\tan(\\alpha) = \\frac{3}{4}$, sustituye en $\\frac{2\\tan(\\alpha)}{1-\\tan^{2}(\\alpha)}$ y simplifica la fracción compuesta: queda un cociente de enteros.",
          "With $\\tan(\\alpha) = \\frac{3}{4}$, substitute into $\\frac{2\\tan(\\alpha)}{1-\\tan^{2}(\\alpha)}$ and simplify the compound fraction: an integer quotient remains.",
        ),
      ],
      answerDisplay: L(
        `$\\tan(2\\alpha) = \\dfrac{2 \\cdot \\frac{3}{4}}{1-\\frac{9}{16}} = \\dfrac{24}{7} \\approx 3{,}43$`,
        `$\\tan(2\\alpha) = \\dfrac{2 \\cdot \\frac{3}{4}}{1-\\frac{9}{16}} = \\dfrac{24}{7} \\approx 3.43$`,
      ),
      solution: [
        step(
          "given",
          "$\\pi < \\alpha < \\dfrac{3\\pi}{2}$ y $\\operatorname{sen}(\\alpha) = -\\dfrac{3}{5}$; se pide $\\tan(2\\alpha)$.",
          "$\\pi < \\alpha < \\dfrac{3\\pi}{2}$ and $\\sin(\\alpha) = -\\dfrac{3}{5}$; find $\\tan(2\\alpha)$.",
        ),
        step(
          "approach",
          "El cuadrante III fija el signo del coseno; con $\\tan(\\alpha)$ en mano, la fórmula de la tangente doble evita calcular $2\\alpha$.",
          "Quadrant III fixes the sign of the cosine; with $\\tan(\\alpha)$ in hand, the double-tangent formula avoids computing $2\\alpha$.",
        ),
        step(
          "calculation",
          `$\\cos(\\alpha) = -\\sqrt{1-\\frac{9}{25}} = -\\frac{4}{5}$ (cuadrante III)<br>$\\tan(\\alpha) = \\frac{-\\frac{3}{5}}{-\\frac{4}{5}} = \\frac{3}{4}$<br>$\\tan(2\\alpha) = \\frac{2\\tan(\\alpha)}{1-\\tan^{2}(\\alpha)} = \\frac{2 \\cdot \\frac{3}{4}}{1-\\frac{9}{16}} = \\frac{\\frac{3}{2}}{\\frac{7}{16}} = \\frac{24}{7}$`,
          `$\\cos(\\alpha) = -\\sqrt{1-\\frac{9}{25}} = -\\frac{4}{5}$ (third quadrant)<br>$\\tan(\\alpha) = \\frac{-\\frac{3}{5}}{-\\frac{4}{5}} = \\frac{3}{4}$<br>$\\tan(2\\alpha) = \\frac{2\\tan(\\alpha)}{1-\\tan^{2}(\\alpha)} = \\frac{2 \\cdot \\frac{3}{4}}{1-\\frac{9}{16}} = \\frac{\\frac{3}{2}}{\\frac{7}{16}} = \\frac{24}{7}$`,
        ),
        step(
          "result",
          `El valor es $\\frac{24}{7} \\approx 3{,}4286$. Comprobación: $\\alpha = \\pi + \\operatorname{arcsen}\\left(\\frac{3}{5}\\right) \\approx 3{,}7851$ rad, así que $\\tan(2\\alpha) = \\tan(7{,}5702) = \\tan(1{,}2870) \\approx 3{,}4286$ ✓ (el resultado es positivo: $\\tan(\\alpha) > 0$ en el cuadrante III y $1-\\tan^{2}(\\alpha) = \\frac{7}{16} > 0$).`,
          `The value is $\\frac{24}{7} \\approx 3.4286$. Check: $\\alpha = \\pi + \\arcsin\\left(\\frac{3}{5}\\right) \\approx 3.7851$ rad, so $\\tan(2\\alpha) = \\tan(7.5702) = \\tan(1.2870) \\approx 3.4286$ ✓ (the result is positive: $\\tan(\\alpha) > 0$ in quadrant III and $1-\\tan^{2}(\\alpha) = \\frac{7}{16} > 0$).`,
        ),
      ],
    }),
  ),

  /* 4 · 38 — tan(α) = 1/7 y sen(β) = 1/√10 en (0, π/2): sen(α+2β) =
     (1·4 + 7·3)/(5√50) = 25/(5√50) = √2/2. */
  template(
    {
      id: "trigfn-espol-ch4-38",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "identities",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 360,
      tags: ["identities", "angle-addition", "double-angle"],
      prerequisites: ["identities"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "4 · 38",
        page: 473,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\dfrac{\\sqrt{2}}{2}$`, `$\\dfrac{\\sqrt{2}}{2}$`), correct: true },
        { id: "b", text: L(`$-\\dfrac{\\sqrt{2}}{2}$`, `$-\\dfrac{\\sqrt{2}}{2}$`), correct: false },
        { id: "c", text: L(`$\\sqrt{2}$`, `$\\sqrt{2}$`), correct: false },
        { id: "d", text: L(`$\\dfrac{1}{2}$`, `$\\dfrac{1}{2}$`), correct: false },
      ];
      return {
        skill: L(
          "Seno de una suma con un ángulo doble intermedio",
          "Sine of a sum with an intermediate double angle",
        ),
        statement: L(
          `Si $\\tan(\\alpha) = \\dfrac{1}{7}$; $\\operatorname{sen}(\\beta) = \\dfrac{1}{\\sqrt{10}}$; $\\alpha \\in \\left(0, \\dfrac{\\pi}{2}\\right)$ y $\\beta \\in \\left(0, \\dfrac{\\pi}{2}\\right)$, determine $\\operatorname{sen}(\\alpha + 2\\beta)$.`,
          `If $\\tan(\\alpha) = \\dfrac{1}{7}$; $\\sin(\\beta) = \\dfrac{1}{\\sqrt{10}}$; $\\alpha \\in \\left(0, \\dfrac{\\pi}{2}\\right)$ and $\\beta \\in \\left(0, \\dfrac{\\pi}{2}\\right)$, determine $\\sin(\\alpha + 2\\beta)$.`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Triángulo de referencia de $\\tan(\\alpha) = \\frac{1}{7}$: hipotenusa $\\sqrt{1^{2}+7^{2}} = \\sqrt{50}$, así que $\\operatorname{sen}(\\alpha) = \\frac{1}{\\sqrt{50}}$ y $\\cos(\\alpha) = \\frac{7}{\\sqrt{50}}$.",
            "Reference triangle of $\\tan(\\alpha) = \\frac{1}{7}$: hypotenuse $\\sqrt{1^{2}+7^{2}} = \\sqrt{50}$, so $\\sin(\\alpha) = \\frac{1}{\\sqrt{50}}$ and $\\cos(\\alpha) = \\frac{7}{\\sqrt{50}}$.",
          ),
          L(
            "Para $\\beta$, de $\\operatorname{sen}(\\beta) = \\frac{1}{\\sqrt{10}}$ sale $\\cos(\\beta) = \\frac{3}{\\sqrt{10}}$; duplica $\\beta$ con $\\operatorname{sen}(2\\beta) = 2\\operatorname{sen}(\\beta)\\cos(\\beta)$ y $\\cos(2\\beta) = 1-2\\operatorname{sen}^{2}(\\beta)$.",
            "For $\\beta$, from $\\sin(\\beta) = \\frac{1}{\\sqrt{10}}$ comes $\\cos(\\beta) = \\frac{3}{\\sqrt{10}}$; double $\\beta$ with $\\sin(2\\beta) = 2\\sin(\\beta)\\cos(\\beta)$ and $\\cos(2\\beta) = 1-2\\sin^{2}(\\beta)$.",
          ),
          L(
            "En $\\operatorname{sen}(\\alpha+2\\beta) = \\operatorname{sen}(\\alpha)\\cos(2\\beta) + \\cos(\\alpha)\\operatorname{sen}(2\\beta)$, el denominador común $\\sqrt{50}$ es exactamente $5\\sqrt{2}$.",
            "In $\\sin(\\alpha+2\\beta) = \\sin(\\alpha)\\cos(2\\beta) + \\cos(\\alpha)\\sin(2\\beta)$, the common denominator $\\sqrt{50}$ is exactly $5\\sqrt{2}$.",
          ),
        ],
        answerDisplay: L(
          `$\\operatorname{sen}(\\alpha + 2\\beta) = \\dfrac{4+21}{5\\sqrt{50}} = \\dfrac{5}{\\sqrt{50}} = \\dfrac{\\sqrt{2}}{2}$`,
          `$\\sin(\\alpha + 2\\beta) = \\dfrac{4+21}{5\\sqrt{50}} = \\dfrac{5}{\\sqrt{50}} = \\dfrac{\\sqrt{2}}{2}$`,
        ),
        solution: [
          step(
            "given",
            "$\\tan(\\alpha) = \\dfrac{1}{7}$ y $\\operatorname{sen}(\\beta) = \\dfrac{1}{\\sqrt{10}}$, con $\\alpha, \\beta \\in \\left(0, \\dfrac{\\pi}{2}\\right)$; se pide $\\operatorname{sen}(\\alpha + 2\\beta)$.",
            "$\\tan(\\alpha) = \\dfrac{1}{7}$ and $\\sin(\\beta) = \\dfrac{1}{\\sqrt{10}}$, with $\\alpha, \\beta \\in \\left(0, \\dfrac{\\pi}{2}\\right)$; find $\\sin(\\alpha + 2\\beta)$.",
          ),
          step(
            "approach",
            "Triángulos de referencia en el primer cuadrante para $\\alpha$ y $\\beta$; duplicar $\\beta$ y aplicar la fórmula del seno de una suma.",
            "First-quadrant reference triangles for $\\alpha$ and $\\beta$; double $\\beta$ and apply the sine-of-a-sum formula.",
          ),
          step(
            "calculation",
            `$\\tan(\\alpha) = \\frac{1}{7} \\Rightarrow \\operatorname{sen}(\\alpha) = \\frac{1}{\\sqrt{50}}$, $\\cos(\\alpha) = \\frac{7}{\\sqrt{50}}$ (cuadrante I)<br>$\\operatorname{sen}(\\beta) = \\frac{1}{\\sqrt{10}} \\Rightarrow \\cos(\\beta) = \\frac{3}{\\sqrt{10}}$, así que $\\operatorname{sen}(2\\beta) = 2 \\cdot \\frac{1}{\\sqrt{10}} \\cdot \\frac{3}{\\sqrt{10}} = \\frac{3}{5}$ y $\\cos(2\\beta) = 1-2 \\cdot \\frac{1}{10} = \\frac{4}{5}$<br>$\\operatorname{sen}(\\alpha+2\\beta) = \\frac{1}{\\sqrt{50}} \\cdot \\frac{4}{5} + \\frac{7}{\\sqrt{50}} \\cdot \\frac{3}{5} = \\frac{4+21}{5\\sqrt{50}} = \\frac{25}{5\\sqrt{50}} = \\frac{5}{\\sqrt{50}} = \\frac{\\sqrt{2}}{2}$`,
            `$\\tan(\\alpha) = \\frac{1}{7} \\Rightarrow \\sin(\\alpha) = \\frac{1}{\\sqrt{50}}$, $\\cos(\\alpha) = \\frac{7}{\\sqrt{50}}$ (first quadrant)<br>$\\sin(\\beta) = \\frac{1}{\\sqrt{10}} \\Rightarrow \\cos(\\beta) = \\frac{3}{\\sqrt{10}}$, so $\\sin(2\\beta) = 2 \\cdot \\frac{1}{\\sqrt{10}} \\cdot \\frac{3}{\\sqrt{10}} = \\frac{3}{5}$ and $\\cos(2\\beta) = 1-2 \\cdot \\frac{1}{10} = \\frac{4}{5}$<br>$\\sin(\\alpha+2\\beta) = \\frac{1}{\\sqrt{50}} \\cdot \\frac{4}{5} + \\frac{7}{\\sqrt{50}} \\cdot \\frac{3}{5} = \\frac{4+21}{5\\sqrt{50}} = \\frac{25}{5\\sqrt{50}} = \\frac{5}{\\sqrt{50}} = \\frac{\\sqrt{2}}{2}$`,
          ),
          step(
            "result",
            `El valor es $\\frac{\\sqrt{2}}{2} \\approx 0{,}7071$. Comprobación: $\\sqrt{50} = 5\\sqrt{2}$, así que $\\frac{5}{\\sqrt{50}} = \\frac{5}{5\\sqrt{2}} = \\frac{1}{\\sqrt{2}} = \\frac{\\sqrt{2}}{2}$ ✓; numéricamente, $\\frac{1}{\\sqrt{50}} \\cdot 0{,}8 + \\frac{7}{\\sqrt{50}} \\cdot 0{,}6 \\approx 0{,}1131 + 0{,}5940 = 0{,}7071$ ✓ (los distractores valen $-0{,}7071$, $\\sqrt{2} \\approx 1{,}4142$ y $0{,}5$).`,
            `The value is $\\frac{\\sqrt{2}}{2} \\approx 0.7071$. Check: $\\sqrt{50} = 5\\sqrt{2}$, so $\\frac{5}{\\sqrt{50}} = \\frac{5}{5\\sqrt{2}} = \\frac{1}{\\sqrt{2}} = \\frac{\\sqrt{2}}{2}$ ✓; numerically, $\\frac{1}{\\sqrt{50}} \\cdot 0.8 + \\frac{7}{\\sqrt{50}} \\cdot 0.6 \\approx 0.1131 + 0.5940 = 0.7071$ ✓ (the distractors equal $-0.7071$, $\\sqrt{2} \\approx 1.4142$ and $0.5$).`,
          ),
        ],
      };
    },
  ),

  /* 4 · 40 — QIV con sen(x) = −12/13: cos(x) = 5/13 y
     cos(x+π/3) = 5/26 + 12√3/26 = (5+12√3)/26. */
  template(
    {
      id: "trigfn-espol-ch4-40",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "identities",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 270,
      tags: ["identities", "angle-addition", "quadrants"],
      prerequisites: ["identities"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "4 · 40",
        page: 473,
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\dfrac{5+12\\sqrt{3}}{26}$`, `$\\dfrac{5+12\\sqrt{3}}{26}$`), correct: true },
        { id: "b", text: L(`$\\dfrac{5-12\\sqrt{3}}{26}$`, `$\\dfrac{5-12\\sqrt{3}}{26}$`), correct: false },
        { id: "c", text: L(`$\\dfrac{12+5\\sqrt{3}}{26}$`, `$\\dfrac{12+5\\sqrt{3}}{26}$`), correct: false },
        { id: "d", text: L(`$-\\dfrac{5+12\\sqrt{3}}{26}$`, `$-\\dfrac{5+12\\sqrt{3}}{26}$`), correct: false },
      ];
      return {
        skill: L(
          "Coseno de una suma con ángulo en el cuarto cuadrante",
          "Cosine of a sum with a fourth-quadrant angle",
        ),
        statement: L(
          `Si $\\operatorname{sen}(x) = -\\dfrac{12}{13}$; $\\dfrac{3\\pi}{2} \\le x \\le 2\\pi$, hallar el valor de $\\cos\\left(x + \\dfrac{\\pi}{3}\\right)$.`,
          `If $\\sin(x) = -\\dfrac{12}{13}$; $\\dfrac{3\\pi}{2} \\le x \\le 2\\pi$, find the value of $\\cos\\left(x + \\dfrac{\\pi}{3}\\right)$.`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "En el cuarto cuadrante el coseno es positivo: $\\cos(x) = +\\sqrt{1-\\operatorname{sen}^{2}(x)} = \\frac{5}{13}$ (triángulo $5$-$12$-$13$).",
            "In the fourth quadrant the cosine is positive: $\\cos(x) = +\\sqrt{1-\\sin^{2}(x)} = \\frac{5}{13}$ ($5$-$12$-$13$ triangle).",
          ),
          L(
            "Desarrolla $\\cos\\left(x+\\frac{\\pi}{3}\\right) = \\cos(x)\\cos\\left(\\frac{\\pi}{3}\\right) - \\operatorname{sen}(x)\\operatorname{sen}\\left(\\frac{\\pi}{3}\\right)$.",
            "Expand $\\cos\\left(x+\\frac{\\pi}{3}\\right) = \\cos(x)\\cos\\left(\\frac{\\pi}{3}\\right) - \\sin(x)\\sin\\left(\\frac{\\pi}{3}\\right)$.",
          ),
          L(
            "Ojo con el doble signo del segundo término: sobre $\\operatorname{sen}(x) = -\\frac{12}{13}$, el menos de la fórmula lo convierte en una **suma**.",
            "Watch the double sign in the second term: acting on $\\sin(x) = -\\frac{12}{13}$, the formula's minus turns it into an **addition**.",
          ),
        ],
        answerDisplay: L(
          `$\\cos\\left(x + \\dfrac{\\pi}{3}\\right) = \\dfrac{5}{26} + \\dfrac{12\\sqrt{3}}{26} = \\dfrac{5+12\\sqrt{3}}{26} \\approx 0{,}992$`,
          `$\\cos\\left(x + \\dfrac{\\pi}{3}\\right) = \\dfrac{5}{26} + \\dfrac{12\\sqrt{3}}{26} = \\dfrac{5+12\\sqrt{3}}{26} \\approx 0.992$`,
        ),
        solution: [
          step(
            "given",
            "$\\operatorname{sen}(x) = -\\dfrac{12}{13}$ con $\\dfrac{3\\pi}{2} \\le x \\le 2\\pi$ (cuadrante IV); se pide $\\cos\\left(x + \\dfrac{\\pi}{3}\\right)$.",
            "$\\sin(x) = -\\dfrac{12}{13}$ with $\\dfrac{3\\pi}{2} \\le x \\le 2\\pi$ (fourth quadrant); find $\\cos\\left(x + \\dfrac{\\pi}{3}\\right)$.",
          ),
          step(
            "approach",
            "El cuadrante IV fija $\\cos(x) = +\\frac{5}{13}$; después, el coseno de la suma con los valores notales de $\\frac{\\pi}{3}$.",
            "Quadrant IV fixes $\\cos(x) = +\\frac{5}{13}$; then the cosine of the sum with the notable values of $\\frac{\\pi}{3}$.",
          ),
          step(
            "calculation",
            `$\\cos(x) = \\sqrt{1-\\frac{144}{169}} = \\sqrt{\\frac{25}{169}} = \\frac{5}{13}$ (cuadrante IV)<br>$\\cos\\left(x+\\frac{\\pi}{3}\\right) = \\frac{5}{13} \\cdot \\frac{1}{2} - \\left(-\\frac{12}{13}\\right) \\cdot \\frac{\\sqrt{3}}{2} = \\frac{5}{26} + \\frac{12\\sqrt{3}}{26} = \\frac{5+12\\sqrt{3}}{26}$`,
            `$\\cos(x) = \\sqrt{1-\\frac{144}{169}} = \\sqrt{\\frac{25}{169}} = \\frac{5}{13}$ (fourth quadrant)<br>$\\cos\\left(x+\\frac{\\pi}{3}\\right) = \\frac{5}{13} \\cdot \\frac{1}{2} - \\left(-\\frac{12}{13}\\right) \\cdot \\frac{\\sqrt{3}}{2} = \\frac{5}{26} + \\frac{12\\sqrt{3}}{26} = \\frac{5+12\\sqrt{3}}{26}$`,
          ),
          step(
            "result",
            `El valor es $\\frac{5+12\\sqrt{3}}{26} \\approx 0{,}9917$. Comprobación: $x = 2\\pi - \\operatorname{arcsen}\\left(\\frac{12}{13}\\right) \\approx 5{,}1072$ rad, así que $\\cos\\left(x+\\frac{\\pi}{3}\\right) = \\cos(6{,}1544) = \\cos(0{,}1288) \\approx 0{,}9917$ ✓ (el menos sobre $\\operatorname{sen}(x) = -\\frac{12}{13}$ es lo que **suma** $\\frac{12\\sqrt{3}}{26}$; los distractores valen $\\approx -0{,}607$, $0{,}795$ y $-0{,}992$).`,
            `The value is $\\frac{5+12\\sqrt{3}}{26} \\approx 0.9917$. Check: $x = 2\\pi - \\arcsin\\left(\\frac{12}{13}\\right) \\approx 5.1072$ rad, so $\\cos\\left(x+\\frac{\\pi}{3}\\right) = \\cos(6.1544) = \\cos(0.1288) \\approx 0.9917$ ✓ (the minus acting on $\\sin(x) = -\\frac{12}{13}$ is what **adds** $\\frac{12\\sqrt{3}}{26}$; the distractors equal $\\approx -0.607$, $0.795$ and $-0.992$).`,
          ),
        ],
      };
    },
  ),

  /* 4 · 42 — QII tan(α) = −7/24 y QIII cot(β) = 3/4: cos(α+β) =
     (−24/25)(−3/5) − (7/25)(−4/5) = 72/125 + 28/125 = 4/5. */
  template(
    {
      id: "trigfn-espol-ch4-42",
      subject: "math",
      topicId: "trig-functions",
      subtopicId: "identities",
      difficulty: "challenge",
      questionType: "numeric",
      estimatedTimeSec: 360,
      tags: ["identities", "angle-addition", "quadrants"],
      prerequisites: ["identities"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "4 · 42",
        page: 473,
      },
      reasoning: "case-analysis",
    },
    () => ({
      skill: L(
        "Coseno de una suma con dos cuadrantes difíciles",
        "Cosine of a sum with two tricky quadrants",
      ),
      statement: L(
        `Si $\\tan(\\alpha) = -\\dfrac{7}{24}$ y $\\cot(\\beta) = \\dfrac{3}{4}$, $\\dfrac{\\pi}{2} < \\alpha < \\pi$, $\\pi < \\beta < \\dfrac{3\\pi}{2}$, encuentre el valor de $\\cos(\\alpha + \\beta)$.`,
        `If $\\tan(\\alpha) = -\\dfrac{7}{24}$ and $\\cot(\\beta) = \\dfrac{3}{4}$, with $\\dfrac{\\pi}{2} < \\alpha < \\pi$ and $\\pi < \\beta < \\dfrac{3\\pi}{2}$, find the value of $\\cos(\\alpha + \\beta)$.`,
      ),
      answer: {
        kind: "numeric",
        value: 0.8,
        tolerance: { mode: "relative", value: 0.02 },
      },
      hints: [
        L(
          "Dos triángulos de referencia: $7$-$24$-$25$ para $\\alpha$ y $3$-$4$-$5$ para $\\beta$ (pues $\\cot(\\beta) = \\frac{3}{4}$ equivale a $\\tan(\\beta) = \\frac{4}{3}$).",
          "Two reference triangles: $7$-$24$-$25$ for $\\alpha$ and $3$-$4$-$5$ for $\\beta$ (since $\\cot(\\beta) = \\frac{3}{4}$ is equivalent to $\\tan(\\beta) = \\frac{4}{3}$).",
        ),
        L(
          "Los cuadrantes fijan los signos: en el II, $\\operatorname{sen}(\\alpha) > 0 > \\cos(\\alpha)$; en el III, $\\operatorname{sen}(\\beta) < 0$ y $\\cos(\\beta) < 0$.",
          "The quadrants fix the signs: in II, $\\sin(\\alpha) > 0 > \\cos(\\alpha)$; in III, $\\sin(\\beta) < 0$ and $\\cos(\\beta) < 0$.",
        ),
        L(
          "Aplica $\\cos(\\alpha+\\beta) = \\cos(\\alpha)\\cos(\\beta) - \\operatorname{sen}(\\alpha)\\operatorname{sen}(\\beta)$: los dos productos salen positivos y se suman sobre denominador $125$.",
          "Apply $\\cos(\\alpha+\\beta) = \\cos(\\alpha)\\cos(\\beta) - \\sin(\\alpha)\\sin(\\beta)$: both products come out positive and add up over the denominator $125$.",
        ),
      ],
      answerDisplay: L(
        `$\\cos(\\alpha + \\beta) = \\dfrac{72}{125} + \\dfrac{28}{125} = \\dfrac{100}{125} = \\dfrac{4}{5} = 0{,}8$`,
        `$\\cos(\\alpha + \\beta) = \\dfrac{72}{125} + \\dfrac{28}{125} = \\dfrac{100}{125} = \\dfrac{4}{5} = 0.8$`,
      ),
      solution: [
        step(
          "given",
          "$\\tan(\\alpha) = -\\dfrac{7}{24}$ con $\\dfrac{\\pi}{2} < \\alpha < \\pi$, y $\\cot(\\beta) = \\dfrac{3}{4}$ con $\\pi < \\beta < \\dfrac{3\\pi}{2}$; se pide $\\cos(\\alpha + \\beta)$.",
          "$\\tan(\\alpha) = -\\dfrac{7}{24}$ with $\\dfrac{\\pi}{2} < \\alpha < \\pi$, and $\\cot(\\beta) = \\dfrac{3}{4}$ with $\\pi < \\beta < \\dfrac{3\\pi}{2}$; find $\\cos(\\alpha + \\beta)$.",
        ),
        step(
          "approach",
          "Triángulos $7$-$24$-$25$ y $3$-$4$-$5$ con los signos de los cuadrantes II y III, y después la fórmula del coseno de una suma.",
          "The $7$-$24$-$25$ and $3$-$4$-$5$ triangles with the signs of quadrants II and III, then the cosine-of-a-sum formula.",
        ),
        step(
          "calculation",
          `$\\alpha$ (cuadrante II): $\\operatorname{sen}(\\alpha) = \\frac{7}{25}$, $\\cos(\\alpha) = -\\frac{24}{25}$<br>$\\beta$ (cuadrante III): $\\tan(\\beta) = \\frac{4}{3} \\Rightarrow \\operatorname{sen}(\\beta) = -\\frac{4}{5}$, $\\cos(\\beta) = -\\frac{3}{5}$<br>$\\cos(\\alpha+\\beta) = \\left(-\\frac{24}{25}\\right)\\left(-\\frac{3}{5}\\right) - \\frac{7}{25}\\left(-\\frac{4}{5}\\right) = \\frac{72}{125} + \\frac{28}{125} = \\frac{100}{125} = \\frac{4}{5}$`,
          `$\\alpha$ (quadrant II): $\\sin(\\alpha) = \\frac{7}{25}$, $\\cos(\\alpha) = -\\frac{24}{25}$<br>$\\beta$ (quadrant III): $\\tan(\\beta) = \\frac{4}{3} \\Rightarrow \\sin(\\beta) = -\\frac{4}{5}$, $\\cos(\\beta) = -\\frac{3}{5}$<br>$\\cos(\\alpha+\\beta) = \\left(-\\frac{24}{25}\\right)\\left(-\\frac{3}{5}\\right) - \\frac{7}{25}\\left(-\\frac{4}{5}\\right) = \\frac{72}{125} + \\frac{28}{125} = \\frac{100}{125} = \\frac{4}{5}$`,
        ),
        step(
          "result",
          `El valor es $\\frac{4}{5} = 0{,}8$. Comprobación: $\\alpha \\approx 2{,}8578$ rad y $\\beta \\approx 4{,}0689$ rad, así que $\\alpha + \\beta \\approx 6{,}9267 \\equiv 0{,}6435 \\pmod{2\\pi}$ y $\\cos(0{,}6435) \\approx 0{,}8000$ ✓ (los dos productos de la fórmula salen positivos por los pares de signos menos, y se suman: $\\frac{72}{125} + \\frac{28}{125} = \\frac{100}{125}$).`,
          `The value is $\\frac{4}{5} = 0.8$. Check: $\\alpha \\approx 2.8578$ rad and $\\beta \\approx 4.0689$ rad, so $\\alpha + \\beta \\approx 6.9267 \\equiv 0.6435 \\pmod{2\\pi}$ and $\\cos(0.6435) \\approx 0.8000$ ✓ (both products in the formula come out positive because of the pairs of minus signs, and they add up: $\\frac{72}{125} + \\frac{28}{125} = \\frac{100}{125}$).`,
        ),
      ],
    }),
  ),

];
