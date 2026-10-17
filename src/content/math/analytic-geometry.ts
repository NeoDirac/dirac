/**
 * MATH · Analytic Geometry
 *
 * Distance, midpoint, slope, line equations, circles, parabolas and
 * coordinate-geometry problems (area via shoelace). Exact answers built
 * from Pythagorean triples and perfect squares.
 */

import { template, L, step, tok } from "@/lib/problem";
import type { ProblemTemplate, McOption } from "@/lib/types";

/** "(x - 3)" / "(x + 2)" from a shift value r (meaning x - r). */
const xMinus = (r: number): string => (r >= 0 ? `x - ${r}` : `x + ${-r}`);

/** signed term: "+ 3" / "- 3" */
const pmTerm = (n: number): string => (n >= 0 ? `+ ${n}` : `- ${-n}`);

/** LaTeX coefficient: 1 → "", -1 → "-", 3 → "3" */
const coef = (c: number): string => (c === 1 ? "" : c === -1 ? "-" : `${c}`);

export const templates: ProblemTemplate[] = [
  /* ---------------------------------------------------------------- */
  /* Distance: Pythagorean triples                                     */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "ag-dist-01",
      subject: "math",
      topicId: "analytic-geometry",
      subtopicId: "distance",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 90,
      tags: ["distance-formula", "pythagoras"],
      prerequisites: ["functions"],
    },
    (rng) => {
      const [a, b, c] = rng.pick([
        [3, 4, 5],
        [6, 8, 10],
        [5, 12, 13],
        [8, 15, 17],
      ]);
      const sx = rng.sign();
      const sy = rng.sign();
      const x1 = rng.int(-4, 4);
      const y1 = rng.int(-4, 4);
      const x2 = x1 + sx * a;
      const y2 = y1 + sy * b;
      return {
        skill: L("Distancia entre dos puntos", "Distance between two points"),
        statement: L(
          `Calcula la distancia entre los puntos $P(${x1}, ${y1})$ y $Q(${x2}, ${y2})$.`,
          `Compute the distance between the points $P(${x1}, ${y1})$ and $Q(${x2}, ${y2})$.`,
        ),
        answer: { kind: "numeric", value: c },
        hints: [
          L(
            "Aplica el teorema de Pitágoras con las variaciones en $x$ y en $y$.",
            "Apply the Pythagorean theorem to the changes in $x$ and $y$.",
          ),
          L(
            `Las variaciones son $|\\Delta x| = ${a}$ y $|\\Delta y| = ${b}$.`,
            `The changes are $|\\Delta x| = ${a}$ and $|\\Delta y| = ${b}$.`,
          ),
          L(
            "Busca un trío pitagórico conocido: $a^{2} + b^{2} = c^{2}$.",
            "Look for a known Pythagorean triple: $a^{2} + b^{2} = c^{2}$.",
          ),
        ],
        answerDisplay: L(`$d = ${c}$`, `$d = ${c}$`),
        solution: [
          step(
            "given",
            `$P(${x1}, ${y1})$, $Q(${x2}, ${y2})$.`,
            `$P(${x1}, ${y1})$, $Q(${x2}, ${y2})$.`,
          ),
          step(
            "approach",
            "Usamos la fórmula de la distancia, que es el teorema de Pitágoras en coordenadas.",
            "Use the distance formula, which is Pythagoras in coordinates.",
          ),
          step(
            "calculation",
            `$d = \\sqrt{(${x2} - (${x1}))^{2} + (${y2} - (${y1}))^{2}}$<br>$= \\sqrt{(${sx * a})^{2} + (${sy * b})^{2}} = \\sqrt{${a * a} + ${b * b}} = \\sqrt{${c * c}} = ${c}$`,
            `$d = \\sqrt{(${x2} - (${x1}))^{2} + (${y2} - (${y1}))^{2}}$<br>$= \\sqrt{(${sx * a})^{2} + (${sy * b})^{2}} = \\sqrt{${a * a} + ${b * b}} = \\sqrt{${c * c}} = ${c}$`,
          ),
          step(
            "result",
            `La distancia entre $P$ y $Q$ es $${c}$.`,
            `The distance between $P$ and $Q$ is $${c}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Midpoint: one coordinate                                          */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "ag-mid-01",
      subject: "math",
      topicId: "analytic-geometry",
      subtopicId: "midpoint",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 90,
      tags: ["midpoint", "averages"],
      prerequisites: ["functions"],
    },
    (rng) => {
      const x1 = rng.int(-10, 10);
      const y1 = rng.int(-10, 10);
      const x2 = rng.int(-10, 10);
      const y2 = rng.int(-10, 10);
      const askX = rng.bool();
      const value = askX ? (x1 + x2) / 2 : (y1 + y2) / 2;
      return {
        skill: L("Punto medio de un segmento", "Midpoint of a segment"),
        statement: L(
          `Dados los puntos $A(${x1}, ${y1})$ y $B(${x2}, ${y2})$, ¿cuál es la ${askX ? "abscisa" : "ordenada"} del punto medio del segmento $AB$?`,
          `Given the points $A(${x1}, ${y1})$ and $B(${x2}, ${y2})$, what is the ${askX ? "x-coordinate" : "y-coordinate"} of the midpoint of segment $AB$?`,
        ),
        answer: { kind: "numeric", value },
        hints: [
          L(
            "El punto medio promedia las coordenadas de los extremos.",
            "The midpoint averages the coordinates of the endpoints.",
          ),
          L(
            "Fórmula: $M = \\left(\\frac{x_{1} + x_{2}}{2},\\; \\frac{y_{1} + y_{2}}{2}\\right)$.",
            "Formula: $M = \\left(\\frac{x_{1} + x_{2}}{2},\\; \\frac{y_{1} + y_{2}}{2}\\right)$.",
          ),
          L(
            `Suma las ${askX ? "abscisas" : "ordenadas"} y divide entre 2 (el resultado puede terminar en ,5).`,
            `Add the ${askX ? "x-coordinates" : "y-coordinates"} and divide by 2 (the result may end in .5).`,
          ),
        ],
        answerDisplay: L(`${tok(value)}`, `${tok(value)}`),
        solution: [
          step(
            "given",
            `$A(${x1}, ${y1})$, $B(${x2}, ${y2})$.`,
            `$A(${x1}, ${y1})$, $B(${x2}, ${y2})$.`,
          ),
          step(
            "approach",
            "Cada coordenada del punto medio es el promedio de las coordenadas correspondientes.",
            "Each midpoint coordinate is the average of the matching coordinates.",
          ),
          step(
            "calculation",
            `$M_{x} = \\frac{${x1} + (${x2})}{2} = ${tok((x1 + x2) / 2)}$<br>$M_{y} = \\frac{${y1} + (${y2})}{2} = ${tok((y1 + y2) / 2)}$`,
            `$M_{x} = \\frac{${x1} + (${x2})}{2} = ${tok((x1 + x2) / 2)}$<br>$M_{y} = \\frac{${y1} + (${y2})}{2} = ${tok((y1 + y2) / 2)}$`,
          ),
          step(
            "result",
            `La ${askX ? "abscisa" : "ordenada"} pedida es $${tok(value)}$.`,
            `The requested ${askX ? "x-coordinate" : "y-coordinate"} is $${tok(value)}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Slope from two points                                             */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "ag-slope-01",
      subject: "math",
      topicId: "analytic-geometry",
      subtopicId: "slope",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 120,
      tags: ["slope"],
      prerequisites: ["functions"],
    },
    (rng) => {
      const m = rng.nonZeroInt(-4, 4);
      const x1 = rng.int(-5, 5);
      const dx = rng.int(2, 4);
      const y1 = rng.int(-6, 6);
      const x2 = x1 + dx;
      const y2 = y1 + m * dx;
      return {
        skill: L("Pendiente por dos puntos", "Slope through two points"),
        statement: L(
          `Calcula la pendiente de la recta que pasa por $A(${x1}, ${y1})$ y $B(${x2}, ${y2})$.`,
          `Compute the slope of the line through $A(${x1}, ${y1})$ and $B(${x2}, ${y2})$.`,
        ),
        answer: { kind: "numeric", value: m },
        hints: [
          L(
            "La pendiente es la variación de $y$ dividida por la variación de $x$.",
            "Slope is the change in $y$ divided by the change in $x$.",
          ),
          L(
            `Calcula $\\Delta y = ${y2} - (${y1})$ y $\\Delta x = ${x2} - (${x1})$.`,
            `Compute $\\Delta y = ${y2} - (${y1})$ and $\\Delta x = ${x2} - (${x1})$.`,
          ),
          L(
            "Divide $\\Delta y$ entre $\\Delta x$ cuidando los signos.",
            "Divide $\\Delta y$ by $\\Delta x$, watching the signs.",
          ),
        ],
        answerDisplay: L(`$m = ${m}$`, `$m = ${m}$`),
        solution: [
          step(
            "given",
            `$A(${x1}, ${y1})$, $B(${x2}, ${y2})$.`,
            `$A(${x1}, ${y1})$, $B(${x2}, ${y2})$.`,
          ),
          step(
            "approach",
            "Aplicamos $m = \\frac{\\Delta y}{\\Delta x}$.",
            "Apply $m = \\frac{\\Delta y}{\\Delta x}$.",
          ),
          step(
            "calculation",
            `$m = \\frac{${y2} - (${y1})}{${x2} - (${x1})} = \\frac{${y2 - y1}}{${x2 - x1}} = ${m}$`,
            `$m = \\frac{${y2} - (${y1})}{${x2} - (${x1})} = \\frac{${y2 - y1}}{${x2 - x1}} = ${m}$`,
          ),
          step("result", `$m = ${m}$`, `$m = ${m}$`),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Line equations (MC)                                               */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "ag-line-01",
      subject: "math",
      topicId: "analytic-geometry",
      subtopicId: "line-equations",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["line-equations", "slope-intercept"],
      prerequisites: ["functions"],
    },
    (rng) => {
      const m = rng.nonZeroInt(-4, 4);
      const b0 = rng.nonZeroInt(-6, 6);
      const x0 = rng.int(1, 5);
      const y0 = m * x0 + b0;
      const lineLat = (mm: number, bb: number): string =>
        `$y = ${coef(mm)}x ${bb >= 0 ? "+" : "-"} ${Math.abs(bb)}$`;
      const options: McOption[] = [
        { id: "a", text: L(lineLat(m, b0), lineLat(m, b0)), correct: true },
        { id: "b", text: L(lineLat(-m, b0), lineLat(-m, b0)), correct: false },
        { id: "c", text: L(lineLat(m, -b0), lineLat(m, -b0)), correct: false },
        { id: "d", text: L(lineLat(-m, -b0), lineLat(-m, -b0)), correct: false },
      ];
      return {
        skill: L("Ecuación de una recta", "Equation of a line"),
        statement: L(
          `Una recta tiene pendiente $${m}$ y pasa por el punto $(${x0}, ${y0})$. ¿Cuál es su ecuación?`,
          `A line has slope $${m}$ and passes through the point $(${x0}, ${y0})$. Which is its equation?`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Parte de la forma $y = mx + b$: falta hallar $b$.",
            "Start from $y = mx + b$: you still need $b$.",
          ),
          L(
            `Sustituye el punto: $${y0} = ${m} \\cdot ${x0} + b$.`,
            `Substitute the point: $${y0} = ${m} \\cdot ${x0} + b$.`,
          ),
          L(
            "Despeja $b$ y escribe la ecuación completa.",
            "Solve for $b$ and write the full equation.",
          ),
        ],
        answerDisplay: L(lineLat(m, b0), lineLat(m, b0)),
        solution: [
          step(
            "given",
            `Pendiente $m = ${m}$. Punto: $(${x0}, ${y0})$.`,
            `Slope $m = ${m}$. Point: $(${x0}, ${y0})$.`,
          ),
          step(
            "approach",
            "Sustituimos el punto en $y = mx + b$ para hallar la ordenada en el origen.",
            "Substitute the point into $y = mx + b$ to find the y-intercept.",
          ),
          step(
            "calculation",
            `$${y0} = ${m} \\cdot ${x0} + b$<br>$b = ${y0} - ${m * x0} = ${b0}$`,
            `$${y0} = ${m} \\cdot ${x0} + b$<br>$b = ${y0} - ${m * x0} = ${b0}$`,
          ),
          step("result", lineLat(m, b0), lineLat(m, b0)),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Parabolas: vertex by completing the square                        */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "ag-parab-01",
      subject: "math",
      topicId: "analytic-geometry",
      subtopicId: "parabolas",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 180,
      tags: ["parabolas", "vertex", "completing-square"],
      prerequisites: ["functions"],
    },
    (rng) => {
      const h = rng.nonZeroInt(-4, 4);
      const k = rng.int(-6, 6);
      const B = -2 * h;
      const C = h * h + k;
      return {
        skill: L("Vértice de una parábola", "Vertex of a parabola"),
        statement: L(
          `Considera la parábola $y = x^{2} ${pmTerm(B)}x ${pmTerm(C)}$. ¿Cuál es la **ordenada** de su vértice?`,
          `Consider the parabola $y = x^{2} ${pmTerm(B)}x ${pmTerm(C)}$. What is the **y-coordinate** of its vertex?`,
        ),
        answer: { kind: "numeric", value: k },
        hints: [
          L(
            "La abscisa del vértice es $x_{v} = \\frac{-B}{2A}$ con $A = 1$.",
            "The vertex x-coordinate is $x_{v} = \\frac{-B}{2A}$ with $A = 1$.",
          ),
          L(
            `Calcula $x_{v}$ y después sustitúyela en la ecuación.`,
            `Compute $x_{v}$ and then substitute it back into the equation.`,
          ),
          L(
            "También puedes completar el cuadrado y leer el vértice directamente.",
            "You can also complete the square and read the vertex directly.",
          ),
        ],
        answerDisplay: L(`$y_{v} = ${k}$`, `$y_{v} = ${k}$`),
        solution: [
          step(
            "given",
            `$y = x^{2} ${pmTerm(B)}x ${pmTerm(C)}$`,
            `$y = x^{2} ${pmTerm(B)}x ${pmTerm(C)}$`,
          ),
          step(
            "approach",
            "Completamos el cuadrado para llevar la parábola a la forma de vértice.",
            "Complete the square to write the parabola in vertex form.",
          ),
          step(
            "calculation",
            `$y = x^{2} ${pmTerm(B)}x + ${C}$<br>$y = \\left(x ${h >= 0 ? "-" : "+"} ${Math.abs(h)}\\right)^{2} - ${h * h} + ${C}$<br>$y = \\left(x ${h >= 0 ? "-" : "+"} ${Math.abs(h)}\\right)^{2} ${pmTerm(k)}$`,
            `$y = x^{2} ${pmTerm(B)}x + ${C}$<br>$y = \\left(x ${h >= 0 ? "-" : "+"} ${Math.abs(h)}\\right)^{2} - ${h * h} + ${C}$<br>$y = \\left(x ${h >= 0 ? "-" : "+"} ${Math.abs(h)}\\right)^{2} ${pmTerm(k)}$`,
          ),
          step(
            "result",
            `El vértice es $(${h}, ${k})$; su ordenada es $${k}$.`,
            `The vertex is $(${h}, ${k})$; its y-coordinate is $${k}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Circles: center from center-radius form                           */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "ag-circle-01",
      subject: "math",
      topicId: "analytic-geometry",
      subtopicId: "circles",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 120,
      tags: ["circles", "center-radius-form"],
      prerequisites: ["functions"],
    },
    (rng) => {
      const h = rng.intExcluding(-6, 6, [0]);
      const k = rng.intExcluding(-6, 6, [0]);
      const r = rng.int(2, 9);
      return {
        skill: L("Centro de una circunferencia", "Center of a circle"),
        statement: L(
          `Una circunferencia tiene ecuación $(${xMinus(h)})^{2} + (${xMinus(k).replace("x", "y")})^{2} = ${r * r}$. ¿Cuál es la **ordenada** de su centro?`,
          `A circle has equation $(${xMinus(h)})^{2} + (${xMinus(k).replace("x", "y")})^{2} = ${r * r}$. What is the **y-coordinate** of its center?`,
        ),
        answer: { kind: "numeric", value: k },
        hints: [
          L(
            "La forma centro-radio es $(x - h)^{2} + (y - k)^{2} = r^{2}$ con centro $(h, k)$.",
            "Center-radius form is $(x - h)^{2} + (y - k)^{2} = r^{2}$ with center $(h, k)$.",
          ),
          L(
            "Cuidado con los signos: $(y + a)^{2} = (y - (-a))^{2}$.",
            "Watch the signs: $(y + a)^{2} = (y - (-a))^{2}$.",
          ),
          L(
            "Escribe el término en $y$ como $(y - k)^{2}$ y lee $k$ con su signo.",
            "Rewrite the $y$ term as $(y - k)^{2}$ and read $k$ with its sign.",
          ),
        ],
        answerDisplay: L(`$k = ${k}$`, `$k = ${k}$`),
        solution: [
          step(
            "given",
            `$(${xMinus(h)})^{2} + (${xMinus(k).replace("x", "y")})^{2} = ${r * r}$`,
            `$(${xMinus(h)})^{2} + (${xMinus(k).replace("x", "y")})^{2} = ${r * r}$`,
          ),
          step(
            "approach",
            "Comparar con la forma centro-radio $(x - h)^{2} + (y - k)^{2} = r^{2}$.",
            "Match against center-radius form $(x - h)^{2} + (y - k)^{2} = r^{2}$.",
          ),
          step(
            "calculation",
            `$(${xMinus(k).replace("x", "y")})^{2} = (y - (${k}))^{2} \\Rightarrow k = ${k}$<br>Centro: $(${h}, ${k})$, radio $r = ${r}$.`,
            `$(${xMinus(k).replace("x", "y")})^{2} = (y - (${k}))^{2} \\Rightarrow k = ${k}$<br>Center: $(${h}, ${k})$, radius $r = ${r}$.`,
          ),
          step(
            "result",
            `La ordenada del centro es $${k}$.`,
            `The y-coordinate of the center is $${k}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Distance: exact surd form (expression)                            */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "ag-dist-02",
      subject: "math",
      topicId: "analytic-geometry",
      subtopicId: "distance",
      difficulty: "hard",
      questionType: "expression",
      estimatedTimeSec: 210,
      tags: ["distance-formula", "radicals", "exact-values"],
      prerequisites: ["functions"],
    },
    (rng) => {
      const k = rng.int(2, 4);
      // (k·p)² + (k·q)² = k²·n, so p² + q² must equal n (integer legs only).
      const [n, p, q] = rng.pick([
        [2, 1, 1],
        [5, 1, 2],
        [5, 2, 1],
        [10, 1, 3],
        [10, 3, 1],
        [13, 2, 3],
        [13, 3, 2],
      ]);
      const sx = rng.sign();
      const sy = rng.sign();
      const x1 = rng.int(-3, 3);
      const y1 = rng.int(-3, 3);
      const x2 = x1 + sx * k * p;
      const y2 = y1 + sy * k * q;
      return {
        skill: L("Distancia exacta con radical", "Exact distance with a radical"),
        statement: L(
          `Calcula la distancia entre $P(${x1}, ${y1})$ y $Q(${x2}, ${y2})$. Escribe el valor **exacto** usando sqrt() si es necesario (por ejemplo: sqrt(50) o 5sqrt(2)).`,
          `Compute the distance between $P(${x1}, ${y1})$ and $Q(${x2}, ${y2})$. Write the **exact** value using sqrt() if needed (e.g. sqrt(50) or 5sqrt(2)).`,
        ),
        answer: {
          kind: "expression",
          accepted: [`${k}*sqrt(${n})`, `sqrt(${k * k * n})`],
          variables: [],
        },
        hints: [
          L(
            "Aplica la fórmula de la distancia: eleva al cuadrado cada variación y suma.",
            "Apply the distance formula: square each change and add.",
          ),
          L(
            `Dentro de la raíz aparece $${k * k} \\cdot ${n}$: saca el factor cuadrado $${k * k} = ${k}^{2}$.`,
            `Inside the root you get $${k * k} \\cdot ${n}$: extract the square factor $${k * k} = ${k}^{2}$.`,
          ),
          L(
            `Recuerda: $\\sqrt{${k * k} \\cdot ${n}} = ${k}\\sqrt{${n}}$.`,
            `Remember: $\\sqrt{${k * k} \\cdot ${n}} = ${k}\\sqrt{${n}}$.`,
          ),
        ],
        answerDisplay: L(`$d = ${k}\\sqrt{${n}}$`, `$d = ${k}\\sqrt{${n}}$`),
        solution: [
          step(
            "given",
            `$P(${x1}, ${y1})$, $Q(${x2}, ${y2})$.`,
            `$P(${x1}, ${y1})$, $Q(${x2}, ${y2})$.`,
          ),
          step(
            "approach",
            "Aplicamos la fórmula de la distancia y simplificamos el radical extrayendo el mayor cuadrado.",
            "Apply the distance formula and simplify the radical by extracting the largest square.",
          ),
          step(
            "calculation",
            `$d = \\sqrt{(${sx * k * p})^{2} + (${sy * k * q})^{2}}$<br>$= \\sqrt{${k * k * p * p} + ${k * k * q * q}} = \\sqrt{${k * k} \\cdot ${n}} = ${k}\\sqrt{${n}}$`,
            `$d = \\sqrt{(${sx * k * p})^{2} + (${sy * k * q})^{2}}$<br>$= \\sqrt{${k * k * p * p} + ${k * k * q * q}} = \\sqrt{${k * k} \\cdot ${n}} = ${k}\\sqrt{${n}}$`,
          ),
          step(
            "result",
            `La distancia exacta es $${k}\\sqrt{${n}}$ (equivale a $\\sqrt{${k * k * n}}$).`,
            `The exact distance is $${k}\\sqrt{${n}}$ (equivalent to $\\sqrt{${k * k * n}}$).`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Coordinate geometry: triangle area (shoelace)                     */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "ag-coord-01",
      subject: "math",
      topicId: "analytic-geometry",
      subtopicId: "coordinate-geometry",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 240,
      tags: ["area", "shoelace", "triangles"],
      prerequisites: ["functions"],
    },
    (rng) => {
      const b = rng.pick([4, 6, 8, 10]);
      const h = rng.int(3, 9);
      const c = rng.int(-3, 5);
      const ox = rng.int(-3, 3);
      const oy = rng.int(-3, 3);
      const A = [ox, oy];
      const B = [ox + b, oy];
      const C = [ox + c, oy + h];
      const area = (b * h) / 2;
      return {
        skill: L("Área de un triángulo en coordenadas", "Area of a triangle from coordinates"),
        statement: L(
          `Un triángulo tiene vértices $A(${A[0]}, ${A[1]})$, $B(${B[0]}, ${B[1]})$ y $C(${C[0]}, ${C[1]})$. Calcula su área (en unidades cuadradas).`,
          `A triangle has vertices $A(${A[0]}, ${A[1]})$, $B(${B[0]}, ${B[1]})$ and $C(${C[0]}, ${C[1]})$. Compute its area (in square units).`,
        ),
        answer: { kind: "numeric", value: area },
        hints: [
          L(
            "Usa la fórmula del determinante (shoelace) con los tres vértices.",
            "Use the shoelace (determinant) formula with the three vertices.",
          ),
          L(
            "El área es la mitad del valor absoluto de la suma en cruz.",
            "The area is half the absolute value of the cross-sum.",
          ),
          L(
            `También puedes observar que $A$ y $B$ están a la misma altura: la base mide $${b}$.`,
            `You can also notice $A$ and $B$ sit at the same height: the base is $${b}$.`,
          ),
        ],
        answerDisplay: L(`$${area}$`, `$${area}$`),
        solution: [
          step(
            "given",
            `$A(${A[0]}, ${A[1]})$, $B(${B[0]}, ${B[1]})$, $C(${C[0]}, ${C[1]})$.`,
            `$A(${A[0]}, ${A[1]})$, $B(${B[0]}, ${B[1]})$, $C(${C[0]}, ${C[1]})$.`,
          ),
          step(
            "approach",
            "Como $A$ y $B$ tienen la misma ordenada, la base es horizontal; el área es $\\frac{\\text{base} \\cdot \\text{altura}}{2}$. (El shoelace da lo mismo.)",
            "Since $A$ and $B$ share their y-coordinate, the base is horizontal; the area is $\\frac{\\text{base} \\cdot \\text{height}}{2}$. (Shoelace gives the same.)",
          ),
          step(
            "calculation",
            `$\\text{base} = |${B[0]} - (${A[0]})| = ${b}$<br>$\\text{altura} = |${C[1]} - (${A[1]})| = ${h}$<br>$\\text{área} = \\frac{${b} \\cdot ${h}}{2} = ${area}$`,
            `$\\text{base} = |${B[0]} - (${A[0]})| = ${b}$<br>$\\text{height} = |${C[1]} - (${A[1]})| = ${h}$<br>$\\text{area} = \\frac{${b} \\cdot ${h}}{2} = ${area}$`,
          ),
          step(
            "result",
            `El área del triángulo es $${area}$ unidades cuadradas.`,
            `The triangle's area is $${area}$ square units.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Line equations: perpendicular slope                               */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "ag-line-02",
      subject: "math",
      topicId: "analytic-geometry",
      subtopicId: "line-equations",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 180,
      tags: ["perpendicular", "slope"],
      prerequisites: ["functions"],
    },
    (rng) => {
      const m = rng.pick([2, -2, 4, -4, 5, -5]);
      const value = -1 / m;
      return {
        skill: L("Pendiente de una recta perpendicular", "Slope of a perpendicular line"),
        statement: L(
          `La recta $r$ tiene ecuación $y = ${m}x + 3$. ¿Cuál es la pendiente de cualquier recta **perpendicular** a $r$? (Puedes escribir el resultado como fracción, por ejemplo -1/4.)`,
          `The line $r$ has equation $y = ${m}x + 3$. What is the slope of any line **perpendicular** to $r$? (You may write the result as a fraction, e.g. -1/4.)`,
        ),
        answer: { kind: "numeric", value },
        hints: [
          L(
            "Dos rectas perpendiculares (no verticales) cumplen $m_{1} \\cdot m_{2} = -1$.",
            "Two perpendicular (non-vertical) lines satisfy $m_{1} \\cdot m_{2} = -1$.",
          ),
          L(
            `Con $m_{1} = ${m}$: $${m} \\cdot m_{2} = -1$.`,
            `With $m_{1} = ${m}$: $${m} \\cdot m_{2} = -1$.`,
          ),
          L(
            `Despeja $m_{2}$ dividiendo entre $${m}$.`,
            `Solve for $m_{2}$ by dividing by $${m}$.`,
          ),
        ],
        answerDisplay: L(`$m_{2} = ${tok(value)}$`, `$m_{2} = ${tok(value)}$`),
        solution: [
          step(
            "given",
            `Recta $r$: $y = ${m}x + 3$, de pendiente $m_{1} = ${m}$.`,
            `Line $r$: $y = ${m}x + 3$, with slope $m_{1} = ${m}$.`,
          ),
          step(
            "approach",
            "Usamos la condición de perpendicularidad $m_{1} \\cdot m_{2} = -1$.",
            "Use the perpendicularity condition $m_{1} \\cdot m_{2} = -1$.",
          ),
          step(
            "calculation",
            `$m_{2} = \\frac{-1}{${m}} = ${tok(value)}$`,
            `$m_{2} = \\frac{-1}{${m}} = ${tok(value)}$`,
          ),
          step(
            "result",
            `La pendiente perpendicular es $${tok(value)}$ (el signo siempre cambia).`,
            `The perpendicular slope is $${tok(value)}$ (the sign always flips).`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Challenge: radius from the general form                           */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "ag-chal-01",
      subject: "math",
      topicId: "analytic-geometry",
      subtopicId: "circles",
      difficulty: "challenge",
      questionType: "numeric",
      estimatedTimeSec: 300,
      tags: ["circles", "completing-square", "general-form"],
      prerequisites: ["functions"],
    },
    (rng) => {
      const h = rng.nonZeroInt(-5, 5);
      const k = rng.nonZeroInt(-5, 5);
      let r = rng.int(3, 9);
      let c0 = h * h + k * k - r * r;
      if (c0 === 0) {
        r = r >= 9 ? 8 : r + 1;
        c0 = h * h + k * k - r * r;
      }
      let eq = "x^{2} + y^{2}";
      eq += h > 0 ? ` - ${2 * h}x` : ` + ${-2 * h}x`;
      eq += k > 0 ? ` - ${2 * k}y` : ` + ${-2 * k}y`;
      eq += c0 > 0 ? ` + ${c0}` : ` - ${-c0}`;
      return {
        skill: L("Radio desde la forma general", "Radius from general form"),
        statement: L(
          `Una circunferencia tiene ecuación $${eq} = 0$. ¿Cuál es su radio?`,
          `A circle has equation $${eq} = 0$. What is its radius?`,
        ),
        answer: { kind: "numeric", value: r },
        hints: [
          L(
            "Pasa a la forma centro-radio completando cuadrados en $x$ y en $y$.",
            "Convert to center-radius form by completing the square in $x$ and $y$.",
          ),
          L(
            `Agrupa $x^{2} ${h > 0 ? `- ${2 * h}x` : `+ ${-2 * h}x`}$ y suma lo que falta para tener un cuadrado perfecto.`,
            `Group $x^{2} ${h > 0 ? `- ${2 * h}x` : `+ ${-2 * h}x`}$ and add what is missing for a perfect square.`,
          ),
          L(
            "Lo que sumas a la izquierda, lo restas a la derecha; al final, $r^{2}$ queda solo.",
            "Whatever you add on the left, subtract on the right; eventually $r^{2}$ stands alone.",
          ),
        ],
        answerDisplay: L(`$r = ${r}$`, `$r = ${r}$`),
        solution: [
          step("given", `$${eq} = 0$`, `$${eq} = 0$`),
          step(
            "approach",
            "Completamos el cuadrado en $x$ y en $y$ para llegar a $(x - h)^{2} + (y - k)^{2} = r^{2}$.",
            "Complete the square in $x$ and $y$ to reach $(x - h)^{2} + (y - k)^{2} = r^{2}$.",
          ),
          step(
            "calculation",
            `$x^{2} ${h > 0 ? `- ${2 * h}x` : `+ ${-2 * h}x`} = \\left(x ${h > 0 ? `- ${h}` : `+ ${-h}`}\\right)^{2} - ${h * h}$<br>$y^{2} ${k > 0 ? `- ${2 * k}y` : `+ ${-2 * k}y`} = \\left(y ${k > 0 ? `- ${k}` : `+ ${-k}`}\\right)^{2} - ${k * k}$<br>$\\left(x ${h > 0 ? `- ${h}` : `+ ${-h}`}\\right)^{2} + \\left(y ${k > 0 ? `- ${k}` : `+ ${-k}`}\\right)^{2} = ${h * h} + ${k * k} - (${c0}) = ${r * r}$`,
            `$x^{2} ${h > 0 ? `- ${2 * h}x` : `+ ${-2 * h}x`} = \\left(x ${h > 0 ? `- ${h}` : `+ ${-h}`}\\right)^{2} - ${h * h}$<br>$y^{2} ${k > 0 ? `- ${2 * k}y` : `+ ${-2 * k}y`} = \\left(y ${k > 0 ? `- ${k}` : `+ ${-k}`}\\right)^{2} - ${k * k}$<br>$\\left(x ${h > 0 ? `- ${h}` : `+ ${-h}`}\\right)^{2} + \\left(y ${k > 0 ? `- ${k}` : `+ ${-k}`}\\right)^{2} = ${h * h} + ${k * k} - (${c0}) = ${r * r}$`,
          ),
          step(
            "result",
            `Como $r^{2} = ${r * r}$, el radio es $r = ${r}$.`,
            `Since $r^{2} = ${r * r}$, the radius is $r = ${r}$.`,
          ),
        ],
      };
    },
  ),


  /* ---------------------------------------------------------------- */
  /* Curated Phase 2 — FOS/BOS 2011, 6 f) (bisectriz vs recta,        */
  /* del bloque wahr/falsch). Transcribed; verified independently.    */
  /* Fixed problem — rng only shuffles MC.                            */
  /* ---------------------------------------------------------------- */

  template(
    {
      id: "ag-slope-02",
      subject: "math",
      topicId: "analytic-geometry",
      subtopicId: "slope",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["slope", "parallel", "perpendicular", "angle-bisector", "exam"],
      prerequisites: ["slope"],
      source: {
        sourceId: "fos-bos-2011",
        license: "OPEN_LICENSE",
        exerciseNumber: "6 f)",
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("Son perpendiculares", "They are perpendicular"), correct: true },
        { id: "b", text: L("Son paralelas", "They are parallel"), correct: false },
        { id: "c", text: L("Son la misma recta", "They are the same line"), correct: false },
        {
          id: "d",
          text: L("Se cortan, pero sin ser perpendiculares", "They intersect, but not perpendicularly"),
          correct: false,
        },
      ];
      return {
        skill: L("Bisectriz de cuadrantes frente a una recta (examen real 2011)", "Quadrant bisector vs a line (real 2011 exam)"),
        statement: L(
          "La bisectriz del primer y tercer cuadrante es la recta $y = x$. ¿Qué relación tiene con la recta $g: y = -x + 1.5$?",
          "The bisector of the first and third quadrants is the line $y = x$. What is its relation to the line $g: y = -x + 1.5$?",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Para dos rectas no verticales, toda la relación se lee en las **pendientes**.",
            "For two non-vertical lines, the whole relationship is read off the **slopes**.",
          ),
          L(
            "Bisectriz: pendiente $1$. Recta $g$: pendiente $-1$.",
            "Bisector: slope $1$. Line $g$: slope $-1$.",
          ),
          L(
            "Dos rectas son perpendiculares exactamente cuando el producto de sus pendientes vale $-1$; paralelas cuando las pendientes coinciden.",
            "Two lines are perpendicular exactly when the product of their slopes is $-1$; parallel when the slopes match.",
          ),
        ],
        answerDisplay: L(
          "Son **perpendiculares**: $1 \\cdot (-1) = -1$.",
          "They are **perpendicular**: $1 \\cdot (-1) = -1$.",
        ),
        solution: [
          step(
            "given",
            "Bisectriz $y = x$ (pendiente $m_1 = 1$) y $g: y = -x + 1.5$ (pendiente $m_2 = -1$).",
            "Bisector $y = x$ (slope $m_1 = 1$) and $g: y = -x + 1.5$ (slope $m_2 = -1$).",
          ),
          step(
            "approach",
            "Criterios por pendientes: paralelas ⟺ $m_1 = m_2$; perpendiculares ⟺ $m_1 m_2 = -1$ (rectas no verticales).",
            "Slope criteria: parallel ⟺ $m_1 = m_2$; perpendicular ⟺ $m_1 m_2 = -1$ (non-vertical lines).",
          ),
          step(
            "calculation",
            "$m_1 = 1 \\ne -1 = m_2$: no son paralelas (ni la misma recta, pues además las ordenadas difieren).<br>$m_1 \\cdot m_2 = 1 \\cdot (-1) = -1$: perpendiculares ✓<br>Punto de corte para referencia: $x = -x + 1.5 \\Rightarrow x = 0.75$ → $(0.75,\\ 0.75)$, y ahí se cruzan en ángulo recto.",
            "$m_1 = 1 \\ne -1 = m_2$: not parallel (nor the same line, since the intercepts also differ).<br>$m_1 \\cdot m_2 = 1 \\cdot (-1) = -1$: perpendicular ✓<br>Intersection point for reference: $x = -x + 1.5 \\Rightarrow x = 0.75$ → $(0.75,\\ 0.75)$, where they cross at a right angle.",
          ),
          step(
            "result",
            "Son perpendiculares. En el examen original (wahr/falsch) la afirmación «la bisectriz es paralela a $g$» era **falsa** — esta es la relación correcta.",
            "They are perpendicular. In the original exam (true/false) the statement «the bisector is parallel to $g$» was **false** — this is the correct relationship.",
          ),
        ],
      };
    },
  ),

  /* ================================================================== */
  /* Tarea UEES 1er parcial (INSTRUCTOR_CREATED; sin clave impresa —     */
  /* cada respuesta y cada distractor verificados con sympy en           */
  /* download/verify_repaso1.py, secciones S13/S15/S16): Sección 13      */
  /* «Gráfica» puntos 1-2 (pág. 14) · Sección 15 pendientes 1-8 y        */
  /* ecuaciones generales de la recta 9-20 (pág. 17) · Sección 16        */
  /* función lineal 7-14 (pág. 18). Trampas marcadas por el brief:       */
  /* slope-4 (m = 0, no indefinida), slope-5 (recta vertical),           */
  /* lineq-20 (horizontal ≠ vertical) y lf-10/11/14 (usar el valor       */
  /* dado como ordenada al origen).                                      */
  /* ================================================================== */

  /* S13.1 — localizar 4 puntos; se pregunta por (3, -1) → cuadrante IV. */
  template(
    {
      id: "pt-uees-1",
      subject: "math",
      topicId: "analytic-geometry",
      subtopicId: "coordinate-geometry",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 60,
      tags: ["points", "quadrants", "coordinate-plane"],
      prerequisites: ["functions"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "13 · 1",
        page: 14,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("Cuadrante IV", "Quadrant IV"), correct: true },
        { id: "b", text: L("Cuadrante III", "Quadrant III"), correct: false },
        { id: "c", text: L("Cuadrante II", "Quadrant II"), correct: false },
        { id: "d", text: L("Sobre el eje $x$", "On the $x$-axis"), correct: false },
      ];
      return {
        skill: L(
          "Ubicar puntos en el plano y leer su cuadrante",
          "Plotting points on the plane and reading their quadrant",
        ),
        statement: L(
          "Localice y marque en el plano cartesiano los puntos $(-2, -5)$, $(3, -1)$, $\\left(-\\frac{1}{3},\\ 4\\right)$ y $(1, 0)$, y responda: ¿en qué cuadrante (o sobre qué eje) se encuentra el punto $(3, -1)$?",
          "Plot and mark the points $(-2, -5)$, $(3, -1)$, $\\left(-\\frac{1}{3},\\ 4\\right)$ and $(1, 0)$ on the Cartesian plane, and answer: in which quadrant (or on which axis) does the point $(3, -1)$ lie?",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Cada punto se ubica con su abscisa $x$ (positiva: a la derecha; negativa: a la izquierda) y su ordenada $y$ (positiva: hacia arriba; negativa: hacia abajo).",
            "Each point is placed with its abscissa $x$ (positive: to the right; negative: to the left) and its ordinate $y$ (positive: upwards; negative: downwards).",
          ),
          L(
            "Regla de los signos: $(+,+)$ cuadrante I, $(-,+)$ cuadrante II, $(-,-)$ cuadrante III, $(+,-)$ cuadrante IV; si una coordenada es $0$, el punto queda **sobre un eje**.",
            "Sign rule: $(+,+)$ quadrant I, $(-,+)$ quadrant II, $(-,-)$ quadrant III, $(+,-)$ quadrant IV; if one coordinate is $0$, the point lies **on an axis**.",
          ),
          L(
            "Para el punto pedido: $x = 3 > 0$ (a la derecha) e $y = -1 < 0$ (hacia abajo). ¿En qué cuadrante viven los puntos con signos $(+,-)$?",
            "For the requested point: $x = 3 > 0$ (to the right) and $y = -1 < 0$ (downwards). In which quadrant do points with signs $(+,-)$ live?",
          ),
        ],
        answerDisplay: L(
          "El punto $(3, -1)$ está en el **cuadrante IV**.",
          "The point $(3, -1)$ lies in **quadrant IV**.",
        ),
        solution: [
          step(
            "given",
            "El conjunto de puntos $(-2, -5)$, $(3, -1)$, $\\left(-\\frac{1}{3},\\ 4\\right)$ y $(1, 0)$; se pregunta por el punto $(3, -1)$.",
            "The set of points $(-2, -5)$, $(3, -1)$, $\\left(-\\frac{1}{3},\\ 4\\right)$ and $(1, 0)$; the question asks about the point $(3, -1)$.",
          ),
          step(
            "approach",
            "Se clasifica cada punto con los signos de sus coordenadas; el eje que corta un punto con una coordenada nula lo excluye de los cuatro cuadrantes.",
            "Each point is classified by the signs of its coordinates; a point with a zero coordinate sits on an axis and belongs to no quadrant.",
          ),
          step(
            "calculation",
            "$(3, -1)$: $x = 3 > 0$ e $y = -1 < 0$, luego cuadrante IV.<br>$(-2, -5)$: $x < 0$ e $y < 0$, luego cuadrante III.<br>$\\left(-\\frac{1}{3},\\ 4\\right)$: $x < 0$ e $y > 0$, luego cuadrante II.<br>$(1, 0)$: $y = 0$, luego queda sobre el eje $x$.",
            "$(3, -1)$: $x = 3 > 0$ and $y = -1 < 0$, hence quadrant IV.<br>$(-2, -5)$: $x < 0$ and $y < 0$, hence quadrant III.<br>$\\left(-\\frac{1}{3},\\ 4\\right)$: $x < 0$ and $y > 0$, hence quadrant II.<br>$(1, 0)$: $y = 0$, so it sits on the $x$-axis.",
          ),
          step(
            "result",
            "El punto $(3, -1)$ está en el **cuadrante IV**. Control por signos ✓: $x = 3 > 0$ (a la derecha del eje $y$) e $y = -1 < 0$ (debajo del eje $x$) es exactamente la firma $(+,-)$ del cuadrante IV. Del mismo conjunto: $(-2, -5)$ cae en el cuadrante III, $\\left(-\\frac{1}{3},\\ 4\\right)$ en el II y $(1, 0)$ sobre el eje $x$ (ordenada nula: no pertenece a ningún cuadrante).",
            "The point $(3, -1)$ lies in **quadrant IV**. Sign check ✓: $x = 3 > 0$ (to the right of the $y$-axis) and $y = -1 < 0$ (below the $x$-axis) is exactly the $(+,-)$ signature of quadrant IV. From the same set: $(-2, -5)$ falls in quadrant III, $\\left(-\\frac{1}{3},\\ 4\\right)$ in II, and $(1, 0)$ on the $x$-axis (zero ordinate: it belongs to no quadrant).",
          ),
        ],
      };
    },
  ),

  /* S13.2 — localizar 4 puntos; se pregunta por (0, -6) → sobre el eje y. */
  template(
    {
      id: "pt-uees-2",
      subject: "math",
      topicId: "analytic-geometry",
      subtopicId: "coordinate-geometry",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 60,
      tags: ["points", "quadrants", "coordinate-axes"],
      prerequisites: ["functions"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "13 · 2",
        page: 14,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("Sobre el eje $y$", "On the $y$-axis"), correct: true },
        { id: "b", text: L("Cuadrante III", "Quadrant III"), correct: false },
        { id: "c", text: L("Cuadrante IV", "Quadrant IV"), correct: false },
        { id: "d", text: L("En el origen", "At the origin"), correct: false },
      ];
      return {
        skill: L(
          "Ubicar puntos y reconocer los ejes coordenados",
          "Plotting points and recognizing the coordinate axes",
        ),
        statement: L(
          "Localice y marque en el plano cartesiano los puntos $(-4, 5)$, $(3, 0)$, $(1, 1)$ y $(0, -6)$, y responda: ¿en qué cuadrante (o sobre qué eje) se encuentra el punto $(0, -6)$?",
          "Plot and mark the points $(-4, 5)$, $(3, 0)$, $(1, 1)$ and $(0, -6)$ on the Cartesian plane, and answer: in which quadrant (or on which axis) does the point $(0, -6)$ lie?",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Cada punto se ubica con su abscisa $x$ y su ordenada $y$: el signo de cada una decide hacia qué lado del plano se mueve uno.",
            "Each point is placed with its abscissa $x$ and its ordinate $y$: the sign of each decides towards which side of the plane you move.",
          ),
          L(
            "Un punto está sobre el eje $y$ cuando su abscisa es $x = 0$; sobre el eje $x$ cuando su ordenada es $y = 0$; y en el origen solo cuando ambas valen $0$.",
            "A point lies on the $y$-axis when its abscissa is $x = 0$; on the $x$-axis when its ordinate is $y = 0$; and at the origin only when both are $0$.",
          ),
          L(
            "El punto pedido tiene $x = 0$ e $y = -6 \\ne 0$: eso lo coloca exactamente sobre uno de los ejes, pero no en el origen.",
            "The requested point has $x = 0$ and $y = -6 \\ne 0$: that places it exactly on one of the axes, but not at the origin.",
          ),
        ],
        answerDisplay: L(
          "El punto $(0, -6)$ está **sobre el eje $y$**.",
          "The point $(0, -6)$ lies **on the $y$-axis**.",
        ),
        solution: [
          step(
            "given",
            "El conjunto de puntos $(-4, 5)$, $(3, 0)$, $(1, 1)$ y $(0, -6)$; se pregunta por el punto $(0, -6)$.",
            "The set of points $(-4, 5)$, $(3, 0)$, $(1, 1)$ and $(0, -6)$; the question asks about the point $(0, -6)$.",
          ),
          step(
            "approach",
            "Se clasifica cada punto por los signos de sus coordenadas, prestando atención a las coordenadas nulas: ellas mandan el punto a un eje (o al origen).",
            "Each point is classified by the signs of its coordinates, paying attention to zero coordinates: they send the point to an axis (or to the origin).",
          ),
          step(
            "calculation",
            "$(0, -6)$: $x = 0$ e $y = -6 \\ne 0$, luego sobre el eje $y$ (por debajo del origen).<br>$(-4, 5)$: $x < 0$ e $y > 0$, luego cuadrante II.<br>$(3, 0)$: $y = 0$, luego sobre el eje $x$.<br>$(1, 1)$: $x > 0$ e $y > 0$, luego cuadrante I.",
            "$(0, -6)$: $x = 0$ and $y = -6 \\ne 0$, hence on the $y$-axis (below the origin).<br>$(-4, 5)$: $x < 0$ and $y > 0$, hence quadrant II.<br>$(3, 0)$: $y = 0$, hence on the $x$-axis.<br>$(1, 1)$: $x > 0$ and $y > 0$, hence quadrant I.",
          ),
          step(
            "result",
            "El punto $(0, -6)$ está **sobre el eje $y$**. Control por signos ✓: solo los puntos con $x = 0$ viven sobre el eje $y$, y como $y = -6 \\ne 0$ no se trata del origen; además, con $x = 0$ el punto no puede pertenecer a ningún cuadrante (los cuadrantes exigen $x \\ne 0$ e $y \\ne 0$).",
            "The point $(0, -6)$ lies **on the $y$-axis**. Sign check ✓: only points with $x = 0$ live on the $y$-axis, and since $y = -6 \\ne 0$ it is not the origin; moreover, with $x = 0$ the point cannot belong to any quadrant (quadrants require $x \\ne 0$ and $y \\ne 0$).",
          ),
        ],
      };
    },
  ),

  /* S15.1 — pendiente de (3, 2) y (7, 10) → m = 2. */
  template(
    {
      id: "slope-uees-1",
      subject: "math",
      topicId: "analytic-geometry",
      subtopicId: "slope",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 60,
      tags: ["slope", "two-points"],
      prerequisites: ["functions"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "15 · 1",
        page: 17,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L(
        "Pendiente de una recta a partir de dos puntos",
        "Slope of a line from two points",
      ),
      statement: L(
        "Calcule la pendiente de la recta que pasa por los puntos $(3, 2)$ y $(7, 10)$.",
        "Compute the slope of the line that passes through the points $(3, 2)$ and $(7, 10)$.",
      ),
      answer: { kind: "numeric", value: 2, tolerance: { mode: "relative", value: 0.02 } },
      hints: [
        L(
          "La pendiente de una recta es la razón entre la variación de $y$ y la variación de $x$ entre dos de sus puntos.",
          "The slope of a line is the ratio of the change in $y$ to the change in $x$ between two of its points.",
        ),
        L(
          "Fórmula: $m = \\frac{y_{2} - y_{1}}{x_{2} - x_{1}}$; reste las coordenadas en el mismo orden arriba y abajo.",
          "Formula: $m = \\frac{y_{2} - y_{1}}{x_{2} - x_{1}}$; subtract the coordinates in the same order on top and on the bottom.",
        ),
        L(
          "Aquí $\\Delta y = 10 - 2 = 8$ y $\\Delta x = 7 - 3 = 4$; ahora divida.",
          "Here $\\Delta y = 10 - 2 = 8$ and $\\Delta x = 7 - 3 = 4$; now divide.",
        ),
      ],
      answerDisplay: L("$m = 2$", "$m = 2$"),
      solution: [
        step(
          "given",
          "La recta pasa por $(3, 2)$ y $(7, 10)$.",
          "The line passes through $(3, 2)$ and $(7, 10)$.",
        ),
        step(
          "approach",
          "La pendiente es la razón entre la variación de $y$ y la variación de $x$ entre los dos puntos: $m = \\frac{y_{2} - y_{1}}{x_{2} - x_{1}}$.",
          "The slope is the ratio of the change in $y$ to the change in $x$ between the two points: $m = \\frac{y_{2} - y_{1}}{x_{2} - x_{1}}$.",
        ),
        step(
          "calculation",
          "$\\Delta y = 10 - 2 = 8$<br>$\\Delta x = 7 - 3 = 4$<br>$m = \\frac{\\Delta y}{\\Delta x} = \\frac{8}{4} = 2$",
          "$\\Delta y = 10 - 2 = 8$<br>$\\Delta x = 7 - 3 = 4$<br>$m = \\frac{\\Delta y}{\\Delta x} = \\frac{8}{4} = 2$",
        ),
        step(
          "result",
          "$m = 2$. Control ✓: al avanzar $\\Delta x = 4$ desde $(3, 2)$, la recta debe subir $m \\cdot \\Delta x = 2 \\cdot 4 = 8$, y en efecto $2 + 8 = 10$: se llega a $(7, 10)$ ✓.",
          "$m = 2$. Check ✓: advancing $\\Delta x = 4$ from $(3, 2)$, the line must rise $m \\cdot \\Delta x = 2 \\cdot 4 = 8$, and indeed $2 + 8 = 10$: we land on $(7, 10)$ ✓.",
        ),
      ],
    }),
  ),

  /* S15.2 — pendiente de (-2, 10) y (5, 3) → m = -1. */
  template(
    {
      id: "slope-uees-2",
      subject: "math",
      topicId: "analytic-geometry",
      subtopicId: "slope",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 60,
      tags: ["slope", "two-points"],
      prerequisites: ["functions"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "15 · 2",
        page: 17,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L(
        "Pendiente de una recta a partir de dos puntos",
        "Slope of a line from two points",
      ),
      statement: L(
        "Calcule la pendiente de la recta que pasa por los puntos $(-2, 10)$ y $(5, 3)$.",
        "Compute the slope of the line that passes through the points $(-2, 10)$ and $(5, 3)$.",
      ),
      answer: { kind: "numeric", value: -1, tolerance: { mode: "relative", value: 0.02 } },
      hints: [
        L(
          "La pendiente compara cuánto sube (o baja) la recta con cuánto avanza en horizontal.",
          "The slope compares how much the line rises (or falls) with how far it moves horizontally.",
        ),
        L(
          "Con $(-2, 10)$ y $(5, 3)$: $m = \\frac{3 - 10}{5 - (-2)}$; el doble signo del denominador pide cuidado.",
          "With $(-2, 10)$ and $(5, 3)$: $m = \\frac{3 - 10}{5 - (-2)}$; the double sign in the denominator calls for care.",
        ),
        L(
          "$\\Delta y = -7$ y $\\Delta x = 7$; la pendiente sale negativa porque la recta baja al avanzar.",
          "$\\Delta y = -7$ and $\\Delta x = 7$; the slope comes out negative because the line falls as it advances.",
        ),
      ],
      answerDisplay: L("$m = -1$", "$m = -1$"),
      solution: [
        step(
          "given",
          "La recta pasa por $(-2, 10)$ y $(5, 3)$.",
          "The line passes through $(-2, 10)$ and $(5, 3)$.",
        ),
        step(
          "approach",
          "Se aplica $m = \\frac{y_{2} - y_{1}}{x_{2} - x_{1}}$ restando las coordenadas en el mismo orden.",
          "Apply $m = \\frac{y_{2} - y_{1}}{x_{2} - x_{1}}$, subtracting the coordinates in the same order.",
        ),
        step(
          "calculation",
          "$\\Delta y = 3 - 10 = -7$<br>$\\Delta x = 5 - (-2) = 7$<br>$m = \\frac{-7}{7} = -1$",
          "$\\Delta y = 3 - 10 = -7$<br>$\\Delta x = 5 - (-2) = 7$<br>$m = \\frac{-7}{7} = -1$",
        ),
        step(
          "result",
          "$m = -1$. Control ✓: al avanzar $\\Delta x = 7$ desde $(-2, 10)$, la recta baja $m \\cdot \\Delta x = (-1) \\cdot 7 = -7$, y en efecto $10 - 7 = 3$: se llega a $(5, 3)$ ✓ (pendiente negativa: recta decreciente).",
          "$m = -1$. Check ✓: advancing $\\Delta x = 7$ from $(-2, 10)$, the line falls by $m \\cdot \\Delta x = (-1) \\cdot 7 = -7$, and indeed $10 - 7 = 3$: we land on $(5, 3)$ ✓ (negative slope: a decreasing line).",
        ),
      ],
    }),
  ),

  /* S15.3 — pendiente de (6, -2) y (8, -3) → m = -1/2 (decimal). */
  template(
    {
      id: "slope-uees-3",
      subject: "math",
      topicId: "analytic-geometry",
      subtopicId: "slope",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 90,
      tags: ["slope", "two-points", "fractions"],
      prerequisites: ["functions"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "15 · 3",
        page: 17,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L(
        "Pendiente con resultado fraccionario",
        "Slope with a fractional result",
      ),
      statement: L(
        "Calcule la pendiente de la recta que pasa por los puntos $(6, -2)$ y $(8, -3)$.\n\n(escriba el resultado como decimal)",
        "Compute the slope of the line that passes through the points $(6, -2)$ and $(8, -3)$.\n\n(give your answer as a decimal)",
      ),
      answer: { kind: "numeric", value: -0.5, tolerance: { mode: "relative", value: 0.02 } },
      hints: [
        L(
          "La pendiente es la razón entre la variación de $y$ y la variación de $x$ entre los dos puntos.",
          "The slope is the ratio of the change in $y$ to the change in $x$ between the two points.",
        ),
        L(
          "$m = \\frac{-3 - (-2)}{8 - 6}$: cuidado con el doble signo del numerador.",
          "$m = \\frac{-3 - (-2)}{8 - 6}$: watch the double sign in the numerator.",
        ),
        L(
          "$\\Delta y = -1$ y $\\Delta x = 2$; el resultado es una fracción — exprésela como decimal.",
          "$\\Delta y = -1$ and $\\Delta x = 2$; the result is a fraction — write it as a decimal.",
        ),
      ],
      answerDisplay: L(
        "$m = -\\frac{1}{2} = -0{,}5$",
        "$m = -\\frac{1}{2} = -0.5$",
      ),
      solution: [
        step(
          "given",
          "La recta pasa por $(6, -2)$ y $(8, -3)$.",
          "The line passes through $(6, -2)$ and $(8, -3)$.",
        ),
        step(
          "approach",
          "Se aplica $m = \\frac{y_{2} - y_{1}}{x_{2} - x_{1}}$; el resultado no será entero, así que al final se pasa a decimal.",
          "Apply $m = \\frac{y_{2} - y_{1}}{x_{2} - x_{1}}$; the result will not be a whole number, so it is converted to a decimal at the end.",
        ),
        step(
          "calculation",
          "$\\Delta y = -3 - (-2) = -1$<br>$\\Delta x = 8 - 6 = 2$<br>$m = \\frac{-1}{2} = -\\frac{1}{2}$",
          "$\\Delta y = -3 - (-2) = -1$<br>$\\Delta x = 8 - 6 = 2$<br>$m = \\frac{-1}{2} = -\\frac{1}{2}$",
        ),
        step(
          "result",
          "$m = -\\frac{1}{2} = -0{,}5$. Control ✓: $m \\cdot \\Delta x = \\left(-\\frac{1}{2}\\right) \\cdot 2 = -1 = \\Delta y$: desde $(6, -2)$, $-2 - 1 = -3$, se llega a $(8, -3)$ ✓.",
          "$m = -\\frac{1}{2} = -0.5$. Check ✓: $m \\cdot \\Delta x = \\left(-\\frac{1}{2}\\right) \\cdot 2 = -1 = \\Delta y$: from $(6, -2)$, $-2 - 1 = -3$, we land on $(8, -3)$ ✓.",
        ),
      ],
    }),
  ),

  /* S15.4 — pendiente de (2, -4) y (3, -4) → m = 0 (trampa: 0, no indefinida). */
  template(
    {
      id: "slope-uees-4",
      subject: "math",
      topicId: "analytic-geometry",
      subtopicId: "slope",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 75,
      tags: ["slope", "horizontal-line", "special-cases"],
      prerequisites: ["functions"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "15 · 4",
        page: 17,
      },
      reasoning: "case-analysis",
    },
    () => ({
      skill: L(
        "Reconocer una pendiente nula (recta horizontal)",
        "Recognizing a zero slope (horizontal line)",
      ),
      statement: L(
        "Calcule la pendiente de la recta que pasa por los puntos $(2, -4)$ y $(3, -4)$.",
        "Compute the slope of the line that passes through the points $(2, -4)$ and $(3, -4)$.",
      ),
      answer: { kind: "numeric", value: 0, tolerance: { mode: "relative", value: 0.02 } },
      hints: [
        L(
          "La pendiente es $m = \\frac{\\Delta y}{\\Delta x}$; antes de calcular, compare las coordenadas de los dos puntos.",
          "The slope is $m = \\frac{\\Delta y}{\\Delta x}$; before computing, compare the coordinates of the two points.",
        ),
        L(
          "Un caso especial aparece cuando una de las dos variaciones se anula: identifique cuál es aquí.",
          "A special case appears when one of the two changes vanishes: identify which one it is here.",
        ),
        L(
          "Distinga los dos casos: si $\\Delta y = 0$ (con $\\Delta x \\ne 0$) la pendiente existe y vale $0$; solo si $\\Delta x = 0$ (con $\\Delta y \\ne 0$) la pendiente no existe. Aquí las dos ordenadas son iguales…",
          "Distinguish the two cases: if $\\Delta y = 0$ (with $\\Delta x \\ne 0$) the slope exists and equals $0$; only if $\\Delta x = 0$ (with $\\Delta y \\ne 0$) does the slope not exist. Here the two ordinates are equal…",
        ),
      ],
      answerDisplay: L("$m = 0$", "$m = 0$"),
      solution: [
        step(
          "given",
          "La recta pasa por $(2, -4)$ y $(3, -4)$.",
          "The line passes through $(2, -4)$ and $(3, -4)$.",
        ),
        step(
          "approach",
          "Se calcula $m = \\frac{\\Delta y}{\\Delta x}$ mirando primero cuál de las dos variaciones se anula: eso decide entre pendiente nula y pendiente indefinida.",
          "Compute $m = \\frac{\\Delta y}{\\Delta x}$, first checking which of the two changes vanishes: that decides between a zero slope and an undefined slope.",
        ),
        step(
          "calculation",
          "$\\Delta y = -4 - (-4) = 0$<br>$\\Delta x = 3 - 2 = 1 \\ne 0$<br>$m = \\frac{0}{1} = 0$",
          "$\\Delta y = -4 - (-4) = 0$<br>$\\Delta x = 3 - 2 = 1 \\ne 0$<br>$m = \\frac{0}{1} = 0$",
        ),
        step(
          "result",
          "$m = 0$. Control ✓: $\\Delta y = 0$ con $\\Delta x = 1 \\ne 0$, así que la pendiente existe y vale $0$ — la recta es la horizontal $y = -4$ (ambos puntos tienen ordenada $-4$ ✓). Ojo con la trampa: la pendiente solo deja de existir cuando se anula el **denominador** $\\Delta x$ (recta vertical), no el numerador.",
          "$m = 0$. Check ✓: $\\Delta y = 0$ with $\\Delta x = 1 \\ne 0$, so the slope exists and equals $0$ — the line is the horizontal $y = -4$ (both points have ordinate $-4$ ✓). Watch the trap: the slope only ceases to exist when the **denominator** $\\Delta x$ vanishes (vertical line), not the numerator.",
        ),
      ],
    }),
  ),

  /* S15.5 — pendiente de (5, 3) y (5, -8) → no existe (recta vertical). MC. */
  template(
    {
      id: "slope-uees-5",
      subject: "math",
      topicId: "analytic-geometry",
      subtopicId: "slope",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 90,
      tags: ["slope", "vertical-line", "special-cases"],
      prerequisites: ["functions"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "15 · 5",
        page: 17,
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L("La pendiente no existe (recta vertical)", "The slope does not exist (vertical line)"),
          correct: true,
        },
        { id: "b", text: L("$m = 0$ (recta horizontal)", "$m = 0$ (horizontal line)"), correct: false },
        { id: "c", text: L("$m = 11$", "$m = 11$"), correct: false },
        { id: "d", text: L("$m = \\frac{13}{0} = 0$", "$m = \\frac{13}{0} = 0$"), correct: false },
      ];
      return {
        skill: L(
          "Reconocer una recta vertical (pendiente indefinida)",
          "Recognizing a vertical line (undefined slope)",
        ),
        statement: L(
          "Calcule la pendiente de la recta que pasa por los puntos $(5, 3)$ y $(5, -8)$.",
          "Compute the slope of the line that passes through the points $(5, 3)$ and $(5, -8)$.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Antes de aplicar la fórmula, compare las abscisas de los dos puntos: ¿avanza la recta en $x$?",
            "Before applying the formula, compare the abscissas of the two points: does the line advance in $x$?",
          ),
          L(
            "La fórmula es $m = \\frac{y_{2} - y_{1}}{x_{2} - x_{1}}$: el denominador mide el avance horizontal de la recta.",
            "The formula is $m = \\frac{y_{2} - y_{1}}{x_{2} - x_{1}}$: the denominator measures the horizontal advance of the line.",
          ),
          L(
            "Aquí $x_{1} = x_{2} = 5$, así que el **denominador** de la pendiente es $5 - 5 = 0$.",
            "Here $x_{1} = x_{2} = 5$, so the **denominator** of the slope is $5 - 5 = 0$.",
          ),
        ],
        answerDisplay: L(
          "La pendiente **no existe**: la recta es vertical, $x = 5$.",
          "The slope **does not exist**: the line is vertical, $x = 5$.",
        ),
        solution: [
          step(
            "given",
            "La recta pasa por $(5, 3)$ y $(5, -8)$.",
            "The line passes through $(5, 3)$ and $(5, -8)$.",
          ),
          step(
            "approach",
            "Se aplica $m = \\frac{y_{2} - y_{1}}{x_{2} - x_{1}}$ tras comparar las abscisas: si coinciden, la recta es vertical y el denominador de la pendiente es $0$.",
            "Apply $m = \\frac{y_{2} - y_{1}}{x_{2} - x_{1}}$ after comparing the abscissas: if they coincide, the line is vertical and the denominator of the slope is $0$.",
          ),
          step(
            "calculation",
            "$\\Delta x = 5 - 5 = 0$<br>$\\Delta y = -8 - 3 = -11 \\ne 0$<br>$m = \\frac{-11}{0}$: división entre cero — la pendiente no está definida.",
            "$\\Delta x = 5 - 5 = 0$<br>$\\Delta y = -8 - 3 = -11 \\ne 0$<br>$m = \\frac{-11}{0}$: division by zero — the slope is undefined.",
          ),
          step(
            "result",
            "La pendiente **no existe** (recta vertical $x = 5$) ✓: ambos puntos tienen abscisa $5$, así que la recta no avanza en $x$. El distractor $m = 11$ usa solo el numerador y además con el signo cambiado ($\\Delta y = -11$); y $m = \\frac{13}{0} = 0$ mezcla coordenadas de puntos distintos ($5 - (-8) = 13$) y, además, una división entre cero no da $0$ ✗.",
            "The slope **does not exist** (vertical line $x = 5$) ✓: both points have abscissa $5$, so the line does not advance in $x$. The distractor $m = 11$ uses only the numerator and with the wrong sign at that ($\\Delta y = -11$); and $m = \\frac{13}{0} = 0$ mixes coordinates of different points ($5 - (-8) = 13$) and, moreover, a division by zero does not give $0$ ✗.",
          ),
        ],
      };
    },
  ),

  /* S15.6 — pendiente de (0, -4) y (3, 6) → m = 10/3 (decimal). */
  template(
    {
      id: "slope-uees-6",
      subject: "math",
      topicId: "analytic-geometry",
      subtopicId: "slope",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 90,
      tags: ["slope", "two-points", "fractions"],
      prerequisites: ["functions"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "15 · 6",
        page: 17,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L(
        "Pendiente de una recta a partir de dos puntos",
        "Slope of a line from two points",
      ),
      statement: L(
        "Calcule la pendiente de la recta que pasa por los puntos $(0, -4)$ y $(3, 6)$.\n\n(escriba el resultado como decimal)",
        "Compute the slope of the line that passes through the points $(0, -4)$ and $(3, 6)$.\n\n(give your answer as a decimal)",
      ),
      answer: { kind: "numeric", value: 10 / 3, tolerance: { mode: "relative", value: 0.02 } },
      hints: [
        L(
          "La pendiente es la razón entre la variación de $y$ y la variación de $x$ entre los dos puntos.",
          "The slope is the ratio of the change in $y$ to the change in $x$ between the two points.",
        ),
        L(
          "Con $(0, -4)$ y $(3, 6)$: $m = \\frac{6 - (-4)}{3 - 0}$.",
          "With $(0, -4)$ and $(3, 6)$: $m = \\frac{6 - (-4)}{3 - 0}$.",
        ),
        L(
          "$\\Delta y = 10$ y $\\Delta x = 3$; el cociente no es entero — divida y escriba el decimal (dos cifras bastan).",
          "$\\Delta y = 10$ and $\\Delta x = 3$; the quotient is not a whole number — divide and write the decimal (two digits suffice).",
        ),
      ],
      answerDisplay: L(
        "$m = \\frac{10}{3} \\approx 3{,}33$",
        "$m = \\frac{10}{3} \\approx 3.33$",
      ),
      solution: [
        step(
          "given",
          "La recta pasa por $(0, -4)$ y $(3, 6)$.",
          "The line passes through $(0, -4)$ and $(3, 6)$.",
        ),
        step(
          "approach",
          "Se aplica $m = \\frac{y_{2} - y_{1}}{x_{2} - x_{1}}$; como el resultado es un decimal periódico, se entrega redondeado.",
          "Apply $m = \\frac{y_{2} - y_{1}}{x_{2} - x_{1}}$; since the result is a repeating decimal, it is given rounded.",
        ),
        step(
          "calculation",
          "$\\Delta y = 6 - (-4) = 10$<br>$\\Delta x = 3 - 0 = 3$<br>$m = \\frac{10}{3} \\approx 3{,}33$",
          "$\\Delta y = 6 - (-4) = 10$<br>$\\Delta x = 3 - 0 = 3$<br>$m = \\frac{10}{3} \\approx 3.33$",
        ),
        step(
          "result",
          "$m = \\frac{10}{3} \\approx 3{,}33$. Control ✓: $m \\cdot \\Delta x = \\frac{10}{3} \\cdot 3 = 10 = \\Delta y$: desde $(0, -4)$, $-4 + 10 = 6$, se llega a $(3, 6)$ ✓.",
          "$m = \\frac{10}{3} \\approx 3.33$. Check ✓: $m \\cdot \\Delta x = \\frac{10}{3} \\cdot 3 = 10 = \\Delta y$: from $(0, -4)$, $-4 + 10 = 6$, we land on $(3, 6)$ ✓.",
        ),
      ],
    }),
  ),

  /* S15.7 — pendiente de (5, -2) y (4, -2) → m = 0. */
  template(
    {
      id: "slope-uees-7",
      subject: "math",
      topicId: "analytic-geometry",
      subtopicId: "slope",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 75,
      tags: ["slope", "horizontal-line", "special-cases"],
      prerequisites: ["functions"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "15 · 7",
        page: 17,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L(
        "Reconocer una pendiente nula (recta horizontal)",
        "Recognizing a zero slope (horizontal line)",
      ),
      statement: L(
        "Calcule la pendiente de la recta que pasa por los puntos $(5, -2)$ y $(4, -2)$.",
        "Compute the slope of the line that passes through the points $(5, -2)$ and $(4, -2)$.",
      ),
      answer: { kind: "numeric", value: 0, tolerance: { mode: "relative", value: 0.02 } },
      hints: [
        L(
          "La pendiente es la razón entre la variación de $y$ y la variación de $x$ entre los dos puntos.",
          "The slope is the ratio of the change in $y$ to the change in $x$ between the two points.",
        ),
        L(
          "Calcule primero $\\Delta y = -2 - (-2)$ y $\\Delta x = 4 - 5$.",
          "First compute $\\Delta y = -2 - (-2)$ and $\\Delta x = 4 - 5$.",
        ),
        L(
          "Numerador nulo y denominador $-1 \\ne 0$: divida cuidando que el denominador es negativo.",
          "Null numerator and denominator $-1 \\ne 0$: divide, taking care that the denominator is negative.",
        ),
      ],
      answerDisplay: L("$m = 0$", "$m = 0$"),
      solution: [
        step(
          "given",
          "La recta pasa por $(5, -2)$ y $(4, -2)$.",
          "The line passes through $(5, -2)$ and $(4, -2)$.",
        ),
        step(
          "approach",
          "Se aplica $m = \\frac{\\Delta y}{\\Delta x}$ con las dos variaciones calculadas por separado.",
          "Apply $m = \\frac{\\Delta y}{\\Delta x}$ with the two changes computed separately.",
        ),
        step(
          "calculation",
          "$\\Delta y = -2 - (-2) = 0$<br>$\\Delta x = 4 - 5 = -1 \\ne 0$<br>$m = \\frac{0}{-1} = 0$",
          "$\\Delta y = -2 - (-2) = 0$<br>$\\Delta x = 4 - 5 = -1 \\ne 0$<br>$m = \\frac{0}{-1} = 0$",
        ),
        step(
          "result",
          "$m = 0$. Control ✓: $\\Delta y = 0$ con $\\Delta x = -1 \\ne 0$, así que la pendiente existe y vale $0$ — la recta es la horizontal $y = -2$ (ambos puntos tienen ordenada $-2$ ✓). Un denominador negativo no convierte el cero del numerador en otra cosa: $\\frac{0}{-1} = 0$.",
          "$m = 0$. Check ✓: $\\Delta y = 0$ with $\\Delta x = -1 \\ne 0$, so the slope exists and equals $0$ — the line is the horizontal $y = -2$ (both points have ordinate $-2$ ✓). A negative denominator does not turn the zero numerator into anything else: $\\frac{0}{-1} = 0$.",
        ),
      ],
    }),
  ),

  /* S15.8 — pendiente de (1, -7) y (9, 0) → m = 7/8 (decimal). */
  template(
    {
      id: "slope-uees-8",
      subject: "math",
      topicId: "analytic-geometry",
      subtopicId: "slope",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 90,
      tags: ["slope", "two-points", "fractions"],
      prerequisites: ["functions"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "15 · 8",
        page: 17,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L(
        "Pendiente con resultado fraccionario",
        "Slope with a fractional result",
      ),
      statement: L(
        "Calcule la pendiente de la recta que pasa por los puntos $(1, -7)$ y $(9, 0)$.\n\n(escriba el resultado como decimal)",
        "Compute the slope of the line that passes through the points $(1, -7)$ and $(9, 0)$.\n\n(give your answer as a decimal)",
      ),
      answer: { kind: "numeric", value: 7 / 8, tolerance: { mode: "relative", value: 0.02 } },
      hints: [
        L(
          "La pendiente es la razón entre la variación de $y$ y la variación de $x$ entre los dos puntos.",
          "The slope is the ratio of the change in $y$ to the change in $x$ between the two points.",
        ),
        L(
          "Con $(1, -7)$ y $(9, 0)$: $m = \\frac{0 - (-7)}{9 - 1}$.",
          "With $(1, -7)$ and $(9, 0)$: $m = \\frac{0 - (-7)}{9 - 1}$.",
        ),
        L(
          "$\\Delta y = 7$ y $\\Delta x = 8$; el resultado es una fracción menor que $1$ — exprésela como decimal.",
          "$\\Delta y = 7$ and $\\Delta x = 8$; the result is a fraction smaller than $1$ — write it as a decimal.",
        ),
      ],
      answerDisplay: L(
        "$m = \\frac{7}{8} = 0{,}875$",
        "$m = \\frac{7}{8} = 0.875$",
      ),
      solution: [
        step(
          "given",
          "La recta pasa por $(1, -7)$ y $(9, 0)$.",
          "The line passes through $(1, -7)$ and $(9, 0)$.",
        ),
        step(
          "approach",
          "Se aplica $m = \\frac{y_{2} - y_{1}}{x_{2} - x_{1}}$ y al final se pasa la fracción a decimal.",
          "Apply $m = \\frac{y_{2} - y_{1}}{x_{2} - x_{1}}$ and convert the fraction to a decimal at the end.",
        ),
        step(
          "calculation",
          "$\\Delta y = 0 - (-7) = 7$<br>$\\Delta x = 9 - 1 = 8$<br>$m = \\frac{7}{8} = 0{,}875$",
          "$\\Delta y = 0 - (-7) = 7$<br>$\\Delta x = 9 - 1 = 8$<br>$m = \\frac{7}{8} = 0.875$",
        ),
        step(
          "result",
          "$m = \\frac{7}{8} = 0{,}875$. Control ✓: $m \\cdot \\Delta x = \\frac{7}{8} \\cdot 8 = 7 = \\Delta y$: desde $(1, -7)$, $-7 + 7 = 0$, se llega a $(9, 0)$ ✓.",
          "$m = \\frac{7}{8} = 0.875$. Check ✓: $m \\cdot \\Delta x = \\frac{7}{8} \\cdot 8 = 7 = \\Delta y$: from $(1, -7)$, $-7 + 7 = 0$, we land on $(9, 0)$ ✓.",
        ),
      ],
    }),
  ),

  /* S15.9 — por (-1, 7) con m = -5 → 5x + y - 2 = 0. */
  template(
    {
      id: "lineq-uees-9",
      subject: "math",
      topicId: "analytic-geometry",
      subtopicId: "line-equations",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["line-equations", "general-form", "point-slope"],
      prerequisites: ["functions"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "15 · 9",
        page: 17,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$5x + y - 2 = 0$", "$5x + y - 2 = 0$"), correct: true },
        { id: "b", text: L("$5x + y + 2 = 0$", "$5x + y + 2 = 0$"), correct: false },
        { id: "c", text: L("$5x - y - 2 = 0$", "$5x - y - 2 = 0$"), correct: false },
        { id: "d", text: L("$x + 5y - 2 = 0$", "$x + 5y - 2 = 0$"), correct: false },
      ];
      return {
        skill: L(
          "Ecuación general a partir de un punto y la pendiente",
          "General equation from a point and the slope",
        ),
        statement: L(
          "Encuentre una ecuación general ($Ax + By + C = 0$) de la recta que pasa por el punto $(-1, 7)$ y tiene pendiente $-5$.",
          "Find a general equation ($Ax + By + C = 0$) of the line that passes through the point $(-1, 7)$ and has slope $-5$.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Con un punto y la pendiente, el camino directo es la forma punto-pendiente: $y - y_{1} = m(x - x_{1})$.",
            "With a point and the slope, the direct route is the point-slope form: $y - y_{1} = m(x - x_{1})$.",
          ),
          L(
            "Sustituya $m = -5$ y $(x_{1}, y_{1}) = (-1, 7)$; ojo con el signo: $x - (-1) = x + 1$.",
            "Substitute $m = -5$ and $(x_{1}, y_{1}) = (-1, 7)$; watch the sign: $x - (-1) = x + 1$.",
          ),
          L(
            "Parta de $y - 7 = -5(x + 1)$, desarrolle el lado derecho y pase todos los términos al miembro izquierdo.",
            "Start from $y - 7 = -5(x + 1)$, expand the right-hand side and move every term to the left-hand side.",
          ),
        ],
        answerDisplay: L("$5x + y - 2 = 0$", "$5x + y - 2 = 0$"),
        solution: [
          step(
            "given",
            "La recta pasa por $(-1, 7)$ y tiene pendiente $m = -5$; se pide la forma general $Ax + By + C = 0$.",
            "The line passes through $(-1, 7)$ and has slope $m = -5$; the general form $Ax + By + C = 0$ is requested.",
          ),
          step(
            "approach",
            "Se usa la forma punto-pendiente $y - y_{1} = m(x - x_{1})$, se desarrolla y se reordenan todos los términos a la izquierda.",
            "Use the point-slope form $y - y_{1} = m(x - x_{1})$, expand, and rearrange every term to the left.",
          ),
          step(
            "calculation",
            "$y - 7 = -5(x - (-1)) = -5(x + 1)$<br>$y - 7 = -5x - 5$<br>$y = -5x + 2$<br>Reordenando: $5x + y - 2 = 0$",
            "$y - 7 = -5(x - (-1)) = -5(x + 1)$<br>$y - 7 = -5x - 5$<br>$y = -5x + 2$<br>Rearranging: $5x + y - 2 = 0$",
          ),
          step(
            "result",
            "Una ecuación general de la recta es $5x + y - 2 = 0$. Control ✓: el punto dado la satisface, $5 \\cdot (-1) + 7 - 2 = -5 + 7 - 2 = 0$ ✓, y despejando $y = -5x + 2$ se lee pendiente $-5$ ✓. El distractor $5x + y + 2 = 0$ falla la prueba del punto: $5 \\cdot (-1) + 7 + 2 = 4 \\ne 0$ ✗.",
            "A general equation of the line is $5x + y - 2 = 0$. Check ✓: the given point satisfies it, $5 \\cdot (-1) + 7 - 2 = -5 + 7 - 2 = 0$ ✓, and solving for $y = -5x + 2$ reads slope $-5$ ✓. The distractor $5x + y + 2 = 0$ fails the point test: $5 \\cdot (-1) + 7 + 2 = 4 \\ne 0$ ✗.",
          ),
        ],
      };
    },
  ),

  /* S15.10 — por el origen con m = 75 → 75x - y = 0. */
  template(
    {
      id: "lineq-uees-10",
      subject: "math",
      topicId: "analytic-geometry",
      subtopicId: "line-equations",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["line-equations", "general-form", "point-slope"],
      prerequisites: ["functions"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "15 · 10",
        page: 17,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$75x - y = 0$", "$75x - y = 0$"), correct: true },
        { id: "b", text: L("$75x + y = 0$", "$75x + y = 0$"), correct: false },
        { id: "c", text: L("$x - 75y = 0$", "$x - 75y = 0$"), correct: false },
        { id: "d", text: L("$x + 75y = 0$", "$x + 75y = 0$"), correct: false },
      ];
      return {
        skill: L(
          "Ecuación general a partir de un punto y la pendiente",
          "General equation from a point and the slope",
        ),
        statement: L(
          "Encuentre una ecuación general ($Ax + By + C = 0$) de la recta que pasa por el origen y tiene pendiente $75$.",
          "Find a general equation ($Ax + By + C = 0$) of the line that passes through the origin and has slope $75$.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Toda recta que pasa por el origen tiene ordenada al origen $b = 0$: es de la forma $y = mx$.",
            "Every line through the origin has $y$-intercept $b = 0$: it has the form $y = mx$.",
          ),
          L(
            "Con $m = 75$ la recta es $y = 75x$; falta solo reordenar a la forma general.",
            "With $m = 75$ the line is $y = 75x$; only the rearrangement to general form remains.",
          ),
          L(
            "Al pasar $y = 75x$ a la forma $Ax + By + C = 0$, el término $y$ cambia de lado con signo negativo y el término independiente no aparece porque $C = 0$.",
            "When moving $y = 75x$ to the form $Ax + By + C = 0$, the $y$ term changes sides with a negative sign and the constant term does not appear because $C = 0$.",
          ),
        ],
        answerDisplay: L("$75x - y = 0$", "$75x - y = 0$"),
        solution: [
          step(
            "given",
            "La recta pasa por el origen $(0, 0)$ y tiene pendiente $m = 75$.",
            "The line passes through the origin $(0, 0)$ and has slope $m = 75$.",
          ),
          step(
            "approach",
            "Como pasa por el origen, $b = 0$ y la recta es $y = mx$; después se reordena a la forma general.",
            "Since it passes through the origin, $b = 0$ and the line is $y = mx$; then it is rearranged to general form.",
          ),
          step(
            "calculation",
            "$y = 75x$<br>$75x - y = 0$",
            "$y = 75x$<br>$75x - y = 0$",
          ),
          step(
            "result",
            "Una ecuación general de la recta es $75x - y = 0$. Control ✓: el origen la satisface, $75 \\cdot 0 - 0 = 0$ ✓, y el punto adicional $(1, 75)$ también: $75 \\cdot 1 - 75 = 0$ ✓ (pendiente $75$). El distractor $75x + y = 0$ equivale a $y = -75x$: pasa por el origen pero con pendiente $-75 \\ne 75$ ✗.",
            "A general equation of the line is $75x - y = 0$. Check ✓: the origin satisfies it, $75 \\cdot 0 - 0 = 0$ ✓, and so does the extra point $(1, 75)$: $75 \\cdot 1 - 75 = 0$ ✓ (slope $75$). The distractor $75x + y = 0$ is equivalent to $y = -75x$: it passes through the origin but with slope $-75 \\ne 75$ ✗.",
          ),
        ],
      };
    },
  ),

  /* S15.11 — por (-5, 5) con m = -1/2 → x + 2y - 5 = 0. */
  template(
    {
      id: "lineq-uees-11",
      subject: "math",
      topicId: "analytic-geometry",
      subtopicId: "line-equations",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["line-equations", "general-form", "point-slope", "fractions"],
      prerequisites: ["functions"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "15 · 11",
        page: 17,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$x + 2y - 5 = 0$", "$x + 2y - 5 = 0$"), correct: true },
        { id: "b", text: L("$x + 2y + 5 = 0$", "$x + 2y + 5 = 0$"), correct: false },
        { id: "c", text: L("$x - 2y - 5 = 0$", "$x - 2y - 5 = 0$"), correct: false },
        { id: "d", text: L("$2x + y - 5 = 0$", "$2x + y - 5 = 0$"), correct: false },
      ];
      return {
        skill: L(
          "Ecuación general a partir de un punto y la pendiente",
          "General equation from a point and the slope",
        ),
        statement: L(
          "Encuentre una ecuación general ($Ax + By + C = 0$) de la recta que pasa por el punto $(-5, 5)$ y tiene pendiente $-\\frac{1}{2}$.",
          "Find a general equation ($Ax + By + C = 0$) of the line that passes through the point $(-5, 5)$ and has slope $-\\frac{1}{2}$.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Con un punto y la pendiente, use la forma punto-pendiente: $y - y_{1} = m(x - x_{1})$.",
            "With a point and the slope, use the point-slope form: $y - y_{1} = m(x - x_{1})$.",
          ),
          L(
            "Sustituya: $y - 5 = -\\frac{1}{2}(x - (-5)) = -\\frac{1}{2}(x + 5)$ con el punto $(-5, 5)$.",
            "Substitute: $y - 5 = -\\frac{1}{2}(x - (-5)) = -\\frac{1}{2}(x + 5)$ with the point $(-5, 5)$.",
          ),
          L(
            "Multiplique toda la ecuación por $2$ para eliminar la fracción y luego reordene a la forma general.",
            "Multiply the whole equation by $2$ to clear the fraction and then rearrange to general form.",
          ),
        ],
        answerDisplay: L("$x + 2y - 5 = 0$", "$x + 2y - 5 = 0$"),
        solution: [
          step(
            "given",
            "La recta pasa por $(-5, 5)$ y tiene pendiente $m = -\\frac{1}{2}$.",
            "The line passes through $(-5, 5)$ and has slope $m = -\\frac{1}{2}$.",
          ),
          step(
            "approach",
            "Se aplica la forma punto-pendiente y se multiplica por $2$ para trabajar sin fracciones antes de reordenar.",
            "Apply the point-slope form and multiply by $2$ to work without fractions before rearranging.",
          ),
          step(
            "calculation",
            "$y - 5 = -\\frac{1}{2}(x + 5)$<br>Por $2$: $2y - 10 = -(x + 5) = -x - 5$<br>$2y - 10 + x + 5 = 0$, es decir $x + 2y - 5 = 0$",
            "$y - 5 = -\\frac{1}{2}(x + 5)$<br>By $2$: $2y - 10 = -(x + 5) = -x - 5$<br>$2y - 10 + x + 5 = 0$, that is $x + 2y - 5 = 0$",
          ),
          step(
            "result",
            "Una ecuación general de la recta es $x + 2y - 5 = 0$. Control ✓: el punto dado la satisface, $-5 + 2 \\cdot 5 - 5 = -5 + 10 - 5 = 0$ ✓; despejando, $y = -\\frac{1}{2}x + \\frac{5}{2}$, la pendiente es $-\\frac{1}{2}$ ✓. El distractor $x + 2y + 5 = 0$ falla la prueba del punto: $-5 + 10 + 5 = 10 \\ne 0$ ✗.",
            "A general equation of the line is $x + 2y - 5 = 0$. Check ✓: the given point satisfies it, $-5 + 2 \\cdot 5 - 5 = -5 + 10 - 5 = 0$ ✓; solving, $y = -\\frac{1}{2}x + \\frac{5}{2}$, the slope is $-\\frac{1}{2}$ ✓. The distractor $x + 2y + 5 = 0$ fails the point test: $-5 + 10 + 5 = 10 \\ne 0$ ✗.",
          ),
        ],
      };
    },
  ),

  /* S15.12 — por (-5/2, 5) con m = 1/3 → 2x - 6y + 35 = 0. */
  template(
    {
      id: "lineq-uees-12",
      subject: "math",
      topicId: "analytic-geometry",
      subtopicId: "line-equations",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 210,
      tags: ["line-equations", "general-form", "point-slope", "fractions"],
      prerequisites: ["functions"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "15 · 12",
        page: 17,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$2x - 6y + 35 = 0$", "$2x - 6y + 35 = 0$"), correct: true },
        { id: "b", text: L("$2x - 6y - 35 = 0$", "$2x - 6y - 35 = 0$"), correct: false },
        { id: "c", text: L("$6x - 2y + 35 = 0$", "$6x - 2y + 35 = 0$"), correct: false },
        { id: "d", text: L("$2x + 6y + 35 = 0$", "$2x + 6y + 35 = 0$"), correct: false },
      ];
      return {
        skill: L(
          "Ecuación general a partir de un punto y la pendiente",
          "General equation from a point and the slope",
        ),
        statement: L(
          "Encuentre una ecuación general ($Ax + By + C = 0$) de la recta que pasa por el punto $\\left(-\\frac{5}{2},\\ 5\\right)$ y tiene pendiente $\\frac{1}{3}$.",
          "Find a general equation ($Ax + By + C = 0$) of the line that passes through the point $\\left(-\\frac{5}{2},\\ 5\\right)$ and has slope $\\frac{1}{3}$.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Con un punto y la pendiente, use la forma punto-pendiente: $y - y_{1} = m(x - x_{1})$.",
            "With a point and the slope, use the point-slope form: $y - y_{1} = m(x - x_{1})$.",
          ),
          L(
            "Sustituya: $y - 5 = \\frac{1}{3}\\left(x + \\frac{5}{2}\\right)$ con el punto $\\left(-\\frac{5}{2},\\ 5\\right)$.",
            "Substitute: $y - 5 = \\frac{1}{3}\\left(x + \\frac{5}{2}\\right)$ with the point $\\left(-\\frac{5}{2},\\ 5\\right)$.",
          ),
          L(
            "Multiplique toda la ecuación por $6$ (el mínimo común múltiplo de $3$ y $2$) para limpiar las dos fracciones de una sola vez.",
            "Multiply the whole equation by $6$ (the least common multiple of $3$ and $2$) to clear both fractions at once.",
          ),
        ],
        answerDisplay: L("$2x - 6y + 35 = 0$", "$2x - 6y + 35 = 0$"),
        solution: [
          step(
            "given",
            "La recta pasa por $\\left(-\\frac{5}{2},\\ 5\\right)$ y tiene pendiente $m = \\frac{1}{3}$.",
            "The line passes through $\\left(-\\frac{5}{2},\\ 5\\right)$ and has slope $m = \\frac{1}{3}$.",
          ),
          step(
            "approach",
            "Se aplica la forma punto-pendiente y se multiplica por $6$ para eliminar las dos fracciones antes de reordenar a la forma general.",
            "Apply the point-slope form and multiply by $6$ to clear both fractions before rearranging to general form.",
          ),
          step(
            "calculation",
            "$y - 5 = \\frac{1}{3}\\left(x + \\frac{5}{2}\\right)$<br>Por $6$: $6y - 30 = 2\\left(x + \\frac{5}{2}\\right) = 2x + 5$<br>$6y - 30 - 2x - 5 = 0$, es decir $2x - 6y + 35 = 0$",
            "$y - 5 = \\frac{1}{3}\\left(x + \\frac{5}{2}\\right)$<br>By $6$: $6y - 30 = 2\\left(x + \\frac{5}{2}\\right) = 2x + 5$<br>$6y - 30 - 2x - 5 = 0$, that is $2x - 6y + 35 = 0$",
          ),
          step(
            "result",
            "Una ecuación general de la recta es $2x - 6y + 35 = 0$. Control ✓: el punto dado la satisface, $2 \\cdot \\left(-\\frac{5}{2}\\right) - 6 \\cdot 5 + 35 = -5 - 30 + 35 = 0$ ✓. El distractor $2x - 6y - 35 = 0$ falla la prueba del punto: $-5 - 30 - 35 = -70 \\ne 0$ ✗.",
            "A general equation of the line is $2x - 6y + 35 = 0$. Check ✓: the given point satisfies it, $2 \\cdot \\left(-\\frac{5}{2}\\right) - 6 \\cdot 5 + 35 = -5 - 30 + 35 = 0$ ✓. The distractor $2x - 6y - 35 = 0$ fails the point test: $-5 - 30 - 35 = -70 \\ne 0$ ✗.",
          ),
        ],
      };
    },
  ),

  /* S15.13 — por (-6, 1) y (1, 4) → 3x - 7y + 25 = 0. */
  template(
    {
      id: "lineq-uees-13",
      subject: "math",
      topicId: "analytic-geometry",
      subtopicId: "line-equations",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 210,
      tags: ["line-equations", "general-form", "two-points"],
      prerequisites: ["functions"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "15 · 13",
        page: 17,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$3x - 7y + 25 = 0$", "$3x - 7y + 25 = 0$"), correct: true },
        { id: "b", text: L("$3x - 7y - 25 = 0$", "$3x - 7y - 25 = 0$"), correct: false },
        { id: "c", text: L("$7x - 3y + 25 = 0$", "$7x - 3y + 25 = 0$"), correct: false },
        { id: "d", text: L("$3x + 7y + 25 = 0$", "$3x + 7y + 25 = 0$"), correct: false },
      ];
      return {
        skill: L(
          "Ecuación general a partir de dos puntos",
          "General equation from two points",
        ),
        statement: L(
          "Encuentre una ecuación general ($Ax + By + C = 0$) de la recta que pasa por los puntos $(-6, 1)$ y $(1, 4)$.",
          "Find a general equation ($Ax + By + C = 0$) of the line that passes through the points $(-6, 1)$ and $(1, 4)$.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Con dos puntos, primero calcule la pendiente con $m = \\frac{y_{2} - y_{1}}{x_{2} - x_{1}}$ y después aplique punto-pendiente con cualquiera de ellos.",
            "With two points, first compute the slope with $m = \\frac{y_{2} - y_{1}}{x_{2} - x_{1}}$ and then apply point-slope with either of them.",
          ),
          L(
            "$m = \\frac{4 - 1}{1 - (-6)}$; el denominador también lleva doble signo.",
            "$m = \\frac{4 - 1}{1 - (-6)}$; the denominator also carries a double sign.",
          ),
          L(
            "$m = \\frac{3}{7}$; continúe con $y - 1 = \\frac{3}{7}(x + 6)$ y multiplique por $7$.",
            "$m = \\frac{3}{7}$; continue with $y - 1 = \\frac{3}{7}(x + 6)$ and multiply by $7$.",
          ),
        ],
        answerDisplay: L("$3x - 7y + 25 = 0$", "$3x - 7y + 25 = 0$"),
        solution: [
          step(
            "given",
            "La recta pasa por $(-6, 1)$ y $(1, 4)$; se pide su ecuación general.",
            "The line passes through $(-6, 1)$ and $(1, 4)$; its general equation is requested.",
          ),
          step(
            "approach",
            "Primero la pendiente entre los dos puntos y después la forma punto-pendiente con uno de ellos; al final se reordena a la forma general.",
            "First the slope between the two points, then the point-slope form with one of them; finally rearrange to general form.",
          ),
          step(
            "calculation",
            "$m = \\frac{4 - 1}{1 - (-6)} = \\frac{3}{7}$<br>$y - 1 = \\frac{3}{7}(x + 6)$<br>Por $7$: $7y - 7 = 3(x + 6) = 3x + 18$<br>$7y - 7 - 3x - 18 = 0$, es decir $3x - 7y + 25 = 0$",
            "$m = \\frac{4 - 1}{1 - (-6)} = \\frac{3}{7}$<br>$y - 1 = \\frac{3}{7}(x + 6)$<br>By $7$: $7y - 7 = 3(x + 6) = 3x + 18$<br>$7y - 7 - 3x - 18 = 0$, that is $3x - 7y + 25 = 0$",
          ),
          step(
            "result",
            "Una ecuación general de la recta es $3x - 7y + 25 = 0$. Control ✓ con AMBOS puntos: en $(-6, 1)$, $3 \\cdot (-6) - 7 \\cdot 1 + 25 = -18 - 7 + 25 = 0$ ✓; en $(1, 4)$, $3 - 28 + 25 = 0$ ✓. El distractor $3x - 7y - 25 = 0$ falla en $(1, 4)$: $3 - 28 - 25 = -50 \\ne 0$ ✗.",
            "A general equation of the line is $3x - 7y + 25 = 0$. Check ✓ with BOTH points: at $(-6, 1)$, $3 \\cdot (-6) - 7 \\cdot 1 + 25 = -18 - 7 + 25 = 0$ ✓; at $(1, 4)$, $3 - 28 + 25 = 0$ ✓. The distractor $3x - 7y - 25 = 0$ fails at $(1, 4)$: $3 - 28 - 25 = -50 \\ne 0$ ✗.",
          ),
        ],
      };
    },
  ),

  /* S15.14 — por (5, 2) y (6, -4) → 6x + y - 32 = 0. */
  template(
    {
      id: "lineq-uees-14",
      subject: "math",
      topicId: "analytic-geometry",
      subtopicId: "line-equations",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 180,
      tags: ["line-equations", "general-form", "two-points"],
      prerequisites: ["functions"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "15 · 14",
        page: 17,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$6x + y - 32 = 0$", "$6x + y - 32 = 0$"), correct: true },
        { id: "b", text: L("$6x + y + 32 = 0$", "$6x + y + 32 = 0$"), correct: false },
        { id: "c", text: L("$x + 6y - 32 = 0$", "$x + 6y - 32 = 0$"), correct: false },
        { id: "d", text: L("$6x - y - 32 = 0$", "$6x - y - 32 = 0$"), correct: false },
      ];
      return {
        skill: L(
          "Ecuación general a partir de dos puntos",
          "General equation from two points",
        ),
        statement: L(
          "Encuentre una ecuación general ($Ax + By + C = 0$) de la recta que pasa por los puntos $(5, 2)$ y $(6, -4)$.",
          "Find a general equation ($Ax + By + C = 0$) of the line that passes through the points $(5, 2)$ and $(6, -4)$.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Con dos puntos, primero la pendiente $m = \\frac{y_{2} - y_{1}}{x_{2} - x_{1}}$ y después la forma punto-pendiente.",
            "With two points, first the slope $m = \\frac{y_{2} - y_{1}}{x_{2} - x_{1}}$ and then the point-slope form.",
          ),
          L(
            "$m = \\frac{-4 - 2}{6 - 5}$; aquí el denominador es $1$.",
            "$m = \\frac{-4 - 2}{6 - 5}$; here the denominator is $1$.",
          ),
          L(
            "$m = -6$; continúe con el punto $(5, 2)$: $y - 2 = -6(x - 5)$. Desarrolle y reordene.",
            "$m = -6$; continue with the point $(5, 2)$: $y - 2 = -6(x - 5)$. Expand and rearrange.",
          ),
        ],
        answerDisplay: L("$6x + y - 32 = 0$", "$6x + y - 32 = 0$"),
        solution: [
          step(
            "given",
            "La recta pasa por $(5, 2)$ y $(6, -4)$; se pide su ecuación general.",
            "The line passes through $(5, 2)$ and $(6, -4)$; its general equation is requested.",
          ),
          step(
            "approach",
            "Se calcula la pendiente entre los dos puntos y luego se aplica la forma punto-pendiente con uno de ellos.",
            "Compute the slope between the two points and then apply the point-slope form with one of them.",
          ),
          step(
            "calculation",
            "$m = \\frac{-4 - 2}{6 - 5} = \\frac{-6}{1} = -6$<br>$y - 2 = -6(x - 5) = -6x + 30$<br>$y - 2 + 6x - 30 = 0$, es decir $6x + y - 32 = 0$",
            "$m = \\frac{-4 - 2}{6 - 5} = \\frac{-6}{1} = -6$<br>$y - 2 = -6(x - 5) = -6x + 30$<br>$y - 2 + 6x - 30 = 0$, that is $6x + y - 32 = 0$",
          ),
          step(
            "result",
            "Una ecuación general de la recta es $6x + y - 32 = 0$. Control ✓ con AMBOS puntos: en $(5, 2)$, $6 \\cdot 5 + 2 - 32 = 30 + 2 - 32 = 0$ ✓; en $(6, -4)$, $36 - 4 - 32 = 0$ ✓. El distractor $6x - y - 32 = 0$ falla en $(5, 2)$: $30 - 2 - 32 = -4 \\ne 0$ ✗.",
            "A general equation of the line is $6x + y - 32 = 0$. Check ✓ with BOTH points: at $(5, 2)$, $6 \\cdot 5 + 2 - 32 = 30 + 2 - 32 = 0$ ✓; at $(6, -4)$, $36 - 4 - 32 = 0$ ✓. The distractor $6x - y - 32 = 0$ fails at $(5, 2)$: $30 - 2 - 32 = -4 \\ne 0$ ✗.",
          ),
        ],
      };
    },
  ),

  /* S15.15 — por (-3, -4) y (-2, -8) → 4x + y + 16 = 0. */
  template(
    {
      id: "lineq-uees-15",
      subject: "math",
      topicId: "analytic-geometry",
      subtopicId: "line-equations",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["line-equations", "general-form", "two-points"],
      prerequisites: ["functions"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "15 · 15",
        page: 17,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$4x + y + 16 = 0$", "$4x + y + 16 = 0$"), correct: true },
        { id: "b", text: L("$4x + y - 16 = 0$", "$4x + y - 16 = 0$"), correct: false },
        { id: "c", text: L("$4x - y + 16 = 0$", "$4x - y + 16 = 0$"), correct: false },
        { id: "d", text: L("$x + 4y + 16 = 0$", "$x + 4y + 16 = 0$"), correct: false },
      ];
      return {
        skill: L(
          "Ecuación general a partir de dos puntos",
          "General equation from two points",
        ),
        statement: L(
          "Encuentre una ecuación general ($Ax + By + C = 0$) de la recta que pasa por los puntos $(-3, -4)$ y $(-2, -8)$.",
          "Find a general equation ($Ax + By + C = 0$) of the line that passes through the points $(-3, -4)$ and $(-2, -8)$.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Con dos puntos, primero la pendiente $m = \\frac{y_{2} - y_{1}}{x_{2} - x_{1}}$ y después la forma punto-pendiente.",
            "With two points, first the slope $m = \\frac{y_{2} - y_{1}}{x_{2} - x_{1}}$ and then the point-slope form.",
          ),
          L(
            "$m = \\frac{-8 - (-4)}{-2 - (-3)}$: doble signo arriba y abajo.",
            "$m = \\frac{-8 - (-4)}{-2 - (-3)}$: double sign on top and on the bottom.",
          ),
          L(
            "$m = -4$; continúe con el punto $(-3, -4)$: $y + 4 = -4(x + 3)$. Desarrolle y pase todo a la izquierda.",
            "$m = -4$; continue with the point $(-3, -4)$: $y + 4 = -4(x + 3)$. Expand and move everything to the left.",
          ),
        ],
        answerDisplay: L("$4x + y + 16 = 0$", "$4x + y + 16 = 0$"),
        solution: [
          step(
            "given",
            "La recta pasa por $(-3, -4)$ y $(-2, -8)$; se pide su ecuación general.",
            "The line passes through $(-3, -4)$ and $(-2, -8)$; its general equation is requested.",
          ),
          step(
            "approach",
            "Se calcula la pendiente entre los dos puntos y luego se aplica la forma punto-pendiente con uno de ellos.",
            "Compute the slope between the two points and then apply the point-slope form with one of them.",
          ),
          step(
            "calculation",
            "$m = \\frac{-8 - (-4)}{-2 - (-3)} = \\frac{-4}{1} = -4$<br>$y - (-4) = -4(x - (-3))$, es decir $y + 4 = -4(x + 3)$<br>$y + 4 = -4x - 12$, luego $y = -4x - 16$<br>Reordenando: $4x + y + 16 = 0$",
            "$m = \\frac{-8 - (-4)}{-2 - (-3)} = \\frac{-4}{1} = -4$<br>$y - (-4) = -4(x - (-3))$, that is $y + 4 = -4(x + 3)$<br>$y + 4 = -4x - 12$, hence $y = -4x - 16$<br>Rearranging: $4x + y + 16 = 0$",
          ),
          step(
            "result",
            "Una ecuación general de la recta es $4x + y + 16 = 0$. Control ✓ con AMBOS puntos: en $(-3, -4)$, $4 \\cdot (-3) - 4 + 16 = -12 - 4 + 16 = 0$ ✓; en $(-2, -8)$, $-8 - 8 + 16 = 0$ ✓. El distractor $4x - y + 16 = 0$ falla en $(-3, -4)$: $-12 + 4 + 16 = 8 \\ne 0$ ✗.",
            "A general equation of the line is $4x + y + 16 = 0$. Check ✓ with BOTH points: at $(-3, -4)$, $4 \\cdot (-3) - 4 + 16 = -12 - 4 + 16 = 0$ ✓; at $(-2, -8)$, $-8 - 8 + 16 = 0$ ✓. The distractor $4x - y + 16 = 0$ fails at $(-3, -4)$: $-12 + 4 + 16 = 8 \\ne 0$ ✗.",
          ),
        ],
      };
    },
  ),

  /* S15.16 — por (0, 0) y (-3, -2) → 2x - 3y = 0. */
  template(
    {
      id: "lineq-uees-16",
      subject: "math",
      topicId: "analytic-geometry",
      subtopicId: "line-equations",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["line-equations", "general-form", "two-points", "fractions"],
      prerequisites: ["functions"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "15 · 16",
        page: 17,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$2x - 3y = 0$", "$2x - 3y = 0$"), correct: true },
        { id: "b", text: L("$2x + 3y = 0$", "$2x + 3y = 0$"), correct: false },
        { id: "c", text: L("$3x - 2y = 0$", "$3x - 2y = 0$"), correct: false },
        { id: "d", text: L("$2x - 3y + 6 = 0$", "$2x - 3y + 6 = 0$"), correct: false },
      ];
      return {
        skill: L(
          "Ecuación general a partir de dos puntos",
          "General equation from two points",
        ),
        statement: L(
          "Encuentre una ecuación general ($Ax + By + C = 0$) de la recta que pasa por los puntos $(0, 0)$ y $(-3, -2)$.",
          "Find a general equation ($Ax + By + C = 0$) of the line that passes through the points $(0, 0)$ and $(-3, -2)$.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Uno de los puntos es el origen: la recta es de la forma $y = mx$ (su término independiente es $0$), solo falta la pendiente.",
            "One of the points is the origin: the line has the form $y = mx$ (its constant term is $0$); only the slope is missing.",
          ),
          L(
            "$m = \\frac{-2 - 0}{-3 - 0}$; las dos variaciones son negativas.",
            "$m = \\frac{-2 - 0}{-3 - 0}$; both changes are negative.",
          ),
          L(
            "$m = \\frac{2}{3}$, así que $y = \\frac{2}{3}x$; multiplique por $3$ y pase todo a la izquierda.",
            "$m = \\frac{2}{3}$, so $y = \\frac{2}{3}x$; multiply by $3$ and move everything to the left.",
          ),
        ],
        answerDisplay: L("$2x - 3y = 0$", "$2x - 3y = 0$"),
        solution: [
          step(
            "given",
            "La recta pasa por $(0, 0)$ y $(-3, -2)$; se pide su ecuación general.",
            "The line passes through $(0, 0)$ and $(-3, -2)$; its general equation is requested.",
          ),
          step(
            "approach",
            "Como pasa por el origen, $b = 0$: se calcula la pendiente y se escribe $y = mx$; después se reordena.",
            "Since it passes through the origin, $b = 0$: compute the slope and write $y = mx$; then rearrange.",
          ),
          step(
            "calculation",
            "$m = \\frac{-2 - 0}{-3 - 0} = \\frac{-2}{-3} = \\frac{2}{3}$<br>$y = \\frac{2}{3}x$<br>Por $3$: $3y = 2x$, es decir $2x - 3y = 0$",
            "$m = \\frac{-2 - 0}{-3 - 0} = \\frac{-2}{-3} = \\frac{2}{3}$<br>$y = \\frac{2}{3}x$<br>By $3$: $3y = 2x$, that is $2x - 3y = 0$",
          ),
          step(
            "result",
            "Una ecuación general de la recta es $2x - 3y = 0$. Control ✓ con AMBOS puntos: en $(0, 0)$, $0 - 0 = 0$ ✓; en $(-3, -2)$, $2 \\cdot (-3) - 3 \\cdot (-2) = -6 + 6 = 0$ ✓. El distractor $2x + 3y = 0$ falla en $(-3, -2)$: $-6 - 6 = -12 \\ne 0$ ✗ (describiría la recta de pendiente $-\\frac{2}{3}$ que pasa por el origen).",
            "A general equation of the line is $2x - 3y = 0$. Check ✓ with BOTH points: at $(0, 0)$, $0 - 0 = 0$ ✓; at $(-3, -2)$, $2 \\cdot (-3) - 3 \\cdot (-2) = -6 + 6 = 0$ ✓. The distractor $2x + 3y = 0$ fails at $(-3, -2)$: $-6 - 6 = -12 \\ne 0$ ✗ (it would describe the line of slope $-\\frac{2}{3}$ through the origin).",
          ),
        ],
      };
    },
  ),

  /* S15.17 — m = 2, intersección y = 4 → 2x - y + 4 = 0. */
  template(
    {
      id: "lineq-uees-17",
      subject: "math",
      topicId: "analytic-geometry",
      subtopicId: "line-equations",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 90,
      tags: ["line-equations", "general-form", "slope-intercept"],
      prerequisites: ["functions"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "15 · 17",
        page: 17,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$2x - y + 4 = 0$", "$2x - y + 4 = 0$"), correct: true },
        { id: "b", text: L("$2x - y - 4 = 0$", "$2x - y - 4 = 0$"), correct: false },
        { id: "c", text: L("$2x + y + 4 = 0$", "$2x + y + 4 = 0$"), correct: false },
        { id: "d", text: L("$x - 2y + 4 = 0$", "$x - 2y + 4 = 0$"), correct: false },
      ];
      return {
        skill: L(
          "Ecuación general a partir de la pendiente y la ordenada al origen",
          "General equation from slope and y-intercept",
        ),
        statement: L(
          "Encuentre una ecuación general ($Ax + By + C = 0$) de la recta que tiene pendiente $2$ y corta al eje $y$ en $4$.",
          "Find a general equation ($Ax + By + C = 0$) of the line that has slope $2$ and crosses the $y$-axis at $4$.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Pendiente y ordenada al origen dan directamente la forma pendiente-ordenada $y = mx + b$.",
            "Slope and $y$-intercept directly give the slope-intercept form $y = mx + b$.",
          ),
          L(
            "Aquí $m = 2$ y $b = 4$: la recta corta al eje $y$ en el punto $(0, 4)$.",
            "Here $m = 2$ and $b = 4$: the line crosses the $y$-axis at the point $(0, 4)$.",
          ),
          L(
            "Escriba $y = 2x + 4$ y pase todos los términos al miembro izquierdo: el término $y$ viaja restando.",
            "Write $y = 2x + 4$ and move every term to the left-hand side: the $y$ term travels subtracting.",
          ),
        ],
        answerDisplay: L("$2x - y + 4 = 0$", "$2x - y + 4 = 0$"),
        solution: [
          step(
            "given",
            "La recta tiene pendiente $m = 2$ y su intersección con el eje $y$ es $b = 4$.",
            "The line has slope $m = 2$ and its $y$-intercept is $b = 4$.",
          ),
          step(
            "approach",
            "Se escribe la forma pendiente-ordenada $y = mx + b$ y se reordena a la forma general.",
            "Write the slope-intercept form $y = mx + b$ and rearrange to general form.",
          ),
          step(
            "calculation",
            "$y = 2x + 4$<br>$y - 2x - 4 = 0$, es decir $2x - y + 4 = 0$",
            "$y = 2x + 4$<br>$y - 2x - 4 = 0$, that is $2x - y + 4 = 0$",
          ),
          step(
            "result",
            "Una ecuación general de la recta es $2x - y + 4 = 0$. Control ✓: la intersección con el eje $y$ es el punto $(0, 4)$ y $2 \\cdot 0 - 4 + 4 = 0$ ✓; despejando $y = 2x + 4$, la pendiente es $2$ ✓. El distractor $2x - y - 4 = 0$ falla en $(0, 4)$: $0 - 4 - 4 = -8 \\ne 0$ ✗.",
            "A general equation of the line is $2x - y + 4 = 0$. Check ✓: the $y$-intercept is the point $(0, 4)$ and $2 \\cdot 0 - 4 + 4 = 0$ ✓; solving for $y = 2x + 4$, the slope is $2$ ✓. The distractor $2x - y - 4 = 0$ fails at $(0, 4)$: $0 - 4 - 4 = -8 \\ne 0$ ✗.",
          ),
        ],
      };
    },
  ),

  /* S15.18 — m = 5, intersección y = -7 → 5x - y - 7 = 0. */
  template(
    {
      id: "lineq-uees-18",
      subject: "math",
      topicId: "analytic-geometry",
      subtopicId: "line-equations",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 90,
      tags: ["line-equations", "general-form", "slope-intercept"],
      prerequisites: ["functions"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "15 · 18",
        page: 17,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$5x - y - 7 = 0$", "$5x - y - 7 = 0$"), correct: true },
        { id: "b", text: L("$5x - y + 7 = 0$", "$5x - y + 7 = 0$"), correct: false },
        { id: "c", text: L("$5x + y - 7 = 0$", "$5x + y - 7 = 0$"), correct: false },
        { id: "d", text: L("$x - 5y - 7 = 0$", "$x - 5y - 7 = 0$"), correct: false },
      ];
      return {
        skill: L(
          "Ecuación general a partir de la pendiente y la ordenada al origen",
          "General equation from slope and y-intercept",
        ),
        statement: L(
          "Encuentre una ecuación general ($Ax + By + C = 0$) de la recta que tiene pendiente $5$ y corta al eje $y$ en $-7$.",
          "Find a general equation ($Ax + By + C = 0$) of the line that has slope $5$ and crosses the $y$-axis at $-7$.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Pendiente y ordenada al origen dan directamente la forma pendiente-ordenada $y = mx + b$.",
            "Slope and $y$-intercept directly give the slope-intercept form $y = mx + b$.",
          ),
          L(
            "Aquí $m = 5$ y $b = -7$: la recta corta al eje $y$ en el punto $(0, -7)$.",
            "Here $m = 5$ and $b = -7$: the line crosses the $y$-axis at the point $(0, -7)$.",
          ),
          L(
            "Escriba $y = 5x - 7$ y pase todo al miembro izquierdo; cuide el signo del $7$.",
            "Write $y = 5x - 7$ and move everything to the left-hand side; mind the sign of the $7$.",
          ),
        ],
        answerDisplay: L("$5x - y - 7 = 0$", "$5x - y - 7 = 0$"),
        solution: [
          step(
            "given",
            "La recta tiene pendiente $m = 5$ y su intersección con el eje $y$ es $b = -7$.",
            "The line has slope $m = 5$ and its $y$-intercept is $b = -7$.",
          ),
          step(
            "approach",
            "Se escribe la forma pendiente-ordenada $y = mx + b$ y se reordena a la forma general.",
            "Write the slope-intercept form $y = mx + b$ and rearrange to general form.",
          ),
          step(
            "calculation",
            "$y = 5x - 7$<br>$y - 5x + 7 = 0$, es decir $5x - y - 7 = 0$",
            "$y = 5x - 7$<br>$y - 5x + 7 = 0$, that is $5x - y - 7 = 0$",
          ),
          step(
            "result",
            "Una ecuación general de la recta es $5x - y - 7 = 0$. Control ✓: la intersección con el eje $y$ es el punto $(0, -7)$ y $5 \\cdot 0 + 7 - 7 = 0$ ✓; despejando $y = 5x - 7$, la pendiente es $5$ ✓. El distractor $5x - y + 7 = 0$ falla en $(0, -7)$: $0 + 7 + 7 = 14 \\ne 0$ ✗.",
            "A general equation of the line is $5x - y - 7 = 0$. Check ✓: the $y$-intercept is the point $(0, -7)$ and $5 \\cdot 0 + 7 - 7 = 0$ ✓; solving for $y = 5x - 7$, the slope is $5$ ✓. The distractor $5x - y + 7 = 0$ fails at $(0, -7)$: $0 + 7 + 7 = 14 \\ne 0$ ✗.",
          ),
        ],
      };
    },
  ),

  /* S15.19 — m = -1/2, intersección y = -3 → x + 2y + 6 = 0. */
  template(
    {
      id: "lineq-uees-19",
      subject: "math",
      topicId: "analytic-geometry",
      subtopicId: "line-equations",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["line-equations", "general-form", "slope-intercept", "fractions"],
      prerequisites: ["functions"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "15 · 19",
        page: 17,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$x + 2y + 6 = 0$", "$x + 2y + 6 = 0$"), correct: true },
        { id: "b", text: L("$x + 2y - 6 = 0$", "$x + 2y - 6 = 0$"), correct: false },
        { id: "c", text: L("$x - 2y + 6 = 0$", "$x - 2y + 6 = 0$"), correct: false },
        { id: "d", text: L("$2x + y + 6 = 0$", "$2x + y + 6 = 0$"), correct: false },
      ];
      return {
        skill: L(
          "Ecuación general a partir de la pendiente y la ordenada al origen",
          "General equation from slope and y-intercept",
        ),
        statement: L(
          "Encuentre una ecuación general ($Ax + By + C = 0$) de la recta que tiene pendiente $-\\frac{1}{2}$ y corta al eje $y$ en $-3$.",
          "Find a general equation ($Ax + By + C = 0$) of the line that has slope $-\\frac{1}{2}$ and crosses the $y$-axis at $-3$.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Pendiente y ordenada al origen dan directamente la forma pendiente-ordenada $y = mx + b$.",
            "Slope and $y$-intercept directly give the slope-intercept form $y = mx + b$.",
          ),
          L(
            "Aquí $m = -\\frac{1}{2}$ y $b = -3$: la recta corta al eje $y$ en el punto $(0, -3)$.",
            "Here $m = -\\frac{1}{2}$ and $b = -3$: the line crosses the $y$-axis at the point $(0, -3)$.",
          ),
          L(
            "Escriba $y = -\\frac{1}{2}x - 3$ y multiplique por $2$ antes de reordenar, para eliminar la fracción.",
            "Write $y = -\\frac{1}{2}x - 3$ and multiply by $2$ before rearranging, to clear the fraction.",
          ),
        ],
        answerDisplay: L("$x + 2y + 6 = 0$", "$x + 2y + 6 = 0$"),
        solution: [
          step(
            "given",
            "La recta tiene pendiente $m = -\\frac{1}{2}$ y su intersección con el eje $y$ es $b = -3$.",
            "The line has slope $m = -\\frac{1}{2}$ and its $y$-intercept is $b = -3$.",
          ),
          step(
            "approach",
            "Se escribe la forma pendiente-ordenada, se multiplica por $2$ para eliminar la fracción y se reordena a la forma general.",
            "Write the slope-intercept form, multiply by $2$ to clear the fraction, and rearrange to general form.",
          ),
          step(
            "calculation",
            "$y = -\\frac{1}{2}x - 3$<br>Por $2$: $2y = -x - 6$<br>$2y + x + 6 = 0$, es decir $x + 2y + 6 = 0$",
            "$y = -\\frac{1}{2}x - 3$<br>By $2$: $2y = -x - 6$<br>$2y + x + 6 = 0$, that is $x + 2y + 6 = 0$",
          ),
          step(
            "result",
            "Una ecuación general de la recta es $x + 2y + 6 = 0$. Control ✓: la intersección con el eje $y$ es el punto $(0, -3)$ y $0 + 2 \\cdot (-3) + 6 = 0$ ✓; despejando $y = -\\frac{1}{2}x - 3$, la pendiente es $-\\frac{1}{2}$ ✓. El distractor $x + 2y - 6 = 0$ falla en $(0, -3)$: $-6 - 6 = -12 \\ne 0$ ✗.",
            "A general equation of the line is $x + 2y + 6 = 0$. Check ✓: the $y$-intercept is the point $(0, -3)$ and $0 + 2 \\cdot (-3) + 6 = 0$ ✓; solving for $y = -\\frac{1}{2}x - 3$, the slope is $-\\frac{1}{2}$ ✓. The distractor $x + 2y - 6 = 0$ fails at $(0, -3)$: $-6 - 6 = -12 \\ne 0$ ✗.",
          ),
        ],
      };
    },
  ),

  /* S15.20 — m = 0, intersección y = -1/2 → 2y + 1 = 0 (trampa: horizontal ≠ vertical). */
  template(
    {
      id: "lineq-uees-20",
      subject: "math",
      topicId: "analytic-geometry",
      subtopicId: "line-equations",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["line-equations", "general-form", "slope-intercept", "horizontal-line"],
      prerequisites: ["functions"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "15 · 20",
        page: 17,
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$2y + 1 = 0$", "$2y + 1 = 0$"), correct: true },
        { id: "b", text: L("$2x + 1 = 0$", "$2x + 1 = 0$"), correct: false },
        { id: "c", text: L("$2y - 1 = 0$", "$2y - 1 = 0$"), correct: false },
        { id: "d", text: L("$2y + 2 = 0$", "$2y + 2 = 0$"), correct: false },
      ];
      return {
        skill: L(
          "Ecuación general a partir de la pendiente y la ordenada al origen",
          "General equation from slope and y-intercept",
        ),
        statement: L(
          "Encuentre una ecuación general ($Ax + By + C = 0$) de la recta que tiene pendiente $0$ y corta al eje $y$ en $-\\frac{1}{2}$.",
          "Find a general equation ($Ax + By + C = 0$) of the line that has slope $0$ and crosses the $y$-axis at $-\\frac{1}{2}$.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Con $m = 0$ la forma $y = mx + b$ se reduce a $y = b$: el valor de $y$ no depende de $x$.",
            "With $m = 0$ the form $y = mx + b$ reduces to $y = b$: the value of $y$ does not depend on $x$.",
          ),
          L(
            "Pendiente $0$ significa que $y$ es constante: la recta es horizontal, a la altura del intercepto $-\\frac{1}{2}$.",
            "Slope $0$ means $y$ is constant: the line is horizontal, at the height of the intercept $-\\frac{1}{2}$.",
          ),
          L(
            "Horizontal no es vertical: con $m = 0$ la letra que desaparece de la ecuación es $x$ (una recta vertical tendría pendiente indefinida, no $0$).",
            "Horizontal is not vertical: with $m = 0$ the letter that vanishes from the equation is $x$ (a vertical line would have an undefined slope, not $0$).",
          ),
        ],
        answerDisplay: L("$2y + 1 = 0$", "$2y + 1 = 0$"),
        solution: [
          step(
            "given",
            "La recta tiene pendiente $m = 0$ y su intersección con el eje $y$ es $b = -\\frac{1}{2}$.",
            "The line has slope $m = 0$ and its $y$-intercept is $b = -\\frac{1}{2}$.",
          ),
          step(
            "approach",
            "Se escribe $y = mx + b$ y se observa que, con $m = 0$, la ecuación no contiene $x$: la recta es horizontal.",
            "Write $y = mx + b$ and observe that, with $m = 0$, the equation contains no $x$: the line is horizontal.",
          ),
          step(
            "calculation",
            "$y = 0 \\cdot x + \\left(-\\frac{1}{2}\\right) = -\\frac{1}{2}$<br>$y + \\frac{1}{2} = 0$; multiplicando por $2$: $2y + 1 = 0$",
            "$y = 0 \\cdot x + \\left(-\\frac{1}{2}\\right) = -\\frac{1}{2}$<br>$y + \\frac{1}{2} = 0$; multiplying by $2$: $2y + 1 = 0$",
          ),
          step(
            "result",
            "Una ecuación general de la recta es $2y + 1 = 0$. Control ✓: todo punto de la recta es de la forma $\\left(x, -\\frac{1}{2}\\right)$ y $2 \\cdot \\left(-\\frac{1}{2}\\right) + 1 = -1 + 1 = 0$ ✓ (por ejemplo $(0, -\\frac{1}{2})$ y $(3, -\\frac{1}{2})$). El distractor $2x + 1 = 0$ es la confusión clásica: esa es la recta **vertical** $x = -\\frac{1}{2}$ (pendiente indefinida, no $0$) y falla en $(0, -\\frac{1}{2})$: $2 \\cdot 0 + 1 = 1 \\ne 0$ ✗.",
            "A general equation of the line is $2y + 1 = 0$. Check ✓: every point of the line has the form $\\left(x, -\\frac{1}{2}\\right)$ and $2 \\cdot \\left(-\\frac{1}{2}\\right) + 1 = -1 + 1 = 0$ ✓ (for instance $(0, -\\frac{1}{2})$ and $(3, -\\frac{1}{2})$). The distractor $2x + 1 = 0$ is the classic confusion: that is the **vertical** line $x = -\\frac{1}{2}$ (undefined slope, not $0$) and it fails at $(0, -\\frac{1}{2})$: $2 \\cdot 0 + 1 = 1 \\ne 0$ ✗.",
          ),
        ],
      };
    },
  ),

  /* S16.7 — m = 4, f(2) = 8 → f(x) = 4x. */
  template(
    {
      id: "lf-uees-7",
      subject: "math",
      topicId: "analytic-geometry",
      subtopicId: "line-equations",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["linear-function", "slope-intercept"],
      prerequisites: ["functions"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "16 · 7",
        page: 18,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$f(x) = 4x$", "$f(x) = 4x$"), correct: true },
        { id: "b", text: L("$f(x) = 4x + 8$", "$f(x) = 4x + 8$"), correct: false },
        { id: "c", text: L("$f(x) = 8x$", "$f(x) = 8x$"), correct: false },
        { id: "d", text: L("$f(x) = 4x + 4$", "$f(x) = 4x + 4$"), correct: false },
      ];
      return {
        skill: L(
          "Función lineal a partir de la pendiente y un valor",
          "Linear function from slope and a value",
        ),
        statement: L(
          "Determine $f(x)$ si $f$ es una función lineal que cumple la condición dada: tiene pendiente $4$ y $f(2) = 8$.",
          "Determine $f(x)$ if $f$ is a linear function satisfying the given condition: it has slope $4$ and $f(2) = 8$.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Toda función lineal tiene la forma $f(x) = mx + b$; aquí ya conoce la pendiente $m = 4$.",
            "Every linear function has the form $f(x) = mx + b$; here you already know the slope $m = 4$.",
          ),
          L(
            "La condición $f(2) = 8$ es el valor de la función en $x = 2$: sustitúyala para despejar $b$.",
            "The condition $f(2) = 8$ is the value of the function at $x = 2$: substitute it to solve for $b$.",
          ),
          L(
            "$8 = 4 \\cdot 2 + b$, es decir $8 = 8 + b$; despeje $b$ — no es el $8$ del enunciado.",
            "$8 = 4 \\cdot 2 + b$, that is $8 = 8 + b$; solve for $b$ — it is not the $8$ from the statement.",
          ),
        ],
        answerDisplay: L("$f(x) = 4x$", "$f(x) = 4x$"),
        solution: [
          step(
            "given",
            "Función lineal con pendiente $4$ y condición $f(2) = 8$.",
            "A linear function with slope $4$ and condition $f(2) = 8$.",
          ),
          step(
            "approach",
            "Se escribe $f(x) = 4x + b$ y se usa la condición para despejar la ordenada al origen $b$.",
            "Write $f(x) = 4x + b$ and use the condition to solve for the $y$-intercept $b$.",
          ),
          step(
            "calculation",
            "$f(x) = 4x + b$; sustituyendo $f(2) = 8$:<br>$8 = 4 \\cdot 2 + b = 8 + b \\Rightarrow b = 0$<br>$f(x) = 4x$",
            "$f(x) = 4x + b$; substituting $f(2) = 8$:<br>$8 = 4 \\cdot 2 + b = 8 + b \\Rightarrow b = 0$<br>$f(x) = 4x$",
          ),
          step(
            "result",
            "$f(x) = 4x$. Control ✓: $f(2) = 4 \\cdot 2 = 8$ ✓ y la pendiente es $4$ ✓. El distractor $f(x) = 4x + 8$ usa el valor $8$ como ordenada al origen: daría $f(2) = 16 \\ne 8$ ✗.",
            "$f(x) = 4x$. Check ✓: $f(2) = 4 \\cdot 2 = 8$ ✓ and the slope is $4$ ✓. The distractor $f(x) = 4x + 8$ uses the value $8$ as the $y$-intercept: it would give $f(2) = 16 \\ne 8$ ✗.",
          ),
        ],
      };
    },
  ),

  /* S16.8 — f(0) = 3, f(4) = -5 → f(x) = -2x + 3. */
  template(
    {
      id: "lf-uees-8",
      subject: "math",
      topicId: "analytic-geometry",
      subtopicId: "line-equations",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["linear-function", "function-values"],
      prerequisites: ["functions"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "16 · 8",
        page: 18,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$f(x) = -2x + 3$", "$f(x) = -2x + 3$"), correct: true },
        { id: "b", text: L("$f(x) = -2x - 3$", "$f(x) = -2x - 3$"), correct: false },
        { id: "c", text: L("$f(x) = 2x + 3$", "$f(x) = 2x + 3$"), correct: false },
        { id: "d", text: L("$f(x) = 2x - 3$", "$f(x) = 2x - 3$"), correct: false },
      ];
      return {
        skill: L(
          "Función lineal a partir de dos valores",
          "Linear function from two values",
        ),
        statement: L(
          "Determine $f(x)$ si $f$ es una función lineal que cumple la condición dada: $f(0) = 3$ y $f(4) = -5$.",
          "Determine $f(x)$ if $f$ is a linear function satisfying the given condition: $f(0) = 3$ and $f(4) = -5$.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "$f(x) = mx + b$: los dos datos son valores de $f$ en puntos concretos.",
            "$f(x) = mx + b$: the two data are values of $f$ at specific points.",
          ),
          L(
            "Evaluar en $x = 0$ deja solo $b$: el dato $f(0) = 3$ es la ordenada al origen.",
            "Evaluating at $x = 0$ leaves only $b$: the datum $f(0) = 3$ is the $y$-intercept.",
          ),
          L(
            "Con $b = 3$, el otro dato da la pendiente: $-5 = m \\cdot 4 + 3$.",
            "With $b = 3$, the other datum gives the slope: $-5 = m \\cdot 4 + 3$.",
          ),
        ],
        answerDisplay: L("$f(x) = -2x + 3$", "$f(x) = -2x + 3$"),
        solution: [
          step(
            "given",
            "Función lineal con $f(0) = 3$ y $f(4) = -5$.",
            "A linear function with $f(0) = 3$ and $f(4) = -5$.",
          ),
          step(
            "approach",
            "El valor en $x = 0$ entrega directamente $b$; con él, el segundo dato despeja la pendiente $m$.",
            "The value at $x = 0$ delivers $b$ directly; with it, the second datum solves for the slope $m$.",
          ),
          step(
            "calculation",
            "$f(0) = b = 3$ (al evaluar en $x = 0$ solo sobrevive $b$)<br>$f(4) = 4m + 3 = -5 \\Rightarrow 4m = -8 \\Rightarrow m = -2$<br>$f(x) = -2x + 3$",
            "$f(0) = b = 3$ (evaluating at $x = 0$, only $b$ survives)<br>$f(4) = 4m + 3 = -5 \\Rightarrow 4m = -8 \\Rightarrow m = -2$<br>$f(x) = -2x + 3$",
          ),
          step(
            "result",
            "$f(x) = -2x + 3$. Control ✓ con ambas condiciones: $f(0) = -2 \\cdot 0 + 3 = 3$ ✓; $f(4) = -8 + 3 = -5$ ✓. El distractor $f(x) = -2x - 3$ cambia el signo de $b$: daría $f(0) = -3 \\ne 3$ ✗.",
            "$f(x) = -2x + 3$. Check ✓ with both conditions: $f(0) = -2 \\cdot 0 + 3 = 3$ ✓; $f(4) = -8 + 3 = -5$ ✓. The distractor $f(x) = -2x - 3$ flips the sign of $b$: it would give $f(0) = -3 \\ne 3$ ✗.",
          ),
        ],
      };
    },
  ),

  /* S16.9 — f(1) = 2, f(-2) = 8 → f(x) = -2x + 4. */
  template(
    {
      id: "lf-uees-9",
      subject: "math",
      topicId: "analytic-geometry",
      subtopicId: "line-equations",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 180,
      tags: ["linear-function", "function-values"],
      prerequisites: ["functions"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "16 · 9",
        page: 18,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$f(x) = -2x + 4$", "$f(x) = -2x + 4$"), correct: true },
        { id: "b", text: L("$f(x) = -2x - 4$", "$f(x) = -2x - 4$"), correct: false },
        { id: "c", text: L("$f(x) = 2x + 4$", "$f(x) = 2x + 4$"), correct: false },
        { id: "d", text: L("$f(x) = -2x + 2$", "$f(x) = -2x + 2$"), correct: false },
      ];
      return {
        skill: L(
          "Función lineal a partir de dos valores",
          "Linear function from two values",
        ),
        statement: L(
          "Determine $f(x)$ si $f$ es una función lineal que cumple la condición dada: $f(1) = 2$ y $f(-2) = 8$.",
          "Determine $f(x)$ if $f$ is a linear function satisfying the given condition: $f(1) = 2$ and $f(-2) = 8$.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Los dos datos equivalen a dos puntos de la recta: $(1, 2)$ y $(-2, 8)$.",
            "The two data amount to two points of the line: $(1, 2)$ and $(-2, 8)$.",
          ),
          L(
            "La pendiente se calcula igual que con dos puntos: $m = \\frac{f(x_{2}) - f(x_{1})}{x_{2} - x_{1}}$.",
            "The slope is computed as with two points: $m = \\frac{f(x_{2}) - f(x_{1})}{x_{2} - x_{1}}$.",
          ),
          L(
            "$m = \\frac{8 - 2}{-2 - 1}$; después $b = f(1) - m \\cdot 1$.",
            "$m = \\frac{8 - 2}{-2 - 1}$; then $b = f(1) - m \\cdot 1$.",
          ),
        ],
        answerDisplay: L("$f(x) = -2x + 4$", "$f(x) = -2x + 4$"),
        solution: [
          step(
            "given",
            "Función lineal con $f(1) = 2$ y $f(-2) = 8$.",
            "A linear function with $f(1) = 2$ and $f(-2) = 8$.",
          ),
          step(
            "approach",
            "Los dos valores son dos puntos de la gráfica: primero la pendiente entre ellos y después la ordenada al origen.",
            "The two values are two points of the graph: first the slope between them, then the $y$-intercept.",
          ),
          step(
            "calculation",
            "Puntos $(1, 2)$ y $(-2, 8)$:<br>$m = \\frac{8 - 2}{-2 - 1} = \\frac{6}{-3} = -2$<br>$b = f(1) - m \\cdot 1 = 2 - (-2) = 4$<br>$f(x) = -2x + 4$",
            "Points $(1, 2)$ and $(-2, 8)$:<br>$m = \\frac{8 - 2}{-2 - 1} = \\frac{6}{-3} = -2$<br>$b = f(1) - m \\cdot 1 = 2 - (-2) = 4$<br>$f(x) = -2x + 4$",
          ),
          step(
            "result",
            "$f(x) = -2x + 4$. Control ✓ con ambas condiciones: $f(1) = -2 + 4 = 2$ ✓; $f(-2) = 4 + 4 = 8$ ✓. El distractor $f(x) = -2x + 2$ falla la segunda: $f(-2) = 6 \\ne 8$ ✗.",
            "$f(x) = -2x + 4$. Check ✓ with both conditions: $f(1) = -2 + 4 = 2$ ✓; $f(-2) = 4 + 4 = 8$ ✓. The distractor $f(x) = -2x + 2$ fails the second one: $f(-2) = 6 \\ne 8$ ✗.",
          ),
        ],
      };
    },
  ),

  /* S16.10 — m = -5, f(1/4) = 9 → f(x) = -5x + 41/4 (trampa: b ≠ 9). */
  template(
    {
      id: "lf-uees-10",
      subject: "math",
      topicId: "analytic-geometry",
      subtopicId: "line-equations",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 210,
      tags: ["linear-function", "function-values", "fractions"],
      prerequisites: ["functions"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "16 · 10",
        page: 18,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$f(x) = -5x + \\frac{41}{4}$", "$f(x) = -5x + \\frac{41}{4}$"), correct: true },
        { id: "b", text: L("$f(x) = -5x + 9$", "$f(x) = -5x + 9$"), correct: false },
        { id: "c", text: L("$f(x) = 5x + \\frac{41}{4}$", "$f(x) = 5x + \\frac{41}{4}$"), correct: false },
        { id: "d", text: L("$f(x) = -5x + \\frac{31}{4}$", "$f(x) = -5x + \\frac{31}{4}$"), correct: false },
      ];
      return {
        skill: L(
          "Función lineal a partir de la pendiente y un valor",
          "Linear function from slope and a value",
        ),
        statement: L(
          "Determine $f(x)$ si $f$ es una función lineal que cumple la condición dada: tiene pendiente $-5$ y $f\\left(\\frac{1}{4}\\right) = 9$.",
          "Determine $f(x)$ if $f$ is a linear function satisfying the given condition: it has slope $-5$ and $f\\left(\\frac{1}{4}\\right) = 9$.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "$f(x) = -5x + b$: falta $b$, y la condición es un valor de la función, no el intercepto.",
            "$f(x) = -5x + b$: $b$ is missing, and the condition is a function value, not the intercept.",
          ),
          L(
            "Sustituya la condición: $f\\left(\\frac{1}{4}\\right) = -5 \\cdot \\frac{1}{4} + b = 9$.",
            "Substitute the condition: $f\\left(\\frac{1}{4}\\right) = -5 \\cdot \\frac{1}{4} + b = 9$.",
          ),
          L(
            "Cuidado: $b$ no es el valor $9$ del enunciado; despeje $b = 9 + \\frac{5}{4} = \\ldots$",
            "Careful: $b$ is not the value $9$ from the statement; solve $b = 9 + \\frac{5}{4} = \\ldots$",
          ),
        ],
        answerDisplay: L("$f(x) = -5x + \\frac{41}{4}$", "$f(x) = -5x + \\frac{41}{4}$"),
        solution: [
          step(
            "given",
            "Función lineal con pendiente $-5$ y condición $f\\left(\\frac{1}{4}\\right) = 9$.",
            "A linear function with slope $-5$ and condition $f\\left(\\frac{1}{4}\\right) = 9$.",
          ),
          step(
            "approach",
            "Se escribe $f(x) = -5x + b$ y se sustituye $x = \\frac{1}{4}$ para despejar $b$ (el valor $9$ NO es el intercepto).",
            "Write $f(x) = -5x + b$ and substitute $x = \\frac{1}{4}$ to solve for $b$ (the value $9$ is NOT the intercept).",
          ),
          step(
            "calculation",
            "$9 = -5 \\cdot \\frac{1}{4} + b = -\\frac{5}{4} + b$<br>$b = 9 + \\frac{5}{4} = \\frac{36 + 5}{4} = \\frac{41}{4}$<br>$f(x) = -5x + \\frac{41}{4}$",
            "$9 = -5 \\cdot \\frac{1}{4} + b = -\\frac{5}{4} + b$<br>$b = 9 + \\frac{5}{4} = \\frac{36 + 5}{4} = \\frac{41}{4}$<br>$f(x) = -5x + \\frac{41}{4}$",
          ),
          step(
            "result",
            "$f(x) = -5x + \\frac{41}{4}$. Control ✓: $f\\left(\\frac{1}{4}\\right) = -5 \\cdot \\frac{1}{4} + \\frac{41}{4} = \\frac{-5 + 41}{4} = \\frac{36}{4} = 9$ ✓. La trampa $f(x) = -5x + 9$ usa el valor de la función como ordenada al origen: daría $f\\left(\\frac{1}{4}\\right) = -\\frac{5}{4} + 9 = \\frac{31}{4} \\ne 9$ ✗.",
            "$f(x) = -5x + \\frac{41}{4}$. Check ✓: $f\\left(\\frac{1}{4}\\right) = -5 \\cdot \\frac{1}{4} + \\frac{41}{4} = \\frac{-5 + 41}{4} = \\frac{36}{4} = 9$ ✓. The trap $f(x) = -5x + 9$ uses the function value as the $y$-intercept: it would give $f\\left(\\frac{1}{4}\\right) = -\\frac{5}{4} + 9 = \\frac{31}{4} \\ne 9$ ✗.",
          ),
        ],
      };
    },
  ),

  /* S16.11 — m = -2/3, f(-2/3) = -2/3 → f(x) = -(2/3)x - 10/9 (RETO). */
  template(
    {
      id: "lf-uees-11",
      subject: "math",
      topicId: "analytic-geometry",
      subtopicId: "line-equations",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["linear-function", "function-values", "fractions", "challenge"],
      prerequisites: ["functions"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "16 · 11",
        page: 18,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L("$f(x) = -\\frac{2}{3}x - \\frac{10}{9}$", "$f(x) = -\\frac{2}{3}x - \\frac{10}{9}$"),
          correct: true,
        },
        {
          id: "b",
          text: L("$f(x) = -\\frac{2}{3}x - \\frac{2}{3}$", "$f(x) = -\\frac{2}{3}x - \\frac{2}{3}$"),
          correct: false,
        },
        {
          id: "c",
          text: L("$f(x) = -\\frac{2}{3}x + \\frac{10}{9}$", "$f(x) = -\\frac{2}{3}x + \\frac{10}{9}$"),
          correct: false,
        },
        {
          id: "d",
          text: L("$f(x) = \\frac{2}{3}x - \\frac{10}{9}$", "$f(x) = \\frac{2}{3}x - \\frac{10}{9}$"),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Función lineal con pendiente y valor fraccionarios (reto)",
          "Linear function with fractional slope and value (challenge)",
        ),
        statement: L(
          "Determine $f(x)$ si $f$ es una función lineal que cumple la condición dada: tiene pendiente $-\\frac{2}{3}$ y $f\\left(-\\frac{2}{3}\\right) = -\\frac{2}{3}$.",
          "Determine $f(x)$ if $f$ is a linear function satisfying the given condition: it has slope $-\\frac{2}{3}$ and $f\\left(-\\frac{2}{3}\\right) = -\\frac{2}{3}$.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "La condición $f\\left(-\\frac{2}{3}\\right) = -\\frac{2}{3}$ dice que el punto $\\left(-\\frac{2}{3}, -\\frac{2}{3}\\right)$ pertenece a la gráfica.",
            "The condition $f\\left(-\\frac{2}{3}\\right) = -\\frac{2}{3}$ says that the point $\\left(-\\frac{2}{3}, -\\frac{2}{3}\\right)$ belongs to the graph.",
          ),
          L(
            "Sustituya en $f(x) = -\\frac{2}{3}x + b$ y despeje $b$ con cuidado de los signos (menos por menos).",
            "Substitute into $f(x) = -\\frac{2}{3}x + b$ and solve for $b$ taking care with the signs (minus times minus).",
          ),
          L(
            "$b = f\\left(-\\frac{2}{3}\\right) - m \\cdot \\left(-\\frac{2}{3}\\right) = -\\frac{2}{3} - \\frac{4}{9} = \\ldots$",
            "$b = f\\left(-\\frac{2}{3}\\right) - m \\cdot \\left(-\\frac{2}{3}\\right) = -\\frac{2}{3} - \\frac{4}{9} = \\ldots$",
          ),
        ],
        answerDisplay: L(
          "$f(x) = -\\frac{2}{3}x - \\frac{10}{9}$",
          "$f(x) = -\\frac{2}{3}x - \\frac{10}{9}$",
        ),
        solution: [
          step(
            "given",
            "Función lineal con pendiente $-\\frac{2}{3}$ y condición $f\\left(-\\frac{2}{3}\\right) = -\\frac{2}{3}$.",
            "A linear function with slope $-\\frac{2}{3}$ and condition $f\\left(-\\frac{2}{3}\\right) = -\\frac{2}{3}$.",
          ),
          step(
            "approach",
            "Se sustituye la condición en $f(x) = -\\frac{2}{3}x + b$ y se despeja $b$; la aritmética de fracciones con signos dobles es el reto.",
            "Substitute the condition into $f(x) = -\\frac{2}{3}x + b$ and solve for $b$; the fraction arithmetic with double signs is the challenge.",
          ),
          step(
            "calculation",
            "$-\\frac{2}{3} = -\\frac{2}{3} \\cdot \\left(-\\frac{2}{3}\\right) + b = \\frac{4}{9} + b$<br>$b = -\\frac{2}{3} - \\frac{4}{9} = -\\frac{6}{9} - \\frac{4}{9} = -\\frac{10}{9}$<br>$f(x) = -\\frac{2}{3}x - \\frac{10}{9}$",
            "$-\\frac{2}{3} = -\\frac{2}{3} \\cdot \\left(-\\frac{2}{3}\\right) + b = \\frac{4}{9} + b$<br>$b = -\\frac{2}{3} - \\frac{4}{9} = -\\frac{6}{9} - \\frac{4}{9} = -\\frac{10}{9}$<br>$f(x) = -\\frac{2}{3}x - \\frac{10}{9}$",
          ),
          step(
            "result",
            "$f(x) = -\\frac{2}{3}x - \\frac{10}{9}$. Control ✓: $f\\left(-\\frac{2}{3}\\right) = \\left(-\\frac{2}{3}\\right) \\cdot \\left(-\\frac{2}{3}\\right) - \\frac{10}{9} = \\frac{4}{9} - \\frac{10}{9} = -\\frac{6}{9} = -\\frac{2}{3}$ ✓. La trampa $f(x) = -\\frac{2}{3}x - \\frac{2}{3}$ trata el valor $f\\left(-\\frac{2}{3}\\right) = -\\frac{2}{3}$ como si fuera $b$: daría $\\frac{4}{9} - \\frac{6}{9} = -\\frac{2}{9} \\ne -\\frac{2}{3}$ ✗.",
            "$f(x) = -\\frac{2}{3}x - \\frac{10}{9}$. Check ✓: $f\\left(-\\frac{2}{3}\\right) = \\left(-\\frac{2}{3}\\right) \\cdot \\left(-\\frac{2}{3}\\right) - \\frac{10}{9} = \\frac{4}{9} - \\frac{10}{9} = -\\frac{6}{9} = -\\frac{2}{3}$ ✓. The trap $f(x) = -\\frac{2}{3}x - \\frac{2}{3}$ treats the value $f\\left(-\\frac{2}{3}\\right) = -\\frac{2}{3}$ as if it were $b$: it would give $\\frac{4}{9} - \\frac{6}{9} = -\\frac{2}{9} \\ne -\\frac{2}{3}$ ✗.",
          ),
        ],
      };
    },
  ),

  /* S16.12 — f(1) = 1, f(2) = 2 → f(x) = x. */
  template(
    {
      id: "lf-uees-12",
      subject: "math",
      topicId: "analytic-geometry",
      subtopicId: "line-equations",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 75,
      tags: ["linear-function", "function-values"],
      prerequisites: ["functions"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "16 · 12",
        page: 18,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$f(x) = x$", "$f(x) = x$"), correct: true },
        { id: "b", text: L("$f(x) = x + 1$", "$f(x) = x + 1$"), correct: false },
        { id: "c", text: L("$f(x) = 2x - 1$", "$f(x) = 2x - 1$"), correct: false },
        { id: "d", text: L("$f(x) = x - 1$", "$f(x) = x - 1$"), correct: false },
      ];
      return {
        skill: L(
          "Función lineal a partir de dos valores",
          "Linear function from two values",
        ),
        statement: L(
          "Determine $f(x)$ si $f$ es una función lineal que cumple la condición dada: $f(1) = 1$ y $f(2) = 2$.",
          "Determine $f(x)$ if $f$ is a linear function satisfying the given condition: $f(1) = 1$ and $f(2) = 2$.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Los datos son dos puntos de la recta: $(1, 1)$ y $(2, 2)$.",
            "The data are two points of the line: $(1, 1)$ and $(2, 2)$.",
          ),
          L(
            "Calcule $m = \\frac{2 - 1}{2 - 1}$ y observe lo que da.",
            "Compute $m = \\frac{2 - 1}{2 - 1}$ and observe what it gives.",
          ),
          L(
            "Con esa pendiente, $b = f(1) - m \\cdot 1$; no toda función lineal lleva término independiente.",
            "With that slope, $b = f(1) - m \\cdot 1$; not every linear function carries a constant term.",
          ),
        ],
        answerDisplay: L("$f(x) = x$", "$f(x) = x$"),
        solution: [
          step(
            "given",
            "Función lineal con $f(1) = 1$ y $f(2) = 2$.",
            "A linear function with $f(1) = 1$ and $f(2) = 2$.",
          ),
          step(
            "approach",
            "Los dos valores son los puntos $(1, 1)$ y $(2, 2)$: pendiente primero y ordenada al origen después.",
            "The two values are the points $(1, 1)$ and $(2, 2)$: slope first and $y$-intercept afterwards.",
          ),
          step(
            "calculation",
            "$m = \\frac{2 - 1}{2 - 1} = \\frac{1}{1} = 1$<br>$b = f(1) - m \\cdot 1 = 1 - 1 = 0$<br>$f(x) = x$",
            "$m = \\frac{2 - 1}{2 - 1} = \\frac{1}{1} = 1$<br>$b = f(1) - m \\cdot 1 = 1 - 1 = 0$<br>$f(x) = x$",
          ),
          step(
            "result",
            "$f(x) = x$. Control ✓: $f(1) = 1$ ✓ y $f(2) = 2$ ✓ (es la función identidad, con $m = 1$ y $b = 0$). El distractor $f(x) = 2x - 1$ pasa la primera prueba, $f(1) = 1$ ✓, pero falla la segunda: $f(2) = 3 \\ne 2$ ✗ — una sola condición no basta para fijar una función lineal.",
            "$f(x) = x$. Check ✓: $f(1) = 1$ ✓ and $f(2) = 2$ ✓ (it is the identity function, with $m = 1$ and $b = 0$). The distractor $f(x) = 2x - 1$ passes the first test, $f(1) = 1$ ✓, but fails the second: $f(2) = 3 \\ne 2$ ✗ — a single condition is not enough to pin down a linear function.",
          ),
        ],
      };
    },
  ),

  /* S16.13 — f(-2) = -1, f(-4) = -3 → f(x) = x + 1. */
  template(
    {
      id: "lf-uees-13",
      subject: "math",
      topicId: "analytic-geometry",
      subtopicId: "line-equations",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 180,
      tags: ["linear-function", "function-values"],
      prerequisites: ["functions"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "16 · 13",
        page: 18,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$f(x) = x + 1$", "$f(x) = x + 1$"), correct: true },
        { id: "b", text: L("$f(x) = x - 1$", "$f(x) = x - 1$"), correct: false },
        { id: "c", text: L("$f(x) = -x + 1$", "$f(x) = -x + 1$"), correct: false },
        { id: "d", text: L("$f(x) = 2x + 3$", "$f(x) = 2x + 3$"), correct: false },
      ];
      return {
        skill: L(
          "Función lineal a partir de dos valores",
          "Linear function from two values",
        ),
        statement: L(
          "Determine $f(x)$ si $f$ es una función lineal que cumple la condición dada: $f(-2) = -1$ y $f(-4) = -3$.",
          "Determine $f(x)$ if $f$ is a linear function satisfying the given condition: $f(-2) = -1$ and $f(-4) = -3$.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Los datos son los puntos $(-2, -1)$ y $(-4, -3)$ de la recta.",
            "The data are the points $(-2, -1)$ and $(-4, -3)$ of the line.",
          ),
          L(
            "$m = \\frac{-3 - (-1)}{-4 - (-2)}$: numerador y denominador quedan negativos.",
            "$m = \\frac{-3 - (-1)}{-4 - (-2)}$: numerator and denominator both come out negative.",
          ),
          L(
            "$m = \\frac{-2}{-2}$; después $b = f(-2) - m \\cdot (-2)$.",
            "$m = \\frac{-2}{-2}$; then $b = f(-2) - m \\cdot (-2)$.",
          ),
        ],
        answerDisplay: L("$f(x) = x + 1$", "$f(x) = x + 1$"),
        solution: [
          step(
            "given",
            "Función lineal con $f(-2) = -1$ y $f(-4) = -3$.",
            "A linear function with $f(-2) = -1$ and $f(-4) = -3$.",
          ),
          step(
            "approach",
            "Los dos valores son dos puntos de la gráfica: pendiente entre ellos y después la ordenada al origen.",
            "The two values are two points of the graph: slope between them and then the $y$-intercept.",
          ),
          step(
            "calculation",
            "Puntos $(-2, -1)$ y $(-4, -3)$:<br>$m = \\frac{-3 - (-1)}{-4 - (-2)} = \\frac{-2}{-2} = 1$<br>$b = f(-2) - m \\cdot (-2) = -1 + 2 = 1$<br>$f(x) = x + 1$",
            "Points $(-2, -1)$ and $(-4, -3)$:<br>$m = \\frac{-3 - (-1)}{-4 - (-2)} = \\frac{-2}{-2} = 1$<br>$b = f(-2) - m \\cdot (-2) = -1 + 2 = 1$<br>$f(x) = x + 1$",
          ),
          step(
            "result",
            "$f(x) = x + 1$. Control ✓ con ambas condiciones: $f(-2) = -2 + 1 = -1$ ✓; $f(-4) = -4 + 1 = -3$ ✓. El distractor $f(x) = x - 1$ falla la primera: $f(-2) = -3 \\ne -1$ ✗.",
            "$f(x) = x + 1$. Check ✓ with both conditions: $f(-2) = -2 + 1 = -1$ ✓; $f(-4) = -4 + 1 = -3$ ✓. The distractor $f(x) = x - 1$ fails the first one: $f(-2) = -3 \\ne -1$ ✗.",
          ),
        ],
      };
    },
  ),

  /* S16.14 — m = 0.01, f(0.1) = 0.01 → f(x) = 0.01x + 0.009 (trampa: b ≠ 0.01). */
  template(
    {
      id: "lf-uees-14",
      subject: "math",
      topicId: "analytic-geometry",
      subtopicId: "line-equations",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 210,
      tags: ["linear-function", "function-values", "decimals"],
      prerequisites: ["functions"],
      source: {
        sourceId: "uees-tarea-parcial1",
        license: "INSTRUCTOR_CREATED",
        exerciseNumber: "16 · 14",
        page: 18,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L("$f(x) = 0{,}01x + 0{,}009$", "$f(x) = 0.01x + 0.009$"),
          correct: true,
        },
        {
          id: "b",
          text: L("$f(x) = 0{,}01x + 0{,}01$", "$f(x) = 0.01x + 0.01$"),
          correct: false,
        },
        {
          id: "c",
          text: L("$f(x) = 0{,}01x + 0{,}09$", "$f(x) = 0.01x + 0.09$"),
          correct: false,
        },
        {
          id: "d",
          text: L("$f(x) = 0{,}01x - 0{,}009$", "$f(x) = 0.01x - 0.009$"),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Función lineal con datos decimales",
          "Linear function with decimal data",
        ),
        statement: L(
          "Determine $f(x)$ si $f$ es una función lineal que cumple la condición dada: tiene pendiente $0{,}01$ y $f(0{,}1) = 0{,}01$.",
          "Determine $f(x)$ if $f$ is a linear function satisfying the given condition: it has slope $0.01$ and $f(0.1) = 0.01$.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "$f(x) = 0{,}01x + b$: falta $b$, y la condición es un valor de la función, no el intercepto.",
            "$f(x) = 0.01x + b$: $b$ is missing, and the condition is a function value, not the intercept.",
          ),
          L(
            "Sustituya: $0{,}01 = 0{,}01 \\cdot 0{,}1 + b$; el producto $0{,}01 \\cdot 0{,}1 = 0{,}001$.",
            "Substitute: $0.01 = 0.01 \\cdot 0.1 + b$; the product $0.01 \\cdot 0.1 = 0.001$.",
          ),
          L(
            "Cuidado: $b$ no es el valor $0{,}01$ del enunciado; despeje $b = 0{,}01 - 0{,}001 = \\ldots$ (quedan tres cifras decimales).",
            "Careful: $b$ is not the value $0.01$ from the statement; solve $b = 0.01 - 0.001 = \\ldots$ (three decimal digits remain).",
          ),
        ],
        answerDisplay: L(
          "$f(x) = 0{,}01x + 0{,}009$",
          "$f(x) = 0.01x + 0.009$",
        ),
        solution: [
          step(
            "given",
            "Función lineal con pendiente $0{,}01$ y condición $f(0{,}1) = 0{,}01$.",
            "A linear function with slope $0.01$ and condition $f(0.1) = 0.01$.",
          ),
          step(
            "approach",
            "Se escribe $f(x) = 0{,}01x + b$ y se sustituye $x = 0{,}1$ para despejar $b$; la aritmética decimal pide cuidar las cifras.",
            "Write $f(x) = 0.01x + b$ and substitute $x = 0.1$ to solve for $b$; the decimal arithmetic demands care with the digits.",
          ),
          step(
            "calculation",
            "$0{,}01 = 0{,}01 \\cdot 0{,}1 + b = 0{,}001 + b$<br>$b = 0{,}01 - 0{,}001 = 0{,}009$<br>$f(x) = 0{,}01x + 0{,}009$",
            "$0.01 = 0.01 \\cdot 0.1 + b = 0.001 + b$<br>$b = 0.01 - 0.001 = 0.009$<br>$f(x) = 0.01x + 0.009$",
          ),
          step(
            "result",
            "$f(x) = 0{,}01x + 0{,}009$. Control ✓: $f(0{,}1) = 0{,}01 \\cdot 0{,}1 + 0{,}009 = 0{,}001 + 0{,}009 = 0{,}01$ ✓. La trampa $f(x) = 0{,}01x + 0{,}01$ usa el valor $0{,}01$ como ordenada al origen: daría $f(0{,}1) = 0{,}001 + 0{,}01 = 0{,}011 \\ne 0{,}01$ ✗ (la diferencia está en la tercera cifra decimal).",
            "$f(x) = 0.01x + 0.009$. Check ✓: $f(0.1) = 0.01 \\cdot 0.1 + 0.009 = 0.001 + 0.009 = 0.01$ ✓. The trap $f(x) = 0.01x + 0.01$ uses the value $0.01$ as the $y$-intercept: it would give $f(0.1) = 0.001 + 0.01 = 0.011 \\ne 0.01$ ✗ (the difference lies in the third decimal digit).",
          ),
        ],
      };
    },
  ),
];
