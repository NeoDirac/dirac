/**
 * MATH · Linear equations & inequalities
 *
 * Exemplar file: demonstrates the `text` question type (interval notation)
 * and the `function-graph` diagram used with multiple-choice questions.
 */

import { template, L, step, tok } from "@/lib/problem";
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
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 90,
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

  /* ---------------------------------------------------------------- */
  /* Linear inequalities: smallest integer solution (7-a top-up)       */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "lin-ineq-02",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "inequalities",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 120,
      tags: ["inequalities", "integers", "number-line"],
      prerequisites: ["multi-step"],
    },
    (rng) => {
      // Hand-curated sets: every boundary (c − b)/a is a NON-integer, so the
      // smallest integer solution is unambiguous. The ≤ variants carry a < 0,
      // so dividing flips the symbol and the solution is still x ≥ boundary.
      const sets = [
        { sign: "\\ge", a: 2, b: 3, c: 10 },
        { sign: "\\le", a: -2, b: 1, c: 8 },
        { sign: "\\ge", a: 4, b: -1, c: 26 },
        { sign: "\\le", a: -4, b: 3, c: 16 },
        { sign: "\\ge", a: 2, b: -5, c: 4 },
        { sign: "\\le", a: -2, b: -4, c: 7 },
      ];
      const p = rng.pick(sets);
      const flips = p.a < 0;
      const bound = (p.c - p.b) / p.a;
      const ans = Math.ceil(bound);
      return {
        skill: L("Desigualdades lineales y enteros", "Linear inequalities and integers"),
        statement: L(
          `Considera la desigualdad $${p.a}x ${p.b >= 0 ? "+" : "-"} ${Math.abs(p.b)} ${p.sign} ${p.c}$. ¿Cuál es el **menor número entero** que la satisface?`,
          `Consider the inequality $${p.a}x ${p.b >= 0 ? "+" : "-"} ${Math.abs(p.b)} ${p.sign} ${p.c}$. What is the **smallest integer** that satisfies it?`,
        ),
        answer: { kind: "numeric", value: ans },
        hints: [
          L(
            "Despeja $x$ como si fuera una ecuación, pero vigila el signo del coeficiente que multiplica a $x$.",
            "Isolate $x$ as if it were an equation, but watch the sign of the coefficient multiplying $x$.",
          ),
          flips
            ? L(
                `Al dividir entre $${p.a}$, que es negativo, la desigualdad **se invierte**: el $${p.sign}$ pasa a ser $\\ge$.`,
                `When dividing by $${p.a}$, which is negative, the inequality **flips**: the $${p.sign}$ becomes a $\\ge$.`,
              )
            : L(
                `Pasa el término independiente al otro lado y divide entre $${p.a}$; el sentido de la desigualdad no cambia.`,
                `Move the constant term to the other side and divide by $${p.a}$; the inequality direction does not change.`,
              ),
          L(
            "El extremo de la solución **no** es un entero: sitúalo en la recta numérica y busca el primer entero que quede dentro de la solución.",
            "The endpoint of the solution is **not** an integer: place it on the number line and find the first integer that lies inside the solution.",
          ),
        ],
        answerDisplay: L(
          `$x \\ge ${tok(bound)}$, así que el menor entero es $x = ${ans}$`,
          `$x \\ge ${tok(bound)}$, so the smallest integer is $x = ${ans}$`,
        ),
        solution: [
          step(
            "given",
            `$${p.a}x ${p.b >= 0 ? "+" : "-"} ${Math.abs(p.b)} ${p.sign} ${p.c}$`,
            `$${p.a}x ${p.b >= 0 ? "+" : "-"} ${Math.abs(p.b)} ${p.sign} ${p.c}$`,
          ),
          step(
            "approach",
            "Aislamos $x$ (invirtiendo el símbolo si dividimos entre un negativo) y después razonamos sobre la recta numérica.",
            "Isolate $x$ (flipping the symbol if we divide by a negative) and then reason on the number line.",
          ),
          step(
            "calculation",
            `$${p.a}x ${p.sign} ${p.c} ${p.b >= 0 ? "-" : "+"} ${Math.abs(p.b)} = ${p.c - p.b}$<br>$x \\ge \\frac{${p.c - p.b}}{${p.a}} = ${tok(bound)}$`,
            `$${p.a}x ${p.sign} ${p.c} ${p.b >= 0 ? "-" : "+"} ${Math.abs(p.b)} = ${p.c - p.b}$<br>$x \\ge \\frac{${p.c - p.b}}{${p.a}} = ${tok(bound)}$`,
          ),
          step(
            "result",
            `La solución es $x \\ge ${tok(bound)}$: los enteros que la satisfacen son $${ans}, ${ans + 1}, ${ans + 2}, \\ldots$ El menor es $x = ${ans}$.`,
            `The solution is $x \\ge ${tok(bound)}$: the integers satisfying it are $${ans}, ${ans + 1}, ${ans + 2}, \\ldots$ The smallest one is $x = ${ans}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Compound inequalities, multiple choice (7-a top-up)               */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "lin-ineq-03",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "compound",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["inequalities", "compound", "multiple-choice"],
      prerequisites: ["multi-step", "inequalities"],
    },
    (rng) => {
      // Hand-curated sets A < a·x + b ≤ B: (A − b) and (B − b) are divisible
      // by a, so both endpoints of the solution are integers.
      const sets = [
        { a: 2, A: 3, b: -1, B: 9 },
        { a: 2, A: 5, b: -3, B: 15 },
        { a: 2, A: 1, b: -5, B: 11 },
        { a: 3, A: 4, b: -2, B: 13 },
        { a: 3, A: 5, b: -4, B: 17 },
        { a: 4, A: 3, b: -1, B: 19 },
        { a: 2, A: 3, b: 5, B: 21 },
      ];
      const p = rng.pick(sets);
      const lo = (p.A - p.b) / p.a;
      const hi = (p.B - p.b) / p.a;
      const correct = `$${lo} < x \\le ${hi}$`;
      const options: McOption[] = [
        { id: "a", text: L(correct, correct), correct: true },
        // left endpoint wrongly made inclusive
        { id: "b", text: L(`$${lo} \\le x \\le ${hi}$`, `$${lo} \\le x \\le ${hi}$`), correct: false },
        // right endpoint wrongly made exclusive
        { id: "c", text: L(`$${lo} < x < ${hi}$`, `$${lo} < x < ${hi}$`), correct: false },
        // division by a never performed
        { id: "d", text: L(`$${p.A - p.b} < x \\le ${p.B - p.b}$`, `$${p.A - p.b} < x \\le ${p.B - p.b}$`), correct: false },
      ];
      return {
        skill: L("Desigualdades compuestas", "Compound inequalities"),
        statement: L(
          `Resuelve la desigualdad compuesta $${p.A} < ${p.a}x ${p.b >= 0 ? "+" : "-"} ${Math.abs(p.b)} \\le ${p.B}$ y elige su solución.`,
          `Solve the compound inequality $${p.A} < ${p.a}x ${p.b >= 0 ? "+" : "-"} ${Math.abs(p.b)} \\le ${p.B}$ and choose its solution.`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Una desigualdad compuesta exige que se cumplan **las dos** a la vez: la expresión central queda atrapada entre los dos extremos.",
            "A compound inequality requires **both** to hold at once: the middle expression is trapped between the two extremes.",
          ),
          L(
            "Aplica la misma operación a las **tres** partes: primero suma o resta para que en el centro quede solo el término con $x$.",
            "Apply the same operation to all **three** parts: first add or subtract so that only the $x$-term remains in the middle.",
          ),
          L(
            `Divide las tres partes entre $${p.a}$ y revisa qué extremo lleva $<$ y cuál $\\le$.`,
            `Divide all three parts by $${p.a}$ and check which endpoint carries $<$ and which one $\\le$.`,
          ),
        ],
        answerDisplay: L(correct, correct),
        solution: [
          step(
            "given",
            `$${p.A} < ${p.a}x ${p.b >= 0 ? "+" : "-"} ${Math.abs(p.b)} \\le ${p.B}$`,
            `$${p.A} < ${p.a}x ${p.b >= 0 ? "+" : "-"} ${Math.abs(p.b)} \\le ${p.B}$`,
          ),
          step(
            "approach",
            "Operamos a la vez sobre las tres partes hasta dejar $x$ sola en el centro; el sentido de cada desigualdad se conserva porque el coeficiente es positivo.",
            "We operate on all three parts at once until $x$ is alone in the middle; each inequality keeps its direction because the coefficient is positive.",
          ),
          step(
            "calculation",
            `${p.b < 0 ? `Sumamos $${-p.b}$ a las tres partes` : `Restamos $${p.b}$ a las tres partes`}:<br>$${p.A - p.b} < ${p.a}x \\le ${p.B - p.b}$<br>Dividimos entre $${p.a}$:<br>$\\frac{${p.A - p.b}}{${p.a}} < x \\le \\frac{${p.B - p.b}}{${p.a}}$, es decir, $${lo} < x \\le ${hi}$`,
            `${p.b < 0 ? `Add $${-p.b}$ to all three parts` : `Subtract $${p.b}$ from all three parts`}:<br>$${p.A - p.b} < ${p.a}x \\le ${p.B - p.b}$<br>Divide by $${p.a}$:<br>$\\frac{${p.A - p.b}}{${p.a}} < x \\le \\frac{${p.B - p.b}}{${p.a}}$, that is, $${lo} < x \\le ${hi}$`,
          ),
          step(
            "result",
            `La solución es $${lo} < x \\le ${hi}$: por ejemplo, los enteros que la cumplen van de $${lo + 1}$ a $${hi}$.`,
            `The solution is $${lo} < x \\le ${hi}$: for instance, the integers satisfying it run from $${lo + 1}$ to $${hi}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Absolute value inequalities: counting integer solutions           */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "lin-absi-01",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "abs-inequalities",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 120,
      tags: ["absolute-value", "inequalities", "counting"],
      prerequisites: ["multi-step", "inequalities"],
    },
    (rng) => {
      // Hand-curated (a, b) with b ∈ {2, 3}: the open interval (a − b, a + b)
      // contains exactly 3 or 5 integers.
      const sets = [
        { a: 1, b: 2 },
        { a: -3, b: 2 },
        { a: 2, b: 3 },
        { a: -1, b: 3 },
        { a: 5, b: 2 },
        { a: 0, b: 3 },
      ];
      const p = rng.pick(sets);
      const count = 2 * p.b - 1;
      const abs = p.a === 0 ? "|x|" : p.a > 0 ? `|x - ${p.a}|` : `|x + ${-p.a}|`;
      const ints: number[] = [];
      for (let v = p.a - p.b + 1; v <= p.a + p.b - 1; v++) ints.push(v);
      return {
        skill: L("Desigualdades con valor absoluto", "Absolute value inequalities"),
        statement: L(
          `¿Cuántos valores **enteros** de $x$ cumplen la desigualdad $${abs} < ${p.b}$?`,
          `How many **integer** values of $x$ satisfy the inequality $${abs} < ${p.b}$?`,
        ),
        answer: { kind: "numeric", value: count },
        hints: [
          L(
            "$|x - a|$ mide la **distancia** entre $x$ y $a$ en la recta numérica: la desigualdad pide los números cuya distancia a $a$ es menor que $b$.",
            "$|x - a|$ measures the **distance** between $x$ and $a$ on the number line: the inequality asks for the numbers whose distance to $a$ is smaller than $b$.",
          ),
          L(
            "Sin valor absoluto, la desigualdad se escribe $a - b < x < a + b$ (intervalo abierto).",
            "Without the absolute value, the inequality reads $a - b < x < a + b$ (open interval).",
          ),
          L(
            "Sustituye tus valores de $a$ y $b$ y cuenta cuántos enteros quedan **estrictamente** entre los dos extremos: los extremos no cuentan.",
            "Substitute your values of $a$ and $b$ and count how many integers lie **strictly** between the two endpoints: the endpoints do not count.",
          ),
        ],
        answerDisplay: L(`$${count}$ valores enteros`, `$${count}$ integer values`),
        solution: [
          step(
            "given",
            `La desigualdad $${abs} < ${p.b}$.`,
            `The inequality $${abs} < ${p.b}$.`,
          ),
          step(
            "approach",
            "Interpretamos el valor absoluto como distancia y lo reescribimos como desigualdad doble.",
            "We interpret the absolute value as a distance and rewrite it as a double inequality.",
          ),
          step(
            "calculation",
            `$${abs} < ${p.b} \\iff ${p.a - p.b} < x < ${p.a + p.b}$<br>Los enteros dentro de ese intervalo abierto son $x \\in \\{${ints.join(", ")}\\}$.`,
            `$${abs} < ${p.b} \\iff ${p.a - p.b} < x < ${p.a + p.b}$<br>The integers inside that open interval are $x \\in \\{${ints.join(", ")}\\}$.`,
          ),
          step(
            "result",
            `Hay $${count}$ valores enteros que satisfacen la desigualdad.`,
            `There are $${count}$ integer values satisfying the inequality.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Curated from real sources — content-quality program, Phase 1.     */
  /* Transcribed as printed; verified programmatically (worklog).      */
  /* ---------------------------------------------------------------- */

  /* Hoja de clase del tutor (FP-Vorbereitung): |2x−1| = |3x+5|,       */
  /* resuelta en clase por casos. Fixed problem — rng only shuffles MC. */
  template(
    {
      id: "lin-abs-02",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "abs-equations",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["absolute-value", "case-analysis", "verification"],
      prerequisites: ["abs-equations", "multi-step"],
      source: {
        sourceId: "tutor-fp-sheet-2024",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "1",
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "$x_1 = -6$ y $x_2 = -\\tfrac{4}{5}$",
            "$x_1 = -6$ and $x_2 = -\\tfrac{4}{5}$",
          ),
          correct: true,
        },
        {
          id: "b",
          text: L("$x_1 = 6$ y $x_2 = \\tfrac{4}{5}$", "$x_1 = 6$ and $x_2 = \\tfrac{4}{5}$"),
          correct: false,
        },
        {
          id: "c",
          text: L(
            "Solo tiene una solución: $x = -6$",
            "It has only one solution: $x = -6$",
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            "$x_1 = -6$ y $x_2 = -\\tfrac{5}{4}$",
            "$x_1 = -6$ and $x_2 = -\\tfrac{5}{4}$",
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Ecuación con dos valores absolutos",
          "Equation with two absolute values",
        ),
        statement: L(
          "Resuelve la ecuación $$|2x - 1| = |3x + 5|.$$ (En clase la resolvimos por casos; no olvides verificar ambas soluciones sustituyendo.)",
          "Solve the equation $$|2x - 1| = |3x + 5|.$$ (We solved it in class by cases; remember to verify both solutions by substitution.)",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "$|A| = |B|$ no significa solo $A = B$: son **dos** casos — igual y opuesto.",
            "$|A| = |B|$ does not mean only $A = B$: there are **two** cases — equal and opposite.",
          ),
          L(
            "Plantea $2x - 1 = 3x + 5$ y, por separado, $2x - 1 = -(3x + 5)$.",
            "Set up $2x - 1 = 3x + 5$ and, separately, $2x - 1 = -(3x + 5)$.",
          ),
          L(
            "Caso 1: $-x = 6$. Caso 2: $5x = -4$. Al final, sustituye cada $x$ en los **dos** valores absolutos originales para confirmar.",
            "Case 1: $-x = 6$. Case 2: $5x = -4$. At the end, substitute each $x$ into the **two** original absolute values to confirm.",
          ),
        ],
        answerDisplay: L(
          "$x = -6$ o $x = -\\tfrac{4}{5}$",
          "$x = -6$ or $x = -\\tfrac{4}{5}$",
        ),
        solution: [
          step(
            "given",
            "La ecuación $|2x-1| = |3x+5|$: dos expresiones cuyo valor absoluto coincide — están a la misma distancia de cero.",
            "The equation $|2x-1| = |3x+5|$: two expressions whose absolute values agree — they are the same distance from zero.",
          ),
          step(
            "approach",
            "$|A|=|B| \\iff A = B$ o $A = -B$ (mismo signo o signos opuestos). Dos casos, cada uno con su verificación.",
            "$|A|=|B| \\iff A = B$ or $A = -B$ (same sign or opposite signs). Two cases, each with its verification.",
          ),
          step(
            "calculation",
            "**Caso 1** ($2x-1 = 3x+5$): $-x = 6 \\Rightarrow x = -6$. Verificación: $|2(-6)-1| = |-13| = 13$ y $|3(-6)+5| = |-13| = 13$ ✓.<br>**Caso 2** ($2x-1 = -(3x+5)$): $5x = -4 \\Rightarrow x = -\\tfrac{4}{5}$. Verificación: $|2(-\\tfrac45)-1| = |-\\tfrac{13}{5}|$ y $|3(-\\tfrac45)+5| = |\\tfrac{13}{5}|$ ✓.",
            "**Case 1** ($2x-1 = 3x+5$): $-x = 6 \\Rightarrow x = -6$. Check: $|2(-6)-1| = |-13| = 13$ and $|3(-6)+5| = |-13| = 13$ ✓.<br>**Case 2** ($2x-1 = -(3x+5)$): $5x = -4 \\Rightarrow x = -\\tfrac{4}{5}$. Check: $|2(-\\tfrac45)-1| = |-\\tfrac{13}{5}|$ and $|3(-\\tfrac45)+5| = |\\tfrac{13}{5}|$ ✓.",
          ),
          step(
            "result",
            "$L = \\{-6,\\; -\\tfrac{4}{5}\\}$. Cada caso aporta una solución y ambas pasan la verificación.",
            "$L = \\{-6,\\; -\\tfrac{4}{5}\\}$. Each case contributes one solution and both pass verification.",
          ),
        ],
      };
    },
  ),

  /* Hoja de clase del tutor: f(x)=|2x+1|−|3x+2| frente a g(x)=−1,      */
  /* con comparación gráfico ↔ cálculo. Fixed problem.                   */
  template(
    {
      id: "lin-absi-02",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "abs-inequalities",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["absolute-value", "inequalities", "case-analysis", "graphical"],
      prerequisites: ["abs-equations", "compound"],
      source: {
        sourceId: "tutor-fp-sheet-2024",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "1 (f vs g)",
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L("$(-2,\\; 0)$", "$(-2,\\; 0)$"),
          correct: true,
        },
        {
          id: "b",
          text: L(
            "$(-2,\\; -\\tfrac{2}{3}) \\cup (-\\tfrac{2}{3},\\; -\\tfrac{1}{2}) \\cup (-\\tfrac{1}{2},\\; 0)$ (sin los puntos de corte)",
            "$(-2,\\; -\\tfrac{2}{3}) \\cup (-\\tfrac{2}{3},\\; -\\tfrac{1}{2}) \\cup (-\\tfrac{1}{2},\\; 0)$ (without the breakpoints)",
          ),
          correct: false,
        },
        {
          id: "c",
          text: L("$(-\\tfrac{2}{3},\\; -\\tfrac{1}{2})$", "$(-\\tfrac{2}{3},\\; -\\tfrac{1}{2})$"),
          correct: false,
        },
        {
          id: "d",
          text: L("$(0,\\; +\\infty)$", "$(0,\\; +\\infty)$"),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Desigualdad con dos valores absolutos por intervalos",
          "Two-absolute-value inequality by intervals",
        ),
        statement: L(
          "Determina analíticamente el conjunto de los $x$ para los que $$f(x) > g(x), \\quad f(x) = |2x+1| - |3x+2|, \\quad g(x) = -1.$$ (En clase además dibujamos $f$ y $g$, sombreados la región y comparamos con este cálculo.)",
          "Determine analytically the set of all $x$ for which $$f(x) > g(x), \\quad f(x) = |2x+1| - |3x+2|, \\quad g(x) = -1.$$ (In class we also drew $f$ and $g$, shaded the region and compared it with this calculation.)",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Los cambios de comportamiento de $f$ están donde se anulan los argumentos: $2x+1=0$ y $3x+2=0$. Ordénalos.",
            "The behaviour of $f$ changes where the arguments vanish: $2x+1=0$ and $3x+2=0$. Order them.",
          ),
          L(
            "Con los cortes $x=-\\tfrac{2}{3}$ y $x=-\\tfrac{1}{2}$ obtienes tres tramos. En cada tramo, escribe $f$ **sin** valores absolutos y resuelve $f(x) > -1$.",
            "With the breakpoints $x=-\\tfrac{2}{3}$ and $x=-\\tfrac{1}{2}$ you get three pieces. On each piece, write $f$ **without** absolute values and solve $f(x) > -1$.",
          ),
          L(
            "Tramos: $x+1$ (si $x<-\\tfrac23$), $-5x-3$ (si $-\\tfrac23 \\le x < -\\tfrac12$), $-x-1$ (si $x \\ge -\\tfrac12$). Interseca cada solución con su propio tramo.",
            "Pieces: $x+1$ (for $x<-\\tfrac23$), $-5x-3$ (for $-\\tfrac23 \\le x < -\\tfrac12$), $-x-1$ (for $x \\ge -\\tfrac12$). Intersect each solution with its own piece.",
          ),
        ],
        answerDisplay: L("$(-2,\\; 0)$", "$(-2,\\; 0)$"),
        solution: [
          step(
            "given",
            "$f(x) = |2x+1| - |3x+2|$ frente a $g(x) = -1$. Los cortes del eje real están en $x = -\\tfrac{2}{3}$ (de $3x+2$) y $x = -\\tfrac{1}{2}$ (de $2x+1$), y $-\\tfrac{2}{3} < -\\tfrac{1}{2}$.",
            "$f(x) = |2x+1| - |3x+2|$ against $g(x) = -1$. The breakpoints are $x = -\\tfrac{2}{3}$ (from $3x+2$) and $x = -\\tfrac{1}{2}$ (from $2x+1$), with $-\\tfrac{2}{3} < -\\tfrac{1}{2}$.",
          ),
          step(
            "approach",
            "Dividimos $\\mathbb{R}$ en tres intervalos con los cortes. En cada uno, $f$ es lineal (sin valores absolutos); resolvemos $f > -1$ ahí y **interseca** con el propio intervalo.",
            "We split $\\mathbb{R}$ into three intervals at the breakpoints. On each, $f$ is linear (no absolute values); we solve $f > -1$ there and **intersect** with that interval.",
          ),
          step(
            "calculation",
            "**1)** $x < -\\tfrac{2}{3}$: $f = x+1$; $x+1 > -1 \\Rightarrow x > -2$, luego $(-2,\\; -\\tfrac{2}{3})$.<br>**2)** $-\\tfrac{2}{3} \\le x < -\\tfrac{1}{2}$: $f = -5x-3$; $-5x-3 > -1 \\Rightarrow x < -\\tfrac{2}{5}$ — todo el tramo cumple: $[-\\tfrac{2}{3},\\; -\\tfrac{1}{2})$.<br>**3)** $x \\ge -\\tfrac{1}{2}$: $f = -x-1$; $-x-1 > -1 \\Rightarrow x < 0$, luego $[-\\tfrac{1}{2},\\; 0)$.",
            "**1)** $x < -\\tfrac{2}{3}$: $f = x+1$; $x+1 > -1 \\Rightarrow x > -2$, giving $(-2,\\; -\\tfrac{2}{3})$.<br>**2)** $-\\tfrac{2}{3} \\le x < -\\tfrac{1}{2}$: $f = -5x-3$; $-5x-3 > -1 \\Rightarrow x < -\\tfrac{2}{5}$ — the whole piece qualifies: $[-\\tfrac{2}{3},\\; -\\tfrac{1}{2})$.<br>**3)** $x \\ge -\\tfrac{1}{2}$: $f = -x-1$; $-x-1 > -1 \\Rightarrow x < 0$, giving $[-\\tfrac{1}{2},\\; 0)$.",
          ),
          step(
            "result",
            "Unión de los tres tramos: $(-2, -\\tfrac{2}{3}) \\cup [-\\tfrac{2}{3}, -\\tfrac{1}{2}) \\cup [-\\tfrac{1}{2}, 0) = (-2,\\; 0)$. Los puntos de corte quedan **dentro**: en ellos $f$ vale $\\tfrac{1}{3}$ y $\\tfrac{1}{2}$, ambos $> -1$. En el gráfico: la zona sombreada es exactamente el tramo de $f$ por encima de la recta $y=-1$.",
            "Union of the three pieces: $(-2, -\\tfrac{2}{3}) \\cup [-\\tfrac{2}{3}, -\\tfrac{1}{2}) \\cup [-\\tfrac{1}{2}, 0) = (-2,\\; 0)$. The breakpoints are **inside**: at them $f$ equals $\\tfrac{1}{3}$ and $\\tfrac{1}{2}$, both $> -1$. On the graph: the shaded region is exactly the stretch of $f$ above the line $y=-1$.",
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Curated — ESPOL Fundamentos (TUTOR_LICENSED, autorización del     */
  /* tutor 2026-10-01), sección 3.9 Valor Absoluto, p.222.             */
  /* ---------------------------------------------------------------- */

  /* ESPOL p.222, autoevaluación 3.9, ex.2b: |pi - 8| + pi. */
  template(
    {
      id: "lin-abs-03",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "abs-equations",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 90,
      tags: ["absolute-value", "pi", "exact-arithmetic"],
      prerequisites: ["abs-equations"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3.9 · 2b",
        page: 222,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      void rng;
      return {
        skill: L(
          "Valor absoluto con $\\pi$: leer el signo antes de calcular (libro ESPOL)",
          "Absolute value with $\\pi$: read the sign before computing (ESPOL book)",
        ),
        statement: L(
          "Determina el valor numérico de $$|\\pi - 8| + \\pi.$$ (Ejercicio del libro de la ESPOL.)",
          "Determine the numerical value of $$|\\pi - 8| + \\pi.$$ (Exercise from the ESPOL book.)",
        ),
        answer: { kind: "numeric", value: 8 },
        hints: [
          L(
            "El valor absoluto devuelve la distancia a cero: antes de tocar nada, decide el signo de lo que hay **dentro**.",
            "Absolute value returns the distance to zero: before touching anything, decide the sign of what is **inside**.",
          ),
          L(
            "Compara: ¿$\\pi$ es mayor o menor que $8$? Con eso sabes si $\\pi - 8$ es positivo o negativo.",
            "Compare: is $\\pi$ greater or smaller than $8$? That tells you whether $\\pi - 8$ is positive or negative.",
          ),
          L(
            "Si $\\pi - 8 < 0$, el valor absoluto invierte el signo de todo lo interior. Al sustituir, los $\\pi$ se cancelan entre sí.",
            "If $\\pi - 8 < 0$, the absolute value flips the sign of the whole interior. When you substitute, the $\\pi$'s cancel each other.",
          ),
        ],
        answerDisplay: L("$8$", "$8$"),
        solution: [
          step(
            "given",
            "La expresión $|\\pi - 8| + \\pi$: primero un valor absoluto, después una suma con $\\pi$.",
            "The expression $|\\pi - 8| + \\pi$: first an absolute value, then a sum with $\\pi$.",
          ),
          step(
            "approach",
            "El valor absoluto depende del signo del interior. Como $\\pi \\approx 3{,}14 < 8$, se tiene $\\pi - 8 < 0$ y el absoluto invierte el signo.",
            "The absolute value depends on the sign of the interior. Since $\\pi \\approx 3.14 < 8$, we have $\\pi - 8 < 0$ and the absolute value flips the sign.",
          ),
          step(
            "calculation",
            "Como $\\pi - 8 < 0$: $|\\pi - 8| = -(\\pi - 8) = 8 - \\pi$. Entonces $$|\\pi - 8| + \\pi = (8 - \\pi) + \\pi = 8.$$",
            "Since $\\pi - 8 < 0$: $|\\pi - 8| = -(\\pi - 8) = 8 - \\pi$. Then $$|\\pi - 8| + \\pi = (8 - \\pi) + \\pi = 8.$$",
          ),
          step(
            "result",
            "El valor exacto es $8$: el $\\pi$ desaparece por cancelación. El ejercicio premia leer el signo antes de calcular nada.",
            "The exact value is $8$: the $\\pi$ vanishes by cancellation. The exercise rewards reading the sign before computing anything.",
          ),
        ],
      };
    },
  ),

  /* ESPOL p.222, autoevaluación 3.9, ex.2a: |1 - |3-5| - |1-7||. */
  template(
    {
      id: "lin-abs-04",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "abs-equations",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 120,
      tags: ["absolute-value", "nested", "order-of-operations"],
      prerequisites: ["abs-equations"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3.9 · 2a",
        page: 222,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      void rng;
      return {
        skill: L(
          "Valor absoluto anidado: evaluar por capas (libro ESPOL)",
          "Nested absolute value: evaluate layer by layer (ESPOL book)",
        ),
        statement: L(
          "Determina el valor numérico de $$\\left|\\, 1 - |3 - 5| - |1 - 7| \\,\\right|.$$ (Ejercicio del libro de la ESPOL.)",
          "Determine the numerical value of $$\\left|\\, 1 - |3 - 5| - |1 - 7| \\,\\right|.$$ (Exercise from the ESPOL book.)",
        ),
        answer: { kind: "numeric", value: 7 },
        hints: [
          L(
            "Trabaja **de adentro hacia afuera**: primero los dos valores absolutos interiores, y solo al final el exterior.",
            "Work **from the inside out**: first the two inner absolute values, and only at the end the outer one.",
          ),
          L(
            "Cada interior es la distancia a cero de un número negativo: $|3-5| = |-2|$ y $|1-7| = |-6|$.",
            "Each inner value is the distance to zero of a negative number: $|3-5| = |-2|$ and $|1-7| = |-6|$.",
          ),
          L(
            "Sustituye ambos resultados dentro del bloque exterior: $1 - 2 - 6$ es negativo, así que el absoluto exterior lo vuelve positivo.",
            "Substitute both results inside the outer block: $1 - 2 - 6$ is negative, so the outer absolute value makes it positive.",
          ),
        ],
        answerDisplay: L("$7$", "$7$"),
        solution: [
          step(
            "given",
            "La expresión $\\left|1 - |3-5| - |1-7|\\right|$ tiene tres valores absolutos: dos interiores y uno que envuelve todo.",
            "The expression $\\left|1 - |3-5| - |1-7|\\right|$ has three absolute values: two inner ones and one wrapping everything.",
          ),
          step(
            "approach",
            "Evaluar por capas: los interiores primero, sustituir sus resultados, y el exterior al final. Cada $|\\,\\cdot\\,|$ devuelve un resultado no negativo.",
            "Evaluate in layers: the inner ones first, substitute their results, and the outer one last. Each $|\\,\\cdot\\,|$ returns a non-negative result.",
          ),
          step(
            "calculation",
            "Interiores: $|3-5| = |-2| = 2$ y $|1-7| = |-6| = 6$. Sustituyendo: $|1 - 2 - 6| = |-7| = 7$.",
            "Inner ones: $|3-5| = |-2| = 2$ and $|1-7| = |-6| = 6$. Substituting: $|1 - 2 - 6| = |-7| = 7$.",
          ),
          step(
            "result",
            "El valor numérico es $7$. Con valores absolutos anidados el orden importa: de adentro hacia afuera, sin saltarse capas.",
            "The numerical value is $7$. With nested absolute values order matters: inside out, skipping no layers.",
          ),
        ],
      };
    },
  ),
  /* ================================================================== */
  /* Curated — Fundamentos ESPOL, §3.11 ejercicio 126 (bonos), p. 324.  */
  /* Verified with sympy (m >= 35 000).                                 */
  /* ================================================================== */

  /* 126 — bonds portfolio: minimum mortgage investment */
  template(
    {
      id: "lin-espol-126",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "inequalities",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 240,
      tags: ["modeling", "inequality", "money", "application"],
      prerequisites: ["linear-equations"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3.11 · 126",
        page: 324,
      },
      reasoning: "modeling",
    },
    () => ({
      skill: L("Plantear una inecuación de inversión", "Setting up an investment inequality"),
      statement: L(
        `La señora Moreno quiere invertir $\\$60\\,000$. Puede escoger bonos del gobierno que ofrecen un interés del $8\\%$ anual, o bonos hipotecarios de mayor riesgo con el $10\\%$ anual. Si reparte todo su dinero entre ambos bonos, ¿cuál es la **cantidad mínima** que debe invertir en los bonos hipotecarios para recibir una ganancia anual de **al menos** $\\$5\\,500$?`,
        `Mrs. Moreno wants to invest $\\$60,\\!000$. She can choose government bonds paying $8\\%$ annual interest, or higher-risk mortgage bonds paying $10\\%$. If she splits all her money between the two, what is the **minimum amount** she must invest in mortgage bonds to receive an annual gain of **at least** $\\$5,500$?`,
      ),
      answer: { kind: "numeric", value: 35000 },
      hints: [
        L(
          "Llama $m$ a lo invertido en bonos hipotecarios: entonces en bonos del gobierno van $(60\\,000 - m)$ dólares.",
          "Let $m$ be the amount in mortgage bonds: then $(60,\\!000 - m)$ dollars go into government bonds.",
        ),
        L(
          "La ganancia es $0{,}08(60\\,000 - m) + 0{,}10\\,m$ y debe ser $\\geq 5\\,500$.",
          "The gain is $0.08(60,\\!000 - m) + 0.10\\,m$ and must be $\\geq 5,\\!500$.",
        ),
        L(
          "$4\\,800 + 0{,}02m \\geq 5\\,500 \\Rightarrow 0{,}02m \\geq 700$.",
          "$4,\\!800 + 0.02m \\geq 5,\\!500 \\Rightarrow 0.02m \\geq 700$.",
        ),
      ],
      answerDisplay: L(
        `Debe invertir **al menos $\\$35\\,000$** en bonos hipotecarios.`,
        `She must invest **at least $\\$35,\\!000$** in mortgage bonds.`,
      ),
      solution: [
        step(
          "given",
          "Total: $\\$60\\,000$. Gobierno: $8\\%$; hipotecarios: $10\\%$; ganancia requerida $\\geq \\$5\\,500$.",
          "Total: $\\$60,\\!000$. Government: $8\\%$; mortgage: $10\\%$; required gain $\\geq \\$5,\\!500$.",
        ),
        step(
          "approach",
          "Modelar con UNA variable (todo lo que no va a hipotecarios va a gobierno) y plantear la inecuación.",
          "Model with ONE variable (whatever is not in mortgages goes to government bonds) and set up the inequality.",
        ),
        step(
          "calculation",
          `$0{,}08(60\\,000 - m) + 0{,}10\\,m \\geq 5\\,500$<br>$4\\,800 - 0{,}08m + 0{,}10m \\geq 5\\,500$<br>$0{,}02m \\geq 700$<br>$m \\geq 35\\,000$`,
          `$0.08(60,\\!000 - m) + 0.10\\,m \\geq 5,\\!500$<br>$4,\\!800 - 0.08m + 0.10m \\geq 5,\\!500$<br>$0.02m \\geq 700$<br>$m \\geq 35,\\!000$`,
        ),
        step(
          "result",
          `Mínimo $\\$35\\,000$ en bonos hipotecarios (y hasta $\\$25\\,000$ en gobierno). Comprobación: $0{,}08 \\cdot 25\\,000 + 0{,}10 \\cdot 35\\,000 = 2\\,000 + 3\\,500 = 5\\,500$ ✓ exacto.`,
          `Minimum $\\$35,\\!000$ in mortgage bonds (and up to $\\$25,\\!000$ in government). Check: $0.08 \\cdot 25,\\!000 + 0.10 \\cdot 35,\\!000 = 2,\\!000 + 3,\\!500 = 5,\\!500$ ✓ exactly.`,
        ),
      ],
    }),
  ),

];
