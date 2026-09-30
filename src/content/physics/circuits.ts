/**
 * PHYSICS · Electric Circuits
 *
 * Current as charge per unit time, resistance vs geometry (MC), Ohm's law
 * (direct computation and V–I graph reading), series voltage divider, parallel
 * equivalents and branch currents, Kirchhoff's junction and loop rules,
 * electrical power (numeric and symbolic), and a mixed series–parallel power
 * challenge.
 *
 * Conventions: every numeric answer carries units and uses sig-fig (2)
 * tolerance; parameter sets are curated so each answer is exact at 2
 * significant figures and every intermediate is clean (e.g. 30 ∥ 60 = 20 Ω,
 * 20 + 40 = 60 Ω, 12 V across 24 Ω → 6 W, ε₁−ε₂ = 9 V over 60 Ω → 0.15 A).
 */

import { template, L, step, tok } from "@/lib/problem";
import type { ProblemTemplate, McOption } from "@/lib/types";

/** Trims floating-point noise: 0.1 + 0.05 → 0.15 exactly. */
const clean = (n: number): number => Number(n.toPrecision(10));

/** Round to 2 significant figures (answer values with sigfig tolerance). */
function sig2(n: number): number {
  if (n === 0) return 0;
  const exp = Math.floor(Math.log10(Math.abs(n)));
  const f = Math.pow(10, exp - 1);
  const scaled = n / f;
  const r = scaled >= 0 ? Math.floor(scaled + 0.5) : Math.ceil(scaled - 0.5);
  return clean(r * f);
}

/** Locale-aware number token (comma decimal in Spanish, point in English). */
const tk = (n: number): string => tok(clean(n));

