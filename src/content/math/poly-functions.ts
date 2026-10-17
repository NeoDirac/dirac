/**
 * MATH · Linear, Quadratic & Polynomial Functions
 *
 * Graphs, intercepts, transformations, modeling and model comparison.
 * Includes function-graph diagrams (vertex reading, y-intercept reading).
 */

import { template, L, step } from "@/lib/problem";
import type { ProblemTemplate, McOption } from "@/lib/types";

/** "(x - 3)" / "(x + 2)" built from a root r (meaning x - r). */
const xMinus = (r: number): string => (r >= 0 ? `x - ${r}` : `x + ${-r}`);

/** signed term: "+ 3" / "- 3" */
const pmTerm = (n: number): string => (n >= 0 ? `+ ${n}` : `- ${-n}`);

/** LaTeX coefficient in front of a variable term: 1 → "", -1 → "-", 3 → "3" */
const coef = (c: number): string => (c === 1 ? "" : c === -1 ? "-" : `${c}`);

export const templates: ProblemTemplate[] = [
  /* ---------------------------------------------------------------- */
  /* Intercepts: y-intercept from factored form                       */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pfn-int-01",
      subject: "math",
      topicId: "poly-functions",
      subtopicId: "intercepts",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 90,
      tags: ["intercepts", "quadratics"],
      prerequisites: ["quadratics"],
    },
    (rng) => {
      const p = rng.nonZeroInt(-6, 6);
      const q = rng.intExcluding(-6, 6, [0, p]);
      const value = p * q;
      return {
        skill: L("Ordenada en el origen de una cuadrática", "y-intercept of a quadratic"),
        statement: L(
          `La parábola $f(x) = (${xMinus(p)})(${xMinus(q)})$ corta al eje $y$ en un punto. ¿Cuál es la ordenada de ese punto (el valor de $f(0)$)?`,
          `The parabola $f(x) = (${xMinus(p)})(${xMinus(q)})$ crosses the $y$-axis at one point. What is the ordinate of that point (the value of $f(0)$)?`,
        ),
        answer: { kind: "numeric", value },
        hints: [
          L(
            "El corte con el eje $y$ ocurre donde $x = 0$: evalúa $f(0)$.",
            "The $y$-intercept occurs where $x = 0$: evaluate $f(0)$.",
          ),
          L(
            "Sustituye $x = 0$ en cada factor.",
            "Substitute $x = 0$ into each factor.",
          ),
          L(
            "Cada factor cambia de signo; multiplica aplicando la ley de los signos.",
            "Each factor flips its sign; multiply applying the sign rules.",
          ),
        ],
        answerDisplay: L(`$f(0) = ${value}$`, `$f(0) = ${value}$`),
        solution: [
          step(
            "given",
            `$f(x) = (${xMinus(p)})(${xMinus(q)})$`,
            `$f(x) = (${xMinus(p)})(${xMinus(q)})$`,
          ),
          step(
            "approach",
            "La ordenada en el origen se obtiene evaluando la función en $x = 0$.",
            "The y-intercept is found by evaluating the function at $x = 0$.",
          ),
          step(
            "calculation",
            `$f(0) = (${-p})(${-q}) = ${-p} \\cdot ${-q} = ${value}$`,
            `$f(0) = (${-p})(${-q}) = ${-p} \\cdot ${-q} = ${value}$`,
          ),
          step(
            "result",
            `La parábola corta al eje $y$ en el punto $(0, ${value})$.`,
            `The parabola crosses the $y$-axis at $(0, ${value})$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Graphs: end behavior (MC)                                        */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pfn-end-01",
      subject: "math",
      topicId: "poly-functions",
      subtopicId: "graphs",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 90,
      tags: ["end-behavior", "polynomials", "graphs"],
      prerequisites: ["polynomials"],
    },
    (rng) => {
      const even = rng.bool();
      const n = even ? rng.pick([4, 6]) : rng.pick([3, 5]);
      const lead = rng.nonZeroInt(2, 5) * (rng.bool() ? 1 : -1);
      const b = rng.nonZeroInt(-7, 7);
      const c = rng.nonZeroInt(-9, 9);
      const correctIdx = lead > 0 ? (even ? 0 : 1) : (even ? 3 : 2);
      const opt = (up1: boolean, up2: boolean): string =>
        `$x \\to +\\infty:\\ f(x) \\to ${up1 ? "+" : "-"}\\infty$ ; $x \\to -\\infty:\\ f(x) \\to ${up2 ? "+" : "-"}\\infty$`;
      const options: McOption[] = [
        { id: "a", text: L(opt(true, true), opt(true, true)), correct: correctIdx === 0 },
        { id: "b", text: L(opt(true, false), opt(true, false)), correct: correctIdx === 1 },
        { id: "c", text: L(opt(false, true), opt(false, true)), correct: correctIdx === 2 },
        { id: "d", text: L(opt(false, false), opt(false, false)), correct: correctIdx === 3 },
      ];
      return {
        skill: L("Comportamiento en los extremos", "End behavior"),
        statement: L(
          `Sin graficar, determina el comportamiento de $f(x) = ${lead}x^{${n}} ${pmTerm(b)}x^{2} ${pmTerm(c)}$ cuando $x \\to +\\infty$ y cuando $x \\to -\\infty$.`,
          `Without graphing, determine the behavior of $f(x) = ${lead}x^{${n}} ${pmTerm(b)}x^{2} ${pmTerm(c)}$ as $x \\to +\\infty$ and as $x \\to -\\infty$.`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El comportamiento en los extremos lo decide el término de mayor grado.",
            "End behavior is governed by the highest-degree term.",
          ),
          L(
            `Solo importa $${lead}x^{${n}}$: mira el signo del coeficiente y si el exponente es par o impar.`,
            `Only $${lead}x^{${n}}$ matters: look at the sign of the coefficient and whether the exponent is even or odd.`,
          ),
          L(
            `Con $x$ muy grande en valor absoluto, el signo de $x^{${n}}$ es ${even ? "positivo en ambos extremos" : "positivo si $x > 0$ y negativo si $x < 0$"}.`,
            `For large $|x|$, the sign of $x^{${n}}$ is ${even ? "positive at both ends" : "positive for $x > 0$ and negative for $x < 0$"}.`,
          ),
        ],
        answerDisplay: L(opt(lead > 0, even ? lead > 0 : lead < 0), opt(lead > 0, even ? lead > 0 : lead < 0)),
        solution: [
          step(
            "given",
            `$f(x) = ${lead}x^{${n}} ${pmTerm(b)}x^{2} ${pmTerm(c)}$`,
            `$f(x) = ${lead}x^{${n}} ${pmTerm(b)}x^{2} ${pmTerm(c)}$`,
          ),
          step(
            "approach",
            "El término dominante gobierna el comportamiento en los extremos; los términos de menor grado se vuelven despreciables.",
            "The leading term governs end behavior; lower-degree terms become negligible.",
          ),
          step(
            "calculation",
            `Término dominante: $${lead}x^{${n}}$ — grado ${n} (${even ? "par" : "impar"}), coeficiente ${lead > 0 ? "positivo" : "negativo"}.<br>$x \\to +\\infty$: $x^{${n}} > 0 \\Rightarrow f(x) \\to ${lead > 0 ? "+\\infty" : "-\\infty"}$<br>$x \\to -\\infty$: $x^{${n}} ${even ? "> 0" : "< 0"} \\Rightarrow f(x) \\to ${even ? (lead > 0 ? "+\\infty" : "-\\infty") : lead > 0 ? "-\\infty" : "+\\infty"}$`,
            `Leading term: $${lead}x^{${n}}$ — degree ${n} (${even ? "even" : "odd"}), coefficient ${lead > 0 ? "positive" : "negative"}.<br>$x \\to +\\infty$: $x^{${n}} > 0 \\Rightarrow f(x) \\to ${lead > 0 ? "+\\infty" : "-\\infty"}$<br>$x \\to -\\infty$: $x^{${n}} ${even ? "> 0" : "< 0"} \\Rightarrow f(x) \\to ${even ? (lead > 0 ? "+\\infty" : "-\\infty") : lead > 0 ? "-\\infty" : "+\\infty"}$`,
          ),
          step(
            "result",
            opt(lead > 0, even ? lead > 0 : lead < 0),
            opt(lead > 0, even ? lead > 0 : lead < 0),
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Graphs + diagram: read the y-intercept of a parabola             */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pfn-graph-02",
      subject: "math",
      topicId: "poly-functions",
      subtopicId: "intercepts",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 90,
      tags: ["graphs", "intercepts", "reading-graphs"],
      prerequisites: ["quadratics"],
    },
    (rng) => {
      const a = rng.pick([1, -1]);
      const h = rng.nonZeroInt(-2, 2);
      const k = rng.int(-4, 4);
      const value = a * h * h + k;
      const fnStr = `${a}*(x ${h >= 0 ? "-" : "+"} ${Math.abs(h)})^2 ${k >= 0 ? "+" : "-"} ${Math.abs(k)}`;
      return {
        skill: L("Leer cortes en la gráfica", "Reading intercepts from a graph"),
        statement: L(
          "La gráfica muestra la parábola $g$ con su vértice marcado. ¿En qué valor de $y$ corta la parábola al eje vertical? Escribe solo la ordenada (el valor de $g(0)$).",
          "The graph shows the parabola $g$ with its vertex marked. At what $y$ value does the parabola cross the vertical axis? Write only the ordinate (the value of $g(0)$).",
        ),
        diagram: {
          kind: "function-graph",
          xMin: -7,
          xMax: 7,
          yMin: -9,
          yMax: 9,
          curves: [{ fn: fnStr, color: "primary" }],
          points: [{ x: h, y: k, label: `(${h}, ${k})` }],
          showGrid: true,
          xLabel: "x",
          yLabel: "y",
        },
        diagramLabel: L(
          `Parábola con vértice en (${h}, ${k}).`,
          `Parabola with vertex at (${h}, ${k}).`,
        ),
        answer: { kind: "numeric", value },
        hints: [
          L(
            "El corte con el eje $y$ ocurre en $x = 0$.",
            "The crossing with the $y$-axis happens at $x = 0$.",
          ),
          L(
            "Sigue el eje vertical desde el origen hasta encontrar la curva.",
            "Follow the vertical axis from the origin until you meet the curve.",
          ),
          L(
            "Cuenta los cuadrados de la cuadrícula: la ordenada es un número entero.",
            "Count the grid squares: the ordinate is a whole number.",
          ),
        ],
        answerDisplay: L(`$g(0) = ${value}$`, `$g(0) = ${value}$`),
        solution: [
          step(
            "given",
            `Parábola con vértice en $(${h}, ${k})$.`,
            `Parabola with vertex at $(${h}, ${k})$.`,
          ),
          step(
            "approach",
            "El corte con el eje $y$ se lee en la recta vertical $x = 0$.",
            "The $y$-intercept is read on the vertical line $x = 0$.",
          ),
          step(
            "calculation",
            `En $x = 0$ la curva pasa por el punto $(0, ${value})$.<br>Comprobación algebraica: $g(0) = ${a}(0 ${h >= 0 ? "-" : "+"} ${Math.abs(h)})^{2} ${k >= 0 ? "+" : "-"} ${Math.abs(k)} = ${a} \\cdot ${h * h} ${k >= 0 ? "+" : "-"} ${Math.abs(k)} = ${value}$`,
            `At $x = 0$ the curve passes through $(0, ${value})$.<br>Algebraic check: $g(0) = ${a}(0 ${h >= 0 ? "-" : "+"} ${Math.abs(h)})^{2} ${k >= 0 ? "+" : "-"} ${Math.abs(k)} = ${a} \\cdot ${h * h} ${k >= 0 ? "+" : "-"} ${Math.abs(k)} = ${value}$`,
          ),
          step(
            "result",
            `La parábola corta al eje $y$ en $(0, ${value})$.`,
            `The parabola crosses the $y$-axis at $(0, ${value})$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Intercepts: vertex form → x-intercepts                           */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pfn-int-02",
      subject: "math",
      topicId: "poly-functions",
      subtopicId: "intercepts",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 150,
      tags: ["intercepts", "vertex-form"],
      prerequisites: ["quadratics"],
    },
    (rng) => {
      const a = rng.pick([1, 2]);
      const t = rng.pick([1, 2, 3]);
      const h = rng.nonZeroInt(-5, 5);
      const k = -a * t * t;
      const value = h + t;
      return {
        skill: L("Cortes con el eje x desde la forma de vértice", "x-intercepts from vertex form"),
        statement: L(
          `La parábola $f(x) = ${a}(${xMinus(h)})^{2} - ${a * t * t}$ corta al eje $x$ en dos puntos. ¿Cuál es la abscisa del corte situado más a la derecha?`,
          `The parabola $f(x) = ${a}(${xMinus(h)})^{2} - ${a * t * t}$ crosses the $x$-axis at two points. What is the abscissa of the rightmost crossing?`,
        ),
        answer: { kind: "numeric", value },
        hints: [
          L(
            "En los cortes con el eje $x$ se cumple $f(x) = 0$.",
            "At the $x$-axis crossings, $f(x) = 0$.",
          ),
          L(
            `Despeja el cuadrado: $(${xMinus(h)})^{2} = ${t * t}$, que es un cuadrado perfecto.`,
            `Isolate the square: $(${xMinus(h)})^{2} = ${t * t}$, which is a perfect square.`,
          ),
          L(
            `La ecuación $(${xMinus(h)}) = \\pm ${t}$ da dos soluciones simétricas respecto a $x = ${h}$.`,
            `The equation $(${xMinus(h)}) = \\pm ${t}$ gives two solutions symmetric about $x = ${h}$.`,
          ),
        ],
        answerDisplay: L(`$x = ${h + t}$`, `$x = ${h + t}$`),
        solution: [
          step(
            "given",
            `$f(x) = ${a}(${xMinus(h)})^{2} - ${a * t * t}$`,
            `$f(x) = ${a}(${xMinus(h)})^{2} - ${a * t * t}$`,
          ),
          step(
            "approach",
            "Cortes con el eje $x$: resolvemos $f(x) = 0$.",
            "$x$-axis crossings: solve $f(x) = 0$.",
          ),
          step(
            "calculation",
            `$${a}(${xMinus(h)})^{2} - ${a * t * t} = 0$<br>$(${xMinus(h)})^{2} = ${t * t}$<br>$${xMinus(h)} = \\pm ${t}$<br>$x = ${h} \\pm ${t}$`,
            `$${a}(${xMinus(h)})^{2} - ${a * t * t} = 0$<br>$(${xMinus(h)})^{2} = ${t * t}$<br>$${xMinus(h)} = \\pm ${t}$<br>$x = ${h} \\pm ${t}$`,
          ),
          step(
            "result",
            `Los cortes son $(${h - t}, 0)$ y $(${h + t}, 0)$; el más a la derecha es $x = ${h + t}$.`,
            `The crossings are $(${h - t}, 0)$ and $(${h + t}, 0)$; the rightmost one is $x = ${h + t}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Graphs + diagram: parabola → equation (MC)                       */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pfn-graph-01",
      subject: "math",
      topicId: "poly-functions",
      subtopicId: "graphs",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["graphs", "vertex-form", "reading-graphs"],
      prerequisites: ["quadratics"],
    },
    (rng) => {
      const a = rng.pick([1, -1]);
      const h = rng.nonZeroInt(-3, 3);
      const k = rng.nonZeroInt(-4, 4);
      const fnStr = `${a}*(x ${h >= 0 ? "-" : "+"} ${Math.abs(h)})^2 ${k >= 0 ? "+" : "-"} ${Math.abs(k)}`;
      const eqLat = (cc: number, hh: number, kk: number): string =>
        `$y = ${coef(cc)}(${xMinus(hh)})^{2} ${kk >= 0 ? "+" : "-"} ${Math.abs(kk)}$`;
      const options: McOption[] = [
        { id: "a", text: L(eqLat(a, h, k), eqLat(a, h, k)), correct: true },
        { id: "b", text: L(eqLat(-a, h, k), eqLat(-a, h, k)), correct: false },
        { id: "c", text: L(eqLat(a, -h, k), eqLat(a, -h, k)), correct: false },
        { id: "d", text: L(eqLat(a, h, -k), eqLat(a, h, -k)), correct: false },
      ];
      return {
        skill: L("Identificar la ecuación de una parábola", "Identifying a parabola's equation"),
        statement: L(
          "La gráfica muestra una parábola con su vértice marcado y un punto adicional. ¿Qué ecuación la representa?",
          "The graph shows a parabola with its vertex marked and one extra point. Which equation represents it?",
        ),
        diagram: {
          kind: "function-graph",
          xMin: -7,
          xMax: 7,
          yMin: -10,
          yMax: 10,
          curves: [{ fn: fnStr, color: "primary" }],
          points: [
            { x: h, y: k, label: `(${h}, ${k})` },
            { x: h + 1, y: k + a, label: `(${h + 1}, ${k + a})` },
          ],
          showGrid: true,
          xLabel: "x",
          yLabel: "y",
        },
        diagramLabel: L(
          `Parábola con vértice en (${h}, ${k}) que pasa por (${h + 1}, ${k + a}).`,
          `Parabola with vertex at (${h}, ${k}) passing through (${h + 1}, ${k + a}).`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "La forma de vértice es $y = a(x - h)^{2} + k$ con vértice en $(h, k)$.",
            "Vertex form is $y = a(x - h)^{2} + k$ with vertex at $(h, k)$.",
          ),
          L(
            `El vértice marcado es $(${h}, ${k})$: eso fija $h$ y $k$.`,
            `The marked vertex is $(${h}, ${k})$: that fixes $h$ and $k$.`,
          ),
          L(
            `Sustituye el segundo punto $(${h + 1}, ${k + a})$ para decidir el valor de $a$.`,
            `Substitute the second point $(${h + 1}, ${k + a})$ to decide the value of $a$.`,
          ),
        ],
        answerDisplay: L(eqLat(a, h, k), eqLat(a, h, k)),
        solution: [
          step(
            "given",
            `Vértice: $(${h}, ${k})$. Punto adicional: $(${h + 1}, ${k + a})$.`,
            `Vertex: $(${h}, ${k})$. Extra point: $(${h + 1}, ${k + a})$.`,
          ),
          step(
            "approach",
            "Usamos la forma de vértice $y = a(x - h)^{2} + k$ y hallamos $a$ con el segundo punto.",
            "Use vertex form $y = a(x - h)^{2} + k$ and find $a$ from the second point.",
          ),
          step(
            "calculation",
            `$h = ${h}$, $k = ${k}$ (del vértice)<br>$y = a(${xMinus(h)})^{2} ${k >= 0 ? "+" : "-"} ${Math.abs(k)}$<br>Sustituyendo $(${h + 1}, ${k + a})$: $${k + a} = a(${h + 1} - (${h}))^{2} ${k >= 0 ? "+" : "-"} ${Math.abs(k)} = a \\cdot 1 ${k >= 0 ? "+" : "-"} ${Math.abs(k)}$<br>$a = ${a}$ (la parábola ${a > 0 ? "abre hacia arriba" : "abre hacia abajo"})`,
            `$h = ${h}$, $k = ${k}$ (from the vertex)<br>$y = a(${xMinus(h)})^{2} ${k >= 0 ? "+" : "-"} ${Math.abs(k)}$<br>Substituting $(${h + 1}, ${k + a})$: $${k + a} = a(${h + 1} - (${h}))^{2} ${k >= 0 ? "+" : "-"} ${Math.abs(k)} = a \\cdot 1 ${k >= 0 ? "+" : "-"} ${Math.abs(k)}$<br>$a = ${a}$ (the parabola opens ${a > 0 ? "upward" : "downward"})`,
          ),
          step("result", eqLat(a, h, k), eqLat(a, h, k)),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Transformations: identify the shift (MC)                         */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pfn-trans-01",
      subject: "math",
      topicId: "poly-functions",
      subtopicId: "transformations",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["transformations", "vertex-form"],
      prerequisites: ["quadratics"],
    },
    (rng) => {
      const p = rng.int(1, 5);
      const q = rng.int(1, 6);
      const mk = (left: boolean, up: boolean): string =>
        `$${p}$ unidades a la ${left ? "izquierda" : "derecha"} y $${q}$ hacia ${up ? "arriba" : "abajo"}`;
      const mkEn = (left: boolean, up: boolean): string =>
        `$${p}$ units to the ${left ? "left" : "right"} and $${q}$ ${up ? "up" : "down"}`;
      const options: McOption[] = [
        { id: "a", text: L(mk(true, true), mkEn(true, true)), correct: true },
        { id: "b", text: L(mk(false, true), mkEn(false, true)), correct: false },
        { id: "c", text: L(mk(true, false), mkEn(true, false)), correct: false },
        { id: "d", text: L(mk(false, false), mkEn(false, false)), correct: false },
      ];
      return {
        skill: L("Traslaciones de una parábola", "Translations of a parabola"),
        statement: L(
          `La gráfica de $f(x) = x^{2}$ se transforma en la de $g(x) = (x + ${p})^{2} + ${q}$. ¿Qué traslación se ha aplicado?`,
          `The graph of $f(x) = x^{2}$ is transformed into $g(x) = (x + ${p})^{2} + ${q}$. Which translation was applied?`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Compara con la forma $y = (x - h)^{2} + k$ respecto a $y = x^{2}$.",
            "Compare with the form $y = (x - h)^{2} + k$ relative to $y = x^{2}$.",
          ),
          L(
            "Dentro del paréntesis, **sumar** desplaza a la izquierda (el signo se invierte).",
            "Inside the parentheses, **adding** shifts to the left (the sign flips).",
          ),
          L(
            "Fuera del paréntesis, sumar desplaza hacia arriba.",
            "Outside the parentheses, adding shifts upward.",
          ),
        ],
        answerDisplay: L(mk(true, true), mkEn(true, true)),
        solution: [
          step(
            "given",
            `$g(x) = (x + ${p})^{2} + ${q} = (x - (-${p}))^{2} + ${q}$`,
            `$g(x) = (x + ${p})^{2} + ${q} = (x - (-${p}))^{2} + ${q}$`,
          ),
          step(
            "approach",
            "En la forma $y = a(x - h)^{2} + k$, $h$ desplaza en horizontal y $k$ en vertical.",
            "In $y = a(x - h)^{2} + k$, $h$ shifts horizontally and $k$ vertically.",
          ),
          step(
            "calculation",
            `$h = -${p} \\Rightarrow$ ${p} unidades a la izquierda<br>$k = ${q} \\Rightarrow$ ${q} unidades hacia arriba`,
            `$h = -${p} \\Rightarrow$ ${p} units to the left<br>$k = ${q} \\Rightarrow$ ${q} units up`,
          ),
          step(
            "result",
            `La parábola se traslada ${p} unidades a la izquierda y ${q} hacia arriba.`,
            `The parabola is shifted ${p} units to the left and ${q} up.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Modeling: rectangle of maximum area                               */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pfn-model-02",
      subject: "math",
      topicId: "poly-functions",
      subtopicId: "modeling",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 180,
      tags: ["modeling", "optimization", "word-problems"],
      prerequisites: ["quadratics"],
    },
    (rng) => {
      const P = rng.pick([24, 32, 40, 48]);
      const value = P / 4;
      return {
        skill: L("Modelizar un área máxima", "Modeling a maximum area"),
        statement: L(
          `Tienes $${P}\\ \\text{m}$ de valla para cerrar un jardín rectangular. Si un lado mide $x$ metros, el otro mide $${P / 2} - x$. ¿Para qué valor de $x$ es máxima el área?`,
          `You have $${P}\\ \\text{m}$ of fence to enclose a rectangular garden. If one side is $x$ metres, the other is $${P / 2} - x$. For which value of $x$ is the area maximized?`,
        ),
        answer: { kind: "numeric", value, unitSuffix: "m" },
        hints: [
          L(
            `Escribe el área como función de $x$: $A(x) = x(${P / 2} - x)$.`,
            `Write the area as a function of $x$: $A(x) = x(${P / 2} - x)$.`,
          ),
          L(
            "Es una parábola que abre hacia abajo: el máximo está en el vértice.",
            "It is a downward-opening parabola: the maximum is at the vertex.",
          ),
          L(
            `Usa $x_{v} = \\frac{-b}{2a}$ con $a = -1$ y $b = ${P / 2}$.`,
            `Use $x_{v} = \\frac{-b}{2a}$ with $a = -1$ and $b = ${P / 2}$.`,
          ),
        ],
        answerDisplay: L(`$x = ${value}\\ \\text{m}$`, `$x = ${value}\\ \\text{m}$`),
        solution: [
          step(
            "given",
            `Perímetro: $${P}\\ \\text{m}$. Lados: $x$ y $${P / 2} - x$.`,
            `Perimeter: $${P}\\ \\text{m}$. Sides: $x$ and $${P / 2} - x$.`,
          ),
          step(
            "approach",
            "Modelizamos el área con una función cuadrática y buscamos su vértice.",
            "Model the area with a quadratic function and locate its vertex.",
          ),
          step(
            "calculation",
            `$A(x) = x(${P / 2} - x) = -x^{2} + ${P / 2}x$<br>$x_{v} = \\frac{-(${P / 2})}{2 \\cdot (-1)} = ${value}$`,
            `$A(x) = x(${P / 2} - x) = -x^{2} + ${P / 2}x$<br>$x_{v} = \\frac{-(${P / 2})}{2 \\cdot (-1)} = ${value}$`,
          ),
          step(
            "result",
            `El área es máxima cuando $x = ${value}\\ \\text{m}$: un cuadrado de $${value} \\times ${value}\\ \\text{m}$.`,
            `The area is maximized when $x = ${value}\\ \\text{m}$: a $${value} \\times ${value}\\ \\text{m}$ square.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Transformations: write the transformed equation (expression)      */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pfn-trans-02",
      subject: "math",
      topicId: "poly-functions",
      subtopicId: "transformations",
      difficulty: "hard",
      questionType: "expression",
      estimatedTimeSec: 210,
      tags: ["transformations", "vertex-form"],
      prerequisites: ["quadratics"],
    },
    (rng) => {
      const a = rng.pick([2, 3]);
      const h = rng.int(1, 5);
      const k = rng.int(1, 6);
      const c = a * h * h - k;
      const expanded =
        c === 0
          ? `${a}x^2 ${pmTerm(-2 * a * h)}x`
          : `${a}x^2 ${pmTerm(-2 * a * h)}x ${pmTerm(c)}`;
      return {
        skill: L("Escribir la ecuación transformada", "Writing the transformed equation"),
        statement: L(
          `La gráfica de $f(x) = x^{2}$ se desplaza $${h}$ unidades a la derecha y $${k}$ hacia abajo, y después se estira verticalmente por un factor de $${a}$. Escribe la ecuación de $g(x)$ (por ejemplo: 2*(x-6)^2-7).`,
          `The graph of $f(x) = x^{2}$ is shifted $${h}$ units right and $${k}$ down, and then stretched vertically by a factor of $${a}$. Write the equation of $g(x)$ (e.g. 2*(x-6)^2-7).`,
        ),
        answer: {
          kind: "expression",
          accepted: [`${a}*(x-${h})^2-${k}`, `${a}(x-${h})^2-${k}`, expanded],
          variables: ["x"],
        },
        hints: [
          L(
            "Parte de la forma general $g(x) = a(x - h)^{2} + k$.",
            "Start from the general form $g(x) = a(x - h)^{2} + k$.",
          ),
          L(
            `Traslación de $${h}$ a la derecha y $${k}$ hacia abajo fijan $h$ y $k$.`,
            `A shift of $${h}$ right and $${k}$ down fix $h$ and $k$.`,
          ),
          L(
            "El estirado vertical multiplica al paréntesis **completo**, no solo al último término.",
            "The vertical stretch multiplies the **whole** parenthesized term, not just the last term.",
          ),
        ],
        answerDisplay: L(
          `$g(x) = ${a}(x - ${h})^{2} - ${k}$`,
          `$g(x) = ${a}(x - ${h})^{2} - ${k}$`,
        ),
        solution: [
          step(
            "given",
            `Traslación: $${h}$ a la derecha, $${k}$ hacia abajo. Estirado vertical: factor $${a}$.`,
            `Shift: $${h}$ right, $${k}$ down. Vertical stretch: factor $${a}$.`,
          ),
          step(
            "approach",
            "Cada transformación actúa sobre la forma de vértice $y = a(x - h)^{2} + k$.",
            "Each transformation acts on the vertex form $y = a(x - h)^{2} + k$.",
          ),
          step(
            "calculation",
            `$g(x) = ${a}(x - ${h})^{2} + (-${k})$<br>$g(x) = ${a}(x - ${h})^{2} - ${k}$<br>Forma expandida equivalente: $g(x) = ${expanded}$`,
            `$g(x) = ${a}(x - ${h})^{2} + (-${k})$<br>$g(x) = ${a}(x - ${h})^{2} - ${k}$<br>Equivalent expanded form: $g(x) = ${expanded}$`,
          ),
          step(
            "result",
            `$g(x) = ${a}(x - ${h})^{2} - ${k}$`,
            `$g(x) = ${a}(x - ${h})^{2} - ${k}$`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Modeling: maximum height of a projectile                          */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pfn-model-01",
      subject: "math",
      topicId: "poly-functions",
      subtopicId: "modeling",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 210,
      tags: ["modeling", "projectile", "vertex"],
      prerequisites: ["quadratics"],
    },
    (rng) => {
      const k = rng.int(1, 4);
      const v0 = 10 * k;
      const value = 5 * k * k;
      return {
        skill: L("Altura máxima de un lanzamiento", "Maximum height of a projectile"),
        statement: L(
          `Desde el suelo se lanza una pelota hacia arriba. Su altura en metros tras $t$ segundos es $h(t) = -5t^{2} + ${v0}t$. ¿Qué altura máxima alcanza?`,
          `A ball is thrown straight up from the ground. Its height in metres after $t$ seconds is $h(t) = -5t^{2} + ${v0}t$. What maximum height does it reach?`,
        ),
        answer: { kind: "numeric", value, unitSuffix: "m" },
        hints: [
          L(
            "La altura máxima ocurre en el vértice de la parábola.",
            "The maximum height occurs at the vertex of the parabola.",
          ),
          L(
            `El tiempo del vértice es $t_{v} = \\frac{-b}{2a}$ con $a = -5$ y $b = ${v0}$.`,
            `The vertex time is $t_{v} = \\frac{-b}{2a}$ with $a = -5$ and $b = ${v0}$.`,
          ),
          L(
            "Una vez tienes $t_{v}$, evalúa $h(t_{v})$.",
            "Once you have $t_{v}$, evaluate $h(t_{v})$.",
          ),
        ],
        answerDisplay: L(`$h_{\\max} = ${value}\\ \\text{m}$`, `$h_{\\max} = ${value}\\ \\text{m}$`),
        solution: [
          step(
            "given",
            `$h(t) = -5t^{2} + ${v0}t$`,
            `$h(t) = -5t^{2} + ${v0}t$`,
          ),
          step(
            "approach",
            "La parábola abre hacia abajo: el vértice da el tiempo y la altura máximos.",
            "The parabola opens downward: the vertex gives the time and value of the maximum.",
          ),
          step(
            "calculation",
            `$t_{v} = \\frac{-${v0}}{2 \\cdot (-5)} = ${k}$<br>$h(${k}) = -5 \\cdot ${k * k} + ${v0} \\cdot ${k} = ${-5 * k * k} + ${v0 * k} = ${value}$`,
            `$t_{v} = \\frac{-${v0}}{2 \\cdot (-5)} = ${k}$<br>$h(${k}) = -5 \\cdot ${k * k} + ${v0} \\cdot ${k} = ${-5 * k * k} + ${v0 * k} = ${value}$`,
          ),
          step(
            "result",
            `La altura máxima es $${value}\\ \\text{m}$, alcanzada en $t = ${k}\\ \\text{s}$.`,
            `The maximum height is $${value}\\ \\text{m}$, reached at $t = ${k}\\ \\text{s}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Comparisons: when does the quadratic overtake the linear model    */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pfn-comp-01",
      subject: "math",
      topicId: "poly-functions",
      subtopicId: "comparisons",
      difficulty: "challenge",
      questionType: "numeric",
      estimatedTimeSec: 300,
      tags: ["comparisons", "inequalities", "quadratics"],
      prerequisites: ["quadratics"],
    },
    (rng) => {
      const m = rng.int(2, 5);
      const r = rng.int(m + 3, Math.min(m + 8, 12));
      const c = r * (r - m);
      const value = r + 1;
      return {
        skill: L("Comparar un modelo lineal y uno cuadrático", "Comparing a linear and a quadratic model"),
        statement: L(
          `Se comparan dos modelos: $f(x) = ${m}x + ${c}$ (lineal) y $g(x) = x^{2}$ (cuadrático). ¿Para qué valor entero positivo de $x$ se cumple **por primera vez** que $g(x) > f(x)$?`,
          `Two models are compared: $f(x) = ${m}x + ${c}$ (linear) and $g(x) = x^{2}$ (quadratic). For which positive integer $x$ does $g(x) > f(x)$ hold **for the first time**?`,
        ),
        answer: { kind: "numeric", value },
        hints: [
          L(
            "Plantea la igualdad $x^{2} = " + m + "x + " + c + "$ para localizar el punto de cruce.",
            `Set up the equality $x^{2} = ${m}x + ${c}$ to locate the crossing point.`,
          ),
          L(
            "Pasa todos los términos a un lado y factoriza el trinomio.",
            "Move every term to one side and factor the trinomial.",
          ),
          L(
            "Comprueba qué ocurre exactamente en las raíces y justo después de la mayor.",
            "Check what happens exactly at the roots and just after the larger one.",
          ),
        ],
        answerDisplay: L(`$x = ${value}$`, `$x = ${value}$`),
        solution: [
          step(
            "given",
            `$f(x) = ${m}x + ${c}$, $g(x) = x^{2}$`,
            `$f(x) = ${m}x + ${c}$, $g(x) = x^{2}$`,
          ),
          step(
            "approach",
            "Resolvemos $g(x) = f(x)$ para encontrar los cruces y estudiamos el signo de $g - f$ después del mayor.",
            "Solve $g(x) = f(x)$ to find the crossings, then study the sign of $g - f$ after the larger one.",
          ),
          step(
            "calculation",
            `$x^{2} = ${m}x + ${c}$<br>$x^{2} - ${m}x - ${c} = 0$<br>$(x - ${r})(x + ${r - m}) = 0$<br>$x = ${r}$ o $x = ${m - r}$<br>En $x = ${r}$: $g = f = ${r * r}$. Para $0 < x < ${r}$: $g(x) < f(x)$.<br>$g(${r + 1}) = ${(r + 1) * (r + 1)} > f(${r + 1}) = ${m * (r + 1) + c}$`,
            `$x^{2} = ${m}x + ${c}$<br>$x^{2} - ${m}x - ${c} = 0$<br>$(x - ${r})(x + ${r - m}) = 0$<br>$x = ${r}$ or $x = ${m - r}$<br>At $x = ${r}$: $g = f = ${r * r}$. For $0 < x < ${r}$: $g(x) < f(x)$.<br>$g(${r + 1}) = ${(r + 1) * (r + 1)} > f(${r + 1}) = ${m * (r + 1) + c}$`,
          ),
          step(
            "result",
            `Los modelos empatan en $x = ${r}$; el primer entero con $g(x) > f(x)$ es $x = ${r + 1}$.`,
            `The models tie at $x = ${r}$; the first integer with $g(x) > f(x)$ is $x = ${r + 1}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Curated — hoja de clase del tutor (FP notes, p. 4): |·| vs        */
  /* parábola con análisis por ramas. Fixed problem (as printed;       */
  /* decimals written as fractions, the tutor's own worked notation). */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pfn-grap-01",
      subject: "math",
      topicId: "poly-functions",
      subtopicId: "graphs",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["absolute-value", "parabola", "case-analysis", "graphical"],
      prerequisites: ["graphs", "quadratics"],
      source: {
        sourceId: "tutor-fp-sheet-2024",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "3",
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L("$(-1,\\; 2) \\cup (4,\\; 7)$", "$(-1,\\; 2) \\cup (4,\\; 7)$"),
          correct: true,
        },
        {
          id: "b",
          text: L("$(-\\infty,\\; -1) \\cup (2,\\; 4) \\cup (7,\\; \\infty)$", "$(-\\infty,\\; -1) \\cup (2,\\; 4) \\cup (7,\\; \\infty)$"),
          correct: false,
        },
        {
          id: "c",
          text: L("$(2,\\; 4)$", "$(2,\\; 4)$"),
          correct: false,
        },
        {
          id: "d",
          text: L("$(-1,\\; 7)$", "$(-1,\\; 7)$"),
          correct: false,
        },
      ];
      return {
        skill: L("Valor absoluto frente a parábola: región por ramas", "Absolute value against a parabola: region by branches"),
        statement: L(
            "Determina analíticamente el conjunto de los $x$ para los que $$f(x) > g(x), \\quad f(x) = \\left|\\frac{5}{2}x - \\frac{15}{2}\\right|, \\quad g(x) = \\frac{1}{2}x^2 - 3x + \\frac{13}{2}.$$ (En clase dibujamos ambas en $[-3;\\, 8]$, sombreados la región $f > g$ y comparamos con el cálculo.)",
            "Determine analytically the set of all $x$ for which $$f(x) > g(x), \\quad f(x) = \\left|\\frac{5}{2}x - \\frac{15}{2}\\right|, \\quad g(x) = \\frac{1}{2}x^2 - 3x + \\frac{13}{2}.$$ (In class we drew both on $[-3;\\, 8]$, shaded the $f > g$ region and compared it with the calculation.)",
          ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L("El vértice de la V está donde se anula el argumento: $\\frac{5}{2}x - \\frac{15}{2} = 0$. Eso parte el eje en dos ramas.", "The vertex of the V sits where the argument vanishes: $\\frac{5}{2}x - \\frac{15}{2} = 0$. That splits the axis into two branches."),
          L("En cada rama escribe $f$ sin valor absoluto, pasa todo a un lado y obtén una **desigualdad cuadrática**; factorízala para leer el signo.", "On each branch write $f$ without the absolute value, move everything to one side and get a **quadratic inequality**; factor it to read the sign."),
          L("Rama $x \\ge 3$: $x^2 - 11x + 28 < 0$, o sea $(x-7)(x-4) < 0$. Rama $x < 3$: $x^2 - x - 2 < 0$, o sea $(x-2)(x+1) < 0$. Interseca cada región con su propia rama.", "Branch $x \\ge 3$: $x^2 - 11x + 28 < 0$, i.e. $(x-7)(x-4) < 0$. Branch $x < 3$: $x^2 - x - 2 < 0$, i.e. $(x-2)(x+1) < 0$. Intersect each region with its own branch.")
        ],
        answerDisplay: L("$(-1,\\; 2) \\cup (4,\\; 7)$", "$(-1,\\; 2) \\cup (4,\\; 7)$"),
        solution: [
          step(
            "given",
            "$f(x) = \\left|\\frac{5}{2}x - \\frac{15}{2}\\right|$ es una V con vértice en $x = 3$; $g(x) = \\frac{1}{2}x^2 - 3x + \\frac{13}{2}$ es una parábola.",
            "$f(x) = \\left|\\frac{5}{2}x - \\frac{15}{2}\\right|$ is a V with vertex at $x = 3$; $g(x) = \\frac{1}{2}x^2 - 3x + \\frac{13}{2}$ is a parabola.",
          ),
          step(
            "approach",
            "Dos ramas ($x \\ge 3$ y $x < 3$). En cada una, $f(x) > g(x)$ se convierte en una desigualdad cuadrática estricta; factorizo, leo la región de signo y al final interseco con la rama.",
            "Two branches ($x \\ge 3$ and $x < 3$). On each, $f(x) > g(x)$ becomes a strict quadratic inequality; I factor it, read the sign region and finally intersect with the branch.",
          ),
          step(
            "calculation",
            "**Rama $x \\ge 3$** ($f = \\frac{5}{2}x - \\frac{15}{2}$): $\\frac{5}{2}x - \\frac{15}{2} > \\frac{1}{2}x^2 - 3x + \\frac{13}{2}$ $\\Rightarrow x^2 - 11x + 28 < 0$, o sea $(x-7)(x-4) < 0 \\Rightarrow x \\in (4,\\, 7)$.<br>**Rama $x < 3$** ($f = -\\frac{5}{2}x + \\frac{15}{2}$): $-\\frac{5}{2}x + \\frac{15}{2} > \\frac{1}{2}x^2 - 3x + \\frac{13}{2}$ $\\Rightarrow x^2 - x - 2 < 0$, o sea $(x-2)(x+1) < 0 \\Rightarrow x \\in (-1,\\, 2)$.<br>En $x = -1, 2, 4, 7$ se tiene exactamente $f = g$ (cortes de las dos curvas), por lo que los cuatro extremos quedan **abiertos**.",
            "**Branch $x \\ge 3$** ($f = \\frac{5}{2}x - \\frac{15}{2}$): $\\frac{5}{2}x - \\frac{15}{2} > \\frac{1}{2}x^2 - 3x + \\frac{13}{2}$ $\\Rightarrow x^2 - 11x + 28 < 0$, i.e. $(x-7)(x-4) < 0 \\Rightarrow x \\in (4,\\, 7)$.<br>**Branch $x < 3$** ($f = -\\frac{5}{2}x + \\frac{15}{2}$): $-\\frac{5}{2}x + \\frac{15}{2} > \\frac{1}{2}x^2 - 3x + \\frac{13}{2}$ $\\Rightarrow x^2 - x - 2 < 0$, i.e. $(x-2)(x+1) < 0 \\Rightarrow x \\in (-1,\\, 2)$.<br>At $x = -1, 2, 4, 7$ we have exactly $f = g$ (crossings of the two curves), so all four endpoints stay **open**.",
          ),
          step(
            "result",
            "$f(x) > g(x) \\iff x \\in (-1,\\; 2) \\cup (4,\\; 7)$. En el gráfico: la V queda por encima de la parábola exactamente en esos dos tramos, con cortes en $x = -1, 2, 4, 7$ (compara con tu sombreado).",
            "$f(x) > g(x) \\iff x \\in (-1,\\; 2) \\cup (4,\\; 7)$. On the graph: the V lies above the parabola exactly on those two stretches, crossing at $x = -1, 2, 4, 7$ (compare with your shading).",
          )
        ],
      };
    },
  ),


  /* ---------------------------------------------------------------- */
  /* Curated Phase 2 — FOS/BOS 2010 HT §3.0 (recta y parábola).       */
  /* Transcribed as printed; verified independently. Fixed problems.  */
  /* ---------------------------------------------------------------- */

  /* 3.1 — recta que corta a la parábola en dos abscisas dadas. */
  template(
    {
      id: "pfn-comp-02",
      subject: "math",
      topicId: "poly-functions",
      subtopicId: "comparisons",
      difficulty: "hard",
      questionType: "expression",
      estimatedTimeSec: 300,
      tags: ["line", "parabola", "intersection", "exam"],
      prerequisites: ["graphs"],
      source: {
        sourceId: "fos-bos-2010-ht",
        license: "OPEN_LICENSE",
        exerciseNumber: "3.1",
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      return {
        skill: L("Recta que corta a una parábola en abscisas dadas (examen real)", "Line cutting a parabola at given abscissas (real exam)"),
        statement: L(
          "La parábola $p$ tiene ecuación $y = (x + 2)^2 + 2$. Una recta $g$ corta a $p$ exactamente en $x = -3$ y en $x = 0$. Halla la ecuación de $g$ (escribe solo el lado derecho, por ejemplo 2x + 3).",
          "The parabola $p$ has equation $y = (x + 2)^2 + 2$. A line $g$ cuts $p$ exactly at $x = -3$ and at $x = 0$. Find the equation of $g$ (write only the right-hand side, e.g. 2x + 3).",
        ),
        diagram: {
          kind: "function-graph",
          xMin: -5,
          xMax: 2,
          yMin: 0,
          yMax: 12,
          curves: [
            { fn: "(x+2)^2+2", color: "primary" },
            { fn: "x+6", color: "secondary", dashed: true },
          ],
          points: [
            { x: -3, y: 3, label: "(-3, 3)" },
            { x: 0, y: 6, label: "(0, 6)" },
          ],
          showGrid: true,
          xLabel: "x",
          yLabel: "y",
        },
        diagramLabel: L(
          "Parábola con vértice en (-2, 2) y recta que la corta en (-3, 3) y (0, 6).",
          "Parabola with vertex at (-2, 2) and a line cutting it at (-3, 3) and (0, 6).",
        ),
        answer: {
          kind: "expression",
          accepted: ["x+6", "x + 6", "1*x+6"],
          variables: ["x"],
        },
        hints: [
          L(
            "Los puntos comunes pertenecen a la parábola **y** a la recta: primero calcula su altura con la parábola.",
            "The common points belong to the parabola **and** the line: first compute their height using the parabola.",
          ),
          L(
            "$p(-3) = (-3+2)^2 + 2 = 3$ y $p(0) = (0+2)^2 + 2 = 6$. Así que $g$ pasa por $(-3, 3)$ y $(0, 6)$.",
            "$p(-3) = (-3+2)^2 + 2 = 3$ and $p(0) = (0+2)^2 + 2 = 6$. So $g$ passes through $(-3, 3)$ and $(0, 6)$.",
          ),
          L(
            "Con dos puntos: pendiente $m = \\frac{6 - 3}{0 - (-3)}$ y ordenada en el origen (el segundo punto está en $x = 0$…).",
            "With two points: slope $m = \\frac{6 - 3}{0 - (-3)}$ and the intercept (the second point sits at $x = 0$…).",
          ),
        ],
        answerDisplay: L("$g:\\ y = x + 6$", "$g:\\ y = x + 6$"),
        solution: [
          step(
            "given",
            "Parábola $p: y = (x+2)^2 + 2$ (vértice $(-2, 2)$, abre hacia arriba); $g$ corta a $p$ en $x = -3$ y $x = 0$.",
            "Parabola $p: y = (x+2)^2 + 2$ (vertex $(-2, 2)$, opens upward); $g$ cuts $p$ at $x = -3$ and $x = 0$.",
          ),
          step(
            "approach",
            "En cada corte las coordenadas coinciden: obtén los dos puntos con la parábola y construye la recta que pasa por ambos.",
            "At each intersection the coordinates agree: get the two points from the parabola and build the line through both.",
          ),
          step(
            "calculation",
            "$p(-3) = (-1)^2 + 2 = 3$ → punto $(-3, 3)$.<br>$p(0) = 2^2 + 2 = 6$ → punto $(0, 6)$.<br>Pendiente: $m = \\dfrac{6 - 3}{0 - (-3)} = \\dfrac{3}{3} = 1$.<br>Ordenada: el punto $(0, 6)$ ya la da: $b = 6$.<br>Así que $g: y = x + 6$.<br>Verificación: $(-3) + 6 = 3$ ✓ y $(0) + 6 = 6$ ✓ — ambos puntos cumplen la recta y la parábola.",
            "$p(-3) = (-1)^2 + 2 = 3$ → point $(-3, 3)$.<br>$p(0) = 2^2 + 2 = 6$ → point $(0, 6)$.<br>Slope: $m = \\dfrac{6 - 3}{0 - (-3)} = \\dfrac{3}{3} = 1$.<br>Intercept: the point $(0, 6)$ gives it directly: $b = 6$.<br>Hence $g: y = x + 6$.<br>Check: $(-3) + 6 = 3$ ✓ and $(0) + 6 = 6$ ✓ — both points satisfy the line and the parabola.",
          ),
          step(
            "result",
            "$g:\\ y = x + 6$. (Intersección algebraica opcional: $(x+2)^2 + 2 = x + 6 \\iff x^2 + 3x = 0 \\iff x(x+3) = 0$ → exactamente $x = -3, 0$ ✓)",
            "$g:\\ y = x + 6$. (Optional algebraic intersection: $(x+2)^2 + 2 = x + 6 \\iff x^2 + 3x = 0 \\iff x(x+3) = 0$ → exactly $x = -3, 0$ ✓)",
          ),
        ],
      };
    },
  ),

  /* 3.2 — intersecciones recta ∩ parábola. */
  template(
    {
      id: "pfn-comp-03",
      subject: "math",
      topicId: "poly-functions",
      subtopicId: "comparisons",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["line", "parabola", "intersection", "exam"],
      prerequisites: ["graphs", "quadratics"],
      source: {
        sourceId: "fos-bos-2010-ht",
        license: "OPEN_LICENSE",
        exerciseNumber: "3.2",
      },
      reasoning: "graphical",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L("$S_1(-1\\,|\\,\\tfrac{7}{4})$ y $S_2(4\\,|\\,-2)$", "$S_1(-1\\,|\\,\\tfrac{7}{4})$ and $S_2(4\\,|\\,-2)$"),
          correct: true,
        },
        {
          id: "b",
          text: L("$S_1(-1\\,|\\,-\\tfrac{7}{4})$ y $S_2(4\\,|\\,2)$", "$S_1(-1\\,|\\,-\\tfrac{7}{4})$ and $S_2(4\\,|\\,2)$"),
          correct: false,
        },
        {
          id: "c",
          text: L("$S_1(1\\,|\\,\\tfrac{7}{4})$ y $S_2(-4\\,|\\,-2)$", "$S_1(1\\,|\\,\\tfrac{7}{4})$ and $S_2(-4\\,|\\,-2)$"),
          correct: false,
        },
        {
          id: "d",
          text: L("$S_1(-1\\,|\\,\\tfrac{7}{4})$ y $S_2(4\\,|\\,2)$", "$S_1(-1\\,|\\,\\tfrac{7}{4})$ and $S_2(4\\,|\\,2)$"),
          correct: false,
        },
      ];
      return {
        skill: L("Intersecciones recta ∩ parábola (examen real)", "Line ∩ parabola intersections (real exam)"),
        statement: L(
          "Calcula las coordenadas de los puntos comunes de la parábola $p: y = -\\frac{1}{4}x^2 + 2$ y la recta $g: y = -\\frac{3}{4}x + 1$.",
          "Compute the coordinates of the common points of the parabola $p: y = -\\frac{1}{4}x^2 + 2$ and the line $g: y = -\\frac{3}{4}x + 1$.",
        ),
        diagram: {
          kind: "function-graph",
          xMin: -3,
          xMax: 6,
          yMin: -4,
          yMax: 4,
          curves: [
            { fn: "-0.25*x^2+2", color: "primary" },
            { fn: "-0.75*x+1", color: "secondary", dashed: true },
          ],
          points: [
            { x: -1, y: 1.75, label: "(-1, 1.75)" },
            { x: 4, y: -2, label: "(4, -2)" },
          ],
          showGrid: true,
          xLabel: "x",
          yLabel: "y",
        },
        diagramLabel: L(
          "Parábola que abre hacia abajo con vértice en (0, 2) y recta decreciente que la corta en dos puntos.",
          "Downward-opening parabola with vertex at (0, 2) and a decreasing line cutting it at two points.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "En los cortes ambas órdenadas coinciden: iguala $-\\frac{x^2}{4} + 2$ con $-\\frac{3x}{4} + 1$.",
            "At the intersections both ordinates agree: set $-\\frac{x^2}{4} + 2$ equal to $-\\frac{3x}{4} + 1$.",
          ),
          L(
            "Multiplica todo por $4$ para quitar denominadores: $-x^2 + 8 = -3x + 4$, es decir $x^2 - 3x - 4 = 0$.",
            "Multiply through by $4$ to clear denominators: $-x^2 + 8 = -3x + 4$, i.e. $x^2 - 3x - 4 = 0$.",
          ),
          L(
            "Factoriza $x^2 - 3x - 4 = (x - 4)(x + 1)$. Para las alturas, sustituye cada $x$ en la **recta** (es lo más corto).",
            "Factor $x^2 - 3x - 4 = (x - 4)(x + 1)$. For the heights, substitute each $x$ into the **line** (shortest route).",
          ),
        ],
        answerDisplay: L(
          "$S_1\\left(-1\\,|\\,\\tfrac{7}{4}\\right)$ y $S_2(4\\,|\\,-2)$",
          "$S_1\\left(-1\\,|\\,\\tfrac{7}{4}\\right)$ and $S_2(4\\,|\\,-2)$",
        ),
        solution: [
          step(
            "given",
            "Parábola $p: y = -\\frac{1}{4}x^2 + 2$ (vértice $(0, 2)$, abre hacia abajo) y recta $g: y = -\\frac{3}{4}x + 1$ (decreciente).",
            "Parabola $p: y = -\\frac{1}{4}x^2 + 2$ (vertex $(0, 2)$, opens downward) and line $g: y = -\\frac{3}{4}x + 1$ (decreasing).",
          ),
          step(
            "approach",
            "Igualar las dos expresiones, resolver la cuadrática en $x$ y recuperar cada altura sustituyendo en la recta. El gráfico anticipa exactamente dos cortes.",
            "Set the two expressions equal, solve the quadratic in $x$ and recover each height by substituting into the line. The graph anticipates exactly two cuts.",
          ),
          step(
            "calculation",
            "$-\\frac{x^2}{4} + 2 = -\\frac{3x}{4} + 1$; multiplicando por $4$: $-x^2 + 8 = -3x + 4 \\Rightarrow x^2 - 3x - 4 = 0$.<br>Factorizando: $(x - 4)(x + 1) = 0 \\Rightarrow x = -1$ o $x = 4$.<br>Alturas con la recta: $g(-1) = \\frac{3}{4} + 1 = \\frac{7}{4}$ y $g(4) = -3 + 1 = -2$.<br>Verificación con la parábola: $p(-1) = -\\frac{1}{4} + 2 = \\frac{7}{4}$ ✓; $p(4) = -4 + 2 = -2$ ✓",
            "$-\\frac{x^2}{4} + 2 = -\\frac{3x}{4} + 1$; multiplying by $4$: $-x^2 + 8 = -3x + 4 \\Rightarrow x^2 - 3x - 4 = 0$.<br>Factoring: $(x - 4)(x + 1) = 0 \\Rightarrow x = -1$ or $x = 4$.<br>Heights via the line: $g(-1) = \\frac{3}{4} + 1 = \\frac{7}{4}$ and $g(4) = -3 + 1 = -2$.<br>Check with the parabola: $p(-1) = -\\frac{1}{4} + 2 = \\frac{7}{4}$ ✓; $p(4) = -4 + 2 = -2$ ✓",
          ),
          step(
            "result",
            "$S_1\\left(-1\\,|\\,\\tfrac{7}{4}\\right)$ y $S_2(4\\,|\\,-2)$ — dos cortes, como el gráfico mostraba.",
            "$S_1\\left(-1\\,|\\,\\tfrac{7}{4}\\right)$ and $S_2(4\\,|\\,-2)$ — two cuts, as the graph showed.",
          ),
        ],
      };
    },
  ),

  /* ================================================================== */
  /* Curated — ESPOL Fundamentos, EDICIÓN DIGITAL (TUTOR_LICENSED).     */
  /* Chapter 3 «Funciones de variable real» §3.7, pp. 374-375.          */
  /* Tutor's brief: «vayas a por los ejercicios del cap 3».             */
  /* Every answer double-verified: printed key pp. 939-940 + sympy      */
  /* (download/verify_espol_ch3.py).                                    */
  /* ================================================================== */

  /* ch3 35 — bungalow: 12 sem → 2925 AUD, 20 sem → 4525 AUD → r = 200 (opción a; s = 525: b). */
  template(
    {
      id: "pf-espol-ch3-35",
      subject: "math",
      topicId: "poly-functions",
      subtopicId: "modeling",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 240,
      tags: ["modeling", "linear-model", "system"],
      prerequisites: ["modeling"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3 · 35",
        page: 374,
      },
      reasoning: "modeling",
    },
    () => ({
      skill: L(
        "Modelo lineal con depósito fijo: sistema 2×2",
        "Linear model with a fixed deposit: a 2×2 system",
      ),
      statement: L(
        "(Aplicación a la administración.) El costo $C$ en dólares australianos (AUD) de alquilar un bungalow por $n$ semanas lo da la función lineal $C(n) = nr + s$, donde $s$ es la garantía (costo fijo) y $r$ el alquiler semanal (costo variable). Jenny alquiló el bungalow 12 semanas y pagó en total 2925 AUD; Yolanda alquiló el mismo bungalow 20 semanas y pagó en total 4525 AUD. Determina el alquiler semanal $r$ (responde en AUD).",
        "(Application to administration.) The cost $C$ in Australian dollars (AUD) of renting a bungalow for $n$ weeks is given by the linear function $C(n) = nr + s$, where $s$ is the security deposit (fixed cost) and $r$ the weekly rent (variable cost). Jenny rented the bungalow for 12 weeks and paid a total of 2925 AUD; Yolanda rented the same bungalow for 20 weeks and paid a total of 4525 AUD. Determine the weekly rent $r$ (answer in AUD).",
      ),
      answer: { kind: "numeric", value: 200 },
      hints: [
        L(
          "Traduce cada alquiler a una ecuación: $C(12) = 12r + s = 2925$ y $C(20) = 20r + s = 4525$.",
          "Translate each rental into an equation: $C(12) = 12r + s = 2925$ and $C(20) = 20r + s = 4525$.",
        ),
        L(
          "Resta la primera ecuación de la segunda: la garantía $s$ se cancela y queda una sola incógnita.",
          "Subtract the first equation from the second: the deposit $s$ cancels and a single unknown remains.",
        ),
        L(
          "El coeficiente que acompaña a $r$ tras la resta es la diferencia de semanas. Con $r$ hallada, recupera $s$ y comprueba en la otra ecuación.",
          "The coefficient next to $r$ after the subtraction is the difference of weeks. Once $r$ is found, recover $s$ and check against the other equation.",
        ),
      ],
      answerDisplay: L(
        "$r = 200$ AUD semanales (y garantía $s = 525$ AUD)",
        "$r = 200$ AUD per week (and deposit $s = 525$ AUD)",
      ),
      solution: [
        step(
          "given",
          "$C(n) = nr + s$; Jenny: $C(12) = 2925$ AUD; Yolanda: $C(20) = 4525$ AUD.",
          "$C(n) = nr + s$; Jenny: $C(12) = 2925$ AUD; Yolanda: $C(20) = 4525$ AUD.",
        ),
        step(
          "approach",
          "Plantear el sistema lineal 2×2 en $r$ y $s$ y eliminar la garantía $s$ restando las ecuaciones (método de reducción).",
          "Set up the 2×2 linear system in $r$ and $s$ and eliminate the deposit $s$ by subtracting the equations (elimination method).",
        ),
        step(
          "calculation",
          "$12r + s = 2925$<br>$20r + s = 4525$<br>Resta: $8r = 1600 \\Rightarrow r = 200$.<br>Garantía: $s = 2925 - 12(200) = 2925 - 2400 = 525$.",
          "$12r + s = 2925$<br>$20r + s = 4525$<br>Subtract: $8r = 1600 \\Rightarrow r = 200$.<br>Deposit: $s = 2925 - 12(200) = 2925 - 2400 = 525$.",
        ),
        step(
          "result",
          "El alquiler semanal es $r = 200$ AUD (opción a del libro ✓; la garantía es $s = 525$ AUD, opción b). Verificación: $C(20) = 20 \\cdot 200 + 525 = 4525$ ✓ y $C(12) = 12 \\cdot 200 + 525 = 2925$ ✓.",
          "The weekly rent is $r = 200$ AUD (the book's option a ✓; the deposit is $s = 525$ AUD, option b). Check: $C(20) = 20 \\cdot 200 + 525 = 4525$ ✓ and $C(12) = 12 \\cdot 200 + 525 = 2925$ ✓.",
        ),
      ],
    }),
  ),

  /* ch3 37c — fijos 2500, C(200) = 3300, precio 5.25 → equilibrio en x = 2000 (opción c: (2000, 10500)). */
  template(
    {
      id: "pf-espol-ch3-37c",
      subject: "math",
      topicId: "poly-functions",
      subtopicId: "modeling",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 300,
      tags: ["modeling", "break-even", "cost-revenue"],
      prerequisites: ["modeling"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3 · 37c",
        page: 374,
      },
      reasoning: "modeling",
    },
    () => ({
      skill: L(
        "Punto de equilibrio: ingreso igual al costo",
        "Break-even point: revenue equals cost",
      ),
      statement: L(
        "(Aplicación a la economía.) Una empresa tiene costos fijos de 2500 dólares y el costo total de producir 200 unidades es de 3300 dólares. Cada artículo se vende a $5{,}25$ dólares. Suponiendo linealidad, determina el número de unidades en el **punto de equilibrio** (donde el ingreso iguala al costo; responde solo el número de unidades).",
        "(Application to economics.) A company has fixed costs of 2500 dollars and the total cost of producing 200 units is 3300 dollars. Each article is sold for $5.25$ dollars. Assuming linearity, determine the number of units at the **break-even point** (where revenue equals cost; answer just the number of units).",
      ),
      answer: { kind: "numeric", value: 2000 },
      hints: [
        L(
          "Con linealidad, el costo es $C(x) = mx + 2500$: la pendiente $m$ (costo variable por unidad) sale del dato de las 200 unidades.",
          "With linearity, the cost is $C(x) = mx + 2500$: the slope $m$ (unit variable cost) comes from the 200-unit data point.",
        ),
        L(
          "El ingreso por vender $x$ artículos es $I(x) = 5{,}25x$ dólares.",
          "The revenue from selling $x$ articles is $I(x) = 5.25x$ dollars.",
        ),
        L(
          "En el equilibrio $I(x) = C(x)$: queda una ecuación lineal en $x$; despeja.",
          "At break-even $I(x) = C(x)$: a linear equation in $x$ remains; solve it.",
        ),
      ],
      answerDisplay: L(
        "$x = 2000$ unidades (punto de equilibrio $(2000, 10500)$)",
        "$x = 2000$ units (break-even point $(2000, 10500)$)",
      ),
      solution: [
        step(
          "given",
          "Costos fijos: 2500 dólares; $C(200) = 3300$ dólares; precio de venta: $5{,}25$ dólares por artículo; modelos lineales.",
          "Fixed costs: 2500 dollars; $C(200) = 3300$ dollars; selling price: $5.25$ dollars per article; linear models.",
        ),
        step(
          "approach",
          "Hallar el modelo de costo con la pendiente $m = \\frac{C(200) - 2500}{200}$, plantear el ingreso $I(x) = 5{,}25x$ e igualar ingreso y costo.",
          "Find the cost model with slope $m = \\frac{C(200) - 2500}{200}$, set up the revenue $I(x) = 5.25x$ and equate revenue and cost.",
        ),
        step(
          "calculation",
          "$m = \\dfrac{3300 - 2500}{200} = \\dfrac{800}{200} = 4 \\Rightarrow C(x) = 4x + 2500$.<br>Equilibrio: $5{,}25x = 4x + 2500 \\Rightarrow 1{,}25x = 2500 \\Rightarrow x = 2000$.<br>En ese punto ingreso $=$ costo $= 5{,}25 \\cdot 2000 = 10500$ dólares.",
          "$m = \\dfrac{3300 - 2500}{200} = \\dfrac{800}{200} = 4 \\Rightarrow C(x) = 4x + 2500$.<br>Break-even: $5.25x = 4x + 2500 \\Rightarrow 1.25x = 2500 \\Rightarrow x = 2000$.<br>At that point revenue $=$ cost $= 5.25 \\cdot 2000 = 10500$ dollars.",
        ),
        step(
          "result",
          "El punto de equilibrio está en $x = 2000$ unidades — el punto completo es $(2000, 10500)$, opción c del libro ✓. Verificación: $C(2000) = 4 \\cdot 2000 + 2500 = 10500 = I(2000)$ ✓; con 1999 unidades el costo aún supera al ingreso, y con 2001 ya lo supera el ingreso.",
          "The break-even point is at $x = 2000$ units — the full point is $(2000, 10500)$, the book's option c ✓. Check: $C(2000) = 4 \\cdot 2000 + 2500 = 10500 = I(2000)$ ✓; at 1999 units the cost still exceeds the revenue, and at 2001 the revenue exceeds it.",
        ),
      ],
    }),
  ),

  /* ch3 39a — tanque A = 388 m², densidad 0,859 t/m³, capacidad 5000 t → altura ≈ 15 m. */
  template(
    {
      id: "pf-espol-ch3-39a",
      subject: "math",
      topicId: "poly-functions",
      subtopicId: "modeling",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 270,
      tags: ["modeling", "units", "volume", "density"],
      prerequisites: ["modeling"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3 · 39a",
        page: 375,
      },
      reasoning: "modeling",
    },
    () => ({
      skill: L(
        "Masa, densidad y volumen encadenados con V = Ah",
        "Mass, density and volume chained through V = Ah",
      ),
      statement: L(
        "(Producción de aceite de palma.) Agrícola Palmera almacena el aceite en tanques cilíndricos con volumen $V = Ah$, donde $A$ es el área de la base y $h$ la altura. El área de la base es $388\\ \\text{m}^{2}$ y la densidad del aceite es de 0,859 toneladas por metro cúbico. Si la capacidad del tanque es de 5000 toneladas, determina la altura del tanque redondeada al metro más cercano.",
        "(Palm-oil production.) Agrícola Palmera stores oil in cylindrical tanks with volume $V = Ah$, where $A$ is the base area and $h$ the height. The base area is $388\\ \\text{m}^{2}$ and the oil density is 0.859 tonnes per cubic meter. If the tank capacity is 5000 tonnes, determine the height of the tank, rounded to the nearest meter.",
      ),
      answer: {
        kind: "numeric-unit",
        value: 15,
        tolerance: { mode: "absolute", value: 0.5 },
        units: ["m", "metros", "meters"],
        unitChoices: ["m", "cm", "km", "m2", "m3"],
      },
      hints: [
        L(
          "La masa almacenada es masa $=$ densidad $\\times$ volumen. Con $V = Ah$, la masa es $0{,}859 \\cdot 388 \\cdot h$ toneladas.",
          "The stored mass is mass $=$ density $\\times$ volume. With $V = Ah$, the mass is $0.859 \\cdot 388 \\cdot h$ tonnes.",
        ),
        L(
          "Iguala esa expresión a 5000 toneladas y despeja $h$: queda una sola división.",
          "Set that expression equal to 5000 tonnes and solve for $h$: a single division remains.",
        ),
        L(
          "El denominador es $0{,}859 \\times 388 = 333{,}292$; el cociente cae casi exactamente sobre un entero — redondea al metro.",
          "The denominator is $0.859 \\times 388 = 333.292$; the quotient lands almost exactly on an integer — round to the nearest meter.",
        ),
      ],
      answerDisplay: L("$h \\approx 15$ m", "$h \\approx 15$ m"),
      solution: [
        step(
          "given",
          "$V = Ah$ con $A = 388\\ \\text{m}^{2}$; densidad del aceite $d = 0{,}859\\ \\text{t/m}^{3}$; capacidad del tanque: 5000 toneladas.",
          "$V = Ah$ with $A = 388\\ \\text{m}^{2}$; oil density $d = 0.859\\ \\text{t/m}^{3}$; tank capacity: 5000 tonnes.",
        ),
        step(
          "approach",
          "Encadenar masa $=$ densidad $\\times$ volumen con $V = Ah$ y despejar $h$ de la ecuación lineal resultante; al final, redondear al metro.",
          "Chain mass $=$ density $\\times$ volume with $V = Ah$ and solve the resulting linear equation for $h$; finally round to the nearest meter.",
        ),
        step(
          "calculation",
          "Masa $= d \\cdot V = 0{,}859 \\cdot 388 \\cdot h = 333{,}292\\,h$.<br>$333{,}292\\,h = 5000 \\Rightarrow h = \\dfrac{5000}{333{,}292} = 15{,}0019\\ldots$",
          "Mass $= d \\cdot V = 0.859 \\cdot 388 \\cdot h = 333.292\\,h$.<br>$333.292\\,h = 5000 \\Rightarrow h = \\dfrac{5000}{333.292} = 15.0019\\ldots$",
        ),
        step(
          "result",
          "$h \\approx 15$ m (clave del libro: ≈15 m ✓ — un resultado casi entero: el cociente difiere de 15 en menos de dos milésimas). Verificación: $0{,}859 \\cdot 388 \\cdot 15 = 4999{,}38 \\approx 5000$ toneladas ✓.",
          "$h \\approx 15$ m (the book's key: ≈15 m ✓ — a nearly integer result: the quotient differs from 15 by less than two thousandths). Check: $0.859 \\cdot 388 \\cdot 15 = 4999.38 \\approx 5000$ tonnes ✓.",
        ),
      ],
    }),
  ),

  /* ================================================================== */
  /* Tarea UEES · «EJERCICIOS DE REPASO 1ER PARCIAL MATEMATICAS I»       */
  /* (INSTRUCTOR_CREATED; sin clave impresa — cada respuesta verificada  */
  /* con sympy en download/verify_repaso1.py, 417 checks, 0 FAIL).       */
  /* Bloque 8-e · Sección 10 «Expresar en forma de funciones» 31-32     */
  /* (pág. 12, subtopic modeling) y Sección 16 «Funciones lineales»     */
  /* 1-6 (pág. 18, graphs: pendiente e intercepto) y 15-19 (pág. 18,    */
  /* modeling: demanda/oferta/costo). #16 = demanda del CD con puntos   */
  /* (10000, 18) y (26000, 12) → p = −(3/8000)q + 87/4 (el script       */
  /* verifica AMBOS puntos). Convención de dinero:                      */
  /* \text{\textdollar} dentro de modo matemático. Enunciados           */
  /* transcritos del VLM (vlm-p-12.json y vlm-p-18.json).               */
  /* ================================================================== */

  /* S10 · 31 — función de costo C = 850+3q; parte (b): 850+3q = 1600 → 250. */
  template(
    {
      id: "ef-uees-31",
      subject: "math",
      topicId: "poly-functions",
      subtopicId: "modeling",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 150,
      tags: ["cost-function", "linear-model", "money", "word-problem"],
      prerequisites: ["modeling"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "10 · 31",
        page: 12,
      },
      reasoning: "modeling",
    },
    () => ({
      skill: L(
        "Función de costo lineal y su lectura inversa: unidades para un costo dado",
        "A linear cost function and its inverse reading: units for a given cost",
      ),
      statement: L(
        "Función de costo. En la fabricación de un componente para máquina, el costo inicial de un dado es de $\\text{\\textdollar}850$ y todos los otros costos adicionales son de $\\text{\\textdollar}3$ por unidad producida. (a) Exprese el costo total $C$ como una función lineal del número $q$ de unidades producidas. (b) ¿Cuántas unidades se producen si el costo total es de $\\text{\\textdollar}1600$?\n\n(responda la parte (b): el número de unidades, como decimal)",
        "Cost function. In manufacturing a machine component, the initial cost of a die is $\\text{\\textdollar}850$ and all other additional costs are $\\text{\\textdollar}3$ per unit produced. (a) Express the total cost $C$ as a linear function of the number $q$ of units produced. (b) How many units are produced if the total cost is $\\text{\\textdollar}1600$?\n\n(answer part (b): the number of units, as a decimal)",
      ),
      answer: { kind: "numeric", value: 250, tolerance: { mode: "relative", value: 0.02 } },
      hints: [
        L(
          "Parte (a): costo fijo $\\text{\\textdollar}850$ más $\\text{\\textdollar}3$ por cada unidad producida.",
          "Part (a): fixed cost $\\text{\\textdollar}850$ plus $\\text{\\textdollar}3$ for each unit produced.",
        ),
        L(
          "Parte (b): iguala el modelo de la parte (a) al costo dado, $C(q) = 1600$.",
          "Part (b): set the model from part (a) equal to the given cost, $C(q) = 1600$.",
        ),
        L(
          "$3q = 1600 - 850 = 750$: falta una sola división.",
          "$3q = 1600 - 850 = 750$: a single division remains.",
        ),
      ],
      answerDisplay: L(
        "(a) $C = 850 + 3q$; (b) $q = 250$ unidades",
        "(a) $C = 850 + 3q$; (b) $q = 250$ units",
      ),
      solution: [
        step(
          "given",
          "Costo inicial del dado: $\\text{\\textdollar}850$ (fijo); costos adicionales: $\\text{\\textdollar}3$ por unidad; costo total pedido: $\\text{\\textdollar}1600$.",
          "Initial die cost: $\\text{\\textdollar}850$ (fixed); additional costs: $\\text{\\textdollar}3$ per unit; required total cost: $\\text{\\textdollar}1600$.",
        ),
        step(
          "approach",
          "Construir la función lineal $C(q) = \\text{fijo} + (\\text{variable por unidad})\\cdot q$ y luego despejar $q$ de $C(q) = 1600$.",
          "Build the linear function $C(q) = \\text{fixed} + (\\text{per-unit variable})\\cdot q$ and then solve $C(q) = 1600$ for $q$.",
        ),
        step(
          "calculation",
          "(a) $C(q) = 850 + 3q$ (ordenada en el origen $850$, pendiente $3$).<br>(b) $850 + 3q = 1600 \\Rightarrow 3q = 750 \\Rightarrow q = 250$.",
          "(a) $C(q) = 850 + 3q$ (intercept $850$, slope $3$).<br>(b) $850 + 3q = 1600 \\Rightarrow 3q = 750 \\Rightarrow q = 250$.",
        ),
        step(
          "result",
          "Se producen $250$ unidades. Verificación: $C(250) = 850 + 3\\cdot 250 = 850 + 750 = 1600$ ✓.",
          "$250$ units are produced. Check: $C(250) = 850 + 3\\cdot 250 = 850 + 750 = 1600$ ✓.",
        ),
      ],
    }),
  ),

  /* S10 · 32 — interés simple: A = P(1+rt), lineal en t (pendiente Pr). */
  template(
    {
      id: "ef-uees-32",
      subject: "math",
      topicId: "poly-functions",
      subtopicId: "modeling",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["simple-interest", "linear-model", "investment"],
      prerequisites: ["modeling"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "10 · 32",
        page: 12,
      },
      reasoning: "modeling",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "Sí: $A = P(1+rt)$, lineal en $t$ (pendiente $Pr$)",
            "Yes: $A = P(1+rt)$, linear in $t$ (slope $Pr$)",
          ),
          correct: true,
        },
        {
          id: "b",
          text: L("Sí: $A = P + rt$, lineal en $t$", "Yes: $A = P + rt$, linear in $t$"),
          correct: false,
        },
        {
          id: "c",
          text: L(
            "No: es cuadrática en $t$ (como $t^{2}$)",
            "No: it is quadratic in $t$ (like $t^{2}$)",
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            "No: es exponencial en $t$ (como $(1+r)^{t}$)",
            "No: it is exponential in $t$ (like $(1+r)^{t}$)",
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Interés simple: el monto acumulado como función lineal del tiempo",
          "Simple interest: the accumulated amount as a linear function of time",
        ),
        statement: L(
          "Inversión. Si un capital $P$ se invierte a una tasa de interés simple anual $r$ durante $t$ años, exprese la cantidad total acumulada del capital y del interés como una función de $t$. ¿Su resultado es una función lineal de $t$?",
          "Investment. If a capital $P$ is invested at a simple annual interest rate $r$ for $t$ years, express the total amount accumulated of capital and interest as a function of $t$. Is your result a linear function of $t$?",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Interés simple: los intereses de cada año son $Pr$ (constantes); no se capitalizan sobre los del año anterior.",
            "Simple interest: each year's interest is $Pr$ (constant); it is not capitalized on top of previous years'.",
          ),
          L(
            "En $t$ años el interés acumulado es $I = Prt$; el monto total es capital más interés.",
            "Over $t$ years the accumulated interest is $I = Prt$; the total amount is capital plus interest.",
          ),
          L(
            "$A(t) = P + Prt = P(1+rt)$: ¿con qué potencia de $t$ queda?",
            "$A(t) = P + Prt = P(1+rt)$: with which power of $t$ does it remain?",
          ),
        ],
        answerDisplay: L(
          "Sí: $A = P(1+rt) = P + Prt$, lineal en $t$ (pendiente $Pr$, ordenada $P$)",
          "Yes: $A = P(1+rt) = P + Prt$, linear in $t$ (slope $Pr$, intercept $P$)",
        ),
        solution: [
          step(
            "given",
            "Capital $P$ a tasa simple anual $r$ durante $t$ años: cada año genera el mismo interés $Pr$.",
            "Capital $P$ at simple annual rate $r$ for $t$ years: each year generates the same interest $Pr$.",
          ),
          step(
            "approach",
            "Acumular el interés $I = Prt$ (proporcional a $t$, sin capitalización) y sumarlo al capital; luego leer la forma de $A(t)$.",
            "Accumulate the interest $I = Prt$ (proportional to $t$, no capitalization) and add it to the capital; then read off the shape of $A(t)$.",
          ),
          step(
            "calculation",
            "$A(t) = P + I = P + Prt = P(1+rt)$.<br>Es de la forma $A = (Pr)\\,t + P$: pendiente $Pr$ y ordenada en el origen $P$, lineal en $t$.<br>La opción $A = P + rt$ olvida que el interés $rt$ se aplica sobre el capital $P$: el término correcto es $Prt$, no $rt$.",
            "$A(t) = P + I = P + Prt = P(1+rt)$.<br>It has the form $A = (Pr)\\,t + P$: slope $Pr$ and intercept $P$, linear in $t$.<br>The choice $A = P + rt$ forgets that the interest $rt$ applies on the capital $P$: the correct term is $Prt$, not $rt$.",
          ),
          step(
            "result",
            "Sí: $A = P(1+rt)$ es lineal en $t$, con pendiente $Pr$ y ordenada $P$. Verificación con $P = 100$ y $r = 10\\%$: $A(0) = 100$, $A(1) = 110$, $A(2) = 120$ — sube $10 = Pr$ por año ✓. (El interés compuesto $P(1+r)^{t}$ sí sería exponencial; el simple no.)",
            "Yes: $A = P(1+rt)$ is linear in $t$, with slope $Pr$ and intercept $P$. Check with $P = 100$ and $r = 10\\%$: $A(0) = 100$, $A(1) = 110$, $A(2) = 120$ — it rises by $10 = Pr$ per year ✓. (Compound interest $P(1+r)^{t}$ would indeed be exponential; simple interest is not.)",
          ),
        ],
      };
    },
  ),

  /* S16 · 1 — y = f(x) = −4x: m = −4, b = 0 (pasa por el origen). */
  template(
    {
      id: "linfun-uees-1",
      subject: "math",
      topicId: "poly-functions",
      subtopicId: "graphs",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 60,
      tags: ["slope", "y-intercept", "linear-function"],
      prerequisites: ["linear-equations"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "16 · 1",
        page: 18,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$(-4,\\ 0)$`, `$(-4,\\ 0)$`), correct: true },
        { id: "b", text: L(`$(4,\\ 0)$`, `$(4,\\ 0)$`), correct: false },
        { id: "c", text: L(`$(-4,\\ -4)$`, `$(-4,\\ -4)$`), correct: false },
        { id: "d", text: L(`$(0,\\ -4)$`, `$(0,\\ -4)$`), correct: false },
      ];
      return {
        skill: L(
          "Leer pendiente e intercepto de $y = -4x$",
          "Reading slope and intercept of $y = -4x$",
        ),
        statement: L(
          "Determine la pendiente y la intersección con el eje vertical de la función lineal (la hoja pide además bosquejar la gráfica; aquí se califica el par $(m, b)$):\n\n$$y = f(x) = -4x$$",
          "Determine the slope and the vertical-axis intercept of the linear function (the sheet also asks you to sketch the graph; here the pair $(m, b)$ is graded):\n\n$$y = f(x) = -4x$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Compara con la forma pendiente-ordenada $y = mx + b$.",
            "Compare with the slope-intercept form $y = mx + b$.",
          ),
          L(
            "Aquí el coeficiente de $x$ es $-4$ y no aparece término independiente.",
            "Here the coefficient of $x$ is $-4$ and no constant term appears.",
          ),
          L(
            "Sin término independiente, $b = 0$: la recta pasa por el origen.",
            "With no constant term, $b = 0$: the line passes through the origin.",
          ),
        ],
        answerDisplay: L(`$m = -4,\\ b = 0$`, `$m = -4,\\ b = 0$`),
        solution: [
          step(
            "given",
            "La función lineal $y = f(x) = -4x$.",
            "The linear function $y = f(x) = -4x$.",
          ),
          step(
            "approach",
            "Llevarla a la forma $y = mx + b$ y leer $m$ (coeficiente de $x$) y $b$ (término independiente); el intercepto con el eje vertical es $f(0)$.",
            "Bring it to the form $y = mx + b$ and read off $m$ (coefficient of $x$) and $b$ (constant term); the vertical-axis intercept is $f(0)$.",
          ),
          step(
            "calculation",
            "$y = -4x = (-4)\\,x + 0$, así que $m = -4$ y $b = 0$.<br>Corte con el eje vertical: $f(0) = -4\\cdot 0 = 0$.",
            "$y = -4x = (-4)\\,x + 0$, so $m = -4$ and $b = 0$.<br>Vertical-axis intercept: $f(0) = -4\\cdot 0 = 0$.",
          ),
          step(
            "result",
            "El par es $(m, b) = (-4, 0)$: una recta que pasa por el origen y baja $4$ por cada paso a la derecha. Verificación: $f(0) = 0$ ✓ y $f(1) = -4$ ✓.",
            "The pair is $(m, b) = (-4, 0)$: a line through the origin dropping $4$ for each step to the right. Check: $f(0) = 0$ ✓ and $f(1) = -4$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S16 · 2 — y = f(x) = x+1: m = 1 (coeficiente implícito), b = 1. */
  template(
    {
      id: "linfun-uees-2",
      subject: "math",
      topicId: "poly-functions",
      subtopicId: "graphs",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 60,
      tags: ["slope", "y-intercept", "linear-function"],
      prerequisites: ["linear-equations"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "16 · 2",
        page: 18,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$(1,\\ 1)$`, `$(1,\\ 1)$`), correct: true },
        { id: "b", text: L(`$(1,\\ 0)$`, `$(1,\\ 0)$`), correct: false },
        { id: "c", text: L(`$(0,\\ 1)$`, `$(0,\\ 1)$`), correct: false },
        { id: "d", text: L(`$(-1,\\ 1)$`, `$(-1,\\ 1)$`), correct: false },
      ];
      return {
        skill: L(
          "Leer pendiente e intercepto de $y = x + 1$",
          "Reading slope and intercept of $y = x + 1$",
        ),
        statement: L(
          "Determine la pendiente y la intersección con el eje vertical de la función lineal (la hoja pide además bosquejar la gráfica; aquí se califica el par $(m, b)$):\n\n$$y = f(x) = x + 1$$",
          "Determine the slope and the vertical-axis intercept of the linear function (the sheet also asks you to sketch the graph; here the pair $(m, b)$ is graded):\n\n$$y = f(x) = x + 1$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Compara con la forma pendiente-ordenada $y = mx + b$.",
            "Compare with the slope-intercept form $y = mx + b$.",
          ),
          L(
            "El coeficiente de $x$ está implícito: $x = 1\\cdot x$.",
            "The coefficient of $x$ is implicit: $x = 1\\cdot x$.",
          ),
          L(
            "El término independiente es $1$: ese es el intercepto $b$.",
            "The constant term is $1$: that is the intercept $b$.",
          ),
        ],
        answerDisplay: L(`$m = 1,\\ b = 1$`, `$m = 1,\\ b = 1$`),
        solution: [
          step(
            "given",
            "La función lineal $y = f(x) = x + 1$.",
            "The linear function $y = f(x) = x + 1$.",
          ),
          step(
            "approach",
            "Llevarla a la forma $y = mx + b$ recordando que el coeficiente implícito de $x$ es $1$.",
            "Bring it to the form $y = mx + b$, remembering that the implicit coefficient of $x$ is $1$.",
          ),
          step(
            "calculation",
            "$y = x + 1 = 1\\cdot x + 1$, así que $m = 1$ y $b = 1$.<br>Corte con el eje vertical: $f(0) = 0 + 1 = 1$.",
            "$y = x + 1 = 1\\cdot x + 1$, so $m = 1$ and $b = 1$.<br>Vertical-axis intercept: $f(0) = 0 + 1 = 1$.",
          ),
          step(
            "result",
            "El par es $(m, b) = (1, 1)$: la recta sube $1$ por cada paso a la derecha y corta al eje vertical en $1$. Verificación: $f(0) = 1$ ✓ y $f(1) = 2$ ✓.",
            "The pair is $(m, b) = (1, 1)$: the line rises $1$ per step to the right and cuts the vertical axis at $1$. Check: $f(0) = 1$ ✓ and $f(1) = 2$ ✓.",
          ),
        ],
      };
    },
  ),

  /* S16 · 3 — h(t) = 5t−7: m = 5, b = −7 (variable t, signo del intercepto). */
  template(
    {
      id: "linfun-uees-3",
      subject: "math",
      topicId: "poly-functions",
      subtopicId: "graphs",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 60,
      tags: ["slope", "y-intercept", "linear-function"],
      prerequisites: ["linear-equations"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "16 · 3",
        page: 18,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$(5,\\ -7)$`, `$(5,\\ -7)$`), correct: true },
        { id: "b", text: L(`$(5,\\ 7)$`, `$(5,\\ 7)$`), correct: false },
        { id: "c", text: L(`$(-5,\\ -7)$`, `$(-5,\\ -7)$`), correct: false },
        { id: "d", text: L(`$(5,\\ 0)$`, `$(5,\\ 0)$`), correct: false },
      ];
      return {
        skill: L(
          "Leer pendiente e intercepto de $h(t) = 5t - 7$ (variable $t$)",
          "Reading slope and intercept of $h(t) = 5t - 7$ (variable $t$)",
        ),
        statement: L(
          "Determine la pendiente y la intersección con el eje vertical de la función lineal (la hoja pide además bosquejar la gráfica; aquí se califica el par $(m, b)$):\n\n$$h(t) = 5t - 7$$",
          "Determine the slope and the vertical-axis intercept of the linear function (the sheet also asks you to sketch the graph; here the pair $(m, b)$ is graded):\n\n$$h(t) = 5t - 7$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Aunque la variable se llame $t$, la forma es la misma: $h = mt + b$.",
            "Even though the variable is called $t$, the form is the same: $h = mt + b$.",
          ),
          L(
            "La pendiente es el coeficiente de la variable: $m = 5$.",
            "The slope is the coefficient of the variable: $m = 5$.",
          ),
          L(
            "Ojo con el signo del término independiente: $b = -7$.",
            "Watch the sign of the constant term: $b = -7$.",
          ),
        ],
        answerDisplay: L(`$m = 5,\\ b = -7$`, `$m = 5,\\ b = -7$`),
        solution: [
          step(
            "given",
            "La función lineal $h(t) = 5t - 7$ (con $t$ como variable independiente).",
            "The linear function $h(t) = 5t - 7$ (with $t$ as the independent variable).",
          ),
          step(
            "approach",
            "Aplicar la forma pendiente-ordenada $h = mt + b$ sin dejarse confundir por el nombre de la variable.",
            "Apply the slope-intercept form $h = mt + b$ without being confused by the variable's name.",
          ),
          step(
            "calculation",
            "$h(t) = 5t - 7 = 5\\,t + (-7)$, así que $m = 5$ y $b = -7$.<br>Corte con el eje vertical: $h(0) = 5\\cdot 0 - 7 = -7$.",
            "$h(t) = 5t - 7 = 5\\,t + (-7)$, so $m = 5$ and $b = -7$.<br>Vertical-axis intercept: $h(0) = 5\\cdot 0 - 7 = -7$.",
          ),
          step(
            "result",
            "El par es $(m, b) = (5, -7)$. Verificación: $h(0) = -7$ ✓ y $h(1) = -2$ (sube $5$ por unidad de $t$) ✓.",
            "The pair is $(m, b) = (5, -7)$. Check: $h(0) = -7$ ✓ and $h(1) = -2$ (it rises $5$ per unit of $t$) ✓.",
          ),
        ],
      };
    },
  ),

  /* S16 · 4 — f(s) = 3(5−s) = 15−3s: hay que expandir → (−3, 15). */
  template(
    {
      id: "linfun-uees-4",
      subject: "math",
      topicId: "poly-functions",
      subtopicId: "graphs",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 90,
      tags: ["slope", "y-intercept", "distributive-property", "linear-function"],
      prerequisites: ["linear-equations"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "16 · 4",
        page: 18,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$(-3,\\ 15)$`, `$(-3,\\ 15)$`), correct: true },
        { id: "b", text: L(`$(3,\\ 15)$`, `$(3,\\ 15)$`), correct: false },
        { id: "c", text: L(`$(-3,\\ 5)$`, `$(-3,\\ 5)$`), correct: false },
        { id: "d", text: L(`$(15,\\ -3)$`, `$(15,\\ -3)$`), correct: false },
      ];
      return {
        skill: L(
          "Expandir antes de leer: $f(s) = 3(5-s) = 15 - 3s$",
          "Expand before reading: $f(s) = 3(5-s) = 15 - 3s$",
        ),
        statement: L(
          "Determine la pendiente y la intersección con el eje vertical de la función lineal (la hoja pide además bosquejar la gráfica; aquí se califica el par $(m, b)$):\n\n$$f(s) = 3(5 - s)$$",
          "Determine the slope and the vertical-axis intercept of the linear function (the sheet also asks you to sketch the graph; here the pair $(m, b)$ is graded):\n\n$$f(s) = 3(5 - s)$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Primero distribuye el $3$: $3(5 - s) = 15 - 3s$.",
            "First distribute the $3$: $3(5 - s) = 15 - 3s$.",
          ),
          L(
            "Reordena a la forma $f = ms + b$: $f = -3s + 15$.",
            "Rearrange to the form $f = ms + b$: $f = -3s + 15$.",
          ),
          L(
            "La pendiente queda $m = -3$ (negativa) y el intercepto $b = 15$.",
            "The slope comes out as $m = -3$ (negative) and the intercept as $b = 15$.",
          ),
        ],
        answerDisplay: L(`$f(s) = 15 - 3s \\Rightarrow m = -3,\\ b = 15$`, `$f(s) = 15 - 3s \\Rightarrow m = -3,\\ b = 15$`),
        solution: [
          step(
            "given",
            "La función lineal $f(s) = 3(5 - s)$, escrita como producto en vez de forma pendiente-ordenada.",
            "The linear function $f(s) = 3(5 - s)$, written as a product instead of slope-intercept form.",
          ),
          step(
            "approach",
            "Distribuir el $3$ para llevarla a la forma $f = ms + b$ y recién entonces leer $m$ y $b$ (el $3$ de afuera NO es la pendiente).",
            "Distribute the $3$ to bring it to the form $f = ms + b$ and only then read $m$ and $b$ (the outer $3$ is NOT the slope).",
          ),
          step(
            "calculation",
            "$f(s) = 3(5 - s) = 15 - 3s = -3s + 15$, así que $m = -3$ y $b = 15$.<br>Corte con el eje vertical: $f(0) = 3(5 - 0) = 15$.",
            "$f(s) = 3(5 - s) = 15 - 3s = -3s + 15$, so $m = -3$ and $b = 15$.<br>Vertical-axis intercept: $f(0) = 3(5 - 0) = 15$.",
          ),
          step(
            "result",
            "El par es $(m, b) = (-3, 15)$. Verificación: $f(0) = 15$ ✓ y $f(1) = 12$ (baja $3$ por unidad) ✓. Trampa clásica: leer $(3, 15)$ sin expandir — el $3$ multiplica a todo $(5 - s)$, no es la pendiente.",
            "The pair is $(m, b) = (-3, 15)$. Check: $f(0) = 15$ ✓ and $f(1) = 12$ (it drops $3$ per unit) ✓. Classic trap: reading $(3, 15)$ without expanding — the $3$ multiplies all of $(5 - s)$; it is not the slope.",
          ),
        ],
      };
    },
  ),

  /* S16 · 5 — p(q) = (5−q)/3 = −(1/3)q + 5/3: separar la fracción. */
  template(
    {
      id: "linfun-uees-5",
      subject: "math",
      topicId: "poly-functions",
      subtopicId: "graphs",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["slope", "y-intercept", "fractions", "linear-function"],
      prerequisites: ["linear-equations"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "16 · 5",
        page: 18,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            `$\\left(-\\frac{1}{3},\\ \\frac{5}{3}\\right)$`,
            `$\\left(-\\frac{1}{3},\\ \\frac{5}{3}\\right)$`,
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(`$\\left(\\frac{1}{3},\\ \\frac{5}{3}\\right)$`, `$\\left(\\frac{1}{3},\\ \\frac{5}{3}\\right)$`),
          correct: false,
        },
        {
          id: "c",
          text: L(`$\\left(-\\frac{1}{3},\\ 5\\right)$`, `$\\left(-\\frac{1}{3},\\ 5\\right)$`),
          correct: false,
        },
        { id: "d", text: L(`$(-3,\\ 5)$`, `$(-3,\\ 5)$`), correct: false },
      ];
      return {
        skill: L(
          "Separar la fracción: $p(q) = \\frac{5-q}{3} = -\\frac{1}{3}q + \\frac{5}{3}$",
          "Splitting the fraction: $p(q) = \\frac{5-q}{3} = -\\frac{1}{3}q + \\frac{5}{3}$",
        ),
        statement: L(
          "Determine la pendiente y la intersección con el eje vertical de la función lineal (la hoja pide además bosquejar la gráfica; aquí se califica el par $(m, b)$):\n\n$$p(q) = \\frac{5 - q}{3}$$",
          "Determine the slope and the vertical-axis intercept of the linear function (the sheet also asks you to sketch the graph; here the pair $(m, b)$ is graded):\n\n$$p(q) = \\frac{5 - q}{3}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Reparte el $3$ del denominador entre los dos términos del numerador: $\\frac{5 - q}{3} = \\frac{5}{3} - \\frac{q}{3}$.",
            "Spread the $3$ in the denominator over the two terms of the numerator: $\\frac{5 - q}{3} = \\frac{5}{3} - \\frac{q}{3}$.",
          ),
          L(
            "Reordena a la forma $p = mq + b$: $p = -\\frac{1}{3}q + \\frac{5}{3}$.",
            "Rearrange to the form $p = mq + b$: $p = -\\frac{1}{3}q + \\frac{5}{3}$.",
          ),
          L(
            "La pendiente es negativa, $m = -\\frac{1}{3}$, y el intercepto es la fracción $b = \\frac{5}{3}$.",
            "The slope is negative, $m = -\\frac{1}{3}$, and the intercept is the fraction $b = \\frac{5}{3}$.",
          ),
        ],
        answerDisplay: L(
          `$p(q) = -\\frac{1}{3}q + \\frac{5}{3} \\Rightarrow m = -\\frac{1}{3},\\ b = \\frac{5}{3}$`,
          `$p(q) = -\\frac{1}{3}q + \\frac{5}{3} \\Rightarrow m = -\\frac{1}{3},\\ b = \\frac{5}{3}$`,
        ),
        solution: [
          step(
            "given",
            "La función lineal $p(q) = \\frac{5 - q}{3}$, con el $3$ dividiendo a todo el numerador.",
            "The linear function $p(q) = \\frac{5 - q}{3}$, with the $3$ dividing the whole numerator.",
          ),
          step(
            "approach",
            "Separar la fracción término a término para llegar a la forma $p = mq + b$ y leer $m$ y $b$.",
            "Split the fraction term by term to reach the form $p = mq + b$ and read $m$ and $b$.",
          ),
          step(
            "calculation",
            "$p(q) = \\frac{5}{3} - \\frac{q}{3} = -\\frac{1}{3}q + \\frac{5}{3}$, así que $m = -\\frac{1}{3}$ y $b = \\frac{5}{3}$.<br>Corte con el eje vertical: $p(0) = \\frac{5 - 0}{3} = \\frac{5}{3}$.",
            "$p(q) = \\frac{5}{3} - \\frac{q}{3} = -\\frac{1}{3}q + \\frac{5}{3}$, so $m = -\\frac{1}{3}$ and $b = \\frac{5}{3}$.<br>Vertical-axis intercept: $p(0) = \\frac{5 - 0}{3} = \\frac{5}{3}$.",
          ),
          step(
            "result",
            "El par es $\\left(m, b\\right) = \\left(-\\frac{1}{3},\\ \\frac{5}{3}\\right)$. Verificación: $p(0) = \\frac{5}{3}$ ✓ y $p(5) = 0$ (corte con el eje $q$) ✓.",
            "The pair is $\\left(m, b\\right) = \\left(-\\frac{1}{3},\\ \\frac{5}{3}\\right)$. Check: $p(0) = \\frac{5}{3}$ ✓ and $p(5) = 0$ (intercept with the $q$-axis) ✓.",
          ),
        ],
      };
    },
  ),

  /* S16 · 6 — h(q) = 0.5q+0.25: decimales; no intercambiar m y b. */
  template(
    {
      id: "linfun-uees-6",
      subject: "math",
      topicId: "poly-functions",
      subtopicId: "graphs",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 75,
      tags: ["slope", "y-intercept", "decimals", "linear-function"],
      prerequisites: ["linear-equations"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "16 · 6",
        page: 18,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$(0{,}5;\\ 0{,}25)$`, `$(0.5,\\ 0.25)$`), correct: true },
        { id: "b", text: L(`$(0{,}25;\\ 0{,}5)$`, `$(0.25,\\ 0.5)$`), correct: false },
        { id: "c", text: L(`$(0{,}5;\\ -0{,}25)$`, `$(0.5,\\ -0.25)$`), correct: false },
        { id: "d", text: L(`$(2;\\ 0{,}25)$`, `$(2,\\ 0.25)$`), correct: false },
      ];
      return {
        skill: L(
          "Pendiente e intercepto con decimales: $h(q) = 0{,}5q + 0{,}25$",
          "Slope and intercept with decimals: $h(q) = 0.5q + 0.25$",
        ),
        statement: L(
          "Determine la pendiente y la intersección con el eje vertical de la función lineal (la hoja pide además bosquejar la gráfica; aquí se califica el par $(m, b)$):\n\n$$h(q) = 0{,}5q + 0{,}25$$",
          "Determine the slope and the vertical-axis intercept of the linear function (the sheet also asks you to sketch the graph; here the pair $(m, b)$ is graded):\n\n$$h(q) = 0.5q + 0.25$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "La función ya está en la forma pendiente-ordenada $h = mq + b$.",
            "The function is already in slope-intercept form $h = mq + b$.",
          ),
          L(
            "El coeficiente de $q$ es la pendiente: $m = 0{,}5$ (un medio).",
            "The coefficient of $q$ is the slope: $m = 0.5$ (one half).",
          ),
          L(
            "El término independiente es el intercepto: $b = 0{,}25$ (un cuarto).",
            "The constant term is the intercept: $b = 0.25$ (one quarter).",
          ),
        ],
        answerDisplay: L(`$m = 0{,}5,\\ b = 0{,}25$`, `$m = 0.5,\\ b = 0.25$`),
        solution: [
          step(
            "given",
            "La función lineal $h(q) = 0{,}5q + 0{,}25$, ya en forma pendiente-ordenada.",
            "The linear function $h(q) = 0.5q + 0.25$, already in slope-intercept form.",
          ),
          step(
            "approach",
            "Leer directamente $m$ (coeficiente de $q$) y $b$ (término independiente), sin intercambiarlos.",
            "Read off $m$ (coefficient of $q$) and $b$ (constant term) directly, without swapping them.",
          ),
          step(
            "calculation",
            "$h(q) = 0{,}5q + 0{,}25$, así que $m = 0{,}5$ y $b = 0{,}25$.<br>Corte con el eje vertical: $h(0) = 0{,}25$.",
            "$h(q) = 0.5q + 0.25$, so $m = 0.5$ and $b = 0.25$.<br>Vertical-axis intercept: $h(0) = 0.25$.",
          ),
          step(
            "result",
            "El par es $(m, b) = (0{,}5;\\ 0{,}25)$. Verificación: $h(0) = 0{,}25$ ✓ y $h(2) = 1{,}25$ (sube $0{,}5$ por unidad) ✓. Las trampas son intercambiar el par $(0{,}25;\\ 0{,}5)$, cambiar el signo del intercepto o «invertir» el $0{,}5$ leyendo $2$.",
            "The pair is $(m, b) = (0.5,\\ 0.25)$. Check: $h(0) = 0.25$ ✓ and $h(2) = 1.25$ (it rises $0.5$ per unit) ✓. The traps are swapping the pair $(0.25,\\ 0.5)$, flipping the intercept's sign, or “inverting” the $0.5$ into $2$.",
          ),
        ],
      };
    },
  ),

  /* S16 · 15 — demanda (60, 15.30) y (35, 19.30): p = −0.16q+24.9; p(40) = 18.5. */
  template(
    {
      id: "dem-uees-15",
      subject: "math",
      topicId: "poly-functions",
      subtopicId: "modeling",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 240,
      tags: ["demand-equation", "linear-model", "money", "word-problem"],
      prerequisites: ["modeling"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "16 · 15",
        page: 18,
      },
      reasoning: "modeling",
    },
    () => ({
      skill: L(
        "Ecuación de demanda lineal: dos puntos (q, p) y una evaluación",
        "A linear demand equation: two (q, p) points and one evaluation",
      ),
      statement: L(
        "Ecuación de demanda. Suponga que los clientes demandarán 60 unidades de un producto cuando el precio es de $\\text{\\textdollar}15{,}30$ por unidad y 35 unidades cuando el precio es de $\\text{\\textdollar}19{,}30$ cada una. Encuentre la ecuación de la demanda suponiendo que es lineal. Determine el precio por unidad cuando se demandan 40 unidades.\n\n(responda el precio por unidad cuando se demandan 40 unidades, como decimal)",
        "Demand equation. Suppose customers will demand 60 units of a product when the price is $\\text{\\textdollar}15.30$ per unit and 35 units when the price is $\\text{\\textdollar}19.30$ each. Find the demand equation assuming it is linear. Determine the price per unit when 40 units are demanded.\n\n(answer the price per unit when 40 units are demanded, as a decimal)",
      ),
      answer: { kind: "numeric", value: 18.5, tolerance: { mode: "relative", value: 0.02 } },
      hints: [
        L(
          "Dos puntos de la demanda: $(q, p) = (60,\\ 15{,}30)$ y $(35,\\ 19{,}30)$. La pendiente es $m = \\frac{\\Delta p}{\\Delta q}$.",
          "Two demand points: $(q, p) = (60,\\ 15.30)$ and $(35,\\ 19.30)$. The slope is $m = \\frac{\\Delta p}{\\Delta q}$.",
        ),
        L(
          "$m = \\frac{15{,}30 - 19{,}30}{60 - 35} = \\frac{-4}{25} = -0{,}16$, así que $p = -0{,}16q + b$ (pendiente negativa: a mayor precio, menos demanda).",
          "$m = \\frac{15.30 - 19.30}{60 - 35} = \\frac{-4}{25} = -0.16$, so $p = -0.16q + b$ (negative slope: the higher the price, the lower the demand).",
        ),
        L(
          "Con $(60,\\ 15{,}30)$: $b = 15{,}30 + 0{,}16\\cdot 60 = 24{,}90$. Ahora evalúa en $q = 40$.",
          "With $(60,\\ 15.30)$: $b = 15.30 + 0.16\\cdot 60 = 24.90$. Now evaluate at $q = 40$.",
        ),
      ],
      answerDisplay: L(
        "$p = -0{,}16q + 24{,}9$; $p(40) = 18{,}50$",
        "$p = -0.16q + 24.9$; $p(40) = 18.50$",
      ),
      solution: [
        step(
          "given",
          "Demanda lineal por los puntos $(60,\\ 15{,}30)$ y $(35,\\ 19{,}30)$ (precios en dólares por unidad); se pide $p$ cuando $q = 40$.",
          "Linear demand through the points $(60,\\ 15.30)$ and $(35,\\ 19.30)$ (prices in dollars per unit); find $p$ when $q = 40$.",
        ),
        step(
          "approach",
          "Construir la recta $p = mq + b$ con la pendiente entre los dos puntos y un punto para el intercepto; luego evaluar en $q = 40$.",
          "Build the line $p = mq + b$ with the slope between the two points and one point for the intercept; then evaluate at $q = 40$.",
        ),
        step(
          "calculation",
          "$m = \\frac{15{,}30 - 19{,}30}{60 - 35} = \\frac{-4}{25} = -0{,}16$.<br>$b$: con $(60,\\ 15{,}30)$, $15{,}30 = -0{,}16\\cdot 60 + b \\Rightarrow b = 15{,}30 + 9{,}60 = 24{,}90$.<br>Demanda: $p = -0{,}16q + 24{,}90$.<br>$p(40) = -0{,}16\\cdot 40 + 24{,}90 = -6{,}40 + 24{,}90 = 18{,}50$.",
          "$m = \\frac{15.30 - 19.30}{60 - 35} = \\frac{-4}{25} = -0.16$.<br>$b$: with $(60,\\ 15.30)$, $15.30 = -0.16\\cdot 60 + b \\Rightarrow b = 15.30 + 9.60 = 24.90$.<br>Demand: $p = -0.16q + 24.90$.<br>$p(40) = -0.16\\cdot 40 + 24.90 = -6.40 + 24.90 = 18.50$.",
        ),
        step(
          "result",
          "Cuando se demandan 40 unidades, el precio por unidad es $\\text{\\textdollar}18{,}50$. Verificación de la recta con los DOS datos: $p(60) = -9{,}60 + 24{,}90 = 15{,}30$ ✓ y $p(35) = -5{,}60 + 24{,}90 = 19{,}30$ ✓.",
          "When 40 units are demanded, the price per unit is $\\text{\\textdollar}18.50$. Check of the line against BOTH data points: $p(60) = -9.60 + 24.90 = 15.30$ ✓ and $p(35) = -5.60 + 24.90 = 19.30$ ✓.",
        ),
      ],
    }),
  ),

  /* S16 · 16 — demanda del CD: p = −(3/8000)q + 87/4 (verifica ambos puntos). */
  template(
    {
      id: "dem-uees-16",
      subject: "math",
      topicId: "poly-functions",
      subtopicId: "modeling",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["demand-equation", "linear-model", "fractions", "word-problem"],
      prerequisites: ["modeling"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "16 · 16",
        page: 18,
      },
      reasoning: "modeling",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            `$p = -\\frac{3}{8000}q + \\frac{87}{4}$`,
            `$p = -\\frac{3}{8000}q + \\frac{87}{4}$`,
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(`$p = -\\frac{3}{8000}q + 18$`, `$p = -\\frac{3}{8000}q + 18$`),
          correct: false,
        },
        {
          id: "c",
          text: L(`$p = \\frac{3}{8000}q + 12$`, `$p = \\frac{3}{8000}q + 12$`),
          correct: false,
        },
        {
          id: "d",
          text: L(`$p = -\\frac{3}{16000}q + \\frac{87}{4}$`, `$p = -\\frac{3}{16000}q + \\frac{87}{4}$`),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Demanda semanal de un CD: la recta por (10000, 18) y (26000, 12)",
          "Weekly CD demand: the line through (10000, 18) and (26000, 12)",
        ),
        statement: L(
          "Ecuación de demanda. La demanda semanal para un disco compacto es de 26 000 copias cuando el precio es de $\\text{\\textdollar}12$ cada uno y de 10 000 copias cuando el precio es de $\\text{\\textdollar}18$ cada uno. Encuentre una ecuación de demanda para el disco suponiendo que ésta es lineal.",
          "Demand equation. The weekly demand for a compact disc is 26 000 copies when the price is $\\text{\\textdollar}12$ each and 10 000 copies when the price is $\\text{\\textdollar}18$ each. Find a demand equation for the disc assuming it is linear.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Puntos (cantidad, precio): $(26\\,000,\\ 12)$ y $(10\\,000,\\ 18)$; la pendiente es $m = \\frac{\\Delta p}{\\Delta q}$.",
            "Points (quantity, price): $(26,\\!000,\\ 12)$ and $(10,\\!000,\\ 18)$; the slope is $m = \\frac{\\Delta p}{\\Delta q}$.",
          ),
          L(
            "$m = \\frac{12 - 18}{26\\,000 - 10\\,000} = \\frac{-6}{16\\,000} = -\\frac{3}{8000}$.",
            "$m = \\frac{12 - 18}{26,\\!000 - 10,\\!000} = \\frac{-6}{16,\\!000} = -\\frac{3}{8000}$.",
          ),
          L(
            "Con $(10\\,000,\\ 18)$: $18 = -\\frac{3}{8000}\\cdot 10\\,000 + b = -\\frac{30}{8} + b$, así que $b = 18 + 3{,}75$.",
            "With $(10,\\!000,\\ 18)$: $18 = -\\frac{3}{8000}\\cdot 10,\\!000 + b = -\\frac{30}{8} + b$, so $b = 18 + 3.75$.",
          ),
        ],
        answerDisplay: L(
          `$p = -\\frac{3}{8000}q + \\frac{87}{4}$`,
          `$p = -\\frac{3}{8000}q + \\frac{87}{4}$`,
        ),
        solution: [
          step(
            "given",
            "Demanda semanal del disco: $q = 26\\,000$ copias a $p = \\text{\\textdollar}12$, y $q = 10\\,000$ copias a $p = \\text{\\textdollar}18$.",
            "Weekly disc demand: $q = 26,\\!000$ copies at $p = \\text{\\textdollar}12$, and $q = 10,\\!000$ copies at $p = \\text{\\textdollar}18$.",
          ),
          step(
            "approach",
            "Escribir los dos puntos $(q, p)$, calcular la pendiente $m = \\frac{\\Delta p}{\\Delta q}$ y despejar $b$ con uno de ellos; al final verificar con los DOS puntos.",
            "Write the two points $(q, p)$, compute the slope $m = \\frac{\\Delta p}{\\Delta q}$ and solve for $b$ with one of them; finally verify with BOTH points.",
          ),
          step(
            "calculation",
            "$m = \\frac{12 - 18}{26\\,000 - 10\\,000} = -\\frac{6}{16\\,000} = -\\frac{3}{8000}$.<br>$b$: $18 = -\\frac{3}{8000}\\cdot 10\\,000 + b = -\\frac{3}{8}\\cdot 10 + b = -3{,}75 + b \\Rightarrow b = 21{,}75 = \\frac{87}{4}$.<br>Demanda: $p = -\\frac{3}{8000}q + \\frac{87}{4}$.",
            "$m = \\frac{12 - 18}{26,\\!000 - 10,\\!000} = -\\frac{6}{16,\\!000} = -\\frac{3}{8000}$.<br>$b$: $18 = -\\frac{3}{8000}\\cdot 10,\\!000 + b = -\\frac{3}{8}\\cdot 10 + b = -3.75 + b \\Rightarrow b = 21.75 = \\frac{87}{4}$.<br>Demand: $p = -\\frac{3}{8000}q + \\frac{87}{4}$.",
          ),
          step(
            "result",
            "La ecuación de demanda es $p = -\\frac{3}{8000}q + \\frac{87}{4}$. Verificación con los DOS puntos: $q = 10\\,000 \\Rightarrow p = -3{,}75 + 21{,}75 = 18$ ✓ y $q = 26\\,000 \\Rightarrow p = -9{,}75 + 21{,}75 = 12$ ✓. (Las opciones con $b = 18$, pendiente positiva o pendiente $\\frac{3}{16000}$ fallan al menos uno de los dos puntos.)",
            "The demand equation is $p = -\\frac{3}{8000}q + \\frac{87}{4}$. Check with BOTH points: $q = 10,\\!000 \\Rightarrow p = -3.75 + 21.75 = 18$ ✓ and $q = 26,\\!000 \\Rightarrow p = -9.75 + 21.75 = 12$ ✓. (The choices with $b = 18$, a positive slope, or slope $\\frac{3}{16000}$ fail at least one of the two points.)",
          ),
        ],
      };
    },
  ),

  /* S16 · 17 — oferta de refrigeradores: q = 4p − 760 ((940,3000), (740,2200)). */
  template(
    {
      id: "dem-uees-17",
      subject: "math",
      topicId: "poly-functions",
      subtopicId: "modeling",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["supply-equation", "linear-model", "word-problem"],
      prerequisites: ["modeling"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "16 · 17",
        page: 18,
      },
      reasoning: "modeling",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$q = 4p - 760$`, `$q = 4p - 760$`), correct: true },
        { id: "b", text: L(`$q = 4p + 760$`, `$q = 4p + 760$`), correct: false },
        { id: "c", text: L(`$p = 4q - 760$`, `$p = 4q - 760$`), correct: false },
        { id: "d", text: L(`$q = 760 - 4p$`, `$q = 760 - 4p$`), correct: false },
      ];
      return {
        skill: L(
          "Ecuación de oferta con q como función del precio",
          "Supply equation with q as a function of price",
        ),
        statement: L(
          "Ecuación de oferta. Un fabricante de refrigeradores producirá 3000 unidades cuando el precio sea de $\\text{\\textdollar}940$ y 2200 unidades cuando el precio sea de $\\text{\\textdollar}740$. Suponga que el precio, $p$, y la cantidad producida, $q$, están relacionados de manera lineal. Encuentre la ecuación de oferta.",
          "Supply equation. A refrigerator manufacturer will produce 3000 units when the price is $\\text{\\textdollar}940$ and 2200 units when the price is $\\text{\\textdollar}740$. Assume the price, $p$, and the quantity produced, $q$, are linearly related. Find the supply equation.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "En la oferta conviene expresar la cantidad como función del precio: puntos $(p, q) = (940,\\ 3000)$ y $(740,\\ 2200)$.",
            "For supply it is convenient to express quantity as a function of price: points $(p, q) = (940,\\ 3000)$ and $(740,\\ 2200)$.",
          ),
          L(
            "Pendiente: $m = \\frac{\\Delta q}{\\Delta p} = \\frac{3000 - 2200}{940 - 740} = \\frac{800}{200}$.",
            "Slope: $m = \\frac{\\Delta q}{\\Delta p} = \\frac{3000 - 2200}{940 - 740} = \\frac{800}{200}$.",
          ),
          L(
            "$3000 = 4\\cdot 940 + b = 3760 + b$, así que $b = 3000 - 3760$.",
            "$3000 = 4\\cdot 940 + b = 3760 + b$, so $b = 3000 - 3760$.",
          ),
        ],
        answerDisplay: L(`$q = 4p - 760$`, `$q = 4p - 760$`),
        solution: [
          step(
            "given",
            "Oferta del fabricante: $q = 3000$ unidades a $p = \\text{\\textdollar}940$, y $q = 2200$ unidades a $p = \\text{\\textdollar}740$.",
            "Manufacturer's supply: $q = 3000$ units at $p = \\text{\\textdollar}940$, and $q = 2200$ units at $p = \\text{\\textdollar}740$.",
          ),
          step(
            "approach",
            "Tomar el precio como variable independiente (la producción responde al precio): pendiente $m = \\frac{\\Delta q}{\\Delta p}$ y luego el intercepto con un punto.",
            "Take price as the independent variable (production responds to price): slope $m = \\frac{\\Delta q}{\\Delta p}$ and then the intercept with one point.",
          ),
          step(
            "calculation",
            "$m = \\frac{3000 - 2200}{940 - 740} = \\frac{800}{200} = 4$.<br>$3000 = 4\\cdot 940 + b \\Rightarrow b = 3000 - 3760 = -760$.<br>Oferta: $q = 4p - 760$.",
            "$m = \\frac{3000 - 2200}{940 - 740} = \\frac{800}{200} = 4$.<br>$3000 = 4\\cdot 940 + b \\Rightarrow b = 3000 - 3760 = -760$.<br>Supply: $q = 4p - 760$.",
          ),
          step(
            "result",
            "La ecuación de oferta es $q = 4p - 760$. Verificación con los DOS puntos: $p = 940 \\Rightarrow q = 3760 - 760 = 3000$ ✓ y $p = 740 \\Rightarrow q = 2960 - 760 = 2200$ ✓. (Con $q = 4p + 760$ saldrían $4520$ y $3720$; la invertida $p = 4q - 760$ da $p = 11\\,240$ con $q = 3000$, no $940$.)",
            "The supply equation is $q = 4p - 760$. Check with BOTH points: $p = 940 \\Rightarrow q = 3760 - 760 = 3000$ ✓ and $p = 740 \\Rightarrow q = 2960 - 760 = 2200$ ✓. (With $q = 4p + 760$ one would get $4520$ and $3720$; the inverted $p = 4q - 760$ gives $p = 11,\\!240$ at $q = 3000$, not $940$.)",
          ),
        ],
      };
    },
  ),

  /* S16 · 18 — oferta de zapatos (q en miles): q = 3p − 55 ((35,50), (30,35)). */
  template(
    {
      id: "dem-uees-18",
      subject: "math",
      topicId: "poly-functions",
      subtopicId: "modeling",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["supply-equation", "linear-model", "units", "word-problem"],
      prerequisites: ["modeling"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "16 · 18",
        page: 18,
      },
      reasoning: "modeling",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$q = 3p - 55$`, `$q = 3p - 55$`), correct: true },
        { id: "b", text: L(`$q = 3p + 55$`, `$q = 3p + 55$`), correct: false },
        { id: "c", text: L(`$p = 3q - 55$`, `$p = 3q - 55$`), correct: false },
        { id: "d", text: L(`$q = 55 - 3p$`, `$q = 55 - 3p$`), correct: false },
      ];
      return {
        skill: L(
          "Ecuación de oferta con la cantidad en miles de pares",
          "Supply equation with quantity in thousands of pairs",
        ),
        statement: L(
          "Ecuación de oferta. Suponga que un fabricante de zapatos colocará en el mercado 50 mil pares cuando el precio es de $\\text{\\textdollar}35$ y 35 mil pares cuando el precio es de $\\text{\\textdollar}30$. Encuentre la ecuación de oferta suponiendo que el precio $p$ y la cantidad $q$ se relacionan linealmente. (Mida $q$ en miles de pares.)",
          "Supply equation. Suppose a shoe manufacturer will place 50 thousand pairs on the market when the price is $\\text{\\textdollar}35$ and 35 thousand pairs when the price is $\\text{\\textdollar}30$. Find the supply equation assuming that price $p$ and quantity $q$ are linearly related. (Measure $q$ in thousands of pairs.)",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Con $q$ medida en miles de pares, los puntos son $(p, q) = (35,\\ 50)$ y $(30,\\ 35)$.",
            "With $q$ measured in thousands of pairs, the points are $(p, q) = (35,\\ 50)$ and $(30,\\ 35)$.",
          ),
          L(
            "Pendiente: $m = \\frac{\\Delta q}{\\Delta p} = \\frac{50 - 35}{35 - 30} = \\frac{15}{5}$.",
            "Slope: $m = \\frac{\\Delta q}{\\Delta p} = \\frac{50 - 35}{35 - 30} = \\frac{15}{5}$.",
          ),
          L(
            "$50 = 3\\cdot 35 + b = 105 + b$, así que $b = 50 - 105$.",
            "$50 = 3\\cdot 35 + b = 105 + b$, so $b = 50 - 105$.",
          ),
        ],
        answerDisplay: L(
          `$q = 3p - 55$ ($q$ en miles de pares)`,
          `$q = 3p - 55$ ($q$ in thousands of pairs)`,
        ),
        solution: [
          step(
            "given",
            "Oferta del fabricante de zapatos: $q = 50$ mil pares a $p = \\text{\\textdollar}35$, y $q = 35$ mil pares a $p = \\text{\\textdollar}30$.",
            "Shoe manufacturer's supply: $q = 50$ thousand pairs at $p = \\text{\\textdollar}35$, and $q = 35$ thousand pairs at $p = \\text{\\textdollar}30$.",
          ),
          step(
            "approach",
            "Expresar $q$ (en miles) como función de $p$: pendiente $\\frac{\\Delta q}{\\Delta p}$ e intercepto con un punto.",
            "Express $q$ (in thousands) as a function of $p$: slope $\\frac{\\Delta q}{\\Delta p}$ and intercept with one point.",
          ),
          step(
            "calculation",
            "$m = \\frac{50 - 35}{35 - 30} = \\frac{15}{5} = 3$.<br>$50 = 3\\cdot 35 + b \\Rightarrow b = 50 - 105 = -55$.<br>Oferta: $q = 3p - 55$ ($q$ en miles de pares).",
            "$m = \\frac{50 - 35}{35 - 30} = \\frac{15}{5} = 3$.<br>$50 = 3\\cdot 35 + b \\Rightarrow b = 50 - 105 = -55$.<br>Supply: $q = 3p - 55$ ($q$ in thousands of pairs).",
          ),
          step(
            "result",
            "La ecuación de oferta es $q = 3p - 55$ (con $q$ en miles de pares). Verificación con los DOS puntos: $p = 35 \\Rightarrow q = 105 - 55 = 50$ ✓ y $p = 30 \\Rightarrow q = 90 - 55 = 35$ ✓. (Con el signo $+$ saldrían $160$ y $145$ mil pares; la invertida $p = 3q - 55$ da $p = 95$ con $q = 50$, no $35$.)",
            "The supply equation is $q = 3p - 55$ (with $q$ in thousands of pairs). Check with BOTH points: $p = 35 \\Rightarrow q = 105 - 55 = 50$ ✓ and $p = 30 \\Rightarrow q = 90 - 55 = 35$ ✓. (With the $+$ sign one would get $160$ and $145$ thousand pairs; the inverted $p = 3q - 55$ gives $p = 95$ at $q = 50$, not $35$.)",
          ),
        ],
      };
    },
  ),

  /* S16 · 19 — costo c = 3q+10 ((10,40), (20,70)): c(35) = 115. */
  template(
    {
      id: "dem-uees-19",
      subject: "math",
      topicId: "poly-functions",
      subtopicId: "modeling",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 180,
      tags: ["cost-equation", "linear-model", "money", "word-problem"],
      prerequisites: ["modeling"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "16 · 19",
        page: 18,
      },
      reasoning: "modeling",
    },
    () => ({
      skill: L(
        "Ecuación de costo lineal y una evaluación: c(35)",
        "A linear cost equation and one evaluation: c(35)",
      ),
      statement: L(
        "Ecuación de costo. Suponga que el costo por producir 10 unidades de un producto es de $\\text{\\textdollar}40$ y el costo para 20 unidades es de $\\text{\\textdollar}70$. Si el costo, $c$, se relaciona linealmente con la producción, $q$, encuentre el costo de producir 35 unidades.\n\n(escriba el resultado como decimal)",
        "Cost equation. Suppose the cost of producing 10 units of a product is $\\text{\\textdollar}40$ and the cost for 20 units is $\\text{\\textdollar}70$. If the cost, $c$, is linearly related to output, $q$, find the cost of producing 35 units.\n\n(give your answer as a decimal)",
      ),
      answer: { kind: "numeric", value: 115, tolerance: { mode: "relative", value: 0.02 } },
      hints: [
        L(
          "Puntos (producción, costo): $(10,\\ 40)$ y $(20,\\ 70)$. La pendiente es el costo variable por unidad.",
          "Points (output, cost): $(10,\\ 40)$ and $(20,\\ 70)$. The slope is the variable cost per unit.",
        ),
        L(
          "$m = \\frac{70 - 40}{20 - 10} = 3$ dólares por unidad; falta el intercepto $b$ con uno de los puntos.",
          "$m = \\frac{70 - 40}{20 - 10} = 3$ dollars per unit; the intercept $b$ from one of the points remains.",
        ),
        L(
          "Con $(10,\\ 40)$: $b = 40 - 3\\cdot 10$; luego evalúa la ecuación en $q = 35$.",
          "With $(10,\\ 40)$: $b = 40 - 3\\cdot 10$; then evaluate the equation at $q = 35$.",
        ),
      ],
      answerDisplay: L(
        "$c = 3q + 10$; $c(35) = 115$",
        "$c = 3q + 10$; $c(35) = 115$",
      ),
      solution: [
        step(
          "given",
          "Costo de producción lineal: $\\text{\\textdollar}40$ para $q = 10$ unidades y $\\text{\\textdollar}70$ para $q = 20$; se pide $c(35)$.",
          "Linear production cost: $\\text{\\textdollar}40$ for $q = 10$ units and $\\text{\\textdollar}70$ for $q = 20$; find $c(35)$.",
        ),
        step(
          "approach",
          "Construir la recta $c = mq + b$ (la pendiente es el costo variable por unidad, el intercepto el costo fijo) y evaluar en $q = 35$.",
          "Build the line $c = mq + b$ (the slope is the variable cost per unit, the intercept the fixed cost) and evaluate at $q = 35$.",
        ),
        step(
          "calculation",
          "$m = \\frac{70 - 40}{20 - 10} = \\frac{30}{10} = 3$.<br>$40 = 3\\cdot 10 + b \\Rightarrow b = 10$.<br>Costo: $c = 3q + 10$.<br>$c(35) = 3\\cdot 35 + 10 = 105 + 10 = 115$.",
          "$m = \\frac{70 - 40}{20 - 10} = \\frac{30}{10} = 3$.<br>$40 = 3\\cdot 10 + b \\Rightarrow b = 10$.<br>Cost: $c = 3q + 10$.<br>$c(35) = 3\\cdot 35 + 10 = 105 + 10 = 115$.",
        ),
        step(
          "result",
          "Producir 35 unidades cuesta $\\text{\\textdollar}115$. Verificación con los DOS datos: $c(10) = 30 + 10 = 40$ ✓ y $c(20) = 60 + 10 = 70$ ✓.",
          "Producing 35 units costs $\\text{\\textdollar}115$. Check against BOTH data points: $c(10) = 30 + 10 = 40$ ✓ and $c(20) = 60 + 10 = 70$ ✓.",
        ),
      ],
    }),
  ),
];
