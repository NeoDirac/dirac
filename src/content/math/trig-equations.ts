/**
 * MATH · Trigonometric Equations
 *
 * Solving trig equations on [0°, 360°) and [0, 2π): basic equations,
 * equations that need identities, solutions on intervals and general
 * solutions. Includes a unit-circle diagram, MC and expression types.
 */

import { template, L, step } from "@/lib/problem";
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
  /* Basic: two solutions, one shown on the unit circle (easy)         */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "trigeq-basic-01",
      subject: "math",
      topicId: "trig-equations",
      subtopicId: "basic",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 90,
      tags: ["unit-circle", "symmetry", "degrees"],
      prerequisites: ["trig-functions"],
    },
    (rng) => {
      const useSin = rng.bool();
      const ref = rng.pick([30, 45, 60]);
      // the value must match the function: sin 30° = 1/2 but cos 30° = √3/2
      const valLatex =
        ref === 30
          ? useSin
            ? "\\frac{1}{2}"
            : "\\frac{\\sqrt{3}}{2}"
          : ref === 45
            ? "\\frac{\\sqrt{2}}{2}"
            : useSin
              ? "\\frac{\\sqrt{3}}{2}"
              : "\\frac{1}{2}";
      const fn = useSin ? "\\sin" : "\\cos";
      const other = useSin ? 180 - ref : 360 - ref;
      return {
        skill: L("Simetría en la circunferencia unitaria", "Symmetry on the unit circle"),
        statement: L(
          `La figura marca una solución $\\theta = ${ref}^\\circ$ de la ecuación $${fn}\\theta = ${valLatex}$ en el intervalo $[0^\\circ, 360^\\circ)$. ¿Cuál es la **otra** solución? (Da el resultado en grados.)`,
          `The figure marks one solution $\\theta = ${ref}^\\circ$ of the equation $${fn}\\theta = ${valLatex}$ on the interval $[0^\\circ, 360^\\circ)$. What is the **other** solution? (Give the result in degrees.)`,
        ),
        diagram: {
          kind: "unit-circle",
          angleDeg: ref,
          showPoint: true,
          angleLabel: `θ = ${ref}°`,
        },
        diagramLabel: L(
          `Circunferencia unitaria con el ángulo θ = ${ref}° marcado y su punto (cos θ, sin θ).`,
          `Unit circle with the angle θ = ${ref}° marked and its point (cos θ, sin θ).`,
        ),
        answer: {
          kind: "numeric",
          value: other,
          tolerance: { mode: "absolute", value: 0.001 },
          unitSuffix: "°",
        },
        hints: [
          L(
            `Las dos soluciones tienen el mismo ${useSin ? "seno" : "coseno"}: piensa en la simetría de la circunferencia.`,
            `Both solutions have the same ${useSin ? "sine" : "cosine"}: think about the symmetry of the circle.`,
          ),
          useSin
            ? L(
                "El seno se repite en ángulos suplementarios: $\\theta_2 = 180^\\circ - \\theta_1$ (simetría respecto al eje $y$).",
                "Sine repeats at supplementary angles: $\\theta_2 = 180^\\circ - \\theta_1$ (symmetry about the $y$-axis).",
              )
            : L(
                "El coseno se repite en ángulos simétricos: $\\theta_2 = 360^\\circ - \\theta_1$ (simetría respecto al eje $x$).",
                "Cosine repeats at symmetric angles: $\\theta_2 = 360^\\circ - \\theta_1$ (symmetry about the $x$-axis).",
              ),
          L(
            `Sustituye $\\theta_1 = ${ref}^\\circ$ en la fórmula del método.`,
            `Substitute $\\theta_1 = ${ref}^\\circ$ into the formula of the method.`,
          ),
        ],
        answerDisplay: L(
          `$\\theta_2 = ${other}^\\circ$`,
          `$\\theta_2 = ${other}^\\circ$`,
        ),
        solution: [
          step(
            "given",
            `$${fn}\\theta = ${valLatex}$ en $[0^\\circ, 360^\\circ)$, con $\\theta_1 = ${ref}^\\circ$ ya conocida.`,
            `$${fn}\\theta = ${valLatex}$ on $[0^\\circ, 360^\\circ)$, with $\\theta_1 = ${ref}^\\circ$ already known.`,
          ),
          step(
            "approach",
            useSin
              ? "Dos ángulos con el mismo seno son suplementarios o difieren en una vuelta completa; dentro de $[0^\\circ, 360^\\circ)$ la otra solución es $180^\\circ - \\theta_1$."
              : "Dos ángulos con el mismo coseno son simétricos respecto al eje $x$; dentro de $[0^\\circ, 360^\\circ)$ la otra solución es $360^\\circ - \\theta_1$.",
            useSin
              ? "Two angles with the same sine are supplementary or differ by a full turn; within $[0^\\circ, 360^\\circ)$ the other solution is $180^\\circ - \\theta_1$."
              : "Two angles with the same cosine are mirror images across the $x$-axis; within $[0^\\circ, 360^\\circ)$ the other solution is $360^\\circ - \\theta_1$.",
          ),
          step(
            "calculation",
            useSin
              ? `$\\theta_2 = 180^\\circ - ${ref}^\\circ = ${other}^\\circ$<br>Comprobación: $\\sin ${other}^\\circ = \\sin ${ref}^\\circ = ${valLatex}$`
              : `$\\theta_2 = 360^\\circ - ${ref}^\\circ = ${other}^\\circ$<br>Comprobación: $\\cos ${other}^\\circ = \\cos ${ref}^\\circ = ${valLatex}$`,
            useSin
              ? `$\\theta_2 = 180^\\circ - ${ref}^\\circ = ${other}^\\circ$<br>Check: $\\sin ${other}^\\circ = \\sin ${ref}^\\circ = ${valLatex}$`
              : `$\\theta_2 = 360^\\circ - ${ref}^\\circ = ${other}^\\circ$<br>Check: $\\cos ${other}^\\circ = \\cos ${ref}^\\circ = ${valLatex}$`,
          ),
          step(
            "result",
            `Las soluciones son $${ref}^\\circ$ y $${other}^\\circ$; la que se pide es $${other}^\\circ$.`,
            `The solutions are $${ref}^\\circ$ and $${other}^\\circ$; the requested one is $${other}^\\circ$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Basic: extreme values (easy)                                      */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "trigeq-basic-02",
      subject: "math",
      topicId: "trig-equations",
      subtopicId: "basic",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 60,
      tags: ["unit-circle", "extreme-values"],
      prerequisites: ["trig-functions"],
    },
    (rng) => {
      const cfg = rng.pick([
        { eq: "\\sin\\theta = 1", sol: 90, why: "el seno vale 1 solo en la parte más alta de la circunferencia", whyEn: "sine equals 1 only at the very top of the circle" },
        { eq: "\\cos\\theta = -1", sol: 180, why: "el coseno vale −1 solo en el punto más a la izquierda", whyEn: "cosine equals −1 only at the leftmost point" },
        { eq: "\\sin\\theta = -1", sol: 270, why: "el seno vale −1 solo en la parte más baja de la circunferencia", whyEn: "sine equals −1 only at the very bottom of the circle" },
        { eq: "\\cos\\theta = 1", sol: 0, why: "el coseno vale 1 solo en el punto más a la derecha", whyEn: "cosine equals 1 only at the rightmost point" },
      ]);
      return {
        skill: L("Valores extremos en la circunferencia", "Extreme values on the circle"),
        statement: L(
          `Resuelve en $[0^\\circ, 360^\\circ)$: $${cfg.eq}$. (La ecuación tiene una única solución; dala en grados.)`,
          `Solve on $[0^\\circ, 360^\\circ)$: $${cfg.eq}$. (The equation has a single solution; give it in degrees.)`,
        ),
        answer: {
          kind: "numeric",
          value: cfg.sol,
          tolerance: { mode: "absolute", value: 0.001 },
          unitSuffix: "°",
        },
        hints: [
          L(
            "Piensa en la circunferencia unitaria: las coordenadas de cada punto son $(\\cos\\theta, \\sin\\theta)$.",
            "Think of the unit circle: the coordinates of each point are $(\\cos\\theta, \\sin\\theta)$.",
          ),
          L(
            `Los valores $1$ y $-1$ solo se alcanzan en un punto de la circunferencia: ${cfg.why}.`,
            `The values $1$ and $-1$ are reached at exactly one point of the circle: ${cfg.whyEn}.`,
          ),
          L(
            "Comprueba que ese ángulo pertenece al intervalo $[0^\\circ, 360^\\circ)$.",
            "Check that this angle belongs to the interval $[0^\\circ, 360^\\circ)$.",
          ),
        ],
        answerDisplay: L(`$\\theta = ${cfg.sol}^\\circ$`, `$\\theta = ${cfg.sol}^\\circ$`),
        solution: [
          step("given", `$${cfg.eq}$, con $0^\\circ \\le \\theta < 360^\\circ$`, `$${cfg.eq}$, with $0^\\circ \\le \\theta < 360^\\circ$`),
          step(
            "approach",
            "El seno es la coordenada $y$ y el coseno la coordenada $x$ del punto de la circunferencia unitaria; los valores extremos se alcanzan en un único punto.",
            "Sine is the $y$-coordinate and cosine the $x$-coordinate of the point on the unit circle; extreme values occur at a single point.",
          ),
          step(
            "calculation",
            `$${cfg.eq}$ solo ocurre cuando $\\theta = ${cfg.sol}^\\circ$.`,
            `$${cfg.eq}$ happens only when $\\theta = ${cfg.sol}^\\circ$.`,
          ),
          step(
            "result",
            `La solución única es $\\theta = ${cfg.sol}^\\circ$.`,
            `The single solution is $\\theta = ${cfg.sol}^\\circ$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Basic with a coefficient (medium)                                 */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "trigeq-basic-03",
      subject: "math",
      topicId: "trig-equations",
      subtopicId: "basic",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 150,
      tags: ["two-step", "special-angles"],
      prerequisites: ["trig-functions"],
    },
    (rng) => {
      const cfg = rng.pick([
        { eq: "2\\sin\\theta - 1 = 0", val: "\\frac{1}{2}", ref: 30, sols: [30, 150] },
        { eq: "2\\sin\\theta - \\sqrt{2} = 0", val: "\\frac{\\sqrt{2}}{2}", ref: 45, sols: [45, 135] },
        { eq: "\\sin\\theta - \\frac{\\sqrt{3}}{2} = 0", val: "\\frac{\\sqrt{3}}{2}", ref: 60, sols: [60, 120] },
        { eq: "2\\sin\\theta + 1 = 0", val: "-\\frac{1}{2}", ref: 30, sols: [210, 330] },
        { eq: "2\\sin\\theta + \\sqrt{2} = 0", val: "-\\frac{\\sqrt{2}}{2}", ref: 45, sols: [225, 315] },
        { eq: "\\sin\\theta + \\frac{\\sqrt{3}}{2} = 0", val: "-\\frac{\\sqrt{3}}{2}", ref: 60, sols: [240, 300] },
        { eq: "2\\cos\\theta - 1 = 0", val: "\\frac{1}{2}", ref: 60, sols: [60, 300] },
        { eq: "\\cos\\theta - \\frac{\\sqrt{2}}{2} = 0", val: "\\frac{\\sqrt{2}}{2}", ref: 45, sols: [45, 315] },
        { eq: "2\\cos\\theta + 1 = 0", val: "-\\frac{1}{2}", ref: 60, sols: [120, 240] },
        { eq: "2\\cos\\theta + \\sqrt{2} = 0", val: "-\\frac{\\sqrt{2}}{2}", ref: 45, sols: [135, 225] },
        { eq: "2\\cos\\theta + \\sqrt{3} = 0", val: "-\\frac{\\sqrt{3}}{2}", ref: 30, sols: [150, 210] },
      ]);
      const askSmallest = rng.bool();
      const value = askSmallest ? cfg.sols[0] : cfg.sols[1];
      return {
        skill: L("Ecuaciones trigonométricas en dos pasos", "Two-step trig equations"),
        statement: L(
          `Resuelve $${cfg.eq}$ en $[0^\\circ, 360^\\circ)$ y escribe la ${askSmallest ? "**menor**" : "**mayor**"} de sus soluciones (en grados).`,
          `Solve $${cfg.eq}$ on $[0^\\circ, 360^\\circ)$ and write the ${askSmallest ? "**smaller**" : "**larger**"} of its solutions (in degrees).`,
        ),
        answer: {
          kind: "numeric",
          value,
          tolerance: { mode: "absolute", value: 0.001 },
          unitSuffix: "°",
        },
        hints: [
          L(
            "Primero aisla la función trigonométrica: queda $\\sin\\theta$ o $\\cos\\theta$ igual a un número.",
            "First isolate the trig function: you get $\\sin\\theta$ or $\\cos\\theta$ equal to a number.",
          ),
          L(
            `El ángulo de referencia cuyo seno o coseno tiene ese valor absoluto es $${cfg.ref}^\\circ$.`,
            `The reference angle whose sine or cosine has that absolute value is $${cfg.ref}^\\circ$.`,
          ),
          L(
            "El **signo** del valor indica en qué cuadrantes están las soluciones (seno: I y II si es positivo; coseno: I y IV si es positivo).",
            "The **sign** of the value tells you the quadrants of the solutions (sine: I and II if positive; cosine: I and IV if positive).",
          ),
        ],
        answerDisplay: L(
          `$\\theta = ${cfg.sols[0]}^\\circ$ o $\\theta = ${cfg.sols[1]}^\\circ$`,
          `$\\theta = ${cfg.sols[0]}^\\circ$ or $\\theta = ${cfg.sols[1]}^\\circ$`,
        ),
        solution: [
          step("given", `$${cfg.eq}$, con $0^\\circ \\le \\theta < 360^\\circ$`, `$${cfg.eq}$, with $0^\\circ \\le \\theta < 360^\\circ$`),
          step(
            "approach",
            "Aislamos la función trigonométrica, hallamos el ángulo de referencia y lo colocamos en los cuadrantes correctos según el signo.",
            "Isolate the trig function, find the reference angle, and place it in the correct quadrants according to the sign.",
          ),
          step(
            "calculation",
            `$\\sin\\theta = ${cfg.val}$ o $\\cos\\theta = ${cfg.val}$ (según la ecuación)<br>Ángulo de referencia: $${cfg.ref}^\\circ$<br>Soluciones: $\\theta = ${cfg.sols[0]}^\\circ$ y $\\theta = ${cfg.sols[1]}^\\circ$`,
            `$\\sin\\theta = ${cfg.val}$ or $\\cos\\theta = ${cfg.val}$ (depending on the equation)<br>Reference angle: $${cfg.ref}^\\circ$<br>Solutions: $\\theta = ${cfg.sols[0]}^\\circ$ and $\\theta = ${cfg.sols[1]}^\\circ$`,
          ),
          step(
            "result",
            `La ${askSmallest ? "menor" : "mayor"} solución es $${value}^\\circ$.`,
            `The ${askSmallest ? "smaller" : "larger"} solution is $${value}^\\circ$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Interval with frequency kθ (medium)                               */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "trigeq-int-01",
      subject: "math",
      topicId: "trig-equations",
      subtopicId: "intervals",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 180,
      tags: ["intervals", "frequency", "degrees"],
      prerequisites: ["trig-functions"],
    },
    (rng) => {
      const k = rng.pick([2, 3]);
      const useSin = rng.bool();
      const ref = rng.pick([30, 45, 60]);
      // the value must match the function: sin 30° = 1/2 but cos 30° = √3/2
      const valLatex =
        ref === 30
          ? useSin
            ? "\\frac{1}{2}"
            : "\\frac{\\sqrt{3}}{2}"
          : ref === 45
            ? "\\frac{\\sqrt{2}}{2}"
            : useSin
              ? "\\frac{\\sqrt{3}}{2}"
              : "\\frac{1}{2}";
      const fn = useSin ? "\\sin" : "\\cos";
      // all u-solutions of fn(u) = valLatex on [0°, 360k°): two per full turn
      const us: number[] = [];
      for (let t = 0; t < k; t++) {
        if (useSin) {
          us.push(360 * t + ref, 360 * t + 180 - ref);
        } else {
          us.push(360 * t + ref, 360 * t + 360 - ref);
        }
      }
      us.sort((a, b) => a - b);
      const thetas = us.map((u) => u / k);
      const smallest = thetas[0];
      return {
        skill: L("Ecuaciones con ángulo múltiple", "Equations with a multiple angle"),
        statement: L(
          `Resuelve $${fn}(${k}\\theta) = ${valLatex}$ para $0^\\circ \\le \\theta < 360^\\circ$ y escribe la **menor** solución (en grados).`,
          `Solve $${fn}(${k}\\theta) = ${valLatex}$ for $0^\\circ \\le \\theta < 360^\\circ$ and write the **smallest** solution (in degrees).`,
        ),
        answer: {
          kind: "numeric",
          value: smallest,
          tolerance: { mode: "absolute", value: 0.001 },
          unitSuffix: "°",
        },
        hints: [
          L(
            `Sustituye $u = ${k}\\theta$: cuando $\\theta$ recorre $[0^\\circ, 360^\\circ)$, $u$ recorre $[0^\\circ, ${360 * k}^\\circ)$.`,
            `Substitute $u = ${k}\\theta$: as $\\theta$ runs over $[0^\\circ, 360^\\circ)$, $u$ runs over $[0^\\circ, ${360 * k}^\\circ)$.`,
          ),
          L(
            `En cada vuelta completa, $${fn} u = ${valLatex}$ tiene dos soluciones: el ángulo de referencia $${ref}^\\circ$ y su compañero de cuadrante.`,
            `On each full turn, $${fn} u = ${valLatex}$ has two solutions: the reference angle $${ref}^\\circ$ and its quadrant partner.`,
          ),
          L(
            `Divide cada solución de $u$ entre $${k}$ para volver a $\\theta$.`,
            `Divide each solution for $u$ by $${k}$ to return to $\\theta$.`,
          ),
        ],
        answerDisplay: L(
          `La menor solución es $${smallest}^\\circ$`,
          `The smallest solution is $${smallest}^\\circ$`,
        ),
        solution: [
          step(
            "given",
            `$${fn}(${k}\\theta) = ${valLatex}$, $0^\\circ \\le \\theta < 360^\\circ$`,
            `$${fn}(${k}\\theta) = ${valLatex}$, $0^\\circ \\le \\theta < 360^\\circ$`,
          ),
          step(
            "approach",
            `Con $u = ${k}\\theta$, el intervalo para $u$ es $[0^\\circ, ${360 * k}^\\circ)$: hay que buscar soluciones en ${k === 2 ? "dos" : "tres"} vueltas.`,
            `With $u = ${k}\\theta$, the interval for $u$ is $[0^\\circ, ${360 * k}^\\circ)$: solutions must be sought over ${k === 2 ? "two" : "three"} turns.`,
          ),
          step(
            "calculation",
            `$u = ${us.join("^\\circ,\\ ")}^\\circ$<br>$\\theta = \\frac{u}{${k}}$: $${thetas.join("^\\circ,\\ ")}^\\circ$`,
            `$u = ${us.join("^\\circ,\\ ")}^\\circ$<br>$\\theta = \\frac{u}{${k}}$: $${thetas.join("^\\circ,\\ ")}^\\circ$`,
          ),
          step(
            "result",
            `Hay ${thetas.length} soluciones; la menor es $${smallest}^\\circ$.`,
            `There are ${thetas.length} solutions; the smallest is $${smallest}^\\circ$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Equation with identity → factorable (medium)                      */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "trigeq-ident-01",
      subject: "math",
      topicId: "trig-equations",
      subtopicId: "with-identities",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 210,
      tags: ["identities", "factoring"],
      prerequisites: ["trig-functions"],
    },
    (rng) => {
      const useSinSq = rng.bool();
      // sin²θ + cosθ = 1  →  θ ∈ {0, 90, 270}
      // cos²θ + sinθ = 1  →  θ ∈ {0, 90, 180}
      const eq = useSinSq ? "\\sin^2\\theta + \\cos\\theta = 1" : "\\cos^2\\theta + \\sin\\theta = 1";
      const largest = useSinSq ? 270 : 180;
      const allSols = useSinSq ? "0^\\circ, 90^\\circ, 270^\\circ" : "0^\\circ, 90^\\circ, 180^\\circ";
      return {
        skill: L("Identidad + factorización", "Identity + factoring"),
        statement: L(
          `Resuelve $${eq}$ en $[0^\\circ, 360^\\circ)$ y escribe la **mayor** de las soluciones (en grados).`,
          `Solve $${eq}$ on $[0^\\circ, 360^\\circ)$ and write the **largest** of the solutions (in degrees).`,
        ),
        answer: {
          kind: "numeric",
          value: largest,
          tolerance: { mode: "absolute", value: 0.001 },
          unitSuffix: "°",
        },
        hints: [
          L(
            "La ecuación mezcla $\\sin^2$ y $\\cos$ (o al revés): usa la identidad pitagórica para dejar una sola función.",
            "The equation mixes $\\sin^2$ and $\\cos$ (or the other way round): use the Pythagorean identity to keep a single function.",
          ),
          L(
            useSinSq
              ? "Sustituye $\\sin^2\\theta = 1 - \\cos^2\\theta$."
              : "Sustituye $\\cos^2\\theta = 1 - \\sin^2\\theta$.",
            useSinSq
              ? "Substitute $\\sin^2\\theta = 1 - \\cos^2\\theta$."
              : "Substitute $\\cos^2\\theta = 1 - \\sin^2\\theta$.",
          ),
          L(
            "Tras simplificar aparecerá un producto igual a cero: resuelve cada factor por separado.",
            "After simplifying, a product equal to zero appears: solve each factor separately.",
          ),
        ],
        answerDisplay: L(
          `Soluciones: $${allSols}$; la mayor es $${largest}^\\circ$`,
          `Solutions: $${allSols}$; the largest is $${largest}^\\circ$`,
        ),
        solution: [
          step("given", `$${eq}$, con $0^\\circ \\le \\theta < 360^\\circ$`, `$${eq}$, with $0^\\circ \\le \\theta < 360^\\circ$`),
          step(
            "approach",
            "Reemplazamos el cuadrado con la identidad pitagórica y factorizamos.",
            "Replace the squared term using the Pythagorean identity and factor.",
          ),
          step(
            "calculation",
            useSinSq
              ? `$\\sin^2\\theta + \\cos\\theta = 1$<br>$1 - \\cos^2\\theta + \\cos\\theta = 1$<br>$-\\cos^2\\theta + \\cos\\theta = 0$<br>$\\cos\\theta\\,(1 - \\cos\\theta) = 0$<br>$\\cos\\theta = 0 \\Rightarrow \\theta = 90^\\circ, 270^\\circ$; $\\cos\\theta = 1 \\Rightarrow \\theta = 0^\\circ$`
              : `$\\cos^2\\theta + \\sin\\theta = 1$<br>$1 - \\sin^2\\theta + \\sin\\theta = 1$<br>$-\\sin^2\\theta + \\sin\\theta = 0$<br>$\\sin\\theta\\,(1 - \\sin\\theta) = 0$<br>$\\sin\\theta = 0 \\Rightarrow \\theta = 0^\\circ, 180^\\circ$; $\\sin\\theta = 1 \\Rightarrow \\theta = 90^\\circ$`,
            useSinSq
              ? `$\\sin^2\\theta + \\cos\\theta = 1$<br>$1 - \\cos^2\\theta + \\cos\\theta = 1$<br>$-\\cos^2\\theta + \\cos\\theta = 0$<br>$\\cos\\theta\\,(1 - \\cos\\theta) = 0$<br>$\\cos\\theta = 0 \\Rightarrow \\theta = 90^\\circ, 270^\\circ$; $\\cos\\theta = 1 \\Rightarrow \\theta = 0^\\circ$`
              : `$\\cos^2\\theta + \\sin\\theta = 1$<br>$1 - \\sin^2\\theta + \\sin\\theta = 1$<br>$-\\sin^2\\theta + \\sin\\theta = 0$<br>$\\sin\\theta\\,(1 - \\sin\\theta) = 0$<br>$\\sin\\theta = 0 \\Rightarrow \\theta = 0^\\circ, 180^\\circ$; $\\sin\\theta = 1 \\Rightarrow \\theta = 90^\\circ$`,
          ),
          step(
            "result",
            `Las soluciones son $${allSols}$; la mayor es $${largest}^\\circ$.`,
            `The solutions are $${allSols}$; the largest is $${largest}^\\circ$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* General solution (medium, MC)                                     */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "trigeq-gen-01",
      subject: "math",
      topicId: "trig-equations",
      subtopicId: "general",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["general-solution", "radians"],
      prerequisites: ["trig-functions"],
    },
    (rng) => {
      const useSin = rng.bool();
      // π/d must be the reference angle OF THAT FUNCTION: sin(π/6)=1/2, cos(π/3)=1/2, cos(π/6)=√3/2
      const ref = useSin
        ? rng.pick([
            { d: 6, v: "\\frac{1}{2}" },
            { d: 4, v: "\\frac{\\sqrt{2}}{2}" },
            { d: 3, v: "\\frac{\\sqrt{3}}{2}" },
          ])
        : rng.pick([
            { d: 3, v: "\\frac{1}{2}" },
            { d: 4, v: "\\frac{\\sqrt{2}}{2}" },
            { d: 6, v: "\\frac{\\sqrt{3}}{2}" },
          ]);
      const fn = useSin ? "\\sin" : "\\cos";
      const p1 = piFrac(1, ref.d);
      const p2 = piFrac(ref.d - 1, ref.d);
      const withSin = (period: string) =>
        L(
          `$x = ${p1} ${period}$ o $x = ${p2} ${period}$, $n \\in \\mathbb{Z}$`,
          `$x = ${p1} ${period}$ or $x = ${p2} ${period}$, $n \\in \\mathbb{Z}$`,
        );
      const withCos = (period: string) =>
        L(`$x = \\pm ${p1} ${period}$, $n \\in \\mathbb{Z}$`, `$x = \\pm ${p1} ${period}$, $n \\in \\mathbb{Z}$`);
      const options: McOption[] = useSin
        ? [
            { id: "a", text: withSin("+ 2\\pi n"), correct: true },
            { id: "b", text: withSin("+ \\pi n"), correct: false },
            { id: "c", text: withCos("+ 2\\pi n"), correct: false },
            {
              id: "d",
              text: L(
                `$x = ${p1} + 2\\pi n$, $n \\in \\mathbb{Z}$`,
                `$x = ${p1} + 2\\pi n$, $n \\in \\mathbb{Z}$`,
              ),
              correct: false,
            },
          ]
        : [
            { id: "a", text: withCos("+ 2\\pi n"), correct: true },
            { id: "b", text: withCos("+ \\pi n"), correct: false },
            {
              id: "c",
              text: L(
                `$x = ${p1} + \\pi n$, $n \\in \\mathbb{Z}$`,
                `$x = ${p1} + \\pi n$, $n \\in \\mathbb{Z}$`,
              ),
              correct: false,
            },
            { id: "d", text: withSin("+ 2\\pi n"), correct: false },
          ];
      const correctDisplay = useSin
        ? `$x = ${p1} + 2\\pi n$ o $x = ${p2} + 2\\pi n$, $n \\in \\mathbb{Z}$`
        : `$x = \\pm ${p1} + 2\\pi n$, $n \\in \\mathbb{Z}$`;
      return {
        skill: L("Solución general", "General solution"),
        statement: L(
          `¿Cuál es la **solución general** de $${fn} x = ${ref.v}$ (todas las soluciones reales)?`,
          `What is the **general solution** of $${fn} x = ${ref.v}$ (all real solutions)?`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Dentro de un periodo $[0, 2\\pi)$ hay dos soluciones.",
            "Within one period $[0, 2\\pi)$ there are two solutions.",
          ),
          L(
            useSin
              ? `En $[0, 2\\pi)$: $x = ${p1}$ y $x = ${p2}$.`
              : `En $[0, 2\\pi)$: $x = ${p1}$ y $x = -${p1}$.`,
            useSin
              ? `On $[0, 2\\pi)$: $x = ${p1}$ and $x = ${p2}$.`
              : `On $[0, 2\\pi)$: $x = ${p1}$ and $x = -${p1}$.`,
          ),
          L(
            "Todas las demás se obtienen sumando múltiplos del periodo $2\\pi$.",
            "All the others are obtained by adding multiples of the period $2\\pi$.",
          ),
        ],
        answerDisplay: L(correctDisplay, correctDisplay),
        solution: [
          step("given", `$${fn} x = ${ref.v}$`, `$${fn} x = ${ref.v}$`),
          step(
            "approach",
            "Hallamos las dos soluciones de un periodo y las repetimos sumando $2\\pi n$.",
            "Find the two solutions within one period and repeat them by adding $2\\pi n$.",
          ),
          step(
            "calculation",
            useSin
              ? `En $[0, 2\\pi)$: $x = ${p1}$ y $x = ${p2}$.<br>Añadiendo periodos: $x = ${p1} + 2\\pi n$ o $x = ${p2} + 2\\pi n$`
              : `En $[0, 2\\pi)$: $x = \\pm ${p1}$.<br>Añadiendo periodos: $x = \\pm ${p1} + 2\\pi n$`,
            useSin
              ? `On $[0, 2\\pi)$: $x = ${p1}$ and $x = ${p2}$.<br>Adding periods: $x = ${p1} + 2\\pi n$ or $x = ${p2} + 2\\pi n$`
              : `On $[0, 2\\pi)$: $x = \\pm ${p1}$.<br>Adding periods: $x = \\pm ${p1} + 2\\pi n$`,
          ),
          step(
            "result",
            `${correctDisplay}.`,
            `${correctDisplay}.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Counting solutions with frequency (hard)                          */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "trigeq-int-02",
      subject: "math",
      topicId: "trig-equations",
      subtopicId: "intervals",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 210,
      tags: ["intervals", "counting", "radians"],
      prerequisites: ["trig-functions"],
    },
    (rng) => {
      const k = rng.pick([1, 2, 3]);
      const cfg = rng.pick([
        { fn: "\\sin", v: "\\frac{1}{2}", a1: "\\frac{\\pi}{6}", a2: "\\frac{5\\pi}{6}", extreme: false },
        { fn: "\\sin", v: "\\frac{\\sqrt{2}}{2}", a1: "\\frac{\\pi}{4}", a2: "\\frac{3\\pi}{4}", extreme: false },
        { fn: "\\sin", v: "\\frac{\\sqrt{3}}{2}", a1: "\\frac{\\pi}{3}", a2: "\\frac{2\\pi}{3}", extreme: false },
        { fn: "\\sin", v: "-\\frac{1}{2}", a1: "\\frac{7\\pi}{6}", a2: "\\frac{11\\pi}{6}", extreme: false },
        { fn: "\\cos", v: "\\frac{1}{2}", a1: "\\frac{\\pi}{3}", a2: "\\frac{5\\pi}{3}", extreme: false },
        { fn: "\\cos", v: "\\frac{\\sqrt{2}}{2}", a1: "\\frac{\\pi}{4}", a2: "\\frac{7\\pi}{4}", extreme: false },
        { fn: "\\cos", v: "-\\frac{1}{2}", a1: "\\frac{2\\pi}{3}", a2: "\\frac{4\\pi}{3}", extreme: false },
        { fn: "\\sin", v: "1", a1: "\\frac{\\pi}{2}", a2: "", extreme: true },
        { fn: "\\sin", v: "-1", a1: "\\frac{3\\pi}{2}", a2: "", extreme: true },
        { fn: "\\cos", v: "1", a1: "0", a2: "", extreme: true },
        { fn: "\\cos", v: "-1", a1: "\\pi", a2: "", extreme: true },
      ]);
      const count = cfg.extreme ? k : 2 * k;
      return {
        skill: L("Contar soluciones con frecuencia", "Counting solutions with frequency"),
        statement: L(
          `¿Cuántas soluciones tiene la ecuación $${cfg.fn}(${k === 1 ? "" : k}x) = ${cfg.v}$ en el intervalo $[0, 2\\pi)$?`,
          `How many solutions does the equation $${cfg.fn}(${k === 1 ? "" : k}x) = ${cfg.v}$ have on the interval $[0, 2\\pi)$?`,
        ),
        answer: { kind: "numeric", value: count },
        hints: [
          L(
            `Sustituye $u = ${k === 1 ? "x" : `${k}x`}$: cuando $x$ recorre $[0, 2\\pi)$, $u$ recorre ${k === 1 ? "una vuelta completa" : `$${k}$ vueltas completas`}.`,
            `Substitute $u = ${k === 1 ? "x" : `${k}x`}$: as $x$ runs over $[0, 2\\pi)$, $u$ covers ${k === 1 ? "one full turn" : `$${k}$ full turns`}.`,
          ),
          L(
            cfg.extreme
              ? "El valor $1$ o $-1$ solo se alcanza **una** vez por vuelta."
              : "Un valor estrictamente entre $-1$ y $1$ se alcanza **dos** veces por vuelta.",
            cfg.extreme
              ? "The value $1$ or $-1$ is reached only **once** per turn."
              : "A value strictly between $-1$ and $1$ is reached **twice** per turn.",
          ),
          L(
            `Multiplica el número de soluciones por vuelta por el número de vueltas (${k}).`,
            `Multiply the number of solutions per turn by the number of turns (${k}).`,
          ),
        ],
        answerDisplay: L(
          `$${count}$ solucion${count === 1 ? "" : "es"} en $[0, 2\\pi)$`,
          `$${count}$ solution${count === 1 ? "" : "s"} on $[0, 2\\pi)$`,
        ),
        solution: [
          step(
            "given",
            `$${cfg.fn}(${k === 1 ? "" : k}x) = ${cfg.v}$ en $[0, 2\\pi)$`,
            `$${cfg.fn}(${k === 1 ? "" : k}x) = ${cfg.v}$ on $[0, 2\\pi)$`,
          ),
          step(
            "approach",
            `Con $u = ${k === 1 ? "x" : `${k}x`}$, el intervalo de $u$ es $[0, ${k}\\cdot 2\\pi)$: ${k === 1 ? "una" : `${k}`} vuelta${k === 1 ? "" : "s"} de la circunferencia.`,
            `With $u = ${k === 1 ? "x" : `${k}x`}$, the interval for $u$ is $[0, ${k}\\cdot 2\\pi)$: ${k === 1 ? "one" : `${k}`} full turn${k === 1 ? "" : "s"} of the circle.`,
          ),
          step(
            "calculation",
            cfg.extreme
              ? `En cada vuelta, $${cfg.fn} u = ${cfg.v}$ ocurre una sola vez (en $u = ${cfg.a1}$).<br>Número de vueltas: $${k}$ → $${k} \\cdot 1 = ${count}$ soluciones.`
              : `En cada vuelta, $${cfg.fn} u = ${cfg.v}$ ocurre dos veces (en $u = ${cfg.a1}$ y $u = ${cfg.a2}$).<br>Número de vueltas: $${k}$ → $${k} \\cdot 2 = ${count}$ soluciones.`,
            cfg.extreme
              ? `On each turn, $${cfg.fn} u = ${cfg.v}$ happens exactly once (at $u = ${cfg.a1}$).<br>Number of turns: $${k}$ → $${k} \\cdot 1 = ${count}$ solutions.`
              : `On each turn, $${cfg.fn} u = ${cfg.v}$ happens twice (at $u = ${cfg.a1}$ and $u = ${cfg.a2}$).<br>Number of turns: $${k}$ → $${k} \\cdot 2 = ${count}$ solutions.`,
          ),
          step(
            "result",
            `La ecuación tiene $${count}$ soluciones en $[0, 2\\pi)$.`,
            `The equation has $${count}$ solutions on $[0, 2\\pi)$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Quadratic in sin/cos → count solutions (hard)                     */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "trigeq-ident-02",
      subject: "math",
      topicId: "trig-equations",
      subtopicId: "with-identities",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 240,
      tags: ["quadratic", "factoring", "counting"],
      prerequisites: ["trig-functions"],
    },
    (rng) => {
      const cfg = rng.pick([
        {
          eq: "\\sin^2\\theta = \\frac{1}{4}",
          work: "$\\sin\\theta = \\pm\\frac{1}{2}$",
          sols: [30, 150, 210, 330],
        },
        {
          eq: "\\cos^2\\theta = \\frac{1}{4}",
          work: "$\\cos\\theta = \\pm\\frac{1}{2}$",
          sols: [60, 120, 240, 300],
        },
        {
          eq: "2\\sin^2\\theta - 1 = 0",
          work: "$\\sin\\theta = \\pm\\frac{\\sqrt{2}}{2}$",
          sols: [45, 135, 225, 315],
        },
        {
          eq: "\\sin^2\\theta - 1 = 0",
          work: "$\\sin\\theta = \\pm 1$",
          sols: [90, 270],
        },
        {
          eq: "\\cos^2\\theta - 1 = 0",
          work: "$\\cos\\theta = \\pm 1$",
          sols: [0, 180],
        },
        {
          eq: "\\sin^2\\theta + \\sin\\theta = 0",
          work: "$\\sin\\theta\\,(\\sin\\theta + 1) = 0 \\;\\Rightarrow\\; \\sin\\theta \\in \\{0,\\ -1\\}$",
          sols: [0, 180, 270],
        },
        {
          eq: "2\\sin^2\\theta - 3\\sin\\theta + 1 = 0",
          work: "$(2\\sin\\theta - 1)(\\sin\\theta - 1) = 0 \\;\\Rightarrow\\; \\sin\\theta \\in \\left\\{\\frac{1}{2},\\ 1\\right\\}$",
          sols: [30, 90, 150],
        },
        {
          eq: "2\\cos^2\\theta + \\cos\\theta - 1 = 0",
          work: "$(2\\cos\\theta - 1)(\\cos\\theta + 1) = 0 \\;\\Rightarrow\\; \\cos\\theta \\in \\left\\{\\frac{1}{2},\\ -1\\right\\}$",
          sols: [60, 180, 300],
        },
      ]);
      const count = cfg.sols.length;
      const solsLatex = `$${cfg.sols.join("^\\circ, ")}^\\circ$`;
      return {
        skill: L("Ecuaciones cuadráticas trigonométricas", "Trigonometric quadratic equations"),
        statement: L(
          `¿Cuántas soluciones tiene la ecuación $${cfg.eq}$ en el intervalo $[0^\\circ, 360^\\circ)$?`,
          `How many solutions does the equation $${cfg.eq}$ have on the interval $[0^\\circ, 360^\\circ)$?`,
        ),
        answer: { kind: "numeric", value: count },
        hints: [
          L(
            "Trata la ecuación como una ecuación cuadrática (o de raíces) en $\\sin\\theta$ o $\\cos\\theta$.",
            "Treat the equation as a quadratic (or a root equation) in $\\sin\\theta$ or $\\cos\\theta$.",
          ),
          L(
            "Halla todos los valores posibles de la función trigonométrica.",
            "Find all possible values of the trig function.",
          ),
          L(
            "Cada valor entre $-1$ y $1$ (sin ser $\\pm 1$) produce **dos** ángulos en $[0^\\circ, 360^\\circ)$; los valores $\\pm 1$ producen solo uno.",
            "Each value between $-1$ and $1$ (other than $\\pm 1$) produces **two** angles on $[0^\\circ, 360^\\circ)$; the values $\\pm 1$ produce only one.",
          ),
        ],
        answerDisplay: L(
          `$${count}$ soluciones: ${solsLatex}`,
          `$${count}$ solutions: ${solsLatex}`,
        ),
        solution: [
          step("given", `$${cfg.eq}$, con $0^\\circ \\le \\theta < 360^\\circ$`, `$${cfg.eq}$, with $0^\\circ \\le \\theta < 360^\\circ$`),
          step(
            "approach",
            "Resolvemos para la función trigonométrica (factorizando o extrayendo raíces) y contamos los ángulos de cada valor.",
            "Solve for the trig function (by factoring or taking roots) and count the angles for each value.",
          ),
          step(
            "calculation",
            `${cfg.work}<br>Las soluciones son $${cfg.sols.join("^\\circ, ")}^\\circ$.`,
            `${cfg.work}<br>The solutions are $${cfg.sols.join("^\\circ, ")}^\\circ$.`,
          ),
          step(
            "result",
            `En total hay $${count}$ soluciones en $[0^\\circ, 360^\\circ)$.`,
            `Altogether there are $${count}$ solutions on $[0^\\circ, 360^\\circ)$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* sin x = k·cos x → smallest positive (hard, expression)            */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "trigeq-gen-02",
      subject: "math",
      topicId: "trig-equations",
      subtopicId: "general",
      difficulty: "hard",
      questionType: "expression",
      estimatedTimeSec: 240,
      tags: ["tangent", "radians", "exact-values"],
      prerequisites: ["trig-functions"],
    },
    (rng) => {
      const cfg = rng.pick([
        { eq: "\\sin x = \\cos x", tan: "1", ref: { n: 1, d: 4 }, sols: { n: 1, d: 4 } },
        { eq: "\\sin x = \\sqrt{3}\\cos x", tan: "\\sqrt{3}", ref: { n: 1, d: 3 }, sols: { n: 1, d: 3 } },
        { eq: "\\sqrt{3}\\sin x = \\cos x", tan: "\\frac{\\sqrt{3}}{3}", ref: { n: 1, d: 6 }, sols: { n: 1, d: 6 } },
        { eq: "\\sin x = -\\cos x", tan: "-1", ref: { n: 3, d: 4 }, sols: { n: 3, d: 4 } },
        { eq: "\\sqrt{3}\\sin x = -\\cos x", tan: "-\\frac{\\sqrt{3}}{3}", ref: { n: 5, d: 6 }, sols: { n: 5, d: 6 } },
      ]);
      const ansLatex = piFrac(cfg.sols.n, cfg.sols.d);
      const secondLatex = piFrac(cfg.sols.n + cfg.sols.d, cfg.sols.d);
      return {
        skill: L("Reducir a tangente", "Reducing to a tangent"),
        statement: L(
          `Resuelve $${cfg.eq}$ y escribe la **menor solución positiva** en $[0, 2\\pi)$, en forma exacta con $\\pi$ (por ejemplo pi/5).`,
          `Solve $${cfg.eq}$ and write the **smallest positive solution** on $[0, 2\\pi)$, in exact form with $\\pi$ (e.g. pi/5).`,
        ),
        answer: {
          kind: "expression",
          accepted: [piExpr(cfg.sols.n, cfg.sols.d)],
          variables: [],
        },
        hints: [
          L(
            "Si $\\cos x = 0$ la ecuación falla, así que puedes dividir ambos lados entre $\\cos x$.",
            "If $\\cos x = 0$ the equation fails, so you may divide both sides by $\\cos x$.",
          ),
          L(
            `Obtendrás $\\tan x = ${cfg.tan}$ (tangente positiva: cuadrantes I y III; negativa: II y IV).`,
            `You will get $\\tan x = ${cfg.tan}$ (positive tangent: quadrants I and III; negative: II and IV).`,
          ),
          L(
            "La menor solución positiva es el ángulo de referencia (tangente positiva) o $\\pi$ menos el de referencia (tangente negativa).",
            "The smallest positive solution is the reference angle (positive tangent) or $\\pi$ minus the reference angle (negative tangent).",
          ),
        ],
        answerDisplay: L(`$x = ${ansLatex}$`, `$x = ${ansLatex}$`),
        solution: [
          step("given", `$${cfg.eq}$, con $0 \\le x < 2\\pi$`, `$${cfg.eq}$, with $0 \\le x < 2\\pi$`),
          step(
            "approach",
            "Dividimos entre $\\cos x$ para reducir la ecuación a una tangente.",
            "Divide by $\\cos x$ to reduce the equation to a tangent.",
          ),
          step(
            "calculation",
            `$\\tan x = ${cfg.tan}$<br>Soluciones en $[0, 2\\pi)$: $x = ${ansLatex}$ y $x = ${secondLatex}$`,
            `$\\tan x = ${cfg.tan}$<br>Solutions on $[0, 2\\pi)$: $x = ${ansLatex}$ and $x = ${secondLatex}$`,
          ),
          step(
            "result",
            `La menor solución positiva es $x = ${ansLatex}$ (la otra es ${secondLatex}, que es mayor).`,
            `The smallest positive solution is $x = ${ansLatex}$ (the other one is ${secondLatex}, which is larger).`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Challenge: mixed sin²/cos quadratic                               */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "trigeq-chal-01",
      subject: "math",
      topicId: "trig-equations",
      subtopicId: "with-identities",
      difficulty: "challenge",
      questionType: "numeric",
      estimatedTimeSec: 300,
      tags: ["identities", "quadratic", "multi-step"],
      prerequisites: ["trig-functions"],
    },
    (rng) => {
      const variant = rng.pick(["sinCos", "cosSin"] as const);
      const ask = rng.pick(["count", "smallest", "largest"] as const);
      // A: 2sin²θ + cosθ − 1 = 0 → cosθ = 1 or −1/2 → {0, 120, 240}
      // B: 2cos²θ + sinθ − 1 = 0 → sinθ = 1 or −1/2 → {90, 210, 330}
      const eq = variant === "sinCos"
        ? "2\\sin^2\\theta + \\cos\\theta - 1 = 0"
        : "2\\cos^2\\theta + \\sin\\theta - 1 = 0";
      const sols = variant === "sinCos" ? [0, 120, 240] : [90, 210, 330];
      const value = ask === "count" ? sols.length : ask === "smallest" ? sols[0] : sols[2];
      const askEs =
        ask === "count"
          ? "di cuántas soluciones tiene"
          : ask === "smallest"
            ? "escribe la menor de las soluciones (en grados)"
            : "escribe la mayor de las soluciones (en grados)";
      const askEn =
        ask === "count"
          ? "state how many solutions it has"
          : ask === "smallest"
            ? "write the smallest solution (in degrees)"
            : "write the largest solution (in degrees)";
      return {
        skill: L("Ecuación mixta con identidad", "Mixed equation with an identity"),
        statement: L(
          `Resuelve $${eq}$ en $[0^\\circ, 360^\\circ)$ y ${askEs}.`,
          `Solve $${eq}$ on $[0^\\circ, 360^\\circ)$ and ${askEn}.`,
        ),
        answer: {
          kind: "numeric",
          value,
          tolerance: { mode: "absolute", value: 0.001 },
          unitSuffix: "°",
        },
        hints: [
          L(
            "La ecuación mezcla $\\sin^2\\theta$ con $\\cos\\theta$ (o al revés): primero deja una sola función.",
            "The equation mixes $\\sin^2\\theta$ with $\\cos\\theta$ (or the other way round): first reduce to a single function.",
          ),
          L(
            variant === "sinCos"
              ? "Sustituye $\\sin^2\\theta = 1 - \\cos^2\\theta$ y obtendrás una cuadrática en $\\cos\\theta$."
              : "Sustituye $\\cos^2\\theta = 1 - \\sin^2\\theta$ y obtendrás una cuadrática en $\\sin\\theta$.",
            variant === "sinCos"
              ? "Substitute $\\sin^2\\theta = 1 - \\cos^2\\theta$ and you will get a quadratic in $\\cos\\theta$."
              : "Substitute $\\cos^2\\theta = 1 - \\sin^2\\theta$ and you will get a quadratic in $\\sin\\theta$.",
          ),
          L(
            "Factoriza la cuadrática y resuelve cada factor; recoge todos los ángulos del intervalo.",
            "Factor the quadratic and solve each factor; collect all angles in the interval.",
          ),
        ],
        answerDisplay: L(
          `Soluciones: $${sols.join("^\\circ, ")}^\\circ$`,
          `Solutions: $${sols.join("^\\circ, ")}^\\circ$`,
        ),
        solution: [
          step(
            "given",
            `$${eq}$, con $0^\\circ \\le \\theta < 360^\\circ$`,
            `$${eq}$, with $0^\\circ \\le \\theta < 360^\\circ$`,
          ),
          step(
            "approach",
            "Usamos la identidad pitagórica para dejar una sola función y resolvemos la cuadrática resultante.",
            "Use the Pythagorean identity to keep a single function, then solve the resulting quadratic.",
          ),
          step(
            "calculation",
            variant === "sinCos"
              ? `$2(1 - \\cos^2\\theta) + \\cos\\theta - 1 = 0$<br>$-2\\cos^2\\theta + \\cos\\theta + 1 = 0$<br>$(2\\cos\\theta + 1)(\\cos\\theta - 1) = 0$<br>$\\cos\\theta = -\\frac{1}{2} \\Rightarrow \\theta = 120^\\circ, 240^\\circ$; $\\cos\\theta = 1 \\Rightarrow \\theta = 0^\\circ$`
              : `$2(1 - \\sin^2\\theta) + \\sin\\theta - 1 = 0$<br>$-2\\sin^2\\theta + \\sin\\theta + 1 = 0$<br>$(2\\sin\\theta + 1)(\\sin\\theta - 1) = 0$<br>$\\sin\\theta = -\\frac{1}{2} \\Rightarrow \\theta = 210^\\circ, 330^\\circ$; $\\sin\\theta = 1 \\Rightarrow \\theta = 90^\\circ$`,
            variant === "sinCos"
              ? `$2(1 - \\cos^2\\theta) + \\cos\\theta - 1 = 0$<br>$-2\\cos^2\\theta + \\cos\\theta + 1 = 0$<br>$(2\\cos\\theta + 1)(\\cos\\theta - 1) = 0$<br>$\\cos\\theta = -\\frac{1}{2} \\Rightarrow \\theta = 120^\\circ, 240^\\circ$; $\\cos\\theta = 1 \\Rightarrow \\theta = 0^\\circ$`
              : `$2(1 - \\sin^2\\theta) + \\sin\\theta - 1 = 0$<br>$-2\\sin^2\\theta + \\sin\\theta + 1 = 0$<br>$(2\\sin\\theta + 1)(\\sin\\theta - 1) = 0$<br>$\\sin\\theta = -\\frac{1}{2} \\Rightarrow \\theta = 210^\\circ, 330^\\circ$; $\\sin\\theta = 1 \\Rightarrow \\theta = 90^\\circ$`,
          ),
          step(
            "result",
            ask === "count"
              ? `Las soluciones son $${sols.join("^\\circ, ")}^\\circ$: en total $${sols.length}$.`
              : ask === "smallest"
                ? `Las soluciones son $${sols.join("^\\circ, ")}^\\circ$; la menor es $${sols[0]}^\\circ$.`
                : `Las soluciones son $${sols.join("^\\circ, ")}^\\circ$; la mayor es $${sols[2]}^\\circ$.`,
            ask === "count"
              ? `The solutions are $${sols.join("^\\circ, ")}^\\circ$: $${sols.length}$ in total.`
              : ask === "smallest"
                ? `The solutions are $${sols.join("^\\circ, ")}^\\circ$; the smallest is $${sols[0]}^\\circ$.`
                : `The solutions are $${sols.join("^\\circ, ")}^\\circ$; the largest is $${sols[2]}^\\circ$.`,
          ),
        ],
      };
    },
  ),
];
