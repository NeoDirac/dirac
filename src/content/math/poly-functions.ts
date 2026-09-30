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
];
