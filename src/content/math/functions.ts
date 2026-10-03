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

];
