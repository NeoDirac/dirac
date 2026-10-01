/**
 * MATH · Rational expressions & equations
 *
 * Simplifying, multiplying/dividing, adding/subtracting, rational equations,
 * domain restrictions and rational inequalities, plus a classic work-rate
 * challenge. All answers are computed from parameters; denominators are never
 * zero at the requested solution.
 */

import { template, L, step } from "@/lib/problem";
import type { ProblemTemplate, McOption } from "@/lib/types";

/* ---------- string helpers (LaTeX built from parameters) ---------- */

/** "+ 5" | "- 5" — joins a signed constant */
const op = (n: number): string => (n < 0 ? `- ${Math.abs(n)}` : `+ ${n}`);

/** LaTeX polynomial from coefficients + variable names, zeros skipped */
const poly = (cs: number[], vars: string[]): string => {
  const parts: string[] = [];
  cs.forEach((c, i) => {
    if (c === 0) return;
    const v = vars[i] ?? "";
    if (parts.length === 0) {
      parts.push(`${c < 0 ? "-" : ""}${Math.abs(c) === 1 && v ? "" : Math.abs(c)}${v}`);
    } else {
      parts.push(`${c < 0 ? "- " : "+ "}${Math.abs(c) === 1 && v ? "" : Math.abs(c)}${v}`);
    }
  });
  return parts.length ? parts.join(" ") : "0";
};

/** plain parser syntax ("8*x-2") for accepted expression answers */
const polyAcc = (cs: number[], vars: string[]): string => {
  const parts: string[] = [];
  cs.forEach((c, i) => {
    if (c === 0) return;
    const v = vars[i] ?? "";
    parts.push(v ? `${c}*${v}` : `${c}`);
  });
  return parts.length ? parts.join("+").replace(/\+-/g, "-") : "0";
};

/** "x + 3" from the constant c in the factor (x + c) — LaTeX & plain safe */
const xfac = (c: number): string => (c < 0 ? `x - ${-c}` : `x + ${c}`);

/** "x + 3" representing the factor (x − a), sign-aware (a ≠ 0) */
const minusFac = (a: number): string => `x ${a < 0 ? "+" : "-"} ${Math.abs(a)}`;

