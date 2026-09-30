/**
 * PHYSICS · Fluids
 *
 * Density, pressure (definition + hydrostatic), Archimedes' buoyancy,
 * continuity and Bernoulli. Answers use numeric-unit with 2-significant-
 * figure tolerance (values pre-rounded), plus MC and expression types.
 * Vectors diagrams illustrate the force balance in floating/submerged
 * bodies.
 */

import { template, L, step, tok } from "@/lib/problem";
import type { ProblemTemplate, McOption } from "@/lib/types";

/** Rounds to 2 significant figures (for sigfig-tolerance answers). */
const r2 = (n: number): number => Number(n.toPrecision(2));

export const templates: ProblemTemplate[] = [
  /* ---------------------------------------------------------------- */
  /* Density from mass and volume                                     */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "fl-density-01",
      subject: "physics",
      topicId: "fluids",
      subtopicId: "density",
      difficulty: "easy",
      questionType: "numeric-unit",
      estimatedTimeSec: 90,
      tags: ["density", "unit-conversion"],
      prerequisites: [],
    },
    (rng) => {
      const blocks = [
        { m: 2.7, v: 1.0, mat: L("aluminio", "aluminium") },
        { m: 5.4, v: 2.0, mat: L("aluminio", "aluminium") },
        { m: 27, v: 10.0, mat: L("aluminio", "aluminium") },
        { m: 8.9, v: 1.0, mat: L("cobre", "copper") },
        { m: 17.8, v: 2.0, mat: L("cobre", "copper") },
        { m: 7.8, v: 1.0, mat: L("hierro", "iron") },
        { m: 3.9, v: 0.5, mat: L("hierro", "iron") },
      ];
      const b = rng.pick(blocks);
      const vM3 = b.v / 1000;
      const rho = r2(b.m / vM3);
      return {
        skill: L("Densidad a partir de masa y volumen", "Density from mass and volume"),
        statement: L(
          `Un bloque de ${b.mat.es} tiene una masa de $${tok(b.m)}\\ \\text{kg}$ y un volumen de $${tok(b.v)}\\ \\text{L}$. Calcula su densidad en $\\text{kg/m}^3$ (2 cifras significativas).`,
          `A block of ${b.mat.en} has a mass of $${tok(b.m)}\\ \\text{kg}$ and a volume of $${tok(b.v)}\\ \\text{L}$. Compute its density in $\\text{kg/m}^3$ (2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: rho,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["kg/m^3", "kg/m³", "kg/m3"],
          unitChoices: ["kg/m^3", "g/cm^3", "kg", "m^3"],
        },
        hints: [
          L(
            "Identifica los datos: masa y volumen; la incógnita es la densidad.",
            "Identify the data: mass and volume; the unknown is the density.",
          ),
          L(
            "Usa $\\rho = m/V$, con el volumen convertido a $\\text{m}^3$ ($1\\ \\text{L} = 0{,}001\\ \\text{m}^3$).",
            "Use $\\rho = m/V$, with the volume converted to $\\text{m}^3$ ($1\\ \\text{L} = 0.001\\ \\text{m}^3$).",
          ),
          L(
            "Convierte primero el volumen a metros cúbicos y después divide la masa entre ese volumen.",
            "Convert the volume to cubic metres first, then divide the mass by that volume.",
          ),
        ],
        answerDisplay: L(
          `$\\rho = ${tok(rho)}\\ \\text{kg/m}^3$`,
          `$\\rho = ${tok(rho)}\\ \\text{kg/m}^3$`,
        ),
        solution: [
          step(
            "given",
            `Masa: $m = ${tok(b.m)}\\ \\text{kg}$.<br>Volumen: $V = ${tok(b.v)}\\ \\text{L} = ${tok(vM3)}\\ \\text{m}^3$.`,
            `Mass: $m = ${tok(b.m)}\\ \\text{kg}$.<br>Volume: $V = ${tok(b.v)}\\ \\text{L} = ${tok(vM3)}\\ \\text{m}^3$.`,
          ),
          step(
            "approach",
            "La densidad es la masa por unidad de volumen: $\\rho = m/V$, en unidades del SI.",
            "Density is mass per unit volume: $\\rho = m/V$, in SI units.",
          ),
          step(
            "calculation",
            `$\\rho = \\dfrac{ ${tok(b.m)}\\ \\text{kg}}{ ${tok(vM3)}\\ \\text{m}^3} = ${tok(rho)}\\ \\text{kg/m}^3$`,
            `$\\rho = \\dfrac{ ${tok(b.m)}\\ \\text{kg}}{ ${tok(vM3)}\\ \\text{m}^3} = ${tok(rho)}\\ \\text{kg/m}^3$`,
          ),
          step(
            "result",
            `La densidad del bloque es $${tok(rho)}\\ \\text{kg/m}^3$.`,
            `The density of the block is $${tok(rho)}\\ \\text{kg/m}^3$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Pressure as force over area                                      */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "fl-pressure-01",
      subject: "physics",
      topicId: "fluids",
      subtopicId: "pressure",
      difficulty: "easy",
      questionType: "numeric-unit",
      estimatedTimeSec: 90,
      tags: ["pressure", "unit-conversion"],
      prerequisites: [],
    },
    (rng) => {
      const [F, aCm] = rng.pick([
        [100, 25], [100, 50], [100, 100],
        [150, 25], [150, 50], [150, 100], [150, 200],
        [200, 25], [200, 50], [200, 100],
        [250, 25], [250, 50], [250, 100],
        [300, 25], [300, 50], [300, 100], [300, 200],
        [400, 25], [400, 50], [400, 100], [400, 200],
        [500, 25], [500, 50], [500, 100], [500, 200],
      ]);
      const aM2 = aCm / 10000;
      const p = r2(F / aM2);
      return {
        skill: L("Presión como fuerza sobre área", "Pressure as force over area"),
        statement: L(
          `Una caja de peso $${F}\\ \\text{N}$ se apoya sobre el suelo con una zona de contacto de $${aCm}\\ \\text{cm}^2$. ¿Qué presión ejerce sobre el suelo, en pascales? (2 cifras significativas)`,
          `A box weighing $${F}\\ \\text{N}$ rests on the floor with a contact area of $${aCm}\\ \\text{cm}^2$. What pressure does it exert on the floor, in pascals? (2 significant figures)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: p,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["Pa", "pascal", "pascals"],
          unitChoices: ["Pa", "kPa", "N", "atm"],
        },
        hints: [
          L(
            "Identifica los datos: fuerza y área de contacto; te piden la presión.",
            "Identify the data: force and contact area; you are asked for the pressure.",
          ),
          L(
            "La presión es $P = F/A$, con el área en $\\text{m}^2$ ($1\\ \\text{cm}^2 = 10^{-4}\\ \\text{m}^2$).",
            "Pressure is $P = F/A$, with the area in $\\text{m}^2$ ($1\\ \\text{cm}^2 = 10^{-4}\\ \\text{m}^2$).",
          ),
          L(
            `Convierte el área a metros cuadrados y después divide la fuerza entre ella.`,
            `Convert the area to square metres and then divide the force by it.`,
          ),
        ],
        answerDisplay: L(`$P = ${tok(p)}\\ \\text{Pa}$`, `$P = ${tok(p)}\\ \\text{Pa}$`),
        solution: [
          step(
            "given",
            `Fuerza: $F = ${F}\\ \\text{N}$.<br>Área: $A = ${aCm}\\ \\text{cm}^2 = ${tok(aM2)}\\ \\text{m}^2$.`,
            `Force: $F = ${F}\\ \\text{N}$.<br>Area: $A = ${aCm}\\ \\text{cm}^2 = ${tok(aM2)}\\ \\text{m}^2$.`,
          ),
          step(
            "approach",
            "Definición de presión: $P = F/A$ con el área en unidades del SI.",
            "Definition of pressure: $P = F/A$ with the area in SI units.",
          ),
          step(
            "calculation",
            `$P = \\dfrac{${F}\\ \\text{N}}{ ${tok(aM2)}\\ \\text{m}^2} = ${tok(p)}\\ \\text{Pa}$`,
            `$P = \\dfrac{${F}\\ \\text{N}}{ ${tok(aM2)}\\ \\text{m}^2} = ${tok(p)}\\ \\text{Pa}$`,
          ),
          step(
            "result",
            `La presión sobre el suelo es $${tok(p)}\\ \\text{Pa}$.`,
            `The pressure on the floor is $${tok(p)}\\ \\text{Pa}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Pressure proportionality (conceptual MC)                         */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "fl-pressure-02",
      subject: "physics",
      topicId: "fluids",
      subtopicId: "pressure",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 60,
      tags: ["pressure", "proportionality"],
      prerequisites: [],
    },
    (rng) => {
      const scenarios = [
        {
          es: "se duplica la fuerza aplicada y el área no cambia",
          en: "the applied force is doubled and the area stays the same",
          effect: "double",
        },
        {
          es: "se duplica el área de contacto y la fuerza no cambia",
          en: "the contact area is doubled and the force stays the same",
          effect: "half",
        },
        {
          es: "se duplican la fuerza y el área de contacto",
          en: "both the force and the contact area are doubled",
          effect: "same",
        },
        {
          es: "la fuerza se reduce a la mitad y el área no cambia",
          en: "the force is halved and the area stays the same",
          effect: "half",
        },
        {
          es: "el área se reduce a la mitad y la fuerza no cambia",
          en: "the area is halved and the force stays the same",
          effect: "double",
        },
      ];
      const s = rng.pick(scenarios);
      const options: McOption[] = [
        {
          id: "a",
          text: L("La presión se duplica", "The pressure doubles"),
          correct: s.effect === "double",
        },
        {
          id: "b",
          text: L("La presión se reduce a la mitad", "The pressure is halved"),
          correct: s.effect === "half",
        },
        {
          id: "c",
          text: L("La presión no cambia", "The pressure does not change"),
          correct: s.effect === "same",
        },
        {
          id: "d",
          text: L("La presión se cuadruplica", "The pressure quadruples"),
          correct: false,
        },
      ];
      return {
        skill: L("Proporcionalidad de la presión", "Pressure proportionality"),
        statement: L(
          `Un objeto ejerce una presión $P = F/A$ sobre una superficie. En un segundo ensayo, ${s.es}. ¿Qué le ocurre a la presión?`,
          `An object exerts a pressure $P = F/A$ on a surface. In a second trial, ${s.en}. What happens to the pressure?`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Piensa en cómo depende $P$ de cada variable: ¿directa o inversamente?",
            "Think about how $P$ depends on each variable: directly or inversely?",
          ),
          L(
            "En $P = F/A$, la presión es proporcional a $F$ e inversamente proporcional a $A$.",
            "In $P = F/A$, pressure is proportional to $F$ and inversely proportional to $A$.",
          ),
          L(
            "Multiplica los factores de cambio: si $F$ cambia por $x$ y $A$ por $y$, entonces $P$ cambia por $x/y$.",
            "Multiply the change factors: if $F$ changes by $x$ and $A$ by $y$, then $P$ changes by $x/y$.",
          ),
        ],
        answerDisplay: L(
          s.effect === "double"
            ? "La presión se duplica"
            : s.effect === "half"
              ? "La presión se reduce a la mitad"
              : "La presión no cambia",
          s.effect === "double"
            ? "The pressure doubles"
            : s.effect === "half"
              ? "The pressure is halved"
              : "The pressure does not change",
        ),
        solution: [
          step(
            "given",
            `Cambio nuevo: ${s.es}. Presión inicial $P = F/A$.`,
            `New change: ${s.en}. Initial pressure $P = F/A$.`,
          ),
          step(
            "approach",
            "Analizamos la proporcionalidad: $P \\propto F$ y $P \\propto 1/A$.",
            "Analyse the proportionality: $P \\propto F$ and $P \\propto 1/A$.",
          ),
          step(
            "calculation",
            "Compara los factores de cambio de $F$ y de $A$ y divídelos: ese es el factor de $P$.",
            "Compare the change factors of $F$ and $A$ and divide them: that is the factor of $P$.",
          ),
          step(
            "result",
            s.effect === "double"
              ? "Como solo uno de los dos cambia a favor de $P$, la presión se duplica."
              : s.effect === "half"
                ? "El cambio neto reduce $P$ a la mitad."
                : "Los dos factores se compensan: la presión no cambia.",
            s.effect === "double"
              ? "Since only one of the two changes in favour of $P$, the pressure doubles."
              : s.effect === "half"
                ? "The net change halves $P$."
                : "The two factors cancel out: the pressure does not change.",
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Hydrostatic (gauge) pressure                                     */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "fl-hydro-01",
      subject: "physics",
      topicId: "fluids",
      subtopicId: "hydrostatic",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 120,
      tags: ["hydrostatic-pressure", "depth"],
      prerequisites: ["pressure"],
    },
    (rng) => {
      const h = rng.pick([2, 4, 5, 10, 12.5, 15, 20]);
      const pExact = 1000 * 9.8 * h;
      const p = r2(pExact);
      return {
        skill: L("Presión hidrostática", "Hydrostatic pressure"),
        statement: L(
          `Un buceador desciende a una profundidad de $${tok(h)}\\ \\text{m}$ en un lago de agua dulce ($\\rho = 1000\\ \\text{kg/m}^3$). ¿Qué presión **manométrica** (la debida solo al agua) soporta? Usa $g = 9{,}8\\ \\text{m/s}^2$ y da el resultado en pascales (2 cifras significativas).`,
          `A diver descends to a depth of $${tok(h)}\\ \\text{m}$ in a freshwater lake ($\\rho = 1000\\ \\text{kg/m}^3$). What **gauge** pressure (due to the water alone) does the diver experience? Use $g = 9.8\\ \\text{m/s}^2$ and give the answer in pascals (2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: p,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["Pa", "pascal", "pascals"],
          unitChoices: ["Pa", "kPa", "atm", "N"],
        },
        hints: [
          L(
            "Datos: la profundidad $h$ y la densidad del agua; te piden la presión debida a la columna de líquido (sin contar la atmosférica).",
            "Data: the depth $h$ and the density of water; you need the pressure due to the liquid column (not counting the atmosphere).",
          ),
          L(
            "La presión hidrostática es $P = \\rho\\, g\\, h$.",
            "Hydrostatic pressure is $P = \\rho\\, g\\, h$.",
          ),
          L(
            "Sustituye las tres cantidades en unidades del SI y multiplica.",
            "Substitute the three quantities in SI units and multiply.",
          ),
        ],
        answerDisplay: L(`$P \\approx ${tok(p)}\\ \\text{Pa}$`, `$P \\approx ${tok(p)}\\ \\text{Pa}$`),
        solution: [
          step(
            "given",
            `$h = ${tok(h)}\\ \\text{m}$, $\\rho = 1000\\ \\text{kg/m}^3$, $g = 9{,}8\\ \\text{m/s}^2$`,
            `$h = ${tok(h)}\\ \\text{m}$, $\\rho = 1000\\ \\text{kg/m}^3$, $g = 9.8\\ \\text{m/s}^2$`,
          ),
          step(
            "approach",
            "Presión manométrica de una columna de líquido: $P = \\rho\\, g\\, h$.",
            "Gauge pressure of a liquid column: $P = \\rho\\, g\\, h$.",
          ),
          step(
            "calculation",
            `$P = 1000 \\cdot 9{,}8 \\cdot ${tok(h)} = ${tok(pExact)}\\ \\text{Pa} \\approx ${tok(p)}\\ \\text{Pa}$`,
            `$P = 1000 \\cdot 9.8 \\cdot ${tok(h)} = ${tok(pExact)}\\ \\text{Pa} \\approx ${tok(p)}\\ \\text{Pa}$`,
          ),
          step(
            "result",
            `El agua ejerce una presión adicional de $\\approx ${tok(p)}\\ \\text{Pa}$.`,
            `The water exerts an extra pressure of $\\approx ${tok(p)}\\ \\text{Pa}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Buoyant force on a submerged object                              */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "fl-buoy-01",
      subject: "physics",
      topicId: "fluids",
      subtopicId: "buoyancy",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 120,
      tags: ["buoyancy", "archimedes"],
      prerequisites: ["density"],
    },
    (rng) => {
      const vL = rng.pick([1.5, 2, 3, 4, 5, 6, 8, 10]);
      const vM3 = vL / 1000;
      const fbExact = 1000 * 9.8 * vM3;
      const fb = r2(fbExact);
      return {
        skill: L("Empuje de Arquímedes", "Archimedes' buoyant force"),
        statement: L(
          `Se sumerge por completo un objeto de volumen $${tok(vL)}\\ \\text{L}$ en agua ($\\rho = 1000\\ \\text{kg/m}^3$). ¿Cuál es el módulo del empuje (fuerza de flotación) que actúa sobre él? ($g = 9{,}8\\ \\text{m/s}^2$; resultado en newtons, 2 cifras significativas)`,
          `An object of volume $${tok(vL)}\\ \\text{L}$ is fully submerged in water ($\\rho = 1000\\ \\text{kg/m}^3$). What is the magnitude of the buoyant force acting on it? ($g = 9.8\\ \\text{m/s}^2$; answer in newtons, 2 significant figures)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: fb,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["N", "newton", "newtons"],
          unitChoices: ["N", "Pa", "kg", "m/s^2"],
        },
        hints: [
          L(
            "Datos: el volumen del objeto sumergido y la densidad del fluido; te piden el empuje.",
            "Data: the submerged volume and the fluid density; you need the buoyant force.",
          ),
          L(
            "Principio de Arquímedes: $F_b = \\rho_{fluido}\\, V_{sumergido}\\, g$, con $V$ en $\\text{m}^3$.",
            "Archimedes' principle: $F_b = \\rho_{fluid}\\, V_{submerged}\\, g$, with $V$ in $\\text{m}^3$.",
          ),
          L(
            "Convierte el volumen a metros cúbicos y multiplica las tres cantidades.",
            "Convert the volume to cubic metres and multiply the three quantities.",
          ),
        ],
        answerDisplay: L(`$F_b \\approx ${tok(fb)}\\ \\text{N}$`, `$F_b \\approx ${tok(fb)}\\ \\text{N}$`),
        solution: [
          step(
            "given",
            `$V = ${tok(vL)}\\ \\text{L} = ${tok(vM3)}\\ \\text{m}^3$, $\\rho = 1000\\ \\text{kg/m}^3$, $g = 9{,}8\\ \\text{m/s}^2$`,
            `$V = ${tok(vL)}\\ \\text{L} = ${tok(vM3)}\\ \\text{m}^3$, $\\rho = 1000\\ \\text{kg/m}^3$, $g = 9.8\\ \\text{m/s}^2$`,
          ),
          step(
            "approach",
            "El empuje equivale al peso del fluido desalojado: $F_b = \\rho\\, V\\, g$.",
            "The buoyant force equals the weight of displaced fluid: $F_b = \\rho\\, V\\, g$.",
          ),
          step(
            "calculation",
            `$F_b = 1000 \\cdot ${tok(vM3)} \\cdot 9{,}8 = ${tok(fbExact)}\\ \\text{N} \\approx ${tok(fb)}\\ \\text{N}$`,
            `$F_b = 1000 \\cdot ${tok(vM3)} \\cdot 9.8 = ${tok(fbExact)}\\ \\text{N} \\approx ${tok(fb)}\\ \\text{N}$`,
          ),
          step(
            "result",
            `El empuje sobre el objeto es $\\approx ${tok(fb)}\\ \\text{N}$ hacia arriba.`,
            `The buoyant force on the object is $\\approx ${tok(fb)}\\ \\text{N}$ upward.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Buoyancy formula (expression answer)                             */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "fl-buoy-expr",
      subject: "physics",
      topicId: "fluids",
      subtopicId: "buoyancy",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 120,
      tags: ["buoyancy", "archimedes", "formula"],
      prerequisites: ["density"],
    },
    (rng) => {
      void rng;
      return {
        skill: L("Fórmula del empuje de Arquímedes", "Archimedes' buoyancy formula"),
        statement: L(
          "Escribe el módulo del empuje (fuerza de flotación) sobre un cuerpo sumergido, en función de la densidad del fluido **rho**, del volumen sumergido **V** y de la gravedad **g**. Usa esos nombres exactos y * para multiplicar (ejemplo de formato: $m\\cdot g$ escrito como m*g).",
          "Write the magnitude of the buoyant force on a submerged body, in terms of the fluid density **rho**, the submerged volume **V** and gravity **g**. Use exactly those names and * for multiplication (format example: $m\\cdot g$ written as m*g).",
        ),
        answer: {
          kind: "expression",
          accepted: ["rho*V*g"],
          variables: ["rho", "V", "g"],
        },
        hints: [
          L(
            "El empuje depende de tres cosas: cuánto fluido se desaloja (su densidad y su volumen) y con qué gravedad se pesa.",
            "The buoyant force depends on three things: how much fluid is displaced (its density and volume) and the gravity that weighs it.",
          ),
          L(
            "Por el principio de Arquímedes, $F_b$ es el **peso** del fluido desalojado.",
            "By Archimedes' principle, $F_b$ is the **weight** of the displaced fluid.",
          ),
          L(
            "Un peso es masa por gravedad, y la masa desalojada es densidad por volumen: los tres factores se multiplican.",
            "A weight is mass times gravity, and the displaced mass is density times volume: the three factors multiply.",
          ),
        ],
        answerDisplay: L(`$F_b = \\rho\\, V\\, g$`, `$F_b = \\rho\\, V\\, g$`),
        solution: [
          step(
            "given",
            "Incógnita: $F_b$ en función de $\\rho$ (fluido), $V$ (sumergido) y $g$.",
            "Unknown: $F_b$ in terms of $\\rho$ (fluid), $V$ (submerged) and $g$.",
          ),
          step(
            "approach",
            "Principio de Arquímedes: el empuje es el peso del fluido desalojado.",
            "Archimedes' principle: the buoyant force is the weight of the displaced fluid.",
          ),
          step(
            "calculation",
            `Masa desalojada: $m = \\rho\\, V$.<br>Peso: $F_b = m\\, g = \\rho\\, V\\, g$`,
            `Displaced mass: $m = \\rho\\, V$.<br>Weight: $F_b = m\\, g = \\rho\\, V\\, g$`,
          ),
          step(
            "result",
            "La respuesta es el producto de los tres factores: rho*V*g.",
            "The answer is the product of the three factors: rho*V*g.",
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Continuity equation                                              */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "fl-cont-01",
      subject: "physics",
      topicId: "fluids",
      subtopicId: "continuity",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 120,
      tags: ["continuity", "flow"],
      prerequisites: [],
    },
    (rng) => {
      const [a1, v1, a2] = rng.pick([
        [12, 3, 4], [15, 4, 5], [20, 2, 4], [10, 3, 2], [30, 5, 6],
        [10, 2, 5], [12, 4, 3], [15, 3, 5], [20, 5, 4], [30, 3, 2],
        [18, 3, 6], [24, 4, 6], [16, 4, 2], [25, 2, 5], [24, 3, 4],
      ]);
      const v2 = r2((a1 * v1) / a2);
      return {
        skill: L("Ecuación de continuidad", "Continuity equation"),
        statement: L(
          `Por una tubería horizontal de sección $${a1}\\ \\text{cm}^2$ fluye agua con una rapidez de $${v1}\\ \\text{m/s}$. La tubería se estrecha hasta una sección de $${a2}\\ \\text{cm}^2$. ¿Con qué rapidez fluye el agua en la sección estrecha? (en m/s, 2 cifras significativas)`,
          `Water flows at $${v1}\\ \\text{m/s}$ through a horizontal pipe of cross-section $${a1}\\ \\text{cm}^2$. The pipe narrows to a cross-section of $${a2}\\ \\text{cm}^2$. How fast does the water flow in the narrow section? (in m/s, 2 significant figures)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: v2,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m/s"],
          unitChoices: ["m/s", "m/s^2", "cm^2", "L/s"],
        },
        hints: [
          L(
            "Datos: $A_1$, $v_1$ y $A_2$; la incógnita es $v_2$. El agua es incompresible, así que el caudal se conserva.",
            "Data: $A_1$, $v_1$ and $A_2$; the unknown is $v_2$. Water is incompressible, so the flow rate is conserved.",
          ),
          L(
            "Ecuación de continuidad: $A_1 v_1 = A_2 v_2$.",
            "Continuity equation: $A_1 v_1 = A_2 v_2$.",
          ),
          L(
            "Despeja $v_2 = A_1 v_1 / A_2$; como las dos áreas están en la misma unidad, no hace falta convertirlas.",
            "Solve $v_2 = A_1 v_1 / A_2$; since both areas are in the same unit, no conversion is needed.",
          ),
        ],
        answerDisplay: L(`$v_2 = ${tok(v2)}\\ \\text{m/s}$`, `$v_2 = ${tok(v2)}\\ \\text{m/s}$`),
        solution: [
          step(
            "given",
            `$A_1 = ${a1}\\ \\text{cm}^2$, $v_1 = ${v1}\\ \\text{m/s}$, $A_2 = ${a2}\\ \\text{cm}^2$`,
            `$A_1 = ${a1}\\ \\text{cm}^2$, $v_1 = ${v1}\\ \\text{m/s}$, $A_2 = ${a2}\\ \\text{cm}^2$`,
          ),
          step(
            "approach",
            "Caudal constante (fluido incompresible): $A_1 v_1 = A_2 v_2$.",
            "Constant flow rate (incompressible fluid): $A_1 v_1 = A_2 v_2$.",
          ),
          step(
            "calculation",
            `$v_2 = \\dfrac{A_1 v_1}{A_2} = \\dfrac{${a1} \\cdot ${v1}}{${a2}} = ${tok(v2)}\\ \\text{m/s}$`,
            `$v_2 = \\dfrac{A_1 v_1}{A_2} = \\dfrac{${a1} \\cdot ${v1}}{${a2}} = ${tok(v2)}\\ \\text{m/s}$`,
          ),
          step(
            "result",
            `En la sección estrecha el agua fluye a $${tok(v2)}\\ \\text{m/s}$: al disminuir el área, la rapidez aumenta.`,
            `In the narrow section the water flows at $${tok(v2)}\\ \\text{m/s}$: as the area decreases, the speed increases.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Total force on a dam (hydrostatic, hard)                         */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "fl-hydro-02",
      subject: "physics",
      topicId: "fluids",
      subtopicId: "hydrostatic",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 210,
      tags: ["hydrostatic-pressure", "force-on-dam"],
      prerequisites: ["hydrostatic"],
    },
    (rng) => {
      const [w, h] = rng.pick([
        [10, 3], [10, 4], [15, 4], [20, 4], [25, 4], [10, 6], [20, 3], [15, 6],
      ]);
      const pBar = 1000 * 9.8 * (h / 2);
      const area = w * h;
      const fExact = pBar * area;
      const f = r2(fExact);
      return {
        skill: L("Fuerza total sobre una presa", "Total force on a dam"),
        statement: L(
          `Una presa vertical retiene agua hasta una altura de $${h}\\ \\text{m}$; su anchura es de $${w}\\ \\text{m}$ y el agua llega justo al borde. ¿Qué fuerza total ejerce el agua sobre la presa? ($\\rho = 1000\\ \\text{kg/m}^3$, $g = 9{,}8\\ \\text{m/s}^2$; resultado en newtons, 2 cifras significativas)`,
          `A vertical dam holds water to a depth of $${h}\\ \\text{m}$; the dam is $${w}\\ \\text{m}$ wide and the water reaches the top edge. What total force does the water exert on the dam? ($\\rho = 1000\\ \\text{kg/m}^3$, $g = 9.8\\ \\text{m/s}^2$; answer in newtons, 2 significant figures)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: f,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["N", "newton", "newtons"],
          unitChoices: ["N", "kN", "Pa", "J"],
        },
        hints: [
          L(
            "La presión no es constante: crece linealmente con la profundidad. Piensa en la presión **media**.",
            "The pressure is not constant: it grows linearly with depth. Think of the **average** pressure.",
          ),
          L(
            "Usa $F = \\bar{P}\\, A$ con $\\bar{P} = \\rho\\, g\\, (h/2)$ (la presión al fondo es el doble de la media).",
            "Use $F = \\bar{P}\\, A$ with $\\bar{P} = \\rho\\, g\\, (h/2)$ (the bottom pressure is twice the average).",
          ),
          L(
            "Calcula por separado la presión media, el área de la presa $A = w\\, h$, y multiplica.",
            "Compute the average pressure, the dam area $A = w\\, h$, and multiply them.",
          ),
        ],
        answerDisplay: L(`$F \\approx ${tok(f)}\\ \\text{N}$`, `$F \\approx ${tok(f)}\\ \\text{N}$`),
        solution: [
          step(
            "given",
            `$h = ${h}\\ \\text{m}$, $w = ${w}\\ \\text{m}$, $\\rho = 1000\\ \\text{kg/m}^3$, $g = 9{,}8\\ \\text{m/s}^2$`,
            `$h = ${h}\\ \\text{m}$, $w = ${w}\\ \\text{m}$, $\\rho = 1000\\ \\text{kg/m}^3$, $g = 9.8\\ \\text{m/s}^2$`,
          ),
          step(
            "approach",
            "La presión crece de 0 (superficie) a $\\rho g h$ (fondo), así que la media es $\\bar{P} = \\rho g h/2$ y $F = \\bar{P}\\, A$.",
            "Pressure grows from 0 (surface) to $\\rho g h$ (bottom), so the average is $\\bar{P} = \\rho g h/2$ and $F = \\bar{P}\\, A$.",
          ),
          step(
            "calculation",
            `$\\bar{P} = 1000 \\cdot 9{,}8 \\cdot ${tok(h / 2)} = ${tok(pBar)}\\ \\text{Pa}$<br>$A = ${w} \\cdot ${h} = ${area}\\ \\text{m}^2$<br>$F = ${tok(pBar)} \\cdot ${area} = ${tok(fExact)}\\ \\text{N} \\approx ${tok(f)}\\ \\text{N}$`,
            `$\\bar{P} = 1000 \\cdot 9.8 \\cdot ${tok(h / 2)} = ${tok(pBar)}\\ \\text{Pa}$<br>$A = ${w} \\cdot ${h} = ${area}\\ \\text{m}^2$<br>$F = ${tok(pBar)} \\cdot ${area} = ${tok(fExact)}\\ \\text{N} \\approx ${tok(f)}\\ \\text{N}$`,
          ),
          step(
            "result",
            `El agua empuja la presa con una fuerza total de $\\approx ${tok(f)}\\ \\text{N}$.`,
            `The water pushes the dam with a total force of $\\approx ${tok(f)}\\ \\text{N}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Floating fraction (hard, diagram)                                */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "fl-buoy-02",
      subject: "physics",
      topicId: "fluids",
      subtopicId: "buoyancy",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 210,
      tags: ["buoyancy", "floating", "equilibrium"],
      prerequisites: ["buoyancy"],
    },
    (rng) => {
      const rhoObj = rng.pick([400, 500, 600, 700, 800, 900]);
      const pct = rhoObj / 10;
      return {
        skill: L("Fracción sumergida de un flotador", "Submerged fraction of a floating body"),
        statement: L(
          `Un bloque de madera de densidad $${rhoObj}\\ \\text{kg/m}^3$ flota en equilibrio en agua dulce ($\\rho_{agua} = 1000\\ \\text{kg/m}^3$). ¿Qué **porcentaje** de su volumen queda sumergido?`,
          `A wooden block of density $${rhoObj}\\ \\text{kg/m}^3$ floats in equilibrium in fresh water ($\\rho_{water} = 1000\\ \\text{kg/m}^3$). What **percentage** of its volume is submerged?`,
        ),
        diagram: {
          kind: "vectors",
          xMin: -20,
          xMax: 20,
          yMin: -80,
          yMax: 80,
          vectors: [
            { x: 0, y: 60, label: "F_b", color: "primary" },
            { x: 0, y: -60, label: "W", color: "secondary" },
          ],
          showComponents: false,
          showGrid: false,
        },
        diagramLabel: L(
          "Bloque flotando en equilibrio: el empuje F_b hacia arriba y el peso W hacia abajo tienen el mismo módulo.",
          "Block floating in equilibrium: the buoyant force F_b upward and the weight W downward have equal magnitude.",
        ),
        answer: { kind: "numeric", value: pct, unitSuffix: "%" },
        hints: [
          L(
            "Al flotar en equilibrio, dos fuerzas se compensan sobre el bloque.",
            "When floating in equilibrium, two forces on the block balance each other.",
          ),
          L(
            "Escribe el peso $W = \\rho_{objeto}\\, V_{total}\\, g$ y el empuje $F_b = \\rho_{agua}\\, V_{sumergido}\\, g$.",
            "Write the weight $W = \\rho_{object}\\, V_{total}\\, g$ and the buoyant force $F_b = \\rho_{water}\\, V_{submerged}\\, g$.",
          ),
          L(
            "Al igualarlas, $g$ se cancela y queda $\\dfrac{V_{sumergido}}{V_{total}} = \\dfrac{\\rho_{objeto}}{\\rho_{agua}}$; expresa ese cociente en porcentaje.",
            "Equating them cancels $g$, leaving $\\dfrac{V_{submerged}}{V_{total}} = \\dfrac{\\rho_{object}}{\\rho_{water}}$; express that ratio as a percentage.",
          ),
        ],
        answerDisplay: L(`$${pct}\\%$ del volumen`, `$${pct}\\%$ of the volume`),
        solution: [
          step(
            "given",
            `$\\rho_{objeto} = ${rhoObj}\\ \\text{kg/m}^3$, $\\rho_{agua} = 1000\\ \\text{kg/m}^3$, flotación en equilibrio.`,
            `$\\rho_{object} = ${rhoObj}\\ \\text{kg/m}^3$, $\\rho_{water} = 1000\\ \\text{kg/m}^3$, floating in equilibrium.`,
          ),
          step(
            "approach",
            "Equilibrio: $F_b = W$, es decir $\\rho_{agua}\\, V_{sum}\\, g = \\rho_{objeto}\\, V_{total}\\, g$.",
            "Equilibrium: $F_b = W$, i.e. $\\rho_{water}\\, V_{sub}\\, g = \\rho_{object}\\, V_{total}\\, g$.",
          ),
          step(
            "calculation",
            `$\\dfrac{V_{sum}}{V_{total}} = \\dfrac{${rhoObj}}{1000} = ${tok(rhoObj / 1000)} = ${tok(pct / 100)}$<br>En porcentaje: $${tok(pct / 100)} \\cdot 100 = ${pct}\\%$`,
            `$\\dfrac{V_{sub}}{V_{total}} = \\dfrac{${rhoObj}}{1000} = ${tok(rhoObj / 1000)} = ${tok(pct / 100)}$<br>As a percentage: $${tok(pct / 100)} \\cdot 100 = ${pct}\\%$`,
          ),
          step(
            "result",
            `Queda sumergido el $${pct}\\%$ del volumen del bloque.`,
            `$${pct}\\%$ of the block's volume is submerged.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Flow rate and filling time (hard)                                */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "fl-cont-02",
      subject: "physics",
      topicId: "fluids",
      subtopicId: "continuity",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 240,
      tags: ["continuity", "flow-rate", "two-step"],
      prerequisites: ["continuity"],
    },
    (rng) => {
      const [rCm, v, tank] = rng.pick([
        [2, 4, 1000], [1, 2, 500], [3, 2, 2000], [2, 2, 1000], [3, 3, 3000],
        [1, 4, 1000], [3, 4, 1500], [2, 5, 2500], [1, 5, 2000], [3, 5, 4000],
      ]);
      const rM = rCm / 100;
      const area = Math.PI * rM * rM;
      const qLps = area * v * 1000;
      const tExact = tank / qLps;
      const t = r2(tExact);
      return {
        skill: L("Caudal y tiempo de llenado", "Flow rate and filling time"),
        statement: L(
          `Una manguera de radio $${rCm}\\ \\text{cm}$ lleva agua con una rapidez de $${v}\\ \\text{m/s}$. Con ese chorro se llena un depósito de $${tank}\\ \\text{L}$. ¿Cuánto tarda en llenarse? (en segundos, 2 cifras significativas; usa $\\pi \\approx 3{,}14$)`,
          `A hose of radius $${rCm}\\ \\text{cm}$ carries water at a speed of $${v}\\ \\text{m/s}$. The jet fills a $${tank}\\ \\text{L}$ tank. How long does it take to fill? (in seconds, 2 significant figures; use $\\pi \\approx 3.14$)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: t,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["s", "segundo", "segundos", "second", "seconds"],
          unitChoices: ["s", "min", "L/s", "m^3"],
        },
        hints: [
          L(
            "Hay dos pasos: primero el caudal $Q = A\\, v$ y después el tiempo $t = V_{deposito}/Q$.",
            "There are two steps: first the flow rate $Q = A\\, v$, then the time $t = V_{tank}/Q$.",
          ),
          L(
            "El área de la sección es $A = \\pi r^2$ con $r$ en metros; el caudal en $\\text{m}^3/\\text{s}$ se pasa a litros por segundo ($1\\ \\text{m}^3 = 1000\\ \\text{L}$).",
            "The cross-section area is $A = \\pi r^2$ with $r$ in metres; convert the flow rate from $\\text{m}^3/\\text{s}$ to litres per second ($1\\ \\text{m}^3 = 1000\\ \\text{L}$).",
          ),
          L(
            "Calcula $Q$ en L/s y divide el volumen del depósito entre ese caudal.",
            "Compute $Q$ in L/s and divide the tank volume by that flow rate.",
          ),
        ],
        answerDisplay: L(`$t \\approx ${tok(t)}\\ \\text{s}$`, `$t \\approx ${tok(t)}\\ \\text{s}$`),
        solution: [
          step(
            "given",
            `$r = ${rCm}\\ \\text{cm} = ${tok(rM)}\\ \\text{m}$, $v = ${v}\\ \\text{m/s}$, $V_{deposito} = ${tank}\\ \\text{L}$`,
            `$r = ${rCm}\\ \\text{cm} = ${tok(rM)}\\ \\text{m}$, $v = ${v}\\ \\text{m/s}$, $V_{tank} = ${tank}\\ \\text{L}$`,
          ),
          step(
            "approach",
            "Caudal $Q = A\\, v$ con $A = \\pi r^2$; después $t = V/Q$ con ambos volúmenes en litros.",
            "Flow rate $Q = A\\, v$ with $A = \\pi r^2$; then $t = V/Q$ with both volumes in litres.",
          ),
          step(
            "calculation",
            `$A = \\pi \\cdot (${tok(rM)})^2 \\approx ${tok(Number(area.toFixed(4)))}\\ \\text{m}^2$<br>$Q = A \\cdot ${v} \\approx ${tok(Number((area * v).toFixed(5)))}\\ \\text{m}^3/\\text{s} = ${tok(Number(qLps.toFixed(2)))}\\ \\text{L/s}$<br>$t = \\dfrac{${tank}\\ \\text{L}}{ ${tok(Number(qLps.toFixed(2)))}\\ \\text{L/s}} \\approx ${tok(Number(tExact.toFixed(1)))}\\ \\text{s} \\approx ${tok(t)}\\ \\text{s}$`,
            `$A = \\pi \\cdot (${tok(rM)})^2 \\approx ${tok(Number(area.toFixed(4)))}\\ \\text{m}^2$<br>$Q = A \\cdot ${v} \\approx ${tok(Number((area * v).toFixed(5)))}\\ \\text{m}^3/\\text{s} = ${tok(Number(qLps.toFixed(2)))}\\ \\text{L/s}$<br>$t = \\dfrac{${tank}\\ \\text{L}}{ ${tok(Number(qLps.toFixed(2)))}\\ \\text{L/s}} \\approx ${tok(Number(tExact.toFixed(1)))}\\ \\text{s} \\approx ${tok(t)}\\ \\text{s}$`,
          ),
          step(
            "result",
            `El depósito tarda $\\approx ${tok(t)}\\ \\text{s}$ en llenarse.`,
            `The tank takes $\\approx ${tok(t)}\\ \\text{s}$ to fill.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Bernoulli: pressure drop in a narrowing (hard)                   */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "fl-bern-01",
      subject: "physics",
      topicId: "fluids",
      subtopicId: "bernoulli",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 240,
      tags: ["bernoulli", "flow"],
      prerequisites: ["continuity"],
    },
    (rng) => {
      const [v1, v2] = rng.pick([
        [1, 2], [1, 3], [1, 4], [1, 5], [2, 3], [2, 4], [2, 6], [3, 4], [3, 5],
      ]);
      const dpExact = 0.5 * 1000 * (v2 * v2 - v1 * v1);
      const dp = r2(dpExact);
      return {
        skill: L("Bernoulli en una tubería horizontal", "Bernoulli in a horizontal pipe"),
        statement: L(
          `El agua ($\\rho = 1000\\ \\text{kg/m}^3$) fluye por una tubería horizontal. En la sección ancha su rapidez es $${v1}\\ \\text{m/s}$ y en la estrecha es $${v2}\\ \\text{m/s}$. ¿Cuánto **disminuye** la presión al pasar de la sección ancha a la estrecha? (en pascales, 2 cifras significativas)`,
          `Water ($\\rho = 1000\\ \\text{kg/m}^3$) flows through a horizontal pipe. Its speed is $${v1}\\ \\text{m/s}$ in the wide section and $${v2}\\ \\text{m/s}$ in the narrow one. By how much does the pressure **drop** from the wide to the narrow section? (in pascals, 2 significant figures)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: dp,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["Pa", "pascal", "pascals"],
          unitChoices: ["Pa", "kPa", "N", "m/s"],
        },
        hints: [
          L(
            "La tubería es horizontal, así que la altura no cambia: solo intercambian presión y rapidez.",
            "The pipe is horizontal, so the height does not change: only pressure and speed trade off.",
          ),
          L(
            "Ecuación de Bernoulli con $y_1 = y_2$: $P_1 + \\tfrac{1}{2}\\rho v_1^2 = P_2 + \\tfrac{1}{2}\\rho v_2^2$.",
            "Bernoulli's equation with $y_1 = y_2$: $P_1 + \\tfrac{1}{2}\\rho v_1^2 = P_2 + \\tfrac{1}{2}\\rho v_2^2$.",
          ),
          L(
            "Despeja la caída de presión: $P_1 - P_2 = \\tfrac{1}{2}\\rho\\,(v_2^2 - v_1^2)$ y sustituye las dos rapideces.",
            "Solve for the pressure drop: $P_1 - P_2 = \\tfrac{1}{2}\\rho\\,(v_2^2 - v_1^2)$ and substitute both speeds.",
          ),
        ],
        answerDisplay: L(
          `$\\Delta P \\approx ${tok(dp)}\\ \\text{Pa}$`,
          `$\\Delta P \\approx ${tok(dp)}\\ \\text{Pa}$`,
        ),
        solution: [
          step(
            "given",
            `$v_1 = ${v1}\\ \\text{m/s}$, $v_2 = ${v2}\\ \\text{m/s}$, $\\rho = 1000\\ \\text{kg/m}^3$, tubería horizontal.`,
            `$v_1 = ${v1}\\ \\text{m/s}$, $v_2 = ${v2}\\ \\text{m/s}$, $\\rho = 1000\\ \\text{kg/m}^3$, horizontal pipe.`,
          ),
          step(
            "approach",
            "Bernoulli a altura constante: $P_1 + \\tfrac{1}{2}\\rho v_1^2 = P_2 + \\tfrac{1}{2}\\rho v_2^2$.",
            "Bernoulli at constant height: $P_1 + \\tfrac{1}{2}\\rho v_1^2 = P_2 + \\tfrac{1}{2}\\rho v_2^2$.",
          ),
          step(
            "calculation",
            `$P_1 - P_2 = \\tfrac{1}{2} \\cdot 1000 \\cdot (${v2}^2 - ${v1}^2)$<br>$= 500 \\cdot (${v2 * v2} - ${v1 * v1}) = 500 \\cdot ${v2 * v2 - v1 * v1} = ${tok(dpExact)}\\ \\text{Pa} \\approx ${tok(dp)}\\ \\text{Pa}$`,
            `$P_1 - P_2 = \\tfrac{1}{2} \\cdot 1000 \\cdot (${v2}^2 - ${v1}^2)$<br>$= 500 \\cdot (${v2 * v2} - ${v1 * v1}) = 500 \\cdot ${v2 * v2 - v1 * v1} = ${tok(dpExact)}\\ \\text{Pa} \\approx ${tok(dp)}\\ \\text{Pa}$`,
          ),
          step(
            "result",
            `La presión baja en $\\approx ${tok(dp)}\\ \\text{Pa}$: donde el fluido va más rápido, la presión es menor.`,
            `The pressure drops by $\\approx ${tok(dp)}\\ \\text{Pa}$: where the fluid moves faster, the pressure is lower.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Challenge: apparent weight → density                             */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "fl-chal-01",
      subject: "physics",
      topicId: "fluids",
      subtopicId: "buoyancy",
      difficulty: "challenge",
      questionType: "numeric-unit",
      estimatedTimeSec: 300,
      tags: ["buoyancy", "density", "multi-step"],
      prerequisites: ["buoyancy", "density"],
    },
    (rng) => {
      const [w, wa] = rng.pick([
        [50, 30], [40, 30], [60, 40], [25, 15], [90, 60],
        [30, 10], [80, 50], [70, 50], [45, 15],
      ]);
      const fb = w - wa;
      const rho = r2((w * 1000) / fb);
      return {
        skill: L("Densidad a partir del peso aparente", "Density from apparent weight"),
        statement: L(
          `Un objeto cuelga de un dinamómetro: en el aire marca $${w}\\ \\text{N}$ y, sumergido por completo en agua ($\\rho_{agua} = 1000\\ \\text{kg/m}^3$), marca $${wa}\\ \\text{N}$. ¿Cuál es la densidad del objeto? (en kg/m³, 2 cifras significativas)`,
          `An object hangs from a spring scale: in air it reads $${w}\\ \\text{N}$ and, fully submerged in water ($\\rho_{water} = 1000\\ \\text{kg/m}^3$), it reads $${wa}\\ \\text{N}$. What is the density of the object? (in kg/m³, 2 significant figures)`,
        ),
        diagram: {
          kind: "vectors",
          xMin: -15,
          xMax: 15,
          yMin: -(w + 10),
          yMax: w + 10,
          vectors: [
            { x: 0, y: -w, label: "W", color: "secondary" },
            { x: 0, y: wa, label: "T", color: "primary", from: { x: -7, y: 0 } },
            { x: 0, y: fb, label: "F_b", color: "muted", from: { x: 7, y: 0 } },
          ],
          showComponents: false,
          showGrid: false,
        },
        diagramLabel: L(
          `Objeto sumergido: peso W de ${w} N hacia abajo; hacia arriba, la tensión T de ${wa} N y el empuje F_b.`,
          `Submerged object: weight W of ${w} N downward; upward, the tension T of ${wa} N and the buoyant force F_b.`,
        ),
        answer: {
          kind: "numeric-unit",
          value: rho,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["kg/m^3", "kg/m³", "kg/m3"],
          unitChoices: ["kg/m^3", "g/cm^3", "kg", "N"],
        },
        hints: [
          L(
            "La diferencia entre las dos lecturas es el empuje; con él puedes obtener el volumen del objeto.",
            "The difference between the two readings is the buoyant force; from it you can get the object's volume.",
          ),
          L(
            "Usa $F_b = W - W_{aparente} = \\rho_{agua}\\, V\\, g$ para el volumen y $m = W/g$ para la masa.",
            "Use $F_b = W - W_{apparent} = \\rho_{water}\\, V\\, g$ for the volume and $m = W/g$ for the mass.",
          ),
          L(
            "Al dividir $m/V$, la gravedad se cancela: $\\rho_{objeto} = W\\ \\rho_{agua} / F_b$.",
            "When dividing $m/V$, gravity cancels: $\\rho_{object} = W\\ \\rho_{water} / F_b$.",
          ),
        ],
        answerDisplay: L(
          `$\\rho \\approx ${tok(rho)}\\ \\text{kg/m}^3$`,
          `$\\rho \\approx ${tok(rho)}\\ \\text{kg/m}^3$`,
        ),
        solution: [
          step(
            "given",
            `$W = ${w}\\ \\text{N}$ (aire), $W_{ap} = ${wa}\\ \\text{N}$ (sumergido), $\\rho_{agua} = 1000\\ \\text{kg/m}^3$, $g = 9{,}8\\ \\text{m/s}^2$.`,
            `$W = ${w}\\ \\text{N}$ (air), $W_{app} = ${wa}\\ \\text{N}$ (submerged), $\\rho_{water} = 1000\\ \\text{kg/m}^3$, $g = 9.8\\ \\text{m/s}^2$.`,
          ),
          step(
            "approach",
            "El empuje es la caída de la lectura: $F_b = W - W_{ap}$. Con él hallamos el volumen ($F_b = \\rho_{agua} V g$) y con el peso la masa ($m = W/g$); luego $\\rho = m/V$.",
            "The buoyant force is the drop in the reading: $F_b = W - W_{app}$. It gives the volume ($F_b = \\rho_{water} V g$) while the weight gives the mass ($m = W/g$); then $\\rho = m/V$.",
          ),
          step(
            "calculation",
            `$F_b = ${w} - ${wa} = ${fb}\\ \\text{N}$<br>$V = \\dfrac{F_b}{\\rho_{agua}\\, g} = \\dfrac{${fb}}{1000 \\cdot 9{,}8} = ${tok(r2(fb / 9800))}\\ \\text{m}^3$<br>$m = \\dfrac{W}{g} = \\dfrac{${w}}{9{,}8} = ${tok(r2(w / 9.8))}\\ \\text{kg}$<br>$\\rho = \\dfrac{m}{V} = \\dfrac{${w} \\cdot 1000}{${fb}} \\approx ${tok(rho)}\\ \\text{kg/m}^3$`,
            `$F_b = ${w} - ${wa} = ${fb}\\ \\text{N}$<br>$V = \\dfrac{F_b}{\\rho_{water}\\, g} = \\dfrac{${fb}}{1000 \\cdot 9.8} = ${tok(r2(fb / 9800))}\\ \\text{m}^3$<br>$m = \\dfrac{W}{g} = \\dfrac{${w}}{9.8} = ${tok(r2(w / 9.8))}\\ \\text{kg}$<br>$\\rho = \\dfrac{m}{V} = \\dfrac{${w} \\cdot 1000}{${fb}} \\approx ${tok(rho)}\\ \\text{kg/m}^3$`,
          ),
          step(
            "result",
            `La densidad del objeto es $\\approx ${tok(rho)}\\ \\text{kg/m}^3$ (más denso que el agua, por eso se hunde).`,
            `The object's density is $\\approx ${tok(rho)}\\ \\text{kg/m}^3$ (denser than water, which is why it sinks).`,
          ),
        ],
      };
    },
  ),
];
