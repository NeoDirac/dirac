/**
 * MATH · Polynomials
 *
 * Operations, special products, factoring, polynomial equations, the remainder
 * and factor theorems, synthetic division and polynomial inequalities.
 * Equations are built from chosen roots/coefficients so every variant factors
 * exactly and answers are clean.
 */

import { template, L, step } from "@/lib/problem";
import type { ProblemTemplate, McOption } from "@/lib/types";

/* ---------- string helpers (LaTeX built from parameters) ---------- */

/** "+ 5" | "- 5" — joins a signed constant */
const op = (n: number): string => (n < 0 ? `- ${Math.abs(n)}` : `+ ${n}`);

/** "+ 5x" | "- x" — joins a signed term (coefficient 1 omitted) */
const opTerm = (n: number, v: string): string =>
  `${n < 0 ? "- " : "+ "}${Math.abs(n) === 1 ? "" : Math.abs(n)}${v}`;

/** "5x^2" | "-x" | "x" — leading term (coefficient 1 omitted) */
const lead = (n: number, v: string): string =>
  `${n < 0 ? "-" : ""}${Math.abs(n) === 1 ? "" : Math.abs(n)}${v}`;

/** LaTeX polynomial from coefficients + variable names, zeros skipped */
const poly = (cs: number[], vars: string[]): string => {
  const parts: string[] = [];
  cs.forEach((c, i) => {
    if (c === 0) return;
    const v = vars[i] ?? "";
    if (parts.length === 0) parts.push(lead(c, v));
    else parts.push(v ? opTerm(c, v) : op(c));
  });
  return parts.length ? parts.join(" ") : "0";
};

/** plain parser syntax ("5*x^2-3*x+7") for accepted expression answers */
const polyAcc = (cs: number[], vars: string[]): string => {
  const parts: string[] = [];
  cs.forEach((c, i) => {
    if (c === 0) return;
    const v = vars[i] ?? "";
    parts.push(v ? `${c}*${v}` : `${c}`);
  });
  return parts.length ? parts.join("+").replace(/\+-/g, "-") : "0";
};

/** "(x + 3)" from the constant c in (x + c) */
const binom = (c: number): string => `(x ${c < 0 ? "-" : "+"} ${Math.abs(c)})`;

