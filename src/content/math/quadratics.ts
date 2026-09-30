/**
 * MATH · Quadratic functions & equations
 *
 * Standard/factored form, solving by factoring, the quadratic formula, the
 * discriminant, completing the square, the vertex, graph reading and
 * applications. Equations are built from chosen roots so answers are always
 * clean; two templates read information off a parameterized parabola graph.
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

/** "x - 3" from the root r (factor x − r) */
const linFac = (r: number): string =>
  r < 0 ? `x + ${-r}` : r > 0 ? `x - ${r}` : "x";

/** LaTeX vertex form "(x - h)^2 + k" from the vertex (h, k) */
const vertexForm = (h: number, k: number): string =>
  `\\left(x ${h < 0 ? "+" : "-"} ${Math.abs(h)}\\right)^2 ${k < 0 ? "-" : "+"} ${Math.abs(k)}`;

/** "x + 3"-style trailing constant: "" when zero, else " + 3" / " - 3" */
const trail = (n: number): string => (n === 0 ? "" : ` ${op(n)}`);

export const templates: ProblemTemplate[] = [
  /* ---------------------------------------------------------------- */
  /* Standard & factored form                                         */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "quad-std-01",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "standard-form",
      difficulty: "easy",
      questionType: "expression",
      estimatedTimeSec: 100,
      tags: ["vertex-form", "expansion"],
      prerequisites: ["polynomials"],
    },
    (rng) => {
      const h = rng.nonZeroInt(-4, 4);
      const k = rng.nonZeroInt(-5, 5);
      const b = -2 * h;
      const c = h * h + k;
      return {
        skill: L("Pasar de forma de vértice a forma general", "From vertex form to standard form"),
        statement: L(
          `Expande y escribe en forma general $y = ax^2 + bx + c$: $y = ${vertexForm(h, k)}$ (escribe por ejemplo x^2-4x+7).`,
          `Expand and write in standard form $y = ax^2 + bx + c$: $y = ${vertexForm(h, k)}$ (write e.g. x^2-4x+7).`,
        ),
        answer: {
          kind: "expression",
          accepted: [polyAcc([1, b, c], ["x^2", "x", ""])],
          variables: ["x"],
        },
        hints: [
          L(
            "Desarrolla el cuadrado con la identidad $(x + a)^2 = x^2 + 2ax + a^2$.",
            "Expand the square with the identity $(x + a)^2 = x^2 + 2ax + a^2$.",
          ),
          L(
            `El doble producto usa $a = ${-h}$ (lo que se suma o resta dentro del paréntesis).`,
            `The double product uses $a = ${-h}$ (what is added or subtracted inside the parentheses).`,
          ),
          L(
            "Después suma el término que queda fuera del paréntesis.",
            "Then add the term outside the parentheses.",
          ),
        ],
        answerDisplay: L(
          `$y = ${poly([1, b, c], ["x^2", "x", ""])}$`,
          `$y = ${poly([1, b, c], ["x^2", "x", ""])}$`,
        ),
        solution: [
          step(
            "given",
            `$y = ${vertexForm(h, k)}$`,
            `$y = ${vertexForm(h, k)}$`,
          ),
          step(
            "approach",
            "Expandimos el binomio al cuadrado y luego sumamos la constante exterior.",
            "Expand the squared binomial and then add the outside constant.",
          ),
          step(
            "calculation",
            `$y = x^2 ${op(2 * -h)}x + ${h * h} ${op(k)}$<br>$y = x^2 ${op(b)}x + ${c}$`,
            `$y = x^2 ${op(2 * -h)}x + ${h * h} ${op(k)}$<br>$y = x^2 ${op(b)}x + ${c}$`,
          ),
          step(
            "result",
            `$y = ${poly([1, b, c], ["x^2", "x", ""])}$`,
            `$y = ${poly([1, b, c], ["x^2", "x", ""])}$`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Solving by factoring                                             */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "quad-fact-01",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "factoring",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 100,
      tags: ["factoring", "zero-product"],
      prerequisites: ["polynomials"],
    },
    (rng) => {
      const r1 = rng.nonZeroInt(-6, 6);
      let r2 = rng.nonZeroInt(-6, 6);
      if (r2 === r1) r2 = r1 === 1 ? 2 : r1 === -1 ? -2 : r1 > 0 ? r1 - 1 : r1 + 1; // distinct, nonzero roots
      const lo = Math.min(r1, r2);
      const hi = Math.max(r1, r2);
      const b = -(r1 + r2);
      const c = r1 * r2;
      return {
        skill: L("Resolver factorizando", "Solving by factoring"),
        statement: L(
          `Resuelve $${poly([1, b, c], ["x^2", "x", ""])} = 0$ y da la **mayor** de las dos soluciones.`,
          `Solve $${poly([1, b, c], ["x^2", "x", ""])} = 0$ and give the **larger** of the two solutions.`,
        ),
        answer: { kind: "numeric", value: hi },
        hints: [
          L(
            "Busca dos números que multiplicados den el término independiente y sumados, el coeficiente de $x$ (con su signo).",
            "Look for two numbers whose product is the constant term and whose sum is the coefficient of $x$ (with its sign).",
          ),
          L(
            "Escribe la ecuación como $(x - r_1)(x - r_2) = 0$.",
            "Write the equation as $(x - r_1)(x - r_2) = 0$.",
          ),
          L(
            "Un producto vale 0 solo si alguno de sus factores vale 0.",
            "A product equals 0 only when one of its factors equals 0.",
          ),
        ],
        answerDisplay: L(`$x = ${hi}$`, `$x = ${hi}$`),
        solution: [
          step(
            "given",
            `$${poly([1, b, c], ["x^2", "x", ""])} = 0$`,
            `$${poly([1, b, c], ["x^2", "x", ""])} = 0$`,
          ),
          step(
            "approach",
            "Factorizamos el trinomio y aplicamos la propiedad del producto cero.",
            "Factor the trinomial and apply the zero-product property.",
          ),
          step(
            "calculation",
            `$\\left(${linFac(r1)}\\right)\\left(${linFac(r2)}\\right) = 0$<br>${linFac(r1)} = 0 \\Rightarrow x = ${r1}$<br>${linFac(r2)} = 0 \\Rightarrow x = ${r2}$`,
            `$\\left(${linFac(r1)}\\right)\\left(${linFac(r2)}\\right) = 0$<br>${linFac(r1)} = 0 \\Rightarrow x = ${r1}$<br>${linFac(r2)} = 0 \\Rightarrow x = ${r2}$`,
          ),
          step(
            "result",
            `Las soluciones son $${lo}$ y $${hi}$; la mayor es $${hi}$.`,
            `The solutions are $${lo}$ and $${hi}$; the larger one is $${hi}$.`,
          ),
        ],
      };
    },
  ),

  template(
    {
      id: "quad-fact-02",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "factoring",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 180,
      tags: ["factoring", "leading-coefficient", "fractions"],
      prerequisites: ["factoring"],
    },
    (rng) => {
      const p = rng.pick([2, 3]);
      const m = rng.pick(p === 2 ? [1, 3, 5, 7] : [1, 2, 4, 5, 7, 8]);
      const n = rng.int(1, 5);
      const b = p * n - m;
      const c = -m * n;
      return {
        skill: L("Factorizar con coeficiente principal distinto de 1", "Factoring with leading coefficient ≠ 1"),
        statement: L(
          `Resuelve $${poly([p, b, c], ["x^2", "x", ""])} = 0$ y da la solución que **no** es entera (puedes escribirla como fracción, por ejemplo 3/2).`,
          `Solve $${poly([p, b, c], ["x^2", "x", ""])} = 0$ and give the **non-integer** solution (you may write it as a fraction, e.g. 3/2).`,
        ),
        answer: { kind: "numeric", value: m / p },
        hints: [
          L(
            "Como el coeficiente principal no es 1, prueba pares de factores del tipo $(\\square\\,x - \\triangle)(x + \\circ)$.",
            "Since the leading coefficient is not 1, try factor pairs of the form $(\\square\\,x - \\triangle)(x + \\circ)$.",
          ),
          L(
            `El término independiente es $${c}$: uno de los factores acaba en $-${m}$ y el otro en $${n}$.`,
            `The constant term is $${c}$: one factor ends in $-${m}$ and the other in $${n}$.`,
          ),
          L(
            "Cada factor igualado a cero da una solución; una de ellas es entera y la otra no.",
            "Setting each factor to zero gives a solution; one is an integer and the other is not.",
          ),
        ],
        answerDisplay: L(`$x = \\frac{${m}}{${p}}$`, `$x = \\frac{${m}}{${p}}$`),
        solution: [
          step(
            "given",
            `$${poly([p, b, c], ["x^2", "x", ""])} = 0$`,
            `$${poly([p, b, c], ["x^2", "x", ""])} = 0$`,
          ),
          step(
            "approach",
            "Factorizamos en dos binomios y aplicamos la propiedad del producto cero.",
            "Factor into two binomials and apply the zero-product property.",
          ),
          step(
            "calculation",
            `$\\left(${p}x - ${m}\\right)\\left(x + ${n}\\right) = 0$<br>$${p}x - ${m} = 0 \\Rightarrow x = \\frac{${m}}{${p}}$<br>$x + ${n} = 0 \\Rightarrow x = -${n}$`,
            `$\\left(${p}x - ${m}\\right)\\left(x + ${n}\\right) = 0$<br>$${p}x - ${m} = 0 \\Rightarrow x = \\frac{${m}}{${p}}$<br>$x + ${n} = 0 \\Rightarrow x = -${n}$`,
          ),
          step(
            "result",
            `Las soluciones son $\\frac{${m}}{${p}}$ y $-${n}$; la no entera es $\\frac{${m}}{${p}}$.`,
            `The solutions are $\\frac{${m}}{${p}}$ and $-${n}$; the non-integer one is $\\frac{${m}}{${p}}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Quadratic formula                                                */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "quad-form-01",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "quadratic-formula",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 180,
      tags: ["quadratic-formula"],
      prerequisites: ["factoring"],
    },
    (rng) => {
      const a = rng.pick([2, 3]);
      const t = rng.int(1, 4); // integer (positive) root
      const m = rng.pick(a === 2 ? [1, 3, 5] : [1, 2, 4, 5]);
      // roots: t and -m/a → b = -(a·t - m), c = -t·m
      const b = -(a * t - m);
      const c = -t * m;
      const disc = a * t + m; // √(b² - 4ac) = a·t + m
      return {
        skill: L("Fórmula cuadrática con raíz fraccionaria", "Quadratic formula with a fractional root"),
        statement: L(
          `Resuelve con la fórmula cuadrática $${poly([a, b, c], ["x^2", "x", ""])} = 0$ y da la solución **negativa** (puedes escribirla como fracción, por ejemplo -1/2).`,
          `Solve $${poly([a, b, c], ["x^2", "x", ""])} = 0$ with the quadratic formula and give the **negative** solution (you may write it as a fraction, e.g. -1/2).`,
        ),
        answer: { kind: "numeric", value: -m / a },
        hints: [
          L(
            "Identifica primero $a$, $b$ y $c$ con sus signos.",
            "First identify $a$, $b$ and $c$ with their signs.",
          ),
          L(
            `Calcula el discriminante $\\Delta = b^2 - 4ac$; en este caso es un cuadrado perfecto ($${disc * disc}$).`,
            `Compute the discriminant $\\Delta = b^2 - 4ac$; here it is a perfect square ($${disc * disc}$).`,
          ),
          L(
            `Aplica $x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}$ con el signo $-$ para obtener la solución negativa.`,
            `Apply $x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}$ with the $-$ sign to get the negative solution.`,
          ),
        ],
        answerDisplay: L(`$x = -\\frac{${m}}{${a}}$`, `$x = -\\frac{${m}}{${a}}$`),
        solution: [
          step(
            "given",
            `$${poly([a, b, c], ["x^2", "x", ""])} = 0$, con $a = ${a}$, $b = ${b}$, $c = ${c}$.`,
            `$${poly([a, b, c], ["x^2", "x", ""])} = 0$, with $a = ${a}$, $b = ${b}$, $c = ${c}$.`,
          ),
          step(
            "approach",
            "Aplicamos la fórmula cuadrática $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$.",
            "We apply the quadratic formula $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$.",
          ),
          step(
            "calculation",
            `$\\Delta = (${b})^2 - 4 \\cdot ${a} \\cdot (${c}) = ${b * b} + ${4 * t * m} = ${disc * disc}$<br>$\\sqrt{\\Delta} = ${disc}$<br>$x = \\frac{-(${b}) \\pm ${disc}}{2 \\cdot ${a}} = \\frac{${-b} \\pm ${disc}}{${2 * a}}$<br>$x_1 = \\frac{${-b + disc}}{${2 * a}} = ${t}$, $\\quad x_2 = \\frac{${-b - disc}}{${2 * a}} = -\\frac{${m}}{${a}}$`,
            `$\\Delta = (${b})^2 - 4 \\cdot ${a} \\cdot (${c}) = ${b * b} + ${4 * t * m} = ${disc * disc}$<br>$\\sqrt{\\Delta} = ${disc}$<br>$x = \\frac{-(${b}) \\pm ${disc}}{2 \\cdot ${a}} = \\frac{${-b} \\pm ${disc}}{${2 * a}}$<br>$x_1 = \\frac{${-b + disc}}{${2 * a}} = ${t}$, $\\quad x_2 = \\frac{${-b - disc}}{${2 * a}} = -\\frac{${m}}{${a}}$`,
          ),
          step(
            "result",
            `La solución negativa es $x = -\\frac{${m}}{${a}}$.`,
            `The negative solution is $x = -\\frac{${m}}{${a}}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Discriminant                                                     */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "quad-disc-01",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "discriminant",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 90,
      tags: ["discriminant"],
      prerequisites: ["polynomials"],
    },
    (rng) => {
      const a = rng.pick([1, 2]);
      const b = rng.nonZeroInt(-8, 8);
      const c = rng.int(-6, 6);
      const disc = b * b - 4 * a * c;
      return {
        skill: L("Cálculo del discriminante", "Computing the discriminant"),
        statement: L(
          `Calcula el discriminante de $${poly([a, b, c], ["x^2", "x", ""])} = 0$.`,
          `Compute the discriminant of $${poly([a, b, c], ["x^2", "x", ""])} = 0$.`,
        ),
        answer: { kind: "numeric", value: disc },
        hints: [
          L(
            "El discriminante es la expresión que va dentro de la raíz en la fórmula cuadrática.",
            "The discriminant is the expression under the square root in the quadratic formula.",
          ),
          L(
            "$\\Delta = b^2 - 4ac$.",
            "$\\Delta = b^2 - 4ac$.",
          ),
          L(
            `Sustituye con los signos correctos: $b = ${b}$ y $c = ${c}$.`,
            `Substitute with the correct signs: $b = ${b}$ and $c = ${c}$.`,
          ),
        ],
        answerDisplay: L(`$\\Delta = ${disc}$`, `$\\Delta = ${disc}$`),
        solution: [
          step(
            "given",
            `$${poly([a, b, c], ["x^2", "x", ""])} = 0$, con $a = ${a}$, $b = ${b}$, $c = ${c}$.`,
            `$${poly([a, b, c], ["x^2", "x", ""])} = 0$, with $a = ${a}$, $b = ${b}$, $c = ${c}$.`,
          ),
          step(
            "approach",
            "El discriminante mide \"cuánta raíz hay\": $\\Delta = b^2 - 4ac$.",
            "The discriminant measures \"how much root there is\": $\\Delta = b^2 - 4ac$.",
          ),
          step(
            "calculation",
            `$\\Delta = (${b})^2 - 4 \\cdot ${a} \\cdot (${c})$<br>$= ${b * b} ${op(4 * a * c)} = ${disc}$`,
            `$\\Delta = (${b})^2 - 4 \\cdot ${a} \\cdot (${c})$<br>$= ${b * b} ${op(4 * a * c)} = ${disc}$`,
          ),
          step(
            "result",
            `$\\Delta = ${disc}$ ${disc > 0 ? "(dos soluciones reales distintas)" : disc === 0 ? "(una solución doble)" : "(sin soluciones reales)"}.`,
            `$\\Delta = ${disc}$ ${disc > 0 ? "(two distinct real solutions)" : disc === 0 ? "(one double solution)" : "(no real solutions)"}.`,
          ),
        ],
      };
    },
  ),

  template(
    {
      id: "quad-disc-02",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "discriminant",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["discriminant", "classification"],
      prerequisites: ["polynomials"],
    },
    (rng) => {
      const kind = rng.int(0, 2); // 0 two real · 1 double · 2 none
      let a = 1;
      let b = 0;
      let c = 0;
      if (kind === 0) {
        const r1 = rng.nonZeroInt(-4, 4);
        let r2 = rng.nonZeroInt(-4, 4);
        if (r2 === r1) r2 = r1 === 1 ? 2 : r1 === -1 ? -2 : r1 > 0 ? r1 - 1 : r1 + 1;
        b = -(r1 + r2);
        c = r1 * r2;
      } else if (kind === 1) {
        const r = rng.nonZeroInt(-4, 4);
        b = -2 * r;
        c = r * r;
      } else {
        [b, c] = rng.pick([
          [2, 2],
          [3, 3],
          [4, 5],
          [5, 7],
        ]);
      }
      const disc = b * b - 4 * a * c;
      const options: McOption[] = [
        {
          id: "a",
          text: L("Dos soluciones reales distintas", "Two distinct real solutions"),
          correct: disc > 0,
        },
        {
          id: "b",
          text: L("Exactamente una solución real (doble)", "Exactly one real (double) solution"),
          correct: disc === 0,
        },
        {
          id: "c",
          text: L("Ninguna solución real", "No real solutions"),
          correct: disc < 0,
        },
      ];
      return {
        skill: L("El discriminante predice el número de soluciones", "The discriminant predicts the number of solutions"),
        statement: L(
          `Sin resolverla, ¿cuántas soluciones reales tiene $${poly([a, b, c], ["x^2", "x", ""])} = 0$?`,
          `Without solving it, how many real solutions does $${poly([a, b, c], ["x^2", "x", ""])} = 0$ have?`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El número de soluciones reales lo decide el signo del discriminante.",
            "The sign of the discriminant decides the number of real solutions.",
          ),
          L(
            "Calcula $\\Delta = b^2 - 4ac$.",
            "Compute $\\Delta = b^2 - 4ac$.",
          ),
          L(
            "$\\Delta > 0$: dos; $\\Delta = 0$: una doble; $\\Delta < 0$: ninguna.",
            "$\\Delta > 0$: two; $\\Delta = 0$: one double; $\\Delta < 0$: none.",
          ),
        ],
        answerDisplay: L(
          `$\\Delta = ${disc}$ → ${kind === 0 ? "dos soluciones reales" : kind === 1 ? "una solución doble" : "ninguna solución real"}`,
          `$\\Delta = ${disc}$ → ${kind === 0 ? "two real solutions" : kind === 1 ? "one double solution" : "no real solutions"}`,
        ),
        solution: [
          step(
            "given",
            `$${poly([a, b, c], ["x^2", "x", ""])} = 0$, con $a = ${a}$, $b = ${b}$, $c = ${c}$.`,
            `$${poly([a, b, c], ["x^2", "x", ""])} = 0$, with $a = ${a}$, $b = ${b}$, $c = ${c}$.`,
          ),
          step(
            "approach",
            "Estudiamos el signo del discriminante $\\Delta = b^2 - 4ac$ sin resolver la ecuación.",
            "We study the sign of the discriminant $\\Delta = b^2 - 4ac$ without solving the equation.",
          ),
          step(
            "calculation",
            `$\\Delta = (${b})^2 - 4 \\cdot ${a} \\cdot (${c}) = ${b * b} ${op(4 * a * c)} = ${disc}$<br>${disc > 0 ? "$\\Delta > 0$" : disc === 0 ? "$\\Delta = 0$" : "$\\Delta < 0$"}`,
            `$\\Delta = (${b})^2 - 4 \\cdot ${a} \\cdot (${c}) = ${b * b} ${op(4 * a * c)} = ${disc}$<br>${disc > 0 ? "$\\Delta > 0$" : disc === 0 ? "$\\Delta = 0$" : "$\\Delta < 0$"}`,
          ),
          step(
            "result",
            kind === 0
              ? "Como $\\Delta > 0$, hay **dos** soluciones reales distintas."
              : kind === 1
                ? "Como $\\Delta = 0$, hay **una** solución real doble."
                : "Como $\\Delta < 0$, **no** hay soluciones reales.",
            kind === 0
              ? "Since $\\Delta > 0$, there are **two** distinct real solutions."
              : kind === 1
                ? "Since $\\Delta = 0$, there is **one** double real solution."
                : "Since $\\Delta < 0$, there are **no** real solutions.",
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Completing the square                                            */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "quad-cs-01",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "completing-square",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 150,
      tags: ["completing-the-square"],
      prerequisites: ["polynomials"],
    },
    (rng) => {
      const m = rng.nonZeroInt(-5, 5);
      const b = 2 * m;
      const c = rng.int(-8, 8);
      return {
        skill: L("Completar el cuadrado", "Completing the square"),
        statement: L(
          `Para reescribir $${poly([1, b, c], ["x^2", "x", ""])}$ en la forma $(x + p)^2 + q$, ¿qué número hay que **sumar y restar** para completar el cuadrado?`,
          `To rewrite $${poly([1, b, c], ["x^2", "x", ""])}$ in the form $(x + p)^2 + q$, which number must be **added and subtracted** to complete the square?`,
        ),
        answer: { kind: "numeric", value: m * m },
        hints: [
          L(
            "El trinomio cuadrado perfecto empieza con la mitad del coeficiente de $x$.",
            "The perfect-square trinomial starts from half the coefficient of $x$.",
          ),
          L(
            `Toma la mitad de $${b}$ y eleva al cuadrado.`,
            `Take half of $${b}$ and square it.`,
          ),
          L(
            "Ese número $p^2$ es lo que se suma (y se resta) para no cambiar la expresión.",
            "That number $p^2$ is what is added (and subtracted) so the expression does not change.",
          ),
        ],
        answerDisplay: L(`$${m * m}$`, `$${m * m}$`),
        solution: [
          step(
            "given",
            `$${poly([1, b, c], ["x^2", "x", ""])}$`,
            `$${poly([1, b, c], ["x^2", "x", ""])}$`,
          ),
          step(
            "approach",
            "Para completar el cuadrado usamos $p = \\frac{b}{2}$ y sumamos y restamos $p^2$.",
            "To complete the square we use $p = \\frac{b}{2}$ and add and subtract $p^2$.",
          ),
          step(
            "calculation",
            `$p = \\frac{${b}}{2} = ${m}$<br>$p^2 = (${m})^2 = ${m * m}$<br>Así, $x^2 ${opTerm(b, "x")} = \\left(x ${op(m)}\\right)^2 - ${m * m}$.`,
            `$p = \\frac{${b}}{2} = ${m}$<br>$p^2 = (${m})^2 = ${m * m}$<br>Thus, $x^2 ${opTerm(b, "x")} = \\left(x ${op(m)}\\right)^2 - ${m * m}$.`,
          ),
          step(
            "result",
            `El número buscado es $${m * m}$, y la forma completa es $\\left(x ${op(m)}\\right)^2${trail(c - m * m)}$.`,
            `The required number is $${m * m}$, and the full form is $\\left(x ${op(m)}\\right)^2${trail(c - m * m)}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Vertex                                                           */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "quad-vertex-01",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "vertex",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 210,
      tags: ["vertex", "parabola"],
      prerequisites: ["polynomials"],
    },
    (rng) => {
      const a = rng.pick([1, 2, 3]);
      const h = rng.nonZeroInt(-4, 4);
      const k = rng.nonZeroInt(-6, 6);
      const b = -2 * a * h;
      const c = a * h * h + k;
      return {
        skill: L("Vértice desde la forma general", "Vertex from standard form"),
        statement: L(
          `La parábola $y = ${poly([a, b, c], ["x^2", "x", ""])}$ tiene su vértice en $(h, k)$. ¿Cuánto vale la ordenada $k$ del vértice?`,
          `The parabola $y = ${poly([a, b, c], ["x^2", "x", ""])}$ has its vertex at $(h, k)$. What is the y-coordinate $k$ of the vertex?`,
        ),
        answer: { kind: "numeric", value: k },
        hints: [
          L(
            "La primera coordenada del vértice se obtiene con $h = -\\frac{b}{2a}$.",
            "The first coordinate of the vertex comes from $h = -\\frac{b}{2a}$.",
          ),
          L(
            `Calcula $h$ con $a = ${a}$ y $b = ${b}$; debería salir un número entero.`,
            `Compute $h$ with $a = ${a}$ and $b = ${b}$; it should come out as an integer.`,
          ),
          L(
            "Después sustituye esa $x$ en la ecuación para obtener la ordenada.",
            "Then substitute that $x$ into the equation to get the y-coordinate.",
          ),
        ],
        answerDisplay: L(`$k = ${k}$`, `$k = ${k}$`),
        solution: [
          step(
            "given",
            `$y = ${poly([a, b, c], ["x^2", "x", ""])}$, con $a = ${a}$, $b = ${b}$, $c = ${c}$.`,
            `$y = ${poly([a, b, c], ["x^2", "x", ""])}$, with $a = ${a}$, $b = ${b}$, $c = ${c}$.`,
          ),
          step(
            "approach",
            "Usamos la fórmula del vértice: $h = -\\frac{b}{2a}$ y luego $k = y(h)$.",
            "We use the vertex formula: $h = -\\frac{b}{2a}$ and then $k = y(h)$.",
          ),
          step(
            "calculation",
            `$h = -\\frac{(${b})}{2 \\cdot ${a}} = ${h}$<br>$k = ${a} \\cdot (${h})^2 ${op(b)} \\cdot (${h}) ${op(c)}$<br>$= ${a * h * h} ${op(b * h)} ${op(c)} = ${k}$`,
            `$h = -\\frac{(${b})}{2 \\cdot ${a}} = ${h}$<br>$k = ${a} \\cdot (${h})^2 ${op(b)} \\cdot (${h}) ${op(c)}$<br>$= ${a * h * h} ${op(b * h)} ${op(c)} = ${k}$`,
          ),
          step(
            "result",
            `El vértice es $(${h}, ${k})$; su ordenada es $k = ${k}$.`,
            `The vertex is $(${h}, ${k})$; its y-coordinate is $k = ${k}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Graph interpretation                                             */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "quad-graph-01",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "graphs",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["graphs", "vertex", "parabola"],
      prerequisites: ["polynomials"],
    },
    (rng) => {
      const h = rng.nonZeroInt(-3, 3);
      const k = rng.intExcluding(-3, 3, [0, h, -h]);
      const options: McOption[] = [
        { id: "a", text: L(`$(${h}, ${k})$`, `$(${h}, ${k})$`), correct: true },
        { id: "b", text: L(`$(${k}, ${h})$`, `$(${k}, ${h})$`), correct: false },
        { id: "c", text: L(`$(${-h}, ${k})$`, `$(${-h}, ${k})$`), correct: false },
        { id: "d", text: L(`$(${h}, ${-k})$`, `$(${h}, ${-k})$`), correct: false },
      ];
      return {
        skill: L("Leer el vértice de una parábola", "Reading the vertex of a parabola"),
        statement: L(
          "La gráfica muestra una parábola. ¿Cuáles son las coordenadas de su vértice?",
          "The graph shows a parabola. What are the coordinates of its vertex?",
        ),
        diagram: {
          kind: "function-graph",
          xMin: -6,
          xMax: 6,
          yMin: -8,
          yMax: 8,
          curves: [{ fn: `(x - ${h})^2 + ${k}`, color: "primary" }],
          points: [{ x: h, y: k }],
          showGrid: true,
          xLabel: "x",
          yLabel: "y",
        },
        diagramLabel: L(
          "Parábola con vértice en un punto de la cuadrícula de coordenadas enteras.",
          "Parabola with its vertex at a grid point with integer coordinates.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El vértice es el punto donde la parábola cambia de dirección.",
            "The vertex is the point where the parabola turns around.",
          ),
          L(
            "Localiza el punto más bajo (o más alto) de la curva marcado en la gráfica.",
            "Locate the lowest (or highest) point of the curve marked on the graph.",
          ),
          L(
            "Lee la coordenada horizontal y luego la vertical sobre la cuadrícula.",
            "Read the horizontal coordinate first and then the vertical one on the grid.",
          ),
        ],
        answerDisplay: L(
          `Vértice $(${h}, ${k})$, es decir, $y = ${vertexForm(h, k)}$`,
          `Vertex $(${h}, ${k})$, i.e. $y = ${vertexForm(h, k)}$`,
        ),
        solution: [
          step(
            "given",
            `La parábola tiene un único punto marcado: su vértice.`,
            `The parabola has a single marked point: its vertex.`,
          ),
          step(
            "approach",
            "Leemos las coordenadas del punto marcado sobre los ejes con la ayuda de la cuadrícula.",
            "We read the coordinates of the marked point on the axes using the grid.",
          ),
          step(
            "calculation",
            `El punto marcado está en $x = ${h}$ y $y = ${k}$.<br>Además, la parábola es $y = ${vertexForm(h, k)}$ y su vértice es $(${h}, ${k})$.`,
            `The marked point lies at $x = ${h}$ and $y = ${k}$.<br>Indeed, the parabola is $y = ${vertexForm(h, k)}$ and its vertex is $(${h}, ${k})$.`,
          ),
          step(
            "result",
            `El vértice es $(${h}, ${k})$.`,
            `The vertex is $(${h}, ${k})$.`,
          ),
        ],
      };
    },
  ),

  template(
    {
      id: "quad-graph-02",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "graphs",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 210,
      tags: ["graphs", "intercepts", "vertex", "symmetry"],
      prerequisites: ["graphs"],
    },
    (rng) => {
      const r1 = -rng.int(1, 4); // negative intercept
      let r2 = rng.int(1, 4); // positive intercept
      if ((r1 + r2) % 2 !== 0) r2 = r2 === 4 ? 3 : r2 + 1; // same parity
      const xv = (r1 + r2) / 2;
      const yv = ((xv - r1) * (xv - r2)); // negative value at the vertex
      const b = -(r1 + r2);
      const c = r1 * r2;
      return {
        skill: L("Vértice a partir de los cortes con el eje x", "Vertex from the x-intercepts"),
        statement: L(
          `La gráfica muestra la parábola $y = ${poly([1, b, c], ["x^2", "x", ""])}$. Usa los cortes con el eje $x$ y la simetría para hallar la **ordenada del vértice**.`,
          `The graph shows the parabola $y = ${poly([1, b, c], ["x^2", "x", ""])}$. Use the x-intercepts and symmetry to find the **y-coordinate of the vertex**.`,
        ),
        diagram: {
          kind: "function-graph",
          xMin: -6,
          xMax: 6,
          yMin: -18,
          yMax: 8,
          curves: [{ fn: `(x - ${r1})*(x - ${r2})`, color: "primary" }],
          points: [
            { x: r1, y: 0, label: `(${r1}, 0)` },
            { x: r2, y: 0, label: `(${r2}, 0)` },
          ],
          showGrid: true,
          xLabel: "x",
          yLabel: "y",
        },
        diagramLabel: L(
          `Parábola que corta el eje x en ${r1} y en ${r2}.`,
          `Parabola crossing the x-axis at ${r1} and ${r2}.`,
        ),
        answer: { kind: "numeric", value: yv },
        hints: [
          L(
            "El vértice está justo en medio de los dos cortes con el eje $x$, por la simetría de la parábola.",
            "The vertex lies exactly halfway between the two x-intercepts, because of the parabola's symmetry.",
          ),
          L(
            `Calcula el punto medio de $${r1}$ y $${r2}$: esa es la $x$ del vértice.`,
            `Compute the midpoint of $${r1}$ and $${r2}$: that is the vertex's $x$.`,
          ),
          L(
            "Sustituye esa $x$ en la ecuación (o lee el valor sobre la gráfica).",
            "Substitute that $x$ into the equation (or read the value off the graph).",
          ),
        ],
        answerDisplay: L(`Vértice $(${xv}, ${yv})$`, `Vertex $(${xv}, ${yv})$`),
        solution: [
          step(
            "given",
            `$y = ${poly([1, b, c], ["x^2", "x", ""])}$ con cortes en $x = ${r1}$ y $x = ${r2}$.`,
            `$y = ${poly([1, b, c], ["x^2", "x", ""])}$ with intercepts at $x = ${r1}$ and $x = ${r2}$.`,
          ),
          step(
            "approach",
            "Por simetría, el eje de la parábola pasa por el punto medio de los cortes; el vértice está sobre ese eje.",
            "By symmetry, the axis of the parabola passes through the midpoint of the intercepts; the vertex lies on that axis.",
          ),
          step(
            "calculation",
            `$x_v = \\frac{${r1} + ${r2}}{2} = ${xv}$<br>Con la forma factorizada $y = \\left(x ${r1 < 0 ? "+" : "-"} ${Math.abs(r1)}\\right)\\left(x ${r2 < 0 ? "+" : "-"} ${Math.abs(r2)}\\right)$:<br>$y_v = \\left(${xv} ${r1 < 0 ? "+" : "-"} ${Math.abs(r1)}\\right)\\left(${xv} ${r2 < 0 ? "+" : "-"} ${Math.abs(r2)}\\right) = ${xv - r1} \\cdot ${xv - r2} = ${yv}$`,
            `$x_v = \\frac{${r1} + ${r2}}{2} = ${xv}$<br>With the factored form $y = \\left(x ${r1 < 0 ? "+" : "-"} ${Math.abs(r1)}\\right)\\left(x ${r2 < 0 ? "+" : "-"} ${Math.abs(r2)}\\right)$:<br>$y_v = \\left(${xv} ${r1 < 0 ? "+" : "-"} ${Math.abs(r1)}\\right)\\left(${xv} ${r2 < 0 ? "+" : "-"} ${Math.abs(r2)}\\right) = ${xv - r1} \\cdot ${xv - r2} = ${yv}$`,
          ),
          step(
            "result",
            `El vértice es $(${xv}, ${yv})$; su ordenada es $${yv}$.`,
            `The vertex is $(${xv}, ${yv})$; its y-coordinate is $${yv}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Applications                                                     */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "quad-app-01",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "applications",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 240,
      tags: ["word-problems", "consecutive-integers"],
      prerequisites: ["factoring"],
    },
    (rng) => {
      const n = rng.int(3, 12);
      const N = n * (n + 1);
      return {
        skill: L("Números consecutivos con producto dado", "Consecutive integers with a given product"),
        statement: L(
          `El producto de dos números enteros positivos consecutivos es $${N}$. ¿Cuál es el **menor** de los dos?`,
          `The product of two consecutive positive integers is $${N}$. What is the **smaller** one?`,
        ),
        answer: { kind: "numeric", value: n },
        hints: [
          L(
            "Llama $x$ al número menor; el siguiente consecutivo es $x + 1$.",
            "Call the smaller number $x$; the next consecutive one is $x + 1$.",
          ),
          L(
            `Plantea la ecuación cuadrática $x(x + 1) = ${N}$.`,
            `Set up the quadratic equation $x(x + 1) = ${N}$.`,
          ),
          L(
            "Pasa todo a un lado y factoriza (o usa la fórmula cuadrática). Una de las soluciones será negativa.",
            "Move everything to one side and factor (or use the quadratic formula). One solution will be negative.",
          ),
        ],
        answerDisplay: L(`$${n}$`, `$${n}$`),
        solution: [
          step(
            "given",
            `Dos enteros consecutivos con producto $${N}$.`,
            `Two consecutive integers with product $${N}$.`,
          ),
          step(
            "approach",
            "Con $x$ = menor, planteamos $x(x+1) = N$ y resolvemos la cuadrática.",
            "With $x$ = the smaller one, we set up $x(x+1) = N$ and solve the quadratic.",
          ),
          step(
            "calculation",
            `$x^2 + x - ${N} = 0$<br>Buscamos dos números que multipliquen $-${N}$ y resten $1$: $${n + 1}$ y $${-n}$.<br>$(x + ${n + 1})(x - ${n}) = 0$<br>$x = -${n + 1}$ (se descarta: los números son positivos) o $x = ${n}$.`,
            `$x^2 + x - ${N} = 0$<br>We look for two numbers multiplying to $-${N}$ and differing by $1$: $${n + 1}$ and $${-n}$.<br>$(x + ${n + 1})(x - ${n}) = 0$<br>$x = -${n + 1}$ (discarded: the integers are positive) or $x = ${n}$.`,
          ),
          step(
            "result",
            `Los números son $${n}$ y $${n + 1}$ ($${n} \\cdot ${n + 1} = ${N}$); el menor es $${n}$.`,
            `The numbers are $${n}$ and $${n + 1}$ ($${n} \\cdot ${n + 1} = ${N}$); the smaller is $${n}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Challenge: parameter for a double root                           */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "quad-chal-01",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "discriminant",
      difficulty: "challenge",
      questionType: "numeric",
      estimatedTimeSec: 270,
      tags: ["discriminant", "parameters", "reverse-thinking"],
      prerequisites: ["discriminant"],
    },
    (rng) => {
      const c = rng.pick([4, 9, 16, 25]);
      const k = 2 * Math.sqrt(c);
      return {
        skill: L("Condición de raíz doble al revés", "Double-root condition in reverse"),
        statement: L(
          `¿Para qué valor **positivo** de $k$ tiene la ecuación $x^2 + kx + ${c} = 0$ exactamente una solución real?`,
          `For which **positive** value of $k$ does $x^2 + kx + ${c} = 0$ have exactly one real solution?`,
        ),
        answer: { kind: "numeric", value: k },
        hints: [
          L(
            "\"Exactamente una solución real\" significa que la raíz es doble.",
            "\"Exactly one real solution\" means the root is double.",
          ),
          L(
            "Eso ocurre cuando el discriminante vale exactamente 0.",
            "That happens when the discriminant is exactly 0.",
          ),
          L(
            `Plantea $k^2 - 4 \\cdot ${c} = 0$ y despeja $k$ (con $k > 0$).`,
            `Write $k^2 - 4 \\cdot ${c} = 0$ and solve for $k$ (with $k > 0$).`,
          ),
        ],
        answerDisplay: L(`$k = ${k}$`, `$k = ${k}$`),
        solution: [
          step(
            "given",
            `$x^2 + kx + ${c} = 0$ con $a = 1$, $b = k$, $c = ${c}$.`,
            `$x^2 + kx + ${c} = 0$ with $a = 1$, $b = k$, $c = ${c}$.`,
          ),
          step(
            "approach",
            "Una única solución real ⇔ discriminante nulo: $\\Delta = k^2 - 4c = 0$.",
            "A single real solution ⇔ zero discriminant: $\\Delta = k^2 - 4c = 0$.",
          ),
          step(
            "calculation",
            `$k^2 - 4 \\cdot ${c} = 0$<br>$k^2 = ${4 * c}$<br>$k = \\pm\\sqrt{${4 * c}} = \\pm ${k}$<br>Se pide el valor positivo.`,
            `$k^2 - 4 \\cdot ${c} = 0$<br>$k^2 = ${4 * c}$<br>$k = \\pm\\sqrt{${4 * c}} = \\pm ${k}$<br>The positive value is required.`,
          ),
          step(
            "result",
            `$k = ${k}$: con ese valor, $x^2 + ${k}x + ${c} = \\left(x + ${k / 2}\\right)^2$ tiene la solución doble $x = -${k / 2}$.`,
            `$k = ${k}$: with this value, $x^2 + ${k}x + ${c} = \\left(x + ${k / 2}\\right)^2$ has the double solution $x = -${k / 2}$.`,
          ),
        ],
      };
    },
  ),
];
