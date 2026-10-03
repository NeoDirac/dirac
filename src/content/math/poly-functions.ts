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
];
