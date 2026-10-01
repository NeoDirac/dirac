/**
 * PHYSICS · Measurement & vectors
 *
 * Exemplar file: demonstrates the `vectors` diagram and degree unit answers.
 */

import { template, L, step, tok } from "@/lib/problem";
import type { ProblemTemplate, McOption } from "@/lib/types";

export const templates: ProblemTemplate[] = [
  /* ---------------------------------------------------------------- */
  /* Scalar vs vector                                                 */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "vec-scalar-01",
      subject: "physics",
      topicId: "measurement-vectors",
      subtopicId: "scalar-vector",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 60,
      tags: ["scalars", "vectors"],
      prerequisites: [],
    },
    (rng) => {
      const pairs: { es: string; en: string; isVector: boolean }[] = [
        { es: "temperatura", en: "temperature", isVector: false },
        { es: "masa", en: "mass", isVector: false },
        { es: "tiempo", en: "time", isVector: false },
        { es: "velocidad", en: "velocity", isVector: true },
        { es: "fuerza", en: "force", isVector: true },
        { es: "desplazamiento", en: "displacement", isVector: true },
        { es: "energía", en: "energy", isVector: false },
        { es: "aceleración", en: "acceleration", isVector: true },
      ];
      const pick = rng.pick(pairs);
      const options: McOption[] = [
        { id: "a", text: L("Escalar", "Scalar"), correct: !pick.isVector },
        { id: "b", text: L("Vector", "Vector"), correct: pick.isVector },
      ];
      return {
        skill: L("Magnitudes escalares y vectoriales", "Scalar and vector quantities"),
        statement: L(
          `¿Qué tipo de magnitud es la **${pick.es}**?`,
          `Is **${pick.en}** a scalar or a vector quantity?`,
        ),
        answer: { kind: "multiple-choice", options },
        hints: [
          L(
            "Un vector tiene módulo, dirección y sentido.",
            "A vector has magnitude, direction and sense.",
          ),
          L(
            "Pregúntate: ¿tiene sentido hablar de una dirección de esta magnitud?",
            "Ask yourself: does it make sense to talk about its direction?",
          ),
          L(
            "Si solo se describe con un número, es un escalar.",
            "If a single number fully describes it, it is a scalar.",
          ),
        ],
        answerDisplay: pick.isVector
          ? L("Es un **vector** (tiene dirección y sentido).", "It is a **vector** (it has direction and sense).")
          : L("Es un **escalar** (solo un número la describe).", "It is a **scalar** (a single number describes it)."),
        solution: [
          step(
            "given",
            `Magnitud: ${pick.es}.`,
            `Quantity: ${pick.en}.`,
          ),
          step(
            "approach",
            "Un escalar queda definido con un número y su unidad; un vector además necesita dirección y sentido.",
            "A scalar is fully defined by a number and unit; a vector additionally needs direction and sense.",
          ),
          step(
            "calculation",
            pick.isVector
              ? `La ${pick.es} se define indicando hacia dónde actúa.`
              : `La ${pick.es} queda completa con un valor numérico.`,
            pick.isVector
              ? `A ${pick.en} must state which way it acts.`
              : `A ${pick.en} is complete with a numeric value.`,
          ),
          step(
            "result",
            pick.isVector ? "Es un vector." : "Es un escalar.",
            pick.isVector ? "It is a vector." : "It is a scalar.",
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Scalar multiplication of a vector (expression answer)            */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "vec-scalar-02",
      subject: "physics",
      topicId: "measurement-vectors",
      subtopicId: "scalar-vector",
      difficulty: "easy",
      questionType: "expression",
      estimatedTimeSec: 90,
      tags: ["scalar-multiplication", "vectors", "unit-vectors"],
      prerequisites: ["components"],
    },
    (rng) => {
      // Hand-curated (k, x, y): every component of k·A is a nonzero integer,
      // so the answer never needs decimal input in either locale.
      const sets = [
        { k: 2, x: 3, y: 4 },
        { k: 3, x: 5, y: 2 },
        { k: 2, x: -4, y: 1 },
        { k: 4, x: 2, y: -3 },
        { k: -2, x: 3, y: 5 },
        { k: -3, x: 1, y: 4 },
        { k: 5, x: -2, y: -2 },
      ];
      const p = rng.pick(sets);
      const rx = p.k * p.x;
      const ry = p.k * p.y;
      const signed = (n: number): string => (n >= 0 ? `+ ${n}` : `- ${Math.abs(n)}`);
      const vecA = `${p.x}\\hat{i} ${signed(p.y)}\\hat{j}`;
      return {
        skill: L("Producto de un escalar por un vector", "Scalar multiplication of a vector"),
        statement: L(
          `Dado el vector $\\vec{A} = ${vecA}$, calcula el vector $${p.k}\\vec{A}$. Escribe el resultado en la forma $a\\,i + b\\,j$ (también se acepta $a*i + b*j$).`,
          `Given the vector $\\vec{A} = ${vecA}$, compute the vector $${p.k}\\vec{A}$. Write the result in the form $a\\,i + b\\,j$ ($a*i + b*j$ is also accepted).`,
        ),
        answer: {
          kind: "expression",
          accepted: [`${rx}i ${signed(ry)}j`],
          variables: ["i", "j"],
        },
        hints: [
          L(
            "Multiplicar un vector por un escalar multiplica **cada componente** por ese número.",
            "Multiplying a vector by a scalar multiplies **each component** by that number.",
          ),
          L(
            "Si el escalar es negativo, el vector resultante apunta en sentido contrario: sus componentes cambian de signo.",
            "If the scalar is negative, the resulting vector points the opposite way: its components flip sign.",
          ),
          L(
            "Aplica el escalar a las dos componentes: $k\\,\\vec{A} = (k\\,A_x)\\,\\hat{i} + (k\\,A_y)\\,\\hat{j}$.",
            "Apply the scalar to both components: $k\\,\\vec{A} = (k\\,A_x)\\,\\hat{i} + (k\\,A_y)\\,\\hat{j}$.",
          ),
        ],
        answerDisplay: L(
          `$${p.k}\\vec{A} = ${rx}\\hat{i} ${signed(ry)}\\hat{j}$`,
          `$${p.k}\\vec{A} = ${rx}\\hat{i} ${signed(ry)}\\hat{j}$`,
        ),
        solution: [
          step(
            "given",
            `$\\vec{A} = ${vecA}$, $k = ${p.k}$`,
            `$\\vec{A} = ${vecA}$, $k = ${p.k}$`,
          ),
          step(
            "approach",
            "El producto de un escalar por un vector escala cada componente: $k\\,\\vec{A} = k\\,A_x\\,\\hat{i} + k\\,A_y\\,\\hat{j}$.",
            "The product of a scalar and a vector scales each component: $k\\,\\vec{A} = k\\,A_x\\,\\hat{i} + k\\,A_y\\,\\hat{j}$.",
          ),
          step(
            "calculation",
            `$${p.k}\\vec{A} = ${p.k}\\cdot(${vecA}) = ${rx}\\hat{i} ${signed(ry)}\\hat{j}$`,
            `$${p.k}\\vec{A} = ${p.k}\\cdot(${vecA}) = ${rx}\\hat{i} ${signed(ry)}\\hat{j}$`,
          ),
          step(
            "result",
            `El vector resultante es $${rx}\\hat{i} ${signed(ry)}\\hat{j}$${p.k < 0 ? "; al ser $k$ negativo, apunta en sentido contrario a $\\vec{A}$" : "; apunta en la misma dirección y sentido que $\\vec{A}$"}.`,
            `The resulting vector is $${rx}\\hat{i} ${signed(ry)}\\hat{j}$${p.k < 0 ? "; since $k$ is negative, it points opposite to $\\vec{A}$" : "; it points in the same direction and sense as $\\vec{A}$"}.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Components                                                       */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "vec-comp-01",
      subject: "physics",
      topicId: "measurement-vectors",
      subtopicId: "components",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 120,
      tags: ["components", "trigonometry"],
      prerequisites: [],
    },
    (rng) => {
      const angles = [30, 37, 45, 53, 60];
      const angle = rng.pick(angles);
      const mag = rng.pick([10, 20, 50, 100]);
      const cos: Record<number, number> = { 30: 0.866, 37: 0.8, 45: 0.707, 53: 0.6, 60: 0.5 };
      const value = Math.round(mag * cos[angle] * 100) / 100;
      return {
        skill: L("Componente x de un vector", "x-component of a vector"),
        statement: L(
          `Un vector de módulo $${mag}$ forma un ángulo de $${angle}^\\circ$ con el eje $x$. Calcula su componente $x$. (Usa $\\cos ${angle}^\\circ \\approx {{${cos[angle]}}}$; redondea a 2 cifras significativas.)`,
          `A vector of magnitude $${mag}$ makes an angle of $${angle}^\\circ$ with the $x$-axis. Compute its $x$-component. (Use $\\cos ${angle}^\\circ \\approx {{${cos[angle]}}}$; round to 2 significant figures.)`,
        ),
        diagram: {
          kind: "vectors",
          xMin: -1,
          xMax: 11,
          yMin: -1,
          yMax: Math.max(3, Math.round(mag * 0.9) + 1),
          vectors: [
            { x: mag * cos[angle], y: mag * Math.sin((angle * Math.PI) / 180), label: "A", color: "primary" },
          ],
          showComponents: true,
          showGrid: true,
          xLabel: "x",
          yLabel: "y",
        },
        diagramLabel: L(
          `Vector A de módulo ${mag} elevado ${angle} grados sobre el eje x, con sus componentes dibujadas.`,
          `Vector A of magnitude ${mag} raised ${angle} degrees above the x-axis, with components drawn.`,
        ),
        answer: {
          kind: "numeric",
          value,
          tolerance: { mode: "sigfig", value: 2 },
        },
        hints: [
          L(
            "Las componentes se obtienen con seno y coseno del ángulo.",
            "Components come from the sine and cosine of the angle.",
          ),
          L(
            `La componente $x$ usa el **coseno** porque es el lado contiguo al ángulo.`,
            `The $x$-component uses the **cosine** because it is the side adjacent to the angle.`,
          ),
          L(
            `$A_x = A\\cos\\theta = ${mag} \\cdot {{${cos[angle]}}}$.`,
            `$A_x = A\\cos\\theta = ${mag} \\cdot {{${cos[angle]}}}$.`,
          ),
        ],
        answerDisplay: L(`$A_x \\approx {{${value}}}$`, `$A_x \\approx {{${value}}}$`),
        solution: [
          step(
            "given",
            `$|A| = ${mag}$, $\\theta = ${angle}^\\circ$`,
            `$|A| = ${mag}$, $\\theta = ${angle}^\\circ$`,
          ),
          step(
            "approach",
            "Proyección sobre el eje $x$: $A_x = A\\cos\\theta$.",
            "Projection onto the $x$-axis: $A_x = A\\cos\\theta$.",
          ),
          step(
            "calculation",
            `$A_x = ${mag} \\cdot {{${cos[angle]}}} = {{${Math.round(mag * cos[angle] * 1000) / 1000}}} \\approx {{${value}}}$`,
            `$A_x = ${mag} \\cdot {{${cos[angle]}}} = {{${Math.round(mag * cos[angle] * 1000) / 1000}}} \\approx {{${value}}}$`,
          ),
          step("result", `$A_x \\approx {{${value}}}$.`, `$A_x \\approx {{${value}}}$.`),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Components of a vector at an angle (multiple choice)             */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "vec-comp-02",
      subject: "physics",
      topicId: "measurement-vectors",
      subtopicId: "components",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["components", "trigonometry", "multiple-choice"],
      prerequisites: [],
    },
    (rng) => {
      // Hand-curated (angle, magnitude) pairs with the trig values quoted in
      // the statement: both components are exact or carry at most two
      // decimals, and cos θ ≠ sin θ so the four options stay distinct.
      const sets = [
        { angle: 37, mag: 10, cos: 0.8, sin: 0.6 },
        { angle: 37, mag: 50, cos: 0.8, sin: 0.6 },
        { angle: 53, mag: 20, cos: 0.6, sin: 0.8 },
        { angle: 53, mag: 5, cos: 0.6, sin: 0.8 },
        { angle: 30, mag: 100, cos: 0.866, sin: 0.5 },
        { angle: 30, mag: 10, cos: 0.866, sin: 0.5 },
        { angle: 60, mag: 20, cos: 0.5, sin: 0.866 },
        { angle: 60, mag: 50, cos: 0.5, sin: 0.866 },
      ];
      const p = rng.pick(sets);
      const ax = Math.round(p.mag * p.cos * 100) / 100;
      const ay = Math.round(p.mag * p.sin * 100) / 100;
      const pair = (a: number, b: number): string => `(${tok(a)},\\ ${tok(b)})`;
      const options: McOption[] = [
        { id: "a", text: L(`$${pair(ax, ay)}$`, `$${pair(ax, ay)}$`), correct: true },
        // sine and cosine swapped between the axes
        { id: "b", text: L(`$${pair(ay, ax)}$`, `$${pair(ay, ax)}$`), correct: false },
        // cosine used for both components
        { id: "c", text: L(`$${pair(ax, ax)}$`, `$${pair(ax, ax)}$`), correct: false },
        // sine used for both components
        { id: "d", text: L(`$${pair(ay, ay)}$`, `$${pair(ay, ay)}$`), correct: false },
      ];
      return {
        skill: L("Componentes de un vector con ángulo", "Components of a vector at an angle"),
        statement: L(
          `Un vector de módulo $${p.mag}$ forma un ángulo de $${p.angle}^\\circ$ con el eje $x$. ¿Cuáles son sus componentes $x$ e $y$? (Usa $\\cos ${p.angle}^\\circ \\approx ${tok(p.cos)}$ y $\\sin ${p.angle}^\\circ \\approx ${tok(p.sin)}$.)`,
          `A vector of magnitude $${p.mag}$ makes an angle of $${p.angle}^\\circ$ with the $x$-axis. What are its $x$ and $y$ components? (Use $\\cos ${p.angle}^\\circ \\approx ${tok(p.cos)}$ and $\\sin ${p.angle}^\\circ \\approx ${tok(p.sin)}$.)`,
        ),
        diagram: {
          kind: "vectors",
          xMin: -2,
          xMax: Math.round(ax) + 3,
          yMin: -2,
          yMax: Math.round(ay) + 3,
          vectors: [
            { x: ax, y: ay, label: "A", color: "primary" },
          ],
          showComponents: true,
          showGrid: true,
          xLabel: "x",
          yLabel: "y",
        },
        diagramLabel: L(
          `Vector A de módulo ${p.mag} elevado ${p.angle} grados sobre el eje x, con sus componentes dibujadas.`,
          `Vector A of magnitude ${p.mag} raised ${p.angle} degrees above the x-axis, with its components drawn.`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Cada componente es la proyección del vector sobre un eje.",
            "Each component is the projection of the vector onto an axis.",
          ),
          L(
            "La componente $x$ usa el **coseno** del ángulo y la componente $y$ el **seno**: $A_x = A\\cos\\theta$, $A_y = A\\sin\\theta$.",
            "The $x$-component uses the **cosine** of the angle and the $y$-component the **sine**: $A_x = A\\cos\\theta$, $A_y = A\\sin\\theta$.",
          ),
          L(
            "Multiplica el módulo por cada valor trigonométrico dado en el enunciado.",
            "Multiply the magnitude by each trigonometric value given in the statement.",
          ),
        ],
        answerDisplay: L(
          `$(A_x, A_y) = ${pair(ax, ay)}$`,
          `$(A_x, A_y) = ${pair(ax, ay)}$`,
        ),
        solution: [
          step(
            "given",
            `$|A| = ${p.mag}$, $\\theta = ${p.angle}^\\circ$, $\\cos\\theta \\approx ${tok(p.cos)}$, $\\sin\\theta \\approx ${tok(p.sin)}$`,
            `$|A| = ${p.mag}$, $\\theta = ${p.angle}^\\circ$, $\\cos\\theta \\approx ${tok(p.cos)}$, $\\sin\\theta \\approx ${tok(p.sin)}$`,
          ),
          step(
            "approach",
            "Proyección sobre cada eje: $A_x = A\\cos\\theta$ (lado contiguo al ángulo) y $A_y = A\\sin\\theta$ (lado opuesto).",
            "Projection onto each axis: $A_x = A\\cos\\theta$ (side adjacent to the angle) and $A_y = A\\sin\\theta$ (opposite side).",
          ),
          step(
            "calculation",
            `$A_x = ${p.mag} \\cdot ${tok(p.cos)} = ${tok(ax)}$<br>$A_y = ${p.mag} \\cdot ${tok(p.sin)} = ${tok(ay)}$`,
            `$A_x = ${p.mag} \\cdot ${tok(p.cos)} = ${tok(ax)}$<br>$A_y = ${p.mag} \\cdot ${tok(p.sin)} = ${tok(ay)}$`,
          ),
          step(
            "result",
            `Las componentes son $A_x = ${tok(ax)}$ y $A_y = ${tok(ay)}$.`,
            `The components are $A_x = ${tok(ax)}$ and $A_y = ${tok(ay)}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Angle from components (multiple choice)                          */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "vec-comp-03",
      subject: "physics",
      topicId: "measurement-vectors",
      subtopicId: "components",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 90,
      tags: ["components", "direction", "trigonometry", "multiple-choice"],
      prerequisites: ["components"],
    },
    (rng) => {
      // Hand-curated component pairs from Pythagorean triples; the correct
      // option is the arctangent of the ratio rounded to the nearest degree.
      const sets = [
        { x: 3, y: 4, hyp: 5, ang: 53, tan: 1.33, cosv: 0.6 },
        { x: 4, y: 3, hyp: 5, ang: 37, tan: 0.75, cosv: 0.8 },
        { x: 6, y: 8, hyp: 10, ang: 53, tan: 1.33, cosv: 0.6 },
        { x: 8, y: 6, hyp: 10, ang: 37, tan: 0.75, cosv: 0.8 },
        { x: 5, y: 12, hyp: 13, ang: 67, tan: 2.4, cosv: 0.38 },
        { x: 12, y: 5, hyp: 13, ang: 23, tan: 0.42, cosv: 0.92 },
      ];
      const p = rng.pick(sets);
      const options: McOption[] = [
        { id: "a", text: L(`$${p.ang}^{\\circ}$`, `$${p.ang}^{\\circ}$`), correct: true },
        // ratio flipped: arctan(A_x/A_y)
        { id: "b", text: L(`$${90 - p.ang}^{\\circ}$`, `$${90 - p.ang}^{\\circ}$`), correct: false },
        // supplementary angle
        { id: "c", text: L(`$${180 - p.ang}^{\\circ}$`, `$${180 - p.ang}^{\\circ}$`), correct: false },
        // assumed both components equal
        { id: "d", text: L(`$45^{\\circ}$`, `$45^{\\circ}$`), correct: false },
      ];
      return {
        skill: L("Ángulo de un vector a partir de sus componentes", "Angle of a vector from its components"),
        statement: L(
          `Un vector tiene componentes $A_x = ${p.x}$ y $A_y = ${p.y}$. ¿Qué ángulo forma **aproximadamente** con el eje $x$?`,
          `A vector has components $A_x = ${p.x}$ and $A_y = ${p.y}$. What angle does it make, **approximately**, with the $x$-axis?`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Las componentes y el vector forman un triángulo rectángulo: $A_x$ y $A_y$ son los catetos.",
            "The components and the vector form a right triangle: $A_x$ and $A_y$ are the legs.",
          ),
          L(
            "El ángulo con el eje $x$ cumple $\\tan\\theta = \\frac{A_y}{A_x}$ (opuesto entre contiguo).",
            "The angle with the $x$-axis satisfies $\\tan\\theta = \\frac{A_y}{A_x}$ (opposite over adjacent).",
          ),
          L(
            "Calcula el cociente $A_y / A_x$ y reconoce qué ángulo conocido tiene esa tangente.",
            "Compute the ratio $A_y / A_x$ and recognize which familiar angle has that tangent.",
          ),
        ],
        answerDisplay: L(`$\\theta \\approx ${tok(p.ang)}^{\\circ}$`, `$\\theta \\approx ${tok(p.ang)}^{\\circ}$`),
        solution: [
          step(
            "given",
            `$A_x = ${p.x}$, $A_y = ${p.y}$`,
            `$A_x = ${p.x}$, $A_y = ${p.y}$`,
          ),
          step(
            "approach",
            "El ángulo con el eje $x$ sale de la tangente: $\\tan\\theta = \\frac{A_y}{A_x}$.",
            "The angle with the $x$-axis comes from the tangent: $\\tan\\theta = \\frac{A_y}{A_x}$.",
          ),
          step(
            "calculation",
            `$\\tan\\theta = \\frac{${p.y}}{${p.x}} = ${tok(p.tan)} \\Rightarrow \\theta \\approx ${tok(p.ang)}^{\\circ}$<br>Comprobación con el módulo: $|A| = ${p.hyp}$ y $\\cos\\theta = \\frac{${p.x}}{${p.hyp}} = ${tok(p.cosv)}$`,
            `$\\tan\\theta = \\frac{${p.y}}{${p.x}} = ${tok(p.tan)} \\Rightarrow \\theta \\approx ${tok(p.ang)}^{\\circ}$<br>Cross-check with the magnitude: $|A| = ${p.hyp}$ and $\\cos\\theta = \\frac{${p.x}}{${p.hyp}} = ${tok(p.cosv)}$`,
          ),
          step(
            "result",
            `El vector forma $\\approx ${tok(p.ang)}^{\\circ}$ con el eje $x$ (por encima del eje, en el primer cuadrante).`,
            `The vector makes $\\approx ${tok(p.ang)}^{\\circ}$ with the $x$-axis (above the axis, in the first quadrant).`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Magnitude from components                                        */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "vec-mag-01",
      subject: "physics",
      topicId: "measurement-vectors",
      subtopicId: "magnitude-direction",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 120,
      tags: ["pythagoras", "magnitude"],
      prerequisites: ["components"],
    },
    (rng) => {
      const a = rng.pick([3, 6, 8, 5, 9]);
      const b = rng.pick([4, 8, 12, 15, 5]);
      const value = Math.round(Math.hypot(a, b) * 100) / 100;
      return {
        skill: L("Módulo a partir de componentes", "Magnitude from components"),
        statement: L(
          `Un vector tiene componentes $A_x = ${a}$ y $A_y = ${b}$. ¿Cuál es su módulo?`,
          `A vector has components $A_x = ${a}$ and $A_y = ${b}$. What is its magnitude?`,
        ),
        answer: { kind: "numeric", value, tolerance: { mode: "relative", value: 0.01 } },
        hints: [
          L(
            "Las componentes y el vector forman un triángulo rectángulo.",
            "The components and the vector form a right triangle.",
          ),
          L(
            "El módulo es la hipotenusa.",
            "The magnitude is the hypotenuse.",
          ),
          L(
            "Aplica el teorema de Pitágoras.",
            "Apply the Pythagorean theorem.",
          ),
        ],
        answerDisplay: L(`$|A| = {{${value}}}$`, `$|A| = {{${value}}}$`),
        solution: [
          step("given", `$A_x = ${a}$, $A_y = ${b}$`, `$A_x = ${a}$, $A_y = ${b}$`),
          step(
            "approach",
            "$|A| = \\sqrt{A_x^2 + A_y^2}$ (Pitágoras).",
            "$|A| = \\sqrt{A_x^2 + A_y^2}$ (Pythagoras).",
          ),
          step(
            "calculation",
            `$|A| = \\sqrt{${a}^2 + ${b}^2} = \\sqrt{${a * a} + ${b * b}} = \\sqrt{${a * a + b * b}} = {{${Math.round(Math.sqrt(a * a + b * b) * 1000) / 1000}}}$`,
            `$|A| = \\sqrt{${a}^2 + ${b}^2} = \\sqrt{${a * a} + ${b * b}} = \\sqrt{${a * a + b * b}} = {{${Math.round(Math.sqrt(a * a + b * b) * 1000) / 1000}}}$`,
          ),
          step("result", `$|A| \\approx {{${value}}}$.`, `$|A| \\approx {{${value}}}$.`),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Vector addition (perpendicular)                                  */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "vec-add-01",
      subject: "physics",
      topicId: "measurement-vectors",
      subtopicId: "addition",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 150,
      tags: ["vector-addition"],
      prerequisites: ["magnitude-direction"],
    },
    (rng) => {
      const a = rng.pick([30, 40, 60, 80]);
      const b = rng.pick([40, 60, 80, 100]);
      const value = Math.round(Math.hypot(a, b) * 10) / 10;
      return {
        skill: L("Suma de vectores perpendiculares", "Adding perpendicular vectors"),
        statement: L(
          `Una persona camina $${a}\\ \\text{m}$ hacia el este y luego $${b}\\ \\text{m}$ hacia el norte. ¿Qué módulo tiene el desplazamiento resultante?`,
          `A person walks $${a}\\ \\text{m}$ east and then $${b}\\ \\text{m}$ north. What is the magnitude of the resulting displacement?`,
        ),
        diagram: {
          kind: "vectors",
          xMin: -5,
          xMax: Math.max(a, b) + 10,
          yMin: -5,
          yMax: Math.max(a, b) + 10,
          vectors: [
            { x: a, y: 0, label: "E", color: "primary" },
            { x: 0, y: b, label: "N", color: "secondary", from: { x: a, y: 0 } },
            { x: a, y: b, label: "R", color: "muted" },
          ],
          showComponents: false,
          showGrid: false,
          xLabel: "E (m)",
          yLabel: "N (m)",
        },
        diagramLabel: L(
          `Dos desplazamientos perpendiculares de ${a} m al este y ${b} m al norte; la resultante es la diagonal.`,
          `Two perpendicular displacements of ${a} m east and ${b} m north; the resultant is the diagonal.`,
        ),
        answer: { kind: "numeric", value, tolerance: { mode: "relative", value: 0.01 } },
        hints: [
          L(
            "Los dos desplazamientos son perpendiculares.",
            "The two displacements are perpendicular.",
          ),
          L(
            "La resultante es la diagonal del rectángulo.",
            "The resultant is the diagonal of the rectangle.",
          ),
          L(
            "Usa Pitágoras con $${a}$ y $${b}$.",
            "Use Pythagoras with $${a}$ and $${b}$.",
          ),
        ],
        answerDisplay: L(`$|R| \\approx {{${value}}}\\ \\text{m}$`, `$|R| \\approx {{${value}}}\\ \\text{m}$`),
        solution: [
          step(
            "given",
            `$\\vec{d}_1 = ${a}\\ \\text{m}$ este, $\\vec{d}_2 = ${b}\\ \\text{m}$ norte`,
            `$\\vec{d}_1 = ${a}\\ \\text{m}$ east, $\\vec{d}_2 = ${b}\\ \\text{m}$ north`,
          ),
          step(
            "approach",
            "Vectores perpendiculares: $|R| = \\sqrt{d_1^2 + d_2^2}$.",
            "Perpendicular vectors: $|R| = \\sqrt{d_1^2 + d_2^2}$.",
          ),
          step(
            "calculation",
            `$|R| = \\sqrt{${a}^2 + ${b}^2} = \\sqrt{${a * a} + ${b * b}} = \\sqrt{${a * a + b * b}} \\approx {{${value}}}\\ \\text{m}$`,
            `$|R| = \\sqrt{${a}^2 + ${b}^2} = \\sqrt{${a * a} + ${b * b}} = \\sqrt{${a * a + b * b}} \\approx {{${value}}}\\ \\text{m}$`,
          ),
          step(
            "result",
            `El desplazamiento resultante tiene módulo $\\approx {{${value}}}\\ \\text{m}$.`,
            `The resulting displacement has magnitude $\\approx {{${value}}}\\ \\text{m}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Vector addition via components (chained displacements)           */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "vec-add-02",
      subject: "physics",
      topicId: "measurement-vectors",
      subtopicId: "addition",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 150,
      tags: ["vector-addition", "components", "pythagoras"],
      prerequisites: ["components"],
    },
    (rng) => {
      // Hand-curated sets: the sum S = A + B always forms a Pythagorean
      // triple (3-4-5 / 6-8-10 / 5-12-13 and multiples), so |S| is exact.
      const sets = [
        { a1: 3, a2: 1, b1: 0, b2: 3 }, // S = (3, 4), |S| = 5
        { a1: 2, a2: 4, b1: 4, b2: 4 }, // S = (6, 8), |S| = 10
        { a1: -5, a2: 3, b1: 10, b2: 9 }, // S = (5, 12), |S| = 13
        { a1: -3, a2: 6, b1: 12, b2: 6 }, // S = (9, 12), |S| = 15
        { a1: 4, a2: -3, b1: 5, b2: 3 }, // S = (9, 0), |S| = 9
        { a1: 2, a2: 1, b1: 10, b2: 15 }, // S = (12, 16), |S| = 20
      ];
      const p = rng.pick(sets);
      const s1 = p.a1 + p.b1;
      const s2 = p.a2 + p.b2;
      const mag = Math.round(Math.hypot(s1, s2) * 100) / 100; // exact integer by construction
      const par = (n: number): string => (n < 0 ? `(${n})` : `${n}`);
      return {
        skill: L("Suma de vectores por componentes", "Vector addition by components"),
        statement: L(
          `Un robot de reparto sobre un suelo plano realiza dos desplazamientos consecutivos: primero $\\vec{A} = (${p.a1}, ${p.a2})\\ \\text{m}$ y después $\\vec{B} = (${p.b1}, ${p.b2})\\ \\text{m}$ (componentes según los ejes $x$ e $y$). ¿Qué módulo tiene el desplazamiento resultante $\\vec{A} + \\vec{B}$?`,
          `A delivery robot on a flat floor makes two consecutive displacements: first $\\vec{A} = (${p.a1}, ${p.a2})\\ \\text{m}$ and then $\\vec{B} = (${p.b1}, ${p.b2})\\ \\text{m}$ (components along the $x$ and $y$ axes). What is the magnitude of the resultant displacement $\\vec{A} + \\vec{B}$?`,
        ),
        diagram: {
          kind: "vectors",
          xMin: Math.min(0, p.a1, s1) - 2,
          xMax: Math.max(0, p.a1, s1) + 2,
          yMin: Math.min(0, p.a2, s2) - 2,
          yMax: Math.max(0, p.a2, s2) + 2,
          vectors: [
            { x: p.a1, y: p.a2, label: "A", color: "primary" },
            { x: p.b1, y: p.b2, label: "B", color: "secondary", from: { x: p.a1, y: p.a2 } },
            { x: s1, y: s2, label: "A+B", color: "muted" },
          ],
          showComponents: false,
          showGrid: true,
          xLabel: "x",
          yLabel: "y",
        },
        diagramLabel: L(
          `Desplazamiento A de (${p.a1}, ${p.a2}) m seguido de B de (${p.b1}, ${p.b2}) m encadenado desde el extremo de A; la resultante A+B va del origen al extremo final.`,
          `Displacement A of (${p.a1}, ${p.a2}) m followed by B of (${p.b1}, ${p.b2}) m chained from the tip of A; the resultant A+B runs from the origin to the final tip.`,
        ),
        answer: { kind: "numeric", value: mag, tolerance: { mode: "relative", value: 0.01 } },
        hints: [
          L(
            "Los desplazamientos son consecutivos: la resultante es su suma vectorial, y los vectores se suman componente a componente.",
            "The displacements are consecutive: the resultant is their vector sum, and vectors add component by component.",
          ),
          L(
            "Suma por componentes: $\\vec{S} = \\vec{A} + \\vec{B} = (a_1 + b_1,\\ a_2 + b_2)$; el módulo sale del teorema de Pitágoras.",
            "Add by components: $\\vec{S} = \\vec{A} + \\vec{B} = (a_1 + b_1,\\ a_2 + b_2)$; the magnitude follows from the Pythagorean theorem.",
          ),
          L(
            `Calcula $S_x = ${p.a1} + ${par(p.b1)}$ y $S_y = ${p.a2} + ${par(p.b2)}$, y después aplica $|\\vec{S}| = \\sqrt{S_x^2 + S_y^2}$.`,
            `Compute $S_x = ${p.a1} + ${par(p.b1)}$ and $S_y = ${p.a2} + ${par(p.b2)}$, then apply $|\\vec{S}| = \\sqrt{S_x^2 + S_y^2}$.`,
          ),
        ],
        answerDisplay: L(
          `$|\\vec{A} + \\vec{B}| = ${mag}\\ \\text{m}$`,
          `$|\\vec{A} + \\vec{B}| = ${mag}\\ \\text{m}$`,
        ),
        solution: [
          step(
            "given",
            `$\\vec{A} = (${p.a1}, ${p.a2})\\ \\text{m}$, $\\vec{B} = (${p.b1}, ${p.b2})\\ \\text{m}$ (desplazamientos consecutivos)`,
            `$\\vec{A} = (${p.a1}, ${p.a2})\\ \\text{m}$, $\\vec{B} = (${p.b1}, ${p.b2})\\ \\text{m}$ (consecutive displacements)`,
          ),
          step(
            "approach",
            "Suma componente a componente y aplica Pitágoras: $\\vec{S} = \\vec{A} + \\vec{B}$, $|\\vec{S}| = \\sqrt{S_x^2 + S_y^2}$.",
            "Add component by component and apply Pythagoras: $\\vec{S} = \\vec{A} + \\vec{B}$, $|\\vec{S}| = \\sqrt{S_x^2 + S_y^2}$.",
          ),
          step(
            "calculation",
            `$S_x = ${p.a1} + ${par(p.b1)} = ${s1}\\ \\text{m}$<br>$S_y = ${p.a2} + ${par(p.b2)} = ${s2}\\ \\text{m}$<br>$|\\vec{S}| = \\sqrt{${s1}^2 + ${s2}^2} = \\sqrt{${s1 * s1} + ${s2 * s2}} = \\sqrt{${s1 * s1 + s2 * s2}} = ${mag}\\ \\text{m}$`,
            `$S_x = ${p.a1} + ${par(p.b1)} = ${s1}\\ \\text{m}$<br>$S_y = ${p.a2} + ${par(p.b2)} = ${s2}\\ \\text{m}$<br>$|\\vec{S}| = \\sqrt{${s1}^2 + ${s2}^2} = \\sqrt{${s1 * s1} + ${s2 * s2}} = \\sqrt{${s1 * s1 + s2 * s2}} = ${mag}\\ \\text{m}$`,
          ),
          step(
            "result",
            `El desplazamiento resultante tiene módulo $${mag}\\ \\text{m}$.`,
            `The resultant displacement has magnitude $${mag}\\ \\text{m}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Direction angle                                                  */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "vec-dir-01",
      subject: "physics",
      topicId: "measurement-vectors",
      subtopicId: "magnitude-direction",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 180,
      tags: ["direction", "trigonometry"],
      prerequisites: ["components"],
    },
    (rng) => {
      const triples = [
        { x: 3, y: 4, ang: 53.1 },
        { x: 4, y: 3, ang: 36.9 },
        { x: 6, y: 8, ang: 53.1 },
        { x: 8, y: 6, ang: 36.9 },
        { x: 5, y: 12, ang: 67.4 },
        { x: 12, y: 5, ang: 22.6 },
      ];
      const pick = rng.pick(triples);
      return {
        skill: L("Dirección de un vector", "Direction of a vector"),
        statement: L(
          `Un vector tiene componentes $A_x = ${pick.x}$ y $A_y = ${pick.y}$. ¿Qué ángulo forma con el eje $x$? Da el resultado en grados con una cifra decimal.`,
          `A vector has components $A_x = ${pick.x}$ and $A_y = ${pick.y}$. What angle does it make with the $x$-axis? Give the result in degrees to one decimal place.`,
        ),
        answer: {
          kind: "numeric-unit",
          value: pick.ang,
          tolerance: { mode: "absolute", value: 0.15 },
          units: ["°", "deg"],
          unitChoices: ["°", "deg", "rad"],
        },
        hints: [
          L(
            "Busca el ángulo en el triángulo rectángulo formado por las componentes.",
            "Find the angle in the right triangle formed by the components.",
          ),
          L(
            "La tangente relaciona el cateto opuesto y el contiguo.",
            "The tangent relates the opposite and adjacent legs.",
          ),
          L(
            `$\\tan\\theta = \\frac{${pick.y}}{${pick.x}}$, así que $\\theta = \\arctan(...)$.`,
            `$\\tan\\theta = \\frac{${pick.y}}{${pick.x}}$, so $\\theta = \\arctan(...)$.`,
          ),
        ],
        answerDisplay: L(`$\\theta \\approx {{${pick.ang}}}^{\\circ}$`, `$\\theta \\approx {{${pick.ang}}}^{\\circ}$`),
        solution: [
          step(
            "given",
            `$A_x = ${pick.x}$, $A_y = ${pick.y}$`,
            `$A_x = ${pick.x}$, $A_y = ${pick.y}$`,
          ),
          step(
            "approach",
            "$\\tan\\theta = A_y / A_x$, luego $\\theta = \\arctan(A_y/A_x)$.",
            "$\\tan\\theta = A_y / A_x$, so $\\theta = \\arctan(A_y/A_x)$.",
          ),
          step(
            "calculation",
            `$\\theta = \\arctan\\left(\\frac{${pick.y}}{${pick.x}}\\right) = \\arctan({{${Math.round((pick.y / pick.x) * 1000) / 1000}}}) \\approx {{${pick.ang}}}^{\\circ}$`,
            `$\\theta = \\arctan\\left(\\frac{${pick.y}}{${pick.x}}\\right) = \\arctan({{${Math.round((pick.y / pick.x) * 1000) / 1000}}}) \\approx {{${pick.ang}}}^{\\circ}$`,
          ),
          step(
            "result",
            `El vector forma $\\approx {{${pick.ang}}}^{\\circ}$ con el eje $x$.`,
            `The vector makes $\\approx {{${pick.ang}}}^{\\circ}$ with the $x$-axis.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Magnitude of a difference vector (positions)                     */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "vec-mag-02",
      subject: "physics",
      topicId: "measurement-vectors",
      subtopicId: "magnitude-direction",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 150,
      tags: ["magnitude", "vector-difference", "pythagoras"],
      prerequisites: ["components"],
    },
    (rng) => {
      // Hand-curated position pairs whose difference vector always forms a
      // Pythagorean triple, so |r1 − r2| is an exact integer.
      const sets = [
        { a1: 5, a2: 6, b1: 2, b2: 2 },
        { a1: 9, a2: 10, b1: 3, b2: 2 },
        { a1: 8, a2: 14, b1: 3, b2: 2 },
        { a1: 15, a2: 8, b1: 3, b2: 3 },
        { a1: 4, a2: 1, b1: 1, b2: 5 },
        { a1: 9, a2: 4, b1: 1, b2: 10 },
      ];
      const p = rng.pick(sets);
      const d1 = p.a1 - p.b1;
      const d2 = p.a2 - p.b2;
      const dist = Math.round(Math.hypot(d1, d2) * 100) / 100; // exact integer by construction
      const par = (n: number): string => (n < 0 ? `(${n})` : `${n}`);
      return {
        skill: L("Módulo de una diferencia de vectores", "Magnitude of a vector difference"),
        statement: L(
          `Dos drones despegan del mismo punto. Al cabo de un rato, el dron 1 está en la posición $\\vec{r}_1 = (${p.a1}, ${p.a2})\\ \\text{m}$ y el dron 2 en $\\vec{r}_2 = (${p.b1}, ${p.b2})\\ \\text{m}$ (componentes $x$ e $y$). ¿Qué **distancia** separa los dos drones?`,
          `Two drones take off from the same point. After a while, drone 1 is at position $\\vec{r}_1 = (${p.a1}, ${p.a2})\\ \\text{m}$ and drone 2 at $\\vec{r}_2 = (${p.b1}, ${p.b2})\\ \\text{m}$ ($x$ and $y$ components). What **distance** separates the two drones?`,
        ),
        diagram: {
          kind: "vectors",
          xMin: Math.min(0, p.a1, p.b1) - 2,
          xMax: Math.max(p.a1, p.b1) + 2,
          yMin: Math.min(0, p.a2, p.b2) - 2,
          yMax: Math.max(p.a2, p.b2) + 2,
          vectors: [
            { x: p.a1, y: p.a2, label: "r1", color: "primary" },
            { x: p.b1, y: p.b2, label: "r2", color: "secondary" },
            { x: d1, y: d2, label: "r1-r2", color: "muted", from: { x: p.b1, y: p.b2 } },
          ],
          showComponents: false,
          showGrid: true,
          xLabel: "x",
          yLabel: "y",
        },
        diagramLabel: L(
          `Vectores de posición r1 y r2 trazados desde el origen; el vector diferencia r1−r2 va del extremo de r2 al extremo de r1.`,
          `Position vectors r1 and r2 drawn from the origin; the difference vector r1−r2 runs from the tip of r2 to the tip of r1.`,
        ),
        answer: { kind: "numeric", value: dist, tolerance: { mode: "relative", value: 0.01 } },
        hints: [
          L(
            "La distancia entre dos puntos es el módulo del vector que va de uno al otro.",
            "The distance between two points is the magnitude of the vector running from one to the other.",
          ),
          L(
            "Ese vector es la **diferencia** de posiciones: $\\vec{D} = \\vec{r}_1 - \\vec{r}_2$, componente a componente.",
            "That vector is the **difference** of the positions: $\\vec{D} = \\vec{r}_1 - \\vec{r}_2$, component by component.",
          ),
          L(
            "Resta componente a componente y aplica Pitágoras: $|\\vec{D}| = \\sqrt{D_x^2 + D_y^2}$.",
            "Subtract component by component and apply Pythagoras: $|\\vec{D}| = \\sqrt{D_x^2 + D_y^2}$.",
          ),
        ],
        answerDisplay: L(
          `$|\\vec{r}_1 - \\vec{r}_2| = ${dist}\\ \\text{m}$`,
          `$|\\vec{r}_1 - \\vec{r}_2| = ${dist}\\ \\text{m}$`,
        ),
        solution: [
          step(
            "given",
            `$\\vec{r}_1 = (${p.a1}, ${p.a2})\\ \\text{m}$, $\\vec{r}_2 = (${p.b1}, ${p.b2})\\ \\text{m}$`,
            `$\\vec{r}_1 = (${p.a1}, ${p.a2})\\ \\text{m}$, $\\vec{r}_2 = (${p.b1}, ${p.b2})\\ \\text{m}$`,
          ),
          step(
            "approach",
            "El vector que une las dos posiciones es la diferencia $\\vec{r}_1 - \\vec{r}_2$; su módulo es la distancia buscada (Pitágoras).",
            "The vector joining the two positions is the difference $\\vec{r}_1 - \\vec{r}_2$; its magnitude is the distance sought (Pythagoras).",
          ),
          step(
            "calculation",
            `$D_x = ${p.a1} - ${p.b1} = ${d1}\\ \\text{m}$<br>$D_y = ${p.a2} - ${p.b2} = ${d2}\\ \\text{m}$<br>$|\\vec{D}| = \\sqrt{${d1}^2 + ${par(d2)}^2} = \\sqrt{${d1 * d1} + ${d2 * d2}} = \\sqrt{${d1 * d1 + d2 * d2}} = ${dist}\\ \\text{m}$`,
            `$D_x = ${p.a1} - ${p.b1} = ${d1}\\ \\text{m}$<br>$D_y = ${p.a2} - ${p.b2} = ${d2}\\ \\text{m}$<br>$|\\vec{D}| = \\sqrt{${d1}^2 + ${par(d2)}^2} = \\sqrt{${d1 * d1} + ${d2 * d2}} = \\sqrt{${d1 * d1 + d2 * d2}} = ${dist}\\ \\text{m}$`,
          ),
          step(
            "result",
            `Los drones están separados $${dist}\\ \\text{m}$; el vector $\\vec{r}_1 - \\vec{r}_2$ apunta de la posición del dron 2 hacia la del dron 1.`,
            `The drones are $${dist}\\ \\text{m}$ apart; the vector $\\vec{r}_1 - \\vec{r}_2$ points from drone 2's position toward drone 1's.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Opposite vectors (easy)                                          */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "vec-opp-01",
      subject: "physics",
      topicId: "measurement-vectors",
      subtopicId: "addition",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 60,
      tags: ["vector-addition"],
      prerequisites: [],
    },
    (rng) => {
      const a = rng.int(3, 15);
      const diff = rng.pick([-2, -1, 0, 1, 2]);
      const value = diff;
      return {
        skill: L("Suma de vectores opuestos", "Adding opposite vectors"),
        statement: L(
          `Dos fuerzas actúan sobre un objeto en la misma recta: $${a}\\ \\text{N}$ hacia la derecha y $${a - diff}\\ \\text{N}$ hacia la izquierda. ¿Cuánto vale la fuerza resultante, con signo (positivo = derecha)?`,
          `Two forces act on an object along the same line: $${a}\\ \\text{N}$ to the right and $${a - diff}\\ \\text{N}$ to the left. What is the resultant force, with sign (positive = right)?`,
        ),
        answer: { kind: "numeric", value },
        hints: [
          L(
            "Asigna signos: derecha positivo, izquierda negativo.",
            "Assign signs: right positive, left negative.",
          ),
          L(
            `Las fuerzas son $+${a}$ y $-${a - diff}$.`,
            `The forces are $+${a}$ and $-${a - diff}$.`,
          ),
          L("Suma ambos valores con su signo.", "Add both values with their signs."),
        ],
        answerDisplay: L(
          `$F_R = ${value}\\ \\text{N}$ ${value > 0 ? "(hacia la derecha)" : value < 0 ? "(hacia la izquierda)" : "(equilibrio)"}$`,
          `$F_R = ${value}\\ \\text{N}$ ${value > 0 ? "(to the right)" : value < 0 ? "(to the left)" : "(balanced)"}$`,
        ),
        solution: [
          step(
            "given",
            `$F_1 = +${a}\\ \\text{N}$, $F_2 = -${a - diff}\\ \\text{N}$`,
            `$F_1 = +${a}\\ \\text{N}$, $F_2 = -${a - diff}\\ \\text{N}$`,
          ),
          step(
            "approach",
            "Sobre una misma recta, la suma vectorial es la suma algebraica.",
            "Along the same line, vector addition is algebraic addition.",
          ),
          step(
            "calculation",
            `$F_R = ${a} - ${a - diff} = ${value}\\ \\text{N}$`,
            `$F_R = ${a} - ${a - diff} = ${value}\\ \\text{N}$`,
          ),
          step(
            "result",
            `La resultante es $${value}\\ \\text{N}$.`,
            `The resultant is $${value}\\ \\text{N}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Unit vectors (expression answer)                                 */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "vec-unit-01",
      subject: "physics",
      topicId: "measurement-vectors",
      subtopicId: "unit-vectors",
      difficulty: "hard",
      questionType: "expression",
      estimatedTimeSec: 180,
      tags: ["unit-vectors", "notation"],
      prerequisites: ["components"],
    },
    (rng) => {
      const x = rng.nonZeroInt(-6, 6);
      const y = rng.nonZeroInt(-6, 6);
      return {
        skill: L("Notación de vectores unitarios", "Unit-vector notation"),
        statement: L(
          `Escribe en notación de vectores unitarios el vector con componentes $A_x = ${x}$ y $A_y = ${y}$ (por ejemplo 3i+4j o 3*i+4*j).`,
          `Write in unit-vector notation the vector with components $A_x = ${x}$ and $A_y = ${y}$ (e.g. 3i+4j or 3*i+4*j).`,
        ),
        answer: {
          kind: "expression",
          accepted: [`${x}i + ${y}j`],
          variables: ["i", "j"],
        },
        hints: [
          L(
            "Los vectores unitarios $\\hat{i}$ y $\\hat{j}$ apuntan según $x$ e $y$.",
            "The unit vectors $\\hat{i}$ y $\\hat{j}$ point along $x$ and $y$.",
          ),
          L(
            "Cada componente multiplica a su unitario.",
            "Each component multiplies its unit vector.",
          ),
          L(
            `La forma es $A_x\\,\\hat{i} + A_y\\,\\hat{j}$.`,
            `The form is $A_x\\,\\hat{i} + A_y\\,\\hat{j}$.`,
          ),
        ],
        answerDisplay: L(`$\\vec{A} = ${x}\\hat{i} ${y >= 0 ? "+" : "-"} ${Math.abs(y)}\\hat{j}$`, `$\\vec{A} = ${x}\\hat{i} ${y >= 0 ? "+" : "-"} ${Math.abs(y)}\\hat{j}$`),
        solution: [
          step("given", `$A_x = ${x}$, $A_y = ${y}$`, `$A_x = ${x}$, $A_y = ${y}$`),
          step(
            "approach",
            "$\\vec{A} = A_x\\hat{i} + A_y\\hat{j}$.",
            "$\\vec{A} = A_x\\hat{i} + A_y\\hat{j}$.",
          ),
          step(
            "calculation",
            `$\\vec{A} = ${x}\\hat{i} ${y >= 0 ? "+" : "-"} ${Math.abs(y)}\\hat{j}$`,
            `$\\vec{A} = ${x}\\hat{i} ${y >= 0 ? "+" : "-"} ${Math.abs(y)}\\hat{j}$`,
          ),
          step("result", "Esa es la expresión en unitarios.", "That is the unit-vector expression."),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Unit vector of a given vector (multiple choice)                  */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "vec-unit-02",
      subject: "physics",
      topicId: "measurement-vectors",
      subtopicId: "unit-vectors",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["unit-vectors", "normalization", "multiple-choice"],
      prerequisites: ["components", "magnitude-direction"],
    },
    (rng) => {
      // Hand-curated components from 3-4-5 / 6-8-10 triples: the magnitude is
      // a clean integer and the unit-vector components are exact (±0.6/±0.8).
      const sets = [
        { x: 3, y: 4, mag: 5 },
        { x: 4, y: 3, mag: 5 },
        { x: 6, y: 8, mag: 10 },
        { x: 8, y: 6, mag: 10 },
        { x: -3, y: 4, mag: 5 },
        { x: 6, y: -8, mag: 10 },
      ];
      const p = rng.pick(sets);
      const ux = p.x / p.mag;
      const uy = p.y / p.mag;
      const par = (n: number): string => (n < 0 ? `(${n})` : `${n}`);
      const pair = (a: number, b: number): string => `(${tok(a)},\\ ${tok(b)})`;
      const options: McOption[] = [
        { id: "a", text: L(`$${pair(ux, uy)}$`, `$${pair(ux, uy)}$`), correct: true },
        // components swapped
        { id: "b", text: L(`$${pair(uy, ux)}$`, `$${pair(uy, ux)}$`), correct: false },
        // forgot to divide by the magnitude
        { id: "c", text: L(`$${pair(p.x, p.y)}$`, `$${pair(p.x, p.y)}$`), correct: false },
        // divided by the squared magnitude instead
        {
          id: "d",
          text: L(
            `$${pair(p.x / (p.mag * p.mag), p.y / (p.mag * p.mag))}$`,
            `$${pair(p.x / (p.mag * p.mag), p.y / (p.mag * p.mag))}$`,
          ),
          correct: false,
        },
      ];
      return {
        skill: L("Vector unitario de un vector dado", "Unit vector of a given vector"),
        statement: L(
          `Un vector tiene componentes $A_x = ${p.x}$ y $A_y = ${p.y}$. ¿Cuál es el **vector unitario** $\\hat{u}$ que apunta en la misma dirección y sentido que $\\vec{A}$?`,
          `A vector has components $A_x = ${p.x}$ and $A_y = ${p.y}$. Which **unit vector** $\\hat{u}$ points in the same direction and sense as $\\vec{A}$?`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Un vector unitario tiene módulo $1$ y apunta igual que $\\vec{A}$.",
            "A unit vector has magnitude $1$ and points the same way as $\\vec{A}$.",
          ),
          L(
            "Primero calcula el módulo del vector con Pitágoras: $|A| = \\sqrt{A_x^2 + A_y^2}$.",
            "First compute the magnitude of the vector with Pythagoras: $|A| = \\sqrt{A_x^2 + A_y^2}$.",
          ),
          L(
            "Después divide cada componente entre ese módulo: $\\hat{u} = \\frac{\\vec{A}}{|A|}$.",
            "Then divide each component by that magnitude: $\\hat{u} = \\frac{\\vec{A}}{|A|}$.",
          ),
        ],
        answerDisplay: L(
          `$\\hat{u} = ${pair(ux, uy)}$`,
          `$\\hat{u} = ${pair(ux, uy)}$`,
        ),
        solution: [
          step(
            "given",
            `$A_x = ${p.x}$, $A_y = ${p.y}$`,
            `$A_x = ${p.x}$, $A_y = ${p.y}$`,
          ),
          step(
            "approach",
            "El vector unitario es el vector dividido por su propio módulo: $\\hat{u} = \\frac{\\vec{A}}{|A|}$; primero calculamos $|A|$.",
            "The unit vector is the vector divided by its own magnitude: $\\hat{u} = \\frac{\\vec{A}}{|A|}$; we first compute $|A|$.",
          ),
          step(
            "calculation",
            `$|A| = \\sqrt{${par(p.x)}^2 + ${par(p.y)}^2} = \\sqrt{${p.x * p.x} + ${p.y * p.y}} = \\sqrt{${p.x * p.x + p.y * p.y}} = ${p.mag}$<br>$\\hat{u} = \\frac{(${par(p.x)}, ${par(p.y)})}{${p.mag}} = ${pair(ux, uy)}$`,
            `$|A| = \\sqrt{${par(p.x)}^2 + ${par(p.y)}^2} = \\sqrt{${p.x * p.x} + ${p.y * p.y}} = \\sqrt{${p.x * p.x + p.y * p.y}} = ${p.mag}$<br>$\\hat{u} = \\frac{(${par(p.x)}, ${par(p.y)})}{${p.mag}} = ${pair(ux, uy)}$`,
          ),
          step(
            "result",
            `$\\hat{u} = ${pair(ux, uy)}$, y su módulo es $\\sqrt{ ${tok(0.36)} + ${tok(0.64)}} = 1$, como corresponde a un vector unitario.`,
            `$\\hat{u} = ${pair(ux, uy)}$, and its magnitude is $\\sqrt{ ${tok(0.36)} + ${tok(0.64)}} = 1$, as a unit vector must be.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Challenge: river crossing                                        */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "vec-chal-01",
      subject: "physics",
      topicId: "measurement-vectors",
      subtopicId: "addition",
      difficulty: "challenge",
      questionType: "numeric-unit",
      estimatedTimeSec: 300,
      tags: ["relative-motion", "vector-addition", "word-problems"],
      prerequisites: ["addition", "components"],
    },
    (rng) => {
      const triples = [
        { b: 3, c: 4, r: 5 },
        { b: 6, c: 8, r: 10 },
        { b: 9, c: 12, r: 15 },
        { b: 5, c: 12, r: 13 },
      ];
      const pick = rng.pick(triples);
      return {
        skill: L("Suma de vectores en el cruce de un río", "Vector addition in a river crossing"),
        statement: L(
          `Un bote cruza un río perpendicular a la orilla con $${pick.b}\\ \\text{m/s}$ respecto al agua. La corriente arrastraría el bote río abajo a $${pick.c}\\ \\text{m/s}$. ¿Con qué rapidez se mueve el bote respecto a la orilla?`,
          `A boat crosses a river perpendicular to the bank at $${pick.b}\\ \\text{m/s}$ relative to the water. The current would drag the boat downstream at $${pick.c}\\ \\text{m/s}$. How fast does the boat move relative to the bank?`,
        ),
        diagram: {
          kind: "vectors",
          xMin: -1,
          xMax: Math.max(pick.b, pick.c) + 3,
          yMin: -1,
          yMax: Math.max(pick.b, pick.c) + 3,
          vectors: [
            { x: 0, y: pick.b, label: "v_bote", color: "primary" },
            { x: pick.c, y: 0, label: "v_río", color: "secondary" },
            { x: pick.c, y: pick.b, label: "v_total", color: "muted" },
          ],
          showComponents: true,
          showGrid: true,
          xLabel: "río abajo (m/s)",
          yLabel: "cruce (m/s)",
        },
        diagramLabel: L(
          `Tres vectores: el bote hacia la orilla opuesta con ${pick.b} m/s, la corriente río abajo con ${pick.c} m/s y la resultante en diagonal.`,
          `Three vectors: the boat toward the far bank at ${pick.b} m/s, the current downstream at ${pick.c} m/s, and the diagonal resultant.`,
        ),
        answer: {
          kind: "numeric-unit",
          value: pick.r,
          tolerance: { mode: "relative", value: 0.01 },
          units: ["m/s"],
          unitChoices: ["m/s", "m/s^2", "m", "km/h"],
        },
        hints: [
          L(
            "La rapidez respecto a la orilla es el módulo de la suma de las dos velocidades.",
            "The speed relative to the bank is the magnitude of the sum of both velocities.",
          ),
          L(
            "Las dos velocidades son perpendiculares entre sí.",
            "The two velocities are perpendicular to each other.",
          ),
          L(
            `Aplica Pitágoras con $${pick.b}$ y $${pick.c}$.`,
            `Apply Pythagoras with $${pick.b}$ and $${pick.c}$.`,
          ),
        ],
        answerDisplay: L(`$${tok(pick.r)}\\ \\text{m/s}$`, `$${tok(pick.r)}\\ \\text{m/s}$`),
        solution: [
          step(
            "given",
            `$\\vec{v}_{\\text{bote}} = ${pick.b}\\ \\text{m/s}$ (cruzando), $\\vec{v}_{\\text{río}} = ${pick.c}\\ \\text{m/s}$ (río abajo)`,
            `$\\vec{v}_{\\text{boat}} = ${pick.b}\\ \\text{m/s}$ (crossing), $\\vec{v}_{\\text{river}} = ${pick.c}\\ \\text{m/s}$ (downstream)`,
          ),
          step(
            "approach",
            "Las velocidades son perpendiculares: el módulo de la resultante se obtiene con Pitágoras.",
            "The velocities are perpendicular: get the resultant's magnitude with Pythagoras.",
          ),
          step(
            "calculation",
            `$|\\vec{v}| = \\sqrt{${pick.b}^2 + ${pick.c}^2} = \\sqrt{${pick.b * pick.b} + ${pick.c * pick.c}} = \\sqrt{${pick.b * pick.b + pick.c * pick.c}} = ${tok(pick.r)}\\ \\text{m/s}$`,
            `$|\\vec{v}| = \\sqrt{${pick.b}^2 + ${pick.c}^2} = \\sqrt{${pick.b * pick.b} + ${pick.c * pick.c}} = \\sqrt{${pick.b * pick.b + pick.c * pick.c}} = ${tok(pick.r)}\\ \\text{m/s}$`,
          ),
          step(
            "result",
            `El bote se mueve respecto a la orilla con una rapidez de $${tok(pick.r)}\\ \\text{m/s}$ (deriva río abajo mientras cruza).`,
            `The boat moves relative to the bank at $${tok(pick.r)}\\ \\text{m/s}$ (drifting downstream while crossing).`,
          ),
        ],
      };
    },
  ),
];
