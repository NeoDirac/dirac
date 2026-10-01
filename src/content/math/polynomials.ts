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
];
