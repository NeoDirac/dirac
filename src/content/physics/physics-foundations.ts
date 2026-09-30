/**
 * PHYSICS · Mathematical Foundations for Physics
 *
 * Units, scientific notation, significant figures, unit conversion,
 * graph reading, slopes and basic trigonometry — the toolkit every
 * other physics topic builds on. Includes MC, numeric and expression
 * styles; diagrams: function-graph and right-triangle.
 */

import { template, L, step, tok } from "@/lib/problem";
import type { ProblemTemplate, McOption } from "@/lib/types";

/* ---------- number helpers (local conventions) ---------- */

/** Round to 1 decimal — intermediate display values. */
const r1 = (n: number): number => Math.round(n * 10) / 10;
/** Round to 2 decimals — intermediate display values. */
const r2 = (n: number): number => Math.round(n * 100) / 100;
/** Remove floating-point noise (0.30000000000000004 → 0.3). */
const clean = (n: number): number => Number(n.toPrecision(10));
/** Round to 2 significant figures, half away from zero (answers with sigfig tolerance). */
function sig2(n: number): number {
  if (n === 0) return 0;
  const exp = Math.floor(Math.log10(Math.abs(n)));
  const f = Math.pow(10, exp - 1);
  const scaled = n / f;
  const r = scaled >= 0 ? Math.floor(scaled + 0.5) : Math.ceil(scaled - 0.5);
  return clean(r * f);
}