export const templates: ProblemTemplate[] = [
  /* ---------------------------------------------------------------- */
  /* Current as charge per unit time                                  */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "cir-current-01",
      subject: "physics",
      topicId: "circuits",
      subtopicId: "current",
      difficulty: "easy",
      questionType: "numeric-unit",
      estimatedTimeSec: 90,
      tags: ["current", "charge", "definition"],
      prerequisites: [],
    },
    (rng) => {
      const t = rng.pick([10, 20, 30, 60]);
      const i = rng.pick([0.2, 0.5, 0.8, 1.2, 1.5, 2, 2.5]);
      const q = clean(i * t);
      const extraEs = i < 1 ? `, es decir, $${clean(i * 1000)}\\ \\text{mA}$` : "";
      const extraEn = i < 1 ? `, that is, $${clean(i * 1000)}\\ \\text{mA}$` : "";
      return {
        skill: L("Definición de corriente eléctrica", "Definition of electric current"),
        statement: L(
          `Por la sección transversal de un conductor pasa una carga de $${tk(q)}\\ \\text{C}$ en $${t}\\ \\text{s}$. ¿Qué corriente circula por el conductor? (2 cifras significativas)`,
          `A charge of $${tk(q)}\\ \\text{C}$ passes through the cross-section of a conductor in $${t}\\ \\text{s}$. What current flows through the conductor? (2 significant figures)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: sig2(i),
          tolerance: { mode: "sigfig", value: 2 },
          units: ["A", "ampere", "amperes", "amperio", "amperios"],
          unitChoices: ["A", "mA", "V", "C"],
        },
        hints: [
          L(
            "La corriente mide cuánta carga atraviesa una sección del conductor por unidad de tiempo.",
            "Current measures how much charge crosses a section of the conductor per unit time.",
          ),
          L(
            "Su definición es $I = Q/t$, con la carga en culombios y el tiempo en segundos.",
            "Its definition is $I = Q/t$, with charge in coulombs and time in seconds.",
          ),
          L(
            "Sustituye la carga y el tiempo tal como están: no hace falta convertir unidades.",
            "Substitute the charge and the time as given: no unit conversion is needed.",
          ),
        ],
        answerDisplay: L(`$I = ${tk(i)}\\ \\text{A}$`, `$I = ${tk(i)}\\ \\text{A}$`),
        solution: [
          step(
            "given",
            `$Q = ${tk(q)}\\ \\text{C}$, $t = ${t}\\ \\text{s}$; incógnita: la corriente $I$.`,
            `$Q = ${tk(q)}\\ \\text{C}$, $t = ${t}\\ \\text{s}$; unknown: the current $I$.`,
          ),
          step(
            "approach",
            "La corriente es la carga que pasa por unidad de tiempo: $I = Q/t$.",
            "Current is the charge passing per unit time: $I = Q/t$.",
          ),
          step(
            "calculation",
            `$I = \\dfrac{${tk(q)}\\ \\text{C}}{${t}\\ \\text{s}} = ${tk(i)}\\ \\text{A}$`,
            `$I = \\dfrac{${tk(q)}\\ \\text{C}}{${t}\\ \\text{s}} = ${tk(i)}\\ \\text{A}$`,
          ),
          step(
            "result",
            `Por el conductor circula una corriente de $${tk(i)}\\ \\text{A}$${extraEs}.`,
            `A current of $${tk(i)}\\ \\text{A}$ flows through the conductor${extraEn}.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Resistance vs geometry (conceptual MC)                           */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "cir-volt-01",
      subject: "physics",
      topicId: "circuits",
      subtopicId: "voltage-resistance",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 90,
      tags: ["resistance", "geometry", "conceptual"],
      prerequisites: [],
    },
    (rng) => {
      const prop = rng.pick(["length", "area"] as const);
      const k = rng.pick([2, 3]);
      const moreEs = k === 2 ? "el doble" : "el triple";
      const moreEn = k === 2 ? "twice" : "three times";
      const lessEs = k === 2 ? "la mitad" : "la tercera parte";
      const lessEn = k === 2 ? "half" : "a third";
      const lessBigEs = k === 2 ? "la cuarta parte" : "la novena parte";
      const lessBigEn = k === 2 ? "a quarter" : "a ninth";
      const options: McOption[] =
        prop === "length"
          ? [
              {
                id: "a",
                text: L(
                  `Aumenta al ${moreEs}: $R' = ${k}\\,R$`,
                  `It ${k === 2 ? "doubles" : "triples"}: $R' = ${k}\\,R$`,
                ),
                correct: true,
              },
              {
                id: "b",
                text: L(
                  `Disminuye a ${lessEs}: $R' = R/${k}$`,
                  `It falls to ${lessEn}: $R' = R/${k}$`,
                ),
                correct: false,
              },
              {
                id: "c",
                text: L(
                  "No cambia: la resistencia depende solo del material",
                  "It does not change: resistance depends only on the material",
                ),
                correct: false,
              },
              {
                id: "d",
                text: L(
                  `Aumenta aún más: se multiplica por ${k * k} ($R' = ${k * k}\\,R$)`,
                  `It increases even more: it is multiplied by ${k * k} ($R' = ${k * k}\\,R$)`,
                ),
                correct: false,
              },
            ]
          : [
              {
                id: "a",
                text: L(
                  `Disminuye a ${lessEs}: $R' = R/${k}$`,
                  `It falls to ${lessEn}: $R' = R/${k}$`,
                ),
                correct: true,
              },
              {
                id: "b",
                text: L(
                  `Aumenta al ${moreEs}: $R' = ${k}\\,R$`,
                  `It ${k === 2 ? "doubles" : "triples"}: $R' = ${k}\\,R$`,
                ),
                correct: false,
              },
              {
                id: "c",
                text: L(
                  "No cambia: la resistencia depende solo del material",
                  "It does not change: resistance depends only on the material",
                ),
                correct: false,
              },
              {
                id: "d",
                text: L(
                  `Disminuye aún más: se reduce a ${lessBigEs} ($R' = R/${k * k}$)`,
                  `It decreases even more: it is reduced to ${lessBigEn} ($R' = R/${k * k}$)`,
                ),
                correct: false,
              },
            ];
      return {
        skill: L("Resistencia y geometría del conductor", "Resistance and conductor geometry"),
        statement: L(
          prop === "length"
            ? `Un alambre de cierto material tiene una resistencia $R$. Se fabrica un segundo alambre **del mismo material y con la misma sección transversal**, pero con ${moreEs} de longitud. ¿Qué le ocurre a su resistencia eléctrica?`
            : `Un alambre de cierto material tiene una resistencia $R$. Se fabrica un segundo alambre **del mismo material y con la misma longitud**, pero con una sección transversal de área ${k === 2 ? "doble" : "triple"}. ¿Qué le ocurre a su resistencia eléctrica?`,
          prop === "length"
            ? `A wire of a certain material has resistance $R$. A second wire is made of **the same material and with the same cross-section**, but ${moreEn} as long. What happens to its electrical resistance?`
            : `A wire of a certain material has resistance $R$. A second wire is made of **the same material and with the same length**, but with a cross-sectional area ${k === 2 ? "twice" : "three times"} as large. What happens to its electrical resistance?`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "La resistencia no depende solo del material: también de la geometría del alambre.",
            "Resistance does not depend on the material alone: also on the geometry of the wire.",
          ),
          L(
            "La fórmula es $R = \\rho\\,L/A$, con $\\rho$ la resistividad del material.",
            "The formula is $R = \\rho\\,L/A$, with $\\rho$ the resistivity of the material.",
          ),
          L(
            "Mira qué símbolo de la fórmula cambia ($L$ o $A$) y por qué factor: como $\\rho$ no cambia, $R$ queda multiplicada o dividida por ese factor.",
            "Look at which symbol in the formula changes ($L$ or $A$) and by what factor: since $\\rho$ is unchanged, $R$ ends up multiplied or divided by that factor.",
          ),
        ],
        answerDisplay: L(
          prop === "length"
            ? `Aumenta al ${moreEs}: $R' = ${k}\\,R$`
            : `Disminuye a ${lessEs}: $R' = R/${k}$`,
          prop === "length"
            ? `It ${k === 2 ? "doubles" : "triples"}: $R' = ${k}\\,R$`
            : `It falls to ${lessEn}: $R' = R/${k}$`,
        ),
        solution: [
          step(
            "given",
            prop === "length"
              ? `Mismo material ($\\rho$) y misma área; la longitud se multiplica por ${k}: $L' = ${k}\\,L$.`
              : `Mismo material ($\\rho$) y misma longitud; el área se multiplica por ${k}: $A' = ${k}\\,A$.`,
            prop === "length"
              ? `Same material ($\\rho$) and same area; the length is multiplied by ${k}: $L' = ${k}\\,L$.`
              : `Same material ($\\rho$) and same length; the area is multiplied by ${k}: $A' = ${k}\\,A$.`,
          ),
          step(
            "approach",
            "La resistencia de un conductor es $R = \\rho\\,L/A$: proporcional a la longitud e inversamente proporcional al área.",
            "The resistance of a conductor is $R = \\rho\\,L/A$: proportional to the length and inversely proportional to the area.",
          ),
          step(
            "calculation",
            prop === "length"
              ? `$R' = \\rho\\,\\dfrac{${k}L}{A} = ${k}\\cdot\\dfrac{\\rho L}{A} = ${k}\\,R$`
              : `$R' = \\rho\\,\\dfrac{L}{${k}A} = \\dfrac{1}{${k}}\\cdot\\dfrac{\\rho L}{A} = \\dfrac{R}{${k}}$`,
            prop === "length"
              ? `$R' = \\rho\\,\\dfrac{${k}L}{A} = ${k}\\cdot\\dfrac{\\rho L}{A} = ${k}\\,R$`
              : `$R' = \\rho\\,\\dfrac{L}{${k}A} = \\dfrac{1}{${k}}\\cdot\\dfrac{\\rho L}{A} = \\dfrac{R}{${k}}$`,
          ),
          step(
            "result",
            prop === "length"
              ? `La resistencia aumenta al ${moreEs}: $R' = ${k}\\,R$, porque $R$ es proporcional a $L$.`
              : `La resistencia disminuye a ${lessEs}: $R' = R/${k}$, porque $R$ es inversamente proporcional a $A$.`,
            prop === "length"
              ? `The resistance ${k === 2 ? "doubles" : "triples"}: $R' = ${k}\\,R$, because $R$ is proportional to $L$.`
              : `The resistance falls to ${lessEn}: $R' = R/${k}$, because $R$ is inversely proportional to $A$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Ohm's law: I = V/R                                               */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "cir-ohm-01",
      subject: "physics",
      topicId: "circuits",
      subtopicId: "ohms-law",
      difficulty: "easy",
      questionType: "numeric-unit",
      estimatedTimeSec: 90,
      tags: ["ohms-law", "current"],
      prerequisites: [],
    },
    (rng) => {
      const [i, r] = rng.pick([
        [0.1, 15], [0.1, 22], [0.1, 47], [0.1, 100], [0.1, 150], [0.1, 220],
        [0.2, 10], [0.2, 22], [0.2, 47], [0.2, 100],
        [0.25, 20], [0.25, 40], [0.25, 60], [0.25, 80],
        [0.5, 10], [0.5, 12], [0.5, 24], [0.5, 30], [0.5, 36], [0.5, 48],
        [0.6, 10], [0.6, 20], [0.6, 25], [0.6, 40],
        [0.8, 15], [0.8, 20], [0.8, 25], [0.8, 30],
        [1, 12], [1, 15], [1, 18], [1, 24],
        [1.2, 10], [1.2, 15], [1.2, 20],
        [1.5, 10], [1.5, 12], [1.5, 16],
        [2, 10], [2, 12],
      ]);
      const v = clean(i * r);
      return {
        skill: L("Ley de Ohm: calcular la corriente", "Ohm's law: finding the current"),
        statement: L(
          `Se conecta una resistencia de $${r}\\ \\Omega$ a los bornes de una batería ideal de $${tk(v)}\\ \\text{V}$. ¿Qué corriente circula por el circuito? (2 cifras significativas)`,
          `A resistor of $${r}\\ \\Omega$ is connected across an ideal battery of $${tk(v)}\\ \\text{V}$. What current flows in the circuit? (2 significant figures)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: sig2(i),
          tolerance: { mode: "sigfig", value: 2 },
          units: ["A", "ampere", "amperes", "amperio", "amperios"],
          unitChoices: ["A", "mA", "V", "Ω"],
        },
        hints: [
          L(
            "Identifica los datos: la tensión $V$ de la batería y la resistencia $R$; la incógnita es la corriente $I$.",
            "Identify the data: the battery voltage $V$ and the resistance $R$; the unknown is the current $I$.",
          ),
          L(
            "La ley de Ohm relaciona las tres magnitudes: $V = I\\,R$.",
            "Ohm's law relates the three quantities: $V = I\\,R$.",
          ),
          L(
            "Despeja la corriente, $I = V/R$, y sustituye con $V$ en voltios y $R$ en ohmios.",
            "Rearrange for the current, $I = V/R$, and substitute with $V$ in volts and $R$ in ohms.",
          ),
        ],
        answerDisplay: L(`$I = ${tk(i)}\\ \\text{A}$`, `$I = ${tk(i)}\\ \\text{A}$`),
        solution: [
          step(
            "given",
            `$V = ${tk(v)}\\ \\text{V}$, $R = ${r}\\ \\Omega$; incógnita: $I$.`,
            `$V = ${tk(v)}\\ \\text{V}$, $R = ${r}\\ \\Omega$; unknown: $I$.`,
          ),
          step(
            "approach",
            "Ley de Ohm: $V = I\\,R$, despejando la corriente $I = V/R$.",
            "Ohm's law: $V = I\\,R$, solving for the current $I = V/R$.",
          ),
          step(
            "calculation",
            `$I = \\dfrac{${tk(v)}\\ \\text{V}}{${r}\\ \\Omega} = ${tk(i)}\\ \\text{A}$`,
            `$I = \\dfrac{${tk(v)}\\ \\text{V}}{${r}\\ \\Omega} = ${tk(i)}\\ \\text{A}$`,
          ),
          step(
            "result",
            `Por el circuito circula una corriente de $${tk(i)}\\ \\text{A}$.`,
            `A current of $${tk(i)}\\ \\text{A}$ flows in the circuit.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Ohm's law from a V–I graph (diagram)                             */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "cir-ohm-02",
      subject: "physics",
      topicId: "circuits",
      subtopicId: "ohms-law",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 150,
      tags: ["ohms-law", "v-i-graph", "graphs"],
      prerequisites: ["ohms-law"],
    },
    (rng) => {
      const [iPt, vPt, r] = rng.pick([
        [0.4, 4, 10], [0.5, 5, 10], [0.8, 8, 10],
        [0.4, 6, 15], [0.6, 9, 15], [0.8, 12, 15],
        [0.4, 8, 20], [0.5, 10, 20], [0.6, 12, 20],
        [0.4, 10, 25], [0.6, 15, 25],
        [0.4, 12, 30], [0.6, 18, 30],
        [0.4, 16, 40], [0.6, 24, 40],
        [0.4, 20, 50], [0.5, 25, 50],
      ]);
      return {
        skill: L("Leer la resistencia en una gráfica V–I", "Reading resistance from a V–I graph"),
        statement: L(
          `La gráfica muestra la característica tensión–corriente ($V$–$I$) de una resistencia lineal. El punto marcado $P$ corresponde a $I = ${tk(iPt)}\\ \\text{A}$ y $V = ${tk(vPt)}\\ \\text{V}$. ¿Cuál es el valor de la resistencia? (2 cifras significativas)`,
          `The graph shows the voltage–current ($V$–$I$) characteristic of a linear resistor. The marked point $P$ corresponds to $I = ${tk(iPt)}\\ \\text{A}$ and $V = ${tk(vPt)}\\ \\text{V}$. What is the value of the resistance? (2 significant figures)`,
        ),
        diagram: {
          kind: "function-graph",
          xMin: 0,
          xMax: clean(2 * iPt),
          yMin: 0,
          yMax: clean(2 * vPt),
          curves: [{ fn: `${r}*x`, color: "primary" }],
          points: [
            { x: 0, y: 0, label: "(0, 0)" },
            { x: iPt, y: vPt, label: "P" },
          ],
          xLabel: "I (A)",
          yLabel: "V (V)",
          showGrid: true,
        },
        diagramLabel: L(
          `Característica tensión-corriente lineal: recta que parte del origen y pasa por el punto P, de coordenadas ${iPt} amperios y ${vPt} voltios.`,
          `Linear voltage-current characteristic: a straight line from the origin through point P, with coordinates ${iPt} amperes and ${vPt} volts.`,
        ),
        answer: {
          kind: "numeric-unit",
          value: sig2(r),
          tolerance: { mode: "sigfig", value: 2 },
          units: ["Ω", "ohm", "ohms", "ohmio", "ohmios"],
          unitChoices: ["Ω", "V", "A", "W"],
        },
        hints: [
          L(
            "Cada punto de la recta cumple la ley de Ohm: $V = I\\,R$.",
            "Every point on the line satisfies Ohm's law: $V = I\\,R$.",
          ),
          L(
            "En una gráfica $V$–$I$, la resistencia es la pendiente de la recta.",
            "On a $V$–$I$ graph, the resistance is the slope of the line.",
          ),
          L(
            "Usa las coordenadas del punto marcado $P$ y calcula $R = V/I$.",
            "Use the coordinates of the marked point $P$ and compute $R = V/I$.",
          ),
        ],
        answerDisplay: L(`$R = ${r}\\ \\Omega$`, `$R = ${r}\\ \\Omega$`),
        solution: [
          step(
            "given",
            `Recta que pasa por el origen; punto $P$: $I = ${tk(iPt)}\\ \\text{A}$, $V = ${tk(vPt)}\\ \\text{V}$.`,
            `A straight line through the origin; point $P$: $I = ${tk(iPt)}\\ \\text{A}$, $V = ${tk(vPt)}\\ \\text{V}$.`,
          ),
          step(
            "approach",
            "En una característica $V$–$I$ lineal, $R = V/I$ para cualquier punto de la recta (la pendiente).",
            "On a linear $V$–$I$ characteristic, $R = V/I$ for any point on the line (the slope).",
          ),
          step(
            "calculation",
            `$R = \\dfrac{${tk(vPt)}\\ \\text{V}}{${tk(iPt)}\\ \\text{A}} = ${r}\\ \\Omega$`,
            `$R = \\dfrac{${tk(vPt)}\\ \\text{V}}{${tk(iPt)}\\ \\text{A}} = ${r}\\ \\Omega$`,
          ),
          step(
            "result",
            `La resistencia vale $${r}\\ \\Omega$: es la pendiente de la recta $V$–$I$.`,
            `The resistance is $${r}\\ \\Omega$: it is the slope of the $V$–$I$ line.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Series circuit: voltage divider                                  */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "cir-series-01",
      subject: "physics",
      topicId: "circuits",
      subtopicId: "series",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 150,
      tags: ["series", "voltage-divider"],
      prerequisites: ["ohms-law", "series"],
    },
    (rng) => {
      const [v, r1, r2] = rng.pick([
        [6, 20, 40], [6, 30, 30],
        [9, 10, 20], [9, 15, 30],
        [12, 10, 50], [12, 15, 45], [12, 20, 40], [12, 30, 30],
        [18, 20, 40], [18, 30, 60],
        [24, 20, 40], [24, 25, 50], [24, 30, 30],
      ]);
      const rt = r1 + r2;
      const i = clean(v / rt);
      const v2 = clean((v * r2) / rt);
      const v1 = clean(v - v2);
      return {
        skill: L("Reparto de tensión en serie", "Voltage division in series"),
        statement: L(
          `Dos resistencias $R_1 = ${r1}\\ \\Omega$ y $R_2 = ${r2}\\ \\Omega$ están conectadas **en serie** entre los bornes de una batería ideal de $${v}\\ \\text{V}$. ¿Qué tensión hay entre los extremos de $R_2$? (2 cifras significativas)`,
          `Two resistors $R_1 = ${r1}\\ \\Omega$ and $R_2 = ${r2}\\ \\Omega$ are connected **in series** across an ideal $${v}\\ \\text{V}$ battery. What is the voltage across $R_2$? (2 significant figures)`,
        ),
        diagram: {
          kind: "circuit",
          mode: "series",
          voltage: `${v} V`,
          resistors: ["R\u2081 = " + r1 + " \u03a9", "R\u2082 = " + r2 + " \u03a9"],
          showCurrent: true,
        },
        diagramLabel: L(
          `Circuito en serie: bater\u00eda de ${v} V con dos resistencias en serie, R\u2081 = ${r1} \u03a9 y R\u2082 = ${r2} \u03a9, y la corriente I marcada.`,
          `Series circuit: a ${v} V battery with two resistors in series, R\u2081 = ${r1} \u03a9 and R\u2082 = ${r2} \u03a9, with the current I marked.`,
        ),
        answer: {
          kind: "numeric-unit",
          value: sig2(v2),
          tolerance: { mode: "sigfig", value: 2 },
          units: ["V", "volt", "volts", "voltio", "voltios"],
          unitChoices: ["V", "A", "Ω", "W"],
        },
        hints: [
          L(
            "En serie, las dos resistencias recorren la misma corriente.",
            "In series, the same current flows through both resistors.",
          ),
          L(
            "Calcula primero la resistencia total y con ella la corriente: $I = V/(R_1 + R_2)$.",
            "First find the total resistance and with it the current: $I = V/(R_1 + R_2)$.",
          ),
          L(
            "La tensión pedida es $V_2 = I \\cdot R_2$: la tensión se reparte en proporción a cada resistencia.",
            "The requested voltage is $V_2 = I \\cdot R_2$: the voltage divides in proportion to each resistance.",
          ),
        ],
        answerDisplay: L(`$V_2 = ${tk(v2)}\\ \\text{V}$`, `$V_2 = ${tk(v2)}\\ \\text{V}$`),
        solution: [
          step(
            "given",
            `$V = ${v}\\ \\text{V}$; $R_1 = ${r1}\\ \\Omega$ y $R_2 = ${r2}\\ \\Omega$ en serie; incógnita: $V_2$.`,
            `$V = ${v}\\ \\text{V}$; $R_1 = ${r1}\\ \\Omega$ and $R_2 = ${r2}\\ \\Omega$ in series; unknown: $V_2$.`,
          ),
          step(
            "approach",
            "Serie: $R_t = R_1 + R_2$; la corriente es común, $I = V/R_t$, y la tensión en $R_2$ es $V_2 = I\\,R_2$.",
            "Series: $R_t = R_1 + R_2$; the current is common, $I = V/R_t$, and the voltage across $R_2$ is $V_2 = I\\,R_2$.",
          ),
          step(
            "calculation",
            `$R_t = ${r1} + ${r2} = ${rt}\\ \\Omega$<br>$I = \\dfrac{${v}}{${rt}} = ${tk(i)}\\ \\text{A}$<br>$V_2 = ${tk(i)} \\cdot ${r2} = ${tk(v2)}\\ \\text{V}$<br>(comprobación: $V_1 + V_2 = ${tk(v1)} + ${tk(v2)} = ${v}\\ \\text{V}$)`,
            `$R_t = ${r1} + ${r2} = ${rt}\\ \\Omega$<br>$I = \\dfrac{${v}}{${rt}} = ${tk(i)}\\ \\text{A}$<br>$V_2 = ${tk(i)} \\cdot ${r2} = ${tk(v2)}\\ \\text{V}$<br>(check: $V_1 + V_2 = ${tk(v1)} + ${tk(v2)} = ${v}\\ \\text{V}$)`,
          ),
          step(
            "result",
            `Entre los extremos de $R_2$ hay $${tk(v2)}\\ \\text{V}$: la tensión se reparte en proporción a cada resistencia.`,
            `The voltage across $R_2$ is $${tk(v2)}\\ \\text{V}$: the voltage divides in proportion to each resistance.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Parallel: equivalent resistance of two resistors                 */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "cir-parallel-01",
      subject: "physics",
      topicId: "circuits",
      subtopicId: "parallel",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 150,
      tags: ["parallel", "equivalent-resistance"],
      prerequisites: ["ohms-law"],
    },
    (rng) => {
      const [r1, r2] = rng.pick([
        [30, 60], [20, 30], [40, 60], [12, 24], [20, 20], [60, 60],
        [100, 25], [300, 200], [50, 50], [15, 10], [40, 120], [100, 100],
        [200, 50], [600, 200],
      ]);
      const req = clean((r1 * r2) / (r1 + r2));
      return {
        skill: L("Resistencia equivalente en paralelo", "Equivalent resistance in parallel"),
        statement: L(
          `Calcula la resistencia equivalente de dos resistencias de $${r1}\\ \\Omega$ y $${r2}\\ \\Omega$ conectadas **en paralelo**. (2 cifras significativas)`,
          `Find the equivalent resistance of two resistors of $${r1}\\ \\Omega$ and $${r2}\\ \\Omega$ connected **in parallel**. (2 significant figures)`,
        ),
        diagram: {
          kind: "circuit",
          mode: "parallel",
          voltage: "V",
          resistors: ["R\u2081 = " + r1 + " \u03a9", "R\u2082 = " + r2 + " \u03a9"],
          showCurrent: true,
        },
        diagramLabel: L(
          `Circuito en paralelo: dos resistencias en derivaci\u00f3n, R\u2081 = ${r1} \u03a9 y R\u2082 = ${r2} \u03a9, conectadas a la misma bater\u00eda.`,
          `Parallel circuit: two resistors in parallel branches, R\u2081 = ${r1} \u03a9 and R\u2082 = ${r2} \u03a9, connected across the same battery.`,
        ),
        answer: {
          kind: "numeric-unit",
          value: sig2(req),
          tolerance: { mode: "sigfig", value: 2 },
          units: ["Ω", "ohm", "ohms", "ohmio", "ohmios"],
          unitChoices: ["Ω", "V", "A", "W"],
        },
        hints: [
          L(
            "En paralelo, la resistencia equivalente es menor que la más pequeña de las dos.",
            "In parallel, the equivalent resistance is smaller than the smaller of the two.",
          ),
          L(
            "Las inversas se suman: $\\dfrac{1}{R_{eq}} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2}$.",
            "The inverses add up: $\\dfrac{1}{R_{eq}} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2}$.",
          ),
          L(
            "Con dos resistencias equivale al producto entre la suma: $R_{eq} = \\dfrac{R_1 R_2}{R_1 + R_2}$.",
            "With two resistors this is the product over the sum: $R_{eq} = \\dfrac{R_1 R_2}{R_1 + R_2}$.",
          ),
        ],
        answerDisplay: L(`$R_{eq} = ${tk(req)}\\ \\Omega$`, `$R_{eq} = ${tk(req)}\\ \\Omega$`),
        solution: [
          step(
            "given",
            `$R_1 = ${r1}\\ \\Omega$ y $R_2 = ${r2}\\ \\Omega$ en paralelo.`,
            `$R_1 = ${r1}\\ \\Omega$ and $R_2 = ${r2}\\ \\Omega$ in parallel.`,
          ),
          step(
            "approach",
            "En paralelo: $\\dfrac{1}{R_{eq}} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2}$, es decir $R_{eq} = \\dfrac{R_1 R_2}{R_1 + R_2}$.",
            "In parallel: $\\dfrac{1}{R_{eq}} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2}$, that is $R_{eq} = \\dfrac{R_1 R_2}{R_1 + R_2}$.",
          ),
          step(
            "calculation",
            `$R_{eq} = \\dfrac{${r1} \\cdot ${r2}}{${r1} + ${r2}} = \\dfrac{${r1 * r2}}{${r1 + r2}} = ${tk(req)}\\ \\Omega$<br>$R_{eq} < \\min(R_1, R_2) = ${Math.min(r1, r2)}\\ \\Omega$, como debe ser en paralelo`,
            `$R_{eq} = \\dfrac{${r1} \\cdot ${r2}}{${r1} + ${r2}} = \\dfrac{${r1 * r2}}{${r1 + r2}} = ${tk(req)}\\ \\Omega$<br>$R_{eq} < \\min(R_1, R_2) = ${Math.min(r1, r2)}\\ \\Omega$, as it must be in parallel`,
          ),
          step(
            "result",
            `La resistencia equivalente es $${tk(req)}\\ \\Omega$.`,
            `The equivalent resistance is $${tk(req)}\\ \\Omega$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Parallel: total current delivered by the battery                 */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "cir-parallel-02",
      subject: "physics",
      topicId: "circuits",
      subtopicId: "parallel",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 240,
      tags: ["parallel", "branch-currents", "kirchhoff"],
      prerequisites: ["parallel", "current"],
    },
    (rng) => {
      const [v, r1, r2] = rng.pick([
        [12, 12, 24], [12, 12, 12], [24, 24, 24], [24, 12, 24], [6, 12, 24],
        [6, 12, 12], [9, 18, 18], [9, 15, 30], [4.5, 15, 30], [3, 15, 30],
        [1.5, 15, 30], [12, 24, 24], [12, 20, 30], [24, 24, 12], [18, 36, 36],
        [24, 60, 40], [6, 30, 15], [12, 60, 30],
      ]);
      const i1 = clean(v / r1);
      const i2 = clean(v / r2);
      const it = clean(i1 + i2);
      const req = clean((r1 * r2) / (r1 + r2));
      return {
        skill: L("Corriente total en un circuito en paralelo", "Total current in a parallel circuit"),
        statement: L(
          `Dos resistencias de $${r1}\\ \\Omega$ y $${r2}\\ \\Omega$ están conectadas **en paralelo** entre los bornes de una batería ideal de $${tk(v)}\\ \\text{V}$. ¿Qué corriente total entrega la batería? (2 cifras significativas)`,
          `Two resistors of $${r1}\\ \\Omega$ and $${r2}\\ \\Omega$ are connected **in parallel** across an ideal $${tk(v)}\\ \\text{V}$ battery. What total current does the battery deliver? (2 significant figures)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: sig2(it),
          tolerance: { mode: "sigfig", value: 2 },
          units: ["A", "ampere", "amperes", "amperio", "amperios"],
          unitChoices: ["A", "mA", "V", "Ω"],
        },
        hints: [
          L(
            "En paralelo, las dos resistencias están sometidas a la misma tensión: la de la batería.",
            "In parallel, both resistors are subject to the same voltage: the battery voltage.",
          ),
          L(
            "Calcula por separado la corriente de cada rama con la ley de Ohm.",
            "Compute the current of each branch separately using Ohm's law.",
          ),
          L(
            "La corriente que sale de la batería es la suma de las corrientes de las ramas (regla de los nodos).",
            "The current leaving the battery is the sum of the branch currents (junction rule).",
          ),
        ],
        answerDisplay: L(`$I_{total} = ${tk(it)}\\ \\text{A}$`, `$I_{total} = ${tk(it)}\\ \\text{A}$`),
        solution: [
          step(
            "given",
            `$V = ${tk(v)}\\ \\text{V}$; $R_1 = ${r1}\\ \\Omega$ y $R_2 = ${r2}\\ \\Omega$ en paralelo.`,
            `$V = ${tk(v)}\\ \\text{V}$; $R_1 = ${r1}\\ \\Omega$ and $R_2 = ${r2}\\ \\Omega$ in parallel.`,
          ),
          step(
            "approach",
            "En paralelo la tensión es común: $I_1 = V/R_1$ e $I_2 = V/R_2$; la corriente total es $I_t = I_1 + I_2$ (primera ley de Kirchhoff).",
            "In parallel the voltage is shared: $I_1 = V/R_1$ and $I_2 = V/R_2$; the total current is $I_t = I_1 + I_2$ (Kirchhoff's junction rule).",
          ),
          step(
            "calculation",
            `$I_1 = \\dfrac{${tk(v)}}{${r1}} = ${tk(i1)}\\ \\text{A}$, $I_2 = \\dfrac{${tk(v)}}{${r2}} = ${tk(i2)}\\ \\text{A}$<br>$I_t = ${tk(i1)} + ${tk(i2)} = ${tk(it)}\\ \\text{A}$<br>(equivalente: $R_{eq} = ${tk(req)}\\ \\Omega$ e $I_t = V/R_{eq}$)`,
            `$I_1 = \\dfrac{${tk(v)}}{${r1}} = ${tk(i1)}\\ \\text{A}$, $I_2 = \\dfrac{${tk(v)}}{${r2}} = ${tk(i2)}\\ \\text{A}$<br>$I_t = ${tk(i1)} + ${tk(i2)} = ${tk(it)}\\ \\text{A}$<br>(equivalently: $R_{eq} = ${tk(req)}\\ \\Omega$ and $I_t = V/R_{eq}$)`,
          ),
          step(
            "result",
            `La batería entrega una corriente total de $${tk(it)}\\ \\text{A}$.`,
            `The battery delivers a total current of $${tk(it)}\\ \\text{A}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Kirchhoff junction rule                                          */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "cir-kirch-01",
      subject: "physics",
      topicId: "circuits",
      subtopicId: "kirchhoff",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 120,
      tags: ["kirchhoff", "junction-rule"],
      prerequisites: ["current"],
    },
    (rng) => {
      const twoIn = rng.bool();
      const [a, b] = rng.pick([
        [0.6, 0.4], [1.2, 0.8], [0.45, 0.15], [0.75, 0.45], [1.5, 2.5],
        [0.3, 0.2], [0.8, 0.4], [0.25, 0.75], [1.8, 1.2], [0.5, 0.25], [0.9, 0.6],
      ]);
      const s = clean(a + b);
      return {
        skill: L("Primera ley de Kirchhoff (nodos)", "Kirchhoff's junction rule"),
        statement: twoIn
          ? L(
              `En un nodo de un circuito se encuentran tres cables. Por el primero **entra** una corriente de $${tk(a)}\\ \\text{A}$ y por el segundo **entra** otra de $${tk(b)}\\ \\text{A}$. Por el tercero **sale** la corriente $I_3$. ¿Cuánto vale $I_3$? (2 cifras significativas)`,
              `Three wires meet at a node in a circuit. A current of $${tk(a)}\\ \\text{A}$ flows **into** the node through the first wire and $${tk(b)}\\ \\text{A}$ **into** it through the second. The current $I_3$ flows **out** through the third. What is $I_3$? (2 significant figures)`,
            )
          : L(
              `A un nodo de un circuito **llega** una corriente de $${tk(s)}\\ \\text{A}$. Por otros dos cables **salen** corrientes del nodo: una de ellas es de $${tk(a)}\\ \\text{A}$ y la otra es la desconocida $I_3$. ¿Cuánto vale $I_3$? (2 cifras significativas)`,
              `A current of $${tk(s)}\\ \\text{A}$ flows **into** a circuit node. Two currents flow **out** of the node through two other wires: one of them is $${tk(a)}\\ \\text{A}$ and the other is the unknown $I_3$. What is $I_3$? (2 significant figures)`,
            ),
        answer: {
          kind: "numeric-unit",
          value: sig2(twoIn ? s : b),
          tolerance: { mode: "sigfig", value: 2 },
          units: ["A", "ampere", "amperes", "amperio", "amperios"],
          unitChoices: ["A", "mA", "V", "Ω"],
        },
        hints: [
          L(
            "La primera ley de Kirchhoff (regla de los nodos) expresa la conservación de la carga.",
            "Kirchhoff's first law (junction rule) expresses conservation of charge.",
          ),
          L(
            "La suma de las corrientes que entran en el nodo es igual a la suma de las que salen.",
            "The sum of the currents entering the node equals the sum of those leaving.",
          ),
          L(
            "Plantea «entra = sale» con los datos y despeja la corriente desconocida.",
            "Set up «in = out» with the data and solve for the unknown current.",
          ),
        ],
        answerDisplay: twoIn
          ? L(`$I_3 = ${tk(s)}\\ \\text{A}$`, `$I_3 = ${tk(s)}\\ \\text{A}$`)
          : L(`$I_3 = ${tk(b)}\\ \\text{A}$`, `$I_3 = ${tk(b)}\\ \\text{A}$`),
        solution: twoIn
          ? [
              step(
                "given",
                `Entran al nodo: $${tk(a)}\\ \\text{A}$ y $${tk(b)}\\ \\text{A}$; sale: $I_3$.`,
                `Entering the node: $${tk(a)}\\ \\text{A}$ and $${tk(b)}\\ \\text{A}$; leaving: $I_3$.`,
              ),
              step(
                "approach",
                "Primera ley de Kirchhoff: $\\sum I_{entra} = \\sum I_{sale}$.",
                "Kirchhoff's junction rule: $\\sum I_{in} = \\sum I_{out}$.",
              ),
              step(
                "calculation",
                `$I_3 = ${tk(a)} + ${tk(b)} = ${tk(s)}\\ \\text{A}$`,
                `$I_3 = ${tk(a)} + ${tk(b)} = ${tk(s)}\\ \\text{A}$`,
              ),
              step(
                "result",
                `Por el tercer cable sale una corriente de $${tk(s)}\\ \\text{A}$.`,
                `A current of $${tk(s)}\\ \\text{A}$ flows out through the third wire.`,
              ),
            ]
          : [
              step(
                "given",
                `Entra al nodo: $${tk(s)}\\ \\text{A}$; salen: $${tk(a)}\\ \\text{A}$ y la incógnita $I_3$.`,
                `Entering the node: $${tk(s)}\\ \\text{A}$; leaving: $${tk(a)}\\ \\text{A}$ and the unknown $I_3$.`,
              ),
              step(
                "approach",
                "Primera ley de Kirchhoff: $\\sum I_{entra} = \\sum I_{sale}$.",
                "Kirchhoff's junction rule: $\\sum I_{in} = \\sum I_{out}$.",
              ),
              step(
                "calculation",
                `$${tk(s)} = ${tk(a)} + I_3$<br>$I_3 = ${tk(s)} - ${tk(a)} = ${tk(b)}\\ \\text{A}$`,
                `$${tk(s)} = ${tk(a)} + I_3$<br>$I_3 = ${tk(s)} - ${tk(a)} = ${tk(b)}\\ \\text{A}$`,
              ),
              step(
                "result",
                `Por ese cable sale una corriente de $${tk(b)}\\ \\text{A}$.`,
                `A current of $${tk(b)}\\ \\text{A}$ flows out through that wire.`,
              ),
            ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Kirchhoff loop rule: charging a battery                          */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "cir-kirch-02",
      subject: "physics",
      topicId: "circuits",
      subtopicId: "kirchhoff",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 240,
      tags: ["kirchhoff", "loop-rule", "emf"],
      prerequisites: ["kirchhoff", "ohms-law"],
    },
    (rng) => {
      const [e1, e2, r1, r2] = rng.pick([
        [12, 9, 15, 15], [12, 9, 10, 20], [15, 12, 10, 20], [15, 12, 15, 15],
        [15, 12, 30, 20], [9, 6, 15, 15], [9, 6, 10, 20], [9, 6, 30, 30],
        [13.5, 12, 10, 20], [13.5, 12, 15, 15], [12, 6, 20, 40], [24, 18, 30, 30],
        [24, 18, 60, 60], [15, 6, 30, 45], [12, 6, 25, 50], [9, 4.5, 15, 30],
        [18, 12, 30, 30], [24, 12, 60, 60],
      ]);
      const de = clean(e1 - e2);
      const rt = r1 + r2;
      const i = clean(de / rt);
      return {
        skill: L("Segunda ley de Kirchhoff en un lazo", "Kirchhoff's loop rule in a single loop"),
        statement: L(
          `Para cargar una batería recargable de fuerza electromotriz $\\varepsilon_2 = ${tk(e2)}\\ \\text{V}$ se conecta una fuente de $\\varepsilon_1 = ${tk(e1)}\\ \\text{V}$ en sentido contrario (la fuente carga a la batería). En el lazo hay, además, dos resistencias en serie: $R_1 = ${r1}\\ \\Omega$ y $R_2 = ${r2}\\ \\Omega$. Aplica la segunda ley de Kirchhoff para hallar la corriente de carga. (2 cifras significativas)`,
          `To recharge a battery of emf $\\varepsilon_2 = ${tk(e2)}\\ \\text{V}$, a source of $\\varepsilon_1 = ${tk(e1)}\\ \\text{V}$ is connected the opposite way round (the source charges the battery). The loop also contains two resistors in series: $R_1 = ${r1}\\ \\Omega$ and $R_2 = ${r2}\\ \\Omega$. Apply Kirchhoff's loop rule to find the charging current. (2 significant figures)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: sig2(i),
          tolerance: { mode: "sigfig", value: 2 },
          units: ["A", "ampere", "amperes", "amperio", "amperios"],
          unitChoices: ["A", "mA", "V", "Ω"],
        },
        hints: [
          L(
            "Recorre el lazo en el sentido en que empuja la fuente, que es la de mayor fem.",
            "Go around the loop in the direction pushed by the source, the one with the larger emf.",
          ),
          L(
            "Segunda ley de Kirchhoff: la suma de las fem con signo es igual a la suma de las caídas $I\\,R$.",
            "Kirchhoff's loop rule: the signed sum of the emfs equals the sum of the $I\\,R$ drops.",
          ),
          L(
            "La fem de la batería que se carga se resta: $\\varepsilon_1 - \\varepsilon_2 = I\\,(R_1 + R_2)$.",
            "The emf of the battery being charged subtracts: $\\varepsilon_1 - \\varepsilon_2 = I\\,(R_1 + R_2)$.",
          ),
        ],
        answerDisplay: L(`$I = ${tk(i)}\\ \\text{A}$`, `$I = ${tk(i)}\\ \\text{A}$`),
        solution: [
          step(
            "given",
            `$\\varepsilon_1 = ${tk(e1)}\\ \\text{V}$ (fuente), $\\varepsilon_2 = ${tk(e2)}\\ \\text{V}$ (batería que se carga), $R_1 = ${r1}\\ \\Omega$, $R_2 = ${r2}\\ \\Omega$, todo en un único lazo.`,
            `$\\varepsilon_1 = ${tk(e1)}\\ \\text{V}$ (source), $\\varepsilon_2 = ${tk(e2)}\\ \\text{V}$ (battery being charged), $R_1 = ${r1}\\ \\Omega$, $R_2 = ${r2}\\ \\Omega$, all in a single loop.`,
          ),
          step(
            "approach",
            "Segunda ley de Kirchhoff recorriendo el lazo en el sentido de la corriente: la fem de la fuente suma y la de la batería cargándose resta, $\\varepsilon_1 - \\varepsilon_2 = I\\,(R_1 + R_2)$.",
            "Kirchhoff's loop rule, going around in the direction of the current: the source's emf adds and the emf of the battery being charged subtracts, $\\varepsilon_1 - \\varepsilon_2 = I\\,(R_1 + R_2)$.",
          ),
          step(
            "calculation",
            `$${tk(e1)} - ${tk(e2)} = I \\cdot (${r1} + ${r2}) = I \\cdot ${rt}$<br>$I = \\dfrac{${tk(de)}}{${rt}} = ${tk(i)}\\ \\text{A}$`,
            `$${tk(e1)} - ${tk(e2)} = I \\cdot (${r1} + ${r2}) = I \\cdot ${rt}$<br>$I = \\dfrac{${tk(de)}}{${rt}} = ${tk(i)}\\ \\text{A}$`,
          ),
          step(
            "result",
            `La corriente de carga es $${tk(i)}\\ \\text{A}$, en el sentido que impone la fuente.`,
            `The charging current is $${tk(i)}\\ \\text{A}$, in the direction set by the source.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Electrical power: symbolic formula (expression)                  */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "cir-power-01",
      subject: "physics",
      topicId: "circuits",
      subtopicId: "electrical-power",
      difficulty: "easy",
      questionType: "expression",
      estimatedTimeSec: 90,
      tags: ["power", "formula", "symbolic"],
      prerequisites: ["ohms-law"],
    },
    (rng) => {
      const known = rng.pick(["voltage", "current"] as const);
      return {
        skill: L("Potencia disipada: formas de la ley", "Dissipated power: forms of the law"),
        statement:
          known === "voltage"
            ? L(
                `Una resistencia $R$ está conectada a una tensión $V$. Escribe la potencia $P$ que disipa **en función de $V$ y $R$**. (Usa * para multiplicar, / para dividir y ^ para las potencias; por ejemplo, V*I.)`,
                `A resistor $R$ is connected to a voltage $V$. Write the power $P$ it dissipates **in terms of $V$ and $R$**. (Use * for multiplication, / for division and ^ for powers; e.g. V*I.)`,
              )
            : L(
                `Por una resistencia $R$ circula una corriente $I$. Escribe la potencia $P$ que disipa **en función de $I$ y $R$**. (Usa * para multiplicar, / para dividir y ^ para las potencias; por ejemplo, I*V.)`,
                `A current $I$ flows through a resistor $R$. Write the power $P$ it dissipates **in terms of $I$ and $R$**. (Use * for multiplication, / for division and ^ for powers; e.g. I*V.)`,
              ),
        answer:
          known === "voltage"
            ? {
                kind: "expression",
                accepted: ["V^2/R", "V*V/R", "(V^2)/R"],
                variables: ["V", "R"],
              }
            : {
                kind: "expression",
                accepted: ["I^2*R", "I*I*R", "(I^2)*R"],
                variables: ["I", "R"],
              },
        hints:
          known === "voltage"
            ? [
                L(
                  "La potencia eléctrica se calcula como $P = V\\,I$.",
                  "Electric power is computed as $P = V\\,I$.",
                ),
                L(
                  "Aquí no conoces $I$ directamente, pero la ley de Ohm la expresa con $V$ y $R$.",
                  "Here you do not know $I$ directly, but Ohm's law expresses it with $V$ and $R$.",
                ),
                L(
                  "Sustituye $I = V/R$ dentro de $P = V\\,I$ y simplifica.",
                  "Substitute $I = V/R$ inside $P = V\\,I$ and simplify.",
                ),
              ]
            : [
                L(
                  "La potencia eléctrica se calcula como $P = V\\,I$.",
                  "Electric power is computed as $P = V\\,I$.",
                ),
                L(
                  "Con la ley de Ohm, la tensión entre los extremos de la resistencia es $V = I\\,R$.",
                  "By Ohm's law, the voltage across the resistor is $V = I\\,R$.",
                ),
                L(
                  "Sustituye $V = I\\,R$ dentro de $P = V\\,I$ y simplifica.",
                  "Substitute $V = I\\,R$ inside $P = V\\,I$ and simplify.",
                ),
              ],
        answerDisplay:
          known === "voltage"
            ? L(`$P = \\dfrac{V^2}{R}$`, `$P = \\dfrac{V^2}{R}$`)
            : L(`$P = I^2 R$`, `$P = I^2 R$`),
        solution:
          known === "voltage"
            ? [
                step(
                  "given",
                  `Resistencia $R$ con una tensión $V$ entre sus extremos; se pide $P$ en función de $V$ y $R$.`,
                  `A resistor $R$ with a voltage $V$ across it; we want $P$ in terms of $V$ and $R$.`,
                ),
                step(
                  "approach",
                  "Partimos de la definición $P = V\\,I$ y eliminamos $I$ con la ley de Ohm, $I = V/R$.",
                  "Start from the definition $P = V\\,I$ and eliminate $I$ using Ohm's law, $I = V/R$.",
                ),
                step(
                  "calculation",
                  `$P = V\\,I = V \\cdot \\dfrac{V}{R} = \\dfrac{V^2}{R}$`,
                  `$P = V\\,I = V \\cdot \\dfrac{V}{R} = \\dfrac{V^2}{R}$`,
                ),
                step(
                  "result",
                  `$P = \\dfrac{V^2}{R}$. (La forma equivalente sin $V$ es $P = I^2 R$.)`,
                  `$P = \\dfrac{V^2}{R}$. (The equivalent form without $V$ is $P = I^2 R$.)`,
                ),
              ]
            : [
                step(
                  "given",
                  `Resistencia $R$ recorrida por una corriente $I$; se pide $P$ en función de $I$ y $R$.`,
                  `A resistor $R$ carrying a current $I$; we want $P$ in terms of $I$ and $R$.`,
                ),
                step(
                  "approach",
                  "Partimos de la definición $P = V\\,I$ y eliminamos $V$ con la ley de Ohm, $V = I\\,R$.",
                  "Start from the definition $P = V\\,I$ and eliminate $V$ using Ohm's law, $V = I\\,R$.",
                ),
                step(
                  "calculation",
                  `$P = V\\,I = (I\\,R) \\cdot I = I^2 R$`,
                  `$P = V\\,I = (I\\,R) \\cdot I = I^2 R$`,
                ),
                step(
                  "result",
                  `$P = I^2 R$. (La forma equivalente sin $I$ es $P = V^2/R$.)`,
                  `$P = I^2 R$. (The equivalent form without $I$ is $P = V^2/R$.)`,
                ),
              ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Electrical power: P = V²/R for a device                          */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "cir-power-02",
      subject: "physics",
      topicId: "circuits",
      subtopicId: "electrical-power",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 150,
      tags: ["power", "ohms-law"],
      prerequisites: ["ohms-law", "electrical-power"],
    },
    (rng) => {
      const dev = rng.pick([
        { es: "Una bombilla de linterna", en: "A flashlight bulb" },
        { es: "Un calentador pequeño", en: "A small heater" },
        { es: "Un electrodoméstico", en: "A household appliance" },
      ]);
      const [v, r] = rng.pick([
        [12, 24], [12, 12], [6, 12], [9, 18], [24, 48], [24, 24], [6, 24],
        [12, 60], [9, 30], [12, 48], [24, 12], [18, 36], [12, 15], [9, 15],
        [6, 15], [3, 12], [1.5, 15], [12, 20], [6, 20], [18, 60], [24, 30],
        [12, 30], [6, 30], [9, 90], [6, 60], [3, 60], [1.5, 30], [24, 60], [18, 90],
      ]);
      const i = clean(v / r);
      const p = clean(v * i);
      return {
        skill: L("Potencia disipada por un dispositivo", "Power dissipated by a device"),
        statement: L(
          `${dev.es} tiene una resistencia de $${r}\\ \\Omega$ en funcionamiento y se conecta a una tensión de $${tk(v)}\\ \\text{V}$. ¿Qué potencia disipa? (2 cifras significativas)`,
          `${dev.en} has a resistance of $${r}\\ \\Omega$ in operation and is connected to a voltage of $${tk(v)}\\ \\text{V}$. How much power does it dissipate? (2 significant figures)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: sig2(p),
          tolerance: { mode: "sigfig", value: 2 },
          units: ["W", "watt", "watts", "vatio", "vatios"],
          unitChoices: ["W", "V", "A", "J"],
        },
        hints: [
          L(
            "Tienes la tensión $V$ y la resistencia $R$; la potencia puede escribirse sin calcular aparte la corriente.",
            "You have the voltage $V$ and the resistance $R$; the power can be written without computing the current separately.",
          ),
          L(
            "Combinando $P = V\\,I$ con $I = V/R$ queda $P = V^2/R$.",
            "Combining $P = V\\,I$ with $I = V/R$ gives $P = V^2/R$.",
          ),
          L(
            "Sustituye la tensión en voltios y la resistencia en ohmios; la potencia sale en vatios.",
            "Substitute the voltage in volts and the resistance in ohms; the power comes out in watts.",
          ),
        ],
        answerDisplay: L(`$P = ${tk(p)}\\ \\text{W}$`, `$P = ${tk(p)}\\ \\text{W}$`),
        solution: [
          step(
            "given",
            `$V = ${tk(v)}\\ \\text{V}$, $R = ${r}\\ \\Omega$; incógnita: la potencia $P$.`,
            `$V = ${tk(v)}\\ \\text{V}$, $R = ${r}\\ \\Omega$; unknown: the power $P$.`,
          ),
          step(
            "approach",
            "Potencia disipada en una resistencia: $P = \\dfrac{V^2}{R}$ (combinación de $P = V\\,I$ con la ley de Ohm).",
            "Power dissipated in a resistor: $P = \\dfrac{V^2}{R}$ (combining $P = V\\,I$ with Ohm's law).",
          ),
          step(
            "calculation",
            `$I = \\dfrac{${tk(v)}}{${r}} = ${tk(i)}\\ \\text{A}$<br>$P = V\\,I = ${tk(v)} \\cdot ${tk(i)} = ${tk(p)}\\ \\text{W}$<br>(equivalente: $P = \\dfrac{${tk(clean(v * v))}}{${r}} = ${tk(p)}\\ \\text{W}$)`,
            `$I = \\dfrac{${tk(v)}}{${r}} = ${tk(i)}\\ \\text{A}$<br>$P = V\\,I = ${tk(v)} \\cdot ${tk(i)} = ${tk(p)}\\ \\text{W}$<br>(equivalently: $P = \\dfrac{${tk(clean(v * v))}}{${r}} = ${tk(p)}\\ \\text{W}$)`,
          ),
          step(
            "result",
            `La potencia disipada es $${tk(p)}\\ \\text{W}$.`,
            `The dissipated power is $${tk(p)}\\ \\text{W}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Challenge: mixed series–parallel network, total power            */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "cir-chal-01",
      subject: "physics",
      topicId: "circuits",
      subtopicId: "electrical-power",
      difficulty: "challenge",
      questionType: "numeric-unit",
      estimatedTimeSec: 300,
      tags: ["series-parallel", "power", "multi-step"],
      prerequisites: ["series", "parallel", "electrical-power"],
    },
    (rng) => {
      const [v, r1, r2, r3] = rng.pick([
        [12, 20, 30, 60], [24, 40, 30, 60], [12, 28, 30, 60], [9, 15, 30, 30],
        [12, 60, 30, 60], [6, 10, 30, 15], [6, 18, 20, 30], [6, 10, 15, 30],
        [18, 40, 30, 60], [18, 16, 40, 60], [24, 36, 40, 60], [18, 24, 24, 24],
        [24, 30, 40, 120], [12, 20, 20, 20], [18, 20, 30, 60], [6, 20, 30, 60],
      ]);
      const r23 = clean((r2 * r3) / (r2 + r3));
      const rt = r1 + r23;
      const i = clean(v / rt);
      const p = clean(v * i);
      return {
        skill: L("Red mixta serie–paralelo: potencia total", "Mixed series–parallel network: total power"),
        statement: L(
          `Una batería ideal de $${v}\\ \\text{V}$ está conectada a una resistencia $R_1 = ${r1}\\ \\Omega$ en **serie** con un bloque de dos resistencias **en paralelo**, $R_2 = ${r2}\\ \\Omega$ y $R_3 = ${r3}\\ \\Omega$. ¿Qué potencia total entrega la batería? (2 cifras significativas)`,
          `An ideal $${v}\\ \\text{V}$ battery is connected to a resistor $R_1 = ${r1}\\ \\Omega$ in **series** with a block of two resistors **in parallel**, $R_2 = ${r2}\\ \\Omega$ and $R_3 = ${r3}\\ \\Omega$. What total power does the battery deliver? (2 significant figures)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: sig2(p),
          tolerance: { mode: "sigfig", value: 2 },
          units: ["W", "watt", "watts", "vatio", "vatios"],
          unitChoices: ["W", "V", "A", "Ω"],
        },
        hints: [
          L(
            "Reduce el circuito por etapas: primero el bloque en paralelo y después la serie.",
            "Reduce the circuit in stages: first the parallel block, then the series.",
          ),
          L(
            "El paralelo equivale a $R_{23} = R_2 R_3/(R_2 + R_3)$; súmale $R_1$ para obtener la resistencia total $R_t$.",
            "The parallel block equals $R_{23} = R_2 R_3/(R_2 + R_3)$; add $R_1$ to get the total resistance $R_t$.",
          ),
          L(
            "Con $R_t$, la corriente que sale de la batería es $I = V/R_t$ y la potencia buscada es $P = V\\,I$.",
            "With $R_t$, the current leaving the battery is $I = V/R_t$ and the required power is $P = V\\,I$.",
          ),
        ],
        answerDisplay: L(`$P = ${tk(p)}\\ \\text{W}$`, `$P = ${tk(p)}\\ \\text{W}$`),
        solution: [
          step(
            "given",
            `$V = ${v}\\ \\text{V}$; $R_1 = ${r1}\\ \\Omega$ en serie con $R_2 = ${r2}\\ \\Omega$ y $R_3 = ${r3}\\ \\Omega$ en paralelo.`,
            `$V = ${v}\\ \\text{V}$; $R_1 = ${r1}\\ \\Omega$ in series with $R_2 = ${r2}\\ \\Omega$ and $R_3 = ${r3}\\ \\Omega$ in parallel.`,
          ),
          step(
            "approach",
            "Sustituimos el paralelo por su equivalente, sumamos la serie, aplicamos la ley de Ohm a la batería y terminamos con $P = V\\,I$.",
            "Replace the parallel block by its equivalent, add the series resistor, apply Ohm's law to the battery and finish with $P = V\\,I$.",
          ),
          step(
            "calculation",
            `$R_{23} = \\dfrac{${r2} \\cdot ${r3}}{${r2} + ${r3}} = \\dfrac{${r2 * r3}}{${r2 + r3}} = ${tk(r23)}\\ \\Omega$<br>$R_t = ${r1} + ${tk(r23)} = ${tk(rt)}\\ \\Omega$<br>$I = \\dfrac{${v}}{${tk(rt)}} = ${tk(i)}\\ \\text{A}$<br>$P = V\\,I = ${v} \\cdot ${tk(i)} = ${tk(p)}\\ \\text{W}$`,
            `$R_{23} = \\dfrac{${r2} \\cdot ${r3}}{${r2} + ${r3}} = \\dfrac{${r2 * r3}}{${r2 + r3}} = ${tk(r23)}\\ \\Omega$<br>$R_t = ${r1} + ${tk(r23)} = ${tk(rt)}\\ \\Omega$<br>$I = \\dfrac{${v}}{${tk(rt)}} = ${tk(i)}\\ \\text{A}$<br>$P = V\\,I = ${v} \\cdot ${tk(i)} = ${tk(p)}\\ \\text{W}$`,
          ),
          step(
            "result",
            `La batería entrega una potencia total de $${tk(p)}\\ \\text{W}$ (también $P = V^2/R_t$).`,
            `The battery delivers a total power of $${tk(p)}\\ \\text{W}$ (also $P = V^2/R_t$).`,
          ),
        ],
      };
    },
  ),
];
