/**
 * MATH · Applications of Trigonometry
 *
 * Law of sines, law of cosines, triangle problems (elevation/depression)
 * and vectors. Includes right-triangle and vectors diagrams; answers use
 * integer-friendly triangles or 3-significant-figure rounding.
 */

import { template, L, step, tok } from "@/lib/problem";
import type { ProblemTemplate, McOption } from "@/lib/types";

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

/** Round to 3 significant figures (value must be pre-rounded for sigfig tolerance) */
const sig3 = (n: number): number => Number(n.toPrecision(3));

/** Round to 3 decimals for display of trig values like sin 60° → 0.866 */
const r3 = (n: number): number => Math.round(n * 1000) / 1000;

const rad = (deg: number): number => (deg * Math.PI) / 180;

export const templates: ProblemTemplate[] = [
  /* ---------------------------------------------------------------- */
  /* Right triangle with special angles (easy, diagram)                */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "triga-rt-01",
      subject: "math",
      topicId: "trig-applications",
      subtopicId: "triangle-problems",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 90,
      tags: ["right-triangle", "special-angles", "ratios"],
      prerequisites: ["trig-foundations"],
    },
    (rng) => {
      const kind = rng.pick(["hyp30", "hyp60", "leg45"] as const);
      const hyp = rng.pick([6, 8, 10, 12, 14]);
      const leg = rng.pick([5, 7, 9, 11]);
      let ang: number;
      let value: number;
      let aLabel: string;
      let bLabel: string;
      let cLabel: string;
      let ratio: string;
      let ratioEs: string;
      let ratioEn: string;
      if (kind === "hyp30") {
        ang = 30;
        value = hyp / 2;
        aLabel = "";
        bLabel = "?";
        cLabel = String(hyp);
        ratio = `\\sin 30^\\circ = \\frac{\\text{cateto opuesto}}{\\text{hipotenusa}}`;
        ratioEs = "opuesto";
        ratioEn = "opposite";
      } else if (kind === "hyp60") {
        ang = 60;
        value = hyp / 2;
        aLabel = "?";
        bLabel = "";
        cLabel = String(hyp);
        ratio = `\\cos 60^\\circ = \\frac{\\text{cateto adyacente}}{\\text{hipotenusa}}`;
        ratioEs = "adyacente";
        ratioEn = "adjacent";
      } else {
        ang = 45;
        value = leg;
        const askOpposite = rng.bool();
        aLabel = askOpposite ? String(leg) : "?";
        bLabel = askOpposite ? "?" : String(leg);
        cLabel = "";
        ratio = `\\tan 45^\\circ = \\frac{\\text{cateto opuesto}}{\\text{cateto adyacente}}`;
        ratioEs = askOpposite ? "opuesto" : "adyacente";
        ratioEn = askOpposite ? "opposite" : "adjacent";
      }
      return {
        skill: L("Razones trigonométricas en triángulos rectángulos", "Trig ratios in right triangles"),
        statement: L(
          `En el triángulo rectángulo de la figura, $\\theta = ${ang}^\\circ$. Calcula la longitud del lado marcado con $?$ (en metros).`,
          `In the right triangle of the figure, $\\theta = ${ang}^\\circ$. Find the length of the side marked with $?$ (in metres).`,
        ),
        diagram: {
          kind: "right-triangle",
          aLabel,
          bLabel,
          cLabel,
          angleLabel: `${ang}°`,
        },
        diagramLabel: L(
          `Triángulo rectángulo con el ángulo θ = ${ang}° marcado; los lados conocidos llevan su valor y el desconocido, una interrogación.`,
          `Right triangle with the angle θ = ${ang}° marked; known sides show their value and the unknown side shows a question mark.`,
        ),
        answer: { kind: "numeric", value, unitSuffix: "m" },
        hints: [
          L(
            `Respecto a $\\theta$, identifica la hipotenusa (frente al ángulo recto), el cateto opuesto (frente a $\\theta$) y el adyacente (junto a $\\theta$, que no es la hipotenusa).`,
            `Relative to $\\theta$, identify the hypotenuse (opposite the right angle), the opposite leg (across from $\\theta$) and the adjacent leg (next to $\\theta$, not the hypotenuse).`,
          ),
          L(
            `Conoces ${kind === "leg45" ? "un cateto" : "la hipotenusa"} y buscas el cateto ${ratioEs}: usa $${ratio}$.`,
            `You know ${kind === "leg45" ? "one leg" : "the hypotenuse"} and want the ${ratioEn} leg: use $${ratio}$.`,
          ),
          L(
            `Usa el valor exacto: $\\sin 30^\\circ = \\cos 60^\\circ = \\frac{1}{2}$, $\\tan 45^\\circ = 1$.`,
            `Use the exact value: $\\sin 30^\\circ = \\cos 60^\\circ = \\frac{1}{2}$, $\\tan 45^\\circ = 1$.`,
          ),
        ],
        answerDisplay: L(`Lado pedido $= ${value}\\ \\text{m}$`, `Requested side $= ${value}\\ \\text{m}$`),
        solution: [
          step(
            "given",
            `Triángulo rectángulo con $\\theta = ${ang}^\\circ$${kind === "leg45" ? ` y un cateto de $${leg}\\ \\text{m}$` : ` e hipotenusa de $${hyp}\\ \\text{m}$`}.`,
            `Right triangle with $\\theta = ${ang}^\\circ$${kind === "leg45" ? ` and one leg of $${leg}\\ \\text{m}$` : ` and hypotenuse of $${hyp}\\ \\text{m}$`}.`,
          ),
          step(
            "approach",
            "Elegimos la razón trigonométrica que conecta el lado conocido con el lado pedido.",
            "Choose the trig ratio that links the known side with the requested side.",
          ),
          step(
            "calculation",
            kind === "hyp30"
              ? `$\\sin 30^\\circ = \\frac{\\text{op}}{${hyp}} = \\frac{1}{2}$<br>$\\text{op} = ${hyp} \\cdot \\frac{1}{2} = ${value}\\ \\text{m}$`
              : kind === "hyp60"
                ? `$\\cos 60^\\circ = \\frac{\\text{ad}}{${hyp}} = \\frac{1}{2}$<br>$\\text{ad} = ${hyp} \\cdot \\frac{1}{2} = ${value}\\ \\text{m}$`
                : `$\\tan 45^\\circ = \\frac{\\text{op}}{\\text{ad}} = 1$<br>Los dos catetos miden lo mismo: $${value}\\ \\text{m}$`,
            kind === "hyp30"
              ? `$\\sin 30^\\circ = \\frac{\\text{opp}}{${hyp}} = \\frac{1}{2}$<br>$\\text{opp} = ${hyp} \\cdot \\frac{1}{2} = ${value}\\ \\text{m}$`
              : kind === "hyp60"
                ? `$\\cos 60^\\circ = \\frac{\\text{adj}}{${hyp}} = \\frac{1}{2}$<br>$\\text{adj} = ${hyp} \\cdot \\frac{1}{2} = ${value}\\ \\text{m}$`
                : `$\\tan 45^\\circ = \\frac{\\text{opp}}{\\text{adj}} = 1$<br>Both legs have the same length: $${value}\\ \\text{m}$`,
          ),
          step(
            "result",
            `El lado pedido mide $${value}\\ \\text{m}$.`,
            `The requested side is $${value}\\ \\text{m}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Magnitude of a vector (easy, diagram)                             */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "triga-vec-01",
      subject: "math",
      topicId: "trig-applications",
      subtopicId: "vectors",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 90,
      tags: ["vectors", "pythagoras"],
      prerequisites: ["trig-foundations"],
    },
    (rng) => {
      const t = rng.pick([
        { x: 3, y: 4, m: 5 },
        { x: 4, y: 3, m: 5 },
        { x: 6, y: 8, m: 10 },
        { x: 5, y: 12, m: 13 },
        { x: 12, y: 5, m: 13 },
        { x: 9, y: 12, m: 15 },
      ]);
      return {
        skill: L("Módulo de un vector", "Magnitude of a vector"),
        statement: L(
          `El vector $\\vec{v}$ de la figura tiene componentes $(${t.x},\\ ${t.y})$. Calcula su **módulo** (magnitud).`,
          `The vector $\\vec{v}$ in the figure has components $(${t.x},\\ ${t.y})$. Compute its **magnitude**.`,
        ),
        diagram: {
          kind: "vectors",
          xMin: -1,
          xMax: t.x + 2,
          yMin: -1,
          yMax: t.y + 2,
          vectors: [{ x: t.x, y: t.y, label: "v" }],
          showComponents: true,
          showGrid: true,
          xLabel: "x",
          yLabel: "y",
        },
        diagramLabel: L(
          `Vector v con componentes (${t.x}, ${t.y}) y sus proyecciones sobre los ejes.`,
          `Vector v with components (${t.x}, ${t.y}) and its projections on the axes.`,
        ),
        answer: { kind: "numeric", value: t.m },
        hints: [
          L(
            "El módulo es la longitud de la flecha: forma un triángulo rectángulo con las componentes.",
            "The magnitude is the length of the arrow: it forms a right triangle with the components.",
          ),
          L(
            "$|\\vec{v}| = \\sqrt{v_x^2 + v_y^2}$.",
            "$|\\vec{v}| = \\sqrt{v_x^2 + v_y^2}$.",
          ),
          L(
            `Calcula $${t.x}^2 + ${t.y}^2$ y extrae la raíz cuadrada.`,
            `Compute $${t.x}^2 + ${t.y}^2$ and take the square root.`,
          ),
        ],
        answerDisplay: L(`$|\\vec{v}| = ${t.m}$`, `$|\\vec{v}| = ${t.m}$`),
        solution: [
          step(
            "given",
            `$\\vec{v} = (${t.x},\\ ${t.y})$`,
            `$\\vec{v} = (${t.x},\\ ${t.y})$`,
          ),
          step(
            "approach",
            "Aplicamos el teorema de Pitágoras con las dos componentes.",
            "Apply the Pythagorean theorem to the two components.",
          ),
          step(
            "calculation",
            `$|\\vec{v}| = \\sqrt{${t.x}^2 + ${t.y}^2} = \\sqrt{${t.x * t.x} + ${t.y * t.y}} = \\sqrt{${t.m * t.m}} = ${t.m}$`,
            `$|\\vec{v}| = \\sqrt{${t.x}^2 + ${t.y}^2} = \\sqrt{${t.x * t.x} + ${t.y * t.y}} = \\sqrt{${t.m * t.m}} = ${t.m}$`,
          ),
          step(
            "result",
            `El módulo del vector es $${t.m}$.`,
            `The magnitude of the vector is $${t.m}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Law of sines: find a side (medium)                                */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "triga-los-01",
      subject: "math",
      topicId: "trig-applications",
      subtopicId: "law-of-sines",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 150,
      tags: ["law-of-sines", "rounding"],
      prerequisites: ["trig-foundations"],
    },
    (rng) => {
      const cfg = rng.pick([
        { A: 30, B: 60, a: 10 },
        { A: 45, B: 30, a: 10 },
        { A: 30, B: 45, a: 8 },
        { A: 90, B: 30, a: 12 },
        { A: 45, B: 90, a: 9 },
        { A: 30, B: 90, a: 5 },
      ]);
      const b = (cfg.a * Math.sin(rad(cfg.B))) / Math.sin(rad(cfg.A));
      const bR = sig3(b);
      return {
        skill: L("Teorema del seno: calcular un lado", "Law of sines: finding a side"),
        statement: L(
          `En un triángulo, $A = ${cfg.A}^\\circ$, $B = ${cfg.B}^\\circ$ y el lado opuesto a $A$ mide $${cfg.a}\\ \\text{cm}$. Calcula el lado opuesto a $B$. Redondea a **3 cifras significativas**.`,
          `In a triangle, $A = ${cfg.A}^\\circ$, $B = ${cfg.B}^\\circ$ and the side opposite $A$ is $${cfg.a}\\ \\text{cm}$ long. Find the side opposite $B$. Round to **3 significant figures**.`,
        ),
        answer: {
          kind: "numeric",
          value: bR,
          tolerance: { mode: "sigfig", value: 3 },
          unitSuffix: "cm",
        },
        hints: [
          L(
            "El teorema del seno empareja cada lado con su ángulo opuesto: $\\frac{a}{\\sin A} = \\frac{b}{\\sin B}$.",
            "The law of sines pairs each side with its opposite angle: $\\frac{a}{\\sin A} = \\frac{b}{\\sin B}$.",
          ),
          L(
            "Despeja el lado pedido: $b = \\frac{a\\,\\sin B}{\\sin A}$.",
            "Solve for the wanted side: $b = \\frac{a\\,\\sin B}{\\sin A}$.",
          ),
          L(
            "Sustituye los valores exactos de los senos de los ángulos notables.",
            "Substitute the exact sine values of the special angles.",
          ),
        ],
        answerDisplay: L(`$b \\approx ${tok(bR)}\\ \\text{cm}$`, `$b \\approx ${tok(bR)}\\ \\text{cm}$`),
        solution: [
          step(
            "given",
            `$A = ${cfg.A}^\\circ$, $B = ${cfg.B}^\\circ$, $a = ${cfg.a}\\ \\text{cm}$; incógnita: $b$.`,
            `$A = ${cfg.A}^\\circ$, $B = ${cfg.B}^\\circ$, $a = ${cfg.a}\\ \\text{cm}$; unknown: $b$.`,
          ),
          step(
            "approach",
            "Usamos el teorema del seno con los dos pares (a, A) y (b, B).",
            "Use the law of sines with the two pairs (a, A) and (b, B).",
          ),
          step(
            "calculation",
            `$b = \\frac{a\\,\\sin B}{\\sin A} = \\frac{${cfg.a} \\cdot \\sin ${cfg.B}^\\circ}{\\sin ${cfg.A}^\\circ} = \\frac{${cfg.a} \\cdot ${tok(r3(Math.sin(rad(cfg.B))))} }{ ${tok(r3(Math.sin(rad(cfg.A))))} } \\approx ${tok(bR)}$`,
            `$b = \\frac{a\\,\\sin B}{\\sin A} = \\frac{${cfg.a} \\cdot \\sin ${cfg.B}^\\circ}{\\sin ${cfg.A}^\\circ} = \\frac{${cfg.a} \\cdot ${tok(r3(Math.sin(rad(cfg.B))))} }{ ${tok(r3(Math.sin(rad(cfg.A))))} } \\approx ${tok(bR)}$`,
          ),
          step(
            "result",
            `El lado opuesto a $B$ mide $\\approx ${tok(bR)}\\ \\text{cm}$ (3 cifras significativas).`,
            `The side opposite $B$ is $\\approx ${tok(bR)}\\ \\text{cm}$ (3 significant figures).`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Law of cosines: find a side (medium)                              */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "triga-loc-01",
      subject: "math",
      topicId: "trig-applications",
      subtopicId: "law-of-cosines",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 180,
      tags: ["law-of-cosines", "exact-values"],
      prerequisites: ["trig-foundations"],
    },
    (rng) => {
      const cfg = rng.pick([
        { a: 5, b: 8, C: 60, c: 7 },
        { a: 8, b: 15, C: 60, c: 13 },
        { a: 3, b: 5, C: 120, c: 7 },
        { a: 7, b: 8, C: 120, c: 13 },
        { a: 3, b: 4, C: 90, c: 5 },
        { a: 6, b: 8, C: 90, c: 10 },
        { a: 5, b: 12, C: 90, c: 13 },
        { a: 9, b: 12, C: 90, c: 15 },
      ]);
      const cosLatex = cfg.C === 60 ? "\\frac{1}{2}" : cfg.C === 90 ? "0" : "-\\frac{1}{2}";
      const extra = cfg.C === 60 ? `- ${cfg.a * cfg.b}` : cfg.C === 120 ? `+ ${cfg.a * cfg.b}` : "";
      return {
        skill: L("Teorema del coseno: calcular un lado", "Law of cosines: finding a side"),
        statement: L(
          `Dos lados de un triángulo miden $${cfg.a}\\ \\text{cm}$ y $${cfg.b}\\ \\text{cm}$ y forman entre sí un ángulo de $${cfg.C}^\\circ$. Calcula el **tercer lado**.`,
          `Two sides of a triangle are $${cfg.a}\\ \\text{cm}$ and $${cfg.b}\\ \\text{cm}$ long and enclose an angle of $${cfg.C}^\\circ$. Find the **third side**.`,
        ),
        answer: { kind: "numeric", value: cfg.c, unitSuffix: "cm" },
        hints: [
          L(
            "Dos lados y el ángulo comprendido: es el caso del teorema del coseno.",
            "Two sides and the included angle: this is the law-of-cosines case.",
          ),
          L(
            "$c^2 = a^2 + b^2 - 2ab\\cos C$.",
            "$c^2 = a^2 + b^2 - 2ab\\cos C$.",
          ),
          L(
            `Usa el valor exacto: $\\cos ${cfg.C}^\\circ = ${cosLatex}$.`,
            `Use the exact value: $\\cos ${cfg.C}^\\circ = ${cosLatex}$.`,
          ),
        ],
        answerDisplay: L(`$c = ${cfg.c}\\ \\text{cm}$`, `$c = ${cfg.c}\\ \\text{cm}$`),
        solution: [
          step(
            "given",
            `$a = ${cfg.a}\\ \\text{cm}$, $b = ${cfg.b}\\ \\text{cm}$, ángulo comprendido $C = ${cfg.C}^\\circ$.`,
            `$a = ${cfg.a}\\ \\text{cm}$, $b = ${cfg.b}\\ \\text{cm}$, included angle $C = ${cfg.C}^\\circ$.`,
          ),
          step(
            "approach",
            "Aplicamos el teorema del coseno y extraemos la raíz cuadrada.",
            "Apply the law of cosines and take the square root.",
          ),
          step(
            "calculation",
            `$c^2 = ${cfg.a}^2 + ${cfg.b}^2 - 2\\cdot${cfg.a}\\cdot${cfg.b}\\cdot\\left(${cosLatex}\\right) = ${cfg.a * cfg.a} + ${cfg.b * cfg.b} ${extra} = ${cfg.c * cfg.c}$<br>$c = \\sqrt{${cfg.c * cfg.c}} = ${cfg.c}$`,
            `$c^2 = ${cfg.a}^2 + ${cfg.b}^2 - 2\\cdot${cfg.a}\\cdot${cfg.b}\\cdot\\left(${cosLatex}\\right) = ${cfg.a * cfg.a} + ${cfg.b * cfg.b} ${extra} = ${cfg.c * cfg.c}$<br>$c = \\sqrt{${cfg.c * cfg.c}} = ${cfg.c}$`,
          ),
          step(
            "result",
            `El tercer lado mide $${cfg.c}\\ \\text{cm}$.`,
            `The third side is $${cfg.c}\\ \\text{cm}$ long.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Law of sines: find an angle (medium)                              */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "triga-los-02",
      subject: "math",
      topicId: "trig-applications",
      subtopicId: "law-of-sines",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 180,
      tags: ["law-of-sines", "angles"],
      prerequisites: ["trig-foundations"],
    },
    (rng) => {
      const cfg = rng.pick([
        {
          A: 30,
          aLatex: "5",
          bLatex: "10",
          B: 90,
          calc: "$\\sin B = \\frac{10\\cdot\\sin 30^\\circ}{5} = \\frac{10\\cdot\\frac{1}{2}}{5} = 1$",
          noteEs: "Como $\\sin B = 1$, el ángulo es único: $B = 90^\\circ$.",
          noteEn: "Since $\\sin B = 1$, the angle is unique: $B = 90^\\circ$.",
        },
        {
          A: 45,
          aLatex: "4\\sqrt{2}",
          bLatex: "8",
          B: 90,
          calc: "$\\sin B = \\frac{8\\cdot\\sin 45^\\circ}{4\\sqrt{2}} = \\frac{8\\cdot\\frac{\\sqrt{2}}{2}}{4\\sqrt{2}} = 1$",
          noteEs: "Como $\\sin B = 1$, el ángulo es único: $B = 90^\\circ$.",
          noteEn: "Since $\\sin B = 1$, the angle is unique: $B = 90^\\circ$.",
        },
        {
          A: 45,
          aLatex: "6",
          bLatex: "3\\sqrt{2}",
          B: 30,
          calc: "$\\sin B = \\frac{3\\sqrt{2}\\cdot\\sin 45^\\circ}{6} = \\frac{3\\sqrt{2}\\cdot\\frac{\\sqrt{2}}{2}}{6} = \\frac{3}{6} = \\frac{1}{2}$",
          noteEs:
            "$\\sin B = \\frac{1}{2}$ daría $B = 30^\\circ$ o $B = 150^\\circ$; el segundo es imposible porque $A + B = 195^\\circ > 180^\\circ$.",
          noteEn:
            "$\\sin B = \\frac{1}{2}$ would give $B = 30^\\circ$ or $B = 150^\\circ$; the latter is impossible because $A + B = 195^\\circ > 180^\\circ$.",
        },
        {
          A: 60,
          aLatex: "6",
          bLatex: "6",
          B: 60,
          calc: "$\\sin B = \\frac{6\\cdot\\sin 60^\\circ}{6} = \\frac{\\sqrt{3}}{2}$",
          noteEs:
            "$B = 120^\\circ$ también tiene ese seno, pero dejaría $C = 0^\\circ$: el triángulo es equilátero, $B = 60^\\circ$.",
          noteEn:
            "$B = 120^\\circ$ has the same sine, but it would leave $C = 0^\\circ$: the triangle is equilateral, so $B = 60^\\circ$.",
        },
      ]);
      return {
        skill: L("Teorema del seno: calcular un ángulo", "Law of sines: finding an angle"),
        statement: L(
          `En un triángulo, $A = ${cfg.A}^\\circ$, el lado opuesto a $A$ mide $${cfg.aLatex}\\ \\text{cm}$ y el lado opuesto a $B$ mide $${cfg.bLatex}\\ \\text{cm}$. Calcula el ángulo $B$ (en grados).`,
          `In a triangle, $A = ${cfg.A}^\\circ$, the side opposite $A$ is $${cfg.aLatex}\\ \\text{cm}$ long and the side opposite $B$ is $${cfg.bLatex}\\ \\text{cm}$ long. Find angle $B$ (in degrees).`,
        ),
        answer: {
          kind: "numeric",
          value: cfg.B,
          tolerance: { mode: "absolute", value: 0.001 },
          unitSuffix: "°",
        },
        hints: [
          L(
            "Empareja cada lado con su ángulo opuesto en el teorema del seno.",
            "Pair each side with its opposite angle in the law of sines.",
          ),
          L(
            "Despeja: $\\sin B = \\frac{b\\,\\sin A}{a}$.",
            "Solve: $\\sin B = \\frac{b\\,\\sin A}{a}$.",
          ),
          L(
            "Calcula el valor y reconoce el ángulo notable; comprueba que la otra opción del seno no forma triángulo.",
            "Compute the value and recognize the special angle; check that the other sine option does not form a triangle.",
          ),
        ],
        answerDisplay: L(`$B = ${cfg.B}^\\circ$`, `$B = ${cfg.B}^\\circ$`),
        solution: [
          step(
            "given",
            `$A = ${cfg.A}^\\circ$, $a = ${cfg.aLatex}\\ \\text{cm}$, $b = ${cfg.bLatex}\\ \\text{cm}$.`,
            `$A = ${cfg.A}^\\circ$, $a = ${cfg.aLatex}\\ \\text{cm}$, $b = ${cfg.bLatex}\\ \\text{cm}$.`,
          ),
          step(
            "approach",
            "Aplicamos el teorema del seno despejando $\\sin B$.",
            "Apply the law of sines, solving for $\\sin B$.",
          ),
          step(
            "calculation",
            `${cfg.calc}<br>${cfg.noteEs}`,
            `${cfg.calc}<br>${cfg.noteEn}`,
          ),
          step(
            "result",
            `$B = ${cfg.B}^\\circ$.`,
            `$B = ${cfg.B}^\\circ$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Angle of elevation (medium, word problem)                         */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "triga-tri-01",
      subject: "math",
      topicId: "trig-applications",
      subtopicId: "triangle-problems",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 180,
      tags: ["elevation", "word-problems", "tangent", "rounding"],
      prerequisites: ["trig-foundations"],
    },
    (rng) => {
      const scenario = rng.pick(["hFromD30", "hFromD60", "dFromH30"] as const);
      const d = rng.pick([10, 12, 15, 20]);
      const h = rng.pick([10, 15, 20]);
      let ang: number;
      let value: number;
      let givenEs: string;
      let givenEn: string;
      let askEs: string;
      let askEn: string;
      let work: string;
      if (scenario === "hFromD30") {
        ang = 30;
        value = sig3(d / Math.sqrt(3));
        givenEs = `La distancia horizontal desde el punto hasta la base del árbol es de $${d}\\ \\text{m}$. Calcula la altura del árbol.`;
        givenEn = `The horizontal distance from the point to the base of the tree is $${d}\\ \\text{m}$. Find the height of the tree.`;
        askEs = "la altura";
        askEn = "the height";
        work = `$h = ${d}\\tan 30^\\circ = \\frac{${d}}{\\sqrt{3}} \\approx ${tok(value)}$`;
      } else if (scenario === "hFromD60") {
        ang = 60;
        value = sig3(d * Math.sqrt(3));
        givenEs = `La distancia horizontal desde el punto hasta la base del árbol es de $${d}\\ \\text{m}$. Calcula la altura del árbol.`;
        givenEn = `The horizontal distance from the point to the base of the tree is $${d}\\ \\text{m}$. Find the height of the tree.`;
        askEs = "la altura";
        askEn = "the height";
        work = `$h = ${d}\\tan 60^\\circ = ${d}\\sqrt{3} \\approx ${tok(value)}$`;
      } else {
        ang = 30;
        value = sig3(h * Math.sqrt(3));
        givenEs = `El árbol mide $${h}\\ \\text{m}$ de altura. Calcula la distancia horizontal desde el punto hasta la base del árbol.`;
        givenEn = `The tree is $${h}\\ \\text{m}$ tall. Find the horizontal distance from the point to the base of the tree.`;
        askEs = "la distancia horizontal";
        askEn = "the horizontal distance";
        work = `$d = \\frac{${h}}{\\tan 30^\\circ} = ${h}\\sqrt{3} \\approx ${tok(value)}$`;
      }
      return {
        skill: L("Ángulo de elevación", "Angle of elevation"),
        statement: L(
          `Desde un punto del suelo, el ángulo de elevación hasta la copa de un árbol es de $${ang}^\\circ$. ${givenEs} Redondea a **3 cifras significativas**.`,
          `From a point on the ground, the angle of elevation to the top of a tree is $${ang}^\\circ$. ${givenEn} Round to **3 significant figures**.`,
        ),
        answer: {
          kind: "numeric",
          value,
          tolerance: { mode: "sigfig", value: 3 },
          unitSuffix: "m",
        },
        hints: [
          L(
            "Dibuja el triángulo rectángulo: la altura es el cateto **opuesto** al ángulo y la distancia del suelo es el **adyacente**.",
            "Draw the right triangle: the height is the leg **opposite** the angle and the ground distance is the **adjacent** one.",
          ),
          L(
            "Con opuesto y adyacente conviene la tangente: $\\tan\\theta = \\frac{\\text{op}}{\\text{ad}}$.",
            "With opposite and adjacent, the tangent is the right ratio: $\\tan\\theta = \\frac{\\text{opp}}{\\text{adj}}$.",
          ),
          L(
            `Usa $\\tan 30^\\circ \\approx ${tok(r3(Math.tan(rad(30))))}$ y $\\tan 60^\\circ \\approx ${tok(r3(Math.tan(rad(60))))}$.`,
            `Use $\\tan 30^\\circ \\approx ${tok(r3(Math.tan(rad(30))))}$ and $\\tan 60^\\circ \\approx ${tok(r3(Math.tan(rad(60))))}$.`,
          ),
        ],
        answerDisplay: L(`$\\approx ${tok(value)}\\ \\text{m}$`, `$\\approx ${tok(value)}\\ \\text{m}$`),
        solution: [
          step(
            "given",
            `Ángulo de elevación $${ang}^\\circ$; ${scenario === "dFromH30" ? `altura $${h}\\ \\text{m}$` : `distancia horizontal $${d}\\ \\text{m}$`}.`,
            `Angle of elevation $${ang}^\\circ$; ${scenario === "dFromH30" ? `height $${h}\\ \\text{m}$` : `horizontal distance $${d}\\ \\text{m}$`}.`,
          ),
          step(
            "approach",
            "Modelamos con un triángulo rectángulo y usamos la tangente del ángulo de elevación.",
            "Model the situation with a right triangle and use the tangent of the elevation angle.",
          ),
          step("calculation", work, work),
          step(
            "result",
            `${askEs === "la altura" ? "La altura pedida" : "La distancia pedida"} es $\\approx ${tok(value)}\\ \\text{m}$ (3 cifras significativas).`,
            `The requested ${askEn === "the height" ? "height" : "distance"} is $\\approx ${tok(value)}\\ \\text{m}$ (3 significant figures).`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Direction of a vector (medium)                                    */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "triga-vec-02",
      subject: "math",
      topicId: "trig-applications",
      subtopicId: "vectors",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 120,
      tags: ["vectors", "direction", "arctan"],
      prerequisites: ["trig-foundations"],
    },
    (rng) => {
      const cfg = rng.pick([
        { x: "1", y: "1", tan: "1", ang: 45 },
        { x: "1", y: "\\sqrt{3}", tan: "\\sqrt{3}", ang: 60 },
        { x: "\\sqrt{3}", y: "1", tan: "\\frac{\\sqrt{3}}{3}", ang: 30 },
      ]);
      return {
        skill: L("Dirección de un vector", "Direction of a vector"),
        statement: L(
          `Un vector tiene componentes $(${cfg.x},\\ ${cfg.y})$, ambas positivas. ¿Qué ángulo forma con el semieje positivo $x$? (Da el resultado en grados.)`,
          `A vector has components $(${cfg.x},\\ ${cfg.y})$, both positive. What angle does it make with the positive $x$-axis? (Give the result in degrees.)`,
        ),
        answer: {
          kind: "numeric",
          value: cfg.ang,
          tolerance: { mode: "absolute", value: 0.001 },
          unitSuffix: "°",
        },
        hints: [
          L(
            "La dirección de un vector cumple $\\tan\\theta = \\frac{v_y}{v_x}$.",
            "The direction of a vector satisfies $\\tan\\theta = \\frac{v_y}{v_x}$.",
          ),
          L(
            "Calcula el cociente de las componentes: obtendrás un valor notable.",
            "Compute the ratio of the components: you will get a special value.",
          ),
          L(
            "Recuerda qué ángulo agudo tiene esa tangente exacta.",
            "Recall which acute angle has that exact tangent.",
          ),
        ],
        answerDisplay: L(`$\\theta = ${cfg.ang}^\\circ$`, `$\\theta = ${cfg.ang}^\\circ$`),
        solution: [
          step(
            "given",
            `$\\vec{v} = (${cfg.x},\\ ${cfg.y})$, ambas componentes positivas.`,
            `$\\vec{v} = (${cfg.x},\\ ${cfg.y})$, both components positive.`,
          ),
          step(
            "approach",
            "Como ambas componentes son positivas, el vector está en el primer cuadrante y $\\theta = \\arctan\\frac{v_y}{v_x}$.",
            "Since both components are positive, the vector lies in the first quadrant and $\\theta = \\arctan\\frac{v_y}{v_x}$.",
          ),
          step(
            "calculation",
            `$\\tan\\theta = \\frac{${cfg.y}}{${cfg.x}} = ${cfg.tan}$<br>$\\theta = ${cfg.ang}^\\circ$`,
            `$\\tan\\theta = \\frac{${cfg.y}}{${cfg.x}} = ${cfg.tan}$<br>$\\theta = ${cfg.ang}^\\circ$`,
          ),
          step(
            "result",
            `El vector forma $${cfg.ang}^\\circ$ con el semieje positivo $x$.`,
            `The vector makes an angle of $${cfg.ang}^\\circ$ with the positive $x$-axis.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Components of a force (medium, expression with surds)             */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "triga-vec-03",
      subject: "math",
      topicId: "trig-applications",
      subtopicId: "vectors",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 180,
      tags: ["vectors", "components", "exact-values"],
      prerequisites: ["trig-foundations"],
    },
    (rng) => {
      const k = rng.pick([2, 3, 4, 5]);
      const F = 2 * k;
      const cfg = rng.pick([
        {
          ang: 60,
          vert: true,
          valLatex: `${k}\\sqrt{3}`,
          acc: `${k}*sqrt(3)`,
          frac: "\\frac{\\sqrt{3}}{2}",
          approx: k * Math.sqrt(3),
        },
        {
          ang: 30,
          vert: false,
          valLatex: `${k}\\sqrt{3}`,
          acc: `${k}*sqrt(3)`,
          frac: "\\frac{\\sqrt{3}}{2}",
          approx: k * Math.sqrt(3),
        },
        {
          ang: 45,
          vert: true,
          valLatex: `${k}\\sqrt{2}`,
          acc: `${k}*sqrt(2)`,
          frac: "\\frac{\\sqrt{2}}{2}",
          approx: k * Math.sqrt(2),
        },
      ]);
      return {
        skill: L("Componentes de un vector", "Components of a vector"),
        statement: L(
          `Una fuerza de módulo $${F}\\ \\text{N}$ forma un ángulo de $${cfg.ang}^\\circ$ con la horizontal. Escribe su componente **${cfg.vert ? "vertical" : "horizontal"}** en forma exacta (con radicales; por ejemplo 6*sqrt(5)).`,
          `A force of magnitude $${F}\\ \\text{N}$ makes an angle of $${cfg.ang}^\\circ$ with the horizontal. Write its **${cfg.vert ? "vertical" : "horizontal"}** component in exact form (with radicals; e.g. 6*sqrt(5)).`,
        ),
        answer: { kind: "expression", accepted: [cfg.acc], variables: [] },
        hints: [
          L(
            "Las componentes son $F_x = F\\cos\\theta$ y $F_y = F\\sin\\theta$.",
            "The components are $F_x = F\\cos\\theta$ and $F_y = F\\sin\\theta$.",
          ),
          L(
            `La componente ${cfg.vert ? "vertical usa $\\sin$" : "horizontal usa $\\cos$"} con el valor exacto del ángulo $${cfg.ang}^\\circ$.`,
            `The ${cfg.vert ? "vertical component uses $\\sin$" : "horizontal component uses $\\cos$"} with the exact value of the $${cfg.ang}^\\circ$ angle.`,
          ),
          L(
            `$\\sin 60^\\circ = \\cos 30^\\circ = \\frac{\\sqrt{3}}{2}$ y $\\sin 45^\\circ = \\cos 45^\\circ = \\frac{\\sqrt{2}}{2}$.`,
            `$\\sin 60^\\circ = \\cos 30^\\circ = \\frac{\\sqrt{3}}{2}$ and $\\sin 45^\\circ = \\cos 45^\\circ = \\frac{\\sqrt{2}}{2}$.`,
          ),
        ],
        answerDisplay: L(
          `$${cfg.vert ? "F_y" : "F_x"} = ${cfg.valLatex}\\ \\text{N} \\approx ${tok(sig3(cfg.approx))}\\ \\text{N}$`,
          `$${cfg.vert ? "F_y" : "F_x"} = ${cfg.valLatex}\\ \\text{N} \\approx ${tok(sig3(cfg.approx))}\\ \\text{N}$`,
        ),
        solution: [
          step(
            "given",
            `$|\\vec{F}| = ${F}\\ \\text{N}$, $\\theta = ${cfg.ang}^\\circ$ sobre la horizontal.`,
            `$|\\vec{F}| = ${F}\\ \\text{N}$, $\\theta = ${cfg.ang}^\\circ$ above the horizontal.`,
          ),
          step(
            "approach",
            `Proyectamos sobre los ejes: la componente ${cfg.vert ? "vertical es $F_y = F\\sin\\theta$" : "horizontal es $F_x = F\\cos\\theta$"}.`,
            `Project onto the axes: the ${cfg.vert ? "vertical component is $F_y = F\\sin\\theta$" : "horizontal component is $F_x = F\\cos\\theta$"}.`,
          ),
          step(
            "calculation",
            `$${cfg.vert ? "F_y" : "F_x"} = ${F}\\cdot${cfg.frac} = ${cfg.valLatex}\\ \\text{N}$`,
            `$${cfg.vert ? "F_y" : "F_x"} = ${F}\\cdot${cfg.frac} = ${cfg.valLatex}\\ \\text{N}$`,
          ),
          step(
            "result",
            `$${cfg.vert ? "F_y" : "F_x"} = ${cfg.valLatex}\\ \\text{N} \\approx ${tok(sig3(cfg.approx))}\\ \\text{N}$.`,
            `$${cfg.vert ? "F_y" : "F_x"} = ${cfg.valLatex}\\ \\text{N} \\approx ${tok(sig3(cfg.approx))}\\ \\text{N}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Choosing the right tool (medium, MC)                              */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "triga-tri-03",
      subject: "math",
      topicId: "trig-applications",
      subtopicId: "triangle-problems",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["law-of-sines", "law-of-cosines", "strategy"],
      prerequisites: ["trig-foundations"],
    },
    (rng) => {
      const cfg = rng.pick([
        {
          dataEs: "los ángulos $A$ y $B$, y el lado $a$ opuesto a $A$",
          dataEn: "the angles $A$ and $B$, and the side $a$ opposite $A$",
          correct: "sines",
          whyEs:
            "Conoces un par lado-ángulo opuesto ($a$, $A$) y otro ángulo: el teorema del seno da el lado $b$ directamente.",
          whyEn:
            "You know one opposite side–angle pair ($a$, $A$) plus another angle: the law of sines yields side $b$ directly.",
        },
        {
          dataEs: "los lados $a$ y $b$, y el ángulo $C$ comprendido entre ellos",
          dataEn: "the sides $a$ and $b$, and the angle $C$ between them",
          correct: "cosines",
          whyEs:
            "Dos lados y el ángulo comprendido (caso LAL) es exactamente el escenario del teorema del coseno.",
          whyEn:
            "Two sides and the included angle (SAS) is exactly the law-of-cosines scenario.",
        },
        {
          dataEs: "los tres lados $a$, $b$ y $c$",
          dataEn: "all three sides $a$, $b$ and $c$",
          correct: "cosines",
          whyEs:
            "Con tres lados (caso LLL) los ángulos se hallan con el teorema del coseno despejando el coseno.",
          whyEn:
            "With three sides (SSS) the angles are found with the law of cosines, solving for the cosine.",
        },
        {
          dataEs: "el lado $a$, su ángulo opuesto $A$, y el ángulo $B$",
          dataEn: "the side $a$, its opposite angle $A$, and the angle $B$",
          correct: "sines",
          whyEs:
            "El par ($a$, $A$) permite usar el teorema del seno junto con el ángulo $B$ conocido.",
          whyEn:
            "The pair ($a$, $A$) lets you use the law of sines together with the known angle $B$.",
        },
        {
          dataEs: "un triángulo rectángulo con sus dos catetos conocidos",
          dataEn: "a right triangle with both legs known",
          correct: "pythagoras",
          whyEs:
            "Si hay un ángulo recto y conoces los dos catetos, la hipotenusa sale del teorema de Pitágoras.",
          whyEn:
            "With a right angle and both legs known, the hypotenuse follows from the Pythagorean theorem.",
        },
      ]);
      const options: McOption[] = [
        { id: "sines", text: L("Teorema del seno", "Law of sines"), correct: cfg.correct === "sines" },
        {
          id: "cosines",
          text: L("Teorema del coseno", "Law of cosines"),
          correct: cfg.correct === "cosines",
        },
        {
          id: "pythagoras",
          text: L("Teorema de Pitágoras", "Pythagorean theorem"),
          correct: cfg.correct === "pythagoras",
        },
        {
          id: "identity",
          text: L(
            "La identidad $\\sin^2\\theta + \\cos^2\\theta = 1$",
            "The identity $\\sin^2\\theta + \\cos^2\\theta = 1$",
          ),
          correct: false,
        },
      ];
      const correctName =
        cfg.correct === "sines"
          ? "el teorema del seno"
          : cfg.correct === "cosines"
            ? "el teorema del coseno"
            : "el teorema de Pitágoras";
      const correctNameEn =
        cfg.correct === "sines"
          ? "the law of sines"
          : cfg.correct === "cosines"
            ? "the law of cosines"
            : "the Pythagorean theorem";
      return {
        skill: L("Elegir la herramienta adecuada", "Choosing the right tool"),
        statement: L(
          `Para hallar los datos que faltan de un triángulo conocemos ${cfg.dataEs}. ¿Qué herramienta conviene usar **primero**?`,
          `To find the missing data of a triangle we know ${cfg.dataEn}. Which tool should be used **first**?`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Cuenta qué conoces: ¿lados, ángulos, y cómo se emparejan?",
            "Count what you know: sides, angles, and how they pair up.",
          ),
          L(
            "El teorema del seno necesita un par lado-ángulo **opuesto**; el del coseno resuelve los casos de dos lados con el ángulo comprendido o de tres lados.",
            "The law of sines needs an **opposite** side–angle pair; the law of cosines handles two sides with the included angle, or three sides.",
          ),
          L(
            "Si el triángulo es rectángulo y conoces dos lados, Pitágoras es el camino más corto.",
            "If the triangle is right-angled and two sides are known, Pythagoras is the shortest route.",
          ),
        ],
        answerDisplay: L(correctName, correctNameEn),
        solution: [
          step(
            "given",
            `Datos conocidos: ${cfg.dataEs}.`,
            `Known data: ${cfg.dataEn}.`,
          ),
          step(
            "approach",
            "Comparamos los datos con los casos que resuelve cada herramienta.",
            "Compare the data with the cases each tool solves.",
          ),
          step("calculation", cfg.whyEs, cfg.whyEn),
          step(
            "result",
            `Conviene usar ${correctName}.`,
            `${correctNameEn.charAt(0).toUpperCase() + correctNameEn.slice(1)} is the right choice.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Law of cosines: largest angle (hard, MC)                          */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "triga-loc-02",
      subject: "math",
      topicId: "trig-applications",
      subtopicId: "law-of-cosines",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 210,
      tags: ["law-of-cosines", "angles"],
      prerequisites: ["trig-foundations"],
    },
    (rng) => {
      const cfg = rng.pick([
        { s: [3, 4, 5], ang: 90 },
        { s: [6, 8, 10], ang: 90 },
        { s: [5, 12, 13], ang: 90 },
        { s: [3, 5, 7], ang: 120 },
        { s: [7, 8, 13], ang: 120 },
      ]);
      const [a, b, c] = cfg.s;
      const cosLatex = cfg.ang === 90 ? "0" : "-\\frac{1}{2}";
      const pool = [30, 45, 60, 90, 120, 150].filter((d) => d !== cfg.ang);
      const distractors = rng.shuffle(pool).slice(0, 3);
      const options: McOption[] = [
        { id: "a", text: L(`$${cfg.ang}^\\circ$`, `$${cfg.ang}^\\circ$`), correct: true },
        ...distractors.map((d, i) => ({
          id: `d${i}`,
          text: L(`$${d}^\\circ$`, `$${d}^\\circ$`),
          correct: false,
        })),
      ];
      return {
        skill: L("Mayor ángulo de un triángulo", "Largest angle of a triangle"),
        statement: L(
          `Un triángulo tiene lados $${a}$, $${b}$ y $${c}$. ¿Cuánto mide su **mayor ángulo**?`,
          `A triangle has sides $${a}$, $${b}$ and $${c}$. How large is its **largest angle**?`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El mayor ángulo está enfrente del lado más largo.",
            "The largest angle is opposite the longest side.",
          ),
          L(
            `Despeja el coseno: $\\cos C = \\frac{a^2 + b^2 - c^2}{2ab}$ con $c = ${c}$ el lado mayor.`,
            `Solve for the cosine: $\\cos C = \\frac{a^2 + b^2 - c^2}{2ab}$ with $c = ${c}$ the longest side.`,
          ),
          L(
            "Calcula el numerador y el denominador: el coseno resultante es un valor notable.",
            "Compute the numerator and the denominator: the resulting cosine is a special value.",
          ),
        ],
        answerDisplay: L(`Mayor ángulo $= ${cfg.ang}^\\circ$`, `Largest angle $= ${cfg.ang}^\\circ$`),
        solution: [
          step(
            "given",
            `Lados: $${a}$, $${b}$, $${c}$; el lado mayor es $${c}$, así que el ángulo buscado $C$ es el opuesto a $${c}$.`,
            `Sides: $${a}$, $${b}$, $${c}$; the longest side is $${c}$, so the wanted angle $C$ is opposite $${c}$.`,
          ),
          step(
            "approach",
            "Usamos el teorema del coseno despejando el coseno del ángulo.",
            "Use the law of cosines solved for the cosine of the angle.",
          ),
          step(
            "calculation",
            `$\\cos C = \\frac{${a}^2 + ${b}^2 - ${c}^2}{2\\cdot${a}\\cdot${b}} = \\frac{${a * a} + ${b * b} - ${c * c}}{${2 * a * b}} = \\frac{${a * a + b * b - c * c}}{${2 * a * b}} = ${cosLatex}$`,
            `$\\cos C = \\frac{${a}^2 + ${b}^2 - ${c}^2}{2\\cdot${a}\\cdot${b}} = \\frac{${a * a} + ${b * b} - ${c * c}}{${2 * a * b}} = \\frac{${a * a + b * b - c * c}}{${2 * a * b}} = ${cosLatex}$`,
          ),
          step(
            "result",
            `$\\cos C = ${cosLatex} \\Rightarrow C = ${cfg.ang}^\\circ$.`,
            `$\\cos C = ${cosLatex} \\Rightarrow C = ${cfg.ang}^\\circ$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Two observations of a tower (hard)                                */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "triga-tri-02",
      subject: "math",
      topicId: "trig-applications",
      subtopicId: "triangle-problems",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 300,
      tags: ["elevation", "two-steps", "tangent", "rounding"],
      prerequisites: ["trig-foundations"],
    },
    (rng) => {
      const scenario = rng.pick(["A", "B"] as const);
      const d = scenario === "A" ? rng.pick([20, 30, 40]) : rng.pick([10, 20, 30]);
      const near = scenario === "A" ? 60 : 45;
      const h =
        scenario === "A" ? (d * Math.sqrt(3)) / 2 : (d * (Math.sqrt(3) + 1)) / 2;
      const hR = sig3(h);
      const work =
        scenario === "A"
          ? `$h = \\frac{${d}}{\\cot 30^\\circ - \\cot 60^\\circ} = \\frac{${d}}{\\sqrt{3} - \\frac{\\sqrt{3}}{3}} = \\frac{${d}\\sqrt{3}}{2} \\approx ${tok(hR)}$`
          : `$h = \\frac{${d}}{\\cot 30^\\circ - \\cot 45^\\circ} = \\frac{${d}}{\\sqrt{3} - 1} = \\frac{${d}\\left(\\sqrt{3} + 1\\right)}{2} \\approx ${tok(hR)}$`;
      return {
        skill: L("Dos observaciones de elevación", "Two elevation observations"),
        statement: L(
          `Desde un punto del suelo, el ángulo de elevación a la cima de una torre es de $30^\\circ$. Una persona se acerca $${d}\\ \\text{m}$ hacia la torre y el ángulo de elevación pasa a ser de $${near}^\\circ$. Calcula la altura de la torre. Redondea a **3 cifras significativas**.`,
          `From a point on the ground, the angle of elevation to the top of a tower is $30^\\circ$. A person walks $${d}\\ \\text{m}$ towards the tower and the elevation angle becomes $${near}^\\circ$. Find the height of the tower. Round to **3 significant figures**.`,
        ),
        answer: {
          kind: "numeric",
          value: hR,
          tolerance: { mode: "sigfig", value: 3 },
          unitSuffix: "m",
        },
        hints: [
          L(
            "Dibuja los dos triángulos rectángulos: comparten la altura $h$ de la torre.",
            "Draw the two right triangles: they share the tower height $h$.",
          ),
          L(
            `Llama $x$ a la distancia desde el punto cercano: escribe $\\frac{h}{x} = \\tan ${near}^\\circ$ y $\\frac{h}{x + ${d}} = \\tan 30^\\circ$.`,
            `Call $x$ the distance from the near point: write $\\frac{h}{x} = \\tan ${near}^\\circ$ and $\\frac{h}{x + ${d}} = \\tan 30^\\circ$.`,
          ),
          L(
            "Despeja $x$ de la primera, sustituye en la segunda y elimina $x$.",
            "Solve the first equation for $x$, substitute into the second one and eliminate $x$.",
          ),
        ],
        answerDisplay: L(`$h \\approx ${tok(hR)}\\ \\text{m}$`, `$h \\approx ${tok(hR)}\\ \\text{m}$`),
        solution: [
          step(
            "given",
            `Ángulo lejano: $30^\\circ$. Ángulo cercano: $${near}^\\circ$. Distancia entre puntos: $${d}\\ \\text{m}$. Altura desconocida: $h$.`,
            `Far angle: $30^\\circ$. Near angle: $${near}^\\circ$. Distance between points: $${d}\\ \\text{m}$. Unknown height: $h$.`,
          ),
          step(
            "approach",
            `Escribimos las dos ecuaciones de la tangente y eliminamos la distancia auxiliar $x$ usando cotangentes: $h = \\frac{d}{\\cot 30^\\circ - \\cot ${near}^\\circ}$.`,
            `Write the two tangent equations and eliminate the auxiliary distance $x$ using cotangents: $h = \\frac{d}{\\cot 30^\\circ - \\cot ${near}^\\circ}$.`,
          ),
          step("calculation", work, work),
          step(
            "result",
            `La torre mide $\\approx ${tok(hR)}\\ \\text{m}$ (3 cifras significativas).`,
            `The tower is $\\approx ${tok(hR)}\\ \\text{m}$ tall (3 significant figures).`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Challenge: two ships at 120°                                      */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "triga-chal-01",
      subject: "math",
      topicId: "trig-applications",
      subtopicId: "triangle-problems",
      difficulty: "challenge",
      questionType: "numeric",
      estimatedTimeSec: 300,
      tags: ["law-of-cosines", "word-problems", "vectors"],
      prerequisites: ["trig-foundations"],
    },
    (rng) => {
      const k = rng.pick([2, 3, 4, 5]);
      const a = 3 * k;
      const b = 5 * k;
      const c = 7 * k;
      return {
        skill: L("Rutas y teorema del coseno", "Routes and the law of cosines"),
        statement: L(
          `Dos barcos salen del mismo puerto a la vez. El primero navega $${a}\\ \\text{km}$ en línea recta; el segundo navega $${b}\\ \\text{km}$ en una dirección que forma $120^\\circ$ con la del primero. ¿A qué distancia queda un barco del otro al terminar sus trayectos?`,
          `Two ships leave the same port at the same time. The first sails $${a}\\ \\text{km}$ in a straight line; the second sails $${b}\\ \\text{km}$ in a direction making $120^\\circ$ with the first one's course. How far apart are the ships at the end of their trips?`,
        ),
        answer: { kind: "numeric", value: c, unitSuffix: "km" },
        hints: [
          L(
            "Las dos rutas y el segmento que une los barcos forman un triángulo: conoces dos lados y el ángulo comprendido.",
            "The two routes and the segment joining the ships form a triangle: you know two sides and the included angle.",
          ),
          L(
            "Aplica el teorema del coseno con cuidado: $\\cos 120^\\circ = -\\frac{1}{2}$ (el signo importa).",
            "Apply the law of cosines carefully: $\\cos 120^\\circ = -\\frac{1}{2}$ (the sign matters).",
          ),
          L(
            `Con ese coseno queda $c^2 = a^2 + b^2 + ab$. Calcula y extrae la raíz.`,
            `With that cosine you get $c^2 = a^2 + b^2 + ab$. Compute and take the root.`,
          ),
        ],
        answerDisplay: L(`$c = ${c}\\ \\text{km}$`, `$c = ${c}\\ \\text{km}$`),
        solution: [
          step(
            "given",
            `Ruta 1: $${a}\\ \\text{km}$; ruta 2: $${b}\\ \\text{km}$; ángulo entre ambas: $120^\\circ$.`,
            `Route 1: $${a}\\ \\text{km}$; route 2: $${b}\\ \\text{km}$; angle between them: $120^\\circ$.`,
          ),
          step(
            "approach",
            "La distancia entre los barcos es el tercer lado de un triángulo con dos lados y el ángulo comprendido conocidos: teorema del coseno.",
            "The distance between the ships is the third side of a triangle with two sides and the included angle known: law of cosines.",
          ),
          step(
            "calculation",
            `$c^2 = ${a}^2 + ${b}^2 - 2\\cdot${a}\\cdot${b}\\cdot\\cos 120^\\circ$<br>$c^2 = ${a * a} + ${b * b} - ${2 * a * b}\\cdot\\left(-\\frac{1}{2}\\right) = ${a * a} + ${b * b} + ${a * b} = ${c * c}$<br>$c = \\sqrt{${c * c}} = ${c}$`,
            `$c^2 = ${a}^2 + ${b}^2 - 2\\cdot${a}\\cdot${b}\\cdot\\cos 120^\\circ$<br>$c^2 = ${a * a} + ${b * b} - ${2 * a * b}\\cdot\\left(-\\frac{1}{2}\\right) = ${a * a} + ${b * b} + ${a * b} = ${c * c}$<br>$c = \\sqrt{${c * c}} = ${c}$`,
          ),
          step(
            "result",
            `Los barcos quedan a $${c}\\ \\text{km}$ de distancia.`,
            `The ships end up $${c}\\ \\text{km}$ apart.`,
          ),
        ],
      };
    },
  ),
];
