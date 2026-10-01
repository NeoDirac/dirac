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

];
