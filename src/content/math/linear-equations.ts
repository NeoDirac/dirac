/**
 * MATH · Linear equations & inequalities
 *
 * Exemplar file: demonstrates the `text` question type (interval notation)
 * and the `function-graph` diagram used with multiple-choice questions.
 */

import { template, L, step } from "@/lib/problem";
import type { ProblemTemplate, McOption } from "@/lib/types";

export const templates: ProblemTemplate[] = [
  /* ---------------------------------------------------------------- */
  /* One-step equations                                               */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "lin-one-01",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "one-step",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 60,
      tags: ["equations"],
      prerequisites: ["foundations"],
    },
    (rng) => {
      const x = rng.nonZeroInt(-12, 12);
      const a = rng.nonZeroInt(-15, 15);
      const b = x + a;
      const plus = a > 0;
      return {
        skill: L("Ecuaciones de un paso", "One-step equations"),
        statement: L(
          `Resuelve: $x ${plus ? "+" : "-"} ${Math.abs(a)} = ${b}$`,
          `Solve: $x ${plus ? "+" : "-"} ${Math.abs(a)} = ${b}$`,
        ),
        answer: { kind: "numeric", value: x },
        hints: [
          L(
            "El objetivo es dejar $x$ sola en un lado.",
            "The goal is to leave $x$ alone on one side.",
          ),
          L(
            `Aplica la operación inversa: ${plus ? "resta" : "suma"} $${Math.abs(a)}$ en los dos lados.`,
            `Apply the inverse operation: ${plus ? "subtract" : "add"} $${Math.abs(a)}$ on both sides.`,
          ),
          L(
            `Quédate con $x = $ lo que resulte en el lado derecho.`,
            `You are left with $x = $ whatever remains on the right side.`,
          ),
        ],
        answerDisplay: L(`$x = ${x}$`, `$x = ${x}$`),
        solution: [
          step("given", `$x ${plus ? "+" : "-"} ${Math.abs(a)} = ${b}$`, `$x ${plus ? "+" : "-"} ${Math.abs(a)} = ${b}$`),
          step(
            "approach",
            "Deshacemos la operación que acompaña a $x$ aplicando la inversa en ambos lados.",
            "Undo the operation attached to $x$ by applying its inverse on both sides.",
          ),
          step(
            "calculation",
            plus
              ? `$x + ${Math.abs(a)} - ${Math.abs(a)} = ${b} - ${Math.abs(a)}$`
              : `$x - ${Math.abs(a)} + ${Math.abs(a)} = ${b} + ${Math.abs(a)}$`,
            plus
              ? `$x + ${Math.abs(a)} - ${Math.abs(a)} = ${b} - ${Math.abs(a)}$`
              : `$x - ${Math.abs(a)} + ${Math.abs(a)} = ${b} + ${Math.abs(a)}$`,
          ),
          step("result", `$x = ${x}$`, `$x = ${x}$`),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Two-step equations (parameterized classic)                        */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "lin-two-01",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "multi-step",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 90,
      tags: ["equations"],
      prerequisites: ["foundations"],
    },
    (rng) => {
      const a = rng.nonZeroInt(2, 9) * (rng.bool() ? 1 : -1);
      const x = rng.nonZeroInt(-9, 9);
      const b = rng.nonZeroInt(-15, 15);
      const c = a * x + b;
      return {
        skill: L("Ecuaciones de dos pasos", "Two-step equations"),
        statement: L(
          `Resuelve: $${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${c}$`,
          `Solve: $${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${c}$`,
        ),
        answer: { kind: "numeric", value: x },
        hints: [
          L(
            "Primero elimina el término que no acompaña a $x$.",
            "First remove the term that does not multiply $x$.",
          ),
          L(
            `${b >= 0 ? "Resta" : "Suma"} $${Math.abs(b)}$ en los dos lados.`,
            `${b >= 0 ? "Subtract" : "Add"} $${Math.abs(b)}$ on both sides.`,
          ),
          L(
            `Después divide entre $${a}$.`,
            `Then divide by $${a}$.`,
          ),
        ],
        answerDisplay: L(`$x = ${x}$`, `$x = ${x}$`),
        solution: [
          step(
            "given",
            `$${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${c}$`,
            `$${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${c}$`,
          ),
          step(
            "approach",
            "Aislar $x$ en dos pasos: primero el término independiente, después el coeficiente.",
            "Isolate $x$ in two steps: the constant term first, then the coefficient.",
          ),
          step(
            "calculation",
            `$${a}x = ${c} ${b >= 0 ? "-" : "+"} ${Math.abs(b)} = ${a * x}$<br>$x = \\frac{${a * x}}{${a}} = ${x}$`,
            `$${a}x = ${c} ${b >= 0 ? "-" : "+"} ${Math.abs(b)} = ${a * x}$<br>$x = \\frac{${a * x}}{${a}} = ${x}$`,
          ),
          step("result", `$x = ${x}$`, `$x = ${x}$`),
        ],
      };
    },
  ),

  template(
    {
      id: "lin-both-01",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "multi-step",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 150,
      tags: ["equations"],
      prerequisites: ["multi-step"],
    },
    (rng) => {
      const x = rng.nonZeroInt(-6, 6);
      const a = rng.nonZeroInt(2, 8);
      const c = rng.nonZeroInt(2, 8);
      // ensure a != c so the equation is genuinely linear
      const aFinal = a === c ? a + 1 : a;
      const b = rng.int(-10, 10);
      const d = aFinal * x + b - c * x;
      return {
        skill: L("Ecuaciones con x en los dos lados", "Equations with x on both sides"),
        statement: L(
          `Resuelve: $${aFinal}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${c}x ${d >= 0 ? "+" : "-"} ${Math.abs(d)}$`,
          `Solve: $${aFinal}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${c}x ${d >= 0 ? "+" : "-"} ${Math.abs(d)}$`,
        ),
        answer: { kind: "numeric", value: x },
        hints: [
          L(
            "Reúne todos los términos con $x$ en un mismo lado.",
            "Bring every $x$ term to the same side.",
          ),
          L(
            `Resta $${c}x$ en los dos lados (o pasa $${c}x$ restando).`,
            `Subtract $${c}x$ from both sides.`,
          ),
          L(
            "Ahora tienes una ecuación de dos pasos.",
            "You now have a two-step equation.",
          ),
        ],
        answerDisplay: L(`$x = ${x}$`, `$x = ${x}$`),
        solution: [
          step(
            "given",
            `$${aFinal}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${c}x ${d >= 0 ? "+" : "-"} ${Math.abs(d)}$`,
            `$${aFinal}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${c}x ${d >= 0 ? "+" : "-"} ${Math.abs(d)}$`,
          ),
          step(
            "approach",
            "Agrupamos la $x$ a la izquierda y los números a la derecha.",
            "Group the $x$ terms on the left and the numbers on the right.",
          ),
          step(
            "calculation",
            `$${aFinal}x - ${c}x = ${d} ${b >= 0 ? "-" : "+"} ${Math.abs(b)}$<br>$${aFinal - c}x = ${d - b}$<br>$x = \\frac{${d - b}}{${aFinal - c}} = ${x}$`,
            `$${aFinal}x - ${c}x = ${d} ${b >= 0 ? "-" : "+"} ${Math.abs(b)}$<br>$${aFinal - c}x = ${d - b}$<br>$x = \\frac{${d - b}}{${aFinal - c}} = ${x}$`,
          ),
          step("result", `$x = ${x}$`, `$x = ${x}$`),
        ],
      };
    },
  ),

  template(
    {
      id: "lin-paren-01",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "parentheses",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 150,
      tags: ["equations", "distributive"],
      prerequisites: ["multi-step"],
    },
    (rng) => {
      const x = rng.nonZeroInt(-6, 6);
      const a = rng.nonZeroInt(2, 6);
      const b = rng.int(1, 9);
      const c = rng.int(-5, 5);
      const rhs = a * (x + b) + c;
      return {
        skill: L("Ecuaciones con paréntesis", "Equations with parentheses"),
        statement: L(
          `Resuelve: $${a}(x + ${b}) ${c >= 0 ? "+" : "-"} ${Math.abs(c)} = ${rhs}$`,
          `Solve: $${a}(x + ${b}) ${c >= 0 ? "+" : "-"} ${Math.abs(c)} = ${rhs}$`,
        ),
        answer: { kind: "numeric", value: x },
        hints: [
          L(
            "Aplica la propiedad distributiva para quitar el paréntesis.",
            "Use the distributive property to remove the parentheses.",
          ),
          L(
            `$${a}(x + ${b}) = ${a}x + ${a * b}$.`,
            `$${a}(x + ${b}) = ${a}x + ${a * b}$.`,
          ),
          L(
            "Después resuelve la ecuación de dos pasos.",
            "Then solve the resulting two-step equation.",
          ),
        ],
        answerDisplay: L(`$x = ${x}$`, `$x = ${x}$`),
        solution: [
          step(
            "given",
            `$${a}(x + ${b}) ${c >= 0 ? "+" : "-"} ${Math.abs(c)} = ${rhs}$`,
            `$${a}(x + ${b}) ${c >= 0 ? "+" : "-"} ${Math.abs(c)} = ${rhs}$`,
          ),
          step(
            "approach",
            "Expandimos y reducimos antes de aislar $x$.",
            "Expand and simplify before isolating $x$.",
          ),
          step(
            "calculation",
            `$${a}x + ${a * b} ${c >= 0 ? "+" : "-"} ${Math.abs(c)} = ${rhs}$<br>$${a}x + ${a * b + c} = ${rhs}$<br>$${a}x = ${rhs - (a * b + c)}$<br>$x = ${x}$`,
            `$${a}x + ${a * b} ${c >= 0 ? "+" : "-"} ${Math.abs(c)} = ${rhs}$<br>$${a}x + ${a * b + c} = ${rhs}$<br>$${a}x = ${rhs - (a * b + c)}$<br>$x = ${x}$`,
          ),
          step("result", `$x = ${x}$`, `$x = ${x}$`),
        ],
      };
    },
  ),

  template(
    {
      id: "lin-frac-01",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "fractions",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 150,
      tags: ["equations", "fractions"],
      prerequisites: ["multi-step"],
    },
    (rng) => {
      const den = rng.pick([2, 3, 4, 5, 6]);
      const x = rng.nonZeroInt(-8, 8) * den; // guarantees integer numerator
      const b = rng.int(1, 9);
      const rhs = x / den + b;
      return {
        skill: L("Ecuaciones con fracciones", "Equations with fractions"),
        statement: L(
          `Resuelve: $\\frac{x}{${den}} + ${b} = ${rhs}$`,
          `Solve: $\\frac{x}{${den}} + ${b} = ${rhs}$`,
        ),
        answer: { kind: "numeric", value: x },
        hints: [
          L(
            "Puedes deshacerte de la fracción multiplicando toda la ecuación por el denominador.",
            "You can clear the fraction by multiplying the whole equation by the denominator.",
          ),
          L(
            `Multiplica cada término por $${den}$.`,
            `Multiply every term by $${den}$.`,
          ),
          L(
            `El numerador queda $x = ${den} \\cdot (${rhs} - ${b})$.`,
            `The numerator becomes $x = ${den} \\cdot (${rhs} - ${b})$.`,
          ),
        ],
        answerDisplay: L(`$x = ${x}$`, `$x = ${x}$`),
        solution: [
          step(
            "given",
            `$\\frac{x}{${den}} + ${b} = ${rhs}$`,
            `$\\frac{x}{${den}} + ${b} = ${rhs}$`,
          ),
          step(
            "approach",
            `Multiplicamos por $${den}$ para eliminar el denominador.`,
            `Multiply by $${den}$ to clear the denominator.`,
          ),
          step(
            "calculation",
            `$x + ${den} \\cdot ${b} = ${den} \\cdot ${rhs}$<br>$x = ${den * rhs} - ${den * b} = ${x}$`,
            `$x + ${den} \\cdot ${b} = ${den} \\cdot ${rhs}$<br>$x = ${den * rhs} - ${den * b} = ${x}$`,
          ),
          step("result", `$x = ${x}$`, `$x = ${x}$`),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Literal equations                                                 */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "lin-lit-01",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "literal",
      difficulty: "hard",
      questionType: "expression",
      estimatedTimeSec: 180,
      tags: ["literal-equations"],
      prerequisites: ["multi-step"],
    },
    (rng) => {
      const variant = rng.int(0, 2);
      if (variant === 0) {
        // P = 2a + 2b  →  solve for a
        return {
          skill: L("Despejar una variable (perímetro)", "Solving for a variable (perimeter)"),
          statement: L(
            "Despeja $a$ en función de $P$ y $b$: si $P = 2a + 2b$, entonces $a = ?$ (escribe por ejemplo (P-2b)/2).",
            "Solve for $a$ in terms of $P$ and $b$: if $P = 2a + 2b$, then $a = ?$ (write e.g. (P-2b)/2).",
          ),
          answer: {
            kind: "expression",
            accepted: ["(P - 2b)/2", "P/2 - b", "(P-2b)/2"],
            variables: ["P", "b"],
          },
          hints: [
            L("Aísla primero el término $2a$.", "Isolate the $2a$ term first."),
            L("Resta $2b$ en los dos lados.", "Subtract $2b$ from both sides."),
            L("Divide entre 2.", "Divide by 2."),
          ],
          answerDisplay: L("$a = \\frac{P - 2b}{2}$", "$a = \\frac{P - 2b}{2}$"),
          solution: [
            step("given", "$P = 2a + 2b$", "$P = 2a + 2b$"),
            step("approach", "Tratamos $b$ como un número cualquiera.", "Treat $b$ as just a number."),
            step(
              "calculation",
              "$P - 2b = 2a$<br>$a = \\frac{P - 2b}{2}$",
              "$P - 2b = 2a$<br>$a = \\frac{P - 2b}{2}$",
            ),
            step("result", "$a = \\frac{P - 2b}{2}$", "$a = \\frac{P - 2b}{2}$"),
          ],
        };
      } else if (variant === 1) {
        // C = (5/9)(F - 32) → solve for F
        return {
          skill: L("Despejar en una fórmula (temperatura)", "Rearranging a formula (temperature)"),
          statement: L(
            "Si $C = \\frac{5}{9}(F - 32)$, despeja $F$ (escribe por ejemplo 9C/5+32).",
            "If $C = \\frac{5}{9}(F - 32)$, solve for $F$ (write e.g. 9C/5+32).",
          ),
          answer: {
            kind: "expression",
            accepted: ["9C/5 + 32", "(9C + 160)/5", "9C/5+32"],
            variables: ["C"],
          },
          hints: [
            L("Deshaz primero la multiplicación por $\\frac{5}{9}$.", "Undo the multiplication by $\\frac{5}{9}$ first."),
            L("Multiplica ambos lados por $\\frac{9}{5}$.", "Multiply both sides by $\\frac{9}{5}$."),
            L("Después suma 32.", "Then add 32."),
          ],
          answerDisplay: L("$F = \\frac{9C}{5} + 32$", "$F = \\frac{9C}{5} + 32$"),
          solution: [
            step("given", "$C = \\frac{5}{9}(F - 32)$", "$C = \\frac{5}{9}(F - 32)$"),
            step("approach", "Aislar el paréntesis y luego $F$.", "Isolate the parentheses, then $F$."),
            step(
              "calculation",
              "$\\frac{9}{5}C = F - 32$<br>$F = \\frac{9C}{5} + 32$",
              "$\\frac{9}{5}C = F - 32$<br>$F = \\frac{9C}{5} + 32$",
            ),
            step("result", "$F = \\frac{9C}{5} + 32$", "$F = \\frac{9C}{5} + 32$"),
          ],
        };
      } else {
        // A = (1/2)bh → solve for h
        return {
          skill: L("Despejar en una fórmula (área)", "Rearranging a formula (area)"),
          statement: L(
            "Si $A = \\frac{1}{2}bh$, despeja $h$ (escribe por ejemplo 2A/b).",
            "If $A = \\frac{1}{2}bh$, solve for $h$ (write e.g. 2A/b).",
          ),
          answer: {
            kind: "expression",
            accepted: ["2A/b", "2*A/b"],
            variables: ["A", "b"],
          },
          hints: [
            L("Elimina el factor $\\frac{1}{2}$ multiplicando por 2.", "Clear the $\\frac{1}{2}$ by multiplying by 2."),
            L("$2A = bh$.", "$2A = bh$."),
            L("Divide entre $b$.", "Divide by $b$."),
          ],
          answerDisplay: L("$h = \\frac{2A}{b}$", "$h = \\frac{2A}{b}$"),
          solution: [
            step("given", "$A = \\frac{1}{2}bh$", "$A = \\frac{1}{2}bh$"),
            step("approach", "Aislar $h$ paso a paso.", "Isolate $h$ step by step."),
            step(
              "calculation",
              "$2A = bh$<br>$h = \\frac{2A}{b}$",
              "$2A = bh$<br>$h = \\frac{2A}{b}$",
            ),
            step("result", "$h = \\frac{2A}{b}$", "$h = \\frac{2A}{b}$"),
          ],
        };
      }
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Inequalities + interval notation (text type exemplar)             */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "lin-ineq-01",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "interval-notation",
      difficulty: "medium",
      questionType: "text",
      estimatedTimeSec: 150,
      tags: ["inequalities", "interval-notation"],
      prerequisites: ["multi-step"],
    },
    (rng) => {
      const x = rng.int(-6, 6);
      const a = rng.nonZeroInt(2, 6) * (rng.bool() ? 1 : -1);
      const b = rng.nonZeroInt(-10, 10);
      const c = a * x + b;
      const strict = rng.bool();
      const op = strict ? "<" : "\\le";
      // solution: a x + b op c  →  x op (c-b)/a ; careful when a < 0 (flips)
      const bound = (c - b) / a;
      const flipped = a < 0;
      const finalOp = flipped ? (strict ? ">" : "\\ge") : op;
      const sol = flipped ? (strict ? ">" : "≥") : strict ? "<" : "≤";
      return {
        skill: L("Desigualdades y notación de intervalos", "Inequalities and interval notation"),
        statement: L(
          `Resuelve $${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)} ${op} ${c}$ y escribe la solución en notación de intervalos (por ejemplo (-3, 5) o [2, inf)).`,
          `Solve $${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)} ${op} ${c}$ and write the solution in interval notation (e.g. (-3, 5) or [2, inf)).`,
        ),
        answer: {
          kind: "text",
          accepted: [
            strict
              ? `(-inf, ${bound})`
              : `(-inf, ${bound}]`,
            strict ? `(-∞, ${bound})` : `(-∞, ${bound}]`,
            strict ? `x<${bound}` : `x≤${bound}`,
            strict ? `x<${bound}` : `x<=${bound}`,
          ],
        },
        hints: [
          L(
            "Resuélvela como una ecuación, pero vigilando el signo.",
            "Solve it like an equation, watching the sign.",
          ),
          flipped
            ? L(
                `Al dividir entre $${a}$ (negativo), la desigualdad **se invierte**.`,
                `When dividing by $${a}$ (negative), the inequality **flips**.`,
              )
            : L(
                `Divide entre $${a}$ conservando el sentido de la desigualdad.`,
                `Divide by $${a}$ keeping the inequality direction.`,
              ),
          L(
            `El extremo ${strict ? "no se incluye" : "sí se incluye"}: usa ${strict ? "paréntesis" : "corchete"}.`,
            `The endpoint is ${strict ? "excluded" : "included"}: use a ${strict ? "parenthesis" : "bracket"}.`,
          ),
        ],
        answerDisplay: L(
          strict ? `$x < ${bound}$, es decir $(-\\infty, ${bound})$` : `$x \\le ${bound}$, es decir $(-\\infty, ${bound}]$`,
          strict ? `$x < ${bound}$, i.e. $(-\\infty, ${bound})$` : `$x \\le ${bound}$, i.e. $(-\\infty, ${bound}]$`,
        ),
        solution: [
          step(
            "given",
            `$${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)} ${op} ${c}$`,
            `$${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)} ${op} ${c}$`,
          ),
          step(
            "approach",
            "Aislamos $x$; recuerda que dividir por un negativo invierte la desigualdad.",
            "Isolate $x$; remember dividing by a negative flips the inequality.",
          ),
          step(
            "calculation",
            `$${a}x ${op} ${c} ${b >= 0 ? "-" : "+"} ${Math.abs(b)} = ${c - b}$<br>$x ${sol} \\frac{${c - b}}{${a}} = ${bound}$`,
            `$${a}x ${op} ${c} ${b >= 0 ? "-" : "+"} ${Math.abs(b)} = ${c - b}$<br>$x ${sol} \\frac{${c - b}}{${a}} = ${bound}$`,
          ),
          step(
            "result",
            strict ? `$x < ${bound}$, en intervalos: $(-\\infty, ${bound})$.` : `$x \\le ${bound}$, en intervalos: $(-\\infty, ${bound}]$.`,
            strict ? `$x < ${bound}$, in intervals: $(-\\infty, ${bound})$.` : `$x \\le ${bound}$, in intervals: $(-\\infty, ${bound}]$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Absolute value equations                                          */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "lin-abs-01",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "abs-equations",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 150,
      tags: ["absolute-value"],
      prerequisites: ["multi-step"],
    },
    (rng) => {
      const h = rng.nonZeroInt(-7, 7);
      const k = rng.int(2, 12);
      // |x - h| = k → x = h ± k
      const larger = h + k;
      const smaller = h - k;
      const askLarger = rng.bool();
      const value = askLarger ? larger : smaller;
      return {
        skill: L("Ecuaciones con valor absoluto", "Absolute value equations"),
        statement: L(
          `La ecuación $|x - (${h})| = ${k}$ tiene dos soluciones. Escribe la ${askLarger ? "mayor" : "menor"}.`,
          `The equation $|x - (${h})| = ${k}$ has two solutions. Write the ${askLarger ? "larger" : "smaller"} one.`,
        ),
        answer: { kind: "numeric", value },
        hints: [
          L(
            "El valor absoluto anula el signo: hay dos casos posibles.",
            "Absolute value erases the sign: there are two possible cases.",
          ),
          L(
            `Caso 1: $x - (${h}) = ${k}$. Caso 2: $x - (${h}) = -${k}$.`,
            `Case 1: $x - (${h}) = ${k}$. Case 2: $x - (${h}) = -${k}$.`,
          ),
          L(
            "Resuelve ambos casos y elige la solución que se pide.",
            "Solve both cases and pick the requested solution.",
          ),
        ],
        answerDisplay: L(
          `$x_1 = ${smaller}$, $x_2 = ${larger}$`,
          `$x_1 = ${smaller}$, $x_2 = ${larger}$`,
        ),
        solution: [
          step("given", `$|x - (${h})| = ${k}$`, `$|x - (${h})| = ${k}$`),
          step(
            "approach",
            "Separamos en dos ecuaciones: expresión = k y expresión = −k.",
            "Split into two equations: expression = k and expression = −k.",
          ),
          step(
            "calculation",
            `$x - (${h}) = ${k} \\Rightarrow x = ${larger}$<br>$x - (${h}) = -${k} \\Rightarrow x = ${smaller}$`,
            `$x - (${h}) = ${k} \\Rightarrow x = ${larger}$<br>$x - (${h}) = -${k} \\Rightarrow x = ${smaller}$`,
          ),
          step(
            "result",
            `Las soluciones son $${smaller}$ y $${larger}$; la ${askLarger ? "mayor" : "menor"} es $${value}$.`,
            `The solutions are $${smaller}$ and $${larger}$; the ${askLarger ? "larger" : "smaller"} is $${value}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Graph interpretation (function-graph diagram exemplar)            */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "lin-graph-01",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "multi-step",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["graphs", "slope"],
      prerequisites: ["multi-step"],
    },
    (rng) => {
      const m = rng.nonZeroInt(-3, 3);
      const b = rng.nonZeroInt(-4, 4);
      const options: McOption[] = [
        { id: "a", text: L(`$y = ${m}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}$`, `$y = ${m}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}$`), correct: true },
        { id: "b", text: L(`$y = ${-m}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}$`, `$y = ${-m}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}$`), correct: false },
        { id: "c", text: L(`$y = ${m}x ${-b >= 0 ? "+" : "-"} ${Math.abs(b)}$`, `$y = ${m}x ${-b >= 0 ? "+" : "-"} ${Math.abs(b)}$`), correct: false },
        { id: "d", text: L(`$y = ${b}x ${m >= 0 ? "+" : "-"} ${Math.abs(m)}$`, `$y = ${b}x ${m >= 0 ? "+" : "-"} ${Math.abs(m)}$`), correct: false },
      ];
      return {
        skill: L("Leer la pendiente y la ordenada en la gráfica", "Reading slope and intercept from a graph"),
        statement: L(
          "La gráfica muestra una recta. ¿Qué ecuación la representa?",
          "The graph shows a straight line. Which equation represents it?",
        ),
        diagram: {
          kind: "function-graph",
          xMin: -6,
          xMax: 6,
          yMin: -6,
          yMax: 6,
          curves: [{ fn: `${m}*x + ${b}`, color: "primary" }],
          points: [
            { x: 0, y: b, label: `(0, ${b})` },
            { x: 1, y: m + b, label: `(1, ${m + b})` },
          ],
          showGrid: true,
          xLabel: "x",
          yLabel: "y",
        },
        diagramLabel: L(
          `Recta que corta el eje y en ${b} y pasa por (1, ${m + b}).`,
          `A line crossing the y-axis at ${b} and passing through (1, ${m + b}).`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "La ordenada en el origen es donde la recta corta al eje $y$.",
            "The y-intercept is where the line crosses the $y$-axis.",
          ),
          L(
            `La recta pasa por $(0, ${b})$: ese es el término independiente.`,
            `The line passes through $(0, ${b})$: that is the constant term.`,
          ),
          L(
            `De $(0, ${b})$ a $(1, ${m + b})$ la recta sube ${m > 0 ? "" : "baja "}${Math.abs(m)}: esa es la pendiente.`,
            `From $(0, ${b})$ to $(1, ${m + b})$ the line ${m > 0 ? "rises" : "falls"} ${Math.abs(m)}: that is the slope.`,
          ),
        ],
        answerDisplay: L(
          `$y = ${m}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}$`,
          `$y = ${m}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}$`,
        ),
        solution: [
          step(
            "given",
            `La recta pasa por $(0, ${b})$ y $(1, ${m + b})$.`,
            `The line passes through $(0, ${b})$ and $(1, ${m + b})$.`,
          ),
          step(
            "approach",
            "Identificamos $b$ (ordenada en el origen) y $m$ (pendiente) para $y = mx + b$.",
            "Identify $b$ (y-intercept) and $m$ (slope) for $y = mx + b$.",
          ),
          step(
            "calculation",
            `$b = ${b}$ (corte con el eje $y$)<br>$m = \\frac{${m + b} - ${b}}{1 - 0} = ${m}$`,
            `$b = ${b}$ (y-axis crossing)<br>$m = \\frac{${m + b} - ${b}}{1 - 0} = ${m}$`,
          ),
          step(
            "result",
            `$y = ${m}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}$`,
            `$y = ${m}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}$`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Challenge: word problem                                          */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "lin-word-01",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "multi-step",
      difficulty: "challenge",
      questionType: "numeric",
      estimatedTimeSec: 240,
      tags: ["word-problems", "equations"],
      prerequisites: ["multi-step", "fractions"],
    },
    (rng) => {
      const width = rng.int(4, 15);
      const extra = rng.int(2, 6);
      const length = width + extra;
      const perimeter = 2 * (width + length);
      // Ask: given perimeter and length = width + extra, find width
      const targetWidth = rng.bool();
      const value = targetWidth ? width : length;
      return {
        skill: L("Plantear y resolver un problema con ecuación lineal", "Setting up and solving a linear equation"),
        statement: L(
          `El perímetro de un rectángulo mide $${perimeter}\\ \\text{m}$ y su largo mide $${extra}\\ \\text{m}$ más que su ancho. ¿Cuánto mide el ${targetWidth ? "ancho" : "largo"}?`,
          `A rectangle's perimeter is $${perimeter}\\ \\text{m}$ and its length is $${extra}\\ \\text{m}$ more than its width. How long is the ${targetWidth ? "width" : "length"}?`,
        ),
        answer: { kind: "numeric", value, unitSuffix: "m" },
        hints: [
          L(
            "Llama $x$ a la incógnita más pequeña y expresa la otra con $x$.",
            "Call the smaller quantity $x$ and express the other using $x$.",
          ),
          targetWidth
            ? L(
                `Si el ancho es $x$, el largo es $x + ${extra}$.`,
                `If the width is $x$, the length is $x + ${extra}$.`,
              )
            : L(
                `Si el largo es $x$, el ancho es $x - ${extra}$.`,
                `If the length is $x$, the width is $x - ${extra}$.`,
              ),
          L(
            `El perímetro es $2(\\text{ancho} + \\text{largo}) = ${perimeter}$.`,
            `The perimeter is $2(\\text{width} + \\text{length}) = ${perimeter}$.`,
          ),
        ],
        answerDisplay: L(
          `$${targetWidth ? "ancho" : "largo"} = ${value}\\ \\text{m}$`,
          `$${targetWidth ? "width" : "length"} = ${value}\\ \\text{m}$`,
        ),
        solution: [
          step(
            "given",
            `Perímetro $= ${perimeter}$ m. Largo $=$ ancho $+ ${extra}$.`,
            `Perimeter $= ${perimeter}$ m. Length $=$ width $+ ${extra}$.`,
          ),
          step(
            "approach",
            "Planteamos una ecuación con una única incógnita $x$.",
            "Set up an equation with a single unknown $x$.",
          ),
          step(
            "calculation",
            `$2(x + x + ${extra}) = ${perimeter}$<br>$2(2x + ${extra}) = ${perimeter}$<br>$4x + ${2 * extra} = ${perimeter}$<br>$4x = ${perimeter - 2 * extra}$<br>$x = ${width}$`,
            `$2(x + x + ${extra}) = ${perimeter}$<br>$2(2x + ${extra}) = ${perimeter}$<br>$4x + ${2 * extra} = ${perimeter}$<br>$4x = ${perimeter - 2 * extra}$<br>$x = ${width}$`,
          ),
          step(
            "result",
            `El ancho mide $${width}\\ \\text{m}$ y el largo $${length}\\ \\text{m}$. Se pide el ${targetWidth ? "ancho" : "largo"}: $${value}\\ \\text{m}$.`,
            `The width is $${width}\\ \\text{m}$ and the length $${length}\\ \\text{m}$. The requested ${targetWidth ? "width" : "length"} is $${value}\\ \\text{m}$.`,
          ),
        ],
      };
    },
  ),
];