export const templates: ProblemTemplate[] = [
  /* ---------------------------------------------------------------- */
  /* SI units of derived quantities (MC)                               */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pf-units-01",
      subject: "physics",
      topicId: "physics-foundations",
      subtopicId: "units",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 60,
      tags: ["si-units", "units"],
      prerequisites: [],
    },
    (rng) => {
      const items = [
        {
          es: "la fuerza",
          en: "force",
          unit: "\\text{N}",
          derEs: "fuerza = masa × aceleración $\\Rightarrow \\text{kg}\\cdot\\text{m/s}^2 = \\text{N}$",
          derEn: "force = mass × acceleration $\\Rightarrow \\text{kg}\\cdot\\text{m/s}^2 = \\text{N}$",
        },
        {
          es: "la energía",
          en: "energy",
          unit: "\\text{J}",
          derEs: "energía = fuerza × desplazamiento $\\Rightarrow \\text{N}\\cdot\\text{m} = \\text{J}$",
          derEn: "energy = force × displacement $\\Rightarrow \\text{N}\\cdot\\text{m} = \\text{J}$",
        },
        {
          es: "la potencia",
          en: "power",
          unit: "\\text{W}",
          derEs: "potencia = trabajo / tiempo $\\Rightarrow \\text{J}/\\text{s} = \\text{W}$",
          derEn: "power = work / time $\\Rightarrow \\text{J}/\\text{s} = \\text{W}$",
        },
        {
          es: "la presión",
          en: "pressure",
          unit: "\\text{Pa}",
          derEs: "presión = fuerza / área $\\Rightarrow \\text{N}/\\text{m}^2 = \\text{Pa}$",
          derEn: "pressure = force / area $\\Rightarrow \\text{N}/\\text{m}^2 = \\text{Pa}$",
        },
        {
          es: "la frecuencia",
          en: "frequency",
          unit: "\\text{Hz}",
          derEs: "frecuencia = 1 / periodo $\\Rightarrow 1/\\text{s} = \\text{Hz}$",
          derEn: "frequency = 1 / period $\\Rightarrow 1/\\text{s} = \\text{Hz}$",
        },
        {
          es: "la carga eléctrica",
          en: "electric charge",
          unit: "\\text{C}",
          derEs: "carga = corriente × tiempo $\\Rightarrow \\text{A}\\cdot\\text{s} = \\text{C}$",
          derEn: "charge = current × time $\\Rightarrow \\text{A}\\cdot\\text{s} = \\text{C}$",
        },
      ];
      const pick = rng.pick(items);
      const pool = [
        "\\text{N}",
        "\\text{J}",
        "\\text{W}",
        "\\text{Pa}",
        "\\text{Hz}",
        "\\text{C}",
        "\\text{kg}",
        "\\text{m}",
      ].filter((u) => u !== pick.unit);
      const bad = rng.shuffle(pool).slice(0, 3);
      const options: McOption[] = [
        { id: "a", text: L(`$${pick.unit}$`, `$${pick.unit}$`), correct: true },
        { id: "b", text: L(`$${bad[0]}$`, `$${bad[0]}$`), correct: false },
        { id: "c", text: L(`$${bad[1]}$`, `$${bad[1]}$`), correct: false },
        { id: "d", text: L(`$${bad[2]}$`, `$${bad[2]}$`), correct: false },
      ];
      return {
        skill: L("Unidades del SI", "SI units"),
        statement: L(
          `¿Cuál es la **unidad del SI** de ${pick.es}?`,
          `What is the **SI unit** of ${pick.en}?`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Piensa en la ecuación que define la magnitud: ¿qué unidades básicas se combinan?",
            "Think of the equation that defines the quantity: which base units combine?",
          ),
          L(
            "Casi todas las unidades derivadas con nombre propio honran a un científico: newton, joule, watt, pascal…",
            "Most derived units with their own name honour a scientist: newton, joule, watt, pascal…",
          ),
          L(
            "Descarta las unidades de magnitudes distintas: el kg es de masa y el m es de longitud.",
            "Discard units of different quantities: kg is for mass and m is for length.",
          ),
        ],
        answerDisplay: L(`$${pick.unit}$`, `$${pick.unit}$`),
        solution: [
          step("given", `Magnitud: ${pick.es}.`, `Quantity: ${pick.en}.`),
          step(
            "approach",
            "Cada unidad derivada del SI se obtiene de la ecuación que define la magnitud.",
            "Every derived SI unit follows from the equation that defines the quantity.",
          ),
          step("calculation", pick.derEs, pick.derEn),
          step(
            "result",
            `La unidad del SI es $${pick.unit}$.`,
            `The SI unit is $${pick.unit}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Scientific notation (MC)                                          */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pf-sci-01",
      subject: "physics",
      topicId: "physics-foundations",
      subtopicId: "scientific-notation",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 90,
      tags: ["scientific-notation"],
      prerequisites: ["units"],
    },
    (rng) => {
      const mant = rng.pick([2.5, 3.4, 4.8, 5.6, 6.3, 7.2]);
      const exp = rng.pick([-4, -3, 2, 3, 5]);
      const plain = clean(mant * Math.pow(10, exp));
      const mEs = mant.toFixed(1).replace(".", "{,}");
      const mEn = mant.toFixed(1);
      const opt = (m: number, e: number) =>
        L(
          `$${m.toFixed(1).replace(".", "{,}")}\\times10^{${e}}$`,
          `$${m.toFixed(1)}\\times10^{${e}}$`,
        );
      const options: McOption[] = [
        { id: "a", text: opt(mant, exp), correct: true },
        { id: "b", text: opt(mant, exp + 1), correct: false },
        { id: "c", text: opt(mant, exp - 1), correct: false },
        { id: "d", text: opt(mant, -exp), correct: false },
      ];
      return {
        skill: L("Notación científica", "Scientific notation"),
        statement: L(
          `Expresa en **notación científica** la cantidad $${tok(plain)}\\ \\text{m}$.`,
          `Write the quantity $${tok(plain)}\\ \\text{m}$ in **scientific notation**.`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "En notación científica se escribe $a \\times 10^n$ con $1 \\le a < 10$.",
            "Scientific notation writes $a \\times 10^n$ with $1 \\le a < 10$.",
          ),
          L(
            "Mueve la coma decimal hasta dejar un solo dígito (distinto de cero) antes de la coma.",
            "Shift the decimal point until a single non-zero digit remains before it.",
          ),
          L(
            "El exponente $n$ cuenta los lugares que moviste la coma: negativo si el número es menor que 1.",
            "The exponent $n$ counts the places you shifted: negative if the number is smaller than 1.",
          ),
        ],
        answerDisplay: L(
          `$${mEs}\\times10^{${exp}}\\ \\text{m}$`,
          `$${mEn}\\times10^{${exp}}\\ \\text{m}$`,
        ),
        solution: [
          step(
            "given",
            `Cantidad: $${tok(plain)}\\ \\text{m}$.`,
            `Quantity: $${tok(plain)}\\ \\text{m}$.`,
          ),
          step(
            "approach",
            "Buscamos $a \\times 10^n$ con $1 \\le a < 10$ y $n$ entero.",
            "We want $a \\times 10^n$ with $1 \\le a < 10$ and $n$ an integer.",
          ),
          step(
            "calculation",
            `Desplazamos la coma ${Math.abs(exp)} lugares ${exp > 0 ? "a la izquierda" : "a la derecha"}: $${tok(plain)} = ${mEs}\\times10^{${exp}}$.`,
            `Shift the decimal point ${Math.abs(exp)} places ${exp > 0 ? "to the left" : "to the right"}: $${tok(plain)} = ${mEn}\\times10^{${exp}}$.`,
          ),
          step(
            "result",
            `La notación científica es $${mEs}\\times10^{${exp}}\\ \\text{m}$.`,
            `The scientific notation is $${mEn}\\times10^{${exp}}\\ \\text{m}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Scientific notation (typed numeric)                               */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pf-sci-02",
      subject: "physics",
      topicId: "physics-foundations",
      subtopicId: "scientific-notation",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 120,
      tags: ["scientific-notation", "orders-of-magnitude"],
      prerequisites: ["scientific-notation"],
    },
    (rng) => {
      const mant = rng.pick([2.5, 3.4, 4.8, 6.7]);
      const exp = rng.pick([-7, -6, -5]);
      const plain = clean(mant * Math.pow(10, exp));
      const mEs = mant.toFixed(1).replace(".", "{,}");
      const mEn = mant.toFixed(1);
      return {
        skill: L("Escribir notación científica", "Writing scientific notation"),
        statement: L(
          `Un sensor mide una masa muy pequeña: $m = ${tok(plain)}\\ \\text{kg}$. Escribe ese valor en **notación científica** (solo el número; puedes teclear, por ejemplo, 3.2e-5 o 3.2*10^-5).`,
          `A sensor measures a tiny mass: $m = ${tok(plain)}\\ \\text{kg}$. Write that value in **scientific notation** (the number only; you may type, for example, 3.2e-5 or 3.2*10^-5).`,
        ),
        answer: {
          kind: "numeric",
          value: plain,
          tolerance: { mode: "relative", value: 0.02 },
        },
        hints: [
          L(
            "El objetivo es la forma $a \\times 10^n$ con $1 \\le a < 10$.",
            "The goal is the form $a \\times 10^n$ with $1 \\le a < 10$.",
          ),
          L(
            "Cuenta cuántos lugares hay entre la coma y el primer dígito distinto de cero.",
            "Count how many places separate the decimal point from the first non-zero digit.",
          ),
          L(
            "Como el número es menor que 1, el exponente es negativo.",
            "Since the number is smaller than 1, the exponent is negative.",
          ),
        ],
        answerDisplay: L(
          `$m = ${mEs}\\times10^{${exp}}\\ \\text{kg}$`,
          `$m = ${mEn}\\times10^{${exp}}\\ \\text{kg}$`,
        ),
        solution: [
          step(
            "given",
            `$m = ${tok(plain)}\\ \\text{kg}$`,
            `$m = ${tok(plain)}\\ \\text{kg}$`,
          ),
          step(
            "approach",
            "Reescribimos como $a\\times10^n$ con $1\\le a<10$.",
            "We rewrite it as $a\\times10^n$ with $1\\le a<10$.",
          ),
          step(
            "calculation",
            `El primer dígito distinto de cero está ${Math.abs(exp)} lugares después de la coma, así que $n = ${exp}$ y $a = ${mEs}$.`,
            `The first non-zero digit sits ${Math.abs(exp)} places after the decimal point, so $n = ${exp}$ and $a = ${mEn}$.`,
          ),
          step(
            "result",
            `$m = ${mEs}\\times10^{${exp}}\\ \\text{kg}$.`,
            `$m = ${mEn}\\times10^{${exp}}\\ \\text{kg}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Counting significant figures                                      */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pf-sigfig-01",
      subject: "physics",
      topicId: "physics-foundations",
      subtopicId: "significant-figures",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 120,
      tags: ["significant-figures", "measurement"],
      prerequisites: ["units"],
    },
    (rng) => {
      const items = [
        {
          v: "0.00450",
          unit: "m",
          sf: 3,
          whyEs:
            "Los ceros a la izquierda no cuentan; cuentan el 4, el 5 y el cero final (está tras el punto decimal).",
          whyEn:
            "Leading zeros do not count; the 4, the 5 and the final zero count (it is after the decimal point).",
        },
        {
          v: "1.20",
          unit: "s",
          sf: 3,
          whyEs: "El cero final tras el punto decimal es significativo: 1, 2 y 0.",
          whyEn: "The trailing zero after the decimal point is significant: 1, 2 and 0.",
        },
        {
          v: "0.030",
          unit: "kg",
          sf: 2,
          whyEs: "Solo cuentan el 3 y el cero final; los ceros a la izquierda no.",
          whyEn: "Only the 3 and the trailing zero count; leading zeros do not.",
        },
        {
          v: "205",
          unit: "m",
          sf: 3,
          whyEs: "Los ceros entre dígitos distintos de cero son significativos.",
          whyEn: "Zeros between non-zero digits are significant.",
        },
        {
          v: "0.008",
          unit: "s",
          sf: 1,
          whyEs: "Solo cuenta el 8; los ceros a la izquierda solo sitúan la coma.",
          whyEn: "Only the 8 counts; leading zeros just place the decimal point.",
        },
        {
          v: "3.05",
          unit: "kg",
          sf: 3,
          whyEs: "El cero entre el 3 y el 5 está entre dígitos significativos: cuenta.",
          whyEn: "The zero between the 3 and the 5 lies between significant digits: it counts.",
        },
      ];
      const pick = rng.pick(items);
      const vEs = pick.v.replace(".", "{,}");
      return {
        skill: L("Contar cifras significativas", "Counting significant figures"),
        statement: L(
          `¿Cuántas **cifras significativas** tiene la medida $${vEs}\\ \\text{${pick.unit}}$?`,
          `How many **significant figures** does the measurement $${pick.v}\\ \\text{${pick.unit}}$ have?`,
        ),
        answer: { kind: "numeric", value: pick.sf },
        hints: [
          L(
            "Empieza a contar en el primer dígito distinto de cero, por la izquierda.",
            "Start counting at the first non-zero digit, from the left.",
          ),
          L(
            "Los ceros a la izquierda del primer dígito distinto de cero nunca son significativos.",
            "Zeros to the left of the first non-zero digit are never significant.",
          ),
          L(
            "Sí cuentan: los ceros entre dígitos y los ceros finales que están tras el punto decimal.",
            "These do count: zeros between digits and trailing zeros after the decimal point.",
          ),
        ],
        answerDisplay: L(
          `**${pick.sf}** cifras significativas`,
          `**${pick.sf}** significant figures`,
        ),
        solution: [
          step(
            "given",
            `Medida: $${vEs}\\ \\text{${pick.unit}}$.`,
            `Measurement: $${pick.v}\\ \\text{${pick.unit}}$.`,
          ),
          step(
            "approach",
            "Aplicamos las reglas: los ceros a la izquierda no cuentan; los ceros entre dígitos y los finales tras el punto sí cuentan.",
            "Apply the rules: leading zeros never count; zeros between digits and trailing zeros after the decimal point do count.",
          ),
          step("calculation", pick.whyEs, pick.whyEn),
          step(
            "result",
            `La medida tiene **${pick.sf} cifras significativas**.`,
            `The measurement has **${pick.sf} significant figures**.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Rounding to 2 significant figures (MC)                            */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pf-sigfig-02",
      subject: "physics",
      topicId: "physics-foundations",
      subtopicId: "significant-figures",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["significant-figures", "rounding"],
      prerequisites: ["significant-figures"],
    },
    (rng) => {
      const items = [
        {
          v: "0.00457",
          ctxEs: "una longitud",
          ctxEn: "a length",
          unit: "m",
          ok: "0.0046",
          bad: ["0.0045", "0.005", "0.46"],
        },
        {
          v: "3.678",
          ctxEs: "un tiempo",
          ctxEn: "a time",
          unit: "s",
          ok: "3.7",
          bad: ["3.68", "3.6", "0.37"],
        },
        {
          v: "4587",
          ctxEs: "una distancia",
          ctxEn: "a distance",
          unit: "m",
          ok: "4600",
          bad: ["4500", "4590", "5000"],
        },
        {
          v: "27.43",
          ctxEs: "una masa",
          ctxEn: "a mass",
          unit: "kg",
          ok: "27",
          bad: ["27.4", "28", "2.7"],
        },
      ];
      const pick = rng.pick(items);
      const disp = (s: string) => L(`$${s.replace(".", "{,}")}$`, `$${s}$`);
      const options: McOption[] = [
        { id: "a", text: disp(pick.ok), correct: true },
        { id: "b", text: disp(pick.bad[0]), correct: false },
        { id: "c", text: disp(pick.bad[1]), correct: false },
        { id: "d", text: disp(pick.bad[2]), correct: false },
      ];
      const vEs = pick.v.replace(".", "{,}");
      return {
        skill: L("Redondeo a 2 cifras significativas", "Rounding to 2 significant figures"),
        statement: L(
          `Un instrumento mide ${pick.ctxEs} de $${vEs}\\ \\text{${pick.unit}}$. Exprésala con **2 cifras significativas**.`,
          `An instrument measures ${pick.ctxEn} of $${pick.v}\\ \\text{${pick.unit}}$. Express it with **2 significant figures**.`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Localiza las dos primeras cifras significativas, empezando en el primer dígito distinto de cero.",
            "Locate the first two significant figures, starting at the first non-zero digit.",
          ),
          L(
            "Mira la cifra siguiente para decidir si redondeas hacia arriba o hacia abajo.",
            "Look at the next digit to decide whether to round up or down.",
          ),
          L(
            "Al redondear se conserva el orden de magnitud: no cambies la posición de la coma.",
            "Rounding preserves the order of magnitude: do not move the decimal point.",
          ),
        ],
        answerDisplay: disp(pick.ok),
        solution: [
          step(
            "given",
            `Medida: $${vEs}\\ \\text{${pick.unit}}$.`,
            `Measurement: $${pick.v}\\ \\text{${pick.unit}}$.`,
          ),
          step(
            "approach",
            "Nos quedamos con las dos primeras cifras significativas y redondeamos según la tercera.",
            "Keep the first two significant figures and round according to the third one.",
          ),
          step(
            "calculation",
            `Tomamos las dos primeras cifras significativas de $${vEs}$ y miramos la tercera para decidir el redondeo; el resto de dígitos se convierten en ceros o se eliminan si están tras el punto decimal.`,
            `Keep the first two significant figures of $${pick.v}$ and look at the third one to decide the rounding; the remaining digits become zeros, or are dropped if they lie after the decimal point.`,
          ),
          step(
            "result",
            `Con 2 cifras significativas: $${pick.ok.replace(".", "{,}")}\\ \\text{${pick.unit}}$.`,
            `With 2 significant figures: $${pick.ok}\\ \\text{${pick.unit}}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Unit conversion: km/h → m/s                                       */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pf-conv-01",
      subject: "physics",
      topicId: "physics-foundations",
      subtopicId: "unit-conversion",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 120,
      tags: ["unit-conversion", "speed"],
      prerequisites: ["units"],
    },
    (rng) => {
      const kmh = rng.pick([36, 54, 72, 90, 108]);
      const ms = kmh / 3.6;
      return {
        skill: L("Conversión de rapidez", "Speed conversion"),
        statement: L(
          `Un tren de alta velocidad circula a $${kmh}\\ \\text{km/h}$. ¿A cuánto equivale su rapidez en $\\text{m/s}$? (2 cifras significativas).`,
          `A high-speed train travels at $${kmh}\\ \\text{km/h}$. What is its speed in $\\text{m/s}$? (2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: sig2(ms),
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m/s"],
          unitChoices: ["m/s", "km/h", "m", "s"],
        },
        hints: [
          L(
            "Identifica los dos factores de conversión: $1\\ \\text{km} = 1000\\ \\text{m}$ y $1\\ \\text{h} = 3600\\ \\text{s}$.",
            "Identify the two conversion factors: $1\\ \\text{km} = 1000\\ \\text{m}$ and $1\\ \\text{h} = 3600\\ \\text{s}$.",
          ),
          L(
            "Multiplica por $\\frac{1000\\ \\text{m}}{1\\ \\text{km}}$ y por $\\frac{1\\ \\text{h}}{3600\\ \\text{s}}$ para que se cancelen km y h.",
            "Multiply by $\\frac{1000\\ \\text{m}}{1\\ \\text{km}}$ and by $\\frac{1\\ \\text{h}}{3600\\ \\text{s}}$ so that km and h cancel.",
          ),
          L(
            "En total divides entre 3{,}6: pasa de km/h a m/s dividiendo entre 3{,}6.",
            "Overall you divide by 3.6: to go from km/h to m/s, divide by 3.6.",
          ),
        ],
        answerDisplay: L(
          `$v = ${tok(ms)}\\ \\text{m/s}$`,
          `$v = ${tok(ms)}\\ \\text{m/s}$`,
        ),
        solution: [
          step(
            "given",
            `$v = ${kmh}\\ \\text{km/h}$; $1\\ \\text{km} = 1000\\ \\text{m}$; $1\\ \\text{h} = 3600\\ \\text{s}$.`,
            `$v = ${kmh}\\ \\text{km/h}$; $1\\ \\text{km} = 1000\\ \\text{m}$; $1\\ \\text{h} = 3600\\ \\text{s}$.`,
          ),
          step(
            "approach",
            "Multiplicamos por los factores de conversión de forma que km y h se cancelen.",
            "Multiply by conversion factors so that km and h cancel out.",
          ),
          step(
            "calculation",
            `$v = ${kmh}\\ \\frac{\\text{km}}{\\text{h}} \\cdot \\frac{1000\\ \\text{m}}{1\\ \\text{km}} \\cdot \\frac{1\\ \\text{h}}{3600\\ \\text{s}} = \\frac{${kmh * 1000}}{3600}\\ \\text{m/s} = ${tok(ms)}\\ \\text{m/s}$`,
            `$v = ${kmh}\\ \\frac{\\text{km}}{\\text{h}} \\cdot \\frac{1000\\ \\text{m}}{1\\ \\text{km}} \\cdot \\frac{1\\ \\text{h}}{3600\\ \\text{s}} = \\frac{${kmh * 1000}}{3600}\\ \\text{m/s} = ${tok(ms)}\\ \\text{m/s}$`,
          ),
          step(
            "result",
            `El tren circula a $${tok(ms)}\\ \\text{m/s}$.`,
            `The train travels at $${tok(ms)}\\ \\text{m/s}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Unit conversion: g/cm³ → kg/m³                                    */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pf-conv-02",
      subject: "physics",
      topicId: "physics-foundations",
      subtopicId: "unit-conversion",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 180,
      tags: ["unit-conversion", "density"],
      prerequisites: ["unit-conversion"],
    },
    (rng) => {
      const gcm = rng.pick([1.8, 2.7, 3.2, 4.5, 7.8, 8.9]);
      const kgm = gcm * 1000;
      return {
        skill: L("Conversión de densidades", "Density conversion"),
        statement: L(
          `La densidad de un mineral es $\\rho = ${tok(gcm)}\\ \\text{g/cm}^3$. Exprésala en $\\text{kg/m}^3$ (2 cifras significativas).`,
          `The density of a mineral is $\\rho = ${tok(gcm)}\\ \\text{g/cm}^3$. Express it in $\\text{kg/m}^3$ (2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: sig2(kgm),
          tolerance: { mode: "sigfig", value: 2 },
          units: ["kg/m^3", "kg/m³"],
          unitChoices: ["kg/m^3", "g/cm^3", "kg/m^2", "N/m^3"],
        },
        hints: [
          L(
            "Convierte por separado el numerador (gramos → kg) y el denominador (cm³ → m³).",
            "Convert the numerator (grams → kg) and the denominator (cm³ → m³) separately.",
          ),
          L(
            "Recuerda: $1\\ \\text{cm}^3 = 10^{-6}\\ \\text{m}^3$, porque 1 m = 100 cm y el volumen eleva al cubo.",
            "Remember: $1\\ \\text{cm}^3 = 10^{-6}\\ \\text{m}^3$, because 1 m = 100 cm and volume cubes the factor.",
          ),
          L(
            "El cociente $10^{-3}/10^{-6}$ da el factor total que multiplica la cifra.",
            "The ratio $10^{-3}/10^{-6}$ gives the overall factor multiplying the value.",
          ),
        ],
        answerDisplay: L(
          `$\\rho = ${tok(kgm)}\\ \\text{kg/m}^3$`,
          `$\\rho = ${tok(kgm)}\\ \\text{kg/m}^3$`,
        ),
        solution: [
          step(
            "given",
            `$\\rho = ${tok(gcm)}\\ \\text{g/cm}^3$; $1\\ \\text{g} = 10^{-3}\\ \\text{kg}$; $1\\ \\text{cm}^3 = 10^{-6}\\ \\text{m}^3$.`,
            `$\\rho = ${tok(gcm)}\\ \\text{g/cm}^3$; $1\\ \\text{g} = 10^{-3}\\ \\text{kg}$; $1\\ \\text{cm}^3 = 10^{-6}\\ \\text{m}^3$.`,
          ),
          step(
            "approach",
            "Convertimos numerador y denominador y tomamos el cociente.",
            "Convert the numerator and the denominator, then take the ratio.",
          ),
          step(
            "calculation",
            `$1\\ \\text{g/cm}^3 = \\frac{10^{-3}\\ \\text{kg}}{10^{-6}\\ \\text{m}^3} = 10^{3}\\ \\text{kg/m}^3$<br>$\\rho = ${tok(gcm)} \\cdot 10^{3}\\ \\text{kg/m}^3 = ${tok(kgm)}\\ \\text{kg/m}^3$`,
            `$1\\ \\text{g/cm}^3 = \\frac{10^{-3}\\ \\text{kg}}{10^{-6}\\ \\text{m}^3} = 10^{3}\\ \\text{kg/m}^3$<br>$\\rho = ${tok(gcm)} \\cdot 10^{3}\\ \\text{kg/m}^3 = ${tok(kgm)}\\ \\text{kg/m}^3$`,
          ),
          step(
            "result",
            `La densidad es $${tok(kgm)}\\ \\text{kg/m}^3$.`,
            `The density is $${tok(kgm)}\\ \\text{kg/m}^3$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Reading and extrapolating a graph (MC, diagram)                   */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pf-graph-01",
      subject: "physics",
      topicId: "physics-foundations",
      subtopicId: "graphs",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["graphs", "linear", "extrapolation"],
      prerequisites: [],
    },
    (rng) => {
      const k = rng.pick([2, 3, 4, 5]);
      const options: McOption[] = [
        { id: "a", text: L(`$${5 * k}\\ \\text{m}$`, `$${5 * k}\\ \\text{m}$`), correct: true },
        { id: "b", text: L(`$${4 * k}\\ \\text{m}$`, `$${4 * k}\\ \\text{m}$`), correct: false },
        { id: "c", text: L(`$${3 * k}\\ \\text{m}$`, `$${3 * k}\\ \\text{m}$`), correct: false },
        { id: "d", text: L(`$${6 * k}\\ \\text{m}$`, `$${6 * k}\\ \\text{m}$`), correct: false },
      ];
      return {
        skill: L("Leer y extrapolar una gráfica", "Reading and extrapolating a graph"),
        statement: L(
          "La gráfica muestra la posición $x$ de un móvil en función del tiempo: una recta con dos puntos marcados. Usa la **pendiente** para predecir: ¿qué posición tendrá el móvil en $t = 5\\ \\text{s}$?",
          "The graph shows the position $x$ of an object versus time: a straight line with two marked points. Use the **slope** to predict: what position will the object reach at $t = 5\\ \\text{s}$?",
        ),
        diagram: {
          kind: "function-graph",
          xMin: 0,
          xMax: 6.5,
          yMin: 0,
          yMax: 6 * k + 2,
          curves: [{ fn: `${k}*x`, color: "primary" }],
          points: [
            { x: 1, y: k, label: `(1, ${k})` },
            { x: 3, y: 3 * k, label: `(3, ${3 * k})` },
            { x: 5, y: 5 * k },
          ],
          xLabel: "t (s)",
          yLabel: "x (m)",
          showGrid: true,
        },
        diagramLabel: L(
          `Gráfica posición-tiempo: recta que pasa por (1, ${k}) y (3, ${3 * k}); hay un punto sin etiqueta en t = 5 s.`,
          `Position-time graph: a straight line through (1, ${k}) and (3, ${3 * k}); an unlabelled point sits at t = 5 s.`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Los puntos marcados te dan dos pares $(t, x)$ exactos de la recta.",
            "The marked points give you two exact $(t, x)$ pairs of the line.",
          ),
          L(
            "La recta pasa por el origen, así que $x$ es proporcional a $t$: calcula la pendiente $x/t$ con un punto marcado.",
            "The line goes through the origin, so $x$ is proportional to $t$: compute the slope $x/t$ from a marked point.",
          ),
          L(
            "Multiplica la pendiente por $t = 5\\ \\text{s}$.",
            "Multiply the slope by $t = 5\\ \\text{s}$.",
          ),
        ],
        answerDisplay: L(`$x = ${5 * k}\\ \\text{m}$`, `$x = ${5 * k}\\ \\text{m}$`),
        solution: [
          step(
            "given",
            `Recta por el origen con puntos $(1, ${k})$ y $(3, ${3 * k})$.`,
            `A line through the origin with points $(1, ${k})$ and $(3, ${3 * k})$.`,
          ),
          step(
            "approach",
            "Como la recta pasa por $(0,0)$, la relación es $x = \\text{pendiente} \\cdot t$.",
            "Since the line passes through $(0,0)$, the relation is $x = \\text{slope} \\cdot t$.",
          ),
          step(
            "calculation",
            `$\\text{pendiente} = \\frac{${3 * k} - ${k}}{3 - 1} = ${k}$, así que $x(5) = ${k} \\cdot 5 = ${5 * k}\\ \\text{m}$`,
            `$\\text{slope} = \\frac{${3 * k} - ${k}}{3 - 1} = ${k}$, so $x(5) = ${k} \\cdot 5 = ${5 * k}\\ \\text{m}$`,
          ),
          step(
            "result",
            `En $t = 5\\ \\text{s}$ el móvil está en $x = ${5 * k}\\ \\text{m}$.`,
            `At $t = 5\\ \\text{s}$ the object is at $x = ${5 * k}\\ \\text{m}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Slope of a position–time graph = velocity (diagram)               */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pf-slope-01",
      subject: "physics",
      topicId: "physics-foundations",
      subtopicId: "slopes",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 150,
      tags: ["slopes", "velocity", "graphs"],
      prerequisites: ["graphs"],
    },
    (rng) => {
      const k = rng.pick([2, 3, 4, -2, -3, -4]);
      const x1 = 1;
      const x2 = 4;
      const y1 = 5;
      const y2 = y1 + k * (x2 - x1);
      return {
        skill: L("Pendiente de una gráfica x–t", "Slope of an x–t graph"),
        statement: L(
          "La gráfica muestra la posición $x(t)$ de un ciclista que se mueve en línea recta. Calcula su **velocidad** (la pendiente), con signo: positiva si avanza en el sentido $+x$ (2 cifras significativas).",
          "The graph shows the position $x(t)$ of a cyclist moving in a straight line. Compute the **velocity** (the slope), with sign: positive if moving in the $+x$ direction (2 significant figures).",
        ),
        diagram: {
          kind: "function-graph",
          xMin: 0,
          xMax: 6,
          yMin: Math.min(-2, y2 - 2),
          yMax: Math.max(y1, y2) + 2,
          curves: [{ fn: `${k}*(x - ${x1}) + ${y1}`, color: "primary" }],
          points: [
            { x: x1, y: y1, label: `(${x1}, ${y1})` },
            { x: x2, y: y2, label: `(${x2}, ${y2})` },
          ],
          xLabel: "t (s)",
          yLabel: "x (m)",
          showGrid: true,
        },
        diagramLabel: L(
          `Gráfica posición-tiempo con una recta que pasa por (${x1}, ${y1}) y (${x2}, ${y2}).`,
          `Position-time graph with a straight line through (${x1}, ${y1}) and (${x2}, ${y2}).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: sig2(k),
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m/s"],
          unitChoices: ["m/s", "m", "m/s^2", "s"],
        },
        hints: [
          L(
            "La velocidad en una gráfica posición–tiempo es la pendiente de la recta.",
            "On a position-time graph the velocity is the slope of the line.",
          ),
          L(
            "Usa los dos puntos marcados: $v = \\frac{\\Delta x}{\\Delta t}$.",
            "Use the two marked points: $v = \\frac{\\Delta x}{\\Delta t}$.",
          ),
          L(
            "Cuidado con el signo: si la posición disminuye con el tiempo, la velocidad es negativa.",
            "Watch the sign: if the position decreases with time, the velocity is negative.",
          ),
        ],
        answerDisplay: L(
          `$v = ${tok(sig2(k))}\\ \\text{m/s}$`,
          `$v = ${tok(sig2(k))}\\ \\text{m/s}$`,
        ),
        solution: [
          step(
            "given",
            `Puntos de la recta: $(${x1}, ${y1})$ y $(${x2}, ${y2})$.`,
            `Points on the line: $(${x1}, ${y1})$ and $(${x2}, ${y2})$.`,
          ),
          step(
            "approach",
            "En $x(t)$, la pendiente es la velocidad: $v = \\frac{\\Delta x}{\\Delta t}$ (unidades: m/s).",
            "On $x(t)$ the slope is the velocity: $v = \\frac{\\Delta x}{\\Delta t}$ (units: m/s).",
          ),
          step(
            "calculation",
            `$v = \\frac{${y2} - ${y1}\\ \\text{m}}{${x2} - ${x1}\\ \\text{s}} = \\frac{${y2 - y1}\\ \\text{m}}{${x2 - x1}\\ \\text{s}} = ${tok(sig2(k))}\\ \\text{m/s}$`,
            `$v = \\frac{${y2} - ${y1}\\ \\text{m}}{${x2} - ${x1}\\ \\text{s}} = \\frac{${y2 - y1}\\ \\text{m}}{${x2 - x1}\\ \\text{s}} = ${tok(sig2(k))}\\ \\text{m/s}$`,
          ),
          step(
            "result",
            `${k > 0 ? "El ciclista avanza en el sentido $+x$ con" : "El ciclista retrocede (sentido $-x$) con"} $v = ${tok(sig2(k))}\\ \\text{m/s}$.`,
            `${k > 0 ? "The cyclist moves in the $+x$ direction with" : "The cyclist moves backwards ($-x$ direction) with"} $v = ${tok(sig2(k))}\\ \\text{m/s}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Basic trigonometry: ramp height (right-triangle diagram)          */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pf-trig-01",
      subject: "physics",
      topicId: "physics-foundations",
      subtopicId: "basic-trigonometry",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 150,
      tags: ["trigonometry", "ramp", "sin"],
      prerequisites: [],
    },
    (rng) => {
      const inclines = [
        { ang: 30, sin: 0.5 },
        { ang: 45, sin: 0.707 },
        { ang: 60, sin: 0.866 },
      ];
      const pick = rng.pick(inclines);
      const len = rng.pick([5, 10, 20]);
      const h = sig2(len * pick.sin);
      return {
        skill: L("Trigonometría: altura de una rampa", "Trigonometry: height of a ramp"),
        statement: L(
          `Una rampa recta de longitud $L = ${len}\\ \\text{m}$ se apoya formando un ángulo de $${pick.ang}^\\circ$ con el suelo. ¿A qué altura $h$ llega su extremo superior? Usa $\\sin ${pick.ang}^\\circ \\approx ${tok(pick.sin)}$ y da el resultado con 2 cifras significativas.`,
          `A straight ramp of length $L = ${len}\\ \\text{m}$ rests at an angle of $${pick.ang}^\\circ$ to the ground. What height $h$ does its upper end reach? Use $\\sin ${pick.ang}^\\circ \\approx ${tok(pick.sin)}$ and give the result to 2 significant figures.`,
        ),
        diagram: {
          kind: "right-triangle",
          aLabel: "d",
          bLabel: "h = ?",
          cLabel: `L = ${len} m`,
          angleLabel: `${pick.ang}°`,
        },
        diagramLabel: L(
          `Triángulo rectángulo de una rampa: hipotenusa L = ${len} m, ángulo ${pick.ang} grados con el suelo y cateto vertical h desconocido.`,
          `Right triangle of a ramp: hypotenuse L = ${len} m, angle ${pick.ang} degrees to the ground, unknown vertical side h.`,
        ),
        answer: {
          kind: "numeric-unit",
          value: h,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m"],
          unitChoices: ["m", "cm", "km", "m/s"],
        },
        hints: [
          L(
            "Identifica en el triángulo la hipotenusa ($L$) y el cateto opuesto al ángulo ($h$).",
            "Identify in the triangle the hypotenuse ($L$) and the side opposite the angle ($h$).",
          ),
          L(
            "El seno relaciona el cateto opuesto con la hipotenusa: $\\sin\\theta = \\frac{h}{L}$.",
            "The sine links the opposite side to the hypotenuse: $\\sin\\theta = \\frac{h}{L}$.",
          ),
          L(
            "Despeja $h = L\\sin\\theta$ y sustituye.",
            "Rearrange to $h = L\\sin\\theta$ and substitute.",
          ),
        ],
        answerDisplay: L(`$h = ${tok(h)}\\ \\text{m}$`, `$h = ${tok(h)}\\ \\text{m}$`),
        solution: [
          step(
            "given",
            `$L = ${len}\\ \\text{m}$, $\\theta = ${pick.ang}^\\circ$, $\\sin\\theta \\approx ${tok(pick.sin)}$`,
            `$L = ${len}\\ \\text{m}$, $\\theta = ${pick.ang}^\\circ$, $\\sin\\theta \\approx ${tok(pick.sin)}$`,
          ),
          step(
            "approach",
            "La altura es el cateto opuesto al ángulo: $\\sin\\theta = h/L \\Rightarrow h = L\\sin\\theta$.",
            "The height is the side opposite the angle: $\\sin\\theta = h/L \\Rightarrow h = L\\sin\\theta$.",
          ),
          step(
            "calculation",
            `$h = ${len}\\ \\text{m} \\cdot ${tok(pick.sin)} = ${tok(r2(len * pick.sin))}\\ \\text{m} \\approx ${tok(h)}\\ \\text{m}$`,
            `$h = ${len}\\ \\text{m} \\cdot ${tok(pick.sin)} = ${tok(r2(len * pick.sin))}\\ \\text{m} \\approx ${tok(h)}\\ \\text{m}$`,
          ),
          step(
            "result",
            `El extremo de la rampa alcanza una altura de $\\approx ${tok(h)}\\ \\text{m}$.`,
            `The end of the ramp reaches a height of $\\approx ${tok(h)}\\ \\text{m}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Rearranging physics formulas (MC)                                 */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pf-alg-01",
      subject: "physics",
      topicId: "physics-foundations",
      subtopicId: "algebraic-rearrangement",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 180,
      tags: ["rearrangement", "algebra", "formulas"],
      prerequisites: [],
    },
    (rng) => {
      const forms = [
        {
          eq: "$K = \\tfrac{1}{2} m v^2$",
          askEs: "la rapidez $v$",
          askEn: "the speed $v$",
          ok: "$v = \\sqrt{\\dfrac{2K}{m}}$",
          bad: [
            "$v = \\sqrt{\\dfrac{K}{2m}}$",
            "$v = \\dfrac{2K}{m}$",
            "$v = 2\\sqrt{\\dfrac{K}{m}}$",
          ],
          whyEs:
            "Multiplica por 2: $2K = m v^2$; divide entre $m$; y toma raíz cuadrada.",
          whyEn: "Multiply by 2: $2K = m v^2$; divide by $m$; then take the square root.",
        },
        {
          eq: "$v = v_0 + a\\,t$",
          askEs: "la aceleración $a$",
          askEn: "the acceleration $a$",
          ok: "$a = \\dfrac{v - v_0}{t}$",
          bad: [
            "$a = \\dfrac{v}{t} - v_0$",
            "$a = v - \\dfrac{v_0}{t}$",
            "$a = \\dfrac{v + v_0}{t}$",
          ],
          whyEs: "Resta $v_0$: $v - v_0 = a\\,t$; después divide entre $t$.",
          whyEn: "Subtract $v_0$: $v - v_0 = a\\,t$; then divide by $t$.",
        },
        {
          eq: "$F = G\\,\\dfrac{m_1 m_2}{r^2}$",
          askEs: "la distancia $r$",
          askEn: "the distance $r$",
          ok: "$r = \\sqrt{\\dfrac{G\\,m_1 m_2}{F}}$",
          bad: [
            "$r = \\dfrac{G\\,m_1 m_2}{F}$",
            "$r = \\sqrt{\\dfrac{F}{G\\,m_1 m_2}}$",
            "$r = \\dfrac{\\sqrt{G\\,m_1 m_2}}{F}$",
          ],
          whyEs:
            "Multiplica por $r^2$ y divide entre $F$: $r^2 = \\frac{G\\,m_1 m_2}{F}$; al final, raíz cuadrada.",
          whyEn:
            "Multiply by $r^2$ and divide by $F$: $r^2 = \\frac{G\\,m_1 m_2}{F}$; finally, take the square root.",
        },
        {
          eq: "$W = F\\,d\\cos\\theta$",
          askEs: "el ángulo $\\theta$",
          askEn: "the angle $\\theta$",
          ok: "$\\theta = \\arccos\\left(\\dfrac{W}{F\\,d}\\right)$",
          bad: [
            "$\\theta = \\arccos\\left(\\dfrac{F\\,d}{W}\\right)$",
            "$\\theta = \\cos\\left(\\dfrac{W}{F\\,d}\\right)$",
            "$\\theta = \\dfrac{W}{F\\,d}$",
          ],
          whyEs:
            "Divide entre $F\\,d$: $\\cos\\theta = \\frac{W}{Fd}$; y aplica la función inversa ($\\arccos$).",
          whyEn:
            "Divide by $F\\,d$: $\\cos\\theta = \\frac{W}{Fd}$; then apply the inverse function ($\\arccos$).",
        },
      ];
      const pick = rng.pick(forms);
      const options: McOption[] = [
        { id: "a", text: L(pick.ok, pick.ok), correct: true },
        { id: "b", text: L(pick.bad[0], pick.bad[0]), correct: false },
        { id: "c", text: L(pick.bad[1], pick.bad[1]), correct: false },
        { id: "d", text: L(pick.bad[2], pick.bad[2]), correct: false },
      ];
      return {
        skill: L("Despejar variables en fórmulas", "Rearranging formulas"),
        statement: L(
          `Despeja **${pick.askEs}** de la ecuación ${pick.eq}.`,
          `Solve **${pick.askEn}** from the equation ${pick.eq}.`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Identifica qué operaciones encierran a la variable que quieres despejar.",
            "Identify which operations wrap the variable you want to isolate.",
          ),
          L(
            "Deshaz las operaciones en orden inverso: primero sumas/restas, luego productos/cocientes, luego potencias.",
            "Undo operations in reverse order: additions/subtractions first, then products/quotients, then powers.",
          ),
          L(
            "Comprueba tu resultado: sustituye casos límite sencillos (por ejemplo, valores que anulan términos).",
            "Check your result: substitute simple limiting cases (values that cancel terms).",
          ),
        ],
        answerDisplay: L(pick.ok, pick.ok),
        solution: [
          step("given", `Ecuación: ${pick.eq}`, `Equation: ${pick.eq}`),
          step(
            "approach",
            "Aplicamos operaciones inversas dejando la incógnita sola en un lado.",
            "Apply inverse operations, leaving the unknown alone on one side.",
          ),
          step("calculation", pick.whyEs, pick.whyEn),
          step(
            "result",
            `El despeje correcto es ${pick.ok}.`,
            `The correct rearrangement is ${pick.ok}.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Challenge: proportional reasoning with an inverse-square law      */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pf-chal-01",
      subject: "physics",
      topicId: "physics-foundations",
      subtopicId: "proportional-reasoning",
      difficulty: "challenge",
      questionType: "numeric",
      estimatedTimeSec: 300,
      tags: ["proportional-reasoning", "inverse-square"],
      prerequisites: ["algebraic-rearrangement"],
    },
    (rng) => {
      const combos = [
        { a: 3, b: 2, aEs: "se triplica", aEn: "triples", bEs: "se duplica", bEn: "doubles" },
        { a: 2, b: 2, aEs: "se duplica", aEn: "doubles", bEs: "se duplica", bEn: "doubles" },
        { a: 2, b: 3, aEs: "se duplica", aEn: "doubles", bEs: "se triplica", bEn: "triples" },
        { a: 3, b: 3, aEs: "se triplica", aEn: "triples", bEs: "se triplica", bEn: "triples" },
      ];
      const pick = rng.pick(combos);
      const factor = sig2(pick.a / (pick.b * pick.b));
      return {
        skill: L("Razonamiento proporcional con ley de inverso del cuadrado", "Proportional reasoning with an inverse-square law"),
        statement: L(
          `La fuerza gravitatoria entre dos cuerpos es $F = G\\,\\dfrac{m_1 m_2}{r^2}$. Si la masa de uno de ellos ${pick.aEs} y, además, la distancia entre sus centros ${pick.bEs}, ¿por qué **factor** queda multiplicada la fuerza? (Da el factor con 2 cifras significativas; será menor que 1).`,
          `The gravitational force between two bodies is $F = G\\,\\dfrac{m_1 m_2}{r^2}$. If the mass of one of them ${pick.aEn} and, in addition, the distance between their centres ${pick.bEn}, by which **factor** is the force multiplied? (Give the factor to 2 significant figures; it will be less than 1).`,
        ),
        answer: {
          kind: "numeric",
          value: factor,
          tolerance: { mode: "sigfig", value: 2 },
        },
        hints: [
          L(
            `Escribe la fuerza nueva $F'$ sustituyendo $m_1 \\to ${pick.a}\\,m_1$ y $r \\to ${pick.b}\\,r$.`,
            `Write the new force $F'$ substituting $m_1 \\to ${pick.a}\\,m_1$ and $r \\to ${pick.b}\\,r$.`,
          ),
          L(
            "La masa multiplica la fuerza directamente, pero la distancia aparece al cuadrado y en el denominador.",
            "The mass multiplies the force directly, but the distance appears squared in the denominator.",
          ),
          L(
            `El factor buscado es el cociente $F'/F = \\frac{${pick.a}}{(${pick.b})^2}$.`,
            `The sought factor is the ratio $F'/F = \\frac{${pick.a}}{(${pick.b})^2}$.`,
          ),
        ],
        answerDisplay: L(
          `$F' = \\frac{${pick.a}}{${pick.b * pick.b}} F \\approx ${tok(factor)}\\,F$`,
          `$F' = \\frac{${pick.a}}{${pick.b * pick.b}} F \\approx ${tok(factor)}\\,F$`,
        ),
        solution: [
          step(
            "given",
            `$m_1' = ${pick.a}\\,m_1$, $r' = ${pick.b}\\,r$; $F = G\\,\\dfrac{m_1 m_2}{r^2}$.`,
            `$m_1' = ${pick.a}\\,m_1$, $r' = ${pick.b}\\,r$; $F = G\\,\\dfrac{m_1 m_2}{r^2}$.`,
          ),
          step(
            "approach",
            "Escribimos $F'$ con los nuevos valores y la comparamos con $F$ mediante un cociente.",
            "Write $F'$ with the new values and compare it with $F$ through a ratio.",
          ),
          step(
            "calculation",
            `$F' = G\\,\\dfrac{(${pick.a}\\,m_1)\\,m_2}{(${pick.b}\\,r)^2} = \\dfrac{${pick.a}}{${pick.b * pick.b}}\\,G\\,\\dfrac{m_1 m_2}{r^2} = \\dfrac{${pick.a}}{${pick.b * pick.b}}\\,F$<br>$F'/F = \\dfrac{${pick.a}}{${pick.b * pick.b}} \\approx ${tok(factor)}$`,
            `$F' = G\\,\\dfrac{(${pick.a}\\,m_1)\\,m_2}{(${pick.b}\\,r)^2} = \\dfrac{${pick.a}}{${pick.b * pick.b}}\\,G\\,\\dfrac{m_1 m_2}{r^2} = \\dfrac{${pick.a}}{${pick.b * pick.b}}\\,F$<br>$F'/F = \\dfrac{${pick.a}}{${pick.b * pick.b}} \\approx ${tok(factor)}$`,
          ),
          step(
            "result",
            `La fuerza queda multiplicada por $\\approx ${tok(factor)}$: el aumento de distancia pesa más que el aumento de masa, porque $r$ está al cuadrado.`,
            `The force is multiplied by $\\approx ${tok(factor)}$: the larger distance matters more than the extra mass, because $r$ is squared.`,
          ),
        ],
      };
    },
  ),
];
