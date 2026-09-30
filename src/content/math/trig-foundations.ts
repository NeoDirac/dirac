/**
 * MATH · Trigonometry Foundations
 *
 * Degrees and radians, the unit circle, sine/cosine/tangent, reciprocal
 * functions, exact values and right triangles. Includes unit-circle and
 * right-triangle parameterized diagrams.
 */

import { template, L, step, tok } from "@/lib/problem";
import type { ProblemTemplate, McOption } from "@/lib/types";

/** exact (cos, sin) LaTeX for the special angles with |cos| ≠ |sin| */
const PT: Record<number, [string, string]> = {
  30: ["\\frac{\\sqrt{3}}{2}", "\\frac{1}{2}"],
  60: ["\\frac{1}{2}", "\\frac{\\sqrt{3}}{2}"],
  120: ["-\\frac{1}{2}", "\\frac{\\sqrt{3}}{2}"],
  150: ["-\\frac{\\sqrt{3}}{2}", "\\frac{1}{2}"],
  210: ["-\\frac{\\sqrt{3}}{2}", "-\\frac{1}{2}"],
  240: ["-\\frac{1}{2}", "-\\frac{\\sqrt{3}}{2}"],
  300: ["\\frac{1}{2}", "-\\frac{\\sqrt{3}}{2}"],
  330: ["\\frac{\\sqrt{3}}{2}", "-\\frac{1}{2}"],
};

/** negate a LaTeX value string */
const neg = (s: string): string => (s.startsWith("-") ? s.slice(1) : "-" + s);

/** point as LaTeX */
const ptLat = (c: string, s: string): string => `$\\left(${c},\\; ${s}\\right)$`;