export const templates: ProblemTemplate[] = [
  /* ---------------------------------------------------------------- */
  /* Operations                                                       */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "poly-ops-01",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "operations",
      difficulty: "easy",
      questionType: "expression",
      estimatedTimeSec: 90,
      tags: ["polynomials", "subtraction"],
      prerequisites: ["foundations"],
    },
    (rng) => {
      const a = rng.int(5, 9);
      const d = rng.int(2, 4);
      const b = rng.int(2, 9);
      const e = rng.int(1, 8);
      const c = rng.int(2, 9);
      const f = rng.int(1, 9);
      const A = a - d;
      const B = b - e;
      const C = c - f;
      return {
        skill: L("Resta de polinomios", "Subtracting polynomials"),
        statement: L(
          `Simplifica: $\\left(${poly([a, b, c], ["x^2", "x", ""])}\\right) - \\left(${poly([d, e, f], ["x^2", "x", ""])}\\right)$ (escribe por ejemplo 3x^2-2x+1).`,
          `Simplify: $\\left(${poly([a, b, c], ["x^2", "x", ""])}\\right) - \\left(${poly([d, e, f], ["x^2", "x", ""])}\\right)$ (write e.g. 3x^2-2x+1).`,
        ),
        answer: {
          kind: "expression",
          accepted: [polyAcc([A, B, C], ["x^2", "x", ""])],
          variables: ["x"],
        },
        hints: [
          L(
            "El signo menos delante del paréntesis afecta a **todos** los términos del segundo polinomio.",
            "The minus sign in front of the parentheses applies to **every** term of the second polynomial.",
          ),
          L(
            `Cambia el signo de $${e}x$ y de $${f}$ antes de agrupar.`,
            `Change the sign of $${e}x$ and of $${f}$ before grouping.`,
          ),
          L(
            "Agrupa por separado los términos en $x^2$, en $x$ y los números.",
            "Group separately the $x^2$ terms, the $x$ terms and the numbers.",
          ),
        ],
        answerDisplay: L(
          `$${poly([A, B, C], ["x^2", "x", ""])}$`,
          `$${poly([A, B, C], ["x^2", "x", ""])}$`,
        ),
        solution: [
          step(
            "given",
            `$\\left(${poly([a, b, c], ["x^2", "x", ""])}\\right) - \\left(${poly([d, e, f], ["x^2", "x", ""])}\\right)$`,
            `$\\left(${poly([a, b, c], ["x^2", "x", ""])}\\right) - \\left(${poly([d, e, f], ["x^2", "x", ""])}\\right)$`,
          ),
          step(
            "approach",
            "Distribuimos el signo menos y luego reducimos los términos semejantes.",
            "Distribute the minus sign and then combine like terms.",
          ),
          step(
            "calculation",
            `$= ${poly([a, b, c], ["x^2", "x", ""])} - ${d}x^2 - ${e}x - ${f}$<br>$= (${a} - ${d})x^2 + (${b} - ${e})x + (${c} - ${f})$`,
            `$= ${poly([a, b, c], ["x^2", "x", ""])} - ${d}x^2 - ${e}x - ${f}$<br>$= (${a} - ${d})x^2 + (${b} - ${e})x + (${c} - ${f})$`,
          ),
          step(
            "result",
            `$= ${poly([A, B, C], ["x^2", "x", ""])}$`,
            `$= ${poly([A, B, C], ["x^2", "x", ""])}$`,
          ),
        ],
      };
    },
  ),

  template(
    {
      id: "poly-ops-02",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "operations",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 120,
      tags: ["polynomials", "multiplication", "binomials"],
      prerequisites: ["foundations"],
    },
    (rng) => {
      const p = rng.int(2, 3);
      const q = rng.int(2, 3);
      const a = rng.nonZeroInt(-6, 6);
      const b = rng.nonZeroInt(-6, 6);
      const c2 = p * q;
      const c1 = p * b + q * a;
      const c0 = a * b;
      return {
        skill: L("Producto de binomios", "Multiplying binomials"),
        statement: L(
          `Expande y simplifica: $\\left(${lead(p, "x")} ${op(a)}\\right)\\left(${lead(q, "x")} ${op(b)}\\right)$ (escribe por ejemplo 6x^2-x-2).`,
          `Expand and simplify: $\\left(${lead(p, "x")} ${op(a)}\\right)\\left(${lead(q, "x")} ${op(b)}\\right)$ (write e.g. 6x^2-x-2).`,
        ),
        answer: {
          kind: "expression",
          accepted: [polyAcc([c2, c1, c0], ["x^2", "x", ""])],
          variables: ["x"],
        },
        hints: [
          L(
            "Multiplica **cada** término del primer binomio por **cada** término del segundo.",
            "Multiply **each** term of the first binomial by **each** term of the second.",
          ),
          L(
            `Son cuatro productos: $${p}x \\cdot ${q}x$, $${p}x \\cdot (${b})$, $${a} \\cdot ${q}x$ y $${a} \\cdot (${b})$.`,
            `There are four products: $${p}x \\cdot ${q}x$, $${p}x \\cdot (${b})$, $${a} \\cdot ${q}x$ and $${a} \\cdot (${b})$.`,
          ),
          L(
            "Los dos productos centrales son semejantes: júntalos en un solo término en $x$.",
            "The two middle products are like terms: combine them into a single $x$ term.",
          ),
        ],
        answerDisplay: L(
          `$${poly([c2, c1, c0], ["x^2", "x", ""])}$`,
          `$${poly([c2, c1, c0], ["x^2", "x", ""])}$`,
        ),
        solution: [
          step(
            "given",
            `$\\left(${lead(p, "x")} ${op(a)}\\right)\\left(${lead(q, "x")} ${op(b)}\\right)$`,
            `$\\left(${lead(p, "x")} ${op(a)}\\right)\\left(${lead(q, "x")} ${op(b)}\\right)$`,
          ),
          step(
            "approach",
            "Aplicamos la propiedad distributiva doble (producto de todo por todo) y reducimos términos semejantes.",
            "Apply the distributive property twice (each term times each term) and combine like terms.",
          ),
          step(
            "calculation",
            `$= ${p * q}x^2 ${op(p * b)}x ${op(q * a)}x ${op(a * b)}$<br>$= ${p * q}x^2 ${op(c1)}x ${op(c0)}$`,
            `$= ${p * q}x^2 ${op(p * b)}x ${op(q * a)}x ${op(a * b)}$<br>$= ${p * q}x^2 ${op(c1)}x ${op(c0)}$`,
          ),
          step(
            "result",
            `$= ${poly([c2, c1, c0], ["x^2", "x", ""])}$`,
            `$= ${poly([c2, c1, c0], ["x^2", "x", ""])}$`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Special products                                                 */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "poly-spec-01",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "special-products",
      difficulty: "easy",
      questionType: "expression",
      estimatedTimeSec: 90,
      tags: ["special-products", "perfect-square"],
      prerequisites: ["foundations"],
    },
    (rng) => {
      const a = rng.nonZeroInt(-9, 9);
      return {
        skill: L("Binomio al cuadrado", "Squaring a binomial"),
        statement: L(
          `Expande: $\\left(x ${op(a)}\\right)^2$ (escribe por ejemplo x^2-6x+9).`,
          `Expand: $\\left(x ${op(a)}\\right)^2$ (write e.g. x^2-6x+9).`,
        ),
        answer: {
          kind: "expression",
          accepted: [polyAcc([1, 2 * a, a * a], ["x^2", "x", ""])],
          variables: ["x"],
        },
        hints: [
          L(
            "Es un binomio al cuadrado: usa la identidad $(a \\pm b)^2$, no multipliques \"a lo loco\".",
            "It is a squared binomial: use the identity $(a \\pm b)^2$ instead of blind multiplying.",
          ),
          L(
            "$(x \\pm k)^2 = x^2 \\pm 2kx + k^2$.",
            "$(x \\pm k)^2 = x^2 \\pm 2kx + k^2$.",
          ),
          L(
            "El término central es el doble producto de los dos términos del binomio.",
            "The middle term is twice the product of the two binomial terms.",
          ),
        ],
        answerDisplay: L(
          `$${poly([1, 2 * a, a * a], ["x^2", "x", ""])}$`,
          `$${poly([1, 2 * a, a * a], ["x^2", "x", ""])}$`,
        ),
        solution: [
          step(
            "given",
            `$\\left(x ${op(a)}\\right)^2$`,
            `$\\left(x ${op(a)}\\right)^2$`,
          ),
          step(
            "approach",
            "Identidad del cuadrado de un binomio: $(x + a)^2 = x^2 + 2ax + a^2$.",
            "Squared-binomial identity: $(x + a)^2 = x^2 + 2ax + a^2$.",
          ),
          step(
            "calculation",
            `$\\left(x ${op(a)}\\right)^2 = x^2 + 2 \\cdot ${a} \\cdot x + (${a})^2$<br>$= x^2 ${op(2 * a)}x + ${a * a}$`,
            `$\\left(x ${op(a)}\\right)^2 = x^2 + 2 \\cdot ${a} \\cdot x + (${a})^2$<br>$= x^2 ${op(2 * a)}x + ${a * a}$`,
          ),
          step(
            "result",
            `$= ${poly([1, 2 * a, a * a], ["x^2", "x", ""])}$`,
            `$= ${poly([1, 2 * a, a * a], ["x^2", "x", ""])}$`,
          ),
        ],
      };
    },
  ),

  template(
    {
      id: "poly-spec-02",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "special-products",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 100,
      tags: ["special-products", "difference-of-squares"],
      prerequisites: ["foundations"],
    },
    (rng) => {
      const p = rng.int(2, 4);
      const q = rng.int(2, 6);
      return {
        skill: L("Suma por diferencia (diferencia de cuadrados)", "Conjugate binomials (difference of squares)"),
        statement: L(
          `Expande: $\\left(${p}x + ${q}\\right)\\left(${p}x - ${q}\\right)$ (escribe por ejemplo 4x^2-9).`,
          `Expand: $\\left(${p}x + ${q}\\right)\\left(${p}x - ${q}\\right)$ (write e.g. 4x^2-9).`,
        ),
        answer: {
          kind: "expression",
          accepted: [polyAcc([p * p, 0, -(q * q)], ["x^2", "x", ""])],
          variables: ["x"],
        },
        hints: [
          L(
            "Los dos binomios son conjugados: solo cambia el signo del término independiente.",
            "The two binomials are conjugates: only the sign of the constant term changes.",
          ),
          L(
            "Identidad: $(a + b)(a - b) = a^2 - b^2$.",
            "Identity: $(a + b)(a - b) = a^2 - b^2$.",
          ),
          L(
            "Los términos centrales se cancelan entre sí.",
            "The middle terms cancel each other out.",
          ),
        ],
        answerDisplay: L(`$${p * p}x^2 - ${q * q}$`, `$${p * p}x^2 - ${q * q}$`),
        solution: [
          step(
            "given",
            `$\\left(${p}x + ${q}\\right)\\left(${p}x - ${q}\\right)$`,
            `$\\left(${p}x + ${q}\\right)\\left(${p}x - ${q}\\right)$`,
          ),
          step(
            "approach",
            "Es un producto suma-por-diferencia: el resultado es la diferencia de los cuadrados.",
            "This is a sum-times-difference product: the result is the difference of the squares.",
          ),
          step(
            "calculation",
            `$\\left(${p}x\\right)^2 - \\left(${q}\\right)^2$<br>$= ${p * p}x^2 - ${q * q}$`,
            `$\\left(${p}x\\right)^2 - \\left(${q}\\right)^2$<br>$= ${p * p}x^2 - ${q * q}$`,
          ),
          step(
            "result",
            `$= ${p * p}x^2 - ${q * q}$`,
            `$= ${p * p}x^2 - ${q * q}$`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Factoring                                                        */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "poly-fact-01",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "factoring",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["factoring", "trinomials"],
      prerequisites: ["operations"],
    },
    (rng) => {
      const p = rng.nonZeroInt(-6, 6);
      // q ≠ ±p: with q = -p the distractor (x−p)(x−q) would equal (x+p)(x+q)
      const q = rng.intExcluding(-6, 6, [0, p, -p]);
      const options: McOption[] = [
        {
          id: "a",
          text: L(`$${binom(p)}${binom(q)}$`, `$${binom(p)}${binom(q)}$`),
          correct: true,
        },
        {
          id: "b",
          text: L(`$${binom(-p)}${binom(-q)}$`, `$${binom(-p)}${binom(-q)}$`),
          correct: false,
        },
        {
          id: "c",
          text: L(`$${binom(p)}${binom(-q)}$`, `$${binom(p)}${binom(-q)}$`),
          correct: false,
        },
        {
          id: "d",
          text: L(`$${binom(-p)}${binom(q)}$`, `$${binom(-p)}${binom(q)}$`),
          correct: false,
        },
      ];
      return {
        skill: L("Factorizar trinomios de la forma x² + bx + c", "Factoring trinomials of the form x² + bx + c"),
        statement: L(
          `¿Cuál es la factorización correcta de $${poly([1, p + q, p * q], ["x^2", "x", ""])}$?`,
          `Which is the correct factorization of $${poly([1, p + q, p * q], ["x^2", "x", ""])}$?`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Busca dos números cuyo **producto** sea el término independiente y cuya **suma** sea el coeficiente de $x$.",
            "Look for two numbers whose **product** is the constant term and whose **sum** is the coefficient of $x$.",
          ),
          L(
            "Escribe la forma $(x + \\square)(x + \\square)$ y prueba parejas de números.",
            "Write the form $(x + \\square)(x + \\square)$ and try pairs of numbers.",
          ),
          L(
            "Comprueba los signos: si el término independiente es negativo, los números tienen signos opuestos.",
            "Check the signs: if the constant term is negative, the numbers have opposite signs.",
          ),
        ],
        answerDisplay: L(
          `$${poly([1, p + q, p * q], ["x^2", "x", ""])} = ${binom(p)}${binom(q)}$`,
          `$${poly([1, p + q, p * q], ["x^2", "x", ""])} = ${binom(p)}${binom(q)}$`,
        ),
        solution: [
          step(
            "given",
            `$${poly([1, p + q, p * q], ["x^2", "x", ""])}$`,
            `$${poly([1, p + q, p * q], ["x^2", "x", ""])}$`,
          ),
          step(
            "approach",
            `Buscamos dos números que sumen $${p + q}$ y multipliquen $${p * q}$.`,
            `We look for two numbers that add up to $${p + q}$ and multiply to $${p * q}$.`,
          ),
          step(
            "calculation",
            `$(${p}) + (${q}) = ${p + q}$<br>$(${p}) \\cdot (${q}) = ${p * q}$<br>Ambas condiciones se cumplen.`,
            `$(${p}) + (${q}) = ${p + q}$<br>$(${p}) \\cdot (${q}) = ${p * q}$<br>Both conditions hold.`,
          ),
          step(
            "result",
            `$${poly([1, p + q, p * q], ["x^2", "x", ""])} = ${binom(p)}${binom(q)}$`,
            `$${poly([1, p + q, p * q], ["x^2", "x", ""])} = ${binom(p)}${binom(q)}$`,
          ),
        ],
      };
    },
  ),

  template(
    {
      id: "poly-fact-02",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "factoring",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 120,
      tags: ["factoring", "gcf"],
      prerequisites: ["foundations"],
    },
    (rng) => {
      const g = rng.int(2, 6);
      const [alpha, beta] = rng.pick([
        [2, 3],
        [3, 4],
        [2, 5],
        [3, 5],
        [4, 5],
      ]);
      const gamma = rng.int(2, 5);
      const A = g * alpha;
      const B = g * beta;
      const C = g * gamma;
      return {
        skill: L("Factor común máximo", "Greatest common factor"),
        statement: L(
          `Al factorizar $${poly([A, B, C], ["x^3", "x^2", "x"])}$ se extrae el factor común máximo $g \\cdot x^m$. ¿Cuánto vale el coeficiente $g$?`,
          `When factoring $${poly([A, B, C], ["x^3", "x^2", "x"])}$, the greatest common factor $g \\cdot x^m$ is pulled out. What is the coefficient $g$?`,
        ),
        answer: { kind: "numeric", value: g },
        hints: [
          L(
            "El factor común une dos cosas: la parte numérica y la parte literal ($x$).",
            "The common factor combines two things: the numeric part and the variable part ($x$).",
          ),
          L(
            "Los tres términos tienen al menos una $x$, así que la parte literal es $x^1$.",
            "All three terms have at least one $x$, so the variable part is $x^1$.",
          ),
          L(
            "Para la parte numérica, calcula el máximo común divisor de los tres coeficientes.",
            "For the numeric part, compute the greatest common divisor of the three coefficients.",
          ),
        ],
        answerDisplay: L(`$g = ${g}$`, `$g = ${g}$`),
        solution: [
          step(
            "given",
            `$${poly([A, B, C], ["x^3", "x^2", "x"])}$`,
            `$${poly([A, B, C], ["x^3", "x^2", "x"])}$`,
          ),
          step(
            "approach",
            "El factor común máximo toma el MCD de los coeficientes y la menor potencia de $x$ presente en todos los términos.",
            "The greatest common factor takes the GCD of the coefficients and the lowest power of $x$ present in all terms.",
          ),
          step(
            "calculation",
            `Coeficientes: $${A}, ${B}, ${C}$.<br>$\\gcd(${A}, ${B}) = ${g}$ (porque ${A} = ${g} \\cdot ${alpha} y ${B} = ${g} \\cdot ${beta}, con ${alpha} y ${beta} primos entre sí) y $\\gcd(${g}, ${C}) = ${g}$.<br>Menor potencia de $x$: $x^1$.`,
            `Coefficients: $${A}, ${B}, ${C}$.<br>$\\gcd(${A}, ${B}) = ${g}$ (because ${A} = ${g} \\cdot ${alpha} and ${B} = ${g} \\cdot ${beta}, with ${alpha} and ${beta} coprime) and $\\gcd(${g}, ${C}) = ${g}$.<br>Lowest power of $x$: $x^1$.`,
          ),
          step(
            "result",
            `El factor común máximo es $${g}x$, es decir, $g = ${g}$.`,
            `The greatest common factor is $${g}x$, that is, $g = ${g}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Polynomial equations                                             */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "poly-eq-01",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "equations",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 150,
      tags: ["polynomial-equations", "factoring"],
      prerequisites: ["factoring"],
    },
    (rng) => {
      const k = rng.int(2, 5);
      return {
        skill: L("Ecuación cúbica que se reduce factorizando", "Cubic equation reduced by factoring"),
        statement: L(
          `Resuelve $x^3 = ${k * k}x$ y da la **mayor** de sus soluciones reales.`,
          `Solve $x^3 = ${k * k}x$ and give the **largest** of its real solutions.`,
        ),
        answer: { kind: "numeric", value: k },
        hints: [
          L(
            "Pasa todos los términos al mismo lado para tener $= 0$.",
            "Move every term to one side so the equation reads $= 0$.",
          ),
          L(
            "Todos los términos comparten el factor $x$: sácalo.",
            "Every term shares the factor $x$: pull it out.",
          ),
          L(
            `Dentro del paréntesis queda una diferencia de cuadrados: $x^2 - ${k * k}$.`,
            `Inside the parentheses you are left with a difference of squares: $x^2 - ${k * k}$.`,
          ),
        ],
        answerDisplay: L(`$x = ${k}$`, `$x = ${k}$`),
        solution: [
          step(
            "given",
            `$x^3 = ${k * k}x$`,
            `$x^3 = ${k * k}x$`,
          ),
          step(
            "approach",
            "Igualamos a cero, extraemos el factor común $x$ y factorizamos la diferencia de cuadrados.",
            "Set one side to zero, pull out the common factor $x$ and factor the difference of squares.",
          ),
          step(
            "calculation",
            `$x^3 - ${k * k}x = 0$<br>$x\\left(x^2 - ${k * k}\\right) = 0$<br>$x(x - ${k})(x + ${k}) = 0$<br>$x = 0,\\ x = ${k},\\ x = -${k}$`,
            `$x^3 - ${k * k}x = 0$<br>$x\\left(x^2 - ${k * k}\\right) = 0$<br>$x(x - ${k})(x + ${k}) = 0$<br>$x = 0,\\ x = ${k},\\ x = -${k}$`,
          ),
          step(
            "result",
            `Las soluciones son $0$, $${k}$ y $-${k}$; la mayor es $${k}$.`,
            `The solutions are $0$, $${k}$ and $-${k}$; the largest is $${k}$.`,
          ),
        ],
      };
    },
  ),

  template(
    {
      id: "poly-eq-02",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "equations",
      difficulty: "challenge",
      questionType: "numeric",
      estimatedTimeSec: 300,
      tags: ["polynomial-equations", "quadratic-form", "substitution"],
      prerequisites: ["factoring", "quadratics"],
    },
    (rng) => {
      const r = rng.int(2, 5);
      let s = rng.int(2, 5);
      if (s === r) s = r === 5 ? 4 : r + 1; // r ≠ s
      const S = r * r + s * s;
      const P = r * r * s * s;
      const biggest = Math.max(r, s);
      return {
        skill: L("Ecuación cuártica disfrazada de cuadrática", "Quartic equation disguised as a quadratic"),
        statement: L(
          `Resuelve $x^4 - ${S}x^2 + ${P} = 0$ y da la **mayor** de sus soluciones reales.`,
          `Solve $x^4 - ${S}x^2 + ${P} = 0$ and give the **largest** of its real solutions.`,
        ),
        answer: { kind: "numeric", value: biggest },
        hints: [
          L(
            "La ecuación solo contiene potencias pares de $x$.",
            "The equation only contains even powers of $x$.",
          ),
          L(
            "Sustituye $u = x^2$: obtendrás una ecuación cuadrática en $u$.",
            "Substitute $u = x^2$: you will get a quadratic equation in $u$.",
          ),
          L(
            "Resuelve la cuadrática en $u$ y luego deshaz el cambio con $x = \\pm\\sqrt{u}$.",
            "Solve the quadratic in $u$ and then undo the change with $x = \\pm\\sqrt{u}$.",
          ),
        ],
        answerDisplay: L(`$x = ${biggest}$`, `$x = ${biggest}$`),
        solution: [
          step(
            "given",
            `$x^4 - ${S}x^2 + ${P} = 0$`,
            `$x^4 - ${S}x^2 + ${P} = 0$`,
          ),
          step(
            "approach",
            "Con el cambio $u = x^2$ la ecuación se convierte en una cuadrática; al final deshacemos el cambio.",
            "With the substitution $u = x^2$ the equation becomes a quadratic; at the end we undo the change.",
          ),
          step(
            "calculation",
            `$u^2 - ${S}u + ${P} = 0$ con $u = x^2$<br>$u = \\frac{${S} \\pm \\sqrt{${S * S} - ${4 * P}}}{2} = \\frac{${S} \\pm \\sqrt{${S * S - 4 * P}}}{2}$<br>$u_1 = ${r * r},\\ u_2 = ${s * s}$<br>$x^2 = ${r * r} \\Rightarrow x = \\pm ${r}$; $\\quad x^2 = ${s * s} \\Rightarrow x = \\pm ${s}$`,
            `$u^2 - ${S}u + ${P} = 0$ with $u = x^2$<br>$u = \\frac{${S} \\pm \\sqrt{${S * S} - ${4 * P}}}{2} = \\frac{${S} \\pm \\sqrt{${S * S - 4 * P}}}{2}$<br>$u_1 = ${r * r},\\ u_2 = ${s * s}$<br>$x^2 = ${r * r} \\Rightarrow x = \\pm ${r}$; $\\quad x^2 = ${s * s} \\Rightarrow x = \\pm ${s}$`,
          ),
          step(
            "result",
            `Las soluciones reales son $\\pm${r}$ y $\\pm${s}$; la mayor es $${biggest}$.`,
            `The real solutions are $\\pm${r}$ and $\\pm${s}$; the largest is $${biggest}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Remainder & factor theorems                                      */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "poly-rem-01",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "remainder-theorem",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 150,
      tags: ["remainder-theorem"],
      prerequisites: ["operations"],
    },
    (rng) => {
      const d = rng.pick([-2, -1, 1, 2]);
      const a = rng.nonZeroInt(-2, 2);
      const b = rng.nonZeroInt(-4, 4);
      let R = rng.int(-6, 6);
      let c = R - d * d * d - a * d * d - b * d;
      if (c === 0) {
        R += 1; // keep a nonzero constant term for a cleaner display
        c = R - d * d * d - a * d * d - b * d;
      }
      return {
        skill: L("Teorema del resto", "Remainder theorem"),
        statement: L(
          `¿Cuál es el resto de dividir $P(x) = ${poly([1, a, b, c], ["x^3", "x^2", "x", ""])}$ entre $x ${d < 0 ? "+" : "-"} ${Math.abs(d)}$?`,
          `What is the remainder when $P(x) = ${poly([1, a, b, c], ["x^3", "x^2", "x", ""])}$ is divided by $x ${d < 0 ? "+" : "-"} ${Math.abs(d)}$?`,
        ),
        answer: { kind: "numeric", value: R },
        hints: [
          L(
            "El teorema del resto evita hacer la división larga.",
            "The remainder theorem spares you the long division.",
          ),
          L(
            `El resto de dividir entre $x - a$ es simplemente $P(a)$. Aquí $a = ${d}$.`,
            `The remainder when dividing by $x - a$ is just $P(a)$. Here $a = ${d}$.`,
          ),
          L(
            `Calcula primero $(${d})^2$ y $(${d})^3$ y luego combina los términos.`,
            `Compute $(${d})^2$ and $(${d})^3$ first, then combine the terms.`,
          ),
        ],
        answerDisplay: L(`Resto $= ${R}$`, `Remainder $= ${R}$`),
        solution: [
          step(
            "given",
            `$P(x) = ${poly([1, a, b, c], ["x^3", "x^2", "x", ""])}$, divisor $x ${d < 0 ? "+" : "-"} ${Math.abs(d)}$.`,
            `$P(x) = ${poly([1, a, b, c], ["x^3", "x^2", "x", ""])}$, divisor $x ${d < 0 ? "+" : "-"} ${Math.abs(d)}$.`,
          ),
          step(
            "approach",
            `Por el teorema del resto, el resto es $P(${d})$: no hace falta dividir.`,
            `By the remainder theorem, the remainder is $P(${d})$: no division needed.`,
          ),
          step(
            "calculation",
            `$P(${d}) = (${d})^3 ${op(a)}(${d})^2 ${op(b)}(${d}) ${op(c)}$<br>$= ${d * d * d} ${op(a * d * d)} ${op(b * d)} ${op(c)}$<br>$= ${R}$`,
            `$P(${d}) = (${d})^3 ${op(a)}(${d})^2 ${op(b)}(${d}) ${op(c)}$<br>$= ${d * d * d} ${op(a * d * d)} ${op(b * d)} ${op(c)}$<br>$= ${R}$`,
          ),
          step(
            "result",
            `El resto de la división es $${R}$.`,
            `The remainder of the division is $${R}$.`,
          ),
        ],
      };
    },
  ),

  template(
    {
      id: "poly-rem-02",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "remainder-theorem",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 240,
      tags: ["factor-theorem", "parameters"],
      prerequisites: ["remainder-theorem"],
    },
    (rng) => {
      const r = rng.pick([-2, 2]);
      const a = rng.nonZeroInt(-2, 2);
      let m = rng.nonZeroInt(-5, 5);
      if (r * r + a * r + m === 0) m = m > 0 ? m + 1 : m - 1; // keep k ≠ 0
      const c = r * m;
      const k = -(r * r + a * r + m);
      return {
        skill: L("Teorema del factor: hallar un coeficiente", "Factor theorem: finding a coefficient"),
        statement: L(
          `Sabemos que $x ${r < 0 ? "+" : "-"} ${Math.abs(r)}$ es un factor de $P(x) = x^3 ${opTerm(a, "x^2")} + kx ${op(c)}$. ¿Cuánto vale $k$?`,
          `We know that $x ${r < 0 ? "+" : "-"} ${Math.abs(r)}$ is a factor of $P(x) = x^3 ${opTerm(a, "x^2")} + kx ${op(c)}$. What is $k$?`,
        ),
        answer: { kind: "numeric", value: k },
        hints: [
          L(
            "\"Ser un factor\" significa que la división es exacta: el resto es 0.",
            "\"Being a factor\" means the division is exact: the remainder is 0.",
          ),
          L(
            `Teorema del factor: $P\\left(${r}\\right) = 0$.`,
            `Factor theorem: $P\\left(${r}\\right) = 0$.`,
          ),
          L(
            `Sustituye $x = ${r}$ y despeja $k$ de la ecuación lineal que queda.`,
            `Substitute $x = ${r}$ and solve the resulting linear equation for $k$.`,
          ),
        ],
        answerDisplay: L(`$k = ${k}$`, `$k = ${k}$`),
        solution: [
          step(
            "given",
            `$P(x) = x^3 ${opTerm(a, "x^2")} + kx ${op(c)}$ y $x ${r < 0 ? "+" : "-"} ${Math.abs(r)}$ es factor.`,
            `$P(x) = x^3 ${opTerm(a, "x^2")} + kx ${op(c)}$ and $x ${r < 0 ? "+" : "-"} ${Math.abs(r)}$ is a factor.`,
          ),
          step(
            "approach",
            "Si $x - r$ es factor, entonces $P(r) = 0$ (teorema del factor). Eso da una ecuación lineal en $k$.",
            "If $x - r$ is a factor, then $P(r) = 0$ (factor theorem). That gives a linear equation in $k$.",
          ),
          step(
            "calculation",
            `$P(${r}) = (${r})^3 ${op(a)}(${r})^2 + k \\cdot (${r}) ${op(c)} = 0$<br>$${r * r * r} ${op(a * r * r)} + k \\cdot (${r}) ${op(c)} = 0$<br>$k \\cdot (${r}) = ${-(r * r * r + a * r * r + c)}$<br>$k = ${k}$`,
            `$P(${r}) = (${r})^3 ${op(a)}(${r})^2 + k \\cdot (${r}) ${op(c)} = 0$<br>$${r * r * r} ${op(a * r * r)} + k \\cdot (${r}) ${op(c)} = 0$<br>$k \\cdot (${r}) = ${-(r * r * r + a * r * r + c)}$<br>$k = ${k}$`,
          ),
          step(
            "result",
            `El valor buscado es $k = ${k}$: con él, $P\\left(${r}\\right) = 0$ y la división es exacta.`,
            `The required value is $k = ${k}$: with it, $P\\left(${r}\\right) = 0$ and the division is exact.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Synthetic division                                               */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "poly-syn-01",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "synthetic-division",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 180,
      tags: ["synthetic-division"],
      prerequisites: ["operations"],
    },
    (rng) => {
      const a = rng.int(-4, 4);
      const b = rng.int(-5, 5);
      const c = rng.int(-6, 6);
      const d = rng.nonZeroInt(-3, 3);
      const u = a + d; // x-coefficient of the quotient
      const v = b + d * u; // constant of the quotient
      const rem = c + d * v; // remainder
      return {
        skill: L("División sintética", "Synthetic division"),
        statement: L(
          `Divide $P(x) = ${poly([1, a, b, c], ["x^3", "x^2", "x", ""])}$ entre $x ${d < 0 ? "+" : "-"} ${Math.abs(d)}$ por división sintética. El cociente es $x^2 + ux + v$ (con el resto aparte). ¿Cuánto vale $v$?`,
          `Divide $P(x) = ${poly([1, a, b, c], ["x^3", "x^2", "x", ""])}$ by $x ${d < 0 ? "+" : "-"} ${Math.abs(d)}$ using synthetic division. The quotient is $x^2 + ux + v$ (with a separate remainder). What is $v$?`,
        ),
        answer: { kind: "numeric", value: v },
        hints: [
          L(
            "En la división sintética se trabaja con el **opuesto** del término independiente del divisor.",
            "Synthetic division works with the **opposite** of the divisor's constant term.",
          ),
          L(
            `Escribe los coeficientes $1, ${a}, ${b}, ${c}$ y opera con $${d}$: baja, multiplica, suma.`,
            `Write the coefficients $1, ${a}, ${b}, ${c}$ and work with $${d}$: bring down, multiply, add.`,
          ),
          L(
            "Los tres primeros números de la fila inferior son los coeficientes del cociente; el último es el resto.",
            "The first three numbers of the bottom row are the quotient's coefficients; the last one is the remainder.",
          ),
        ],
        answerDisplay: L(`$v = ${v}$ (resto $= ${rem}$)`, `$v = ${v}$ (remainder $= ${rem}$)`),
        solution: [
          step(
            "given",
            `$P(x) = ${poly([1, a, b, c], ["x^3", "x^2", "x", ""])}$, divisor $x ${d < 0 ? "+" : "-"} ${Math.abs(d)}$, número sintético $${d}$.`,
            `$P(x) = ${poly([1, a, b, c], ["x^3", "x^2", "x", ""])}$, divisor $x ${d < 0 ? "+" : "-"} ${Math.abs(d)}$, synthetic number $${d}$.`,
          ),
          step(
            "approach",
            "Colocamos los coeficientes y aplicamos el ciclo: bajar el primero, multiplicar por el número sintético y sumar al siguiente coeficiente.",
            "Set up the coefficients and apply the cycle: bring down the first one, multiply by the synthetic number and add to the next coefficient.",
          ),
          step(
            "calculation",
            `Bajamos $1$; $${d} \\cdot 1 + (${a}) = ${u}$; $${d} \\cdot (${u}) + (${b}) = ${v}$; $${d} \\cdot (${v}) + (${c}) = ${rem}$ (resto).`,
            `Bring down $1$; $${d} \\cdot 1 + (${a}) = ${u}$; $${d} \\cdot (${u}) + (${b}) = ${v}$; $${d} \\cdot (${v}) + (${c}) = ${rem}$ (remainder).`,
          ),
          step(
            "result",
            `Cociente: $${poly([1, u, v], ["x^2", "x", ""])}$ y resto $${rem}$. Por tanto $v = ${v}$.`,
            `Quotient: $${poly([1, u, v], ["x^2", "x", ""])}$ and remainder $${rem}$. Hence $v = ${v}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Polynomial inequalities                                          */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "poly-ineq-01",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "inequalities",
      difficulty: "hard",
      questionType: "text",
      estimatedTimeSec: 240,
      tags: ["inequalities", "sign-analysis"],
      prerequisites: ["factoring"],
    },
    (rng) => {
      const p = -rng.int(1, 5); // smaller root (negative)
      const q = rng.int(1, 5); // larger root (positive)
      return {
        skill: L("Desigualdad cuadrática con intervalos", "Quadratic inequality with intervals"),
        statement: L(
          `Resuelve $\\left(x ${p < 0 ? "+" : "-"} ${Math.abs(p)}\\right)\\left(x ${q < 0 ? "+" : "-"} ${Math.abs(q)}\\right) > 0$ y escribe la solución en notación de intervalos, por ejemplo (-inf, -2) u (3, inf).`,
          `Solve $\\left(x ${p < 0 ? "+" : "-"} ${Math.abs(p)}\\right)\\left(x ${q < 0 ? "+" : "-"} ${Math.abs(q)}\\right) > 0$ and write the solution in interval notation, e.g. (-inf, -2) u (3, inf).`,
        ),
        answer: {
          kind: "text",
          accepted: [
            `(-inf, ${p}) u (${q}, inf)`,
            `(-inf,${p})u(${q},inf)`,
            `(-inf, ${p})u(${q}, inf)`,
            `(-inf,${p}) u (${q},inf)`,
            `(-∞, ${p}) u (${q}, ∞)`,
            `(-∞,${p})u(${q},∞)`,
            `(-∞, ${p})u(${q}, ∞)`,
            `(-∞,${p}) u (${q},∞)`,
            `x<${p} or x>${q}`,
            `x<${p} o x>${q}`,
            `x < ${p} or x > ${q}`,
            `x < ${p} o x > ${q}`,
          ],
        },
        hints: [
          L(
            "El producto es positivo cuando los dos factores tienen el **mismo** signo.",
            "The product is positive when both factors have the **same** sign.",
          ),
          L(
            "Estudia el signo en las tres regiones separadas por las raíces (una tabla de signos ayuda).",
            "Study the sign on the three regions separated by the roots (a sign table helps).",
          ),
          L(
            "Como la parábola abre hacia arriba, el producto es positivo **fuera** del intervalo de las raíces; la desigualdad es estricta, así que las raíces no cuentan.",
            "Since the parabola opens upward, the product is positive **outside** the interval between the roots; the inequality is strict, so the roots themselves are excluded.",
          ),
        ],
        answerDisplay: L(
          `$x < ${p}$ o $x > ${q}$, es decir, $(-\\infty, ${p}) \\cup (${q}, \\infty)$`,
          `$x < ${p}$ or $x > ${q}$, i.e. $(-\\infty, ${p}) \\cup (${q}, \\infty)$`,
        ),
        solution: [
          step(
            "given",
            `$\\left(x ${p < 0 ? "+" : "-"} ${Math.abs(p)}\\right)\\left(x ${q < 0 ? "+" : "-"} ${Math.abs(q)}\\right) > 0$, raíces $x = ${p}$ y $x = ${q}$.`,
            `$\\left(x ${p < 0 ? "+" : "-"} ${Math.abs(p)}\\right)\\left(x ${q < 0 ? "+" : "-"} ${Math.abs(q)}\\right) > 0$, roots $x = ${p}$ and $x = ${q}$.`,
          ),
          step(
            "approach",
            "Hacemos un análisis de signos: las raíces dividen la recta real en tres regiones y probamos el signo del producto en cada una.",
            "We do a sign analysis: the roots split the real line into three regions and we test the sign of the product on each.",
          ),
          step(
            "calculation",
            `Para $x < ${p}$: los dos factores son negativos $\\Rightarrow$ producto positivo.<br>Para $${p} < x < ${q}$: los factores tienen signos opuestos $\\Rightarrow$ producto negativo.<br>Para $x > ${q}$: los dos factores son positivos $\\Rightarrow$ producto positivo.<br>En $x = ${p}$ y $x = ${q}$ el producto vale $0$, que no es mayor que $0$.`,
            `For $x < ${p}$: both factors are negative $\\Rightarrow$ product positive.<br>For $${p} < x < ${q}$: the factors have opposite signs $\\Rightarrow$ product negative.<br>For $x > ${q}$: both factors are positive $\\Rightarrow$ product positive.<br>At $x = ${p}$ and $x = ${q}$ the product equals $0$, which is not greater than $0$.`,
          ),
          step(
            "result",
            `La solución es $(-\\infty, ${p}) \\cup (${q}, \\infty)$.`,
            `The solution is $(-\\infty, ${p}) \\cup (${q}, \\infty)$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Curated — Kurzkontrolle 1 del tutor (conjuntos): soluciones       */
  /* reales de un producto de cuatro factores. Transcribed as printed;*/
  /* verified: L = (-5, -2, 5). Fixed problem.                         */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "poly-eq-03",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "equations",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 180,
      tags: ["zero-product", "real-roots", "difference-of-squares"],
      prerequisites: ["factoring"],
      source: {
        sourceId: "tutor-kurzkontrolle-1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "1",
      },
      reasoning: "spurious",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L("$\\{-5,\\; -2,\\; 5\\}$", "$\\{-5,\\; -2,\\; 5\\}$"),
          correct: true,
        },
        {
          id: "b",
          text: L("$\\{-5,\\; -3,\\; -2,\\; 3,\\; 5\\}$", "$\\{-5,\\; -3,\\; -2,\\; 3,\\; 5\\}$"),
          correct: false,
        },
        {
          id: "c",
          text: L("$\\{-2,\\; 5\\}$", "$\\{-2,\\; 5\\}$"),
          correct: false,
        },
        {
          id: "d",
          text: L("$\\{-5,\\; 5\\}$", "$\\{-5,\\; 5\\}$"),
          correct: false,
        },
      ];
      return {
        skill: L("Conjunto de soluciones reales de un producto de factores", "Real solution set of a product of factors"),
        statement: L(
            "Indica los elementos del conjunto de todas las soluciones **reales** de la ecuación $$(x + 2)\\,(x - 5)\\,(x^2 + 9)\\,(x^2 - 25) = 0.$$",
            "Give the elements of the set of all **real** solutions of the equation $$(x + 2)\\,(x - 5)\\,(x^2 + 9)\\,(x^2 - 25) = 0.$$",
          ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L("Un producto se anula si algún factor se anula: analiza cada factor por separado.", "A product vanishes when one of its factors does: analyse each factor separately."),
          L("$x^2 + 9 = 0$ no tiene soluciones reales (una suma de cuadrados nunca se anula en $\\mathbb{R}$). $x^2 - 25$ es una diferencia de cuadrados.", "$x^2 + 9 = 0$ has no real solutions (a sum of squares never vanishes over $\\mathbb{R}$). $x^2 - 25$ is a difference of squares."),
          L("Reúne: $x+2=0$ da $-2$; $x-5=0$ da $5$; $x^2-25=0$ da $\\pm 5$. Como es un conjunto, los repetidos cuentan una vez.", "Collect: $x+2=0$ gives $-2$; $x-5=0$ gives $5$; $x^2-25=0$ gives $\\pm 5$. It is a set, so repeated values count once.")
        ],
        answerDisplay: L("$\\{-5,\\; -2,\\; 5\\}$", "$\\{-5,\\; -2,\\; 5\\}$"),
        solution: [
          step(
            "given",
            "La ecuación $(x+2)(x-5)(x^2+9)(x^2-25) = 0$: cuatro factores; se pide el conjunto de soluciones **reales**.",
            "The equation $(x+2)(x-5)(x^2+9)(x^2-25) = 0$: four factors; we are asked for the set of **real** solutions.",
          ),
          step(
            "approach",
            "Producto nulo ⟺ algún factor nulo. Resolvemos cada factor sobre $\\mathbb{R}$ y reunimos en un conjunto (sin repeticiones).",
            "A null product ⟺ some factor is null. We solve each factor over $\\mathbb{R}$ and collect into a set (no repetitions).",
          ),
          step(
            "calculation",
            "$x + 2 = 0 \\Rightarrow x = -2$.<br>$x - 5 = 0 \\Rightarrow x = 5$.<br>$x^2 + 9 = 0 \\Rightarrow x = \\pm 3i$ — **no reales**: se descartan (en $\\mathbb{R}$, $x^2 + 9 \\ge 9 > 0$).<br>$x^2 - 25 = 0 \\Rightarrow x = \\pm 5$ (diferencia de cuadrados).",
            "$x + 2 = 0 \\Rightarrow x = -2$.<br>$x - 5 = 0 \\Rightarrow x = 5$.<br>$x^2 + 9 = 0 \\Rightarrow x = \\pm 3i$ — **not real**: discarded (over $\\mathbb{R}$, $x^2 + 9 \\ge 9 > 0$).<br>$x^2 - 25 = 0 \\Rightarrow x = \\pm 5$ (difference of squares).",
          ),
          step(
            "result",
            "Reuniendo $\\{{-2\\}} \\cup \\{{5\\}} \\cup \\{{-5, 5\\}}$ y deduplicando: $L = \\{{-5,\\; -2,\\; 5\\}}$.",
            "Collecting $\\{{-2\\}} \\cup \\{{5\\}} \\cup \\{{-5, 5\\}}$ and deduplicating: $L = \\{{-5,\\; -2,\\; 5\\}}$.",
          )
        ],
      };
    },
  ),


  /* ---------------------------------------------------------------- */
  /* Curated Phase 2 — Übungsaufgaben Studienkolleg Bayern            */
  /* (Stand Jan 18). Transcribed as printed; every answer verified     */
  /* independently (grid-scan / expansion) before integration; see     */
  /* /tmp/curated-p2/verify.py and the worklog. Fixed problems —       */
  /* rng only shuffles MC options.                                     */
  /* ---------------------------------------------------------------- */

  /* §1.1 a) — división larga con divisor cuadrático. */
  template(
    {
      id: "poly-div-01",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "synthetic-division",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 240,
      tags: ["polynomial-division", "long-division"],
      prerequisites: ["operations"],
      source: {
        sourceId: "stk-bayern-ubung",
        license: "OPEN_LICENSE",
        exerciseNumber: "1.1 a)",
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      return {
        skill: L("División de polinomios (divisor cuadrático)", "Polynomial division (quadratic divisor)"),
        statement: L(
          "Divide (la división es exacta): $$\\left(5x^3 - 16x^2 + 58x - 11\\right) : \\left(x^2 - 3x + 11\\right)$$ Escribe el cociente como polinomio en $x$ (por ejemplo 3x + 2 o 3*x+2).",
          "Divide (the division is exact): $$\\left(5x^3 - 16x^2 + 58x - 11\\right) \\div \\left(x^2 - 3x + 11\\right)$$ Write the quotient as a polynomial in $x$ (e.g. 3x + 2 or 3*x+2).",
        ),
        answer: {
          kind: "expression",
          accepted: ["5x - 1", "5*x - 1", "5x-1"],
          variables: ["x"],
        },
        hints: [
          L(
            "Empieza por los términos de mayor grado: ¿qué multiplicado por $x^2$ produce $5x^3$?",
            "Start with the leading terms: what times $x^2$ produces $5x^3$?",
          ),
          L(
            "El primer término del cociente es $5x$. Multiplica el divisor completo por $5x$ y réstalo del dividendo.",
            "The first term of the quotient is $5x$. Multiply the whole divisor by $5x$ and subtract it from the dividend.",
          ),
          L(
            "Tras restar queda $-x^2 + 3x - 11$: el siguiente término del cociente es $-1$, y la resta final da $0$ (división exacta).",
            "After subtracting, $-x^2 + 3x - 11$ remains: the next term of the quotient is $-1$, and the final subtraction gives $0$ (exact division).",
          ),
        ],
        answerDisplay: L("Cociente $= 5x - 1$", "Quotient $= 5x - 1$"),
        solution: [
          step(
            "given",
            "Dividendo $5x^3 - 16x^2 + 58x - 11$; divisor $x^2 - 3x + 11$ (grado 2, así que el cociente tendrá grado 1).",
            "Dividend $5x^3 - 16x^2 + 58x - 11$; divisor $x^2 - 3x + 11$ (degree 2, so the quotient has degree 1).",
          ),
          step(
            "approach",
            "División larga: alinea término a término, divide los grados mayores, multiplica, resta y baja. La división es exacta: el resto debe ser $0$.",
            "Long division: align term by term, divide the leading degrees, multiply, subtract and bring down. The division is exact: the remainder must be $0$.",
          ),
          step(
            "calculation",
            "$5x^3 \\div x^2 = 5x$. Resta: $5x^3 - 16x^2 + 58x - 11 - 5x\\left(x^2 - 3x + 11\\right) = -x^2 + 3x - 11$.<br>$-x^2 \\div x^2 = -1$. Resta: $-x^2 + 3x - 11 - (-1)\\left(x^2 - 3x + 11\\right) = 0$.<br>Verificación: $\\left(x^2 - 3x + 11\\right)(5x - 1) = 5x^3 - 15x^2 + 55x - x^2 + 3x - 11 = 5x^3 - 16x^2 + 58x - 11$ ✓",
            "$5x^3 \\div x^2 = 5x$. Subtract: $5x^3 - 16x^2 + 58x - 11 - 5x\\left(x^2 - 3x + 11\\right) = -x^2 + 3x - 11$.<br>$-x^2 \\div x^2 = -1$. Subtract: $-x^2 + 3x - 11 - (-1)\\left(x^2 - 3x + 11\\right) = 0$.<br>Check: $\\left(x^2 - 3x + 11\\right)(5x - 1) = 5x^3 - 15x^2 + 55x - x^2 + 3x - 11 = 5x^3 - 16x^2 + 58x - 11$ ✓",
          ),
          step(
            "result",
            "Cociente $= 5x - 1$ (resto $0$).",
            "Quotient $= 5x - 1$ (remainder $0$).",
          ),
        ],
      };
    },
  ),

  /* §1.1 c) — diferencia de cuadrados que hace la división evidente. */
  template(
    {
      id: "poly-div-02",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "synthetic-division",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 180,
      tags: ["polynomial-division", "difference-of-squares"],
      prerequisites: ["factoring"],
      source: {
        sourceId: "stk-bayern-ubung",
        license: "OPEN_LICENSE",
        exerciseNumber: "1.1 c)",
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L("$x^3 - x^2 + x - 1$", "$x^3 - x^2 + x - 1$"),
          correct: true,
        },
        {
          id: "b",
          text: L("$x^3 + x^2 + x + 1$", "$x^3 + x^2 + x + 1$"),
          correct: false,
        },
        {
          id: "c",
          text: L("$x^3 - x^2 - x + 1$", "$x^3 - x^2 - x + 1$"),
          correct: false,
        },
        {
          id: "d",
          text: L("$x^3 + x^2 - x - 1$", "$x^3 + x^2 - x - 1$"),
          correct: false,
        },
      ];
      return {
        skill: L("División con diferencia de cuadrados", "Division with a difference of squares"),
        statement: L(
          "Divide (la división es exacta): $$\\left(x^4 - 1\\right) : \\left(x + 1\\right)$$ Elige el cociente correcto.",
          "Divide (the division is exact): $$\\left(x^4 - 1\\right) \\div \\left(x + 1\\right)$$ Choose the correct quotient.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Antes de dividir a ciegas, factoriza el dividendo: $x^4 - 1$ es una **diferencia de cuadrados**.",
            "Before dividing blindly, factor the dividend: $x^4 - 1$ is a **difference of squares**.",
          ),
          L(
            "$x^4 - 1 = \\left(x^2 - 1\\right)\\left(x^2 + 1\\right) = (x-1)(x+1)\\left(x^2 + 1\\right)$.",
            "$x^4 - 1 = \\left(x^2 - 1\\right)\\left(x^2 + 1\\right) = (x-1)(x+1)\\left(x^2 + 1\\right)$.",
          ),
          L(
            "Cancela el factor $(x+1)$ con el divisor y expande lo que queda.",
            "Cancel the $(x+1)$ factor with the divisor and expand what is left.",
          ),
        ],
        answerDisplay: L("Cociente $= x^3 - x^2 + x - 1$", "Quotient $= x^3 - x^2 + x - 1$"),
        solution: [
          step(
            "given",
            "Dividendo $x^4 - 1$; divisor $x + 1$.",
            "Dividend $x^4 - 1$; divisor $x + 1$.",
          ),
          step(
            "approach",
            "Un camino corto: factorizar el dividendo y cancelar el divisor; un camino largo: división larga término a término. Ambos deben coincidir.",
            "One short route: factor the dividend and cancel the divisor; one long route: term-by-term long division. Both must agree.",
          ),
          step(
            "calculation",
            "$x^4 - 1 = (x-1)(x+1)\\left(x^2 + 1\\right)$, así que $\\dfrac{x^4-1}{x+1} = (x-1)\\left(x^2 + 1\\right) = x^3 + x^2 - x^2 - x + x + 1$… con cuidado: $(x-1)\\left(x^2+1\\right) = x^3 + x - x^2 - 1 = x^3 - x^2 + x - 1$.<br>Por división larga: $x^4 \\div x = x^3$; resta $x^4 + x^3$ → $-x^3 - 1$; $-x^3 \\div x = -x^2$; resta $-x^3 - x^2$ → $x^2 - 1$; $x^2 \\div x = x$; resta $x^2 + x$ → $-x - 1$; $-x \\div x = -1$; resta $-x - 1$ → $0$.",
            "$x^4 - 1 = (x-1)(x+1)\\left(x^2 + 1\\right)$, so $\\dfrac{x^4-1}{x+1} = (x-1)\\left(x^2 + 1\\right) = x^3 - x^2 + x - 1$.<br>By long division: $x^4 \\div x = x^3$; subtract $x^4 + x^3$ → $-x^3 - 1$; $-x^3 \\div x = -x^2$; subtract $-x^3 - x^2$ → $x^2 - 1$; $x^2 \\div x = x$; subtract $x^2 + x$ → $-x - 1$; $-x \\div x = -1$; subtract $-x - 1$ → $0$.",
          ),
          step(
            "result",
            "Cociente $= x^3 - x^2 + x - 1$ (resto $0$). La opción $x^3 + x^2 + x + 1$ corresponde a dividir entre $x - 1$: ¡cuidado con los signos!",
            "Quotient $= x^3 - x^2 + x - 1$ (remainder $0$). The option $x^3 + x^2 + x + 1$ corresponds to dividing by $x - 1$: mind the signs!",
          ),
        ],
      };
    },
  ),

  /* §1.1 f) — divisor de cinco términos (suma geométrica). */
  template(
    {
      id: "poly-div-03",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "synthetic-division",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["polynomial-division", "two-variables", "structure"],
      prerequisites: ["operations", "factoring"],
      source: {
        sourceId: "stk-bayern-ubung",
        license: "OPEN_LICENSE",
        exerciseNumber: "1.1 f)",
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$x^2 - y^2$", "$x^2 - y^2$"), correct: true },
        { id: "b", text: L("$x^2 + y^2$", "$x^2 + y^2$"), correct: false },
        { id: "c", text: L("$x - y$", "$x - y$"), correct: false },
        { id: "d", text: L("$x + y$", "$x + y$"), correct: false },
      ];
      return {
        skill: L("División en dos variables con estructura oculta", "Two-variable division with hidden structure"),
        statement: L(
          "Divide (la división es exacta): $$\\left(x^6 + x^5y - xy^5 - y^6\\right) : \\left(x^4 + x^3y + x^2y^2 + xy^3 + y^4\\right)$$ Elige el cociente correcto.",
          "Divide (the division is exact): $$\\left(x^6 + x^5y - xy^5 - y^6\\right) \\div \\left(x^4 + x^3y + x^2y^2 + xy^3 + y^4\\right)$$ Choose the correct quotient.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El divisor tiene cinco términos con un patrón regular: parece una **suma geométrica**.",
            "The divisor has five terms with a regular pattern: it looks like a **geometric sum**.",
          ),
          L(
            "El divisor coincide con $\\dfrac{x^5 - y^5}{x - y}$ (búscalo: multiplica el divisor por $(x - y)$ y casi todo se cancela).",
            "The divisor equals $\\dfrac{x^5 - y^5}{x - y}$ (check it: multiply the divisor by $(x - y)$ and almost everything cancels).",
          ),
          L(
            "El dividendo también se reescribe: $x^6 + x^5y - xy^5 - y^6 = (x + y)\\left(x^5 - y^5\\right)$. Cancela y simplifica.",
            "The dividend rewrites too: $x^6 + x^5y - xy^5 - y^6 = (x + y)\\left(x^5 - y^5\\right)$. Cancel and simplify.",
          ),
        ],
        answerDisplay: L("Cociente $= x^2 - y^2$", "Quotient $= x^2 - y^2$"),
        solution: [
          step(
            "given",
            "Dividendo $x^6 + x^5y - xy^5 - y^6$; divisor $x^4 + x^3y + x^2y^2 + xy^3 + y^4$ — dos variables, grados 6 y 4.",
            "Dividend $x^6 + x^5y - xy^5 - y^6$; divisor $x^4 + x^3y + x^2y^2 + xy^3 + y^4$ — two variables, degrees 6 and 4.",
          ),
          step(
            "approach",
            "División larga en dos variables funciona, pero el patrón ahorra trabajo: el divisor es la suma geométrica $\\frac{x^5 - y^5}{x - y}$ y el dividendo se factoriza por grupos.",
            "Long division in two variables works, but the pattern saves work: the divisor is the geometric sum $\\frac{x^5 - y^5}{x - y}$ and the dividend factors by grouping.",
          ),
          step(
            "calculation",
            "Dividendo: $x^5(x + y) - y^5(x + y) = (x + y)\\left(x^5 - y^5\\right)$.<br>Divisor: $(x - y)\\left(x^4 + x^3y + x^2y^2 + xy^3 + y^4\\right) = x^5 - y^5$.<br>Cociente: $\\dfrac{(x + y)\\left(x^5 - y^5\\right)}{\\left(x^5 - y^5\\right)/(x - y)} = (x + y)(x - y) = x^2 - y^2$.<br>Verificación por multiplicación directa: $\\left(x^2 - y^2\\right) \\cdot \\text{divisor} = x^6 + x^5y - xy^5 - y^6$ ✓",
            "Dividend: $x^5(x + y) - y^5(x + y) = (x + y)\\left(x^5 - y^5\\right)$.<br>Divisor: $(x - y)\\left(x^4 + x^3y + x^2y^2 + xy^3 + y^4\\right) = x^5 - y^5$.<br>Quotient: $\\dfrac{(x + y)\\left(x^5 - y^5\\right)}{\\left(x^5 - y^5\\right)/(x - y)} = (x + y)(x - y) = x^2 - y^2$.<br>Direct multiplication check: $\\left(x^2 - y^2\\right) \\cdot \\text{divisor} = x^6 + x^5y - xy^5 - y^6$ ✓",
          ),
          step(
            "result",
            "Cociente $= x^2 - y^2$ (resto $0$). El examen también se resuelve con división larga pura: el primer término sería $x^6 \\div x^4 = x^2$.",
            "Quotient $= x^2 - y^2$ (remainder $0$). The exam can also be solved by pure long division: the first term would be $x^6 \\div x^4 = x^2$.",
          ),
        ],
      };
    },
  ),

  /* §1.2 a) — ecuación cúbica con raíz doble. */
  template(
    {
      id: "poly-eq-04",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "equations",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["cubic", "rational-roots", "double-root"],
      prerequisites: ["equations", "factoring"],
      source: {
        sourceId: "stk-bayern-ubung",
        license: "OPEN_LICENSE",
        exerciseNumber: "1.2 a)",
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$L = \\{-1,\\; 2\\}$", "$L = \\{-1,\\; 2\\}$"), correct: true },
        { id: "b", text: L("$L = \\{-1,\\; -2\\}$", "$L = \\{-1,\\; -2\\}$"), correct: false },
        { id: "c", text: L("$L = \\{1,\\; 2\\}$", "$L = \\{1,\\; 2\\}$"), correct: false },
        { id: "d", text: L("$L = \\{2\\}$", "$L = \\{2\\}$"), correct: false },
      ];
      return {
        skill: L("Ecuación cúbica con raíz doble", "Cubic equation with a double root"),
        statement: L(
          "Resuelve sobre $\\mathbb{R}$: $$x^3 - 3x^2 + 4 = 0$$",
          "Solve over $\\mathbb{R}$: $$x^3 - 3x^2 + 4 = 0$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Prueba candidatos racionales pequeños (divisores del término independiente, $\\pm 1, \\pm 2, \\pm 4$).",
            "Try small rational candidates (divisors of the constant term, $\\pm 1, \\pm 2, \\pm 4$).",
          ),
          L(
            "$P(-1) = -1 - 3 + 4 = 0$ ✓, así que $(x + 1)$ es factor. Divide con Ruffini.",
            "$P(-1) = -1 - 3 + 4 = 0$ ✓, so $(x + 1)$ is a factor. Divide using synthetic division.",
          ),
          L(
            "El cociente es $x^2 - 4x + 4$: un **cuadrado perfecto**.",
            "The quotient is $x^2 - 4x + 4$: a **perfect square**.",
          ),
        ],
        answerDisplay: L("$L = \\{-1,\\; 2\\}$ (el $2$ es raíz doble)", "$L = \\{-1,\\; 2\\}$ ($2$ is a double root)"),
        solution: [
          step(
            "given",
            "La cúbica $x^3 - 3x^2 + 4 = 0$ con coeficientes enteros.",
            "The cubic $x^3 - 3x^2 + 4 = 0$ with integer coefficients.",
          ),
          step(
            "approach",
            "Raíz racional de prueba + Ruffini + factorización del cociente. Toda cúbica con coeficientes reales tiene al menos una raíz real.",
            "Trial rational root + synthetic division + factoring the quotient. Every cubic with real coefficients has at least one real root.",
          ),
          step(
            "calculation",
            "$P(-1) = -1 - 3 + 4 = 0$ ✓. Ruffini con $-1$ sobre $[1, -3, 0, 4]$ baja $1$; $1 \\cdot (-1) = -1$; $-3 + (-1) = -4$; $-4 \\cdot (-1) = 4$; $0 + 4 = 4$; $4 \\cdot (-1) = -4$; $4 + (-4) = 0$.<br>Cociente: $x^2 - 4x + 4 = (x - 2)^2 \\Rightarrow x = 2$ (doble).",
            "$P(-1) = -1 - 3 + 4 = 0$ ✓. Synthetic division with $-1$ on $[1, -3, 0, 4]$ brings down $1$; $1 \\cdot (-1) = -1$; $-3 + (-1) = -4$; $-4 \\cdot (-1) = 4$; $0 + 4 = 4$; $4 \\cdot (-1) = -4$; $4 + (-4) = 0$.<br>Quotient: $x^2 - 4x + 4 = (x - 2)^2 \\Rightarrow x = 2$ (double).",
          ),
          step(
            "result",
            "$x^3 - 3x^2 + 4 = (x + 1)(x - 2)^2$, así que $L = \\{-1,\\; 2\\}$. La raíz doble cuenta una sola vez en el conjunto de soluciones.",
            "$x^3 - 3x^2 + 4 = (x + 1)(x - 2)^2$, so $L = \\{-1,\\; 2\\}$. The double root counts once in the solution set.",
          ),
        ],
      };
    },
  ),

  /* §5 a) — desigualdad cuadrática con coeficiente principal negativo. */
  template(
    {
      id: "poly-ineq-02",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "inequalities",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 180,
      tags: ["inequalities", "sign-analysis", "quadratic"],
      prerequisites: ["factoring"],
      source: {
        sourceId: "stk-bayern-ubung",
        license: "OPEN_LICENSE",
        exerciseNumber: "5 a)",
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L("$(-\\infty, -4) \\cup (0, \\infty)$", "$(-\\infty, -4) \\cup (0, \\infty)$"),
          correct: true,
        },
        { id: "b", text: L("$(-4, 0)$", "$(-4, 0)$"), correct: false },
        { id: "c", text: L("$[-4, 0]$", "$[-4, 0]$"), correct: false },
        {
          id: "d",
          text: L("$(-\\infty, -4] \\cup [0, \\infty)$", "$(-\\infty, -4] \\cup [0, \\infty)$"),
          correct: false,
        },
      ];
      return {
        skill: L("Desigualdad cuadrática (coeficiente principal negativo)", "Quadratic inequality (negative leading coefficient)"),
        statement: L(
          "Resuelve y elige la solución en notación de intervalos: $$-x^2 < 4x$$",
          "Solve and choose the solution in interval notation: $$-x^2 < 4x$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Reordena: pasa todo al mismo lado antes de analizar el signo.",
            "Rearrange: move everything to one side before analysing the sign.",
          ),
          L(
            "$-x^2 - 4x < 0$. Si multiplicas por $-1$, la desigualdad **se invierte**: $x^2 + 4x > 0$.",
            "$-x^2 - 4x < 0$. Multiplying by $-1$ **flips** the inequality: $x^2 + 4x > 0$.",
          ),
          L(
            "$x(x + 4) > 0$: producto positivo **fuera** de las raíces, y como la desigualdad es estricta, las raíces no cuentan.",
            "$x(x + 4) > 0$: the product is positive **outside** the roots, and since the inequality is strict the roots do not count.",
          ),
        ],
        answerDisplay: L(
          "$L = (-\\infty, -4) \\cup (0, \\infty)$",
          "$L = (-\\infty, -4) \\cup (0, \\infty)$",
        ),
        solution: [
          step(
            "given",
            "La desigualdad $-x^2 < 4x$ con parábola que abre hacia abajo.",
            "The inequality $-x^2 < 4x$ with a downward-opening parabola.",
          ),
          step(
            "approach",
            "Cero de un lado, factorizar y tabla de signos (o lectura de la parábola). El signo del coeficiente principal obliga a ir con cuidado.",
            "Zero on one side, factor, and a sign table (or read the parabola). The leading coefficient's sign demands care.",
          ),
          step(
            "calculation",
            "$-x^2 - 4x < 0 \\iff x^2 + 4x > 0 \\iff x(x + 4) > 0$.<br>Las raíces $x = -4$ y $x = 0$ parten la recta en tres regiones: para $x < -4$ ambos factores son negativos (producto positivo); para $-4 < x < 0$, signos opuestos (negativo); para $x > 0$, ambos positivos (positivo). En $x = -4$ y $x = 0$ el producto vale $0$, que no es $> 0$.",
            "$-x^2 - 4x < 0 \\iff x^2 + 4x > 0 \\iff x(x + 4) > 0$.<br>The roots $x = -4$ and $x = 0$ split the line into three regions: for $x < -4$ both factors are negative (positive product); for $-4 < x < 0$, opposite signs (negative); for $x > 0$, both positive (positive). At $x = -4$ and $x = 0$ the product is $0$, which is not $> 0$.",
          ),
          step(
            "result",
            "$L = (-\\infty, -4) \\cup (0, \\infty)$, con extremos **abiertos** por la desigualdad estricta.",
            "$L = (-\\infty, -4) \\cup (0, \\infty)$, with **open** endpoints due to the strict inequality.",
          ),
        ],
      };
    },
  ),

  /* §5 d) — cuadrado perfecto ≤ constante: lectura como distancia. */
  template(
    {
      id: "poly-ineq-03",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "inequalities",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["inequalities", "absolute-value", "distance"],
      prerequisites: [],
      source: {
        sourceId: "stk-bayern-ubung",
        license: "OPEN_LICENSE",
        exerciseNumber: "5 d)",
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$[3,\\; 7]$", "$[3,\\; 7]$"), correct: true },
        { id: "b", text: L("$(3,\\; 7)$", "$(3,\\; 7)$"), correct: false },
        {
          id: "c",
          text: L("$(-\\infty, 3] \\cup [7, \\infty)$", "$(-\\infty, 3] \\cup [7, \\infty)$"),
          correct: false,
        },
        { id: "d", text: L("$[4,\\; 6]$", "$[4,\\; 6]$"), correct: false },
      ];
      return {
        skill: L("Cuadrado perfecto acotado por una constante", "Perfect square bounded by a constant"),
        statement: L(
          "Resuelve y elige la solución en notación de intervalos: $$(x - 5)^2 \\le 4$$",
          "Solve and choose the solution in interval notation: $$(x - 5)^2 \\le 4$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Un cuadrado nunca es negativo: $(x-5)^2$ mide una **distancia al cuadrado**.",
            "A square is never negative: $(x-5)^2$ measures a **squared distance**.",
          ),
          L(
            "$(x - 5)^2 \\le 4$ equivale a $|x - 5| \\le 2$.",
            "$(x - 5)^2 \\le 4$ is equivalent to $|x - 5| \\le 2$.",
          ),
          L(
            "Distancia entre $x$ y $5$ de **como mucho** $2$: ¿qué intervalo describe eso? (La desigualdad admite igualdad: los extremos cuentan.)",
            "Distance between $x$ and $5$ of **at most** $2$: which interval describes that? (Equality is allowed: the endpoints count.)",
          ),
        ],
        answerDisplay: L("$L = [3,\\; 7]$", "$L = [3,\\; 7]$"),
        solution: [
          step(
            "given",
            "La desigualdad $(x - 5)^2 \\le 4$.",
            "The inequality $(x - 5)^2 \\le 4$.",
          ),
          step(
            "approach",
            "Leer el cuadrado como valor absoluto evita expandrir y factorizar: $a^2 \\le b^2 \\iff |a| \\le b$ (con $b \\ge 0$).",
            "Reading the square as an absolute value avoids expanding and factoring: $a^2 \\le b^2 \\iff |a| \\le b$ (with $b \\ge 0$).",
          ),
          step(
            "calculation",
            "$(x - 5)^2 \\le 4 \\iff |x - 5| \\le 2 \\iff -2 \\le x - 5 \\le 2$.<br>Sumando $5$ en las tres partes: $3 \\le x \\le 7$.<br>Comprobación de extremos: $(3-5)^2 = 4$ ✓ y $(7-5)^2 = 4$ ✓ (se incluyen, pues vale $\\le$). En $x = 4$: $(4-5)^2 = 1 \\le 4$ ✓ dentro.",
            "$(x - 5)^2 \\le 4 \\iff |x - 5| \\le 2 \\iff -2 \\le x - 5 \\le 2$.<br>Adding $5$ throughout: $3 \\le x \\le 7$.<br>Endpoint check: $(3-5)^2 = 4$ ✓ and $(7-5)^2 = 4$ ✓ (included, since it is $\\le$). At $x = 4$: $(4-5)^2 = 1 \\le 4$ ✓ inside.",
          ),
          step(
            "result",
            "$L = [3,\\; 7]$, cerrado en ambos extremos porque la desigualdad admite igualdad.",
            "$L = [3,\\; 7]$, closed at both endpoints because equality is allowed.",
          ),
        ],
      };
    },
  ),

  /* §5 j) — trinomio que factoriza con raíces enteras. */
  template(
    {
      id: "poly-ineq-04",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "inequalities",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 180,
      tags: ["inequalities", "factoring", "sign-analysis"],
      prerequisites: ["factoring"],
      source: {
        sourceId: "stk-bayern-ubung",
        license: "OPEN_LICENSE",
        exerciseNumber: "5 j)",
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L("$(-\\infty, -9) \\cup (3, \\infty)$", "$(-\\infty, -9) \\cup (3, \\infty)$"),
          correct: true,
        },
        { id: "b", text: L("$(-9,\\; 3)$", "$(-9,\\; 3)$"), correct: false },
        {
          id: "c",
          text: L("$(-\\infty, -3) \\cup (9, \\infty)$", "$(-\\infty, -3) \\cup (9, \\infty)$"),
          correct: false,
        },
        {
          id: "d",
          text: L("$(-\\infty, -9] \\cup [3, \\infty)$", "$(-\\infty, -9] \\cup [3, \\infty)$"),
          correct: false,
        },
      ];
      return {
        skill: L("Desigualdad cuadrática por factorización", "Quadratic inequality by factoring"),
        statement: L(
          "Resuelve y elige la solución en notación de intervalos: $$x^2 + 6x - 27 > 0$$",
          "Solve and choose the solution in interval notation: $$x^2 + 6x - 27 > 0$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Factoriza el trinomio: busca dos números cuyo producto sea $-27$ y cuya suma sea $6$.",
            "Factor the trinomial: look for two numbers whose product is $-27$ and whose sum is $6$.",
          ),
          L(
            "$x^2 + 6x - 27 = (x + 9)(x - 3)$.",
            "$x^2 + 6x - 27 = (x + 9)(x - 3)$.",
          ),
          L(
            "Producto **positivo estricto**: la parábola abre hacia arriba, así que es positivo fuera de las raíces — y las raíces mismas no cuentan.",
            "**Strictly positive** product: the parabola opens upward, so it is positive outside the roots — and the roots themselves do not count.",
          ),
        ],
        answerDisplay: L(
          "$L = (-\\infty, -9) \\cup (3, \\infty)$",
          "$L = (-\\infty, -9) \\cup (3, \\infty)$",
        ),
        solution: [
          step(
            "given",
            "La desigualdad $x^2 + 6x - 27 > 0$.",
            "The inequality $x^2 + 6x - 27 > 0$.",
          ),
          step(
            "approach",
            "Factorizar y hacer análisis de signos por regiones (o leer la parábola hacia arriba).",
            "Factor and do a region-by-region sign analysis (or read the upward parabola).",
          ),
          step(
            "calculation",
            "$x^2 + 6x - 27 = (x + 9)(x - 3)$, con raíces $x = -9$ y $x = 3$.<br>Para $x < -9$: $(x+9) < 0$, $(x-3) < 0$ → producto $> 0$ ✓.<br>Para $-9 < x < 3$: signos opuestos → producto $< 0$.<br>Para $x > 3$: ambos positivos → producto $> 0$ ✓.<br>En $x = -9$ y $x = 3$: producto $= 0$, que no es $> 0$.",
            "$x^2 + 6x - 27 = (x + 9)(x - 3)$, with roots $x = -9$ and $x = 3$.<br>For $x < -9$: $(x+9) < 0$, $(x-3) < 0$ → product $> 0$ ✓.<br>For $-9 < x < 3$: opposite signs → product $< 0$.<br>For $x > 3$: both positive → product $> 0$ ✓.<br>At $x = -9$ and $x = 3$: product $= 0$, which is not $> 0$.",
          ),
          step(
            "result",
            "$L = (-\\infty, -9) \\cup (3, \\infty)$, con extremos abiertos por la desigualdad estricta.",
            "$L = (-\\infty, -9) \\cup (3, \\infty)$, with open endpoints due to the strict inequality.",
          ),
        ],
      };
    },
  ),
  /* ================================================================== */
  /* Curated — Fundamentos ESPOL, §3.11 Inecuaciones, pp. 323–324.      */
  /* Verified with sympy before import.                                 */
  /* ================================================================== */

  /* 121a — (4x+1)² < (1−2x)(x+4) → (−1, 1/6) */
  template(
    {
      id: "poly-espol-121a",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "inequalities",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["inequality", "expansion", "sign-table"],
      prerequisites: ["polynomials"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3.11 · 121a",
        page: 323,
      },
      reasoning: "case-analysis",
    },
    () => {
      const options: McOption[] = [
        { id: "a", text: L("$(-1,\\ \\frac{1}{6})$", "$(-1,\\ \\frac{1}{6})$"), correct: true },
        { id: "b", text: L("$(-\\infty, -1)\\cup(\\frac{1}{6}, \\infty)$", "$(-\\infty, -1)\\cup(\\frac{1}{6}, \\infty)$"), correct: false },
        { id: "c", text: L("$[-1, \\frac{1}{6}]$", "$[-1, \\frac{1}{6}]$"), correct: false },
        { id: "d", text: L("$(-\\frac{1}{6},\\ 1)$", "$(-\\frac{1}{6},\\ 1)$"), correct: false },
      ];
      return {
        skill: L("Desigualdad cuadrática escondida", "A quadratic inequality in disguise"),
        statement: L(
          `Con $x \\in \\mathbb{R}$, determina el conjunto de verdad de $p(x):\\ (4x + 1)^2 < (1 - 2x)(x + 4)$.`,
          `With $x \\in \\mathbb{R}$, determine the truth set of $p(x):\\ (4x + 1)^2 < (1 - 2x)(x + 4)$.`,
        ),
        answer: { kind: "multiple-choice", options },
        hints: [
          L(
            "No hay atajo: expande ambos lados con cuidado (el producto de la derecha lleva signo negativo).",
            "No shortcut: expand both sides carefully (the right-hand product carries a negative sign).",
          ),
          L(
            "$(4x+1)^2 = 16x^2 + 8x + 1$ y $(1-2x)(x+4) = -2x^2 - 7x + 4$; pasa todo a la izquierda.",
            "$(4x+1)^2 = 16x^2 + 8x + 1$ and $(1-2x)(x+4) = -2x^2 - 7x + 4$; move everything to the left.",
          ),
          L(
            "$18x^2 + 15x - 3 < 0$, es decir $6x^2 + 5x - 1 < 0 = (6x - 1)(x + 1)$: raíces $-1$ y $\\frac{1}{6}$, parábola hacia arriba.",
            "$18x^2 + 15x - 3 < 0$, i.e. $6x^2 + 5x - 1 < 0 = (6x - 1)(x + 1)$: roots $-1$ and $\\frac{1}{6}$, upward parabola.",
          ),
        ],
        answerDisplay: L(
          "$A_{p(x)} = \\left(-1, \\frac{1}{6}\\right)$",
          "$A_{p(x)} = \\left(-1, \\frac{1}{6}\\right)$",
        ),
        solution: [
          step(
            "given",
            "$(4x + 1)^2 < (1 - 2x)(x + 4)$, con $x \\in \\mathbb{R}$.",
            "$(4x + 1)^2 < (1 - 2x)(x + 4)$, with $x \\in \\mathbb{R}$.",
          ),
          step(
            "approach",
            "Expandir y ordenar para reconocer la cuadrática; luego tabla de signos entre las raíces.",
            "Expand and order to recognize the quadratic; then a sign table between the roots.",
          ),
          step(
            "calculation",
            `$16x^2 + 8x + 1 < -2x^2 - 7x + 4$<br>$18x^2 + 15x - 3 < 0 \\Rightarrow 6x^2 + 5x - 1 < 0$<br>$(6x - 1)(x + 1) < 0$<br>Raíces: $x = -1$ y $x = \\frac{1}{6}$; la parábola abre hacia arriba, así que es negativa ENTRE las raíces.`,
            `$16x^2 + 8x + 1 < -2x^2 - 7x + 4$<br>$18x^2 + 15x - 3 < 0 \\Rightarrow 6x^2 + 5x - 1 < 0$<br>$(6x - 1)(x + 1) < 0$<br>Roots: $x = -1$ and $x = \\frac{1}{6}$; the parabola opens upward, so it is negative BETWEEN the roots.`,
          ),
          step(
            "result",
            `El conjunto de verdad es $\\left(-1, \\frac{1}{6}\\right)$, abierto por la desigualdad estricta. Comprobación con $x = 0$: $1 < 4$ ✓.`,
            `The truth set is $\\left(-1, \\frac{1}{6}\\right)$, open due to the strict inequality. Check with $x = 0$: $1 < 4$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 121c — x² + 2|x| + 1 ≥ 0 → ℝ */
  template(
    {
      id: "poly-espol-121c",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "inequalities",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 180,
      tags: ["inequality", "absolute-value", "perfect-square"],
      prerequisites: ["polynomials"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3.11 · 121c",
        page: 323,
      },
      reasoning: "definition-hunting",
    },
    () => {
      const options: McOption[] = [
        { id: "a", text: L("$\\mathbb{R}$", "$\\mathbb{R}$"), correct: true },
        { id: "b", text: L("$[0, \\infty)$", "$[0, \\infty)$"), correct: false },
        { id: "c", text: L("$\\varnothing$", "$\\varnothing$"), correct: false },
        { id: "d", text: L("$\\{-1, 1\\}$", "$\\{-1, 1\\}$"), correct: false },
      ];
      return {
        skill: L("Reconocer el trinomio cuadrado perfecto", "Spot the perfect-square trinomial"),
        statement: L(
          `Con $x \\in \\mathbb{R}$, determina el conjunto de verdad de $p(x):\\ x^2 + 2|x| + 1 \\geq 0$.`,
          `With $x \\in \\mathbb{R}$, determine the truth set of $p(x):\\ x^2 + 2|x| + 1 \\geq 0$.`,
        ),
        answer: { kind: "multiple-choice", options },
        hints: [
          L(
            "Antes de atacar por casos: mira la estructura $x^2 + 2|x| + 1$. ¿Te recuerda a $(a + b)^2$?",
            "Before attacking by cases: look at the structure $x^2 + 2|x| + 1$. Does it remind you of $(a + b)^2$?",
          ),
          L(
            "$x^2 = |x|^2$, así que $x^2 + 2|x| + 1 = (|x| + 1)^2$.",
            "$x^2 = |x|^2$, so $x^2 + 2|x| + 1 = (|x| + 1)^2$.",
          ),
          L(
            "Un cuadrado nunca es negativo; además $|x| + 1 \\geq 1 > 0$, nunca se anula.",
            "A square is never negative; moreover $|x| + 1 \\geq 1 > 0$, it never vanishes.",
          ),
        ],
        answerDisplay: L(
          "$A_{p(x)} = \\mathbb{R}$",
          "$A_{p(x)} = \\mathbb{R}$",
        ),
        solution: [
          step(
            "given",
            "$x^2 + 2|x| + 1 \\geq 0$, con $x \\in \\mathbb{R}$.",
            "$x^2 + 2|x| + 1 \\geq 0$, with $x \\in \\mathbb{R}$.",
          ),
          step(
            "approach",
            "La vía corta: reconocer el cuadrado perfecto en $|x|$ en lugar de separar casos de signo.",
            "The short route: recognize the perfect square in $|x|$ instead of splitting sign cases.",
          ),
          step(
            "calculation",
            `$x^2 = |x|^2$<br>$x^2 + 2|x| + 1 = |x|^2 + 2|x| + 1 = (|x| + 1)^2$<br>$(|x| + 1)^2 \\geq 0$ para todo $x$, y de hecho $|x| + 1 \\geq 1$ así que el cuadrado es $\\geq 1$.`,
            `$x^2 = |x|^2$<br>$x^2 + 2|x| + 1 = |x|^2 + 2|x| + 1 = (|x| + 1)^2$<br>$(|x| + 1)^2 \\geq 0$ for every $x$; in fact $|x| + 1 \\geq 1$, so the square is $\\geq 1$.`,
          ),
          step(
            "result",
            `La desigualdad se cumple para todo número real: $A_{p(x)} = \\mathbb{R}$.`,
            `The inequality holds for every real number: $A_{p(x)} = \\mathbb{R}$.`,
          ),
        ],
      };
    },
  ),

  /* 127d — −x² + x − 1 < 0 → ℝ */
  template(
    {
      id: "poly-espol-127d",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "inequalities",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 180,
      tags: ["inequality", "discriminant", "parabola"],
      prerequisites: ["polynomials"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3.11 · 127d",
        page: 324,
      },
      reasoning: "definition-hunting",
    },
    () => {
      const options: McOption[] = [
        { id: "a", text: L("$\\mathbb{R}$", "$\\mathbb{R}$"), correct: true },
        { id: "b", text: L("$\\varnothing$", "$\\varnothing$"), correct: false },
        { id: "c", text: L("$(-\\infty, -1)\\cup(1, \\infty)$", "$(-\\infty, -1)\\cup(1, \\infty)$"), correct: false },
        { id: "d", text: L("$(-1, 1)$", "$(-1, 1)$"), correct: false },
      ];
      return {
        skill: L("Discriminante y dirección de la parábola", "Discriminant and parabola direction"),
        statement: L(
          `Con $x \\in \\mathbb{R}$, resuelve la inecuación $-x^2 + x - 1 < 0$.`,
          `With $x \\in \\mathbb{R}$, solve the inequality $-x^2 + x - 1 < 0$.`,
        ),
        answer: { kind: "multiple-choice", options },
        hints: [
          L(
            "¿Dónde corta el eje $x$ la parábola $y = -x^2 + x - 1$? Calcula el discriminante.",
            "Where does the parabola $y = -x^2 + x - 1$ cross the $x$-axis? Compute the discriminant.",
          ),
          L(
            "$\\Delta = 1^2 - 4(-1)(-1) = -3 < 0$: no hay raíces reales.",
            "$\\Delta = 1^2 - 4(-1)(-1) = -3 < 0$: there are no real roots.",
          ),
          L(
            "Sin raíces, la parábola no cambia de signo: pruébala en $x = 0$. ¿Es siempre negativa?",
            "With no roots, the parabola never changes sign: test it at $x = 0$. Is it always negative?",
          ),
        ],
        answerDisplay: L(
          "La solución es $\\mathbb{R}$: se cumple para todo $x$ real.",
          "The solution is $\\mathbb{R}$: it holds for every real $x$.",
        ),
        solution: [
          step(
            "given",
            "$-x^2 + x - 1 < 0$, con $x \\in \\mathbb{R}$.",
            "$-x^2 + x - 1 < 0$, with $x \\in \\mathbb{R}$.",
          ),
          step(
            "approach",
            "Completar el cuadrado (o usar el discriminante) para decidir el signo de la expresión sin resolver raíces.",
            "Complete the square (or use the discriminant) to decide the sign of the expression without solving for roots.",
          ),
          step(
            "calculation",
            `$-x^2 + x - 1 = -\\left(x^2 - x + 1\\right) = -\\left(\\left(x - \\frac{1}{2}\\right)^2 + \\frac{3}{4}\\right)$<br>$\\left(x - \\frac{1}{2}\\right)^2 \\geq 0$, así que el paréntesis es $\\geq \\frac{3}{4} > 0$ y con el signo menos la expresión es $\\leq -\\frac{3}{4} < 0$.`,
            `$-x^2 + x - 1 = -\\left(x^2 - x + 1\\right) = -\\left(\\left(x - \\frac{1}{2}\\right)^2 + \\frac{3}{4}\\right)$<br>$\\left(x - \\frac{1}{2}\\right)^2 \\geq 0$, so the bracket is $\\geq \\frac{3}{4} > 0$ and with the minus sign the expression is $\\leq -\\frac{3}{4} < 0$.`,
          ),
          step(
            "result",
            `$-x^2 + x - 1 < 0$ para TODO $x$ real: la solución es $\\mathbb{R}$. (El discriminante $\\Delta = -3 < 0$ con coeficiente principal negativo lo confirma.)`,
            `$-x^2 + x - 1 < 0$ for EVERY real $x$: the solution is $\\mathbb{R}$. (The discriminant $\\Delta = -3 < 0$ with negative leading coefficient confirms it.)`,
          ),
        ],
      };
    },
  ),

  /* ================================================================== */
  /* Hoja de la alumna (DE, oct. 2025) — Sección 1 "Factorizar":         */
  /* ausklammern con exponentes con variable. Transcripción del tutor    */
  /* como fuente de verdad; cada factorización re-derivada con sympy y   */
  /* cada distractor MC verificado como NO equivalente.                  */
  /* ================================================================== */

  /* Hoja alumna · S1.1 — factor común máximo, exponentes distintos. */
  template(
    {
      id: "poly-fact-03",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "factoring",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["factoring", "common-factor", "exponents", "class-sheet"],
      prerequisites: ["factoring"],
      source: {
        sourceId: "alumna-worksheet-2025",
        license: "TUTOR_LICENSED",
        exerciseNumber: "S1 · 1",
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$2u^5\\left(4 - u^4\\right)$`, `$2u^5\\left(4 - u^4\\right)$`), correct: true },
        { id: "b", text: L(`$2u^5\\left(4u - u^4\\right)$`, `$2u^5\\left(4u - u^4\\right)$`), correct: false },
        { id: "c", text: L(`$2u^5\\left(4 - u^5\\right)$`, `$2u^5\\left(4 - u^5\\right)$`), correct: false },
        { id: "d", text: L(`$2u^5\\left(4 - u^9\\right)$`, `$2u^5\\left(4 - u^9\\right)$`), correct: false },
      ];
      return {
        skill: L(
          "Sacar el factor común máximo con exponentes distintos (hoja de clase real)",
          "Pulling out the greatest common factor with different exponents (real class sheet)",
        ),
        statement: L(
          "Factoriza sacando el **factor común máximo**:\n\n$$8u^5 - 2u^9 = \\;?$$",
          "Factor out the **greatest common factor**:\n\n$$8u^5 - 2u^9 = \\;?$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El factor común de potencias de la misma base es el de **menor** exponente: entre $u^5$ y $u^9$, quédate con $u^5$.",
            "The common factor of powers of the same base is the one with the **smaller** exponent: between $u^5$ and $u^9$, keep $u^5$.",
          ),
          L(
            "Del lado numérico, el máximo común divisor de $8$ y $2$ es $2$. Dentro del paréntesis, cada término original se divide entre $2u^5$.",
            "On the numeric side, the greatest common divisor of $8$ and $2$ is $2$. Inside the parentheses, each original term is divided by $2u^5$.",
          ),
          L(
            "Al dividir potencias de la misma base se **restan** los exponentes: $u^9 \\div u^5 = u^{9-5}$.",
            "Dividing powers of the same base **subtracts** the exponents: $u^9 \\div u^5 = u^{9-5}$.",
          ),
        ],
        answerDisplay: L(
          "$8u^5 - 2u^9 = 2u^5\\left(4 - u^4\\right)$",
          "$8u^5 - 2u^9 = 2u^5\\left(4 - u^4\\right)$",
        ),
        solution: [
          step(
            "given",
            "La resta $8u^5 - 2u^9$ (hoja de clase alemana, sección de *Ausklammern* — sacar factor común).",
            "The subtraction $8u^5 - 2u^9$ (German class sheet, *Ausklammern* section — factoring out).",
          ),
          step(
            "approach",
            "Identificar el máximo común divisor numérico y la potencia común de menor exponente, luego dividir cada término entre ese factor.",
            "Identify the numeric greatest common divisor and the common power with the smaller exponent, then divide each term by that factor.",
          ),
          step(
            "calculation",
            "$\\text{mcd}(8, 2) = 2$ y la potencia común es $u^5$ (el menor exponente).<br>$\\dfrac{8u^5}{2u^5} = 4$ y $\\dfrac{2u^9}{2u^5} = u^{9-5} = u^4$.<br>Por lo tanto $8u^5 - 2u^9 = 2u^5\\left(4 - u^4\\right)$.<br>Control expandiendo: $2u^5 \\cdot 4 = 8u^5$ y $2u^5 \\cdot u^4 = 2u^9$ ✓",
            "$\\gcd(8, 2) = 2$ and the common power is $u^5$ (the smaller exponent).<br>$\\dfrac{8u^5}{2u^5} = 4$ and $\\dfrac{2u^9}{2u^5} = u^{9-5} = u^4$.<br>So $8u^5 - 2u^9 = 2u^5\\left(4 - u^4\\right)$.<br>Check by expanding: $2u^5 \\cdot 4 = 8u^5$ and $2u^5 \\cdot u^4 = 2u^9$ ✓",
          ),
          step(
            "result",
            "$8u^5 - 2u^9 = 2u^5\\left(4 - u^4\\right)$. El paréntesis $\\left(4 - u^4\\right)$ ya no admite factor común: la factorización está completa.",
            "$8u^5 - 2u^9 = 2u^5\\left(4 - u^4\\right)$. The parenthesis $\\left(4 - u^4\\right)$ shares no further common factor: the factoring is complete.",
          ),
        ],
      };
    },
  ),

  /* Hoja alumna · S1.2 — factor común con exponente literal n. */
  template(
    {
      id: "poly-fact-04",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "factoring",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["factoring", "common-factor", "variable-exponents", "class-sheet"],
      prerequisites: ["factoring"],
      source: {
        sourceId: "alumna-worksheet-2025",
        license: "TUTOR_LICENSED",
        exerciseNumber: "S1 · 2",
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$x^{n}\\left(1 - x\\right)$`, `$x^{n}\\left(1 - x\\right)$`), correct: true },
        { id: "b", text: L(`$x^{n}\\left(1 + x\\right)$`, `$x^{n}\\left(1 + x\\right)$`), correct: false },
        { id: "c", text: L(`$x^{n}\\left(x - 1\\right)$`, `$x^{n}\\left(x - 1\\right)$`), correct: false },
        { id: "d", text: L(`$x^{n}\\left(1 - x^{n+1}\\right)$`, `$x^{n}\\left(1 - x^{n+1}\\right)$`), correct: false },
      ];
      return {
        skill: L(
          "Factor común cuando el exponente es una letra (hoja de clase real)",
          "Common factor when the exponent is a letter (real class sheet)",
        ),
        statement: L(
          "Factoriza sacando el **factor común máximo** ($n$ es un natural):\n\n$$x^n - x^{n+1} = \\;?$$",
          "Factor out the **greatest common factor** ($n$ is a natural number):\n\n$$x^n - x^{n+1} = \\;?$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Compara los exponentes: $n$ contra $n + 1$. El menor es $n$, así que el factor común es $x^n$.",
            "Compare the exponents: $n$ vs. $n + 1$. The smaller one is $n$, so the common factor is $x^n$.",
          ),
          L(
            "Al dividir $x^n$ entre $x^n$ el resultado es $1$ — ese $1$ **no desaparece**, abre el paréntesis.",
            "Dividing $x^n$ by $x^n$ gives $1$ — that $1$ does **not** vanish, it opens the parentheses.",
          ),
          L(
            "Para el segundo término: $x^{n+1} \\div x^{n} = x^{(n+1)-n} = x$. Cuida también el signo.",
            "For the second term: $x^{n+1} \\div x^{n} = x^{(n+1)-n} = x$. Mind the sign as well.",
          ),
        ],
        answerDisplay: L(
          "$x^n - x^{n+1} = x^{n}\\left(1 - x\\right)$",
          "$x^n - x^{n+1} = x^{n}\\left(1 - x\\right)$",
        ),
        solution: [
          step(
            "given",
            "La resta $x^n - x^{n+1}$ con exponentes literales ($n \\in \\mathbb{N}$).",
            "The subtraction $x^n - x^{n+1}$ with literal exponents ($n \\in \\mathbb{N}$).",
          ),
          step(
            "approach",
            "El factor común de $x^n$ y $x^{n+1}$ es $x^{\\min(n,\\ n+1)} = x^n$; cada término se divide entre $x^n$.",
            "The common factor of $x^n$ and $x^{n+1}$ is $x^{\\min(n,\\ n+1)} = x^n$; each term is divided by $x^n$.",
          ),
          step(
            "calculation",
            "$\\dfrac{x^n}{x^n} = 1$ y $\\dfrac{x^{n+1}}{x^n} = x^{(n+1)-n} = x$.<br>Por lo tanto $x^n - x^{n+1} = x^{n}\\left(1 - x\\right)$.<br>Control con $n = 3$: $x^3 - x^4 = x^3(1 - x)$ ✓",
            "$\\dfrac{x^n}{x^n} = 1$ and $\\dfrac{x^{n+1}}{x^n} = x^{(n+1)-n} = x$.<br>So $x^n - x^{n+1} = x^{n}\\left(1 - x\\right)$.<br>Check with $n = 3$: $x^3 - x^4 = x^3(1 - x)$ ✓",
          ),
          step(
            "result",
            "$x^n - x^{n+1} = x^{n}\\left(1 - x\\right)$: el exponente literal se maneja igual que uno numérico, comparando cuál es menor.",
            "$x^n - x^{n+1} = x^{n}\\left(1 - x\\right)$: a literal exponent is handled exactly like a numeric one — compare which is smaller.",
          ),
        ],
      };
    },
  ),

  /* Hoja alumna · S1.3 — factor común + diferencia de cuadrados. */
  template(
    {
      id: "poly-fact-05",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "factoring",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["factoring", "common-factor", "difference-of-squares", "variable-exponents", "class-sheet"],
      prerequisites: ["factoring"],
      source: {
        sourceId: "alumna-worksheet-2025",
        license: "TUTOR_LICENSED",
        exerciseNumber: "S1 · 3",
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$z^{m-2}\\left(z - 1\\right)\\left(z + 1\\right)$`, `$z^{m-2}\\left(z - 1\\right)\\left(z + 1\\right)$`), correct: true },
        { id: "b", text: L(`$z^{m-2}\\left(z^2 + 1\\right)$`, `$z^{m-2}\\left(z^2 + 1\\right)$`), correct: false },
        { id: "c", text: L(`$z^{m-2}\\left(z - 1\\right)$`, `$z^{m-2}\\left(z - 1\\right)$`), correct: false },
        { id: "d", text: L(`$z^{m-2}\\left(1 - z^2\\right)$`, `$z^{m-2}\\left(1 - z^2\\right)$`), correct: false },
      ];
      return {
        skill: L(
          "Factor común literal y diferencia de cuadrados en cadena (hoja de clase real)",
          "Literal common factor plus a chained difference of squares (real class sheet)",
        ),
        statement: L(
          "Factoriza por completo ($m$ es un natural, $m \\ge 2$):\n\n$$z^m - z^{m-2} = \\;?$$",
          "Factor completely ($m$ is a natural number, $m \\ge 2$):\n\n$$z^m - z^{m-2} = \\;?$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El menor exponente es $m - 2$: saca $z^{m-2}$ de factor común.",
            "The smaller exponent is $m - 2$: pull out $z^{m-2}$ as the common factor.",
          ),
          L(
            "Dentro del paréntesis queda $z^2 - 1$ — y eso es una **diferencia de cuadrados**.",
            "Inside the parentheses you are left with $z^2 - 1$ — and that is a **difference of squares**.",
          ),
          L(
            "Una factorización \"por completo\" exige abrir la diferencia de cuadrados: $z^2 - 1 = (z - 1)(z + 1)$.",
            "Factoring \"completely\" requires opening the difference of squares: $z^2 - 1 = (z - 1)(z + 1)$.",
          ),
        ],
        answerDisplay: L(
          "$z^m - z^{m-2} = z^{m-2}\\left(z^2 - 1\\right) = z^{m-2}\\left(z - 1\\right)\\left(z + 1\\right)$",
          "$z^m - z^{m-2} = z^{m-2}\\left(z^2 - 1\\right) = z^{m-2}\\left(z - 1\\right)\\left(z + 1\\right)$",
        ),
        solution: [
          step(
            "given",
            "La resta $z^m - z^{m-2}$ con $m \\in \\mathbb{N}$, $m \\ge 2$.",
            "The subtraction $z^m - z^{m-2}$ with $m \\in \\mathbb{N}$, $m \\ge 2$.",
          ),
          step(
            "approach",
            "Dos pasos encadenados: primero el factor común $z^{m-2}$, después la diferencia de cuadrados que queda dentro.",
            "Two chained steps: first the common factor $z^{m-2}$, then the difference of squares left inside.",
          ),
          step(
            "calculation",
            "$\\dfrac{z^m}{z^{m-2}} = z^{m-(m-2)} = z^2$ y $\\dfrac{z^{m-2}}{z^{m-2}} = 1$.<br>$z^m - z^{m-2} = z^{m-2}\\left(z^2 - 1\\right) = z^{m-2}\\left(z - 1\\right)\\left(z + 1\\right)$.<br>Control con $m = 4$: $z^4 - z^2 = z^2(z^2 - 1) = z^2(z-1)(z+1)$ ✓",
            "$\\dfrac{z^m}{z^{m-2}} = z^{m-(m-2)} = z^2$ and $\\dfrac{z^{m-2}}{z^{m-2}} = 1$.<br>$z^m - z^{m-2} = z^{m-2}\\left(z^2 - 1\\right) = z^{m-2}\\left(z - 1\\right)\\left(z + 1\\right)$.<br>Check with $m = 4$: $z^4 - z^2 = z^2(z^2 - 1) = z^2(z-1)(z+1)$ ✓",
          ),
          step(
            "result",
            "$z^m - z^{m-2} = z^{m-2}\\left(z - 1\\right)\\left(z + 1\\right)$. La opción con $\\left(z^2 - 1\\right)$ sin abrir está a medio camino: la hoja pide factorizar por completo.",
            "$z^m - z^{m-2} = z^{m-2}\\left(z - 1\\right)\\left(z + 1\\right)$. The option keeping $\\left(z^2 - 1\\right)$ unopened is only halfway: the sheet asks for a complete factorization.",
          ),
        ],
      };
    },
  ),

  /* Hoja alumna · S1.4 — mcd numérico + resta de exponentes literales. */
  template(
    {
      id: "poly-fact-06",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "factoring",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["factoring", "common-factor", "variable-exponents", "exponent-arithmetic", "class-sheet"],
      prerequisites: ["factoring"],
      source: {
        sourceId: "alumna-worksheet-2025",
        license: "TUTOR_LICENSED",
        exerciseNumber: "S1 · 4",
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$4a^{n-3}\\left(2 + 3a^{2n+1}\\right)$`, `$4a^{n-3}\\left(2 + 3a^{2n+1}\\right)$`), correct: true },
        { id: "b", text: L(`$4a^{n-3}\\left(2 + 3a^{2n-1}\\right)$`, `$4a^{n-3}\\left(2 + 3a^{2n-1}\\right)$`), correct: false },
        { id: "c", text: L(`$4a^{n-3}\\left(2 + 3a^{3n-2}\\right)$`, `$4a^{n-3}\\left(2 + 3a^{3n-2}\\right)$`), correct: false },
        { id: "d", text: L(`$4a^{n-3}\\left(2 + 3a^{2n}\\right)$`, `$4a^{n-3}\\left(2 + 3a^{2n}\\right)$`), correct: false },
      ];
      return {
        skill: L(
          "Factor común con aritmética de exponentes literales (hoja de clase real)",
          "Common factor with literal-exponent arithmetic (real class sheet)",
        ),
        statement: L(
          "Factoriza sacando el **factor común máximo** ($n$ es un natural, $n \\ge 3$):\n\n$$8a^{n-3} + 12a^{3n-2} = \\;?$$",
          "Factor out the **greatest common factor** ($n$ is a natural number, $n \\ge 3$):\n\n$$8a^{n-3} + 12a^{3n-2} = \\;?$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Coeficientes: $\\text{mcd}(8, 12) = 4$. Exponentes: compara $n - 3$ con $3n - 2$ — su diferencia es $2n + 1 > 0$, así que el menor es $n - 3$.",
            "Coefficients: $\\gcd(8, 12) = 4$. Exponents: compare $n - 3$ with $3n - 2$ — their difference is $2n + 1 > 0$, so the smaller one is $n - 3$.",
          ),
          L(
            "Divide el segundo término entre $4a^{n-3}$: primero $12 \\div 4 = 3$, después **resta** los exponentes: $(3n - 2) - (n - 3)$.",
            "Divide the second term by $4a^{n-3}$: first $12 \\div 4 = 3$, then **subtract** the exponents: $(3n - 2) - (n - 3)$.",
          ),
          L(
            "Resuelve la resta de exponentes con paréntesis: $(3n - 2) - (n - 3) = 3n - 2 - n + 3$.",
            "Do the exponent subtraction with care: $(3n - 2) - (n - 3) = 3n - 2 - n + 3$.",
          ),
        ],
        answerDisplay: L(
          "$8a^{n-3} + 12a^{3n-2} = 4a^{n-3}\\left(2 + 3a^{2n+1}\\right)$",
          "$8a^{n-3} + 12a^{3n-2} = 4a^{n-3}\\left(2 + 3a^{2n+1}\\right)$",
        ),
        solution: [
          step(
            "given",
            "La suma $8a^{n-3} + 12a^{3n-2}$ con exponentes literales ($n \\in \\mathbb{N}$, $n \\ge 3$).",
            "The sum $8a^{n-3} + 12a^{3n-2}$ with literal exponents ($n \\in \\mathbb{N}$, $n \\ge 3$).",
          ),
          step(
            "approach",
            "Factor común máximo: coeficiente $\\text{mcd}(8,12) = 4$ y potencia $a$ con el menor exponente. Como $3n - 2 - (n - 3) = 2n + 1 > 0$, el menor exponente es $n - 3$.",
            "Greatest common factor: coefficient $\\gcd(8,12) = 4$ and the power $a$ with the smaller exponent. Since $3n - 2 - (n - 3) = 2n + 1 > 0$, the smaller exponent is $n - 3$.",
          ),
          step(
            "calculation",
            "$\\dfrac{8a^{n-3}}{4a^{n-3}} = 2$;<br>$\\dfrac{12a^{3n-2}}{4a^{n-3}} = 3a^{(3n-2)-(n-3)} = 3a^{2n+1}$.<br>Por lo tanto $8a^{n-3} + 12a^{3n-2} = 4a^{n-3}\\left(2 + 3a^{2n+1}\\right)$.<br>Control con $n = 3$: $8a^0 + 12a^7 = 4a^0\\left(2 + 3a^7\\right) = 8 + 12a^7$ ✓",
            "$\\dfrac{8a^{n-3}}{4a^{n-3}} = 2$;<br>$\\dfrac{12a^{3n-2}}{4a^{n-3}} = 3a^{(3n-2)-(n-3)} = 3a^{2n+1}$.<br>So $8a^{n-3} + 12a^{3n-2} = 4a^{n-3}\\left(2 + 3a^{2n+1}\\right)$.<br>Check with $n = 3$: $8a^0 + 12a^7 = 4a^0\\left(2 + 3a^7\\right) = 8 + 12a^7$ ✓",
          ),
          step(
            "result",
            "$8a^{n-3} + 12a^{3n-2} = 4a^{n-3}\\left(2 + 3a^{2n+1}\\right)$. El paso delicado es la resta de exponentes literales: $(3n-2)-(n-3) = 2n+1$, no $2n-1$.",
            "$8a^{n-3} + 12a^{3n-2} = 4a^{n-3}\\left(2 + 3a^{2n+1}\\right)$. The delicate step is the literal-exponent subtraction: $(3n-2)-(n-3) = 2n+1$, not $2n-1$.",
          ),
        ],
      };
    },
  ),

];
