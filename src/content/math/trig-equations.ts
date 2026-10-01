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

  /* ================================================================== */
  /* Curated — Fundamentos de Matemáticas para Bachillerato (ESPOL),    */
  /* §5.6 Ecuaciones e inecuaciones trigonométricas, pp. 668–669.       */
  /* Every answer re-derived and verified with sympy before import.     */
  /* ================================================================== */

  /* 5.6 · 1d — 2cos²x − sen(2x) = 0 on [0, π]; sum of solutions = 3π/4 */
  template(
    {
      id: "trigeq-espol-1d",
      subject: "math",
      topicId: "trig-equations",
      subtopicId: "intervals",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 300,
      tags: ["intervals", "double-angle", "factoring", "radians"],
      prerequisites: ["trig-functions"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5.6 · 53d",
        page: 668,
      },
      reasoning: "case-analysis",
    },
    () => ({
      skill: L("Ecuación trigonométrica con factor común", "Trig equation with a common factor"),
      statement: L(
        `Resuelve $2\\cos^2 x - \\sin(2x) = 0$ en $x \\in [0, \\pi]$ y escribe la **suma de todas las soluciones** en radianes (puedes teclear p. ej. \`3pi/4\` o su valor decimal).`,
        `Solve $2\\cos^2 x - \\sin(2x) = 0$ on $x \\in [0, \\pi]$ and enter the **sum of all solutions** in radians (you may type e.g. \`3pi/4\` or its decimal value).`,
      ),
      answer: {
        kind: "numeric",
        value: (3 * Math.PI) / 4,
        tolerance: { mode: "absolute", value: 0.01 },
      },
      hints: [
        L(
          "Usa el ángulo doble $\\sin(2x) = 2\\sin x\\cos x$ y busca un factor común.",
          "Use the double angle $\\sin(2x) = 2\\sin x\\cos x$ and look for a common factor.",
        ),
        L(
          "$2\\cos^2 x - 2\\sin x\\cos x = 2\\cos x(\\cos x - \\sin x) = 0$, así que $\\cos x = 0$ o $\\tan x = 1$.",
          "$2\\cos^2 x - 2\\sin x\\cos x = 2\\cos x(\\cos x - \\sin x) = 0$, so $\\cos x = 0$ or $\\tan x = 1$.",
        ),
        L(
          "En $[0, \\pi]$: $\\cos x = 0 \\Rightarrow x = \\frac{\\pi}{2}$; $\\tan x = 1 \\Rightarrow x = \\frac{\\pi}{4}$. Suma ambas.",
          "On $[0, \\pi]$: $\\cos x = 0 \\Rightarrow x = \\frac{\\pi}{2}$; $\\tan x = 1 \\Rightarrow x = \\frac{\\pi}{4}$. Add them up.",
        ),
      ],
      answerDisplay: L(
        `$x \\in \\left\\{\\frac{\\pi}{4},\\ \\frac{\\pi}{2}\\right\\}$, suma $= \\frac{3\\pi}{4}$`,
        `$x \\in \\left\\{\\frac{\\pi}{4},\\ \\frac{\\pi}{2}\\right\\}$, sum $= \\frac{3\\pi}{4}$`,
      ),
      solution: [
        step(
          "given",
          "$2\\cos^2 x - \\sin(2x) = 0$, con $x \\in [0, \\pi]$.",
          "$2\\cos^2 x - \\sin(2x) = 0$, with $x \\in [0, \\pi]$.",
        ),
        step(
          "approach",
          "Un solo bloque no resuelve nada: hay que romper el ángulo doble para que aparezca un factor común.",
          "No single identity finishes it: break the double angle so a common factor appears.",
        ),
        step(
          "calculation",
          `$2\\cos^2 x - 2\\sin x\\cos x = 0$<br>$2\\cos x(\\cos x - \\sin x) = 0$<br>$\\cos x = 0 \\Rightarrow x = \\frac{\\pi}{2}$<br>$\\cos x = \\sin x \\Rightarrow \\tan x = 1 \\Rightarrow x = \\frac{\\pi}{4}$`,
          `$2\\cos^2 x - 2\\sin x\\cos x = 0$<br>$2\\cos x(\\cos x - \\sin x) = 0$<br>$\\cos x = 0 \\Rightarrow x = \\frac{\\pi}{2}$<br>$\\cos x = \\sin x \\Rightarrow \\tan x = 1 \\Rightarrow x = \\frac{\\pi}{4}$`,
        ),
        step(
          "result",
          `Ambas soluciones están en $[0, \\pi]$: $x \\in \\left\\{\\frac{\\pi}{4}, \\frac{\\pi}{2}\\right\\}$ y su suma es $\\frac{\\pi}{4} + \\frac{\\pi}{2} = \\frac{3\\pi}{4}$.`,
          `Both solutions lie in $[0, \\pi]$: $x \\in \\left\\{\\frac{\\pi}{4}, \\frac{\\pi}{2}\\right\\}$ and their sum is $\\frac{\\pi}{4} + \\frac{\\pi}{2} = \\frac{3\\pi}{4}$.`,
        ),
      ],
    }),
  ),

  /* 5.6 · 1f — tan(2x) − 2·sen(x) = 0 on [0, π]; sum = 5π/3 (poles!) */
  template(
    {
      id: "trigeq-espol-1f",
      subject: "math",
      topicId: "trig-equations",
      subtopicId: "intervals",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 360,
      tags: ["intervals", "tangent", "domain", "radians"],
      prerequisites: ["trig-functions"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5.6 · 53f",
        page: 668,
      },
      reasoning: "spurious",
    },
    () => ({
      skill: L("Tangente con restricción de dominio", "Tangent with a domain restriction"),
      statement: L(
        `Resuelve $\\tan(2x) - 2\\sin x = 0$ en $x \\in [0, \\pi]$ y escribe la **suma de todas las soluciones** en radianes (p. ej. \`5pi/3\`).`,
        `Solve $\\tan(2x) - 2\\sin x = 0$ on $x \\in [0, \\pi]$ and enter the **sum of all solutions** in radians (e.g. \`5pi/3\`).`,
      ),
      answer: {
        kind: "numeric",
        value: (5 * Math.PI) / 3,
        tolerance: { mode: "absolute", value: 0.01 },
      },
      hints: [
        L(
          "Antes de multiplicar: ¿dónde está definida la tangente? $\\cos(2x) \\neq 0$.",
          "Before multiplying: where is the tangent defined? $\\cos(2x) \\neq 0$.",
        ),
        L(
          "Multiplicando por $\\cos(2x)$: $\\sin(2x) = 2\\sin x\\cos(2x)$, y con ángulo doble queda $2\\sin x\\cos x = 2\\sin x(2\\cos^2 x - 1)$.",
          "Multiplying by $\\cos(2x)$: $\\sin(2x) = 2\\sin x\\cos(2x)$, and with the double angle $2\\sin x\\cos x = 2\\sin x(2\\cos^2 x - 1)$.",
        ),
        L(
          "$\\sin x = 0 \\Rightarrow x = 0, \\pi$; además $2\\cos^2 x - \\cos x - 1 = 0 \\Rightarrow \\cos x = 1$ o $-\\frac{1}{2}$ (es decir $x = \\frac{2\\pi}{3}$).",
          "$\\sin x = 0 \\Rightarrow x = 0, \\pi$; also $2\\cos^2 x - \\cos x - 1 = 0 \\Rightarrow \\cos x = 1$ or $-\\frac{1}{2}$ (that is, $x = \\frac{2\\pi}{3}$).",
        ),
      ],
      answerDisplay: L(
        `$x \\in \\left\\{0,\\ \\frac{2\\pi}{3},\\ \\pi\\right\\}$, suma $= \\frac{5\\pi}{3}$`,
        `$x \\in \\left\\{0,\\ \\frac{2\\pi}{3},\\ \\pi\\right\\}$, sum $= \\frac{5\\pi}{3}$`,
      ),
      solution: [
        step(
          "given",
          "$\\tan(2x) - 2\\sin x = 0$, con $x \\in [0, \\pi]$. La tangente exige $\\cos(2x) \\neq 0$.",
          "$\\tan(2x) - 2\\sin x = 0$, with $x \\in [0, \\pi]$. The tangent requires $\\cos(2x) \\neq 0$.",
        ),
        step(
          "approach",
          "Se multiplica por $\\cos(2x)$ (válido donde la tangente existe) y se rompe el ángulo doble para factorizar.",
          "Multiply by $\\cos(2x)$ (valid wherever the tangent exists) and break the double angle to factor.",
        ),
        step(
          "calculation",
          `$2\\sin x\\cos x = 2\\sin x(2\\cos^2 x - 1)$<br>$\\sin x\\bigl(\\cos x - 2\\cos^2 x + 1\\bigr) = 0$<br>$\\sin x = 0 \\Rightarrow x = 0, \\pi$<br>$2\\cos^2 x - \\cos x - 1 = 0 \\Rightarrow (2\\cos x + 1)(\\cos x - 1) = 0 \\Rightarrow x = \\frac{2\\pi}{3}$ (la raíz $\\cos x = 1$ repite $x = 0$)`,
          `$2\\sin x\\cos x = 2\\sin x(2\\cos^2 x - 1)$<br>$\\sin x\\bigl(\\cos x - 2\\cos^2 x + 1\\bigr) = 0$<br>$\\sin x = 0 \\Rightarrow x = 0, \\pi$<br>$2\\cos^2 x - \\cos x - 1 = 0 \\Rightarrow (2\\cos x + 1)(\\cos x - 1) = 0 \\Rightarrow x = \\frac{2\\pi}{3}$ (the root $\\cos x = 1$ repeats $x = 0$)`,
        ),
        step(
          "result",
          `Ninguna solución coincide con los polos ($x = \\frac{\\pi}{4}, \\frac{3\\pi}{4}$, donde $\\cos 2x = 0$), así que el conjunto es $\\left\\{0, \\frac{2\\pi}{3}, \\pi\\right\\}$ y la suma es $\\frac{5\\pi}{3}$.`,
          `No solution coincides with the poles ($x = \\frac{\\pi}{4}, \\frac{3\\pi}{4}$, where $\\cos 2x = 0$), so the set is $\\left\\{0, \\frac{2\\pi}{3}, \\pi\\right\\}$ and the sum is $\\frac{5\\pi}{3}$.`,
        ),
      ],
    }),
  ),

  /* 5.6 · 1h — sen(2x) = 1 + cos(2x) on [π, 2π]; sum = 11π/4 */
  template(
    {
      id: "trigeq-espol-1h",
      subject: "math",
      topicId: "trig-equations",
      subtopicId: "intervals",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 300,
      tags: ["intervals", "double-angle", "radians"],
      prerequisites: ["trig-functions"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5.6 · 53h",
        page: 668,
      },
      reasoning: "case-analysis",
    },
    () => ({
      skill: L("Todo en seno y coseno, luego factor común", "Everything in sine and cosine, then factor"),
      statement: L(
        `Resuelve $\\sin(2x) = 1 + \\cos(2x)$ en $x \\in [\\pi, 2\\pi]$ y escribe la **suma de todas las soluciones** en radianes (p. ej. \`11pi/4\`).`,
        `Solve $\\sin(2x) = 1 + \\cos(2x)$ on $x \\in [\\pi, 2\\pi]$ and enter the **sum of all solutions** in radians (e.g. \`11pi/4\`).`,
      ),
      answer: {
        kind: "numeric",
        value: (11 * Math.PI) / 4,
        tolerance: { mode: "absolute", value: 0.01 },
      },
      hints: [
        L(
          "Pasa todo al lado izquierdo: $\\sin(2x) - \\cos(2x) - 1 = 0$.",
          "Move everything to the left: $\\sin(2x) - \\cos(2x) - 1 = 0$.",
        ),
        L(
          "Con $\\sin(2x) = 2\\sin x\\cos x$ y $\\cos(2x) = 2\\cos^2 x - 1$: $2\\cos x(\\sin x - \\cos x) = 0$.",
          "With $\\sin(2x) = 2\\sin x\\cos x$ and $\\cos(2x) = 2\\cos^2 x - 1$: $2\\cos x(\\sin x - \\cos x) = 0$.",
        ),
        L(
          "$\\cos x = 0 \\Rightarrow x = \\frac{3\\pi}{2}$; $\\sin x = \\cos x \\Rightarrow x = \\frac{5\\pi}{4}$ (en $[\\pi, 2\\pi]$).",
          "$\\cos x = 0 \\Rightarrow x = \\frac{3\\pi}{2}$; $\\sin x = \\cos x \\Rightarrow x = \\frac{5\\pi}{4}$ (on $[\\pi, 2\\pi]$).",
        ),
      ],
      answerDisplay: L(
        `$x \\in \\left\\{\\frac{5\\pi}{4},\\ \\frac{3\\pi}{2}\\right\\}$, suma $= \\frac{11\\pi}{4}$`,
        `$x \\in \\left\\{\\frac{5\\pi}{4},\\ \\frac{3\\pi}{2}\\right\\}$, sum $= \\frac{11\\pi}{4}$`,
      ),
      solution: [
        step(
          "given",
          "$\\sin(2x) = 1 + \\cos(2x)$, con $x \\in [\\pi, 2\\pi]$.",
          "$\\sin(2x) = 1 + \\cos(2x)$, with $x \\in [\\pi, 2\\pi]$.",
        ),
        step(
          "approach",
          "Reescribir todo en $\\sin x$ y $\\cos x$ para poder factorizar; el $1$ se cancela con el $-1$ del coseno doble.",
          "Rewrite everything in $\\sin x$ and $\\cos x$ so it factors; the $1$ cancels against the $-1$ inside the double cosine.",
        ),
        step(
          "calculation",
          `$2\\sin x\\cos x - 1 - (2\\cos^2 x - 1) = 0$<br>$2\\sin x\\cos x - 2\\cos^2 x = 0$<br>$2\\cos x(\\sin x - \\cos x) = 0$<br>$\\cos x = 0 \\Rightarrow x = \\frac{3\\pi}{2}$; $\\tan x = 1 \\Rightarrow x = \\frac{5\\pi}{4}$`,
          `$2\\sin x\\cos x - 1 - (2\\cos^2 x - 1) = 0$<br>$2\\sin x\\cos x - 2\\cos^2 x = 0$<br>$2\\cos x(\\sin x - \\cos x) = 0$<br>$\\cos x = 0 \\Rightarrow x = \\frac{3\\pi}{2}$; $\\tan x = 1 \\Rightarrow x = \\frac{5\\pi}{4}$`,
        ),
        step(
          "result",
          `Ambas están en $[\\pi, 2\\pi]$: $x \\in \\left\\{\\frac{5\\pi}{4}, \\frac{3\\pi}{2}\\right\\}$, suma $= \\frac{11\\pi}{4}$. Comprobación en $x = \\frac{5\\pi}{4}$: $\\sin\\frac{5\\pi}{2} = 1$ y $1 + \\cos\\frac{5\\pi}{2} = 1$ ✓.`,
          `Both lie in $[\\pi, 2\\pi]$: $x \\in \\left\\{\\frac{5\\pi}{4}, \\frac{3\\pi}{2}\\right\\}$, sum $= \\frac{11\\pi}{4}$. Check at $x = \\frac{5\\pi}{4}$: $\\sin\\frac{5\\pi}{2} = 1$ and $1 + \\cos\\frac{5\\pi}{2} = 1$ ✓.`,
        ),
      ],
    }),
  ),

  /* 5.6 · 1k — 2sen(2x) − 2senx + 2cosx − 1 = 0 on [−π, π]; sum = −π */
  template(
    {
      id: "trigeq-espol-1k",
      subject: "math",
      topicId: "trig-equations",
      subtopicId: "intervals",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 360,
      tags: ["intervals", "grouping", "factoring", "radians"],
      prerequisites: ["trig-functions"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5.6 · 53k",
        page: 669,
      },
      reasoning: "multi-concept",
    },
    () => ({
      skill: L("Agrupar términos para factorizar", "Grouping terms to factor"),
      statement: L(
        `Resuelve $2\\sin(2x) - 2\\sin x + 2\\cos x - 1 = 0$ en $x \\in [-\\pi, \\pi]$ y escribe la **suma de todas las soluciones** en radianes (p. ej. \`-pi\`).`,
        `Solve $2\\sin(2x) - 2\\sin x + 2\\cos x - 1 = 0$ on $x \\in [-\\pi, \\pi]$ and enter the **sum of all solutions** in radians (e.g. \`-pi\`).`,
      ),
      answer: {
        kind: "numeric",
        value: -Math.PI,
        tolerance: { mode: "absolute", value: 0.01 },
      },
      hints: [
        L(
          "No lo expandas todo de golpe: agrupa $(2\\sin(2x) - 2\\sin x) + (2\\cos x - 1)$.",
          "Don't expand everything at once: group $(2\\sin(2x) - 2\\sin x) + (2\\cos x - 1)$.",
        ),
        L(
          "El primer grupo es $2\\sin x(2\\cos x - 1)$… y el segundo grupo ya es $(2\\cos x - 1)$.",
          "The first group is $2\\sin x(2\\cos x - 1)$… and the second group is already $(2\\cos x - 1)$.",
        ),
        L(
          "$(2\\cos x - 1)(2\\sin x + 1) = 0$: $\\cos x = \\frac{1}{2} \\Rightarrow x = \\pm\\frac{\\pi}{3}$; $\\sin x = -\\frac{1}{2} \\Rightarrow x = -\\frac{\\pi}{6}, -\\frac{5\\pi}{6}$.",
          "$(2\\cos x - 1)(2\\sin x + 1) = 0$: $\\cos x = \\frac{1}{2} \\Rightarrow x = \\pm\\frac{\\pi}{3}$; $\\sin x = -\\frac{1}{2} \\Rightarrow x = -\\frac{\\pi}{6}, -\\frac{5\\pi}{6}$.",
        ),
      ],
      answerDisplay: L(
        `$x \\in \\left\\{-\\frac{5\\pi}{6}, -\\frac{\\pi}{3}, -\\frac{\\pi}{6}, \\frac{\\pi}{3}\\right\\}$, suma $= -\\pi$`,
        `$x \\in \\left\\{-\\frac{5\\pi}{6}, -\\frac{\\pi}{3}, -\\frac{\\pi}{6}, \\frac{\\pi}{3}\\right\\}$, sum $= -\\pi$`,
      ),
      solution: [
        step(
          "given",
          "$2\\sin(2x) - 2\\sin x + 2\\cos x - 1 = 0$, con $x \\in [-\\pi, \\pi]$.",
          "$2\\sin(2x) - 2\\sin x + 2\\cos x - 1 = 0$, with $x \\in [-\\pi, \\pi]$.",
        ),
        step(
          "approach",
          "La jugada clave es ver la estructura: $2\\sin(2x) - 2\\sin x$ esconde el factor $2\\cos x - 1$, que es exactamente lo que sobra.",
          "The key move is seeing the structure: $2\\sin(2x) - 2\\sin x$ hides the factor $2\\cos x - 1$, which is exactly what is left over.",
        ),
        step(
          "calculation",
          `$2\\sin x(2\\cos x - 1) + (2\\cos x - 1) = 0$<br>$(2\\cos x - 1)(2\\sin x + 1) = 0$<br>$\\cos x = \\frac{1}{2} \\Rightarrow x = \\pm\\frac{\\pi}{3}$<br>$\\sin x = -\\frac{1}{2} \\Rightarrow x = -\\frac{\\pi}{6},\\ -\\frac{5\\pi}{6}$`,
          `$2\\sin x(2\\cos x - 1) + (2\\cos x - 1) = 0$<br>$(2\\cos x - 1)(2\\sin x + 1) = 0$<br>$\\cos x = \\frac{1}{2} \\Rightarrow x = \\pm\\frac{\\pi}{3}$<br>$\\sin x = -\\frac{1}{2} \\Rightarrow x = -\\frac{\\pi}{6},\\ -\\frac{5\\pi}{6}$`,
        ),
        step(
          "result",
          `Cuatro soluciones: $\\left\\{-\\frac{5\\pi}{6}, -\\frac{\\pi}{3}, -\\frac{\\pi}{6}, \\frac{\\pi}{3}\\right\\}$; su suma es $-\\pi$.`,
          `Four solutions: $\\left\\{-\\frac{5\\pi}{6}, -\\frac{\\pi}{3}, -\\frac{\\pi}{6}, \\frac{\\pi}{3}\\right\\}$; their sum is $-\\pi$.`,
        ),
      ],
    }),
  ),

  /* 5.6 · 1l — 2sen²x = 1 − cos x on [0, 2π]; sum = 4π */
  template(
    {
      id: "trigeq-espol-1l",
      subject: "math",
      topicId: "trig-equations",
      subtopicId: "intervals",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 240,
      tags: ["intervals", "pythagorean", "quadratic", "radians"],
      prerequisites: ["trig-functions"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5.6 · 53l",
        page: 669,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L("Pitágoras para quedar solo en coseno", "Pythagoras to keep only cosine"),
      statement: L(
        `Resuelve $2\\sin^2 x = 1 - \\cos x$ en $x \\in [0, 2\\pi]$ y escribe la **suma de todas las soluciones** en radianes (p. ej. \`4pi\`).`,
        `Solve $2\\sin^2 x = 1 - \\cos x$ on $x \\in [0, 2\\pi]$ and enter the **sum of all solutions** in radians (e.g. \`4pi\`).`,
      ),
      answer: {
        kind: "numeric",
        value: 4 * Math.PI,
        tolerance: { mode: "absolute", value: 0.01 },
      },
      hints: [
        L(
          "Con $\\sin^2 x = 1 - \\cos^2 x$ la ecuación queda solo en $\\cos x$.",
          "With $\\sin^2 x = 1 - \\cos^2 x$ the equation stays only in $\\cos x$.",
        ),
        L(
          "$2(1 - \\cos^2 x) = 1 - \\cos x \\Rightarrow 2\\cos^2 x - \\cos x - 1 = 0$.",
          "$2(1 - \\cos^2 x) = 1 - \\cos x \\Rightarrow 2\\cos^2 x - \\cos x - 1 = 0$.",
        ),
        L(
          "$(2\\cos x + 1)(\\cos x - 1) = 0$: $\\cos x = 1 \\Rightarrow x = 0, 2\\pi$; $\\cos x = -\\frac{1}{2} \\Rightarrow x = \\frac{2\\pi}{3}, \\frac{4\\pi}{3}$.",
          "$(2\\cos x + 1)(\\cos x - 1) = 0$: $\\cos x = 1 \\Rightarrow x = 0, 2\\pi$; $\\cos x = -\\frac{1}{2} \\Rightarrow x = \\frac{2\\pi}{3}, \\frac{4\\pi}{3}$.",
        ),
      ],
      answerDisplay: L(
        `$x \\in \\left\\{0, \\frac{2\\pi}{3}, \\frac{4\\pi}{3}, 2\\pi\\right\\}$, suma $= 4\\pi$`,
        `$x \\in \\left\\{0, \\frac{2\\pi}{3}, \\frac{4\\pi}{3}, 2\\pi\\right\\}$, sum $= 4\\pi$`,
      ),
      solution: [
        step(
          "given",
          "$2\\sin^2 x = 1 - \\cos x$, con $x \\in [0, 2\\pi]$ (intervalo cerrado: los extremos cuentan).",
          "$2\\sin^2 x = 1 - \\cos x$, with $x \\in [0, 2\\pi]$ (closed interval: the endpoints count).",
        ),
        step(
          "approach",
          "Sustituir $\\sin^2 x$ por $1 - \\cos^2 x$ convierte todo en una cuadrática en $\\cos x$.",
          "Replacing $\\sin^2 x$ with $1 - \\cos^2 x$ turns it into a quadratic in $\\cos x$.",
        ),
        step(
          "calculation",
          `$2 - 2\\cos^2 x = 1 - \\cos x$<br>$2\\cos^2 x - \\cos x - 1 = 0$<br>$(2\\cos x + 1)(\\cos x - 1) = 0$<br>$\\cos x = 1 \\Rightarrow x = 0,\\ 2\\pi$; $\\cos x = -\\frac{1}{2} \\Rightarrow x = \\frac{2\\pi}{3},\\ \\frac{4\\pi}{3}$`,
          `$2 - 2\\cos^2 x = 1 - \\cos x$<br>$2\\cos^2 x - \\cos x - 1 = 0$<br>$(2\\cos x + 1)(\\cos x - 1) = 0$<br>$\\cos x = 1 \\Rightarrow x = 0,\\ 2\\pi$; $\\cos x = -\\frac{1}{2} \\Rightarrow x = \\frac{2\\pi}{3},\\ \\frac{4\\pi}{3}$`,
        ),
        step(
          "result",
          `Como $0$ y $2\\pi$ pertenecen al intervalo cerrado, hay cuatro soluciones y su suma es $0 + \\frac{2\\pi}{3} + \\frac{4\\pi}{3} + 2\\pi = 4\\pi$.`,
          `Since $0$ and $2\\pi$ belong to the closed interval, there are four solutions and their sum is $0 + \\frac{2\\pi}{3} + \\frac{4\\pi}{3} + 2\\pi = 4\\pi$.`,
        ),
      ],
    }),
  ),

  /* 5.6 · 1m — sen(2x)·cos x = 6·sen³x on [0, 2π]; sum = 7π */
  template(
    {
      id: "trigeq-espol-1m",
      subject: "math",
      topicId: "trig-equations",
      subtopicId: "intervals",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 360,
      tags: ["intervals", "double-angle", "tangent", "radians"],
      prerequisites: ["trig-functions"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5.6 · 53m",
        page: 669,
      },
      reasoning: "case-analysis",
    },
    () => ({
      skill: L("Factorizar seno y quedar en tangente", "Factor out sine and reduce to tangent"),
      statement: L(
        `Resuelve $\\sin(2x)\\cos x = 6\\sin^3 x$ en $x \\in [0, 2\\pi]$ y escribe la **suma de todas las soluciones** en radianes (p. ej. \`7pi\`).`,
        `Solve $\\sin(2x)\\cos x = 6\\sin^3 x$ on $x \\in [0, 2\\pi]$ and enter the **sum of all solutions** in radians (e.g. \`7pi\`).`,
      ),
      answer: {
        kind: "numeric",
        value: 7 * Math.PI,
        tolerance: { mode: "absolute", value: 0.01 },
      },
      hints: [
        L(
          "$\\sin(2x)\\cos x = 2\\sin x\\cos^2 x$: saca el factor $\\sin x$.",
          "$\\sin(2x)\\cos x = 2\\sin x\\cos^2 x$: pull out the factor $\\sin x$.",
        ),
        L(
          "$\\sin x\\,(2\\cos^2 x - 6\\sin^2 x) = 0$. Si $\\sin x \\neq 0$, divide entre $2\\cos^2 x$.",
          "$\\sin x\\,(2\\cos^2 x - 6\\sin^2 x) = 0$. If $\\sin x \\neq 0$, divide by $2\\cos^2 x$.",
        ),
        L(
          "$\\tan^2 x = \\frac{1}{3} \\Rightarrow \\tan x = \\pm\\frac{\\sqrt{3}}{3} \\Rightarrow x = \\frac{\\pi}{6}, \\frac{5\\pi}{6}, \\frac{7\\pi}{6}, \\frac{11\\pi}{6}$; y con $\\sin x = 0$: $x = 0, \\pi, 2\\pi$.",
          "$\\tan^2 x = \\frac{1}{3} \\Rightarrow \\tan x = \\pm\\frac{\\sqrt{3}}{3} \\Rightarrow x = \\frac{\\pi}{6}, \\frac{5\\pi}{6}, \\frac{7\\pi}{6}, \\frac{11\\pi}{6}$; and with $\\sin x = 0$: $x = 0, \\pi, 2\\pi$.",
        ),
      ],
      answerDisplay: L(
        `Siete soluciones en $[0, 2\\pi]$; suma $= 7\\pi$`,
        `Seven solutions on $[0, 2\\pi]$; sum $= 7\\pi$`,
      ),
      solution: [
        step(
          "given",
          "$\\sin(2x)\\cos x = 6\\sin^3 x$, con $x \\in [0, 2\\pi]$.",
          "$\\sin(2x)\\cos x = 6\\sin^3 x$, with $x \\in [0, 2\\pi]$.",
        ),
        step(
          "approach",
          "Romper el ángulo doble deja todo en potencias de $\\sin x$ y $\\cos x$; el factor $\\sin x$ separa dos familias de soluciones.",
          "Breaking the double angle leaves powers of $\\sin x$ and $\\cos x$; the factor $\\sin x$ splits the solutions into two families.",
        ),
        step(
          "calculation",
          `$2\\sin x\\cos^2 x - 6\\sin^3 x = 0$<br>$\\sin x\\,(2\\cos^2 x - 6\\sin^2 x) = 0$<br>$\\sin x = 0 \\Rightarrow x = 0,\\ \\pi,\\ 2\\pi$<br>$\\cos^2 x = 3\\sin^2 x \\Rightarrow \\tan^2 x = \\frac{1}{3} \\Rightarrow x = \\frac{\\pi}{6},\\ \\frac{5\\pi}{6},\\ \\frac{7\\pi}{6},\\ \\frac{11\\pi}{6}$`,
          `$2\\sin x\\cos^2 x - 6\\sin^3 x = 0$<br>$\\sin x\\,(2\\cos^2 x - 6\\sin^2 x) = 0$<br>$\\sin x = 0 \\Rightarrow x = 0,\\ \\pi,\\ 2\\pi$<br>$\\cos^2 x = 3\\sin^2 x \\Rightarrow \\tan^2 x = \\frac{1}{3} \\Rightarrow x = \\frac{\\pi}{6},\\ \\frac{5\\pi}{6},\\ \\frac{7\\pi}{6},\\ \\frac{11\\pi}{6}$`,
        ),
        step(
          "result",
          `Siete soluciones: $\\left\\{0, \\frac{\\pi}{6}, \\frac{5\\pi}{6}, \\pi, \\frac{7\\pi}{6}, \\frac{11\\pi}{6}, 2\\pi\\right\\}$. Comprobación en $x = \\frac{\\pi}{6}$: $\\sin\\frac{\\pi}{3}\\cos\\frac{\\pi}{6} = \\frac{3}{4}$ y $6\\sin^3\\frac{\\pi}{6} = \\frac{6}{8} = \\frac{3}{4}$ ✓. Suma $= 7\\pi$.`,
          `Seven solutions: $\\left\\{0, \\frac{\\pi}{6}, \\frac{5\\pi}{6}, \\pi, \\frac{7\\pi}{6}, \\frac{11\\pi}{6}, 2\\pi\\right\\}$. Check at $x = \\frac{\\pi}{6}$: $\\sin\\frac{\\pi}{3}\\cos\\frac{\\pi}{6} = \\frac{3}{4}$ and $6\\sin^3\\frac{\\pi}{6} = \\frac{6}{8} = \\frac{3}{4}$ ✓. Sum $= 7\\pi$.`,
        ),
      ],
    }),
  ),

  /* 5.6 · 1e — cos²x + sen²(x/2) = ½ on [0, 4π); sum = 16π */
  template(
    {
      id: "trigeq-espol-1e",
      subject: "math",
      topicId: "trig-equations",
      subtopicId: "intervals",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 420,
      tags: ["intervals", "half-angle", "radians"],
      prerequisites: ["trig-functions"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5.6 · 53e",
        page: 668,
      },
      reasoning: "multi-concept",
    },
    () => ({
      skill: L("Ángulo mitad en un intervalo de dos vueltas", "Half angle on a two-turn interval"),
      statement: L(
        `Resuelve $\\cos^2 x + \\sin^2\\!\\left(\\frac{x}{2}\\right) = \\frac{1}{2}$ en $x \\in [0, 4\\pi)$ y escribe la **suma de todas las soluciones** en radianes (p. ej. \`16pi\`).`,
        `Solve $\\cos^2 x + \\sin^2\\!\\left(\\frac{x}{2}\\right) = \\frac{1}{2}$ on $x \\in [0, 4\\pi)$ and enter the **sum of all solutions** in radians (e.g. \`16pi\`).`,
      ),
      answer: {
        kind: "numeric",
        value: 16 * Math.PI,
        tolerance: { mode: "absolute", value: 0.02 },
      },
      hints: [
        L(
          "El ángulo mitad: $\\sin^2\\!\\left(\\frac{x}{2}\\right) = \\frac{1 - \\cos x}{2}$.",
          "The half angle: $\\sin^2\\!\\left(\\frac{x}{2}\\right) = \\frac{1 - \\cos x}{2}$.",
        ),
        L(
          "$\\cos^2 x + \\frac{1 - \\cos x}{2} = \\frac{1}{2} \\Rightarrow \\cos^2 x - \\frac{\\cos x}{2} = 0$.",
          "$\\cos^2 x + \\frac{1 - \\cos x}{2} = \\frac{1}{2} \\Rightarrow \\cos^2 x - \\frac{\\cos x}{2} = 0$.",
        ),
        L(
          "$\\cos x\\,(\\cos x - \\frac{1}{2}) = 0$: $\\cos x = 0 \\Rightarrow$ cuatro soluciones en $[0, 4\\pi)$; $\\cos x = \\frac{1}{2} \\Rightarrow$ otras cuatro.",
          "$\\cos x\\,(\\cos x - \\frac{1}{2}) = 0$: $\\cos x = 0 \\Rightarrow$ four solutions on $[0, 4\\pi)$; $\\cos x = \\frac{1}{2} \\Rightarrow$ four more.",
        ),
      ],
      answerDisplay: L(
        `Ocho soluciones en $[0, 4\\pi)$; suma $= 16\\pi$`,
        `Eight solutions on $[0, 4\\pi)$; sum $= 16\\pi$`,
      ),
      solution: [
        step(
          "given",
          "$\\cos^2 x + \\sin^2\\!\\left(\\frac{x}{2}\\right) = \\frac{1}{2}$, con $x \\in [0, 4\\pi)$: ¡dos vueltas completas!",
          "$\\cos^2 x + \\sin^2\\!\\left(\\frac{x}{2}\\right) = \\frac{1}{2}$, with $x \\in [0, 4\\pi)$: two full turns!",
        ),
        step(
          "approach",
          "El ángulo medio convierte todo en una ecuación pura de $\\cos x$; después hay que cosechar soluciones en DOS vueltas.",
          "The half-angle identity turns everything into a pure $\\cos x$ equation; then solutions must be harvested over TWO turns.",
        ),
        step(
          "calculation",
          `$\\cos^2 x + \\frac{1 - \\cos x}{2} = \\frac{1}{2}$<br>$\\cos^2 x - \\frac{\\cos x}{2} = 0$<br>$\\cos x\\left(\\cos x - \\frac{1}{2}\\right) = 0$<br>$\\cos x = 0 \\Rightarrow x = \\frac{\\pi}{2}, \\frac{3\\pi}{2}, \\frac{5\\pi}{2}, \\frac{7\\pi}{2}$<br>$\\cos x = \\frac{1}{2} \\Rightarrow x = \\frac{\\pi}{3}, \\frac{5\\pi}{3}, \\frac{7\\pi}{3}, \\frac{11\\pi}{3}$`,
          `$\\cos^2 x + \\frac{1 - \\cos x}{2} = \\frac{1}{2}$<br>$\\cos^2 x - \\frac{\\cos x}{2} = 0$<br>$\\cos x\\left(\\cos x - \\frac{1}{2}\\right) = 0$<br>$\\cos x = 0 \\Rightarrow x = \\frac{\\pi}{2}, \\frac{3\\pi}{2}, \\frac{5\\pi}{2}, \\frac{7\\pi}{2}$<br>$\\cos x = \\frac{1}{2} \\Rightarrow x = \\frac{\\pi}{3}, \\frac{5\\pi}{3}, \\frac{7\\pi}{3}, \\frac{11\\pi}{3}$`,
        ),
        step(
          "result",
          `Ocho soluciones en total; su suma es $8\\pi$ (familia del coseno cero) $+ 8\\pi$ (familia del $\\frac{1}{2}$) $= 16\\pi$.`,
          `Eight solutions in total; their sum is $8\\pi$ (zero-cosine family) $+ 8\\pi$ (the $\\frac{1}{2}$ family) $= 16\\pi$.`,
        ),
      ],
    }),
  ),

  /* 5.6 · 54c — cos²x − sen²x < −1/2 on [0, 2π) → (π/3, 2π/3) ∪ (4π/3, 5π/3)
     (VLM re-read of the printed page; matches the book's answer key.) */
  template(
    {
      id: "trigeq-espol-2c",
      subject: "math",
      topicId: "trig-equations",
      subtopicId: "intervals",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["inequality", "double-angle", "intervals"],
      prerequisites: ["trig-functions"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5.6 · 54c",
        page: 669,
      },
      reasoning: "case-analysis",
    },
    () => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\left(\\frac{\\pi}{3},\\ \\frac{2\\pi}{3}\\right)\\cup\\left(\\frac{4\\pi}{3},\\ \\frac{5\\pi}{3}\\right)$`, `$\\left(\\frac{\\pi}{3},\\ \\frac{2\\pi}{3}\\right)\\cup\\left(\\frac{4\\pi}{3},\\ \\frac{5\\pi}{3}\\right)$`), correct: true },
        { id: "b", text: L(`$\\left(\\frac{5\\pi}{12},\\ \\frac{13\\pi}{12}\\right)$`, `$\\left(\\frac{5\\pi}{12},\\ \\frac{13\\pi}{12}\\right)$`), correct: false },
        { id: "c", text: L(`$\\left(\\frac{\\pi}{6},\\ \\frac{5\\pi}{6}\\right)\\cup\\left(\\frac{7\\pi}{6},\\ \\frac{11\\pi}{6}\\right)$`, `$\\left(\\frac{\\pi}{6},\\ \\frac{5\\pi}{6}\\right)\\cup\\left(\\frac{7\\pi}{6},\\ \\frac{11\\pi}{6}\\right)$`), correct: false },
        { id: "d", text: L(`$\\left[\\frac{\\pi}{3},\\ \\frac{2\\pi}{3}\\right]\\cup\\left[\\frac{4\\pi}{3},\\ \\frac{5\\pi}{3}\\right]$`, `$\\left[\\frac{\\pi}{3},\\ \\frac{2\\pi}{3}\\right]\\cup\\left[\\frac{4\\pi}{3},\\ \\frac{5\\pi}{3}\\right]$`), correct: false },
      ];
      return {
        skill: L("Inecuación con ángulo doble", "Inequality with a double angle"),
        statement: L(
          `Determina el conjunto de verdad de $p(x):\\ \\cos^2 x - \\sin^2 x < -\\frac{1}{2}$ en $x \\in [0, 2\\pi)$.`,
          `Determine the truth set of $p(x):\\ \\cos^2 x - \\sin^2 x < -\\frac{1}{2}$ on $x \\in [0, 2\\pi)$.`,
        ),
        answer: { kind: "multiple-choice", options },
        hints: [
          L(
            "Reconoce el ángulo doble: $\\cos^2 x - \\sin^2 x = \\cos(2x)$.",
            "Recognize the double angle: $\\cos^2 x - \\sin^2 x = \\cos(2x)$.",
          ),
          L(
            "La inecuación queda $\\cos(2x) < -\\frac{1}{2}$, con $2x \\in [0, 4\\pi)$: caben DOS vueltas completas.",
            "The inequality becomes $\\cos(2x) < -\\frac{1}{2}$, with $2x \\in [0, 4\\pi)$: TWO full turns fit.",
          ),
          L(
            "En una vuelta $2x \\in \\left(\\frac{2\\pi}{3}, \\frac{4\\pi}{3}\\right)$; suma $2\\pi$ para la segunda vuelta y divide entre $2$ al final.",
            "In one turn $2x \\in \\left(\\frac{2\\pi}{3}, \\frac{4\\pi}{3}\\right)$; add $2\\pi$ for the second turn and divide by $2$ at the end.",
          ),
        ],
        answerDisplay: L(
          `$A_{p(x)} = \\left(\\frac{\\pi}{3},\\ \\frac{2\\pi}{3}\\right)\\cup\\left(\\frac{4\\pi}{3},\\ \\frac{5\\pi}{3}\\right)$`,
          `$A_{p(x)} = \\left(\\frac{\\pi}{3},\\ \\frac{2\\pi}{3}\\right)\\cup\\left(\\frac{4\\pi}{3},\\ \\frac{5\\pi}{3}\\right)$`,
        ),
        solution: [
          step(
            "given",
            "$\\cos^2 x - \\sin^2 x < -\\frac{1}{2}$, con $x \\in [0, 2\\pi)$.",
            "$\\cos^2 x - \\sin^2 x < -\\frac{1}{2}$, with $x \\in [0, 2\\pi)$.",
          ),
          step(
            "approach",
            "Colapsar la diferencia de cuadrados en un coseno de ángulo doble; el intervalo de $2x$ abarca dos vueltas, así que la familia de soluciones aparece dos veces.",
            "Collapse the difference of squares into a double-angle cosine; the interval for $2x$ spans two turns, so the solution family appears twice.",
          ),
          step(
            "calculation",
            `$\\cos^2 x - \\sin^2 x = \\cos(2x) < -\\frac{1}{2}$<br>$2x \\in \\left(\\frac{2\\pi}{3}, \\frac{4\\pi}{3}\\right) \\cup \\left(\\frac{2\\pi}{3} + 2\\pi, \\frac{4\\pi}{3} + 2\\pi\\right)$<br>$x \\in \\left(\\frac{\\pi}{3}, \\frac{2\\pi}{3}\\right) \\cup \\left(\\frac{4\\pi}{3}, \\frac{5\\pi}{3}\\right)$`,
            `$\\cos^2 x - \\sin^2 x = \\cos(2x) < -\\frac{1}{2}$<br>$2x \\in \\left(\\frac{2\\pi}{3}, \\frac{4\\pi}{3}\\right) \\cup \\left(\\frac{2\\pi}{3} + 2\\pi, \\frac{4\\pi}{3} + 2\\pi\\right)$<br>$x \\in \\left(\\frac{\\pi}{3}, \\frac{2\\pi}{3}\\right) \\cup \\left(\\frac{4\\pi}{3}, \\frac{5\\pi}{3}\\right)$`,
          ),
          step(
            "result",
            `El conjunto de verdad es $\\left(\\frac{\\pi}{3}, \\frac{2\\pi}{3}\\right) \\cup \\left(\\frac{4\\pi}{3}, \\frac{5\\pi}{3}\\right)$, abierto por la desigualdad estricta. Comprobación con $x = \\frac{\\pi}{2}$: $0 - 1 = -1 < -\\frac{1}{2}$ ✓.`,
            `The truth set is $\\left(\\frac{\\pi}{3}, \\frac{2\\pi}{3}\\right) \\cup \\left(\\frac{4\\pi}{3}, \\frac{5\\pi}{3}\\right)$, open because the inequality is strict. Check with $x = \\frac{\\pi}{2}$: $0 - 1 = -1 < -\\frac{1}{2}$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 5.6 · 2e — sen2x − senx > cos2x − cos²x on (0, π] → (0, π/2) — challenge */
  template(
    {
      id: "trigeq-espol-2e",
      subject: "math",
      topicId: "trig-equations",
      subtopicId: "intervals",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 480,
      tags: ["inequality", "double-angle", "factoring", "intervals"],
      prerequisites: ["trig-functions"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5.6 · 54e",
        page: 669,
      },
      reasoning: "multi-concept",
    },
    () => {
      const options: McOption[] = [
        { id: "a", text: L(`$(0,\\ \\frac{\\pi}{2})$`, `$(0,\\ \\frac{\\pi}{2})$`), correct: true },
        { id: "b", text: L(`$(0,\\ \\pi)$`, `$(0,\\ \\pi)$`), correct: false },
        { id: "c", text: L(`$(\\frac{\\pi}{2},\\ \\pi]$`, `$(\\frac{\\pi}{2},\\ \\pi]$`), correct: false },
        { id: "d", text: L(`$\\varnothing$`, `$\\varnothing$`), correct: false },
      ];
      return {
        skill: L("Inecuación trigonométrica de varios pasos", "Multi-step trigonometric inequality"),
        statement: L(
          `Determina el conjunto de verdad de $p(x):\\ \\sin(2x) - \\sin x > \\cos(2x) - \\cos^2 x$ en $x \\in (0, \\pi]$.`,
          `Determine the truth set of $p(x):\\ \\sin(2x) - \\sin x > \\cos(2x) - \\cos^2 x$ on $x \\in (0, \\pi]$.`,
        ),
        answer: { kind: "multiple-choice", options },
        hints: [
          L(
            "Reescribe cada lado: $\\sin(2x) - \\sin x = \\sin x\\,(2\\cos x - 1)$ y $\\cos(2x) - \\cos^2 x = -\\sin^2 x$.",
            "Rewrite each side: $\\sin(2x) - \\sin x = \\sin x\\,(2\\cos x - 1)$ and $\\cos(2x) - \\cos^2 x = -\\sin^2 x$.",
          ),
          L(
            "Pasa todo a la izquierda: $\\sin x\\,(2\\cos x - 1) + \\sin^2 x > 0$, factoriza $\\sin x$ y usa que en $(0, \\pi]$ el seno es positivo.",
            "Move everything left: $\\sin x\\,(2\\cos x - 1) + \\sin^2 x > 0$, factor out $\\sin x$ and use that sine is positive on $(0, \\pi]$.",
          ),
          L(
            "Queda $2\\cos x + \\sin x - 1 > 0$. Con $t = \\tan\\frac{x}{2}$: $3t^2 - 2t - 1 = 0 \\Rightarrow t = 1$ (o sea $x = \\frac{\\pi}{2}$). Prueba un punto a cada lado.",
            "It reduces to $2\\cos x + \\sin x - 1 > 0$. With $t = \\tan\\frac{x}{2}$: $3t^2 - 2t - 1 = 0 \\Rightarrow t = 1$ (that is, $x = \\frac{\\pi}{2}$). Test a point on each side.",
          ),
        ],
        answerDisplay: L(
          `$A_{p(x)} = \\left(0,\\ \\frac{\\pi}{2}\\right)$`,
          `$A_{p(x)} = \\left(0,\\ \\frac{\\pi}{2}\\right)$`,
        ),
        solution: [
          step(
            "given",
            "$\\sin(2x) - \\sin x > \\cos(2x) - \\cos^2 x$, con $x \\in (0, \\pi]$.",
            "$\\sin(2x) - \\sin x > \\cos(2x) - \\cos^2 x$, with $x \\in (0, \\pi]$.",
          ),
          step(
            "approach",
            "Identidades a ambos lados, todo a la izquierda, factor común $\\sin x$ (positivo en el intervalo) y cambio $t = \\tan\\frac{x}{2}$ para la cota restante.",
            "Identities on both sides, everything left, common factor $\\sin x$ (positive on the interval) and the substitution $t = \\tan\\frac{x}{2}$ for the remaining bound.",
          ),
          step(
            "calculation",
            `$\\sin x(2\\cos x - 1) > -\\sin^2 x$<br>$\\sin x\\,(2\\cos x - 1 + \\sin x) > 0$<br>Con $\\sin x > 0$: $2\\cos x + \\sin x - 1 > 0$<br>$t = \\tan\\frac{x}{2}$: $\\frac{2(1 - t^2) + 2t}{1 + t^2} > 1 \\Rightarrow 3t^2 - 2t - 1 < 0 \\Rightarrow -\\frac{1}{3} < t < 1$<br>En $(0, \\pi]$: $t > 0$, así que $0 < t < 1 \\Rightarrow 0 < \\frac{x}{2} < \\frac{\\pi}{4} \\Rightarrow 0 < x < \\frac{\\pi}{2}$`,
            `$\\sin x(2\\cos x - 1) > -\\sin^2 x$<br>$\\sin x\\,(2\\cos x - 1 + \\sin x) > 0$<br>With $\\sin x > 0$: $2\\cos x + \\sin x - 1 > 0$<br>$t = \\tan\\frac{x}{2}$: $\\frac{2(1 - t^2) + 2t}{1 + t^2} > 1 \\Rightarrow 3t^2 - 2t - 1 < 0 \\Rightarrow -\\frac{1}{3} < t < 1$<br>On $(0, \\pi]$: $t > 0$, so $0 < t < 1 \\Rightarrow 0 < \\frac{x}{2} < \\frac{\\pi}{4} \\Rightarrow 0 < x < \\frac{\\pi}{2}$`,
          ),
          step(
            "result",
            `El conjunto de verdad es $\\left(0, \\frac{\\pi}{2}\\right)$. Comprobación: en $x = \\frac{\\pi}{4}$, $\\sin\\frac{\\pi}{2} - \\sin\\frac{\\pi}{4} \\approx 0{,}293$ y $\\cos\\frac{\\pi}{2} - \\cos^2\\frac{\\pi}{4} = -0{,}5$ ✓; en $x = \\frac{3\\pi}{4}$ la desigualdad falla.`,
            `The truth set is $\\left(0, \\frac{\\pi}{2}\\right)$. Check: at $x = \\frac{\\pi}{4}$, $\\sin\\frac{\\pi}{2} - \\sin\\frac{\\pi}{4} \\approx 0.293$ and $\\cos\\frac{\\pi}{2} - \\cos^2\\frac{\\pi}{4} = -0.5$ ✓; at $x = \\frac{3\\pi}{4}$ the inequality fails.`,
          ),
        ],
      };
    },
  ),

  /* 5.6 · 54g — µ(sen(2θ) − 1) < 0 on [−π, π] → ∅  (µ = unit step)
     (VLM re-read: the book prints µ, the unit step, not sgn; answer key: ∅.) */
  template(
    {
      id: "trigeq-espol-2g",
      subject: "math",
      topicId: "trig-equations",
      subtopicId: "intervals",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["inequality", "unit-step", "definition", "intervals"],
      prerequisites: ["trig-functions"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5.6 · 54g",
        page: 669,
      },
      reasoning: "definition-hunting",
    },
    () => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\varnothing$`, `$\\varnothing$`), correct: true },
        { id: "b", text: L(`$[-\\pi, \\pi] \\smallsetminus \\left\\{-\\frac{3\\pi}{4},\\ \\frac{\\pi}{4}\\right\\}$`, `$[-\\pi, \\pi] \\smallsetminus \\left\\{-\\frac{3\\pi}{4},\\ \\frac{\\pi}{4}\\right\\}$`), correct: false },
        { id: "c", text: L(`$[-\\pi, \\pi] \\smallsetminus \\left\\{\\frac{\\pi}{4}\\right\\}$`, `$[-\\pi, \\pi] \\smallsetminus \\left\\{\\frac{\\pi}{4}\\right\\}$`), correct: false },
        { id: "d", text: L(`$[-\\pi, \\pi]$`, `$[-\\pi, \\pi]$`), correct: false },
      ];
      return {
        skill: L("El escalón unitario µ no toma valores negativos", "The unit step µ never takes negative values"),
        statement: L(
          `Sea $\\mu$ la función escalón unitario: $\\mu(t) = 1$ si $t > 0$ y $\\mu(t) = 0$ si $t \\le 0$. Determina el conjunto de verdad de $p(\\theta):\\ \\mu\\bigl(\\sin(2\\theta) - 1\\bigr) < 0$ en $\\theta \\in [-\\pi, \\pi]$.`,
          `Let $\\mu$ be the unit step function: $\\mu(t) = 1$ if $t > 0$ and $\\mu(t) = 0$ if $t \\le 0$. Determine the truth set of $p(\\theta):\\ \\mu\\bigl(\\sin(2\\theta) - 1\\bigr) < 0$ on $\\theta \\in [-\\pi, \\pi]$.`,
        ),
        answer: { kind: "multiple-choice", options },
        hints: [
          L(
            "Antes de tocar el seno, pregúntate: ¿qué valores puede tomar $\\mu(\\cdot)$?",
            "Before touching the sine, ask yourself: which values can $\\mu(\\cdot)$ take?",
          ),
          L(
            "$\\mu$ solo entrega $0$ o $1$, sin importar su argumento. Ninguno de los dos es menor que $0$.",
            "$\\mu$ only outputs $0$ or $1$, whatever its argument is. Neither is less than $0$.",
          ),
          L(
            "Cuidado: si la función fuera $\\operatorname{sgn}$ en lugar de $\\mu$, la respuesta sería todo el intervalo salvo donde $\\sin(2\\theta) = 1$.",
            "Careful: if the function were $\\operatorname{sgn}$ instead of $\\mu$, the answer would be the whole interval except where $\\sin(2\\theta) = 1$.",
          ),
        ],
        answerDisplay: L(
          `$A_{p(\\theta)} = \\varnothing$: $\\mu$ nunca es negativa.`,
          `$A_{p(\\theta)} = \\varnothing$: $\\mu$ is never negative.`,
        ),
        solution: [
          step(
            "given",
            "$\\mu\\bigl(\\sin(2\\theta) - 1\\bigr) < 0$, con $\\theta \\in [-\\pi, \\pi]$ y $\\mu(t) = 1$ si $t>0$, $\\mu(t)=0$ si $t \\le 0$.",
            "$\\mu\\bigl(\\sin(2\\theta) - 1\\bigr) < 0$, with $\\theta \\in [-\\pi, \\pi]$ and $\\mu(t) = 1$ if $t>0$, $\\mu(t)=0$ if $t \\le 0$.",
          ),
          step(
            "approach",
            "El rango de la función escalón es el conjunto finito $\\{0, 1\\}$: por definición nunca produce valores negativos, sin importar el argumento.",
            "The range of the unit step is the finite set $\\{0, 1\\}$: by definition it never produces negative values, regardless of the argument.",
          ),
          step(
            "calculation",
            `$\\mu(t) \\in \\{0, 1\\}\\ \\forall t \\in \\mathbb{R}$<br>$\\mu\\bigl(\\sin(2\\theta)-1\\bigr) \\in \\{0, 1\\}$<br>Neither $0 < 0$ nor $1 < 0$ holds: the predicate is false for every $\\theta$.`,
            `$\\mu(t) \\in \\{0, 1\\}\\ \\forall t \\in \\mathbb{R}$<br>$\\mu\\bigl(\\sin(2\\theta)-1\\bigr) \\in \\{0, 1\\}$<br>Neither $0 < 0$ nor $1 < 0$ holds: the predicate is false for every $\\theta$.`,
          ),
          step(
            "result",
            `Ningún $\\theta$ cumple el predicado, así que $A_{p(\\theta)} = \\varnothing$. (La trampa: con $\\operatorname{sgn}$ en lugar de $\\mu$ excluirías $\\theta = \\frac{\\pi}{4}$ y $\\theta = -\\frac{3\\pi}{4}$, donde $\\sin(2\\theta) = 1$.)`,
            `No $\\theta$ satisfies the predicate, so $A_{p(\\theta)} = \\varnothing$. (The trap: with $\\operatorname{sgn}$ instead of $\\mu$ you would exclude $\\theta = \\frac{\\pi}{4}$ and $\\theta = -\\frac{3\\pi}{4}$, where $\\sin(2\\theta) = 1$.)`,
          ),
        ],
      };
    },
  ),

  /* 5.6 · 54d — |sen(πθ)·cos(πθ)| ≤ 1/4 on [0, 1] → [0,1/12]∪[5/12,7/12]∪[11/12,1]
     (VLM re-read: the book prints ≤ (not ≥); matches the answer key exactly.) */
  template(
    {
      id: "trigeq-espol-2d",
      subject: "math",
      topicId: "trig-equations",
      subtopicId: "intervals",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 360,
      tags: ["inequality", "absolute-value", "double-angle", "intervals"],
      prerequisites: ["trig-functions"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5.6 · 54d",
        page: 669,
      },
      reasoning: "multi-concept",
    },
    () => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\left[0, \\frac{1}{12}\\right]\\cup\\left[\\frac{5}{12}, \\frac{7}{12}\\right]\\cup\\left[\\frac{11}{12}, 1\\right]$`, `$\\left[0, \\frac{1}{12}\\right]\\cup\\left[\\frac{5}{12}, \\frac{7}{12}\\right]\\cup\\left[\\frac{11}{12}, 1\\right]$`), correct: true },
        { id: "b", text: L(`$\\left[\\frac{1}{12}, \\frac{5}{12}\\right]\\cup\\left[\\frac{7}{12}, \\frac{11}{12}\\right]$`, `$\\left[\\frac{1}{12}, \\frac{5}{12}\\right]\\cup\\left[\\frac{7}{12}, \\frac{11}{12}\\right]$`), correct: false },
        { id: "c", text: L(`$\\left(0, \\frac{1}{12}\\right)\\cup\\left(\\frac{5}{12}, \\frac{7}{12}\\right)\\cup\\left(\\frac{11}{12}, 1\\right)$`, `$\\left(0, \\frac{1}{12}\\right)\\cup\\left(\\frac{5}{12}, \\frac{7}{12}\\right)\\cup\\left(\\frac{11}{12}, 1\\right)$`), correct: false },
        { id: "d", text: L(`$\\left[\\frac{5}{12}, \\frac{7}{12}\\right]$`, `$\\left[\\frac{5}{12}, \\frac{7}{12}\\right]$`), correct: false },
      ];
      return {
        skill: L("Valor absoluto + ángulo doble en [0, 1]", "Absolute value + double angle on [0, 1]"),
        statement: L(
          `Determina el conjunto de verdad de $p(\\theta):\\ \\left|\\sin(\\pi\\theta)\\cos(\\pi\\theta)\\right| \\leq \\frac{1}{4}$ en $\\theta \\in [0, 1]$.`,
          `Determine the truth set of $p(\\theta):\\ \\left|\\sin(\\pi\\theta)\\cos(\\pi\\theta)\\right| \\leq \\frac{1}{4}$ on $\\theta \\in [0, 1]$.`,
        ),
        answer: { kind: "multiple-choice", options },
        hints: [
          L(
            "Ángulo doble al revés: $\\sin(\\pi\\theta)\\cos(\\pi\\theta) = \\frac{1}{2}\\sin(2\\pi\\theta)$.",
            "Reverse double angle: $\\sin(\\pi\\theta)\\cos(\\pi\\theta) = \\frac{1}{2}\\sin(2\\pi\\theta)$.",
          ),
          L(
            "La inecuación es $\\left|\\sin(2\\pi\\theta)\\right| \\leq \\frac{1}{2}$, con $2\\pi\\theta \\in [0, 2\\pi]$ (una vuelta justa).",
            "The inequality is $\\left|\\sin(2\\pi\\theta)\\right| \\leq \\frac{1}{2}$, with $2\\pi\\theta \\in [0, 2\\pi]$ (exactly one turn).",
          ),
          L(
            "$\\left|\\sin u\\right| \\leq \\frac{1}{2}$ en $u \\in \\left[0, \\frac{\\pi}{6}\\right]\\cup\\left[\\frac{5\\pi}{6}, \\frac{7\\pi}{6}\\right]\\cup\\left[\\frac{11\\pi}{6}, 2\\pi\\right]$; divide entre $2\\pi$.",
            "$\\left|\\sin u\\right| \\leq \\frac{1}{2}$ for $u \\in \\left[0, \\frac{\\pi}{6}\\right]\\cup\\left[\\frac{5\\pi}{6}, \\frac{7\\pi}{6}\\right]\\cup\\left[\\frac{11\\pi}{6}, 2\\pi\\right]$; divide by $2\\pi$.",
          ),
        ],
        answerDisplay: L(
          `$A_{p(\\theta)} = \\left[0, \\frac{1}{12}\\right]\\cup\\left[\\frac{5}{12}, \\frac{7}{12}\\right]\\cup\\left[\\frac{11}{12}, 1\\right]$`,
          `$A_{p(\\theta)} = \\left[0, \\frac{1}{12}\\right]\\cup\\left[\\frac{5}{12}, \\frac{7}{12}\\right]\\cup\\left[\\frac{11}{12}, 1\\right]$`,
        ),
        solution: [
          step(
            "given",
            "$\\left|\\sin(\\pi\\theta)\\cos(\\pi\\theta)\\right| \\leq \\frac{1}{4}$, con $\\theta \\in [0, 1]$.",
            "$\\left|\\sin(\\pi\\theta)\\cos(\\pi\\theta)\\right| \\leq \\frac{1}{4}$, with $\\theta \\in [0, 1]$.",
          ),
          step(
            "approach",
            "El producto seno·coseno es medio seno doble; como $\\theta \\in [0,1]$, el argumento $2\\pi\\theta$ recorre exactamente una vuelta y la cota pequeña se cumple cerca de los ceros del seno.",
            "The sine·cosine product is half a double sine; since $\\theta \\in [0,1]$, the argument $2\\pi\\theta$ covers exactly one turn and the small bound holds near the zeros of sine.",
          ),
          step(
            "calculation",
            `$\\left|\\frac{1}{2}\\sin(2\\pi\\theta)\\right| \\leq \\frac{1}{4} \\Rightarrow \\left|\\sin(2\\pi\\theta)\\right| \\leq \\frac{1}{2}$<br>$2\\pi\\theta \\in \\left[0, \\frac{\\pi}{6}\\right]\\cup\\left[\\frac{5\\pi}{6}, \\frac{7\\pi}{6}\\right]\\cup\\left[\\frac{11\\pi}{6}, 2\\pi\\right]$<br>$\\theta \\in \\left[0, \\frac{1}{12}\\right]\\cup\\left[\\frac{5}{12}, \\frac{7}{12}\\right]\\cup\\left[\\frac{11}{12}, 1\\right]$`,
            `$\\left|\\frac{1}{2}\\sin(2\\pi\\theta)\\right| \\leq \\frac{1}{4} \\Rightarrow \\left|\\sin(2\\pi\\theta)\\right| \\leq \\frac{1}{2}$<br>$2\\pi\\theta \\in \\left[0, \\frac{\\pi}{6}\\right]\\cup\\left[\\frac{5\\pi}{6}, \\frac{7\\pi}{6}\\right]\\cup\\left[\\frac{11\\pi}{6}, 2\\pi\\right]$<br>$\\theta \\in \\left[0, \\frac{1}{12}\\right]\\cup\\left[\\frac{5}{12}, \\frac{7}{12}\\right]\\cup\\left[\\frac{11}{12}, 1\\right]$`,
          ),
          step(
            "result",
            `El conjunto de verdad es $\\left[0, \\frac{1}{12}\\right]\\cup\\left[\\frac{5}{12}, \\frac{7}{12}\\right]\\cup\\left[\\frac{11}{12}, 1\\right]$, cerrado porque la desigualdad admite igualdad. Comprobación con $\\theta = 0$: $0 \\leq \\frac{1}{4}$ ✓; con $\\theta = \\frac{1}{4}$: $\\left|\\sin\\frac{\\pi}{4}\\cos\\frac{\\pi}{4}\\right| = \\frac{1}{2} > \\frac{1}{4}$ ✗.`,
            `The truth set is $\\left[0, \\frac{1}{12}\\right]\\cup\\left[\\frac{5}{12}, \\frac{7}{12}\\right]\\cup\\left[\\frac{11}{12}, 1\\right]$, closed because equality is allowed. Check with $\\theta = 0$: $0 \\leq \\frac{1}{4}$ ✓; with $\\theta = \\frac{1}{4}$: $\\left|\\sin\\frac{\\pi}{4}\\cos\\frac{\\pi}{4}\\right| = \\frac{1}{2} > \\frac{1}{4}$ ✗.`,
          ),
        ],
      };
    },
  ),

  /* ================================================================== */
  /* Segunda tanda ESPOL §5.6 — transcrita con el modelo de visión      */
  /* (VLM) desde las páginas escaneadas y cruzada con la clave de       */
  /* respuestas impresa (pp. 799+) + re-derivación sympy.               */
  /* ================================================================== */

  /* 5.6 · 53i — 1 − √2·cos x = 0 on [0, 4π); sum of solutions = 8π */
  template(
    {
      id: "trigeq-espol-53i",
      subject: "math",
      topicId: "trig-equations",
      subtopicId: "intervals",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 300,
      tags: ["intervals", "exact-values", "radians", "sum-of-solutions"],
      prerequisites: ["trig-functions"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5.6 · 53i",
        page: 668,
      },
      reasoning: "case-analysis",
    },
    () => ({
      skill: L("Coseno exacto en dos vueltas", "Exact cosine over two turns"),
      statement: L(
        `Resuelve $1 - \\sqrt{2}\\,\\cos x = 0$ en $x \\in [0, 4\\pi)$ y escribe la **suma de todas las soluciones** en radianes (puedes teclear p. ej. \`pi/4\` o su valor decimal).`,
        `Solve $1 - \\sqrt{2}\\,\\cos x = 0$ on $x \\in [0, 4\\pi)$ and enter the **sum of all solutions** in radians (you may type e.g. \`pi/4\` or its decimal value).`,
      ),
      answer: {
        kind: "numeric",
        value: 8 * Math.PI,
        tolerance: { mode: "absolute", value: 0.01 },
      },
      hints: [
        L(
          "Despeja: $\\cos x = \\frac{1}{\\sqrt{2}} = \\frac{\\sqrt{2}}{2}$, el valor exacto de $\\cos\\left(\\frac{\\pi}{4}\\right)$.",
          "Isolate: $\\cos x = \\frac{1}{\\sqrt{2}} = \\frac{\\sqrt{2}}{2}$, the exact value of $\\cos\\left(\\frac{\\pi}{4}\\right)$.",
        ),
        L(
          "En $[0, 2\\pi)$ las soluciones son $\\frac{\\pi}{4}$ y $\\frac{7\\pi}{4}$.",
          "On $[0, 2\\pi)$ the solutions are $\\frac{\\pi}{4}$ and $\\frac{7\\pi}{4}$.",
        ),
        L(
          "En $[0, 4\\pi)$ cada solución se repite sumando $2\\pi$: son cuatro en total. Suma $\\frac{\\pi}{4} + \\frac{7\\pi}{4} + \\frac{9\\pi}{4} + \\frac{15\\pi}{4}$.",
          "On $[0, 4\\pi)$ each solution repeats by adding $2\\pi$: four in total. Add up $\\frac{\\pi}{4} + \\frac{7\\pi}{4} + \\frac{9\\pi}{4} + \\frac{15\\pi}{4}$.",
        ),
      ],
      answerDisplay: L(
        `$x \\in \\left\\{\\frac{\\pi}{4}, \\frac{7\\pi}{4}, \\frac{9\\pi}{4}, \\frac{15\\pi}{4}\\right\\}$, suma $= 8\\pi$`,
        `$x \\in \\left\\{\\frac{\\pi}{4}, \\frac{7\\pi}{4}, \\frac{9\\pi}{4}, \\frac{15\\pi}{4}\\right\\}$, sum $= 8\\pi$`,
      ),
      solution: [
        step(
          "given",
          "$1 - \\sqrt{2}\\,\\cos x = 0$, con $x \\in [0, 4\\pi)$.",
          "$1 - \\sqrt{2}\\,\\cos x = 0$, with $x \\in [0, 4\\pi)$.",
        ),
        step(
          "approach",
          "Despejar el coseno y ubicar el valor exacto en la circunferencia unitaria; el intervalo abarca dos vueltas completas, así que cada familia aparece dos veces.",
          "Isolate the cosine and locate the exact value on the unit circle; the interval spans two full turns, so each family appears twice.",
        ),
        step(
          "calculation",
          `$\\cos x = \\frac{1}{\\sqrt{2}} = \\frac{\\sqrt{2}}{2}$<br>Primera vuelta: $x = \\frac{\\pi}{4},\\ \\frac{7\\pi}{4}$<br>Segunda vuelta ($+2\\pi$): $x = \\frac{9\\pi}{4},\\ \\frac{15\\pi}{4}$<br>Suma $= \\frac{\\pi + 7\\pi + 9\\pi + 15\\pi}{4} = \\frac{32\\pi}{4} = 8\\pi$`,
          `$\\cos x = \\frac{1}{\\sqrt{2}} = \\frac{\\sqrt{2}}{2}$<br>First turn: $x = \\frac{\\pi}{4},\\ \\frac{7\\pi}{4}$<br>Second turn ($+2\\pi$): $x = \\frac{9\\pi}{4},\\ \\frac{15\\pi}{4}$<br>Sum $= \\frac{\\pi + 7\\pi + 9\\pi + 15\\pi}{4} = \\frac{32\\pi}{4} = 8\\pi$`,
        ),
        step(
          "result",
          `Cuatro soluciones en $[0, 4\\pi)$ y su suma es $8\\pi$. Comprobación rápida: las soluciones son simétricas respecto a $2\\pi$, así que la suma es $2 \\cdot 4\\pi = 8\\pi$.`,
          `Four solutions on $[0, 4\\pi)$ and their sum is $8\\pi$. Quick check: the solutions are symmetric about $2\\pi$, so the sum is $2 \\cdot 4\\pi = 8\\pi$.`,
        ),
      ],
    }),
  ),

  /* 5.6 · 53j — 2cos²x = 1 − sen x on [0, 2π]; sum = 7π/2 */
  template(
    {
      id: "trigeq-espol-53j",
      subject: "math",
      topicId: "trig-equations",
      subtopicId: "intervals",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 360,
      tags: ["intervals", "pythagorean", "factoring", "radians", "sum-of-solutions"],
      prerequisites: ["trig-functions"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5.6 · 53j",
        page: 669,
      },
      reasoning: "multi-concept",
    },
    () => ({
      skill: L("Cuadrática escondida en el seno", "A quadratic hidden inside the sine"),
      statement: L(
        `Resuelve $2\\cos^2 x = 1 - \\sin x$ en $x \\in [0, 2\\pi]$ y escribe la **suma de todas las soluciones** en radianes (puedes teclear p. ej. \`7pi/2\` o su valor decimal).`,
        `Solve $2\\cos^2 x = 1 - \\sin x$ on $x \\in [0, 2\\pi]$ and enter the **sum of all solutions** in radians (you may type e.g. \`7pi/2\` or its decimal value).`,
      ),
      answer: {
        kind: "numeric",
        value: (7 * Math.PI) / 2,
        tolerance: { mode: "absolute", value: 0.01 },
      },
      hints: [
        L(
          "Sustituye $\\cos^2 x = 1 - \\sin^2 x$ para dejar todo en función de $\\sin x$.",
          "Substitute $\\cos^2 x = 1 - \\sin^2 x$ to write everything in terms of $\\sin x$.",
        ),
        L(
          "Obtendrás $2\\sin^2 x - \\sin x - 1 = 0$, una cuadrática en $\\sin x$ que se factoriza.",
          "You will get $2\\sin^2 x - \\sin x - 1 = 0$, a quadratic in $\\sin x$ that factors.",
        ),
        L(
          "$(2\\sin x + 1)(\\sin x - 1) = 0$ da $\\sin x = -\\frac{1}{2}$ (dos ángulos) o $\\sin x = 1$ (un ángulo).",
          "$(2\\sin x + 1)(\\sin x - 1) = 0$ gives $\\sin x = -\\frac{1}{2}$ (two angles) or $\\sin x = 1$ (one angle).",
        ),
      ],
      answerDisplay: L(
        `$x \\in \\left\\{\\frac{\\pi}{2}, \\frac{7\\pi}{6}, \\frac{11\\pi}{6}\\right\\}$, suma $= \\frac{7\\pi}{2}$`,
        `$x \\in \\left\\{\\frac{\\pi}{2}, \\frac{7\\pi}{6}, \\frac{11\\pi}{6}\\right\\}$, sum $= \\frac{7\\pi}{2}$`,
      ),
      solution: [
        step(
          "given",
          "$2\\cos^2 x = 1 - \\sin x$, con $x \\in [0, 2\\pi]$.",
          "$2\\cos^2 x = 1 - \\sin x$, with $x \\in [0, 2\\pi]$.",
        ),
        step(
          "approach",
          "Unificar funciones con la identidad pitagórica: la ecuación se convierte en una cuadrática factorizable en $\\sin x$.",
          "Unify functions with the Pythagorean identity: the equation becomes a factorable quadratic in $\\sin x$.",
        ),
        step(
          "calculation",
          `$2(1 - \\sin^2 x) = 1 - \\sin x$<br>$2 - 2\\sin^2 x - 1 + \\sin x = 0$<br>$2\\sin^2 x - \\sin x - 1 = 0$<br>$(2\\sin x + 1)(\\sin x - 1) = 0$<br>$\\sin x = -\\frac{1}{2} \\Rightarrow x = \\frac{7\\pi}{6}, \\frac{11\\pi}{6}$; $\\sin x = 1 \\Rightarrow x = \\frac{\\pi}{2}$`,
          `$2(1 - \\sin^2 x) = 1 - \\sin x$<br>$2 - 2\\sin^2 x - 1 + \\sin x = 0$<br>$2\\sin^2 x - \\sin x - 1 = 0$<br>$(2\\sin x + 1)(\\sin x - 1) = 0$<br>$\\sin x = -\\frac{1}{2} \\Rightarrow x = \\frac{7\\pi}{6}, \\frac{11\\pi}{6}$; $\\sin x = 1 \\Rightarrow x = \\frac{\\pi}{2}$`,
        ),
        step(
          "result",
          `Tres soluciones: $\\frac{\\pi}{2} + \\frac{7\\pi}{6} + \\frac{11\\pi}{6} = \\frac{3\\pi + 7\\pi + 11\\pi}{6} = \\frac{21\\pi}{6} = \\frac{7\\pi}{2}$.`,
          `Three solutions: $\\frac{\\pi}{2} + \\frac{7\\pi}{6} + \\frac{11\\pi}{6} = \\frac{3\\pi + 7\\pi + 11\\pi}{6} = \\frac{21\\pi}{6} = \\frac{7\\pi}{2}$.`,
        ),
      ],
    }),
  ),

  /* 5.6 · 53n — 2sen²(2πt) − 3sen(2πt) + 1 = 0, t ∈ [0,1]; sum = 3/4 */
  template(
    {
      id: "trigeq-espol-53n",
      subject: "math",
      topicId: "trig-equations",
      subtopicId: "intervals",
      difficulty: "challenge",
      questionType: "numeric",
      estimatedTimeSec: 420,
      tags: ["intervals", "substitution", "factoring", "unit-interval"],
      prerequisites: ["trig-functions"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5.6 · 53n",
        page: 669,
      },
      reasoning: "multi-concept",
    },
    () => ({
      skill: L("Sustitución u = sen(2πt) en [0, 1]", "Substitution u = sin(2πt) on [0, 1]"),
      statement: L(
        `Resuelve $2\\sin^2(2\\pi t) - 3\\sin(2\\pi t) + 1 = 0$ en $t \\in [0, 1]$ y escribe la **suma de todas las soluciones** (fracción exacta o decimal).`,
        `Solve $2\\sin^2(2\\pi t) - 3\\sin(2\\pi t) + 1 = 0$ on $t \\in [0, 1]$ and enter the **sum of all solutions** (exact fraction or decimal).`,
      ),
      answer: {
        kind: "numeric",
        value: 0.75,
        tolerance: { mode: "absolute", value: 0.005 },
      },
      hints: [
        L(
          "Llama $u = \\sin(2\\pi t)$: la ecuación queda $2u^2 - 3u + 1 = 0$.",
          "Let $u = \\sin(2\\pi t)$: the equation becomes $2u^2 - 3u + 1 = 0$.",
        ),
        L(
          "Factoriza: $(2u - 1)(u - 1) = 0$, así que $u = \\frac{1}{2}$ o $u = 1$.",
          "Factor: $(2u - 1)(u - 1) = 0$, so $u = \\frac{1}{2}$ or $u = 1$.",
        ),
        L(
          "Con $2\\pi t \\in [0, 2\\pi]$: $\\sin = \\frac{1}{2}$ en $\\frac{\\pi}{6}$ y $\\frac{5\\pi}{6}$; $\\sin = 1$ en $\\frac{\\pi}{2}$. Convierte cada ángulo a $t = \\frac{\\text{ángulo}}{2\\pi}$.",
          "With $2\\pi t \\in [0, 2\\pi]$: $\\sin = \\frac{1}{2}$ at $\\frac{\\pi}{6}$ and $\\frac{5\\pi}{6}$; $\\sin = 1$ at $\\frac{\\pi}{2}$. Convert each angle to $t = \\frac{\\text{angle}}{2\\pi}$.",
        ),
      ],
      answerDisplay: L(
        `$t \\in \\left\\{\\frac{1}{12}, \\frac{1}{4}, \\frac{5}{12}\\right\\}$, suma $= \\frac{3}{4}$`,
        `$t \\in \\left\\{\\frac{1}{12}, \\frac{1}{4}, \\frac{5}{12}\\right\\}$, sum $= \\frac{3}{4}$`,
      ),
      solution: [
        step(
          "given",
          "$2\\sin^2(2\\pi t) - 3\\sin(2\\pi t) + 1 = 0$, con $t \\in [0, 1]$.",
          "$2\\sin^2(2\\pi t) - 3\\sin(2\\pi t) + 1 = 0$, with $t \\in [0, 1]$.",
        ),
        step(
          "approach",
          "La estructura es una cuadrática disfrazada: sustituir $u = \\sin(2\\pi t)$ la colapsa, y como $t \\in [0,1]$ el argumento $2\\pi t$ da exactamente una vuelta.",
          "The structure is a quadratic in disguise: substituting $u = \\sin(2\\pi t)$ collapses it, and since $t \\in [0,1]$ the argument $2\\pi t$ covers exactly one turn.",
        ),
        step(
          "calculation",
          `$u = \\sin(2\\pi t):\\ 2u^2 - 3u + 1 = 0 \\Rightarrow (2u-1)(u-1) = 0$<br>$u = \\frac{1}{2}:\\ 2\\pi t = \\frac{\\pi}{6}, \\frac{5\\pi}{6} \\Rightarrow t = \\frac{1}{12}, \\frac{5}{12}$<br>$u = 1:\\ 2\\pi t = \\frac{\\pi}{2} \\Rightarrow t = \\frac{1}{4}$`,
          `$u = \\sin(2\\pi t):\\ 2u^2 - 3u + 1 = 0 \\Rightarrow (2u-1)(u-1) = 0$<br>$u = \\frac{1}{2}:\\ 2\\pi t = \\frac{\\pi}{6}, \\frac{5\\pi}{6} \\Rightarrow t = \\frac{1}{12}, \\frac{5}{12}$<br>$u = 1:\\ 2\\pi t = \\frac{\\pi}{2} \\Rightarrow t = \\frac{1}{4}$`,
        ),
        step(
          "result",
          `Las soluciones son $t \\in \\left\\{\\frac{1}{12}, \\frac{1}{4}, \\frac{5}{12}\\right\\}$ y su suma es $\\frac{1}{12} + \\frac{3}{12} + \\frac{5}{12} = \\frac{9}{12} = \\frac{3}{4}$. (Observa el patrón: los dos ángulos de $\\sin = \\frac{1}{2}$ suman $\\pi$, es decir $t$ suma $\\frac{1}{2}$.)`,
          `The solutions are $t \\in \\left\\{\\frac{1}{12}, \\frac{1}{4}, \\frac{5}{12}\\right\\}$ and their sum is $\\frac{1}{12} + \\frac{3}{12} + \\frac{5}{12} = \\frac{9}{12} = \\frac{3}{4}$. (Note the pattern: the two angles with $\\sin = \\frac{1}{2}$ add up to $\\pi$, i.e. their $t$ values add to $\\frac{1}{2}$.)`,
        ),
      ],
    }),
  ),

  /* 5.6 · 54f — 2·cos(2x/3) < 1 on [0, 2π] → (π/2, 2π] */
  template(
    {
      id: "trigeq-espol-54f",
      subject: "math",
      topicId: "trig-equations",
      subtopicId: "intervals",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 360,
      tags: ["inequality", "scaled-argument", "intervals"],
      prerequisites: ["trig-functions"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5.6 · 54f",
        page: 669,
      },
      reasoning: "case-analysis",
    },
    () => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\left(\\frac{\\pi}{2},\\ 2\\pi\\right]$`, `$\\left(\\frac{\\pi}{2},\\ 2\\pi\\right]$`), correct: true },
        { id: "b", text: L(`$\\left(\\frac{\\pi}{2},\\ \\frac{5\\pi}{2}\\right)$`, `$\\left(\\frac{\\pi}{2},\\ \\frac{5\\pi}{2}\\right)$`), correct: false },
        { id: "c", text: L(`$\\left[\\frac{\\pi}{2},\\ 2\\pi\\right]$`, `$\\left[\\frac{\\pi}{2},\\ 2\\pi\\right]$`), correct: false },
        { id: "d", text: L(`$\\left(\\frac{\\pi}{3},\\ 2\\pi\\right]$`, `$\\left(\\frac{\\pi}{3},\\ 2\\pi\\right]$`), correct: false },
      ];
      return {
        skill: L("Inecuación con argumento escalado", "Inequality with a scaled argument"),
        statement: L(
          `Determina el conjunto de verdad de $p(x):\\ 2\\cos\\left(\\frac{2x}{3}\\right) < 1$ en $x \\in [0, 2\\pi]$.`,
          `Determine the truth set of $p(x):\\ 2\\cos\\left(\\frac{2x}{3}\\right) < 1$ on $x \\in [0, 2\\pi]$.`,
        ),
        answer: { kind: "multiple-choice", options },
        hints: [
          L(
            "La inecuación es $\\cos\\left(\\frac{2x}{3}\\right) < \\frac{1}{2}$; llama $u = \\frac{2x}{3}$ y determina el rango de $u$.",
            "The inequality is $\\cos\\left(\\frac{2x}{3}\\right) < \\frac{1}{2}$; let $u = \\frac{2x}{3}$ and find the range of $u$.",
          ),
          L(
            "Con $x \\in [0, 2\\pi]$ resulta $u \\in \\left[0, \\frac{4\\pi}{3}\\right]$: ¡ni siquiera una vuelta completa!",
            "With $x \\in [0, 2\\pi]$ you get $u \\in \\left[0, \\frac{4\\pi}{3}\\right]$: not even a full turn!",
          ),
          L(
            "En ese rango, $\\cos u < \\frac{1}{2}$ solo para $u \\in \\left(\\frac{\\pi}{3}, \\frac{4\\pi}{3}\\right]$; multiplica por $\\frac{3}{2}$.",
            "In that range, $\\cos u < \\frac{1}{2}$ only for $u \\in \\left(\\frac{\\pi}{3}, \\frac{4\\pi}{3}\\right]$; multiply by $\\frac{3}{2}$.",
          ),
        ],
        answerDisplay: L(
          `$A_{p(x)} = \\left(\\frac{\\pi}{2},\\ 2\\pi\\right]$`,
          `$A_{p(x)} = \\left(\\frac{\\pi}{2},\\ 2\\pi\\right]$`,
        ),
        solution: [
          step(
            "given",
            "$2\\cos\\left(\\frac{2x}{3}\\right) < 1$, con $x \\in [0, 2\\pi]$.",
            "$2\\cos\\left(\\frac{2x}{3}\\right) < 1$, with $x \\in [0, 2\\pi]$.",
          ),
          step(
            "approach",
            "Cambiar de variable para leer la desigualdad en la circunferencia unitaria; el punto clave es que el argumento escalado NO completa una vuelta sobre el dominino pedido.",
            "Change variables to read the inequality on the unit circle; the key point is that the scaled argument does NOT complete a full turn over the given domain.",
          ),
          step(
            "calculation",
            `$\\cos u < \\frac{1}{2}$ con $u = \\frac{2x}{3} \\in \\left[0, \\frac{4\\pi}{3}\\right]$<br>En una vuelta $\\cos u < \\frac{1}{2}$ para $u \\in \\left(\\frac{\\pi}{3}, \\frac{5\\pi}{3}\\right)$<br>Intersección: $u \\in \\left(\\frac{\\pi}{3}, \\frac{4\\pi}{3}\\right] \\Rightarrow x = \\frac{3u}{2} \\in \\left(\\frac{\\pi}{2}, 2\\pi\\right]$`,
            `$\\cos u < \\frac{1}{2}$ with $u = \\frac{2x}{3} \\in \\left[0, \\frac{4\\pi}{3}\\right]$<br>In one turn $\\cos u < \\frac{1}{2}$ for $u \\in \\left(\\frac{\\pi}{3}, \\frac{5\\pi}{3}\\right)$<br>Intersection: $u \\in \\left(\\frac{\\pi}{3}, \\frac{4\\pi}{3}\\right] \\Rightarrow x = \\frac{3u}{2} \\in \\left(\\frac{\\pi}{2}, 2\\pi\\right]$`,
          ),
          step(
            "result",
            `El conjunto de verdad es $\\left(\\frac{\\pi}{2}, 2\\pi\\right]$: abierto en $\\frac{\\pi}{2}$ (desigualdad estricta) y cerrado en $2\\pi$ por el extremo del dominio. Comprobación con $x = \\pi$: $2\\cos\\frac{2\\pi}{3} = -1 < 1$ ✓; con $x = 0$: $2 > 1$ ✗.`,
            `The truth set is $\\left(\\frac{\\pi}{2}, 2\\pi\\right]$: open at $\\frac{\\pi}{2}$ (strict inequality) and closed at $2\\pi$ by the domain endpoint. Check with $x = \\pi$: $2\\cos\\frac{2\\pi}{3} = -1 < 1$ ✓; with $x = 0$: $2 > 1$ ✗.`,
          ),
        ],
      };
    },
  ),

  /* 5.6 · 54h — sgn(sen(|2α|)) = 0 on [0, 2π] → {0, π/2, π, 3π/2, 2π} */
  template(
    {
      id: "trigeq-espol-54h",
      subject: "math",
      topicId: "trig-equations",
      subtopicId: "intervals",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["equation", "sgn", "absolute-value", "intervals"],
      prerequisites: ["trig-functions"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5.6 · 54h",
        page: 669,
      },
      reasoning: "definition-hunting",
    },
    () => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\left\\{0, \\frac{\\pi}{2}, \\pi, \\frac{3\\pi}{2}, 2\\pi\\right\\}$`, `$\\left\\{0, \\frac{\\pi}{2}, \\pi, \\frac{3\\pi}{2}, 2\\pi\\right\\}$`), correct: true },
        { id: "b", text: L(`$\\left\\{0, \\pi, 2\\pi\\right\\}$`, `$\\left\\{0, \\pi, 2\\pi\\right\\}$`), correct: false },
        { id: "c", text: L(`$\\left\\{\\frac{\\pi}{2}, \\frac{3\\pi}{2}\\right\\}$`, `$\\left\\{\\frac{\\pi}{2}, \\frac{3\\pi}{2}\\right\\}$`), correct: false },
        { id: "d", text: L(`$\\varnothing$`, `$\\varnothing$`), correct: false },
      ];
      return {
        skill: L("sgn vale cero exactamente en los ceros", "sgn is zero exactly at zeros"),
        statement: L(
          `Determina el conjunto de verdad de $p(\\alpha):\\ \\operatorname{sgn}\\bigl(\\sin\\left|2\\alpha\\right|\\bigr) = 0$ en $\\alpha \\in [0, 2\\pi]$.`,
          `Determine the truth set of $p(\\alpha):\\ \\operatorname{sgn}\\bigl(\\sin\\left|2\\alpha\\right|\\bigr) = 0$ on $\\alpha \\in [0, 2\\pi]$.`,
        ),
        answer: { kind: "multiple-choice", options },
        hints: [
          L(
            "$\\operatorname{sgn}(u) = 0$ exactamente cuando $u = 0$: necesitas $\\sin\\left|2\\alpha\\right| = 0$.",
            "$\\operatorname{sgn}(u) = 0$ exactly when $u = 0$: you need $\\sin\\left|2\\alpha\\right| = 0$.",
          ),
          L(
            "Como $\\alpha \\ge 0$, el valor absoluto sobra: $\\left|2\\alpha\\right| = 2\\alpha$.",
            "Since $\\alpha \\ge 0$, the absolute value is redundant: $\\left|2\\alpha\\right| = 2\\alpha$.",
          ),
          L(
            "Resuelve $\\sin(2\\alpha) = 0$ con $2\\alpha \\in [0, 4\\pi]$: son los múltiplos de $\\pi$.",
            "Solve $\\sin(2\\alpha) = 0$ with $2\\alpha \\in [0, 4\\pi]$: the multiples of $\\pi$.",
          ),
        ],
        answerDisplay: L(
          `$A_{p(\\alpha)} = \\left\\{0, \\frac{\\pi}{2}, \\pi, \\frac{3\\pi}{2}, 2\\pi\\right\\}$`,
          `$A_{p(\\alpha)} = \\left\\{0, \\frac{\\pi}{2}, \\pi, \\frac{3\\pi}{2}, 2\\pi\\right\\}$`,
        ),
        solution: [
          step(
            "given",
            "$\\operatorname{sgn}\\bigl(\\sin\\left|2\\alpha\\right|\\bigr) = 0$, con $\\alpha \\in [0, 2\\pi]$.",
            "$\\operatorname{sgn}\\bigl(\\sin\\left|2\\alpha\\right|\\bigr) = 0$, with $\\alpha \\in [0, 2\\pi]$.",
          ),
          step(
            "approach",
            "Aplicar la definición del signo primero (vale $0$ solo en el cero del argumento) y desechar el valor absoluto, que es inofensivo en el semiplano $\\alpha \\ge 0$.",
            "Apply the definition of sign first (it equals $0$ only at the argument's zero) and drop the absolute value, which is harmless for $\\alpha \\ge 0$.",
          ),
          step(
            "calculation",
            `$\\operatorname{sgn}(u) = 0 \\Leftrightarrow u = 0 \\Rightarrow \\sin\\left|2\\alpha\\right| = 0$<br>$\\alpha \\ge 0 \\Rightarrow \\left|2\\alpha\\right| = 2\\alpha$<br>$\\sin(2\\alpha) = 0 \\Rightarrow 2\\alpha = k\\pi,\\ k = 0, 1, \\dots, 4$<br>$\\alpha = 0, \\frac{\\pi}{2}, \\pi, \\frac{3\\pi}{2}, 2\\pi$`,
            `$\\operatorname{sgn}(u) = 0 \\Leftrightarrow u = 0 \\Rightarrow \\sin\\left|2\\alpha\\right| = 0$<br>$\\alpha \\ge 0 \\Rightarrow \\left|2\\alpha\\right| = 2\\alpha$<br>$\\sin(2\\alpha) = 0 \\Rightarrow 2\\alpha = k\\pi,\\ k = 0, 1, \\dots, 4$<br>$\\alpha = 0, \\frac{\\pi}{2}, \\pi, \\frac{3\\pi}{2}, 2\\pi$`,
          ),
          step(
            "result",
            `Cinco soluciones: todos los múltiplos de $\\frac{\\pi}{2}$ en $[0, 2\\pi]$. La trampa era creer que el valor absoluto cambia la familia de soluciones: con $\\alpha \\ge 0$ no altera nada.`,
            `Five solutions: every multiple of $\\frac{\\pi}{2}$ on $[0, 2\\pi]$. The trap was believing the absolute value changes the solution family: for $\\alpha \\ge 0$ it changes nothing.`,
          ),
        ],
      };
    },
  ),

  /* 5.6 · 54i — sgn(sen(x/2)) ≥ 1 on [−π, π] → (0, π] */
  template(
    {
      id: "trigeq-espol-54i",
      subject: "math",
      topicId: "trig-equations",
      subtopicId: "intervals",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["inequality", "sgn", "intervals"],
      prerequisites: ["trig-functions"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5.6 · 54i",
        page: 669,
      },
      reasoning: "definition-hunting",
    },
    () => {
      const options: McOption[] = [
        { id: "a", text: L(`$(0,\\ \\pi]$`, `$(0,\\ \\pi]$`), correct: true },
        { id: "b", text: L(`$[0,\\ \\pi]$`, `$[0,\\ \\pi]$`), correct: false },
        { id: "c", text: L(`$(0,\\ 2\\pi)$`, `$(0,\\ 2\\pi)$`), correct: false },
        { id: "d", text: L(`$[-\\pi,\\ \\pi]$`, `$[-\\pi,\\ \\pi]$`), correct: false },
      ];
      return {
        skill: L("sgn solo entrega −1, 0 o 1", "sgn only outputs −1, 0 or 1"),
        statement: L(
          `Determina el conjunto de verdad de $p(x):\\ \\operatorname{sgn}\\left(\\sin\\left(\\frac{x}{2}\\right)\\right) \\geq 1$ en $x \\in [-\\pi, \\pi]$.`,
          `Determine the truth set of $p(x):\\ \\operatorname{sgn}\\left(\\sin\\left(\\frac{x}{2}\\right)\\right) \\geq 1$ on $x \\in [-\\pi, \\pi]$.`,
        ),
        answer: { kind: "multiple-choice", options },
        hints: [
          L(
            "¿Qué valores toma $\\operatorname{sgn}$? Solo $\\{-1, 0, 1\\}$. ¿Cuáles de ellos cumplen $\\geq 1$?",
            "Which values does $\\operatorname{sgn}$ take? Only $\\{-1, 0, 1\\}$. Which of them satisfy $\\geq 1$?",
          ),
          L(
            "Solo $1$: es decir, necesitas $\\sin\\left(\\frac{x}{2}\\right) > 0$ estrictamente.",
            "Only $1$: that is, you need $\\sin\\left(\\frac{x}{2}\\right) > 0$ strictly.",
          ),
          L(
            "Con $\\frac{x}{2} \\in \\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]$, el seno es positivo solo en $\\left(0, \\frac{\\pi}{2}\\right]$.",
            "With $\\frac{x}{2} \\in \\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]$, the sine is positive only on $\\left(0, \\frac{\\pi}{2}\\right]$.",
          ),
        ],
        answerDisplay: L(
          `$A_{p(x)} = (0,\\ \\pi]$`,
          `$A_{p(x)} = (0,\\ \\pi]$`,
        ),
        solution: [
          step(
            "given",
            "$\\operatorname{sgn}\\left(\\sin\\left(\\frac{x}{2}\\right)\\right) \\geq 1$, con $x \\in [-\\pi, \\pi]$.",
            "$\\operatorname{sgn}\\left(\\sin\\left(\\frac{x}{2}\\right)\\right) \\geq 1$, with $x \\in [-\\pi, \\pi]$.",
          ),
          step(
            "approach",
            "Primero el rango de la función signo: como solo entrega $-1$, $0$ o $1$, la desigualdad $\\geq 1$ se convierte en la igualdad con $1$, que ocurre exactamente cuando el argumento es positivo.",
            "First the range of the sign function: since it only outputs $-1$, $0$ or $1$, the inequality $\\geq 1$ becomes equality with $1$, which happens exactly when the argument is positive.",
          ),
          step(
            "calculation",
            `$\\operatorname{sgn}(u) \\in \\{-1, 0, 1\\} \\Rightarrow \\operatorname{sgn}(u) \\geq 1 \\Leftrightarrow \\operatorname{sgn}(u) = 1 \\Leftrightarrow u > 0$<br>$\\sin\\left(\\frac{x}{2}\\right) > 0$ con $\\frac{x}{2} \\in \\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]$<br>$\\frac{x}{2} \\in \\left(0, \\frac{\\pi}{2}\\right] \\Rightarrow x \\in (0, \\pi]$`,
            `$\\operatorname{sgn}(u) \\in \\{-1, 0, 1\\} \\Rightarrow \\operatorname{sgn}(u) \\geq 1 \\Leftrightarrow \\operatorname{sgn}(u) = 1 \\Leftrightarrow u > 0$<br>$\\sin\\left(\\frac{x}{2}\\right) > 0$ with $\\frac{x}{2} \\in \\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]$<br>$\\frac{x}{2} \\in \\left(0, \\frac{\\pi}{2}\\right] \\Rightarrow x \\in (0, \\pi]$`,
          ),
          step(
            "result",
            `El conjunto de verdad es $(0, \\pi]$: $0$ queda fuera porque $\\operatorname{sgn}(0) = 0 < 1$, y todo $x < 0$ da seno negativo. Comprobación con $x = \\pi$: $\\operatorname{sgn}(1) = 1 \\geq 1$ ✓.`,
            `The truth set is $(0, \\pi]$: $0$ is excluded because $\\operatorname{sgn}(0) = 0 < 1$, and every $x < 0$ gives a negative sine. Check with $x = \\pi$: $\\operatorname{sgn}(1) = 1 \\geq 1$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 5.6 · 54j — µ(√3 − 2·cos x) = 0 on [0, 2π] → [0, π/6] ∪ [11π/6, 2π] */
  template(
    {
      id: "trigeq-espol-54j",
      subject: "math",
      topicId: "trig-equations",
      subtopicId: "intervals",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 420,
      tags: ["equation", "unit-step", "intervals"],
      prerequisites: ["trig-functions"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5.6 · 54j",
        page: 669,
      },
      reasoning: "definition-hunting",
    },
    () => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\left[0, \\frac{\\pi}{6}\\right]\\cup\\left[\\frac{11\\pi}{6}, 2\\pi\\right]$`, `$\\left[0, \\frac{\\pi}{6}\\right]\\cup\\left[\\frac{11\\pi}{6}, 2\\pi\\right]$`), correct: true },
        { id: "b", text: L(`$\\left(0, \\frac{\\pi}{6}\\right)\\cup\\left(\\frac{11\\pi}{6}, 2\\pi\\right)$`, `$\\left(0, \\frac{\\pi}{6}\\right)\\cup\\left(\\frac{11\\pi}{6}, 2\\pi\\right)$`), correct: false },
        { id: "c", text: L(`$\\left[\\frac{\\pi}{6}, \\frac{11\\pi}{6}\\right]$`, `$\\left[\\frac{\\pi}{6}, \\frac{11\\pi}{6}\\right]$`), correct: false },
        { id: "d", text: L(`$\\left[\\frac{\\pi}{3}, \\frac{5\\pi}{3}\\right]$`, `$\\left[\\frac{\\pi}{3}, \\frac{5\\pi}{3}\\right]$`), correct: false },
      ];
      return {
        skill: L("El escalón µ se anula con argumento ≤ 0", "The step µ vanishes for argument ≤ 0"),
        statement: L(
          `Sea $\\mu$ la función escalón unitario: $\\mu(t) = 1$ si $t > 0$ y $\\mu(t) = 0$ si $t \\le 0$. Determina el conjunto de verdad de $p(x):\\ \\mu\\bigl(\\sqrt{3} - 2\\cos x\\bigr) = 0$ en $x \\in [0, 2\\pi]$.`,
          `Let $\\mu$ be the unit step function: $\\mu(t) = 1$ if $t > 0$ and $\\mu(t) = 0$ if $t \\le 0$. Determine the truth set of $p(x):\\ \\mu\\bigl(\\sqrt{3} - 2\\cos x\\bigr) = 0$ on $x \\in [0, 2\\pi]$.`,
        ),
        answer: { kind: "multiple-choice", options },
        hints: [
          L(
            "$\\mu(t) = 0$ exactamente cuando $t \\le 0$ (¡incluyendo el cero!).",
            "$\\mu(t) = 0$ exactly when $t \\le 0$ (including zero!).",
          ),
          L(
            "Necesitas $\\sqrt{3} - 2\\cos x \\le 0$, es decir $\\cos x \\geq \\frac{\\sqrt{3}}{2}$.",
            "You need $\\sqrt{3} - 2\\cos x \\le 0$, i.e. $\\cos x \\geq \\frac{\\sqrt{3}}{2}$.",
          ),
          L(
            "$\\cos x \\geq \\frac{\\sqrt{3}}{2}$ en $\\left[0, \\frac{\\pi}{6}\\right]\\cup\\left[\\frac{11\\pi}{6}, 2\\pi\\right]$; revisa que los extremos entran (desigualdad no estricta).",
            "$\\cos x \\geq \\frac{\\sqrt{3}}{2}$ on $\\left[0, \\frac{\\pi}{6}\\right]\\cup\\left[\\frac{11\\pi}{6}, 2\\pi\\right]$; check the endpoints enter (non-strict inequality).",
          ),
        ],
        answerDisplay: L(
          `$A_{p(x)} = \\left[0, \\frac{\\pi}{6}\\right]\\cup\\left[\\frac{11\\pi}{6}, 2\\pi\\right]$`,
          `$A_{p(x)} = \\left[0, \\frac{\\pi}{6}\\right]\\cup\\left[\\frac{11\\pi}{6}, 2\\pi\\right]$`,
        ),
        solution: [
          step(
            "given",
            "$\\mu\\bigl(\\sqrt{3} - 2\\cos x\\bigr) = 0$, con $x \\in [0, 2\\pi]$ y $\\mu(t) = 0$ si $t \\le 0$.",
            "$\\mu\\bigl(\\sqrt{3} - 2\\cos x\\bigr) = 0$, with $x \\in [0, 2\\pi]$ and $\\mu(t) = 0$ if $t \\le 0$.",
          ),
          step(
            "approach",
            "Traducir la condición sobre el escalón a una condición sobre su argumento; el detalle fino es que el $0$ del argumento SÍ pertenece al conjunto ($\\mu(0) = 0$).",
            "Translate the condition on the step into a condition on its argument; the subtle point is that an argument of $0$ DOES belong ($\\mu(0) = 0$).",
          ),
          step(
            "calculation",
            `$\\mu(t) = 0 \\Leftrightarrow t \\le 0 \\Rightarrow \\sqrt{3} - 2\\cos x \\le 0$<br>$\\cos x \\geq \\frac{\\sqrt{3}}{2}$<br>En $[0, 2\\pi]$: $x \\in \\left[0, \\frac{\\pi}{6}\\right]\\cup\\left[\\frac{11\\pi}{6}, 2\\pi\\right]$`,
            `$\\mu(t) = 0 \\Leftrightarrow t \\le 0 \\Rightarrow \\sqrt{3} - 2\\cos x \\le 0$<br>$\\cos x \\geq \\frac{\\sqrt{3}}{2}$<br>On $[0, 2\\pi]$: $x \\in \\left[0, \\frac{\\pi}{6}\\right]\\cup\\left[\\frac{11\\pi}{6}, 2\\pi\\right]$`,
          ),
          step(
            "result",
            `El conjunto de verdad es $\\left[0, \\frac{\\pi}{6}\\right]\\cup\\left[\\frac{11\\pi}{6}, 2\\pi\\right]$, cerrado: en $x = \\frac{\\pi}{6}$ el argumento vale $0$ y $\\mu(0) = 0$ ✓. Comprobación con $x = 0$: $\\mu(\\sqrt{3} - 2) = \\mu(-0{.}27) = 0$ ✓.`,
            `The truth set is $\\left[0, \\frac{\\pi}{6}\\right]\\cup\\left[\\frac{11\\pi}{6}, 2\\pi\\right]$, closed: at $x = \\frac{\\pi}{6}$ the argument equals $0$ and $\\mu(0) = 0$ ✓. Check with $x = 0$: $\\mu(\\sqrt{3} - 2) = \\mu(-0{.}27) = 0$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 5.6 · 55 — implication p→q false exactly on (0, π/2), Re = (0, 3π/2] */
  template(
    {
      id: "trigeq-espol-55",
      subject: "math",
      topicId: "trig-equations",
      subtopicId: "intervals",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 480,
      tags: ["implication", "logic", "inequality", "intervals"],
      prerequisites: ["trig-functions"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5.6 · 55",
        page: 669,
      },
      reasoning: "multi-concept",
    },
    () => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\left(0, \\frac{\\pi}{2}\\right)$`, `$\\left(0, \\frac{\\pi}{2}\\right)$`), correct: true },
        { id: "b", text: L(`$\\left(\\frac{\\pi}{2}, \\pi\\right)$`, `$\\left(\\frac{\\pi}{2}, \\pi\\right)$`), correct: false },
        { id: "c", text: L(`$\\left(\\pi, \\frac{3\\pi}{2}\\right]$`, `$\\left(\\pi, \\frac{3\\pi}{2}\\right]$`), correct: false },
        { id: "d", text: L(`$\\left[\\frac{\\pi}{2}, \\frac{3\\pi}{2}\\right]$`, `$\\left[\\frac{\\pi}{2}, \\frac{3\\pi}{2}\\right]$`), correct: false },
      ];
      return {
        skill: L("La implicación falla donde p vale y q no", "The implication fails where p holds and q does not"),
        statement: L(
          `Sea $Re = \\left(0, \\frac{3\\pi}{2}\\right]$ y los predicados $p(x):\\ \\sin(2x) > 0$, $q(x):\\ \\cos x < 0$. ¿En qué subconjunto de $Re$ es **FALSA** la implicación $p(x) \\rightarrow q(x)$?`,
          `Let $Re = \\left(0, \\frac{3\\pi}{2}\\right]$ and the predicates $p(x):\\ \\sin(2x) > 0$, $q(x):\\ \\cos x < 0$. On which subset of $Re$ is the implication $p(x) \\rightarrow q(x)$ **FALSE**?`,
        ),
        answer: { kind: "multiple-choice", options },
        hints: [
          L(
            "Una implicación $p \\rightarrow q$ solo es falsa cuando $p$ es verdadera Y $q$ es falsa a la vez.",
            "An implication $p \\rightarrow q$ is false only when $p$ is true AND $q$ is false at the same time.",
          ),
          L(
            "Resuelve por separado: $\\sin(2x) > 0$ da $x \\in \\left(0, \\frac{\\pi}{2}\\right) \\cup \\left(\\pi, \\frac{3\\pi}{2}\\right]$; $\\cos x \\geq 0$ da $x \\in \\left(0, \\frac{\\pi}{2}\\right]$.",
            "Solve separately: $\\sin(2x) > 0$ gives $x \\in \\left(0, \\frac{\\pi}{2}\\right) \\cup \\left(\\pi, \\frac{3\\pi}{2}\\right]$; $\\cos x \\geq 0$ gives $x \\in \\left(0, \\frac{\\pi}{2}\\right]$.",
          ),
          L(
            "Intersecta ambos: el único tramo donde el seno doble es positivo y el coseno no es negativo es $\\left(0, \\frac{\\pi}{2}\\right)$.",
            "Intersect both: the only stretch where the double sine is positive and the cosine is not negative is $\\left(0, \\frac{\\pi}{2}\\right)$.",
          ),
        ],
        answerDisplay: L(
          `Falsa exactamente en $\\left(0, \\frac{\\pi}{2}\\right)$; por tanto $A(p \\rightarrow q) = \\left[\\frac{\\pi}{2}, \\frac{3\\pi}{2}\\right]$.`,
          `False exactly on $\\left(0, \\frac{\\pi}{2}\\right)$; hence $A(p \\rightarrow q) = \\left[\\frac{\\pi}{2}, \\frac{3\\pi}{2}\\right]$.`,
        ),
        solution: [
          step(
            "given",
            "$p(x): \\sin(2x) > 0$ y $q(x): \\cos x < 0$, con $x \\in \\left(0, \\frac{3\\pi}{2}\\right]$.",
            "$p(x): \\sin(2x) > 0$ and $q(x): \\cos x < 0$, with $x \\in \\left(0, \\frac{3\\pi}{2}\\right]$.",
          ),
          step(
            "approach",
            "Usar el equivalente lógico $\\neg(p \\rightarrow q) \\equiv p \\wedge \\neg q$: la implicación falla únicamente donde el antecedente vive y el consecuente muere.",
            "Use the logical equivalence $\\neg(p \\rightarrow q) \\equiv p \\wedge \\neg q$: the implication fails only where the antecedent lives and the consequent dies.",
          ),
          step(
            "calculation",
            `$2x \\in (0, 3\\pi]:\\ \\sin(2x) > 0 \\Rightarrow x \\in \\left(0, \\frac{\\pi}{2}\\right) \\cup \\left(\\pi, \\frac{3\\pi}{2}\\right]$<br>$\\neg q:\\ \\cos x \\geq 0 \\Rightarrow x \\in \\left(0, \\frac{\\pi}{2}\\right]$<br>$p \\wedge \\neg q:\\ \\left(0, \\frac{\\pi}{2}\\right)$`,
            `$2x \\in (0, 3\\pi]:\\ \\sin(2x) > 0 \\Rightarrow x \\in \\left(0, \\frac{\\pi}{2}\\right) \\cup \\left(\\pi, \\frac{3\\pi}{2}\\right]$<br>$\\neg q:\\ \\cos x \\geq 0 \\Rightarrow x \\in \\left(0, \\frac{\\pi}{2}\\right]$<br>$p \\wedge \\neg q:\\ \\left(0, \\frac{\\pi}{2}\\right)$`,
          ),
          step(
            "result",
            `La implicación es falsa exactamente en $\\left(0, \\frac{\\pi}{2}\\right)$ (por ejemplo en $x = \\frac{\\pi}{4}$: $\\sin\\frac{\\pi}{2} = 1 > 0$ pero $\\cos\\frac{\\pi}{4} > 0$), y verdadera en el resto: $A(p \\rightarrow q) = \\left[\\frac{\\pi}{2}, \\frac{3\\pi}{2}\\right]$.`,
            `The implication is false exactly on $\\left(0, \\frac{\\pi}{2}\\right)$ (e.g. at $x = \\frac{\\pi}{4}$: $\\sin\\frac{\\pi}{2} = 1 > 0$ but $\\cos\\frac{\\pi}{4} > 0$), and true elsewhere: $A(p \\rightarrow q) = \\left[\\frac{\\pi}{2}, \\frac{3\\pi}{2}\\right]$.`,
          ),
        ],
      };
    },
  ),

  /* 5.6 · 56 — ⌊1−2cos(x/2)⌋ = 1 and sgn(sen 2x)=0; A(p→q) = [0,π] ∪ [4π/3, 2π] */
  template(
    {
      id: "trigeq-espol-56",
      subject: "math",
      topicId: "trig-equations",
      subtopicId: "intervals",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 540,
      tags: ["implication", "floor", "sgn", "intervals"],
      prerequisites: ["trig-functions"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5.6 · 56",
        page: 669,
      },
      reasoning: "multi-concept",
    },
    () => {
      const options: McOption[] = [
        { id: "a", text: L(`$[0,\\ \\pi]\\cup\\left[\\frac{4\\pi}{3},\\ 2\\pi\\right]$`, `$[0,\\ \\pi]\\cup\\left[\\frac{4\\pi}{3},\\ 2\\pi\\right]$`), correct: true },
        { id: "b", text: L(`$\\left(\\pi,\\ \\frac{4\\pi}{3}\\right)$`, `$\\left(\\pi,\\ \\frac{4\\pi}{3}\\right)$`), correct: false },
        { id: "c", text: L(`$[0,\\ 2\\pi]$`, `$[0,\\ 2\\pi]$`), correct: false },
        { id: "d", text: L(`$\\left\\{0, \\frac{\\pi}{2}, \\pi, \\frac{3\\pi}{2}, 2\\pi\\right\\}$`, `$\\left\\{0, \\frac{\\pi}{2}, \\pi, \\frac{3\\pi}{2}, 2\\pi\\right\\}$`), correct: false },
      ];
      return {
        skill: L("Parte entera + signo dentro de una implicación", "Floor + sign inside an implication"),
        statement: L(
          `Sea $Re = [0, 2\\pi]$, $p(x):\\ \\lfloor 1 - 2\\cos\\left(\\frac{x}{2}\\right) \\rfloor = 1$ (parte entera) y $q(x):\\ \\operatorname{sgn}(\\sin(2x)) = 0$. Determina el conjunto de verdad $A(p(x) \\rightarrow q(x))$.`,
          `Let $Re = [0, 2\\pi]$, $p(x):\\ \\lfloor 1 - 2\\cos\\left(\\frac{x}{2}\\right) \\rfloor = 1$ (floor function) and $q(x):\\ \\operatorname{sgn}(\\sin(2x)) = 0$. Determine the truth set $A(p(x) \\rightarrow q(x))$.`,
        ),
        answer: { kind: "multiple-choice", options },
        hints: [
          L(
            "Resuelve cada predicado por separado. Para $p$: $\\lfloor u \\rfloor = 1$ significa $1 \\le u < 2$.",
            "Solve each predicate separately. For $p$: $\\lfloor u \\rfloor = 1$ means $1 \\le u < 2$.",
          ),
          L(
            "$1 \\le 1 - 2\\cos\\left(\\frac{x}{2}\\right) < 2$ equivale a $-\\frac{1}{2} < \\cos\\left(\\frac{x}{2}\\right) \\le 0$, que en $[0, 2\\pi]$ da $x \\in [\\pi, \\frac{4\\pi}{3})$. Y $q$ solo vale en los múltiplos de $\\frac{\\pi}{2}$.",
            "$1 \\le 1 - 2\\cos\\left(\\frac{x}{2}\\right) < 2$ is equivalent to $-\\frac{1}{2} < \\cos\\left(\\frac{x}{2}\\right) \\le 0$, which on $[0, 2\\pi]$ gives $x \\in [\\pi, \\frac{4\\pi}{3})$. And $q$ holds only at multiples of $\\frac{\\pi}{2}$.",
          ),
          L(
            "La implicación es verdadera en $\\neg p \\cup q$: complementa $[\\pi, \\frac{4\\pi}{3})$ dentro de $[0, 2\\pi]$ y añade los puntos de $q$ que falten.",
            "The implication is true on $\\neg p \\cup q$: complement $[\\pi, \\frac{4\\pi}{3})$ inside $[0, 2\\pi]$ and add any missing points of $q$.",
          ),
        ],
        answerDisplay: L(
          `$A(p \\rightarrow q) = [0, \\pi]\\cup\\left[\\frac{4\\pi}{3}, 2\\pi\\right]$`,
          `$A(p \\rightarrow q) = [0, \\pi]\\cup\\left[\\frac{4\\pi}{3}, 2\\pi\\right]$`,
        ),
        solution: [
          step(
            "given",
            "$p(x): \\lfloor 1 - 2\\cos\\left(\\frac{x}{2}\\right) \\rfloor = 1$, $q(x): \\operatorname{sgn}(\\sin(2x)) = 0$, con $x \\in [0, 2\\pi]$.",
            "$p(x): \\lfloor 1 - 2\\cos\\left(\\frac{x}{2}\\right) \\rfloor = 1$, $q(x): \\operatorname{sgn}(\\sin(2x)) = 0$, with $x \\in [0, 2\\pi]$.",
          ),
          step(
            "approach",
            "Primero el conjunto de verdad de cada predicado (la parte entera impone un intervalo semiabierto; el signo solo se anula en ceros del seno), y después el equivalente $A(p \\rightarrow q) = \\neg A_p \\cup A_q$.",
            "First the truth set of each predicate (the floor imposes a half-open interval; the sign vanishes only at zeros of the sine), then the equivalence $A(p \\rightarrow q) = \\neg A_p \\cup A_q$.",
          ),
          step(
            "calculation",
            `$p:\\ 1 \\le 1 - 2\\cos\\frac{x}{2} < 2 \\Leftrightarrow -\\frac{1}{2} < \\cos\\frac{x}{2} \\le 0 \\Leftrightarrow \\frac{x}{2} \\in \\left[\\frac{\\pi}{2}, \\frac{2\\pi}{3}\\right) \\Rightarrow A_p = \\left[\\pi, \\frac{4\\pi}{3}\\right)$<br>$q:\\ \\sin(2x) = 0 \\Rightarrow A_q = \\left\\{0, \\frac{\\pi}{2}, \\pi, \\frac{3\\pi}{2}, 2\\pi\\right\\}$<br>$\\neg A_p = \\left[0, \\pi\\right) \\cup \\left[\\frac{4\\pi}{3}, 2\\pi\\right]$<br>$\\neg A_p \\cup A_q = [0, \\pi]\\cup\\left[\\frac{4\\pi}{3}, 2\\pi\\right]$`,
            `$p:\\ 1 \\le 1 - 2\\cos\\frac{x}{2} < 2 \\Leftrightarrow -\\frac{1}{2} < \\cos\\frac{x}{2} \\le 0 \\Leftrightarrow \\frac{x}{2} \\in \\left[\\frac{\\pi}{2}, \\frac{2\\pi}{3}\\right) \\Rightarrow A_p = \\left[\\pi, \\frac{4\\pi}{3}\\right)$<br>$q:\\ \\sin(2x) = 0 \\Rightarrow A_q = \\left\\{0, \\frac{\\pi}{2}, \\pi, \\frac{3\\pi}{2}, 2\\pi\\right\\}$<br>$\\neg A_p = \\left[0, \\pi\\right) \\cup \\left[\\frac{4\\pi}{3}, 2\\pi\\right]$<br>$\\neg A_p \\cup A_q = [0, \\pi]\\cup\\left[\\frac{4\\pi}{3}, 2\\pi\\right]$`,
          ),
          step(
            "result",
            `$A(p \\rightarrow q) = [0, \\pi]\\cup\\left[\\frac{4\\pi}{3}, 2\\pi\\right]$: la implicación solo falla en $\\left(\\pi, \\frac{4\\pi}{3}\\right)$, donde $p$ vale y $q$ no. En $x = \\pi$ entra por $q$ ($\\operatorname{sgn}(\\sin 2\\pi) = 0$ ✓).`,
            `$A(p \\rightarrow q) = [0, \\pi]\\cup\\left[\\frac{4\\pi}{3}, 2\\pi\\right]$: the implication fails only on $\\left(\\pi, \\frac{4\\pi}{3}\\right)$, where $p$ holds and $q$ does not. At $x = \\pi$ it enters via $q$ ($\\operatorname{sgn}(\\sin 2\\pi) = 0$ ✓).`,
          ),
        ],
      };
    },
  ),

  /* 5.6 · 59 (adaptado, n = 1) — cos³x ≤ cos²x ≤ cosx on [0, 2π] */
  template(
    {
      id: "trigeq-espol-59",
      subject: "math",
      topicId: "trig-equations",
      subtopicId: "intervals",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 480,
      tags: ["inequality", "powers", "sign-analysis", "intervals"],
      prerequisites: ["trig-functions"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5.6 · 59 (n = 1)",
        page: 669,
      },
      reasoning: "case-analysis",
    },
    () => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\left[0, \\frac{\\pi}{2}\\right]\\cup\\left[\\frac{3\\pi}{2}, 2\\pi\\right]$`, `$\\left[0, \\frac{\\pi}{2}\\right]\\cup\\left[\\frac{3\\pi}{2}, 2\\pi\\right]$`), correct: true },
        { id: "b", text: L(`$\\left[\\frac{\\pi}{2}, \\frac{3\\pi}{2}\\right]$`, `$\\left[\\frac{\\pi}{2}, \\frac{3\\pi}{2}\\right]$`), correct: false },
        { id: "c", text: L(`$\\left[0, \\frac{\\pi}{2}\\right]$`, `$\\left[0, \\frac{\\pi}{2}\\right]$`), correct: false },
        { id: "d", text: L(`$[0, 2\\pi]$`, `$[0, 2\\pi]$`), correct: false },
      ];
      return {
        skill: L("Cadena de potencias del coseno", "Chain of cosine powers"),
        statement: L(
          `Determina el conjunto de verdad de $p(x):\\ \\cos^3 x \\le \\cos^2 x \\le \\cos x$ en $x \\in [0, 2\\pi]$.`,
          `Determine the truth set of $p(x):\\ \\cos^3 x \\le \\cos^2 x \\le \\cos x$ on $x \\in [0, 2\\pi]$.`,
        ),
        answer: { kind: "multiple-choice", options },
        hints: [
          L(
            "Analiza por casos según el signo de $c = \\cos x$: ¿qué pasa si $0 \\le c \\le 1$? ¿Y si $-1 \\le c < 0$?",
            "Analyze by cases according to the sign of $c = \\cos x$: what happens if $0 \\le c \\le 1$? And if $-1 \\le c < 0$?",
          ),
          L(
            "Si $0 \\le c \\le 1$: multiplicar por $c$ reduce o mantiene ($c^3 \\le c^2 \\le c$ ✓). Si $c < 0$: $c^2 \\le c$ sería positivo ≤ negativo, imposible.",
            "If $0 \\le c \\le 1$: multiplying by $c$ shrinks or keeps ($c^3 \\le c^2 \\le c$ ✓). If $c < 0$: $c^2 \\le c$ would be positive ≤ negative, impossible.",
          ),
          L(
            "La cadena se cumple exactamente donde $\\cos x \\in [0, 1]$: primer y cuarto cuadrante, incluyendo los extremos.",
            "The chain holds exactly where $\\cos x \\in [0, 1]$: first and fourth quadrants, endpoints included.",
          ),
        ],
        answerDisplay: L(
          `$A_{p(x)} = \\left[0, \\frac{\\pi}{2}\\right]\\cup\\left[\\frac{3\\pi}{2}, 2\\pi\\right]$`,
          `$A_{p(x)} = \\left[0, \\frac{\\pi}{2}\\right]\\cup\\left[\\frac{3\\pi}{2}, 2\\pi\\right]$`,
        ),
        solution: [
          step(
            "given",
            "$\\cos^3 x \\le \\cos^2 x \\le \\cos x$, con $x \\in [0, 2\\pi]$.",
            "$\\cos^3 x \\le \\cos^2 x \\le \\cos x$, with $x \\in [0, 2\\pi]$.",
          ),
          step(
            "approach",
            "La cadena compara potencias sucesivas del mismo número $c = \\cos x$; su comportamiento depende solo del signo de $c$, así que basta un análisis por casos.",
            "The chain compares successive powers of the same number $c = \\cos x$; its behavior depends only on the sign of $c$, so a case analysis suffices.",
          ),
          step(
            "calculation",
            `Caso $0 \\le c \\le 1$: $c^3 \\le c^2 \\le c$ ✓ (multiplicar por $c \\in [0,1]$ encoge)<br>Caso $-1 \\le c < 0$: $c^3 \\le c^2$ ✓ pero $c^2 \\le c$ ✗ (positivo ≤ negativo, falso)<br>Caso $c = 0$: $0 \\le 0 \\le 0$ ✓<br>$\\cos x \\in [0, 1] \\Leftrightarrow x \\in \\left[0, \\frac{\\pi}{2}\\right]\\cup\\left[\\frac{3\\pi}{2}, 2\\pi\\right]$`,
            `Case $0 \\le c \\le 1$: $c^3 \\le c^2 \\le c$ ✓ (multiplying by $c \\in [0,1]$ shrinks)<br>Case $-1 \\le c < 0$: $c^3 \\le c^2$ ✓ but $c^2 \\le c$ ✗ (positive ≤ negative, false)<br>Case $c = 0$: $0 \\le 0 \\le 0$ ✓<br>$\\cos x \\in [0, 1] \\Leftrightarrow x \\in \\left[0, \\frac{\\pi}{2}\\right]\\cup\\left[\\frac{3\\pi}{2}, 2\\pi\\right]$`,
          ),
          step(
            "result",
            `El conjunto de verdad es $\\left[0, \\frac{\\pi}{2}\\right]\\cup\\left[\\frac{3\\pi}{2}, 2\\pi\\right]$. Comprobación: $x = \\pi$ da $-1 \\le 1 \\le -1$ ✗; $x = 0$ da $1 \\le 1 \\le 1$ ✓. (En el libro, el ejercicio 59 pide demostrarlo para todo $n$ natural: la misma región funciona porque $[\\cos x]^{n+2} \\le [\\cos x]^{n+1} \\le [\\cos x]^n$ hereda el análisis de signos.)`,
            `The truth set is $\\left[0, \\frac{\\pi}{2}\\right]\\cup\\left[\\frac{3\\pi}{2}, 2\\pi\\right]$. Check: $x = \\pi$ gives $-1 \\le 1 \\le -1$ ✗; $x = 0$ gives $1 \\le 1 \\le 1$ ✓. (In the book, exercise 59 asks to prove it for every natural $n$: the same region works because $[\\cos x]^{n+2} \\le [\\cos x]^{n+1} \\le [\\cos x]^n$ inherits the sign analysis.)`,
          ),
        ],
      };
    },
  ),

  /* 5.6 · 60 (adaptado, a = 4, b = 1) — min of 4·sen²x + 1/sen²x = 4 */
  template(
    {
      id: "trigeq-espol-60",
      subject: "math",
      topicId: "trig-equations",
      subtopicId: "intervals",
      difficulty: "challenge",
      questionType: "numeric",
      estimatedTimeSec: 420,
      tags: ["inequality", "am-gm", "optimization", "domain"],
      prerequisites: ["trig-functions"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5.6 · 60 (a = 4, b = 1)",
        page: 669,
      },
      reasoning: "multi-concept",
    },
    () => ({
      skill: L("Desigualdad a·X + b/X ≥ 2√(ab) con X = sen²x", "Inequality a·X + b/X ≥ 2√(ab) with X = sen²x"),
      statement: L(
        `Para $\\sin x \\ne 0$, calcula el **valor mínimo** de la expresión $4\\sin^2 x + \\dfrac{1}{\\sin^2 x}$.`,
        `For $\\sin x \\ne 0$, find the **minimum value** of the expression $4\\sin^2 x + \\dfrac{1}{\\sin^2 x}$.`,
      ),
      answer: {
        kind: "numeric",
        value: 4,
        tolerance: { mode: "absolute", value: 0.01 },
      },
      hints: [
        L(
          "Llama $X = \\sin^2 x$: como $\\sin x \\ne 0$, tienes $0 < X \\le 1$. La expresión es $4X + \\frac{1}{X}$.",
          "Let $X = \\sin^2 x$: since $\\sin x \\ne 0$, you have $0 < X \\le 1$. The expression is $4X + \\frac{1}{X}$.",
        ),
        L(
          "Desigualdad AM-GM: $aX + \\frac{b}{X} \\ge 2\\sqrt{ab}$ con $a = 4$, $b = 1$.",
          "AM-GM inequality: $aX + \\frac{b}{X} \\ge 2\\sqrt{ab}$ with $a = 4$, $b = 1$.",
        ),
        L(
          "La cota $2\\sqrt{4} = 4$ se alcanza cuando $4X = \\frac{1}{X}$, es decir $X = \\frac{1}{2}$: ¿es un valor posible de $\\sin^2 x$?",
          "The bound $2\\sqrt{4} = 4$ is attained when $4X = \\frac{1}{X}$, i.e. $X = \\frac{1}{2}$: is that a possible value of $\\sin^2 x$?",
        ),
      ],
      answerDisplay: L(
        `Mínimo $= 4$, alcanzado cuando $\\sin^2 x = \\frac{1}{2}$ (p. ej. $x = \\frac{\\pi}{4}$).`,
        `Minimum $= 4$, attained when $\\sin^2 x = \\frac{1}{2}$ (e.g. $x = \\frac{\\pi}{4}$).`,
      ),
      solution: [
        step(
          "given",
          "$4\\sin^2 x + \\frac{1}{\\sin^2 x}$, con $\\sin x \\ne 0$.",
          "$4\\sin^2 x + \\frac{1}{\\sin^2 x}$, with $\\sin x \\ne 0$.",
        ),
        step(
          "approach",
          "Sustituir $X = \\sin^2 x \\in (0, 1]$ y aplicar la desigualdad AM-GM en la forma $aX + \\frac{b}{X} \\ge 2\\sqrt{ab}$; después hay que verificar que el punto de igualdad es alcanzable.",
          "Substitute $X = \\sin^2 x \\in (0, 1]$ and apply AM-GM in the form $aX + \\frac{b}{X} \\ge 2\\sqrt{ab}$; then verify the equality point is attainable.",
        ),
        step(
          "calculation",
          `$4X + \\frac{1}{X} \\ge 2\\sqrt{4 \\cdot 1} = 4$<br>Igualdad cuando $4X = \\frac{1}{X} \\Rightarrow X^2 = \\frac{1}{4} \\Rightarrow X = \\frac{1}{2}$<br>$X = \\frac{1}{2} \\in (0, 1]$ ✓ (p. ej. $x = \\frac{\\pi}{4}$: $4 \\cdot \\frac{1}{2} + 2 = 4$)`,
          `$4X + \\frac{1}{X} \\ge 2\\sqrt{4 \\cdot 1} = 4$<br>Equality when $4X = \\frac{1}{X} \\Rightarrow X^2 = \\frac{1}{4} \\Rightarrow X = \\frac{1}{2}$<br>$X = \\frac{1}{2} \\in (0, 1]$ ✓ (e.g. $x = \\frac{\\pi}{4}$: $4 \\cdot \\frac{1}{2} + 2 = 4$)`,
        ),
        step(
          "result",
          `El valor mínimo es $4$. (El ejercicio 60 del libro demuestra la forma general $a\\,\\text{sen}^2 x + \\frac{b}{\\text{sen}^2 x} \\ge 2\\sqrt{ab}$ para $a, b > 0$; la elección $a = 4$, $b = 1$ garantiza que la igualdad es alcanzable dentro del rango de $\\sin^2 x$.)`,
          `The minimum value is $4$. (Book exercise 60 proves the general form $a\\,\\sin^2 x + \\frac{b}{\\sin^2 x} \\ge 2\\sqrt{ab}$ for $a, b > 0$; the choice $a = 4$, $b = 1$ guarantees equality is attainable within the range of $\\sin^2 x$.)`,
        ),
      ],
    }),
  ),
];
