/**
 * PHYSICS · Thermal Physics
 *
 * Temperature scales, sensible and latent heat, thermal expansion,
 * calorimetry (mixing and ice–water equilibrium), ideal gases and processes,
 * and the first law of thermodynamics (numeric, MC and expression types).
 * Values use school constants (c_water = 4186 J/(kg·K), L_f = 3.34×10⁵ J/kg)
 * with 2-significant-figure tolerance unless exact.
 */

import { template, L, step, tok } from "@/lib/problem";
import type { ProblemTemplate, McOption } from "@/lib/types";

/** Rounds to 2 significant figures (for sigfig-tolerance answers). */
const r2 = (n: number): number => Number(n.toPrecision(2));

/** Formats a signed value for math display: +250 / -300. */
const signed = (v: number): string => (v >= 0 ? `+${v}` : `-${Math.abs(v)}`);

export const templates: ProblemTemplate[] = [
  /* ---------------------------------------------------------------- */
  /* Celsius ↔ kelvin                                                 */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "tp-temp-01",
      subject: "physics",
      topicId: "thermal-physics",
      subtopicId: "temperature",
      difficulty: "easy",
      questionType: "numeric-unit",
      estimatedTimeSec: 60,
      tags: ["temperature", "scales", "conversion"],
      prerequisites: [],
    },
    (rng) => {
      const toKelvin = rng.bool();
      const tc = rng.pick([-40, -20, 0, 25, 37, 100, 150, 250]);
      const tk = tc + 273;
      return {
        skill: L("Conversión entre °C y K", "Converting between °C and K"),
        statement: toKelvin
          ? L(
            `Convierte $${tok(tc)}\\ ^\\circ\\text{C}$ a kelvin. (Usa $T_K = T_C + 273$.)`,
            `Convert $${tok(tc)}\\ ^\\circ\\text{C}$ to kelvin. (Use $T_K = T_C + 273$.)`,
          )
          : L(
            `Convierte $${tok(tk)}\\ \\text{K}$ a grados Celsius. (Usa $T_C = T_K - 273$.)`,
            `Convert $${tok(tk)}\\ \\text{K}$ to degrees Celsius. (Use $T_C = T_K - 273$.)`,
          ),
        answer: {
          kind: "numeric-unit",
          value: toKelvin ? tk : tc,
          tolerance: { mode: "absolute", value: 1 },
          units: toKelvin ? ["K", "kelvin", "kelvins"] : ["°C", "C", "celsius"],
          unitChoices: ["K", "°C", "J", "kg"],
        },
        hints: [
          L(
            "Identifica la escala del dato y la que te piden: las dos escalas tienen el mismo tamaño de grado, pero distinto cero.",
            "Identify the scale of the data and the one requested: both scales have the same degree size but a different zero.",
          ),
          L(
            "La relación es $T_K = T_C + 273$ (o equivalentemente $T_C = T_K - 273$).",
            "The relation is $T_K = T_C + 273$ (equivalently $T_C = T_K - 273$).",
          ),
          L(
            "Sustituye con cuidado del signo: de °C a K se suma 273; de K a °C se resta 273.",
            "Substitute carefully with the sign: going from °C to K you add 273; from K to °C you subtract 273.",
          ),
        ],
        answerDisplay: toKelvin
          ? L(`$T_K = ${tok(tk)}\\ \\text{K}$`, `$T_K = ${tok(tk)}\\ \\text{K}$`)
          : L(`$T_C = ${tok(tc)}\\ ^\\circ\\text{C}$`, `$T_C = ${tok(tc)}\\ ^\\circ\\text{C}$`),
        solution: [
          step(
            "given",
            toKelvin
              ? `Dato: $T_C = ${tok(tc)}\\ ^\\circ\\text{C}$.`
              : `Dato: $T_K = ${tok(tk)}\\ \\text{K}$.`,
            toKelvin
              ? `Given: $T_C = ${tok(tc)}\\ ^\\circ\\text{C}$.`
              : `Given: $T_K = ${tok(tk)}\\ \\text{K}$.`,
          ),
          step(
            "approach",
            toKelvin
              ? "Sumamos el desplazamiento de cero: $T_K = T_C + 273$."
              : "Restamos el desplazamiento de cero: $T_C = T_K - 273$.",
            toKelvin
              ? "Add the zero offset: $T_K = T_C + 273$."
              : "Subtract the zero offset: $T_C = T_K - 273$.",
          ),
          step(
            "calculation",
            toKelvin
              ? `$T_K = ${tok(tc)} + 273 = ${tok(tk)}\\ \\text{K}$`
              : `$T_C = ${tok(tk)} - 273 = ${tok(tc)}\\ ^\\circ\\text{C}$`,
            toKelvin
              ? `$T_K = ${tok(tc)} + 273 = ${tok(tk)}\\ \\text{K}$`
              : `$T_C = ${tok(tk)} - 273 = ${tok(tc)}\\ ^\\circ\\text{C}$`,
          ),
          step(
            "result",
            toKelvin
              ? `Equivalen a $${tok(tk)}\\ \\text{K}$.`
              : `Equivalen a $${tok(tc)}\\ ^\\circ\\text{C}$.`,
            toKelvin
              ? `That equals $${tok(tk)}\\ \\text{K}$.`
              : `That equals $${tok(tc)}\\ ^\\circ\\text{C}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Sensible heat Q = m·c·ΔT                                         */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "tp-heat-01",
      subject: "physics",
      topicId: "thermal-physics",
      subtopicId: "heat",
      difficulty: "easy",
      questionType: "numeric-unit",
      estimatedTimeSec: 90,
      tags: ["heat", "specific-heat"],
      prerequisites: [],
    },
    (rng) => {
      const mass = rng.pick([0.5, 1, 1.5, 2, 3]);
      const dT = rng.pick([5, 10, 15, 20, 30]);
      const qExact = mass * 4186 * dT;
      const q = r2(qExact);
      return {
        skill: L("Calor sensible: $Q = mc\\Delta T$", "Sensible heat: $Q = mc\\Delta T$"),
        statement: L(
          `Se calienta $${tok(mass)}\\ \\text{kg}$ de agua y su temperatura sube $${dT}\\ ^\\circ\\text{C}$. ¿Cuánto calor hace falta? ($c_{agua} = 4186\\ \\text{J/(kg·K)}$; resultado en joules, 2 cifras significativas)`,
          `$${tok(mass)}\\ \\text{kg}$ of water is heated and its temperature rises by $${dT}\\ ^\\circ\\text{C}$. How much heat is required? ($c_{water} = 4186\\ \\text{J/(kg·K)}$; answer in joules, 2 significant figures)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: q,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["J", "joule", "joules"],
          unitChoices: ["J", "kJ", "K", "W"],
        },
        hints: [
          L(
            "Datos: la masa de agua, el cambio de temperatura y el calor específico; te piden el calor.",
            "Data: the mass of water, the temperature change and the specific heat; you need the heat.",
          ),
          L(
            "Calor sensible: $Q = m\\, c\\, \\Delta T$.",
            "Sensible heat: $Q = m\\, c\\, \\Delta T$.",
          ),
          L(
            "Sustituye las tres cantidades y multiplica; el resultado sale en joules.",
            "Substitute the three quantities and multiply; the result comes out in joules.",
          ),
        ],
        answerDisplay: L(`$Q \\approx ${tok(q)}\\ \\text{J}$`, `$Q \\approx ${tok(q)}\\ \\text{J}$`),
        solution: [
          step(
            "given",
            `$m = ${tok(mass)}\\ \\text{kg}$, $\\Delta T = ${dT}\\ ^\\circ\\text{C}$, $c = 4186\\ \\text{J/(kg·K)}$`,
            `$m = ${tok(mass)}\\ \\text{kg}$, $\\Delta T = ${dT}\\ ^\\circ\\text{C}$, $c = 4186\\ \\text{J/(kg·K)}$`,
          ),
          step(
            "approach",
            "Calor necesario para cambiar la temperatura: $Q = m\\,c\\,\\Delta T$.",
            "Heat needed to change the temperature: $Q = m\\,c\\,\\Delta T$.",
          ),
          step(
            "calculation",
            `$Q = ${tok(mass)} \\cdot 4186 \\cdot ${dT} = ${tok(qExact)}\\ \\text{J} \\approx ${tok(q)}\\ \\text{J}$`,
            `$Q = ${tok(mass)} \\cdot 4186 \\cdot ${dT} = ${tok(qExact)}\\ \\text{J} \\approx ${tok(q)}\\ \\text{J}$`,
          ),
          step(
            "result",
            `Hacen falta $\\approx ${tok(q)}\\ \\text{J}$ de calor.`,
            `About $${tok(q)}\\ \\text{J}$ of heat is required.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Latent heat of fusion                                            */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "tp-heat-02",
      subject: "physics",
      topicId: "thermal-physics",
      subtopicId: "heat",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 120,
      tags: ["latent-heat", "phase-change"],
      prerequisites: ["heat"],
    },
    (rng) => {
      const mass = rng.pick([0.1, 0.15, 0.4, 0.5, 1, 1.5, 2]);
      const qExact = mass * 334000;
      const q = r2(qExact);
      return {
        skill: L("Calor latente de fusión", "Latent heat of fusion"),
        statement: L(
          `¿Cuánto calor hay que aportar a $${tok(mass)}\\ \\text{kg}$ de hielo que está a $0\\ ^\\circ\\text{C}$ para fundirlo por completo? ($L_f = 3{,}34\\times 10^{5}\\ \\text{J/kg}$; resultado en joules, 2 cifras significativas)`,
          `How much heat must be supplied to $${tok(mass)}\\ \\text{kg}$ of ice at $0\\ ^\\circ\\text{C}$ to melt it completely? ($L_f = 3.34\\times 10^{5}\\ \\text{J/kg}$; answer in joules, 2 significant figures)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: q,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["J", "joule", "joules"],
          unitChoices: ["J", "kJ", "kg", "K"],
        },
        hints: [
          L(
            "Ojo: el hielo ya está a $0\\ ^\\circ\\text{C}$, así que todo el calor va al cambio de fase, no a subir la temperatura.",
            "Careful: the ice is already at $0\\ ^\\circ\\text{C}$, so all the heat goes into the phase change, not into raising the temperature.",
          ),
          L(
            "Calor latente: $Q = m\\, L_f$.",
            "Latent heat: $Q = m\\, L_f$.",
          ),
          L(
            "Multiplica la masa por el calor latente de fusión.",
            "Multiply the mass by the latent heat of fusion.",
          ),
        ],
        answerDisplay: L(`$Q \\approx ${tok(q)}\\ \\text{J}$`, `$Q \\approx ${tok(q)}\\ \\text{J}$`),
        solution: [
          step(
            "given",
            `$m = ${tok(mass)}\\ \\text{kg}$ de hielo a $0\\ ^\\circ\\text{C}$, $L_f = 3{,}34\\times 10^{5}\\ \\text{J/kg}$`,
            `$m = ${tok(mass)}\\ \\text{kg}$ of ice at $0\\ ^\\circ\\text{C}$, $L_f = 3.34\\times 10^{5}\\ \\text{J/kg}$`,
          ),
          step(
            "approach",
            "Cambio de fase a temperatura constante: $Q = m\\, L_f$.",
            "Phase change at constant temperature: $Q = m\\, L_f$.",
          ),
          step(
            "calculation",
            `$Q = ${tok(mass)} \\cdot 3{,}34\\times 10^{5} = ${tok(qExact)}\\ \\text{J} \\approx ${tok(q)}\\ \\text{J}$`,
            `$Q = ${tok(mass)} \\cdot 3.34\\times 10^{5} = ${tok(qExact)}\\ \\text{J} \\approx ${tok(q)}\\ \\text{J}$`,
          ),
          step(
            "result",
            `Se necesitan $\\approx ${tok(q)}\\ \\text{J}$ para fundir todo el hielo.`,
            `About $${tok(q)}\\ \\text{J}$ are needed to melt all the ice.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Linear thermal expansion                                         */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "tp-expansion-01",
      subject: "physics",
      topicId: "thermal-physics",
      subtopicId: "thermal-expansion",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 150,
      tags: ["thermal-expansion", "linear"],
      prerequisites: [],
    },
    (rng) => {
      const mats = [
        { a: 2.4e-5, aEs: "2{,}4", aEn: "2.4", es: "aluminio", en: "aluminium" },
        { a: 1.2e-5, aEs: "1{,}2", aEn: "1.2", es: "hierro", en: "iron" },
        { a: 1.7e-5, aEs: "1{,}7", aEn: "1.7", es: "cobre", en: "copper" },
        { a: 0.9e-5, aEs: "0{,}9", aEn: "0.9", es: "vidrio", en: "glass" },
      ];
      const [mi, l0, dT] = rng.pick([
        [0, 25, 40], [0, 100, 10], [0, 10, 10], [0, 50, 50], [0, 20, 30],
        [1, 50, 40], [1, 100, 50], [1, 20, 30], [1, 25, 20],
        [2, 20, 50], [2, 100, 50], [2, 10, 20], [2, 25, 40],
        [3, 100, 30], [3, 50, 20], [3, 25, 40], [3, 20, 50],
      ]);
      const mat = mats[mi];
      const dlM = mat.a * l0 * dT;
      const dlMm = r2(dlM * 1000);
      return {
        skill: L("Dilatación térmica lineal", "Linear thermal expansion"),
        statement: L(
          `Una barra de ${mat.es} de $${l0}\\ \\text{m}$ de longitud se calienta y su temperatura sube $${dT}\\ ^\\circ\\text{C}$. ¿Cuánto se alarga? ($\\alpha_{${mat.es}} = ${mat.aEs}\\times 10^{-5}\\ ^\\circ\\text{C}^{-1}$; resultado en milímetros, 2 cifras significativas)`,
          `A ${mat.en} bar $${l0}\\ \\text{m}$ long is heated and its temperature rises by $${dT}\\ ^\\circ\\text{C}$. By how much does it lengthen? ($\\alpha_{${mat.en}} = ${mat.aEn}\\times 10^{-5}\\ ^\\circ\\text{C}^{-1}$; answer in millimetres, 2 significant figures)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: dlMm,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["mm", "milímetros", "milimetros", "millimeters"],
          unitChoices: ["mm", "cm", "m", "°C"],
        },
        hints: [
          L(
            "Datos: longitud inicial, aumento de temperatura y coeficiente de dilatación; te piden el alargamiento.",
            "Data: initial length, temperature rise and expansion coefficient; you need the lengthening.",
          ),
          L(
            "Dilatación lineal: $\\Delta L = \\alpha\\, L_0\\, \\Delta T$.",
            "Linear expansion: $\\Delta L = \\alpha\\, L_0\\, \\Delta T$.",
          ),
          L(
            "Multiplica los tres factores (el resultado sale en metros) y conviértelo a milímetros multiplicando por 1000.",
            "Multiply the three factors (the result is in metres) and convert to millimetres by multiplying by 1000.",
          ),
        ],
        answerDisplay: L(
          `$\\Delta L \\approx ${tok(dlMm)}\\ \\text{mm}$`,
          `$\\Delta L \\approx ${tok(dlMm)}\\ \\text{mm}$`,
        ),
        solution: [
          step(
            "given",
            `$L_0 = ${l0}\\ \\text{m}$, $\\Delta T = ${dT}\\ ^\\circ\\text{C}$, $\\alpha = ${mat.aEs}\\times 10^{-5}\\ ^\\circ\\text{C}^{-1}$`,
            `$L_0 = ${l0}\\ \\text{m}$, $\\Delta T = ${dT}\\ ^\\circ\\text{C}$, $\\alpha = ${mat.aEn}\\times 10^{-5}\\ ^\\circ\\text{C}^{-1}$`,
          ),
          step(
            "approach",
            "Dilatación lineal: $\\Delta L = \\alpha\\, L_0\\, \\Delta T$.",
            "Linear expansion: $\\Delta L = \\alpha\\, L_0\\, \\Delta T$.",
          ),
          step(
            "calculation",
            `$\\Delta L = ${mat.aEs}\\times 10^{-5} \\cdot ${l0} \\cdot ${dT} = ${tok(Number(dlM.toFixed(4)))}\\ \\text{m} = ${tok(dlMm)}\\ \\text{mm}$`,
            `$\\Delta L = ${mat.aEn}\\times 10^{-5} \\cdot ${l0} \\cdot ${dT} = ${tok(Number(dlM.toFixed(4)))}\\ \\text{m} = ${tok(dlMm)}\\ \\text{mm}$`,
          ),
          step(
            "result",
            `La barra se alarga $\\approx ${tok(dlMm)}\\ \\text{mm}$.`,
            `The bar lengthens by $\\approx ${tok(dlMm)}\\ \\text{mm}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Molar volume of an ideal gas at STP                              */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "tp-gas-01",
      subject: "physics",
      topicId: "thermal-physics",
      subtopicId: "ideal-gases",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 150,
      tags: ["ideal-gas", "molar-volume", "stp"],
      prerequisites: [],
    },
    (rng) => {
      const n = rng.pick([0.5, 1, 2, 3, 4]);
      const vM3 = (n * 8.314 * 273) / 101300;
      const vL = r2(vM3 * 1000);
      return {
        skill: L("Volumen molar en condiciones normales", "Molar volume at STP"),
        statement: L(
          `En condiciones normales ($T = 273\\ \\text{K}$, $P = 1{,}013\\times 10^{5}\\ \\text{Pa}$), ¿qué volumen ocupa $${tok(n)}\\ \\text{mol}$ de un gas ideal? ($R = 8{,}314\\ \\text{J/(mol·K)}$; resultado en litros, 2 cifras significativas)`,
          `Under standard conditions ($T = 273\\ \\text{K}$, $P = 1.013\\times 10^{5}\\ \\text{Pa}$), what volume does $${tok(n)}\\ \\text{mol}$ of an ideal gas occupy? ($R = 8.314\\ \\text{J/(mol·K)}$; answer in litres, 2 significant figures)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: vL,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["L", "l", "liter", "liters", "litro", "litros"],
          unitChoices: ["L", "mL", "m^3", "mol"],
        },
        hints: [
          L(
            "Datos: presión, temperatura y cantidad de gas; te piden el volumen. La ecuación de estado los relaciona.",
            "Data: pressure, temperature and amount of gas; you need the volume. The equation of state relates them.",
          ),
          L(
            "Gas ideal: $PV = nRT$, así que $V = nRT/P$.",
            "Ideal gas: $PV = nRT$, so $V = nRT/P$.",
          ),
          L(
            "Sustituye en unidades del SI (el volumen sale en $\\text{m}^3$) y pasa a litros multiplicando por 1000.",
            "Substitute in SI units (the volume comes out in $\\text{m}^3$) and convert to litres by multiplying by 1000.",
          ),
        ],
        answerDisplay: L(`$V \\approx ${tok(vL)}\\ \\text{L}$`, `$V \\approx ${tok(vL)}\\ \\text{L}$`),
        solution: [
          step(
            "given",
            `$n = ${tok(n)}\\ \\text{mol}$, $T = 273\\ \\text{K}$, $P = 1{,}013\\times 10^{5}\\ \\text{Pa}$, $R = 8{,}314\\ \\text{J/(mol·K)}$`,
            `$n = ${tok(n)}\\ \\text{mol}$, $T = 273\\ \\text{K}$, $P = 1.013\\times 10^{5}\\ \\text{Pa}$, $R = 8.314\\ \\text{J/(mol·K)}$`,
          ),
          step(
            "approach",
            "Ecuación de los gases ideales despejada: $V = nRT/P$.",
            "Rearranged ideal-gas equation: $V = nRT/P$.",
          ),
          step(
            "calculation",
            `$V = \\dfrac{ ${tok(n)} \\cdot 8{,}314 \\cdot 273}{1{,}013\\times 10^{5}} = ${tok(Number(vM3.toFixed(4)))}\\ \\text{m}^3 = ${tok(vL)}\\ \\text{L}$`,
            `$V = \\dfrac{ ${tok(n)} \\cdot 8.314 \\cdot 273}{1.013\\times 10^{5}} = ${tok(Number(vM3.toFixed(4)))}\\ \\text{m}^3 = ${tok(vL)}\\ \\text{L}$`,
          ),
          step(
            "result",
            `El gas ocupa $\\approx ${tok(vL)}\\ \\text{L}$ (un mol ocupa unos 22,4 L en condiciones normales).`,
            `The gas occupies $\\approx ${tok(vL)}\\ \\text{L}$ (one mole occupies about 22.4 L at STP).`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Ideal gas proportionality (conceptual MC)                        */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "tp-gas-03",
      subject: "physics",
      topicId: "thermal-physics",
      subtopicId: "ideal-gases",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["ideal-gas", "proportionality", "gas-laws"],
      prerequisites: [],
    },
    (rng) => {
      const scenarios = [
        {
          es: "el volumen se mantiene constante y la temperatura absoluta (en K) se duplica",
          en: "the volume is kept constant and the absolute temperature (in K) doubles",
          asked: L("la presión", "the pressure"),
          effect: "double",
        },
        {
          es: "el volumen se mantiene constante y la temperatura absoluta (en K) se reduce a la mitad",
          en: "the volume is kept constant and the absolute temperature (in K) is halved",
          asked: L("la presión", "the pressure"),
          effect: "half",
        },
        {
          es: "la presión se mantiene constante y la temperatura absoluta (en K) se duplica",
          en: "the pressure is kept constant and the absolute temperature (in K) doubles",
          asked: L("el volumen", "the volume"),
          effect: "double",
        },
        {
          es: "la presión se mantiene constante y la temperatura absoluta (en K) se reduce a la mitad",
          en: "the pressure is kept constant and the absolute temperature (in K) is halved",
          asked: L("el volumen", "the volume"),
          effect: "half",
        },
        {
          es: "la temperatura se mantiene constante y el volumen se reduce a la mitad",
          en: "the temperature is kept constant and the volume is halved",
          asked: L("la presión", "the pressure"),
          effect: "double",
        },
        {
          es: "la temperatura se mantiene constante y el volumen se duplica",
          en: "the temperature is kept constant and the volume doubles",
          asked: L("la presión", "the pressure"),
          effect: "half",
        },
      ];
      const s = rng.pick(scenarios);
      const options: McOption[] = [
        { id: "a", text: L("Se duplica", "It doubles"), correct: s.effect === "double" },
        { id: "b", text: L("Se reduce a la mitad", "It is halved"), correct: s.effect === "half" },
        { id: "c", text: L("No cambia", "It does not change"), correct: false },
        { id: "d", text: L("Se cuadruplica", "It quadruples"), correct: false },
      ];
      return {
        skill: L("Proporcionalidades del gas ideal", "Ideal-gas proportionalities"),
        statement: L(
          `Cierto gas ideal permanece encerrado con la misma cantidad de moles. Si ${s.es}, ¿qué le ocurre a ${s.asked.es}?`,
          `A fixed amount of an ideal gas is kept in a container. If ${s.en}, what happens to ${s.asked.en}?`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Escribe la ecuación de estado $PV = nRT$ e identifica qué variables permanecen constantes.",
            "Write the equation of state $PV = nRT$ and identify which variables stay constant.",
          ),
          L(
            "Con $n$ y $R$ fijos se cumple $\\dfrac{P_1 V_1}{T_1} = \\dfrac{P_2 V_2}{T_2}$.",
            "With $n$ and $R$ fixed, $\\dfrac{P_1 V_1}{T_1} = \\dfrac{P_2 V_2}{T_2}$ holds.",
          ),
          L(
            "Aplica cocientes: la variable pedida cambia por el producto de los factores de cambio de las otras.",
            "Apply ratios: the requested variable changes by the product of the other variables' change factors.",
          ),
        ],
        answerDisplay: L(
          s.effect === "double" ? "Se duplica" : "Se reduce a la mitad",
          s.effect === "double" ? "It doubles" : "It is halved",
        ),
        solution: [
          step(
            "given",
            `Cambio: ${s.es}. Incógnita: ${s.asked.es}.`,
            `Change: ${s.en}. Unknown: ${s.asked.en}.`,
          ),
          step(
            "approach",
            "De $PV = nRT$ con $n$ constante: $\\dfrac{P_1 V_1}{T_1} = \\dfrac{P_2 V_2}{T_2}$.",
            "From $PV = nRT$ with constant $n$: $\\dfrac{P_1 V_1}{T_1} = \\dfrac{P_2 V_2}{T_2}$.",
          ),
          step(
            "calculation",
            "Sustituye los factores de cambio (×2 o ×½) en la relación y despeja el factor de la variable pedida.",
            "Substitute the change factors (×2 or ×½) into the relation and solve for the requested variable's factor.",
          ),
          step(
            "result",
            s.effect === "double"
              ? `La variable pedida se duplica.`
              : `La variable pedida se reduce a la mitad.`,
            s.effect === "double"
              ? `The requested variable doubles.`
              : `The requested variable is halved.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* First law symbolically (expression answer)                       */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "tp-first-expr",
      subject: "physics",
      topicId: "thermal-physics",
      subtopicId: "first-law",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 120,
      tags: ["first-law", "formula"],
      prerequisites: [],
    },
    (rng) => {
      void rng;
      return {
        skill: L("Primera ley de la termodinámica", "First law of thermodynamics"),
        statement: L(
          "Escribe el cambio de energía interna $\\Delta U$ de un gas en función del calor $Q$ que entra al gas y del trabajo $W$ que el gas realiza sobre el entorno. (Convención: $Q > 0$ entra al gas, $W > 0$ lo hace el gas. Formato de ejemplo: Q+W)",
          "Write the change in internal energy $\\Delta U$ of a gas in terms of the heat $Q$ entering the gas and the work $W$ the gas does on its surroundings. (Convention: $Q > 0$ enters the gas, $W > 0$ is done by the gas. Format example: Q+W)",
        ),
        answer: {
          kind: "expression",
          accepted: ["Q-W"],
          variables: ["Q", "W"],
        },
        hints: [
          L(
            "Es un balance de energía para el gas: dos formas de intercambiarla con el entorno.",
            "It is an energy balance for the gas: two ways of exchanging it with the surroundings.",
          ),
          L(
            "El calor que entra **aumenta** la energía interna; el trabajo que hace el gas **la gasta**.",
            "Heat entering **increases** the internal energy; work done by the gas **spends** it.",
          ),
          L(
            "Escribe el calor con su signo menos el trabajo con el suyo.",
            "Write the heat with its sign minus the work with its own.",
          ),
        ],
        answerDisplay: L(`$\\Delta U = Q - W$`, `$\\Delta U = Q - W$`),
        solution: [
          step(
            "given",
            "Incógnita: $\\Delta U$ en función de $Q$ (calor) y $W$ (trabajo).",
            "Unknown: $\\Delta U$ in terms of $Q$ (heat) and $W$ (work).",
          ),
          step(
            "approach",
            "Conservación de la energía aplicada al gas: primera ley de la termodinámica.",
            "Conservation of energy applied to the gas: the first law of thermodynamics.",
          ),
          step(
            "calculation",
            `Energía que entra ($Q$) menos energía que sale como trabajo ($W$): $\\Delta U = Q - W$.`,
            `Energy entering ($Q$) minus energy leaving as work ($W$): $\\Delta U = Q - W$.`,
          ),
          step(
            "result",
            "La respuesta es Q-W.",
            "The answer is Q-W.",
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Mixing two water samples (calorimetry, hard)                     */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "tp-calor-01",
      subject: "physics",
      topicId: "thermal-physics",
      subtopicId: "calorimetry",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 210,
      tags: ["calorimetry", "mixing", "equilibrium"],
      prerequisites: ["heat"],
    },
    (rng) => {
      const [m1, t1, m2, t2] = rng.pick([
        [0.3, 80, 0.2, 20], [0.5, 60, 0.5, 20], [0.4, 90, 0.1, 40],
        [0.2, 100, 0.3, 20], [0.6, 50, 0.4, 30], [0.25, 80, 0.25, 40],
        [0.4, 70, 0.1, 40], [0.3, 95, 0.2, 35],
      ]);
      const tf = (m1 * t1 + m2 * t2) / (m1 + m2);
      return {
        skill: L("Mezcla de agua: temperatura de equilibrio", "Mixing water: equilibrium temperature"),
        statement: L(
          `En un recipiente aislado se mezclan $${tok(m1)}\\ \\text{kg}$ de agua a $${t1}\\ ^\\circ\\text{C}$ con $${tok(m2)}\\ \\text{kg}$ de agua a $${t2}\\ ^\\circ\\text{C}$. ¿Cuál es la temperatura final de equilibrio?`,
          `In an insulated container $${tok(m1)}\\ \\text{kg}$ of water at $${t1}\\ ^\\circ\\text{C}$ is mixed with $${tok(m2)}\\ \\text{kg}$ of water at $${t2}\\ ^\\circ\\text{C}$. What is the final equilibrium temperature?`,
        ),
        answer: {
          kind: "numeric-unit",
          value: r2(tf),
          tolerance: { mode: "absolute", value: 0.5 },
          units: ["°C", "C", "celsius"],
          unitChoices: ["°C", "K", "J", "kg"],
        },
        hints: [
          L(
            "El agua caliente se enfría y la fría se calienta hasta una temperatura común: el sistema está aislado.",
            "The hot water cools and the cold water warms to a common temperature: the system is insulated.",
          ),
          L(
            "Balance de energía: el calor cedido por el agua caliente igual al absorbido por la fría, $m_1 c (T_1 - T_f) = m_2 c (T_f - T_2)$; el calor específico se cancela.",
            "Energy balance: heat given up by the hot water equals heat absorbed by the cold water, $m_1 c (T_1 - T_f) = m_2 c (T_f - T_2)$; the specific heat cancels.",
          ),
          L(
            "Despeja: $T_f = \\dfrac{m_1 T_1 + m_2 T_2}{m_1 + m_2}$ (una media ponderada por las masas).",
            "Solve: $T_f = \\dfrac{m_1 T_1 + m_2 T_2}{m_1 + m_2}$ (an average weighted by the masses).",
          ),
        ],
        answerDisplay: L(
          `$T_f = ${tok(r2(tf))}\\ ^\\circ\\text{C}$`,
          `$T_f = ${tok(r2(tf))}\\ ^\\circ\\text{C}$`,
        ),
        solution: [
          step(
            "given",
            `Agua caliente: $m_1 = ${tok(m1)}\\ \\text{kg}$, $T_1 = ${t1}\\ ^\\circ\\text{C}$.<br>Agua fría: $m_2 = ${tok(m2)}\\ \\text{kg}$, $T_2 = ${t2}\\ ^\\circ\\text{C}$.`,
            `Hot water: $m_1 = ${tok(m1)}\\ \\text{kg}$, $T_1 = ${t1}\\ ^\\circ\\text{C}$.<br>Cold water: $m_2 = ${tok(m2)}\\ \\text{kg}$, $T_2 = ${t2}\\ ^\\circ\\text{C}$.`,
          ),
          step(
            "approach",
            "Recipiente aislado → el calor total se conserva: $m_1 c (T_1 - T_f) = m_2 c (T_f - T_2)$, de donde $T_f$ es la media ponderada de las temperaturas.",
            "Insulated container → total heat is conserved: $m_1 c (T_1 - T_f) = m_2 c (T_f - T_2)$, so $T_f$ is the mass-weighted average of the temperatures.",
          ),
          step(
            "calculation",
            `$T_f = \\dfrac{ ${tok(m1)} \\cdot ${t1} + ${tok(m2)} \\cdot ${t2}}{ ${tok(m1)} + ${tok(m2)}} = \\dfrac{ ${tok(m1 * t1)} + ${tok(m2 * t2)}}{ ${tok(m1 + m2)}} = ${tok(r2(tf))}\\ ^\\circ\\text{C}$`,
            `$T_f = \\dfrac{ ${tok(m1)} \\cdot ${t1} + ${tok(m2)} \\cdot ${t2}}{ ${tok(m1)} + ${tok(m2)}} = \\dfrac{ ${tok(m1 * t1)} + ${tok(m2 * t2)}}{ ${tok(m1 + m2)}} = ${tok(r2(tf))}\\ ^\\circ\\text{C}$`,
          ),
          step(
            "result",
            `La mezcla queda en equilibrio a $${tok(r2(tf))}\\ ^\\circ\\text{C}$ (entre las dos temperaturas iniciales).`,
            `The mixture settles at $${tok(r2(tf))}\\ ^\\circ\\text{C}$ (between the two initial temperatures).`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Gas processes: Charles / Gay-Lussac / Boyle (hard)               */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "tp-gas-02",
      subject: "physics",
      topicId: "thermal-physics",
      subtopicId: "processes",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 210,
      tags: ["gas-laws", "processes", "rearrangement"],
      prerequisites: ["ideal-gases"],
    },
    (rng) => {
      type Proc =
        | { kind: "isobaric"; v1: number; t1: number; t2: number; v2: number }
        | { kind: "isochoric"; p1: number; t1: number; t2: number; p2: number }
        | { kind: "isothermal"; p1: number; v1: number; v2: number; p2: number };
      const procs: Proc[] = [
        { kind: "isobaric", v1: 6, t1: 300, t2: 450, v2: 9 },
        { kind: "isobaric", v1: 4, t1: 300, t2: 450, v2: 6 },
        { kind: "isobaric", v1: 6, t1: 300, t2: 200, v2: 4 },
        { kind: "isobaric", v1: 8, t1: 400, t2: 300, v2: 6 },
        { kind: "isobaric", v1: 9, t1: 300, t2: 400, v2: 12 },
        { kind: "isochoric", p1: 100, t1: 300, t2: 450, p2: 150 },
        { kind: "isochoric", p1: 200, t1: 400, t2: 300, p2: 150 },
        { kind: "isochoric", p1: 150, t1: 300, t2: 500, p2: 250 },
        { kind: "isochoric", p1: 100, t1: 300, t2: 150, p2: 50 },
        { kind: "isothermal", p1: 100, v1: 6, v2: 2, p2: 300 },
        { kind: "isothermal", p1: 200, v1: 3, v2: 6, p2: 100 },
        { kind: "isothermal", p1: 150, v1: 4, v2: 2, p2: 300 },
      ];
      const p = rng.pick(procs);
      if (p.kind === "isobaric") {
        return {
          skill: L("Ley de Charles (presión constante)", "Charles's law (constant pressure)"),
          statement: L(
            `Un gas ocupa $${p.v1}\\ \\text{L}$ a $${p.t1}\\ \\text{K}$. Se calienta a **presión constante** hasta $${p.t2}\\ \\text{K}$. ¿Cuál es su nuevo volumen? (en litros, 2 cifras significativas)`,
            `A gas occupies $${p.v1}\\ \\text{L}$ at $${p.t1}\\ \\text{K}$. It is heated at **constant pressure** to $${p.t2}\\ \\text{K}$. What is its new volume? (in litres, 2 significant figures)`,
          ),
          answer: {
            kind: "numeric-unit",
            value: r2(p.v2),
            tolerance: { mode: "sigfig", value: 2 },
            units: ["L", "l", "liter", "liters", "litro", "litros"],
            unitChoices: ["L", "mL", "K", "kPa"],
          },
          hints: [
            L(
              "Identifica qué se mantiene constante: la presión. Relaciona volumen y temperatura absoluta.",
              "Identify what stays constant: the pressure. Relate volume and absolute temperature.",
            ),
            L(
              "A presión constante: $\\dfrac{V_1}{T_1} = \\dfrac{V_2}{T_2}$ (ley de Charles).",
              "At constant pressure: $\\dfrac{V_1}{T_1} = \\dfrac{V_2}{T_2}$ (Charles's law).",
            ),
            L(
              "Despeja $V_2 = V_1\\, T_2 / T_1$ y sustituye las temperaturas en kelvin.",
              "Solve $V_2 = V_1\\, T_2 / T_1$ and substitute the temperatures in kelvin.",
            ),
          ],
          answerDisplay: L(`$V_2 = ${tok(r2(p.v2))}\\ \\text{L}$`, `$V_2 = ${tok(r2(p.v2))}\\ \\text{L}$`),
          solution: [
            step(
              "given",
              `$V_1 = ${p.v1}\\ \\text{L}$, $T_1 = ${p.t1}\\ \\text{K}$, $T_2 = ${p.t2}\\ \\text{K}$, presión constante.`,
              `$V_1 = ${p.v1}\\ \\text{L}$, $T_1 = ${p.t1}\\ \\text{K}$, $T_2 = ${p.t2}\\ \\text{K}$, constant pressure.`,
            ),
            step(
              "approach",
              "Ley de Charles: $\\dfrac{V_1}{T_1} = \\dfrac{V_2}{T_2}$, así que $V_2 = V_1 T_2/T_1$.",
              "Charles's law: $\\dfrac{V_1}{T_1} = \\dfrac{V_2}{T_2}$, so $V_2 = V_1 T_2/T_1$.",
            ),
            step(
              "calculation",
              `$V_2 = ${p.v1} \\cdot \\dfrac{${p.t2}}{${p.t1}} = \\dfrac{${p.v1 * p.t2}}{${p.t1}} = ${tok(r2(p.v2))}\\ \\text{L}$`,
              `$V_2 = ${p.v1} \\cdot \\dfrac{${p.t2}}{${p.t1}} = \\dfrac{${p.v1 * p.t2}}{${p.t1}} = ${tok(r2(p.v2))}\\ \\text{L}$`,
            ),
            step(
              "result",
              `El nuevo volumen es $${tok(r2(p.v2))}\\ \\text{L}$.`,
              `The new volume is $${tok(r2(p.v2))}\\ \\text{L}$.`,
            ),
          ],
        };
      }
      if (p.kind === "isochoric") {
        return {
          skill: L("Ley de Gay-Lussac (volumen constante)", "Gay-Lussac's law (constant volume)"),
          statement: L(
            `Un gas está en un recipiente rígido: a $${p.t1}\\ \\text{K}$ su presión es de $${p.p1}\\ \\text{kPa}$. Se calienta hasta $${p.t2}\\ \\text{K}$ a **volumen constante**. ¿Cuál es la nueva presión? (en kPa, 2 cifras significativas)`,
            `A gas sits in a rigid container: at $${p.t1}\\ \\text{K}$ its pressure is $${p.p1}\\ \\text{kPa}$. It is heated to $${p.t2}\\ \\text{K}$ at **constant volume**. What is the new pressure? (in kPa, 2 significant figures)`,
          ),
          answer: {
            kind: "numeric-unit",
            value: r2(p.p2),
            tolerance: { mode: "sigfig", value: 2 },
            units: ["kPa", "kpa", "kilopascal"],
            unitChoices: ["kPa", "Pa", "K", "L"],
          },
          hints: [
            L(
              "Identifica qué se mantiene constante: el volumen (recipiente rígido). Relaciona presión y temperatura absoluta.",
              "Identify what stays constant: the volume (rigid container). Relate pressure and absolute temperature.",
            ),
            L(
              "A volumen constante: $\\dfrac{P_1}{T_1} = \\dfrac{P_2}{T_2}$ (ley de Gay-Lussac).",
              "At constant volume: $\\dfrac{P_1}{T_1} = \\dfrac{P_2}{T_2}$ (Gay-Lussac's law).",
            ),
            L(
              "Despeja $P_2 = P_1\\, T_2 / T_1$ y sustituye las temperaturas en kelvin.",
              "Solve $P_2 = P_1\\, T_2 / T_1$ and substitute the temperatures in kelvin.",
            ),
          ],
          answerDisplay: L(`$P_2 = ${tok(r2(p.p2))}\\ \\text{kPa}$`, `$P_2 = ${tok(r2(p.p2))}\\ \\text{kPa}$`),
          solution: [
            step(
              "given",
              `$P_1 = ${p.p1}\\ \\text{kPa}$, $T_1 = ${p.t1}\\ \\text{K}$, $T_2 = ${p.t2}\\ \\text{K}$, volumen constante.`,
              `$P_1 = ${p.p1}\\ \\text{kPa}$, $T_1 = ${p.t1}\\ \\text{K}$, $T_2 = ${p.t2}\\ \\text{K}$, constant volume.`,
            ),
            step(
              "approach",
              "Ley de Gay-Lussac: $\\dfrac{P_1}{T_1} = \\dfrac{P_2}{T_2}$, así que $P_2 = P_1 T_2/T_1$.",
              "Gay-Lussac's law: $\\dfrac{P_1}{T_1} = \\dfrac{P_2}{T_2}$, so $P_2 = P_1 T_2/T_1$.",
            ),
            step(
              "calculation",
              `$P_2 = ${p.p1} \\cdot \\dfrac{${p.t2}}{${p.t1}} = \\dfrac{${p.p1 * p.t2}}{${p.t1}} = ${tok(r2(p.p2))}\\ \\text{kPa}$`,
              `$P_2 = ${p.p1} \\cdot \\dfrac{${p.t2}}{${p.t1}} = \\dfrac{${p.p1 * p.t2}}{${p.t1}} = ${tok(r2(p.p2))}\\ \\text{kPa}$`,
            ),
            step(
              "result",
              `La nueva presión es $${tok(r2(p.p2))}\\ \\text{kPa}$.`,
              `The new pressure is $${tok(r2(p.p2))}\\ \\text{kPa}$.`,
            ),
          ],
        };
      }
      return {
        skill: L("Ley de Boyle (temperatura constante)", "Boyle's law (constant temperature)"),
        statement: L(
          `Un gas ocupa $${p.v1}\\ \\text{L}$ a una presión de $${p.p1}\\ \\text{kPa}$. Se comprime a **temperatura constante** hasta $${p.v2}\\ \\text{L}$. ¿Cuál es la nueva presión? (en kPa, 2 cifras significativas)`,
          `A gas occupies $${p.v1}\\ \\text{L}$ at a pressure of $${p.p1}\\ \\text{kPa}$. It is compressed at **constant temperature** to $${p.v2}\\ \\text{L}$. What is the new pressure? (in kPa, 2 significant figures)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: r2(p.p2),
          tolerance: { mode: "sigfig", value: 2 },
          units: ["kPa", "kpa", "kilopascal"],
          unitChoices: ["kPa", "Pa", "K", "L"],
        },
        hints: [
          L(
            "Identifica qué se mantiene constante: la temperatura. Relaciona presión y volumen.",
            "Identify what stays constant: the temperature. Relate pressure and volume.",
          ),
          L(
            "A temperatura constante: $P_1 V_1 = P_2 V_2$ (ley de Boyle).",
            "At constant temperature: $P_1 V_1 = P_2 V_2$ (Boyle's law).",
          ),
          L(
            "Despeja $P_2 = P_1 V_1 / V_2$: al comprimir, la presión sube.",
            "Solve $P_2 = P_1 V_1 / V_2$: compressing raises the pressure.",
          ),
        ],
        answerDisplay: L(`$P_2 = ${tok(r2(p.p2))}\\ \\text{kPa}$`, `$P_2 = ${tok(r2(p.p2))}\\ \\text{kPa}$`),
        solution: [
          step(
            "given",
            `$P_1 = ${p.p1}\\ \\text{kPa}$, $V_1 = ${p.v1}\\ \\text{L}$, $V_2 = ${p.v2}\\ \\text{L}$, temperatura constante.`,
            `$P_1 = ${p.p1}\\ \\text{kPa}$, $V_1 = ${p.v1}\\ \\text{L}$, $V_2 = ${p.v2}\\ \\text{L}$, constant temperature.`,
          ),
          step(
            "approach",
            "Ley de Boyle: $P_1 V_1 = P_2 V_2$, así que $P_2 = P_1 V_1/V_2$.",
            "Boyle's law: $P_1 V_1 = P_2 V_2$, so $P_2 = P_1 V_1/V_2$.",
          ),
          step(
            "calculation",
            `$P_2 = \\dfrac{${p.p1} \\cdot ${p.v1}}{${p.v2}} = \\dfrac{${p.p1 * p.v1}}{${p.v2}} = ${tok(r2(p.p2))}\\ \\text{kPa}$`,
            `$P_2 = \\dfrac{${p.p1} \\cdot ${p.v1}}{${p.v2}} = \\dfrac{${p.p1 * p.v1}}{${p.v2}} = ${tok(r2(p.p2))}\\ \\text{kPa}$`,
          ),
          step(
            "result",
            `La nueva presión es $${tok(r2(p.p2))}\\ \\text{kPa}$.`,
            `The new pressure is $${tok(r2(p.p2))}\\ \\text{kPa}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* First law with signs (hard, numeric)                             */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "tp-first-01",
      subject: "physics",
      topicId: "thermal-physics",
      subtopicId: "first-law",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 180,
      tags: ["first-law", "signs"],
      prerequisites: ["first-law"],
    },
    (rng) => {
      const qIn = rng.bool();
      const qMag = rng.pick([200, 300, 400, 500, 700, 800, 1000, 1200]);
      const byGas = rng.bool();
      const wMag = rng.pick([100, 150, 200, 250, 300, 500]);
      const q = qIn ? qMag : -qMag;
      const w = byGas ? wMag : -wMag;
      const du = q - w;
      return {
        skill: L("Primera ley con signos", "First law with signs"),
        statement: L(
          `En cierto proceso, ${qIn ? `el gas **absorbe** $${qMag}\\ \\text{J}$ de calor` : `el gas **cede** $${qMag}\\ \\text{J}$ de calor`} y ${byGas ? `el gas **realiza** $${wMag}\\ \\text{J}$ de trabajo sobre el entorno` : `se realizan $${wMag}\\ \\text{J}$ de trabajo **sobre** el gas`}. Con la convención $Q > 0$ si el calor entra y $W > 0$ si el gas trabaja, calcula el cambio de energía interna $\\Delta U$ en joules (con signo).`,
          `In a certain process, ${qIn ? `the gas **absorbs** $${qMag}\\ \\text{J}$ of heat` : `the gas **releases** $${qMag}\\ \\text{J}$ of heat`} and ${byGas ? `the gas **does** $${wMag}\\ \\text{J}$ of work on the surroundings` : `$${wMag}\\ \\text{J}$ of work is done **on** the gas`}. With the convention $Q > 0$ for heat entering and $W > 0$ for work done by the gas, compute the change in internal energy $\\Delta U$ in joules (with sign).`,
        ),
        answer: {
          kind: "numeric",
          value: du,
          tolerance: { mode: "absolute", value: 1 },
        },
        hints: [
          L(
            "Primero traduce el enunciado a los signos de la convención: ¿entra o sale el calor? ¿quién hace el trabajo?",
            "First translate the wording into the convention's signs: does heat enter or leave? who does the work?",
          ),
          L(
            "Primera ley: $\\Delta U = Q - W$.",
            "First law: $\\Delta U = Q - W$.",
          ),
          L(
            "Asigna $Q$ y $W$ con su signo y sustituye en la ecuación.",
            "Assign $Q$ and $W$ with their signs and substitute into the equation.",
          ),
        ],
        answerDisplay: L(`$\\Delta U = ${du}\\ \\text{J}$`, `$\\Delta U = ${du}\\ \\text{J}$`),
        solution: [
          step(
            "given",
            `Calor: $Q = ${signed(q)}\\ \\text{J}$ (${qIn ? "entra al gas" : "sale del gas"}).<br>Trabajo: $W = ${signed(w)}\\ \\text{J}$ (${byGas ? "lo hace el gas" : "se hace sobre el gas"}).`,
            `Heat: $Q = ${signed(q)}\\ \\text{J}$ (${qIn ? "enters the gas" : "leaves the gas"}).<br>Work: $W = ${signed(w)}\\ \\text{J}$ (${byGas ? "done by the gas" : "done on the gas"}).`,
          ),
          step(
            "approach",
            "Primera ley de la termodinámica: $\\Delta U = Q - W$ con la convención de signos indicada.",
            "First law of thermodynamics: $\\Delta U = Q - W$ with the stated sign convention.",
          ),
          step(
            "calculation",
            `$\\Delta U = Q - W = (${signed(q)}) - (${signed(w)}) = ${du}\\ \\text{J}$`,
            `$\\Delta U = Q - W = (${signed(q)}) - (${signed(w)}) = ${du}\\ \\text{J}$`,
          ),
          step(
            "result",
            `La energía interna del gas cambia en $${du}\\ \\text{J}$ ${du > 0 ? "(aumenta)" : du < 0 ? "(disminuye)" : "(no cambia)"}.`,
            `The gas's internal energy changes by $${du}\\ \\text{J}$ ${du > 0 ? "(it increases)" : du < 0 ? "(it decreases)" : "(no change)"}.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Isobaric work W = P·ΔV (hard, with P–V diagram)                  */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "tp-proc-01",
      subject: "physics",
      topicId: "thermal-physics",
      subtopicId: "processes",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 210,
      tags: ["work", "isobaric", "pv-diagram"],
      prerequisites: ["processes"],
    },
    (rng) => {
      const [p, v1, v2] = rng.pick([
        [100, 2, 5], [100, 3, 7], [50, 2, 6], [150, 1, 5], [200, 2, 4],
        [150, 4, 8], [100, 5, 8], [50, 4, 9], [200, 3, 6], [150, 2, 4],
      ]);
      const dv = v2 - v1;
      const work = r2(p * dv);
      return {
        skill: L("Trabajo isobárico $W = P\\,\\Delta V$", "Isobaric work $W = P\\,\\Delta V$"),
        statement: L(
          `Un gas dentro de un cilindro con pistón se expande lentamente a **presión constante** de $${p}\\ \\text{kPa}$, desde $${v1}\\ \\text{L}$ hasta $${v2}\\ \\text{L}$. ¿Cuánto trabajo realiza el gas? (en joules, 2 cifras significativas; ten en cuenta que $1\\ \\text{kPa}\\cdot\\text{L} = 1\\ \\text{J}$)`,
          `A gas in a cylinder with a piston expands slowly at a **constant pressure** of $${p}\\ \\text{kPa}$, from $${v1}\\ \\text{L}$ to $${v2}\\ \\text{L}$. How much work does the gas do? (in joules, 2 significant figures; note that $1\\ \\text{kPa}\\cdot\\text{L} = 1\\ \\text{J}$)`,
        ),
        diagram: {
          kind: "function-graph",
          xMin: 0,
          xMax: v2 + 2,
          yMin: 0,
          yMax: p + 50,
          curves: [{ fn: `${p}`, color: "primary" }],
          points: [
            { x: v1, y: p, label: `(${v1}, ${p})` },
            { x: v2, y: p, label: `(${v2}, ${p})` },
          ],
          xLabel: "V (L)",
          yLabel: "P (kPa)",
          showGrid: true,
        },
        diagramLabel: L(
          `Diagrama P-V: línea horizontal a ${p} kPa desde ${v1} L hasta ${v2} L; el trabajo es el área bajo la línea.`,
          `P-V diagram: a horizontal line at ${p} kPa from ${v1} L to ${v2} L; the work is the area under the line.`,
        ),
        answer: {
          kind: "numeric-unit",
          value: work,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["J", "joule", "joules"],
          unitChoices: ["J", "kJ", "kPa", "L"],
        },
        hints: [
          L(
            "En el diagrama $P$–$V$, el trabajo del gas es el **área bajo la curva**; con presión constante es un rectángulo.",
            "On a $P$–$V$ diagram the gas's work is the **area under the curve**; at constant pressure it is a rectangle.",
          ),
          L(
            "Trabajo isobárico: $W = P\\,\\Delta V$, con $P$ en kPa y $V$ en litros el resultado sale directamente en joules.",
            "Isobaric work: $W = P\\,\\Delta V$; with $P$ in kPa and $V$ in litres the result comes out directly in joules.",
          ),
          L(
            "Calcula $\\Delta V$ restando los volúmenes y multiplica por la presión.",
            "Compute $\\Delta V$ by subtracting the volumes and multiply by the pressure.",
          ),
        ],
        answerDisplay: L(`$W = ${tok(work)}\\ \\text{J}$`, `$W = ${tok(work)}\\ \\text{J}$`),
        solution: [
          step(
            "given",
            `$P = ${p}\\ \\text{kPa}$ (constante), $V_1 = ${v1}\\ \\text{L}$, $V_2 = ${v2}\\ \\text{L}$.`,
            `$P = ${p}\\ \\text{kPa}$ (constant), $V_1 = ${v1}\\ \\text{L}$, $V_2 = ${v2}\\ \\text{L}$.`,
          ),
          step(
            "approach",
            "Expansión a presión constante: $W = P\\,\\Delta V$ (el área del rectángulo del diagrama).",
            "Expansion at constant pressure: $W = P\\,\\Delta V$ (the rectangle's area in the diagram).",
          ),
          step(
            "calculation",
            `$\\Delta V = ${v2} - ${v1} = ${dv}\\ \\text{L}$<br>$W = ${p}\\ \\text{kPa} \\cdot ${dv}\\ \\text{L} = ${tok(work)}\\ \\text{J}$`,
            `$\\Delta V = ${v2} - ${v1} = ${dv}\\ \\text{L}$<br>$W = ${p}\\ \\text{kPa} \\cdot ${dv}\\ \\text{L} = ${tok(work)}\\ \\text{J}$`,
          ),
          step(
            "result",
            `El gas realiza $${tok(work)}\\ \\text{J}$ de trabajo.`,
            `The gas does $${tok(work)}\\ \\text{J}$ of work.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Challenge: ice + water equilibrium                               */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "tp-ice-01",
      subject: "physics",
      topicId: "thermal-physics",
      subtopicId: "calorimetry",
      difficulty: "challenge",
      questionType: "numeric-unit",
      estimatedTimeSec: 300,
      tags: ["calorimetry", "phase-change", "multi-step"],
      prerequisites: ["calorimetry", "heat"],
    },
    (rng) => {
      const [mi, mw, tw] = rng.pick([
        [0.1, 0.9, 40], [0.05, 0.45, 60], [0.2, 0.8, 60], [0.15, 0.85, 60],
      ]);
      const cw = 4186;
      const lf = 334000;
      const available = mw * cw * tw;
      const needed = mi * lf;
      const tf = (available - needed) / (cw * (mi + mw));
      return {
        skill: L("Equilibrio hielo + agua", "Ice + water equilibrium"),
        statement: L(
          `En un recipiente aislado se mezclan $${tok(mi)}\\ \\text{kg}$ de hielo a $0\\ ^\\circ\\text{C}$ con $${tok(mw)}\\ \\text{kg}$ de agua a $${tw}\\ ^\\circ\\text{C}$. ¿Cuál es la temperatura final de equilibrio? (Usa $c_{agua} = 4186\\ \\text{J/(kg·K)}$ y $L_f = 3{,}34\\times 10^{5}\\ \\text{J/kg}$)`,
          `In an insulated container $${tok(mi)}\\ \\text{kg}$ of ice at $0\\ ^\\circ\\text{C}$ is mixed with $${tok(mw)}\\ \\text{kg}$ of water at $${tw}\\ ^\\circ\\text{C}$. What is the final equilibrium temperature? (Use $c_{water} = 4186\\ \\text{J/(kg·K)}$ and $L_f = 3.34\\times 10^{5}\\ \\text{J/kg}$)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: r2(tf),
          tolerance: { mode: "absolute", value: 0.5 },
          units: ["°C", "C", "celsius"],
          unitChoices: ["°C", "K", "J", "kg"],
        },
        hints: [
          L(
            "Hay dos etapas: primero el hielo se funde (a $0\\ ^\\circ\\text{C}$) y después el agua procedente del hielo se calienta hasta la temperatura final.",
            "There are two stages: first the ice melts (at $0\\ ^\\circ\\text{C}$) and then the meltwater warms up to the final temperature.",
          ),
          L(
            "Comprueba primero que se funde todo el hielo y después plante el balance: $m_w c (T_w - T_f) = m_i L_f + m_i c\\, T_f$.",
            "First check that all the ice melts, then set up the balance: $m_w c (T_w - T_f) = m_i L_f + m_i c\\, T_f$.",
          ),
          L(
            "Desarrolla la ecuación: es lineal en $T_f$; agrupa los términos con $T_f$ a un lado.",
            "Expand the equation: it is linear in $T_f$; group the $T_f$ terms on one side.",
          ),
        ],
        answerDisplay: L(`$T_f = ${tok(r2(tf))}\\ ^\\circ\\text{C}$`, `$T_f = ${tok(r2(tf))}\\ ^\\circ\\text{C}$`),
        solution: [
          step(
            "given",
            `Hielo: $m_i = ${tok(mi)}\\ \\text{kg}$ a $0\\ ^\\circ\\text{C}$.<br>Agua: $m_w = ${tok(mw)}\\ \\text{kg}$ a $${tw}\\ ^\\circ\\text{C}$.<br>$c = 4186\\ \\text{J/(kg·K)}$, $L_f = 3{,}34\\times 10^{5}\\ \\text{J/kg}$.`,
            `Ice: $m_i = ${tok(mi)}\\ \\text{kg}$ at $0\\ ^\\circ\\text{C}$.<br>Water: $m_w = ${tok(mw)}\\ \\text{kg}$ at $${tw}\\ ^\\circ\\text{C}$.<br>$c = 4186\\ \\text{J/(kg·K)}$, $L_f = 3.34\\times 10^{5}\\ \\text{J/kg}$.`,
          ),
          step(
            "approach",
            "Balance de energía con cambio de fase: el calor cedido por el agua caliente funde el hielo y calienta el agua de fusión hasta $T_f$.",
            "Energy balance with a phase change: the heat given up by the warm water melts the ice and warms the meltwater to $T_f$.",
          ),
          step(
            "calculation",
            `¿Se funde todo? El agua puede ceder hasta $${tok(mw)} \\cdot 4186 \\cdot ${tw} = ${available}\\ \\text{J}$ llegando a $0\\ ^\\circ\\text{C}$, y fundir el hielo cuesta $${tok(mi)} \\cdot 3{,}34\\times 10^{5} = ${needed}\\ \\text{J}$ → sí se funde todo.<br>$${tok(mw)} \\cdot 4186 \\cdot (${tw} - T_f) = ${needed} + ${tok(mi)} \\cdot 4186 \\cdot T_f$<br>$${available} - ${tok(mw * cw)}\\,T_f = ${needed} + ${tok(mi * cw)}\\,T_f$<br>$T_f = \\dfrac{${available - needed}}{${mw * cw + mi * cw}} \\approx ${tok(r2(tf))}\\ ^\\circ\\text{C}$`,
            `Does all the ice melt? Cooling to $0\\ ^\\circ\\text{C}$ the water can give up $${tok(mw)} \\cdot 4186 \\cdot ${tw} = ${available}\\ \\text{J}$, and melting the ice takes $${tok(mi)} \\cdot 3.34\\times 10^{5} = ${needed}\\ \\text{J}$ → it all melts.<br>$${tok(mw)} \\cdot 4186 \\cdot (${tw} - T_f) = ${needed} + ${tok(mi)} \\cdot 4186 \\cdot T_f$<br>$${available} - ${tok(mw * cw)}\\,T_f = ${needed} + ${tok(mi * cw)}\\,T_f$<br>$T_f = \\dfrac{${available - needed}}{${mw * cw + mi * cw}} \\approx ${tok(r2(tf))}\\ ^\\circ\\text{C}$`,
          ),
          step(
            "result",
            `La mezcla queda en equilibrio a $${tok(r2(tf))}\\ ^\\circ\\text{C}$: el hielo se fundió por completo y el conjunto se enfrió.`,
            `The mixture reaches equilibrium at $${tok(r2(tf))}\\ ^\\circ\\text{C}$: the ice melted completely and the whole mix cooled down.`,
          ),
        ],
      };
    },
  ),
];