export const templates: ProblemTemplate[] = [
  /* ---------------------------------------------------------------- */
  /* Degrees → radians (MC)                                            */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "trigf-conv-01",
      subject: "math",
      topicId: "trig-foundations",
      subtopicId: "degrees-radians",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 90,
      tags: ["radians", "conversion"],
      prerequisites: ["radicals", "functions"],
    },
    (rng) => {
      const RAD: Record<number, string> = {
        30: "\\frac{\\pi}{6}",
        45: "\\frac{\\pi}{4}",
        60: "\\frac{\\pi}{3}",
        90: "\\frac{\\pi}{2}",
        120: "\\frac{2\\pi}{3}",
        135: "\\frac{3\\pi}{4}",
        150: "\\frac{5\\pi}{6}",
        180: "\\pi",
      };
      const angles = Object.keys(RAD).map(Number);
      const th = rng.pick(angles);
      const others = rng.shuffle(angles.filter((a) => a !== th)).slice(0, 3);
      const options: McOption[] = [
        { id: "a", text: L(`$${RAD[th]}$`, `$${RAD[th]}$`), correct: true },
        { id: "b", text: L(`$${RAD[others[0]]}$`, `$${RAD[others[0]]}$`), correct: false },
        { id: "c", text: L(`$${RAD[others[1]]}$`, `$${RAD[others[1]]}$`), correct: false },
        { id: "d", text: L(`$${RAD[others[2]]}$`, `$${RAD[others[2]]}$`), correct: false },
      ];
      return {
        skill: L("Convertir grados a radianes", "Converting degrees to radians"),
        statement: L(
          `Convierte a radianes: $\\theta = ${th}°$.`,
          `Convert to radians: $\\theta = ${th}°$.`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "La equivalencia clave es $180° = \\pi$ rad.",
            "The key equivalence is $180° = \\pi$ rad.",
          ),
          L(
            "Plantea la proporción $\\frac{\\theta}{180°} = \\frac{x}{\\pi}$.",
            "Set up the proportion $\\frac{\\theta}{180°} = \\frac{x}{\\pi}$.",
          ),
          L(
            "Multiplica y simplifica la fracción que queda.",
            "Multiply and simplify the resulting fraction.",
          ),
        ],
        answerDisplay: L(`$${RAD[th]}$`, `$${RAD[th]}$`),
        solution: [
          step("given", `$\\theta = ${th}°$`, `$\\theta = ${th}°$`),
          step(
            "approach",
            "Multiplicamos por $\\frac{\\pi}{180°}$ y simplificamos.",
            "Multiply by $\\frac{\\pi}{180°}$ and simplify.",
          ),
          step(
            "calculation",
            `$x = ${th}° \\cdot \\frac{\\pi}{180°} = \\frac{${th}\\pi}{180} = ${RAD[th]}$`,
            `$x = ${th}° \\cdot \\frac{\\pi}{180°} = \\frac{${th}\\pi}{180} = ${RAD[th]}$`,
          ),
          step(
            "result",
            `$${th}° = ${RAD[th]}$ rad.`,
            `$${th}° = ${RAD[th]}$ rad.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Radians → degrees                                                 */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "trigf-conv-02",
      subject: "math",
      topicId: "trig-foundations",
      subtopicId: "degrees-radians",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 90,
      tags: ["radians", "conversion"],
      prerequisites: ["radicals", "functions"],
    },
    (rng) => {
      const [k, n, d] = rng.pick([
        [1, 6, 30],
        [1, 4, 45],
        [1, 3, 60],
        [1, 2, 90],
        [2, 3, 120],
        [3, 4, 135],
        [5, 6, 150],
        [1, 1, 180],
        [3, 2, 270],
        [2, 1, 360],
      ]);
      const radLat = n === 1 ? (k === 1 ? "\\pi" : `${k}\\pi`) : k === 1 ? `\\frac{\\pi}{${n}}` : `\\frac{${k}\\pi}{${n}}`;
      return {
        skill: L("Convertir radianes a grados", "Converting radians to degrees"),
        statement: L(
          `Convierte a grados: $\\theta = ${radLat}$ rad.`,
          `Convert to degrees: $\\theta = ${radLat}$ rad.`,
        ),
        answer: { kind: "numeric", value: d, unitSuffix: "°" },
        hints: [
          L(
            "La equivalencia clave es $\\pi$ rad $= 180°$.",
            "The key equivalence is $\\pi$ rad $= 180°$.",
          ),
          L(
            "Multiplica por $\\frac{180°}{\\pi}$: los $\\pi$ se cancelan.",
            "Multiply by $\\frac{180°}{\\pi}$: the $\\pi$ factors cancel.",
          ),
          L(
            `Simplifica la fracción con denominador $${n}$.`,
            `Simplify the fraction with denominator $${n}$.`,
          ),
        ],
        answerDisplay: L(`$${d}°$`, `$${d}°$`),
        solution: [
          step("given", `$\\theta = ${radLat}$ rad`, `$\\theta = ${radLat}$ rad`),
          step(
            "approach",
            "Multiplicamos por $\\frac{180°}{\\pi}$ y simplificamos.",
            "Multiply by $\\frac{180°}{\\pi}$ and simplify.",
          ),
          step(
            "calculation",
            `$\\theta = ${radLat} \\cdot \\frac{180°}{\\pi} = \\frac{${k} \\cdot 180°}{${n}} = ${d}°$`,
            `$\\theta = ${radLat} \\cdot \\frac{180°}{\\pi} = \\frac{${k} \\cdot 180°}{${n}} = ${d}°$`,
          ),
          step("result", `$${radLat}$ rad $= ${d}°$.`, `$${radLat}$ rad $= ${d}°$.`),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Exact values with radicals (expression)                           */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "trigf-exact-02",
      subject: "math",
      topicId: "trig-foundations",
      subtopicId: "exact-values",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 150,
      tags: ["exact-values", "special-triangles"],
      prerequisites: ["radicals", "functions"],
    },
    (rng) => {
      const e = rng.pick([
        {
          fn: "sen",
          angle: 45,
          value: "\\frac{\\sqrt{2}}{2}",
          acc: ["sqrt(2)/2", "1/sqrt(2)"],
        },
        {
          fn: "cos",
          angle: 45,
          value: "\\frac{\\sqrt{2}}{2}",
          acc: ["sqrt(2)/2", "1/sqrt(2)"],
        },
        {
          fn: "sen",
          angle: 60,
          value: "\\frac{\\sqrt{3}}{2}",
          acc: ["sqrt(3)/2"],
        },
        {
          fn: "cos",
          angle: 30,
          value: "\\frac{\\sqrt{3}}{2}",
          acc: ["sqrt(3)/2"],
        },
        {
          fn: "tan",
          angle: 60,
          value: "\\sqrt{3}",
          acc: ["sqrt(3)"],
        },
        {
          fn: "tan",
          angle: 30,
          value: "\\frac{\\sqrt{3}}{3}",
          acc: ["sqrt(3)/3", "1/sqrt(3)"],
        },
      ]);
      const fnLatEs = e.fn === "sen" ? "\\operatorname{sen}" : `\\${e.fn}`;
      const fnLatEn = e.fn === "sen" ? "\\sin" : `\\${e.fn}`;
      const fnNameEs = e.fn === "sen" ? "seno" : e.fn === "cos" ? "coseno" : "tangente";
      const fnNameEn = e.fn === "sen" ? "sine" : e.fn === "cos" ? "cosine" : "tangent";
      const ratioEs =
        e.fn === "sen"
          ? "\\frac{\\text{cateto opuesto}}{\\text{hipotenusa}}"
          : e.fn === "cos"
            ? "\\frac{\\text{cateto adyacente}}{\\text{hipotenusa}}"
            : "\\frac{\\text{cateto opuesto}}{\\text{cateto adyacente}}";
      const ratioEn =
        e.fn === "sen"
          ? "\\frac{\\text{opposite}}{\\text{hypotenuse}}"
          : e.fn === "cos"
            ? "\\frac{\\text{adjacent}}{\\text{hypotenuse}}"
            : "\\frac{\\text{opposite}}{\\text{adjacent}}";
      return {
        skill: L("Valores exactos de ángulos notables", "Exact values of special angles"),
        statement: L(
          `Calcula el valor **exacto** del ${fnNameEs} de $${e.angle}°$ (escribe la raíz con sqrt, por ejemplo: sqrt(7)/3).`,
          `Compute the **exact** value of the ${fnNameEn} of $${e.angle}°$ (write roots with sqrt, e.g. sqrt(7)/3).`,
        ),
        answer: { kind: "expression", accepted: e.acc, variables: [] },
        hints: [
          L(
            "Usa los triángulos especiales: 45°–45°–90° y 30°–60°–90°.",
            "Use the special triangles: 45°–45°–90° and 30°–60°–90°.",
          ),
          L(
            "Sus lados guardan las proporciones $1 : 1 : \\sqrt{2}$ y $1 : \\sqrt{3} : 2$.",
            "Their sides are in the ratios $1 : 1 : \\sqrt{2}$ and $1 : \\sqrt{3} : 2$.",
          ),
          L(
            `El ${fnNameEs} es un cociente de dos lados; racionaliza el denominador si hace falta.`,
            `The ${fnNameEn} is a quotient of two sides; rationalize the denominator if needed.`,
          ),
        ],
        answerDisplay: L(
          `$${fnLatEs} ${e.angle}° = ${e.value}$`,
          `$${fnLatEn} ${e.angle}° = ${e.value}$`,
        ),
        solution: [
          step(
            "given",
            `Calcular $${fnLatEs} ${e.angle}°$ de forma exacta.`,
            `Compute $${fnLatEn} ${e.angle}°$ exactly.`,
          ),
          step(
            "approach",
            `En el triángulo especial correspondiente, el ${fnNameEs} es ${ratioEs}.`,
            `In the matching special triangle, the ${fnNameEn} is ${ratioEn}.`,
          ),
          step(
            "calculation",
            `$${fnLatEs} ${e.angle}° = ${ratioEs} = ${e.value}$`,
            `$${fnLatEn} ${e.angle}° = ${ratioEn} = ${e.value}$`,
          ),
          step(
            "result",
            `$${fnLatEs} ${e.angle}° = ${e.value}$ (equivalente a ${e.acc[0]}).`,
            `$${fnLatEn} ${e.angle}° = ${e.value}$ (equivalent to ${e.acc[0]}).`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* sin/cos/tan from a labelled triangle (diagram)                    */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "trigf-sct-01",
      subject: "math",
      topicId: "trig-foundations",
      subtopicId: "sin-cos-tan",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 150,
      tags: ["sohcahtoa", "right-triangles"],
      prerequisites: ["radicals", "functions"],
    },
    (rng) => {
      const [adj, opp, hyp] = rng.pick([
        [4, 3, 5],
        [8, 6, 10],
        [12, 5, 13],
        [15, 8, 17],
      ]);
      const fn = rng.pick(["sen", "cos", "tan"] as const);
      const value = fn === "sen" ? opp / hyp : fn === "cos" ? adj / hyp : opp / adj;
      const fnLatEs = fn === "sen" ? "\\operatorname{sen}" : `\\${fn}`;
      const fnLatEn = fn === "sen" ? "\\sin" : `\\${fn}`;
      const fnNameEs = fn === "sen" ? "seno" : fn === "cos" ? "coseno" : "tangente";
      const fnNameEn = fn === "sen" ? "sine" : fn === "cos" ? "cosine" : "tangent";
      return {
        skill: L("Razones trigonométricas en un triángulo", "Trig ratios in a triangle"),
        statement: L(
          `En el triángulo rectángulo del diagrama, calcula el ${fnNameEs} del ángulo $\\theta$. Puedes responder como fracción (por ejemplo 3/5) o como decimal.`,
          `In the right triangle in the diagram, compute the ${fnNameEn} of angle $\\theta$. You may answer as a fraction (e.g. 3/5) or as a decimal.`,
        ),
        diagram: {
          kind: "right-triangle",
          aLabel: `${adj}`,
          bLabel: `${opp}`,
          cLabel: `${hyp}`,
          angleLabel: "θ",
        },
        diagramLabel: L(
          `Triángulo rectángulo con cateto inferior ${adj}, cateto vertical ${opp} e hipotenusa ${hyp}; el ángulo θ está en el vértice inferior derecho.`,
          `Right triangle with bottom leg ${adj}, vertical leg ${opp} and hypotenuse ${hyp}; the angle θ sits at the bottom-right vertex.`,
        ),
        answer: { kind: "numeric", value },
        hints: [
          L(
            "Identifica respecto a $\\theta$: cateto opuesto (vertical), cateto adyacente (horizontal) e hipotenusa.",
            "Relative to $\\theta$ identify: opposite leg (vertical), adjacent leg (horizontal) and hypotenuse.",
          ),
          L(
            "SOH-CAH-TOA: seno = opuesto/hipotenusa, coseno = adyacente/hipotenusa, tangente = opuesto/adyacente.",
            "SOH-CAH-TOA: sine = opposite/hypotenuse, cosine = adjacent/hypotenuse, tangent = opposite/adjacent.",
          ),
          L(
            `Los tres lados son $${adj}$, $${opp}$ y $${hyp}$: elige el par que corresponde.`,
            `The three sides are $${adj}$, $${opp}$ and $${hyp}$: pick the matching pair.`,
          ),
        ],
        answerDisplay: L(
          `$${fnLatEs}\\,\\theta = ${tok(value)}$`,
          `$${fnLatEn}\\,\\theta = ${tok(value)}$`,
        ),
        solution: [
          step(
            "given",
            `Cateto adyacente a $\\theta$: $${adj}$. Cateto opuesto: $${opp}$. Hipotenusa: $${hyp}$.`,
            `Leg adjacent to $\\theta$: $${adj}$. Opposite leg: $${opp}$. Hypotenuse: $${hyp}$.`,
          ),
          step(
            "approach",
            "Aplicamos la definición (SOH-CAH-TOA) con los lados identificados.",
            "Apply the definition (SOH-CAH-TOA) with the identified sides.",
          ),
          step(
            "calculation",
            `$${fnLatEs}\\,\\theta = ${fn === "sen" ? `\\frac{${opp}}{${hyp}}` : fn === "cos" ? `\\frac{${adj}}{${hyp}}` : `\\frac{${opp}}{${adj}}`} = ${tok(value)}$`,
            `$${fnLatEn}\\,\\theta = ${fn === "sen" ? `\\frac{${opp}}{${hyp}}` : fn === "cos" ? `\\frac{${adj}}{${hyp}}` : `\\frac{${opp}}{${adj}}`} = ${tok(value)}$`,
          ),
          step(
            "result",
            `$${fnLatEs}\\,\\theta = ${tok(value)}$.`,
            `$${fnLatEn}\\,\\theta = ${tok(value)}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Unit circle: exact coordinates (MC + diagram)                     */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "trigf-uc-01",
      subject: "math",
      topicId: "trig-foundations",
      subtopicId: "unit-circle",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 180,
      tags: ["unit-circle", "exact-values"],
      prerequisites: ["radicals", "functions"],
    },
    (rng) => {
      const th = rng.pick([30, 60, 120, 150, 210, 240, 300, 330]);
      const [c, s] = PT[th];
      const quad = th <= 90 ? 1 : th <= 180 ? 2 : th <= 270 ? 3 : 4;
      const ref = th <= 90 ? th : th <= 180 ? 180 - th : th <= 270 ? th - 180 : 360 - th;
      const options: McOption[] = [
        { id: "a", text: L(ptLat(c, s), ptLat(c, s)), correct: true },
        { id: "b", text: L(ptLat(s, c), ptLat(s, c)), correct: false },
        { id: "c", text: L(ptLat(neg(c), s), ptLat(neg(c), s)), correct: false },
        { id: "d", text: L(ptLat(c, neg(s)), ptLat(c, neg(s))), correct: false },
      ];
      return {
        skill: L("Coordenadas en la circunferencia unitaria", "Coordinates on the unit circle"),
        statement: L(
          "El diagrama muestra la circunferencia unitaria con el ángulo $\\theta$ en posición estándar. ¿Cuáles son las coordenadas del punto $P$ donde el lado terminal corta a la circunferencia, es decir, $(\\cos\\theta, \\operatorname{sen}\\theta)$?",
          "The diagram shows the unit circle with angle $\\theta$ in standard position. What are the coordinates of the point $P$ where the terminal side meets the circle, that is, $(\\cos\\theta, \\sin\\theta)$?",
        ),
        diagram: {
          kind: "unit-circle",
          angleDeg: th,
          showPoint: false,
        },
        diagramLabel: L(
          `Circunferencia unitaria con un ángulo de ${th} grados en posición estándar.`,
          `Unit circle with a ${th}-degree angle in standard position.`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "En la circunferencia unitaria, $P = (\\cos\\theta, \\operatorname{sen}\\theta)$.",
            "On the unit circle, $P = (\\cos\\theta, \\sin\\theta)$.",
          ),
          L(
            `Determina el cuadrante de $\\theta$ para fijar los signos.`,
            `Determine the quadrant of $\\theta$ to fix the signs.`,
          ),
          L(
            `El ángulo de referencia da los valores absolutos ($\\frac{1}{2}$ y $\\frac{\\sqrt{3}}{2}$ en algún orden).`,
            `The reference angle gives the absolute values ($\\frac{1}{2}$ and $\\frac{\\sqrt{3}}{2}$ in some order).`,
          ),
        ],
        answerDisplay: L(ptLat(c, s), ptLat(c, s)),
        solution: [
          step(
            "given",
            `$\\theta = ${th}°$ en posición estándar.`,
            `$\\theta = ${th}°$ in standard position.`,
          ),
          step(
            "approach",
            "Usamos el cuadrante para los signos y el ángulo de referencia para los valores absolutos.",
            "Use the quadrant for the signs and the reference angle for the absolute values.",
          ),
          step(
            "calculation",
            `Cuadrante ${quad}; ángulo de referencia $${ref}°$.<br>Valores absolutos: $${ref === 30 ? "\\frac{\\sqrt{3}}{2} \\text{ y } \\frac{1}{2}" : "\\frac{1}{2} \\text{ y } \\frac{\\sqrt{3}}{2}"}$.<br>Signos del cuadrante ${quad}: $\\cos$ ${quad === 1 || quad === 4 ? "+" : "-"}, $\\operatorname{sen}$ ${quad === 1 || quad === 2 ? "+" : "-"}.`,
            `Quadrant ${quad}; reference angle $${ref}°$.<br>Absolute values: $${ref === 30 ? "\\frac{\\sqrt{3}}{2} \\text{ and } \\frac{1}{2}" : "\\frac{1}{2} \\text{ and } \\frac{\\sqrt{3}}{2}"}$.<br>Signs in quadrant ${quad}: $\\cos$ ${quad === 1 || quad === 4 ? "+" : "-"}, $\\sin$ ${quad === 1 || quad === 2 ? "+" : "-"}.`,
          ),
          step("result", ptLat(c, s), ptLat(c, s)),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Unit circle: reference angle (numeric + diagram)                  */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "trigf-uc-02",
      subject: "math",
      topicId: "trig-foundations",
      subtopicId: "unit-circle",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 120,
      tags: ["unit-circle", "reference-angle"],
      prerequisites: ["radicals", "functions"],
    },
    (rng) => {
      const th = rng.pick([120, 135, 150, 210, 225, 240, 300, 315, 330]);
      const quad = th <= 180 ? 2 : th <= 270 ? 3 : 4;
      const ref = quad === 2 ? 180 - th : quad === 3 ? th - 180 : 360 - th;
      const formulaEs = quad === 2 ? `180° - ${th}°` : quad === 3 ? `${th}° - 180°` : `360° - ${th}°`;
      const formulaEn = formulaEs;
      return {
        skill: L("Ángulo de referencia", "Reference angle"),
        statement: L(
          "El diagrama muestra un ángulo $\\theta$ en posición estándar sobre la circunferencia unitaria. ¿Cuál es su **ángulo de referencia** (el ángulo agudo entre el lado terminal y el eje $x$), en grados?",
          "The diagram shows an angle $\\theta$ in standard position on the unit circle. What is its **reference angle** (the acute angle between the terminal side and the $x$-axis), in degrees?",
        ),
        diagram: {
          kind: "unit-circle",
          angleDeg: th,
          showPoint: true,
        },
        diagramLabel: L(
          `Circunferencia unitaria con el ángulo θ = ${th} grados en posición estándar.`,
          `Unit circle with angle θ = ${th} degrees in standard position.`,
        ),
        answer: { kind: "numeric", value: ref, unitSuffix: "°" },
        hints: [
          L(
            "El ángulo de referencia siempre es agudo: mide menos de $90°$.",
            "The reference angle is always acute: it measures less than $90°$.",
          ),
          L(
            "Se mide desde el lado terminal hasta el semieje $x$ más cercano.",
            "It is measured from the terminal side to the nearest $x$-semiaxis.",
          ),
          L(
            `En el cuadrante ${quad} se calcula como ${formulaEs}.`,
            `In quadrant ${quad} it is computed as ${formulaEn}.`,
          ),
        ],
        answerDisplay: L(`$${ref}°$`, `$${ref}°$`),
        solution: [
          step(
            "given",
            `$\\theta = ${th}°$ en posición estándar.`,
            `$\\theta = ${th}°$ in standard position.`,
          ),
          step(
            "approach",
            "Según el cuadrante, el ángulo de referencia se calcula respecto a 180° o 360°.",
            "Depending on the quadrant, the reference angle is computed relative to 180° or 360°.",
          ),
          step(
            "calculation",
            `Cuadrante ${quad}:<br>$\\text{ref} = ${formulaEs} = ${ref}°$`,
            `Quadrant ${quad}:<br>$\\text{ref} = ${formulaEn} = ${ref}°$`,
          ),
          step(
            "result",
            `El ángulo de referencia es $${ref}°$.`,
            `The reference angle is $${ref}°$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Reciprocal functions                                              */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "trigf-rec-01",
      subject: "math",
      topicId: "trig-foundations",
      subtopicId: "reciprocal",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 150,
      tags: ["reciprocal", "cosecant", "secant", "cotangent"],
      prerequisites: ["radicals", "functions"],
    },
    (rng) => {
      const [opp, adj, hyp] = rng.pick([
        [3, 4, 5],
        [5, 12, 13],
        [8, 15, 17],
        [7, 24, 25],
      ]);
      const fn = rng.pick(["csc", "sec", "cot"] as const);
      const givenFn = fn === "csc" ? "sen" : fn === "sec" ? "cos" : "tan";
      const givenLatEs = givenFn === "sen" ? "\\operatorname{sen}" : `\\${givenFn}`;
      const givenLatEn = givenFn === "sen" ? "\\sin" : `\\${givenFn}`;
      const givenValLat =
        fn === "csc" ? `\\frac{${opp}}{${hyp}}` : fn === "sec" ? `\\frac{${adj}}{${hyp}}` : `\\frac{${opp}}{${adj}}`;
      const value = fn === "csc" ? hyp / opp : fn === "sec" ? hyp / adj : adj / opp;
      const valueLat =
        fn === "csc" ? `\\frac{${hyp}}{${opp}}` : fn === "sec" ? `\\frac{${hyp}}{${adj}}` : `\\frac{${adj}}{${opp}}`;
      const fnLat = `\\${fn}`;
      const fnNameEs =
        fn === "csc" ? "cosecante" : fn === "sec" ? "secante" : "cotangente";
      const fnNameEn = fn === "csc" ? "cosecant" : fn === "sec" ? "secant" : "cotangent";
      return {
        skill: L("Funciones recíprocas", "Reciprocal functions"),
        statement: L(
          `Si $\\theta$ es un ángulo agudo con $${givenLatEs}\\,\\theta = ${givenValLat}$, calcula la ${fnNameEs} de $\\theta$ (fracción o decimal, por ejemplo 5/3).`,
          `If $\\theta$ is an acute angle with $${givenLatEn}\\,\\theta = ${givenValLat}$, compute the ${fnNameEn} of $\\theta$ (fraction or decimal, e.g. 5/3).`,
        ),
        answer: { kind: "numeric", value },
        hints: [
          L(
            `La ${fnNameEs} es la función recíproca del ${givenFn === "sen" ? "seno" : givenFn === "cos" ? "coseno" : "tangente"}.`,
            `The ${fnNameEn} is the reciprocal of the ${givenFn === "sen" ? "sine" : givenFn === "cos" ? "cosine" : "tangent"}.`,
          ),
          L(
            `La identidad es $${fnLat}\\,\\theta = \\frac{1}{${givenLatEs}\\,\\theta}$.`,
            `The identity is $${fnLat}\\,\\theta = \\frac{1}{${givenLatEn}\\,\\theta}$.`,
          ),
          L(
            "Invierte la fracción dada y simplifica si es posible.",
            "Flip the given fraction and simplify if possible.",
          ),
        ],
        answerDisplay: L(
          `$${fnLat}\\,\\theta = ${valueLat} = ${tok(value)}$`,
          `$${fnLat}\\,\\theta = ${valueLat} = ${tok(value)}$`,
        ),
        solution: [
          step(
            "given",
            `$${givenLatEs}\\,\\theta = ${givenValLat}$, $\\theta$ agudo.`,
            `$${givenLatEn}\\,\\theta = ${givenValLat}$, $\\theta$ acute.`,
          ),
          step(
            "approach",
            "Aplicamos la identidad de la función recíproca.",
            "Apply the reciprocal-function identity.",
          ),
          step(
            "calculation",
            `$${fnLat}\\,\\theta = \\frac{1}{${givenLatEs}\\,\\theta} = ${valueLat} = ${tok(value)}$`,
            `$${fnLat}\\,\\theta = \\frac{1}{${givenLatEn}\\,\\theta} = ${valueLat} = ${tok(value)}$`,
          ),
          step(
            "result",
            `$${fnLat}\\,\\theta = ${tok(value)}$.`,
            `$${fnLat}\\,\\theta = ${tok(value)}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Right triangle: special 30-60-90 side (diagram)                   */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "trigf-rt-01",
      subject: "math",
      topicId: "trig-foundations",
      subtopicId: "right-triangles",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 150,
      tags: ["special-triangles", "right-triangles"],
      prerequisites: ["radicals", "functions"],
    },
    (rng) => {
      const th = rng.pick([30, 60]);
      const k = rng.int(2, 9);
      const aLabel = th === 30 ? `${k}√3` : "x";
      const bLabel = th === 30 ? "x" : `${k}√3`;
      return {
        skill: L("Triángulo 30°–60°–90°", "The 30°–60°–90° triangle"),
        statement: L(
          "En el triángulo rectángulo del diagrama, calcula la longitud $x$.",
          "In the right triangle in the diagram, compute the length $x$.",
        ),
        diagram: {
          kind: "right-triangle",
          aLabel,
          bLabel,
          cLabel: `${2 * k}`,
          angleLabel: `${th}°`,
        },
        diagramLabel: L(
          `Triángulo rectángulo con hipotenusa ${2 * k}, un cateto con radical, el otro cateto marcado como x y un ángulo de ${th} grados.`,
          `Right triangle with hypotenuse ${2 * k}, one leg written with a radical, the other leg marked x, and a ${th}-degree angle.`,
        ),
        answer: { kind: "numeric", value: k },
        hints: [
          L(
            "Es un triángulo especial 30°–60°–90°: sus lados guardan la proporción $1 : \\sqrt{3} : 2$.",
            "It is a 30°–60°–90° special triangle: its sides are in the ratio $1 : \\sqrt{3} : 2$.",
          ),
          L(
            `La hipotenusa mide $${2 * k}$: el cateto más corto mide la mitad.`,
            `The hypotenuse is $${2 * k}$: the shortest leg is half of it.`,
          ),
          L(
            `Relaciona $x$ con la hipotenusa usando el ${th === 30 ? "seno" : "coseno"} del ángulo de $${th}°$.`,
            `Relate $x$ to the hypotenuse using the ${th === 30 ? "sine" : "cosine"} of the $${th}°$ angle.`,
          ),
        ],
        answerDisplay: L(`$x = ${k}$`, `$x = ${k}$`),
        solution: [
          step(
            "given",
            `Hipotenusa $= ${2 * k}$, cateto con radical $= ${k}\\sqrt{3}$, ángulo $${th}°$.`,
            `Hypotenuse $= ${2 * k}$, radical leg $= ${k}\\sqrt{3}$, angle $${th}°$.`,
          ),
          step(
            "approach",
            `Usamos la razón trigonométrica que liga $x$ con la hipotenusa.`,
            `Use the trig ratio linking $x$ with the hypotenuse.`,
          ),
          step(
            "calculation",
            th === 30
              ? `$\\operatorname{sen}\\,30° = \\frac{x}{${2 * k}} \\Rightarrow \\frac{1}{2} = \\frac{x}{${2 * k}} \\Rightarrow x = ${k}$`
              : `$\\cos\\,60° = \\frac{x}{${2 * k}} \\Rightarrow \\frac{1}{2} = \\frac{x}{${2 * k}} \\Rightarrow x = ${k}$`,
            th === 30
              ? `$\\sin\\,30° = \\frac{x}{${2 * k}} \\Rightarrow \\frac{1}{2} = \\frac{x}{${2 * k}} \\Rightarrow x = ${k}$`
              : `$\\cos\\,60° = \\frac{x}{${2 * k}} \\Rightarrow \\frac{1}{2} = \\frac{x}{${2 * k}} \\Rightarrow x = ${k}$`,
          ),
          step(
            "result",
            `El lado $x$ mide $${k}$.`,
            `The side $x$ measures $${k}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Right triangle: angle of elevation with √3 (diagram)              */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "trigf-rt-02",
      subject: "math",
      topicId: "trig-foundations",
      subtopicId: "right-triangles",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 240,
      tags: ["elevation", "tangent", "right-triangles", "word-problems"],
      prerequisites: ["radicals", "functions"],
    },
    (rng) => {
      const patternA = rng.bool();
      // k >= 2 keeps every written length realistic (no "1√3" readings)
      const k = rng.int(2, 6);
      // pattern A: θ=60°, shadow k√3 known, height asked
      // pattern B: θ=30°, height k√3 known, shadow asked
      const th = patternA ? 60 : 30;
      const value = 3 * k;
      const aLabel = patternA ? `${k}√3` : "x";
      const bLabel = patternA ? "x" : `${k}√3`;
      return {
        skill: L("Ángulo de elevación", "Angle of elevation"),
        statement: patternA
          ? L(
              `Un árbol proyecta una sombra de $${k}\\sqrt{3}\\ \\text{m}$ y el ángulo de elevación del sol es de $60°$. ¿Cuánto mide el árbol (en metros)?`,
              `A tree casts a shadow of $${k}\\sqrt{3}\\ \\text{m}$ and the sun's angle of elevation is $60°$. How tall is the tree (in metres)?`,
            )
          : L(
              `El ángulo de elevación a la cima de un edificio es de $30°$ y el edificio mide $${k}\\sqrt{3}\\ \\text{m}$ de altura. ¿Cuánto mide la sombra que proyecta (en metros)?`,
              `The angle of elevation to the top of a building is $30°$ and the building is $${k}\\sqrt{3}\\ \\text{m}$ tall. How long is the shadow it casts (in metres)?`,
            ),
        diagram: {
          kind: "right-triangle",
          aLabel,
          bLabel,
          cLabel: "?",
          angleLabel: `${th}°`,
        },
        diagramLabel: L(
          `Triángulo rectángulo con un ángulo de ${th} grados: el cateto horizontal ${patternA ? `mide ${k}√3` : "está marcado como x"} y el cateto vertical ${patternA ? "está marcado como x" : `mide ${k}√3`}.`,
          `Right triangle with a ${th}-degree angle: the horizontal leg ${patternA ? `measures ${k}√3` : "is marked x"} and the vertical leg ${patternA ? "is marked x" : `measures ${k}√3`}.`,
        ),
        answer: { kind: "numeric", value, unitSuffix: "m" },
        hints: [
          L(
            "Usa la tangente: opuesto sobre adyacente.",
            "Use the tangent: opposite over adjacent.",
          ),
          L(
            `Recuerda los valores: $\\tan 60° = \\sqrt{3}$ y $\\tan 30° = \\frac{\\sqrt{3}}{3}$.`,
            `Remember: $\\tan 60° = \\sqrt{3}$ and $\\tan 30° = \\frac{\\sqrt{3}}{3}$.`,
          ),
          L(
            "Despeja la incógnita multiplicando en cruz; los $\\sqrt{3}$ se cancelan.",
            "Isolate the unknown by cross-multiplying; the $\\sqrt{3}$ factors cancel.",
          ),
        ],
        answerDisplay: L(`$x = ${value}\\ \\text{m}$`, `$x = ${value}\\ \\text{m}$`),
        solution: [
          step(
            "given",
            patternA
              ? `Sombra (adyacente) $= ${k}\\sqrt{3}\\ \\text{m}$, ángulo $= 60°$, altura $= x$.`
              : `Altura (opuesto) $= ${k}\\sqrt{3}\\ \\text{m}$, ángulo $= 30°$, sombra $= x$.`,
            patternA
              ? `Shadow (adjacent) $= ${k}\\sqrt{3}\\ \\text{m}$, angle $= 60°$, height $= x$.`
              : `Height (opposite) $= ${k}\\sqrt{3}\\ \\text{m}$, angle $= 30°$, shadow $= x$.`,
          ),
          step(
            "approach",
            "Planteamos la tangente del ángulo y despejamos la incógnita.",
            "Set up the tangent of the angle and solve for the unknown.",
          ),
          step(
            "calculation",
            patternA
              ? `$\\tan 60° = \\frac{x}{${k}\\sqrt{3}} \\Rightarrow \\sqrt{3} = \\frac{x}{${k}\\sqrt{3}}$<br>$x = ${k}\\sqrt{3} \\cdot \\sqrt{3} = ${k} \\cdot 3 = ${value}$`
              : `$\\tan 30° = \\frac{${k}\\sqrt{3}}{x} \\Rightarrow \\frac{\\sqrt{3}}{3} = \\frac{${k}\\sqrt{3}}{x}$<br>$x = \\frac{${k}\\sqrt{3} \\cdot 3}{\\sqrt{3}} = ${k} \\cdot 3 = ${value}$`,
            patternA
              ? `$\\tan 60° = \\frac{x}{${k}\\sqrt{3}} \\Rightarrow \\sqrt{3} = \\frac{x}{${k}\\sqrt{3}}$<br>$x = ${k}\\sqrt{3} \\cdot \\sqrt{3} = ${k} \\cdot 3 = ${value}$`
              : `$\\tan 30° = \\frac{${k}\\sqrt{3}}{x} \\Rightarrow \\frac{\\sqrt{3}}{3} = \\frac{${k}\\sqrt{3}}{x}$<br>$x = \\frac{${k}\\sqrt{3} \\cdot 3}{\\sqrt{3}} = ${k} \\cdot 3 = ${value}$`,
          ),
          step(
            "result",
            `La medida pedida es $${value}\\ \\text{m}$.`,
            `The requested length is $${value}\\ \\text{m}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* (cos, sin) both given → angle (MC)                                */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "trigf-quad-01",
      subject: "math",
      topicId: "trig-foundations",
      subtopicId: "unit-circle",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 210,
      tags: ["unit-circle", "quadrants", "exact-values"],
      prerequisites: ["radicals", "functions"],
    },
    (rng) => {
      const th = rng.pick([30, 150, 210, 330]);
      const [c, s] = PT[th];
      const options: McOption[] = [30, 150, 210, 330].map((a) => ({
        id: `o${a}`,
        text: L(`$${a}°$`, `$${a}°$`),
        correct: a === th,
      }));
      return {
        skill: L("Hallar el ángulo desde seno y coseno", "Finding the angle from sine and cosine"),
        statement: L(
          `Si $\\cos\\theta = ${c}$ y $\\operatorname{sen}\\theta = ${s}$ con $0° \\le \\theta < 360°$, ¿cuál es el valor de $\\theta$?`,
          `If $\\cos\\theta = ${c}$ and $\\sin\\theta = ${s}$ with $0° \\le \\theta < 360°$, what is the value of $\\theta$?`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Los **signos** de seno y coseno indican el cuadrante.",
            "The **signs** of sine and cosine reveal the quadrant.",
          ),
          L(
            "Los valores absolutos $\\frac{\\sqrt{3}}{2}$ y $\\frac{1}{2}$ corresponden a un ángulo de referencia de $30°$.",
            "The absolute values $\\frac{\\sqrt{3}}{2}$ and $\\frac{1}{2}$ correspond to a reference angle of $30°$.",
          ),
          L(
            "Combina cuadrante y ángulo de referencia para obtener $\\theta$.",
            "Combine the quadrant and the reference angle to obtain $\\theta$.",
          ),
        ],
        answerDisplay: L(`$\\theta = ${th}°$`, `$\\theta = ${th}°$`),
        solution: [
          step(
            "given",
            `$\\cos\\theta = ${c}$, $\\operatorname{sen}\\theta = ${s}$.`,
            `$\\cos\\theta = ${c}$, $\\sin\\theta = ${s}$.`,
          ),
          step(
            "approach",
            "Analizamos los signos (cuadrante) y los valores absolutos (ángulo de referencia).",
            "Analyze the signs (quadrant) and the absolute values (reference angle).",
          ),
          step(
            "calculation",
            `$\\cos\\theta$ ${c.startsWith("-") ? "negativo" : "positivo"} y $\\operatorname{sen}\\theta$ ${s.startsWith("-") ? "negativo" : "positivo"}.<br>Valores absolutos $\\frac{\\sqrt{3}}{2}$ y $\\frac{1}{2}$: ángulo de referencia $30°$.<br>$\\theta = 30°$ en el cuadrante con esos signos.`,
            `$\\cos\\theta$ ${c.startsWith("-") ? "negative" : "positive"} and $\\sin\\theta$ ${s.startsWith("-") ? "negative" : "positive"}.<br>Absolute values $\\frac{\\sqrt{3}}{2}$ and $\\frac{1}{2}$: reference angle $30°$.<br>$\\theta = 30°$ placed in the quadrant with those signs.`,
          ),
          step(
            "result",
            `$\\theta = ${th}°$.`,
            `$\\theta = ${th}°$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Challenge: quadrant + one ratio → the other (expression)          */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "trigf-chal-01",
      subject: "math",
      topicId: "trig-foundations",
      subtopicId: "exact-values",
      difficulty: "challenge",
      questionType: "expression",
      estimatedTimeSec: 300,
      tags: ["quadrants", "exact-values", "signs"],
      prerequisites: ["radicals", "functions"],
    },
    (rng) => {
      const q = rng.pick([2, 3, 4]);
      const givenSen = rng.bool();
      const ref = rng.pick([30, 60]);
      const sinSign = q === 2 ? 1 : -1;
      const cosSign = q === 4 ? 1 : -1;
      const half = "1/2";
      const root = "sqrt(3)/2";
      const senMag = ref === 30 ? half : root;
      const cosMag = ref === 30 ? root : half;
      const halfLat = "\\frac{1}{2}";
      const rootLat = "\\frac{\\sqrt{3}}{2}";
      const senMagLat = ref === 30 ? halfLat : rootLat;
      const cosMagLat = ref === 30 ? rootLat : halfLat;
      const givenMag = givenSen ? senMag : cosMag;
      const givenSign = givenSen ? sinSign : cosSign;
      const askMag = givenSen ? cosMag : senMag;
      const askSign = givenSen ? cosSign : sinSign;
      const givenStr = (givenSign < 0 ? "-" : "") + givenMag;
      const askStr = (askSign < 0 ? "-" : "") + askMag;
      const accepted =
        askStr === "1/2"
          ? ["1/2", "0.5"]
          : askStr === "-1/2"
            ? ["-1/2", "-0.5"]
            : [askStr];
      const givenLat = (givenSign < 0 ? "-" : "") + (givenSen ? senMagLat : cosMagLat);
      const askLat = (askSign < 0 ? "-" : "") + (givenSen ? cosMagLat : senMagLat);
      const givenNameEs = givenSen ? "\\operatorname{sen}" : "\\cos";
      const givenNameEn = givenSen ? "\\sin" : "\\cos";
      const askNameEs = givenSen ? "\\cos" : "\\operatorname{sen}";
      const askNameEn = givenSen ? "\\cos" : "\\sin";
      const quadEs = q === 2 ? "segundo" : q === 3 ? "tercer" : "cuarto";
      const quadEn = q === 2 ? "second" : q === 3 ? "third" : "fourth";
      return {
        skill: L("Signos y valores exactos por cuadrante", "Signs and exact values by quadrant"),
        statement: L(
          `$\\theta$ es un ángulo del ${quadEs} cuadrante con $${givenNameEs}\\,\\theta = ${givenLat}$. Calcula $${askNameEs}\\,\\theta$. (Responde con uno de estos formatos: 1/2, -1/2, sqrt(3)/2, -sqrt(3)/2.)`,
          `$\\theta$ is an angle in the ${quadEn} quadrant with $${givenNameEn}\\,\\theta = ${givenLat}$. Compute $${askNameEn}\\,\\theta$. (Answer with one of these formats: 1/2, -1/2, sqrt(3)/2, -sqrt(3)/2.)`,
        ),
        answer: { kind: "expression", accepted, variables: [] },
        hints: [
          L(
            "Los valores absolutos $\\frac{1}{2}$ y $\\frac{\\sqrt{3}}{2}$ vienen de un ángulo de referencia de $30°$ o de $60°$.",
            "The absolute values $\\frac{1}{2}$ and $\\frac{\\sqrt{3}}{2}$ come from a reference angle of $30°$ or $60°$.",
          ),
          L(
            "El cuadrante decide los signos de seno y coseno.",
            "The quadrant decides the signs of sine and cosine.",
          ),
          L(
            "Sen y cos intercambian papeles entre 30° y 60°: si uno vale $\\frac{1}{2}$, el otro vale $\\frac{\\sqrt{3}}{2}$ en valor absoluto.",
            "Sine and cosine swap roles between 30° and 60°: if one equals $\\frac{1}{2}$, the other equals $\\frac{\\sqrt{3}}{2}$ in absolute value.",
          ),
        ],
        answerDisplay: L(
          `$${askNameEs}\\,\\theta = ${askLat}$`,
          `$${askNameEn}\\,\\theta = ${askLat}$`,
        ),
        solution: [
          step(
            "given",
            `$\\theta$ en el ${quadEs} cuadrante; $${givenNameEs}\\,\\theta = ${givenLat}$.`,
            `$\\theta$ in the ${quadEn} quadrant; $${givenNameEn}\\,\\theta = ${givenLat}$.`,
          ),
          step(
            "approach",
            "El valor absoluto dado fija el ángulo de referencia; el cuadrante fija el signo del resultado.",
            "The given absolute value fixes the reference angle; the quadrant fixes the sign of the result.",
          ),
          step(
            "calculation",
            `Ángulo de referencia: $${ref}°$.<br>En el cuadrante ${q}: $\\cos$ ${cosSign < 0 ? "negativo" : "positivo"}, $\\operatorname{sen}$ ${sinSign < 0 ? "negativo" : "positivo"}.<br>El otro valor (en valor absoluto) es ${askMag === "1/2" ? "$\\frac{1}{2}$" : "$\\frac{\\sqrt{3}}{2}$"} con su signo del cuadrante.`,
            `Reference angle: $${ref}°$.<br>In quadrant ${q}: $\\cos$ ${cosSign < 0 ? "negative" : "positive"}, $\\sin$ ${sinSign < 0 ? "negative" : "positive"}.<br>The other value (in absolute value) is ${askMag === "1/2" ? "$\\frac{1}{2}$" : "$\\frac{\\sqrt{3}}{2}$"} with its quadrant sign.`,
          ),
          step(
            "result",
            `$${askNameEs}\\,\\theta = ${askLat}$.`,
            `$${askNameEn}\\,\\theta = ${askLat}$.`,
          ),
        ],
      };
    },
  ),
];
