/**
 * MATH · Functions
 *
 * Notation, evaluation, domain & range, composition, inverses,
 * transformations (with a function-graph diagram), piecewise functions,
 * graph reading and average rate of change. Every generator computes the
 * answer from its parameters.
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

/** "(x - 3)^2 + 2" — vertex form from the vertex (h, k) */
const sqTerm = (h: number): string =>
  `\\left(x ${h < 0 ? "+" : "-"} ${Math.abs(h)}\\right)^2`;

/** "3x" | "-x" | "x" — leading term (coefficient 1 omitted) */
const lead = (c: number, v: string): string =>
  `${c < 0 ? "-" : ""}${Math.abs(c) === 1 ? "" : Math.abs(c)}${v}`;

export const templates: ProblemTemplate[] = [
  /* ---------------------------------------------------------------- */
  /* Function notation                                                */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "fn-notation-01",
      subject: "math",
      topicId: "functions",
      subtopicId: "notation",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 70,
      tags: ["notation", "evaluation"],
      prerequisites: ["linear-equations"],
    },
    (rng) => {
      const a = rng.nonZeroInt(-6, 6);
      const b = rng.nonZeroInt(-9, 9);
      const k = rng.int(-5, 5);
      const value = a * k + b;
      return {
        skill: L("Notación funcional", "Function notation"),
        statement: L(
          `Si $f(x) = ${poly([a, b], ["x", ""])}$, ¿cuánto vale $f(${k})$?`,
          `If $f(x) = ${poly([a, b], ["x", ""])}$, what is $f(${k})$?`,
        ),
        answer: { kind: "numeric", value },
        hints: [
          L(
            "$f(k)$ significa: sustituye la $x$ por el número entre paréntesis, **con su signo**.",
            "$f(k)$ means: replace $x$ by the number in parentheses, **with its sign**.",
          ),
          L(
            `Escribe la expresión con $${k}$ en el lugar de la $x$.`,
            `Write the expression with $${k}$ in place of $x$.`,
          ),
          L(
            `Respeta la jerarquía: primero el producto $${a} \\cdot (${k})$ y después la suma.`,
            `Respect the order: first the product $${a} \\cdot (${k})$ and then the addition.`,
          ),
        ],
        answerDisplay: L(`$f(${k}) = ${value}$`, `$f(${k}) = ${value}$`),
        solution: [
          step(
            "given",
            `$f(x) = ${poly([a, b], ["x", ""])}$`,
            `$f(x) = ${poly([a, b], ["x", ""])}$`,
          ),
          step(
            "approach",
            "La notación $f(k)$ pide el valor de salida cuando la entrada es $k$: sustituimos $x = k$.",
            "The notation $f(k)$ asks for the output when the input is $k$: substitute $x = k$.",
          ),
          step(
            "calculation",
            `$f(${k}) = ${a} \\cdot (${k}) ${op(b)}$<br>$= ${a * k} ${op(b)} = ${value}$`,
            `$f(${k}) = ${a} \\cdot (${k}) ${op(b)}$<br>$= ${a * k} ${op(b)} = ${value}$`,
          ),
          step(
            "result",
            `$f(${k}) = ${value}$.`,
            `$f(${k}) = ${value}$.`,
          ),
        ],
      };
    },
  ),

  template(
    {
      id: "fn-chal-01",
      subject: "math",
      topicId: "functions",
      subtopicId: "notation",
      difficulty: "challenge",
      questionType: "numeric",
      estimatedTimeSec: 280,
      tags: ["notation", "change-of-variable", "insight"],
      prerequisites: ["notation"],
    },
    (rng) => {
      const a = rng.int(1, 3);
      const b = rng.nonZeroInt(-5, 5);
      const c = rng.int(-9, 9);
      const value = c - a * b;
      return {
        skill: L("Función definida con un desplazamiento", "A function defined with a shift"),
        statement: L(
          `Sabemos que $f(x + ${a}) = ${lead(b, "x")} ${op(c)}$ para todo $x$. ¿Cuánto vale $f(0)$?`,
          `We know that $f(x + ${a}) = ${lead(b, "x")} ${op(c)}$ for all $x$. What is $f(0)$?`,
        ),
        answer: { kind: "numeric", value },
        hints: [
          L(
            `La regla está escrita para la entrada $x + ${a}$, no para $x$.`,
            `The rule is written for the input $x + ${a}$, not for $x$.`,
          ),
          L(
            `Para que la entrada sea $0$, ¿qué valor de $x$ hace que $x + ${a} = 0$?`,
            `For the input to be $0$, which value of $x$ makes $x + ${a} = 0$?`,
          ),
          L(
            `Sustituye ese valor de $x$ en la expresión $${lead(b, "x")} ${op(c)}$.`,
            `Substitute that value of $x$ into the expression $${lead(b, "x")} ${op(c)}$.`,
          ),
        ],
        answerDisplay: L(`$f(0) = ${value}$`, `$f(0) = ${value}$`),
        solution: [
          step(
            "given",
            `$f(x + ${a}) = ${lead(b, "x")} ${op(c)}$ para todo $x$.`,
            `$f(x + ${a}) = ${lead(b, "x")} ${op(c)}$ for all $x$.`,
          ),
          step(
            "approach",
            `Buscamos la $x$ que produce la entrada $0$: resolvemos $x + ${a} = 0$.`,
            `We look for the $x$ that produces the input $0$: solve $x + ${a} = 0$.`,
          ),
          step(
            "calculation",
            `$x + ${a} = 0 \\Rightarrow x = ${-a}$<br>$f(0) = ${b} \\cdot (${-a}) ${op(c)}$<br>$= ${-a * b} ${op(c)} = ${value}$`,
            `$x + ${a} = 0 \\Rightarrow x = ${-a}$<br>$f(0) = ${b} \\cdot (${-a}) ${op(c)}$<br>$= ${-a * b} ${op(c)} = ${value}$`,
          ),
          step(
            "result",
            `$f(0) = ${value}$.`,
            `$f(0) = ${value}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Evaluation                                                       */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "fn-eval-01",
      subject: "math",
      topicId: "functions",
      subtopicId: "evaluation",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 100,
      tags: ["evaluation", "quadratic"],
      prerequisites: ["notation"],
    },
    (rng) => {
      const a = rng.nonZeroInt(-6, 6);
      const b = rng.int(-9, 9);
      const c = rng.int(1, 4);
      const value = c * c - a * c + b; // g(-c)
      return {
        skill: L("Evaluar en un punto negativo", "Evaluating at a negative point"),
        statement: L(
          `Si $g(x) = ${poly([1, a, b], ["x^2", "x", ""])}$, ¿cuánto vale $g(${-c})$?`,
          `If $g(x) = ${poly([1, a, b], ["x^2", "x", ""])}$, what is $g(${-c})$?`,
        ),
        answer: { kind: "numeric", value },
        hints: [
          L(
            "Sustituye la $x$ por el número entre paréntesis **con paréntesis** para no perder signos.",
            "Replace $x$ by the number in parentheses, **using parentheses** so no sign is lost.",
          ),
          L(
            `Escribe $(${-c})^2$ y $${a} \\cdot (${-c})$ por separado.`,
            `Compute $(${-c})^2$ and $${a} \\cdot (${-c})$ separately.`,
          ),
          L(
            "Recuerda que un negativo al cuadrado da un positivo.",
            "Remember: a negative number squared is positive.",
          ),
        ],
        answerDisplay: L(`$g(${-c}) = ${value}$`, `$g(${-c}) = ${value}$`),
        solution: [
          step(
            "given",
            `$g(x) = ${poly([1, a, b], ["x^2", "x", ""])}$`,
            `$g(x) = ${poly([1, a, b], ["x^2", "x", ""])}$`,
          ),
          step(
            "approach",
            `Sustituimos $x = ${-c}$ con paréntesis y respetando la jerarquía de operaciones.`,
            `We substitute $x = ${-c}$ using parentheses and respecting the order of operations.`,
          ),
          step(
            "calculation",
            `$g(${-c}) = (${-c})^2 ${op(a)} \\cdot (${-c}) ${op(b)}$<br>$= ${c * c} ${op(-a * c)} ${op(b)} = ${value}$`,
            `$g(${-c}) = (${-c})^2 ${op(a)} \\cdot (${-c}) ${op(b)}$<br>$= ${c * c} ${op(-a * c)} ${op(b)} = ${value}$`,
          ),
          step(
            "result",
            `$g(${-c}) = ${value}$.`,
            `$g(${-c}) = ${value}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Domain & range                                                   */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "fn-domain-01",
      subject: "math",
      topicId: "functions",
      subtopicId: "domain-range",
      difficulty: "medium",
      questionType: "text",
      estimatedTimeSec: 140,
      tags: ["domain", "square-root", "intervals"],
      prerequisites: ["notation"],
    },
    (rng) => {
      const a = rng.int(-6, 6);
      return {
        skill: L("Dominio de una raíz cuadrada", "Domain of a square root"),
        statement: L(
          `Escribe el dominio de $f(x) = \\sqrt{x ${a >= 0 ? "-" : "+"} ${Math.abs(a)}}$ en notación de intervalos, por ejemplo [2, inf) o x>=2.`,
          `Write the domain of $f(x) = \\sqrt{x ${a >= 0 ? "-" : "+"} ${Math.abs(a)}}$ in interval notation, e.g. [2, inf) or x>=2.`,
        ),
        answer: {
          kind: "text",
          accepted: [
            `[${a}, inf)`,
            `[${a},inf)`,
            `[${a}, ∞)`,
            `[${a},∞)`,
            `x>=${a}`,
            `x >= ${a}`,
          ],
        },
        hints: [
          L(
            "Una raíz cuadrada solo existe cuando lo de dentro es $\\ge 0$.",
            "A square root only exists when what is inside is $\\ge 0$.",
          ),
          L(
            `Plantea la desigualdad $x ${a >= 0 ? "-" : "+"} ${Math.abs(a)} \\ge 0$.`,
            `Set up the inequality $x ${a >= 0 ? "-" : "+"} ${Math.abs(a)} \\ge 0$.`,
          ),
          L(
            "El extremo sí se incluye (la raíz de 0 existe): usa corchete.",
            "The endpoint is included (the root of 0 exists): use a bracket.",
          ),
        ],
        answerDisplay: L(
          `$[${a}, \\infty)$`,
          `$[${a}, \\infty)$`,
        ),
        solution: [
          step(
            "given",
            `$f(x) = \\sqrt{x ${a >= 0 ? "-" : "+"} ${Math.abs(a)}}$`,
            `$f(x) = \\sqrt{x ${a >= 0 ? "-" : "+"} ${Math.abs(a)}}$`,
          ),
          step(
            "approach",
            "Imponemos que el radicando sea mayor o igual que cero.",
            "We require the radicand to be greater than or equal to zero.",
          ),
          step(
            "calculation",
            `$x ${a >= 0 ? "-" : "+"} ${Math.abs(a)} \\ge 0$<br>$x \\ge ${a}$`,
            `$x ${a >= 0 ? "-" : "+"} ${Math.abs(a)} \\ge 0$<br>$x \\ge ${a}$`,
          ),
          step(
            "result",
            `El dominio es $[${a}, \\infty)$, todos los números desde $${a}$ en adelante, incluido $${a}$.`,
            `The domain is $[${a}, \\infty)$: every number from $${a}$ onwards, including $${a}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Composition                                                      */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "fn-comp-01",
      subject: "math",
      topicId: "functions",
      subtopicId: "composition",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 150,
      tags: ["composition", "evaluation"],
      prerequisites: ["evaluation"],
    },
    (rng) => {
      const a = rng.int(2, 5);
      const b = rng.int(-8, 8);
      const c = rng.int(1, 5);
      const k = rng.nonZeroInt(-3, 3);
      const inner = k * k - c; // g(k)
      const value = a * inner + b; // f(g(k))
      return {
        skill: L("Composición evaluada en un punto", "Composition evaluated at a point"),
        statement: L(
          `Si $f(x) = ${poly([a, b], ["x", ""])}$ y $g(x) = x^2 ${op(-c)}$, calcula $(f \\circ g)(${k})$, es decir $f\\left(g(${k})\\right)$.`,
          `If $f(x) = ${poly([a, b], ["x", ""])}$ and $g(x) = x^2 ${op(-c)}$, compute $(f \\circ g)(${k})$, that is $f\\left(g(${k})\\right)$.`,
        ),
        answer: { kind: "numeric", value },
        hints: [
          L(
            "En una composición se trabaja **de dentro hacia fuera**.",
            "In a composition you work **from the inside out**.",
          ),
          L(
            `Primero calcula $g(${k}) = (${k})^2 - ${c}$.`,
            `First compute $g(${k}) = (${k})^2 - ${c}$.`,
          ),
          L(
            "Después aplica $f$ al resultado anterior.",
            "Then apply $f$ to that result.",
          ),
        ],
        answerDisplay: L(
          `$(f \\circ g)(${k}) = ${value}$`,
          `$(f \\circ g)(${k}) = ${value}$`,
        ),
        solution: [
          step(
            "given",
            `$f(x) = ${poly([a, b], ["x", ""])}$, $g(x) = x^2 ${op(-c)}$.`,
            `$f(x) = ${poly([a, b], ["x", ""])}$, $g(x) = x^2 ${op(-c)}$.`,
          ),
          step(
            "approach",
            "Primero evaluamos la función interior y después la exterior con ese resultado.",
            "First evaluate the inner function, then the outer function with that result.",
          ),
          step(
            "calculation",
            `$g(${k}) = (${k})^2 - ${c} = ${k * k} - ${c} = ${inner}$<br>$f\\left(${inner}\\right) = ${a} \\cdot (${inner}) ${op(b)} = ${value}$`,
            `$g(${k}) = (${k})^2 - ${c} = ${k * k} - ${c} = ${inner}$<br>$f\\left(${inner}\\right) = ${a} \\cdot (${inner}) ${op(b)} = ${value}$`,
          ),
          step(
            "result",
            `$(f \\circ g)(${k}) = ${value}$.`,
            `$(f \\circ g)(${k}) = ${value}$.`,
          ),
        ],
      };
    },
  ),

  template(
    {
      id: "fn-comp-02",
      subject: "math",
      topicId: "functions",
      subtopicId: "composition",
      difficulty: "hard",
      questionType: "expression",
      estimatedTimeSec: 200,
      tags: ["composition", "expressions"],
      prerequisites: ["composition"],
    },
    (rng) => {
      const a = rng.nonZeroInt(-5, 5);
      const b = rng.int(2, 5);
      return {
        skill: L("Composición en forma algebraica", "Composition in algebraic form"),
        statement: L(
          `Si $f(x) = x ${op(a)}$ y $g(x) = ${b}x$, escribe $g(f(x))$ en forma simplificada (escribe por ejemplo 4x+8).`,
          `If $f(x) = x ${op(a)}$ and $g(x) = ${b}x$, write $g(f(x))$ in simplified form (write e.g. 4x+8).`,
        ),
        answer: {
          kind: "expression",
          accepted: [
            `${b}*x + ${a * b}`,
            `${b}*(x + ${a})`,
            `${b}(x + ${a})`,
          ],
          variables: ["x"],
        },
        hints: [
          L(
            "$g(f(x))$ significa: aplica primero $f$ y luego $g$ al resultado.",
            "$g(f(x))$ means: apply $f$ first and then $g$ to the result.",
          ),
          L(
            `Sustituye en $g$ la entrada por la expresión completa de $f$: $g\\left(x ${op(a)}\\right)$.`,
            `Substitute into $g$ the whole expression of $f$: $g\\left(x ${op(a)}\\right)$.`,
          ),
          L(
            `Multiplica el paréntesis por $${b}$ con la distributiva.`,
            `Multiply the parentheses by $${b}$ using the distributive property.`,
          ),
        ],
        answerDisplay: L(
          `$g(f(x)) = ${b}x ${op(a * b)}$`,
          `$g(f(x)) = ${b}x ${op(a * b)}$`,
        ),
        solution: [
          step(
            "given",
            `$f(x) = x ${op(a)}$, $g(x) = ${b}x$.`,
            `$f(x) = x ${op(a)}$, $g(x) = ${b}x$.`,
          ),
          step(
            "approach",
            "En $g(f(x))$ la entrada de $g$ es toda la expresión de $f$; la sustituimos entre paréntesis.",
            "In $g(f(x))$ the input of $g$ is the whole expression of $f$; substitute it in parentheses.",
          ),
          step(
            "calculation",
            `$g(f(x)) = ${b}\\left(x ${op(a)}\\right)$<br>$= ${b}x ${op(a * b)}$`,
            `$g(f(x)) = ${b}\\left(x ${op(a)}\\right)$<br>$= ${b}x ${op(a * b)}$`,
          ),
          step(
            "result",
            `$g(f(x)) = ${b}x ${op(a * b)}$ (distinto de $f(g(x)) = ${b}x ${op(a)}$).`,
            `$g(f(x)) = ${b}x ${op(a * b)}$ (different from $f(g(x)) = ${b}x ${op(a)}$).`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Inverse functions                                                */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "fn-inv-01",
      subject: "math",
      topicId: "functions",
      subtopicId: "inverse",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 160,
      tags: ["inverse"],
      prerequisites: ["notation"],
    },
    (rng) => {
      const a = rng.nonZeroInt(-5, 5);
      const b = rng.nonZeroInt(-9, 9);
      return {
        skill: L("Función inversa de una afín", "Inverse of a linear function"),
        statement: L(
          `Halla $f^{-1}(x)$ para $f(x) = ${poly([a, b], ["x", ""])}$ (escribe por ejemplo (x-3)/2).`,
          `Find $f^{-1}(x)$ for $f(x) = ${poly([a, b], ["x", ""])}$ (write e.g. (x-3)/2).`,
        ),
        answer: {
          kind: "expression",
          accepted: [
            `(x - ${b})/${a}`,
            `x/${a} - ${b}/${a}`,
            `(x-${b})/${a}`,
          ],
          variables: ["x"],
        },
        hints: [
          L(
            "Para invertir una función, escribe $y = f(x)$ y despeja la $x$.",
            "To invert a function, write $y = f(x)$ and solve for $x$.",
          ),
          L(
            `Primero pasa el $${b}$ restando al otro lado.`,
            `First move the $${b}$ by subtracting it on the other side.`,
          ),
          L(
            `Después divide entre $${a}$.`,
            `Then divide by $${a}$.`,
          ),
        ],
        answerDisplay: L(
          `$f^{-1}(x) = \\frac{x ${op(-b)}}{${a}}$`,
          `$f^{-1}(x) = \\frac{x ${op(-b)}}{${a}}$`,
        ),
        solution: [
          step(
            "given",
            `$f(x) = ${poly([a, b], ["x", ""])}$`,
            `$f(x) = ${poly([a, b], ["x", ""])}$`,
          ),
          step(
            "approach",
            "Escribimos $y = f(x)$, despejamos $x$ y al final intercambiamos las variables.",
            "Write $y = f(x)$, solve for $x$ and finally swap the variables.",
          ),
          step(
            "calculation",
            `$y = ${a}x ${op(b)}$<br>$y ${op(-b)} = ${a}x$<br>$x = \\frac{y ${op(-b)}}{${a}}$`,
            `$y = ${a}x ${op(b)}$<br>$y ${op(-b)} = ${a}x$<br>$x = \\frac{y ${op(-b)}}{${a}}$`,
          ),
          step(
            "result",
            `Intercambiando variables: $f^{-1}(x) = \\frac{x ${op(-b)}}{${a}}$.`,
            `Swapping variables: $f^{-1}(x) = \\frac{x ${op(-b)}}{${a}}$.`,
          ),
        ],
      };
    },
  ),

  template(
    {
      id: "fn-inv-02",
      subject: "math",
      topicId: "functions",
      subtopicId: "inverse",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 200,
      tags: ["inverse", "reverse-thinking"],
      prerequisites: ["inverse"],
    },
    (rng) => {
      const a = rng.nonZeroInt(-5, 5);
      const b = rng.int(-9, 9);
      const c = rng.nonZeroInt(-5, 5);
      const value = a * c + b; // x such that f⁻¹(x) = c is x = f(c)
      return {
        skill: L("Usar la inversa al revés", "Using the inverse in reverse"),
        statement: L(
          `Si $f(x) = ${poly([a, b], ["x", ""])}$, ¿para qué valor de $x$ se cumple $f^{-1}(x) = ${c}$?`,
          `If $f(x) = ${poly([a, b], ["x", ""])}$, for which value of $x$ does $f^{-1}(x) = ${c}$ hold?`,
        ),
        answer: { kind: "numeric", value },
        hints: [
          L(
            "$f^{-1}(x) = c$ pregunta: ¿qué entrada de $f$ produce $c$ de salida?",
            "$f^{-1}(x) = c$ asks: which input of $f$ produces $c$ as output?",
          ),
          L(
            "Cuidado: aquí $x$ es la **entrada de la inversa**, o sea la salida de $f$.",
            "Careful: here $x$ is the **input of the inverse**, i.e. the output of $f$.",
          ),
          L(
            `La respuesta es $f(${c})$.`,
            `The answer is $f(${c})$.`,
          ),
        ],
        answerDisplay: L(`$x = ${value}$`, `$x = ${value}$`),
        solution: [
          step(
            "given",
            `$f(x) = ${poly([a, b], ["x", ""])}$ y $f^{-1}(x) = ${c}$.`,
            `$f(x) = ${poly([a, b], ["x", ""])}$ and $f^{-1}(x) = ${c}$.`,
          ),
          step(
            "approach",
            "Si $f^{-1}(x) = c$, aplicando $f$ a ambos lados: $x = f(c)$. La inversa deshace a la función.",
            "If $f^{-1}(x) = c$, applying $f$ to both sides gives $x = f(c)$. The inverse undoes the function.",
          ),
          step(
            "calculation",
            `$x = f(${c}) = ${a} \\cdot (${c}) ${op(b)}$<br>$= ${a * c} ${op(b)} = ${value}$`,
            `$x = f(${c}) = ${a} \\cdot (${c}) ${op(b)}$<br>$= ${a * c} ${op(b)} = ${value}$`,
          ),
          step(
            "result",
            `$x = ${value}$: en efecto, $f^{-1}(${value}) = ${c}$.`,
            `$x = ${value}$: indeed, $f^{-1}(${value}) = ${c}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Transformations (with diagram)                                   */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "fn-trans-01",
      subject: "math",
      topicId: "functions",
      subtopicId: "transformations",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 160,
      tags: ["transformations", "vertex-form", "graphs"],
      prerequisites: ["notation"],
    },
    (rng) => {
      const h = rng.nonZeroInt(-3, 3);
      const k = rng.nonZeroInt(-4, 4);
      const options: McOption[] = [
        {
          id: "a",
          text: L(`$y = ${sqTerm(h)} ${k < 0 ? "-" : "+"} ${Math.abs(k)}$`, `$y = ${sqTerm(h)} ${k < 0 ? "-" : "+"} ${Math.abs(k)}$`),
          correct: true,
        },
        {
          id: "b",
          text: L(`$y = ${sqTerm(-h)} ${k < 0 ? "-" : "+"} ${Math.abs(k)}$`, `$y = ${sqTerm(-h)} ${k < 0 ? "-" : "+"} ${Math.abs(k)}$`),
          correct: false,
        },
        {
          id: "c",
          text: L(`$y = ${sqTerm(h)} ${-k < 0 ? "-" : "+"} ${Math.abs(k)}$`, `$y = ${sqTerm(h)} ${-k < 0 ? "-" : "+"} ${Math.abs(k)}$`),
          correct: false,
        },
        {
          id: "d",
          text: L(`$y = ${sqTerm(-h)} ${-k < 0 ? "-" : "+"} ${Math.abs(k)}$`, `$y = ${sqTerm(-h)} ${-k < 0 ? "-" : "+"} ${Math.abs(k)}$`),
          correct: false,
        },
      ];
      return {
        skill: L("Identificar traslaciones de y = x²", "Identifying translations of y = x²"),
        statement: L(
          "La gráfica muestra la parábola que resulta de trasladar $y = x^2$. ¿Qué ecuación la describe?",
          "The graph shows the parabola obtained by translating $y = x^2$. Which equation describes it?",
        ),
        diagram: {
          kind: "function-graph",
          xMin: -6,
          xMax: 6,
          yMin: -8,
          yMax: 8,
          curves: [
            { fn: "x^2", color: "muted", dashed: true, label: "y = x²" },
            { fn: `(x - ${h})^2 + ${k}`, color: "primary" },
          ],
          points: [{ x: h, y: k }],
          showGrid: true,
          xLabel: "x",
          yLabel: "y",
        },
        diagramLabel: L(
          `Parábola trasladada respecto de y = x² con vértice en un punto de coordenadas enteras.`,
          `Parabola translated from y = x² with its vertex at a point with integer coordinates.`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Compara el vértice marcado con el vértice de $y = x^2$, que está en el origen.",
            "Compare the marked vertex with the vertex of $y = x^2$, which sits at the origin.",
          ),
          L(
            "En $y = (x - h)^2 + k$, el vértice es $(h, k)$: cuidado con el signo de $h$.",
            "In $y = (x - h)^2 + k$ the vertex is $(h, k)$: watch the sign of $h$.",
          ),
          L(
            "El desplazamiento horizontal va **al revés** del signo que aparece dentro del paréntesis.",
            "The horizontal shift goes **opposite** to the sign inside the parentheses.",
          ),
        ],
        answerDisplay: L(
          `$y = ${sqTerm(h)} ${k < 0 ? "-" : "+"} ${Math.abs(k)}$`,
          `$y = ${sqTerm(h)} ${k < 0 ? "-" : "+"} ${Math.abs(k)}$`,
        ),
        solution: [
          step(
            "given",
            `El vértice marcado de la parábola trasladada es $(${h}, ${k})$; el de $y = x^2$ es $(0, 0)$.`,
            `The marked vertex of the translated parabola is $(${h}, ${k})$; the one of $y = x^2$ is $(0, 0)$.`,
          ),
          step(
            "approach",
            "Una traslación $h$ en horizontal y $k$ en vertical da $y = (x - h)^2 + k$.",
            "A translation of $h$ horizontally and $k$ vertically gives $y = (x - h)^2 + k$.",
          ),
          step(
            "calculation",
            `Vértice $(${h}, ${k})$ $\Rightarrow$ $h = ${h}$, $k = ${k}$.<br>$y = \\left(x ${h < 0 ? "+" : "-"} ${Math.abs(h)}\\right)^2 ${k < 0 ? "-" : "+"} ${Math.abs(k)}$`,
            `Vertex $(${h}, ${k})$ $\Rightarrow$ $h = ${h}$, $k = ${k}$.<br>$y = \\left(x ${h < 0 ? "+" : "-"} ${Math.abs(h)}\\right)^2 ${k < 0 ? "-" : "+"} ${Math.abs(k)}$`,
          ),
          step(
            "result",
            `La ecuación es $y = ${sqTerm(h)} ${k < 0 ? "-" : "+"} ${Math.abs(k)}$.`,
            `The equation is $y = ${sqTerm(h)} ${k < 0 ? "-" : "+"} ${Math.abs(k)}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Piecewise                                                        */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "fn-piece-01",
      subject: "math",
      topicId: "functions",
      subtopicId: "piecewise",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 160,
      tags: ["piecewise"],
      prerequisites: ["evaluation"],
    },
    (rng) => {
      const c = rng.int(-2, 3); // boundary
      const upper = rng.bool(); // k ≥ c?
      const k = upper ? rng.int(c + 1, c + 3) : rng.int(c - 3, c - 1);
      const a = rng.nonZeroInt(-6, 6);
      let n = rng.int(-6, 6); // second branch: 3x + n
      if (k + a === 3 * k + n) n += 1; // both branches must differ at k
      const first = k < c;
      const value = first ? k + a : 3 * k + n;
      const casesTex = `f(x) = \\begin{cases} x ${op(a)} & \\text{si } x < ${c} \\\\ 3x ${op(n)} & \\text{si } x \\ge ${c} \\end{cases}`;
      const casesTexEn = `f(x) = \\begin{cases} x ${op(a)} & \\text{if } x < ${c} \\\\ 3x ${op(n)} & \\text{if } x \\ge ${c} \\end{cases}`;
      return {
        skill: L("Evaluar una función a trozos", "Evaluating a piecewise function"),
        statement: L(
          `Si $${casesTex}$, ¿cuánto vale $f(${k})$?`,
          `If $${casesTexEn}$, what is $f(${k})$?`,
        ),
        answer: { kind: "numeric", value },
        hints: [
          L(
            "En una función a trozos, primero decide **qué trozo** aplica.",
            "In a piecewise function, first decide **which piece** applies.",
          ),
          L(
            `Compara $${k}$ con la frontera $${c}$: ¿es menor o mayor o igual?`,
            `Compare $${k}$ with the boundary $${c}$: is it smaller, or greater or equal?`,
          ),
          L(
            `Usa la fórmula del trozo correcto y sustituye $${k}$.`,
            `Use the formula of the correct piece and substitute $${k}$.`,
          ),
        ],
        answerDisplay: L(`$f(${k}) = ${value}$`, `$f(${k}) = ${value}$`),
        solution: [
          step(
            "given",
            `$${casesTex}$ y pedimos $f(${k})$.`,
            `$${casesTexEn}$ and we want $f(${k})$.`,
          ),
          step(
            "approach",
            "Decidimos qué rama aplica comparando la entrada con la frontera.",
            "We decide which branch applies by comparing the input with the boundary.",
          ),
          step(
            "calculation",
            first
              ? `$${k} < ${c}$, así que usamos $f(x) = x ${op(a)}$.<br>$f(${k}) = ${k} ${op(a)} = ${value}$`
              : `$${k} \\ge ${c}$, así que usamos $f(x) = 3x ${op(n)}$.<br>$f(${k}) = 3 \\cdot ${k} ${op(n)} = ${value}$`,
            first
              ? `$${k} < ${c}$, so we use $f(x) = x ${op(a)}$.<br>$f(${k}) = ${k} ${op(a)} = ${value}$`
              : `$${k} \\ge ${c}$, so we use $f(x) = 3x ${op(n)}$.<br>$f(${k}) = 3 \\cdot ${k} ${op(n)} = ${value}$`,
          ),
          step(
            "result",
            `$f(${k}) = ${value}$.`,
            `$f(${k}) = ${value}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Interpreting graphs (with diagram)                               */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "fn-graph-01",
      subject: "math",
      topicId: "functions",
      subtopicId: "interpreting-graphs",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 150,
      tags: ["graph-reading", "absolute-value"],
      prerequisites: ["notation"],
    },
    (rng) => {
      const h = rng.int(-2, 2);
      const k = rng.int(-3, 3);
      const d1 = rng.int(1, 3);
      const d2 = rng.int(1, 3);
      const x1 = h - d1;
      const x2 = h + d2;
      const value = d1 + k + (d2 + k); // f(x1) + f(x2)
      return {
        skill: L("Leer valores de una gráfica", "Reading values off a graph"),
        statement: L(
          `La gráfica muestra $y = f(x)$. Según la gráfica, ¿cuánto vale $f(${x1}) + f(${x2})$?`,
          `The graph shows $y = f(x)$. According to the graph, what is $f(${x1}) + f(${x2})$?`,
        ),
        diagram: {
          kind: "function-graph",
          xMin: -6,
          xMax: 6,
          yMin: -6,
          yMax: 8,
          curves: [{ fn: `abs(x - ${h}) + ${k}`, color: "primary" }],
          points: [{ x: h, y: k }],
          showGrid: true,
          xLabel: "x",
          yLabel: "y",
        },
        diagramLabel: L(
          "Gráfica en forma de V con el vértice marcado en un punto de la cuadrícula.",
          "V-shaped graph with its vertex marked at a grid point.",
        ),
        answer: { kind: "numeric", value },
        hints: [
          L(
            `Lee **dos valores**: el de $f(${x1})$ y el de $f(${x2})$, y después súmalos.`,
            `Read **two values**: $f(${x1})$ and $f(${x2})$, then add them.`,
          ),
          L(
            `Para cada uno, ve al valor de $x$ en el eje horizontal y sube hasta la curva.`,
            `For each one, go to the $x$ value on the horizontal axis and move up to the curve.`,
          ),
          L(
            "La altura se lee en el eje vertical, contando los cuadros.",
            "The height is read on the vertical axis, counting the grid squares.",
          ),
        ],
        answerDisplay: L(
          `$f(${x1}) + f(${x2}) = ${d1 + k} + ${d2 + k} = ${value}$`,
          `$f(${x1}) + f(${x2}) = ${d1 + k} + ${d2 + k} = ${value}$`,
        ),
        solution: [
          step(
            "given",
            `Gráfica de $f$ con vértice marcado en $(${h}, ${k})$; pedimos $f(${x1}) + f(${x2})$.`,
            `Graph of $f$ with the vertex marked at $(${h}, ${k})$; we want $f(${x1}) + f(${x2})$.`,
          ),
          step(
            "approach",
            "Leemos la altura de la curva en cada una de las dos entradas y sumamos.",
            "We read the height of the curve at each of the two inputs and add them.",
          ),
          step(
            "calculation",
            `En $x = ${x1}$ la curva está a altura $${d1 + k}$.<br>En $x = ${x2}$ la curva está a altura $${d2 + k}$.<br>$f(${x1}) + f(${x2}) = ${d1 + k} + ${d2 + k} = ${value}$`,
            `At $x = ${x1}$ the curve is at height $${d1 + k}$.<br>At $x = ${x2}$ the curve is at height $${d2 + k}$.<br>$f(${x1}) + f(${x2}) = ${d1 + k} + ${d2 + k} = ${value}$`,
          ),
          step(
            "result",
            `$f(${x1}) + f(${x2}) = ${value}$.`,
            `$f(${x1}) + f(${x2}) = ${value}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Average rate of change                                           */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "fn-roc-01",
      subject: "math",
      topicId: "functions",
      subtopicId: "rate-of-change",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 210,
      tags: ["rate-of-change", "slope"],
      prerequisites: ["evaluation"],
    },
    (rng) => {
      const c = rng.nonZeroInt(-6, 6);
      let p = rng.int(-5, 4);
      let q = rng.int(-4, 5);
      if (p >= q) {
        // ensure p < q deterministically
        const t = Math.min(p, q);
        q = Math.max(p, q) + 1;
        p = t;
      }
      const value = p + q + c; // ARC of x² + cx over [p, q]
      return {
        skill: L("Tasa de cambio media de una cuadrática", "Average rate of change of a quadratic"),
        statement: L(
          `Calcula la tasa de cambio media de $f(x) = ${poly([1, c], ["x^2", "x"])}$ en el intervalo $[${p}, ${q}]$.`,
          `Compute the average rate of change of $f(x) = ${poly([1, c], ["x^2", "x"])}$ on the interval $[${p}, ${q}]$.`,
        ),
        answer: { kind: "numeric", value },
        hints: [
          L(
            "La tasa de cambio media es la pendiente de la recta que une los extremos: $\\frac{f(b) - f(a)}{b - a}$.",
            "The average rate of change is the slope of the line joining the endpoints: $\\frac{f(b) - f(a)}{b - a}$.",
          ),
          L(
            `Calcula primero $f(${p})$ y $f(${q})$.`,
            `First compute $f(${p})$ and $f(${q})$.`,
          ),
          L(
            "Al dividir, el numerador debería factorizarse por $q - p$: simplifica antes de dividir.",
            "When dividing, the numerator should factor by $q - p$: simplify before dividing.",
          ),
        ],
        answerDisplay: L(`$${value}$`, `$${value}$`),
        solution: [
          step(
            "given",
            `$f(x) = ${poly([1, c], ["x^2", "x"])}$, intervalo $[${p}, ${q}]$.`,
            `$f(x) = ${poly([1, c], ["x^2", "x"])}$, interval $[${p}, ${q}]$.`,
          ),
          step(
            "approach",
            "Aplicamos la definición: tasa media $= \\frac{f(q) - f(p)}{q - p}$.",
            "We apply the definition: average rate $= \\frac{f(q) - f(p)}{q - p}$.",
          ),
          step(
            "calculation",
            `$f(${q}) - f(${p}) = \\left(${q * q} ${op(c * q)}\\right) - \\left(${p * p} ${op(c * p)}\\right) = ${q * q + c * q} - ${p * p + c * p} = ${q * q + c * q - (p * p + c * p)}$<br>$= (${q} - ${p})(${p} + ${q} + ${c})$<br>$\\text{tasa} = \\frac{(${q} - ${p})(${p} + ${q} + ${c})}{${q} - ${p}} = ${p} + ${q} + ${c} = ${value}$`,
            `$f(${q}) - f(${p}) = \\left(${q * q} ${op(c * q)}\\right) - \\left(${p * p} ${op(c * p)}\\right) = ${q * q + c * q} - ${p * p + c * p} = ${q * q + c * q - (p * p + c * p)}$<br>$= (${q} - ${p})(${p} + ${q} + ${c})$<br>$\\text{rate} = \\frac{(${q} - ${p})(${p} + ${q} + ${c})}{${q} - ${p}} = ${p} + ${q} + ${c} = ${value}$`,
          ),
          step(
            "result",
            `La tasa de cambio media es $${value}$.`,
            `The average rate of change is $${value}$.`,
          ),
        ],
      };
    },
  ),
  /* ================================================================== */
  /* Curated — Fundamentos ESPOL, Cap. 4 Ejercicios Propuestos          */
  /* (funciones por tramos), items 62–64, pp. 510–511. Verified.        */
  /* ================================================================== */

  /* 62 — piecewise cost function */
  template(
    {
      id: "fn-espol-62",
      subject: "math",
      topicId: "functions",
      subtopicId: "piecewise",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 180,
      tags: ["piecewise", "modeling", "money"],
      prerequisites: ["functions"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "4.6 · 62",
        page: 510,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L("Evaluar una función por tramos", "Evaluating a piecewise function"),
      statement: L(
        `El costo $C$ (en dólares) de cierto material según su peso $g$ (en gramos) es $$C(g) = \\begin{cases} 3{,}00\\,g & 0 \\leq g < 20 \\\\ 2{,}50\\,g + 10{,}00 & 20 \\leq g < 40 \\\\ 2{,}00\\,g + 30 & 40 \\leq g \\leq 400 \\end{cases}$$ ¿Cuál es el costo para un pedido de **25 g**?`,
        `The cost $C$ (in dollars) of a material by weight $g$ (in grams) is $$C(g) = \\begin{cases} 3.00\\,g & 0 \\leq g < 20 \\\\ 2.50\\,g + 10.00 & 20 \\leq g < 40 \\\\ 2.00\\,g + 30 & 40 \\leq g \\leq 400 \\end{cases}$$ What is the cost of a **25 g** order?`,
      ),
      answer: { kind: "numeric", value: 72.5, tolerance: { mode: "relative", value: 0.01 } },
      hints: [
        L(
          "¿En qué tramo cae $g = 25$? Revisa las tres condiciones.",
          "Which branch does $g = 25$ fall into? Check the three conditions.",
        ),
        L(
          "$20 \\leq 25 < 40$: corresponde el tramo del medio.",
          "$20 \\leq 25 < 40$: the middle branch applies.",
        ),
        L(
          "$C(25) = 2{,}50 \\cdot 25 + 10{,}00$.",
          "$C(25) = 2.50 \\cdot 25 + 10.00$.",
        ),
      ],
      answerDisplay: L(
        `$C(25) = \\$72{,}50$`,
        `$C(25) = \\$72.50$`,
      ),
      solution: [
        step(
          "given",
          "Función de costo por tramos; pedido de $g = 25$ g.",
          "Piecewise cost function; an order of $g = 25$ g.",
        ),
        step(
          "approach",
          "En una función por tramos, el primer paso siempre es localizar el tramo correcto; los otros dos no se usan.",
          "In a piecewise function, the first step is always locating the correct branch; the other two play no role.",
        ),
        step(
          "calculation",
          `$0 \\leq 25 < 20$ falso; $20 \\leq 25 < 40$ verdadero<br>$C(25) = 2{,}50 \\cdot 25 + 10{,}00 = 62{,}50 + 10{,}00 = 72{,}50$`,
          `$0 \\leq 25 < 20$ false; $20 \\leq 25 < 40$ true<br>$C(25) = 2.50 \\cdot 25 + 10.00 = 62.50 + 10.00 = 72.50$`,
        ),
        step(
          "result",
          `El pedido de 25 g cuesta $\\$72{,}50$. (Ojo: con 10 g habría sido $\\$30$, el precio por gramo baja al crecer el pedido, pero el cargo fijo sube por tramos.)`,
          `The 25 g order costs $\\$72.50$. (Note: at 10 g it would have been $\\$30$ — the per-gram price drops as the order grows, but the fixed charge jumps at each threshold.)`,
        ),
      ],
    }),
  ),

  /* 63 — piecewise f: which statement is true? */
  template(
    {
      id: "fn-espol-63",
      subject: "math",
      topicId: "functions",
      subtopicId: "piecewise",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 360,
      tags: ["piecewise", "injective", "even", "properties"],
      prerequisites: ["functions"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "4.6 · 63",
        page: 510,
      },
      reasoning: "definition-hunting",
    },
    () => {
      const options: McOption[] = [
        { id: "a", text: L("$f$ es inyectiva", "$f$ is injective"), correct: false },
        { id: "b", text: L("$f$ es par", "$f$ is even"), correct: false },
        { id: "c", text: L("$f(3) + f(4) + f(5) + f(6) = 4\\,f(6)$", "$f(3) + f(4) + f(5) + f(6) = 4\\,f(6)$"), correct: true },
        { id: "d", text: L("$f(x) < 0$ para todo $x$", "$f(x) < 0$ for every $x$"), correct: false },
      ];
      return {
        skill: L("Auditar las propiedades de una función a trozos", "Auditing the properties of a piecewise function"),
        statement: L(
          `Sea $f: [-3, 6] \\to [0, 5]\\cup\\{6\\}$ definida por $$f(x) = \\begin{cases} x^2 - 4 & x \\in [-3, -2)\\cup(2, 3) \\\\ -x^2 + 4 & x \\in [-2, 2] \\\\ 6 & x \\in [3, 6] \\end{cases}$$ ¿Cuál de las siguientes proposiciones es **verdadera**?`,
          `Let $f: [-3, 6] \\to [0, 5]\\cup\\{6\\}$ be defined by $$f(x) = \\begin{cases} x^2 - 4 & x \\in [-3, -2)\\cup(2, 3) \\\\ -x^2 + 4 & x \\in [-2, 2] \\\\ 6 & x \\in [3, 6] \\end{cases}$$ Which of the following statements is **true**?`,
        ),
        answer: { kind: "multiple-choice", options },
        hints: [
          L(
            "Evalúa la opción c) primero: en $[3, 6]$ la función es constante.",
            "Evaluate option c) first: on $[3, 6]$ the function is constant.",
          ),
          L(
            "Para la inyectiva busca DOS entradas con la misma salida (prueba valores de $x^2 - 4$ y de $-x^2 + 4$).",
            "For injectivity look for TWO inputs with the same output (try values of $x^2 - 4$ and of $-x^2 + 4$).",
          ),
          L(
            "¿El dominio $[-3, 6]$ es simétrico respecto del 0? Eso decide la paridad.",
            "Is the domain $[-3, 6]$ symmetric about 0? That settles evenness.",
          ),
        ],
        answerDisplay: L(
          "La verdadera es $f(3) + f(4) + f(5) + f(6) = 4\\,f(6) = 24$.",
          "The true one is $f(3) + f(4) + f(5) + f(6) = 4\\,f(6) = 24$.",
        ),
        solution: [
          step(
            "given",
            "Función a trozos con dominio $[-3, 6]$ y codominio $[0, 5]\\cup\\{6\\}$.",
            "Piecewise function with domain $[-3, 6]$ and codomain $[0, 5]\\cup\\{6\\}$.",
          ),
          step(
            "approach",
            "Cada opción se comprueba con la definición: inyectiva (salidas repetidas), par (dominio simétrico), y evaluaciones directas.",
            "Each option is checked against the definition: injective (repeated outputs), even (symmetric domain), and direct evaluations.",
          ),
          step(
            "calculation",
            `c) En $[3,6]$: $f(3) = f(4) = f(5) = f(6) = 6$, así que $f(3)+f(4)+f(5)+f(6) = 24 = 4\\cdot 6 = 4f(6)$ ✓<br>a) $f(-\\sqrt{5}) = 1 = f(\\sqrt{3})$ con $-\\sqrt{5} \\neq \\sqrt{3}$: NO es inyectiva<br>b) El dominio $[-3,6]$ no es simétrico: no puede ser par<br>d) $f(0) = 4 > 0$: es falsa`,
            `c) On $[3,6]$: $f(3) = f(4) = f(5) = f(6) = 6$, so $f(3)+f(4)+f(5)+f(6) = 24 = 4\\cdot 6 = 4f(6)$ ✓<br>a) $f(-\\sqrt{5}) = 1 = f(\\sqrt{3})$ with $-\\sqrt{5} \\neq \\sqrt{3}$: NOT injective<br>b) The domain $[-3,6]$ is not symmetric: it cannot be even<br>d) $f(0) = 4 > 0$: false`,
          ),
          step(
            "result",
            `La única proposición verdadera es la c). Además $f$ ES sobreyectiva sobre $[0,5]\\cup\\{6\\}$ (el tramo $x^2-4$ cubre $(0,5]$ con $x=-3$, el tramo central cubre $[0,4]$ y el tercero aporta el $6$).`,
            `The only true statement is c). Moreover $f$ IS surjective onto $[0,5]\\cup\\{6\\}$ (the $x^2-4$ branch covers $(0,5]$ via $x=-3$, the middle branch covers $[0,4]$, and the third one supplies the $6$).`,
          ),
        ],
      };
    },
  ),

  /* 64 — IMG graduation merit ranking */
  template(
    {
      id: "fn-espol-64",
      subject: "math",
      topicId: "functions",
      subtopicId: "piecewise",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 420,
      tags: ["piecewise", "modeling", "table", "ranking"],
      prerequisites: ["functions"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "4.6 · 64",
        page: 511,
      },
      reasoning: "modeling",
    },
    () => {
      const options: McOption[] = [
        { id: "a", text: L("Biología Marina", "Marine Biology"), correct: false },
        { id: "b", text: L("Ing. en Petróleo", "Petroleum Engineering"), correct: true },
        { id: "c", text: L("Ing. Mecánica", "Mechanical Engineering"), correct: false },
        { id: "d", text: L("Ing. Ambiental", "Environmental Engineering"), correct: false },
      ];
      return {
        skill: L("Índice de mérito por tramos con tabla", "Table-driven piecewise merit index"),
        statement: L(
          `Una IES calcula el Índice de Mérito de Graduación de cada graduado como $\\text{IMG}_i = p_i \\cdot \\operatorname{f}(z_i - t_i)$, donde $t_i$ es la duración oficial de la carrera, $z_i$ el tiempo real hasta graduarse y $p_i$ el promedio, con $$\\operatorname{f}(d) = \\begin{cases} 1{,}0 & d \\leq 0{,}5 \\\\ 0{,}9 & 0{,}5 < d \\leq 1{,}0 \\\\ 0{,}8 & 1{,}0 < d \\leq 1{,}5 \\\\ 0{,}7 & 1{,}5 < d \\leq 2{,}0 \\\\ 0 & d > 2{,}0 \\end{cases}$$ Los mejores alumnos son: Biología Marina ($t = 5$, $z = 7$, $p = 9{,}80$), Ing. en Petróleo ($t = 6$, $z = 6$, $p = 8{,}90$), Ing. Mecánica ($t = 5$, $z = 6$, $p = 8{,}90$) e Ing. Ambiental ($t = 5$, $z = 7$, $p = 9{,}00$). ¿Quién ocupa el **primer lugar**?`,
          `A higher-education institution computes each graduate's Graduation Merit Index as $\\text{IMG}_i = p_i \\cdot \\operatorname{f}(z_i - t_i)$, where $t_i$ is the official program length, $z_i$ the actual time to graduate and $p_i$ the grade average, with $$\\operatorname{f}(d) = \\begin{cases} 1.0 & d \\leq 0.5 \\\\ 0.9 & 0.5 < d \\leq 1.0 \\\\ 0.8 & 1.0 < d \\leq 1.5 \\\\ 0.7 & 1.5 < d \\leq 2.0 \\\\ 0 & d > 2.0 \\end{cases}$$ The top students are: Marine Biology ($t = 5$, $z = 7$, $p = 9.80$), Petroleum Engineering ($t = 6$, $z = 6$, $p = 8.90$), Mechanical Engineering ($t = 5$, $z = 6$, $p = 8.90$) and Environmental Engineering ($t = 5$, $z = 7$, $p = 9.00$). Who takes **first place**?`,
        ),
        answer: { kind: "multiple-choice", options },
        hints: [
          L(
            "Calcula el retraso $d = z_i - t_i$ de cada graduado.",
            "Compute each graduate's delay $d = z_i - t_i$.",
          ),
          L(
            "Biología y Ambiental: $d = 2{,}0$; Petróleo: $d = 0$; Mecánica: $d = 1{,}0$. Ubica cada uno en la función por tramos.",
            "Marine Biology and Environmental: $d = 2.0$; Petroleum: $d = 0$; Mechanical: $d = 1.0$. Place each one on the piecewise function.",
          ),
          L(
            "Méritos: Biología $9{,}80 \\cdot 0{,}7$, Petróleo $8{,}90 \\cdot 1{,}0$, Mecánica $8{,}90 \\cdot 0{,}8$, Ambiental $9{,}00 \\cdot 0{,}7$. Compara.",
            "Merit: Marine Biology $9.80 \\cdot 0.7$, Petroleum $8.90 \\cdot 1.0$, Mechanical $8.90 \\cdot 0.8$, Environmental $9.00 \\cdot 0.7$. Compare.",
          ),
        ],
        answerDisplay: L(
          "Primer lugar: Ing. en Petróleo (IMG $= 8{,}90$).",
          "First place: Petroleum Engineering (IMG $= 8.90$).",
        ),
        solution: [
          step(
            "given",
            "Cuatro graduados con sus $(t, z, p)$ y la regla por tramos $\\operatorname{f}(d)$.",
            "Four graduates with their $(t, z, p)$ and the piecewise rule $\\operatorname{f}(d)$.",
          ),
          step(
            "approach",
            "El promedio más alto NO gana automáticamente: el índice premia graduarse a tiempo. Hay que evaluar la función por tramos para cada caso y luego multiplicar.",
            "The highest average does NOT win automatically: the index rewards graduating on time. Evaluate the piecewise function per case and then multiply.",
          ),
          step(
            "calculation",
            `Biología: $d = 7 - 5 = 2{,}0 \\Rightarrow \\operatorname{f} = 0{,}7 \\Rightarrow \\text{IMG} = 9{,}80 \\cdot 0{,}7 = 6{,}86$<br>Petróleo: $d = 6 - 6 = 0 \\Rightarrow \\operatorname{f} = 1{,}0 \\Rightarrow \\text{IMG} = 8{,}90$<br>Mecánica: $d = 6 - 5 = 1{,}0 \\Rightarrow \\operatorname{f} = 0{,}8 \\Rightarrow \\text{IMG} = 8{,}90 \\cdot 0{,}8 = 7{,}12$<br>Ambiental: $d = 7 - 5 = 2{,}0 \\Rightarrow \\operatorname{f} = 0{,}7 \\Rightarrow \\text{IMG} = 9{,}00 \\cdot 0{,}7 = 6{,}30$`,
            `Marine Biology: $d = 7 - 5 = 2.0 \\Rightarrow \\operatorname{f} = 0.7 \\Rightarrow \\text{IMG} = 9.80 \\cdot 0.7 = 6.86$<br>Petroleum: $d = 6 - 6 = 0 \\Rightarrow \\operatorname{f} = 1.0 \\Rightarrow \\text{IMG} = 8.90$<br>Mechanical: $d = 6 - 5 = 1.0 \\Rightarrow \\operatorname{f} = 0.8 \\Rightarrow \\text{IMG} = 8.90 \\cdot 0.8 = 7.12$<br>Environmental: $d = 7 - 5 = 2.0 \\Rightarrow \\operatorname{f} = 0.7 \\Rightarrow \\text{IMG} = 9.00 \\cdot 0.7 = 6.30$`,
          ),
          step(
            "result",
            `Orden final: Petróleo ($8{,}90$) > Mecánica ($7{,}12$) > Biología Marina ($6{,}86$) > Ambiental ($6{,}30$). El primer lugar es **Ing. en Petróleo**, a pesar de no tener el promedio más alto.`,
            `Final ranking: Petroleum ($8.90$) > Mechanical ($7.12$) > Marine Biology ($6.86$) > Environmental ($6.30$). First place goes to **Petroleum Engineering**, despite not having the top average.`,
          ),
        ],
      };
    },
  ),

  /* ================================================================== */
  /* Curated — ESPOL Fundamentos, EDICIÓN DIGITAL (TUTOR_LICENSED).      */
  /* Chapter 3 «Funciones de variable real», pp. 367-387.               */
  /* Tutor's brief (2026-10-03): «vayas a por los ejercicios del        */
  /* cap 3» — the most difficult / integrative ones.                    */
  /* Every answer double-verified: printed key pp. 939-940 + sympy      */
  /* (download/verify_espol_ch3.py). Statements were re-checked         */
  /* visually against the printed pages where the PDF text layer        */
  /* lost radicals/fractions.                                            */
  /* ================================================================== */

  /* 5e — domain of 2/√(|x−2|−1): strict (radical AND denominator) → (−∞,1)∪(3,∞) (option b). */
  template(
    {
      id: "fn-espol-ch3-5e",
      subject: "math",
      topicId: "functions",
      subtopicId: "domain-range",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["domain", "absolute-value", "radical", "denominator"],
      prerequisites: ["domain-range"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3 · 5e",
        page: 367,
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$[1, 3]$", "$[1, 3]$"), correct: false },
        {
          id: "b",
          text: L(
            "$(-\\infty, 1) \\cup (3, +\\infty)$",
            "$(-\\infty, 1) \\cup (3, +\\infty)$",
          ),
          correct: true,
        },
        { id: "c", text: L("$\\mathbb{R} - \\{2\\}$", "$\\mathbb{R} - \\{2\\}$"), correct: false },
        { id: "d", text: L("$(1, 3)$", "$(1, 3)$"), correct: false },
        {
          id: "e",
          text: L("$\\mathbb{R} - \\{1, 3\\}$", "$\\mathbb{R} - \\{1, 3\\}$"),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Dominio de un cociente con radical y valor absoluto",
          "Domain of a quotient with a radical and an absolute value",
        ),
        statement: L(
          "Determina el dominio (máximo) de la función de variable real $g(x) = \\dfrac{2}{\\sqrt{|x - 2| - 1}}$.",
          "Determine the (maximal) domain of the real-variable function $g(x) = \\dfrac{2}{\\sqrt{|x - 2| - 1}}$.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Hay dos condiciones simultáneas: lo que está dentro de la raíz y el hecho de que esa raíz está en el denominador.",
            "Two simultaneous conditions: what sits inside the radical and the fact that this radical is in the denominator.",
          ),
          L(
            "Al estar la raíz en el denominador, la condición es **estricta**: $|x - 2| - 1 > 0$ (ni cero ni negativo).",
            "With the radical in the denominator, the condition is **strict**: $|x - 2| - 1 > 0$ (neither zero nor negative).",
          ),
          L(
            "$|x - 2| > 1$ se lee como distancia: los puntos cuya distancia a $2$ supera $1$.",
            "$|x - 2| > 1$ reads as a distance: the points whose distance to $2$ exceeds $1$.",
          ),
        ],
        answerDisplay: L(
          "$(-\\infty, 1) \\cup (3, +\\infty)$ — la clave impresa lo escribe $[1, 3]^{C}$",
          "$(-\\infty, 1) \\cup (3, +\\infty)$ — the printed key writes it as $[1, 3]^{C}$",
        ),
        solution: [
          step(
            "given",
            "$g(x) = \\dfrac{2}{\\sqrt{|x - 2| - 1}}$: el radical está a su vez en el **denominador**.",
            "$g(x) = \\dfrac{2}{\\sqrt{|x - 2| - 1}}$: the radical sits in the **denominator**.",
          ),
          step(
            "approach",
            "La expresión solo existe si $|x - 2| - 1 > 0$, estricto: como radicando pediría $\\geq 0$ y como denominador $\\neq 0$; la intersección de ambas condiciones es $> 0$.",
            "The expression exists only if $|x - 2| - 1 > 0$, strictly: as a radicand it would need $\\geq 0$ and as a denominator $\\neq 0$; the intersection of both conditions is $> 0$.",
          ),
          step(
            "calculation",
            "$|x - 2| - 1 > 0 \\iff |x - 2| > 1 \\iff x - 2 < -1$ o $x - 2 > 1 \\iff x < 1$ o $x > 3$.",
            "$|x - 2| - 1 > 0 \\iff |x - 2| > 1 \\iff x - 2 < -1$ or $x - 2 > 1 \\iff x < 1$ or $x > 3$.",
          ),
          step(
            "result",
            "Dominio maximal $= (-\\infty, 1) \\cup (3, +\\infty)$, que la clave del libro anota como $[1, 3]^{C}$ (y de paso su rango es $(0, +\\infty)$). Verificación: $x = 0$: $|{-2}| - 1 = 1 > 0$ y $g(0) = \\dfrac{2}{\\sqrt{1}} = 2$ ✓; $x = 2$: radicando $-1 < 0$ ✗; $x = 1$: radicando $0$ → división entre $\\sqrt{0}$ ✗.",
            "Maximal domain $= (-\\infty, 1) \\cup (3, +\\infty)$, which the book's key writes as $[1, 3]^{C}$ (its range, by the way, is $(0, +\\infty)$). Check: $x = 0$: $|{-2}| - 1 = 1 > 0$ and $g(0) = \\dfrac{2}{\\sqrt{1}} = 2$ ✓; $x = 2$: radicand $-1 < 0$ ✗; $x = 1$: radicand $0$ → division by $\\sqrt{0}$ ✗.",
          ),
        ],
      };
    },
  ),

  /* 7 — domain of √(4−x²)/(x²+6x−7) → [−2,1)∪(1,2] (option c). Denominator NOT under the radical (visual re-check). */
  template(
    {
      id: "fn-espol-ch3-7",
      subject: "math",
      topicId: "functions",
      subtopicId: "domain-range",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["domain", "radical", "denominator", "quadratic"],
      prerequisites: ["domain-range"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3 · 7",
        page: 368,
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$[-2, 2]$", "$[-2, 2]$"), correct: false },
        {
          id: "b",
          text: L("$[-7, -2] \\cup [1, 2]$", "$[-7, -2] \\cup [1, 2]$"),
          correct: false,
        },
        {
          id: "c",
          text: L("$[-2, 1) \\cup (1, 2]$", "$[-2, 1) \\cup (1, 2]$"),
          correct: true,
        },
        {
          id: "d",
          text: L("$(-2, 1] \\cup [-1, 2)$", "$(-2, 1] \\cup [-1, 2)$"),
          correct: false,
        },
        { id: "e", text: L("$(-2, 2)^{C}$", "$(-2, 2)^{C}$"), correct: false },
      ];
      return {
        skill: L(
          "Dominio: radical en el numerador y denominador cuadrático",
          "Domain: radical in the numerator and a quadratic denominator",
        ),
        statement: L(
          "Si $f$ es una función de variable real definida por $f(x) = \\dfrac{\\sqrt{4 - x^{2}}}{x^{2} + 6x - 7}$, un dominio de $f$ es:",
          "If $f$ is a real-variable function defined by $f(x) = \\dfrac{\\sqrt{4 - x^{2}}}{x^{2} + 6x - 7}$, one domain of $f$ is:",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El numerador impone una condición (radicando $\\geq 0$) y el denominador otra (ser $\\neq 0$); resuelve cada una por separado y cruza.",
            "The numerator imposes one condition (radicand $\\geq 0$) and the denominator another (being $\\neq 0$); solve each separately and intersect.",
          ),
          L(
            "El denominador NO está dentro de la raíz (comprobado contra la página impresa): la barra del radical cubre solo a $4 - x^{2}$.",
            "The denominator is NOT inside the radical (checked against the printed page): the radical bar covers only $4 - x^{2}$.",
          ),
          L(
            "Factoriza el denominador: $x^{2} + 6x - 7 = (x + 7)(x - 1)$, y mira cuáles de esas raíces caen dentro del intervalo que permite el numerador.",
            "Factor the denominator: $x^{2} + 6x - 7 = (x + 7)(x - 1)$, and see which of those roots lie inside the interval allowed by the numerator.",
          ),
        ],
        answerDisplay: L("$[-2, 1) \\cup (1, 2]$", "$[-2, 1) \\cup (1, 2]$"),
        solution: [
          step(
            "given",
            "$f(x) = \\dfrac{\\sqrt{4 - x^{2}}}{x^{2} + 6x - 7}$. Nota: el denominador NO está bajo el radical (revisado visualmente en la página impresa, donde la capa de texto del PDF perdía la barra).",
            "$f(x) = \\dfrac{\\sqrt{4 - x^{2}}}{x^{2} + 6x - 7}$. Note: the denominator is NOT under the radical (re-checked visually on the printed page, where the PDF text layer lost the bar).",
          ),
          step(
            "approach",
            "Dos condiciones: radicando $\\geq 0$ y denominador $\\neq 0$; el dominio maximal es la intersección, y cualquier subconjunto suyo también sirve como «un dominio».",
            "Two conditions: radicand $\\geq 0$ and denominator $\\neq 0$; the maximal domain is the intersection, and any subset of it also works as «one domain».",
          ),
          step(
            "calculation",
            "Radicando: $4 - x^{2} \\geq 0 \\iff x^{2} \\leq 4 \\iff -2 \\leq x \\leq 2$.<br>Denominador: $x^{2} + 6x - 7 = (x + 7)(x - 1) = 0$ para $x = -7$ o $x = 1$; de esas dos raíces, solo $x = 1$ cae dentro de $[-2, 2]$ (se excluye).",
            "Radicand: $4 - x^{2} \\geq 0 \\iff x^{2} \\leq 4 \\iff -2 \\leq x \\leq 2$.<br>Denominator: $x^{2} + 6x - 7 = (x + 7)(x - 1) = 0$ at $x = -7$ or $x = 1$; of those two roots, only $x = 1$ lies inside $[-2, 2]$ (excluded).",
          ),
          step(
            "result",
            "Dominio maximal: $[-2, 1) \\cup (1, 2]$ — la única opción que puede servir de dominio (coincide con el maximal). Verificación: $x = -2$: $\\dfrac{\\sqrt{0}}{-15} = 0$ ✓ definida; $x = 0$: $\\dfrac{\\sqrt{4}}{-7}$ ✓ definida; $x = 1$: denominador $0$ ✗.",
            "Maximal domain: $[-2, 1) \\cup (1, 2]$ — the only option that can serve as a domain (it matches the maximal one). Check: $x = -2$: $\\dfrac{\\sqrt{0}}{-15} = 0$ ✓ defined; $x = 0$: $\\dfrac{\\sqrt{4}}{-7}$ ✓ defined; $x = 1$: denominator $0$ ✗.",
          ),
        ],
      };
    },
  ),

  /* 8 — domain of √(x−4+|3x−5|) by cases → (−∞,1/2]∪[9/4,∞); option c is that very set. */
  template(
    {
      id: "fn-espol-ch3-8",
      subject: "math",
      topicId: "functions",
      subtopicId: "domain-range",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 270,
      tags: ["domain", "radical", "absolute-value", "case-analysis"],
      prerequisites: ["domain-range"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3 · 8",
        page: 368,
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "$\\left(\\tfrac{9}{8}, \\tfrac{9}{4}\\right)$",
            "$\\left(\\tfrac{9}{8}, \\tfrac{9}{4}\\right)$",
          ),
          correct: false,
        },
        {
          id: "b",
          text: L(
            "$\\left[\\tfrac{1}{2}, \\tfrac{9}{4}\\right)$",
            "$\\left[\\tfrac{1}{2}, \\tfrac{9}{4}\\right)$",
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            "$\\left(\\tfrac{1}{2}, \\tfrac{9}{4}\\right)^{C}$",
            "$\\left(\\tfrac{1}{2}, \\tfrac{9}{4}\\right)^{C}$",
          ),
          correct: true,
        },
        {
          id: "d",
          text: L(
            "$\\left[0, \\tfrac{9}{4}\\right)$",
            "$\\left[0, \\tfrac{9}{4}\\right)$",
          ),
          correct: false,
        },
        {
          id: "e",
          text: L(
            "$\\left[\\tfrac{1}{2}, \\tfrac{9}{4}\\right]$",
            "$\\left[\\tfrac{1}{2}, \\tfrac{9}{4}\\right]$",
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Dominio de un radical con valor absoluto, por casos",
          "Domain of a radical with an absolute value, by cases",
        ),
        statement: L(
          "Sea $h$ una función de variable real con regla $h(x) = \\sqrt{x - 4 + |3x - 5|}$. Un conjunto que puede ser dominio de esta función es:",
          "Let $h$ be a real-variable function with rule $h(x) = \\sqrt{x - 4 + |3x - 5|}$. A set that can be a domain of this function is:",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El radicando mezcla $x$ con $|3x - 5|$: parte por casos según el signo de $3x - 5$ (punto crítico $x = \\tfrac{5}{3}$).",
            "The radicand mixes $x$ with $|3x - 5|$: split into cases on the sign of $3x - 5$ (critical point $x = \\tfrac{5}{3}$).",
          ),
          L(
            "Cada caso deja una desigualdad lineal sencilla: resuélvela y conserva solo la parte coherente con el propio tramo.",
            "Each case leaves a simple linear inequality: solve it and keep only the part consistent with the tranche itself.",
          ),
          L(
            "Lee la letra pequeña: no se pide EL dominio máximo, sino UN conjunto que PUEDA ser dominio (un subconjunto del máximo también vale).",
            "Read the fine print: it does not ask for THE maximal domain, but for A set that CAN be a domain (a subset of the maximal one also counts).",
          ),
        ],
        answerDisplay: L(
          "$\\left(\\tfrac{1}{2}, \\tfrac{9}{4}\\right)^{C} = \\left(-\\infty, \\tfrac{1}{2}\\right] \\cup \\left[\\tfrac{9}{4}, +\\infty\\right)$",
          "$\\left(\\tfrac{1}{2}, \\tfrac{9}{4}\\right)^{C} = \\left(-\\infty, \\tfrac{1}{2}\\right] \\cup \\left[\\tfrac{9}{4}, +\\infty\\right)$",
        ),
        solution: [
          step(
            "given",
            "$h(x) = \\sqrt{x - 4 + |3x - 5|}$. Se pide **un** conjunto que pueda ser dominio: no necesariamente el máximo.",
            "$h(x) = \\sqrt{x - 4 + |3x - 5|}$. We are asked for **a** set that can be a domain: not necessarily the maximal one.",
          ),
          step(
            "approach",
            "Analizar el radicando por casos según el signo de $3x - 5$ (punto crítico $x = \\tfrac{5}{3}$) para hallar el dominio máximo, y comparar después cada opción contra él.",
            "Analyze the radicand by cases on the sign of $3x - 5$ (critical point $x = \\tfrac{5}{3}$) to find the maximal domain, then compare each option against it.",
          ),
          step(
            "calculation",
            "Caso $x \\geq \\tfrac{5}{3}$: $|3x - 5| = 3x - 5$ → radicando $= x - 4 + 3x - 5 = 4x - 9 \\geq 0 \\iff x \\geq \\tfrac{9}{4}$.<br>Caso $x < \\tfrac{5}{3}$: $|3x - 5| = 5 - 3x$ → radicando $= x - 4 + 5 - 3x = 1 - 2x \\geq 0 \\iff x \\leq \\tfrac{1}{2}$.<br>Dominio máximo: $\\left(-\\infty, \\tfrac{1}{2}\\right] \\cup \\left[\\tfrac{9}{4}, +\\infty\\right)$, es decir $\\left(\\tfrac{1}{2}, \\tfrac{9}{4}\\right)^{C}$.",
            "Case $x \\geq \\tfrac{5}{3}$: $|3x - 5| = 3x - 5$ → radicand $= x - 4 + 3x - 5 = 4x - 9 \\geq 0 \\iff x \\geq \\tfrac{9}{4}$.<br>Case $x < \\tfrac{5}{3}$: $|3x - 5| = 5 - 3x$ → radicand $= x - 4 + 5 - 3x = 1 - 2x \\geq 0 \\iff x \\leq \\tfrac{1}{2}$.<br>Maximal domain: $\\left(-\\infty, \\tfrac{1}{2}\\right] \\cup \\left[\\tfrac{9}{4}, +\\infty\\right)$, i.e. $\\left(\\tfrac{1}{2}, \\tfrac{9}{4}\\right)^{C}$.",
          ),
          step(
            "result",
            "La opción c) es exactamente ese conjunto, así que puede ser dominio. Las demás contienen puntos del hueco $\\left(\\tfrac{1}{2}, \\tfrac{9}{4}\\right)$: por ejemplo la e) incluye $x = 1$, donde el radicando vale $1 - 4 + |3 - 5| = -1 < 0$ ✗. Verificación de fronteras: $x = \\tfrac{1}{2}$: $\\tfrac{1}{2} - 4 + \\left|\\tfrac{3}{2} - 5\\right| = \\tfrac{1}{2} - 4 + \\tfrac{7}{2} = 0$ ✓ ($\\sqrt{0}$ definida); $x = \\tfrac{9}{4}$: $\\tfrac{9}{4} - 4 + \\tfrac{7}{4} = 0$ ✓.",
            "Option c) is exactly that set, so it can be a domain. The others contain points of the gap $\\left(\\tfrac{1}{2}, \\tfrac{9}{4}\\right)$: for instance e) includes $x = 1$, where the radicand equals $1 - 4 + |3 - 5| = -1 < 0$ ✗. Boundary check: $x = \\tfrac{1}{2}$: $\\tfrac{1}{2} - 4 + \\left|\\tfrac{3}{2} - 5\\right| = \\tfrac{1}{2} - 4 + \\tfrac{7}{2} = 0$ ✓ ($\\sqrt{0}$ defined); $x = \\tfrac{9}{4}$: $\\tfrac{9}{4} - 4 + \\tfrac{7}{4} = 0$ ✓.",
          ),
        ],
      };
    },
  ),

  /* 14 — even/odd parts of f: the FALSE statement is a) g(x)=h(−x) (key a). */
  template(
    {
      id: "fn-espol-ch3-14",
      subject: "math",
      topicId: "functions",
      subtopicId: "even-odd",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["even-odd", "decomposition", "properties"],
      prerequisites: ["evaluation"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3 · 14",
        page: 370,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "$\\forall x \\in \\mathbb{R}\\ [g(x) = h(-x)]$",
            "$\\forall x \\in \\mathbb{R}\\ [g(x) = h(-x)]$",
          ),
          correct: true,
        },
        { id: "b", text: L("$h$ es impar", "$h$ is odd"), correct: false },
        {
          id: "c",
          text: L("$f(a) = g(-a) - h(-a)$", "$f(a) = g(-a) - h(-a)$"),
          correct: false,
        },
        { id: "d", text: L("$g$ es par", "$g$ is even"), correct: false },
        { id: "e", text: L("$-g$ es par", "$-g$ is even"), correct: false },
      ];
      return {
        skill: L(
          "Parte par y parte impar de una función",
          "Even part and odd part of a function",
        ),
        statement: L(
          "Sea $f$ una función de $\\mathbb{R}$ en $\\mathbb{R}$. Se definen $g$ y $h$ mediante $g(x) = \\dfrac{f(x) + f(-x)}{2}$ y $h(x) = \\dfrac{f(x) - f(-x)}{2}$. Identifica la afirmación **falsa**:",
          "Let $f$ be a function from $\\mathbb{R}$ to $\\mathbb{R}$. Define $g$ and $h$ by $g(x) = \\dfrac{f(x) + f(-x)}{2}$ and $h(x) = \\dfrac{f(x) - f(-x)}{2}$. Identify the **false** statement:",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Calcula $g(-x)$ y $h(-x)$ en términos de $g(x)$ y $h(x)$: al sustituir usa que $f(-(-x)) = f(x)$.",
            "Compute $g(-x)$ and $h(-x)$ in terms of $g(x)$ and $h(x)$: when substituting, use $f(-(-x)) = f(x)$.",
          ),
          L(
            "$g$ es la «parte par» de $f$ y $h$ su «parte impar»: de hecho $f = g + h$.",
            "$g$ is the «even part» of $f$ and $h$ its «odd part»: indeed $f = g + h$.",
          ),
          L(
            "Para la opción a), prueba con una $f$ concreta que no sea par ni impar (por ejemplo $f(x) = x^{3} + 2x - 1$) y evalúa ambos lados en $x = 0$.",
            "For option a), test a concrete $f$ that is neither even nor odd (for instance $f(x) = x^{3} + 2x - 1$) and evaluate both sides at $x = 0$.",
          ),
        ],
        answerDisplay: L(
          "La falsa es la a): $g(x) = h(-x)$ no se cumple en general.",
          "The false one is a): $g(x) = h(-x)$ does not hold in general.",
        ),
        solution: [
          step(
            "given",
            "$g(x) = \\dfrac{f(x) + f(-x)}{2}$ y $h(x) = \\dfrac{f(x) - f(-x)}{2}$, con $f: \\mathbb{R} \\to \\mathbb{R}$ arbitraria.",
            "$g(x) = \\dfrac{f(x) + f(-x)}{2}$ and $h(x) = \\dfrac{f(x) - f(-x)}{2}$, with $f: \\mathbb{R} \\to \\mathbb{R}$ arbitrary.",
          ),
          step(
            "approach",
            "$g$ es la **parte par** de $f$ y $h$ la **parte impar** ($f = g + h$). Se comprueba cada opción con las definiciones; para desenmascarar la falsa basta un contraejemplo con una $f$ concreta.",
            "$g$ is the **even part** of $f$ and $h$ the **odd part** ($f = g + h$). Each option is checked against the definitions; to unmask the false one, a counterexample with a concrete $f$ suffices.",
          ),
          step(
            "calculation",
            "b) $h(-x) = \\dfrac{f(-x) - f(x)}{2} = -h(x)$ → $h$ impar ✓<br>c) $g(-a) - h(-a) = g(a) + h(a) = f(a)$ ✓<br>d) $g(-x) = \\dfrac{f(-x) + f(x)}{2} = g(x)$ → par ✓; e) $(-g)(-x) = -g(-x) = -g(x)$ → $-g$ par ✓<br>a) $g(x) = h(-x)$ exigiría $g = -h$, es decir $f = g + h \\equiv 0$; con $f(x) = x^{3} + 2x - 1$ sale $g(x) = -1$ y $h(x) = x^{3} + 2x$, luego $g(0) = -1 \\neq 0 = h(-0)$ ✗",
            "b) $h(-x) = \\dfrac{f(-x) - f(x)}{2} = -h(x)$ → $h$ odd ✓<br>c) $g(-a) - h(-a) = g(a) + h(a) = f(a)$ ✓<br>d) $g(-x) = \\dfrac{f(-x) + f(x)}{2} = g(x)$ → even ✓; e) $(-g)(-x) = -g(-x) = -g(x)$ → $-g$ even ✓<br>a) $g(x) = h(-x)$ would force $g = -h$, i.e. $f = g + h \\equiv 0$; with $f(x) = x^{3} + 2x - 1$ one gets $g(x) = -1$ and $h(x) = x^{3} + 2x$, so $g(0) = -1 \\neq 0 = h(-0)$ ✗",
          ),
          step(
            "result",
            "La afirmación falsa es la **a)**: la parte par de una función arbitraria no coincide con el opuesto de su parte impar (eso solo pasaría si $f \\equiv 0$). Verificación con la $f$ de prueba: $g(0) = -1 \\neq h(0) = 0$; en cambio b), c), d) y e) se cumplen para cualquier $f$.",
            "The false statement is **a)**: the even part of an arbitrary function does not coincide with the opposite of its odd part (that could only happen if $f \\equiv 0$). Verification with the test $f$: $g(0) = -1 \\neq h(0) = 0$; whereas b), c), d) and e) hold for every $f$.",
          ),
        ],
      };
    },
  ),

  /* 15d — |2−x|−|x+2| is odd: |2−x| = |x−2| (key: impar). */
  template(
    {
      id: "fn-espol-ch3-15d",
      subject: "math",
      topicId: "functions",
      subtopicId: "even-odd",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["even-odd", "absolute-value"],
      prerequisites: ["evaluation"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3 · 15d",
        page: 370,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("Es par", "Even"), correct: false },
        { id: "b", text: L("Es impar", "Odd"), correct: true },
        {
          id: "c",
          text: L("No es par ni impar", "Neither even nor odd"),
          correct: false,
        },
        {
          id: "d",
          text: L("Es par e impar a la vez", "Both even and odd at once"),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Paridad de una función con valores absolutos",
          "Parity of a function with absolute values",
        ),
        statement: L(
          "Analiza si $j(x) = |2 - x| - |x + 2|$ es par, impar o ninguna de las dos.",
          "Analyze whether $j(x) = |2 - x| - |x + 2|$ is even, odd or neither.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Recuerda la simetría del valor absoluto: $|a| = |-a|$. Aplícala al primer término.",
            "Recall the symmetry of absolute value: $|a| = |-a|$. Apply it to the first term.",
          ),
          L(
            "Con esa equivalencia, $j$ queda escrita con $|x - 2|$ y $|x + 2|$: ahora calcula $j(-x)$ y compara término a término.",
            "With that equivalence, $j$ is written with $|x - 2|$ and $|x + 2|$: now compute $j(-x)$ and compare term by term.",
          ),
          L(
            "Si al final $j(-x) = -j(x)$ para todo $x$, la clasificación es inmediata.",
            "If in the end $j(-x) = -j(x)$ for every $x$, the classification is immediate.",
          ),
        ],
        answerDisplay: L(
          "$j$ es impar: $j(-x) = -j(x)$ para todo $x$.",
          "$j$ is odd: $j(-x) = -j(x)$ for every $x$.",
        ),
        solution: [
          step(
            "given",
            "$j(x) = |2 - x| - |x + 2|$, con dominio $\\mathbb{R}$ (simétrico respecto a $0$, así que cabe analizar la paridad).",
            "$j(x) = |2 - x| - |x + 2|$, with domain $\\mathbb{R}$ (symmetric about $0$, so the parity can be analyzed).",
          ),
          step(
            "approach",
            "Simplificar primero con la simetría del valor absoluto ($|a| = |-a|$) y luego comparar $j(-x)$ con $j(x)$.",
            "Simplify first with the symmetry of absolute value ($|a| = |-a|$), then compare $j(-x)$ with $j(x)$.",
          ),
          step(
            "calculation",
            "$|2 - x| = |-(2 - x)| = |x - 2|$, así que $j(x) = |x - 2| - |x + 2|$.<br>$j(-x) = |-x - 2| - |-x + 2| = |x + 2| - |x - 2| = -j(x)$ para todo $x \\in \\mathbb{R}$.",
            "$|2 - x| = |-(2 - x)| = |x - 2|$, so $j(x) = |x - 2| - |x + 2|$.<br>$j(-x) = |-x - 2| - |-x + 2| = |x + 2| - |x - 2| = -j(x)$ for every $x \\in \\mathbb{R}$.",
          ),
          step(
            "result",
            "$j(-x) = -j(x)$ → $j$ es **impar** (el término $|2 - x|$ «se disfraza», pero en realidad es $|x - 2|$). Verificación: $j(3) = |2 - 3| - |3 + 2| = 1 - 5 = -4$ y $j(-3) = |2 + 3| - |-3 + 2| = 5 - 1 = 4 = -j(3)$ ✓.",
            "$j(-x) = -j(x)$ → $j$ is **odd** (the term $|2 - x|$ is «in disguise», but it is really $|x - 2|$). Check: $j(3) = |2 - 3| - |3 + 2| = 1 - 5 = -4$ and $j(-3) = |2 + 3| - |-3 + 2| = 5 - 1 = 4 = -j(3)$ ✓.",
          ),
        ],
      };
    },
  ),

  /* 31b — range of a 3-branch piecewise g: branch values (−∞,0] ∪ (−1,1) ∪ {3} = (−∞,1)∪{3} (option b). */
  template(
    {
      id: "fn-espol-ch3-31b",
      subject: "math",
      topicId: "functions",
      subtopicId: "piecewise",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 270,
      tags: ["piecewise", "range"],
      prerequisites: ["piecewise", "domain-range"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3 · 31b",
        page: 373,
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$(-\\infty, 1]$", "$(-\\infty, 1]$"), correct: false },
        {
          id: "b",
          text: L("$(-\\infty, 1) \\cup \\{3\\}$", "$(-\\infty, 1) \\cup \\{3\\}$"),
          correct: true,
        },
        { id: "c", text: L("$(-\\infty, 3)$", "$(-\\infty, 3)$"), correct: false },
        { id: "d", text: L("$\\mathbb{R}$", "$\\mathbb{R}$"), correct: false },
        {
          id: "e",
          text: L(
            "$(-\\infty, 1) \\cup (1, 3) \\cup (3, +\\infty)$",
            "$(-\\infty, 1) \\cup (1, 3) \\cup (3, +\\infty)$",
          ),
          correct: false,
        },
      ];
      return {
        skill: L("Rango de una función a trozos", "Range of a piecewise function"),
        statement: L(
          "Sea $g$ una función de variable real con $$g(x) = \\begin{cases} 3 & ;\\ x \\geq 2 \\\\ 1 - x & ;\\ 0 < x < 2 \\\\ 4x & ;\\ x \\leq 0 \\end{cases}$$ Su rango es:",
          "Let $g$ be a real-variable function with $$g(x) = \\begin{cases} 3 & ;\\ x \\geq 2 \\\\ 1 - x & ;\\ 0 < x < 2 \\\\ 4x & ;\\ x \\leq 0 \\end{cases}$$ Its range is:",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Hallar el rango no es despejar: pregunta qué valores $y$ puede devolver cada rama.",
            "Finding the range is not about isolating: ask which $y$-values each branch can return.",
          ),
          L(
            "Rama a rama: la constante aporta un único valor; $1 - x$ sobre $(0, 2)$ y $4x$ sobre $(-\\infty, 0]$ aportan intervalos.",
            "Branch by branch: the constant contributes a single value; $1 - x$ on $(0, 2)$ and $4x$ on $(-\\infty, 0]$ contribute intervals.",
          ),
          L(
            "Al unir, revisa si algún valor frontera se alcanza: resuelve $1 - x = 1$ y $4x = 1$ y comprueba si esas $x$ están en su rama.",
            "When taking the union, check whether some boundary value is attained: solve $1 - x = 1$ and $4x = 1$ and verify those $x$ lie in their branch.",
          ),
        ],
        answerDisplay: L("$(-\\infty, 1) \\cup \\{3\\}$", "$(-\\infty, 1) \\cup \\{3\\}$"),
        solution: [
          step(
            "given",
            "$g(x) = \\begin{cases} 3 & ;\\ x \\geq 2 \\\\ 1 - x & ;\\ 0 < x < 2 \\\\ 4x & ;\\ x \\leq 0 \\end{cases}$; se pide el rango (los valores $y$ que $g$ alcanza realmente).",
            "$g(x) = \\begin{cases} 3 & ;\\ x \\geq 2 \\\\ 1 - x & ;\\ 0 < x < 2 \\\\ 4x & ;\\ x \\leq 0 \\end{cases}$; we want the range (the $y$-values $g$ actually attains).",
          ),
          step(
            "approach",
            "Hallar la imagen de cada rama por separado y unir los tres resultados.",
            "Find the image of each branch separately and take the union of the three results.",
          ),
          step(
            "calculation",
            "Rama $x \\geq 2$: valor constante $3$ → aporta $\\{3\\}$.<br>Rama $0 < x < 2$: $1 - x$ recorre $(-1, 1)$.<br>Rama $x \\leq 0$: $4x$ recorre $(-\\infty, 0]$.<br>Unión: $(-\\infty, 0] \\cup (-1, 1) \\cup \\{3\\} = (-\\infty, 1) \\cup \\{3\\}$.",
            "Branch $x \\geq 2$: constant value $3$ → contributes $\\{3\\}$.<br>Branch $0 < x < 2$: $1 - x$ runs over $(-1, 1)$.<br>Branch $x \\leq 0$: $4x$ runs over $(-\\infty, 0]$.<br>Union: $(-\\infty, 0] \\cup (-1, 1) \\cup \\{3\\} = (-\\infty, 1) \\cup \\{3\\}$.",
          ),
          step(
            "result",
            "Rango $= (-\\infty, 1) \\cup \\{3\\}$ (opción b). El valor $1$ NO se alcanza: $1 - x = 1$ exigiría $x = 0$, que no está en la rama $0 < x < 2$; $4x = 1$ exigiría $x = \\tfrac{1}{4}$, que no está en $x \\leq 0$. Verificación: $g(2) = 3$ ✓, $g(0) = 0$ ✓, $g(1{,}5) = -0{,}5$ ✓ — todos dentro del rango anunciado.",
            "Range $= (-\\infty, 1) \\cup \\{3\\}$ (option b). The value $1$ is NOT attained: $1 - x = 1$ would force $x = 0$, which is not in the branch $0 < x < 2$; $4x = 1$ would force $x = \\tfrac{1}{4}$, which is not in $x \\leq 0$. Check: $g(2) = 3$ ✓, $g(0) = 0$ ✓, $g(1.5) = -0.5$ ✓ — all inside the claimed range.",
          ),
        ],
      };
    },
  ),

  /* 61 — f∘g with two piecewise rules; the trap branch x<−4 gives 1 → option e. */
  template(
    {
      id: "fn-espol-ch3-61",
      subject: "math",
      topicId: "functions",
      subtopicId: "composition",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["composition", "piecewise", "case-analysis"],
      prerequisites: ["composition", "piecewise"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3 · 61",
        page: 381,
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "$\\begin{cases} x + 1 & ;\\ x > 4 \\\\ 3 - x & ;\\ -4 \\leq x < 2 \\\\ 1 & ;\\ x < -4 \\end{cases}$",
            "$\\begin{cases} x + 1 & ;\\ x > 4 \\\\ 3 - x & ;\\ -4 \\leq x < 2 \\\\ 1 & ;\\ x < -4 \\end{cases}$",
          ),
          correct: false,
        },
        {
          id: "b",
          text: L(
            "$\\begin{cases} 2 & ;\\ |x| \\leq 4 \\\\ x + 1 & ;\\ |x| > 4 \\end{cases}$",
            "$\\begin{cases} 2 & ;\\ |x| \\leq 4 \\\\ x + 1 & ;\\ |x| > 4 \\end{cases}$",
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            "$\\begin{cases} 3 - x & ;\\ x > 0 \\\\ x + 1 & ;\\ -4 \\leq x \\leq 0 \\\\ 1 & ;\\ x < -4 \\end{cases}$",
            "$\\begin{cases} 3 - x & ;\\ x > 0 \\\\ x + 1 & ;\\ -4 \\leq x \\leq 0 \\\\ 1 & ;\\ x < -4 \\end{cases}$",
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            "$\\begin{cases} 2 & ;\\ -4 \\leq x < 2 \\\\ x + 1 & ;\\ x > 4 \\\\ 1 & ;\\ 2 \\leq x \\leq 4 \\ \\vee\\ x < -4 \\end{cases}$",
            "$\\begin{cases} 2 & ;\\ -4 \\leq x < 2 \\\\ x + 1 & ;\\ x > 4 \\\\ 1 & ;\\ 2 \\leq x \\leq 4 \\ \\vee\\ x < -4 \\end{cases}$",
          ),
          correct: false,
        },
        {
          id: "e",
          text: L(
            "$\\begin{cases} x + 1 & ;\\ x > 4 \\\\ 3 - x & ;\\ -4 \\leq x < 2 \\\\ 1 & ;\\ 2 \\leq x \\leq 4 \\ \\vee\\ x < -4 \\end{cases}$",
            "$\\begin{cases} x + 1 & ;\\ x > 4 \\\\ 3 - x & ;\\ -4 \\leq x < 2 \\\\ 1 & ;\\ 2 \\leq x \\leq 4 \\ \\vee\\ x < -4 \\end{cases}$",
          ),
          correct: true,
        },
      ];
      return {
        skill: L(
          "Composición de funciones definidas a trozos",
          "Composing piecewise-defined functions",
        ),
        statement: L(
          "Si $f$ y $g$ son funciones de $\\mathbb{R}$ en $\\mathbb{R}$ con $$f(x) = \\begin{cases} x & ;\\ x > 1 \\\\ 1 & ;\\ x \\leq 1 \\end{cases}$$ y $$g(x) = \\begin{cases} 3 - x & ;\\ |x| \\leq 4 \\\\ x + 1 & ;\\ |x| > 4 \\end{cases}$$ entonces la regla de $f \\circ g$ es:",
          "If $f$ and $g$ are functions from $\\mathbb{R}$ to $\\mathbb{R}$ with $$f(x) = \\begin{cases} x & ;\\ x > 1 \\\\ 1 & ;\\ x \\leq 1 \\end{cases}$$ and $$g(x) = \\begin{cases} 3 - x & ;\\ |x| \\leq 4 \\\\ x + 1 & ;\\ |x| > 4 \\end{cases}$$ then the rule of $f \\circ g$ is:",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "$(f \\circ g)(x) = f(g(x))$: primero decide qué rama de $g$ aplica según $x$; después, qué rama de $f$ aplica según ese valor.",
            "$(f \\circ g)(x) = f(g(x))$: first decide which branch of $g$ applies given $x$; then which branch of $f$ applies given that value.",
          ),
          L(
            "Para $|x| \\leq 4$ se tiene $g(x) = 3 - x$, y $3 - x > 1$ exactamente cuando $x < 2$ — eso corta el tramo en dos.",
            "For $|x| \\leq 4$ we have $g(x) = 3 - x$, and $3 - x > 1$ exactly when $x < 2$ — that cuts the tranche in two.",
          ),
          L(
            "Cuidado con $x < -4$: allí $g(x) = x + 1$, pero $x + 1 < -3 \\leq 1$… ¿qué rama de $f$ toca usar?",
            "Careful with $x < -4$: there $g(x) = x + 1$, but $x + 1 < -3 \\leq 1$… which branch of $f$ must be used?",
          ),
        ],
        answerDisplay: L(
          "$(f \\circ g)(x) = \\begin{cases} x + 1 & ;\\ x > 4 \\\\ 3 - x & ;\\ -4 \\leq x < 2 \\\\ 1 & ;\\ 2 \\leq x \\leq 4 \\ \\vee\\ x < -4 \\end{cases}$",
          "$(f \\circ g)(x) = \\begin{cases} x + 1 & ;\\ x > 4 \\\\ 3 - x & ;\\ -4 \\leq x < 2 \\\\ 1 & ;\\ 2 \\leq x \\leq 4 \\ \\vee\\ x < -4 \\end{cases}$",
        ),
        solution: [
          step(
            "given",
            "$(f \\circ g)(x) = f(g(x))$, con $f(u) = u$ si $u > 1$ (y $1$ en caso contrario) y $g(x) = 3 - x$ si $|x| \\leq 4$ (y $x + 1$ si $|x| > 4$).",
            "$(f \\circ g)(x) = f(g(x))$, with $f(u) = u$ if $u > 1$ (and $1$ otherwise) and $g(x) = 3 - x$ if $|x| \\leq 4$ (and $x + 1$ if $|x| > 4$).",
          ),
          step(
            "approach",
            "Componer rama a rama: para cada $x$, primero la rama de $g$ (según $|x|$ frente a $4$) y después la rama de $f$ (el valor $g(x)$ frente a $1$).",
            "Compose branch by branch: for each $x$, first the branch of $g$ (according to $|x|$ versus $4$), then the branch of $f$ (the value $g(x)$ versus $1$).",
          ),
          step(
            "calculation",
            "Para $-4 \\leq x \\leq 4$: $g(x) = 3 - x$; como $3 - x > 1 \\iff x < 2$, resulta $3 - x$ si $-4 \\leq x < 2$ y $1$ si $2 \\leq x \\leq 4$.<br>Para $x > 4$: $g(x) = x + 1 > 5 > 1$ → $x + 1$.<br>Para $x < -4$: $g(x) = x + 1 < -3 \\leq 1$ → $1$ (la trampa: casi nadie comprueba que en este tramo $x + 1 < 1$).",
            "For $-4 \\leq x \\leq 4$: $g(x) = 3 - x$; since $3 - x > 1 \\iff x < 2$, we get $3 - x$ if $-4 \\leq x < 2$ and $1$ if $2 \\leq x \\leq 4$.<br>For $x > 4$: $g(x) = x + 1 > 5 > 1$ → $x + 1$.<br>For $x < -4$: $g(x) = x + 1 < -3 \\leq 1$ → $1$ (the trap: almost nobody checks that in this tranche $x + 1 < 1$).",
          ),
          step(
            "result",
            "$(f \\circ g)(x) = \\begin{cases} x + 1 & ;\\ x > 4 \\\\ 3 - x & ;\\ -4 \\leq x < 2 \\\\ 1 & ;\\ 2 \\leq x \\leq 4 \\ \\vee\\ x < -4 \\end{cases}$ — la opción e). Verificación: $(f \\circ g)(10) = f(11) = 11$; $(f \\circ g)(0) = f(3) = 3$; $(f \\circ g)(3) = f(0) = 1$; $(f \\circ g)(-5) = f(-4) = 1$ ✓.",
            "$(f \\circ g)(x) = \\begin{cases} x + 1 & ;\\ x > 4 \\\\ 3 - x & ;\\ -4 \\leq x < 2 \\\\ 1 & ;\\ 2 \\leq x \\leq 4 \\ \\vee\\ x < -4 \\end{cases}$ — option e). Check: $(f \\circ g)(10) = f(11) = 11$; $(f \\circ g)(0) = f(3) = 3$; $(f \\circ g)(3) = f(0) = 1$; $(f \\circ g)(-5) = f(-4) = 1$ ✓.",
          ),
        ],
      };
    },
  ),

  /* 65 — √∘(·)²∘(x−1) = √((x−1)²) = |x−1| (expression; printed key |x−1|). */
  template(
    {
      id: "fn-espol-ch3-65",
      subject: "math",
      topicId: "functions",
      subtopicId: "composition",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 180,
      tags: ["composition", "triple-composition", "absolute-value"],
      prerequisites: ["composition"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3 · 65",
        page: 382,
      },
      reasoning: "multi-concept",
    },
    () => ({
      skill: L(
        "Composición triple y el radical de un cuadrado",
        "Triple composition and the radical of a square",
      ),
      statement: L(
        "Dadas las funciones de variable real $f(x) = \\sqrt{x}$, $g(x) = x^{2}$ y $h(x) = x - 1$, determina la regla de $f \\circ g \\circ h$ (puedes escribir el valor absoluto como abs(...), por ejemplo abs(x+3)).",
        "Given the real-variable functions $f(x) = \\sqrt{x}$, $g(x) = x^{2}$ and $h(x) = x - 1$, determine the rule of $f \\circ g \\circ h$ (you may write the absolute value as abs(...), e.g. abs(x+3)).",
      ),
      answer: {
        kind: "expression",
        accepted: ["abs(x-1)", "sqrt((x-1)^2)", "((x-1)^2)^(1/2)"],
        variables: ["x"],
      },
      hints: [
        L(
          "$f \\circ g \\circ h$ se evalúa de dentro hacia afuera: primero $h$, después $g$ y al final $f$.",
          "$f \\circ g \\circ h$ evaluates inside-out: first $h$, then $g$ and finally $f$.",
        ),
        L(
          "$(g \\circ h)(x) = (x - 1)^{2}$ nunca es negativo, así que la raíz de $f$ siempre existe.",
          "$(g \\circ h)(x) = (x - 1)^{2}$ is never negative, so the radical of $f$ always exists.",
        ),
        L(
          "La clave está en $\\sqrt{u^{2}}$: no es $u$ — prueba con $u = -3$ antes de responder.",
          "The key lies in $\\sqrt{u^{2}}$: it is not $u$ — test $u = -3$ before answering.",
        ),
      ],
      answerDisplay: L(
        "$(f \\circ g \\circ h)(x) = \\sqrt{(x - 1)^{2}} = |x - 1|$",
        "$(f \\circ g \\circ h)(x) = \\sqrt{(x - 1)^{2}} = |x - 1|$",
      ),
      solution: [
        step(
          "given",
          "$f(x) = \\sqrt{x}$, $g(x) = x^{2}$ y $h(x) = x - 1$.",
          "$f(x) = \\sqrt{x}$, $g(x) = x^{2}$ and $h(x) = x - 1$.",
        ),
        step(
          "approach",
          "$(f \\circ g \\circ h)(x) = f(g(h(x)))$: se evalúa de dentro hacia afuera — primero $h$, luego $g$, al final $f$.",
          "$(f \\circ g \\circ h)(x) = f(g(h(x)))$: evaluate inside-out — first $h$, then $g$, finally $f$.",
        ),
        step(
          "calculation",
          "$(g \\circ h)(x) = g(x - 1) = (x - 1)^{2}$; después $(f \\circ g \\circ h)(x) = f\\left((x - 1)^{2}\\right) = \\sqrt{(x - 1)^{2}}$.",
          "$(g \\circ h)(x) = g(x - 1) = (x - 1)^{2}$; then $(f \\circ g \\circ h)(x) = f\\left((x - 1)^{2}\\right) = \\sqrt{(x - 1)^{2}}$.",
        ),
        step(
          "result",
          "$\\sqrt{(x - 1)^{2}} = |x - 1|$ — el radical de un cuadrado es el **valor absoluto**, no $x - 1$. Verificación: $x = 5$: $\\sqrt{(5 - 1)^{2}} = \\sqrt{16} = 4 = |5 - 1|$ ✓; $x = -2$: $\\sqrt{(-2 - 1)^{2}} = \\sqrt{9} = 3 = |{-3}|$ ✓ (si fuera $x - 1$ daría $-3$, imposible para una raíz principal).",
          "$\\sqrt{(x - 1)^{2}} = |x - 1|$ — the radical of a square is the **absolute value**, not $x - 1$. Check: $x = 5$: $\\sqrt{(5 - 1)^{2}} = \\sqrt{16} = 4 = |5 - 1|$ ✓; $x = -2$: $\\sqrt{(-2 - 1)^{2}} = \\sqrt{9} = 3 = |{-3}|$ ✓ (if it were $x - 1$ it would give $-3$, impossible for a principal root).",
        ),
      ],
    }),
  ),

  /* 66 — (f∘g)(x)=x²+2x+6, f(0)=9, g(x)=x−k with k∈ℕ → g(x)=x−1 (option a; x+3 is the k∈ℤ⁻ branch, the book's part b). */
  template(
    {
      id: "fn-espol-ch3-66",
      subject: "math",
      topicId: "functions",
      subtopicId: "composition",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 270,
      tags: ["composition", "inverse-reasoning", "parameter"],
      prerequisites: ["composition"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3 · 66",
        page: 382,
      },
      reasoning: "parameters",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$g(x) = x - 1$", "$g(x) = x - 1$"), correct: true },
        { id: "b", text: L("$g(x) = x + 3$", "$g(x) = x + 3$"), correct: false },
        { id: "c", text: L("$g(x) = x + 1$", "$g(x) = x + 1$"), correct: false },
        { id: "d", text: L("$g(x) = x - 3$", "$g(x) = x - 3$"), correct: false },
        { id: "e", text: L("$g(x) = x$", "$g(x) = x$"), correct: false },
      ];
      return {
        skill: L(
          "Composición con un parámetro y un dato puntual",
          "Composition with a parameter and a point datum",
        ),
        statement: L(
          "Dado que $(f \\circ g)(x) = x^{2} + 2x + 6$ y que $f(0) = 9$, determina la regla de $g$ si $g(x) = x - k$ con $k$ un número NATURAL ($k \\in \\mathbb{N}$).",
          "Given that $(f \\circ g)(x) = x^{2} + 2x + 6$ and that $f(0) = 9$, determine the rule of $g$ if $g(x) = x - k$ with $k$ a NATURAL number ($k \\in \\mathbb{N}$).",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Como $g$ recorre todo $\\mathbb{R}$ ($t = x - k$ con $x = t + k$), puedes despejar $f$ sustituyendo $x = t + k$ en $(f \\circ g)(x) = x^{2} + 2x + 6$.",
            "Since $g$ runs over all of $\\mathbb{R}$ ($t = x - k$ with $x = t + k$), you can recover $f$ by substituting $x = t + k$ in $(f \\circ g)(x) = x^{2} + 2x + 6$.",
          ),
          L(
            "Obtendrás $f(t) = (t + k)^{2} + 2(t + k) + 6$. Ahora entra el dato puntual $f(0) = 9$.",
            "You will get $f(t) = (t + k)^{2} + 2(t + k) + 6$. Now bring in the point datum $f(0) = 9$.",
          ),
          L(
            "$k^{2} + 2k + 6 = 9$ es una cuadrática en $k$; de sus dos raíces, solo una es un número natural.",
            "$k^{2} + 2k + 6 = 9$ is a quadratic in $k$; of its two roots, only one is a natural number.",
          ),
        ],
        answerDisplay: L(
          "$g(x) = x - 1$ (con $k = 1 \\in \\mathbb{N}$)",
          "$g(x) = x - 1$ (with $k = 1 \\in \\mathbb{N}$)",
        ),
        solution: [
          step(
            "given",
            "$(f \\circ g)(x) = x^{2} + 2x + 6$, $f(0) = 9$ y $g(x) = x - k$ con $k \\in \\mathbb{N}$.",
            "$(f \\circ g)(x) = x^{2} + 2x + 6$, $f(0) = 9$ and $g(x) = x - k$ with $k \\in \\mathbb{N}$.",
          ),
          step(
            "approach",
            "Como toda $t$ real se escribe $t = x - k$ (con $x = t + k$), la igualdad $f(x - k) = x^{2} + 2x + 6$ determina $f$ en función de $k$; después, el dato $f(0) = 9$ fija los valores posibles de $k$.",
            "Since every real $t$ can be written $t = x - k$ (with $x = t + k$), the identity $f(x - k) = x^{2} + 2x + 6$ determines $f$ as a function of $k$; then the datum $f(0) = 9$ pins down the possible values of $k$.",
          ),
          step(
            "calculation",
            "Sustituyendo $x = t + k$: $f(t) = (t + k)^{2} + 2(t + k) + 6$ (y en efecto $f(x - k) = x^{2} + 2x + 6$ para cualquier $k$).<br>El dato puntual: $f(0) = k^{2} + 2k + 6 = 9 \\Rightarrow k^{2} + 2k - 3 = 0 \\Rightarrow (k + 3)(k - 1) = 0 \\Rightarrow k = 1$ o $k = -3$.",
            "Substituting $x = t + k$: $f(t) = (t + k)^{2} + 2(t + k) + 6$ (and indeed $f(x - k) = x^{2} + 2x + 6$ for any $k$).<br>The point datum: $f(0) = k^{2} + 2k + 6 = 9 \\Rightarrow k^{2} + 2k - 3 = 0 \\Rightarrow (k + 3)(k - 1) = 0 \\Rightarrow k = 1$ or $k = -3$.",
          ),
          step(
            "result",
            "Con $k \\in \\mathbb{N}$ se toma $k = 1$ → $g(x) = x - 1$ (opción a). La otra raíz, $k = -3$, daría $g(x) = x + 3$ — la opción b), que es precisamente la respuesta de la parte b) del libro para $k \\in \\mathbb{Z}^{-}$. Verificación con $k = 1$: $f(t) = (t + 1)^{2} + 2(t + 1) + 6 = t^{2} + 4t + 9$, luego $f(0) = 9$ ✓ y $f(g(x)) = f(x - 1) = (x - 1)^{2} + 4(x - 1) + 9 = x^{2} + 2x + 6$ ✓.",
            "With $k \\in \\mathbb{N}$ we take $k = 1$ → $g(x) = x - 1$ (option a). The other root, $k = -3$, would give $g(x) = x + 3$ — option b), which is precisely the answer to the book's part b) for $k \\in \\mathbb{Z}^{-}$. Check with $k = 1$: $f(t) = (t + 1)^{2} + 2(t + 1) + 6 = t^{2} + 4t + 9$, so $f(0) = 9$ ✓ and $f(g(x)) = f(x - 1) = (x - 1)^{2} + 4(x - 1) + 9 = x^{2} + 2x + 6$ ✓.",
          ),
        ],
      };
    },
  ),

  /* 79 — inverse of x²−4x−3 on (−∞,2]: negative branch → f⁻¹(x)=2−√(7+x), x≥−7 (option b). */
  template(
    {
      id: "fn-espol-ch3-79",
      subject: "math",
      topicId: "functions",
      subtopicId: "inverse",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 270,
      tags: ["inverse", "quadratic", "branch"],
      prerequisites: ["inverse", "quadratic-formula"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3 · 79",
        page: 386,
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "$f^{-1}(x) = 2 + \\sqrt{7 - x}$; $x \\geq -7$",
            "$f^{-1}(x) = 2 + \\sqrt{7 - x}$; $x \\geq -7$",
          ),
          correct: false,
        },
        {
          id: "b",
          text: L(
            "$f^{-1}(x) = 2 - \\sqrt{7 + x}$; $x \\geq -7$",
            "$f^{-1}(x) = 2 - \\sqrt{7 + x}$; $x \\geq -7$",
          ),
          correct: true,
        },
        {
          id: "c",
          text: L(
            "$f^{-1}(x) = 2 + \\sqrt{7 + x}$; $x \\geq -7$",
            "$f^{-1}(x) = 2 + \\sqrt{7 + x}$; $x \\geq -7$",
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            "$f^{-1}(x) = 2 - \\sqrt{7 - x}$; $x \\geq -7$",
            "$f^{-1}(x) = 2 - \\sqrt{7 - x}$; $x \\geq -7$",
          ),
          correct: false,
        },
        {
          id: "e",
          text: L(
            "$f^{-1}(x) = 2 - \\sqrt{7 + x}$; $x \\leq -7$",
            "$f^{-1}(x) = 2 - \\sqrt{7 + x}$; $x \\leq -7$",
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Inversa de una cuadrática restringida a una rama",
          "Inverse of a quadratic restricted to one branch",
        ),
        statement: L(
          "Si $f(x) = x^{2} - 4x - 3$, $x \\in (-\\infty, 2]$, es la regla de una función invertible, entonces la regla de su inversa es:",
          "If $f(x) = x^{2} - 4x - 3$, $x \\in (-\\infty, 2]$, is the rule of an invertible function, then the rule of its inverse is:",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Una cuadrática solo se puede invertir restringida a una rama; sobre $(-\\infty, 2]$ esta parábola es monótona.",
            "A quadratic can only be inverted when restricted to one branch; on $(-\\infty, 2]$ this parabola is monotone.",
          ),
          L(
            "Completa el cuadrado: $x^{2} - 4x - 3 = (x - 2)^{2} - 7$. El vértice te da de paso el rango de $f$.",
            "Complete the square: $x^{2} - 4x - 3 = (x - 2)^{2} - 7$. The vertex also gives you the range of $f$.",
          ),
          L(
            "Al despejar aparece $\\pm\\sqrt{\\;\\cdot\\;}$: elige el signo recordando que la $x$ original debe cumplir $x \\leq 2$.",
            "When isolating, a $\\pm\\sqrt{\\;\\cdot\\;}$ appears: choose the sign remembering that the original $x$ must satisfy $x \\leq 2$.",
          ),
        ],
        answerDisplay: L(
          "$f^{-1}(x) = 2 - \\sqrt{7 + x}$, con $x \\geq -7$",
          "$f^{-1}(x) = 2 - \\sqrt{7 + x}$, with $x \\geq -7$",
        ),
        solution: [
          step(
            "given",
            "$f(x) = x^{2} - 4x - 3$ con $x \\in (-\\infty, 2]$ — la restricción a una sola rama de la parábola la hace inyectiva (invertible).",
            "$f(x) = x^{2} - 4x - 3$ with $x \\in (-\\infty, 2]$ — restricting to a single branch of the parabola makes it injective (invertible).",
          ),
          step(
            "approach",
            "Completar el cuadrado para leer el vértice y el rango; luego despejar $x$ en $y = f(x)$, eligiendo el signo de la raíz compatible con $x \\leq 2$.",
            "Complete the square to read off the vertex and the range; then isolate $x$ in $y = f(x)$, choosing the root sign compatible with $x \\leq 2$.",
          ),
          step(
            "calculation",
            "$x^{2} - 4x - 3 = (x - 2)^{2} - 7$: vértice $(2, -7)$; sobre $(-\\infty, 2]$ la parábola desciende de $+\\infty$ hasta $-7$, así que el rango es $[-7, +\\infty)$ → el dominio de $f^{-1}$ es $x \\geq -7$.<br>Despeje: $y = (x - 2)^{2} - 7 \\Rightarrow (x - 2)^{2} = y + 7 \\Rightarrow x - 2 = \\pm\\sqrt{y + 7}$; como la $x$ original cumple $x \\leq 2$, se toma $x - 2 = -\\sqrt{y + 7}$, es decir $x = 2 - \\sqrt{y + 7}$.",
            "$x^{2} - 4x - 3 = (x - 2)^{2} - 7$: vertex $(2, -7)$; on $(-\\infty, 2]$ the parabola descends from $+\\infty$ down to $-7$, so the range is $[-7, +\\infty)$ → the domain of $f^{-1}$ is $x \\geq -7$.<br>Isolation: $y = (x - 2)^{2} - 7 \\Rightarrow (x - 2)^{2} = y + 7 \\Rightarrow x - 2 = \\pm\\sqrt{y + 7}$; since the original $x$ satisfies $x \\leq 2$, we take $x - 2 = -\\sqrt{y + 7}$, i.e. $x = 2 - \\sqrt{y + 7}$.",
          ),
          step(
            "result",
            "$f^{-1}(x) = 2 - \\sqrt{7 + x}$, con $x \\geq -7$ (opción b). Verificación: $f^{-1}(2) = 2 - \\sqrt{9} = -1$ y $f(-1) = 1 + 4 - 3 = 2$ ✓; además $f^{-1}(-7) = 2 - 0 = 2$, coherente con que el mínimo $f(2) = -7$ se alcanza justo en el vértice ✓.",
            "$f^{-1}(x) = 2 - \\sqrt{7 + x}$, with $x \\geq -7$ (option b). Check: $f^{-1}(2) = 2 - \\sqrt{9} = -1$ and $f(-1) = 1 + 4 - 3 = 2$ ✓; moreover $f^{-1}(-7) = 2 - 0 = 2$, consistent with the minimum $f(2) = -7$ being attained exactly at the vertex ✓.",
          ),
        ],
      };
    },
  ),

  /* 85 — 1/(ax²−1) on (1,∞) through (2,⅓): a=1 and f⁻¹(x)=√((x+1)/x), x>0 (expression). */
  template(
    {
      id: "fn-espol-ch3-85",
      subject: "math",
      topicId: "functions",
      subtopicId: "inverse",
      difficulty: "hard",
      questionType: "expression",
      estimatedTimeSec: 300,
      tags: ["inverse", "parameter", "rational"],
      prerequisites: ["inverse", "domain-range"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3 · 85",
        page: 387,
      },
      reasoning: "multi-concept",
    },
    () => ({
      skill: L(
        "Inversa de una función racional con parámetro",
        "Inverse of a rational function with a parameter",
      ),
      statement: L(
        "La gráfica de $f(x) = \\dfrac{1}{ax^{2} - 1}$ con dominio $(1, +\\infty)$ contiene al punto $\\left(2, \\tfrac{1}{3}\\right)$. Determina la regla de correspondencia de $f^{-1}$ (escribe la raíz como sqrt(...), por ejemplo sqrt(x+2)).",
        "The graph of $f(x) = \\dfrac{1}{ax^{2} - 1}$ with domain $(1, +\\infty)$ contains the point $\\left(2, \\tfrac{1}{3}\\right)$. Determine the rule of correspondence of $f^{-1}$ (write the root as sqrt(...), e.g. sqrt(x+2)).",
      ),
      answer: {
        kind: "expression",
        accepted: [
          "sqrt((x+1)/x)",
          "sqrt(1+1/x)",
          "((x+1)/x)^(1/2)",
          "sqrt((1+x)/x)",
        ],
        variables: ["x"],
      },
      hints: [
        L(
          "Primero el dato puntual: $f(2) = \\tfrac{1}{3}$ te da una ecuación sencilla para $a$.",
          "First the point datum: $f(2) = \\tfrac{1}{3}$ gives you a simple equation for $a$.",
        ),
        L(
          "Con $a$ hallado, mira cómo se comporta $f$ sobre $(1, +\\infty)$: ¿es monótona allí? Observa qué pasa cuando $x \\to 1^{+}$ y cuando $x \\to +\\infty$.",
          "With $a$ found, look at how $f$ behaves on $(1, +\\infty)$: is it monotone there? Watch what happens as $x \\to 1^{+}$ and as $x \\to +\\infty$.",
        ),
        L(
          "Despeja $x$: $y = \\dfrac{1}{x^{2} - 1} \\Rightarrow x^{2} = 1 + \\dfrac{1}{y}$, y elige la raíz correcta recordando que $x > 1$.",
          "Isolate $x$: $y = \\dfrac{1}{x^{2} - 1} \\Rightarrow x^{2} = 1 + \\dfrac{1}{y}$, and pick the correct root remembering that $x > 1$.",
        ),
      ],
      answerDisplay: L(
        "$f^{-1}(x) = \\sqrt{\\dfrac{x + 1}{x}}$, con $x > 0$",
        "$f^{-1}(x) = \\sqrt{\\dfrac{x + 1}{x}}$, with $x > 0$",
      ),
      solution: [
        step(
          "given",
          "$f(x) = \\dfrac{1}{ax^{2} - 1}$ sobre el dominio $(1, +\\infty)$, y el punto $\\left(2, \\tfrac{1}{3}\\right)$ pertenece a su gráfica.",
          "$f(x) = \\dfrac{1}{ax^{2} - 1}$ on the domain $(1, +\\infty)$, and the point $\\left(2, \\tfrac{1}{3}\\right)$ belongs to its graph.",
        ),
        step(
          "approach",
          "Primero hallar $a$ con el punto dado; después invertir el despeje $y = f(x)$ sobre $x > 1$ (rama donde $f$ es decreciente y, por tanto, invertible).",
          "First find $a$ using the given point; then invert the relation $y = f(x)$ on $x > 1$ (the branch where $f$ is decreasing and therefore invertible).",
        ),
        step(
          "calculation",
          "$f(2) = \\dfrac{1}{4a - 1} = \\dfrac{1}{3} \\Rightarrow 4a - 1 = 3 \\Rightarrow a = 1$, así que $f(x) = \\dfrac{1}{x^{2} - 1}$ sobre $x > 1$ (decreciente: de $+\\infty$ hacia $0^{+}$ → invertible, con rango $(0, +\\infty)$).<br>Despeje: $y = \\dfrac{1}{x^{2} - 1} \\Rightarrow x^{2} - 1 = \\dfrac{1}{y} \\Rightarrow x^{2} = \\dfrac{y + 1}{y} \\Rightarrow x = \\sqrt{\\dfrac{y + 1}{y}}$ (raíz positiva, pues $x > 1 > 0$).",
          "$f(2) = \\dfrac{1}{4a - 1} = \\dfrac{1}{3} \\Rightarrow 4a - 1 = 3 \\Rightarrow a = 1$, so $f(x) = \\dfrac{1}{x^{2} - 1}$ on $x > 1$ (decreasing: from $+\\infty$ towards $0^{+}$ → invertible, with range $(0, +\\infty)$).<br>Isolation: $y = \\dfrac{1}{x^{2} - 1} \\Rightarrow x^{2} - 1 = \\dfrac{1}{y} \\Rightarrow x^{2} = \\dfrac{y + 1}{y} \\Rightarrow x = \\sqrt{\\dfrac{y + 1}{y}}$ (positive root, since $x > 1 > 0$).",
        ),
        step(
          "result",
          "$f^{-1}(x) = \\sqrt{\\dfrac{x + 1}{x}}$, definida para $x > 0$: sobre $(1, +\\infty)$ la función decrece de $+\\infty$ (cuando $x \\to 1^{+}$) hacia $0^{+}$ (cuando $x \\to +\\infty$), así que su rango —el dominio de $f^{-1}$— es $(0, +\\infty)$. (Clave impresa: a) $a = 1$; b) $\\sqrt{\\dfrac{x+1}{x}}$, $x > 0$.) Verificación: $f\\left(\\sqrt{\\tfrac{2+1}{2}}\\right) = f\\left(\\sqrt{1{,}5}\\right) = \\dfrac{1}{1{,}5 - 1} = 2$ ✓.",
          "$f^{-1}(x) = \\sqrt{\\dfrac{x + 1}{x}}$, defined for $x > 0$: on $(1, +\\infty)$ the function decreases from $+\\infty$ (as $x \\to 1^{+}$) towards $0^{+}$ (as $x \\to +\\infty$), so its range — the domain of $f^{-1}$ — is $(0, +\\infty)$. (Printed key: a) $a = 1$; b) $\\sqrt{\\dfrac{x+1}{x}}$, $x > 0$.) Check: $f\\left(\\sqrt{\\tfrac{2+1}{2}}\\right) = f\\left(\\sqrt{1.5}\\right) = \\dfrac{1}{1.5 - 1} = 2$ ✓.",
        ),
      ],
    }),
  ),

  /* ================================================================== */
  /* TAREA UEES · «EJERCICIOS DE REPASO 1ER PARCIAL MATEMATICAS I»        */
  /* Sección 8 «Dominio de una función»: ítems 5-16 y segunda tanda       */
  /* 9-12 (pág. 11). Sección 9 «Evaluación de puntos en una función»:     */
  /* ítems 17-22 (pág. 11) y segunda tanda 17-20 (pág. 12). Sin clave     */
  /* impresa: cada respuesta es ground truth de download/                 */
  /* verify_repaso1.py (secciones S8/S9 del script; 417 checks).          */
  /* Transcripción VLM: download/repaso1-pages/vlm-p-11.json y            */
  /* vlm-p-12.json. Normalización #15: la hoja imprime h(s) mezclando    */
  /* s/x; transcrita con una sola variable s como manda el brief.        */
  /* ================================================================== */

  /* S8 #5 — 6/(x−1): el hueco simple clásico. Distractores: ℝ (sin hueco),
     ℝ−{−1} (signo) y [1,∞) (confusión con raíz). */
  template(
    {
      id: "dom-uees-5",
      subject: "math",
      topicId: "functions",
      subtopicId: "domain-range",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 60,
      tags: ["domain", "rational-function", "excluded-value"],
      prerequisites: ["notation"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "8 · 5",
        page: 11,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\mathbb{R} - \\{1\\}$`, `$\\mathbb{R} - \\{1\\}$`), correct: true },
        { id: "b", text: L(`$\\mathbb{R}$`, `$\\mathbb{R}$`), correct: false },
        { id: "c", text: L(`$\\mathbb{R} - \\{-1\\}$`, `$\\mathbb{R} - \\{-1\\}$`), correct: false },
        { id: "d", text: L(`$[1, \\infty)$`, `$[1, \\infty)$`), correct: false },
      ];
      return {
        skill: L(
          "Dominio de un cociente con un hueco simple",
          "Domain of a quotient with a single hole",
        ),
        statement: L(
          "Halle el dominio de la función:\n\n$$f(x) = \\dfrac{6}{x - 1}$$",
          "Find the domain of the function:\n\n$$f(x) = \\dfrac{6}{x - 1}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El dominio son todos los $x$ para los que la fórmula produce un número real: busca la operación que puede fallar.",
            "The domain is all $x$ for which the formula produces a real number: look for the operation that can fail.",
          ),
          L(
            "Aquí la única restricción posible es el denominador: se pide $x - 1 \\ne 0$.",
            "Here the only possible restriction is the denominator: we need $x - 1 \\ne 0$.",
          ),
          L(
            "¿Qué valor de $x$ hace cero al denominador? Ese único valor se saca; todos los demás se quedan.",
            "Which value of $x$ makes the denominator zero? Remove exactly that value; all the others stay.",
          ),
        ],
        answerDisplay: L(
          "$\\mathrm{Dom}(f) = \\mathbb{R} - \\{1\\}$",
          "$\\mathrm{Dom}(f) = \\mathbb{R} - \\{1\\}$",
        ),
        solution: [
          step(
            "given",
            "$f(x) = \\dfrac{6}{x - 1}$: un cociente cuyo denominador se anula en un punto.",
            "$f(x) = \\dfrac{6}{x - 1}$: a quotient whose denominator vanishes at one point.",
          ),
          step(
            "approach",
            "Una división sólo falla cuando el denominador es cero: imponemos $x - 1 \\ne 0$; todo lo demás está permitido.",
            "A division fails only when the denominator is zero: we require $x - 1 \\ne 0$; everything else is allowed.",
          ),
          step(
            "calculation",
            "$x - 1 = 0 \\iff x = 1$: ése es el único valor excluido. El numerador $6$ nunca es problema.",
            "$x - 1 = 0 \\iff x = 1$: that is the only excluded value. The numerator $6$ is never a problem.",
          ),
          step(
            "result",
            "El dominio es $\\mathbb{R} - \\{1\\}$: todos los reales menos el punto donde el denominador se anula. Verificación: con $x = 1$ habría que calcular $\\dfrac{6}{0}$, división entre cero ✗; en cambio $f(0) = \\dfrac{6}{-1} = -6$ ✓ y $f(2) = \\dfrac{6}{1} = 6$ ✓.",
            "The domain is $\\mathbb{R} - \\{1\\}$: all reals except the point where the denominator vanishes. Check: at $x = 1$ we would need $\\dfrac{6}{0}$, division by zero ✗; by contrast $f(0) = \\dfrac{6}{-1} = -6$ ✓ and $f(2) = \\dfrac{6}{1} = 6$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S8 #6 — x/5: denominador constante; la división NUNCA falla. Distractores:
     ℝ−{5} (hueco inventado), ℝ−{0} y (0,∞). */
  template(
    {
      id: "dom-uees-6",
      subject: "math",
      topicId: "functions",
      subtopicId: "domain-range",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 60,
      tags: ["domain", "rational-function", "constant-denominator"],
      prerequisites: ["notation"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "8 · 6",
        page: 11,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\mathbb{R}$`, `$\\mathbb{R}$`), correct: true },
        { id: "b", text: L(`$\\mathbb{R} - \\{5\\}$`, `$\\mathbb{R} - \\{5\\}$`), correct: false },
        { id: "c", text: L(`$\\mathbb{R} - \\{0\\}$`, `$\\mathbb{R} - \\{0\\}$`), correct: false },
        { id: "d", text: L(`$(0, \\infty)$`, `$(0, \\infty)$`), correct: false },
      ];
      return {
        skill: L(
          "Dominio de un cociente con denominador constante",
          "Domain of a quotient with a constant denominator",
        ),
        statement: L(
          "Halle el dominio de la función:\n\n$$g(x) = \\dfrac{x}{5}$$",
          "Find the domain of the function:\n\n$$g(x) = \\dfrac{x}{5}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Busca la operación que puede fallar: ¿hay raíces? ¿Puede el denominador ser cero?",
            "Look for the operation that can fail: are there radicals? Can the denominator be zero?",
          ),
          L(
            "El denominador es la constante $5$, que nunca es cero; y la fórmula no tiene raíces.",
            "The denominator is the constant $5$, which is never zero; and the formula has no radicals.",
          ),
          L(
            "¿Existe algún $x$ que deba excluirse? Si ningún valor falla, no hay agujeros ni extremos.",
            "Is there any $x$ that must be excluded? If no value fails, there are neither holes nor endpoints.",
          ),
        ],
        answerDisplay: L(
          "$\\mathrm{Dom}(g) = \\mathbb{R}$",
          "$\\mathrm{Dom}(g) = \\mathbb{R}$",
        ),
        solution: [
          step(
            "given",
            "$g(x) = \\dfrac{x}{5}$: el denominador es la constante $5$ (no depende de $x$).",
            "$g(x) = \\dfrac{x}{5}$: the denominator is the constant $5$ (it does not depend on $x$).",
          ),
          step(
            "approach",
            "Sólo una división puede fallar, y sólo si el denominador es cero; además no hay radicandos que exijan nada.",
            "Only a division can fail, and only if the denominator is zero; besides, there is no radicand to constrain anything.",
          ),
          step(
            "calculation",
            "El denominador es $5 \\ne 0$ para todo $x$; no hay raíces ni otras restricciones: ningún real queda excluido.",
            "The denominator is $5 \\ne 0$ for every $x$; there are no radicals or other restrictions: no real number is excluded.",
          ),
          step(
            "result",
            "El dominio es $\\mathbb{R}$: dividir entre la constante $5$ nunca falla, sea cual sea el numerador. Verificación: $g(0) = 0$ ✓, $g(10) = 2$ ✓ y $g(-5) = -1$ ✓ — cualquier entrada produce un cociente válido.",
            "The domain is $\\mathbb{R}$: dividing by the constant $5$ never fails, whatever the numerator. Check: $g(0) = 0$ ✓, $g(10) = 2$ ✓ and $g(-5) = -1$ ✓ — any input yields a valid quotient.",
          ),
        ],
      };
    },
  ),

  /* S8 #7 — √(x−3): el extremo SÍ entra (√0 = 0). Distractores: (3,∞)
     (corchete olvidado), ℝ y [−3,∞) (signo). */
  template(
    {
      id: "dom-uees-7",
      subject: "math",
      topicId: "functions",
      subtopicId: "domain-range",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 75,
      tags: ["domain", "square-root", "endpoint-included"],
      prerequisites: ["notation"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "8 · 7",
        page: 11,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$[3, \\infty)$`, `$[3, \\infty)$`), correct: true },
        { id: "b", text: L(`$(3, \\infty)$`, `$(3, \\infty)$`), correct: false },
        { id: "c", text: L(`$\\mathbb{R}$`, `$\\mathbb{R}$`), correct: false },
        { id: "d", text: L(`$[-3, \\infty)$`, `$[-3, \\infty)$`), correct: false },
      ];
      return {
        skill: L(
          "Dominio de una raíz cuadrada (extremo incluido)",
          "Domain of a square root (endpoint included)",
        ),
        statement: L(
          "Halle el dominio de la función:\n\n$$h(x) = \\sqrt{x - 3}$$",
          "Find the domain of the function:\n\n$$h(x) = \\sqrt{x - 3}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Una raíz cuadrada sólo existe cuando su radicando es $\\ge 0$.",
            "A square root exists only when its radicand is $\\ge 0$.",
          ),
          L(
            "Plantea la desigualdad: $x - 3 \\ge 0$.",
            "Set up the inequality: $x - 3 \\ge 0$.",
          ),
          L(
            "¿Entra el extremo? Comprueba con $x = 3$: como $\\sqrt{0} = 0$ sí existe, el $x = 3$ SÍ pertenece al dominio.",
            "Does the endpoint enter? Test $x = 3$: since $\\sqrt{0} = 0$ does exist, $x = 3$ DOES belong to the domain.",
          ),
        ],
        answerDisplay: L(
          "$\\mathrm{Dom}(h) = [3, \\infty)$",
          "$\\mathrm{Dom}(h) = [3, \\infty)$",
        ),
        solution: [
          step(
            "given",
            "$h(x) = \\sqrt{x - 3}$: una raíz cuadrada con radicando lineal.",
            "$h(x) = \\sqrt{x - 3}$: a square root with a linear radicand.",
          ),
          step(
            "approach",
            "La raíz existe exactamente cuando el radicando es no negativo: $x - 3 \\ge 0$.",
            "The root exists exactly when the radicand is non-negative: $x - 3 \\ge 0$.",
          ),
          step(
            "calculation",
            "$x - 3 \\ge 0 \\iff x \\ge 3$: el dominio son los reales desde $3$ en adelante, extremo incluido.",
            "$x - 3 \\ge 0 \\iff x \\ge 3$: the domain is the reals from $3$ onwards, endpoint included.",
          ),
          step(
            "result",
            "El dominio es $[3, \\infty)$, con corchete en el $3$. Verificación: $h(3) = \\sqrt{0} = 0$ ✓ (por eso el corchete); $h(4) = 1$ ✓; en cambio $h(2) = \\sqrt{-1}$ no es un número real ✗.",
            "The domain is $[3, \\infty)$, with a bracket at $3$. Check: $h(3) = \\sqrt{0} = 0$ ✓ (hence the bracket); $h(4) = 1$ ✓; on the other hand $h(2) = \\sqrt{-1}$ is not a real number ✗.",
          ),
        ],
      };
    },
  ),

  /* S8 #8 — 1/√(z−1): raíz EN el denominador → desigualdad ESTRICTA (el ítem
     case-analysis de la sección). Distractores: [1,∞) (la trampa: z=1 da 1/0),
     ℝ−{1} (como si la raíz no importara) y (0,∞). */
  template(
    {
      id: "dom-uees-8",
      subject: "math",
      topicId: "functions",
      subtopicId: "domain-range",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 180,
      tags: ["domain", "square-root", "denominator", "strict-inequality"],
      prerequisites: ["notation"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "8 · 8",
        page: 11,
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$(1, \\infty)$`, `$(1, \\infty)$`), correct: true },
        { id: "b", text: L(`$[1, \\infty)$`, `$[1, \\infty)$`), correct: false },
        { id: "c", text: L(`$\\mathbb{R} - \\{1\\}$`, `$\\mathbb{R} - \\{1\\}$`), correct: false },
        { id: "d", text: L(`$(0, \\infty)$`, `$(0, \\infty)$`), correct: false },
      ];
      return {
        skill: L(
          "Dominio con raíz en el denominador (desigualdad estricta)",
          "Domain with a radical in the denominator (strict inequality)",
        ),
        statement: L(
          "Halle el dominio de la función:\n\n$$K(z) = \\dfrac{1}{\\sqrt{z - 1}}$$",
          "Find the domain of the function:\n\n$$K(z) = \\dfrac{1}{\\sqrt{z - 1}}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Hay DOS condiciones simultáneas: la raíz debe existir y, además, esa raíz está en el denominador.",
            "There are TWO simultaneous conditions: the radical must exist and, on top of that, it sits in the denominator.",
          ),
          L(
            "Como radicando se pide $z - 1 \\ge 0$; como denominador, $\\sqrt{z - 1} \\ne 0$. La intersección de ambas es una desigualdad ESTRICTA.",
            "As a radicand we need $z - 1 \\ge 0$; as a denominator, $\\sqrt{z - 1} \\ne 0$. The intersection of both is a STRICT inequality.",
          ),
          L(
            "¿Qué pasa si $z = 1$? El denominador valdría $\\sqrt{0} = 0$: división entre cero. El extremo NO entra.",
            "What happens at $z = 1$? The denominator would be $\\sqrt{0} = 0$: division by zero. The endpoint does NOT enter.",
          ),
        ],
        answerDisplay: L(
          "$\\mathrm{Dom}(K) = (1, \\infty)$",
          "$\\mathrm{Dom}(K) = (1, \\infty)$",
        ),
        solution: [
          step(
            "given",
            "$K(z) = \\dfrac{1}{\\sqrt{z - 1}}$: la raíz está, a su vez, en el denominador.",
            "$K(z) = \\dfrac{1}{\\sqrt{z - 1}}$: the radical itself sits in the denominator.",
          ),
          step(
            "approach",
            "Se cruzan dos condiciones: radicando $\\ge 0$ (que exista la raíz) y denominador $\\ne 0$ (que exista el cociente).",
            "Two conditions intersect: radicand $\\ge 0$ (the root exists) and denominator $\\ne 0$ (the quotient exists).",
          ),
          step(
            "calculation",
            "$z - 1 \\ge 0$ da $z \\ge 1$; y $\\sqrt{z - 1} \\ne 0$ equivale a $z \\ne 1$. Intersección: $z > 1$, estricto.",
            "$z - 1 \\ge 0$ gives $z \\ge 1$; and $\\sqrt{z - 1} \\ne 0$ is the same as $z \\ne 1$. Intersection: $z > 1$, strict.",
          ),
          step(
            "result",
            "El dominio es $(1, \\infty)$, con paréntesis en el $1$. Verificación: $K(2) = \\dfrac{1}{\\sqrt{1}} = 1$ ✓; $K(1)$ exigiría $\\dfrac{1}{0}$ ✗ (ésta es la trampa del corchete $[1, \\infty)$); y $K(0)$ exigiría $\\sqrt{-1}$ ✗.",
            "The domain is $(1, \\infty)$, with a parenthesis at $1$. Check: $K(2) = \\dfrac{1}{\\sqrt{1}} = 1$ ✓; $K(1)$ would demand $\\dfrac{1}{0}$ ✗ (this is the trap behind the bracket $[1, \\infty)$); and $K(0)$ would demand $\\sqrt{-1}$ ✗.",
          ),
        ],
      };
    },
  ),

  /* S8 #9 — polinomio en z: dominio todo ℝ. Distractores: ℝ−{0}, [0,∞) y
     ℝ−{4} (restricciones inventadas). */
  template(
    {
      id: "dom-uees-9",
      subject: "math",
      topicId: "functions",
      subtopicId: "domain-range",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 60,
      tags: ["domain", "polynomial"],
      prerequisites: ["notation"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "8 · 9",
        page: 11,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\mathbb{R}$`, `$\\mathbb{R}$`), correct: true },
        { id: "b", text: L(`$\\mathbb{R} - \\{0\\}$`, `$\\mathbb{R} - \\{0\\}$`), correct: false },
        { id: "c", text: L(`$[0, \\infty)$`, `$[0, \\infty)$`), correct: false },
        { id: "d", text: L(`$\\mathbb{R} - \\{4\\}$`, `$\\mathbb{R} - \\{4\\}$`), correct: false },
      ];
      return {
        skill: L(
          "Dominio de un polinomio",
          "Domain of a polynomial",
        ),
        statement: L(
          "Halle el dominio de la función:\n\n$$f(z) = 3z^2 + 2z - 4$$",
          "Find the domain of the function:\n\n$$f(z) = 3z^2 + 2z - 4$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "¿Qué operaciones de la fórmula pueden fallar? Repasa término a término.",
            "Which operations of the formula can fail? Go through it term by term.",
          ),
          L(
            "Sólo hay sumas y productos con potencias enteras: no hay divisiones ni raíces.",
            "There are only additions and products with whole-number powers: no divisions and no radicals.",
          ),
          L(
            "Un polinomio está definido en todo $\\mathbb{R}$: no tiene agujeros ni extremos.",
            "A polynomial is defined on all of $\\mathbb{R}$: it has neither holes nor endpoints.",
          ),
        ],
        answerDisplay: L(
          "$\\mathrm{Dom}(f) = \\mathbb{R}$",
          "$\\mathrm{Dom}(f) = \\mathbb{R}$",
        ),
        solution: [
          step(
            "given",
            "$f(z) = 3z^2 + 2z - 4$: un polinomio cuadrático en la variable $z$.",
            "$f(z) = 3z^2 + 2z - 4$: a quadratic polynomial in the variable $z$.",
          ),
          step(
            "approach",
            "Buscamos operaciones que puedan fallar (división entre cero, raíz de un negativo); en un polinomio no hay ninguna.",
            "We look for operations that can fail (division by zero, root of a negative); a polynomial contains none.",
          ),
          step(
            "calculation",
            "Sólo aparecen $3z^2$, $2z$ y $-4$: sumas y productos, definidos para cualquier $z$ real. Nada queda excluido.",
            "Only $3z^2$, $2z$ and $-4$ appear: additions and products, defined for every real $z$. Nothing is excluded.",
          ),
          step(
            "result",
            "El dominio es $\\mathbb{R}$: todo polinomio (de cualquier grado) acepta cualquier entrada real. Verificación: $f(0) = -4$ ✓, $f(1) = 1$ ✓ y $f(-2) = 12 - 4 - 4 = 4$ ✓ — cualquier $z$ produce un valor.",
            "The domain is $\\mathbb{R}$: every polynomial (of any degree) accepts any real input. Check: $f(0) = -4$ ✓, $f(1) = 1$ ✓ and $f(-2) = 12 - 4 - 4 = 4$ ✓ — any $z$ produces a value.",
          ),
        ],
      };
    },
  ),

  /* S8 #10 — x²/(x+3): hueco en x=−3 (¡signo!). Distractores: ℝ, ℝ−{3}
     (signo) y [−3,∞). */
  template(
    {
      id: "dom-uees-10",
      subject: "math",
      topicId: "functions",
      subtopicId: "domain-range",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 75,
      tags: ["domain", "rational-function", "excluded-value"],
      prerequisites: ["notation"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "8 · 10",
        page: 11,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\mathbb{R} - \\{-3\\}$`, `$\\mathbb{R} - \\{-3\\}$`), correct: true },
        { id: "b", text: L(`$\\mathbb{R}$`, `$\\mathbb{R}$`), correct: false },
        { id: "c", text: L(`$\\mathbb{R} - \\{3\\}$`, `$\\mathbb{R} - \\{3\\}$`), correct: false },
        { id: "d", text: L(`$[-3, \\infty)$`, `$[-3, \\infty)$`), correct: false },
      ];
      return {
        skill: L(
          "Dominio de un cociente cuidando el signo del hueco",
          "Domain of a quotient, watching the sign of the hole",
        ),
        statement: L(
          "Halle el dominio de la función:\n\n$$H(x) = \\dfrac{x^2}{x + 3}$$",
          "Find the domain of the function:\n\n$$H(x) = \\dfrac{x^2}{x + 3}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "La única restricción es el denominador: $x + 3 \\ne 0$; el numerador $x^2$ no importa.",
            "The only restriction is the denominator: $x + 3 \\ne 0$; the numerator $x^2$ does not matter.",
          ),
          L(
            "Resuelve $x + 3 = 0$ cuidando el signo al despejar.",
            "Solve $x + 3 = 0$ minding the sign when isolating.",
          ),
          L(
            "¿Qué valor de $x$ hace cero al denominador? Ojo: es un valor NEGATIVO, no $x = 3$.",
            "Which value of $x$ makes the denominator zero? Careful: it is a NEGATIVE value, not $x = 3$.",
          ),
        ],
        answerDisplay: L(
          "$\\mathrm{Dom}(H) = \\mathbb{R} - \\{-3\\}$",
          "$\\mathrm{Dom}(H) = \\mathbb{R} - \\{-3\\}$",
        ),
        solution: [
          step(
            "given",
            "$H(x) = \\dfrac{x^2}{x + 3}$: cociente con denominador lineal; el numerador es un cuadrado (nunca problema).",
            "$H(x) = \\dfrac{x^2}{x + 3}$: a quotient with a linear denominator; the numerator is a square (never a problem).",
          ),
          step(
            "approach",
            "Se pide $x + 3 \\ne 0$: resolvemos esa ecuación lineal para hallar el único valor excluido.",
            "We need $x + 3 \\ne 0$: solve that linear equation to find the only excluded value.",
          ),
          step(
            "calculation",
            "$x + 3 = 0 \\iff x = -3$: el hueco está en $x = -3$ (signo negativo, la trampa del ítem).",
            "$x + 3 = 0 \\iff x = -3$: the hole sits at $x = -3$ (negative sign, the item's trap).",
          ),
          step(
            "result",
            "El dominio es $\\mathbb{R} - \\{-3\\}$. Verificación: $H(-3)$ exigiría $\\dfrac{9}{0}$ ✗; en cambio $H(0) = 0$ ✓ y $H(3) = \\dfrac{9}{6} = \\tfrac{3}{2}$ ✓ — $x = 3$ es un punto perfectamente válido (la opción $\\mathbb{R} - \\{3\\}$ cambia el signo del hueco).",
            "The domain is $\\mathbb{R} - \\{-3\\}$. Check: $H(-3)$ would demand $\\dfrac{9}{0}$ ✗; by contrast $H(0) = 0$ ✓ and $H(3) = \\dfrac{9}{6} = \\tfrac{3}{2}$ ✓ — $x = 3$ is a perfectly valid point (the option $\\mathbb{R} - \\{3\\}$ flips the hole's sign).",
          ),
        ],
      };
    },
  ),

  /* S8 #11 — (9x−9)/(2x+7): hueco fraccionario −7/2; el cero del numerador
     (x=1) NO se excluye. Distractores: ℝ−{7/2} (signo), ℝ−{1} (cero del
     numerador) y ℝ. */
  template(
    {
      id: "dom-uees-11",
      subject: "math",
      topicId: "functions",
      subtopicId: "domain-range",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 90,
      tags: ["domain", "rational-function", "fractional-excluded-value"],
      prerequisites: ["notation"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "8 · 11",
        page: 11,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(`$\\mathbb{R} - \\left\\{-\\dfrac{7}{2}\\right\\}$`, `$\\mathbb{R} - \\left\\{-\\dfrac{7}{2}\\right\\}$`),
          correct: true,
        },
        {
          id: "b",
          text: L(`$\\mathbb{R} - \\left\\{\\dfrac{7}{2}\\right\\}$`, `$\\mathbb{R} - \\left\\{\\dfrac{7}{2}\\right\\}$`),
          correct: false,
        },
        { id: "c", text: L(`$\\mathbb{R} - \\{1\\}$`, `$\\mathbb{R} - \\{1\\}$`), correct: false },
        { id: "d", text: L(`$\\mathbb{R}$`, `$\\mathbb{R}$`), correct: false },
      ];
      return {
        skill: L(
          "Dominio con hueco fraccionario: el cero del numerador no importa",
          "Domain with a fractional hole: the numerator's zero does not matter",
        ),
        statement: L(
          "Halle el dominio de la función:\n\n$$f(x) = \\dfrac{9x - 9}{2x + 7}$$",
          "Find the domain of the function:\n\n$$f(x) = \\dfrac{9x - 9}{2x + 7}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Sólo el denominador restringe: $2x + 7 \\ne 0$. El numerador puede valer cero sin ningún problema.",
            "Only the denominator restricts: $2x + 7 \\ne 0$. The numerator may equal zero without any problem.",
          ),
          L(
            "Resuelve $2x + 7 = 0$: el hueco será un número fraccionario (y negativo).",
            "Solve $2x + 7 = 0$: the hole will be a fractional (and negative) number.",
          ),
          L(
            "El cero del numerador, $x = 1$, NO se excluye: ahí $f(1) = \\dfrac{0}{9} = 0$, perfectamente definido. Sólo cuenta el del denominador.",
            "The numerator's zero, $x = 1$, is NOT excluded: there $f(1) = \\dfrac{0}{9} = 0$, perfectly defined. Only the denominator's counts.",
          ),
        ],
        answerDisplay: L(
          "$\\mathrm{Dom}(f) = \\mathbb{R} - \\left\\{-\\dfrac{7}{2}\\right\\}$",
          "$\\mathrm{Dom}(f) = \\mathbb{R} - \\left\\{-\\dfrac{7}{2}\\right\\}$",
        ),
        solution: [
          step(
            "given",
            "$f(x) = \\dfrac{9x - 9}{2x + 7}$: cociente donde numerador y denominador se anulan en puntos distintos.",
            "$f(x) = \\dfrac{9x - 9}{2x + 7}$: a quotient where numerator and denominator vanish at different points.",
          ),
          step(
            "approach",
            "Sólo el denominador puede provocar la división entre cero; el numerador se anula en $x = 1$, pero eso sólo da $f(1) = 0$.",
            "Only the denominator can cause division by zero; the numerator vanishes at $x = 1$, but that merely gives $f(1) = 0$.",
          ),
          step(
            "calculation",
            "$2x + 7 = 0 \\iff x = -\\dfrac{7}{2}$: único valor excluido. El numerador $9x - 9$ se anula en $x = 1$, que NO se excluye ($f(1) = 0$, no una indeterminación).",
            "$2x + 7 = 0 \\iff x = -\\dfrac{7}{2}$: the only excluded value. The numerator $9x - 9$ vanishes at $x = 1$, which is NOT excluded ($f(1) = 0$, not an indetermination).",
          ),
          step(
            "result",
            "El dominio es $\\mathbb{R} - \\left\\{-\\dfrac{7}{2}\\right\\}$. Verificación: con $x = -\\dfrac{7}{2}$ el denominador es $0$ ✗; en cambio $f(1) = \\dfrac{0}{9} = 0$ ✓ (el cero del numerador no excluye nada) y $f(0) = \\dfrac{-9}{7}$ ✓.",
            "The domain is $\\mathbb{R} - \\left\\{-\\dfrac{7}{2}\\right\\}$. Check: at $x = -\\dfrac{7}{2}$ the denominator is $0$ ✗; by contrast $f(1) = \\dfrac{0}{9} = 0$ ✓ (the numerator's zero excludes nothing) and $f(0) = \\dfrac{-9}{7}$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S8 #12 — √(4x+3): extremo fraccionario −3/4 CON corchete. Distractores:
     (−3/4,∞) (corchete olvidado), ℝ y [3/4,∞) (signo). */
  template(
    {
      id: "dom-uees-12",
      subject: "math",
      topicId: "functions",
      subtopicId: "domain-range",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 90,
      tags: ["domain", "square-root", "fractional-endpoint"],
      prerequisites: ["notation"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "8 · 12",
        page: 11,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(`$\\left[-\\dfrac{3}{4}, \\infty\\right)$`, `$\\left[-\\dfrac{3}{4}, \\infty\\right)$`),
          correct: true,
        },
        {
          id: "b",
          text: L(`$\\left(-\\dfrac{3}{4}, \\infty\\right)$`, `$\\left(-\\dfrac{3}{4}, \\infty\\right)$`),
          correct: false,
        },
        { id: "c", text: L(`$\\mathbb{R}$`, `$\\mathbb{R}$`), correct: false },
        {
          id: "d",
          text: L(`$\\left[\\dfrac{3}{4}, \\infty\\right)$`, `$\\left[\\dfrac{3}{4}, \\infty\\right)$`),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Dominio de una raíz con extremo fraccionario",
          "Domain of a radical with a fractional endpoint",
        ),
        statement: L(
          "Halle el dominio de la función:\n\n$$g(x) = \\sqrt{4x + 3}$$",
          "Find the domain of the function:\n\n$$g(x) = \\sqrt{4x + 3}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "La raíz exige radicando no negativo: plantea $4x + 3 \\ge 0$.",
            "The root requires a non-negative radicand: set up $4x + 3 \\ge 0$.",
          ),
          L(
            "Despeja: $x \\ge -\\dfrac{3}{4}$ — cuidado con el signo al dividir entre $4$.",
            "Isolate: $x \\ge -\\dfrac{3}{4}$ — mind the sign when dividing by $4$.",
          ),
          L(
            "¿Entra el extremo? Allí la raíz vale $\\sqrt{0} = 0$, que sí existe: va con corchete.",
            "Does the endpoint enter? There the root equals $\\sqrt{0} = 0$, which does exist: it goes with a bracket.",
          ),
        ],
        answerDisplay: L(
          "$\\mathrm{Dom}(g) = \\left[-\\dfrac{3}{4}, \\infty\\right)$",
          "$\\mathrm{Dom}(g) = \\left[-\\dfrac{3}{4}, \\infty\\right)$",
        ),
        solution: [
          step(
            "given",
            "$g(x) = \\sqrt{4x + 3}$: raíz cuadrada con radicando lineal de coeficiente $4$.",
            "$g(x) = \\sqrt{4x + 3}$: a square root with a linear radicand of coefficient $4$.",
          ),
          step(
            "approach",
            "El radicando debe ser $\\ge 0$; despejamos la desigualdad y decidimos después si el extremo entra.",
            "The radicand must be $\\ge 0$; we solve the inequality and afterwards decide whether the endpoint enters.",
          ),
          step(
            "calculation",
            "$4x + 3 \\ge 0 \\iff x \\ge -\\dfrac{3}{4}$: el dominio empieza en $-\\dfrac{3}{4}$, y ese punto SÍ entra porque $g\\left(-\\dfrac{3}{4}\\right) = \\sqrt{0} = 0$ existe.",
            "$4x + 3 \\ge 0 \\iff x \\ge -\\dfrac{3}{4}$: the domain starts at $-\\dfrac{3}{4}$, and that point DOES enter because $g\\left(-\\dfrac{3}{4}\\right) = \\sqrt{0} = 0$ exists.",
          ),
          step(
            "result",
            "El dominio es $\\left[-\\dfrac{3}{4}, \\infty\\right)$, con corchete a la izquierda. Verificación: $g\\left(-\\dfrac{3}{4}\\right) = \\sqrt{0} = 0$ ✓ (por eso el corchete); $g(0) = \\sqrt{3}$ ✓; en cambio $g(-1) = \\sqrt{-1}$ no es real ✗.",
            "The domain is $\\left[-\\dfrac{3}{4}, \\infty\\right)$, with a bracket on the left. Check: $g\\left(-\\dfrac{3}{4}\\right) = \\sqrt{0} = 0$ ✓ (hence the bracket); $g(0) = \\sqrt{3}$ ✓; on the other hand $g(-1) = \\sqrt{-1}$ is not real ✗.",
          ),
        ],
      };
    },
  ),

  /* S8 #13 — 4/(y²−4y+4): el denominador es (y−2)² → UN SOLO agujero (raíz
     doble). Distractores: ℝ−{2,−2} (como si fuera y²−4), ℝ−{4} y ℝ. Hint 3
     del brief: «factoriza el denominador: ¿cuántas raíces tiene (y−2)²?». */
  template(
    {
      id: "dom-uees-13",
      subject: "math",
      topicId: "functions",
      subtopicId: "domain-range",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 210,
      tags: ["domain", "rational-function", "perfect-square-trinomial", "repeated-root"],
      prerequisites: ["notation", "factoring"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "8 · 13",
        page: 11,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\mathbb{R} - \\{2\\}$`, `$\\mathbb{R} - \\{2\\}$`), correct: true },
        {
          id: "b",
          text: L(`$\\mathbb{R} - \\{2, -2\\}$`, `$\\mathbb{R} - \\{2, -2\\}$`),
          correct: false,
        },
        { id: "c", text: L(`$\\mathbb{R} - \\{4\\}$`, `$\\mathbb{R} - \\{4\\}$`), correct: false },
        { id: "d", text: L(`$\\mathbb{R}$`, `$\\mathbb{R}$`), correct: false },
      ];
      return {
        skill: L(
          "Dominio con denominador cuadrado perfecto: un solo hueco",
          "Domain with a perfect-square denominator: a single hole",
        ),
        statement: L(
          "Halle el dominio de la función:\n\n$$g(y) = \\dfrac{4}{y^2 - 4y + 4}$$",
          "Find the domain of the function:\n\n$$g(y) = \\dfrac{4}{y^2 - 4y + 4}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Antes de decidir cuántos huecos hay, factoriza el denominador.",
            "Before deciding how many holes there are, factor the denominator.",
          ),
          L(
            "El denominador $y^2 - 4y + 4$ es un trinomio cuadrado perfecto.",
            "The denominator $y^2 - 4y + 4$ is a perfect-square trinomial.",
          ),
          L(
            "Factoriza el denominador: ¿cuántas raíces tiene $(y - 2)^2$?",
            "Factor the denominator: how many roots does $(y - 2)^2$ have?",
          ),
        ],
        answerDisplay: L(
          "$\\mathrm{Dom}(g) = \\mathbb{R} - \\{2\\}$",
          "$\\mathrm{Dom}(g) = \\mathbb{R} - \\{2\\}$",
        ),
        solution: [
          step(
            "given",
            "$g(y) = \\dfrac{4}{y^2 - 4y + 4}$: el denominador es un trinomio cuadrático que aún no está factorizado.",
            "$g(y) = \\dfrac{4}{y^2 - 4y + 4}$: the denominator is a quadratic trinomial not yet factored.",
          ),
          step(
            "approach",
            "Factorizamos el denominador para contar sus raíces DISTINTAS: cada raíz distinta es un hueco.",
            "We factor the denominator to count its DISTINCT roots: each distinct root is one hole.",
          ),
          step(
            "calculation",
            "$y^2 - 4y + 4 = (y - 2)^2$: raíz doble $y = 2$, pero es UNA sola raíz distinta → un único hueco (no dos, como ocurriría con $y^2 - 4 = (y-2)(y+2)$).",
            "$y^2 - 4y + 4 = (y - 2)^2$: a double root $y = 2$, but it is ONE single distinct root → a single hole (not two, as would happen with $y^2 - 4 = (y-2)(y+2)$).",
          ),
          step(
            "result",
            "El dominio es $\\mathbb{R} - \\{2\\}$: un solo agujero, aunque de multiplicidad dos. Verificación: $g(2)$ exigiría $\\dfrac{4}{0}$ ✗; en cambio $g(0) = \\dfrac{4}{4} = 1$ ✓ y $g(-2) = \\dfrac{4}{16} = \\tfrac{1}{4}$ ✓ — $y = -2$ NO está excluido (la opción $\\mathbb{R} - \\{2, -2\\}$ confunde $(y-2)^2$ con $y^2 - 4$).",
            "The domain is $\\mathbb{R} - \\{2\\}$: a single hole, albeit of multiplicity two. Check: $g(2)$ would demand $\\dfrac{4}{0}$ ✗; by contrast $g(0) = \\dfrac{4}{4} = 1$ ✓ and $g(-2) = \\dfrac{4}{16} = \\tfrac{1}{4}$ ✓ — $y = -2$ is NOT excluded (the option $\\mathbb{R} - \\{2, -2\\}$ confuses $(y-2)^2$ with $y^2 - 4$).",
          ),
        ],
      };
    },
  ),

  /* S8 #14 — (x+5)/(x²+x−6): denominador (x+3)(x−2) → DOS huecos.
     Distractores: ℝ−{−3} (sólo una raíz), ℝ−{2} y ℝ−{−3,−2,1} (factorización
     inventada). */
  template(
    {
      id: "dom-uees-14",
      subject: "math",
      topicId: "functions",
      subtopicId: "domain-range",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["domain", "rational-function", "factoring", "two-excluded-values"],
      prerequisites: ["notation", "factoring"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "8 · 14",
        page: 11,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(`$\\mathbb{R} - \\{-3, 2\\}$`, `$\\mathbb{R} - \\{-3, 2\\}$`),
          correct: true,
        },
        { id: "b", text: L(`$\\mathbb{R} - \\{-3\\}$`, `$\\mathbb{R} - \\{-3\\}$`), correct: false },
        { id: "c", text: L(`$\\mathbb{R} - \\{2\\}$`, `$\\mathbb{R} - \\{2\\}$`), correct: false },
        {
          id: "d",
          text: L(`$\\mathbb{R} - \\{-3, -2, 1\\}$`, `$\\mathbb{R} - \\{-3, -2, 1\\}$`),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Dominio con denominador cuadrático: dos huecos",
          "Domain with a quadratic denominator: two holes",
        ),
        statement: L(
          "Halle el dominio de la función:\n\n$$\\phi(x) = \\dfrac{x + 5}{x^2 + x - 6}$$",
          "Find the domain of the function:\n\n$$\\phi(x) = \\dfrac{x + 5}{x^2 + x - 6}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El denominador es cuadrático: factorízalo para ver sus raíces.",
            "The denominator is quadratic: factor it to see its roots.",
          ),
          L(
            "Busca dos números cuyo producto sea $-6$ y cuya suma sea $1$ (el coeficiente lineal).",
            "Look for two numbers whose product is $-6$ and whose sum is $1$ (the linear coefficient).",
          ),
          L(
            "¿Cuántas raíces DISTINTAS tiene el denominador? Cada una es un hueco; las del numerador no cuentan.",
            "How many DISTINCT roots does the denominator have? Each one is a hole; the numerator's do not count.",
          ),
        ],
        answerDisplay: L(
          "$\\mathrm{Dom}(\\phi) = \\mathbb{R} - \\{-3, 2\\}$",
          "$\\mathrm{Dom}(\\phi) = \\mathbb{R} - \\{-3, 2\\}$",
        ),
        solution: [
          step(
            "given",
            "$\\phi(x) = \\dfrac{x + 5}{x^2 + x - 6}$: el denominador es un trinomio cuadrático sin factorizar.",
            "$\\phi(x) = \\dfrac{x + 5}{x^2 + x - 6}$: the denominator is an unfactored quadratic trinomial.",
          ),
          step(
            "approach",
            "Factorizamos el denominador; sus raíces distintas son exactamente los huecos del dominio.",
            "We factor the denominator; its distinct roots are exactly the domain's holes.",
          ),
          step(
            "calculation",
            "$x^2 + x - 6 = (x + 3)(x - 2)$ → raíces $x = -3$ y $x = 2$: dos valores excluidos. El numerador $x + 5$ se anula en $x = -5$, que NO se excluye (allí $\\phi(-5) = 0$, definido).",
            "$x^2 + x - 6 = (x + 3)(x - 2)$ → roots $x = -3$ and $x = 2$: two excluded values. The numerator $x + 5$ vanishes at $x = -5$, which is NOT excluded (there $\\phi(-5) = 0$, defined).",
          ),
          step(
            "result",
            "El dominio es $\\mathbb{R} - \\{-3, 2\\}$. Verificación: $\\phi(-3)$ y $\\phi(2)$ exigen dividir entre cero ✗; en cambio $\\phi(-5) = \\dfrac{0}{25 - 5 - 6} = 0$ ✓, $\\phi(0) = \\dfrac{5}{-6}$ ✓ y $\\phi(-2) = \\dfrac{3}{4 - 2 - 6} = \\dfrac{3}{-4}$ ✓ — ni $-2$ ni $1$ están excluidos (la opción $\\mathbb{R} - \\{-3, -2, 1\\}$ no sale de ninguna factorización real).",
            "The domain is $\\mathbb{R} - \\{-3, 2\\}$. Check: $\\phi(-3)$ and $\\phi(2)$ demand division by zero ✗; by contrast $\\phi(-5) = \\dfrac{0}{25 - 5 - 6} = 0$ ✓, $\\phi(0) = \\dfrac{5}{-6}$ ✓ and $\\phi(-2) = \\dfrac{3}{4 - 2 - 6} = \\dfrac{3}{-4}$ ✓ — neither $-2$ nor $1$ is excluded (the option $\\mathbb{R} - \\{-3, -2, 1\\}$ comes from no real factorization).",
          ),
        ],
      };
    },
  ),

  /* S8 #15 — NORMALIZACIÓN: la hoja imprime h(s) = (3−x²)/(3x²−5s−2) mezclando
     s y x (VLM vlm-p-11: «h(s) = \frac{3-x^2}{3x^2 - 5x - 2}»); transcrita con
     una sola variable s como manda el brief. Denominador (3s+1)(s−2) → huecos
     −1/3 y 2. Distractores: ℝ−{1/3,2} (signo), ℝ−{2} (sólo una raíz) y
     ℝ−{−3,1/2} (factorización inventada). */
  template(
    {
      id: "dom-uees-15",
      subject: "math",
      topicId: "functions",
      subtopicId: "domain-range",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 210,
      tags: ["domain", "rational-function", "factoring", "leading-coefficient"],
      prerequisites: ["notation", "factoring"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "8 · 15",
        page: 11,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            `$\\mathbb{R} - \\left\\{-\\dfrac{1}{3}, 2\\right\\}$`,
            `$\\mathbb{R} - \\left\\{-\\dfrac{1}{3}, 2\\right\\}$`,
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            `$\\mathbb{R} - \\left\\{\\dfrac{1}{3}, 2\\right\\}$`,
            `$\\mathbb{R} - \\left\\{\\dfrac{1}{3}, 2\\right\\}$`,
          ),
          correct: false,
        },
        { id: "c", text: L(`$\\mathbb{R} - \\{2\\}$`, `$\\mathbb{R} - \\{2\\}$`), correct: false },
        {
          id: "d",
          text: L(
            `$\\mathbb{R} - \\left\\{-3, \\dfrac{1}{2}\\right\\}$`,
            `$\\mathbb{R} - \\left\\{-3, \\dfrac{1}{2}\\right\\}$`,
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Dominio con denominador cuadrático de coeficiente líder 3",
          "Domain with a quadratic denominator with leading coefficient 3",
        ),
        statement: L(
          "Halle el dominio de la función:\n\n$$h(s) = \\dfrac{3 - s^2}{3s^2 - 5s - 2}$$",
          "Find the domain of the function:\n\n$$h(s) = \\dfrac{3 - s^2}{3s^2 - 5s - 2}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Factoriza el denominador $3s^2 - 5s - 2$ para hallar sus raíces.",
            "Factor the denominator $3s^2 - 5s - 2$ to find its roots.",
          ),
          L(
            "Con coeficiente líder $3$: busca dos números cuyo producto sea $-6$ (el producto $3 \\cdot (-2)$) y cuya suma sea $-5$.",
            "With leading coefficient $3$: look for two numbers whose product is $-6$ (the product $3 \\cdot (-2)$) and whose sum is $-5$.",
          ),
          L(
            "Las dos raíces del denominador son una fracción y un entero — cuida el SIGNO de la fracción. El numerador no se excluye.",
            "The denominator's two roots are a fraction and an integer — mind the SIGN of the fraction. The numerator is not excluded.",
          ),
        ],
        answerDisplay: L(
          "$\\mathrm{Dom}(h) = \\mathbb{R} - \\left\\{-\\dfrac{1}{3}, 2\\right\\}$",
          "$\\mathrm{Dom}(h) = \\mathbb{R} - \\left\\{-\\dfrac{1}{3}, 2\\right\\}$",
        ),
        solution: [
          step(
            "given",
            "$h(s) = \\dfrac{3 - s^2}{3s^2 - 5s - 2}$: denominador cuadrático con coeficiente líder $3$ (la hoja mezcla s/x; se transcribe con la sola variable $s$).",
            "$h(s) = \\dfrac{3 - s^2}{3s^2 - 5s - 2}$: a quadratic denominator with leading coefficient $3$ (the sheet mixes s/x; transcribed with the single variable $s$).",
          ),
          step(
            "approach",
            "Factorizamos el denominador con el método de $ac$ ($a \\cdot c = -6$, suma $-5$); sus raíces son los huecos.",
            "We factor the denominator with the $ac$ method ($a \\cdot c = -6$, sum $-5$); its roots are the holes.",
          ),
          step(
            "calculation",
            "$3s^2 - 5s - 2 = (3s + 1)(s - 2)$ → raíces $s = -\\dfrac{1}{3}$ y $s = 2$: dos valores excluidos. El numerador $3 - s^2$ se anula en $s = \\pm\\sqrt{3}$, que NO se excluyen (allí $h = 0$, definido).",
            "$3s^2 - 5s - 2 = (3s + 1)(s - 2)$ → roots $s = -\\dfrac{1}{3}$ and $s = 2$: two excluded values. The numerator $3 - s^2$ vanishes at $s = \\pm\\sqrt{3}$, which are NOT excluded (there $h = 0$, defined).",
          ),
          step(
            "result",
            "El dominio es $\\mathbb{R} - \\left\\{-\\dfrac{1}{3}, 2\\right\\}$. Verificación: $h(2)$ y $h\\left(-\\dfrac{1}{3}\\right)$ dan denominador cero ✗; en cambio $h(0) = \\dfrac{3}{-2} = -\\dfrac{3}{2}$ ✓ y $h(-1) = \\dfrac{2}{3 + 5 - 2} = \\dfrac{2}{6} = \\dfrac{1}{3}$ ✓ — $s = \\dfrac{1}{3}$ (el signo del distractor) NO está excluido.",
            "The domain is $\\mathbb{R} - \\left\\{-\\dfrac{1}{3}, 2\\right\\}$. Check: $h(2)$ and $h\\left(-\\dfrac{1}{3}\\right)$ give a zero denominator ✗; by contrast $h(0) = \\dfrac{3}{-2} = -\\dfrac{3}{2}$ ✓ and $h(-1) = \\dfrac{2}{3 + 5 - 2} = \\dfrac{2}{6} = \\dfrac{1}{3}$ ✓ — $s = \\dfrac{1}{3}$ (the distractor's sign) is NOT excluded.",
          ),
        ],
      };
    },
  ),

  /* S8 #16 — 2/(r²+1): r²+1 > 0 SIEMPRE → dominio ℝ. Distractores: ℝ−{1},
     ℝ−{−1,1} (como si r²−1) y (0,∞). */
  template(
    {
      id: "dom-uees-16",
      subject: "math",
      topicId: "functions",
      subtopicId: "domain-range",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 75,
      tags: ["domain", "rational-function", "always-positive-denominator"],
      prerequisites: ["notation"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "8 · 16",
        page: 11,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\mathbb{R}$`, `$\\mathbb{R}$`), correct: true },
        { id: "b", text: L(`$\\mathbb{R} - \\{1\\}$`, `$\\mathbb{R} - \\{1\\}$`), correct: false },
        {
          id: "c",
          text: L(`$\\mathbb{R} - \\{-1, 1\\}$`, `$\\mathbb{R} - \\{-1, 1\\}$`),
          correct: false,
        },
        { id: "d", text: L(`$(0, \\infty)$`, `$(0, \\infty)$`), correct: false },
      ];
      return {
        skill: L(
          "Dominio con denominador siempre positivo",
          "Domain with an always-positive denominator",
        ),
        statement: L(
          "Halle el dominio de la función:\n\n$$G(r) = \\dfrac{2}{r^2 + 1}$$",
          "Find the domain of the function:\n\n$$G(r) = \\dfrac{2}{r^2 + 1}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Decide si el denominador $r^2 + 1$ puede anularse para algún $r$ real.",
            "Decide whether the denominator $r^2 + 1$ can vanish for some real $r$.",
          ),
          L(
            "$r^2 \\ge 0$ siempre, así que $r^2 + 1 \\ge 1 > 0$: nunca es cero (ni negativo).",
            "$r^2 \\ge 0$ always, so $r^2 + 1 \\ge 1 > 0$: it is never zero (nor negative).",
          ),
          L(
            "Si el denominador nunca se anula, no hay huecos: ningún real queda excluido.",
            "If the denominator never vanishes, there are no holes: no real number is excluded.",
          ),
        ],
        answerDisplay: L(
          "$\\mathrm{Dom}(G) = \\mathbb{R}$",
          "$\\mathrm{Dom}(G) = \\mathbb{R}$",
        ),
        solution: [
          step(
            "given",
            "$G(r) = \\dfrac{2}{r^2 + 1}$: cociente cuyo denominador es una suma de un cuadrado y $1$.",
            "$G(r) = \\dfrac{2}{r^2 + 1}$: a quotient whose denominator is a square plus $1$.",
          ),
          step(
            "approach",
            "El único riesgo sería $r^2 + 1 = 0$; decidimos si esa ecuación tiene solución real.",
            "The only risk would be $r^2 + 1 = 0$; we decide whether that equation has a real solution.",
          ),
          step(
            "calculation",
            "$r^2 \\ge 0 \\Rightarrow r^2 + 1 \\ge 1 > 0$ para todo $r$: el denominador nunca se anula (su discriminante es $0^2 - 4 \\cdot 1 \\cdot 1 = -4 < 0$).",
            "$r^2 \\ge 0 \\Rightarrow r^2 + 1 \\ge 1 > 0$ for every $r$: the denominator never vanishes (its discriminant is $0^2 - 4 \\cdot 1 \\cdot 1 = -4 < 0$).",
          ),
          step(
            "result",
            "El dominio es $\\mathbb{R}$. Verificación: $G(0) = \\dfrac{2}{1} = 2$ ✓, $G(1) = \\dfrac{2}{2} = 1$ ✓ y $G(-1) = 1$ ✓ — ni $r = 1$ ni $r = -1$ están excluidos: $r^2 + 1$ no tiene raíces reales (la opción $\\mathbb{R} - \\{-1, 1\\}$ la confunde con $r^2 - 1$).",
            "The domain is $\\mathbb{R}$. Check: $G(0) = \\dfrac{2}{1} = 2$ ✓, $G(1) = \\dfrac{2}{2} = 1$ ✓ and $G(-1) = 1$ ✓ — neither $r = 1$ nor $r = -1$ is excluded: $r^2 + 1$ has no real roots (the option $\\mathbb{R} - \\{-1, 1\\}$ confuses it with $r^2 - 1$).",
          ),
        ],
      };
    },
  ),

  /* S8 #9bis — k(z)=26: función constante; el 26 es el VALOR, no una
     restricción. Distractores: {26} (dominio↔rango), ℝ−{26} y [26,∞). */
  template(
    {
      id: "dom-uees-b9",
      subject: "math",
      topicId: "functions",
      subtopicId: "domain-range",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 60,
      tags: ["domain", "constant-function"],
      prerequisites: ["notation"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "8 · 9bis",
        page: 11,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\mathbb{R}$`, `$\\mathbb{R}$`), correct: true },
        { id: "b", text: L(`$\\{26\\}$`, `$\\{26\\}$`), correct: false },
        { id: "c", text: L(`$\\mathbb{R} - \\{26\\}$`, `$\\mathbb{R} - \\{26\\}$`), correct: false },
        { id: "d", text: L(`$[26, \\infty)$`, `$[26, \\infty)$`), correct: false },
      ];
      return {
        skill: L(
          "Dominio de una función constante",
          "Domain of a constant function",
        ),
        statement: L(
          "Halle el dominio de la función:\n\n$$k(z) = 26$$",
          "Find the domain of the function:\n\n$$k(z) = 26$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "¿Qué operaciones de la regla pueden fallar? La regla es sólo $k(z) = 26$.",
            "Which operations of the rule can fail? The rule is just $k(z) = 26$.",
          ),
          L(
            "No hay divisiones, raíces ni nada que dependa de $z$: la salida siempre es $26$.",
            "There are no divisions, radicals or anything depending on $z$: the output is always $26$.",
          ),
          L(
            "El $26$ es el VALOR de salida, no una restricción sobre la entrada: $k(0) = 26$ y también $k(100) = 26$.",
            "The $26$ is the output VALUE, not a restriction on the input: $k(0) = 26$ and also $k(100) = 26$.",
          ),
        ],
        answerDisplay: L(
          "$\\mathrm{Dom}(k) = \\mathbb{R}$",
          "$\\mathrm{Dom}(k) = \\mathbb{R}$",
        ),
        solution: [
          step(
            "given",
            "$k(z) = 26$: una función constante; la regla no menciona a $z$.",
            "$k(z) = 26$: a constant function; the rule never mentions $z$.",
          ),
          step(
            "approach",
            "Buscamos operaciones que puedan fallar; no hay ninguna, así que ningún real queda excluido.",
            "We look for operations that can fail; there are none, so no real number is excluded.",
          ),
          step(
            "calculation",
            "Cualquier entrada produce $26$: no existe ningún $z$ problemático. (Nótese: el RANGO sí es el conjunto unitario $\\{26\\}$.)",
            "Any input produces $26$: there is no problematic $z$. (Note: the RANGE is indeed the singleton $\\{26\\}$.)",
          ),
          step(
            "result",
            "El dominio es $\\mathbb{R}$. Verificación: $k(0) = 26$ ✓, $k(-100) = 26$ ✓ y $k(\\pi) = 26$ ✓ — la opción $\\{26\\}$ confunde el dominio con el rango.",
            "The domain is $\\mathbb{R}$. Check: $k(0) = 26$ ✓, $k(-100) = 26$ ✓ and $k(\\pi) = 26$ ✓ — the option $\\{26\\}$ confuses the domain with the range.",
          ),
        ],
      };
    },
  ),

  /* S8 #10bis — f(x)=√π: radicando constante positivo; π es el VALOR, no un
     extremo. Distractores: [π,∞), ℝ−{π} y (0,∞). */
  template(
    {
      id: "dom-uees-b10",
      subject: "math",
      topicId: "functions",
      subtopicId: "domain-range",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 60,
      tags: ["domain", "constant-function", "square-root"],
      prerequisites: ["notation"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "8 · 10bis",
        page: 11,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\mathbb{R}$`, `$\\mathbb{R}$`), correct: true },
        { id: "b", text: L(`$[\\pi, \\infty)$`, `$[\\pi, \\infty)$`), correct: false },
        { id: "c", text: L(`$\\mathbb{R} - \\{\\pi\\}$`, `$\\mathbb{R} - \\{\\pi\\}$`), correct: false },
        { id: "d", text: L(`$(0, \\infty)$`, `$(0, \\infty)$`), correct: false },
      ];
      return {
        skill: L(
          "Dominio de una raíz constante",
          "Domain of a constant radical",
        ),
        statement: L(
          "Halle el dominio de la función:\n\n$$f(x) = \\sqrt{\\pi}$$",
          "Find the domain of the function:\n\n$$f(x) = \\sqrt{\\pi}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Mira qué hay dentro de la raíz: ¿depende de $x$?",
            "Look at what sits inside the radical: does it depend on $x$?",
          ),
          L(
            "El radicando es la constante $\\pi > 0$: la raíz existe para cualquier $x$.",
            "The radicand is the constant $\\pi > 0$: the root exists for every $x$.",
          ),
          L(
            "$\\pi$ es el VALOR de la constante, no un extremo: $f(0) = \\sqrt{\\pi} \\approx 1{,}77$ sin problema.",
            "$\\pi$ is the constant's VALUE, not an endpoint: $f(0) = \\sqrt{\\pi} \\approx 1.77$ without any problem.",
          ),
        ],
        answerDisplay: L(
          "$\\mathrm{Dom}(f) = \\mathbb{R}$",
          "$\\mathrm{Dom}(f) = \\mathbb{R}$",
        ),
        solution: [
          step(
            "given",
            "$f(x) = \\sqrt{\\pi}$: la regla es una constante; el radicando no depende de $x$.",
            "$f(x) = \\sqrt{\\pi}$: the rule is a constant; the radicand does not depend on $x$.",
          ),
          step(
            "approach",
            "La raíz sólo fallaría si el radicando fuera negativo; aquí el radicando es la constante $\\pi$.",
            "The root would fail only if the radicand were negative; here the radicand is the constant $\\pi$.",
          ),
          step(
            "calculation",
            "$\\pi \\approx 3{,}14 > 0$ para todo $x$ (no depende de la entrada): la raíz existe siempre. (El valor de la función es la constante $\\sqrt{\\pi} \\approx 1{,}77$.)",
            "$\\pi \\approx 3.14 > 0$ for every $x$ (it does not depend on the input): the root always exists. (The function's value is the constant $\\sqrt{\\pi} \\approx 1.77$.)",
          ),
          step(
            "result",
            "El dominio es $\\mathbb{R}$. Verificación: $f(0) = \\sqrt{\\pi}$ ✓, $f(10) = \\sqrt{\\pi}$ ✓ y $f(-10) = \\sqrt{\\pi}$ ✓ — la opción $[\\pi, \\infty)$ confunde el valor de la función con su dominio.",
            "The domain is $\\mathbb{R}$. Check: $f(0) = \\sqrt{\\pi}$ ✓, $f(10) = \\sqrt{\\pi}$ ✓ and $f(-10) = \\sqrt{\\pi}$ ✓ — the option $[\\pi, \\infty)$ confuses the function's value with its domain.",
          ),
        ],
      };
    },
  ),

  /* S8 #11bis — a trozos 5x/4: ambas ramas juntas cubren todo ℝ. Distractores:
     (1,∞) (ignora la rama ≤), ℝ−{1} y [1,∞). */
  template(
    {
      id: "dom-uees-b11",
      subject: "math",
      topicId: "functions",
      subtopicId: "domain-range",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["domain", "piecewise"],
      prerequisites: ["notation", "piecewise"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "8 · 11bis",
        page: 11,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\mathbb{R}$`, `$\\mathbb{R}$`), correct: true },
        { id: "b", text: L(`$(1, \\infty)$`, `$(1, \\infty)$`), correct: false },
        { id: "c", text: L(`$\\mathbb{R} - \\{1\\}$`, `$\\mathbb{R} - \\{1\\}$`), correct: false },
        { id: "d", text: L(`$[1, \\infty)$`, `$[1, \\infty)$`), correct: false },
      ];
      return {
        skill: L(
          "Dominio de una función a trozos",
          "Domain of a piecewise function",
        ),
        statement: L(
          "Halle el dominio de la función:\n\n$$f(x) = \\begin{cases} 5x & \\text{si } x > 1 \\\\ 4 & \\text{si } x \\le 1 \\end{cases}$$",
          "Find the domain of the function:\n\n$$f(x) = \\begin{cases} 5x & \\text{if } x > 1 \\\\ 4 & \\text{if } x \\le 1 \\end{cases}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Una función a trozos está definida donde ALGUNA de sus ramas la cubre.",
            "A piecewise function is defined wherever ONE of its branches covers it.",
          ),
          L(
            "La rama de arriba cubre $x > 1$; la de abajo cubre $x \\le 1$. ¿Qué real queda sin cubrir?",
            "The upper branch covers $x > 1$; the lower one covers $x \\le 1$. Which real is left uncovered?",
          ),
          L(
            "¿Y $x = 1$ exactamente? Cumple la condición de abajo ($1 \\le 1$): lo cubre la segunda rama. Ningún real queda fuera.",
            "And what about $x = 1$ exactly? It satisfies the lower condition ($1 \\le 1$): the second branch covers it. No real is left out.",
          ),
        ],
        answerDisplay: L(
          "$\\mathrm{Dom}(f) = \\mathbb{R}$",
          "$\\mathrm{Dom}(f) = \\mathbb{R}$",
        ),
        solution: [
          step(
            "given",
            "$f$ definida a trozos: rama $5x$ para $x > 1$ y rama constante $4$ para $x \\le 1$.",
            "$f$ defined piecewise: branch $5x$ for $x > 1$ and constant branch $4$ for $x \\le 1$.",
          ),
          step(
            "approach",
            "Reunimos los reales que cubre cada rama; el dominio es esa unión.",
            "We gather the reals each branch covers; the domain is that union.",
          ),
          step(
            "calculation",
            "Rama 1: $(1, \\infty)$; rama 2: $(-\\infty, 1]$. Unión: $(1, \\infty) \\cup (-\\infty, 1] = \\mathbb{R}$ — el punto $x = 1$ lo cubre la rama 2 (condición $\\le$).",
            "Branch 1: $(1, \\infty)$; branch 2: $(-\\infty, 1]$. Union: $(1, \\infty) \\cup (-\\infty, 1] = \\mathbb{R}$ — the point $x = 1$ is covered by branch 2 (the $\\le$ condition).",
          ),
          step(
            "result",
            "El dominio es $\\mathbb{R}$: las dos ramas juntas cubren cada real exactamente una vez. Verificación: $f(2) = 10$ ✓, $f(1) = 4$ ✓ (rama 2, pues $1 \\le 1$), $f(0) = 4$ ✓ y $f(-3) = 4$ ✓ — la opción $(1, \\infty)$ ignora la rama del $\\le$.",
            "The domain is $\\mathbb{R}$: the two branches together cover each real exactly once. Check: $f(2) = 10$ ✓, $f(1) = 4$ ✓ (branch 2, since $1 \\le 1$), $f(0) = 4$ ✓ and $f(-3) = 4$ ✓ — the option $(1, \\infty)$ ignores the $\\le$ branch.",
          ),
        ],
      };
    },
  ),

  /* S8 #12bis — a trozos 4 (sólo x=3) / x² (1≤x<3): la unión [1,3)∪{3}
     colapsa en [1,3]. Distractores: [1,3) (olvida el punto suelto), {3} y
     (1,3). */
  template(
    {
      id: "dom-uees-b12",
      subject: "math",
      topicId: "functions",
      subtopicId: "domain-range",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 210,
      tags: ["domain", "piecewise", "isolated-point"],
      prerequisites: ["notation", "piecewise"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "8 · 12bis",
        page: 11,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$[1, 3]$`, `$[1, 3]$`), correct: true },
        { id: "b", text: L(`$[1, 3)$`, `$[1, 3)$`), correct: false },
        { id: "c", text: L(`$\\{3\\}$`, `$\\{3\\}$`), correct: false },
        { id: "d", text: L(`$(1, 3)$`, `$(1, 3)$`), correct: false },
      ];
      return {
        skill: L(
          "Dominio a trozos con un punto suelto",
          "Domain of a piecewise function with an isolated point",
        ),
        statement: L(
          "Halle el dominio de la función:\n\n$$f(x) = \\begin{cases} 4 & \\text{si } x = 3 \\\\ x^2 & \\text{si } 1 \\le x < 3 \\end{cases}$$",
          "Find the domain of the function:\n\n$$f(x) = \\begin{cases} 4 & \\text{if } x = 3 \\\\ x^2 & \\text{if } 1 \\le x < 3 \\end{cases}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Enumera qué reales cubre cada rama por separado.",
            "List which reals each branch covers, separately.",
          ),
          L(
            "La rama de abajo cubre $1 \\le x < 3$ (sin el $3$); la de arriba añade SÓLO el punto $x = 3$.",
            "The lower branch covers $1 \\le x < 3$ (without the $3$); the upper one adds ONLY the point $x = 3$.",
          ),
          L(
            "Escribe la unión de $[1, 3)$ con el punto suelto $\\{3\\}$: ¿cómo queda el intervalo resultante?",
            "Write the union of $[1, 3)$ with the isolated point $\\{3\\}$: what does the resulting interval look like?",
          ),
        ],
        answerDisplay: L(
          "$\\mathrm{Dom}(f) = [1, 3] = [1, 3) \\cup \\{3\\}$",
          "$\\mathrm{Dom}(f) = [1, 3] = [1, 3) \\cup \\{3\\}$",
        ),
        solution: [
          step(
            "given",
            "$f$ definida a trozos: rama constante $4$ sólo en el punto $x = 3$, y rama $x^2$ en $1 \\le x < 3$.",
            "$f$ defined piecewise: constant branch $4$ only at the point $x = 3$, and branch $x^2$ on $1 \\le x < 3$.",
          ),
          step(
            "approach",
            "Reunimos lo que cubre cada rama y unimos; el punto suelto también cuenta.",
            "We gather what each branch covers and unite; the isolated point counts too.",
          ),
          step(
            "calculation",
            "Rama 2: $[1, 3)$; rama 1: el punto aislado $\\{3\\}$. Unión: $[1, 3) \\cup \\{3\\} = [1, 3]$ — el punto suelto CIERRA el extremo derecho.",
            "Branch 2: $[1, 3)$; branch 1: the isolated point $\\{3\\}$. Union: $[1, 3) \\cup \\{3\\} = [1, 3]$ — the isolated point CLOSES the right endpoint.",
          ),
          step(
            "result",
            "El dominio es $[1, 3]$, con corchetes en ambos extremos: el izquierdo lo aporta la condición $1 \\le x$ y el derecho el punto aislado $x = 3$. Verificación: $f(1) = 1$ ✓, $f(2) = 4$ ✓ y $f(3) = 4$ ✓ (rama 1); en cambio $f(0)$ y $f(3{,}5)$ no pertenecen a ninguna rama ✗.",
            "The domain is $[1, 3]$, with brackets at both endpoints: the left one comes from the condition $1 \\le x$ and the right one from the isolated point $x = 3$. Check: $f(1) = 1$ ✓, $f(2) = 4$ ✓ and $f(3) = 4$ ✓ (branch 1); on the other hand $f(0)$ and $f(3.5)$ belong to no branch ✗.",
          ),
        ],
      };
    },
  ),

  /* S9 #17 — f(x)=2x+1: se pide el sub-valor instructivo f(−4); f(0) y f(3)
     van completamente resueltos en la solución. */
  template(
    {
      id: "ev-uees-17",
      subject: "math",
      topicId: "functions",
      subtopicId: "evaluation",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 60,
      tags: ["evaluation", "linear-function", "negative-input"],
      prerequisites: ["notation"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "9 · 17",
        page: 11,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L(
        "Evaluar una función lineal en un punto negativo",
        "Evaluating a linear function at a negative point",
      ),
      statement: L(
        "Dada la función, calcule el valor pedido:\n\n$$f(x) = 2x + 1; \\qquad f(0), \\; f(3), \\; f(-4)$$\n\n¿Cuánto vale $f(-4)$?",
        "Given the function, compute the requested value:\n\n$$f(x) = 2x + 1; \\qquad f(0), \\; f(3), \\; f(-4)$$\n\nWhat is $f(-4)$?",
      ),
      answer: {
        kind: "numeric",
        value: 2 * (-4) + 1, // = -7
        tolerance: { mode: "relative", value: 0.02 },
      },
      hints: [
        L(
          "Sustituye la $x$ por el argumento pedido, con su signo y entre paréntesis.",
          "Substitute $x$ by the requested argument, with its sign and in parentheses.",
        ),
        L(
          "Aquí el argumento es negativo: $f(-4) = 2 \\cdot (-4) + 1$.",
          "Here the argument is negative: $f(-4) = 2 \\cdot (-4) + 1$.",
        ),
        L(
          "Primero el producto con su signo: $2 \\cdot (-4) = -8$; después suma $1$.",
          "First the product with its sign: $2 \\cdot (-4) = -8$; then add $1$.",
        ),
      ],
      answerDisplay: L(
        "$f(-4) = -7$",
        "$f(-4) = -7$",
      ),
      solution: [
        step(
          "given",
          "$f(x) = 2x + 1$ con los valores pedidos $f(0)$, $f(3)$ y $f(-4)$.",
          "$f(x) = 2x + 1$ with the requested values $f(0)$, $f(3)$ and $f(-4)$.",
        ),
        step(
          "approach",
          "Cada valor se obtiene sustituyendo la $x$ por el argumento correspondiente, entre paréntesis para cuidar los signos.",
          "Each value comes from substituting $x$ by the corresponding argument, in parentheses to protect the signs.",
        ),
        step(
          "calculation",
          "$f(0) = 2 \\cdot 0 + 1 = 1$; $f(3) = 2 \\cdot 3 + 1 = 7$; y el pedido: $f(-4) = 2 \\cdot (-4) + 1 = -8 + 1 = -7$.",
          "$f(0) = 2 \\cdot 0 + 1 = 1$; $f(3) = 2 \\cdot 3 + 1 = 7$; and the requested one: $f(-4) = 2 \\cdot (-4) + 1 = -8 + 1 = -7$.",
        ),
        step(
          "result",
          "$f(-4) = -7$. Verificación: $2 \\cdot (-4) + 1 = -8 + 1 = -7$ ✓ (el signo del producto es la clave del ítem).",
          "$f(-4) = -7$. Check: $2 \\cdot (-4) + 1 = -8 + 1 = -7$ ✓ (the product's sign is the key to this item).",
        ),
      ],
    }),
  ),

  /* S9 #18 — H(s)=5s²−3: se pide H(2/3) = −7/9 ≈ −0,78 (el sub-valor no
     entero; «como decimal» en el enunciado, tol rel 0.02). H(4)=77 y
     H(√2)=7 van resueltos en la solución. */
  template(
    {
      id: "ev-uees-18",
      subject: "math",
      topicId: "functions",
      subtopicId: "evaluation",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 90,
      tags: ["evaluation", "quadratic-function", "fractional-input", "decimal-answer"],
      prerequisites: ["notation"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "9 · 18",
        page: 11,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L(
        "Evaluar una cuadrática en una entrada fraccionaria",
        "Evaluating a quadratic at a fractional input",
      ),
      statement: L(
        "Dada la función, calcule el valor pedido:\n\n$$H(s) = 5s^2 - 3; \\qquad H(4), \\; H\\left(\\sqrt{2}\\right), \\; H\\left(\\tfrac{2}{3}\\right)$$\n\n¿Cuánto vale $H\\left(\\tfrac{2}{3}\\right)$? (Escriba el resultado como decimal.)",
        "Given the function, compute the requested value:\n\n$$H(s) = 5s^2 - 3; \\qquad H(4), \\; H\\left(\\sqrt{2}\\right), \\; H\\left(\\tfrac{2}{3}\\right)$$\n\nWhat is $H\\left(\\tfrac{2}{3}\\right)$? (Give your answer as a decimal.)",
      ),
      answer: {
        kind: "numeric",
        value: 5 * (2 / 3) ** 2 - 3, // = -7/9 ≈ -0.78
        tolerance: { mode: "relative", value: 0.02 },
      },
      hints: [
        L(
          "Sustituye la $s$ por $\\tfrac{2}{3}$; el cuadrado va con paréntesis: $\\left(\\tfrac{2}{3}\\right)^2$.",
          "Substitute $s$ by $\\tfrac{2}{3}$; the square goes with parentheses: $\\left(\\tfrac{2}{3}\\right)^2$.",
        ),
        L(
          "$\\left(\\tfrac{2}{3}\\right)^2 = \\tfrac{4}{9}$, así que $H\\left(\\tfrac{2}{3}\\right) = 5 \\cdot \\tfrac{4}{9} - 3$.",
          "$\\left(\\tfrac{2}{3}\\right)^2 = \\tfrac{4}{9}$, so $H\\left(\\tfrac{2}{3}\\right) = 5 \\cdot \\tfrac{4}{9} - 3$.",
        ),
        L(
          "Calcula $5 \\cdot \\tfrac{4}{9} = \\tfrac{20}{9}$ y resta $3 = \\tfrac{27}{9}$: el resultado es negativo. Exprésalo como decimal con dos cifras.",
          "Compute $5 \\cdot \\tfrac{4}{9} = \\tfrac{20}{9}$ and subtract $3 = \\tfrac{27}{9}$: the result is negative. Write it as a decimal with two digits.",
        ),
      ],
      answerDisplay: L(
        "$H\\left(\\tfrac{2}{3}\\right) = -\\dfrac{7}{9} \\approx -0{,}78$",
        "$H\\left(\\tfrac{2}{3}\\right) = -\\dfrac{7}{9} \\approx -0.78$",
      ),
      solution: [
        step(
          "given",
          "$H(s) = 5s^2 - 3$ con los valores pedidos $H(4)$, $H\\left(\\sqrt{2}\\right)$ y $H\\left(\\tfrac{2}{3}\\right)$.",
          "$H(s) = 5s^2 - 3$ with the requested values $H(4)$, $H\\left(\\sqrt{2}\\right)$ and $H\\left(\\tfrac{2}{3}\\right)$.",
        ),
        step(
          "approach",
          "Cada valor sale de sustituir la $s$; en el pedido, el cuadrado de la fracción se calcula primero y con paréntesis.",
          "Each value comes from substituting $s$; in the requested one, the square of the fraction is computed first and in parentheses.",
        ),
        step(
          "calculation",
          "$H(4) = 5 \\cdot 16 - 3 = 77$; $H\\left(\\sqrt{2}\\right) = 5 \\cdot 2 - 3 = 7$; y la pedida: $H\\left(\\tfrac{2}{3}\\right) = 5 \\cdot \\tfrac{4}{9} - 3 = \\tfrac{20}{9} - \\tfrac{27}{9} = -\\tfrac{7}{9}$.",
          "$H(4) = 5 \\cdot 16 - 3 = 77$; $H\\left(\\sqrt{2}\\right) = 5 \\cdot 2 - 3 = 7$; and the requested one: $H\\left(\\tfrac{2}{3}\\right) = 5 \\cdot \\tfrac{4}{9} - 3 = \\tfrac{20}{9} - \\tfrac{27}{9} = -\\tfrac{7}{9}$.",
        ),
        step(
          "result",
          "$H\\left(\\tfrac{2}{3}\\right) = -\\tfrac{7}{9} \\approx -0{,}78$ (dos decimales). Verificación: $5 \\cdot \\left(\\tfrac{2}{3}\\right)^2 = \\tfrac{20}{9} \\approx 2{,}22$, y $2{,}22 - 3 = -0{,}78$ ✓.",
          "$H\\left(\\tfrac{2}{3}\\right) = -\\tfrac{7}{9} \\approx -0.78$ (two decimals). Check: $5 \\cdot \\left(\\tfrac{2}{3}\\right)^2 = \\tfrac{20}{9} \\approx 2.22$, and $2.22 - 3 = -0.78$ ✓.",
        ),
      ],
    }),
  ),

  /* S9 #19 — G(x)=2−x²: se pide la regla de G(u²) = 2−u⁴ (tipo expresión,
     accepted ["2-u^4"], variables ["u"]). G(−8)=−62 y G(u)=2−u² van
     resueltos en la solución. */
  template(
    {
      id: "ev-uees-19",
      subject: "math",
      topicId: "functions",
      subtopicId: "evaluation",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 120,
      tags: ["evaluation", "expression-input", "power-rule"],
      prerequisites: ["notation"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "9 · 19",
        page: 11,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L(
        "Evaluar en un argumento algebraico: potencia de una potencia",
        "Evaluating at an algebraic argument: a power of a power",
      ),
      statement: L(
        "Dada la función, calcule el valor pedido:\n\n$$G(x) = 2 - x^2; \\qquad G(-8), \\; G(u), \\; G(u^2)$$\n\n¿Cuál es la regla de $G(u^2)$? (usa ^ para las potencias, por ejemplo 3-x^2)",
        "Given the function, compute the requested value:\n\n$$G(x) = 2 - x^2; \\qquad G(-8), \\; G(u), \\; G(u^2)$$\n\nWhat is the rule of $G(u^2)$? (use ^ for powers, e.g. 3-x^2)",
      ),
      answer: {
        kind: "expression",
        accepted: ["2-u^4"],
        variables: ["u"],
      },
      hints: [
        L(
          "El argumento ya no es un número: es la expresión $u^2$. Sustitúyela completa en la regla.",
          "The argument is no longer a number: it is the expression $u^2$. Substitute it wholesale into the rule.",
        ),
        L(
          "$G(u^2) = 2 - (u^2)^2$ — ahora aplica la ley de potencias.",
          "$G(u^2) = 2 - (u^2)^2$ — now apply the power law.",
        ),
        L(
          "$(u^2)^2 = u^{2 \\cdot 2}$: ¿qué exponente queda sobre la $u$?",
          "$(u^2)^2 = u^{2 \\cdot 2}$: which exponent is left on the $u$?",
        ),
      ],
      answerDisplay: L(
        "$G(u^2) = 2 - u^4$",
        "$G(u^2) = 2 - u^4$",
      ),
      solution: [
        step(
          "given",
          "$G(x) = 2 - x^2$ con los valores pedidos $G(-8)$, $G(u)$ y $G(u^2)$.",
          "$G(x) = 2 - x^2$ with the requested values $G(-8)$, $G(u)$ and $G(u^2)$.",
        ),
        step(
          "approach",
          "Se sustituye la $x$ por cada argumento; cuando el argumento es una expresión, entra completa y entre paréntesis.",
          "Substitute $x$ by each argument; when the argument is an expression, it enters wholesale and in parentheses.",
        ),
        step(
          "calculation",
          "$G(-8) = 2 - 64 = -62$; $G(u) = 2 - u^2$; y la pedida: $G(u^2) = 2 - (u^2)^2 = 2 - u^{2 \\cdot 2} = 2 - u^4$.",
          "$G(-8) = 2 - 64 = -62$; $G(u) = 2 - u^2$; and the requested one: $G(u^2) = 2 - (u^2)^2 = 2 - u^{2 \\cdot 2} = 2 - u^4$.",
        ),
        step(
          "result",
          "$G(u^2) = 2 - u^4$: al elevar al cuadrado una potencia, se multiplican los exponentes. Verificación con $u = 2$: por un lado $G(4) = 2 - 16 = -14$; por otro, $2 - u^4$ con $u = 2$ da $2 - 16 = -14$ ✓.",
          "$G(u^2) = 2 - u^4$: squaring a power multiplies the exponents. Check with $u = 2$: on one side $G(4) = 2 - 16 = -14$; on the other, $2 - u^4$ at $u = 2$ gives $2 - 16 = -14$ ✓.",
        ),
      ],
    }),
  ),

  /* S9 #20 — F(x)=−7x+1: se pide la regla de F(x+3) = −7x−20 (tipo expresión,
     accepted ["-7x-20","-20-7x"], variables ["x"]). F(s) y F(t+1)=−7t−6 van
     resueltos en la solución. */
  template(
    {
      id: "ev-uees-20",
      subject: "math",
      topicId: "functions",
      subtopicId: "evaluation",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 120,
      tags: ["evaluation", "expression-input", "distributing"],
      prerequisites: ["notation"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "9 · 20",
        page: 11,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L(
        "Evaluar en un binomio: desarrollar el producto",
        "Evaluating at a binomial: expanding the product",
      ),
      statement: L(
        "Dada la función, calcule el valor pedido:\n\n$$F(x) = -7x + 1; \\qquad F(s), \\; F(t + 1), \\; F(x + 3)$$\n\n¿Cuál es la regla de $F(x + 3)$? (escribe por ejemplo 5-2x)",
        "Given the function, compute the requested value:\n\n$$F(x) = -7x + 1; \\qquad F(s), \\; F(t + 1), \\; F(x + 3)$$\n\nWhat is the rule of $F(x + 3)$? (write e.g. 5-2x)",
      ),
      answer: {
        kind: "expression",
        accepted: ["-7x-20", "-20-7x"],
        variables: ["x"],
      },
      hints: [
        L(
          "Sustituye la $x$ por el paréntesis completo $(x + 3)$, no sólo por la $x$.",
          "Substitute $x$ by the whole parenthesis $(x + 3)$, not just by the $x$.",
        ),
        L(
          "$F(x + 3) = -7(x + 3) + 1$: desarrolla el producto y después suma.",
          "$F(x + 3) = -7(x + 3) + 1$: expand the product and then add.",
        ),
        L(
          "Multiplica $-7$ por CADA término del paréntesis: $-7x - 21$; luego $+1$.",
          "Multiply $-7$ by EVERY term of the parenthesis: $-7x - 21$; then $+1$.",
        ),
      ],
      answerDisplay: L(
        "$F(x + 3) = -7x - 20$",
        "$F(x + 3) = -7x - 20$",
      ),
      solution: [
        step(
          "given",
          "$F(x) = -7x + 1$ con los valores pedidos $F(s)$, $F(t + 1)$ y $F(x + 3)$.",
          "$F(x) = -7x + 1$ with the requested values $F(s)$, $F(t + 1)$ and $F(x + 3)$.",
        ),
        step(
          "approach",
          "Cada argumento entra completo entre paréntesis; con binomios hay que desarrollar después el producto.",
          "Each argument enters wholesale in parentheses; with binomials the product must be expanded afterwards.",
        ),
        step(
          "calculation",
          "$F(s) = -7s + 1$; $F(t + 1) = -7(t + 1) + 1 = -7t - 7 + 1 = -7t - 6$; y la pedida: $F(x + 3) = -7(x + 3) + 1 = -7x - 21 + 1 = -7x - 20$.",
          "$F(s) = -7s + 1$; $F(t + 1) = -7(t + 1) + 1 = -7t - 7 + 1 = -7t - 6$; and the requested one: $F(x + 3) = -7(x + 3) + 1 = -7x - 21 + 1 = -7x - 20$.",
        ),
        step(
          "result",
          "$F(x + 3) = -7x - 20$. Verificación con $x = 0$: por un lado $F(3) = -7 \\cdot 3 + 1 = -20$; por otro, $-7 \\cdot 0 - 20 = -20$ ✓ (y con $x = 1$: $F(4) = -27$ y $-7 - 20 = -27$ ✓).",
          "$F(x + 3) = -7x - 20$. Check with $x = 0$: on one side $F(3) = -7 \\cdot 3 + 1 = -20$; on the other, $-7 \\cdot 0 - 20 = -20$ ✓ (and with $x = 1$: $F(4) = -27$ and $-7 - 20 = -27$ ✓).",
        ),
      ],
    }),
  ),

  /* S9 #21 — γ(u)=2u²−u: se pide la regla de γ(2v) = 8v²−2v (tipo expresión,
     accepted ["8v^2-2v"], variables ["v"]). γ(−2)=10 y γ(x+a) van resueltos
     en la solución. */
  template(
    {
      id: "ev-uees-21",
      subject: "math",
      topicId: "functions",
      subtopicId: "evaluation",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 120,
      tags: ["evaluation", "expression-input", "power-rule"],
      prerequisites: ["notation"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "9 · 21",
        page: 11,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L(
        "Evaluar en un monomio compuesto: el cuadrado afecta al producto",
        "Evaluating at a composite monomial: the square hits the whole product",
      ),
      statement: L(
        "Dada la función, calcule el valor pedido:\n\n$$\\gamma(u) = 2u^2 - u; \\qquad \\gamma(-2), \\; \\gamma(2v), \\; \\gamma(x + a)$$\n\n¿Cuál es la regla de $\\gamma(2v)$? (usa ^ para las potencias, por ejemplo 3-x^2)",
        "Given the function, compute the requested value:\n\n$$\\gamma(u) = 2u^2 - u; \\qquad \\gamma(-2), \\; \\gamma(2v), \\; \\gamma(x + a)$$\n\nWhat is the rule of $\\gamma(2v)$? (use ^ for powers, e.g. 3-x^2)",
      ),
      answer: {
        kind: "expression",
        accepted: ["8v^2-2v"],
        variables: ["v"],
      },
      hints: [
        L(
          "El argumento es $2v$: entra completo en CADA aparición de la $u$.",
          "The argument is $2v$: it enters wholesale in EVERY appearance of $u$.",
        ),
        L(
          "$\\gamma(2v) = 2(2v)^2 - (2v)$; primero resuelve el cuadrado.",
          "$\\gamma(2v) = 2(2v)^2 - (2v)$; solve the square first.",
        ),
        L(
          "$(2v)^2 = 4v^2$, así que el primer término queda $2 \\cdot 4v^2$. ¿Cuánto vale?",
          "$(2v)^2 = 4v^2$, so the first term becomes $2 \\cdot 4v^2$. How much is that?",
        ),
      ],
      answerDisplay: L(
        "$\\gamma(2v) = 8v^2 - 2v$",
        "$\\gamma(2v) = 8v^2 - 2v$",
      ),
      solution: [
        step(
          "given",
          "$\\gamma(u) = 2u^2 - u$ con los valores pedidos $\\gamma(-2)$, $\\gamma(2v)$ y $\\gamma(x + a)$.",
          "$\\gamma(u) = 2u^2 - u$ with the requested values $\\gamma(-2)$, $\\gamma(2v)$ and $\\gamma(x + a)$.",
        ),
        step(
          "approach",
          "Se sustituye la $u$ por cada argumento completo; en $\\gamma(2v)$ el cuadrado actúa sobre el producto $2v$ entero.",
          "Substitute $u$ by each whole argument; in $\\gamma(2v)$ the square acts on the entire product $2v$.",
        ),
        step(
          "calculation",
          "$\\gamma(-2) = 2 \\cdot 4 + 2 = 10$; $\\gamma(x + a) = 2(x + a)^2 - (x + a) = 2x^2 + 4ax + 2a^2 - x - a$; y la pedida: $\\gamma(2v) = 2 \\cdot 4v^2 - 2v = 8v^2 - 2v$.",
          "$\\gamma(-2) = 2 \\cdot 4 + 2 = 10$; $\\gamma(x + a) = 2(x + a)^2 - (x + a) = 2x^2 + 4ax + 2a^2 - x - a$; and the requested one: $\\gamma(2v) = 2 \\cdot 4v^2 - 2v = 8v^2 - 2v$.",
        ),
        step(
          "result",
          "$\\gamma(2v) = 8v^2 - 2v$. Verificación con $v = 1$: por un lado $\\gamma(2) = 2 \\cdot 4 - 2 = 6$; por otro, $8 - 2 = 6$ ✓ (y con $v = 3$: $\\gamma(6) = 72 - 6 = 66$ y $8 \\cdot 9 - 6 = 66$ ✓).",
          "$\\gamma(2v) = 8v^2 - 2v$. Check with $v = 1$: on one side $\\gamma(2) = 2 \\cdot 4 - 2 = 6$; on the other, $8 - 2 = 6$ ✓ (and with $v = 3$: $\\gamma(6) = 72 - 6 = 66$ and $8 \\cdot 9 - 6 = 66$ ✓).",
        ),
      ],
    }),
  ),

  /* S9 #22 — h(v)=1/√v: se pide h(1/4) = 2 (la trampa: 1/√(1/4) = 2, NO 4).
     h(16)=1/4 y h(1−x) van resueltos en la solución. */
  template(
    {
      id: "ev-uees-22",
      subject: "math",
      topicId: "functions",
      subtopicId: "evaluation",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 90,
      tags: ["evaluation", "radical-input", "reciprocal"],
      prerequisites: ["notation"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "9 · 22",
        page: 11,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L(
        "Evaluar un cociente con raíz en una entrada fraccionaria",
        "Evaluating a quotient with a radical at a fractional input",
      ),
      statement: L(
        "Dada la función, calcule el valor pedido:\n\n$$h(v) = \\dfrac{1}{\\sqrt{v}}; \\qquad h(16), \\; h\\left(\\tfrac{1}{4}\\right), \\; h(1 - x)$$\n\n¿Cuánto vale $h\\left(\\tfrac{1}{4}\\right)$?",
        "Given the function, compute the requested value:\n\n$$h(v) = \\dfrac{1}{\\sqrt{v}}; \\qquad h(16), \\; h\\left(\\tfrac{1}{4}\\right), \\; h(1 - x)$$\n\nWhat is $h\\left(\\tfrac{1}{4}\\right)$?",
      ),
      answer: {
        kind: "numeric",
        value: 1 / Math.sqrt(1 / 4), // = 2
        tolerance: { mode: "relative", value: 0.02 },
      },
      hints: [
        L(
          "Sustituye la $v$ por $\\tfrac{1}{4}$ dentro de la raíz, con paréntesis.",
          "Substitute $v$ by $\\tfrac{1}{4}$ inside the radical, in parentheses.",
        ),
        L(
          "Calcula primero $\\sqrt{\\tfrac{1}{4}}$: ¿qué número al cuadrado da $\\tfrac{1}{4}$?",
          "First compute $\\sqrt{\\tfrac{1}{4}}$: which number squared gives $\\tfrac{1}{4}$?",
        ),
        L(
          "Con $\\sqrt{1/4} = \\tfrac{1}{2}$, el valor pedido es $1$ dividido para $\\tfrac{1}{2}$ — y NO es $4$.",
          "With $\\sqrt{1/4} = \\tfrac{1}{2}$, the requested value is $1$ divided by $\\tfrac{1}{2}$ — and it is NOT $4$.",
        ),
      ],
      answerDisplay: L(
        "$h\\left(\\tfrac{1}{4}\\right) = 2$",
        "$h\\left(\\tfrac{1}{4}\\right) = 2$",
      ),
      solution: [
        step(
          "given",
          "$h(v) = \\dfrac{1}{\\sqrt{v}}$ con los valores pedidos $h(16)$, $h\\left(\\tfrac{1}{4}\\right)$ y $h(1 - x)$.",
          "$h(v) = \\dfrac{1}{\\sqrt{v}}$ with the requested values $h(16)$, $h\\left(\\tfrac{1}{4}\\right)$ and $h(1 - x)$.",
        ),
        step(
          "approach",
          "Se sustituye la $v$ en el radicando y se simplifica la raíz antes de dividir.",
          "Substitute $v$ in the radicand and simplify the root before dividing.",
        ),
        step(
          "calculation",
          "$h(16) = \\dfrac{1}{\\sqrt{16}} = \\dfrac{1}{4}$; $h(1 - x) = \\dfrac{1}{\\sqrt{1 - x}}$ (existe si $1 - x > 0$); y la pedida: $h\\left(\\tfrac{1}{4}\\right) = \\dfrac{1}{\\sqrt{1/4}} = \\dfrac{1}{1/2} = 2$.",
          "$h(16) = \\dfrac{1}{\\sqrt{16}} = \\dfrac{1}{4}$; $h(1 - x) = \\dfrac{1}{\\sqrt{1 - x}}$ (exists if $1 - x > 0$); and the requested one: $h\\left(\\tfrac{1}{4}\\right) = \\dfrac{1}{\\sqrt{1/4}} = \\dfrac{1}{1/2} = 2$.",
        ),
        step(
          "result",
          "$h\\left(\\tfrac{1}{4}\\right) = 2$, NO $4$: $\\sqrt{\\tfrac{1}{4}} = \\tfrac{1}{2}$ (porque $\\left(\\tfrac{1}{2}\\right)^2 = \\tfrac{1}{4}$) y $1 \\div \\tfrac{1}{2} = 2$. Verificación: $2 \\cdot \\tfrac{1}{2} = 1$ ✓ (el valor multiplicado por la raíz devuelve el numerador $1$); si erróneamente valiera $4$, entonces $4 \\cdot \\tfrac{1}{2} = 2 \\ne 1$ ✗.",
          "$h\\left(\\tfrac{1}{4}\\right) = 2$, NOT $4$: $\\sqrt{\\tfrac{1}{4}} = \\tfrac{1}{2}$ (because $\\left(\\tfrac{1}{2}\\right)^2 = \\tfrac{1}{4}$) and $1 \\div \\tfrac{1}{2} = 2$. Check: $2 \\cdot \\tfrac{1}{2} = 1$ ✓ (the value times the root returns the numerator $1$); if it were wrongly $4$, then $4 \\cdot \\tfrac{1}{2} = 2 \\ne 1$ ✗.",
        ),
      ],
    }),
  ),

  /* S9 #17bis — f(x)=8 (constante): se pide f(−√17) = 8 (pág. 12). f(2)=8 y
     f(t+8)=8 van resueltos en la solución. */
  template(
    {
      id: "ev-uees-b17",
      subject: "math",
      topicId: "functions",
      subtopicId: "evaluation",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 60,
      tags: ["evaluation", "constant-function", "irrational-input"],
      prerequisites: ["notation"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "9 · 17bis",
        page: 12,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L(
        "Evaluar una función constante",
        "Evaluating a constant function",
      ),
      statement: L(
        "Dada la función, calcule el valor pedido:\n\n$$f(x) = 8; \\qquad f(2), \\; f(t + 8), \\; f\\left(-\\sqrt{17}\\right)$$\n\n¿Cuánto vale $f\\left(-\\sqrt{17}\\right)$?",
        "Given the function, compute the requested value:\n\n$$f(x) = 8; \\qquad f(2), \\; f(t + 8), \\; f\\left(-\\sqrt{17}\\right)$$\n\nWhat is $f\\left(-\\sqrt{17}\\right)$?",
      ),
      answer: {
        kind: "numeric",
        value: 8,
        tolerance: { mode: "relative", value: 0.02 },
      },
      hints: [
        L(
          "Mira la regla: ¿en qué depende el resultado del argumento?",
          "Look at the rule: how does the result depend on the argument?",
        ),
        L(
          "La regla no tiene ninguna $x$: es la constante $8$ para cualquier entrada.",
          "The rule has no $x$ at all: it is the constant $8$ for any input.",
        ),
        L(
          "Cualquier entrada produce $8$: $f(2) = 8$, $f(t + 8) = 8$ y también $f\\left(-\\sqrt{17}\\right)$.",
          "Any input produces $8$: $f(2) = 8$, $f(t + 8) = 8$ and also $f\\left(-\\sqrt{17}\\right)$.",
        ),
      ],
      answerDisplay: L(
        "$f\\left(-\\sqrt{17}\\right) = 8$",
        "$f\\left(-\\sqrt{17}\\right) = 8$",
      ),
      solution: [
        step(
          "given",
          "$f(x) = 8$ con los valores pedidos $f(2)$, $f(t + 8)$ y $f\\left(-\\sqrt{17}\\right)$.",
          "$f(x) = 8$ with the requested values $f(2)$, $f(t + 8)$ and $f\\left(-\\sqrt{17}\\right)$.",
        ),
        step(
          "approach",
          "Se sustituye cada argumento; pero la regla no contiene a la variable, así que el argumento no puede cambiar el resultado.",
          "Substitute each argument; but the rule contains no variable, so the argument cannot change the result.",
        ),
        step(
          "calculation",
          "$f(2) = 8$; $f(t + 8) = 8$; y la pedida: $f\\left(-\\sqrt{17}\\right) = 8$ — el argumento no aparece en la regla.",
          "$f(2) = 8$; $f(t + 8) = 8$; and the requested one: $f\\left(-\\sqrt{17}\\right) = 8$ — the argument never appears in the rule.",
        ),
        step(
          "result",
          "$f\\left(-\\sqrt{17}\\right) = 8$: es una función constante; da igual que el argumento sea $2$, $t + 8$ o el irracional $-\\sqrt{17} \\approx -4{,}12$. Verificación: $8 = 8$ para cualquier entrada ✓; el dominio es $\\mathbb{R}$ y el rango es $\\{8\\}$.",
          "$f\\left(-\\sqrt{17}\\right) = 8$: it is a constant function; it does not matter whether the argument is $2$, $t + 8$ or the irrational $-\\sqrt{17} \\approx -4.12$. Check: $8 = 8$ for any input ✓; the domain is $\\mathbb{R}$ and the range is $\\{8\\}$.",
        ),
      ],
    }),
  ),

  /* S9 #18bis — g(x)=|x−3| (pág. 12): se pide g(−3) = |−3−3| = 6, NO 0 (el 0
     es g(3)). Distractores: 0 (g(3) mezclado), −6 (signo) y 3 (sin restar). */
  template(
    {
      id: "ev-uees-b18",
      subject: "math",
      topicId: "functions",
      subtopicId: "evaluation",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 75,
      tags: ["evaluation", "absolute-value", "negative-input"],
      prerequisites: ["notation"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "9 · 18bis",
        page: 12,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$6$`, `$6$`), correct: true },
        { id: "b", text: L(`$0$`, `$0$`), correct: false },
        { id: "c", text: L(`$-6$`, `$-6$`), correct: false },
        { id: "d", text: L(`$3$`, `$3$`), correct: false },
      ];
      return {
        skill: L(
          "Evaluar un valor absoluto en un punto negativo",
          "Evaluating an absolute value at a negative point",
        ),
        statement: L(
          "Dada la función, calcule el valor pedido:\n\n$$g(x) = |x - 3|; \\qquad g(10), \\; g(3), \\; g(-3)$$\n\n¿Cuánto vale $g(-3)$?",
          "Given the function, compute the requested value:\n\n$$g(x) = |x - 3|; \\qquad g(10), \\; g(3), \\; g(-3)$$\n\nWhat is $g(-3)$?",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El valor absoluto devuelve el módulo de lo que hay dentro: siempre $\\ge 0$.",
            "The absolute value returns the modulus of what is inside: always $\\ge 0$.",
          ),
          L(
            "Sustituye con paréntesis: $g(-3) = \\left|-3 - 3\\right|$.",
            "Substitute in parentheses: $g(-3) = \\left|-3 - 3\\right|$.",
          ),
          L(
            "Primero la resta interna: $-3 - 3 = -6$; después el módulo. NO es $0$ — ése es $g(3)$.",
            "First the inner subtraction: $-3 - 3 = -6$; then the modulus. It is NOT $0$ — that one is $g(3)$.",
          ),
        ],
        answerDisplay: L(
          "$g(-3) = \\left|-3 - 3\\right| = \\left|-6\\right| = 6$",
          "$g(-3) = \\left|-3 - 3\\right| = \\left|-6\\right| = 6$",
        ),
        solution: [
          step(
            "given",
            "$g(x) = |x - 3|$ con los valores pedidos $g(10)$, $g(3)$ y $g(-3)$.",
            "$g(x) = |x - 3|$ with the requested values $g(10)$, $g(3)$ and $g(-3)$.",
          ),
          step(
            "approach",
            "Se sustituye el argumento con paréntesis y se resuelve PRIMERO la resta interna; el módulo se aplica al final.",
            "Substitute the argument in parentheses and solve the inner subtraction FIRST; the modulus is applied at the end.",
          ),
          step(
            "calculation",
            "$g(10) = |10 - 3| = 7$; $g(3) = |3 - 3| = 0$; y la pedida: $g(-3) = |-3 - 3| = |-6| = 6$.",
            "$g(10) = |10 - 3| = 7$; $g(3) = |3 - 3| = 0$; and the requested one: $g(-3) = |-3 - 3| = |-6| = 6$.",
          ),
          step(
            "result",
            "$g(-3) = 6$, NO $0$: el cero corresponde a $g(3)$ (otro sub-valor). Verificación: $\\left|-6\\right| = 6 \\ge 0$ ✓ — un valor absoluto jamás es negativo (por eso $-6$ es imposible) y $3$ saldría de tomar $|-3|$ sin restar el $3$.",
            "$g(-3) = 6$, NOT $0$: the zero belongs to $g(3)$ (another sub-value). Check: $\\left|-6\\right| = 6 \\ge 0$ ✓ — an absolute value is never negative (hence $-6$ is impossible) and $3$ would come from taking $|-3|$ without subtracting the $3$.",
          ),
        ],
      };
    },
  ),

  /* S9 #19bis — F a trozos 2/0/−1 (pág. 12): se pide F(1) = 0 — la rama del
     MEDIO (el ítem case-analysis de la sección). Hint 3 del brief: «lee la
     fila del MEDIO». Distractores: 2 (rama t>1), −1 (rama t<1) y 1 (el punto
     en sí). */
  template(
    {
      id: "ev-uees-b19",
      subject: "math",
      topicId: "functions",
      subtopicId: "evaluation",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["evaluation", "piecewise", "boundary-value"],
      prerequisites: ["notation", "piecewise"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "9 · 19bis",
        page: 12,
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$0$`, `$0$`), correct: true },
        { id: "b", text: L(`$2$`, `$2$`), correct: false },
        { id: "c", text: L(`$-1$`, `$-1$`), correct: false },
        { id: "d", text: L(`$1$`, `$1$`), correct: false },
      ];
      return {
        skill: L(
          "Evaluar una función a trozos justo en la frontera",
          "Evaluating a piecewise function right at the boundary",
        ),
        statement: L(
          "Dada la función, calcule el valor pedido:\n\n$$F(t) = \\begin{cases} 2 & \\text{si } t > 1 \\\\ 0 & \\text{si } t = 1 \\\\ -1 & \\text{si } t < 1 \\end{cases}$$\n\n$$F(12), \\; F\\left(-\\sqrt{3}\\right), \\; F(1), \\; F\\left(\\tfrac{18}{5}\\right)$$\n\n¿Cuánto vale $F(1)$?",
          "Given the function, compute the requested value:\n\n$$F(t) = \\begin{cases} 2 & \\text{if } t > 1 \\\\ 0 & \\text{if } t = 1 \\\\ -1 & \\text{if } t < 1 \\end{cases}$$\n\n$$F(12), \\; F\\left(-\\sqrt{3}\\right), \\; F(1), \\; F\\left(\\tfrac{18}{5}\\right)$$\n\nWhat is $F(1)$?",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Con funciones a trozos, primero decide QUÉ rama gobierna el argumento pedido.",
            "With piecewise functions, first decide WHICH branch governs the requested argument.",
          ),
          L(
            "Compara $t = 1$ con las tres condiciones: ¿cumple $t > 1$? ¿$t < 1$? ¿$t = 1$?",
            "Compare $t = 1$ with the three conditions: does it satisfy $t > 1$? $t < 1$? $t = 1$?",
          ),
          L(
            "Lee la fila del MEDIO: ¿qué vale $F$ exactamente en $t = 1$?",
            "Read the MIDDLE row: what is $F$ exactly at $t = 1$?",
          ),
        ],
        answerDisplay: L(
          "$F(1) = 0$ (la rama del medio)",
          "$F(1) = 0$ (the middle branch)",
        ),
        solution: [
          step(
            "given",
            "$F$ definida a trozos: rama $2$ si $t > 1$, rama $0$ si $t = 1$ y rama $-1$ si $t < 1$; con los valores pedidos $F(12)$, $F\\left(-\\sqrt{3}\\right)$, $F(1)$ y $F\\left(\\tfrac{18}{5}\\right)$.",
            "$F$ defined piecewise: branch $2$ if $t > 1$, branch $0$ if $t = 1$ and branch $-1$ if $t < 1$; with the requested values $F(12)$, $F\\left(-\\sqrt{3}\\right)$, $F(1)$ and $F\\left(\\tfrac{18}{5}\\right)$.",
          ),
          step(
            "approach",
            "Para cada argumento, identificamos la rama cuya condición cumple; el valor frontera $t = 1$ pertenece a la fila del medio.",
            "For each argument, we identify the branch whose condition it satisfies; the boundary value $t = 1$ belongs to the middle row.",
          ),
          step(
            "calculation",
            "$F(12) = 2$ (pues $12 > 1$); $F\\left(-\\sqrt{3}\\right) = -1$ (pues $-\\sqrt{3} \\approx -1{,}73 < 1$); $F\\left(\\tfrac{18}{5}\\right) = 2$ (pues $\\tfrac{18}{5} = 3{,}6 > 1$); y la pedida: $t = 1$ cumple la fila del medio → $F(1) = 0$.",
            "$F(12) = 2$ (since $12 > 1$); $F\\left(-\\sqrt{3}\\right) = -1$ (since $-\\sqrt{3} \\approx -1.73 < 1$); $F\\left(\\tfrac{18}{5}\\right) = 2$ (since $\\tfrac{18}{5} = 3.6 > 1$); and the requested one: $t = 1$ satisfies the middle row → $F(1) = 0$.",
          ),
          step(
            "result",
            "$F(1) = 0$: el valor frontera pertenece a la rama del MEDIO ($t = 1$), no a las otras dos. Verificación: $1 > 1$ es falso ✗ y $1 < 1$ es falso ✗, pero $1 = 1$ es verdadero ✓ — por eso NO es $2$ ni $-1$; y $1$ (el punto en sí) no es ningún valor de la función.",
            "$F(1) = 0$: the boundary value belongs to the MIDDLE branch ($t = 1$), not to the other two. Check: $1 > 1$ is false ✗ and $1 < 1$ is false ✗, but $1 = 1$ is true ✓ — that is why it is NOT $2$ nor $-1$; and $1$ (the point itself) is no value of the function.",
          ),
        ],
      };
    },
  ),

  /* S9 #20bis — f a trozos 4 (x≥0) / 3 (x<0) (pág. 12): se pide f(0) = 4 —
     x=0 pertenece a la rama ≥ (el ítem case-analysis). Hint 3 del brief:
     «¿x=0 cumple x≥0 o x<0?». Distractores: 3 (rama <0), 0 (el punto en sí)
     y 3,5 (promedio absurdo). */
  template(
    {
      id: "ev-uees-b20",
      subject: "math",
      topicId: "functions",
      subtopicId: "evaluation",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 90,
      tags: ["evaluation", "piecewise", "boundary-value"],
      prerequisites: ["notation", "piecewise"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "9 · 20bis",
        page: 12,
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$4$`, `$4$`), correct: true },
        { id: "b", text: L(`$3$`, `$3$`), correct: false },
        { id: "c", text: L(`$0$`, `$0$`), correct: false },
        { id: "d", text: L(`$3{,}5$`, `$3.5$`), correct: false },
      ];
      return {
        skill: L(
          "Evaluar una función a trozos justo en la frontera (≥)",
          "Evaluating a piecewise function right at the boundary (≥)",
        ),
        statement: L(
          "Dada la función, calcule el valor pedido:\n\n$$f(x) = \\begin{cases} 4 & \\text{si } x \\ge 0 \\\\ 3 & \\text{si } x < 0 \\end{cases}$$\n\n$$f(3), \\; f(-4), \\; f(0)$$\n\n¿Cuánto vale $f(0)$?",
          "Given the function, compute the requested value:\n\n$$f(x) = \\begin{cases} 4 & \\text{if } x \\ge 0 \\\\ 3 & \\text{if } x < 0 \\end{cases}$$\n\n$$f(3), \\; f(-4), \\; f(0)$$\n\nWhat is $f(0)$?",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Primero decide qué rama gobierna el argumento $x = 0$.",
            "First decide which branch governs the argument $x = 0$.",
          ),
          L(
            "Compara $x = 0$ con las dos condiciones de las ramas.",
            "Compare $x = 0$ with the two branch conditions.",
          ),
          L(
            "¿$x = 0$ cumple $x \\ge 0$ o $x < 0$?",
            "Does $x = 0$ satisfy $x \\ge 0$ or $x < 0$?",
          ),
        ],
        answerDisplay: L(
          "$f(0) = 4$ (la rama de $x \\ge 0$)",
          "$f(0) = 4$ (the $x \\ge 0$ branch)",
        ),
        solution: [
          step(
            "given",
            "$f$ definida a trozos: rama $4$ si $x \\ge 0$ y rama $3$ si $x < 0$; con los valores pedidos $f(3)$, $f(-4)$ y $f(0)$.",
            "$f$ defined piecewise: branch $4$ if $x \\ge 0$ and branch $3$ if $x < 0$; with the requested values $f(3)$, $f(-4)$ and $f(0)$.",
          ),
          step(
            "approach",
            "Para cada argumento identificamos la rama cuya condición cumple; el caso frontera es $x = 0$.",
            "For each argument we identify the branch whose condition it satisfies; the boundary case is $x = 0$.",
          ),
          step(
            "calculation",
            "$f(3) = 4$ (pues $3 \\ge 0$); $f(-4) = 3$ (pues $-4 < 0$); y la pedida: $0 \\ge 0$ es verdadero → rama de arriba → $f(0) = 4$.",
            "$f(3) = 4$ (since $3 \\ge 0$); $f(-4) = 3$ (since $-4 < 0$); and the requested one: $0 \\ge 0$ is true → upper branch → $f(0) = 4$.",
          ),
          step(
            "result",
            "$f(0) = 4$: el $0$ SATISFACE $x \\ge 0$, así que pertenece a la primera rama. Verificación: $0 \\ge 0$ ✓ verdadero, $0 < 0$ ✗ falso — por eso no es $3$; el valor $0$ (el punto en sí) no lo produce ninguna rama, y $3{,}5$ sería un absurdo «promedio» entre ramas.",
            "$f(0) = 4$: $0$ SATISFIES $x \\ge 0$, so it belongs to the first branch. Check: $0 \\ge 0$ ✓ true, $0 < 0$ ✗ false — that is why it is not $3$; the value $0$ (the point itself) is produced by no branch, and $3.5$ would be an absurd «average» of branches.",
          ),
        ],
      };
    },
  ),

  /* ================================================================== */
  /* TAREA UEES · PARTE 2 (8-d2) — Sección 11 «Combinación y             */
  /* composición de funciones» 4-10 y 17 (pág. 13); Sección 12           */
  /* «Función inversa» 1-6 (pág. 14); Sección 10 #33 teatro (pág. 12);   */
  /* Sección 13 «Gráfica» piezas 35-38 dominio+rango (pág. 15);          */
  /* Sección 14 «Funciones de varias variables» 1-12 (pág. 16).          */
  /* Sin clave impresa: ground truth de download/verify_repaso1.py       */
  /* (S10-33, S11, S12, S13-piezas, S14; 417 checks). Transcripción     */
  /* VLM: vlm-p-12/13/14/15/16.json. Dinero dentro de math con          */
  /* \text{\textdollar} (convención 8-b). TODO backslash LaTeX va como   */
  /* \\ en el fuente (lección crítica de 8-d).                           */
  /* ================================================================== */

  /* S11 #4 — f(x)=x²+1, g(x)=5 constante: se pide la parte (h),
     (f∘g)(12003) = 26 — g constante se traga cualquier entrada. Las
     NUEVE partes impresas (a)-(i) van resueltas en la solución. */
  template(
    {
      id: "comp-uees-4",
      subject: "math",
      topicId: "functions",
      subtopicId: "composition",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 150,
      tags: ["composition", "combination", "constant-function"],
      prerequisites: ["evaluation"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "11 · 4",
        page: 13,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L(
        "Combinar y componer con una función constante",
        "Combining and composing with a constant function",
      ),
      statement: L(
        "Si $f(x) = x^2 + 1$ y $g(x) = 5$, la hoja pide nueve operaciones con estas funciones, desde (a) $(f + g)(x)$ hasta (i) $(g \\circ f)(x)$.\n\n¿Cuánto vale la parte (h): $(f \\circ g)(12\\,003)$?",
        "If $f(x) = x^2 + 1$ and $g(x) = 5$, the worksheet asks for nine operations with these functions, from (a) $(f + g)(x)$ to (i) $(g \\circ f)(x)$.\n\nWhat is part (h): $(f \\circ g)(12\\,003)$?",
      ),
      answer: {
        kind: "numeric",
        value: 5 ** 2 + 1, // = 26: (f∘g)(x) = f(g(x)) = f(5)
        tolerance: { mode: "relative", value: 0.02 },
      },
      hints: [
        L(
          "En $(f \\circ g)$ primero actúa $g$ y su salida entra en $f$: $(f \\circ g)(x) = f(g(x))$.",
          "In $(f \\circ g)$, $g$ acts first and its output enters $f$: $(f \\circ g)(x) = f(g(x))$.",
        ),
        L(
          "$g$ es CONSTANTE: $g(x) = 5$ para cualquier entrada; en particular $g(12\\,003) = 5$.",
          "$g$ is CONSTANT: $g(x) = 5$ for any input; in particular $g(12\\,003) = 5$.",
        ),
        L(
          "Entonces $(f \\circ g)(12\\,003) = f(5)$: queda evaluar $5^2 + 1$.",
          "So $(f \\circ g)(12\\,003) = f(5)$: it remains to evaluate $5^2 + 1$.",
        ),
      ],
      answerDisplay: L(
        "$(f \\circ g)(12\\,003) = f(5) = 26$",
        "$(f \\circ g)(12\\,003) = f(5) = 26$",
      ),
      solution: [
        step(
          "given",
          "$f(x) = x^2 + 1$ y $g(x) = 5$, con las nueve partes impresas: (a) $(f + g)(x)$, (b) $(f + g)\\left(\\tfrac{2}{3}\\right)$, (c) $(f - g)(x)$, (d) $(fg)(x)$, (e) $(fg)(7)$, (f) $\\dfrac{f}{g}(x)$, (g) $(f \\circ g)(x)$, (h) $(f \\circ g)(12\\,003)$ y (i) $(g \\circ f)(x)$.",
          "$f(x) = x^2 + 1$ and $g(x) = 5$, with the nine printed parts: (a) $(f + g)(x)$, (b) $(f + g)\\left(\\tfrac{2}{3}\\right)$, (c) $(f - g)(x)$, (d) $(fg)(x)$, (e) $(fg)(7)$, (f) $\\dfrac{f}{g}(x)$, (g) $(f \\circ g)(x)$, (h) $(f \\circ g)(12\\,003)$ and (i) $(g \\circ f)(x)$.",
        ),
        step(
          "approach",
          "Las combinaciones aritméticas actúan sobre la MISMA $x$; en la composición, la regla de dentro entra completa en la de fuera. Como $g$ es constante, $(f \\circ g)(x) = f(5)$ para toda $x$.",
          "The arithmetic combinations act on the SAME $x$; in a composition, the inner rule enters the outer one wholesale. Since $g$ is constant, $(f \\circ g)(x) = f(5)$ for every $x$.",
        ),
        step(
          "calculation",
          "(a) $(f + g)(x) = x^2 + 1 + 5 = x^2 + 6$; (b) $(f + g)\\left(\\tfrac{2}{3}\\right) = \\tfrac{4}{9} + 6 = \\tfrac{58}{9}$; (c) $(f - g)(x) = x^2 + 1 - 5 = x^2 - 4$; (d) $(fg)(x) = 5\\left(x^2 + 1\\right) = 5x^2 + 5$; (e) $(fg)(7) = 5 \\cdot 49 + 5 = 250$; (f) $\\dfrac{f}{g}(x) = \\dfrac{x^2 + 1}{5}$; (g) $(f \\circ g)(x) = f(g(x)) = f(5) = 26$; (h) $(f \\circ g)(12\\,003) = f(g(12\\,003)) = f(5) = 26$; (i) $(g \\circ f)(x) = g\\left(x^2 + 1\\right) = 5$.",
          "(a) $(f + g)(x) = x^2 + 1 + 5 = x^2 + 6$; (b) $(f + g)\\left(\\tfrac{2}{3}\\right) = \\tfrac{4}{9} + 6 = \\tfrac{58}{9}$; (c) $(f - g)(x) = x^2 + 1 - 5 = x^2 - 4$; (d) $(fg)(x) = 5\\left(x^2 + 1\\right) = 5x^2 + 5$; (e) $(fg)(7) = 5 \\cdot 49 + 5 = 250$; (f) $\\dfrac{f}{g}(x) = \\dfrac{x^2 + 1}{5}$; (g) $(f \\circ g)(x) = f(g(x)) = f(5) = 26$; (h) $(f \\circ g)(12\\,003) = f(g(12\\,003)) = f(5) = 26$; (i) $(g \\circ f)(x) = g\\left(x^2 + 1\\right) = 5$.",
        ),
        step(
          "result",
          "$(f \\circ g)(12\\,003) = 26$: el $12\\,003$ es un señuelo, porque $g$ es constante y devuelve $5$ para CUALQUIER entrada. Verificación: $f(5) = 5^2 + 1 = 25 + 1 = 26$ ✓; y con cualquier otra entrada, por ejemplo $(f \\circ g)(0) = f(g(0)) = f(5) = 26$ ✓ (lo mismo).",
          "$(f \\circ g)(12\\,003) = 26$: the $12\\,003$ is a decoy, because $g$ is constant and returns $5$ for ANY input. Check: $f(5) = 5^2 + 1 = 25 + 1 = 26$ ✓; and with any other input, for instance $(f \\circ g)(0) = f(g(0)) = f(5) = 26$ ✓ (the same).",
        ),
      ],
    }),
  ),

  /* S11 #5 — f(x)=3x²+6, g(x)=4−2x: se pide g(f(2)) = −32; el ORDEN es el
     punto (f(g(2)) = 6 va resuelto en la solución como contraste). */
  template(
    {
      id: "comp-uees-5",
      subject: "math",
      topicId: "functions",
      subtopicId: "composition",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 120,
      tags: ["composition", "evaluation", "order"],
      prerequisites: ["evaluation"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "11 · 5",
        page: 13,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L(
        "Componer en el orden correcto: primero la función de dentro",
        "Composing in the right order: the inner function first",
      ),
      statement: L(
        "Si $f(x) = 3x^2 + 6$ y $g(x) = 4 - 2x$, encuentre $f(g(2))$ y $g(f(2))$.\n\nEscriba el valor de $g(f(2))$ (el de $f(g(2))$ se resuelve en la solución).",
        "If $f(x) = 3x^2 + 6$ and $g(x) = 4 - 2x$, find $f(g(2))$ and $g(f(2))$.\n\nEnter the value of $g(f(2))$ (the one of $f(g(2))$ is solved in the solution).",
      ),
      answer: {
        kind: "numeric",
        value: 4 - 2 * (3 * 2 ** 2 + 6), // g(f(2)) = g(18) = −32
        tolerance: { mode: "relative", value: 0.02 },
      },
      hints: [
        L(
          "En $g(f(2))$ primero actúa la función de DENTRO: calcula $f(2)$.",
          "In $g(f(2))$ the INNER function acts first: compute $f(2)$.",
        ),
        L(
          "$f(2) = 3 \\cdot 2^2 + 6 = 12 + 6 = 18$; ahora ese resultado entra en $g$.",
          "$f(2) = 3 \\cdot 2^2 + 6 = 12 + 6 = 18$; now that result enters $g$.",
        ),
        L(
          "$g(18) = 4 - 2 \\cdot 18$: primero el producto $-36$ y después la resta.",
          "$g(18) = 4 - 2 \\cdot 18$: first the product $-36$ and then the subtraction.",
        ),
      ],
      answerDisplay: L(
        "$g(f(2)) = g(18) = -32$",
        "$g(f(2)) = g(18) = -32$",
      ),
      solution: [
        step(
          "given",
          "$f(x) = 3x^2 + 6$ y $g(x) = 4 - 2x$; la hoja pide $f(g(2))$ y $g(f(2))$.",
          "$f(x) = 3x^2 + 6$ and $g(x) = 4 - 2x$; the worksheet asks for $f(g(2))$ and $g(f(2))$.",
        ),
        step(
          "approach",
          "En una composición anidada la notación manda: se evalúa de dentro hacia afuera, y el orden de las letras cambia el resultado.",
          "In a nested composition the notation rules: evaluate from the inside out, and the order of the letters changes the result.",
        ),
        step(
          "calculation",
          "Pedido: $f(2) = 3 \\cdot 4 + 6 = 18$, así que $g(f(2)) = g(18) = 4 - 2 \\cdot 18 = 4 - 36 = -32$.<br>El otro orden: $g(2) = 4 - 4 = 0$, así que $f(g(2)) = f(0) = 3 \\cdot 0 + 6 = 6$.",
          "Requested: $f(2) = 3 \\cdot 4 + 6 = 18$, so $g(f(2)) = g(18) = 4 - 2 \\cdot 18 = 4 - 36 = -32$.<br>The other order: $g(2) = 4 - 4 = 0$, so $f(g(2)) = f(0) = 3 \\cdot 0 + 6 = 6$.",
        ),
        step(
          "result",
          "$g(f(2)) = -32$ (y $f(g(2)) = 6$): el ORDEN cambia el resultado por completo. Verificación: $4 - 2 \\cdot 18 = 4 - 36 = -32$ ✓; y con el orden contrario $3 \\cdot 0^2 + 6 = 6$, que NO es $-32$ — por eso hay que leer con cuidado qué función va dentro.",
          "$g(f(2)) = -32$ (and $f(g(2)) = 6$): the ORDER changes the result completely. Check: $4 - 2 \\cdot 18 = 4 - 36 = -32$ ✓; and in the reverse order $3 \\cdot 0^2 + 6 = 6$, which is NOT $-32$ — that is why one must read carefully which function goes inside.",
        ),
      ],
    }),
  ),

  /* S11 #6 — f(p)=4/p, g(p)=(p−2)/3: se pide (f∘g)(p) = 12/(p−2);
     (g∘f)(p) = (4−2p)/(3p) va resuelto en la solución. */
  template(
    {
      id: "comp-uees-6",
      subject: "math",
      topicId: "functions",
      subtopicId: "composition",
      difficulty: "hard",
      questionType: "expression",
      estimatedTimeSec: 180,
      tags: ["composition", "rational-function"],
      prerequisites: ["evaluation"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "11 · 6",
        page: 13,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L(
        "Componer cocientes de funciones",
        "Composing quotients of functions",
      ),
      statement: L(
        "Si $f(p) = \\dfrac{4}{p}$ y $g(p) = \\dfrac{p - 2}{3}$, encuentre $(f \\circ g)(p)$ y $(g \\circ f)(p)$.\n\nEscriba la regla de $(f \\circ g)(p)$ (usa / para dividir y ^ para potencias; por ejemplo (p-2)/3).",
        "If $f(p) = \\dfrac{4}{p}$ and $g(p) = \\dfrac{p - 2}{3}$, find $(f \\circ g)(p)$ and $(g \\circ f)(p)$.\n\nEnter the rule of $(f \\circ g)(p)$ (use / to divide and ^ for powers; e.g. (p-2)/3).",
      ),
      answer: {
        kind: "expression",
        accepted: ["12/(p-2)"],
        variables: ["p"],
      },
      hints: [
        L(
          "$(f \\circ g)(p) = f(g(p))$: la regla de $g$ entra completa como argumento de $f$.",
          "$(f \\circ g)(p) = f(g(p))$: the rule of $g$ enters wholesale as the argument of $f$.",
        ),
        L(
          "$f(g(p)) = \\dfrac{4}{g(p)} = \\dfrac{4}{\\frac{p-2}{3}}$: hay que dividir entre una fracción.",
          "$f(g(p)) = \\dfrac{4}{g(p)} = \\dfrac{4}{\\frac{p-2}{3}}$: we must divide by a fraction.",
        ),
        L(
          "Dividir entre $\\tfrac{p-2}{3}$ es multiplicar por $\\tfrac{3}{p-2}$: queda $\\dfrac{4 \\cdot 3}{p - 2}$.",
          "Dividing by $\\tfrac{p-2}{3}$ means multiplying by $\\tfrac{3}{p-2}$: it becomes $\\dfrac{4 \\cdot 3}{p - 2}$.",
        ),
      ],
      answerDisplay: L(
        "$(f \\circ g)(p) = f\\left(\\dfrac{p-2}{3}\\right) = \\dfrac{12}{p - 2}$",
        "$(f \\circ g)(p) = f\\left(\\dfrac{p-2}{3}\\right) = \\dfrac{12}{p - 2}$",
      ),
      solution: [
        step(
          "given",
          "$f(p) = \\dfrac{4}{p}$ y $g(p) = \\dfrac{p - 2}{3}$; se piden $(f \\circ g)(p)$ y $(g \\circ f)(p)$.",
          "$f(p) = \\dfrac{4}{p}$ and $g(p) = \\dfrac{p - 2}{3}$; both $(f \\circ g)(p)$ and $(g \\circ f)(p)$ are requested.",
        ),
        step(
          "approach",
          "Se sustituye la regla de la función de dentro en el argumento de la de fuera; el cociente de fracciones se resuelve multiplicando por el recíproco.",
          "Substitute the inner function's rule into the outer one's argument; the quotient of fractions is handled by multiplying by the reciprocal.",
        ),
        step(
          "calculation",
          "$(f \\circ g)(p) = f\\left(\\dfrac{p-2}{3}\\right) = \\dfrac{4}{\\frac{p-2}{3}} = 4 \\cdot \\dfrac{3}{p-2} = \\dfrac{12}{p-2}$.<br>El otro orden: $(g \\circ f)(p) = g\\left(\\dfrac{4}{p}\\right) = \\dfrac{\\frac{4}{p} - 2}{3} = \\dfrac{\\frac{4 - 2p}{p}}{3} = \\dfrac{4 - 2p}{3p}$.",
          "$(f \\circ g)(p) = f\\left(\\dfrac{p-2}{3}\\right) = \\dfrac{4}{\\frac{p-2}{3}} = 4 \\cdot \\dfrac{3}{p-2} = \\dfrac{12}{p-2}$.<br>The other order: $(g \\circ f)(p) = g\\left(\\dfrac{4}{p}\\right) = \\dfrac{\\frac{4}{p} - 2}{3} = \\dfrac{\\frac{4 - 2p}{p}}{3} = \\dfrac{4 - 2p}{3p}$.",
        ),
        step(
          "result",
          "$(f \\circ g)(p) = \\dfrac{12}{p - 2}$ (y $(g \\circ f)(p) = \\dfrac{4 - 2p}{3p}$). Verificación con $p = 4$: por un lado $g(4) = \\tfrac{2}{3}$ y $f\\left(\\tfrac{2}{3}\\right) = 4 \\cdot \\tfrac{3}{2} = 6$; por el otro $\\dfrac{12}{4 - 2} = \\dfrac{12}{2} = 6$ ✓.",
          "$(f \\circ g)(p) = \\dfrac{12}{p - 2}$ (and $(g \\circ f)(p) = \\dfrac{4 - 2p}{3p}$). Check with $p = 4$: on one side $g(4) = \\tfrac{2}{3}$ and $f\\left(\\tfrac{2}{3}\\right) = 4 \\cdot \\tfrac{3}{2} = 6$; on the other $\\dfrac{12}{4 - 2} = \\dfrac{12}{2} = 6$ ✓.",
        ),
      ],
    }),
  ),

  /* S11 #7 — F(t)=t²+7t+1, G(t)=2/(t−1): se pide (F∘G)(t) =
     4/(t−1)²+14/(t−1)+1 sin expandir; (G∘F)(t) = 2/(t²+7t) en la
     solución (el +1 y el −1 se cancelan). */
  template(
    {
      id: "comp-uees-7",
      subject: "math",
      topicId: "functions",
      subtopicId: "composition",
      difficulty: "hard",
      questionType: "expression",
      estimatedTimeSec: 210,
      tags: ["composition", "rational-function"],
      prerequisites: ["evaluation"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "11 · 7",
        page: 13,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L(
        "Componer con un cociente dentro de un polinomio",
        "Composing with a quotient inside a polynomial",
      ),
      statement: L(
        "Si $F(t) = t^2 + 7t + 1$ y $G(t) = \\dfrac{2}{t - 1}$, encuentre $(F \\circ G)(t)$ y $(G \\circ F)(t)$.\n\nEscriba la regla de $(F \\circ G)(t)$ tal cual, sin expandir (usa / y ^; por ejemplo (t+1)/(t-1)).",
        "If $F(t) = t^2 + 7t + 1$ and $G(t) = \\dfrac{2}{t - 1}$, find $(F \\circ G)(t)$ and $(G \\circ F)(t)$.\n\nEnter the rule of $(F \\circ G)(t)$ as is, without expanding (use / and ^; e.g. (t+1)/(t-1)).",
      ),
      answer: {
        kind: "expression",
        accepted: ["4/(t-1)^2+14/(t-1)+1"],
        variables: ["t"],
      },
      hints: [
        L(
          "$(F \\circ G)(t) = F(G(t))$: sustituye la $t$ por $\\dfrac{2}{t-1}$ en TODA la regla de $F$.",
          "$(F \\circ G)(t) = F(G(t))$: substitute $t$ by $\\dfrac{2}{t-1}$ in the WHOLE rule of $F$.",
        ),
        L(
          "Término a término: $\\left(\\dfrac{2}{t-1}\\right)^2 + 7 \\cdot \\dfrac{2}{t-1} + 1$.",
          "Term by term: $\\left(\\dfrac{2}{t-1}\\right)^2 + 7 \\cdot \\dfrac{2}{t-1} + 1$.",
        ),
        L(
          "$\\left(\\dfrac{2}{t-1}\\right)^2 = \\dfrac{4}{(t-1)^2}$ y $7 \\cdot \\dfrac{2}{t-1} = \\dfrac{14}{t-1}$: suma los tres términos.",
          "$\\left(\\dfrac{2}{t-1}\\right)^2 = \\dfrac{4}{(t-1)^2}$ and $7 \\cdot \\dfrac{2}{t-1} = \\dfrac{14}{t-1}$: add the three terms.",
        ),
      ],
      answerDisplay: L(
        "$(F \\circ G)(t) = \\dfrac{4}{(t-1)^2} + \\dfrac{14}{t-1} + 1$",
        "$(F \\circ G)(t) = \\dfrac{4}{(t-1)^2} + \\dfrac{14}{t-1} + 1$",
      ),
      solution: [
        step(
          "given",
          "$F(t) = t^2 + 7t + 1$ y $G(t) = \\dfrac{2}{t - 1}$; se piden $(F \\circ G)(t)$ y $(G \\circ F)(t)$.",
          "$F(t) = t^2 + 7t + 1$ and $G(t) = \\dfrac{2}{t - 1}$; both $(F \\circ G)(t)$ and $(G \\circ F)(t)$ are requested.",
        ),
        step(
          "approach",
          "Se sustituye el cociente de $G$ en cada término de $F$, calculando cada trozo por separado y sin expandir los denominadores.",
          "Substitute the quotient of $G$ into each term of $F$, computing each piece separately and without expanding the denominators.",
        ),
        step(
          "calculation",
          "$(F \\circ G)(t) = F\\left(\\dfrac{2}{t-1}\\right) = \\left(\\dfrac{2}{t-1}\\right)^2 + 7 \\cdot \\dfrac{2}{t-1} + 1 = \\dfrac{4}{(t-1)^2} + \\dfrac{14}{t-1} + 1$.<br>El otro orden: $(G \\circ F)(t) = \\dfrac{2}{F(t) - 1} = \\dfrac{2}{t^2 + 7t + 1 - 1} = \\dfrac{2}{t^2 + 7t}$ — el $+1$ y el $-1$ se cancelan.",
          "$(F \\circ G)(t) = F\\left(\\dfrac{2}{t-1}\\right) = \\left(\\dfrac{2}{t-1}\\right)^2 + 7 \\cdot \\dfrac{2}{t-1} + 1 = \\dfrac{4}{(t-1)^2} + \\dfrac{14}{t-1} + 1$.<br>The other order: $(G \\circ F)(t) = \\dfrac{2}{F(t) - 1} = \\dfrac{2}{t^2 + 7t + 1 - 1} = \\dfrac{2}{t^2 + 7t}$ — the $+1$ and the $-1$ cancel.",
        ),
        step(
          "result",
          "$(F \\circ G)(t) = \\dfrac{4}{(t-1)^2} + \\dfrac{14}{t-1} + 1$ (y $(G \\circ F)(t) = \\dfrac{2}{t^2 + 7t}$). Verificación con $t = 3$: por un lado $G(3) = \\tfrac{2}{2} = 1$ y $F(1) = 1 + 7 + 1 = 9$; por el otro $\\dfrac{4}{2^2} + \\dfrac{14}{2} + 1 = 1 + 7 + 1 = 9$ ✓.",
          "$(F \\circ G)(t) = \\dfrac{4}{(t-1)^2} + \\dfrac{14}{t-1} + 1$ (and $(G \\circ F)(t) = \\dfrac{2}{t^2 + 7t}$). Check with $t = 3$: on one side $G(3) = \\tfrac{2}{2} = 1$ and $F(1) = 1 + 7 + 1 = 9$; on the other $\\dfrac{4}{2^2} + \\dfrac{14}{2} + 1 = 1 + 7 + 1 = 9$ ✓.",
        ),
      ],
    }),
  ),

  /* S11 #8 — F(t)=√t, G(t)=2t²−2t+1: se pide (F∘G)(t) = √(2t²−2t+1)
     (el interior NO es un cuadrado perfecto); (G∘F)(t) = 2t−2√t+1 en
     la solución. */
  template(
    {
      id: "comp-uees-8",
      subject: "math",
      topicId: "functions",
      subtopicId: "composition",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 180,
      tags: ["composition", "radicals"],
      prerequisites: ["evaluation"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "11 · 8",
        page: 13,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L(
        "Componer con una raíz por fuera",
        "Composing with a root on the outside",
      ),
      statement: L(
        "Si $F(t) = \\sqrt{t}$ y $G(t) = 2t^2 - 2t + 1$, encuentre $(F \\circ G)(t)$ y $(G \\circ F)(t)$.\n\nEscriba la regla de $(F \\circ G)(t)$ (usa sqrt(...) para la raíz y ^ para potencias; por ejemplo sqrt(t+1)).",
        "If $F(t) = \\sqrt{t}$ and $G(t) = 2t^2 - 2t + 1$, find $(F \\circ G)(t)$ and $(G \\circ F)(t)$.\n\nEnter the rule of $(F \\circ G)(t)$ (use sqrt(...) for the root and ^ for powers; e.g. sqrt(t+1)).",
      ),
      answer: {
        kind: "expression",
        accepted: ["sqrt(2t^2-2t+1)"],
        variables: ["t"],
      },
      hints: [
        L(
          "La raíz de $F$ envuelve a TODA la regla de $G$: $(F \\circ G)(t) = \\sqrt{G(t)}$.",
          "The root of $F$ wraps the WHOLE rule of $G$: $(F \\circ G)(t) = \\sqrt{G(t)}$.",
        ),
        L(
          "Queda $\\sqrt{2t^2 - 2t + 1}$: antes de responder, revisa si el interior se simplifica.",
          "It becomes $\\sqrt{2t^2 - 2t + 1}$: before answering, check whether the inside simplifies.",
        ),
        L(
          "El interior $2t^2 - 2t + 1$ NO es un cuadrado perfecto (el término lineal de un cuadrado perfecto sería $\\pm 2\\sqrt{2}\\,t$): la raíz se queda; escríbela con sqrt(...) y el interior entre paréntesis.",
          "The inside $2t^2 - 2t + 1$ is NOT a perfect square (the linear term of a perfect square would be $\\pm 2\\sqrt{2}\\,t$): the root stays; write it with sqrt(...) and the inside in parentheses.",
        ),
      ],
      answerDisplay: L(
        "$(F \\circ G)(t) = \\sqrt{2t^2 - 2t + 1}$",
        "$(F \\circ G)(t) = \\sqrt{2t^2 - 2t + 1}$",
      ),
      solution: [
        step(
          "given",
          "$F(t) = \\sqrt{t}$ y $G(t) = 2t^2 - 2t + 1$; se piden $(F \\circ G)(t)$ y $(G \\circ F)(t)$.",
          "$F(t) = \\sqrt{t}$ and $G(t) = 2t^2 - 2t + 1$; both $(F \\circ G)(t)$ and $(G \\circ F)(t)$ are requested.",
        ),
        step(
          "approach",
          "La regla de $G$ entra bajo la raíz de $F$; antes de dejar la raíz, se comprueba si el interior es un cuadrado perfecto.",
          "The rule of $G$ goes under the root of $F$; before leaving the root, one checks whether the inside is a perfect square.",
        ),
        step(
          "calculation",
          "$(F \\circ G)(t) = F\\left(2t^2 - 2t + 1\\right) = \\sqrt{2t^2 - 2t + 1}$ — el interior no es un cuadrado perfecto, así que la raíz queda.<br>El otro orden: $(G \\circ F)(t) = G\\left(\\sqrt{t}\\right) = 2\\left(\\sqrt{t}\\right)^2 - 2\\sqrt{t} + 1 = 2t - 2\\sqrt{t} + 1$ (válido para $t \\ge 0$).",
          "$(F \\circ G)(t) = F\\left(2t^2 - 2t + 1\\right) = \\sqrt{2t^2 - 2t + 1}$ — the inside is not a perfect square, so the root stays.<br>The other order: $(G \\circ F)(t) = G\\left(\\sqrt{t}\\right) = 2\\left(\\sqrt{t}\\right)^2 - 2\\sqrt{t} + 1 = 2t - 2\\sqrt{t} + 1$ (valid for $t \\ge 0$).",
        ),
        step(
          "result",
          "$(F \\circ G)(t) = \\sqrt{2t^2 - 2t + 1}$ (y $(G \\circ F)(t) = 2t - 2\\sqrt{t} + 1$). Verificación con $t = 2$: por un lado $G(2) = 8 - 4 + 1 = 5$ y $F(5) = \\sqrt{5}$; por el otro $\\sqrt{2 \\cdot 4 - 4 + 1} = \\sqrt{5}$ ✓ (idénticos).",
          "$(F \\circ G)(t) = \\sqrt{2t^2 - 2t + 1}$ (and $(G \\circ F)(t) = 2t - 2\\sqrt{t} + 1$). Check with $t = 2$: on one side $G(2) = 8 - 4 + 1 = 5$ and $F(5) = \\sqrt{5}$; on the other $\\sqrt{2 \\cdot 4 - 4 + 1} = \\sqrt{5}$ ✓ (identical).",
        ),
      ],
    }),
  ),

  /* S11 #9 — f(v)=1/(v²+1), g(v)=√(v+2): se pide (f∘g)(v) = 1/(v+3);
     la gracia: (√(v+2))² = v+2, NO (v+2)². (g∘f)(v) = √((2v²+3)/(v²+1))
     en la solución. */
  template(
    {
      id: "comp-uees-9",
      subject: "math",
      topicId: "functions",
      subtopicId: "composition",
      difficulty: "hard",
      questionType: "expression",
      estimatedTimeSec: 180,
      tags: ["composition", "radicals", "simplification"],
      prerequisites: ["evaluation"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "11 · 9",
        page: 13,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L(
        "Componer con una raíz dentro: el cuadrado la deshace",
        "Composing with a root inside: the square undoes it",
      ),
      statement: L(
        "Si $f(v) = \\dfrac{1}{v^2 + 1}$ y $g(v) = \\sqrt{v + 2}$, encuentre $(f \\circ g)(v)$ y $(g \\circ f)(v)$.\n\nEscriba la regla de $(f \\circ g)(v)$ (usa sqrt(...) para la raíz; por ejemplo 1/(v+1)).",
        "If $f(v) = \\dfrac{1}{v^2 + 1}$ and $g(v) = \\sqrt{v + 2}$, find $(f \\circ g)(v)$ and $(g \\circ f)(v)$.\n\nEnter the rule of $(f \\circ g)(v)$ (use sqrt(...) for the root; e.g. 1/(v+1)).",
      ),
      answer: {
        kind: "expression",
        accepted: ["1/(v+3)"],
        variables: ["v"],
      },
      hints: [
        L(
          "$(f \\circ g)(v) = f(g(v)) = \\dfrac{1}{(g(v))^2 + 1}$: primero el denominador.",
          "$(f \\circ g)(v) = f(g(v)) = \\dfrac{1}{(g(v))^2 + 1}$: the denominator first.",
        ),
        L(
          "$(\\sqrt{v+2})^2 = v + 2$ (para $v \\ge -2$): el cuadrado deshace la raíz. ¡NO es $(v + 2)^2$!",
          "$(\\sqrt{v+2})^2 = v + 2$ (for $v \\ge -2$): the square undoes the root. It is NOT $(v + 2)^2$!",
        ),
        L(
          "El denominador queda $(v + 2) + 1$: simplifícalo a un solo binomio.",
          "The denominator becomes $(v + 2) + 1$: simplify it to a single binomial.",
        ),
      ],
      answerDisplay: L(
        "$(f \\circ g)(v) = \\dfrac{1}{v + 3}$",
        "$(f \\circ g)(v) = \\dfrac{1}{v + 3}$",
      ),
      solution: [
        step(
          "given",
          "$f(v) = \\dfrac{1}{v^2 + 1}$ y $g(v) = \\sqrt{v + 2}$; se piden $(f \\circ g)(v)$ y $(g \\circ f)(v)$.",
          "$f(v) = \\dfrac{1}{v^2 + 1}$ and $g(v) = \\sqrt{v + 2}$; both $(f \\circ g)(v)$ and $(g \\circ f)(v)$ are requested.",
        ),
        step(
          "approach",
          "Se sustituye $\\sqrt{v+2}$ en la regla de $f$; el punto clave del ítem es que elevar al cuadrado una raíz cuadrada la cancela.",
          "Substitute $\\sqrt{v+2}$ into the rule of $f$; the key point of this item is that squaring a square root cancels it.",
        ),
        step(
          "calculation",
          "$(f \\circ g)(v) = f\\left(\\sqrt{v+2}\\right) = \\dfrac{1}{\\left(\\sqrt{v+2}\\right)^2 + 1} = \\dfrac{1}{v + 2 + 1} = \\dfrac{1}{v + 3}$ — la trampa sería desarrollar $(v+2)^2 = v^2 + 4v + 5$, que está MAL.<br>El otro orden: $(g \\circ f)(v) = \\sqrt{\\dfrac{1}{v^2+1} + 2} = \\sqrt{\\dfrac{1 + 2v^2 + 2}{v^2+1}} = \\sqrt{\\dfrac{2v^2 + 3}{v^2 + 1}}$.",
          "$(f \\circ g)(v) = f\\left(\\sqrt{v+2}\\right) = \\dfrac{1}{\\left(\\sqrt{v+2}\\right)^2 + 1} = \\dfrac{1}{v + 2 + 1} = \\dfrac{1}{v + 3}$ — the trap would be expanding $(v+2)^2 = v^2 + 4v + 5$, which is WRONG.<br>The other order: $(g \\circ f)(v) = \\sqrt{\\dfrac{1}{v^2+1} + 2} = \\sqrt{\\dfrac{1 + 2v^2 + 2}{v^2+1}} = \\sqrt{\\dfrac{2v^2 + 3}{v^2 + 1}}$.",
        ),
        step(
          "result",
          "$(f \\circ g)(v) = \\dfrac{1}{v + 3}$ (y $(g \\circ f)(v) = \\sqrt{\\dfrac{2v^2+3}{v^2+1}}$): el cuadrado de la raíz devolvió el interior limpio. Verificación con $v = 2$: por un lado $g(2) = \\sqrt{4} = 2$ y $f(2) = \\tfrac{1}{5}$; por el otro $\\dfrac{1}{2 + 3} = \\tfrac{1}{5}$ ✓.",
          "$(f \\circ g)(v) = \\dfrac{1}{v + 3}$ (and $(g \\circ f)(v) = \\sqrt{\\dfrac{2v^2+3}{v^2+1}}$): the square of the root returned the inside cleanly. Check with $v = 2$: on one side $g(2) = \\sqrt{4} = 2$ and $f(2) = \\tfrac{1}{5}$; on the other $\\dfrac{1}{2 + 3} = \\tfrac{1}{5}$ ✓.",
        ),
      ],
    }),
  ),

  /* S11 #10 — f(x)=x²+2x−1: se pide (f∘f)(x) = x⁴+4x³+4x²−2. Hint 3:
     con u = f(x), pide u²+2u−1 SIN expandir de golpe. La solución lleva
     el control numérico f(f(1)) = 7. */
  template(
    {
      id: "comp-uees-10",
      subject: "math",
      topicId: "functions",
      subtopicId: "composition",
      difficulty: "hard",
      questionType: "expression",
      estimatedTimeSec: 240,
      tags: ["composition", "polynomial-expansion"],
      prerequisites: ["evaluation"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "11 · 10",
        page: 13,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L(
        "Componer una función consigo misma y expandir",
        "Composing a function with itself and expanding",
      ),
      statement: L(
        "Si $f(x) = x^2 + 2x - 1$, encuentre $(f \\circ f)(x)$.\n\nEscriba el polinomio desarrollado y ordenado (usa ^ para potencias y * para multiplicar; por ejemplo 2*x^3-x^2+1).",
        "If $f(x) = x^2 + 2x - 1$, find $(f \\circ f)(x)$.\n\nEnter the expanded, ordered polynomial (use ^ for powers and * for multiplication; e.g. 2*x^3-x^2+1).",
      ),
      answer: {
        kind: "expression",
        accepted: ["x^4+4*x^3+4*x^2-2"],
        variables: ["x"],
      },
      hints: [
        L(
          "$(f \\circ f)(x) = f(f(x))$: la salida de $f$ vuelve a entrar en $f$.",
          "$(f \\circ f)(x) = f(f(x))$: the output of $f$ re-enters $f$.",
        ),
        L(
          "Con $u = f(x) = x^2 + 2x - 1$, lo pedido es $f(u) = u^2 + 2u - 1$.",
          "With $u = f(x) = x^2 + 2x - 1$, the request is $f(u) = u^2 + 2u - 1$.",
        ),
        L(
          "Sustituye $u$ pero NO expandas todo de golpe: primero $u^2$ (el cuadrado de un trinomio) y después $2u$; al final suma, resta y ordena.",
          "Substitute $u$ but do NOT expand everything at once: first $u^2$ (the square of a trinomial) and then $2u$; finally add, subtract and order.",
        ),
      ],
      answerDisplay: L(
        "$(f \\circ f)(x) = x^4 + 4x^3 + 4x^2 - 2$",
        "$(f \\circ f)(x) = x^4 + 4x^3 + 4x^2 - 2$",
      ),
      solution: [
        step(
          "given",
          "$f(x) = x^2 + 2x - 1$; se pide $(f \\circ f)(x) = f(f(x))$.",
          "$f(x) = x^2 + 2x - 1$; the request is $(f \\circ f)(x) = f(f(x))$.",
        ),
        step(
          "approach",
          "Con $u = f(x)$, lo pedido es $f(u) = u^2 + 2u - 1$: se calcula $u^2$ y $2u$ por separado y después se juntan y se ordenan.",
          "With $u = f(x)$, the request is $f(u) = u^2 + 2u - 1$: compute $u^2$ and $2u$ separately and then join and order them.",
        ),
        step(
          "calculation",
          "$u = x^2 + 2x - 1$.<br>$u^2 = \\left(x^2 + 2x - 1\\right)^2 = x^4 + 4x^3 + 2x^2 - 4x + 1$;<br>$2u = 2x^2 + 4x - 2$;<br>$u^2 + 2u - 1 = x^4 + 4x^3 + (2 + 2)x^2 + (-4 + 4)x + (1 - 2 - 1) = x^4 + 4x^3 + 4x^2 - 2$.",
          "$u = x^2 + 2x - 1$.<br>$u^2 = \\left(x^2 + 2x - 1\\right)^2 = x^4 + 4x^3 + 2x^2 - 4x + 1$;<br>$2u = 2x^2 + 4x - 2$;<br>$u^2 + 2u - 1 = x^4 + 4x^3 + (2 + 2)x^2 + (-4 + 4)x + (1 - 2 - 1) = x^4 + 4x^3 + 4x^2 - 2$.",
        ),
        step(
          "result",
          "$(f \\circ f)(x) = x^4 + 4x^3 + 4x^2 - 2$: los términos lineales $-4x$ y $+4x$ se cancelan. Control numérico: $f(1) = 1 + 2 - 1 = 2$, así que $f(f(1)) = f(2) = 4 + 4 - 1 = 7$; por el otro lado, con $x = 1$: $1 + 4 + 4 - 2 = 7$ ✓.",
          "$(f \\circ f)(x) = x^4 + 4x^3 + 4x^2 - 2$: the linear terms $-4x$ and $+4x$ cancel. Numeric check: $f(1) = 1 + 2 - 1 = 2$, so $f(f(1)) = f(2) = 4 + 4 - 1 = 7$; on the other side, with $x = 1$: $1 + 4 + 4 - 2 = 7$ ✓.",
        ),
      ],
    }),
  ),

  /* S11 #17 — utilidad del café: r(x)=9,75x, e(x)=4500+4,25x; se pide
     (r−e)(x) = 5,5x−4500. El enunciado transcribe el problema completo;
     las partes (a) y (b) van resueltas en la solución. */
  template(
    {
      id: "comp-uees-17",
      subject: "math",
      topicId: "functions",
      subtopicId: "composition",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 150,
      tags: ["composition", "modeling", "profit"],
      prerequisites: ["evaluation", "linear-equations"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "11 · 17",
        page: 13,
      },
      reasoning: "modeling",
    },
    () => ({
      skill: L(
        "Modelar ingreso y gasto y restar funciones",
        "Modeling revenue and cost and subtracting functions",
      ),
      statement: L(
        "Un expendio de café vende una libra de café en $\\text{\\textdollar}9{,}75$. Los gastos mensuales son de $\\text{\\textdollar}4500$ más $\\text{\\textdollar}4{,}25$ por cada libra de café vendida. La hoja pide: (a) la función $r(x)$ del ingreso mensual total según el número $x$ de libras vendidas; (b) la función $e(x)$ de los gastos mensuales totales; (c) la función utilidad $(r - e)(x)$.\n\nEscriba la regla de $(r - e)(x)$ — parte (c) — con $x$ como variable (por ejemplo 2x-100). Las partes (a) y (b) van resueltas en la solución.",
        "A coffee outlet sells a pound of coffee for $\\text{\\textdollar}9.75$. The monthly expenses are $\\text{\\textdollar}4500$ plus $\\text{\\textdollar}4.25$ for each pound of coffee sold. The worksheet asks for: (a) the function $r(x)$ for the total monthly revenue as a function of the number $x$ of pounds sold; (b) the function $e(x)$ for the total monthly expenses; (c) the profit function $(r - e)(x)$.\n\nEnter the rule of $(r - e)(x)$ — part (c) — with $x$ as the variable (e.g. 2x-100). Parts (a) and (b) are solved in the solution.",
      ),
      answer: {
        kind: "expression",
        accepted: ["5.5x-4500", "11/2x-4500", "11/2*x-4500"],
        variables: ["x"],
      },
      hints: [
        L(
          "Utilidad = ingreso − gasto: $(r - e)(x) = r(x) - e(x)$, la resta de dos funciones sobre la MISMA $x$.",
          "Profit = revenue − cost: $(r - e)(x) = r(x) - e(x)$, the subtraction of two functions on the SAME $x$.",
        ),
        L(
          "Los modelos: $r(x) = 9{,}75x$ (precio por cada libra) y $e(x) = 4500 + 4{,}25x$ (gasto fijo más gasto variable por libra).",
          "The models: $r(x) = 9.75x$ (price per pound) and $e(x) = 4500 + 4.25x$ (fixed cost plus variable cost per pound).",
        ),
        L(
          "$(r - e)(x) = 9{,}75x - (4500 + 4{,}25x)$: quita el paréntesis con cuidado y agrupa la $x$ — ¿cuánto queda $9{,}75 - 4{,}25$?",
          "$(r - e)(x) = 9.75x - (4500 + 4.25x)$: remove the parentheses carefully and group the $x$ — how much is $9.75 - 4.25$?",
        ),
      ],
      answerDisplay: L(
        "$(r - e)(x) = 5{,}5x - 4500$",
        "$(r - e)(x) = 5.5x - 4500$",
      ),
      solution: [
        step(
          "given",
          "Precio de venta: $\\text{\\textdollar}9{,}75$ por libra. Gastos: $\\text{\\textdollar}4500$ fijos al mes más $\\text{\\textdollar}4{,}25$ por libra vendida. Variable: $x$ = libras vendidas al mes.",
          "Selling price: $\\text{\\textdollar}9.75$ per pound. Expenses: $\\text{\\textdollar}4500$ fixed per month plus $\\text{\\textdollar}4.25$ per pound sold. Variable: $x$ = pounds sold per month.",
        ),
        step(
          "approach",
          "Se modela cada parte por separado y después se restan: la utilidad es el ingreso menos el gasto.",
          "Model each part separately and then subtract: profit is revenue minus cost.",
        ),
        step(
          "calculation",
          "(a) $r(x) = 9{,}75x$; (b) $e(x) = 4500 + 4{,}25x$; (c) $(r - e)(x) = 9{,}75x - (4500 + 4{,}25x) = 9{,}75x - 4500 - 4{,}25x = (9{,}75 - 4{,}25)x - 4500 = 5{,}5x - 4500$.",
          "(a) $r(x) = 9.75x$; (b) $e(x) = 4500 + 4.25x$; (c) $(r - e)(x) = 9.75x - (4500 + 4.25x) = 9.75x - 4500 - 4.25x = (9.75 - 4.25)x - 4500 = 5.5x - 4500$.",
        ),
        step(
          "result",
          "$(r - e)(x) = 5{,}5x - 4500$ (utilidad mensual en dólares; negativa mientras $x < 818$ aproximadamente). Verificación con $x = 1000$ libras: $r(1000) = 9{,}75 \\cdot 1000 = 9750$ y $e(1000) = 4500 + 4{,}25 \\cdot 1000 = 8750$, así que la utilidad es $9750 - 8750 = 1000$; por el otro lado $5{,}5 \\cdot 1000 - 4500 = 5500 - 4500 = 1000$ ✓.",
          "$(r - e)(x) = 5.5x - 4500$ (monthly profit in dollars; negative while $x < 818$ approximately). Check with $x = 1000$ pounds: $r(1000) = 9.75 \\cdot 1000 = 9750$ and $e(1000) = 4500 + 4.25 \\cdot 1000 = 8750$, so the profit is $9750 - 8750 = 1000$; on the other side $5.5 \\cdot 1000 - 4500 = 5500 - 4500 = 1000$ ✓.",
        ),
      ],
    }),
  ),

  /* ------------------------------------------------------------------ */
  /* S12 · Función inversa (pág. 14) — enunciado común: «Halle la        */
  /* función inversa (intercambia el papel de x e y y despeja)».        */
  /* ------------------------------------------------------------------ */

  /* S12 #1 — f(x)=3x+7: inversa (x−7)/3. La solución muestra que la
     inversa deshace las operaciones en orden contrario. */
  template(
    {
      id: "inv-uees-1",
      subject: "math",
      topicId: "functions",
      subtopicId: "inverse",
      difficulty: "easy",
      questionType: "expression",
      estimatedTimeSec: 75,
      tags: ["inverse", "linear-function"],
      prerequisites: ["notation"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "12 · 1",
        page: 14,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L(
        "Inversa de una función lineal",
        "Inverse of a linear function",
      ),
      statement: L(
        "Halle la función inversa (intercambia el papel de $x$ e $y$ y despeja):\n\n$$f(x) = 3x + 7$$\n\nEscriba la regla de $f^{-1}(x)$ con $x$ como variable (por ejemplo (x-1)/2).",
        "Find the inverse function (swap the roles of $x$ and $y$ and solve):\n\n$$f(x) = 3x + 7$$\n\nEnter the rule of $f^{-1}(x)$ with $x$ as the variable (e.g. (x-1)/2).",
      ),
      answer: {
        kind: "expression",
        accepted: ["(x-7)/3", "x/3-7/3"],
        variables: ["x"],
      },
      hints: [
        L(
          "Escribe $y = 3x + 7$ e intercambia las letras: $x = 3y + 7$.",
          "Write $y = 3x + 7$ and swap the letters: $x = 3y + 7$.",
        ),
        L(
          "Despeja la nueva $y$: primero resta el $7$ en ambos lados.",
          "Solve for the new $y$: first subtract $7$ on both sides.",
        ),
        L(
          "Queda $3y = x - 7$: despeja $y$ dividiendo entre $3$.",
          "It remains $3y = x - 7$: solve for $y$ by dividing by $3$.",
        ),
      ],
      answerDisplay: L(
        "$f^{-1}(x) = \\dfrac{x - 7}{3}$",
        "$f^{-1}(x) = \\dfrac{x - 7}{3}$",
      ),
      solution: [
        step(
          "given",
          "$f(x) = 3x + 7$: primero multiplica por $3$ y después suma $7$.",
          "$f(x) = 3x + 7$: it multiplies by $3$ first and adds $7$ second.",
        ),
        step(
          "approach",
          "La inversa deshace la operación: escribir $y = f(x)$, intercambiar $x \\leftrightarrow y$ y despejar la nueva $y$.",
          "The inverse undoes the operation: write $y = f(x)$, swap $x \\leftrightarrow y$ and solve for the new $y$.",
        ),
        step(
          "calculation",
          "$y = 3x + 7$ → intercambio: $x = 3y + 7$ → resto $7$: $x - 7 = 3y$ → divido entre $3$: $y = \\dfrac{x - 7}{3}$.",
          "$y = 3x + 7$ → swap: $x = 3y + 7$ → subtract $7$: $x - 7 = 3y$ → divide by $3$: $y = \\dfrac{x - 7}{3}$.",
        ),
        step(
          "result",
          "$f^{-1}(x) = \\dfrac{x - 7}{3}$: deshace primero la suma y después el producto, en orden CONTRARIO al de $f$. Verificación con $x = 16$: $f^{-1}(16) = \\tfrac{16 - 7}{3} = 3$ y $f(3) = 9 + 7 = 16$ ✓ (vuelve al punto de partida).",
          "$f^{-1}(x) = \\dfrac{x - 7}{3}$: it undoes the addition first and the multiplication second, in the REVERSE order of $f$. Check with $x = 16$: $f^{-1}(16) = \\tfrac{16 - 7}{3} = 3$ and $f(3) = 9 + 7 = 16$ ✓ (back to the starting point).",
        ),
      ],
    }),
  ),

  /* S12 #2 — g(x)=5x−3: inversa (x+3)/5; el −3 pasa sumando. */
  template(
    {
      id: "inv-uees-2",
      subject: "math",
      topicId: "functions",
      subtopicId: "inverse",
      difficulty: "easy",
      questionType: "expression",
      estimatedTimeSec: 75,
      tags: ["inverse", "linear-function"],
      prerequisites: ["notation"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "12 · 2",
        page: 14,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L(
        "Inversa de una función lineal con término negativo",
        "Inverse of a linear function with a negative term",
      ),
      statement: L(
        "Halle la función inversa (intercambia el papel de $x$ e $y$ y despeja):\n\n$$g(x) = 5x - 3$$\n\nEscriba la regla de $g^{-1}(x)$ con $x$ como variable (por ejemplo (x+1)/2).",
        "Find the inverse function (swap the roles of $x$ and $y$ and solve):\n\n$$g(x) = 5x - 3$$\n\nEnter the rule of $g^{-1}(x)$ with $x$ as the variable (e.g. (x+1)/2).",
      ),
      answer: {
        kind: "expression",
        accepted: ["(x+3)/5", "x/5+3/5"],
        variables: ["x"],
      },
      hints: [
        L(
          "Escribe $y = 5x - 3$ e intercambia las letras: $x = 5y - 3$.",
          "Write $y = 5x - 3$ and swap the letters: $x = 5y - 3$.",
        ),
        L(
          "Despeja la nueva $y$: el $-3$ pasa al otro lado SUMANDO.",
          "Solve for the new $y$: the $-3$ moves to the other side ADDING.",
        ),
        L(
          "Queda $5y = x + 3$: despeja $y$ dividiendo entre $5$.",
          "It remains $5y = x + 3$: solve for $y$ by dividing by $5$.",
        ),
      ],
      answerDisplay: L(
        "$g^{-1}(x) = \\dfrac{x + 3}{5}$",
        "$g^{-1}(x) = \\dfrac{x + 3}{5}$",
      ),
      solution: [
        step(
          "given",
          "$g(x) = 5x - 3$: primero multiplica por $5$ y después resta $3$.",
          "$g(x) = 5x - 3$: it multiplies by $5$ first and subtracts $3$ second.",
        ),
        step(
          "approach",
          "Intercambiar $x \\leftrightarrow y$ y despejar: la inversa deshace la resta con una suma y el producto con una división.",
          "Swap $x \\leftrightarrow y$ and solve: the inverse undoes the subtraction with an addition and the multiplication with a division.",
        ),
        step(
          "calculation",
          "$y = 5x - 3$ → intercambio: $x = 5y - 3$ → sumo $3$: $x + 3 = 5y$ → divido entre $5$: $y = \\dfrac{x + 3}{5}$.",
          "$y = 5x - 3$ → swap: $x = 5y - 3$ → add $3$: $x + 3 = 5y$ → divide by $5$: $y = \\dfrac{x + 3}{5}$.",
        ),
        step(
          "result",
          "$g^{-1}(x) = \\dfrac{x + 3}{5}$. Verificación con $x = 7$: $g^{-1}(7) = \\tfrac{7 + 3}{5} = 2$ y $g(2) = 10 - 3 = 7$ ✓ (la inversa devuelve la entrada original).",
          "$g^{-1}(x) = \\dfrac{x + 3}{5}$. Check with $x = 7$: $g^{-1}(7) = \\tfrac{7 + 3}{5} = 2$ and $g(2) = 10 - 3 = 7$ ✓ (the inverse returns the original input).",
        ),
      ],
    }),
  ),

  /* S12 #3 — F(x)=½x−7: inversa 2x+14. Trampa mental: x/2+7 (dividir en
     vez de multiplicar) — hint 3 la ataca. */
  template(
    {
      id: "inv-uees-3",
      subject: "math",
      topicId: "functions",
      subtopicId: "inverse",
      difficulty: "easy",
      questionType: "expression",
      estimatedTimeSec: 90,
      tags: ["inverse", "linear-function", "common-mistake"],
      prerequisites: ["notation"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "12 · 3",
        page: 14,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L(
        "Inversa de una lineal con coeficiente fraccionario",
        "Inverse of a linear function with a fractional coefficient",
      ),
      statement: L(
        "Halle la función inversa (intercambia el papel de $x$ e $y$ y despeja):\n\n$$F(x) = \\dfrac{1}{2}x - 7$$\n\nEscriba la regla de $F^{-1}(x)$ con $x$ como variable (por ejemplo 2x+1).",
        "Find the inverse function (swap the roles of $x$ and $y$ and solve):\n\n$$F(x) = \\dfrac{1}{2}x - 7$$\n\nEnter the rule of $F^{-1}(x)$ with $x$ as the variable (e.g. 2x+1).",
      ),
      answer: {
        kind: "expression",
        accepted: ["2x+14"],
        variables: ["x"],
      },
      hints: [
        L(
          "Escribe $y = \\tfrac{1}{2}x - 7$ e intercambia las letras: $x = \\tfrac{1}{2}y - 7$.",
          "Write $y = \\tfrac{1}{2}x - 7$ and swap the letters: $x = \\tfrac{1}{2}y - 7$.",
        ),
        L(
          "Suma $7$ en ambos lados: queda $x + 7 = \\tfrac{1}{2}y$. El $\\tfrac{1}{2}$ está MULTIPLICANDO a la $y$.",
          "Add $7$ on both sides: it remains $x + 7 = \\tfrac{1}{2}y$. The $\\tfrac{1}{2}$ is MULTIPLYING the $y$.",
        ),
        L(
          "Para deshacer un producto por $\\tfrac{1}{2}$ hay que MULTIPLICAR por $2$, no dividir: $\\tfrac{x}{2} + 7$ es la trampa clásica.",
          "To undo a multiplication by $\\tfrac{1}{2}$ you must MULTIPLY by $2$, not divide: $\\tfrac{x}{2} + 7$ is the classic trap.",
        ),
      ],
      answerDisplay: L(
        "$F^{-1}(x) = 2x + 14$",
        "$F^{-1}(x) = 2x + 14$",
      ),
      solution: [
        step(
          "given",
          "$F(x) = \\dfrac{1}{2}x - 7$: multiplica por $\\tfrac{1}{2}$ y después resta $7$.",
          "$F(x) = \\dfrac{1}{2}x - 7$: it multiplies by $\\tfrac{1}{2}$ and then subtracts $7$.",
        ),
        step(
          "approach",
          "Intercambiar $x \\leftrightarrow y$ y despejar; el cuidado está en deshacer el $\\tfrac{1}{2}$ con la operación inversa correcta.",
          "Swap $x \\leftrightarrow y$ and solve; the care lies in undoing the $\\tfrac{1}{2}$ with the correct inverse operation.",
        ),
        step(
          "calculation",
          "$y = \\tfrac{1}{2}x - 7$ → intercambio: $x = \\tfrac{1}{2}y - 7$ → sumo $7$: $x + 7 = \\tfrac{1}{2}y$ → multiplico por $2$: $2(x + 7) = y$ → $y = 2x + 14$.",
          "$y = \\tfrac{1}{2}x - 7$ → swap: $x = \\tfrac{1}{2}y - 7$ → add $7$: $x + 7 = \\tfrac{1}{2}y$ → multiply by $2$: $2(x + 7) = y$ → $y = 2x + 14$.",
        ),
        step(
          "result",
          "$F^{-1}(x) = 2x + 14$ — ¡se MULTIPLICA por 2, no se divide! Verificación con $x = 10$: $F^{-1}(10) = 20 + 14 = 34$ y $F(34) = 17 - 7 = 10$ ✓; en cambio la trampa $\\tfrac{10}{2} + 7 = 12$ da $F(12) = 6 - 7 = -1 \\ne 10$ ✗ (deshace las operaciones en el orden equivocado).",
          "$F^{-1}(x) = 2x + 14$ — you MULTIPLY by 2, you do not divide! Check with $x = 10$: $F^{-1}(10) = 20 + 14 = 34$ and $F(34) = 17 - 7 = 10$ ✓; in contrast the trap $\\tfrac{10}{2} + 7 = 12$ gives $F(12) = 6 - 7 = -1 \\ne 10$ ✗ (it undoes the operations in the wrong order).",
        ),
      ],
    }),
  ),

  /* S12 #4 — f(x)=(4x−5)² con x ≥ 5/4: la restricción elige la rama
     creciente; inversa (√x+5)/4, dominio de f⁻¹: y ≥ 0 (el rango de la
     original) — documentado en la solución. Hint 3 del brief: ¿cuál de
     las dos ramas respeta x ≥ 5/4? */
  template(
    {
      id: "inv-uees-4",
      subject: "math",
      topicId: "functions",
      subtopicId: "inverse",
      difficulty: "hard",
      questionType: "expression",
      estimatedTimeSec: 210,
      tags: ["inverse", "square-root", "branch-selection"],
      prerequisites: ["notation", "domain-range"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "12 · 4",
        page: 14,
      },
      reasoning: "case-analysis",
    },
    () => ({
      skill: L(
        "Inversa de una cuadrática restringida a su rama creciente",
        "Inverse of a quadratic restricted to its increasing branch",
      ),
      statement: L(
        "Halle la función inversa (intercambia el papel de $x$ e $y$ y despeja):\n\n$$f(x) = (4x - 5)^2, \\quad x \\ge \\tfrac{5}{4}$$\n\nEscriba la regla de $f^{-1}(x)$ con $x$ como variable (usa sqrt(...) para la raíz; por ejemplo (sqrt(x)+1)/3).",
        "Find the inverse function (swap the roles of $x$ and $y$ and solve):\n\n$$f(x) = (4x - 5)^2, \\quad x \\ge \\tfrac{5}{4}$$\n\nEnter the rule of $f^{-1}(x)$ with $x$ as the variable (use sqrt(...) for the root; e.g. (sqrt(x)+1)/3).",
      ),
      answer: {
        kind: "expression",
        accepted: ["(sqrt(x)+5)/4", "(5+sqrt(x))/4"],
        variables: ["x"],
      },
      hints: [
        L(
          "La restricción $x \\ge \\tfrac{5}{4}$ hace a $f$ inyectiva: sobre esa rama $4x - 5 \\ge 0$ y la función es creciente.",
          "The restriction $x \\ge \\tfrac{5}{4}$ makes $f$ one-to-one: on that branch $4x - 5 \\ge 0$ and the function is increasing.",
        ),
        L(
          "Intercambia: $y = (4x - 5)^2$ → $x = (4y - 5)^2$. Al despejar con raíz cuadrada aparecen DOS ramas: $4y - 5 = \\sqrt{x}$ o $4y - 5 = -\\sqrt{x}$.",
          "Swap: $y = (4x - 5)^2$ → $x = (4y - 5)^2$. Solving with a square root yields TWO branches: $4y - 5 = \\sqrt{x}$ or $4y - 5 = -\\sqrt{x}$.",
        ),
        L(
          "La restricción original pasa ahora a la nueva $y$: ¿cuál de las dos ramas respeta $y \\ge \\tfrac{5}{4}$? Con esa rama, despeja la $y$.",
          "The original restriction now applies to the new $y$: which of the two branches respects $y \\ge \\tfrac{5}{4}$? With that branch, solve for $y$.",
        ),
      ],
      answerDisplay: L(
        "$f^{-1}(x) = \\dfrac{\\sqrt{x} + 5}{4}$, para $x \\ge 0$",
        "$f^{-1}(x) = \\dfrac{\\sqrt{x} + 5}{4}$, for $x \\ge 0$",
      ),
      solution: [
        step(
          "given",
          "$f(x) = (4x - 5)^2$ con la restricción $x \\ge \\tfrac{5}{4}$: sobre ese dominio $4x - 5 \\ge 0$, así que $f$ es creciente e inyectiva (tiene inversa).",
          "$f(x) = (4x - 5)^2$ with the restriction $x \\ge \\tfrac{5}{4}$: on that domain $4x - 5 \\ge 0$, so $f$ is increasing and one-to-one (it has an inverse).",
        ),
        step(
          "approach",
          "Intercambiar $x \\leftrightarrow y$, despejar con raíz cuadrada y elegir la rama que respeta la restricción original (ahora sobre la nueva $y$).",
          "Swap $x \\leftrightarrow y$, solve with a square root and choose the branch that respects the original restriction (now on the new $y$).",
        ),
        step(
          "calculation",
          "$y = (4x - 5)^2$ → intercambio: $x = (4y - 5)^2$ → raíz: $4y - 5 = \\pm\\sqrt{x}$.<br>La rama $4y - 5 = -\\sqrt{x}$ da $y = \\tfrac{5 - \\sqrt{x}}{4} \\le \\tfrac{5}{4}$, que VIOLA la restricción $y \\ge \\tfrac{5}{4}$.<br>La rama $4y - 5 = +\\sqrt{x}$ respeta la restricción: $4y = \\sqrt{x} + 5$ → $y = \\dfrac{\\sqrt{x} + 5}{4}$.",
          "$y = (4x - 5)^2$ → swap: $x = (4y - 5)^2$ → root: $4y - 5 = \\pm\\sqrt{x}$.<br>The branch $4y - 5 = -\\sqrt{x}$ gives $y = \\tfrac{5 - \\sqrt{x}}{4} \\le \\tfrac{5}{4}$, which VIOLATES the restriction $y \\ge \\tfrac{5}{4}$.<br>The branch $4y - 5 = +\\sqrt{x}$ respects the restriction: $4y = \\sqrt{x} + 5$ → $y = \\dfrac{\\sqrt{x} + 5}{4}$.",
        ),
        step(
          "result",
          "$f^{-1}(x) = \\dfrac{\\sqrt{x} + 5}{4}$. El dominio de la inversa es el RANGO de la original: como $x \\ge \\tfrac{5}{4}$ fuerza $4x - 5 \\ge 0$, las salidas $(4x-5)^2$ cubren exactamente $[0, \\infty)$ — es decir, $f^{-1}$ está definida para $x \\ge 0$. Verificación con $x = 9$: $f^{-1}(9) = \\tfrac{3 + 5}{4} = 2$ y $f(2) = (8 - 5)^2 = 9$ ✓; y en la frontera $f\\left(\\tfrac{5}{4}\\right) = 0$, en efecto $f^{-1}(0) = \\tfrac{0 + 5}{4} = \\tfrac{5}{4}$ ✓.",
          "$f^{-1}(x) = \\dfrac{\\sqrt{x} + 5}{4}$. The domain of the inverse is the RANGE of the original: since $x \\ge \\tfrac{5}{4}$ forces $4x - 5 \\ge 0$, the outputs $(4x-5)^2$ cover exactly $[0, \\infty)$ — that is, $f^{-1}$ is defined for $x \\ge 0$. Check with $x = 9$: $f^{-1}(9) = \\tfrac{3 + 5}{4} = 2$ and $f(2) = (8 - 5)^2 = 9$ ✓; and at the boundary $f\\left(\\tfrac{5}{4}\\right) = 0$, indeed $f^{-1}(0) = \\tfrac{0 + 5}{4} = \\tfrac{5}{4}$ ✓.",
        ),
      ],
    }),
  ),

  /* S12 #5 — A(r)=πr², r ≥ 0 (área del círculo): inversa √(x/π); la
     restricción elige la raíz positiva. */
  template(
    {
      id: "inv-uees-5",
      subject: "math",
      topicId: "functions",
      subtopicId: "inverse",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 150,
      tags: ["inverse", "circle-area"],
      prerequisites: ["notation", "domain-range"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "12 · 5",
        page: 14,
      },
      reasoning: "case-analysis",
    },
    () => ({
      skill: L(
        "Inversa del área del círculo: recuperar el radio",
        "Inverse of the circle area: recovering the radius",
      ),
      statement: L(
        "Halle la función inversa (intercambia el papel de $x$ e $y$ y despeja):\n\n$$A(r) = \\pi r^2, \\quad r \\ge 0$$\n\nEscriba la regla de $A^{-1}(x)$ con $x$ como variable (usa sqrt(...) y pi; por ejemplo (sqrt(x)+1)/2).",
        "Find the inverse function (swap the roles of $x$ and $y$ and solve):\n\n$$A(r) = \\pi r^2, \\quad r \\ge 0$$\n\nEnter the rule of $A^{-1}(x)$ with $x$ as the variable (use sqrt(...) and pi; e.g. (sqrt(x)+1)/2).",
      ),
      answer: {
        kind: "expression",
        accepted: ["sqrt(x/pi)", "(x/pi)^(1/2)"],
        variables: ["x"],
      },
      hints: [
        L(
          "Escribe $y = \\pi r^2$ e intercambia: $x = \\pi y^2$. (La inversa de un área debe devolver el radio.)",
          "Write $y = \\pi r^2$ and swap: $x = \\pi y^2$. (The inverse of an area must return the radius.)",
        ),
        L(
          "Despeja el cuadrado: divide entre $\\pi$ y queda $y^2 = \\dfrac{x}{\\pi}$.",
          "Solve for the square: divide by $\\pi$ and it remains $y^2 = \\dfrac{x}{\\pi}$.",
        ),
        L(
          "Hay dos ramas $y = \\pm\\sqrt{x/\\pi}$: la restricción original $r \\ge 0$ se queda con el signo positivo.",
          "There are two branches $y = \\pm\\sqrt{x/\\pi}$: the original restriction $r \\ge 0$ keeps the positive sign.",
        ),
      ],
      answerDisplay: L(
        "$A^{-1}(x) = \\sqrt{\\dfrac{x}{\\pi}}$",
        "$A^{-1}(x) = \\sqrt{\\dfrac{x}{\\pi}}$",
      ),
      solution: [
        step(
          "given",
          "$A(r) = \\pi r^2$ con $r \\ge 0$ (área de un círculo de radio $r$).",
          "$A(r) = \\pi r^2$ with $r \\ge 0$ (area of a circle of radius $r$).",
        ),
        step(
          "approach",
          "Intercambiar $x \\leftrightarrow y$, despejar la nueva $y$ y elegir la rama positiva, que es la que respeta la restricción $r \\ge 0$.",
          "Swap $x \\leftrightarrow y$, solve for the new $y$ and choose the positive branch, the one respecting the restriction $r \\ge 0$.",
        ),
        step(
          "calculation",
          "$y = \\pi r^2$ → intercambio: $x = \\pi y^2$ → divido entre $\\pi$: $y^2 = \\dfrac{x}{\\pi}$ → raíz: $y = \\pm\\sqrt{\\dfrac{x}{\\pi}}$; como el radio no puede ser negativo, $y = \\sqrt{\\dfrac{x}{\\pi}}$.",
          "$y = \\pi r^2$ → swap: $x = \\pi y^2$ → divide by $\\pi$: $y^2 = \\dfrac{x}{\\pi}$ → root: $y = \\pm\\sqrt{\\dfrac{x}{\\pi}}$; since the radius cannot be negative, $y = \\sqrt{\\dfrac{x}{\\pi}}$.",
        ),
        step(
          "result",
          "$A^{-1}(x) = \\sqrt{\\dfrac{x}{\\pi}}$ (el radio de un círculo de área $x$; dominio $x \\ge 0$, que es el rango de $A$). Verificación con $x = 4\\pi$: $A^{-1}(4\\pi) = \\sqrt{\\dfrac{4\\pi}{\\pi}} = \\sqrt{4} = 2$ y $A(2) = \\pi \\cdot 2^2 = 4\\pi$ ✓.",
          "$A^{-1}(x) = \\sqrt{\\dfrac{x}{\\pi}}$ (the radius of a circle of area $x$; domain $x \\ge 0$, which is the range of $A$). Check with $x = 4\\pi$: $A^{-1}(4\\pi) = \\sqrt{\\dfrac{4\\pi}{\\pi}} = \\sqrt{4} = 2$ and $A(2) = \\pi \\cdot 2^2 = 4\\pi$ ✓.",
        ),
      ],
    }),
  ),

  /* S12 #6 — V(r)=⅔πr³ (volumen de la esfera): inversa (3x/(4π))^(1/3);
     la raíz cúbica es única, no hay ramas. */
  template(
    {
      id: "inv-uees-6",
      subject: "math",
      topicId: "functions",
      subtopicId: "inverse",
      difficulty: "hard",
      questionType: "expression",
      estimatedTimeSec: 210,
      tags: ["inverse", "cube-root", "sphere-volume"],
      prerequisites: ["notation"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "12 · 6",
        page: 14,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L(
        "Inversa del volumen de la esfera: raíz cúbica",
        "Inverse of the sphere volume: cube root",
      ),
      statement: L(
        "Halle la función inversa (intercambia el papel de $x$ e $y$ y despeja):\n\n$$V(r) = \\tfrac{4}{3}\\pi r^3$$\n\nEscriba la regla de $V^{-1}(x)$ con $x$ como variable (la raíz cúbica se escribe ^(1/3); por ejemplo (x/2)^(1/3)).",
        "Find the inverse function (swap the roles of $x$ and $y$ and solve):\n\n$$V(r) = \\tfrac{4}{3}\\pi r^3$$\n\nEnter the rule of $V^{-1}(x)$ with $x$ as the variable (write the cube root as ^(1/3); e.g. (x/2)^(1/3)).",
      ),
      answer: {
        kind: "expression",
        accepted: ["(3x/(4pi))^(1/3)", "(3/(4pi)*x)^(1/3)"],
        variables: ["x"],
      },
      hints: [
        L(
          "Escribe $y = \\tfrac{4}{3}\\pi r^3$ e intercambia: $x = \\tfrac{4}{3}\\pi y^3$.",
          "Write $y = \\tfrac{4}{3}\\pi r^3$ and swap: $x = \\tfrac{4}{3}\\pi y^3$.",
        ),
        L(
          "Despeja el cubo: multiplica por $3$ y divide entre $4\\pi$: queda $y^3 = \\dfrac{3x}{4\\pi}$.",
          "Solve for the cube: multiply by $3$ and divide by $4\\pi$: it remains $y^3 = \\dfrac{3x}{4\\pi}$.",
        ),
        L(
          "Toma raíz cúbica: a diferencia del cuadrado, la raíz cúbica es ÚNICA (no hay ramas que elegir).",
          "Take the cube root: unlike the square, the cube root is UNIQUE (there are no branches to choose from).",
        ),
      ],
      answerDisplay: L(
        "$V^{-1}(x) = \\left(\\dfrac{3x}{4\\pi}\\right)^{1/3} = \\sqrt[3]{\\dfrac{3x}{4\\pi}}$",
        "$V^{-1}(x) = \\left(\\dfrac{3x}{4\\pi}\\right)^{1/3} = \\sqrt[3]{\\dfrac{3x}{4\\pi}}$",
      ),
      solution: [
        step(
          "given",
          "$V(r) = \\tfrac{4}{3}\\pi r^3$ (volumen de una esfera de radio $r$).",
          "$V(r) = \\tfrac{4}{3}\\pi r^3$ (volume of a sphere of radius $r$).",
        ),
        step(
          "approach",
          "Intercambiar $x \\leftrightarrow y$ y despejar la nueva $y$: multiplicar por $3$, dividir entre $4\\pi$ y tomar raíz cúbica.",
          "Swap $x \\leftrightarrow y$ and solve for the new $y$: multiply by $3$, divide by $4\\pi$ and take the cube root.",
        ),
        step(
          "calculation",
          "$x = \\tfrac{4}{3}\\pi y^3$ → multiplico por $3$: $3x = 4\\pi y^3$ → divido entre $4\\pi$: $y^3 = \\dfrac{3x}{4\\pi}$ → raíz cúbica: $y = \\left(\\dfrac{3x}{4\\pi}\\right)^{1/3} = \\sqrt[3]{\\dfrac{3x}{4\\pi}}$.",
          "$x = \\tfrac{4}{3}\\pi y^3$ → multiply by $3$: $3x = 4\\pi y^3$ → divide by $4\\pi$: $y^3 = \\dfrac{3x}{4\\pi}$ → cube root: $y = \\left(\\dfrac{3x}{4\\pi}\\right)^{1/3} = \\sqrt[3]{\\dfrac{3x}{4\\pi}}$.",
        ),
        step(
          "result",
          "$V^{-1}(x) = \\left(\\dfrac{3x}{4\\pi}\\right)^{1/3}$ (el radio de la esfera de volumen $x$; aquí NO hay elección de rama: la raíz cúbica es única). Verificación con $x = 36\\pi$, el volumen de $r = 3$: $V^{-1}(36\\pi) = \\left(\\tfrac{3 \\cdot 36\\pi}{4\\pi}\\right)^{1/3} = 27^{1/3} = 3$ y $V(3) = \\tfrac{4}{3}\\pi \\cdot 27 = 36\\pi$ ✓.",
          "$V^{-1}(x) = \\left(\\dfrac{3x}{4\\pi}\\right)^{1/3}$ (the radius of the sphere of volume $x$; here there is NO branch choice: the cube root is unique). Check with $x = 36\\pi$, the volume of $r = 3$: $V^{-1}(36\\pi) = \\left(\\tfrac{3 \\cdot 36\\pi}{4\\pi}\\right)^{1/3} = 27^{1/3} = 3$ and $V(3) = \\tfrac{4}{3}\\pi \\cdot 27 = 36\\pi$ ✓.",
        ),
      ],
    }),
  ),

  /* ------------------------------------------------------------------ */
  /* S10 #33 + S13 piezas 35-38 — funciones definidas por partes (MC).   */
  /* ------------------------------------------------------------------ */

  /* S10 #33 (pág. 12) — teatro con dos precios: MC de definiciones a
     trozos; la frontera n = 12 (estricto vs ≥) y los precios SON el
     punto. La solución lleva el control c(11) = 104,50 vs c(12) = 105. */
  template(
    {
      id: "ef-uees-33",
      subject: "math",
      topicId: "functions",
      subtopicId: "piecewise",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["piecewise", "modeling", "step-function"],
      prerequisites: ["notation", "piecewise"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "10 · 33",
        page: 12,
      },
      reasoning: "modeling",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "$c(n) = \\begin{cases} 9{,}50n & \\text{si } n < 12 \\\\ 8{,}75n & \\text{si } n \\ge 12 \\end{cases}$",
            "$c(n) = \\begin{cases} 9.50n & \\text{if } n < 12 \\\\ 8.75n & \\text{if } n \\ge 12 \\end{cases}$",
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            "$c(n) = \\begin{cases} 9{,}50n & \\text{si } n \\le 12 \\\\ 8{,}75n & \\text{si } n > 12 \\end{cases}$",
            "$c(n) = \\begin{cases} 9.50n & \\text{if } n \\le 12 \\\\ 8.75n & \\text{if } n > 12 \\end{cases}$",
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            "$c(n) = \\begin{cases} 8{,}75n & \\text{si } n < 12 \\\\ 9{,}50n & \\text{si } n \\ge 12 \\end{cases}$",
            "$c(n) = \\begin{cases} 8.75n & \\text{if } n < 12 \\\\ 9.50n & \\text{if } n \\ge 12 \\end{cases}$",
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            "$c(n) = \\begin{cases} 9{,}50n & \\text{si } n < 12 \\\\ 9{,}50n & \\text{si } n \\ge 12 \\end{cases}$",
            "$c(n) = \\begin{cases} 9.50n & \\text{if } n < 12 \\\\ 9.50n & \\text{if } n \\ge 12 \\end{cases}$",
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Modelar un precio por tramos con frontera en el tamaño del grupo",
          "Modeling a tiered price with the boundary at the group size",
        ),
        statement: L(
          "Para alentar la venta en grupos grandes, un teatro cobra dos precios. Si el grupo es menor de 12, cada boleto cuesta $\\text{\\textdollar}9{,}50$; si el grupo es de 12 o más, cada boleto cuesta $\\text{\\textdollar}8{,}75$.\n\nEscriba la función definida por partes que representa el costo de comprar $n$ boletos. ¿Cuál de las cuatro definiciones es la correcta?",
          "To encourage sales to large groups, a theater charges two prices. If the group is fewer than 12, each ticket costs $\\text{\\textdollar}9.50$; if the group is 12 or more, each ticket costs $\\text{\\textdollar}8.75$.\n\nWrite the piecewise-defined function that represents the cost of buying $n$ tickets. Which of the four definitions is correct?",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Hay dos tramos según el tamaño del grupo: la frontera es $n = 12$.",
            "There are two tiers according to the group size: the boundary is $n = 12$.",
          ),
          L(
            "«Menor de 12» es estricto: $n < 12$ (el 12 NO entra). «12 o más» es $n \\ge 12$ (el 12 SÍ entra).",
            "«Fewer than 12» is strict: $n < 12$ (12 is NOT included). «12 or more» is $n \\ge 12$ (12 IS included).",
          ),
          L(
            "En cada rama, costo = precio por boleto $\\times$ número de boletos. ¿En qué rama cae un grupo de exactamente 12?",
            "In each branch, cost = price per ticket $\\times$ number of tickets. In which branch does a group of exactly 12 fall?",
          ),
        ],
        answerDisplay: L(
          "$c(n) = \\begin{cases} 9{,}50n & \\text{si } n < 12 \\\\ 8{,}75n & \\text{si } n \\ge 12 \\end{cases}$",
          "$c(n) = \\begin{cases} 9.50n & \\text{if } n < 12 \\\\ 8.75n & \\text{if } n \\ge 12 \\end{cases}$",
        ),
        solution: [
          step(
            "given",
            "Precios: $\\text{\\textdollar}9{,}50$ por boleto si el grupo es menor de 12; $\\text{\\textdollar}8{,}75$ si el grupo es de 12 o más; $n$ = número de boletos.",
            "Prices: $\\text{\\textdollar}9.50$ per ticket if the group is fewer than 12; $\\text{\\textdollar}8.75$ if the group is 12 or more; $n$ = number of tickets.",
          ),
          step(
            "approach",
            "Se escribe una función a trozos: cada rama multiplica su precio por $n$, y la frontera $n = 12$ se reparte con «menor de 12» estricto frente a «12 o más» con $\\ge$.",
            "Write a piecewise function: each branch multiplies its price by $n$, and the boundary $n = 12$ splits as strict «fewer than 12» versus «12 or more» with $\\ge$.",
          ),
          step(
            "calculation",
            "$c(n) = 9{,}50n$ si $n < 12$; $c(n) = 8{,}75n$ si $n \\ge 12$.<br>Control de la frontera: $c(11) = 9{,}50 \\cdot 11 = 104{,}50$ y $c(12) = 8{,}75 \\cdot 12 = 105$.",
            "$c(n) = 9.50n$ if $n < 12$; $c(n) = 8.75n$ if $n \\ge 12$.<br>Boundary check: $c(11) = 9.50 \\cdot 11 = 104.50$ and $c(12) = 8.75 \\cdot 12 = 105$.",
          ),
          step(
            "result",
            "La definición correcta es $9{,}50n$ si $n < 12$ y $8{,}75n$ si $n \\ge 12$. Verificación: $c(11) = 104{,}50$ frente a $c(12) = 105$ — comprar UN boleto más en la frontera cuesta sólo $\\text{\\textdollar}0{,}50$ más, el salto hace real el descuento por grupo ✓. La opción con la frontera invertida cobraría a un grupo de 12: $9{,}50 \\cdot 12 = 114$ ✗; la que intercambia los precios haría pagar $8{,}75$ por boleto a un grupo de 5 ✗; y la que ignora el descuento cobraría 20 boletos a $9{,}50 \\cdot 20 = 190$ en vez de $8{,}75 \\cdot 20 = 175$ ✗.",
            "The correct definition is $9.50n$ if $n < 12$ and $8.75n$ if $n \\ge 12$. Check: $c(11) = 104.50$ vs. $c(12) = 105$ — buying ONE more ticket at the boundary costs only $\\text{\\textdollar}0.50$ more; the jump makes the group discount real ✓. The option with the flipped boundary would charge a group of 12: $9.50 \\cdot 12 = 114$ ✗; the one swapping the prices would make a group of 5 pay $8.75$ per ticket ✗; and the one ignoring the discount would charge 20 tickets at $9.50 \\cdot 20 = 190$ instead of $8.75 \\cdot 20 = 175$ ✗.",
          ),
        ],
      };
    },
  ),

  /* S13 #35 (pág. 15) — c=g(p) tramos p+1/5: dominio [0,∞) y rango
     [1,8). Distractores: dominio de la 1ª rama / sólo la parte plana /
     ℝ y ℝ. Insight hint 3: el 5 de la rama plana YA está en [1,8). */
  template(
    {
      id: "pw-uees-35",
      subject: "math",
      topicId: "functions",
      subtopicId: "piecewise",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 210,
      tags: ["piecewise", "domain-range", "constant-branch"],
      prerequisites: ["piecewise", "domain-range"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "13 · 35",
        page: 15,
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "$[0, \\infty)$ y $[1, 8)$",
            "$[0, \\infty)$ and $[1, 8)$",
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            "$[0, 7)$ y $[1, 8)$",
            "$[0, 7)$ and $[1, 8)$",
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            "$[0, \\infty)$ y $[5, \\infty)$",
            "$[0, \\infty)$ and $[5, \\infty)$",
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            "$\\mathbb{R}$ y $\\mathbb{R}$",
            "$\\mathbb{R}$ and $\\mathbb{R}$",
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Dominio y rango de una función a trozos con rama plana",
          "Domain and range of a piecewise function with a flat branch",
        ),
        statement: L(
          "Grafique la función definida por partes y determine su dominio y rango:\n\n$$c = g(p) = \\begin{cases} p + 1 & \\text{si } 0 \\le p < 7 \\\\ 5 & \\text{si } p \\ge 7 \\end{cases}$$\n\n¿Cuál es el par dominio–rango correcto?",
          "Graph the piecewise-defined function and determine its domain and range:\n\n$$c = g(p) = \\begin{cases} p + 1 & \\text{if } 0 \\le p < 7 \\\\ 5 & \\text{if } p \\ge 7 \\end{cases}$$\n\nWhich domain–range pair is correct?",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El dominio sale de UNIR las condiciones de las ramas; el rango, de unir las salidas de cada rama analizada por separado.",
            "The domain comes from UNIONING the branch conditions; the range, from unioning the outputs of each branch analyzed separately.",
          ),
          L(
            "Rama 1: $0 \\le p < 7$ produce $p + 1 \\in [1, 8)$. Rama 2: $p \\ge 7$ produce el único valor $5$.",
            "Branch 1: $0 \\le p < 7$ produces $p + 1 \\in [1, 8)$. Branch 2: $p \\ge 7$ produces the single value $5$.",
          ),
          L(
            "El $5$ de la rama plana YA está dentro de $[1, 8)$ — no añade nada al rango; pero el dominio SÍ incluye todo el $[7, \\infty)$.",
            "The $5$ of the flat branch is ALREADY inside $[1, 8)$ — it adds nothing to the range; but the domain DOES include the whole $[7, \\infty)$.",
          ),
        ],
        answerDisplay: L(
          "Dominio $[0, \\infty)$ y rango $[1, 8)$",
          "Domain $[0, \\infty)$ and range $[1, 8)$",
        ),
        solution: [
          step(
            "given",
            "$c = g(p) = \\begin{cases} p + 1 & \\text{si } 0 \\le p < 7 \\\\ 5 & \\text{si } p \\ge 7 \\end{cases}$: una rama lineal y una rama constante.",
            "$c = g(p) = \\begin{cases} p + 1 & \\text{if } 0 \\le p < 7 \\\\ 5 & \\text{if } p \\ge 7 \\end{cases}$: a linear branch and a constant branch.",
          ),
          step(
            "approach",
            "Dominio: unión de las condiciones de las ramas. Rango: para cada rama, qué valores produce sobre su propio tramo, y después unión.",
            "Domain: union of the branch conditions. Range: for each branch, which values it produces on its own interval, and then union.",
          ),
          step(
            "calculation",
            "Dominio: $[0, 7) \\cup [7, \\infty) = [0, \\infty)$.<br>Rama 1: $p$ recorre $[0, 7)$, así que $p + 1$ recorre $[1, 8)$ (el $1$ sí, con $p = 0$; el $8$ no, porque $p = 7$ pertenece a la otra rama).<br>Rama 2: constante $5$ para todo $p \\ge 7$.",
            "Domain: $[0, 7) \\cup [7, \\infty) = [0, \\infty)$.<br>Branch 1: $p$ runs over $[0, 7)$, so $p + 1$ runs over $[1, 8)$ (the $1$ yes, with $p = 0$; the $8$ no, because $p = 7$ belongs to the other branch).<br>Branch 2: constant $5$ for all $p \\ge 7$.",
          ),
          step(
            "result",
            "Dominio $[0, \\infty)$ y rango $[1, 8)$ — el $5$ de la rama plana cae DENTRO de $[1, 8)$ y no ensancha el rango. Verificación: $g(0) = 1$ ✓ (el $1$ SÍ se alcanza: corchete); cuando $p \\to 7^-$, $g(p) \\to 8$ sin tocarlo ✗ (paréntesis); $g(7) = 5 \\in [1, 8)$ ✓; y $g(100) = 5$ ✓ — el dominio sigue después de 7 (la opción con dominio $[0, 7)$ falla: $g(100)$ sí existe).",
            "Domain $[0, \\infty)$ and range $[1, 8)$ — the $5$ of the flat branch falls INSIDE $[1, 8)$ and does not widen the range. Check: $g(0) = 1$ ✓ (the $1$ IS reached: bracket); as $p \\to 7^-$, $g(p) \\to 8$ without touching it ✗ (parenthesis); $g(7) = 5 \\in [1, 8)$ ✓; and $g(100) = 5$ ✓ — the domain continues past 7 (the option with domain $[0, 7)$ fails: $g(100)$ does exist).",
          ),
        ],
      };
    },
  ),

  /* S13 #36 (pág. 15) — γ(x) tramos 3x/10−x²: dominio [0,∞) y rango
     (−∞,6]. Distractores: [0,2) y [0,6) / [0,∞) y [0,6) (olvida que
     10−x² baja a −∞) / [0,∞) y ℝ. Hint 3: 10−x² baja sin límite. */
  template(
    {
      id: "pw-uees-36",
      subject: "math",
      topicId: "functions",
      subtopicId: "piecewise",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 210,
      tags: ["piecewise", "domain-range", "unbounded-range"],
      prerequisites: ["piecewise", "domain-range"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "13 · 36",
        page: 15,
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "$[0, \\infty)$ y $(-\\infty, 6]$",
            "$[0, \\infty)$ and $(-\\infty, 6]$",
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            "$[0, 2)$ y $[0, 6)$",
            "$[0, 2)$ and $[0, 6)$",
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            "$[0, \\infty)$ y $[0, 6)$",
            "$[0, \\infty)$ and $[0, 6)$",
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            "$[0, \\infty)$ y $\\mathbb{R}$",
            "$[0, \\infty)$ and $\\mathbb{R}$",
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Rango de una función a trozos con rama que baja sin límite",
          "Range of a piecewise function with a branch that drops without bound",
        ),
        statement: L(
          "Grafique la función definida por partes y determine su dominio y rango:\n\n$$\\gamma(x) = \\begin{cases} 3x & \\text{si } 0 \\le x < 2 \\\\ 10 - x^2 & \\text{si } x \\ge 2 \\end{cases}$$\n\n¿Cuál es el par dominio–rango correcto?",
          "Graph the piecewise-defined function and determine its domain and range:\n\n$$\\gamma(x) = \\begin{cases} 3x & \\text{if } 0 \\le x < 2 \\\\ 10 - x^2 & \\text{if } x \\ge 2 \\end{cases}$$\n\nWhich domain–range pair is correct?",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Dominio: unión de las condiciones ($0 \\le x < 2$ junto con $x \\ge 2$). Rango: salidas de cada rama por separado y después unión.",
            "Domain: union of the conditions ($0 \\le x < 2$ together with $x \\ge 2$). Range: outputs of each branch separately and then union.",
          ),
          L(
            "Rama 1: $3x$ con $x \\in [0, 2)$ produce $[0, 6)$. Rama 2: $10 - x^2$ vale $6$ en $x = 2$ y luego DECRECE.",
            "Branch 1: $3x$ with $x \\in [0, 2)$ produces $[0, 6)$. Branch 2: $10 - x^2$ equals $6$ at $x = 2$ and then DECREASES.",
          ),
          L(
            "$10 - x^2$ con $x \\ge 2$ baja SIN límite (por ejemplo, $x = 10$ da $-90$): las salidas no se quedan entre $0$ y $6$.",
            "$10 - x^2$ with $x \\ge 2$ drops WITHOUT bound (for instance, $x = 10$ gives $-90$): the outputs do not stay between $0$ and $6$.",
          ),
        ],
        answerDisplay: L(
          "Dominio $[0, \\infty)$ y rango $(-\\infty, 6]$",
          "Domain $[0, \\infty)$ and range $(-\\infty, 6]$",
        ),
        solution: [
          step(
            "given",
            "$\\gamma(x) = \\begin{cases} 3x & \\text{si } 0 \\le x < 2 \\\\ 10 - x^2 & \\text{si } x \\ge 2 \\end{cases}$: rama lineal y rama cuadrática hacia abajo.",
            "$\\gamma(x) = \\begin{cases} 3x & \\text{if } 0 \\le x < 2 \\\\ 10 - x^2 & \\text{if } x \\ge 2 \\end{cases}$: a linear branch and a downward quadratic branch.",
          ),
          step(
            "approach",
            "Cada rama se analiza sobre SU propio tramo: la lineal da $[0, 6)$; la cuadrática hay que mirarla también para $x$ grande, no sólo cerca del empalme.",
            "Each branch is analyzed on ITS own interval: the linear one gives $[0, 6)$; the quadratic one must be looked at for large $x$ too, not only near the splice.",
          ),
          step(
            "calculation",
            "Dominio: $[0, 2) \\cup [2, \\infty) = [0, \\infty)$.<br>Rama 1: salidas $[0, 6)$ (el $6$ no: $x = 2$ pertenece a la otra rama).<br>Rama 2: $10 - x^2$ en $x = 2$ vale $6$ (incluido) y decrece sin cota: salidas $(-\\infty, 6]$.<br>Unión del rango: $(-\\infty, 6]$.",
            "Domain: $[0, 2) \\cup [2, \\infty) = [0, \\infty)$.<br>Branch 1: outputs $[0, 6)$ (the $6$ no: $x = 2$ belongs to the other branch).<br>Branch 2: $10 - x^2$ at $x = 2$ equals $6$ (included) and decreases without bound: outputs $(-\\infty, 6]$.<br>Union of the range: $(-\\infty, 6]$.",
          ),
          step(
            "result",
            "Dominio $[0, \\infty)$ y rango $(-\\infty, 6]$. Verificación: $\\gamma(0) = 0$ ✓ (el $0$ SÍ está en el rango — lo produce la rama 1); $\\gamma(2) = 10 - 4 = 6$ ✓ (el $6$ SÍ se alcanza, desde la segunda rama, aunque la primera no llegue a él); $\\gamma(10) = 10 - 100 = -90$ ✓ (baja sin límite: por eso el rango no se corta abajo). Empalme: en $x = 2$ ambas fórmulas valen $6$ — la gráfica se pega.",
            "Domain $[0, \\infty)$ and range $(-\\infty, 6]$. Check: $\\gamma(0) = 0$ ✓ (the $0$ IS in the range — produced by branch 1); $\\gamma(2) = 10 - 4 = 6$ ✓ (the $6$ IS reached, from the second branch, even though the first one never attains it); $\\gamma(10) = 10 - 100 = -90$ ✓ (it drops without bound: that is why the range is not cut below). Splice: at $x = 2$ both formulas equal $6$ — the graph glues together.",
          ),
        ],
      };
    },
  ),

  /* S13 #37 (pág. 15) — g(x) tramos x+6/x²: dominio ℝ y rango [0,∞).
     Distractores: ℝ y [0,9) (cree que x² se queda bajo 9) / ℝ y [9,∞)
     (sólo la rama x+6) / [3,∞) y [9,∞). Hint 3: x² llega a 9 sin
     incluirlo y x+6 arranca exactamente en 9 → pegado. */
  template(
    {
      id: "pw-uees-37",
      subject: "math",
      topicId: "functions",
      subtopicId: "piecewise",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 210,
      tags: ["piecewise", "domain-range", "quadratic-branch"],
      prerequisites: ["piecewise", "domain-range"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "13 · 37",
        page: 15,
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "$\\mathbb{R}$ y $[0, \\infty)$",
            "$\\mathbb{R}$ and $[0, \\infty)$",
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            "$\\mathbb{R}$ y $[0, 9)$",
            "$\\mathbb{R}$ and $[0, 9)$",
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            "$\\mathbb{R}$ y $[9, \\infty)$",
            "$\\mathbb{R}$ and $[9, \\infty)$",
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            "$[3, \\infty)$ y $[9, \\infty)$",
            "$[3, \\infty)$ and $[9, \\infty)$",
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Rango con pegado exacto entre una cuadrática y una lineal",
          "Range with an exact glue between a quadratic and a linear branch",
        ),
        statement: L(
          "Grafique la función definida por partes y determine su dominio y rango:\n\n$$g(x) = \\begin{cases} x + 6 & \\text{si } x \\ge 3 \\\\ x^2 & \\text{si } x < 3 \\end{cases}$$\n\n¿Cuál es el par dominio–rango correcto?",
          "Graph the piecewise-defined function and determine its domain and range:\n\n$$g(x) = \\begin{cases} x + 6 & \\text{if } x \\ge 3 \\\\ x^2 & \\text{if } x < 3 \\end{cases}$$\n\nWhich domain–range pair is correct?",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El dominio es la unión de las condiciones de las DOS ramas — una cubre $x \\ge 3$ y la otra $x < 3$.",
            "The domain is the union of the conditions of the TWO branches — one covers $x \\ge 3$ and the other $x < 3$.",
          ),
          L(
            "Rama $x + 6$ con $x \\ge 3$: salidas $[9, \\infty)$ (arranca en $3 + 6 = 9$). Rama $x^2$ con $x < 3$: su mínimo es $0$ en $x = 0$ y llega hasta $9$ SIN tocarlo.",
            "Branch $x + 6$ with $x \\ge 3$: outputs $[9, \\infty)$ (it starts at $3 + 6 = 9$). Branch $x^2$ with $x < 3$: its minimum is $0$ at $x = 0$ and it reaches up to $9$ WITHOUT touching it.",
          ),
          L(
            "La rama $x^2$ llega hasta $9$ (sin incluirlo) y la rama $x + 6$ arranca exactamente en $9$: el rango se pega sin huecos.",
            "The branch $x^2$ reaches up to $9$ (without including it) and the branch $x + 6$ starts exactly at $9$: the range glues together with no gaps.",
          ),
        ],
        answerDisplay: L(
          "Dominio $\\mathbb{R}$ y rango $[0, \\infty)$",
          "Domain $\\mathbb{R}$ and range $[0, \\infty)$",
        ),
        solution: [
          step(
            "given",
            "$g(x) = \\begin{cases} x + 6 & \\text{si } x \\ge 3 \\\\ x^2 & \\text{si } x < 3 \\end{cases}$: rama lineal arriba de la frontera, cuadrática abajo.",
            "$g(x) = \\begin{cases} x + 6 & \\text{if } x \\ge 3 \\\\ x^2 & \\text{if } x < 3 \\end{cases}$: a linear branch above the boundary, a quadratic one below.",
          ),
          step(
            "approach",
            "Dominio: unión de ambas condiciones. Rango: salidas de cada rama sobre su tramo — la cuadrática también hay que verla para $x$ negativos (crece sin techo).",
            "Domain: union of both conditions. Range: outputs of each branch on its interval — the quadratic must also be seen for negative $x$ (it grows without a ceiling).",
          ),
          step(
            "calculation",
            "Dominio: $[3, \\infty) \\cup (-\\infty, 3) = \\mathbb{R}$.<br>Rama $x + 6$: con $x \\ge 3$, salidas $[9, \\infty)$.<br>Rama $x^2$: con $x < 3$, mínimo $0$ en $x = 0$ (que cumple $x < 3$), $x^2 \\to 9$ cuando $x \\to 3^-$ sin tocarlo, y crece sin techo para $x$ negativos: salidas $[0, 9)$.<br>Unión: $[0, 9) \\cup [9, \\infty) = [0, \\infty)$.",
            "Domain: $[3, \\infty) \\cup (-\\infty, 3) = \\mathbb{R}$.<br>Branch $x + 6$: with $x \\ge 3$, outputs $[9, \\infty)$.<br>Branch $x^2$: with $x < 3$, minimum $0$ at $x = 0$ (which satisfies $x < 3$), $x^2 \\to 9$ as $x \\to 3^-$ without touching it, and it grows without a ceiling for negative $x$: outputs $[0, 9)$.<br>Union: $[0, 9) \\cup [9, \\infty) = [0, \\infty)$.",
          ),
          step(
            "result",
            "Dominio $\\mathbb{R}$ y rango $[0, \\infty)$ — el pegado en $9$ cierra el rango sin huecos. Verificación: $g(0) = 0$ ✓ (el $0$ SÍ se alcanza, desde la rama $x^2$); $g(3) = 3 + 6 = 9$ ✓ (el $9$ lo aporta la rama $x + 6$ exactamente en la frontera); $g(-10) = 100$ ✓ (sin techo). La opción $[0, 9)$ olvida la rama $x + 6$ (por ejemplo $g(10) = 16 \\ge 9$); la opción $[9, \\infty)$ olvida la rama $x^2$ ($g(0) = 0 < 9$); y $[3, \\infty)$ como dominio ignora que $x < 3$ también tiene rama.",
            "Domain $\\mathbb{R}$ and range $[0, \\infty)$ — the glue at $9$ closes the range with no gaps. Check: $g(0) = 0$ ✓ (the $0$ IS reached, from the branch $x^2$); $g(3) = 3 + 6 = 9$ ✓ (the $9$ is contributed by the branch $x + 6$ exactly at the boundary); $g(-10) = 100$ ✓ (no ceiling). The option $[0, 9)$ forgets the branch $x + 6$ (for instance $g(10) = 16 \\ge 9$); the option $[9, \\infty)$ forgets the branch $x^2$ ($g(0) = 0 < 9$); and $[3, \\infty)$ as the domain ignores that $x < 3$ also has a branch.",
          ),
        ],
      };
    },
  ),

  /* S13 #38 (pág. 15) — f(x) TRES ramas x+1/4/x−1: dominio (0,∞) y
     rango (1,∞). Distractores: (0,∞) y (1,4] (ignora la 3ª rama) /
     (0,5] y (1,∞) / [0,∞) y (1,∞). Hint 3: x−1 con x>5 da >4, pegado
     al 4 de la rama media. */
  template(
    {
      id: "pw-uees-38",
      subject: "math",
      topicId: "functions",
      subtopicId: "piecewise",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 210,
      tags: ["piecewise", "domain-range", "three-branches"],
      prerequisites: ["piecewise", "domain-range"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "13 · 38",
        page: 15,
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "$(0, \\infty)$ y $(1, \\infty)$",
            "$(0, \\infty)$ and $(1, \\infty)$",
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            "$(0, \\infty)$ y $(1, 4]$",
            "$(0, \\infty)$ and $(1, 4]$",
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            "$(0, 5]$ y $(1, \\infty)$",
            "$(0, 5]$ and $(1, \\infty)$",
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            "$[0, \\infty)$ y $(1, \\infty)$",
            "$[0, \\infty)$ and $(1, \\infty)$",
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Dominio y rango de una función a trozos con tres ramas",
          "Domain and range of a piecewise function with three branches",
        ),
        statement: L(
          "Grafique la función definida por partes y determine su dominio y rango:\n\n$$f(x) = \\begin{cases} x + 1 & \\text{si } 0 < x \\le 3 \\\\ 4 & \\text{si } 3 < x \\le 5 \\\\ x - 1 & \\text{si } x > 5 \\end{cases}$$\n\n¿Cuál es el par dominio–rango correcto?",
          "Graph the piecewise-defined function and determine its domain and range:\n\n$$f(x) = \\begin{cases} x + 1 & \\text{if } 0 < x \\le 3 \\\\ 4 & \\text{if } 3 < x \\le 5 \\\\ x - 1 & \\text{if } x > 5 \\end{cases}$$\n\nWhich domain–range pair is correct?",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "TRES ramas: el dominio es la unión de las tres condiciones; el rango, la unión de las tres salidas.",
            "THREE branches: the domain is the union of the three conditions; the range, the union of the three outputs.",
          ),
          L(
            "Rama 1: $0 < x \\le 3$ produce $x + 1 \\in (1, 4]$. Rama 2: constante $4$ para $3 < x \\le 5$. Rama 3: $x > 5$ produce $x - 1$.",
            "Branch 1: $0 < x \\le 3$ produces $x + 1 \\in (1, 4]$. Branch 2: constant $4$ for $3 < x \\le 5$. Branch 3: $x > 5$ produces $x - 1$.",
          ),
          L(
            "$x - 1$ con $x > 5$ da valores MAYORES que $4$ y sube sin techo: pegado justo al $4$ de la rama media.",
            "$x - 1$ with $x > 5$ gives values GREATER than $4$ and rises without a ceiling: glued right at the $4$ of the middle branch.",
          ),
        ],
        answerDisplay: L(
          "Dominio $(0, \\infty)$ y rango $(1, \\infty)$",
          "Domain $(0, \\infty)$ and range $(1, \\infty)$",
        ),
        solution: [
          step(
            "given",
            "$f(x) = \\begin{cases} x + 1 & \\text{si } 0 < x \\le 3 \\\\ 4 & \\text{si } 3 < x \\le 5 \\\\ x - 1 & \\text{si } x > 5 \\end{cases}$: dos ramas lineales y una constante en medio.",
            "$f(x) = \\begin{cases} x + 1 & \\text{if } 0 < x \\le 3 \\\\ 4 & \\text{if } 3 < x \\le 5 \\\\ x - 1 & \\text{if } x > 5 \\end{cases}$: two linear branches and a constant one in the middle.",
          ),
          step(
            "approach",
            "Dominio: unión de las tres condiciones. Rango: salidas de cada rama — con cuidado en los extremos abiertos y cerrados de cada tramo.",
            "Domain: union of the three conditions. Range: outputs of each branch — with care at the open and closed endpoints of each interval.",
          ),
          step(
            "calculation",
            "Dominio: $(0, 3] \\cup (3, 5] \\cup (5, \\infty) = (0, \\infty)$.<br>Rama 1: $0 < x \\le 3$ → $x + 1 \\in (1, 4]$ (el $1$ no, porque $x > 0$ es estricto; el $4$ sí, con $x = 3$).<br>Rama 2: el único valor $4$ (ya contenido).<br>Rama 3: $x > 5$ → $x - 1 > 4$, salidas $(4, \\infty)$ sin techo.<br>Unión: $(1, 4] \\cup \\{4\\} \\cup (4, \\infty) = (1, \\infty)$.",
            "Domain: $(0, 3] \\cup (3, 5] \\cup (5, \\infty) = (0, \\infty)$.<br>Branch 1: $0 < x \\le 3$ → $x + 1 \\in (1, 4]$ (the $1$ no, because $x > 0$ is strict; the $4$ yes, with $x = 3$).<br>Branch 2: the single value $4$ (already contained).<br>Branch 3: $x > 5$ → $x - 1 > 4$, outputs $(4, \\infty)$ with no ceiling.<br>Union: $(1, 4] \\cup \\{4\\} \\cup (4, \\infty) = (1, \\infty)$.",
          ),
          step(
            "result",
            "Dominio $(0, \\infty)$ y rango $(1, \\infty)$. Verificación: $f(3) = 4$ ✓ (el $4$ lo da la rama 1 en su frontera cerrada, y también la rama 2); $f(6) = 5 > 4$ ✓ (la tercera rama sigue subiendo: por eso el rango no se corta en el $4$); cuando $x \\to 0^+$, $f(x) \\to 1$ sin tocarlo ✗ (el $1$ NO se alcanza: $0 < x$ es estricto); y $f(0)$ no existe ✗ (el $0$ queda fuera del dominio).",
            "Domain $(0, \\infty)$ and range $(1, \\infty)$. Check: $f(3) = 4$ ✓ (the $4$ is given by branch 1 at its closed boundary, and also by branch 2); $f(6) = 5 > 4$ ✓ (the third branch keeps rising: that is why the range is not cut at $4$); as $x \\to 0^+$, $f(x) \\to 1$ without touching it ✗ (the $1$ is NOT reached: $0 < x$ is strict); and $f(0)$ does not exist ✗ ($0$ lies outside the domain).",
          ),
        ],
      };
    },
  ),

  /* ------------------------------------------------------------------ */
  /* S14 · Funciones de varias variables (pág. 16) — subtopic NUEVO      */
  /* «multivariable». Enunciado común: «Calcule el valor de la función   */
  /* en el punto indicado». Numéricos con tol rel 0,02 (sólo #10 pide   */
  /* decimal); #11 y #12 son de expresión.                               */
  /* ------------------------------------------------------------------ */

  /* S14 #1 — f(x,y)=4x−y²+3: f(1,2) = 3. El orden (x, y) manda. */
  template(
    {
      id: "mv-uees-1",
      subject: "math",
      topicId: "functions",
      subtopicId: "multivariable",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 75,
      tags: ["multivariable", "evaluation"],
      prerequisites: ["notation"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "14 · 1",
        page: 16,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L(
        "Evaluar una función de dos variables en un punto",
        "Evaluating a two-variable function at a point",
      ),
      statement: L(
        "Calcule el valor de la función en el punto indicado:\n\n$$f(x, y) = 4x - y^2 + 3; \\qquad f(1, 2)$$",
        "Compute the value of the function at the indicated point:\n\n$$f(x, y) = 4x - y^2 + 3; \\qquad f(1, 2)$$",
      ),
      answer: {
        kind: "numeric",
        value: 4 * 1 - 2 ** 2 + 3, // = 3
        tolerance: { mode: "relative", value: 0.02 },
      },
      hints: [
        L(
          "El orden manda: $f(1, 2)$ significa $x = 1$ y $y = 2$.",
          "The order rules: $f(1, 2)$ means $x = 1$ and $y = 2$.",
        ),
        L(
          "Sustituye ambas a la vez: $4(1) - (2)^2 + 3$.",
          "Substitute both at once: $4(1) - (2)^2 + 3$.",
        ),
        L(
          "Primero el cuadrado: $(2)^2 = 4$; luego la operación completa $4 - 4 + 3$.",
          "First the square: $(2)^2 = 4$; then the full operation $4 - 4 + 3$.",
        ),
      ],
      answerDisplay: L(
        "$f(1, 2) = 3$",
        "$f(1, 2) = 3$",
      ),
      solution: [
        step(
          "given",
          "$f(x, y) = 4x - y^2 + 3$; se pide $f(1, 2)$.",
          "$f(x, y) = 4x - y^2 + 3$; the request is $f(1, 2)$.",
        ),
        step(
          "approach",
          "Se sustituye cada variable por el valor que le toca según su posición: primera entrada $\\to x$, segunda $\\to y$.",
          "Substitute each variable by the value assigned by its position: first input $\\to x$, second $\\to y$.",
        ),
        step(
          "calculation",
          "$f(1, 2) = 4 \\cdot 1 - (2)^2 + 3 = 4 - 4 + 3 = 3$.",
          "$f(1, 2) = 4 \\cdot 1 - (2)^2 + 3 = 4 - 4 + 3 = 3$.",
        ),
        step(
          "result",
          "$f(1, 2) = 3$. Verificación: $4 \\cdot 1 - 2^2 + 3 = 4 - 4 + 3 = 3$ ✓ (el cuadrado sólo afecta a la $y$, no al $4x$).",
          "$f(1, 2) = 3$. Check: $4 \\cdot 1 - 2^2 + 3 = 4 - 4 + 3 = 3$ ✓ (the square affects only the $y$, not the $4x$).",
        ),
      ],
    }),
  ),

  /* S14 #2 — f(x,y)=3x²y−4y: f(2,−1) = −8; el doble negativo de −4·(−1)
     es el punto. */
  template(
    {
      id: "mv-uees-2",
      subject: "math",
      topicId: "functions",
      subtopicId: "multivariable",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 90,
      tags: ["multivariable", "evaluation", "signs"],
      prerequisites: ["notation"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "14 · 2",
        page: 16,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L(
        "Evaluar en dos variables con signos negativos",
        "Evaluating at two variables with negative signs",
      ),
      statement: L(
        "Calcule el valor de la función en el punto indicado:\n\n$$f(x, y) = 3x^2y - 4y; \\qquad f(2, -1)$$",
        "Compute the value of the function at the indicated point:\n\n$$f(x, y) = 3x^2y - 4y; \\qquad f(2, -1)$$",
      ),
      answer: {
        kind: "numeric",
        value: 3 * 2 ** 2 * -1 - 4 * -1, // = −12 + 4 = −8
        tolerance: { mode: "relative", value: 0.02 },
      },
      hints: [
        L(
          "$f(2, -1)$: aquí $x = 2$ y $y = -1$ — cuida el signo de la $y$ en TODO su recorrido.",
          "$f(2, -1)$: here $x = 2$ and $y = -1$ — mind the sign of $y$ throughout.",
        ),
        L(
          "Los dos términos: $3x^2y = 3 \\cdot 2^2 \\cdot (-1)$ y $-4y = -4 \\cdot (-1)$.",
          "The two terms: $3x^2y = 3 \\cdot 2^2 \\cdot (-1)$ and $-4y = -4 \\cdot (-1)$.",
        ),
        L(
          "El primer término da $-12$; el segundo es un doble negativo: menos por menos SUMA.",
          "The first term gives $-12$; the second one is a double negative: minus times minus ADDS.",
        ),
      ],
      answerDisplay: L(
        "$f(2, -1) = -8$",
        "$f(2, -1) = -8$",
      ),
      solution: [
        step(
          "given",
          "$f(x, y) = 3x^2y - 4y$; se pide $f(2, -1)$.",
          "$f(x, y) = 3x^2y - 4y$; the request is $f(2, -1)$.",
        ),
        step(
          "approach",
          "Sustituir $x = 2$ y $y = -1$ con paréntesis para proteger los signos, término a término.",
          "Substitute $x = 2$ and $y = -1$ with parentheses to protect the signs, term by term.",
        ),
        step(
          "calculation",
          "$3x^2y = 3 \\cdot (2)^2 \\cdot (-1) = 3 \\cdot 4 \\cdot (-1) = -12$; $-4y = -4 \\cdot (-1) = +4$.<br>$f(2, -1) = -12 + 4 = -8$.",
          "$3x^2y = 3 \\cdot (2)^2 \\cdot (-1) = 3 \\cdot 4 \\cdot (-1) = -12$; $-4y = -4 \\cdot (-1) = +4$.<br>$f(2, -1) = -12 + 4 = -8$.",
        ),
        step(
          "result",
          "$f(2, -1) = -8$. Verificación: $3 \\cdot 4 \\cdot (-1) = -12$ y $-4 \\cdot (-1) = +4$, así que $-12 + 4 = -8$ ✓ (el doble negativo del segundo término es la clave del ítem).",
          "$f(2, -1) = -8$. Check: $3 \\cdot 4 \\cdot (-1) = -12$ and $-4 \\cdot (-1) = +4$, so $-12 + 4 = -8$ ✓ (the double negative in the second term is the key to this item).",
        ),
      ],
    }),
  ),

  /* S14 #3 — g(x,y,z)=2x(3y+z): g(3,0,−1) = −6; tres variables, el
     paréntesis primero. */
  template(
    {
      id: "mv-uees-3",
      subject: "math",
      topicId: "functions",
      subtopicId: "multivariable",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 90,
      tags: ["multivariable", "evaluation", "three-variables"],
      prerequisites: ["notation"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "14 · 3",
        page: 16,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L(
        "Evaluar una función de tres variables",
        "Evaluating a three-variable function",
      ),
      statement: L(
        "Calcule el valor de la función en el punto indicado:\n\n$$g(x, y, z) = 2x(3y + z); \\qquad g(3, 0, -1)$$",
        "Compute the value of the function at the indicated point:\n\n$$g(x, y, z) = 2x(3y + z); \\qquad g(3, 0, -1)$$",
      ),
      answer: {
        kind: "numeric",
        value: 2 * 3 * (3 * 0 + -1), // = −6
        tolerance: { mode: "relative", value: 0.02 },
      },
      hints: [
        L(
          "Tres variables en orden: $g(3, 0, -1)$ significa $x = 3$, $y = 0$ y $z = -1$.",
          "Three variables in order: $g(3, 0, -1)$ means $x = 3$, $y = 0$ and $z = -1$.",
        ),
        L(
          "Primero el paréntesis: $3y + z = 3 \\cdot 0 + (-1)$.",
          "First the parentheses: $3y + z = 3 \\cdot 0 + (-1)$.",
        ),
        L(
          "El paréntesis vale $-1$ y el factor de adelante $2x = 6$: multiplica.",
          "The parentheses equal $-1$ and the front factor $2x = 6$: multiply.",
        ),
      ],
      answerDisplay: L(
        "$g(3, 0, -1) = -6$",
        "$g(3, 0, -1) = -6$",
      ),
      solution: [
        step(
          "given",
          "$g(x, y, z) = 2x(3y + z)$; se pide $g(3, 0, -1)$.",
          "$g(x, y, z) = 2x(3y + z)$; the request is $g(3, 0, -1)$.",
        ),
        step(
          "approach",
          "Cada variable toma su valor por posición; se resuelve primero el paréntesis y después el producto de afuera.",
          "Each variable takes its value by position; solve the parentheses first and then the outer product.",
        ),
        step(
          "calculation",
          "$3y + z = 3 \\cdot 0 + (-1) = -1$;<br>$g(3, 0, -1) = 2 \\cdot 3 \\cdot (-1) = 6 \\cdot (-1) = -6$.",
          "$3y + z = 3 \\cdot 0 + (-1) = -1$;<br>$g(3, 0, -1) = 2 \\cdot 3 \\cdot (-1) = 6 \\cdot (-1) = -6$.",
        ),
        step(
          "result",
          "$g(3, 0, -1) = -6$. Verificación: $2 \\cdot 3 \\cdot (3 \\cdot 0 - 1) = 6 \\cdot (-1) = -6$ ✓ (el $y = 0$ NO hace cero a todo: sólo a su término).",
          "$g(3, 0, -1) = -6$. Check: $2 \\cdot 3 \\cdot (3 \\cdot 0 - 1) = 6 \\cdot (-1) = -6$ ✓ (the $y = 0$ does NOT zero everything out: only its own term).",
        ),
      ],
    }),
  ),

  /* S14 #4 — g(x,y,z)=x²yz+xy²z+xyz²: g(3,1,−2) = −12; exponentes
     distintos por término (z² positivo). */
  template(
    {
      id: "mv-uees-4",
      subject: "math",
      topicId: "functions",
      subtopicId: "multivariable",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 150,
      tags: ["multivariable", "evaluation", "three-variables"],
      prerequisites: ["notation"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "14 · 4",
        page: 16,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L(
        "Evaluar tres términos con exponentes rodados",
        "Evaluating three terms with rotated exponents",
      ),
      statement: L(
        "Calcule el valor de la función en el punto indicado:\n\n$$g(x, y, z) = x^2yz + xy^2z + xyz^2; \\qquad g(3, 1, -2)$$",
        "Compute the value of the function at the indicated point:\n\n$$g(x, y, z) = x^2yz + xy^2z + xyz^2; \\qquad g(3, 1, -2)$$",
      ),
      answer: {
        kind: "numeric",
        value: 3 ** 2 * 1 * -2 + 3 * 1 ** 2 * -2 + 3 * 1 * (-2) ** 2, // = −18 − 6 + 12 = −12
        tolerance: { mode: "relative", value: 0.02 },
      },
      hints: [
        L(
          "Tres términos con las mismas variables y exponentes distintos: $x^2yz$, $xy^2z$ y $xyz^2$.",
          "Three terms with the same variables and different exponents: $x^2yz$, $xy^2z$ and $xyz^2$.",
        ),
        L(
          "Con $x = 3$, $y = 1$, $z = -2$: los tres productos son $9 \\cdot 1 \\cdot (-2)$, $3 \\cdot 1 \\cdot (-2)$ y $3 \\cdot 1 \\cdot 4$.",
          "With $x = 3$, $y = 1$, $z = -2$: the three products are $9 \\cdot 1 \\cdot (-2)$, $3 \\cdot 1 \\cdot (-2)$ and $3 \\cdot 1 \\cdot 4$.",
        ),
        L(
          "Junta los tres con sus signos: $-18 - 6 + 12$ — fíjate en que el último término es POSITIVO.",
          "Join the three with their signs: $-18 - 6 + 12$ — note that the last term is POSITIVE.",
        ),
      ],
      answerDisplay: L(
        "$g(3, 1, -2) = -12$",
        "$g(3, 1, -2) = -12$",
      ),
      solution: [
        step(
          "given",
          "$g(x, y, z) = x^2yz + xy^2z + xyz^2$; se pide $g(3, 1, -2)$.",
          "$g(x, y, z) = x^2yz + xy^2z + xyz^2$; the request is $g(3, 1, -2)$.",
        ),
        step(
          "approach",
          "Se evalúa cada término por separado con $x = 3$, $y = 1$, $z = -2$, cuidando qué variable lleva el exponente en cada uno.",
          "Evaluate each term separately with $x = 3$, $y = 1$, $z = -2$, minding which variable carries the exponent in each one.",
        ),
        step(
          "calculation",
          "$x^2yz = 9 \\cdot 1 \\cdot (-2) = -18$;<br>$xy^2z = 3 \\cdot 1 \\cdot (-2) = -6$;<br>$xyz^2 = 3 \\cdot 1 \\cdot 4 = 12$;<br>$g(3, 1, -2) = -18 - 6 + 12 = -12$.",
          "$x^2yz = 9 \\cdot 1 \\cdot (-2) = -18$;<br>$xy^2z = 3 \\cdot 1 \\cdot (-2) = -6$;<br>$xyz^2 = 3 \\cdot 1 \\cdot 4 = 12$;<br>$g(3, 1, -2) = -18 - 6 + 12 = -12$.",
        ),
        step(
          "result",
          "$g(3, 1, -2) = -12$. Verificación: $-18 - 6 + 12 = -24 + 12 = -12$ ✓ (el $z^2 = 4$ es positivo aunque $z$ sea negativo — el cuadrado se come el signo).",
          "$g(3, 1, -2) = -12$. Check: $-18 - 6 + 12 = -24 + 12 = -12$ ✓ (the $z^2 = 4$ is positive even though $z$ is negative — the square swallows the sign).",
        ),
      ],
    }),
  ),

  /* S14 #5 — h(r,s,t,u)=rs/(t²−u²): h(−3,3,5,4) = −1; cuatro variables,
     numerador y denominador por separado. */
  template(
    {
      id: "mv-uees-5",
      subject: "math",
      topicId: "functions",
      subtopicId: "multivariable",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 150,
      tags: ["multivariable", "evaluation", "four-variables"],
      prerequisites: ["notation"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "14 · 5",
        page: 16,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L(
        "Evaluar un cociente de cuatro variables",
        "Evaluating a four-variable quotient",
      ),
      statement: L(
        "Calcule el valor de la función en el punto indicado:\n\n$$h(r, s, t, u) = \\dfrac{rs}{t^2 - u^2}; \\qquad h(-3, 3, 5, 4)$$",
        "Compute the value of the function at the indicated point:\n\n$$h(r, s, t, u) = \\dfrac{rs}{t^2 - u^2}; \\qquad h(-3, 3, 5, 4)$$",
      ),
      answer: {
        kind: "numeric",
        value: (-3 * 3) / (5 ** 2 - 4 ** 2), // = −9/9 = −1
        tolerance: { mode: "relative", value: 0.02 },
      },
      hints: [
        L(
          "Cuatro variables en su orden: $r = -3$, $s = 3$, $t = 5$ y $u = 4$.",
          "Four variables in their order: $r = -3$, $s = 3$, $t = 5$ and $u = 4$.",
        ),
        L(
          "Numerador: $rs = (-3)(3)$. Denominador: $t^2 - u^2 = 25 - 16$.",
          "Numerator: $rs = (-3)(3)$. Denominator: $t^2 - u^2 = 25 - 16$.",
        ),
        L(
          "El denominador da $9$ y el numerador $-9$: el cociente sale entero y con signo.",
          "The denominator gives $9$ and the numerator $-9$: the quotient comes out whole and signed.",
        ),
      ],
      answerDisplay: L(
        "$h(-3, 3, 5, 4) = -1$",
        "$h(-3, 3, 5, 4) = -1$",
      ),
      solution: [
        step(
          "given",
          "$h(r, s, t, u) = \\dfrac{rs}{t^2 - u^2}$; se pide $h(-3, 3, 5, 4)$.",
          "$h(r, s, t, u) = \\dfrac{rs}{t^2 - u^2}$; the request is $h(-3, 3, 5, 4)$.",
        ),
        step(
          "approach",
          "Se sustituye cada letra en su lugar — numerador y denominador por separado — y después se divide.",
          "Substitute each letter in its place — numerator and denominator separately — and then divide.",
        ),
        step(
          "calculation",
          "Numerador: $rs = (-3)(3) = -9$. Denominador: $t^2 - u^2 = 25 - 16 = 9$.<br>$h(-3, 3, 5, 4) = \\dfrac{-9}{9} = -1$.",
          "Numerator: $rs = (-3)(3) = -9$. Denominator: $t^2 - u^2 = 25 - 16 = 9$.<br>$h(-3, 3, 5, 4) = \\dfrac{-9}{9} = -1$.",
        ),
        step(
          "result",
          "$h(-3, 3, 5, 4) = -1$. Verificación: $\\dfrac{(-3)(3)}{5^2 - 4^2} = \\dfrac{-9}{9} = -1$ ✓ (el signo lo aporta el numerador; el denominador $t^2 - u^2$ es una diferencia de cuadrados, no $(t - u)^2$).",
          "$h(-3, 3, 5, 4) = -1$. Check: $\\dfrac{(-3)(3)}{5^2 - 4^2} = \\dfrac{-9}{9} = -1$ ✓ (the sign comes from the numerator; the denominator $t^2 - u^2$ is a difference of squares, not $(t - u)^2$).",
        ),
      ],
    }),
  ),

  /* S14 #6 — h(r,s,t,u)=ru: h(1,5,3,1) = 1; s y t son SEÑUELOS (no
     aparecen en la fórmula). */
  template(
    {
      id: "mv-uees-6",
      subject: "math",
      topicId: "functions",
      subtopicId: "multivariable",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 75,
      tags: ["multivariable", "evaluation", "spurious-variables"],
      prerequisites: ["notation"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "14 · 6",
        page: 16,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L(
        "Leer la fórmula antes de sustituir: variables señuelo",
        "Reading the formula before substituting: decoy variables",
      ),
      statement: L(
        "Calcule el valor de la función en el punto indicado:\n\n$$h(r, s, t, u) = ru; \\qquad h(1, 5, 3, 1)$$",
        "Compute the value of the function at the indicated point:\n\n$$h(r, s, t, u) = ru; \\qquad h(1, 5, 3, 1)$$",
      ),
      answer: {
        kind: "numeric",
        value: 1 * 1, // r·u = 1
        tolerance: { mode: "relative", value: 0.02 },
      },
      hints: [
        L(
          "Antes de sustituir, mira la fórmula: ¿qué variables aparecen en $ru$?",
          "Before substituting, look at the formula: which variables appear in $ru$?",
        ),
        L(
          "Sólo aparecen $r$ y $u$: valen $1$ (la primera entrada) y $1$ (la última).",
          "Only $r$ and $u$ appear: they equal $1$ (the first input) and $1$ (the last one).",
        ),
        L(
          "La función sólo multiplica esas dos; los valores $s = 5$ y $t = 3$ son señuelos.",
          "The function only multiplies those two; the values $s = 5$ and $t = 3$ are decoys.",
        ),
      ],
      answerDisplay: L(
        "$h(1, 5, 3, 1) = 1$",
        "$h(1, 5, 3, 1) = 1$",
      ),
      solution: [
        step(
          "given",
          "$h(r, s, t, u) = ru$; se pide $h(1, 5, 3, 1)$.",
          "$h(r, s, t, u) = ru$; the request is $h(1, 5, 3, 1)$.",
        ),
        step(
          "approach",
          "La fórmula manda: aunque el punto trae cuatro números, sólo entran los que corresponden a las variables que aparecen.",
          "The formula rules: even though the point carries four numbers, only those matching the variables that appear enter.",
        ),
        step(
          "calculation",
          "$h(1, 5, 3, 1) = r \\cdot u = 1 \\cdot 1 = 1$ (con $r = 1$ y $u = 1$; $s = 5$ y $t = 3$ no aparecen).",
          "$h(1, 5, 3, 1) = r \\cdot u = 1 \\cdot 1 = 1$ (with $r = 1$ and $u = 1$; $s = 5$ and $t = 3$ do not appear).",
        ),
        step(
          "result",
          "$h(1, 5, 3, 1) = 1$. Verificación: $ru = 1 \\cdot 1 = 1$ ✓. ¡Los valores $s = 5$ y $t = 3$ son señuelos: no aparecen en la fórmula y no cambian el resultado!",
          "$h(1, 5, 3, 1) = 1$. Check: $ru = 1 \\cdot 1 = 1$ ✓. The values $s = 5$ and $t = 3$ are decoys: they do not appear in the formula and cannot change the result!",
        ),
      ],
    }),
  ),

  /* S14 #7 — g(p_A,p_B)=2p_A(p_A²−5): g(4,8) = 88; p_B = 8 NO aparece
     (definition-hunting). */
  template(
    {
      id: "mv-uees-7",
      subject: "math",
      topicId: "functions",
      subtopicId: "multivariable",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 90,
      tags: ["multivariable", "evaluation", "spurious-variables"],
      prerequisites: ["notation"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "14 · 7",
        page: 16,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L(
        "Nombres con subíndice: p_A y p_B son variables distintas",
        "Subscripted names: p_A and p_B are different variables",
      ),
      statement: L(
        "Calcule el valor de la función en el punto indicado:\n\n$$g(p_A, p_B) = 2p_A\\left(p_A^2 - 5\\right); \\qquad g(4, 8)$$",
        "Compute the value of the function at the indicated point:\n\n$$g(p_A, p_B) = 2p_A\\left(p_A^2 - 5\\right); \\qquad g(4, 8)$$",
      ),
      answer: {
        kind: "numeric",
        value: 2 * 4 * (4 ** 2 - 5), // = 8·11 = 88
        tolerance: { mode: "relative", value: 0.02 },
      },
      hints: [
        L(
          "Los nombres $p_A$ y $p_B$ son DOS variables distintas; mira cuál aparece en la fórmula.",
          "The names $p_A$ and $p_B$ are TWO different variables; look at which one appears in the formula.",
        ),
        L(
          "$p_B$ NO aparece: sólo queda $2p_A\\left(p_A^2 - 5\\right)$ con $p_A = 4$ (el $8$ es señuelo).",
          "$p_B$ does NOT appear: only $2p_A\\left(p_A^2 - 5\\right)$ remains with $p_A = 4$ (the $8$ is a decoy).",
        ),
        L(
          "$p_A^2 = 16$, así que el paréntesis vale $11$ y el factor de adelante $8$.",
          "$p_A^2 = 16$, so the parentheses equal $11$ and the front factor $8$.",
        ),
      ],
      answerDisplay: L(
        "$g(4, 8) = 88$",
        "$g(4, 8) = 88$",
      ),
      solution: [
        step(
          "given",
          "$g(p_A, p_B) = 2p_A\\left(p_A^2 - 5\\right)$; se pide $g(4, 8)$.",
          "$g(p_A, p_B) = 2p_A\\left(p_A^2 - 5\\right)$; the request is $g(4, 8)$.",
        ),
        step(
          "approach",
          "Aunque la función se declara con dos variables, la fórmula sólo usa $p_A$: el segundo dato no interviene.",
          "Even though the function is declared with two variables, the formula uses only $p_A$: the second datum plays no role.",
        ),
        step(
          "calculation",
          "$p_A = 4$: $p_A^2 = 16$ → paréntesis: $16 - 5 = 11$ → producto: $2 \\cdot 4 \\cdot 11 = 8 \\cdot 11 = 88$.",
          "$p_A = 4$: $p_A^2 = 16$ → parentheses: $16 - 5 = 11$ → product: $2 \\cdot 4 \\cdot 11 = 8 \\cdot 11 = 88$.",
        ),
        step(
          "result",
          "$g(4, 8) = 88$. Verificación: $2 \\cdot 4 \\cdot (16 - 5) = 8 \\cdot 11 = 88$ ✓ (el valor $p_B = 8$ no aparece en la regla: es un señuelo).",
          "$g(4, 8) = 88$. Check: $2 \\cdot 4 \\cdot (16 - 5) = 8 \\cdot 11 = 88$ ✓ (the value $p_B = 8$ does not appear in the rule: it is a decoy).",
        ),
      ],
    }),
  ),

  /* S14 #8 — g(p_A,p_B)=p_A²√p_B+9: g(4,9) = 57; esta vez ambas
     variables sí aparecen. */
  template(
    {
      id: "mv-uees-8",
      subject: "math",
      topicId: "functions",
      subtopicId: "multivariable",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 120,
      tags: ["multivariable", "evaluation", "radicals"],
      prerequisites: ["notation"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "14 · 8",
        page: 16,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L(
        "Evaluar con un radical en la segunda variable",
        "Evaluating with a radical on the second variable",
      ),
      statement: L(
        "Calcule el valor de la función en el punto indicado:\n\n$$g(p_A, p_B) = p_A^2\\sqrt{p_B} + 9; \\qquad g(4, 9)$$",
        "Compute the value of the function at the indicated point:\n\n$$g(p_A, p_B) = p_A^2\\sqrt{p_B} + 9; \\qquad g(4, 9)$$",
      ),
      answer: {
        kind: "numeric",
        value: 4 ** 2 * Math.sqrt(9) + 9, // = 16·3 + 9 = 57
        tolerance: { mode: "relative", value: 0.02 },
      },
      hints: [
        L(
          "Esta vez ambas variables aparecen: $p_A = 4$ y $p_B = 9$.",
          "This time both variables appear: $p_A = 4$ and $p_B = 9$.",
        ),
        L(
          "$p_A^2 = 16$ y $\\sqrt{p_B} = \\sqrt{9} = 3$.",
          "$p_A^2 = 16$ and $\\sqrt{p_B} = \\sqrt{9} = 3$.",
        ),
        L(
          "Multiplica $16 \\cdot 3$ y después suma el $9$ del final.",
          "Multiply $16 \\cdot 3$ and then add the trailing $9$.",
        ),
      ],
      answerDisplay: L(
        "$g(4, 9) = 57$",
        "$g(4, 9) = 57$",
      ),
      solution: [
        step(
          "given",
          "$g(p_A, p_B) = p_A^2\\sqrt{p_B} + 9$; se pide $g(4, 9)$.",
          "$g(p_A, p_B) = p_A^2\\sqrt{p_B} + 9$; the request is $g(4, 9)$.",
        ),
        step(
          "approach",
          "Se sustituyen las dos variables (el cuadrado sobre la primera, la raíz sobre la segunda) y se respeta la jerarquía.",
          "Substitute both variables (the square on the first one, the root on the second one) and respect the order of operations.",
        ),
        step(
          "calculation",
          "$p_A^2 = 4^2 = 16$; $\\sqrt{p_B} = \\sqrt{9} = 3$;<br>$g(4, 9) = 16 \\cdot 3 + 9 = 48 + 9 = 57$.",
          "$p_A^2 = 4^2 = 16$; $\\sqrt{p_B} = \\sqrt{9} = 3$;<br>$g(4, 9) = 16 \\cdot 3 + 9 = 48 + 9 = 57$.",
        ),
        step(
          "result",
          "$g(4, 9) = 57$. Verificación: $4^2 \\cdot \\sqrt{9} + 9 = 16 \\cdot 3 + 9 = 48 + 9 = 57$ ✓ (primero el producto, después la suma).",
          "$g(4, 9) = 57$. Check: $4^2 \\cdot \\sqrt{9} + 9 = 16 \\cdot 3 + 9 = 48 + 9 = 57$ ✓ (first the product, then the addition).",
        ),
      ],
    }),
  ),

  /* S14 #9 — F(x,y,z)=3: F(2,0,−1) = 3; función CONSTANTE, el punto es
     irrelevante. */
  template(
    {
      id: "mv-uees-9",
      subject: "math",
      topicId: "functions",
      subtopicId: "multivariable",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 60,
      tags: ["multivariable", "constant-function"],
      prerequisites: ["notation"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "14 · 9",
        page: 16,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L(
        "Reconocer una función constante de tres variables",
        "Recognizing a constant three-variable function",
      ),
      statement: L(
        "Calcule el valor de la función en el punto indicado:\n\n$$F(x, y, z) = 3; \\qquad F(2, 0, -1)$$",
        "Compute the value of the function at the indicated point:\n\n$$F(x, y, z) = 3; \\qquad F(2, 0, -1)$$",
      ),
      answer: {
        kind: "numeric",
        value: 3, // función constante
        tolerance: { mode: "relative", value: 0.02 },
      },
      hints: [
        L(
          "Antes de sustituir, mira la fórmula: ¿qué variables contiene?",
          "Before substituting, look at the formula: which variables does it contain?",
        ),
        L(
          "No contiene $x$, ni $y$, ni $z$: es una función constante.",
          "It contains no $x$, no $y$ and no $z$: it is a constant function.",
        ),
        L(
          "Una función constante produce el mismo número para CUALQUIER punto de su dominio.",
          "A constant function produces the same number for ANY point of its domain.",
        ),
      ],
      answerDisplay: L(
        "$F(2, 0, -1) = 3$",
        "$F(2, 0, -1) = 3$",
      ),
      solution: [
        step(
          "given",
          "$F(x, y, z) = 3$; se pide $F(2, 0, -1)$.",
          "$F(x, y, z) = 3$; the request is $F(2, 0, -1)$.",
        ),
        step(
          "approach",
          "La regla no contiene ninguna variable: el punto no puede cambiar la salida.",
          "The rule contains no variable: the point cannot change the output.",
        ),
        step(
          "calculation",
          "No hay nada que sustituir: $F(2, 0, -1) = 3$, y también $F(100, -5, 7) = 3$.",
          "There is nothing to substitute: $F(2, 0, -1) = 3$, and also $F(100, -5, 7) = 3$.",
        ),
        step(
          "result",
          "$F(2, 0, -1) = 3$. Verificación: la regla no contiene variables, así que $F(2, 0, -1) = F(100, -5, 7) = 3$ ✓ — el punto es irrelevante (el dominio es todo $\\mathbb{R}^3$ y el rango es $\\{3\\}$).",
          "$F(2, 0, -1) = 3$. Check: the rule contains no variables, so $F(2, 0, -1) = F(100, -5, 7) = 3$ ✓ — the point is irrelevant (the domain is all of $\\mathbb{R}^3$ and the range is $\\{3\\}$).",
        ),
      ],
    }),
  ),

  /* S14 #10 — F(x,y,z)=2x/((y+1)z): F(1,0,3) = 2/3 ≈ 0,67; el único con
     «como decimal» (tol rel 0,02). */
  template(
    {
      id: "mv-uees-10",
      subject: "math",
      topicId: "functions",
      subtopicId: "multivariable",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 150,
      tags: ["multivariable", "evaluation", "fraction", "decimal-answer"],
      prerequisites: ["notation"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "14 · 10",
        page: 16,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L(
        "Evaluar un cociente de tres variables y dar decimal",
        "Evaluating a three-variable quotient and giving a decimal",
      ),
      statement: L(
        "Calcule el valor de la función en el punto indicado:\n\n$$F(x, y, z) = \\dfrac{2x}{(y + 1)z}; \\qquad F(1, 0, 3)$$\n\n(Escriba el resultado como decimal.)",
        "Compute the value of the function at the indicated point:\n\n$$F(x, y, z) = \\dfrac{2x}{(y + 1)z}; \\qquad F(1, 0, 3)$$\n\n(Give your answer as a decimal.)",
      ),
      answer: {
        kind: "numeric",
        value: (2 * 1) / ((0 + 1) * 3), // = 2/3 ≈ 0.67
        tolerance: { mode: "relative", value: 0.02 },
      },
      hints: [
        L(
          "$x = 1$, $y = 0$, $z = 3$: sustituye en el numerador y en el denominador por separado.",
          "$x = 1$, $y = 0$, $z = 3$: substitute in the numerator and in the denominator separately.",
        ),
        L(
          "Numerador: $2x = 2$. Denominador: $(y + 1)z = (0 + 1) \\cdot 3 = 3$.",
          "Numerator: $2x = 2$. Denominator: $(y + 1)z = (0 + 1) \\cdot 3 = 3$.",
        ),
        L(
          "Queda $\\tfrac{2}{3} = 0{,}666\\ldots$: exprésalo como decimal con dos cifras.",
          "It remains $\\tfrac{2}{3} = 0.666\\ldots$: write it as a decimal with two digits.",
        ),
      ],
      answerDisplay: L(
        "$F(1, 0, 3) = \\dfrac{2}{3} \\approx 0{,}67$",
        "$F(1, 0, 3) = \\dfrac{2}{3} \\approx 0.67$",
      ),
      solution: [
        step(
          "given",
          "$F(x, y, z) = \\dfrac{2x}{(y + 1)z}$; se pide $F(1, 0, 3)$.",
          "$F(x, y, z) = \\dfrac{2x}{(y + 1)z}$; the request is $F(1, 0, 3)$.",
        ),
        step(
          "approach",
          "Numerador y denominador se evalúan por separado con $x = 1$, $y = 0$, $z = 3$; el $y + 1$ del denominador pide paréntesis.",
          "Numerator and denominator are evaluated separately with $x = 1$, $y = 0$, $z = 3$; the $y + 1$ in the denominator calls for parentheses.",
        ),
        step(
          "calculation",
          "Numerador: $2x = 2 \\cdot 1 = 2$. Denominador: $(y + 1)z = (0 + 1) \\cdot 3 = 3$.<br>$F(1, 0, 3) = \\dfrac{2}{3} = 0{,}666\\ldots \\approx 0{,}67$.",
          "Numerator: $2x = 2 \\cdot 1 = 2$. Denominator: $(y + 1)z = (0 + 1) \\cdot 3 = 3$.<br>$F(1, 0, 3) = \\dfrac{2}{3} = 0.666\\ldots \\approx 0.67$.",
        ),
        step(
          "result",
          "$F(1, 0, 3) = \\dfrac{2}{3} \\approx 0{,}67$. Verificación: $\\dfrac{2 \\cdot 1}{(0 + 1) \\cdot 3} = \\dfrac{2}{3} \\approx 0{,}67$ ✓ (el denominador vale $3$, no $1$: el $+1$ va con el $y$ antes de multiplicar por $z$).",
          "$F(1, 0, 3) = \\dfrac{2}{3} \\approx 0.67$. Check: $\\dfrac{2 \\cdot 1}{(0 + 1) \\cdot 3} = \\dfrac{2}{3} \\approx 0.67$ ✓ (the denominator equals $3$, not $1$: the $+1$ goes with the $y$ before multiplying by $z$).",
        ),
      ],
    }),
  ),

  /* S14 #11 — f(x,y)=(x+y)²: f(a+h,b) = (a+h+b)² (expresión, variables
     a, h, b — el sabor de «evaluar en un punto algebraico»). */
  template(
    {
      id: "mv-uees-11",
      subject: "math",
      topicId: "functions",
      subtopicId: "multivariable",
      difficulty: "hard",
      questionType: "expression",
      estimatedTimeSec: 210,
      tags: ["multivariable", "evaluation", "expression-input"],
      prerequisites: ["notation"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "14 · 11",
        page: 16,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L(
        "Evaluar una función de dos variables en un punto algebraico",
        "Evaluating a two-variable function at an algebraic point",
      ),
      statement: L(
        "Calcule el valor de la función en el punto indicado:\n\n$$f(x, y) = (x + y)^2; \\qquad f(a + h, b)$$\n\nEscriba la regla de $f(a + h, b)$ (usa ^ para potencias; por ejemplo (a+b)^2).",
        "Compute the value of the function at the indicated point:\n\n$$f(x, y) = (x + y)^2; \\qquad f(a + h, b)$$\n\nEnter the rule of $f(a + h, b)$ (use ^ for powers; e.g. (a+b)^2).",
      ),
      answer: {
        kind: "expression",
        accepted: ["(a+h+b)^2"],
        variables: ["a", "h", "b"],
      },
      hints: [
        L(
          "La función suma sus dos entradas y eleva el resultado al cuadrado.",
          "The function adds its two inputs and squares the result.",
        ),
        L(
          "Las entradas ahora son $x = a + h$ y $y = b$: queda $((a + h) + b)^2$.",
          "The inputs are now $x = a + h$ and $y = b$: it becomes $((a + h) + b)^2$.",
        ),
        L(
          "La suma es asociativa: $(a + h) + b = a + h + b$; eleva al cuadrado el bloque completo.",
          "Addition is associative: $(a + h) + b = a + h + b$; square the whole block.",
        ),
      ],
      answerDisplay: L(
        "$f(a + h, b) = (a + h + b)^2$",
        "$f(a + h, b) = (a + h + b)^2$",
      ),
      solution: [
        step(
          "given",
          "$f(x, y) = (x + y)^2$; se pide $f(a + h, b)$.",
          "$f(x, y) = (x + y)^2$; the request is $f(a + h, b)$.",
        ),
        step(
          "approach",
          "Se sustituye la primera entrada por $a + h$ y la segunda por $b$, con paréntesis; no hace falta expandir el cuadrado.",
          "Substitute the first input by $a + h$ and the second by $b$, in parentheses; there is no need to expand the square.",
        ),
        step(
          "calculation",
          "$f(a + h, b) = \\left((a + h) + b\\right)^2 = (a + h + b)^2$ (asociativa de la suma).",
          "$f(a + h, b) = \\left((a + h) + b\\right)^2 = (a + h + b)^2$ (associativity of addition).",
        ),
        step(
          "result",
          "$f(a + h, b) = (a + h + b)^2$. Verificación con $a = 1$, $h = 1$, $b = 2$: por un lado $f(2, 2) = (2 + 2)^2 = 16$; por el otro $(1 + 1 + 2)^2 = 4^2 = 16$ ✓.",
          "$f(a + h, b) = (a + h + b)^2$. Check with $a = 1$, $h = 1$, $b = 2$: on one side $f(2, 2) = (2 + 2)^2 = 16$; on the other $(1 + 1 + 2)^2 = 4^2 = 16$ ✓.",
        ),
      ],
    }),
  ),

  /* S14 #12 — f(x,y)=x²y−3y³: f(r+t,r) = (r+t)²·r−3r³ (expresión,
     variables r, t; sin expandir el cuadrado). */
  template(
    {
      id: "mv-uees-12",
      subject: "math",
      topicId: "functions",
      subtopicId: "multivariable",
      difficulty: "hard",
      questionType: "expression",
      estimatedTimeSec: 240,
      tags: ["multivariable", "evaluation", "expression-input"],
      prerequisites: ["notation"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "14 · 12",
        page: 16,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L(
        "Sustitución doble en una función de dos variables",
        "Double substitution in a two-variable function",
      ),
      statement: L(
        "Calcule el valor de la función en el punto indicado:\n\n$$f(x, y) = x^2y - 3y^3; \\qquad f(r + t, r)$$\n\nEscriba la regla de $f(r + t, r)$ sin expandir (usa ^ para potencias y * o yuxtaposición para multiplicar; por ejemplo (r+t)*r).",
        "Compute the value of the function at the indicated point:\n\n$$f(x, y) = x^2y - 3y^3; \\qquad f(r + t, r)$$\n\nEnter the rule of $f(r + t, r)$ without expanding (use ^ for powers and * or juxtaposition to multiply; e.g. (r+t)*r).",
      ),
      answer: {
        kind: "expression",
        accepted: ["(r+t)^2*r-3*r^3", "(r+t)^2 r-3r^3"],
        variables: ["r", "t"],
      },
      hints: [
        L(
          "Las nuevas entradas son $x = r + t$ (la primera) y $y = r$ (la segunda): cada una entra en TODOS sus lugares.",
          "The new inputs are $x = r + t$ (the first one) and $y = r$ (the second one): each enters ALL of its places.",
        ),
        L(
          "$x^2y$ se vuelve $(r + t)^2 \\cdot r$, y $y^3$ se vuelve $r^3$.",
          "$x^2y$ becomes $(r + t)^2 \\cdot r$, and $y^3$ becomes $r^3$.",
        ),
        L(
          "Queda $(r + t)^2 \\cdot r - 3r^3$: no expandas el cuadrado, déjalo como bloque.",
          "It remains $(r + t)^2 \\cdot r - 3r^3$: do not expand the square, leave it as a block.",
        ),
      ],
      answerDisplay: L(
        "$f(r + t, r) = (r + t)^2 r - 3r^3$",
        "$f(r + t, r) = (r + t)^2 r - 3r^3$",
      ),
      solution: [
        step(
          "given",
          "$f(x, y) = x^2y - 3y^3$; se pide $f(r + t, r)$.",
          "$f(x, y) = x^2y - 3y^3$; the request is $f(r + t, r)$.",
        ),
        step(
          "approach",
          "Se sustituye $x \\to r + t$ en TODOS los lugares donde aparece la $x$, y $y \\to r$ en todos los de la $y$.",
          "Substitute $x \\to r + t$ in ALL the places where $x$ appears, and $y \\to r$ in all the places of $y$.",
        ),
        step(
          "calculation",
          "$x^2y = (r + t)^2 \\cdot r$ y $3y^3 = 3r^3$, así que $f(r + t, r) = (r + t)^2 r - 3r^3$.",
          "$x^2y = (r + t)^2 \\cdot r$ and $3y^3 = 3r^3$, so $f(r + t, r) = (r + t)^2 r - 3r^3$.",
        ),
        step(
          "result",
          "$f(r + t, r) = (r + t)^2 r - 3r^3$ (sin expandir). Verificación con $r = 2$, $t = 1$: por un lado $f(3, 2) = 3^2 \\cdot 2 - 3 \\cdot 2^3 = 18 - 24 = -6$; por el otro $(2 + 1)^2 \\cdot 2 - 3 \\cdot 2^3 = 9 \\cdot 2 - 24 = -6$ ✓.",
          "$f(r + t, r) = (r + t)^2 r - 3r^3$ (unexpanded). Check with $r = 2$, $t = 1$: on one side $f(3, 2) = 3^2 \\cdot 2 - 3 \\cdot 2^3 = 18 - 24 = -6$; on the other $(2 + 1)^2 \\cdot 2 - 3 \\cdot 2^3 = 9 \\cdot 2 - 24 = -6$ ✓.",
        ),
      ],
    }),
  ),

];
