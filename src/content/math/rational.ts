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

  /* ---------------------------------------------------------------- */
  /* Curated — ESPOL Fundamentos (TUTOR_LICENSED, autorización del     */
  /* tutor 2026-10-01), sección 3.7 Expresiones Algebraicas, p.205.    */
  /* ---------------------------------------------------------------- */

  /* ESPOL p.205, ex.2a: resta de fracciones con factor 1/10. */
  template(
    {
      id: "rat-add-05",
      subject: "math",
      topicId: "rational",
      subtopicId: "add-sub",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 240,
      tags: ["rational-expressions", "common-denominator", "difference-of-squares"],
      prerequisites: ["add-sub", "simplifying"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3.7 · 2a",
        page: 205,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      void rng;
      return {
        skill: L(
          "Simplificar una resta de fracciones algebraicas (libro ESPOL)",
          "Simplifying a difference of algebraic fractions (ESPOL book)",
        ),
        statement: L(
          "Un estudiante de Cálculo de Variable Real está simplificando su tarea de derivación y llegó a $$\\frac{1}{10}\\left(\\frac{1}{x-5} - \\frac{1}{x+5}\\right).$$ Continúa el proceso de simplificación hasta obtener una única fracción (escríbela, por ejemplo, con la forma 2/(x+1)).",
          "A Calculus student is simplifying a differentiation result and arrived at $$\\frac{1}{10}\\left(\\frac{1}{x-5} - \\frac{1}{x+5}\\right).$$ Continue the simplification until you obtain a single fraction (write it, e.g., in the form 2/(x+1)).",
        ),
        answer: {
          kind: "expression",
          accepted: ["1/(x^2-25)", "-1/(25-x^2)"],
          variables: ["x"],
        },
        hints: [
          L(
            "La resta de fracciones necesita **un** denominador común: multiplica los denominadores, $(x-5)(x+5)$.",
            "Subtracting fractions needs **one** common denominator: multiply the denominators, $(x-5)(x+5)$.",
          ),
          L(
            "$\\frac{1}{x-5} - \\frac{1}{x+5} = \\frac{(x+5)-(x-5)}{(x-5)(x+5)}$. El numerador se simplifica solo.",
            "$\\frac{1}{x-5} - \\frac{1}{x+5} = \\frac{(x+5)-(x-5)}{(x-5)(x+5)}$. The numerator simplifies by itself.",
          ),
          L(
            "Te queda $\\frac{1}{10}$ por una fracción cuyo numerador es $10$: cancela, y en el denominador reconoce la diferencia de cuadrados.",
            "You are left with $\\frac{1}{10}$ times a fraction whose numerator is $10$: cancel, and recognize the difference of squares in the denominator.",
          ),
        ],
        answerDisplay: L(
          "$\\dfrac{1}{x^2-25}$ (para $x \\ne \\pm 5$)",
          "$\\dfrac{1}{x^2-25}$ (for $x \\ne \\pm 5$)",
        ),
        solution: [
          step(
            "given",
            "La expresión $\\frac{1}{10}\\left(\\frac{1}{x-5}-\\frac{1}{x+5}\\right)$, válida para $x \\ne \\pm 5$.",
            "The expression $\\frac{1}{10}\\left(\\frac{1}{x-5}-\\frac{1}{x+5}\\right)$, valid for $x \\ne \\pm 5$.",
          ),
          step(
            "approach",
            "Restar con denominador común, simplificar el numerador y absorber el factor $\\frac{1}{10}$.",
            "Subtract with a common denominator, simplify the numerator, and absorb the $\\frac{1}{10}$ factor.",
          ),
          step(
            "calculation",
            "$\\frac{1}{x-5}-\\frac{1}{x+5} = \\frac{(x+5)-(x-5)}{(x-5)(x+5)} = \\frac{10}{x^2-25}$. Entonces: $$\\frac{1}{10} \\cdot \\frac{10}{x^2-25} = \\frac{1}{x^2-25}.$$<br>Control numérico con $x = 6$: $\\frac{1}{10}\\left(1 - \\tfrac{1}{11}\\right) = \\frac{1}{10} \\cdot \\tfrac{10}{11} = \\tfrac{1}{11}$ y $\\tfrac{1}{36-25} = \\tfrac{1}{11}$ ✓",
            "$\\frac{1}{x-5}-\\frac{1}{x+5} = \\frac{(x+5)-(x-5)}{(x-5)(x+5)} = \\frac{10}{x^2-25}$. Then: $$\\frac{1}{10} \\cdot \\frac{10}{x^2-25} = \\frac{1}{x^2-25}.$$<br>Numeric check at $x = 6$: $\\frac{1}{10}\\left(1 - \\tfrac{1}{11}\\right) = \\frac{1}{10} \\cdot \\tfrac{10}{11} = \\tfrac{1}{11}$ and $\\tfrac{1}{36-25} = \\tfrac{1}{11}$ ✓",
          ),
          step(
            "result",
            "$\\frac{1}{10}\\left(\\frac{1}{x-5}-\\frac{1}{x+5}\\right) = \\frac{1}{x^2-25}$ para $x \\ne \\pm 5$: el factor $\\frac{1}{10}$ y el $10$ del numerador estaban hechos el uno para el otro.",
            "$\\frac{1}{10}\\left(\\frac{1}{x-5}-\\frac{1}{x+5}\\right) = \\frac{1}{x^2-25}$ for $x \\ne \\pm 5$: the $\\frac{1}{10}$ factor and the numerator's $10$ were made for each other.",
          ),
        ],
      };
    },
  ),

  /* ================================================================== */
  /* Segunda tanda ESPOL §3.11 (p. 322) — la meta-ecuación de           */
  /* cardinalidades. Transcrita con el modelo de visión (VLM); cada     */
  /* predicado verificado contra la clave impresa (p. 803):             */
  /* Ap=∅, Aq={54}, Ar={−11}, At={−16}, Au={59/19}.                     */
  /* ================================================================== */

  /* 3.11 · 113 — meta-equation on cardinalities of truth sets → N(Aw) = 1 */
  template(
    {
      id: "rat-espol-113",
      subject: "math",
      topicId: "rational",
      subtopicId: "equations",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 600,
      tags: ["meta", "cardinality", "rational-equations", "multi-step", "logic"],
      prerequisites: ["rational"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3.11 · 113",
        page: 322,
      },
      reasoning: "multi-concept",
    },
    () => {
      const options: McOption[] = [
        { id: "a", text: L(`$N(A_{w(x)}) = 1$`, `$N(A_{w(x)}) = 1$`), correct: true },
        { id: "b", text: L(`$N(A_{w(x)}) = 0$`, `$N(A_{w(x)}) = 0$`), correct: false },
        { id: "c", text: L(`$N(A_{w(x)}) = 2$`, `$N(A_{w(x)}) = 2$`), correct: false },
        { id: "d", text: L(`$N(A_{w(x)}) = 5$`, `$N(A_{w(x)}) = 5$`), correct: false },
      ];
      return {
        skill: L("Resolver cinco ecuaciones para alimentar una meta-ecuación", "Solve five equations to feed a meta-equation"),
        statement: L(
          `Sea $Re = \\mathbb{R}$. Se definen los predicados $p(x)$, $q(x)$, $r(x)$, $t(x)$, $u(x)$, mientras que el predicado $w(x)$ **no se define**. Si la cardinalidad $N(A_{w(x)})$ es finita, resuelve la siguiente ecuación y determina $N(A_{w(x)})$:\n\n$\\bigl[N(A_t) + N(A_q) + N(A_r)\\bigr]\\bigl[N(A_w) - N(A_u)\\bigr] + 2\\bigl(N(A_w) - 1\\bigr) - N(A_p) = 0$\n\ncon:\n- $p(x):\\ x^2 + 1 = 0$\n- $q(x):\\ \\dfrac{5x+13}{15} - \\dfrac{4x+5}{5x-15} = \\dfrac{x}{3}$\n- $r(x):\\ \\dfrac{2x-1}{2x+1} - \\dfrac{x-4}{3x-2} = \\dfrac{2}{3}$\n- $t(x):\\ \\dfrac{10x-7}{15x+3} = \\dfrac{3x+8}{12} - \\dfrac{5x^2-4}{20x+4}$\n- $u(x):\\ \\dfrac{4x-1}{5} + \\dfrac{x-2}{2x-7} = \\dfrac{8x-3}{10} - \\dfrac{13}{10}$`,
          `Let $Re = \\mathbb{R}$. The predicates $p(x)$, $q(x)$, $r(x)$, $t(x)$, $u(x)$ are defined below, while the predicate $w(x)$ is **not** defined. If the cardinality $N(A_{w(x)})$ is finite, solve the following equation and determine $N(A_{w(x)})$:\n\n$\\bigl[N(A_t) + N(A_q) + N(A_r)\\bigr]\\bigl[N(A_w) - N(A_u)\\bigr] + 2\\bigl(N(A_w) - 1\\bigr) - N(A_p) = 0$\n\nwith:\n- $p(x):\\ x^2 + 1 = 0$\n- $q(x):\\ \\dfrac{5x+13}{15} - \\dfrac{4x+5}{5x-15} = \\dfrac{x}{3}$\n- $r(x):\\ \\dfrac{2x-1}{2x+1} - \\dfrac{x-4}{3x-2} = \\dfrac{2}{3}$\n- $t(x):\\ \\dfrac{10x-7}{15x+3} = \\dfrac{3x+8}{12} - \\dfrac{5x^2-4}{20x+4}$\n- $u(x):\\ \\dfrac{4x-1}{5} + \\dfrac{x-2}{2x-7} = \\dfrac{8x-3}{10} - \\dfrac{13}{10}$`,
        ),
        answer: { kind: "multiple-choice", options },
        hints: [
          L(
            "Empieza por $p$: $x^2 + 1 = 0$ no tiene soluciones reales, así que $N(A_p) = 0$.",
            "Start with $p$: $x^2 + 1 = 0$ has no real solutions, so $N(A_p) = 0$.",
          ),
          L(
            "Resuelve $q$, $r$, $t$, $u$ una por una (multiplica por el mínimo común denominador y revisa las restricciones). Cada una tiene exactamente UNA solución real: $q \\to 54$, $r \\to -11$, $t \\to -16$, $u \\to \\frac{59}{19}$.",
            "Solve $q$, $r$, $t$, $u$ one by one (multiply by the least common denominator and check the restrictions). Each has exactly ONE real solution: $q \\to 54$, $r \\to -11$, $t \\to -16$, $u \\to \\frac{59}{19}$.",
          ),
          L(
            "Sustituye las cardinalidades en la meta-ecuación: $[1+1+1](z - 1) + 2(z - 1) - 0 = 0$ con $z = N(A_w)$.",
            "Substitute the cardinalities into the meta-equation: $[1+1+1](z - 1) + 2(z - 1) - 0 = 0$ with $z = N(A_w)$.",
          ),
        ],
        answerDisplay: L(
          `$N(A_{w(x)}) = 1$: la meta-ecuación queda $3(z-1) + 2(z-1) = 0 \\Rightarrow 5(z-1) = 0 \\Rightarrow z = 1$. Un posible $w(x)$ es cualquier predicado con una única solución, p. ej. $w(x): x = 7$.`,
          `$N(A_{w(x)}) = 1$: the meta-equation becomes $3(z-1) + 2(z-1) = 0 \\Rightarrow 5(z-1) = 0 \\Rightarrow z = 1$. A possible $w(x)$ is any predicate with exactly one solution, e.g. $w(x): x = 7$.`,
        ),
        solution: [
          step(
            "given",
            "La meta-ecuación $[N(A_t) + N(A_q) + N(A_r)][N(A_w) - N(A_u)] + 2(N(A_w) - 1) - N(A_p) = 0$ con los cinco predicados racionales definidos sobre $\\mathbb{R}$.",
            "The meta-equation $[N(A_t) + N(A_q) + N(A_r)][N(A_w) - N(A_u)] + 2(N(A_w) - 1) - N(A_p) = 0$ with the five rational predicates defined over $\\mathbb{R}$.",
          ),
          step(
            "approach",
            "El problema es una muñeca rusa: primero se resuelven las cinco ecuaciones racionales (¡con sus restricciones de dominio!), se cuentan las soluciones de cada conjunto de verdad, y solo entonces la meta-ecuación se vuelve una ecuación lineal en $z = N(A_w)$.",
            "The problem is a matryoshka doll: first solve the five rational equations (with their domain restrictions!), count the solutions of each truth set, and only then does the meta-equation become a linear equation in $z = N(A_w)$.",
          ),
          step(
            "calculation",
            `$p:\\ x^2+1=0 \\Rightarrow A_p = \\varnothing \\Rightarrow N(A_p) = 0$<br>$q:\\ (5x+13)(x-3) - 3(4x+5) = 5x(x-3) \\Rightarrow 5x^2-14x-54 = 5x^2-15x \\Rightarrow x = 54$ (válido, $\\ne 3$) $\\Rightarrow N(A_q)=1$<br>$r:\\ 3(2x-1)(3x-2) - 3(x-4)(2x+1) = 2(2x+1)(3x-2) \\Rightarrow 12x^2 + 18 = 12x^2 - 2x - 4 \\Rightarrow x = -11$ $\\Rightarrow N(A_r)=1$<br>$t:$ multiplicando por $12(5x+1)$ se colapsa a $x = -16$ ($\\ne -\\frac{1}{5}$) $\\Rightarrow N(A_t)=1$<br>$u:$ multiplicando por $10(2x-7)$ se colapsa a $x = \\frac{59}{19}$ ($\\ne \\frac{7}{2}$) $\\Rightarrow N(A_u)=1$`,
            `$p:\\ x^2+1=0 \\Rightarrow A_p = \\varnothing \\Rightarrow N(A_p) = 0$<br>$q:\\ (5x+13)(x-3) - 3(4x+5) = 5x(x-3) \\Rightarrow 5x^2-14x-54 = 5x^2-15x \\Rightarrow x = 54$ (valid, $\\ne 3$) $\\Rightarrow N(A_q)=1$<br>$r:\\ 3(2x-1)(3x-2) - 3(x-4)(2x+1) = 2(2x+1)(3x-2) \\Rightarrow 12x^2 + 18 = 12x^2 - 2x - 4 \\Rightarrow x = -11$ $\\Rightarrow N(A_r)=1$<br>$t:$ multiplying by $12(5x+1)$ collapses to $x = -16$ ($\\ne -\\frac{1}{5}$) $\\Rightarrow N(A_t)=1$<br>$u:$ multiplying by $10(2x-7)$ collapses to $x = \\frac{59}{19}$ ($\\ne \\frac{7}{2}$) $\\Rightarrow N(A_u)=1$`,
          ),
          step(
            "result",
            `Con $z = N(A_w)$: $[1+1+1](z-1) + 2(z-1) - 0 = 0 \\Rightarrow 5(z-1) = 0 \\Rightarrow z = 1$. Así que $w$ puede ser CUALQUIER predicado con exactamente una solución real (p. ej. $w(x): x = 7$). Todos los valores coinciden con la clave impresa del libro: $A_p = \\varnothing$, $A_q = \\{54\\}$, $A_r = \\{-11\\}$, $A_t = \\{-16\\}$, $A_u = \\left\\{\\frac{59}{19}\\right\\}$.`,
            `With $z = N(A_w)$: $[1+1+1](z-1) + 2(z-1) - 0 = 0 \\Rightarrow 5(z-1) = 0 \\Rightarrow z = 1$. So $w$ can be ANY predicate with exactly one real solution (e.g. $w(x): x = 7$). All values match the book's printed answer key: $A_p = \\varnothing$, $A_q = \\{54\\}$, $A_r = \\{-11\\}$, $A_t = \\{-16\\}$, $A_u = \\left\\{\\frac{59}{19}\\right\\}$.`,
          ),
        ],
      };
    },
  ),

  /* ================================================================== */
  /* Hoja de la alumna (DE, oct. 2025) — Sección 2 "Simplificar          */
  /* fracciones algebraicas": factoriza numerador y denominador,         */
  /* simplifica. Exponentes con variable. Transcripción del tutor como   */
  /* fuente de verdad; respuestas re-derivadas con sympy (23/23).        */
  /* ================================================================== */

  /* Hoja alumna · S2.1 — x^6+x^5 / x^4+x^3. */
  template(
    {
      id: "rat-simp-05",
      subject: "math",
      topicId: "rational",
      subtopicId: "simplifying",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 150,
      tags: ["rational-expressions", "factoring", "variable-exponents", "class-sheet"],
      prerequisites: ["simplifying"],
      source: {
        sourceId: "alumna-worksheet-2025",
        license: "TUTOR_LICENSED",
        exerciseNumber: "S2 · 1",
      },
      reasoning: "definition-hunting",
    },
    () => {
      return {
        skill: L(
          "Simplificar una fracción con exponentes altos (hoja de clase real)",
          "Simplifying a fraction with high exponents (real class sheet)",
        ),
        statement: L(
          "Factoriza el numerador y el denominador. Simplifica tanto como sea posible (escribe por ejemplo x^2 o x*x):\n\n$$\\frac{x^6 + x^5}{x^4 + x^3}$$",
          "Factor the numerator and the denominator. Simplify as far as possible (write e.g. x^2 or x*x):\n\n$$\\frac{x^6 + x^5}{x^4 + x^3}$$",
        ),
        answer: {
          kind: "expression",
          accepted: ["x^2", "x*x", "x*x*x*x/(x*x)"],
          variables: ["x"],
        },
        hints: [
          L(
            "En cada polinomio hay un factor común escondido: $x^6 + x^5 = x^5\\left(\\ldots\\right)$.",
            "Each polynomial hides a common factor: $x^6 + x^5 = x^5\\left(\\ldots\\right)$.",
          ),
          L(
            "$x^6 + x^5 = x^5\\left(x + 1\\right)$ y $x^4 + x^3 = x^3\\left(x + 1\\right)$.",
            "$x^6 + x^5 = x^5\\left(x + 1\\right)$ and $x^4 + x^3 = x^3\\left(x + 1\\right)$.",
          ),
          L(
            "Cancela el factor $\\left(x + 1\\right)$ completo (¡no solo las $x$!) y después las potencias de $x$.",
            "Cancel the whole factor $\\left(x + 1\\right)$ (not just the $x$'s!) and then the powers of $x$.",
          ),
        ],
        answerDisplay: L(
          "$\\dfrac{x^6 + x^5}{x^4 + x^3} = \\dfrac{x^5\\left(x+1\\right)}{x^3\\left(x+1\\right)} = x^2$",
          "$\\dfrac{x^6 + x^5}{x^4 + x^3} = \\dfrac{x^5\\left(x+1\\right)}{x^3\\left(x+1\\right)} = x^2$",
        ),
        solution: [
          step(
            "given",
            "La fracción $\\frac{x^6 + x^5}{x^4 + x^3}$ (hoja de clase alemana, sección de fracciones algebraicas).",
            "The fraction $\\frac{x^6 + x^5}{x^4 + x^3}$ (German class sheet, algebraic-fractions section).",
          ),
          step(
            "approach",
            "Factorizar numerador y denominador por separado (factor común $x$ elevado al menor exponente) y cancelar los factores comunes.",
            "Factor numerator and denominator separately (common factor $x$ to the smaller exponent) and cancel common factors.",
          ),
          step(
            "calculation",
            "$x^6 + x^5 = x^5\\left(x + 1\\right)$ (el menor exponente es 5) y $x^4 + x^3 = x^3\\left(x + 1\\right)$ (el menor exponente es 3).<br>$\\dfrac{x^5\\left(x+1\\right)}{x^3\\left(x+1\\right)} = \\dfrac{x^5}{x^3} = x^{5-3} = x^2$.<br>Control con $x = 2$: $\\frac{64 + 32}{16 + 8} = \\frac{96}{24} = 4 = 2^2$ ✓",
            "$x^6 + x^5 = x^5\\left(x + 1\\right)$ (smaller exponent 5) and $x^4 + x^3 = x^3\\left(x + 1\\right)$ (smaller exponent 3).<br>$\\dfrac{x^5\\left(x+1\\right)}{x^3\\left(x+1\\right)} = \\dfrac{x^5}{x^3} = x^{5-3} = x^2$.<br>Check at $x = 2$: $\\frac{64 + 32}{16 + 8} = \\frac{96}{24} = 4 = 2^2$ ✓",
          ),
          step(
            "result",
            "$\\dfrac{x^6 + x^5}{x^4 + x^3} = x^2$ (para $x \\ne 0$ y $x \\ne -1$, donde la fracción original no está definida).",
            "$\\dfrac{x^6 + x^5}{x^4 + x^3} = x^2$ (for $x \\ne 0$ and $x \\ne -1$, where the original fraction is undefined).",
          ),
        ],
      };
    },
  ),

  /* Hoja alumna · S2.2 — dos variables, coeficientes con mcd. */
  template(
    {
      id: "rat-simp-06",
      subject: "math",
      topicId: "rational",
      subtopicId: "simplifying",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 210,
      tags: ["rational-expressions", "factoring", "two-variables", "class-sheet"],
      prerequisites: ["simplifying"],
      source: {
        sourceId: "alumna-worksheet-2025",
        license: "TUTOR_LICENSED",
        exerciseNumber: "S2 · 2",
      },
      reasoning: "multi-concept",
    },
    () => {
      return {
        skill: L(
          "Fracción algebraica con dos variables y factor numérico (hoja de clase real)",
          "Algebraic fraction with two variables and a numeric factor (real class sheet)",
        ),
        statement: L(
          "Factoriza el numerador y el denominador. Simplifica tanto como sea posible (escribe por ejemplo 6(2x-3y)/(x+5)):\n\n$$\\frac{12x^3y^2 - 18x^2y^3}{5x^2y^2 + x^3y^2}$$",
          "Factor the numerator and the denominator. Simplify as far as possible (write e.g. 6(2x-3y)/(x+5)):\n\n$$\\frac{12x^3y^2 - 18x^2y^3}{5x^2y^2 + x^3y^2}$$",
        ),
        answer: {
          kind: "expression",
          accepted: ["6(2*x-3*y)/(x+5)", "(12*x-18*y)/(x+5)", "6(2x-3y)/(x+5)"],
          variables: ["x", "y"],
        },
        hints: [
          L(
            "Numerador: el factor común numérico es $\\text{mcd}(12, 18) = 6$, y el literal es $x^2y^2$ (menores exponentes).",
            "Numerator: the numeric common factor is $\\gcd(12, 18) = 6$, and the literal one is $x^2y^2$ (smallest exponents).",
          ),
          L(
            "$12x^3y^2 - 18x^2y^3 = 6x^2y^2\\left(2x - 3y\\right)$ y $5x^2y^2 + x^3y^2 = x^2y^2\\left(5 + x\\right)$.",
            "$12x^3y^2 - 18x^2y^3 = 6x^2y^2\\left(2x - 3y\\right)$ and $5x^2y^2 + x^3y^2 = x^2y^2\\left(5 + x\\right)$.",
          ),
          L(
            "Cancela $x^2y^2$ arriba y abajo — el $6$ del numerador **se queda**.",
            "Cancel $x^2y^2$ top and bottom — the $6$ in the numerator **stays**.",
          ),
        ],
        answerDisplay: L(
          "$\\dfrac{12x^3y^2 - 18x^2y^3}{5x^2y^2 + x^3y^2} = \\dfrac{6x^2y^2\\left(2x-3y\\right)}{x^2y^2\\left(x+5\\right)} = \\dfrac{6\\left(2x - 3y\\right)}{x + 5}$",
          "$\\dfrac{12x^3y^2 - 18x^2y^3}{5x^2y^2 + x^3y^2} = \\dfrac{6x^2y^2\\left(2x-3y\\right)}{x^2y^2\\left(x+5\\right)} = \\dfrac{6\\left(2x - 3y\\right)}{x + 5}$",
        ),
        solution: [
          step(
            "given",
            "La fracción $\\frac{12x^3y^2 - 18x^2y^3}{5x^2y^2 + x^3y^2}$ con dos variables.",
            "The fraction $\\frac{12x^3y^2 - 18x^2y^3}{5x^2y^2 + x^3y^2}$ with two variables.",
          ),
          step(
            "approach",
            "Sacar el factor común máximo de cada polinomio (numérico + literales de menores exponentes) y cancelar lo que aparezca en ambos.",
            "Pull out the greatest common factor of each polynomial (numeric + literals to the smallest exponents) and cancel whatever appears in both.",
          ),
          step(
            "calculation",
            "Numerador: $\\text{mcd}(12,18) = 6$, $x^2$, $y^2$ → $6x^2y^2\\left(2x - 3y\\right)$.<br>Denominador: $x^2y^2$ → $x^2y^2\\left(5 + x\\right)$.<br>$\\dfrac{6x^2y^2\\left(2x-3y\\right)}{x^2y^2\\left(x+5\\right)} = \\dfrac{6\\left(2x-3y\\right)}{x+5}$.<br>Control con $x = y = 1$: $\\frac{12 - 18}{5 + 1} = \\frac{-6}{6} = -1$ y $\\frac{6(2-3)}{1+5} = \\frac{-6}{6} = -1$ ✓",
            "Numerator: $\\gcd(12,18) = 6$, $x^2$, $y^2$ → $6x^2y^2\\left(2x - 3y\\right)$.<br>Denominator: $x^2y^2$ → $x^2y^2\\left(5 + x\\right)$.<br>$\\dfrac{6x^2y^2\\left(2x-3y\\right)}{x^2y^2\\left(x+5\\right)} = \\dfrac{6\\left(2x-3y\\right)}{x+5}$.<br>Check at $x = y = 1$: $\\frac{12 - 18}{5 + 1} = \\frac{-6}{6} = -1$ and $\\frac{6(2-3)}{1+5} = \\frac{-6}{6} = -1$ ✓",
          ),
          step(
            "result",
            "$\\dfrac{12x^3y^2 - 18x^2y^3}{5x^2y^2 + x^3y^2} = \\dfrac{6\\left(2x - 3y\\right)}{x + 5}$, con $x \\ne 0$, $y \\ne 0$, $x \\ne -5$ excluidos del dominio original.",
            "$\\dfrac{12x^3y^2 - 18x^2y^3}{5x^2y^2 + x^3y^2} = \\dfrac{6\\left(2x - 3y\\right)}{x + 5}$, with $x \\ne 0$, $y \\ne 0$, $x \\ne -5$ excluded from the original domain.",
          ),
        ],
      };
    },
  ),

  /* Hoja alumna · S2.3 — exponentes con variable, cociente de sumas. */
  template(
    {
      id: "rat-simp-07",
      subject: "math",
      topicId: "rational",
      subtopicId: "simplifying",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 180,
      tags: ["rational-expressions", "variable-exponents", "class-sheet"],
      prerequisites: ["simplifying"],
      source: {
        sourceId: "alumna-worksheet-2025",
        license: "TUTOR_LICENSED",
        exerciseNumber: "S2 · 3",
      },
      reasoning: "definition-hunting",
    },
    () => {
      return {
        skill: L(
          "Simplificar con exponentes literales: a^n + a^{n+1} (hoja de clase real)",
          "Simplifying with literal exponents: a^n + a^{n+1} (real class sheet)",
        ),
        statement: L(
          "Factoriza el numerador y el denominador. Simplifica tanto como sea posible (escribe por ejemplo 1/a o a^-1):\n\n$$\\frac{a^n + a^{n+1}}{a^{n+2} + a^{n+1}}$$",
          "Factor the numerator and the denominator. Simplify as far as possible (write e.g. 1/a or a^-1):\n\n$$\\frac{a^n + a^{n+1}}{a^{n+2} + a^{n+1}}$$",
        ),
        answer: {
          kind: "expression",
          accepted: ["1/a", "a^-1", "1/(a)"],
          variables: ["a"],
        },
        hints: [
          L(
            "En el numerador el menor exponente es $n$: $a^n + a^{n+1} = a^n\\left(1 + \\ldots\\right)$.",
            "In the numerator the smallest exponent is $n$: $a^n + a^{n+1} = a^n\\left(1 + \\ldots\\right)$.",
          ),
          L(
            "$a^n + a^{n+1} = a^n\\left(1 + a\\right)$ y $a^{n+2} + a^{n+1} = a^{n+1}\\left(a + 1\\right)$.",
            "$a^n + a^{n+1} = a^n\\left(1 + a\\right)$ and $a^{n+2} + a^{n+1} = a^{n+1}\\left(a + 1\\right)$.",
          ),
          L(
            "Cancela $\\left(a + 1\\right)$; queda $\\dfrac{a^n}{a^{n+1}}$, y al restar exponentes el resultado es una **potencia negativa**.",
            "Cancel $\\left(a + 1\\right)$; you are left with $\\dfrac{a^n}{a^{n+1}}$, and subtracting exponents gives a **negative power**.",
          ),
        ],
        answerDisplay: L(
          "$\\dfrac{a^n + a^{n+1}}{a^{n+2} + a^{n+1}} = \\dfrac{a^n\\left(1+a\\right)}{a^{n+1}\\left(a+1\\right)} = \\dfrac{1}{a}$",
          "$\\dfrac{a^n + a^{n+1}}{a^{n+2} + a^{n+1}} = \\dfrac{a^n\\left(1+a\\right)}{a^{n+1}\\left(a+1\\right)} = \\dfrac{1}{a}$",
        ),
        solution: [
          step(
            "given",
            "La fracción $\\frac{a^n + a^{n+1}}{a^{n+2} + a^{n+1}}$ con exponentes literales ($a \\ne 0$).",
            "The fraction $\\frac{a^n + a^{n+1}}{a^{n+2} + a^{n+1}}$ with literal exponents ($a \\ne 0$).",
          ),
          step(
            "approach",
            "Factor común con el exponente menor en cada polinomio; el paréntesis que queda es el mismo arriba y abajo.",
            "Common factor with the smaller exponent in each polynomial; the leftover parenthesis is the same top and bottom.",
          ),
          step(
            "calculation",
            "$a^n + a^{n+1} = a^n\\left(1 + a\\right)$;<br>$a^{n+2} + a^{n+1} = a^{n+1}\\left(a + 1\\right)$.<br>$\\dfrac{a^n\\left(1+a\\right)}{a^{n+1}\\left(a+1\\right)} = \\dfrac{a^n}{a^{n+1}} = a^{n-(n+1)} = a^{-1} = \\dfrac{1}{a}$.<br>Control con $a = 2$, $n = 1$: $\\frac{2 + 4}{8 + 4} = \\frac{6}{12} = \\frac{1}{2}$ ✓",
            "$a^n + a^{n+1} = a^n\\left(1 + a\\right)$;<br>$a^{n+2} + a^{n+1} = a^{n+1}\\left(a + 1\\right)$.<br>$\\dfrac{a^n\\left(1+a\\right)}{a^{n+1}\\left(a+1\\right)} = \\dfrac{a^n}{a^{n+1}} = a^{n-(n+1)} = a^{-1} = \\dfrac{1}{a}$.<br>Check at $a = 2$, $n = 1$: $\\frac{2 + 4}{8 + 4} = \\frac{6}{12} = \\frac{1}{2}$ ✓",
          ),
          step(
            "result",
            "$\\dfrac{a^n + a^{n+1}}{a^{n+2} + a^{n+1}} = \\dfrac{1}{a}$: la $n$ desaparece por completo — el cociente no depende del exponente.",
            "$\\dfrac{a^n + a^{n+1}}{a^{n+2} + a^{n+1}} = \\dfrac{1}{a}$: the $n$ cancels out completely — the quotient does not depend on the exponent.",
          ),
        ],
      };
    },
  ),

  /* Hoja alumna · S2.4 — b^{n+1} - 5b^n / b^{n-1} - 5b^{n-2}. */
  template(
    {
      id: "rat-simp-08",
      subject: "math",
      topicId: "rational",
      subtopicId: "simplifying",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 180,
      tags: ["rational-expressions", "variable-exponents", "class-sheet"],
      prerequisites: ["simplifying"],
      source: {
        sourceId: "alumna-worksheet-2025",
        license: "TUTOR_LICENSED",
        exerciseNumber: "S2 · 4",
      },
      reasoning: "definition-hunting",
    },
    () => {
      return {
        skill: L(
          "Factor común con exponentes literales desplazados (hoja de clase real)",
          "Common factor with shifted literal exponents (real class sheet)",
        ),
        statement: L(
          "Factoriza el numerador y el denominador. Simplifica tanto como sea posible (escribe por ejemplo b^2):\n\n$$\\frac{b^{n+1} - 5b^n}{b^{n-1} - 5b^{n-2}}$$",
          "Factor the numerator and the denominator. Simplify as far as possible (write e.g. b^2):\n\n$$\\frac{b^{n+1} - 5b^n}{b^{n-1} - 5b^{n-2}}$$",
        ),
        answer: {
          kind: "expression",
          accepted: ["b^2", "b*b"],
          variables: ["b"],
        },
        hints: [
          L(
            "Numerador: el menor exponente es $n$ → $b^n\\left(b - 5\\right)$. Denominador: el menor exponente es $n - 2$.",
            "Numerator: the smaller exponent is $n$ → $b^n\\left(b - 5\\right)$. Denominator: the smaller exponent is $n - 2$.",
          ),
          L(
            "Denominador: $b^{n-1} - 5b^{n-2} = b^{n-2}\\left(b - 5\\right)$ — el paréntesis es el mismo de antes.",
            "Denominator: $b^{n-1} - 5b^{n-2} = b^{n-2}\\left(b - 5\\right)$ — the same parenthesis as before.",
          ),
          L(
            "Queda $\\dfrac{b^n}{b^{n-2}}$: resta los exponentes con cuidado, $n - (n-2) = 2$.",
            "You are left with $\\dfrac{b^n}{b^{n-2}}$: subtract the exponents carefully, $n - (n-2) = 2$.",
          ),
        ],
        answerDisplay: L(
          "$\\dfrac{b^{n+1} - 5b^n}{b^{n-1} - 5b^{n-2}} = \\dfrac{b^n\\left(b-5\\right)}{b^{n-2}\\left(b-5\\right)} = b^2$",
          "$\\dfrac{b^{n+1} - 5b^n}{b^{n-1} - 5b^{n-2}} = \\dfrac{b^n\\left(b-5\\right)}{b^{n-2}\\left(b-5\\right)} = b^2$",
        ),
        solution: [
          step(
            "given",
            "La fracción $\\frac{b^{n+1} - 5b^n}{b^{n-1} - 5b^{n-2}}$ con $b \\ne 0$.",
            "The fraction $\\frac{b^{n+1} - 5b^n}{b^{n-1} - 5b^{n-2}}$ with $b \\ne 0$.",
          ),
          step(
            "approach",
            "Cada polinomio tiene el patrón $b^{k+1} - 5b^k = b^k\\left(b - 5\\right)$; identificar la potencia con el menor exponente en cada lado.",
            "Each polynomial follows the pattern $b^{k+1} - 5b^k = b^k\\left(b - 5\\right)$; identify the power with the smaller exponent on each side.",
          ),
          step(
            "calculation",
            "Numerador: $b^{n+1} - 5b^n = b^n\\left(b - 5\\right)$.<br>Denominador: $b^{n-1} - 5b^{n-2} = b^{n-2}\\left(b - 5\\right)$.<br>$\\dfrac{b^n\\left(b-5\\right)}{b^{n-2}\\left(b-5\\right)} = \\dfrac{b^n}{b^{n-2}} = b^{n-(n-2)} = b^2$.<br>Control con $b = 3$, $n = 2$: $\\frac{27 - 45}{3 - 5} = \\frac{-18}{-2} = 9 = 3^2$ ✓",
            "Numerator: $b^{n+1} - 5b^n = b^n\\left(b - 5\\right)$.<br>Denominator: $b^{n-1} - 5b^{n-2} = b^{n-2}\\left(b - 5\\right)$.<br>$\\dfrac{b^n\\left(b-5\\right)}{b^{n-2}\\left(b-5\\right)} = \\dfrac{b^n}{b^{n-2}} = b^{n-(n-2)} = b^2$.<br>Check at $b = 3$, $n = 2$: $\\frac{27 - 45}{3 - 5} = \\frac{-18}{-2} = 9 = 3^2$ ✓",
          ),
          step(
            "result",
            "$\\dfrac{b^{n+1} - 5b^n}{b^{n-1} - 5b^{n-2}} = b^2$ para $b \\ne 0$ y $b \\ne 5$ (el factor $b - 5$ se cancela, pero el dominio original lo excluye).",
            "$\\dfrac{b^{n+1} - 5b^n}{b^{n-1} - 5b^{n-2}} = b^2$ for $b \\ne 0$ and $b \\ne 5$ (the factor $b - 5$ cancels, but the original domain excludes it).",
          ),
        ],
      };
    },
  ),

  /* Hoja alumna · S2.5 — c^p - c^{p+2} / c^{p+1} + c^p. */
  template(
    {
      id: "rat-simp-09",
      subject: "math",
      topicId: "rational",
      subtopicId: "simplifying",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 180,
      tags: ["rational-expressions", "variable-exponents", "difference-of-squares", "class-sheet"],
      prerequisites: ["simplifying"],
      source: {
        sourceId: "alumna-worksheet-2025",
        license: "TUTOR_LICENSED",
        exerciseNumber: "S2 · 5",
      },
      reasoning: "multi-concept",
    },
    () => {
      return {
        skill: L(
          "Simplificar y quedarse con un binomio lineal (hoja de clase real)",
          "Simplify down to a linear binomial (real class sheet)",
        ),
        statement: L(
          "Factoriza el numerador y el denominador. Simplifica tanto como sea posible (escribe por ejemplo 1-c):\n\n$$\\frac{c^p - c^{p+2}}{c^{p+1} + c^p}$$",
          "Factor the numerator and the denominator. Simplify as far as possible (write e.g. 1-c):\n\n$$\\frac{c^p - c^{p+2}}{c^{p+1} + c^p}$$",
        ),
        answer: {
          kind: "expression",
          accepted: ["1-c", "-c+1", "(1-c)"],
          variables: ["c"],
        },
        hints: [
          L(
            "Numerador: factor común $c^p$ → $c^p\\left(1 - c^2\\right)$. Denominador: factor común $c^p$ → $c^p\\left(c + 1\\right)$.",
            "Numerator: common factor $c^p$ → $c^p\\left(1 - c^2\\right)$. Denominator: common factor $c^p$ → $c^p\\left(c + 1\\right)$.",
          ),
          L(
            "Las $c^p$ se cancelan; el $1 - c^2$ del numerador es una diferencia de cuadrados.",
            "The $c^p$ factors cancel; the $1 - c^2$ in the numerator is a difference of squares.",
          ),
          L(
            "$1 - c^2 = \\left(1 - c\\right)\\left(1 + c\\right)$, y el $\\left(1 + c\\right)$ se cancela con el denominador.",
            "$1 - c^2 = \\left(1 - c\\right)\\left(1 + c\\right)$, and the $\\left(1 + c\\right)$ cancels against the denominator.",
          ),
        ],
        answerDisplay: L(
          "$\\dfrac{c^p - c^{p+2}}{c^{p+1} + c^p} = \\dfrac{c^p\\left(1-c^2\\right)}{c^p\\left(c+1\\right)} = \\dfrac{\\left(1-c\\right)\\left(1+c\\right)}{c+1} = 1 - c$",
          "$\\dfrac{c^p - c^{p+2}}{c^{p+1} + c^p} = \\dfrac{c^p\\left(1-c^2\\right)}{c^p\\left(c+1\\right)} = \\dfrac{\\left(1-c\\right)\\left(1+c\\right)}{c+1} = 1 - c$",
        ),
        solution: [
          step(
            "given",
            "La fracción $\\frac{c^p - c^{p+2}}{c^{p+1} + c^p}$ con $c \\ne 0$.",
            "The fraction $\\frac{c^p - c^{p+2}}{c^{p+1} + c^p}$ with $c \\ne 0$.",
          ),
          step(
            "approach",
            "Factor común $c^p$ en ambos lados, abrir la diferencia de cuadrados del numerador y cancelar.",
            "Common factor $c^p$ on both sides, open the numerator's difference of squares and cancel.",
          ),
          step(
            "calculation",
            "$c^p - c^{p+2} = c^p\\left(1 - c^2\\right) = c^p\\left(1-c\\right)\\left(1+c\\right)$;<br>$c^{p+1} + c^p = c^p\\left(c + 1\\right)$.<br>$\\dfrac{c^p\\left(1-c\\right)\\left(1+c\\right)}{c^p\\left(c+1\\right)} = 1 - c$.<br>Control con $c = 2$, $p = 1$: $\\frac{2 - 8}{4 + 2} = \\frac{-6}{6} = -1 = 1 - 2$ ✓",
            "$c^p - c^{p+2} = c^p\\left(1 - c^2\\right) = c^p\\left(1-c\\right)\\left(1+c\\right)$;<br>$c^{p+1} + c^p = c^p\\left(c + 1\\right)$.<br>$\\dfrac{c^p\\left(1-c\\right)\\left(1+c\\right)}{c^p\\left(c+1\\right)} = 1 - c$.<br>Check at $c = 2$, $p = 1$: $\\frac{2 - 8}{4 + 2} = \\frac{-6}{6} = -1 = 1 - 2$ ✓",
          ),
          step(
            "result",
            "$\\dfrac{c^p - c^{p+2}}{c^{p+1} + c^p} = 1 - c$ para $c \\ne 0$ y $c \\ne -1$: dos factorizaciones encadenadas (común + diferencia de cuadrados).",
            "$\\dfrac{c^p - c^{p+2}}{c^{p+1} + c^p} = 1 - c$ for $c \\ne 0$ and $c \\ne -1$: two chained factorizations (common + difference of squares).",
          ),
        ],
      };
    },
  ),

  /* Hoja alumna · S2.6 — x^{n-1} - x^n / x^{n-2} - x^n. */
  template(
    {
      id: "rat-simp-10",
      subject: "math",
      topicId: "rational",
      subtopicId: "simplifying",
      difficulty: "hard",
      questionType: "expression",
      estimatedTimeSec: 240,
      tags: ["rational-expressions", "variable-exponents", "factoring", "class-sheet"],
      prerequisites: ["simplifying"],
      source: {
        sourceId: "alumna-worksheet-2025",
        license: "TUTOR_LICENSED",
        exerciseNumber: "S2 · 6",
      },
      reasoning: "multi-concept",
    },
    () => {
      return {
        skill: L(
          "El más técnico de la hoja: factor común y diferencia de cuadrados con n (hoja de clase real)",
          "The trickiest on the sheet: common factor and difference of squares with n (real class sheet)",
        ),
        statement: L(
          "Factoriza el numerador y el denominador. Simplifica tanto como sea posible (escribe por ejemplo x/(1+x)):\n\n$$\\frac{x^{n-1} - x^n}{x^{n-2} - x^n}$$",
          "Factor the numerator and the denominator. Simplify as far as possible (write e.g. x/(1+x)):\n\n$$\\frac{x^{n-1} - x^n}{x^{n-2} - x^n}$$",
        ),
        answer: {
          kind: "expression",
          accepted: ["x/(1+x)", "x/(x+1)", "x/(1+x)", "x/(x + 1)"],
          variables: ["x"],
        },
        hints: [
          L(
            "Numerador: el menor exponente es $n-1$ → $x^{n-1}\\left(1 - x\\right)$. Denominador: el menor exponente es $n-2$.",
            "Numerator: the smaller exponent is $n-1$ → $x^{n-1}\\left(1 - x\\right)$. Denominator: the smaller exponent is $n-2$.",
          ),
          L(
            "Denominador: $x^{n-2} - x^n = x^{n-2}\\left(1 - x^2\\right)$, y $1 - x^2 = \\left(1-x\\right)\\left(1+x\\right)$.",
            "Denominator: $x^{n-2} - x^n = x^{n-2}\\left(1 - x^2\\right)$, and $1 - x^2 = \\left(1-x\\right)\\left(1+x\\right)$.",
          ),
          L(
            "Cancela $\\left(1-x\\right)$ y las potencias de $x$: $\\dfrac{x^{n-1}}{x^{n-2}}$ deja un solo factor $x$.",
            "Cancel $\\left(1-x\\right)$ and the powers of $x$: $\\dfrac{x^{n-1}}{x^{n-2}}$ leaves a single factor $x$.",
          ),
        ],
        answerDisplay: L(
          "$\\dfrac{x^{n-1} - x^n}{x^{n-2} - x^n} = \\dfrac{x^{n-1}\\left(1-x\\right)}{x^{n-2}\\left(1-x\\right)\\left(1+x\\right)} = \\dfrac{x}{1+x}$",
          "$\\dfrac{x^{n-1} - x^n}{x^{n-2} - x^n} = \\dfrac{x^{n-1}\\left(1-x\\right)}{x^{n-2}\\left(1-x\\right)\\left(1+x\\right)} = \\dfrac{x}{1+x}$",
        ),
        solution: [
          step(
            "given",
            "La fracción $\\frac{x^{n-1} - x^n}{x^{n-2} - x^n}$ con $x \\ne 0$ — el denominador mezcla exponentes $n-2$ y $n$.",
            "The fraction $\\frac{x^{n-1} - x^n}{x^{n-2} - x^n}$ with $x \\ne 0$ — the denominator mixes exponents $n-2$ and $n$.",
          ),
          step(
            "approach",
            "Factor común con el menor exponente en cada lado; el denominador esconde una diferencia de cuadrados $1 - x^2$.",
            "Common factor with the smaller exponent on each side; the denominator hides a difference of squares $1 - x^2$.",
          ),
          step(
            "calculation",
            "Numerador: $x^{n-1} - x^n = x^{n-1}\\left(1 - x\\right)$.<br>Denominador: $x^{n-2} - x^n = x^{n-2}\\left(1 - x^2\\right) = x^{n-2}\\left(1-x\\right)\\left(1+x\\right)$.<br>$\\dfrac{x^{n-1}\\left(1-x\\right)}{x^{n-2}\\left(1-x\\right)\\left(1+x\\right)} = \\dfrac{x^{n-1}}{x^{n-2}} \\cdot \\dfrac{1}{1+x} = \\dfrac{x}{1+x}$.<br>Control con $x = 2$, $n = 3$: $\\frac{4 - 8}{2 - 8} = \\frac{-4}{-6} = \\frac{2}{3} = \\frac{2}{1+2}$ ✓",
            "Numerator: $x^{n-1} - x^n = x^{n-1}\\left(1 - x\\right)$.<br>Denominator: $x^{n-2} - x^n = x^{n-2}\\left(1 - x^2\\right) = x^{n-2}\\left(1-x\\right)\\left(1+x\\right)$.<br>$\\dfrac{x^{n-1}\\left(1-x\\right)}{x^{n-2}\\left(1-x\\right)\\left(1+x\\right)} = \\dfrac{x^{n-1}}{x^{n-2}} \\cdot \\dfrac{1}{1+x} = \\dfrac{x}{1+x}$.<br>Check at $x = 2$, $n = 3$: $\\frac{4 - 8}{2 - 8} = \\frac{-4}{-6} = \\frac{2}{3} = \\frac{2}{1+2}$ ✓",
          ),
          step(
            "result",
            "$\\dfrac{x^{n-1} - x^n}{x^{n-2} - x^n} = \\dfrac{x}{1 + x}$ para $x \\ne 0, 1, -1$: el denominador exige ver la diferencia de cuadrados antes de cancelar.",
            "$\\dfrac{x^{n-1} - x^n}{x^{n-2} - x^n} = \\dfrac{x}{1 + x}$ for $x \\ne 0, 1, -1$: the denominator demands spotting the difference of squares before cancelling.",
          ),
        ],
      };
    },
  ),

  /* Hoja alumna · S2.7 — 8a^x - 8a^{x-2} / 6a^{x-4} + 6a^{x-3}. */
  template(
    {
      id: "rat-simp-11",
      subject: "math",
      topicId: "rational",
      subtopicId: "simplifying",
      difficulty: "hard",
      questionType: "expression",
      estimatedTimeSec: 270,
      tags: ["rational-expressions", "variable-exponents", "coefficient-gcd", "class-sheet"],
      prerequisites: ["simplifying"],
      source: {
        sourceId: "alumna-worksheet-2025",
        license: "TUTOR_LICENSED",
        exerciseNumber: "S2 · 7",
      },
      reasoning: "multi-concept",
    },
    () => {
      return {
        skill: L(
          "mcd numérico + exponentes literales con resta (hoja de clase real)",
          "Numeric gcd + literal exponents with subtraction (real class sheet)",
        ),
        statement: L(
          "Factoriza el numerador y el denominador. Simplifica tanto como sea posible (escribe por ejemplo 4a^2(a-1)/3):\n\n$$\\frac{8a^x - 8a^{x-2}}{6a^{x-4} + 6a^{x-3}}$$",
          "Factor the numerator and the denominator. Simplify as far as possible (write e.g. 4a^2(a-1)/3):\n\n$$\\frac{8a^x - 8a^{x-2}}{6a^{x-4} + 6a^{x-3}}$$",
        ),
        answer: {
          kind: "expression",
          accepted: ["4a^2(a-1)/3", "(4/3)a^2(a-1)", "4(a^2(a-1))/3", "(4a^3-4a^2)/3"],
          variables: ["a"],
        },
        hints: [
          L(
            "Numerador: factor común $8a^{x-2}$ (coeficiente 8 y menor exponente $x-2$). Denominador: factor común $6a^{x-4}$.",
            "Numerator: common factor $8a^{x-2}$ (coefficient 8 and smaller exponent $x-2$). Denominator: common factor $6a^{x-4}$.",
          ),
          L(
            "$8a^x - 8a^{x-2} = 8a^{x-2}\\left(a^2 - 1\\right)$ y $6a^{x-4} + 6a^{x-3} = 6a^{x-4}\\left(1 + a\\right)$.",
            "$8a^x - 8a^{x-2} = 8a^{x-2}\\left(a^2 - 1\\right)$ and $6a^{x-4} + 6a^{x-3} = 6a^{x-4}\\left(1 + a\\right)$.",
          ),
          L(
            "Abre $a^2 - 1 = \\left(a-1\\right)\\left(a+1\\right)$, cancela $\\left(a+1\\right)$, y junta coeficientes ($\\frac{8}{6}$) y potencias ($\\frac{a^{x-2}}{a^{x-4}}$).",
            "Open $a^2 - 1 = \\left(a-1\\right)\\left(a+1\\right)$, cancel $\\left(a+1\\right)$, then combine coefficients ($\\frac{8}{6}$) and powers ($\\frac{a^{x-2}}{a^{x-4}}$).",
          ),
        ],
        answerDisplay: L(
          "$\\dfrac{8a^x - 8a^{x-2}}{6a^{x-4} + 6a^{x-3}} = \\dfrac{8a^{x-2}\\left(a^2-1\\right)}{6a^{x-4}\\left(1+a\\right)} = \\dfrac{4a^2\\left(a-1\\right)}{3}$",
          "$\\dfrac{8a^x - 8a^{x-2}}{6a^{x-4} + 6a^{x-3}} = \\dfrac{8a^{x-2}\\left(a^2-1\\right)}{6a^{x-4}\\left(1+a\\right)} = \\dfrac{4a^2\\left(a-1\\right)}{3}$",
        ),
        solution: [
          step(
            "given",
            "La fracción $\\frac{8a^x - 8a^{x-2}}{6a^{x-4} + 6a^{x-3}}$ con $a \\ne 0$ y exponentes referidos a $x$.",
            "The fraction $\\frac{8a^x - 8a^{x-2}}{6a^{x-4} + 6a^{x-3}}$ with $a \\ne 0$ and exponents relative to $x$.",
          ),
          step(
            "approach",
            "Factor común completo en cada lado (coeficiente y potencia de menor exponente), abrir la diferencia de cuadrados y cancelar por partes: números, potencias y el binomio.",
            "Full common factor on each side (coefficient and smaller-exponent power), open the difference of squares, then cancel piecewise: numbers, powers and the binomial.",
          ),
          step(
            "calculation",
            "Numerador: $8a^x - 8a^{x-2} = 8a^{x-2}\\left(a^2 - 1\\right) = 8a^{x-2}\\left(a-1\\right)\\left(a+1\\right)$.<br>Denominador: $6a^{x-4} + 6a^{x-3} = 6a^{x-4}\\left(1 + a\\right)$.<br>$\\dfrac{8a^{x-2}\\left(a-1\\right)\\left(a+1\\right)}{6a^{x-4}\\left(a+1\\right)} = \\dfrac{8}{6} \\cdot \\dfrac{a^{x-2}}{a^{x-4}} \\cdot \\left(a-1\\right) = \\dfrac{4}{3}\\,a^{(x-2)-(x-4)}\\left(a-1\\right) = \\dfrac{4a^2\\left(a-1\\right)}{3}$.<br>Control con $a = 2$, $x = 4$: $\\frac{128 - 32}{6 + 12} = \\frac{96}{18} = \\frac{16}{3}$ y $\\frac{4 \\cdot 4 \\cdot 1}{3} = \\frac{16}{3}$ ✓",
            "Numerator: $8a^x - 8a^{x-2} = 8a^{x-2}\\left(a^2 - 1\\right) = 8a^{x-2}\\left(a-1\\right)\\left(a+1\\right)$.<br>Denominator: $6a^{x-4} + 6a^{x-3} = 6a^{x-4}\\left(1 + a\\right)$.<br>$\\dfrac{8a^{x-2}\\left(a-1\\right)\\left(a+1\\right)}{6a^{x-4}\\left(a+1\\right)} = \\dfrac{8}{6} \\cdot \\dfrac{a^{x-2}}{a^{x-4}} \\cdot \\left(a-1\\right) = \\dfrac{4}{3}\\,a^{(x-2)-(x-4)}\\left(a-1\\right) = \\dfrac{4a^2\\left(a-1\\right)}{3}$.<br>Check at $a = 2$, $x = 4$: $\\frac{128 - 32}{6 + 12} = \\frac{96}{18} = \\frac{16}{3}$ and $\\frac{4 \\cdot 4 \\cdot 1}{3} = \\frac{16}{3}$ ✓",
          ),
          step(
            "result",
            "$\\dfrac{8a^x - 8a^{x-2}}{6a^{x-4} + 6a^{x-3}} = \\dfrac{4a^2\\left(a-1\\right)}{3}$ para $a \\ne 0, -1$: el exponente $x$ desaparece al restar $(x-2)-(x-4) = 2$.",
            "$\\dfrac{8a^x - 8a^{x-2}}{6a^{x-4} + 6a^{x-3}} = \\dfrac{4a^2\\left(a-1\\right)}{3}$ for $a \\ne 0, -1$: the exponent $x$ disappears because $(x-2)-(x-4) = 2$.",
          ),
        ],
      };
    },
  ),

  /* ================================================================== */
  /* Curated — ESPOL Fundamentos, EDICIÓN DIGITAL (TUTOR_LICENSED).      */
  /* Chapter 2 «Ejercicios propuestos», pp. 231-235 (PDF 264-268).      */
  /* Tutor's brief: the most difficult / integrative ones.              */
  /* Double-verified: printed key pp. 938-939 + sympy (41/41 checks).   */
  /* ================================================================== */

  /* 35l — telescoping chain → 16a^15/(1−a^16). Key: idem. */
  template(
    {
      id: "rat-espol-ch2-35l",
      subject: "math",
      topicId: "rational",
      subtopicId: "simplifying",
      difficulty: "hard",
      questionType: "expression",
      estimatedTimeSec: 300,
      tags: ["simplifying", "telescoping", "pattern"],
      prerequisites: ["add-sub"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 35l",
        page: 231,
      },
      reasoning: "multi-concept",
    },
    () => ({
      skill: L("Cadena telescópica: cada resta duplica el patrón", "Telescoping chain: each subtraction doubles the pattern"),
      statement: L(
        "Simplifica: $$\\frac{1}{1 - a} - \\frac{1}{1 + a} - \\frac{2a}{1 + a^{2}} - \\frac{4a^{3}}{1 + a^{4}} - \\frac{8a^{7}}{1 + a^{8}}$$",
        "Simplify: $$\\frac{1}{1 - a} - \\frac{1}{1 + a} - \\frac{2a}{1 + a^{2}} - \\frac{4a^{3}}{1 + a^{4}} - \\frac{8a^{7}}{1 + a^{8}}$$",
      ),
      answer: {
        kind: "expression",
        accepted: ["16a^15/(1-a^16)", "(16a^15)/(1-a^16)"],
        variables: ["a"],
      },
      hints: [
        L(
          "Opera de izquierda a derecha, de dos en dos: primero $\\frac{1}{1-a} - \\frac{1}{1+a}$ sobre el denominador común $1 - a^{2}$.",
          "Work left to right, two at a time: first $\\frac{1}{1-a} - \\frac{1}{1+a}$ over the common denominator $1 - a^{2}$.",
        ),
        L(
          "$\\frac{1}{1-a} - \\frac{1}{1+a} = \\frac{2a}{1-a^{2}}$; y al restarle $\\frac{2a}{1+a^{2}}$ queda $\\frac{4a^{3}}{1-a^{4}}$. El patrón se repite: numerador $2^{k}a^{2k-1}$, denominador «1 − potencia».",
          "$\\frac{1}{1-a} - \\frac{1}{1+a} = \\frac{2a}{1-a^{2}}$; and subtracting $\\frac{2a}{1+a^{2}}$ leaves $\\frac{4a^{3}}{1-a^{4}}$. The pattern repeats: numerator $2^{k}a^{2k-1}$, denominator “1 − a power”.",
        ),
        L(
          "Después de la última resta el denominador es $1 - a^{16}$ y el numerador $16a^{15}$ (siguiendo la secuencia 2, 4, 8 → 16 y exponentes 1, 3, 7 → 15).",
          "After the last subtraction the denominator is $1 - a^{16}$ and the numerator $16a^{15}$ (following the sequence 2, 4, 8 → 16 and exponents 1, 3, 7 → 15).",
        ),
      ],
      answerDisplay: L(
        "$\\dfrac{16a^{15}}{1 - a^{16}}$",
        "$\\dfrac{16a^{15}}{1 - a^{16}}$",
      ),
      solution: [
        step(
          "given",
          "La cadena $\\frac{1}{1-a} - \\frac{1}{1+a} - \\frac{2a}{1+a^{2}} - \\frac{4a^{3}}{1+a^{4}} - \\frac{8a^{7}}{1+a^{8}}$.",
          "The chain $\\frac{1}{1-a} - \\frac{1}{1+a} - \\frac{2a}{1+a^{2}} - \\frac{4a^{3}}{1+a^{4}} - \\frac{8a^{7}}{1+a^{8}}$.",
        ),
        step(
          "approach",
          "No busques el denominador común total: la cadena está diseñada para que cada resta deje la semilla de la siguiente (estructura telescópica).",
          "Do not look for the full common denominator: the chain is designed so each subtraction leaves the seed of the next one (telescoping structure).",
        ),
        step(
          "calculation",
          "$\\frac{1}{1-a} - \\frac{1}{1+a} = \\frac{(1+a)-(1-a)}{1-a^{2}} = \\frac{2a}{1-a^{2}}$<br>$\\frac{2a}{1-a^{2}} - \\frac{2a}{1+a^{2}} = \\frac{2a\\left[(1+a^{2})-(1-a^{2})\\right]}{1-a^{4}} = \\frac{4a^{3}}{1-a^{4}}$<br>$\\frac{4a^{3}}{1-a^{4}} - \\frac{4a^{3}}{1+a^{4}} = \\frac{8a^{7}}{1-a^{8}}$<br>$\\frac{8a^{7}}{1-a^{8}} - \\frac{8a^{7}}{1+a^{8}} = \\frac{16a^{15}}{1-a^{16}}$",
          "$\\frac{1}{1-a} - \\frac{1}{1+a} = \\frac{(1+a)-(1-a)}{1-a^{2}} = \\frac{2a}{1-a^{2}}$<br>$\\frac{2a}{1-a^{2}} - \\frac{2a}{1+a^{2}} = \\frac{2a\\left[(1+a^{2})-(1-a^{2})\\right]}{1-a^{4}} = \\frac{4a^{3}}{1-a^{4}}$<br>$\\frac{4a^{3}}{1-a^{4}} - \\frac{4a^{3}}{1+a^{4}} = \\frac{8a^{7}}{1-a^{8}}$<br>$\\frac{8a^{7}}{1-a^{8}} - \\frac{8a^{7}}{1+a^{8}} = \\frac{16a^{15}}{1-a^{16}}$",
        ),
        step(
          "result",
          "$\\frac{16a^{15}}{1 - a^{16}}$. Verificación con $a = \\frac{1}{2}$: la cadena da $\\approx 0{,}000488$ y $\\frac{16a^{15}}{1-a^{16}} = \\frac{16/32768}{1 - 1/65536} \\approx 0{,}000488$ ✓ (misma cifra).",
          "$\\frac{16a^{15}}{1 - a^{16}}$. Check at $a = \\frac{1}{2}$: the chain gives $\\approx 0.000488$ and $\\frac{16a^{15}}{1-a^{16}} = \\frac{16/32768}{1 - 1/65536} \\approx 0.000488$ ✓ (same figure).",
        ),
      ],
    }),
  ),

  /* 37a — cyclic sum → 0. Key: 0. */
  template(
    {
      id: "rat-espol-ch2-37a",
      subject: "math",
      topicId: "rational",
      subtopicId: "simplifying",
      difficulty: "hard",
      questionType: "expression",
      estimatedTimeSec: 270,
      tags: ["simplifying", "cyclic", "common-denominator"],
      prerequisites: ["add-sub"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 37a",
        page: 232,
      },
      reasoning: "multi-concept",
    },
    () => ({
      skill: L("Suma cíclica sobre el denominador (a−b)(b−c)(c−a)", "Cyclic sum over the denominator (a−b)(b−c)(c−a)"),
      statement: L(
        "Simplifica: $$\\frac{1}{(a - b)(a - c)} + \\frac{1}{(b - c)(b - a)} + \\frac{1}{(c - a)(c - b)}$$",
        "Simplify: $$\\frac{1}{(a - b)(a - c)} + \\frac{1}{(b - c)(b - a)} + \\frac{1}{(c - a)(c - b)}$$",
      ),
      answer: {
        kind: "expression",
        accepted: ["0"],
        variables: ["a", "b", "c"],
      },
      hints: [
        L(
          "El denominador común natural es $(a-b)(b-c)(c-a)$. Reescribe cada fracción multiplicando arriba y abajo por lo que falta.",
          "The natural common denominator is $(a-b)(b-c)(c-a)$. Rewrite each fraction by multiplying top and bottom by what is missing.",
        ),
        L(
          "Cuidado con los signos: $a - c = -(c-a)$ y $b - a = -(a-b)$. La primera fracción queda $\\frac{-(b - c)}{(a-b)(b-c)(c-a)}$.",
          "Mind the signs: $a - c = -(c-a)$ and $b - a = -(a-b)$. The first fraction becomes $\\frac{-(b - c)}{(a-b)(b-c)(c-a)}$.",
        ),
        L(
          "Suma los tres numeradores: $-(b-c) - (c-a) - (a-b)$. ¿Cuánto da?",
          "Add the three numerators: $-(b-c) - (c-a) - (a-b)$. How much is that?",
        ),
      ],
      answerDisplay: L("$0$", "$0$"),
      solution: [
        step(
          "given",
          "$S = \\frac{1}{(a-b)(a-c)} + \\frac{1}{(b-c)(b-a)} + \\frac{1}{(c-a)(c-b)}$, con $a, b, c$ distintos dos a dos.",
          "$S = \\frac{1}{(a-b)(a-c)} + \\frac{1}{(b-c)(b-a)} + \\frac{1}{(c-a)(c-b)}$, with $a, b, c$ pairwise distinct.",
        ),
        step(
          "approach",
          "Denominador común $D = (a-b)(b-c)(c-a)$, controlando los signos al reescribir cada factor «invertido» (como $a-c = -(c-a)$).",
          "Common denominator $D = (a-b)(b-c)(c-a)$, controlling the signs while rewriting each “inverted” factor (such as $a-c = -(c-a)$).",
        ),
        step(
          "calculation",
          "$\\frac{1}{(a-b)(a-c)} = \\frac{-(b-c)}{D}$ &nbsp;(falta $b-c$; $a-c = -(c-a)$)<br>$\\frac{1}{(b-c)(b-a)} = \\frac{-(c-a)}{D}$ &nbsp;(falta $c-a$; $b-a = -(a-b)$)<br>$\\frac{1}{(c-a)(c-b)} = \\frac{-(a-b)}{D}$ &nbsp;(falta $a-b$; $c-b = -(b-c)$)<br>$S = \\frac{-\\left[(b-c) + (c-a) + (a-b)\\right]}{D} = \\frac{0}{D}$",
          "$\\frac{1}{(a-b)(a-c)} = \\frac{-(b-c)}{D}$ &nbsp;($b-c$ missing; $a-c = -(c-a)$)<br>$\\frac{1}{(b-c)(b-a)} = \\frac{-(c-a)}{D}$ &nbsp;($c-a$ missing; $b-a = -(a-b)$)<br>$\\frac{1}{(c-a)(c-b)} = \\frac{-(a-b)}{D}$ &nbsp;($a-b$ missing; $c-b = -(b-c)$)<br>$S = \\frac{-\\left[(b-c) + (c-a) + (a-b)\\right]}{D} = \\frac{0}{D}$",
        ),
        step(
          "result",
          "$S = 0$: los tres numeradores se cancelan en cadena. Verificación con $(a,b,c) = (1,2,3)$: $\\frac{1}{2} - 1 + \\frac{1}{2} = 0$ ✓.",
          "$S = 0$: the three numerators cancel in a chain. Check at $(a,b,c) = (1,2,3)$: $\\frac{1}{2} - 1 + \\frac{1}{2} = 0$ ✓.",
        ),
      ],
    }),
  ),

  /* 37b — a/(a²−1)+… − 2a²/(a⁴−1) → a/(a²−1). Key: idem. */
  template(
    {
      id: "rat-espol-ch2-37b",
      subject: "math",
      topicId: "rational",
      subtopicId: "simplifying",
      difficulty: "hard",
      questionType: "expression",
      estimatedTimeSec: 300,
      tags: ["simplifying", "factor-denominators", "difference-of-squares"],
      prerequisites: ["add-sub"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 37b",
        page: 232,
      },
      reasoning: "multi-concept",
    },
    () => ({
      skill: L("Factorizar los denominadores antes de sumar", "Factor the denominators before adding"),
      statement: L(
        "Simplifica: $$\\frac{a}{a^{2} - 1} + \\frac{a^{2} + a - 1}{a^{3} - a^{2} + a - 1} - \\frac{a^{2} + a + 1}{a^{3} + a^{2} + a + 1} - \\frac{2a^{2}}{a^{4} - 1}$$",
        "Simplify: $$\\frac{a}{a^{2} - 1} + \\frac{a^{2} + a - 1}{a^{3} - a^{2} + a - 1} - \\frac{a^{2} + a + 1}{a^{3} + a^{2} + a + 1} - \\frac{2a^{2}}{a^{4} - 1}$$",
      ),
      answer: {
        kind: "expression",
        accepted: ["a/(a^2-1)", "a/((a-1)(a+1))"],
        variables: ["a"],
      },
      hints: [
        L(
          "Factoriza los tres denominadores «largos»: $a^{3} - a^{2} + a - 1 = (a - 1)(a^{2} + 1)$, $a^{3} + a^{2} + a + 1 = (a + 1)(a^{2} + 1)$ y $a^{4} - 1 = (a^{2} - 1)(a^{2} + 1)$.",
          "Factor the three “long” denominators: $a^{3} - a^{2} + a - 1 = (a - 1)(a^{2} + 1)$, $a^{3} + a^{2} + a + 1 = (a + 1)(a^{2} + 1)$ and $a^{4} - 1 = (a^{2} - 1)(a^{2} + 1)$.",
        ),
        L(
          "Con eso, el denominador común es $a^{4} - 1 = (a-1)(a+1)(a^{2}+1)$; reescribe las cuatro fracciones sobre él.",
          "With that, the common denominator is $a^{4} - 1 = (a-1)(a+1)(a^{2}+1)$; rewrite the four fractions over it.",
        ),
        L(
          "El numerador total queda $a^{3} + a$; al final factoriza y cancela con el denominador.",
          "The total numerator comes out as $a^{3} + a$; factor it at the end and cancel with the denominator.",
        ),
      ],
      answerDisplay: L(
        "$\\dfrac{a}{a^{2} - 1}$",
        "$\\dfrac{a}{a^{2} - 1}$",
      ),
      solution: [
        step(
          "given",
          "$S = \\frac{a}{a^{2}-1} + \\frac{a^{2}+a-1}{a^{3}-a^{2}+a-1} - \\frac{a^{2}+a+1}{a^{3}+a^{2}+a+1} - \\frac{2a^{2}}{a^{4}-1}$.",
          "$S = \\frac{a}{a^{2}-1} + \\frac{a^{2}+a-1}{a^{3}-a^{2}+a-1} - \\frac{a^{2}+a+1}{a^{3}+a^{2}+a+1} - \\frac{2a^{2}}{a^{4}-1}$.",
        ),
        step(
          "approach",
          "Factorizar denominadores por agrupación; con el denominador común $a^{4}-1$ la suma se vuelve un simple conteo de numeradores.",
          "Factor denominators by grouping; with the common denominator $a^{4}-1$ the sum becomes a simple count of numerators.",
        ),
        step(
          "calculation",
          "$a^{3}-a^{2}+a-1 = (a-1)(a^{2}+1)$; $a^{3}+a^{2}+a+1 = (a+1)(a^{2}+1)$; $a^{4}-1 = (a^{2}-1)(a^{2}+1)$.<br>Sobre $D = a^{4}-1$:<br>$\\frac{a}{a^{2}-1} = \\frac{a(a^{2}+1)}{D}$; $\\frac{a^{2}+a-1}{(a-1)(a^{2}+1)} = \\frac{(a^{2}+a-1)(a+1)}{D}$; $\\frac{a^{2}+a+1}{(a+1)(a^{2}+1)} = \\frac{(a^{2}+a+1)(a-1)}{D}$.<br>Numerador: $a^{3}+a + (a^{3}+2a^{2}-1) - (a^{3}-1) - 2a^{2} = a^{3} + a$.<br>$S = \\frac{a^{3}+a}{a^{4}-1} = \\frac{a(a^{2}+1)}{(a^{2}-1)(a^{2}+1)} = \\frac{a}{a^{2}-1}$.",
          "$a^{3}-a^{2}+a-1 = (a-1)(a^{2}+1)$; $a^{3}+a^{2}+a+1 = (a+1)(a^{2}+1)$; $a^{4}-1 = (a^{2}-1)(a^{2}+1)$.<br>Over $D = a^{4}-1$:<br>$\\frac{a}{a^{2}-1} = \\frac{a(a^{2}+1)}{D}$; $\\frac{a^{2}+a-1}{(a-1)(a^{2}+1)} = \\frac{(a^{2}+a-1)(a+1)}{D}$; $\\frac{a^{2}+a+1}{(a+1)(a^{2}+1)} = \\frac{(a^{2}+a+1)(a-1)}{D}$.<br>Numerator: $a^{3}+a + (a^{3}+2a^{2}-1) - (a^{3}-1) - 2a^{2} = a^{3} + a$.<br>$S = \\frac{a^{3}+a}{a^{4}-1} = \\frac{a(a^{2}+1)}{(a^{2}-1)(a^{2}+1)} = \\frac{a}{a^{2}-1}$.",
        ),
        step(
          "result",
          "$S = \\frac{a}{a^{2}-1}$. Verificación con $a = 2$: cadena $= \\frac{2}{3} + \\frac{5}{5} - \\frac{7}{15} - \\frac{8}{15} = \\frac{2}{3} + 1 - 1 = \\frac{2}{3}$ y $\\frac{a}{a^{2}-1} = \\frac{2}{3}$ ✓.",
          "$S = \\frac{a}{a^{2}-1}$. Check at $a = 2$: chain $= \\frac{2}{3} + \\frac{5}{5} - \\frac{7}{15} - \\frac{8}{15} = \\frac{2}{3} + 1 - 1 = \\frac{2}{3}$ and $\\frac{a}{a^{2}-1} = \\frac{2}{3}$ ✓.",
        ),
      ],
    }),
  ),

  /* 37d — (a+b)/((b−c)(c−a)) + … → (a+c)/((c−a)(a−b)). Key: idem. */
  template(
    {
      id: "rat-espol-ch2-37d",
      subject: "math",
      topicId: "rational",
      subtopicId: "simplifying",
      difficulty: "hard",
      questionType: "expression",
      estimatedTimeSec: 300,
      tags: ["simplifying", "cyclic", "common-denominator", "signs"],
      prerequisites: ["add-sub"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 37d",
        page: 232,
      },
      reasoning: "multi-concept",
    },
    () => ({
      skill: L("Suma cíclica con signos cruzados (¡cuidado con el tercero!)", "Cyclic sum with crossed signs (mind the third one!)"),
      statement: L(
        "Simplifica: $$\\frac{a + b}{(b - c)(c - a)} + \\frac{b + c}{(c - a)(a - b)} + \\frac{c + a}{(a - c)(b - c)}$$",
        "Simplify: $$\\frac{a + b}{(b - c)(c - a)} + \\frac{b + c}{(c - a)(a - b)} + \\frac{c + a}{(a - c)(b - c)}$$",
      ),
      answer: {
        kind: "expression",
        accepted: ["(a+c)/((c-a)(a-b))", "(a+c)/((a-b)(c-a))"],
        variables: ["a", "b", "c"],
      },
      hints: [
        L(
          "Denominador común $D = (a-b)(b-c)(c-a)$. Los dos primeros términos se reescriben limpios; el tercero tiene $(a-c)(b-c) = (c-a)(c-b)$ — ojo, es el que NO sigue el patrón.",
          "Common denominator $D = (a-b)(b-c)(c-a)$. The first two terms rewrite cleanly; the third has $(a-c)(b-c) = (c-a)(c-b)$ — watch out, it is the one NOT following the pattern.",
        ),
        L(
          "Sobre $D$: el primero aporta $(a+b)(a-b) = a^{2} - b^{2}$; el segundo aporta $(b+c)(b-c) = b^{2} - c^{2}$.",
          "Over $D$: the first contributes $(a+b)(a-b) = a^{2} - b^{2}$; the second contributes $(b+c)(b-c) = b^{2} - c^{2}$.",
        ),
        L(
          "El tercero aporta $-(c+a)(a-b)$. Suma los tres numeradores y factoriza el resultado: debería quedarte un binomio por $D$.",
          "The third contributes $-(c+a)(a-b)$. Add the three numerators and factor: you should be left with one binomial over $D$.",
        ),
      ],
      answerDisplay: L(
        "$\\dfrac{a + c}{(c - a)(a - b)}$",
        "$\\dfrac{a + c}{(c - a)(a - b)}$",
      ),
      solution: [
        step(
          "given",
          "$S = \\frac{a+b}{(b-c)(c-a)} + \\frac{b+c}{(c-a)(a-b)} + \\frac{c+a}{(a-c)(b-c)}$, con $a, b, c$ distintos dos a dos.",
          "$S = \\frac{a+b}{(b-c)(c-a)} + \\frac{b+c}{(c-a)(a-b)} + \\frac{c+a}{(a-c)(b-c)}$, with $a, b, c$ pairwise distinct.",
        ),
        step(
          "approach",
          "Denominador común $D = (a-b)(b-c)(c-a)$. Como el tercer término impreso usa $(a-c)$ y $(b-c)$ (equivalente a $(c-a)(c-b)$), su aporte sobre $D$ lleva signo distinto: $D / (a-c)(b-c) = -(a-b)$.",
          "Common denominator $D = (a-b)(b-c)(c-a)$. Since the printed third term uses $(a-c)$ and $(b-c)$ (equal to $(c-a)(c-b)$), its contribution over $D$ carries a different sign: $D / (a-c)(b-c) = -(a-b)$.",
        ),
        step(
          "calculation",
          "Término 1 sobre $D$: $\\frac{(a+b)(a-b)}{D} = \\frac{a^{2}-b^{2}}{D}$<br>Término 2 sobre $D$: $\\frac{(b+c)(b-c)}{D} = \\frac{b^{2}-c^{2}}{D}$<br>Término 3 sobre $D$: $\\frac{(c+a)\\cdot\\left[-(a-b)\\right]}{D} = \\frac{-(c+a)(a-b)}{D}$<br>Numerador total: $(a^{2}-b^{2}) + (b^{2}-c^{2}) - (c+a)(a-b) = ab + bc - ac - c^{2} = (a+c)(b-c)$.<br>$S = \\frac{(a+c)(b-c)}{D} = \\frac{(a+c)(b-c)}{(a-b)(b-c)(c-a)} = \\frac{a+c}{(a-b)(c-a)}$.",
          "Term 1 over $D$: $\\frac{(a+b)(a-b)}{D} = \\frac{a^{2}-b^{2}}{D}$<br>Term 2 over $D$: $\\frac{(b+c)(b-c)}{D} = \\frac{b^{2}-c^{2}}{D}$<br>Term 3 over $D$: $\\frac{(c+a)\\cdot\\left[-(a-b)\\right]}{D} = \\frac{-(c+a)(a-b)}{D}$<br>Total numerator: $(a^{2}-b^{2}) + (b^{2}-c^{2}) - (c+a)(a-b) = ab + bc - ac - c^{2} = (a+c)(b-c)$.<br>$S = \\frac{(a+c)(b-c)}{D} = \\frac{(a+c)(b-c)}{(a-b)(b-c)(c-a)} = \\frac{a+c}{(a-b)(c-a)}$.",
        ),
        step(
          "result",
          "$S = \\frac{a+c}{(c-a)(a-b)}$ (equivalente a $\\frac{a+c}{(a-b)(c-a)}$, forma impresa en la clave). Verificación con $(a,b,c) = (0,1,2)$: cadena $= -\\frac{1}{2} - \\frac{3}{2} + 1 = -1$ y $\\frac{a+c}{(a-b)(c-a)} = \\frac{2}{(-1)(2)} = -1$ ✓.",
          "$S = \\frac{a+c}{(c-a)(a-b)}$ (same as $\\frac{a+c}{(a-b)(c-a)}$, the form printed in the key). Check at $(a,b,c) = (0,1,2)$: chain $= -\\frac{1}{2} - \\frac{3}{2} + 1 = -1$ and $\\frac{a+c}{(a-b)(c-a)} = \\frac{2}{(-1)(2)} = -1$ ✓.",
        ),
      ],
    }),
  ),

  /* 48 — 2/(x+5)+1/(x−5)+20/(x²−25)=0 → ∅ (x=−5 es agujero). Key: ∅. */
  template(
    {
      id: "rat-espol-ch2-48",
      subject: "math",
      topicId: "rational",
      subtopicId: "equations",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 180,
      tags: ["equation", "domain", "extraneous-root"],
      prerequisites: ["simplifying"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 48",
        page: 235,
      },
      reasoning: "spurious",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$A_{p(x)} = \\varnothing$`, `$A_{p(x)} = \\varnothing$`), correct: true },
        { id: "b", text: L(`$A_{p(x)} = \\{-5\\}$`, `$A_{p(x)} = \\{-5\\}$`), correct: false },
        { id: "c", text: L(`$A_{p(x)} = \\{5,\\ -5\\}$`, `$A_{p(x)} = \\{5,\\ -5\\}$`), correct: false },
        { id: "d", text: L(`$A_{p(x)} = \\{5\\}$`, `$A_{p(x)} = \\{5\\}$`), correct: false },
        { id: "e", text: L(`$A_{p(x)} = \\{0,\\ -5\\}$`, `$A_{p(x)} = \\{0,\\ -5\\}$`), correct: false },
      ];
      return {
        skill: L("Ecuación racional: la raíz del numerador puede ser agujero", "Rational equation: the numerator's root may be a hole"),
        statement: L(
          "Con $x \\in \\mathbb{R}$, determina el conjunto de verdad de $$p(x):\\ \\frac{2}{x + 5} + \\frac{1}{x - 5} + \\frac{20}{x^{2} - 25} = 0.$$",
          "With $x \\in \\mathbb{R}$, determine the truth set of $$p(x):\\ \\frac{2}{x + 5} + \\frac{1}{x - 5} + \\frac{20}{x^{2} - 25} = 0.$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El denominador común es $(x+5)(x-5) = x^{2} - 25$; antes que nada, anota qué valores de $x$ están prohibidos.",
            "The common denominator is $(x+5)(x-5) = x^{2} - 25$; before anything else, note which $x$ values are forbidden.",
          ),
          L(
            "Sobre $x^{2} - 25$: el numerador combinado es $2(x-5) + (x+5) + 20 = 3x + 15$, con raíz $x = -5$.",
            "Over $x^{2} - 25$: the combined numerator is $2(x-5) + (x+5) + 20 = 3x + 15$, whose root is $x = -5$.",
          ),
          L(
            "Comprueba esa raíz candidata contra el dominio: ¿es válida o queda anulada por el denominador?",
            "Test that candidate root against the domain: is it valid, or is it killed by the denominator?",
          ),
        ],
        answerDisplay: L("$A_{p(x)} = \\varnothing$", "$A_{p(x)} = \\varnothing$"),
        solution: [
          step(
            "given",
            "$\\frac{2}{x+5} + \\frac{1}{x-5} + \\frac{20}{x^{2}-25} = 0$; dominio: $x \\neq \\pm 5$.",
            "$\\frac{2}{x+5} + \\frac{1}{x-5} + \\frac{20}{x^{2}-25} = 0$; domain: $x \\neq \\pm 5$.",
          ),
          step(
            "approach",
            "Combinar sobre $x^{2}-25$ y resolver el numerador; toda raíz del numerador debe pasar el filtro del dominio.",
            "Combine over $x^{2}-25$ and solve the numerator; every numerator root must pass the domain filter.",
          ),
          step(
            "calculation",
            "$\\frac{2(x-5) + (x+5) + 20}{x^{2}-25} = 0 \\Rightarrow \\frac{3x + 15}{x^{2}-25} = 0$<br>Numerador: $3x + 15 = 0 \\Rightarrow x = -5$.<br>Pero $x = -5$ anula el denominador ($x^{2} - 25 = 0$): es un agujero, no solución. De hecho la fracción reducida es $\\frac{3}{x-5}$, que nunca vale 0.",
            "$\\frac{2(x-5) + (x+5) + 20}{x^{2}-25} = 0 \\Rightarrow \\frac{3x + 15}{x^{2}-25} = 0$<br>Numerator: $3x + 15 = 0 \\Rightarrow x = -5$.<br>But $x = -5$ zeroes the denominator ($x^{2} - 25 = 0$): it is a hole, not a solution. Indeed the reduced fraction is $\\frac{3}{x-5}$, which is never 0.",
          ),
          step(
            "result",
            "$A_{p(x)} = \\varnothing$: la única candidata ($x = -5$) queda excluida por el dominio. Una fracción con numerador no nulo nunca es cero.",
            "$A_{p(x)} = \\varnothing$: the only candidate ($x = -5$) is excluded by the domain. A fraction with non-zero numerator is never zero.",
          ),
        ],
      };
    },
  ),

  /* ================================================================== */
  /* Curated — ESPOL Fundamentos, EDICIÓN DIGITAL (TUTOR_LICENSED).      */
  /* §2.9 «Inecuaciones» racionales (pp. 242-243) + Capítulo 3           */
  /* «Funciones de variable real» §3.4 Asíntotas (p. 371).               */
  /* Double-verified: printed key pp. 938-939 + sympy                    */
  /* (download/verify_espol_ch3.py). #93c: the absolute-value bars       */
  /* around the fraction were lost in the text layer — confirmed         */
  /* visually against the printed page.                                   */
  /* ================================================================== */

  /* 93c — |(x−3)/(x−4)| < 5/2 → (−∞,26/7) ∪ (14/3,+∞). */
  template(
    {
      id: "rat-espol-ch2-93c",
      subject: "math",
      topicId: "rational",
      subtopicId: "inequalities",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 270,
      tags: ["rational-inequality", "absolute-value", "double-inequality"],
      prerequisites: ["equations", "domain"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 93c",
        page: 243,
      },
      reasoning: "multi-concept",
    },
    (rng) => ({
      skill: L("Valor absoluto de una fracción: desigualdad doble racional", "Absolute value of a fraction: a rational double inequality"),
      statement: L(
        "Resuelve $\\left| \\dfrac{x - 3}{x - 4} \\right| < \\dfrac{5}{2}$, $x \\in \\mathbb{R}$. El conjunto solución es:",
        "Solve $\\left| \\dfrac{x - 3}{x - 4} \\right| < \\dfrac{5}{2}$, $x \\in \\mathbb{R}$. The solution set is:",
      ),
      answer: {
        kind: "multiple-choice",
        options: rng.shuffle([
          { id: "a", text: L("$\\left(-\\infty,\\ \\dfrac{26}{7}\\right) \\cup \\left(\\dfrac{14}{3},\\ +\\infty\\right)$", "$\\left(-\\infty,\\ \\dfrac{26}{7}\\right) \\cup \\left(\\dfrac{14}{3},\\ +\\infty\\right)$"), correct: true },
          { id: "b", text: L("$\\left(-\\infty,\\ 4\\right) \\cup \\left(\\dfrac{14}{3},\\ +\\infty\\right)$", "$\\left(-\\infty,\\ 4\\right) \\cup \\left(\\dfrac{14}{3},\\ +\\infty\\right)$"), correct: false },
          { id: "c", text: L("$\\left(\\dfrac{26}{7},\\ \\dfrac{14}{3}\\right)$", "$\\left(\\dfrac{26}{7},\\ \\dfrac{14}{3}\\right)$"), correct: false },
          { id: "d", text: L("$\\left(-\\infty,\\ \\dfrac{26}{7}\\right) \\cup (4, +\\infty)$", "$\\left(-\\infty,\\ \\dfrac{26}{7}\\right) \\cup (4, +\\infty)$"), correct: false },
          { id: "e", text: L("$\\left(\\dfrac{26}{7},\\ 4\\right) \\cup \\left(4,\\ \\dfrac{14}{3}\\right)$", "$\\left(\\dfrac{26}{7},\\ 4\\right) \\cup \\left(4,\\ \\dfrac{14}{3}\\right)$"), correct: false },
        ]),
      },
      hints: [
        L(
          "$|u| < a$ con $a > 0$ equivale a $-a < u < a$: aquí $u$ es toda la fracción, y quedan **dos** desigualdades racionales.",
          "$|u| < a$ with $a > 0$ means $-a < u < a$: here $u$ is the whole fraction, leaving **two** rational inequalities.",
        ),
        L(
          "Para cada una, pasa todo a un lado y estudia el signo del numerador contra el del denominador (no multipliques en cruz sin saber el signo).",
          "For each one, move everything to one side and study the sign of the numerator against the denominator (do not cross-multiply without knowing the sign).",
        ),
        L(
          "Derecha: $\\frac{x-3}{x-4} < \\frac{5}{2}$ da $x < 4$ o $x > \\frac{14}{3}$. Izquierda: $\\frac{x-3}{x-4} > -\\frac{5}{2}$ da $x < \\frac{26}{7}$ o $x > 4$. Intersecta.",
          "Right: $\\frac{x-3}{x-4} < \\frac{5}{2}$ gives $x < 4$ or $x > \\frac{14}{3}$. Left: $\\frac{x-3}{x-4} > -\\frac{5}{2}$ gives $x < \\frac{26}{7}$ or $x > 4$. Intersect.",
        ),
      ],
      answerDisplay: L("$\\left(-\\infty,\\ \\dfrac{26}{7}\\right) \\cup \\left(\\dfrac{14}{3},\\ +\\infty\\right)$", "$\\left(-\\infty,\\ \\dfrac{26}{7}\\right) \\cup \\left(\\dfrac{14}{3},\\ +\\infty\\right)$"),
      solution: [
        step(
          "given",
          "$\\left|\\frac{x-3}{x-4}\\right| < \\frac{5}{2}$, con $x \\neq 4$.",
          "$\\left|\\frac{x-3}{x-4}\\right| < \\frac{5}{2}$, with $x \\neq 4$.",
        ),
        step(
          "approach",
          "Doble desigualdad $-\\frac{5}{2} < \\frac{x-3}{x-4} < \\frac{5}{2}$; resolver cada rama por signos y quedarse con la intersección.",
          "Double inequality $-\\frac{5}{2} < \\frac{x-3}{x-4} < \\frac{5}{2}$; solve each branch by signs and keep the intersection.",
        ),
        step(
          "calculation",
          "Rama derecha: $\\frac{x-3}{x-4} - \\frac{5}{2} < 0 \\Rightarrow \\frac{2x-6-5x+20}{2(x-4)} = \\frac{-3x+14}{2(x-4)} < 0 \\Rightarrow x < 4 \\ \\vee\\ x > \\frac{14}{3}$.<br>Rama izquierda: $\\frac{x-3}{x-4} + \\frac{5}{2} > 0 \\Rightarrow \\frac{2x-6+5x-20}{2(x-4)} = \\frac{7x-26}{2(x-4)} > 0 \\Rightarrow x < \\frac{26}{7} \\ \\vee\\ x > 4$.",
          "Right branch: $\\frac{x-3}{x-4} - \\frac{5}{2} < 0 \\Rightarrow \\frac{2x-6-5x+20}{2(x-4)} = \\frac{-3x+14}{2(x-4)} < 0 \\Rightarrow x < 4 \\ \\vee\\ x > \\frac{14}{3}$.<br>Left branch: $\\frac{x-3}{x-4} + \\frac{5}{2} > 0 \\Rightarrow \\frac{2x-6+5x-20}{2(x-4)} = \\frac{7x-26}{2(x-4)} > 0 \\Rightarrow x < \\frac{26}{7} \\ \\vee\\ x > 4$.",
        ),
        step(
          "result",
          "Intersección: $\\left(-\\infty, \\frac{26}{7}\\right) \\cup \\left(\\frac{14}{3}, +\\infty\\right)$. Verificación: $x = 0$: $\\left|\\frac{-3}{-4}\\right| = 0.75 < 2.5$ ✓; $x = 3.8$ (entre $\\frac{26}{7} \\approx 3.71$ y 4): $\\left|\\frac{0.8}{-0.2}\\right| = 4 \\not< 2.5$ ✗; $x = 5$: $\\left|\\frac{2}{1}\\right| = 2 < 2.5$ ✓.",
          "Intersection: $\\left(-\\infty, \\frac{26}{7}\\right) \\cup \\left(\\frac{14}{3}, +\\infty\\right)$. Check: $x = 0$: $\\left|\\frac{-3}{-4}\\right| = 0.75 < 2.5$ ✓; $x = 3.8$ (between $\\frac{26}{7} \\approx 3.71$ and 4): $\\left|\\frac{0.8}{-0.2}\\right| = 4 \\not< 2.5$ ✗; $x = 5$: $\\left|\\frac{2}{1}\\right| = 2 < 2.5$ ✓.",
        ),
      ],
    }),
  ),

  /* 93d — 4/(x+1) − 3/(x+2) > 1 → (−3,−2)∪(−1,1). */
  template(
    {
      id: "rat-espol-ch2-93d",
      subject: "math",
      topicId: "rational",
      subtopicId: "inequalities",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 270,
      tags: ["rational-inequality", "sign-table", "three-critical-points"],
      prerequisites: ["add-sub", "domain"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 93d",
        page: 243,
      },
      reasoning: "multi-concept",
    },
    (rng) => ({
      skill: L("Desigualdad racional con tres puntos críticos", "Rational inequality with three critical points"),
      statement: L(
        "Resuelve $\\dfrac{4}{x + 1} - \\dfrac{3}{x + 2} > 1$, $x \\in \\mathbb{R}$. El conjunto solución es:",
        "Solve $\\dfrac{4}{x + 1} - \\dfrac{3}{x + 2} > 1$, $x \\in \\mathbb{R}$. The solution set is:",
      ),
      answer: {
        kind: "multiple-choice",
        options: rng.shuffle([
          { id: "a", text: L("$(-3, -2) \\cup (-1, 1)$", "$(-3, -2) \\cup (-1, 1)$"), correct: true },
          { id: "b", text: L("$(-2, -1)$", "$(-2, -1)$"), correct: false },
          { id: "c", text: L("$(-\\infty, -3) \\cup (1, +\\infty)$", "$(-\\infty, -3) \\cup (1, +\\infty)$"), correct: false },
          { id: "d", text: L("$(-3, -1)$", "$(-3, -1)$"), correct: false },
          { id: "e", text: L("$(-2, -1) \\cup (1, +\\infty)$", "$(-2, -1) \\cup (1, +\\infty)$"), correct: false },
        ]),
      },
      hints: [
        L(
          "Pasa el 1 a la izquierda y junta TODO en una sola fracción: $\\frac{4}{x+1} - \\frac{3}{x+2} - 1$.",
          "Move the 1 to the left and combine EVERYTHING into one fraction: $\\frac{4}{x+1} - \\frac{3}{x+2} - 1$.",
        ),
        L(
          "El numerador factoriza como un producto de dos lineales; el denominador es $(x+1)(x+2)$. Tendrás tres cortes en la recta.",
          "The numerator factors as a product of two linears; the denominator is $(x+1)(x+2)$. You will get three cuts on the line.",
        ),
      ],
      answerDisplay: L("$(-3, -2) \\cup (-1, 1)$", "$(-3, -2) \\cup (-1, 1)$"),
      solution: [
        step(
          "given",
          "$\\dfrac{4}{x+1} - \\dfrac{3}{x+2} > 1$, con $x \\neq -1, -2$.",
          "$\\dfrac{4}{x+1} - \\dfrac{3}{x+2} > 1$, with $x \\neq -1, -2$.",
        ),
        step(
          "approach",
          "Cero a la izquierda, fracción única y tabla de signos con los tres puntos críticos.",
          "Zero on the left, a single fraction, and a sign table with the three critical points.",
        ),
        step(
          "calculation",
          "$\\frac{4(x+2) - 3(x+1) - (x+1)(x+2)}{(x+1)(x+2)} > 0 \\Rightarrow \\frac{4x+8-3x-3-x^{2}-3x-2}{(x+1)(x+2)} > 0 \\Rightarrow \\frac{-x^{2}-2x+3}{(x+1)(x+2)} > 0$.<br>Numerador: $-x^{2}-2x+3 = -(x+3)(x-1)$, ceros en $-3$ y $1$.<br>Signos ($x < -3$: $(-)(+)\\cdot(-)/(+)$ → $-$ ✗; $-3 < x < -2$: $(+)\\cdot(-)/(+)$ → $+$ ✓; $-2 < x < -1$: $(+)/(-)$ → $-$ ✗; $-1 < x < 1$: $(+)/(-)$… cuidado: $(x+3)(x-1) < 0$ y denominador $< 0$ → $+$ ✓; $x > 1$: $+$/$+$ → $-$ ✗).",
          "$\\frac{4(x+2) - 3(x+1) - (x+1)(x+2)}{(x+1)(x+2)} > 0 \\Rightarrow \\frac{4x+8-3x-3-x^{2}-3x-2}{(x+1)(x+2)} > 0 \\Rightarrow \\frac{-x^{2}-2x+3}{(x+1)(x+2)} > 0$.<br>Numerator: $-x^{2}-2x+3 = -(x+3)(x-1)$, zeros at $-3$ and $1$.<br>Signs: positive on $(-3,-2)$ and $(-1,1)$, negative elsewhere (check one point per stretch).",
        ),
        step(
          "result",
          "$(-3, -2) \\cup (-1, 1)$, todo abierto: los ceros del numerador no valen (desigualdad estricta) y los polos $-2, -1$ están excluidos del dominio. Verificación: $x = -2.5$: $\\frac{4}{-1.5} - \\frac{3}{-0.5} = -2.67 + 6 = 3.33 > 1$ ✓; $x = 0$: $4 - 1.5 = 2.5 > 1$ ✓; $x = 2$: $\\frac{4}{3} - \\frac{3}{4} = 0.58 \\not> 1$ ✗.",
          "$(-3, -2) \\cup (-1, 1)$, all open: the numerator zeros do not count (strict inequality) and the poles $-2, -1$ are outside the domain. Check: $x = -2.5$: $\\frac{4}{-1.5} - \\frac{3}{-0.5} = -2.67 + 6 = 3.33 > 1$ ✓; $x = 0$: $4 - 1.5 = 2.5 > 1$ ✓; $x = 2$: $\\frac{4}{3} - \\frac{3}{4} = 0.58 \\not> 1$ ✗.",
        ),
      ],
    }),
  ),

  /* 94d — 8/x ≥ 3 → (0, 8/3]. */
  template(
    {
      id: "rat-espol-ch2-94d",
      subject: "math",
      topicId: "rational",
      subtopicId: "inequalities",
      difficulty: "medium",
      questionType: "text",
      estimatedTimeSec: 150,
      tags: ["rational-inequality", "sign-trap"],
      prerequisites: ["domain"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 94d",
        page: 243,
      },
      reasoning: "case-analysis",
    },
    () => ({
      skill: L("Desigualdad con x en el denominador", "Inequality with x in the denominator"),
      statement: L(
        "Determina el conjunto de verdad de $d(x): \\dfrac{8}{x} \\geq 3$ como intervalo (admite (0, 2] o 0<x<=8/3):",
        "Determine the truth set of $d(x): \\dfrac{8}{x} \\geq 3$ as an interval (notations like (0, 2] or 0<x<=8/3 are accepted):",
      ),
      answer: {
        kind: "text",
        accepted: ["(0, 8/3]", "(0,8/3]", "0<x<=8/3", "0 < x <= 8/3", "0<x≤8/3", "(0, 8/3 ]"],
      },
      hints: [
        L(
          "NO multipliques en cruz sin más: el signo de $x$ es desconocido. Parte por casos $x > 0$ y $x < 0$.",
          "Do NOT cross-multiply blindly: the sign of $x$ is unknown. Split into cases $x > 0$ and $x < 0$.",
        ),
        L(
          "Con $x > 0$: $8 \\geq 3x$. Con $x < 0$: $8 \\leq 3x$ — ¿tiene sentido?",
          "With $x > 0$: $8 \\geq 3x$. With $x < 0$: $8 \\leq 3x$ — does that make sense?",
        ),
      ],
      answerDisplay: L("$\\left(0,\\ \\dfrac{8}{3}\\right]$", "$\\left(0,\\ \\dfrac{8}{3}\\right]$"),
      solution: [
        step(
          "given",
          "$d(x): \\dfrac{8}{x} \\geq 3$, $x \\neq 0$.",
          "$d(x): \\dfrac{8}{x} \\geq 3$, $x \\neq 0$.",
        ),
        step(
          "approach",
          "Casos según el signo del denominador (multiplicar por un negativo invierte la desigualdad).",
          "Cases according to the sign of the denominator (multiplying by a negative flips the inequality).",
        ),
        step(
          "calculation",
          "Caso $x > 0$: $8 \\geq 3x \\Rightarrow x \\leq \\frac{8}{3}$ → intersección: $0 < x \\leq \\frac{8}{3}$.<br>Caso $x < 0$: multiplicar por $x$ invierte: $8 \\leq 3x \\Rightarrow x \\geq \\frac{8}{3}$, incompatible con $x < 0$ → vacío.",
          "Case $x > 0$: $8 \\geq 3x \\Rightarrow x \\leq \\frac{8}{3}$ → intersection: $0 < x \\leq \\frac{8}{3}$.<br>Case $x < 0$: multiplying by $x$ flips: $8 \\leq 3x \\Rightarrow x \\geq \\frac{8}{3}$, incompatible with $x < 0$ → empty.",
        ),
        step(
          "result",
          "$A_{d(x)} = \\left(0, \\frac{8}{3}\\right]$: abierto en 0 (el 0 no está en el dominio) y cerrado en $\\frac{8}{3}$ (la igualdad sí vale). Verificación: $x = 2$: $4 \\geq 3$ ✓; $x = \\frac{8}{3}$: $3 \\geq 3$ ✓; $x = -1$: $-8 \\not\\geq 3$ ✗.",
          "$A_{d(x)} = \\left(0, \\frac{8}{3}\\right]$: open at 0 (0 is not in the domain) and closed at $\\frac{8}{3}$ (equality holds). Check: $x = 2$: $4 \\geq 3$ ✓; $x = \\frac{8}{3}$: $3 \\geq 3$ ✓; $x = -1$: $-8 \\not\\geq 3$ ✗.",
        ),
      ],
    }),
  ),

  /* 94e — 2x/(x−4) ≤ 8 → (−∞,4) ∪ [16/3,+∞). */
  template(
    {
      id: "rat-espol-ch2-94e",
      subject: "math",
      topicId: "rational",
      subtopicId: "inequalities",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 210,
      tags: ["rational-inequality", "sign-table"],
      prerequisites: ["domain"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 94e",
        page: 243,
      },
      reasoning: "case-analysis",
    },
    (rng) => ({
      skill: L("Desigualdad racional: fracción única y signos", "Rational inequality: one fraction and signs"),
      statement: L(
        "Determina el conjunto de verdad de $p(x): \\dfrac{2x}{x - 4} \\leq 8$, $x \\in \\mathbb{R}$. Es:",
        "Determine the truth set of $p(x): \\dfrac{2x}{x - 4} \\leq 8$, $x \\in \\mathbb{R}$. It is:",
      ),
      answer: {
        kind: "multiple-choice",
        options: rng.shuffle([
          { id: "a", text: L("$(-\\infty, 4) \\cup \\left[\\dfrac{16}{3}, +\\infty\\right)$", "$(-\\infty, 4) \\cup \\left[\\dfrac{16}{3}, +\\infty\\right)$"), correct: true },
          { id: "b", text: L("$\\left[\\dfrac{16}{3}, 4\\right)$", "$\\left[\\dfrac{16}{3}, 4\\right)$"), correct: false },
          { id: "c", text: L("$\\left(4, \\dfrac{16}{3}\\right]$", "$\\left(4, \\dfrac{16}{3}\\right]$"), correct: false },
          { id: "d", text: L("$(-\\infty, 4] \\cup \\left[\\dfrac{16}{3}, +\\infty\\right)$", "$(-\\infty, 4] \\cup \\left[\\dfrac{16}{3}, +\\infty\\right)$"), correct: false },
          { id: "e", text: L("$\\left[-\\dfrac{16}{3}, 4\\right)$", "$\\left[-\\dfrac{16}{3}, 4\\right)$"), correct: false },
        ]),
      },
      hints: [
        L(
          "Pasa el 8 a la izquierda y junta en una fracción: el numerador quedará lineal.",
          "Move the 8 to the left and combine into one fraction: the numerator will be linear.",
        ),
        L(
          "$\\frac{2x - 8(x-4)}{x-4} \\leq 0$ → $\\frac{-6x+32}{x-4} \\leq 0$. Estudia el signo con los cortes $x = \\frac{16}{3}$ y $x = 4$.",
          "$\\frac{2x - 8(x-4)}{x-4} \\leq 0$ → $\\frac{-6x+32}{x-4} \\leq 0$. Study the sign with cuts at $x = \\frac{16}{3}$ and $x = 4$.",
        ),
      ],
      answerDisplay: L("$(-\\infty, 4) \\cup \\left[\\dfrac{16}{3}, +\\infty\\right)$", "$(-\\infty, 4) \\cup \\left[\\dfrac{16}{3}, +\\infty\\right)$"),
      solution: [
        step(
          "given",
          "$p(x): \\dfrac{2x}{x-4} \\leq 8$, $x \\neq 4$.",
          "$p(x): \\dfrac{2x}{x-4} \\leq 8$, $x \\neq 4$.",
        ),
        step(
          "approach",
          "Cero a la izquierda, fracción única, tabla de signos; la clave del libro lo escribe como el complemento de $\\left[4, \\frac{16}{3}\\right)$.",
          "Zero on the left, one fraction, sign table; the book's key writes it as the complement of $\\left[4, \\frac{16}{3}\\right)$.",
        ),
        step(
          "calculation",
          "$\\frac{2x - 8(x-4)}{x-4} \\leq 0 \\Rightarrow \\frac{-6x + 32}{x-4} \\leq 0 \\Rightarrow \\frac{6x - 32}{x - 4} \\geq 0$ (multiplicar por $-1$ invierte).<br>Cortes: cero en $x = \\frac{16}{3}$, polo en $x = 4$.<br>$x < 4$: $(−)/(−) = +$ ✓; $4 < x < \\frac{16}{3}$: $(−)/(+) = −$ ✗; $x \\geq \\frac{16}{3}$: $(+)/(+) = +$ ✓.",
          "$\\frac{2x - 8(x-4)}{x-4} \\leq 0 \\Rightarrow \\frac{-6x + 32}{x-4} \\leq 0 \\Rightarrow \\frac{6x - 32}{x - 4} \\geq 0$ (multiplying by $-1$ flips).<br>Cuts: zero at $x = \\frac{16}{3}$, pole at $x = 4$.<br>$x < 4$: $(−)/(−) = +$ ✓; $4 < x < \\frac{16}{3}$: $(−)/(+) = −$ ✗; $x \\geq \\frac{16}{3}$: $(+)/(+) = +$ ✓.",
        ),
        step(
          "result",
          "$(-\\infty, 4) \\cup \\left[\\frac{16}{3}, +\\infty\\right)$ — el 4 queda excluido (polo) y $\\frac{16}{3}$ incluido (se alcanza la igualdad). Verificación: $x = 0$: $0 \\leq 8$ ✓; $x = 5$: $10 \\not\\leq 8$ ✗; $x = \\frac{16}{3}$: $\\frac{32/3}{4/3} = 8 \\leq 8$ ✓.",
          "$(-\\infty, 4) \\cup \\left[\\frac{16}{3}, +\\infty\\right)$ — 4 is excluded (pole) and $\\frac{16}{3}$ included (equality is reached). Check: $x = 0$: $0 \\leq 8$ ✓; $x = 5$: $10 \\not\\leq 8$ ✗; $x = \\frac{16}{3}$: $\\frac{32/3}{4/3} = 8 \\leq 8$ ✓.",
        ),
      ],
    }),
  ),

  /* 94g — (x²−3x−18)/(13x−x²−42) ≥ 0 → [−3,6)∪(6,7) — cancellation trap. */
  template(
    {
      id: "rat-espol-ch2-94g",
      subject: "math",
      topicId: "rational",
      subtopicId: "inequalities",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 270,
      tags: ["rational-inequality", "common-factor", "cancellation-trap"],
      prerequisites: ["factoring", "domain"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 94g",
        page: 243,
      },
      reasoning: "spurious",
    },
    (rng) => ({
      skill: L("La desigualdad racional con factor común (no canceles el dominio)", "The rational inequality with a common factor (do not cancel the domain away)"),
      statement: L(
        "Determina el conjunto de verdad de $p(x): \\dfrac{x^{2} - 3x - 18}{13x - x^{2} - 42} \\geq 0$, $x \\in \\mathbb{R}$. Es:",
        "Determine the truth set of $p(x): \\dfrac{x^{2} - 3x - 18}{13x - x^{2} - 42} \\geq 0$, $x \\in \\mathbb{R}$. It is:",
      ),
      answer: {
        kind: "multiple-choice",
        options: rng.shuffle([
          { id: "a", text: L("$[-3, 7]$", "$[-3, 7]$"), correct: false },
          { id: "b", text: L("$[-3, 6) \\cup (6, 7]$", "$[-3, 6) \\cup (6, 7]$"), correct: true },
          { id: "c", text: L("$[-3, 7)$", "$[-3, 7)$"), correct: false },
          { id: "d", text: L("$[-3, 6] \\cup (6, 7]$", "$[-3, 6] \\cup (6, 7]$"), correct: false },
          { id: "e", text: L("$(-\\infty, -3] \\cup [7, +\\infty)$", "$(-\\infty, -3] \\cup [7, +\\infty)$"), correct: false },
        ]),
      },
      hints: [
        L(
          "Factoriza numerador y denominador: $x^{2} - 3x - 18 = (x - 6)(x + 3)$ y $13x - x^{2} - 42 = -(x - 6)(x - 7)$.",
          "Factor numerator and denominator: $x^{2} - 3x - 18 = (x - 6)(x + 3)$ and $13x - x^{2} - 42 = -(x - 6)(x - 7)$.",
        ),
        L(
          "Ambos comparten el factor $(x - 6)$… pero **cancelarlo cambia el dominio**: en $x = 6$ la expresión original no existe.",
          "Both share the factor $(x - 6)$… but **cancelling changes the domain**: at $x = 6$ the original expression does not exist.",
        ),
      ],
      answerDisplay: L("$A_{p(x)} = [-3, 6) \\cup (6, 7]$", "$A_{p(x)} = [-3, 6) \\cup (6, 7]$"),
      solution: [
        step(
          "given",
          "$\\dfrac{x^{2} - 3x - 18}{13x - x^{2} - 42} \\geq 0$; dominio: $13x - x^{2} - 42 \\neq 0$.",
          "$\\dfrac{x^{2} - 3x - 18}{13x - x^{2} - 42} \\geq 0$; domain: $13x - x^{2} - 42 \\neq 0$.",
        ),
        step(
          "approach",
          "Factorizar ambos y hacer la tabla de signos SIN cancelar (o cancelando pero excluyendo $x = 6$ del resultado).",
          "Factor both and build the sign table WITHOUT cancelling (or cancel but then exclude $x = 6$ from the result).",
        ),
        step(
          "calculation",
          "$x^{2} - 3x - 18 = (x - 6)(x + 3)$; $\\quad 13x - x^{2} - 42 = -(x^{2} - 13x + 42) = -(x - 6)(x - 7)$.<br>Para $x \\neq 6$: $\\dfrac{(x-6)(x+3)}{-(x-6)(x-7)} = -\\dfrac{x+3}{x-7} \\geq 0 \\iff \\dfrac{x+3}{x-7} \\leq 0 \\iff -3 \\leq x < 7$.<br>Pero hay que quitar $x = 6$ (anula el denominador original).",
          "$x^{2} - 3x - 18 = (x - 6)(x + 3)$; $\\quad 13x - x^{2} - 42 = -(x^{2} - 13x + 42) = -(x - 6)(x - 7)$.<br>For $x \\neq 6$: $\\dfrac{(x-6)(x+3)}{-(x-6)(x-7)} = -\\dfrac{x+3}{x-7} \\geq 0 \\iff \\dfrac{x+3}{x-7} \\leq 0 \\iff -3 \\leq x < 7$.<br>But $x = 6$ must be removed (it zeroes the original denominator).",
        ),
        step(
          "result",
          "$A_{p(x)} = [-3, 6) \\cup (6, 7]$: el $-3$ entra (cero del numerador, la fracción vale 0), el 7 queda fuera (polo) y el 6 también (agujero). Verificación: $x = -3$: $\\frac{0}{...} = 0 \\geq 0$ ✓; $x = 6.5$: numerador $= 6.75 > 0$, denominador $= 84.5 - 42.25 - 42 = 0.25 > 0$ ✓; $x = 6$: denominador $0$ ✗.",
          "$A_{p(x)} = [-3, 6) \\cup (6, 7]$: $-3$ enters (numerator zero, the fraction equals 0), 7 stays out (pole) and so does 6 (hole). Check: $x = -3$: $\\frac{0}{...} = 0 \\geq 0$ ✓; $x = 6.5$: numerator $= 6.75 > 0$, denominator $= 84.5 - 42.25 - 42 = 0.25 > 0$ ✓; $x = 6$: denominator $0$ ✗.",
        ),
      ],
    }),
  ),

  /* 94h — (x²−3x−6)/(x²−1) ≤ 1 → [−5/3,−1)∪(1,+∞). */
  template(
    {
      id: "rat-espol-ch2-94h",
      subject: "math",
      topicId: "rational",
      subtopicId: "inequalities",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["rational-inequality", "sign-table"],
      prerequisites: ["domain"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 94h",
        page: 243,
      },
      reasoning: "case-analysis",
    },
    (rng) => ({
      skill: L("Desigualdad racional contra una constante", "Rational inequality against a constant"),
      statement: L(
        "Determina el conjunto de verdad de $q(x): \\dfrac{x^{2} - 3x - 6}{x^{2} - 1} \\leq 1$, $x \\in \\mathbb{R}$. Es:",
        "Determine the truth set of $q(x): \\dfrac{x^{2} - 3x - 6}{x^{2} - 1} \\leq 1$, $x \\in \\mathbb{R}$. It is:",
      ),
      answer: {
        kind: "multiple-choice",
        options: rng.shuffle([
          { id: "a", text: L("$\\left[-\\dfrac{5}{3}, -1\\right) \\cup (1, +\\infty)$", "$\\left[-\\dfrac{5}{3}, -1\\right) \\cup (1, +\\infty)$"), correct: true },
          { id: "b", text: L("$\\left(-\\dfrac{5}{3}, -1\\right) \\cup (1, +\\infty)$", "$\\left(-\\dfrac{5}{3}, -1\\right) \\cup (1, +\\infty)$"), correct: false },
          { id: "c", text: L("$\\left(-\\infty, -\\dfrac{5}{3}\\right] \\cup (-1, 1)$", "$\\left(-\\infty, -\\dfrac{5}{3}\\right] \\cup (-1, 1)$"), correct: false },
          { id: "d", text: L("$(-1, 1)$", "$(-1, 1)$"), correct: false },
          { id: "e", text: L("$\\left[-\\dfrac{5}{3}, 1\\right)$", "$\\left[-\\dfrac{5}{3}, 1\\right)$"), correct: false },
        ]),
      },
      hints: [
        L(
          "Resta el 1 y combina: los términos $x^{2}$ se cancelan y queda una fracción lineal sobre cuadrática.",
          "Subtract the 1 and combine: the $x^{2}$ terms cancel, leaving a linear-over-quadratic fraction.",
        ),
        L(
          "$\\frac{x^{2}-3x-6-(x^{2}-1)}{x^{2}-1} \\leq 0$ → $\\frac{-3x-5}{(x-1)(x+1)} \\leq 0$. Tres cortes: $-\\frac{5}{3}, -1, 1$.",
          "$\\frac{x^{2}-3x-6-(x^{2}-1)}{x^{2}-1} \\leq 0$ → $\\frac{-3x-5}{(x-1)(x+1)} \\leq 0$. Three cuts: $-\\frac{5}{3}, -1, 1$.",
        ),
      ],
      answerDisplay: L("$\\left[-\\dfrac{5}{3}, -1\\right) \\cup (1, +\\infty)$", "$\\left[-\\dfrac{5}{3}, -1\\right) \\cup (1, +\\infty)$"),
      solution: [
        step(
          "given",
          "$q(x): \\dfrac{x^{2} - 3x - 6}{x^{2} - 1} \\leq 1$, $x \\neq \\pm 1$.",
          "$q(x): \\dfrac{x^{2} - 3x - 6}{x^{2} - 1} \\leq 1$, $x \\neq \\pm 1$.",
        ),
        step(
          "approach",
          "Cero a la izquierda y tabla de signos; la cancelación de los cuadráticos simplifica mucho el cálculo.",
          "Zero on the left and a sign table; the cancellation of the quadratics simplifies the computation a lot.",
        ),
        step(
          "calculation",
          "$\\dfrac{x^{2} - 3x - 6 - (x^{2} - 1)}{x^{2} - 1} \\leq 0 \\Rightarrow \\dfrac{-3x - 5}{(x - 1)(x + 1)} \\leq 0 \\Rightarrow \\dfrac{3x + 5}{(x-1)(x+1)} \\geq 0$.<br>Cortes: cero en $-\\frac{5}{3}$, polos en $\\pm 1$.<br>$x < -\\frac{5}{3}$: $(−)/(+)$ ✗; $-\\frac{5}{3} \\leq x < -1$: $(+)/(+)$ ✓; $-1 < x < 1$: $(+)/(−)$ ✗; $x > 1$: $(+)/(+)$ ✓.",
          "$\\dfrac{x^{2} - 3x - 6 - (x^{2} - 1)}{x^{2} - 1} \\leq 0 \\Rightarrow \\dfrac{-3x - 5}{(x - 1)(x + 1)} \\leq 0 \\Rightarrow \\dfrac{3x + 5}{(x-1)(x+1)} \\geq 0$.<br>Cuts: zero at $-\\frac{5}{3}$, poles at $\\pm 1$.<br>$x < -\\frac{5}{3}$: $(−)/(+)$ ✗; $-\\frac{5}{3} \\leq x < -1$: $(+)/(+)$ ✓; $-1 < x < 1$: $(+)/(−)$ ✗; $x > 1$: $(+)/(+)$ ✓.",
        ),
        step(
          "result",
          "$\\left[-\\frac{5}{3}, -1\\right) \\cup (1, +\\infty)$: $-\\frac{5}{3}$ entra (igualdad), $\\pm 1$ quedan fuera (polos). Verificación: $x = -\\frac{5}{3}$: $\\frac{\\frac{25}{9} + 5 - 6}{\\frac{25}{9} - 1} = \\frac{\\frac{4}{9}}{\\frac{16}{9}} = \\frac{1}{4} \\not\\leq 1$… ojo, revisa restando: $\\frac{1}{4} - 1 = -\\frac{3}{4} \\leq 0$ ✓; $x = 0$: $\\frac{-6}{-1} = 6 \\not\\leq 1$ ✗; $x = 2$: $\\frac{-8}{3} \\leq 1$ ✓.",
          "$\\left[-\\frac{5}{3}, -1\\right) \\cup (1, +\\infty)$: $-\\frac{5}{3}$ enters (equality), $\\pm 1$ stay out (poles). Check: $x = -\\frac{5}{3}$: the left side minus 1 equals $-\\frac{3}{4} \\leq 0$ ✓; $x = 0$: $\\frac{-6}{-1} = 6 \\not\\leq 1$ ✗; $x = 2$: $\\frac{-8}{3} \\leq 1$ ✓.",
        ),
      ],
    }),
  ),

  /* ch3 #21 — asymptotes of (4x²−x)/(x²−1): the FALSE statement is b). */
  template(
    {
      id: "rat-espol-ch3-21",
      subject: "math",
      topicId: "rational",
      subtopicId: "asymptotes",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["asymptotes", "rational-functions", "properties"],
      prerequisites: ["domain", "factoring"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3 · 21",
        page: 371,
      },
      reasoning: "graphical",
    },
    (rng) => ({
      skill: L("Asíntotas y cortes de una función racional", "Asymptotes and intercepts of a rational function"),
      statement: L(
        "Sea $f$ una función de variable real dada por $f(x) = \\dfrac{4x^{2} - x}{x^{2} - 1}$. Identifica la aﬁrmación **falsa**:",
        "Let $f$ be a real-variable function given by $f(x) = \\dfrac{4x^{2} - x}{x^{2} - 1}$. Identify the **false** statement:",
      ),
      answer: {
        kind: "multiple-choice",
        options: rng.shuffle([
          { id: "a", text: L("La gráﬁca de $f$ tiene dos asíntotas verticales.", "The graph of $f$ has two vertical asymptotes."), correct: false },
          { id: "b", text: L("$f$ es monótona creciente.", "$f$ is monotonically increasing."), correct: true },
          { id: "c", text: L("La gráﬁca de $f$ tiene una asíntota horizontal.", "The graph of $f$ has a horizontal asymptote."), correct: false },
          { id: "d", text: L("$y = 4$ es una asíntota horizontal de la gráfica de $f$.", "$y = 4$ is a horizontal asymptote of the graph of $f$."), correct: false },
          { id: "e", text: L("La gráfica de $f$ interseca al eje X en dos puntos.", "The graph of $f$ intersects the X-axis at two points."), correct: false },
        ]),
      },
      hints: [
        L(
          "Revisa cada opción con hechos calculables: raíces del denominador (asíntotas verticales), grado de numerador y denominador (horizontal), raíces del numerador (cortes con el eje X).",
          "Check each option with computable facts: roots of the denominator (vertical asymptotes), degrees of numerator and denominator (horizontal), roots of the numerator (X-axis crossings).",
        ),
        L(
          "Para la monotoneidad, deriva: $f'(x) = \\dfrac{(8x-1)(x^{2}-1) - (4x^{2}-x)(2x)}{(x^{2}-1)^{2}}$ y mira si el numerador tiene siempre el mismo signo.",
          "For monotonicity, differentiate: $f'(x) = \\dfrac{(8x-1)(x^{2}-1) - (4x^{2}-x)(2x)}{(x^{2}-1)^{2}}$ and see whether the numerator keeps one sign.",
        ),
      ],
      answerDisplay: L("Falsa: $f$ NO es monótona creciente", "False: $f$ is NOT monotonically increasing"),
      solution: [
        step(
          "given",
          "$f(x) = \\dfrac{4x^{2} - x}{x^{2} - 1} = \\dfrac{x(4x - 1)}{(x-1)(x+1)}$.",
          "$f(x) = \\dfrac{4x^{2} - x}{x^{2} - 1} = \\dfrac{x(4x - 1)}{(x-1)(x+1)}$.",
        ),
        step(
          "approach",
          "Verificar las cuatro aﬁrmaciones «fáciles» por hechos algebraicos; la sospechosa es la de monotoneidad, que se prueba con la derivada.",
          "Verify the four «easy» statements with algebraic facts; the suspicious one is monotonicity, tested with the derivative.",
        ),
        step(
          "calculation",
          "a) Polos en $x = \\pm 1$ sin cancelación → dos asíntotas verticales ✓.<br>c), d) Grados iguales → asíntota horizontal $y = \\frac{4}{1} = 4$ ✓.<br>e) $x(4x-1) = 0$ → cortes en $x = 0$ y $x = \\frac{1}{4}$ (dos puntos) ✓.<br>b) $f'(x) = \\frac{(8x-1)(x^{2}-1) - 2x(4x^{2}-x)}{(x^{2}-1)^{2}} = \\frac{8x^{3} - 8x - x^{2} + 1 - 8x^{3} + 2x^{2}}{(x^{2}-1)^{2}} = \\frac{x^{2} - 8x + 1}{(x^{2}-1)^{2}}$ — el numerador tiene raíces reales ($\\Delta = 64 - 4 > 0$), así que $f'$ cambia de signo: $f$ NO es monótona.",
          "a) Poles at $x = \\pm 1$ with no cancellation → two vertical asymptotes ✓.<br>c), d) Equal degrees → horizontal asymptote $y = \\frac{4}{1} = 4$ ✓.<br>e) $x(4x-1) = 0$ → crossings at $x = 0$ and $x = \\frac{1}{4}$ (two points) ✓.<br>b) $f'(x) = \\frac{x^{2} - 8x + 1}{(x^{2}-1)^{2}}$ — the numerator has real roots ($\\Delta = 64 - 4 > 0$), so $f'$ changes sign: $f$ is NOT monotone.",
        ),
        step(
          "result",
          "La aﬁrmación falsa es **b)**: cerca de $x = 0$ la derivada vale $f'(0) = 1 > 0$ pero en $x = 1^{-}$ el numerador $x^{2} - 8x + 1 < 0$ → la función sube y baja. Las demás cuatro se verifican directamente.",
          "The false statement is **b)**: near $x = 0$ the derivative is $f'(0) = 1 > 0$ but for $x = 1^{-}$ the numerator $x^{2} - 8x + 1 < 0$ → the function rises and falls. The other four verify directly.",
        ),
      ],
    }),
  ),

  /* ch3 #22 — 2x/(x²+x−2): AV x=1, x=−2 and AH y=0 → option d. */
  template(
    {
      id: "rat-espol-ch3-22",
      subject: "math",
      topicId: "rational",
      subtopicId: "asymptotes",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 180,
      tags: ["asymptotes", "rational-functions", "factoring"],
      prerequisites: ["factoring", "domain"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3 · 22",
        page: 371,
      },
      reasoning: "graphical",
    },
    (rng) => ({
      skill: L("Asíntotas de una función racional con denominador cuadrático", "Asymptotes of a rational function with a quadratic denominator"),
      statement: L(
        "Sea $h$ una función de variable real tal que $h(x) = \\dfrac{2x}{x^{2} + x - 2}$. Es **verdad** que:",
        "Let $h$ be a real-variable function such that $h(x) = \\dfrac{2x}{x^{2} + x - 2}$. It is **true** that:",
      ),
      answer: {
        kind: "multiple-choice",
        options: rng.shuffle([
          { id: "a", text: L("La gráfica de $h$ no tiene asíntotas horizontales.", "The graph of $h$ has no horizontal asymptotes."), correct: false },
          { id: "b", text: L("La gráfica de $h$ tiene dos asíntotas horizontales.", "The graph of $h$ has two horizontal asymptotes."), correct: false },
          { id: "c", text: L("$x = 2$ y $x = -1$ son asíntotas verticales.", "$x = 2$ and $x = -1$ are vertical asymptotes."), correct: false },
          { id: "d", text: L("La gráfica de $h$ tiene dos asíntotas verticales y una horizontal.", "The graph of $h$ has two vertical asymptotes and one horizontal."), correct: true },
          { id: "e", text: L("$x = -2$ y $x = 1$ son asíntotas verticales y $y = 2$ es horizontal.", "$x = -2$ and $x = 1$ are vertical asymptotes and $y = 2$ is horizontal."), correct: false },
        ]),
      },
      hints: [
        L(
          "Factoriza el denominador: $x^{2} + x - 2 = (x + 2)(x - 1)$. Las raíces del denominador (si no se cancelan) dan asíntotas verticales.",
          "Factor the denominator: $x^{2} + x - 2 = (x + 2)(x - 1)$. The denominator's roots (if not cancelled) give vertical asymptotes.",
        ),
        L(
          "Para la horizontal compara grados: el del denominador (2) supera al del numerador (1) → $y = 0$. Cuidado con el signo de las raíces al leer las opciones.",
          "For the horizontal one compare degrees: the denominator's (2) beats the numerator's (1) → $y = 0$. Watch the signs of the roots when reading the options.",
        ),
      ],
      answerDisplay: L("Dos verticales ($x = 1$ y $x = -2$) y una horizontal ($y = 0$)", "Two vertical ($x = 1$ and $x = -2$) and one horizontal ($y = 0$)"),
      solution: [
        step(
          "given",
          "$h(x) = \\dfrac{2x}{x^{2} + x - 2} = \\dfrac{2x}{(x + 2)(x - 1)}$.",
          "$h(x) = \\dfrac{2x}{x^{2} + x - 2} = \\dfrac{2x}{(x + 2)(x - 1)}$.",
        ),
        step(
          "approach",
          "Verticales: raíces del denominador sin cancelar. Horizontal: comparar grados.",
          "Vertical: uncancelled roots of the denominator. Horizontal: compare degrees.",
        ),
        step(
          "calculation",
          "Denominador: $(x+2)(x-1) = 0$ → $x = -2$ y $x = 1$; el numerador $2x$ no se anula en esos puntos → **asíntotas verticales** $x = -2$ y $x = 1$.<br>Grados: $\\deg(2x) = 1 < \\deg(\\text{den}) = 2$ → $\\lim_{x \\to \\pm\\infty} h(x) = 0$ → **asíntota horizontal** $y = 0$.",
          "Denominator: $(x+2)(x-1) = 0$ → $x = -2$ and $x = 1$; the numerator $2x$ does not vanish there → **vertical asymptotes** $x = -2$ and $x = 1$.<br>Degrees: $\\deg(2x) = 1 < \\deg(\\text{den}) = 2$ → $\\lim_{x \\to \\pm\\infty} h(x) = 0$ → **horizontal asymptote** $y = 0$.",
        ),
        step(
          "result",
          "Dos verticales y una horizontal → opción d. Las opciones c) y e) intercambian las raíces ($2$ por $-2$), un error clásico de signo al factorizar.",
          "Two vertical and one horizontal → option d. Options c) and e) swap the roots ($2$ for $-2$), a classic sign error when factoring.",
        ),
      ],
    }),
  ),

  /* ch3 #24a — (x²−1)/(x²+7x−8): x=1 cancels (hole), AV only x=−8. */
  template(
    {
      id: "rat-espol-ch3-24a",
      subject: "math",
      topicId: "rational",
      subtopicId: "asymptotes",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 270,
      tags: ["asymptotes", "hole", "cancellation", "intercepts"],
      prerequisites: ["factoring", "domain", "asymptotes"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3 · 24a",
        page: 371,
      },
      reasoning: "spurious",
    },
    (rng) => ({
      skill: L("Asíntotas y cortes cuando un factor se cancela (agujero)", "Asymptotes and intercepts when a factor cancels (hole)"),
      statement: L(
        "Para $f(x) = \\dfrac{x^{2} - 1}{x^{2} + 7x - 8}$, determina sus asíntotas horizontales y verticales y los puntos de intersección con los ejes. La respuesta correcta es:",
        "For $f(x) = \\dfrac{x^{2} - 1}{x^{2} + 7x - 8}$, determine its horizontal and vertical asymptotes and its intercepts with the axes. The correct answer is:",
      ),
      answer: {
        kind: "multiple-choice",
        options: rng.shuffle([
          { id: "a", text: L("AH: $y = 1$; AV: $x = -8$; cortes: $(0, \\tfrac{1}{8})$ y $(-1, 0)$", "HA: $y = 1$; VA: $x = -8$; intercepts: $(0, \\tfrac{1}{8})$ and $(-1, 0)$"), correct: true },
          { id: "b", text: L("AH: $y = 1$; AV: $x = -8$ y $x = 1$; cortes: $(0, \\tfrac{1}{8})$ y $(1, 0)$", "HA: $y = 1$; VA: $x = -8$ and $x = 1$; intercepts: $(0, \\tfrac{1}{8})$ and $(1, 0)$"), correct: false },
          { id: "c", text: L("AH: $y = 0$; AV: $x = -8$; cortes: $(0, -\\tfrac{1}{8})$ y $(1, 0)$", "HA: $y = 0$; VA: $x = -8$; intercepts: $(0, -\\tfrac{1}{8})$ and $(1, 0)$"), correct: false },
          { id: "d", text: L("AH: $y = 1$; sin AV; cortes: $(0, \\tfrac{1}{8})$ y $(-1, 0)$", "HA: $y = 1$; no VA; intercepts: $(0, \\tfrac{1}{8})$ and $(-1, 0)$"), correct: false },
          { id: "e", text: L("AH: $y = 7$; AV: $x = 8$; corte: $(0, \\tfrac{1}{8})$", "HA: $y = 7$; VA: $x = 8$; intercept: $(0, \\tfrac{1}{8})$"), correct: false },
        ]),
      },
      hints: [
        L(
          "Factoriza TODO: $x^{2} - 1 = (x-1)(x+1)$ y $x^{2} + 7x - 8 = (x + 8)(x - 1)$. ¿Qué factor aparece en los dos?",
          "Factor EVERYTHING: $x^{2} - 1 = (x-1)(x+1)$ and $x^{2} + 7x - 8 = (x + 8)(x - 1)$. Which factor appears in both?",
        ),
        L(
          "El factor común $(x - 1)$ se cancela para $x \\neq 1$: en $x = 1$ hay un **agujero**, no una asíntota. La asíntota vertical solo viene de la raíz que queda.",
          "The common factor $(x - 1)$ cancels for $x \\neq 1$: at $x = 1$ there is a **hole**, not an asymptote. The vertical asymptote comes only from the surviving root.",
        ),
        L(
          "Cortes con el eje X: numerador $= 0$ **dentro del dominio**. Con el eje Y: evalúa $f(0)$.",
          "X-axis crossings: numerator $= 0$ **inside the domain**. Y-axis: evaluate $f(0)$.",
        ),
      ],
      answerDisplay: L("AH: $y = 1$; AV: $x = -8$; cortes $(0, \\frac{1}{8})$, $(-1, 0)$ (y agujero en $x = 1$)", "HA: $y = 1$; VA: $x = -8$; intercepts $(0, \\frac{1}{8})$, $(-1, 0)$ (and a hole at $x = 1$)"),
      solution: [
        step(
          "given",
          "$f(x) = \\dfrac{x^{2} - 1}{x^{2} + 7x - 8} = \\dfrac{(x - 1)(x + 1)}{(x + 8)(x - 1)}$, $x \\neq 1, -8$.",
          "$f(x) = \\dfrac{x^{2} - 1}{x^{2} + 7x - 8} = \\dfrac{(x - 1)(x + 1)}{(x + 8)(x - 1)}$, $x \\neq 1, -8$.",
        ),
        step(
          "approach",
          "Factorizar, cancelar (recordando el agujero), y leer asíntotas de la fracción reducida; cortes desde numerador/dominio y $f(0)$.",
          "Factor, cancel (remembering the hole), and read asymptotes off the reduced fraction; intercepts from numerator/domain and $f(0)$.",
        ),
        step(
          "calculation",
          "Para $x \\neq 1$: $f(x) = \\dfrac{x + 1}{x + 8}$.<br>AV: el denominador reducido se anula en $x = -8$ (el $x = 1$ se canceló → agujero, no asíntota).<br>AH: grados iguales → $y = \\frac{1}{1} = 1$.<br>Corte con eje Y: $f(0) = \\frac{-1}{-8} = \\frac{1}{8}$ → $(0, \\frac{1}{8})$.<br>Corte con eje X: $x + 1 = 0$ → $x = -1$ ✓ (está en el dominio) → $(-1, 0)$. El candidato $x = 1$ del numerador original queda excluido (agujero).",
          "For $x \\neq 1$: $f(x) = \\dfrac{x + 1}{x + 8}$.<br>VA: the reduced denominator vanishes at $x = -8$ (the $x = 1$ cancelled → hole, not asymptote).<br>HA: equal degrees → $y = \\frac{1}{1} = 1$.<br>Y-axis intercept: $f(0) = \\frac{-1}{-8} = \\frac{1}{8}$ → $(0, \\frac{1}{8})$.<br>X-axis intercept: $x + 1 = 0$ → $x = -1$ ✓ (inside the domain) → $(-1, 0)$. The candidate $x = 1$ from the original numerator is excluded (hole).",
        ),
        step(
          "result",
          "AH: $y = 1$; AV: solo $x = -8$; cortes en $(0, \\frac{1}{8})$ y $(-1, 0)$ — con un agujero en $x = 1$ donde $f$ no está deﬁnida. La opción que declara dos asíntotas verticales cae en la trampa de no cancelar.",
          "HA: $y = 1$; VA: only $x = -8$; intercepts $(0, \\frac{1}{8})$ and $(-1, 0)$ — with a hole at $x = 1$ where $f$ is undefined. The option declaring two vertical asymptotes falls into the no-cancellation trap.",
        ),
      ],
    }),
  ),

  /* ---------------------------------------------------------------- */
  /* Recopilación del autor · ronda 2 (2026-10-05) — inecuaciones     */
  /* fraccionarias con valor absoluto (ítems A y D22 de la hoja del   */
  /* tutor). Clave del autor verificada con sympy:                    */
  /* download/verify_author_round2.py.                                 */
  /* ---------------------------------------------------------------- */

  /* R2 · 1 — (x²−4x+3)/(|x−2|−1) ≥ 0 → ℝ∖{1,3}: numerador y denominador se anulan en 1 y 3. */
  template(
    {
      id: "rat-autor2-01",
      subject: "math",
      topicId: "rational",
      subtopicId: "inequalities",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["rational-inequality", "absolute-value", "domain"],
      prerequisites: ["inequalities", "domain"],
      source: {
        sourceId: "autor-recopilacion-2025",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "R2 · 1",
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$\\mathbb{R} \\setminus \\{1, 3\\}$", "$\\mathbb{R} \\setminus \\{1, 3\\}$"), correct: true },
        { id: "b", text: L("$\\mathbb{R}$", "$\\mathbb{R}$"), correct: false },
        { id: "c", text: L("$(1, 3)$", "$(1, 3)$"), correct: false },
        { id: "d", text: L("$(-\\infty, 1) \\cup (3, +\\infty)$", "$(-\\infty, 1) \\cup (3, +\\infty)$"), correct: false },
      ];
      return {
        skill: L(
          "Inecuación fraccionaria con valor absoluto en el denominador",
          "Fractional inequality with an absolute value in the denominator",
        ),
        statement: L(
          "Determina el conjunto de verdad de $p(x): \\dfrac{x^{2} - 4x + 3}{\\left|x - 2\\right| - 1} \\geq 0$, $x \\in \\mathbb{R}$. Es:",
          "Determine the truth set of $p(x): \\dfrac{x^{2} - 4x + 3}{\\left|x - 2\\right| - 1} \\geq 0$, $x \\in \\mathbb{R}$. It is:",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Antes de nada, el denominador: resuelve $\\left|x - 2\\right| - 1 = 0$ — en esos puntos la fracción no existe.",
            "Before anything else, the denominator: solve $\\left|x - 2\\right| - 1 = 0$ — at those points the fraction does not exist.",
          ),
          L(
            "Factoriza el numerador: $x^{2} - 4x + 3 = (x - 1)(x - 3)$. Compara esas raíces con las del denominador.",
            "Factor the numerator: $x^{2} - 4x + 3 = (x - 1)(x - 3)$. Compare those roots with the denominator's roots.",
          ),
          L(
            "Para $x \\geq 2$ (con $x \\neq 3$) la fracción se reduce a $x - 1$; para $x < 2$ (con $x \\neq 1$) se reduce a $3 - x$. ¿Qué signo tiene cada trozo?",
            "For $x \\geq 2$ (with $x \\neq 3$) the fraction reduces to $x - 1$; for $x < 2$ (with $x \\neq 1$) it reduces to $3 - x$. What sign does each piece have?",
          ),
        ],
        answerDisplay: L(
          "$A_{p(x)} = \\mathbb{R} \\setminus \\{1, 3\\}$",
          "$A_{p(x)} = \\mathbb{R} \\setminus \\{1, 3\\}$",
        ),
        solution: [
          step(
            "given",
            "$p(x): \\dfrac{x^{2} - 4x + 3}{\\left|x - 2\\right| - 1} \\geq 0$; el denominador exige $\\left|x - 2\\right| \\neq 1$, es decir, $x \\neq 1, 3$.",
            "$p(x): \\dfrac{x^{2} - 4x + 3}{\\left|x - 2\\right| - 1} \\geq 0$; the denominator requires $\\left|x - 2\\right| \\neq 1$, that is, $x \\neq 1, 3$.",
          ),
          step(
            "approach",
            "Quitar el valor absoluto por trozos ($x \\geq 2$ y $x < 2$), factorizar el numerador y simplificar cada rama antes de estudiar el signo.",
            "Remove the absolute value piecewise ($x \\geq 2$ and $x < 2$), factor the numerator and simplify each branch before studying the sign.",
          ),
          step(
            "calculation",
            "$x^{2} - 4x + 3 = (x - 1)(x - 3)$.<br>Para $x \\geq 2$, $x \\neq 3$: $\\left|x - 2\\right| - 1 = x - 3$, así que $\\dfrac{(x-1)(x-3)}{x-3} = x - 1 \\geq 1 > 0$ ✓.<br>Para $x < 2$, $x \\neq 1$: $\\left|x - 2\\right| - 1 = 1 - x$, así que $\\dfrac{(x-1)(x-3)}{1-x} = 3 - x > 1 > 0$ ✓.<br>En $x = 1$ y $x = 3$ el denominador se anula: quedan fuera del dominio.",
            "$x^{2} - 4x + 3 = (x - 1)(x - 3)$.<br>For $x \\geq 2$, $x \\neq 3$: $\\left|x - 2\\right| - 1 = x - 3$, so $\\dfrac{(x-1)(x-3)}{x-3} = x - 1 \\geq 1 > 0$ ✓.<br>For $x < 2$, $x \\neq 1$: $\\left|x - 2\\right| - 1 = 1 - x$, so $\\dfrac{(x-1)(x-3)}{1-x} = 3 - x > 1 > 0$ ✓.<br>At $x = 1$ and $x = 3$ the denominator vanishes: they lie outside the domain.",
          ),
          step(
            "result",
            "$A_{p(x)} = \\mathbb{R} \\setminus \\{1, 3\\}$: en las dos ramas la fracción queda positiva, así que satisface la desigualdad en TODO punto donde está definida; solo 1 y 3 quedan excluidos (anulan numerador y denominador a la vez). Verificación: $x = 0$: $\\dfrac{3}{1} = 3 \\geq 0$ ✓; $x = 2$: $\\dfrac{-1}{-1} = 1 \\geq 0$ ✓; $x = 5$: $\\dfrac{8}{2} = 4 \\geq 0$ ✓; $x = 1$: $\\dfrac{0}{0}$, indefinida ✗.",
            "$A_{p(x)} = \\mathbb{R} \\setminus \\{1, 3\\}$: on both branches the fraction is positive, so it satisfies the inequality at EVERY point where it is defined; only 1 and 3 stay excluded (they zero numerator and denominator at once). Check: $x = 0$: $\\dfrac{3}{1} = 3 \\geq 0$ ✓; $x = 2$: $\\dfrac{-1}{-1} = 1 \\geq 0$ ✓; $x = 5$: $\\dfrac{8}{2} = 4 \\geq 0$ ✓; $x = 1$: $\\dfrac{0}{0}$, undefined ✗.",
          ),
        ],
      };
    },
  ),

  /* R2 · 2 — (x²−5x+6)/(x²−4) ≤ 0 → (−2,2)∪(2,3]: agujero en x = 2. */
  template(
    {
      id: "rat-autor2-02",
      subject: "math",
      topicId: "rational",
      subtopicId: "inequalities",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 270,
      tags: ["rational-inequality", "cancellation-trap", "hole"],
      prerequisites: ["simplifying", "domain"],
      source: {
        sourceId: "autor-recopilacion-2025",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "R2 · 2",
      },
      reasoning: "spurious",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$(-2, 2) \\cup (2, 3]$", "$(-2, 2) \\cup (2, 3]$"), correct: true },
        { id: "b", text: L("$(-2, 3]$", "$(-2, 3]$"), correct: false },
        { id: "c", text: L("$[-2, 2) \\cup (2, 3]$", "$[-2, 2) \\cup (2, 3]$"), correct: false },
        { id: "d", text: L("$(-2, 3)$", "$(-2, 3)$"), correct: false },
      ];
      return {
        skill: L(
          "Cancelar en una inecuación racional: el agujero en $x = 2$",
          "Cancelling in a rational inequality: the hole at $x = 2$",
        ),
        statement: L(
          "Determina el conjunto de verdad de $p(x): \\dfrac{x^{2} - 5x + 6}{x^{2} - 4} \\leq 0$, $x \\in \\mathbb{R}$. Es:",
          "Determine the truth set of $p(x): \\dfrac{x^{2} - 5x + 6}{x^{2} - 4} \\leq 0$, $x \\in \\mathbb{R}$. It is:",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Factoriza numerador y denominador: $x^{2} - 5x + 6 = (x - 2)(x - 3)$ y $x^{2} - 4 = (x - 2)(x + 2)$. El dominio excluye dos puntos.",
            "Factor numerator and denominator: $x^{2} - 5x + 6 = (x - 2)(x - 3)$ and $x^{2} - 4 = (x - 2)(x + 2)$. The domain excludes two points.",
          ),
          L(
            "El factor $(x - 2)$ está arriba y abajo: puedes cancelarlo para el análisis, pero $x = 2$ sigue FUERA del dominio de la expresión original.",
            "The factor $(x - 2)$ sits on top and bottom: you may cancel it for the analysis, but $x = 2$ stays OUTSIDE the domain of the original expression.",
          ),
          L(
            "Con la fracción reducida $\\dfrac{x - 3}{x + 2}$: corte en $x = 3$ (la fracción vale 0) y polo en $x = -2$; al final retira el punto que cancelaste.",
            "With the reduced fraction $\\dfrac{x - 3}{x + 2}$: cut at $x = 3$ (the fraction equals 0) and pole at $x = -2$; at the end remove the point you cancelled.",
          ),
        ],
        answerDisplay: L(
          "$A_{p(x)} = (-2, 2) \\cup (2, 3]$",
          "$A_{p(x)} = (-2, 2) \\cup (2, 3]$",
        ),
        solution: [
          step(
            "given",
            "$p(x): \\dfrac{x^{2} - 5x + 6}{x^{2} - 4} \\leq 0$; dominio: $x \\neq -2, 2$.",
            "$p(x): \\dfrac{x^{2} - 5x + 6}{x^{2} - 4} \\leq 0$; domain: $x \\neq -2, 2$.",
          ),
          step(
            "approach",
            "Factorizar, cancelar el factor común para la tabla de signos y recordar que el punto cancelado sigue fuera del dominio (agujero).",
            "Factor, cancel the common factor for the sign table, and remember that the cancelled point stays outside the domain (hole).",
          ),
          step(
            "calculation",
            "$x^{2} - 5x + 6 = (x - 2)(x - 3)$, $\\quad x^{2} - 4 = (x - 2)(x + 2)$.<br>Para $x \\neq \\pm 2$: $\\dfrac{(x-2)(x-3)}{(x-2)(x+2)} = \\dfrac{x - 3}{x + 2} \\leq 0$ — cero en $x = 3$, polo en $x = -2$.<br>$x < -2$: $(−)/(−) = +$ ✗; $-2 < x < 3$: $(−)/(+) = −$ ✓; $x = 3$: fracción $= 0$ ✓; $x > 3$: $(+)/(+) = +$ ✗ → $(-2, 3]$, menos el agujero $x = 2$.",
            "$x^{2} - 5x + 6 = (x - 2)(x - 3)$, $\\quad x^{2} - 4 = (x - 2)(x + 2)$.<br>For $x \\neq \\pm 2$: $\\dfrac{(x-2)(x-3)}{(x-2)(x+2)} = \\dfrac{x - 3}{x + 2} \\leq 0$ — zero at $x = 3$, pole at $x = -2$.<br>$x < -2$: $(−)/(−) = +$ ✗; $-2 < x < 3$: $(−)/(+) = −$ ✓; $x = 3$: fraction $= 0$ ✓; $x > 3$: $(+)/(+) = +$ ✗ → $(-2, 3]$, minus the hole $x = 2$.",
          ),
          step(
            "result",
            "$A_{p(x)} = (-2, 2) \\cup (2, 3]$: el $-2$ no entra (polo), el 3 sí (la fracción vale 0) y el 2 es un agujero — cancelar $(x - 2)$ no lo devuelve al dominio. Verificación: $x = 0$: $\\dfrac{6}{-4} = -1{,}5 \\leq 0$ ✓; $x = 3$: $\\dfrac{0}{5} = 0 \\leq 0$ ✓; $x = 2$: denominador $0$, indefinida ✗; $x = -3$: $\\dfrac{30}{5} = 6 \\not\\leq 0$ ✗.",
            "$A_{p(x)} = (-2, 2) \\cup (2, 3]$: $-2$ does not enter (pole), 3 does (the fraction equals 0) and 2 is a hole — cancelling $(x - 2)$ does not put it back into the domain. Check: $x = 0$: $\\dfrac{6}{-4} = -1.5 \\leq 0$ ✓; $x = 3$: $\\dfrac{0}{5} = 0 \\leq 0$ ✓; $x = 2$: denominator $0$, undefined ✗; $x = -3$: $\\dfrac{30}{5} = 6 \\not\\leq 0$ ✗.",
          ),
        ],
      };
    },
  ),

  /* R2 · 3 — (|x−1|−2)/(x²−5x+6) ≤ 0 → [−1,2): el polo 2 y el 0/0 en 3 quedan fuera. */
  template(
    {
      id: "rat-autor2-03",
      subject: "math",
      topicId: "rational",
      subtopicId: "inequalities",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["rational-inequality", "absolute-value", "sign-table"],
      prerequisites: ["inequalities", "domain"],
      source: {
        sourceId: "autor-recopilacion-2025",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "R2 · 3",
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$[-1, 2)$", "$[-1, 2)$"), correct: true },
        { id: "b", text: L("$[-1, 2]$", "$[-1, 2]$"), correct: false },
        { id: "c", text: L("$(-1, 2)$", "$(-1, 2)$"), correct: false },
        { id: "d", text: L("$[-1, 3)$", "$[-1, 3)$"), correct: false },
      ];
      return {
        skill: L(
          "Inecuación racional con valor absoluto en el numerador",
          "Rational inequality with an absolute value in the numerator",
        ),
        statement: L(
          "Determina el conjunto de verdad de $p(x): \\dfrac{\\left|x - 1\\right| - 2}{x^{2} - 5x + 6} \\leq 0$, $x \\in \\mathbb{R}$. Es:",
          "Determine the truth set of $p(x): \\dfrac{\\left|x - 1\\right| - 2}{x^{2} - 5x + 6} \\leq 0$, $x \\in \\mathbb{R}$. It is:",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El numerador $\\left|x - 1\\right| - 2$ se anula cuando $\\left|x - 1\\right| = 2$; resuelve esa ecuación y decide dónde el numerador es positivo y dónde negativo.",
            "The numerator $\\left|x - 1\\right| - 2$ vanishes when $\\left|x - 1\\right| = 2$; solve that equation and decide where the numerator is positive and where it is negative.",
          ),
          L(
            "Factoriza el denominador: $x^{2} - 5x + 6 = (x - 2)(x - 3)$. Ojo: en $x = 3$ se anulan numerador y denominador a la vez.",
            "Factor the denominator: $x^{2} - 5x + 6 = (x - 2)(x - 3)$. Watch out: at $x = 3$ numerator and denominator vanish together.",
          ),
          L(
            "Con cortes en $-1$, $2$ y $3$, la fracción es $\\leq 0$ donde numerador y denominador tienen signos opuestos (o donde el numerador vale 0 dentro del dominio).",
            "With cuts at $-1$, $2$ and $3$, the fraction is $\\leq 0$ where numerator and denominator have opposite signs (or where the numerator equals 0 inside the domain).",
          ),
        ],
        answerDisplay: L(
          "$A_{p(x)} = [-1, 2)$",
          "$A_{p(x)} = [-1, 2)$",
        ),
        solution: [
          step(
            "given",
            "$p(x): \\dfrac{\\left|x - 1\\right| - 2}{x^{2} - 5x + 6} \\leq 0$; dominio: $x \\neq 2, 3$.",
            "$p(x): \\dfrac{\\left|x - 1\\right| - 2}{x^{2} - 5x + 6} \\leq 0$; domain: $x \\neq 2, 3$.",
          ),
          step(
            "approach",
            "Determinar los signos del numerador a partir del valor absoluto ($\\left|x - 1\\right| \\geq 2$), factorizar el denominador y construir la tabla de signos con cortes $-1$, $2$, $3$.",
            "Determine the numerator's signs from the absolute value ($\\left|x - 1\\right| \\geq 2$), factor the denominator and build the sign table with cuts at $-1$, $2$, $3$.",
          ),
          step(
            "calculation",
            "Numerador: $\\left|x - 1\\right| - 2 \\geq 0 \\iff x \\leq -1$ o $x \\geq 3$ (vale 0 en $-1$ y $3$); es negativo en $(-1, 3)$.<br>Denominador: $(x - 2)(x - 3)$ — positivo en $(-\\infty, 2)$, negativo en $(2, 3)$, positivo en $(3, +\\infty)$.<br>$x < -1$: $(+)/(+) = +$ ✗; $x = -1$: $\\dfrac{0}{12} = 0$ ✓; $-1 < x < 2$: $(−)/(+) = −$ ✓; $x = 2$: polo ✗; $2 < x < 3$: $(−)/(−) = +$ ✗; $x = 3$: $\\dfrac{0}{0}$, indefinida ✗; $x > 3$: $(+)/(+) = +$ ✗.",
            "Numerator: $\\left|x - 1\\right| - 2 \\geq 0 \\iff x \\leq -1$ or $x \\geq 3$ (it equals 0 at $-1$ and $3$); it is negative on $(-1, 3)$.<br>Denominator: $(x - 2)(x - 3)$ — positive on $(-\\infty, 2)$, negative on $(2, 3)$, positive on $(3, +\\infty)$.<br>$x < -1$: $(+)/(+) = +$ ✗; $x = -1$: $\\dfrac{0}{12} = 0$ ✓; $-1 < x < 2$: $(−)/(+) = −$ ✓; $x = 2$: pole ✗; $2 < x < 3$: $(−)/(−) = +$ ✗; $x = 3$: $\\dfrac{0}{0}$, undefined ✗; $x > 3$: $(+)/(+) = +$ ✗.",
          ),
          step(
            "result",
            "$A_{p(x)} = [-1, 2)$: el $-1$ entra (numerador 0 con denominador $12 \\neq 0$), el 2 queda fuera (polo) y entre 2 y 3 la fracción vuelve a ser positiva. Verificación: $x = 0$: $\\dfrac{-1}{6} \\leq 0$ ✓; $x = -1$: $\\dfrac{0}{12} = 0 \\leq 0$ ✓; $x = 2{,}5$: $\\dfrac{-0{,}5}{-0{,}25} = 2 > 0$ ✗; $x = 2$: denominador $0$ ✗.",
            "$A_{p(x)} = [-1, 2)$: $-1$ enters (numerator 0 with denominator $12 \\neq 0$), 2 stays out (pole) and between 2 and 3 the fraction is positive again. Check: $x = 0$: $\\dfrac{-1}{6} \\leq 0$ ✓; $x = -1$: $\\dfrac{0}{12} = 0 \\leq 0$ ✓; $x = 2.5$: $\\dfrac{-0.5}{-0.25} = 2 > 0$ ✗; $x = 2$: denominator $0$ ✗.",
          ),
        ],
      };
    },
  ),

  /* R2 · 4 — (x²−9)/(x²−4x+3) ≥ 0 → (−∞,−3]∪(1,3)∪(3,+∞): agujero en x = 3. */
  template(
    {
      id: "rat-autor2-04",
      subject: "math",
      topicId: "rational",
      subtopicId: "inequalities",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 270,
      tags: ["rational-inequality", "cancellation-trap", "hole"],
      prerequisites: ["simplifying", "domain"],
      source: {
        sourceId: "autor-recopilacion-2025",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "R2 · 4",
      },
      reasoning: "spurious",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$\\left(-\\infty, -3\\right] \\cup (1, 3) \\cup (3, +\\infty)$", "$\\left(-\\infty, -3\\right] \\cup (1, 3) \\cup (3, +\\infty)$"), correct: true },
        { id: "b", text: L("$\\left(-\\infty, -3\\right] \\cup (1, +\\infty)$", "$\\left(-\\infty, -3\\right] \\cup (1, +\\infty)$"), correct: false },
        { id: "c", text: L("$[-3, 1) \\cup (3, +\\infty)$", "$[-3, 1) \\cup (3, +\\infty)$"), correct: false },
        { id: "d", text: L("$\\left(-\\infty, -3\\right] \\cup [1, 3) \\cup (3, +\\infty)$", "$\\left(-\\infty, -3\\right] \\cup [1, 3) \\cup (3, +\\infty)$"), correct: false },
      ];
      return {
        skill: L(
          "Cancelar en una inecuación racional: el agujero en $x = 3$",
          "Cancelling in a rational inequality: the hole at $x = 3$",
        ),
        statement: L(
          "Determina el conjunto de verdad de $p(x): \\dfrac{x^{2} - 9}{x^{2} - 4x + 3} \\geq 0$, $x \\in \\mathbb{R}$. Es:",
          "Determine the truth set of $p(x): \\dfrac{x^{2} - 9}{x^{2} - 4x + 3} \\geq 0$, $x \\in \\mathbb{R}$. It is:",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Factoriza todo: $x^{2} - 9 = (x - 3)(x + 3)$ y $x^{2} - 4x + 3 = (x - 1)(x - 3)$. Hay un factor repetido.",
            "Factor everything: $x^{2} - 9 = (x - 3)(x + 3)$ and $x^{2} - 4x + 3 = (x - 1)(x - 3)$. One factor repeats.",
          ),
          L(
            "Puedes cancelar $(x - 3)$ para estudiar el signo, pero $x = 3$ no pertenece al dominio de la expresión original: es un agujero.",
            "You may cancel $(x - 3)$ to study the sign, but $x = 3$ does not belong to the domain of the original expression: it is a hole.",
          ),
          L(
            "La fracción reducida es $\\dfrac{x + 3}{x - 1}$: cero en $-3$, polo en $1$; resuelve y al final retira el agujero del resultado.",
            "The reduced fraction is $\\dfrac{x + 3}{x - 1}$: zero at $-3$, pole at $1$; solve it and at the end remove the hole from the result.",
          ),
        ],
        answerDisplay: L(
          "$A_{p(x)} = \\left(-\\infty, -3\\right] \\cup (1, 3) \\cup (3, +\\infty)$",
          "$A_{p(x)} = \\left(-\\infty, -3\\right] \\cup (1, 3) \\cup (3, +\\infty)$",
        ),
        solution: [
          step(
            "given",
            "$p(x): \\dfrac{x^{2} - 9}{x^{2} - 4x + 3} \\geq 0$; dominio: $x \\neq 1, 3$.",
            "$p(x): \\dfrac{x^{2} - 9}{x^{2} - 4x + 3} \\geq 0$; domain: $x \\neq 1, 3$.",
          ),
          step(
            "approach",
            "Factorizar, cancelar $(x - 3)$ (agujero en 3), resolver con tabla de signos la fracción reducida y retirar el agujero del resultado.",
            "Factor, cancel $(x - 3)$ (hole at 3), solve the reduced fraction with a sign table and remove the hole from the result.",
          ),
          step(
            "calculation",
            "$x^{2} - 9 = (x - 3)(x + 3)$, $\\quad x^{2} - 4x + 3 = (x - 1)(x - 3)$.<br>Para $x \\neq 1, 3$: $\\dfrac{(x-3)(x+3)}{(x-1)(x-3)} = \\dfrac{x + 3}{x - 1} \\geq 0$ — cero en $x = -3$, polo en $x = 1$.<br>$x < -3$: $(−)/(−) = +$ ✓; $x = -3$: fracción $= 0$ ✓; $-3 < x < 1$: $(+)/(−) = −$ ✗; $x > 1$: $(+)/(+) = +$ ✓ → $(-\\infty, -3] \\cup (1, +\\infty)$, menos el agujero $x = 3$.",
            "$x^{2} - 9 = (x - 3)(x + 3)$, $\\quad x^{2} - 4x + 3 = (x - 1)(x - 3)$.<br>For $x \\neq 1, 3$: $\\dfrac{(x-3)(x+3)}{(x-1)(x-3)} = \\dfrac{x + 3}{x - 1} \\geq 0$ — zero at $x = -3$, pole at $x = 1$.<br>$x < -3$: $(−)/(−) = +$ ✓; $x = -3$: fraction $= 0$ ✓; $-3 < x < 1$: $(+)/(−) = −$ ✗; $x > 1$: $(+)/(+) = +$ ✓ → $(-\\infty, -3] \\cup (1, +\\infty)$, minus the hole $x = 3$.",
          ),
          step(
            "result",
            "$A_{p(x)} = \\left(-\\infty, -3\\right] \\cup (1, 3) \\cup (3, +\\infty)$: el $-3$ entra (fracción 0), el 1 queda fuera (polo) y el 3 es un agujero del dominio. Verificación: $x = -3$: $\\dfrac{0}{24} = 0 \\geq 0$ ✓; $x = 2$: $\\dfrac{-5}{-1} = 5 \\geq 0$ ✓; $x = 3$: $\\dfrac{0}{0}$, indefinida ✗; $x = 0$: $\\dfrac{-9}{3} = -3 \\not\\geq 0$ ✗.",
            "$A_{p(x)} = \\left(-\\infty, -3\\right] \\cup (1, 3) \\cup (3, +\\infty)$: $-3$ enters (fraction 0), 1 stays out (pole) and 3 is a hole of the domain. Check: $x = -3$: $\\dfrac{0}{24} = 0 \\geq 0$ ✓; $x = 2$: $\\dfrac{-5}{-1} = 5 \\geq 0$ ✓; $x = 3$: $\\dfrac{0}{0}$, undefined ✗; $x = 0$: $\\dfrac{-9}{3} = -3 \\not\\geq 0$ ✗.",
          ),
        ],
      };
    },
  ),

  /* R2 · 5 — (x²−1)/(x²−5x+4) ≤ 0 → [−1,1)∪(1,4): agujero en x = 1, polo en 4. */
  template(
    {
      id: "rat-autor2-05",
      subject: "math",
      topicId: "rational",
      subtopicId: "inequalities",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 270,
      tags: ["rational-inequality", "cancellation-trap", "hole"],
      prerequisites: ["simplifying", "domain"],
      source: {
        sourceId: "autor-recopilacion-2025",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "R2 · 5",
      },
      reasoning: "spurious",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$[-1, 1) \\cup (1, 4)$", "$[-1, 1) \\cup (1, 4)$"), correct: true },
        { id: "b", text: L("$[-1, 4)$", "$[-1, 4)$"), correct: false },
        { id: "c", text: L("$[-1, 1) \\cup (1, 4]$", "$[-1, 1) \\cup (1, 4]$"), correct: false },
        { id: "d", text: L("$(-1, 1) \\cup (1, 4)$", "$(-1, 1) \\cup (1, 4)$"), correct: false },
      ];
      return {
        skill: L(
          "Cancelar en una inecuación racional: el agujero en $x = 1$",
          "Cancelling in a rational inequality: the hole at $x = 1$",
        ),
        statement: L(
          "Determina el conjunto de verdad de $p(x): \\dfrac{x^{2} - 1}{x^{2} - 5x + 4} \\leq 0$, $x \\in \\mathbb{R}$. Es:",
          "Determine the truth set of $p(x): \\dfrac{x^{2} - 1}{x^{2} - 5x + 4} \\leq 0$, $x \\in \\mathbb{R}$. It is:",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Factoriza: $x^{2} - 1 = (x - 1)(x + 1)$ y $x^{2} - 5x + 4 = (x - 1)(x - 4)$; el dominio excluye $x = 1$ y $x = 4$.",
            "Factor: $x^{2} - 1 = (x - 1)(x + 1)$ and $x^{2} - 5x + 4 = (x - 1)(x - 4)$; the domain excludes $x = 1$ and $x = 4$.",
          ),
          L(
            "El factor $(x - 1)$ se cancela para $x \\neq 1$: la tabla de signos se simplifica, pero el 1 NO vuelve al dominio.",
            "The factor $(x - 1)$ cancels for $x \\neq 1$: the sign table gets simpler, but 1 does NOT come back into the domain.",
          ),
          L(
            "Reducida queda $\\dfrac{x + 1}{x - 4}$: el cero del numerador entra (la fracción vale 0) y el polo no; quita además el punto cancelado.",
            "Reduced you get $\\dfrac{x + 1}{x - 4}$: the numerator's zero enters (the fraction equals 0) and the pole does not; also remove the cancelled point.",
          ),
        ],
        answerDisplay: L(
          "$A_{p(x)} = [-1, 1) \\cup (1, 4)$",
          "$A_{p(x)} = [-1, 1) \\cup (1, 4)$",
        ),
        solution: [
          step(
            "given",
            "$p(x): \\dfrac{x^{2} - 1}{x^{2} - 5x + 4} \\leq 0$; dominio: $x \\neq 1, 4$.",
            "$p(x): \\dfrac{x^{2} - 1}{x^{2} - 5x + 4} \\leq 0$; domain: $x \\neq 1, 4$.",
          ),
          step(
            "approach",
            "Factorizar, cancelar $(x - 1)$ (agujero en 1), resolver la inecuación reducida con tabla de signos y retirar el agujero.",
            "Factor, cancel $(x - 1)$ (hole at 1), solve the reduced inequality with a sign table and remove the hole.",
          ),
          step(
            "calculation",
            "$x^{2} - 1 = (x - 1)(x + 1)$, $\\quad x^{2} - 5x + 4 = (x - 1)(x - 4)$.<br>Para $x \\neq 1, 4$: $\\dfrac{(x-1)(x+1)}{(x-1)(x-4)} = \\dfrac{x + 1}{x - 4} \\leq 0$ — cero en $x = -1$, polo en $x = 4$.<br>$x < -1$: $(−)/(−) = +$ ✗; $-1 \\leq x < 4$: $(+)/(−) = −$ ✓ (fracción $0$ en $x = -1$); $x > 4$: $(+)/(+) = +$ ✗ → $[-1, 4)$, menos el agujero $x = 1$.",
            "$x^{2} - 1 = (x - 1)(x + 1)$, $\\quad x^{2} - 5x + 4 = (x - 1)(x - 4)$.<br>For $x \\neq 1, 4$: $\\dfrac{(x-1)(x+1)}{(x-1)(x-4)} = \\dfrac{x + 1}{x - 4} \\leq 0$ — zero at $x = -1$, pole at $x = 4$.<br>$x < -1$: $(−)/(−) = +$ ✗; $-1 \\leq x < 4$: $(+)/(−) = −$ ✓ (fraction $0$ at $x = -1$); $x > 4$: $(+)/(+) = +$ ✗ → $[-1, 4)$, minus the hole $x = 1$.",
          ),
          step(
            "result",
            "$A_{p(x)} = [-1, 1) \\cup (1, 4)$: el $-1$ entra (fracción 0), el 4 queda fuera (polo) y el 1 es un agujero. Verificación: $x = 0$: $\\dfrac{-1}{4} \\leq 0$ ✓; $x = -1$: $\\dfrac{0}{10} = 0 \\leq 0$ ✓; $x = 1$: $\\dfrac{0}{0}$, indefinida ✗; $x = 5$: $\\dfrac{24}{4} = 6 \\not\\leq 0$ ✗.",
            "$A_{p(x)} = [-1, 1) \\cup (1, 4)$: $-1$ enters (fraction 0), 4 stays out (pole) and 1 is a hole. Check: $x = 0$: $\\dfrac{-1}{4} \\leq 0$ ✓; $x = -1$: $\\dfrac{0}{10} = 0 \\leq 0$ ✓; $x = 1$: $\\dfrac{0}{0}$, undefined ✗; $x = 5$: $\\dfrac{24}{4} = 6 \\not\\leq 0$ ✗.",
          ),
        ],
      };
    },
  ),

  /* R2 · 22 — (x−a)/(x−2) ≤ 0 según el parámetro a: [a,2) / ∅ / (2,a]. */
  template(
    {
      id: "rat-autor2-22",
      subject: "math",
      topicId: "rational",
      subtopicId: "inequalities",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 360,
      tags: ["rational-inequality", "parametric", "case-analysis"],
      prerequisites: ["inequalities", "domain"],
      source: {
        sourceId: "autor-recopilacion-2025",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "R2 · 22",
      },
      reasoning: "parameters",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$a < 2:\\ [a, 2)$; $\\quad a = 2:\\ \\varnothing$; $\\quad a > 2:\\ (2, a]$", "$a < 2:\\ [a, 2)$; $\\quad a = 2:\\ \\varnothing$; $\\quad a > 2:\\ (2, a]$"), correct: true },
        { id: "b", text: L("$a < 2:\\ (a, 2]$; $\\quad a = 2:\\ \\varnothing$; $\\quad a > 2:\\ [2, a)$", "$a < 2:\\ (a, 2]$; $\\quad a = 2:\\ \\varnothing$; $\\quad a > 2:\\ [2, a)$"), correct: false },
        { id: "c", text: L("$a < 2:\\ (a, 2)$; $\\quad a > 2:\\ (2, a)$", "$a < 2:\\ (a, 2)$; $\\quad a > 2:\\ (2, a)$"), correct: false },
        { id: "d", text: L("$a < 2:\\ [a, 2]$; $\\quad a = 2:\\ \\varnothing$; $\\quad a > 2:\\ [2, a]$", "$a < 2:\\ [a, 2]$; $\\quad a = 2:\\ \\varnothing$; $\\quad a > 2:\\ [2, a]$"), correct: false },
      ];
      return {
        skill: L(
          "Inecuación racional con parámetro: análisis por casos",
          "Rational inequality with a parameter: case analysis",
        ),
        statement: L(
          "Resuelve, según el parámetro $a$, la inecuación $\\dfrac{x - a}{x - 2} \\leq 0$ (elige el análisis correcto por casos):",
          "Solve, according to the parameter $a$, the inequality $\\dfrac{x - a}{x - 2} \\leq 0$ (choose the correct case analysis):",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Los puntos frontera son $x = a$ (donde el numerador se anula) y $x = 2$ (polo); cuál va primero en la recta depende de $a$.",
            "The boundary points are $x = a$ (where the numerator vanishes) and $x = 2$ (pole); which one comes first on the line depends on $a$.",
          ),
          L(
            "Distingue tres situaciones — $a < 2$, $a = 2$ y $a > 2$ — y en cada una haz la tabla de signos de $\\dfrac{x - a}{x - 2}$.",
            "Distinguish three situations — $a < 2$, $a = 2$ and $a > 2$ — and in each one build the sign table of $\\dfrac{x - a}{x - 2}$.",
          ),
          L(
            "Con $a = 2$ la fracción vale $1$ para todo $x \\neq 2$: ¿cumple $1 \\leq 0$? Y recuerda: el cero del numerador sí puede entrar en la solución, el polo jamás.",
            "With $a = 2$ the fraction equals $1$ for every $x \\neq 2$: does $1 \\leq 0$ hold? And remember: the numerator's zero may enter the solution, the pole never.",
          ),
        ],
        answerDisplay: L(
          "$a < 2:\\ [a, 2)$; $\\quad a = 2:\\ \\varnothing$; $\\quad a > 2:\\ (2, a]$",
          "$a < 2:\\ [a, 2)$; $\\quad a = 2:\\ \\varnothing$; $\\quad a > 2:\\ (2, a]$",
        ),
        solution: [
          step(
            "given",
            "$\\dfrac{x - a}{x - 2} \\leq 0$ con parámetro $a \\in \\mathbb{R}$; el polo $x = 2$ es fijo y el cero del numerador $x = a$ se mueve con $a$.",
            "$\\dfrac{x - a}{x - 2} \\leq 0$ with parameter $a \\in \\mathbb{R}$; the pole $x = 2$ is fixed and the numerator's zero $x = a$ moves with $a$.",
          ),
          step(
            "approach",
            "Comparar los puntos frontera $a$ y $2$ en sus tres órdenes posibles ($a < 2$, $a = 2$, $a > 2$) y hacer la tabla de signos de cada caso.",
            "Compare the boundary points $a$ and $2$ in their three possible orders ($a < 2$, $a = 2$, $a > 2$) and build the sign table of each case.",
          ),
          step(
            "calculation",
            "Caso $a < 2$: $x < a$: $(−)/(−) = +$; $a \\leq x < 2$: $(+)/(−) = −$ ✓; $x > 2$: $(+)/(+) = +$ → $[a, 2)$.<br>Caso $a = 2$: $\\dfrac{x - 2}{x - 2} = 1$ para todo $x \\neq 2$, y $1 \\not\\leq 0$ → $\\varnothing$.<br>Caso $a > 2$: $x < 2$: $(−)/(−) = +$; $2 < x \\leq a$: $(−)/(+) = −$ ✓; $x > a$: $(+)/(+) = +$ → $(2, a]$.",
            "Case $a < 2$: $x < a$: $(−)/(−) = +$; $a \\leq x < 2$: $(+)/(−) = −$ ✓; $x > 2$: $(+)/(+) = +$ → $[a, 2)$.<br>Case $a = 2$: $\\dfrac{x - 2}{x - 2} = 1$ for every $x \\neq 2$, and $1 \\not\\leq 0$ → $\\varnothing$.<br>Case $a > 2$: $x < 2$: $(−)/(−) = +$; $2 < x \\leq a$: $(−)/(+) = −$ ✓; $x > a$: $(+)/(+) = +$ → $(2, a]$.",
          ),
          step(
            "result",
            "Análisis por casos: $a < 2$: $[a, 2)$; $\\quad a = 2$: $\\varnothing$; $\\quad a > 2$: $(2, a]$ — el cero $x = a$ entra (la fracción vale 0) y el polo $x = 2$ nunca. Verificación con $a = 0$ (→ $[0, 2)$): $x = 0$: $\\dfrac{0}{-2} = 0 \\leq 0$ ✓; $x = 1$: $\\dfrac{1}{-1} = -1 \\leq 0$ ✓; $x = 2$: indefinida ✗. Con $a = 5$ (→ $(2, 5]$): $x = 4$: $\\dfrac{-1}{2} \\leq 0$ ✓; $x = 5$: $\\dfrac{0}{3} = 0 \\leq 0$ ✓.",
            "Case analysis: $a < 2$: $[a, 2)$; $\\quad a = 2$: $\\varnothing$; $\\quad a > 2$: $(2, a]$ — the zero $x = a$ enters (the fraction equals 0) and the pole $x = 2$ never does. Check with $a = 0$ (→ $[0, 2)$): $x = 0$: $\\dfrac{0}{-2} = 0 \\leq 0$ ✓; $x = 1$: $\\dfrac{1}{-1} = -1 \\leq 0$ ✓; $x = 2$: undefined ✗. With $a = 5$ (→ $(2, 5]$): $x = 4$: $\\dfrac{-1}{2} \\leq 0$ ✓; $x = 5$: $\\dfrac{0}{3} = 0 \\leq 0$ ✓.",
          ),
        ],
      };
    },
  ),
];
