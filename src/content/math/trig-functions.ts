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

];
