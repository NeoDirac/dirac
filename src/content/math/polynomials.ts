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

  /* ================================================================== */
  /* Curated — ESPOL Fundamentos, EDICIÓN DIGITAL (TUTOR_LICENSED).      */
  /* Chapter 2 «Ejercicios propuestos», pp. 230-232 (PDF 263-265).      */
  /* Tutor's brief: the most difficult / integrative ones.              */
  /* Every answer double-verified: printed key pp. 938-939 + sympy      */
  /* (download/verify_espol_ch2.py, 41/41 checks).                       */
  /* ================================================================== */

  /* 34e — x³−7x+6 → (x−1)(x+3)(x−2). Key: (x-1)(x+3)(x-2). */
  template(
    {
      id: "poly-espol-ch2-34e",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "factoring",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 150,
      tags: ["factoring", "cubic", "rational-roots", "ruffini"],
      prerequisites: ["special-products"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 34e",
        page: 230,
      },
      reasoning: "multi-concept",
    },
    () => ({
      skill: L("Factorización de una cúbica por raíces racionales", "Factoring a cubic via rational roots"),
      statement: L(
        "Descompón como producto de tres factores: $x^{3} - 7x + 6$.",
        "Decompose as a product of three factors: $x^{3} - 7x + 6$.",
      ),
      answer: {
        kind: "expression",
        accepted: ["(x-1)(x+3)(x-2)", "(x-1)(x-2)(x+3)"],
        variables: ["x"],
      },
      hints: [
        L(
          "Prueba raíces racionales entre los divisores del término independiente: $\\pm 1, \\pm 2, \\pm 3, \\pm 6$.",
          "Try rational roots among the divisors of the constant term: $\\pm 1, \\pm 2, \\pm 3, \\pm 6$.",
        ),
        L(
          "Con $x = 1$: $1 - 7 + 6 = 0$, así que $(x - 1)$ divide al polinomio. Divide (Ruffini por $1$).",
          "At $x = 1$: $1 - 7 + 6 = 0$, so $(x - 1)$ divides the polynomial. Divide (synthetic division by $1$).",
        ),
        L(
          "El cociente es $x^{2} + x - 6$: factorízalo buscando dos números que multipliquen $-6$ y sumen $1$.",
          "The quotient is $x^{2} + x - 6$: factor it by looking for two numbers that multiply to $-6$ and add to $1$.",
        ),
      ],
      answerDisplay: L("$x^{3} - 7x + 6 = (x-1)(x+3)(x-2)$", "$x^{3} - 7x + 6 = (x-1)(x+3)(x-2)$"),
      solution: [
        step(
          "given",
          "El polinomio $x^{3} - 7x + 6$ (grado 3, sin término cuadrático).",
          "The polynomial $x^{3} - 7x + 6$ (degree 3, no quadratic term).",
        ),
        step(
          "approach",
          "Raíz racional probable entre los divisores de 6; con una raíz, Ruffini baja el grado y el cociente cuadrático se factoriza a ojo.",
          "A rational root among the divisors of 6; with one root, synthetic division lowers the degree and the quadratic quotient factors by inspection.",
        ),
        step(
          "calculation",
          "$x = 1$: $1 - 7 + 6 = 0$ ✓ raíz.<br>Ruffini por $1$: $x^{3} - 7x + 6 = (x - 1)\\left(x^{2} + x - 6\\right)$.<br>$x^{2} + x - 6 = (x + 3)(x - 2)$ (producto $-6$, suma $1$).",
          "$x = 1$: $1 - 7 + 6 = 0$ ✓ a root.<br>Synthetic division by $1$: $x^{3} - 7x + 6 = (x - 1)\\left(x^{2} + x - 6\\right)$.<br>$x^{2} + x - 6 = (x + 3)(x - 2)$ (product $-6$, sum $1$).",
        ),
        step(
          "result",
          "$(x-1)(x+3)(x-2)$, con raíces $1, -3, 2$. Verificación expandiendo: $(x-1)(x^{2}+x-6) = x^{3} + x^{2} - 6x - x^{2} - x + 6 = x^{3} - 7x + 6$ ✓.",
          "$(x-1)(x+3)(x-2)$, with roots $1, -3, 2$. Check by expanding: $(x-1)(x^{2}+x-6) = x^{3} - 7x + 6$ ✓.",
        ),
      ],
    }),
  ),

  /* 36a — a²b²(b−a)+b²c²(c−b)+a²c²(a−c) → (a−b)(b−c)(c−a)(ab+bc+ca). Key: idem. */
  template(
    {
      id: "poly-espol-ch2-36a",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "factoring",
      difficulty: "hard",
      questionType: "expression",
      estimatedTimeSec: 300,
      tags: ["factoring", "cyclic", "symmetry", "four-factors"],
      prerequisites: ["special-products"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 36a",
        page: 232,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L("Factor cíclico de grado 5 (anulación por pares)", "Degree-5 cyclic factor (vanishing by pairs)"),
      statement: L(
        "Descompón en cuatro factores: $a^{2}b^{2}(b - a) + b^{2}c^{2}(c - b) + a^{2}c^{2}(a - c)$.",
        "Decompose into four factors: $a^{2}b^{2}(b - a) + b^{2}c^{2}(c - b) + a^{2}c^{2}(a - c)$.",
      ),
      answer: {
        kind: "expression",
        accepted: ["(a-b)(b-c)(c-a)(a*b+b*c+a*c)", "(a-b)(b-c)(c-a)(ab+bc+ca)"],
        variables: ["a", "b", "c"],
      },
      hints: [
        L(
          "Evalúa la expresión con $a = b$: los tres términos se cancelan. Eso prueba que $(a-b)$ es factor. ¿Qué otros pares dan cero?",
          "Evaluate the expression at $a = b$: the three terms cancel out. That proves $(a-b)$ is a factor. Which other pairs give zero?",
        ),
        L(
          "Por la misma simetría cíclica, $(b-c)$ y $(c-a)$ también son factores: son tres factores de grado 1 y la expresión tiene grado 5, así que queda un factor $F$ de grado 2, simétrico.",
          "By the same cyclic symmetry, $(b-c)$ and $(c-a)$ are factors too: that is three degree-1 factors while the expression has degree 5, so a degree-2 factor $F$ remains, and it is symmetric.",
        ),
        L(
          "Prueba $F = k(ab + bc + ca)$ y calcula $k$ evaluando en un punto cómodo, por ejemplo $(a,b,c) = (1, 2, 3)$.",
          "Try $F = k(ab + bc + ca)$ and find $k$ by evaluating at a convenient point, e.g. $(a,b,c) = (1, 2, 3)$.",
        ),
      ],
      answerDisplay: L(
        "$a^{2}b^{2}(b - a) + b^{2}c^{2}(c - b) + a^{2}c^{2}(a - c) = (a-b)(b-c)(c-a)(ab+bc+ca)$",
        "$a^{2}b^{2}(b - a) + b^{2}c^{2}(c - b) + a^{2}c^{2}(a - c) = (a-b)(b-c)(c-a)(ab+bc+ca)$",
      ),
      solution: [
        step(
          "given",
          "$E = a^{2}b^{2}(b - a) + b^{2}c^{2}(c - b) + a^{2}c^{2}(a - c)$, grado 5, cíclica en $(a, b, c)$.",
          "$E = a^{2}b^{2}(b - a) + b^{2}c^{2}(c - b) + a^{2}c^{2}(a - c)$, degree 5, cyclic in $(a, b, c)$.",
        ),
        step(
          "approach",
          "Detectar factores por anulación: si al igualar dos variables la expresión se hace 0, su diferencia es factor. La estructura cíclica regala tres factores lineales; el resto es un factor simétrico de grado 2.",
          "Detect factors by vanishing: if setting two variables equal makes the expression 0, their difference is a factor. The cyclic structure hands you three linear factors; the rest is a symmetric degree-2 factor.",
        ),
        step(
          "calculation",
          "Con $a = b$: $a^{4}(0) + a^{2}c^{2}(c - a) + a^{2}c^{2}(a - c) = 0$ ✓ → $(a-b)$ es factor; ídem $(b-c)$, $(c-a)$.<br>$E = (a-b)(b-c)(c-a)\\,F$, con $F$ simétrico de grado 2 → candidato $k(ab + bc + ca)$.<br>Con $(a,b,c) = (1,2,3)$: $E = 1^{2}2^{2}(2-1) + 2^{2}3^{2}(3-2) + 1^{2}3^{2}(1-3) = 4 + 36 - 18 = 22$.<br>$(a-b)(b-c)(c-a) = (-1)(-1)(2) = 2$, y $ab + bc + ca = 2 + 6 + 3 = 11$, así que $k = \\frac{22}{2 \\cdot 11} = 1$.",
          "At $a = b$: $a^{4}(0) + a^{2}c^{2}(c - a) + a^{2}c^{2}(a - c) = 0$ ✓ → $(a-b)$ is a factor; likewise $(b-c)$, $(c-a)$.<br>$E = (a-b)(b-c)(c-a)\\,F$, with $F$ a symmetric degree-2 factor → candidate $k(ab + bc + ca)$.<br>At $(a,b,c) = (1,2,3)$: $E = 1^{2}2^{2}(2-1) + 2^{2}3^{2}(3-2) + 1^{2}3^{2}(1-3) = 4 + 36 - 18 = 22$.<br>$(a-b)(b-c)(c-a) = (-1)(-1)(2) = 2$, and $ab + bc + ca = 2 + 6 + 3 = 11$, so $k = \\frac{22}{2 \\cdot 11} = 1$.",
        ),
        step(
          "result",
          "$E = (a-b)(b-c)(c-a)(ab+bc+ca)$. Verificación con $(a,b,c) = (0,1,2)$: $E = 0 + 1·4·1 + 0 = 4$ y $(0-1)(1-2)(2-0)(0 + 2 + 0) = (-1)(-1)(2)(2) = 4$ ✓.",
          "$E = (a-b)(b-c)(c-a)(ab+bc+ca)$. Check at $(a,b,c) = (0,1,2)$: $E = 0 + 1·4·1 + 0 = 4$ and $(0-1)(1-2)(2-0)(0 + 2 + 0) = (-1)(-1)(2)(2) = 4$ ✓.",
        ),
      ],
    }),
  ),

  /* 36b — (a−b)³−(a−c)³+(b−c)³ → 3(a−b)(b−c)(c−a). Key: idem. */
  template(
    {
      id: "poly-espol-ch2-36b",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "factoring",
      difficulty: "hard",
      questionType: "expression",
      estimatedTimeSec: 240,
      tags: ["factoring", "substitution", "cubic-expansion"],
      prerequisites: ["special-products"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 36b",
        page: 232,
      },
      reasoning: "multi-concept",
    },
    () => ({
      skill: L("Cúbica cíclica por sustitución u = a−b, v = b−c", "Cyclic cubic via u = a−b, v = b−c"),
      statement: L(
        "Descompón en cuatro factores: $(a - b)^{3} - (a - c)^{3} + (b - c)^{3}$.",
        "Decompose into four factors: $(a - b)^{3} - (a - c)^{3} + (b - c)^{3}$.",
      ),
      answer: {
        kind: "expression",
        accepted: ["3(a-b)(b-c)(c-a)", "3*(a-b)*(b-c)*(c-a)"],
        variables: ["a", "b", "c"],
      },
      hints: [
        L(
          "Nombra $u = a - b$ y $v = b - c$. ¿Cuánto vale entonces $a - c$ en función de $u$ y $v$?",
          "Name $u = a - b$ and $v = b - c$. How much is $a - c$ in terms of $u$ and $v$?",
        ),
        L(
          "$a - c = (a - b) + (b - c) = u + v$, así que la expresión es $u^{3} - (u+v)^{3} + v^{3}$.",
          "$a - c = (a - b) + (b - c) = u + v$, so the expression is $u^{3} - (u+v)^{3} + v^{3}$.",
        ),
        L(
          "Desarrolla $(u+v)^{3}$: los términos $u^{3}$ y $v^{3}$ se cancelan y queda $-3uv(\\dots)$.",
          "Expand $(u+v)^{3}$: the $u^{3}$ and $v^{3}$ terms cancel and what remains is $-3uv(\\dots)$.",
        ),
      ],
      answerDisplay: L(
        "$(a - b)^{3} - (a - c)^{3} + (b - c)^{3} = 3(a-b)(b-c)(c-a)$",
        "$(a - b)^{3} - (a - c)^{3} + (b - c)^{3} = 3(a-b)(b-c)(c-a)$",
      ),
      solution: [
        step(
          "given",
          "$E = (a - b)^{3} - (a - c)^{3} + (b - c)^{3}$, grado 3.",
          "$E = (a - b)^{3} - (a - c)^{3} + (b - c)^{3}$, degree 3.",
        ),
        step(
          "approach",
          "Sustitución que linealiza la estructura: $u = a - b$, $v = b - c$ ⇒ $a - c = u + v$. La expresión se vuelve simétrica en $u, v$ y se abre con el binomio de Newton.",
          "A substitution that linearizes the structure: $u = a - b$, $v = b - c$ ⇒ $a - c = u + v$. The expression becomes symmetric in $u, v$ and opens with the binomial theorem.",
        ),
        step(
          "calculation",
          "$E = u^{3} - (u + v)^{3} + v^{3}$<br>$= u^{3} - \\left(u^{3} + 3u^{2}v + 3uv^{2} + v^{3}\\right) + v^{3}$<br>$= -3u^{2}v - 3uv^{2} = -3uv(u + v)$<br>De vuelta con $u = a-b$, $v = b-c$, $u + v = a - c$: $E = -3(a-b)(b-c)(a-c) = 3(a-b)(b-c)(c-a)$.",
          "$E = u^{3} - (u + v)^{3} + v^{3}$<br>$= u^{3} - \\left(u^{3} + 3u^{2}v + 3uv^{2} + v^{3}\\right) + v^{3}$<br>$= -3u^{2}v - 3uv^{2} = -3uv(u + v)$<br>Back with $u = a-b$, $v = b-c$, $u + v = a - c$: $E = -3(a-b)(b-c)(a-c) = 3(a-b)(b-c)(c-a)$.",
        ),
        step(
          "result",
          "$E = 3(a-b)(b-c)(c-a)$ (el «cuarto factor» es la constante 3). Verificación con $(a,b,c) = (1,2,3)$: $E = (-1)^{3} - (-2)^{3} + (-1)^{3} = -1 + 8 - 1 = 6$ y $3(-1)(-1)(2) = 6$ ✓.",
          "$E = 3(a-b)(b-c)(c-a)$ (the “fourth factor” is the constant 3). Check at $(a,b,c) = (1,2,3)$: $E = (-1)^{3} - (-2)^{3} + (-1)^{3} = -1 + 8 - 1 = 6$ and $3(-1)(-1)(2) = 6$ ✓.",
        ),
      ],
    }),
  ),

  /* 36d — 3x⁴−10x³+10x−3 → (x+1)(x−1)(x−3)(3x−1). Key: idem. */
  template(
    {
      id: "poly-espol-ch2-36d",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "factoring",
      difficulty: "hard",
      questionType: "expression",
      estimatedTimeSec: 270,
      tags: ["factoring", "quartic", "rational-roots"],
      prerequisites: ["special-products"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 36d",
        page: 232,
      },
      reasoning: "multi-concept",
    },
    () => ({
      skill: L("Cuártica completa en cuatro factores lineales", "Full quartic into four linear factors"),
      statement: L(
        "Descompón en cuatro factores: $3x^{4} - 10x^{3} + 10x - 3$.",
        "Decompose into four factors: $3x^{4} - 10x^{3} + 10x - 3$.",
      ),
      answer: {
        kind: "expression",
        accepted: ["(x+1)(x-1)(x-3)(3x-1)", "(x-1)(x+1)(3x-1)(x-3)"],
        variables: ["x"],
      },
      hints: [
        L(
          "Busca raíces racionales: divisores de 3 ($\\pm 1, \\pm 3$) divididos por divisores del coeficiente principal 3 — prueba también $\\pm\\frac{1}{3}$.",
          "Hunt rational roots: divisors of 3 ($\\pm 1, \\pm 3$) over divisors of the leading coefficient 3 — try $\\pm\\frac{1}{3}$ as well.",
        ),
        L(
          "$x = 1$ y $x = -1$ son raíces: saca $(x^{2} - 1)$ de golpe y quédate con una cuadrática.",
          "$x = 1$ and $x = -1$ are roots: pull out $(x^{2} - 1)$ in one go and you are left with a quadratic.",
        ),
        L(
          "La cuadrática restante es $3x^{2} - 10x + 3$: resuélvela con el discriminante $\\Delta = 100 - 36$.",
          "The remaining quadratic is $3x^{2} - 10x + 3$: solve it with the discriminant $\\Delta = 100 - 36$.",
        ),
      ],
      answerDisplay: L(
        "$3x^{4} - 10x^{3} + 10x - 3 = (x+1)(x-1)(x-3)(3x-1)$",
        "$3x^{4} - 10x^{3} + 10x - 3 = (x+1)(x-1)(x-3)(3x-1)$",
      ),
      solution: [
        step(
          "given",
          "El polinomio $3x^{4} - 10x^{3} + 10x - 3$ (grado 4, sin término cuadrático).",
          "The polynomial $3x^{4} - 10x^{3} + 10x - 3$ (degree 4, no quadratic term).",
        ),
        step(
          "approach",
          "Raíces racionales candidates: $\\pm 1, \\pm 3, \\pm\\frac{1}{3}$; cada raíz hallada baja el grado. Con dos raíces se extrae $(x^{2}-1)$ de una vez.",
          "Candidate rational roots: $\\pm 1, \\pm 3, \\pm\\frac{1}{3}$; each root found lowers the degree. With two roots, $(x^{2}-1)$ comes out in one shot.",
        ),
        step(
          "calculation",
          "$x = 1$: $3 - 10 + 10 - 3 = 0$ ✓; $x = -1$: $3 + 10 - 10 - 3 = 0$ ✓.<br>$3x^{4} - 10x^{3} + 10x - 3 = (x^{2}-1)(3x^{2} - 10x + 3)$.<br>$\\Delta = 100 - 4·3·3 = 64$ → raíces $\\frac{10 \\pm 8}{6} = 3, \\frac{1}{3}$ → $3x^{2} - 10x + 3 = (x - 3)(3x - 1)$.",
          "$x = 1$: $3 - 10 + 10 - 3 = 0$ ✓; $x = -1$: $3 + 10 - 10 - 3 = 0$ ✓.<br>$3x^{4} - 10x^{3} + 10x - 3 = (x^{2}-1)(3x^{2} - 10x + 3)$.<br>$\\Delta = 100 - 4·3·3 = 64$ → roots $\\frac{10 \\pm 8}{6} = 3, \\frac{1}{3}$ → $3x^{2} - 10x + 3 = (x - 3)(3x - 1)$.",
        ),
        step(
          "result",
          "$(x+1)(x-1)(x-3)(3x-1)$, raíces $1, -1, 3, \\frac{1}{3}$. Doble verificación: el producto de las cuatro raíces es $1 \\cdot (-1) \\cdot 3 \\cdot \\frac{1}{3} = -1 = \\frac{-3}{3}$ (constante / coeficiente principal) ✓, y con $x = 2$: original $48 - 80 + 20 - 3 = -15$, factorizado $3 \\cdot 1 \\cdot (-1)(-1)(-5) = -15$ ✓.",
          "$(x+1)(x-1)(x-3)(3x-1)$, roots $1, -1, 3, \\frac{1}{3}$. Check: at $x = 2$: original $48 - 80 + 20 - 3 = -15$; factored $3·1·(-1)(-1)(-5) = -15$ ✓.",
        ),
      ],
    }),
  ),

  /* 36e — (3x−6)(x²−1)−(5x−10)(x−1)² → −2(x−2)(x−4)(x−1). Key: idem. */
  template(
    {
      id: "poly-espol-ch2-36e",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "factoring",
      difficulty: "hard",
      questionType: "expression",
      estimatedTimeSec: 210,
      tags: ["factoring", "common-factor", "grouping"],
      prerequisites: ["special-products"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 36e",
        page: 232,
      },
      reasoning: "multi-concept",
    },
    () => ({
      skill: L("Factor común antes de expandir (no abras el paréntesis)", "Common factor before expanding (do not open the parentheses)"),
      statement: L(
        "Descompón en cuatro factores: $(3x - 6)(x^{2} - 1) - (5x - 10)(x - 1)^{2}$.",
        "Decompose into four factors: $(3x - 6)(x^{2} - 1) - (5x - 10)(x - 1)^{2}$.",
      ),
      answer: {
        kind: "expression",
        accepted: ["-2(x-2)(x-4)(x-1)", "-2(x-1)(x-2)(x-4)", "2(2-x)(x-4)(x-1)"],
        variables: ["x"],
      },
      hints: [
        L(
          "No expandas: escribe cada bloque factorizado. $3x - 6 = 3(x - 2)$, $x^{2} - 1 = (x-1)(x+1)$, $5x - 10 = 5(x - 2)$.",
          "Do not expand: write each block factored. $3x - 6 = 3(x - 2)$, $x^{2} - 1 = (x-1)(x+1)$, $5x - 10 = 5(x - 2)$.",
        ),
        L(
          "La expresión queda $3(x-2)(x-1)(x+1) - 5(x-2)(x-1)^{2}$: hay un factor común grande, ¿cuál?",
          "The expression becomes $3(x-2)(x-1)(x+1) - 5(x-2)(x-1)^{2}$: there is a big common factor — which one?",
        ),
        L(
          "Factor común $(x-2)(x-1)$; dentro del corchete queda $3(x+1) - 5(x-1)$, que se reduce a un binomio de grado 1.",
          "Common factor $(x-2)(x-1)$; inside the bracket you get $3(x+1) - 5(x-1)$, which reduces to a degree-1 binomial.",
        ),
      ],
      answerDisplay: L(
        "$(3x - 6)(x^{2} - 1) - (5x - 10)(x - 1)^{2} = -2(x-2)(x-4)(x-1)$",
        "$(3x - 6)(x^{2} - 1) - (5x - 10)(x - 1)^{2} = -2(x-2)(x-4)(x-1)$",
      ),
      solution: [
        step(
          "given",
          "$E = (3x - 6)(x^{2} - 1) - (5x - 10)(x - 1)^{2}$.",
          "$E = (3x - 6)(x^{2} - 1) - (5x - 10)(x - 1)^{2}$.",
        ),
        step(
          "approach",
          "Factorizar cada bloque y extraer el factor común $(x-2)(x-1)$ — expandir aquí solo esclaviza la aritmética.",
          "Factor every block and pull the common factor $(x-2)(x-1)$ — expanding here only enslaves the arithmetic.",
        ),
        step(
          "calculation",
          "$3x - 6 = 3(x-2)$, $x^{2} - 1 = (x-1)(x+1)$, $5x - 10 = 5(x-2)$<br>$E = 3(x-2)(x-1)(x+1) - 5(x-2)(x-1)^{2} = (x-2)(x-1)\\left[3(x+1) - 5(x-1)\\right]$<br>$3x + 3 - 5x + 5 = -2x + 8 = -2(x - 4)$",
          "$3x - 6 = 3(x-2)$, $x^{2} - 1 = (x-1)(x+1)$, $5x - 10 = 5(x-2)$<br>$E = 3(x-2)(x-1)(x+1) - 5(x-2)(x-1)^{2} = (x-2)(x-1)\\left[3(x+1) - 5(x-1)\\right]$<br>$3x + 3 - 5x + 5 = -2x + 8 = -2(x - 4)$",
        ),
        step(
          "result",
          "$E = -2(x-2)(x-4)(x-1)$ (constante $-2$ + tres binomios = cuatro factores). Verificación con $x = 0$: original $(-6)(-1) - (-10)(1) = 6 + 10 = 16$; factorizado $-2(-2)(-4)(-1) = 16$ ✓.",
          "$E = -2(x-2)(x-4)(x-1)$ (constant $-2$ + three binomials = four factors). Check at $x = 0$: original $(-6)(-1) - (-10)(1) = 6 + 10 = 16$; factored $-2(-2)(-4)(-1) = 16$ ✓.",
        ),
      ],
    }),
  ),

  /* 78a — (x+1)(x+2)(x+3) = x(x+4)(x+5) → x = (−3±√17)/2. Key: idem. */
  template(
    {
      id: "poly-espol-ch2-78a",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "equations",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["equation", "expand", "quadratic-formula"],
      prerequisites: ["quadratics"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 78a",
        page: 240,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$x = \\dfrac{-3 \\pm \\sqrt{17}}{2}$`, `$x = \\dfrac{-3 \\pm \\sqrt{17}}{2}$`), correct: true },
        { id: "b", text: L(`$x = \\dfrac{3 \\pm \\sqrt{17}}{2}$`, `$x = \\dfrac{3 \\pm \\sqrt{17}}{2}$`), correct: false },
        { id: "c", text: L(`$x = \\dfrac{-3 \\pm \\sqrt{19}}{2}$`, `$x = \\dfrac{-3 \\pm \\sqrt{19}}{2}$`), correct: false },
        { id: "d", text: L(`$x = -3 \\pm \\sqrt{17}$`, `$x = -3 \\pm \\sqrt{17}$`), correct: false },
        { id: "e", text: L(`$A_{m(x)} = \\varnothing$`, `$A_{m(x)} = \\varnothing$`), correct: false },
      ];
      return {
        skill: L("Ecuación de productos: expandir, cancelar y fórmula", "Product equation: expand, cancel, formula"),
        statement: L(
          "Halla el conjunto de verdad de $m(x):\\ (x + 1)(x + 2)(x + 3) = x(x + 4)(x + 5)$.",
          "Find the truth set of $m(x):\\ (x + 1)(x + 2)(x + 3) = x(x + 4)(x + 5)$.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Expande ambos lados. Fíjate: los dos tienen el mismo coeficiente de $x^{3}$, así que el cubo se va a cancelar.",
            "Expand both sides. Note: both have the same $x^{3}$ coefficient, so the cubic terms will cancel.",
          ),
          L(
            "Izquierda: $x^{3} + 6x^{2} + 11x + 6$; derecha: $x^{3} + 9x^{2} + 20x$. Restando: $3x^{2} + 9x - 6 = 0$.",
            "Left: $x^{3} + 6x^{2} + 11x + 6$; right: $x^{3} + 9x^{2} + 20x$. Subtracting: $3x^{2} + 9x - 6 = 0$.",
          ),
          L(
            "Divide entre 3: $x^{2} + 3x - 2 = 0$ y aplica la fórmula cuadrática con $\\Delta = 9 + 8$.",
            "Divide by 3: $x^{2} + 3x - 2 = 0$ and apply the quadratic formula with $\\Delta = 9 + 8$.",
          ),
        ],
        answerDisplay: L(
          "$A_{m(x)} = \\left\\{\\dfrac{-3 - \\sqrt{17}}{2},\\ \\dfrac{-3 + \\sqrt{17}}{2}\\right\\}$",
          "$A_{m(x)} = \\left\\{\\dfrac{-3 - \\sqrt{17}}{2},\\ \\dfrac{-3 + \\sqrt{17}}{2}\\right\\}$",
        ),
        solution: [
          step(
            "given",
            "$(x + 1)(x + 2)(x + 3) = x(x + 4)(x + 5)$, $x \\in \\mathbb{R}$.",
            "$(x + 1)(x + 2)(x + 3) = x(x + 4)(x + 5)$, $x \\in \\mathbb{R}$.",
          ),
          step(
            "approach",
            "Expandir y restar: la igualdad de los cúbicos garantiza que queda una cuadrática; se resuelve con la fórmula general.",
            "Expand and subtract: the matching cubics guarantee a quadratic remains; solve it with the general formula.",
          ),
          step(
            "calculation",
            "Izquierda: $(x+1)(x+2)(x+3) = (x^{2} + 3x + 2)(x + 3) = x^{3} + 6x^{2} + 11x + 6$.<br>Derecha: $x(x^{2} + 9x + 20) = x^{3} + 9x^{2} + 20x$.<br>Resta: $3x^{2} + 9x - 6 = 0 \\Rightarrow x^{2} + 3x - 2 = 0$.<br>$\\Delta = 9 + 8 = 17$ → $x = \\dfrac{-3 \\pm \\sqrt{17}}{2}$.",
            "Left: $(x+1)(x+2)(x+3) = (x^{2} + 3x + 2)(x + 3) = x^{3} + 6x^{2} + 11x + 6$.<br>Right: $x(x^{2} + 9x + 20) = x^{3} + 9x^{2} + 20x$.<br>Subtract: $3x^{2} + 9x - 6 = 0 \\Rightarrow x^{2} + 3x - 2 = 0$.<br>$\\Delta = 9 + 8 = 17$ → $x = \\dfrac{-3 \\pm \\sqrt{17}}{2}$.",
          ),
          step(
            "result",
            "$A_{m(x)} = \\left\\{\\dfrac{-3 - \\sqrt{17}}{2},\\ \\dfrac{-3 + \\sqrt{17}}{2}\\right\\}$ (≈ $-3.56$ y $0.56$). Verificación con $x \\approx 0.5616$: izquierda $(1.5616)(2.5616)(3.5616) \\approx 14.23$; derecha $0.5616(4.5616)(5.5616) \\approx 14.23$ ✓.",
            "$A_{m(x)} = \\left\\{\\dfrac{-3 - \\sqrt{17}}{2},\\ \\dfrac{-3 + \\sqrt{17}}{2}\\right\\}$ (≈ $-3.56$ and $0.56$). Check at $x \\approx 0.5616$: left $(1.5616)(2.5616)(3.5616) \\approx 14.23$; right $0.5616(4.5616)(5.5616) \\approx 14.23$ ✓.",
          ),
        ],
      };
    },
  ),

  /* ================================================================== */
  /* Curated — ESPOL Fundamentos, EDICIÓN DIGITAL (TUTOR_LICENSED).      */
  /* §2.9 #94f (p. 243) + §2.12 «Teorema del binomio» #116-124          */
  /* (pp. 246-247) + Chapter 3 «Funciones de variable real» §3.12,      */
  /* pp. 387-388. Tutor's instruction: «el 2.12 también [debe ir]».     */
  /* Every answer double-verified: printed key pp. 938-939 + sympy      */
  /* (download/verify_espol_ch3.py). #117b and #121 have no printed     */
  /* key — sympy-only verification, noted inside those solutions.       */
  /* ================================================================== */

  /* 94f — 2x³−5x²+2x ≤ 0 → (−∞,0] ∪ [1/2,2], zeros included. Key: idem. */
  template(
    {
      id: "poly-espol-ch2-94f",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "inequalities",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["polynomial-inequality", "cubic", "sign-table"],
      prerequisites: ["factoring"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 94f",
        page: 243,
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$(-\\infty, 0] \\cup [\\tfrac{1}{2}, 2]$", "$(-\\infty, 0] \\cup [\\tfrac{1}{2}, 2]$"), correct: true },
        { id: "b", text: L("$(-\\infty, 0) \\cup (\\tfrac{1}{2}, 2)$", "$(-\\infty, 0) \\cup (\\tfrac{1}{2}, 2)$"), correct: false },
        { id: "c", text: L("$[0, \\tfrac{1}{2}] \\cup [2, +\\infty)$", "$[0, \\tfrac{1}{2}] \\cup [2, +\\infty)$"), correct: false },
        { id: "d", text: L("$\\mathbb{R}$", "$\\mathbb{R}$"), correct: false },
        { id: "e", text: L("$(0, \\tfrac{1}{2}) \\cup (2, +\\infty)$", "$(0, \\tfrac{1}{2}) \\cup (2, +\\infty)$"), correct: false },
      ];
      return {
        skill: L("Tabla de signos de una cúbica factorizable", "Sign table of a factorable cubic"),
        statement: L(
          "Determina el conjunto de verdad de $p(x):\\ 2x^{3} - 5x^{2} + 2x \\leq 0$, $x \\in \\mathbb{R}$.",
          "Determine the truth set of $p(x):\\ 2x^{3} - 5x^{2} + 2x \\leq 0$, $x \\in \\mathbb{R}$.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Saca primero el factor común $x$; el factor cuadrático que queda también se factoriza (busca raíces racionales).",
            "Pull out the common factor $x$ first; the quadratic factor that remains factors as well (look for rational roots).",
          ),
          L(
            "Los cortes $x = 0$, $x = \\tfrac{1}{2}$ y $x = 2$ parten la recta en cuatro tramos: estudia el signo del producto en cada uno (evalúa un punto cómodo).",
            "The cuts $x = 0$, $x = \\tfrac{1}{2}$ and $x = 2$ split the line into four tranches: study the sign of the product on each (evaluate a convenient point).",
          ),
          L(
            "La desigualdad es $\\leq$ (no $<$): decide si los ceros del polinomio pertenecen al conjunto de verdad.",
            "The inequality is $\\leq$ (not $<$): decide whether the zeros of the polynomial belong to the truth set.",
          ),
        ],
        answerDisplay: L(
          "$A_{p(x)} = (-\\infty, 0] \\cup \\left[\\tfrac{1}{2}, 2\\right]$",
          "$A_{p(x)} = (-\\infty, 0] \\cup \\left[\\tfrac{1}{2}, 2\\right]$",
        ),
        solution: [
          step(
            "given",
            "$p(x):\\ 2x^{3} - 5x^{2} + 2x \\leq 0$, $x \\in \\mathbb{R}$ (polinomio de grado 3).",
            "$p(x):\\ 2x^{3} - 5x^{2} + 2x \\leq 0$, $x \\in \\mathbb{R}$ (degree-3 polynomial).",
          ),
          step(
            "approach",
            "Factorizar por completo y levantar una tabla de signos con los cortes; como la desigualdad es $\\leq$, los ceros se incluyen.",
            "Factor completely and build a sign table with the cuts; since the inequality is $\\leq$, the zeros are included.",
          ),
          step(
            "calculation",
            "$2x^{3} - 5x^{2} + 2x = x\\left(2x^{2} - 5x + 2\\right) = x(2x - 1)(x - 2)$, con cortes $x = 0$, $\\tfrac{1}{2}$, $2$.<br>Signos de $x(2x-1)(x-2)$: en $(-\\infty, 0)$ da $(-)(-)(-) < 0$; en $\\left(0, \\tfrac{1}{2}\\right)$ da $(+)(-)(-) > 0$; en $\\left(\\tfrac{1}{2}, 2\\right)$ da $(+)(+)(-) < 0$; en $(2, +\\infty)$ todo positivo.",
            "$2x^{3} - 5x^{2} + 2x = x\\left(2x^{2} - 5x + 2\\right) = x(2x - 1)(x - 2)$, with cuts $x = 0$, $\\tfrac{1}{2}$, $2$.<br>Signs of $x(2x-1)(x-2)$: on $(-\\infty, 0)$ it gives $(-)(-)(-) < 0$; on $\\left(0, \\tfrac{1}{2}\\right)$ it gives $(+)(-)(-) > 0$; on $\\left(\\tfrac{1}{2}, 2\\right)$ it gives $(+)(+)(-) < 0$; on $(2, +\\infty)$ all positive.",
          ),
          step(
            "result",
            "$A_{p(x)} = (-\\infty, 0] \\cup \\left[\\tfrac{1}{2}, 2\\right]$ — los ceros entran por el $\\leq$ (coincide con la clave impresa). Verificación: $x = -1$: $-2 - 5 - 2 = -9 \\leq 0$ ✓; $x = 0.25$: $2(0.015625) - 5(0.0625) + 0.5 = 0.21875 > 0$ ✗ (correctamente fuera del conjunto); $x = 1$: $2 - 5 + 2 = -1 \\leq 0$ ✓.",
            "$A_{p(x)} = (-\\infty, 0] \\cup \\left[\\tfrac{1}{2}, 2\\right]$ — the zeros enter because of the $\\leq$ (matches the printed key). Check: $x = -1$: $-2 - 5 - 2 = -9 \\leq 0$ ✓; $x = 0.25$: $2(0.015625) - 5(0.0625) + 0.5 = 0.21875 > 0$ ✗ (correctly outside the set); $x = 1$: $2 - 5 + 2 = -1 \\leq 0$ ✓.",
          ),
        ],
      };
    },
  ),

  /* 116 — (x+k)⁵: coefficient of x² is 10k³ = 80 → k = 2 (option b). */
  template(
    {
      id: "poly-espol-ch2-116",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "binomial-theorem",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["binomial-theorem", "coefficient", "parameter"],
      prerequisites: ["special-products"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 116",
        page: 246,
      },
      reasoning: "parameters",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$1$", "$1$"), correct: false },
        { id: "b", text: L("$2$", "$2$"), correct: true },
        { id: "c", text: L("$-2$", "$-2$"), correct: false },
        { id: "d", text: L("$-1$", "$-1$"), correct: false },
        { id: "e", text: L("$3$", "$3$"), correct: false },
      ];
      return {
        skill: L("Coeficiente de un término del binomio con un parámetro", "Coefficient of a binomial term with a parameter"),
        statement: L(
          "Si en el desarrollo de $(x + k)^{5}$ el coeficiente de $x^{2}$ es $80$, entonces $k$ vale:",
          "If in the expansion of $(x + k)^{5}$ the coefficient of $x^{2}$ is $80$, then $k$ equals:",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "En el desarrollo de $(x + k)^{5}$, el término general es $\\binom{5}{j}x^{5-j}k^{j}$.",
            "In the expansion of $(x + k)^{5}$, the general term is $\\binom{5}{j}x^{5-j}k^{j}$.",
          ),
          L(
            "El término en $x^{2}$ corresponde a $j = 3$; su coeficiente es $\\binom{5}{3}k^{3} = 10k^{3}$.",
            "The term in $x^{2}$ corresponds to $j = 3$; its coefficient is $\\binom{5}{3}k^{3} = 10k^{3}$.",
          ),
          L(
            "Plantea $10k^{3} = 80$ y despeja $k$ (cuida el signo: $k^{3}$ conserva el signo de $k$).",
            "Set $10k^{3} = 80$ and solve for $k$ (mind the sign: $k^{3}$ keeps the sign of $k$).",
          ),
        ],
        answerDisplay: L("$k = 2$", "$k = 2$"),
        solution: [
          step(
            "given",
            "$(x + k)^{5}$; el coeficiente del término en $x^{2}$ del desarrollo es $80$.",
            "$(x + k)^{5}$; the coefficient of the $x^{2}$ term of the expansion is $80$.",
          ),
          step(
            "approach",
            "Escribir el término general del binomio, identificar el que contiene $x^{2}$ e igualar su coeficiente a $80$.",
            "Write the general term of the binomial, identify the one containing $x^{2}$ and set its coefficient equal to $80$.",
          ),
          step(
            "calculation",
            "Término general: $\\binom{5}{j}x^{5-j}k^{j}$; con $j = 3$ (para que quede $x^{2}$): $\\binom{5}{3}k^{3}x^{2} = 10k^{3}x^{2}$.<br>$10k^{3} = 80 \\Rightarrow k^{3} = 8 \\Rightarrow k = 2$.",
            "General term: $\\binom{5}{j}x^{5-j}k^{j}$; with $j = 3$ (so that $x^{2}$ remains): $\\binom{5}{3}k^{3}x^{2} = 10k^{3}x^{2}$.<br>$10k^{3} = 80 \\Rightarrow k^{3} = 8 \\Rightarrow k = 2$.",
          ),
          step(
            "result",
            "$k = 2$ (opción b; clave impresa b). Verificación: en $(x + 2)^{5}$ el término en $x^{2}$ es $\\binom{5}{3}\\,2^{3}x^{2} = 10 \\cdot 8\\,x^{2} = 80x^{2}$ ✓.",
            "$k = 2$ (option b; printed key b). Check: in $(x + 2)^{5}$ the $x^{2}$ term is $\\binom{5}{3}\\,2^{3}x^{2} = 10 \\cdot 8\\,x^{2} = 80x^{2}$ ✓.",
          ),
        ],
      };
    },
  ),

  /* 117b — (a − 1/a)⁵ = a⁵ − 5a³ + 10a − 10/a + 5/a³ − 1/a⁵. No printed key. */
  template(
    {
      id: "poly-espol-ch2-117b",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "binomial-theorem",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 210,
      tags: ["binomial-theorem", "expansion", "negative-exponents"],
      prerequisites: ["special-products"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 117b",
        page: 246,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L("Desarrollo completo de un binomio con potencias negativas", "Full expansion of a binomial with negative powers"),
      statement: L(
        "Escribe el desarrollo completo de $\\left(a - \\dfrac{1}{a}\\right)^{5}$ (se admite 1/a o a^-1 para las potencias negativas).",
        "Write the full expansion of $\\left(a - \\dfrac{1}{a}\\right)^{5}$ (1/a or a^-1 are both accepted for negative powers).",
      ),
      answer: {
        kind: "expression",
        accepted: [
          "a^5-5a^3+10a-10/a+5/a^3-1/a^5",
          "a^5 - 5a^3 + 10a - 10/a + 5/a^3 - 1/a^5",
          "a^5-5a^3+10a-10a^-1+5a^-3-a^-5",
        ],
        variables: ["a"],
      },
      hints: [
        L(
          "Fila de Pascal para $n = 5$: $1, 5, 10, 10, 5, 1$.",
          "Pascal's row for $n = 5$: $1, 5, 10, 10, 5, 1$.",
        ),
        L(
          "El término general es $\\binom{5}{j}(-1)^{j}a^{5-2j}$: el exponente de $a$ baja de dos en dos.",
          "The general term is $\\binom{5}{j}(-1)^{j}a^{5-2j}$: the exponent of $a$ drops by two at each step.",
        ),
        L(
          "Los exponentes que aparecen son $5, 3, 1, -1, -3, -5$; solo queda colocar los coeficientes y los signos alternados.",
          "The exponents that appear are $5, 3, 1, -1, -3, -5$; you only need to place the coefficients and the alternating signs.",
        ),
      ],
      answerDisplay: L(
        "$\\left(a - \\dfrac{1}{a}\\right)^{5} = a^{5} - 5a^{3} + 10a - \\dfrac{10}{a} + \\dfrac{5}{a^{3}} - \\dfrac{1}{a^{5}}$",
        "$\\left(a - \\dfrac{1}{a}\\right)^{5} = a^{5} - 5a^{3} + 10a - \\dfrac{10}{a} + \\dfrac{5}{a^{3}} - \\dfrac{1}{a^{5}}$",
      ),
      solution: [
        step(
          "given",
          "Desarrollar $\\left(a - \\dfrac{1}{a}\\right)^{5}$.",
          "Expand $\\left(a - \\dfrac{1}{a}\\right)^{5}$.",
        ),
        step(
          "approach",
          "Término general del binomio con $n = 5$: los exponentes de $a$ bajan de dos en dos y los signos alternan porque el segundo término es negativo.",
          "General term of the binomial with $n = 5$: the exponents of $a$ drop by two and the signs alternate because the second term is negative.",
        ),
        step(
          "calculation",
          "$T_{j+1} = \\binom{5}{j}a^{5-j}\\left(-\\dfrac{1}{a}\\right)^{j} = \\binom{5}{j}(-1)^{j}a^{5-2j}$.<br>$j = 0$: $a^{5}$; $j = 1$: $-5a^{3}$; $j = 2$: $10a$; $j = 3$: $-10a^{-1} = -\\dfrac{10}{a}$; $j = 4$: $5a^{-3} = \\dfrac{5}{a^{3}}$; $j = 5$: $-a^{-5} = -\\dfrac{1}{a^{5}}$.",
          "$T_{j+1} = \\binom{5}{j}a^{5-j}\\left(-\\dfrac{1}{a}\\right)^{j} = \\binom{5}{j}(-1)^{j}a^{5-2j}$.<br>$j = 0$: $a^{5}$; $j = 1$: $-5a^{3}$; $j = 2$: $10a$; $j = 3$: $-10a^{-1} = -\\dfrac{10}{a}$; $j = 4$: $5a^{-3} = \\dfrac{5}{a^{3}}$; $j = 5$: $-a^{-5} = -\\dfrac{1}{a^{5}}$.",
        ),
        step(
          "result",
          "$a^{5} - 5a^{3} + 10a - \\dfrac{10}{a} + \\dfrac{5}{a^{3}} - \\dfrac{1}{a^{5}}$. Este ejercicio no tiene clave impresa: se verificó con sympy. Verificación numérica con $a = 2$: $\\left(2 - \\dfrac{1}{2}\\right)^{5} = 1.5^{5} = 7.59375$ y el desarrollo da $32 - 40 + 20 - 5 + 0.625 - 0.03125 = 7.59375$ ✓.",
          "$a^{5} - 5a^{3} + 10a - \\dfrac{10}{a} + \\dfrac{5}{a^{3}} - \\dfrac{1}{a^{5}}$. This exercise has no printed key: it was verified with sympy. Numerical check at $a = 2$: $\\left(2 - \\dfrac{1}{2}\\right)^{5} = 1.5^{5} = 7.59375$ and the expansion gives $32 - 40 + 20 - 5 + 0.625 - 0.03125 = 7.59375$ ✓.",
        ),
      ],
    }),
  ),

  /* 118 — 7th term of (u/2 − 2v)^10 = 840u⁴v⁶. Key: idem. */
  template(
    {
      id: "poly-espol-ch2-118",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "binomial-theorem",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 180,
      tags: ["binomial-theorem", "general-term"],
      prerequisites: ["special-products"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 118",
        page: 246,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L("Término k-ésimo de un binomio con dos variables", "The k-th term of a two-variable binomial"),
      statement: L(
        "Halla el séptimo término del desarrollo de $\\left(\\dfrac{u}{2} - 2v\\right)^{10}$ (escribe solo el término, por ejemplo 5u^2v^3).",
        "Find the seventh term of the expansion of $\\left(\\dfrac{u}{2} - 2v\\right)^{10}$ (write just the term, for example 5u^2v^3).",
      ),
      answer: {
        kind: "expression",
        accepted: ["840u^4v^6", "840 u^4 v^6", "840u^4 v^6"],
        variables: ["u", "v"],
      },
      hints: [
        L(
          "El término general es $T_{k+1} = \\binom{10}{k}\\left(\\dfrac{u}{2}\\right)^{10-k}(-2v)^{k}$.",
          "The general term is $T_{k+1} = \\binom{10}{k}\\left(\\dfrac{u}{2}\\right)^{10-k}(-2v)^{k}$.",
        ),
        L(
          "El séptimo término corresponde a $k = 6$: $\\binom{10}{6}\\left(\\dfrac{u}{2}\\right)^{4}(-2v)^{6}$.",
          "The seventh term corresponds to $k = 6$: $\\binom{10}{6}\\left(\\dfrac{u}{2}\\right)^{4}(-2v)^{6}$.",
        ),
        L(
          "$(-2v)^{6}$ es positivo; agrupa las potencias de $2$: $\\dfrac{64}{16}$.",
          "$(-2v)^{6}$ is positive; collect the powers of $2$: $\\dfrac{64}{16}$.",
        ),
      ],
      answerDisplay: L("$T_{7} = 840u^{4}v^{6}$", "$T_{7} = 840u^{4}v^{6}$"),
      solution: [
        step(
          "given",
          "$\\left(\\dfrac{u}{2} - 2v\\right)^{10}$; se pide el séptimo término.",
          "$\\left(\\dfrac{u}{2} - 2v\\right)^{10}$; the seventh term is requested.",
        ),
        step(
          "approach",
          "Usar el término general con $k = 6$ (el séptimo término es $T_{k+1}$ con $k = 6$) y no desarrollar nada más.",
          "Use the general term with $k = 6$ (the seventh term is $T_{k+1}$ with $k = 6$) and expand nothing else.",
        ),
        step(
          "calculation",
          "$T_{7} = \\binom{10}{6}\\left(\\dfrac{u}{2}\\right)^{10-6}(-2v)^{6} = 210 \\cdot \\dfrac{u^{4}}{16} \\cdot 64v^{6} = 210 \\cdot 4 \\cdot u^{4}v^{6} = 840u^{4}v^{6}$.",
          "$T_{7} = \\binom{10}{6}\\left(\\dfrac{u}{2}\\right)^{10-6}(-2v)^{6} = 210 \\cdot \\dfrac{u^{4}}{16} \\cdot 64v^{6} = 210 \\cdot 4 \\cdot u^{4}v^{6} = 840u^{4}v^{6}$.",
        ),
        step(
          "result",
          "$T_{7} = 840u^{4}v^{6}$ (clave impresa: idem). Verificación con $u = v = 1$: $\\binom{10}{6}\\left(\\tfrac{1}{2}\\right)^{4}(-2)^{6} = 210 \\cdot \\tfrac{1}{16} \\cdot 64 = 840$ ✓.",
          "$T_{7} = 840u^{4}v^{6}$ (printed key: idem). Check at $u = v = 1$: $\\binom{10}{6}\\left(\\tfrac{1}{2}\\right)^{4}(-2)^{6} = 210 \\cdot \\tfrac{1}{16} \\cdot 64 = 840$ ✓.",
        ),
      ],
    }),
  ),

  /* 120 — term free of x in (6x − 1/(2x))¹⁰ = −61236 (6th term). Key: idem. */
  template(
    {
      id: "poly-espol-ch2-120",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "binomial-theorem",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 240,
      tags: ["binomial-theorem", "independent-term"],
      prerequisites: ["special-products"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 120",
        page: 246,
      },
      reasoning: "parameters",
    },
    () => ({
      skill: L("Término independiente de un binomio en x y 1/x", "The independent term of a binomial in x and 1/x"),
      statement: L(
        "Halla el término que no contiene $x$ en el desarrollo de $\\left(6x - \\dfrac{1}{2x}\\right)^{10}$ (da solo el número).",
        "Find the term that contains no $x$ in the expansion of $\\left(6x - \\dfrac{1}{2x}\\right)^{10}$ (give just the number).",
      ),
      answer: { kind: "numeric", value: -61236 },
      hints: [
        L(
          "El término general es $\\binom{10}{k}(6x)^{10-k}\\left(-\\dfrac{1}{2x}\\right)^{k}$: mira cómo cambia el exponente de $x$ con $k$.",
          "The general term is $\\binom{10}{k}(6x)^{10-k}\\left(-\\dfrac{1}{2x}\\right)^{k}$: watch how the exponent of $x$ changes with $k$.",
        ),
        L(
          "El exponente de $x$ es $10 - k - k = 10 - 2k$; «que no contenga $x$» significa exponente $0$.",
          "The exponent of $x$ is $10 - k - k = 10 - 2k$; «containing no $x$» means exponent $0$.",
        ),
        L(
          "Con $k = 5$ (sexto término): $\\binom{10}{5}6^{5}\\left(-\\dfrac{1}{2}\\right)^{5}$ — cuida el signo.",
          "With $k = 5$ (sixth term): $\\binom{10}{5}6^{5}\\left(-\\dfrac{1}{2}\\right)^{5}$ — mind the sign.",
        ),
      ],
      answerDisplay: L(
        "$T_{6} = \\binom{10}{5}6^{5}\\left(-\\dfrac{1}{2}\\right)^{5} = -61236$",
        "$T_{6} = \\binom{10}{5}6^{5}\\left(-\\dfrac{1}{2}\\right)^{5} = -61236$",
      ),
      solution: [
        step(
          "given",
          "$\\left(6x - \\dfrac{1}{2x}\\right)^{10}$; se busca el término independiente de $x$.",
          "$\\left(6x - \\dfrac{1}{2x}\\right)^{10}$; the term independent of $x$ is sought.",
        ),
        step(
          "approach",
          "El exponente de $x$ en el término general es $10 - 2k$; imponer que valga $0$ fija $k$, y con él el término completo.",
          "The exponent of $x$ in the general term is $10 - 2k$; forcing it to be $0$ fixes $k$, and with it the whole term.",
        ),
        step(
          "calculation",
          "$\\binom{10}{k}(6x)^{10-k}\\left(-\\dfrac{1}{2x}\\right)^{k}$ lleva $x^{10-2k}$; con $10 - 2k = 0$, $k = 5$ (sexto término).<br>$T_{6} = \\binom{10}{5}6^{5}\\left(-\\dfrac{1}{2}\\right)^{5} = 252 \\cdot 7776 \\cdot \\left(-\\dfrac{1}{32}\\right) = -252 \\cdot 243 = -61236$.",
          "$\\binom{10}{k}(6x)^{10-k}\\left(-\\dfrac{1}{2x}\\right)^{k}$ carries $x^{10-2k}$; with $10 - 2k = 0$, $k = 5$ (sixth term).<br>$T_{6} = \\binom{10}{5}6^{5}\\left(-\\dfrac{1}{2}\\right)^{5} = 252 \\cdot 7776 \\cdot \\left(-\\dfrac{1}{32}\\right) = -252 \\cdot 243 = -61236$.",
        ),
        step(
          "result",
          "$T_{6} = -61236$ (clave impresa: sexto término, $-61236$). Verificación aritmética: $252 \\cdot 7776 = 1959552$ y $1959552/32 = 61236$, con el signo de $(-1)^{5}$ ✓.",
          "$T_{6} = -61236$ (printed key: sixth term, $-61236$). Arithmetic check: $252 \\cdot 7776 = 1959552$ and $1959552/32 = 61236$, with the sign of $(-1)^{5}$ ✓.",
        ),
      ],
    }),
  ),

  /* 121 — (x²+3/x³)⁷: exponents 14−5k never equal 1 → no x term (option e). */
  template(
    {
      id: "poly-espol-ch2-121",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "binomial-theorem",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 210,
      tags: ["binomial-theorem", "exponent-analysis"],
      prerequisites: ["special-products"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 121",
        page: 247,
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$21$", "$21$"), correct: false },
        { id: "b", text: L("$35$", "$35$"), correct: false },
        { id: "c", text: L("$7$", "$7$"), correct: false },
        { id: "d", text: L("$-35$", "$-35$"), correct: false },
        { id: "e", text: L("No existe ningún término en $x$", "No term in $x$ exists"), correct: true },
      ];
      return {
        skill: L("¿Existe el término pedido? Análisis de exponentes", "Does the requested term exist? Exponent analysis"),
        statement: L(
          "En el desarrollo de $\\left(x^{2} + \\dfrac{3}{x^{3}}\\right)^{7}$, ¿cuál es el coeficiente del término en $x$? ¿Existen términos en $x$? Justifica.",
          "In the expansion of $\\left(x^{2} + \\dfrac{3}{x^{3}}\\right)^{7}$, what is the coefficient of the term in $x$? Do terms in $x$ exist? Justify.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "No multipliques nada todavía: escribe el término general y mira solo el **exponente** de $x$.",
            "Do not multiply anything yet: write the general term and look only at the **exponent** of $x$.",
          ),
          L(
            "$T_{k+1} = \\binom{7}{k}(x^{2})^{7-k}\\left(\\dfrac{3}{x^{3}}\\right)^{k}$ lleva $x^{\\,2(7-k) - 3k} = x^{\\,14-5k}$.",
            "$T_{k+1} = \\binom{7}{k}(x^{2})^{7-k}\\left(\\dfrac{3}{x^{3}}\\right)^{k}$ carries $x^{\\,2(7-k) - 3k} = x^{\\,14-5k}$.",
          ),
          L(
            "Recorre $k = 0, 1, \\ldots, 7$: ¿algún valor de $14 - 5k$ da exactamente $1$?",
            "Run through $k = 0, 1, \\ldots, 7$: does any value of $14 - 5k$ give exactly $1$?",
          ),
        ],
        answerDisplay: L("No existe ningún término en $x$", "No term in $x$ exists"),
        solution: [
          step(
            "given",
            "$\\left(x^{2} + \\dfrac{3}{x^{3}}\\right)^{7}$; se pide el coeficiente del término en $x$ (si existe).",
            "$\\left(x^{2} + \\dfrac{3}{x^{3}}\\right)^{7}$; the coefficient of the term in $x$ is requested (if it exists).",
          ),
          step(
            "approach",
            "Antes de calcular coeficientes hay que saber SI el término existe: basta analizar el exponente de $x$ en el término general.",
            "Before computing coefficients one must know WHETHER the term exists: it is enough to analyze the exponent of $x$ in the general term.",
          ),
          step(
            "calculation",
            "$T_{k+1} = \\binom{7}{k}x^{\\,2(7-k)} \\cdot 3^{k}x^{-3k}$, con exponente $14 - 5k$.<br>Con $k = 0, \\ldots, 7$: $14, 9, 4, -1, -6, -11, -16, -21$ — el $1$ no aparece (resolver $14 - 5k = 1$ da $k = \\tfrac{13}{5}$, no entero).",
            "$T_{k+1} = \\binom{7}{k}x^{\\,2(7-k)} \\cdot 3^{k}x^{-3k}$, with exponent $14 - 5k$.<br>For $k = 0, \\ldots, 7$: $14, 9, 4, -1, -6, -11, -16, -21$ — the $1$ never appears (solving $14 - 5k = 1$ gives $k = \\tfrac{13}{5}$, not an integer).",
          ),
          step(
            "result",
            "No existe ningún término en $x$ (opción e). Este ejercicio no tiene clave impresa: se verificó con sympy — el desarrollo solo contiene $x^{14}, x^{9}, x^{4}, x^{-1}, x^{-6}, \\ldots$. La gracia del ejercicio: pide un coeficiente, pero lo que examina es la lectura de exponentes.",
            "No term in $x$ exists (option e). This exercise has no printed key: it was verified with sympy — the expansion only contains $x^{14}, x^{9}, x^{4}, x^{-1}, x^{-6}, \\ldots$. The point of the exercise: it asks for a coefficient, but what it tests is reading exponents.",
          ),
        ],
      };
    },
  ),

  /* 122 — independent term of (x²+1/x)⁹ = 84 (7th term). Key: idem. */
  template(
    {
      id: "poly-espol-ch2-122",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "binomial-theorem",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 180,
      tags: ["binomial-theorem", "independent-term"],
      prerequisites: ["special-products"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 122",
        page: 247,
      },
      reasoning: "parameters",
    },
    () => ({
      skill: L("Término independiente por cancelación de exponentes", "The independent term by cancelling exponents"),
      statement: L(
        "Halla el término independiente de $x$ en el desarrollo de $\\left(x^{2} + \\dfrac{1}{x}\\right)^{9}$ (da solo el número).",
        "Find the term independent of $x$ in the expansion of $\\left(x^{2} + \\dfrac{1}{x}\\right)^{9}$ (give just the number).",
      ),
      answer: { kind: "numeric", value: 84 },
      hints: [
        L(
          "Término general: $\\binom{9}{k}(x^{2})^{9-k}\\left(\\dfrac{1}{x}\\right)^{k}$, con exponente de $x$ igual a $18 - 3k$.",
          "General term: $\\binom{9}{k}(x^{2})^{9-k}\\left(\\dfrac{1}{x}\\right)^{k}$, with exponent of $x$ equal to $18 - 3k$.",
        ),
        L(
          "«Independiente de $x$» significa exponente $0$: resuelve $18 - 3k = 0$.",
          "«Independent of $x$» means exponent $0$: solve $18 - 3k = 0$.",
        ),
        L(
          "Con $k = 6$ (séptimo término) las potencias de $x$ se cancelan: $\\binom{9}{6}(x^{2})^{3}(x^{-1})^{6}$.",
          "With $k = 6$ (seventh term) the powers of $x$ cancel out: $\\binom{9}{6}(x^{2})^{3}(x^{-1})^{6}$.",
        ),
      ],
      answerDisplay: L("$T_{7} = 84$", "$T_{7} = 84$"),
      solution: [
        step(
          "given",
          "$\\left(x^{2} + \\dfrac{1}{x}\\right)^{9}$; se busca el término independiente de $x$.",
          "$\\left(x^{2} + \\dfrac{1}{x}\\right)^{9}$; the term independent of $x$ is sought.",
        ),
        step(
          "approach",
          "Analizar el exponente de $x$ en el término general; el valor de $k$ que lo anula identifica el término buscado.",
          "Analyze the exponent of $x$ in the general term; the value of $k$ that nullifies it identifies the requested term.",
        ),
        step(
          "calculation",
          "Exponente: $2(9 - k) - k = 18 - 3k$; con $18 - 3k = 0$, $k = 6$ → séptimo término:<br>$T_{7} = \\binom{9}{6}(x^{2})^{3}\\left(\\dfrac{1}{x}\\right)^{6} = 84 \\cdot x^{6} \\cdot x^{-6} = 84$.",
          "Exponent: $2(9 - k) - k = 18 - 3k$; with $18 - 3k = 0$, $k = 6$ → seventh term:<br>$T_{7} = \\binom{9}{6}(x^{2})^{3}\\left(\\dfrac{1}{x}\\right)^{6} = 84 \\cdot x^{6} \\cdot x^{-6} = 84$.",
        ),
        step(
          "result",
          "El término independiente es $84$ (clave impresa: séptimo término, $84$). Verificación: $\\binom{9}{6} = \\binom{9}{3} = \\dfrac{9 \\cdot 8 \\cdot 7}{3 \\cdot 2 \\cdot 1} = 84$ y $x^{6} \\cdot x^{-6} = 1$ ✓.",
          "The independent term is $84$ (printed key: seventh term, $84$). Check: $\\binom{9}{6} = \\binom{9}{3} = \\dfrac{9 \\cdot 8 \\cdot 7}{3 \\cdot 2 \\cdot 1} = 84$ and $x^{6} \\cdot x^{-6} = 1$ ✓.",
        ),
      ],
    }),
  ),

  /* 123 — term with x¹⁰ in (5+2x²)⁷ = 16800x¹⁰ (6th term). Key: idem. */
  template(
    {
      id: "poly-espol-ch2-123",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "binomial-theorem",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 180,
      tags: ["binomial-theorem", "general-term"],
      prerequisites: ["special-products"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 123",
        page: 247,
      },
      reasoning: "parameters",
    },
    () => ({
      skill: L("Término con un exponente dado en un binomio", "The term with a given exponent in a binomial"),
      statement: L(
        "Halla el término que contiene $x^{10}$ en el desarrollo de $(5 + 2x^{2})^{7}$ (escribe solo el término, por ejemplo 12x^3).",
        "Find the term that contains $x^{10}$ in the expansion of $(5 + 2x^{2})^{7}$ (write just the term, for example 12x^3).",
      ),
      answer: {
        kind: "expression",
        accepted: ["16800x^10", "16800 x^10"],
        variables: ["x"],
      },
      hints: [
        L(
          "El término general es $\\binom{7}{k}5^{\\,7-k}(2x^{2})^{k}$; el exponente de $x$ es $2k$.",
          "The general term is $\\binom{7}{k}5^{\\,7-k}(2x^{2})^{k}$; the exponent of $x$ is $2k$.",
        ),
        L(
          "Impón $2k = 10$ para identificar el término.",
          "Impose $2k = 10$ to identify the term.",
        ),
        L(
          "Con $k = 5$ (sexto término): $\\binom{7}{5}5^{2}(2x^{2})^{5}$; calcula $21 \\cdot 25 \\cdot 32$.",
          "With $k = 5$ (sixth term): $\\binom{7}{5}5^{2}(2x^{2})^{5}$; compute $21 \\cdot 25 \\cdot 32$.",
        ),
      ],
      answerDisplay: L("$T_{6} = 16800x^{10}$", "$T_{6} = 16800x^{10}$"),
      solution: [
        step(
          "given",
          "$(5 + 2x^{2})^{7}$; se pide el término que contiene $x^{10}$.",
          "$(5 + 2x^{2})^{7}$; the term containing $x^{10}$ is requested.",
        ),
        step(
          "approach",
          "El exponente de $x$ solo proviene de $(2x^{2})^{k}$: igualar $2k = 10$ fija el término.",
          "The exponent of $x$ comes only from $(2x^{2})^{k}$: setting $2k = 10$ pins down the term.",
        ),
        step(
          "calculation",
          "$2k = 10 \\Rightarrow k = 5$ (sexto término).<br>$T_{6} = \\binom{7}{5}5^{\\,7-5}(2x^{2})^{5} = 21 \\cdot 25 \\cdot 32x^{10} = 16800x^{10}$.",
          "$2k = 10 \\Rightarrow k = 5$ (sixth term).<br>$T_{6} = \\binom{7}{5}5^{\\,7-5}(2x^{2})^{5} = 21 \\cdot 25 \\cdot 32x^{10} = 16800x^{10}$.",
        ),
        step(
          "result",
          "$T_{6} = 16800x^{10}$ (clave impresa: sexto término, $16800x^{10}$). Verificación: $21 \\cdot 25 = 525$ y $525 \\cdot 32 = 16800$ ✓.",
          "$T_{6} = 16800x^{10}$ (printed key: sixth term, $16800x^{10}$). Check: $21 \\cdot 25 = 525$ and $525 \\cdot 32 = 16800$ ✓.",
        ),
      ],
    }),
  ),

  /* 124 — (x²+y/x)⁵: exponents 10−3k never equal 3 → no such term (option e). */
  template(
    {
      id: "poly-espol-ch2-124",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "binomial-theorem",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["binomial-theorem", "exponent-analysis"],
      prerequisites: ["special-products"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 124",
        page: 247,
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$21$", "$21$"), correct: false },
        { id: "b", text: L("$30$", "$30$"), correct: false },
        { id: "c", text: L("$-12$", "$-12$"), correct: false },
        { id: "d", text: L("$72$", "$72$"), correct: false },
        { id: "e", text: L("No existe tal término", "No such term exists"), correct: true },
      ];
      return {
        skill: L("Buscar un término que no existe: análisis de exponentes", "Hunting for a term that does not exist: exponent analysis"),
        statement: L(
          "El término del desarrollo de $\\left(x^{2} + \\dfrac{y}{x}\\right)^{5}$ que contiene $x^{3}$ es:",
          "The term of the expansion of $\\left(x^{2} + \\dfrac{y}{x}\\right)^{5}$ that contains $x^{3}$ is:",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Como en todo binomio: término general y análisis del exponente de $x$ antes de calcular nada.",
            "As with every binomial: general term and analysis of the exponent of $x$ before computing anything.",
          ),
          L(
            "$T_{k+1} = \\binom{5}{k}(x^{2})^{5-k}\\left(\\dfrac{y}{x}\\right)^{k}$ lleva exponente de $x$ igual a $10 - 3k$.",
            "$T_{k+1} = \\binom{5}{k}(x^{2})^{5-k}\\left(\\dfrac{y}{x}\\right)^{k}$ carries an exponent of $x$ equal to $10 - 3k$.",
          ),
          L(
            "Con $k = 0, \\ldots, 5$ los exponentes son $10, 7, 4, 1, -2, -5$: ¿aparece el $3$?",
            "For $k = 0, \\ldots, 5$ the exponents are $10, 7, 4, 1, -2, -5$: does $3$ appear?",
          ),
        ],
        answerDisplay: L("No existe tal término", "No such term exists"),
        solution: [
          step(
            "given",
            "$\\left(x^{2} + \\dfrac{y}{x}\\right)^{5}$; se busca el término que contiene $x^{3}$.",
            "$\\left(x^{2} + \\dfrac{y}{x}\\right)^{5}$; the term containing $x^{3}$ is sought.",
          ),
          step(
            "approach",
            "El exponente de $x$ manda: solo si algún término tuviera exponente $3$ tendría sentido calcular su coeficiente.",
            "The exponent of $x$ rules: only if some term had exponent $3$ would it make sense to compute its coefficient.",
          ),
          step(
            "calculation",
            "$T_{k+1} = \\binom{5}{k}x^{\\,2(5-k)}y^{k}x^{-k}$, con exponente $10 - 3k$; para $k = 0, \\ldots, 5$: $10, 7, 4, 1, -2, -5$.<br>$10 - 3k = 3 \\Rightarrow 3k = 7 \\Rightarrow k = \\dfrac{7}{3}$, no entero.",
            "$T_{k+1} = \\binom{5}{k}x^{\\,2(5-k)}y^{k}x^{-k}$, with exponent $10 - 3k$; for $k = 0, \\ldots, 5$: $10, 7, 4, 1, -2, -5$.<br>$10 - 3k = 3 \\Rightarrow 3k = 7 \\Rightarrow k = \\dfrac{7}{3}$, not an integer.",
          ),
          step(
            "result",
            "No existe tal término (opción e; clave impresa e): el exponente $3$ no aparece en el desarrollo. Verificación: los únicos exponentes de $x$ posibles son $10, 7, 4, 1, -2, -5$ ✓.",
            "No such term exists (option e; printed key e): the exponent $3$ never appears in the expansion. Check: the only possible exponents of $x$ are $10, 7, 4, 1, -2, -5$ ✓.",
          ),
        ],
      };
    },
  ),

  /* 3.12 #87 — one condition p(3)=1 does not determine a+b → Falso (option b). */
  template(
    {
      id: "poly-espol-ch3-87",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "remainder-theorem",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["remainder-theorem", "conceptual"],
      prerequisites: ["remainder-theorem"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3 · 87",
        page: 387,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("Verdadero", "True"), correct: false },
        { id: "b", text: L("Falso", "False"), correct: true },
      ];
      return {
        skill: L("Teorema del resto y suficiencia de datos", "The remainder theorem and sufficiency of data"),
        statement: L(
          "Sea $p$ la función polinomial $p(x) = x^{2} + ax + b$. Si al dividir $p(x)$ entre $(x - 3)$ se obtiene resto $1$, entonces $a + b = 1$. La afirmación es:",
          "Let $p$ be the polynomial function $p(x) = x^{2} + ax + b$. If dividing $p(x)$ by $(x - 3)$ gives remainder $1$, then $a + b = 1$. The claim is:",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El teorema del resto dice: el resto de dividir $p(x)$ entre $x - c$ es $p(c)$.",
            "The remainder theorem says: the remainder of dividing $p(x)$ by $x - c$ is $p(c)$.",
          ),
          L(
            "Escribe la condición $p(3) = 1$ y cuenta: ¿cuántas ecuaciones y cuántas incógnitas obtienes?",
            "Write the condition $p(3) = 1$ and count: how many equations and how many unknowns do you get?",
          ),
          L(
            "Prueba a construir dos parejas $(a, b)$ distintas que cumplan la condición y compara sus sumas $a + b$.",
            "Try to build two different pairs $(a, b)$ satisfying the condition and compare their sums $a + b$.",
          ),
        ],
        answerDisplay: L("Falso: $a + b$ no queda determinado", "False: $a + b$ is not determined"),
        solution: [
          step(
            "given",
            "$p(x) = x^{2} + ax + b$; el resto de dividir $p(x)$ entre $(x - 3)$ es $1$; se afirma que $a + b = 1$.",
            "$p(x) = x^{2} + ax + b$; the remainder of dividing $p(x)$ by $(x - 3)$ is $1$; the claim is that $a + b = 1$.",
          ),
          step(
            "approach",
            "Traducir el resto con el teorema del resto ($p(3) = 1$) y preguntarse si UNA ecuación alcanza para determinar la suma de dos incógnitas.",
            "Translate the remainder with the remainder theorem ($p(3) = 1$) and ask whether ONE equation suffices to determine the sum of two unknowns.",
          ),
          step(
            "calculation",
            "$p(3) = 9 + 3a + b = 1 \\Rightarrow 3a + b = -8$ — una ecuación, dos incógnitas.<br>Ejemplos que la cumplen: $(a, b) = (0, -8)$, con suma $-8$; y $(a, b) = (-1, -5)$, con suma $-6$.",
            "$p(3) = 9 + 3a + b = 1 \\Rightarrow 3a + b = -8$ — one equation, two unknowns.<br>Pairs satisfying it: $(a, b) = (0, -8)$, with sum $-8$; and $(a, b) = (-1, -5)$, with sum $-6$.",
          ),
          step(
            "result",
            "**Falso** (opción b; clave impresa b): $a + b$ no queda determinado — una sola condición no fija la suma. Verificación: ambas parejas cumplen $3a + b = -8$ ($0 - 8 = -8$ ✓; $-3 - 5 = -8$ ✓) pero dan sumas distintas.",
            "**False** (option b; printed key b): $a + b$ is not determined — a single condition does not fix the sum. Check: both pairs satisfy $3a + b = -8$ ($0 - 8 = -8$ ✓; $-3 - 5 = -8$ ✓) yet they give different sums.",
          ),
        ],
      };
    },
  ),

  /* 3.12 #89 — (x−1/2) factor of x³+x²−(k+7)x+21/8 → k = −1 (option a). */
  template(
    {
      id: "poly-espol-ch3-89",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "remainder-theorem",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 180,
      tags: ["factor-theorem", "parameter"],
      prerequisites: ["remainder-theorem"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3 · 89",
        page: 387,
      },
      reasoning: "parameters",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$-1$", "$-1$"), correct: true },
        { id: "b", text: L("$7$", "$7$"), correct: false },
        { id: "c", text: L("$14$", "$14$"), correct: false },
        { id: "d", text: L("$-14$", "$-14$"), correct: false },
        { id: "e", text: L("$-7$", "$-7$"), correct: false },
      ];
      return {
        skill: L("Teorema del factor con un parámetro y fracciones", "The factor theorem with a parameter and fractions"),
        statement: L(
          "El valor de $k$ para el cual $(x - \\tfrac{1}{2})$ es factor de $p(x) = x^{3} + x^{2} - (k + 7)x + \\tfrac{21}{8}$ es:",
          "The value of $k$ for which $(x - \\tfrac{1}{2})$ is a factor of $p(x) = x^{3} + x^{2} - (k + 7)x + \\tfrac{21}{8}$ is:",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Teorema del factor: $(x - c)$ es factor de $p(x)$ si y solo si $p(c) = 0$. Aquí $c = \\tfrac{1}{2}$.",
            "Factor theorem: $(x - c)$ is a factor of $p(x)$ if and only if $p(c) = 0$. Here $c = \\tfrac{1}{2}$.",
          ),
          L(
            "Calcula $p\\left(\\tfrac{1}{2}\\right)$ agrupando primero los términos sin $k$: $\\tfrac{1}{8} + \\tfrac{1}{4} + \\tfrac{21}{8}$.",
            "Compute $p\\left(\\tfrac{1}{2}\\right)$ by grouping the $k$-free terms first: $\\tfrac{1}{8} + \\tfrac{1}{4} + \\tfrac{21}{8}$.",
          ),
          L(
            "Te debe quedar $3 - \\tfrac{k + 7}{2} = 0$; despeja $k$.",
            "You should get $3 - \\tfrac{k + 7}{2} = 0$; solve for $k$.",
          ),
        ],
        answerDisplay: L("$k = -1$", "$k = -1$"),
        solution: [
          step(
            "given",
            "$p(x) = x^{3} + x^{2} - (k + 7)x + \\tfrac{21}{8}$; $(x - \\tfrac{1}{2})$ debe ser factor.",
            "$p(x) = x^{3} + x^{2} - (k + 7)x + \\tfrac{21}{8}$; $(x - \\tfrac{1}{2})$ must be a factor.",
          ),
          step(
            "approach",
            "Teorema del factor: imponer $p\\left(\\tfrac{1}{2}\\right) = 0$ y despejar $k$, con cuidado en la aritmética de fracciones.",
            "Factor theorem: impose $p\\left(\\tfrac{1}{2}\\right) = 0$ and solve for $k$, carefully with the fraction arithmetic.",
          ),
          step(
            "calculation",
            "$p\\left(\\tfrac{1}{2}\\right) = \\tfrac{1}{8} + \\tfrac{1}{4} - \\tfrac{k + 7}{2} + \\tfrac{21}{8} = \\tfrac{1 + 2 + 21}{8} - \\tfrac{k + 7}{2} = 3 - \\tfrac{k + 7}{2}$.<br>$3 - \\tfrac{k + 7}{2} = 0 \\Rightarrow \\tfrac{k + 7}{2} = 3 \\Rightarrow k = -1$.",
            "$p\\left(\\tfrac{1}{2}\\right) = \\tfrac{1}{8} + \\tfrac{1}{4} - \\tfrac{k + 7}{2} + \\tfrac{21}{8} = \\tfrac{1 + 2 + 21}{8} - \\tfrac{k + 7}{2} = 3 - \\tfrac{k + 7}{2}$.<br>$3 - \\tfrac{k + 7}{2} = 0 \\Rightarrow \\tfrac{k + 7}{2} = 3 \\Rightarrow k = -1$.",
          ),
          step(
            "result",
            "$k = -1$ (opción a; clave impresa a). Verificación: con $k = -1$, $p\\left(\\tfrac{1}{2}\\right) = 3 - \\tfrac{6}{2} = 3 - 3 = 0$ ✓, así que $(x - \\tfrac{1}{2})$ divide exactamente.",
            "$k = -1$ (option a; printed key a). Check: with $k = -1$, $p\\left(\\tfrac{1}{2}\\right) = 3 - \\tfrac{6}{2} = 3 - 3 = 0$ ✓, so $(x - \\tfrac{1}{2})$ divides exactly.",
          ),
        ],
      };
    },
  ),

  /* 3.12 #90 — x³+ax²+b divisible by x²−x−2 → a+b = 1 (option a; shortcut p(−1)=0). */
  template(
    {
      id: "poly-espol-ch3-90",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "remainder-theorem",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 210,
      tags: ["factor-theorem", "system"],
      prerequisites: ["remainder-theorem", "factoring"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3 · 90",
        page: 387,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$1$", "$1$"), correct: true },
        { id: "b", text: L("$-1$", "$-1$"), correct: false },
        { id: "c", text: L("$7$", "$7$"), correct: false },
        { id: "d", text: L("$-7$", "$-7$"), correct: false },
        { id: "e", text: L("$2$", "$2$"), correct: false },
      ];
      return {
        skill: L("Divisibilidad por un trinomio: sistema con atajo", "Divisibility by a trinomial: a system with a shortcut"),
        statement: L(
          "La suma de $a$ y $b$ para que la función polinomial $p(x) = x^{3} + ax^{2} + b$ sea divisible por el trinomio $x^{2} - x - 2$ es:",
          "The sum of $a$ and $b$ such that the polynomial function $p(x) = x^{3} + ax^{2} + b$ is divisible by the trinomial $x^{2} - x - 2$ is:",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Factoriza el trinomio: $x^{2} - x - 2 = (x - 2)(x + 1)$.",
            "Factor the trinomial: $x^{2} - x - 2 = (x - 2)(x + 1)$.",
          ),
          L(
            "«Divisible por el trinomio» equivale a divisible por sus DOS factores: $p(2) = 0$ y $p(-1) = 0$.",
            "«Divisible by the trinomial» is equivalent to divisible by BOTH factors: $p(2) = 0$ and $p(-1) = 0$.",
          ),
          L(
            "Escribe las dos ecuaciones y míralas antes de resolver: una de ellas ya contiene casi literalmente lo que te piden.",
            "Write both equations and look at them before solving: one of them already contains almost literally what is asked.",
          ),
        ],
        answerDisplay: L("$a + b = 1$", "$a + b = 1$"),
        solution: [
          step(
            "given",
            "$p(x) = x^{3} + ax^{2} + b$ divisible entre $x^{2} - x - 2$; se pide $a + b$.",
            "$p(x) = x^{3} + ax^{2} + b$ divisible by $x^{2} - x - 2$; $a + b$ is requested.",
          ),
          step(
            "approach",
            "Factorizar el trinomio → dos condiciones de raíz (teorema del factor) → sistema $2 \\times 2$. Atajo: leer bien las ecuaciones antes de resolverlas.",
            "Factor the trinomial → two root conditions (factor theorem) → a $2 \\times 2$ system. Shortcut: read the equations carefully before solving.",
          ),
          step(
            "calculation",
            "$x^{2} - x - 2 = (x - 2)(x + 1)$, así que $p(2) = 0$ y $p(-1) = 0$:<br>$p(2) = 8 + 4a + b = 0$; $p(-1) = -1 + a + b = 0$.<br>La segunda ecuación dice directamente $a + b = 1$. Resolviendo completo: $b = 1 - a \\Rightarrow 8 + 4a + 1 - a = 0 \\Rightarrow a = -3$, $b = 4$.",
            "$x^{2} - x - 2 = (x - 2)(x + 1)$, so $p(2) = 0$ and $p(-1) = 0$:<br>$p(2) = 8 + 4a + b = 0$; $p(-1) = -1 + a + b = 0$.<br>The second equation directly says $a + b = 1$. Solving fully: $b = 1 - a \\Rightarrow 8 + 4a + 1 - a = 0 \\Rightarrow a = -3$, $b = 4$.",
          ),
          step(
            "result",
            "$a + b = 1$ (opción a; clave impresa a) — el atajo: $p(-1) = 0$ ya ES la ecuación pedida. Verificación con $a = -3$, $b = 4$: $p(2) = 8 - 12 + 4 = 0$ ✓ y $p(-1) = -1 - 3 + 4 = 0$ ✓.",
            "$a + b = 1$ (option a; printed key a) — the shortcut: $p(-1) = 0$ already IS the requested equation. Check with $a = -3$, $b = 4$: $p(2) = 8 - 12 + 4 = 0$ ✓ and $p(-1) = -1 - 3 + 4 = 0$ ✓.",
          ),
        ],
      };
    },
  ),

  /* 3.12 #93 — p(2)=0, p(1)=−10 → a=10/3, b=−38/3 → remainder p(3) = 160/3 (option c). */
  template(
    {
      id: "poly-espol-ch3-93",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "remainder-theorem",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 270,
      tags: ["remainder-theorem", "system"],
      prerequisites: ["remainder-theorem"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3 · 93",
        page: 388,
      },
      reasoning: "parameters",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$120$", "$120$"), correct: false },
        { id: "b", text: L("$150$", "$150$"), correct: false },
        { id: "c", text: L("$\\dfrac{160}{3}$", "$\\dfrac{160}{3}$"), correct: true },
        { id: "d", text: L("$\\dfrac{160}{30}$", "$\\dfrac{160}{30}$"), correct: false },
        { id: "e", text: L("$\\dfrac{244}{3}$", "$\\dfrac{244}{3}$"), correct: false },
      ];
      return {
        skill: L("Resto con parámetros: sistema de dos condiciones", "A remainder with parameters: a two-condition system"),
        statement: L(
          "Una de las raíces de $p(x) = x^{4} - ax^{2} + 5x + b$ es $2$, y $p(1) + 10 = 0$. El resto de dividir $p(x)$ entre $(x - 3)$ es:",
          "One of the roots of $p(x) = x^{4} - ax^{2} + 5x + b$ is $2$, and $p(1) + 10 = 0$. The remainder of dividing $p(x)$ by $(x - 3)$ is:",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Dos datos, dos incógnitas: «raíz 2» significa $p(2) = 0$ y la otra condición es $p(1) = -10$.",
            "Two data, two unknowns: «root 2» means $p(2) = 0$ and the other condition is $p(1) = -10$.",
          ),
          L(
            "Plantea el sistema en $a$ y $b$ y resta las ecuaciones para eliminar $b$.",
            "Set up the system in $a$ and $b$ and subtract the equations to eliminate $b$.",
          ),
          L(
            "Con $a$ y $b$ hallados, el resto pedido NO requiere dividir: es $p(3)$.",
            "With $a$ and $b$ found, the requested remainder needs NO division: it is $p(3)$.",
          ),
        ],
        answerDisplay: L("resto $= \\dfrac{160}{3}$", "remainder $= \\dfrac{160}{3}$"),
        solution: [
          step(
            "given",
            "$p(x) = x^{4} - ax^{2} + 5x + b$ con $p(2) = 0$ y $p(1) = -10$; se pide el resto de dividir entre $(x - 3)$.",
            "$p(x) = x^{4} - ax^{2} + 5x + b$ with $p(2) = 0$ and $p(1) = -10$; the remainder of the division by $(x - 3)$ is requested.",
          ),
          step(
            "approach",
            "Primero determinar $a$ y $b$ con un sistema (teorema del factor + dato puntual); después, el resto pedido es simplemente $p(3)$ (teorema del resto).",
            "First determine $a$ and $b$ with a system (factor theorem + point datum); afterwards, the requested remainder is simply $p(3)$ (remainder theorem).",
          ),
          step(
            "calculation",
            "$p(2) = 16 - 4a + 10 + b = 0 \\Rightarrow -4a + b = -26$;<br>$p(1) = 1 - a + 5 + b = -10 \\Rightarrow -a + b = -16$.<br>Restando: $-3a = -10 \\Rightarrow a = \\tfrac{10}{3}$ y $b = -16 + \\tfrac{10}{3} = -\\tfrac{38}{3}$.<br>Resto $= p(3) = 81 - 9 \\cdot \\tfrac{10}{3} + 15 - \\tfrac{38}{3} = 96 - 30 - \\tfrac{38}{3} = \\tfrac{160}{3}$.",
            "$p(2) = 16 - 4a + 10 + b = 0 \\Rightarrow -4a + b = -26$;<br>$p(1) = 1 - a + 5 + b = -10 \\Rightarrow -a + b = -16$.<br>Subtracting: $-3a = -10 \\Rightarrow a = \\tfrac{10}{3}$ and $b = -16 + \\tfrac{10}{3} = -\\tfrac{38}{3}$.<br>Remainder $= p(3) = 81 - 9 \\cdot \\tfrac{10}{3} + 15 - \\tfrac{38}{3} = 96 - 30 - \\tfrac{38}{3} = \\tfrac{160}{3}$.",
          ),
          step(
            "result",
            "El resto es $\\dfrac{160}{3}$ (opción c; clave impresa c). Verificación: con $a = \\tfrac{10}{3}$, $b = -\\tfrac{38}{3}$: $p(2) = 26 - \\tfrac{40}{3} - \\tfrac{38}{3} = 26 - 26 = 0$ ✓, y $\\tfrac{160}{3} \\approx 53.33$ coincide con $96 - 30 - 12.67$ ✓.",
            "The remainder is $\\dfrac{160}{3}$ (option c; printed key c). Check: with $a = \\tfrac{10}{3}$, $b = -\\tfrac{38}{3}$: $p(2) = 26 - \\tfrac{40}{3} - \\tfrac{38}{3} = 26 - 26 = 0$ ✓, and $\\tfrac{160}{3} \\approx 53.33$ matches $96 - 30 - 12.67$ ✓.",
          ),
        ],
      };
    },
  ),

  /* 3.12 #94 — p(1)=0 gives a+b−15=0 → a+b = 15 directly (option e). */
  template(
    {
      id: "poly-espol-ch3-94",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "remainder-theorem",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 270,
      tags: ["remainder-theorem", "system"],
      prerequisites: ["remainder-theorem"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3 · 94",
        page: 388,
      },
      reasoning: "parameters",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$11$", "$11$"), correct: false },
        { id: "b", text: L("$12$", "$12$"), correct: false },
        { id: "c", text: L("$13$", "$13$"), correct: false },
        { id: "d", text: L("$14$", "$14$"), correct: false },
        { id: "e", text: L("$15$", "$15$"), correct: true },
      ];
      return {
        skill: L("Restos con parámetros: un dato ya contiene la respuesta", "Remainders with parameters: one condition already holds the answer"),
        statement: L(
          "Si al dividir $p(x) = (a + 1)x^{5} + (b - 2)x^{4} - 31x^{3} - 39x^{2} + 76x - 20$ entre $(x - 1)$ se obtiene resto $0$, y al dividirlo entre $(x + 3)$ se obtiene resto $400$, entonces $a + b$ es:",
          "If dividing $p(x) = (a + 1)x^{5} + (b - 2)x^{4} - 31x^{3} - 39x^{2} + 76x - 20$ by $(x - 1)$ gives remainder $0$, and dividing it by $(x + 3)$ gives remainder $400$, then $a + b$ is:",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Teorema del resto dos veces: los restos son $p(1)$ y $p(-3)$. Empieza por $p(1)$.",
            "Remainder theorem twice: the remainders are $p(1)$ and $p(-3)$. Start with $p(1)$.",
          ),
          L(
            "Al evaluar $p(1)$ casi todo son números conocidos; agrupa lo que queda con $a$ y $b$.",
            "When evaluating $p(1)$ almost everything is known numbers; collect what remains with $a$ and $b$.",
          ),
          L(
            "Mira la forma final de $p(1)$: ¿qué contiene exactamente lo que te piden?",
            "Look at the final shape of $p(1)$: what does it contain exactly of what is asked?",
          ),
        ],
        answerDisplay: L("$a + b = 15$", "$a + b = 15$"),
        solution: [
          step(
            "given",
            "$p(x) = (a + 1)x^{5} + (b - 2)x^{4} - 31x^{3} - 39x^{2} + 76x - 20$; $p(1) = 0$ y $p(-3) = 400$; se pide $a + b$.",
            "$p(x) = (a + 1)x^{5} + (b - 2)x^{4} - 31x^{3} - 39x^{2} + 76x - 20$; $p(1) = 0$ and $p(-3) = 400$; $a + b$ is requested.",
          ),
          step(
            "approach",
            "Evaluar $p(1)$ primero: la condición del divisor $(x - 1)$ puede bastar sola; la segunda condición permite verificar (o hallar $a$ y $b$ por separado).",
            "Evaluate $p(1)$ first: the condition with the divisor $(x - 1)$ may suffice on its own; the second condition allows verification (or finding $a$ and $b$ separately).",
          ),
          step(
            "calculation",
            "$p(1) = (a + 1) + (b - 2) - 31 - 39 + 76 - 20 = a + b - 15 = 0 \\Rightarrow a + b = 15$.<br>Verificación con la otra condición: $p(-3) = -243(a + 1) + 81(b - 2) + 837 - 351 - 228 - 20 = -243a + 81b - 167 = 400 \\Rightarrow -3a + b = 7$; con $a + b = 15$: $a = 2$, $b = 13$.",
            "$p(1) = (a + 1) + (b - 2) - 31 - 39 + 76 - 20 = a + b - 15 = 0 \\Rightarrow a + b = 15$.<br>Verification with the other condition: $p(-3) = -243(a + 1) + 81(b - 2) + 837 - 351 - 228 - 20 = -243a + 81b - 167 = 400 \\Rightarrow -3a + b = 7$; with $a + b = 15$: $a = 2$, $b = 13$.",
          ),
          step(
            "result",
            "$a + b = 15$ (opción e; clave impresa e) — la primera condición lo resuelve sola. Verificación con $a = 2$, $b = 13$: $p(1) = 3 + 11 - 31 - 39 + 76 - 20 = 0$ ✓ y $p(-3) = -486 + 1053 - 167 = 400$ ✓.",
            "$a + b = 15$ (option e; printed key e) — the first condition solves it alone. Check with $a = 2$, $b = 13$: $p(1) = 3 + 11 - 31 - 39 + 76 - 20 = 0$ ✓ and $p(-3) = -486 + 1053 - 167 = 400$ ✓.",
          ),
        ],
      };
    },
  ),

  /* 3.12 #95 — q(1)=−3, q(2)=−7 → a=−7, b=3 → ab = −21 (option c). */
  template(
    {
      id: "poly-espol-ch3-95",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "remainder-theorem",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 210,
      tags: ["remainder-theorem", "system"],
      prerequisites: ["remainder-theorem"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3 · 95",
        page: 388,
      },
      reasoning: "parameters",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$-6$", "$-6$"), correct: false },
        { id: "b", text: L("$-24$", "$-24$"), correct: false },
        { id: "c", text: L("$-21$", "$-21$"), correct: true },
        { id: "d", text: L("$6$", "$6$"), correct: false },
        { id: "e", text: L("$21$", "$21$"), correct: false },
      ];
      return {
        skill: L("Dos restos, dos incógnitas y un producto final", "Two remainders, two unknowns and a final product"),
        statement: L(
          "Si al dividir $q(x) = x^{2} + ax + b$ entre $(x - 1)$ se obtiene resto $-3$, y al dividirlo entre $(x - 2)$ se obtiene resto $-7$, entonces $ab$ es:",
          "If dividing $q(x) = x^{2} + ax + b$ by $(x - 1)$ gives remainder $-3$, and dividing it by $(x - 2)$ gives remainder $-7$, then $ab$ is:",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Dos restos = dos evaluaciones: $q(1) = -3$ y $q(2) = -7$.",
            "Two remainders = two evaluations: $q(1) = -3$ and $q(2) = -7$.",
          ),
          L(
            "Plantea el sistema lineal en $a$ y $b$ y réstalo para eliminar $b$.",
            "Set up the linear system in $a$ and $b$ and subtract it to eliminate $b$.",
          ),
          L(
            "Te piden el PRODUCTO $ab$, no la suma: no contestes con $a + b$.",
            "You are asked for the PRODUCT $ab$, not the sum: do not answer with $a + b$.",
          ),
        ],
        answerDisplay: L("$ab = -21$", "$ab = -21$"),
        solution: [
          step(
            "given",
            "$q(x) = x^{2} + ax + b$ con $q(1) = -3$ y $q(2) = -7$; se pide $ab$.",
            "$q(x) = x^{2} + ax + b$ with $q(1) = -3$ and $q(2) = -7$; $ab$ is requested.",
          ),
          step(
            "approach",
            "Teorema del resto → sistema lineal $2 \\times 2$ en $a$ y $b$; después multiplicar (no sumar).",
            "Remainder theorem → a $2 \\times 2$ linear system in $a$ and $b$; then multiply (not add).",
          ),
          step(
            "calculation",
            "$q(1) = 1 + a + b = -3 \\Rightarrow a + b = -4$;<br>$q(2) = 4 + 2a + b = -7 \\Rightarrow 2a + b = -11$.<br>Restando: $a = -7$ y entonces $b = -4 + 7 = 3$.",
            "$q(1) = 1 + a + b = -3 \\Rightarrow a + b = -4$;<br>$q(2) = 4 + 2a + b = -7 \\Rightarrow 2a + b = -11$.<br>Subtracting: $a = -7$ and then $b = -4 + 7 = 3$.",
          ),
          step(
            "result",
            "$ab = -7 \\cdot 3 = -21$ (opción c; clave impresa c). Verificación con $q(x) = x^{2} - 7x + 3$: $q(1) = 1 - 7 + 3 = -3$ ✓ y $q(2) = 4 - 14 + 3 = -7$ ✓.",
            "$ab = -7 \\cdot 3 = -21$ (option c; printed key c). Check with $q(x) = x^{2} - 7x + 3$: $q(1) = 1 - 7 + 3 = -3$ ✓ and $q(2) = 4 - 14 + 3 = -7$ ✓.",
          ),
        ],
      };
    },
  ),

  /* 3.12 #97 — four conditions → p(x) = x⁴+2x³+x²−2x−2. Key: idem. */
  template(
    {
      id: "poly-espol-ch3-97",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "equations",
      difficulty: "hard",
      questionType: "expression",
      estimatedTimeSec: 300,
      tags: ["polynomial-construction", "factor-theorem", "system"],
      prerequisites: ["remainder-theorem", "factoring"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3 · 97",
        page: 388,
      },
      reasoning: "multi-concept",
    },
    () => ({
      skill: L("Construcción de un polinomio con cuatro condiciones", "Constructing a polynomial from four conditions"),
      statement: L(
        "Determina la función polinomial $p(x)$ de cuarto grado que cumple TODAS estas condiciones: I) el coeficiente de $x^{4}$ es $1$; II) $p(1) = 0$; III) $p(x)$ es divisible por el trinomio $x^{2} + 2x + 2$; IV) al dividir $p(x)$ entre $x$ se obtiene resto $-2$. (Puedes darla desarrollada, por ejemplo x^4 - x^2 + 1, o factorizada.)",
        "Determine the fourth-degree polynomial function $p(x)$ satisfying ALL of: I) the coefficient of $x^{4}$ is $1$; II) $p(1) = 0$; III) $p(x)$ is divisible by the trinomial $x^{2} + 2x + 2$; IV) dividing $p(x)$ by $x$ gives remainder $-2$. (You may give it expanded, for example x^4 - x^2 + 1, or factored.)",
      ),
      answer: {
        kind: "expression",
        accepted: [
          "x^4+2x^3+x^2-2x-2",
          "x^4 + 2x^3 + x^2 - 2x - 2",
          "(x^2+2x+2)(x^2-1)",
          "(x^2-1)(x^2+2x+2)",
        ],
        variables: ["x"],
      },
      hints: [
        L(
          "Las condiciones I y III juntas sugieren escribir $p(x) = (x^{2} + 2x + 2)(x^{2} + cx + d)$: el coeficiente de $x^{4}$ sale $1$ automáticamente.",
          "Conditions I and III together suggest writing $p(x) = (x^{2} + 2x + 2)(x^{2} + cx + d)$: the coefficient of $x^{4}$ comes out $1$ automatically.",
        ),
        L(
          "La condición IV habla del resto al dividir entre $x$: ese resto es simplemente $p(0)$.",
          "Condition IV is about the remainder of the division by $x$: that remainder is simply $p(0)$.",
        ),
        L(
          "Al expandir $p(x) = (x^{2} + 2x + 2)(x^{2} + cx + d)$, el término independiente es $2d$ y $p(1) = 5(1 + c + d)$.",
          "When expanding $p(x) = (x^{2} + 2x + 2)(x^{2} + cx + d)$, the constant term is $2d$ and $p(1) = 5(1 + c + d)$.",
        ),
      ],
      answerDisplay: L(
        "$p(x) = x^{4} + 2x^{3} + x^{2} - 2x - 2$",
        "$p(x) = x^{4} + 2x^{3} + x^{2} - 2x - 2$",
      ),
      solution: [
        step(
          "given",
          "I) coeficiente de $x^{4}$ igual a $1$; II) $p(1) = 0$; III) divisible entre $x^{2} + 2x + 2$; IV) resto de dividir entre $x$ igual a $-2$.",
          "I) coefficient of $x^{4}$ equal to $1$; II) $p(1) = 0$; III) divisible by $x^{2} + 2x + 2$; IV) remainder of the division by $x$ equal to $-2$.",
        ),
        step(
          "approach",
          "Construir en lugar de adivinar: I + III fijan la forma $p(x) = (x^{2} + 2x + 2)(x^{2} + cx + d)$; IV da $d$ y II da $c$.",
          "Construct instead of guessing: I + III fix the shape $p(x) = (x^{2} + 2x + 2)(x^{2} + cx + d)$; IV gives $d$ and II gives $c$.",
        ),
        step(
          "calculation",
          "Expandiendo: $p(x) = x^{4} + (c + 2)x^{3} + (d + 2c + 2)x^{2} + (2d + 2c)x + 2d$.<br>IV: $p(0) = 2d = -2 \\Rightarrow d = -1$.<br>II: $p(1) = (1 + 2 + 2)(1 + c + d) = 5c = 0 \\Rightarrow c = 0$.<br>Así $p(x) = (x^{2} + 2x + 2)(x^{2} - 1) = x^{4} + 2x^{3} + x^{2} - 2x - 2$.",
          "Expanding: $p(x) = x^{4} + (c + 2)x^{3} + (d + 2c + 2)x^{2} + (2d + 2c)x + 2d$.<br>IV: $p(0) = 2d = -2 \\Rightarrow d = -1$.<br>II: $p(1) = (1 + 2 + 2)(1 + c + d) = 5c = 0 \\Rightarrow c = 0$.<br>Hence $p(x) = (x^{2} + 2x + 2)(x^{2} - 1) = x^{4} + 2x^{3} + x^{2} - 2x - 2$.",
        ),
        step(
          "result",
          "$p(x) = x^{4} + 2x^{3} + x^{2} - 2x - 2$ (clave impresa: idem). Verificación de las CUATRO condiciones: coeficiente de $x^{4}$: $1$ ✓; $p(1) = 1 + 2 + 1 - 2 - 2 = 0$ ✓; $p(x) = (x^{2} + 2x + 2)(x - 1)(x + 1)$, divisible entre $x^{2} + 2x + 2$ ✓; $p(0) = -2$ ✓.",
          "$p(x) = x^{4} + 2x^{3} + x^{2} - 2x - 2$ (printed key: idem). Check of ALL FOUR conditions: coefficient of $x^{4}$: $1$ ✓; $p(1) = 1 + 2 + 1 - 2 - 2 = 0$ ✓; $p(x) = (x^{2} + 2x + 2)(x - 1)(x + 1)$, divisible by $x^{2} + 2x + 2$ ✓; $p(0) = -2$ ✓.",
        ),
      ],
    }),
  ),

];
