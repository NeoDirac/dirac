/**
 * MATH · Radicals & fractional exponents
 *
 * Simplifying radicals, operating with like radicals, rationalizing
 * denominators, radical equations (including one with an extraneous root)
 * and switching between radical and exponent notation. All radicands are
 * built from a perfect-power factor times a squarefree/cube-free part so
 * every simplification is exact.
 */

import { template, L, step } from "@/lib/problem";
import type { ProblemTemplate, McOption } from "@/lib/types";

export const templates: ProblemTemplate[] = [
  /* ---------------------------------------------------------------- */
  /* Simplifying                                                      */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "rad-simp-01",
      subject: "math",
      topicId: "radicals",
      subtopicId: "simplifying",
      difficulty: "easy",
      questionType: "expression",
      estimatedTimeSec: 90,
      tags: ["radicals", "square-roots"],
      prerequisites: ["polynomials"],
    },
    (rng) => {
      const k = rng.int(4, 12);
      const m = rng.pick([2, 3, 5, 6, 7]);
      const inner = k * k * m;
      return {
        skill: L("Extraer el cuadrado perfecto de una raíz", "Extracting the perfect square from a root"),
        statement: L(
          `Simplifica: $\\sqrt{${inner}}$ (escribe por ejemplo 10*sqrt(3)).`,
          `Simplify: $\\sqrt{${inner}}$ (write e.g. 10*sqrt(3)).`,
        ),
        answer: {
          kind: "expression",
          accepted: [`${k}*sqrt(${m})`],
          variables: [],
        },
        hints: [
          L(
            `Busca el mayor cuadrado perfecto que divida a $${inner}$.`,
            `Find the largest perfect square that divides $${inner}$.`,
          ),
          L(
            `$${k * k} = ${k}^2$ es un factor.`,
            `$${k * k} = ${k}^2$ is a factor.`,
          ),
          L(
            `Separa el radicando en $${k * k} \\cdot ${m}$ y saca la raíz del cuadrado.`,
            `Split the radicand into $${k * k} \\cdot ${m}$ and take the root of the square.`,
          ),
        ],
        answerDisplay: L(`$${k}\\sqrt{${m}}$`, `$${k}\\sqrt{${m}}$`),
        solution: [
          step("given", `$\\sqrt{${inner}}$`, `$\\sqrt{${inner}}$`),
          step(
            "approach",
            "Extraemos el mayor factor cuadrado perfecto del radicando.",
            "Extract the largest perfect-square factor from the radicand.",
          ),
          step(
            "calculation",
            `$\\sqrt{${inner}} = \\sqrt{${k * k} \\cdot ${m}} = \\sqrt{${k * k}} \\cdot \\sqrt{${m}} = ${k}\\sqrt{${m}}$`,
            `$\\sqrt{${inner}} = \\sqrt{${k * k} \\cdot ${m}} = \\sqrt{${k * k}} \\cdot \\sqrt{${m}} = ${k}\\sqrt{${m}}$`,
          ),
          step(
            "result",
            `$\\sqrt{${inner}} = ${k}\\sqrt{${m}}$`,
            `$\\sqrt{${inner}} = ${k}\\sqrt{${m}}$`,
          ),
        ],
      };
    },
  ),

  template(
    {
      id: "rad-simp-02",
      subject: "math",
      topicId: "radicals",
      subtopicId: "simplifying",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 130,
      tags: ["radicals", "cube-roots"],
      prerequisites: ["polynomials"],
    },
    (rng) => {
      const k = rng.int(2, 4);
      const m = rng.pick([2, 3, 4, 5, 6, 7, 9, 10]);
      const inner = k * k * k * m;
      return {
        skill: L("Simplificar raíces cúbicas", "Simplifying cube roots"),
        statement: L(
          `Simplifica: $\\sqrt[3]{${inner}}$ (escribe la raíz cúbica con exponentes: por ejemplo 2*5^(1/3) para $2\\sqrt[3]{5}$).`,
          `Simplify: $\\sqrt[3]{${inner}}$ (write the cube root with exponents: e.g. 2*5^(1/3) for $2\\sqrt[3]{5}$).`,
        ),
        answer: {
          kind: "expression",
          accepted: [`${k}*${m}^(1/3)`],
          variables: [],
        },
        hints: [
          L(
            `Busca el mayor cubo perfecto que divida a $${inner}$.`,
            `Find the largest perfect cube that divides $${inner}$.`,
          ),
          L(
            `$${k * k * k} = ${k}^3$ es un factor.`,
            `$${k * k * k} = ${k}^3$ is a factor.`,
          ),
          L(
            `Separa: $\\sqrt[3]{${inner}} = \\sqrt[3]{${k * k * k}} \\cdot \\sqrt[3]{${m}}$.`,
            `Split it: $\\sqrt[3]{${inner}} = \\sqrt[3]{${k * k * k}} \\cdot \\sqrt[3]{${m}}$.`,
          ),
        ],
        answerDisplay: L(`$${k}\\sqrt[3]{${m}}$`, `$${k}\\sqrt[3]{${m}}$`),
        solution: [
          step("given", `$\\sqrt[3]{${inner}}$`, `$\\sqrt[3]{${inner}}$`),
          step(
            "approach",
            "Extraemos el mayor factor cúbico perfecto: la raíz cúbica de un cubo perfecto sale fuera.",
            "Extract the largest perfect-cube factor: the cube root of a perfect cube comes out.",
          ),
          step(
            "calculation",
            `$\\sqrt[3]{${inner}} = \\sqrt[3]{${k * k * k} \\cdot ${m}} = \\sqrt[3]{${k * k * k}} \\cdot \\sqrt[3]{${m}} = ${k}\\sqrt[3]{${m}}$`,
            `$\\sqrt[3]{${inner}} = \\sqrt[3]{${k * k * k} \\cdot ${m}} = \\sqrt[3]{${k * k * k}} \\cdot \\sqrt[3]{${m}} = ${k}\\sqrt[3]{${m}}$`,
          ),
          step(
            "result",
            `$\\sqrt[3]{${inner}} = ${k}\\sqrt[3]{${m}}$, es decir, $${k} \\cdot ${m}^{1/3}$.`,
            `$\\sqrt[3]{${inner}} = ${k}\\sqrt[3]{${m}}$, that is, $${k} \\cdot ${m}^{1/3}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Operations                                                       */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "rad-op-01",
      subject: "math",
      topicId: "radicals",
      subtopicId: "operations",
      difficulty: "easy",
      questionType: "expression",
      estimatedTimeSec: 90,
      tags: ["radicals", "like-radicals"],
      prerequisites: ["polynomials"],
    },
    (rng) => {
      const a = rng.int(2, 9);
      const b = rng.int(2, 9);
      const m = rng.pick([2, 3, 5, 6, 7]);
      return {
        skill: L("Sumar radicales semejantes", "Adding like radicals"),
        statement: L(
          `Simplifica: $${a}\\sqrt{${m}} + ${b}\\sqrt{${m}}$ (escribe por ejemplo 11*sqrt(3)).`,
          `Simplify: $${a}\\sqrt{${m}} + ${b}\\sqrt{${m}}$ (write e.g. 11*sqrt(3)).`,
        ),
        answer: {
          kind: "expression",
          accepted: [`${a + b}*sqrt(${m})`],
          variables: [],
        },
        hints: [
          L(
            "Dos raíces con el **mismo radicando** son semejantes, como dos términos con la misma letra.",
            "Two roots with the **same radicand** are like terms, like two terms with the same letter.",
          ),
          L(
            "Trata $\\sqrt{" + `${m}}$ como si fuera una variable: suma los coeficientes.`,
            `Treat $\\sqrt{${m}}$ as if it were a variable: add the coefficients.`,
          ),
          L(
            `El coeficiente final es $${a} + ${b}$.`,
            `The final coefficient is $${a} + ${b}$.`,
          ),
        ],
        answerDisplay: L(`$${a + b}\\sqrt{${m}}$`, `$${a + b}\\sqrt{${m}}$`),
        solution: [
          step(
            "given",
            `$${a}\\sqrt{${m}} + ${b}\\sqrt{${m}}$`,
            `$${a}\\sqrt{${m}} + ${b}\\sqrt{${m}}$`,
          ),
          step(
            "approach",
            "Los radicales son semejantes: sumamos los coeficientes y conservamos el radicando.",
            "The radicals are like terms: add the coefficients and keep the radicand.",
          ),
          step(
            "calculation",
            `$${a}\\sqrt{${m}} + ${b}\\sqrt{${m}} = (${a} + ${b})\\sqrt{${m}}$`,
            `$${a}\\sqrt{${m}} + ${b}\\sqrt{${m}} = (${a} + ${b})\\sqrt{${m}}$`,
          ),
          step(
            "result",
            `$= ${a + b}\\sqrt{${m}}$`,
            `$= ${a + b}\\sqrt{${m}}$`,
          ),
        ],
      };
    },
  ),

  template(
    {
      id: "rad-op-02",
      subject: "math",
      topicId: "radicals",
      subtopicId: "operations",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 150,
      tags: ["radicals", "multiplication"],
      prerequisites: ["polynomials"],
    },
    (rng) => {
      const [m1, m2, k, sf] = rng.pick([
        [2, 6, 2, 3],
        [3, 6, 3, 2],
        [2, 3, 1, 6],
        [5, 10, 5, 2],
        [6, 10, 2, 15],
        [3, 15, 3, 5],
        [2, 10, 2, 5],
      ] as [number, number, number, number][]);
      const t = rng.int(1, 3);
      const u = rng.int(1, 3);
      const a = t * t * m1;
      const b = u * u * m2;
      const c = t * u * k;
      const acc = c === 1 ? `sqrt(${sf})` : `${c}*sqrt(${sf})`;
      return {
        skill: L("Multiplicar raíces y simplificar", "Multiplying roots and simplifying"),
        statement: L(
          `Simplifica: $\\sqrt{${a}} \\cdot \\sqrt{${b}}$ (escribe por ejemplo 6*sqrt(3)).`,
          `Simplify: $\\sqrt{${a}} \\cdot \\sqrt{${b}}$ (write e.g. 6*sqrt(3)).`,
        ),
        answer: {
          kind: "expression",
          accepted: [acc],
          variables: [],
        },
        hints: [
          L(
            "El producto de raíces es la raíz del producto: $\\sqrt{a} \\cdot \\sqrt{b} = \\sqrt{ab}$.",
            "The product of roots is the root of the product: $\\sqrt{a} \\cdot \\sqrt{b} = \\sqrt{ab}$.",
          ),
          L(
            `Multiplica los radicandos y busca el mayor cuadrado perfecto del resultado.`,
            `Multiply the radicands and look for the largest perfect square in the result.`,
          ),
          L(
            `Separa ese cuadrado perfecto y extrae su raíz.`,
            `Split off that perfect square and take its root.`,
          ),
        ],
        answerDisplay: L(
          c === 1 ? `$\\sqrt{${sf}}$` : `$${c}\\sqrt{${sf}}$`,
          c === 1 ? `$\\sqrt{${sf}}$` : `$${c}\\sqrt{${sf}}$`,
        ),
        solution: [
          step(
            "given",
            `$\\sqrt{${a}} \\cdot \\sqrt{${b}}$`,
            `$\\sqrt{${a}} \\cdot \\sqrt{${b}}$`,
          ),
          step(
            "approach",
            "Unimos los radicandos en una sola raíz y extraemos el mayor factor cuadrado.",
            "Join the radicands into a single root and extract the largest square factor.",
          ),
          step(
            "calculation",
            `$\\sqrt{${a}} \\cdot \\sqrt{${b}} = \\sqrt{${a * b}} = \\sqrt{${c * c} \\cdot ${sf}} = ${c === 1 ? "" : `${c}`}\\sqrt{${sf}}$`,
            `$\\sqrt{${a}} \\cdot \\sqrt{${b}} = \\sqrt{${a * b}} = \\sqrt{${c * c} \\cdot ${sf}} = ${c === 1 ? "" : `${c}`}\\sqrt{${sf}}$`,
          ),
          step(
            "result",
            c === 1 ? `$= \\sqrt{${sf}}$` : `$= ${c}\\sqrt{${sf}}$`,
            c === 1 ? `$= \\sqrt{${sf}}$` : `$= ${c}\\sqrt{${sf}}$`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Rationalizing                                                    */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "rad-rat-01",
      subject: "math",
      topicId: "radicals",
      subtopicId: "rationalizing",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 130,
      tags: ["rationalizing", "denominator"],
      prerequisites: ["polynomials"],
    },
    (rng) => {
      const a = rng.int(2, 9);
      const b = rng.pick([2, 3, 5, 6, 7]);
      const options: McOption[] = [
        {
          id: "a",
          text: L(`$\\frac{${a}\\sqrt{${b}}}{${b}}$`, `$\\frac{${a}\\sqrt{${b}}}{${b}}$`),
          correct: true,
        },
        {
          id: "b",
          text: L(`$\\frac{${a}\\sqrt{${b}}}{${b * b}}$`, `$\\frac{${a}\\sqrt{${b}}}{${b * b}}$`),
          correct: false,
        },
        {
          id: "c",
          text: L(`$\\frac{\\sqrt{${b}}}{${a}}$`, `$\\frac{\\sqrt{${b}}}{${a}}$`),
          correct: false,
        },
        {
          id: "d",
          text: L(`$${a}\\sqrt{${b}}$`, `$${a}\\sqrt{${b}}$`),
          correct: false,
        },
      ];
      return {
        skill: L("Racionalizar con raíz en el denominador", "Rationalizing a root in the denominator"),
        statement: L(
          `¿Cuál es $\\frac{${a}}{\\sqrt{${b}}}$ escrito con **denominador racional**?`,
          `Which is $\\frac{${a}}{\\sqrt{${b}}}$ written with a **rational denominator**?`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Multiplica numerador y denominador por la **misma** raíz que aparece abajo.",
            "Multiply numerator and denominator by the **same** root that appears below.",
          ),
          L(
            `Multiplica por $\\frac{\\sqrt{${b}}}{\\sqrt{${b}}} = 1$: el denominador se convierte en $${b}$.`,
            `Multiply by $\\frac{\\sqrt{${b}}}{\\sqrt{${b}}} = 1$: the denominator becomes $${b}$.`,
          ),
          L(
            "El numerador queda como el número original por esa raíz.",
            "The numerator becomes the original number times that root.",
          ),
        ],
        answerDisplay: L(
          `$\\frac{${a}}{\\sqrt{${b}}} = \\frac{${a}\\sqrt{${b}}}{${b}}$`,
          `$\\frac{${a}}{\\sqrt{${b}}} = \\frac{${a}\\sqrt{${b}}}{${b}}$`,
        ),
        solution: [
          step(
            "given",
            `$\\frac{${a}}{\\sqrt{${b}}}$`,
            `$\\frac{${a}}{\\sqrt{${b}}}$`,
          ),
          step(
            "approach",
            "Multiplicamos arriba y abajo por $\\sqrt{" + `${b}}$ para que el denominador sea racional.`,
            `Multiply top and bottom by $\\sqrt{${b}}$ so the denominator becomes rational.`,
          ),
          step(
            "calculation",
            `$\\frac{${a}}{\\sqrt{${b}}} \\cdot \\frac{\\sqrt{${b}}}{\\sqrt{${b}}} = \\frac{${a}\\sqrt{${b}}}{\\sqrt{${b}} \\cdot \\sqrt{${b}}} = \\frac{${a}\\sqrt{${b}}}{${b}}$`,
            `$\\frac{${a}}{\\sqrt{${b}}} \\cdot \\frac{\\sqrt{${b}}}{\\sqrt{${b}}} = \\frac{${a}\\sqrt{${b}}}{\\sqrt{${b}} \\cdot \\sqrt{${b}}} = \\frac{${a}\\sqrt{${b}}}{${b}}$`,
          ),
          step(
            "result",
            `La forma racionalizada es $\\frac{${a}\\sqrt{${b}}}{${b}}$.`,
            `The rationalized form is $\\frac{${a}\\sqrt{${b}}}{${b}}$.`,
          ),
        ],
      };
    },
  ),

  template(
    {
      id: "rad-rat-02",
      subject: "math",
      topicId: "radicals",
      subtopicId: "rationalizing",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 180,
      tags: ["rationalizing", "conjugate"],
      prerequisites: ["rationalizing"],
    },
    (rng) => {
      const c = rng.pick([2, 3, 5, 6, 7, 8]); // smaller root, not a perfect square
      let diff = rng.int(1, 8);
      let b = c + diff; // bigger root
      if (b === 4 || b === 9 || b === 16) {
        diff += 1;
        b = c + diff;
      }
      const a = rng.int(2, 9);
      return {
        skill: L("Racionalizar con el conjugado", "Rationalizing with the conjugate"),
        statement: L(
          `Para racionalizar $\\frac{${a}}{\\sqrt{${b}} + \\sqrt{${c}}}$ se multiplica arriba y abajo por el conjugado $\\sqrt{${b}} - \\sqrt{${c}}$. ¿Qué número queda como **denominador** al final?`,
          `To rationalize $\\frac{${a}}{\\sqrt{${b}} + \\sqrt{${c}}}$ we multiply top and bottom by the conjugate $\\sqrt{${b}} - \\sqrt{${c}}$. Which number ends up as the **denominator**?`,
        ),
        answer: { kind: "numeric", value: b - c },
        hints: [
          L(
            "El conjugado cambia el signo del medio: $\\sqrt{b} - \\sqrt{c}$.",
            "The conjugate flips the middle sign: $\\sqrt{b} - \\sqrt{c}$.",
          ),
          L(
            `En el denominador aparece $\\left(\\sqrt{${b}} + \\sqrt{${c}}\\right)\\left(\\sqrt{${b}} - \\sqrt{${c}}\\right)$: es suma por diferencia.`,
            `The denominator becomes $\\left(\\sqrt{${b}} + \\sqrt{${c}}\\right)\\left(\\sqrt{${b}} - \\sqrt{${c}}\\right)$: a sum-times-difference.`,
          ),
          L(
            `Aplica $(x + y)(x - y) = x^2 - y^2$ con $x = \\sqrt{${b}}$ e $y = \\sqrt{${c}}$.`,
            `Apply $(x + y)(x - y) = x^2 - y^2$ with $x = \\sqrt{${b}}$ and $y = \\sqrt{${c}}$.`,
          ),
        ],
        answerDisplay: L(`Denominador $= ${b - c}$`, `Denominator $= ${b - c}$`),
        solution: [
          step(
            "given",
            `$\\frac{${a}}{\\sqrt{${b}} + \\sqrt{${c}}} \\cdot \\frac{\\sqrt{${b}} - \\sqrt{${c}}}{\\sqrt{${b}} - \\sqrt{${c}}}$`,
            `$\\frac{${a}}{\\sqrt{${b}} + \\sqrt{${c}}} \\cdot \\frac{\\sqrt{${b}} - \\sqrt{${c}}}{\\sqrt{${b}} - \\sqrt{${c}}}$`,
          ),
          step(
            "approach",
            "El nuevo denominador es suma por diferencia: una diferencia de cuadrados que elimina las raíces.",
            "The new denominator is a sum-times-difference: a difference of squares that removes the roots.",
          ),
          step(
            "calculation",
            `$\\left(\\sqrt{${b}} + \\sqrt{${c}}\\right)\\left(\\sqrt{${b}} - \\sqrt{${c}}\\right) = \\left(\\sqrt{${b}}\\right)^2 - \\left(\\sqrt{${c}}\\right)^2 = ${b} - ${c} = ${b - c}$`,
            `$\\left(\\sqrt{${b}} + \\sqrt{${c}}\\right)\\left(\\sqrt{${b}} - \\sqrt{${c}}\\right) = \\left(\\sqrt{${b}}\\right)^2 - \\left(\\sqrt{${c}}\\right)^2 = ${b} - ${c} = ${b - c}$`,
          ),
          step(
            "result",
            `El denominador queda como el número racional $${b - c}$.`,
            `The denominator becomes the rational number $${b - c}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Radical equations                                                */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "rad-eq-01",
      subject: "math",
      topicId: "radicals",
      subtopicId: "equations",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 150,
      tags: ["radical-equations"],
      prerequisites: ["polynomials"],
    },
    (rng) => {
      const b = rng.int(2, 6);
      const a = rng.int(1, 9);
      const x = b * b - a;
      return {
        skill: L("Ecuación con la raíz despejada", "Equation with the root isolated"),
        statement: L(
          `Resuelve: $\\sqrt{x + ${a}} = ${b}$`,
          `Solve: $\\sqrt{x + ${a}} = ${b}$`,
        ),
        answer: { kind: "numeric", value: x },
        hints: [
          L(
            "La raíz ya está sola en un lado: deshazla elevando al cuadrado.",
            "The root is already alone on one side: undo it by squaring.",
          ),
          L(
            "Elevar al cuadrado es la operación inversa de la raíz cuadrada.",
            "Squaring is the inverse operation of the square root.",
          ),
          L(
            `Te queda $x + ${a} = ${b}^2$: termina despejando $x$.`,
            `You get $x + ${a} = ${b}^2$: finish by solving for $x$.`,
          ),
        ],
        answerDisplay: L(`$x = ${x}$`, `$x = ${x}$`),
        solution: [
          step(
            "given",
            `$\\sqrt{x + ${a}} = ${b}$`,
            `$\\sqrt{x + ${a}} = ${b}$`,
          ),
          step(
            "approach",
            "Elevamos ambos lados al cuadrado para eliminar la raíz y despejamos.",
            "Square both sides to remove the root and solve for $x$.",
          ),
          step(
            "calculation",
            `$\\left(\\sqrt{x + ${a}}\\right)^2 = ${b}^2$<br>$x + ${a} = ${b * b}$<br>$x = ${b * b} - ${a} = ${x}$`,
            `$\\left(\\sqrt{x + ${a}}\\right)^2 = ${b}^2$<br>$x + ${a} = ${b * b}$<br>$x = ${b * b} - ${a} = ${x}$`,
          ),
          step(
            "result",
            `$x = ${x}$. Comprobación: $\\sqrt{${x} + ${a}} = \\sqrt{${b * b}} = ${b}$ ✓`,
            `$x = ${x}$. Check: $\\sqrt{${x} + ${a}} = \\sqrt{${b * b}} = ${b}$ ✓`,
          ),
        ],
      };
    },
  ),

  template(
    {
      id: "rad-eq-02",
      subject: "math",
      topicId: "radicals",
      subtopicId: "equations",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 240,
      tags: ["radical-equations", "extraneous-root"],
      prerequisites: ["equations"],
    },
    (rng) => {
      const c = rng.int(1, 3);
      const d = rng.int(3, 6); // r − c
      const r = c + d; // the only valid solution
      const a = d * d - r; // ≥ 0 for our parameter ranges
      const extr = 2 * c + 1 - r; // extraneous root from squaring
      return {
        skill: L("Ecuación con raíz y solución falsa", "Radical equation with an extraneous root"),
        statement: L(
          `Resuelve $\\sqrt{x + ${a}} = x - ${c}$. Al elevar al cuadrado aparecen dos candidatos, pero solo uno cumple la ecuación original: ¿cuál es la solución válida?`,
          `Solve $\\sqrt{x + ${a}} = x - ${c}$. Squaring produces two candidates, but only one satisfies the original equation: which is the valid solution?`,
        ),
        answer: { kind: "numeric", value: r },
        hints: [
          L(
            "Eleva al cuadrado los dos lados para eliminar la raíz.",
            "Square both sides to remove the root.",
          ),
          L(
            "Obtendrás una ecuación cuadrática: resuélvela por factorización o con la fórmula.",
            "You will get a quadratic equation: solve it by factoring or with the formula.",
          ),
          L(
            "Comprueba **ambas** soluciones en la ecuación original: en una, el lado derecho sería negativo.",
            "Check **both** solutions in the original equation: for one of them the right-hand side would be negative.",
          ),
        ],
        answerDisplay: L(`$x = ${r}$`, `$x = ${r}$`),
        solution: [
          step(
            "given",
            `$\\sqrt{x + ${a}} = x - ${c}$ (se exige $x \\ge ${c}$).`,
            `$\\sqrt{x + ${a}} = x - ${c}$ (we need $x \\ge ${c}$).`,
          ),
          step(
            "approach",
            "Elevamos al cuadrado, resolvemos la cuadrática y comprobamos ambas raíces en la ecuación original.",
            "Square, solve the quadratic and check both roots in the original equation.",
          ),
          step(
            "calculation",
            `$x + ${a} = (x - ${c})^2 = x^2 ${-2 * c >= 0 ? "+" : "-"} ${Math.abs(2 * c)}x + ${c * c}$<br>$x^2 ${-(2 * c + 1) >= 0 ? "+" : "-"} ${2 * c + 1}x ${c * c - a >= 0 ? "+" : "-"} ${Math.abs(c * c - a)} = 0$<br>Las raíces de la cuadrática son $x = ${r}$ y $x = ${extr}$.<br>Para $x = ${extr}$: el lado derecho $${extr} - ${c} = ${extr - c} < 0$, imposible para una raíz. Para $x = ${r}$: $\\sqrt{${r} + ${a}} = \\sqrt{${d * d}} = ${d} = ${r} - ${c}$ ✓`,
            `$x + ${a} = (x - ${c})^2 = x^2 ${-2 * c >= 0 ? "+" : "-"} ${Math.abs(2 * c)}x + ${c * c}$<br>$x^2 ${-(2 * c + 1) >= 0 ? "+" : "-"} ${2 * c + 1}x ${c * c - a >= 0 ? "+" : "-"} ${Math.abs(c * c - a)} = 0$<br>The quadratic's roots are $x = ${r}$ and $x = ${extr}$.<br>For $x = ${extr}$: the right-hand side $${extr} - ${c} = ${extr - c} < 0$, impossible for a root. For $x = ${r}$: $\\sqrt{${r} + ${a}} = \\sqrt{${d * d}} = ${d} = ${r} - ${c}$ ✓`,
          ),
          step(
            "result",
            `La única solución válida es $x = ${r}$; $x = ${extr}$ es una solución falsa introducida al elevar al cuadrado.`,
            `The only valid solution is $x = ${r}$; $x = ${extr}$ is an extraneous root introduced by squaring.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Fractional exponents                                             */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "rad-fexp-01",
      subject: "math",
      topicId: "radicals",
      subtopicId: "fractional-exponents",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 100,
      tags: ["fractional-exponents", "evaluation"],
      prerequisites: ["polynomials"],
    },
    (rng) => {
      const [base, num, den, root, result] = rng.pick([
        [8, 2, 3, 2, 4],
        [27, 2, 3, 3, 9],
        [16, 3, 4, 2, 8],
        [25, 3, 2, 5, 125],
        [32, 4, 5, 2, 16],
        [9, 3, 2, 3, 27],
        [4, 3, 2, 2, 8],
        [125, 2, 3, 5, 25],
        [27, 4, 3, 3, 81],
        [16, 5, 4, 2, 32],
      ] as [number, number, number, number, number][]);
      return {
        skill: L("Evaluar potencias con exponente fraccionario", "Evaluating fractional exponents"),
        statement: L(
          `Calcula: $${base}^{\\frac{${num}}{${den}}}$`,
          `Evaluate: $${base}^{\\frac{${num}}{${den}}}$.`,
        ),
        answer: { kind: "numeric", value: result },
        hints: [
          L(
            "Un exponente fraccionario combina potencia y raíz: $a^{m/n} = \\left(\\sqrt[n]{a}\\right)^m$.",
            "A fractional exponent combines power and root: $a^{m/n} = \\left(\\sqrt[n]{a}\\right)^m$.",
          ),
          L(
            `Escribe la base como potencia exacta: $${base} = ${root}^{${den}}$.`,
            `Write the base as an exact power: $${base} = ${root}^{${den}}$.`,
          ),
          L(
            `Entonces la expresión es $\\left(${root}^{${den}}\\right)^{${num}/${den}}$: multiplica los exponentes.`,
            `Then the expression is $\\left(${root}^{${den}}\\right)^{${num}/${den}}$: multiply the exponents.`,
          ),
        ],
        answerDisplay: L(`$${result}$`, `$${result}$`),
        solution: [
          step(
            "given",
            `$${base}^{\\frac{${num}}{${den}}}$`,
            `$${base}^{\\frac{${num}}{${den}}}$`,
          ),
          step(
            "approach",
            `Expresamos la base como $${root}^{${den}}$ y aplicamos la regla $\\left(a^p\\right)^q = a^{pq}$.`,
            `We write the base as $${root}^{${den}}$ and apply $\\left(a^p\\right)^q = a^{pq}$.`,
          ),
          step(
            "calculation",
            `$${base}^{\\frac{${num}}{${den}}} = \\left(${root}^{${den}}\\right)^{\\frac{${num}}{${den}}} = ${root}^{${den} \\cdot \\frac{${num}}{${den}}} = ${root}^{${num}} = ${result}$`,
            `$${base}^{\\frac{${num}}{${den}}} = \\left(${root}^{${den}}\\right)^{\\frac{${num}}{${den}}} = ${root}^{${den} \\cdot \\frac{${num}}{${den}}} = ${root}^{${num}} = ${result}$`,
          ),
          step(
            "result",
            `$${base}^{\\frac{${num}}{${den}}} = ${result}$`,
            `$${base}^{\\frac{${num}}{${den}}} = ${result}$`,
          ),
        ],
      };
    },
  ),

  template(
    {
      id: "rad-fexp-02",
      subject: "math",
      topicId: "radicals",
      subtopicId: "fractional-exponents",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 130,
      tags: ["fractional-exponents", "exponent-laws"],
      prerequisites: ["polynomials"],
    },
    (rng) => {
      const [p1, q1, p2, q2] = rng.pick([
        [1, 2, 1, 3],
        [1, 2, 1, 4],
        [1, 3, 1, 6],
        [1, 4, 3, 4],
        [1, 2, 1, 6],
      ] as [number, number, number, number][]);
      // common denominator sum
      const qq = (q1 * q2) / gcd(q1, q2);
      const total = (p1 * qq) / q1 + (p2 * qq) / q2;
      const g = gcd(total, qq);
      const sn = total / g;
      const sd = qq / g;
      const acc = sn === sd ? "x" : `x^(${sn}/${sd})`;
      return {
        skill: L("Sumar exponentes fraccionarios", "Adding fractional exponents"),
        statement: L(
          `Simplifica y escribe como una sola potencia: $x^{\\frac{${p1}}{${q1}}} \\cdot x^{\\frac{${p2}}{${q2}}}$ (escribe por ejemplo x^(5/6)).`,
          `Simplify and write as a single power: $x^{\\frac{${p1}}{${q1}}} \\cdot x^{\\frac{${p2}}{${q2}}}$ (write e.g. x^(5/6)).`,
        ),
        answer: {
          kind: "expression",
          accepted: [acc],
          variables: ["x"],
        },
        hints: [
          L(
            "Es un producto de potencias con la **misma base**.",
            "It is a product of powers with the **same base**.",
          ),
          L(
            "Con la misma base se conservan la base y se **suman** los exponentes.",
            "With the same base, keep the base and **add** the exponents.",
          ),
          L(
            `Suma $\\frac{${p1}}{${q1}} + \\frac{${p2}}{${q2}}$ usando un denominador común.`,
            `Add $\\frac{${p1}}{${q1}} + \\frac{${p2}}{${q2}}$ using a common denominator.`,
          ),
        ],
        answerDisplay: L(
          sn === sd ? `$x$` : `$x^{\\frac{${sn}}{${sd}}}$`,
          sn === sd ? `$x$` : `$x^{\\frac{${sn}}{${sd}}}$`,
        ),
        solution: [
          step(
            "given",
            `$x^{\\frac{${p1}}{${q1}}} \\cdot x^{\\frac{${p2}}{${q2}}}$`,
            `$x^{\\frac{${p1}}{${q1}}} \\cdot x^{\\frac{${p2}}{${q2}}}$`,
          ),
          step(
            "approach",
            "Aplicamos $a^m \\cdot a^n = a^{m+n}$ y sumamos las fracciones.",
            "Apply $a^m \\cdot a^n = a^{m+n}$ and add the fractions.",
          ),
          step(
            "calculation",
            `$\\frac{${p1}}{${q1}} + \\frac{${p2}}{${q2}} = \\frac{${(p1 * qq) / q1}}{${qq}} + \\frac{${(p2 * qq) / q2}}{${qq}} = \\frac{${total}}{${qq}} = \\frac{${sn}}{${sd}}$`,
            `$\\frac{${p1}}{${q1}} + \\frac{${p2}}{${q2}} = \\frac{${(p1 * qq) / q1}}{${qq}} + \\frac{${(p2 * qq) / q2}}{${qq}} = \\frac{${total}}{${qq}} = \\frac{${sn}}{${sd}}$`,
          ),
          step(
            "result",
            sn === sd ? `$= x$` : `$= x^{\\frac{${sn}}{${sd}}}$`,
            sn === sd ? `$= x$` : `$= x^{\\frac{${sn}}{${sd}}}$`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Challenge: nested radical                                        */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "rad-chal-01",
      subject: "math",
      topicId: "radicals",
      subtopicId: "simplifying",
      difficulty: "challenge",
      questionType: "expression",
      estimatedTimeSec: 280,
      tags: ["nested-radicals", "denesting"],
      prerequisites: ["simplifying"],
    },
    (rng) => {
      const p = rng.pick([2, 3, 5, 6, 7, 10]);
      let q = rng.pick([2, 3, 5, 6, 7, 10]);
      if (q === p) q = p === 10 ? 7 : 10;
      return {
        skill: L("Desanidar un radical doble", "Denesting a nested radical"),
        statement: L(
          `Simplifica el radical anidado: $\\sqrt{${p + q} + ${2}\\sqrt{${p * q}}}$ (pista: es de la forma $\\sqrt{u} + \\sqrt{v}$; escríbelo por ejemplo como sqrt(2)+sqrt(3)).`,
          `Simplify the nested radical: $\\sqrt{${p + q} + ${2}\\sqrt{${p * q}}}$ (hint: it has the form $\\sqrt{u} + \\sqrt{v}$; write it e.g. as sqrt(2)+sqrt(3)).`,
        ),
        answer: {
          kind: "expression",
          accepted: [`sqrt(${p}) + sqrt(${q})`, `sqrt(${q}) + sqrt(${p})`],
          variables: [],
        },
        hints: [
          L(
            "Supón que el resultado es $\\sqrt{u} + \\sqrt{v}$ y eleva al cuadrado esa hipótesis.",
            "Guess the result is $\\sqrt{u} + \\sqrt{v}$ and square that hypothesis.",
          ),
          L(
            `$\\left(\\sqrt{u} + \\sqrt{v}\\right)^2 = u + v + 2\\sqrt{uv}$: compara con el radicando.`,
            `$\\left(\\sqrt{u} + \\sqrt{v}\\right)^2 = u + v + 2\\sqrt{uv}$: compare with the radicand.`,
          ),
          L(
            `Necesitas dos números que sumen $${p + q}$ y cuyo producto sea $${p * q}$.`,
            `You need two numbers adding up to $${p + q}$ whose product is $${p * q}$.`,
          ),
        ],
        answerDisplay: L(
          `$\\sqrt{${p + q} + 2\\sqrt{${p * q}}} = \\sqrt{${p}} + \\sqrt{${q}}$`,
          `$\\sqrt{${p + q} + 2\\sqrt{${p * q}}} = \\sqrt{${p}} + \\sqrt{${q}}$`,
        ),
        solution: [
          step(
            "given",
            `$\\sqrt{${p + q} + 2\\sqrt{${p * q}}}$`,
            `$\\sqrt{${p + q} + 2\\sqrt{${p * q}}}$`,
          ),
          step(
            "approach",
            "Buscamos $u$ y $v$ tales que $u + v$ sea la parte racional y $2\\sqrt{uv}$ sea la parte con raíz.",
            "We look for $u$ and $v$ such that $u + v$ is the rational part and $2\\sqrt{uv}$ is the root part.",
          ),
          step(
            "calculation",
            `$u + v = ${p + q}$ y $uv = ${p * q}$<br>Los números $${p}$ y $${q}$ cumplen ambas condiciones.<br>$\\left(\\sqrt{${p}} + \\sqrt{${q}}\\right)^2 = ${p} + ${q} + 2\\sqrt{${p * q}}$ ✓`,
            `$u + v = ${p + q}$ and $uv = ${p * q}$<br>The numbers $${p}$ and $${q}$ meet both conditions.<br>$\\left(\\sqrt{${p}} + \\sqrt{${q}}\\right)^2 = ${p} + ${q} + 2\\sqrt{${p * q}}$ ✓`,
          ),
          step(
            "result",
            `$\\sqrt{${p + q} + 2\\sqrt{${p * q}}} = \\sqrt{${p}} + \\sqrt{${q}}$`,
            `$\\sqrt{${p + q} + 2\\sqrt{${p * q}}} = \\sqrt{${p}} + \\sqrt{${q}}$`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Curated — ESPOL Fundamentos (TUTOR_LICENSED, autorización del     */
  /* tutor 2026-10-01), sección 3.7 Expresiones Algebraicas, p.205.    */
  /* ---------------------------------------------------------------- */

  /* ESPOL p.205, ex.2b: producto con conjugado irracional. */
  template(
    {
      id: "rad-simp-03",
      subject: "math",
      topicId: "radicals",
      subtopicId: "simplifying",
      difficulty: "hard",
      questionType: "expression",
      estimatedTimeSec: 300,
      tags: ["radicals", "conjugates", "simplification"],
      prerequisites: ["simplifying", "operations"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3.7 · 2b",
        page: 205,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      void rng;
      return {
        skill: L(
          "Simplificación con conjugados irracionales (libro ESPOL)",
          "Simplification with irrational conjugates (ESPOL book)",
        ),
        statement: L(
          "Otro paso de la tarea de Cálculo que hay que domar: $$\\left(\\frac{1}{x+\\sqrt{x^2+1}}\\right)\\left(1+\\frac{2x}{2\\sqrt{x^2+1}}\\right).$$ Simplifícala todo lo posible (escribe, por ejemplo, con la forma 2/(x+1)).",
          "Another step from the Calculus homework that needs taming: $$\\left(\\frac{1}{x+\\sqrt{x^2+1}}\\right)\\left(1+\\frac{2x}{2\\sqrt{x^2+1}}\\right).$$ Simplify it as far as possible (write it, e.g., in the form 2/(x+1)).",
        ),
        answer: {
          kind: "expression",
          accepted: ["1/sqrt(x^2+1)", "(x^2+1)^(-1/2)", "1/(x^2+1)^(1/2)"],
          variables: ["x"],
        },
        hints: [
          L(
            "Empieza por el segundo paréntesis: $\\frac{2x}{2\\sqrt{x^2+1}}$ se simplifica a $\\frac{x}{\\sqrt{x^2+1}}$.",
            "Start with the second parenthesis: $\\frac{2x}{2\\sqrt{x^2+1}}$ simplifies to $\\frac{x}{\\sqrt{x^2+1}}$.",
          ),
          L(
            "Dentro del paréntesis: $1 + \\frac{x}{\\sqrt{x^2+1}} = \\frac{\\sqrt{x^2+1}+x}{\\sqrt{x^2+1}}$ (denominador común $\\sqrt{x^2+1}$).",
            "Inside the parenthesis: $1 + \\frac{x}{\\sqrt{x^2+1}} = \\frac{\\sqrt{x^2+1}+x}{\\sqrt{x^2+1}}$ (common denominator $\\sqrt{x^2+1}$).",
          ),
          L(
            "Mira la estructura global: el numerador $\\sqrt{x^2+1}+x$ y el denominador $x+\\sqrt{x^2+1}$ del primer factor son **el mismo número**.",
            "Look at the overall structure: the numerator $\\sqrt{x^2+1}+x$ and the first factor's denominator $x+\\sqrt{x^2+1}$ are **the same number**.",
          ),
        ],
        answerDisplay: L(
          "$\\dfrac{1}{\\sqrt{x^2+1}}$",
          "$\\dfrac{1}{\\sqrt{x^2+1}}$",
        ),
        solution: [
          step(
            "given",
            "El producto $\\left(\\frac{1}{x+\\sqrt{x^2+1}}\\right)\\left(1+\\frac{2x}{2\\sqrt{x^2+1}}\\right)$ — un clásico al derivar $\\ln\\left(x+\\sqrt{x^2+1}\\right)$.",
            "The product $\\left(\\frac{1}{x+\\sqrt{x^2+1}}\\right)\\left(1+\\frac{2x}{2\\sqrt{x^2+1}}\\right)$ — a classic when differentiating $\\ln\\left(x+\\sqrt{x^2+1}\\right)$.",
          ),
          step(
            "approach",
            "Unificar el segundo paréntesis en una sola fracción y detectar el factor común con el denominador del primero.",
            "Unify the second parenthesis into a single fraction and spot the common factor with the first one's denominator.",
          ),
          step(
            "calculation",
            "$1+\\frac{2x}{2\\sqrt{x^2+1}} = 1+\\frac{x}{\\sqrt{x^2+1}} = \\frac{\\sqrt{x^2+1}+x}{\\sqrt{x^2+1}}$. El producto queda $$\\frac{\\sqrt{x^2+1}+x}{\\left(x+\\sqrt{x^2+1}\\right)\\sqrt{x^2+1}} = \\frac{1}{\\sqrt{x^2+1}}.$$<br>Control con $x = 3$: la original da $\\approx 0{,}3162$ y $\\frac{1}{\\sqrt{10}} \\approx 0{,}3162$ ✓",
            "$1+\\frac{2x}{2\\sqrt{x^2+1}} = 1+\\frac{x}{\\sqrt{x^2+1}} = \\frac{\\sqrt{x^2+1}+x}{\\sqrt{x^2+1}}$. The product becomes $$\\frac{\\sqrt{x^2+1}+x}{\\left(x+\\sqrt{x^2+1}\\right)\\sqrt{x^2+1}} = \\frac{1}{\\sqrt{x^2+1}}.$$<br>Check at $x = 3$: the original gives $\\approx 0.3162$ and $\\frac{1}{\\sqrt{10}} \\approx 0.3162$ ✓",
          ),
          step(
            "result",
            "$\\dfrac{1}{\\sqrt{x^2+1}}$ — de hecho es la derivada de $\\operatorname{arsinh}(x)$: el ejercicio del libro confirma que la derivación salió bien.",
            "$\\dfrac{1}{\\sqrt{x^2+1}}$ — in fact this is the derivative of $\\operatorname{arsinh}(x)$: the book's exercise confirms the differentiation came out right.",
          ),
        ],
      };
    },
  ),

  /* ESPOL p.205, ex.3: la expresión-monstruo con potencias de 7. */
  template(
    {
      id: "rad-fexp-03",
      subject: "math",
      topicId: "radicals",
      subtopicId: "fractional-exponents",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["fractional-exponents", "roots", "rational-expressions"],
      prerequisites: ["fractional-exponents", "simplifying"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3.7 · 3",
        page: 205,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L("$k = -\\tfrac{21}{10}$", "$k = -\\tfrac{21}{10}$"),
          correct: true,
        },
        {
          id: "b",
          text: L("$k = -\\tfrac{7}{10}$", "$k = -\\tfrac{7}{10}$"),
          correct: false,
        },
        {
          id: "c",
          text: L("$k = -\\tfrac{3}{2}$", "$k = -\\tfrac{3}{2}$"),
          correct: false,
        },
        {
          id: "d",
          text: L("$k = \\tfrac{21}{10}$", "$k = \\tfrac{21}{10}$"),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Exponentes fraccionarios y raíces encajadas (libro ESPOL)",
          "Fractional exponents and nested roots (ESPOL book)",
        ),
        statement: L(
          "Simplifica $$F = \\left[\\frac{1}{\\sqrt{343}}\\left(\\sqrt[5]{7^3}\\right)^{\\!\\frac{4}{3}}\\left(\\frac{(x-2)^2}{x^2+x-6} + \\frac{5x^2}{x^3+3x^2}\\right)\\right]^3$$ y responde: si $F = 7^{k}$, ¿cuánto vale $k$? (Ejercicio del libro de la ESPOL; el resultado es exacto.)",
          "Simplify $$F = \\left[\\frac{1}{\\sqrt{343}}\\left(\\sqrt[5]{7^3}\\right)^{\\!\\frac{4}{3}}\\left(\\frac{(x-2)^2}{x^2+x-6} + \\frac{5x^2}{x^3+3x^2}\\right)\\right]^3$$ and answer: if $F = 7^{k}$, what is $k$? (Exercise from the ESPOL book; the result is exact.)",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Son dos batallas separadas: las potencias de $7$ y la suma de fracciones en $x$. Empieza por las de $7$: como $343 = 7^3$, se tiene $\\frac{1}{\\sqrt{343}} = 7^{-3/2}$, y $\\left(\\sqrt[5]{7^3}\\right)^{4/3} = 7^{4/5}$.",
            "These are two separate battles: the powers of $7$ and the fraction sum in $x$. Start with the $7$'s: since $343 = 7^3$, we get $\\frac{1}{\\sqrt{343}} = 7^{-3/2}$, and $\\left(\\sqrt[5]{7^3}\\right)^{4/3} = 7^{4/5}$.",
          ),
          L(
            "Para la suma de fracciones: factoriza los denominadores, $x^2+x-6 = (x+3)(x-2)$ y $x^3+3x^2 = x^2(x+3)$, y simplifica cada fracción antes de sumar.",
            "For the fraction sum: factor the denominators, $x^2+x-6 = (x+3)(x-2)$ and $x^3+3x^2 = x^2(x+3)$, and simplify each fraction before adding.",
          ),
          L(
            "La suma de fracciones vale exactamente $1$ (compruébalo con $x=1$ si dudas). Dentro del corchete queda $7^{-3/2+4/5}$; al final, el exponente $3$ exterior multiplica al de adentro.",
            "The fraction sum is exactly $1$ (check with $x=1$ if in doubt). Inside the bracket you are left with $7^{-3/2+4/5}$; at the end, the outer exponent $3$ multiplies the inner one.",
          ),
        ],
        answerDisplay: L(
          "$k = -\\tfrac{21}{10}$, es decir $F = 7^{-21/10}$",
          "$k = -\\tfrac{21}{10}$, that is $F = 7^{-21/10}$",
        ),
        solution: [
          step(
            "given",
            "La expresión combina tres piezas: una potencia negativa de $7$ ($7^{-3/2}$), una positiva ($7^{4/5}$) y una suma de fracciones racionales en $x$ — todo elevado al cubo.",
            "The expression combines three pieces: a negative power of $7$ ($7^{-3/2}$), a positive one ($7^{4/5}$), and a sum of rational fractions in $x$ — all cubed.",
          ),
          step(
            "approach",
            "Cada pieza a forma exponencial; la suma se evalúa factorizando; los exponentes se suman dentro del corchete y el cubo exterior multiplica.",
            "Each piece into exponential form; the sum is evaluated by factoring; the exponents add inside the bracket and the outer cube multiplies.",
          ),
          step(
            "calculation",
            "Fracciones: $\\frac{(x-2)^2}{(x+3)(x-2)} + \\frac{5x^2}{x^2(x+3)} = \\frac{x-2}{x+3} + \\frac{5}{x+3} = \\frac{x+3}{x+3} = 1$ (para $x \\ne 0, 2, -3$).<br>Potencias: $\\left[7^{-3/2} \\cdot 7^{4/5} \\cdot 1\\right]^3 = \\left[7^{-15/10+8/10}\\right]^3 = \\left[7^{-7/10}\\right]^3 = 7^{-21/10}$.",
            "Fractions: $\\frac{(x-2)^2}{(x+3)(x-2)} + \\frac{5x^2}{x^2(x+3)} = \\frac{x-2}{x+3} + \\frac{5}{x+3} = \\frac{x+3}{x+3} = 1$ (for $x \\ne 0, 2, -3$).<br>Powers: $\\left[7^{-3/2} \\cdot 7^{4/5} \\cdot 1\\right]^3 = \\left[7^{-15/10+8/10}\\right]^3 = \\left[7^{-7/10}\\right]^3 = 7^{-21/10}$.",
          ),
          step(
            "result",
            "$F = 7^{-21/10}$, o sea $k = -\\tfrac{21}{10} = -2{,}1$. El truco del libro: la suma de fracciones que «complica» la expresión vale exactamente $1$.",
            "$F = 7^{-21/10}$, so $k = -\\tfrac{21}{10} = -2.1$. The book's trick: the fraction sum that 'complicates' the expression is exactly $1$.",
          ),
        ],
      };
    },
  ),
];

/** greatest common divisor */
function gcd(x: number, y: number): number {
  return y === 0 ? Math.abs(x) : gcd(y, x % y);
}
