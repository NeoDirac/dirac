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

  /* ---------------------------------------------------------------- */
  /* Cap. 4 «Trigonometría» (ed. digital), Ejercicios propuestos       */
  /* pp. 467-468 y 471 — ítems 10-14, 25 y 30. Tutor: «lo de           */
  /* trigonometría». Clave impresa (p. 940) + sympy:                   */
  /* download/verify_espol_ch4.py (checks ch4-10..14, 25, 30).         */
  /* ---------------------------------------------------------------- */

  /* 4·10 — suplemento = 4·complemento → x = 60°. */
  template(
    {
      id: "trigf-espol-ch4-10",
      subject: "math",
      topicId: "trig-foundations",
      subtopicId: "degrees-radians",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 180,
      tags: ["supplementary-angles", "complementary-angles", "modeling"],
      prerequisites: ["degrees-radians"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "4 · 10",
        page: 467,
      },
      reasoning: "modeling",
    },
    () => ({
      skill: L("Modelar suplemento y complemento", "Modeling supplement and complement"),
      statement: L(
        "Determine la medida del ángulo en el cual la medida de su suplemento es 4 veces la medida de su complemento.",
        "Determine the measure of the angle for which the measure of its supplement is 4 times the measure of its complement.",
      ),
      answer: { kind: "numeric", value: 60, unitSuffix: "°" },
      hints: [
        L(
          "Llama $x$ al ángulo buscado: su suplemento mide $180 - x$ y su complemento mide $90 - x$ (en grados).",
          "Call the unknown angle $x$: its supplement measures $180 - x$ and its complement measures $90 - x$ (in degrees).",
        ),
        L(
          "La frase «el suplemento es 4 veces el complemento» se traduce en una ecuación lineal en $x$.",
          "The phrase “the supplement is 4 times the complement” translates into a linear equation in $x$.",
        ),
        L(
          "Al expandir $4(90 - x)$ y agrupar, los términos en $x$ quedan en un solo miembro.",
          "After expanding $4(90 - x)$ and grouping, the $x$ terms end up on one side.",
        ),
      ],
      answerDisplay: L("$x = 60°$", "$x = 60°$"),
      solution: [
        step(
          "given",
          "Ángulo desconocido $x$ (en grados); suplemento $= 180 - x$, complemento $= 90 - x$.",
          "Unknown angle $x$ (in degrees); supplement $= 180 - x$, complement $= 90 - x$.",
        ),
        step(
          "approach",
          "Traducimos la condición del enunciado a la ecuación $180 - x = 4(90 - x)$ y despejamos $x$.",
          "Translate the condition into the equation $180 - x = 4(90 - x)$ and solve for $x$.",
        ),
        step(
          "calculation",
          "$180 - x = 4(90 - x) \\Rightarrow 180 - x = 360 - 4x \\Rightarrow 4x - x = 360 - 180 \\Rightarrow 3x = 180 \\Rightarrow x = 60$",
          "$180 - x = 4(90 - x) \\Rightarrow 180 - x = 360 - 4x \\Rightarrow 4x - x = 360 - 180 \\Rightarrow 3x = 180 \\Rightarrow x = 60$",
        ),
        step(
          "result",
          "El ángulo mide $x = 60°$. Verificación: suplemento $= 120°$, complemento $= 30°$ y $120 = 4 \\cdot 30$ ✓.",
          "The angle measures $x = 60°$. Check: supplement $= 120°$, complement $= 30°$, and $120 = 4 \\cdot 30$ ✓.",
        ),
      ],
    }),
  ),

  /* 4·11 — 8 ángulos congruentes suman 180° → cada uno π/8 rad. */
  template(
    {
      id: "trigf-espol-ch4-11",
      subject: "math",
      topicId: "trig-foundations",
      subtopicId: "degrees-radians",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["congruent-angles", "radians", "conversion"],
      prerequisites: ["degrees-radians"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "4 · 11",
        page: 467,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$\\dfrac{\\pi}{8}$", "$\\dfrac{\\pi}{8}$"), correct: true },
        { id: "b", text: L("$\\dfrac{\\pi}{4}$", "$\\dfrac{\\pi}{4}$"), correct: false },
        { id: "c", text: L("$\\dfrac{\\pi}{6}$", "$\\dfrac{\\pi}{6}$"), correct: false },
        { id: "d", text: L("$\\dfrac{\\pi}{16}$", "$\\dfrac{\\pi}{16}$"), correct: false },
      ];
      return {
        skill: L("Ángulos congruentes en radianes", "Congruent angles in radians"),
        statement: L(
          "Si la suma de las medidas de ocho ángulos congruentes es 180°, ¿cuánto mide cada ángulo en radianes?",
          "If the sum of the measures of eight congruent angles is 180°, how much does each angle measure in radians?",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "«Congruentes» significa que los ocho ángulos tienen exactamente la misma medida.",
            "“Congruent” means the eight angles have exactly the same measure.",
          ),
          L(
            "Si cada ángulo mide $x$ grados, la suma es $8x = 180°$.",
            "If each angle measures $x$ degrees, the sum is $8x = 180°$.",
          ),
          L(
            "Cada ángulo es la mitad de $45°$, cuyo valor en radianes ya conoces.",
            "Each angle is half of $45°$, whose radian value you already know.",
          ),
        ],
        answerDisplay: L("$\\dfrac{\\pi}{8}$ rad", "$\\dfrac{\\pi}{8}$ rad"),
        solution: [
          step(
            "given",
            "Suma de las medidas de 8 ángulos congruentes $= 180°$.",
            "Sum of the measures of 8 congruent angles $= 180°$.",
          ),
          step(
            "approach",
            "Dividimos la suma entre 8 para obtener cada ángulo en grados y luego convertimos a radianes.",
            "Divide the sum by 8 to get each angle in degrees, then convert to radians.",
          ),
          step(
            "calculation",
            "$x = \\dfrac{180°}{8} = 22{,}5°$<br>$22{,}5° \\cdot \\dfrac{\\pi}{180°} = \\dfrac{22{,}5\\pi}{180} = \\dfrac{45\\pi}{360} = \\dfrac{\\pi}{8}$",
            "$x = \\dfrac{180°}{8} = 22.5°$<br>$22.5° \\cdot \\dfrac{\\pi}{180°} = \\dfrac{22.5\\pi}{180} = \\dfrac{45\\pi}{360} = \\dfrac{\\pi}{8}$",
          ),
          step(
            "result",
            "Cada ángulo mide $\\dfrac{\\pi}{8}$ rad. Verificación: $8 \\cdot \\dfrac{\\pi}{8} = \\pi = 180°$ ✓.",
            "Each angle measures $\\dfrac{\\pi}{8}$ rad. Check: $8 \\cdot \\dfrac{\\pi}{8} = \\pi = 180°$ ✓.",
          ),
        ],
      };
    },
  ),

  /* 4·12 — suplementario de x = 123° → x = 57°, complementario 33°. */
  template(
    {
      id: "trigf-espol-ch4-12",
      subject: "math",
      topicId: "trig-foundations",
      subtopicId: "degrees-radians",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["supplementary-angles", "complementary-angles", "degrees"],
      prerequisites: ["degrees-radians"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "4 · 12",
        page: 467,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$57°$ y $33°$", "$57°$ and $33°$"), correct: true },
        { id: "b", text: L("$67°$ y $23°$", "$67°$ and $23°$"), correct: false },
        { id: "c", text: L("$57°$ y $23°$", "$57°$ and $23°$"), correct: false },
        { id: "d", text: L("$67°$ y $33°$", "$67°$ and $33°$"), correct: false },
      ];
      return {
        skill: L("Suplementario y complementario", "Supplementary and complementary"),
        statement: L(
          "La medida del ángulo suplementario de $x$ es igual a 123°. Hallar la medida del ángulo $x$ y la de su ángulo complementario.",
          "The measure of the supplementary angle of $x$ equals 123°. Find the measure of angle $x$ and of its complementary angle.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Dos ángulos suplementarios suman $180°$; dos complementarios suman $90°$.",
            "Two supplementary angles add up to $180°$; two complementary angles add up to $90°$.",
          ),
          L(
            "Usa primero la condición del suplementario para hallar $x$.",
            "Use the supplementary condition first to find $x$.",
          ),
          L(
            "El complementario se resta desde $90°$, no desde $180°$.",
            "The complement is taken from $90°$, not from $180°$.",
          ),
        ],
        answerDisplay: L(
          "$x = 57°$, complementario $= 33°$",
          "$x = 57°$, complement $= 33°$",
        ),
        solution: [
          step(
            "given",
            "El ángulo suplementario de $x$ mide $123°$.",
            "The supplementary angle of $x$ measures $123°$.",
          ),
          step(
            "approach",
            "Planteamos $x + 123° = 180°$ para hallar $x$ y después restamos desde $90°$ para el complementario.",
            "Set up $x + 123° = 180°$ to find $x$, then subtract from $90°$ for the complement.",
          ),
          step(
            "calculation",
            "$x = 180° - 123° = 57°$<br>complementario $= 90° - 57° = 33°$",
            "$x = 180° - 123° = 57°$<br>complement $= 90° - 57° = 33°$",
          ),
          step(
            "result",
            "$x = 57°$ y su complementario mide $33°$. Verificación: $57° + 123° = 180°$ ✓ y $57° + 33° = 90°$ ✓.",
            "$x = 57°$ and its complement measures $33°$. Check: $57° + 123° = 180°$ ✓ and $57° + 33° = 90°$ ✓.",
          ),
        ],
      };
    },
  ),

  /* 4·13b — producto de 4 razones notables → −1/12. */
  template(
    {
      id: "trigf-espol-ch4-13b",
      subject: "math",
      topicId: "trig-foundations",
      subtopicId: "exact-values",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["exact-values", "special-angles", "signs"],
      prerequisites: ["exact-values", "unit-circle"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "4 · 13b",
        page: 468,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$-\\dfrac{1}{12}$", "$-\\dfrac{1}{12}$"), correct: true },
        { id: "b", text: L("$\\dfrac{1}{12}$", "$\\dfrac{1}{12}$"), correct: false },
        { id: "c", text: L("$-\\dfrac{1}{6}$", "$-\\dfrac{1}{6}$"), correct: false },
        { id: "d", text: L("$\\dfrac{1}{6}$", "$\\dfrac{1}{6}$"), correct: false },
      ];
      return {
        skill: L("Producto de valores exactos", "Product of exact values"),
        statement: L(
          "Calcule: $\\operatorname{sen}\\dfrac{5\\pi}{6}\\cdot\\cos\\dfrac{4\\pi}{3}\\cdot\\left(-\\tan\\dfrac{\\pi}{6}\\right)\\cdot\\tan(330°)$",
          "Compute: $\\sin\\dfrac{5\\pi}{6}\\cdot\\cos\\dfrac{4\\pi}{3}\\cdot\\left(-\\tan\\dfrac{\\pi}{6}\\right)\\cdot\\tan(330°)$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Cada factor es un ángulo notable: reduce cada uno a su ángulo de referencia.",
            "Each factor involves a special angle: reduce each one to its reference angle.",
          ),
          L(
            "$\\dfrac{4\\pi}{3} = 240°$ (tercer cuadrante) y $330°$ (cuarto cuadrante): decide el signo de cada factor por cuadrante.",
            "$\\dfrac{4\\pi}{3} = 240°$ (third quadrant) and $330°$ (fourth quadrant): fix each factor's sign by quadrant.",
          ),
          L(
            "Cuenta los signos antes de multiplicar: hay tres factores negativos, así que el producto es negativo.",
            "Count the signs before multiplying: there are three negative factors, so the product is negative.",
          ),
        ],
        answerDisplay: L("$-\\dfrac{1}{12}$", "$-\\dfrac{1}{12}$"),
        solution: [
          step(
            "given",
            "Producto de cuatro razones con ángulos notables: $\\dfrac{5\\pi}{6}$, $\\dfrac{4\\pi}{3}$, $\\dfrac{\\pi}{6}$ y $330°$.",
            "Product of four ratios with special angles: $\\dfrac{5\\pi}{6}$, $\\dfrac{4\\pi}{3}$, $\\dfrac{\\pi}{6}$ and $330°$.",
          ),
          step(
            "approach",
            "Evaluamos cada factor (valor absoluto por ángulo de referencia, signo por cuadrante) y luego multiplicamos.",
            "Evaluate each factor (absolute value from the reference angle, sign from the quadrant), then multiply.",
          ),
          step(
            "calculation",
            "$\\operatorname{sen}\\dfrac{5\\pi}{6} = \\dfrac{1}{2}$, $\\cos\\dfrac{4\\pi}{3} = -\\dfrac{1}{2}$, $-\\tan\\dfrac{\\pi}{6} = -\\dfrac{\\sqrt{3}}{3}$, $\\tan(330°) = -\\dfrac{\\sqrt{3}}{3}$<br>$\\dfrac{1}{2}\\cdot\\left(-\\dfrac{1}{2}\\right)\\cdot\\left(-\\dfrac{\\sqrt{3}}{3}\\right)\\cdot\\left(-\\dfrac{\\sqrt{3}}{3}\\right) = -\\dfrac{1}{4}\\cdot\\dfrac{3}{9} = -\\dfrac{1}{12}$",
            "$\\sin\\dfrac{5\\pi}{6} = \\dfrac{1}{2}$, $\\cos\\dfrac{4\\pi}{3} = -\\dfrac{1}{2}$, $-\\tan\\dfrac{\\pi}{6} = -\\dfrac{\\sqrt{3}}{3}$, $\\tan(330°) = -\\dfrac{\\sqrt{3}}{3}$<br>$\\dfrac{1}{2}\\cdot\\left(-\\dfrac{1}{2}\\right)\\cdot\\left(-\\dfrac{\\sqrt{3}}{3}\\right)\\cdot\\left(-\\dfrac{\\sqrt{3}}{3}\\right) = -\\dfrac{1}{4}\\cdot\\dfrac{3}{9} = -\\dfrac{1}{12}$",
          ),
          step(
            "result",
            "El producto es $-\\dfrac{1}{12}$. Verificación numérica: $0{,}5\\cdot(-0{,}5)\\cdot(-0{,}577)\\cdot(-0{,}577) \\approx -0{,}0833 = -\\dfrac{1}{12}$ ✓.",
            "The product is $-\\dfrac{1}{12}$. Numeric check: $0.5\\cdot(-0.5)\\cdot(-0.577)\\cdot(-0.577) \\approx -0.0833 = -\\dfrac{1}{12}$ ✓.",
          ),
        ],
      };
    },
  ),

  /* 4·13c — 3cos(π/6)+sen(5π/6)−tan(π/3) → (√3+1)/2. */
  template(
    {
      id: "trigf-espol-ch4-13c",
      subject: "math",
      topicId: "trig-foundations",
      subtopicId: "exact-values",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 180,
      tags: ["exact-values", "special-angles", "simplification"],
      prerequisites: ["exact-values"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "4 · 13c",
        page: 468,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$\\dfrac{\\sqrt{3}+1}{2}$", "$\\dfrac{\\sqrt{3}+1}{2}$"), correct: true },
        { id: "b", text: L("$\\dfrac{\\sqrt{3}-1}{2}$", "$\\dfrac{\\sqrt{3}-1}{2}$"), correct: false },
        { id: "c", text: L("$\\dfrac{1-\\sqrt{3}}{2}$", "$\\dfrac{1-\\sqrt{3}}{2}$"), correct: false },
        { id: "d", text: L("$\\dfrac{\\sqrt{3}+2}{2}$", "$\\dfrac{\\sqrt{3}+2}{2}$"), correct: false },
      ];
      return {
        skill: L("Suma de valores exactos", "Sum of exact values"),
        statement: L(
          "Calcule: $3\\cos\\dfrac{\\pi}{6}+\\operatorname{sen}\\dfrac{5\\pi}{6}-\\tan\\dfrac{\\pi}{3}$",
          "Compute: $3\\cos\\dfrac{\\pi}{6}+\\sin\\dfrac{5\\pi}{6}-\\tan\\dfrac{\\pi}{3}$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Los tres ángulos $\\dfrac{\\pi}{6}$, $\\dfrac{5\\pi}{6}$ y $\\dfrac{\\pi}{3}$ son notables.",
            "The three angles $\\dfrac{\\pi}{6}$, $\\dfrac{5\\pi}{6}$ and $\\dfrac{\\pi}{3}$ are special angles.",
          ),
          L(
            "Por simetría en el segundo cuadrante, $\\operatorname{sen}\\dfrac{5\\pi}{6} = \\operatorname{sen}\\dfrac{\\pi}{6}$.",
            "By second-quadrant symmetry, $\\sin\\dfrac{5\\pi}{6} = \\sin\\dfrac{\\pi}{6}$.",
          ),
          L(
            "Reúne los términos con $\\sqrt{3}$ y el término racional antes de escribir todo sobre 2.",
            "Gather the $\\sqrt{3}$ terms and the rational term before writing everything over 2.",
          ),
        ],
        answerDisplay: L("$\\dfrac{\\sqrt{3}+1}{2}$", "$\\dfrac{\\sqrt{3}+1}{2}$"),
        solution: [
          step(
            "given",
            "Suma de tres términos con ángulos notables en radianes.",
            "Sum of three terms with special angles in radians.",
          ),
          step(
            "approach",
            "Sustituimos los valores exactos de la tabla y agrupamos los términos semejantes.",
            "Substitute the exact table values and gather like terms.",
          ),
          step(
            "calculation",
            "$3\\cdot\\dfrac{\\sqrt{3}}{2}+\\dfrac{1}{2}-\\sqrt{3} = \\dfrac{3\\sqrt{3}}{2}+\\dfrac{1}{2}-\\dfrac{2\\sqrt{3}}{2} = \\dfrac{\\sqrt{3}+1}{2}$",
            "$3\\cdot\\dfrac{\\sqrt{3}}{2}+\\dfrac{1}{2}-\\sqrt{3} = \\dfrac{3\\sqrt{3}}{2}+\\dfrac{1}{2}-\\dfrac{2\\sqrt{3}}{2} = \\dfrac{\\sqrt{3}+1}{2}$",
          ),
          step(
            "result",
            "El valor es $\\dfrac{\\sqrt{3}+1}{2}$. Verificación numérica: $3\\cdot0{,}866+0{,}5-1{,}732 \\approx 1{,}366 = \\dfrac{\\sqrt{3}+1}{2}$ ✓.",
            "The value is $\\dfrac{\\sqrt{3}+1}{2}$. Numeric check: $3\\cdot0.866+0.5-1.732 \\approx 1.366 = \\dfrac{\\sqrt{3}+1}{2}$ ✓.",
          ),
        ],
      };
    },
  ),

  /* 4·13d — tan²(π/6)−cos²(2π/3)−tan(3π/4) → 13/12. */
  template(
    {
      id: "trigf-espol-ch4-13d",
      subject: "math",
      topicId: "trig-foundations",
      subtopicId: "exact-values",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 180,
      tags: ["exact-values", "special-angles", "signs"],
      prerequisites: ["exact-values", "unit-circle"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "4 · 13d",
        page: 468,
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$\\dfrac{13}{12}$", "$\\dfrac{13}{12}$"), correct: true },
        { id: "b", text: L("$\\dfrac{1}{12}$", "$\\dfrac{1}{12}$"), correct: false },
        { id: "c", text: L("$\\dfrac{7}{12}$", "$\\dfrac{7}{12}$"), correct: false },
        { id: "d", text: L("$-\\dfrac{11}{12}$", "$-\\dfrac{11}{12}$"), correct: false },
      ];
      return {
        skill: L("Potencias de razones exactas", "Powers of exact ratios"),
        statement: L(
          "Calcule: $\\tan^{2}\\dfrac{\\pi}{6}-\\cos^{2}\\dfrac{2\\pi}{3}-\\tan\\dfrac{3\\pi}{4}$",
          "Compute: $\\tan^{2}\\dfrac{\\pi}{6}-\\cos^{2}\\dfrac{2\\pi}{3}-\\tan\\dfrac{3\\pi}{4}$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Elevar al cuadrado elimina el signo: $\\cos^{2}$ de un valor negativo da positivo.",
            "Squaring removes the sign: $\\cos^{2}$ of a negative value is positive.",
          ),
          L(
            "En el segundo cuadrante la tangente es negativa: $\\tan\\dfrac{3\\pi}{4} = -1$.",
            "In the second quadrant the tangent is negative: $\\tan\\dfrac{3\\pi}{4} = -1$.",
          ),
          L(
            "Cuidado con el signo doble: restar $\\tan\\dfrac{3\\pi}{4}$ es restar $-1$, es decir, sumar 1.",
            "Watch the double sign: subtracting $\\tan\\dfrac{3\\pi}{4}$ means subtracting $-1$, i.e. adding 1.",
          ),
        ],
        answerDisplay: L("$\\dfrac{13}{12}$", "$\\dfrac{13}{12}$"),
        solution: [
          step(
            "given",
            "Expresión con potencias cuadradas de razones notables.",
            "Expression with squared special-angle ratios.",
          ),
          step(
            "approach",
            "Evaluamos cada potencia —el cuadrado borra los signos— y luego operamos.",
            "Evaluate each power —squaring kills the signs— and then combine.",
          ),
          step(
            "calculation",
            "$\\tan^{2}\\dfrac{\\pi}{6} = \\left(\\dfrac{\\sqrt{3}}{3}\\right)^{2} = \\dfrac{1}{3}$, $\\cos^{2}\\dfrac{2\\pi}{3} = \\left(-\\dfrac{1}{2}\\right)^{2} = \\dfrac{1}{4}$, $\\tan\\dfrac{3\\pi}{4} = -1$<br>$\\dfrac{1}{3}-\\dfrac{1}{4}-(-1) = \\dfrac{4}{12}-\\dfrac{3}{12}+\\dfrac{12}{12} = \\dfrac{13}{12}$",
            "$\\tan^{2}\\dfrac{\\pi}{6} = \\left(\\dfrac{\\sqrt{3}}{3}\\right)^{2} = \\dfrac{1}{3}$, $\\cos^{2}\\dfrac{2\\pi}{3} = \\left(-\\dfrac{1}{2}\\right)^{2} = \\dfrac{1}{4}$, $\\tan\\dfrac{3\\pi}{4} = -1$<br>$\\dfrac{1}{3}-\\dfrac{1}{4}-(-1) = \\dfrac{4}{12}-\\dfrac{3}{12}+\\dfrac{12}{12} = \\dfrac{13}{12}$",
          ),
          step(
            "result",
            "El valor es $\\dfrac{13}{12}$. Verificación: $0{,}333-0{,}25+1 = 1{,}083 = \\dfrac{13}{12}$ ✓.",
            "The value is $\\dfrac{13}{12}$. Check: $0.333-0.25+1 = 1.083 = \\dfrac{13}{12}$ ✓.",
          ),
        ],
      };
    },
  ),

  /* 4·13e — (sen120°+cos240°)/(tan60°+tan330°) → (3−√3)/4. */
  template(
    {
      id: "trigf-espol-ch4-13e",
      subject: "math",
      topicId: "trig-foundations",
      subtopicId: "exact-values",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["exact-values", "special-angles", "fractions"],
      prerequisites: ["exact-values", "unit-circle"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "4 · 13e",
        page: 468,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$\\dfrac{3-\\sqrt{3}}{4}$", "$\\dfrac{3-\\sqrt{3}}{4}$"), correct: true },
        { id: "b", text: L("$\\dfrac{3+\\sqrt{3}}{4}$", "$\\dfrac{3+\\sqrt{3}}{4}$"), correct: false },
        { id: "c", text: L("$\\dfrac{\\sqrt{3}-3}{4}$", "$\\dfrac{\\sqrt{3}-3}{4}$"), correct: false },
        { id: "d", text: L("$\\dfrac{1-\\sqrt{3}}{2}$", "$\\dfrac{1-\\sqrt{3}}{2}$"), correct: false },
      ];
      return {
        skill: L("Cociente de valores exactos", "Quotient of exact values"),
        statement: L(
          "Calcule: $\\dfrac{\\operatorname{sen}(120°)+\\cos(240°)}{\\tan(60°)+\\tan(330°)}$",
          "Compute: $\\dfrac{\\sin(120°)+\\cos(240°)}{\\tan(60°)+\\tan(330°)}$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Evalúa numerador y denominador por separado, con ángulo de referencia y signo por cuadrante.",
            "Evaluate the numerator and the denominator separately, using reference angles and quadrant signs.",
          ),
          L(
            "En el denominador conviene escribir $\\sqrt{3} = \\dfrac{3\\sqrt{3}}{3}$ antes de restar $\\dfrac{\\sqrt{3}}{3}$.",
            "In the denominator it helps to write $\\sqrt{3} = \\dfrac{3\\sqrt{3}}{3}$ before subtracting $\\dfrac{\\sqrt{3}}{3}$.",
          ),
          L(
            "Dividir entre $\\dfrac{2\\sqrt{3}}{3}$ es multiplicar por su recíproco; al simplificar usa $\\sqrt{3}\\cdot\\sqrt{3} = 3$.",
            "Dividing by $\\dfrac{2\\sqrt{3}}{3}$ means multiplying by its reciprocal; when simplifying use $\\sqrt{3}\\cdot\\sqrt{3} = 3$.",
          ),
        ],
        answerDisplay: L("$\\dfrac{3-\\sqrt{3}}{4}$", "$\\dfrac{3-\\sqrt{3}}{4}$"),
        solution: [
          step(
            "given",
            "Cociente de dos combinaciones con ángulos $120°$, $240°$, $60°$ y $330°$.",
            "Quotient of two combinations with angles $120°$, $240°$, $60°$ and $330°$.",
          ),
          step(
            "approach",
            "Calculamos numerador y denominador por separado y dividimos multiplicando por el recíproco.",
            "Compute the numerator and the denominator separately, then divide by multiplying by the reciprocal.",
          ),
          step(
            "calculation",
            "Numerador: $\\dfrac{\\sqrt{3}}{2}+\\left(-\\dfrac{1}{2}\\right) = \\dfrac{\\sqrt{3}-1}{2}$<br>Denominador: $\\sqrt{3}+\\left(-\\dfrac{\\sqrt{3}}{3}\\right) = \\dfrac{3\\sqrt{3}-\\sqrt{3}}{3} = \\dfrac{2\\sqrt{3}}{3}$<br>Cociente: $\\dfrac{\\sqrt{3}-1}{2}\\cdot\\dfrac{3}{2\\sqrt{3}} = \\dfrac{3(\\sqrt{3}-1)}{4\\sqrt{3}} = \\dfrac{\\sqrt{3}(\\sqrt{3}-1)}{4} = \\dfrac{3-\\sqrt{3}}{4}$",
            "Numerator: $\\dfrac{\\sqrt{3}}{2}+\\left(-\\dfrac{1}{2}\\right) = \\dfrac{\\sqrt{3}-1}{2}$<br>Denominator: $\\sqrt{3}+\\left(-\\dfrac{\\sqrt{3}}{3}\\right) = \\dfrac{3\\sqrt{3}-\\sqrt{3}}{3} = \\dfrac{2\\sqrt{3}}{3}$<br>Quotient: $\\dfrac{\\sqrt{3}-1}{2}\\cdot\\dfrac{3}{2\\sqrt{3}} = \\dfrac{3(\\sqrt{3}-1)}{4\\sqrt{3}} = \\dfrac{\\sqrt{3}(\\sqrt{3}-1)}{4} = \\dfrac{3-\\sqrt{3}}{4}$",
          ),
          step(
            "result",
            "El valor es $\\dfrac{3-\\sqrt{3}}{4}$. Verificación numérica: $\\dfrac{0{,}866-0{,}5}{1{,}732-0{,}577} = \\dfrac{0{,}366}{1{,}155} \\approx 0{,}317 = \\dfrac{3-\\sqrt{3}}{4}$ ✓.",
            "The value is $\\dfrac{3-\\sqrt{3}}{4}$. Numeric check: $\\dfrac{0.866-0.5}{1.732-0.577} = \\dfrac{0.366}{1.155} \\approx 0.317 = \\dfrac{3-\\sqrt{3}}{4}$ ✓.",
          ),
        ],
      };
    },
  ),

  /* 4·13f — fracción de potencias cuadradas → 1/4. */
  template(
    {
      id: "trigf-espol-ch4-13f",
      subject: "math",
      topicId: "trig-foundations",
      subtopicId: "exact-values",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["exact-values", "special-angles", "powers"],
      prerequisites: ["exact-values", "unit-circle"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "4 · 13f",
        page: 468,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$\\dfrac{1}{4}$", "$\\dfrac{1}{4}$"), correct: true },
        { id: "b", text: L("$\\dfrac{1}{2}$", "$\\dfrac{1}{2}$"), correct: false },
        { id: "c", text: L("$1$", "$1$"), correct: false },
        { id: "d", text: L("$-\\dfrac{1}{4}$", "$-\\dfrac{1}{4}$"), correct: false },
      ];
      return {
        skill: L("Fracción de potencias exactas", "Fraction of exact powers"),
        statement: L(
          "Calcule: $\\dfrac{2\\operatorname{sen}^{2}\\dfrac{\\pi}{6}\\cdot\\cos^{2}(\\pi)}{4\\tan\\dfrac{\\pi}{4}\\cdot\\operatorname{sen}^{2}\\dfrac{3\\pi}{4}}$",
          "Compute: $\\dfrac{2\\sin^{2}\\dfrac{\\pi}{6}\\cdot\\cos^{2}(\\pi)}{4\\tan\\dfrac{\\pi}{4}\\cdot\\sin^{2}\\dfrac{3\\pi}{4}}$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El cuadrado de un valor notable también es exacto: evalúa cada potencia por separado.",
            "The square of a special value is exact too: evaluate each power separately.",
          ),
          L(
            "$\\cos^{2}(\\pi) = (-1)^{2} = 1$: elevar al cuadrado borra el signo.",
            "$\\cos^{2}(\\pi) = (-1)^{2} = 1$: squaring removes the sign.",
          ),
          L(
            "Simplifica el 2 del numerador con el 4 del denominador solo después de evaluar las potencias.",
            "Cancel the 2 in the numerator against the 4 in the denominator only after evaluating the powers.",
          ),
        ],
        answerDisplay: L("$\\dfrac{1}{4}$", "$\\dfrac{1}{4}$"),
        solution: [
          step(
            "given",
            "Cociente de productos con potencias cuadradas de razones notables.",
            "Quotient of products involving squared special-angle ratios.",
          ),
          step(
            "approach",
            "Evaluamos numerador y denominador por separado (el cuadrado elimina los signos) y luego dividimos.",
            "Evaluate the numerator and the denominator separately (squaring removes the signs), then divide.",
          ),
          step(
            "calculation",
            "Numerador: $2\\left(\\dfrac{1}{2}\\right)^{2}\\cdot(-1)^{2} = 2\\cdot\\dfrac{1}{4}\\cdot1 = \\dfrac{1}{2}$<br>Denominador: $4\\cdot1\\cdot\\left(\\dfrac{\\sqrt{2}}{2}\\right)^{2} = 4\\cdot\\dfrac{2}{4} = 2$<br>Cociente: $\\dfrac{1}{2}\\div 2 = \\dfrac{1}{4}$",
            "Numerator: $2\\left(\\dfrac{1}{2}\\right)^{2}\\cdot(-1)^{2} = 2\\cdot\\dfrac{1}{4}\\cdot1 = \\dfrac{1}{2}$<br>Denominator: $4\\cdot1\\cdot\\left(\\dfrac{\\sqrt{2}}{2}\\right)^{2} = 4\\cdot\\dfrac{2}{4} = 2$<br>Quotient: $\\dfrac{1}{2}\\div 2 = \\dfrac{1}{4}$",
          ),
          step(
            "result",
            "El valor es $\\dfrac{1}{4}$. Verificación: $\\dfrac{1}{2}\\div 2 = 0{,}25 = \\dfrac{1}{4}$ ✓.",
            "The value is $\\dfrac{1}{4}$. Check: $\\dfrac{1}{2}\\div 2 = 0.25 = \\dfrac{1}{4}$ ✓.",
          ),
        ],
      };
    },
  ),

  /* 4·14c — 3sen(45°)−4tan(π/6) → (9√2−8√3)/6. */
  template(
    {
      id: "trigf-espol-ch4-14c",
      subject: "math",
      topicId: "trig-foundations",
      subtopicId: "exact-values",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 210,
      tags: ["exact-values", "special-angles", "common-denominator"],
      prerequisites: ["exact-values", "degrees-radians"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "4 · 14c",
        page: 468,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$\\dfrac{9\\sqrt{2}-8\\sqrt{3}}{6}$", "$\\dfrac{9\\sqrt{2}-8\\sqrt{3}}{6}$"), correct: true },
        { id: "b", text: L("$\\dfrac{9\\sqrt{2}+8\\sqrt{3}}{6}$", "$\\dfrac{9\\sqrt{2}+8\\sqrt{3}}{6}$"), correct: false },
        { id: "c", text: L("$\\dfrac{8\\sqrt{3}-9\\sqrt{2}}{6}$", "$\\dfrac{8\\sqrt{3}-9\\sqrt{2}}{6}$"), correct: false },
        { id: "d", text: L("$\\dfrac{3\\sqrt{2}-4\\sqrt{3}}{6}$", "$\\dfrac{3\\sqrt{2}-4\\sqrt{3}}{6}$"), correct: false },
      ];
      return {
        skill: L("Valor exacto con unidades mixtas", "Exact value with mixed units"),
        statement: L(
          "Halle el valor de: $3\\operatorname{sen}(45°)-4\\tan\\dfrac{\\pi}{6}$",
          "Find the value of: $3\\sin(45°)-4\\tan\\dfrac{\\pi}{6}$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Los ángulos son notables pero están en unidades distintas: evalúa $45°$ y $\\dfrac{\\pi}{6}$ por separado.",
            "The angles are special but given in different units: evaluate $45°$ and $\\dfrac{\\pi}{6}$ separately.",
          ),
          L(
            "$4\\tan\\dfrac{\\pi}{6} = \\dfrac{4\\sqrt{3}}{3}$: multiplica antes de juntar términos.",
            "$4\\tan\\dfrac{\\pi}{6} = \\dfrac{4\\sqrt{3}}{3}$: multiply before combining terms.",
          ),
          L(
            "El denominador común de 2 y 3 es 6: ajusta ambos numeradores antes de restar.",
            "The common denominator of 2 and 3 is 6: adjust both numerators before subtracting.",
          ),
        ],
        answerDisplay: L("$\\dfrac{9\\sqrt{2}-8\\sqrt{3}}{6}$", "$\\dfrac{9\\sqrt{2}-8\\sqrt{3}}{6}$"),
        solution: [
          step(
            "given",
            "Resta de dos términos con unidades mixtas: $45°$ y $\\dfrac{\\pi}{6} = 30°$.",
            "Difference of two terms with mixed units: $45°$ and $\\dfrac{\\pi}{6} = 30°$.",
          ),
          step(
            "approach",
            "Sustituimos los valores exactos y restamos usando el denominador común 6.",
            "Substitute the exact values and subtract using the common denominator 6.",
          ),
          step(
            "calculation",
            "$3\\cdot\\dfrac{\\sqrt{2}}{2}-4\\cdot\\dfrac{\\sqrt{3}}{3} = \\dfrac{3\\sqrt{2}}{2}-\\dfrac{4\\sqrt{3}}{3} = \\dfrac{9\\sqrt{2}}{6}-\\dfrac{8\\sqrt{3}}{6} = \\dfrac{9\\sqrt{2}-8\\sqrt{3}}{6}$",
            "$3\\cdot\\dfrac{\\sqrt{2}}{2}-4\\cdot\\dfrac{\\sqrt{3}}{3} = \\dfrac{3\\sqrt{2}}{2}-\\dfrac{4\\sqrt{3}}{3} = \\dfrac{9\\sqrt{2}}{6}-\\dfrac{8\\sqrt{3}}{6} = \\dfrac{9\\sqrt{2}-8\\sqrt{3}}{6}$",
          ),
          step(
            "result",
            "El valor es $\\dfrac{9\\sqrt{2}-8\\sqrt{3}}{6}$. Verificación numérica: $3\\cdot0{,}707-4\\cdot0{,}577 \\approx -0{,}188$ y $\\dfrac{9\\cdot1{,}414-8\\cdot1{,}732}{6} \\approx -0{,}188$ ✓.",
            "The value is $\\dfrac{9\\sqrt{2}-8\\sqrt{3}}{6}$. Numeric check: $3\\cdot0.707-4\\cdot0.577 \\approx -0.188$ and $\\dfrac{9\\cdot1.414-8\\cdot1.732}{6} \\approx -0.188$ ✓.",
          ),
        ],
      };
    },
  ),

  /* 4·14d — sen(−40°)/cos(50°) → −1 (cofunción + imparidad). */
  template(
    {
      id: "trigf-espol-ch4-14d",
      subject: "math",
      topicId: "trig-foundations",
      subtopicId: "sin-cos-tan",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 150,
      tags: ["cofunctions", "odd-functions", "exact-values"],
      prerequisites: ["sin-cos-tan", "degrees-radians"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "4 · 14d",
        page: 468,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L("Cofunciones y seno impar", "Cofunctions and odd sine"),
      statement: L(
        "Halle el valor de: $\\dfrac{\\operatorname{sen}(-40°)}{\\cos(50°)}$",
        "Find the value of: $\\dfrac{\\sin(-40°)}{\\cos(50°)}$",
      ),
      answer: { kind: "numeric", value: -1 },
      hints: [
        L(
          "El seno es impar: $\\operatorname{sen}(-x) = -\\operatorname{sen}(x)$.",
          "Sine is odd: $\\sin(-x) = -\\sin(x)$.",
        ),
        L(
          "$40°$ y $50°$ son complementarios: suman $90°$.",
          "$40°$ and $50°$ are complementary: they add up to $90°$.",
        ),
        L(
          "Cofunción: $\\cos(50°) = \\operatorname{sen}(40°)$.",
          "Cofunction: $\\cos(50°) = \\sin(40°)$.",
        ),
      ],
      answerDisplay: L("$-1$", "$-1$"),
      solution: [
        step(
          "given",
          "Cociente $\\dfrac{\\operatorname{sen}(-40°)}{\\cos(50°)}$ con $40° + 50° = 90°$.",
          "Quotient $\\dfrac{\\sin(-40°)}{\\cos(50°)}$ with $40° + 50° = 90°$.",
        ),
        step(
          "approach",
          "Aplicamos la imparidad del seno y la identidad de cofunciones entre ángulos complementarios.",
          "Apply the oddness of sine and the cofunction identity for complementary angles.",
        ),
        step(
          "calculation",
          "$\\operatorname{sen}(-40°) = -\\operatorname{sen}(40°)$<br>$\\cos(50°) = \\operatorname{sen}(90° - 50°) = \\operatorname{sen}(40°)$<br>$\\dfrac{\\operatorname{sen}(-40°)}{\\cos(50°)} = \\dfrac{-\\operatorname{sen}(40°)}{\\operatorname{sen}(40°)} = -1$",
          "$\\sin(-40°) = -\\sin(40°)$<br>$\\cos(50°) = \\sin(90° - 50°) = \\sin(40°)$<br>$\\dfrac{\\sin(-40°)}{\\cos(50°)} = \\dfrac{-\\sin(40°)}{\\sin(40°)} = -1$",
        ),
        step(
          "result",
          "El valor es $-1$. Verificación numérica: $\\operatorname{sen}(-40°) \\approx -0{,}643$ y $\\cos(50°) \\approx 0{,}643$, así que el cociente es $-1$ ✓.",
          "The value is $-1$. Numeric check: $\\sin(-40°) \\approx -0.643$ and $\\cos(50°) \\approx 0.643$, so the quotient is $-1$ ✓.",
        ),
      ],
    }),
  ),

  /* 4·14e — 6cos(3π/4)+2tan(−π/3) → −(3√2+2√3). */
  template(
    {
      id: "trigf-espol-ch4-14e",
      subject: "math",
      topicId: "trig-foundations",
      subtopicId: "exact-values",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 210,
      tags: ["exact-values", "special-angles", "signs"],
      prerequisites: ["exact-values", "unit-circle"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "4 · 14e",
        page: 468,
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$-\\left(3\\sqrt{2}+2\\sqrt{3}\\right)$", "$-\\left(3\\sqrt{2}+2\\sqrt{3}\\right)$"), correct: true },
        { id: "b", text: L("$3\\sqrt{2}-2\\sqrt{3}$", "$3\\sqrt{2}-2\\sqrt{3}$"), correct: false },
        { id: "c", text: L("$-\\left(3\\sqrt{2}-2\\sqrt{3}\\right)$", "$-\\left(3\\sqrt{2}-2\\sqrt{3}\\right)$"), correct: false },
        { id: "d", text: L("$3\\sqrt{2}+2\\sqrt{3}$", "$3\\sqrt{2}+2\\sqrt{3}$"), correct: false },
      ];
      return {
        skill: L("Signos por cuadrante en una suma", "Quadrant signs in a sum"),
        statement: L(
          "Halle el valor de: $6\\cos\\dfrac{3\\pi}{4}+2\\tan\\left(-\\dfrac{\\pi}{3}\\right)$",
          "Find the value of: $6\\cos\\dfrac{3\\pi}{4}+2\\tan\\left(-\\dfrac{\\pi}{3}\\right)$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Reduce cada ángulo: $\\dfrac{3\\pi}{4}$ está en el segundo cuadrante; $-\\dfrac{\\pi}{3}$, en el cuarto.",
            "Reduce each angle: $\\dfrac{3\\pi}{4}$ is in the second quadrant; $-\\dfrac{\\pi}{3}$, in the fourth.",
          ),
          L(
            "La tangente es impar: $\\tan\\left(-\\dfrac{\\pi}{3}\\right) = -\\tan\\dfrac{\\pi}{3}$.",
            "Tangent is odd: $\\tan\\left(-\\dfrac{\\pi}{3}\\right) = -\\tan\\dfrac{\\pi}{3}$.",
          ),
          L(
            "Ambos términos resultan negativos: el total se factoriza con un signo menos delante del paréntesis.",
            "Both terms come out negative: the total factors with a minus sign in front of the parenthesis.",
          ),
        ],
        answerDisplay: L(
          "$-\\left(3\\sqrt{2}+2\\sqrt{3}\\right)$",
          "$-\\left(3\\sqrt{2}+2\\sqrt{3}\\right)$",
        ),
        solution: [
          step(
            "given",
            "Suma de dos términos: $6\\cos\\dfrac{3\\pi}{4}$ y $2\\tan\\left(-\\dfrac{\\pi}{3}\\right)$.",
            "Sum of two terms: $6\\cos\\dfrac{3\\pi}{4}$ and $2\\tan\\left(-\\dfrac{\\pi}{3}\\right)$.",
          ),
          step(
            "approach",
            "Evaluamos cada término con su ángulo de referencia y signo por cuadrante (tangente impar).",
            "Evaluate each term using its reference angle and quadrant sign (tangent is odd).",
          ),
          step(
            "calculation",
            "$\\cos\\dfrac{3\\pi}{4} = -\\dfrac{\\sqrt{2}}{2} \\Rightarrow 6\\cos\\dfrac{3\\pi}{4} = -3\\sqrt{2}$<br>$\\tan\\left(-\\dfrac{\\pi}{3}\\right) = -\\sqrt{3} \\Rightarrow 2\\tan\\left(-\\dfrac{\\pi}{3}\\right) = -2\\sqrt{3}$<br>$-3\\sqrt{2}-2\\sqrt{3} = -\\left(3\\sqrt{2}+2\\sqrt{3}\\right)$",
            "$\\cos\\dfrac{3\\pi}{4} = -\\dfrac{\\sqrt{2}}{2} \\Rightarrow 6\\cos\\dfrac{3\\pi}{4} = -3\\sqrt{2}$<br>$\\tan\\left(-\\dfrac{\\pi}{3}\\right) = -\\sqrt{3} \\Rightarrow 2\\tan\\left(-\\dfrac{\\pi}{3}\\right) = -2\\sqrt{3}$<br>$-3\\sqrt{2}-2\\sqrt{3} = -\\left(3\\sqrt{2}+2\\sqrt{3}\\right)$",
          ),
          step(
            "result",
            "El valor es $-\\left(3\\sqrt{2}+2\\sqrt{3}\\right)$. Verificación numérica: $-4{,}243-3{,}464 = -7{,}707 = -\\left(3\\cdot1{,}414+2\\cdot1{,}732\\right)$ ✓.",
            "The value is $-\\left(3\\sqrt{2}+2\\sqrt{3}\\right)$. Numeric check: $-4.243-3.464 = -7.707 = -\\left(3\\cdot1.414+2\\cdot1.732\\right)$ ✓.",
          ),
        ],
      };
    },
  ),

  /* 4·25 — cos(π/12) → (√6+√2)/4. El libro imprime 5 opciones (a–e);  */
  /* se descarta la impresa c) (√2+1)/4 para mantener exactamente 4    */
  /* opciones (regla de casa). Distractores restantes: los impresos.   */
  template(
    {
      id: "trigf-espol-ch4-25",
      subject: "math",
      topicId: "trig-foundations",
      subtopicId: "exact-values",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["exact-values", "angle-addition", "half-angle"],
      prerequisites: ["exact-values", "unit-circle"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "4 · 25",
        page: 471,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$\\dfrac{\\sqrt{6}+\\sqrt{2}}{4}$", "$\\dfrac{\\sqrt{6}+\\sqrt{2}}{4}$"), correct: true },
        { id: "b", text: L("$\\dfrac{\\sqrt{3}-1}{4}$", "$\\dfrac{\\sqrt{3}-1}{4}$"), correct: false },
        { id: "c", text: L("$\\dfrac{\\sqrt{3}+\\sqrt{2}}{4}$", "$\\dfrac{\\sqrt{3}+\\sqrt{2}}{4}$"), correct: false },
        { id: "d", text: L("$\\dfrac{\\sqrt{3}+1}{4}$", "$\\dfrac{\\sqrt{3}+1}{4}$"), correct: false },
      ];
      return {
        skill: L("Valor exacto de un ángulo compuesto", "Exact value of a compound angle"),
        statement: L(
          "El valor de $\\cos\\dfrac{\\pi}{12}$ es:",
          "The value of $\\cos\\dfrac{\\pi}{12}$ is:",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "$\\dfrac{\\pi}{12} = 15°$ no está en la tabla básica: hay que construirlo con ángulos conocidos.",
            "$\\dfrac{\\pi}{12} = 15°$ is not in the basic table: it must be built from known angles.",
          ),
          L(
            "Escribe $\\dfrac{\\pi}{12} = \\dfrac{\\pi}{4} - \\dfrac{\\pi}{3}$ (o usa el ángulo mitad de $\\dfrac{\\pi}{6}$).",
            "Write $\\dfrac{\\pi}{12} = \\dfrac{\\pi}{4} - \\dfrac{\\pi}{3}$ (or use the half angle of $\\dfrac{\\pi}{6}$).",
          ),
          L(
            "La fórmula produce dos términos, uno con $\\sqrt{2}$ y otro con $\\sqrt{6}$; agrúpalos sobre denominador 4.",
            "The formula yields two terms, one with $\\sqrt{2}$ and one with $\\sqrt{6}$; gather them over denominator 4.",
          ),
        ],
        answerDisplay: L("$\\dfrac{\\sqrt{6}+\\sqrt{2}}{4}$", "$\\dfrac{\\sqrt{6}+\\sqrt{2}}{4}$"),
        solution: [
          step(
            "given",
            "$\\cos\\dfrac{\\pi}{12}$, con $\\dfrac{\\pi}{12} = 15°$.",
            "$\\cos\\dfrac{\\pi}{12}$, with $\\dfrac{\\pi}{12} = 15°$.",
          ),
          step(
            "approach",
            "Descomponemos $\\dfrac{\\pi}{12} = \\dfrac{\\pi}{4} - \\dfrac{\\pi}{3}$ y aplicamos el coseno de una diferencia.",
            "Split $\\dfrac{\\pi}{12} = \\dfrac{\\pi}{4} - \\dfrac{\\pi}{3}$ and apply the cosine of a difference.",
          ),
          step(
            "calculation",
            "$\\cos\\left(\\dfrac{\\pi}{4}-\\dfrac{\\pi}{3}\\right) = \\cos\\dfrac{\\pi}{4}\\cos\\dfrac{\\pi}{3}+\\operatorname{sen}\\dfrac{\\pi}{4}\\operatorname{sen}\\dfrac{\\pi}{3} = \\dfrac{\\sqrt{2}}{2}\\cdot\\dfrac{1}{2}+\\dfrac{\\sqrt{2}}{2}\\cdot\\dfrac{\\sqrt{3}}{2} = \\dfrac{\\sqrt{2}}{4}+\\dfrac{\\sqrt{6}}{4} = \\dfrac{\\sqrt{6}+\\sqrt{2}}{4}$",
            "$\\cos\\left(\\dfrac{\\pi}{4}-\\dfrac{\\pi}{3}\\right) = \\cos\\dfrac{\\pi}{4}\\cos\\dfrac{\\pi}{3}+\\sin\\dfrac{\\pi}{4}\\sin\\dfrac{\\pi}{3} = \\dfrac{\\sqrt{2}}{2}\\cdot\\dfrac{1}{2}+\\dfrac{\\sqrt{2}}{2}\\cdot\\dfrac{\\sqrt{3}}{2} = \\dfrac{\\sqrt{2}}{4}+\\dfrac{\\sqrt{6}}{4} = \\dfrac{\\sqrt{6}+\\sqrt{2}}{4}$",
          ),
          step(
            "result",
            "$\\cos\\dfrac{\\pi}{12} = \\dfrac{\\sqrt{6}+\\sqrt{2}}{4}$. Verificación numérica: $\\dfrac{2{,}449+1{,}414}{4} \\approx 0{,}966 = \\cos(15°)$ ✓.",
            "$\\cos\\dfrac{\\pi}{12} = \\dfrac{\\sqrt{6}+\\sqrt{2}}{4}$. Numeric check: $\\dfrac{2.449+1.414}{4} \\approx 0.966 = \\cos(15°)$ ✓.",
          ),
        ],
      };
    },
  ),

  /* 4·30 — tan(19π/12) → −(2+√3). */
  template(
    {
      id: "trigf-espol-ch4-30",
      subject: "math",
      topicId: "trig-foundations",
      subtopicId: "exact-values",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 270,
      tags: ["exact-values", "angle-addition", "periodicity"],
      prerequisites: ["exact-values", "unit-circle"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "4 · 30",
        page: 471,
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$-\\left(2+\\sqrt{3}\\right)$", "$-\\left(2+\\sqrt{3}\\right)$"), correct: true },
        { id: "b", text: L("$-\\sqrt{3}$", "$-\\sqrt{3}$"), correct: false },
        { id: "c", text: L("$2+\\sqrt{3}$", "$2+\\sqrt{3}$"), correct: false },
        { id: "d", text: L("$\\sqrt{3}-2$", "$\\sqrt{3}-2$"), correct: false },
      ];
      return {
        skill: L("Tangente por periodicidad y adición", "Tangent via periodicity and addition"),
        statement: L(
          "Hallar el valor de: $\\tan\\dfrac{19\\pi}{12}$",
          "Find the value of: $\\tan\\dfrac{19\\pi}{12}$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "La tangente tiene periodo $\\pi$: resta $\\pi = \\dfrac{12\\pi}{12}$ para reducir el ángulo.",
            "Tangent has period $\\pi$: subtract $\\pi = \\dfrac{12\\pi}{12}$ to reduce the angle.",
          ),
          L(
            "El resto $\\dfrac{7\\pi}{12}$ se descompone como $\\dfrac{\\pi}{4} + \\dfrac{\\pi}{3}$ (equivale a $105°$).",
            "The remainder $\\dfrac{7\\pi}{12}$ splits as $\\dfrac{\\pi}{4} + \\dfrac{\\pi}{3}$ (it equals $105°$).",
          ),
          L(
            "Con la fórmula de adición el denominador queda $1 - \\sqrt{3}$, negativo: racionaliza con $1 + \\sqrt{3}$.",
            "With the addition formula the denominator becomes $1 - \\sqrt{3}$, which is negative: rationalize with $1 + \\sqrt{3}$.",
          ),
        ],
        answerDisplay: L("$-\\left(2+\\sqrt{3}\\right)$", "$-\\left(2+\\sqrt{3}\\right)$"),
        solution: [
          step(
            "given",
            "$\\tan\\dfrac{19\\pi}{12}$, con $\\dfrac{19\\pi}{12} = 285°$.",
            "$\\tan\\dfrac{19\\pi}{12}$, with $\\dfrac{19\\pi}{12} = 285°$.",
          ),
          step(
            "approach",
            "Reducimos un periodo $\\pi$ y descomponemos el resto con la fórmula de adición de la tangente.",
            "Remove one period $\\pi$ and split the remainder with the tangent addition formula.",
          ),
          step(
            "calculation",
            "$\\tan\\dfrac{19\\pi}{12} = \\tan\\left(\\dfrac{19\\pi}{12} - \\pi\\right) = \\tan\\dfrac{7\\pi}{12} = \\tan\\left(\\dfrac{\\pi}{4}+\\dfrac{\\pi}{3}\\right) = \\dfrac{1+\\sqrt{3}}{1-\\sqrt{3}} = \\dfrac{(1+\\sqrt{3})^{2}}{(1-\\sqrt{3})(1+\\sqrt{3})} = \\dfrac{4+2\\sqrt{3}}{-2} = -\\left(2+\\sqrt{3}\\right)$",
            "$\\tan\\dfrac{19\\pi}{12} = \\tan\\left(\\dfrac{19\\pi}{12} - \\pi\\right) = \\tan\\dfrac{7\\pi}{12} = \\tan\\left(\\dfrac{\\pi}{4}+\\dfrac{\\pi}{3}\\right) = \\dfrac{1+\\sqrt{3}}{1-\\sqrt{3}} = \\dfrac{(1+\\sqrt{3})^{2}}{(1-\\sqrt{3})(1+\\sqrt{3})} = \\dfrac{4+2\\sqrt{3}}{-2} = -\\left(2+\\sqrt{3}\\right)$",
          ),
          step(
            "result",
            "$\\tan\\dfrac{19\\pi}{12} = -\\left(2+\\sqrt{3}\\right)$. Verificación numérica: $\\tan(285°) \\approx -3{,}732 = -\\left(2+1{,}732\\right)$ ✓.",
            "$\\tan\\dfrac{19\\pi}{12} = -\\left(2+\\sqrt{3}\\right)$. Numeric check: $\\tan(285°) \\approx -3.732 = -\\left(2+1.732\\right)$ ✓.",
          ),
        ],
      };
    },
  ),
];
