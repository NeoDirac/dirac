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
      // Generated center h, radius r and strictness: the integer count changes
      // with the endpoints being excluded (<) or included (≤).
      const h = rng.int(-6, 6);
      const r = rng.int(2, 4);
      const strict = rng.bool();
      const count = strict ? 2 * r - 1 : 2 * r + 1;
      const abs = h === 0 ? "|x|" : h > 0 ? `|x - ${h}|` : `|x + ${-h}|`;
      const op = strict ? "<" : "\\le";
      const first = strict ? h - r + 1 : h - r;
      const last = strict ? h + r - 1 : h + r;
      const ints: number[] = [];
      for (let v = first; v <= last; v++) ints.push(v);
      return {
        skill: L("Desigualdades con valor absoluto", "Absolute value inequalities"),
        statement: L(
          `¿Cuántos valores **enteros** de $x$ cumplen la desigualdad $${abs} ${op} ${r}$?`,
          `How many **integer** values of $x$ satisfy the inequality $${abs} ${op} ${r}$?`,
        ),
        answer: { kind: "numeric", value: count },
        hints: [
          L(
            "$|x - a|$ mide la **distancia** entre $x$ y $a$ en la recta numérica: la desigualdad pide los números cuya distancia a $a$ es menor que $b$.",
            "$|x - a|$ measures the **distance** between $x$ and $a$ on the number line: the inequality asks for the numbers whose distance to $a$ is smaller than $b$.",
          ),
          L(
            strict
              ? "Sin valor absoluto, la desigualdad se escribe $a - b < x < a + b$ (intervalo **abierto**: los extremos no cuentan)."
              : "Sin valor absoluto, la desigualdad se escribe $a - b \\le x \\le a + b$ (intervalo **cerrado**: los extremos sí cuentan).",
            strict
              ? "Without the absolute value, the inequality reads $a - b < x < a + b$ (**open** interval: the endpoints do not count)."
              : "Without the absolute value, the inequality reads $a - b \\le x \\le a + b$ (**closed** interval: the endpoints do count).",
          ),
          L(
            strict
              ? "Sustituye tus valores de $a$ y $b$ y cuenta cuántos enteros quedan **estrictamente** entre los dos extremos: los extremos no cuentan."
              : "Sustituye tus valores y cuenta los enteros del intervalo **cerrado**: ahora los extremos también cuentan.",
            strict
              ? "Substitute your values of $a$ and $b$ and count how many integers lie **strictly** between the two endpoints: they do not count."
              : "Substitute your values and count the integers of the **closed** interval: now the endpoints count too.",
          ),
        ],
        answerDisplay: L(`$${count}$ valores enteros`, `$${count}$ integer values`),
        solution: [
          step(
            "given",
            `La desigualdad $${abs} ${op} ${r}$.`,
            `The inequality $${abs} ${op} ${r}$.`,
          ),
          step(
            "approach",
            "Interpretamos el valor absoluto como distancia y lo reescribimos como desigualdad doble.",
            "We interpret the absolute value as a distance and rewrite it as a double inequality.",
          ),
          step(
            "calculation",
            `$${abs} ${op} ${r} \\iff ${h - r} ${op} x ${op} ${h + r}$<br>Los enteros de ese intervalo ${strict ? "abierto" : "cerrado"} son $x \\in \\{${ints.join(", ")}\\}$.`,
            `$${abs} ${op} ${r} \\iff ${h - r} ${op} x ${op} ${h + r}$<br>The integers of that ${strict ? "open" : "closed"} interval are $x \\in \\{${ints.join(", ")}\\}$.`,
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
  /* Absolute value inequalities — variety pack (fully parameterized).  */
  /* Fixes the "same problem every time" gap: five structurally        */
  /* distinct generators in addition to the two above.                  */
  /* ---------------------------------------------------------------- */

  /* "Sandwich" case: |ax + b| < / ≤ c → interval notation (text). */
  template(
    {
      id: "lin-absi-03",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "abs-inequalities",
      difficulty: "medium",
      questionType: "text",
      estimatedTimeSec: 150,
      tags: ["absolute-value", "inequalities", "interval-notation"],
      prerequisites: ["abs-equations", "interval-notation"],
    },
    (rng) => {
      // |a(x − h)| = |ax + b| op a·r, with integer center h and radius r,
      // so both endpoints h ± r are integers.
      const a = rng.int(1, 3);
      const h = rng.int(-5, 5);
      const r = rng.int(2, 5);
      const strict = rng.bool();
      const b = -a * h;
      const c = a * r;
      const lo = h - r;
      const hi = h + r;
      const op = strict ? "<" : "\\le";
      const inner =
        b === 0
          ? a === 1
            ? "x"
            : `${a}x`
          : `${a === 1 ? "" : a}x ${b > 0 ? "+" : "-"} ${Math.abs(b)}`;
      const oB = strict ? "(" : "[";
      const cB = strict ? ")" : "]";
      const accepted: string[] = [
        `${oB}${lo}, ${hi}${cB}`,
        `${oB}${lo},${hi}${cB}`,
        strict ? `${lo} < x < ${hi}` : `${lo} ≤ x ≤ ${hi}`,
        strict ? `${lo}<x<${hi}` : `${lo}≤x≤${hi}`,
        `x ∈ ${oB}${lo}, ${hi}${cB}`,
        `x∈${oB}${lo},${hi}${cB}`,
      ];
      if (!strict) {
        accepted.push(`${lo} <= x <= ${hi}`, `${lo}<=x<=${hi}`);
      }
      const parts: string[] = [`$${-c} ${op} ${inner} ${op} ${c}$`];
      if (b !== 0) {
        parts.push(`$${-c - b} ${op} ${a === 1 ? "" : a}x ${op} ${c - b}$`);
      }
      if (!(a === 1 && b === 0)) {
        parts.push(`$${lo} ${op} x ${op} ${hi}$`);
      }
      return {
        skill: L(
          "Desigualdades con valor absoluto: caso interior",
          "Absolute value inequalities: inside case",
        ),
        statement: L(
          `Resuelve $|${inner}| ${op} ${c}$ y escribe el conjunto solución en notación de intervalos (por ejemplo $(-2, 7)$ o $[-4, 6]$).`,
          `Solve $|${inner}| ${op} ${c}$ and write the solution set in interval notation (e.g. $(-2, 7)$ or $[-4, 6]$).`,
        ),
        answer: { kind: "text", accepted },
        hints: [
          L(
            "$|X| \\le c$ (con $c > 0$) es el caso **interior**: equivale al sándwich $-c \\le X \\le c$. Con $<$ lo mismo, pero estricto.",
            "$|X| \\le c$ (with $c > 0$) is the **inside** case: it equals the sandwich $-c \\le X \\le c$. With $<$ the same, but strict.",
          ),
          L(
            `Sustituye $X = ${inner}$ y despeja $x$ en la desigualdad doble (dividir entre $${a}$ conserva el sentido porque es positivo).`,
            `Substitute $X = ${inner}$ and solve the double inequality for $x$ (dividing by $${a}$ keeps the direction because it is positive).`,
          ),
          L(
            strict
              ? "La desigualdad es **estricta**: los extremos NO pertenecen a la solución — paréntesis, no corchetes."
              : "La desigualdad es **no estricta**: los extremos SÍ pertenecen a la solución — corchetes, no paréntesis.",
            strict
              ? "The inequality is **strict**: the endpoints do NOT belong to the solution — parentheses, not brackets."
              : "The inequality is **non-strict**: the endpoints DO belong to the solution — brackets, not parentheses.",
          ),
        ],
        answerDisplay: L(`$${oB}${lo}, ${hi}${cB}$`, `$${oB}${lo}, ${hi}${cB}$`),
        solution: [
          step(
            "given",
            `La desigualdad $|${inner}| ${op} ${c}$ con $c = ${c} > 0$.`,
            `The inequality $|${inner}| ${op} ${c}$ with $c = ${c} > 0$.`,
          ),
          step(
            "approach",
            "Caso interior: el valor absoluto se despliega como desigualdad doble (sándwich) y luego se despeja $x$.",
            "Inside case: the absolute value unfolds as a double inequality (sandwich) and then we isolate $x$.",
          ),
          step("calculation", parts.join("<br>"), parts.join("<br>")),
          step(
            "result",
            strict
              ? `$${oB}${lo}, ${hi}${cB}$ — extremos excluidos (desigualdad estricta).`
              : `$${oB}${lo}, ${hi}${cB}$ — extremos incluidos (desigualdad no estricta).`,
            strict
              ? `$${oB}${lo}, ${hi}${cB}$ — endpoints excluded (strict inequality).`
              : `$${oB}${lo}, ${hi}${cB}$ — endpoints included (non-strict inequality).`,
          ),
        ],
      };
    },
  ),

  /* "Outside" case: |x − h| > / ≥ r → union of two rays (MC). */
  template(
    {
      id: "lin-absi-04",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "abs-inequalities",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["absolute-value", "inequalities", "union", "or-and"],
      prerequisites: ["abs-equations", "compound"],
    },
    (rng) => {
      const h = rng.int(-5, 5);
      const r = rng.int(2, 5);
      const strict = rng.bool();
      const lo = h - r;
      const hi = h + r;
      const abs = h === 0 ? "|x|" : h > 0 ? `|x - ${h}|` : `|x + ${-h}|`;
      const op = strict ? ">" : "\\ge";
      const flip = strict ? "<" : "\\le";
      const oB = strict ? "(" : "[";
      const cB = strict ? ")" : "]";
      const wrongB = strict ? "[" : "(";
      const wrongC = strict ? "]" : ")";
      const correct =
        `$(-\\infty, ${oB}${lo}${cB} \\cup ${oB}${hi}${cB}, +\\infty)$`;
      const options: McOption[] = [
        { id: "a", text: L(correct, correct), correct: true },
        {
          id: "b",
          text: L(
            strict ? `$${lo} < x < ${hi}$` : `$${lo} \\le x \\le ${hi}$`,
            strict ? `$${lo} < x < ${hi}$` : `$${lo} \\le x \\le ${hi}$`,
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            `$(-\\infty, ${wrongB}${lo}${wrongC} \\cup ${wrongB}${hi}${wrongC}, +\\infty)$`,
            `$(-\\infty, ${wrongB}${lo}${wrongC} \\cup ${wrongB}${hi}${wrongC}, +\\infty)$`,
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            `$(-\\infty, ${oB}${lo}${cB}$`,
            `$(-\\infty, ${oB}${lo}${cB}$`,
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Desigualdades con valor absoluto: caso exterior",
          "Absolute value inequalities: outside case",
        ),
        statement: L(
          `Resuelve $${abs} ${op} ${r}$ y escoge el conjunto solución correcto.`,
          `Solve $${abs} ${op} ${r}$ and choose the correct solution set.`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            `La distancia a $${h}$ debe ser **mayor** que $${r}$: las soluciones viven en dos rayos, fuera del segmento $[${lo},\\; ${hi}]$.`,
            `The distance to $${h}$ must be **greater** than $${r}$: the solutions live in two rays, outside the segment $[${lo},\\; ${hi}]$.`,
          ),
          L(
            "$|X| > c$ (con $c > 0$) se parte en **dos** desigualdades unidas por **o** (nunca por \"y\"): $X < -c$ o $X > c$.",
            "$|X| > c$ (with $c > 0$) splits into **two** inequalities joined by **or** (never by \"and\"): $X < -c$ or $X > c$.",
          ),
          L(
            strict
              ? "Despeja cada rama y cuida los corchetes: es estricta, así que los extremos quedan **fuera** (paréntesis)."
              : "Despeja cada rama y cuida los corchetes: es no estricta, así que los extremos quedan **dentro** (corchetes).",
            strict
              ? "Solve each branch and watch the brackets: strict, so the endpoints stay **out** (parentheses)."
              : "Solve each branch and watch the brackets: non-strict, so the endpoints stay **in** (brackets).",
          ),
        ],
        answerDisplay: L(correct, correct),
        solution: [
          step(
            "given",
            `La desigualdad $${abs} ${op} ${r}$: números cuya distancia a $${h}$ es mayor que $${r}$.`,
            `The inequality $${abs} ${op} ${r}$: numbers whose distance to $${h}$ is greater than $${r}$.`,
          ),
          step(
            "approach",
            "Caso exterior: se parte en dos desigualdades unidas por **o** y cada rama se resuelve por separado.",
            "Outside case: it splits into two inequalities joined by **or**, and each branch is solved separately.",
          ),
          step(
            "calculation",
            `$${abs} ${op} ${r} \\iff x ${flip} ${lo} \\quad \\text{o} \\quad x ${op} ${hi}$<br>El conjunto solución es la **unión** de los dos rayos, ${strict ? "sin" : "con"} los extremos.`,
            `$${abs} ${op} ${r} \\iff x ${flip} ${lo} \\quad \\text{or} \\quad x ${op} ${hi}$<br>The solution set is the **union** of the two rays, ${strict ? "without" : "with"} the endpoints.`,
          ),
          step(
            "result",
            `${correct} — verifica: $x = ${h}$ (distancia $0$) **no** cumple; $x = ${hi + 1}$ y $x = ${lo - 1}$ sí cumplen.`,
            `${correct} — check: $x = ${h}$ (distance $0$) does **not** satisfy it; $x = ${hi + 1}$ and $x = ${lo - 1}$ do.`,
          ),
        ],
      };
    },
  ),

  /* Degenerate right-hand side: negative or zero — read before expanding. */
  template(
    {
      id: "lin-absi-05",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "abs-inequalities",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 90,
      tags: ["absolute-value", "inequalities", "degenerate", "sign-reading"],
      prerequisites: ["abs-equations"],
      reasoning: "definition-hunting",
    },
    (rng) => {
      const h = rng.int(-5, 5);
      const abs = h === 0 ? "|x|" : h > 0 ? `|x - ${h}|` : `|x + ${-h}|`;
      const negC = -rng.int(1, 4);
      // shape 0: |x−h| < negC → none; 1: |x−h| ≤ 0 → only x = h;
      // 2: |x−h| > negC → every real x.
      const shape = rng.int(0, 2);
      const opTex = shape === 0 ? "<" : shape === 1 ? "\\le" : ">";
      const rhs = shape === 1 ? 0 : negC;
      let correctText: string;
      let correctEn: string;
      const distractors: { es: string; en: string }[] = [];
      if (shape === 0) {
        correctText = `Ninguno: un valor absoluto nunca es negativo, así que no puede ser **menor** que $${negC}$.`;
        correctEn = `None: an absolute value is never negative, so it cannot be **smaller** than $${negC}$.`;
        distractors.push(
          {
            es: `Exactamente 1: solo $x = ${h}$.`,
            en: `Exactly 1: only $x = ${h}$.`,
          },
          {
            es: `Exactamente ${2 * -negC - 1}: los enteros de $(${h + negC}, ${h - negC})$ (ignorando el signo del lado derecho).`,
            en: `Exactly ${2 * -negC - 1}: the integers of $(${h + negC}, ${h - negC})$ (ignoring the sign of the right-hand side).`,
          },
          { es: "Infinitos: todos los reales.", en: "Infinitely many: all reals." },
        );
      } else if (shape === 1) {
        correctText = `Exactamente 1: solo $x = ${h}$ (la única distancia que es $\\le 0$ es la distancia $0$).`;
        correctEn = `Exactly 1: only $x = ${h}$ (the only distance that is $\\le 0$ is the distance $0$).`;
        distractors.push(
          {
            es: "Ninguno: la distancia nunca puede ser $\\le 0$.",
            en: "None: a distance can never be $\\le 0$.",
          },
          { es: "Infinitos: todos los reales.", en: "Infinitely many: all reals." },
          {
            es: `Exactamente 3: $x = ${h - 1},\\; ${h},\\; ${h + 1}$.`,
            en: `Exactly 3: $x = ${h - 1},\\; ${h},\\; ${h + 1}$.`,
          },
        );
      } else {
        correctText = `Infinitos: todo valor absoluto es $\\ge 0 > ${negC}$, así que **cualquier** $x$ cumple la desigualdad.`;
        correctEn = `Infinitely many: every absolute value is $\\ge 0 > ${negC}$, so **any** $x$ satisfies the inequality.`;
        distractors.push(
          {
            es: "Ninguno: el lado derecho es negativo y eso hace la desigualdad imposible.",
            en: "None: the right-hand side is negative, which makes the inequality impossible.",
          },
          {
            es: `Exactamente 1: solo $x = ${h}$.`,
            en: `Exactly 1: only $x = ${h}$.`,
          },
          { es: "Exactamente 3.", en: "Exactly 3." },
        );
      }
      const options: McOption[] = [
        { id: "a", text: L(correctText, correctEn), correct: true },
        ...distractors.map((d, i) => ({
          id: ["b", "c", "d"][i],
          text: L(d.es, d.en),
          correct: false,
        })),
      ];
      return {
        skill: L(
          "Desigualdades con valor absoluto: leer el lado derecho",
          "Absolute value inequalities: reading the right-hand side",
        ),
        statement: L(
          `Sin hacer cuentas largas, decide: ¿cuántos valores de $x$ cumplen $$${abs} ${opTex} ${rhs}$$? Mira el lado derecho con atención antes de expandir nada.`,
          `Without long calculations, decide: how many $x$ values satisfy $$${abs} ${opTex} ${rhs}$$? Look carefully at the right-hand side before expanding anything.`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Un valor absoluto siempre es $\\ge 0$. Compara el lado derecho con $0$ **antes** de desarrollar nada.",
            "An absolute value is always $\\ge 0$. Compare the right-hand side with $0$ **before** expanding anything.",
          ),
          shape === 0
            ? L(
                `Se pide distancia **menor** que $${negC}$ (negativo): ninguna distancia lo cumple — la desigualdad es imposible.`,
                `It demands a distance **smaller** than $${negC}$ (negative): no distance fulfills it — the inequality is impossible.`,
              )
            : shape === 1
              ? L(
                  "Se pide distancia $\\le 0$: la única forma es distancia exactamente $0$, que ocurre solo en el centro.",
                  "It demands distance $\\le 0$: the only way is distance exactly $0$, which happens only at the center.",
                )
              : L(
                  `Se pide distancia **mayor** que $${negC}$ (negativo): como toda distancia es $\\ge 0$, ya lo cumple todo $x$.`,
                  `It demands a distance **greater** than $${negC}$ (negative): since every distance is $\\ge 0$, every $x$ already fulfills it.`,
                ),
          L(
            "Decide la cardinalidad: 0, exactamente 1 o infinitos — y marca la opción.",
            "Decide the cardinality: 0, exactly 1, or infinitely many — and mark the option.",
          ),
        ],
        answerDisplay: L(correctText, correctEn),
        solution: [
          step(
            "given",
            `La desigualdad $${abs} ${opTex} ${rhs}$.`,
            `The inequality $${abs} ${opTex} ${rhs}$.`,
          ),
          step(
            "approach",
            "El valor absoluto es una distancia y toda distancia es $\\ge 0$. El trabajo está en comparar el lado derecho con $0$, no en expandir.",
            "The absolute value is a distance and every distance is $\\ge 0$. The work is comparing the right-hand side with $0$, not expanding.",
          ),
          step(
            "calculation",
            shape === 0
              ? `Como $|\\,u\\,| \\ge 0 > ${negC}$ para todo $u$, la desigualdad $${abs} < ${negC}$ no tiene solución.`
              : shape === 1
                ? `$${abs} \\le 0$ exige distancia $\\le 0$; como la distancia es $\\ge 0$, solo queda la distancia exactamente $0$: ocurre únicamente en $x = ${h}$.`
                : `Como $|\\,u\\,| \\ge 0 > ${negC}$, se cumple $${abs} > ${negC}$ para **todo** $x$: el conjunto solución es $\\mathbb{R}$.`,
            shape === 0
              ? `Since $|\\,u\\,| \\ge 0 > ${negC}$ for every $u$, the inequality $${abs} < ${negC}$ has no solution.`
              : shape === 1
                ? `$${abs} \\le 0$ demands distance $\\le 0$; as distance is $\\ge 0$, only distance exactly $0$ remains: it happens only at $x = ${h}$.`
                : `Since $|\\,u\\,| \\ge 0 > ${negC}$, we get $${abs} > ${negC}$ for **every** $x$: the solution set is $\\mathbb{R}$.`,
          ),
          step("result", correctText, correctEn),
        ],
      };
    },
  ),

  /* Distance comparison |x − h| > |x − k| → midpoint cut (MC). */
  template(
    {
      id: "lin-absi-06",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "abs-inequalities",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["absolute-value", "inequalities", "distance", "midpoint"],
      prerequisites: ["abs-inequalities", "abs-equations"],
      reasoning: "graphical",
    },
    (rng) => {
      const h = rng.int(-6, 3);
      const k = h + rng.int(1, 8);
      const sum = h + k;
      const odd = Math.abs(sum) % 2 === 1;
      const mTex = odd ? `\\frac{${sum}}{2}` : `${sum / 2}`;
      const absH = h === 0 ? "|x|" : h > 0 ? `|x - ${h}|` : `|x + ${-h}|`;
      const absK = k === 0 ? "|x|" : k > 0 ? `|x - ${k}|` : `|x + ${-k}|`;
      const xH = h === 0 ? "x" : h > 0 ? `x - ${h}` : `x + ${-h}`;
      const xK = k === 0 ? "x" : k > 0 ? `x - ${k}` : `x + ${-k}`;
      const correct = `$(${mTex},\\; +\\infty)$`;
      const options: McOption[] = [
        { id: "a", text: L(correct, correct), correct: true },
        {
          id: "b",
          text: L(`$[${mTex},\\; +\\infty)$`, `$[${mTex},\\; +\\infty)$`),
          correct: false,
        },
        {
          id: "c",
          text: L(`$(-\\infty,\\; ${mTex})$`, `$(-\\infty,\\; ${mTex})$`),
          correct: false,
        },
        {
          id: "d",
          text: L(`$(${k},\\; +\\infty)$`, `$(${k},\\; +\\infty)$`),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Comparación de distancias con valor absoluto",
          "Distance comparison with absolute values",
        ),
        statement: L(
          `¿Para qué valores de $x$ se cumple $$${absH} > ${absK}$$? (Es decir: ¿qué números están **más lejos** de $${h}$ que de $${k}$? Escoge el conjunto solución.)`,
          `For which $x$ values does $$${absH} > ${absK}$$ hold? (That is: which numbers lie **farther** from $${h}$ than from $${k}$? Choose the solution set.)`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            `Escribe la desigualdad en palabras: la distancia de $x$ a $${h}$ debe ser mayor que su distancia a $${k}$.`,
            `Write the inequality in words: the distance from $x$ to $${h}$ must be greater than its distance to $${k}$.`,
          ),
          L(
            `El empate (distancias iguales) ocurre exactamente en el punto medio $m = \\frac{${h} + ${k}}{2}$. A cada lado de $m$, uno de los dos puntos gana.`,
            `The tie (equal distances) happens exactly at the midpoint $m = \\frac{${h} + ${k}}{2}$. On each side of $m$, one of the two points wins.`,
          ),
          L(
            `Comprueba con puntos de prueba: $x = ${k}$ (distancia $0$ a $${k}$) debe cumplir; el propio $m$ empata, y como la desigualdad es estricta queda **fuera**. También puedes elevar al cuadrado: $(${xH})^2 > (${xK})^2$ se vuelve lineal.`,
            `Check with test points: $x = ${k}$ (distance $0$ to $${k}$) must satisfy it; $m$ itself ties and, the inequality being strict, stays **out**. You can also square: $(${xH})^2 > (${xK})^2$ becomes linear.`,
          ),
        ],
        answerDisplay: L(correct, correct),
        solution: [
          step(
            "given",
            `La desigualdad $${absH} > ${absK}$: la distancia de $x$ a $${h}$ debe superar su distancia a $${k}$.`,
            `The inequality $${absH} > ${absK}$: the distance from $x$ to $${h}$ must exceed its distance to $${k}$.`,
          ),
          step(
            "approach",
            "Los empates están en el punto medio; la respuesta es un rayo desde ahí. Elevar al cuadrado lo confirma algebraicamente (ambos lados son no negativos).",
            "Ties happen at the midpoint; the answer is a ray from there. Squaring confirms it algebraically (both sides are non-negative).",
          ),
          step(
            "calculation",
            `Elevando al cuadrado (válido: ambos lados $\\ge 0$) los $x^2$ se cancelan y queda una inecuación **lineal**: $$${2 * (k - h)}x > ${k * k - h * h} \\iff x > ${mTex}.$$ El punto $x = ${mTex}$ empata las distancias y, como la desigualdad es estricta, queda excluido.`,
            `Squaring (valid: both sides $\\ge 0$) cancels the $x^2$ terms and leaves a **linear** inequality: $$${2 * (k - h)}x > ${k * k - h * h} \\iff x > ${mTex}.$$ At $x = ${mTex}$ the distances tie and, the inequality being strict, it is excluded.`,
          ),
          step(
            "result",
            `El conjunto solución es $(${mTex},\\; +\\infty)$: a la derecha del punto medio se está más cerca de $${k}$, es decir, más lejos de $${h}$. El punto medio queda fuera (empate).`,
            `The solution set is $(${mTex},\\; +\\infty)$: to the right of the midpoint one is closer to $${k}$, i.e. farther from $${h}$. The midpoint stays out (tie).`,
          ),
        ],
      };
    },
  ),

  /* Consolidation: |x − h| ≤ r AND a linear cut → count integers. */
  template(
    {
      id: "lin-absi-07",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "abs-inequalities",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 210,
      tags: ["absolute-value", "inequalities", "compound", "counting", "consolidation"],
      prerequisites: ["compound", "abs-inequalities"],
      reasoning: "multi-concept",
    },
    (rng) => {
      const h = rng.int(-4, 4);
      const r = rng.int(3, 6);
      const abs = h === 0 ? "|x|" : h > 0 ? `|x - ${h}|` : `|x + ${-h}|`;
      const lo = h - r;
      const hi = h + r;
      const cutLeft = rng.bool();
      const strict2 = rng.bool();
      let condTex = "";
      let setTex = "";
      let count = 0;
      const ints: number[] = [];
      if (cutLeft) {
        const s = rng.int(lo + 1, hi - 3);
        condTex = `x ${strict2 ? ">" : "\\ge"} ${s}`;
        const first = strict2 ? s + 1 : s;
        count = hi - first + 1;
        for (let v = first; v <= hi; v++) ints.push(v);
        setTex = `${strict2 ? "(" : "["}${s}, ${hi}]`;
      } else {
        const t = rng.int(lo + 3, hi - 1);
        condTex = `x ${strict2 ? "<" : "\\le"} ${t}`;
        const last = strict2 ? t - 1 : t;
        count = last - lo + 1;
        for (let v = lo; v <= last; v++) ints.push(v);
        setTex = `[${lo}, ${t}${strict2 ? ")" : "]"}`;
      }
      return {
        skill: L(
          "Valor absoluto + condición lineal (consolidación)",
          "Absolute value + linear condition (consolidation)",
        ),
        statement: L(
          `¿Cuántos valores **enteros** de $x$ cumplen **a la vez** $$${abs} \\le ${r} \\qquad \\text{y} \\qquad ${condTex}?$$`,
          `How many **integer** values of $x$ satisfy **at the same time** $$${abs} \\le ${r} \\qquad \\text{and} \\qquad ${condTex}?$$`,
        ),
        answer: { kind: "numeric", value: count },
        hints: [
          L(
            `Traduce primero el valor absoluto: $${abs} \\le ${r}$ equivale al intervalo cerrado $[${lo}, ${hi}]$. Deja la segunda condición para después.`,
            `Translate the absolute value first: $${abs} \\le ${r}$ is the closed interval $[${lo}, ${hi}]$. Leave the second condition for later.`,
          ),
          L(
            `Ahora interseca: ¿qué parte de $[${lo}, ${hi}]$ sobrevive la condición $${condTex}$?`,
            `Now intersect: which part of $[${lo}, ${hi}]$ survives the condition $${condTex}$?`,
          ),
          strict2
            ? L(
                `La condición es **estricta** ($${condTex}$): el propio corte NO cuenta — los enteros quedan justo al lado que sí cumple.`,
                `The condition is **strict** ($${condTex}$): the cut point itself does NOT count — the integers stay on the side that does satisfy it.`,
              )
            : L(
                `La condición es **no estricta** ($${condTex}$): el propio corte SÍ cuenta.`,
                `The condition is **non-strict** ($${condTex}$): the cut point itself DOES count.`,
              ),
        ],
        answerDisplay: L(`$${count}$ valores enteros`, `$${count}$ integer values`),
        solution: [
          step(
            "given",
            `Dos condiciones simultáneas: $${abs} \\le ${r}$ y $${condTex}$.`,
            `Two simultaneous conditions: $${abs} \\le ${r}$ and $${condTex}$.`,
          ),
          step(
            "approach",
            "Resolver el valor absoluto como intervalo, intersecar con la condición lineal y contar enteros cuidando qué extremos cuentan.",
            "Solve the absolute value as an interval, intersect with the linear condition and count the integers, watching which endpoints count.",
          ),
          step(
            "calculation",
            `$${abs} \\le ${r} \\iff ${lo} \\le x \\le ${hi}$<br>Intersectando con $${condTex}$: queda $${setTex}$<br>Los enteros son $x \\in \\{${ints.join(", ")}\\}$.`,
            `$${abs} \\le ${r} \\iff ${lo} \\le x \\le ${hi}$<br>Intersecting with $${condTex}$: we are left with $${setTex}$<br>The integers are $x \\in \\{${ints.join(", ")}\\}$.`,
          ),
          step(
            "result",
            `Hay $${count}$ valores enteros que cumplen ambas condiciones a la vez.`,
            `There are $${count}$ integer values satisfying both conditions at once.`,
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

  /* ================================================================== */
  /* Curated — ESPOL Fundamentos, EDICIÓN DIGITAL (TUTOR_LICENSED).      */
  /* Chapter 2 «Ejercicios propuestos», pp. 236-240 (PDF 269-273).      */
  /* Tutor's brief: the most difficult / integrative ones.              */
  /* Double-verified: printed key pp. 939 (54d: 9; 54e: (-inf,-2];       */
  /* 54j: -2,0; 78c: 2a±c; 78d: -b/a, c/a) + sympy (41/41 checks).      */
  /* ================================================================== */

  /* 54d — |5−x| = 13−x → x = 9. */
  template(
    {
      id: "lin-espol-ch2-54d",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "abs-equations",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 150,
      tags: ["absolute-value", "equation", "sign-condition"],
      prerequisites: ["abs-equations"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 54d",
        page: 236,
      },
      reasoning: "case-analysis",
    },
    () => ({
      skill: L("Valor absoluto con condición de signo en el otro lado", "Absolute value with a sign condition on the other side"),
      statement: L(
        "Resuelve: $|5 - x| = 13 - x$.",
        "Solve: $|5 - x| = 13 - x$.",
      ),
      answer: { kind: "numeric", value: 9 },
      hints: [
        L(
          "Como $|5 - x| \\geq 0$, el lado derecho debe ser $\\geq 0$: $13 - x \\geq 0$, o sea $x \\leq 13$.",
          "Since $|5 - x| \\geq 0$, the right side must be $\\geq 0$: $13 - x \\geq 0$, i.e. $x \\leq 13$.",
        ),
        L(
          "Dos casos: $5 - x = 13 - x$ (¿tiene solución?) y $5 - x = -(13 - x) = x - 13$.",
          "Two cases: $5 - x = 13 - x$ (does it have a solution?) and $5 - x = -(13 - x) = x - 13$.",
        ),
        L(
          "El primer caso lleva a $5 = 13$, imposible; el segundo a $18 = 2x$. Comprueba que la solución cumpla $x \\leq 13$.",
          "The first case gives $5 = 13$, impossible; the second gives $18 = 2x$. Verify the solution satisfies $x \\leq 13$.",
        ),
      ],
      answerDisplay: L("$x = 9$", "$x = 9$"),
      solution: [
        step(
          "given",
          "$|5 - x| = 13 - x$; condición: $13 - x \\geq 0 \\Rightarrow x \\leq 13$.",
          "$|5 - x| = 13 - x$; condition: $13 - x \\geq 0 \\Rightarrow x \\leq 13$.",
        ),
        step(
          "approach",
          "Abrir el valor absoluto en los dos casos y conservar la condición de signo como filtro final.",
          "Open the absolute value in both cases and keep the sign condition as the final filter.",
        ),
        step(
          "calculation",
          "Caso 1: $5 - x = 13 - x \\Rightarrow 5 = 13$ ✗ (sin solución).<br>Caso 2: $5 - x = x - 13 \\Rightarrow 18 = 2x \\Rightarrow x = 9$.<br>Filtro: $9 \\leq 13$ ✓.",
          "Case 1: $5 - x = 13 - x \\Rightarrow 5 = 13$ ✗ (no solution).<br>Case 2: $5 - x = x - 13 \\Rightarrow 18 = 2x \\Rightarrow x = 9$.<br>Filter: $9 \\leq 13$ ✓.",
        ),
        step(
          "result",
          "$x = 9$. Verificación: $|5 - 9| = 4$ y $13 - 9 = 4$ ✓.",
          "$x = 9$. Check: $|5 - 9| = 4$ and $13 - 9 = 4$ ✓.",
        ),
      ],
    }),
  ),

  /* 54e — |3−x|−|x+2| = 5 → (−∞, −2]. Answer type: text (interval). */
  template(
    {
      id: "lin-espol-ch2-54e",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "abs-equations",
      difficulty: "hard",
      questionType: "text",
      estimatedTimeSec: 300,
      tags: ["absolute-value", "equation", "case-analysis", "interval"],
      prerequisites: ["abs-equations"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 54e",
        page: 236,
      },
      reasoning: "case-analysis",
    },
    () => ({
      skill: L("Dos valores absolutos: tres tramos, y un tramo entero sirve", "Two absolute values: three tranches, and a whole tranche works"),
      statement: L(
        "Resuelve y da el conjunto solución como intervalo (admite notaciones como (2, 5], x<=-2 o (-inf, 3]): $|3 - x| - |x + 2| = 5$.",
        "Solve and give the solution set as an interval (notations like (2, 5], x<=-2 or (-inf, 3] are accepted): $|3 - x| - |x + 2| = 5$.",
      ),
      answer: {
        kind: "text",
        accepted: [
          "(-inf, -2]",
          "(-∞, -2]",
          "x<=-2",
          "x≤-2",
          "x <= -2",
          "x ≤ -2",
          "x<= -2",
          "(-inf,-2]",
        ],
      },
      hints: [
        L(
          "Los puntos críticos ($x = -2$ y $x = 3$) cortan la recta en tres tramos. Analiza la expresión en cada uno.",
          "The critical points ($x = -2$ and $x = 3$) cut the line into three tranches. Analyze the expression on each.",
        ),
        L(
          "Con $x < -2$: $|3 - x| = 3 - x$ y $|x + 2| = -(x + 2)$, así que la expresión vale $(3 - x) + (x + 2) = 5$… ¿qué dice eso de TODO el tramo?",
          "For $x < -2$: $|3 - x| = 3 - x$ and $|x + 2| = -(x + 2)$, so the expression equals $(3 - x) + (x + 2) = 5$… what does that say about the WHOLE tranche?",
        ),
        L(
          "En $[-2, 3)$ la expresión vale $1 - 2x$ (iguala a 5 y revisa si la solución cae dentro); con $x \\geq 3$ vale $-5 \\neq 5$. No olvides revisar el propio $x = -2$.",
          "On $[-2, 3)$ the expression equals $1 - 2x$ (set it to 5 and check the solution lands inside); for $x \\geq 3$ it equals $-5 \\neq 5$. Do not forget to test $x = -2$ itself.",
        ),
      ],
      answerDisplay: L("$(-\\infty, -2]$", "$(-\\infty, -2]$"),
      solution: [
        step(
          "given",
          "$|3 - x| - |x + 2| = 5$; puntos críticos $x = -2$, $x = 3$.",
          "$|3 - x| - |x + 2| = 5$; critical points $x = -2$, $x = 3$.",
        ),
        step(
          "approach",
          "Análisis por tramos (la única vía honesta con dos valores absolutos): simplificar la expresión en cada tramo y resolver; el hallazgo típico es que un tramo completo satisfaga la ecuación.",
          "Tranche analysis (the only honest route with two absolute values): simplify the expression on each tranche and solve; the typical finding is that an entire tranche satisfies the equation.",
        ),
        step(
          "calculation",
          "Tramo $x < -2$: $(3 - x) - (-(x+2)) = 3 - x + x + 2 = 5$ → la ecuación se cumple **para todo** $x < -2$ ✓<br>Tramo $-2 \\leq x < 3$: $(3 - x) - (x + 2) = 1 - 2x$; $1 - 2x = 5 \\Rightarrow x = -2$, que SÍ está en el tramo ✓ (incluye el borde)<br>Tramo $x \\geq 3$: $(x - 3) - (x + 2) = -5 \\neq 5$ ✗",
          "Tranche $x < -2$: $(3 - x) - (-(x+2)) = 3 - x + x + 2 = 5$ → the equation holds **for every** $x < -2$ ✓<br>Tranche $-2 \\leq x < 3$: $(3 - x) - (x + 2) = 1 - 2x$; $1 - 2x = 5 \\Rightarrow x = -2$, which IS inside the tranche ✓ (border included)<br>Tranche $x \\geq 3$: $(x - 3) - (x + 2) = -5 \\neq 5$ ✗",
        ),
        step(
          "result",
          "La unión es $(-\\infty, -2]$: el tramo $x < -2$ entra completo y el borde $x = -2$ también ($|5| - 0 = 5$ ✓). Verificación: $x = -10$: $13 - 8 = 5$ ✓; $x = -1.99$: $|4.99| - 0.01 = 4.98 \\neq 5$ ✗.",
          "The union is $(-\\infty, -2]$: the tranche $x < -2$ enters whole and the border $x = -2$ too ($|5| - 0 = 5$ ✓). Check: $x = -10$: $13 - 8 = 5$ ✓; $x = -1.99$: $|4.99| - 0.01 = 4.98 \\neq 5$ ✗.",
        ),
      ],
    }),
  ),

  /* 54j — (x+1)²|x+1| = 1 → {−2, 0}. */
  template(
    {
      id: "lin-espol-ch2-54j",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "abs-equations",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 180,
      tags: ["absolute-value", "equation", "rewrite"],
      prerequisites: ["abs-equations"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 54j",
        page: 236,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$x \\in \\{-2,\\ 0\\}$`, `$x \\in \\{-2,\\ 0\\}$`), correct: true },
        { id: "b", text: L(`$x \\in \\{0\\}$`, `$x \\in \\{0\\}$`), correct: false },
        { id: "c", text: L(`$x \\in \\{-2\\}$`, `$x \\in \\{-2\\}$`), correct: false },
        { id: "d", text: L(`$x \\in \\{-1,\\ 1\\}$`, `$x \\in \\{-1,\\ 1\\}$`), correct: false },
        { id: "e", text: L(`$A = \\varnothing$`, `$A = \\varnothing$`), correct: false },
      ];
      return {
        skill: L("Potencia de un valor absoluto = valor absoluto de la potencia", "A power of an absolute value = absolute value of the power"),
        statement: L(
          "Resuelve: $(x + 1)^{2}\\,|x + 1| = 1$.",
          "Solve: $(x + 1)^{2}\\,|x + 1| = 1$.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "$(x+1)^{2} = |x+1|^{2}$, así que el producto es $|x+1|^{3}$.",
            "$(x+1)^{2} = |x+1|^{2}$, so the product is $|x+1|^{3}$.",
          ),
          L(
            "La ecuación queda $|x + 1|^{3} = 1$; como la función cubo es inyectiva, $|x + 1| = 1$.",
            "The equation becomes $|x + 1|^{3} = 1$; since the cubing function is injective, $|x + 1| = 1$.",
          ),
          L(
            "Despacha los dos casos $x + 1 = 1$ y $x + 1 = -1$.",
            "Dispatch the two cases $x + 1 = 1$ and $x + 1 = -1$.",
          ),
        ],
        answerDisplay: L("$x \\in \\{-2,\\ 0\\}$", "$x \\in \\{-2,\\ 0\\}$"),
        solution: [
          step(
            "given",
            "$(x + 1)^{2}\\,|x + 1| = 1$.",
            "$(x + 1)^{2}\\,|x + 1| = 1$.",
          ),
          step(
            "approach",
            "Reescribir el producto como una sola potencia del valor absoluto; elevar conserva la inyectividad del cubo, así que no aparecen soluciones espurias.",
            "Rewrite the product as a single power of the absolute value; cubing is injective, so no spurious solutions appear.",
          ),
          step(
            "calculation",
            "$(x+1)^{2}|x+1| = |x+1|^{2}|x+1| = |x+1|^{3}$<br>$|x+1|^{3} = 1 \\Rightarrow |x+1| = \\sqrt[3]{1} = 1$<br>Caso +: $x + 1 = 1 \\Rightarrow x = 0$. Caso −: $x + 1 = -1 \\Rightarrow x = -2$.",
            "$(x+1)^{2}|x+1| = |x+1|^{2}|x+1| = |x+1|^{3}$<br>$|x+1|^{3} = 1 \\Rightarrow |x+1| = \\sqrt[3]{1} = 1$<br>Case +: $x + 1 = 1 \\Rightarrow x = 0$. Case −: $x + 1 = -1 \\Rightarrow x = -2$.",
          ),
          step(
            "result",
            "$x \\in \\{-2, 0\\}$. Verificación: $x = 0$: $1^{2} \\cdot 1 = 1$ ✓; $x = -2$: $(-1)^{2} \\cdot |-1| = 1$ ✓.",
            "$x \\in \\{-2, 0\\}$. Check: $x = 0$: $1^{2} \\cdot 1 = 1$ ✓; $x = -2$: $(-1)^{2} \\cdot |-1| = 1$ ✓.",
          ),
        ],
      };
    },
  ),

  /* 78c — x²−4ax+4a²−c² = 0 → x = 2a ± c. */
  template(
    {
      id: "lin-espol-ch2-78c",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "literal",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 180,
      tags: ["literal-equation", "perfect-square", "parameters"],
      prerequisites: ["multi-step"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 78c",
        page: 240,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$x = 2a \\pm c$`, `$x = 2a \\pm c$`), correct: true },
        { id: "b", text: L(`$x = 2a \\pm 2c$`, `$x = 2a \\pm 2c$`), correct: false },
        { id: "c", text: L(`$x = a \\pm c$`, `$x = a \\pm c$`), correct: false },
        { id: "d", text: L(`$x = 4a \\pm c$`, `$x = 4a \\pm c$`), correct: false },
        { id: "e", text: L(`$x = \\pm c$`, `$x = \\pm c$`), correct: false },
      ];
      return {
        skill: L("Ecuación literal: reconocer el cuadrado perfecto escondido", "Literal equation: spot the hidden perfect square"),
        statement: L(
          "Halla el conjunto de verdad de $p(x):\\ x^{2} - 4ax + 4a^{2} - c^{2} = 0$ (en función de los parámetros $a$ y $c$).",
          "Find the truth set of $p(x):\\ x^{2} - 4ax + 4a^{2} - c^{2} = 0$ (in terms of the parameters $a$ and $c$).",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Mira los dos primeros términos con $x$: $x^{2} - 4ax + 4a^{2}$ ¿te suena a $(x - \\text{algo})^{2}$?",
            "Look at the first terms with $x$: $x^{2} - 4ax + 4a^{2}$ — does it ring like $(x - \\text{something})^{2}$?",
          ),
          L(
            "$x^{2} - 4ax + 4a^{2} = (x - 2a)^{2}$, así que la ecuación es $(x - 2a)^{2} = c^{2}$.",
            "$x^{2} - 4ax + 4a^{2} = (x - 2a)^{2}$, so the equation is $(x - 2a)^{2} = c^{2}$.",
          ),
          L(
            "De $W^{2} = c^{2}$ sale $W = \\pm c$; aplica eso con $W = x - 2a$.",
            "From $W^{2} = c^{2}$ you get $W = \\pm c$; apply it with $W = x - 2a$.",
          ),
        ],
        answerDisplay: L("$A_{p(x)} = \\{2a - c,\\ 2a + c\\}$", "$A_{p(x)} = \\{2a - c,\\ 2a + c\\}$"),
        solution: [
          step(
            "given",
            "$x^{2} - 4ax + 4a^{2} - c^{2} = 0$, con parámetros $a, c$ ($x$ es la incógnita).",
            "$x^{2} - 4ax + 4a^{2} - c^{2} = 0$, with parameters $a, c$ ($x$ is the unknown).",
          ),
          step(
            "approach",
            "Completar el cuadrado ya hecho: los términos en $x$ forman $(x - 2a)^{2}$; la ecuación se reduce a una diferencia de cuadrados igual a cero.",
            "The square is already complete: the $x$-terms form $(x - 2a)^{2}$; the equation reduces to a difference of squares set to zero.",
          ),
          step(
            "calculation",
            "$(x - 2a)^{2} - c^{2} = 0 \\Rightarrow (x - 2a)^{2} = c^{2}$<br>$x - 2a = \\pm c$<br>$x = 2a - c$ o $x = 2a + c$.",
            "$(x - 2a)^{2} - c^{2} = 0 \\Rightarrow (x - 2a)^{2} = c^{2}$<br>$x - 2a = \\pm c$<br>$x = 2a - c$ or $x = 2a + c$.",
          ),
          step(
            "result",
            "$A_{p(x)} = \\{2a - c,\\ 2a + c\\}$. Verificación con $a = 1, c = 3$: $x^{2} - 4x - 5 = 0$ da $x = -1, 5 = 2a \\pm c$ ✓.",
            "$A_{p(x)} = \\{2a - c,\\ 2a + c\\}$. Check with $a = 1, c = 3$: $x^{2} - 4x - 5 = 0$ gives $x = -1, 5 = 2a \\pm c$ ✓.",
          ),
        ],
      };
    },
  ),

  /* 78d — a²x²+a(b−c)x−bc = 0 → x = c/a ó x = −b/a. */
  template(
    {
      id: "lin-espol-ch2-78d",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "literal",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 270,
      tags: ["literal-equation", "factoring", "parameters"],
      prerequisites: ["multi-step"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 78d",
        page: 240,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(`$x = \\dfrac{c}{a}$ ó $x = -\\dfrac{b}{a}$`, `$x = \\dfrac{c}{a}$ or $x = -\\dfrac{b}{a}$`),
          correct: true,
        },
        {
          id: "b",
          text: L(`$x = \\dfrac{b}{a}$ ó $x = -\\dfrac{c}{a}$`, `$x = \\dfrac{b}{a}$ or $x = -\\dfrac{c}{a}$`),
          correct: false,
        },
        {
          id: "c",
          text: L(`$x = \\dfrac{c}{a}$ ó $x = \\dfrac{b}{a}$`, `$x = \\dfrac{c}{a}$ or $x = \\dfrac{b}{a}$`),
          correct: false,
        },
        {
          id: "d",
          text: L(`$x = -\\dfrac{c}{a}$ ó $x = -\\dfrac{b}{a}$`, `$x = -\\dfrac{c}{a}$ or $x = -\\dfrac{b}{a}$`),
          correct: false,
        },
        {
          id: "e",
          text: L(`$x = \\dfrac{a}{c}$ ó $x = -\\dfrac{a}{b}$`, `$x = \\dfrac{a}{c}$ or $x = -\\dfrac{a}{b}$`),
          correct: false,
        },
      ];
      return {
        skill: L("Ecuación literal: adivina la factorización (ax + p)(ax + q)", "Literal equation: guess the factorization (ax + p)(ax + q)"),
        statement: L(
          "Halla el conjunto de verdad de $q(x):\\ a^{2}x^{2} + a(b - c)x - bc = 0$ (en función de los parámetros $a, b, c$, con $a \\neq 0$).",
          "Find the truth set of $q(x):\\ a^{2}x^{2} + a(b - c)x - bc = 0$ (in terms of the parameters $a, b, c$, with $a \\neq 0$).",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Busca una factorización de la forma $(ax + p)(ax + q)$: el producto de los términos libres debe dar $-bc$ y su suma por $a$, el término del medio.",
            "Look for a factorization of the form $(ax + p)(ax + q)$: the product of the free terms must give $-bc$ and, times $a$, their sum the middle term.",
          ),
          L(
            "Prueba $p = -c$, $q = b$: $(ax - c)(ax + b) = a^{2}x^{2} + abx - acx - bc = a^{2}x^{2} + a(b - c)x - bc$ ✓.",
            "Try $p = -c$, $q = b$: $(ax - c)(ax + b) = a^{2}x^{2} + abx - acx - bc = a^{2}x^{2} + a(b - c)x - bc$ ✓.",
          ),
          L(
            "De $(ax - c)(ax + b) = 0$ salen dos ecuaciones lineales en $x$; despéjalas (con $a \\neq 0$).",
            "From $(ax - c)(ax + b) = 0$ come two linear equations in $x$; solve each (with $a \\neq 0$).",
          ),
        ],
        answerDisplay: L(
          "$A_{q(x)} = \\left\\{-\\dfrac{b}{a},\\ \\dfrac{c}{a}\\right\\}$",
          "$A_{q(x)} = \\left\\{-\\dfrac{b}{a},\\ \\dfrac{c}{a}\\right\\}$",
        ),
        solution: [
          step(
            "given",
            "$a^{2}x^{2} + a(b - c)x - bc = 0$, con $a \\neq 0$; incógnita $x$.",
            "$a^{2}x^{2} + a(b - c)x - bc = 0$, with $a \\neq 0$; unknown $x$.",
          ),
          step(
            "approach",
            "Factorizar «a lo Ruffini» buscando dos binomios en $ax$: la estructura del término del medio, $a(b - c)$, sugiere los pares $(-c, b)$.",
            "Factorize “Ruffini-style” looking for two binomials in $ax$: the middle term's structure, $a(b - c)$, suggests the pair $(-c, b)$.",
          ),
          step(
            "calculation",
            "$(ax - c)(ax + b) = a^{2}x^{2} + abx - acx - bc = a^{2}x^{2} + a(b - c)x - bc$ ✓<br>$ax - c = 0 \\Rightarrow x = \\dfrac{c}{a}$; $\\quad ax + b = 0 \\Rightarrow x = -\\dfrac{b}{a}$.",
            "$(ax - c)(ax + b) = a^{2}x^{2} + abx - acx - bc = a^{2}x^{2} + a(b - c)x - bc$ ✓<br>$ax - c = 0 \\Rightarrow x = \\dfrac{c}{a}$; $\\quad ax + b = 0 \\Rightarrow x = -\\dfrac{b}{a}$.",
          ),
          step(
            "result",
            "$A_{q(x)} = \\left\\{-\\dfrac{b}{a},\\ \\dfrac{c}{a}\\right\\}$. Verificación con $a = 2, b = 3, c = 1$: $4x^{2} + 4x - 3 = 0$ da $x = \\frac{1}{2}, -\\frac{3}{2}$ ✓ (la fórmula general da lo mismo).",
            "$A_{q(x)} = \\left\\{-\\dfrac{b}{a},\\ \\dfrac{c}{a}\\right\\}$. Check with $a = 2, b = 3, c = 1$: $4x^{2} + 4x - 3 = 0$ gives $x = \\frac{1}{2}, -\\frac{3}{2}$ ✓ (the general formula agrees).",
          ),
        ],
      };
    },
  ),

  /* ================================================================== */
  /* Curated — ESPOL Fundamentos, EDICIÓN DIGITAL (TUTOR_LICENSED).      */
  /* Chapter 2 §2.9 «Inecuaciones», pp. 242-243 (PDF 275-276).          */
  /* Tutor's instruction (2026-10-03): «el 2.9 debe ir». Proofs         */
  /* (#95-#100) excluded — they need a proof-format UI.                 */
  /* Every answer double-verified: printed key p. 938 + sympy           */
  /* (download/verify_espol_ch3.py).                                     */
  /* ================================================================== */

  /* 85 — ||x−1|+1| ≤ 0 never holds → N(Ap(x)) = 0 is TRUE. Key: a). */
  template(
    {
      id: "lin-espol-ch2-85",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "abs-inequalities",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 180,
      tags: ["absolute-value", "nested", "predicate", "truth-set"],
      prerequisites: ["abs-inequalities", "interval-notation"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 85",
        page: 242,
      },
      reasoning: "definition-hunting",
    },
    (rng) => ({
      skill: L("Valor absoluto anidado y cardinalidad del conjunto de verdad", "Nested absolute value and the size of a truth set"),
      statement: L(
        "Dado el predicado $p(x): \\bigl||x - 1| + 1\\bigr| \\leq 0$ con $x \\in \\mathbb{R}$, la aﬁrmación $N\\bigl(A_{p(x)}\\bigr) = 0$ (el conjunto de verdad no tiene elementos) es:",
        "Given the predicate $p(x): \\bigl||x - 1| + 1\\bigr| \\leq 0$ with $x \\in \\mathbb{R}$, the claim $N\\bigl(A_{p(x)}\\bigr) = 0$ (the truth set has no elements) is:",
      ),
      answer: {
        kind: "multiple-choice",
        options: rng.shuffle([
          { id: "v", text: L("Verdadero", "True"), correct: true },
          { id: "f", text: L("Falso", "False"), correct: false },
        ]),
      },
      hints: [
        L(
          "Un valor absoluto nunca es negativo: $|u| \\geq 0$ para todo $u$ real. ¿Cuándo vale exactamente $0$?",
          "An absolute value is never negative: $|u| \\geq 0$ for every real $u$. When is it exactly $0$?",
        ),
        L(
          "$|x - 1| + 1$ es una suma: el mínimo de $|x-1|$ es $0$ (en $x = 1$), así que la suma interior vale al menos $1$.",
          "$|x - 1| + 1$ is a sum: the minimum of $|x-1|$ is $0$ (at $x = 1$), so the inner sum is at least $1$.",
        ),
        L(
          "Entonces $\\bigl||x-1|+1\\bigr| \\geq 1 > 0$ para todo $x$: la desigualdad $\\leq 0$ no tiene solución.",
          "Hence $\\bigl||x-1|+1\\bigr| \\geq 1 > 0$ for every $x$: the inequality $\\leq 0$ has no solution.",
        ),
      ],
      answerDisplay: L("Verdadero: $A_{p(x)} = \\emptyset$", "True: $A_{p(x)} = \\emptyset$"),
      solution: [
        step(
          "given",
          "$p(x): \\bigl||x - 1| + 1\\bigr| \\leq 0$, $x \\in \\mathbb{R}$; $N(A)$ denota el número de elementos del conjunto de verdad.",
          "$p(x): \\bigl||x - 1| + 1\\bigr| \\leq 0$, $x \\in \\mathbb{R}$; $N(A)$ denotes the number of elements of the truth set.",
        ),
        step(
          "approach",
          "No hay que resolver: basta acotar la expresión. El valor absoluto exterior se aplica a algo que ya es positivo.",
          "No solving needed: it is enough to bound the expression. The outer absolute value acts on something already positive.",
        ),
        step(
          "calculation",
          "$|x - 1| \\geq 0$ → $|x - 1| + 1 \\geq 1$ → $\\bigl||x-1|+1\\bigr| \\geq 1$ para todo $x$ (en $x = 1$ vale exactamente $1$).<br>Pedir que sea $\\leq 0$ es imposible.",
          "$|x - 1| \\geq 0$ → $|x - 1| + 1 \\geq 1$ → $\\bigl||x-1|+1\\bigr| \\geq 1$ for every $x$ (at $x = 1$ it equals exactly $1$).<br>Requiring it to be $\\leq 0$ is impossible.",
        ),
        step(
          "result",
          "$A_{p(x)} = \\emptyset$, así que $N\\bigl(A_{p(x)}\\bigr) = 0$ y la aﬁrmación es **verdadera**. Un valor absoluto solo puede ser $0$ si su interior es $0$, y aquí el interior $|x-1|+1 \\geq 1$ nunca lo es.",
          "$A_{p(x)} = \\emptyset$, so $N\\bigl(A_{p(x)}\\bigr) = 0$ and the claim is **true**. An absolute value can only be $0$ if its inside is $0$, and here the inside $|x-1|+1 \\geq 1$ never is.",
        ),
      ],
    }),
  ),

  /* 86 — |x−a| < δ → (a−δ, a+δ). Key: a). */
  template(
    {
      id: "lin-espol-ch2-86",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "abs-inequalities",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["absolute-value", "delta-neighborhood", "predicate"],
      prerequisites: ["abs-inequalities"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 86",
        page: 242,
      },
      reasoning: "definition-hunting",
    },
    (rng) => ({
      skill: L("Vecindad δ como desigualdad con valor absoluto", "A δ-neighborhood as an absolute-value inequality"),
      statement: L(
        "Si $\\mathrm{Re} = \\mathbb{R}$ y $p(x): |x - a| < \\delta$ (con $\\delta > 0$), entonces $A_{p(x)} = (a - \\delta,\\ a + \\delta)$.",
        "If $\\mathrm{Re} = \\mathbb{R}$ and $p(x): |x - a| < \\delta$ (with $\\delta > 0$), then $A_{p(x)} = (a - \\delta,\\ a + \\delta)$.",
      ),
      answer: {
        kind: "multiple-choice",
        options: rng.shuffle([
          { id: "v", text: L("Verdadero", "True"), correct: true },
          { id: "f", text: L("Falso", "False"), correct: false },
        ]),
      },
      hints: [
        L(
          "$|x - a|$ mide la **distancia** entre $x$ y $a$ en la recta real.",
          "$|x - a|$ measures the **distance** between $x$ and $a$ on the real line.",
        ),
        L(
          "«Distancia menor que $\\delta$» = todos los puntos a menos de $\\delta$ de $a$, sin incluir los extremos.",
          "«Distance less than $\\delta$» = every point less than $\\delta$ away from $a$, endpoints excluded.",
        ),
      ],
      answerDisplay: L("Verdadero: $A_{p(x)} = (a-\\delta,\\,a+\\delta)$", "True: $A_{p(x)} = (a-\\delta,\\,a+\\delta)$"),
      solution: [
        step(
          "given",
          "$p(x): |x - a| < \\delta$, con $a \\in \\mathbb{R}$ y $\\delta > 0$.",
          "$p(x): |x - a| < \\delta$, with $a \\in \\mathbb{R}$ and $\\delta > 0$.",
        ),
        step(
          "approach",
          "Traducir el valor absoluto como distancia y luego como doble desigualdad.",
          "Translate the absolute value as a distance and then as a double inequality.",
        ),
        step(
          "calculation",
          "$|x - a| < \\delta \\iff -\\delta < x - a < \\delta \\iff a - \\delta < x < a + \\delta$.",
          "$|x - a| < \\delta \\iff -\\delta < x - a < \\delta \\iff a - \\delta < x < a + \\delta$.",
        ),
        step(
          "result",
          "$A_{p(x)} = (a - \\delta,\\ a + \\delta)$ — el intervalo abierto de centro $a$ y radio $\\delta$; la aﬁrmación es **verdadera**. Es exactamente la «vecindad» que se usa en límites y continuidad.",
          "$A_{p(x)} = (a - \\delta,\\ a + \\delta)$ — the open interval of center $a$ and radius $\\delta$; the claim is **true**. This is exactly the «neighborhood» used in limits and continuity.",
        ),
      ],
    }),
  ),

  /* 89 — 1−x ≥ 2x+6 → x ≤ −5/3 (option d). */
  template(
    {
      id: "lin-espol-ch2-89",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "inequalities",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 90,
      tags: ["linear-inequality", "sign-flip"],
      prerequisites: ["multi-step"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 89",
        page: 242,
      },
      reasoning: "definition-hunting",
    },
    (rng) => ({
      skill: L("Desigualdad lineal con cambio de signo", "Linear inequality with a sign flip"),
      statement: L(
        "Los valores reales de $x$ que satisfacen $1 - x \\geq 2x + 6$ son:",
        "The real values of $x$ satisfying $1 - x \\geq 2x + 6$ are:",
      ),
      answer: {
        kind: "multiple-choice",
        options: rng.shuffle([
          { id: "a", text: L("$x \\geq -\\dfrac{5}{3}$", "$x \\geq -\\dfrac{5}{3}$"), correct: false },
          { id: "b", text: L("$x \\leq \\dfrac{5}{3}$", "$x \\leq \\dfrac{5}{3}$"), correct: false },
          { id: "c", text: L("$x \\geq \\dfrac{2}{3}$", "$x \\geq \\dfrac{2}{3}$"), correct: false },
          { id: "d", text: L("$x \\leq -\\dfrac{5}{3}$", "$x \\leq -\\dfrac{5}{3}$"), correct: true },
          { id: "e", text: L("$x \\in (0, +\\infty)$", "$x \\in (0, +\\infty)$"), correct: false },
        ]),
      },
      hints: [
        L(
          "Agrupa los términos con $x$ en un lado y los números en el otro, igual que en una ecuación.",
          "Group the $x$-terms on one side and the numbers on the other, as in an equation.",
        ),
        L(
          "Al pasar los términos obtendrás un coeficiente de $x$ positivo y un número **negativo** al otro lado — cuidado con la dirección.",
          "After moving terms you will get a positive coefficient for $x$ and a **negative** number on the other side — watch the direction.",
        ),
      ],
      answerDisplay: L("$x \\leq -\\dfrac{5}{3}$", "$x \\leq -\\dfrac{5}{3}$"),
      solution: [
        step(
          "given",
          "$1 - x \\geq 2x + 6$, $x \\in \\mathbb{R}$.",
          "$1 - x \\geq 2x + 6$, $x \\in \\mathbb{R}$.",
        ),
        step(
          "approach",
          "Despejar como en una ecuación, con la regla extra: multiplicar o dividir por un negativo invierte la desigualdad.",
          "Isolate as in an equation, with the extra rule: multiplying or dividing by a negative flips the inequality.",
        ),
        step(
          "calculation",
          "$1 - 6 \\geq 2x + x \\Rightarrow -5 \\geq 3x \\Rightarrow 3x \\leq -5 \\Rightarrow x \\leq -\\dfrac{5}{3}$.",
          "$1 - 6 \\geq 2x + x \\Rightarrow -5 \\geq 3x \\Rightarrow 3x \\leq -5 \\Rightarrow x \\leq -\\dfrac{5}{3}$.",
        ),
        step(
          "result",
          "$x \\leq -\\dfrac{5}{3}$, es decir $\\left(-\\infty, -\\dfrac{5}{3}\\right]$. Verificación con $x = -2$: $1 - (-2) = 3 \\geq 2(-2) + 6 = 2$ ✓.",
          "$x \\leq -\\dfrac{5}{3}$, i.e. $\\left(-\\infty, -\\dfrac{5}{3}\\right]$. Check at $x = -2$: $1 - (-2) = 3 \\geq 2(-2) + 6 = 2$ ✓.",
        ),
      ],
    }),
  ),

  /* 92b — interval operations with an empty branch → [3,5]. */
  template(
    {
      id: "lin-espol-ch2-92b",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "interval-notation",
      difficulty: "medium",
      questionType: "text",
      estimatedTimeSec: 150,
      tags: ["intervals", "set-operations", "interval-notation"],
      prerequisites: ["compound", "interval-notation"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 92b",
        page: 243,
      },
      reasoning: "case-analysis",
    },
    () => ({
      skill: L("Operaciones de intervalos con una rama vacía", "Interval operations with an empty branch"),
      statement: L(
        "Expresa como un intervalo (admite notaciones como (2, 5] o 3<=x<=5): $\\bigl[(x \\leq -3) \\wedge (x > 2)\\bigr] \\vee \\bigl[(x \\geq 3) \\wedge (x \\leq 5)\\bigr]$.",
        "Express as an interval (notations like (2, 5] or 3<=x<=5 are accepted): $\\bigl[(x \\leq -3) \\wedge (x > 2)\\bigr] \\vee \\bigl[(x \\geq 3) \\wedge (x \\leq 5)\\bigr]$.",
      ),
      answer: {
        kind: "text",
        accepted: ["[3, 5]", "[3,5]", "3<=x<=5", "3≤x≤5", "3 <= x <= 5", "3 ≤ x ≤ 5"],
      },
      hints: [
        L(
          "Evalúa cada corchete por separado: dentro de un corchete manda la **intersección** ($\\wedge$), y entre corchetes la **unión** ($\\vee$).",
          "Evaluate each bracket separately: inside a bracket the **intersection** ($\\wedge$) rules, and between brackets the **union** ($\\vee$).",
        ),
        L(
          "¿Puede un número ser a la vez $\\leq -3$ y $> 2$? Ese primer corchete puede sorprenderte.",
          "Can a number be simultaneously $\\leq -3$ and $> 2$? That first bracket may surprise you.",
        ),
      ],
      answerDisplay: L("$[3, 5]$", "$[3, 5]$"),
      solution: [
        step(
          "given",
          "$\\bigl[(x \\leq -3) \\wedge (x > 2)\\bigr] \\vee \\bigl[(x \\geq 3) \\wedge (x \\leq 5)\\bigr]$.",
          "$\\bigl[(x \\leq -3) \\wedge (x > 2)\\bigr] \\vee \\bigl[(x \\geq 3) \\wedge (x \\leq 5)\\bigr]$.",
        ),
        step(
          "approach",
          "Traducir cada condición a intervalos y operar: $\\wedge$ = intersección, $\\vee$ = unión.",
          "Translate each condition to intervals and operate: $\\wedge$ = intersection, $\\vee$ = union.",
        ),
        step(
          "calculation",
          "Primer corchete: $(-\\infty, -3] \\cap (2, +\\infty) = \\emptyset$ (ningún número es $\\leq -3$ y además $> 2$).<br>Segundo corchete: $[3, +\\infty) \\cap (-\\infty, 5] = [3, 5]$.",
          "First bracket: $(-\\infty, -3] \\cap (2, +\\infty) = \\emptyset$ (no number is both $\\leq -3$ and $> 2$).<br>Second bracket: $[3, +\\infty) \\cap (-\\infty, 5] = [3, 5]$.",
        ),
        step(
          "result",
          "$\\emptyset \\cup [3,5] = [3, 5]$. La trampa del ejercicio es el corchete vacío: unir con $\\emptyset$ no aporta nada.",
          "$\\emptyset \\cup [3,5] = [3, 5]$. The trap of this exercise is the empty bracket: union with $\\emptyset$ adds nothing.",
        ),
      ],
    }),
  ),

  /* 93a — 5(x−1)−x(7−x) > x² → x < −5/2 (the x² cancels). */
  template(
    {
      id: "lin-espol-ch2-93a",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "inequalities",
      difficulty: "medium",
      questionType: "text",
      estimatedTimeSec: 150,
      tags: ["inequality", "expansion", "hidden-linear"],
      prerequisites: ["parentheses"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 93a",
        page: 243,
      },
      reasoning: "spurious",
    },
    () => ({
      skill: L("La inecuación «cuadrática» que es lineal", "The «quadratic» inequality that is linear"),
      statement: L(
        "Resuelve y da el conjunto solución como intervalo (admite (2, 5], x<-3 o (-inf, 1]): $5(x - 1) - x(7 - x) > x^{2}$.",
        "Solve and give the solution set as an interval (notations like (2, 5], x<-3 or (-inf, 1] are accepted): $5(x - 1) - x(7 - x) > x^{2}$.",
      ),
      answer: {
        kind: "text",
        accepted: [
          "(-inf, -5/2)",
          "(-inf,-5/2)",
          "(-∞, -5/2)",
          "(-∞,-5/2)",
          "x<-5/2",
          "x < -5/2",
          "(-inf, -2.5)",
          "x<- 5/2",
        ],
      },
      hints: [
        L(
          "Desarrolla $-x(7 - x)$ con cuidado: el signo menos afecta a los dos factores.",
          "Expand $-x(7 - x)$ carefully: the minus sign applies to both factors.",
        ),
        L(
          "Después de simplificar, los términos $x^{2}$ deberían cancelarse… y quedar algo mucho más simple.",
          "After simplifying, the $x^{2}$ terms should cancel… leaving something far simpler.",
        ),
      ],
      answerDisplay: L("$\\left(-\\infty, -\\dfrac{5}{2}\\right)$", "$\\left(-\\infty, -\\dfrac{5}{2}\\right)$"),
      solution: [
        step(
          "given",
          "$5(x - 1) - x(7 - x) > x^{2}$, $x \\in \\mathbb{R}$.",
          "$5(x - 1) - x(7 - x) > x^{2}$, $x \\in \\mathbb{R}$.",
        ),
        step(
          "approach",
          "Expandir ambos lados: la apariencia cuadrática es un disfraz.",
          "Expand both sides: the quadratic look is a disguise.",
        ),
        step(
          "calculation",
          "Izquierda: $5x - 5 - 7x + x^{2} = x^{2} - 2x - 5$.<br>Desigualdad: $x^{2} - 2x - 5 > x^{2} \\Rightarrow -2x - 5 > 0 \\Rightarrow -2x > 5 \\Rightarrow x < -\\dfrac{5}{2}$ (dividir entre $-2$ invierte).",
          "Left: $5x - 5 - 7x + x^{2} = x^{2} - 2x - 5$.<br>Inequality: $x^{2} - 2x - 5 > x^{2} \\Rightarrow -2x - 5 > 0 \\Rightarrow -2x > 5 \\Rightarrow x < -\\dfrac{5}{2}$ (dividing by $-2$ flips it).",
        ),
        step(
          "result",
          "$\\left(-\\infty, -\\dfrac{5}{2}\\right)$. Verificación con $x = -3$: $5(-4) - (-3)(10) = -20 + 30 = 10 > 9$ ✓; con $x = -2$: $5(-3) - (-2)(9) = -15 + 18 = 3 \\not> 4$ ✗.",
          "$\\left(-\\infty, -\\dfrac{5}{2}\\right)$. Check at $x = -3$: $5(-4) - (-3)(10) = -20 + 30 = 10 > 9$ ✓; at $x = -2$: $5(-3) - (-2)(9) = -15 + 18 = 3 \\not> 4$ ✗.",
        ),
      ],
    }),
  ),

  /* 93b — |2x+4| < 10 → (−7,3). */
  template(
    {
      id: "lin-espol-ch2-93b",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "abs-inequalities",
      difficulty: "medium",
      questionType: "text",
      estimatedTimeSec: 120,
      tags: ["absolute-value", "inequality", "interval"],
      prerequisites: ["abs-inequalities", "interval-notation"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 93b",
        page: 243,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L("Desigualdad con valor absoluto tipo «menor que»", "«Less than» absolute-value inequality"),
      statement: L(
        "Resuelve y da el conjunto solución como intervalo (admite (2, 5] o -7<x<3): $|2x + 4| < 10$.",
        "Solve and give the solution set as an interval (notations like (2, 5] or -7<x<3 are accepted): $|2x + 4| < 10$.",
      ),
      answer: {
        kind: "text",
        accepted: ["(-7, 3)", "(-7,3)", "-7<x<3", "-7 < x < 3", "-7<x< 3", "(-7, 3 )"],
      },
      hints: [
        L(
          "$|u| < a$ (con $a > 0$) equivale a la doble desigualdad $-a < u < a$.",
          "$|u| < a$ (with $a > 0$) is equivalent to the double inequality $-a < u < a$.",
        ),
        L(
          "Con $u = 2x + 4$: despeja $x$ en los **tres** miembros a la vez restando 4 y dividiendo entre 2.",
          "With $u = 2x + 4$: isolate $x$ in **all three** parts at once, subtracting 4 and dividing by 2.",
        ),
      ],
      answerDisplay: L("$(-7, 3)$", "$(-7, 3)$"),
      solution: [
        step(
          "given",
          "$|2x + 4| < 10$, $x \\in \\mathbb{R}$.",
          "$|2x + 4| < 10$, $x \\in \\mathbb{R}$.",
        ),
        step(
          "approach",
          "Regla directa para «menor que»: el interior queda atrapado entre $-10$ y $10$.",
          "Direct rule for «less than»: the inside gets trapped between $-10$ and $10$.",
        ),
        step(
          "calculation",
          "$-10 < 2x + 4 < 10 \\Rightarrow -14 < 2x < 6 \\Rightarrow -7 < x < 3$.",
          "$-10 < 2x + 4 < 10 \\Rightarrow -14 < 2x < 6 \\Rightarrow -7 < x < 3$.",
        ),
        step(
          "result",
          "$(-7, 3)$, abierto en ambos extremos porque la desigualdad es estricta. Verificación con $x = 0$: $|4| = 4 < 10$ ✓; con $x = 3$: $|10| = 10 \\not< 10$ ✗ (borde excluido).",
          "$(-7, 3)$, open at both ends because the inequality is strict. Check at $x = 0$: $|4| = 4 < 10$ ✓; at $x = 3$: $|10| = 10 \\not< 10$ ✗ (endpoint excluded).",
        ),
      ],
    }),
  ),

  /* 93e — |x−1| ≥ (x+1)/2 → (−∞,1/3] ∪ [3,∞). */
  template(
    {
      id: "lin-espol-ch2-93e",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "abs-inequalities",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["absolute-value", "inequality", "case-analysis", "linear-right-side"],
      prerequisites: ["abs-inequalities", "interval-notation"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 93e",
        page: 243,
      },
      reasoning: "case-analysis",
    },
    (rng) => ({
      skill: L("Valor absoluto contra una expresión lineal (sin regla directa)", "Absolute value against a linear expression (no direct rule)"),
      statement: L(
        "Resuelve $|x - 1| \\geq \\dfrac{x + 1}{2}$, $x \\in \\mathbb{R}$. El conjunto solución es:",
        "Solve $|x - 1| \\geq \\dfrac{x + 1}{2}$, $x \\in \\mathbb{R}$. The solution set is:",
      ),
      answer: {
        kind: "multiple-choice",
        options: rng.shuffle([
          { id: "a", text: L("$\\left[-\\dfrac{1}{3},\\ 3\\right]$", "$\\left[-\\dfrac{1}{3},\\ 3\\right]$"), correct: false },
          { id: "b", text: L("$\\left(-\\infty,\\ \\dfrac{1}{3}\\right] \\cup [3,\\ +\\infty)$", "$\\left(-\\infty,\\ \\dfrac{1}{3}\\right] \\cup [3,\\ +\\infty)$"), correct: true },
          { id: "c", text: L("$\\left(-\\infty,\\ \\dfrac{1}{3}\\right) \\cup (3,\\ +\\infty)$", "$\\left(-\\infty,\\ \\dfrac{1}{3}\\right) \\cup (3,\\ +\\infty)$"), correct: false },
          { id: "d", text: L("$\\left[\\dfrac{1}{3},\\ 3\\right]$", "$\\left[\\dfrac{1}{3},\\ 3\\right]$"), correct: false },
          { id: "e", text: L("$\\left[-3,\\ \\dfrac{1}{3}\\right] \\cup [3, +\\infty)$", "$\\left[-3,\\ \\dfrac{1}{3}\\right] \\cup [3, +\\infty)$"), correct: false },
        ]),
      },
      hints: [
        L(
          "El lado derecho **no es una constante**, así que la regla $|u| \\geq a$ no aplica. Hay que partir por casos según el signo de $x - 1$.",
          "The right side is **not a constant**, so the rule $|u| \\geq a$ does not apply. Split into cases according to the sign of $x - 1$.",
        ),
        L(
          "Caso 1 ($x \\geq 1$): $|x-1| = x - 1$. Caso 2 ($x < 1$): $|x-1| = 1 - x$. Resuelve cada desigualdad y **revisa que la solución caiga dentro del caso**.",
          "Case 1 ($x \\geq 1$): $|x-1| = x - 1$. Case 2 ($x < 1$): $|x-1| = 1 - x$. Solve each inequality and **check the solution stays inside the case**.",
        ),
      ],
      answerDisplay: L("$\\left(-\\infty,\\ \\dfrac{1}{3}\\right] \\cup [3,\\ +\\infty)$", "$\\left(-\\infty,\\ \\dfrac{1}{3}\\right] \\cup [3,\\ +\\infty)$"),
      solution: [
        step(
          "given",
          "$|x - 1| \\geq \\dfrac{x+1}{2}$; punto crítico del valor absoluto: $x = 1$.",
          "$|x - 1| \\geq \\dfrac{x+1}{2}$; critical point of the absolute value: $x = 1$.",
        ),
        step(
          "approach",
          "Análisis por casos (la derecha no es constante): resolver en cada tramo y conservar solo las soluciones coherentes con el tramo.",
          "Case analysis (the right side is not constant): solve on each tranche and keep only the solutions consistent with it.",
        ),
        step(
          "calculation",
          "Caso $x \\geq 1$: $x - 1 \\geq \\dfrac{x+1}{2} \\Rightarrow 2x - 2 \\geq x + 1 \\Rightarrow x \\geq 3$ ✓ (cae en el tramo).<br>Caso $x < 1$: $1 - x \\geq \\dfrac{x+1}{2} \\Rightarrow 2 - 2x \\geq x + 1 \\Rightarrow 1 \\geq 3x \\Rightarrow x \\leq \\dfrac{1}{3}$ ✓ (todo el tramo $x \\leq \\frac{1}{3}$ cumple).",
          "Case $x \\geq 1$: $x - 1 \\geq \\dfrac{x+1}{2} \\Rightarrow 2x - 2 \\geq x + 1 \\Rightarrow x \\geq 3$ ✓ (inside the tranche).<br>Case $x < 1$: $1 - x \\geq \\dfrac{x+1}{2} \\Rightarrow 2 - 2x \\geq x + 1 \\Rightarrow 1 \\geq 3x \\Rightarrow x \\leq \\dfrac{1}{3}$ ✓ (the whole ray $x \\leq \\frac{1}{3}$ qualifies).",
        ),
        step(
          "result",
          "Unión: $\\left(-\\infty, \\dfrac{1}{3}\\right] \\cup [3, +\\infty)$ — igual al complemento de $\\left(\\frac{1}{3}, 3\\right)$, como anota la clave del libro. Verificación: $x = 0$: $1 \\geq 0.5$ ✓; $x = 2$: $1 \\geq 1.5$ ✗; $x = 3$: $2 \\geq 2$ ✓.",
          "Union: $\\left(-\\infty, \\dfrac{1}{3}\\right] \\cup [3, +\\infty)$ — equal to the complement of $\\left(\\frac{1}{3}, 3\\right)$, as the book's key notes. Check: $x = 0$: $1 \\geq 0.5$ ✓; $x = 2$: $1 \\geq 1.5$ ✗; $x = 3$: $2 \\geq 2$ ✓.",
        ),
      ],
    }),
  ),

  /* 93f — 3x/2 + 3|x−2| ≤ 3 → {2} (single point!). */
  template(
    {
      id: "lin-espol-ch2-93f",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "abs-inequalities",
      difficulty: "hard",
      questionType: "text",
      estimatedTimeSec: 240,
      tags: ["absolute-value", "inequality", "case-analysis", "single-point"],
      prerequisites: ["abs-inequalities"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 93f",
        page: 243,
      },
      reasoning: "case-analysis",
    },
    () => ({
      skill: L("Inecuación con valor absoluto cuya solución es un solo punto", "Absolute-value inequality whose solution is a single point"),
      statement: L(
        "Resuelve $\\dfrac{3x}{2} + 3|x - 2| \\leq 3$, $x \\in \\mathbb{R}$. Da el conjunto solución (admite x=2, {2} o 2):",
        "Solve $\\dfrac{3x}{2} + 3|x - 2| \\leq 3$, $x \\in \\mathbb{R}$. Give the solution set (x=2, {2} or 2 are accepted):",
      ),
      answer: {
        kind: "text",
        accepted: ["x=2", "x = 2", "{2}", "2", "x= 2"],
      },
      hints: [
        L(
          "Parte por casos en $x = 2$ (donde $|x-2|$ cambia de forma). No olvides revisar el propio $x = 2$.",
          "Split into cases at $x = 2$ (where $|x-2|$ changes form). Do not forget to test $x = 2$ itself.",
        ),
        L(
          "Caso $x \\geq 2$: la expresión queda $\\frac{9x}{2} - 6 \\leq 3$. ¿Qué resultado da y en qué tramo cae?",
          "Case $x \\geq 2$: the expression becomes $\\frac{9x}{2} - 6 \\leq 3$. What does it give, and inside which tranche?",
        ),
        L(
          "Caso $x < 2$: queda $6 - \\frac{3x}{2} \\leq 3$, es decir $x \\geq 2$… contradicción con el propio caso.",
          "Case $x < 2$: it becomes $6 - \\frac{3x}{2} \\leq 3$, i.e. $x \\geq 2$… contradicting the case itself.",
        ),
      ],
      answerDisplay: L("$\\{2\\}$", "$\\{2\\}$"),
      solution: [
        step(
          "given",
          "$\\dfrac{3x}{2} + 3|x - 2| \\leq 3$; punto crítico $x = 2$.",
          "$\\dfrac{3x}{2} + 3|x - 2| \\leq 3$; critical point $x = 2$.",
        ),
        step(
          "approach",
          "Análisis por casos con verificación de coherencia: en cada tramo se resuelve una lineal y se conserva solo lo que cae dentro.",
          "Case analysis with consistency check: on each tranche solve a linear inequality and keep only what lands inside.",
        ),
        step(
          "calculation",
          "Caso $x \\geq 2$: $|x-2| = x-2$ → $\\frac{3x}{2} + 3x - 6 \\leq 3 \\Rightarrow \\frac{9x}{2} \\leq 9 \\Rightarrow x \\leq 2$. Junto con $x \\geq 2$: solo $x = 2$.<br>Caso $x < 2$: $|x-2| = 2-x$ → $\\frac{3x}{2} + 6 - 3x \\leq 3 \\Rightarrow -\\frac{3x}{2} \\leq -3 \\Rightarrow x \\geq 2$, contradictorio con $x < 2$ → vacío.",
          "Case $x \\geq 2$: $|x-2| = x-2$ → $\\frac{3x}{2} + 3x - 6 \\leq 3 \\Rightarrow \\frac{9x}{2} \\leq 9 \\Rightarrow x \\leq 2$. Together with $x \\geq 2$: only $x = 2$.<br>Case $x < 2$: $|x-2| = 2-x$ → $\\frac{3x}{2} + 6 - 3x \\leq 3 \\Rightarrow -\\frac{3x}{2} \\leq -3 \\Rightarrow x \\geq 2$, contradicting $x < 2$ → empty.",
        ),
        step(
          "result",
          "$A = \\{2\\}$ — una solución única. Verificación: $\\frac{3(2)}{2} + 3|0| = 3 \\leq 3$ ✓; $x = 1$: $1.5 + 3 = 4.5 \\not\\leq 3$ ✗; $x = 3$: $4.5 + 3 = 7.5 \\not\\leq 3$ ✗.",
          "$A = \\{2\\}$ — a single solution. Check: $\\frac{3(2)}{2} + 3|0| = 3 \\leq 3$ ✓; $x = 1$: $1.5 + 3 = 4.5 \\not\\leq 3$ ✗; $x = 3$: $4.5 + 3 = 7.5 \\not\\leq 3$ ✗.",
        ),
      ],
    }),
  ),

  /* 94b — 2 < 2x−2 ≤ 12 → (2,7]. */
  template(
    {
      id: "lin-espol-ch2-94b",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "compound",
      difficulty: "medium",
      questionType: "text",
      estimatedTimeSec: 120,
      tags: ["compound-inequality", "interval"],
      prerequisites: ["compound", "interval-notation"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 94b",
        page: 243,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L("Conjunto de verdad de una desigualdad doble", "Truth set of a double inequality"),
      statement: L(
        "Determina el conjunto de verdad de $q(x): 2 < 2x - 2 \\leq 12$ como intervalo (admite (2, 5] o 2<x<=7):",
        "Determine the truth set of $q(x): 2 < 2x - 2 \\leq 12$ as an interval (notations like (2, 5] or 2<x<=7 are accepted):",
      ),
      answer: {
        kind: "text",
        accepted: ["(2, 7]", "(2,7]", "2<x<=7", "2 < x <= 7", "2<x≤7", "2 < x ≤ 7"],
      },
      hints: [
        L(
          "Una desigualdad doble se trata como dos desigualdades simultáneas: $2 < 2x-2$ y $2x-2 \\leq 12$.",
          "A double inequality is two simultaneous inequalities: $2 < 2x-2$ and $2x-2 \\leq 12$.",
        ),
        L(
          "Puedes sumar 2 y dividir entre 2 en los **tres** miembros a la vez.",
          "You may add 2 and divide by 2 across **all three** parts at once.",
        ),
      ],
      answerDisplay: L("$(2, 7]$", "$(2, 7]$"),
      solution: [
        step(
          "given",
          "$q(x): 2 < 2x - 2 \\leq 12$, $x \\in \\mathbb{R}$.",
          "$q(x): 2 < 2x - 2 \\leq 12$, $x \\in \\mathbb{R}$.",
        ),
        step(
          "approach",
          "Despejar el bloque $2x - 2$ en la doble desigualdad, operando simultáneamente en los tres miembros.",
          "Isolate the block $2x - 2$ inside the double inequality, operating on all three parts at once.",
        ),
        step(
          "calculation",
          "$2 + 2 < 2x \\leq 12 + 2 \\Rightarrow 4 < 2x \\leq 14 \\Rightarrow 2 < x \\leq 7$.",
          "$2 + 2 < 2x \\leq 12 + 2 \\Rightarrow 4 < 2x \\leq 14 \\Rightarrow 2 < x \\leq 7$.",
        ),
        step(
          "result",
          "$A_{q(x)} = (2, 7]$: abierto en 2 (desigualdad estricta) y cerrado en 7. Verificación: $x = 2$: $2 \\not< 2$ ✗; $x = 7$: $2 < 12 \\leq 12$ ✓.",
          "$A_{q(x)} = (2, 7]$: open at 2 (strict inequality) and closed at 7. Check: $x = 2$: $2 \\not< 2$ ✗; $x = 7$: $2 < 12 \\leq 12$ ✓.",
        ),
      ],
    }),
  ),

  /* 94c — 8−3x ≤ 2x−7 < x−13 → ∅. */
  template(
    {
      id: "lin-espol-ch2-94c",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "compound",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["compound-inequality", "empty-set", "truth-set"],
      prerequisites: ["compound"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 94c",
        page: 243,
      },
      reasoning: "case-analysis",
    },
    (rng) => ({
      skill: L("Desigualdad doble con conjunto de verdad vacío", "Double inequality with an empty truth set"),
      statement: L(
        "Determina el conjunto de verdad de $r(x): 8 - 3x \\leq 2x - 7 < x - 13$, $x \\in \\mathbb{R}$.",
        "Determine the truth set of $r(x): 8 - 3x \\leq 2x - 7 < x - 13$, $x \\in \\mathbb{R}$.",
      ),
      answer: {
        kind: "multiple-choice",
        options: rng.shuffle([
          { id: "a", text: L("$[3, +\\infty)$", "$[3, +\\infty)$"), correct: false },
          { id: "b", text: L("$(-\\infty, -6)$", "$(-\\infty, -6)$"), correct: false },
          { id: "c", text: L("$[-6, 3]$", "$[-6, 3]$"), correct: false },
          { id: "d", text: L("$\\emptyset$ (no hay ningún $x$ que cumpla)", "$\\emptyset$ (no $x$ satisfies it)"), correct: true },
          { id: "e", text: L("$(-\\infty, 3] \\cup [-6, +\\infty)$", "$(-\\infty, 3] \\cup [-6, +\\infty)$"), correct: false },
        ]),
      },
      hints: [
        L(
          "Separa la desigualdad doble en dos desigualdades simples y resuelve cada una.",
          "Split the double inequality into two simple inequalities and solve each.",
        ),
        L(
          "El conjunto de verdad de la doble es la **intersección** de los dos resultados. ¿Se cruzan?",
          "The truth set of the double inequality is the **intersection** of the two results. Do they cross?",
        ),
      ],
      answerDisplay: L("$A_{r(x)} = \\emptyset$", "$A_{r(x)} = \\emptyset$"),
      solution: [
        step(
          "given",
          "$r(x): 8 - 3x \\leq 2x - 7 < x - 13$.",
          "$r(x): 8 - 3x \\leq 2x - 7 < x - 13$.",
        ),
        step(
          "approach",
          "Resolver las dos desigualdades por separado e intersectar; el orden de los resultados revela la trampa.",
          "Solve the two inequalities separately and intersect; the order of the results reveals the trap.",
        ),
        step(
          "calculation",
          "Izquierda: $8 - 3x \\leq 2x - 7 \\Rightarrow 15 \\leq 5x \\Rightarrow x \\geq 3$.<br>Derecha: $2x - 7 < x - 13 \\Rightarrow x < -6$.<br>Intersección: $x \\geq 3 \\wedge x < -6$ — ningún número cumple ambas.",
          "Left: $8 - 3x \\leq 2x - 7 \\Rightarrow 15 \\leq 5x \\Rightarrow x \\geq 3$.<br>Right: $2x - 7 < x - 13 \\Rightarrow x < -6$.<br>Intersection: $x \\geq 3 \\wedge x < -6$ — no number satisfies both.",
        ),
        step(
          "result",
          "$A_{r(x)} = \\emptyset$: las exigencias son incompatibles ($x$ tendría que ser $\\geq 3$ y a la vez $< -6$). Una desigualdad doble «en cadena» solo tiene solución si los tramos se solapan.",
          "$A_{r(x)} = \\emptyset$: the demands are incompatible ($x$ would need to be $\\geq 3$ and $< -6$ at once). A chained double inequality only has solutions when the stretches overlap.",
        ),
      ],
    }),
  ),

  /* ---------------------------------------------------------------- */
  /* Recopilación del autor · ronda 2 (2026-10-05) — valor absoluto    */
  /* y desigualdades (ítems B, C y D de la hoja del tutor). Clave del  */
  /* autor verificada con sympy: download/verify_author_round2.py.     */
  /* ---------------------------------------------------------------- */

  /* R2 · 6 — |x²−3x| = 2x−1 → {(5+√21)/2, (1+√5)/2}; the two "−" roots fail 2x−1 ≥ 0. */
  template(
    {
      id: "lin-autor2-06",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "abs-equations",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["absolute-value", "equations", "spurious-roots"],
      prerequisites: ["abs-equations"],
      source: {
        sourceId: "autor-recopilacion-2025",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "R2 · 6",
      },
      reasoning: "spurious",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "$\\left\\{\\dfrac{5+\\sqrt{21}}{2},\\ \\dfrac{1+\\sqrt{5}}{2}\\right\\}$",
            "$\\left\\{\\dfrac{5+\\sqrt{21}}{2},\\ \\dfrac{1+\\sqrt{5}}{2}\\right\\}$",
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            "$\\left\\{\\dfrac{5-\\sqrt{21}}{2},\\ \\dfrac{1-\\sqrt{5}}{2}\\right\\}$",
            "$\\left\\{\\dfrac{5-\\sqrt{21}}{2},\\ \\dfrac{1-\\sqrt{5}}{2}\\right\\}$",
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            "$\\left\\{\\dfrac{5\\pm\\sqrt{21}}{2},\\ \\dfrac{1\\pm\\sqrt{5}}{2}\\right\\}$",
            "$\\left\\{\\dfrac{5\\pm\\sqrt{21}}{2},\\ \\dfrac{1\\pm\\sqrt{5}}{2}\\right\\}$",
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            "$\\left\\{\\dfrac{5+\\sqrt{21}}{2}\\right\\}$",
            "$\\left\\{\\dfrac{5+\\sqrt{21}}{2}\\right\\}$",
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Valor absoluto con lado derecho de signo dudoso",
          "Absolute value with a right-hand side of doubtful sign",
        ),
        statement: L(
          "Resuelve la ecuación $\\left|x^{2}-3x\\right| = 2x-1$, $x \\in \\mathbb{R}$, y escoge el conjunto solución.",
          "Solve the equation $\\left|x^{2}-3x\\right| = 2x-1$, $x \\in \\mathbb{R}$, and choose the solution set.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Un valor absoluto nunca es negativo: si $2x-1<0$, la ecuación no tiene nada que decir. Empieza exigiendo $2x-1 \\ge 0$.",
            "An absolute value is never negative: if $2x-1<0$ the equation has nothing to say. Start by requiring $2x-1 \\ge 0$.",
          ),
          L(
            "Separa según el signo de $x^{2}-3x$: las ecuaciones son $x^{2}-3x = 2x-1$ y $x^{2}-3x = 1-2x$; resuelve las dos cuadráticas.",
            "Split on the sign of $x^{2}-3x$: the equations are $x^{2}-3x = 2x-1$ and $x^{2}-3x = 1-2x$; solve both quadratics.",
          ),
          L(
            "De las cuatro raíces candidatas, solo las que cumplen $x \\ge \\dfrac{1}{2}$ sobreviven: las otras dos hacen negativo el lado derecho.",
            "Of the four candidate roots, only those with $x \\ge \\dfrac{1}{2}$ survive: the other two make the right-hand side negative.",
          ),
        ],
        answerDisplay: L(
          "$\\left\\{\\dfrac{5+\\sqrt{21}}{2},\\ \\dfrac{1+\\sqrt{5}}{2}\\right\\}$",
          "$\\left\\{\\dfrac{5+\\sqrt{21}}{2},\\ \\dfrac{1+\\sqrt{5}}{2}\\right\\}$",
        ),
        solution: [
          step(
            "given",
            "$\\left|x^{2}-3x\\right| = 2x-1$, $x \\in \\mathbb{R}$.",
            "$\\left|x^{2}-3x\\right| = 2x-1$, $x \\in \\mathbb{R}$.",
          ),
          step(
            "approach",
            "Separar según el signo de $x^{2}-3x$ y filtrar después con la condición $2x-1 \\ge 0$ (un valor absoluto nunca puede igualar algo negativo).",
            "Split on the sign of $x^{2}-3x$ and then filter with the condition $2x-1 \\ge 0$ (an absolute value can never equal something negative).",
          ),
          step(
            "calculation",
            "Como $\\left|x^{2}-3x\\right| \\ge 0$, hace falta $2x-1 \\ge 0$, es decir $x \\ge \\dfrac{1}{2}$.<br>Caso $x^{2}-3x \\ge 0$: $x^{2}-3x = 2x-1 \\Rightarrow x^{2}-5x+1 = 0 \\Rightarrow x = \\dfrac{5 \\pm \\sqrt{21}}{2}$.<br>Caso $x^{2}-3x < 0$: $x^{2}-3x = -(2x-1) \\Rightarrow x^{2}-x-1 = 0 \\Rightarrow x = \\dfrac{1 \\pm \\sqrt{5}}{2}$.<br>Filtro $x \\ge \\dfrac{1}{2}$: sobreviven $\\dfrac{5+\\sqrt{21}}{2}$ y $\\dfrac{1+\\sqrt{5}}{2}$; caen $\\dfrac{5-\\sqrt{21}}{2} < \\dfrac{1}{2}$ (pues $\\sqrt{21} > 4$) y $\\dfrac{1-\\sqrt{5}}{2} < \\dfrac{1}{2}$, que harían $2x-1 < 0$.",
            "Since $\\left|x^{2}-3x\\right| \\ge 0$, we need $2x-1 \\ge 0$, i.e. $x \\ge \\dfrac{1}{2}$.<br>Case $x^{2}-3x \\ge 0$: $x^{2}-3x = 2x-1 \\Rightarrow x^{2}-5x+1 = 0 \\Rightarrow x = \\dfrac{5 \\pm \\sqrt{21}}{2}$.<br>Case $x^{2}-3x < 0$: $x^{2}-3x = -(2x-1) \\Rightarrow x^{2}-x-1 = 0 \\Rightarrow x = \\dfrac{1 \\pm \\sqrt{5}}{2}$.<br>Filter $x \\ge \\dfrac{1}{2}$: $\\dfrac{5+\\sqrt{21}}{2}$ and $\\dfrac{1+\\sqrt{5}}{2}$ survive; $\\dfrac{5-\\sqrt{21}}{2} < \\dfrac{1}{2}$ (since $\\sqrt{21} > 4$) and $\\dfrac{1-\\sqrt{5}}{2} < \\dfrac{1}{2}$ drop out, as they would make $2x-1 < 0$.",
          ),
          step(
            "result",
            "$S = \\left\\{\\dfrac{5+\\sqrt{21}}{2},\\ \\dfrac{1+\\sqrt{5}}{2}\\right\\}$. Verificación: con $x = \\dfrac{5+\\sqrt{21}}{2}$ se cumple $x^{2}-3x = 2x-1 > 0$, así que ambos lados coinciden ✓; con $x = \\dfrac{1+\\sqrt{5}}{2}$ se cumple $x^{2}-3x = -\\sqrt{5}$ y $2x-1 = \\sqrt{5}$, luego $\\left|x^{2}-3x\\right| = \\sqrt{5} = 2x-1$ ✓; en cambio, con $x = \\dfrac{1-\\sqrt{5}}{2}$ el lado derecho es $-\\sqrt{5} < 0$ ✗.",
            "$S = \\left\\{\\dfrac{5+\\sqrt{21}}{2},\\ \\dfrac{1+\\sqrt{5}}{2}\\right\\}$. Check: at $x = \\dfrac{5+\\sqrt{21}}{2}$ we have $x^{2}-3x = 2x-1 > 0$, so both sides match ✓; at $x = \\dfrac{1+\\sqrt{5}}{2}$ we have $x^{2}-3x = -\\sqrt{5}$ and $2x-1 = \\sqrt{5}$, hence $\\left|x^{2}-3x\\right| = \\sqrt{5} = 2x-1$ ✓; by contrast, at $x = \\dfrac{1-\\sqrt{5}}{2}$ the right-hand side is $-\\sqrt{5} < 0$ ✗.",
          ),
        ],
      };
    },
  ),

  /* R2 · 7 — |x−1|+|x−2| = |x−3| → {0, 2}. */
  template(
    {
      id: "lin-autor2-07",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "abs-equations",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 180,
      tags: ["absolute-value", "equations", "case-analysis"],
      prerequisites: ["abs-equations", "compound"],
      source: {
        sourceId: "autor-recopilacion-2025",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "R2 · 7",
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$\\left\\{0,\\ 2\\right\\}$", "$\\left\\{0,\\ 2\\right\\}$"), correct: true },
        { id: "b", text: L("$\\left\\{0\\right\\}$", "$\\left\\{0\\right\\}$"), correct: false },
        { id: "c", text: L("$\\left\\{2\\right\\}$", "$\\left\\{2\\right\\}$"), correct: false },
        { id: "d", text: L("$\\left\\{0,\\ 1,\\ 2\\right\\}$", "$\\left\\{0,\\ 1,\\ 2\\right\\}$"), correct: false },
      ];
      return {
        skill: L(
          "Tres barras con cortes en 1, 2 y 3",
          "Three bars with breaks at 1, 2 and 3",
        ),
        statement: L(
          "Resuelve $\\left|x-1\\right|+\\left|x-2\\right| = \\left|x-3\\right|$, $x \\in \\mathbb{R}$, y escoge el conjunto solución.",
          "Solve $\\left|x-1\\right|+\\left|x-2\\right| = \\left|x-3\\right|$, $x \\in \\mathbb{R}$, and choose the solution set.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Los cortes $x=1$, $x=2$ y $x=3$ dividen la recta en cuatro tramos; la ecuación cambia de cara en cada uno.",
            "The breaks $x=1$, $x=2$ and $x=3$ split the line into four stretches; the equation changes face in each one.",
          ),
          L(
            "Elige un punto de prueba en cada tramo para saber qué signo lleva cada barra antes de quitarla.",
            "Pick a test point in each stretch to know which sign each bar carries before removing it.",
          ),
          L(
            "Cada solución obtenida en un tramo solo vale si vive en ese tramo: revisa las cuatro y descarta las intrusas.",
            "Each solution found in a stretch only counts if it lives in that stretch: check all four and discard the intruders.",
          ),
        ],
        answerDisplay: L("$\\left\\{0,\\ 2\\right\\}$", "$\\left\\{0,\\ 2\\right\\}$"),
        solution: [
          step(
            "given",
            "$\\left|x-1\\right|+\\left|x-2\\right| = \\left|x-3\\right|$, $x \\in \\mathbb{R}$.",
            "$\\left|x-1\\right|+\\left|x-2\\right| = \\left|x-3\\right|$, $x \\in \\mathbb{R}$.",
          ),
          step(
            "approach",
            "Cortes en $1$, $2$ y $3$: cuatro tramos; en cada uno se retiran las barras con el signo correcto y se exige que la solución viva en el tramo.",
            "Breaks at $1$, $2$ and $3$: four stretches; in each one the bars are removed with the correct sign and the solution must live in the stretch.",
          ),
          step(
            "calculation",
            "$x<1$: $(1-x)+(2-x) = 3-x \\Rightarrow 3-2x = 3-x \\Rightarrow x = 0$ ✓ (vive en el tramo).<br>$1 \\le x<2$: $(x-1)+(2-x) = 3-x \\Rightarrow 1 = 3-x \\Rightarrow x = 2$, fuera del tramo ✗.<br>$2 \\le x<3$: $(x-1)+(x-2) = 3-x \\Rightarrow 2x-3 = 3-x \\Rightarrow x = 2$ ✓.<br>$x \\ge 3$: $(x-1)+(x-2) = x-3 \\Rightarrow 2x-3 = x-3 \\Rightarrow x = 0$, fuera del tramo ✗.",
            "$x<1$: $(1-x)+(2-x) = 3-x \\Rightarrow 3-2x = 3-x \\Rightarrow x = 0$ ✓ (it lives in the stretch).<br>$1 \\le x<2$: $(x-1)+(2-x) = 3-x \\Rightarrow 1 = 3-x \\Rightarrow x = 2$, outside the stretch ✗.<br>$2 \\le x<3$: $(x-1)+(x-2) = 3-x \\Rightarrow 2x-3 = 3-x \\Rightarrow x = 2$ ✓.<br>$x \\ge 3$: $(x-1)+(x-2) = x-3 \\Rightarrow 2x-3 = x-3 \\Rightarrow x = 0$, outside the stretch ✗.",
          ),
          step(
            "result",
            "$S = \\left\\{0,\\ 2\\right\\}$. Verificación: $x=0$: $1+2 = 3 = \\left|-3\\right|$ ✓; $x=2$: $1+0 = 1 = \\left|-1\\right|$ ✓; el tentador $x=1$ falla: $0+1 = 1 \\neq 2$ ✗.",
            "$S = \\left\\{0,\\ 2\\right\\}$. Check: $x=0$: $1+2 = 3 = \\left|-3\\right|$ ✓; $x=2$: $1+0 = 1 = \\left|-1\\right|$ ✓; the tempting $x=1$ fails: $0+1 = 1 \\neq 2$ ✗.",
          ),
        ],
      };
    },
  ),

  /* R2 · 8 — |x²−4|+|x−1| = 3 → {−2, 1, (√33−1)/2}; 3 is spurious. */
  template(
    {
      id: "lin-autor2-08",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "abs-equations",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["absolute-value", "equations", "case-analysis"],
      prerequisites: ["abs-equations", "compound"],
      source: {
        sourceId: "autor-recopilacion-2025",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "R2 · 8",
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "$\\left\\{-2,\\ 1,\\ \\dfrac{\\sqrt{33}-1}{2}\\right\\}$",
            "$\\left\\{-2,\\ 1,\\ \\dfrac{\\sqrt{33}-1}{2}\\right\\}$",
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            "$\\left\\{1,\\ \\dfrac{\\sqrt{33}-1}{2}\\right\\}$",
            "$\\left\\{1,\\ \\dfrac{\\sqrt{33}-1}{2}\\right\\}$",
          ),
          correct: false,
        },
        { id: "c", text: L("$\\left\\{-2,\\ 1\\right\\}$", "$\\left\\{-2,\\ 1\\right\\}$"), correct: false },
        {
          id: "d",
          text: L(
            "$\\left\\{-2,\\ 1,\\ \\dfrac{\\sqrt{33}-1}{2},\\ 3\\right\\}$",
            "$\\left\\{-2,\\ 1,\\ \\dfrac{\\sqrt{33}-1}{2},\\ 3\\right\\}$",
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Barras cuadrática y lineal en la misma ecuación",
          "Quadratic and linear bars in one equation",
        ),
        statement: L(
          "Resuelve $\\left|x^{2}-4\\right|+\\left|x-1\\right| = 3$, $x \\in \\mathbb{R}$, y escoge el conjunto solución.",
          "Solve $\\left|x^{2}-4\\right|+\\left|x-1\\right| = 3$, $x \\in \\mathbb{R}$, and choose the solution set.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Aquí hay dos barras: $x^{2}-4$ cambia de signo en $x=\\pm 2$ y $x-1$ en $x=1$ — en total cuatro tramos.",
            "Two bars here: $x^{2}-4$ changes sign at $x=\\pm 2$ and $x-1$ at $x=1$ — four stretches in total.",
          ),
          L(
            "En cada tramo, sustituye cada barra por su contenido con el signo correcto y resuelve la ecuación que queda.",
            "In each stretch, replace each bar by its content with the correct sign and solve the resulting equation.",
          ),
          L(
            "Aparecerán raíces espurias (por ejemplo un $3$): toda raíz debe pertenecer a su tramo de origen.",
            "Spurious roots will appear (for example a $3$): every root must belong to its stretch of origin.",
          ),
        ],
        answerDisplay: L(
          "$\\left\\{-2,\\ 1,\\ \\dfrac{\\sqrt{33}-1}{2}\\right\\}$",
          "$\\left\\{-2,\\ 1,\\ \\dfrac{\\sqrt{33}-1}{2}\\right\\}$",
        ),
        solution: [
          step(
            "given",
            "$\\left|x^{2}-4\\right|+\\left|x-1\\right| = 3$, $x \\in \\mathbb{R}$.",
            "$\\left|x^{2}-4\\right|+\\left|x-1\\right| = 3$, $x \\in \\mathbb{R}$.",
          ),
          step(
            "approach",
            "Cortes en $-2$, $1$ y $2$: cuatro tramos ($x^{2}-4$ es negativa solo entre $-2$ y $2$); tramo a tramo la ecuación se vuelve cuadrática.",
            "Breaks at $-2$, $1$ and $2$: four stretches ($x^{2}-4$ is negative only between $-2$ and $2$); stretch by stretch the equation becomes quadratic.",
          ),
          step(
            "calculation",
            "$x<-2$: $(x^{2}-4)+(1-x) = 3 \\Rightarrow x^{2}-x-6 = 0 \\Rightarrow x \\in \\left\\{-2,\\ 3\\right\\}$: ninguno vive en el tramo ✗.<br>$-2 \\le x<1$: $-(x^{2}-4)+(1-x) = 3 \\Rightarrow x^{2}+x-2 = 0 \\Rightarrow x = -2$ ✓ ($x=1$ no vive aquí).<br>$1 \\le x<2$: $-(x^{2}-4)+(x-1) = 3 \\Rightarrow x^{2}-x = 0 \\Rightarrow x = 1$ ✓ ($x=0$ no vive aquí).<br>$x \\ge 2$: $(x^{2}-4)+(x-1) = 3 \\Rightarrow x^{2}+x-8 = 0 \\Rightarrow x = \\dfrac{\\sqrt{33}-1}{2} > \\dfrac{5-1}{2} = 2$ ✓ (la otra raíz es negativa).",
            "$x<-2$: $(x^{2}-4)+(1-x) = 3 \\Rightarrow x^{2}-x-6 = 0 \\Rightarrow x \\in \\left\\{-2,\\ 3\\right\\}$: neither lives in the stretch ✗.<br>$-2 \\le x<1$: $-(x^{2}-4)+(1-x) = 3 \\Rightarrow x^{2}+x-2 = 0 \\Rightarrow x = -2$ ✓ ($x=1$ does not live here).<br>$1 \\le x<2$: $-(x^{2}-4)+(x-1) = 3 \\Rightarrow x^{2}-x = 0 \\Rightarrow x = 1$ ✓ ($x=0$ does not live here).<br>$x \\ge 2$: $(x^{2}-4)+(x-1) = 3 \\Rightarrow x^{2}+x-8 = 0 \\Rightarrow x = \\dfrac{\\sqrt{33}-1}{2} > \\dfrac{5-1}{2} = 2$ ✓ (the other root is negative).",
          ),
          step(
            "result",
            "$S = \\left\\{-2,\\ 1,\\ \\dfrac{\\sqrt{33}-1}{2}\\right\\}$. Verificación: $x=-2$: $0+3 = 3$ ✓; $x=1$: $3+0 = 3$ ✓; $x = \\dfrac{\\sqrt{33}-1}{2}$: como $x^{2}+x = 8$, se tiene $x^{2}-4 = 4-x > 0$ y la suma es $(4-x)+(x-1) = 3$ ✓; el espurio $x=3$ da $\\left|5\\right|+\\left|2\\right| = 7 \\neq 3$ ✗.",
            "$S = \\left\\{-2,\\ 1,\\ \\dfrac{\\sqrt{33}-1}{2}\\right\\}$. Check: $x=-2$: $0+3 = 3$ ✓; $x=1$: $3+0 = 3$ ✓; $x = \\dfrac{\\sqrt{33}-1}{2}$: since $x^{2}+x = 8$, we get $x^{2}-4 = 4-x > 0$ and the sum is $(4-x)+(x-1) = 3$ ✓; the spurious $x=3$ gives $\\left|5\\right|+\\left|2\\right| = 7 \\neq 3$ ✗.",
          ),
        ],
      };
    },
  ),

  /* R2 · 9 — |x+3|−|x−1| = 2 → {0}; the x ≥ 1 branch is the constant 4 ≠ 2. */
  template(
    {
      id: "lin-autor2-09",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "abs-equations",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["absolute-value", "equations", "distance"],
      prerequisites: ["abs-equations"],
      source: {
        sourceId: "autor-recopilacion-2025",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "R2 · 9",
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$\\left\\{0\\right\\}$", "$\\left\\{0\\right\\}$"), correct: true },
        { id: "b", text: L("$\\left\\{0,\\ 4\\right\\}$", "$\\left\\{0,\\ 4\\right\\}$"), correct: false },
        { id: "c", text: L("$\\left\\{-4\\right\\}$", "$\\left\\{-4\\right\\}$"), correct: false },
        { id: "d", text: L("$\\varnothing$", "$\\varnothing$"), correct: false },
      ];
      return {
        skill: L(
          "Resta de distancias que vale 2",
          "A difference of distances equal to 2",
        ),
        statement: L(
          "Resuelve $\\left|x+3\\right|-\\left|x-1\\right| = 2$, $x \\in \\mathbb{R}$, y escoge el conjunto solución.",
          "Solve $\\left|x+3\\right|-\\left|x-1\\right| = 2$, $x \\in \\mathbb{R}$, and choose the solution set.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Cortes en $x=-3$ y $x=1$: la resta $\\left|x+3\\right|-\\left|x-1\\right|$ se comporta distinto en cada uno de los tres tramos.",
            "Breaks at $x=-3$ and $x=1$: the difference $\\left|x+3\\right|-\\left|x-1\\right|$ behaves differently in each of the three stretches.",
          ),
          L(
            "En los tramos exteriores la resta de distancias vale una constante: comprueba si esa constante puede ser $2$.",
            "In the outer stretches the difference of distances is a constant: check whether that constant can be $2$.",
          ),
          L(
            "Solo el tramo central deja una ecuación con $x$; su solución debe caer dentro del tramo.",
            "Only the middle stretch leaves an equation with $x$ in it; its solution must fall inside the stretch.",
          ),
        ],
        answerDisplay: L("$\\left\\{0\\right\\}$", "$\\left\\{0\\right\\}$"),
        solution: [
          step(
            "given",
            "$\\left|x+3\\right|-\\left|x-1\\right| = 2$, $x \\in \\mathbb{R}$.",
            "$\\left|x+3\\right|-\\left|x-1\\right| = 2$, $x \\in \\mathbb{R}$.",
          ),
          step(
            "approach",
            "Tres tramos según los cortes $-3$ y $1$; en cada uno la ecuación se vuelve lineal (o directamente imposible).",
            "Three stretches according to the breaks $-3$ and $1$; in each one the equation becomes linear (or outright impossible).",
          ),
          step(
            "calculation",
            "$x<-3$: $-(x+3)-(1-x) = -4 = 2$: imposible.<br>$-3 \\le x<1$: $(x+3)-(1-x) = 2x+2 = 2 \\Rightarrow x = 0$ ✓ (vive en el tramo).<br>$x \\ge 1$: $(x+3)-(x-1) = 4 \\neq 2$: imposible.",
            "$x<-3$: $-(x+3)-(1-x) = -4 = 2$: impossible.<br>$-3 \\le x<1$: $(x+3)-(1-x) = 2x+2 = 2 \\Rightarrow x = 0$ ✓ (it lives in the stretch).<br>$x \\ge 1$: $(x+3)-(x-1) = 4 \\neq 2$: impossible.",
          ),
          step(
            "result",
            "$S = \\left\\{0\\right\\}$. Verificación: $x=0$: $\\left|3\\right|-\\left|-1\\right| = 3-1 = 2$ ✓; el falso candidato $x=4$ (recuerdo del tramo $x \\ge 1$, donde la resta vale siempre $4$) da $\\left|7\\right|-\\left|3\\right| = 4 \\neq 2$ ✗.",
            "$S = \\left\\{0\\right\\}$. Check: $x=0$: $\\left|3\\right|-\\left|-1\\right| = 3-1 = 2$ ✓; the false candidate $x=4$ (a remnant of the stretch $x \\ge 1$, where the difference is always $4$) gives $\\left|7\\right|-\\left|3\\right| = 4 \\neq 2$ ✗.",
          ),
        ],
      };
    },
  ),

  /* R2 · 10 — |x²−1| = |x−2| → {(−1±√13)/2}; x²−x+1 = 0 has no real roots. */
  template(
    {
      id: "lin-autor2-10",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "abs-equations",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["absolute-value", "equations", "quadratic"],
      prerequisites: ["abs-equations"],
      source: {
        sourceId: "autor-recopilacion-2025",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "R2 · 10",
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "$\\left\\{\\dfrac{-1-\\sqrt{13}}{2},\\ \\dfrac{-1+\\sqrt{13}}{2}\\right\\}$",
            "$\\left\\{\\dfrac{-1-\\sqrt{13}}{2},\\ \\dfrac{-1+\\sqrt{13}}{2}\\right\\}$",
          ),
          correct: true,
        },
        {
          id: "b",
          text: L("No tiene solución real ($\\varnothing$)", "No real solution ($\\varnothing$)"),
          correct: false,
        },
        {
          id: "c",
          text: L(
            "$\\left\\{\\dfrac{1-\\sqrt{13}}{2},\\ \\dfrac{1+\\sqrt{13}}{2}\\right\\}$",
            "$\\left\\{\\dfrac{1-\\sqrt{13}}{2},\\ \\dfrac{1+\\sqrt{13}}{2}\\right\\}$",
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            "$\\left\\{\\dfrac{-1-\\sqrt{13}}{2}\\right\\}$",
            "$\\left\\{\\dfrac{-1-\\sqrt{13}}{2}\\right\\}$",
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Igualdad entre dos valores absolutos",
          "Equality between two absolute values",
        ),
        statement: L(
          "Resuelve $\\left|x^{2}-1\\right| = \\left|x-2\\right|$, $x \\in \\mathbb{R}$, y escoge el conjunto solución.",
          "Solve $\\left|x^{2}-1\\right| = \\left|x-2\\right|$, $x \\in \\mathbb{R}$, and choose the solution set.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "$\\left|A\\right| = \\left|B\\right|$ equivale a $A = B$ o $A = -B$: dos cuadráticas sin barras.",
            "$\\left|A\\right| = \\left|B\\right|$ is equivalent to $A = B$ or $A = -B$: two quadratics with no bars.",
          ),
          L(
            "Calcula el discriminante de cada cuadrática antes de resolver: una de ellas no tiene raíces reales.",
            "Compute each quadratic's discriminant before solving: one of them has no real roots.",
          ),
          L(
            "La cuadrática útil es $x^{2}+x-3 = 0$: aplica la fórmula general con $b=1$ y $c=-3$.",
            "The useful quadratic is $x^{2}+x-3 = 0$: apply the quadratic formula with $b=1$ and $c=-3$.",
          ),
        ],
        answerDisplay: L(
          "$\\left\\{\\dfrac{-1-\\sqrt{13}}{2},\\ \\dfrac{-1+\\sqrt{13}}{2}\\right\\}$",
          "$\\left\\{\\dfrac{-1-\\sqrt{13}}{2},\\ \\dfrac{-1+\\sqrt{13}}{2}\\right\\}$",
        ),
        solution: [
          step(
            "given",
            "$\\left|x^{2}-1\\right| = \\left|x-2\\right|$, $x \\in \\mathbb{R}$.",
            "$\\left|x^{2}-1\\right| = \\left|x-2\\right|$, $x \\in \\mathbb{R}$.",
          ),
          step(
            "approach",
            "Usar $\\left|A\\right| = \\left|B\\right| \\iff A = \\pm B$ y resolver las dos cuadráticas; no hace falta filtrar nada, porque $A = -B$ ya garantiza $\\left|A\\right| = \\left|B\\right|$.",
            "Use $\\left|A\\right| = \\left|B\\right| \\iff A = \\pm B$ and solve the two quadratics; no filtering is needed, because $A = -B$ already guarantees $\\left|A\\right| = \\left|B\\right|$.",
          ),
          step(
            "calculation",
            "$x^{2}-1 = x-2 \\Rightarrow x^{2}-x+1 = 0$, con $\\Delta = 1-4 = -3 < 0$: sin raíces reales.<br>$x^{2}-1 = -(x-2) \\Rightarrow x^{2}+x-3 = 0 \\Rightarrow x = \\dfrac{-1 \\pm \\sqrt{13}}{2}$: ambas raíces son reales y válidas.",
            "$x^{2}-1 = x-2 \\Rightarrow x^{2}-x+1 = 0$, with $\\Delta = 1-4 = -3 < 0$: no real roots.<br>$x^{2}-1 = -(x-2) \\Rightarrow x^{2}+x-3 = 0 \\Rightarrow x = \\dfrac{-1 \\pm \\sqrt{13}}{2}$: both roots are real and valid.",
          ),
          step(
            "result",
            "$S = \\left\\{\\dfrac{-1-\\sqrt{13}}{2},\\ \\dfrac{-1+\\sqrt{13}}{2}\\right\\}$. Verificación: ambas raíces cumplen $x^{2}+x = 3$, luego $x^{2}-1 = 2-x$ y $\\left|x^{2}-1\\right| = \\left|2-x\\right| = \\left|x-2\\right|$ ✓; y la rama $x^{2}-x+1 = 0$ no producía ninguna raíz real.",
            "$S = \\left\\{\\dfrac{-1-\\sqrt{13}}{2},\\ \\dfrac{-1+\\sqrt{13}}{2}\\right\\}$. Check: both roots satisfy $x^{2}+x = 3$, hence $x^{2}-1 = 2-x$ and $\\left|x^{2}-1\\right| = \\left|2-x\\right| = \\left|x-2\\right|$ ✓; and the branch $x^{2}-x+1 = 0$ produced no real root at all.",
          ),
        ],
      };
    },
  ),

  /* R2 · 11 — |(x−1)/(x+2)| ≤ 1 → [−1/2, ∞); −2 is a pole. */
  template(
    {
      id: "lin-autor2-11",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "abs-inequalities",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["absolute-value", "inequality", "rational"],
      prerequisites: ["abs-inequalities", "interval-notation"],
      source: {
        sourceId: "autor-recopilacion-2025",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "R2 · 11",
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "$\\left[-\\dfrac{1}{2},\\ +\\infty\\right)$",
            "$\\left[-\\dfrac{1}{2},\\ +\\infty\\right)$",
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            "$(-\\infty,\\ -2) \\cup \\left[-\\dfrac{1}{2},\\ +\\infty\\right)$",
            "$(-\\infty,\\ -2) \\cup \\left[-\\dfrac{1}{2},\\ +\\infty\\right)$",
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            "$\\left[-\\dfrac{1}{2},\\ 2\\right)$",
            "$\\left[-\\dfrac{1}{2},\\ 2\\right)$",
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            "$\\mathbb{R} \\setminus \\left\\{-2\\right\\}$",
            "$\\mathbb{R} \\setminus \\left\\{-2\\right\\}$",
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Valor absoluto de un cociente con polo",
          "Absolute value of a quotient with a pole",
        ),
        statement: L(
          "Resuelve $\\left|\\dfrac{x-1}{x+2}\\right| \\le 1$, $x \\in \\mathbb{R}$, y escoge el conjunto solución.",
          "Solve $\\left|\\dfrac{x-1}{x+2}\\right| \\le 1$, $x \\in \\mathbb{R}$, and choose the solution set.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El denominador solo puede anularse en $x = -2$: ese punto queda vetado desde el principio.",
            "The denominator can only vanish at $x = -2$: that point is banned from the start.",
          ),
          L(
            "Con $x \\neq -2$ puedes multiplicar por $\\left|x+2\\right| > 0$: la desigualdad se vuelve $\\left|x-1\\right| \\le \\left|x+2\\right|$.",
            "With $x \\neq -2$ you may multiply by $\\left|x+2\\right| > 0$: the inequality becomes $\\left|x-1\\right| \\le \\left|x+2\\right|$.",
          ),
          L(
            "Como ambos lados son no negativos, eleva al cuadrado: los $x^{2}$ se cancelan y queda una inecuación lineal.",
            "Since both sides are non-negative, square them: the $x^{2}$ terms cancel and a linear inequality remains.",
          ),
        ],
        answerDisplay: L(
          "$\\left[-\\dfrac{1}{2},\\ +\\infty\\right)$",
          "$\\left[-\\dfrac{1}{2},\\ +\\infty\\right)$",
        ),
        solution: [
          step(
            "given",
            "$\\left|\\dfrac{x-1}{x+2}\\right| \\le 1$, con $x \\neq -2$ (el denominador se anula ahí).",
            "$\\left|\\dfrac{x-1}{x+2}\\right| \\le 1$, with $x \\neq -2$ (the denominator vanishes there).",
          ),
          step(
            "approach",
            "Multiplicar por $\\left|x+2\\right| > 0$ y elevar al cuadrado (ambos lados no negativos) para obtener una inecuación lineal.",
            "Multiply by $\\left|x+2\\right| > 0$ and square (both sides non-negative) to obtain a linear inequality.",
          ),
          step(
            "calculation",
            "$\\left|x-1\\right| \\le \\left|x+2\\right| \\Rightarrow (x-1)^{2} \\le (x+2)^{2} \\Rightarrow x^{2}-2x+1 \\le x^{2}+4x+4 \\Rightarrow -6x \\le 3 \\Rightarrow x \\ge -\\dfrac{1}{2}$ (dividir entre $-6$ invierte).<br>El extremo $-\\dfrac{1}{2}$ no es el polo, así que el dominio no recorta nada más.",
            "$\\left|x-1\\right| \\le \\left|x+2\\right| \\Rightarrow (x-1)^{2} \\le (x+2)^{2} \\Rightarrow x^{2}-2x+1 \\le x^{2}+4x+4 \\Rightarrow -6x \\le 3 \\Rightarrow x \\ge -\\dfrac{1}{2}$ (dividing by $-6$ flips it).<br>The endpoint $-\\dfrac{1}{2}$ is not the pole, so the domain cuts out nothing else.",
          ),
          step(
            "result",
            "$S = \\left[-\\dfrac{1}{2},\\ +\\infty\\right)$. Verificación: $x = 0$ (dentro): $\\left|\\dfrac{-1}{2}\\right| = \\dfrac{1}{2} \\le 1$ ✓; $x = -\\dfrac{1}{2}$ (extremo): $\\dfrac{x-1}{x+2} = -1$ y $\\left|-1\\right| = 1 \\le 1$ ✓; $x = -1$ (fuera): $\\left|\\dfrac{-2}{1}\\right| = 2 \\not\\le 1$ ✗.",
            "$S = \\left[-\\dfrac{1}{2},\\ +\\infty\\right)$. Check: $x = 0$ (inside): $\\left|\\dfrac{-1}{2}\\right| = \\dfrac{1}{2} \\le 1$ ✓; $x = -\\dfrac{1}{2}$ (endpoint): $\\dfrac{x-1}{x+2} = -1$ and $\\left|-1\\right| = 1 \\le 1$ ✓; $x = -1$ (outside): $\\left|\\dfrac{-2}{1}\\right| = 2 \\not\\le 1$ ✗.",
          ),
        ],
      };
    },
  ),

  /* R2 · 12 — |x+1|−|2x−3| ≤ x → (−∞,1] ∪ [2,∞). */
  template(
    {
      id: "lin-autor2-12",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "abs-inequalities",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["absolute-value", "inequality", "case-analysis"],
      prerequisites: ["abs-inequalities", "compound"],
      source: {
        sourceId: "autor-recopilacion-2025",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "R2 · 12",
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "$(-\\infty,\\ 1] \\cup [2,\\ +\\infty)$",
            "$(-\\infty,\\ 1] \\cup [2,\\ +\\infty)$",
          ),
          correct: true,
        },
        { id: "b", text: L("$[2,\\ +\\infty)$", "$[2,\\ +\\infty)$"), correct: false },
        { id: "c", text: L("$(-\\infty,\\ 1]$", "$(-\\infty,\\ 1]$"), correct: false },
        { id: "d", text: L("$[1,\\ 2]$", "$[1,\\ 2]$"), correct: false },
      ];
      return {
        skill: L(
          "Tres tramos, una desigualdad en cada uno",
          "Three stretches, one inequality in each",
        ),
        statement: L(
          "Resuelve $\\left|x+1\\right|-\\left|2x-3\\right| \\le x$, $x \\in \\mathbb{R}$, y escoge el conjunto solución.",
          "Solve $\\left|x+1\\right|-\\left|2x-3\\right| \\le x$, $x \\in \\mathbb{R}$, and choose the solution set.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Los cortes están en $x=-1$ y $x=\\dfrac{3}{2}$: tres tramos con una desigualdad lineal en cada uno.",
            "The breaks are at $x=-1$ and $x=\\dfrac{3}{2}$: three stretches with a linear inequality in each.",
          ),
          L(
            "En cada tramo, sustituye cada barra por su contenido con el signo correcto y resuelve la inecuación lineal que queda.",
            "In each stretch, replace each bar by its content with the correct sign and solve the linear inequality that remains.",
          ),
          L(
            "El tramo izquierdo se acepta entero, el central se recorta y el derecho pide $x$ grande: al final, dos pedazos se pegan.",
            "The left stretch is accepted whole, the middle one gets trimmed and the right one demands large $x$: in the end, two pieces glue together.",
          ),
        ],
        answerDisplay: L(
          "$(-\\infty,\\ 1] \\cup [2,\\ +\\infty)$",
          "$(-\\infty,\\ 1] \\cup [2,\\ +\\infty)$",
        ),
        solution: [
          step(
            "given",
            "$\\left|x+1\\right|-\\left|2x-3\\right| \\le x$, $x \\in \\mathbb{R}$.",
            "$\\left|x+1\\right|-\\left|2x-3\\right| \\le x$, $x \\in \\mathbb{R}$.",
          ),
          step(
            "approach",
            "Cortes en $x=-1$ y $x=\\dfrac{3}{2}$: resolver la desigualdad tramo a tramo y unir los pedazos que sobrevivan.",
            "Breaks at $x=-1$ and $x=\\dfrac{3}{2}$: solve the inequality stretch by stretch and join the surviving pieces.",
          ),
          step(
            "calculation",
            "$x<-1$: $-(x+1)-(3-2x) = x-4 \\le x$ se cumple siempre → entra todo el tramo.<br>$-1 \\le x<\\dfrac{3}{2}$: $(x+1)-(3-2x) = 3x-2 \\le x \\Rightarrow x \\le 1$ → aporta $[-1,\\ 1]$.<br>$x \\ge \\dfrac{3}{2}$: $(x+1)-(2x-3) = 4-x \\le x \\Rightarrow x \\ge 2$ → aporta $[2,\\ +\\infty)$.",
            "$x<-1$: $-(x+1)-(3-2x) = x-4 \\le x$ always holds → the whole stretch enters.<br>$-1 \\le x<\\dfrac{3}{2}$: $(x+1)-(3-2x) = 3x-2 \\le x \\Rightarrow x \\le 1$ → contributes $[-1,\\ 1]$.<br>$x \\ge \\dfrac{3}{2}$: $(x+1)-(2x-3) = 4-x \\le x \\Rightarrow x \\ge 2$ → contributes $[2,\\ +\\infty)$.",
          ),
          step(
            "result",
            "$S = (-\\infty,\\ 1] \\cup [2,\\ +\\infty)$ (los dos primeros pedazos se pegan en $x=1$). Verificación: $x=0$ (dentro): $1-3 = -2 \\le 0$ ✓; $x=1$ (extremo): $2-1 = 1 \\le 1$ ✓; $x=\\dfrac{3}{2}$ (excluido): $\\dfrac{5}{2}-0 = \\dfrac{5}{2} \\not\\le \\dfrac{3}{2}$ ✗; $x=2$ (extremo): $3-1 = 2 \\le 2$ ✓.",
            "$S = (-\\infty,\\ 1] \\cup [2,\\ +\\infty)$ (the first two pieces glue at $x=1$). Check: $x=0$ (inside): $1-3 = -2 \\le 0$ ✓; $x=1$ (endpoint): $2-1 = 1 \\le 1$ ✓; $x=\\dfrac{3}{2}$ (excluded): $\\dfrac{5}{2}-0 = \\dfrac{5}{2} \\not\\le \\dfrac{3}{2}$ ✗; $x=2$ (endpoint): $3-1 = 2 \\le 2$ ✓.",
          ),
        ],
      };
    },
  ),

  /* R2 · 13 — |x²−4| < 3 → (−√7,−1) ∪ (1,√7). */
  template(
    {
      id: "lin-autor2-13",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "abs-inequalities",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 180,
      tags: ["absolute-value", "inequality", "quadratic"],
      prerequisites: ["abs-inequalities", "interval-notation"],
      source: {
        sourceId: "autor-recopilacion-2025",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "R2 · 13",
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "$(-\\sqrt{7},\\ -1) \\cup (1,\\ \\sqrt{7})$",
            "$(-\\sqrt{7},\\ -1) \\cup (1,\\ \\sqrt{7})$",
          ),
          correct: true,
        },
        {
          id: "b",
          text: L("$(-\\sqrt{7},\\ \\sqrt{7})$", "$(-\\sqrt{7},\\ \\sqrt{7})$"),
          correct: false,
        },
        {
          id: "c",
          text: L(
            "$\\left[-\\sqrt{7},\\ -1\\right] \\cup \\left[1,\\ \\sqrt{7}\\right]$",
            "$\\left[-\\sqrt{7},\\ -1\\right] \\cup \\left[1,\\ \\sqrt{7}\\right]$",
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            "$(-\\infty,\\ -\\sqrt{7}) \\cup (\\sqrt{7},\\ +\\infty)$",
            "$(-\\infty,\\ -\\sqrt{7}) \\cup (\\sqrt{7},\\ +\\infty)$",
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "La definición doble de |A| < c con una cuadrática",
          "The double definition of |A| < c with a quadratic",
        ),
        statement: L(
          "Resuelve $\\left|x^{2}-4\\right| < 3$, $x \\in \\mathbb{R}$, y escoge el conjunto solución.",
          "Solve $\\left|x^{2}-4\\right| < 3$, $x \\in \\mathbb{R}$, and choose the solution set.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Desempaca la definición: $\\left|A\\right| < c$ equivale a la doble desigualdad $-c < A < c$.",
            "Unpack the definition: $\\left|A\\right| < c$ is equivalent to the double inequality $-c < A < c$.",
          ),
          L(
            "Suma $4$ en los tres miembros: queda $1 < x^{2} < 7$, dos condiciones sobre $x^{2}$ a la vez.",
            "Add $4$ across all three parts: you get $1 < x^{2} < 7$, two conditions on $x^{2}$ at once.",
          ),
          L(
            "$x^{2} > 1$ abre un hueco central entre $-1$ y $1$; $x^{2} < 7$ pone los extremos $\\pm\\sqrt{7}$, ambos abiertos.",
            "$x^{2} > 1$ opens a central gap between $-1$ and $1$; $x^{2} < 7$ sets the ends $\\pm\\sqrt{7}$, both open.",
          ),
        ],
        answerDisplay: L(
          "$(-\\sqrt{7},\\ -1) \\cup (1,\\ \\sqrt{7})$",
          "$(-\\sqrt{7},\\ -1) \\cup (1,\\ \\sqrt{7})$",
        ),
        solution: [
          step(
            "given",
            "$\\left|x^{2}-4\\right| < 3$, $x \\in \\mathbb{R}$.",
            "$\\left|x^{2}-4\\right| < 3$, $x \\in \\mathbb{R}$.",
          ),
          step(
            "approach",
            "Desempacar la definición $\\left|A\\right| < c \\iff -c < A < c$ y traducir cada tramo a condiciones sobre $x^{2}$.",
            "Unpack the definition $\\left|A\\right| < c \\iff -c < A < c$ and translate each part into conditions on $x^{2}$.",
          ),
          step(
            "calculation",
            "$-3 < x^{2}-4 < 3 \\Rightarrow 1 < x^{2} < 7$, es decir $x^{2} > 1$ y $x^{2} < 7$ a la vez.<br>$x^{2} > 1 \\iff x<-1$ o $x>1$; $x^{2} < 7 \\iff -\\sqrt{7} < x < \\sqrt{7}$.<br>Intersección de ambas: $(-\\sqrt{7},\\ -1) \\cup (1,\\ \\sqrt{7})$.",
            "$-3 < x^{2}-4 < 3 \\Rightarrow 1 < x^{2} < 7$, i.e. $x^{2} > 1$ and $x^{2} < 7$ at once.<br>$x^{2} > 1 \\iff x<-1$ or $x>1$; $x^{2} < 7 \\iff -\\sqrt{7} < x < \\sqrt{7}$.<br>Intersection of both: $(-\\sqrt{7},\\ -1) \\cup (1,\\ \\sqrt{7})$.",
          ),
          step(
            "result",
            "$S = (-\\sqrt{7},\\ -1) \\cup (1,\\ \\sqrt{7})$. Verificación: $x=2$ (dentro): $\\left|4-4\\right| = 0 < 3$ ✓; $x=0$ (excluido): $\\left|0-4\\right| = 4 \\not< 3$ ✗; $x=\\sqrt{7}$ (extremo abierto): $\\left|7-4\\right| = 3 \\not< 3$ ✗.",
            "$S = (-\\sqrt{7},\\ -1) \\cup (1,\\ \\sqrt{7})$. Check: $x=2$ (inside): $\\left|4-4\\right| = 0 < 3$ ✓; $x=0$ (excluded): $\\left|0-4\\right| = 4 \\not< 3$ ✗; $x=\\sqrt{7}$ (open endpoint): $\\left|7-4\\right| = 3 \\not< 3$ ✗.",
          ),
        ],
      };
    },
  ),

  /* R2 · 14 — |x−1|+|x+2| ≤ 5 → [−3, 2]. */
  template(
    {
      id: "lin-autor2-14",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "abs-inequalities",
      difficulty: "medium",
      questionType: "text",
      estimatedTimeSec: 150,
      tags: ["absolute-value", "inequality", "interval"],
      prerequisites: ["abs-inequalities", "interval-notation"],
      source: {
        sourceId: "autor-recopilacion-2025",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "R2 · 14",
      },
      reasoning: "case-analysis",
    },
    () => ({
      skill: L("Suma de distancias acotada por 5", "A sum of distances bounded by 5"),
      statement: L(
        "Resuelve $\\left|x-1\\right|+\\left|x+2\\right| \\le 5$ (responde como intervalo; admite [-3, 2] o -3<=x<=2).",
        "Solve $\\left|x-1\\right|+\\left|x+2\\right| \\le 5$ (answer as an interval; both [-3, 2] and -3<=x<=2 are accepted).",
      ),
      answer: {
        kind: "text",
        accepted: ["[-3, 2]", "[-3,2]", "-3<=x<=2", "-3 <= x <= 2", "-3≤x≤2", "-3 ≤ x ≤ 2"],
      },
      hints: [
        L(
          "Piensa en distancias: $\\left|x-1\\right|+\\left|x+2\\right|$ suma las distancias de $x$ a $1$ y a $-2$; entre ambos puntos vale exactamente $3$.",
          "Think distances: $\\left|x-1\\right|+\\left|x+2\\right|$ adds the distances from $x$ to $1$ and to $-2$; between the two points it is exactly $3$.",
        ),
        L(
          "Fuera del intervalo entre los cortes la suma crece linealmente: resuelve la inecuación en los dos tramos laterales.",
          "Outside the interval between the breaks the sum grows linearly: solve the inequality in the two side stretches.",
        ),
        L(
          "Los tramos laterales aportan un pedazo cada uno y el tramo central entra completo: no olvides unirlos todos.",
          "The side stretches contribute one piece each and the middle stretch enters whole: do not forget to join them all.",
        ),
      ],
      answerDisplay: L("$[-3,\\ 2]$", "$[-3,\\ 2]$"),
      solution: [
        step(
          "given",
          "$\\left|x-1\\right|+\\left|x+2\\right| \\le 5$, $x \\in \\mathbb{R}$.",
          "$\\left|x-1\\right|+\\left|x+2\\right| \\le 5$, $x \\in \\mathbb{R}$.",
        ),
        step(
          "approach",
          "Cortes en $-2$ y $1$: en cada tramo las barras se retiran con el signo correcto y queda una inecuación lineal.",
          "Breaks at $-2$ and $1$: in each stretch the bars are removed with the correct sign and a linear inequality remains.",
        ),
        step(
          "calculation",
          "$x<-2$: $(1-x)+(-x-2) = -2x-1 \\le 5 \\Rightarrow x \\ge -3$ → aporta $[-3,\\ -2)$.<br>$-2 \\le x \\le 1$: $(1-x)+(x+2) = 3 \\le 5$ siempre → entra todo el tramo.<br>$x>1$: $(x-1)+(x+2) = 2x+1 \\le 5 \\Rightarrow x \\le 2$ → aporta $(1,\\ 2]$.",
          "$x<-2$: $(1-x)+(-x-2) = -2x-1 \\le 5 \\Rightarrow x \\ge -3$ → contributes $[-3,\\ -2)$.<br>$-2 \\le x \\le 1$: $(1-x)+(x+2) = 3 \\le 5$ always → the whole stretch enters.<br>$x>1$: $(x-1)+(x+2) = 2x+1 \\le 5 \\Rightarrow x \\le 2$ → contributes $(1,\\ 2]$.",
        ),
        step(
          "result",
          "$S = [-3,\\ 2]$. Verificación: $x=0$ (dentro): $1+2 = 3 \\le 5$ ✓; $x=-3$ y $x=2$ (extremos): $4+1 = 5 \\le 5$ y $1+4 = 5 \\le 5$ ✓; $x = \\dfrac{5}{2}$ (fuera): $\\dfrac{3}{2}+\\dfrac{9}{2} = 6 \\not\\le 5$ ✗.",
          "$S = [-3,\\ 2]$. Check: $x=0$ (inside): $1+2 = 3 \\le 5$ ✓; $x=-3$ and $x=2$ (endpoints): $4+1 = 5 \\le 5$ and $1+4 = 5 \\le 5$ ✓; $x = \\dfrac{5}{2}$ (outside): $\\dfrac{3}{2}+\\dfrac{9}{2} = 6 \\not\\le 5$ ✗.",
        ),
      ],
    }),
  ),

  /* R2 · 15 — |x−1|·|x+2| ≥ 2 → (−∞,(−1−√17)/2] ∪ [−1,0] ∪ [(−1+√17)/2,∞). */
  template(
    {
      id: "lin-autor2-15",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "abs-inequalities",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["absolute-value", "inequality", "quadratic", "factorization"],
      prerequisites: ["abs-inequalities", "compound"],
      source: {
        sourceId: "autor-recopilacion-2025",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "R2 · 15",
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "$\\left(-\\infty,\\ \\dfrac{-1-\\sqrt{17}}{2}\\right] \\cup [-1,\\ 0] \\cup \\left[\\dfrac{-1+\\sqrt{17}}{2},\\ +\\infty\\right)$",
            "$\\left(-\\infty,\\ \\dfrac{-1-\\sqrt{17}}{2}\\right] \\cup [-1,\\ 0] \\cup \\left[\\dfrac{-1+\\sqrt{17}}{2},\\ +\\infty\\right)$",
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            "$\\left(-\\infty,\\ \\dfrac{-1-\\sqrt{17}}{2}\\right] \\cup \\left[\\dfrac{-1+\\sqrt{17}}{2},\\ +\\infty\\right)$",
            "$\\left(-\\infty,\\ \\dfrac{-1-\\sqrt{17}}{2}\\right] \\cup \\left[\\dfrac{-1+\\sqrt{17}}{2},\\ +\\infty\\right)$",
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            "$\\left[\\dfrac{-1-\\sqrt{17}}{2},\\ \\dfrac{-1+\\sqrt{17}}{2}\\right]$",
            "$\\left[\\dfrac{-1-\\sqrt{17}}{2},\\ \\dfrac{-1+\\sqrt{17}}{2}\\right]$",
          ),
          correct: false,
        },
        { id: "d", text: L("$\\mathbb{R}$", "$\\mathbb{R}$"), correct: false },
      ];
      return {
        skill: L(
          "Producto de barras que es la barra de un producto",
          "A product of bars is the bar of a product",
        ),
        statement: L(
          "Resuelve $\\left|x-1\\right| \\cdot \\left|x+2\\right| \\ge 2$, $x \\in \\mathbb{R}$, y escoge el conjunto solución.",
          "Solve $\\left|x-1\\right| \\cdot \\left|x+2\\right| \\ge 2$, $x \\in \\mathbb{R}$, and choose the solution set.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El producto de barras es la barra del producto: $\\left|x-1\\right| \\cdot \\left|x+2\\right| = \\left|(x-1)(x+2)\\right|$.",
            "A product of bars is the bar of the product: $\\left|x-1\\right| \\cdot \\left|x+2\\right| = \\left|(x-1)(x+2)\\right|$.",
          ),
          L(
            "$\\left|A\\right| \\ge 2$ equivale a $A \\ge 2$ o $A \\le -2$: una cuadrática general y otra que se reduce a la vista.",
            "$\\left|A\\right| \\ge 2$ is equivalent to $A \\ge 2$ or $A \\le -2$: one general quadratic and another one that simplifies on sight.",
          ),
          L(
            "La rama $x^{2}+x-2 \\le -2$ se reduce a $x(x+1) \\le 0$ y aporta un pedazo **acotado**; la otra rama da los dos rayos con $\\sqrt{17}$.",
            "The branch $x^{2}+x-2 \\le -2$ reduces to $x(x+1) \\le 0$ and contributes a **bounded** piece; the other branch gives the two rays with $\\sqrt{17}$.",
          ),
        ],
        answerDisplay: L(
          "$\\left(-\\infty,\\ \\dfrac{-1-\\sqrt{17}}{2}\\right] \\cup [-1,\\ 0] \\cup \\left[\\dfrac{-1+\\sqrt{17}}{2},\\ +\\infty\\right)$",
          "$\\left(-\\infty,\\ \\dfrac{-1-\\sqrt{17}}{2}\\right] \\cup [-1,\\ 0] \\cup \\left[\\dfrac{-1+\\sqrt{17}}{2},\\ +\\infty\\right)$",
        ),
        solution: [
          step(
            "given",
            "$\\left|x-1\\right| \\cdot \\left|x+2\\right| \\ge 2$, $x \\in \\mathbb{R}$.",
            "$\\left|x-1\\right| \\cdot \\left|x+2\\right| \\ge 2$, $x \\in \\mathbb{R}$.",
          ),
          step(
            "approach",
            "Convertir el producto en $\\left|x^{2}+x-2\\right|$ y separar $\\left|A\\right| \\ge 2 \\iff A \\ge 2 \\vee A \\le -2$.",
            "Turn the product into $\\left|x^{2}+x-2\\right|$ and split $\\left|A\\right| \\ge 2 \\iff A \\ge 2 \\vee A \\le -2$.",
          ),
          step(
            "calculation",
            "Rama 1: $x^{2}+x-2 \\ge 2 \\Rightarrow x^{2}+x-4 \\ge 0 \\Rightarrow x \\le \\dfrac{-1-\\sqrt{17}}{2}$ o $x \\ge \\dfrac{-1+\\sqrt{17}}{2}$.<br>Rama 2: $x^{2}+x-2 \\le -2 \\Rightarrow x^{2}+x \\le 0 \\Rightarrow -1 \\le x \\le 0$.<br>Unión de las dos ramas: $\\left(-\\infty,\\ \\dfrac{-1-\\sqrt{17}}{2}\\right] \\cup [-1,\\ 0] \\cup \\left[\\dfrac{-1+\\sqrt{17}}{2},\\ +\\infty\\right)$.",
            "Branch 1: $x^{2}+x-2 \\ge 2 \\Rightarrow x^{2}+x-4 \\ge 0 \\Rightarrow x \\le \\dfrac{-1-\\sqrt{17}}{2}$ or $x \\ge \\dfrac{-1+\\sqrt{17}}{2}$.<br>Branch 2: $x^{2}+x-2 \\le -2 \\Rightarrow x^{2}+x \\le 0 \\Rightarrow -1 \\le x \\le 0$.<br>Union of both branches: $\\left(-\\infty,\\ \\dfrac{-1-\\sqrt{17}}{2}\\right] \\cup [-1,\\ 0] \\cup \\left[\\dfrac{-1+\\sqrt{17}}{2},\\ +\\infty\\right)$.",
          ),
          step(
            "result",
            "$S = \\left(-\\infty,\\ \\dfrac{-1-\\sqrt{17}}{2}\\right] \\cup [-1,\\ 0] \\cup \\left[\\dfrac{-1+\\sqrt{17}}{2},\\ +\\infty\\right)$. Verificación: $x=0$ (extremo del pedazo central): $\\left|-1\\right| \\cdot \\left|2\\right| = 2 \\ge 2$ ✓; $x=1$ (hueco): $\\left|0\\right| \\cdot \\left|3\\right| = 0 \\not\\ge 2$ ✗; $x=-3$ (rayo izquierdo): $\\left|-4\\right| \\cdot \\left|-1\\right| = 4 \\ge 2$ ✓.",
            "$S = \\left(-\\infty,\\ \\dfrac{-1-\\sqrt{17}}{2}\\right] \\cup [-1,\\ 0] \\cup \\left[\\dfrac{-1+\\sqrt{17}}{2},\\ +\\infty\\right)$. Check: $x=0$ (endpoint of the middle piece): $\\left|-1\\right| \\cdot \\left|2\\right| = 2 \\ge 2$ ✓; $x=1$ (gap): $\\left|0\\right| \\cdot \\left|3\\right| = 0 \\not\\ge 2$ ✗; $x=-3$ (left ray): $\\left|-4\\right| \\cdot \\left|-1\\right| = 4 \\ge 2$ ✓.",
          ),
        ],
      };
    },
  ),

  /* R2 · 16 — (|x|−1)/(x²−3x+2) < 0 → (−1,1) ∪ (1,2); x = 1 is a pole. */
  template(
    {
      id: "lin-autor2-16",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "abs-inequalities",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["absolute-value", "inequality", "sign-table"],
      prerequisites: ["abs-inequalities", "compound"],
      source: {
        sourceId: "autor-recopilacion-2025",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "R2 · 16",
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L("$(-1,\\ 1) \\cup (1,\\ 2)$", "$(-1,\\ 1) \\cup (1,\\ 2)$"),
          correct: true,
        },
        { id: "b", text: L("$(-1,\\ 2)$", "$(-1,\\ 2)$"), correct: false },
        { id: "c", text: L("$(1,\\ 2)$", "$(1,\\ 2)$"), correct: false },
        {
          id: "d",
          text: L("$(-\\infty,\\ -1) \\cup (1,\\ 2)$", "$(-\\infty,\\ -1) \\cup (1,\\ 2)$"),
          correct: false,
        },
      ];
      return {
        skill: L("Tabla de signos con |x| en el numerador", "A sign table with |x| in the numerator"),
        statement: L(
          "Resuelve $\\dfrac{|x|-1}{x^{2}-3x+2} < 0$, $x \\in \\mathbb{R}$, y escoge el conjunto solución.",
          "Solve $\\dfrac{|x|-1}{x^{2}-3x+2} < 0$, $x \\in \\mathbb{R}$, and choose the solution set.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Factoriza el denominador: $x^{2}-3x+2 = (x-1)(x-2)$; sus ceros están vetados.",
            "Factor the denominator: $x^{2}-3x+2 = (x-1)(x-2)$; its zeros are banned.",
          ),
          L(
            "El numerador $|x|-1$ se anula en $x=\\pm 1$ y es positivo fuera de ahí: haz la tabla de signos con fronteras $-1$, $1$ y $2$.",
            "The numerator $|x|-1$ vanishes at $x=\\pm 1$ and is positive outside: draw the sign table with boundaries $-1$, $1$ and $2$.",
          ),
          L(
            "El cociente es negativo cuando los signos se oponen; ojo: $x=1$ anula el numerador, pero también el denominador — el polo manda.",
            "The quotient is negative when the signs oppose; watch out: $x=1$ kills the numerator, but the denominator too — the pole wins.",
          ),
        ],
        answerDisplay: L("$(-1,\\ 1) \\cup (1,\\ 2)$", "$(-1,\\ 1) \\cup (1,\\ 2)$"),
        solution: [
          step(
            "given",
            "$\\dfrac{|x|-1}{x^{2}-3x+2} < 0$, con $x \\neq 1$ y $x \\neq 2$ (ceros del denominador).",
            "$\\dfrac{|x|-1}{x^{2}-3x+2} < 0$, with $x \\neq 1$ and $x \\neq 2$ (zeros of the denominator).",
          ),
          step(
            "approach",
            "Tabla de signos: numerador $|x|-1$ (cero en $\\pm 1$) contra denominador $(x-1)(x-2)$.",
            "Sign table: numerator $|x|-1$ (zero at $\\pm 1$) against denominator $(x-1)(x-2)$.",
          ),
          step(
            "calculation",
            "Numerador: $|x|-1 > 0$ si $x<-1$ o $x>1$; $= 0$ en $x=\\pm 1$; $< 0$ en $(-1,\\ 1)$.<br>Denominador: $> 0$ en $(-\\infty,\\ 1) \\cup (2,\\ +\\infty)$; $< 0$ en $(1,\\ 2)$.<br>Cociente negativo con signos opuestos: $(-1,\\ 1)$ (numerador $-$, denominador $+$) y $(1,\\ 2)$ (numerador $+$, denominador $-$). El punto $x=-1$ anula el numerador y $x=1$, $x=2$ son polos.",
            "Numerator: $|x|-1 > 0$ if $x<-1$ or $x>1$; $= 0$ at $x=\\pm 1$; $< 0$ on $(-1,\\ 1)$.<br>Denominator: $> 0$ on $(-\\infty,\\ 1) \\cup (2,\\ +\\infty)$; $< 0$ on $(1,\\ 2)$.<br>Negative quotient with opposite signs: $(-1,\\ 1)$ (numerator $-$, denominator $+$) and $(1,\\ 2)$ (numerator $+$, denominator $-$). The point $x=-1$ makes the numerator zero, and $x=1$, $x=2$ are poles.",
          ),
          step(
            "result",
            "$S = (-1,\\ 1) \\cup (1,\\ 2)$. Verificación: $x=0$ (dentro): $\\dfrac{0-1}{2} = -\\dfrac{1}{2} < 0$ ✓; $x=\\dfrac{3}{2}$ (dentro): numerador $\\dfrac{1}{2}$, denominador $-\\dfrac{1}{4}$, cociente $-2 < 0$ ✓; $x=3$ (fuera): $\\dfrac{2}{2} = 1 \\not< 0$ ✗; $x=-2$ (fuera): $\\dfrac{1}{12} > 0$ ✗.",
            "$S = (-1,\\ 1) \\cup (1,\\ 2)$. Check: $x=0$ (inside): $\\dfrac{0-1}{2} = -\\dfrac{1}{2} < 0$ ✓; $x=\\dfrac{3}{2}$ (inside): numerator $\\dfrac{1}{2}$, denominator $-\\dfrac{1}{4}$, quotient $-2 < 0$ ✓; $x=3$ (outside): $\\dfrac{2}{2} = 1 \\not< 0$ ✗; $x=-2$ (outside): $\\dfrac{1}{12} > 0$ ✗.",
          ),
        ],
      };
    },
  ),

  /* R2 · 17 — (|x+2|−3)/(x²−1) ≥ 0 → (−∞,−5] ∪ (−1,1) ∪ (1,∞); −5 in, ±1 poles. */
  template(
    {
      id: "lin-autor2-17",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "abs-inequalities",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["absolute-value", "inequality", "sign-table", "rational"],
      prerequisites: ["abs-inequalities", "compound"],
      source: {
        sourceId: "autor-recopilacion-2025",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "R2 · 17",
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "$(-\\infty,\\ -5] \\cup (-1,\\ 1) \\cup (1,\\ +\\infty)$",
            "$(-\\infty,\\ -5] \\cup (-1,\\ 1) \\cup (1,\\ +\\infty)$",
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            "$(-\\infty,\\ -5] \\cup [-1,\\ 1) \\cup (1,\\ +\\infty)$",
            "$(-\\infty,\\ -5] \\cup [-1,\\ 1) \\cup (1,\\ +\\infty)$",
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            "$(-\\infty,\\ -5] \\cup (1,\\ +\\infty)$",
            "$(-\\infty,\\ -5] \\cup (1,\\ +\\infty)$",
          ),
          correct: false,
        },
        { id: "d", text: L("$[-5,\\ +\\infty)$", "$[-5,\\ +\\infty)$"), correct: false },
      ];
      return {
        skill: L(
          "Cociente no negativo con numerador de valor absoluto",
          "A non-negative quotient with an absolute-value numerator",
        ),
        statement: L(
          "Resuelve $\\dfrac{|x+2|-3}{x^{2}-1} \\ge 0$, $x \\in \\mathbb{R}$, y escoge el conjunto solución.",
          "Solve $\\dfrac{|x+2|-3}{x^{2}-1} \\ge 0$, $x \\in \\mathbb{R}$, and choose the solution set.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Numerador: $|x+2|-3 = 0$ equivale a $|x+2| = 3$; denominador: $x^{2}-1 = (x-1)(x+1)$.",
            "Numerator: $|x+2|-3 = 0$ is equivalent to $|x+2| = 3$; denominator: $x^{2}-1 = (x-1)(x+1)$.",
          ),
          L(
            "El cociente debe ser $\\ge 0$: signos iguales o numerador nulo (con el denominador vivo).",
            "The quotient must be $\\ge 0$: equal signs or a zero numerator (with the denominator alive).",
          ),
          L(
            "El punto que anula el numerador por la izquierda entra (cociente $0$), pero el que repite en el denominador no existe: es polo a la vez que cero.",
            "The point that zeros the numerator on the left enters (quotient $0$), but the one repeated in the denominator does not exist: it is a pole and a zero at once.",
          ),
        ],
        answerDisplay: L(
          "$(-\\infty,\\ -5] \\cup (-1,\\ 1) \\cup (1,\\ +\\infty)$",
          "$(-\\infty,\\ -5] \\cup (-1,\\ 1) \\cup (1,\\ +\\infty)$",
        ),
        solution: [
          step(
            "given",
            "$\\dfrac{|x+2|-3}{x^{2}-1} \\ge 0$, con $x \\neq \\pm 1$ (ceros del denominador).",
            "$\\dfrac{|x+2|-3}{x^{2}-1} \\ge 0$, with $x \\neq \\pm 1$ (zeros of the denominator).",
          ),
          step(
            "approach",
            "Ceros y signos del numerador ($|x+2| = 3$) y del denominador; el cociente es $\\ge 0$ con signos iguales o numerador $0$.",
            "Zeros and signs of the numerator ($|x+2| = 3$) and of the denominator; the quotient is $\\ge 0$ with equal signs or a $0$ numerator.",
          ),
          step(
            "calculation",
            "Numerador: $|x+2|-3 = 0 \\iff x = -5$ o $x = 1$; $> 0$ en $(-\\infty,\\ -5) \\cup (1,\\ +\\infty)$; $< 0$ en $(-5,\\ 1)$.<br>Denominador: $> 0$ en $(-\\infty,\\ -1) \\cup (1,\\ +\\infty)$; $< 0$ en $(-1,\\ 1)$.<br>Signos iguales: $(-\\infty,\\ -5)$, $(-1,\\ 1)$ y $(1,\\ +\\infty)$. En $x = -5$ el cociente vale $0$ ✓ entra; $x = 1$ anula numerador y denominador → polo ✗; $x = -1$ es polo ✗.",
            "Numerator: $|x+2|-3 = 0 \\iff x = -5$ or $x = 1$; $> 0$ on $(-\\infty,\\ -5) \\cup (1,\\ +\\infty)$; $< 0$ on $(-5,\\ 1)$.<br>Denominator: $> 0$ on $(-\\infty,\\ -1) \\cup (1,\\ +\\infty)$; $< 0$ on $(-1,\\ 1)$.<br>Equal signs: $(-\\infty,\\ -5)$, $(-1,\\ 1)$ and $(1,\\ +\\infty)$. At $x = -5$ the quotient is $0$ ✓ it enters; $x = 1$ zeros numerator and denominator → pole ✗; $x = -1$ is a pole ✗.",
          ),
          step(
            "result",
            "$S = (-\\infty,\\ -5] \\cup (-1,\\ 1) \\cup (1,\\ +\\infty)$. Verificación: $x=-5$ (extremo): $\\dfrac{0}{24} = 0 \\ge 0$ ✓; $x=0$ (dentro): $\\dfrac{2-3}{-1} = 1 \\ge 0$ ✓; $x=-2$ (excluido): $\\dfrac{0-3}{3} = -1 \\not\\ge 0$ ✗; $x=2$ (rayo derecho): $\\dfrac{4-3}{3} = \\dfrac{1}{3} \\ge 0$ ✓.",
            "$S = (-\\infty,\\ -5] \\cup (-1,\\ 1) \\cup (1,\\ +\\infty)$. Check: $x=-5$ (endpoint): $\\dfrac{0}{24} = 0 \\ge 0$ ✓; $x=0$ (inside): $\\dfrac{2-3}{-1} = 1 \\ge 0$ ✓; $x=-2$ (excluded): $\\dfrac{0-3}{3} = -1 \\not\\ge 0$ ✗; $x=2$ (right ray): $\\dfrac{4-3}{3} = \\dfrac{1}{3} \\ge 0$ ✓.",
          ),
        ],
      };
    },
  ),

  /* R2 · 18 — |2x−1| < |x+4| → (−1, 5). */
  template(
    {
      id: "lin-autor2-18",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "abs-inequalities",
      difficulty: "medium",
      questionType: "text",
      estimatedTimeSec: 150,
      tags: ["absolute-value", "inequality", "quadratic"],
      prerequisites: ["abs-inequalities", "interval-notation"],
      source: {
        sourceId: "autor-recopilacion-2025",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "R2 · 18",
      },
      reasoning: "case-analysis",
    },
    () => ({
      skill: L("Comparar dos barras elevando al cuadrado", "Comparing two bars by squaring"),
      statement: L(
        "Resuelve $\\left|2x-1\\right| < \\left|x+4\\right|$ (responde como intervalo; admite (-1, 5) o -1<x<5).",
        "Solve $\\left|2x-1\\right| < \\left|x+4\\right|$ (answer as an interval; both (-1, 5) and -1<x<5 are accepted).",
      ),
      answer: {
        kind: "text",
        accepted: ["(-1, 5)", "(-1,5)", "-1<x<5", "-1 < x < 5"],
      },
      hints: [
        L(
          "Ambos lados son no negativos: elevar al cuadrado conserva la desigualdad.",
          "Both sides are non-negative: squaring preserves the inequality.",
        ),
        L(
          "Tras elevar y ordenar queda $3x^{2}-12x-15 < 0$: divide entre $3$ y factoriza.",
          "After squaring and tidying up you get $3x^{2}-12x-15 < 0$: divide by $3$ and factor.",
        ),
        L(
          "Los factores dan las fronteras; con la parábola hacia arriba y un $< 0$, la solución es el tramo **entre** ellas.",
          "The factors give the boundaries; with the parabola opening upwards and a $< 0$, the solution is the stretch **between** them.",
        ),
      ],
      answerDisplay: L("$(-1,\\ 5)$", "$(-1,\\ 5)$"),
      solution: [
        step(
          "given",
          "$\\left|2x-1\\right| < \\left|x+4\\right|$, $x \\in \\mathbb{R}$.",
          "$\\left|2x-1\\right| < \\left|x+4\\right|$, $x \\in \\mathbb{R}$.",
        ),
        step(
          "approach",
          "Elevar al cuadrado (válido: ambos lados son no negativos) y resolver la cuadrática estricta que queda.",
          "Square (valid: both sides are non-negative) and solve the strict quadratic that remains.",
        ),
        step(
          "calculation",
          "$(2x-1)^{2} < (x+4)^{2} \\Rightarrow 4x^{2}-4x+1 < x^{2}+8x+16 \\Rightarrow 3x^{2}-12x-15 < 0 \\Rightarrow x^{2}-4x-5 < 0$.<br>$x^{2}-4x-5 = (x-5)(x+1) < 0 \\iff -1 < x < 5$.",
          "$(2x-1)^{2} < (x+4)^{2} \\Rightarrow 4x^{2}-4x+1 < x^{2}+8x+16 \\Rightarrow 3x^{2}-12x-15 < 0 \\Rightarrow x^{2}-4x-5 < 0$.<br>$x^{2}-4x-5 = (x-5)(x+1) < 0 \\iff -1 < x < 5$.",
        ),
        step(
          "result",
          "$S = (-1,\\ 5)$. Verificación: $x=0$ (dentro): $\\left|2\\cdot0-1\\right| = 1 < \\left|0+4\\right| = 4$ ✓; $x=5$ (extremo abierto): $\\left|9\\right| = 9 \\not< \\left|9\\right|$ ✗; $x=6$ (fuera): $\\left|11\\right| = 11 \\not< \\left|10\\right|$ ✗.",
          "$S = (-1,\\ 5)$. Check: $x=0$ (inside): $\\left|2\\cdot0-1\\right| = 1 < \\left|0+4\\right| = 4$ ✓; $x=5$ (open endpoint): $\\left|9\\right| = 9 \\not< \\left|9\\right|$ ✗; $x=6$ (outside): $\\left|11\\right| = 11 \\not< \\left|10\\right|$ ✗.",
        ),
      ],
    }),
  ),

  /* R2 · 19 — |x−1|+|x−2| > 3 → (−∞,0) ∪ (3,∞). */
  template(
    {
      id: "lin-autor2-19",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "abs-inequalities",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 180,
      tags: ["absolute-value", "inequality", "distance"],
      prerequisites: ["abs-inequalities", "interval-notation"],
      source: {
        sourceId: "autor-recopilacion-2025",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "R2 · 19",
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "$(-\\infty,\\ 0) \\cup (3,\\ +\\infty)$",
            "$(-\\infty,\\ 0) \\cup (3,\\ +\\infty)$",
          ),
          correct: true,
        },
        { id: "b", text: L("$(0,\\ 3)$", "$(0,\\ 3)$"), correct: false },
        {
          id: "c",
          text: L(
            "$\\left(-\\infty,\\ 0\\right] \\cup \\left[3,\\ +\\infty\\right)$",
            "$\\left(-\\infty,\\ 0\\right] \\cup \\left[3,\\ +\\infty\\right)$",
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            "$(-\\infty,\\ -3) \\cup (0,\\ +\\infty)$",
            "$(-\\infty,\\ -3) \\cup (0,\\ +\\infty)$",
          ),
          correct: false,
        },
      ];
      return {
        skill: L("Suma de distancias mayor que 3", "A sum of distances greater than 3"),
        statement: L(
          "Resuelve $\\left|x-1\\right|+\\left|x-2\\right| > 3$, $x \\in \\mathbb{R}$, y escoge el conjunto solución.",
          "Solve $\\left|x-1\\right|+\\left|x-2\\right| > 3$, $x \\in \\mathbb{R}$, and choose the solution set.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Es la suma de las distancias a $1$ y a $2$: entre ambos puntos vale $1$ y crece hacia los extremos.",
            "It is the sum of the distances to $1$ and $2$: between the two points it equals $1$ and it grows towards the ends.",
          ),
          L(
            "El tramo central es imposible ($1 \\not> 3$); en los laterales queda una desigualdad lineal.",
            "The middle stretch is impossible ($1 \\not> 3$); in the side ones a linear inequality remains.",
          ),
          L(
            "Las fronteras caen donde la suma es exactamente $3$; como la desigualdad es estricta, quedan fuera.",
            "The boundaries fall where the sum is exactly $3$; the inequality being strict, they stay out.",
          ),
        ],
        answerDisplay: L(
          "$(-\\infty,\\ 0) \\cup (3,\\ +\\infty)$",
          "$(-\\infty,\\ 0) \\cup (3,\\ +\\infty)$",
        ),
        solution: [
          step(
            "given",
            "$\\left|x-1\\right|+\\left|x-2\\right| > 3$, $x \\in \\mathbb{R}$.",
            "$\\left|x-1\\right|+\\left|x-2\\right| > 3$, $x \\in \\mathbb{R}$.",
          ),
          step(
            "approach",
            "Cortes en $1$ y $2$: el tramo central es imposible y en los laterales la suma es lineal.",
            "Breaks at $1$ and $2$: the middle stretch is impossible and in the side ones the sum is linear.",
          ),
          step(
            "calculation",
            "$x<1$: $(1-x)+(2-x) = 3-2x > 3 \\Rightarrow -2x > 0 \\Rightarrow x < 0$ → aporta $(-\\infty,\\ 0)$.<br>$1 \\le x \\le 2$: $(x-1)+(2-x) = 1 \\not> 3$ → nada.<br>$x>2$: $(x-1)+(x-2) = 2x-3 > 3 \\Rightarrow x > 3$ → aporta $(3,\\ +\\infty)$.",
            "$x<1$: $(1-x)+(2-x) = 3-2x > 3 \\Rightarrow -2x > 0 \\Rightarrow x < 0$ → contributes $(-\\infty,\\ 0)$.<br>$1 \\le x \\le 2$: $(x-1)+(2-x) = 1 \\not> 3$ → nothing.<br>$x>2$: $(x-1)+(x-2) = 2x-3 > 3 \\Rightarrow x > 3$ → contributes $(3,\\ +\\infty)$.",
          ),
          step(
            "result",
            "$S = (-\\infty,\\ 0) \\cup (3,\\ +\\infty)$. Verificación: $x=-1$ (dentro): $2+3 = 5 > 3$ ✓; $x=0$ (extremo abierto): $1+2 = 3 \\not> 3$ ✗; $x=\\dfrac{3}{2}$ (centro excluido): $\\dfrac{1}{2}+\\dfrac{1}{2} = 1 \\not> 3$ ✗; $x=4$ (rayo derecho): $3+2 = 5 > 3$ ✓.",
            "$S = (-\\infty,\\ 0) \\cup (3,\\ +\\infty)$. Check: $x=-1$ (inside): $2+3 = 5 > 3$ ✓; $x=0$ (open endpoint): $1+2 = 3 \\not> 3$ ✗; $x=\\dfrac{3}{2}$ (excluded center): $\\dfrac{1}{2}+\\dfrac{1}{2} = 1 \\not> 3$ ✗; $x=4$ (right ray): $3+2 = 5 > 3$ ✓.",
          ),
        ],
      };
    },
  ),

  /* R2 · 20 — |x+1| ≤ |2x−3| → (−∞,2/3] ∪ [4,∞). */
  template(
    {
      id: "lin-autor2-20",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "abs-inequalities",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 180,
      tags: ["absolute-value", "inequality", "quadratic"],
      prerequisites: ["abs-inequalities", "interval-notation"],
      source: {
        sourceId: "autor-recopilacion-2025",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "R2 · 20",
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "$\\left(-\\infty,\\ \\dfrac{2}{3}\\right] \\cup [4,\\ +\\infty)$",
            "$\\left(-\\infty,\\ \\dfrac{2}{3}\\right] \\cup [4,\\ +\\infty)$",
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            "$\\left[\\dfrac{2}{3},\\ 4\\right]$",
            "$\\left[\\dfrac{2}{3},\\ 4\\right]$",
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            "$\\left(-\\infty,\\ -\\dfrac{2}{3}\\right] \\cup [4,\\ +\\infty)$",
            "$\\left(-\\infty,\\ -\\dfrac{2}{3}\\right] \\cup [4,\\ +\\infty)$",
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            "$\\left[\\dfrac{4}{3},\\ +\\infty\\right)$",
            "$\\left[\\dfrac{4}{3},\\ +\\infty\\right)$",
          ),
          correct: false,
        },
      ];
      return {
        skill: L("Desigualdad entre dos valores absolutos", "Inequality between two absolute values"),
        statement: L(
          "Resuelve $\\left|x+1\\right| \\le \\left|2x-3\\right|$, $x \\in \\mathbb{R}$, y escoge el conjunto solución.",
          "Solve $\\left|x+1\\right| \\le \\left|2x-3\\right|$, $x \\in \\mathbb{R}$, and choose the solution set.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Ambos lados son no negativos: eleva al cuadrado sin miedo a invertir la desigualdad.",
            "Both sides are non-negative: square without fear of flipping the inequality.",
          ),
          L(
            "Queda $3x^{2}-14x+8 \\ge 0$; sus raíces son $\\dfrac{2}{3}$ y $4$ (la fórmula general da $x = \\dfrac{14 \\pm 10}{6}$).",
            "You get $3x^{2}-14x+8 \\ge 0$; its roots are $\\dfrac{2}{3}$ and $4$ (the quadratic formula gives $x = \\dfrac{14 \\pm 10}{6}$).",
          ),
          L(
            "Parábola hacia arriba con $\\ge 0$: la solución son los **exteriores** del par de raíces; como la desigualdad original no es estricta, los extremos entran.",
            "Upward parabola with $\\ge 0$: the solution is the **exterior** of the root pair; the original inequality being non-strict, the endpoints enter.",
          ),
        ],
        answerDisplay: L(
          "$\\left(-\\infty,\\ \\dfrac{2}{3}\\right] \\cup [4,\\ +\\infty)$",
          "$\\left(-\\infty,\\ \\dfrac{2}{3}\\right] \\cup [4,\\ +\\infty)$",
        ),
        solution: [
          step(
            "given",
            "$\\left|x+1\\right| \\le \\left|2x-3\\right|$, $x \\in \\mathbb{R}$.",
            "$\\left|x+1\\right| \\le \\left|2x-3\\right|$, $x \\in \\mathbb{R}$.",
          ),
          step(
            "approach",
            "Elevar al cuadrado (ambos lados $\\ge 0$) y resolver la cuadrática $\\ge 0$: parábola hacia arriba, exteriores.",
            "Square (both sides $\\ge 0$) and solve the quadratic $\\ge 0$: upward parabola, exterior.",
          ),
          step(
            "calculation",
            "$(x+1)^{2} \\le (2x-3)^{2} \\Rightarrow x^{2}+2x+1 \\le 4x^{2}-12x+9 \\Rightarrow 3x^{2}-14x+8 \\ge 0$.<br>$3x^{2}-14x+8 = 0 \\Rightarrow x = \\dfrac{14 \\pm \\sqrt{196-96}}{6} = \\dfrac{14 \\pm 10}{6}$, es decir $x = \\dfrac{2}{3}$ o $x = 4$.<br>Exteriores: $x \\le \\dfrac{2}{3}$ o $x \\ge 4$.",
            "$(x+1)^{2} \\le (2x-3)^{2} \\Rightarrow x^{2}+2x+1 \\le 4x^{2}-12x+9 \\Rightarrow 3x^{2}-14x+8 \\ge 0$.<br>$3x^{2}-14x+8 = 0 \\Rightarrow x = \\dfrac{14 \\pm \\sqrt{196-96}}{6} = \\dfrac{14 \\pm 10}{6}$, i.e. $x = \\dfrac{2}{3}$ or $x = 4$.<br>Exterior: $x \\le \\dfrac{2}{3}$ or $x \\ge 4$.",
          ),
          step(
            "result",
            "$S = \\left(-\\infty,\\ \\dfrac{2}{3}\\right] \\cup [4,\\ +\\infty)$. Verificación: $x=0$ (dentro): $\\left|1\\right| = 1 \\le \\left|-3\\right| = 3$ ✓; $x=\\dfrac{2}{3}$ (extremo): $\\left|\\dfrac{5}{3}\\right| = \\dfrac{5}{3} \\le \\left|\\dfrac{4}{3}-3\\right| = \\dfrac{5}{3}$ ✓; $x=2$ (hueco): $\\left|3\\right| = 3 \\not\\le \\left|1\\right| = 1$ ✗.",
            "$S = \\left(-\\infty,\\ \\dfrac{2}{3}\\right] \\cup [4,\\ +\\infty)$. Check: $x=0$ (inside): $\\left|1\\right| = 1 \\le \\left|-3\\right| = 3$ ✓; $x=\\dfrac{2}{3}$ (endpoint): $\\left|\\dfrac{5}{3}\\right| = \\dfrac{5}{3} \\le \\left|\\dfrac{4}{3}-3\\right| = \\dfrac{5}{3}$ ✓; $x=2$ (gap): $\\left|3\\right| = 3 \\not\\le \\left|1\\right| = 1$ ✗.",
          ),
        ],
      };
    },
  ),

  /* R2 · 24 — |(x−1)/(x+3)| ≥ 2 → [−7,−3) ∪ (−3,−5/3]; the pole −3 splits the stretch. */
  template(
    {
      id: "lin-autor2-24",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "abs-inequalities",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["absolute-value", "inequality", "rational"],
      prerequisites: ["abs-inequalities", "interval-notation"],
      source: {
        sourceId: "autor-recopilacion-2025",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "R2 · 24",
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "$[-7,\\ -3) \\cup \\left(-3,\\ -\\dfrac{5}{3}\\right]$",
            "$[-7,\\ -3) \\cup \\left(-3,\\ -\\dfrac{5}{3}\\right]$",
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            "$\\left[-7,\\ -\\dfrac{5}{3}\\right]$",
            "$\\left[-7,\\ -\\dfrac{5}{3}\\right]$",
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            "$\\left(-\\infty,\\ -7\\right] \\cup \\left[-\\dfrac{5}{3},\\ +\\infty\\right)$",
            "$\\left(-\\infty,\\ -7\\right] \\cup \\left[-\\dfrac{5}{3},\\ +\\infty\\right)$",
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            "$[-7,\\ -3) \\cup (-3,\\ +\\infty)$",
            "$[-7,\\ -3) \\cup (-3,\\ +\\infty)$",
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Cociente dentro de la barra con cota 2",
          "A quotient inside the bar with bound 2",
        ),
        statement: L(
          "Resuelve $\\left|\\dfrac{x-1}{x+3}\\right| \\ge 2$, $x \\in \\mathbb{R}$, y escoge el conjunto solución.",
          "Solve $\\left|\\dfrac{x-1}{x+3}\\right| \\ge 2$, $x \\in \\mathbb{R}$, and choose the solution set.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El denominador vive salvo en $x = -3$: ese punto queda vetado.",
            "The denominator lives except at $x = -3$: that point is banned.",
          ),
          L(
            "Multiplica por $\\left|x+3\\right| > 0$ y eleva al cuadrado: queda $3x^{2}+26x+35 \\le 0$, con raíces $-7$ y $-\\dfrac{5}{3}$.",
            "Multiply by $\\left|x+3\\right| > 0$ and square: you get $3x^{2}+26x+35 \\le 0$, with roots $-7$ and $-\\dfrac{5}{3}$.",
          ),
          L(
            "El tramo entre las raíces contiene al polo $x = -3$: la respuesta final debe quedar horadada.",
            "The stretch between the roots contains the pole $x = -3$: the final answer must be punctured.",
          ),
        ],
        answerDisplay: L(
          "$[-7,\\ -3) \\cup \\left(-3,\\ -\\dfrac{5}{3}\\right]$",
          "$[-7,\\ -3) \\cup \\left(-3,\\ -\\dfrac{5}{3}\\right]$",
        ),
        solution: [
          step(
            "given",
            "$\\left|\\dfrac{x-1}{x+3}\\right| \\ge 2$, con $x \\neq -3$ (el denominador se anula ahí).",
            "$\\left|\\dfrac{x-1}{x+3}\\right| \\ge 2$, with $x \\neq -3$ (the denominator vanishes there).",
          ),
          step(
            "approach",
            "Multiplicar por $\\left|x+3\\right| > 0$, elevar al cuadrado y recortar después el polo $x = -3$ del tramo obtenido.",
            "Multiply by $\\left|x+3\\right| > 0$, square, and afterwards trim the pole $x = -3$ out of the stretch obtained.",
          ),
          step(
            "calculation",
            "$\\left|x-1\\right| \\ge 2\\left|x+3\\right| \\Rightarrow (x-1)^{2} \\ge 4(x+3)^{2} \\Rightarrow x^{2}-2x+1 \\ge 4x^{2}+24x+36 \\Rightarrow 3x^{2}+26x+35 \\le 0$.<br>$3x^{2}+26x+35 = (3x+5)(x+7) \\le 0 \\iff -7 \\le x \\le -\\dfrac{5}{3}$.<br>El polo $x = -3$ vive dentro de ese tramo y hay que retirarlo.",
            "$\\left|x-1\\right| \\ge 2\\left|x+3\\right| \\Rightarrow (x-1)^{2} \\ge 4(x+3)^{2} \\Rightarrow x^{2}-2x+1 \\ge 4x^{2}+24x+36 \\Rightarrow 3x^{2}+26x+35 \\le 0$.<br>$3x^{2}+26x+35 = (3x+5)(x+7) \\le 0 \\iff -7 \\le x \\le -\\dfrac{5}{3}$.<br>The pole $x = -3$ lives inside that stretch and must be removed.",
          ),
          step(
            "result",
            "$S = [-7,\\ -3) \\cup \\left(-3,\\ -\\dfrac{5}{3}\\right]$. Verificación: $x=-4$ (dentro): $\\left|\\dfrac{-5}{1}\\right| = 5 \\ge 2$ ✓; $x=-7$ (extremo): $\\left|\\dfrac{-8}{-4}\\right| = 2 \\ge 2$ ✓; $x=-\\dfrac{5}{3}$ (extremo): $\\dfrac{x-1}{x+3} = -2$ y $\\left|-2\\right| = 2 \\ge 2$ ✓; $x=0$ (fuera): $\\left|\\dfrac{-1}{3}\\right| = \\dfrac{1}{3} \\not\\ge 2$ ✗.",
            "$S = [-7,\\ -3) \\cup \\left(-3,\\ -\\dfrac{5}{3}\\right]$. Check: $x=-4$ (inside): $\\left|\\dfrac{-5}{1}\\right| = 5 \\ge 2$ ✓; $x=-7$ (endpoint): $\\left|\\dfrac{-8}{-4}\\right| = 2 \\ge 2$ ✓; $x=-\\dfrac{5}{3}$ (endpoint): $\\dfrac{x-1}{x+3} = -2$ and $\\left|-2\\right| = 2 \\ge 2$ ✓; $x=0$ (outside): $\\left|\\dfrac{-1}{3}\\right| = \\dfrac{1}{3} \\not\\ge 2$ ✗.",
          ),
        ],
      };
    },
  ),

  /* R2 · 25 — |x²−2x| > 3 → (−∞,−1) ∪ (3,∞); branch x²−2x+3 < 0 has Δ < 0. */
  template(
    {
      id: "lin-autor2-25",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "abs-inequalities",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 210,
      tags: ["absolute-value", "inequality", "quadratic"],
      prerequisites: ["abs-inequalities", "interval-notation"],
      source: {
        sourceId: "autor-recopilacion-2025",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "R2 · 25",
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "$(-\\infty,\\ -1) \\cup (3,\\ +\\infty)$",
            "$(-\\infty,\\ -1) \\cup (3,\\ +\\infty)$",
          ),
          correct: true,
        },
        { id: "b", text: L("$(-1,\\ 3)$", "$(-1,\\ 3)$"), correct: false },
        {
          id: "c",
          text: L(
            "$(-\\infty,\\ -1) \\cup (1,\\ 3) \\cup (3,\\ +\\infty)$",
            "$(-\\infty,\\ -1) \\cup (1,\\ 3) \\cup (3,\\ +\\infty)$",
          ),
          correct: false,
        },
        { id: "d", text: L("$\\left[-1,\\ 3\\right]$", "$\\left[-1,\\ 3\\right]$"), correct: false },
      ];
      return {
        skill: L(
          "Valor absoluto de una cuadrática, caso estricto",
          "Absolute value of a quadratic, strict case",
        ),
        statement: L(
          "Resuelve $\\left|x^{2}-2x\\right| > 3$, $x \\in \\mathbb{R}$, y escoge el conjunto solución.",
          "Solve $\\left|x^{2}-2x\\right| > 3$, $x \\in \\mathbb{R}$, and choose the solution set.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Separa $\\left|x^{2}-2x\\right| > 3$ en las dos ramas: $x^{2}-2x > 3$ o $x^{2}-2x < -3$.",
            "Split $\\left|x^{2}-2x\\right| > 3$ into the two branches: $x^{2}-2x > 3$ or $x^{2}-2x < -3$.",
          ),
          L(
            "La primera rama se factoriza como $(x-3)(x+1) > 0$; de la segunda, calcula primero su discriminante.",
            "The first branch factors as $(x-3)(x+1) > 0$; for the second one, compute its discriminant first.",
          ),
          L(
            "Con $\\Delta < 0$ y parábola hacia arriba, la rama $x^{2}-2x+3 < 0$ no aporta nada.",
            "With $\\Delta < 0$ and an upward parabola, the branch $x^{2}-2x+3 < 0$ contributes nothing.",
          ),
        ],
        answerDisplay: L(
          "$(-\\infty,\\ -1) \\cup (3,\\ +\\infty)$",
          "$(-\\infty,\\ -1) \\cup (3,\\ +\\infty)$",
        ),
        solution: [
          step(
            "given",
            "$\\left|x^{2}-2x\\right| > 3$, $x \\in \\mathbb{R}$.",
            "$\\left|x^{2}-2x\\right| > 3$, $x \\in \\mathbb{R}$.",
          ),
          step(
            "approach",
            "Separar $\\left|A\\right| > 3 \\iff A > 3 \\vee A < -3$ y estudiar las dos cuadráticas.",
            "Split $\\left|A\\right| > 3 \\iff A > 3 \\vee A < -3$ and study the two quadratics.",
          ),
          step(
            "calculation",
            "Rama 1: $x^{2}-2x-3 > 0 \\Rightarrow (x-3)(x+1) > 0 \\Rightarrow x < -1$ o $x > 3$.<br>Rama 2: $x^{2}-2x+3 < 0$: $\\Delta = 4-12 = -8 < 0$ con parábola hacia arriba → nunca es negativa, no aporta.",
            "Branch 1: $x^{2}-2x-3 > 0 \\Rightarrow (x-3)(x+1) > 0 \\Rightarrow x < -1$ or $x > 3$.<br>Branch 2: $x^{2}-2x+3 < 0$: $\\Delta = 4-12 = -8 < 0$ with an upward parabola → never negative, it contributes nothing.",
          ),
          step(
            "result",
            "$S = (-\\infty,\\ -1) \\cup (3,\\ +\\infty)$. Verificación: $x=-2$ (dentro): $\\left|4+4\\right| = 8 > 3$ ✓; $x=-1$ (extremo abierto): $\\left|1+2\\right| = 3 \\not> 3$ ✗; $x=1$ (centro excluido): $\\left|1-2\\right| = 1 \\not> 3$ ✗; $x=4$ (dentro): $\\left|16-8\\right| = 8 > 3$ ✓.",
            "$S = (-\\infty,\\ -1) \\cup (3,\\ +\\infty)$. Check: $x=-2$ (inside): $\\left|4+4\\right| = 8 > 3$ ✓; $x=-1$ (open endpoint): $\\left|1+2\\right| = 3 \\not> 3$ ✗; $x=1$ (excluded center): $\\left|1-2\\right| = 1 \\not> 3$ ✗; $x=4$ (inside): $\\left|16-8\\right| = 8 > 3$ ✓.",
          ),
        ],
      };
    },
  ),

  /* R2 · 26 — 1/|x−2| ≤ 3 → (−∞,5/3] ∪ [7/3,∞). */
  template(
    {
      id: "lin-autor2-26",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "abs-inequalities",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 210,
      tags: ["absolute-value", "inequality", "reciprocal"],
      prerequisites: ["abs-inequalities", "interval-notation"],
      source: {
        sourceId: "autor-recopilacion-2025",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "R2 · 26",
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "$\\left(-\\infty,\\ \\dfrac{5}{3}\\right] \\cup \\left[\\dfrac{7}{3},\\ +\\infty\\right)$",
            "$\\left(-\\infty,\\ \\dfrac{5}{3}\\right] \\cup \\left[\\dfrac{7}{3},\\ +\\infty\\right)$",
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            "$\\mathbb{R} \\setminus \\left\\{2\\right\\}$",
            "$\\mathbb{R} \\setminus \\left\\{2\\right\\}$",
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            "$\\left[\\dfrac{5}{3},\\ \\dfrac{7}{3}\\right]$",
            "$\\left[\\dfrac{5}{3},\\ \\dfrac{7}{3}\\right]$",
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            "$\\left(\\dfrac{5}{3},\\ \\dfrac{7}{3}\\right)$",
            "$\\left(\\dfrac{5}{3},\\ \\dfrac{7}{3}\\right)$",
          ),
          correct: false,
        },
      ];
      return {
        skill: L("El recíproco de una barra, acotado", "The reciprocal of a bar, bounded"),
        statement: L(
          "Resuelve $\\dfrac{1}{\\left|x-2\\right|} \\le 3$, $x \\in \\mathbb{R}$, y escoge el conjunto solución.",
          "Solve $\\dfrac{1}{\\left|x-2\\right|} \\le 3$, $x \\in \\mathbb{R}$, and choose the solution set.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El lado izquierdo siempre es positivo (donde está definido): piensa qué tan **grande** puede llegar a ser.",
            "The left-hand side is always positive (where defined): think about how **large** it can get.",
          ),
          L(
            "Multiplica por $\\left|x-2\\right| > 0$: la desigualdad se convierte en $\\left|x-2\\right| \\ge \\dfrac{1}{3}$.",
            "Multiply by $\\left|x-2\\right| > 0$: the inequality turns into $\\left|x-2\\right| \\ge \\dfrac{1}{3}$.",
          ),
          L(
            "Traduce a distancia: $x$ debe quedar a **al menos** $\\dfrac{1}{3}$ de $2$ — exteriores del intervalo correspondiente, con extremos incluidos.",
            "Translate to distance: $x$ must lie **at least** $\\dfrac{1}{3}$ away from $2$ — the exterior of the corresponding interval, endpoints included.",
          ),
        ],
        answerDisplay: L(
          "$\\left(-\\infty,\\ \\dfrac{5}{3}\\right] \\cup \\left[\\dfrac{7}{3},\\ +\\infty\\right)$",
          "$\\left(-\\infty,\\ \\dfrac{5}{3}\\right] \\cup \\left[\\dfrac{7}{3},\\ +\\infty\\right)$",
        ),
        solution: [
          step(
            "given",
            "$\\dfrac{1}{\\left|x-2\\right|} \\le 3$, con $x \\neq 2$ (el denominador se anula ahí).",
            "$\\dfrac{1}{\\left|x-2\\right|} \\le 3$, with $x \\neq 2$ (the denominator vanishes there).",
          ),
          step(
            "approach",
            "Multiplicar por $\\left|x-2\\right| > 0$ (no invierte la desigualdad) y traducir a una distancia desde $2$.",
            "Multiply by $\\left|x-2\\right| > 0$ (it does not flip the inequality) and translate into a distance from $2$.",
          ),
          step(
            "calculation",
            "$\\dfrac{1}{\\left|x-2\\right|} \\le 3 \\iff 1 \\le 3\\left|x-2\\right| \\iff \\left|x-2\\right| \\ge \\dfrac{1}{3}$.<br>$\\left|x-2\\right| \\ge \\dfrac{1}{3} \\iff x \\le 2-\\dfrac{1}{3} = \\dfrac{5}{3}$ o $x \\ge 2+\\dfrac{1}{3} = \\dfrac{7}{3}$.",
            "$\\dfrac{1}{\\left|x-2\\right|} \\le 3 \\iff 1 \\le 3\\left|x-2\\right| \\iff \\left|x-2\\right| \\ge \\dfrac{1}{3}$.<br>$\\left|x-2\\right| \\ge \\dfrac{1}{3} \\iff x \\le 2-\\dfrac{1}{3} = \\dfrac{5}{3}$ or $x \\ge 2+\\dfrac{1}{3} = \\dfrac{7}{3}$.",
          ),
          step(
            "result",
            "$S = \\left(-\\infty,\\ \\dfrac{5}{3}\\right] \\cup \\left[\\dfrac{7}{3},\\ +\\infty\\right)$. Verificación: $x=0$ (dentro): $\\dfrac{1}{2} \\le 3$ ✓; $x=\\dfrac{5}{3}$ (extremo): $\\left|x-2\\right| = \\dfrac{1}{3}$, así que el lado izquierdo vale $3 \\le 3$ ✓; $x=\\dfrac{11}{5}$ (hueco): $\\left|x-2\\right| = \\dfrac{1}{5}$ y el lado izquierdo vale $5 \\not\\le 3$ ✗.",
            "$S = \\left(-\\infty,\\ \\dfrac{5}{3}\\right] \\cup \\left[\\dfrac{7}{3},\\ +\\infty\\right)$. Check: $x=0$ (inside): $\\dfrac{1}{2} \\le 3$ ✓; $x=\\dfrac{5}{3}$ (endpoint): $\\left|x-2\\right| = \\dfrac{1}{3}$, so the left-hand side equals $3 \\le 3$ ✓; $x=\\dfrac{11}{5}$ (gap): $\\left|x-2\\right| = \\dfrac{1}{5}$ and the left-hand side equals $5 \\not\\le 3$ ✗.",
          ),
        ],
      };
    },
  ),

  /* R2 · 27 — |x−1|+|x+1| < x²−1 → (−∞,−1−√2) ∪ (1+√2,∞); center zone impossible. */
  template(
    {
      id: "lin-autor2-27",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "abs-inequalities",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 360,
      tags: ["absolute-value", "inequality", "quadratic", "challenge"],
      prerequisites: ["abs-inequalities", "compound"],
      source: {
        sourceId: "autor-recopilacion-2025",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "R2 · 27",
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "$\\left(-\\infty,\\ -1-\\sqrt{2}\\right) \\cup \\left(1+\\sqrt{2},\\ +\\infty\\right)$",
            "$\\left(-\\infty,\\ -1-\\sqrt{2}\\right) \\cup \\left(1+\\sqrt{2},\\ +\\infty\\right)$",
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            "$(-\\infty,\\ -1) \\cup (1,\\ +\\infty)$",
            "$(-\\infty,\\ -1) \\cup (1,\\ +\\infty)$",
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            "$\\left(-\\infty,\\ -1-\\sqrt{2}\\right) \\cup (-1,\\ 1) \\cup \\left(1+\\sqrt{2},\\ +\\infty\\right)$",
            "$\\left(-\\infty,\\ -1-\\sqrt{2}\\right) \\cup (-1,\\ 1) \\cup \\left(1+\\sqrt{2},\\ +\\infty\\right)$",
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            "$\\left(1+\\sqrt{2},\\ +\\infty\\right)$",
            "$\\left(1+\\sqrt{2},\\ +\\infty\\right)$",
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Barras a la izquierda, cuadrática a la derecha",
          "Bars on the left, quadratic on the right",
        ),
        statement: L(
          "Resuelve $\\left|x-1\\right|+\\left|x+1\\right| < x^{2}-1$, $x \\in \\mathbb{R}$, y escoge el conjunto solución.",
          "Solve $\\left|x-1\\right|+\\left|x+1\\right| < x^{2}-1$, $x \\in \\mathbb{R}$, and choose the solution set.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "La suma $\\left|x-1\\right|+\\left|x+1\\right|$ vale $2$ entre $-1$ y $1$, y $2\\left|x\\right|$ fuera de ahí: dos zonas de trabajo.",
            "The sum $\\left|x-1\\right|+\\left|x+1\\right|$ equals $2$ between $-1$ and $1$, and $2\\left|x\\right|$ outside: two working zones.",
          ),
          L(
            "Zona central: $2 < x^{2}-1$ pide $x^{2} > 3$, imposible con $\\left|x\\right| \\le 1$.",
            "Central zone: $2 < x^{2}-1$ demands $x^{2} > 3$, impossible with $\\left|x\\right| \\le 1$.",
          ),
          L(
            "Zona $x>1$: $2x < x^{2}-1 \\Rightarrow x^{2}-2x-1 > 0$; zona $x<-1$: $-2x < x^{2}-1$. Las raíces son $1 \\pm \\sqrt{2}$ y $-1 \\pm \\sqrt{2}$: quédate con las que viven en cada zona.",
            "Zone $x>1$: $2x < x^{2}-1 \\Rightarrow x^{2}-2x-1 > 0$; zone $x<-1$: $-2x < x^{2}-1$. The roots are $1 \\pm \\sqrt{2}$ and $-1 \\pm \\sqrt{2}$: keep the ones living in each zone.",
          ),
        ],
        answerDisplay: L(
          "$\\left(-\\infty,\\ -1-\\sqrt{2}\\right) \\cup \\left(1+\\sqrt{2},\\ +\\infty\\right)$",
          "$\\left(-\\infty,\\ -1-\\sqrt{2}\\right) \\cup \\left(1+\\sqrt{2},\\ +\\infty\\right)$",
        ),
        solution: [
          step(
            "given",
            "$\\left|x-1\\right|+\\left|x+1\\right| < x^{2}-1$, $x \\in \\mathbb{R}$.",
            "$\\left|x-1\\right|+\\left|x+1\\right| < x^{2}-1$, $x \\in \\mathbb{R}$.",
          ),
          step(
            "approach",
            "Escribir $\\left|x-1\\right|+\\left|x+1\\right|$ por zonas ($2$ en $[-1,1]$, $2x$ si $x>1$, $-2x$ si $x<-1$) y resolver en cada una.",
            "Write $\\left|x-1\\right|+\\left|x+1\\right|$ by zones ($2$ on $[-1,1]$, $2x$ if $x>1$, $-2x$ if $x<-1$) and solve in each one.",
          ),
          step(
            "calculation",
            "$-1 \\le x \\le 1$: $2 < x^{2}-1$ pide $x^{2} > 3$, imposible con $\\left|x\\right| \\le 1$.<br>$x>1$: $2x < x^{2}-1 \\Rightarrow x^{2}-2x-1 > 0 \\Rightarrow x < 1-\\sqrt{2}$ o $x > 1+\\sqrt{2}$; en la zona queda $x > 1+\\sqrt{2}$.<br>$x<-1$: $-2x < x^{2}-1 \\Rightarrow x^{2}+2x-1 > 0 \\Rightarrow x < -1-\\sqrt{2}$ o $x > -1+\\sqrt{2}$; en la zona queda $x < -1-\\sqrt{2}$.",
            "$-1 \\le x \\le 1$: $2 < x^{2}-1$ demands $x^{2} > 3$, impossible with $\\left|x\\right| \\le 1$.<br>$x>1$: $2x < x^{2}-1 \\Rightarrow x^{2}-2x-1 > 0 \\Rightarrow x < 1-\\sqrt{2}$ or $x > 1+\\sqrt{2}$; in the zone, $x > 1+\\sqrt{2}$.<br>$x<-1$: $-2x < x^{2}-1 \\Rightarrow x^{2}+2x-1 > 0 \\Rightarrow x < -1-\\sqrt{2}$ or $x > -1+\\sqrt{2}$; in the zone, $x < -1-\\sqrt{2}$.",
          ),
          step(
            "result",
            "$S = \\left(-\\infty,\\ -1-\\sqrt{2}\\right) \\cup \\left(1+\\sqrt{2},\\ +\\infty\\right)$. Verificación: $x=3$ (dentro): $2+4 = 6 < 9-1 = 8$ ✓; $x=-3$ (dentro): $4+2 = 6 < 8$ ✓; $x=0$ (excluido): $2 \\not< -1$ ✗; $x = 1+\\sqrt{2}$ (extremo): $2x = 2+2\\sqrt{2} = x^{2}-1$, empate ✗.",
            "$S = \\left(-\\infty,\\ -1-\\sqrt{2}\\right) \\cup \\left(1+\\sqrt{2},\\ +\\infty\\right)$. Check: $x=3$ (inside): $2+4 = 6 < 9-1 = 8$ ✓; $x=-3$ (inside): $4+2 = 6 < 8$ ✓; $x=0$ (excluded): $2 \\not< -1$ ✗; $x = 1+\\sqrt{2}$ (endpoint): $2x = 2+2\\sqrt{2} = x^{2}-1$, a tie ✗.",
          ),
        ],
      };
    },
  ),

  /* R2 · 23 — system {x²−5x+6 < 0, |x−2| > 1} → ∅ ((2,3) ∩ ((−∞,1)∪(3,∞)) = ∅). */
  template(
    {
      id: "lin-autor2-23",
      subject: "math",
      topicId: "linear-equations",
      subtopicId: "compound",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["system", "absolute-value", "inequality", "empty-set"],
      prerequisites: ["compound", "abs-inequalities"],
      source: {
        sourceId: "autor-recopilacion-2025",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "R2 · 23",
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "$\\varnothing$ (ningún $x$ real cumple ambas)",
            "$\\varnothing$ (no real $x$ satisfies both)",
          ),
          correct: true,
        },
        { id: "b", text: L("$(2,\\ 3)$", "$(2,\\ 3)$"), correct: false },
        {
          id: "c",
          text: L(
            "$(-\\infty,\\ 1) \\cup (3,\\ +\\infty)$",
            "$(-\\infty,\\ 1) \\cup (3,\\ +\\infty)$",
          ),
          correct: false,
        },
        {
          id: "d",
          text: L("$(1,\\ 2) \\cup (2,\\ 3)$", "$(1,\\ 2) \\cup (2,\\ 3)$"),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Intersección de una cuadrática y una barra",
          "Intersecting a quadratic with a bar",
        ),
        statement: L(
          "Resuelve el sistema $\\begin{cases}x^{2}-5x+6<0 \\\\ \\left|x-2\\right|>1\\end{cases}$, $x \\in \\mathbb{R}$, y escoge el conjunto solución.",
          "Solve the system $\\begin{cases}x^{2}-5x+6<0 \\\\ \\left|x-2\\right|>1\\end{cases}$, $x \\in \\mathbb{R}$, and choose the solution set.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Resuelve cada desigualdad por separado; el sistema pide la **intersección** de los dos conjuntos.",
            "Solve each inequality separately; the system demands the **intersection** of the two sets.",
          ),
          L(
            "La cuadrática se factoriza como $(x-2)(x-3)$; la barra significa «más lejos que $1$ del punto $2$».",
            "The quadratic factors as $(x-2)(x-3)$; the bar means «farther than $1$ from the point $2$».",
          ),
          L(
            "Una de las dos soluciones es un intervalo acotado; la otra son dos rayos. Al intersectar, fíjate en si el intervalo cae dentro de los rayos o en el hueco entre ellos.",
            "One of the two solutions is a bounded interval; the other is two rays. When intersecting, notice whether the interval falls inside the rays or in the gap between them.",
          ),
        ],
        answerDisplay: L("$\\varnothing$", "$\\varnothing$"),
        solution: [
          step(
            "given",
            "El sistema $\\begin{cases}x^{2}-5x+6<0 \\\\ \\left|x-2\\right|>1\\end{cases}$, $x \\in \\mathbb{R}$.",
            "The system $\\begin{cases}x^{2}-5x+6<0 \\\\ \\left|x-2\\right|>1\\end{cases}$, $x \\in \\mathbb{R}$.",
          ),
          step(
            "approach",
            "Resolver cada desigualdad por separado e intersectar los dos conjuntos solución.",
            "Solve each inequality separately and intersect the two solution sets.",
          ),
          step(
            "calculation",
            "(1) $x^{2}-5x+6<0 \\Rightarrow (x-2)(x-3)<0 \\Rightarrow 2<x<3$, es decir $(2,\\ 3)$.<br>(2) $\\left|x-2\\right|>1 \\Rightarrow x-2>1$ o $x-2<-1 \\Rightarrow x>3$ o $x<1$, es decir $(-\\infty,\\ 1) \\cup (3,\\ +\\infty)$.<br>Intersección: $(2, 3) \\cap \\left[(-\\infty,\\ 1) \\cup (3,\\ +\\infty)\\right] = \\varnothing$: ningún punto de $(2, 3)$ escapa de $[1, 3]$.",
            "(1) $x^{2}-5x+6<0 \\Rightarrow (x-2)(x-3)<0 \\Rightarrow 2<x<3$, i.e. $(2,\\ 3)$.<br>(2) $\\left|x-2\\right|>1 \\Rightarrow x-2>1$ or $x-2<-1 \\Rightarrow x>3$ or $x<1$, i.e. $(-\\infty,\\ 1) \\cup (3,\\ +\\infty)$.<br>Intersection: $(2, 3) \\cap \\left[(-\\infty,\\ 1) \\cup (3,\\ +\\infty)\\right] = \\varnothing$: no point of $(2, 3)$ escapes $[1, 3]$.",
          ),
          step(
            "result",
            "$S = \\varnothing$: la cuadrática obliga a vivir **dentro** de $(2, 3)$ y la barra obliga a estar **fuera** de $[1, 3]$ — exigencias incompatibles. Verificación: $x=\\dfrac{5}{2}$ (cumple (1)): $\\left|\\dfrac{1}{2}\\right| = \\dfrac{1}{2} \\not> 1$ ✗; $x=4$ (cumple (2)): $16-20+6 = 2 \\not< 0$ ✗; $x=3$ (frontera común): $0 \\not< 0$ y $\\left|1\\right| \\not> 1$ ✗.",
            "$S = \\varnothing$: the quadratic forces $x$ to live **inside** $(2, 3)$ and the bar forces it **outside** $[1, 3]$ — incompatible demands. Check: $x=\\dfrac{5}{2}$ (satisfies (1)): $\\left|\\dfrac{1}{2}\\right| = \\dfrac{1}{2} \\not> 1$ ✗; $x=4$ (satisfies (2)): $16-20+6 = 2 \\not< 0$ ✗; $x=3$ (common boundary): $0 \\not< 0$ and $\\left|1\\right| \\not> 1$ ✗.",
          ),
        ],
      };
    },
  ),
];