export const templates: ProblemTemplate[] = [
  /* ---------------------------------------------------------------- */
  /* Simplifying                                                      */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "rat-simp-01",
      subject: "math",
      topicId: "rational",
      subtopicId: "simplifying",
      difficulty: "easy",
      questionType: "expression",
      estimatedTimeSec: 90,
      tags: ["rational", "difference-of-squares", "cancelling"],
      prerequisites: ["polynomials"],
    },
    (rng) => {
      const a = rng.nonZeroInt(-6, 6);
      return {
        skill: L("Simplificar con diferencia de cuadrados", "Simplifying with a difference of squares"),
        statement: L(
          `Simplifica: $\\frac{x^2 - ${a * a}}{${xfac(a)}}$ (escribe por ejemplo x-3).`,
          `Simplify: $\\frac{x^2 - ${a * a}}{${xfac(a)}}$ (write e.g. x-3).`,
        ),
        answer: {
          kind: "expression",
          accepted: [`x - ${a}`],
          variables: ["x"],
        },
        hints: [
          L(
            "El numerador es una diferencia de cuadrados: factorízalo.",
            "The numerator is a difference of squares: factor it.",
          ),
          L(
            "$x^2 - k^2 = (x - k)(x + k)$.",
            "$x^2 - k^2 = (x - k)(x + k)$.",
          ),
          L(
            "Aparece un factor igual al denominador: puedes cancelarlo.",
            "A factor matching the denominator appears: you may cancel it.",
          ),
        ],
        answerDisplay: L(`$x - ${a}$`, `$x - ${a}$`),
        solution: [
          step(
            "given",
            `$\\frac{x^2 - ${a * a}}{${xfac(a)}}$`,
            `$\\frac{x^2 - ${a * a}}{${xfac(a)}}$`,
          ),
          step(
            "approach",
            "Factorizamos el numerador y cancelamos el factor común con el denominador.",
            "Factor the numerator and cancel the common factor with the denominator.",
          ),
          step(
            "calculation",
            `$\\frac{(x - ${a})(x + ${a})}{${xfac(a)}} = \\frac{\\cancel{(${xfac(a)})}(x - ${a})}{\\cancel{(${xfac(a)})}}$`,
            `$\\frac{(x - ${a})(x + ${a})}{${xfac(a)}} = \\frac{\\cancel{(${xfac(a)})}(x - ${a})}{\\cancel{(${xfac(a)})}}$`,
          ),
          step(
            "result",
            `La expresión simplificada es $x - ${a}$ (válida para $x \\ne ${-a}$).`,
            `The simplified expression is $x - ${a}$ (valid for $x \\ne ${-a}$).`,
          ),
        ],
      };
    },
  ),

  template(
    {
      id: "rat-simp-02",
      subject: "math",
      topicId: "rational",
      subtopicId: "simplifying",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 150,
      tags: ["rational", "trinomials", "cancelling"],
      prerequisites: ["polynomials"],
    },
    (rng) => {
      const d = rng.nonZeroInt(-6, 6);
      const e = rng.nonZeroInt(-6, 6);
      return {
        skill: L("Simplificar un cociente con trinomio", "Simplifying a quotient with a trinomial"),
        statement: L(
          `Simplifica: $\\frac{${poly([1, d + e, d * e], ["x^2", "x", ""])}}{${xfac(d)}}$ (escribe por ejemplo x-3).`,
          `Simplify: $\\frac{${poly([1, d + e, d * e], ["x^2", "x", ""])}}{${xfac(d)}}$ (write e.g. x-3).`,
        ),
        answer: {
          kind: "expression",
          accepted: [xfac(e)],
          variables: ["x"],
        },
        hints: [
          L(
            "Intenta factorizar el numerador como $(x + \\square)(x + \\triangle)$.",
            "Try to factor the numerator as $(x + \\square)(x + \\triangle)$.",
          ),
          L(
            `Busca dos números que sumen $${d + e}$ y multipliquen $${d * e}$.`,
            `Look for two numbers that add up to $${d + e}$ and multiply to $${d * e}$.`,
          ),
          L(
            "Uno de los factores coincide con el denominador: cancélalo.",
            "One of the factors matches the denominator: cancel it.",
          ),
        ],
        answerDisplay: L(`$${xfac(e)}$`, `$${xfac(e)}$`),
        solution: [
          step(
            "given",
            `$\\frac{${poly([1, d + e, d * e], ["x^2", "x", ""])}}{${xfac(d)}}$`,
            `$\\frac{${poly([1, d + e, d * e], ["x^2", "x", ""])}}{${xfac(d)}}$`,
          ),
          step(
            "approach",
            "Factorizamos el trinomio del numerador y cancelamos el factor que aparece en el denominador.",
            "Factor the trinomial in the numerator and cancel the factor that appears in the denominator.",
          ),
          step(
            "calculation",
            `$\\frac{(${xfac(d)})(${xfac(e)})}{${xfac(d)}} = \\frac{\\cancel{(${xfac(d)})}(${xfac(e)})}{\\cancel{(${xfac(d)})}}$`,
            `$\\frac{(${xfac(d)})(${xfac(e)})}{${xfac(d)}} = \\frac{\\cancel{(${xfac(d)})}(${xfac(e)})}{\\cancel{(${xfac(d)})}}$`,
          ),
          step(
            "result",
            `La expresión simplificada es $${xfac(e)}$ (válida para $x \\ne ${-d}$).`,
            `The simplified expression is $${xfac(e)}$ (valid for $x \\ne ${-d}$).`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Multiplication & division                                        */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "rat-mult-01",
      subject: "math",
      topicId: "rational",
      subtopicId: "mult-div",
      difficulty: "easy",
      questionType: "expression",
      estimatedTimeSec: 100,
      tags: ["rational", "multiplication"],
      prerequisites: ["polynomials"],
    },
    (rng) => {
      const a = rng.nonZeroInt(-5, 5);
      const b = rng.intExcluding(-5, 5, [0, a]);
      const c = rng.intExcluding(-5, 5, [0, a, b]);
      return {
        skill: L("Multiplicar expresiones racionales", "Multiplying rational expressions"),
        statement: L(
          `Simplifica el producto: $\\frac{${xfac(a)}}{${xfac(b)}} \\cdot \\frac{${xfac(b)}}{${xfac(c)}}$ (escribe por ejemplo (x+2)/(x-1)).`,
          `Simplify the product: $\\frac{${xfac(a)}}{${xfac(b)}} \\cdot \\frac{${xfac(b)}}{${xfac(c)}}$ (write e.g. (x+2)/(x-1)).`,
        ),
        answer: {
          kind: "expression",
          accepted: [`(${xfac(a)})/(${xfac(c)})`],
          variables: ["x"],
        },
        hints: [
          L(
            "En un producto, los numeradores se multiplican entre sí y los denominadores también.",
            "In a product, numerators multiply together and so do denominators.",
          ),
          L(
            `El factor $${xfac(b)}$ aparece arriba y abajo.`,
            `The factor $${xfac(b)}$ appears on top and at the bottom.`,
          ),
          L(
            "Cancela el factor común antes de multiplicar el resto.",
            "Cancel the common factor before multiplying what is left.",
          ),
        ],
        answerDisplay: L(`$\\frac{${xfac(a)}}{${xfac(c)}}$`, `$\\frac{${xfac(a)}}{${xfac(c)}}$`),
        solution: [
          step(
            "given",
            `$\\frac{${xfac(a)}}{${xfac(b)}} \\cdot \\frac{${xfac(b)}}{${xfac(c)}}$`,
            `$\\frac{${xfac(a)}}{${xfac(b)}} \\cdot \\frac{${xfac(b)}}{${xfac(c)}}$`,
          ),
          step(
            "approach",
            "Multiplicamos en línea recta y cancelamos los factores repetidos.",
            "Multiply straight across and cancel the repeated factors.",
          ),
          step(
            "calculation",
            `$\\frac{(${xfac(a)}) \\cdot \\cancel{(${xfac(b)})}}{\\cancel{(${xfac(b)})} \\cdot (${xfac(c)})}$`,
            `$\\frac{(${xfac(a)}) \\cdot \\cancel{(${xfac(b)})}}{\\cancel{(${xfac(b)})} \\cdot (${xfac(c)})}$`,
          ),
          step(
            "result",
            `$= \\frac{${xfac(a)}}{${xfac(c)}}$`,
            `$= \\frac{${xfac(a)}}{${xfac(c)}}$`,
          ),
        ],
      };
    },
  ),

  template(
    {
      id: "rat-div-01",
      subject: "math",
      topicId: "rational",
      subtopicId: "mult-div",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 150,
      tags: ["rational", "division", "reciprocal"],
      prerequisites: ["polynomials"],
    },
    (rng) => {
      const a = rng.nonZeroInt(-5, 5);
      const b = rng.intExcluding(-5, 5, [0, a, -a]);
      return {
        skill: L("Dividir expresiones racionales", "Dividing rational expressions"),
        statement: L(
          `Simplifica el cociente: $\\frac{x^2 - ${a * a}}{${xfac(b)}} \\div \\frac{${minusFac(a)}}{${xfac(b)}}$ (escribe por ejemplo x+3).`,
          `Simplify the quotient: $\\frac{x^2 - ${a * a}}{${xfac(b)}} \\div \\frac{${minusFac(a)}}{${xfac(b)}}$ (write e.g. x+3).`,
        ),
        answer: {
          kind: "expression",
          accepted: [xfac(a)],
          variables: ["x"],
        },
        hints: [
          L(
            "Dividir es multiplicar por el recíproco: invierte la segunda fracción.",
            "Dividing is multiplying by the reciprocal: flip the second fraction.",
          ),
          L(
            "Factoriza el numerador $x^2 - " + `${a * a}$ como diferencia de cuadrados.`,
            `Factor the numerator $x^2 - ${a * a}$ as a difference of squares.`,
          ),
          L(
            "Después de invertir, cancela los factores repetidos.",
            "After flipping, cancel the repeated factors.",
          ),
        ],
        answerDisplay: L(`$${xfac(a)}$`, `$${xfac(a)}$`),
        solution: [
          step(
            "given",
            `$\\frac{x^2 - ${a * a}}{${xfac(b)}} \\div \\frac{x - ${a}}{${xfac(b)}}$`,
            `$\\frac{x^2 - ${a * a}}{${xfac(b)}} \\div \\frac{x - ${a}}{${xfac(b)}}$`,
          ),
          step(
            "approach",
            "Convertimos la división en multiplicación por la fracción invertida y simplificamos.",
            "Turn the division into multiplication by the flipped fraction and simplify.",
          ),
          step(
            "calculation",
            `$\\frac{(${minusFac(a)})(${xfac(a)})}{${xfac(b)}} \\cdot \\frac{${xfac(b)}}{${minusFac(a)}}$<br>$= \\frac{\\cancel{(${minusFac(a)})}(${xfac(a)})}{\\cancel{(${xfac(b)})}} \\cdot \\frac{\\cancel{(${xfac(b)})}}{\\cancel{(${minusFac(a)})}}$`,
            `$\\frac{(${minusFac(a)})(${xfac(a)})}{${xfac(b)}} \\cdot \\frac{${xfac(b)}}{${minusFac(a)}}$<br>$= \\frac{\\cancel{(${minusFac(a)})}(${xfac(a)})}{\\cancel{(${xfac(b)})}} \\cdot \\frac{\\cancel{(${xfac(b)})}}{\\cancel{(${minusFac(a)})}}$`,
          ),
          step(
            "result",
            `$= ${xfac(a)}$`,
            `$= ${xfac(a)}$`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Addition & subtraction                                           */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "rat-add-01",
      subject: "math",
      topicId: "rational",
      subtopicId: "add-sub",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 150,
      tags: ["rational", "addition", "common-denominator"],
      prerequisites: ["polynomials"],
    },
    (rng) => {
      const a = rng.int(1, 5);
      const d = rng.int(1, 5);
      const b = rng.int(-6, 6);
      const e = rng.int(-6, 6);
      const c = rng.nonZeroInt(-5, 5);
      const numA = a + d;
      const numB = b + e;
      return {
        skill: L("Sumar con el mismo denominador", "Adding with the same denominator"),
        statement: L(
          `Suma y simplifica: $\\frac{${poly([a, b], ["x", ""])}}{${xfac(c)}} + \\frac{${poly([d, e], ["x", ""])}}{${xfac(c)}}$ (escribe por ejemplo (8*x-2)/(x-5)).`,
          `Add and simplify: $\\frac{${poly([a, b], ["x", ""])}}{${xfac(c)}} + \\frac{${poly([d, e], ["x", ""])}}{${xfac(c)}}$ (write e.g. (8*x-2)/(x-5)).`,
        ),
        answer: {
          kind: "expression",
          accepted: [`(${polyAcc([numA, numB], ["x", ""])})/(${xfac(c)})`],
          variables: ["x"],
        },
        hints: [
          L(
            "Los denominadores ya son iguales: no hace falta buscar uno común.",
            "The denominators are already equal: no common denominator is needed.",
          ),
          L(
            "Suma los numeradores término a término.",
            "Add the numerators term by term.",
          ),
          L(
            "Deja el resultado como una sola fracción.",
            "Leave the result as a single fraction.",
          ),
        ],
        answerDisplay: L(
          `$\\frac{${poly([numA, numB], ["x", ""])}}{${xfac(c)}}$`,
          `$\\frac{${poly([numA, numB], ["x", ""])}}{${xfac(c)}}$`,
        ),
        solution: [
          step(
            "given",
            `$\\frac{${poly([a, b], ["x", ""])}}{${xfac(c)}} + \\frac{${poly([d, e], ["x", ""])}}{${xfac(c)}}$`,
            `$\\frac{${poly([a, b], ["x", ""])}}{${xfac(c)}} + \\frac{${poly([d, e], ["x", ""])}}{${xfac(c)}}$`,
          ),
          step(
            "approach",
            "Con denominador común, sumamos los numeradores y conservamos el denominador.",
            "With a common denominator, we add the numerators and keep the denominator.",
          ),
          step(
            "calculation",
            `$\\frac{(${poly([a, b], ["x", ""])}) + (${poly([d, e], ["x", ""])})}{${xfac(c)}} = \\frac{${poly([numA, numB], ["x", ""])}}{${xfac(c)}}$`,
            `$\\frac{(${poly([a, b], ["x", ""])}) + (${poly([d, e], ["x", ""])})}{${xfac(c)}} = \\frac{${poly([numA, numB], ["x", ""])}}{${xfac(c)}}$`,
          ),
          step(
            "result",
            `$= \\frac{${poly([numA, numB], ["x", ""])}}{${xfac(c)}}$`,
            `$= \\frac{${poly([numA, numB], ["x", ""])}}{${xfac(c)}}$`,
          ),
        ],
      };
    },
  ),

  template(
    {
      id: "rat-add-02",
      subject: "math",
      topicId: "rational",
      subtopicId: "add-sub",
      difficulty: "hard",
      questionType: "expression",
      estimatedTimeSec: 210,
      tags: ["rational", "addition", "lcd"],
      prerequisites: ["polynomials"],
    },
    (rng) => {
      const a = rng.int(1, 5);
      const b = rng.int(1, 5);
      const c = rng.nonZeroInt(-5, 5);
      const nX = a + b;
      const n0 = a * c;
      return {
        skill: L("Sumar con denominadores distintos", "Adding with different denominators"),
        statement: L(
          `Suma y simplifica: $\\frac{${a}}{x} + \\frac{${b}}{${xfac(c)}}$ (escribe por ejemplo (7*x-6)/(x^2-6*x) o (7*x-6)/(x*(x-6))).`,
          `Add and simplify: $\\frac{${a}}{x} + \\frac{${b}}{${xfac(c)}}$ (write e.g. (7*x-6)/(x^2-6*x) or (7*x-6)/(x*(x-6))).`,
        ),
        answer: {
          kind: "expression",
          accepted: [
            `(${polyAcc([nX, n0], ["x", ""])})/(${polyAcc([1, c], ["x^2", "x"])})`,
            `(${polyAcc([nX, n0], ["x", ""])})/(x*(${xfac(c)}))`,
            `(${polyAcc([nX, n0], ["x", ""])})/(x(${xfac(c)}))`,
          ],
          variables: ["x"],
        },
        hints: [
          L(
            "Los denominadores son distintos: busca el mínimo común denominador.",
            "The denominators differ: find the least common denominator.",
          ),
          L(
            `El denominador común es el producto $x\\left(${xfac(c)}\\right)$.`,
            `The common denominator is the product $x\\left(${xfac(c)}\\right)$.`,
          ),
          L(
            `Amplifica cada fracción y suma los numeradores: $${a}\\left(${xfac(c)}\\right) + ${b}x$.`,
            `Scale each fraction and add the numerators: $${a}\\left(${xfac(c)}\\right) + ${b}x$.`,
          ),
        ],
        answerDisplay: L(
          `$\\frac{${poly([nX, n0], ["x", ""])}}{x\\left(${xfac(c)}\\right)}$`,
          `$\\frac{${poly([nX, n0], ["x", ""])}}{x\\left(${xfac(c)}\\right)}$`,
        ),
        solution: [
          step(
            "given",
            `$\\frac{${a}}{x} + \\frac{${b}}{${xfac(c)}}$`,
            `$\\frac{${a}}{x} + \\frac{${b}}{${xfac(c)}}$`,
          ),
          step(
            "approach",
            "Reducimos a común denominador $x(x + c)$, amplificando cada fracción por lo que le falta.",
            "We reduce to the common denominator $x(x + c)$, scaling each fraction by what it lacks.",
          ),
          step(
            "calculation",
            `$\\frac{${a}\\left(${xfac(c)}\\right)}{x\\left(${xfac(c)}\\right)} + \\frac{${b}x}{x\\left(${xfac(c)}\\right)}$<br>$= \\frac{${a}x ${op(a * c)} + ${b}x}{x\\left(${xfac(c)}\\right)} = \\frac{${poly([nX, n0], ["x", ""])}}{x\\left(${xfac(c)}\\right)}$`,
            `$\\frac{${a}\\left(${xfac(c)}\\right)}{x\\left(${xfac(c)}\\right)} + \\frac{${b}x}{x\\left(${xfac(c)}\\right)}$<br>$= \\frac{${a}x ${op(a * c)} + ${b}x}{x\\left(${xfac(c)}\\right)} = \\frac{${poly([nX, n0], ["x", ""])}}{x\\left(${xfac(c)}\\right)}$`,
          ),
          step(
            "result",
            `$= \\frac{${poly([nX, n0], ["x", ""])}}{x\\left(${xfac(c)}\\right)}$`,
            `$= \\frac{${poly([nX, n0], ["x", ""])}}{x\\left(${xfac(c)}\\right)}$`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Equations                                                        */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "rat-eq-01",
      subject: "math",
      topicId: "rational",
      subtopicId: "equations",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 180,
      tags: ["rational-equations", "cross-multiplication"],
      prerequisites: ["polynomials"],
    },
    (rng) => {
      const b = rng.nonZeroInt(-6, 6);
      const d = rng.intExcluding(-6, 6, [0, b]);
      const x0 = rng.intExcluding(-6, 6, [0, -b, -d]);
      const v = rng.pick([1, -1, 2, -2]);
      const a = v * (x0 + b);
      const c = v * (x0 + d);
      return {
        skill: L("Ecuación racional con productos cruzados", "Rational equation by cross-multiplying"),
        statement: L(
          `Resuelve: $\\frac{${a}}{${xfac(b)}} = \\frac{${c}}{${xfac(d)}}$`,
          `Solve: $\\frac{${a}}{${xfac(b)}} = \\frac{${c}}{${xfac(d)}}$`,
        ),
        answer: { kind: "numeric", value: x0 },
        hints: [
          L(
            "Con dos fracciones iguales, multiplica en cruz: $a \\cdot d = c \\cdot b$ (con los denominadores completos).",
            "With two equal fractions, cross-multiply: numerator times denominator on both sides.",
          ),
          L(
            "Obtendrás una ecuación lineal en $x$.",
            "You will get a linear equation in $x$.",
          ),
          L(
            `Comprueba al final que $x$ no anula ningún denominador ($x \\ne ${-b}$ y $x \\ne ${-d}$).`,
            `Check at the end that $x$ does not cancel any denominator ($x \\ne ${-b}$ and $x \\ne ${-d}$).`,
          ),
        ],
        answerDisplay: L(`$x = ${x0}$`, `$x = ${x0}$`),
        solution: [
          step(
            "given",
            `$\\frac{${a}}{${xfac(b)}} = \\frac{${c}}{${xfac(d)}}$, con $x \\ne ${-b}$ y $x \\ne ${-d}$.`,
            `$\\frac{${a}}{${xfac(b)}} = \\frac{${c}}{${xfac(d)}}$, with $x \\ne ${-b}$ and $x \\ne ${-d}$.`,
          ),
          step(
            "approach",
            "Multiplicamos en cruz para eliminar las fracciones y resolvemos la ecuación lineal.",
            "Cross-multiply to clear the fractions and solve the linear equation.",
          ),
          step(
            "calculation",
            `$${a}\\left(${xfac(d)}\\right) = ${c}\\left(${xfac(b)}\\right)$<br>$${a}x ${op(a * d)} = ${c}x ${op(c * b)}$<br>$${a - c}x = ${c * b - a * d}$<br>$x = ${x0}$`,
            `$${a}\\left(${xfac(d)}\\right) = ${c}\\left(${xfac(b)}\\right)$<br>$${a}x ${op(a * d)} = ${c}x ${op(c * b)}$<br>$${a - c}x = ${c * b - a * d}$<br>$x = ${x0}$`,
          ),
          step(
            "result",
            `$x = ${x0}$, y no coincide con ninguna restricción, así que es válida.`,
            `$x = ${x0}$, which matches none of the restrictions, so it is valid.`,
          ),
        ],
      };
    },
  ),

  template(
    {
      id: "rat-eq-02",
      subject: "math",
      topicId: "rational",
      subtopicId: "equations",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 210,
      tags: ["rational-equations", "extraneous"],
      prerequisites: ["equations"],
    },
    (rng) => {
      const q = rng.int(1, 5);
      const r = rng.pick([2, 3, -2, -3]);
      const x0 = rng.intExcluding(-6, 6, [0, q]);
      const p = x0 * (r - 1) - r * q;
      const numStr = p === 0 ? "x" : xfac(p);
      return {
        skill: L("Ecuación racional con binomios", "Rational equation with binomials"),
        statement: L(
          `Resuelve: $\\frac{${numStr}}{x - ${q}} = ${r}$ (recuerda que $x \\ne ${q}$).`,
          `Solve: $\\frac{${numStr}}{x - ${q}} = ${r}$ (remember $x \\ne ${q}$).`,
        ),
        answer: { kind: "numeric", value: x0 },
        hints: [
          L(
            "Multiplica ambos lados por el denominador para eliminar la fracción.",
            "Multiply both sides by the denominator to clear the fraction.",
          ),
          L(
            `Te queda una ecuación lineal: $${numStr} = ${r}(x - ${q})$.`,
            `You are left with a linear equation: $${numStr} = ${r}(x - ${q})$.`,
          ),
          L(
            "Desarrolla, agrupa las $x$ en un lado y despeja.",
            "Expand, gather the $x$ terms on one side and solve.",
          ),
        ],
        answerDisplay: L(`$x = ${x0}$`, `$x = ${x0}$`),
        solution: [
          step(
            "given",
            `$\\frac{${numStr}}{x - ${q}} = ${r}$, con $x \\ne ${q}$.`,
            `$\\frac{${numStr}}{x - ${q}} = ${r}$, with $x \\ne ${q}$.`,
          ),
          step(
            "approach",
            "Multiplicamos por el denominador y resolvemos la ecuación lineal que queda.",
            "Multiply by the denominator and solve the resulting linear equation.",
          ),
          step(
            "calculation",
            p === 0
              ? `$x = ${r}(x - ${q})$<br>$x = ${r}x ${op(-r * q)}$<br>$${1 - r}x = ${-r * q}$<br>$x = ${x0}$`
              : `$x ${op(p)} = ${r}x ${op(-r * q)}$<br>$x ${op(-r)}x = ${-r * q - p}$<br>$${1 - r}x = ${-r * q - p}$<br>$x = ${x0}$`,
            p === 0
              ? `$x = ${r}(x - ${q})$<br>$x = ${r}x ${op(-r * q)}$<br>$${1 - r}x = ${-r * q}$<br>$x = ${x0}$`
              : `$x ${op(p)} = ${r}x ${op(-r * q)}$<br>$x ${op(-r)}x = ${-r * q - p}$<br>$${1 - r}x = ${-r * q - p}$<br>$x = ${x0}$`,
          ),
          step(
            "result",
            `$x = ${x0} \\ne ${q}$, así que la solución es válida.`,
            `$x = ${x0} \\ne ${q}$, so the solution is valid.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Domain                                                           */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "rat-dom-01",
      subject: "math",
      topicId: "rational",
      subtopicId: "domain",
      difficulty: "easy",
      questionType: "text",
      estimatedTimeSec: 90,
      tags: ["domain", "restrictions"],
      prerequisites: ["polynomials"],
    },
    (rng) => {
      const a = rng.int(-5, 5);
      const b = rng.nonZeroInt(-6, 6);
      const numStr = a === 0 ? "x" : xfac(a);
      return {
        skill: L("Restricción del dominio de una fracción", "Domain restriction of a fraction"),
        statement: L(
          `¿Qué valor de $x$ hay que excluir del dominio de $f(x) = \\frac{${numStr}}{${xfac(-b)}}$? Escríbelo como x≠3 o x != 3.`,
          `Which value of $x$ must be excluded from the domain of $f(x) = \\frac{${numStr}}{${xfac(-b)}}$? Write it as x≠3 or x != 3.`,
        ),
        answer: {
          kind: "text",
          accepted: [
            `x≠${b}`,
            `x ≠ ${b}`,
            `x!=${b}`,
            `x != ${b}`,
            `${b}`,
          ],
        },
        hints: [
          L(
            "Una fracción solo está definida cuando su denominador no es cero.",
            "A fraction is only defined when its denominator is not zero.",
          ),
          L(
            `Plantea $${xfac(-b)} = 0$.`,
            `Set $${xfac(-b)} = 0$.`,
          ),
          L(
            "Despeja $x$: ese único valor es la restricción.",
            "Solve for $x$: that single value is the restriction.",
          ),
        ],
        answerDisplay: L(`$x \\ne ${b}$`, `$x \\ne ${b}$`),
        solution: [
          step(
            "given",
            `$f(x) = \\frac{${numStr}}{${xfac(-b)}}$`,
            `$f(x) = \\frac{${numStr}}{${xfac(-b)}}$`,
          ),
          step(
            "approach",
            "El dominio excluye los ceros del denominador.",
            "The domain excludes the zeros of the denominator.",
          ),
          step(
            "calculation",
            `$${xfac(-b)} = 0 \\Rightarrow x = ${b}$`,
            `$${xfac(-b)} = 0 \\Rightarrow x = ${b}$`,
          ),
          step(
            "result",
            `Hay que excluir $x = ${b}$: el dominio es todo número real salvo $${b}$.`,
            `We must exclude $x = ${b}$: the domain is every real number except $${b}$.`,
          ),
        ],
      };
    },
  ),

  template(
    {
      id: "rat-dom-02",
      subject: "math",
      topicId: "rational",
      subtopicId: "domain",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["domain", "restrictions"],
      prerequisites: ["polynomials"],
    },
    (rng) => {
      const a = rng.nonZeroInt(-5, 5);
      const b = rng.intExcluding(-5, 5, [0, a]);
      const c = rng.intExcluding(-5, 5, [0, a, b]);
      const p = rng.int(-4, 4);
      const d = rng.intExcluding(-5, 5, [a, b, c]);
      const options: McOption[] = [
        { id: "a", text: L(`$x = ${a}$`, `$x = ${a}$`), correct: false },
        { id: "b", text: L(`$x = ${b}$`, `$x = ${b}$`), correct: false },
        { id: "c", text: L(`$x = ${c}$`, `$x = ${c}$`), correct: false },
        { id: "d", text: L(`$x = ${d}$`, `$x = ${d}$`), correct: true },
      ];
      return {
        skill: L("Valores permitidos en el dominio", "Allowed values in the domain"),
        statement: L(
          `¿Cuál de estos valores **sí** pertenece al dominio de $f(x) = \\frac{${p === 0 ? "x" : xfac(p)}}{(${xfac(-a)})(${xfac(-b)})(${xfac(-c)})}$?`,
          `Which of these values **does** belong to the domain of $f(x) = \\frac{${p === 0 ? "x" : xfac(p)}}{(${xfac(-a)})(${xfac(-b)})(${xfac(-c)})}$?`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El dominio excluye los valores que anulan algún factor del denominador.",
            "The domain excludes the values that make any denominator factor zero.",
          ),
          L(
            `Anula cada factor: $${xfac(-a)}$, $${xfac(-b)}$ y $${xfac(-c)}$.`,
            `Set each factor to zero: $${xfac(-a)}$, $${xfac(-b)}$ and $${xfac(-c)}$.`,
          ),
          L(
            "El valor buscado es el que **no** coincide con ninguno de esos tres.",
            "The sought value is the one that matches **none** of those three.",
          ),
        ],
        answerDisplay: L(
          `Solo $x = ${d}$ (se excluyen $${a}$, $${b}$ y $${c}$)`,
          `Only $x = ${d}$ ($${a}$, $${b}$ and $${c}$ are excluded)`,
        ),
        solution: [
          step(
            "given",
            `$f(x) = \\frac{${p === 0 ? "x" : xfac(p)}}{(${xfac(-a)})(${xfac(-b)})(${xfac(-c)})}$`,
            `$f(x) = \\frac{${p === 0 ? "x" : xfac(p)}}{(${xfac(-a)})(${xfac(-b)})(${xfac(-c)})}$`,
          ),
          step(
            "approach",
            "Buscamos los ceros de cada factor del denominador: son los valores excluidos.",
            "We find the zero of each denominator factor: those are the excluded values.",
          ),
          step(
            "calculation",
            `$${xfac(-a)} = 0 \\Rightarrow x = ${a}$<br>$${xfac(-b)} = 0 \\Rightarrow x = ${b}$<br>$${xfac(-c)} = 0 \\Rightarrow x = ${c}$`,
            `$${xfac(-a)} = 0 \\Rightarrow x = ${a}$<br>$${xfac(-b)} = 0 \\Rightarrow x = ${b}$<br>$${xfac(-c)} = 0 \\Rightarrow x = ${c}$`,
          ),
          step(
            "result",
            `Los valores excluidos son $${a}$, $${b}$ y $${c}$; de la lista, solo $x = ${d}$ está en el dominio.`,
            `The excluded values are $${a}$, $${b}$ and $${c}$; from the list, only $x = ${d}$ is in the domain.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Inequalities                                                     */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "rat-ineq-01",
      subject: "math",
      topicId: "rational",
      subtopicId: "inequalities",
      difficulty: "hard",
      questionType: "text",
      estimatedTimeSec: 240,
      tags: ["rational-inequalities", "sign-analysis"],
      prerequisites: ["equations"],
    },
    (rng) => {
      const a = rng.int(1, 5); // zero of the numerator
      const b = rng.int(1, 5); // zero of the denominator at x = -b
      return {
        skill: L("Desigualdad racional con análisis de signos", "Rational inequality with sign analysis"),
        statement: L(
          `Resuelve $\\frac{x - ${a}}{x + ${b}} > 0$ y escribe la solución en notación de intervalos, por ejemplo (-inf, -2) u (3, inf).`,
          `Solve $\\frac{x - ${a}}{x + ${b}} > 0$ and write the solution in interval notation, e.g. (-inf, -2) u (3, inf).`,
        ),
        answer: {
          kind: "text",
          accepted: [
            `(-inf, ${-b}) u (${a}, inf)`,
            `(-inf,${-b})u(${a},inf)`,
            `(-inf, ${-b})u(${a}, inf)`,
            `(-inf,${-b}) u (${a},inf)`,
            `(-∞, ${-b}) u (${a}, ∞)`,
            `(-∞,${-b})u(${a},∞)`,
            `(-∞, ${-b})u(${a}, ∞)`,
            `(-∞,${-b}) u (${a},∞)`,
            `x<${-b} or x>${a}`,
            `x<${-b} o x>${a}`,
            `x < ${-b} or x > ${a}`,
            `x < ${-b} o x > ${a}`,
          ],
        },
        hints: [
          L(
            "El cociente es positivo cuando numerador y denominador tienen el **mismo** signo.",
            "The quotient is positive when numerator and denominator have the **same** sign.",
          ),
          L(
            `Los puntos críticos son $x = ${a}$ (cero del numerador) y $x = ${-b}$ (cero del denominador): dividen la recta en tres regiones.`,
            `The critical points are $x = ${a}$ (numerator zero) and $x = ${-b}$ (denominator zero): they split the line into three regions.`,
          ),
          L(
            "Prueba un valor de cada región; en el borde $x = -b$ la expresión ni siquiera existe.",
            "Test one value from each region; at $x = -b$ the expression does not even exist.",
          ),
        ],
        answerDisplay: L(
          `$x < ${-b}$ o $x > ${a}$, es decir, $(-\\infty, ${-b}) \\cup (${a}, \\infty)$`,
          `$x < ${-b}$ or $x > ${a}$, i.e. $(-\\infty, ${-b}) \\cup (${a}, \\infty)$`,
        ),
        solution: [
          step(
            "given",
            `$\\frac{x - ${a}}{x + ${b}} > 0$, críticos: $x = ${a}$ y $x = ${-b}$.`,
            `$\\frac{x - ${a}}{x + ${b}} > 0$, critical points: $x = ${a}$ and $x = ${-b}$.`,
          ),
          step(
            "approach",
            "Hacemos una tabla de signos en las tres regiones que determinan los puntos críticos.",
            "We make a sign table on the three regions determined by the critical points.",
          ),
          step(
            "calculation",
            `Si $x < ${-b}$: $(x - ${a}) < 0$ y $(x + ${b}) < 0$ ⇒ cociente positivo.<br>Si $${-b} < x < ${a}$: signos opuestos ⇒ cociente negativo.<br>Si $x > ${a}$: ambos positivos ⇒ cociente positivo.<br>En $x = ${a}$ vale $0$ y en $x = ${-b}$ no existe: ninguno sirve.`,
            `If $x < ${-b}$: $(x - ${a}) < 0$ and $(x + ${b}) < 0$ ⇒ quotient positive.<br>If $${-b} < x < ${a}$: opposite signs ⇒ quotient negative.<br>If $x > ${a}$: both positive ⇒ quotient positive.<br>At $x = ${a}$ it equals $0$ and at $x = ${-b}$ it does not exist: neither works.`,
          ),
          step(
            "result",
            `La solución es $(-\\infty, ${-b}) \\cup (${a}, \\infty)$.`,
            `The solution is $(-\\infty, ${-b}) \\cup (${a}, \\infty)$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Challenge: work-rate problem                                     */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "rat-chal-01",
      subject: "math",
      topicId: "rational",
      subtopicId: "equations",
      difficulty: "challenge",
      questionType: "numeric",
      estimatedTimeSec: 300,
      tags: ["work-rate", "word-problems", "rational"],
      prerequisites: ["equations"],
    },
    (rng) => {
      const [ta, tb, t] = rng.pick([
        [3, 6, 2],
        [6, 3, 2],
        [4, 12, 3],
        [6, 12, 4],
        [10, 15, 6],
        [5, 20, 4],
      ] as [number, number, number][]);
      return {
        skill: L("Ritmos de trabajo combinados", "Combined work rates"),
        statement: L(
          `Ana pintaría una habitación sola en $${ta}$ horas y Beto en $${tb}$ horas. Si trabajan juntos desde el principio, ¿en cuántas horas terminan?`,
          `Ana could paint a room alone in $${ta}$ hours and Beto in $${tb}$ hours. If they work together from the start, in how many hours do they finish?`,
        ),
        answer: {
          kind: "numeric",
          value: t,
          tolerance: { mode: "relative", value: 0.02 },
        },
        hints: [
          L(
            "Piensa en la **fracción de habitación** que cada uno pinta por hora, no en las horas.",
            "Think of the **fraction of the room** each one paints per hour, not the hours.",
          ),
          L(
            `Ana pinta $\\frac{1}{${ta}}$ por hora y Beto $\\frac{1}{${tb}}$ por hora: súmalas.`,
            `Ana paints $\\frac{1}{${ta}}$ per hour and Beto $\\frac{1}{${tb}}$ per hour: add them.`,
          ),
          L(
            "El tiempo total es la inversa de la tasa conjunta: $t = \\frac{1}{\\text{tasa}}$.",
            "The total time is the reciprocal of the combined rate: $t = \\frac{1}{\\text{rate}}$.",
          ),
        ],
        answerDisplay: L(`$${t}$ horas`, `$${t}$ hours`),
        solution: [
          step(
            "given",
            `Ana: $${ta}$ h por habitación. Beto: $${tb}$ h por habitación.`,
            `Ana: $${ta}$ h per room. Beto: $${tb}$ h per room.`,
          ),
          step(
            "approach",
            "Sumamos las tasas de trabajo (fracción por hora) y el tiempo conjunto es la inversa de la tasa total.",
            "We add the work rates (fraction per hour); the joint time is the reciprocal of the total rate.",
          ),
          step(
            "calculation",
            `$\\text{tasa} = \\frac{1}{${ta}} + \\frac{1}{${tb}} = \\frac{${tb} + ${ta}}{${ta * tb}} = \\frac{${ta + tb}}{${ta * tb}}$<br>$t = \\frac{${ta * tb}}{${ta + tb}} = ${t}$`,
            `$\\text{rate} = \\frac{1}{${ta}} + \\frac{1}{${tb}} = \\frac{${tb} + ${ta}}{${ta * tb}} = \\frac{${ta + tb}}{${ta * tb}}$<br>$t = \\frac{${ta * tb}}{${ta + tb}} = ${t}$`,
          ),
          step(
            "result",
            `Trabajando juntos terminan en $${t}$ horas.`,
            `Working together they finish in $${t}$ hours.`,
          ),
        ],
      };
    },
  ),


  /* ---------------------------------------------------------------- */
  /* Curated Phase 2 — FOS/BOS 2010 Haupttermin & FOS/BOS 2011,       */
  /* apartado 1.0 (Termumformungen). Transcribed as printed (2010     */
  /* es texto nativo; 2011 es escaneado, transcrito vía OCR y         */
  /* cotejado con el Lösungsvorschlag oficial). Verificación          */
  /* independiente en /tmp/curated-p2/verify.py. Problemas fijos.     */
  /* ---------------------------------------------------------------- */

  /* FOS/BOS 2010, 1.1 — simplificación con dominio. */
  template(
    {
      id: "rat-simp-03",
      subject: "math",
      topicId: "rational",
      subtopicId: "simplifying",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 240,
      tags: ["rational-expressions", "factoring", "domain"],
      prerequisites: ["simplifying"],
      source: {
        sourceId: "fos-bos-2010-ht",
        license: "OPEN_LICENSE",
        exerciseNumber: "1.1",
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      return {
        skill: L("Simplificar una fracción algebraica (examen real)", "Simplifying an algebraic fraction (real exam)"),
        statement: L(
          "Simplifica todo lo posible (dominio $x \\ne \\pm 2$; escribe una fracción, por ejemplo 2/(x+1)): $$\\frac{2x + 4}{8 - 2x^2}$$",
          "Simplify as far as possible (domain $x \\ne \\pm 2$; write a fraction, e.g. 2/(x+1)): $$\\frac{2x + 4}{8 - 2x^2}$$",
        ),
        answer: {
          kind: "expression",
          accepted: ["1/(2-x)", "-1/(x-2)", "1/(2 - x)"],
          variables: ["x"],
        },
        hints: [
          L(
            "Factoriza numerador y denominador por separado antes de tocar nada.",
            "Factor numerator and denominator separately before touching anything.",
          ),
          L(
            "$2x + 4 = 2(x + 2)$ y $8 - 2x^2 = 2\\left(4 - x^2\\right) = 2(2 - x)(2 + x)$.",
            "$2x + 4 = 2(x + 2)$ and $8 - 2x^2 = 2\\left(4 - x^2\\right) = 2(2 - x)(2 + x)$.",
          ),
          L(
            "Cancela el $2$ y el factor $(x + 2)$. Los valores $x = \\pm 2$ siguen **excluidos** aunque ya no aparezcan.",
            "Cancel the $2$ and the $(x + 2)$ factor. The values $x = \\pm 2$ stay **excluded** even though they no longer appear.",
          ),
        ],
        answerDisplay: L(
          "$\\dfrac{1}{2 - x}$ (equivalente a $-\\dfrac{1}{x-2}$)",
          "$\\dfrac{1}{2 - x}$ (equivalent to $-\\dfrac{1}{x-2}$)",
        ),
        solution: [
          step(
            "given",
            "La fracción $\\frac{2x+4}{8-2x^2}$ con dominio $x \\ne \\pm 2$ (el denominador se anula en $x = \\pm 2$).",
            "The fraction $\\frac{2x+4}{8-2x^2}$ with domain $x \\ne \\pm 2$ (the denominator vanishes at $x = \\pm 2$).",
          ),
          step(
            "approach",
            "Factorizar arriba y abajo, cancelar factores comunes y anotar el dominio que la expresión original impone.",
            "Factor top and bottom, cancel common factors, and record the domain the original expression imposes.",
          ),
          step(
            "calculation",
            "$\\dfrac{2x+4}{8-2x^2} = \\dfrac{2(x+2)}{2(2-x)(2+x)} = \\dfrac{2(x+2)}{2(2-x)(x+2)} = \\dfrac{1}{2-x}$.<br>El signo también se puede reorganizar: $\\dfrac{1}{2-x} = -\\dfrac{1}{x-2}$.<br>Control numérico con $x = 1$: $\\frac{6}{6} = 1$ y $\\frac{1}{2-1} = 1$ ✓",
            "$\\dfrac{2x+4}{8-2x^2} = \\dfrac{2(x+2)}{2(2-x)(2+x)} = \\dfrac{2(x+2)}{2(2-x)(x+2)} = \\dfrac{1}{2-x}$.<br>The sign can also be rearranged: $\\dfrac{1}{2-x} = -\\dfrac{1}{x-2}$.<br>Numeric check at $x = 1$: $\\frac{6}{6} = 1$ and $\\frac{1}{2-1} = 1$ ✓",
          ),
          step(
            "result",
            "$\\dfrac{2x+4}{8-2x^2} = \\dfrac{1}{2-x}$ para todo $x \\ne \\pm 2$: el dominio viaja con la expresión original, no con la simplificada.",
            "$\\dfrac{2x+4}{8-2x^2} = \\dfrac{1}{2-x}$ for all $x \\ne \\pm 2$: the domain travels with the original expression, not the simplified one.",
          ),
        ],
      };
    },
  ),

  /* FOS/BOS 2010, 1.2 — resta con denominadores parecidos. */
  template(
    {
      id: "rat-add-03",
      subject: "math",
      topicId: "rational",
      subtopicId: "add-sub",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 240,
      tags: ["rational-expressions", "lcd", "exam"],
      prerequisites: ["add-sub"],
      source: {
        sourceId: "fos-bos-2010-ht",
        license: "OPEN_LICENSE",
        exerciseNumber: "1.2",
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      return {
        skill: L("Resta de fracciones algebraicas (examen real)", "Subtracting algebraic fractions (real exam)"),
        statement: L(
          "Reúne en una sola fracción y simplifica (dominio $x \\ne -3,\\ 3$; escribe por ejemplo 4(x-6)/(x^2-9)): $$\\frac{6}{x + 3} - \\frac{4}{2x - 6}$$",
          "Combine into a single fraction and simplify (domain $x \\ne -3,\\ 3$; write e.g. 4(x-6)/(x^2-9)): $$\\frac{6}{x + 3} - \\frac{4}{2x - 6}$$",
        ),
        answer: {
          kind: "expression",
          accepted: ["(4x - 24)/(x^2 - 9)", "4(x - 6)/(x^2 - 9)", "(4x-24)/(x^2-9)", "4(x-6)/((x+3)(x-3))"],
          variables: ["x"],
        },
        hints: [
          L(
            "Simplifica el segundo denominador primero: $2x - 6 = 2(x - 3)$.",
            "Simplify the second denominator first: $2x - 6 = 2(x - 3)$.",
          ),
          L(
            "Con $\\frac{4}{2(x-3)} = \\frac{2}{x-3}$, el común denominador es $(x + 3)(x - 3)$.",
            "With $\\frac{4}{2(x-3)} = \\frac{2}{x-3}$, the common denominator is $(x + 3)(x - 3)$.",
          ),
          L(
            "Numerador combinado: $6(x - 3) - 2(x + 3)$. Desarrolla con cuidado los dos productos.",
            "Combined numerator: $6(x - 3) - 2(x + 3)$. Expand both products carefully.",
          ),
        ],
        answerDisplay: L(
          "$\\dfrac{4x - 24}{x^2 - 9} = \\dfrac{4(x-6)}{(x+3)(x-3)}$",
          "$\\dfrac{4x - 24}{x^2 - 9} = \\dfrac{4(x-6)}{(x+3)(x-3)}$",
        ),
        solution: [
          step(
            "given",
            "La resta $\\frac{6}{x+3} - \\frac{4}{2x-6}$ con dominio $x \\ne -3,\\ 3$.",
            "The subtraction $\\frac{6}{x+3} - \\frac{4}{2x-6}$ with domain $x \\ne -3,\\ 3$.",
          ),
          step(
            "approach",
            "Simplificar el segundo denominador, poner ambas fracciones sobre $(x+3)(x-3)$ y restar numeradores.",
            "Simplify the second denominator, put both fractions over $(x+3)(x-3)$ and subtract numerators.",
          ),
          step(
            "calculation",
            "$\\dfrac{4}{2x-6} = \\dfrac{4}{2(x-3)} = \\dfrac{2}{x-3}$.<br>$\\dfrac{6}{x+3} - \\dfrac{2}{x-3} = \\dfrac{6(x-3) - 2(x+3)}{(x+3)(x-3)} = \\dfrac{6x - 18 - 2x - 6}{x^2 - 9} = \\dfrac{4x - 24}{x^2 - 9}$.<br>Control numérico con $x = 0$: $\\frac{6}{3} - \\frac{4}{-6} = 2 + \\frac{2}{3} = \\frac{8}{3}$ y $\\frac{-24}{-9} = \\frac{8}{3}$ ✓",
            "$\\dfrac{4}{2x-6} = \\dfrac{4}{2(x-3)} = \\dfrac{2}{x-3}$.<br>$\\dfrac{6}{x+3} - \\dfrac{2}{x-3} = \\dfrac{6(x-3) - 2(x+3)}{(x+3)(x-3)} = \\dfrac{6x - 18 - 2x - 6}{x^2 - 9} = \\dfrac{4x - 24}{x^2 - 9}$.<br>Numeric check at $x = 0$: $\\frac{6}{3} - \\frac{4}{-6} = 2 + \\frac{2}{3} = \\frac{8}{3}$ and $\\frac{-24}{-9} = \\frac{8}{3}$ ✓",
          ),
          step(
            "result",
            "$\\dfrac{6}{x+3} - \\dfrac{4}{2x-6} = \\dfrac{4(x-6)}{(x+3)(x-3)}$, válida para $x \\ne \\pm 3$.",
            "$\\dfrac{6}{x+3} - \\dfrac{4}{2x-6} = \\dfrac{4(x-6)}{(x+3)(x-3)}$, valid for $x \\ne \\pm 3$.",
          ),
        ],
      };
    },
  ),

  /* FOS/BOS 2011, 1.1 — división de fracciones con agujero en x = -3. */
  template(
    {
      id: "rat-simp-04",
      subject: "math",
      topicId: "rational",
      subtopicId: "simplifying",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 240,
      tags: ["rational-expressions", "division", "domain", "exam"],
      prerequisites: ["simplifying"],
      source: {
        sourceId: "fos-bos-2011",
        license: "OPEN_LICENSE",
        exerciseNumber: "1.1",
      },
      reasoning: "spurious",
    },
    (rng) => {
      return {
        skill: L("División de fracciones algebraicas (examen real 2011)", "Dividing algebraic fractions (real 2011 exam)"),
        statement: L(
          "Simplifica todo lo posible (dominio $x \\ne -3,\\ 3$; escribe una fracción, por ejemplo 2/(x+1)): $$\\frac{x + 3}{x^2 - 9} \\div \\frac{x + 3}{2x + 6}$$",
          "Simplify as far as possible (domain $x \\ne -3,\\ 3$; write a fraction, e.g. 2/(x+1)): $$\\frac{x + 3}{x^2 - 9} \\div \\frac{x + 3}{2x + 6}$$",
        ),
        answer: {
          kind: "expression",
          accepted: ["2/(x-3)", "2/(x - 3)", "-2/(3-x)"],
          variables: ["x"],
        },
        hints: [
          L(
            "Dividir por una fracción es multiplicar por su **recíproco**.",
            "Dividing by a fraction is multiplying by its **reciprocal**.",
          ),
          L(
            "Factoriza todo: $x^2 - 9 = (x-3)(x+3)$ y $2x + 6 = 2(x+3)$.",
            "Factor everything: $x^2 - 9 = (x-3)(x+3)$ and $2x + 6 = 2(x+3)$.",
          ),
          L(
            "Cancela los $(x+3)$ — que **no** son cero, porque $x \\ne -3$ — y quédate con $\\frac{2}{x-3}$.",
            "Cancel the $(x+3)$ factors — which are **not** zero, since $x \\ne -3$ — and you are left with $\\frac{2}{x-3}$.",
          ),
        ],
        answerDisplay: L("$\\dfrac{2}{x - 3}$", "$\\dfrac{2}{x - 3}$"),
        solution: [
          step(
            "given",
            "$\\frac{x+3}{x^2-9} \\div \\frac{x+3}{2x+6}$; el dominio excluye $x = \\pm 3$ (por $x^2 - 9$) y también $x = -3$ (por $2x+6$): $x \\ne -3,\\ 3$.",
            "$\\frac{x+3}{x^2-9} \\div \\frac{x+3}{2x+6}$; the domain excludes $x = \\pm 3$ (from $x^2 - 9$) and also $x = -3$ (from $2x+6$): $x \\ne -3,\\ 3$.",
          ),
          step(
            "approach",
            "Convertir la división en multiplicación por el recíproco, factorizar las diferencias de cuadrados y cancelar.",
            "Turn the division into multiplication by the reciprocal, factor the differences of squares and cancel.",
          ),
          step(
            "calculation",
            "$\\dfrac{x+3}{x^2-9} \\cdot \\dfrac{2x+6}{x+3} = \\dfrac{x+3}{(x-3)(x+3)} \\cdot \\dfrac{2(x+3)}{x+3}$.<br>Cancela $(x+3)$ dos veces (nunca es cero en el dominio): $= \\dfrac{2}{x-3}$.<br>Control numérico con $x = 0$: $\\frac{3}{-9} \\div \\frac{3}{6} = -\\frac{1}{3} \\cdot 2 = -\\frac{2}{3}$ y $\\frac{2}{-3} = -\\frac{2}{3}$ ✓",
            "$\\dfrac{x+3}{x^2-9} \\cdot \\dfrac{2x+6}{x+3} = \\dfrac{x+3}{(x-3)(x+3)} \\cdot \\dfrac{2(x+3)}{x+3}$.<br>Cancel $(x+3)$ twice (never zero in the domain): $= \\dfrac{2}{x-3}$.<br>Numeric check at $x = 0$: $\\frac{3}{-9} \\div \\frac{3}{6} = -\\frac{1}{3} \\cdot 2 = -\\frac{2}{3}$ and $\\frac{2}{-3} = -\\frac{2}{3}$ ✓",
          ),
          step(
            "result",
            "$\\dfrac{x+3}{x^2-9} \\div \\dfrac{x+3}{2x+6} = \\dfrac{2}{x-3}$ para $x \\ne -3,\\ 3$ — coincide con el Lösungsvorschlag oficial del examen.",
            "$\\dfrac{x+3}{x^2-9} \\div \\dfrac{x+3}{2x+6} = \\dfrac{2}{x-3}$ for $x \\ne -3,\\ 3$ — matches the exam's official Lösungsvorschlag.",
          ),
        ],
      };
    },
  ),

  /* FOS/BOS 2011, 1.2 — resta con mcd 84a³b³. */
  template(
    {
      id: "rat-add-04",
      subject: "math",
      topicId: "rational",
      subtopicId: "add-sub",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["rational-expressions", "lcd", "two-variables", "exam"],
      prerequisites: ["add-sub"],
      source: {
        sourceId: "fos-bos-2011",
        license: "OPEN_LICENSE",
        exerciseNumber: "1.2",
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L("$\\dfrac{4a^2 + 7b^2}{84a^3b^3}$", "$\\dfrac{4a^2 + 7b^2}{84a^3b^3}$"),
          correct: true,
        },
        {
          id: "b",
          text: L("$\\dfrac{4a^2 - 7b^2}{84a^3b^3}$", "$\\dfrac{4a^2 - 7b^2}{84a^3b^3}$"),
          correct: false,
        },
        {
          id: "c",
          text: L("$\\dfrac{1}{3ab}$", "$\\dfrac{1}{3ab}$"),
          correct: false,
        },
        {
          id: "d",
          text: L("$\\dfrac{4a^2 + 7b^2}{33a^4b^4}$", "$\\dfrac{4a^2 + 7b^2}{33a^4b^4}$"),
          correct: false,
        },
      ];
      return {
        skill: L("Resta con mcd en dos variables (examen real 2011)", "Subtraction with an LCD in two variables (real 2011 exam)"),
        statement: L(
          "Reúne en una sola fracción (dominio $a, b \\ne 0$; $a, b \\in \\mathbb{R}$): $$\\frac{4a^2 + 1}{12a^3b} - \\frac{7b^2 - 1}{21ab^3}$$ Elige el resultado correcto.",
          "Combine into a single fraction (domain $a, b \\ne 0$; $a, b \\in \\mathbb{R}$): $$\\frac{4a^2 + 1}{12a^3b} - \\frac{7b^2 - 1}{21ab^3}$$ Choose the correct result.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El mínimo común denominador combina la parte numérica y las potencias de $a$ y $b$.",
            "The least common denominator combines the numeric part and the powers of $a$ and $b$.",
          ),
          L(
            "$12 = 4 \\cdot 3$ y $21 = 7 \\cdot 3$: mcm numérico $84$. Potencias máximas: $a^3$ y $b^3$. Así que el mcd es $84a^3b^3$.",
            "$12 = 4 \\cdot 3$ and $21 = 7 \\cdot 3$: numeric lcm $84$. Highest powers: $a^3$ and $b^3$. So the LCD is $84a^3b^3$.",
          ),
          L(
            "Numerador: $7b^2(4a^2 + 1) - 4a^2(7b^2 - 1)$. Desarrolla **los dos** productos completos antes de restar.",
            "Numerator: $7b^2(4a^2 + 1) - 4a^2(7b^2 - 1)$. Expand **both** complete products before subtracting.",
          ),
        ],
        answerDisplay: L(
          "$\\dfrac{4a^2 + 7b^2}{84a^3b^3}$",
          "$\\dfrac{4a^2 + 7b^2}{84a^3b^3}$",
        ),
        solution: [
          step(
            "given",
            "La resta $\\frac{4a^2+1}{12a^3b} - \\frac{7b^2-1}{21ab^3}$ con $a, b \\ne 0$.",
            "The subtraction $\\frac{4a^2+1}{12a^3b} - \\frac{7b^2-1}{21ab^3}$ with $a, b \\ne 0$.",
          ),
          step(
            "approach",
            "Mínimo común denominador por factores primos y potencias máximas; luego amplificar cada fracción y restar con cuidado los signos.",
            "Least common denominator via prime factors and highest powers; then scale each fraction and subtract minding the signs.",
          ),
          step(
            "calculation",
            "mcd $= 84a^3b^3$ ($12a^3b \\cdot 7b^2$ y $21ab^3 \\cdot 4a^2$).<br>Numerador: $7b^2(4a^2 + 1) - 4a^2(7b^2 - 1) = 28a^2b^2 + 7b^2 - 28a^2b^2 + 4a^2 = 7b^2 + 4a^2$.<br>Los términos $28a^2b^2$ se cancelan entre sí y los restos se juntan: $= \\dfrac{4a^2 + 7b^2}{84a^3b^3}$.<br>La opción $\\frac{1}{3ab}$ es la trampa clásica: sale de cancelar como si los $+1$ y $-1$ no existieran.",
            "LCD $= 84a^3b^3$ ($12a^3b \\cdot 7b^2$ and $21ab^3 \\cdot 4a^2$).<br>Numerator: $7b^2(4a^2 + 1) - 4a^2(7b^2 - 1) = 28a^2b^2 + 7b^2 - 28a^2b^2 + 4a^2 = 7b^2 + 4a^2$.<br>The $28a^2b^2$ terms cancel each other and the remainders join: $= \\dfrac{4a^2 + 7b^2}{84a^3b^3}$.<br>The option $\\frac{1}{3ab}$ is the classic trap: it comes from cancelling as if the $+1$ and $-1$ did not exist.",
          ),
          step(
            "result",
            "$\\dfrac{4a^2+1}{12a^3b} - \\dfrac{7b^2-1}{21ab^3} = \\dfrac{4a^2 + 7b^2}{84a^3b^3}$ — coincide con el Lösungsvorschlag oficial.",
            "$\\dfrac{4a^2+1}{12a^3b} - \\dfrac{7b^2-1}{21ab^3} = \\dfrac{4a^2 + 7b^2}{84a^3b^3}$ — matches the official Lösungsvorschlag.",
          ),
        ],
      };
    },
  ),
];
