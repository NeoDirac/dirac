/**
 * MATH · Foundations (arithmetic & algebra)
 *
 * Exemplar file: demonstrates static problems, parameterized generators,
 * numeric/expression/multiple-choice question types, and the full hint +
 * solution structure. Use it as the reference when authoring new topics.
 */

import { template, L, step, tok } from "@/lib/problem";
import type { ProblemTemplate, McOption } from "@/lib/types";

const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));

export const templates: ProblemTemplate[] = [
  /* ---------------------------------------------------------------- */
  /* Order of operations                                              */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "found-ooo-01",
      subject: "math",
      topicId: "foundations",
      subtopicId: "order-of-operations",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 60,
      tags: ["order-of-operations"],
      prerequisites: [],
    },
    (rng) => {
      const b = rng.int(2, 9);
      const c = rng.int(2, 9);
      const a = rng.int(2, 40);
      const value = a + b * c;
      return {
        skill: L("Jerarquía de operaciones", "Order of operations"),
        statement: L(
          `Calcula: $${a} + ${b} \\cdot ${c}$`,
          `Evaluate: $${a} + ${b} \\cdot ${c}$`,
        ),
        answer: { kind: "numeric", value },
        hints: [
          L(
            "La multiplicación se hace antes que la suma.",
            "Multiplication is done before addition.",
          ),
          L(
            `Primero calcula $${b} \\cdot ${c}$.`,
            `First compute $${b} \\cdot ${c}$.`,
          ),
          L(
            `Suma el resultado a $${a}$.`,
            `Add the result to $${a}$.`,
          ),
        ],
        answerDisplay: L(`$${value}$`, `$${value}$`),
        solution: [
          step(
            "given",
            `Expresión: $${a} + ${b} \\cdot ${c}$`,
            `Expression: $${a} + ${b} \\cdot ${c}$`,
          ),
          step(
            "approach",
            "Aplicamos la jerarquía: primero potencias y raíces, luego productos y divisiones, y por último sumas y restas.",
            "Apply the order of operations: powers and roots first, then products and divisions, and finally additions and subtractions.",
          ),
          step(
            "calculation",
            `$${a} + ${b} \\cdot ${c} = ${a} + ${b * c}$`,
            `$${a} + ${b} \\cdot ${c} = ${a} + ${b * c}$`,
          ),
          step(
            "result",
            `$= ${value}$`,
            `$= ${value}$`,
          ),
        ],
      };
    },
  ),

  template(
    {
      id: "found-ooo-02",
      subject: "math",
      topicId: "foundations",
      subtopicId: "order-of-operations",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 90,
      tags: ["order-of-operations", "powers"],
      prerequisites: [],
    },
    (rng) => {
      const a = rng.int(2, 5);
      const b = rng.int(1, 4);
      const c = rng.int(2, 9);
      const d = rng.int(1, 8);
      // (a^b + c) / d, guaranteed divisible
      const num = a ** b + c;
      const dFinal = num % d === 0 ? d : num; // avoid ugly fractions at easy/medium
      const useDivision = num % d === 0;
      const value = useDivision ? num / d : num - d;
      const expr = useDivision
        ? `\\frac{${a}^{${b}} + ${c}}{${d}}`
        : `${a}^{${b}} + ${c} - ${d}`;
      return {
        skill: L("Jerarquía con potencias", "Order of operations with powers"),
        statement: L(`Calcula: $${expr}$`, `Evaluate: $${expr}$`),
        answer: { kind: "numeric", value },
        hints: [
          L(
            "Resuelve primero lo que está dentro del paréntesis o en el numerador.",
            "Solve what is inside the parentheses or the numerator first.",
          ),
          L(
            `Calcula $${a}^{${b}}$ y luego la operación indicada.`,
            `Compute $${a}^{${b}}$ and then the indicated operation.`,
          ),
          L(
            "Termina con la operación que queda fuera (división o resta).",
            "Finish with the remaining outer operation (division or subtraction).",
          ),
        ],
        answerDisplay: L(`$${value}$`, `$${value}$`),
        solution: useDivision
          ? [
              step("given", `Expresión: $${expr}$`, `Expression: $${expr}$`),
              step(
                "approach",
                "El numerador se calcula entero antes de dividir.",
                "The whole numerator is computed before dividing.",
              ),
              step(
                "calculation",
                `$${a}^{${b}} + ${c} = ${a ** b} + ${c} = ${num}$, luego $\\frac{${num}}{${d}} = ${value}$`,
                `$${a}^{${b}} + ${c} = ${a ** b} + ${c} = ${num}$, then $\\frac{${num}}{${d}} = ${value}$`,
              ),
              step("result", `El resultado es $${value}$.`, `The result is $${value}$.`),
            ]
          : [
              step("given", `Expresión: $${expr}$`, `Expression: $${expr}$`),
              step(
                "approach",
                "La potencia se calcula antes que la resta.",
                "The power is computed before the subtraction.",
              ),
              step(
                "calculation",
                `$${a}^{${b}} = ${a ** b}$, luego $${a ** b} + ${c} - ${d} = ${num} - ${d} = ${value}$`,
                `$${a}^{${b}} = ${a ** b}$, then $${a ** b} + ${c} - ${d} = ${num} - ${d} = ${value}$`,
              ),
              step("result", `El resultado es $${value}$.`, `The result is $${value}$.`),
            ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Fractions                                                        */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "found-frac-01",
      subject: "math",
      topicId: "foundations",
      subtopicId: "fractions",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 90,
      tags: ["fractions"],
      prerequisites: [],
    },
    (rng) => {
      const halves = [2, 3, 4, 5, 6, 8, 10, 12];
      const b = rng.pick(halves);
      const a = rng.int(1, b - 1);
      const c = rng.int(1, 6);
      const num = a * c + 1;
      const den = b * c;
      const gg = gcd(num, den);
      const redNum = num / gg;
      const redDen = den / gg;
      const value = num / den;
      return {
        skill: L("Suma de fracciones", "Adding fractions"),
        statement: L(
          `Calcula $\\frac{${a}}{${b}} + \\frac{1}{${c * b}}$. Da el resultado como número o como fracción (por ejemplo 3/4).`,
          `Compute $\\frac{${a}}{${b}} + \\frac{1}{${c * b}}$. Give the result as a number or a fraction (e.g. 3/4).`,
        ),
        answer: { kind: "numeric", value, tolerance: { mode: "relative", value: 0.005 } },
        hints: [
          L(
            "Los denominadores son distintos: busca uno común.",
            "The denominators differ: find a common one.",
          ),
          L(
            `$${c * b}$ es múltiplo de $${b}$: amplifica la primera fracción por $${c}$.`,
            `$${c * b}$ is a multiple of $${b}$: scale the first fraction by $${c}$.`,
          ),
          L(
            `Suma los numeradores: $${a * c} + 1$.`,
            `Add the numerators: $${a * c} + 1$.`,
          ),
        ],
        answerDisplay:
          redDen === 1
            ? L(`$${redNum}$`, `$${redNum}$`)
            : L(
                `$\\frac{${redNum}}{${redDen}}$`,
                `$\\frac{${redNum}}{${redDen}}$`,
              ),
        solution: [
          step(
            "given",
            `$\\frac{${a}}{${b}} + \\frac{1}{${c * b}}$`,
            `$\\frac{${a}}{${b}} + \\frac{1}{${c * b}}$`,
          ),
          step(
            "approach",
            "Reducimos a común denominador y sumamos los numeradores.",
            "Reduce to a common denominator and add the numerators.",
          ),
          step(
            "calculation",
            `$\\frac{${a}}{${b}} + \\frac{1}{${c * b}} = \\frac{${a * c}}{${c * b}} + \\frac{1}{${c * b}} = \\frac{${num}}{${den}}$`,
            `$\\frac{${a}}{${b}} + \\frac{1}{${c * b}} = \\frac{${a * c}}{${c * b}} + \\frac{1}{${c * b}} = \\frac{${num}}{${den}}$`,
          ),
          step(
            "result",
            redDen === 1
              ? `El resultado es $${redNum}$.`
              : `Simplificando: $\\frac{${redNum}}{${redDen}}$.`,
            redDen === 1
              ? `The result is $${redNum}$.`
              : `Simplified: $\\frac{${redNum}}{${redDen}}$.`,
          ),
        ],
      };
    },
  ),

  template(
    {
      id: "found-frac-02",
      subject: "math",
      topicId: "foundations",
      subtopicId: "fractions",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 120,
      tags: ["fractions", "division"],
      prerequisites: [],
    },
    (rng) => {
      const a = rng.int(2, 9);
      const b = rng.int(2, 9);
      const c = rng.int(2, 9);
      const d = rng.int(2, 9);
      const value = (a / b) / (c / d);
      return {
        skill: L("División de fracciones", "Dividing fractions"),
        statement: L(
          `Calcula $\\frac{${a}}{${b}} \\div \\frac{${c}}{${d}}$. Da el resultado como número o fracción.`,
          `Compute $\\frac{${a}}{${b}} \\div \\frac{${c}}{${d}}$. Give the result as a number or fraction.`,
        ),
        answer: { kind: "numeric", value, tolerance: { mode: "relative", value: 0.005 } },
        hints: [
          L(
            "Dividir por una fracción equivale a multiplicar por su inversa.",
            "Dividing by a fraction is multiplying by its reciprocal.",
          ),
          L(
            `Invierte $\\frac{${c}}{${d}}$ y multiplica.`,
            `Flip $\\frac{${c}}{${d}}$ and multiply.`,
          ),
          L(
            "Multiplica numeradores entre sí y denominadores entre sí.",
            "Multiply numerators together and denominators together.",
          ),
        ],
        answerDisplay: L(
          `$\\frac{${a * d}}{${b * c}}$`,
          `$\\frac{${a * d}}{${b * c}}$`,
        ),
        solution: [
          step(
            "given",
            `$\\frac{${a}}{${b}} \\div \\frac{${c}}{${d}}$`,
            `$\\frac{${a}}{${b}} \\div \\frac{${c}}{${d}}$`,
          ),
          step(
            "approach",
            "Convertimos la división en un producto por la fracción invertida.",
            "Turn the division into a product by the flipped fraction.",
          ),
          step(
            "calculation",
            `$\\frac{${a}}{${b}} \\cdot \\frac{${d}}{${c}} = \\frac{${a * d}}{${b * c}}$`,
            `$\\frac{${a}}{${b}} \\cdot \\frac{${d}}{${c}} = \\frac{${a * d}}{${b * c}}$`,
          ),
          step(
            "result",
            `El resultado es $\\frac{${a * d}}{${b * c}} \\approx {{${value.toFixed(3)}}}$.`,
            `The result is $\\frac{${a * d}}{${b * c}} \\approx {{${value.toFixed(3)}}}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Percentages                                                      */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "found-pct-01",
      subject: "math",
      topicId: "foundations",
      subtopicId: "percentages",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 60,
      tags: ["percentages"],
      prerequisites: [],
    },
    (rng) => {
      const p = rng.pick([10, 15, 20, 25, 40, 50, 60, 75]);
      const base = rng.pick([40, 60, 80, 120, 200, 240, 300, 400]);
      const value = (p / 100) * base;
      return {
        skill: L("Porcentaje de una cantidad", "Percentage of a quantity"),
        statement: L(
          `Calcula el $${p}\\%$ de $${base}$.`,
          `Compute $${p}\\%$ of $${base}$.`,
        ),
        answer: { kind: "numeric", value },
        hints: [
          L(
            '"Por ciento" significa "dividido entre 100".',
            '"Per cent" means "divided by 100".',
          ),
          L(
            `Escribe el porcentaje como fracción o decimal: $${p}\\% = {{${(p / 100).toFixed(2)}}}$.`,
            `Write the percentage as a fraction or decimal: $${p}\\% = {{${(p / 100).toFixed(2)}}}$.`,
          ),
          L(
            `Multiplica ese decimal por $${base}$.`,
            `Multiply that decimal by $${base}$.`,
          ),
        ],
        answerDisplay: L(`$${value}$`, `$${value}$`),
        solution: [
          step("given", `$${p}\\%$ de $${base}$`, `$${p}\\%$ of $${base}$`),
          step(
            "approach",
            "Un porcentaje se aplica multiplicando la cantidad por el tanto por uno.",
            "Apply a percentage by multiplying the quantity by its decimal form.",
          ),
          step(
            "calculation",
            `$${p}\\% = \\frac{${p}}{100} = {{${(p / 100).toFixed(2)}}} \\quad\\Rightarrow\\quad {{${(p / 100).toFixed(2)}}} \\cdot ${base} = ${value}$`,
            `$${p}\\% = \\frac{${p}}{100} = {{${(p / 100).toFixed(2)}}} \\quad\\Rightarrow\\quad {{${(p / 100).toFixed(2)}}} \\cdot ${base} = ${value}$`,
          ),
          step("result", `El $${p}\\%$ de $${base}$ es $${value}$.`, `$${p}\\%$ of $${base}$ is $${value}$.`),
        ],
      };
    },
  ),

  template(
    {
      id: "found-pct-02",
      subject: "math",
      topicId: "foundations",
      subtopicId: "percentages",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 150,
      tags: ["percentages", "word-problems"],
      prerequisites: [],
    },
    (rng) => {
      const base = rng.pick([80, 120, 150, 200, 250]);
      const inc = rng.pick([10, 20, 25, 50]);
      const value = base * (1 + inc / 100);
      return {
        skill: L("Aumento porcentual", "Percentage increase"),
        statement: L(
          `Un artículo que costaba $${base}\\,€$ sube un $${inc}\\%$. ¿Cuál es el precio final en euros?`,
          `An item that cost $${base}\\,€$ rises by $${inc}\\%$. What is the final price in euros?`,
        ),
        answer: { kind: "numeric", value, unitSuffix: "€" },
        hints: [
          L(
            "Primero calcula cuánto aumenta el precio.",
            "First compute how much the price increases.",
          ),
          L(
            `El aumento es $${inc}\\%$ de $${base}$.`,
            `The increase is $${inc}\\%$ of $${base}$.`,
          ),
          L(
            "Súmale el aumento al precio original.",
            "Add the increase to the original price.",
          ),
        ],
        answerDisplay: L(`$${value}\\,€$`, `$${value}\\,€$`),
        solution: [
          step(
            "given",
            `Precio inicial: $${base}\\,€$. Subida: $${inc}\\%$.`,
            `Initial price: $${base}\\,€$. Increase: $${inc}\\%$.`,
          ),
          step(
            "approach",
            "Calculamos el aumento y lo sumamos (equivalente a multiplicar por $1 + \\text{tanto por uno}$).",
            "Compute the increase and add it (equivalent to multiplying by $1 + \\text{decimal form}$).",
          ),
          step(
            "calculation",
            `$\\text{aumento} = \\frac{${inc}}{100} \\cdot ${base} = ${base * (inc / 100)}\\,€$<br>$\\text{final} = ${base} + ${base * (inc / 100)} = ${value}\\,€$`,
            `$\\text{increase} = \\frac{${inc}}{100} \\cdot ${base} = ${base * (inc / 100)}\\,€$<br>$\\text{final} = ${base} + ${base * (inc / 100)} = ${value}\\,€$`,
          ),
          step("result", `El precio final es $${value}\\,€$.`, `The final price is $${value}\\,€$.`),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Signed numbers                                                   */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "found-signed-01",
      subject: "math",
      topicId: "foundations",
      subtopicId: "signed-numbers",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 60,
      tags: ["signed-numbers"],
      prerequisites: [],
    },
    (rng) => {
      const a = rng.int(2, 15);
      const b = rng.int(2, 15);
      const minusFirst = rng.bool();
      const value = minusFirst ? -a - b : -a + b;
      const expr = minusFirst ? `$-${a} - ${b}$` : `$-${a} + ${b}$`;
      return {
        skill: L("Suma y resta con signos", "Adding and subtracting signed numbers"),
        statement: L(`Calcula: ${expr}`, `Evaluate: ${expr}`),
        answer: { kind: "numeric", value },
        hints: [
          L(
            "Ambos números tienen signo: fíjate si son iguales o distintos.",
            "Both numbers carry a sign: check whether they are the same or different.",
          ),
          minusFirst
            ? L(
                "Es una suma de dos negativos: el resultado también es negativo.",
                "This is the sum of two negatives: the result is also negative.",
              )
            : L(
                "Signos distintos: resta los valores absolutos y conserva el signo del mayor.",
                "Different signs: subtract the absolute values and keep the sign of the larger one.",
              ),
          L(
            `Opera con los valores absolutos $${a}$ y $${b}$.`,
            `Work with the absolute values $${a}$ and $${b}$.`,
          ),
        ],
        answerDisplay: L(`$${value}$`, `$${value}$`),
        solution: [
          step("given", expr, expr),
          step(
            "approach",
            minusFirst
              ? "Sumar dos números negativos da un negativo cuya distancia es la suma de las distancias."
              : "Con signos distintos, restamos los valores absolutos y conservamos el signo del mayor.",
            minusFirst
              ? "Adding two negatives gives a negative whose size is the sum of the sizes."
              : "With different signs, subtract the absolute values and keep the sign of the larger one.",
          ),
          step(
            "calculation",
            minusFirst ? `$-${a} - ${b} = -(${a} + ${b}) = ${value}$` : `$-${a} + ${b} = ${b} - ${a}$ con signo del mayor$= ${value}$`,
            minusFirst ? `$-${a} - ${b} = -(${a} + ${b}) = ${value}$` : `$-${a} + ${b} = ${b} - ${a}$ with the sign of the larger$= ${value}$`,
          ),
          step("result", `El resultado es $${value}$.`, `The result is $${value}$.`),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Powers & roots                                                   */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "found-pow-01",
      subject: "math",
      topicId: "foundations",
      subtopicId: "powers",
      difficulty: "easy",
      questionType: "expression",
      estimatedTimeSec: 90,
      tags: ["exponent-laws"],
      prerequisites: [],
    },
    (rng) => {
      const m = rng.int(2, 6);
      const n = rng.int(2, 6);
      const base = rng.pick(["x", "a", "b"]);
      return {
        skill: L("Producto de potencias de igual base", "Product of powers with the same base"),
        statement: L(
          `Simplifica: $${base}^{${m}} \\cdot ${base}^{${n}}$ (escribe el resultado con la variable, por ejemplo x^7 o x**7).`,
          `Simplify: $${base}^{${m}} \\cdot ${base}^{${n}}$ (write the result with the variable, e.g. x^7 or x**7).`,
        ),
        answer: {
          kind: "expression",
          accepted: [`${base}^${m + n}`],
          variables: [base],
        },
        hints: [
          L(
            "Las dos potencias tienen la misma base.",
            "Both powers have the same base.",
          ),
          L(
            "Con la misma base, se conservan la base y se **suman** los exponentes.",
            "With the same base, keep the base and **add** the exponents.",
          ),
          L(`El exponente final es $${m} + ${n}$.`, `The final exponent is $${m} + ${n}$.`),
        ],
        answerDisplay: L(`$${base}^{${m + n}}$`, `$${base}^{${m + n}}$`),
        solution: [
          step(
            "given",
            `$${base}^{${m}} \\cdot ${base}^{${n}}$`,
            `$${base}^{${m}} \\cdot ${base}^{${n}}$`,
          ),
          step(
            "approach",
            "Identidad: $a^{m} \\cdot a^{n} = a^{m+n}$.",
            "Identity: $a^{m} \\cdot a^{n} = a^{m+n}$.",
          ),
          step(
            "calculation",
            `$${base}^{${m}} \\cdot ${base}^{${n}} = ${base}^{${m}+${n}}$`,
            `$${base}^{${m}} \\cdot ${base}^{${n}} = ${base}^{${m}+${n}}$`,
          ),
          step("result", `$= ${base}^{${m + n}}$`, `$= ${base}^{${m + n}}$`),
        ],
      };
    },
  ),

  template(
    {
      id: "found-root-01",
      subject: "math",
      topicId: "foundations",
      subtopicId: "roots",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 120,
      tags: ["radicals", "simplification"],
      prerequisites: [],
    },
    (rng) => {
      const k = rng.pick([2, 3, 5, 6, 7]);
      const squareFactor = k * k;
      const remaining = rng.pick([2, 3, 5]);
      const inner = squareFactor * remaining;
      return {
        skill: L("Simplificar raíces cuadradas", "Simplifying square roots"),
        statement: L(
          `Simplifica: $\\sqrt{${inner}}$ (puedes escribir sqrt(2), 2sqrt(3), …).`,
          `Simplify: $\\sqrt{${inner}}$ (you may write sqrt(2), 2sqrt(3), …).`,
        ),
        answer: {
          kind: "expression",
          accepted: [`${k}*sqrt(${remaining})`],
          variables: [],
        },
        hints: [
          L(
            `Busca el mayor cuadrado perfecto que divida a $${inner}$.`,
            `Find the largest perfect square that divides $${inner}$.`,
          ),
          L(
            `$${squareFactor} = ${k}^2$ es un factor.`,
            `$${squareFactor} = ${k}^2$ is a factor.`,
          ),
          L(
            `Separa: $\\sqrt{${inner}} = \\sqrt{${squareFactor}} \\cdot \\sqrt{${remaining}}$.`,
            `Split it: $\\sqrt{${inner}} = \\sqrt{${squareFactor}} \\cdot \\sqrt{${remaining}}$.`,
          ),
        ],
        answerDisplay: L(`$${k}\\sqrt{${remaining}}$`, `$${k}\\sqrt{${remaining}}$`),
        solution: [
          step("given", `$\\sqrt{${inner}}$`, `$\\sqrt{${inner}}$`),
          step(
            "approach",
            "Extraemos el mayor factor cuadrado perfecto del radicando.",
            "Extract the largest perfect-square factor from the radicand.",
          ),
          step(
            "calculation",
            `$\\sqrt{${inner}} = \\sqrt{${squareFactor} \\cdot ${remaining}} = \\sqrt{${squareFactor}} \\cdot \\sqrt{${remaining}} = ${k}\\sqrt{${remaining}}$`,
            `$\\sqrt{${inner}} = \\sqrt{${squareFactor} \\cdot ${remaining}} = \\sqrt{${squareFactor}} \\cdot \\sqrt{${remaining}} = ${k}\\sqrt{${remaining}}$`,
          ),
          step(
            "result",
            `$\\sqrt{${inner}} = ${k}\\sqrt{${remaining}}$`,
            `$\\sqrt{${inner}} = ${k}\\sqrt{${remaining}}$`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Scientific notation (multiple-choice exemplar)                   */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "found-sci-01",
      subject: "math",
      topicId: "foundations",
      subtopicId: "scientific-notation",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 90,
      tags: ["scientific-notation"],
      prerequisites: ["powers"],
    },
    (rng) => {
      const m = rng.pick([15, 28, 36, 42, 57, 63, 71, 84]);
      const exp = rng.pick([3, 4, 5]);
      const value = m * Math.pow(10, exp - 1);
      const mant = m / 10;
      const options: McOption[] = [
        { id: "a", text: L(`$${mant} \\times 10^{${exp}}$`, `$${mant} \\times 10^{${exp}}$`), correct: true },
        { id: "b", text: L(`$${m} \\times 10^{${exp - 1}}$`, `$${m} \\times 10^{${exp - 1}}$`), correct: false },
        { id: "c", text: L(`$${mant} \\times 10^{${exp + 1}}$`, `$${mant} \\times 10^{${exp + 1}}$`), correct: false },
        { id: "d", text: L(`$${m / 100} \\times 10^{${exp + 1}}$`, `$${m / 100} \\times 10^{${exp + 1}}$`), correct: false },
      ];
      return {
        skill: L("Notación científica", "Scientific notation"),
        statement: L(
          `¿Cuál es $${value}$ escrito en notación científica?`,
          `Which is $${value}$ written in scientific notation?`,
        ),
        answer: {
          kind: "multiple-choice",
          options: rng.shuffle(options),
        },
        hints: [
          L(
            "En notación científica el primer factor está entre 1 y 10.",
            "In scientific notation the first factor is between 1 and 10.",
          ),
          L(
            `Mueve la coma hasta obtener un número entre 1 y 10; cuenta cuántos lugares.`,
            `Slide the decimal point until you get a number between 1 and 10; count the places.`,
          ),
          L(
            "El número de lugares que mueves la coma es el exponente.",
            "The number of places you move the point is the exponent.",
          ),
        ],
        answerDisplay: L(`$${mant} \\times 10^{${exp}}$`, `$${mant} \\times 10^{${exp}}$`),
        solution: [
          step("given", `$${value}$`, `$${value}$`),
          step(
            "approach",
            "Buscamos $a \\times 10^{n}$ con $1 \\le a < 10$.",
            "We want $a \\times 10^{n}$ with $1 \\le a < 10$.",
          ),
          step(
            "calculation",
            `$${value} = ${mant} \\times 10^{${exp}}$ porque movemos la coma ${exp} lugares a la izquierda.`,
            `$${value} = ${mant} \\times 10^{${exp}}$ because we move the point ${exp} places to the left.`,
          ),
          step("result", `$${value} = ${mant} \\times 10^{${exp}}$`, `$${value} = ${mant} \\times 10^{${exp}}$`),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Distributive & like terms                                        */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "found-dist-01",
      subject: "math",
      topicId: "foundations",
      subtopicId: "distributive",
      difficulty: "easy",
      questionType: "expression",
      estimatedTimeSec: 90,
      tags: ["distributive", "expand"],
      prerequisites: [],
    },
    (rng) => {
      const a = rng.int(2, 9);
      const b = rng.int(2, 15);
      const c = rng.int(2, 12);
      return {
        skill: L("Propiedad distributiva", "Distributive property"),
        statement: L(
          `Expande y simplifica: $${a}(x + ${b}) - ${c}$ (escribe por ejemplo 3x+5).`,
          `Expand and simplify: $${a}(x + ${b}) - ${c}$ (write e.g. 3x+5).`,
        ),
        answer: {
          kind: "expression",
          accepted: [`${a}x + ${a * b - c}`],
          variables: ["x"],
        },
        hints: [
          L(
            `Multiplica $${a}$ por **cada término** del paréntesis.`,
            `Multiply $${a}$ by **each term** inside the parentheses.`,
          ),
          L(`$${a} \\cdot x = ${a}x$ y $${a} \\cdot ${b} = ${a * b}$.`, `$${a} \\cdot x = ${a}x$ and $${a} \\cdot ${b} = ${a * b}$.`),
          L(`Resta $${c}$ del resultado numérico.`, `Subtract $${c}$ from the numerical result.`),
        ],
        answerDisplay: L(`$${a}x + ${a * b - c}$`, `$${a}x + ${a * b - c}$`),
        solution: [
          step("given", `$${a}(x + ${b}) - ${c}$`, `$${a}(x + ${b}) - ${c}$`),
          step(
            "approach",
            "Aplicamos la distributiva y luego juntamos los términos numéricos.",
            "Apply the distributive property, then combine the numeric terms.",
          ),
          step(
            "calculation",
            `$${a}(x + ${b}) - ${c} = ${a}x + ${a * b} - ${c}$`,
            `$${a}(x + ${b}) - ${c} = ${a}x + ${a * b} - ${c}$`,
          ),
          step("result", `$= ${a}x + ${a * b - c}$`, `$= ${a}x + ${a * b - c}$`),
        ],
      };
    },
  ),

  template(
    {
      id: "found-like-01",
      subject: "math",
      topicId: "foundations",
      subtopicId: "like-terms",
      difficulty: "easy",
      questionType: "expression",
      estimatedTimeSec: 90,
      tags: ["like-terms", "simplify"],
      prerequisites: [],
    },
    (rng) => {
      const a = rng.int(2, 9);
      const b = rng.int(1, 9);
      const c = rng.int(1, 9);
      const d = rng.int(1, 12);
      const coefX = a - c;
      const num = b + d;
      return {
        skill: L("Reducir términos semejantes", "Combining like terms"),
        statement: L(
          `Simplifica: $${a}x + ${b} - ${c}x + ${d}$`,
          `Simplify: $${a}x + ${b} - ${c}x + ${d}$`,
        ),
        answer: {
          kind: "expression",
          accepted: coefX === 0 ? [`${num}`] : [`${coefX}x + ${num}`],
          variables: ["x"],
        },
        hints: [
          L(
            "Agrupa por separado los términos con $x$ y los números.",
            "Group the $x$ terms and the numbers separately.",
          ),
          L(
            `Los términos en $x$ son $${a}x$ y $-${c}x$.`,
            `The $x$ terms are $${a}x$ and $-${c}x$.`,
          ),
          L(
            `Los números son $${b}$ y $${d}$.`,
            `The numbers are $${b}$ and $${d}$.`,
          ),
        ],
        answerDisplay:
          coefX === 0
            ? L(`$${num}$`, `$${num}$`)
            : L(`$${coefX}x + ${num}$`, `$${coefX}x + ${num}$`),
        solution: [
          step("given", `$${a}x + ${b} - ${c}x + ${d}$`, `$${a}x + ${b} - ${c}x + ${d}$`),
          step(
            "approach",
            "Solo se suman o restan términos semejantes (misma parte literal).",
            "Only like terms (same variable part) can be added or subtracted.",
          ),
          step(
            "calculation",
            `$(${a}x - ${c}x) + (${b} + ${d}) = ${coefX}x + ${num}$`,
            `$(${a}x - ${c}x) + (${b} + ${d}) = ${coefX}x + ${num}$`,
          ),
          step(
            "result",
            coefX === 0 ? `$= ${num}$` : `$= ${coefX}x + ${num}$`,
            coefX === 0 ? `$= ${num}$` : `$= ${coefX}x + ${num}$`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Ratios & proportions                                             */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "found-prop-01",
      subject: "math",
      topicId: "foundations",
      subtopicId: "ratios-proportions",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 120,
      tags: ["proportions", "word-problems"],
      prerequisites: ["fractions"],
    },
    (rng) => {
      const recipeFor = rng.int(4, 8);
      const cups = rng.int(2, 5);
      const factor = rng.pick([2, 3, 4]);
      const value = cups * factor;
      return {
        skill: L("Proporcionalidad directa", "Direct proportionality"),
        statement: L(
          `Una receta para $${recipeFor}$ personas usa $${cups}$ tazas de arroz. ¿Cuántas tazas necesita la receta para $${recipeFor * factor}$ personas (con el mismo reparto por persona)?`,
          `A recipe for $${recipeFor}$ people uses $${cups}$ cups of rice. How many cups does the recipe need for $${recipeFor * factor}$ people (same amount per person)?`,
        ),
        answer: { kind: "numeric", value },
        hints: [
          L(
            "Compara la nueva cantidad de personas con la original.",
            "Compare the new number of people with the original one.",
          ),
          L(
            `¿Cuántas veces mayor es $${recipeFor * factor}$ que $${recipeFor}$?`,
            `How many times larger is $${recipeFor * factor}$ than $${recipeFor}$?`,
          ),
          L(
            `Multiplica las tazas por ese factor.`,
            `Multiply the cups by that factor.`,
          ),
        ],
        answerDisplay: L(`$${value}$ tazas`, `$${value}$ cups`),
        solution: [
          step(
            "given",
            `$${recipeFor}$ personas → $${cups}$ tazas.<br>$${recipeFor * factor}$ personas → ?`,
            `$${recipeFor}$ people → $${cups}$ cups.<br>$${recipeFor * factor}$ people → ?`,
          ),
          step(
            "approach",
            "Magnitudes directamente proporcionales: multiplicamos por el mismo factor.",
            "Directly proportional quantities: multiply by the same factor.",
          ),
          step(
            "calculation",
            `$\\frac{${recipeFor * factor}}{${recipeFor}} = ${factor} \\quad\\Rightarrow\\quad ${cups} \\cdot ${factor} = ${value}$`,
            `$\\frac{${recipeFor * factor}}{${recipeFor}} = ${factor} \\quad\\Rightarrow\\quad ${cups} \\cdot ${factor} = ${value}$`,
          ),
          step(
            "result",
            `Se necesitan $${value}$ tazas.`,
            `$${value}$ cups are needed.`,
          ),
        ],
      };
    },
  ),

  template(
    {
      id: "found-prop-02",
      subject: "math",
      topicId: "foundations",
      subtopicId: "ratios-proportions",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 180,
      tags: ["proportions", "word-problems"],
      prerequisites: ["fractions"],
    },
    (rng) => {
      const total = rng.pick([60, 72, 84, 90, 120]);
      const partA = rng.pick([2, 3, 5]);
      const partB = rng.pick([2, 3, 4]);
      const sum = partA + partB;
      const value = (total * partA) / sum;
      return {
        skill: L("Reparto proporcional", "Sharing in a ratio"),
        statement: L(
          `Reparte $${total}$ canicas entre dos hermanos en la proporción $${partA}:${partB}$. ¿Cuántas canicas recibe el que tiene la parte mayor?`,
          `Share $${total}$ marbles between two siblings in the ratio $${partA}:${partB}$. How many marbles does the one with the larger share get?`,
        ),
        answer: { kind: "numeric", value },
        hints: [
          L(
            "La proporción indica las partes, no las cantidades.",
            "The ratio gives parts, not amounts.",
          ),
          L(
            `En total hay $${partA} + ${partB} = ${sum}$ partes.`,
            `Altogether there are $${partA} + ${partB} = ${sum}$ parts.`,
          ),
          L(
            `Calcula el valor de una parte y multiplícalo por $${partA}$.`,
            `Work out one part and multiply it by $${partA}$.`,
          ),
        ],
        answerDisplay: L(`$${value}$ canicas`, `$${value}$ marbles`),
        solution: [
          step(
            "given",
            `Total: $${total}$. Proporción $${partA}:${partB}$.`,
            `Total: $${total}$. Ratio $${partA}:${partB}$.`,
          ),
          step(
            "approach",
            "Dividimos el total en partes iguales según la suma de la proporción y repartimos.",
            "Split the total into equal parts given by the sum of the ratio, then distribute.",
          ),
          step(
            "calculation",
            `$\\text{1 parte} = \\frac{${total}}{${sum}} = ${total / sum}$<br>$\\text{parte mayor} = ${partA} \\cdot ${total / sum} = ${value}$`,
            `$\\text{1 part} = \\frac{${total}}{${sum}} = ${total / sum}$<br>$\\text{larger share} = ${partA} \\cdot ${total / sum} = ${value}$`,
          ),
          step(
            "result",
            `El hermano con la parte mayor recibe $${value}$ canicas.`,
            `The sibling with the larger share gets $${value}$ marbles.`,
          ),
        ],
      };
    },
  ),
  template(
    {
      id: "found-chal-01",
      subject: "math",
      topicId: "foundations",
      subtopicId: "percentages",
      difficulty: "challenge",
      questionType: "numeric",
      estimatedTimeSec: 300,
      tags: ["percentages", "word-problems", "multi-step"],
      prerequisites: ["percentages", "fractions"],
    },
    (rng) => {
      const p = rng.pick([10, 20, 50]);
      const netFactor = 1 - (p / 100) ** 2;
      const value = Math.round(netFactor * 10000) / 100;
      const dec = p / 100;
      return {
        skill: L("Cambios porcentuales sucesivos", "Successive percentage changes"),
        statement: L(
          `El precio de un artículo sube un $${p}\\%$ y después baja un $${p}\\%$ respecto al nuevo precio. ¿Qué porcentaje del precio original se paga al final?`,
          `An item's price rises by $${p}\\%$ and then falls by $${p}\\%$ of the new price. What percentage of the original price do you end up paying?`,
        ),
        answer: {
          kind: "numeric",
          value,
          tolerance: { mode: "absolute", value: 0.05 },
          unitSuffix: "%",
        },
        hints: [
          L(
            "Prueba con un precio cualquiera, por ejemplo $100$, y sigue los dos cambios.",
            "Try any price, say $100$, and apply both changes.",
          ),
          L(
            `Tras subir un $${p}\\%$ el precio es $${100 + p}$. La bajada se aplica sobre ese valor.`,
            `After rising $${p}\\%$ the price is $${100 + p}$. The fall applies to that value.`,
          ),
          L(
            "La pregunta es: ¿el precio final equivale a qué % de 100?",
            "The question is: the final price equals what % of 100?",
          ),
        ],
        answerDisplay: L(`$${tok(value)}\\%$ del precio original`, `$${tok(value)}\\%$ of the original price`),
        solution: [
          step(
            "given",
            `Precio inicial: $100$ (cualquier valor sirve). Sube $${p}\\%$, luego baja $${p}\\%$.`,
            `Initial price: $100$ (any value works). Rises $${p}\\%$, then falls $${p}\\%$.`,
          ),
          step(
            "approach",
            "Aplicamos los cambios multiplicativos **en cadena**: subir un $p\\%$ es multiplicar por $(1 + p/100)$.",
            "Apply multiplicative changes **in sequence**: a $p\\%$ rise multiplies by $(1 + p/100)$.",
          ),
          step(
            "calculation",
            `$100 \\cdot (1 + ${tok(dec)}) = ${100 + p}$<br>$${100 + p} \\cdot (1 - ${tok(dec)}) = ${tok(Math.round((100 + p) * (1 - dec) * 100) / 100)}$<br>O directamente: $100\\left(1 - \\frac{${p * p}}{10000}\\right) = ${tok(Math.round(netFactor * 100) / 100)}$`,
            `$100 \\cdot (1 + ${tok(dec)}) = ${100 + p}$<br>$${100 + p} \\cdot (1 - ${tok(dec)}) = ${tok(Math.round((100 + p) * (1 - dec) * 100) / 100)}$<br>Or directly: $100\\left(1 - \\frac{${p * p}}{10000}\\right) = ${tok(Math.round(netFactor * 100) / 100)}$`,
          ),
          step(
            "result",
            `Se paga el $${tok(value)}\\%$ del precio original: los dos cambios **no** se anulan.`,
            `You pay $${tok(value)}\\%$ of the original price: the two changes do **not** cancel out.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Algebraic notation: phrases → expressions (7-a top-up)            */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "found-alg-01",
      subject: "math",
      topicId: "foundations",
      subtopicId: "algebraic-notation",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 60,
      tags: ["translating", "expressions", "word-problems"],
      prerequisites: [],
    },
    (rng) => {
      // Hand-curated (k, m) for the phrase "k less than m times a number".
      const sets = [
        { k: 5, kEs: "cinco", kEn: "five", m: 2, mEs: "el doble de un número", mEn: "twice a number" },
        { k: 8, kEs: "ocho", kEn: "eight", m: 3, mEs: "el triple de un número", mEn: "three times a number" },
        { k: 10, kEs: "diez", kEn: "ten", m: 4, mEs: "cuatro veces un número", mEn: "four times a number" },
        { k: 7, kEs: "siete", kEn: "seven", m: 5, mEs: "cinco veces un número", mEn: "five times a number" },
        { k: 12, kEs: "doce", kEn: "twelve", m: 2, mEs: "el doble de un número", mEn: "twice a number" },
        { k: 9, kEs: "nueve", kEn: "nine", m: 6, mEs: "seis veces un número", mEn: "six times a number" },
        { k: 4, kEs: "cuatro", kEn: "four", m: 3, mEs: "el triple de un número", mEn: "three times a number" },
      ];
      const p = rng.pick(sets);
      const correct = `$${p.m}x - ${p.k}$`;
      const options: McOption[] = [
        { id: "a", text: L(correct, correct), correct: true },
        // order reversed: k − m·x
        { id: "b", text: L(`$${p.k} - ${p.m}x$`, `$${p.k} - ${p.m}x$`), correct: false },
        // "less than" wrongly applied before the multiplication
        { id: "c", text: L(`$${p.m}(x - ${p.k})$`, `$${p.m}(x - ${p.k})$`), correct: false },
        // subtraction turned into addition
        { id: "d", text: L(`$${p.m}x + ${p.k}$`, `$${p.m}x + ${p.k}$`), correct: false },
      ];
      return {
        skill: L("Traducir frases a expresiones algebraicas", "Translating phrases into algebraic expressions"),
        statement: L(
          `Traduce la frase **«${p.kEs} menos que ${p.mEs}»** a una expresión algebraica que use la variable $x$. ¿Cuál es la expresión correcta?`,
          `Translate the phrase **"${p.kEn} less than ${p.mEn}"** into an algebraic expression that uses the variable $x$. Which expression is correct?`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Traduce primero la parte que va **después** de «menos que»: es la cantidad de la que se va a restar.",
            "Translate first the part that comes **after** \"less than\": it is the quantity something will be subtracted from.",
          ),
          L(
            `«${p.mEs}» se escribe $${p.m}x$.`,
            `"${p.mEn}" is written $${p.m}x$.`,
          ),
          L(
            `«${p.kEs} menos que…» indica que a esa cantidad se le resta ${p.kEs}: el número va **al final**, no al principio.`,
            `"${p.kEn} less than…" means that ${p.kEn} is subtracted from that quantity: the number goes **at the end**, not at the beginning.`,
          ),
        ],
        answerDisplay: L(correct, correct),
        solution: [
          step(
            "given",
            `La frase «${p.kEs} menos que ${p.mEs}», con la variable $x$.`,
            `The phrase "${p.kEn} less than ${p.mEn}", with the variable $x$.`,
          ),
          step(
            "approach",
            "Traducimos por partes: primero la cantidad principal y después lo que se le resta. Ojo: «menos que» **invierte** el orden.",
            "We translate in pieces: first the main quantity and then what is subtracted from it. Careful: \"less than\" **reverses** the order.",
          ),
          step(
            "calculation",
            `«${p.mEs}» → $${p.m}x$<br>«${p.kEs} menos que…» → se resta $${p.k}$ al final<br>$${p.m}x - ${p.k}$`,
            `"${p.mEn}" → $${p.m}x$<br>"${p.kEn} less than…" → subtract $${p.k}$ at the end<br>$${p.m}x - ${p.k}$`,
          ),
          step(
            "result",
            `La expresión es $${p.m}x - ${p.k}$. El error clásico es escribir $${p.k} - ${p.m}x$, que invierte el orden de la resta.`,
            `The expression is $${p.m}x - ${p.k}$. The classic mistake is writing $${p.k} - ${p.m}x$, which reverses the order of the subtraction.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Simplifying expressions (7-a top-up)                              */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "found-simp-01",
      subject: "math",
      topicId: "foundations",
      subtopicId: "simplifying",
      difficulty: "easy",
      questionType: "expression",
      estimatedTimeSec: 75,
      tags: ["like-terms", "simplify"],
      prerequisites: [],
    },
    (rng) => {
      // Hand-curated sets with a > c, so the coefficient (a − c) is positive.
      const sets = [
        { a: 7, b: 4, c: 2, d: 5 },
        { a: 5, b: 3, c: 1, d: 6 },
        { a: 8, b: 2, c: 5, d: 3 },
        { a: 6, b: 7, c: 4, d: 2 },
        { a: 9, b: 2, c: 3, d: 4 },
        { a: 10, b: 3, c: 6, d: 1 },
        { a: 4, b: 8, c: 1, d: 5 },
      ];
      const p = rng.pick(sets);
      const coef = p.a - p.c;
      const num = p.b + p.d;
      return {
        skill: L("Simplificar combinando términos semejantes", "Simplifying by combining like terms"),
        statement: L(
          `Simplifica la expresión combinando términos semejantes: $${p.a}x + ${p.b} - ${p.c}x + ${p.d}$ (por ejemplo, escribe 3x+5 o 3*x+5).`,
          `Simplify the expression by combining like terms: $${p.a}x + ${p.b} - ${p.c}x + ${p.d}$ (for example, write 3x+5 or 3*x+5).`,
        ),
        answer: {
          kind: "expression",
          accepted: [`${coef}x + ${num}`, `${coef}*x + ${num}`],
          variables: ["x"],
        },
        hints: [
          L(
            "Dos términos solo se pueden combinar si tienen la **misma parte literal**: los términos con $x$ entre sí y los números entre sí.",
            "Two terms can only be combined if they share the **same variable part**: the $x$ terms with each other, and the numbers with each other.",
          ),
          L(
            `Cuida los signos: el término $-${p.c}x$ se resta y el término $+${p.d}$ se suma.`,
            `Watch the signs: the term $-${p.c}x$ is subtracted and the term $+${p.d}$ is added.`,
          ),
          L(
            "Resta los coeficientes de $x$ y suma los números: el resultado tiene la forma $Ax + B$ con $A$ y $B$ positivos.",
            "Subtract the coefficients of $x$ and add the numbers: the result has the form $Ax + B$ with $A$ and $B$ positive.",
          ),
        ],
        answerDisplay: L(`$${coef}x + ${num}$`, `$${coef}x + ${num}$`),
        solution: [
          step(
            "given",
            `$${p.a}x + ${p.b} - ${p.c}x + ${p.d}$`,
            `$${p.a}x + ${p.b} - ${p.c}x + ${p.d}$`,
          ),
          step(
            "approach",
            "Agrupamos los términos semejantes: por un lado los que llevan $x$ y por otro los números.",
            "Group the like terms: on one side the ones with $x$, on the other the plain numbers.",
          ),
          step(
            "calculation",
            `$(${p.a}x - ${p.c}x) + (${p.b} + ${p.d}) = ${coef}x + ${num}$`,
            `$(${p.a}x - ${p.c}x) + (${p.b} + ${p.d}) = ${coef}x + ${num}$`,
          ),
          step(
            "result",
            `$= ${coef}x + ${num}$`,
            `$= ${coef}x + ${num}$`,
          ),
        ],
      };
    },
  ),


  /* ---------------------------------------------------------------- */
  /* Curated Phase 2 — FOS/BOS 2010 HT, 1.3 (leyes de exponentes      */
  /* con exponentes negativos). Transcribed as printed; verified      */
  /* independently (identidad en 5 puntos). Fixed problem.             */
  /* ---------------------------------------------------------------- */

  template(
    {
      id: "found-pow-02",
      subject: "math",
      topicId: "foundations",
      subtopicId: "powers",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 180,
      tags: ["exponent-laws", "negative-exponents", "exam"],
      prerequisites: ["powers"],
      source: {
        sourceId: "fos-bos-2010-ht",
        license: "OPEN_LICENSE",
        exerciseNumber: "1.3",
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      return {
        skill: L("Potencias de productos con exponentes negativos (examen real)", "Powers of products with negative exponents (real exam)"),
        statement: L(
          "Simplifica todo lo posible (con $a, b \\ne 0$; escribe por ejemplo 1/(a^2*b^3) o a^-2*b^-3): $$\\left(a^2 b^{-5}\\right)^3 \\cdot \\left(b^3 a^{-2}\\right)^4$$",
          "Simplify as far as possible (with $a, b \\ne 0$; write e.g. 1/(a^2*b^3) or a^-2*b^-3): $$\\left(a^2 b^{-5}\\right)^3 \\cdot \\left(b^3 a^{-2}\\right)^4$$",
        ),
        answer: {
          kind: "expression",
          accepted: ["1/(a^2*b^3)", "1/(a^2b^3)", "a^-2*b^-3", "1/(a^2*b^3)"],
          variables: ["a", "b"],
        },
        hints: [
          L(
            "Potencia de un producto: cada factor se eleva por separado. Exponente negativo = recíproco.",
            "Power of a product: each factor is raised separately. A negative exponent means the reciprocal.",
          ),
          L(
            "$(a^2)^3 = a^6$, $(b^{-5})^3 = b^{-15}$, $(b^3)^4 = b^{12}$, $(a^{-2})^4 = a^{-8}$.",
            "$(a^2)^3 = a^6$, $(b^{-5})^3 = b^{-15}$, $(b^3)^4 = b^{12}$, $(a^{-2})^4 = a^{-8}$.",
          ),
          L(
            "Multiplicar es sumar exponentes de igual base: $a^{6 + (-8)}$ y $b^{-15 + 12}$.",
            "Multiplying adds exponents of the same base: $a^{6 + (-8)}$ and $b^{-15 + 12}$.",
          ),
        ],
        answerDisplay: L(
          "$a^{-2} b^{-3} = \\dfrac{1}{a^2 b^3}$",
          "$a^{-2} b^{-3} = \\dfrac{1}{a^2 b^3}$",
        ),
        solution: [
          step(
            "given",
            "El producto $\\left(a^2 b^{-5}\\right)^3 \\cdot \\left(b^3 a^{-2}\\right)^4$ con $a, b \\ne 0$ (por eso $a$ y $b$ pueden ir en denominadores).",
            "The product $\\left(a^2 b^{-5}\\right)^3 \\cdot \\left(b^3 a^{-2}\\right)^4$ with $a, b \\ne 0$ (so $a$ and $b$ may appear in denominators).",
          ),
          step(
            "approach",
            "Primero la potencia del producto (multiplicar exponentes), después el producto de potencias (sumar exponentes por base).",
            "First the power of the product (multiply exponents), then the product of powers (add exponents per base).",
          ),
          step(
            "calculation",
            "$\\left(a^2 b^{-5}\\right)^3 = a^6 b^{-15}$ y $\\left(b^3 a^{-2}\\right)^4 = b^{12} a^{-8}$.<br>Producto: $a^6 a^{-8} \\cdot b^{-15} b^{12} = a^{6-8} b^{-15+12} = a^{-2} b^{-3}$.<br>Con exponentes positivos: $a^{-2} b^{-3} = \\dfrac{1}{a^2 b^3}$.<br>Control numérico con $a = 2$, $b = 3$: original $= (4 \\cdot 3^{-5})^3 \\cdot (27 \\cdot \\frac{1}{4})^4$… más rápido: $\\frac{1}{4 \\cdot 27} = \\frac{1}{108}$ y comprobando con la calculadora ambos lados dan $\\approx 0.00926$ ✓",
            "$\\left(a^2 b^{-5}\\right)^3 = a^6 b^{-15}$ and $\\left(b^3 a^{-2}\\right)^4 = b^{12} a^{-8}$.<br>Product: $a^6 a^{-8} \\cdot b^{-15} b^{12} = a^{6-8} b^{-15+12} = a^{-2} b^{-3}$.<br>With positive exponents: $a^{-2} b^{-3} = \\dfrac{1}{a^2 b^3}$.<br>Numeric check at $a = 2$, $b = 3$: both sides evaluate to $\\frac{1}{4 \\cdot 27} = \\frac{1}{108} \\approx 0.00926$ ✓",
          ),
          step(
            "result",
            "$\\left(a^2 b^{-5}\\right)^3 \\cdot \\left(b^3 a^{-2}\\right)^4 = \\dfrac{1}{a^2 b^3}$ — dos leyes de exponentes y un cambio de signo global.",
            "$\\left(a^2 b^{-5}\\right)^3 \\cdot \\left(b^3 a^{-2}\\right)^4 = \\dfrac{1}{a^2 b^3}$ — two exponent laws and one global sign flip.",
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Curated — ESPOL Fundamentos (TUTOR_LICENSED, autorización del     */
  /* tutor 2026-10-01). Transcribed as printed; independently          */
  /* verified (/tmp/curated-espol/verify.py).                          */
  /* ---------------------------------------------------------------- */

  /* ESPOL p.212, autoevaluación 3.8, ex.2d: el 33% de 45 5/11. */
  template(
    {
      id: "found-pct-03",
      subject: "math",
      topicId: "foundations",
      subtopicId: "percentages",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 150,
      tags: ["percentages", "fractions", "exact-arithmetic"],
      prerequisites: ["percentages", "fractions"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3.8 · 2d",
        page: 212,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      void rng;
      return {
        skill: L(
          "Porcentaje exacto de un número mixto (libro ESPOL)",
          "Exact percentage of a mixed number (ESPOL book)",
        ),
        statement: L(
          "Calcula el $33\\%$ de $45\\tfrac{5}{11}$. (Ejercicio del libro de la ESPOL: el resultado es un número exacto — resuélvelo con fracciones, sin calculadora.)",
          "Compute $33\\%$ of $45\\tfrac{5}{11}$. (An exercise from the ESPOL book: the result is an exact number — work it out with fractions, no calculator.)",
        ),
        answer: { kind: "numeric", value: 15 },
        hints: [
          L(
            "Un porcentaje es una fracción con denominador $100$: «el $33\\%$ de $C$» significa $\\tfrac{33}{100} \\cdot C$.",
            "A percentage is a fraction with denominator $100$: '$33\\%$ of $C$' means $\\tfrac{33}{100} \\cdot C$.",
          ),
          L(
            "Convierte el número mixto a fracción impropia: $45\\tfrac{5}{11} = \\tfrac{45 \\cdot 11 + 5}{11} = \\tfrac{500}{11}$.",
            "Turn the mixed number into an improper fraction: $45\\tfrac{5}{11} = \\tfrac{45 \\cdot 11 + 5}{11} = \\tfrac{500}{11}$.",
          ),
          L(
            "Multiplica $\\tfrac{33}{100} \\cdot \\tfrac{500}{11}$ simplificando **antes** de multiplicar: tacha el $33$ con el $11$ y el $500$ con el $100$.",
            "Multiply $\\tfrac{33}{100} \\cdot \\tfrac{500}{11}$ by simplifying **before** multiplying: cross out the $33$ with the $11$ and the $500$ with the $100$.",
          ),
        ],
        answerDisplay: L("$15$", "$15$"),
        solution: [
          step(
            "given",
            "El libro pide el $33\\%$ de $45\\tfrac{5}{11}$: una fracción de denominador $100$ aplicada a un número mixto.",
            "The book asks for $33\\%$ of $45\\tfrac{5}{11}$: a fraction with denominator $100$ applied to a mixed number.",
          ),
          step(
            "approach",
            "Escribe el porcentaje como fracción, el número mixto como fracción impropia, y simplifica cruzado antes de multiplicar.",
            "Write the percentage as a fraction and the mixed number as an improper fraction, then cross-simplify before multiplying.",
          ),
          step(
            "calculation",
            "$33\\% \\text{ de } 45\\tfrac{5}{11} = \\tfrac{33}{100} \\cdot \\tfrac{500}{11} = \\tfrac{33}{11} \\cdot \\tfrac{500}{100} = 3 \\cdot 5 = 15$.",
            "$33\\% \\text{ of } 45\\tfrac{5}{11} = \\tfrac{33}{100} \\cdot \\tfrac{500}{11} = \\tfrac{33}{11} \\cdot \\tfrac{500}{100} = 3 \\cdot 5 = 15$.",
          ),
          step(
            "result",
            "El $33\\%$ de $45\\tfrac{5}{11}$ es exactamente $15$. La gracia del ejercicio: como $45\\tfrac{5}{11} = \\tfrac{500}{11}$, el $33$ se cancela con el $11$ y todo queda limpio.",
            "$33\\%$ of $45\\tfrac{5}{11}$ is exactly $15$. The point of the exercise: since $45\\tfrac{5}{11} = \\tfrac{500}{11}$, the $33$ cancels with the $11$ and everything comes out clean.",
          ),
        ],
      };
    },
  ),

  /* ESPOL p.213, ex.4a: 180 ejercicios en 3 días, con la prima. */
  template(
    {
      id: "found-prop-03",
      subject: "math",
      topicId: "foundations",
      subtopicId: "ratios-proportions",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 240,
      tags: ["rates", "proportionality", "word-problems"],
      prerequisites: ["ratios-proportions"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3.8 · 4a",
        page: 213,
      },
      reasoning: "modeling",
    },
    (rng) => {
      void rng;
      return {
        skill: L(
          "Planificar con tasas de trabajo (libro ESPOL)",
          "Planning with work rates (ESPOL book)",
        ),
        statement: L(
          "Un estudiante debe hacer $180$ ejercicios de matemáticas, relativamente sencillos, en $3$ días. Lo ayudará su prima, que tiene prácticamente las mismas destrezas que él. La última vez él hizo $60$ ejercicios y se demoró $2$ días, trabajando $2$ horas diarias. ¿Cuántas horas al día deberán trabajar **juntos** durante los $3$ días? (Ejercicio del libro de la ESPOL.)",
          "A student must complete $180$ fairly simple math exercises in $3$ days. His cousin will help him — she has practically the same math skills. Last time he did $60$ exercises and it took him $2$ days, working $2$ hours a day. How many hours a day must they work **together** during the $3$ days? (Exercise from the ESPOL book.)",
        ),
        answer: { kind: "numeric", value: 2 },
        hints: [
          L(
            "Con los datos de la última vez, calcula primero la velocidad de trabajo de **una** persona: ejercicios por hora.",
            "Using last time's data, first compute the work rate of **one** person: exercises per hour.",
          ),
          L(
            "Él hizo $60$ ejercicios en $2$ días de $2$ horas: $4$ horas en total. Su velocidad es $60 \\div 4$ ejercicios por hora.",
            "He did $60$ exercises in $2$ days of $2$ hours: $4$ hours in total. His rate is $60 \\div 4$ exercises per hour.",
          ),
          L(
            "Juntos trabajan al doble de velocidad. Divide los $180$ ejercicios entre la velocidad conjunta para obtener las horas totales, y reparte entre los $3$ días.",
            "Together they work at twice the rate. Divide the $180$ exercises by the joint rate to get the total hours, then split them over the $3$ days.",
          ),
        ],
        answerDisplay: L("$2$ horas al día", "$2$ hours a day"),
        solution: [
          step(
            "given",
            "Objetivo: $180$ ejercicios en $3$ días, dos personas con la misma destreza. Calibración: $60$ ejercicios le tomaron $2$ días a razón de $2$ horas diarias.",
            "Goal: $180$ exercises in $3$ days, two people with the same skill. Calibration: $60$ exercises took him $2$ days at $2$ hours a day.",
          ),
          step(
            "approach",
            "Proporcionalidad compuesta: primero la velocidad individual (ejercicios/hora), luego la conjunta, y al final el reparto diario.",
            "Compound proportionality: first the individual rate (exercises/hour), then the joint one, and finally the daily split.",
          ),
          step(
            "calculation",
            "Velocidad de uno: $\\tfrac{60 \\text{ ej}}{2 \\cdot 2 \\text{ h}} = 15$ ej/h. Juntos: $2 \\cdot 15 = 30$ ej/h. Horas totales: $\\tfrac{180}{30} = 6$ h. Repartidas en $3$ días: $\\tfrac{6}{3} = 2$ horas diarias.",
            "One person's rate: $\\tfrac{60 \\text{ ex}}{2 \\cdot 2 \\text{ h}} = 15$ ex/h. Together: $2 \\cdot 15 = 30$ ex/h. Total hours: $\\tfrac{180}{30} = 6$ h. Split over $3$ days: $\\tfrac{6}{3} = 2$ hours a day.",
          ),
          step(
            "result",
            "Deben trabajar $2$ horas al día cada uno: los mismos horarios que él ya manejaba solo, pero ahora acompañado — y el trabajo se hace igual en los $3$ días.",
            "They must each work $2$ hours a day: the same schedule he already handled alone, but now with company — and the work still fits in the $3$ days.",
          ),
        ],
      };
    },
  ),

  /* ESPOL p.213, ex.4b: ganancia del agricultor en términos de G. */
  template(
    {
      id: "found-prop-04",
      subject: "math",
      topicId: "foundations",
      subtopicId: "ratios-proportions",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["proportionality", "modeling", "word-problems"],
      prerequisites: ["ratios-proportions", "percentages"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3.8 · 4b",
        page: 213,
      },
      reasoning: "modeling",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L("$\\tfrac{5}{6}G$", "$\\tfrac{5}{6}G$"),
          correct: true,
        },
        {
          id: "b",
          text: L("$\\tfrac{3}{4}G$", "$\\tfrac{3}{4}G$"),
          correct: false,
        },
        {
          id: "c",
          text: L("$\\tfrac{9}{10}G$", "$\\tfrac{9}{10}G$"),
          correct: false,
        },
        {
          id: "d",
          text: L("$\\tfrac{1}{2}G$", "$\\tfrac{1}{2}G$"),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Modelo de proporcionalidad con áreas y densidades (libro ESPOL)",
          "Proportionality model with areas and densities (ESPOL book)",
        ),
        statement: L(
          "Un agricultor disponía de $12$ hectáreas para el cultivo de arroz que, sembrando a una densidad de $90$ kg de semilla por hectárea, le generaba una ganancia $G$. Hace poco cedió $3$ hectáreas del terreno a su hijo y aumentó la densidad a $100$ kg por hectárea. Suponiendo que la ganancia es proporcional a la cantidad de semilla sembrada, ¿cuál sería la ganancia (en términos de $G$) que teóricamente debería obtener? (Ejercicio del libro de la ESPOL.)",
          "A farmer had $12$ hectares for rice which, seeded at a density of $90$ kg of seed per hectare, produced a profit $G$. He recently gave $3$ hectares of the land to his son and raised the density to $100$ kg per hectare. Assuming profit is proportional to the amount of seed planted, what profit (in terms of $G$) should he theoretically obtain? (Exercise from the ESPOL book.)",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "¿De qué depende la ganancia en este modelo? Lo único que cambia entre los dos escenarios es la cantidad **total** de semilla sembrada.",
            "What does profit depend on in this model? The only thing changing between the two scenarios is the **total** amount of seed planted.",
          ),
          L(
            "Cantidad antigua: $12 \\cdot 90 = 1080$ kg. Cantidad nueva: el terreno bajó a $12 - 3$ hectáreas, con la nueva densidad.",
            "Old amount: $12 \\cdot 90 = 1080$ kg. New amount: the land dropped to $12 - 3$ hectares, with the new density.",
          ),
          L(
            "La ganancia nueva es $G$ por la razón entre kilos nuevos y antiguos. Simplifica $\\tfrac{900}{1080}$ lo más posible.",
            "The new profit is $G$ times the ratio of new to old kilos. Simplify $\\tfrac{900}{1080}$ as far as it goes.",
          ),
        ],
        answerDisplay: L(
          "$\\tfrac{5}{6}G$",
          "$\\tfrac{5}{6}G$",
        ),
        solution: [
          step(
            "given",
            "Antes: $12$ ha a $90$ kg/ha con ganancia $G$. Ahora: $12 - 3 = 9$ ha a $100$ kg/ha. Modelo: ganancia $\\propto$ kilos de semilla.",
            "Before: $12$ ha at $90$ kg/ha with profit $G$. Now: $12 - 3 = 9$ ha at $100$ kg/ha. Model: profit $\\propto$ kilos of seed.",
          ),
          step(
            "approach",
            "Calcular los kilos de cada escenario y tomar la razón nuevo/antiguo: esa fracción multiplica a $G$.",
            "Compute the kilos in each scenario and take the new/old ratio: that fraction multiplies $G$.",
          ),
          step(
            "calculation",
            "Antiguo: $12 \\cdot 90 = 1080$ kg. Nuevo: $9 \\cdot 100 = 900$ kg. Razón: $\\tfrac{900}{1080} = \\tfrac{90}{108} = \\tfrac{5}{6}$ (dividiendo por $180$).",
            "Old: $12 \\cdot 90 = 1080$ kg. New: $9 \\cdot 100 = 900$ kg. Ratio: $\\tfrac{900}{1080} = \\tfrac{90}{108} = \\tfrac{5}{6}$ (dividing by $180$).",
          ),
          step(
            "result",
            "La ganancia teórica es $\\tfrac{5}{6}G$: ceder $3$ hectáreas cuesta más de lo que la mayor densidad compensa — el modelo lo cuantifica en una sola fracción.",
            "The theoretical profit is $\\tfrac{5}{6}G$: giving up $3$ hectares costs more than the higher density compensates — the model quantifies it in a single fraction.",
          ),
        ],
      };
    },
  ),
];
