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
];
