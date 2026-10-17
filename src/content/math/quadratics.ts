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
      const h = rng.nonZeroInt(-7, 7);
      const k = rng.nonZeroInt(-8, 8);
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
      // Leading coefficient a ∈ {1..5}; roots stay distinct nonzero integers in −12..12.
      const a = rng.pick([1, 2, 3, 4, 5]);
      const r1 = rng.nonZeroInt(-12, 12);
      let r2 = rng.nonZeroInt(-12, 12);
      if (r2 === r1) r2 = r1 === 1 ? 2 : r1 === -1 ? -2 : r1 > 0 ? r1 - 1 : r1 + 1; // distinct, nonzero roots
      const lo = Math.min(r1, r2);
      const hi = Math.max(r1, r2);
      const shape = rng.pick(["larger", "smaller", "sum"] as const);
      const b = -a * (r1 + r2);
      const c = a * r1 * r2;
      const value = shape === "larger" ? hi : shape === "smaller" ? lo : r1 + r2;
      const askEs =
        shape === "larger"
          ? "la **mayor** de las dos soluciones"
          : shape === "smaller"
            ? "la **menor** de las dos soluciones"
            : "la **suma** de las dos soluciones";
      const askEn =
        shape === "larger"
          ? "the **larger** of the two solutions"
          : shape === "smaller"
            ? "the **smaller** of the two solutions"
            : "the **sum** of the two solutions";
      return {
        skill: L("Resolver factorizando", "Solving by factoring"),
        statement: L(
          `Resuelve $${poly([a, b, c], ["x^2", "x", ""])} = 0$ y da ${askEs}.`,
          `Solve $${poly([a, b, c], ["x^2", "x", ""])} = 0$ and give ${askEn}.`,
        ),
        answer: { kind: "numeric", value },
        hints: [
          L(
            "Si el coeficiente de $x^2$ no es 1, saca primero el factor común o divide la ecuación entre él; luego busca dos números que multiplicados den el término independiente y sumados, el coeficiente de $x$ (con su signo).",
            "If the coefficient of $x^2$ is not 1, first take out the common factor or divide the equation by it; then look for two numbers whose product is the constant term and whose sum is the coefficient of $x$ (with its sign).",
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
        answerDisplay: L(
          shape === "sum" ? `$x_1 + x_2 = ${value}$` : `$x = ${value}$`,
          shape === "sum" ? `$x_1 + x_2 = ${value}$` : `$x = ${value}$`,
        ),
        solution: [
          step(
            "given",
            `$${poly([a, b, c], ["x^2", "x", ""])} = 0$`,
            `$${poly([a, b, c], ["x^2", "x", ""])} = 0$`,
          ),
          step(
            "approach",
            "Factorizamos el trinomio (con factor común si lo hay) y aplicamos la propiedad del producto cero.",
            "Factor the trinomial (with a common factor if there is one) and apply the zero-product property.",
          ),
          step(
            "calculation",
            `$${poly([a, b, c], ["x^2", "x", ""])} = ${a === 1 ? "" : a}\\left(${linFac(r1)}\\right)\\left(${linFac(r2)}\\right) = 0$<br>${linFac(r1)} = 0 \\Rightarrow x = ${r1}$<br>${linFac(r2)} = 0 \\Rightarrow x = ${r2}$`,
            `$${poly([a, b, c], ["x^2", "x", ""])} = ${a === 1 ? "" : a}\\left(${linFac(r1)}\\right)\\left(${linFac(r2)}\\right) = 0$<br>${linFac(r1)} = 0 \\Rightarrow x = ${r1}$<br>${linFac(r2)} = 0 \\Rightarrow x = ${r2}$`,
          ),
          step(
            "result",
            shape === "sum"
              ? `Las soluciones son $${lo}$ y $${hi}$; su suma es $${value}$.`
              : `Las soluciones son $${lo}$ y $${hi}$; la ${shape === "larger" ? "mayor" : "menor"} es $${value}$.`,
            shape === "sum"
              ? `The solutions are $${lo}$ and $${hi}$; their sum is $${value}$.`
              : `The solutions are $${lo}$ and $${hi}$; the ${shape === "larger" ? "larger" : "smaller"} one is $${value}$.`,
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
      const p = rng.pick([2, 3, 4, 5]);
      const m = rng.pick(
        p === 2
          ? [1, 3, 5, 7, 9, 11]
          : p === 3
            ? [1, 2, 4, 5, 7, 8, 10, 11]
            : p === 4
              ? [1, 2, 3, 5, 6, 7, 9, 10, 11]
              : [1, 2, 3, 4, 6, 7, 8, 9, 11, 12],
      );
      const n = rng.int(1, 7);
      const askNonInteger = rng.bool();
      const b = p * n - m;
      const c = -m * n;
      return {
        skill: L("Factorizar con coeficiente principal distinto de 1", "Factoring with leading coefficient ≠ 1"),
        statement: L(
          askNonInteger
            ? `Resuelve $${poly([p, b, c], ["x^2", "x", ""])} = 0$ y da la solución que **no** es entera (puedes escribirla como fracción, por ejemplo 3/2).`
            : `Resuelve $${poly([p, b, c], ["x^2", "x", ""])} = 0$ y da la solución **entera**.`,
          askNonInteger
            ? `Solve $${poly([p, b, c], ["x^2", "x", ""])} = 0$ and give the **non-integer** solution (you may write it as a fraction, e.g. 3/2).`
            : `Solve $${poly([p, b, c], ["x^2", "x", ""])} = 0$ and give the **integer** solution.`,
        ),
        answer: { kind: "numeric", value: askNonInteger ? m / p : -n },
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
        answerDisplay: L(
          askNonInteger ? `$x = \\frac{${m}}{${p}}$` : `$x = -${n}$`,
          askNonInteger ? `$x = \\frac{${m}}{${p}}$` : `$x = -${n}$`,
        ),
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
            askNonInteger
              ? `Las soluciones son $\\frac{${m}}{${p}}$ y $-${n}$; la no entera es $\\frac{${m}}{${p}}$.`
              : `Las soluciones son $\\frac{${m}}{${p}}$ y $-${n}$; la entera es $-${n}$.`,
            askNonInteger
              ? `The solutions are $\\frac{${m}}{${p}}$ and $-${n}$; the non-integer one is $\\frac{${m}}{${p}}$.`
              : `The solutions are $\\frac{${m}}{${p}}$ and $-${n}$; the integer one is $-${n}$.`,
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
      const a = rng.pick([2, 3, 4, 5]);
      const t = rng.int(1, 6); // integer (positive) root
      const m = rng.pick(
        a === 2
          ? [1, 3, 5, 7, 9, 11]
          : a === 3
            ? [1, 2, 4, 5, 7, 8, 10, 11]
            : a === 4
              ? [1, 2, 3, 5, 6, 7, 9, 10, 11]
              : [1, 2, 3, 4, 6, 7, 8, 9, 11, 12],
      );
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
      const a = rng.pick([1, 2, 3]);
      const b = rng.nonZeroInt(-12, 12);
      const c = rng.int(-9, 9);
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
      const a = rng.pick([1, 2]);
      let b = 0;
      let c = 0;
      if (kind === 0) {
        const r1 = rng.nonZeroInt(-9, 9);
        let r2 = rng.nonZeroInt(-9, 9);
        if (r2 === r1) r2 = r1 === 1 ? 2 : r1 === -1 ? -2 : r1 > 0 ? r1 - 1 : r1 + 1;
        b = -a * (r1 + r2);
        c = a * r1 * r2;
      } else if (kind === 1) {
        const r = rng.nonZeroInt(-9, 9);
        b = -2 * a * r;
        c = a * r * r;
      } else {
        const [bp, cp] = rng.pick([
          [2, 2],
          [3, 3],
          [4, 5],
          [5, 7],
          [6, 10],
          [3, 5],
          [7, 13],
          [2, 3],
        ]);
        b = a * bp;
        c = a * cp;
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
      const m = rng.nonZeroInt(-9, 9);
      const b = 2 * m;
      const c = rng.int(-12, 12);
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
      const a = rng.pick([1, 2, 3, 4, 5]);
      const h = rng.nonZeroInt(-7, 7);
      const k = rng.nonZeroInt(-9, 9);
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
      const h = rng.nonZeroInt(-4, 4);
      const k = rng.intExcluding(-4, 4, [0, h, -h]);
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
      const r1 = -rng.int(1, 7); // negative intercept
      let r2 = rng.int(1, 7); // positive intercept
      if ((r1 + r2) % 2 !== 0) r2 = r2 === 7 ? 6 : r2 + 1; // same parity
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
          xMin: r1 - 2,
          xMax: r2 + 2,
          yMin: Math.min(-18, yv - 6),
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
      const n = rng.int(3, 15);
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
      const c = rng.pick([4, 9, 16, 25, 36, 49]);
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

  /* ---------------------------------------------------------------- */
  /* Roots & Vieta: sum/product of the roots (7-a top-up)              */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "quad-roots-01",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "roots",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 120,
      tags: ["vieta", "roots", "sum-product"],
      prerequisites: ["factoring"],
    },
    (rng) => {
      // Hand-curated integer root pairs: the equation is built from them, so
      // both Vieta answers are exact and the roots are always distinct.
      const sets: [number, number][] = [
        [2, 5],
        [-3, 4],
        [-2, -6],
        [3, -7],
        [1, -6],
        [4, 6],
        [5, -8],
        [-4, -9],
        [7, 2],
        [-5, 10],
        [6, -11],
        [-8, -3],
        [9, -4],
        [-10, -2],
      ];
      const [r1, r2] = rng.pick(sets);
      const b = -(r1 + r2);
      const c = r1 * r2;
      const askSum = rng.bool();
      const value = askSum ? r1 + r2 : r1 * r2;
      return {
        skill: L("Suma y producto de las raíces (Vieta)", "Sum and product of the roots (Vieta)"),
        statement: L(
          `La ecuación $${poly([1, b, c], ["x^2", "x", ""])} = 0$ tiene dos soluciones enteras distintas. Sin resolver la ecuación, usa las relaciones de Vieta para hallar ${askSum ? "la **suma**" : "el **producto**"} de sus dos soluciones.`,
          `The equation $${poly([1, b, c], ["x^2", "x", ""])} = 0$ has two distinct integer solutions. Without solving the equation, use Vieta's formulas to find the **${askSum ? "sum" : "product"}** of its two solutions.`,
        ),
        answer: { kind: "numeric", value },
        hints: [
          L(
            "Las relaciones de Vieta conectan los coeficientes con las soluciones sin resolver la ecuación: para $ax^2 + bx + c = 0$ se cumple $x_1 + x_2 = -\\frac{b}{a}$ y $x_1 \\cdot x_2 = \\frac{c}{a}$.",
            "Vieta's formulas connect the coefficients with the solutions without solving the equation: for $ax^2 + bx + c = 0$, $x_1 + x_2 = -\\frac{b}{a}$ and $x_1 \\cdot x_2 = \\frac{c}{a}$.",
          ),
          L(
            "Mira el coeficiente que acompaña a $x^2$ en tu ecuación: con ese valor de $a$, ambas fórmulas se simplifican mucho.",
            "Look at the coefficient of $x^2$ in your equation: with that value of $a$, both formulas simplify a lot.",
          ),
          askSum
            ? L(
                "La suma es el **opuesto** del coeficiente que acompaña a $x$.",
                "The sum is the **opposite** of the coefficient of $x$.",
              )
            : L(
                "El producto coincide con el **término independiente** de la ecuación.",
                "The product equals the **constant term** of the equation.",
              ),
        ],
        answerDisplay: L(
          askSum ? `$x_1 + x_2 = ${value}$` : `$x_1 \\cdot x_2 = ${value}$`,
          askSum ? `$x_1 + x_2 = ${value}$` : `$x_1 \\cdot x_2 = ${value}$`,
        ),
        solution: [
          step(
            "given",
            `$${poly([1, b, c], ["x^2", "x", ""])} = 0$, con $a = 1$, $b = ${b}$ y $c = ${c}$.`,
            `$${poly([1, b, c], ["x^2", "x", ""])} = 0$, with $a = 1$, $b = ${b}$ and $c = ${c}$.`,
          ),
          step(
            "approach",
            "Aplicamos las relaciones de Vieta, que dan la suma y el producto de las soluciones a partir de los coeficientes.",
            "We apply Vieta's formulas, which give the sum and the product of the solutions from the coefficients.",
          ),
          step(
            "calculation",
            askSum
              ? `$x_1 + x_2 = -\\frac{b}{a} = -\\frac{${b}}{1} = ${-b}$<br>Comprobación factorizando: $x^2 ${op(b)}x ${op(c)} = \\left(${linFac(r1)}\\right)\\left(${linFac(r2)}\\right) = 0$, con soluciones $${r1}$ y $${r2}$.`
              : `$x_1 \\cdot x_2 = \\frac{c}{a} = \\frac{${c}}{1} = ${c}$<br>Comprobación factorizando: $x^2 ${op(b)}x ${op(c)} = \\left(${linFac(r1)}\\right)\\left(${linFac(r2)}\\right) = 0$, con soluciones $${r1}$ y $${r2}$.`,
            askSum
              ? `$x_1 + x_2 = -\\frac{b}{a} = -\\frac{${b}}{1} = ${-b}$<br>Check by factoring: $x^2 ${op(b)}x ${op(c)} = \\left(${linFac(r1)}\\right)\\left(${linFac(r2)}\\right) = 0$, with solutions $${r1}$ and $${r2}$.`
              : `$x_1 \\cdot x_2 = \\frac{c}{a} = \\frac{${c}}{1} = ${c}$<br>Check by factoring: $x^2 ${op(b)}x ${op(c)} = \\left(${linFac(r1)}\\right)\\left(${linFac(r2)}\\right) = 0$, with solutions $${r1}$ and $${r2}$.`,
          ),
          step(
            "result",
            askSum
              ? `La suma de las dos soluciones es $${value}$.`
              : `El producto de las dos soluciones es $${value}$.`,
            `The ${askSum ? "sum" : "product"} of the two solutions is $${value}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Roots & Vieta: recover the parameter k from one root              */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "quad-roots-02",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "roots",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 180,
      tags: ["vieta", "roots", "parameters"],
      prerequisites: ["factoring"],
    },
    (rng) => {
      // Hand-curated (stated root, other root): the equation x² + bx + k = 0
      // is built from both, so k is an exact integer.
      const sets: { s: number; o: number }[] = [
        { s: 4, o: 2 },
        { s: -3, o: 5 },
        { s: 1, o: -6 },
        { s: 3, o: -7 },
        { s: -2, o: -5 },
        { s: 5, o: 1 },
        { s: -8, o: 3 },
        { s: 6, o: -4 },
        { s: -7, o: -2 },
        { s: 9, o: -1 },
        { s: 2, o: -10 },
        { s: -4, o: -9 },
        { s: 10, o: 2 },
        { s: -11, o: 1 },
      ];
      const p = rng.pick(sets);
      const b = -(p.s + p.o);
      const k = p.s * p.o;
      const sTex = p.s < 0 ? `(${p.s})` : `${p.s}`;
      return {
        skill: L("Recuperar un parámetro con Vieta", "Recovering a parameter with Vieta"),
        statement: L(
          `Se sabe que $x = ${p.s}$ es una de las dos soluciones enteras de la ecuación $x^2 ${op(b)}x + k = 0$. ¿Cuál es el valor del parámetro $k$?`,
          `It is known that $x = ${p.s}$ is one of the two integer solutions of the equation $x^2 ${op(b)}x + k = 0$. What is the value of the parameter $k$?`,
        ),
        answer: { kind: "numeric", value: k },
        hints: [
          L(
            "Con $a = 1$, la **suma** de las dos soluciones es el opuesto del coeficiente de $x$.",
            "With $a = 1$, the **sum** of the two solutions is the opposite of the coefficient of $x$.",
          ),
          L(
            "Ya conoces una solución $x_1$; la otra sale de esa suma: $x_2 = -b - x_1$.",
            "You already know one solution $x_1$; the other one follows from that sum: $x_2 = -b - x_1$.",
          ),
          L(
            "El parámetro pedido $k$ es el **producto** de las dos soluciones; también puedes sustituir la solución conocida en la ecuación y despejar $k$.",
            "The requested parameter $k$ is the **product** of the two solutions; you can also substitute the known solution into the equation and solve for $k$.",
          ),
        ],
        answerDisplay: L(`$k = ${k}$`, `$k = ${k}$`),
        solution: [
          step(
            "given",
            `$x^2 ${op(b)}x + k = 0$ con $b = ${b}$; una solución es $x_1 = ${p.s}$ y existe otra solución entera $x_2$.`,
            `$x^2 ${op(b)}x + k = 0$ with $b = ${b}$; one solution is $x_1 = ${p.s}$ and there is another integer solution $x_2$.`,
          ),
          step(
            "approach",
            "Usamos Vieta para la suma (hallar la otra solución) y para el producto (hallar $k$).",
            "We use Vieta for the sum (to find the other solution) and for the product (to find $k$).",
          ),
          step(
            "calculation",
            `$x_1 + x_2 = -b = ${-b}$<br>$x_2 = ${-b} - ${sTex} = ${p.o}$<br>$k = x_1 \\cdot x_2 = ${sTex} \\cdot ${p.o < 0 ? `(${p.o})` : p.o} = ${k}$`,
            `$x_1 + x_2 = -b = ${-b}$<br>$x_2 = ${-b} - ${sTex} = ${p.o}$<br>$k = x_1 \\cdot x_2 = ${sTex} \\cdot ${p.o < 0 ? `(${p.o})` : p.o} = ${k}$`,
          ),
          step(
            "result",
            `$k = ${k}$. Comprobación sustituyendo $x = ${p.s}$: $${sTex}^2 ${op(b * p.s)} ${op(k)} = 0$.`,
            `$k = ${k}$. Check by substituting $x = ${p.s}$: $${sTex}^2 ${op(b * p.s)} ${op(k)} = 0$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Curated — Studienkolleg Bayern, Übungsaufgaben (Stand Jan 18),   */
  /* problema de parámetros con discriminante. Transcribed as printed;*/
  /* verified: Delta=(k-6)(k+2)>0 iff k<-2 or k>6. Fixed problem.      */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "quad-param-01",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "discriminant",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["discriminant", "parameters", "quadratic-inequality"],
      prerequisites: ["quadratic-formula"],
      source: {
        sourceId: "stk-bayern-ubung",
        license: "OPEN_LICENSE",
        exerciseNumber: "4 (For which real values of k)",
      },
      reasoning: "parameters",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L("$k < -2$ o $k > 6$", "$k < -2$ or $k > 6$"),
          correct: true,
        },
        {
          id: "b",
          text: L("$-2 < k < 6$", "$-2 < k < 6$"),
          correct: false,
        },
        {
          id: "c",
          text: L("$k > 6$ únicamente", "$k > 6$ only"),
          correct: false,
        },
        {
          id: "d",
          text: L("para todo $k$ real", "for every real $k$"),
          correct: false,
        },
      ];
      return {
        skill: L("Parámetro en una cuadrática: número de soluciones", "Parameter in a quadratic: number of solutions"),
        statement: L(
            "¿Para qué valores reales de $k$ tiene la ecuación $$x^2 - kx + k + 3 = 0$$ exactamente dos soluciones reales distintas?",
            "For which real values of $k$ does the equation $$x^2 - kx + k + 3 = 0$$ have exactly two distinct real solutions?",
          ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L("«Exactamente dos soluciones reales distintas» es una condición sobre el **discriminante** de la cuadrática (en $x$).", "“Exactly two distinct real solutions” is a condition on the quadratic's **discriminant** (in $x$)."),
          L("Escribe $\\Delta = k^2 - 4(k+3)$ y simplifica: $\\Delta = k^2 - 4k - 12$. Factorízalo.", "Write $\\Delta = k^2 - 4(k+3)$ and simplify: $\\Delta = k^2 - 4k - 12$. Factor it."),
          L("$\\Delta = (k-6)(k+2)$. «Dos distintas» exige $\\Delta > 0$ estricto: resuelve la desigualdad y describe la región.", "$\\Delta = (k-6)(k+2)$. “Two distinct” requires strict $\\Delta > 0$: solve the inequality and describe the region.")
        ],
        answerDisplay: L("$k < -2$ o $k > 6$", "$k < -2$ or $k > 6$"),
        solution: [
          step(
            "given",
            "La cuadrática $x^2 - kx + k + 3 = 0$ con coeficientes $a = 1$, $b = -k$, $c = k+3$; se pregunta por el número de soluciones reales distintas según $k$.",
            "The quadratic $x^2 - kx + k + 3 = 0$ with $a = 1$, $b = -k$, $c = k+3$; the question is about the number of distinct real solutions as $k$ varies.",
          ),
          step(
            "approach",
            "El número de raíces reales distintas lo gobierna el discriminante: $\\Delta > 0$ dos distintas, $\\Delta = 0$ una doble, $\\Delta < 0$ ninguna. Como pedimos **dos distintas**, la condición es $\\Delta > 0$ (estricto).",
            "The number of distinct real roots is governed by the discriminant: $\\Delta > 0$ two distinct, $\\Delta = 0$ one double, $\\Delta < 0$ none. Since we need **two distinct**, the condition is strict $\\Delta > 0$.",
          ),
          step(
            "calculation",
            "$\\Delta = (-k)^2 - 4\\cdot 1 \\cdot (k+3) = k^2 - 4k - 12 = (k-6)(k+2)$.<br>$\\Delta > 0 \\iff (k-6)(k+2) > 0$: producto positivo ⟺ ambos factores positivos ($k > 6$) o ambos negativos ($k < -2$).<br>Controles: $k = 0 \\in (-2, 6)$ debería fallar — en efecto $x^2 + 3 = 0$ no tiene raíces reales. $k = 7 > 6$ debería valer — $x^2 - 7x + 10 = (x-5)(x-2)$: dos raíces distintas.",
            "$\\Delta = (-k)^2 - 4\\cdot 1 \\cdot (k+3) = k^2 - 4k - 12 = (k-6)(k+2)$.<br>$\\Delta > 0 \\iff (k-6)(k+2) > 0$: a positive product ⟺ both factors positive ($k > 6$) or both negative ($k < -2$).<br>Sanity checks: $k = 0 \\in (-2, 6)$ should fail — indeed $x^2 + 3 = 0$ has no real roots. $k = 7 > 6$ should work — $x^2 - 7x + 10 = (x-5)(x-2)$: two distinct roots.",
          ),
          step(
            "result",
            "La ecuación tiene exactamente dos soluciones reales distintas $\\iff k \\in (-\\infty, -2) \\cup (6, \\infty)$.",
            "The equation has exactly two distinct real solutions $\\iff k \\in (-\\infty, -2) \\cup (6, \\infty)$.",
          )
        ],
      };
    },
  ),


  /* ---------------------------------------------------------------- */
  /* Curated Phase 2 — FOS/BOS 2010 HT §2.0 y FOS/BOS 2011 §2         */
  /* (vértice, posición de un punto, raíces con redondeo).            */
  /* Transcribed as printed; verified independently. Fixed problems.  */
  /* ---------------------------------------------------------------- */

  /* FOS/BOS 2010, 2.2 — vértice desde la forma general. */
  template(
    {
      id: "quad-vertex-02",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "vertex",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 180,
      tags: ["vertex", "general-form", "exam"],
      prerequisites: ["completing-square"],
      source: {
        sourceId: "fos-bos-2010-ht",
        license: "OPEN_LICENSE",
        exerciseNumber: "2.2",
      },
      reasoning: "graphical",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$S(1\\,|\\,1)$", "$S(1\\,|\\,1)$"), correct: true },
        { id: "b", text: L("$S(1\\,|\\,-1)$", "$S(1\\,|\\,-1)$"), correct: false },
        { id: "c", text: L("$S(2\\,|\\,-2)$", "$S(2\\,|\\,-2)$"), correct: false },
        { id: "d", text: L("$S(-1\\,|\\,1)$", "$S(-1\\,|\\,1)$"), correct: false },
      ];
      return {
        skill: L("Vértice desde la forma general (examen real)", "Vertex from the general form (real exam)"),
        statement: L(
          "Calcula el vértice de la parábola con ecuación $$y = -3x^2 + 6x - 2$$",
          "Compute the vertex of the parabola with equation $$y = -3x^2 + 6x - 2$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "De la forma general a la de vértice: completa el cuadrado, o usa $x_S = -\\frac{b}{2a}$.",
            "From the general form to the vertex form: complete the square, or use $x_S = -\\frac{b}{2a}$.",
          ),
          L(
            "Aquí $a = -3$ y $b = 6$: $x_S = -\\frac{6}{2 \\cdot (-3)} = 1$.",
            "Here $a = -3$ and $b = 6$: $x_S = -\\frac{6}{2 \\cdot (-3)} = 1$.",
          ),
          L(
            "Sustituye en la ecuación para la altura: $y_S = -3(1)^2 + 6(1) - 2$.",
            "Substitute back for the height: $y_S = -3(1)^2 + 6(1) - 2$.",
          ),
        ],
        answerDisplay: L("$S(1\\,|\\,1)$, con forma de vértice $y = -3(x-1)^2 + 1$", "$S(1\\,|\\,1)$, vertex form $y = -3(x-1)^2 + 1$"),
        solution: [
          step(
            "given",
            "La parábola $y = -3x^2 + 6x - 2$ en forma general ($a = -3$, $b = 6$, $c = -2$; abre hacia abajo).",
            "The parabola $y = -3x^2 + 6x - 2$ in general form ($a = -3$, $b = 6$, $c = -2$; opens downward).",
          ),
          step(
            "approach",
            "El vértice está en el eje de simetría $x_S = -\\frac{b}{2a}$; su altura se obtiene sustituyendo. Alternativa: completar el cuadrado para leer $S$ directamente.",
            "The vertex lies on the symmetry axis $x_S = -\\frac{b}{2a}$; its height comes from substitution. Alternative: complete the square to read $S$ directly.",
          ),
          step(
            "calculation",
            "$x_S = -\\dfrac{6}{2(-3)} = -\\dfrac{6}{-6} = 1$.<br>$y_S = -3(1)^2 + 6(1) - 2 = -3 + 6 - 2 = 1$.<br>Completando el cuadrado: $y = -3\\left(x^2 - 2x\\right) - 2 = -3\\left(x - 1\\right)^2 + 3 - 2 = -3(x-1)^2 + 1$ ✓ mismo vértice.",
            "$x_S = -\\dfrac{6}{2(-3)} = -\\dfrac{6}{-6} = 1$.<br>$y_S = -3(1)^2 + 6(1) - 2 = -3 + 6 - 2 = 1$.<br>Completing the square: $y = -3\\left(x^2 - 2x\\right) - 2 = -3\\left(x - 1\\right)^2 + 3 - 2 = -3(x-1)^2 + 1$ ✓ same vertex.",
          ),
          step(
            "result",
            "$S(1\\,|\\,1)$. Como $a = -3 < 0$, es un **máximo** — la parábola abre hacia abajo.",
            "$S(1\\,|\\,1)$. Since $a = -3 < 0$, it is a **maximum** — the parabola opens downward.",
          ),
        ],
      };
    },
  ),

  /* FOS/BOS 2010, 2.3 — posición de un punto frente a la parábola. */
  template(
    {
      id: "quad-graph-03",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "graphs",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["point-position", "substitution", "graph", "exam"],
      prerequisites: ["standard-form"],
      source: {
        sourceId: "fos-bos-2010-ht",
        license: "OPEN_LICENSE",
        exerciseNumber: "2.3",
      },
      reasoning: "graphical",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("Debajo de la parábola", "Below the parabola"), correct: true },
        { id: "b", text: L("Encima de la parábola", "Above the parabola"), correct: false },
        { id: "c", text: L("Exactamente sobre la parábola", "Exactly on the parabola"), correct: false },
        {
          id: "d",
          text: L("No se puede decidir sin dibujar", "Cannot be decided without drawing"),
          correct: false,
        },
      ];
      return {
        skill: L("Posición de un punto frente a una parábola (examen real)", "Position of a point vs a parabola (real exam)"),
        statement: L(
          "¿El punto $A(-1\\,|\\,10)$ está encima, debajo o exactamente sobre la parábola con ecuación $$y = \\frac{1}{2}(x - 3)(x - 5)\\,?$$",
          "Is the point $A(-1\\,|\\,10)$ above, below or exactly on the parabola with equation $$y = \\frac{1}{2}(x - 3)(x - 5)\\,?$$",
        ),
        diagram: {
          kind: "function-graph",
          xMin: -4,
          xMax: 9,
          yMin: -2,
          yMax: 16,
          curves: [{ fn: "0.5*(x-3)*(x-5)", color: "primary" }],
          points: [{ x: -1, y: 10, label: "A(-1, 10)" }],
          showGrid: true,
          xLabel: "x",
          yLabel: "y",
        },
        diagramLabel: L(
          "Parábola que abre hacia arriba con raíces en x = 3 y x = 5; el punto A está en (-1, 10).",
          "Upward-opening parabola with roots at x = 3 and x = 5; the point A is at (-1, 10).",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Sustituye la $x$ de $A$ en la ecuación de la parábola y compara alturas.",
            "Substitute $A$'s $x$ into the parabola's equation and compare heights.",
          ),
          L(
            "$y_{\\text{parábola}}(-1) = \\frac{1}{2}(-1-3)(-1-5) = \\frac{1}{2}(-4)(-6) = 12$.",
            "$y_{\\text{parabola}}(-1) = \\frac{1}{2}(-1-3)(-1-5) = \\frac{1}{2}(-4)(-6) = 12$.",
          ),
          L(
            "La altura de $A$ es $10$. ¿$10$ está por encima o por debajo de $12$ en esa misma $x$?",
            "$A$'s height is $10$. Is $10$ above or below $12$ at that same $x$?",
          ),
        ],
        answerDisplay: L(
          "$A$ está **debajo**: la parábola pasa por $(-1, 12)$ y $10 < 12$.",
          "$A$ lies **below**: the parabola passes through $(-1, 12)$ and $10 < 12$.",
        ),
        solution: [
          step(
            "given",
            "El punto $A(-1\\,|\\,10)$ y la parábola $y = \\frac{1}{2}(x-3)(x-5)$ (forma factorizada: raíces $3$ y $5$, abre hacia arriba).",
            "The point $A(-1\\,|\\,10)$ and the parabola $y = \\frac{1}{2}(x-3)(x-5)$ (factored form: roots $3$ and $5$, opens upward).",
          ),
          step(
            "approach",
            "La posición relativa se decide **calculando**: evalúa la parábola en la $x$ del punto y compara con su $y$. El gráfico solo confirma.",
            "The relative position is decided **by computing**: evaluate the parabola at the point's $x$ and compare with its $y$. The graph only confirms.",
          ),
          step(
            "calculation",
            "$y_p(-1) = \\frac{1}{2}(-4)(-6) = \\frac{1}{2} \\cdot 24 = 12$.<br>El punto de la parábola con $x = -1$ es $(-1\\,|\\,12)$; el punto dado es $(-1\\,|\\,10)$.<br>Como $10 < 12$, $A$ queda por **debajo** de la curva en esa vertical.",
            "$y_p(-1) = \\frac{1}{2}(-4)(-6) = \\frac{1}{2} \\cdot 24 = 12$.<br>The parabola's point at $x = -1$ is $(-1\\,|\\,12)$; the given point is $(-1\\,|\\,10)$.<br>Since $10 < 12$, $A$ lies **below** the curve on that vertical line.",
          ),
          step(
            "result",
            "$A$ está debajo de la parábola. (Contexto: el vértice está en $(4\\,|\\,-\\frac{1}{2})$, el mínimo — por eso la curva sube rápido hacia ambos lados.)",
            "$A$ is below the parabola. (Context: the vertex is at $(4\\,|\\,-\\frac{1}{2})$, the minimum — that is why the curve climbs fast on both sides.)",
          ),
        ],
      };
    },
  ),

  /* FOS/BOS 2011, 2 — raíces con redondeo y vértice. */
  template(
    {
      id: "quad-roots-03",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "roots",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["quadratic-formula", "rounding", "vertex", "exam"],
      prerequisites: ["quadratic-formula", "vertex"],
      source: {
        sourceId: "fos-bos-2011",
        license: "OPEN_LICENSE",
        exerciseNumber: "2",
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "Raíces $\\approx -2.42$ y $-1.58$; $S(-2\\,|\\,2.5)$",
            "Roots $\\approx -2.42$ and $-1.58$; $S(-2\\,|\\,2.5)$",
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            "Raíces $\\approx -2.42$ y $-1.58$; $S(-2\\,|\\,-2.5)$",
            "Roots $\\approx -2.42$ and $-1.58$; $S(-2\\,|\\,-2.5)$",
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            "Raíces $\\approx 2.42$ y $1.58$; $S(2\\,|\\,2.5)$",
            "Roots $\\approx 2.42$ and $1.58$; $S(2\\,|\\,2.5)$",
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            "Raíces $\\approx -2.58$ y $-1.42$; $S(-2\\,|\\,2.5)$",
            "Roots $\\approx -2.58$ and $-1.42$; $S(-2\\,|\\,2.5)$",
          ),
          correct: false,
        },
      ];
      return {
        skill: L("Raíces con redondeo y vértice (examen real 2011)", "Roots with rounding and vertex (real 2011 exam)"),
        statement: L(
          "La parábola $P$ tiene ecuación $p(x) = -14x^2 - 56x - 53.5$ con $x \\in \\mathbb{R}$. Halla sus raíces y las coordenadas del vértice. (Si hace falta, redondea a **dos** decimales.)",
          "The parabola $P$ has equation $p(x) = -14x^2 - 56x - 53.5$ with $x \\in \\mathbb{R}$. Find its roots and the vertex coordinates. (If needed, round to **two** decimals.)",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Los coeficientes son grandes pero la parábola es normal: simplifica dividiendo toda la ecuación entre $-2$.",
            "The coefficients are large but the parabola is ordinary: simplify by dividing the whole equation by $-2$.",
          ),
          L(
            "Tras dividir entre $-2$: $7x^2 + 28x + 26.75 = 0$. El discriminante queda pequeño y positivo.",
            "After dividing by $-2$: $7x^2 + 28x + 26.75 = 0$. The discriminant comes out small and positive.",
          ),
          L(
            "$\\Delta = 28^2 - 4 \\cdot 7 \\cdot 26.75 = 35$, así que $x_{1,2} = \\frac{-28 \\pm \\sqrt{35}}{14}$. Para el vértice: $x_S = -\\frac{28}{2 \\cdot 7}$.",
            "$\\Delta = 28^2 - 4 \\cdot 7 \\cdot 26.75 = 35$, so $x_{1,2} = \\frac{-28 \\pm \\sqrt{35}}{14}$. For the vertex: $x_S = -\\frac{28}{2 \\cdot 7}$.",
          ),
        ],
        answerDisplay: L(
          "Raíces $\\approx -2.42$ y $-1.58$; vértice $S(-2\\,|\\,2.5)$",
          "Roots $\\approx -2.42$ and $-1.58$; vertex $S(-2\\,|\\,2.5)$",
        ),
        solution: [
          step(
            "given",
            "$p(x) = -14x^2 - 56x - 53.5$; abre hacia abajo. Con el objetivo de raíces y vértice, y redondeo a dos decimales.",
            "$p(x) = -14x^2 - 56x - 53.5$; opens downward. Goal: roots and vertex, rounding to two decimals.",
          ),
          step(
            "approach",
            "Reducir el tamaño de los números dividiendo entre $-2$, aplicar la fórmula cuadrática y la fórmula del vértice. El redondeo es la parte final, no un sustituto del cálculo.",
            "Shrink the numbers by dividing by $-2$, apply the quadratic formula and the vertex formula. Rounding is the final step, not a substitute for computing.",
          ),
          step(
            "calculation",
            "Entre $-2$: $7x^2 + 28x + 26.75 = 0$ con $\\Delta = 28^2 - 4 \\cdot 7 \\cdot 26.75 = 784 - 749 = 35$.<br>$x_{1,2} = \\dfrac{-28 \\pm \\sqrt{35}}{14} = \\dfrac{-28 \\pm 5.916}{14}$ → $x_1 \\approx -1.58$, $x_2 \\approx -2.42$.<br>Vértice: $x_S = -\\dfrac{28}{2 \\cdot 7} = -2$; $p(-2) = -14 \\cdot 4 + 112 - 53.5 = 2.5$ → $S(-2\\,|\\,2.5)$.<br>Congruencia: vértice por encima del eje ($2.5 > 0$) con parábola hacia abajo ⟹ dos raíces reales a ambos lados de $x = -2$ ✓",
            "By $-2$: $7x^2 + 28x + 26.75 = 0$ with $\\Delta = 28^2 - 4 \\cdot 7 \\cdot 26.75 = 784 - 749 = 35$.<br>$x_{1,2} = \\dfrac{-28 \\pm \\sqrt{35}}{14} = \\dfrac{-28 \\pm 5.916}{14}$ → $x_1 \\approx -1.58$, $x_2 \\approx -2.42$.<br>Vertex: $x_S = -\\dfrac{28}{2 \\cdot 7} = -2$; $p(-2) = -14 \\cdot 4 + 112 - 53.5 = 2.5$ → $S(-2\\,|\\,2.5)$.<br>Consistency: vertex above the axis ($2.5 > 0$) with a downward parabola ⟹ two real roots on both sides of $x = -2$ ✓",
          ),
          step(
            "result",
            "Raíces $x_1 \\approx -1.58$ y $x_2 \\approx -2.42$ (redondeadas), vértice $S(-2\\,|\\,2.5)$ — coincide con el Lösungsvorschlag oficial del 2011.",
            "Roots $x_1 \\approx -1.58$ and $x_2 \\approx -2.42$ (rounded), vertex $S(-2\\,|\\,2.5)$ — matches the official 2011 Lösungsvorschlag.",
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Parameters: for which k does x² − kx + (k+q) have two distinct   */
  /* real roots? Parameterized family of the curated Bayern item.      */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "quad-param-02",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "discriminant",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["discriminant", "parameters", "quadratic-inequality"],
      prerequisites: ["quadratic-formula"],
      reasoning: "parameters",
    },
    (rng) => {
      // Δ = k² − 4k − 4q = (k − k₁)(k − k₂) with k₁ + k₂ = 4, so both roots
      // of Δ are integers and q is a positive integer.
      const t = rng.pick([
        { k1: 8, k2: -4, q: 8 },
        { k1: 10, k2: -6, q: 15 },
        { k1: 12, k2: -8, q: 24 },
        { k1: 14, k2: -10, q: 35 },
      ]);
      const options: McOption[] = [
        {
          id: "a",
          text: L(`$k < ${t.k2}$ o $k > ${t.k1}$`, `$k < ${t.k2}$ or $k > ${t.k1}$`),
          correct: true,
        },
        {
          id: "b",
          text: L(`$${t.k2} \\le k \\le ${t.k1}$`, `$${t.k2} \\le k \\le ${t.k1}$`),
          correct: false,
        },
        {
          id: "c",
          text: L(`Solo $k > ${t.k1}$`, `Only $k > ${t.k1}$`),
          correct: false,
        },
        {
          id: "d",
          text: L(`Solo $k < ${t.k2}$`, `Only $k < ${t.k2}$`),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Parámetro en una cuadrática: región de k con dos raíces distintas",
          "Parameter in a quadratic: region of k with two distinct roots",
        ),
        statement: L(
          `¿Para qué valores reales de $k$ tiene la ecuación $$x^2 - kx + k + ${t.q} = 0$$ exactamente dos soluciones reales distintas?`,
          `For which real values of $k$ does the equation $$x^2 - kx + k + ${t.q} = 0$$ have exactly two distinct real solutions?`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "«Exactamente dos soluciones reales distintas» es una condición sobre el **discriminante** de la cuadrática (en $x$).",
            "“Exactly two distinct real solutions” is a condition on the quadratic's **discriminant** (in $x$).",
          ),
          L(
            `Escribe $\\Delta = k^2 - 4(k + ${t.q})$ y simplifica: $\\Delta = k^2 - 4k - ${4 * t.q}$. Factoriza ese trinomio en $k$.`,
            `Write $\\Delta = k^2 - 4(k + ${t.q})$ and simplify: $\\Delta = k^2 - 4k - ${4 * t.q}$. Factor that trinomial in $k$.`,
          ),
          L(
            "«Dos distintas» exige $\\Delta > 0$ **estricto**: estudia el signo del producto y describe la región completa.",
            "“Two distinct” requires **strict** $\\Delta > 0$: study the sign of the product and describe the full region.",
          ),
        ],
        answerDisplay: L(
          `$k < ${t.k2}$ o $k > ${t.k1}$`,
          `$k < ${t.k2}$ or $k > ${t.k1}$`,
        ),
        solution: [
          step(
            "given",
            `La cuadrática $x^2 - kx + k + ${t.q} = 0$ con $a = 1$, $b = -k$, $c = k + ${t.q}$; se pregunta por cuáles $k$ tiene dos soluciones reales distintas.`,
            `The quadratic $x^2 - kx + k + ${t.q} = 0$ with $a = 1$, $b = -k$, $c = k + ${t.q}$; the question is for which $k$ it has two distinct real solutions.`,
          ),
          step(
            "approach",
            "El número de raíces reales distintas lo decide el discriminante: dos distintas ⇔ $\\Delta > 0$ estricto ($\\Delta = 0$ daría una raíz doble).",
            "The number of distinct real roots is decided by the discriminant: two distinct ⇔ strict $\\Delta > 0$ ($\\Delta = 0$ would give a double root).",
          ),
          step(
            "calculation",
            `$\\Delta = (-k)^2 - 4 \\cdot 1 \\cdot (k + ${t.q}) = k^2 - 4k - ${4 * t.q} = (k - ${t.k1})(k + ${-t.k2})$<br>$\\Delta > 0 \\iff (k - ${t.k1})(k + ${-t.k2}) > 0$: ambos factores positivos ($k > ${t.k1}$) o ambos negativos ($k < ${t.k2}$).<br>Controles: con $k = 0$ (dentro del intervalo prohibido) $\\Delta = -${4 * t.q} < 0$ ✗; con $k = ${t.k1 + 1} > ${t.k1}$ hay dos raíces ✓; con $k = ${t.k1}$ exactamente, $\\Delta = 0$ (raíz doble, no vale).`,
            `$\\Delta = (-k)^2 - 4 \\cdot 1 \\cdot (k + ${t.q}) = k^2 - 4k - ${4 * t.q} = (k - ${t.k1})(k + ${-t.k2})$<br>$\\Delta > 0 \\iff (k - ${t.k1})(k + ${-t.k2}) > 0$: both factors positive ($k > ${t.k1}$) or both negative ($k < ${t.k2}$).<br>Sanity checks: with $k = 0$ (inside the forbidden interval) $\\Delta = -${4 * t.q} < 0$ ✗; with $k = ${t.k1 + 1} > ${t.k1}$ there are two roots ✓; with exactly $k = ${t.k1}$, $\\Delta = 0$ (double root, not enough).`,
          ),
          step(
            "result",
            `Dos soluciones reales distintas $\\iff k \\in (-\\infty, ${t.k2}) \\cup (${t.k1}, \\infty)$.`,
            `Two distinct real solutions $\\iff k \\in (-\\infty, ${t.k2}) \\cup (${t.k1}, \\infty)$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Challenge: build the equation from sum & difference of the roots  */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "quad-roots-04",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "roots",
      difficulty: "challenge",
      questionType: "expression",
      estimatedTimeSec: 270,
      tags: ["vieta", "roots", "build-equation", "system"],
      prerequisites: ["factoring"],
      reasoning: "modeling",
    },
    (rng) => {
      // Hand-curated pairs r1 > r2 (nonzero, distinct, integer sum ≠ 0):
      // S = r1 + r2 and D = r1 − r2 are the stated constraints.
      const sets: { r1: number; r2: number }[] = [
        { r1: 5, r2: 2 },
        { r1: 6, r2: 1 },
        { r1: 4, r2: -1 },
        { r1: 7, r2: -2 },
        { r1: 1, r2: -4 },
        { r1: 8, r2: 3 },
        { r1: 9, r2: -2 },
        { r1: 2, r2: -7 },
        { r1: 6, r2: -3 },
        { r1: 10, r2: -1 },
        { r1: 3, r2: -8 },
        { r1: 5, r2: -4 },
        { r1: 7, r2: 4 },
        { r1: 2, r2: -9 },
      ];
      const p = rng.pick(sets);
      const S = p.r1 + p.r2;
      const D = p.r1 - p.r2;
      const c = p.r1 * p.r2;
      return {
        skill: L(
          "Construir la ecuación desde la suma y la diferencia de raíces",
          "Building the equation from the sum and difference of the roots",
        ),
        statement: L(
          `Las dos raíces de una ecuación cuadrática mónica suman $${S}$ y se diferencian en $${D}$. Escribe esa ecuación en forma general $x^2 + bx + c = 0$ (por ejemplo, x^2-3x+2).`,
          `The two roots of a monic quadratic equation add up to $${S}$ and differ by $${D}$. Write that equation in general form $x^2 + bx + c = 0$ (e.g. x^2-3x+2).`,
        ),
        answer: {
          kind: "expression",
          accepted: [polyAcc([1, -S, c], ["x^2", "x", ""])],
          variables: ["x"],
        },
        hints: [
          L(
            "Llama $r_1 > r_2$ a las dos raíces: tienes el sistema $r_1 + r_2 = " +
              S +
              "$, $r_1 - r_2 = " +
              D +
              "$.",
            `Call the roots $r_1 > r_2$: you have the system $r_1 + r_2 = ${S}$, $r_1 - r_2 = ${D}$.`,
          ),
          L(
            "Suma y resta las dos ecuaciones del sistema: $r_1 = \\frac{S+D}{2}$ y $r_2 = \\frac{S-D}{2}$ (aquí salen enteras).",
            "Add and subtract the two equations of the system: $r_1 = \\frac{S+D}{2}$ and $r_2 = \\frac{S-D}{2}$ (here they come out as integers).",
          ),
          L(
            "Vieta para una mónica: $b = -(r_1 + r_2)$ y $c = r_1 \\cdot r_2$.",
            "Vieta for a monic equation: $b = -(r_1 + r_2)$ and $c = r_1 \\cdot r_2$.",
          ),
        ],
        answerDisplay: L(
          `$x^2 ${opTerm(-S, "x")} ${op(c)} = 0$`,
          `$x^2 ${opTerm(-S, "x")} ${op(c)} = 0$`,
        ),
        solution: [
          step(
            "given",
            `Restricciones sobre las raíces: $r_1 + r_2 = ${S}$ y $r_1 - r_2 = ${D}$ (con $r_1 > r_2$).`,
            `Constraints on the roots: $r_1 + r_2 = ${S}$ and $r_1 - r_2 = ${D}$ (with $r_1 > r_2$).`,
          ),
          step(
            "approach",
            "Modelamos en dos pasos: primero recuperamos las raíces resolviendo el sistema lineal, después construimos la mónica con Vieta: $(x - r_1)(x - r_2) = x^2 - (r_1 + r_2)x + r_1 r_2$.",
            "We model in two steps: first recover the roots by solving the linear system, then build the monic equation with Vieta: $(x - r_1)(x - r_2) = x^2 - (r_1 + r_2)x + r_1 r_2$.",
          ),
          step(
            "calculation",
            `$r_1 = \\frac{${S} + ${D}}{2} = ${p.r1}$; $r_2 = \\frac{${S} - ${D}}{2} = ${p.r2}$<br>$b = -(r_1 + r_2) = -(${S}) = ${-S}$<br>$c = r_1 \\cdot r_2 = ${p.r1 < 0 ? `(${p.r1})` : p.r1} \\cdot ${p.r2 < 0 ? `(${p.r2})` : p.r2} = ${c}$<br>Ecuación: $x^2 ${opTerm(-S, "x")} ${op(c)} = \\left(${linFac(p.r1)}\\right)\\left(${linFac(p.r2)}\\right) = 0$`,
            `$r_1 = \\frac{${S} + ${D}}{2} = ${p.r1}$; $r_2 = \\frac{${S} - ${D}}{2} = ${p.r2}$<br>$b = -(r_1 + r_2) = -(${S}) = ${-S}$<br>$c = r_1 \\cdot r_2 = ${p.r1 < 0 ? `(${p.r1})` : p.r1} \\cdot ${p.r2 < 0 ? `(${p.r2})` : p.r2} = ${c}$<br>Equation: $x^2 ${opTerm(-S, "x")} ${op(c)} = \\left(${linFac(p.r1)}\\right)\\left(${linFac(p.r2)}\\right) = 0$`,
          ),
          step(
            "result",
            `La ecuación es $x^2 ${opTerm(-S, "x")} ${op(c)} = 0$: sus raíces suman $${S}$ y se diferencian en $${D}$, como pedía el enunciado.`,
            `The equation is $x^2 ${opTerm(-S, "x")} ${op(c)} = 0$: its roots add up to $${S}$ and differ by $${D}$, as required.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Multi-concept: quadratic shares a root with a linear equation     */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "quad-common-01",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "roots",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 240,
      tags: ["vieta", "roots", "linear-equation", "shared-root"],
      prerequisites: ["factoring"],
      reasoning: "multi-concept",
    },
    (rng) => {
      // s = root shared with the linear equation l·x − l·s = 0;
      // o = the other root (from the stated Vieta sum S = s + o).
      const sets: { l: number; s: number; o: number }[] = [
        { l: 3, s: 4, o: -5 },
        { l: 1, s: 6, o: -2 },
        { l: 2, s: -3, o: 7 },
        { l: 4, s: 5, o: 3 },
        { l: 2, s: -4, o: -6 },
        { l: 1, s: 7, o: -10 },
        { l: 3, s: -5, o: 2 },
        { l: 5, s: 2, o: 8 },
        { l: 2, s: 6, o: -9 },
        { l: 1, s: -7, o: -4 },
        { l: 4, s: -6, o: 10 },
        { l: 3, s: 8, o: -12 },
        { l: 2, s: -8, o: 5 },
      ];
      const p = rng.pick(sets);
      const linConst = -p.l * p.s;
      const S = p.s + p.o;
      const c = p.s * p.o;
      const b = -S;
      return {
        skill: L(
          "Raíz común con una ecuación lineal (lineal + Vieta)",
          "Root shared with a linear equation (linear + Vieta)",
        ),
        statement: L(
          `La ecuación cuadrática $x^2 + bx + c = 0$ tiene una raíz en común con la ecuación lineal $${p.l}x ${op(linConst)} = 0$, y la suma de sus dos raíces es $${S}$. ¿Cuánto vale el término independiente $c$?`,
          `The quadratic equation $x^2 + bx + c = 0$ shares one root with the linear equation $${p.l}x ${op(linConst)} = 0$, and the sum of its two roots is $${S}$. What is the constant term $c$?`,
        ),
        answer: { kind: "numeric", value: c },
        hints: [
          L(
            "Resuelve primero la ecuación lineal: su solución es la raíz común de la cuadrática.",
            "Solve the linear equation first: its solution is the root shared with the quadratic.",
          ),
          L(
            "Con $a = 1$, la suma de las dos raíces es $-b$; ya conoces una raíz, así que la otra sale de esa suma.",
            "With $a = 1$, the sum of the two roots is $-b$; you already know one root, so the other follows from that sum.",
          ),
          L(
            "El término independiente $c$ es el **producto** de las dos raíces.",
            "The constant term $c$ is the **product** of the two roots.",
          ),
        ],
        answerDisplay: L(`$c = ${c}$`, `$c = ${c}$`),
        solution: [
          step(
            "given",
            `Raíz común con $${p.l}x ${op(linConst)} = 0$; suma de las dos raíces: $${S}$.`,
            `Root shared with $${p.l}x ${op(linConst)} = 0$; sum of the two roots: $${S}$.`,
          ),
          step(
            "approach",
            "Cadena: **ecuación lineal** (raíz común) → **Vieta** (suma para la otra raíz, producto para $c$).",
            "Chain: **linear equation** (shared root) → **Vieta** (sum for the other root, product for $c$).",
          ),
          step(
            "calculation",
            `$${p.l}x ${op(linConst)} = 0 \\Rightarrow x = ${p.s}$ (raíz común)<br>$r_2 = ${S} - (${p.s < 0 ? `(${p.s})` : p.s}) = ${p.o}$<br>$c = r_1 \\cdot r_2 = ${p.s < 0 ? `(${p.s})` : p.s} \\cdot ${p.o < 0 ? `(${p.o})` : p.o} = ${c}$`,
            `$${p.l}x ${op(linConst)} = 0 \\Rightarrow x = ${p.s}$ (shared root)<br>$r_2 = ${S} - (${p.s < 0 ? `(${p.s})` : p.s}) = ${p.o}$<br>$c = r_1 \\cdot r_2 = ${p.s < 0 ? `(${p.s})` : p.s} \\cdot ${p.o < 0 ? `(${p.o})` : p.o} = ${c}$`,
          ),
          step(
            "result",
            `$c = ${c}$: la ecuación es $x^2 ${opTerm(b, "x")} ${op(c)} = \\left(${linFac(p.s)}\\right)\\left(${linFac(p.o)}\\right) = 0$, que comparte la raíz $${p.s}$ con la lineal.`,
            `$c = ${c}$: the equation is $x^2 ${opTerm(b, "x")} ${op(c)} = \\left(${linFac(p.s)}\\right)\\left(${linFac(p.o)}\\right) = 0$, which shares the root $${p.s}$ with the linear one.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Graphical + parameters: vertex on a given line → positive b       */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "quad-vertex-03",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "vertex",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 300,
      tags: ["vertex", "parameters", "line", "graphical"],
      prerequisites: ["completing-square"],
      reasoning: "graphical",
    },
    (rng) => {
      // Curated (a, b, c, m) with the line q = c + b(2m − b)/(4a) through the
      // vertex; the b-quadratic b² − 2mb + 4a(q − c) = 0 has roots b > 0 and
      // 2m − b < 0, so the positive one is unique.
      const sets: { a: number; b: number; c: number; m: number; q: number }[] = [
        { a: 1, b: 4, c: 1, m: 1, q: -1 },
        { a: 1, b: 6, c: 2, m: 2, q: -1 },
        { a: 2, b: 4, c: 1, m: 1, q: 0 },
        { a: 1, b: 8, c: 3, m: 3, q: -1 },
        { a: 2, b: 8, c: 2, m: 2, q: -2 },
        { a: 3, b: 6, c: 5, m: 1, q: 3 },
        { a: 1, b: 10, c: 4, m: 4, q: -1 },
        { a: 2, b: 8, c: 5, m: 3, q: 3 },
      ];
      const t = rng.pick(sets);
      const xTex = `${t.a === 1 ? "" : t.a}x^2`;
      const lineTex = `${t.m === 1 ? "" : t.m}x${t.q === 0 ? "" : ` ${op(t.q)}`}`;
      const sq = Math.abs(t.b - t.m); // √(m² + 4a(c − q))
      const other = 2 * t.m - t.b; // negative root
      return {
        skill: L(
          "Vértice sobre una recta: hallar el coeficiente b",
          "Vertex on a line: finding the coefficient b",
        ),
        statement: L(
          `La parábola $y = ${xTex} + bx + ${t.c}$ tiene su vértice sobre la recta $y = ${lineTex}$. ¿Cuál es el valor **positivo** de $b$?`,
          `The parabola $y = ${xTex} + bx + ${t.c}$ has its vertex on the line $y = ${lineTex}$. What is the **positive** value of $b$?`,
        ),
        answer: { kind: "numeric", value: t.b },
        hints: [
          L(
            "Expresa el vértice en función de $b$: $x_v = -\\frac{b}{2a}$ y $y_v = c - \\frac{b^2}{4a}$.",
            "Express the vertex in terms of $b$: $x_v = -\\frac{b}{2a}$ and $y_v = c - \\frac{b^2}{4a}$.",
          ),
          L(
            "«El vértice está sobre la recta» se traduce en $y_v = m\\,x_v + q$.",
            "“The vertex lies on the line” translates to $y_v = m\\,x_v + q$.",
          ),
          L(
            "Al sustituir queda una ecuación cuadrática en $b$: $b^2 - 2mb + 4a(q - c) = 0$; resuélvela con la fórmula cuadrática.",
            "Substituting leaves a quadratic equation in $b$: $b^2 - 2mb + 4a(q - c) = 0$; solve it with the quadratic formula.",
          ),
        ],
        answerDisplay: L(`$b = ${t.b}$`, `$b = ${t.b}$`),
        solution: [
          step(
            "given",
            `$y = ${xTex} + bx + ${t.c}$ (con $a = ${t.a}$, $c = ${t.c}$, $b$ desconocido) y la recta $y = ${lineTex}$.`,
            `$y = ${xTex} + bx + ${t.c}$ (with $a = ${t.a}$, $c = ${t.c}$, unknown $b$) and the line $y = ${lineTex}$.`,
          ),
          step(
            "approach",
            "Traducción gráfico → álgebra: el vértice $\\left(-\\frac{b}{2a},\\ c - \\frac{b^2}{4a}\\right)$ debe cumplir la ecuación de la recta. Eso da una cuadrática en $b$ con dos soluciones; se pide la positiva.",
            "Graph → algebra translation: the vertex $\\left(-\\frac{b}{2a},\\ c - \\frac{b^2}{4a}\\right)$ must satisfy the line's equation. That gives a quadratic in $b$ with two solutions; the positive one is requested.",
          ),
          step(
            "calculation",
            `$x_v = -\\frac{b}{2 \\cdot ${t.a}}$; $y_v = ${t.c} - \\frac{b^2}{4 \\cdot ${t.a}}$<br>Condición: ${t.c} - \\frac{b^2}{${4 * t.a}} = ${t.m === 1 ? "" : t.m}\\left(-\\frac{b}{${2 * t.a}}\\right)${t.q === 0 ? "" : ` ${op(t.q)}`}$<br>Multiplicando por ${4 * t.a}: $b^2 ${opTerm(-2 * t.m, "b")} ${op(4 * t.a * (t.q - t.c))} = 0$<br>$b = ${t.m} \\pm \\sqrt{${t.m * t.m} + ${4 * t.a * (t.c - t.q)}} = ${t.m} \\pm ${sq}$<br>$b = ${t.b}$ (positivo) o $b = ${other}$ (negativo, se descarta)`,
            `$x_v = -\\frac{b}{2 \\cdot ${t.a}}$; $y_v = ${t.c} - \\frac{b^2}{4 \\cdot ${t.a}}$<br>Condition: ${t.c} - \\frac{b^2}{${4 * t.a}} = ${t.m === 1 ? "" : t.m}\\left(-\\frac{b}{${2 * t.a}}\\right)${t.q === 0 ? "" : ` ${op(t.q)}`}$<br>Multiplying by ${4 * t.a}: $b^2 ${opTerm(-2 * t.m, "b")} ${op(4 * t.a * (t.q - t.c))} = 0$<br>$b = ${t.m} \\pm \\sqrt{${t.m * t.m} + ${4 * t.a * (t.c - t.q)}} = ${t.m} \\pm ${sq}$<br>$b = ${t.b}$ (positive) or $b = ${other}$ (negative, discarded)`,
          ),
          step(
            "result",
            `$b = ${t.b}$: el vértice queda en $\\left(${-t.b / (2 * t.a)},\\ ${t.c - (t.b * t.b) / (4 * t.a)}\\right)$, que efectivamente está sobre la recta.`,
            `$b = ${t.b}$: the vertex is at $\\left(${-t.b / (2 * t.a)},\\ ${t.c - (t.b * t.b) / (4 * t.a)}\\right)$, which indeed lies on the line.`,
          ),
        ],
      };
    },
  ),

  /* ================================================================== */
  /* Segunda tanda ESPOL §3.11 (p. 322) — transcrita con el modelo de   */
  /* visión (VLM), cruzada con la clave impresa (p. 803) y re-derivada. */
  /* ================================================================== */

  /* 3.11 · 111a — mx² − m³x + (1−m) = 0: sum of REAL roots = 1 → m = ±1 */
  template(
    {
      id: "quad-espol-111a",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "roots",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 420,
      tags: ["parameters", "vieta", "discriminant", "real-roots"],
      prerequisites: ["quadratics"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3.11 · 111a",
        page: 322,
      },
      reasoning: "parameters",
    },
    () => {
      const options: McOption[] = [
        { id: "a", text: L(`$m = \\pm 1$`, `$m = \\pm 1$`), correct: true },
        { id: "b", text: L(`$m = 1$ únicamente`, `$m = 1$ only`), correct: false },
        { id: "c", text: L(`$m = \\pm 1$ y $m = 0$`, `$m = \\pm 1$ and $m = 0$`), correct: false },
        { id: "d", text: L(`No existe tal $m$`, `No such $m$ exists`), correct: false },
      ];
      return {
        skill: L("Vieta con parámetro + discriminante", "Vieta with a parameter + discriminant"),
        statement: L(
          `Dada la ecuación cuadrática $mx^2 - m^3x + (1 - m) = 0$, determina, de ser posible, los valores de $m$ para que la **suma de sus raíces reales** sea igual a $1$.`,
          `Given the quadratic equation $mx^2 - m^3x + (1 - m) = 0$, determine, if possible, the values of $m$ for which the **sum of its real roots** equals $1$.`,
        ),
        answer: { kind: "multiple-choice", options },
        hints: [
          L(
            "Para que sea cuadrática necesitas $m \\ne 0$; con eso, la suma de raíces por Vieta es $\\frac{m^3}{m} = m^2$.",
            "For it to be quadratic you need $m \\ne 0$; then Vieta's sum of roots is $\\frac{m^3}{m} = m^2$.",
          ),
          L(
            "Impón $m^2 = 1$: salen $m = \\pm 1$. Pero aún falta verificar que las raíces sean REALES.",
            "Impose $m^2 = 1$: you get $m = \\pm 1$. But you still must verify the roots are REAL.",
          ),
          L(
            "Revisa el discriminante para $m = 1$ ($x^2 - x = 0$) y para $m = -1$ ($-x^2 + x + 2 = 0$).",
            "Check the discriminant for $m = 1$ ($x^2 - x = 0$) and for $m = -1$ ($-x^2 + x + 2 = 0$).",
          ),
        ],
        answerDisplay: L(
          `$m = \\pm 1$: en ambos casos las raíces son reales y suman $1$.`,
          `$m = \\pm 1$: in both cases the roots are real and add up to $1$.`,
        ),
        solution: [
          step(
            "given",
            "$mx^2 - m^3x + (1-m) = 0$; se pide que la suma de las raíces reales valga $1$.",
            "$mx^2 - m^3x + (1-m) = 0$; the sum of the real roots must equal $1$.",
          ),
          step(
            "approach",
            "Aplicar Vieta para expresar la suma en función del parámetro y después filtrar con el discriminante: solo cuentan los valores de $m$ que producen raíces reales.",
            "Apply Vieta to express the sum in terms of the parameter, then filter with the discriminant: only the values of $m$ producing real roots count.",
          ),
          step(
            "calculation",
            `$m \\ne 0$ (cuadrática). Vieta: $x_1 + x_2 = \\frac{m^3}{m} = m^2$<br>$m^2 = 1 \\Rightarrow m = \\pm 1$<br>$m = 1:\\ x^2 - x = 0 \\Rightarrow x = 0, 1$ (reales, suma $1$ ✓)<br>$m = -1:\\ -x^2 + x + 2 = 0 \\Rightarrow x^2 - x - 2 = 0$, $\\Delta = 1 + 8 = 9 > 0$, raíces $2$ y $-1$ (suma $1$ ✓)`,
            `$m \\ne 0$ (quadratic). Vieta: $x_1 + x_2 = \\frac{m^3}{m} = m^2$<br>$m^2 = 1 \\Rightarrow m = \\pm 1$<br>$m = 1:\\ x^2 - x = 0 \\Rightarrow x = 0, 1$ (real, sum $1$ ✓)<br>$m = -1:\\ -x^2 + x + 2 = 0 \\Rightarrow x^2 - x - 2 = 0$, $\\Delta = 1 + 8 = 9 > 0$, roots $2$ and $-1$ (sum $1$ ✓)`,
          ),
          step(
            "result",
            `Ambos candidatos sobreviven el filtro del discriminante: $m = \\pm 1$. (La trampa: olvidar verificar la realidad de las raíces — o incluir $m = 0$, donde la ecuación degenera en $1 = 0$ y ni siquiera hay raíces.)`,
            `Both candidates survive the discriminant filter: $m = \\pm 1$. (The traps: forgetting to verify the roots are real — or including $m = 0$, where the equation degenerates to $1 = 0$ and there are no roots at all.)`,
          ),
        ],
      };
    },
  ),

  /* 3.11 · 111b — product of REAL roots = 1 → impossible */
  template(
    {
      id: "quad-espol-111b",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "roots",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 420,
      tags: ["parameters", "vieta", "discriminant", "impossible"],
      prerequisites: ["quadratics"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3.11 · 111b",
        page: 322,
      },
      reasoning: "parameters",
    },
    () => {
      const options: McOption[] = [
        { id: "a", text: L(`No existe tal $m$`, `No such $m$ exists`), correct: true },
        { id: "b", text: L(`$m = \\dfrac{1}{2}$`, `$m = \\dfrac{1}{2}$`), correct: false },
        { id: "c", text: L(`$m = -\\dfrac{1}{2}$`, `$m = -\\dfrac{1}{2}$`), correct: false },
        { id: "d", text: L(`$m = \\pm 1$`, `$m = \\pm 1$`), correct: false },
      ];
      return {
        skill: L("Cuando Vieta promete pero el discriminante dice no", "When Vieta promises but the discriminant says no"),
        statement: L(
          `Dada la ecuación cuadrática $mx^2 - m^3x + (1 - m) = 0$, determina, de ser posible, los valores de $m$ para que el **producto de sus raíces reales** sea igual a $1$.`,
          `Given the quadratic equation $mx^2 - m^3x + (1 - m) = 0$, determine, if possible, the values of $m$ for which the **product of its real roots** equals $1$.`,
        ),
        answer: { kind: "multiple-choice", options },
        hints: [
          L(
            "Por Vieta el producto de raíces es $\\frac{1-m}{m}$ (con $m \\ne 0$).",
            "By Vieta the product of roots is $\\frac{1-m}{m}$ (with $m \\ne 0$).",
          ),
          L(
            "Impón $\\frac{1-m}{m} = 1$: sale $m = \\frac{1}{2}$. Pero… ¿las raíces son reales con ese valor?",
            "Impose $\\frac{1-m}{m} = 1$: you get $m = \\frac{1}{2}$. But… are the roots real for that value?",
          ),
          L(
            "Con $m = \\frac{1}{2}$ la ecuación es $\\frac{1}{2}x^2 - \\frac{1}{8}x + \\frac{1}{2} = 0$ (multiplicada por 8: $4x^2 - x + 4 = 0$): calcula el discriminante.",
            "With $m = \\frac{1}{2}$ the equation is $\\frac{1}{2}x^2 - \\frac{1}{8}x + \\frac{1}{2} = 0$ (times 8: $4x^2 - x + 4 = 0$): compute the discriminant.",
          ),
        ],
        answerDisplay: L(
          `No es posible: el único candidato $m = \\frac{1}{2}$ produce raíces complejas ($\\Delta < 0$).`,
          `It is not possible: the only candidate $m = \\frac{1}{2}$ produces complex roots ($\\Delta < 0$).`,
        ),
        solution: [
          step(
            "given",
            "$mx^2 - m^3x + (1-m) = 0$; se pide que el producto de las raíces reales valga $1$.",
            "$mx^2 - m^3x + (1-m) = 0$; the product of the real roots must equal $1$.",
          ),
          step(
            "approach",
            "El mismo esquema que con la suma: Vieta da el candidato, pero la condición de raíces reales es la que decide. Aquí el candidato muere en el discriminante.",
            "Same scheme as with the sum: Vieta gives the candidate, but the real-root condition decides. Here the candidate dies at the discriminant.",
          ),
          step(
            "calculation",
            `Vieta: $x_1 x_2 = \\frac{1-m}{m} = 1 \\Rightarrow 1 - m = m \\Rightarrow m = \\frac{1}{2}$<br>Con $m = \\frac{1}{2}$: $\\frac{1}{2}x^2 - \\frac{1}{8}x + \\frac{1}{2} = 0 \\Rightarrow 4x^2 - x + 4 = 0$<br>$\\Delta = (-1)^2 - 4(4)(4) = 1 - 64 = -63 < 0$`,
            `Vieta: $x_1 x_2 = \\frac{1-m}{m} = 1 \\Rightarrow 1 - m = m \\Rightarrow m = \\frac{1}{2}$<br>With $m = \\frac{1}{2}$: $\\frac{1}{2}x^2 - \\frac{1}{8}x + \\frac{1}{2} = 0 \\Rightarrow 4x^2 - x + 4 = 0$<br>$\\Delta = (-1)^2 - 4(4)(4) = 1 - 64 = -63 < 0$`,
          ),
          step(
            "result",
            `Con $m = \\frac{1}{2}$ las raíces son complejas ($\\Delta = -63$), así que **no existe** ningún $m$ que cumpla la condición: el producto de raíces REALES nunca es $1$. El libro lo confirma: «No es posible».`,
            `With $m = \\frac{1}{2}$ the roots are complex ($\\Delta = -63$), so **no** $m$ satisfies the condition: the product of REAL roots is never $1$. The book's answer key confirms: "No es posible".`,
          ),
        ],
      };
    },
  ),

  /* 3.11 · 112 — 4x² − 4xy − y² = 1: x in terms of y via the general formula */
  template(
    {
      id: "quad-espol-112",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "quadratic-formula",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 420,
      tags: ["general-formula", "parameter", "literal-equation"],
      prerequisites: ["quadratics"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3.11 · 112a",
        page: 322,
      },
      reasoning: "parameters",
    },
    () => {
      const options: McOption[] = [
        { id: "a", text: L(`$x = \\dfrac{y \\pm \\sqrt{2y^2 + 1}}{2}$`, `$x = \\dfrac{y \\pm \\sqrt{2y^2 + 1}}{2}$`), correct: true },
        { id: "b", text: L(`$x = \\dfrac{y \\pm 1}{2}$`, `$x = \\dfrac{y \\pm 1}{2}$`), correct: false },
        { id: "c", text: L(`$x = \\dfrac{y \\pm \\sqrt{y^2 + 1}}{2}$`, `$x = \\dfrac{y \\pm \\sqrt{y^2 + 1}}{2}$`), correct: false },
        { id: "d", text: L(`$x = \\dfrac{4y \\pm \\sqrt{2y^2 + 1}}{8}$`, `$x = \\dfrac{4y \\pm \\sqrt{2y^2 + 1}}{8}$`), correct: false },
      ];
      return {
        skill: L("Fórmula general con y como parámetro", "General formula with y as a parameter"),
        statement: L(
          `Dada la ecuación $4x^2 - 4xy - y^2 = 1$, utilice la fórmula general para resolver y obtener $x$ en términos de $y$.`,
          `Given the equation $4x^2 - 4xy - y^2 = 1$, use the general (quadratic) formula to solve for $x$ in terms of $y$.`,
        ),
        answer: { kind: "multiple-choice", options },
        hints: [
          L(
            "Trata la ecuación como cuadrática en $x$, con $y$ de constante: $4x^2 - 4yx + (-y^2 - 1) = 0$.",
            "Treat the equation as a quadratic in $x$, with $y$ constant: $4x^2 - 4yx + (-y^2 - 1) = 0$.",
          ),
          L(
            "Identifica $a = 4$, $b = -4y$, $c = -y^2 - 1$ y calcula el discriminante $b^2 - 4ac$.",
            "Identify $a = 4$, $b = -4y$, $c = -y^2 - 1$ and compute the discriminant $b^2 - 4ac$.",
          ),
          L(
            "$\\Delta = 16y^2 + 16(y^2 + 1) = 32y^2 + 16 = 16(2y^2 + 1)$, así que $\\sqrt{\\Delta} = 4\\sqrt{2y^2+1}$.",
            "$\\Delta = 16y^2 + 16(y^2 + 1) = 32y^2 + 16 = 16(2y^2 + 1)$, so $\\sqrt{\\Delta} = 4\\sqrt{2y^2+1}$.",
          ),
        ],
        answerDisplay: L(
          `$x = \\dfrac{y \\pm \\sqrt{2y^2 + 1}}{2}$.`,
          `$x = \\dfrac{y \\pm \\sqrt{2y^2 + 1}}{2}$.`,
        ),
        solution: [
          step(
            "given",
            "$4x^2 - 4xy - y^2 = 1$, vista como $4x^2 - 4yx - y^2 - 1 = 0$ (cuadrática en $x$).",
            "$4x^2 - 4xy - y^2 = 1$, viewed as $4x^2 - 4yx - y^2 - 1 = 0$ (quadratic in $x$).",
          ),
          step(
            "approach",
            "Congelar $y$ como parámetro y aplicar la fórmula general $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$; el discriminante simplifica a un cuadrado perfecto por el factor $16$.",
            "Freeze $y$ as a parameter and apply the general formula $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$; the discriminant simplifies to a perfect square via the factor $16$.",
          ),
          step(
            "calculation",
            `$a = 4,\\ b = -4y,\\ c = -y^2 - 1$<br>$\\Delta = b^2 - 4ac = 16y^2 - 4(4)(-y^2 - 1) = 16y^2 + 16y^2 + 16 = 16(2y^2 + 1)$<br>$x = \\dfrac{4y \\pm 4\\sqrt{2y^2+1}}{8} = \\dfrac{y \\pm \\sqrt{2y^2+1}}{2}$`,
            `$a = 4,\\ b = -4y,\\ c = -y^2 - 1$<br>$\\Delta = b^2 - 4ac = 16y^2 - 4(4)(-y^2 - 1) = 16y^2 + 16y^2 + 16 = 16(2y^2 + 1)$<br>$x = \\dfrac{4y \\pm 4\\sqrt{2y^2+1}}{8} = \\dfrac{y \\pm \\sqrt{2y^2+1}}{2}$`,
          ),
          step(
            "result",
            `$x = \\frac{y \\pm \\sqrt{2y^2+1}}{2}$. Comprobación con $y = 0$: $x = \\pm\\frac{1}{2}$ y en efecto $4\\left(\\frac{1}{2}\\right)^2 = 1$ ✓. (Análogamente, resolviendo en $y$: $y = -2x \\pm \\sqrt{8x^2 - 1}$.)`,
            `$x = \\frac{y \\pm \\sqrt{2y^2+1}}{2}$. Check with $y = 0$: $x = \\pm\\frac{1}{2}$ and indeed $4\\left(\\frac{1}{2}\\right)^2 = 1$ ✓. (Analogously, solving for $y$: $y = -2x \\pm \\sqrt{8x^2 - 1}$.)`,
          ),
        ],
      };
    },
  ),

  /* 3.11 · 116 — min of a²+4b²+3c²+13−2a−12b−6c = 0 */
  template(
    {
      id: "quad-espol-116",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "completing-square",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 480,
      tags: ["completing-square", "optimization", "sum-of-squares", "multi-variable"],
      prerequisites: ["quadratics"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3.11 · 116",
        page: 322,
      },
      reasoning: "multi-concept",
    },
    () => {
      const options: McOption[] = [
        { id: "a", text: L(`$0$`, `$0$`), correct: true },
        { id: "b", text: L(`$1$`, `$1$`), correct: false },
        { id: "c", text: L(`$2$`, `$2$`), correct: false },
        { id: "d", text: L(`$13$`, `$13$`), correct: false },
      ];
      return {
        skill: L("Completar cuadrados en tres variables", "Completing squares in three variables"),
        statement: L(
          `Calcula el **valor mínimo** de la expresión $a^2 + 4b^2 + 3c^2 + 13 - 2a - 12b - 6c$ con $a, b, c \\in \\mathbb{R}$.`,
          `Find the **minimum value** of the expression $a^2 + 4b^2 + 3c^2 + 13 - 2a - 12b - 6c$ with $a, b, c \\in \\mathbb{R}$.`,
        ),
        answer: { kind: "multiple-choice", options },
        hints: [
          L(
            "Agrupa por variable: los términos en $a$, los términos en $b$, los términos en $c$, y la constante.",
            "Group by variable: the terms in $a$, the terms in $b$, the terms in $c$, and the constant.",
          ),
          L(
            "Completa el cuadrado en cada grupo: $a^2 - 2a = (a-1)^2 - 1$; $4b^2 - 12b = (2b-3)^2 - 9$; $3c^2 - 6c = 3(c-1)^2 - 3$.",
            "Complete the square in each group: $a^2 - 2a = (a-1)^2 - 1$; $4b^2 - 12b = (2b-3)^2 - 9$; $3c^2 - 6c = 3(c-1)^2 - 3$.",
          ),
          L(
            "La expresión queda como suma de cuadrados más una constante: $13 - 1 - 9 - 3 = 0$. ¿Pueden los cuadrados ser cero a la vez?",
            "The expression becomes a sum of squares plus a constant: $13 - 1 - 9 - 3 = 0$. Can all the squares be zero simultaneously?",
          ),
        ],
        answerDisplay: L(
          `Mínimo $= 0$, alcanzado en $(a, b, c) = \\left(1, \\frac{3}{2}, 1\\right)$.`,
          `Minimum $= 0$, attained at $(a, b, c) = \\left(1, \\frac{3}{2}, 1\\right)$.`,
        ),
        solution: [
          step(
            "given",
            "$E = a^2 + 4b^2 + 3c^2 + 13 - 2a - 12b - 6c$, con $a, b, c \\in \\mathbb{R}$.",
            "$E = a^2 + 4b^2 + 3c^2 + 13 - 2a - 12b - 6c$, with $a, b, c \\in \\mathbb{R}$.",
          ),
          step(
            "approach",
            "El libro pide demostrar $a^2 + 4b^2 + 3c^2 + 13 \\ge 2a + 12b + 6c$: la vía es reescribir la diferencia como suma de cuadrados (completar el cuadrado variable por variable).",
            "The book asks to prove $a^2 + 4b^2 + 3c^2 + 13 \\ge 2a + 12b + 6c$: the way is to rewrite the difference as a sum of squares (completing the square variable by variable).",
          ),
          step(
            "calculation",
            `$a^2 - 2a = (a-1)^2 - 1$<br>$4b^2 - 12b = (2b-3)^2 - 9$<br>$3c^2 - 6c = 3(c-1)^2 - 3$<br>$E = (a-1)^2 + (2b-3)^2 + 3(c-1)^2 + 13 - 1 - 9 - 3 = (a-1)^2 + (2b-3)^2 + 3(c-1)^2$`,
            `$a^2 - 2a = (a-1)^2 - 1$<br>$4b^2 - 12b = (2b-3)^2 - 9$<br>$3c^2 - 6c = 3(c-1)^2 - 3$<br>$E = (a-1)^2 + (2b-3)^2 + 3(c-1)^2 + 13 - 1 - 9 - 3 = (a-1)^2 + (2b-3)^2 + 3(c-1)^2$`,
          ),
          step(
            "result",
            `$E$ es una suma de cuadrados no negativos, así que $E \\ge 0$, y el mínimo $E = 0$ se alcanza cuando $a = 1$, $b = \\frac{3}{2}$, $c = 1$ simultáneamente. Esto prueba la desigualdad del libro: $a^2 + 4b^2 + 3c^2 + 13 \\ge 2a + 12b + 6c$.`,
            `$E$ is a sum of non-negative squares, so $E \\ge 0$, and the minimum $E = 0$ is attained when $a = 1$, $b = \\frac{3}{2}$, $c = 1$ simultaneously. This proves the book's inequality: $a^2 + 4b^2 + 3c^2 + 13 \\ge 2a + 12b + 6c$.`,
          ),
        ],
      };
    },
  ),

  /* ================================================================== */
  /* Curated — ESPOL Fundamentos, EDICIÓN DIGITAL (TUTOR_LICENSED).      */
  /* Chapter 2 «Ejercicios propuestos», pp. 235-241 (PDF 268-274).      */
  /* Tutor's brief: the most difficult / integrative ones.              */
  /* Double-verified: printed key pp. 939 (49: c; 83: 2+√2; 84: 5/2)    */
  /* + sympy (41/41 checks). #82: printed key lists only k = 9/4, but   */
  /* k = 0 also gives a unique solution (linear case) — the COMPLETE    */
  /* answer {0, 9/4} ships; discrepancy flagged to the tutor.           */
  /* ================================================================== */

  /* 49 — kx²+4kx+3 = x², suma de raíces 10 → k = 10/14. Key: (c). */
  template(
    {
      id: "quad-espol-ch2-49",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "roots",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 210,
      tags: ["vieta", "sum-of-roots", "parameter"],
      prerequisites: ["standard-form"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 49",
        page: 235,
      },
      reasoning: "parameters",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\dfrac{3}{4}$`, `$\\dfrac{3}{4}$`), correct: false },
        { id: "b", text: L(`$\\dfrac{1}{2}$`, `$\\dfrac{1}{2}$`), correct: false },
        { id: "c", text: L(`$\\dfrac{10}{14}$`, `$\\dfrac{10}{14}$`), correct: true },
        { id: "d", text: L(`$\\dfrac{1}{3}$`, `$\\dfrac{1}{3}$`), correct: false },
        { id: "e", text: L(`$\\dfrac{3}{8}$`, `$\\dfrac{3}{8}$`), correct: false },
      ];
      return {
        skill: L("Vieta con trampa: primero pasa todo a un lado", "Vieta with a trap: move everything to one side first"),
        statement: L(
          "Un valor de $k$ para que la suma de las raíces de la ecuación $kx^{2} + 4kx + 3 = x^{2}$ sea 10, es:",
          "A value of $k$ for which the sum of the roots of the equation $kx^{2} + 4kx + 3 = x^{2}$ equals 10 is:",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "La ecuación tal como está impresa NO es cuadrática con coeficientes limpios: pásala a $(k - 1)x^{2} + 4kx + 3 = 0$.",
            "As printed the equation does NOT have clean coefficients: move it to $(k - 1)x^{2} + 4kx + 3 = 0$.",
          ),
          L(
            "Suma de raíces (Vieta): $-\\dfrac{B}{A} = -\\dfrac{4k}{k - 1}$, y esa suma debe valer 10.",
            "Sum of roots (Vieta): $-\\dfrac{B}{A} = -\\dfrac{4k}{k - 1}$, and that sum must equal 10.",
          ),
          L(
            "Despeja: $-4k = 10(k - 1)$. La respuesta no es un entero — es una fracción que simplifica a $5/7$.",
            "Solve: $-4k = 10(k - 1)$. The answer is not an integer — it is a fraction that simplifies to $5/7$.",
          ),
        ],
        answerDisplay: L("$k = \\dfrac{10}{14} = \\dfrac{5}{7}$", "$k = \\dfrac{10}{14} = \\dfrac{5}{7}$"),
        solution: [
          step(
            "given",
            "$kx^{2} + 4kx + 3 = x^{2}$; incógnita del problema: el parámetro $k$.",
            "$kx^{2} + 4kx + 3 = x^{2}$; the problem's unknown: the parameter $k$.",
          ),
          step(
            "approach",
            "Reducir a la forma general y aplicar Vieta (suma de raíces $= -B/A$). Si uno olvida pasar la $x^{2}$, la «suma» $-4k/k = -4$ es constante y no puede valer 10 — esa es la trampa.",
            "Reduce to general form and apply Vieta (sum of roots $= -B/A$). If you forget to move the $x^{2}$, the “sum” $-4k/k = -4$ is constant and can never be 10 — that is the trap.",
          ),
          step(
            "calculation",
            "$(k - 1)x^{2} + 4kx + 3 = 0$, con $k \\neq 1$.<br>Suma de raíces: $-\\dfrac{4k}{k - 1} = 10 \\Rightarrow -4k = 10k - 10 \\Rightarrow 14k = 10 \\Rightarrow k = \\dfrac{10}{14} = \\dfrac{5}{7}$.",
            "$(k - 1)x^{2} + 4kx + 3 = 0$, with $k \\neq 1$.<br>Sum of roots: $-\\dfrac{4k}{k - 1} = 10 \\Rightarrow -4k = 10k - 10 \\Rightarrow 14k = 10 \\Rightarrow k = \\dfrac{10}{14} = \\dfrac{5}{7}$.",
          ),
          step(
            "result",
            "$k = \\frac{10}{14} = \\frac{5}{7}$ (opción c). Verificación: con $k = \\frac{5}{7}$ la ecuación es $-\\frac{2}{7}x^{2} + \\frac{20}{7}x + 3 = 0$, o bien $x^{2} - 10x - \\frac{21}{2} = 0$, con raíces $5 \\pm \\frac{\\sqrt{142}}{2}$: su suma es 10 ✓.",
            "$k = \\frac{10}{14} = \\frac{5}{7}$ (option c). Check: with $k = \\frac{5}{7}$ the equation is $x^{2} - 10x - \\frac{21}{2} = 0$, with roots $5 \\pm \\frac{\\sqrt{142}}{2}$: their sum is 10 ✓.",
          ),
        ],
      };
    },
  ),

  /* 82 — kx²+3x+1 = 0 solución única → {0, 9/4} (clave impresa incompleta: solo 9/4). */
  template(
    {
      id: "quad-espol-ch2-82",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "discriminant",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["discriminant", "unique-solution", "degenerate-quadratic"],
      prerequisites: ["quadratic-formula"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 82",
        page: 241,
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$k \\in \\left\\{0,\\ \\dfrac{9}{4}\\right\\}$`, `$k \\in \\left\\{0,\\ \\dfrac{9}{4}\\right\\}$`), correct: true },
        { id: "b", text: L(`$k = \\dfrac{9}{4}$`, `$k = \\dfrac{9}{4}$`), correct: false },
        { id: "c", text: L(`$k = 0$`, `$k = 0$`), correct: false },
        { id: "d", text: L(`$k = \\dfrac{9}{4}$ ó $k = \\dfrac{3}{2}$`, `$k = \\dfrac{9}{4}$ or $k = \\dfrac{3}{2}$`), correct: false },
        { id: "e", text: L(`no existe tal $k$`, `no such $k$ exists`), correct: false },
      ];
      return {
        skill: L("«Solución única»: dos caminos (lineal o discriminante cero)", "“Unique solution”: two routes (linear or zero discriminant)"),
        statement: L(
          "Halla el valor de $k$ para que el conjunto de verdad del predicado $p(x):\\ kx^{2} + 3x + 1 = 0$ tenga solución única.",
          "Find the value of $k$ for which the truth set of the predicate $p(x):\\ kx^{2} + 3x + 1 = 0$ has a unique solution.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "«Solución única» tiene DOS fabricantes: un cuadrático con discriminante cero… y también una ecuación que ni siquiera es cuadrática. ¿Qué pasa con $k = 0$?",
            "“Unique solution” has TWO manufacturers: a quadratic with zero discriminant… and also an equation that is not quadratic at all. What happens at $k = 0$?",
          ),
          L(
            "Con $k = 0$: $3x + 1 = 0$ es lineal y tiene exactamente una solución. Con $k \\neq 0$: exige $\\Delta = 9 - 4k = 0$.",
            "At $k = 0$: $3x + 1 = 0$ is linear and has exactly one solution. For $k \\neq 0$: require $\\Delta = 9 - 4k = 0$.",
          ),
          L(
            "$\\Delta = 0$ da $k = \\frac{9}{4}$. La respuesta completa junta ambos casos.",
            "$\\Delta = 0$ gives $k = \\frac{9}{4}$. The complete answer joins both cases.",
          ),
        ],
        answerDisplay: L(
          "$k \\in \\left\\{0,\\ \\dfrac{9}{4}\\right\\}$",
          "$k \\in \\left\\{0,\\ \\dfrac{9}{4}\\right\\}$",
        ),
        solution: [
          step(
            "given",
            "$kx^{2} + 3x + 1 = 0$; se pide solución única (una sola $x$ en el conjunto de verdad).",
            "$kx^{2} + 3x + 1 = 0$; a unique solution is required (a single $x$ in the truth set).",
          ),
          step(
            "approach",
            "Separar por naturaleza de la ecuación: el caso $k = 0$ (lineal) es invisible si uno asume «cuadrática» por contexto — aquí está el interés del ejercicio.",
            "Split by the equation's nature: the $k = 0$ case (linear) is invisible if one assumes “quadratic” from context — that is the point of this exercise.",
          ),
          step(
            "calculation",
            "Caso $k = 0$: $3x + 1 = 0 \\Rightarrow x = -\\dfrac{1}{3}$, única ✓.<br>Caso $k \\neq 0$ (cuadrática): solución única $\\Leftrightarrow \\Delta = 0$:<br>$\\Delta = 3^{2} - 4k = 9 - 4k = 0 \\Rightarrow k = \\dfrac{9}{4}$ (da $x = -\\frac{2}{3}$, doble).<br>Para cualquier otro $k$: $\\Delta > 0$ (dos soluciones) o $\\Delta < 0$ (ninguna).",
            "Case $k = 0$: $3x + 1 = 0 \\Rightarrow x = -\\dfrac{1}{3}$, unique ✓.<br>Case $k \\neq 0$ (quadratic): unique solution $\\Leftrightarrow \\Delta = 0$:<br>$\\Delta = 3^{2} - 4k = 9 - 4k = 0 \\Rightarrow k = \\dfrac{9}{4}$ (giving $x = -\\frac{2}{3}$, double).<br>For any other $k$: $\\Delta > 0$ (two solutions) or $\\Delta < 0$ (none).",
          ),
          step(
            "result",
            "$k \\in \\left\\{0, \\frac{9}{4}\\right\\}$. Nota: la clave impresa del libro solo lista $\\frac{9}{4}$; con el enunciado tal cual, $k = 0$ (ecuación lineal) también produce solución única, así que la respuesta completa incluye ambos valores (verificado con sympy y por barrido de $k$).",
            "$k \\in \\left\\{0, \\frac{9}{4}\\right\\}$. Note: the book's printed key lists only $\\frac{9}{4}$; as stated, $k = 0$ (a linear equation) also produces a unique solution, so the complete answer includes both values (verified with sympy and a sweep over $k$).",
          ),
        ],
      };
    },
  ),

  /* 83 — caída libre: mitad de la distancia en el último segundo → T = 2+√2 s. */
  template(
    {
      id: "quad-espol-ch2-83",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "applications",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 300,
      tags: ["modeling", "free-fall", "quadratic", "physics-flavored"],
      prerequisites: ["quadratic-formula"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 83",
        page: 241,
      },
      reasoning: "modeling",
    },
    () => ({
      skill: L("Modelo físico → cuadrática en el tiempo (g se cancela)", "Physical model → quadratic in time (g cancels out)"),
      statement: L(
        "Si un cuerpo recorre la mitad de la distancia total de caída libre durante el último segundo de su movimiento, a partir del reposo, calcular el tiempo de caída. Responde el tiempo total en segundos (dos decimales o la forma exacta); la altura se discute en la solución. (Sugerencia del libro: usa la ecuación cuadrática del tiempo.)",
        "If a body covers half of the total free-fall distance during the last second of its motion, starting from rest, find the fall time. Answer the total time in seconds (two decimals or the exact form); the height is discussed in the solution. (Book's hint: use the quadratic equation of time.)",
      ),
      answer: {
        kind: "numeric",
        value: 3.41421356,
        tolerance: { mode: "relative", value: 0.02 },
      },
      hints: [
        L(
          "Llamemos $T$ al tiempo total y $H = \\frac{1}{2}gT^{2}$ a la altura. La distancia recorrida en el último segundo es $H - \\frac{1}{2}g(T - 1)^{2}$.",
          "Call the total time $T$ and the height $H = \\frac{1}{2}gT^{2}$. The distance covered in the last second is $H - \\frac{1}{2}g(T - 1)^{2}$.",
        ),
        L(
          "La condición es $H - \\frac{1}{2}g(T-1)^{2} = \\frac{H}{2}$. Simplifica: el factor $\\frac{g}{2}$ se cancela en ambos lados.",
          "The condition is $H - \\frac{1}{2}g(T-1)^{2} = \\frac{H}{2}$. Simplify: the factor $\\frac{g}{2}$ cancels on both sides.",
        ),
        L(
          "Queda $T^{2} - (T-1)^{2} = \\frac{T^{2}}{2}$, es decir $2T - 1 = \\frac{T^{2}}{2}$; resuelve y quédate con la raíz $\\geq 1$ (necesitas un «último segundo»).",
          "You get $T^{2} - (T-1)^{2} = \\frac{T^{2}}{2}$, i.e. $2T - 1 = \\frac{T^{2}}{2}$; solve and keep the root $\\geq 1$ (a “last second” must exist).",
        ),
      ],
      answerDisplay: L(
        "$T = 2 + \\sqrt{2} \\approx 3{,}41\\ \\text{s}$",
        "$T = 2 + \\sqrt{2} \\approx 3.41\\ \\text{s}$",
      ),
      solution: [
        step(
          "given",
          "Cuerpo en caída libre desde el reposo; la distancia del último segundo es la mitad de la altura total. Modelo: $y(t) = \\frac{1}{2}gt^{2}$.",
          "Body in free fall from rest; the last-second distance is half the total height. Model: $y(t) = \\frac{1}{2}gt^{2}$.",
        ),
        step(
          "approach",
          "Traducir la frase a una ecuación en $T$ y descubrir que $g$ se cancela: el tiempo no depende de la gravedad (la altura sí).",
          "Translate the sentence into an equation in $T$ and find that $g$ cancels: the time does not depend on gravity (the height does).",
        ),
        step(
          "calculation",
          "$H = \\frac{g}{2}T^{2}$; distancia del último segundo $= \\frac{g}{2}\\left[T^{2} - (T-1)^{2}\\right] = \\frac{g}{2}(2T - 1)$.<br>Condición: $\\frac{g}{2}(2T - 1) = \\frac{1}{2} \\cdot \\frac{g}{2}T^{2}$; cancelando $\\frac{g}{2}$: $2T - 1 = \\frac{T^{2}}{2}$.<br>$T^{2} - 4T + 2 = 0 \\Rightarrow T = \\dfrac{4 \\pm \\sqrt{16 - 8}}{2} = 2 \\pm \\sqrt{2}$.<br>La raíz $2 - \\sqrt{2} \\approx 0{,}59$ s es $< 1$: no existiría «último segundo». Se toma $T = 2 + \\sqrt{2} \\approx 3{,}41$ s.",
          "$H = \\frac{g}{2}T^{2}$; last-second distance $= \\frac{g}{2}\\left[T^{2} - (T-1)^{2}\\right] = \\frac{g}{2}(2T - 1)$.<br>Condition: $\\frac{g}{2}(2T - 1) = \\frac{1}{2} \\cdot \\frac{g}{2}T^{2}$; canceling $\\frac{g}{2}$: $2T - 1 = \\frac{T^{2}}{2}$.<br>$T^{2} - 4T + 2 = 0 \\Rightarrow T = 2 \\pm \\sqrt{2}$.<br>The root $2 - \\sqrt{2} \\approx 0.59$ s is $< 1$: no “last second” would exist. Take $T = 2 + \\sqrt{2} \\approx 3.41$ s.",
        ),
        step(
          "result",
          "$T = 2 + \\sqrt{2} \\approx 3{,}41$ s (independiente de $g$; clave del libro: $2 + \\sqrt{2}$ ✓). La altura sería $H = \\frac{g}{2}T^{2} = \\frac{g}{2}(6 + 4\\sqrt{2})$: con $g = 9{,}8\\ \\text{m/s}^{2}$, $H \\approx 57{,}1$ m; con $g = 32\\ \\text{ft/s}^{2}$, $H \\approx 186{,}5$ ft. Verificación con $g = 9{,}8$: en el último segundo cae $\\frac{9{,}8}{2}(2 \\cdot 3.414 - 1) \\approx 28.55$ m $= \\frac{57.1}{2}$ ✓.",
          "$T = 2 + \\sqrt{2} \\approx 3.41$ s (independent of $g$; the book's key: $2 + \\sqrt{2}$ ✓). The height would be $H = \\frac{g}{2}T^{2} = \\frac{g}{2}(6 + 4\\sqrt{2})$: with $g = 9.8\\ \\text{m/s}^{2}$, $H \\approx 57.1$ m; with $g = 32\\ \\text{ft/s}^{2}$, $H \\approx 186.5$ ft. Check at $g = 9.8$: in the last second it falls $\\frac{9.8}{2}(2 \\cdot 3.414 - 1) \\approx 28.55$ m $= \\frac{57.1}{2}$ ✓.",
        ),
      ],
    }),
  ),

  /* 84 — ciclista 4 m/s², 3 m/s, a 20 m del punto → t = 5/2 s. */
  template(
    {
      id: "quad-espol-ch2-84",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "applications",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 210,
      tags: ["modeling", "kinematics", "quadratic", "physics-flavored"],
      prerequisites: ["quadratic-formula"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 84",
        page: 241,
      },
      reasoning: "modeling",
    },
    () => ({
      skill: L("Cinemática → cuadrática en el tiempo", "Kinematics → a quadratic in time"),
      statement: L(
        "Un ciclista acelera a $4\\ \\text{m/s}^{2}$ a partir de un cierto punto, con velocidad inicial de $3\\ \\text{m/s}$. Calcular el tiempo necesario para que el ciclista esté a 20 metros del punto. (Sugerencia del libro: usa la ecuación cuadrática del tiempo.)",
        "A cyclist accelerates at $4\\ \\text{m/s}^{2}$ from a certain point, with initial velocity $3\\ \\text{m/s}$. Find the time needed for the cyclist to be 20 meters from the point. (Book's hint: use the quadratic equation of time.)",
      ),
      answer: {
        kind: "numeric-unit",
        value: 2.5,
        units: ["s", "seg", "segundos", "seconds"],
        unitChoices: ["s", "min", "m/s", "m", "h"],
      },
      hints: [
        L(
          "Modelo: $s(t) = v_{0}t + \\frac{1}{2}at^{2}$ con $v_{0} = 3$, $a = 4$.",
          "Model: $s(t) = v_{0}t + \\frac{1}{2}at^{2}$ with $v_{0} = 3$, $a = 4$.",
        ),
        L(
          "La condición es $3t + 2t^{2} = 20$, o sea $2t^{2} + 3t - 20 = 0$.",
          "The condition is $3t + 2t^{2} = 20$, i.e. $2t^{2} + 3t - 20 = 0$.",
        ),
        L(
          "Factoriza buscando dos números para $(2t \\pm \\dots)(t \\pm \\dots)$; una raíz será negativa y se descarta.",
          "Factor it looking for two numbers for $(2t \\pm \\dots)(t \\pm \\dots)$; one root will be negative and is discarded.",
        ),
      ],
      answerDisplay: L(
        "$t = \\dfrac{5}{2}\\ \\text{s} = 2{,}5\\ \\text{s}$",
        "$t = \\dfrac{5}{2}\\ \\text{s} = 2.5\\ \\text{s}$",
      ),
      solution: [
        step(
          "given",
          "$v_{0} = 3\\ \\text{m/s}$, $a = 4\\ \\text{m/s}^{2}$, $s = 20\\ \\text{m}$; desde el punto, $s(t) = v_{0}t + \\frac{1}{2}at^{2}$.",
          "$v_{0} = 3\\ \\text{m/s}$, $a = 4\\ \\text{m/s}^{2}$, $s = 20\\ \\text{m}$; from the point, $s(t) = v_{0}t + \\frac{1}{2}at^{2}$.",
        ),
        step(
          "approach",
          "Sustituir en la ecuación de posición y resolver la cuadrática resultante en $t$; el tiempo no puede ser negativo.",
          "Substitute into the position equation and solve the resulting quadratic in $t$; time cannot be negative.",
        ),
        step(
          "calculation",
          "$3t + \\frac{1}{2}(4)t^{2} = 20 \\Rightarrow 2t^{2} + 3t - 20 = 0$<br>$\\Delta = 9 + 160 = 169$; $t = \\dfrac{-3 \\pm 13}{4}$<br>$t = \\dfrac{10}{4} = \\dfrac{5}{2}$ o $t = -4$ (descartada).",
          "$3t + \\frac{1}{2}(4)t^{2} = 20 \\Rightarrow 2t^{2} + 3t - 20 = 0$<br>$\\Delta = 9 + 160 = 169$; $t = \\dfrac{-3 \\pm 13}{4}$<br>$t = \\dfrac{10}{4} = \\dfrac{5}{2}$ or $t = -4$ (discarded).",
        ),
        step(
          "result",
          "$t = \\frac{5}{2}\\ \\text{s} = 2{,}5$ s (clave del libro: $\\frac{5}{2}$ ✓). Verificación: $3(2.5) + 2(2.5)^{2} = 7.5 + 12.5 = 20$ ✓.",
          "$t = \\frac{5}{2}\\ \\text{s} = 2.5$ s (the book's key: $\\frac{5}{2}$ ✓). Check: $3(2.5) + 2(2.5)^{2} = 7.5 + 12.5 = 20$ ✓.",
        ),
      ],
    }),
  ),

  /* ================================================================== */
  /* Curated — ESPOL Fundamentos, EDICIÓN DIGITAL (TUTOR_LICENSED).     */
  /* Chapter 3 «Funciones de variable real» §3.8, pp. 375-380.          */
  /* Tutor's brief: «vayas a por los ejercicios del cap 3».             */
  /* Every answer double-verified: printed key pp. 939-940 + sympy      */
  /* (download/verify_espol_ch3.py).                                    */
  /* ================================================================== */

  /* ch3 42 — producto de raíces = suma de raíces ⟺ b = −c (opción b). */
  template(
    {
      id: "quad-espol-ch3-42",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "roots",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 210,
      tags: ["vieta", "sum-product", "conceptual"],
      prerequisites: ["roots"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3 · 42",
        page: 375,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$a = b$`, `$a = b$`), correct: false },
        { id: "b", text: L(`$b = -c$`, `$b = -c$`), correct: true },
        { id: "c", text: L(`$a = c$`, `$a = c$`), correct: false },
        { id: "d", text: L(`$b = c$`, `$b = c$`), correct: false },
        { id: "e", text: L(`$c = -a$`, `$c = -a$`), correct: false },
      ];
      return {
        skill: L(
          "Vieta: ¿cuándo coinciden la suma y el producto de las raíces?",
          "Vieta: when do the sum and the product of the roots coincide?",
        ),
        statement: L(
          "Dada la función cuadrática $f(x) = ax^{2} + bx + c$, con $a, b, c \\in \\mathbb{R}$, $a \\neq 0$ y $b^{2} - 4ac > 0$, una condición necesaria y suficiente para que el producto de sus raíces sea igual a la suma de sus raíces es:",
          "Given the quadratic function $f(x) = ax^{2} + bx + c$, with $a, b, c \\in \\mathbb{R}$, $a \\neq 0$ and $b^{2} - 4ac > 0$, a necessary and sufficient condition for the product of its roots to equal the sum of its roots is:",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Escribe las dos fórmulas de Vieta: suma de raíces $= -\\dfrac{b}{a}$ y producto de raíces $= \\dfrac{c}{a}$.",
            "Write down the two Vieta formulas: sum of roots $= -\\dfrac{b}{a}$ and product of roots $= \\dfrac{c}{a}$.",
          ),
          L(
            "La condición «producto = suma» se traduce en $\\dfrac{c}{a} = -\\dfrac{b}{a}$. Como $a \\neq 0$, puedes multiplicar por $a$ sin peligro.",
            "The condition “product = sum” translates to $\\dfrac{c}{a} = -\\dfrac{b}{a}$. Since $a \\neq 0$, you may safely multiply by $a$.",
          ),
          L(
            "Obtendrás una relación donde $a$ desaparece: queda solo un vínculo entre $b$ y $c$. Comprueba tu candidata con una cuadrática concreta que cumpla $b^{2} - 4ac > 0$.",
            "You will get a relation where $a$ disappears: only a link between $b$ and $c$ remains. Test your candidate with a concrete quadratic satisfying $b^{2} - 4ac > 0$.",
          ),
        ],
        answerDisplay: L("$b = -c$", "$b = -c$"),
        solution: [
          step(
            "given",
            "$f(x) = ax^{2} + bx + c$, con $a, b, c \\in \\mathbb{R}$, $a \\neq 0$ y $b^{2} - 4ac > 0$ (raíces reales distintas $x_{1}, x_{2}$).",
            "$f(x) = ax^{2} + bx + c$, with $a, b, c \\in \\mathbb{R}$, $a \\neq 0$ and $b^{2} - 4ac > 0$ (two distinct real roots $x_{1}, x_{2}$).",
          ),
          step(
            "approach",
            "Expresar suma y producto con Vieta e imponer la igualdad; la hipótesis $b^{2} - 4ac > 0$ solo garantiza que las raíces existen — la condición que sale es un vínculo puramente entre coeficientes.",
            "Express sum and product via Vieta and impose the equality; the hypothesis $b^{2} - 4ac > 0$ only guarantees that the roots exist — the resulting condition is a link purely between coefficients.",
          ),
          step(
            "calculation",
            "Suma de raíces: $x_{1} + x_{2} = -\\dfrac{b}{a}$. Producto: $x_{1}x_{2} = \\dfrac{c}{a}$.<br>Igualar: $\\dfrac{c}{a} = -\\dfrac{b}{a}$; multiplicando por $a \\neq 0$: $c = -b$, es decir, $b = -c$.<br>El recíproco es inmediato: si $c = -b$, entonces $\\dfrac{c}{a} = -\\dfrac{b}{a}$ y el producto iguala a la suma. Necesaria y suficiente ✓.",
            "Sum of roots: $x_{1} + x_{2} = -\\dfrac{b}{a}$. Product: $x_{1}x_{2} = \\dfrac{c}{a}$.<br>Set them equal: $\\dfrac{c}{a} = -\\dfrac{b}{a}$; multiplying by $a \\neq 0$: $c = -b$, i.e. $b = -c$.<br>The converse is immediate: if $c = -b$ then $\\dfrac{c}{a} = -\\dfrac{b}{a}$ and the product equals the sum. Necessary and sufficient ✓.",
          ),
          step(
            "result",
            "La condición es $b = -c$ (opción b; clave del libro ✓). Verificación con $a = 1$, $b = -5$, $c = 5$: $x^{2} - 5x + 5$ cumple $\\Delta = 25 - 20 = 5 > 0$ y sus raíces tienen suma $5$ y producto $5$ — coinciden ✓.",
            "The condition is $b = -c$ (option b; the book's key ✓). Check with $a = 1$, $b = -5$, $c = 5$: $x^{2} - 5x + 5$ satisfies $\\Delta = 25 - 20 = 5 > 0$ and its roots have sum $5$ and product $5$ — they coincide ✓.",
          ),
        ],
      };
    },
  ),

  /* ch3 44 — f = |2x²−3x+1| − 2: la verdadera es la simetría respecto a x = 3/4 (opción b). */
  template(
    {
      id: "quad-espol-ch3-44",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "graphs",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 270,
      tags: ["absolute-value", "quadratic", "symmetry", "monotonicity"],
      prerequisites: ["graphs", "abs-equations"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3 · 44",
        page: 376,
      },
      reasoning: "graphical",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            `$f$ es creciente en $\\left[\\tfrac{1}{2}, +\\infty\\right)$`,
            `$f$ is increasing on $\\left[\\tfrac{1}{2}, +\\infty\\right)$`,
          ),
          correct: false,
        },
        {
          id: "b",
          text: L(
            `$f$ es simétrica respecto a la recta $x = \\tfrac{3}{4}$`,
            `$f$ is symmetric about the line $x = \\tfrac{3}{4}$`,
          ),
          correct: true,
        },
        {
          id: "c",
          text: L(`$f$ es par`, `$f$ is even`),
          correct: false,
        },
        {
          id: "d",
          text: L(
            `$f(1) + f\\left(\\tfrac{1}{2}\\right) > 0$`,
            `$f(1) + f\\left(\\tfrac{1}{2}\\right) > 0$`,
          ),
          correct: false,
        },
        {
          id: "e",
          text: L(`$f$ es decreciente en $(-\\infty, 1)$`, `$f$ is decreasing on $(-\\infty, 1)$`),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Qué le hace el valor absoluto al eje de simetría de una parábola",
          "What the absolute value does to a parabola's axis of symmetry",
        ),
        statement: L(
          "Si $f(x) = \\left|2x^{2} - 3x + 1\\right| - 2$, es **verdad** que:",
          "If $f(x) = \\left|2x^{2} - 3x + 1\\right| - 2$, it is **true** that:",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Empieza por la parábola interna $g(x) = 2x^{2} - 3x + 1$: completa el cuadrado para encontrar su eje de simetría.",
            "Start with the inner parabola $g(x) = 2x^{2} - 3x + 1$: complete the square to find its axis of symmetry.",
          ),
          L(
            "Pregúntate qué le pasa a ese eje cuando aplicas $|\\cdot|$ y luego restas 2: ¿alguna de las dos operaciones rompe la simetría?",
            "Ask yourself what happens to that axis when you apply $|\\cdot|$ and then subtract 2: does either operation break the symmetry?",
          ),
          L(
            "Para refutar las demás opciones basta un contraejemplo por opción: evalúa $f$ en $x = 1$, $x = \\frac{1}{2}$, $x = -1$, $x = 0$ y en dos puntos entre $\\frac{1}{2}$ y $\\frac{3}{4}$.",
            "To refute the remaining options one counterexample each is enough: evaluate $f$ at $x = 1$, $x = \\frac{1}{2}$, $x = -1$, $x = 0$ and at two points between $\\frac{1}{2}$ and $\\frac{3}{4}$.",
          ),
        ],
        answerDisplay: L(
          "Verdadera: $f$ es simétrica respecto a la recta $x = \\frac{3}{4}$",
          "True: $f$ is symmetric about the line $x = \\frac{3}{4}$",
        ),
        solution: [
          step(
            "given",
            "$f(x) = \\left|2x^{2} - 3x + 1\\right| - 2$. La parábola interna $g(x) = 2x^{2} - 3x + 1$ tiene raíces $\\frac{1}{2}$ y $1$, y es negativa entre ellas.",
            "$f(x) = \\left|2x^{2} - 3x + 1\\right| - 2$. The inner parabola $g(x) = 2x^{2} - 3x + 1$ has roots $\\frac{1}{2}$ and $1$, and is negative between them.",
          ),
          step(
            "approach",
            "Completar el cuadrado para ver la simetría de $g$ y razonar por qué la conserva el valor absoluto; después refutar las otras opciones con evaluaciones concretas (un contraejemplo basta).",
            "Complete the square to see the symmetry of $g$ and reason why the absolute value preserves it; then refute the other options with concrete evaluations (one counterexample is enough).",
          ),
          step(
            "calculation",
            "$g(x) = 2\\left(x - \\frac{3}{4}\\right)^{2} - \\frac{1}{8}$: simétrica respecto a $x = \\frac{3}{4}$. El valor absoluto conserva esa simetría porque $\\left|g\\left(\\frac{3}{4} + t\\right)\\right| = \\left|g\\left(\\frac{3}{4} - t\\right)\\right|$, y restar 2 tampoco la rompe → **b) verdadera**.<br>a) Falsa: en $\\left(\\frac{3}{4}, 1\\right)$ la parábola interna es negativa y sube hacia 0, así que $|g|$ cae de $\\frac{1}{8}$ a $0$ y $f$ decae.<br>c) Falsa: $f(-1) = |6| - 2 = 4 \\neq -2 = f(1)$ → no es par.<br>d) Falsa: $f(1) = -2$ y $f\\left(\\frac{1}{2}\\right) = -2$, suma $= -4 < 0$.<br>e) Falsa: $f\\left(\\frac{3}{5}\\right) = -\\frac{48}{25} < -\\frac{47}{25} = f\\left(\\frac{7}{10}\\right)$: $f$ crece entre esos dos puntos de $(-\\infty, 1)$.",
            "$g(x) = 2\\left(x - \\frac{3}{4}\\right)^{2} - \\frac{1}{8}$: symmetric about $x = \\frac{3}{4}$. The absolute value preserves that symmetry because $\\left|g\\left(\\frac{3}{4} + t\\right)\\right| = \\left|g\\left(\\frac{3}{4} - t\\right)\\right|$, and subtracting 2 does not break it either → **b is true**.<br>a) False: on $\\left(\\frac{3}{4}, 1\\right)$ the inner parabola is negative and rises toward 0, so $|g|$ falls from $\\frac{1}{8}$ to $0$ and $f$ decreases.<br>c) False: $f(-1) = |6| - 2 = 4 \\neq -2 = f(1)$ → not even.<br>d) False: $f(1) = -2$ and $f\\left(\\frac{1}{2}\\right) = -2$, sum $= -4 < 0$.<br>e) False: $f\\left(\\frac{3}{5}\\right) = -\\frac{48}{25} < -\\frac{47}{25} = f\\left(\\frac{7}{10}\\right)$: $f$ increases between those two points of $(-\\infty, 1)$.",
          ),
          step(
            "result",
            "Es **verdadera** la b): $f$ es simétrica respecto a la recta $x = \\frac{3}{4}$ — el valor absoluto «refleja» hacia arriba la parte negativa de la parábola pero mantiene su eje. Verificación con puntos simétricos: $f(0) = |1| - 2 = -1$ y $f\\left(\\frac{3}{2}\\right) = |1| - 2 = -1$, con $0$ y $\\frac{3}{2}$ simétricos respecto a $\\frac{3}{4}$ ✓.",
            "Statement **b** is true: $f$ is symmetric about the line $x = \\frac{3}{4}$ — the absolute value “reflects” the negative part of the parabola upward but keeps its axis. Check with symmetric points: $f(0) = |1| - 2 = -1$ and $f\\left(\\frac{3}{2}\\right) = |1| - 2 = -1$, with $0$ and $\\frac{3}{2}$ symmetric about $\\frac{3}{4}$ ✓.",
          ),
        ],
      };
    },
  ),

  /* ch3 48 — vértice (3,1) y P(5,9) → y = 2x²−12x+19 (claves: a) h,k; b) a=2; c) forma general). */
  template(
    {
      id: "quad-espol-ch3-48",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "completing-square",
      difficulty: "hard",
      questionType: "expression",
      estimatedTimeSec: 270,
      tags: ["vertex-form", "expansion", "graph-reading"],
      prerequisites: ["completing-square", "vertex"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3 · 48",
        page: 378,
      },
      reasoning: "graphical",
    },
    () => ({
      skill: L(
        "De la forma de vértice a la forma general",
        "From vertex form to general form",
      ),
      statement: L(
        "La figura del libro, aquí descrita con palabras, muestra parte de la curva $y = a(x - h)^{2} + k$: su **vértice** es el punto $(3, 1)$ y el punto $P(5, 9)$ pertenece a la curva. Escribe la ecuación de la curva en forma general (desarrollada), dando solo el lado derecho (por ejemplo en la forma $ax^{2} + bx + c$).",
        "The book's figure, described here in words, shows part of the curve $y = a(x - h)^{2} + k$: its **vertex** is the point $(3, 1)$ and the point $P(5, 9)$ lies on the curve. Write the equation of the curve in general (expanded) form, giving only the right-hand side (for instance in the form $ax^{2} + bx + c$).",
      ),
      answer: {
        kind: "expression",
        accepted: ["2x^2-12x+19", "2(x-3)^2+1", "2x^2 - 12x + 19"],
        variables: ["x"],
      },
      hints: [
        L(
          "Del vértice $(3, 1)$ salen dos de los tres parámetros de la forma de vértice: $h$ y $k$.",
          "Two of the three parameters of the vertex form come from the vertex $(3, 1)$: $h$ and $k$.",
        ),
        L(
          "Sustituye el punto $P(5, 9)$ en $y = a(x - 3)^{2} + 1$ para despejar el único parámetro restante, $a$.",
          "Substitute the point $P(5, 9)$ into $y = a(x - 3)^{2} + 1$ to solve for the only remaining parameter, $a$.",
        ),
        L(
          "Con $a$, $h$ y $k$ conocidos, desarrolla el binomio al cuadrado, multiplica por $a$ y suma $k$ para llegar a la forma general.",
          "With $a$, $h$ and $k$ known, expand the squared binomial, multiply by $a$ and add $k$ to reach the general form.",
        ),
      ],
      answerDisplay: L(
        "$y = 2(x - 3)^{2} + 1 = 2x^{2} - 12x + 19$",
        "$y = 2(x - 3)^{2} + 1 = 2x^{2} - 12x + 19$",
      ),
      solution: [
        step(
          "given",
          "Curva $y = a(x - h)^{2} + k$ con vértice $(3, 1)$ y punto $P(5, 9)$ sobre ella.",
          "Curve $y = a(x - h)^{2} + k$ with vertex $(3, 1)$ and point $P(5, 9)$ on it.",
        ),
        step(
          "approach",
          "Leer $h$ y $k$ del vértice, hallar $a$ imponiendo el punto $P$ y finalmente desarrollar la forma de vértice hasta la forma general (así lo pide el libro en su inciso c).",
          "Read $h$ and $k$ from the vertex, find $a$ by imposing the point $P$ and finally expand the vertex form into the general form (as the book's item c asks).",
        ),
        step(
          "calculation",
          "Vértice $(3, 1)$: $h = 3$, $k = 1$.<br>Punto $P(5, 9)$: $a(5 - 3)^{2} + 1 = 9 \\Rightarrow 4a = 8 \\Rightarrow a = 2$.<br>$y = 2(x - 3)^{2} + 1 = 2(x^{2} - 6x + 9) + 1 = 2x^{2} - 12x + 18 + 1 = 2x^{2} - 12x + 19$.",
          "Vertex $(3, 1)$: $h = 3$, $k = 1$.<br>Point $P(5, 9)$: $a(5 - 3)^{2} + 1 = 9 \\Rightarrow 4a = 8 \\Rightarrow a = 2$.<br>$y = 2(x - 3)^{2} + 1 = 2(x^{2} - 6x + 9) + 1 = 2x^{2} - 12x + 18 + 1 = 2x^{2} - 12x + 19$.",
        ),
        step(
          "result",
          "$y = 2x^{2} - 12x + 19$ (clave del libro, inciso c ✓; sus claves a) $h = 3$, $k = 1$ y b) $a = 2$ son los pasos intermedios). Verificación: $2(5)^{2} - 12(5) + 19 = 50 - 60 + 19 = 9$ → el punto $P$ cumple ✓; el vértice está en $x = \\frac{12}{2 \\cdot 2} = 3$ y $y(3) = 18 - 36 + 19 = 1$ ✓.",
          "$y = 2x^{2} - 12x + 19$ (the book's key, item c ✓; its keys a) $h = 3$, $k = 1$ and b) $a = 2$ are the intermediate steps). Check: $2(5)^{2} - 12(5) + 19 = 50 - 60 + 19 = 9$ → the point $P$ lies on it ✓; the vertex sits at $x = \\frac{12}{2 \\cdot 2} = 3$ and $y(3) = 18 - 36 + 19 = 1$ ✓.",
        ),
      ],
    }),
  ),

  /* ch3 53c — bien a 100 dólares, costo x²+20x+700 → utilidad máxima 900 (con x = 40). */
  template(
    {
      id: "quad-espol-ch3-53c",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "applications",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 300,
      tags: ["modeling", "profit", "maximum"],
      prerequisites: ["applications", "vertex"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3 · 53c",
        page: 380,
      },
      reasoning: "modeling",
    },
    () => ({
      skill: L(
        "Utilidad máxima: ingreso menos costo, vértice de la parábola",
        "Maximum profit: revenue minus cost, vertex of the parabola",
      ),
      statement: L(
        "Una empresa puede vender un bien de primera necesidad a 100 dólares por unidad. Si se producen $x$ unidades diarias, el costo diario de producción en dólares es $x^{2} + 20x + 700$. Calcula la **máxima utilidad diaria** (responde en dólares).",
        "A company can sell a staple good at 100 dollars per unit. If $x$ units are produced per day, the daily production cost in dollars is $x^{2} + 20x + 700$. Find the **maximum daily profit** (answer in dollars).",
      ),
      answer: { kind: "numeric", value: 900 },
      hints: [
        L(
          "La utilidad es ingreso menos costo. El ingreso diario es precio por cantidad: $I(x) = 100x$ dólares.",
          "Profit is revenue minus cost. The daily revenue is price times quantity: $I(x) = 100x$ dollars.",
        ),
        L(
          "La utilidad queda $U(x) = 100x - (x^{2} + 20x + 700)$; simplifícala: es una cuadrática que abre hacia abajo.",
          "The profit becomes $U(x) = 100x - (x^{2} + 20x + 700)$; simplify it: a downward-opening quadratic.",
        ),
        L(
          "El máximo de una parábola que abre hacia abajo está en su vértice, $x_{v} = -\\dfrac{B}{2A}$. Evalúa la utilidad en ese punto.",
          "The maximum of a downward-opening parabola sits at its vertex, $x_{v} = -\\dfrac{B}{2A}$. Evaluate the profit there.",
        ),
      ],
      answerDisplay: L(
        "Utilidad máxima $= 900$ dólares (con $x = 40$ unidades diarias)",
        "Maximum profit $= 900$ dollars (at $x = 40$ units per day)",
      ),
      solution: [
        step(
          "given",
          "Precio de venta: 100 dólares por unidad; costo diario $C(x) = x^{2} + 20x + 700$ dólares al producir $x$ unidades diarias.",
          "Selling price: 100 dollars per unit; daily cost $C(x) = x^{2} + 20x + 700$ dollars when $x$ units per day are produced.",
        ),
        step(
          "approach",
          "Construir la función de utilidad $U(x) = I(x) - C(x)$ y maximizarla con el vértice de la parábola (coeficiente principal negativo).",
          "Build the profit function $U(x) = I(x) - C(x)$ and maximize it with the vertex of the parabola (negative leading coefficient).",
        ),
        step(
          "calculation",
          "$U(x) = 100x - (x^{2} + 20x + 700) = -x^{2} + 80x - 700$.<br>Vértice: $x_{v} = -\\dfrac{80}{2(-1)} = 40$.<br>$U(40) = -(40)^{2} + 80(40) - 700 = -1600 + 3200 - 700 = 900$.",
          "$U(x) = 100x - (x^{2} + 20x + 700) = -x^{2} + 80x - 700$.<br>Vertex: $x_{v} = -\\dfrac{80}{2(-1)} = 40$.<br>$U(40) = -(40)^{2} + 80(40) - 700 = -1600 + 3200 - 700 = 900$.",
        ),
        step(
          "result",
          "La máxima utilidad diaria es 900 dólares, alcanzada produciendo $x = 40$ unidades (clave del libro ✓). Verificación: ingreso $= 100 \\cdot 40 = 4000$ y costo $= 1600 + 800 + 700 = 3100$; $4000 - 3100 = 900$ ✓. Además $U(39) = 3900 - (1521 + 780 + 700) = 899 < 900$: el máximo está en 40 ✓.",
          "The maximum daily profit is 900 dollars, attained at $x = 40$ units (the book's key ✓). Check: revenue $= 100 \\cdot 40 = 4000$ and cost $= 1600 + 800 + 700 = 3100$; $4000 - 3100 = 900$ ✓. Also $U(39) = 3900 - (1521 + 780 + 700) = 899 < 900$: the maximum is at 40 ✓.",
        ),
      ],
    }),
  ),

  /* ch3 54 — demanda p²+x² = 169, oferta p = x+7 → precio de equilibrio 12 (opción b). */
  template(
    {
      id: "quad-espol-ch3-54",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "applications",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["modeling", "supply-demand", "equilibrium"],
      prerequisites: ["applications", "quadratic-formula"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3 · 54",
        page: 380,
      },
      reasoning: "modeling",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$5$`, `$5$`), correct: false },
        { id: "b", text: L(`$12$`, `$12$`), correct: true },
        { id: "c", text: L(`$22$`, `$22$`), correct: false },
        { id: "d", text: L(`$19$`, `$19$`), correct: false },
        { id: "e", text: L(`$17$`, `$17$`), correct: false },
      ];
      return {
        skill: L(
          "Equilibrio oferta-demanda con una demanda cuadrática",
          "Supply-demand equilibrium with a quadratic demand",
        ),
        statement: L(
          "La demanda de los bienes producidos por una industria está dada por $p^{2} + x^{2} = 169$, donde $p$ es el precio unitario y $x$ la cantidad demandada. La oferta es $p = x + 7$. El precio de equilibrio es:",
          "The demand for the goods produced by an industry is given by $p^{2} + x^{2} = 169$, where $p$ is the unit price and $x$ the quantity demanded. The supply is $p = x + 7$. The equilibrium price is:",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "En el equilibrio, oferta y demanda describen el mismo par $(x, p)$: sustituye $p = x + 7$ en la ecuación de la demanda.",
            "At equilibrium, supply and demand describe the same pair $(x, p)$: substitute $p = x + 7$ into the demand equation.",
          ),
          L(
            "Al sustituir queda una cuadrática en $x$ con un factor 2 común; divídela entre 2 y factoriza buscando dos números con producto $-60$.",
            "After substituting you get a quadratic in $x$ with a common factor 2; divide by 2 and factor it looking for two numbers with product $-60$.",
          ),
          L(
            "Descarta la raíz negativa (una cantidad demandada no puede serlo) y recupera el precio con $p = x + 7$.",
            "Discard the negative root (a demanded quantity cannot be negative) and recover the price with $p = x + 7$.",
          ),
        ],
        answerDisplay: L("$p = 12$", "$p = 12$"),
        solution: [
          step(
            "given",
            "Demanda: $p^{2} + x^{2} = 169$; oferta: $p = x + 7$.",
            "Demand: $p^{2} + x^{2} = 169$; supply: $p = x + 7$.",
          ),
          step(
            "approach",
            "Igualar los dos modelos (mismo punto de equilibrio), resolver la cuadrática resultante en $x$ y quedarse con la solución económicamente válida ($x \\geq 0$).",
            "Set the two models equal (the same equilibrium point), solve the resulting quadratic in $x$ and keep the economically valid solution ($x \\geq 0$).",
          ),
          step(
            "calculation",
            "$(x + 7)^{2} + x^{2} = 169 \\Rightarrow x^{2} + 14x + 49 + x^{2} = 169 \\Rightarrow 2x^{2} + 14x - 120 = 0 \\Rightarrow x^{2} + 7x - 60 = 0$.<br>$(x + 12)(x - 5) = 0 \\Rightarrow x = 5$ (se descarta $x = -12$: cantidad negativa).<br>Precio de equilibrio: $p = x + 7 = 12$.",
            "$(x + 7)^{2} + x^{2} = 169 \\Rightarrow x^{2} + 14x + 49 + x^{2} = 169 \\Rightarrow 2x^{2} + 14x - 120 = 0 \\Rightarrow x^{2} + 7x - 60 = 0$.<br>$(x + 12)(x - 5) = 0 \\Rightarrow x = 5$ (discarding $x = -12$: a negative quantity).<br>Equilibrium price: $p = x + 7 = 12$.",
          ),
          step(
            "result",
            "El precio de equilibrio es $p = 12$ (opción b; clave del libro ✓). Verificación: en la demanda, $12^{2} + 5^{2} = 144 + 25 = 169$ ✓, y la oferta da $p = 5 + 7 = 12$ ✓.",
            "The equilibrium price is $p = 12$ (option b; the book's key ✓). Check: in the demand, $12^{2} + 5^{2} = 144 + 25 = 169$ ✓, and the supply gives $p = 5 + 7 = 12$ ✓.",
          ),
        ],
      };
    },
  ),

  /* ch3 57b — libro: costo 15, precio x, ventas (100000−4000x) → precio óptimo x = 20 (opción b; 20000 libros: c). */
  template(
    {
      id: "quad-espol-ch3-57b",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "applications",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 300,
      tags: ["modeling", "profit", "maximum", "vertex"],
      prerequisites: ["applications", "vertex"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3 · 57b",
        page: 380,
      },
      reasoning: "modeling",
    },
    () => ({
      skill: L(
        "Precio que maximiza la utilidad: (precio − costo) × ventas",
        "Price that maximizes profit: (price − cost) × sales",
      ),
      statement: L(
        "Un libro de texto de matemáticas cuesta 15 dólares de producir y luego se vende a $x$ dólares. En total se venden $(100000 - 4000x)$ libros. Determina el precio de venta $x$ que produce la **máxima utilidad total** (responde $x$ en dólares).",
        "A math textbook costs 15 dollars to produce and is then sold for $x$ dollars. A total of $(100000 - 4000x)$ books are sold. Determine the selling price $x$ that produces the **maximum total profit** (answer $x$ in dollars).",
      ),
      answer: { kind: "numeric", value: 20 },
      hints: [
        L(
          "La utilidad por libro es $(x - 15)$ dólares y el número de libros vendidos es $(100000 - 4000x)$.",
          "The profit per book is $(x - 15)$ dollars and the number of books sold is $(100000 - 4000x)$.",
        ),
        L(
          "La utilidad total es el producto: $U(x) = (x - 15)(100000 - 4000x)$, una cuadrática que abre hacia abajo.",
          "The total profit is the product: $U(x) = (x - 15)(100000 - 4000x)$, a downward-opening quadratic.",
        ),
        L(
          "Vía corta: halla los dos ceros de $U$ (uno se lee directo en el primer factor) y usa la simetría de la parábola — el vértice está en el punto medio de sus ceros.",
          "Shortcut: find the two zeros of $U$ (one reads off directly from the first factor) and use the parabola's symmetry — the vertex lies at the midpoint of its zeros.",
        ),
      ],
      answerDisplay: L(
        "$x = 20$ dólares (se venden 20000 libros)",
        "$x = 20$ dollars (20000 books are sold)",
      ),
      solution: [
        step(
          "given",
          "Costo de producción: 15 dólares por libro; precio de venta: $x$ dólares; libros vendidos: $(100000 - 4000x)$.",
          "Production cost: 15 dollars per book; selling price: $x$ dollars; books sold: $(100000 - 4000x)$.",
        ),
        step(
          "approach",
          "Modelar la utilidad total como (precio − costo) × cantidad vendida y maximizar la cuadrática resultante con su vértice.",
          "Model the total profit as (price − cost) × quantity sold and maximize the resulting quadratic with its vertex.",
        ),
        step(
          "calculation",
          "$U(x) = (x - 15)(100000 - 4000x) = 100000x - 4000x^{2} - 1500000 + 60000x = -4000x^{2} + 160000x - 1500000$.<br>Vértice: $x_{v} = -\\dfrac{160000}{2(-4000)} = 20$.<br>(Equivalente: los ceros son $x = 15$ y $x = 25$; el vértice está en su punto medio).",
          "$U(x) = (x - 15)(100000 - 4000x) = 100000x - 4000x^{2} - 1500000 + 60000x = -4000x^{2} + 160000x - 1500000$.<br>Vertex: $x_{v} = -\\dfrac{160000}{2(-4000)} = 20$.<br>(Equivalent: the zeros are $x = 15$ and $x = 25$; the vertex is at their midpoint).",
        ),
        step(
          "result",
          "El precio que maximiza la utilidad total es $x = 20$ dólares (opción b del libro ✓); con ese precio se venden $100000 - 4000(20) = 20000$ libros (opción c). Verificación: $U(20) = (20 - 15) \\cdot 20000 = 100000$; $U(19) = 4 \\cdot 24000 = 96000$ y $U(21) = 6 \\cdot 16000 = 96000$: el máximo está en 20 ✓.",
          "The price that maximizes the total profit is $x = 20$ dollars (the book's option b ✓); at that price $100000 - 4000(20) = 20000$ books are sold (option c). Check: $U(20) = (20 - 15) \\cdot 20000 = 100000$; $U(19) = 4 \\cdot 24000 = 96000$ and $U(21) = 6 \\cdot 16000 = 96000$: the maximum is at 20 ✓.",
        ),
      ],
    }),
  ),

  /* ---------------------------------------------------------------------- */
  /* Recopilación del autor · ronda 2 (2026-10-05) — parábolas con          */
  /* parámetro: «positiva para todo x» (ítem 21 y variaciones               */
  /* 21.1–21.8 de la hoja del tutor). Clave del autor verificada con        */
  /* sympy: download/verify_author_round2.py.                               */
  /* ---------------------------------------------------------------------- */

  /* 21 — x²+2ax+1>0 para todo x ⇔ 4a²−4<0 → a∈(−1,1): la familia en su caso puro. */
  template(
    {
      id: "quad-autor2-21",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "discriminant",
      difficulty: "hard",
      questionType: "text",
      estimatedTimeSec: 240,
      tags: ["parameter", "discriminant", "constant-sign"],
      prerequisites: ["discriminant", "quadratic-formula"],
      source: {
        sourceId: "autor-recopilacion-2025",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "R2 · 21",
      },
      reasoning: "parameters",
    },
    () => ({
      skill: L(
        "Parábolas con parámetro: positiva para todo $x$",
        "Parameter parabolas: positive for all $x$",
      ),
      statement: L(
        "Halla todos los $a \\in \\mathbb{R}$ tales que $x^{2} + 2ax + 1 > 0$ para todo $x \\in \\mathbb{R}$ (responde el intervalo de $a$; admite (-1, 1) o -1<a<1).",
        "Find all $a \\in \\mathbb{R}$ such that $x^{2} + 2ax + 1 > 0$ for every $x \\in \\mathbb{R}$ (answer with the interval of $a$; both (-1, 1) and -1<a<1 are accepted).",
      ),
      answer: {
        kind: "text",
        accepted: ["(-1, 1)", "(-1,1)", "-1<a<1", "-1 < a < 1"],
      },
      hints: [
        L(
          "Para que una parábola conserve el signo no debe cortar al eje $x$: esta abre hacia arriba, así que hay que pedirle que se quede estrictamente por encima del eje.",
          "For a parabola to keep its sign it must not cross the $x$-axis: this one opens upward, so it must stay strictly above the axis.",
        ),
        L(
          "Discriminante y signo del coeficiente principal: el principal es $1$ (fijo), así que solo queda imponer $\\Delta = (2a)^{2} - 4 < 0$.",
          "Discriminant and sign of the leading coefficient: the leading one is $1$ (fixed), so all that remains is to impose $\\Delta = (2a)^{2} - 4 < 0$.",
        ),
        L(
          "La condición se reduce a $a^{2} < 1$. Comprueba los extremos sustituyendo $a = 1$ y $a = -1$ en la expresión original antes de decidir si el intervalo es abierto o cerrado.",
          "The condition reduces to $a^{2} < 1$. Test the endpoints by substituting $a = 1$ and $a = -1$ into the original expression before deciding whether the interval is open or closed.",
        ),
      ],
      answerDisplay: L("$a \\in (-1, 1)$", "$a \\in (-1, 1)$"),
      solution: [
        step(
          "given",
          "La inecuación $x^{2} + 2ax + 1 > 0$ debe cumplirse para todo $x \\in \\mathbb{R}$; $a$ es un parámetro real por determinar.",
          "The inequality $x^{2} + 2ax + 1 > 0$ must hold for every $x \\in \\mathbb{R}$; $a$ is a real parameter to be determined.",
        ),
        step(
          "approach",
          "Una parábola que abre hacia arriba es positiva en todo $\\mathbb{R}$ exactamente cuando no tiene raíces reales, es decir, cuando su discriminante es negativo (equivale a pedirle mínimo $> 0$).",
          "An upward-opening parabola is positive on all of $\\mathbb{R}$ exactly when it has no real roots, i.e. when its discriminant is negative (equivalent to asking for minimum $> 0$).",
        ),
        step(
          "calculation",
          "$\\Delta = (2a)^{2} - 4 \\cdot 1 \\cdot 1 = 4a^{2} - 4$.<br>Imponer $\\Delta < 0$: $4a^{2} - 4 < 0 \\Rightarrow a^{2} < 1 \\Rightarrow -1 < a < 1$.<br>Control por el vértice: el mínimo está en $x = -a$ y vale $1 - a^{2}$; pedir $1 - a^{2} > 0$ da la misma condición.",
          "$\\Delta = (2a)^{2} - 4 \\cdot 1 \\cdot 1 = 4a^{2} - 4$.<br>Impose $\\Delta < 0$: $4a^{2} - 4 < 0 \\Rightarrow a^{2} < 1 \\Rightarrow -1 < a < 1$.<br>Vertex cross-check: the minimum is at $x = -a$ and equals $1 - a^{2}$; asking $1 - a^{2} > 0$ gives the same condition.",
        ),
        step(
          "result",
          "$a \\in (-1, 1)$ (clave del autor ✓). Verificación: $a = 0$: $x^{2} + 1 > 0$ para todo $x$ ✓; $a = \\frac{1}{2}$: mínimo $1 - \\frac{1}{4} = \\frac{3}{4} > 0$ ✓; $a = 1$: $(x + 1)^{2} \\ge 0$ se anula en $x = -1$, no es $> 0$ ✗.",
          "$a \\in (-1, 1)$ (the author's key ✓). Check: $a = 0$: $x^{2} + 1 > 0$ for all $x$ ✓; $a = \\frac{1}{2}$: minimum $1 - \\frac{1}{4} = \\frac{3}{4} > 0$ ✓; $a = 1$: $(x + 1)^{2} \\ge 0$ vanishes at $x = -1$, not $> 0$ ✗.",
        ),
      ],
    }),
  ),

  /* 21.1 — x²−2ax+a+2>0 ⇔ 4(a−2)(a+1)<0 → a∈(−1,2). */
  template(
    {
      id: "quad-autor2-21-1",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "discriminant",
      difficulty: "hard",
      questionType: "text",
      estimatedTimeSec: 240,
      tags: ["parameter", "discriminant", "constant-sign"],
      prerequisites: ["discriminant", "quadratic-formula"],
      source: {
        sourceId: "autor-recopilacion-2025",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "R2 · 21.1",
      },
      reasoning: "parameters",
    },
    () => ({
      skill: L(
        "Parábolas con parámetro: mínimo siempre positivo",
        "Parameter parabolas: an always-positive minimum",
      ),
      statement: L(
        "Halla todos los $a \\in \\mathbb{R}$ tales que $x^{2} - 2ax + a + 2 > 0$ para todo $x \\in \\mathbb{R}$ (responde el intervalo de $a$; admite (-1, 2) o -1<a<2).",
        "Find all $a \\in \\mathbb{R}$ such that $x^{2} - 2ax + a + 2 > 0$ for every $x \\in \\mathbb{R}$ (answer with the interval of $a$; both (-1, 2) and -1<a<2 are accepted).",
      ),
      answer: {
        kind: "text",
        accepted: ["(-1, 2)", "(-1,2)", "-1<a<2", "-1 < a < 2"],
      },
      hints: [
        L(
          "Para que una parábola conserve el signo debe quedar entera de un lado del eje $x$: como esta abre hacia arriba, su mínimo tiene que ser positivo.",
          "For a parabola to keep its sign it must lie entirely on one side of the $x$-axis: since this one opens upward, its minimum has to be positive.",
        ),
        L(
          "El coeficiente principal es $1$, pero el término independiente depende de $a$: plantea $\\Delta = (-2a)^{2} - 4(a + 2) < 0$ y factoriza el resultado.",
          "The leading coefficient is $1$, but the constant term depends on $a$: set up $\\Delta = (-2a)^{2} - 4(a + 2) < 0$ and factor the result.",
        ),
        L(
          "El trinomio en $a$ tiene dos raíces enteras. En cada extremo la expresión original se vuelve un cuadrado perfecto: sustituye y decide si esos valores entran.",
          "The trinomial in $a$ has two integer roots. At each endpoint the original expression becomes a perfect square: substitute and decide whether those values belong.",
        ),
      ],
      answerDisplay: L("$a \\in (-1, 2)$", "$a \\in (-1, 2)$"),
      solution: [
        step(
          "given",
          "La inecuación $x^{2} - 2ax + a + 2 > 0$ debe cumplirse para todo $x \\in \\mathbb{R}$; $a$ es un parámetro real.",
          "The inequality $x^{2} - 2ax + a + 2 > 0$ must hold for every $x \\in \\mathbb{R}$; $a$ is a real parameter.",
        ),
        step(
          "approach",
          "Parábola con coeficiente principal $1 > 0$: es positiva en todo $\\mathbb{R}$ si y solo si $\\Delta < 0$. El discriminante queda en función de $a$ y la condición se convierte en una inecuación cuadrática en $a$.",
          "A parabola with leading coefficient $1 > 0$: it is positive on all of $\\mathbb{R}$ if and only if $\\Delta < 0$. The discriminant becomes a function of $a$ and the condition turns into a quadratic inequality in $a$.",
        ),
        step(
          "calculation",
          "$\\Delta = (-2a)^{2} - 4 \\cdot 1 \\cdot (a + 2) = 4a^{2} - 4a - 8 = 4(a - 2)(a + 1)$.<br>Imponer $\\Delta < 0$: $(a - 2)(a + 1) < 0 \\iff -1 < a < 2$.<br>Control: el mínimo está en $x = a$ y vale $a + 2 - a^{2} = -(a - 2)(a + 1)$; pedirle $> 0$ da la misma condición.",
          "$\\Delta = (-2a)^{2} - 4 \\cdot 1 \\cdot (a + 2) = 4a^{2} - 4a - 8 = 4(a - 2)(a + 1)$.<br>Impose $\\Delta < 0$: $(a - 2)(a + 1) < 0 \\iff -1 < a < 2$.<br>Cross-check: the minimum is at $x = a$ and equals $a + 2 - a^{2} = -(a - 2)(a + 1)$; asking it to be $> 0$ gives the same condition.",
        ),
        step(
          "result",
          "$a \\in (-1, 2)$ (clave del autor ✓). Verificación: $a = 0$: $x^{2} + 2 > 0$ ✓; $a = 1$: $x^{2} - 2x + 3 = (x - 1)^{2} + 2 > 0$ ✓; $a = 2$: $(x - 2)^{2} \\ge 0$ se anula en $x = 2$, no es $> 0$ ✗ (y con $a = -1$: $(x + 1)^{2}$, igual ✗).",
          "$a \\in (-1, 2)$ (the author's key ✓). Check: $a = 0$: $x^{2} + 2 > 0$ ✓; $a = 1$: $x^{2} - 2x + 3 = (x - 1)^{2} + 2 > 0$ ✓; $a = 2$: $(x - 2)^{2} \\ge 0$ vanishes at $x = 2$, not $> 0$ ✗ (and with $a = -1$: $(x + 1)^{2}$, likewise ✗).",
        ),
      ],
    }),
  ),

  /* 21.2 — (a−1)x²+2(a−1)x+(a+2)>0: a=1 degenera en la constante 3>0 → a∈[1,∞). */
  template(
    {
      id: "quad-autor2-21-2",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "discriminant",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 360,
      tags: ["parameter", "discriminant", "degenerate-case"],
      prerequisites: ["discriminant", "quadratic-formula"],
      source: {
        sourceId: "autor-recopilacion-2025",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "R2 · 21.2",
      },
      reasoning: "parameters",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$a \\in [1, \\infty)$`, `$a \\in [1, \\infty)$`), correct: true },
        { id: "b", text: L(`$a \\in (1, \\infty)$`, `$a \\in (1, \\infty)$`), correct: false },
        { id: "c", text: L(`$a \\in (-\\infty, 1]$`, `$a \\in (-\\infty, 1]$`), correct: false },
        { id: "d", text: L(`$\\varnothing$`, `$\\varnothing$`), correct: false },
      ];
      return {
        skill: L(
          "Parábolas con parámetro: cuadrática que degenera en constante",
          "Parameter parabolas: a quadratic that degenerates to a constant",
        ),
        statement: L(
          "Halla todos los $a \\in \\mathbb{R}$ tales que $(a - 1)x^{2} + 2(a - 1)x + (a + 2) > 0$ para todo $x \\in \\mathbb{R}$.",
          "Find all $a \\in \\mathbb{R}$ such that $(a - 1)x^{2} + 2(a - 1)x + (a + 2) > 0$ for every $x \\in \\mathbb{R}$.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Para que una parábola conserve el signo, su coeficiente principal decide hacia dónde abre — pero aquí ese coeficiente es $(a - 1)$ y puede anularse: separa primero ese caso.",
            "For a parabola to keep its sign, its leading coefficient decides which way it opens — but here that coefficient is $(a - 1)$ and it can vanish: split off that case first.",
          ),
          L(
            "Si $a \\neq 1$, pide a la vez abrir hacia arriba ($a - 1 > 0$) y no cortar al eje ($\\Delta < 0$). Calcula $\\Delta = 4(a - 1)^{2} - 4(a - 1)(a + 2)$ y factoriza.",
            "If $a \\neq 1$, require at once opening upward ($a - 1 > 0$) and not crossing the axis ($\\Delta < 0$). Compute $\\Delta = 4(a - 1)^{2} - 4(a - 1)(a + 2)$ and factor.",
          ),
          L(
            "No olvides el caso $a = 1$, donde la ecuación deja de ser cuadrática: sustituye y mira qué número queda y con qué signo.",
            "Do not forget the case $a = 1$, where the equation stops being quadratic: substitute and see what number remains and with which sign.",
          ),
        ],
        answerDisplay: L(
          "$a \\in [1, \\infty)$ (el extremo $a = 1$ es el caso degenerado: queda la constante $3 > 0$)",
          "$a \\in [1, \\infty)$ (the endpoint $a = 1$ is the degenerate case: the constant $3 > 0$ remains)",
        ),
        solution: [
          step(
            "given",
            "La inecuación $(a - 1)x^{2} + 2(a - 1)x + (a + 2) > 0$ debe cumplirse para todo $x \\in \\mathbb{R}$; el coeficiente principal $(a - 1)$ depende del parámetro.",
            "The inequality $(a - 1)x^{2} + 2(a - 1)x + (a + 2) > 0$ must hold for every $x \\in \\mathbb{R}$; the leading coefficient $(a - 1)$ depends on the parameter.",
          ),
          step(
            "approach",
            "Caso degenerado $a = 1$ aparte; para $a \\neq 1$ la expresión es cuadrática y «positiva en todo $\\mathbb{R}$» exige abrir hacia arriba ($a - 1 > 0$) y $\\Delta < 0$.",
            "Handle the degenerate case $a = 1$ separately; for $a \\neq 1$ the expression is quadratic and “positive on all of $\\mathbb{R}$” requires opening upward ($a - 1 > 0$) and $\\Delta < 0$.",
          ),
          step(
            "calculation",
            "$a = 1$: $0 \\cdot x^{2} + 0 \\cdot x + 3 = 3 > 0$ ✓ para todo $x$ (degenera en constante).<br>$a \\neq 1$: $\\Delta = 4(a - 1)^{2} - 4(a - 1)(a + 2) = 4(a - 1)\\left[(a - 1) - (a + 2)\\right] = -12(a - 1)$; pedir $\\Delta < 0$ da $a > 1$, lo mismo que abrir hacia arriba.<br>Unión: $a > 1$ junto con el caso $a = 1$.",
            "$a = 1$: $0 \\cdot x^{2} + 0 \\cdot x + 3 = 3 > 0$ ✓ for all $x$ (it degenerates to a constant).<br>$a \\neq 1$: $\\Delta = 4(a - 1)^{2} - 4(a - 1)(a + 2) = 4(a - 1)\\left[(a - 1) - (a + 2)\\right] = -12(a - 1)$; requiring $\\Delta < 0$ gives $a > 1$, the same as opening upward.<br>Union: $a > 1$ together with the case $a = 1$.",
          ),
          step(
            "result",
            "$a \\in [1, \\infty)$ (clave del autor ✓; el extremo $a = 1$ es exactamente el caso degenerado). Verificación: $a = 1$: la constante $3 > 0$ ✓; $a = 2$: $x^{2} + 2x + 4$ con mínimo $1 - 2 + 4 = 3 > 0$ ✓ ($\\Delta = 4 - 16 = -12 < 0$); $a = 0$: $-x^{2} - 2x + 2$ abre hacia abajo y en $x = 10$ da $-118 < 0$ ✗.",
            "$a \\in [1, \\infty)$ (the author's key ✓; the endpoint $a = 1$ is precisely the degenerate case). Check: $a = 1$: the constant $3 > 0$ ✓; $a = 2$: $x^{2} + 2x + 4$ with minimum $1 - 2 + 4 = 3 > 0$ ✓ ($\\Delta = 4 - 16 = -12 < 0$); $a = 0$: $-x^{2} - 2x + 2$ opens downward and at $x = 10$ gives $-118 < 0$ ✗.",
          ),
        ],
      };
    },
  ),

  /* 21.3 — x²+2ax+a+1≥0 ⇔ a²−a−1≤0 → a∈[(1−√5)/2,(1+√5)/2]. */
  template(
    {
      id: "quad-autor2-21-3",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "discriminant",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["parameter", "discriminant", "quadratic-inequality"],
      prerequisites: ["discriminant", "quadratic-formula"],
      source: {
        sourceId: "autor-recopilacion-2025",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "R2 · 21.3",
      },
      reasoning: "parameters",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$a \\in \\mathbb{R}$`, `$a \\in \\mathbb{R}$`), correct: false },
        {
          id: "b",
          text: L(
            `$a \\in \\left(\\dfrac{1 - \\sqrt{5}}{2}, \\dfrac{1 + \\sqrt{5}}{2}\\right)$`,
            `$a \\in \\left(\\dfrac{1 - \\sqrt{5}}{2}, \\dfrac{1 + \\sqrt{5}}{2}\\right)$`,
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            `$a \\in \\left[\\dfrac{1 - \\sqrt{5}}{2}, \\dfrac{1 + \\sqrt{5}}{2}\\right]$`,
            `$a \\in \\left[\\dfrac{1 - \\sqrt{5}}{2}, \\dfrac{1 + \\sqrt{5}}{2}\\right]$`,
          ),
          correct: true,
        },
        {
          id: "d",
          text: L(
            `$a \\in \\left[-\\dfrac{1 + \\sqrt{5}}{2}, \\dfrac{\\sqrt{5} - 1}{2}\\right]$`,
            `$a \\in \\left[-\\dfrac{1 + \\sqrt{5}}{2}, \\dfrac{\\sqrt{5} - 1}{2}\\right]$`,
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Parábolas con parámetro: no negativa ($\\Delta \\le 0$)",
          "Parameter parabolas: non-negative ($\\Delta \\le 0$)",
        ),
        statement: L(
          "Halla todos los $a \\in \\mathbb{R}$ tales que $x^{2} + 2ax + a + 1 \\ge 0$ para todo $x \\in \\mathbb{R}$.",
          "Find all $a \\in \\mathbb{R}$ such that $x^{2} + 2ax + a + 1 \\ge 0$ for every $x \\in \\mathbb{R}$.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Para que una parábola conserve el signo no debe cruzar el eje $x$ — y con una desigualdad no estricta ($\\ge 0$) sí se permite rozarlo en un punto.",
            "For a parabola to keep its sign it must not cross the $x$-axis — and with a non-strict inequality ($\\ge 0$) grazing it at one point is allowed.",
          ),
          L(
            "El coeficiente principal es $1 > 0$, así que «$\\ge 0$ en todo $\\mathbb{R}$» equivale a $\\Delta \\le 0$: plantea $\\Delta = (2a)^{2} - 4(a + 1)$.",
            "The leading coefficient is $1 > 0$, so “$\\ge 0$ on all of $\\mathbb{R}$” is equivalent to $\\Delta \\le 0$: set up $\\Delta = (2a)^{2} - 4(a + 1)$.",
          ),
          L(
            "Te queda $a^{2} - a - 1 \\le 0$: resuelve la cuadrática en $a$ con la fórmula y fíjate si los extremos entran o no.",
            "You are left with $a^{2} - a - 1 \\le 0$: solve the quadratic in $a$ with the formula and note whether the endpoints are included.",
          ),
        ],
        answerDisplay: L(
          "$a \\in \\left[\\dfrac{1 - \\sqrt{5}}{2}, \\dfrac{1 + \\sqrt{5}}{2}\\right]$",
          "$a \\in \\left[\\dfrac{1 - \\sqrt{5}}{2}, \\dfrac{1 + \\sqrt{5}}{2}\\right]$",
        ),
        solution: [
          step(
            "given",
            "La inecuación $x^{2} + 2ax + a + 1 \\ge 0$ debe cumplirse para todo $x \\in \\mathbb{R}$; la desigualdad no es estricta, así que la parábola puede rozar el eje.",
            "The inequality $x^{2} + 2ax + a + 1 \\ge 0$ must hold for every $x \\in \\mathbb{R}$; the inequality is not strict, so the parabola may graze the axis.",
          ),
          step(
            "approach",
            "Con coeficiente principal $1 > 0$, «$\\ge 0$ en todo $\\mathbb{R}$» equivale a $\\Delta \\le 0$: sin raíces, o a lo sumo una raíz doble. La condición queda como una inecuación cuadrática en $a$.",
            "With leading coefficient $1 > 0$, “$\\ge 0$ on all of $\\mathbb{R}$” is equivalent to $\\Delta \\le 0$: no roots, or at most a double root. The condition becomes a quadratic inequality in $a$.",
          ),
          step(
            "calculation",
            "$\\Delta = (2a)^{2} - 4 \\cdot 1 \\cdot (a + 1) = 4a^{2} - 4a - 4$.<br>Imponer $\\Delta \\le 0$: $a^{2} - a - 1 \\le 0$.<br>Raíces de $a^{2} - a - 1 = 0$: $a = \\dfrac{1 \\pm \\sqrt{5}}{2}$; el trinomio es $\\le 0$ entre sus raíces.",
            "$\\Delta = (2a)^{2} - 4 \\cdot 1 \\cdot (a + 1) = 4a^{2} - 4a - 4$.<br>Impose $\\Delta \\le 0$: $a^{2} - a - 1 \\le 0$.<br>Roots of $a^{2} - a - 1 = 0$: $a = \\dfrac{1 \\pm \\sqrt{5}}{2}$; the trinomial is $\\le 0$ between its roots.",
          ),
          step(
            "result",
            "$a \\in \\left[\\dfrac{1 - \\sqrt{5}}{2}, \\dfrac{1 + \\sqrt{5}}{2}\\right]$ (clave del autor ✓). Verificación: $a = 0$: $x^{2} + 1 \\ge 0$ ✓; $a = 1$: $x^{2} + 2x + 2 = (x + 1)^{2} + 1 \\ge 0$ ✓; en el extremo $a = \\dfrac{1 + \\sqrt{5}}{2}$: $\\Delta = 0$, la parábola toca el eje sin cruzarlo ✓; $a = 2$: $x^{2} + 4x + 3 = (x + 1)(x + 3)$ es negativa entre $-3$ y $-1$ (p. ej. $x = -2$: $-1 < 0$) ✗.",
            "$a \\in \\left[\\dfrac{1 - \\sqrt{5}}{2}, \\dfrac{1 + \\sqrt{5}}{2}\\right]$ (the author's key ✓). Check: $a = 0$: $x^{2} + 1 \\ge 0$ ✓; $a = 1$: $x^{2} + 2x + 2 = (x + 1)^{2} + 1 \\ge 0$ ✓; at the endpoint $a = \\dfrac{1 + \\sqrt{5}}{2}$: $\\Delta = 0$, the parabola touches the axis without crossing it ✓; $a = 2$: $x^{2} + 4x + 3 = (x + 1)(x + 3)$ is negative between $-3$ and $-1$ (e.g. $x = -2$: $-1 < 0$) ✗.",
          ),
        ],
      };
    },
  ),

  /* 21.4 — (a−2)x²+2(a−2)x+a>0: a=2 degenera en la constante 2>0 → a∈[2,∞). */
  template(
    {
      id: "quad-autor2-21-4",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "discriminant",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 360,
      tags: ["parameter", "discriminant", "degenerate-case"],
      prerequisites: ["discriminant", "quadratic-formula"],
      source: {
        sourceId: "autor-recopilacion-2025",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "R2 · 21.4",
      },
      reasoning: "parameters",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$a \\in [2, \\infty)$`, `$a \\in [2, \\infty)$`), correct: true },
        { id: "b", text: L(`$a \\in (2, \\infty)$`, `$a \\in (2, \\infty)$`), correct: false },
        { id: "c", text: L(`$a \\in (-\\infty, 2]$`, `$a \\in (-\\infty, 2]$`), correct: false },
        { id: "d", text: L(`$a \\in [1, \\infty)$`, `$a \\in [1, \\infty)$`), correct: false },
      ];
      return {
        skill: L(
          "Parábolas con parámetro: degeneración en $a = 2$",
          "Parameter parabolas: degeneration at $a = 2$",
        ),
        statement: L(
          "Halla todos los $a \\in \\mathbb{R}$ tales que $(a - 2)x^{2} + 2(a - 2)x + a > 0$ para todo $x \\in \\mathbb{R}$.",
          "Find all $a \\in \\mathbb{R}$ such that $(a - 2)x^{2} + 2(a - 2)x + a > 0$ for every $x \\in \\mathbb{R}$.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Para que una parábola conserve el signo, el coeficiente principal manda — y aquí es $(a - 2)$, que puede anularse o cambiar de signo: ordena el análisis por casos.",
            "For a parabola to keep its sign, the leading coefficient rules — and here it is $(a - 2)$, which can vanish or change sign: organize the analysis by cases.",
          ),
          L(
            "Para $a \\neq 2$ la expresión es cuadrática: exige a la vez abrir hacia arriba ($a - 2 > 0$) y $\\Delta < 0$, con $\\Delta = 4(a - 2)^{2} - 4(a - 2)a$.",
            "For $a \\neq 2$ the expression is quadratic: require at once opening upward ($a - 2 > 0$) and $\\Delta < 0$, with $\\Delta = 4(a - 2)^{2} - 4(a - 2)a$.",
          ),
          L(
            "No olvides el caso $a = 2$, donde la ecuación deja de ser cuadrática: sustituye y observa la constante que queda, con su signo.",
            "Do not forget the case $a = 2$, where the equation stops being quadratic: substitute and observe the constant that remains, with its sign.",
          ),
        ],
        answerDisplay: L(
          "$a \\in [2, \\infty)$ (el extremo $a = 2$ es el caso degenerado: queda la constante $2 > 0$)",
          "$a \\in [2, \\infty)$ (the endpoint $a = 2$ is the degenerate case: the constant $2 > 0$ remains)",
        ),
        solution: [
          step(
            "given",
            "La inecuación $(a - 2)x^{2} + 2(a - 2)x + a > 0$ debe cumplirse para todo $x \\in \\mathbb{R}$; el coeficiente principal $(a - 2)$ depende del parámetro.",
            "The inequality $(a - 2)x^{2} + 2(a - 2)x + a > 0$ must hold for every $x \\in \\mathbb{R}$; the leading coefficient $(a - 2)$ depends on the parameter.",
          ),
          step(
            "approach",
            "Caso degenerado $a = 2$ aparte; para $a \\neq 2$ es cuadrática y «positiva en todo $\\mathbb{R}$» exige abrir hacia arriba ($a - 2 > 0$) y $\\Delta < 0$.",
            "Handle the degenerate case $a = 2$ separately; for $a \\neq 2$ it is quadratic and “positive on all of $\\mathbb{R}$” requires opening upward ($a - 2 > 0$) and $\\Delta < 0$.",
          ),
          step(
            "calculation",
            "$a = 2$: $0 \\cdot x^{2} + 0 \\cdot x + 2 = 2 > 0$ ✓ para todo $x$ (degenera en constante).<br>$a \\neq 2$: $\\Delta = 4(a - 2)^{2} - 4(a - 2)a = 4(a - 2)\\left[(a - 2) - a\\right] = -8(a - 2)$; pedir $\\Delta < 0$ da $a > 2$, justo lo mismo que abrir hacia arriba.<br>Unión: $a > 2$ junto con el caso $a = 2$.",
            "$a = 2$: $0 \\cdot x^{2} + 0 \\cdot x + 2 = 2 > 0$ ✓ for all $x$ (it degenerates to a constant).<br>$a \\neq 2$: $\\Delta = 4(a - 2)^{2} - 4(a - 2)a = 4(a - 2)\\left[(a - 2) - a\\right] = -8(a - 2)$; requiring $\\Delta < 0$ gives $a > 2$, exactly the same as opening upward.<br>Union: $a > 2$ together with the case $a = 2$.",
          ),
          step(
            "result",
            "$a \\in [2, \\infty)$ (clave del autor ✓; el extremo $a = 2$ es el caso degenerado). Verificación: $a = 2$: la constante $2 > 0$ ✓; $a = 3$: $x^{2} + 2x + 3 = (x + 1)^{2} + 2 > 0$ ✓ ($\\Delta = -8 < 0$); $a = 1$: $-x^{2} - 2x + 1$ abre hacia abajo y en $x = -10$ da $-79 < 0$ ✗.",
            "$a \\in [2, \\infty)$ (the author's key ✓; the endpoint $a = 2$ is the degenerate case). Check: $a = 2$: the constant $2 > 0$ ✓; $a = 3$: $x^{2} + 2x + 3 = (x + 1)^{2} + 2 > 0$ ✓ ($\\Delta = -8 < 0$); $a = 1$: $-x^{2} - 2x + 1$ opens downward and at $x = -10$ gives $-79 < 0$ ✗.",
          ),
        ],
      };
    },
  ),

  /* 21.5 — (a−1)x²+2ax+(a+1)<0: Δ=4>0 siempre, imposible → ∅. */
  template(
    {
      id: "quad-autor2-21-5",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "discriminant",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["parameter", "discriminant", "empty-set"],
      prerequisites: ["discriminant", "quadratic-formula"],
      source: {
        sourceId: "autor-recopilacion-2025",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "R2 · 21.5",
      },
      reasoning: "parameters",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\varnothing$`, `$\\varnothing$`), correct: true },
        { id: "b", text: L(`$a \\in (-\\infty, 1)$`, `$a \\in (-\\infty, 1)$`), correct: false },
        { id: "c", text: L(`$a < 1$`, `$a < 1$`), correct: false },
        { id: "d", text: L(`$\\{1\\}$`, `$\\{1\\}$`), correct: false },
      ];
      return {
        skill: L(
          "Parábolas con parámetro: discriminante siempre positivo",
          "Parameter parabolas: an always-positive discriminant",
        ),
        statement: L(
          "Halla todos los $a \\in \\mathbb{R}$ tales que $(a - 1)x^{2} + 2ax + (a + 1) < 0$ para todo $x \\in \\mathbb{R}$.",
          "Find all $a \\in \\mathbb{R}$ such that $(a - 1)x^{2} + 2ax + (a + 1) < 0$ for every $x \\in \\mathbb{R}$.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Para que una parábola sea negativa en todo $\\mathbb{R}$ debería abrir hacia abajo y no cortar al eje $x$; revisa si algún valor de $a$ consigue esa combinación.",
            "For a parabola to be negative on all of $\\mathbb{R}$ it should open downward and never cross the $x$-axis; check whether any value of $a$ achieves that combination.",
          ),
          L(
            "Calcula el discriminante en función de $a$: $\\Delta = (2a)^{2} - 4(a - 1)(a + 1)$. Simplifica con la diferencia de cuadrados y mira si de verdad depende de $a$.",
            "Compute the discriminant as a function of $a$: $\\Delta = (2a)^{2} - 4(a - 1)(a + 1)$. Simplify with the difference of squares and see whether it truly depends on $a$.",
          ),
          L(
            "Con $\\Delta > 0$ hay dos raíces reales y la parábola cambia de signo; revisa aparte el caso $a = 1$, donde la ecuación deja de ser cuadrática.",
            "With $\\Delta > 0$ there are two real roots and the parabola changes sign; check separately the case $a = 1$, where the equation stops being quadratic.",
          ),
        ],
        answerDisplay: L(
          "$\\varnothing$ (no existe tal $a$)",
          "$\\varnothing$ (no such $a$ exists)",
        ),
        solution: [
          step(
            "given",
            "La inecuación $(a - 1)x^{2} + 2ax + (a + 1) < 0$ debe cumplirse para todo $x \\in \\mathbb{R}$; el coeficiente principal $(a - 1)$ depende del parámetro.",
            "The inequality $(a - 1)x^{2} + 2ax + (a + 1) < 0$ must hold for every $x \\in \\mathbb{R}$; the leading coefficient $(a - 1)$ depends on the parameter.",
          ),
          step(
            "approach",
            "Para ser $< 0$ en todo $\\mathbb{R}$, una cuadrática debería abrir hacia abajo con $\\Delta \\le 0$ (y el caso $a = 1$, donde queda lineal, va aparte). Calculamos $\\Delta$ y vigilamos si puede dejar de ser positivo.",
            "To be $< 0$ on all of $\\mathbb{R}$, a quadratic should open downward with $\\Delta \\le 0$ (and the case $a = 1$, where it becomes linear, goes separately). We compute $\\Delta$ and watch whether it can stop being positive.",
          ),
          step(
            "calculation",
            "$\\Delta = (2a)^{2} - 4(a - 1)(a + 1) = 4a^{2} - 4(a^{2} - 1) = 4 > 0$ para todo $a$.<br>Con $\\Delta > 0$ la parábola tiene dos raíces reales distintas y cambia de signo: imposible mantener $< 0$ en todo $\\mathbb{R}$.<br>Caso $a = 1$: queda $2x + 2 < 0 \\iff x < -1$, que no vale para todo $x$.",
            "$\\Delta = (2a)^{2} - 4(a - 1)(a + 1) = 4a^{2} - 4(a^{2} - 1) = 4 > 0$ for every $a$.<br>With $\\Delta > 0$ the parabola has two distinct real roots and changes sign: keeping $< 0$ on all of $\\mathbb{R}$ is impossible.<br>Case $a = 1$: it becomes $2x + 2 < 0 \\iff x < -1$, which does not hold for every $x$.",
          ),
          step(
            "result",
            "$\\varnothing$: no existe ningún $a$ (clave del autor ✓). Verificación: $a = 0$: $-x^{2} + 1$ da $1 < 0$ en $x = 0$, falso ✗; $a = 2$: $x^{2} + 4x + 3$ da $3 < 0$ en $x = 0$, falso ✗; $a = 1$: $2x + 2$ da $2 < 0$ en $x = 0$, falso ✗ — y como $\\Delta = 4 > 0$ siempre, ningún otro $a$ puede funcionar.",
            "$\\varnothing$: no such $a$ exists (the author's key ✓). Check: $a = 0$: $-x^{2} + 1$ gives $1 < 0$ at $x = 0$, false ✗; $a = 2$: $x^{2} + 4x + 3$ gives $3 < 0$ at $x = 0$, false ✗; $a = 1$: $2x + 2$ gives $2 < 0$ at $x = 0$, false ✗ — and since $\\Delta = 4 > 0$ always, no other $a$ can work.",
          ),
        ],
      };
    },
  ),

  /* 21.6 — x²+(a−1)x+1≥0 ⇔ (a−1)²≤4 → a∈[−1,3]. */
  template(
    {
      id: "quad-autor2-21-6",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "discriminant",
      difficulty: "hard",
      questionType: "text",
      estimatedTimeSec: 240,
      tags: ["parameter", "discriminant", "constant-sign"],
      prerequisites: ["discriminant", "quadratic-formula"],
      source: {
        sourceId: "autor-recopilacion-2025",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "R2 · 21.6",
      },
      reasoning: "parameters",
    },
    () => ({
      skill: L(
        "Parábolas con parámetro: no negativa en todo $\\mathbb{R}$",
        "Parameter parabolas: non-negative on all $\\mathbb{R}$",
      ),
      statement: L(
        "Halla todos los $a \\in \\mathbb{R}$ tales que $x^{2} + (a - 1)x + 1 \\ge 0$ para todo $x \\in \\mathbb{R}$ (responde el intervalo de $a$; admite [-1, 3] o -1<=a<=3).",
        "Find all $a \\in \\mathbb{R}$ such that $x^{2} + (a - 1)x + 1 \\ge 0$ for every $x \\in \\mathbb{R}$ (answer with the interval of $a$; both [-1, 3] and -1<=a<=3 are accepted).",
      ),
      answer: {
        kind: "text",
        accepted: ["[-1, 3]", "[-1,3]", "-1<=a<=3", "-1 <= a <= 3", "-1≤a≤3", "-1 ≤ a ≤ 3"],
      },
      hints: [
        L(
          "Para que una parábola conserve el signo no debe cruzar el eje $x$; con «$\\ge 0$» tocarlo en un solo punto sí está permitido.",
          "For a parabola to keep its sign it must not cross the $x$-axis; with “$\\ge 0$” touching it at a single point is allowed.",
        ),
        L(
          "Discriminante y signo del coeficiente principal: el principal es $1$, siempre hacia arriba; queda imponer $\\Delta = (a - 1)^{2} - 4 \\le 0$.",
          "Discriminant and sign of the leading coefficient: the leading one is $1$, always upward; it remains to impose $\\Delta = (a - 1)^{2} - 4 \\le 0$.",
        ),
        L(
          "Es la condición $|a - 1| \\le 2$, un intervalo centrado en $1$. Comprueba los extremos sustituyendo: deben quedar cuadrados perfectos.",
          "It is the condition $|a - 1| \\le 2$, an interval centered at $1$. Check the endpoints by substituting: they must become perfect squares.",
        ),
      ],
      answerDisplay: L("$a \\in [-1, 3]$", "$a \\in [-1, 3]$"),
      solution: [
        step(
          "given",
          "La inecuación $x^{2} + (a - 1)x + 1 \\ge 0$ debe cumplirse para todo $x \\in \\mathbb{R}$; $a$ es un parámetro real.",
          "The inequality $x^{2} + (a - 1)x + 1 \\ge 0$ must hold for every $x \\in \\mathbb{R}$; $a$ is a real parameter.",
        ),
        step(
          "approach",
          "El coeficiente principal es $1 > 0$: la parábola abre hacia arriba y «$\\ge 0$ en todo $\\mathbb{R}$» equivale a $\\Delta \\le 0$ (se permite rozar el eje).",
          "The leading coefficient is $1 > 0$: the parabola opens upward and “$\\ge 0$ on all of $\\mathbb{R}$” is equivalent to $\\Delta \\le 0$ (grazing the axis is allowed).",
        ),
        step(
          "calculation",
          "$\\Delta = (a - 1)^{2} - 4 \\cdot 1 \\cdot 1 = (a - 1)^{2} - 4$.<br>Imponer $\\Delta \\le 0$: $(a - 1)^{2} \\le 4 \\iff |a - 1| \\le 2 \\iff -2 \\le a - 1 \\le 2 \\iff -1 \\le a \\le 3$.",
          "$\\Delta = (a - 1)^{2} - 4 \\cdot 1 \\cdot 1 = (a - 1)^{2} - 4$.<br>Impose $\\Delta \\le 0$: $(a - 1)^{2} \\le 4 \\iff |a - 1| \\le 2 \\iff -2 \\le a - 1 \\le 2 \\iff -1 \\le a \\le 3$.",
        ),
        step(
          "result",
          "$a \\in [-1, 3]$ (clave del autor ✓). Verificación: $a = 1$: $x^{2} + 1 \\ge 0$ ✓; $a = 3$: $(x + 1)^{2} \\ge 0$, toca el eje en $x = -1$ y no baja ✓ (igual con $a = -1$: $(x - 1)^{2}$); $a = 4$: $x^{2} + 3x + 1$ con $\\Delta = 5 > 0$ es negativa entre sus raíces (p. ej. $x = -1$: $-1 < 0$) ✗.",
          "$a \\in [-1, 3]$ (the author's key ✓). Check: $a = 1$: $x^{2} + 1 \\ge 0$ ✓; $a = 3$: $(x + 1)^{2} \\ge 0$, it touches the axis at $x = -1$ and does not dip ✓ (likewise $a = -1$: $(x - 1)^{2}$); $a = 4$: $x^{2} + 3x + 1$ with $\\Delta = 5 > 0$ is negative between its roots (e.g. $x = -1$: $-1 < 0$) ✗.",
        ),
      ],
    }),
  ),

  /* 21.7 — (a+1)x²+2(a+1)x+a−1≥0: en x=−1 vale −2 para todo a → ∅. */
  template(
    {
      id: "quad-autor2-21-7",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "discriminant",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["parameter", "discriminant", "degenerate-case", "empty-set"],
      prerequisites: ["discriminant", "quadratic-formula"],
      source: {
        sourceId: "autor-recopilacion-2025",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "R2 · 21.7",
      },
      reasoning: "parameters",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\varnothing$`, `$\\varnothing$`), correct: true },
        { id: "b", text: L(`$a \\in [-1, \\infty)$`, `$a \\in [-1, \\infty)$`), correct: false },
        { id: "c", text: L(`$a \\in (-\\infty, -1]$`, `$a \\in (-\\infty, -1]$`), correct: false },
        { id: "d", text: L(`$\\{-1\\}$`, `$\\{-1\\}$`), correct: false },
      ];
      return {
        skill: L(
          "Parábolas con parámetro: conjunto de verdad vacío",
          "Parameter parabolas: an empty truth set",
        ),
        statement: L(
          "Halla todos los $a \\in \\mathbb{R}$ tales que $(a + 1)x^{2} + 2(a + 1)x + a - 1 \\ge 0$ para todo $x \\in \\mathbb{R}$.",
          "Find all $a \\in \\mathbb{R}$ such that $(a + 1)x^{2} + 2(a + 1)x + a - 1 \\ge 0$ for every $x \\in \\mathbb{R}$.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Para que una parábola conserve el signo «$\\ge 0$» debería abrir hacia arriba y no bajar del eje — pero el coeficiente principal es $(a + 1)$: puede anularse o ser negativo.",
            "For a parabola to keep the sign “$\\ge 0$” it should open upward and never dip below the axis — but the leading coefficient is $(a + 1)$: it can vanish or be negative.",
          ),
          L(
            "Ordena tres casos: $a = -1$, $a > -1$ y $a < -1$. En el caso cuadrático calcula $\\Delta = 4(a + 1)^{2} - 4(a + 1)(a - 1)$ y vigila el signo de la apertura.",
            "Organize three cases: $a = -1$, $a > -1$ and $a < -1$. In the quadratic case compute $\\Delta = 4(a + 1)^{2} - 4(a + 1)(a - 1)$ and mind the sign of the opening.",
          ),
          L(
            "No olvides el caso $a = -1$, donde la ecuación deja de ser cuadrática: sustituye y mira el número (y su signo) que queda.",
            "Do not forget the case $a = -1$, where the equation stops being quadratic: substitute and look at the number (and its sign) that remains.",
          ),
        ],
        answerDisplay: L(
          "$\\varnothing$ (no existe tal $a$)",
          "$\\varnothing$ (no such $a$ exists)",
        ),
        solution: [
          step(
            "given",
            "La inecuación $(a + 1)x^{2} + 2(a + 1)x + a - 1 \\ge 0$ debe cumplirse para todo $x \\in \\mathbb{R}$; el coeficiente principal $(a + 1)$ depende del parámetro.",
            "The inequality $(a + 1)x^{2} + 2(a + 1)x + a - 1 \\ge 0$ must hold for every $x \\in \\mathbb{R}$; the leading coefficient $(a + 1)$ depends on the parameter.",
          ),
          step(
            "approach",
            "Tres casos según el signo de $(a + 1)$: el degenerado $a = -1$, la apertura hacia arriba ($a > -1$) y la apertura hacia abajo ($a < -1$). En el caso cuadrático, $\\Delta$ decide si la parábola baja del eje.",
            "Three cases according to the sign of $(a + 1)$: the degenerate $a = -1$, upward opening ($a > -1$) and downward opening ($a < -1$). In the quadratic case, $\\Delta$ decides whether the parabola dips below the axis.",
          ),
          step(
            "calculation",
            "$a = -1$: queda $0 \\cdot x^{2} + 0 \\cdot x - 2 = -2 \\ge 0$, falso.<br>$a > -1$: abre hacia arriba y $\\Delta = 4(a + 1)^{2} - 4(a + 1)(a - 1) = 4(a + 1)\\left[(a + 1) - (a - 1)\\right] = 8(a + 1) > 0$: dos raíces reales y, entre ellas, la parábola es negativa.<br>$a < -1$: abre hacia abajo y se hunde hacia $-\\infty$.<br>Observación global: en $x = -1$ la expresión vale $(a + 1) - 2(a + 1) + a - 1 = -2 < 0$ para cualquier $a$.",
            "$a = -1$: it becomes $0 \\cdot x^{2} + 0 \\cdot x - 2 = -2 \\ge 0$, false.<br>$a > -1$: it opens upward and $\\Delta = 4(a + 1)^{2} - 4(a + 1)(a - 1) = 4(a + 1)\\left[(a + 1) - (a - 1)\\right] = 8(a + 1) > 0$: two real roots and, between them, the parabola is negative.<br>$a < -1$: it opens downward and sinks toward $-\\infty$.<br>Global observation: at $x = -1$ the expression equals $(a + 1) - 2(a + 1) + a - 1 = -2 < 0$ for every $a$.",
          ),
          step(
            "result",
            "$\\varnothing$: no existe ningún $a$ (clave del autor ✓). Verificación: $a = -1$: la constante $-2$, y $-2 \\ge 0$ es falso ✗; $a = 0$: $x^{2} + 2x - 1$ vale $-1 < 0$ en $x = 0$ ✗; $a = -2$: $-x^{2} - 2x - 3$ abre hacia abajo y vale $-3$ en $x = 0$ ✗; de hecho, en $x = -1$ la expresión vale $-2$ para todo $a$ ✓.",
            "$\\varnothing$: no such $a$ exists (the author's key ✓). Check: $a = -1$: the constant $-2$, and $-2 \\ge 0$ is false ✗; $a = 0$: $x^{2} + 2x - 1$ equals $-1 < 0$ at $x = 0$ ✗; $a = -2$: $-x^{2} - 2x - 3$ opens downward and equals $-3$ at $x = 0$ ✗; in fact, at $x = -1$ the expression equals $-2$ for every $a$ ✓.",
          ),
        ],
      };
    },
  ),

  /* 21.8 — (a−1)x²−2(a−1)x+a+2≤0: en x=1 vale 3 para todo a → ∅. */
  template(
    {
      id: "quad-autor2-21-8",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "discriminant",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["parameter", "discriminant", "degenerate-case", "empty-set"],
      prerequisites: ["discriminant", "quadratic-formula"],
      source: {
        sourceId: "autor-recopilacion-2025",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "R2 · 21.8",
      },
      reasoning: "parameters",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\varnothing$`, `$\\varnothing$`), correct: true },
        { id: "b", text: L(`$a \\in [1, \\infty)$`, `$a \\in [1, \\infty)$`), correct: false },
        { id: "c", text: L(`$a \\in (-\\infty, 1]$`, `$a \\in (-\\infty, 1]$`), correct: false },
        { id: "d", text: L(`$a \\in (-\\infty, 1)$`, `$a \\in (-\\infty, 1)$`), correct: false },
      ];
      return {
        skill: L(
          "Parábolas con parámetro: la condición imposible",
          "Parameter parabolas: the impossible condition",
        ),
        statement: L(
          "Halla todos los $a \\in \\mathbb{R}$ tales que $(a - 1)x^{2} - 2(a - 1)x + a + 2 \\le 0$ para todo $x \\in \\mathbb{R}$.",
          "Find all $a \\in \\mathbb{R}$ such that $(a - 1)x^{2} - 2(a - 1)x + a + 2 \\le 0$ for every $x \\in \\mathbb{R}$.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Para que una parábola sea $\\le 0$ en todo $\\mathbb{R}$ tendría que abrir hacia abajo y no salirse por encima del eje — estudia si el coeficiente principal $(a - 1)$ lo permite.",
            "For a parabola to be $\\le 0$ on all of $\\mathbb{R}$ it would have to open downward and never rise above the axis — study whether the leading coefficient $(a - 1)$ allows it.",
          ),
          L(
            "Separa $a = 1$, $a > 1$ y $a < 1$. Para $a \\neq 1$ calcula $\\Delta = 4(a - 1)^{2} - 4(a - 1)(a + 2)$, factoriza y cruza cada resultado con la dirección de apertura.",
            "Split into $a = 1$, $a > 1$ and $a < 1$. For $a \\neq 1$ compute $\\Delta = 4(a - 1)^{2} - 4(a - 1)(a + 2)$, factor and cross each outcome with the opening direction.",
          ),
          L(
            "No olvides el caso $a = 1$, donde la ecuación deja de ser cuadrática: sustituye y mira el número que queda frente al $\\le 0$.",
            "Do not forget the case $a = 1$, where the equation stops being quadratic: substitute and look at the number that remains next to the $\\le 0$.",
          ),
        ],
        answerDisplay: L(
          "$\\varnothing$ (no existe tal $a$)",
          "$\\varnothing$ (no such $a$ exists)",
        ),
        solution: [
          step(
            "given",
            "La inecuación $(a - 1)x^{2} - 2(a - 1)x + a + 2 \\le 0$ debe cumplirse para todo $x \\in \\mathbb{R}$; el coeficiente principal $(a - 1)$ depende del parámetro.",
            "The inequality $(a - 1)x^{2} - 2(a - 1)x + a + 2 \\le 0$ must hold for every $x \\in \\mathbb{R}$; the leading coefficient $(a - 1)$ depends on the parameter.",
          ),
          step(
            "approach",
            "Para que una cuadrática sea $\\le 0$ en todo $\\mathbb{R}$ debería abrir hacia abajo con $\\Delta \\le 0$; separamos el caso degenerado $a = 1$ y cruzamos cada rama con el discriminante.",
            "For a quadratic to be $\\le 0$ on all of $\\mathbb{R}$ it should open downward with $\\Delta \\le 0$; we split off the degenerate case $a = 1$ and cross each branch with the discriminant.",
          ),
          step(
            "calculation",
            "$a = 1$: queda $3 \\le 0$, falso.<br>$a \\neq 1$: $\\Delta = 4(a - 1)^{2} - 4(a - 1)(a + 2) = 4(a - 1)\\left[(a - 1) - (a + 2)\\right] = -12(a - 1)$.<br>Si $a > 1$: abre hacia arriba y $\\Delta < 0$, siempre positiva, nunca $\\le 0$. Si $a < 1$: $\\Delta > 0$, dos raíces reales y cambia de signo.<br>Observación global: en $x = 1$ la expresión vale $(a - 1) - 2(a - 1) + a + 2 = 3 > 0$ para cualquier $a$.",
            "$a = 1$: it becomes $3 \\le 0$, false.<br>$a \\neq 1$: $\\Delta = 4(a - 1)^{2} - 4(a - 1)(a + 2) = 4(a - 1)\\left[(a - 1) - (a + 2)\\right] = -12(a - 1)$.<br>If $a > 1$: it opens upward with $\\Delta < 0$, always positive, never $\\le 0$. If $a < 1$: $\\Delta > 0$, two real roots and it changes sign.<br>Global observation: at $x = 1$ the expression equals $(a - 1) - 2(a - 1) + a + 2 = 3 > 0$ for every $a$.",
          ),
          step(
            "result",
            "$\\varnothing$: no existe ningún $a$ (clave del autor ✓). Verificación: $a = 1$: la constante $3$, y $3 \\le 0$ es falso ✗; $a = 2$: $x^{2} - 2x + 4 = (x - 1)^{2} + 3 > 0$ siempre, nunca $\\le 0$ ✗ ($\\Delta = -12 < 0$); $a = 0$: $-x^{2} + 2x + 2$ vale $3 > 0$ en $x = 1$ ✗; de hecho, en $x = 1$ la expresión vale $3$ para todo $a$ ✓.",
            "$\\varnothing$: no such $a$ exists (the author's key ✓). Check: $a = 1$: the constant $3$, and $3 \\le 0$ is false ✗; $a = 2$: $x^{2} - 2x + 4 = (x - 1)^{2} + 3 > 0$ always, never $\\le 0$ ✗ ($\\Delta = -12 < 0$); $a = 0$: $-x^{2} + 2x + 2$ equals $3 > 0$ at $x = 1$ ✗; in fact, at $x = 1$ the expression equals $3$ for every $a$ ✓.",
          ),
        ],
      };
    },
  ),

  /* ================================================================== */
  /* Tarea UEES · «EJERCICIOS DE REPASO 1ER PARCIAL MATEMATICAS I»       */
  /* (tutor's own compiled assignment, uploaded 2026-10-17). Bloque 8-c: */
  /* Sección 4 · Ecuaciones cuadráticas 45-63 (pág. 3) — todas MC cuyas */
  /* opciones son conjuntos completos de soluciones reales — y Sección   */
  /* 17 · Funciones cuadráticas 9-22 (vértice) + 29-33 (aplicaciones),  */
  /* pág. 19. La hoja NO trae clave impresa: cada respuesta fue         */
  /* derivada y verificada con sympy (download/verify_repaso1.py, 417   */
  /* checks, 0 FAIL); enunciados transcritos de las capturas VLM del    */
  /* DOCX (download/repaso1-pages/vlm-p-03.json y vlm-p-19.json).       */
  /* #46: sobre ℝ sólo se conserva ±√5 (la rama X² = −2 se rechaza).    */
  /* #30 (challenge): vértice continuo q = 8500/9 ≈ 944,44 NO entero —  */
  /* entre producciones diarias enteras gana q = 944 por 5·10⁻⁵ sobre   */
  /* 945; ambos redondean a R ≈ 401,39 (exacto 7225/18).                */
  /* ================================================================== */

  /* S4 · 45 — bicuadrática x⁴−5x²+6 = 0: u = x² → ±√2, ±√3. */
  template(
    {
      id: "quad-uees-45",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "standard-form",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["biquadratic", "substitution", "solution-set"],
      prerequisites: ["polynomials"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "4 · 45",
        page: 3,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$x = \\pm\\sqrt{2},\\ \\pm\\sqrt{3}$`, `$x = \\pm\\sqrt{2},\\ \\pm\\sqrt{3}$`), correct: true },
        { id: "b", text: L(`$x = \\sqrt{2},\\ \\sqrt{3}$`, `$x = \\sqrt{2},\\ \\sqrt{3}$`), correct: false },
        { id: "c", text: L(`$x = \\pm 2,\\ \\pm 3$`, `$x = \\pm 2,\\ \\pm 3$`), correct: false },
        { id: "d", text: L(`$x = \\pm\\sqrt{2}$`, `$x = \\pm\\sqrt{2}$`), correct: false },
      ];
      return {
        skill: L(
          "Ecuación bicuadrática: la sustitución u = x²",
          "Biquadratic equation: the substitution u = x²",
        ),
        statement: L(
          "Resuelva la ecuación (si usa sustitución, indique el conjunto de soluciones reales):\n\n$$x^4 - 5x^2 + 6 = 0$$",
          "Solve the equation (if you use a substitution, give the set of real solutions):\n\n$$x^4 - 5x^2 + 6 = 0$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "La ecuación NO es cuadrática en $x$, pero sí en otra «letra»: como $x^4 = (x^2)^2$, ¿cuál es la sustitución natural?",
            "The equation is NOT quadratic in $x$, but it is in another “letter”: since $x^4 = (x^2)^2$, what is the natural substitution?",
          ),
          L(
            "Con $u = x^2$ queda $u^2 - 5u + 6 = 0$: factoriza buscando dos números que multipliquen $6$ y sumen $-5$.",
            "With $u = x^2$ you get $u^2 - 5u + 6 = 0$: factor it by looking for two numbers whose product is $6$ and whose sum is $-5$.",
          ),
          L(
            "La cuadrática en $u$ da $u = 2$ y $u = 3$. Falta deshacer el cambio: cada $x^2 = u > 0$ produce DOS soluciones.",
            "The quadratic in $u$ gives $u = 2$ and $u = 3$. Now undo the substitution: each $x^2 = u > 0$ produces TWO solutions.",
          ),
        ],
        answerDisplay: L(
          "$x = \\pm\\sqrt{2},\\ \\pm\\sqrt{3}$",
          "$x = \\pm\\sqrt{2},\\ \\pm\\sqrt{3}$",
        ),
        solution: [
          step(
            "given",
            "La ecuación bicuadrática $x^4 - 5x^2 + 6 = 0$ (tarea UEES, sección 4).",
            "The biquadratic equation $x^4 - 5x^2 + 6 = 0$ (UEES assignment, section 4).",
          ),
          step(
            "approach",
            "Sustituir $u = x^2$ (con $u \\ge 0$) para volverla cuadrática en $u$, resolver y deshacer el cambio recordando que $x^2 = u$ con $u > 0$ da $x = \\pm\\sqrt{u}$.",
            "Substitute $u = x^2$ (with $u \\ge 0$) to make it quadratic in $u$, solve, and undo the substitution remembering that $x^2 = u$ with $u > 0$ gives $x = \\pm\\sqrt{u}$.",
          ),
          step(
            "calculation",
            "$u^2 - 5u + 6 = (u - 2)(u - 3) = 0$, así que $u = 2$ ó $u = 3$.<br>$u = 2$: $x^2 = 2 \\Rightarrow x = \\pm\\sqrt{2}$.<br>$u = 3$: $x^2 = 3 \\Rightarrow x = \\pm\\sqrt{3}$.",
            "$u^2 - 5u + 6 = (u - 2)(u - 3) = 0$, so $u = 2$ or $u = 3$.<br>$u = 2$: $x^2 = 2 \\Rightarrow x = \\pm\\sqrt{2}$.<br>$u = 3$: $x^2 = 3 \\Rightarrow x = \\pm\\sqrt{3}$.",
          ),
          step(
            "result",
            "Conjunto de soluciones reales: $x = \\pm\\sqrt{2},\\ \\pm\\sqrt{3}$. Verificación: $(\\sqrt{2})^4 - 5(\\sqrt{2})^2 + 6 = 4 - 10 + 6 = 0$ ✓ y $(\\sqrt{3})^4 - 5(\\sqrt{3})^2 + 6 = 9 - 15 + 6 = 0$ ✓ (las potencias pares no distinguen los signos).",
            "Set of real solutions: $x = \\pm\\sqrt{2},\\ \\pm\\sqrt{3}$. Check: $(\\sqrt{2})^4 - 5(\\sqrt{2})^2 + 6 = 4 - 10 + 6 = 0$ ✓ and $(\\sqrt{3})^4 - 5(\\sqrt{3})^2 + 6 = 9 - 15 + 6 = 0$ ✓ (even powers do not distinguish the signs).",
          ),
        ],
      };
    },
  ),

  /* S4 · 46 — X⁴−3X²−10 = 0: sobre ℝ se rechaza X² = −2 → ±√5. */
  template(
    {
      id: "quad-uees-46",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "standard-form",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["biquadratic", "substitution", "real-solutions"],
      prerequisites: ["polynomials"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "4 · 46",
        page: 3,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$X = \\pm\\sqrt{5}$`, `$X = \\pm\\sqrt{5}$`), correct: true },
        { id: "b", text: L(`$X = \\pm\\sqrt{5},\\ \\pm i\\sqrt{2}$`, `$X = \\pm\\sqrt{5},\\ \\pm i\\sqrt{2}$`), correct: false },
        { id: "c", text: L(`$X = \\pm\\sqrt{10}$`, `$X = \\pm\\sqrt{10}$`), correct: false },
        { id: "d", text: L(`$\\varnothing$`, `$\\varnothing$`), correct: false },
      ];
      return {
        skill: L(
          "Bicuadrática con rama negativa: se rechaza sobre los reales",
          "Biquadratic with a negative branch: rejected over the reals",
        ),
        statement: L(
          "Resuelva la ecuación (si usa sustitución, indique el conjunto de soluciones reales):\n\n$$X^4 - 3X^2 - 10 = 0$$",
          "Solve the equation (if you use a substitution, give the set of real solutions):\n\n$$X^4 - 3X^2 - 10 = 0$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Con $u = X^2$ la ecuación se vuelve cuadrática; resuélvela y mira con cuidado los DOS valores de $u$.",
            "With $u = X^2$ the equation becomes quadratic; solve it and look carefully at the TWO values of $u$.",
          ),
          L(
            "$u^2 - 3u - 10 = (u - 5)(u + 2) = 0$ da $u = 5$ y $u = -2$. Como $u = X^2$, un valor negativo de $u$ no produce ninguna $X$ real.",
            "$u^2 - 3u - 10 = (u - 5)(u + 2) = 0$ gives $u = 5$ and $u = -2$. Since $u = X^2$, a negative value of $u$ produces no real $X$.",
          ),
          L(
            "Sobre los reales sólo queda la rama $X^2 = 5$; la rama $X^2 = -2$ se rechaza (daría $X = \\pm i\\sqrt{2}$, imaginarios).",
            "Over the reals only the branch $X^2 = 5$ survives; the branch $X^2 = -2$ is rejected (it would give $X = \\pm i\\sqrt{2}$, imaginary).",
          ),
        ],
        answerDisplay: L(
          "$X = \\pm\\sqrt{5}$",
          "$X = \\pm\\sqrt{5}$",
        ),
        solution: [
          step(
            "given",
            "La ecuación bicuadrática $X^4 - 3X^2 - 10 = 0$; se pide el conjunto de soluciones REALES.",
            "The biquadratic equation $X^4 - 3X^2 - 10 = 0$; the set of REAL solutions is requested.",
          ),
          step(
            "approach",
            "Sustitución $u = X^2$ y, al deshacer, respetar la restricción $u = X^2 \\ge 0$: una rama negativa de $u$ se descarta sobre $\\mathbb{R}$.",
            "Substitute $u = X^2$ and, when undoing, respect the restriction $u = X^2 \\ge 0$: a negative branch of $u$ is discarded over $\\mathbb{R}$.",
          ),
          step(
            "calculation",
            "$u^2 - 3u - 10 = (u - 5)(u + 2) = 0 \\Rightarrow u = 5$ ó $u = -2$.<br>$u = 5$: $X^2 = 5 \\Rightarrow X = \\pm\\sqrt{5}$.<br>$u = -2$: $X^2 = -2$ no tiene solución real (se rechaza).",
            "$u^2 - 3u - 10 = (u - 5)(u + 2) = 0 \\Rightarrow u = 5$ or $u = -2$.<br>$u = 5$: $X^2 = 5 \\Rightarrow X = \\pm\\sqrt{5}$.<br>$u = -2$: $X^2 = -2$ has no real solution (rejected).",
          ),
          step(
            "result",
            "Conjunto de soluciones reales: $X = \\pm\\sqrt{5}$. La rama $X^2 = -2$ daría $X = \\pm i\\sqrt{2}$, que NO son reales: se descarta ✓. Verificación: $(\\sqrt{5})^4 - 3(\\sqrt{5})^2 - 10 = 25 - 15 - 10 = 0$ ✓.",
            "Set of real solutions: $X = \\pm\\sqrt{5}$. The branch $X^2 = -2$ would give $X = \\pm i\\sqrt{2}$, which are NOT real: discarded ✓. Check: $(\\sqrt{5})^4 - 3(\\sqrt{5})^2 - 10 = 25 - 15 - 10 = 0$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S4 · 47 — 3/x² − 7/x + 2 = 0: u = 1/x → x = 1/2, 3. */
  template(
    {
      id: "quad-uees-47",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "standard-form",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["substitution", "reciprocal", "rational-equation"],
      prerequisites: ["polynomials"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "4 · 47",
        page: 3,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$x = \\frac{1}{2},\\ 3$`, `$x = \\frac{1}{2},\\ 3$`), correct: true },
        { id: "b", text: L(`$x = 2,\\ \\frac{1}{3}$`, `$x = 2,\\ \\frac{1}{3}$`), correct: false },
        { id: "c", text: L(`$x = -\\frac{1}{2},\\ -3$`, `$x = -\\frac{1}{2},\\ -3$`), correct: false },
        { id: "d", text: L(`$x = \\frac{7}{6}$`, `$x = \\frac{7}{6}$`), correct: false },
      ];
      return {
        skill: L(
          "Cuadrática en 1/x: sustitución y deshacer el cambio",
          "Quadratic in 1/x: substitute and undo the change",
        ),
        statement: L(
          "Resuelva la ecuación (si usa sustitución, indique el conjunto de soluciones reales):\n\n$$\\frac{3}{x^2} - \\frac{7}{x} + 2 = 0$$",
          "Solve the equation (if you use a substitution, give the set of real solutions):\n\n$$\\frac{3}{x^2} - \\frac{7}{x} + 2 = 0$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "No es cuadrática en $x$, pero sí en $\\frac{1}{x}$: $\\frac{1}{x^2} = \\left(\\frac{1}{x}\\right)^2$. ¿Cuál es la letra natural para el cambio de variable?",
            "It is not quadratic in $x$, but it is in $\\frac{1}{x}$: $\\frac{1}{x^2} = \\left(\\frac{1}{x}\\right)^2$. What is the natural letter for the change of variable?",
          ),
          L(
            "Con $u = \\frac{1}{x}$ (y $x \\ne 0$) queda $3u^2 - 7u + 2 = 0$, factorizable con coeficientes $3$ y $1$.",
            "With $u = \\frac{1}{x}$ (and $x \\ne 0$) you get $3u^2 - 7u + 2 = 0$, factorable with coefficients $3$ and $1$.",
          ),
          L(
            "$3u^2 - 7u + 2 = (3u - 1)(u - 2) = 0$ da $u = \\frac{1}{3}$ y $u = 2$; todavía falta deshacer $x = \\frac{1}{u}$.",
            "$3u^2 - 7u + 2 = (3u - 1)(u - 2) = 0$ gives $u = \\frac{1}{3}$ and $u = 2$; you still have to undo $x = \\frac{1}{u}$.",
          ),
        ],
        answerDisplay: L(
          "$x = \\frac{1}{2},\\ 3$",
          "$x = \\frac{1}{2},\\ 3$",
        ),
        solution: [
          step(
            "given",
            "La ecuación $\\frac{3}{x^2} - \\frac{7}{x} + 2 = 0$ (tarea UEES, sección 4), con $x \\ne 0$.",
            "The equation $\\frac{3}{x^2} - \\frac{7}{x} + 2 = 0$ (UEES assignment, section 4), with $x \\ne 0$.",
          ),
          step(
            "approach",
            "Cambiar de letra: $u = \\frac{1}{x}$ vuelve la ecuación cuadrática en $u$; tras resolver, se deshace con $x = \\frac{1}{u}$ y se comprueba que ninguna raíz coincida con el polo $x = 0$.",
            "Change the letter: $u = \\frac{1}{x}$ makes the equation quadratic in $u$; after solving, undo with $x = \\frac{1}{u}$ and check that no root coincides with the pole $x = 0$.",
          ),
          step(
            "calculation",
            "$u = \\frac{1}{x}$: $3u^2 - 7u + 2 = (3u - 1)(u - 2) = 0 \\Rightarrow u = \\frac{1}{3}$ ó $u = 2$.<br>Deshaciendo: $x = \\frac{1}{u}$ da $x = 3$ y $x = \\frac{1}{2}$.",
            "$u = \\frac{1}{x}$: $3u^2 - 7u + 2 = (3u - 1)(u - 2) = 0 \\Rightarrow u = \\frac{1}{3}$ or $u = 2$.<br>Undoing: $x = \\frac{1}{u}$ gives $x = 3$ and $x = \\frac{1}{2}$.",
          ),
          step(
            "result",
            "$x = \\frac{1}{2},\\ 3$; ninguna es el polo $x = 0$ ✓. Verificación: $x = \\frac{1}{2}$: $\\frac{3}{1/4} - \\frac{7}{1/2} + 2 = 12 - 14 + 2 = 0$ ✓; $x = 3$: $\\frac{3}{9} - \\frac{7}{3} + 2 = \\frac{1}{3} - \\frac{7}{3} + 2 = 0$ ✓.",
            "$x = \\frac{1}{2},\\ 3$; neither is the pole $x = 0$ ✓. Check: $x = \\frac{1}{2}$: $\\frac{3}{1/4} - \\frac{7}{1/2} + 2 = 12 - 14 + 2 = 0$ ✓; $x = 3$: $\\frac{3}{9} - \\frac{7}{3} + 2 = \\frac{1}{3} - \\frac{7}{3} + 2 = 0$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S4 · 48 — x⁻²−x⁻¹−6 = 0: u = 1/x → x = 1/3, −1/2. */
  template(
    {
      id: "quad-uees-48",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "standard-form",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["negative-exponents", "substitution", "rational-equation"],
      prerequisites: ["polynomials"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "4 · 48",
        page: 3,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$x = \\frac{1}{3},\\ -\\frac{1}{2}$`, `$x = \\frac{1}{3},\\ -\\frac{1}{2}$`), correct: true },
        { id: "b", text: L(`$x = 3,\\ -2$`, `$x = 3,\\ -2$`), correct: false },
        { id: "c", text: L(`$x = \\frac{1}{3}$`, `$x = \\frac{1}{3}$`), correct: false },
        { id: "d", text: L(`$x = -\\frac{1}{3},\\ \\frac{1}{2}$`, `$x = -\\frac{1}{3},\\ \\frac{1}{2}$`), correct: false },
      ];
      return {
        skill: L(
          "Exponentes negativos: la cuadrática escondida en x⁻¹",
          "Negative exponents: the quadratic hidden in x⁻¹",
        ),
        statement: L(
          "Resuelva la ecuación (si usa sustitución, indique el conjunto de soluciones reales):\n\n$$x^{-2} - x^{-1} - 6 = 0$$",
          "Solve the equation (if you use a substitution, give the set of real solutions):\n\n$$x^{-2} - x^{-1} - 6 = 0$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Los exponentes negativos esconden potencias de $\\frac{1}{x}$: $x^{-2} = (x^{-1})^2$. Define $u$ con esa expresión.",
            "The negative exponents hide powers of $\\frac{1}{x}$: $x^{-2} = (x^{-1})^2$. Define $u$ with that expression.",
          ),
          L(
            "$u = x^{-1} = \\frac{1}{x}$ (con $x \\ne 0$) da $u^2 - u - 6 = 0$: dos enteros que multipliquen $-6$ y sumen $-1$.",
            "$u = x^{-1} = \\frac{1}{x}$ (with $x \\ne 0$) gives $u^2 - u - 6 = 0$: two integers whose product is $-6$ and whose sum is $-1$.",
          ),
          L(
            "$u^2 - u - 6 = (u - 3)(u + 2) = 0$ da $u = 3$ y $u = -2$; deshaz con $x = \\frac{1}{u}$ (¡no confundas $u$ con $x$!).",
            "$u^2 - u - 6 = (u - 3)(u + 2) = 0$ gives $u = 3$ and $u = -2$; undo with $x = \\frac{1}{u}$ (do not confuse $u$ with $x$!).",
          ),
        ],
        answerDisplay: L(
          "$x = \\frac{1}{3},\\ -\\frac{1}{2}$",
          "$x = \\frac{1}{3},\\ -\\frac{1}{2}$",
        ),
        solution: [
          step(
            "given",
            "La ecuación $x^{-2} - x^{-1} - 6 = 0$, es decir $\\frac{1}{x^2} - \\frac{1}{x} - 6 = 0$ con $x \\ne 0$.",
            "The equation $x^{-2} - x^{-1} - 6 = 0$, that is $\\frac{1}{x^2} - \\frac{1}{x} - 6 = 0$ with $x \\ne 0$.",
          ),
          step(
            "approach",
            "Sustitución $u = x^{-1}$: la ecuación se vuelve $u^2 - u - 6 = 0$; al deshacer, $x = \\frac{1}{u}$ (el distractor clásico es quedarse en los valores de $u$).",
            "Substitution $u = x^{-1}$: the equation becomes $u^2 - u - 6 = 0$; when undoing, $x = \\frac{1}{u}$ (the classic trap is to stay with the values of $u$).",
          ),
          step(
            "calculation",
            "$u^2 - u - 6 = (u - 3)(u + 2) = 0 \\Rightarrow u = 3$ ó $u = -2$.<br>Deshaciendo: $x = \\frac{1}{3}$ y $x = -\\frac{1}{2}$.",
            "$u^2 - u - 6 = (u - 3)(u + 2) = 0 \\Rightarrow u = 3$ or $u = -2$.<br>Undoing: $x = \\frac{1}{3}$ and $x = -\\frac{1}{2}$.",
          ),
          step(
            "result",
            "$x = \\frac{1}{3},\\ -\\frac{1}{2}$; ninguna es el polo $x = 0$ ✓. Verificación: $x = \\frac{1}{3}$: $9 - 3 - 6 = 0$ ✓; $x = -\\frac{1}{2}$: $4 + 2 - 6 = 0$ ✓.",
            "$x = \\frac{1}{3},\\ -\\frac{1}{2}$; neither is the pole $x = 0$ ✓. Check: $x = \\frac{1}{3}$: $9 - 3 - 6 = 0$ ✓; $x = -\\frac{1}{2}$: $4 + 2 - 6 = 0$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S4 · 49 — x⁻⁴−9x⁻²+20 = 0: u = x⁻² → ±1/2, ±1/√5. */
  template(
    {
      id: "quad-uees-49",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "standard-form",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["negative-exponents", "substitution", "solution-set"],
      prerequisites: ["polynomials"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "4 · 49",
        page: 3,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$x = \\pm\\frac{1}{2},\\ \\pm\\frac{1}{\\sqrt{5}}$`, `$x = \\pm\\frac{1}{2},\\ \\pm\\frac{1}{\\sqrt{5}}$`), correct: true },
        { id: "b", text: L(`$x = \\pm 4,\\ \\pm 5$`, `$x = \\pm 4,\\ \\pm 5$`), correct: false },
        { id: "c", text: L(`$x = \\pm\\frac{1}{2}$`, `$x = \\pm\\frac{1}{2}$`), correct: false },
        { id: "d", text: L(`$x = \\pm\\frac{1}{\\sqrt{20}}$`, `$x = \\pm\\frac{1}{\\sqrt{20}}$`), correct: false },
      ];
      return {
        skill: L(
          "Bicuadrática en x⁻²: cuatro soluciones reales",
          "Biquadratic in x⁻²: four real solutions",
        ),
        statement: L(
          "Resuelva la ecuación (si usa sustitución, indique el conjunto de soluciones reales):\n\n$$x^{-4} - 9x^{-2} + 20 = 0$$",
          "Solve the equation (if you use a substitution, give the set of real solutions):\n\n$$x^{-4} - 9x^{-2} + 20 = 0$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "$x^{-4} = (x^{-2})^2$: la ecuación es cuadrática en $x^{-2} = \\frac{1}{x^2}$.",
            "$x^{-4} = (x^{-2})^2$: the equation is quadratic in $x^{-2} = \\frac{1}{x^2}$.",
          ),
          L(
            "$u = x^{-2}$ da $u^2 - 9u + 20 = (u - 4)(u - 5) = 0$.",
            "$u = x^{-2}$ gives $u^2 - 9u + 20 = (u - 4)(u - 5) = 0$.",
          ),
          L(
            "$u = 4$ y $u = 5$; deshaz con $x^2 = \\frac{1}{u}$: cada rama aporta un par $\\pm$ (en total, cuatro soluciones).",
            "$u = 4$ and $u = 5$; undo with $x^2 = \\frac{1}{u}$: each branch contributes a $\\pm$ pair (four solutions in total).",
          ),
        ],
        answerDisplay: L(
          "$x = \\pm\\frac{1}{2},\\ \\pm\\frac{1}{\\sqrt{5}}$",
          "$x = \\pm\\frac{1}{2},\\ \\pm\\frac{1}{\\sqrt{5}}$",
        ),
        solution: [
          step(
            "given",
            "La ecuación $x^{-4} - 9x^{-2} + 20 = 0$, con $x \\ne 0$.",
            "The equation $x^{-4} - 9x^{-2} + 20 = 0$, with $x \\ne 0$.",
          ),
          step(
            "approach",
            "Sustitución $u = x^{-2}$; cada $u > 0$ se deshace con $x^2 = \\frac{1}{u}$, que produce dos soluciones $\\pm$.",
            "Substitution $u = x^{-2}$; each $u > 0$ is undone with $x^2 = \\frac{1}{u}$, which produces two $\\pm$ solutions.",
          ),
          step(
            "calculation",
            "$u^2 - 9u + 20 = (u - 4)(u - 5) = 0 \\Rightarrow u = 4$ ó $u = 5$.<br>$u = 4$: $x^2 = \\frac{1}{4} \\Rightarrow x = \\pm\\frac{1}{2}$.<br>$u = 5$: $x^2 = \\frac{1}{5} \\Rightarrow x = \\pm\\frac{1}{\\sqrt{5}} = \\pm\\frac{\\sqrt{5}}{5}$.",
            "$u^2 - 9u + 20 = (u - 4)(u - 5) = 0 \\Rightarrow u = 4$ or $u = 5$.<br>$u = 4$: $x^2 = \\frac{1}{4} \\Rightarrow x = \\pm\\frac{1}{2}$.<br>$u = 5$: $x^2 = \\frac{1}{5} \\Rightarrow x = \\pm\\frac{1}{\\sqrt{5}} = \\pm\\frac{\\sqrt{5}}{5}$.",
          ),
          step(
            "result",
            "$x = \\pm\\frac{1}{2},\\ \\pm\\frac{1}{\\sqrt{5}}$ (cuatro soluciones reales; ninguna es el polo $x = 0$ ✓). Verificación: $x = \\frac{1}{2}$: $16 - 36 + 20 = 0$ ✓; $x = \\frac{1}{\\sqrt{5}}$: $x^{-2} = 5$ y $x^{-4} = 25$: $25 - 45 + 20 = 0$ ✓.",
            "$x = \\pm\\frac{1}{2},\\ \\pm\\frac{1}{\\sqrt{5}}$ (four real solutions; none is the pole $x = 0$ ✓). Check: $x = \\frac{1}{2}$: $16 - 36 + 20 = 0$ ✓; $x = \\frac{1}{\\sqrt{5}}$: $x^{-2} = 5$ and $x^{-4} = 25$: $25 - 45 + 20 = 0$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S4 · 50 — 1/x⁴−9/x²+8 = 0: u = 1/x² → ±1, ±√2/4. */
  template(
    {
      id: "quad-uees-50",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "standard-form",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["substitution", "reciprocal", "solution-set"],
      prerequisites: ["polynomials"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "4 · 50",
        page: 3,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$x = \\pm 1,\\ \\pm\\frac{\\sqrt{2}}{4}$`, `$x = \\pm 1,\\ \\pm\\frac{\\sqrt{2}}{4}$`), correct: true },
        { id: "b", text: L(`$x = \\pm 1$`, `$x = \\pm 1$`), correct: false },
        { id: "c", text: L(`$x = \\pm 8,\\ \\pm 1$`, `$x = \\pm 8,\\ \\pm 1$`), correct: false },
        { id: "d", text: L(`$x = \\pm 1,\\ \\pm\\frac{1}{8}$`, `$x = \\pm 1,\\ \\pm\\frac{1}{8}$`), correct: false },
      ];
      return {
        skill: L(
          "Fracciones con x⁴ y x²: sustitución u = 1/x²",
          "Fractions with x⁴ and x²: the substitution u = 1/x²",
        ),
        statement: L(
          "Resuelva la ecuación (si usa sustitución, indique el conjunto de soluciones reales):\n\n$$\\frac{1}{x^4} - \\frac{9}{x^2} + 8 = 0$$",
          "Solve the equation (if you use a substitution, give the set of real solutions):\n\n$$\\frac{1}{x^4} - \\frac{9}{x^2} + 8 = 0$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Escribe las fracciones como potencias: $\\frac{1}{x^4} = x^{-4} = (x^{-2})^2$. La sustitución natural es $u = \\frac{1}{x^2}$.",
            "Write the fractions as powers: $\\frac{1}{x^4} = x^{-4} = (x^{-2})^2$. The natural substitution is $u = \\frac{1}{x^2}$.",
          ),
          L(
            "$u = \\frac{1}{x^2}$ (con $x \\ne 0$) da $u^2 - 9u + 8 = 0$, factorizable con producto $8$ y suma $-9$.",
            "$u = \\frac{1}{x^2}$ (with $x \\ne 0$) gives $u^2 - 9u + 8 = 0$, factorable with product $8$ and sum $-9$.",
          ),
          L(
            "$u = 1$ y $u = 8$; deshaz con $x^2 = \\frac{1}{u}$: la segunda rama da $x = \\pm\\frac{1}{\\sqrt{8}}$, que simplifica a $\\pm\\frac{\\sqrt{2}}{4}$.",
            "$u = 1$ and $u = 8$; undo with $x^2 = \\frac{1}{u}$: the second branch gives $x = \\pm\\frac{1}{\\sqrt{8}}$, which simplifies to $\\pm\\frac{\\sqrt{2}}{4}$.",
          ),
        ],
        answerDisplay: L(
          "$x = \\pm 1,\\ \\pm\\frac{\\sqrt{2}}{4}$",
          "$x = \\pm 1,\\ \\pm\\frac{\\sqrt{2}}{4}$",
        ),
        solution: [
          step(
            "given",
            "La ecuación $\\frac{1}{x^4} - \\frac{9}{x^2} + 8 = 0$, con $x \\ne 0$.",
            "The equation $\\frac{1}{x^4} - \\frac{9}{x^2} + 8 = 0$, with $x \\ne 0$.",
          ),
          step(
            "approach",
            "Sustitución $u = \\frac{1}{x^2}$; se resuelve la cuadrática en $u$ y se deshace con $x^2 = \\frac{1}{u}$ cuidando el signo y el $\\pm$.",
            "Substitution $u = \\frac{1}{x^2}$; solve the quadratic in $u$ and undo with $x^2 = \\frac{1}{u}$, taking care of the sign and the $\\pm$.",
          ),
          step(
            "calculation",
            "$u^2 - 9u + 8 = (u - 1)(u - 8) = 0 \\Rightarrow u = 1$ ó $u = 8$.<br>$u = 1$: $x^2 = 1 \\Rightarrow x = \\pm 1$.<br>$u = 8$: $x^2 = \\frac{1}{8} \\Rightarrow x = \\pm\\frac{1}{\\sqrt{8}} = \\pm\\frac{\\sqrt{2}}{4}$.",
            "$u^2 - 9u + 8 = (u - 1)(u - 8) = 0 \\Rightarrow u = 1$ or $u = 8$.<br>$u = 1$: $x^2 = 1 \\Rightarrow x = \\pm 1$.<br>$u = 8$: $x^2 = \\frac{1}{8} \\Rightarrow x = \\pm\\frac{1}{\\sqrt{8}} = \\pm\\frac{\\sqrt{2}}{4}$.",
          ),
          step(
            "result",
            "$x = \\pm 1,\\ \\pm\\frac{\\sqrt{2}}{4}$ (equivale a $\\pm\\frac{1}{\\sqrt{8}}$; ninguna es el polo $x = 0$ ✓). Verificación: $x = 1$: $1 - 9 + 8 = 0$ ✓; $x = \\frac{1}{\\sqrt{8}}$: $x^{-2} = 8$ y $x^{-4} = 64$: $64 - 72 + 8 = 0$ ✓.",
            "$x = \\pm 1,\\ \\pm\\frac{\\sqrt{2}}{4}$ (equivalent to $\\pm\\frac{1}{\\sqrt{8}}$; none is the pole $x = 0$ ✓). Check: $x = 1$: $1 - 9 + 8 = 0$ ✓; $x = \\frac{1}{\\sqrt{8}}$: $x^{-2} = 8$ and $x^{-4} = 64$: $64 - 72 + 8 = 0$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S4 · 51 — (X−5)²+7(X−5)+10 = 0: u = X−5 → X = 3, 0. */
  template(
    {
      id: "quad-uees-51",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "factoring",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 210,
      tags: ["substitution", "factoring", "quadratic-form"],
      prerequisites: ["polynomials"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "4 · 51",
        page: 3,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$X = 3,\\ 0$`, `$X = 3,\\ 0$`), correct: true },
        { id: "b", text: L(`$X = -2,\\ -5$`, `$X = -2,\\ -5$`), correct: false },
        { id: "c", text: L(`$X = 3$`, `$X = 3$`), correct: false },
        { id: "d", text: L(`$X = 0,\\ 10$`, `$X = 0,\\ 10$`), correct: false },
      ];
      return {
        skill: L(
          "La cuadrática vive en el bloque (X − 5)",
          "The quadratic lives inside the block (X − 5)",
        ),
        statement: L(
          "Resuelva la ecuación (si usa sustitución, indique el conjunto de soluciones reales):\n\n$$(X - 5)^2 + 7(X - 5) + 10 = 0$$",
          "Solve the equation (if you use a substitution, give the set of real solutions):\n\n$$(X - 5)^2 + 7(X - 5) + 10 = 0$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El bloque que se repite es $(X - 5)$: la ecuación es cuadrática en ese bloque. ¿Qué letra conviene introducir?",
            "The repeating block is $(X - 5)$: the equation is quadratic in that block. Which letter is convenient to introduce?",
          ),
          L(
            "$u = X - 5$ da $u^2 + 7u + 10 = 0$: dos números que multipliquen $10$ y sumen $7$.",
            "$u = X - 5$ gives $u^2 + 7u + 10 = 0$: two numbers whose product is $10$ and whose sum is $7$.",
          ),
          L(
            "$u^2 + 7u + 10 = (u + 2)(u + 5) = 0$ da $u = -2$ y $u = -5$; deshaz con $X = u + 5$.",
            "$u^2 + 7u + 10 = (u + 2)(u + 5) = 0$ gives $u = -2$ and $u = -5$; undo with $X = u + 5$.",
          ),
        ],
        answerDisplay: L(
          "$X = 3,\\ 0$",
          "$X = 3,\\ 0$",
        ),
        solution: [
          step(
            "given",
            "La ecuación $(X - 5)^2 + 7(X - 5) + 10 = 0$ (tarea UEES, sección 4).",
            "The equation $(X - 5)^2 + 7(X - 5) + 10 = 0$ (UEES assignment, section 4).",
          ),
          step(
            "approach",
            "Sustitución $u = X - 5$ (forma cuadrática $u^2 + 7u + 10 = 0$); tras factorizar, se deshace con $X = u + 5$. Confundir los valores de $u$ con los de $X$ es el error clásico.",
            "Substitution $u = X - 5$ (quadratic form $u^2 + 7u + 10 = 0$); after factoring, undo with $X = u + 5$. Confusing the values of $u$ with those of $X$ is the classic mistake.",
          ),
          step(
            "calculation",
            "$u^2 + 7u + 10 = (u + 2)(u + 5) = 0 \\Rightarrow u = -2$ ó $u = -5$.<br>$u = -2$: $X = -2 + 5 = 3$.<br>$u = -5$: $X = -5 + 5 = 0$.",
            "$u^2 + 7u + 10 = (u + 2)(u + 5) = 0 \\Rightarrow u = -2$ or $u = -5$.<br>$u = -2$: $X = -2 + 5 = 3$.<br>$u = -5$: $X = -5 + 5 = 0$.",
          ),
          step(
            "result",
            "$X = 3,\\ 0$. Verificación: $X = 3$: $(-2)^2 + 7(-2) + 10 = 4 - 14 + 10 = 0$ ✓; $X = 0$: $(-5)^2 + 7(-5) + 10 = 25 - 35 + 10 = 0$ ✓.",
            "$X = 3,\\ 0$. Check: $X = 3$: $(-2)^2 + 7(-2) + 10 = 4 - 14 + 10 = 0$ ✓; $X = 0$: $(-5)^2 + 7(-5) + 10 = 25 - 35 + 10 = 0$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S4 · 52 — (3x+2)²−5(3x+2) = 0: u = 3x+2 → x = −2/3, 1. */
  template(
    {
      id: "quad-uees-52",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "factoring",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 210,
      tags: ["substitution", "factoring", "common-factor"],
      prerequisites: ["polynomials"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "4 · 52",
        page: 3,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$x = -\\frac{2}{3},\\ 1$`, `$x = -\\frac{2}{3},\\ 1$`), correct: true },
        { id: "b", text: L(`$x = 0,\\ 5$`, `$x = 0,\\ 5$`), correct: false },
        { id: "c", text: L(`$x = -\\frac{2}{3}$`, `$x = -\\frac{2}{3}$`), correct: false },
        { id: "d", text: L(`$x = \\frac{2}{3},\\ 1$`, `$x = \\frac{2}{3},\\ 1$`), correct: false },
      ];
      return {
        skill: L(
          "Factor común en la nueva letra: u(u − 5) = 0",
          "Common factor in the new letter: u(u − 5) = 0",
        ),
        statement: L(
          "Resuelva la ecuación (si usa sustitución, indique el conjunto de soluciones reales):\n\n$$(3x + 2)^2 - 5(3x + 2) = 0$$",
          "Solve the equation (if you use a substitution, give the set of real solutions):\n\n$$(3x + 2)^2 - 5(3x + 2) = 0$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El bloque $(3x + 2)$ aparece al cuadrado y lineal: es la «letra» de la sustitución.",
            "The block $(3x + 2)$ appears squared and linear: it is the “letter” of the substitution.",
          ),
          L(
            "$u = 3x + 2$ da $u^2 - 5u = 0$: aquí hay FACTOR COMÚN $u$, no un trinomio.",
            "$u = 3x + 2$ gives $u^2 - 5u = 0$: here there is a COMMON FACTOR $u$, not a trinomial.",
          ),
          L(
            "$u(u - 5) = 0$ da $u = 0$ ó $u = 5$; deshaz con $3x + 2 = u$ (divide entre $3$ al final).",
            "$u(u - 5) = 0$ gives $u = 0$ or $u = 5$; undo with $3x + 2 = u$ (divide by $3$ at the end).",
          ),
        ],
        answerDisplay: L(
          "$x = -\\frac{2}{3},\\ 1$",
          "$x = -\\frac{2}{3},\\ 1$",
        ),
        solution: [
          step(
            "given",
            "La ecuación $(3x + 2)^2 - 5(3x + 2) = 0$.",
            "The equation $(3x + 2)^2 - 5(3x + 2) = 0$.",
          ),
          step(
            "approach",
            "Sustitución $u = 3x + 2$ y factor común: $u^2 - 5u = u(u - 5)$. La rama $u = 0$ NO se pierde: da $3x + 2 = 0$.",
            "Substitution $u = 3x + 2$ and common factor: $u^2 - 5u = u(u - 5)$. The branch $u = 0$ is NOT lost: it gives $3x + 2 = 0$.",
          ),
          step(
            "calculation",
            "$u(u - 5) = 0 \\Rightarrow u = 0$ ó $u = 5$.<br>$u = 0$: $3x + 2 = 0 \\Rightarrow x = -\\frac{2}{3}$.<br>$u = 5$: $3x + 2 = 5 \\Rightarrow 3x = 3 \\Rightarrow x = 1$.",
            "$u(u - 5) = 0 \\Rightarrow u = 0$ or $u = 5$.<br>$u = 0$: $3x + 2 = 0 \\Rightarrow x = -\\frac{2}{3}$.<br>$u = 5$: $3x + 2 = 5 \\Rightarrow 3x = 3 \\Rightarrow x = 1$.",
          ),
          step(
            "result",
            "$x = -\\frac{2}{3},\\ 1$. Verificación: $x = -\\frac{2}{3}$: $(0)^2 - 5(0) = 0$ ✓; $x = 1$: $5^2 - 5 \\cdot 5 = 25 - 25 = 0$ ✓.",
            "$x = -\\frac{2}{3},\\ 1$. Check: $x = -\\frac{2}{3}$: $(0)^2 - 5(0) = 0$ ✓; $x = 1$: $5^2 - 5 \\cdot 5 = 25 - 25 = 0$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S4 · 53 — 1/(x−4)²−7/(x−4)+12 = 0: u = 1/(x−4) → x = 13/3, 17/4. */
  template(
    {
      id: "quad-uees-53",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "factoring",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 210,
      tags: ["substitution", "reciprocal", "rational-equation"],
      prerequisites: ["polynomials"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "4 · 53",
        page: 3,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$x = \\frac{13}{3},\\ \\frac{17}{4}$`, `$x = \\frac{13}{3},\\ \\frac{17}{4}$`), correct: true },
        { id: "b", text: L(`$x = 3,\\ 4$`, `$x = 3,\\ 4$`), correct: false },
        { id: "c", text: L(`$x = \\frac{13}{3}$`, `$x = \\frac{13}{3}$`), correct: false },
        { id: "d", text: L(`$x = \\frac{1}{3},\\ \\frac{1}{4}$`, `$x = \\frac{1}{3},\\ \\frac{1}{4}$`), correct: false },
      ];
      return {
        skill: L(
          "Cuadrática en 1/(x − 4) y el arte de deshacer el cambio",
          "Quadratic in 1/(x − 4) and the art of undoing the change",
        ),
        statement: L(
          "Resuelva la ecuación (si usa sustitución, indique el conjunto de soluciones reales):\n\n$$\\frac{1}{(x - 4)^2} - \\frac{7}{x - 4} + 12 = 0$$",
          "Solve the equation (if you use a substitution, give the set of real solutions):\n\n$$\\frac{1}{(x - 4)^2} - \\frac{7}{x - 4} + 12 = 0$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "La $x$ sólo aparece dentro del bloque $(x - 4)$, como $\\frac{1}{x-4}$ y su cuadrado: cambia de letra el bloque completo.",
            "The $x$ only appears inside the block $(x - 4)$, as $\\frac{1}{x-4}$ and its square: change the whole block to a new letter.",
          ),
          L(
            "$u = \\frac{1}{x - 4}$ (con $x \\ne 4$) da $u^2 - 7u + 12 = 0$.",
            "$u = \\frac{1}{x - 4}$ (with $x \\ne 4$) gives $u^2 - 7u + 12 = 0$.",
          ),
          L(
            "$(u - 3)(u - 4) = 0$ da $u = 3$ y $u = 4$; deshaz con $x - 4 = \\frac{1}{u}$ (¡no con $x = u$!).",
            "$(u - 3)(u - 4) = 0$ gives $u = 3$ and $u = 4$; undo with $x - 4 = \\frac{1}{u}$ (not with $x = u$!).",
          ),
        ],
        answerDisplay: L(
          "$x = \\frac{13}{3},\\ \\frac{17}{4}$",
          "$x = \\frac{13}{3},\\ \\frac{17}{4}$",
        ),
        solution: [
          step(
            "given",
            "La ecuación $\\frac{1}{(x - 4)^2} - \\frac{7}{x - 4} + 12 = 0$, con $x \\ne 4$.",
            "The equation $\\frac{1}{(x - 4)^2} - \\frac{7}{x - 4} + 12 = 0$, with $x \\ne 4$.",
          ),
          step(
            "approach",
            "Sustitución $u = \\frac{1}{x - 4}$; la cuadrática $u^2 - 7u + 12 = 0$ se factoriza y se deshace con $x - 4 = \\frac{1}{u}$; al final se comprueba que ninguna raíz sea el polo $x = 4$.",
            "Substitution $u = \\frac{1}{x - 4}$; the quadratic $u^2 - 7u + 12 = 0$ is factored and undone with $x - 4 = \\frac{1}{u}$; at the end, check that no root is the pole $x = 4$.",
          ),
          step(
            "calculation",
            "$u^2 - 7u + 12 = (u - 3)(u - 4) = 0 \\Rightarrow u = 3$ ó $u = 4$.<br>$u = 3$: $x - 4 = \\frac{1}{3} \\Rightarrow x = 4 + \\frac{1}{3} = \\frac{13}{3}$.<br>$u = 4$: $x - 4 = \\frac{1}{4} \\Rightarrow x = 4 + \\frac{1}{4} = \\frac{17}{4}$.",
            "$u^2 - 7u + 12 = (u - 3)(u - 4) = 0 \\Rightarrow u = 3$ or $u = 4$.<br>$u = 3$: $x - 4 = \\frac{1}{3} \\Rightarrow x = 4 + \\frac{1}{3} = \\frac{13}{3}$.<br>$u = 4$: $x - 4 = \\frac{1}{4} \\Rightarrow x = 4 + \\frac{1}{4} = \\frac{17}{4}$.",
          ),
          step(
            "result",
            "$x = \\frac{13}{3},\\ \\frac{17}{4}$; ninguna coincide con el polo $x = 4$ ✓. Verificación: $x = \\frac{13}{3}$: $x - 4 = \\frac{1}{3}$ y $9 - 21 + 12 = 0$ ✓; $x = \\frac{17}{4}$: $x - 4 = \\frac{1}{4}$ y $16 - 28 + 12 = 0$ ✓.",
            "$x = \\frac{13}{3},\\ \\frac{17}{4}$; neither coincides with the pole $x = 4$ ✓. Check: $x = \\frac{13}{3}$: $x - 4 = \\frac{1}{3}$ and $9 - 21 + 12 = 0$ ✓; $x = \\frac{17}{4}$: $x - 4 = \\frac{1}{4}$ and $16 - 28 + 12 = 0$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S4 · 54 — 2/(x+4)²+7/(x+4)+3 = 0: u = 1/(x+4) → x = −6, −13/3. */
  template(
    {
      id: "quad-uees-54",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "factoring",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 210,
      tags: ["substitution", "reciprocal", "rational-equation"],
      prerequisites: ["polynomials"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "4 · 54",
        page: 3,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$x = -6,\\ -\\frac{13}{3}$`, `$x = -6,\\ -\\frac{13}{3}$`), correct: true },
        { id: "b", text: L(`$x = -\\frac{1}{2},\\ -3$`, `$x = -\\frac{1}{2},\\ -3$`), correct: false },
        { id: "c", text: L(`$x = -6$`, `$x = -6$`), correct: false },
        { id: "d", text: L(`$x = 6,\\ \\frac{13}{3}$`, `$x = 6,\\ \\frac{13}{3}$`), correct: false },
      ];
      return {
        skill: L(
          "Cuadrática en 1/(x + 4) con coeficiente 2",
          "Quadratic in 1/(x + 4) with leading coefficient 2",
        ),
        statement: L(
          "Resuelva la ecuación (si usa sustitución, indique el conjunto de soluciones reales):\n\n$$\\frac{2}{(x + 4)^2} + \\frac{7}{x + 4} + 3 = 0$$",
          "Solve the equation (if you use a substitution, give the set of real solutions):\n\n$$\\frac{2}{(x + 4)^2} + \\frac{7}{x + 4} + 3 = 0$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Todo vive dentro del bloque $(x + 4)$: introduce una letra para $\\frac{1}{x+4}$.",
            "Everything lives inside the block $(x + 4)$: introduce a letter for $\\frac{1}{x+4}$.",
          ),
          L(
            "$u = \\frac{1}{x + 4}$ (con $x \\ne -4$) da $2u^2 + 7u + 3 = 0$: factoriza con coeficientes $2$ y $1$.",
            "$u = \\frac{1}{x + 4}$ (with $x \\ne -4$) gives $2u^2 + 7u + 3 = 0$: factor with coefficients $2$ and $1$.",
          ),
          L(
            "$2u^2 + 7u + 3 = (2u + 1)(u + 3) = 0$ da $u = -\\frac{1}{2}$ y $u = -3$; deshaz con $x + 4 = \\frac{1}{u}$ (ambos $u$ son negativos: los $x$ quedan menores que $-4$).",
            "$2u^2 + 7u + 3 = (2u + 1)(u + 3) = 0$ gives $u = -\\frac{1}{2}$ and $u = -3$; undo with $x + 4 = \\frac{1}{u}$ (both $u$ are negative: the $x$ values end up below $-4$).",
          ),
        ],
        answerDisplay: L(
          "$x = -6,\\ -\\frac{13}{3}$",
          "$x = -6,\\ -\\frac{13}{3}$",
        ),
        solution: [
          step(
            "given",
            "La ecuación $\\frac{2}{(x + 4)^2} + \\frac{7}{x + 4} + 3 = 0$, con $x \\ne -4$.",
            "The equation $\\frac{2}{(x + 4)^2} + \\frac{7}{x + 4} + 3 = 0$, with $x \\ne -4$.",
          ),
          step(
            "approach",
            "Sustitución $u = \\frac{1}{x + 4}$; se factoriza $2u^2 + 7u + 3$ y se deshace con $x + 4 = \\frac{1}{u}$; comprobar al final contra el polo $x = -4$.",
            "Substitution $u = \\frac{1}{x + 4}$; factor $2u^2 + 7u + 3$ and undo with $x + 4 = \\frac{1}{u}$; check at the end against the pole $x = -4$.",
          ),
          step(
            "calculation",
            "$2u^2 + 7u + 3 = (2u + 1)(u + 3) = 0 \\Rightarrow u = -\\frac{1}{2}$ ó $u = -3$.<br>$u = -\\frac{1}{2}$: $x + 4 = -2 \\Rightarrow x = -6$.<br>$u = -3$: $x + 4 = -\\frac{1}{3} \\Rightarrow x = -4 - \\frac{1}{3} = -\\frac{13}{3}$.",
            "$2u^2 + 7u + 3 = (2u + 1)(u + 3) = 0 \\Rightarrow u = -\\frac{1}{2}$ or $u = -3$.<br>$u = -\\frac{1}{2}$: $x + 4 = -2 \\Rightarrow x = -6$.<br>$u = -3$: $x + 4 = -\\frac{1}{3} \\Rightarrow x = -4 - \\frac{1}{3} = -\\frac{13}{3}$.",
          ),
          step(
            "result",
            "$x = -6,\\ -\\frac{13}{3}$; ninguna coincide con el polo $x = -4$ ✓. Verificación: $x = -6$: $x + 4 = -2$ y $\\frac{2}{4} + \\frac{7}{-2} + 3 = \\frac{1}{2} - \\frac{7}{2} + 3 = 0$ ✓; $x = -\\frac{13}{3}$: $x + 4 = -\\frac{1}{3}$ y $18 - 21 + 3 = 0$ ✓.",
            "$x = -6,\\ -\\frac{13}{3}$; neither coincides with the pole $x = -4$ ✓. Check: $x = -6$: $x + 4 = -2$ and $\\frac{2}{4} + \\frac{7}{-2} + 3 = \\frac{1}{2} - \\frac{7}{2} + 3 = 0$ ✓; $x = -\\frac{13}{3}$: $x + 4 = -\\frac{1}{3}$ and $18 - 21 + 3 = 0$ ✓.",
          ),
        ],
      };
    },
  ),
  /* S4 · 55 — x² = (x+3)/2 → 2x²−x−3 = 0 → x = 3/2, −1. */
  template(
    {
      id: "quad-uees-55",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "quadratic-formula",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["standard-form", "quadratic-formula", "solution-set"],
      prerequisites: ["polynomials"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "4 · 55",
        page: 3,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$x = \\frac{3}{2},\\ -1$`, `$x = \\frac{3}{2},\\ -1$`), correct: true },
        { id: "b", text: L(`$x = \\frac{3}{2}$`, `$x = \\frac{3}{2}$`), correct: false },
        { id: "c", text: L(`$x = -1$`, `$x = -1$`), correct: false },
        { id: "d", text: L(`$x = \\frac{1}{2},\\ 3$`, `$x = \\frac{1}{2},\\ 3$`), correct: false },
      ];
      return {
        skill: L(
          "De la ecuación «mixta» a la forma general y de ahí a las raíces",
          "From the “mixed” equation to standard form and then to the roots",
        ),
        statement: L(
          "Resuelva la ecuación por cualquier método:\n\n$$x^2 = \\frac{x + 3}{2}$$",
          "Solve the equation by any method:\n\n$$x^2 = \\frac{x + 3}{2}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Primero elimina el denominador y pasa TODO a un lado: una ecuación cuadrática sólo se resuelve bien en forma general $ax^2 + bx + c = 0$.",
            "First clear the denominator and move EVERYTHING to one side: a quadratic equation is only solved cleanly in standard form $ax^2 + bx + c = 0$.",
          ),
          L(
            "Multiplicando por $2$: $2x^2 = x + 3$, o sea $2x^2 - x - 3 = 0$ con $a = 2$, $b = -1$, $c = -3$.",
            "Multiplying by $2$: $2x^2 = x + 3$, that is $2x^2 - x - 3 = 0$ with $a = 2$, $b = -1$, $c = -3$.",
          ),
          L(
            "$\\Delta = (-1)^2 - 4(2)(-3) = 25$, así que $x = \\frac{1 \\pm 5}{4}$: salen las DOS raíces.",
            "$\\Delta = (-1)^2 - 4(2)(-3) = 25$, so $x = \\frac{1 \\pm 5}{4}$: BOTH roots come out.",
          ),
        ],
        answerDisplay: L(
          "$x = \\frac{3}{2},\\ -1$",
          "$x = \\frac{3}{2},\\ -1$",
        ),
        solution: [
          step(
            "given",
            "La ecuación $x^2 = \\frac{x + 3}{2}$ (tarea UEES, sección 4; «resuelva por cualquier método»).",
            "The equation $x^2 = \\frac{x + 3}{2}$ (UEES assignment, section 4; “solve by any method”).",
          ),
          step(
            "approach",
            "Llevar a forma general multiplicando por $2$ y pasando todo a la izquierda; luego factorizar o aplicar la fórmula cuadrática. El error típico es «resolver» $x^2 = x/2 + 3/2$ tomando raíz sólo del lado izquierdo.",
            "Bring to standard form by multiplying by $2$ and moving everything to the left; then factor or apply the quadratic formula. The typical error is to “solve” $x^2 = x/2 + 3/2$ by taking a square root only on the left side.",
          ),
          step(
            "calculation",
            "$2x^2 = x + 3 \\Rightarrow 2x^2 - x - 3 = 0$.<br>Factorización: $2x^2 - x - 3 = (2x - 3)(x + 1) = 0$.<br>$2x - 3 = 0 \\Rightarrow x = \\frac{3}{2}$; $x + 1 = 0 \\Rightarrow x = -1$.",
            "$2x^2 = x + 3 \\Rightarrow 2x^2 - x - 3 = 0$.<br>Factoring: $2x^2 - x - 3 = (2x - 3)(x + 1) = 0$.<br>$2x - 3 = 0 \\Rightarrow x = \\frac{3}{2}$; $x + 1 = 0 \\Rightarrow x = -1$.",
          ),
          step(
            "result",
            "$x = \\frac{3}{2},\\ -1$. Verificación: $x = \\frac{3}{2}$: $\\frac{9}{4} = \\frac{3/2 + 3}{2} = \\frac{9/2}{2} = \\frac{9}{4}$ ✓; $x = -1$: $1 = \\frac{-1 + 3}{2} = 1$ ✓.",
            "$x = \\frac{3}{2},\\ -1$. Check: $x = \\frac{3}{2}$: $\\frac{9}{4} = \\frac{3/2 + 3}{2} = \\frac{9/2}{2} = \\frac{9}{4}$ ✓; $x = -1$: $1 = \\frac{-1 + 3}{2} = 1$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S4 · 56 — x/2 = 7/x − 5/2 → x²+5x−14 = 0 → x = 2, −7. */
  template(
    {
      id: "quad-uees-56",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "quadratic-formula",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["rational-equation", "quadratic-formula", "pole-check"],
      prerequisites: ["polynomials"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "4 · 56",
        page: 3,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$x = 2,\\ -7$`, `$x = 2,\\ -7$`), correct: true },
        { id: "b", text: L(`$x = 2$`, `$x = 2$`), correct: false },
        { id: "c", text: L(`$x = -2,\\ 7$`, `$x = -2,\\ 7$`), correct: false },
        { id: "d", text: L(`$x = 14$`, `$x = 14$`), correct: false },
      ];
      return {
        skill: L(
          "Ecuación con x en ambos denominadores: multiplicar y comprobar el polo",
          "Equation with x in both denominators: multiply and check the pole",
        ),
        statement: L(
          "Resuelva la ecuación por cualquier método:\n\n$$\\frac{x}{2} = \\frac{7}{x} - \\frac{5}{2}$$",
          "Solve the equation by any method:\n\n$$\\frac{x}{2} = \\frac{7}{x} - \\frac{5}{2}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Multiplica ambos lados por el denominador común $2x$ (con $x \\ne 0$) para eliminar TODAS las fracciones de una vez.",
            "Multiply both sides by the common denominator $2x$ (with $x \\ne 0$) to clear ALL fractions at once.",
          ),
          L(
            "Queda $x^2 = 14 - 5x$; pasa todo a un lado: $x^2 + 5x - 14 = 0$.",
            "You get $x^2 = 14 - 5x$; move everything to one side: $x^2 + 5x - 14 = 0$.",
          ),
          L(
            "Factoriza buscando producto $-14$ y suma $5$; al final confirma que ninguna raíz sea el valor prohibido $x = 0$.",
            "Factor looking for product $-14$ and sum $5$; at the end confirm that neither root is the forbidden value $x = 0$.",
          ),
        ],
        answerDisplay: L(
          "$x = 2,\\ -7$",
          "$x = 2,\\ -7$",
        ),
        solution: [
          step(
            "given",
            "La ecuación $\\frac{x}{2} = \\frac{7}{x} - \\frac{5}{2}$, con $x \\ne 0$.",
            "The equation $\\frac{x}{2} = \\frac{7}{x} - \\frac{5}{2}$, with $x \\ne 0$.",
          ),
          step(
            "approach",
            "Multiplicar por $2x$ para eliminar denominadores, resolver la cuadrática resultante y comprobar las raíces contra el polo $x = 0$.",
            "Multiply by $2x$ to clear denominators, solve the resulting quadratic, and check the roots against the pole $x = 0$.",
          ),
          step(
            "calculation",
            "$2x \\cdot \\frac{x}{2} = 2x \\cdot \\frac{7}{x} - 2x \\cdot \\frac{5}{2} \\Rightarrow x^2 = 14 - 5x$.<br>$x^2 + 5x - 14 = (x + 7)(x - 2) = 0 \\Rightarrow x = 2$ ó $x = -7$.",
            "$2x \\cdot \\frac{x}{2} = 2x \\cdot \\frac{7}{x} - 2x \\cdot \\frac{5}{2} \\Rightarrow x^2 = 14 - 5x$.<br>$x^2 + 5x - 14 = (x + 7)(x - 2) = 0 \\Rightarrow x = 2$ or $x = -7$.",
          ),
          step(
            "result",
            "$x = 2,\\ -7$; ninguna es el polo $x = 0$ ✓. Verificación: $x = 2$: $1 = \\frac{7}{2} - \\frac{5}{2} = 1$ ✓; $x = -7$: $-\\frac{7}{2} = \\frac{7}{-7} - \\frac{5}{2} = -1 - \\frac{5}{2} = -\\frac{7}{2}$ ✓.",
            "$x = 2,\\ -7$; neither is the pole $x = 0$ ✓. Check: $x = 2$: $1 = \\frac{7}{2} - \\frac{5}{2} = 1$ ✓; $x = -7$: $-\\frac{7}{2} = \\frac{7}{-7} - \\frac{5}{2} = -1 - \\frac{5}{2} = -\\frac{7}{2}$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S4 · 57 — 3/(x−4) + (x−3)/x = 2 → x²−4x−12 = 0 → x = 6, −2. */
  template(
    {
      id: "quad-uees-57",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "quadratic-formula",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["rational-equation", "clearing-fractions", "pole-check"],
      prerequisites: ["polynomials"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "4 · 57",
        page: 3,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$x = 6,\\ -2$`, `$x = 6,\\ -2$`), correct: true },
        { id: "b", text: L(`$x = 6$`, `$x = 6$`), correct: false },
        { id: "c", text: L(`$x = -6,\\ 2$`, `$x = -6,\\ 2$`), correct: false },
        { id: "d", text: L(`$x = 12,\\ -4$`, `$x = 12,\\ -4$`), correct: false },
      ];
      return {
        skill: L(
          "Dos denominadores, dos polos: reducir a cuadrática y filtrar",
          "Two denominators, two poles: reduce to a quadratic and filter",
        ),
        statement: L(
          "Resuelva la ecuación por cualquier método:\n\n$$\\frac{3}{x - 4} + \\frac{x - 3}{x} = 2$$",
          "Solve the equation by any method:\n\n$$\\frac{3}{x - 4} + \\frac{x - 3}{x} = 2$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El denominador común es $x(x - 4)$; multiplica ambos lados y vigila los polos $x = 0$ y $x = 4$.",
            "The common denominator is $x(x - 4)$; multiply both sides and watch the poles $x = 0$ and $x = 4$.",
          ),
          L(
            "Tras multiplicar: $3x + (x - 3)(x - 4) = 2x(x - 4)$; expande ambos lados y agrupa todo a la izquierda.",
            "After multiplying: $3x + (x - 3)(x - 4) = 2x(x - 4)$; expand both sides and gather everything on the left.",
          ),
          L(
            "Todo se reduce a $x^2 - 4x - 12 = 0$: dos enteros con producto $-12$ y suma $-4$; comprueba las raíces contra los polos.",
            "Everything reduces to $x^2 - 4x - 12 = 0$: two integers with product $-12$ and sum $-4$; check the roots against the poles.",
          ),
        ],
        answerDisplay: L(
          "$x = 6,\\ -2$",
          "$x = 6,\\ -2$",
        ),
        solution: [
          step(
            "given",
            "La ecuación $\\frac{3}{x - 4} + \\frac{x - 3}{x} = 2$, con $x \\ne 0$ y $x \\ne 4$.",
            "The equation $\\frac{3}{x - 4} + \\frac{x - 3}{x} = 2$, with $x \\ne 0$ and $x \\ne 4$.",
          ),
          step(
            "approach",
            "Multiplicar por $x(x - 4)$, expande y reducir a una cuadrática; las raíces candidatas se aceptan sólo si no coinciden con los polos $0$ y $4$.",
            "Multiply by $x(x - 4)$, expand, and reduce to a quadratic; candidate roots are accepted only if they do not coincide with the poles $0$ and $4$.",
          ),
          step(
            "calculation",
            "$3x + (x - 3)(x - 4) = 2x(x - 4)$<br>$3x + x^2 - 7x + 12 = 2x^2 - 8x$<br>$0 = 2x^2 - 8x - x^2 + 4x - 12 = x^2 - 4x - 12 = (x - 6)(x + 2)$<br>$\\Rightarrow x = 6$ ó $x = -2$.",
            "$3x + (x - 3)(x - 4) = 2x(x - 4)$<br>$3x + x^2 - 7x + 12 = 2x^2 - 8x$<br>$0 = 2x^2 - 8x - x^2 + 4x - 12 = x^2 - 4x - 12 = (x - 6)(x + 2)$<br>$\\Rightarrow x = 6$ or $x = -2$.",
          ),
          step(
            "result",
            "$x = 6,\\ -2$; ambas distintas de los polos $0$ y $4$ ✓. Verificación: $x = 6$: $\\frac{3}{2} + \\frac{3}{6} = \\frac{3}{2} + \\frac{1}{2} = 2$ ✓; $x = -2$: $\\frac{3}{-6} + \\frac{-5}{-2} = -\\frac{1}{2} + \\frac{5}{2} = 2$ ✓.",
            "$x = 6,\\ -2$; both different from the poles $0$ and $4$ ✓. Check: $x = 6$: $\\frac{3}{2} + \\frac{3}{6} = \\frac{3}{2} + \\frac{1}{2} = 2$ ✓; $x = -2$: $\\frac{3}{-6} + \\frac{-5}{-2} = -\\frac{1}{2} + \\frac{5}{2} = 2$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S4 · 58 — 1/(3x+1) + 2/(x+1) = 3 → x(9x+5) = 0 → x = 0, −5/9. */
  template(
    {
      id: "quad-uees-58",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "quadratic-formula",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["rational-equation", "clearing-fractions", "pole-check"],
      prerequisites: ["polynomials"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "4 · 58",
        page: 3,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$x = 0,\\ -\\frac{5}{9}$`, `$x = 0,\\ -\\frac{5}{9}$`), correct: true },
        { id: "b", text: L(`$x = 0$`, `$x = 0$`), correct: false },
        { id: "c", text: L(`$x = \\frac{5}{9}$`, `$x = \\frac{5}{9}$`), correct: false },
        { id: "d", text: L(`$x = -\\frac{1}{3},\\ -1$`, `$x = -\\frac{1}{3},\\ -1$`), correct: false },
      ];
      return {
        skill: L(
          "Denominadores lineales distintos: producto cruzado ordenado",
          "Different linear denominators: an orderly cross-product",
        ),
        statement: L(
          "Resuelva la ecuación por cualquier método:\n\n$$\\frac{1}{3x + 1} + \\frac{2}{x + 1} = 3$$",
          "Solve the equation by any method:\n\n$$\\frac{1}{3x + 1} + \\frac{2}{x + 1} = 3$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Multiplica por $(3x + 1)(x + 1)$; los valores prohibidos son $x = -\\frac{1}{3}$ y $x = -1$.",
            "Multiply by $(3x + 1)(x + 1)$; the forbidden values are $x = -\\frac{1}{3}$ and $x = -1$.",
          ),
          L(
            "Queda $(x + 1) + 2(3x + 1) = 3(3x + 1)(x + 1)$; expande los dos lados con cuidado.",
            "You get $(x + 1) + 2(3x + 1) = 3(3x + 1)(x + 1)$; expand both sides carefully.",
          ),
          L(
            "La ecuación se reduce a $x(9x + 5) = 0$: una raíz es $x = 0$ y la otra es negativa (fracción con $9$ abajo).",
            "The equation reduces to $x(9x + 5) = 0$: one root is $x = 0$ and the other is negative (a fraction with $9$ below).",
          ),
        ],
        answerDisplay: L(
          "$x = 0,\\ -\\frac{5}{9}$",
          "$x = 0,\\ -\\frac{5}{9}$",
        ),
        solution: [
          step(
            "given",
            "La ecuación $\\frac{1}{3x + 1} + \\frac{2}{x + 1} = 3$, con $x \\ne -\\frac{1}{3}$ y $x \\ne -1$.",
            "The equation $\\frac{1}{3x + 1} + \\frac{2}{x + 1} = 3$, with $x \\ne -\\frac{1}{3}$ and $x \\ne -1$.",
          ),
          step(
            "approach",
            "Multiplicar por el denominador común $(3x + 1)(x + 1)$, reducir a cuadrática y filtrar las raíces contra los polos. Los polos NUNCA son solución: anulan un denominador.",
            "Multiply by the common denominator $(3x + 1)(x + 1)$, reduce to a quadratic, and filter the roots against the poles. Poles are NEVER solutions: they zero out a denominator.",
          ),
          step(
            "calculation",
            "$(x + 1) + 2(3x + 1) = 3(3x + 1)(x + 1)$<br>$7x + 3 = 3(3x^2 + 4x + 1) = 9x^2 + 12x + 3$<br>$0 = 9x^2 + 5x = x(9x + 5) \\Rightarrow x = 0$ ó $x = -\\frac{5}{9}$.",
            "$(x + 1) + 2(3x + 1) = 3(3x + 1)(x + 1)$<br>$7x + 3 = 3(3x^2 + 4x + 1) = 9x^2 + 12x + 3$<br>$0 = 9x^2 + 5x = x(9x + 5) \\Rightarrow x = 0$ or $x = -\\frac{5}{9}$.",
          ),
          step(
            "result",
            "$x = 0,\\ -\\frac{5}{9}$; ambas distintas de los polos $-\\frac{1}{3}$ y $-1$ ✓. Verificación: $x = 0$: $1 + 2 = 3$ ✓; $x = -\\frac{5}{9}$: $\\frac{1}{-2/3} + \\frac{2}{4/9} = -\\frac{3}{2} + \\frac{9}{2} = 3$ ✓.",
            "$x = 0,\\ -\\frac{5}{9}$; both different from the poles $-\\frac{1}{3}$ and $-1$ ✓. Check: $x = 0$: $1 + 2 = 3$ ✓; $x = -\\frac{5}{9}$: $\\frac{1}{-2/3} + \\frac{2}{4/9} = -\\frac{3}{2} + \\frac{9}{2} = 3$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S4 · 59 — (3x+2)/(x+1) − (2x+1)/(2x) = 1 → 2x²−x−1 = 0 → x = 1, −1/2. */
  template(
    {
      id: "quad-uees-59",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "quadratic-formula",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["rational-equation", "clearing-fractions", "pole-check"],
      prerequisites: ["polynomials"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "4 · 59",
        page: 3,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$x = 1,\\ -\\frac{1}{2}$`, `$x = 1,\\ -\\frac{1}{2}$`), correct: true },
        { id: "b", text: L(`$x = 1$`, `$x = 1$`), correct: false },
        { id: "c", text: L(`$x = -1,\\ 0$`, `$x = -1,\\ 0$`), correct: false },
        { id: "d", text: L(`$x = -\\frac{1}{2}$`, `$x = -\\frac{1}{2}$`), correct: false },
      ];
      return {
        skill: L(
          "Fracciones de binomios: denominador común 2x(x + 1)",
          "Binomial fractions: common denominator 2x(x + 1)",
        ),
        statement: L(
          "Resuelva la ecuación por cualquier método:\n\n$$\\frac{3x + 2}{x + 1} - \\frac{2x + 1}{2x} = 1$$",
          "Solve the equation by any method:\n\n$$\\frac{3x + 2}{x + 1} - \\frac{2x + 1}{2x} = 1$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El denominador común es $2x(x + 1)$; los polos son $x = 0$ y $x = -1$.",
            "The common denominator is $2x(x + 1)$; the poles are $x = 0$ and $x = -1$.",
          ),
          L(
            "Tras multiplicar: $2x(3x + 2) - (x + 1)(2x + 1) = 2x(x + 1)$; expande con cuidado el signo menos.",
            "After multiplying: $2x(3x + 2) - (x + 1)(2x + 1) = 2x(x + 1)$; expand the minus sign carefully.",
          ),
          L(
            "Se reduce a $2x^2 - x - 1 = 0$: factoriza con coeficientes $2$ y $1$ (producto $-1$, suma $-1$).",
            "It reduces to $2x^2 - x - 1 = 0$: factor with coefficients $2$ and $1$ (product $-1$, sum $-1$).",
          ),
        ],
        answerDisplay: L(
          "$x = 1,\\ -\\frac{1}{2}$",
          "$x = 1,\\ -\\frac{1}{2}$",
        ),
        solution: [
          step(
            "given",
            "La ecuación $\\frac{3x + 2}{x + 1} - \\frac{2x + 1}{2x} = 1$, con $x \\ne 0$ y $x \\ne -1$.",
            "The equation $\\frac{3x + 2}{x + 1} - \\frac{2x + 1}{2x} = 1$, with $x \\ne 0$ and $x \\ne -1$.",
          ),
          step(
            "approach",
            "Multiplicar por $2x(x + 1)$ respetando el signo menos del segundo término; reducir a cuadrática y comprobar contra los polos $0$ y $-1$ (que aparecen como distractor en las opciones).",
            "Multiply by $2x(x + 1)$ respecting the minus sign of the second term; reduce to a quadratic and check against the poles $0$ and $-1$ (which appear as a distractor among the options).",
          ),
          step(
            "calculation",
            "$2x(3x + 2) - (x + 1)(2x + 1) = 2x(x + 1)$<br>$(6x^2 + 4x) - (2x^2 + 3x + 1) = 2x^2 + 2x$<br>$4x^2 + x - 1 = 2x^2 + 2x \\Rightarrow 2x^2 - x - 1 = 0$<br>$(2x + 1)(x - 1) = 0 \\Rightarrow x = 1$ ó $x = -\\frac{1}{2}$.",
            "$2x(3x + 2) - (x + 1)(2x + 1) = 2x(x + 1)$<br>$(6x^2 + 4x) - (2x^2 + 3x + 1) = 2x^2 + 2x$<br>$4x^2 + x - 1 = 2x^2 + 2x \\Rightarrow 2x^2 - x - 1 = 0$<br>$(2x + 1)(x - 1) = 0 \\Rightarrow x = 1$ or $x = -\\frac{1}{2}$.",
          ),
          step(
            "result",
            "$x = 1,\\ -\\frac{1}{2}$; ambas distintas de los polos $0$ y $-1$ ✓. Verificación: $x = 1$: $\\frac{5}{2} - \\frac{3}{2} = 1$ ✓; $x = -\\frac{1}{2}$: $\\frac{1/2}{1/2} - \\frac{0}{-1} = 1 - 0 = 1$ ✓.",
            "$x = 1,\\ -\\frac{1}{2}$; both different from the poles $0$ and $-1$ ✓. Check: $x = 1$: $\\frac{5}{2} - \\frac{3}{2} = 1$ ✓; $x = -\\frac{1}{2}$: $\\frac{1/2}{1/2} - \\frac{0}{-1} = 1 - 0 = 1$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S4 · 60 — 6(w+1)/(2−w) + w/(w−1) = 3 → w(8w−7) = 0 → w = 0, 7/8. */
  template(
    {
      id: "quad-uees-60",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "quadratic-formula",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["rational-equation", "clearing-fractions", "pole-check"],
      prerequisites: ["polynomials"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "4 · 60",
        page: 3,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$w = 0,\\ \\frac{7}{8}$`, `$w = 0,\\ \\frac{7}{8}$`), correct: true },
        { id: "b", text: L(`$w = 0$`, `$w = 0$`), correct: false },
        { id: "c", text: L(`$w = \\frac{7}{8}$`, `$w = \\frac{7}{8}$`), correct: false },
        { id: "d", text: L(`$w = 2,\\ 1$`, `$w = 2,\\ 1$`), correct: false },
      ];
      return {
        skill: L(
          "Denominador (2 − w): el signo importa al expandir",
          "A (2 − w) denominator: the sign matters when expanding",
        ),
        statement: L(
          "Resuelva la ecuación por cualquier método:\n\n$$\\frac{6(w + 1)}{2 - w} + \\frac{w}{w - 1} = 3$$",
          "Solve the equation by any method:\n\n$$\\frac{6(w + 1)}{2 - w} + \\frac{w}{w - 1} = 3$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Multiplica por $(2 - w)(w - 1)$; los polos son $w = 2$ y $w = 1$.",
            "Multiply by $(2 - w)(w - 1)$; the poles are $w = 2$ and $w = 1$.",
          ),
          L(
            "Queda $6(w + 1)(w - 1) + w(2 - w) = 3(2 - w)(w - 1)$; expande los tres productos con cuidado en los signos.",
            "You get $6(w + 1)(w - 1) + w(2 - w) = 3(2 - w)(w - 1)$; expand the three products carefully with the signs.",
          ),
          L(
            "Todo se reduce a $w(8w - 7) = 0$: una raíz es $w = 0$ y la otra es una fracción propia (menor que $1$).",
            "Everything reduces to $w(8w - 7) = 0$: one root is $w = 0$ and the other is a proper fraction (less than $1$).",
          ),
        ],
        answerDisplay: L(
          "$w = 0,\\ \\frac{7}{8}$",
          "$w = 0,\\ \\frac{7}{8}$",
        ),
        solution: [
          step(
            "given",
            "La ecuación $\\frac{6(w + 1)}{2 - w} + \\frac{w}{w - 1} = 3$, con $w \\ne 2$ y $w \\ne 1$.",
            "The equation $\\frac{6(w + 1)}{2 - w} + \\frac{w}{w - 1} = 3$, with $w \\ne 2$ and $w \\ne 1$.",
          ),
          step(
            "approach",
            "Multiplicar por $(2 - w)(w - 1)$; usar la diferencia de cuadrados $(w + 1)(w - 1) = w^2 - 1$ y expandir con cuidado; filtrar raíces contra los polos.",
            "Multiply by $(2 - w)(w - 1)$; use the difference of squares $(w + 1)(w - 1) = w^2 - 1$ and expand carefully; filter roots against the poles.",
          ),
          step(
            "calculation",
            "$6(w^2 - 1) + 2w - w^2 = 3(-w^2 + 3w - 2)$<br>$5w^2 + 2w - 6 = -3w^2 + 9w - 6 \\Rightarrow 8w^2 - 7w = 0$<br>$w(8w - 7) = 0 \\Rightarrow w = 0$ ó $w = \\frac{7}{8}$.",
            "$6(w^2 - 1) + 2w - w^2 = 3(-w^2 + 3w - 2)$<br>$5w^2 + 2w - 6 = -3w^2 + 9w - 6 \\Rightarrow 8w^2 - 7w = 0$<br>$w(8w - 7) = 0 \\Rightarrow w = 0$ or $w = \\frac{7}{8}$.",
          ),
          step(
            "result",
            "$w = 0,\\ \\frac{7}{8}$; ambas distintas de los polos $1$ y $2$ ✓. Verificación: $w = 0$: $\\frac{6}{2} + 0 = 3$ ✓; $w = \\frac{7}{8}$: $\\frac{6 \\cdot 15/8}{9/8} + \\frac{7/8}{-1/8} = 10 - 7 = 3$ ✓.",
            "$w = 0,\\ \\frac{7}{8}$; both different from the poles $1$ and $2$ ✓. Check: $w = 0$: $\\frac{6}{2} + 0 = 3$ ✓; $w = \\frac{7}{8}$: $\\frac{6 \\cdot 15/8}{9/8} + \\frac{7/8}{-1/8} = 10 - 7 = 3$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S4 · 61 — 2/(r−2) − (r+1)/(r+4) = 0 → r²−3r−10 = 0 → r = 5, −2. */
  template(
    {
      id: "quad-uees-61",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "quadratic-formula",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["rational-equation", "clearing-fractions", "pole-check"],
      prerequisites: ["polynomials"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "4 · 61",
        page: 3,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$r = 5,\\ -2$`, `$r = 5,\\ -2$`), correct: true },
        { id: "b", text: L(`$r = 5$`, `$r = 5$`), correct: false },
        { id: "c", text: L(`$r = -5,\\ 2$`, `$r = -5,\\ 2$`), correct: false },
        { id: "d", text: L(`$r = 2,\\ -4$`, `$r = 2,\\ -4$`), correct: false },
      ];
      return {
        skill: L(
          "Igualada a cero: numerador combinado sobre denominador común",
          "Set equal to zero: combined numerator over a common denominator",
        ),
        statement: L(
          "Resuelva la ecuación por cualquier método:\n\n$$\\frac{2}{r - 2} - \\frac{r + 1}{r + 4} = 0$$",
          "Solve the equation by any method:\n\n$$\\frac{2}{r - 2} - \\frac{r + 1}{r + 4} = 0$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Multiplica por $(r - 2)(r + 4)$; los polos son $r = 2$ y $r = -4$.",
            "Multiply by $(r - 2)(r + 4)$; the poles are $r = 2$ and $r = -4$.",
          ),
          L(
            "Queda $2(r + 4) - (r + 1)(r - 2) = 0$; expande y ordena como cuadrática.",
            "You get $2(r + 4) - (r + 1)(r - 2) = 0$; expand and arrange as a quadratic.",
          ),
          L(
            "Se reduce a $r^2 - 3r - 10 = 0$: dos enteros con producto $-10$ y suma $-3$.",
            "It reduces to $r^2 - 3r - 10 = 0$: two integers with product $-10$ and sum $-3$.",
          ),
        ],
        answerDisplay: L(
          "$r = 5,\\ -2$",
          "$r = 5,\\ -2$",
        ),
        solution: [
          step(
            "given",
            "La ecuación $\\frac{2}{r - 2} - \\frac{r + 1}{r + 4} = 0$, con $r \\ne 2$ y $r \\ne -4$.",
            "The equation $\\frac{2}{r - 2} - \\frac{r + 1}{r + 4} = 0$, with $r \\ne 2$ and $r \\ne -4$.",
          ),
          step(
            "approach",
            "Al estar igualada a cero, basta combinar los numeradores sobre el denominador común $(r - 2)(r + 4)$ y resolver la cuadrática; los polos $2$ y $-4$ nunca cuentan como solución.",
            "Since it is set equal to zero, it is enough to combine the numerators over the common denominator $(r - 2)(r + 4)$ and solve the quadratic; the poles $2$ and $-4$ never count as solutions.",
          ),
          step(
            "calculation",
            "$2(r + 4) - (r + 1)(r - 2) = 0$<br>$2r + 8 - (r^2 - r - 2) = 0 \\Rightarrow -r^2 + 3r + 10 = 0$<br>$r^2 - 3r - 10 = (r - 5)(r + 2) = 0 \\Rightarrow r = 5$ ó $r = -2$.",
            "$2(r + 4) - (r + 1)(r - 2) = 0$<br>$2r + 8 - (r^2 - r - 2) = 0 \\Rightarrow -r^2 + 3r + 10 = 0$<br>$r^2 - 3r - 10 = (r - 5)(r + 2) = 0 \\Rightarrow r = 5$ or $r = -2$.",
          ),
          step(
            "result",
            "$r = 5,\\ -2$; ambas distintas de los polos $2$ y $-4$ ✓. Verificación: $r = 5$: $\\frac{2}{3} - \\frac{6}{9} = \\frac{2}{3} - \\frac{2}{3} = 0$ ✓; $r = -2$: $\\frac{2}{-4} - \\frac{-1}{2} = -\\frac{1}{2} + \\frac{1}{2} = 0$ ✓.",
            "$r = 5,\\ -2$; both different from the poles $2$ and $-4$ ✓. Check: $r = 5$: $\\frac{2}{3} - \\frac{6}{9} = \\frac{2}{3} - \\frac{2}{3} = 0$ ✓; $r = -2$: $\\frac{2}{-4} - \\frac{-1}{2} = -\\frac{1}{2} + \\frac{1}{2} = 0$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S4 · 62 — (2x−3)/(2x+5) + 2x/(3x+1) = 1 → 2x²−7x−4 = 0 → x = 4, −1/2. */
  template(
    {
      id: "quad-uees-62",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "quadratic-formula",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["rational-equation", "clearing-fractions", "pole-check"],
      prerequisites: ["polynomials"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "4 · 62",
        page: 3,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$x = 4,\\ -\\frac{1}{2}$`, `$x = 4,\\ -\\frac{1}{2}$`), correct: true },
        { id: "b", text: L(`$x = 4$`, `$x = 4$`), correct: false },
        { id: "c", text: L(`$x = -\\frac{1}{2}$`, `$x = -\\frac{1}{2}$`), correct: false },
        { id: "d", text: L(`$x = -\\frac{5}{2},\\ -\\frac{1}{3}$`, `$x = -\\frac{5}{2},\\ -\\frac{1}{3}$`), correct: false },
      ];
      return {
        skill: L(
          "Iguale a 1, limpie fracciones y no olvide la segunda raíz",
          "Set equal to 1, clear fractions, and do not forget the second root",
        ),
        statement: L(
          "Resuelva la ecuación por cualquier método:\n\n$$\\frac{2x - 3}{2x + 5} + \\frac{2x}{3x + 1} = 1$$",
          "Solve the equation by any method:\n\n$$\\frac{2x - 3}{2x + 5} + \\frac{2x}{3x + 1} = 1$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Multiplica por $(2x + 5)(3x + 1)$; los polos son $x = -\\frac{5}{2}$ y $x = -\\frac{1}{3}$.",
            "Multiply by $(2x + 5)(3x + 1)$; the poles are $x = -\\frac{5}{2}$ and $x = -\\frac{1}{3}$.",
          ),
          L(
            "Queda $(2x - 3)(3x + 1) + 2x(2x + 5) = (2x + 5)(3x + 1)$; expande los TRES productos.",
            "You get $(2x - 3)(3x + 1) + 2x(2x + 5) = (2x + 5)(3x + 1)$; expand all THREE products.",
          ),
          L(
            "Se reduce a $2x^2 - 7x - 4 = 0$ con $\\Delta = 49 + 32 = 81$ (un cuadrado perfecto: raíces racionales).",
            "It reduces to $2x^2 - 7x - 4 = 0$ with $\\Delta = 49 + 32 = 81$ (a perfect square: rational roots).",
          ),
        ],
        answerDisplay: L(
          "$x = 4,\\ -\\frac{1}{2}$",
          "$x = 4,\\ -\\frac{1}{2}$",
        ),
        solution: [
          step(
            "given",
            "La ecuación $\\frac{2x - 3}{2x + 5} + \\frac{2x}{3x + 1} = 1$, con $x \\ne -\\frac{5}{2}$ y $x \\ne -\\frac{1}{3}$.",
            "The equation $\\frac{2x - 3}{2x + 5} + \\frac{2x}{3x + 1} = 1$, with $x \\ne -\\frac{5}{2}$ and $x \\ne -\\frac{1}{3}$.",
          ),
          step(
            "approach",
            "Multiplicar por el denominador común y pasar todo a la izquierda; la cuadrática resultante se factoriza; comprobar las dos raíces contra los polos.",
            "Multiply by the common denominator and move everything to the left; the resulting quadratic factors; check both roots against the poles.",
          ),
          step(
            "calculation",
            "$(2x - 3)(3x + 1) + 2x(2x + 5) = (2x + 5)(3x + 1)$<br>$(6x^2 - 7x - 3) + (4x^2 + 10x) = 6x^2 + 17x + 5$<br>$4x^2 - 14x - 8 = 0 \\Rightarrow 2x^2 - 7x - 4 = 0$<br>$(2x + 1)(x - 4) = 0 \\Rightarrow x = 4$ ó $x = -\\frac{1}{2}$.",
            "$(2x - 3)(3x + 1) + 2x(2x + 5) = (2x + 5)(3x + 1)$<br>$(6x^2 - 7x - 3) + (4x^2 + 10x) = 6x^2 + 17x + 5$<br>$4x^2 - 14x - 8 = 0 \\Rightarrow 2x^2 - 7x - 4 = 0$<br>$(2x + 1)(x - 4) = 0 \\Rightarrow x = 4$ or $x = -\\frac{1}{2}$.",
          ),
          step(
            "result",
            "$x = 4,\\ -\\frac{1}{2}$; ambas distintas de los polos $-\\frac{5}{2}$ y $-\\frac{1}{3}$ ✓. Verificación: $x = 4$: $\\frac{5}{13} + \\frac{8}{13} = 1$ ✓; $x = -\\frac{1}{2}$: $\\frac{-4}{4} + \\frac{-1}{-1/2} = -1 + 2 = 1$ ✓.",
            "$x = 4,\\ -\\frac{1}{2}$; both different from the poles $-\\frac{5}{2}$ and $-\\frac{1}{3}$ ✓. Check: $x = 4$: $\\frac{5}{13} + \\frac{8}{13} = 1$ ✓; $x = -\\frac{1}{2}$: $\\frac{-4}{4} + \\frac{-1}{-1/2} = -1 + 2 = 1$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S4 · 63 — (t−1)/(t−2) + (t−3)/(t−4) = (t−5)/(t²−6t+8) → 2t²−11t+15 = 0 → t = 3, 5/2. */
  template(
    {
      id: "quad-uees-63",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "quadratic-formula",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["rational-equation", "factored-denominator", "pole-check"],
      prerequisites: ["polynomials"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "4 · 63",
        page: 3,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$t = 3,\\ \\frac{5}{2}$`, `$t = 3,\\ \\frac{5}{2}$`), correct: true },
        { id: "b", text: L(`$t = 3$`, `$t = 3$`), correct: false },
        { id: "c", text: L(`$t = \\frac{5}{2}$`, `$t = \\frac{5}{2}$`), correct: false },
        { id: "d", text: L(`$t = 2,\\ 4$`, `$t = 2,\\ 4$`), correct: false },
      ];
      return {
        skill: L(
          "El denominador grande se factoriza: t² − 6t + 8 = (t−2)(t−4)",
          "The big denominator factors: t² − 6t + 8 = (t−2)(t−4)",
        ),
        statement: L(
          "Resuelva la ecuación por cualquier método:\n\n$$\\frac{t - 1}{t - 2} + \\frac{t - 3}{t - 4} = \\frac{t - 5}{t^2 - 6t + 8}$$",
          "Solve the equation by any method:\n\n$$\\frac{t - 1}{t - 2} + \\frac{t - 3}{t - 4} = \\frac{t - 5}{t^2 - 6t + 8}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Factoriza primero el denominador de la derecha: $t^2 - 6t + 8 = (t - 2)(t - 4)$. Los polos son $t = 2$ y $t = 4$.",
            "Factor the right-hand denominator first: $t^2 - 6t + 8 = (t - 2)(t - 4)$. The poles are $t = 2$ and $t = 4$.",
          ),
          L(
            "Multiplica todo por $(t - 2)(t - 4)$: $(t - 1)(t - 4) + (t - 3)(t - 2) = t - 5$.",
            "Multiply everything by $(t - 2)(t - 4)$: $(t - 1)(t - 4) + (t - 3)(t - 2) = t - 5$.",
          ),
          L(
            "Se reduce a $2t^2 - 11t + 15 = 0$ con $\\Delta = 121 - 120 = 1$: las dos raíces están entre $2$ y $4$.",
            "It reduces to $2t^2 - 11t + 15 = 0$ with $\\Delta = 121 - 120 = 1$: both roots lie between $2$ and $4$.",
          ),
        ],
        answerDisplay: L(
          "$t = 3,\\ \\frac{5}{2}$",
          "$t = 3,\\ \\frac{5}{2}$",
        ),
        solution: [
          step(
            "given",
            "La ecuación $\\frac{t - 1}{t - 2} + \\frac{t - 3}{t - 4} = \\frac{t - 5}{t^2 - 6t + 8}$, con $t \\ne 2$ y $t \\ne 4$.",
            "The equation $\\frac{t - 1}{t - 2} + \\frac{t - 3}{t - 4} = \\frac{t - 5}{t^2 - 6t + 8}$, with $t \\ne 2$ and $t \\ne 4$.",
          ),
          step(
            "approach",
            "Factorizar $t^2 - 6t + 8 = (t - 2)(t - 4)$ para descubrir el denominador común, multiplicar por él y reducir a cuadrática; filtrar raíces contra los polos $2$ y $4$.",
            "Factor $t^2 - 6t + 8 = (t - 2)(t - 4)$ to expose the common denominator, multiply by it, and reduce to a quadratic; filter roots against the poles $2$ and $4$.",
          ),
          step(
            "calculation",
            "$(t - 1)(t - 4) + (t - 3)(t - 2) = t - 5$<br>$(t^2 - 5t + 4) + (t^2 - 5t + 6) = t - 5$<br>$2t^2 - 10t + 10 = t - 5 \\Rightarrow 2t^2 - 11t + 15 = 0$<br>$(2t - 5)(t - 3) = 0 \\Rightarrow t = 3$ ó $t = \\frac{5}{2}$.",
            "$(t - 1)(t - 4) + (t - 3)(t - 2) = t - 5$<br>$(t^2 - 5t + 4) + (t^2 - 5t + 6) = t - 5$<br>$2t^2 - 10t + 10 = t - 5 \\Rightarrow 2t^2 - 11t + 15 = 0$<br>$(2t - 5)(t - 3) = 0 \\Rightarrow t = 3$ or $t = \\frac{5}{2}$.",
          ),
          step(
            "result",
            "$t = 3,\\ \\frac{5}{2}$; ambas distintas de los polos $2$ y $4$ ✓. Verificación: $t = 3$: $\\frac{2}{1} + \\frac{0}{-1} = 2$ y $\\frac{-2}{9 - 18 + 8} = \\frac{-2}{-1} = 2$ ✓; $t = \\frac{5}{2}$: $\\frac{3/2}{1/2} + \\frac{-1/2}{-3/2} = 3 + \\frac{1}{3} = \\frac{10}{3}$ y $\\frac{-5/2}{25/4 - 15 + 8} = \\frac{-5/2}{-3/4} = \\frac{10}{3}$ ✓.",
            "$t = 3,\\ \\frac{5}{2}$; both different from the poles $2$ and $4$ ✓. Check: $t = 3$: $\\frac{2}{1} + \\frac{0}{-1} = 2$ and $\\frac{-2}{9 - 18 + 8} = \\frac{-2}{-1} = 2$ ✓; $t = \\frac{5}{2}$: $\\frac{3/2}{1/2} + \\frac{-1/2}{-3/2} = 3 + \\frac{1}{3} = \\frac{10}{3}$ and $\\frac{-5/2}{25/4 - 15 + 8} = \\frac{-5/2}{-3/4} = \\frac{10}{3}$ ✓.",
          ),
        ],
      };
    },
  ),
  /* S17 · 9 — y = 3x²+5x+1: vértice (−5/6, −13/12), punto más bajo. */
  template(
    {
      id: "qvf-uees-9",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "vertex",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["vertex", "parabola", "minimum"],
      prerequisites: ["polynomials"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "17 · 9",
        page: 19,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\left(-\\frac{5}{6},\\ -\\frac{13}{12}\\right)$ — punto más bajo`, `$\\left(-\\frac{5}{6},\\ -\\frac{13}{12}\\right)$ — lowest point`), correct: true },
        { id: "b", text: L(`$\\left(\\frac{5}{6},\\ -\\frac{13}{12}\\right)$ — punto más bajo`, `$\\left(\\frac{5}{6},\\ -\\frac{13}{12}\\right)$ — lowest point`), correct: false },
        { id: "c", text: L(`$\\left(-\\frac{5}{6},\\ \\frac{13}{12}\\right)$ — punto más alto`, `$\\left(-\\frac{5}{6},\\ \\frac{13}{12}\\right)$ — highest point`), correct: false },
        { id: "d", text: L(`$(0,\\ 1)$ — punto más bajo`, `$(0,\\ 1)$ — lowest point`), correct: false },
      ];
      return {
        skill: L(
          "Vértice de una parábola y su carácter (¿mínimo o máximo?)",
          "A parabola's vertex and its character (minimum or maximum?)",
        ),
        statement: L(
          "(a) Para la parábola $$y = f(x) = 3x^2 + 5x + 1,$$ halle el vértice. (b) ¿El vértice corresponde al punto más bajo o al más alto de la gráfica?",
          "(a) For the parabola $$y = f(x) = 3x^2 + 5x + 1,$$ find the vertex. (b) Does the vertex correspond to the lowest or the highest point of the graph?",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El vértice está en $x_v = -\\frac{b}{2a}$ con $a = 3$ y $b = 5$; cuida el signo menos de la fórmula.",
            "The vertex sits at $x_v = -\\frac{b}{2a}$ with $a = 3$ and $b = 5$; mind the minus sign in the formula.",
          ),
          L(
            "Para la parte (b) manda el signo de $a$: si $a > 0$ la parábola abre hacia arriba y el vértice es el punto más bajo; si $a < 0$, abre hacia abajo.",
            "For part (b) the sign of $a$ rules: if $a > 0$ the parabola opens upward and the vertex is the lowest point; if $a < 0$, it opens downward.",
          ),
          L(
            "$x_v = -\\frac{5}{6}$; falta evaluar $f\\left(-\\frac{5}{6}\\right)$ para la coordenada $y$ del vértice.",
            "$x_v = -\\frac{5}{6}$; you still have to evaluate $f\\left(-\\frac{5}{6}\\right)$ for the $y$-coordinate of the vertex.",
          ),
        ],
        answerDisplay: L(
          "$\\left(-\\frac{5}{6},\\ -\\frac{13}{12}\\right)$ — punto más bajo",
          "$\\left(-\\frac{5}{6},\\ -\\frac{13}{12}\\right)$ — lowest point",
        ),
        solution: [
          step(
            "given",
            "La parábola $y = f(x) = 3x^2 + 5x + 1$ (tarea UEES, sección 17); se pide el vértice y su carácter.",
            "The parabola $y = f(x) = 3x^2 + 5x + 1$ (UEES assignment, section 17); the vertex and its character are requested.",
          ),
          step(
            "approach",
            "Fórmula del vértice $x_v = -\\frac{b}{2a}$ y luego $y_v = f(x_v)$; el signo de $a$ decide si el vértice es un mínimo o un máximo.",
            "Vertex formula $x_v = -\\frac{b}{2a}$ and then $y_v = f(x_v)$; the sign of $a$ decides whether the vertex is a minimum or a maximum.",
          ),
          step(
            "calculation",
            "$x_v = -\\frac{5}{2 \\cdot 3} = -\\frac{5}{6}$.<br>$y_v = 3\\left(-\\frac{5}{6}\\right)^2 + 5\\left(-\\frac{5}{6}\\right) + 1 = \\frac{25}{12} - \\frac{50}{12} + \\frac{12}{12} = -\\frac{13}{12}$.<br>Como $a = 3 > 0$, la parábola abre hacia arriba: el vértice es el punto más bajo.",
            "$x_v = -\\frac{5}{2 \\cdot 3} = -\\frac{5}{6}$.<br>$y_v = 3\\left(-\\frac{5}{6}\\right)^2 + 5\\left(-\\frac{5}{6}\\right) + 1 = \\frac{25}{12} - \\frac{50}{12} + \\frac{12}{12} = -\\frac{13}{12}$.<br>Since $a = 3 > 0$, the parabola opens upward: the vertex is the lowest point.",
          ),
          step(
            "result",
            "Vértice $\\left(-\\frac{5}{6},\\ -\\frac{13}{12}\\right)$, punto más bajo de la gráfica ($a = 3 > 0$). Verificación: $f\\left(-\\frac{5}{6}\\right) = -\\frac{13}{12}$ ✓ y, por ejemplo, $f(0) = 1 > -\\frac{13}{12}$ ✓ (el corte con el eje $y$ queda por encima del vértice).",
            "Vertex $\\left(-\\frac{5}{6},\\ -\\frac{13}{12}\\right)$, the lowest point of the graph ($a = 3 > 0$). Check: $f\\left(-\\frac{5}{6}\\right) = -\\frac{13}{12}$ ✓ and, for instance, $f(0) = 1 > -\\frac{13}{12}$ ✓ (the $y$-intercept lies above the vertex).",
          ),
        ],
      };
    },
  ),

  /* S17 · 10 — y = 8x²+4x−1: vértice (−1/4, −3/2), punto más bajo. */
  template(
    {
      id: "qvf-uees-10",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "vertex",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["vertex", "parabola", "minimum"],
      prerequisites: ["polynomials"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "17 · 10",
        page: 19,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\left(-\\frac{1}{4},\\ -\\frac{3}{2}\\right)$ — punto más bajo`, `$\\left(-\\frac{1}{4},\\ -\\frac{3}{2}\\right)$ — lowest point`), correct: true },
        { id: "b", text: L(`$\\left(\\frac{1}{4},\\ -\\frac{3}{2}\\right)$ — punto más bajo`, `$\\left(\\frac{1}{4},\\ -\\frac{3}{2}\\right)$ — lowest point`), correct: false },
        { id: "c", text: L(`$\\left(-\\frac{1}{4},\\ \\frac{3}{2}\\right)$ — punto más alto`, `$\\left(-\\frac{1}{4},\\ \\frac{3}{2}\\right)$ — highest point`), correct: false },
        { id: "d", text: L(`$(0,\\ -1)$ — punto más bajo`, `$(0,\\ -1)$ — lowest point`), correct: false },
      ];
      return {
        skill: L(
          "Repetir el vértice con otros coeficientes (y no confundirlo con el corte y)",
          "Repeat the vertex with new coefficients (and do not confuse it with the y-intercept)",
        ),
        statement: L(
          "Repita el problema 9 para $$y = f(x) = 8x^2 + 4x - 1:$$ halle el vértice y diga si corresponde al punto más bajo o al más alto de la gráfica.",
          "Repeat problem 9 for $$y = f(x) = 8x^2 + 4x - 1:$$ find the vertex and say whether it corresponds to the lowest or the highest point of the graph.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Aquí $a = 8$ y $b = 4$: aplica $x_v = -\\frac{b}{2a}$ (el resultado es negativo porque $b > 0$).",
            "Here $a = 8$ and $b = 4$: apply $x_v = -\\frac{b}{2a}$ (the result is negative because $b > 0$).",
          ),
          L(
            "El carácter lo da el signo de $a = 8 > 0$: la parábola abre hacia arriba.",
            "The character is given by the sign of $a = 8 > 0$: the parabola opens upward.",
          ),
          L(
            "$x_v = -\\frac{1}{4}$; evalúa $f\\left(-\\frac{1}{4}\\right)$ para completar el par (no es lo mismo que $f(0)$).",
            "$x_v = -\\frac{1}{4}$; evaluate $f\\left(-\\frac{1}{4}\\right)$ to complete the pair (it is not the same as $f(0)$).",
          ),
        ],
        answerDisplay: L(
          "$\\left(-\\frac{1}{4},\\ -\\frac{3}{2}\\right)$ — punto más bajo",
          "$\\left(-\\frac{1}{4},\\ -\\frac{3}{2}\\right)$ — lowest point",
        ),
        solution: [
          step(
            "given",
            "La parábola $y = f(x) = 8x^2 + 4x - 1$; se pide el vértice y su carácter (mismo formato que el problema 9).",
            "The parabola $y = f(x) = 8x^2 + 4x - 1$; the vertex and its character are requested (same format as problem 9).",
          ),
          step(
            "approach",
            "Fórmula del vértice y evaluación $y_v = f(x_v)$; el signo de $a$ clasifica el punto. El corte con el eje $y$ es $f(0) = -1$, que NO es el vértice.",
            "Vertex formula and evaluation $y_v = f(x_v)$; the sign of $a$ classifies the point. The $y$-intercept is $f(0) = -1$, which is NOT the vertex.",
          ),
          step(
            "calculation",
            "$x_v = -\\frac{4}{2 \\cdot 8} = -\\frac{1}{4}$.<br>$y_v = 8\\left(-\\frac{1}{4}\\right)^2 + 4\\left(-\\frac{1}{4}\\right) - 1 = \\frac{1}{2} - 1 - 1 = -\\frac{3}{2}$.<br>$a = 8 > 0$: abre hacia arriba, punto más bajo.",
            "$x_v = -\\frac{4}{2 \\cdot 8} = -\\frac{1}{4}$.<br>$y_v = 8\\left(-\\frac{1}{4}\\right)^2 + 4\\left(-\\frac{1}{4}\\right) - 1 = \\frac{1}{2} - 1 - 1 = -\\frac{3}{2}$.<br>$a = 8 > 0$: it opens upward, lowest point.",
          ),
          step(
            "result",
            "Vértice $\\left(-\\frac{1}{4},\\ -\\frac{3}{2}\\right)$, punto más bajo ($a = 8 > 0$). Verificación: $f\\left(-\\frac{1}{4}\\right) = \\frac{8}{16} - 1 - 1 = -\\frac{3}{2}$ ✓ y $f(0) = -1 > -\\frac{3}{2}$ ✓ (el corte $y$ queda por encima del vértice).",
            "Vertex $\\left(-\\frac{1}{4},\\ -\\frac{3}{2}\\right)$, the lowest point ($a = 8 > 0$). Check: $f\\left(-\\frac{1}{4}\\right) = \\frac{8}{16} - 1 - 1 = -\\frac{3}{2}$ ✓ and $f(0) = -1 > -\\frac{3}{2}$ ✓ (the $y$-intercept lies above the vertex).",
          ),
        ],
      };
    },
  ),

  /* S17 · 11 — y = x²+x−6: vértice (−1/2, −25/4); intersecciones en la solución. */
  template(
    {
      id: "qvf-uees-11",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "vertex",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["vertex", "intercepts", "parabola"],
      prerequisites: ["polynomials"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "17 · 11",
        page: 19,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\left(-\\frac{1}{2},\\ -\\frac{25}{4}\\right)$`, `$\\left(-\\frac{1}{2},\\ -\\frac{25}{4}\\right)$`), correct: true },
        { id: "b", text: L(`$(-1,\\ -6)$`, `$(-1,\\ -6)$`), correct: false },
        { id: "c", text: L(`$\\left(\\frac{1}{2},\\ -\\frac{25}{4}\\right)$`, `$\\left(\\frac{1}{2},\\ -\\frac{25}{4}\\right)$`), correct: false },
        { id: "d", text: L(`$\\left(-\\frac{1}{2},\\ \\frac{25}{4}\\right)$`, `$\\left(-\\frac{1}{2},\\ \\frac{25}{4}\\right)$`), correct: false },
      ];
      return {
        skill: L(
          "Vértice a medio camino entre las intersecciones x",
          "The vertex halfway between the x-intercepts",
        ),
        statement: L(
          "Para la parábola $$y = f(x) = x^2 + x - 6,$$ halle el vértice. (La hoja pide también las intersecciones con los ejes; se calculan en la solución.)",
          "For the parabola $$y = f(x) = x^2 + x - 6,$$ find the vertex. (The worksheet also asks for the axis intercepts; they are worked out in the solution.)",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Con $a = 1$, $b = 1$, $c = -6$: el vértice está en $x_v = -\\frac{b}{2a}$.",
            "With $a = 1$, $b = 1$, $c = -6$: the vertex lies at $x_v = -\\frac{b}{2a}$.",
          ),
          L(
            "Otra vía útil: $x^2 + x - 6 = (x + 3)(x - 2)$, con cortes $x = -3$ y $x = 2$; el vértice está en el punto medio de los cortes.",
            "Another useful route: $x^2 + x - 6 = (x + 3)(x - 2)$, with intercepts $x = -3$ and $x = 2$; the vertex lies halfway between them.",
          ),
          L(
            "$x_v = -\\frac{1}{2}$; falta $y_v = f\\left(-\\frac{1}{2}\\right)$ (un fracción con $4$ abajo).",
            "$x_v = -\\frac{1}{2}$; you still need $y_v = f\\left(-\\frac{1}{2}\\right)$ (a fraction with $4$ below).",
          ),
        ],
        answerDisplay: L(
          "$\\left(-\\frac{1}{2},\\ -\\frac{25}{4}\\right)$",
          "$\\left(-\\frac{1}{2},\\ -\\frac{25}{4}\\right)$",
        ),
        solution: [
          step(
            "given",
            "La parábola $y = f(x) = x^2 + x - 6$; el ejercicio original pide (a) la intersección $y$, (b) las intersecciones $x$ y (c) el vértice; aquí se responde el vértice y las intersecciones se desarrollan abajo.",
            "The parabola $y = f(x) = x^2 + x - 6$; the original exercise asks for (a) the $y$-intercept, (b) the $x$-intercepts and (c) the vertex; here the vertex is answered and the intercepts are worked out below.",
          ),
          step(
            "approach",
            "Vértice con $x_v = -\\frac{b}{2a}$ y $y_v = f(x_v)$; como la parábola factoriza, los cortes $x$ confirman el resultado (el vértice está en su punto medio).",
            "Vertex via $x_v = -\\frac{b}{2a}$ and $y_v = f(x_v)$; since the parabola factors, the $x$-intercepts confirm the result (the vertex lies at their midpoint).",
          ),
          step(
            "calculation",
            "$x_v = -\\frac{1}{2 \\cdot 1} = -\\frac{1}{2}$;<br>$y_v = \\frac{1}{4} - \\frac{1}{2} - 6 = -\\frac{25}{4}$.<br>Intersecciones (parte de la hoja): $f(0) = -6$ (corte $y$); $x^2 + x - 6 = (x + 3)(x - 2) = 0$ da los cortes $x = -3$ y $x = 2$.",
            "$x_v = -\\frac{1}{2 \\cdot 1} = -\\frac{1}{2}$;<br>$y_v = \\frac{1}{4} - \\frac{1}{2} - 6 = -\\frac{25}{4}$.<br>Intercepts (part of the worksheet): $f(0) = -6$ ($y$-intercept); $x^2 + x - 6 = (x + 3)(x - 2) = 0$ gives the $x$-intercepts $x = -3$ and $x = 2$.",
          ),
          step(
            "result",
            "Vértice $\\left(-\\frac{1}{2},\\ -\\frac{25}{4}\\right)$. Verificación: $f\\left(-\\frac{1}{2}\\right) = -\\frac{25}{4}$ ✓ y el punto medio de los cortes $x$ es $\\frac{-3 + 2}{2} = -\\frac{1}{2}$ ✓ (simetría de la parábola).",
            "Vertex $\\left(-\\frac{1}{2},\\ -\\frac{25}{4}\\right)$. Check: $f\\left(-\\frac{1}{2}\\right) = -\\frac{25}{4}$ ✓ and the midpoint of the $x$-intercepts is $\\frac{-3 + 2}{2} = -\\frac{1}{2}$ ✓ (parabola symmetry).",
          ),
        ],
      };
    },
  ),

  /* S17 · 12 — y = 5−x−3x²: vértice (−1/6, 61/12), máximo. */
  template(
    {
      id: "qvf-uees-12",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "vertex",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 180,
      tags: ["vertex", "intercepts", "parabola"],
      prerequisites: ["polynomials"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "17 · 12",
        page: 19,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\left(-\\frac{1}{6},\\ \\frac{61}{12}\\right)$`, `$\\left(-\\frac{1}{6},\\ \\frac{61}{12}\\right)$`), correct: true },
        { id: "b", text: L(`$\\left(\\frac{1}{6},\\ \\frac{61}{12}\\right)$`, `$\\left(\\frac{1}{6},\\ \\frac{61}{12}\\right)$`), correct: false },
        { id: "c", text: L(`$\\left(-\\frac{1}{6},\\ -\\frac{61}{12}\\right)$`, `$\\left(-\\frac{1}{6},\\ -\\frac{61}{12}\\right)$`), correct: false },
        { id: "d", text: L(`$(0,\\ 5)$`, `$(0,\\ 5)$`), correct: false },
      ];
      return {
        skill: L(
          "Coeficientes «al revés»: primero reordena y = −3x² − x + 5",
          "“Reversed” coefficients: first rearrange y = −3x² − x + 5",
        ),
        statement: L(
          "Repita el problema 11 para $$y = f(x) = 5 - x - 3x^2:$$ halle el vértice. (Las intersecciones con los ejes se calculan en la solución.)",
          "Repeat problem 11 for $$y = f(x) = 5 - x - 3x^2:$$ find the vertex. (The axis intercepts are worked out in the solution.)",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Reordena primero como $y = -3x^2 - x + 5$ para leer $a = -3$, $b = -1$, $c = 5$ sin errores de signo.",
            "First rearrange as $y = -3x^2 - x + 5$ to read $a = -3$, $b = -1$, $c = 5$ without sign errors.",
          ),
          L(
            "$a = -3 < 0$: la parábola abre hacia abajo y el vértice es un MÁXIMO (el punto más alto).",
            "$a = -3 < 0$: the parabola opens downward and the vertex is a MAXIMUM (the highest point).",
          ),
          L(
            "$x_v = -\\frac{-1}{2(-3)} = -\\frac{1}{6}$; falta $y_v = f\\left(-\\frac{1}{6}\\right)$.",
            "$x_v = -\\frac{-1}{2(-3)} = -\\frac{1}{6}$; you still need $y_v = f\\left(-\\frac{1}{6}\\right)$.",
          ),
        ],
        answerDisplay: L(
          "$\\left(-\\frac{1}{6},\\ \\frac{61}{12}\\right)$",
          "$\\left(-\\frac{1}{6},\\ \\frac{61}{12}\\right)$",
        ),
        solution: [
          step(
            "given",
            "La parábola $y = f(x) = 5 - x - 3x^2$; se pide el vértice (y la hoja pide también las intersecciones).",
            "The parabola $y = f(x) = 5 - x - 3x^2$; the vertex is requested (and the worksheet also asks for the intercepts).",
          ),
          step(
            "approach",
            "Reordenar a la forma general $y = -3x^2 - x + 5$, aplicar $x_v = -\\frac{b}{2a}$ y evaluar; el signo $a < 0$ anticipa un máximo.",
            "Rearrange to standard form $y = -3x^2 - x + 5$, apply $x_v = -\\frac{b}{2a}$ and evaluate; the sign $a < 0$ anticipates a maximum.",
          ),
          step(
            "calculation",
            "$x_v = -\\frac{-1}{2(-3)} = -\\frac{1}{6}$.<br>$y_v = -3\\left(-\\frac{1}{6}\\right)^2 - \\left(-\\frac{1}{6}\\right) + 5 = -\\frac{1}{12} + \\frac{2}{12} + \\frac{60}{12} = \\frac{61}{12}$.<br>Intersecciones: $f(0) = 5$ (corte $y$); $-3x^2 - x + 5 = 0 \\Rightarrow 3x^2 + x - 5 = 0$ con $\\Delta = 61$: cortes $x = \\frac{-1 \\pm \\sqrt{61}}{6}$.",
            "$x_v = -\\frac{-1}{2(-3)} = -\\frac{1}{6}$.<br>$y_v = -3\\left(-\\frac{1}{6}\\right)^2 - \\left(-\\frac{1}{6}\\right) + 5 = -\\frac{1}{12} + \\frac{2}{12} + \\frac{60}{12} = \\frac{61}{12}$.<br>Intercepts: $f(0) = 5$ ($y$-intercept); $-3x^2 - x + 5 = 0 \\Rightarrow 3x^2 + x - 5 = 0$ with $\\Delta = 61$: $x$-intercepts $x = \\frac{-1 \\pm \\sqrt{61}}{6}$.",
          ),
          step(
            "result",
            "Vértice $\\left(-\\frac{1}{6},\\ \\frac{61}{12}\\right)$, punto más alto ($a = -3 < 0$). Verificación: $f\\left(-\\frac{1}{6}\\right) = \\frac{61}{12}$ ✓ y $f(0) = 5 < \\frac{61}{12} = 5{,}08\\overline{3}$ ✓ (el corte $y$ queda por debajo del vértice).",
            "Vertex $\\left(-\\frac{1}{6},\\ \\frac{61}{12}\\right)$, the highest point ($a = -3 < 0$). Check: $f\\left(-\\frac{1}{6}\\right) = \\frac{61}{12}$ ✓ and $f(0) = 5 < \\frac{61}{12} = 5.08\\overline{3}$ ✓ (the $y$-intercept lies below the vertex).",
          ),
        ],
      };
    },
  ),

  /* S17 · 13 — y = x²−6x+5: vértice (3, −4). */
  template(
    {
      id: "qvf-uees-13",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "vertex",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["vertex", "intercepts", "range"],
      prerequisites: ["polynomials"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "17 · 13",
        page: 19,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$(3,\\ -4)$`, `$(3,\\ -4)$`), correct: true },
        { id: "b", text: L(`$(-3,\\ -4)$`, `$(-3,\\ -4)$`), correct: false },
        { id: "c", text: L(`$(3,\\ 4)$`, `$(3,\\ 4)$`), correct: false },
        { id: "d", text: L(`$(1,\\ 0)$`, `$(1,\\ 0)$`), correct: false },
      ];
      return {
        skill: L(
          "Vértice, intersecciones y rango de una parábola factorizable",
          "Vertex, intercepts and range of a factorable parabola",
        ),
        statement: L(
          "Para la parábola $$y = f(x) = x^2 - 6x + 5,$$ halle el vértice. (La hoja pide además las intersecciones y el rango; se calculan en la solución.)",
          "For the parabola $$y = f(x) = x^2 - 6x + 5,$$ find the vertex. (The worksheet also asks for the intercepts and the range; they are worked out in the solution.)",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "OJO: $b = -6$, así que $x_v = -\\frac{-6}{2 \\cdot 1} = +3$ — el doble signo menos se cancela.",
            "WATCH OUT: $b = -6$, so $x_v = -\\frac{-6}{2 \\cdot 1} = +3$ — the double minus sign cancels.",
          ),
          L(
            "Este trinomio factoriza: $x^2 - 6x + 5 = (x - 1)(x - 5)$; el vértice está en el punto medio de los cortes $x$.",
            "This trinomial factors: $x^2 - 6x + 5 = (x - 1)(x - 5)$; the vertex lies at the midpoint of the $x$-intercepts.",
          ),
          L(
            "$x_v = 3$; falta evaluar $f(3) = 9 - 18 + 5$.",
            "$x_v = 3$; you still have to evaluate $f(3) = 9 - 18 + 5$.",
          ),
        ],
        answerDisplay: L(
          "$(3,\\ -4)$",
          "$(3,\\ -4)$",
        ),
        solution: [
          step(
            "given",
            "La parábola $y = f(x) = x^2 - 6x + 5$; el ejercicio original pide graficar, obtener el vértice y las intersecciones y determinar el rango.",
            "The parabola $y = f(x) = x^2 - 6x + 5$; the original exercise asks to graph, get the vertex and the intercepts, and determine the range.",
          ),
          step(
            "approach",
            "Vértice con $x_v = -\\frac{b}{2a}$ (o en el punto medio de los cortes $x$); intersecciones factorizando; el rango lo fija $y_v$ junto con el signo de $a$.",
            "Vertex via $x_v = -\\frac{b}{2a}$ (or at the midpoint of the $x$-intercepts); intercepts by factoring; the range is fixed by $y_v$ together with the sign of $a$.",
          ),
          step(
            "calculation",
            "$x_v = -\\frac{-6}{2} = 3$; $y_v = f(3) = 9 - 18 + 5 = -4$.<br>Intersecciones: $x^2 - 6x + 5 = (x - 1)(x - 5) = 0$ da cortes $x = 1$ y $x = 5$; $f(0) = 5$ (corte $y$).<br>Rango: como $a = 1 > 0$, $y \\ge y_v$, o sea $[-4, \\infty)$.",
            "$x_v = -\\frac{-6}{2} = 3$; $y_v = f(3) = 9 - 18 + 5 = -4$.<br>Intercepts: $x^2 - 6x + 5 = (x - 1)(x - 5) = 0$ gives $x$-intercepts $x = 1$ and $x = 5$; $f(0) = 5$ ($y$-intercept).<br>Range: since $a = 1 > 0$, $y \\ge y_v$, i.e. $[-4, \\infty)$.",
          ),
          step(
            "result",
            "Vértice $(3, -4)$, mínimo. Verificación: $f(3) = -4$ ✓ y el punto medio de los cortes $x = 1$ y $x = 5$ es $\\frac{1 + 5}{2} = 3$ ✓ (simetría).",
            "Vertex $(3, -4)$, a minimum. Check: $f(3) = -4$ ✓ and the midpoint of the $x$-intercepts $x = 1$ and $x = 5$ is $\\frac{1 + 5}{2} = 3$ ✓ (symmetry).",
          ),
        ],
      };
    },
  ),

  /* S17 · 14 — y = 9x²: vértice (0, 0). */
  template(
    {
      id: "qvf-uees-14",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "vertex",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 90,
      tags: ["vertex", "monomial-parabola", "range"],
      prerequisites: ["polynomials"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "17 · 14",
        page: 19,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$(0,\\ 0)$`, `$(0,\\ 0)$`), correct: true },
        { id: "b", text: L(`$(9,\\ 0)$`, `$(9,\\ 0)$`), correct: false },
        { id: "c", text: L(`$(0,\\ 9)$`, `$(0,\\ 9)$`), correct: false },
        { id: "d", text: L(`$\\left(\\frac{9}{2},\\ 0\\right)$`, `$\\left(\\frac{9}{2},\\ 0\\right)$`), correct: false },
      ];
      return {
        skill: L(
          "Parábola monomio: el vértice en el origen",
          "Monomial parabola: the vertex at the origin",
        ),
        statement: L(
          "Para la parábola $$y = f(x) = 9x^2,$$ halle el vértice. (La hoja pide además las intersecciones y el rango; se calculan en la solución.)",
          "For the parabola $$y = f(x) = 9x^2,$$ find the vertex. (The worksheet also asks for the intercepts and the range; they are worked out in the solution.)",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Con $b = 0$ y $c = 0$ la fórmula $x_v = -\\frac{b}{2a}$ se simplifica muchísimo.",
            "With $b = 0$ and $c = 0$ the formula $x_v = -\\frac{b}{2a}$ simplifies enormously.",
          ),
          L(
            "$9x^2$ sólo se anula en $x = 0$: la parábola toca el eje $x$ exactamente en su vértice.",
            "$9x^2$ vanishes only at $x = 0$: the parabola touches the $x$-axis exactly at its vertex.",
          ),
          L(
            "$x_v = 0$; el vértice es $(0, f(0))$.",
            "$x_v = 0$; the vertex is $(0, f(0))$.",
          ),
        ],
        answerDisplay: L(
          "$(0,\\ 0)$",
          "$(0,\\ 0)$",
        ),
        solution: [
          step(
            "given",
            "La parábola $y = f(x) = 9x^2$ (monomio cuadrático puro).",
            "The parabola $y = f(x) = 9x^2$ (a pure quadratic monomial).",
          ),
          step(
            "approach",
            "Sin término lineal ni constante, el eje de simetría es el eje $y$; el vértice es el único punto donde $y$ alcanza su mínimo.",
            "With no linear or constant term, the axis of symmetry is the $y$-axis; the vertex is the single point where $y$ reaches its minimum.",
          ),
          step(
            "calculation",
            "$x_v = -\\frac{0}{2 \\cdot 9} = 0$; $y_v = f(0) = 0$.<br>Intersecciones: único corte $x$ (doble) en $(0, 0)$ y corte $y$ en $(0, 0)$.<br>Rango: $9x^2 \\ge 0$, así que $[0, \\infty)$.",
            "$x_v = -\\frac{0}{2 \\cdot 9} = 0$; $y_v = f(0) = 0$.<br>Intercepts: single (double) $x$-intercept at $(0, 0)$ and $y$-intercept at $(0, 0)$.<br>Range: $9x^2 \\ge 0$, so $[0, \\infty)$.",
          ),
          step(
            "result",
            "Vértice $(0, 0)$: el origen. Verificación: $f(0) = 0$ ✓ y $9x^2 \\ge 0$ para todo $x$, con igualdad sólo en $x = 0$ ✓ (el mínimo es único).",
            "Vertex $(0, 0)$: the origin. Check: $f(0) = 0$ ✓ and $9x^2 \\ge 0$ for every $x$, with equality only at $x = 0$ ✓ (the minimum is unique).",
          ),
        ],
      };
    },
  ),

  /* S17 · 15 — y = −2x²−6x: vértice (−3/2, 9/2). */
  template(
    {
      id: "qvf-uees-15",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "vertex",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["vertex", "intercepts", "range"],
      prerequisites: ["polynomials"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "17 · 15",
        page: 19,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\left(-\\frac{3}{2},\\ \\frac{9}{2}\\right)$`, `$\\left(-\\frac{3}{2},\\ \\frac{9}{2}\\right)$`), correct: true },
        { id: "b", text: L(`$\\left(\\frac{3}{2},\\ \\frac{9}{2}\\right)$`, `$\\left(\\frac{3}{2},\\ \\frac{9}{2}\\right)$`), correct: false },
        { id: "c", text: L(`$\\left(-\\frac{3}{2},\\ -\\frac{9}{2}\\right)$`, `$\\left(-\\frac{3}{2},\\ -\\frac{9}{2}\\right)$`), correct: false },
        { id: "d", text: L(`$(0,\\ 0)$`, `$(0,\\ 0)$`), correct: false },
      ];
      return {
        skill: L(
          "Parábola sin término independiente: vértice desde los cortes",
          "Parabola with no constant term: vertex from the intercepts",
        ),
        statement: L(
          "Para la parábola $$y = g(x) = -2x^2 - 6x,$$ halle el vértice. (La hoja pide además las intersecciones y el rango; se calculan en la solución.)",
          "For the parabola $$y = g(x) = -2x^2 - 6x,$$ find the vertex. (The worksheet also asks for the intercepts and the range; they are worked out in the solution.)",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Saca factor común $-2x$: $-2x^2 - 6x = -2x(x + 3)$; los cortes $x$ son $0$ y $-3$.",
            "Pull out the common factor $-2x$: $-2x^2 - 6x = -2x(x + 3)$; the $x$-intercepts are $0$ and $-3$.",
          ),
          L(
            "El vértice está en el punto medio de los cortes $x$ (equivalente a $x_v = -\\frac{b}{2a}$ con $a = -2$, $b = -6$).",
            "The vertex lies at the midpoint of the $x$-intercepts (equivalent to $x_v = -\\frac{b}{2a}$ with $a = -2$, $b = -6$).",
          ),
          L(
            "$x_v = -\\frac{3}{2}$; falta $g\\left(-\\frac{3}{2}\\right)$ (saldrá positivo: la parábola abre hacia abajo).",
            "$x_v = -\\frac{3}{2}$; you still need $g\\left(-\\frac{3}{2}\\right)$ (it comes out positive: the parabola opens downward).",
          ),
        ],
        answerDisplay: L(
          "$\\left(-\\frac{3}{2},\\ \\frac{9}{2}\\right)$",
          "$\\left(-\\frac{3}{2},\\ \\frac{9}{2}\\right)$",
        ),
        solution: [
          step(
            "given",
            "La parábola $y = g(x) = -2x^2 - 6x$; el ejercicio original pide gráfica, vértice, intersecciones y rango.",
            "The parabola $y = g(x) = -2x^2 - 6x$; the original exercise asks for the graph, vertex, intercepts and range.",
          ),
          step(
            "approach",
            "Factorizar para obtener los cortes $x$; el vértice está en su punto medio; el rango lo da el signo de $a = -2 < 0$ junto con $y_v$.",
            "Factor to get the $x$-intercepts; the vertex lies at their midpoint; the range comes from the sign of $a = -2 < 0$ together with $y_v$.",
          ),
          step(
            "calculation",
            "$g(x) = -2x(x + 3) = 0 \\Rightarrow x = 0$ ó $x = -3$ (cortes $x$); corte $y$: $g(0) = 0$.<br>$x_v = \\frac{0 + (-3)}{2} = -\\frac{3}{2}$; $y_v = g\\left(-\\frac{3}{2}\\right) = -2 \\cdot \\frac{9}{4} + 9 = \\frac{9}{2}$.<br>Rango: $a = -2 < 0$, así que $\\left(-\\infty,\\ \\frac{9}{2}\\right]$.",
            "$g(x) = -2x(x + 3) = 0 \\Rightarrow x = 0$ or $x = -3$ ($x$-intercepts); $y$-intercept: $g(0) = 0$.<br>$x_v = \\frac{0 + (-3)}{2} = -\\frac{3}{2}$; $y_v = g\\left(-\\frac{3}{2}\\right) = -2 \\cdot \\frac{9}{4} + 9 = \\frac{9}{2}$.<br>Range: $a = -2 < 0$, so $\\left(-\\infty,\\ \\frac{9}{2}\\right]$.",
          ),
          step(
            "result",
            "Vértice $\\left(-\\frac{3}{2},\\ \\frac{9}{2}\\right)$, punto más alto ($a = -2 < 0$). Verificación: $g\\left(-\\frac{3}{2}\\right) = -\\frac{9}{2} + 9 = \\frac{9}{2}$ ✓ y el punto medio de los cortes $0$ y $-3$ es $-\\frac{3}{2}$ ✓.",
            "Vertex $\\left(-\\frac{3}{2},\\ \\frac{9}{2}\\right)$, the highest point ($a = -2 < 0$). Check: $g\\left(-\\frac{3}{2}\\right) = -\\frac{9}{2} + 9 = \\frac{9}{2}$ ✓ and the midpoint of the intercepts $0$ and $-3$ is $-\\frac{3}{2}$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S17 · 16 — y = x²−4: vértice (0, −4). */
  template(
    {
      id: "qvf-uees-16",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "vertex",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 90,
      tags: ["vertex", "intercepts", "range"],
      prerequisites: ["polynomials"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "17 · 16",
        page: 19,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$(0,\\ -4)$`, `$(0,\\ -4)$`), correct: true },
        { id: "b", text: L(`$(2,\\ 0)$`, `$(2,\\ 0)$`), correct: false },
        { id: "c", text: L(`$(0,\\ 4)$`, `$(0,\\ 4)$`), correct: false },
        { id: "d", text: L(`$(-4,\\ 0)$`, `$(-4,\\ 0)$`), correct: false },
      ];
      return {
        skill: L(
          "Diferencia de cuadrados: vértice entre los cortes ±2",
          "Difference of squares: vertex between the ±2 intercepts",
        ),
        statement: L(
          "Para la parábola $$y = f(x) = x^2 - 4,$$ halle el vértice. (La hoja pide además las intersecciones y el rango; se calculan en la solución.)",
          "For the parabola $$y = f(x) = x^2 - 4,$$ find the vertex. (The worksheet also asks for the intercepts and the range; they are worked out in the solution.)",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Con $b = 0$: $x_v = 0$ sin ningún cálculo.",
            "With $b = 0$: $x_v = 0$ with no computation at all.",
          ),
          L(
            "$x^2 - 4 = (x - 2)(x + 2)$ te da los cortes $x$; el vértice está justo enmedio.",
            "$x^2 - 4 = (x - 2)(x + 2)$ gives you the $x$-intercepts; the vertex lies right in between.",
          ),
          L(
            "$x_v = 0$; el vértice es $(0, f(0))$ — un número negativo pequeño.",
            "$x_v = 0$; the vertex is $(0, f(0))$ — a small negative number.",
          ),
        ],
        answerDisplay: L(
          "$(0,\\ -4)$",
          "$(0,\\ -4)$",
        ),
        solution: [
          step(
            "given",
            "La parábola $y = f(x) = x^2 - 4$; el ejercicio original pide gráfica, vértice, intersecciones y rango.",
            "The parabola $y = f(x) = x^2 - 4$; the original exercise asks for the graph, vertex, intercepts and range.",
          ),
          step(
            "approach",
            "Con $b = 0$ el eje de simetría es el eje $y$; los cortes salen de la diferencia de cuadrados y el rango del mínimo $y_v$.",
            "With $b = 0$ the axis of symmetry is the $y$-axis; the intercepts come from the difference of squares and the range from the minimum $y_v$.",
          ),
          step(
            "calculation",
            "$x_v = 0$; $y_v = f(0) = -4$.<br>Intersecciones: $x^2 - 4 = (x - 2)(x + 2) = 0$ da cortes $x = \\pm 2$; corte $y$ en $(0, -4)$.<br>Rango: $a = 1 > 0$ y $y_v = -4$, así que $[-4, \\infty)$.",
            "$x_v = 0$; $y_v = f(0) = -4$.<br>Intercepts: $x^2 - 4 = (x - 2)(x + 2) = 0$ gives $x$-intercepts $x = \\pm 2$; $y$-intercept at $(0, -4)$.<br>Range: $a = 1 > 0$ and $y_v = -4$, so $[-4, \\infty)$.",
          ),
          step(
            "result",
            "Vértice $(0, -4)$, mínimo. Verificación: $f(0) = -4$ ✓ y $f(\\pm 2) = 0 > -4$ ✓ (ambos cortes $x$ quedan por encima del vértice).",
            "Vertex $(0, -4)$, a minimum. Check: $f(0) = -4$ ✓ and $f(\\pm 2) = 0 > -4$ ✓ (both $x$-intercepts lie above the vertex).",
          ),
        ],
      };
    },
  ),
  /* S17 · 17 — s = t²+6t+9: vértice (−3, 0), cuadrado perfecto. */
  template(
    {
      id: "qvf-uees-17",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "vertex",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["vertex", "perfect-square", "range"],
      prerequisites: ["polynomials"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "17 · 17",
        page: 19,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$(-3,\\ 0)$`, `$(-3,\\ 0)$`), correct: true },
        { id: "b", text: L(`$(3,\\ 0)$`, `$(3,\\ 0)$`), correct: false },
        { id: "c", text: L(`$(-3,\\ 9)$`, `$(-3,\\ 9)$`), correct: false },
        { id: "d", text: L(`$(0,\\ 9)$`, `$(0,\\ 9)$`), correct: false },
      ];
      return {
        skill: L(
          "Trinomio cuadrado perfecto: el vértice toca el eje",
          "Perfect-square trinomial: the vertex touches the axis",
        ),
        statement: L(
          "Para la parábola $$s = h(t) = t^2 + 6t + 9,$$ halle el vértice. (La hoja pide además las intersecciones y el rango; se calculan en la solución.)",
          "For the parabola $$s = h(t) = t^2 + 6t + 9,$$ find the vertex. (The worksheet also asks for the intercepts and the range; they are worked out in the solution.)",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Es un trinomio cuadrado perfecto: $t^2 + 6t + 9 = (t + 3)^2$.",
            "It is a perfect-square trinomial: $t^2 + 6t + 9 = (t + 3)^2$.",
          ),
          L(
            "Un cuadrado nunca es negativo: el mínimo vale $0$ y se alcanza justo cuando el paréntesis se anula.",
            "A square is never negative: the minimum equals $0$ and is reached exactly when the parenthesis vanishes.",
          ),
          L(
            "El paréntesis se anula en $t = -3$; el vértice es $(-3, h(-3))$.",
            "The parenthesis vanishes at $t = -3$; the vertex is $(-3, h(-3))$.",
          ),
        ],
        answerDisplay: L(
          "$(-3,\\ 0)$",
          "$(-3,\\ 0)$",
        ),
        solution: [
          step(
            "given",
            "La parábola $s = h(t) = t^2 + 6t + 9$ (posición $s$ como función del tiempo $t$); se pide vértice, intersecciones y rango (parte de la hoja).",
            "The parabola $s = h(t) = t^2 + 6t + 9$ (position $s$ as a function of time $t$); vertex, intercepts and range are requested (part of the worksheet).",
          ),
          step(
            "approach",
            "Reconocer el cuadrado perfecto $(t + 3)^2$: el mínimo de un cuadrado es $0$, así que el vértice vive sobre el eje $t$.",
            "Recognize the perfect square $(t + 3)^2$: the minimum of a square is $0$, so the vertex lives on the $t$-axis.",
          ),
          step(
            "calculation",
            "$h(t) = (t + 3)^2$: mínimo $0$ en $t = -3$, o sea vértice $(-3, 0)$.<br>Intersecciones: único corte $t$ (doble) en $t = -3$; corte $s$: $h(0) = 9$, o sea $(0, 9)$.<br>Rango: $[0, \\infty)$.",
            "$h(t) = (t + 3)^2$: minimum $0$ at $t = -3$, i.e. vertex $(-3, 0)$.<br>Intercepts: single (double) $t$-intercept at $t = -3$; $s$-intercept: $h(0) = 9$, i.e. $(0, 9)$.<br>Range: $[0, \\infty)$.",
          ),
          step(
            "result",
            "Vértice $(-3, 0)$, mínimo. Verificación: $h(-3) = 9 - 18 + 9 = 0$ ✓ y $(t + 3)^2 \\ge 0$ para todo $t$ ✓ (nunca baja de $0$).",
            "Vertex $(-3, 0)$, a minimum. Check: $h(-3) = 9 - 18 + 9 = 0$ ✓ and $(t + 3)^2 \\ge 0$ for every $t$ ✓ (it never goes below $0$).",
          ),
        ],
      };
    },
  ),

  /* S17 · 18 — s = 2t²+3t−2: vértice (−3/4, −25/8). */
  template(
    {
      id: "qvf-uees-18",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "vertex",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 180,
      tags: ["vertex", "intercepts", "range"],
      prerequisites: ["polynomials"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "17 · 18",
        page: 19,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\left(-\\frac{3}{4},\\ -\\frac{25}{8}\\right)$`, `$\\left(-\\frac{3}{4},\\ -\\frac{25}{8}\\right)$`), correct: true },
        { id: "b", text: L(`$\\left(\\frac{3}{4},\\ -\\frac{25}{8}\\right)$`, `$\\left(\\frac{3}{4},\\ -\\frac{25}{8}\\right)$`), correct: false },
        { id: "c", text: L(`$\\left(-\\frac{3}{4},\\ \\frac{25}{8}\\right)$`, `$\\left(-\\frac{3}{4},\\ \\frac{25}{8}\\right)$`), correct: false },
        { id: "d", text: L(`$\\left(\\frac{1}{2},\\ 0\\right)$`, `$\\left(\\frac{1}{2},\\ 0\\right)$`), correct: false },
      ];
      return {
        skill: L(
          "Vértice con fracciones: 2t² + 3t − 2",
          "Vertex with fractions: 2t² + 3t − 2",
        ),
        statement: L(
          "Para la parábola $$s = h(t) = 2t^2 + 3t - 2,$$ halle el vértice. (La hoja pide además las intersecciones y el rango; se calculan en la solución.)",
          "For the parabola $$s = h(t) = 2t^2 + 3t - 2,$$ find the vertex. (The worksheet also asks for the intercepts and the range; they are worked out in the solution.)",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Factoriza primero: $2t^2 + 3t - 2 = (2t - 1)(t + 2)$; los cortes $t$ son $\\frac{1}{2}$ y $-2$.",
            "Factor first: $2t^2 + 3t - 2 = (2t - 1)(t + 2)$; the $t$-intercepts are $\\frac{1}{2}$ and $-2$.",
          ),
          L(
            "El vértice está en el punto medio de los cortes: $t_v = \\frac{\\frac{1}{2} + (-2)}{2}$ (equivalente a $-\\frac{b}{2a}$).",
            "The vertex lies at the midpoint of the intercepts: $t_v = \\frac{\\frac{1}{2} + (-2)}{2}$ (equivalent to $-\\frac{b}{2a}$).",
          ),
          L(
            "$t_v = -\\frac{3}{4}$; falta $h\\left(-\\frac{3}{4}\\right)$ (fracción con $8$ abajo).",
            "$t_v = -\\frac{3}{4}$; you still need $h\\left(-\\frac{3}{4}\\right)$ (a fraction with $8$ below).",
          ),
        ],
        answerDisplay: L(
          "$\\left(-\\frac{3}{4},\\ -\\frac{25}{8}\\right)$",
          "$\\left(-\\frac{3}{4},\\ -\\frac{25}{8}\\right)$",
        ),
        solution: [
          step(
            "given",
            "La parábola $s = h(t) = 2t^2 + 3t - 2$; el ejercicio original pide gráfica, vértice, intersecciones y rango.",
            "The parabola $s = h(t) = 2t^2 + 3t - 2$; the original exercise asks for the graph, vertex, intercepts and range.",
          ),
          step(
            "approach",
            "Obtener los cortes $t$ factorizando y ubicar el vértice en su punto medio; evaluar $h(t_v)$ y cerrar el rango con el signo de $a = 2 > 0$.",
            "Get the $t$-intercepts by factoring and place the vertex at their midpoint; evaluate $h(t_v)$ and close the range with the sign of $a = 2 > 0$.",
          ),
          step(
            "calculation",
            "$2t^2 + 3t - 2 = (2t - 1)(t + 2) = 0 \\Rightarrow t = \\frac{1}{2}$ ó $t = -2$ (cortes); corte $s$: $h(0) = -2$.<br>$t_v = \\frac{\\frac{1}{2} - 2}{2} = -\\frac{3}{4}$; $y_v$... es decir $s_v = h\\left(-\\frac{3}{4}\\right) = 2 \\cdot \\frac{9}{16} - \\frac{9}{4} - 2 = \\frac{9}{8} - \\frac{18}{8} - \\frac{16}{8} = -\\frac{25}{8}$.<br>Rango: $\\left[-\\frac{25}{8},\\ \\infty\\right)$.",
            "$2t^2 + 3t - 2 = (2t - 1)(t + 2) = 0 \\Rightarrow t = \\frac{1}{2}$ or $t = -2$ (intercepts); $s$-intercept: $h(0) = -2$.<br>$t_v = \\frac{\\frac{1}{2} - 2}{2} = -\\frac{3}{4}$; that is, $s_v = h\\left(-\\frac{3}{4}\\right) = 2 \\cdot \\frac{9}{16} - \\frac{9}{4} - 2 = \\frac{9}{8} - \\frac{18}{8} - \\frac{16}{8} = -\\frac{25}{8}$.<br>Range: $\\left[-\\frac{25}{8},\\ \\infty\\right)$.",
          ),
          step(
            "result",
            "Vértice $\\left(-\\frac{3}{4},\\ -\\frac{25}{8}\\right)$, mínimo. Verificación: $h\\left(-\\frac{3}{4}\\right) = -\\frac{25}{8}$ ✓ y el punto medio de los cortes $\\frac{1}{2}$ y $-2$ es $-\\frac{3}{4}$ ✓.",
            "Vertex $\\left(-\\frac{3}{4},\\ -\\frac{25}{8}\\right)$, a minimum. Check: $h\\left(-\\frac{3}{4}\\right) = -\\frac{25}{8}$ ✓ and the midpoint of the intercepts $\\frac{1}{2}$ and $-2$ is $-\\frac{3}{4}$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S17 · 19 — y = −5+3x−3x²: vértice (1/2, −17/4), sin cortes x. */
  template(
    {
      id: "qvf-uees-19",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "vertex",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["vertex", "no-x-intercepts", "range"],
      prerequisites: ["polynomials"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "17 · 19",
        page: 19,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\left(\\frac{1}{2},\\ -\\frac{17}{4}\\right)$`, `$\\left(\\frac{1}{2},\\ -\\frac{17}{4}\\right)$`), correct: true },
        { id: "b", text: L(`$\\left(-\\frac{1}{2},\\ -\\frac{17}{4}\\right)$`, `$\\left(-\\frac{1}{2},\\ -\\frac{17}{4}\\right)$`), correct: false },
        { id: "c", text: L(`$\\left(\\frac{1}{2},\\ \\frac{17}{4}\\right)$`, `$\\left(\\frac{1}{2},\\ \\frac{17}{4}\\right)$`), correct: false },
        { id: "d", text: L(`$(0,\\ -5)$`, `$(0,\\ -5)$`), correct: false },
      ];
      return {
        skill: L(
          "Parábola que NO cruza el eje x: el vértice manda",
          "A parabola that never crosses the x-axis: the vertex rules",
        ),
        statement: L(
          "Para la parábola $$y = f(x) = -5 + 3x - 3x^2,$$ halle el vértice. (La hoja pide además las intersecciones y el rango; se calculan en la solución.)",
          "For the parabola $$y = f(x) = -5 + 3x - 3x^2,$$ find the vertex. (The worksheet also asks for the intercepts and the range; they are worked out in the solution.)",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Reordena: $y = -3x^2 + 3x - 5$, o sea $a = -3$, $b = 3$, $c = -5$.",
            "Rearrange: $y = -3x^2 + 3x - 5$, i.e. $a = -3$, $b = 3$, $c = -5$.",
          ),
          L(
            "$x_v = -\\frac{b}{2a} = -\\frac{3}{2(-3)} = \\frac{1}{2}$ (cuidado con el signo).",
            "$x_v = -\\frac{b}{2a} = -\\frac{3}{2(-3)} = \\frac{1}{2}$ (mind the sign).",
          ),
          L(
            "$x_v = \\frac{1}{2}$; evalúa $f\\left(\\frac{1}{2}\\right)$ (saldrá una fracción negativa con $4$ abajo).",
            "$x_v = \\frac{1}{2}$; evaluate $f\\left(\\frac{1}{2}\\right)$ (it comes out as a negative fraction with $4$ below).",
          ),
        ],
        answerDisplay: L(
          "$\\left(\\frac{1}{2},\\ -\\frac{17}{4}\\right)$",
          "$\\left(\\frac{1}{2},\\ -\\frac{17}{4}\\right)$",
        ),
        solution: [
          step(
            "given",
            "La parábola $y = f(x) = -5 + 3x - 3x^2$; el ejercicio original pide gráfica, vértice, intersecciones y rango.",
            "The parabola $y = f(x) = -5 + 3x - 3x^2$; the original exercise asks for the graph, vertex, intercepts and range.",
          ),
          step(
            "approach",
            "Reordenar a $-3x^2 + 3x - 5$, hallar el vértice con $-\\frac{b}{2a}$ y evaluar; el discriminante dirá si la parábola corta el eje $x$.",
            "Rearrange to $-3x^2 + 3x - 5$, find the vertex with $-\\frac{b}{2a}$ and evaluate; the discriminant will say whether the parabola crosses the $x$-axis.",
          ),
          step(
            "calculation",
            "$x_v = -\\frac{3}{2(-3)} = \\frac{1}{2}$;<br>$y_v = -3\\left(\\frac{1}{2}\\right)^2 + 3\\left(\\frac{1}{2}\\right) - 5 = -\\frac{3}{4} + \\frac{6}{4} - \\frac{20}{4} = -\\frac{17}{4}$.<br>Intersecciones: $\\Delta = 3^2 - 4(-3)(-5) = 9 - 60 < 0$: NO corta el eje $x$; corte $y$: $f(0) = -5$.<br>Rango: $a = -3 < 0$ con $y_v = -\\frac{17}{4}$: $\\left(-\\infty,\\ -\\frac{17}{4}\\right]$.",
            "$x_v = -\\frac{3}{2(-3)} = \\frac{1}{2}$;<br>$y_v = -3\\left(\\frac{1}{2}\\right)^2 + 3\\left(\\frac{1}{2}\\right) - 5 = -\\frac{3}{4} + \\frac{6}{4} - \\frac{20}{4} = -\\frac{17}{4}$.<br>Intercepts: $\\Delta = 3^2 - 4(-3)(-5) = 9 - 60 < 0$: it does NOT cross the $x$-axis; $y$-intercept: $f(0) = -5$.<br>Range: $a = -3 < 0$ with $y_v = -\\frac{17}{4}$: $\\left(-\\infty,\\ -\\frac{17}{4}\\right]$.",
          ),
          step(
            "result",
            "Vértice $\\left(\\frac{1}{2},\\ -\\frac{17}{4}\\right)$, punto más alto ($a = -3 < 0$). Verificación: $f\\left(\\frac{1}{2}\\right) = -\\frac{17}{4} = -4{,}25$ ✓ y $f(0) = -5 < -\\frac{17}{4}$ ✓ (el corte $y$ queda por debajo del máximo).",
            "Vertex $\\left(\\frac{1}{2},\\ -\\frac{17}{4}\\right)$, the highest point ($a = -3 < 0$). Check: $f\\left(\\frac{1}{2}\\right) = -\\frac{17}{4} = -4.25$ ✓ and $f(0) = -5 < -\\frac{17}{4}$ ✓ (the $y$-intercept lies below the maximum).",
          ),
        ],
      };
    },
  ),

  /* S17 · 20 — y = 1−x−x²: vértice (−1/2, 5/4). */
  template(
    {
      id: "qvf-uees-20",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "vertex",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["vertex", "intercepts", "range"],
      prerequisites: ["polynomials"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "17 · 20",
        page: 19,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\left(-\\frac{1}{2},\\ \\frac{5}{4}\\right)$`, `$\\left(-\\frac{1}{2},\\ \\frac{5}{4}\\right)$`), correct: true },
        { id: "b", text: L(`$\\left(\\frac{1}{2},\\ \\frac{5}{4}\\right)$`, `$\\left(\\frac{1}{2},\\ \\frac{5}{4}\\right)$`), correct: false },
        { id: "c", text: L(`$\\left(-\\frac{1}{2},\\ -\\frac{5}{4}\\right)$`, `$\\left(-\\frac{1}{2},\\ -\\frac{5}{4}\\right)$`), correct: false },
        { id: "d", text: L(`$(0,\\ 1)$`, `$(0,\\ 1)$`), correct: false },
      ];
      return {
        skill: L(
          "Vértice de y = 1 − x − x² y sus cortes irracionales",
          "Vertex of y = 1 − x − x² and its irrational intercepts",
        ),
        statement: L(
          "Para la parábola $$y = H(x) = 1 - x - x^2,$$ halle el vértice. (La hoja pide además las intersecciones y el rango; se calculan en la solución.)",
          "For the parabola $$y = H(x) = 1 - x - x^2,$$ find the vertex. (The worksheet also asks for the intercepts and the range; they are worked out in the solution.)",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Reordena: $H(x) = -x^2 - x + 1$ con $a = -1$, $b = -1$, $c = 1$.",
            "Rearrange: $H(x) = -x^2 - x + 1$ with $a = -1$, $b = -1$, $c = 1$.",
          ),
          L(
            "$x_v = -\\frac{-1}{2(-1)} = -\\frac{1}{2}$ (los dos signos menos se cancelan, pero el denominador vuelve a negativizar).",
            "$x_v = -\\frac{-1}{2(-1)} = -\\frac{1}{2}$ (the two minus signs cancel, but the denominator makes it negative again).",
          ),
          L(
            "$x_v = -\\frac{1}{2}$; falta $H\\left(-\\frac{1}{2}\\right)$ (una fracción propia positiva).",
            "$x_v = -\\frac{1}{2}$; you still need $H\\left(-\\frac{1}{2}\\right)$ (a positive proper fraction).",
          ),
        ],
        answerDisplay: L(
          "$\\left(-\\frac{1}{2},\\ \\frac{5}{4}\\right)$",
          "$\\left(-\\frac{1}{2},\\ \\frac{5}{4}\\right)$",
        ),
        solution: [
          step(
            "given",
            "La parábola $y = H(x) = 1 - x - x^2$; el ejercicio original pide gráfica, vértice, intersecciones y rango.",
            "The parabola $y = H(x) = 1 - x - x^2$; the original exercise asks for the graph, vertex, intercepts and range.",
          ),
          step(
            "approach",
            "Reordenar a $-x^2 - x + 1$, vértice con $-\\frac{b}{2a}$; los cortes $x$ salen de la fórmula cuadrática (aquí son irracionales) y el rango del máximo $y_v$.",
            "Rearrange to $-x^2 - x + 1$, vertex via $-\\frac{b}{2a}$; the $x$-intercepts come from the quadratic formula (here they are irrational) and the range from the maximum $y_v$.",
          ),
          step(
            "calculation",
            "$x_v = -\\frac{-1}{2(-1)} = -\\frac{1}{2}$;<br>$y_v = H\\left(-\\frac{1}{2}\\right) = 1 + \\frac{1}{2} - \\frac{1}{4} = \\frac{5}{4}$.<br>Intersecciones: $-x^2 - x + 1 = 0 \\Rightarrow x^2 + x - 1 = 0$, $\\Delta = 5$: cortes $x = \\frac{-1 \\pm \\sqrt{5}}{2}$; corte $y$: $H(0) = 1$.<br>Rango: $\\left(-\\infty,\\ \\frac{5}{4}\\right]$.",
            "$x_v = -\\frac{-1}{2(-1)} = -\\frac{1}{2}$;<br>$y_v = H\\left(-\\frac{1}{2}\\right) = 1 + \\frac{1}{2} - \\frac{1}{4} = \\frac{5}{4}$.<br>Intercepts: $-x^2 - x + 1 = 0 \\Rightarrow x^2 + x - 1 = 0$, $\\Delta = 5$: $x$-intercepts $x = \\frac{-1 \\pm \\sqrt{5}}{2}$; $y$-intercept: $H(0) = 1$.<br>Range: $\\left(-\\infty,\\ \\frac{5}{4}\\right]$.",
          ),
          step(
            "result",
            "Vértice $\\left(-\\frac{1}{2},\\ \\frac{5}{4}\\right)$, punto más alto ($a = -1 < 0$). Verificación: $H\\left(-\\frac{1}{2}\\right) = \\frac{5}{4}$ ✓ y $H(0) = 1 < \\frac{5}{4}$ ✓ (el corte $y$ queda por debajo del máximo).",
            "Vertex $\\left(-\\frac{1}{2},\\ \\frac{5}{4}\\right)$, the highest point ($a = -1 < 0$). Check: $H\\left(-\\frac{1}{2}\\right) = \\frac{5}{4}$ ✓ and $H(0) = 1 < \\frac{5}{4}$ ✓ (the $y$-intercept lies below the maximum).",
          ),
        ],
      };
    },
  ),

  /* S17 · 21 — t = s²−8s+14: vértice (4, −2). */
  template(
    {
      id: "qvf-uees-21",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "vertex",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["vertex", "intercepts", "range"],
      prerequisites: ["polynomials"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "17 · 21",
        page: 19,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$(4,\\ -2)$`, `$(4,\\ -2)$`), correct: true },
        { id: "b", text: L(`$(-4,\\ -2)$`, `$(-4,\\ -2)$`), correct: false },
        { id: "c", text: L(`$(4,\\ 2)$`, `$(4,\\ 2)$`), correct: false },
        { id: "d", text: L(`$(0,\\ 14)$`, `$(0,\\ 14)$`), correct: false },
      ];
      return {
        skill: L(
          "La variable se llama s: vértice de t = f(s)",
          "The variable is called s: vertex of t = f(s)",
        ),
        statement: L(
          "Para la parábola $$t = f(s) = s^2 - 8s + 14,$$ halle el vértice. (La hoja pide además las intersecciones y el rango; se calculan en la solución.)",
          "For the parabola $$t = f(s) = s^2 - 8s + 14,$$ find the vertex. (The worksheet also asks for the intercepts and the range; they are worked out in the solution.)",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "$a = 1$, $b = -8$, $c = 14$; la fórmula del vértice da $s_v = -\\frac{b}{2a} = -\\frac{-8}{2}$.",
            "$a = 1$, $b = -8$, $c = 14$; the vertex formula gives $s_v = -\\frac{b}{2a} = -\\frac{-8}{2}$.",
          ),
          L(
            "También puedes completar el cuadrado: $s^2 - 8s + 14 = (s - 4)^2 - 2$.",
            "You may also complete the square: $s^2 - 8s + 14 = (s - 4)^2 - 2$.",
          ),
          L(
            "$s_v = 4$; falta $f(4) = 16 - 32 + 14$.",
            "$s_v = 4$; you still need $f(4) = 16 - 32 + 14$.",
          ),
        ],
        answerDisplay: L(
          "$(4,\\ -2)$",
          "$(4,\\ -2)$",
        ),
        solution: [
          step(
            "given",
            "La parábola $t = f(s) = s^2 - 8s + 14$ (la entrada es $s$ y la salida $t$); el ejercicio original pide gráfica, vértice, intersecciones y rango.",
            "The parabola $t = f(s) = s^2 - 8s + 14$ (the input is $s$ and the output $t$); the original exercise asks for the graph, vertex, intercepts and range.",
          ),
          step(
            "approach",
            "Aplicar $s_v = -\\frac{b}{2a}$ (o completar el cuadrado) y evaluar $f(s_v)$; los cortes $s$ salen de la fórmula cuadrática.",
            "Apply $s_v = -\\frac{b}{2a}$ (or complete the square) and evaluate $f(s_v)$; the $s$-intercepts come from the quadratic formula.",
          ),
          step(
            "calculation",
            "$s_v = -\\frac{-8}{2} = 4$; $t_v = f(4) = 16 - 32 + 14 = -2$.<br>Intersecciones: $s^2 - 8s + 14 = 0$ con $\\Delta = 64 - 56 = 8$: cortes $s = 4 \\pm \\sqrt{2}$; corte $t$: $f(0) = 14$, o sea $(0, 14)$.<br>Rango: $a = 1 > 0$ con $t_v = -2$: $[-2, \\infty)$.",
            "$s_v = -\\frac{-8}{2} = 4$; $t_v = f(4) = 16 - 32 + 14 = -2$.<br>Intercepts: $s^2 - 8s + 14 = 0$ with $\\Delta = 64 - 56 = 8$: $s$-intercepts $s = 4 \\pm \\sqrt{2}$; $t$-intercept: $f(0) = 14$, i.e. $(0, 14)$.<br>Range: $a = 1 > 0$ with $t_v = -2$: $[-2, \\infty)$.",
          ),
          step(
            "result",
            "Vértice $(4, -2)$, mínimo. Verificación: $f(4) = -2$ ✓ y $f(0) = 14 > -2$ ✓ (el corte $t$ queda muy por encima del vértice).",
            "Vertex $(4, -2)$, a minimum. Check: $f(4) = -2$ ✓ and $f(0) = 14 > -2$ ✓ (the $t$-intercept lies far above the vertex).",
          ),
        ],
      };
    },
  ),

  /* S17 · 22 — t = s²+6s+11: vértice (−3, 2), sin cortes s. */
  template(
    {
      id: "qvf-uees-22",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "vertex",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["vertex", "no-x-intercepts", "range"],
      prerequisites: ["polynomials"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "17 · 22",
        page: 19,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$(-3,\\ 2)$`, `$(-3,\\ 2)$`), correct: true },
        { id: "b", text: L(`$(3,\\ 2)$`, `$(3,\\ 2)$`), correct: false },
        { id: "c", text: L(`$(-3,\\ -2)$`, `$(-3,\\ -2)$`), correct: false },
        { id: "d", text: L(`$(0,\\ 11)$`, `$(0,\\ 11)$`), correct: false },
      ];
      return {
        skill: L(
          "Completar el cuadrado: s² + 6s + 11 = (s+3)² + 2",
          "Completing the square: s² + 6s + 11 = (s+3)² + 2",
        ),
        statement: L(
          "Para la parábola $$t = f(s) = s^2 + 6s + 11,$$ halle el vértice. (La hoja pide además las intersecciones y el rango; se calculan en la solución.)",
          "For the parabola $$t = f(s) = s^2 + 6s + 11,$$ find the vertex. (The worksheet also asks for the intercepts and the range; they are worked out in the solution.)",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "$a = 1$, $b = 6$, $c = 11$: $s_v = -\\frac{6}{2} = -3$.",
            "$a = 1$, $b = 6$, $c = 11$: $s_v = -\\frac{6}{2} = -3$.",
          ),
          L(
            "Completa el cuadrado: $s^2 + 6s + 11 = (s + 3)^2 + 2$ — el vértice se lee directo de esta forma.",
            "Complete the square: $s^2 + 6s + 11 = (s + 3)^2 + 2$ — the vertex can be read straight off this form.",
          ),
          L(
            "$s_v = -3$; el vértice es $(-3, f(-3))$ (un número pequeño y positivo).",
            "$s_v = -3$; the vertex is $(-3, f(-3))$ (a small positive number).",
          ),
        ],
        answerDisplay: L(
          "$(-3,\\ 2)$",
          "$(-3,\\ 2)$",
        ),
        solution: [
          step(
            "given",
            "La parábola $t = f(s) = s^2 + 6s + 11$; el ejercicio original pide gráfica, vértice, intersecciones y rango.",
            "The parabola $t = f(s) = s^2 + 6s + 11$; the original exercise asks for the graph, vertex, intercepts and range.",
          ),
          step(
            "approach",
            "Completar el cuadrado (o $s_v = -\\frac{b}{2a}$); el discriminante anticipa si hay cortes $s$ reales.",
            "Complete the square (or use $s_v = -\\frac{b}{2a}$); the discriminant anticipates whether there are real $s$-intercepts.",
          ),
          step(
            "calculation",
            "$s^2 + 6s + 11 = (s + 3)^2 + 2$: mínimo $2$ en $s = -3$, vértice $(-3, 2)$.<br>Intersecciones: $\\Delta = 36 - 44 = -8 < 0$: NO corta el eje $s$; corte $t$: $f(0) = 11$, o sea $(0, 11)$.<br>Rango: $[2, \\infty)$.",
            "$s^2 + 6s + 11 = (s + 3)^2 + 2$: minimum $2$ at $s = -3$, vertex $(-3, 2)$.<br>Intercepts: $\\Delta = 36 - 44 = -8 < 0$: it does NOT cross the $s$-axis; $t$-intercept: $f(0) = 11$, i.e. $(0, 11)$.<br>Range: $[2, \\infty)$.",
          ),
          step(
            "result",
            "Vértice $(-3, 2)$, mínimo. Verificación: $f(-3) = 9 - 18 + 11 = 2$ ✓ y $(s + 3)^2 \\ge 0$ para todo $s$, así que $f(s) \\ge 2$ siempre ✓ (la parábola queda por encima del eje $s$).",
            "Vertex $(-3, 2)$, a minimum. Check: $f(-3) = 9 - 18 + 11 = 2$ ✓ and $(s + 3)^2 \\ge 0$ for every $s$, so $f(s) \\ge 2$ always ✓ (the parabola stays above the $s$-axis).",
          ),
        ],
      };
    },
  ),
  /* S17 · 29 — ingreso máximo: p = 100−10q → (q, R) = (5, 250). */
  template(
    {
      id: "qvf-uees-29",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "applications",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["revenue", "demand", "maximum", "modeling"],
      prerequisites: ["polynomials"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "17 · 29",
        page: 19,
      },
      reasoning: "modeling",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$(5,\\ 250)$`, `$(5,\\ 250)$`), correct: true },
        { id: "b", text: L(`$(10,\\ 0)$`, `$(10,\\ 0)$`), correct: false },
        { id: "c", text: L(`$(5,\\ 500)$`, `$(5,\\ 500)$`), correct: false },
        { id: "d", text: L(`$(100,\\ 0)$`, `$(100,\\ 0)$`), correct: false },
      ];
      return {
        skill: L(
          "Modelar el ingreso R = p·q y maximizar la parábola",
          "Model the revenue R = p·q and maximize the parabola",
        ),
        statement: L(
          "**Ingreso.** La función de demanda para el fabricante de un producto es $p = f(q) = 100 - 10q$, donde $p$ es el precio por unidad cuando se demandan $q$ unidades (por día). Halle el nivel de producción que maximiza el ingreso total del fabricante y determine este ingreso. (Opciones: pares $(q, R)$ con $R$ el ingreso total.)",
          "**Revenue.** The demand function for a manufacturer of a product is $p = f(q) = 100 - 10q$, where $p$ is the price per unit when $q$ units are demanded (per day). Find the level of production that maximizes the manufacturer's total revenue and determine this revenue. (Options: pairs $(q, R)$ with $R$ the total revenue.)",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Primero el modelo: el ingreso es precio por cantidad, $R(q) = p \\cdot q = (100 - 10q)q$.",
            "First the model: revenue is price times quantity, $R(q) = p \\cdot q = (100 - 10q)q$.",
          ),
          L(
            "$R(q) = 100q - 10q^2$ es una parábola que abre hacia abajo ($a = -10$): su máximo está en el vértice $q = -\\frac{b}{2a}$.",
            "$R(q) = 100q - 10q^2$ is a downward-opening parabola ($a = -10$): its maximum sits at the vertex $q = -\\frac{b}{2a}$.",
          ),
          L(
            "$q^* = -\\frac{100}{2(-10)} = 5$ unidades; falta evaluar $R(5)$ (no es el precio $p(5)$).",
            "$q^* = -\\frac{100}{2(-10)} = 5$ units; you still have to evaluate $R(5)$ (not the price $p(5)$).",
          ),
        ],
        answerDisplay: L(
          "$(q, R) = (5,\\ 250)$",
          "$(q, R) = (5,\\ 250)$",
        ),
        solution: [
          step(
            "given",
            "La demanda $p = f(q) = 100 - 10q$ (precio por unidad cuando se demandan $q$ unidades diarias); se pide el nivel de producción que maximiza el ingreso total y ese ingreso.",
            "The demand $p = f(q) = 100 - 10q$ (price per unit when $q$ daily units are demanded); the production level that maximizes total revenue and that revenue are requested.",
          ),
          step(
            "approach",
            "Construir el modelo de ingreso $R(q) = p(q) \\cdot q$, una parábola hacia abajo, y maximizarla en su vértice; distinguir ingreso $R$ de precio $p$.",
            "Build the revenue model $R(q) = p(q) \\cdot q$, a downward parabola, and maximize it at its vertex; keep the revenue $R$ apart from the price $p$.",
          ),
          step(
            "calculation",
            "$R(q) = (100 - 10q)q = 100q - 10q^2$.<br>Vértice: $q^* = -\\frac{100}{2(-10)} = 5$.<br>$p(5) = 100 - 50 = 50$ y $R(5) = 50 \\cdot 5 = 250$.",
            "$R(q) = (100 - 10q)q = 100q - 10q^2$.<br>Vertex: $q^* = -\\frac{100}{2(-10)} = 5$.<br>$p(5) = 100 - 50 = 50$ and $R(5) = 50 \\cdot 5 = 250$.",
          ),
          step(
            "result",
            "Nivel óptimo: $q = 5$ unidades diarias, con ingreso máximo $R = 250$. Verificación: $R(5) = 100 \\cdot 5 - 10 \\cdot 25 = 500 - 250 = 250$ ✓; vecinos: $R(4) = 400 - 160 = 240 < 250$ y $R(6) = 600 - 360 = 240 < 250$ ✓.",
            "Optimal level: $q = 5$ daily units, with maximum revenue $R = 250$. Check: $R(5) = 100 \\cdot 5 - 10 \\cdot 25 = 500 - 250 = 250$ ✓; neighbours: $R(4) = 400 - 160 = 240 < 250$ and $R(6) = 600 - 360 = 240 < 250$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S17 · 30 — CHALLENGE: p = 0,85−0,00045q; vértice 8500/9 ≈ 944,44 NO entero;
     entre enteros gana q = 944 (R = 401,3888 > 401,38875); R ≈ 401,39 (7225/18). */
  template(
    {
      id: "qvf-uees-30",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "applications",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["revenue", "demand", "integer-constraint", "challenge"],
      prerequisites: ["polynomials"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "17 · 30",
        page: 19,
      },
      reasoning: "modeling",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$(944,\\ 401{,}39)$`, `$(944,\\ 401.39)$`), correct: true },
        { id: "b", text: L(`$(945,\\ 401{,}86)$`, `$(945,\\ 401.86)$`), correct: false },
        { id: "c", text: L(`$(944,\\ 200{,}70)$`, `$(944,\\ 200.70)$`), correct: false },
        { id: "d", text: L(`$(0,\\ 0)$`, `$(0,\\ 0)$`), correct: false },
      ];
      return {
        skill: L(
          "Ingreso máximo con vértice NO entero: comparar los vecinos",
          "Maximum revenue with a NON-integer vertex: comparing neighbours",
        ),
        statement: L(
          "**Ingreso.** La función de demanda para una línea de reglas de plástico de una compañía de artículos de oficina es $p = 0{,}85 - 0{,}00045q$, donde $p$ es el precio por unidad cuando los consumidores demandan $q$ unidades (diarias). Determine el nivel de producción que maximizará el ingreso total del fabricante y calcule este ingreso. (Producción diaria en unidades ENTERAS; opciones: pares $(q, R)$ con $R$ el ingreso total en dólares.)",
          "**Revenue.** The demand function for a line of plastic rulers at an office-supply company is $p = 0.85 - 0.00045q$, where $p$ is the price per unit when consumers demand $q$ (daily) units. Determine the level of production that will maximize the manufacturer's total revenue and compute this revenue. (Daily production in WHOLE units; options: pairs $(q, R)$ with $R$ the total revenue in dollars.)",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Modela primero el ingreso: $R(q) = p \\cdot q = 0{,}85q - 0{,}00045q^2$, una parábola que abre hacia abajo.",
            "Model the revenue first: $R(q) = p \\cdot q = 0.85q - 0.00045q^2$, a downward-opening parabola.",
          ),
          L(
            "El vértice continuo está en $q = \\frac{0{,}85}{2 \\cdot 0{,}00045}$; calcula con cuidado los decimales: NO cae en un número entero.",
            "The continuous vertex sits at $q = \\frac{0.85}{2 \\cdot 0.00045}$; compute the decimals carefully: it does NOT land on a whole number.",
          ),
          L(
            "$q^* = \\frac{8500}{9} \\approx 944{,}44$: como la producción diaria es ENTERA, compara $R(944)$ con $R(945)$ antes de responder.",
            "$q^* = \\frac{8500}{9} \\approx 944.44$: since daily production must be a WHOLE number, compare $R(944)$ with $R(945)$ before answering.",
          ),
        ],
        answerDisplay: L(
          "$(q, R) = (944,\\ 401{,}39)$",
          "$(q, R) = (944,\\ 401.39)$",
        ),
        solution: [
          step(
            "given",
            "La demanda $p = 0{,}85 - 0{,}00045q$ (reglas de plástico, unidades diarias); se pide el nivel de producción que maximiza el ingreso total y ese ingreso.",
            "The demand $p = 0.85 - 0.00045q$ (plastic rulers, daily units); the production level that maximizes total revenue and that revenue are requested.",
          ),
          step(
            "approach",
            "Construir $R(q) = p \\cdot q$ y hallar el vértice continuo; como la producción diaria es entera y el vértice NO lo es, el máximo entero se decide comparando los dos vecinos del vértice.",
            "Build $R(q) = p \\cdot q$ and find the continuous vertex; since daily production is whole and the vertex is NOT, the integer maximum is decided by comparing the vertex's two neighbours.",
          ),
          step(
            "calculation",
            "$R(q) = 0{,}85q - 0{,}00045q^2$; el vértice continuo: $0{,}85 - 0{,}0009q = 0 \\Rightarrow q^* = \\frac{0{,}85}{0{,}0009} = \\frac{8500}{9} \\approx 944{,}44$ (no entero).<br>Vecinos enteros: $R(944) = 802{,}4 - 401{,}0112 = 401{,}3888$ y $R(945) = 803{,}25 - 401{,}86125 = 401{,}38875$.<br>Máximo continuo exacto: $R\\left(\\frac{8500}{9}\\right) = \\frac{7225}{18} \\approx 401{,}39$.",
            "$R(q) = 0.85q - 0.00045q^2$; the continuous vertex: $0.85 - 0.0009q = 0 \\Rightarrow q^* = \\frac{0.85}{0.0009} = \\frac{8500}{9} \\approx 944.44$ (not an integer).<br>Integer neighbours: $R(944) = 802.4 - 401.0112 = 401.3888$ and $R(945) = 803.25 - 401.86125 = 401.38875$.<br>Exact continuous maximum: $R\\left(\\frac{8500}{9}\\right) = \\frac{7225}{18} \\approx 401.39$.",
          ),
          step(
            "result",
            "Entre producciones enteras, el máximo está en $q = 944$ unidades diarias con $R(944) = 401{,}3888 \\approx 401{,}39$ dólares. Verificación: $p(944) = 0{,}85 - 0{,}00045 \\cdot 944 = 0{,}4252$ y $0{,}4252 \\cdot 944 = 401{,}3888$ ✓; $p(945) = 0{,}42475$ y $0{,}42475 \\cdot 945 = 401{,}38875$ ✓. La sutileza del ejercicio: el vértice exacto $\\frac{8500}{9} \\approx 944{,}44$ NO es entero, así que hay que comparar los dos vecinos — ambos redondean a $401{,}39$, pero $R(944)$ supera a $R(945)$ por $0{,}00005$ (944 está más cerca del vértice real).",
            "Among whole production levels, the maximum sits at $q = 944$ daily units with $R(944) = 401.3888 \\approx 401.39$ dollars. Check: $p(944) = 0.85 - 0.00045 \\cdot 944 = 0.4252$ and $0.4252 \\cdot 944 = 401.3888$ ✓; $p(945) = 0.42475$ and $0.42475 \\cdot 945 = 401.38875$ ✓. The exercise's subtlety: the exact vertex $\\frac{8500}{9} \\approx 944.44$ is NOT an integer, so the two neighbours must be compared — both round to $401.39$, but $R(944)$ beats $R(945)$ by $0.00005$ (944 lies closer to the true vertex).",
          ),
        ],
      };
    },
  ),

  /* S17 · 31 — ingreso máximo: p = 2400−6q → (q, R) = (200, 240000). */
  template(
    {
      id: "qvf-uees-31",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "applications",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["revenue", "demand", "maximum", "modeling"],
      prerequisites: ["polynomials"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "17 · 31",
        page: 19,
      },
      reasoning: "modeling",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$(200,\\ 240000)$`, `$(200,\\ 240000)$`), correct: true },
        { id: "b", text: L(`$(400,\\ 0)$`, `$(400,\\ 0)$`), correct: false },
        { id: "c", text: L(`$(200,\\ 2400)$`, `$(200,\\ 2400)$`), correct: false },
        { id: "d", text: L(`$(200,\\ 480000)$`, `$(200,\\ 480000)$`), correct: false },
      ];
      return {
        skill: L(
          "Ingreso máximo en portátiles: no confundir R con p ni con 2R",
          "Maximum laptop revenue: do not confuse R with p or with 2R",
        ),
        statement: L(
          "**Ingreso.** La función de demanda para la línea de computadoras portátiles de una compañía de electrónica es $p = 2400 - 6q$, donde $p$ es el precio por unidad cuando los consumidores demandan $q$ unidades (semanales). Encuentre el nivel de producción que maximizará el ingreso total del fabricante y determine este ingreso. (Opciones: pares $(q, R)$ con $R$ el ingreso total.)",
          "**Revenue.** The demand function for an electronics company's line of laptop computers is $p = 2400 - 6q$, where $p$ is the price per unit when consumers demand $q$ (weekly) units. Find the level of production that will maximize the manufacturer's total revenue and determine this revenue. (Options: pairs $(q, R)$ with $R$ the total revenue.)",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El modelo: $R(q) = p \\cdot q = (2400 - 6q)q$ — precio por cantidad.",
            "The model: $R(q) = p \\cdot q = (2400 - 6q)q$ — price times quantity.",
          ),
          L(
            "$R(q) = 2400q - 6q^2$ es una parábola hacia abajo: máximo en el vértice $q = -\\frac{b}{2a}$.",
            "$R(q) = 2400q - 6q^2$ is a downward parabola: maximum at the vertex $q = -\\frac{b}{2a}$.",
          ),
          L(
            "$q^* = \\frac{2400}{12} = 200$ unidades semanales; falta $R(200)$ (ni el precio $p(200)$, ni el producto $2400 \\cdot 200$).",
            "$q^* = \\frac{2400}{12} = 200$ weekly units; you still need $R(200)$ (neither the price $p(200)$, nor the product $2400 \\cdot 200$).",
          ),
        ],
        answerDisplay: L(
          "$(q, R) = (200,\\ 240000)$",
          "$(q, R) = (200,\\ 240000)$",
        ),
        solution: [
          step(
            "given",
            "La demanda $p = 2400 - 6q$ (portátiles, unidades semanales); se pide el nivel de producción que maximiza el ingreso total y ese ingreso.",
            "The demand $p = 2400 - 6q$ (laptops, weekly units); the production level that maximizes total revenue and that revenue are requested.",
          ),
          step(
            "approach",
            "Modelar $R(q) = (2400 - 6q)q$ y maximizar en el vértice; el precio $p(200)$ y el «ingreso a precio inicial» $2400 \\cdot 200$ son los distractores naturales.",
            "Model $R(q) = (2400 - 6q)q$ and maximize at the vertex; the price $p(200)$ and the “initial-price revenue” $2400 \\cdot 200$ are the natural distractors.",
          ),
          step(
            "calculation",
            "$R(q) = 2400q - 6q^2$.<br>$q^* = -\\frac{2400}{2(-6)} = \\frac{2400}{12} = 200$.<br>$p(200) = 2400 - 1200 = 1200$; $R(200) = 1200 \\cdot 200 = 240000$.",
            "$R(q) = 2400q - 6q^2$.<br>$q^* = -\\frac{2400}{2(-6)} = \\frac{2400}{12} = 200$.<br>$p(200) = 2400 - 1200 = 1200$; $R(200) = 1200 \\cdot 200 = 240000$.",
          ),
          step(
            "result",
            "Nivel óptimo: $q = 200$ unidades semanales con ingreso máximo $R = 240000$. Verificación: $R(200) = 2400 \\cdot 200 - 6 \\cdot 200^2 = 480000 - 240000 = 240000$ ✓; vecinos: $R(199) = 477600 - 237606 = 239994 < 240000$ y $R(201) = 482400 - 242406 = 239994 < 240000$ ✓.",
            "Optimal level: $q = 200$ weekly units with maximum revenue $R = 240000$. Check: $R(200) = 2400 \\cdot 200 - 6 \\cdot 200^2 = 480000 - 240000 = 240000$ ✓; neighbours: $R(199) = 477600 - 237606 = 239994 < 240000$ and $R(201) = 482400 - 242406 = 239994 < 240000$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S17 · 32 — marketing: f(n) = (10/9)n(12−n) → máximo (n, familias) = (6, 40 mil). */
  template(
    {
      id: "qvf-uees-32",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "applications",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["modeling", "maximum", "families"],
      prerequisites: ["polynomials"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "17 · 32",
        page: 19,
      },
      reasoning: "modeling",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$(6,\\ 40)$`, `$(6,\\ 40)$`), correct: true },
        { id: "b", text: L(`$(12,\\ 0)$`, `$(12,\\ 0)$`), correct: false },
        { id: "c", text: L(`$(0,\\ 0)$`, `$(0,\\ 0)$`), correct: false },
        { id: "d", text: L(`$(6,\\ 60)$`, `$(6,\\ 60)$`), correct: false },
      ];
      return {
        skill: L(
          "Modelo de marketing: máximo de f(n) = (10/9)n(12−n)",
          "Marketing model: maximum of f(n) = (10/9)n(12−n)",
        ),
        statement: L(
          "**Marketing.** Una compañía de marketing estima que $n$ meses después de la introducción de un nuevo producto de uno de sus clientes, $f(n)$ miles de familias lo usarán, donde $$f(n) = \\frac{10}{9}n(12 - n), \\quad 0 \\le n \\le 12.$$ Estime el número máximo de familias que usarán el producto. (Opciones: pares $(n, f(n))$ con $f(n)$ en miles de familias.)",
          "**Marketing.** A marketing company estimates that $n$ months after the introduction of a new product of one of its clients, $f(n)$ thousand families will be using it, where $$f(n) = \\frac{10}{9}n(12 - n), \\quad 0 \\le n \\le 12.$$ Estimate the maximum number of families that will use the product. (Options: pairs $(n, f(n))$ with $f(n)$ in thousands of families.)",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Desarrolla el modelo: $f(n) = \\frac{10}{9}(12n - n^2)$ es una parábola que abre hacia abajo en $n$.",
            "Expand the model: $f(n) = \\frac{10}{9}(12n - n^2)$ is a downward-opening parabola in $n$.",
          ),
          L(
            "El máximo de $12n - n^2$ está en $n = \\frac{12}{2} = 6$, o completando el cuadrado: $12n - n^2 = 36 - (n - 6)^2$.",
            "The maximum of $12n - n^2$ sits at $n = \\frac{12}{2} = 6$, or by completing the square: $12n - n^2 = 36 - (n - 6)^2$.",
          ),
          L(
            "$n = 6$ meses (dentro de $[0, 12]$ ✓); falta evaluar $f(6) = \\frac{10}{9} \\cdot 6 \\cdot 6$.",
            "$n = 6$ months (inside $[0, 12]$ ✓); you still have to evaluate $f(6) = \\frac{10}{9} \\cdot 6 \\cdot 6$.",
          ),
        ],
        answerDisplay: L(
          "$(n, f(n)) = (6,\\ 40)$ — 40 mil familias",
          "$(n, f(n)) = (6,\\ 40)$ — 40 thousand families",
        ),
        solution: [
          step(
            "given",
            "El modelo $f(n) = \\frac{10}{9}n(12 - n)$ con $0 \\le n \\le 12$ ($n$ en meses, $f(n)$ en miles de familias); se pide el número máximo de familias.",
            "The model $f(n) = \\frac{10}{9}n(12 - n)$ with $0 \\le n \\le 12$ ($n$ in months, $f(n)$ in thousands of families); the maximum number of families is requested.",
          ),
          step(
            "approach",
            "Reescribir como $f(n) = \\frac{10}{9}\\left(36 - (n - 6)^2\\right)$ (forma de vértice): el máximo salta a la vista y cae dentro del intervalo permitido.",
            "Rewrite as $f(n) = \\frac{10}{9}\\left(36 - (n - 6)^2\\right)$ (vertex form): the maximum jumps out and falls inside the allowed interval.",
          ),
          step(
            "calculation",
            "$f(n) = \\frac{10}{9}(12n - n^2) = \\frac{10}{9}\\left(36 - (n - 6)^2\\right) = 40 - \\frac{10}{9}(n - 6)^2$.<br>Máximo en $n = 6$: $f(6) = 40 - 0 = 40$ (miles de familias); en los extremos $f(0) = f(12) = 0$.",
            "$f(n) = \\frac{10}{9}(12n - n^2) = \\frac{10}{9}\\left(36 - (n - 6)^2\\right) = 40 - \\frac{10}{9}(n - 6)^2$.<br>Maximum at $n = 6$: $f(6) = 40 - 0 = 40$ (thousand families); at the endpoints $f(0) = f(12) = 0$.",
          ),
          step(
            "result",
            "El máximo se alcanza a los $n = 6$ meses con $f(6) = 40$ miles de familias (40000 familias). Verificación: $f(6) = \\frac{10}{9} \\cdot 6 \\cdot (12 - 6) = \\frac{10}{9} \\cdot 36 = 40$ ✓ y la forma de vértice $40 - \\frac{10}{9}(n - 6)^2 \\le 40$ confirma el máximo ✓.",
            "The maximum is reached at $n = 6$ months with $f(6) = 40$ thousand families (40000 families). Check: $f(6) = \\frac{10}{9} \\cdot 6 \\cdot (12 - 6) = \\frac{10}{9} \\cdot 36 = 40$ ✓ and the vertex form $40 - \\frac{10}{9}(n - 6)^2 \\le 40$ confirms the maximum ✓.",
          ),
        ],
      };
    },
  ),

  /* S17 · 33 — utilidad P(x) = −x²+18x+144: vértice (9, 225); intersecciones en la solución. */
  template(
    {
      id: "qvf-uees-33",
      subject: "math",
      topicId: "quadratics",
      subtopicId: "applications",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["profit", "vertex", "intercepts", "modeling"],
      prerequisites: ["polynomials"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "17 · 33",
        page: 19,
      },
      reasoning: "modeling",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$(9,\\ 225)$`, `$(9,\\ 225)$`), correct: true },
        { id: "b", text: L(`$(-9,\\ 225)$`, `$(-9,\\ 225)$`), correct: false },
        { id: "c", text: L(`$(9,\\ 324)$`, `$(9,\\ 324)$`), correct: false },
        { id: "d", text: L(`$(18,\\ 0)$`, `$(18,\\ 0)$`), correct: false },
      ];
      return {
        skill: L(
          "Utilidad diaria como parábola: vértice e intersecciones",
          "Daily profit as a parabola: vertex and intercepts",
        ),
        statement: L(
          "**Utilidad.** La utilidad diaria por la venta de árboles en el departamento de jardinería de un almacén está dada por $P(x) = -x^2 + 18x + 144$, donde $x$ es el número de árboles vendidos. Determine el vértice de la función de utilidad. (La hoja pide también las intersecciones y la gráfica; se desarrollan en la solución. Opciones: el vértice como par $(x, P)$.)",
          "**Profit.** The daily profit from selling trees at a store's gardening department is given by $P(x) = -x^2 + 18x + 144$, where $x$ is the number of trees sold. Determine the vertex of the profit function. (The worksheet also asks for the intercepts and the graph; they are worked out in the solution. Options: the vertex as a pair $(x, P)$.)",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "$P(x) = -x^2 + 18x + 144$ abre hacia abajo ($a = -1$): el vértice es la utilidad diaria MÁXIMA.",
            "$P(x) = -x^2 + 18x + 144$ opens downward ($a = -1$): the vertex is the MAXIMUM daily profit.",
          ),
          L(
            "$x_v = -\\frac{b}{2a} = -\\frac{18}{2(-1)} = 9$.",
            "$x_v = -\\frac{b}{2a} = -\\frac{18}{2(-1)} = 9$.",
          ),
          L(
            "$x_v = 9$ árboles; evalúa $P(9) = -81 + 162 + 144$.",
            "$x_v = 9$ trees; evaluate $P(9) = -81 + 162 + 144$.",
          ),
        ],
        answerDisplay: L(
          "Vértice $(9,\\ 225)$",
          "Vertex $(9,\\ 225)$",
        ),
        solution: [
          step(
            "given",
            "La utilidad diaria $P(x) = -x^2 + 18x + 144$ con $x$ = árboles vendidos; el ejercicio original pide vértice, intersecciones y gráfica.",
            "The daily profit $P(x) = -x^2 + 18x + 144$ with $x$ = trees sold; the original exercise asks for the vertex, intercepts and graph.",
          ),
          step(
            "approach",
            "Vértice con $-\\frac{b}{2a}$ y evaluación; las intersecciones $x$ salen de $P(x) = 0$ (fórmula cuadrática) y el corte $y$ de $P(0)$.",
            "Vertex via $-\\frac{b}{2a}$ and evaluation; the $x$-intercepts come from $P(x) = 0$ (quadratic formula) and the $y$-intercept from $P(0)$.",
          ),
          step(
            "calculation",
            "$x_v = -\\frac{18}{2(-1)} = 9$; $P(9) = -81 + 162 + 144 = 225$.<br>Intersecciones: $-x^2 + 18x + 144 = 0 \\Rightarrow x^2 - 18x - 144 = 0$, $\\Delta = 324 + 576 = 900$, $\\sqrt{\\Delta} = 30$: cortes $x = \\frac{18 \\pm 30}{2}$, o sea $x = 24$ y $x = -6$ (con $x \\ge 0$, el relevante es $24$); corte $y$: $P(0) = 144$.",
            "$x_v = -\\frac{18}{2(-1)} = 9$; $P(9) = -81 + 162 + 144 = 225$.<br>Intercepts: $-x^2 + 18x + 144 = 0 \\Rightarrow x^2 - 18x - 144 = 0$, $\\Delta = 324 + 576 = 900$, $\\sqrt{\\Delta} = 30$: $x$-intercepts $x = \\frac{18 \\pm 30}{2}$, i.e. $x = 24$ and $x = -6$ (with $x \\ge 0$, the relevant one is $24$); $y$-intercept: $P(0) = 144$.",
          ),
          step(
            "result",
            "Vértice $(9, 225)$: con 9 árboles vendidos la utilidad diaria máxima es 225. Verificación: $P(9) = 225$ ✓; vecinos: $P(8) = -64 + 144 + 144 = 224 < 225$ y $P(10) = -100 + 180 + 144 = 224 < 225$ ✓.",
            "Vertex $(9, 225)$: with 9 trees sold the maximum daily profit is 225. Check: $P(9) = 225$ ✓; neighbours: $P(8) = -64 + 144 + 144 = 224 < 225$ and $P(10) = -100 + 180 + 144 = 224 < 225$ ✓.",
          ),
        ],
      };
    },
  ),
];
