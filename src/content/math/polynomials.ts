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

  /* ================================================================== */
  /* Tarea UEES 1er parcial (tutor Sebastián Calderón, 2026-10-17):      */
  /* «EJERCICIOS DE REPASO 1ER PARCIAL MATEMATICAS I». Sección 1         */
  /* «PRODUCTOS NOTABLES» ítems 19-48 (pág. 1) y Sección 2               */
  /* «FACTORIZACION» ítems 21-52 (pág. 2). La hoja NO tiene clave        */
  /* impresa: cada respuesta y cada distractor verificados con sympy     */
  /* (download/verify_repaso1.py, 417 checks + auditoría previa del      */
  /* autor download/audit_8a_pre.py, 623 checks, 0 FAIL). Distractores   */
  /* según receta del brief (S1: coeficientes intercambiados / signo /   */
  /* término faltante; S2: se queda a medias / par erróneo / signo).     */
  /* ================================================================== */

  /* S1.19 — (x+4)(x+5) = x²+9x+20. Distraen: swap, signo, sin cruzados. */
  template(
    {
      id: "pn-uees-19",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "special-products",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 60,
      tags: ["special-products", "binomial-product"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "1 · 19",
        page: 1,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$x^{2} + 9x + 20$", "$x^{2} + 9x + 20$"), correct: true },
        { id: "b", text: L("$x^{2} + 20x + 9$", "$x^{2} + 20x + 9$"), correct: false },
        { id: "c", text: L("$x^{2} + 9x - 20$", "$x^{2} + 9x - 20$"), correct: false },
        { id: "d", text: L("$x^{2} + 20$", "$x^{2} + 20$"), correct: false },
      ];
      return {
        skill: L(
          "Producto de dos binomios con término común",
          "Product of two binomials with a common term",
        ),
        statement: L(
          "Desarrolle el producto notable:\n\n$$(x+4)(x+5)$$",
          "Expand the special product:\n\n$$(x+4)(x+5)$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Es el producto de dos binomios con el mismo término $x$: distribuye término a término (FOIL).",
            "It is a product of two binomials sharing the term $x$: distribute term by term (FOIL).",
          ),
          L(
            "Regla: $(a+b)(c+d) = ac + ad + bc + bd$ — cuatro productos parciales y luego reduces los semejantes.",
            "Rule: $(a+b)(c+d) = ac + ad + bc + bd$ — four partial products, then combine like terms.",
          ),
          L(
            "Los cuatro productos parciales aquí son $x \\cdot x$, $x \\cdot 5$, $4 \\cdot x$ y $4 \\cdot 5$; los dos del medio son semejantes.",
            "The four partial products here are $x \\cdot x$, $x \\cdot 5$, $4 \\cdot x$ and $4 \\cdot 5$; the two middle ones are like terms.",
          ),
        ],
        answerDisplay: L(
          "$(x+4)(x+5) = x^{2} + 9x + 20$",
          "$(x+4)(x+5) = x^{2} + 9x + 20$",
        ),
        solution: [
          step(
            "given",
            "El producto $(x+4)(x+5)$: dos binomios con el término común $x$.",
            "The product $(x+4)(x+5)$: two binomials with the common term $x$.",
          ),
          step(
            "approach",
            "Distribuir término a término: cada término del primer binomio multiplica a cada término del segundo; al final se reducen los semejantes.",
            "Distribute term by term: each term of the first binomial multiplies each term of the second; then combine like terms.",
          ),
          step(
            "calculation",
            "$(x+4)(x+5) = x \\cdot x + x \\cdot 5 + 4 \\cdot x + 4 \\cdot 5$<br>$= x^{2} + 5x + 4x + 20$<br>$= x^{2} + 9x + 20$",
            "$(x+4)(x+5) = x \\cdot x + x \\cdot 5 + 4 \\cdot x + 4 \\cdot 5$<br>$= x^{2} + 5x + 4x + 20$<br>$= x^{2} + 9x + 20$",
          ),
          step(
            "result",
            "$(x+4)(x+5) = x^{2} + 9x + 20$. Control: con $x = 1$: $(1+4)(1+5) = 5 \\cdot 6 = 30$ y $1 + 9 + 20 = 30$ ✓.",
            "$(x+4)(x+5) = x^{2} + 9x + 20$. Check: at $x = 1$: $(1+4)(1+5) = 5 \\cdot 6 = 30$ and $1 + 9 + 20 = 30$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S1.20 — (u+2)(u+5) = u²+7u+10. */
  template(
    {
      id: "pn-uees-20",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "special-products",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 60,
      tags: ["special-products", "binomial-product"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "1 · 20",
        page: 1,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$u^{2} + 7u + 10$", "$u^{2} + 7u + 10$"), correct: true },
        { id: "b", text: L("$u^{2} + 10u + 7$", "$u^{2} + 10u + 7$"), correct: false },
        { id: "c", text: L("$u^{2} + 7u - 10$", "$u^{2} + 7u - 10$"), correct: false },
        { id: "d", text: L("$u^{2} + 10$", "$u^{2} + 10$"), correct: false },
      ];
      return {
        skill: L(
          "Producto de dos binomios con término común",
          "Product of two binomials with a common term",
        ),
        statement: L(
          "Desarrolle el producto notable:\n\n$$(u+2)(u+5)$$",
          "Expand the special product:\n\n$$(u+2)(u+5)$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Dos binomios con el mismo término $u$: multiplica término a término.",
            "Two binomials sharing the term $u$: multiply term by term.",
          ),
          L(
            "$(a+b)(c+d) = ac + ad + bc + bd$; los dos productos «cruzados» ($ad$ y $bc$) dan términos semejantes en $u$.",
            "$(a+b)(c+d) = ac + ad + bc + bd$; the two cross products ($ad$ and $bc$) give like terms in $u$.",
          ),
          L(
            "Aquí los cruzados son $u \\cdot 5$ y $2 \\cdot u$; los extremos dan $u \\cdot u$ y $2 \\cdot 5$.",
            "Here the cross products are $u \\cdot 5$ and $2 \\cdot u$; the outer terms give $u \\cdot u$ and $2 \\cdot 5$.",
          ),
        ],
        answerDisplay: L(
          "$(u+2)(u+5) = u^{2} + 7u + 10$",
          "$(u+2)(u+5) = u^{2} + 7u + 10$",
        ),
        solution: [
          step(
            "given",
            "El producto $(u+2)(u+5)$ en la variable $u$.",
            "The product $(u+2)(u+5)$ in the variable $u$.",
          ),
          step(
            "approach",
            "Distribución término a término (FOIL) y reducción de semejantes.",
            "Term-by-term distribution (FOIL) and combining like terms.",
          ),
          step(
            "calculation",
            "$(u+2)(u+5) = u^{2} + 5u + 2u + 10$<br>$= u^{2} + 7u + 10$",
            "$(u+2)(u+5) = u^{2} + 5u + 2u + 10$<br>$= u^{2} + 7u + 10$",
          ),
          step(
            "result",
            "$(u+2)(u+5) = u^{2} + 7u + 10$. Control: con $u = 1$: $(1+2)(1+5) = 3 \\cdot 6 = 18$ y $1 + 7 + 10 = 18$ ✓.",
            "$(u+2)(u+5) = u^{2} + 7u + 10$. Check: at $u = 1$: $(1+2)(1+5) = 3 \\cdot 6 = 18$ and $1 + 7 + 10 = 18$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S1.21 — (w+2)(w−5) = w²−3w−10. */
  template(
    {
      id: "pn-uees-21",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "special-products",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 60,
      tags: ["special-products", "binomial-product"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "1 · 21",
        page: 1,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$w^{2} - 3w - 10$", "$w^{2} - 3w - 10$"), correct: true },
        { id: "b", text: L("$w^{2} - 10w - 3$", "$w^{2} - 10w - 3$"), correct: false },
        { id: "c", text: L("$w^{2} - 3w + 10$", "$w^{2} - 3w + 10$"), correct: false },
        { id: "d", text: L("$w^{2} - 10$", "$w^{2} - 10$"), correct: false },
      ];
      return {
        skill: L(
          "Binomios con signos distintos y término común",
          "Binomials with opposite signs and a common term",
        ),
        statement: L(
          "Desarrolle el producto notable:\n\n$$(w+2)(w-5)$$",
          "Expand the special product:\n\n$$(w+2)(w-5)$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Es un binomio por un binomio con signos distintos: el término independiente del resultado será NEGATIVO.",
            "It is one binomial times another with opposite signs: the constant term of the result will be NEGATIVE.",
          ),
          L(
            "$(a+b)(c-d) = ac - ad + bc - bd$: respeta el signo de cada producto parcial.",
            "$(a+b)(c-d) = ac - ad + bc - bd$: keep the sign of each partial product.",
          ),
          L(
            "Los cruzados son $w \\cdot (-5) = -5w$ y $2 \\cdot w = 2w$; el producto de los independientes es $2 \\cdot (-5)$.",
            "The cross products are $w \\cdot (-5) = -5w$ and $2 \\cdot w = 2w$; the product of the constants is $2 \\cdot (-5)$.",
          ),
        ],
        answerDisplay: L(
          "$(w+2)(w-5) = w^{2} - 3w - 10$",
          "$(w+2)(w-5) = w^{2} - 3w - 10$",
        ),
        solution: [
          step(
            "given",
            "El producto $(w+2)(w-5)$: binomios con el término común $w$ y signos distintos.",
            "The product $(w+2)(w-5)$: binomials with the common term $w$ and opposite signs.",
          ),
          step(
            "approach",
            "Distribuir respetando los signos: $(+2)(-5)$ queda negativo y los cruzados $-5w + 2w$ se combinan.",
            "Distribute respecting the signs: $(+2)(-5)$ stays negative and the cross terms $-5w + 2w$ combine.",
          ),
          step(
            "calculation",
            "$(w+2)(w-5) = w^{2} - 5w + 2w - 10$<br>$= w^{2} - 3w - 10$",
            "$(w+2)(w-5) = w^{2} - 5w + 2w - 10$<br>$= w^{2} - 3w - 10$",
          ),
          step(
            "result",
            "$(w+2)(w-5) = w^{2} - 3w - 10$. Control: con $w = 1$: $(1+2)(1-5) = 3 \\cdot (-4) = -12$ y $1 - 3 - 10 = -12$ ✓.",
            "$(w+2)(w-5) = w^{2} - 3w - 10$. Check: at $w = 1$: $(1+2)(1-5) = 3 \\cdot (-4) = -12$ and $1 - 3 - 10 = -12$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S1.22 — (x−4)(x+7) = x²+3x−28. */
  template(
    {
      id: "pn-uees-22",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "special-products",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 60,
      tags: ["special-products", "binomial-product"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "1 · 22",
        page: 1,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$x^{2} + 3x - 28$", "$x^{2} + 3x - 28$"), correct: true },
        { id: "b", text: L("$x^{2} - 28x + 3$", "$x^{2} - 28x + 3$"), correct: false },
        { id: "c", text: L("$x^{2} + 3x + 28$", "$x^{2} + 3x + 28$"), correct: false },
        { id: "d", text: L("$x^{2} - 28$", "$x^{2} - 28$"), correct: false },
      ];
      return {
        skill: L(
          "Binomios con signos distintos y término común",
          "Binomials with opposite signs and a common term",
        ),
        statement: L(
          "Desarrolle el producto notable:\n\n$$(x-4)(x+7)$$",
          "Expand the special product:\n\n$$(x-4)(x+7)$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Binomio con resta por binomio con suma: el término independiente del resultado es negativo porque $(-4)(+7) < 0$.",
            "A subtracting binomial times an adding binomial: the constant term of the result is negative because $(-4)(+7) < 0$.",
          ),
          L(
            "$(a-b)(c+d) = ac + ad - bc - bd$.",
            "$(a-b)(c+d) = ac + ad - bc - bd$.",
          ),
          L(
            "Los cruzados: $x \\cdot 7 = 7x$ y $(-4) \\cdot x = -4x$; el independiente sale de $(-4) \\cdot 7$.",
            "The cross products: $x \\cdot 7 = 7x$ and $(-4) \\cdot x = -4x$; the constant comes from $(-4) \\cdot 7$.",
          ),
        ],
        answerDisplay: L(
          "$(x-4)(x+7) = x^{2} + 3x - 28$",
          "$(x-4)(x+7) = x^{2} + 3x - 28$",
        ),
        solution: [
          step(
            "given",
            "El producto $(x-4)(x+7)$, binomios con el término común $x$.",
            "The product $(x-4)(x+7)$, binomials with the common term $x$.",
          ),
          step(
            "approach",
            "Distribuir con cuidado de los signos y combinar los dos términos lineales.",
            "Distribute carefully with the signs and combine the two linear terms.",
          ),
          step(
            "calculation",
            "$(x-4)(x+7) = x^{2} + 7x - 4x - 28$<br>$= x^{2} + 3x - 28$",
            "$(x-4)(x+7) = x^{2} + 7x - 4x - 28$<br>$= x^{2} + 3x - 28$",
          ),
          step(
            "result",
            "$(x-4)(x+7) = x^{2} + 3x - 28$. Control: con $x = 1$: $(1-4)(1+7) = (-3) \\cdot 8 = -24$ y $1 + 3 - 28 = -24$ ✓.",
            "$(x-4)(x+7) = x^{2} + 3x - 28$. Check: at $x = 1$: $(1-4)(1+7) = (-3) \\cdot 8 = -24$ and $1 + 3 - 28 = -24$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S1.23 — (2x+3)(5x+2) = 10x²+19x+6. */
  template(
    {
      id: "pn-uees-23",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "special-products",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 75,
      tags: ["special-products", "binomial-product", "foil"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "1 · 23",
        page: 1,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$10x^{2} + 19x + 6$", "$10x^{2} + 19x + 6$"), correct: true },
        { id: "b", text: L("$10x^{2} + 6x + 19$", "$10x^{2} + 6x + 19$"), correct: false },
        { id: "c", text: L("$10x^{2} + 19x - 6$", "$10x^{2} + 19x - 6$"), correct: false },
        { id: "d", text: L("$10x^{2} + 6$", "$10x^{2} + 6$"), correct: false },
      ];
      return {
        skill: L(
          "Binomios con coeficientes en ambos términos (FOIL)",
          "Binomials with coefficients in both terms (FOIL)",
        ),
        statement: L(
          "Desarrolle el producto notable:\n\n$$(2x+3)(5x+2)$$",
          "Expand the special product:\n\n$$(2x+3)(5x+2)$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Ningún término es común: usa FOIL (Primeros, Externos, Internos, Últimos) o distribuye los cuatro productos.",
            "No shared term: use FOIL (First, Outer, Inner, Last) or distribute the four products.",
          ),
          L(
            "$(ax+b)(cx+d) = ac \\cdot x^{2} + (ad+bc) \\, x + bd$: los coeficientes se multiplican cruzados.",
            "$(ax+b)(cx+d) = ac \\cdot x^{2} + (ad+bc) \\, x + bd$: the coefficients multiply across.",
          ),
          L(
            "Aquí $ac = 2 \\cdot 5$ y $bd = 3 \\cdot 2$; el término central junta $2x \\cdot 2$ con $3 \\cdot 5x$.",
            "Here $ac = 2 \\cdot 5$ and $bd = 3 \\cdot 2$; the middle term joins $2x \\cdot 2$ with $3 \\cdot 5x$.",
          ),
        ],
        answerDisplay: L(
          "$(2x+3)(5x+2) = 10x^{2} + 19x + 6$",
          "$(2x+3)(5x+2) = 10x^{2} + 19x + 6$",
        ),
        solution: [
          step(
            "given",
            "El producto $(2x+3)(5x+2)$: ambos binomios tienen coeficiente numérico.",
            "The product $(2x+3)(5x+2)$: both binomials carry a numeric coefficient.",
          ),
          step(
            "approach",
            "Distribuir los cuatro productos parciales (FOIL) y reducir los semejantes en $x$.",
            "Distribute the four partial products (FOIL) and combine the like terms in $x$.",
          ),
          step(
            "calculation",
            "$(2x+3)(5x+2) = 10x^{2} + 4x + 15x + 6$<br>$= 10x^{2} + 19x + 6$",
            "$(2x+3)(5x+2) = 10x^{2} + 4x + 15x + 6$<br>$= 10x^{2} + 19x + 6$",
          ),
          step(
            "result",
            "$(2x+3)(5x+2) = 10x^{2} + 19x + 6$. Control: con $x = 1$: $(2+3)(5+2) = 5 \\cdot 7 = 35$ y $10 + 19 + 6 = 35$ ✓.",
            "$(2x+3)(5x+2) = 10x^{2} + 19x + 6$. Check: at $x = 1$: $(2+3)(5+2) = 5 \\cdot 7 = 35$ and $10 + 19 + 6 = 35$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S1.24 — (t−5)(2t+7) = 2t²−3t−35. */
  template(
    {
      id: "pn-uees-24",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "special-products",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 75,
      tags: ["special-products", "binomial-product", "foil"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "1 · 24",
        page: 1,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$2t^{2} - 3t - 35$", "$2t^{2} - 3t - 35$"), correct: true },
        { id: "b", text: L("$2t^{2} - 35t - 3$", "$2t^{2} - 35t - 3$"), correct: false },
        { id: "c", text: L("$2t^{2} - 3t + 35$", "$2t^{2} - 3t + 35$"), correct: false },
        { id: "d", text: L("$2t^{2} - 35$", "$2t^{2} - 35$"), correct: false },
      ];
      return {
        skill: L(
          "Binomios con coeficientes y signos mixtos (FOIL)",
          "Binomials with coefficients and mixed signs (FOIL)",
        ),
        statement: L(
          "Desarrolle el producto notable:\n\n$$(t-5)(2t+7)$$",
          "Expand the special product:\n\n$$(t-5)(2t+7)$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "FOIL con signos mixtos: el término independiente sale de $(-5)(+7)$ y es negativo.",
            "FOIL with mixed signs: the constant term comes from $(-5)(+7)$ and is negative.",
          ),
          L(
            "$(ax+b)(cx+d) = ac \\cdot x^{2} + (ad+bc) \\, x + bd$, con $b = -5$ aquí.",
            "$(ax+b)(cx+d) = ac \\cdot x^{2} + (ad+bc) \\, x + bd$, with $b = -5$ here.",
          ),
          L(
            "El central junta $t \\cdot 7 = 7t$ con $(-5) \\cdot 2t = -10t$; el cuadrático es $t \\cdot 2t$.",
            "The middle term joins $t \\cdot 7 = 7t$ with $(-5) \\cdot 2t = -10t$; the quadratic one is $t \\cdot 2t$.",
          ),
        ],
        answerDisplay: L(
          "$(t-5)(2t+7) = 2t^{2} - 3t - 35$",
          "$(t-5)(2t+7) = 2t^{2} - 3t - 35$",
        ),
        solution: [
          step(
            "given",
            "El producto $(t-5)(2t+7)$: coeficientes y signos mixtos.",
            "The product $(t-5)(2t+7)$: mixed coefficients and signs.",
          ),
          step(
            "approach",
            "Distribuir los cuatro productos con FOIL cuidando los signos, y reducir los términos en $t$.",
            "Distribute the four FOIL products watching the signs, and combine the $t$ terms.",
          ),
          step(
            "calculation",
            "$(t-5)(2t+7) = 2t^{2} + 7t - 10t - 35$<br>$= 2t^{2} - 3t - 35$",
            "$(t-5)(2t+7) = 2t^{2} + 7t - 10t - 35$<br>$= 2t^{2} - 3t - 35$",
          ),
          step(
            "result",
            "$(t-5)(2t+7) = 2t^{2} - 3t - 35$. Control: con $t = 1$: $(1-5)(2+7) = (-4) \\cdot 9 = -36$ y $2 - 3 - 35 = -36$ ✓.",
            "$(t-5)(2t+7) = 2t^{2} - 3t - 35$. Check: at $t = 1$: $(1-5)(2+7) = (-4) \\cdot 9 = -36$ and $2 - 3 - 35 = -36$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S1.25 — (X+2Y)² = X²+4XY+4Y². */
  template(
    {
      id: "pn-uees-25",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "special-products",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 90,
      tags: ["special-products", "perfect-square"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "1 · 25",
        page: 1,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$X^{2} + 4XY + 4Y^{2}$", "$X^{2} + 4XY + 4Y^{2}$"), correct: true },
        { id: "b", text: L("$X^{2} + 2XY + 4Y^{2}$", "$X^{2} + 2XY + 4Y^{2}$"), correct: false },
        { id: "c", text: L("$X^{2} + 4XY - 4Y^{2}$", "$X^{2} + 4XY - 4Y^{2}$"), correct: false },
        { id: "d", text: L("$X^{2} + 4Y^{2}$", "$X^{2} + 4Y^{2}$"), correct: false },
      ];
      return {
        skill: L(
          "Binomio al cuadrado con dos variables",
          "Squaring a binomial in two variables",
        ),
        statement: L(
          "Desarrolle el producto notable:\n\n$$(X+2Y)^{2}$$",
          "Expand the special product:\n\n$$(X+2Y)^{2}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Es un binomio al cuadrado (producto notable): usa la identidad, no multipliques a ciegas.",
            "It is a squared binomial (special product): use the identity, do not multiply blindly.",
          ),
          L(
            "$(a+b)^{2} = a^{2} + 2ab + b^{2}$.",
            "$(a+b)^{2} = a^{2} + 2ab + b^{2}$.",
          ),
          L(
            "Aquí $a = X$ y $b = 2Y$: el término central es el doble producto $2 \\cdot X \\cdot 2Y = 4XY$.",
            "Here $a = X$ and $b = 2Y$: the middle term is the double product $2 \\cdot X \\cdot 2Y = 4XY$.",
          ),
        ],
        answerDisplay: L(
          "$(X+2Y)^{2} = X^{2} + 4XY + 4Y^{2}$",
          "$(X+2Y)^{2} = X^{2} + 4XY + 4Y^{2}$",
        ),
        solution: [
          step(
            "given",
            "El cuadrado del binomio $(X+2Y)^{2}$ en las variables $X$ e $Y$.",
            "The square of the binomial $(X+2Y)^{2}$ in the variables $X$ and $Y$.",
          ),
          step(
            "approach",
            "Identidad del cuadrado de un binomio con $a = X$ y $b = 2Y$: cuadrado del primero, doble producto, cuadrado del segundo.",
            "Squared-binomial identity with $a = X$ and $b = 2Y$: square of the first, double product, square of the second.",
          ),
          step(
            "calculation",
            "$(X+2Y)^{2} = X^{2} + 2 \\cdot X \\cdot 2Y + (2Y)^{2}$<br>$= X^{2} + 4XY + 4Y^{2}$",
            "$(X+2Y)^{2} = X^{2} + 2 \\cdot X \\cdot 2Y + (2Y)^{2}$<br>$= X^{2} + 4XY + 4Y^{2}$",
          ),
          step(
            "result",
            "$(X+2Y)^{2} = X^{2} + 4XY + 4Y^{2}$. Control: con $X = 1$, $Y = 1$: $(1+2)^{2} = 9$ y $1 + 4 + 4 = 9$ ✓.",
            "$(X+2Y)^{2} = X^{2} + 4XY + 4Y^{2}$. Check: at $X = 1$, $Y = 1$: $(1+2)^{2} = 9$ and $1 + 4 + 4 = 9$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S1.26 — (2x−1)² = 4x²−4x+1. */
  template(
    {
      id: "pn-uees-26",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "special-products",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 90,
      tags: ["special-products", "perfect-square"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "1 · 26",
        page: 1,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$4x^{2} - 4x + 1$", "$4x^{2} - 4x + 1$"), correct: true },
        { id: "b", text: L("$4x^{2} - 2x + 1$", "$4x^{2} - 2x + 1$"), correct: false },
        { id: "c", text: L("$4x^{2} + 4x + 1$", "$4x^{2} + 4x + 1$"), correct: false },
        { id: "d", text: L("$4x^{2} + 1$", "$4x^{2} + 1$"), correct: false },
      ];
      return {
        skill: L(
          "Binomio al cuadrado con coeficiente y resta",
          "Squaring a binomial with a coefficient and a subtraction",
        ),
        statement: L(
          "Desarrolle el producto notable:\n\n$$(2x-1)^{2}$$",
          "Expand the special product:\n\n$$(2x-1)^{2}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Binomio al cuadrado: NO distribuyas el exponente solo a cada término; hay un doble producto escondido.",
            "Squared binomial: do NOT distribute the exponent onto each term; there is a hidden double product.",
          ),
          L(
            "$(a-b)^{2} = a^{2} - 2ab + b^{2}$.",
            "$(a-b)^{2} = a^{2} - 2ab + b^{2}$.",
          ),
          L(
            "Aquí $a = 2x$ y $b = 1$: el doble producto es $2 \\cdot 2x \\cdot 1 = 4x$ (con signo menos).",
            "Here $a = 2x$ and $b = 1$: the double product is $2 \\cdot 2x \\cdot 1 = 4x$ (with a minus sign).",
          ),
        ],
        answerDisplay: L(
          "$(2x-1)^{2} = 4x^{2} - 4x + 1$",
          "$(2x-1)^{2} = 4x^{2} - 4x + 1$",
        ),
        solution: [
          step(
            "given",
            "El cuadrado $(2x-1)^{2}$.",
            "The square $(2x-1)^{2}$.",
          ),
          step(
            "approach",
            "Identidad del binomio al cuadrado con $a = 2x$, $b = 1$ y resta: $(a-b)^{2} = a^{2} - 2ab + b^{2}$.",
            "Squared-binomial identity with $a = 2x$, $b = 1$ and a subtraction: $(a-b)^{2} = a^{2} - 2ab + b^{2}$.",
          ),
          step(
            "calculation",
            "$(2x-1)^{2} = (2x)^{2} - 2 \\cdot 2x \\cdot 1 + 1^{2}$<br>$= 4x^{2} - 4x + 1$",
            "$(2x-1)^{2} = (2x)^{2} - 2 \\cdot 2x \\cdot 1 + 1^{2}$<br>$= 4x^{2} - 4x + 1$",
          ),
          step(
            "result",
            "$(2x-1)^{2} = 4x^{2} - 4x + 1$. Control: con $x = 2$: $(4-1)^{2} = 9$ y $16 - 8 + 1 = 9$ ✓.",
            "$(2x-1)^{2} = 4x^{2} - 4x + 1$. Check: at $x = 2$: $(4-1)^{2} = 9$ and $16 - 8 + 1 = 9$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S1.27 — (7−X)² = X²−14X+49 (orden invertido). */
  template(
    {
      id: "pn-uees-27",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "special-products",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 90,
      tags: ["special-products", "perfect-square"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "1 · 27",
        page: 1,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$X^{2} - 14X + 49$", "$X^{2} - 14X + 49$"), correct: true },
        { id: "b", text: L("$X^{2} - 7X + 49$", "$X^{2} - 7X + 49$"), correct: false },
        { id: "c", text: L("$X^{2} + 14X + 49$", "$X^{2} + 14X + 49$"), correct: false },
        { id: "d", text: L("$X^{2} + 49$", "$X^{2} + 49$"), correct: false },
      ];
      return {
        skill: L(
          "Binomio al cuadrado escrito al revés (7−X)",
          "A squared binomial written backwards (7−X)",
        ),
        statement: L(
          "Desarrolle el producto notable:\n\n$$(7-X)^{2}$$",
          "Expand the special product:\n\n$$(7-X)^{2}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El binomio está «al revés» (primero el número): reescríbelo con la variable primero para ver la identidad.",
            "The binomial is «backwards» (number first): rewrite it with the variable first to see the identity.",
          ),
          L(
            "$(a-b)^{2} = (b-a)^{2}$: el cuadrado de un binomio NO cambia si se intercambian los términos.",
            "$(a-b)^{2} = (b-a)^{2}$: the square of a binomial does not change if you swap its terms.",
          ),
          L(
            "Reescribe $(7-X)^{2} = (X-7)^{2}$: el doble producto es $2 \\cdot X \\cdot 7 = 14X$ con signo menos.",
            "Rewrite $(7-X)^{2} = (X-7)^{2}$: the double product is $2 \\cdot X \\cdot 7 = 14X$ with a minus sign.",
          ),
        ],
        answerDisplay: L(
          "$(7-X)^{2} = X^{2} - 14X + 49$",
          "$(7-X)^{2} = X^{2} - 14X + 49$",
        ),
        solution: [
          step(
            "given",
            "El cuadrado $(7-X)^{2}$, con el número primero.",
            "The square $(7-X)^{2}$, with the number first.",
          ),
          step(
            "approach",
            "Como $(7-X)^{2} = (X-7)^{2}$, se aplica la identidad del cuadrado de una resta con $a = X$ y $b = 7$.",
            "Since $(7-X)^{2} = (X-7)^{2}$, apply the square-of-a-difference identity with $a = X$ and $b = 7$.",
          ),
          step(
            "calculation",
            "$(7-X)^{2} = (X-7)^{2} = X^{2} - 2 \\cdot X \\cdot 7 + 7^{2}$<br>$= X^{2} - 14X + 49$",
            "$(7-X)^{2} = (X-7)^{2} = X^{2} - 2 \\cdot X \\cdot 7 + 7^{2}$<br>$= X^{2} - 14X + 49$",
          ),
          step(
            "result",
            "$(7-X)^{2} = X^{2} - 14X + 49$. Control: con $X = 1$: $(7-1)^{2} = 36$ y $1 - 14 + 49 = 36$ ✓.",
            "$(7-X)^{2} = X^{2} - 14X + 49$. Check: at $X = 1$: $(7-1)^{2} = 36$ and $1 - 14 + 49 = 36$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S1.28 — (√x−1)(2√x+5) = 2x+3√x−5. */
  template(
    {
      id: "pn-uees-28",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "special-products",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["special-products", "binomial-product", "radicals"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "1 · 28",
        page: 1,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$2x + 3\\sqrt{x} - 5$", "$2x + 3\\sqrt{x} - 5$"), correct: true },
        { id: "b", text: L("$2x + 5\\sqrt{x} - 5$", "$2x + 5\\sqrt{x} - 5$"), correct: false },
        { id: "c", text: L("$2x + 3\\sqrt{x} + 5$", "$2x + 3\\sqrt{x} + 5$"), correct: false },
        { id: "d", text: L("$2x - 5$", "$2x - 5$"), correct: false },
      ];
      return {
        skill: L(
          "Producto de binomios con raíces cuadradas",
          "Product of binomials with square roots",
        ),
        statement: L(
          "Desarrolle el producto notable:\n\n$$(\\sqrt{x}-1)(2\\sqrt{x}+5)$$",
          "Expand the special product:\n\n$$(\\sqrt{x}-1)(2\\sqrt{x}+5)$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Ambos factores comparten $\\sqrt{x}$: trátala como si fuera una sola letra y distribuye normalmente.",
            "Both factors share $\\sqrt{x}$: treat it as a single letter and distribute normally.",
          ),
          L(
            "Al multiplicar raíces: $\\sqrt{x} \\cdot \\sqrt{x} = x$ y $\\sqrt{x} \\cdot 2\\sqrt{x} = 2x$; los radicales se combinan solo si son semejantes.",
            "When multiplying roots: $\\sqrt{x} \\cdot \\sqrt{x} = x$ and $\\sqrt{x} \\cdot 2\\sqrt{x} = 2x$; radicals combine only if like.",
          ),
          L(
            "Los cuatro productos: $\\sqrt{x} \\cdot 2\\sqrt{x} = 2x$, $\\sqrt{x} \\cdot 5 = 5\\sqrt{x}$, $(-1) \\cdot 2\\sqrt{x} = -2\\sqrt{x}$ y $(-1) \\cdot 5 = -5$.",
            "The four products: $\\sqrt{x} \\cdot 2\\sqrt{x} = 2x$, $\\sqrt{x} \\cdot 5 = 5\\sqrt{x}$, $(-1) \\cdot 2\\sqrt{x} = -2\\sqrt{x}$ and $(-1) \\cdot 5 = -5$.",
          ),
        ],
        answerDisplay: L(
          "$(\\sqrt{x}-1)(2\\sqrt{x}+5) = 2x + 3\\sqrt{x} - 5$",
          "$(\\sqrt{x}-1)(2\\sqrt{x}+5) = 2x + 3\\sqrt{x} - 5$",
        ),
        solution: [
          step(
            "given",
            "El producto $(\\sqrt{x}-1)(2\\sqrt{x}+5)$, binomios con la raíz $\\sqrt{x}$ como término común.",
            "The product $(\\sqrt{x}-1)(2\\sqrt{x}+5)$, binomials with the root $\\sqrt{x}$ as common term.",
          ),
          step(
            "approach",
            "Distribuir los cuatro productos parciales usando $\\sqrt{x} \\cdot \\sqrt{x} = x$ y combinando los radicales semejantes.",
            "Distribute the four partial products using $\\sqrt{x} \\cdot \\sqrt{x} = x$ and combining the like radicals.",
          ),
          step(
            "calculation",
            "$(\\sqrt{x}-1)(2\\sqrt{x}+5) = 2x + 5\\sqrt{x} - 2\\sqrt{x} - 5$<br>$= 2x + 3\\sqrt{x} - 5$",
            "$(\\sqrt{x}-1)(2\\sqrt{x}+5) = 2x + 5\\sqrt{x} - 2\\sqrt{x} - 5$<br>$= 2x + 3\\sqrt{x} - 5$",
          ),
          step(
            "result",
            "$(\\sqrt{x}-1)(2\\sqrt{x}+5) = 2x + 3\\sqrt{x} - 5$. Control: con $x = 4$: $(2-1)(2 \\cdot 2+5) = 1 \\cdot 9 = 9$ y $2 \\cdot 4 + 3 \\cdot 2 - 5 = 9$ ✓.",
            "$(\\sqrt{x}-1)(2\\sqrt{x}+5) = 2x + 3\\sqrt{x} - 5$. Check: at $x = 4$: $(2-1)(2 \\cdot 2+5) = 1 \\cdot 9 = 9$ and $2 \\cdot 4 + 3 \\cdot 2 - 5 = 9$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S1.29 — (√(3x)+5)² = 3x+10√(3x)+25. */
  template(
    {
      id: "pn-uees-29",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "special-products",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["special-products", "perfect-square", "radicals"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "1 · 29",
        page: 1,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$3x + 10\\sqrt{3x} + 25$", "$3x + 10\\sqrt{3x} + 25$"), correct: true },
        { id: "b", text: L("$3x + 5\\sqrt{3x} + 25$", "$3x + 5\\sqrt{3x} + 25$"), correct: false },
        { id: "c", text: L("$3x - 10\\sqrt{3x} + 25$", "$3x - 10\\sqrt{3x} + 25$"), correct: false },
        { id: "d", text: L("$3x + 25$", "$3x + 25$"), correct: false },
      ];
      return {
        skill: L(
          "Binomio al cuadrado con un radical",
          "Squaring a binomial with a radical",
        ),
        statement: L(
          "Desarrolle el producto notable:\n\n$$(\\sqrt{3x}+5)^{2}$$",
          "Expand the special product:\n\n$$(\\sqrt{3x}+5)^{2}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Es un binomio al cuadrado donde el primer término es la raíz $\\sqrt{3x}$: usa la identidad completa.",
            "It is a squared binomial whose first term is the root $\\sqrt{3x}$: use the full identity.",
          ),
          L(
            "$(a+b)^{2} = a^{2} + 2ab + b^{2}$ con $a = \\sqrt{3x}$: al elevar al cuadrado, la raíz desaparece.",
            "$(a+b)^{2} = a^{2} + 2ab + b^{2}$ with $a = \\sqrt{3x}$: squaring removes the root.",
          ),
          L(
            "Aquí $a = \\sqrt{3x}$ y $b = 5$: $a^{2} = 3x$ y el doble producto es $2 \\cdot \\sqrt{3x} \\cdot 5 = 10\\sqrt{3x}$.",
            "Here $a = \\sqrt{3x}$ and $b = 5$: $a^{2} = 3x$ and the double product is $2 \\cdot \\sqrt{3x} \\cdot 5 = 10\\sqrt{3x}$.",
          ),
        ],
        answerDisplay: L(
          "$(\\sqrt{3x}+5)^{2} = 3x + 10\\sqrt{3x} + 25$",
          "$(\\sqrt{3x}+5)^{2} = 3x + 10\\sqrt{3x} + 25$",
        ),
        solution: [
          step(
            "given",
            "El cuadrado $(\\sqrt{3x}+5)^{2}$.",
            "The square $(\\sqrt{3x}+5)^{2}$.",
          ),
          step(
            "approach",
            "Identidad del binomio al cuadrado con $a = \\sqrt{3x}$ y $b = 5$; el término central conserva la raíz.",
            "Squared-binomial identity with $a = \\sqrt{3x}$ and $b = 5$; the middle term keeps the root.",
          ),
          step(
            "calculation",
            "$(\\sqrt{3x}+5)^{2} = (\\sqrt{3x})^{2} + 2 \\cdot \\sqrt{3x} \\cdot 5 + 5^{2}$<br>$= 3x + 10\\sqrt{3x} + 25$",
            "$(\\sqrt{3x}+5)^{2} = (\\sqrt{3x})^{2} + 2 \\cdot \\sqrt{3x} \\cdot 5 + 5^{2}$<br>$= 3x + 10\\sqrt{3x} + 25$",
          ),
          step(
            "result",
            "$(\\sqrt{3x}+5)^{2} = 3x + 10\\sqrt{3x} + 25$. Control: con $x = 3$: $(3+5)^{2} = 64$ y $9 + 30 + 25 = 64$ ✓.",
            "$(\\sqrt{3x}+5)^{2} = 3x + 10\\sqrt{3x} + 25$. Check: at $x = 3$: $(3+5)^{2} = 64$ and $9 + 30 + 25 = 64$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S1.30 — (√y−3)(√y+3) = y−9. */
  template(
    {
      id: "pn-uees-30",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "special-products",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 90,
      tags: ["special-products", "difference-of-squares", "radicals"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "1 · 30",
        page: 1,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$y - 9$", "$y - 9$"), correct: true },
        { id: "b", text: L("$y + 9$", "$y + 9$"), correct: false },
        { id: "c", text: L("$y - 3$", "$y - 3$"), correct: false },
        { id: "d", text: L("$y - 6$", "$y - 6$"), correct: false },
      ];
      return {
        skill: L(
          "Conjugados con radical: suma por diferencia",
          "Conjugates with a radical: sum times difference",
        ),
        statement: L(
          "Desarrolle el producto notable:\n\n$$(\\sqrt{y}-3)(\\sqrt{y}+3)$$",
          "Expand the special product:\n\n$$(\\sqrt{y}-3)(\\sqrt{y}+3)$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Los dos binomios son conjugados (solo cambia el signo): es una suma por diferencia.",
            "The two binomials are conjugates (only the sign changes): it is a sum times a difference.",
          ),
          L(
            "$(a-b)(a+b) = a^{2} - b^{2}$: los términos cruzados se cancelan solos.",
            "$(a-b)(a+b) = a^{2} - b^{2}$: the cross terms cancel by themselves.",
          ),
          L(
            "Aquí $a = \\sqrt{y}$ y $b = 3$: al elevar, $a^{2} = y$ (la raíz desaparece) y $b^{2} = 9$.",
            "Here $a = \\sqrt{y}$ and $b = 3$: squaring gives $a^{2} = y$ (the root disappears) and $b^{2} = 9$.",
          ),
        ],
        answerDisplay: L(
          "$(\\sqrt{y}-3)(\\sqrt{y}+3) = y - 9$",
          "$(\\sqrt{y}-3)(\\sqrt{y}+3) = y - 9$",
        ),
        solution: [
          step(
            "given",
            "El producto $(\\sqrt{y}-3)(\\sqrt{y}+3)$: binomios conjugados.",
            "The product $(\\sqrt{y}-3)(\\sqrt{y}+3)$: conjugate binomials.",
          ),
          step(
            "approach",
            "Suma por diferencia: el resultado es la diferencia de los cuadrados de $\\sqrt{y}$ y de $3$.",
            "Sum times difference: the result is the difference of the squares of $\\sqrt{y}$ and $3$.",
          ),
          step(
            "calculation",
            "$(\\sqrt{y}-3)(\\sqrt{y}+3) = (\\sqrt{y})^{2} - 3^{2} = y - 9$",
            "$(\\sqrt{y}-3)(\\sqrt{y}+3) = (\\sqrt{y})^{2} - 3^{2} = y - 9$",
          ),
          step(
            "result",
            "$(\\sqrt{y}-3)(\\sqrt{y}+3) = y - 9$. Control: con $y = 16$: $(4-3)(4+3) = 7$ y $16 - 9 = 7$ ✓.",
            "$(\\sqrt{y}-3)(\\sqrt{y}+3) = y - 9$. Check: at $y = 16$: $(4-3)(4+3) = 7$ and $16 - 9 = 7$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S1.31 — (2s−1)(2s+1) = 4s²−1. */
  template(
    {
      id: "pn-uees-31",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "special-products",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 75,
      tags: ["special-products", "difference-of-squares"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "1 · 31",
        page: 1,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$4s^{2} - 1$", "$4s^{2} - 1$"), correct: true },
        { id: "b", text: L("$4s^{2} + 1$", "$4s^{2} + 1$"), correct: false },
        { id: "c", text: L("$4s^{2} - 2s + 1$", "$4s^{2} - 2s + 1$"), correct: false },
        { id: "d", text: L("$4s^{2} - s$", "$4s^{2} - s$"), correct: false },
      ];
      return {
        skill: L(
          "Conjugados (suma por diferencia)",
          "Conjugate binomials (sum times difference)",
        ),
        statement: L(
          "Desarrolle el producto notable:\n\n$$(2s-1)(2s+1)$$",
          "Expand the special product:\n\n$$(2s-1)(2s+1)$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Son conjugados: solo cambia el signo del término independiente.",
            "They are conjugates: only the sign of the constant term changes.",
          ),
          L(
            "$(a-b)(a+b) = a^{2} - b^{2}$.",
            "$(a-b)(a+b) = a^{2} - b^{2}$.",
          ),
          L(
            "Aquí $a = 2s$ y $b = 1$: los cuadrados son $(2s)^{2}$ y $1^{2}$.",
            "Here $a = 2s$ and $b = 1$: the squares are $(2s)^{2}$ and $1^{2}$.",
          ),
        ],
        answerDisplay: L(
          "$(2s-1)(2s+1) = 4s^{2} - 1$",
          "$(2s-1)(2s+1) = 4s^{2} - 1$",
        ),
        solution: [
          step(
            "given",
            "El producto $(2s-1)(2s+1)$: binomios conjugados.",
            "The product $(2s-1)(2s+1)$: conjugate binomials.",
          ),
          step(
            "approach",
            "Es una suma por diferencia: el resultado es la diferencia de los cuadrados.",
            "It is a sum times a difference: the result is the difference of the squares.",
          ),
          step(
            "calculation",
            "$(2s-1)(2s+1) = (2s)^{2} - 1^{2} = 4s^{2} - 1$",
            "$(2s-1)(2s+1) = (2s)^{2} - 1^{2} = 4s^{2} - 1$",
          ),
          step(
            "result",
            "$(2s-1)(2s+1) = 4s^{2} - 1$. Control: con $s = 2$: $(4-1)(4+1) = 3 \\cdot 5 = 15$ y $16 - 1 = 15$ ✓.",
            "$(2s-1)(2s+1) = 4s^{2} - 1$. Check: at $s = 2$: $(4-1)(4+1) = 3 \\cdot 5 = 15$ and $16 - 1 = 15$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S1.32 — (a²+2b)(a²−2b) = a⁴−4b². */
  template(
    {
      id: "pn-uees-32",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "special-products",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 90,
      tags: ["special-products", "difference-of-squares"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "1 · 32",
        page: 1,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$a^{4} - 4b^{2}$", "$a^{4} - 4b^{2}$"), correct: true },
        { id: "b", text: L("$a^{4} + 4b^{2}$", "$a^{4} + 4b^{2}$"), correct: false },
        { id: "c", text: L("$a^{4} - 2b^{2}$", "$a^{4} - 2b^{2}$"), correct: false },
        { id: "d", text: L("$a^{4} - 4b$", "$a^{4} - 4b$"), correct: false },
      ];
      return {
        skill: L(
          "Conjugados con términos compuestos",
          "Conjugates with compound terms",
        ),
        statement: L(
          "Desarrolle el producto notable:\n\n$$(a^{2}+2b)(a^{2}-2b)$$",
          "Expand the special product:\n\n$$(a^{2}+2b)(a^{2}-2b)$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "De nuevo conjugados: primero $a^{2}$, con signos opuestos en $2b$.",
            "Conjugates again: first $a^{2}$, with opposite signs on $2b$.",
          ),
          L(
            "$(a-b)(a+b) = a^{2} - b^{2}$ también funciona cuando $a$ y $b$ son expresiones compuestas.",
            "$(a-b)(a+b) = a^{2} - b^{2}$ also works when $a$ and $b$ are compound expressions.",
          ),
          L(
            "Aquí el «$a$» de la identidad es $a^{2}$ y el «$b$» es $2b$: el resultado es $\\left(a^{2}\\right)^{2} - (2b)^{2}$.",
            "Here the identity's «$a$» is $a^{2}$ and «$b$» is $2b$: the result is $\\left(a^{2}\\right)^{2} - (2b)^{2}$.",
          ),
        ],
        answerDisplay: L(
          "$(a^{2}+2b)(a^{2}-2b) = a^{4} - 4b^{2}$",
          "$(a^{2}+2b)(a^{2}-2b) = a^{4} - 4b^{2}$",
        ),
        solution: [
          step(
            "given",
            "El producto $(a^{2}+2b)(a^{2}-2b)$: conjugados con términos compuestos.",
            "The product $(a^{2}+2b)(a^{2}-2b)$: conjugates with compound terms.",
          ),
          step(
            "approach",
            "Suma por diferencia con $a = a^{2}$ y $b = 2b$: diferencia de los cuadrados de esos bloques.",
            "Sum times difference with $a = a^{2}$ and $b = 2b$: difference of the squares of those blocks.",
          ),
          step(
            "calculation",
            "$(a^{2}+2b)(a^{2}-2b) = \\left(a^{2}\\right)^{2} - (2b)^{2} = a^{4} - 4b^{2}$",
            "$(a^{2}+2b)(a^{2}-2b) = \\left(a^{2}\\right)^{2} - (2b)^{2} = a^{4} - 4b^{2}$",
          ),
          step(
            "result",
            "$(a^{2}+2b)(a^{2}-2b) = a^{4} - 4b^{2}$. Control: con $a = 1$, $b = 1$: $(1+2)(1-2) = 3 \\cdot (-1) = -3$ y $1 - 4 = -3$ ✓.",
            "$(a^{2}+2b)(a^{2}-2b) = a^{4} - 4b^{2}$. Check: at $a = 1$, $b = 1$: $(1+2)(1-2) = 3 \\cdot (-1) = -3$ and $1 - 4 = -3$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S1.33 — (x²−3)(x+4) = x³+4x²−3x−12. */
  template(
    {
      id: "pn-uees-33",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "special-products",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["special-products", "polynomial-product"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "1 · 33",
        page: 1,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$x^{3} + 4x^{2} - 3x - 12$", "$x^{3} + 4x^{2} - 3x - 12$"), correct: true },
        { id: "b", text: L("$x^{3} - 12x^{2} + 4x - 3$", "$x^{3} - 12x^{2} + 4x - 3$"), correct: false },
        { id: "c", text: L("$x^{3} + 4x^{2} + 3x + 12$", "$x^{3} + 4x^{2} + 3x + 12$"), correct: false },
        { id: "d", text: L("$x^{3} + 4x^{2} - 12$", "$x^{3} + 4x^{2} - 12$"), correct: false },
      ];
      return {
        skill: L(
          "Distribución de binomios con potencias",
          "Distributing binomials with powers",
        ),
        statement: L(
          "Desarrolle el producto notable:\n\n$$(x^{2}-3)(x+4)$$",
          "Expand the special product:\n\n$$(x^{2}-3)(x+4)$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "No es una identidad corta: distribuye CADA término del primer binomio sobre los dos del segundo (cuatro productos).",
            "No short identity here: distribute EACH term of the first binomial over the two of the second (four products).",
          ),
          L(
            "$(a+b)(c+d) = ac + ad + bc + bd$; aquí $a = x^{2}$, así que aparecen potencias $x^{3}$ y $x^{2}$.",
            "$(a+b)(c+d) = ac + ad + bc + bd$; here $a = x^{2}$, so $x^{3}$ and $x^{2}$ powers appear.",
          ),
          L(
            "Los cuatro productos: $x^{2} \\cdot x = x^{3}$, $x^{2} \\cdot 4 = 4x^{2}$, $(-3) \\cdot x = -3x$ y $(-3) \\cdot 4 = -12$.",
            "The four products: $x^{2} \\cdot x = x^{3}$, $x^{2} \\cdot 4 = 4x^{2}$, $(-3) \\cdot x = -3x$ and $(-3) \\cdot 4 = -12$.",
          ),
        ],
        answerDisplay: L(
          "$(x^{2}-3)(x+4) = x^{3} + 4x^{2} - 3x - 12$",
          "$(x^{2}-3)(x+4) = x^{3} + 4x^{2} - 3x - 12$",
        ),
        solution: [
          step(
            "given",
            "El producto $(x^{2}-3)(x+4)$, un binomio con potencia por un binomio lineal.",
            "The product $(x^{2}-3)(x+4)$, a binomial with a power times a linear binomial.",
          ),
          step(
            "approach",
            "Distribución completa término a término; no hay semejantes que reducir, así que quedan cuatro términos.",
            "Full term-by-term distribution; there are no like terms to combine, so four terms remain.",
          ),
          step(
            "calculation",
            "$(x^{2}-3)(x+4) = x^{3} + 4x^{2} - 3x - 12$",
            "$(x^{2}-3)(x+4) = x^{3} + 4x^{2} - 3x - 12$",
          ),
          step(
            "result",
            "$(x^{2}-3)(x+4) = x^{3} + 4x^{2} - 3x - 12$. Control: con $x = 2$: $(4-3)(2+4) = 1 \\cdot 6 = 6$ y $8 + 16 - 6 - 12 = 6$ ✓.",
            "$(x^{2}-3)(x+4) = x^{3} + 4x^{2} - 3x - 12$. Check: at $x = 2$: $(4-3)(2+4) = 1 \\cdot 6 = 6$ and $8 + 16 - 6 - 12 = 6$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S1.34 — (x+1)(x²+x+3) = x³+2x²+4x+3. */
  template(
    {
      id: "pn-uees-34",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "special-products",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["special-products", "polynomial-product"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "1 · 34",
        page: 1,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$x^{3} + 2x^{2} + 4x + 3$", "$x^{3} + 2x^{2} + 4x + 3$"), correct: true },
        { id: "b", text: L("$x^{3} + x^{2} + 4x + 3$", "$x^{3} + x^{2} + 4x + 3$"), correct: false },
        { id: "c", text: L("$x^{3} + 2x^{2} - 4x + 3$", "$x^{3} + 2x^{2} - 4x + 3$"), correct: false },
        { id: "d", text: L("$x^{3} + 2x^{2} + 4x - 3$", "$x^{3} + 2x^{2} + 4x - 3$"), correct: false },
      ];
      return {
        skill: L(
          "Binomio por trinomio (distribución completa)",
          "Binomial times a trinomial (full distribution)",
        ),
        statement: L(
          "Desarrolle el producto notable:\n\n$$(x+1)(x^{2}+x+3)$$",
          "Expand the special product:\n\n$$(x+1)(x^{2}+x+3)$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Es un binomio por un trinomio: distribuye los DOS términos del primero sobre los TRES del segundo.",
            "It is a binomial times a trinomial: distribute the TWO terms of the first over the THREE of the second.",
          ),
          L(
            "$(a+b)(c+d+e) = ac + ad + ae + bc + bd + be$; al final reduces los semejantes.",
            "$(a+b)(c+d+e) = ac + ad + ae + bc + bd + be$; then combine like terms.",
          ),
          L(
            "Primero $x \\cdot (x^{2}+x+3)$ y luego $1 \\cdot (x^{2}+x+3)$: verás que los términos en $x^{2}$ y en $x$ se repiten.",
            "First $x \\cdot (x^{2}+x+3)$ and then $1 \\cdot (x^{2}+x+3)$: you will see the $x^{2}$ and $x$ terms repeat.",
          ),
        ],
        answerDisplay: L(
          "$(x+1)(x^{2}+x+3) = x^{3} + 2x^{2} + 4x + 3$",
          "$(x+1)(x^{2}+x+3) = x^{3} + 2x^{2} + 4x + 3$",
        ),
        solution: [
          step(
            "given",
            "El producto $(x+1)(x^{2}+x+3)$.",
            "The product $(x+1)(x^{2}+x+3)$.",
          ),
          step(
            "approach",
            "Distribuir el $x$ y el $1$ sobre el trinomio completo, y luego reducir los semejantes.",
            "Distribute the $x$ and the $1$ over the whole trinomial, then combine like terms.",
          ),
          step(
            "calculation",
            "$(x+1)(x^{2}+x+3) = x^{3} + x^{2} + 3x + x^{2} + x + 3$<br>$= x^{3} + 2x^{2} + 4x + 3$",
            "$(x+1)(x^{2}+x+3) = x^{3} + x^{2} + 3x + x^{2} + x + 3$<br>$= x^{3} + 2x^{2} + 4x + 3$",
          ),
          step(
            "result",
            "$(x+1)(x^{2}+x+3) = x^{3} + 2x^{2} + 4x + 3$. Control: con $x = 2$: $(3)(4+2+3) = 3 \\cdot 9 = 27$ y $8 + 8 + 8 + 3 = 27$ ✓.",
            "$(x+1)(x^{2}+x+3) = x^{3} + 2x^{2} + 4x + 3$. Check: at $x = 2$: $(3)(4+2+3) = 3 \\cdot 9 = 27$ and $8 + 8 + 8 + 3 = 27$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S1.35 — (x²−4)(3x²+2x−1) = 3x⁴+2x³−13x²−8x+4. */
  template(
    {
      id: "pn-uees-35",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "special-products",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["special-products", "polynomial-product"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "1 · 35",
        page: 1,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$3x^{4} + 2x^{3} - 13x^{2} - 8x + 4$", "$3x^{4} + 2x^{3} - 13x^{2} - 8x + 4$"), correct: true },
        { id: "b", text: L("$3x^{4} + 2x^{3} - 13x^{2} - 8x - 4$", "$3x^{4} + 2x^{3} - 13x^{2} - 8x - 4$"), correct: false },
        { id: "c", text: L("$3x^{4} - 13x^{2} - 8x + 4$", "$3x^{4} - 13x^{2} - 8x + 4$"), correct: false },
        { id: "d", text: L("$3x^{4} + 2x^{3} - 13x^{2} + 8x + 4$", "$3x^{4} + 2x^{3} - 13x^{2} + 8x + 4$"), correct: false },
      ];
      return {
        skill: L(
          "Binomio por trinomio con potencias superiores",
          "Binomial times a trinomial with higher powers",
        ),
        statement: L(
          "Desarrolle el producto notable:\n\n$$(x^{2}-4)(3x^{2}+2x-1)$$",
          "Expand the special product:\n\n$$(x^{2}-4)(3x^{2}+2x-1)$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Distribuye $x^{2}$ y $-4$ sobre los TRES términos del trinomio: son seis productos parciales.",
            "Distribute $x^{2}$ and $-4$ over the THREE terms of the trinomial: that is six partial products.",
          ),
          L(
            "$(a+b)(c+d+e) = ac + ad + ae + bc + bd + be$, cuidando el signo del $-4$ en los tres últimos.",
            "$(a+b)(c+d+e) = ac + ad + ae + bc + bd + be$, watching the sign of $-4$ in the last three.",
          ),
          L(
            "Los productos con $-4$: $-4 \\cdot 3x^{2} = -12x^{2}$, $-4 \\cdot 2x = -8x$ y $-4 \\cdot (-1) = 4$; luego reduce los $x^{2}$.",
            "The products with $-4$: $-4 \\cdot 3x^{2} = -12x^{2}$, $-4 \\cdot 2x = -8x$ and $-4 \\cdot (-1) = 4$; then combine the $x^{2}$ terms.",
          ),
        ],
        answerDisplay: L(
          "$(x^{2}-4)(3x^{2}+2x-1) = 3x^{4} + 2x^{3} - 13x^{2} - 8x + 4$",
          "$(x^{2}-4)(3x^{2}+2x-1) = 3x^{4} + 2x^{3} - 13x^{2} - 8x + 4$",
        ),
        solution: [
          step(
            "given",
            "El producto $(x^{2}-4)(3x^{2}+2x-1)$.",
            "The product $(x^{2}-4)(3x^{2}+2x-1)$.",
          ),
          step(
            "approach",
            "Distribución completa de los dos términos sobre los tres, con cuidado de los signos; al final se reducen los términos en $x^{2}$.",
            "Full distribution of the two terms over the three, watching the signs; at the end the $x^{2}$ terms combine.",
          ),
          step(
            "calculation",
            "$(x^{2}-4)(3x^{2}+2x-1) = 3x^{4} + 2x^{3} - x^{2} - 12x^{2} - 8x + 4$<br>$= 3x^{4} + 2x^{3} - 13x^{2} - 8x + 4$",
            "$(x^{2}-4)(3x^{2}+2x-1) = 3x^{4} + 2x^{3} - x^{2} - 12x^{2} - 8x + 4$<br>$= 3x^{4} + 2x^{3} - 13x^{2} - 8x + 4$",
          ),
          step(
            "result",
            "$(x^{2}-4)(3x^{2}+2x-1) = 3x^{4} + 2x^{3} - 13x^{2} - 8x + 4$. Control: con $x = 1$: $(1-4)(3+2-1) = (-3)(4) = -12$ y $3 + 2 - 13 - 8 + 4 = -12$ ✓.",
            "$(x^{2}-4)(3x^{2}+2x-1) = 3x^{4} + 2x^{3} - 13x^{2} - 8x + 4$. Check: at $x = 1$: $(1-4)(3+2-1) = (-3)(4) = -12$ and $3 + 2 - 13 - 8 + 4 = -12$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S1.36 — (3y−2)(4y³+2y²−3y) = 12y⁴−2y³−13y²+6y. */
  template(
    {
      id: "pn-uees-36",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "special-products",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["special-products", "polynomial-product"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "1 · 36",
        page: 1,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$12y^{4} - 2y^{3} - 13y^{2} + 6y$", "$12y^{4} - 2y^{3} - 13y^{2} + 6y$"), correct: true },
        { id: "b", text: L("$12y^{4} + 2y^{3} - 13y^{2} + 6y$", "$12y^{4} + 2y^{3} - 13y^{2} + 6y$"), correct: false },
        { id: "c", text: L("$12y^{4} - 2y^{3} + 13y^{2} + 6y$", "$12y^{4} - 2y^{3} + 13y^{2} + 6y$"), correct: false },
        { id: "d", text: L("$12y^{4} - 13y^{2} + 6y$", "$12y^{4} - 13y^{2} + 6y$"), correct: false },
      ];
      return {
        skill: L(
          "Binomio por trinomio y reducción de semejantes",
          "Binomial times a trinomial and combining like terms",
        ),
        statement: L(
          "Desarrolle el producto notable:\n\n$$(3y-2)(4y^{3}+2y^{2}-3y)$$",
          "Expand the special product:\n\n$$(3y-2)(4y^{3}+2y^{2}-3y)$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Seis productos parciales: distribuye $3y$ y $-2$ sobre cada término del trinomio.",
            "Six partial products: distribute $3y$ and $-2$ over each term of the trinomial.",
          ),
          L(
            "$(a+b)(c+d+e) = ac + ad + ae + bc + bd + be$; presta atención a los signos de los tres últimos.",
            "$(a+b)(c+d+e) = ac + ad + ae + bc + bd + be$; pay attention to the signs of the last three.",
          ),
          L(
            "Los productos con $-2$: $-2 \\cdot 4y^{3} = -8y^{3}$, $-2 \\cdot 2y^{2} = -4y^{2}$ y $-2 \\cdot (-3y) = 6y$; reduce los $y^{3}$ y los $y^{2}$.",
            "The products with $-2$: $-2 \\cdot 4y^{3} = -8y^{3}$, $-2 \\cdot 2y^{2} = -4y^{2}$ and $-2 \\cdot (-3y) = 6y$; combine the $y^{3}$ and $y^{2}$ terms.",
          ),
        ],
        answerDisplay: L(
          "$(3y-2)(4y^{3}+2y^{2}-3y) = 12y^{4} - 2y^{3} - 13y^{2} + 6y$",
          "$(3y-2)(4y^{3}+2y^{2}-3y) = 12y^{4} - 2y^{3} - 13y^{2} + 6y$",
        ),
        solution: [
          step(
            "given",
            "El producto $(3y-2)(4y^{3}+2y^{2}-3y)$.",
            "The product $(3y-2)(4y^{3}+2y^{2}-3y)$.",
          ),
          step(
            "approach",
            "Distribución completa de $3y$ y $-2$ sobre el trinomio y reducción de los semejantes en $y^{3}$ y $y^{2}$.",
            "Full distribution of $3y$ and $-2$ over the trinomial and combining the like terms in $y^{3}$ and $y^{2}$.",
          ),
          step(
            "calculation",
            "$(3y-2)(4y^{3}+2y^{2}-3y) = 12y^{4} + 6y^{3} - 9y^{2} - 8y^{3} - 4y^{2} + 6y$<br>$= 12y^{4} - 2y^{3} - 13y^{2} + 6y$",
            "$(3y-2)(4y^{3}+2y^{2}-3y) = 12y^{4} + 6y^{3} - 9y^{2} - 8y^{3} - 4y^{2} + 6y$<br>$= 12y^{4} - 2y^{3} - 13y^{2} + 6y$",
          ),
          step(
            "result",
            "$(3y-2)(4y^{3}+2y^{2}-3y) = 12y^{4} - 2y^{3} - 13y^{2} + 6y$. Control: con $y = 1$: $(3-2)(4+2-3) = 1 \\cdot 3 = 3$ y $12 - 2 - 13 + 6 = 3$ ✓.",
            "$(3y-2)(4y^{3}+2y^{2}-3y) = 12y^{4} - 2y^{3} - 13y^{2} + 6y$. Check: at $y = 1$: $(3-2)(4+2-3) = 1 \\cdot 3 = 3$ and $12 - 2 - 13 + 6 = 3$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S1.37 — t{3(t+2)(t−4)+5[3t(t−7)]} = 18t³−111t²−24t. */
  template(
    {
      id: "pn-uees-37",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "special-products",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 180,
      tags: ["special-products", "nested-products", "distribution"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "1 · 37",
        page: 1,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$18t^{3} - 111t^{2} - 24t$", "$18t^{3} - 111t^{2} - 24t$"), correct: true },
        { id: "b", text: L("$18t^{3} + 111t^{2} - 24t$", "$18t^{3} + 111t^{2} - 24t$"), correct: false },
        { id: "c", text: L("$18t^{3} - 111t^{2} + 24t$", "$18t^{3} - 111t^{2} + 24t$"), correct: false },
        { id: "d", text: L("$18t^{3} - 24t$", "$18t^{3} - 24t$"), correct: false },
      ];
      return {
        skill: L(
          "Corchetes anidados: productos internos y distribución final",
          "Nested brackets: inner products and the final distribution",
        ),
        statement: L(
          "Desarrolle el producto notable:\n\n$$t\\left\\{3(t+2)(t-4)+5\\left[3t(t-7)\\right]\\right\\}$$",
          "Expand the special product:\n\n$$t\\left\\{3(t+2)(t-4)+5\\left[3t(t-7)\\right]\\right\\}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Trabaja de adentro hacia afuera: primero los dos productos internos, luego la suma de los corchetes y al final multiplica por la $t$ exterior.",
            "Work from the inside out: first the two inner products, then the sum inside the brackets, and finally multiply by the outer $t$.",
          ),
          L(
            "Regla de signos: $(t+2)(t-4) = t^{2} - 2t - 8$ y $3t(t-7) = 3t^{2} - 21t$.",
            "Sign rule: $(t+2)(t-4) = t^{2} - 2t - 8$ and $3t(t-7) = 3t^{2} - 21t$.",
          ),
          L(
            "Dentro queda $3t^{2} - 6t - 24 + 15t^{2} - 105t$; reduce ANTES de multiplicar por $t$.",
            "Inside you get $3t^{2} - 6t - 24 + 15t^{2} - 105t$; combine BEFORE multiplying by $t$.",
          ),
        ],
        answerDisplay: L(
          "$t\\left\\{3(t+2)(t-4)+5\\left[3t(t-7)\\right]\\right\\} = 18t^{3} - 111t^{2} - 24t$",
          "$t\\left\\{3(t+2)(t-4)+5\\left[3t(t-7)\\right]\\right\\} = 18t^{3} - 111t^{2} - 24t$",
        ),
        solution: [
          step(
            "given",
            "El producto anidado $t\\left\\{3(t+2)(t-4)+5\\left[3t(t-7)\\right]\\right\\}$.",
            "The nested product $t\\left\\{3(t+2)(t-4)+5\\left[3t(t-7)\\right]\\right\\}$.",
          ),
          step(
            "approach",
            "Resolver de adentro hacia afuera: expandir los dos binomios internos, sumar dentro de la llave y distribuir la $t$ exterior.",
            "Solve from the inside out: expand the two inner binomials, add inside the brace, and distribute the outer $t$.",
          ),
          step(
            "calculation",
            "$(t+2)(t-4) = t^{2} - 2t - 8$, así $3(t^{2}-2t-8) = 3t^{2} - 6t - 24$<br>$5 \\cdot 3t(t-7) = 5(3t^{2} - 21t) = 15t^{2} - 105t$<br>Suma interna: $3t^{2} - 6t - 24 + 15t^{2} - 105t = 18t^{2} - 111t - 24$<br>Por la $t$ exterior: $t\\left(18t^{2} - 111t - 24\\right) = 18t^{3} - 111t^{2} - 24t$",
            "$(t+2)(t-4) = t^{2} - 2t - 8$, so $3(t^{2}-2t-8) = 3t^{2} - 6t - 24$<br>$5 \\cdot 3t(t-7) = 5(3t^{2} - 21t) = 15t^{2} - 105t$<br>Inner sum: $3t^{2} - 6t - 24 + 15t^{2} - 105t = 18t^{2} - 111t - 24$<br>By the outer $t$: $t\\left(18t^{2} - 111t - 24\\right) = 18t^{3} - 111t^{2} - 24t$",
          ),
          step(
            "result",
            "$t\\left\\{3(t+2)(t-4)+5\\left[3t(t-7)\\right]\\right\\} = 18t^{3} - 111t^{2} - 24t$. Control: con $t = 1$: $1 \\cdot \\left[3(3)(-3)+5(3)(-6)\\right] = -27 - 90 = -117$ y $18 - 111 - 24 = -117$ ✓.",
            "$t\\left\\{3(t+2)(t-4)+5\\left[3t(t-7)\\right]\\right\\} = 18t^{3} - 111t^{2} - 24t$. Check: at $t = 1$: $1 \\cdot \\left[3(3)(-3)+5(3)(-6)\\right] = -27 - 90 = -117$ and $18 - 111 - 24 = -117$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S1.38 — [(2z+1)(2z−1)](4z²+1) = 16z⁴−1. */
  template(
    {
      id: "pn-uees-38",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "special-products",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["special-products", "difference-of-squares"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "1 · 38",
        page: 1,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$16z^{4} - 1$", "$16z^{4} - 1$"), correct: true },
        { id: "b", text: L("$16z^{4} + 1$", "$16z^{4} + 1$"), correct: false },
        { id: "c", text: L("$16z^{4} - 4z^{2} + 1$", "$16z^{4} - 4z^{2} + 1$"), correct: false },
        { id: "d", text: L("$8z^{4} - 1$", "$8z^{4} - 1$"), correct: false },
      ];
      return {
        skill: L(
          "Suma por diferencia dos veces seguidas",
          "Sum times difference twice in a row",
        ),
        statement: L(
          "Desarrolle el producto notable:\n\n$$\\left[(2z+1)(2z-1)\\right](4z^{2}+1)$$",
          "Expand the special product:\n\n$$\\left[(2z+1)(2z-1)\\right](4z^{2}+1)$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El corchete esconde una suma por diferencia: resuélvela primero.",
            "The bracket hides a sum times a difference: resolve it first.",
          ),
          L(
            "$(a-b)(a+b) = a^{2} - b^{2}$; al terminar el corchete quedará OTRO producto conjugado.",
            "$(a-b)(a+b) = a^{2} - b^{2}$; after the bracket there will be ANOTHER conjugate product.",
          ),
          L(
            "El corchete da $4z^{2} - 1$, y entonces queda $(4z^{2}-1)(4z^{2}+1)$, de nuevo suma por diferencia.",
            "The bracket gives $4z^{2} - 1$, and then $(4z^{2}-1)(4z^{2}+1)$ remains — a sum times a difference again.",
          ),
        ],
        answerDisplay: L(
          "$\\left[(2z+1)(2z-1)\\right](4z^{2}+1) = 16z^{4} - 1$",
          "$\\left[(2z+1)(2z-1)\\right](4z^{2}+1) = 16z^{4} - 1$",
        ),
        solution: [
          step(
            "given",
            "El producto $\\left[(2z+1)(2z-1)\\right](4z^{2}+1)$: conjugados por dentro y por fuera.",
            "The product $\\left[(2z+1)(2z-1)\\right](4z^{2}+1)$: conjugates inside and outside.",
          ),
          step(
            "approach",
            "Aplicar la identidad de conjugados al corchete y luego otra vez al resultado: dos diferencias de cuadrados encadenadas.",
            "Apply the conjugate identity to the bracket and then again to the result: two chained differences of squares.",
          ),
          step(
            "calculation",
            "Corchete: $(2z+1)(2z-1) = (2z)^{2} - 1 = 4z^{2} - 1$<br>Luego: $(4z^{2}-1)(4z^{2}+1) = (4z^{2})^{2} - 1^{2} = 16z^{4} - 1$",
            "Bracket: $(2z+1)(2z-1) = (2z)^{2} - 1 = 4z^{2} - 1$<br>Then: $(4z^{2}-1)(4z^{2}+1) = (4z^{2})^{2} - 1^{2} = 16z^{4} - 1$",
          ),
          step(
            "result",
            "$\\left[(2z+1)(2z-1)\\right](4z^{2}+1) = 16z^{4} - 1$. Control: con $z = 1$: $[(3)(1)](5) = 15$ y $16 - 1 = 15$ ✓.",
            "$\\left[(2z+1)(2z-1)\\right](4z^{2}+1) = 16z^{4} - 1$. Check: at $z = 1$: $[(3)(1)](5) = 15$ and $16 - 1 = 15$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S1.39 — (x+y+2)(3x+2y−4) = 3x²+5xy+2y²+2x−8 (los y lineales SE CANCELAN). */
  template(
    {
      id: "pn-uees-39",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "special-products",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 210,
      tags: ["special-products", "polynomial-product", "two-variables"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "1 · 39",
        page: 1,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$3x^{2} + 5xy + 2y^{2} + 2x - 8$", "$3x^{2} + 5xy + 2y^{2} + 2x - 8$"), correct: true },
        { id: "b", text: L("$3x^{2} + 5xy + 2y^{2} + 2x - 4y - 8$", "$3x^{2} + 5xy + 2y^{2} + 2x - 4y - 8$"), correct: false },
        { id: "c", text: L("$3x^{2} + 5xy + 2y^{2} - 8$", "$3x^{2} + 5xy + 2y^{2} - 8$"), correct: false },
        { id: "d", text: L("$3x^{2} + 2y^{2} - 8$", "$3x^{2} + 2y^{2} - 8$"), correct: false },
      ];
      return {
        skill: L(
          "Trinomio por trinomio en dos variables (con cancelación)",
          "Trinomial times a trinomial in two variables (with a cancellation)",
        ),
        statement: L(
          "Desarrolle el producto notable:\n\n$$(x+y+2)(3x+2y-4)$$",
          "Expand the special product:\n\n$$(x+y+2)(3x+2y-4)$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Son $3 \\times 3 = 9$ productos parciales: distribuye cada término del primer trinomio sobre los tres del segundo.",
            "There are $3 \\times 3 = 9$ partial products: distribute each term of the first trinomial over the three of the second.",
          ),
          L(
            "Agrupa por tipo: cuadráticos ($x^{2}$, $xy$, $y^{2}$), lineales ($x$, $y$) y constante.",
            "Group by kind: quadratics ($x^{2}$, $xy$, $y^{2}$), linears ($x$, $y$) and the constant.",
          ),
          L(
            "Cuidado con los términos lineales en $y$: $-4y$ y $+4y$ aparecen con signos opuestos.",
            "Watch the linear terms in $y$: $-4y$ and $+4y$ appear with opposite signs.",
          ),
        ],
        answerDisplay: L(
          "$(x+y+2)(3x+2y-4) = 3x^{2} + 5xy + 2y^{2} + 2x - 8$",
          "$(x+y+2)(3x+2y-4) = 3x^{2} + 5xy + 2y^{2} + 2x - 8$",
        ),
        solution: [
          step(
            "given",
            "El producto $(x+y+2)(3x+2y-4)$, dos trinomios en las variables $x$ e $y$.",
            "The product $(x+y+2)(3x+2y-4)$, two trinomials in the variables $x$ and $y$.",
          ),
          step(
            "approach",
            "Distribuir los nueve productos parciales y agrupar por tipo de término; en esta expresión hay una cancelación escondida.",
            "Distribute the nine partial products and group by term kind; this expression hides a cancellation.",
          ),
          step(
            "calculation",
            "Distribuyendo: $3x^{2} + 2xy - 4x + 3xy + 2y^{2} - 4y + 6x + 4y - 8$<br>Los lineales en $y$ se cancelan: $-4y + 4y = 0$<br>$= 3x^{2} + 5xy + 2y^{2} + 2x - 8$",
            "Distributing: $3x^{2} + 2xy - 4x + 3xy + 2y^{2} - 4y + 6x + 4y - 8$<br>The linear $y$ terms cancel: $-4y + 4y = 0$<br>$= 3x^{2} + 5xy + 2y^{2} + 2x - 8$",
          ),
          step(
            "result",
            "$(x+y+2)(3x+2y-4) = 3x^{2} + 5xy + 2y^{2} + 2x - 8$ — ¡los términos lineales en $y$ se cancelan! Control: con $x = 1$, $y = 1$: $(1+1+2)(3+2-4) = 4 \\cdot 1 = 4$ y $3 + 5 + 2 + 2 - 8 = 4$ ✓.",
            "$(x+y+2)(3x+2y-4) = 3x^{2} + 5xy + 2y^{2} + 2x - 8$ — the linear $y$ terms cancel! Check: at $x = 1$, $y = 1$: $(1+1+2)(3+2-4) = 4 \\cdot 1 = 4$ and $3 + 5 + 2 + 2 - 8 = 4$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S1.40 — (x²+x+1)² = x⁴+2x³+3x²+2x+1. */
  template(
    {
      id: "pn-uees-40",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "special-products",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 180,
      tags: ["special-products", "perfect-square", "trinomial"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "1 · 40",
        page: 1,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$x^{4} + 2x^{3} + 3x^{2} + 2x + 1$", "$x^{4} + 2x^{3} + 3x^{2} + 2x + 1$"), correct: true },
        { id: "b", text: L("$x^{4} + x^{3} + 3x^{2} + x + 1$", "$x^{4} + x^{3} + 3x^{2} + x + 1$"), correct: false },
        { id: "c", text: L("$x^{4} + 2x^{3} + 3x^{2} + 2x - 1$", "$x^{4} + 2x^{3} + 3x^{2} + 2x - 1$"), correct: false },
        { id: "d", text: L("$x^{4} + 3x^{2} + 1$", "$x^{4} + 3x^{2} + 1$"), correct: false },
      ];
      return {
        skill: L(
          "Cuadrado de un trinomio",
          "Squaring a trinomial",
        ),
        statement: L(
          "Desarrolle el producto notable:\n\n$$(x^{2}+x+1)^{2}$$",
          "Expand the special product:\n\n$$(x^{2}+x+1)^{2}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Es el cuadrado de un TRINOMIO: hay una identidad con seis productos parciales, no tres.",
            "It is the square of a TRINOMIAL: there is an identity with six partial products, not three.",
          ),
          L(
            "$(a+b+c)^{2} = a^{2} + b^{2} + c^{2} + 2ab + 2ac + 2bc$.",
            "$(a+b+c)^{2} = a^{2} + b^{2} + c^{2} + 2ab + 2ac + 2bc$.",
          ),
          L(
            "Aquí $a = x^{2}$, $b = x$ y $c = 1$: los productos cruzados dobles son $2x^{3}$, $2x^{2}$ y $2x$.",
            "Here $a = x^{2}$, $b = x$ and $c = 1$: the doubled cross products are $2x^{3}$, $2x^{2}$ and $2x$.",
          ),
        ],
        answerDisplay: L(
          "$(x^{2}+x+1)^{2} = x^{4} + 2x^{3} + 3x^{2} + 2x + 1$",
          "$(x^{2}+x+1)^{2} = x^{4} + 2x^{3} + 3x^{2} + 2x + 1$",
        ),
        solution: [
          step(
            "given",
            "El cuadrado del trinomio $(x^{2}+x+1)^{2}$.",
            "The square of the trinomial $(x^{2}+x+1)^{2}$.",
          ),
          step(
            "approach",
            "Identidad del cuadrado de un trinomio con $a = x^{2}$, $b = x$, $c = 1$: tres cuadrados más tres dobles productos.",
            "Squared-trinomial identity with $a = x^{2}$, $b = x$, $c = 1$: three squares plus three double products.",
          ),
          step(
            "calculation",
            "$(x^{2}+x+1)^{2} = x^{4} + x^{2} + 1 + 2x^{3} + 2x^{2} + 2x$<br>$= x^{4} + 2x^{3} + 3x^{2} + 2x + 1$",
            "$(x^{2}+x+1)^{2} = x^{4} + x^{2} + 1 + 2x^{3} + 2x^{2} + 2x$<br>$= x^{4} + 2x^{3} + 3x^{2} + 2x + 1$",
          ),
          step(
            "result",
            "$(x^{2}+x+1)^{2} = x^{4} + 2x^{3} + 3x^{2} + 2x + 1$. Control: con $x = 2$: $(4+2+1)^{2} = 49$ y $16 + 16 + 12 + 4 + 1 = 49$ ✓.",
            "$(x^{2}+x+1)^{2} = x^{4} + 2x^{3} + 3x^{2} + 2x + 1$. Check: at $x = 2$: $(4+2+1)^{2} = 49$ and $16 + 16 + 12 + 4 + 1 = 49$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S1.41 — (2a+3)³ = 8a³+36a²+54a+27. */
  template(
    {
      id: "pn-uees-41",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "special-products",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["special-products", "cube-of-binomial"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "1 · 41",
        page: 1,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$8a^{3} + 36a^{2} + 54a + 27$", "$8a^{3} + 36a^{2} + 54a + 27$"), correct: true },
        { id: "b", text: L("$8a^{3} + 12a^{2} + 9a + 27$", "$8a^{3} + 12a^{2} + 9a + 27$"), correct: false },
        { id: "c", text: L("$8a^{3} + 36a^{2} + 54a - 27$", "$8a^{3} + 36a^{2} + 54a - 27$"), correct: false },
        { id: "d", text: L("$8a^{3} + 36a^{2} + 27$", "$8a^{3} + 36a^{2} + 27$"), correct: false },
      ];
      return {
        skill: L(
          "Cubo de un binomio (2a+3)",
          "Cube of a binomial (2a+3)",
        ),
        statement: L(
          "Desarrolle el producto notable:\n\n$$(2a+3)^{3}$$",
          "Expand the special product:\n\n$$(2a+3)^{3}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Es un cubo de binomio: hay una identidad con CUATRO términos y coeficientes $1, 3, 3, 1$.",
            "It is a cube of a binomial: there is an identity with FOUR terms and coefficients $1, 3, 3, 1$.",
          ),
          L(
            "$(a+b)^{3} = a^{3} + 3a^{2}b + 3ab^{2} + b^{3}$.",
            "$(a+b)^{3} = a^{3} + 3a^{2}b + 3ab^{2} + b^{3}$.",
          ),
          L(
            "Aquí $a = 2a$ y $b = 3$: el segundo término es $3 \\cdot (2a)^{2} \\cdot 3$ y el tercero $3 \\cdot 2a \\cdot 3^{2}$.",
            "Here $a = 2a$ and $b = 3$: the second term is $3 \\cdot (2a)^{2} \\cdot 3$ and the third one $3 \\cdot 2a \\cdot 3^{2}$.",
          ),
        ],
        answerDisplay: L(
          "$(2a+3)^{3} = 8a^{3} + 36a^{2} + 54a + 27$",
          "$(2a+3)^{3} = 8a^{3} + 36a^{2} + 54a + 27$",
        ),
        solution: [
          step(
            "given",
            "El cubo $(2a+3)^{3}$.",
            "The cube $(2a+3)^{3}$.",
          ),
          step(
            "approach",
            "Identidad del cubo de un binomio con $a = 2a$ y $b = 3$: los coeficientes $1, 3, 3, 1$ con potencias de $2a$ que bajan y de $3$ que suben.",
            "Cube-of-a-binomial identity with $a = 2a$ and $b = 3$: the coefficients $1, 3, 3, 1$ with powers of $2a$ going down and of $3$ going up.",
          ),
          step(
            "calculation",
            "$(2a+3)^{3} = (2a)^{3} + 3(2a)^{2} \\cdot 3 + 3 \\cdot 2a \\cdot 3^{2} + 3^{3}$<br>$= 8a^{3} + 36a^{2} + 54a + 27$",
            "$(2a+3)^{3} = (2a)^{3} + 3(2a)^{2} \\cdot 3 + 3 \\cdot 2a \\cdot 3^{2} + 3^{3}$<br>$= 8a^{3} + 36a^{2} + 54a + 27$",
          ),
          step(
            "result",
            "$(2a+3)^{3} = 8a^{3} + 36a^{2} + 54a + 27$. Control: con $a = 1$: $(2+3)^{3} = 5^{3} = 125$ y $8 + 36 + 54 + 27 = 125$ ✓.",
            "$(2a+3)^{3} = 8a^{3} + 36a^{2} + 54a + 27$. Check: at $a = 1$: $(2+3)^{3} = 5^{3} = 125$ and $8 + 36 + 54 + 27 = 125$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S1.42 — (2a−3)³ = 8a³−36a²+54a−27. */
  template(
    {
      id: "pn-uees-42",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "special-products",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["special-products", "cube-of-binomial"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "1 · 42",
        page: 1,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$8a^{3} - 36a^{2} + 54a - 27$", "$8a^{3} - 36a^{2} + 54a - 27$"), correct: true },
        { id: "b", text: L("$8a^{3} - 12a^{2} + 9a - 27$", "$8a^{3} - 12a^{2} + 9a - 27$"), correct: false },
        { id: "c", text: L("$8a^{3} + 36a^{2} + 54a + 27$", "$8a^{3} + 36a^{2} + 54a + 27$"), correct: false },
        { id: "d", text: L("$8a^{3} - 36a^{2} - 27$", "$8a^{3} - 36a^{2} - 27$"), correct: false },
      ];
      return {
        skill: L(
          "Cubo de una resta (2a−3)",
          "Cube of a difference (2a−3)",
        ),
        statement: L(
          "Desarrolle el producto notable:\n\n$$(2a-3)^{3}$$",
          "Expand the special product:\n\n$$(2a-3)^{3}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Cubo de una resta: la identidad alterna los signos, no los cuatro términos son negativos.",
            "Cube of a difference: the identity alternates the signs, not all four terms are negative.",
          ),
          L(
            "$(a-b)^{3} = a^{3} - 3a^{2}b + 3ab^{2} - b^{3}$.",
            "$(a-b)^{3} = a^{3} - 3a^{2}b + 3ab^{2} - b^{3}$.",
          ),
          L(
            "Aquí $a = 2a$ y $b = 3$: el segundo término es $-3 \\cdot (2a)^{2} \\cdot 3$ y el tercero $+3 \\cdot 2a \\cdot 3^{2}$.",
            "Here $a = 2a$ and $b = 3$: the second term is $-3 \\cdot (2a)^{2} \\cdot 3$ and the third one $+3 \\cdot 2a \\cdot 3^{2}$.",
          ),
        ],
        answerDisplay: L(
          "$(2a-3)^{3} = 8a^{3} - 36a^{2} + 54a - 27$",
          "$(2a-3)^{3} = 8a^{3} - 36a^{2} + 54a - 27$",
        ),
        solution: [
          step(
            "given",
            "El cubo $(2a-3)^{3}$.",
            "The cube $(2a-3)^{3}$.",
          ),
          step(
            "approach",
            "Identidad del cubo de una resta con $a = 2a$ y $b = 3$: signos $+,-,+,-$.",
            "Cube-of-a-difference identity with $a = 2a$ and $b = 3$: signs $+,-,+,-$.",
          ),
          step(
            "calculation",
            "$(2a-3)^{3} = (2a)^{3} - 3(2a)^{2} \\cdot 3 + 3 \\cdot 2a \\cdot 3^{2} - 3^{3}$<br>$= 8a^{3} - 36a^{2} + 54a - 27$",
            "$(2a-3)^{3} = (2a)^{3} - 3(2a)^{2} \\cdot 3 + 3 \\cdot 2a \\cdot 3^{2} - 3^{3}$<br>$= 8a^{3} - 36a^{2} + 54a - 27$",
          ),
          step(
            "result",
            "$(2a-3)^{3} = 8a^{3} - 36a^{2} + 54a - 27$. Control: con $a = 1$: $(2-3)^{3} = (-1)^{3} = -1$ y $8 - 36 + 54 - 27 = -1$ ✓.",
            "$(2a-3)^{3} = 8a^{3} - 36a^{2} + 54a - 27$. Check: at $a = 1$: $(2-3)^{3} = (-1)^{3} = -1$ and $8 - 36 + 54 - 27 = -1$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S1.43 — (2x−3)³ = 8x³−36x²+54x−27. */
  template(
    {
      id: "pn-uees-43",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "special-products",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["special-products", "cube-of-binomial"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "1 · 43",
        page: 1,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$8x^{3} - 36x^{2} + 54x - 27$", "$8x^{3} - 36x^{2} + 54x - 27$"), correct: true },
        { id: "b", text: L("$8x^{3} - 12x^{2} + 9x - 27$", "$8x^{3} - 12x^{2} + 9x - 27$"), correct: false },
        { id: "c", text: L("$8x^{3} - 36x^{2} - 54x - 27$", "$8x^{3} - 36x^{2} - 54x - 27$"), correct: false },
        { id: "d", text: L("$8x^{3} - 36x^{2} - 27$", "$8x^{3} - 36x^{2} - 27$"), correct: false },
      ];
      return {
        skill: L(
          "Cubo de una resta en la variable x (2x−3)",
          "Cube of a difference in the variable x (2x−3)",
        ),
        statement: L(
          "Desarrolle el producto notable:\n\n$$(2x-3)^{3}$$",
          "Expand the special product:\n\n$$(2x-3)^{3}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Cubo de una resta: mismo patrón del ítem anterior, ahora en la variable $x$.",
            "Cube of a difference: same pattern as the previous item, now in the variable $x$.",
          ),
          L(
            "$(a-b)^{3} = a^{3} - 3a^{2}b + 3ab^{2} - b^{3}$.",
            "$(a-b)^{3} = a^{3} - 3a^{2}b + 3ab^{2} - b^{3}$.",
          ),
          L(
            "Aquí $a = 2x$ y $b = 3$: el tercer término lleva signo POSITIVO, $3 \\cdot 2x \\cdot 9$.",
            "Here $a = 2x$ and $b = 3$: the third term carries a POSITIVE sign, $3 \\cdot 2x \\cdot 9$.",
          ),
        ],
        answerDisplay: L(
          "$(2x-3)^{3} = 8x^{3} - 36x^{2} + 54x - 27$",
          "$(2x-3)^{3} = 8x^{3} - 36x^{2} + 54x - 27$",
        ),
        solution: [
          step(
            "given",
            "El cubo $(2x-3)^{3}$.",
            "The cube $(2x-3)^{3}$.",
          ),
          step(
            "approach",
            "Identidad del cubo de una resta con $a = 2x$, $b = 3$; atención al signo del tercer término.",
            "Cube-of-a-difference identity with $a = 2x$, $b = 3$; mind the sign of the third term.",
          ),
          step(
            "calculation",
            "$(2x-3)^{3} = (2x)^{3} - 3(2x)^{2} \\cdot 3 + 3 \\cdot 2x \\cdot 3^{2} - 3^{3}$<br>$= 8x^{3} - 36x^{2} + 54x - 27$",
            "$(2x-3)^{3} = (2x)^{3} - 3(2x)^{2} \\cdot 3 + 3 \\cdot 2x \\cdot 3^{2} - 3^{3}$<br>$= 8x^{3} - 36x^{2} + 54x - 27$",
          ),
          step(
            "result",
            "$(2x-3)^{3} = 8x^{3} - 36x^{2} + 54x - 27$. Control: con $x = 1$: $(2-3)^{3} = -1$ y $8 - 36 + 54 - 27 = -1$ ✓.",
            "$(2x-3)^{3} = 8x^{3} - 36x^{2} + 54x - 27$. Check: at $x = 1$: $(2-3)^{3} = -1$ and $8 - 36 + 54 - 27 = -1$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S1.44 — (x+2y)³ = x³+6x²y+12xy²+8y³. */
  template(
    {
      id: "pn-uees-44",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "special-products",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["special-products", "cube-of-binomial", "two-variables"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "1 · 44",
        page: 1,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$x^{3} + 6x^{2}y + 12xy^{2} + 8y^{3}$", "$x^{3} + 6x^{2}y + 12xy^{2} + 8y^{3}$"), correct: true },
        { id: "b", text: L("$x^{3} + 3x^{2}y + 3xy^{2} + 8y^{3}$", "$x^{3} + 3x^{2}y + 3xy^{2} + 8y^{3}$"), correct: false },
        { id: "c", text: L("$x^{3} + 6x^{2}y - 12xy^{2} + 8y^{3}$", "$x^{3} + 6x^{2}y - 12xy^{2} + 8y^{3}$"), correct: false },
        { id: "d", text: L("$x^{3} + 8y^{3}$", "$x^{3} + 8y^{3}$"), correct: false },
      ];
      return {
        skill: L(
          "Cubo de un binomio con dos variables",
          "Cube of a binomial in two variables",
        ),
        statement: L(
          "Desarrolle el producto notable:\n\n$$(x+2y)^{3}$$",
          "Expand the special product:\n\n$$(x+2y)^{3}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Cubo de un binomio con dos variables: usa la identidad completa, no solo los cubos de los extremos.",
            "Cube of a binomial in two variables: use the full identity, not only the cubes of the ends.",
          ),
          L(
            "$(a+b)^{3} = a^{3} + 3a^{2}b + 3ab^{2} + b^{3}$.",
            "$(a+b)^{3} = a^{3} + 3a^{2}b + 3ab^{2} + b^{3}$.",
          ),
          L(
            "Aquí $a = x$ y $b = 2y$: los términos centrales son $3 \\cdot x^{2} \\cdot 2y$ y $3 \\cdot x \\cdot (2y)^{2}$.",
            "Here $a = x$ and $b = 2y$: the middle terms are $3 \\cdot x^{2} \\cdot 2y$ and $3 \\cdot x \\cdot (2y)^{2}$.",
          ),
        ],
        answerDisplay: L(
          "$(x+2y)^{3} = x^{3} + 6x^{2}y + 12xy^{2} + 8y^{3}$",
          "$(x+2y)^{3} = x^{3} + 6x^{2}y + 12xy^{2} + 8y^{3}$",
        ),
        solution: [
          step(
            "given",
            "El cubo $(x+2y)^{3}$ en las variables $x$ e $y$.",
            "The cube $(x+2y)^{3}$ in the variables $x$ and $y$.",
          ),
          step(
            "approach",
            "Identidad del cubo de un binomio con $a = x$ y $b = 2y$.",
            "Cube-of-a-binomial identity with $a = x$ and $b = 2y$.",
          ),
          step(
            "calculation",
            "$(x+2y)^{3} = x^{3} + 3x^{2} \\cdot 2y + 3x \\cdot (2y)^{2} + (2y)^{3}$<br>$= x^{3} + 6x^{2}y + 12xy^{2} + 8y^{3}$",
            "$(x+2y)^{3} = x^{3} + 3x^{2} \\cdot 2y + 3x \\cdot (2y)^{2} + (2y)^{3}$<br>$= x^{3} + 6x^{2}y + 12xy^{2} + 8y^{3}$",
          ),
          step(
            "result",
            "$(x+2y)^{3} = x^{3} + 6x^{2}y + 12xy^{2} + 8y^{3}$. Control: con $x = 1$, $y = 1$: $(1+2)^{3} = 27$ y $1 + 6 + 12 + 8 = 27$ ✓.",
            "$(x+2y)^{3} = x^{3} + 6x^{2}y + 12xy^{2} + 8y^{3}$. Check: at $x = 1$, $y = 1$: $(1+2)^{3} = 27$ and $1 + 6 + 12 + 8 = 27$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S1.45 — (z²−18z)/z = z−18. */
  template(
    {
      id: "pn-uees-45",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "special-products",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 90,
      tags: ["algebraic-division", "monomial-quotient"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "1 · 45",
        page: 1,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$z - 18$", "$z - 18$"), correct: true },
        { id: "b", text: L("$z + 18$", "$z + 18$"), correct: false },
        { id: "c", text: L("$z - 18z$", "$z - 18z$"), correct: false },
        { id: "d", text: L("$2z - 18$", "$2z - 18$"), correct: false },
      ];
      return {
        skill: L(
          "División de un binomio entre un monomio",
          "Dividing a binomial by a monomial",
        ),
        statement: L(
          "Efectúe la división algebraica:\n\n$$\\frac{z^{2}-18z}{z}$$",
          "Carry out the algebraic division:\n\n$$\\frac{z^{2}-18z}{z}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "División de un polinomio entre un monomio: divide CADA término del numerador entre el denominador.",
            "Polynomial divided by a monomial: divide EACH term of the numerator by the denominator.",
          ),
          L(
            "$\\frac{a+b}{c} = \\frac{a}{c} + \\frac{b}{c}$ y $\\frac{a^{m}}{a^{n}} = a^{m-n}$.",
            "$\\frac{a+b}{c} = \\frac{a}{c} + \\frac{b}{c}$ and $\\frac{a^{m}}{a^{n}} = a^{m-n}$.",
          ),
          L(
            "Aquí $\\frac{z^{2}}{z} = z^{2-1}$ y $\\frac{18z}{z} = 18$.",
            "Here $\\frac{z^{2}}{z} = z^{2-1}$ and $\\frac{18z}{z} = 18$.",
          ),
        ],
        answerDisplay: L(
          "$\\frac{z^{2}-18z}{z} = z - 18$",
          "$\\frac{z^{2}-18z}{z} = z - 18$",
        ),
        solution: [
          step(
            "given",
            "El cociente $\\frac{z^{2}-18z}{z}$ (con $z \\neq 0$).",
            "The quotient $\\frac{z^{2}-18z}{z}$ (with $z \\neq 0$).",
          ),
          step(
            "approach",
            "Dividir término a término: cada término del numerador entre el monomio $z$ del denominador.",
            "Divide term by term: each numerator term by the monomial $z$ in the denominator.",
          ),
          step(
            "calculation",
            "$\\frac{z^{2}-18z}{z} = \\frac{z^{2}}{z} - \\frac{18z}{z} = z - 18$",
            "$\\frac{z^{2}-18z}{z} = \\frac{z^{2}}{z} - \\frac{18z}{z} = z - 18$",
          ),
          step(
            "result",
            "$\\frac{z^{2}-18z}{z} = z - 18$ (válido para $z \\neq 0$). Control: con $z = 2$: $\\frac{4-36}{2} = -16$ y $2 - 18 = -16$ ✓.",
            "$\\frac{z^{2}-18z}{z} = z - 18$ (valid for $z \\neq 0$). Check: at $z = 2$: $\\frac{4-36}{2} = -16$ and $2 - 18 = -16$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S1.46 — (2x³−7x+4)/x = 2x²−7+4/x. */
  template(
    {
      id: "pn-uees-46",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "special-products",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["algebraic-division", "term-by-term"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "1 · 46",
        page: 1,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$2x^{2} - 7 + \\frac{4}{x}$", "$2x^{2} - 7 + \\frac{4}{x}$"), correct: true },
        { id: "b", text: L("$2x^{2} - 7 + 4x$", "$2x^{2} - 7 + 4x$"), correct: false },
        { id: "c", text: L("$2x^{2} - 7 - \\frac{4}{x}$", "$2x^{2} - 7 - \\frac{4}{x}$"), correct: false },
        { id: "d", text: L("$2x^{2} - 7$", "$2x^{2} - 7$"), correct: false },
      ];
      return {
        skill: L(
          "División término a término con un resto fraccionario",
          "Term-by-term division with a fractional remainder",
        ),
        statement: L(
          "Efectúe la división algebraica:\n\n$$\\frac{2x^{3}-7x+4}{x}$$",
          "Carry out the algebraic division:\n\n$$\\frac{2x^{3}-7x+4}{x}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Divide cada término entre $x$; el término $4$ NO es divisible entre $x$: queda como fracción.",
            "Divide each term by $x$; the term $4$ is NOT divisible by $x$: it stays as a fraction.",
          ),
          L(
            "$\\frac{a^{m}}{a^{n}} = a^{m-n}$; una constante entre $x$ se queda como $\\frac{\\text{constante}}{x}$.",
            "$\\frac{a^{m}}{a^{n}} = a^{m-n}$; a constant over $x$ remains as $\\frac{\\text{constant}}{x}$.",
          ),
          L(
            "$\\frac{2x^{3}}{x} = 2x^{2}$, $\\frac{7x}{x} = 7$ y el $4$ se queda dividido entre $x$.",
            "$\\frac{2x^{3}}{x} = 2x^{2}$, $\\frac{7x}{x} = 7$ and the $4$ stays divided by $x$.",
          ),
        ],
        answerDisplay: L(
          "$\\frac{2x^{3}-7x+4}{x} = 2x^{2} - 7 + \\frac{4}{x}$",
          "$\\frac{2x^{3}-7x+4}{x} = 2x^{2} - 7 + \\frac{4}{x}$",
        ),
        solution: [
          step(
            "given",
            "El cociente $\\frac{2x^{3}-7x+4}{x}$ (con $x \\neq 0$).",
            "The quotient $\\frac{2x^{3}-7x+4}{x}$ (with $x \\neq 0$).",
          ),
          step(
            "approach",
            "División término a término; el término independiente genera una fracción que NO desaparece.",
            "Term-by-term division; the constant term produces a fraction that does NOT disappear.",
          ),
          step(
            "calculation",
            "$\\frac{2x^{3}-7x+4}{x} = \\frac{2x^{3}}{x} - \\frac{7x}{x} + \\frac{4}{x} = 2x^{2} - 7 + \\frac{4}{x}$",
            "$\\frac{2x^{3}-7x+4}{x} = \\frac{2x^{3}}{x} - \\frac{7x}{x} + \\frac{4}{x} = 2x^{2} - 7 + \\frac{4}{x}$",
          ),
          step(
            "result",
            "$\\frac{2x^{3}-7x+4}{x} = 2x^{2} - 7 + \\frac{4}{x}$ (válido para $x \\neq 0$). Control: con $x = 2$: $\\frac{16-14+4}{2} = 3$ y $8 - 7 + \\frac{4}{2} = 3$ ✓.",
            "$\\frac{2x^{3}-7x+4}{x} = 2x^{2} - 7 + \\frac{4}{x}$ (valid for $x \\neq 0$). Check: at $x = 2$: $\\frac{16-14+4}{2} = 3$ and $8 - 7 + \\frac{4}{2} = 3$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S1.47 — (6u⁵+9u³−1)/(3u²) = 2u³+3u−1/(3u²). */
  template(
    {
      id: "pn-uees-47",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "special-products",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["algebraic-division", "term-by-term"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "1 · 47",
        page: 1,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$2u^{3} + 3u - \\frac{1}{3u^{2}}$", "$2u^{3} + 3u - \\frac{1}{3u^{2}}$"), correct: true },
        { id: "b", text: L("$2u^{3} + 3u - 3u$", "$2u^{3} + 3u - 3u$"), correct: false },
        { id: "c", text: L("$2u^{3} + 3u + \\frac{1}{3u^{2}}$", "$2u^{3} + 3u + \\frac{1}{3u^{2}}$"), correct: false },
        { id: "d", text: L("$2u^{3} + 3u$", "$2u^{3} + 3u$"), correct: false },
      ];
      return {
        skill: L(
          "División entre un monomio con coeficiente",
          "Division by a monomial with a coefficient",
        ),
        statement: L(
          "Efectúe la división algebraica:\n\n$$\\frac{6u^{5}+9u^{3}-1}{3u^{2}}$$",
          "Carry out the algebraic division:\n\n$$\\frac{6u^{5}+9u^{3}-1}{3u^{2}}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El divisor tiene coeficiente $3$: divide también los coeficientes, no solo las potencias de $u$.",
            "The divisor carries the coefficient $3$: divide the coefficients too, not only the powers of $u$.",
          ),
          L(
            "$\\frac{ka^{m}}{ta^{n}} = \\frac{k}{t} \\, a^{m-n}$.",
            "$\\frac{ka^{m}}{ta^{n}} = \\frac{k}{t} \\, a^{m-n}$.",
          ),
          L(
            "$\\frac{6u^{5}}{3u^{2}} = 2u^{3}$ y $\\frac{9u^{3}}{3u^{2}} = 3u$; el $-1$ queda dividido entre $3u^{2}$.",
            "$\\frac{6u^{5}}{3u^{2}} = 2u^{3}$ and $\\frac{9u^{3}}{3u^{2}} = 3u$; the $-1$ stays over $3u^{2}$.",
          ),
        ],
        answerDisplay: L(
          "$\\frac{6u^{5}+9u^{3}-1}{3u^{2}} = 2u^{3} + 3u - \\frac{1}{3u^{2}}$",
          "$\\frac{6u^{5}+9u^{3}-1}{3u^{2}} = 2u^{3} + 3u - \\frac{1}{3u^{2}}$",
        ),
        solution: [
          step(
            "given",
            "El cociente $\\frac{6u^{5}+9u^{3}-1}{3u^{2}}$ (con $u \\neq 0$).",
            "The quotient $\\frac{6u^{5}+9u^{3}-1}{3u^{2}}$ (with $u \\neq 0$).",
          ),
          step(
            "approach",
            "División término a término dividiendo coeficientes y restando exponentes; el $-1$ no se puede dividir exacto.",
            "Term-by-term division splitting coefficients and subtracting exponents; the $-1$ cannot divide exactly.",
          ),
          step(
            "calculation",
            "$\\frac{6u^{5}+9u^{3}-1}{3u^{2}} = \\frac{6u^{5}}{3u^{2}} + \\frac{9u^{3}}{3u^{2}} - \\frac{1}{3u^{2}} = 2u^{3} + 3u - \\frac{1}{3u^{2}}$",
            "$\\frac{6u^{5}+9u^{3}-1}{3u^{2}} = \\frac{6u^{5}}{3u^{2}} + \\frac{9u^{3}}{3u^{2}} - \\frac{1}{3u^{2}} = 2u^{3} + 3u - \\frac{1}{3u^{2}}$",
          ),
          step(
            "result",
            "$\\frac{6u^{5}+9u^{3}-1}{3u^{2}} = 2u^{3} + 3u - \\frac{1}{3u^{2}}$ (válido para $u \\neq 0$). Control: con $u = 1$: $\\frac{6+9-1}{3} = \\frac{14}{3}$ y $2 + 3 - \\frac{1}{3} = \\frac{14}{3}$ ✓.",
            "$\\frac{6u^{5}+9u^{3}-1}{3u^{2}} = 2u^{3} + 3u - \\frac{1}{3u^{2}}$ (valid for $u \\neq 0$). Check: at $u = 1$: $\\frac{6+9-1}{3} = \\frac{14}{3}$ and $2 + 3 - \\frac{1}{3} = \\frac{14}{3}$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S1.48 — ((3y−4)−(9y+5))/(3y) = −2−3/y. */
  template(
    {
      id: "pn-uees-48",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "special-products",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["algebraic-division", "simplify-first"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "1 · 48",
        page: 1,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$-2 - \\frac{3}{y}$", "$-2 - \\frac{3}{y}$"), correct: true },
        { id: "b", text: L("$-2 + \\frac{3}{y}$", "$-2 + \\frac{3}{y}$"), correct: false },
        { id: "c", text: L("$-2 - 3y$", "$-2 - 3y$"), correct: false },
        { id: "d", text: L("$-\\frac{13y+1}{3y}$", "$-\\frac{13y+1}{3y}$"), correct: false },
      ];
      return {
        skill: L(
          "Restar binomios primero y luego dividir",
          "Subtract the binomials first, then divide",
        ),
        statement: L(
          "Efectúe la división algebraica:\n\n$$\\frac{(3y-4)-(9y+5)}{3y}$$",
          "Carry out the algebraic division:\n\n$$\\frac{(3y-4)-(9y+5)}{3y}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Primero resuelve la resta del numerador: el signo menos del paréntesis cambia TODOS los signos de adentro.",
            "First solve the subtraction in the numerator: the minus sign in front of the parenthesis flips EVERY sign inside.",
          ),
          L(
            "$(a-b)-(c+d) = a - b - c - d$; luego divide cada término entre $3y$.",
            "$(a-b)-(c+d) = a - b - c - d$; then divide each term by $3y$.",
          ),
          L(
            "El numerador queda $3y - 4 - 9y - 5$; reduce los términos en $y$ y los constantes antes de dividir.",
            "The numerator becomes $3y - 4 - 9y - 5$; combine the $y$ terms and the constants before dividing.",
          ),
        ],
        answerDisplay: L(
          "$\\frac{(3y-4)-(9y+5)}{3y} = -2 - \\frac{3}{y}$",
          "$\\frac{(3y-4)-(9y+5)}{3y} = -2 - \\frac{3}{y}$",
        ),
        solution: [
          step(
            "given",
            "El cociente $\\frac{(3y-4)-(9y+5)}{3y}$ (con $y \\neq 0$).",
            "The quotient $\\frac{(3y-4)-(9y+5)}{3y}$ (with $y \\neq 0$).",
          ),
          step(
            "approach",
            "Simplificar el numerador (ojo con el signo del segundo paréntesis) y luego dividir término a término entre $3y$.",
            "Simplify the numerator (mind the sign of the second parenthesis) and then divide term by term by $3y$.",
          ),
          step(
            "calculation",
            "Numerador: $(3y-4)-(9y+5) = 3y - 4 - 9y - 5 = -6y - 9$<br>$\\frac{-6y-9}{3y} = \\frac{-6y}{3y} - \\frac{9}{3y} = -2 - \\frac{3}{y}$",
            "Numerator: $(3y-4)-(9y+5) = 3y - 4 - 9y - 5 = -6y - 9$<br>$\\frac{-6y-9}{3y} = \\frac{-6y}{3y} - \\frac{9}{3y} = -2 - \\frac{3}{y}$",
          ),
          step(
            "result",
            "$\\frac{(3y-4)-(9y+5)}{3y} = -2 - \\frac{3}{y}$ (válido para $y \\neq 0$). Control: con $y = 1$: $\\frac{(3-4)-(9+5)}{3} = \\frac{-15}{3} = -5$ y $-2 - 3 = -5$ ✓.",
            "$\\frac{(3y-4)-(9y+5)}{3y} = -2 - \\frac{3}{y}$ (valid for $y \\neq 0$). Check: at $y = 1$: $\\frac{(3-4)-(9+5)}{3} = \\frac{-15}{3} = -5$ and $-2 - 3 = -5$ ✓.",
          ),
        ],
      };
    },
  ),

  /* ================================================================== */
  /* Sección 2 «FACTORIZACION» — ítems 21-52 (pág. 2).                  */
  /* ================================================================== */

  /* S2.21 — 5x²+16x+3 = (5x+1)(x+3). */
  template(
    {
      id: "fc-uees-21",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "factoring",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["factoring", "trinomial", "leading-coefficient"],
      prerequisites: ["factoring"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "2 · 21",
        page: 2,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$(5x+1)(x+3)$", "$(5x+1)(x+3)$"), correct: true },
        { id: "b", text: L("$(5x+3)(x+1)$", "$(5x+3)(x+1)$"), correct: false },
        { id: "c", text: L("$(5x+1)(x-3)$", "$(5x+1)(x-3)$"), correct: false },
        { id: "d", text: L("$(x+3)(5x+3)$", "$(x+3)(5x+3)$"), correct: false },
      ];
      return {
        skill: L(
          "Factorizar un trinomio con coeficiente principal 5",
          "Factoring a trinomial with leading coefficient 5",
        ),
        statement: L(
          "Factorice completamente:\n\n$$5x^{2}+16x+3$$",
          "Factor completely:\n\n$$5x^{2}+16x+3$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Trinomio con coeficiente principal distinto de 1: busca dos binomios $(ax+b)(cx+d)$.",
            "Trinomial with leading coefficient other than 1: look for two binomials $(ax+b)(cx+d)$.",
          ),
          L(
            "Debe cumplirse $ac = 5$, $bd = 3$ y $ad + bc = 16$.",
            "It must satisfy $ac = 5$, $bd = 3$ and $ad + bc = 16$.",
          ),
          L(
            "Con $ac = 5 = 5 \\cdot 1$ y $bd = 3 = 3 \\cdot 1$: prueba dónde colocar el $5$ y el $3$ para que el término central salga $16x$.",
            "With $ac = 5 = 5 \\cdot 1$ and $bd = 3 = 3 \\cdot 1$: try where to place the $5$ and the $3$ so the middle term becomes $16x$.",
          ),
        ],
        answerDisplay: L(
          "$5x^{2}+16x+3 = (5x+1)(x+3)$",
          "$5x^{2}+16x+3 = (5x+1)(x+3)$",
        ),
        solution: [
          step(
            "given",
            "El trinomio $5x^{2}+16x+3$.",
            "The trinomial $5x^{2}+16x+3$.",
          ),
          step(
            "approach",
            "Prueba y error dirigido: $ac = 5$ y $bd = 3$ dejan pocas combinaciones; verificar expandiendo.",
            "Guided trial and error: $ac = 5$ and $bd = 3$ leave few combinations; verify by expanding.",
          ),
          step(
            "calculation",
            "$(5x+1)(x+3) = 5x^{2} + 15x + x + 3 = 5x^{2} + 16x + 3$ ✓",
            "$(5x+1)(x+3) = 5x^{2} + 15x + x + 3 = 5x^{2} + 16x + 3$ ✓",
          ),
          step(
            "result",
            "$5x^{2}+16x+3 = (5x+1)(x+3)$. Control: con $x = 1$: $5 + 16 + 3 = 24$ y $(6)(4) = 24$ ✓.",
            "$5x^{2}+16x+3 = (5x+1)(x+3)$. Check: at $x = 1$: $5 + 16 + 3 = 24$ and $(6)(4) = 24$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S2.22 — 4x²−x−3 = (4x+3)(x−1). */
  template(
    {
      id: "fc-uees-22",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "factoring",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["factoring", "trinomial", "leading-coefficient"],
      prerequisites: ["factoring"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "2 · 22",
        page: 2,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$(4x+3)(x-1)$", "$(4x+3)(x-1)$"), correct: true },
        { id: "b", text: L("$(4x-3)(x+1)$", "$(4x-3)(x+1)$"), correct: false },
        { id: "c", text: L("$(4x-1)(x+3)$", "$(4x-1)(x+3)$"), correct: false },
        { id: "d", text: L("$(4x+3)(x+1)$", "$(4x+3)(x+1)$"), correct: false },
      ];
      return {
        skill: L(
          "Factorizar un trinomio con coeficiente principal 4 y signos mixtos",
          "Factoring a trinomial with leading coefficient 4 and mixed signs",
        ),
        statement: L(
          "Factorice completamente:\n\n$$4x^{2}-x-3$$",
          "Factor completely:\n\n$$4x^{2}-x-3$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El término independiente es negativo: los signos de los binomios son DISTINTOS.",
            "The constant term is negative: the binomial signs are DIFFERENT.",
          ),
          L(
            "Necesitas $ac = 4$, $bd = -3$ y $ad + bc = -1$.",
            "You need $ac = 4$, $bd = -3$ and $ad + bc = -1$.",
          ),
          L(
            "Con $4 = 4 \\cdot 1$ y $-3 = 3 \\cdot (-1)$: el cruce $4 \\cdot (-1) + 3 \\cdot 1$ debe dar $-1$.",
            "With $4 = 4 \\cdot 1$ and $-3 = 3 \\cdot (-1)$: the cross $4 \\cdot (-1) + 3 \\cdot 1$ must give $-1$.",
          ),
        ],
        answerDisplay: L(
          "$4x^{2}-x-3 = (4x+3)(x-1)$",
          "$4x^{2}-x-3 = (4x+3)(x-1)$",
        ),
        solution: [
          step(
            "given",
            "El trinomio $4x^{2}-x-3$.",
            "The trinomial $4x^{2}-x-3$.",
          ),
          step(
            "approach",
            "Signos distintos (por el $-3$); buscar la repartición de $4$ y de $3$ cuyo cruce dé $-1x$.",
            "Different signs (because of the $-3$); find the arrangement of the $4$ and the $3$ whose cross gives $-1x$.",
          ),
          step(
            "calculation",
            "$(4x+3)(x-1) = 4x^{2} - 4x + 3x - 3 = 4x^{2} - x - 3$ ✓",
            "$(4x+3)(x-1) = 4x^{2} - 4x + 3x - 3 = 4x^{2} - x - 3$ ✓",
          ),
          step(
            "result",
            "$4x^{2}-x-3 = (4x+3)(x-1)$. Control: con $x = 2$: $16 - 2 - 3 = 11$ y $(11)(1) = 11$ ✓.",
            "$4x^{2}-x-3 = (4x+3)(x-1)$. Check: at $x = 2$: $16 - 2 - 3 = 11$ and $(11)(1) = 11$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S2.23 — 12s³+10s²−8s = 2s(2s−1)(3s+4). */
  template(
    {
      id: "fc-uees-23",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "factoring",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["factoring", "common-factor", "trinomial"],
      prerequisites: ["factoring"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "2 · 23",
        page: 2,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$2s(2s-1)(3s+4)$", "$2s(2s-1)(3s+4)$"), correct: true },
        { id: "b", text: L("$2s\\left(6s^{2}+5s-4\\right)$", "$2s\\left(6s^{2}+5s-4\\right)$"), correct: false },
        { id: "c", text: L("$2s(2s+1)(3s-4)$", "$2s(2s+1)(3s-4)$"), correct: false },
        { id: "d", text: L("$2s(2s-1)(3s-4)$", "$2s(2s-1)(3s-4)$"), correct: false },
      ];
      return {
        skill: L(
          "Factor común primero y trinomio después",
          "Common factor first and a trinomial afterwards",
        ),
        statement: L(
          "Factorice completamente:\n\n$$12s^{3}+10s^{2}-8s$$",
          "Factor completely:\n\n$$12s^{3}+10s^{2}-8s$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Los tres términos comparten la variable $s$ y un factor numérico: sácalos primero.",
            "The three terms share the variable $s$ and a numeric factor: pull them out first.",
          ),
          L(
            "Factor común $2s$: queda un trinomio $6s^{2}+5s-4$ que todavía se puede factorizar.",
            "Common factor $2s$: a trinomial $6s^{2}+5s-4$ remains that can still be factored.",
          ),
          L(
            "Para $6s^{2}+5s-4$ busca $ac = 6$, $bd = -4$ con cruce $5$: prueba $(2s-1)(3s+4)$.",
            "For $6s^{2}+5s-4$ look for $ac = 6$, $bd = -4$ with cross $5$: try $(2s-1)(3s+4)$.",
          ),
        ],
        answerDisplay: L(
          "$12s^{3}+10s^{2}-8s = 2s(2s-1)(3s+4)$",
          "$12s^{3}+10s^{2}-8s = 2s(2s-1)(3s+4)$",
        ),
        solution: [
          step(
            "given",
            "El polinomio $12s^{3}+10s^{2}-8s$.",
            "The polynomial $12s^{3}+10s^{2}-8s$.",
          ),
          step(
            "approach",
            "Dos pasos: extraer el factor común $2s$ y factorizar el trinomio que queda.",
            "Two steps: pull out the common factor $2s$ and factor the remaining trinomial.",
          ),
          step(
            "calculation",
            "$12s^{3}+10s^{2}-8s = 2s\\left(6s^{2}+5s-4\\right)$<br>$6s^{2}+5s-4 = (2s-1)(3s+4)$<br>Entonces: $12s^{3}+10s^{2}-8s = 2s(2s-1)(3s+4)$",
            "$12s^{3}+10s^{2}-8s = 2s\\left(6s^{2}+5s-4\\right)$<br>$6s^{2}+5s-4 = (2s-1)(3s+4)$<br>So: $12s^{3}+10s^{2}-8s = 2s(2s-1)(3s+4)$",
          ),
          step(
            "result",
            "$12s^{3}+10s^{2}-8s = 2s(2s-1)(3s+4)$. Control: con $s = 1$: $12 + 10 - 8 = 14$ y $2 \\cdot 1 \\cdot 1 \\cdot 7 = 14$ ✓.",
            "$12s^{3}+10s^{2}-8s = 2s(2s-1)(3s+4)$. Check: at $s = 1$: $12 + 10 - 8 = 14$ and $2 \\cdot 1 \\cdot 1 \\cdot 7 = 14$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S2.24 — 9z²+30z+25 = (3z+5)². */
  template(
    {
      id: "fc-uees-24",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "factoring",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 75,
      tags: ["factoring", "perfect-square"],
      prerequisites: ["factoring"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "2 · 24",
        page: 2,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$(3z+5)^{2}$", "$(3z+5)^{2}$"), correct: true },
        { id: "b", text: L("$(3z+5)(3z-5)$", "$(3z+5)(3z-5)$"), correct: false },
        { id: "c", text: L("$(3z-5)^{2}$", "$(3z-5)^{2}$"), correct: false },
        { id: "d", text: L("$(9z+5)(z+5)$", "$(9z+5)(z+5)$"), correct: false },
      ];
      return {
        skill: L(
          "Reconocer un trinomio cuadrado perfecto",
          "Recognizing a perfect-square trinomial",
        ),
        statement: L(
          "Factorice completamente:\n\n$$9z^{2}+30z+25$$",
          "Factor completely:\n\n$$9z^{2}+30z+25$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Observa los extremos: $9z^{2}$ y $25$ son cuadrados perfectos.",
            "Look at the ends: $9z^{2}$ and $25$ are perfect squares.",
          ),
          L(
            "Un trinomio $a^{2} + 2ab + b^{2}$ se factoriza como $(a+b)^{2}$.",
            "A trinomial $a^{2} + 2ab + b^{2}$ factors as $(a+b)^{2}$.",
          ),
          L(
            "Aquí $a = 3z$ y $b = 5$: comprueba si el término central es el doble producto $2 \\cdot 3z \\cdot 5 = 30z$.",
            "Here $a = 3z$ and $b = 5$: check whether the middle term is the double product $2 \\cdot 3z \\cdot 5 = 30z$.",
          ),
        ],
        answerDisplay: L(
          "$9z^{2}+30z+25 = (3z+5)^{2}$",
          "$9z^{2}+30z+25 = (3z+5)^{2}$",
        ),
        solution: [
          step(
            "given",
            "El trinomio $9z^{2}+30z+25$.",
            "The trinomial $9z^{2}+30z+25$.",
          ),
          step(
            "approach",
            "Verificar la estructura de cuadrado perfecto: $a^{2} + 2ab + b^{2}$ con $a = 3z$ y $b = 5$.",
            "Verify the perfect-square structure: $a^{2} + 2ab + b^{2}$ with $a = 3z$ and $b = 5$.",
          ),
          step(
            "calculation",
            "$(3z)^{2} + 2 \\cdot 3z \\cdot 5 + 5^{2} = 9z^{2} + 30z + 25$, así que $9z^{2}+30z+25 = (3z+5)^{2}$",
            "$(3z)^{2} + 2 \\cdot 3z \\cdot 5 + 5^{2} = 9z^{2} + 30z + 25$, so $9z^{2}+30z+25 = (3z+5)^{2}$",
          ),
          step(
            "result",
            "$9z^{2}+30z+25 = (3z+5)^{2}$. Control: con $z = 1$: $9 + 30 + 25 = 64$ y $(3+5)^{2} = 64$ ✓.",
            "$9z^{2}+30z+25 = (3z+5)^{2}$. Check: at $z = 1$: $9 + 30 + 25 = 64$ and $(3+5)^{2} = 64$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S2.25 — u^(13/5)v − 4u^(3/5)v³ = u^(3/5)v(u−2v)(u+2v). */
  template(
    {
      id: "fc-uees-25",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "factoring",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 180,
      tags: ["factoring", "common-factor", "fractional-exponents", "difference-of-squares"],
      prerequisites: ["factoring"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "2 · 25",
        page: 2,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$u^{\\frac{3}{5}}v(u-2v)(u+2v)$", "$u^{\\frac{3}{5}}v(u-2v)(u+2v)$"), correct: true },
        { id: "b", text: L("$u^{\\frac{3}{5}}v\\left(u^{2}-4v^{2}\\right)$", "$u^{\\frac{3}{5}}v\\left(u^{2}-4v^{2}\\right)$"), correct: false },
        { id: "c", text: L("$u^{\\frac{3}{5}}v(u-2v)(u+v)$", "$u^{\\frac{3}{5}}v(u-2v)(u+v)$"), correct: false },
        { id: "d", text: L("$u^{\\frac{13}{5}}v(u-4v)(u+4v)$", "$u^{\\frac{13}{5}}v(u-4v)(u+4v)$"), correct: false },
      ];
      return {
        skill: L(
          "Factor común con exponentes fraccionarios y diferencia de cuadrados",
          "Common factor with fractional exponents and difference of squares",
        ),
        statement: L(
          "Factorice completamente:\n\n$$u^{\\frac{13}{5}}v-4u^{\\frac{3}{5}}v^{3}$$",
          "Factor completely:\n\n$$u^{\\frac{13}{5}}v-4u^{\\frac{3}{5}}v^{3}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El factor común de potencias de la misma base lleva el MENOR exponente; aquí también hay una $v$ común.",
            "The common factor of powers of the same base carries the SMALLEST exponent; here there is also a common $v$.",
          ),
          L(
            "Al dividir potencias se restan los exponentes: $u^{\\frac{13}{5}} \\div u^{\\frac{3}{5}} = u^{\\frac{10}{5}} = u^{2}$.",
            "Dividing powers subtracts the exponents: $u^{\\frac{13}{5}} \\div u^{\\frac{3}{5}} = u^{\\frac{10}{5}} = u^{2}$.",
          ),
          L(
            "Dentro del paréntesis queda $u^{2} - 4v^{2}$: es una diferencia de cuadrados.",
            "Inside the parentheses $u^{2} - 4v^{2}$ remains: it is a difference of squares.",
          ),
        ],
        answerDisplay: L(
          "$u^{\\frac{13}{5}}v-4u^{\\frac{3}{5}}v^{3} = u^{\\frac{3}{5}}v(u-2v)(u+2v)$",
          "$u^{\\frac{13}{5}}v-4u^{\\frac{3}{5}}v^{3} = u^{\\frac{3}{5}}v(u-2v)(u+2v)$",
        ),
        solution: [
          step(
            "given",
            "La expresión $u^{\\frac{13}{5}}v-4u^{\\frac{3}{5}}v^{3}$, con exponentes fraccionarios en $u$.",
            "The expression $u^{\\frac{13}{5}}v-4u^{\\frac{3}{5}}v^{3}$, with fractional exponents in $u$.",
          ),
          step(
            "approach",
            "Extraer el factor común $u^{\\frac{3}{5}}v$ (menor exponente de $u$ y la $v$ común) y luego factorizar la diferencia de cuadrados que queda.",
            "Pull out the common factor $u^{\\frac{3}{5}}v$ (smallest exponent of $u$ plus the common $v$) and then factor the remaining difference of squares.",
          ),
          step(
            "calculation",
            "$u^{\\frac{13}{5}}v-4u^{\\frac{3}{5}}v^{3} = u^{\\frac{3}{5}}v\\left(u^{2}-4v^{2}\\right)$<br>$u^{2}-4v^{2} = (u-2v)(u+2v)$<br>Entonces: $u^{\\frac{13}{5}}v-4u^{\\frac{3}{5}}v^{3} = u^{\\frac{3}{5}}v(u-2v)(u+2v)$",
            "$u^{\\frac{13}{5}}v-4u^{\\frac{3}{5}}v^{3} = u^{\\frac{3}{5}}v\\left(u^{2}-4v^{2}\\right)$<br>$u^{2}-4v^{2} = (u-2v)(u+2v)$<br>So: $u^{\\frac{13}{5}}v-4u^{\\frac{3}{5}}v^{3} = u^{\\frac{3}{5}}v(u-2v)(u+2v)$",
          ),
          step(
            "result",
            "$u^{\\frac{13}{5}}v-4u^{\\frac{3}{5}}v^{3} = u^{\\frac{3}{5}}v(u-2v)(u+2v)$. Control: con $u = 1$, $v = 1$: $1 - 4 = -3$ y $1 \\cdot 1 \\cdot (-1) \\cdot 3 = -3$ ✓.",
            "$u^{\\frac{13}{5}}v-4u^{\\frac{3}{5}}v^{3} = u^{\\frac{3}{5}}v(u-2v)(u+2v)$. Check: at $u = 1$, $v = 1$: $1 - 4 = -3$ and $1 \\cdot 1 \\cdot (-1) \\cdot 3 = -3$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S2.26 — 4x^(6/5)−1 = (2x^(3/5)−1)(2x^(3/5)+1). */
  template(
    {
      id: "fc-uees-26",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "factoring",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 180,
      tags: ["factoring", "fractional-exponents", "difference-of-squares"],
      prerequisites: ["factoring"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "2 · 26",
        page: 2,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$\\left(2x^{\\frac{3}{5}}-1\\right)\\left(2x^{\\frac{3}{5}}+1\\right)$", "$\\left(2x^{\\frac{3}{5}}-1\\right)\\left(2x^{\\frac{3}{5}}+1\\right)$"), correct: true },
        { id: "b", text: L("$\\left(2x^{\\frac{3}{5}}\\right)^{2}-1$", "$\\left(2x^{\\frac{3}{5}}\\right)^{2}-1$"), correct: false },
        { id: "c", text: L("$\\left(2x^{\\frac{6}{5}}-1\\right)\\left(2x^{\\frac{6}{5}}+1\\right)$", "$\\left(2x^{\\frac{6}{5}}-1\\right)\\left(2x^{\\frac{6}{5}}+1\\right)$"), correct: false },
        { id: "d", text: L("$\\left(4x^{\\frac{3}{5}}-1\\right)\\left(x^{\\frac{3}{5}}+1\\right)$", "$\\left(4x^{\\frac{3}{5}}-1\\right)\\left(x^{\\frac{3}{5}}+1\\right)$"), correct: false },
      ];
      return {
        skill: L(
          "Diferencia de cuadrados con exponentes fraccionarios",
          "Difference of squares with fractional exponents",
        ),
        statement: L(
          "Factorice completamente:\n\n$$4x^{\\frac{6}{5}}-1$$",
          "Factor completely:\n\n$$4x^{\\frac{6}{5}}-1$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El exponente fraccionario $\\frac{6}{5}$ es PAR al multiplicar por $\\frac{1}{2}$: piensa en el cuadrado de $2x^{\\frac{3}{5}}$.",
            "The fractional exponent $\\frac{6}{5}$ becomes even when halved: think of the square of $2x^{\\frac{3}{5}}$.",
          ),
          L(
            "$a^{2}-b^{2} = (a-b)(a+b)$.",
            "$a^{2}-b^{2} = (a-b)(a+b)$.",
          ),
          L(
            "Aquí $a = 2x^{\\frac{3}{5}}$ (porque $\\left(2x^{\\frac{3}{5}}\\right)^{2} = 4x^{\\frac{6}{5}}$) y $b = 1$.",
            "Here $a = 2x^{\\frac{3}{5}}$ (because $\\left(2x^{\\frac{3}{5}}\\right)^{2} = 4x^{\\frac{6}{5}}$) and $b = 1$.",
          ),
        ],
        answerDisplay: L(
          "$4x^{\\frac{6}{5}}-1 = \\left(2x^{\\frac{3}{5}}-1\\right)\\left(2x^{\\frac{3}{5}}+1\\right)$",
          "$4x^{\\frac{6}{5}}-1 = \\left(2x^{\\frac{3}{5}}-1\\right)\\left(2x^{\\frac{3}{5}}+1\\right)$",
        ),
        solution: [
          step(
            "given",
            "La expresión $4x^{\\frac{6}{5}}-1$.",
            "The expression $4x^{\\frac{6}{5}}-1$.",
          ),
          step(
            "approach",
            "Reconocer la diferencia de cuadrados con $a = 2x^{\\frac{3}{5}}$ y $b = 1$.",
            "Recognize the difference of squares with $a = 2x^{\\frac{3}{5}}$ and $b = 1$.",
          ),
          step(
            "calculation",
            "$4x^{\\frac{6}{5}}-1 = \\left(2x^{\\frac{3}{5}}\\right)^{2} - 1^{2} = \\left(2x^{\\frac{3}{5}}-1\\right)\\left(2x^{\\frac{3}{5}}+1\\right)$",
            "$4x^{\\frac{6}{5}}-1 = \\left(2x^{\\frac{3}{5}}\\right)^{2} - 1^{2} = \\left(2x^{\\frac{3}{5}}-1\\right)\\left(2x^{\\frac{3}{5}}+1\\right)$",
          ),
          step(
            "result",
            "$4x^{\\frac{6}{5}}-1 = \\left(2x^{\\frac{3}{5}}-1\\right)\\left(2x^{\\frac{3}{5}}+1\\right)$. Control: con $x = 1$: $4 - 1 = 3$ y $(2-1)(2+1) = 3$ ✓.",
            "$4x^{\\frac{6}{5}}-1 = \\left(2x^{\\frac{3}{5}}-1\\right)\\left(2x^{\\frac{3}{5}}+1\\right)$. Check: at $x = 1$: $4 - 1 = 3$ and $(2-1)(2+1) = 3$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S2.27 — 2x³+2x²−12x = 2x(x−2)(x+3). */
  template(
    {
      id: "fc-uees-27",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "factoring",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["factoring", "common-factor", "trinomial"],
      prerequisites: ["factoring"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "2 · 27",
        page: 2,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$2x(x-2)(x+3)$", "$2x(x-2)(x+3)$"), correct: true },
        { id: "b", text: L("$2x\\left(x^{2}+x-6\\right)$", "$2x\\left(x^{2}+x-6\\right)$"), correct: false },
        { id: "c", text: L("$2x(x+2)(x-3)$", "$2x(x+2)(x-3)$"), correct: false },
        { id: "d", text: L("$2x(x-2)(x-3)$", "$2x(x-2)(x-3)$"), correct: false },
      ];
      return {
        skill: L(
          "Factor común y trinomio simple",
          "Common factor and a simple trinomial",
        ),
        statement: L(
          "Factorice completamente:\n\n$$2x^{3}+2x^{2}-12x$$",
          "Factor completely:\n\n$$2x^{3}+2x^{2}-12x$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Los tres términos comparten $2x$: extráelo primero.",
            "The three terms share $2x$: pull it out first.",
          ),
          L(
            "El trinomio que queda se factoriza buscando dos números que multipliquen el independiente y sumen el coeficiente lineal.",
            "The remaining trinomial factors by looking for two numbers that multiply to the constant and add to the linear coefficient.",
          ),
          L(
            "Dentro queda $x^{2}+x-6$: busca dos números con producto $-6$ y suma $1$.",
            "Inside, $x^{2}+x-6$ remains: look for two numbers with product $-6$ and sum $1$.",
          ),
        ],
        answerDisplay: L(
          "$2x^{3}+2x^{2}-12x = 2x(x-2)(x+3)$",
          "$2x^{3}+2x^{2}-12x = 2x(x-2)(x+3)$",
        ),
        solution: [
          step(
            "given",
            "El polinomio $2x^{3}+2x^{2}-12x$.",
            "The polynomial $2x^{3}+2x^{2}-12x$.",
          ),
          step(
            "approach",
            "Factor común $2x$ y luego el trinomio $x^{2}+x-6$ por producto y suma.",
            "Common factor $2x$ and then the trinomial $x^{2}+x-6$ by product and sum.",
          ),
          step(
            "calculation",
            "$2x^{3}+2x^{2}-12x = 2x\\left(x^{2}+x-6\\right)$<br>$x^{2}+x-6 = (x-2)(x+3)$ (producto $-6$, suma $1$)<br>Entonces: $2x^{3}+2x^{2}-12x = 2x(x-2)(x+3)$",
            "$2x^{3}+2x^{2}-12x = 2x\\left(x^{2}+x-6\\right)$<br>$x^{2}+x-6 = (x-2)(x+3)$ (product $-6$, sum $1$)<br>So: $2x^{3}+2x^{2}-12x = 2x(x-2)(x+3)$",
          ),
          step(
            "result",
            "$2x^{3}+2x^{2}-12x = 2x(x-2)(x+3)$. Control: con $x = 3$: $54 + 18 - 36 = 36$ y $2 \\cdot 3 \\cdot 1 \\cdot 6 = 36$ ✓.",
            "$2x^{3}+2x^{2}-12x = 2x(x-2)(x+3)$. Check: at $x = 3$: $54 + 18 - 36 = 36$ and $2 \\cdot 3 \\cdot 1 \\cdot 6 = 36$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S2.28 — x²y²−4xy+4 = (xy−2)². */
  template(
    {
      id: "fc-uees-28",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "factoring",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["factoring", "perfect-square", "substitution"],
      prerequisites: ["factoring"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "2 · 28",
        page: 2,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$(xy-2)^{2}$", "$(xy-2)^{2}$"), correct: true },
        { id: "b", text: L("$(xy-2)(xy+2)$", "$(xy-2)(xy+2)$"), correct: false },
        { id: "c", text: L("$(xy+2)^{2}$", "$(xy+2)^{2}$"), correct: false },
        { id: "d", text: L("$(xy-4)^{2}$", "$(xy-4)^{2}$"), correct: false },
      ];
      return {
        skill: L(
          "Un trinomio cuadrado perfecto disfrazado (con xy)",
          "A perfect-square trinomial in disguise (with xy)",
        ),
        statement: L(
          "Factorice completamente:\n\n$$x^{2}y^{2}-4xy+4$$",
          "Factor completely:\n\n$$x^{2}y^{2}-4xy+4$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Trata el bloque $xy$ como si fuera una sola variable: escribe $u = xy$.",
            "Treat the block $xy$ as a single variable: write $u = xy$.",
          ),
          L(
            "Con $u = xy$ la expresión es $u^{2} - 4u + 4$, un trinomio cuadrado perfecto.",
            "With $u = xy$ the expression is $u^{2} - 4u + 4$, a perfect-square trinomial.",
          ),
          L(
            "El doble producto es $2 \\cdot xy \\cdot 2 = 4xy$ (el término central, con signo menos).",
            "The double product is $2 \\cdot xy \\cdot 2 = 4xy$ (the middle term, with a minus sign).",
          ),
        ],
        answerDisplay: L(
          "$x^{2}y^{2}-4xy+4 = (xy-2)^{2}$",
          "$x^{2}y^{2}-4xy+4 = (xy-2)^{2}$",
        ),
        solution: [
          step(
            "given",
            "La expresión $x^{2}y^{2}-4xy+4$.",
            "The expression $x^{2}y^{2}-4xy+4$.",
          ),
          step(
            "approach",
            "Sustitución $u = xy$: el trinomio $u^{2} - 4u + 4$ es un cuadrado perfecto.",
            "Substitution $u = xy$: the trinomial $u^{2} - 4u + 4$ is a perfect square.",
          ),
          step(
            "calculation",
            "$(xy)^{2} - 2 \\cdot xy \\cdot 2 + 2^{2} = (xy-2)^{2}$",
            "$(xy)^{2} - 2 \\cdot xy \\cdot 2 + 2^{2} = (xy-2)^{2}$",
          ),
          step(
            "result",
            "$x^{2}y^{2}-4xy+4 = (xy-2)^{2}$. Control: con $x = 3$, $y = 1$: $9 - 12 + 4 = 1$ y $(3-2)^{2} = 1$ ✓.",
            "$x^{2}y^{2}-4xy+4 = (xy-2)^{2}$. Check: at $x = 3$, $y = 1$: $9 - 12 + 4 = 1$ and $(3-2)^{2} = 1$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S2.29 — (4x+2)² = 4(2x+1)². */
  template(
    {
      id: "fc-uees-29",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "factoring",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["factoring", "common-factor", "perfect-square"],
      prerequisites: ["factoring"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "2 · 29",
        page: 2,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$4(2x+1)^{2}$", "$4(2x+1)^{2}$"), correct: true },
        { id: "b", text: L("$(4x+2)^{2}$", "$(4x+2)^{2}$"), correct: false },
        { id: "c", text: L("$2(2x+1)^{2}$", "$2(2x+1)^{2}$"), correct: false },
        { id: "d", text: L("$4(2x-1)^{2}$", "$4(2x-1)^{2}$"), correct: false },
      ];
      return {
        skill: L(
          "El cuadrado esconde un factor 4",
          "A hidden factor 4 inside the square",
        ),
        statement: L(
          "Factorice completamente:\n\n$$(4x+2)^{2}$$",
          "Factor completely:\n\n$$(4x+2)^{2}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Parece ya factorizado, pero el binomio de adentro todavía tiene un factor común.",
            "It looks factored already, but the binomial inside still has a common factor.",
          ),
          L(
            "$(ka)^{2} = k^{2}a^{2}$: el cuadrado de un producto reparte el exponente.",
            "$(ka)^{2} = k^{2}a^{2}$: the square of a product distributes the exponent.",
          ),
          L(
            "$4x+2 = 2(2x+1)$, así que el cuadrado del binomio contiene $2^{2} = 4$.",
            "$4x+2 = 2(2x+1)$, so the square of the binomial contains $2^{2} = 4$.",
          ),
        ],
        answerDisplay: L(
          "$(4x+2)^{2} = 4(2x+1)^{2}$",
          "$(4x+2)^{2} = 4(2x+1)^{2}$",
        ),
        solution: [
          step(
            "given",
            "El cuadrado $(4x+2)^{2}$: el binomio interior no es primo.",
            "The square $(4x+2)^{2}$: the inner binomial is not prime.",
          ),
          step(
            "approach",
            "Extraer el factor común $2$ del binomio interior; su cuadrado sale multiplicado como $4$.",
            "Pull the common factor $2$ out of the inner binomial; its square comes out as $4$.",
          ),
          step(
            "calculation",
            "$(4x+2)^{2} = \\left[2(2x+1)\\right]^{2} = 2^{2}(2x+1)^{2} = 4(2x+1)^{2}$",
            "$(4x+2)^{2} = \\left[2(2x+1)\\right]^{2} = 2^{2}(2x+1)^{2} = 4(2x+1)^{2}$",
          ),
          step(
            "result",
            "$(4x+2)^{2} = 4(2x+1)^{2}$. Control: con $x = 1$: $(4+2)^{2} = 36$ y $4(3)^{2} = 36$ ✓.",
            "$(4x+2)^{2} = 4(2x+1)^{2}$. Check: at $x = 1$: $(4+2)^{2} = 36$ and $4(3)^{2} = 36$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S2.30 — 2x²(2x−4x²)² = 8x⁴(1−2x)². */
  template(
    {
      id: "fc-uees-30",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "factoring",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 210,
      tags: ["factoring", "common-factor", "perfect-square"],
      prerequisites: ["factoring"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "2 · 30",
        page: 2,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$8x^{4}(1-2x)^{2}$", "$8x^{4}(1-2x)^{2}$"), correct: true },
        { id: "b", text: L("$2x^{2}\\left(2x-4x^{2}\\right)^{2}$", "$2x^{2}\\left(2x-4x^{2}\\right)^{2}$"), correct: false },
        { id: "c", text: L("$8x^{4}(1+2x)^{2}$", "$8x^{4}(1+2x)^{2}$"), correct: false },
        { id: "d", text: L("$4x^{4}(1-2x)^{2}$", "$4x^{4}(1-2x)^{2}$"), correct: false },
      ];
      return {
        skill: L(
          "Factorizar por dentro del cuadrado",
          "Factoring inside the square",
        ),
        statement: L(
          "Factorice completamente:\n\n$$2x^{2}\\left(2x-4x^{2}\\right)^{2}$$",
          "Factor completely:\n\n$$2x^{2}\\left(2x-4x^{2}\\right)^{2}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El binomio dentro del corchete todavía tiene factor común: factorízalo ANTES de cuadrar.",
            "The binomial inside the bracket still has a common factor: factor it BEFORE squaring.",
          ),
          L(
            "$(ka)^{2} = k^{2}a^{2}$: el factor que sacas del paréntesis sale al cuadrado.",
            "$(ka)^{2} = k^{2}a^{2}$: the factor you pull out of the parenthesis comes out squared.",
          ),
          L(
            "$2x-4x^{2} = 2x(1-2x)$, así que el corchete aporta $\\left(2x\\right)^{2} = 4x^{2}$.",
            "$2x-4x^{2} = 2x(1-2x)$, so the bracket contributes $\\left(2x\\right)^{2} = 4x^{2}$.",
          ),
        ],
        answerDisplay: L(
          "$2x^{2}\\left(2x-4x^{2}\\right)^{2} = 8x^{4}(1-2x)^{2}$",
          "$2x^{2}\\left(2x-4x^{2}\\right)^{2} = 8x^{4}(1-2x)^{2}$",
        ),
        solution: [
          step(
            "given",
            "La expresión $2x^{2}\\left(2x-4x^{2}\\right)^{2}$.",
            "The expression $2x^{2}\\left(2x-4x^{2}\\right)^{2}$.",
          ),
          step(
            "approach",
            "Factorizar el binomio interior ($2x$ común) y multiplicar las potencias con el coeficiente exterior.",
            "Factor the inner binomial (common $2x$) and multiply the powers with the outer coefficient.",
          ),
          step(
            "calculation",
            "$2x-4x^{2} = 2x(1-2x)$<br>$\\left[2x(1-2x)\\right]^{2} = 4x^{2}(1-2x)^{2}$<br>Total: $2x^{2} \\cdot 4x^{2}(1-2x)^{2} = 8x^{4}(1-2x)^{2}$",
            "$2x-4x^{2} = 2x(1-2x)$<br>$\\left[2x(1-2x)\\right]^{2} = 4x^{2}(1-2x)^{2}$<br>Total: $2x^{2} \\cdot 4x^{2}(1-2x)^{2} = 8x^{4}(1-2x)^{2}$",
          ),
          step(
            "result",
            "$2x^{2}\\left(2x-4x^{2}\\right)^{2} = 8x^{4}(1-2x)^{2}$. Control: con $x = 1$: $2 \\cdot (2-4)^{2} = 8$ y $8 \\cdot 1 \\cdot (-1)^{2} = 8$ ✓.",
            "$2x^{2}\\left(2x-4x^{2}\\right)^{2} = 8x^{4}(1-2x)^{2}$. Check: at $x = 1$: $2 \\cdot (2-4)^{2} = 8$ and $8 \\cdot 1 \\cdot (-1)^{2} = 8$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S2.31 — x³y²−16x²y+64x = x(xy−8)². */
  template(
    {
      id: "fc-uees-31",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "factoring",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 210,
      tags: ["factoring", "common-factor", "perfect-square", "substitution"],
      prerequisites: ["factoring"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "2 · 31",
        page: 2,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$x(xy-8)^{2}$", "$x(xy-8)^{2}$"), correct: true },
        { id: "b", text: L("$x\\left(x^{2}y^{2}-16xy+64\\right)$", "$x\\left(x^{2}y^{2}-16xy+64\\right)$"), correct: false },
        { id: "c", text: L("$x(xy-8)(xy+8)$", "$x(xy-8)(xy+8)$"), correct: false },
        { id: "d", text: L("$x(xy+8)^{2}$", "$x(xy+8)^{2}$"), correct: false },
      ];
      return {
        skill: L(
          "Factor común x y cuadrado perfecto en xy",
          "Common factor x and a perfect square in xy",
        ),
        statement: L(
          "Factorice completamente:\n\n$$x^{3}y^{2}-16x^{2}y+64x$$",
          "Factor completely:\n\n$$x^{3}y^{2}-16x^{2}y+64x$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Los tres términos comparten la $x$: sácala primero.",
            "The three terms share the $x$: pull it out first.",
          ),
          L(
            "Dentro queda un trinomio en el bloque $xy$: con $u = xy$ es $u^{2} - 16u + 64$.",
            "Inside remains a trinomial in the block $xy$: with $u = xy$ it is $u^{2} - 16u + 64$.",
          ),
          L(
            "El doble producto es $2 \\cdot xy \\cdot 8 = 16xy$ (el término central, con signo menos).",
            "The double product is $2 \\cdot xy \\cdot 8 = 16xy$ (the middle term, with a minus sign).",
          ),
        ],
        answerDisplay: L(
          "$x^{3}y^{2}-16x^{2}y+64x = x(xy-8)^{2}$",
          "$x^{3}y^{2}-16x^{2}y+64x = x(xy-8)^{2}$",
        ),
        solution: [
          step(
            "given",
            "El polinomio $x^{3}y^{2}-16x^{2}y+64x$.",
            "The polynomial $x^{3}y^{2}-16x^{2}y+64x$.",
          ),
          step(
            "approach",
            "Factor común $x$ y luego un trinomio cuadrado perfecto en el bloque $u = xy$.",
            "Common factor $x$ and then a perfect-square trinomial in the block $u = xy$.",
          ),
          step(
            "calculation",
            "$x^{3}y^{2}-16x^{2}y+64x = x\\left(x^{2}y^{2}-16xy+64\\right)$<br>Con $u = xy$: $u^{2} - 16u + 64 = (u-8)^{2}$<br>Entonces: $x^{3}y^{2}-16x^{2}y+64x = x(xy-8)^{2}$",
            "$x^{3}y^{2}-16x^{2}y+64x = x\\left(x^{2}y^{2}-16xy+64\\right)$<br>With $u = xy$: $u^{2} - 16u + 64 = (u-8)^{2}$<br>So: $x^{3}y^{2}-16x^{2}y+64x = x(xy-8)^{2}$",
          ),
          step(
            "result",
            "$x^{3}y^{2}-16x^{2}y+64x = x(xy-8)^{2}$. Control: con $x = 1$, $y = 1$: $1 - 16 + 64 = 49$ y $1 \\cdot (1-8)^{2} = 49$ ✓.",
            "$x^{3}y^{2}-16x^{2}y+64x = x(xy-8)^{2}$. Check: at $x = 1$, $y = 1$: $1 - 16 + 64 = 49$ and $1 \\cdot (1-8)^{2} = 49$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S2.32 — (5x²+2x)+(10x+4) = (5x+2)(x+2). */
  template(
    {
      id: "fc-uees-32",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "factoring",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["factoring", "grouping", "trinomial"],
      prerequisites: ["factoring"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "2 · 32",
        page: 2,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$(5x+2)(x+2)$", "$(5x+2)(x+2)$"), correct: true },
        { id: "b", text: L("$\\left(5x^{2}+2x\\right)+(10x+4)$", "$\\left(5x^{2}+2x\\right)+(10x+4)$"), correct: false },
        { id: "c", text: L("$(5x+4)(x+2)$", "$(5x+4)(x+2)$"), correct: false },
        { id: "d", text: L("$(5x+2)(x-2)$", "$(5x+2)(x-2)$"), correct: false },
      ];
      return {
        skill: L(
          "Sumar primero, factorizar después",
          "Add first, factor afterwards",
        ),
        statement: L(
          "Factorice completamente:\n\n$$\\left(5x^{2}+2x\\right)+(10x+4)$$",
          "Factor completely:\n\n$$\\left(5x^{2}+2x\\right)+(10x+4)$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Es una SUMA de dos grupos: primero elimina los paréntesis y reduce.",
            "It is a SUM of two groups: first drop the parentheses and combine.",
          ),
          L(
            "La suma es un trinomio $5x^{2} + 12x + 4$ que se factoriza con coeficiente principal $5$.",
            "The sum is a trinomial $5x^{2} + 12x + 4$ that factors with leading coefficient $5$.",
          ),
          L(
            "Necesitas $ac = 5$ y $bd = 4$ con cruce $12$: prueba el $5$ con el $2$ y el $1$ con el $2$.",
            "You need $ac = 5$ and $bd = 4$ with cross $12$: try the $5$ with the $2$ and the $1$ with the $2$.",
          ),
        ],
        answerDisplay: L(
          "$\\left(5x^{2}+2x\\right)+(10x+4) = (5x+2)(x+2)$",
          "$\\left(5x^{2}+2x\\right)+(10x+4) = (5x+2)(x+2)$",
        ),
        solution: [
          step(
            "given",
            "La suma de grupos $\\left(5x^{2}+2x\\right)+(10x+4)$.",
            "The sum of groups $\\left(5x^{2}+2x\\right)+(10x+4)$.",
          ),
          step(
            "approach",
            "Reducir la suma a un solo trinomio y factorizarlo con la técnica del coeficiente principal.",
            "Reduce the sum to a single trinomial and factor it with the leading-coefficient technique.",
          ),
          step(
            "calculation",
            "$\\left(5x^{2}+2x\\right)+(10x+4) = 5x^{2} + 12x + 4$<br>$5x^{2} + 12x + 4 = (5x+2)(x+2)$",
            "$\\left(5x^{2}+2x\\right)+(10x+4) = 5x^{2} + 12x + 4$<br>$5x^{2} + 12x + 4 = (5x+2)(x+2)$",
          ),
          step(
            "result",
            "$\\left(5x^{2}+2x\\right)+(10x+4) = (5x+2)(x+2)$. Control: con $x = 2$: $(20+4)+(20+4) = 48$ y $(12)(4) = 48$ ✓.",
            "$\\left(5x^{2}+2x\\right)+(10x+4) = (5x+2)(x+2)$. Check: at $x = 2$: $(20+4)+(20+4) = 48$ and $(12)(4) = 48$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S2.33 — (x³−4x)+(8−2x²) = (x−2)²(x+2). */
  template(
    {
      id: "fc-uees-33",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "factoring",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 210,
      tags: ["factoring", "grouping", "difference-of-squares"],
      prerequisites: ["factoring"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "2 · 33",
        page: 2,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$(x-2)^{2}(x+2)$", "$(x-2)^{2}(x+2)$"), correct: true },
        { id: "b", text: L("$(x-2)\\left(x^{2}-4\\right)$", "$(x-2)\\left(x^{2}-4\\right)$"), correct: false },
        { id: "c", text: L("$(x+2)^{2}(x-2)$", "$(x+2)^{2}(x-2)$"), correct: false },
        { id: "d", text: L("$(x-2)^{3}$", "$(x-2)^{3}$"), correct: false },
      ];
      return {
        skill: L(
          "Reagrupar para hallar el factor común (x²−4)",
          "Regrouping to find the common factor (x²−4)",
        ),
        statement: L(
          "Factorice completamente:\n\n$$\\left(x^{3}-4x\\right)+\\left(8-2x^{2}\\right)$$",
          "Factor completely:\n\n$$\\left(x^{3}-4x\\right)+\\left(8-2x^{2}\\right)$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Factoriza cada grupo por separado: ambos esconden el bloque $x^{2}-4$.",
            "Factor each group separately: both hide the block $x^{2}-4$.",
          ),
          L(
            "$x^{3}-4x = x\\left(x^{2}-4\\right)$ y $8-2x^{2} = -2\\left(x^{2}-4\\right)$.",
            "$x^{3}-4x = x\\left(x^{2}-4\\right)$ and $8-2x^{2} = -2\\left(x^{2}-4\\right)$.",
          ),
          L(
            "Con el bloque común fuera queda $(x-2)$; y el bloque $x^{2}-4$ todavía se abre como diferencia de cuadrados.",
            "With the common block outside, $(x-2)$ remains; and the block $x^{2}-4$ still opens as a difference of squares.",
          ),
        ],
        answerDisplay: L(
          "$\\left(x^{3}-4x\\right)+\\left(8-2x^{2}\\right) = (x-2)^{2}(x+2)$",
          "$\\left(x^{3}-4x\\right)+\\left(8-2x^{2}\\right) = (x-2)^{2}(x+2)$",
        ),
        solution: [
          step(
            "given",
            "La suma de grupos $\\left(x^{3}-4x\\right)+\\left(8-2x^{2}\\right)$.",
            "The sum of groups $\\left(x^{3}-4x\\right)+\\left(8-2x^{2}\\right)$.",
          ),
          step(
            "approach",
            "Factorizar cada grupo, extraer el factor común $\\left(x^{2}-4\\right)$ y abrir la diferencia de cuadrados.",
            "Factor each group, pull out the common factor $\\left(x^{2}-4\\right)$ and open the difference of squares.",
          ),
          step(
            "calculation",
            "$x^{3}-4x = x\\left(x^{2}-4\\right)$ y $8-2x^{2} = -2\\left(x^{2}-4\\right)$<br>Suma: $x\\left(x^{2}-4\\right) - 2\\left(x^{2}-4\\right) = (x-2)\\left(x^{2}-4\\right)$<br>$x^{2}-4 = (x-2)(x+2)$, así que: $(x-2)^{2}(x+2)$",
            "$x^{3}-4x = x\\left(x^{2}-4\\right)$ and $8-2x^{2} = -2\\left(x^{2}-4\\right)$<br>Sum: $x\\left(x^{2}-4\\right) - 2\\left(x^{2}-4\\right) = (x-2)\\left(x^{2}-4\\right)$<br>$x^{2}-4 = (x-2)(x+2)$, so: $(x-2)^{2}(x+2)$",
          ),
          step(
            "result",
            "$\\left(x^{3}-4x\\right)+\\left(8-2x^{2}\\right) = (x-2)^{2}(x+2)$. Control: con $x = 3$: $(27-12)+(8-18) = 5$ y $(1)^{2}(5) = 5$ ✓.",
            "$\\left(x^{3}-4x\\right)+\\left(8-2x^{2}\\right) = (x-2)^{2}(x+2)$. Check: at $x = 3$: $(27-12)+(8-18) = 5$ and $(1)^{2}(5) = 5$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S2.34 — (x²−1)+(x²−x−2) = (2x−3)(x+1). */
  template(
    {
      id: "fc-uees-34",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "factoring",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["factoring", "grouping", "trinomial"],
      prerequisites: ["factoring"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "2 · 34",
        page: 2,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$(2x-3)(x+1)$", "$(2x-3)(x+1)$"), correct: true },
        { id: "b", text: L("$\\left(x^{2}-1\\right)+\\left(x^{2}-x-2\\right)$", "$\\left(x^{2}-1\\right)+\\left(x^{2}-x-2\\right)$"), correct: false },
        { id: "c", text: L("$(2x+3)(x+1)$", "$(2x+3)(x+1)$"), correct: false },
        { id: "d", text: L("$(2x-3)(x-1)$", "$(2x-3)(x-1)$"), correct: false },
      ];
      return {
        skill: L(
          "Sumar primero y factorizar el trinomio",
          "Add first and factor the trinomial",
        ),
        statement: L(
          "Factorice completamente:\n\n$$\\left(x^{2}-1\\right)+\\left(x^{2}-x-2\\right)$$",
          "Factor completely:\n\n$$\\left(x^{2}-1\\right)+\\left(x^{2}-x-2\\right)$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Primero suma los dos grupos: queda un solo trinomio.",
            "First add the two groups: a single trinomial remains.",
          ),
          L(
            "El trinomio $2x^{2}-x-3$ tiene coeficiente principal $2$: busca $ac = 2$, $bd = -3$.",
            "The trinomial $2x^{2}-x-3$ has leading coefficient $2$: look for $ac = 2$, $bd = -3$.",
          ),
          L(
            "El cruce debe dar $-1$: prueba el $2$ con el $+1$ y el $-3$ con el $1$.",
            "The cross must give $-1$: try the $2$ with the $+1$ and the $-3$ with the $1$.",
          ),
        ],
        answerDisplay: L(
          "$\\left(x^{2}-1\\right)+\\left(x^{2}-x-2\\right) = (2x-3)(x+1)$",
          "$\\left(x^{2}-1\\right)+\\left(x^{2}-x-2\\right) = (2x-3)(x+1)$",
        ),
        solution: [
          step(
            "given",
            "La suma de grupos $\\left(x^{2}-1\\right)+\\left(x^{2}-x-2\\right)$.",
            "The sum of groups $\\left(x^{2}-1\\right)+\\left(x^{2}-x-2\\right)$.",
          ),
          step(
            "approach",
            "Reducir la suma al trinomio $2x^{2}-x-3$ y factorizarlo.",
            "Reduce the sum to the trinomial $2x^{2}-x-3$ and factor it.",
          ),
          step(
            "calculation",
            "$\\left(x^{2}-1\\right)+\\left(x^{2}-x-2\\right) = 2x^{2} - x - 3$<br>$2x^{2} - x - 3 = (2x-3)(x+1)$ (producto $-6$, suma $-1$)",
            "$\\left(x^{2}-1\\right)+\\left(x^{2}-x-2\\right) = 2x^{2} - x - 3$<br>$2x^{2} - x - 3 = (2x-3)(x+1)$ (product $-6$, sum $-1$)",
          ),
          step(
            "result",
            "$\\left(x^{2}-1\\right)+\\left(x^{2}-x-2\\right) = (2x-3)(x+1)$. Control: con $x = 2$: $(4-1)+(4-2-2) = 3$ y $(1)(3) = 3$ ✓.",
            "$\\left(x^{2}-1\\right)+\\left(x^{2}-x-2\\right) = (2x-3)(x+1)$. Check: at $x = 2$: $(4-1)+(4-2-2) = 3$ and $(1)(3) = 3$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S2.35 — RETO: (y⁴+8y³+16y²)−(y²+8y+16) = (y−1)(y+1)(y+4)². */
  template(
    {
      id: "fc-uees-35",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "factoring",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["factoring", "perfect-square", "difference-of-squares", "challenge"],
      prerequisites: ["factoring"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "2 · 35",
        page: 2,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$(y-1)(y+1)(y+4)^{2}$", "$(y-1)(y+1)(y+4)^{2}$"), correct: true },
        { id: "b", text: L("$\\left(y^{2}+3y-4\\right)\\left(y^{2}+5y+4\\right)$", "$\\left(y^{2}+3y-4\\right)\\left(y^{2}+5y+4\\right)$"), correct: false },
        { id: "c", text: L("$(y-1)(y+1)(y+4)$", "$(y-1)(y+1)(y+4)$"), correct: false },
        { id: "d", text: L("$(y+1)(y+4)^{2}$", "$(y+1)(y+4)^{2}$"), correct: false },
      ];
      return {
        skill: L(
          "RETO: dos cuadrados perfectos y una diferencia de cuadrados",
          "CHALLENGE: two perfect squares and a difference of squares",
        ),
        statement: L(
          "Factorice completamente:\n\n$$\\left(y^{4}+8y^{3}+16y^{2}\\right)-\\left(y^{2}+8y+16\\right)$$",
          "Factor completely:\n\n$$\\left(y^{4}+8y^{3}+16y^{2}\\right)-\\left(y^{2}+8y+16\\right)$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Mira cada paréntesis como un bloque: ¿el primero no es el cuadrado de $y^{2}+4y$? ¿Y el segundo?",
            "Look at each parenthesis as a block: is the first one not the square of $y^{2}+4y$? And the second one?",
          ),
          L(
            "$y^{4}+8y^{3}+16y^{2} = \\left(y^{2}+4y\\right)^{2}$ y $y^{2}+8y+16 = (y+4)^{2}$: la resta es una diferencia de cuadrados.",
            "$y^{4}+8y^{3}+16y^{2} = \\left(y^{2}+4y\\right)^{2}$ and $y^{2}+8y+16 = (y+4)^{2}$: the subtraction is a difference of squares.",
          ),
          L(
            "$\\left(y^{2}+4y\\right)^{2}-(y+4)^{2} = \\left(y^{2}+3y-4\\right)\\left(y^{2}+5y+4\\right)$: a cada cuadrático todavía le falta factorizar.",
            "$\\left(y^{2}+4y\\right)^{2}-(y+4)^{2} = \\left(y^{2}+3y-4\\right)\\left(y^{2}+5y+4\\right)$: each quadratic still needs factoring.",
          ),
        ],
        answerDisplay: L(
          "$\\left(y^{4}+8y^{3}+16y^{2}\\right)-\\left(y^{2}+8y+16\\right) = (y-1)(y+1)(y+4)^{2}$",
          "$\\left(y^{4}+8y^{3}+16y^{2}\\right)-\\left(y^{2}+8y+16\\right) = (y-1)(y+1)(y+4)^{2}$",
        ),
        solution: [
          step(
            "given",
            "La resta $\\left(y^{4}+8y^{3}+16y^{2}\\right)-\\left(y^{2}+8y+16\\right)$ (ítem de reto de la tarea).",
            "The subtraction $\\left(y^{4}+8y^{3}+16y^{2}\\right)-\\left(y^{2}+8y+16\\right)$ (the challenge item of the assignment).",
          ),
          step(
            "approach",
            "Reconocer los DOS trinomios como cuadrados perfectos; su resta es una diferencia de cuadrados y los cuadráticos resultantes se factorizan por producto y suma.",
            "Recognize BOTH trinomials as perfect squares; their subtraction is a difference of squares and the resulting quadratics factor by product and sum.",
          ),
          step(
            "calculation",
            "$y^{4}+8y^{3}+16y^{2} = \\left(y^{2}+4y\\right)^{2}$ y $y^{2}+8y+16 = (y+4)^{2}$<br>Diferencia de cuadrados: $\\left(y^{2}+4y\\right)^{2}-(y+4)^{2} = \\left(y^{2}+3y-4\\right)\\left(y^{2}+5y+4\\right)$<br>$y^{2}+3y-4 = (y-1)(y+4)$ y $y^{2}+5y+4 = (y+1)(y+4)$<br>Entonces: $(y-1)(y+4)(y+1)(y+4) = (y-1)(y+1)(y+4)^{2}$",
            "$y^{4}+8y^{3}+16y^{2} = \\left(y^{2}+4y\\right)^{2}$ and $y^{2}+8y+16 = (y+4)^{2}$<br>Difference of squares: $\\left(y^{2}+4y\\right)^{2}-(y+4)^{2} = \\left(y^{2}+3y-4\\right)\\left(y^{2}+5y+4\\right)$<br>$y^{2}+3y-4 = (y-1)(y+4)$ and $y^{2}+5y+4 = (y+1)(y+4)$<br>So: $(y-1)(y+4)(y+1)(y+4) = (y-1)(y+1)(y+4)^{2}$",
          ),
          step(
            "result",
            "$\\left(y^{4}+8y^{3}+16y^{2}\\right)-\\left(y^{2}+8y+16\\right) = (y-1)(y+1)(y+4)^{2}$ — detenerse en $\\left(y^{2}+3y-4\\right)\\left(y^{2}+5y+4\\right)$ es quedarse a medias. Control: con $y = 0$: $0 - 16 = -16$ y $(-1)(1)(16) = -16$ ✓.",
            "$\\left(y^{4}+8y^{3}+16y^{2}\\right)-\\left(y^{2}+8y+16\\right) = (y-1)(y+1)(y+4)^{2}$ — stopping at $\\left(y^{2}+3y-4\\right)\\left(y^{2}+5y+4\\right)$ is half way. Check: at $y = 0$: $0 - 16 = -16$ and $(-1)(1)(16) = -16$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S2.36 — t³u−3tu+t²w²−3w² = (t²−3)(tu+w²). */
  template(
    {
      id: "fc-uees-36",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "factoring",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 210,
      tags: ["factoring", "grouping", "common-factor"],
      prerequisites: ["factoring"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "2 · 36",
        page: 2,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$\\left(t^{2}-3\\right)\\left(tu+w^{2}\\right)$", "$\\left(t^{2}-3\\right)\\left(tu+w^{2}\\right)$"), correct: true },
        { id: "b", text: L("$u\\left(t^{3}-3t\\right)+w^{2}\\left(t^{2}-3\\right)$", "$u\\left(t^{3}-3t\\right)+w^{2}\\left(t^{2}-3\\right)$"), correct: false },
        { id: "c", text: L("$\\left(t^{2}-3\\right)\\left(tu-w^{2}\\right)$", "$\\left(t^{2}-3\\right)\\left(tu-w^{2}\\right)$"), correct: false },
        { id: "d", text: L("$\\left(t^{2}+3\\right)\\left(tu+w^{2}\\right)$", "$\\left(t^{2}+3\\right)\\left(tu+w^{2}\\right)$"), correct: false },
      ];
      return {
        skill: L(
          "Agrupación con dos letras y un cuadrado",
          "Grouping with two letters and a square",
        ),
        statement: L(
          "Factorice completamente:\n\n$$t^{3}u-3tu+t^{2}w^{2}-3w^{2}$$",
          "Factor completely:\n\n$$t^{3}u-3tu+t^{2}w^{2}-3w^{2}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Agrupa los dos términos con $u$ y los dos con $w^{2}$.",
            "Group the two terms with $u$ and the two with $w^{2}$.",
          ),
          L(
            "$t^{3}u - 3tu = tu\\left(t^{2}-3\\right)$: el bloque $t^{2}-3$ aparece también en $t^{2}w^{2} - 3w^{2}$.",
            "$t^{3}u - 3tu = tu\\left(t^{2}-3\\right)$: the block $t^{2}-3$ also appears in $t^{2}w^{2} - 3w^{2}$.",
          ),
          L(
            "$t^{2}w^{2} - 3w^{2} = w^{2}\\left(t^{2}-3\\right)$: ahora extrae ese bloque común.",
            "$t^{2}w^{2} - 3w^{2} = w^{2}\\left(t^{2}-3\\right)$: now pull out that common block.",
          ),
        ],
        answerDisplay: L(
          "$t^{3}u-3tu+t^{2}w^{2}-3w^{2} = \\left(t^{2}-3\\right)\\left(tu+w^{2}\\right)$",
          "$t^{3}u-3tu+t^{2}w^{2}-3w^{2} = \\left(t^{2}-3\\right)\\left(tu+w^{2}\\right)$",
        ),
        solution: [
          step(
            "given",
            "El polinomio $t^{3}u-3tu+t^{2}w^{2}-3w^{2}$ en las variables $t$, $u$ y $w$.",
            "The polynomial $t^{3}u-3tu+t^{2}w^{2}-3w^{2}$ in the variables $t$, $u$ and $w$.",
          ),
          step(
            "approach",
            "Agrupación: factorizar cada par y extraer el bloque común $\\left(t^{2}-3\\right)$.",
            "Grouping: factor each pair and pull out the common block $\\left(t^{2}-3\\right)$.",
          ),
          step(
            "calculation",
            "$t^{3}u-3tu = tu\\left(t^{2}-3\\right)$ y $t^{2}w^{2}-3w^{2} = w^{2}\\left(t^{2}-3\\right)$<br>$tu\\left(t^{2}-3\\right) + w^{2}\\left(t^{2}-3\\right) = \\left(t^{2}-3\\right)\\left(tu+w^{2}\\right)$",
            "$t^{3}u-3tu = tu\\left(t^{2}-3\\right)$ and $t^{2}w^{2}-3w^{2} = w^{2}\\left(t^{2}-3\\right)$<br>$tu\\left(t^{2}-3\\right) + w^{2}\\left(t^{2}-3\\right) = \\left(t^{2}-3\\right)\\left(tu+w^{2}\\right)$",
          ),
          step(
            "result",
            "$t^{3}u-3tu+t^{2}w^{2}-3w^{2} = \\left(t^{2}-3\\right)\\left(tu+w^{2}\\right)$ (sobre los racionales, $t^{2}-3$ ya no se factoriza). Control: con $t = 2$, $u = 1$, $w = 1$: $8 - 6 + 4 - 3 = 3$ y $(1)(2+1) = 3$ ✓.",
            "$t^{3}u-3tu+t^{2}w^{2}-3w^{2} = \\left(t^{2}-3\\right)\\left(tu+w^{2}\\right)$ (over the rationals, $t^{2}-3$ does not factor further). Check: at $t = 2$, $u = 1$, $w = 1$: $8 - 6 + 4 - 3 = 3$ and $(1)(2+1) = 3$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S2.37 — b³+64 = (b+4)(b²−4b+16). */
  template(
    {
      id: "fc-uees-37",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "factoring",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 90,
      tags: ["factoring", "sum-of-cubes"],
      prerequisites: ["factoring"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "2 · 37",
        page: 2,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$(b+4)\\left(b^{2}-4b+16\\right)$", "$(b+4)\\left(b^{2}-4b+16\\right)$"), correct: true },
        { id: "b", text: L("$(b+4)\\left(b^{2}+4b+16\\right)$", "$(b+4)\\left(b^{2}+4b+16\\right)$"), correct: false },
        { id: "c", text: L("$(b-4)\\left(b^{2}+4b+16\\right)$", "$(b-4)\\left(b^{2}+4b+16\\right)$"), correct: false },
        { id: "d", text: L("$(b+4)\\left(b^{2}-16\\right)$", "$(b+4)\\left(b^{2}-16\\right)$"), correct: false },
      ];
      return {
        skill: L(
          "Suma de cubos (b³+64)",
          "Sum of cubes (b³+64)",
        ),
        statement: L(
          "Factorice completamente:\n\n$$b^{3}+64$$",
          "Factor completely:\n\n$$b^{3}+64$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Dos cubos perfectos sumados: $b^{3}$ y $64 = 4^{3}$.",
            "Two perfect cubes added: $b^{3}$ and $64 = 4^{3}$.",
          ),
          L(
            "$a^{3}+b^{3} = (a+b)\\left(a^{2}-ab+b^{2}\\right)$.",
            "$a^{3}+b^{3} = (a+b)\\left(a^{2}-ab+b^{2}\\right)$.",
          ),
          L(
            "Aquí $a = b$ y $b = 4$: el cociente es $b^{2} - 4b + 16$.",
            "Here $a = b$ and $b = 4$: the quotient is $b^{2} - 4b + 16$.",
          ),
        ],
        answerDisplay: L(
          "$b^{3}+64 = (b+4)\\left(b^{2}-4b+16\\right)$",
          "$b^{3}+64 = (b+4)\\left(b^{2}-4b+16\\right)$",
        ),
        solution: [
          step(
            "given",
            "El binomio $b^{3}+64$.",
            "The binomial $b^{3}+64$.",
          ),
          step(
            "approach",
            "Suma de cubos con $a = b$ y $b = 4$.",
            "Sum of cubes with $a = b$ and $b = 4$.",
          ),
          step(
            "calculation",
            "$b^{3}+4^{3} = (b+4)\\left(b^{2} - b \\cdot 4 + 4^{2}\\right) = (b+4)\\left(b^{2}-4b+16\\right)$",
            "$b^{3}+4^{3} = (b+4)\\left(b^{2} - b \\cdot 4 + 4^{2}\\right) = (b+4)\\left(b^{2}-4b+16\\right)$",
          ),
          step(
            "result",
            "$b^{3}+64 = (b+4)\\left(b^{2}-4b+16\\right)$ (el cociente $b^{2}-4b+16$ ya no factoriza). Control: con $b = 2$: $8 + 64 = 72$ y $(6)(4 - 8 + 16) = 6 \\cdot 12 = 72$ ✓.",
            "$b^{3}+64 = (b+4)\\left(b^{2}-4b+16\\right)$ (the quotient $b^{2}-4b+16$ does not factor further). Check: at $b = 2$: $8 + 64 = 72$ and $(6)(4 - 8 + 16) = 6 \\cdot 12 = 72$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S2.38 — x³−1 = (x−1)(x²+x+1). */
  template(
    {
      id: "fc-uees-38",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "factoring",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 90,
      tags: ["factoring", "difference-of-cubes"],
      prerequisites: ["factoring"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "2 · 38",
        page: 2,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$(x-1)\\left(x^{2}+x+1\\right)$", "$(x-1)\\left(x^{2}+x+1\\right)$"), correct: true },
        { id: "b", text: L("$(x-1)\\left(x^{2}-x+1\\right)$", "$(x-1)\\left(x^{2}-x+1\\right)$"), correct: false },
        { id: "c", text: L("$(x+1)\\left(x^{2}-x+1\\right)$", "$(x+1)\\left(x^{2}-x+1\\right)$"), correct: false },
        { id: "d", text: L("$(x-1)\\left(x^{2}+1\\right)$", "$(x-1)\\left(x^{2}+1\\right)$"), correct: false },
      ];
      return {
        skill: L(
          "Diferencia de cubos (x³−1)",
          "Difference of cubes (x³−1)",
        ),
        statement: L(
          "Factorice completamente:\n\n$$x^{3}-1$$",
          "Factor completely:\n\n$$x^{3}-1$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Es la diferencia de dos cubos: $x^{3}$ y $1 = 1^{3}$.",
            "It is the difference of two cubes: $x^{3}$ and $1 = 1^{3}$.",
          ),
          L(
            "$a^{3}-b^{3} = (a-b)\\left(a^{2}+ab+b^{2}\\right)$.",
            "$a^{3}-b^{3} = (a-b)\\left(a^{2}+ab+b^{2}\\right)$.",
          ),
          L(
            "Con $a = x$ y $b = 1$, el cociente es $x^{2} + x + 1$ (signo central POSITIVO aunque la resta sea negativa).",
            "With $a = x$ and $b = 1$, the quotient is $x^{2} + x + 1$ (POSITIVE middle sign even though the subtraction is negative).",
          ),
        ],
        answerDisplay: L(
          "$x^{3}-1 = (x-1)\\left(x^{2}+x+1\\right)$",
          "$x^{3}-1 = (x-1)\\left(x^{2}+x+1\\right)$",
        ),
        solution: [
          step(
            "given",
            "El binomio $x^{3}-1$.",
            "The binomial $x^{3}-1$.",
          ),
          step(
            "approach",
            "Diferencia de cubos con $a = x$ y $b = 1$.",
            "Difference of cubes with $a = x$ and $b = 1$.",
          ),
          step(
            "calculation",
            "$x^{3}-1^{3} = (x-1)\\left(x^{2} + x \\cdot 1 + 1^{2}\\right) = (x-1)\\left(x^{2}+x+1\\right)$",
            "$x^{3}-1^{3} = (x-1)\\left(x^{2} + x \\cdot 1 + 1^{2}\\right) = (x-1)\\left(x^{2}+x+1\\right)$",
          ),
          step(
            "result",
            "$x^{3}-1 = (x-1)\\left(x^{2}+x+1\\right)$. Control: con $x = 2$: $8 - 1 = 7$ y $(1)(4+2+1) = 7$ ✓.",
            "$x^{3}-1 = (x-1)\\left(x^{2}+x+1\\right)$. Check: at $x = 2$: $8 - 1 = 7$ and $(1)(4+2+1) = 7$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S2.39 — x⁶−1 = (x−1)(x+1)(x²+x+1)(x²−x+1). */
  template(
    {
      id: "fc-uees-39",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "factoring",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["factoring", "difference-of-squares", "difference-of-cubes"],
      prerequisites: ["factoring"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "2 · 39",
        page: 2,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$(x-1)(x+1)\\left(x^{2}+x+1\\right)\\left(x^{2}-x+1\\right)$", "$(x-1)(x+1)\\left(x^{2}+x+1\\right)\\left(x^{2}-x+1\\right)$"), correct: true },
        { id: "b", text: L("$\\left(x^{2}-1\\right)\\left(x^{4}+x^{2}+1\\right)$", "$\\left(x^{2}-1\\right)\\left(x^{4}+x^{2}+1\\right)$"), correct: false },
        { id: "c", text: L("$(x^{3}-1)(x^{3}+1)$", "$(x^{3}-1)(x^{3}+1)$"), correct: false },
        { id: "d", text: L("$(x-1)(x+1)\\left(x^{2}+1\\right)$", "$(x-1)(x+1)\\left(x^{2}+1\\right)$"), correct: false },
      ];
      return {
        skill: L(
          "Diferencia de cuadrados Y de cubos (x⁶−1)",
          "Difference of squares AND cubes (x⁶−1)",
        ),
        statement: L(
          "Factorice completamente:\n\n$$x^{6}-1$$",
          "Factor completely:\n\n$$x^{6}-1$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El exponente 6 es par Y múltiplo de 3: se puede empezar por cuadrados o por cubos.",
            "The exponent 6 is even AND a multiple of 3: you may start with squares or with cubes.",
          ),
          L(
            "$x^{6}-1 = (x^{3}-1)(x^{3}+1)$ y cada cubo se abre con su identidad.",
            "$x^{6}-1 = (x^{3}-1)(x^{3}+1)$ and each cube opens with its identity.",
          ),
          L(
            "$x^{3}-1 = (x-1)\\left(x^{2}+x+1\\right)$ y $x^{3}+1 = (x+1)\\left(x^{2}-x+1\\right)$: cuatro factores en total.",
            "$x^{3}-1 = (x-1)\\left(x^{2}+x+1\\right)$ and $x^{3}+1 = (x+1)\\left(x^{2}-x+1\\right)$: four factors in total.",
          ),
        ],
        answerDisplay: L(
          "$x^{6}-1 = (x-1)(x+1)\\left(x^{2}+x+1\\right)\\left(x^{2}-x+1\\right)$",
          "$x^{6}-1 = (x-1)(x+1)\\left(x^{2}+x+1\\right)\\left(x^{2}-x+1\\right)$",
        ),
        solution: [
          step(
            "given",
            "El binomio $x^{6}-1$.",
            "The binomial $x^{6}-1$.",
          ),
          step(
            "approach",
            "Cadena de identidades: diferencia de cuadrados en $x^{3}$ y luego suma y diferencia de cubos.",
            "Chain of identities: difference of squares in $x^{3}$ and then sum and difference of cubes.",
          ),
          step(
            "calculation",
            "$x^{6}-1 = \\left(x^{3}\\right)^{2} - 1 = (x^{3}-1)(x^{3}+1)$<br>$x^{3}-1 = (x-1)\\left(x^{2}+x+1\\right)$ y $x^{3}+1 = (x+1)\\left(x^{2}-x+1\\right)$<br>Entonces: $x^{6}-1 = (x-1)(x+1)\\left(x^{2}+x+1\\right)\\left(x^{2}-x+1\\right)$",
            "$x^{6}-1 = \\left(x^{3}\\right)^{2} - 1 = (x^{3}-1)(x^{3}+1)$<br>$x^{3}-1 = (x-1)\\left(x^{2}+x+1\\right)$ and $x^{3}+1 = (x+1)\\left(x^{2}-x+1\\right)$<br>So: $x^{6}-1 = (x-1)(x+1)\\left(x^{2}+x+1\\right)\\left(x^{2}-x+1\\right)$",
          ),
          step(
            "result",
            "$x^{6}-1 = (x-1)(x+1)\\left(x^{2}+x+1\\right)\\left(x^{2}-x+1\\right)$ — los cuadráticos $x^{2} \\pm x + 1$ ya no factorizan sobre los reales. Control: con $x = 2$: $64 - 1 = 63$ y $(1)(3)(7)(3) = 63$ ✓.",
            "$x^{6}-1 = (x-1)(x+1)\\left(x^{2}+x+1\\right)\\left(x^{2}-x+1\\right)$ — the quadratics $x^{2} \\pm x + 1$ do not factor over the reals. Check: at $x = 2$: $64 - 1 = 63$ and $(1)(3)(7)(3) = 63$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S2.40 — 27+8x³ = (3+2x)(9−6x+4x²). */
  template(
    {
      id: "fc-uees-40",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "factoring",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 90,
      tags: ["factoring", "sum-of-cubes"],
      prerequisites: ["factoring"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "2 · 40",
        page: 2,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$(3+2x)\\left(9-6x+4x^{2}\\right)$", "$(3+2x)\\left(9-6x+4x^{2}\\right)$"), correct: true },
        { id: "b", text: L("$(3+2x)\\left(9+6x+4x^{2}\\right)$", "$(3+2x)\\left(9+6x+4x^{2}\\right)$"), correct: false },
        { id: "c", text: L("$(3-2x)\\left(9+6x+4x^{2}\\right)$", "$(3-2x)\\left(9+6x+4x^{2}\\right)$"), correct: false },
        { id: "d", text: L("$(3+2x)\\left(9-4x^{2}\\right)$", "$(3+2x)\\left(9-4x^{2}\\right)$"), correct: false },
      ];
      return {
        skill: L(
          "Suma de cubos (27+8x³)",
          "Sum of cubes (27+8x³)",
        ),
        statement: L(
          "Factorice completamente:\n\n$$27+8x^{3}$$",
          "Factor completely:\n\n$$27+8x^{3}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Ambos términos son cubos: $27 = 3^{3}$ y $8x^{3} = (2x)^{3}$.",
            "Both terms are cubes: $27 = 3^{3}$ and $8x^{3} = (2x)^{3}$.",
          ),
          L(
            "$a^{3}+b^{3} = (a+b)\\left(a^{2}-ab+b^{2}\\right)$.",
            "$a^{3}+b^{3} = (a+b)\\left(a^{2}-ab+b^{2}\\right)$.",
          ),
          L(
            "Con $a = 3$ y $b = 2x$: el producto central es $-3 \\cdot 2x = -6x$.",
            "With $a = 3$ and $b = 2x$: the middle product is $-3 \\cdot 2x = -6x$.",
          ),
        ],
        answerDisplay: L(
          "$27+8x^{3} = (3+2x)\\left(9-6x+4x^{2}\\right)$",
          "$27+8x^{3} = (3+2x)\\left(9-6x+4x^{2}\\right)$",
        ),
        solution: [
          step(
            "given",
            "El binomio $27+8x^{3}$.",
            "The binomial $27+8x^{3}$.",
          ),
          step(
            "approach",
            "Suma de cubos con $a = 3$ y $b = 2x$.",
            "Sum of cubes with $a = 3$ and $b = 2x$.",
          ),
          step(
            "calculation",
            "$3^{3}+(2x)^{3} = (3+2x)\\left(9 - 3 \\cdot 2x + 4x^{2}\\right) = (3+2x)\\left(9-6x+4x^{2}\\right)$",
            "$3^{3}+(2x)^{3} = (3+2x)\\left(9 - 3 \\cdot 2x + 4x^{2}\\right) = (3+2x)\\left(9-6x+4x^{2}\\right)$",
          ),
          step(
            "result",
            "$27+8x^{3} = (3+2x)\\left(9-6x+4x^{2}\\right)$. Control: con $x = 1$: $27 + 8 = 35$ y $(5)(9 - 6 + 4) = 5 \\cdot 7 = 35$ ✓.",
            "$27+8x^{3} = (3+2x)\\left(9-6x+4x^{2}\\right)$. Check: at $x = 1$: $27 + 8 = 35$ and $(5)(9 - 6 + 4) = 5 \\cdot 7 = 35$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S2.41 — (x+4)³(x−2)+(x+4)²(x−2)² = 2(x+4)²(x−2)(x+1). */
  template(
    {
      id: "fc-uees-41",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "factoring",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["factoring", "common-factor", "binomial-factors"],
      prerequisites: ["factoring"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "2 · 41",
        page: 2,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$2(x+4)^{2}(x-2)(x+1)$", "$2(x+4)^{2}(x-2)(x+1)$"), correct: true },
        { id: "b", text: L("$(x+4)^{2}(x-2)\\left[(x+4)+(x-2)\\right]$", "$(x+4)^{2}(x-2)\\left[(x+4)+(x-2)\\right]$"), correct: false },
        { id: "c", text: L("$(x+4)^{2}(x-2)(2x+2)$", "$(x+4)^{2}(x-2)(2x+2)$"), correct: false },
        { id: "d", text: L("$2(x+4)^{2}(x-2)(x-1)$", "$2(x+4)^{2}(x-2)(x-1)$"), correct: false },
      ];
      return {
        skill: L(
          "Factor común con potencias de binomios",
          "Common factor with powers of binomials",
        ),
        statement: L(
          "Factorice completamente:\n\n$$(x+4)^{3}(x-2)+(x+4)^{2}(x-2)^{2}$$",
          "Factor completely:\n\n$$(x+4)^{3}(x-2)+(x+4)^{2}(x-2)^{2}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Los dos términos comparten $(x+4)^{2}$ y $(x-2)$: ese es el factor común.",
            "The two terms share $(x+4)^{2}$ and $(x-2)$: that is the common factor.",
          ),
          L(
            "El factor común toma el MENOR exponente de cada bloque: $(x+4)^{2}(x-2)$.",
            "The common factor takes the SMALLEST exponent of each block: $(x+4)^{2}(x-2)$.",
          ),
          L(
            "Dentro queda $\\left[(x+4)+(x-2)\\right] = 2x+2$: todavía puedes extraer el $2$.",
            "Inside remains $\\left[(x+4)+(x-2)\\right] = 2x+2$: you can still pull out the $2$.",
          ),
        ],
        answerDisplay: L(
          "$(x+4)^{3}(x-2)+(x+4)^{2}(x-2)^{2} = 2(x+4)^{2}(x-2)(x+1)$",
          "$(x+4)^{3}(x-2)+(x+4)^{2}(x-2)^{2} = 2(x+4)^{2}(x-2)(x+1)$",
        ),
        solution: [
          step(
            "given",
            "La suma $(x+4)^{3}(x-2)+(x+4)^{2}(x-2)^{2}$.",
            "The sum $(x+4)^{3}(x-2)+(x+4)^{2}(x-2)^{2}$.",
          ),
          step(
            "approach",
            "Extraer el factor común $(x+4)^{2}(x-2)$ (menor exponente de cada bloque) y simplificar el corchete.",
            "Pull out the common factor $(x+4)^{2}(x-2)$ (smallest exponent of each block) and simplify the bracket.",
          ),
          step(
            "calculation",
            "$(x+4)^{3}(x-2)+(x+4)^{2}(x-2)^{2} = (x+4)^{2}(x-2)\\left[(x+4)+(x-2)\\right]$<br>Corchete: $(x+4)+(x-2) = 2x+2 = 2(x+1)$<br>Entonces: $2(x+4)^{2}(x-2)(x+1)$",
            "$(x+4)^{3}(x-2)+(x+4)^{2}(x-2)^{2} = (x+4)^{2}(x-2)\\left[(x+4)+(x-2)\\right]$<br>Bracket: $(x+4)+(x-2) = 2x+2 = 2(x+1)$<br>So: $2(x+4)^{2}(x-2)(x+1)$",
          ),
          step(
            "result",
            "$(x+4)^{3}(x-2)+(x+4)^{2}(x-2)^{2} = 2(x+4)^{2}(x-2)(x+1)$. Control: con $x = 0$: $64 \\cdot (-2) + 16 \\cdot 4 = -128 + 64 = -64$ y $2 \\cdot 16 \\cdot (-2) \\cdot 1 = -64$ ✓.",
            "$(x+4)^{3}(x-2)+(x+4)^{2}(x-2)^{2} = 2(x+4)^{2}(x-2)(x+1)$. Check: at $x = 0$: $64 \\cdot (-2) + 16 \\cdot 4 = -128 + 64 = -64$ and $2 \\cdot 16 \\cdot (-2) \\cdot 1 = -64$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S2.42 — (a+5)³(a+1)²+(a+5)²(a+1)³ = 2(a+5)²(a+1)²(a+3). */
  template(
    {
      id: "fc-uees-42",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "factoring",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["factoring", "common-factor", "binomial-factors"],
      prerequisites: ["factoring"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "2 · 42",
        page: 2,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$2(a+5)^{2}(a+1)^{2}(a+3)$", "$2(a+5)^{2}(a+1)^{2}(a+3)$"), correct: true },
        { id: "b", text: L("$(a+5)^{2}(a+1)^{2}(2a+6)$", "$(a+5)^{2}(a+1)^{2}(2a+6)$"), correct: false },
        { id: "c", text: L("$(a+5)^{2}(a+1)^{2}(a+3)$", "$(a+5)^{2}(a+1)^{2}(a+3)$"), correct: false },
        { id: "d", text: L("$2(a+5)^{2}(a+1)^{2}(a-3)$", "$2(a+5)^{2}(a+1)^{2}(a-3)$"), correct: false },
      ];
      return {
        skill: L(
          "Factor binomio común y extraer el 2 del corchete",
          "Common binomial factor and pulling the 2 out of the bracket",
        ),
        statement: L(
          "Factorice completamente:\n\n$$(a+5)^{3}(a+1)^{2}+(a+5)^{2}(a+1)^{3}$$",
          "Factor completely:\n\n$$(a+5)^{3}(a+1)^{2}+(a+5)^{2}(a+1)^{3}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El factor común toma el menor exponente de cada binomio: $(a+5)^{2}(a+1)^{2}$.",
            "The common factor takes the smallest exponent of each binomial: $(a+5)^{2}(a+1)^{2}$.",
          ),
          L(
            "Dentro del corchete queda $(a+5)+(a+1)$: una suma lineal que se simplifica.",
            "Inside the bracket $(a+5)+(a+1)$ remains: a linear sum that simplifies.",
          ),
          L(
            "$(a+5)+(a+1) = 2a+6$: aún queda un factor $2$ por extraer.",
            "$(a+5)+(a+1) = 2a+6$: a factor $2$ still remains to be pulled out.",
          ),
        ],
        answerDisplay: L(
          "$(a+5)^{3}(a+1)^{2}+(a+5)^{2}(a+1)^{3} = 2(a+5)^{2}(a+1)^{2}(a+3)$",
          "$(a+5)^{3}(a+1)^{2}+(a+5)^{2}(a+1)^{3} = 2(a+5)^{2}(a+1)^{2}(a+3)$",
        ),
        solution: [
          step(
            "given",
            "La suma $(a+5)^{3}(a+1)^{2}+(a+5)^{2}(a+1)^{3}$.",
            "The sum $(a+5)^{3}(a+1)^{2}+(a+5)^{2}(a+1)^{3}$.",
          ),
          step(
            "approach",
            "Extraer $(a+5)^{2}(a+1)^{2}$ y simplificar el corchete; el resultado lineal esconde un $2$.",
            "Pull out $(a+5)^{2}(a+1)^{2}$ and simplify the bracket; the linear result hides a $2$.",
          ),
          step(
            "calculation",
            "$(a+5)^{3}(a+1)^{2}+(a+5)^{2}(a+1)^{3} = (a+5)^{2}(a+1)^{2}\\left[(a+5)+(a+1)\\right]$<br>Corchete: $(a+5)+(a+1) = 2a+6 = 2(a+3)$<br>Entonces: $2(a+5)^{2}(a+1)^{2}(a+3)$",
            "$(a+5)^{3}(a+1)^{2}+(a+5)^{2}(a+1)^{3} = (a+5)^{2}(a+1)^{2}\\left[(a+5)+(a+1)\\right]$<br>Bracket: $(a+5)+(a+1) = 2a+6 = 2(a+3)$<br>So: $2(a+5)^{2}(a+1)^{2}(a+3)$",
          ),
          step(
            "result",
            "$(a+5)^{3}(a+1)^{2}+(a+5)^{2}(a+1)^{3} = 2(a+5)^{2}(a+1)^{2}(a+3)$. Control: con $a = 0$: $125 \\cdot 1 + 25 \\cdot 1 = 150$ y $2 \\cdot 25 \\cdot 1 \\cdot 3 = 150$ ✓.",
            "$(a+5)^{3}(a+1)^{2}+(a+5)^{2}(a+1)^{3} = 2(a+5)^{2}(a+1)^{2}(a+3)$. Check: at $a = 0$: $125 \\cdot 1 + 25 \\cdot 1 = 150$ and $2 \\cdot 25 \\cdot 1 \\cdot 3 = 150$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S2.43 — P(1+r)+P(1+r)r = P(1+r)². */
  template(
    {
      id: "fc-uees-43",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "factoring",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 75,
      tags: ["factoring", "common-factor", "application"],
      prerequisites: ["factoring"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "2 · 43",
        page: 2,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$P(1+r)^{2}$", "$P(1+r)^{2}$"), correct: true },
        { id: "b", text: L("$P(1+2r)$", "$P(1+2r)$"), correct: false },
        { id: "c", text: L("$P(1+r)(1-r)$", "$P(1+r)(1-r)$"), correct: false },
        { id: "d", text: L("$P+P(1+r)r$", "$P+P(1+r)r$"), correct: false },
      ];
      return {
        skill: L(
          "Factor común P(1+r) (sabor de interés compuesto)",
          "Common factor P(1+r) (a compound-interest flavor)",
        ),
        statement: L(
          "Factorice completamente:\n\n$$P(1+r)+P(1+r)r$$",
          "Factor completely:\n\n$$P(1+r)+P(1+r)r$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Los dos términos comparten el bloque $P(1+r)$: extráelo completo.",
            "The two terms share the block $P(1+r)$: pull out the whole block.",
          ),
          L(
            "$A \\cdot x + A \\cdot y = A(x+y)$ con $A = P(1+r)$, $x = 1$ y $y = r$.",
            "$A \\cdot x + A \\cdot y = A(x+y)$ with $A = P(1+r)$, $x = 1$ and $y = r$.",
          ),
          L(
            "Dentro queda $1 + r$: el bloque común multiplicado por $1+r$ se escribe como un cuadrado.",
            "Inside $1 + r$ remains: the common block times $1+r$ can be written as a square.",
          ),
        ],
        answerDisplay: L(
          "$P(1+r)+P(1+r)r = P(1+r)^{2}$",
          "$P(1+r)+P(1+r)r = P(1+r)^{2}$",
        ),
        solution: [
          step(
            "given",
            "La expresión $P(1+r)+P(1+r)r$ (típica del cálculo de interés compuesto).",
            "The expression $P(1+r)+P(1+r)r$ (typical of compound-interest calculations).",
          ),
          step(
            "approach",
            "Extraer el factor común $P(1+r)$; el paréntesis que queda es $1+r$.",
            "Pull out the common factor $P(1+r)$; the parenthesis that remains is $1+r$.",
          ),
          step(
            "calculation",
            "$P(1+r)+P(1+r)r = P(1+r)\\left[1+r\\right] = P(1+r)(1+r) = P(1+r)^{2}$",
            "$P(1+r)+P(1+r)r = P(1+r)\\left[1+r\\right] = P(1+r)(1+r) = P(1+r)^{2}$",
          ),
          step(
            "result",
            "$P(1+r)+P(1+r)r = P(1+r)^{2}$. Control: con $P = 100$ y $r = 0{,}1$: $100 \\cdot 1{,}1 + 100 \\cdot 1{,}1 \\cdot 0{,}1 = 110 + 11 = 121$ y $100 \\cdot (1{,}1)^{2} = 121$ ✓.",
            "$P(1+r)+P(1+r)r = P(1+r)^{2}$. Check: at $P = 100$ and $r = 0.1$: $100 \\cdot 1.1 + 100 \\cdot 1.1 \\cdot 0.1 = 110 + 11 = 121$ and $100 \\cdot (1.1)^{2} = 121$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S2.44 — (X−3D)(3X+5I)−(3X+5I)(X+2I) = (3X+5I)(−3D−2I). */
  template(
    {
      id: "fc-uees-44",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "factoring",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 180,
      tags: ["factoring", "common-factor", "signs"],
      prerequisites: ["factoring"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "2 · 44",
        page: 2,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$(3X+5I)(-3D-2I)$", "$(3X+5I)(-3D-2I)$"), correct: true },
        { id: "b", text: L("$(3X+5I)(-3D+2I)$", "$(3X+5I)(-3D+2I)$"), correct: false },
        { id: "c", text: L("$(3X+5I)(3D+2I)$", "$(3X+5I)(3D+2I)$"), correct: false },
        { id: "d", text: L("$(X-3D)(X+2I)$", "$(X-3D)(X+2I)$"), correct: false },
      ];
      return {
        skill: L(
          "Factor binomio común con cuidado de los signos",
          "Common binomial factor watching the signs",
        ),
        statement: L(
          "Factorice completamente:\n\n$$(X-3D)(3X+5I)-(3X+5I)(X+2I)$$",
          "Factor completely:\n\n$$(X-3D)(3X+5I)-(3X+5I)(X+2I)$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El binomio $(3X+5I)$ aparece en los dos productos: es el factor común.",
            "The binomial $(3X+5I)$ appears in both products: it is the common factor.",
          ),
          L(
            "Al extraer, el segundo corchete es una RESTA: $\\left[(X-3D)-(X+2I)\\right]$.",
            "When pulling out, the second bracket is a SUBTRACTION: $\\left[(X-3D)-(X+2I)\\right]$.",
          ),
          L(
            "Dentro: $(X-3D)-(X+2I) = X - 3D - X - 2I$; las $X$ se cancelan.",
            "Inside: $(X-3D)-(X+2I) = X - 3D - X - 2I$; the $X$ terms cancel.",
          ),
        ],
        answerDisplay: L(
          "$(X-3D)(3X+5I)-(3X+5I)(X+2I) = (3X+5I)(-3D-2I)$",
          "$(X-3D)(3X+5I)-(3X+5I)(X+2I) = (3X+5I)(-3D-2I)$",
        ),
        solution: [
          step(
            "given",
            "La resta $(X-3D)(3X+5I)-(3X+5I)(X+2I)$ en las literales $X$, $D$ e $I$.",
            "The subtraction $(X-3D)(3X+5I)-(3X+5I)(X+2I)$ in the letters $X$, $D$ and $I$.",
          ),
          step(
            "approach",
            "Extraer el factor común $(3X+5I)$ y simplificar el corchete con la resta (signos del segundo paréntesis invertidos).",
            "Pull out the common factor $(3X+5I)$ and simplify the bracket with the subtraction (signs of the second parenthesis flipped).",
          ),
          step(
            "calculation",
            "$(X-3D)(3X+5I)-(3X+5I)(X+2I) = (3X+5I)\\left[(X-3D)-(X+2I)\\right]$<br>Corchete: $(X-3D)-(X+2I) = X - 3D - X - 2I = -3D - 2I$<br>Entonces: $(3X+5I)(-3D-2I)$",
            "$(X-3D)(3X+5I)-(3X+5I)(X+2I) = (3X+5I)\\left[(X-3D)-(X+2I)\\right]$<br>Bracket: $(X-3D)-(X+2I) = X - 3D - X - 2I = -3D - 2I$<br>So: $(3X+5I)(-3D-2I)$",
          ),
          step(
            "result",
            "$(X-3D)(3X+5I)-(3X+5I)(X+2I) = (3X+5I)(-3D-2I)$. Control: con $X = 1$, $D = 1$, $I = 1$: $(-2)(8)-(8)(3) = -16 - 24 = -40$ y $(8)(-5) = -40$ ✓.",
            "$(X-3D)(3X+5I)-(3X+5I)(X+2I) = (3X+5I)(-3D-2I)$. Check: at $X = 1$, $D = 1$, $I = 1$: $(-2)(8)-(8)(3) = -16 - 24 = -40$ and $(8)(-5) = -40$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S2.45 — x⁴−16 = (x²+4)(x−2)(x+2). */
  template(
    {
      id: "fc-uees-45",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "factoring",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["factoring", "difference-of-squares"],
      prerequisites: ["factoring"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "2 · 45",
        page: 2,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$\\left(x^{2}+4\\right)(x-2)(x+2)$", "$\\left(x^{2}+4\\right)(x-2)(x+2)$"), correct: true },
        { id: "b", text: L("$\\left(x^{2}+4\\right)\\left(x^{2}-4\\right)$", "$\\left(x^{2}+4\\right)\\left(x^{2}-4\\right)$"), correct: false },
        { id: "c", text: L("$\\left(x^{2}-4\\right)(x-2)(x+2)$", "$\\left(x^{2}-4\\right)(x-2)(x+2)$"), correct: false },
        { id: "d", text: L("$\\left(x^{2}+4\\right)(x-2)^{2}$", "$\\left(x^{2}+4\\right)(x-2)^{2}$"), correct: false },
      ];
      return {
        skill: L(
          "Diferencia de cuadrados dos veces (x⁴−16)",
          "Difference of squares twice (x⁴−16)",
        ),
        statement: L(
          "Factorice completamente:\n\n$$x^{4}-16$$",
          "Factor completely:\n\n$$x^{4}-16$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "$x^{4}$ y $16$ son cuadrados perfectos: empieza por la diferencia de cuadrados.",
            "$x^{4}$ and $16$ are perfect squares: start with the difference of squares.",
          ),
          L(
            "$x^{4}-16 = \\left(x^{2}-4\\right)\\left(x^{2}+4\\right)$; el primer factor SEGURO se vuelve a abrir.",
            "$x^{4}-16 = \\left(x^{2}-4\\right)\\left(x^{2}+4\\right)$; the first factor SURELY opens again.",
          ),
          L(
            "$x^{2}-4 = (x-2)(x+2)$, pero $x^{2}+4$ ya no factoriza sobre los reales.",
            "$x^{2}-4 = (x-2)(x+2)$, but $x^{2}+4$ does not factor over the reals.",
          ),
        ],
        answerDisplay: L(
          "$x^{4}-16 = \\left(x^{2}+4\\right)(x-2)(x+2)$",
          "$x^{4}-16 = \\left(x^{2}+4\\right)(x-2)(x+2)$",
        ),
        solution: [
          step(
            "given",
            "El binomio $x^{4}-16$.",
            "The binomial $x^{4}-16$.",
          ),
          step(
            "approach",
            "Dos pasos de diferencia de cuadrados; la suma de cuadrados $x^{2}+4$ queda prima.",
            "Two difference-of-squares steps; the sum of squares $x^{2}+4$ stays prime.",
          ),
          step(
            "calculation",
            "$x^{4}-16 = \\left(x^{2}\\right)^{2} - 4^{2} = \\left(x^{2}-4\\right)\\left(x^{2}+4\\right)$<br>$x^{2}-4 = (x-2)(x+2)$<br>Entonces: $x^{4}-16 = \\left(x^{2}+4\\right)(x-2)(x+2)$",
            "$x^{4}-16 = \\left(x^{2}\\right)^{2} - 4^{2} = \\left(x^{2}-4\\right)\\left(x^{2}+4\\right)$<br>$x^{2}-4 = (x-2)(x+2)$<br>So: $x^{4}-16 = \\left(x^{2}+4\\right)(x-2)(x+2)$",
          ),
          step(
            "result",
            "$x^{4}-16 = \\left(x^{2}+4\\right)(x-2)(x+2)$. Control: con $x = 3$: $81 - 16 = 65$ y $(13)(1)(5) = 65$ ✓.",
            "$x^{4}-16 = \\left(x^{2}+4\\right)(x-2)(x+2)$. Check: at $x = 3$: $81 - 16 = 65$ and $(13)(1)(5) = 65$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S2.46 — 256y⁴−z⁴ = (4y−z)(4y+z)(16y²+z²). */
  template(
    {
      id: "fc-uees-46",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "factoring",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["factoring", "difference-of-squares", "two-step"],
      prerequisites: ["factoring"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "2 · 46",
        page: 2,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$(4y-z)(4y+z)\\left(16y^{2}+z^{2}\\right)$", "$(4y-z)(4y+z)\\left(16y^{2}+z^{2}\\right)$"), correct: true },
        { id: "b", text: L("$\\left(16y^{2}-z^{2}\\right)\\left(16y^{2}+z^{2}\\right)$", "$\\left(16y^{2}-z^{2}\\right)\\left(16y^{2}+z^{2}\\right)$"), correct: false },
        { id: "c", text: L("$(4y-z)(4y+z)\\left(16y^{2}-z^{2}\\right)$", "$(4y-z)(4y+z)\\left(16y^{2}-z^{2}\\right)$"), correct: false },
        { id: "d", text: L("$(4y-z)(4y+z)$", "$(4y-z)(4y+z)$"), correct: false },
      ];
      return {
        skill: L(
          "Diferencia de cuadrados dos veces (256y⁴−z⁴)",
          "Difference of squares twice (256y⁴−z⁴)",
        ),
        statement: L(
          "Factorice completamente:\n\n$$256y^{4}-z^{4}$$",
          "Factor completely:\n\n$$256y^{4}-z^{4}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "$256y^{4} = \\left(16y^{2}\\right)^{2}$ y $z^{4} = \\left(z^{2}\\right)^{2}$: primera diferencia de cuadrados.",
            "$256y^{4} = \\left(16y^{2}\\right)^{2}$ and $z^{4} = \\left(z^{2}\\right)^{2}$: first difference of squares.",
          ),
          L(
            "El factor $16y^{2}-z^{2}$ se abre de nuevo: $16y^{2} = (4y)^{2}$.",
            "The factor $16y^{2}-z^{2}$ opens again: $16y^{2} = (4y)^{2}$.",
          ),
          L(
            "La suma $16y^{2}+z^{2}$ NO se factoriza sobre los reales: ahí se detiene.",
            "The sum $16y^{2}+z^{2}$ does NOT factor over the reals: it stops there.",
          ),
        ],
        answerDisplay: L(
          "$256y^{4}-z^{4} = (4y-z)(4y+z)\\left(16y^{2}+z^{2}\\right)$",
          "$256y^{4}-z^{4} = (4y-z)(4y+z)\\left(16y^{2}+z^{2}\\right)$",
        ),
        solution: [
          step(
            "given",
            "El binomio $256y^{4}-z^{4}$ en las variables $y$ y $z$.",
            "The binomial $256y^{4}-z^{4}$ in the variables $y$ and $z$.",
          ),
          step(
            "approach",
            "Cadena de dos diferencias de cuadrados; la suma de cuadrados final queda prima.",
            "A chain of two differences of squares; the final sum of squares stays prime.",
          ),
          step(
            "calculation",
            "$256y^{4}-z^{4} = \\left(16y^{2}\\right)^{2} - \\left(z^{2}\\right)^{2} = \\left(16y^{2}-z^{2}\\right)\\left(16y^{2}+z^{2}\\right)$<br>$16y^{2}-z^{2} = (4y-z)(4y+z)$<br>Entonces: $256y^{4}-z^{4} = (4y-z)(4y+z)\\left(16y^{2}+z^{2}\\right)$",
            "$256y^{4}-z^{4} = \\left(16y^{2}\\right)^{2} - \\left(z^{2}\\right)^{2} = \\left(16y^{2}-z^{2}\\right)\\left(16y^{2}+z^{2}\\right)$<br>$16y^{2}-z^{2} = (4y-z)(4y+z)$<br>So: $256y^{4}-z^{4} = (4y-z)(4y+z)\\left(16y^{2}+z^{2}\\right)$",
          ),
          step(
            "result",
            "$256y^{4}-z^{4} = (4y-z)(4y+z)\\left(16y^{2}+z^{2}\\right)$. Control: con $y = 1$, $z = 1$: $256 - 1 = 255$ y $(3)(5)(17) = 255$ ✓.",
            "$256y^{4}-z^{4} = (4y-z)(4y+z)\\left(16y^{2}+z^{2}\\right)$. Check: at $y = 1$, $z = 1$: $256 - 1 = 255$ and $(3)(5)(17) = 255$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S2.47 — y⁸−1 = (y−1)(y+1)(y²+1)(y⁴+1). */
  template(
    {
      id: "fc-uees-47",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "factoring",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 180,
      tags: ["factoring", "difference-of-squares", "repeated"],
      prerequisites: ["factoring"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "2 · 47",
        page: 2,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$(y-1)(y+1)\\left(y^{2}+1\\right)\\left(y^{4}+1\\right)$", "$(y-1)(y+1)\\left(y^{2}+1\\right)\\left(y^{4}+1\\right)$"), correct: true },
        { id: "b", text: L("$\\left(y^{4}-1\\right)\\left(y^{4}+1\\right)$", "$\\left(y^{4}-1\\right)\\left(y^{4}+1\\right)$"), correct: false },
        { id: "c", text: L("$(y-1)(y+1)\\left(y^{4}+1\\right)$", "$(y-1)(y+1)\\left(y^{4}+1\\right)$"), correct: false },
        { id: "d", text: L("$(y-1)\\left(y^{2}+1\\right)\\left(y^{4}+1\\right)$", "$(y-1)\\left(y^{2}+1\\right)\\left(y^{4}+1\\right)$"), correct: false },
      ];
      return {
        skill: L(
          "Cadena de diferencias de cuadrados (y⁸−1)",
          "A chain of differences of squares (y⁸−1)",
        ),
        statement: L(
          "Factorice completamente:\n\n$$y^{8}-1$$",
          "Factor completely:\n\n$$y^{8}-1$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El exponente 8 se puede partir como $4+4$: $y^{8} = \\left(y^{4}\\right)^{2}$.",
            "The exponent 8 splits as $4+4$: $y^{8} = \\left(y^{4}\\right)^{2}$.",
          ),
          L(
            "Cada factor diferencia se vuelve a abrir mientras el exponente sea par: $y^{4}-1$, luego $y^{2}-1$.",
            "Each difference factor opens again while the exponent is even: $y^{4}-1$, then $y^{2}-1$.",
          ),
          L(
            "Las sumas $y^{2}+1$ y $y^{4}+1$ NO se factorizan sobre los reales: ahí termina la cadena.",
            "The sums $y^{2}+1$ and $y^{4}+1$ do NOT factor over the reals: the chain ends there.",
          ),
        ],
        answerDisplay: L(
          "$y^{8}-1 = (y-1)(y+1)\\left(y^{2}+1\\right)\\left(y^{4}+1\\right)$",
          "$y^{8}-1 = (y-1)(y+1)\\left(y^{2}+1\\right)\\left(y^{4}+1\\right)$",
        ),
        solution: [
          step(
            "given",
            "El binomio $y^{8}-1$.",
            "The binomial $y^{8}-1$.",
          ),
          step(
            "approach",
            "Cadena de diferencias de cuadrados: $y^{8} \\to y^{4} \\to y^{2}$; las sumas de cuadrados quedan primas.",
            "A chain of differences of squares: $y^{8} \\to y^{4} \\to y^{2}$; the sums of squares stay prime.",
          ),
          step(
            "calculation",
            "$y^{8}-1 = \\left(y^{4}-1\\right)\\left(y^{4}+1\\right)$<br>$y^{4}-1 = \\left(y^{2}-1\\right)\\left(y^{2}+1\\right)$<br>$y^{2}-1 = (y-1)(y+1)$<br>Entonces: $y^{8}-1 = (y-1)(y+1)\\left(y^{2}+1\\right)\\left(y^{4}+1\\right)$",
            "$y^{8}-1 = \\left(y^{4}-1\\right)\\left(y^{4}+1\\right)$<br>$y^{4}-1 = \\left(y^{2}-1\\right)\\left(y^{2}+1\\right)$<br>$y^{2}-1 = (y-1)(y+1)$<br>So: $y^{8}-1 = (y-1)(y+1)\\left(y^{2}+1\\right)\\left(y^{4}+1\\right)$",
          ),
          step(
            "result",
            "$y^{8}-1 = (y-1)(y+1)\\left(y^{2}+1\\right)\\left(y^{4}+1\\right)$. Control: con $y = 2$: $256 - 1 = 255$ y $(1)(3)(5)(17) = 255$ ✓.",
            "$y^{8}-1 = (y-1)(y+1)\\left(y^{2}+1\\right)\\left(y^{4}+1\\right)$. Check: at $y = 2$: $256 - 1 = 255$ and $(1)(3)(5)(17) = 255$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S2.48 — t⁴−4 = (t−√2)(t+√2)(t²+2) SOBRE ℝ. */
  template(
    {
      id: "fc-uees-48",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "factoring",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 180,
      tags: ["factoring", "difference-of-squares", "irrational-roots"],
      prerequisites: ["factoring"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "2 · 48",
        page: 2,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$\\left(t-\\sqrt{2}\\right)\\left(t+\\sqrt{2}\\right)\\left(t^{2}+2\\right)$", "$\\left(t-\\sqrt{2}\\right)\\left(t+\\sqrt{2}\\right)\\left(t^{2}+2\\right)$"), correct: true },
        { id: "b", text: L("$\\left(t^{2}-2\\right)\\left(t^{2}+2\\right)$", "$\\left(t^{2}-2\\right)\\left(t^{2}+2\\right)$"), correct: false },
        { id: "c", text: L("$(t-2)(t+2)\\left(t^{2}+2\\right)$", "$(t-2)(t+2)\\left(t^{2}+2\\right)$"), correct: false },
        { id: "d", text: L("$\\left(t-\\sqrt{2}\\right)\\left(t+\\sqrt{2}\\right)\\left(t^{2}-2\\right)$", "$\\left(t-\\sqrt{2}\\right)\\left(t+\\sqrt{2}\\right)\\left(t^{2}-2\\right)$"), correct: false },
      ];
      return {
        skill: L(
          "Diferencia de cuadrados hasta los irracionales (t⁴−4)",
          "Difference of squares down to the irrationals (t⁴−4)",
        ),
        statement: L(
          "Factorice completamente (sobre los reales):\n\n$$t^{4}-4$$",
          "Factor completely (over the reals):\n\n$$t^{4}-4$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Es una diferencia de cuadrados con $t^{2}$ y $2$; el primer factor se vuelve a abrir.",
            "It is a difference of squares with $t^{2}$ and $2$; the first factor opens again.",
          ),
          L(
            "$t^{2}-2 = \\left(t-\\sqrt{2}\\right)\\left(t+\\sqrt{2}\\right)$ sobre los reales (raíces $\\pm\\sqrt{2}$).",
            "$t^{2}-2 = \\left(t-\\sqrt{2}\\right)\\left(t+\\sqrt{2}\\right)$ over the reals (roots $\\pm\\sqrt{2}$).",
          ),
          L(
            "Cuidado: el clásico $\\left(t^{2}-2\\right)\\left(t^{2}+2\\right)$ se queda a medias, porque $t^{2}-2$ AÚN se factoriza sobre $\\mathbb{R}$.",
            "Careful: the classic $\\left(t^{2}-2\\right)\\left(t^{2}+2\\right)$ stops half way, because $t^{2}-2$ STILL factors over $\\mathbb{R}$.",
          ),
        ],
        answerDisplay: L(
          "$t^{4}-4 = \\left(t-\\sqrt{2}\\right)\\left(t+\\sqrt{2}\\right)\\left(t^{2}+2\\right)$",
          "$t^{4}-4 = \\left(t-\\sqrt{2}\\right)\\left(t+\\sqrt{2}\\right)\\left(t^{2}+2\\right)$",
        ),
        solution: [
          step(
            "given",
            "El binomio $t^{4}-4$ (se pide la factorización completa sobre los reales).",
            "The binomial $t^{4}-4$ (the complete factorization over the reals is requested).",
          ),
          step(
            "approach",
            "Dos pasos de diferencia de cuadrados; el segundo usa las raíces irracionales $\\pm\\sqrt{2}$ de $t^{2}-2$.",
            "Two difference-of-squares steps; the second uses the irrational roots $\\pm\\sqrt{2}$ of $t^{2}-2$.",
          ),
          step(
            "calculation",
            "$t^{4}-4 = \\left(t^{2}\\right)^{2} - 2^{2} = \\left(t^{2}-2\\right)\\left(t^{2}+2\\right)$<br>Sobre $\\mathbb{R}$: $t^{2}-2 = \\left(t-\\sqrt{2}\\right)\\left(t+\\sqrt{2}\\right)$, mientras que $t^{2}+2$ ya no se factoriza<br>Entonces: $t^{4}-4 = \\left(t-\\sqrt{2}\\right)\\left(t+\\sqrt{2}\\right)\\left(t^{2}+2\\right)$",
            "$t^{4}-4 = \\left(t^{2}\\right)^{2} - 2^{2} = \\left(t^{2}-2\\right)\\left(t^{2}+2\\right)$<br>Over $\\mathbb{R}$: $t^{2}-2 = \\left(t-\\sqrt{2}\\right)\\left(t+\\sqrt{2}\\right)$, while $t^{2}+2$ factors no further<br>So: $t^{4}-4 = \\left(t-\\sqrt{2}\\right)\\left(t+\\sqrt{2}\\right)\\left(t^{2}+2\\right)$",
          ),
          step(
            "result",
            "$t^{4}-4 = \\left(t-\\sqrt{2}\\right)\\left(t+\\sqrt{2}\\right)\\left(t^{2}+2\\right)$ — quedarse en $\\left(t^{2}-2\\right)\\left(t^{2}+2\\right)$ es la respuesta clásica incompleta, porque sobre $\\mathbb{R}$ el factor $t^{2}-2$ todavía se abre con $\\sqrt{2}$. Control: con $t = 1$: $1 - 4 = -3$ y $(1-\\sqrt{2})(1+\\sqrt{2})(3) = (1-2)(3) = -3$ ✓.",
            "$t^{4}-4 = \\left(t-\\sqrt{2}\\right)\\left(t+\\sqrt{2}\\right)\\left(t^{2}+2\\right)$ — stopping at $\\left(t^{2}-2\\right)\\left(t^{2}+2\\right)$ is the classic incomplete answer, because over $\\mathbb{R}$ the factor $t^{2}-2$ still opens with $\\sqrt{2}$. Check: at $t = 1$: $1 - 4 = -3$ and $(1-\\sqrt{2})(1+\\sqrt{2})(3) = (1-2)(3) = -3$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S2.49 — X⁴+4X²−5 = (X²+5)(X−1)(X+1). */
  template(
    {
      id: "fc-uees-49",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "factoring",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["factoring", "quadratic-form", "difference-of-squares"],
      prerequisites: ["factoring"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "2 · 49",
        page: 2,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$\\left(X^{2}+5\\right)(X-1)(X+1)$", "$\\left(X^{2}+5\\right)(X-1)(X+1)$"), correct: true },
        { id: "b", text: L("$\\left(X^{2}+5\\right)\\left(X^{2}-1\\right)$", "$\\left(X^{2}+5\\right)\\left(X^{2}-1\\right)$"), correct: false },
        { id: "c", text: L("$\\left(X^{2}-5\\right)\\left(X^{2}+1\\right)$", "$\\left(X^{2}-5\\right)\\left(X^{2}+1\\right)$"), correct: false },
        { id: "d", text: L("$\\left(X^{2}+5\\right)(X-1)^{2}$", "$\\left(X^{2}+5\\right)(X-1)^{2}$"), correct: false },
      ];
      return {
        skill: L(
          "Forma cuadrática en X² (sustitución u = X²)",
          "Quadratic form in X² (substitution u = X²)",
        ),
        statement: L(
          "Factorice completamente:\n\n$$X^{4}+4X^{2}-5$$",
          "Factor completely:\n\n$$X^{4}+4X^{2}-5$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Con $u = X^{2}$ la expresión es $u^{2}+4u-5$: un trinomio simple.",
            "With $u = X^{2}$ the expression is $u^{2}+4u-5$: a simple trinomial.",
          ),
          L(
            "$u^{2}+4u-5 = (u+5)(u-1)$: dos números con producto $-5$ y suma $4$.",
            "$u^{2}+4u-5 = (u+5)(u-1)$: two numbers with product $-5$ and sum $4$.",
          ),
          L(
            "El factor $X^{2}-1$ todavía se abre como diferencia de cuadrados; el $X^{2}+5$ no.",
            "The factor $X^{2}-1$ still opens as a difference of squares; the $X^{2}+5$ does not.",
          ),
        ],
        answerDisplay: L(
          "$X^{4}+4X^{2}-5 = \\left(X^{2}+5\\right)(X-1)(X+1)$",
          "$X^{4}+4X^{2}-5 = \\left(X^{2}+5\\right)(X-1)(X+1)$",
        ),
        solution: [
          step(
            "given",
            "El polinomio $X^{4}+4X^{2}-5$ (sin término cúbico ni lineal: forma cuadrática).",
            "The polynomial $X^{4}+4X^{2}-5$ (no cubic or linear term: quadratic form).",
          ),
          step(
            "approach",
            "Sustitución $u = X^{2}$, factorización del trinomio y apertura de la diferencia de cuadrados.",
            "Substitution $u = X^{2}$, factoring the trinomial and opening the difference of squares.",
          ),
          step(
            "calculation",
            "Con $u = X^{2}$: $u^{2}+4u-5 = (u+5)(u-1)$<br>De vuelta: $\\left(X^{2}+5\\right)\\left(X^{2}-1\\right)$ y $X^{2}-1 = (X-1)(X+1)$<br>Entonces: $X^{4}+4X^{2}-5 = \\left(X^{2}+5\\right)(X-1)(X+1)$",
            "With $u = X^{2}$: $u^{2}+4u-5 = (u+5)(u-1)$<br>Back: $\\left(X^{2}+5\\right)\\left(X^{2}-1\\right)$ and $X^{2}-1 = (X-1)(X+1)$<br>So: $X^{4}+4X^{2}-5 = \\left(X^{2}+5\\right)(X-1)(X+1)$",
          ),
          step(
            "result",
            "$X^{4}+4X^{2}-5 = \\left(X^{2}+5\\right)(X-1)(X+1)$. Control: con $X = 2$: $16 + 16 - 5 = 27$ y $(9)(1)(3) = 27$ ✓.",
            "$X^{4}+4X^{2}-5 = \\left(X^{2}+5\\right)(X-1)(X+1)$. Check: at $X = 2$: $16 + 16 - 5 = 27$ and $(9)(1)(3) = 27$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S2.50 — x⁴−10x²+9 = (x−3)(x+3)(x−1)(x+1). */
  template(
    {
      id: "fc-uees-50",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "factoring",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 180,
      tags: ["factoring", "quadratic-form", "difference-of-squares"],
      prerequisites: ["factoring"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "2 · 50",
        page: 2,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$(x-3)(x+3)(x-1)(x+1)$", "$(x-3)(x+3)(x-1)(x+1)$"), correct: true },
        { id: "b", text: L("$\\left(x^{2}-9\\right)\\left(x^{2}-1\\right)$", "$\\left(x^{2}-9\\right)\\left(x^{2}-1\\right)$"), correct: false },
        { id: "c", text: L("$(x-3)(x+3)(x-1)^{2}$", "$(x-3)(x+3)(x-1)^{2}$"), correct: false },
        { id: "d", text: L("$(x-3)(x-1)(x+1)$", "$(x-3)(x-1)(x+1)$"), correct: false },
      ];
      return {
        skill: L(
          "Bicuadrada: sustitución u = x² y dos diferencias de cuadrados",
          "Biquadratic: substitution u = x² and two differences of squares",
        ),
        statement: L(
          "Factorice completamente:\n\n$$x^{4}-10x^{2}+9$$",
          "Factor completely:\n\n$$x^{4}-10x^{2}+9$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Es una ecuación bicuadrada en forma factorizada: con $u = x^{2}$ es $u^{2}-10u+9$.",
            "It is a biquadratic in factored form: with $u = x^{2}$ it is $u^{2}-10u+9$.",
          ),
          L(
            "$u^{2}-10u+9 = (u-9)(u-1)$: producto $9$, suma $-10$.",
            "$u^{2}-10u+9 = (u-9)(u-1)$: product $9$, sum $-10$.",
          ),
          L(
            "Tanto $x^{2}-9$ como $x^{2}-1$ son diferencias de cuadrados: se abren las dos.",
            "Both $x^{2}-9$ and $x^{2}-1$ are differences of squares: open them both.",
          ),
        ],
        answerDisplay: L(
          "$x^{4}-10x^{2}+9 = (x-3)(x+3)(x-1)(x+1)$",
          "$x^{4}-10x^{2}+9 = (x-3)(x+3)(x-1)(x+1)$",
        ),
        solution: [
          step(
            "given",
            "El polinomio bicuadrado $x^{4}-10x^{2}+9$.",
            "The biquadratic polynomial $x^{4}-10x^{2}+9$.",
          ),
          step(
            "approach",
            "Sustitución $u = x^{2}$, trinomio por producto y suma, y dos diferencias de cuadrados al final.",
            "Substitution $u = x^{2}$, trinomial by product and sum, and two differences of squares at the end.",
          ),
          step(
            "calculation",
            "Con $u = x^{2}$: $u^{2}-10u+9 = (u-9)(u-1)$<br>De vuelta: $\\left(x^{2}-9\\right)\\left(x^{2}-1\\right) = (x-3)(x+3)(x-1)(x+1)$",
            "With $u = x^{2}$: $u^{2}-10u+9 = (u-9)(u-1)$<br>Back: $\\left(x^{2}-9\\right)\\left(x^{2}-1\\right) = (x-3)(x+3)(x-1)(x+1)$",
          ),
          step(
            "result",
            "$x^{4}-10x^{2}+9 = (x-3)(x+3)(x-1)(x+1)$. Control: con $x = 2$: $16 - 40 + 9 = -15$ y $(-1)(5)(1)(3) = -15$ ✓.",
            "$x^{4}-10x^{2}+9 = (x-3)(x+3)(x-1)(x+1)$. Check: at $x = 2$: $16 - 40 + 9 = -15$ and $(-1)(5)(1)(3) = -15$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S2.51 — a⁴b−8a²b+16b = b(a−2)²(a+2)². */
  template(
    {
      id: "fc-uees-51",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "factoring",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["factoring", "common-factor", "quadratic-form"],
      prerequisites: ["factoring"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "2 · 51",
        page: 2,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$b(a-2)^{2}(a+2)^{2}$", "$b(a-2)^{2}(a+2)^{2}$"), correct: true },
        { id: "b", text: L("$b\\left(a^{2}-4\\right)^{2}$", "$b\\left(a^{2}-4\\right)^{2}$"), correct: false },
        { id: "c", text: L("$b(a-2)(a+2)^{2}$", "$b(a-2)(a+2)^{2}$"), correct: false },
        { id: "d", text: L("$b(a-2)^{2}(a+2)$", "$b(a-2)^{2}(a+2)$"), correct: false },
      ];
      return {
        skill: L(
          "Factor común b y un cuadrado perfecto doble",
          "Common factor b and a double perfect square",
        ),
        statement: L(
          "Factorice completamente:\n\n$$a^{4}b-8a^{2}b+16b$$",
          "Factor completely:\n\n$$a^{4}b-8a^{2}b+16b$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "La $b$ es común a los tres términos: sácala primero.",
            "The $b$ is common to the three terms: pull it out first.",
          ),
          L(
            "Dentro queda $a^{4}-8a^{2}+16$: con $u = a^{2}$ es el cuadrado perfecto $u^{2}-8u+16$.",
            "Inside remains $a^{4}-8a^{2}+16$: with $u = a^{2}$ it is the perfect square $u^{2}-8u+16$.",
          ),
          L(
            "$a^{4}-8a^{2}+16 = \\left(a^{2}-4\\right)^{2}$, y el paréntesis de adentro aún se abre: $a^{2}-4 = (a-2)(a+2)$.",
            "$a^{4}-8a^{2}+16 = \\left(a^{2}-4\\right)^{2}$, and the inner parenthesis still opens: $a^{2}-4 = (a-2)(a+2)$.",
          ),
        ],
        answerDisplay: L(
          "$a^{4}b-8a^{2}b+16b = b(a-2)^{2}(a+2)^{2}$",
          "$a^{4}b-8a^{2}b+16b = b(a-2)^{2}(a+2)^{2}$",
        ),
        solution: [
          step(
            "given",
            "El polinomio $a^{4}b-8a^{2}b+16b$.",
            "The polynomial $a^{4}b-8a^{2}b+16b$.",
          ),
          step(
            "approach",
            "Factor común $b$, cuadrado perfecto en $u = a^{2}$ y apertura final de la diferencia de cuadrados (al cuadrado).",
            "Common factor $b$, perfect square in $u = a^{2}$ and final opening of the (squared) difference of squares.",
          ),
          step(
            "calculation",
            "$a^{4}b-8a^{2}b+16b = b\\left(a^{4}-8a^{2}+16\\right) = b\\left(a^{2}-4\\right)^{2}$<br>$a^{2}-4 = (a-2)(a+2)$, así que $\\left(a^{2}-4\\right)^{2} = (a-2)^{2}(a+2)^{2}$<br>Entonces: $a^{4}b-8a^{2}b+16b = b(a-2)^{2}(a+2)^{2}$",
            "$a^{4}b-8a^{2}b+16b = b\\left(a^{4}-8a^{2}+16\\right) = b\\left(a^{2}-4\\right)^{2}$<br>$a^{2}-4 = (a-2)(a+2)$, so $\\left(a^{2}-4\\right)^{2} = (a-2)^{2}(a+2)^{2}$<br>So: $a^{4}b-8a^{2}b+16b = b(a-2)^{2}(a+2)^{2}$",
          ),
          step(
            "result",
            "$a^{4}b-8a^{2}b+16b = b(a-2)^{2}(a+2)^{2}$. Control: con $a = 3$, $b = 2$: $162 - 144 + 32 = 50$ y $2 \\cdot 1 \\cdot 25 = 50$ ✓.",
            "$a^{4}b-8a^{2}b+16b = b(a-2)^{2}(a+2)^{2}$. Check: at $a = 3$, $b = 2$: $162 - 144 + 32 = 50$ and $2 \\cdot 1 \\cdot 25 = 50$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S2.52 — 4x³−6x²−4x = 2x(2x+1)(x−2). */
  template(
    {
      id: "fc-uees-52",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "factoring",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["factoring", "common-factor", "trinomial"],
      prerequisites: ["factoring"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "2 · 52",
        page: 2,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$2x(2x+1)(x-2)$", "$2x(2x+1)(x-2)$"), correct: true },
        { id: "b", text: L("$2x\\left(2x^{2}-3x-2\\right)$", "$2x\\left(2x^{2}-3x-2\\right)$"), correct: false },
        { id: "c", text: L("$2x(2x-1)(x+2)$", "$2x(2x-1)(x+2)$"), correct: false },
        { id: "d", text: L("$2x(2x+1)(x+2)$", "$2x(2x+1)(x+2)$"), correct: false },
      ];
      return {
        skill: L(
          "Factor común y trinomio con coeficiente 2",
          "Common factor and a trinomial with coefficient 2",
        ),
        statement: L(
          "Factorice completamente:\n\n$$4x^{3}-6x^{2}-4x$$",
          "Factor completely:\n\n$$4x^{3}-6x^{2}-4x$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Los tres términos comparten $2x$: extráelo primero.",
            "The three terms share $2x$: pull it out first.",
          ),
          L(
            "Dentro queda $2x^{2}-3x-2$: coeficiente principal $2$ con signos distintos.",
            "Inside remains $2x^{2}-3x-2$: leading coefficient $2$ with different signs.",
          ),
          L(
            "Busca $ac = 2$ y $bd = -2$ con cruce $-3$: prueba $(2x+1)(x-2)$.",
            "Look for $ac = 2$ and $bd = -2$ with cross $-3$: try $(2x+1)(x-2)$.",
          ),
        ],
        answerDisplay: L(
          "$4x^{3}-6x^{2}-4x = 2x(2x+1)(x-2)$",
          "$4x^{3}-6x^{2}-4x = 2x(2x+1)(x-2)$",
        ),
        solution: [
          step(
            "given",
            "El polinomio $4x^{3}-6x^{2}-4x$.",
            "The polynomial $4x^{3}-6x^{2}-4x$.",
          ),
          step(
            "approach",
            "Factor común $2x$ y trinomio $2x^{2}-3x-2$ con la técnica del coeficiente principal.",
            "Common factor $2x$ and the trinomial $2x^{2}-3x-2$ with the leading-coefficient technique.",
          ),
          step(
            "calculation",
            "$4x^{3}-6x^{2}-4x = 2x\\left(2x^{2}-3x-2\\right)$<br>$2x^{2}-3x-2 = (2x+1)(x-2)$<br>Entonces: $4x^{3}-6x^{2}-4x = 2x(2x+1)(x-2)$",
            "$4x^{3}-6x^{2}-4x = 2x\\left(2x^{2}-3x-2\\right)$<br>$2x^{2}-3x-2 = (2x+1)(x-2)$<br>So: $4x^{3}-6x^{2}-4x = 2x(2x+1)(x-2)$",
          ),
          step(
            "result",
            "$4x^{3}-6x^{2}-4x = 2x(2x+1)(x-2)$. Control: con $x = 3$: $108 - 54 - 12 = 42$ y $2 \\cdot 3 \\cdot 7 \\cdot 1 = 42$ ✓.",
            "$4x^{3}-6x^{2}-4x = 2x(2x+1)(x-2)$. Check: at $x = 3$: $108 - 54 - 12 = 42$ and $2 \\cdot 3 \\cdot 7 \\cdot 1 = 42$ ✓.",
          ),
        ],
      };
    },
  ),

  /* ================================================================== */
  /* ANTONIO (encargo del tutor 2026-10-18, perfil de examen «antonio»)  */
  /* · T2 «Cubo de un binomio» — cb-ant-1..5 (special-products).         */
  /* Fuente: tutor-encargo-polinomios-2026 (INSTRUCTOR_CREATED, sin      */
  /* documento físico). Clave sympy: download/verify_antonio.py.         */
  /* ================================================================== */

  /* T2.1 — (x+2)³ = x³+6x²+12x+8. Control x=1: 27. */
  template(
    {
      id: "cb-ant-1",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "special-products",
      difficulty: "easy",
      questionType: "expression",
      estimatedTimeSec: 90,
      tags: ["special-products", "binomial-cube"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "tutor-encargo-polinomios-2026",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "T2 · 1",
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L("Cubo de una suma", "Cube of a sum"),
      statement: L(
        "Desarrolla el cubo de una suma:\n\n$$\\left(x+2\\right)^{3}$$\n\n(escribe por ejemplo x^3+6*x^2+12*x+8).",
        "Expand the cube of a sum:\n\n$$\\left(x+2\\right)^{3}$$\n\n(write e.g. x^3+6*x^2+12*x+8).",
      ),
      answer: {
        kind: "expression",
        accepted: ["x^3+6*x^2+12*x+8", "x^3+6*x^2+12*x+8.0"],
        variables: ["x"],
      },
      hints: [
        L(
          "Es el cubo de un binomio: usa la identidad $(a+b)^3 = a^3+3a^2b+3ab^2+b^3$.",
          "It is the cube of a binomial: use the identity $(a+b)^3 = a^3+3a^2b+3ab^2+b^3$.",
        ),
        L(
          "Con $a = x$ y $b = 2$: los productos cruzados son $3x^2\\cdot 2 = 6x^2$ y $3x\\cdot 4 = 12x$.",
          "With $a = x$ and $b = 2$: the cross products are $3x^2\\cdot 2 = 6x^2$ and $3x\\cdot 4 = 12x$.",
        ),
        L(
          "Los coeficientes del desarrollo son $1$, $6$, $12$ y $8$.",
          "The coefficients of the expansion are $1$, $6$, $12$ and $8$.",
        ),
      ],
      answerDisplay: L(
        "$\\left(x+2\\right)^{3} = x^{3}+6x^{2}+12x+8$",
        "$\\left(x+2\\right)^{3} = x^{3}+6x^{2}+12x+8$",
      ),
      solution: [
        step(
          "given",
          "El cubo $\\left(x+2\\right)^{3}$.",
          "The cube $\\left(x+2\\right)^{3}$.",
        ),
        step(
          "approach",
          "Identidad del cubo de una suma, $(a+b)^3 = a^3+3a^2b+3ab^2+b^3$, con $a = x$ y $b = 2$.",
          "Cube-of-a-sum identity, $(a+b)^3 = a^3+3a^2b+3ab^2+b^3$, with $a = x$ and $b = 2$.",
        ),
        step(
          "calculation",
          "$a^3 = x^3$; $3a^2b = 3\\cdot x^2 \\cdot 2 = 6x^2$; $3ab^2 = 3 \\cdot x \\cdot 2^2 = 12x$; $b^3 = 2^3 = 8$.",
          "$a^3 = x^3$; $3a^2b = 3\\cdot x^2 \\cdot 2 = 6x^2$; $3ab^2 = 3 \\cdot x \\cdot 2^2 = 12x$; $b^3 = 2^3 = 8$.",
        ),
        step(
          "result",
          "$\\left(x+2\\right)^{3} = x^{3}+6x^{2}+12x+8$. Control: con $x = 1$: $\\left(1+2\\right)^{3} = 27$ y $1+6+12+8 = 27$ ✓.",
          "$\\left(x+2\\right)^{3} = x^{3}+6x^{2}+12x+8$. Check: at $x = 1$: $\\left(1+2\\right)^{3} = 27$ and $1+6+12+8 = 27$ ✓.",
        ),
      ],
    }),
  ),

  /* T2.2 — (x−3)³ = x³−9x²+27x−27. Control x=2: −1. */
  template(
    {
      id: "cb-ant-2",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "special-products",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 120,
      tags: ["special-products", "binomial-cube"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "tutor-encargo-polinomios-2026",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "T2 · 2",
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L("Cubo de una diferencia", "Cube of a difference"),
      statement: L(
        "Desarrolla el cubo de una diferencia:\n\n$$\\left(x-3\\right)^{3}$$",
        "Expand the cube of a difference:\n\n$$\\left(x-3\\right)^{3}$$",
      ),
      answer: {
        kind: "expression",
        accepted: ["x^3-9*x^2+27*x-27"],
        variables: ["x"],
      },
      hints: [
        L(
          "Identidad del cubo de una diferencia: $(a-b)^3 = a^3-3a^2b+3ab^2-b^3$.",
          "Cube-of-a-difference identity: $(a-b)^3 = a^3-3a^2b+3ab^2-b^3$.",
        ),
        L(
          "Con $a = x$ y $b = 3$: $-3x^2\\cdot 3 = -9x^2$ y $3x\\cdot 9 = 27x$.",
          "With $a = x$ and $b = 3$: $-3x^2\\cdot 3 = -9x^2$ and $3x\\cdot 9 = 27x$.",
        ),
        L(
          "Los signos del desarrollo alternan: $+$, $-$, $+$, $-$.",
          "The signs of the expansion alternate: $+$, $-$, $+$, $-$.",
        ),
      ],
      answerDisplay: L(
        "$\\left(x-3\\right)^{3} = x^{3}-9x^{2}+27x-27$",
        "$\\left(x-3\\right)^{3} = x^{3}-9x^{2}+27x-27$",
      ),
      solution: [
        step(
          "given",
          "El cubo $\\left(x-3\\right)^{3}$.",
          "The cube $\\left(x-3\\right)^{3}$.",
        ),
        step(
          "approach",
          "Identidad del cubo de una diferencia, $(a-b)^3 = a^3-3a^2b+3ab^2-b^3$, con $a = x$ y $b = 3$.",
          "Cube-of-a-difference identity, $(a-b)^3 = a^3-3a^2b+3ab^2-b^3$, with $a = x$ and $b = 3$.",
        ),
        step(
          "calculation",
          "$a^3 = x^3$; $-3a^2b = -3\\cdot x^2\\cdot 3 = -9x^2$; $3ab^2 = 3\\cdot x\\cdot 3^2 = 27x$; $-b^3 = -27$.",
          "$a^3 = x^3$; $-3a^2b = -3\\cdot x^2\\cdot 3 = -9x^2$; $3ab^2 = 3\\cdot x\\cdot 3^2 = 27x$; $-b^3 = -27$.",
        ),
        step(
          "result",
          "$\\left(x-3\\right)^{3} = x^{3}-9x^{2}+27x-27$. Control: con $x = 2$: $\\left(2-3\\right)^{3} = -1$ y $8-36+54-27 = -1$ ✓.",
          "$\\left(x-3\\right)^{3} = x^{3}-9x^{2}+27x-27$. Check: at $x = 2$: $\\left(2-3\\right)^{3} = -1$ and $8-36+54-27 = -1$ ✓.",
        ),
      ],
    }),
  ),

  /* T2.3 — (2x+y)³; distractores: swap 6/12, solo extremos, 2 sin cubar. */
  template(
    {
      id: "cb-ant-3",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "special-products",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["special-products", "binomial-cube"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "tutor-encargo-polinomios-2026",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "T2 · 3",
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$8x^{3}+12x^{2}y+6xy^{2}+y^{3}$", "$8x^{3}+12x^{2}y+6xy^{2}+y^{3}$"), correct: true },
        { id: "b", text: L("$8x^{3}+6x^{2}y+12xy^{2}+y^{3}$", "$8x^{3}+6x^{2}y+12xy^{2}+y^{3}$"), correct: false },
        { id: "c", text: L("$8x^{3}+y^{3}$", "$8x^{3}+y^{3}$"), correct: false },
        { id: "d", text: L("$2x^{3}+6x^{2}y+12xy^{2}+y^{3}$", "$2x^{3}+6x^{2}y+12xy^{2}+y^{3}$"), correct: false },
      ];
      return {
        skill: L("Cubo de un binomio con dos variables", "Cube of a binomial with two variables"),
        statement: L(
          "¿Cuál es el desarrollo de $(2x+y)^{3}$?",
          "Which one is the expansion of $(2x+y)^{3}$?",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Usa la identidad del cubo de una suma con $a = 2x$ y $b = y$.",
            "Use the cube-of-a-sum identity with $a = 2x$ and $b = y$.",
          ),
          L(
            "$(2x)^3 = 8x^3$ — el $2$ TAMBIÉN se eleva al cubo.",
            "$(2x)^3 = 8x^3$ — the $2$ is ALSO cubed.",
          ),
          L(
            "$3(2x)^{2}y = 12x^{2}y$ y $3(2x)y^{2} = 6xy^{2}$.",
            "$3(2x)^{2}y = 12x^{2}y$ and $3(2x)y^{2} = 6xy^{2}$.",
          ),
        ],
        answerDisplay: L(
          "$(2x+y)^{3} = 8x^{3}+12x^{2}y+6xy^{2}+y^{3}$",
          "$(2x+y)^{3} = 8x^{3}+12x^{2}y+6xy^{2}+y^{3}$",
        ),
        solution: [
          step(
            "given",
            "El cubo $(2x+y)^{3}$.",
            "The cube $(2x+y)^{3}$.",
          ),
          step(
            "approach",
            "Cubo de una suma con $a = 2x$ y $b = y$: $(a+b)^3 = a^3+3a^2b+3ab^2+b^3$.",
            "Cube of a sum with $a = 2x$ and $b = y$: $(a+b)^3 = a^3+3a^2b+3ab^2+b^3$.",
          ),
          step(
            "calculation",
            "$(2x)^3 = 8x^3$; $3(2x)^2y = 3\\cdot 4x^2\\cdot y = 12x^2y$; $3(2x)y^2 = 6xy^2$; $y^3$.",
            "$(2x)^3 = 8x^3$; $3(2x)^2y = 3\\cdot 4x^2\\cdot y = 12x^2y$; $3(2x)y^2 = 6xy^2$; $y^3$.",
          ),
          step(
            "result",
            "$(2x+y)^{3} = 8x^{3}+12x^{2}y+6xy^{2}+y^{3}$. Control: con $x = 1$, $y = 1$: izquierda $(2+1)^{3} = 27$ y $8+12+6+1 = 27$ ✓.",
            "$(2x+y)^{3} = 8x^{3}+12x^{2}y+6xy^{2}+y^{3}$. Check: at $x = 1$, $y = 1$: left side $(2+1)^{3} = 27$ and $8+12+6+1 = 27$ ✓.",
          ),
        ],
      };
    },
  ),

  /* T2.4 — coef. lineal de (x−4)³ = 48; distractores −48, 12, −12. */
  template(
    {
      id: "cb-ant-4",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "special-products",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 210,
      tags: ["special-products", "binomial-cube", "coefficient"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "tutor-encargo-polinomios-2026",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "T2 · 4",
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$48$", "$48$"), correct: true },
        { id: "b", text: L("$-48$", "$-48$"), correct: false },
        { id: "c", text: L("$12$", "$12$"), correct: false },
        { id: "d", text: L("$-12$", "$-12$"), correct: false },
      ];
      return {
        skill: L(
          "Coeficiente del término lineal en un cubo",
          "Coefficient of the linear term in a cube",
        ),
        statement: L(
          "En el desarrollo de $(x-4)^{3}$, ¿cuál es el coeficiente del término lineal (el que va con $x$)?",
          "In the expansion of $(x-4)^{3}$, what is the coefficient of the linear term (the one with $x$)?",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Identidad: $(a-b)^3 = a^3 - 3a^2b + 3ab^2 - b^3$.",
            "Identity: $(a-b)^3 = a^3 - 3a^2b + 3ab^2 - b^3$.",
          ),
          L(
            "El término en $x$ es $3ab^2 = 3\\cdot x\\cdot(-4)^{2}$.",
            "The $x$ term is $3ab^2 = 3\\cdot x\\cdot(-4)^{2}$.",
          ),
          L(
            "$(-4)^2 = 16$, y $3\\cdot 16 = 48$.",
            "$(-4)^2 = 16$, and $3\\cdot 16 = 48$.",
          ),
        ],
        answerDisplay: L(
          "El término lineal de $(x-4)^{3}$ es $48x$",
          "The linear term of $(x-4)^{3}$ is $48x$",
        ),
        solution: [
          step(
            "given",
            "El cubo $(x-4)^{3}$; se pide el coeficiente del término en $x$.",
            "The cube $(x-4)^{3}$; the coefficient of the $x$ term is requested.",
          ),
          step(
            "approach",
            "Desarrollar con la identidad del cubo de una diferencia y leer el término lineal.",
            "Expand with the cube-of-a-difference identity and read off the linear term.",
          ),
          step(
            "calculation",
            "$(x-4)^3 = x^3 - 3x^2\\cdot 4 + 3x\\cdot (-4)^2 - 4^3 = x^3-12x^2+48x-64$.",
            "$(x-4)^3 = x^3 - 3x^2\\cdot 4 + 3x\\cdot (-4)^2 - 4^3 = x^3-12x^2+48x-64$.",
          ),
          step(
            "result",
            "El coeficiente del término lineal es $48$. Control: con $x = 2$: $\\left(2-4\\right)^{3} = -8$ y $8-48+96-64 = -8$ ✓.",
            "The coefficient of the linear term is $48$. Check: at $x = 2$: $\\left(2-4\\right)^{3} = -8$ and $8-48+96-64 = -8$ ✓.",
          ),
        ],
      };
    },
  ),

  /* T2.5 — (1−2x)³ = 1−6x+12x²−8x³. Control x=1: −1. */
  template(
    {
      id: "cb-ant-5",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "special-products",
      difficulty: "hard",
      questionType: "expression",
      estimatedTimeSec: 240,
      tags: ["special-products", "binomial-cube"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "tutor-encargo-polinomios-2026",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "T2 · 5",
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L(
        "Cubo con la variable en el segundo término",
        "Cube with the variable in the second term",
      ),
      statement: L(
        "Desarrolla:\n\n$$\\left(1-2x\\right)^{3}$$",
        "Expand:\n\n$$\\left(1-2x\\right)^{3}$$",
      ),
      answer: {
        kind: "expression",
        accepted: ["1-6*x+12*x^2-8*x^3", "-8*x^3+12*x^2-6*x+1"],
        variables: ["x"],
      },
      hints: [
        L(
          "Es el cubo de una diferencia con $a = 1$ y $b = 2x$ — el $b$ NO es solo la $x$.",
          "It is the cube of a difference with $a = 1$ and $b = 2x$ — $b$ is NOT just the $x$.",
        ),
        L(
          "$-3a^2b = -3\\cdot 1\\cdot 2x = -6x$ y $3ab^2 = 3\\cdot 1\\cdot 4x^2 = 12x^2$.",
          "$-3a^2b = -3\\cdot 1\\cdot 2x = -6x$ and $3ab^2 = 3\\cdot 1\\cdot 4x^2 = 12x^2$.",
        ),
        L(
          "Termina en $-(2x)^3 = -8x^3$.",
          "It ends with $-(2x)^3 = -8x^3$.",
        ),
      ],
      answerDisplay: L(
        "$\\left(1-2x\\right)^{3} = 1-6x+12x^{2}-8x^{3}$",
        "$\\left(1-2x\\right)^{3} = 1-6x+12x^{2}-8x^{3}$",
      ),
      solution: [
        step(
          "given",
          "El cubo $\\left(1-2x\\right)^{3}$.",
          "The cube $\\left(1-2x\\right)^{3}$.",
        ),
        step(
          "approach",
          "Cubo de una diferencia con $a = 1$ y $b = 2x$: $(a-b)^3 = a^3-3a^2b+3ab^2-b^3$.",
          "Cube of a difference with $a = 1$ and $b = 2x$: $(a-b)^3 = a^3-3a^2b+3ab^2-b^3$.",
        ),
        step(
          "calculation",
          "$a^3 = 1$; $-3a^2b = -6x$; $3ab^2 = 3\\cdot(2x)^2 = 12x^2$; $-b^3 = -(2x)^3 = -8x^3$.",
          "$a^3 = 1$; $-3a^2b = -6x$; $3ab^2 = 3\\cdot(2x)^2 = 12x^2$; $-b^3 = -(2x)^3 = -8x^3$.",
        ),
        step(
          "result",
          "$\\left(1-2x\\right)^{3} = 1-6x+12x^{2}-8x^{3}$. Control: con $x = 1$: $\\left(1-2\\right)^{3} = -1$ y $1-6+12-8 = -1$ ✓.",
          "$\\left(1-2x\\right)^{3} = 1-6x+12x^{2}-8x^{3}$. Check: at $x = 1$: $\\left(1-2\\right)^{3} = -1$ and $1-6+12-8 = -1$ ✓.",
        ),
      ],
    }),
  ),

  /* ================================================================== */
  /* ANTONIO · T3 «Operaciones con polinomios» — ops-ant-1..5            */
  /* (operations). Ítems procedurales: sin `reasoning`, igual que        */
  /* poly-ops-01 (solo ops-ant-5 lo lleva). Fuente y clave: como T2.     */
  /* ================================================================== */

  /* T3.1 — suma: 4x²−x−5. */
  template(
    {
      id: "ops-ant-1",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "operations",
      difficulty: "easy",
      questionType: "expression",
      estimatedTimeSec: 90,
      tags: ["operations", "addition"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "tutor-encargo-polinomios-2026",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "T3 · 1",
      },
    },
    () => ({
      skill: L("Suma de polinomios", "Adding polynomials"),
      statement: L(
        "Efectúa la suma: $\\left(3x^{2}-5x+2\\right)+\\left(x^{2}+4x-7\\right)$",
        "Carry out the addition: $\\left(3x^{2}-5x+2\\right)+\\left(x^{2}+4x-7\\right)$",
      ),
      answer: {
        kind: "expression",
        accepted: ["4*x^2-x-5"],
        variables: ["x"],
      },
      hints: [
        L(
          "Agrupa los términos semejantes: los que tienen el mismo exponente.",
          "Group the like terms: those with the same exponent.",
        ),
        L(
          "En $x^2$: $3x^2+x^2 = 4x^2$; en $x$: $-5x+4x = -x$.",
          "In $x^2$: $3x^2+x^2 = 4x^2$; in $x$: $-5x+4x = -x$.",
        ),
        L(
          "Las constantes: $2-7 = -5$.",
          "The constants: $2-7 = -5$.",
        ),
      ],
      answerDisplay: L(
        "$\\left(3x^{2}-5x+2\\right)+\\left(x^{2}+4x-7\\right) = 4x^{2}-x-5$",
        "$\\left(3x^{2}-5x+2\\right)+\\left(x^{2}+4x-7\\right) = 4x^{2}-x-5$",
      ),
      solution: [
        step(
          "given",
          "La suma $\\left(3x^{2}-5x+2\\right)+\\left(x^{2}+4x-7\\right)$.",
          "The addition $\\left(3x^{2}-5x+2\\right)+\\left(x^{2}+4x-7\\right)$.",
        ),
        step(
          "approach",
          "Sumar por separado los coeficientes de cada grado.",
          "Add the coefficients of each degree separately.",
        ),
        step(
          "calculation",
          "En $x^2$: $3+1 = 4$; en $x$: $-5+4 = -1$; en la constante: $2-7 = -5$.",
          "In $x^2$: $3+1 = 4$; in $x$: $-5+4 = -1$; in the constant: $2-7 = -5$.",
        ),
        step(
          "result",
          "$= 4x^{2}-x-5$. Control: con $x = 1$: $\\left(3-5+2\\right)+\\left(1+4-7\\right) = 0+(-2) = -2$ y $4-1-5 = -2$ ✓.",
          "$= 4x^{2}-x-5$. Check: at $x = 1$: $\\left(3-5+2\\right)+\\left(1+4-7\\right) = 0+(-2) = -2$ and $4-1-5 = -2$ ✓.",
        ),
      ],
    }),
  ),

  /* T3.2 — resta: x³−6x+13. Control x=1: 8. */
  template(
    {
      id: "ops-ant-2",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "operations",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 120,
      tags: ["operations", "subtraction"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "tutor-encargo-polinomios-2026",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "T3 · 2",
      },
    },
    () => ({
      skill: L("Resta de polinomios", "Subtracting polynomials"),
      statement: L(
        "Efectúa la resta: $\\left(2x^{3}-x+9\\right)-\\left(x^{3}+5x-4\\right)$",
        "Carry out the subtraction: $\\left(2x^{3}-x+9\\right)-\\left(x^{3}+5x-4\\right)$",
      ),
      answer: {
        kind: "expression",
        accepted: ["x^3-6*x+13"],
        variables: ["x"],
      },
      hints: [
        L(
          "El signo menos se distribuye a **todo** el segundo paréntesis.",
          "The minus sign distributes over **every** term of the second parenthesis.",
        ),
        L(
          "En $x$: $-x-5x = -6x$.",
          "In $x$: $-x-5x = -6x$.",
        ),
        L(
          "Las constantes: $9-(-4) = 13$.",
          "The constants: $9-(-4) = 13$.",
        ),
      ],
      answerDisplay: L(
        "$\\left(2x^{3}-x+9\\right)-\\left(x^{3}+5x-4\\right) = x^{3}-6x+13$",
        "$\\left(2x^{3}-x+9\\right)-\\left(x^{3}+5x-4\\right) = x^{3}-6x+13$",
      ),
      solution: [
        step(
          "given",
          "La resta $\\left(2x^{3}-x+9\\right)-\\left(x^{3}+5x-4\\right)$.",
          "The subtraction $\\left(2x^{3}-x+9\\right)-\\left(x^{3}+5x-4\\right)$.",
        ),
        step(
          "approach",
          "Cambiar el signo de todos los términos del segundo paréntesis y luego reducir los semejantes.",
          "Flip the sign of every term of the second parenthesis and then combine like terms.",
        ),
        step(
          "calculation",
          "$= 2x^3-x+9-x^3-5x+4$<br>En $x^3$: $2-1 = 1$; en $x$: $-1-5 = -6$; constante: $9+4 = 13$.",
          "$= 2x^3-x+9-x^3-5x+4$<br>In $x^3$: $2-1 = 1$; in $x$: $-1-5 = -6$; constant: $9+4 = 13$.",
        ),
        step(
          "result",
          "$= x^{3}-6x+13$. Control: con $x = 1$: $\\left(2-1+9\\right)-\\left(1+5-4\\right) = 10-2 = 8$ y $1-6+13 = 8$ ✓.",
          "$= x^{3}-6x+13$. Check: at $x = 1$: $\\left(2-1+9\\right)-\\left(1+5-4\\right) = 10-2 = 8$ and $1-6+13 = 8$ ✓.",
        ),
      ],
    }),
  ),

  /* T3.3 — producto: 2x³+5x²−2x+3. Control x=1: 8. */
  template(
    {
      id: "ops-ant-3",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "operations",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 150,
      tags: ["operations", "multiplication"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "tutor-encargo-polinomios-2026",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "T3 · 3",
      },
    },
    () => ({
      skill: L("Producto de un binomio por un trinomio", "Product of a binomial by a trinomial"),
      statement: L(
        "Multiplica: $\\left(x+3\\right)\\left(2x^{2}-x+1\\right)$",
        "Multiply: $\\left(x+3\\right)\\left(2x^{2}-x+1\\right)$",
      ),
      answer: {
        kind: "expression",
        accepted: ["2*x^3+5*x^2-2*x+3"],
        variables: ["x"],
      },
      hints: [
        L(
          "Distribuye primero el monomio $x$ y luego el $3$ sobre el trinomio.",
          "Distribute first the monomial $x$ and then the $3$ over the trinomial.",
        ),
        L(
          "$x\\cdot\\left(2x^{2}-x+1\\right) = 2x^{3}-x^{2}+x$ y $3\\cdot\\left(2x^{2}-x+1\\right) = 6x^{2}-3x+3$.",
          "$x\\cdot\\left(2x^{2}-x+1\\right) = 2x^{3}-x^{2}+x$ and $3\\cdot\\left(2x^{2}-x+1\\right) = 6x^{2}-3x+3$.",
        ),
        L(
          "Al sumar: $-x^2+6x^2 = 5x^2$.",
          "Adding up: $-x^2+6x^2 = 5x^2$.",
        ),
      ],
      answerDisplay: L(
        "$\\left(x+3\\right)\\left(2x^{2}-x+1\\right) = 2x^{3}+5x^{2}-2x+3$",
        "$\\left(x+3\\right)\\left(2x^{2}-x+1\\right) = 2x^{3}+5x^{2}-2x+3$",
      ),
      solution: [
        step(
          "given",
          "El producto $\\left(x+3\\right)\\left(2x^{2}-x+1\\right)$.",
          "The product $\\left(x+3\\right)\\left(2x^{2}-x+1\\right)$.",
        ),
        step(
          "approach",
          "Doble distribución: cada término del binomio multiplica al trinomio completo; luego se reducen los semejantes.",
          "Double distribution: each term of the binomial multiplies the whole trinomial; then combine like terms.",
        ),
        step(
          "calculation",
          "$x\\left(2x^{2}-x+1\\right) = 2x^{3}-x^{2}+x$<br>$3\\left(2x^{2}-x+1\\right) = 6x^{2}-3x+3$<br>$= 2x^{3}+(-1+6)x^{2}+(1-3)x+3 = 2x^{3}+5x^{2}-2x+3$",
          "$x\\left(2x^{2}-x+1\\right) = 2x^{3}-x^{2}+x$<br>$3\\left(2x^{2}-x+1\\right) = 6x^{2}-3x+3$<br>$= 2x^{3}+(-1+6)x^{2}+(1-3)x+3 = 2x^{3}+5x^{2}-2x+3$",
        ),
        step(
          "result",
          "$= 2x^{3}+5x^{2}-2x+3$. Control: con $x = 1$: $\\left(1+3\\right)\\left(2-1+1\\right) = 4\\cdot 2 = 8$ y $2+5-2+3 = 8$ ✓.",
          "$= 2x^{3}+5x^{2}-2x+3$. Check: at $x = 1$: $\\left(1+3\\right)\\left(2-1+1\\right) = 4\\cdot 2 = 8$ and $2+5-2+3 = 8$ ✓.",
        ),
      ],
    }),
  ),

  /* T3.4 — división exacta entre monomio: 6x²−4x+3. */
  template(
    {
      id: "ops-ant-4",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "operations",
      difficulty: "hard",
      questionType: "expression",
      estimatedTimeSec: 210,
      tags: ["operations", "division"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "tutor-encargo-polinomios-2026",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "T3 · 4",
      },
    },
    () => ({
      skill: L("División de un polinomio entre un monomio", "Dividing a polynomial by a monomial"),
      statement: L(
        "Divide (es exacta):\n\n$$\\frac{12x^{4}-8x^{3}+6x^{2}}{2x^{2}}$$",
        "Divide (it is exact):\n\n$$\\frac{12x^{4}-8x^{3}+6x^{2}}{2x^{2}}$$",
      ),
      answer: {
        kind: "expression",
        accepted: ["6*x^2-4*x+3", "6*x^2-4*x+3.0"],
        variables: ["x"],
      },
      hints: [
        L(
          "Divide **cada** término del numerador entre $2x^{2}$.",
          "Divide **each** term of the numerator by $2x^{2}$.",
        ),
        L(
          "$12x^{4}/2x^{2} = 6x^{2}$ y $-8x^{3}/2x^{2} = -4x$.",
          "$12x^{4}/2x^{2} = 6x^{2}$ and $-8x^{3}/2x^{2} = -4x$.",
        ),
        L(
          "El último: $6x^{2}/2x^{2} = 3$.",
          "The last one: $6x^{2}/2x^{2} = 3$.",
        ),
      ],
      answerDisplay: L(
        "$\\frac{12x^{4}-8x^{3}+6x^{2}}{2x^{2}} = 6x^{2}-4x+3$",
        "$\\frac{12x^{4}-8x^{3}+6x^{2}}{2x^{2}} = 6x^{2}-4x+3$",
      ),
      solution: [
        step(
          "given",
          "El cociente $\\frac{12x^{4}-8x^{3}+6x^{2}}{2x^{2}}$ (con $x \\neq 0$).",
          "The quotient $\\frac{12x^{4}-8x^{3}+6x^{2}}{2x^{2}}$ (with $x \\neq 0$).",
        ),
        step(
          "approach",
          "Dividir término a término entre el monomio $2x^2$: coeficientes entre sí y exponentes restados.",
          "Divide term by term by the monomial $2x^2$: coefficients divided and exponents subtracted.",
        ),
        step(
          "calculation",
          "$\\frac{12x^{4}}{2x^{2}} = 6x^{2}$; $\\frac{-8x^{3}}{2x^{2}} = -4x$; $\\frac{6x^{2}}{2x^{2}} = 3$.",
          "$\\frac{12x^{4}}{2x^{2}} = 6x^{2}$; $\\frac{-8x^{3}}{2x^{2}} = -4x$; $\\frac{6x^{2}}{2x^{2}} = 3$.",
        ),
        step(
          "result",
          "$\\frac{12x^{4}-8x^{3}+6x^{2}}{2x^{2}} = 6x^{2}-4x+3$. Control de vuelta: $2x^{2}\\left(6x^{2}-4x+3\\right) = 12x^{4}-8x^{3}+6x^{2}$ ✓.",
          "$\\frac{12x^{4}-8x^{3}+6x^{2}}{2x^{2}} = 6x^{2}-4x+3$. Check by multiplying back: $2x^{2}\\left(6x^{2}-4x+3\\right) = 12x^{4}-8x^{3}+6x^{2}$ ✓.",
        ),
      ],
    }),
  ),

  /* T3.5 — 2P−Q = 3x²−11x+4; distractores 2P+Q, sin constante, +2. */
  template(
    {
      id: "ops-ant-5",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "operations",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["operations", "combined", "evaluation"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "tutor-encargo-polinomios-2026",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "T3 · 5",
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$3x^{2}-11x+4$", "$3x^{2}-11x+4$"), correct: true },
        { id: "b", text: L("$5x^{2}-x$", "$5x^{2}-x$"), correct: false },
        { id: "c", text: L("$3x^{2}-11x$", "$3x^{2}-11x$"), correct: false },
        { id: "d", text: L("$3x^{2}-11x+2$", "$3x^{2}-11x+2$"), correct: false },
      ];
      return {
        skill: L("Combinación lineal de polinomios", "Linear combination of polynomials"),
        statement: L(
          "Sean $P(x)=2x^{2}-3x+1$ y $Q(x)=x^{2}+5x-2$. ¿Cuál es $2P(x)-Q(x)$?",
          "Let $P(x)=2x^{2}-3x+1$ and $Q(x)=x^{2}+5x-2$. Which one is $2P(x)-Q(x)$?",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Primero $2P = 4x^{2}-6x+2$.",
            "First $2P = 4x^{2}-6x+2$.",
          ),
          L(
            "Luego resta **todo** $Q$: $-x^{2}-5x+2$.",
            "Then subtract **all of** $Q$: $-x^{2}-5x+2$.",
          ),
          L(
            "Las constantes: $2+2 = 4$ (porque $-(-2) = +2$).",
            "The constants: $2+2 = 4$ (because $-(-2) = +2$).",
          ),
        ],
        answerDisplay: L(
          "$2P(x)-Q(x) = 3x^{2}-11x+4$",
          "$2P(x)-Q(x) = 3x^{2}-11x+4$",
        ),
        solution: [
          step(
            "given",
            "$P(x)=2x^{2}-3x+1$ y $Q(x)=x^{2}+5x-2$; se pide $2P(x)-Q(x)$.",
            "$P(x)=2x^{2}-3x+1$ and $Q(x)=x^{2}+5x-2$; the request is $2P(x)-Q(x)$.",
          ),
          step(
            "approach",
            "Calcular primero $2P$ y restarle después $Q$ completo, distribuyendo el signo.",
            "Compute $2P$ first and then subtract all of $Q$, distributing the sign.",
          ),
          step(
            "calculation",
            "$2P = 4x^{2}-6x+2$<br>$2P-Q = 4x^{2}-6x+2-x^{2}-5x+2 = 3x^{2}-11x+4$",
            "$2P = 4x^{2}-6x+2$<br>$2P-Q = 4x^{2}-6x+2-x^{2}-5x+2 = 3x^{2}-11x+4$",
          ),
          step(
            "result",
            "$2P(x)-Q(x) = 3x^{2}-11x+4$. Control: con $x = 1$: $P(1) = 0$, $Q(1) = 4 \\Rightarrow 2P-Q = -4$ y $3-11+4 = -4$ ✓.",
            "$2P(x)-Q(x) = 3x^{2}-11x+4$. Check: at $x = 1$: $P(1) = 0$, $Q(1) = 4 \\Rightarrow 2P-Q = -4$ and $3-11+4 = -4$ ✓.",
          ),
        ],
      };
    },
  ),

  /* ================================================================== */
  /* ANTONIO · T4 «Lenguaje algebraico» — alg-ant-1..6 (subtopic NUEVO   */
  /* algebraic-language; lo registra el integrador en curriculum/math).  */
  /* La «x» del enunciado ES la incógnita pedida. Reasoning: modeling.  */
  /* Fuente y clave: como T2.                                            */
  /* ================================================================== */

  /* T4.1 — el triple aumentado en 5: 3x+5. */
  template(
    {
      id: "alg-ant-1",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "algebraic-language",
      difficulty: "easy",
      questionType: "expression",
      estimatedTimeSec: 75,
      tags: ["algebraic-language", "translation"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "tutor-encargo-polinomios-2026",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "T4 · 1",
      },
      reasoning: "modeling",
    },
    () => ({
      skill: L("Traducción al lenguaje algebraico", "Translating into algebraic language"),
      statement: L(
        "Si $x$ es un número, escribe en lenguaje algebraico: «el triple de un número, aumentado en 5».",
        "If $x$ is a number, write in algebraic language: \"three times a number, increased by 5\".",
      ),
      answer: {
        kind: "expression",
        accepted: ["3*x+5"],
        variables: ["x"],
      },
      hints: [
        L(
          "«El triple de» un número es multiplicarlo por 3: $3x$.",
          "\"Three times\" a number means multiplying it by 3: $3x$.",
        ),
        L(
          "«Aumentado en» 5 se traduce con una suma: $+$.",
          "\"Increased by\" 5 translates as an addition: $+$.",
        ),
        L(
          "$3x+5$ — el $5$ va FUERA del producto.",
          "$3x+5$ — the $5$ goes OUTSIDE the product.",
        ),
      ],
      answerDisplay: L("$3x+5$", "$3x+5$"),
      solution: [
        step(
          "given",
          "La frase «el triple de un número, aumentado en 5», donde el número es $x$.",
          "The sentence \"three times a number, increased by 5\", where the number is $x$.",
        ),
        step(
          "approach",
          "Traducir pieza a pieza: primero «el triple de», después «aumentado en 5».",
          "Translate piece by piece: first \"three times\", then \"increased by 5\".",
        ),
        step(
          "calculation",
          "«El triple de un número»: $3x$. «Aumentado en 5»: se suma el $5$ después del producto: $3x+5$.",
          "\"Three times a number\": $3x$. \"Increased by 5\": the $5$ is added after the product: $3x+5$.",
        ),
        step(
          "result",
          "$3x+5$. Control: con $x = 4$: el triple de 4 es 12 y $12+5 = 17$; también $3\\cdot 4+5 = 17$ ✓.",
          "$3x+5$. Check: at $x = 4$: three times 4 is 12 and $12+5 = 17$; also $3\\cdot 4+5 = 17$ ✓.",
        ),
      ],
    }),
  ),

  /* T4.2 — cuadrado + doble: x²+2x. */
  template(
    {
      id: "alg-ant-2",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "algebraic-language",
      difficulty: "easy",
      questionType: "expression",
      estimatedTimeSec: 90,
      tags: ["algebraic-language", "translation"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "tutor-encargo-polinomios-2026",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "T4 · 2",
      },
      reasoning: "modeling",
    },
    () => ({
      skill: L("Traducción al lenguaje algebraico", "Translating into algebraic language"),
      statement: L(
        "Escribe en lenguaje algebraico: «la suma del cuadrado de un número y su doble».",
        "Write in algebraic language: \"the sum of the square of a number and its double\".",
      ),
      answer: {
        kind: "expression",
        accepted: ["x^2+2*x", "2*x+x^2"],
        variables: ["x"],
      },
      hints: [
        L(
          "Dos piezas: el cuadrado $x^{2}$ y el doble $2x$.",
          "Two pieces: the square $x^{2}$ and the double $2x$.",
        ),
        L(
          "«La suma de A y B» se traduce como $A+B$.",
          "\"The sum of A and B\" translates as $A+B$.",
        ),
        L(
          "Queda $x^{2}+2x$.",
          "It gives $x^{2}+2x$.",
        ),
      ],
      answerDisplay: L("$x^{2}+2x$", "$x^{2}+2x$"),
      solution: [
        step(
          "given",
          "La frase «la suma del cuadrado de un número y su doble», con $x$ el número.",
          "The sentence \"the sum of the square of a number and its double\", with $x$ the number.",
        ),
        step(
          "approach",
          "Identificar las dos piezas de la suma y unirlas.",
          "Identify the two pieces of the sum and join them.",
        ),
        step(
          "calculation",
          "El cuadrado del número: $x^{2}$. Su doble: $2x$. La suma de ambas: $x^{2}+2x$.",
          "The square of the number: $x^{2}$. Its double: $2x$. The sum of both: $x^{2}+2x$.",
        ),
        step(
          "result",
          "$x^{2}+2x$. Control: con $x = 3$: el cuadrado es 9, el doble es 6 y $9+6 = 15$; también $3^{2}+2\\cdot 3 = 15$ ✓.",
          "$x^{2}+2x$. Check: at $x = 3$: the square is 9, the double is 6 and $9+6 = 15$; also $3^{2}+2\\cdot 3 = 15$ ✓.",
        ),
      ],
    }),
  ),

  /* T4.3 — ecuación 2x−4 = x²−3; distractores 2(x−4), 2x+4, x²+3. */
  template(
    {
      id: "alg-ant-3",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "algebraic-language",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["algebraic-language", "equation-translation"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "tutor-encargo-polinomios-2026",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "T4 · 3",
      },
      reasoning: "modeling",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$2x-4=x^{2}-3$", "$2x-4=x^{2}-3$"), correct: true },
        { id: "b", text: L("$2(x-4)=x^{2}-3$", "$2(x-4)=x^{2}-3$"), correct: false },
        { id: "c", text: L("$2x+4=x^{2}-3$", "$2x+4=x^{2}-3$"), correct: false },
        { id: "d", text: L("$2x-4=x^{2}+3$", "$2x-4=x^{2}+3$"), correct: false },
      ];
      return {
        skill: L("Traducción de una frase a una ecuación", "Translating a sentence into an equation"),
        statement: L(
          "La frase «el doble de un número, disminuido en 4, es igual al cuadrado del número menos 3» se traduce a:",
          "The sentence \"twice a number, decreased by 4, equals the square of the number minus 3\" translates to:",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "«El doble de un número» es $2x$.",
            "\"Twice a number\" is $2x$.",
          ),
          L(
            "«Disminuido en 4» le resta 4 a ESO: $2x-4$ (no $2(x-4)$).",
            "\"Decreased by 4\" subtracts 4 from THAT: $2x-4$ (not $2(x-4)$).",
          ),
          L(
            "«El cuadrado del número menos 3»: $x^{2}-3$.",
            "\"The square of the number minus 3\": $x^{2}-3$.",
          ),
        ],
        answerDisplay: L("$2x-4=x^{2}-3$", "$2x-4=x^{2}-3$"),
        solution: [
          step(
            "given",
            "La frase: «el doble de un número, disminuido en 4, es igual al cuadrado del número menos 3».",
            "The sentence: \"twice a number, decreased by 4, equals the square of the number minus 3\".",
          ),
          step(
            "approach",
            "Traducir cada lado por separado y unirlos con el signo $=$.",
            "Translate each side separately and join them with an $=$ sign.",
          ),
          step(
            "calculation",
            "Izquierda: «el doble de un número, disminuido en 4» $= 2x-4$.<br>Derecha: «el cuadrado del número menos 3» $= x^{2}-3$.",
            "Left: \"twice a number, decreased by 4\" $= 2x-4$.<br>Right: \"the square of the number minus 3\" $= x^{2}-3$.",
          ),
          step(
            "result",
            "$2x-4=x^{2}-3$. Control: la ecuación se cumple en su solución $x = 1$: izquierda $2\\cdot 1-4 = -2$ y derecha $1-3 = -2$ ✓.",
            "$2x-4=x^{2}-3$. Check: the equation holds at its solution $x = 1$: left side $2\\cdot 1-4 = -2$ and right side $1-3 = -2$ ✓.",
          ),
        ],
      };
    },
  ),

  /* T4.4 — perímetro del rectángulo: 4x+6. */
  template(
    {
      id: "alg-ant-4",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "algebraic-language",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 150,
      tags: ["algebraic-language", "perimeter"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "tutor-encargo-polinomios-2026",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "T4 · 4",
      },
      reasoning: "modeling",
    },
    () => ({
      skill: L("Perímetro en lenguaje algebraico", "Perimeter in algebraic language"),
      statement: L(
        "El largo de un rectángulo excede en 3 m a su ancho. Si el ancho mide $x$, expresa el perímetro simplificado.",
        "The length of a rectangle exceeds its width by 3 m. If the width is $x$, write the simplified perimeter.",
      ),
      answer: {
        kind: "expression",
        accepted: ["4*x+6", "2*(2*x+3)", "2*(x+x+3)"],
        variables: ["x"],
      },
      hints: [
        L(
          "El largo mide $x+3$ (excede en 3 al ancho).",
          "The length is $x+3$ (it exceeds the width by 3).",
        ),
        L(
          "El perímetro es $2\\left(x+(x+3)\\right)$.",
          "The perimeter is $2\\left(x+(x+3)\\right)$.",
        ),
        L(
          "$2(2x+3) = 4x+6$.",
          "$2(2x+3) = 4x+6$.",
        ),
      ],
      answerDisplay: L(
        "$P = 2\\left(x+(x+3)\\right) = 4x+6$",
        "$P = 2\\left(x+(x+3)\\right) = 4x+6$",
      ),
      solution: [
        step(
          "given",
          "Ancho $x$; largo $x+3$; se pide el perímetro simplificado.",
          "Width $x$; length $x+3$; the simplified perimeter is requested.",
        ),
        step(
          "approach",
          "El perímetro es la suma de los cuatro lados: dos anchos y dos largos.",
          "The perimeter is the sum of the four sides: two widths and two lengths.",
        ),
        step(
          "calculation",
          "$P = x+(x+3)+x+(x+3) = 2x+2(x+3) = 2x+2x+6 = 4x+6$.",
          "$P = x+(x+3)+x+(x+3) = 2x+2(x+3) = 2x+2x+6 = 4x+6$.",
        ),
        step(
          "result",
          "$P = 4x+6$ (en metros). Control: con $x = 2$: ancho 2, largo 5, perímetro $2+5+2+5 = 14$ y $4\\cdot 2+6 = 14$ ✓.",
          "$P = 4x+6$ (in meters). Check: at $x = 2$: width 2, length 5, perimeter $2+5+2+5 = 14$ and $4\\cdot 2+6 = 14$ ✓.",
        ),
      ],
    }),
  ),

  /* T4.5 — mitad + cuarta del doble − 3 = x−3. */
  template(
    {
      id: "alg-ant-5",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "algebraic-language",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 210,
      tags: ["algebraic-language", "simplification"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "tutor-encargo-polinomios-2026",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "T4 · 5",
      },
      reasoning: "modeling",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$x-3$", "$x-3$"), correct: true },
        { id: "b", text: L("$\\frac{3x}{4}-3$", "$\\frac{3x}{4}-3$"), correct: false },
        { id: "c", text: L("$\\frac{x}{2}-3$", "$\\frac{x}{2}-3$"), correct: false },
        { id: "d", text: L("$x+3$", "$x+3$"), correct: false },
      ];
      return {
        skill: L("Simplificación de una traducción algebraica", "Simplifying an algebraic translation"),
        statement: L(
          "«La mitad de un número, más la cuarta parte del DOBLE de ese número, menos 3.» ¿Cuál es la expresión SIMPLIFICADA?",
          "\"Half of a number, plus a quarter of the DOUBLE of that number, minus 3.\" Which is the SIMPLIFIED expression?",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "La cuarta parte del DOBLE es $\\frac{2x}{4} = \\frac{x}{2}$.",
            "A quarter of the DOUBLE is $\\frac{2x}{4} = \\frac{x}{2}$.",
          ),
          L(
            "$\\frac{x}{2}+\\frac{x}{2} = x$.",
            "$\\frac{x}{2}+\\frac{x}{2} = x$.",
          ),
          L(
            "Queda $x-3$.",
            "It leaves $x-3$.",
          ),
        ],
        answerDisplay: L(
          "$\\frac{x}{2}+\\frac{2x}{4}-3 = x-3$",
          "$\\frac{x}{2}+\\frac{2x}{4}-3 = x-3$",
        ),
        solution: [
          step(
            "given",
            "La frase: «la mitad de un número, más la cuarta parte del DOBLE de ese número, menos 3».",
            "The sentence: \"half of a number, plus a quarter of the DOUBLE of that number, minus 3\".",
          ),
          step(
            "approach",
            "Traducir las tres piezas y simplificar las fracciones.",
            "Translate the three pieces and simplify the fractions.",
          ),
          step(
            "calculation",
            "$\\frac{x}{2}+\\frac{2x}{4}-3 = \\frac{x}{2}+\\frac{x}{2}-3 = x-3$.",
            "$\\frac{x}{2}+\\frac{2x}{4}-3 = \\frac{x}{2}+\\frac{x}{2}-3 = x-3$.",
          ),
          step(
            "result",
            "La expresión simplificada es $x-3$. Control: con $x = 8$: $4+4-3 = 5$ y $8-3 = 5$ ✓.",
            "The simplified expression is $x-3$. Check: at $x = 8$: $4+4-3 = 5$ and $8-3 = 5$ ✓.",
          ),
        ],
      };
    },
  ),

  /* T4.6 — ecuación x/2+8 = 3x−12 (solución x=8). */
  template(
    {
      id: "alg-ant-6",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "algebraic-language",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 180,
      tags: ["algebraic-language", "equation-translation"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "tutor-encargo-polinomios-2026",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "T4 · 6",
      },
      reasoning: "modeling",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$\\frac{x}{2}+8=3x-12$", "$\\frac{x}{2}+8=3x-12$"), correct: true },
        { id: "b", text: L("$\\frac{x}{2}+8=3(x-12)$", "$\\frac{x}{2}+8=3(x-12)$"), correct: false },
        { id: "c", text: L("$\\frac{x}{2}-8=3x-12$", "$\\frac{x}{2}-8=3x-12$"), correct: false },
        { id: "d", text: L("$2x+8=3x-12$", "$2x+8=3x-12$"), correct: false },
      ];
      return {
        skill: L("Traducción de una frase a una ecuación", "Translating a sentence into an equation"),
        statement: L(
          "«La mitad de un número, más 8, es igual al triple del número, menos 12.» ¿Cuál es la ecuación?",
          "\"Half a number, plus 8, equals triple the number, minus 12.\" Which is the equation?",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "«La mitad de un número, más 8»: $\\frac{x}{2}+8$.",
            "\"Half a number, plus 8\": $\\frac{x}{2}+8$.",
          ),
          L(
            "«El triple del número, menos 12»: $3x-12$.",
            "\"Triple the number, minus 12\": $3x-12$.",
          ),
          L(
            "Únelos con el signo $=$.",
            "Join them with an $=$ sign.",
          ),
        ],
        answerDisplay: L("$\\frac{x}{2}+8=3x-12$", "$\\frac{x}{2}+8=3x-12$"),
        solution: [
          step(
            "given",
            "La frase: «la mitad de un número, más 8, es igual al triple del número, menos 12».",
            "The sentence: \"half a number, plus 8, equals triple the number, minus 12\".",
          ),
          step(
            "approach",
            "Traducir el lado izquierdo y el lado derecho por separado.",
            "Translate the left side and the right side separately.",
          ),
          step(
            "calculation",
            "Izquierda: $\\frac{x}{2}+8$. Derecha: $3x-12$. Ecuación: $\\frac{x}{2}+8 = 3x-12$.",
            "Left: $\\frac{x}{2}+8$. Right: $3x-12$. Equation: $\\frac{x}{2}+8 = 3x-12$.",
          ),
          step(
            "result",
            "$\\frac{x}{2}+8=3x-12$. Control: la ecuación se cumple en $x = 8$: $4+8 = 12$ y $24-12 = 12$ ✓.",
            "$\\frac{x}{2}+8=3x-12$. Check: the equation holds at $x = 8$: $4+8 = 12$ and $24-12 = 12$ ✓.",
          ),
        ],
      };
    },
  ),

  /* ================================================================== */
  /* ANTONIO · T5 «División de polinomios» — div-ant-1..4 (subtopic      */
  /* NUEVO polynomial-division; lo registra el integrador). Reasoning:   */
  /* multi-concept (salvo div-ant-4: definition-hunting).                */
  /* Fuente y clave: como T2.                                            */
  /* ================================================================== */

  /* T5.1 — (x³+2x²−3x+4)÷(x−1): Q = x²+3x, R = 4. Control x=2: 14. */
  template(
    {
      id: "div-ant-1",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "polynomial-division",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 150,
      tags: ["polynomial-division", "quotient"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "tutor-encargo-polinomios-2026",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "T5 · 1",
      },
      reasoning: "multi-concept",
    },
    () => ({
      skill: L("División larga: cociente y residuo", "Long division: quotient and remainder"),
      statement: L(
        "Divide $x^{3}+2x^{2}-3x+4$ entre $x-1$ (división larga). Escribe el COCIENTE. La división NO es exacta; el residuo va en la solución.",
        "Divide $x^{3}+2x^{2}-3x+4$ by $x-1$ (long division). Write the QUOTIENT. The division is NOT exact; the remainder is shown in the solution.",
      ),
      answer: {
        kind: "expression",
        accepted: ["x^2+3*x", "x^2+3*x+0"],
        variables: ["x"],
      },
      hints: [
        L(
          "Divide los primeros términos: $x^{3}/x = x^{2}$; ese es el primer sumando del cociente.",
          "Divide the leading terms: $x^{3}/x = x^{2}$; that is the first term of the quotient.",
        ),
        L(
          "Multiplica y resta: sobra $3x^{2}-3x$; el siguiente sumando del cociente es $+3x$.",
          "Multiply and subtract: $3x^{2}-3x$ remains; the next term of the quotient is $+3x$.",
        ),
        L(
          "Al final sobra $4$: cociente $x^{2}+3x$, residuo $4$.",
          "At the end $4$ remains: quotient $x^{2}+3x$, remainder $4$.",
        ),
      ],
      answerDisplay: L(
        "$Q = x^{2}+3x$, $R = 4$",
        "$Q = x^{2}+3x$, $R = 4$",
      ),
      solution: [
        step(
          "given",
          "La división $\\left(x^{3}+2x^{2}-3x+4\\right) \\div (x-1)$; se pide el cociente (la división no es exacta).",
          "The division $\\left(x^{3}+2x^{2}-3x+4\\right) \\div (x-1)$; the quotient is requested (the division is not exact).",
        ),
        step(
          "approach",
          "División larga: dividir los líderes, multiplicar, restar y bajar, hasta que el grado del resto sea menor que el del divisor.",
          "Long division: divide the leaders, multiply, subtract and bring down, until the remainder's degree is smaller than the divisor's.",
        ),
        step(
          "calculation",
          "Paso 1: $x^3/x = x^2$; $x^3+2x^2-3x+4 - x^2(x-1) = 3x^2-3x+4$.<br>Paso 2: $3x^2/x = 3x$; $3x^2-3x+4 - 3x(x-1) = 4$.<br>Grado $0 <$ grado $1$: se detiene.",
          "Step 1: $x^3/x = x^2$; $x^3+2x^2-3x+4 - x^2(x-1) = 3x^2-3x+4$.<br>Step 2: $3x^2/x = 3x$; $3x^2-3x+4 - 3x(x-1) = 4$.<br>Degree $0 <$ degree $1$: stop.",
        ),
        step(
          "result",
          "$Q = x^{2}+3x$ (con residuo $R = 4$: $P = (x-1)\\left(x^{2}+3x\\right)+4$). Control: con $x = 2$: $P(2) = 8+8-6+4 = 14$ y $(2-1)(4+6)+4 = 14$ ✓.",
          "$Q = x^{2}+3x$ (with remainder $R = 4$: $P = (x-1)\\left(x^{2}+3x\\right)+4$). Check: at $x = 2$: $P(2) = 8+8-6+4 = 14$ and $(2-1)(4+6)+4 = 14$ ✓.",
        ),
      ],
    }),
  ),

  /* T5.2 — (2x³−3x²+x−5)÷(x−2): Q = 2x²+x+3, R = 1. */
  template(
    {
      id: "div-ant-2",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "polynomial-division",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 210,
      tags: ["polynomial-division", "quotient-remainder"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "tutor-encargo-polinomios-2026",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "T5 · 2",
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$Q=2x^{2}+x+3$, $R=1$", "$Q=2x^{2}+x+3$, $R=1$"), correct: true },
        { id: "b", text: L("$Q=2x^{2}+x+3$, $R=0$", "$Q=2x^{2}+x+3$, $R=0$"), correct: false },
        { id: "c", text: L("$Q=2x^{2}-x+3$, $R=1$", "$Q=2x^{2}-x+3$, $R=1$"), correct: false },
        { id: "d", text: L("$Q=2x^{2}+x+3$, $R=-5$", "$Q=2x^{2}+x+3$, $R=-5$"), correct: false },
      ];
      return {
        skill: L("Cociente y residuo de una división", "Quotient and remainder of a division"),
        statement: L(
          "Al dividir $2x^{3}-3x^{2}+x-5$ entre $x-2$, el cociente Q y el residuo R son:",
          "When dividing $2x^{3}-3x^{2}+x-5$ by $x-2$, the quotient Q and the remainder R are:",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Divide los líderes: $2x^{3}/x = 2x^{2}$; multiplica $2x^{2}(x-2)$ y resta.",
            "Divide the leaders: $2x^{3}/x = 2x^{2}$; multiply $2x^{2}(x-2)$ and subtract.",
          ),
          L(
            "Tras el segundo paso el residuo parcial es $x^{2}+x-5$.",
            "After the second step the partial remainder is $x^{2}+x-5$.",
          ),
          L(
            "El cociente termina en $+3$ y sobra $1$ — compruébalo con el teorema del resto: $P(2) = 1$.",
            "The quotient ends with $+3$ and $1$ remains — check it with the remainder theorem: $P(2) = 1$.",
          ),
        ],
        answerDisplay: L(
          "$Q = 2x^{2}+x+3$, $R = 1$",
          "$Q = 2x^{2}+x+3$, $R = 1$",
        ),
        solution: [
          step(
            "given",
            "La división $\\left(2x^{3}-3x^{2}+x-5\\right) \\div (x-2)$; se piden el cociente y el residuo.",
            "The division $\\left(2x^{3}-3x^{2}+x-5\\right) \\div (x-2)$; the quotient and the remainder are requested.",
          ),
          step(
            "approach",
            "División larga paso a paso; el residuo se confirma con el teorema del resto ($P(2)$).",
            "Long division step by step; the remainder is confirmed with the remainder theorem ($P(2)$).",
          ),
          step(
            "calculation",
            "$2x^3/x = 2x^2$; resto parcial $x^2+x-5$.<br>$x^2/x = x$; $x^2+x-5 - x(x-2) = 3x-5$.<br>$3x/x = 3$; $3x-5 - 3(x-2) = 1$.<br>Teorema del resto: $P(2) = 16-12+2-5 = 1$.",
            "$2x^3/x = 2x^2$; partial remainder $x^2+x-5$.<br>$x^2/x = x$; $x^2+x-5 - x(x-2) = 3x-5$.<br>$3x/x = 3$; $3x-5 - 3(x-2) = 1$.<br>Remainder theorem: $P(2) = 16-12+2-5 = 1$.",
          ),
          step(
            "result",
            "$Q = 2x^{2}+x+3$ y $R = 1$, es decir $P = (x-2)Q+R$. Control: con $x = 3$: $P(3) = 54-27+3-5 = 25$ y $(3-2)(18+3+3)+1 = 25$ ✓.",
            "$Q = 2x^{2}+x+3$ and $R = 1$, that is $P = (x-2)Q+R$. Check: at $x = 3$: $P(3) = 54-27+3-5 = 25$ and $(3-2)(18+3+3)+1 = 25$ ✓.",
          ),
        ],
      };
    },
  ),

  /* T5.3 — Ruffini (x⁴−3x³+4x²−5x+3)÷(x−2): Q = x³−x²+2x−1, R = 1. */
  template(
    {
      id: "div-ant-3",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "polynomial-division",
      difficulty: "hard",
      questionType: "expression",
      estimatedTimeSec: 240,
      tags: ["polynomial-division", "synthetic-division"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "tutor-encargo-polinomios-2026",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "T5 · 3",
      },
      reasoning: "multi-concept",
    },
    () => ({
      skill: L("División sintética (Ruffini)", "Synthetic division (Ruffini)"),
      statement: L(
        "Usa la división sintética (Ruffini) para dividir $x^{4}-3x^{3}+4x^{2}-5x+3$ entre $x-2$. Escribe el COCIENTE.",
        "Use synthetic division to divide $x^{4}-3x^{3}+4x^{2}-5x+3$ by $x-2$. Write the QUOTIENT.",
      ),
      answer: {
        kind: "expression",
        accepted: ["x^3-x^2+2*x-1", "-1+2*x-x^2+x^3"],
        variables: ["x"],
      },
      hints: [
        L(
          "Coeficientes del dividendo: $1, -3, 4, -5, 3$; el divisor es $x-2$, así que se trabaja con el $2$.",
          "Coefficients of the dividend: $1, -3, 4, -5, 3$; the divisor is $x-2$, so work with the $2$.",
        ),
        L(
          "Baja el $1$, multiplica por $2$ y suma al siguiente: $-3+2 = -1$.",
          "Bring down the $1$, multiply by $2$ and add to the next one: $-3+2 = -1$.",
        ),
        L(
          "Al final sobra $1$: cociente $x^{3}-x^{2}+2x-1$, residuo $1$.",
          "At the end $1$ remains: quotient $x^{3}-x^{2}+2x-1$, remainder $1$.",
        ),
      ],
      answerDisplay: L(
        "$Q = x^{3}-x^{2}+2x-1$, $R = 1$",
        "$Q = x^{3}-x^{2}+2x-1$, $R = 1$",
      ),
      solution: [
        step(
          "given",
          "La división $\\left(x^{4}-3x^{3}+4x^{2}-5x+3\\right) \\div (x-2)$ por Ruffini.",
          "The division $\\left(x^{4}-3x^{3}+4x^{2}-5x+3\\right) \\div (x-2)$ by synthetic division.",
        ),
        step(
          "approach",
          "Con el divisor $x-2$ se trabaja con el $2$: bajar, multiplicar, sumar, coeficiente a coeficiente.",
          "With the divisor $x-2$ you work with the $2$: bring down, multiply, add, coefficient by coefficient.",
        ),
        step(
          "calculation",
          "Coeficientes $1, -3, 4, -5, 3$ con el $2$:<br>$1$; $-3+2\\cdot 1 = -1$; $4+2\\cdot(-1) = 2$; $-5+2\\cdot 2 = -1$; $3+2\\cdot(-1) = 1$.<br>Cociente: $x^{3}-x^{2}+2x-1$; residuo: $1$.",
          "Coefficients $1, -3, 4, -5, 3$ with the $2$:<br>$1$; $-3+2\\cdot 1 = -1$; $4+2\\cdot(-1) = 2$; $-5+2\\cdot 2 = -1$; $3+2\\cdot(-1) = 1$.<br>Quotient: $x^{3}-x^{2}+2x-1$; remainder: $1$.",
        ),
        step(
          "result",
          "$Q = x^{3}-x^{2}+2x-1$ (residuo $1$: $P = (x-2)Q+1$). Control: con $x = 3$: $P(3) = 81-81+36-15+3 = 24$ y $(3-2)(27-9+6-1)+1 = 24$ ✓.",
          "$Q = x^{3}-x^{2}+2x-1$ (remainder $1$: $P = (x-2)Q+1$). Check: at $x = 3$: $P(3) = 81-81+36-15+3 = 24$ and $(3-2)(27-9+6-1)+1 = 24$ ✓.",
        ),
      ],
    }),
  ),

  /* T5.4 — teorema del resto: P(3) = 31. */
  template(
    {
      id: "div-ant-4",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "polynomial-division",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 270,
      tags: ["polynomial-division", "remainder-theorem"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "tutor-encargo-polinomios-2026",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "T5 · 4",
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L("Teorema del resto", "Remainder theorem"),
      statement: L(
        "Sin dividir, usando el teorema del resto: ¿cuál es el residuo de dividir $x^{3}+2x^{2}-5x+1$ entre $x-3$?",
        "Without dividing, using the remainder theorem: what is the remainder of dividing $x^{3}+2x^{2}-5x+1$ by $x-3$?",
      ),
      answer: {
        kind: "numeric",
        value: 31,
        tolerance: { mode: "absolute", value: 0.02 },
      },
      hints: [
        L(
          "El residuo de dividir $P(x)$ entre $x-a$ es $P(a)$.",
          "The remainder of dividing $P(x)$ by $x-a$ is $P(a)$.",
        ),
        L(
          "Aquí $a = 3$: evalúa $P(3)$ sin dividir.",
          "Here $a = 3$: evaluate $P(3)$ without dividing.",
        ),
        L(
          "$27+18-15+1$.",
          "$27+18-15+1$.",
        ),
      ],
      answerDisplay: L(
        "$R = P(3) = 31$",
        "$R = P(3) = 31$",
      ),
      solution: [
        step(
          "given",
          "La división $\\left(x^{3}+2x^{2}-5x+1\\right) \\div (x-3)$; se pide solo el residuo, sin dividir.",
          "The division $\\left(x^{3}+2x^{2}-5x+1\\right) \\div (x-3)$; only the remainder is requested, without dividing.",
        ),
        step(
          "approach",
          "Teorema del resto: el residuo de dividir entre $x-a$ es $P(a)$; aquí $a = 3$.",
          "Remainder theorem: the remainder of dividing by $x-a$ is $P(a)$; here $a = 3$.",
        ),
        step(
          "calculation",
          "$P(3) = 3^{3}+2\\cdot 3^{2}-5\\cdot 3+1 = 27+18-15+1 = 31$.",
          "$P(3) = 3^{3}+2\\cdot 3^{2}-5\\cdot 3+1 = 27+18-15+1 = 31$.",
        ),
        step(
          "result",
          "El residuo es $31$ (dividir en serio daría lo mismo). Control: $P = (x-3)\\left(x^{2}+5x+10\\right)+31$ y con $x = 4$: $64+32-20+1 = 77$ y $1\\cdot(16+20+10)+31 = 77$ ✓.",
          "The remainder is $31$ (actually dividing would give the same). Check: $P = (x-3)\\left(x^{2}+5x+10\\right)+31$ and at $x = 4$: $64+32-20+1 = 77$ and $1\\cdot(16+20+10)+31 = 77$ ✓.",
        ),
      ],
    }),
  ),

  /* ================================================================== */
  /* ANTONIO · T7 «Triángulo de Pascal» — pas-ant-1..5 (subtopic NUEVO   */
  /* pascal-triangle; lo registra el integrador). Fuente y clave: T2.    */
  /* ================================================================== */

  /* T7.1 — la fila 1 5 10 10 5 1 suma 32 = 2⁵. */
  template(
    {
      id: "pas-ant-1",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "pascal-triangle",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 90,
      tags: ["pascal-triangle", "row-sum"],
      prerequisites: ["special-products"],
      source: {
        sourceId: "tutor-encargo-polinomios-2026",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "T7 · 1",
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L("Suma de una fila del triángulo de Pascal", "Sum of a row of Pascal's triangle"),
      statement: L(
        "La fila $1\\;5\\;10\\;10\\;5\\;1$ del triángulo de Pascal: ¿cuánto suman sus términos?",
        "The row $1\\;5\\;10\\;10\\;5\\;1$ of Pascal's triangle: what do its numbers add up to?",
      ),
      answer: { kind: "numeric", value: 32 },
      hints: [
        L(
          "Cada fila del triángulo suma el doble que la anterior.",
          "Each row of the triangle adds up to twice the previous one.",
        ),
        L(
          "Las sumas de las filas van $1, 2, 4, 8, 16, \\ldots$",
          "The row sums go $1, 2, 4, 8, 16, \\ldots$",
        ),
        L(
          "Esta fila es la 5ª: su suma es $2^{5}$.",
          "This row is the 5th one: its sum is $2^{5}$.",
        ),
      ],
      answerDisplay: L(
        "$1+5+10+10+5+1 = 32 = 2^{5}$",
        "$1+5+10+10+5+1 = 32 = 2^{5}$",
      ),
      solution: [
        step(
          "given",
          "La fila $1\\;5\\;10\\;10\\;5\\;1$ del triángulo de Pascal (es la fila 5).",
          "The row $1\\;5\\;10\\;10\\;5\\;1$ of Pascal's triangle (it is row 5).",
        ),
        step(
          "approach",
          "Sumar los seis términos directamente, o usar la regla de potencias de 2.",
          "Add the six numbers directly, or use the powers-of-2 rule.",
        ),
        step(
          "calculation",
          "$1+5+10+10+5+1 = 32$; además la fila $n$ suma $2^{n}$ y $2^{5} = 32$.",
          "$1+5+10+10+5+1 = 32$; moreover row $n$ adds up to $2^{n}$ and $2^{5} = 32$.",
        ),
        step(
          "result",
          "La suma es $32$. Control: $2^{5} = 32$ coincide con la suma directa $1+5+10+10+5+1$ ✓.",
          "The sum is $32$. Check: $2^{5} = 32$ matches the direct sum $1+5+10+10+5+1$ ✓.",
        ),
      ],
    }),
  ),

  /* T7.2 — fila siguiente a 1 3 3 1: 1 4 6 4 1. */
  template(
    {
      id: "pas-ant-2",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "pascal-triangle",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["pascal-triangle", "next-row"],
      prerequisites: ["special-products"],
      source: {
        sourceId: "tutor-encargo-polinomios-2026",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "T7 · 2",
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$1\\;4\\;6\\;4\\;1$", "$1\\;4\\;6\\;4\\;1$"), correct: true },
        { id: "b", text: L("$1\\;4\\;4\\;4\\;1$", "$1\\;4\\;4\\;4\\;1$"), correct: false },
        { id: "c", text: L("$1\\;5\\;10\\;10\\;5\\;1$", "$1\\;5\\;10\\;10\\;5\\;1$"), correct: false },
        { id: "d", text: L("$1\\;3\\;6\\;4\\;1$", "$1\\;3\\;6\\;4\\;1$"), correct: false },
      ];
      return {
        skill: L("Fila siguiente del triángulo de Pascal", "Next row of Pascal's triangle"),
        statement: L(
          "El triángulo de Pascal empieza $1$; $1\\;1$; $1\\;2\\;1$; $1\\;3\\;3\\;1$. ¿Cuál es la fila siguiente?",
          "Pascal's triangle starts $1$; $1\\;1$; $1\\;2\\;1$; $1\\;3\\;3\\;1$. Which is the next row?",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Cada número es la suma de los dos que tiene encima.",
            "Each number is the sum of the two above it.",
          ),
          L(
            "Los interiores: $1+3 = 4$, $3+3 = 6$, $3+1 = 4$.",
            "The inner ones: $1+3 = 4$, $3+3 = 6$, $3+1 = 4$.",
          ),
          L(
            "Los bordes son siempre $1$.",
            "The edges are always $1$.",
          ),
        ],
        answerDisplay: L(
          "La fila siguiente es $1\\;4\\;6\\;4\\;1$",
          "The next row is $1\\;4\\;6\\;4\\;1$",
        ),
        solution: [
          step(
            "given",
            "Las primeras filas: $1$; $1\\;1$; $1\\;2\\;1$; $1\\;3\\;3\\;1$.",
            "The first rows: $1$; $1\\;1$; $1\\;2\\;1$; $1\\;3\\;3\\;1$.",
          ),
          step(
            "approach",
            "Construir la fila 5 sumando los pares adyacentes de la fila $1\\;3\\;3\\;1$.",
            "Build row 5 by adding adjacent pairs of the row $1\\;3\\;3\\;1$.",
          ),
          step(
            "calculation",
            "Bordes: $1$ y $1$. Interiores: $1+3 = 4$; $3+3 = 6$; $3+1 = 4$.",
            "Edges: $1$ and $1$. Inner ones: $1+3 = 4$; $3+3 = 6$; $3+1 = 4$.",
          ),
          step(
            "result",
            "La fila siguiente es $1\\;4\\;6\\;4\\;1$. Control: suma $1+4+6+4+1 = 16 = 2^{4}$ (el doble de la fila anterior, $8$) ✓.",
            "The next row is $1\\;4\\;6\\;4\\;1$. Check: it adds up to $1+4+6+4+1 = 16 = 2^{4}$ (twice the previous row, $8$) ✓.",
          ),
        ],
      };
    },
  ),

  /* T7.3 — coeficiente de a³b⁴ en (a+b)⁷: C(7,4) = 35. */
  template(
    {
      id: "pas-ant-3",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "pascal-triangle",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 150,
      tags: ["pascal-triangle", "binomial-coefficient"],
      prerequisites: ["special-products"],
      source: {
        sourceId: "tutor-encargo-polinomios-2026",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "T7 · 3",
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L("Coeficiente binomial en el triángulo", "Binomial coefficient in the triangle"),
      statement: L(
        "¿Cuál es el coeficiente de $a^{3}b^{4}$ en el desarrollo de $(a+b)^{7}$?",
        "What is the coefficient of $a^{3}b^{4}$ in the expansion of $(a+b)^{7}$?",
      ),
      answer: { kind: "numeric", value: 35 },
      hints: [
        L(
          "El coeficiente es $C(7,k)$ con $k$ el exponente de $b$.",
          "The coefficient is $C(7,k)$ with $k$ the exponent of $b$.",
        ),
        L(
          "Aquí $k = 4$: se necesita $C(7,4)$.",
          "Here $k = 4$: you need $C(7,4)$.",
        ),
        L(
          "$C(7,4) = C(7,3) = 35$.",
          "$C(7,4) = C(7,3) = 35$.",
        ),
      ],
      answerDisplay: L(
        "El coeficiente de $a^{3}b^{4}$ es $35$",
        "The coefficient of $a^{3}b^{4}$ is $35$",
      ),
      solution: [
        step(
          "given",
          "El binomio $(a+b)^{7}$; se busca el coeficiente del término $a^{3}b^{4}$.",
          "The binomial $(a+b)^{7}$; the coefficient of the term $a^{3}b^{4}$ is sought.",
        ),
        step(
          "approach",
          "El término con $b^{k}$ lleva el coeficiente $C(7,k)$ de la fila 7 del triángulo.",
          "The term with $b^{k}$ carries the coefficient $C(7,k)$ from row 7 of the triangle.",
        ),
        step(
          "calculation",
          "Con $k = 4$: $C(7,4) = \\frac{7!}{4!\\,3!} = \\frac{7\\cdot 6\\cdot 5}{3\\cdot 2\\cdot 1} = 35$.",
          "With $k = 4$: $C(7,4) = \\frac{7!}{4!\\,3!} = \\frac{7\\cdot 6\\cdot 5}{3\\cdot 2\\cdot 1} = 35$.",
        ),
        step(
          "result",
          "El coeficiente es $35$. Control: por la simetría de la fila 7, $C(7,4) = C(7,3) = 35$ ✓.",
          "The coefficient is $35$. Check: by the symmetry of row 7, $C(7,4) = C(7,3) = 35$ ✓.",
        ),
      ],
    }),
  ),

  /* T7.4 — tercer número de la fila 10: C(10,2) = 45. */
  template(
    {
      id: "pas-ant-4",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "pascal-triangle",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 210,
      tags: ["pascal-triangle", "position"],
      prerequisites: ["special-products"],
      source: {
        sourceId: "tutor-encargo-polinomios-2026",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "T7 · 4",
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$45$", "$45$"), correct: true },
        { id: "b", text: L("$10$", "$10$"), correct: false },
        { id: "c", text: L("$120$", "$120$"), correct: false },
        { id: "d", text: L("$36$", "$36$"), correct: false },
      ];
      return {
        skill: L("Posición dentro de una fila", "Position within a row"),
        statement: L(
          "La fila 10 del triángulo de Pascal empieza $1\\;10\\;45\\;120\\;\\ldots$ ¿Cuál es el TERCER número de esa fila (contando el 1 inicial como el primero)?",
          "Row 10 of Pascal's triangle starts $1\\;10\\;45\\;120\\;\\ldots$ What is the THIRD number of that row (counting the initial 1 as the first)?",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "La fila 10 es $1,\\;10,\\;45,\\;120,\\;210,\\;\\ldots$",
            "Row 10 is $1,\\;10,\\;45,\\;120,\\;210,\\;\\ldots$",
          ),
          L(
            "El tercer número (contando el $1$ inicial) es $C(10,2)$.",
            "The third number (counting the initial $1$) is $C(10,2)$.",
          ),
          L(
            "$C(10,2) = 45$.",
            "$C(10,2) = 45$.",
          ),
        ],
        answerDisplay: L(
          "El tercer número de la fila 10 es $45$",
          "The third number of row 10 is $45$",
        ),
        solution: [
          step(
            "given",
            "La fila 10 del triángulo de Pascal, que empieza $1\\;10\\;45\\;120\\;\\ldots$; se pide su TERCER número.",
            "Row 10 of Pascal's triangle, which starts $1\\;10\\;45\\;120\\;\\ldots$; its THIRD number is requested.",
          ),
          step(
            "approach",
            "Los números de la fila $n$ son $C(n,0), C(n,1), C(n,2), \\ldots$ — el tercero es $C(10,2)$.",
            "The numbers of row $n$ are $C(n,0), C(n,1), C(n,2), \\ldots$ — the third one is $C(10,2)$.",
          ),
          step(
            "calculation",
            "$C(10,2) = \\frac{10\\cdot 9}{2} = 45$.",
            "$C(10,2) = \\frac{10\\cdot 9}{2} = 45$.",
          ),
          step(
            "result",
            "El tercer número es $45$. Control: en la fila 9, $9+36 = 45$ — cada número es la suma de los dos de encima ✓.",
            "The third number is $45$. Check: in row 9, $9+36 = 45$ — each number is the sum of the two above it ✓.",
          ),
        ],
      };
    },
  ),

  /* T7.5 — suma de las filas 0..4: 2⁵−1 = 31. */
  template(
    {
      id: "pas-ant-5",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "pascal-triangle",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 240,
      tags: ["pascal-triangle", "row-sum"],
      prerequisites: ["special-products"],
      source: {
        sourceId: "tutor-encargo-polinomios-2026",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "T7 · 5",
      },
      reasoning: "multi-concept",
    },
    () => ({
      skill: L("Suma de varias filas del triángulo", "Sum of several rows of the triangle"),
      statement: L(
        "¿Cuánto suman TODOS los números de las filas 0 a 4 del triángulo de Pascal (la fila 0 es solo $1$)?",
        "What do ALL the numbers of rows 0 through 4 of Pascal's triangle add up to (row 0 is just $1$)?",
      ),
      answer: { kind: "numeric", value: 31 },
      hints: [
        L(
          "La fila $n$ suma $2^{n}$.",
          "Row $n$ adds up to $2^{n}$.",
        ),
        L(
          "Hay que sumar $2^{0}+2^{1}+2^{2}+2^{3}+2^{4}$.",
          "You must add $2^{0}+2^{1}+2^{2}+2^{3}+2^{4}$.",
        ),
        L(
          "$1+2+4+8+16 = 31 = 2^{5}-1$.",
          "$1+2+4+8+16 = 31 = 2^{5}-1$.",
        ),
      ],
      answerDisplay: L(
        "$1+2+4+8+16 = 31$",
        "$1+2+4+8+16 = 31$",
      ),
      solution: [
        step(
          "given",
          "Las filas 0 a 4 del triángulo de Pascal: $1$; $1\\;1$; $1\\;2\\;1$; $1\\;3\\;3\\;1$; $1\\;4\\;6\\;4\\;1$.",
          "Rows 0 through 4 of Pascal's triangle: $1$; $1\\;1$; $1\\;2\\;1$; $1\\;3\\;3\\;1$; $1\\;4\\;6\\;4\\;1$.",
        ),
        step(
          "approach",
          "Cada fila $n$ suma $2^{n}$; basta sumar las cinco potencias.",
          "Each row $n$ adds up to $2^{n}$; just add the five powers.",
        ),
        step(
          "calculation",
          "$2^{0}+2^{1}+2^{2}+2^{3}+2^{4} = 1+2+4+8+16 = 31$.",
          "$2^{0}+2^{1}+2^{2}+2^{3}+2^{4} = 1+2+4+8+16 = 31$.",
        ),
        step(
          "result",
          "La suma total es $31$. Control: la suma geométrica da $2^{5}-1 = 31$ ✓.",
          "The total is $31$. Check: the geometric sum gives $2^{5}-1 = 31$ ✓.",
        ),
      ],
    }),
  ),

  /* ================================================================== */
  /* ANTONIO · T8 «Términos de un desarrollo» — tmr-ant-1..6 (subtopic   */
  /* NUEVO development-terms; lo registra el integrador). Fuente y       */
  /* clave: como T2.                                                     */
  /* ================================================================== */

  /* T8.1 — (x+5)⁷ tiene 8 términos. */
  template(
    {
      id: "tmr-ant-1",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "development-terms",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 75,
      tags: ["development-terms", "count"],
      prerequisites: ["special-products"],
      source: {
        sourceId: "tutor-encargo-polinomios-2026",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "T8 · 1",
      },
    },
    () => ({
      skill: L("Número de términos de un desarrollo", "Number of terms of an expansion"),
      statement: L(
        "¿Cuántos términos tiene el desarrollo de $(x+5)^{7}$?",
        "How many terms does the expansion of $(x+5)^{7}$ have?",
      ),
      answer: { kind: "numeric", value: 8 },
      hints: [
        L(
          "$(a+b)^{n}$ se desarrolla con $n+1$ términos.",
          "$(a+b)^{n}$ expands into $n+1$ terms.",
        ),
        L(
          "Aquí $n = 7$.",
          "Here $n = 7$.",
        ),
        L(
          "$7+1 = 8$.",
          "$7+1 = 8$.",
        ),
      ],
      answerDisplay: L(
        "$(x+5)^{7}$ tiene $8$ términos",
        "$(x+5)^{7}$ has $8$ terms",
      ),
      solution: [
        step(
          "given",
          "El binomio $(x+5)^{7}$.",
          "The binomial $(x+5)^{7}$.",
        ),
        step(
          "approach",
          "En el desarrollo de $(a+b)^{n}$ los exponentes de $a$ bajan de $n$ a $0$: son $n+1$ términos.",
          "In the expansion of $(a+b)^{n}$ the exponents of $a$ step down from $n$ to $0$: that is $n+1$ terms.",
        ),
        step(
          "calculation",
          "Los exponentes de $x$ bajan $7, 6, 5, 4, 3, 2, 1, 0$: son $8$ valores.",
          "The exponents of $x$ step down $7, 6, 5, 4, 3, 2, 1, 0$: that is $8$ values.",
        ),
        step(
          "result",
          "$8$ términos. Control: $n+1 = 7+1 = 8$ ✓.",
          "$8$ terms. Check: $n+1 = 7+1 = 8$ ✓.",
        ),
      ],
    }),
  ),

  /* T8.2 — primer término de (2x−3)⁵: 32x⁵. */
  template(
    {
      id: "tmr-ant-2",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "development-terms",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 90,
      tags: ["development-terms", "first-term"],
      prerequisites: ["special-products"],
      source: {
        sourceId: "tutor-encargo-polinomios-2026",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "T8 · 2",
      },
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$32x^{5}$", "$32x^{5}$"), correct: true },
        { id: "b", text: L("$2x^{5}$", "$2x^{5}$"), correct: false },
        { id: "c", text: L("$x^{5}$", "$x^{5}$"), correct: false },
        { id: "d", text: L("$-32x^{5}$", "$-32x^{5}$"), correct: false },
      ];
      return {
        skill: L("Primer término de un desarrollo", "First term of an expansion"),
        statement: L(
          "¿Cuál es el PRIMER término del desarrollo de $(2x-3)^{5}$?",
          "What is the FIRST term of the expansion of $(2x-3)^{5}$?",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El primer término es $\\left(\\text{primer sumando}\\right)^{n}$.",
            "The first term is $\\left(\\text{first addend}\\right)^{n}$.",
          ),
          L(
            "Aquí: $(2x)^{5}$.",
            "Here: $(2x)^{5}$.",
          ),
          L(
            "$2^{5} = 32$.",
            "$2^{5} = 32$.",
          ),
        ],
        answerDisplay: L(
          "El primer término es $32x^{5}$",
          "The first term is $32x^{5}$",
        ),
        solution: [
          step(
            "given",
            "El binomio $(2x-3)^{5}$; se pide el primer término del desarrollo.",
            "The binomial $(2x-3)^{5}$; the first term of the expansion is requested.",
          ),
          step(
            "approach",
            "El primer término del desarrollo de $(a+b)^{n}$ es $a^{n}$; aquí $a = 2x$.",
            "The first term of the expansion of $(a+b)^{n}$ is $a^{n}$; here $a = 2x$.",
          ),
          step(
            "calculation",
            "$(2x)^{5} = 2^{5}x^{5} = 32x^{5}$.",
            "$(2x)^{5} = 2^{5}x^{5} = 32x^{5}$.",
          ),
          step(
            "result",
            "El primer término es $32x^{5}$ (positivo: el $-3$ NO interviene en este término). Control: el desarrollo completo es $32x^{5}-240x^{4}+720x^{3}-1080x^{2}+810x-243$ y con $x = 1$: $32-240+720-1080+810-243 = -1 = (2-3)^{5}$ ✓.",
            "The first term is $32x^{5}$ (positive: the $-3$ does NOT appear in this term). Check: the full expansion is $32x^{5}-240x^{4}+720x^{3}-1080x^{2}+810x-243$ and at $x = 1$: $32-240+720-1080+810-243 = -1 = (2-3)^{5}$ ✓.",
          ),
        ],
      };
    },
  ),

  /* T8.3 — último término de (x−4)⁶: (−4)⁶ = 4096. */
  template(
    {
      id: "tmr-ant-3",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "development-terms",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["development-terms", "last-term"],
      prerequisites: ["special-products"],
      source: {
        sourceId: "tutor-encargo-polinomios-2026",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "T8 · 3",
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$4096$", "$4096$"), correct: true },
        { id: "b", text: L("$-4096$", "$-4096$"), correct: false },
        { id: "c", text: L("$1024$", "$1024$"), correct: false },
        { id: "d", text: L("$24$", "$24$"), correct: false },
      ];
      return {
        skill: L("Último término de un desarrollo", "Last term of an expansion"),
        statement: L(
          "¿Cuál es el ÚLTIMO término del desarrollo de $(x-4)^{6}$?",
          "What is the LAST term of the expansion of $(x-4)^{6}$?",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El último término es $(-4)^{6}$.",
            "The last term is $(-4)^{6}$.",
          ),
          L(
            "Exponente par $\\Rightarrow$ positivo.",
            "Even exponent $\\Rightarrow$ positive.",
          ),
          L(
            "$4^{6} = 4096$.",
            "$4^{6} = 4096$.",
          ),
        ],
        answerDisplay: L(
          "El último término es $4096$",
          "The last term is $4096$",
        ),
        solution: [
          step(
            "given",
            "El binomio $(x-4)^{6}$; se pide el último término del desarrollo.",
            "The binomial $(x-4)^{6}$; the last term of the expansion is requested.",
          ),
          step(
            "approach",
            "El último término del desarrollo de $(a+b)^{n}$ es $b^{n}$; aquí $b = -4$.",
            "The last term of the expansion of $(a+b)^{n}$ is $b^{n}$; here $b = -4$.",
          ),
          step(
            "calculation",
            "$(-4)^{6} = 4^{6} = 4096$ (exponente par: el signo desaparece).",
            "$(-4)^{6} = 4^{6} = 4096$ (even exponent: the sign disappears).",
          ),
          step(
            "result",
            "El último término es $4096$. Control: el desarrollo completo es $x^{6}-24x^{5}+240x^{4}-1280x^{3}+3840x^{2}-6144x+4096$ y con $x = 1$: $1-24+240-1280+3840-6144+4096 = 729 = (1-4)^{6}$ ✓.",
            "The last term is $4096$. Check: the full expansion is $x^{6}-24x^{5}+240x^{4}-1280x^{3}+3840x^{2}-6144x+4096$ and at $x = 1$: $1-24+240-1280+3840-6144+4096 = 729 = (1-4)^{6}$ ✓.",
          ),
        ],
      };
    },
  ),

  /* T8.4 — segundo término de (x+3)⁵: 15x⁴. */
  template(
    {
      id: "tmr-ant-4",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "development-terms",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 150,
      tags: ["development-terms", "second-term"],
      prerequisites: ["special-products"],
      source: {
        sourceId: "tutor-encargo-polinomios-2026",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "T8 · 4",
      },
    },
    () => ({
      skill: L("Segundo término de un desarrollo", "Second term of an expansion"),
      statement: L(
        "¿Cuál es el SEGUNDO término del desarrollo de $(x+3)^{5}$?",
        "What is the SECOND term of the expansion of $(x+3)^{5}$?",
      ),
      answer: {
        kind: "expression",
        accepted: ["15*x^4"],
        variables: ["x"],
      },
      hints: [
        L(
          "El término $k+1$ del desarrollo es $C(n,k)\\,a^{\\,n-k}b^{k}$.",
          "The $k+1$-th term of the expansion is $C(n,k)\\,a^{\\,n-k}b^{k}$.",
        ),
        L(
          "El segundo es $C(5,1)\\,x^{4}\\cdot 3$.",
          "The second one is $C(5,1)\\,x^{4}\\cdot 3$.",
        ),
        L(
          "$5\\cdot 3 = 15$.",
          "$5\\cdot 3 = 15$.",
        ),
      ],
      answerDisplay: L(
        "El segundo término es $15x^{4}$",
        "The second term is $15x^{4}$",
      ),
      solution: [
        step(
          "given",
          "El binomio $(x+3)^{5}$; se pide el segundo término del desarrollo.",
          "The binomial $(x+3)^{5}$; the second term of the expansion is requested.",
        ),
        step(
          "approach",
          "Término general $C(5,k)\\,x^{\\,5-k}\\,3^{k}$; el segundo término corresponde a $k = 1$.",
          "General term $C(5,k)\\,x^{\\,5-k}\\,3^{k}$; the second term corresponds to $k = 1$.",
        ),
        step(
          "calculation",
          "$C(5,1)\\,x^{4}\\cdot 3^{1} = 5\\cdot 3\\,x^{4} = 15x^{4}$.",
          "$C(5,1)\\,x^{4}\\cdot 3^{1} = 5\\cdot 3\\,x^{4} = 15x^{4}$.",
        ),
        step(
          "result",
          "El segundo término es $15x^{4}$. Control: el desarrollo completo es $x^{5}+15x^{4}+90x^{3}+270x^{2}+405x+243$ y con $x = 1$: $1+15+90+270+405+243 = 1024 = 4^{5}$ ✓.",
          "The second term is $15x^{4}$. Check: the full expansion is $x^{5}+15x^{4}+90x^{3}+270x^{2}+405x+243$ and at $x = 1$: $1+15+90+270+405+243 = 1024 = 4^{5}$ ✓.",
        ),
      ],
    }),
  ),

  /* T8.5 — cuarto término de (x²−2)⁹: −672x¹². */
  template(
    {
      id: "tmr-ant-5",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "development-terms",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["development-terms", "general-term"],
      prerequisites: ["special-products"],
      source: {
        sourceId: "tutor-encargo-polinomios-2026",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "T8 · 5",
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$-672x^{12}$", "$-672x^{12}$"), correct: true },
        { id: "b", text: L("$+672x^{12}$", "$+672x^{12}$"), correct: false },
        { id: "c", text: L("$-84x^{12}$", "$-84x^{12}$"), correct: false },
        { id: "d", text: L("$-672x^{9}$", "$-672x^{9}$"), correct: false },
      ];
      return {
        skill: L("Término general de un desarrollo", "General term of an expansion"),
        statement: L(
          "En el desarrollo de $(x^{2}-2)^{9}$, ¿cuál es el CUARTO término?",
          "In the expansion of $(x^{2}-2)^{9}$, what is the FOURTH term?",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El cuarto término corresponde a $k = 3$: $C(9,3)\\left(x^{2}\\right)^{6}(-2)^{3}$.",
            "The fourth term corresponds to $k = 3$: $C(9,3)\\left(x^{2}\\right)^{6}(-2)^{3}$.",
          ),
          L(
            "$C(9,3) = 84$ y $(-2)^{3} = -8$.",
            "$C(9,3) = 84$ and $(-2)^{3} = -8$.",
          ),
          L(
            "$\\left(x^{2}\\right)^{6} = x^{12}$ — el exponente se multiplica, no se hereda el $9$.",
            "$\\left(x^{2}\\right)^{6} = x^{12}$ — the exponent multiplies; the $9$ is not inherited.",
          ),
        ],
        answerDisplay: L(
          "El cuarto término es $-672x^{12}$",
          "The fourth term is $-672x^{12}$",
        ),
        solution: [
          step(
            "given",
            "El binomio $\\left(x^{2}-2\\right)^{9}$; se pide el cuarto término del desarrollo.",
            "The binomial $\\left(x^{2}-2\\right)^{9}$; the fourth term of the expansion is requested.",
          ),
          step(
            "approach",
            "Término general $C(9,k)\\left(x^{2}\\right)^{\\,9-k}(-2)^{k}$; el cuarto término es $k = 3$.",
            "General term $C(9,k)\\left(x^{2}\\right)^{\\,9-k}(-2)^{k}$; the fourth term is $k = 3$.",
          ),
          step(
            "calculation",
            "$C(9,3)\\left(x^{2}\\right)^{6}(-2)^{3} = 84\\cdot x^{12}\\cdot(-8) = -672x^{12}$.",
            "$C(9,3)\\left(x^{2}\\right)^{6}(-2)^{3} = 84\\cdot x^{12}\\cdot(-8) = -672x^{12}$.",
          ),
          step(
            "result",
            "El cuarto término es $-672x^{12}$. Control: $C(9,3) = \\frac{9\\cdot 8\\cdot 7}{3\\cdot 2\\cdot 1} = 84$, $84\\cdot 8 = 672$ y el signo es el de $(-2)^{3} < 0$ ✓.",
            "The fourth term is $-672x^{12}$. Check: $C(9,3) = \\frac{9\\cdot 8\\cdot 7}{3\\cdot 2\\cdot 1} = 84$, $84\\cdot 8 = 672$ and the sign is that of $(-2)^{3} < 0$ ✓.",
          ),
        ],
      };
    },
  ),

  /* T8.6 — término independiente de (x+2)⁵: 2⁵ = 32. */
  template(
    {
      id: "tmr-ant-6",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "development-terms",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 210,
      tags: ["development-terms", "independent-term"],
      prerequisites: ["special-products"],
      source: {
        sourceId: "tutor-encargo-polinomios-2026",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "T8 · 6",
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L("Término independiente de un desarrollo", "Constant term of an expansion"),
      statement: L(
        "¿Cuál es el término independiente (el que no lleva $x$) del desarrollo de $(x+2)^{5}$?",
        "What is the constant term (the one without $x$) in the expansion of $(x+2)^{5}$?",
      ),
      answer: { kind: "numeric", value: 32 },
      hints: [
        L(
          "El término independiente es el último: $b^{n}$.",
          "The constant term is the last one: $b^{n}$.",
        ),
        L(
          "Aquí $b = 2$.",
          "Here $b = 2$.",
        ),
        L(
          "$2^{5} = 32$.",
          "$2^{5} = 32$.",
        ),
      ],
      answerDisplay: L(
        "El término independiente es $32$",
        "The constant term is $32$",
      ),
      solution: [
        step(
          "given",
          "El binomio $(x+2)^{5}$; se busca el término sin $x$.",
          "The binomial $(x+2)^{5}$; the term without $x$ is sought.",
        ),
        step(
          "approach",
          "En $(a+b)^{n}$ el único término sin $a$ es $b^{n}$ (el último).",
          "In $(a+b)^{n}$ the only term without $a$ is $b^{n}$ (the last one).",
        ),
        step(
          "calculation",
          "$b^{n} = 2^{5} = 32$.",
          "$b^{n} = 2^{5} = 32$.",
        ),
        step(
          "result",
          "El término independiente es $32$. Control: el desarrollo completo es $x^{5}+10x^{4}+40x^{3}+80x^{2}+80x+32$ y con $x = 0$ queda exactamente $32$ ✓.",
          "The constant term is $32$. Check: the full expansion is $x^{5}+10x^{4}+40x^{3}+80x^{2}+80x+32$ and at $x = 0$ exactly $32$ remains ✓.",
        ),
      ],
    }),
  ),

  /* ================================================================== */
  /* ANTONIO · T9 «Patrones algebraicos» — pat-ant-1..5 (subtopic NUEVO  */
  /* algebraic-patterns; lo registra el integrador). Fuente y clave: T2. */
  /* ================================================================== */

  /* T9.1 — 2,6,12,20,30 → 42 (diferencias 4,6,8,10 → 12). */
  template(
    {
      id: "pat-ant-1",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "algebraic-patterns",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 90,
      tags: ["algebraic-patterns", "sequence"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "tutor-encargo-polinomios-2026",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "T9 · 1",
      },
    },
    () => ({
      skill: L("Patrón de diferencias crecientes", "Pattern of growing differences"),
      statement: L(
        "Observa el patrón: $2,\\;6,\\;12,\\;20,\\;30,\\;\\ldots$ ¿Qué número sigue?",
        "Look at the pattern: $2,\\;6,\\;12,\\;20,\\;30,\\;\\ldots$ What comes next?",
      ),
      answer: { kind: "numeric", value: 42 },
      hints: [
        L(
          "Mira las DIFERENCIAS entre términos consecutivos: $4, 6, 8, 10$.",
          "Look at the DIFFERENCES between consecutive terms: $4, 6, 8, 10$.",
        ),
        L(
          "La siguiente diferencia es $12$.",
          "The next difference is $12$.",
        ),
        L(
          "$30+12 = 42$.",
          "$30+12 = 42$.",
        ),
      ],
      answerDisplay: L(
        "$2,\\;6,\\;12,\\;20,\\;30,\\;42$",
        "$2,\\;6,\\;12,\\;20,\\;30,\\;42$",
      ),
      solution: [
        step(
          "given",
          "La sucesión $2,\\;6,\\;12,\\;20,\\;30,\\;\\ldots$",
          "The sequence $2,\\;6,\\;12,\\;20,\\;30,\\;\\ldots$",
        ),
        step(
          "approach",
          "Analizar las diferencias entre términos consecutivos.",
          "Analyze the differences between consecutive terms.",
        ),
        step(
          "calculation",
          "$6-2 = 4$; $12-6 = 6$; $20-12 = 8$; $30-20 = 10$. Las diferencias suben de 2 en 2: la siguiente es $12$.",
          "$6-2 = 4$; $12-6 = 6$; $20-12 = 8$; $30-20 = 10$. The differences grow by 2: the next one is $12$.",
        ),
        step(
          "result",
          "El siguiente número es $42$. Control: el patrón es $n^{2}+n$ y $6^{2}+6 = 42$ ✓.",
          "The next number is $42$. Check: the pattern is $n^{2}+n$ and $6^{2}+6 = 42$ ✓.",
        ),
      ],
    }),
  ),

  /* T9.2 — exponentes de (x+1)⁴: bajan de 1 en 1 de 4 a 0. */
  template(
    {
      id: "pat-ant-2",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "algebraic-patterns",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["algebraic-patterns", "exponents"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "tutor-encargo-polinomios-2026",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "T9 · 2",
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L("Disminuyen de uno en uno, desde 4 hasta 0", "They decrease by one at a time, from 4 down to 0"),
          correct: true,
        },
        {
          id: "b",
          text: L("Aumentan de uno en uno", "They increase by one at a time"),
          correct: false,
        },
        {
          id: "c",
          text: L("Disminuyen de dos en dos", "They decrease by two at a time"),
          correct: false,
        },
        {
          id: "d",
          text: L("Son iguales a los coeficientes", "They equal the coefficients"),
          correct: false,
        },
      ];
      return {
        skill: L("Patrón de los exponentes", "Pattern of the exponents"),
        statement: L(
          "En el desarrollo $(x+1)^{4} = x^{4}+4x^{3}+6x^{2}+4x+1$: ¿qué patrón siguen los exponentes de $x$, de izquierda a derecha?",
          "In the expansion $(x+1)^{4} = x^{4}+4x^{3}+6x^{2}+4x+1$: what pattern do the exponents of $x$ follow, left to right?",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Enumera los exponentes de $x$ en cada término: $4, 3, 2, 1, 0$.",
            "List the exponents of $x$ in each term: $4, 3, 2, 1, 0$.",
          ),
          L(
            "Cada paso resta $1$ al exponente anterior.",
            "Each step subtracts $1$ from the previous exponent.",
          ),
          L(
            "El último término no lleva $x$: exponente $0$.",
            "The last term carries no $x$: exponent $0$.",
          ),
        ],
        answerDisplay: L(
          "Los exponentes bajan $4, 3, 2, 1, 0$",
          "The exponents go down $4, 3, 2, 1, 0$",
        ),
        solution: [
          step(
            "given",
            "El desarrollo $(x+1)^{4} = x^{4}+4x^{3}+6x^{2}+4x+1$.",
            "The expansion $(x+1)^{4} = x^{4}+4x^{3}+6x^{2}+4x+1$.",
          ),
          step(
            "approach",
            "Leer el exponente de $x$ término a término, de izquierda a derecha.",
            "Read the exponent of $x$ term by term, left to right.",
          ),
          step(
            "calculation",
            "Exponentes: $4, 3, 2, 1$; el último término ($1$) no lleva $x$, o sea $x^{0}$.",
            "Exponents: $4, 3, 2, 1$; the last term ($1$) carries no $x$, that is $x^{0}$.",
          ),
          step(
            "result",
            "Disminuyen de uno en uno, desde $4$ hasta $0$. Control: en $(a+b)^{n}$ el término $k+1$ lleva $a^{\\,n-k}$ — los exponentes de $a$ bajan siempre de 1 en 1 hasta $0$ ✓.",
            "They decrease by one at a time, from $4$ down to $0$. Check: in $(a+b)^{n}$ the $k+1$-th term carries $a^{\\,n-k}$ — the exponents of $a$ always step down by 1 until $0$ ✓.",
          ),
        ],
      };
    },
  ),

  /* T9.3 — triangulares 1,3,6,10,15 → 21. */
  template(
    {
      id: "pat-ant-3",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "algebraic-patterns",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 150,
      tags: ["algebraic-patterns", "triangular-numbers"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "tutor-encargo-polinomios-2026",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "T9 · 3",
      },
    },
    () => ({
      skill: L("Números triangulares", "Triangular numbers"),
      statement: L(
        "Los números triangulares: $1,\\;3,\\;6,\\;10,\\;15,\\;\\ldots$ ¿Qué número sigue?",
        "The triangular numbers: $1,\\;3,\\;6,\\;10,\\;15,\\;\\ldots$ What comes next?",
      ),
      answer: { kind: "numeric", value: 21 },
      hints: [
        L(
          "Diferencias: $2, 3, 4, 5$.",
          "Differences: $2, 3, 4, 5$.",
        ),
        L(
          "La siguiente diferencia es $6$.",
          "The next difference is $6$.",
        ),
        L(
          "$15+6 = 21$.",
          "$15+6 = 21$.",
        ),
      ],
      answerDisplay: L(
        "$1,\\;3,\\;6,\\;10,\\;15,\\;21$",
        "$1,\\;3,\\;6,\\;10,\\;15,\\;21$",
      ),
      solution: [
        step(
          "given",
          "Los números triangulares $1,\\;3,\\;6,\\;10,\\;15,\\;\\ldots$",
          "The triangular numbers $1,\\;3,\\;6,\\;10,\\;15,\\;\\ldots$",
        ),
        step(
          "approach",
          "Analizar las diferencias entre términos consecutivos.",
          "Analyze the differences between consecutive terms.",
        ),
        step(
          "calculation",
          "$3-1 = 2$; $6-3 = 3$; $10-6 = 4$; $15-10 = 5$. La siguiente diferencia es $6$; entonces $15+6 = 21$.",
          "$3-1 = 2$; $6-3 = 3$; $10-6 = 4$; $15-10 = 5$. The next difference is $6$; hence $15+6 = 21$.",
        ),
        step(
          "result",
          "El siguiente número es $21$. Control: el $n$-ésimo triangular es $\\frac{n(n+1)}{2}$ y $\\frac{6\\cdot 7}{2} = 21$ ✓.",
          "The next number is $21$. Check: the $n$-th triangular number is $\\frac{n(n+1)}{2}$ and $\\frac{6\\cdot 7}{2} = 21$ ✓.",
        ),
      ],
    }),
  ),

  /* T9.4 — palitos 4n−1: figura 25 → 99. */
  template(
    {
      id: "pat-ant-4",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "algebraic-patterns",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 210,
      tags: ["algebraic-patterns", "generalization"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "tutor-encargo-polinomios-2026",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "T9 · 4",
      },
      reasoning: "modeling",
    },
    () => ({
      skill: L("Generalización de un patrón de figuras", "Generalizing a figure pattern"),
      statement: L(
        "Un patrón de figuras usa 3, 7, 11, 15, … palitos (cada figura añade 4). ¿Cuántos palitos usa la figura 25?",
        "A figure pattern uses 3, 7, 11, 15, … sticks (each figure adds 4). How many sticks does figure 25 use?",
      ),
      answer: { kind: "numeric", value: 99 },
      hints: [
        L(
          "La fórmula general es lineal: $f(n) = 4n-1$.",
          "The general formula is linear: $f(n) = 4n-1$.",
        ),
        L(
          "Comprueba: $f(1) = 3$, $f(2) = 7$ ✓.",
          "Check: $f(1) = 3$, $f(2) = 7$ ✓.",
        ),
        L(
          "$f(25) = 100-1 = 99$.",
          "$f(25) = 100-1 = 99$.",
        ),
      ],
      answerDisplay: L(
        "$f(25) = 4\\cdot 25-1 = 99$",
        "$f(25) = 4\\cdot 25-1 = 99$",
      ),
      solution: [
        step(
          "given",
          "Las figuras usan $3, 7, 11, 15, \\ldots$ palitos: cada figura añade $4$; se pide la figura $25$.",
          "The figures use $3, 7, 11, 15, \\ldots$ sticks: each figure adds $4$; figure $25$ is requested.",
        ),
        step(
          "approach",
          "Modelar con una fórmula lineal $f(n) = an+b$: el incremento fijo $4$ da $a = 4$.",
          "Model with a linear formula $f(n) = an+b$: the fixed increment $4$ gives $a = 4$.",
        ),
        step(
          "calculation",
          "$f(n) = 4n+b$; con $f(1) = 3$: $4+b = 3 \\Rightarrow b = -1$. Así $f(n) = 4n-1$.",
          "$f(n) = 4n+b$; with $f(1) = 3$: $4+b = 3 \\Rightarrow b = -1$. Hence $f(n) = 4n-1$.",
        ),
        step(
          "result",
          "$f(25) = 4\\cdot 25-1 = 99$ palitos. Control: $f(2) = 8-1 = 7$ ✓ (y $f(1) = 3$).",
          "$f(25) = 4\\cdot 25-1 = 99$ sticks. Check: $f(2) = 8-1 = 7$ ✓ (and $f(1) = 3$).",
        ),
      ],
    }),
  ),

  /* T9.5 — f(n)=n²+n: f(6)+f(7) = 42+56 = 98. */
  template(
    {
      id: "pat-ant-5",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "algebraic-patterns",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 240,
      tags: ["algebraic-patterns", "formula"],
      prerequisites: ["foundations"],
      source: {
        sourceId: "tutor-encargo-polinomios-2026",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "T9 · 5",
      },
      reasoning: "multi-concept",
    },
    () => ({
      skill: L("Evaluación de la fórmula de una sucesión", "Evaluating a sequence formula"),
      statement: L(
        "El n-ésimo término de la sucesión $2, 6, 12, 20, 30, \\ldots$ es $f(n)=n^{2}+n$. ¿Cuánto suma el 6º término más el 7º?",
        "The n-th term of the sequence $2, 6, 12, 20, 30, \\ldots$ is $f(n)=n^{2}+n$. What is the 6th term plus the 7th?",
      ),
      answer: { kind: "numeric", value: 98 },
      hints: [
        L(
          "6º término: $f(6) = 36+6$.",
          "6th term: $f(6) = 36+6$.",
        ),
        L(
          "7º: $f(7) = 49+7$.",
          "7th: $f(7) = 49+7$.",
        ),
        L(
          "$42+56 = 98$.",
          "$42+56 = 98$.",
        ),
      ],
      answerDisplay: L(
        "$f(6)+f(7) = 42+56 = 98$",
        "$f(6)+f(7) = 42+56 = 98$",
      ),
      solution: [
        step(
          "given",
          "La sucesión con $f(n) = n^{2}+n$; se pide la suma del 6º y el 7º términos.",
          "The sequence with $f(n) = n^{2}+n$; the 6th term plus the 7th is requested.",
        ),
        step(
          "approach",
          "Evaluar la fórmula en $n = 6$ y $n = 7$ y sumar ambos valores.",
          "Evaluate the formula at $n = 6$ and $n = 7$ and add both values.",
        ),
        step(
          "calculation",
          "$f(6) = 36+6 = 42$; $f(7) = 49+7 = 56$.",
          "$f(6) = 36+6 = 42$; $f(7) = 49+7 = 56$.",
        ),
        step(
          "result",
          "$42+56 = 98$. Control: $f(6)+f(7) = \\left(6^{2}+6\\right)+\\left(7^{2}+7\\right) = 42+56 = 98$ ✓.",
          "$42+56 = 98$. Check: $f(6)+f(7) = \\left(6^{2}+6\\right)+\\left(7^{2}+7\\right) = 42+56 = 98$ ✓.",
        ),
      ],
    }),
  ),

  /* ================================================================== */
  /* ANTONIO · T11 «Verificación algebraica» — ver-ant-1..5 (subtopic    */
  /* NUEVO algebraic-verification; lo registra el integrador).           */
  /* Fuente y clave: como T2.                                            */
  /* ================================================================== */

  /* T11.1 — (x+5)² en x=2: 49 en ambos lados. */
  template(
    {
      id: "ver-ant-1",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "algebraic-verification",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 90,
      tags: ["algebraic-verification", "substitution"],
      prerequisites: ["special-products"],
      source: {
        sourceId: "tutor-encargo-polinomios-2026",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "T11 · 1",
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$49$ en ambos lados", "$49$ on both sides"), correct: true },
        { id: "b", text: L("$25$ en ambos lados", "$25$ on both sides"), correct: false },
        { id: "c", text: L("Izquierdo $49$, derecho $29$", "Left side $49$, right side $29$"), correct: false },
        { id: "d", text: L("Izquierdo $49$, derecho $45$", "Left side $49$, right side $45$"), correct: false },
      ];
      return {
        skill: L("Verificación por sustitución", "Verification by substitution"),
        statement: L(
          "Para verificar el desarrollo $(x+5)^{2}=x^{2}+10x+25$, un estudiante evalúa ambos lados en $x=2$. Si el desarrollo es correcto, ¿qué debe obtener?",
          "To verify the expansion $(x+5)^{2}=x^{2}+10x+25$, a student evaluates both sides at $x=2$. If the expansion is correct, what should she get?",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Izquierdo: $\\left(2+5\\right)^{2}$.",
            "Left side: $\\left(2+5\\right)^{2}$.",
          ),
          L(
            "Derecho: $4+20+25$.",
            "Right side: $4+20+25$.",
          ),
          L(
            "Ambos dan $49$.",
            "Both give $49$.",
          ),
        ],
        answerDisplay: L(
          "Ambos lados dan $49$",
          "Both sides give $49$",
        ),
        solution: [
          step(
            "given",
            "El desarrollo $(x+5)^{2}=x^{2}+10x+25$ y el punto de control $x = 2$.",
            "The expansion $(x+5)^{2}=x^{2}+10x+25$ and the check point $x = 2$.",
          ),
          step(
            "approach",
            "Evaluar cada lado por separado en $x = 2$.",
            "Evaluate each side separately at $x = 2$.",
          ),
          step(
            "calculation",
            "Izquierdo: $\\left(2+5\\right)^{2} = 7^{2} = 49$. Derecho: $2^{2}+10\\cdot 2+25 = 4+20+25 = 49$.",
            "Left side: $\\left(2+5\\right)^{2} = 7^{2} = 49$. Right side: $2^{2}+10\\cdot 2+25 = 4+20+25 = 49$.",
          ),
          step(
            "result",
            "Debe obtener $49$ en ambos lados. Control: $49 = 49$ — la igualdad se mantiene en este punto ✓.",
            "She should get $49$ on both sides. Check: $49 = 49$ — the equality holds at this point ✓.",
          ),
        ],
      };
    },
  ),

  /* T11.2 — (x−3)² ≠ x²−9: en x=0 se separa (9 vs −9). */
  template(
    {
      id: "ver-ant-2",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "algebraic-verification",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["algebraic-verification", "refutation"],
      prerequisites: ["special-products"],
      source: {
        sourceId: "tutor-encargo-polinomios-2026",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "T11 · 2",
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L("En $x=0$: el izquierdo da 9 y el derecho $-9$", "At $x=0$: the left side gives 9 and the right side $-9$"),
          correct: true,
        },
        {
          id: "b",
          text: L("En $x=3$: ambos dan 0", "At $x=3$: both give 0"),
          correct: false,
        },
        {
          id: "c",
          text: L("En ninguna: $x^{2}-9$ es equivalente a $(x-3)^{2}$", "In none: $x^{2}-9$ is equivalent to $(x-3)^{2}$"),
          correct: false,
        },
        {
          id: "d",
          text: L("En $x=0$: ambos dan $-9$", "At $x=0$: both give $-9$"),
          correct: false,
        },
      ];
      return {
        skill: L("Refutación por sustitución", "Refutation by substitution"),
        statement: L(
          "Un estudiante escribió $(x-3)^{2}=x^{2}-9$. ¿En cuál evaluación se pone de manifiesto el ERROR?",
          "A student wrote $(x-3)^{2}=x^{2}-9$. Which evaluation exposes the MISTAKE?",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Evalúa el lado izquierdo y el derecho por separado en cada candidato.",
            "Evaluate the left side and the right side separately at each candidate.",
          ),
          L(
            "Con $x = 3$ los DOS valen $0$ — es el único punto donde coinciden.",
            "At $x = 3$ BOTH equal $0$ — it is the only point where they coincide.",
          ),
          L(
            "Con $x = 0$ se separan: 9 contra $-9$.",
            "At $x = 0$ they split apart: 9 versus $-9$.",
          ),
        ],
        answerDisplay: L(
          "En $x=0$: izquierda 9, derecha $-9$",
          "At $x=0$: left side 9, right side $-9$",
        ),
        solution: [
          step(
            "given",
            "La supuesta identidad $(x-3)^{2}=x^{2}-9$; se busca una evaluación que la refute.",
            "The claimed identity $(x-3)^{2}=x^{2}-9$; an evaluation that refutes it is sought.",
          ),
          step(
            "approach",
            "Probar valores: si en algún punto los dos lados difieren, la identidad es falsa.",
            "Test values: if at some point the two sides differ, the identity is false.",
          ),
          step(
            "calculation",
            "Con $x = 0$: izquierdo $\\left(0-3\\right)^{2} = 9$; derecho $0-9 = -9$. Difieren. (Con $x = 3$: ambos dan $0$; ahí NO refuta.)",
            "At $x = 0$: left side $\\left(0-3\\right)^{2} = 9$; right side $0-9 = -9$. They differ. (At $x = 3$: both give $0$; no refutation there.)",
          ),
          step(
            "result",
            "En $x=0$ se manifiesta el error: $9 \\neq -9$. Control: la única coincidencia es $x = 3$ ($x^{2}-6x+9 = x^{2}-9 \\Rightarrow x = 3$) ✓.",
            "At $x=0$ the mistake shows: $9 \\neq -9$. Check: the only point of agreement is $x = 3$ ($x^{2}-6x+9 = x^{2}-9 \\Rightarrow x = 3$) ✓.",
          ),
        ],
      };
    },
  ),

  /* T11.3 — comprobar factorización: expandir y comparar. */
  template(
    {
      id: "ver-ant-3",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "algebraic-verification",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["algebraic-verification", "procedure"],
      prerequisites: ["special-products"],
      source: {
        sourceId: "tutor-encargo-polinomios-2026",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "T11 · 3",
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L("Expandir $(x-2)(x-3)$ y comparar término a término", "Expand $(x-2)(x-3)$ and compare term by term"),
          correct: true,
        },
        {
          id: "b",
          text: L("Evaluar ambos lados en un solo valor de $x$", "Evaluate both sides at a single value of $x$"),
          correct: false,
        },
        {
          id: "c",
          text: L("Derivar ambos lados", "Differentiate both sides"),
          correct: false,
        },
        {
          id: "d",
          text: L("Graficar y contar intersecciones", "Graph and count intersections"),
          correct: false,
        },
      ];
      return {
        skill: L("Procedimiento de comprobación", "Checking procedure"),
        statement: L(
          "Para comprobar la factorización $x^{2}-5x+6=(x-2)(x-3)$, ¿cuál es el procedimiento más directo y concluyente?",
          "To check the factoring $x^{2}-5x+6=(x-2)(x-3)$, which is the most direct and conclusive procedure?",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Una factorización es una IDENTIDAD: debe valer para TODO $x$.",
            "A factoring is an IDENTITY: it must hold for EVERY $x$.",
          ),
          L(
            "El único chequeo completo es re-expandir el lado factorizado.",
            "The only complete check is to re-expand the factored side.",
          ),
          L(
            "$(x-2)(x-3) = x^{2}-5x+6$ ✓.",
            "$(x-2)(x-3) = x^{2}-5x+6$ ✓.",
          ),
        ],
        answerDisplay: L(
          "Expandir $(x-2)(x-3)$ y comparar término a término",
          "Expand $(x-2)(x-3)$ and compare term by term",
        ),
        solution: [
          step(
            "given",
            "La factorización propuesta $x^{2}-5x+6=(x-2)(x-3)$; se pide el mejor procedimiento de comprobación.",
            "The proposed factoring $x^{2}-5x+6=(x-2)(x-3)$; the best checking procedure is requested.",
          ),
          step(
            "approach",
            "Una identidad se comprueba devolviéndola a la forma original: expandir el lado derecho y comparar.",
            "An identity is checked by returning it to its original form: expand the right side and compare.",
          ),
          step(
            "calculation",
            "$(x-2)(x-3) = x^{2}-3x-2x+6 = x^{2}-5x+6$.",
            "$(x-2)(x-3) = x^{2}-3x-2x+6 = x^{2}-5x+6$.",
          ),
          step(
            "result",
            "Expandir y comparar término a término es concluyente: $x^{2}-5x+6$ coincide. Control: evaluar en UN solo valor no basta (otras expresiones pueden pasar por ese punto) y derivar puede hacer coincidir sin que las funciones coincidan ✓.",
            "Expanding and comparing term by term is conclusive: $x^{2}-5x+6$ matches. Check: evaluating at a SINGLE value is not enough (other expressions may pass through that point) and differentiating may match without the functions matching ✓.",
          ),
        ],
      };
    },
  ),

  /* T11.4 — (2x−1)³ vs calculadora: coinciden solo en x=0. */
  template(
    {
      id: "ver-ant-4",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "algebraic-verification",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 210,
      tags: ["algebraic-verification", "refutation"],
      prerequisites: ["special-products"],
      source: {
        sourceId: "tutor-encargo-polinomios-2026",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "T11 · 4",
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$x=0$", "$x=0$"), correct: true },
        { id: "b", text: L("$x=1$", "$x=1$"), correct: false },
        { id: "c", text: L("$x=\\frac{1}{2}$", "$x=\\frac{1}{2}$"), correct: false },
        { id: "d", text: L("$x=2$", "$x=2$"), correct: false },
      ];
      return {
        skill: L("Dónde coinciden dos desarrollos", "Where two expansions coincide"),
        statement: L(
          "El desarrollo correcto es $(2x-1)^{3}=8x^{3}-12x^{2}+6x-1$. Una calculadora devolvió $8x^{3}-6x^{2}+6x-1$. ¿En cuál valor de x COINCIDEN el resultado correcto y el erróneo (es decir, en cuál valor NO sirve evaluar para refutar)?",
          "The correct expansion is $(2x-1)^{3}=8x^{3}-12x^{2}+6x-1$. A calculator returned $8x^{3}-6x^{2}+6x-1$. At which value of x do the correct and the wrong results COINCIDE (that is, at which value is evaluating useless to refute)?",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Resta el resultado correcto menos el erróneo.",
            "Subtract the wrong result from the correct one.",
          ),
          L(
            "La diferencia es $-6x^{2}$.",
            "The difference is $-6x^{2}$.",
          ),
          L(
            "Solo se anula en $x = 0$.",
            "It only vanishes at $x = 0$.",
          ),
        ],
        answerDisplay: L(
          "Coinciden solo en $x=0$",
          "They coincide only at $x=0$",
        ),
        solution: [
          step(
            "given",
            "Correcto: $(2x-1)^{3} = 8x^{3}-12x^{2}+6x-1$; calculadora: $8x^{3}-6x^{2}+6x-1$.",
            "Correct: $(2x-1)^{3} = 8x^{3}-12x^{2}+6x-1$; calculator: $8x^{3}-6x^{2}+6x-1$.",
          ),
          step(
            "approach",
            "Restar ambas expresiones: donde la diferencia valga $0$, coinciden (y evaluar no refuta).",
            "Subtract the two expressions: wherever the difference is $0$, they coincide (and evaluating does not refute).",
          ),
          step(
            "calculation",
            "$\\left(8x^{3}-12x^{2}+6x-1\\right)-\\left(8x^{3}-6x^{2}+6x-1\\right) = -6x^{2}$; se anula solo en $x = 0$.",
            "$\\left(8x^{3}-12x^{2}+6x-1\\right)-\\left(8x^{3}-6x^{2}+6x-1\\right) = -6x^{2}$; it vanishes only at $x = 0$.",
          ),
          step(
            "result",
            "Coinciden solo en $x = 0$ (ambos dan $-1$). Control: con $x = 1$ sí refuta: correcto $8-12+6-1 = 1$ y calculadora $8-6+6-1 = 7$, con $1 \\neq 7$ ✓.",
            "They coincide only at $x = 0$ (both give $-1$). Check: at $x = 1$ it does refute: correct $8-12+6-1 = 1$ and calculator $8-6+6-1 = 7$, with $1 \\neq 7$ ✓.",
          ),
        ],
      };
    },
  ),

  /* T11.5 — 3 valores distintos bastan (diferencia de grado ≤ 2). */
  template(
    {
      id: "ver-ant-5",
      subject: "math",
      topicId: "polynomials",
      subtopicId: "algebraic-verification",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["algebraic-verification", "identity-proof"],
      prerequisites: ["special-products"],
      source: {
        sourceId: "tutor-encargo-polinomios-2026",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "T11 · 5",
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "3 valores: la diferencia es de grado a lo sumo 2, y un polinomio de grado ≤ 2 con 3 raíces distintas es el polinomio cero",
            "3 values: the difference has degree at most 2, and a degree-≤2 polynomial with 3 distinct roots is the zero polynomial",
          ),
          correct: true,
        },
        {
          id: "b",
          text: L("1 valor: si coinciden una vez, queda demostrado", "1 value: if they match once, it is proved"),
          correct: false,
        },
        {
          id: "c",
          text: L("2 valores: porque x aparece al cuadrado", "2 values: because x appears squared"),
          correct: false,
        },
        {
          id: "d",
          text: L("Ninguno: evaluar nunca puede demostrar una identidad", "None: evaluating can never prove an identity"),
          correct: false,
        },
      ];
      return {
        skill: L("Cuántas evaluaciones demuestran una identidad", "How many evaluations prove an identity"),
        statement: L(
          "Para demostrar la identidad $(x+2)^{2}=x^{2}+4x+4$ evaluando en valores de x (sin expandir), ¿cuántos valores DISTINTOS bastan y por qué?",
          "To prove the identity $(x+2)^{2}=x^{2}+4x+4$ by evaluating at values of x (without expanding), how many DISTINCT values suffice, and why?",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "La diferencia de ambos lados es de grado ≤ 2.",
            "The difference of both sides has degree ≤ 2.",
          ),
          L(
            "Un polinomio de grado $d$ tiene a lo sumo $d$ raíces.",
            "A polynomial of degree $d$ has at most $d$ roots.",
          ),
          L(
            "3 raíces distintas $\\Rightarrow$ diferencia nula en todas partes.",
            "3 distinct roots $\\Rightarrow$ the difference is zero everywhere.",
          ),
        ],
        answerDisplay: L(
          "Bastan 3 valores distintos",
          "3 distinct values suffice",
        ),
        solution: [
          step(
            "given",
            "La identidad $(x+2)^{2}=x^{2}+4x+4$; se pregunta cuántas evaluaciones distintas la demuestran.",
            "The identity $(x+2)^{2}=x^{2}+4x+4$; the question is how many distinct evaluations prove it.",
          ),
          step(
            "approach",
            "Restar ambos lados: si la diferencia (grado $\\le 2$) se anula en suficientes puntos, es el polinomio cero.",
            "Subtract both sides: if the difference (degree $\\le 2$) vanishes at enough points, it is the zero polynomial.",
          ),
          step(
            "calculation",
            "Con $x = 0$: $4 = 4$; con $x = 1$: $9 = 9$; con $x = 2$: $16 = 16$. La diferencia $D(x)$ (grado $\\le 2$) tiene las 3 raíces $0, 1, 2 \\Rightarrow D \\equiv 0$.",
            "At $x = 0$: $4 = 4$; at $x = 1$: $9 = 9$; at $x = 2$: $16 = 16$. The difference $D(x)$ (degree $\\le 2$) has the 3 roots $0, 1, 2 \\Rightarrow D \\equiv 0$.",
          ),
          step(
            "result",
            "Bastan 3 valores distintos: la diferencia es de grado a lo sumo 2, y un polinomio de grado $\\le 2$ con 3 raíces distintas es el polinomio cero. Control: con solo 2 valores NO basta — $5x+4$ pasa por $(0,4)$ y $(1,9)$ sin ser $x^{2}+4x+4$ ✓.",
            "3 distinct values suffice: the difference has degree at most 2, and a degree-≤2 polynomial with 3 distinct roots is the zero polynomial. Check: 2 values are NOT enough — $5x+4$ passes through $(0,4)$ and $(1,9)$ without being $x^{2}+4x+4$ ✓.",
          ),
        ],
      };
    },
  ),

];
