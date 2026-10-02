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
];
