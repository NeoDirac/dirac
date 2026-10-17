/**
 * MATH · Systems of linear equations
 *
 * Substitution, elimination, graphical solving, systems with parameters and
 * application problems. Every generator builds the solution (x₀, y₀) first
 * and derives the equations from it, so all variants are consistent, have a
 * unique clean answer and never degenerate.
 */

import { template, L, step } from "@/lib/problem";
import type { ProblemTemplate, McOption } from "@/lib/types";

import { templates as gaussTemplates } from "./systems-gauss";

/* ---------- string helpers for LaTeX built from parameters ---------- */

/** "+ 5" | "- 5" — joins a signed constant */
const op = (n: number): string => (n < 0 ? `- ${Math.abs(n)}` : `+ ${n}`);

/** "+ 5x" | "- x" | "+ 2y" — joins a signed term (coefficient 1 omitted) */
const opTerm = (n: number, v: string): string =>
  `${n < 0 ? "- " : "+ "}${Math.abs(n) === 1 ? "" : Math.abs(n)}${v}`;

/** "5x" | "-x" | "x" — leading term (coefficient 1 omitted) */
const lead = (n: number, v: string): string =>
  `${n < 0 ? "-" : ""}${Math.abs(n) === 1 ? "" : Math.abs(n)}${v}`;

/** "2x - 3" — linear expression in v with slope m and constant p */
const linExpr = (m: number, p: number, v = "x"): string =>
  `${lead(m, v)}${p === 0 ? "" : ` ${op(p)}`}`;

/** "7 - 3" | "7 + 3" | "7" — renders a − b with the right sign */
const minus = (a: number, b: number): string =>
  b === 0 ? `${a}` : `${a} ${b > 0 ? "-" : "+"} ${Math.abs(b)}`;

const ownTemplates: ProblemTemplate[] = [
  /* ---------------------------------------------------------------- */
  /* Substitution                                                     */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "sys-sub-01",
      subject: "math",
      topicId: "systems",
      subtopicId: "substitution",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 90,
      tags: ["systems", "substitution"],
      prerequisites: ["linear-equations"],
    },
    (rng) => {
      const m = rng.int(1, 2);
      const p = rng.int(-3, 3);
      const x0 = rng.nonZeroInt(-3, 3);
      const y0 = m * x0 + p;
      const a = rng.int(2, 4);
      const b = rng.int(2, 4);
      const c = a * x0 + b * y0;
      const A = a + b * m; // coefficient of x after substituting
      return {
        skill: L("Método de sustitución", "Substitution method"),
        statement: L(
          `Resuelve por sustitución y da el valor de $x$: $$\\begin{cases} y = ${linExpr(m, p)} \\\\ ${a}x + ${b}y = ${c} \\end{cases}$$`,
          `Solve by substitution and give the value of $x$: $$\\begin{cases} y = ${linExpr(m, p)} \\\\ ${a}x + ${b}y = ${c} \\end{cases}$$`,
        ),
        answer: { kind: "numeric", value: x0 },
        hints: [
          L(
            "La primera ecuación ya tiene despejada la $y$: úsala en la segunda.",
            "The first equation already gives $y$: use it in the second one.",
          ),
          L(
            `Sustituye: escribe $${b}\\left(${linExpr(m, p)}\\right)$ en lugar de $${b}y$.`,
            `Substitute: write $${b}\\left(${linExpr(m, p)}\\right)$ in place of $${b}y$.`,
          ),
          L(
            `Agrupa los términos con $x$ y pasa el número al otro lado.`,
            `Group the $x$ terms and move the number to the other side.`,
          ),
        ],
        answerDisplay: L(`$x = ${x0}$`, `$x = ${x0}$`),
        solution: [
          step(
            "given",
            `$$\\begin{cases} y = ${linExpr(m, p)} \\\\ ${a}x + ${b}y = ${c} \\end{cases}$$`,
            `$$\\begin{cases} y = ${linExpr(m, p)} \\\\ ${a}x + ${b}y = ${c} \\end{cases}$$`,
          ),
          step(
            "approach",
            "Como la primera ecuación da $y$ en función de $x$, la sustituimos en la segunda y queda una ecuación con una sola incógnita.",
            "Since the first equation gives $y$ in terms of $x$, we substitute it into the second one and obtain a single-unknown equation.",
          ),
          step(
            "calculation",
            `$${a}x + ${b}\\left(${linExpr(m, p)}\\right) = ${c}$<br>$${a}x + ${b * m}x ${b * p === 0 ? "" : op(b * p)} = ${c}$<br>$${A}x = ${minus(c, b * p)}$<br>$x = ${x0}$`,
            `$${a}x + ${b}\\left(${linExpr(m, p)}\\right) = ${c}$<br>$${a}x + ${b * m}x ${b * p === 0 ? "" : op(b * p)} = ${c}$<br>$${A}x = ${minus(c, b * p)}$<br>$x = ${x0}$`,
          ),
          step(
            "result",
            `La solución es $x = ${x0}$ (y comprobando en la primera ecuación, $y = ${y0}$).`,
            `The solution is $x = ${x0}$ (and checking in the first equation, $y = ${y0}$).`,
          ),
        ],
      };
    },
  ),

  template(
    {
      id: "sys-sub-02",
      subject: "math",
      topicId: "systems",
      subtopicId: "substitution",
      difficulty: "medium",
      questionType: "text",
      estimatedTimeSec: 150,
      tags: ["systems", "substitution", "ordered-pair"],
      prerequisites: ["linear-equations"],
    },
    (rng) => {
      const d = rng.intExcluding(-4, 4, [0]);
      const y0 = rng.nonZeroInt(-4, 4);
      const x0 = y0 + d;
      const a = rng.int(2, 5);
      const b = rng.int(2, 5);
      const c = a * x0 + b * y0;
      return {
        skill: L("Sustitución y solución como par ordenado", "Substitution and solution as an ordered pair"),
        statement: L(
          `Resuelve el sistema por sustitución y escribe la solución como par ordenado $(x, y)$, por ejemplo (3, -2): $$\\begin{cases} x = y ${op(d)} \\\\ ${a}x + ${b}y = ${c} \\end{cases}$$`,
          `Solve the system by substitution and write the solution as an ordered pair $(x, y)$, e.g. (3, -2): $$\\begin{cases} x = y ${op(d)} \\\\ ${a}x + ${b}y = ${c} \\end{cases}$$`,
        ),
        answer: {
          kind: "text",
          accepted: [
            `(${x0}, ${y0})`,
            `(${x0},${y0})`,
            `( ${x0}, ${y0} )`,
            `(${x0} , ${y0})`,
          ],
        },
        hints: [
          L(
            "La primera ecuación ya da $x$ en función de $y$.",
            "The first equation already gives $x$ in terms of $y$.",
          ),
          L(
            `Sustituye $x = y ${op(d)}$ en la segunda ecuación.`,
            `Substitute $x = y ${op(d)}$ into the second equation.`,
          ),
          L(
            `Te queda $(${a} + ${b})y = ${minus(c, a * d)}$: despeja $y$ y luego calcula $x$.`,
            `You get $(${a} + ${b})y = ${minus(c, a * d)}$: solve for $y$ and then compute $x$.`,
          ),
        ],
        answerDisplay: L(`$(x, y) = (${x0}, ${y0})$`, `$(x, y) = (${x0}, ${y0})$`),
        solution: [
          step(
            "given",
            `$$\\begin{cases} x = y ${op(d)} \\\\ ${a}x + ${b}y = ${c} \\end{cases}$$`,
            `$$\\begin{cases} x = y ${op(d)} \\\\ ${a}x + ${b}y = ${c} \\end{cases}$$`,
          ),
          step(
            "approach",
            "Sustituimos la expresión de $x$ en la segunda ecuación para obtener una ecuación solo con $y$.",
            "We substitute the expression for $x$ into the second equation to get an equation in $y$ only.",
          ),
          step(
            "calculation",
            `$${a}\\left(y ${op(d)}\\right) + ${b}y = ${c}$<br>$${a}y ${op(a * d)} + ${b}y = ${c}$<br>$${a + b}y = ${minus(c, a * d)}$<br>$y = ${y0}$<br>$x = y ${op(d)} = ${x0}$`,
            `$${a}\\left(y ${op(d)}\\right) + ${b}y = ${c}$<br>$${a}y ${op(a * d)} + ${b}y = ${c}$<br>$${a + b}y = ${minus(c, a * d)}$<br>$y = ${y0}$<br>$x = y ${op(d)} = ${x0}$`,
          ),
          step(
            "result",
            `La solución es el par $(${x0}, ${y0})$.`,
            `The solution is the pair $(${x0}, ${y0})$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Elimination                                                      */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "sys-elim-01",
      subject: "math",
      topicId: "systems",
      subtopicId: "elimination",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 120,
      tags: ["systems", "elimination"],
      prerequisites: ["linear-equations"],
    },
    (rng) => {
      const a = rng.nonZeroInt(-5, 5);
      let b = rng.nonZeroInt(-5, 5);
      if (b === a) b = a === 1 ? 2 : a === -1 ? -2 : a > 0 ? a - 1 : a + 1; // a ≠ b, b ≠ 0
      const x0 = rng.nonZeroInt(-5, 5);
      const y0 = rng.nonZeroInt(-5, 5);
      const e1 = x0 + a * y0;
      const e2 = x0 + b * y0;
      return {
        skill: L("Método de eliminación (resta directa)", "Elimination method (direct subtraction)"),
        statement: L(
          `Resuelve por eliminación y da el valor de $y$: $$\\begin{cases} x ${opTerm(a, "y")} = ${e1} \\\\ x ${opTerm(b, "y")} = ${e2} \\end{cases}$$`,
          `Solve by elimination and give the value of $y$: $$\\begin{cases} x ${opTerm(a, "y")} = ${e1} \\\\ x ${opTerm(b, "y")} = ${e2} \\end{cases}$$`,
        ),
        answer: { kind: "numeric", value: y0 },
        hints: [
          L(
            "Las dos ecuaciones tienen el mismo coeficiente en $x$.",
            "Both equations have the same coefficient for $x$.",
          ),
          L(
            "Resta la segunda ecuación de la primera: la $x$ desaparece.",
            "Subtract the second equation from the first: the $x$ cancels out.",
          ),
          L(
            `Al restar queda $(${a}) - (${b})$ multiplicando a $y$.`,
            `After subtracting, $y$ is multiplied by $(${a}) - (${b})$.`,
          ),
        ],
        answerDisplay: L(`$y = ${y0}$`, `$y = ${y0}$`),
        solution: [
          step(
            "given",
            `$$\\begin{cases} x ${opTerm(a, "y")} = ${e1} \\\\ x ${opTerm(b, "y")} = ${e2} \\end{cases}$$`,
            `$$\\begin{cases} x ${opTerm(a, "y")} = ${e1} \\\\ x ${opTerm(b, "y")} = ${e2} \\end{cases}$$`,
          ),
          step(
            "approach",
            "Como el coeficiente de $x$ es el mismo en ambas, restando miembro a miembro eliminamos $x$.",
            "Since the coefficient of $x$ is the same in both, subtracting side by side eliminates $x$.",
          ),
          step(
            "calculation",
            `$\\left(x ${opTerm(a, "y")}\\right) - \\left(x ${opTerm(b, "y")}\\right) = ${e1} - (${e2})$<br>$${opTerm(a - b, "y")} = ${e1 - e2}$<br>$y = ${y0}$`,
            `$\\left(x ${opTerm(a, "y")}\\right) - \\left(x ${opTerm(b, "y")}\\right) = ${e1} - (${e2})$<br>$${opTerm(a - b, "y")} = ${e1 - e2}$<br>$y = ${y0}$`,
          ),
          step(
            "result",
            `$y = ${y0}$. Sustituyendo en la primera ecuación: $x = ${e1} ${op(-a * y0)} = ${x0}$.`,
            `$y = ${y0}$. Substituting into the first equation: $x = ${e1} ${op(-a * y0)} = ${x0}$.`,
          ),
        ],
      };
    },
  ),

  template(
    {
      id: "sys-elim-02",
      subject: "math",
      topicId: "systems",
      subtopicId: "elimination",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 210,
      tags: ["systems", "elimination"],
      prerequisites: ["linear-equations"],
    },
    (rng) => {
      const b1 = rng.nonZeroInt(-4, 4);
      let b2 = rng.nonZeroInt(-4, 4);
      if (2 * b2 === 3 * b1) b2 = b2 > 0 ? b2 + 1 : b2 - 1; // avoid parallel system
      const x0 = rng.nonZeroInt(-5, 5);
      const y0 = rng.nonZeroInt(-5, 5);
      const c1 = 2 * x0 + b1 * y0;
      const c2 = 3 * x0 + b2 * y0;
      return {
        skill: L("Eliminación multiplicando ambas ecuaciones", "Elimination by multiplying both equations"),
        statement: L(
          `Resuelve por eliminación y da el valor de $y$: $$\\begin{cases} 2x ${opTerm(b1, "y")} = ${c1} \\\\ 3x ${opTerm(b2, "y")} = ${c2} \\end{cases}$$`,
          `Solve by elimination and give the value of $y$: $$\\begin{cases} 2x ${opTerm(b1, "y")} = ${c1} \\\\ 3x ${opTerm(b2, "y")} = ${c2} \\end{cases}$$`,
        ),
        answer: { kind: "numeric", value: y0 },
        hints: [
          L(
            "Los coeficientes de $x$ (2 y 3) no coinciden: hay que igualarlos multiplicando.",
            "The $x$ coefficients (2 and 3) do not match: equal them by multiplying.",
          ),
          L(
            "Multiplica la primera ecuación por 3 y la segunda por 2.",
            "Multiply the first equation by 3 and the second by 2.",
          ),
          L(
            "Resta las ecuaciones obtenidas: la $x$ se elimina y queda una ecuación en $y$.",
            "Subtract the resulting equations: $x$ cancels and an equation in $y$ remains.",
          ),
        ],
        answerDisplay: L(`$y = ${y0}$`, `$y = ${y0}$`),
        solution: [
          step(
            "given",
            `$$\\begin{cases} 2x ${opTerm(b1, "y")} = ${c1} \\\\ 3x ${opTerm(b2, "y")} = ${c2} \\end{cases}$$`,
            `$$\\begin{cases} 2x ${opTerm(b1, "y")} = ${c1} \\\\ 3x ${opTerm(b2, "y")} = ${c2} \\end{cases}$$`,
          ),
          step(
            "approach",
            "Igualamos los coeficientes de $x$ (mínimo común múltiplo 6) multiplicando cada ecuación, y luego restamos.",
            "We match the $x$ coefficients (least common multiple 6) by multiplying each equation, then subtract.",
          ),
          step(
            "calculation",
            `$3\\times(1):\\ 6x ${opTerm(3 * b1, "y")} = ${3 * c1}$<br>$2\\times(2):\\ 6x ${opTerm(2 * b2, "y")} = ${2 * c2}$<br>Restando: $${opTerm(3 * b1 - 2 * b2, "y")} = ${3 * c1 - 2 * c2}$<br>$y = ${y0}$`,
            `$3\\times(1):\\ 6x ${opTerm(3 * b1, "y")} = ${3 * c1}$<br>$2\\times(2):\\ 6x ${opTerm(2 * b2, "y")} = ${2 * c2}$<br>Subtracting: $${opTerm(3 * b1 - 2 * b2, "y")} = ${3 * c1 - 2 * c2}$<br>$y = ${y0}$`,
          ),
          step(
            "result",
            `$y = ${y0}$. Sustituyendo en la segunda ecuación: $3x = ${minus(c2, b2 * y0)}$, luego $x = ${x0}$.`,
            `$y = ${y0}$. Substituting into the second equation: $3x = ${minus(c2, b2 * y0)}$, so $x = ${x0}$.`,
          ),
        ],
      };
    },
  ),

  template(
    {
      id: "sys-chal-01",
      subject: "math",
      topicId: "systems",
      subtopicId: "elimination",
      difficulty: "challenge",
      questionType: "numeric",
      estimatedTimeSec: 240,
      tags: ["systems", "elimination", "insight"],
      prerequisites: ["linear-equations"],
    },
    (rng) => {
      const x0 = rng.nonZeroInt(-5, 5);
      const y0 = rng.nonZeroInt(-5, 5);
      const A = 2 * x0 + y0;
      const B = x0 + 2 * y0;
      return {
        skill: L("Combinar ecuaciones sin resolver el sistema", "Combining equations without solving the system"),
        statement: L(
          `Si $2x + y = ${A}$ y $x + 2y = ${B}$, ¿cuánto vale $x + y$? (Puedes resolver el sistema, pero hay un atajo.)`,
          `If $2x + y = ${A}$ and $x + 2y = ${B}$, what is $x + y$? (You may solve the system, but there is a shortcut.)`,
        ),
        answer: { kind: "numeric", value: x0 + y0 },
        hints: [
          L(
            "No te piden $x$ ni $y$ por separado, sino la suma $x + y$.",
            "You are not asked for $x$ or $y$ separately, but for the sum $x + y$.",
          ),
          L(
            "Suma las dos ecuaciones miembro a miembro y observa los coeficientes.",
            "Add the two equations side by side and look at the coefficients.",
          ),
          L(
            `La suma da $3x + 3y = ${A} + ${B}$: factoriza el lado izquierdo.`,
            `The sum gives $3x + 3y = ${A} + ${B}$: factor the left-hand side.`,
          ),
        ],
        answerDisplay: L(`$x + y = ${x0 + y0}$`, `$x + y = ${x0 + y0}$`),
        solution: [
          step(
            "given",
            `$2x + y = ${A}$<br>$x + 2y = ${B}$`,
            `$2x + y = ${A}$<br>$x + 2y = ${B}$`,
          ),
          step(
            "approach",
            "Como los coeficientes son simétricos, sumar ambas ecuaciones produce exactamente $3(x+y)$.",
            "Because the coefficients are symmetric, adding both equations produces exactly $3(x+y)$.",
          ),
          step(
            "calculation",
            `$2x + y + x + 2y = ${A} + ${B}$<br>$3x + 3y = ${A + B}$<br>$3(x + y) = ${A + B}$<br>$x + y = \\frac{${A + B}}{3} = ${x0 + y0}$`,
            `$2x + y + x + 2y = ${A} + ${B}$<br>$3x + 3y = ${A + B}$<br>$3(x + y) = ${A + B}$<br>$x + y = \\frac{${A + B}}{3} = ${x0 + y0}$`,
          ),
          step(
            "result",
            `$x + y = ${x0 + y0}$, sin necesidad de calcular $x$ ni $y$ por separado.`,
            `$x + y = ${x0 + y0}$, with no need to find $x$ or $y$ individually.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Graphing                                                         */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "sys-graph-01",
      subject: "math",
      topicId: "systems",
      subtopicId: "graphing",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["systems", "graphing", "intersection"],
      prerequisites: ["linear-equations"],
    },
    (rng) => {
      const x0 = rng.nonZeroInt(-3, 3);
      const y0 = rng.nonZeroInt(-3, 3);
      const m1 = rng.nonZeroInt(-3, 3);
      let m2 = rng.nonZeroInt(-3, 3);
      if (m2 === m1) m2 = m1 > 0 ? m1 - 1 || -1 : m1 + 1; // m1 ≠ m2
      if (m2 === 0) m2 = m1 > 0 ? m1 + 1 : m1 - 1;
      const b1 = y0 - m1 * x0;
      const b2 = y0 - m2 * x0;
      const options: McOption[] = [
        { id: "a", text: L(`$(${x0}, ${y0})$`, `$(${x0}, ${y0})$`), correct: true },
        {
          id: "b",
          text: L(`$(${x0 + 1}, ${y0 + m1})$`, `$(${x0 + 1}, ${y0 + m1})$`),
          correct: false,
        },
        {
          id: "c",
          text: L(`$(${x0 + 1}, ${y0 + m2})$`, `$(${x0 + 1}, ${y0 + m2})$`),
          correct: false,
        },
        {
          id: "d",
          text: L(`$(${x0 + 2}, ${y0 + 2 * m1})$`, `$(${x0 + 2}, ${y0 + 2 * m1})$`),
          correct: false,
        },
      ];
      return {
        skill: L("Leer la solución de un sistema en la gráfica", "Reading the solution of a system from its graph"),
        statement: L(
          "La gráfica muestra las dos rectas de un sistema. ¿En qué punto se cortan?",
          "The graph shows the two lines of a system. At which point do they intersect?",
        ),
        diagram: {
          kind: "function-graph",
          xMin: -6,
          xMax: 6,
          yMin: -6,
          yMax: 6,
          curves: [
            { fn: `${m1}*x + ${b1}`, color: "primary", label: "y₁" },
            { fn: `${m2}*x + ${b2}`, color: "secondary", label: "y₂" },
          ],
          points: [{ x: x0, y: y0 }],
          showGrid: true,
          xLabel: "x",
          yLabel: "y",
        },
        diagramLabel: L(
          `Dos rectas que se cortan en un punto de la cuadrícula con coordenadas enteras.`,
          `Two straight lines crossing at a grid point with integer coordinates.`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "La solución de un sistema es el punto donde las dos rectas se cortan.",
            "The solution of a system is the point where the two lines meet.",
          ),
          L(
            "Localiza el punto de corte y traza mentalmente líneas hasta los ejes.",
            "Locate the crossing point and trace mentally down/across to the axes.",
          ),
          L(
            "La primera coordenada se lee en el eje horizontal; la segunda, en el vertical.",
            "The first coordinate is read on the horizontal axis; the second, on the vertical one.",
          ),
        ],
        answerDisplay: L(`$(${x0}, ${y0})$`, `$(${x0}, ${y0})$`),
        solution: [
          step(
            "given",
            `Las rectas $y = ${linExpr(m1, b1)}$ y $y = ${linExpr(m2, b2)}$ se cortan en un punto de la cuadrícula.`,
            `The lines $y = ${linExpr(m1, b1)}$ and $y = ${linExpr(m2, b2)}$ meet at a grid point.`,
          ),
          step(
            "approach",
            "El punto de corte satisface las dos ecuaciones a la vez: es la solución del sistema.",
            "The crossing point satisfies both equations at once: it is the solution of the system.",
          ),
          step(
            "calculation",
            `El punto de corte es $(${x0}, ${y0})$: la primera recta da $y = ${m1} \\cdot (${x0}) ${op(b1)} = ${y0}$ y la segunda, $y = ${m2} \\cdot (${x0}) ${op(b2)} = ${y0}$.`,
            `The crossing point is $(${x0}, ${y0})$: the first line gives $y = ${m1} \\cdot (${x0}) ${op(b1)} = ${y0}$ and the second, $y = ${m2} \\cdot (${x0}) ${op(b2)} = ${y0}$.`,
          ),
          step(
            "result",
            `La solución del sistema es $(${x0}, ${y0})$.`,
            `The solution of the system is $(${x0}, ${y0})$.`,
          ),
        ],
      };
    },
  ),

  template(
    {
      id: "sys-graph-02",
      subject: "math",
      topicId: "systems",
      subtopicId: "graphing",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 90,
      tags: ["systems", "graphing", "classification"],
      prerequisites: ["linear-equations"],
    },
    (rng) => {
      const kind = rng.int(0, 2); // 0 unique · 1 none · 2 infinite
      const m1 = rng.nonZeroInt(-3, 3);
      const m2 = kind === 0 ? rng.intExcluding(-3, 3, [0, m1]) : m1;
      const b1 = rng.int(-4, 4);
      let b2 = rng.int(-4, 4);
      if (kind === 1 && b2 === b1) b2 = b1 > 0 ? b1 - 1 : b1 + 1; // parallel, not equal
      if (kind === 2) b2 = b1;
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "Una solución: las rectas se cortan en un punto",
            "One solution: the lines meet at a single point",
          ),
          correct: kind === 0,
        },
        {
          id: "b",
          text: L(
            "Ninguna solución: las rectas son paralelas",
            "No solution: the lines are parallel",
          ),
          correct: kind === 1,
        },
        {
          id: "c",
          text: L(
            "Infinitas soluciones: las rectas coinciden",
            "Infinitely many solutions: the lines coincide",
          ),
          correct: kind === 2,
        },
      ];
      return {
        skill: L("Clasificar un sistema por sus pendientes", "Classifying a system by its slopes"),
        statement: L(
          `Sin resolverlo, ¿cuántas soluciones tiene este sistema? $$\\begin{cases} y = ${linExpr(m1, b1)} \\\\ y = ${linExpr(m2, b2)} \\end{cases}$$`,
          `Without solving it, how many solutions does this system have? $$\\begin{cases} y = ${linExpr(m1, b1)} \\\\ y = ${linExpr(m2, b2)} \\end{cases}$$`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Compara las pendientes (los coeficientes de $x$) de las dos rectas.",
            "Compare the slopes (the coefficients of $x$) of the two lines.",
          ),
          L(
            "Pendientes distintas → un punto de corte. Pendientes iguales → paralelas o coincidentes.",
            "Different slopes → one crossing point. Equal slopes → parallel or identical lines.",
          ),
          L(
            "Si las pendientes son iguales, compara las ordenadas en el origen.",
            "If the slopes are equal, compare the y-intercepts.",
          ),
        ],
        answerDisplay: L(
          kind === 0
            ? "Una solución (rectas con pendientes distintas)"
            : kind === 1
              ? "Ninguna solución (rectas paralelas)"
              : "Infinitas soluciones (la misma recta)",
          kind === 0
            ? "One solution (lines with different slopes)"
            : kind === 1
              ? "No solution (parallel lines)"
              : "Infinitely many solutions (the same line)",
        ),
        solution: [
          step(
            "given",
            `$$\\begin{cases} y = ${linExpr(m1, b1)} \\\\ y = ${linExpr(m2, b2)} \\end{cases}$$`,
            `$$\\begin{cases} y = ${linExpr(m1, b1)} \\\\ y = ${linExpr(m2, b2)} \\end{cases}$$`,
          ),
          step(
            "approach",
            "Clasificamos el sistema comparando pendientes $m_1, m_2$ y ordenadas $b_1, b_2$.",
            "We classify the system by comparing slopes $m_1, m_2$ and intercepts $b_1, b_2$.",
          ),
          step(
            "calculation",
            kind === 0
              ? `$m_1 = ${m1} \\ne m_2 = ${m2}$: las rectas no son paralelas, así que se cortan en exactamente un punto.`
              : kind === 1
                ? `$m_1 = m_2 = ${m1}$ pero $b_1 = ${b1} \\ne b_2 = ${b2}$: rectas paralelas distintas, sin puntos en común.`
                : `$m_1 = m_2 = ${m1}$ y $b_1 = b_2 = ${b1}$: es la misma recta escrita dos veces.`,
            kind === 0
              ? `$m_1 = ${m1} \\ne m_2 = ${m2}$: the lines are not parallel, so they meet at exactly one point.`
              : kind === 1
                ? `$m_1 = m_2 = ${m1}$ but $b_1 = ${b1} \\ne b_2 = ${b2}$: distinct parallel lines, with no common point.`
                : `$m_1 = m_2 = ${m1}$ and $b_1 = b_2 = ${b1}$: it is the same line written twice.`,
          ),
          step(
            "result",
            kind === 0
              ? "El sistema tiene exactamente **una solución**."
              : kind === 1
                ? "El sistema **no tiene solución**."
                : "El sistema tiene **infinitas soluciones**.",
            kind === 0
              ? "The system has exactly **one solution**."
              : kind === 1
                ? "The system has **no solution**."
                : "The system has **infinitely many solutions**.",
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Systems with parameters                                           */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "sys-param-01",
      subject: "math",
      topicId: "systems",
      subtopicId: "parameters",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 240,
      tags: ["systems", "parameters", "proportionality"],
      prerequisites: ["linear-equations"],
    },
    (rng) => {
      const b = rng.int(1, 3);
      const c = rng.int(1, 3);
      const r = rng.pick([2, 3]);
      const x0 = rng.nonZeroInt(-4, 4);
      const y0 = rng.nonZeroInt(-4, 4);
      const c2 = b * x0 + c * y0;
      const k = r * b;
      const a = r * c;
      const c1 = r * c2;
      return {
        skill: L("Parámetro para infinitas soluciones", "Parameter for infinitely many solutions"),
        statement: L(
          `¿Para qué valor de $k$ tiene el sistema infinitas soluciones? $$\\begin{cases} kx + ${a}y = ${c1} \\\\ ${b}x + ${c}y = ${c2} \\end{cases}$$`,
          `For which value of $k$ does the system have infinitely many solutions? $$\\begin{cases} kx + ${a}y = ${c1} \\\\ ${b}x + ${c}y = ${c2} \\end{cases}$$`,
        ),
        answer: { kind: "numeric", value: k },
        hints: [
          L(
            "Infinitas soluciones significan que las dos ecuaciones describen **la misma recta**.",
            "Infinitely many solutions means both equations describe **the same line**.",
          ),
          L(
            "Una ecuación debe ser un múltiplo exacto de la otra: compara los coeficientes.",
            "One equation must be an exact multiple of the other: compare the coefficients.",
          ),
          L(
            `Los coeficientes de $y$ son ${a} y ${c}: su razón te da el factor de proporcionalidad.`,
            `The $y$ coefficients are ${a} and ${c}: their ratio gives the proportionality factor.`,
          ),
        ],
        answerDisplay: L(`$k = ${k}$`, `$k = ${k}$`),
        solution: [
          step(
            "given",
            `$$\\begin{cases} kx + ${a}y = ${c1} \\\\ ${b}x + ${c}y = ${c2} \\end{cases}$$`,
            `$$\\begin{cases} kx + ${a}y = ${c1} \\\\ ${b}x + ${c}y = ${c2} \\end{cases}$$`,
          ),
          step(
            "approach",
            "Para que haya infinitas soluciones, la primera ecuación debe ser un múltiplo $r$ de la segunda (misma recta).",
            "For infinitely many solutions, the first equation must be a multiple $r$ of the second one (same line).",
          ),
          step(
            "calculation",
            `Con los coeficientes de $y$: $r = \\frac{${a}}{${c}} = ${r}$.<br>Entonces $k = r \\cdot ${b} = ${r} \\cdot ${b} = ${k}$.<br>Comprobación con las constantes: $${r} \\cdot ${c2} = ${c1}$ ✓`,
            `From the $y$ coefficients: $r = \\frac{${a}}{${c}} = ${r}$.<br>Then $k = r \\cdot ${b} = ${r} \\cdot ${b} = ${k}$.<br>Check with the constants: $${r} \\cdot ${c2} = ${c1}$ ✓`,
          ),
          step(
            "result",
            `Con $k = ${k}$ la primera ecuación es $${r}$ veces la segunda: el sistema tiene infinitas soluciones.`,
            `With $k = ${k}$ the first equation is $${r}$ times the second one: the system has infinitely many solutions.`,
          ),
        ],
      };
    },
  ),

  template(
    {
      id: "sys-param-02",
      subject: "math",
      topicId: "systems",
      subtopicId: "parameters",
      difficulty: "challenge",
      questionType: "numeric",
      estimatedTimeSec: 300,
      tags: ["systems", "parameters", "parallel"],
      prerequisites: ["linear-equations"],
    },
    (rng) => {
      const A = rng.pick([2, 3]);
      const k = rng.int(2, 4);
      const B = A * k;
      const c1 = rng.int(2, 9);
      const delta = rng.pick([1, -1, 2, -2]);
      const C = A * c1 + delta;
      return {
        skill: L("Parámetro para un sistema incompatible", "Parameter for an inconsistent system"),
        statement: L(
          `¿Para qué valor de $k$ **no tiene** el sistema ninguna solución? $$\\begin{cases} x + ky = ${c1} \\\\ ${A}x + ${B}y = ${C} \\end{cases}$$`,
          `For which value of $k$ does the system have **no** solution? $$\\begin{cases} x + ky = ${c1} \\\\ ${A}x + ${B}y = ${C} \\end{cases}$$`,
        ),
        answer: { kind: "numeric", value: k },
        hints: [
          L(
            "Sin solución significa rectas **paralelas y distintas**.",
            "No solution means **parallel and distinct** lines.",
          ),
          L(
            "Paralelas: los coeficientes de $x$ e $y$ son proporcionales, pero las constantes no siguen la proporción.",
            "Parallel: the $x$ and $y$ coefficients are proportional, but the constants do not follow the same ratio.",
          ),
          L(
            `Plantea la proporción entre los coeficientes de $x$ y de $y$: $\\frac{1}{${A}} = \\frac{k}{${B}}$.`,
            `Set up the ratio between the $x$ and $y$ coefficients: $\\frac{1}{${A}} = \\frac{k}{${B}}$.`,
          ),
        ],
        answerDisplay: L(`$k = ${k}$`, `$k = ${k}$`),
        solution: [
          step(
            "given",
            `$$\\begin{cases} x + ky = ${c1} \\\\ ${A}x + ${B}y = ${C} \\end{cases}$$`,
            `$$\\begin{cases} x + ky = ${c1} \\\\ ${A}x + ${B}y = ${C} \\end{cases}$$`,
          ),
          step(
            "approach",
            "Un sistema no tiene solución cuando los coeficientes son proporcionales pero las constantes no. Imponemos la proporcionalidad de coeficientes.",
            "A system has no solution when the coefficients are proportional but the constants are not. We impose proportionality of the coefficients.",
          ),
          step(
            "calculation",
            `$\\frac{1}{${A}} = \\frac{k}{${B}} \\Rightarrow ${B} = ${A}\\,k \\Rightarrow k = \\frac{${B}}{${A}} = ${k}$<br>Comprobamos las constantes: $${A} \\cdot ${c1} = ${A * c1} \\ne ${C}$, así que las rectas son paralelas y distintas.`,
            `$\\frac{1}{${A}} = \\frac{k}{${B}} \\Rightarrow ${B} = ${A}\\,k \\Rightarrow k = \\frac{${B}}{${A}} = ${k}$<br>We check the constants: $${A} \\cdot ${c1} = ${A * c1} \\ne ${C}$, so the lines are parallel and distinct.`,
          ),
          step(
            "result",
            `Con $k = ${k}$ el sistema es incompatible: no tiene ninguna solución.`,
            `With $k = ${k}$ the system is inconsistent: it has no solution.`,
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
      id: "sys-app-01",
      subject: "math",
      topicId: "systems",
      subtopicId: "applications",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 180,
      tags: ["systems", "word-problems"],
      prerequisites: ["linear-equations"],
    },
    (rng) => {
      const pa = rng.int(6, 12);
      const pc = pa - rng.int(2, 4);
      const nA = rng.int(3, 8);
      const nC = rng.int(2, 7);
      const n = nA + nC;
      const total = nA * pa + nC * pc;
      return {
        skill: L("Plantear un sistema a partir de un enunciado", "Setting up a system from a word problem"),
        statement: L(
          `En un cine las entradas de adulto cuestan $${pa}\\,€$ y las de niño $${pc}\\,€$. Una familia compra $${n}$ entradas y paga en total $${total}\\,€$. ¿Cuántas entradas de adulto compraron?`,
          `At a cinema, adult tickets cost $${pa}\\,€$ and child tickets $${pc}\\,€$. A family buys $${n}$ tickets and pays $${total}\\,€$ in total. How many adult tickets did they buy?`,
        ),
        answer: { kind: "numeric", value: nA },
        hints: [
          L(
            "Hay dos incógnitas: número de entradas de cada tipo. Llámalas $x$ e $y$.",
            "There are two unknowns: the number of tickets of each kind. Call them $x$ and $y$.",
          ),
          L(
            `Una ecuación cuenta las entradas: $x + y = ${n}$. La otra cuenta el dinero: $${pa}x + ${pc}y = ${total}$.`,
            `One equation counts tickets: $x + y = ${n}$. The other counts money: $${pa}x + ${pc}y = ${total}$.`,
          ),
          L(
            `Multiplica la primera ecuación por $${pc}$ y réstasela a la segunda para eliminar $y$.`,
            `Multiply the first equation by $${pc}$ and subtract it from the second to eliminate $y$.`,
          ),
        ],
        answerDisplay: L(`$${nA}$ entradas de adulto`, `$${nA}$ adult tickets`),
        solution: [
          step(
            "given",
            `Precio adulto: $${pa}\\,€$; precio niño: $${pc}\\,€$.<br>Total de entradas: $${n}$. Pago total: $${total}\\,€$.`,
            `Adult price: $${pa}\\,€$; child price: $${pc}\\,€$.<br>Total tickets: $${n}$. Total paid: $${total}\\,€$.`,
          ),
          step(
            "approach",
            "Definimos $x$ = entradas de adulto, $y$ = entradas de niño, y planteamos un sistema de dos ecuaciones.",
            "Let $x$ = adult tickets and $y$ = child tickets, and set up a system of two equations.",
          ),
          step(
            "calculation",
            `$x + y = ${n}$<br>$${pa}x + ${pc}y = ${total}$<br>Multiplicando la primera por $${pc}$: $${pc}x + ${pc}y = ${pc * n}$<br>Restando: $(${pa} - ${pc})x = ${total - pc * n}$<br>$x = \\frac{${total - pc * n}}{${pa - pc}} = ${nA}$`,
            `$x + y = ${n}$<br>$${pa}x + ${pc}y = ${total}$<br>Multiplying the first by $${pc}$: $${pc}x + ${pc}y = ${pc * n}$<br>Subtracting: $(${pa} - ${pc})x = ${total - pc * n}$<br>$x = \\frac{${total - pc * n}}{${pa - pc}} = ${nA}$`,
          ),
          step(
            "result",
            `Compraron $${nA}$ entradas de adulto (y $${nC}$ de niño: $${nA} + ${nC} = ${n}$ ✓).`,
            `They bought $${nA}$ adult tickets (and $${nC}$ child tickets: $${nA} + ${nC} = ${n}$ ✓).`,
          ),
        ],
      };
    },
  ),

  template(
    {
      id: "sys-app-02",
      subject: "math",
      topicId: "systems",
      subtopicId: "applications",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 240,
      tags: ["systems", "word-problems", "digits"],
      prerequisites: ["linear-equations"],
    },
    (rng) => {
      const diff = rng.int(1, 4); // units − tens
      const a = rng.int(1, 9 - diff); // tens digit
      const b = a + diff; // units digit
      const s = a + b;
      const delta = 9 * diff;
      const N = 10 * a + b;
      return {
        skill: L("Problema de cifras con sistema", "Digit problem with a system"),
        statement: L(
          `La suma de las cifras de un número de dos dígitos es $${s}$. Si intercambias sus cifras, el número aumenta en $${delta}$. ¿Cuál es el número original?`,
          `The sum of the digits of a two-digit number is $${s}$. If you swap its digits, the number increases by $${delta}$. What is the original number?`,
        ),
        answer: { kind: "numeric", value: N },
        hints: [
          L(
            "Llama $x$ a la cifra de las decenas e $y$ a la de las unidades.",
            "Call $x$ the tens digit and $y$ the units digit.",
          ),
          L(
            `El número es $10x + y$ y el intercambiado es $10y + x$. Una ecuación es $x + y = ${s}$.`,
            `The number is $10x + y$ and the swapped one is $10y + x$. One equation is $x + y = ${s}$.`,
          ),
          L(
            `La otra ecuación es $10y + x = 10x + y + ${delta}$; simplifícala restando $10x + y$.`,
            `The other equation is $10y + x = 10x + y + ${delta}$; simplify it by subtracting $10x + y$.`,
          ),
        ],
        answerDisplay: L(`$${N}$`, `$${N}$`),
        solution: [
          step(
            "given",
            `Suma de cifras: $${s}$. Al intercambiarlas, el número aumenta en $${delta}$.`,
            `Digit sum: $${s}$. Swapping them increases the number by $${delta}$.`,
          ),
          step(
            "approach",
            "Con $x$ = decenas e $y$ = unidades, el número es $10x + y$ y el intercambiado $10y + x$; planteamos un sistema.",
            "With $x$ = tens and $y$ = units, the number is $10x + y$ and the swapped one $10y + x$; we set up a system.",
          ),
          step(
            "calculation",
            `$x + y = ${s}$<br>$10y + x = 10x + y + ${delta} \\Rightarrow 9y - 9x = ${delta} \\Rightarrow y - x = \\frac{${delta}}{9} = ${diff}$<br>Sumando ambas: $2y = ${s + diff} \\Rightarrow y = ${b}$, y entonces $x = ${a}$.`,
            `$x + y = ${s}$<br>$10y + x = 10x + y + ${delta} \\Rightarrow 9y - 9x = ${delta} \\Rightarrow y - x = \\frac{${delta}}{9} = ${diff}$<br>Adding both: $2y = ${s + diff} \\Rightarrow y = ${b}$, and then $x = ${a}$.`,
          ),
          step(
            "result",
            `El número original es $10 \\cdot ${a} + ${b} = ${N}$.`,
            `The original number is $10 \\cdot ${a} + ${b} = ${N}$.`,
          ),
        ],
      };
    },
  ),


  /* ---------------------------------------------------------------- */
  /* Curated Phase 2 — FOS/BOS 2010 §3.3 y FOS/BOS 2011 §3            */
  /* (sistemas lineales 2x2). Transcribed as printed; verified        */
  /* independently. Fixed problems — rng only shuffles MC.            */
  /* ---------------------------------------------------------------- */

  /* FOS/BOS 2010, 3.3 — eliminación con solución negativa grande. */
  template(
    {
      id: "sys-elim-03",
      subject: "math",
      topicId: "systems",
      subtopicId: "elimination",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 180,
      tags: ["systems", "elimination", "exam"],
      prerequisites: ["elimination"],
      source: {
        sourceId: "fos-bos-2010-ht",
        license: "OPEN_LICENSE",
        exerciseNumber: "3.3",
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$x = -21,\\ y = 13$", "$x = -21,\\ y = 13$"), correct: true },
        { id: "b", text: L("$x = 21,\\ y = -13$", "$x = 21,\\ y = -13$"), correct: false },
        { id: "c", text: L("$x = -13,\\ y = 21$", "$x = -13,\\ y = 21$"), correct: false },
        { id: "d", text: L("$x = 13,\\ y = -21$", "$x = 13,\\ y = -21$"), correct: false },
      ];
      return {
        skill: L("Sistema 2x2 por eliminación (examen real)", "2x2 system by elimination (real exam)"),
        statement: L(
          "Resuelve: $$\\begin{cases} x + y = -8 \\\\ x + 2y = 5 \\end{cases}$$",
          "Solve: $$\\begin{cases} x + y = -8 \\\\ x + 2y = 5 \\end{cases}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Resta la segunda ecuación menos la primera: la $x$ desaparece sola.",
            "Subtract the first equation from the second: the $x$ cancels by itself.",
          ),
          L(
            "$(x + 2y) - (x + y) = 5 - (-8)$ da $y = 13$.",
            "$(x + 2y) - (x + y) = 5 - (-8)$ gives $y = 13$.",
          ),
          L(
            "Sustituye en la primera: $x = -8 - 13$.",
            "Substitute into the first: $x = -8 - 13$.",
          ),
        ],
        answerDisplay: L("$L = \\{(-21,\\; 13)\\}$", "$L = \\{(-21,\\; 13)\\}$"),
        solution: [
          step(
            "given",
            "El sistema $x + y = -8$, $x + 2y = 5$.",
            "The system $x + y = -8$, $x + 2y = 5$.",
          ),
          step(
            "approach",
            "Los coeficientes de $x$ ya coinciden: una resta directa elimina una incógnita (eliminación).",
            "The $x$ coefficients already match: a direct subtraction eliminates one unknown (elimination).",
          ),
          step(
            "calculation",
            "II − I: $(x + 2y) - (x + y) = 5 - (-8) \\Rightarrow y = 13$.<br>Con $y = 13$ en I: $x = -8 - 13 = -21$.<br>Verificación: $-21 + 13 = -8$ ✓ y $-21 + 2 \\cdot 13 = 5$ ✓",
            "II − I: $(x + 2y) - (x + y) = 5 - (-8) \\Rightarrow y = 13$.<br>With $y = 13$ in I: $x = -8 - 13 = -21$.<br>Check: $-21 + 13 = -8$ ✓ and $-21 + 2 \\cdot 13 = 5$ ✓",
          ),
          step(
            "result",
            "$L = \\{(-21,\\; 13)\\}$.",
            "$L = \\{(-21,\\; 13)\\}$.",
          ),
        ],
      };
    },
  ),

  /* FOS/BOS 2011, 3 — sustitución tras simplificar. */
  template(
    {
      id: "sys-elim-04",
      subject: "math",
      topicId: "systems",
      subtopicId: "elimination",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["systems", "substitution", "exam"],
      prerequisites: ["elimination"],
      source: {
        sourceId: "fos-bos-2011",
        license: "OPEN_LICENSE",
        exerciseNumber: "3",
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$x = 5,\\ y = 7$", "$x = 5,\\ y = 7$"), correct: true },
        { id: "b", text: L("$x = 7,\\ y = 5$", "$x = 7,\\ y = 5$"), correct: false },
        { id: "c", text: L("$x = 12,\\ y = 7$", "$x = 12,\\ y = 7$"), correct: false },
        { id: "d", text: L("$x = 4,\\ y = 8$", "$x = 4,\\ y = 8$"), correct: false },
      ];
      return {
        skill: L("Sistema 2x2 con simplificación previa (examen real 2011)", "2x2 system with a simplifying step (real 2011 exam)"),
        statement: L(
          "Resuelve: $$\\begin{cases} 4x + 8y = 76 \\\\ x + y = 12 \\end{cases}$$",
          "Solve: $$\\begin{cases} 4x + 8y = 76 \\\\ x + y = 12 \\end{cases}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Simplifica la primera ecuación dividiendo todo entre $4$.",
            "Simplify the first equation by dividing everything by $4$.",
          ),
          L(
            "Queda $x + 2y = 19$ junto a $x + y = 12$: una resta elimina la $x$.",
            "You get $x + 2y = 19$ next to $x + y = 12$: one subtraction kills the $x$.",
          ),
          L(
            "$(x + 2y) - (x + y) = 19 - 12 \\Rightarrow y = 7$, y entonces $x = 12 - 7$.",
            "$(x + 2y) - (x + y) = 19 - 12 \\Rightarrow y = 7$, and then $x = 12 - 7$.",
          ),
        ],
        answerDisplay: L("$L = \\{(5,\\; 7)\\}$", "$L = \\{(5,\\; 7)\\}$"),
        solution: [
          step(
            "given",
            "El sistema $4x + 8y = 76$, $x + y = 12$.",
            "The system $4x + 8y = 76$, $x + y = 12$.",
          ),
          step(
            "approach",
            "Simplificar antes de operar (dividir entre $4$) reduce la aritmética; después, eliminación directa.",
            "Simplify before operating (divide by $4$) to shrink the arithmetic; then eliminate directly.",
          ),
          step(
            "calculation",
            "I entre $4$: $x + 2y = 19$.<br>Resta (I simplificada) − II: $y = 19 - 12 = 7$.<br>Con II: $x = 12 - 7 = 5$.<br>Verificación: $4 \\cdot 5 + 8 \\cdot 7 = 20 + 56 = 76$ ✓ y $5 + 7 = 12$ ✓ — coincide con el Lösungsvorschlag oficial.",
            "I divided by $4$: $x + 2y = 19$.<br>Subtract (simplified I) − II: $y = 19 - 12 = 7$.<br>With II: $x = 12 - 7 = 5$.<br>Check: $4 \\cdot 5 + 8 \\cdot 7 = 20 + 56 = 76$ ✓ and $5 + 7 = 12$ ✓ — matches the official Lösungsvorschlag.",
          ),
          step(
            "result",
            "$L = \\{(5,\\; 7)\\}$.",
            "$L = \\{(5,\\; 7)\\}$.",
          ),
        ],
      };
    },
  ),

  /* ================================================================== */
  /* Nonlinear systems (Task 17-b) — heavy bridge problems: line ∩      */
  /* parabola, parabola ∩ circle, and a substitution that yields a      */
  /* factorable quartic. Original compositions; no source.             */
  /* ================================================================== */

  /* sys-nonlin-01 — line ∩ parabola: give the intersection point */
  /* with positive abscissa (substitution → quadratic → back-substitution). */
  template(
    {
      id: "sys-nonlin-01",
      subject: "math",
      topicId: "systems",
      subtopicId: "substitution",
      difficulty: "hard",
      questionType: "text",
      estimatedTimeSec: 240,
      tags: ["systems", "nonlinear", "quadratics", "substitution", "parabola"],
      prerequisites: ["quadratics", "linear-equations"],
      reasoning: "multi-concept",
    },
    (rng) => {
      const x2 = rng.int(1, 4);
      const x1 = rng.intExcluding(-5, -1, [-x2]);
      const m = x1 + x2;
      const b = -x1 * x2;
      return {
        skill: L("Sistema no lineal: recta y parábola", "Nonlinear system: line and parabola"),
        statement: L(
          `Resuelve el sistema y escribe el punto de intersección con **abscisa positiva** como par ordenado $(x, y)$, por ejemplo $(2, 4)$: $$\\begin{cases} y = x^2 \\\\ y = ${linExpr(m, b)} \\end{cases}$$`,
          `Solve the system and write the intersection point with **positive abscissa** as an ordered pair $(x, y)$, e.g. $(2, 4)$: $$\\begin{cases} y = x^2 \\\\ y = ${linExpr(m, b)} \\end{cases}$$`,
        ),
        answer: {
          kind: "text",
          accepted: [
            `(${x2}, ${x2 * x2})`,
            `(${x2},${x2 * x2})`,
            `( ${x2}, ${x2 * x2} )`,
            `(${x2} , ${x2 * x2})`,
            `x = ${x2}, y = ${x2 * x2}`,
          ],
        },
        hints: [
          L(
            "Iguala las dos expresiones de $y$: $x^2 = " + linExpr(m, b) + "$ deja una ecuación con una sola incógnita.",
            "Equate the two expressions for $y$: $x^2 = " + linExpr(m, b) + "$ leaves an equation in one unknown.",
          ),
          L(
            "Te queda una cuadrática con **dos** raíces de distinto signo: el sistema tiene dos puntos de corte.",
            "You get a quadratic with **two** roots of opposite sign: the system has two intersection points.",
          ),
          L(
            "Para cada raíz, la ordenada sale de $y = x^2$; quédate con el punto de abscisa positiva.",
            "For each root, the ordinate comes from $y = x^2$; keep the point with positive abscissa.",
          ),
        ],
        answerDisplay: L(
          `Cortes: $(${x1}, ${x1 * x1})$ y $(${x2}, ${x2 * x2})$; el pedido es $(${x2}, ${x2 * x2})$`,
          `Intersections: $(${x1}, ${x1 * x1})$ and $(${x2}, ${x2 * x2})$; the requested one is $(${x2}, ${x2 * x2})$`,
        ),
        solution: [
          step(
            "given",
          `$$\\begin{cases} y = x^2 \\\\ y = ${linExpr(m, b)} \\end{cases}$$`,
          `$$\\begin{cases} y = x^2 \\\\ y = ${linExpr(m, b)} \\end{cases}$$`,
          ),
          step(
            "approach",
            "Sustituimos la recta en la parábola (método de sustitución): resulta una cuadrática, y cada raíz vuelve al sistema para dar la ordenada.",
            "We substitute the line into the parabola (substitution method): a quadratic results, and each root goes back into the system to give the ordinate.",
          ),
          step(
            "calculation",
          `Paso 1 (sustitución): $x^2 = ${linExpr(m, b)}$ ⟹ $x^2 ${opTerm(-m, "x")} ${op(-b)} = 0$.<br>Paso 2 (cuadráticas): $(x ${x1 >= 0 ? "- " : "+ "}${Math.abs(x1)})(x - ${x2}) = 0$ ⟹ $x = ${x1}$ o $x = ${x2}$.<br>Paso 3 (vuelta al sistema): con $x = ${x2}$: $y = ${x2}^2 = ${x2 * x2}$ ⟹ punto $(${x2}, ${x2 * x2})$. El otro corte es $(${x1}, ${x1 * x1})$.`,
          `Paso 1 (substitution): $x^2 = ${linExpr(m, b)}$ ⟹ $x^2 ${opTerm(-m, "x")} ${op(-b)} = 0$.<br>Paso 2 (quadratics): $(x ${x1 >= 0 ? "- " : "+ "}${Math.abs(x1)})(x - ${x2}) = 0$ ⟹ $x = ${x1}$ or $x = ${x2}$.<br>Paso 3 (back into the system): with $x = ${x2}$: $y = ${x2}^2 = ${x2 * x2}$ ⟹ point $(${x2}, ${x2 * x2})$. The other intersection is $(${x1}, ${x1 * x1})$.`,
          ),
          step(
            "result",
          `El punto de intersección con abscisa positiva es $(${x2}, ${x2 * x2})$.`,
          `The intersection point with positive abscissa is $(${x2}, ${x2 * x2})$.`,
          ),
        ],
      };
    },
  ),

  /* sys-nonlin-02 — parabola ∩ circle: largest ordinate of the */
  /* intersections (substitution → biquadratic → back-substitution). */
  template(
    {
      id: "sys-nonlin-02",
      subject: "math",
      topicId: "systems",
      subtopicId: "substitution",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 300,
      tags: ["systems", "nonlinear", "quadratics", "circles", "biquadratic"],
      prerequisites: ["quadratics", "analytic-geometry"],
      reasoning: "multi-concept",
    },
    (rng) => {
      const cfg = rng.pick([
        { a: 1, b: 2 },
        { a: 2, b: 3 },
        { a: 1, b: 4 },
        { a: 2, b: 5 },
        { a: 3, b: 4 },
        { a: 4, b: 5 },
        { a: 5, b: 6 },
      ]);
      const c = (1 + cfg.a * cfg.a + cfg.b * cfg.b) / 2;
      const r2 = c * c - cfg.a * cfg.a * cfg.b * cfg.b;
      const yA = cfg.a * cfg.a - c;
      const yB = cfg.b * cfg.b - c;
      return {
        skill: L("Sistema no lineal: parábola y circunferencia", "Nonlinear system: parabola and circle"),
        statement: L(
          `Resuelve el sistema y halla la **mayor ordenada** ($y$) entre todos los puntos de intersección: $$\\begin{cases} y = x^2 - ${c} \\\\ x^2 + y^2 = ${r2} \\end{cases}$$`,
          `Solve the system and find the **largest ordinate** ($y$) among all intersection points: $$\\begin{cases} y = x^2 - ${c} \\\\ x^2 + y^2 = ${r2} \\end{cases}$$`,
        ),
        answer: { kind: "numeric", value: yB },
        hints: [
          L(
            "Sustituye $y = x^2 - " + c + "$ en la ecuación de la circunferencia: queda todo en función de $x$.",
            "Substitute $y = x^2 - " + c + "$ into the circle's equation: everything becomes a function of $x$.",
          ),
          L(
            "Te queda una ecuación **bicuadrada** en $x$ (solo potencias pares): usa el cambio $u = x^2$.",
            "You get a **biquadratic** equation in $x$ (even powers only): use the change $u = x^2$.",
          ),
          L(
            "Cada valor positivo de $u$ da dos valores de $x$ ($\\pm\\sqrt{u}$); calcula la $y$ correspondiente de cada uno y compara.",
            "Each positive value of $u$ gives two values of $x$ ($\\pm\\sqrt{u}$); compute the corresponding $y$ of each and compare.",
          ),
        ],
        answerDisplay: L(
          `Los cortes son $(\\pm${cfg.a}, ${yA})$ y $(\\pm${cfg.b}, ${yB})$; la mayor ordenada es $${yB}$`,
          `The intersections are $(\\pm${cfg.a}, ${yA})$ and $(\\pm${cfg.b}, ${yB})$; the largest ordinate is $${yB}$`,
        ),
        solution: [
          step(
            "given",
          `$$\\begin{cases} y = x^2 - ${c} \\\\ x^2 + y^2 = ${r2} \\end{cases}$$`,
          `$$\\begin{cases} y = x^2 - ${c} \\\\ x^2 + y^2 = ${r2} \\end{cases}$$`,
          ),
          step(
            "approach",
            "Sustitución (sistemas) → ecuación bicuadrada → cambio $u = x^2$ (cuadráticas) → y cada solución de $x$ vuelve a $y = x^2 - " + c + "$.",
            "Substitution (systems) → biquadratic equation → change $u = x^2$ (quadratics) → and each $x$ solution goes back into $y = x^2 - " + c + "$.",
          ),
          step(
            "calculation",
          `Paso 1 (sustitución): $x^2 + (x^2 - ${c})^2 = ${r2}$.<br>Paso 2 (bicuadradas): con $u = x^2$: $u^2 ${opTerm(1 - 2 * c, "u")} ${op(c * c - r2)} = 0$, que se factoriza como $(u - ${cfg.a * cfg.a})(u - ${cfg.b * cfg.b}) = 0$.<br>Paso 3 (vuelta al sistema): $u = ${cfg.a * cfg.a}$ ⟹ $x = \\pm${cfg.a}$ con $y = ${yA}$; $u = ${cfg.b * cfg.b}$ ⟹ $x = \\pm${cfg.b}$ con $y = ${yB}$.`,
          `Paso 1 (substitution): $x^2 + (x^2 - ${c})^2 = ${r2}$.<br>Paso 2 (biquadratic): with $u = x^2$: $u^2 ${opTerm(1 - 2 * c, "u")} ${op(c * c - r2)} = 0$, which factors as $(u - ${cfg.a * cfg.a})(u - ${cfg.b * cfg.b}) = 0$.<br>Paso 3 (back into the system): $u = ${cfg.a * cfg.a}$ ⟹ $x = \\pm${cfg.a}$ with $y = ${yA}$; $u = ${cfg.b * cfg.b}$ ⟹ $x = \\pm${cfg.b}$ with $y = ${yB}$.`,
          ),
          step(
            "result",
          `Los cuatro cortes son $(\\pm${cfg.a}, ${yA})$ y $(\\pm${cfg.b}, ${yB})$; la mayor ordenada es $y = ${yB}$.`,
          `The four intersections are $(\\pm${cfg.a}, ${yA})$ and $(\\pm${cfg.b}, ${yB})$; the largest ordinate is $y = ${yB}$.`,
          ),
        ],
      };
    },
  ),

  /* sys-nonlin-03 — circle ∩ hyperbola: the substitution produces */
  /* a quartic that factors (x⁴ − R²x² + P² = 0). */
  template(
    {
      id: "sys-nonlin-03",
      subject: "math",
      topicId: "systems",
      subtopicId: "substitution",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 300,
      tags: ["systems", "nonlinear", "quartic", "factoring", "circles"],
      prerequisites: ["quadratics", "polynomials"],
      reasoning: "multi-concept",
    },
    (rng) => {
      const cfg = rng.pick([
        { m: 4, n: 3 },
        { m: 12, n: 5 },
        { m: 8, n: 6 },
        { m: 7, n: 5 },
        { m: 15, n: 8 },
        { m: 12, n: 9 },
        { m: 10, n: 8 },
        { m: 5, n: 3 },
        { m: 24, n: 7 },
      ]);
      const R2 = cfg.m * cfg.m + cfg.n * cfg.n;
      const P = cfg.m * cfg.n;
      const P2 = P * P;
      return {
        skill: L("Sistema no lineal: circunferencia e hipérbola", "Nonlinear system: circle and hyperbola"),
        statement: L(
          `El sistema siguiente tiene varias soluciones reales. De la solución que cumple $x > y > 0$, calcula $x + y$: $$\\begin{cases} x^2 + y^2 = ${R2} \\\\ xy = ${P} \\end{cases}$$`,
          `The following system has several real solutions. For the solution satisfying $x > y > 0$, compute $x + y$: $$\\begin{cases} x^2 + y^2 = ${R2} \\\\ xy = ${P} \\end{cases}$$`,
        ),
        answer: { kind: "numeric", value: cfg.m + cfg.n },
        hints: [
          L(
            "De $xy = " + P + "$, despeja $y = \\frac{" + P + "}{x}$ y sustituye en la circunferencia (o piensa en $(x + y)^2$).",
            "From $xy = " + P + "$, solve $y = \\frac{" + P + "}{x}$ and substitute into the circle (or think of $(x + y)^2$).",
          ),
          L(
            "Al sustituir queda una **cuártica** en $x$; con el cambio $u = x^2$ se convierte en una cuadrática que se factoriza.",
            "Substituting leaves a **quartic** in $x$; with the change $u = x^2$ it becomes a quadratic that factors.",
          ),
          L(
            "Cada valor de $x$ da $y = \\frac{" + P + "}{x}$; ordena las soluciones y quédate con la de $x > y > 0$.",
            "Each value of $x$ gives $y = \\frac{" + P + "}{x}$; sort the solutions and keep the one with $x > y > 0$.",
          ),
        ],
        answerDisplay: L(
          `Solución con $x > y > 0$: $(${cfg.m}, ${cfg.n})$ ⟹ $x + y = ${cfg.m + cfg.n}$`,
          `Solution with $x > y > 0$: $(${cfg.m}, ${cfg.n})$ ⟹ $x + y = ${cfg.m + cfg.n}$`,
        ),
        solution: [
          step(
            "given",
          `$$\\begin{cases} x^2 + y^2 = ${R2} \\\\ xy = ${P} \\end{cases}$$`,
          `$$\\begin{cases} x^2 + y^2 = ${R2} \\\\ xy = ${P} \\end{cases}$$`,
          ),
          step(
            "approach",
            "Sustitución (sistemas): la hipérbola metida en la circunferencia produce una cuártica; con $u = x^2$ (cuadráticas) se factoriza y cada raíz vuelve a $xy = " + P + "$.",
            "Substitution (systems): putting the hyperbola into the circle produces a quartic; with $u = x^2$ (quadratics) it factors, and each root goes back into $xy = " + P + "$.",
          ),
          step(
            "calculation",
          `Paso 1 (sustitución): $y = \\frac{${P}}{x}$ en la circunferencia: $x^2 + \\frac{${P2}}{x^2} = ${R2}$; multiplicando por $x^2$: $x^4 - ${R2}x^2 + ${P2} = 0$ (cuártica).<br>Paso 2 (cuártica que se factoriza): con $u = x^2$: $u^2 - ${R2}u + ${P2} = (u - ${cfg.m * cfg.m})(u - ${cfg.n * cfg.n}) = 0$ ⟹ $x = \\pm${cfg.m}, \\ \\pm${cfg.n}$.<br>Paso 3 (vuelta al sistema): $x = ${cfg.m}$ ⟹ $y = \\frac{${P}}{${cfg.m}} = ${cfg.n}$; $x = ${cfg.n}$ ⟹ $y = ${cfg.m}$. Las cuatro soluciones son $(${cfg.m}, ${cfg.n})$, $(${cfg.n}, ${cfg.m})$, $(-${cfg.m}, -${cfg.n})$, $(-${cfg.n}, -${cfg.m})$.`,
          `Paso 1 (substitution): $y = \\frac{${P}}{x}$ into the circle: $x^2 + \\frac{${P2}}{x^2} = ${R2}$; multiplying by $x^2$: $x^4 - ${R2}x^2 + ${P2} = 0$ (a quartic).<br>Paso 2 (quartic that factors): with $u = x^2$: $u^2 - ${R2}u + ${P2} = (u - ${cfg.m * cfg.m})(u - ${cfg.n * cfg.n}) = 0$ ⟹ $x = \\pm${cfg.m}, \\ \\pm${cfg.n}$.<br>Paso 3 (back into the system): $x = ${cfg.m}$ ⟹ $y = \\frac{${P}}{${cfg.m}} = ${cfg.n}$; $x = ${cfg.n}$ ⟹ $y = ${cfg.m}$. The four solutions are $(${cfg.m}, ${cfg.n})$, $(${cfg.n}, ${cfg.m})$, $(-${cfg.m}, -${cfg.n})$, $(-${cfg.n}, -${cfg.m})$.`,
          ),
          step(
            "result",
          `La solución con $x > y > 0$ es $(${cfg.m}, ${cfg.n})$, así que $x + y = ${cfg.m} + ${cfg.n} = ${cfg.m + cfg.n}$.`,
          `The solution with $x > y > 0$ is $(${cfg.m}, ${cfg.n})$, so $x + y = ${cfg.m} + ${cfg.n} = ${cfg.m + cfg.n}$.`,
          ),
        ],
      };
    },
  ),

  /* ================================================================== */
  /* Segunda tanda ESPOL — §6.6 S.E.N.L. (pp. 753–754) + §3.11 (p. 322) */
  /* Transcrita con el modelo de visión (VLM), cruzada con la clave      */
  /* impresa y re-derivada de forma independiente.                       */
  /* ================================================================== */

  /* 6.6 · 1) — a+b=(√5+1)/2, 4ab=√5−1 → t = a²+b² = 2 */
  template(
    {
      id: "sys-espol-senl1",
      subject: "math",
      topicId: "systems",
      subtopicId: "applications",
      difficulty: "challenge",
      questionType: "numeric",
      estimatedTimeSec: 420,
      tags: ["non-linear", "notable-product", "symmetric", "modeling"],
      prerequisites: ["quadratics"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "6.6 · 1)",
        page: 753,
      },
      reasoning: "multi-concept",
    },
    () => ({
      skill: L("Simétricos: trabajar con a+b y ab sin resolver", "Symmetric sums: work with a+b and ab without solving"),
      statement: L(
        `Sean $a, b \\in \\mathbb{R}$ tales que $a + b = \\dfrac{\\sqrt{5} + 1}{2}$ y $4ab = \\sqrt{5} - 1$. Determina el valor de $t = a^2 + b^2$.`,
        `Let $a, b \\in \\mathbb{R}$ such that $a + b = \\dfrac{\\sqrt{5} + 1}{2}$ and $4ab = \\sqrt{5} - 1$. Determine the value of $t = a^2 + b^2$.`,
      ),
      answer: {
        kind: "numeric",
        value: 2,
        tolerance: { mode: "absolute", value: 0.01 },
      },
      hints: [
        L(
          "No intentes despejar $a$ y $b$ por separado: la pregunta es sobre una combinación simétrica.",
          "Do not try to solve for $a$ and $b$ separately: the question is about a symmetric combination.",
        ),
        L(
          "Usa el producto notable $(a+b)^2 = a^2 + 2ab + b^2$, es decir $t = (a+b)^2 - 2ab$.",
          "Use the notable product $(a+b)^2 = a^2 + 2ab + b^2$, i.e. $t = (a+b)^2 - 2ab$.",
        ),
        L(
          "De $4ab = \\sqrt{5}-1$ sale $ab = \\frac{\\sqrt{5}-1}{4}$; y $\\left(\\frac{\\sqrt{5}+1}{2}\\right)^2 = \\frac{6+2\\sqrt{5}}{4} = \\frac{3+\\sqrt{5}}{2}$.",
          "From $4ab = \\sqrt{5}-1$ you get $ab = \\frac{\\sqrt{5}-1}{4}$; and $\\left(\\frac{\\sqrt{5}+1}{2}\\right)^2 = \\frac{6+2\\sqrt{5}}{4} = \\frac{3+\\sqrt{5}}{2}$.",
        ),
      ],
      answerDisplay: L(
        `$t = a^2 + b^2 = \\left(\\dfrac{\\sqrt{5}+1}{2}\\right)^2 - 2\\cdot\\dfrac{\\sqrt{5}-1}{4} = \\dfrac{3+\\sqrt{5}}{2} - \\dfrac{\\sqrt{5}-1}{2} = 2$.`,
        `$t = a^2 + b^2 = \\left(\\dfrac{\\sqrt{5}+1}{2}\\right)^2 - 2\\cdot\\dfrac{\\sqrt{5}-1}{4} = \\dfrac{3+\\sqrt{5}}{2} - \\dfrac{\\sqrt{5}-1}{2} = 2$.`,
      ),
      solution: [
        step(
          "given",
          "$a + b = \\frac{\\sqrt{5}+1}{2}$, $4ab = \\sqrt{5}-1$; se pide $t = a^2 + b^2$.",
          "$a + b = \\frac{\\sqrt{5}+1}{2}$, $4ab = \\sqrt{5}-1$; find $t = a^2 + b^2$.",
        ),
        step(
          "approach",
          "La sugerencia del libro es la clave: elevar al cuadrado la suma y usar el producto notable $(a+b)^2 = a^2 + 2ab + b^2$ para expresar $t$ en términos de los datos, sin resolver el sistema.",
          "The book's hint is the key: square the sum and use the notable product $(a+b)^2 = a^2 + 2ab + b^2$ to express $t$ in terms of the data, without solving the system.",
        ),
        step(
          "calculation",
          `$ab = \\frac{\\sqrt{5}-1}{4} \\Rightarrow 2ab = \\frac{\\sqrt{5}-1}{2}$<br>$(a+b)^2 = \\left(\\frac{\\sqrt{5}+1}{2}\\right)^2 = \\frac{5 + 2\\sqrt{5} + 1}{4} = \\frac{6+2\\sqrt{5}}{4} = \\frac{3+\\sqrt{5}}{2}$<br>$t = (a+b)^2 - 2ab = \\frac{3+\\sqrt{5}}{2} - \\frac{\\sqrt{5}-1}{2} = \\frac{3+\\sqrt{5}-\\sqrt{5}+1}{2} = \\frac{4}{2} = 2$`,
          `$ab = \\frac{\\sqrt{5}-1}{4} \\Rightarrow 2ab = \\frac{\\sqrt{5}-1}{2}$<br>$(a+b)^2 = \\left(\\frac{\\sqrt{5}+1}{2}\\right)^2 = \\frac{5 + 2\\sqrt{5} + 1}{4} = \\frac{6+2\\sqrt{5}}{4} = \\frac{3+\\sqrt{5}}{2}$<br>$t = (a+b)^2 - 2ab = \\frac{3+\\sqrt{5}}{2} - \\frac{\\sqrt{5}-1}{2} = \\frac{3+\\sqrt{5}-\\sqrt{5}+1}{2} = \\frac{4}{2} = 2$`,
        ),
        step(
          "result",
          `$t = a^2 + b^2 = 2$. Comprobación de sanidad: $a$ y $b$ son las raíces de $z^2 - \\frac{\\sqrt{5}+1}{2}z + \\frac{\\sqrt{5}-1}{4} = 0$, y por Vieta la suma de sus cuadrados da exactamente $2$ ✓.`,
          `$t = a^2 + b^2 = 2$. Sanity check: $a, b$ are the roots of $z^2 - \\frac{\\sqrt5+1}{2}z + \\frac{\\sqrt5-1}{4} = 0$ and indeed $a^2 + b^2 = 2$ exactly ✓.`,
        ),
      ],
    }),
  ),

  /* 6.6 · 3) — x³+y³=−3xy(x+y), x³−2y³=24 → (2, −2) */
  template(
    {
      id: "sys-espol-senl3",
      subject: "math",
      topicId: "systems",
      subtopicId: "applications",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 540,
      tags: ["non-linear", "cubic-identity", "sum-of-cubes"],
      prerequisites: ["polynomials"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "6.6 · 3)",
        page: 754,
      },
      reasoning: "multi-concept",
    },
    () => {
      const options: McOption[] = [
        { id: "a", text: L(`$(x, y) = (2, -2)$`, `$(x, y) = (2, -2)$`), correct: true },
        { id: "b", text: L(`$(x, y) = (-2, 2)$`, `$(x, y) = (-2, 2)$`), correct: false },
        { id: "c", text: L(`$(x, y) = (2, 2)$`, `$(x, y) = (2, 2)$`), correct: false },
        { id: "d", text: L(`$(x, y) = (3, -3)$`, `$(x, y) = (3, -3)$`), correct: false },
      ];
      return {
        skill: L("El cubo de una suma esconde la solución", "The cube of a sum hides the solution"),
        statement: L(
          `Determina analíticamente el conjunto de verdad del predicado de dos variables $q(x, y):$ $\\begin{cases} x^3 + y^3 = -3xy(x + y) \\\\ x^3 - 2y^3 = 24 \\end{cases}$`,
          `Determine analytically the truth set of the two-variable predicate $q(x, y):$ $\\begin{cases} x^3 + y^3 = -3xy(x + y) \\\\ x^3 - 2y^3 = 24 \\end{cases}$`,
        ),
        answer: { kind: "multiple-choice", options },
        hints: [
          L(
            "Pasa todo al lado izquierdo en la primera ecuación: $x^3 + y^3 + 3xy(x+y) = 0$. ¿Te suena a un producto notable?",
            "Move everything to the left side in the first equation: $x^3 + y^3 + 3xy(x+y) = 0$. Does it remind you of a notable product?",
          ),
          L(
            "$(x+y)^3 = x^3 + y^3 + 3xy(x+y)$, así que la primera ecuación dice $(x+y)^3 = 0$.",
            "$(x+y)^3 = x^3 + y^3 + 3xy(x+y)$, so the first equation says $(x+y)^3 = 0$.",
          ),
          L(
            "Por tanto $y = -x$; sustituye en $x^3 - 2y^3 = 24$.",
            "Hence $y = -x$; substitute into $x^3 - 2y^3 = 24$.",
          ),
        ],
        answerDisplay: L(
          `$A_{q(x,y)} = \\{(2, -2)\\}$`,
          `$A_{q(x,y)} = \\{(2, -2)\\}$`,
        ),
        solution: [
          step(
            "given",
            "$\\begin{cases} x^3 + y^3 = -3xy(x+y) \\\\ x^3 - 2y^3 = 24 \\end{cases}$, con $x, y \\in \\mathbb{R}$.",
            "$\\begin{cases} x^3 + y^3 = -3xy(x+y) \\\\ x^3 - 2y^3 = 24 \\end{cases}$, with $x, y \\in \\mathbb{R}$.",
          ),
          step(
            "approach",
            "Reconocer el cubo de una suma en la primera ecuación colapsa el sistema: la igualdad $x^3 + y^3 = -3xy(x+y)$ es exactamente $(x+y)^3 = 0$.",
            "Recognizing the cube of a sum in the first equation collapses the system: the equality $x^3 + y^3 = -3xy(x+y)$ is exactly $(x+y)^3 = 0$.",
          ),
          step(
            "calculation",
            `$x^3 + y^3 + 3xy(x+y) = 0 \\Rightarrow (x+y)^3 = 0 \\Rightarrow y = -x$<br>Sustituyendo: $x^3 - 2(-x)^3 = x^3 + 2x^3 = 3x^3 = 24$<br>$x^3 = 8 \\Rightarrow x = 2,\\ y = -2$`,
            `$x^3 + y^3 + 3xy(x+y) = 0 \\Rightarrow (x+y)^3 = 0 \\Rightarrow y = -x$<br>Substituting: $x^3 - 2(-x)^3 = x^3 + 2x^3 = 3x^3 = 24$<br>$x^3 = 8 \\Rightarrow x = 2,\\ y = -2$`,
          ),
          step(
            "result",
            `La solución única es $(x, y) = (2, -2)$. Comprobación: $8 + (-8) = 0$ y $-3(2)(-2)(0) = 0$ ✓; $8 - 2(-8) = 24$ ✓. (El distractor $(3,-3)$ también cumple la primera ecuación —¡cualquier par con $y=-x$ la cumple!— pero $27 + 54 = 81 \\ne 24$.)`,
            `The unique solution is $(x, y) = (2, -2)$. Check: $8 + (-8) = 0$ and $-3(2)(-2)(0) = 0$ ✓; $8 - 2(-8) = 24$ ✓. (The distractor $(3,-3)$ also satisfies the first equation — any pair with $y=-x$ does! — but $27 + 54 = 81 \\ne 24$.)`,
          ),
        ],
      };
    },
  ),

  /* 6.6 · 4) — 2^(x+y)−20=2^(2x−y), ln(ex)−ln(y)=1 → x=y=log₂5 */
  template(
    {
      id: "sys-espol-senl4",
      subject: "math",
      topicId: "systems",
      subtopicId: "applications",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 540,
      tags: ["non-linear", "exponential", "logarithm", "substitution"],
      prerequisites: ["quadratics"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "6.6 · 4)",
        page: 754,
      },
      reasoning: "multi-concept",
    },
    () => {
      const options: McOption[] = [
        { id: "a", text: L(`$x = y = \\log_2 5$`, `$x = y = \\log_2 5$`), correct: true },
        { id: "b", text: L(`$x = y = \\dfrac{5}{2}$`, `$x = y = \\dfrac{5}{2}$`), correct: false },
        { id: "c", text: L(`$x = y = \\ln 5$`, `$x = y = \\ln 5$`), correct: false },
        { id: "d", text: L(`$x = 2,\\ y = \\log_3 5$`, `$x = 2,\\ y = \\log_3 5$`), correct: false },
      ];
      return {
        skill: L("Logaritmo que fuerza x = y y exponencial cuadrática", "A logarithm forcing x = y and a quadratic exponential"),
        statement: L(
          `Con $x, y \\in \\mathbb{R}^+$, obtén la solución analítica del sistema $\\begin{cases} 2^{x+y} - 20 = 2^{2x-y} \\\\ \\ln(ex) - \\ln(y) = 1 \\end{cases}$`,
          `With $x, y \\in \\mathbb{R}^+$, find the analytical solution of the system $\\begin{cases} 2^{x+y} - 20 = 2^{2x-y} \\\\ \\ln(ex) - \\ln(y) = 1 \\end{cases}$`,
        ),
        answer: { kind: "multiple-choice", options },
        hints: [
          L(
            "En la segunda ecuación usa $\\ln(ex) = \\ln e + \\ln x = 1 + \\ln x$ y las leyes del logaritmo para unir los términos.",
            "In the second equation use $\\ln(ex) = \\ln e + \\ln x = 1 + \\ln x$ and the logarithm laws to join the terms.",
          ),
          L(
            "$\\ln\\left(\\frac{ex}{y}\\right) = 1 \\Rightarrow \\frac{ex}{y} = e \\Rightarrow x = y$.",
            "$\\ln\\left(\\frac{ex}{y}\\right) = 1 \\Rightarrow \\frac{ex}{y} = e \\Rightarrow x = y$.",
          ),
          L(
            "Con $x = y$: $2^{2x} - 20 = 2^{x}$. Llama $u = 2^x$ y resuelve la cuadrática.",
            "With $x = y$: $2^{2x} - 20 = 2^{x}$. Let $u = 2^x$ and solve the quadratic.",
          ),
        ],
        answerDisplay: L(
          `$x = y = \\log_2 5 \\approx 2{.}3219$`,
          `$x = y = \\log_2 5 \\approx 2{.}3219$`,
        ),
        solution: [
          step(
            "given",
            "$\\begin{cases} 2^{x+y} - 20 = 2^{2x-y} \\\\ \\ln(ex) - \\ln(y) = 1 \\end{cases}$, con $x, y > 0$.",
            "$\\begin{cases} 2^{x+y} - 20 = 2^{2x-y} \\\\ \\ln(ex) - \\ln(y) = 1 \\end{cases}$, with $x, y > 0$.",
          ),
          step(
            "approach",
            "La ecuación logarítmica es la puerta: colapsa a una proporción que fuerza $x = y$; después la ecuación exponencial se vuelve una cuadrática disfrazada con la sustitución $u = 2^x$.",
            "The logarithmic equation is the gateway: it collapses to a proportion forcing $x = y$; then the exponential equation becomes a quadratic in disguise with the substitution $u = 2^x$.",
          ),
          step(
            "calculation",
            `$\\ln\\left(\\frac{ex}{y}\\right) = 1 \\Rightarrow \\frac{ex}{y} = e \\Rightarrow x = y$<br>Con $x = y$: $2^{2x} - 20 = 2^{x}$; sea $u = 2^x > 0$<br>$u^2 - u - 20 = 0 \\Rightarrow (u-5)(u+4) = 0 \\Rightarrow u = 5$ (la raíz $-4$ se descarta)<br>$2^x = 5 \\Rightarrow x = \\log_2 5$`,
            `$\\ln\\left(\\frac{ex}{y}\\right) = 1 \\Rightarrow \\frac{ex}{y} = e \\Rightarrow x = y$<br>With $x = y$: $2^{2x} - 20 = 2^{x}$; let $u = 2^x > 0$<br>$u^2 - u - 20 = 0 \\Rightarrow (u-5)(u+4) = 0 \\Rightarrow u = 5$ (the root $-4$ is discarded)<br>$2^x = 5 \\Rightarrow x = \\log_2 5$`,
          ),
          step(
            "result",
            `La solución es $x = y = \\log_2 5 \\. \\approx 2{.}3219$. Comprobación: $\\ln(e \\cdot 2{.}3219) - \\ln(2{.}3219) = 1$ ✓; $2^{4{.}6439} - 20 = 25 - 20 = 5 = 2^{2{.}3219}$ ✓.`,
            `The solution is $x = y = \\log_2 5 \\approx 2{.}3219$. Check: $\\ln(e \\cdot 2{.}3219) - \\ln(2{.}3219) = 1$ ✓; $2^{4{.}6439} - 20 = 25 - 20 = 5 = 2^{2{.}3219}$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 3.11 · 110 — mixture: 25% and 15% H₂SO₄ → 200 gal at 18% */
  template(
    {
      id: "sys-espol-110",
      subject: "math",
      topicId: "systems",
      subtopicId: "applications",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 360,
      tags: ["mixture", "modeling", "percentages", "word-problem"],
      prerequisites: ["linear-equations"],
      source: {
        sourceId: "fcnm-fundamentos",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3.11 · 110",
        page: 322,
      },
      reasoning: "modeling",
    },
    () => {
      const options: McOption[] = [
        { id: "a", text: L(`$60$ y $140$ gal`, `$60$ and $140$ gal`), correct: true },
        { id: "b", text: L(`$80$ y $120$ gal`, `$80$ and $120$ gal`), correct: false },
        { id: "c", text: L(`$100$ y $100$ gal`, `$100$ and $100$ gal`), correct: false },
        { id: "d", text: L(`$110$ y $90$ gal`, `$110$ and $90$ gal`), correct: false },
      ];
      return {
        skill: L("Mezclas: balance de volumen y de ácido", "Mixtures: balancing volume and acid"),
        statement: L(
          `Un almacén de productos químicos tiene dos tipos de soluciones ácidas: una con $25\\%$ de $H_2SO_4$ y otra con $15\\%$ de $H_2SO_4$. ¿Cuántos galones de cada tipo deben combinarse, respectivamente, para obtener $200$ galones de una mezcla que contenga el $18\\%$ de $H_2SO_4$?`,
          `A chemical warehouse has two types of acid solutions: one with $25\\%$ $H_2SO_4$ and another with $15\\%$ $H_2SO_4$. How many gallons of each type must be combined, respectively, to obtain $200$ gallons of a mixture containing $18\\%$ $H_2SO_4$?`,
        ),
        answer: { kind: "multiple-choice", options },
        hints: [
          L(
            "Define $x$ = galones de la solución al $25\\%$ y $y$ = galones de la al $15\\%$. El volumen total da la primera ecuación.",
            "Let $x$ = gallons of the $25\\%$ solution and $y$ = gallons of the $15\\%$ one. The total volume gives the first equation.",
          ),
          L(
            "El balance de ácido puro: $0{.}25x + 0{.}15y = 0{.}18 \\times 200 = 36$ galones de ácido.",
            "The pure-acid balance: $0{.}25x + 0{.}15y = 0{.}18 \\times 200 = 36$ gallons of acid.",
          ),
          L(
            "De $x + y = 200$ sale $y = 200 - x$; sustituye y despeja $x$.",
            "From $x + y = 200$ you get $y = 200 - x$; substitute and solve for $x$.",
          ),
        ],
        answerDisplay: L(
          `$x = 60$ gal al $25\\%$ y $y = 140$ gal al $15\\%$.`,
          `$x = 60$ gal of the $25\\%$ solution and $y = 140$ gal of the $15\\%$ one.`,
        ),
        solution: [
          step(
            "given",
            "Soluciones al $25\\%$ y $15\\%$; mezcla final: $200$ gal al $18\\%$.",
            "$25\\%$ and $15\\%$ solutions; final mixture: $200$ gal at $18\\%$.",
          ),
          step(
            "approach",
            "Modelar con dos ecuaciones: una para el volumen total y otra para la cantidad de ácido puro (que se conserva en la mezcla).",
            "Model with two equations: one for total volume and one for the amount of pure acid (which is conserved in the mixture).",
          ),
          step(
            "calculation",
            `$\\begin{cases} x + y = 200 \\\\ 0{.}25x + 0{.}15y = 0{.}18 \\cdot 200 = 36 \\end{cases}$<br>De (1): $y = 200 - x$; en (2): $0{.}25x + 0{.}15(200 - x) = 36$<br>$0{.}25x + 30 - 0{.}15x = 36 \\Rightarrow 0{.}10x = 6 \\Rightarrow x = 60$<br>$y = 200 - 60 = 140$`,
            `$\\begin{cases} x + y = 200 \\\\ 0{.}25x + 0{.}15y = 0{.}18 \\cdot 200 = 36 \\end{cases}$<br>From (1): $y = 200 - x$; in (2): $0{.}25x + 0{.}15(200 - x) = 36$<br>$0{.}25x + 30 - 0{.}15x = 36 \\Rightarrow 0{.}10x = 6 \\Rightarrow x = 60$<br>$y = 200 - 60 = 140$`,
          ),
          step(
            "result",
            `Se necesitan $60$ galones al $25\\%$ y $140$ al $15\\%$. Comprobación: $0{.}25(60) + 0{.}15(140) = 15 + 21 = 36 = 0{.}18 \\times 200$ ✓. (El $18\\%$ está más cerca del $15\\%$, así que domina la solución débil: $140 > 60$.)`,
            `You need $60$ gallons of the $25\\%$ and $140$ of the $15\\%$. Check: $0{.}25(60) + 0{.}15(140) = 15 + 21 = 36 = 0{.}18 \\times 200$ ✓. ($18\\%$ is closer to $15\\%$, so the weak solution dominates: $140 > 60$.)`,
          ),
        ],
      };
    },
  ),

  /* ================================================================== */
  /* Curated — ESPOL Fundamentos, EDICIÓN DIGITAL (TUTOR_LICENSED).      */
  /* Chapter 2 «Ejercicios propuestos», §2.8, pp. 234-239 (PDF 267-272).*/
  /* Tutor's brief: the most difficult / integrative ones.              */
  /* Double-verified: printed key pp. 939 + sympy (41/41 checks).        */
  /* ================================================================== */

  /* 47 — jerez 10%/35% → 15%, 10 000 L → 8000 vino + 2000 brandy. Key: (a). */
  template(
    {
      id: "sys-espol-ch2-47",
      subject: "math",
      topicId: "systems",
      subtopicId: "applications",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["mixture", "percent", "application"],
      prerequisites: ["elimination"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 47",
        page: 234,
      },
      reasoning: "modeling",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$8000$ L de vino blanco y $2000$ L de brandy`, `$8000$ L of white wine and $2000$ L of brandy`), correct: true },
        { id: "b", text: L(`$9000$ L y $1000$ L`, `$9000$ L and $1000$ L`), correct: false },
        { id: "c", text: L(`$7000$ L y $3000$ L`, `$7000$ L and $3000$ L`), correct: false },
        { id: "d", text: L(`$6500$ L y $3500$ L`, `$6500$ L and $3500$ L`), correct: false },
        { id: "e", text: L(`$2000$ L de vino blanco y $8000$ L de brandy`, `$2000$ L of white wine and $8000$ L of brandy`), correct: false },
      ];
      return {
        skill: L("Mezcla con porcentajes: ecuación de volumen + ecuación de alcohol", "Mixture with percents: volume equation + alcohol equation"),
        statement: L(
          "Una compañía vinícola requiere producir $10\\,000$ litros de jerez, mezclando vino blanco con brandy; el vino blanco contiene $10\\%$ de alcohol, y el brandy contiene $35\\%$ de alcohol por volumen. El jerez debe tener un contenido de alcohol del $15\\%$. Entonces las cantidades en litros de vino blanco y de brandy que deben mezclarse para obtener el resultado deseado, es:",
          "A winery needs to produce $10,\\!000$ liters of sherry by blending white wine with brandy; the white wine contains $10\\%$ alcohol and the brandy $35\\%$ alcohol by volume. The sherry must have an alcohol content of $15\\%$. The amounts in liters of white wine and brandy to mix are:",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Dos incógnitas (vino $v$, brandy $b$) piden dos ecuaciones: una para el volumen total y otra para el alcohol puro.",
            "Two unknowns (wine $v$, brandy $b$) ask for two equations: one for total volume and one for pure alcohol.",
          ),
          L(
            "Volumen: $v + b = 10\\,000$. Alcohol: $0{,}10v + 0{,}35b = 0{,}15 \\cdot 10\\,000 = 1\\,500$.",
            "Volume: $v + b = 10,\\!000$. Alcohol: $0.10v + 0.35b = 0.15 \\cdot 10,\\!000 = 1,\\!500$.",
          ),
          L(
            "Sustituye $v = 10\\,000 - b$: $0{,}10(10\\,000 - b) + 0{,}35b = 1\\,500$ — queda una ecuación lineal en $b$.",
            "Substitute $v = 10,\\!000 - b$: $0.10(10,\\!000 - b) + 0.35b = 1,\\!500$ — a linear equation in $b$ remains.",
          ),
        ],
        answerDisplay: L(
          `$8000$ L de vino blanco y $2000$ L de brandy`,
          `$8000$ L of white wine and $2000$ L of brandy`,
        ),
        solution: [
          step(
            "given",
            "Volumen total $10\\,000$ L al $15\\%$; vino blanco al $10\\%$; brandy al $35\\%$.",
            "Total volume $10,\\!000$ L at $15\\%$; white wine at $10\\%$; brandy at $35\\%$.",
          ),
          step(
            "approach",
            "Mezclas: lo que se conserva es la cantidad de sustancia pura (alcohol), así que volumen y alcohol dan las dos ecuaciones.",
            "Mixtures: what is conserved is the amount of pure substance (alcohol), so volume and alcohol provide the two equations.",
          ),
          step(
            "calculation",
            `$\\begin{cases} v + b = 10\\,000 \\\\ 0{,}10v + 0{,}35b = 1\\,500 \\end{cases}$<br>De (1): $v = 10\\,000 - b$; en (2): $1\\,000 - 0{,}10b + 0{,}35b = 1\\,500$<br>$0{,}25b = 500 \\Rightarrow b = 2\\,000$; $v = 8\\,000$`,
            `$\\begin{cases} v + b = 10,\\!000 \\\\ 0.10v + 0.35b = 1,\\!500 \\end{cases}$<br>From (1): $v = 10,\\!000 - b$; in (2): $1,\\!000 - 0.10b + 0.35b = 1,\\!500$<br>$0.25b = 500 \\Rightarrow b = 2,\\!000$; $v = 8,\\!000$`,
          ),
          step(
            "result",
            `$8\\,000$ L de vino blanco y $2\\,000$ L de brandy (opción a). Comprobación: $0{,}10 \\cdot 8\\,000 + 0{,}35 \\cdot 2\\,000 = 800 + 700 = 1\\,500 = 0{,}15 \\cdot 10\\,000$ ✓ (el $15\\%$ está más cerca del $10\\%$: domina el vino).`,
            `8,000 L of white wine and 2,000 L of brandy (option a). Check: $0.10 \\cdot 8,\\!000 + 0.35 \\cdot 2,\\!000 = 800 + 700 = 1,\\!500 = 0.15 \\cdot 10,\\!000$ ✓ ($15\\%$ is closer to $10\\%$: wine dominates).`,
          ),
        ],
      };
    },
  ),

  /* 56 — marco del cuadro: L = 2A, marco 2 cm, +244 cm² → 19 × 38 cm. Key: 19,38. */
  template(
    {
      id: "sys-espol-ch2-56",
      subject: "math",
      topicId: "systems",
      subtopicId: "applications",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 270,
      tags: ["geometry", "area", "application"],
      prerequisites: ["elimination"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 56",
        page: 237,
      },
      reasoning: "modeling",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`ancho $19$ cm, largo $38$ cm`, `width $19$ cm, length $38$ cm`), correct: true },
        { id: "b", text: L(`ancho $18$ cm, largo $36$ cm`, `width $18$ cm, length $36$ cm`), correct: false },
        { id: "c", text: L(`ancho $20$ cm, largo $40$ cm`, `width $20$ cm, length $40$ cm`), correct: false },
        { id: "d", text: L(`ancho $22$ cm, largo $44$ cm`, `width $22$ cm, length $44$ cm`), correct: false },
        { id: "e", text: L(`ancho $17$ cm, largo $34$ cm`, `width $17$ cm, length $34$ cm`), correct: false },
      ];
      return {
        skill: L("Geometría: el marco agranda ambas dimensiones en 2·ancho del marco", "Geometry: the frame enlarges both dimensions by twice the frame width"),
        statement: L(
          "El largo de un cuadro es el doble del ancho. Si el marco del cuadro tiene $2$ cm de ancho y si el cuadro y su marco tienen una superficie $244\\ \\text{cm}^{2}$ mayor que la del cuadro, encontrar las dimensiones del cuadro (responde: ancho y largo).",
          "The length of a picture is twice its width. If the frame is $2$ cm wide and the picture plus its frame have an area $244\\ \\text{cm}^{2}$ larger than the picture alone, find the dimensions of the picture (answer: width and length).",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Con marco de $2$ cm a cada lado, las dimensiones exteriores crecen $4$ cm en total: $(L + 4)$ y $(A + 4)$.",
            "With a $2$ cm frame on each side, the outer dimensions grow by $4$ cm overall: $(L + 4)$ and $(W + 4)$.",
          ),
          L(
            "El área extra es $(L+4)(A+4) - LA = 244$. Desarrolla: queda $4L + 4A + 16 = 244$.",
            "The extra area is $(L+4)(W+4) - LW = 244$. Expand: it becomes $4L + 4W + 16 = 244$.",
          ),
          L(
            "Como $L = 2A$: $4(2A) + 4A = 228 \\Rightarrow 12A = 228$.",
            "Since $L = 2W$: $4(2W) + 4W = 228 \\Rightarrow 12W = 228$.",
          ),
        ],
        answerDisplay: L(`ancho $19$ cm, largo $38$ cm`, `width $19$ cm, length $38$ cm`),
        solution: [
          step(
            "given",
            "$L = 2A$; marco de $2$ cm; área del conjunto = área del cuadro $+ 244\\ \\text{cm}^{2}$.",
            "$L = 2W$; frame $2$ cm wide; combined area = picture area $+ 244\\ \\text{cm}^{2}$.",
          ),
          step(
            "approach",
            "Traducir el exceso de área sin expandir el producto: la diferencia $(L+4)(A+4) - LA$ elimina el término cuadrático y deja una ecuación lineal.",
            "Translate the area excess without expanding the whole product: the difference $(L+4)(W+4) - LW$ kills the quadratic term and leaves a linear equation.",
          ),
          step(
            "calculation",
            `$(L + 4)(A + 4) - LA = 244$<br>$LA + 4L + 4A + 16 - LA = 244 \\Rightarrow 4L + 4A = 228 \\Rightarrow L + A = 57$<br>Con $L = 2A$: $3A = 57 \\Rightarrow A = 19$, $L = 38$`,
            `$(L + 4)(W + 4) - LW = 244$<br>$LW + 4L + 4W + 16 - LW = 244 \\Rightarrow 4L + 4W = 228 \\Rightarrow L + W = 57$<br>With $L = 2W$: $3W = 57 \\Rightarrow W = 19$, $L = 38$`,
          ),
          step(
            "result",
            `El cuadro mide $19 \\times 38$ cm (clave del libro: 19, 38 ✓). Comprobación: exterior $23 \\times 42 = 966$; cuadro $19 \\times 38 = 722$; diferencia $966 - 722 = 244$ ✓.`,
            `The picture is $19 \\times 38$ cm (book key: 19, 38 ✓). Check: outer $23 \\times 42 = 966$; picture $19 \\times 38 = 722$; difference $966 - 722 = 244$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 58 — piscina 15/20/30 h juntas → 20/3 h. Key: 20/3 h. */
  template(
    {
      id: "sys-espol-ch2-58",
      subject: "math",
      topicId: "systems",
      subtopicId: "applications",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 180,
      tags: ["work-rate", "application"],
      prerequisites: ["fractions"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 58",
        page: 237,
      },
      reasoning: "modeling",
    },
    () => ({
      skill: L("Razones de trabajo: sumar caudales, no tiempos", "Work rates: add flows, not times"),
      statement: L(
        "Una piscina puede ser llenada por tres cañerías en forma independiente. La primera cañería llena la piscina en 15 h; la segunda en 20 h y la última en 30 h. ¿En qué tiempo llenarían la piscina las tres cañerías juntas? Responde en horas (fracción exacta tipo 20/3 o dos decimales).",
        "A pool can be filled by three pipes independently. The first pipe fills the pool in 15 h; the second in 20 h and the last in 30 h. In what time would the three pipes fill the pool together? Answer in hours (exact fraction like 20/3, or two decimals).",
      ),
      answer: { kind: "numeric", value: 20 / 3 },
      hints: [
        L(
          "No promedies tiempos: las razones (fracción de piscina por hora) sí se suman.",
          "Do not average times: the rates (fraction of pool per hour) do add up.",
          ),
        L(
          "Razones: $\\frac{1}{15} + \\frac{1}{20} + \\frac{1}{30}$; usa denominador común $60$.",
          "Rates: $\\frac{1}{15} + \\frac{1}{20} + \\frac{1}{30}$; use common denominator $60$.",
        ),
        L(
          "La razón conjunta es $\\frac{9}{60} = \\frac{3}{20}$; el tiempo es su recíproco.",
          "The joint rate is $\\frac{9}{60} = \\frac{3}{20}$; the time is its reciprocal.",
        ),
      ],
      answerDisplay: L(
        `$\\dfrac{20}{3}\\ \\text{h} \\approx 6{,}67\\ \\text{h}$ (6 h 40 min)`,
        `$\\dfrac{20}{3}\\ \\text{h} \\approx 6.67\\ \\text{h}$ (6 h 40 min)`,
      ),
      solution: [
        step(
          "given",
          "Cañerías independientes: 15 h, 20 h, 30 h para una piscina completa.",
          "Independent pipes: 15 h, 20 h, 30 h for a full pool.",
        ),
        step(
          "approach",
          "Sumar razones de llenado (piscinas/hora); el tiempo conjunto es el recíproco de la razón total.",
          "Add filling rates (pools/hour); the joint time is the reciprocal of the total rate.",
        ),
        step(
          "calculation",
          `$\\frac{1}{15} + \\frac{1}{20} + \\frac{1}{30} = \\frac{4}{60} + \\frac{3}{60} + \\frac{2}{60} = \\frac{9}{60} = \\frac{3}{20}$<br>$T = \\dfrac{1}{\\frac{3}{20}} = \\dfrac{20}{3} \\approx 6{,}67$ h`,
          `$\\frac{1}{15} + \\frac{1}{20} + \\frac{1}{30} = \\frac{4}{60} + \\frac{3}{60} + \\frac{2}{60} = \\frac{9}{60} = \\frac{3}{20}$<br>$T = \\dfrac{1}{\\frac{3}{20}} = \\dfrac{20}{3} \\approx 6.67$ h`,
        ),
        step(
          "result",
          `$\\frac{20}{3}$ h = 6 h 40 min (clave del libro: $\\frac{20}{3}$ h ✓). Comprobación: en $20/3$ h la primera llena $\\frac{20}{3} \\cdot \\frac{1}{15} = \\frac{4}{9}$, la segunda $\\frac{1}{3}$ y la tercera $\\frac{2}{9}$; total $\\frac{4}{9} + \\frac{3}{9} + \\frac{2}{9} = 1$ piscina ✓.`,
          `$\\frac{20}{3}$ h = 6 h 40 min (book key: $\\frac{20}{3}$ h ✓). Check: in $20/3$ h the first fills $\\frac{4}{9}$, the second $\\frac{1}{3}$ and the third $\\frac{2}{9}$; total $\\frac{4}{9} + \\frac{3}{9} + \\frac{2}{9} = 1$ pool ✓.`,
        ),
      ],
    }),
  ),

  /* 60 — alambre 100 in, dos cuadrados, Σ áreas 397 in² → 76 y 24. Key: idem. */
  template(
    {
      id: "sys-espol-ch2-60",
      subject: "math",
      topicId: "systems",
      subtopicId: "applications",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["geometry", "quadratic", "application"],
      prerequisites: ["quadratic-formula"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 60",
        page: 237,
      },
      reasoning: "modeling",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$76$ y $24$ pulgadas`, `$76$ and $24$ inches`), correct: true },
        { id: "b", text: L(`$64$ y $36$ pulgadas`, `$64$ and $36$ inches`), correct: false },
        { id: "c", text: L(`$52$ y $48$ pulgadas`, `$52$ and $48$ inches`), correct: false },
        { id: "d", text: L(`$78$ y $22$ pulgadas`, `$78$ and $22$ inches`), correct: false },
        { id: "e", text: L(`$70$ y $30$ pulgadas`, `$70$ and $30$ inches`), correct: false },
      ];
      return {
        skill: L("Un corte, dos cuadrados: el perímetro se reparte, las áreas no", "One cut, two squares: the perimeter splits, the areas do not"),
        statement: L(
          "Un trozo de alambre de $100$ pulgadas de largo se corta en dos, y cada pedazo se dobla para que tome la forma de un cuadrado. Si la suma de las áreas formadas es de $397\\ \\text{pulg}^{2}$, encontrar la longitud de cada pedazo de alambre.",
          "A piece of wire $100$ inches long is cut in two, and each piece is bent into a square. If the sum of the areas formed is $397\\ \\text{in}^{2}$, find the length of each piece of wire.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Si un pedazo mide $p$, el cuadrado tiene lado $p/4$ y área $(p/4)^{2}$; el otro pedazo mide $100 - p$.",
            "If a piece has length $p$, its square has side $p/4$ and area $(p/4)^{2}$; the other piece measures $100 - p$.",
          ),
          L(
            "La condición es $\\left(\\frac{p}{4}\\right)^{2} + \\left(\\frac{100 - p}{4}\\right)^{2} = 397$; multiplica por $16$.",
            "The condition is $\\left(\\frac{p}{4}\\right)^{2} + \\left(\\frac{100 - p}{4}\\right)^{2} = 397$; multiply by $16$.",
          ),
          L(
            "Queda $p^{2} + (100 - p)^{2} = 6352$, una cuadrática con dos raíces que se completan entre sí (¿cuánto suman?).",
            "You get $p^{2} + (100 - p)^{2} = 6352$, a quadratic whose two roots complete each other (what do they add up to?).",
          ),
        ],
        answerDisplay: L(`$76$ pulgadas y $24$ pulgadas`, `76 inches and 24 inches`),
        solution: [
          step(
            "given",
            "Alambre de $100$ in cortado en dos; cada pieza forma un cuadrado; $\\Sigma$ áreas $= 397\\ \\text{in}^{2}$.",
            "A $100$ in wire cut in two; each piece forms a square; $\\Sigma$ areas $= 397\\ \\text{in}^{2}$.",
          ),
          step(
            "approach",
            "Una sola incógnita $p$ (la otra pieza es $100 - p$); el área del cuadrado usa el lado $p/4$. Sale una cuadrática simétrica: sus raíces son los dos pedazos.",
            "A single unknown $p$ (the other piece is $100 - p$); the square's area uses side $p/4$. A symmetric quadratic comes out: its roots are the two pieces.",
          ),
          step(
            "calculation",
            `$\\frac{p^{2}}{16} + \\frac{(100 - p)^{2}}{16} = 397 \\Rightarrow p^{2} + (100 - p)^{2} = 6352$<br>$p^{2} + 10\\,000 - 200p + p^{2} = 6352 \\Rightarrow 2p^{2} - 200p + 3648 = 0$<br>$p^{2} - 100p + 1824 = 0 \\Rightarrow p = \\dfrac{100 \\pm \\sqrt{10\\,000 - 7296}}{2} = \\dfrac{100 \\pm 52}{2}$<br>$p = 76$ o $p = 24$ (los dos pedazos).`,
            `$\\frac{p^{2}}{16} + \\frac{(100 - p)^{2}}{16} = 397 \\Rightarrow p^{2} + (100 - p)^{2} = 6352$<br>$p^{2} + 10,\\!000 - 200p + p^{2} = 6352 \\Rightarrow 2p^{2} - 200p + 3648 = 0$<br>$p^{2} - 100p + 1824 = 0 \\Rightarrow p = \\dfrac{100 \\pm \\sqrt{10,\\!000 - 7296}}{2} = \\dfrac{100 \\pm 52}{2}$<br>$p = 76$ or $p = 24$ (the two pieces).`,
          ),
          step(
            "result",
            `Los pedazos miden $76$ in y $24$ in (clave del libro: 76 y 24 ✓). Comprobación: cuadrados de lado $19$ y $6$: $19^{2} + 6^{2} = 361 + 36 = 397$ ✓.`,
            `The pieces are $76$ in and $24$ in (book key: 76 and 24 ✓). Check: squares of side $19$ and $6$: $19^{2} + 6^{2} = 361 + 36 = 397$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 61 — alquiler con vacantes → $200. Key: (c). */
  template(
    {
      id: "sys-espol-ch2-61",
      subject: "math",
      topicId: "systems",
      subtopicId: "applications",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["business", "revenue", "application"],
      prerequisites: ["elimination"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 61",
        page: 237,
      },
      reasoning: "modeling",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\$160$`, `$\\$160$`), correct: false },
        { id: "b", text: L(`$\\$180$`, `$\\$180$`), correct: false },
        { id: "c", text: L(`$\\$200$`, `$\\$200$`), correct: true },
        { id: "d", text: L(`$\\$220$`, `$\\$220$`), correct: false },
        { id: "e", text: L(`$\\$240$`, `$\\$240$`), correct: false },
      ];
      return {
        skill: L("Ingresos iguales con vacantes: modelar (120+5n)(40−n)", "Same revenue with vacancies: model (120+5n)(40−n)"),
        statement: L(
          "Bienes raíces «Chóez» construyó una unidad habitacional con $40$ departamentos. Se conoce que si se fija un alquiler mensual de $\\$120$ por departamento, todos serán ocupados, pero por cada $\\$5$ de incremento en el alquiler uno quedará vacante. El alquiler en dólares que deberá fijarse, con el objeto de obtener los mismos ingresos (que si se alquilaran a $120$ cada departamento), dejando algunos vacíos para mantenimiento, es:",
          "Real-estate firm “Chóez” built a unit with $40$ apartments. It is known that at a monthly rent of $\\$120$ per apartment all are occupied, but for each $\\$5$ increase one apartment becomes vacant. The rent in dollars that should be set to obtain the same income (as renting all of them at $120$), leaving some vacant for maintenance, is:",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Ingreso base: $40 \\cdot 120 = 4800$ dólares. Ese es el número que hay que reproducir.",
            "Base income: $40 \\cdot 120 = 4800$ dollars. That is the number to reproduce.",
          ),
          L(
            "Con $n$ vacantes: alquiler $120 + 5n$, ocupados $40 - n$. El ingreso es $(120 + 5n)(40 - n)$.",
            "With $n$ vacancies: rent $120 + 5n$, occupied $40 - n$. Income is $(120 + 5n)(40 - n)$.",
          ),
          L(
            "Iguala a $4800$ y expande: el término independiente se cancela y queda $n(16 - n) = 0$.",
            "Set it equal to $4800$ and expand: the constant term cancels leaving $n(16 - n) = 0$.",
          ),
        ],
        answerDisplay: L(`$\\$200$ (con 24 ocupados)`, `$\\$200$ (with 24 occupied)`),
        solution: [
          step(
            "given",
            `40 departamentos; alquiler base $\\$120$; cada $\\$5$ de aumento deja 1 vacante; ingreso objetivo: el mismo que con todos ocupados.`,
            `40 apartments; base rent $\\$120$; each $\\$5$ increase leaves 1 vacant; target income: same as fully occupied.`,
          ),
          step(
            "approach",
            "Modelar con una variable (número de vacantes $n$); el requisito «mismos ingresos» fija la ecuación cuadrática.",
            "Model with one variable (number of vacancies $n$); the “same income” requirement fixes the quadratic.",
          ),
          step(
            "calculation",
            `Ingreso base: $40 \\cdot 120 = 4800$.<br>Con $n$ vacantes: $(120 + 5n)(40 - n) = 4800$<br>$4800 + 200n - 5n^{2} - 120n = 4800 \\Rightarrow 80n - 5n^{2} = 0 \\Rightarrow n(16 - n) = 0$<br>$n = 0$ (todos ocupados, se descarta) o $n = 16$.<br>Alquiler: $120 + 5 \\cdot 16 = 200$, con $40 - 16 = 24$ ocupados.`,
            `Base income: $40 \\cdot 120 = 4800$.<br>With $n$ vacancies: $(120 + 5n)(40 - n) = 4800$<br>$4800 + 200n - 5n^{2} - 120n = 4800 \\Rightarrow 80n - 5n^{2} = 0 \\Rightarrow n(16 - n) = 0$<br>$n = 0$ (all occupied, discarded) or $n = 16$.<br>Rent: $120 + 5 \\cdot 16 = 200$, with $40 - 16 = 24$ occupied.`,
          ),
          step(
            "result",
            `Alquiler $\\$200$ con 24 departamentos ocupados (opción c; clave del libro: (c) ✓). Comprobación: $200 \\cdot 24 = 4800 = 120 \\cdot 40$ ✓.`,
            `Rent $\\$200$ with 24 occupied apartments (option c; book key: (c) ✓). Check: $200 \\cdot 24 = 4800 = 120 \\cdot 40$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 62 — 60 habitaciones, ingreso $11 475 → $225 ó $255. Key: idem. */
  template(
    {
      id: "sys-espol-ch2-62",
      subject: "math",
      topicId: "systems",
      subtopicId: "applications",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["business", "revenue", "two-answers"],
      prerequisites: ["quadratic-formula"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 62",
        page: 238,
      },
      reasoning: "modeling",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\$225$ ó $\\$255$`, `$\\$225$ or $\\$255$`), correct: true },
        { id: "b", text: L(`solo $\\$225$`, `only $\\$225$`), correct: false },
        { id: "c", text: L(`solo $\\$255$`, `only $\\$255$`), correct: false },
        { id: "d", text: L(`$\\$200$ ó $\\$240$`, `$\\$200$ or $\\$240$`), correct: false },
        { id: "e", text: L(`$\\$235$`, `$\\$235$`), correct: false },
      ];
      return {
        skill: L("Ingreso objetivo: dos alquileres lo logran (cuadrática con 2 raíces)", "Target income: two rents achieve it (quadratic with 2 roots)"),
        statement: L(
          "J. Cárdenas es propietario de un edificio de apartamentos que tiene $60$ habitaciones; él puede alquilar todas las habitaciones si fija un alquiler de $180$ al mes. Al subir el alquiler, algunas habitaciones quedarán vacías, en promedio, por cada incremento de $\\$5$, una habitación quedará vacía, sin posibilidad alguna de alquilarse. Encuentre el alquiler que debería cobrar con el fin de obtener un ingreso total de $\\$11\\,475$.",
          "J. Cárdenas owns an apartment building with $60$ rooms; he can rent all the rooms at $180$ a month. As the rent rises, some rooms stay vacant — on average, for each $\\$5$ increase one room becomes vacant, with no chance of being rented. Find the rent he should charge to obtain a total income of $\\$11,\\!475$.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Con $n$ incrementos de $\\$5$: alquiler $180 + 5n$, habitaciones ocupadas $60 - n$.",
            "With $n$ increases of $\\$5$: rent $180 + 5n$, occupied rooms $60 - n$.",
          ),
          L(
            "Plantea $(180 + 5n)(60 - n) = 11\\,475$ y expande.",
            "Set up $(180 + 5n)(60 - n) = 11,\\!475$ and expand.",
          ),
          L(
            "Queda $n^{2} - 24n + 135 = 0$; tiene DOS raíces enteras — ambas son válidas.",
            "You get $n^{2} - 24n + 135 = 0$; it has TWO integer roots — both are valid.",
          ),
        ],
        answerDisplay: L(
          `$\\$225$ (51 habitaciones) ó $\\$255$ (45 habitaciones)`,
          `$\\$225$ (51 rooms) or $\\$255$ (45 rooms)`,
        ),
        solution: [
          step(
            "given",
            `60 habitaciones; base $\\$180$; cada $\\$5$ más → 1 vacante; ingreso requerido $\\$11\\,475$.`,
            `60 rooms; base $\\$180$; each extra $\\$5$ → 1 vacancy; required income $\\$11,\\!475$.`,
          ),
          step(
            "approach",
            "Modelar con $n$ (aumentos de $\\$5$); la parabola de ingresos cruza el nivel objetivo dos veces: aquí hay DOS respuestas.",
            "Model with $n$ (number of $\\$5$ increases); the income parabola crosses the target level twice: there are TWO answers here.",
          ),
          step(
            "calculation",
            `$(180 + 5n)(60 - n) = 11\\,475$<br>$10\\,800 + 300n - 180n - 5n^{2} = 11\\,475 \\Rightarrow -5n^{2} + 120n - 675 = 0$<br>$n^{2} - 24n + 135 = 0 \\Rightarrow n = \\dfrac{24 \\pm \\sqrt{576 - 540}}{2} = \\dfrac{24 \\pm 6}{2}$<br>$n = 9$ o $n = 15$. Alquileres: $180 + 45 = 225$ (51 hab.) y $180 + 75 = 255$ (45 hab.).`,
            `$(180 + 5n)(60 - n) = 11,\\!475$<br>$10,\\!800 + 300n - 180n - 5n^{2} = 11,\\!475 \\Rightarrow -5n^{2} + 120n - 675 = 0$<br>$n^{2} - 24n + 135 = 0 \\Rightarrow n = \\dfrac{24 \\pm \\sqrt{576 - 540}}{2} = \\dfrac{24 \\pm 6}{2}$<br>$n = 9$ or $n = 15$. Rents: $180 + 45 = 225$ (51 rooms) and $180 + 75 = 255$ (45 rooms).`,
          ),
          step(
            "result",
            `Alquiler $\\$225$ con 51 habitaciones ó $\\$255$ con 45 (clave del libro: 225 ó 255 ✓). Comprobación: $225 \\cdot 51 = 11\\,475$ ✓ y $255 \\cdot 45 = 11\\,475$ ✓.`,
            `Rent $\\$225$ with 51 rooms or $\\$255$ with 45 (book key: 225 or 255 ✓). Check: $225 \\cdot 51 = 11,\\!475$ ✓ and $255 \\cdot 45 = 11,\\!475$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 63 — capital $100, segunda tasa doble → 4% y 8%. Key: 4 y 8. */
  template(
    {
      id: "sys-espol-ch2-63",
      subject: "math",
      topicId: "systems",
      subtopicId: "applications",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 270,
      tags: ["finance", "compound", "application"],
      prerequisites: ["quadratic-formula"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 63",
        page: 238,
      },
      reasoning: "modeling",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$4\\%$ y $8\\%$`, `$4\\%$ and $8\\%$`), correct: true },
        { id: "b", text: L(`$5\\%$ y $10\\%$`, `$5\\%$ and $10\\%$`), correct: false },
        { id: "c", text: L(`$3\\%$ y $6\\%$`, `$3\\%$ and $6\\%$`), correct: false },
        { id: "d", text: L(`$4\\%$ y $6\\%$`, `$4\\%$ and $6\\%$`), correct: false },
        { id: "e", text: L(`$6\\%$ y $12\\%$`, `$6\\%$ and $12\\%$`), correct: false },
      ];
      return {
        skill: L("Interés compuesto en cadena: 100(1+r)(1+2r) = 112.32", "Chained interest: 100(1+r)(1+2r) = 112.32"),
        statement: L(
          "Un capital de $\\$100$ se invierte a cierto interés a un año; luego, con el interés ganado, se invierte en el segundo año a un interés igual al doble de la primera tasa de interés. Si la suma total obtenida es $\\$112{,}32$, ¿cuáles son las dos tasas de interés? (El modelo verificado — que reproduce la clave del libro — reinvierte el capital con su interés a la tasa doble).",
          "A capital of $\\$100$ is invested for one year at some rate; then, with the earned interest, it is invested the second year at a rate equal to twice the first rate. If the total obtained is $\\$112.32$, what are the two interest rates? (The verified model — which reproduces the book's key — reinvests the capital plus its interest at the double rate.)",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Si la primera tasa es $r$ (en decimales), tras un año el capital vale $100(1 + r)$.",
            "If the first rate is $r$ (in decimals), after one year the capital is worth $100(1 + r)$.",
          ),
          L(
            "El segundo año corre a la tasa doble $2r$: el monto final es $100(1 + r)(1 + 2r) = 112{,}32$.",
            "The second year runs at the double rate $2r$: the final amount is $100(1 + r)(1 + 2r) = 112.32$.",
          ),
          L(
            "Divide entre $100$: $(1 + r)(1 + 2r) = 1{,}1232$; expande y resuelve la cuadrática (una raíz es negativa).",
            "Divide by $100$: $(1 + r)(1 + 2r) = 1.1232$; expand and solve the quadratic (one root is negative).",
          ),
        ],
        answerDisplay: L(`primera tasa $4\\%$, segunda tasa $8\\%$`, `first rate $4\\%$, second rate $8\\%$`),
        solution: [
          step(
            "given",
            `Capital $\\$100$; año 1 a tasa $r$; año 2 a tasa $2r$; monto final $\\$112{,}32$.`,
            `Capital $\\$100$; year 1 at rate $r$; year 2 at rate $2r$; final amount $\\$112.32$.`,
          ),
          step(
            "approach",
            "El modelo verificado (consistente con la clave del libro «4 y 8»): el capital con su interés se reinvierte a la tasa doble — composición sobre el total, $100(1+r)(1+2r)$.",
            "The verified model (consistent with the book's key “4 and 8”): the capital plus its interest is reinvested at the double rate — compounding on the total, $100(1+r)(1+2r)$.",
          ),
          step(
            "calculation",
            `$100(1 + r)(1 + 2r) = 112{,}32 \\Rightarrow (1 + r)(1 + 2r) = 1{,}1232$<br>$1 + 3r + 2r^{2} = 1{,}1232 \\Rightarrow 2r^{2} + 3r - 0{,}1232 = 0$<br>$\\Delta = 9 + 0{,}9856 = 9{,}9856$; $r = \\dfrac{-3 + 3{,}16}{4} = 0{,}04$ (la otra raíz es negativa).<br>Tasas: $r = 4\\%$ y $2r = 8\\%$.`,
            `$100(1 + r)(1 + 2r) = 112.32 \\Rightarrow (1 + r)(1 + 2r) = 1.1232$<br>$1 + 3r + 2r^{2} = 1.1232 \\Rightarrow 2r^{2} + 3r - 0.1232 = 0$<br>$\\Delta = 9 + 0.9856 = 9.9856$; $r = \\dfrac{-3 + 3.16}{4} = 0.04$ (the other root is negative).<br>Rates: $r = 4\\%$ and $2r = 8\\%$.`,
          ),
          step(
            "result",
            `Las tasas son $4\\%$ y $8\\%$ (clave del libro: 4 y 8 ✓). Comprobación: $100 \\cdot 1{,}04 \\cdot 1{,}08 = 104 \\cdot 1{,}08 = 112{,}32$ ✓.`,
            `The rates are $4\\%$ and $8\\%$ (book key: 4 and 8 ✓). Check: $100 \\cdot 1.04 \\cdot 1.08 = 112.32$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 64c — p = 600−5x, costos 8000+75x, utilidad $5500 → x = 60 ó 45. Key: c) 60 ó 45. */
  template(
    {
      id: "sys-espol-ch2-64c",
      subject: "math",
      topicId: "systems",
      subtopicId: "applications",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 330,
      tags: ["business", "profit", "revenue", "application"],
      prerequisites: ["quadratic-formula"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 64c",
        page: 238,
      },
      reasoning: "modeling",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$60$ ó $45$ unidades`, `$60$ or $45$ units`), correct: true },
        { id: "b", text: L(`$60$ ó $50$ unidades`, `$60$ or $50$ units`), correct: false },
        { id: "c", text: L(`solo $60$ unidades`, `only $60$ units`), correct: false },
        { id: "d", text: L(`$70$ ó $50$ unidades`, `$70$ or $50$ units`), correct: false },
        { id: "e", text: L(`$55$ ó $40$ unidades`, `$55$ or $40$ units`), correct: false },
      ];
      return {
        skill: L("Ingreso − costo = utilidad: dos volúmenes la alcanzan", "Revenue − cost = profit: two volumes reach it"),
        statement: L(
          "Cada semana, una compañía puede vender $x$ unidades de su producto a un precio de $p$ dólares cada uno, donde $p = 600 - 5x$. Producir $x$ unidades cuesta $(8000 + 75x)$ dólares. ¿Cuántas unidades debería producir y vender cada semana para lograr utilidades semanales de $5\\,500$? (Utilidad = ingresos − costos; ingresa $p \\cdot x$.) Las partes a, b y d del ejercicio original se desarrollan en la solución.",
          "Each week a company can sell $x$ units of its product at a price of $p$ dollars each, where $p = 600 - 5x$. Producing $x$ units costs $(8000 + 75x)$ dollars. How many units should it produce and sell each week to achieve weekly profits of $5,\\!500$? (Profit = revenue − cost, revenue $= p \\cdot x$.) Parts a, b and d of the original exercise are developed in the solution.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Ingresos: $I = x \\cdot p = x(600 - 5x)$. Costos: $C = 8000 + 75x$.",
            "Revenue: $R = x \\cdot p = x(600 - 5x)$. Costs: $C = 8000 + 75x$.",
          ),
          L(
            "Utilidad: $U = I - C = x(600 - 5x) - (8000 + 75x)$; iguala a $5500$.",
            "Profit: $P = R - C = x(600 - 5x) - (8000 + 75x)$; set it equal to $5500$.",
          ),
          L(
            "Queda $-5x^{2} + 525x - 13\\,500 = 0$, o bien $x^{2} - 105x + 2700 = 0$: dos raíces enteras.",
            "You get $-5x^{2} + 525x - 13,\\!500 = 0$, i.e. $x^{2} - 105x + 2700 = 0$: two integer roots.",
          ),
        ],
        answerDisplay: L(`$x = 60$ ó $x = 45$ unidades`, `$x = 60$ or $x = 45$ units`),
        solution: [
          step(
            "given",
            "Modelo semanal: $p = 600 - 5x$; costo $= 8000 + 75x$; objetivo: utilidad $\\$5\\,500$.",
            "Weekly model: $p = 600 - 5x$; cost $= 8000 + 75x$; target: profit $\\$5,\\!500$.",
          ),
          step(
            "approach",
            "Armar ingreso, costo y utilidad; la utilidad es una parabola que cruza el nivel objetivo dos veces (dos volúmenes).",
            "Build revenue, cost and profit; the profit is a parabola crossing the target level twice (two volumes).",
          ),
          step(
            "calculation",
            `Utilidad: $x(600 - 5x) - (8000 + 75x) = 5500$<br>$-5x^{2} + 600x - 75x - 8000 = 5500 \\Rightarrow -5x^{2} + 525x - 13\\,500 = 0$<br>$x^{2} - 105x + 2700 = 0 \\Rightarrow x = \\dfrac{105 \\pm \\sqrt{11\\,025 - 10\\,800}}{2} = \\dfrac{105 \\pm 15}{2}$<br>$x = 60$ o $x = 45$.`,
            `Profit: $x(600 - 5x) - (8000 + 75x) = 5500$<br>$-5x^{2} + 600x - 75x - 8000 = 5500 \\Rightarrow -5x^{2} + 525x - 13,\\!500 = 0$<br>$x^{2} - 105x + 2700 = 0 \\Rightarrow x = \\dfrac{105 \\pm \\sqrt{11,\\!025 - 10,\\!800}}{2} = \\dfrac{105 \\pm 15}{2}$<br>$x = 60$ or $x = 45$.`,
          ),
          step(
            "result",
            `Con utilidad $\\$5\\,500$: $x = 60$ ó $x = 45$ unidades (clave del libro, parte c: 60 ó 45 ✓). Las demás partes del original: a) ingresos $\\$17\\,500$ → $x = 70$ ó $50$; b) ingresos $\\$18\\,000$ → $x = 60$, precio $p = 300$; d) utilidad $\\$5\\,750$ → $x = 55$ ó $50$, precios $\\$350$ ó $\\$325$. Comprobación de c) con $x = 60$: ingresos $60 \\cdot 300 = 18\\,000$, costos $8000 + 4500 = 12\\,500$, utilidad $5500$ ✓.`,
            `For profit $\\$5,\\!500$: $x = 60$ or $x = 45$ units (book key, part c: 60 or 45 ✓). The other parts of the original: a) revenue $\\$17,\\!500$ → $x = 70$ or $50$; b) revenue $\\$18,\\!000$ → $x = 60$, price $p = 300$; d) profit $\\$5,\\!750$ → $x = 55$ or $50$, prices $\\$350$ or $\\$325$. Check of c) at $x = 60$: revenue $60 \\cdot 300 = 18,\\!000$, cost $8000 + 4500 = 12,\\!500$, profit $5500$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 68 — Yolanda 8h, Pablo 10h, Carlos 12h, relevos → 4.72 h. Key: 4 18/25 h. */
  template(
    {
      id: "sys-espol-ch2-68",
      subject: "math",
      topicId: "systems",
      subtopicId: "applications",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 330,
      tags: ["work-rate", "staggered", "application"],
      prerequisites: ["fractions"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 68",
        page: 238,
      },
      reasoning: "modeling",
    },
    () => ({
      skill: L("Relevos de trabajo: dos etapas con distinto equipo", "Work relays: two stages with different teams"),
      statement: L(
        "Yolanda puede hacer cierto trabajo en 8 horas, Pablo en 10 horas y Carlos en 12 horas. ¿Cuánto tiempo tomará efectuar el trabajo si Yolanda y Pablo se ponen a trabajar durante una hora e inmediatamente después Yolanda y Carlos lo terminan? Responde en horas (exacto tipo 118/25 o dos decimales).",
        "Yolanda can do a certain job in 8 hours, Pablo in 10 hours and Carlos in 12 hours. How long will the job take if Yolanda and Pablo work for one hour and immediately afterwards Yolanda and Carlos finish it? Answer in hours (exact like 118/25, or two decimals).",
      ),
      answer: { kind: "numeric", value: 4.72 },
      hints: [
        L(
          "Razones individuales: $Y = \\frac{1}{8}$, $P = \\frac{1}{10}$, $C = \\frac{1}{12}$ (trabajos por hora).",
          "Individual rates: $Y = \\frac{1}{8}$, $P = \\frac{1}{10}$, $C = \\frac{1}{12}$ (jobs per hour).",
        ),
        L(
          "Etapa 1 (1 h, Yolanda+Pablo): avanzan $\\frac{1}{8} + \\frac{1}{10} = \\frac{9}{40}$. ¿Cuánto queda?",
          "Stage 1 (1 h, Yolanda+Pablo): they advance $\\frac{1}{8} + \\frac{1}{10} = \\frac{9}{40}$. How much is left?",
        ),
        L(
          "Etapa 2: el resto $\\frac{31}{40}$ a la razón $\\frac{1}{8} + \\frac{1}{12} = \\frac{5}{24}$; el tiempo de la etapa es $\\frac{31/40}{5/24}$, y el total es 1 h + eso.",
          "Stage 2: the remaining $\\frac{31}{40}$ at rate $\\frac{1}{8} + \\frac{1}{12} = \\frac{5}{24}$; the stage time is $\\frac{31/40}{5/24}$, and the total is 1 h + that.",
        ),
      ],
      answerDisplay: L(
        `$4{,}72\\ \\text{h} \\left(= \\dfrac{118}{25}\\ \\text{h}\\right)$`,
        `$4.72\\ \\text{h} \\left(= \\dfrac{118}{25}\\ \\text{h}\\right)$`,
      ),
      solution: [
        step(
          "given",
          "Yolanda 8 h, Pablo 10 h, Carlos 12 h (trabajos completos). Etapa 1: Yolanda+Pablo 1 h; etapa 2: Yolanda+Carlos terminan.",
          "Yolanda 8 h, Pablo 10 h, Carlos 12 h (full jobs). Stage 1: Yolanda+Pablo for 1 h; stage 2: Yolanda+Carlos finish.",
        ),
        step(
          "approach",
          "Trabajo por etapas: en cada etapa la razón del equipo es la suma de las razones de sus miembros; el tiempo total es la suma de las etapas.",
          "Staged work: in each stage the team's rate is the sum of its members' rates; the total time is the sum of the stages.",
        ),
        step(
          "calculation",
          `Etapa 1 (1 h): $\\frac{1}{8} + \\frac{1}{10} = \\frac{5}{40} + \\frac{4}{40} = \\frac{9}{40}$ hecho; queda $\\frac{31}{40}$.<br>Etapa 2: razón $\\frac{1}{8} + \\frac{1}{12} = \\frac{3}{24} + \\frac{2}{24} = \\frac{5}{24}$<br>Tiempo etapa 2: $\\dfrac{31/40}{5/24} = \\dfrac{31 \\cdot 24}{40 \\cdot 5} = \\dfrac{744}{200} = 3{,}72$ h<br>Total: $1 + 3{,}72 = 4{,}72$ h $= \\dfrac{118}{25}$ h.`,
          `Stage 1 (1 h): $\\frac{1}{8} + \\frac{1}{10} = \\frac{9}{40}$ done; $\\frac{31}{40}$ left.<br>Stage 2: rate $\\frac{1}{8} + \\frac{1}{12} = \\frac{5}{24}$<br>Stage-2 time: $\\dfrac{31/40}{5/24} = \\dfrac{31 \\cdot 24}{40 \\cdot 5} = 3.72$ h<br>Total: $1 + 3.72 = 4.72$ h $= \\dfrac{118}{25}$ h.`,
        ),
        step(
          "result",
          `El trabajo toma $4{,}72$ h (clave del libro: $4\\frac{18}{25}$ h $= 4{,}72$ ✓). Comprobación: etapa 1 hace $9/40$; etapa 2 en $3{,}72$ h hace $\\frac{5}{24} \\cdot 3{,}72 = 0{,}775 = \\frac{31}{40}$; total $\\frac{9}{40} + \\frac{31}{40} = 1$ trabajo ✓.`,
          `The job takes $4.72$ h (book key: $4\\frac{18}{25}$ h $= 4.72$ ✓). Check: stage 1 does $9/40$; stage 2 in $3.72$ h does $\\frac{5}{24} \\cdot 3.72 = 0.775 = \\frac{31}{40}$; total $\\frac{9}{40} + \\frac{31}{40} = 1$ job ✓.`,
        ),
      ],
    }),
  ),

  /* 70 — radiador 10 L al 20% → 50%: vaciar 3.75 L. Key: 3 3/4 L. */
  template(
    {
      id: "sys-espol-ch2-70",
      subject: "math",
      topicId: "systems",
      subtopicId: "applications",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 270,
      tags: ["mixture", "drain-and-replace", "application"],
      prerequisites: ["fractions"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 70",
        page: 239,
      },
      reasoning: "modeling",
    },
    () => ({
      skill: L("Vaciar y reponer: la mezcla que queda conserva su concentración", "Drain and replace: the remaining mixture keeps its concentration"),
      statement: L(
        "El radiador de un automóvil contiene $10$ litros de una mezcla de agua y $20\\%$ de anticorrosivo. ¿Qué cantidad de esta mezcla debe vaciarse y reemplazarse por anticorrosivo puro para obtener una mezcla del $50\\%$ en el radiador? Responde en litros (exacto tipo 15/4 o dos decimales).",
        "A car radiator holds $10$ liters of a water mixture with $20\\%$ antifreeze. How much of this mixture must be drained and replaced with pure antifreeze to obtain a $50\\%$ mixture in the radiator? Answer in liters (exact like 15/4, or two decimals).",
      ),
      answer: { kind: "numeric", value: 3.75 },
      hints: [
        L(
          "Si vacías $x$ litros, quedan $(10 - x)$ litros de mezcla al $20\\%$: dentro hay $0{,}2(10 - x)$ litros de anticorrosivo.",
          "If you drain $x$ liters, $(10 - x)$ liters of $20\\%$ mixture remain: it contains $0.2(10 - x)$ liters of antifreeze.",
          ),
        L(
          "Al reponer con $x$ litros puros, el anticorrosivo total es $0{,}2(10 - x) + x$ y el volumen vuelve a $10$ L.",
          "Refilling with $x$ pure liters, total antifreeze becomes $0.2(10 - x) + x$ while the volume returns to $10$ L.",
        ),
        L(
          "La condición es $0{,}2(10 - x) + x = 0{,}5 \\cdot 10 = 5$: ecuación lineal en $x$.",
          "The condition is $0.2(10 - x) + x = 0.5 \\cdot 10 = 5$: a linear equation in $x$.",
        ),
      ],
      answerDisplay: L(
        `$3\\frac{3}{4} = 3{,}75$ litros`,
        `$3\\frac{3}{4} = 3.75$ liters`,
      ),
      solution: [
        step(
          "given",
          "Radiador: $10$ L de mezcla al $20\\%$; objetivo: $50\\%$; mecanismo: vaciar $x$ L de mezcla y reponer con anticorrosivo puro.",
          "Radiator: $10$ L of $20\\%$ mixture; target: $50\\%$; mechanism: drain $x$ L of mixture and refill with pure antifreeze.",
        ),
        step(
          "approach",
          "Seguir el anticorrosivo puro: lo que queda tras vaciar sigue al $20\\%$; lo repuesto entra al $100\\%$; el total debe ser la mitad del volumen.",
          "Track the pure antifreeze: what remains after draining is still at $20\\%$; the refill enters at $100\\%$; the total must be half the volume.",
        ),
        step(
          "calculation",
          `Tras vaciar: mezcla $(10 - x)$ L al $20\\%$ → anticorrosivo $0{,}2(10 - x) = 2 - 0{,}2x$ L.<br>Reponiendo $x$ L puros: total $2 - 0{,}2x + x = 2 + 0{,}8x$ L.<br>Condición: $2 + 0{,}8x = 5 \\Rightarrow 0{,}8x = 3 \\Rightarrow x = 3{,}75$.`,
          `After draining: $(10 - x)$ L at $20\\%$ → antifreeze $0.2(10 - x) = 2 - 0.2x$ L.<br>Refilling $x$ pure liters: total $2 - 0.2x + x = 2 + 0.8x$ L.<br>Condition: $2 + 0.8x = 5 \\Rightarrow 0.8x = 3 \\Rightarrow x = 3.75$.`,
        ),
        step(
          "result",
          `Hay que vaciar y reponer $3\\frac{3}{4} = 3{,}75$ L (clave del libro: $3\\frac{3}{4}$ litros ✓). Comprobación: quedan $6{,}25$ L de mezcla con $1{,}25$ L de anticorrosivo; al añadir $3{,}75$ L puros: $1{,}25 + 3{,}75 = 5$ L de anticorrosivo en $10$ L $= 50\\%$ ✓.`,
          `Drain and replace $3\\frac{3}{4} = 3.75$ L (book key: $3\\frac{3}{4}$ liters ✓). Check: $6.25$ L of mixture remain holding $1.25$ L of antifreeze; adding $3.75$ pure liters: $1.25 + 3.75 = 5$ L of antifreeze in $10$ L $= 50\\%$ ✓.`,
        ),
      ],
    }),
  ),

  /* ---------------------------------------------------------------- */
  /* Cap. 5 §5.3 «Sistemas de ecuaciones lineales» (ed. digital),      */
  /* pp. 546-549 — ítems 47-62. Tutor: «prosigue con matrices y        */
  /* sistemas». Clave impresa (pp. 941-942) + sympy:                    */
  /* download/verify_espol_ch5.py.                                      */
  /* (sys-espol-ch5-63 — ítem 5 · 63 — descartado: clave defectuosa.)   */
  /* ---------------------------------------------------------------- */

  /* 5 · 47 a+b — det = 0; consistente sólo para k = 1 (clave b). */
  template(
    {
      id: "sys-espol-ch5-47ab",
      subject: "math",
      topicId: "systems",
      subtopicId: "parameters",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["parameters", "consistency", "determinant"],
      prerequisites: ["elimination", "gauss"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 47 a+b",
        page: 546,
      },
      reasoning: "parameters",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "El determinante de la matriz de coeficientes es $0$ y el sistema es consistente sólo para $k = 1$",
            "The determinant of the coefficient matrix is $0$ and the system is consistent only for $k = 1$",
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            "El determinante de la matriz de coeficientes es $0$ y el sistema es consistente para todo valor de $k$",
            "The determinant of the coefficient matrix is $0$ and the system is consistent for every value of $k$",
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            "El determinante de la matriz de coeficientes es distinto de $0$, así que el sistema tiene solución única",
            "The determinant of the coefficient matrix is nonzero, so the system has a unique solution",
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            "El sistema es inconsistente para todo valor de $k$",
            "The system is inconsistent for every value of $k$",
          ),
          correct: false,
        },
      ];
      return {
        skill: L("Rangos y consistencia con un parámetro", "Ranks and consistency with a parameter"),
        statement: L(
          "Considere el sistema $$\\begin{cases} x + 2y + z = k \\\\ 2x + y + 4z = 6 \\\\ x - 4y + 5z = 9 \\end{cases}$$ con $k$ constante real. ¿Cuál de las siguientes es verdadera?",
          "Consider the system $$\\begin{cases} x + 2y + z = k \\\\ 2x + y + 4z = 6 \\\\ x - 4y + 5z = 9 \\end{cases}$$ with $k$ a real constant. Which of the following is true?",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Empieza por el determinante de la matriz de coeficientes: si sale $0$, la regla de Cramer no aplica y hay que comparar rangos.",
            "Start with the determinant of the coefficient matrix: if it comes out $0$, Cramer's rule does not apply and you must compare ranks.",
          ),
          L(
            "Reduce la matriz ampliada con $F_2 - 2F_1$ y $F_3 - F_1$, y luego combina entre sí las dos filas nuevas.",
            "Row-reduce the augmented matrix with $F_2 - 2F_1$ and $F_3 - F_1$, then combine the two new rows with each other.",
          ),
          L(
            "La última fila queda $(0\\ 0\\ 0 \\mid 3k-3)$: ¿para qué $k$ desaparece la contradicción?",
            "The last row becomes $(0\\ 0\\ 0 \\mid 3k-3)$: for which $k$ does the contradiction disappear?",
          ),
        ],
        answerDisplay: L(
          "$\\det A = 0$; consistente sólo para $k = 1$",
          "$\\det A = 0$; consistent only for $k = 1$",
        ),
        solution: [
          step(
            "given",
            "El sistema $x + 2y + z = k$, $2x + y + 4z = 6$, $x - 4y + 5z = 9$ con $k \\in \\mathbb{R}$ (partes a y b del ejercicio 47).",
            "The system $x + 2y + z = k$, $2x + y + 4z = 6$, $x - 4y + 5z = 9$ with $k \\in \\mathbb{R}$ (parts a and b of exercise 47).",
          ),
          step(
            "approach",
            "Calculamos el determinante de la matriz de coeficientes; como resulta $0$, la consistencia se decide reduciendo la matriz ampliada y comparando los rangos.",
            "Compute the determinant of the coefficient matrix; since it turns out to be $0$, consistency is decided by row-reducing the augmented matrix and comparing ranks.",
          ),
          step(
            "calculation",
            `$\\det A = \\begin{vmatrix} 1 & 2 & 1 \\\\ 2 & 1 & 4 \\\\ 1 & -4 & 5 \\end{vmatrix} = 1(5+16) - 2(10-4) + 1(-8-1) = 21 - 12 - 9 = 0$<br>$F_2 - 2F_1:\\ (0,\\ -3,\\ 2 \\mid 6-2k)$; $F_3 - F_1:\\ (0,\\ -6,\\ 4 \\mid 9-k)$<br>$F_3' - 2F_2':\\ (0,\\ 0,\\ 0 \\mid (9-k)-2(6-2k)) = (0,\\ 0,\\ 0 \\mid 3k-3)$.`,
            `$\\det A = \\begin{vmatrix} 1 & 2 & 1 \\\\ 2 & 1 & 4 \\\\ 1 & -4 & 5 \\end{vmatrix} = 1(5+16) - 2(10-4) + 1(-8-1) = 21 - 12 - 9 = 0$<br>$F_2 - 2F_1:\\ (0,\\ -3,\\ 2 \\mid 6-2k)$; $F_3 - F_1:\\ (0,\\ -6,\\ 4 \\mid 9-k)$<br>$F_3' - 2F_2':\\ (0,\\ 0,\\ 0 \\mid (9-k)-2(6-2k)) = (0,\\ 0,\\ 0 \\mid 3k-3)$.`,
          ),
          step(
            "result",
            `El determinante es $0$ y el sistema es consistente sólo para $k = 1$ (clave del libro, parte b) ✓: con $k = 1$ la última fila queda $(0,\\ 0,\\ 0 \\mid 0)$ y sobran $2$ ecuaciones independientes para $3$ incógnitas (infinitas soluciones); con $k \\neq 1$ la última fila dice $0 = 3k-3$, falso. Comprobación con $k = 1$: $\\left(\\dfrac{11}{3},\\ -\\dfrac{4}{3},\\ 0\\right)$ cumple $\\dfrac{11}{3} - \\dfrac{8}{3} = 1$ ✓, $\\dfrac{22}{3} - \\dfrac{4}{3} = 6$ ✓ y $\\dfrac{11}{3} + \\dfrac{16}{3} = 9$ ✓.`,
            `The determinant is $0$ and the system is consistent only for $k = 1$ (book key, part b) ✓: with $k = 1$ the last row is $(0,\\ 0,\\ 0 \\mid 0)$ and $2$ independent equations remain for $3$ unknowns (infinitely many solutions); with $k \\neq 1$ the last row reads $0 = 3k-3$, false. Check with $k = 1$: $\\left(\\dfrac{11}{3},\\ -\\dfrac{4}{3},\\ 0\\right)$ satisfies $\\dfrac{11}{3} - \\dfrac{8}{3} = 1$ ✓, $\\dfrac{22}{3} - \\dfrac{4}{3} = 6$ ✓ and $\\dfrac{11}{3} + \\dfrac{16}{3} = 9$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 47c — para k = 1: ((11−7t)/3, (2t−4)/3, t), t ∈ ℝ (clave exacta). */
  template(
    {
      id: "sys-espol-ch5-47c",
      subject: "math",
      topicId: "systems",
      subtopicId: "parameters",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 360,
      tags: ["parameters", "general-solution", "free-variable"],
      prerequisites: ["elimination", "parameters"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 47c",
        page: 546,
      },
      reasoning: "parameters",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "$\\left(\\dfrac{11-7t}{3},\\ \\dfrac{2t-4}{3},\\ t\\right)$, $t \\in \\mathbb{R}$",
            "$\\left(\\dfrac{11-7t}{3},\\ \\dfrac{2t-4}{3},\\ t\\right)$, $t \\in \\mathbb{R}$",
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            "$\\left(\\dfrac{11+7t}{3},\\ \\dfrac{2t+4}{3},\\ t\\right)$, $t \\in \\mathbb{R}$",
            "$\\left(\\dfrac{11+7t}{3},\\ \\dfrac{2t+4}{3},\\ t\\right)$, $t \\in \\mathbb{R}$",
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            "$\\left(\\dfrac{7t-11}{3},\\ \\dfrac{4-2t}{3},\\ t\\right)$, $t \\in \\mathbb{R}$",
            "$\\left(\\dfrac{7t-11}{3},\\ \\dfrac{4-2t}{3},\\ t\\right)$, $t \\in \\mathbb{R}$",
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            "$\\left(\\dfrac{11-7t}{3},\\ \\dfrac{2t-4}{3},\\ 0\\right)$, $t \\in \\mathbb{R}$",
            "$\\left(\\dfrac{11-7t}{3},\\ \\dfrac{2t-4}{3},\\ 0\\right)$, $t \\in \\mathbb{R}$",
          ),
          correct: false,
        },
      ];
      return {
        skill: L("Solución general con una variable libre", "General solution with one free variable"),
        statement: L(
          "Para $k = 1$, la solución general del sistema $$\\begin{cases} x + 2y + z = 1 \\\\ 2x + y + 4z = 6 \\\\ x - 4y + 5z = 9 \\end{cases}$$ es:",
          "For $k = 1$, the general solution of the system $$\\begin{cases} x + 2y + z = 1 \\\\ 2x + y + 4z = 6 \\\\ x - 4y + 5z = 9 \\end{cases}$$ is:",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Con $k = 1$ el sistema es consistente con rango $2$ para $3$ incógnitas: hay una variable libre.",
            "With $k = 1$ the system is consistent with rank $2$ for $3$ unknowns: there is one free variable.",
          ),
          L(
            "Toma $z = t$; de $F_2 - 2F_1$ (es decir, $-3y + 2z = 4$) despeja $y$ en función de $t$.",
            "Take $z = t$; from $F_2 - 2F_1$ (that is, $-3y + 2z = 4$) solve for $y$ in terms of $t$.",
          ),
          L(
            "Luego $x = 1 - 2y - z$ desde la primera ecuación; comprueba tu familia con $t = 0$.",
            "Then $x = 1 - 2y - z$ from the first equation; test your family at $t = 0$.",
          ),
        ],
        answerDisplay: L(
          "$\\left(\\dfrac{11-7t}{3},\\ \\dfrac{2t-4}{3},\\ t\\right)$, $t \\in \\mathbb{R}$",
          "$\\left(\\dfrac{11-7t}{3},\\ \\dfrac{2t-4}{3},\\ t\\right)$, $t \\in \\mathbb{R}$",
        ),
        solution: [
          step(
            "given",
            "El sistema con $k = 1$: $x + 2y + z = 1$, $2x + y + 4z = 6$, $x - 4y + 5z = 9$; se pide su solución general.",
            "The system with $k = 1$: $x + 2y + z = 1$, $2x + y + 4z = 6$, $x - 4y + 5z = 9$; find its general solution.",
          ),
          step(
            "approach",
            "El rango de la matriz de coeficientes es $2$ (determinante $0$ con dos filas independientes), así que queda $3 - 2 = 1$ parámetro: fijamos $z = t$ y sustituimos hacia atrás.",
            "The rank of the coefficient matrix is $2$ (determinant $0$ with two independent rows), so $3 - 2 = 1$ parameter remains: fix $z = t$ and back-substitute.",
          ),
          step(
            "calculation",
            `$F_2 - 2F_1:\\ -3y + 2z = 4$; con $z = t$: $y = \\dfrac{2t-4}{3}$<br>$x = 1 - 2y - z = 1 - 2\\cdot\\dfrac{2t-4}{3} - t = \\dfrac{3 - 4t + 8 - 3t}{3} = \\dfrac{11-7t}{3}$<br>Solución general: $\\left(\\dfrac{11-7t}{3},\\ \\dfrac{2t-4}{3},\\ t\\right)$, $t \\in \\mathbb{R}$.`,
            `$F_2 - 2F_1:\\ -3y + 2z = 4$; with $z = t$: $y = \\dfrac{2t-4}{3}$<br>$x = 1 - 2y - z = 1 - 2\\cdot\\dfrac{2t-4}{3} - t = \\dfrac{3 - 4t + 8 - 3t}{3} = \\dfrac{11-7t}{3}$<br>General solution: $\\left(\\dfrac{11-7t}{3},\\ \\dfrac{2t-4}{3},\\ t\\right)$, $t \\in \\mathbb{R}$.`,
          ),
          step(
            "result",
            `La solución general es $\\left(\\dfrac{11-7t}{3},\\ \\dfrac{2t-4}{3},\\ t\\right)$ con $t \\in \\mathbb{R}$ (clave impresa exacta ✓). Comprobación con $t = 0$: $\\left(\\dfrac{11}{3},\\ -\\dfrac{4}{3},\\ 0\\right)$ da $\\dfrac{11}{3} - \\dfrac{8}{3} = 1$ ✓, $\\dfrac{22}{3} - \\dfrac{4}{3} = 6$ ✓, $\\dfrac{11}{3} + \\dfrac{16}{3} = 9$ ✓; y con $t = 3$: $\\left(-\\dfrac{10}{3},\\ \\dfrac{2}{3},\\ 3\\right)$ da $-\\dfrac{10}{3} + \\dfrac{4}{3} + 3 = 1$ ✓.`,
            `The general solution is $\\left(\\dfrac{11-7t}{3},\\ \\dfrac{2t-4}{3},\\ t\\right)$ with $t \\in \\mathbb{R}$ (exact printed key ✓). Check at $t = 0$: $\\left(\\dfrac{11}{3},\\ -\\dfrac{4}{3},\\ 0\\right)$ gives $\\dfrac{11}{3} - \\dfrac{8}{3} = 1$ ✓, $\\dfrac{22}{3} - \\dfrac{4}{3} = 6$ ✓, $\\dfrac{11}{3} + \\dfrac{16}{3} = 9$ ✓; and at $t = 3$: $\\left(-\\dfrac{10}{3},\\ \\dfrac{2}{3},\\ 3\\right)$ gives $-\\dfrac{10}{3} + \\dfrac{4}{3} + 3 = 1$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 50 — α = 2, β = 1, det = −1 ≠ 0 → solución única. Opción impresa
     «α = 1, β = 1» descartada para mantener 4 opciones. */
  template(
    {
      id: "sys-espol-ch5-50",
      subject: "math",
      topicId: "systems",
      subtopicId: "parameters",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 360,
      tags: ["parameters", "matrix-form", "determinant", "2x2"],
      prerequisites: ["elimination", "parameters"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 50",
        page: 547,
      },
      reasoning: "parameters",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "$\\alpha = 2$, $\\beta = 1$; sí tiene solución única porque $\\det = 1 - \\alpha\\beta = -1 \\neq 0$",
            "$\\alpha = 2$, $\\beta = 1$; yes, it has a unique solution because $\\det = 1 - \\alpha\\beta = -1 \\neq 0$",
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            "$\\alpha = 2$, $\\beta = 1$; no tiene solución única",
            "$\\alpha = 2$, $\\beta = 1$; it does not have a unique solution",
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            "$\\alpha = 1$, $\\beta = 2$; sí tiene solución única",
            "$\\alpha = 1$, $\\beta = 2$; yes, it has a unique solution",
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            "$\\alpha = 2$, $\\beta = 1$; sí tiene solución única porque $\\det = 1 - \\alpha\\beta = 1 \\neq 0$",
            "$\\alpha = 2$, $\\beta = 1$; yes, it has a unique solution because $\\det = 1 - \\alpha\\beta = 1 \\neq 0$",
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Puntos que cumplen ecuaciones sueltas de un sistema",
          "Points satisfying single equations of a system",
        ),
        statement: L(
          "El sistema $$\\begin{pmatrix} 1 & \\alpha \\\\ \\beta & 1 \\end{pmatrix}\\begin{pmatrix} x_1 \\\\ x_2 \\end{pmatrix} = \\begin{pmatrix} 1-\\beta \\\\ \\alpha \\end{pmatrix}$$ tiene a $P(2, -1)$ en la primera ecuación y a $Q(2, 0)$ en la segunda. Halle $\\alpha$ y $\\beta$, y decida si el sistema tiene solución única.",
          "The system $$\\begin{pmatrix} 1 & \\alpha \\\\ \\beta & 1 \\end{pmatrix}\\begin{pmatrix} x_1 \\\\ x_2 \\end{pmatrix} = \\begin{pmatrix} 1-\\beta \\\\ \\alpha \\end{pmatrix}$$ has $P(2, -1)$ in the first equation and $Q(2, 0)$ in the second. Find $\\alpha$ and $\\beta$, and decide whether the system has a unique solution.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Que $P$ esté en la primera ecuación significa sustituir $x_1 = 2$, $x_2 = -1$ sólo en esa ecuación.",
            "$P$ being in the first equation means substituting $x_1 = 2$, $x_2 = -1$ into that equation only.",
          ),
          L(
            "Escriba las dos condiciones: una viene de $P$ en la primera ecuación y otra de $Q$ en la segunda; juntas forman un sistema $2 \\times 2$ para $\\alpha$ y $\\beta$.",
            "Write the two conditions: one comes from $P$ in the first equation and one from $Q$ in the second; together they form a $2 \\times 2$ system for $\\alpha$ and $\\beta$.",
          ),
          L(
            "Resuelva para $\\alpha$ y $\\beta$, y luego calcule $\\det = 1 - \\alpha\\beta$ para decidir la unicidad.",
            "Solve for $\\alpha$ and $\\beta$, then compute $\\det = 1 - \\alpha\\beta$ to decide uniqueness.",
          ),
        ],
        answerDisplay: L(
          "$\\alpha = 2$, $\\beta = 1$; solución única ($\\det = -1 \\neq 0$)",
          "$\\alpha = 2$, $\\beta = 1$; unique solution ($\\det = -1 \\neq 0$)",
        ),
        solution: [
          step(
            "given",
            "Sistema matricial $2 \\times 2$ con parámetros $\\alpha$, $\\beta$; $P(2, -1)$ satisface la primera ecuación y $Q(2, 0)$ la segunda.",
            "A $2 \\times 2$ matrix system with parameters $\\alpha$, $\\beta$; $P(2, -1)$ satisfies the first equation and $Q(2, 0)$ the second.",
          ),
          step(
            "approach",
            "Traducimos cada punto en una condición al sustituir sus coordenadas en la ecuación correspondiente; eso da un sistema para $\\alpha$ y $\\beta$, y el determinante $1 - \\alpha\\beta$ decide la unicidad.",
            "Translate each point into a condition by substituting its coordinates into the corresponding equation; that gives a system for $\\alpha$ and $\\beta$, and the determinant $1 - \\alpha\\beta$ decides uniqueness.",
          ),
          step(
            "calculation",
            `Primera ecuación con $P$: $1\\cdot 2 + \\alpha\\cdot(-1) = 1 - \\beta \\Rightarrow 2 - \\alpha = 1 - \\beta \\Rightarrow \\alpha - \\beta = 1$<br>Segunda con $Q$: $\\beta\\cdot 2 + 1\\cdot 0 = \\alpha \\Rightarrow \\alpha = 2\\beta$<br>Sustituyendo: $2\\beta - \\beta = 1 \\Rightarrow \\beta = 1$, $\\alpha = 2$<br>$\\det = 1 - \\alpha\\beta = 1 - 2 = -1 \\neq 0$.`,
            `First equation with $P$: $1\\cdot 2 + \\alpha\\cdot(-1) = 1 - \\beta \\Rightarrow 2 - \\alpha = 1 - \\beta \\Rightarrow \\alpha - \\beta = 1$<br>Second with $Q$: $\\beta\\cdot 2 + 1\\cdot 0 = \\alpha \\Rightarrow \\alpha = 2\\beta$<br>Substituting: $2\\beta - \\beta = 1 \\Rightarrow \\beta = 1$, $\\alpha = 2$<br>$\\det = 1 - \\alpha\\beta = 1 - 2 = -1 \\neq 0$.`,
          ),
          step(
            "result",
            `$\\alpha = 2$, $\\beta = 1$, y el sistema tiene solución única porque $\\det = -1 \\neq 0$ (clave impresa exacta ✓). Comprobaciones: primera ecuación con $P$: $2 - 2 = 0 = 1 - 1$ ✓; segunda con $Q$: $2\\cdot 1 + 0 = 2 = \\alpha$ ✓. De hecho el sistema queda $x_1 + 2x_2 = 0$, $x_1 + x_2 = 2$, con solución única $(4, -2)$: $4 + 2(-2) = 0$ ✓ y $4 - 2 = 2$ ✓.`,
            `$\\alpha = 2$, $\\beta = 1$, and the system has a unique solution because $\\det = -1 \\neq 0$ (exact printed key ✓). Checks: first equation with $P$: $2 - 2 = 0 = 1 - 1$ ✓; second with $Q$: $2\\cdot 1 + 0 = 2 = \\alpha$ ✓. Indeed the system becomes $x_1 + 2x_2 = 0$, $x_1 + x_2 = 2$, with unique solution $(4, -2)$: $4 + 2(-2) = 0$ ✓ and $4 - 2 = 2$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 54 — clave e: det = 0 (y de hecho el sistema es inconsistente,
     pues 2(x−3z) = 2 ≠ 3). Opción impresa «infinitas soluciones»
     descartada para mantener 4 opciones. */
  template(
    {
      id: "sys-espol-ch5-54",
      subject: "math",
      topicId: "systems",
      subtopicId: "parameters",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["consistency", "determinant", "3x3", "true-statement"],
      prerequisites: ["elimination", "gauss"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 54",
        page: 548,
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L("El sistema es consistente", "The system is consistent"),
          correct: false,
        },
        {
          id: "b",
          text: L("El sistema tiene solución única", "The system has a unique solution"),
          correct: false,
        },
        {
          id: "c",
          text: L(
            "El determinante del sistema es igual a cero",
            "The determinant of the system is equal to zero",
          ),
          correct: true,
        },
        {
          id: "d",
          text: L(
            "No se puede evaluar el determinante del sistema",
            "The determinant of the system cannot be evaluated",
          ),
          correct: false,
        },
      ];
      return {
        skill: L("Determinante cero e inconsistencia", "Zero determinant and inconsistency"),
        statement: L(
          "Dado el sistema $$\\begin{cases} x - 3z = 1 \\\\ 2x - 6z = 3 \\\\ y + z = 2 \\end{cases}$$ entonces es verdad que:",
          "Given the system $$\\begin{cases} x - 3z = 1 \\\\ 2x - 6z = 3 \\\\ y + z = 2 \\end{cases}$$ it is true that:",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Compare la primera y la segunda ecuación: la segunda es casi el doble de la primera, pero mire también el lado derecho.",
            "Compare the first and second equations: the second is almost twice the first, but look at the right-hand side too.",
          ),
          L(
            "Si una fila de la matriz de coeficientes es múltiplo de otra, ¿cuánto vale el determinante?",
            "If one row of the coefficient matrix is a multiple of another, what is the determinant worth?",
          ),
          L(
            "Duplique la primera ecuación: queda $2x - 6z = 2$; ¿puede cumplirse a la vez con $2x - 6z = 3$?",
            "Double the first equation: it gives $2x - 6z = 2$; can it hold at the same time as $2x - 6z = 3$?",
          ),
        ],
        answerDisplay: L(
          "El determinante del sistema es igual a cero",
          "The determinant of the system is equal to zero",
        ),
        solution: [
          step(
            "given",
            "El sistema $x - 3z = 1$, $2x - 6z = 3$, $y + z = 2$; hay que señalar la afirmación verdadera.",
            "The system $x - 3z = 1$, $2x - 6z = 3$, $y + z = 2$; point out the true statement.",
          ),
          step(
            "approach",
            "Evaluamos el determinante de la matriz de coeficientes (conviene desarrollar por la segunda columna) y revisamos la proporcionalidad entre las dos primeras ecuaciones.",
            "Evaluate the determinant of the coefficient matrix (best expanded along the second column) and check the proportionality between the first two equations.",
          ),
          step(
            "calculation",
            `$\\det = \\begin{vmatrix} 1 & 0 & -3 \\\\ 2 & 0 & -6 \\\\ 0 & 1 & 1 \\end{vmatrix} = 1\\cdot(0\\cdot 1 - (-6)\\cdot 1) - 0 + (-3)\\cdot(2\\cdot 1 - 0\\cdot 0) = 6 - 6 = 0$<br>Además, $2 \\times (x - 3z) = 2 \\Rightarrow 2x - 6z = 2 \\neq 3$: las dos primeras ecuaciones se contradicen.`,
            `$\\det = \\begin{vmatrix} 1 & 0 & -3 \\\\ 2 & 0 & -6 \\\\ 0 & 1 & 1 \\end{vmatrix} = 1\\cdot(0\\cdot 1 - (-6)\\cdot 1) - 0 + (-3)\\cdot(2\\cdot 1 - 0\\cdot 0) = 6 - 6 = 0$<br>Also, $2 \\times (x - 3z) = 2 \\Rightarrow 2x - 6z = 2 \\neq 3$: the first two equations contradict each other.`,
          ),
          step(
            "result",
            `La afirmación verdadera es que el determinante del sistema es igual a cero (clave del libro, opción e) ✓: numéricamente $6 - 6 = 0$ ✓. Las demás caen: el sistema es inconsistente ($2 \\neq 3$), así que no es consistente ni tiene solución única, y el determinante sí puede evaluarse, como muestra el desarrollo anterior.`,
            `The true statement is that the determinant of the system equals zero (book key, option e) ✓: numerically $6 - 6 = 0$ ✓. The others fall: the system is inconsistent ($2 \\neq 3$), so it is neither consistent nor uniquely solvable, and the determinant can indeed be evaluated, as the expansion above shows.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 57 — clave c: solución única (x = 3m²n/2, y = mn/2). Opción
     impresa «el valor de x e y son iguales» descartada para mantener 4. */
  template(
    {
      id: "sys-espol-ch5-57",
      subject: "math",
      topicId: "systems",
      subtopicId: "parameters",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 270,
      tags: ["parameters", "unique-solution", "literal-coefficients", "2x2"],
      prerequisites: ["elimination", "parameters"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 57",
        page: 548,
      },
      reasoning: "parameters",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L("El sistema no tiene solución", "The system has no solution"),
          correct: false,
        },
        {
          id: "b",
          text: L(
            "El sistema tiene infinitas soluciones",
            "The system has infinitely many solutions",
          ),
          correct: false,
        },
        {
          id: "c",
          text: L("El sistema tiene solución única", "The system has a unique solution"),
          correct: true,
        },
        {
          id: "d",
          text: L("Sólo tiene solución trivial", "It only has the trivial solution"),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Sistema 2×2 literal con parámetros m y n",
          "Literal 2×2 system with parameters m and n",
        ),
        statement: L(
          "Dado el sistema $\\dfrac{x}{m} + y = 2mn$; $x - my = m^{2}n$, con $m, n \\in \\mathbb{R}$ y $m \\neq 0$, entonces es verdad que:",
          "Given the system $\\dfrac{x}{m} + y = 2mn$; $x - my = m^{2}n$, with $m, n \\in \\mathbb{R}$ and $m \\neq 0$, it is true that:",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Como $m \\neq 0$, puede multiplicar la primera ecuación por $m$ para eliminar el denominador.",
            "Since $m \\neq 0$, you may multiply the first equation by $m$ to clear the denominator.",
          ),
          L(
            "Queda $x + my = 2m^{2}n$ junto a $x - my = m^{2}n$: una ecuación trae $+my$ y la otra $-my$.",
            "You get $x + my = 2m^{2}n$ next to $x - my = m^{2}n$: one equation carries $+my$ and the other $-my$.",
          ),
          L(
            "Sumar y restar las dos ecuaciones despeja $x$ y $y$; ¿se anulan a la vez los dos lados de alguna ecuación?",
            "Adding and subtracting the two equations solves for $x$ and $y$; do both sides of any equation vanish simultaneously?",
          ),
        ],
        answerDisplay: L(
          "El sistema tiene solución única",
          "The system has a unique solution",
        ),
        solution: [
          step(
            "given",
            "El sistema $\\dfrac{x}{m} + y = 2mn$, $x - my = m^{2}n$ con $m, n \\in \\mathbb{R}$, $m \\neq 0$.",
            "The system $\\dfrac{x}{m} + y = 2mn$, $x - my = m^{2}n$ with $m, n \\in \\mathbb{R}$, $m \\neq 0$.",
          ),
          step(
            "approach",
            "Multiplicamos la primera ecuación por $m$ y eliminamos por suma y resta; la unicidad se confirma con el determinante $\\begin{vmatrix} 1/m & 1 \\\\ 1 & -m \\end{vmatrix}$.",
            "Multiply the first equation by $m$ and eliminate by sum and difference; uniqueness is confirmed with the determinant $\\begin{vmatrix} 1/m & 1 \\\\ 1 & -m \\end{vmatrix}$.",
          ),
          step(
            "calculation",
            `$\\times m:\\ x + my = 2m^{2}n$<br>Suma: $2x = 3m^{2}n \\Rightarrow x = \\dfrac{3m^{2}n}{2}$<br>Resta: $2my = m^{2}n \\Rightarrow y = \\dfrac{mn}{2}$<br>$\\det = \\dfrac{1}{m}(-m) - 1\\cdot 1 = -2 \\neq 0$ para todo $m \\neq 0$.`,
            `$\\times m:\\ x + my = 2m^{2}n$<br>Sum: $2x = 3m^{2}n \\Rightarrow x = \\dfrac{3m^{2}n}{2}$<br>Difference: $2my = m^{2}n \\Rightarrow y = \\dfrac{mn}{2}$<br>$\\det = \\dfrac{1}{m}(-m) - 1\\cdot 1 = -2 \\neq 0$ for every $m \\neq 0$.`,
          ),
          step(
            "result",
            `El sistema tiene solución única (clave del libro, opción c) ✓: $\\left(\\dfrac{3m^{2}n}{2},\\ \\dfrac{mn}{2}\\right)$, y como $\\det = -2 \\neq 0$ no hay dependencia ni inconsistencia. Comprobación: $\\dfrac{x}{m} + y = \\dfrac{3mn}{2} + \\dfrac{mn}{2} = 2mn$ ✓ y $x - my = \\dfrac{3m^{2}n}{2} - \\dfrac{m^{2}n}{2} = m^{2}n$ ✓.`,
            `The system has a unique solution (book key, option c) ✓: $\\left(\\dfrac{3m^{2}n}{2},\\ \\dfrac{mn}{2}\\right)$, and since $\\det = -2 \\neq 0$ there is neither dependency nor inconsistency. Check: $\\dfrac{x}{m} + y = \\dfrac{3mn}{2} + \\dfrac{mn}{2} = 2mn$ ✓ and $x - my = \\dfrac{3m^{2}n}{2} - \\dfrac{m^{2}n}{2} = m^{2}n$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 58 — inconsistente exactamente para α ∈ {1, −2} (clave exacta). */
  template(
    {
      id: "sys-espol-ch5-58",
      subject: "math",
      topicId: "systems",
      subtopicId: "parameters",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 360,
      tags: ["parameters", "inconsistency", "determinant", "3x3"],
      prerequisites: ["gauss", "parameters"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 58",
        page: 548,
      },
      reasoning: "parameters",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L("$\\alpha \\in \\{1,\\ -2\\}$", "$\\alpha \\in \\{1,\\ -2\\}$"),
          correct: true,
        },
        {
          id: "b",
          text: L("$\\alpha = 1$ solamente", "$\\alpha = 1$ only"),
          correct: false,
        },
        {
          id: "c",
          text: L("$\\alpha = -2$ solamente", "$\\alpha = -2$ only"),
          correct: false,
        },
        {
          id: "d",
          text: L("$\\alpha \\in \\{-1,\\ 2\\}$", "$\\alpha \\in \\{-1,\\ 2\\}$"),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Valores del parámetro que rompen la consistencia",
          "Parameter values that break consistency",
        ),
        statement: L(
          "Encuentre el valor (o los valores) del parámetro $\\alpha$ que hace inconsistente el sistema $$\\begin{pmatrix} 0 & -2 & \\alpha \\\\ 1 & -\\alpha & 1 \\\\ 1 & 1 & 0 \\end{pmatrix}\\begin{pmatrix} x \\\\ y \\\\ z \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix}.$$",
          "Find the value (or values) of the parameter $\\alpha$ that makes the system $$\\begin{pmatrix} 0 & -2 & \\alpha \\\\ 1 & -\\alpha & 1 \\\\ 1 & 1 & 0 \\end{pmatrix}\\begin{pmatrix} x \\\\ y \\\\ z \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix}$$ inconsistent.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Un sistema cuadrado sólo puede volverse inconsistente cuando el determinante se anula: calcule $\\det(\\alpha)$.",
            "A square system can only become inconsistent when the determinant vanishes: compute $\\det(\\alpha)$.",
          ),
          L(
            "El determinante queda $-2 + \\alpha + \\alpha^{2}$: factorícelo para hallar los candidatos.",
            "The determinant comes out as $-2 + \\alpha + \\alpha^{2}$: factor it to find the candidates.",
          ),
          L(
            "Para cada raíz, reduzca la matriz ampliada y busque una fila $(0\\ 0\\ 0 \\mid c)$ con $c \\neq 0$: hay que revisar las dos raíces.",
            "For each root, row-reduce the augmented matrix and look for a row $(0\\ 0\\ 0 \\mid c)$ with $c \\neq 0$: both roots must be checked.",
          ),
        ],
        answerDisplay: L(
          "El sistema es inconsistente para $\\alpha \\in \\{1,\\ -2\\}$",
          "The system is inconsistent for $\\alpha \\in \\{1,\\ -2\\}$",
        ),
        solution: [
          step(
            "given",
            "Sistema $3 \\times 3$ con parámetro $\\alpha$ en la matriz de coeficientes y lado derecho $(1, 2, 3)$.",
            "A $3 \\times 3$ system with parameter $\\alpha$ in the coefficient matrix and right-hand side $(1, 2, 3)$.",
          ),
          step(
            "approach",
            "Primero el determinante en función de $\\alpha$ para hallar candidatos; como $\\det = 0$ es necesario pero no suficiente para la inconsistencia, cada raíz se verifica reduciendo la matriz ampliada.",
            "First the determinant as a function of $\\alpha$ to find candidates; since $\\det = 0$ is necessary but not sufficient for inconsistency, each root is verified by row-reducing the augmented matrix.",
          ),
          step(
            "calculation",
            `$\\det = 0\\cdot(-\\alpha\\cdot 0 - 1\\cdot 1) - (-2)\\cdot(1\\cdot 0 - 1\\cdot 1) + \\alpha\\cdot(1\\cdot 1 - (-\\alpha)\\cdot 1) = -2 + \\alpha + \\alpha^{2} = (\\alpha - 1)(\\alpha + 2)$<br>$\\alpha = 1$: $F_3 - F_2 = (0,\\ 2,\\ -1 \\mid 1)$ y $F_1 = (0,\\ -2,\\ 1 \\mid 1)$; al sumarlas queda $(0,\\ 0,\\ 0 \\mid 2)$, es decir $0 = 2$<br>$\\alpha = -2$: $F_3 - F_2 = (0,\\ -1,\\ -1 \\mid 1)$; entonces $F_1 - 2(F_3 - F_2) = (0,\\ 0,\\ 0 \\mid -1)$, es decir $0 = -1$.`,
            `$\\det = 0\\cdot(-\\alpha\\cdot 0 - 1\\cdot 1) - (-2)\\cdot(1\\cdot 0 - 1\\cdot 1) + \\alpha\\cdot(1\\cdot 1 - (-\\alpha)\\cdot 1) = -2 + \\alpha + \\alpha^{2} = (\\alpha - 1)(\\alpha + 2)$<br>$\\alpha = 1$: $F_3 - F_2 = (0,\\ 2,\\ -1 \\mid 1)$ and $F_1 = (0,\\ -2,\\ 1 \\mid 1)$; adding them leaves $(0,\\ 0,\\ 0 \\mid 2)$, that is $0 = 2$<br>$\\alpha = -2$: $F_3 - F_2 = (0,\\ -1,\\ -1 \\mid 1)$; then $F_1 - 2(F_3 - F_2) = (0,\\ 0,\\ 0 \\mid -1)$, that is $0 = -1$.`,
          ),
          step(
            "result",
            `El sistema es inconsistente exactamente para $\\alpha \\in \\{1,\\ -2\\}$ (clave impresa exacta ✓). Comprobaciones numéricas: con $\\alpha = 1$ la reducción exige $0 = 2$, absurdo ✓; con $\\alpha = -2$ exige $0 = -1$, absurdo ✓; para cualquier otro valor, por ejemplo $\\alpha = 0$, $\\det = -2 \\neq 0$ y hay solución única.`,
            `The system is inconsistent exactly for $\\alpha \\in \\{1,\\ -2\\}$ (exact printed key ✓). Numerical checks: with $\\alpha = 1$ the reduction demands $0 = 2$, absurd ✓; with $\\alpha = -2$ it demands $0 = -1$, absurd ✓; for any other value, for instance $\\alpha = 0$, $\\det = -2 \\neq 0$ and a unique solution exists.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 62 — ERRATUM de la clave impresa (p. 942): dice a = ±7/2, pero con
     a = 7/2 el determinante vale −35/2 ≠ 0 (existe solución única). Valor
     verificado con sympy: a = ±√14/2. Precedentes de errata: #82, #48d, G17. */
  template(
    {
      id: "sys-espol-ch5-62",
      subject: "math",
      topicId: "systems",
      subtopicId: "parameters",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 360,
      tags: ["parameters", "inconsistency", "erratum", "3x3"],
      prerequisites: ["gauss", "parameters"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 62",
        page: 549,
      },
      reasoning: "parameters",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L("$a = \\pm\\dfrac{\\sqrt{14}}{2}$", "$a = \\pm\\dfrac{\\sqrt{14}}{2}$"),
          correct: true,
        },
        {
          id: "b",
          text: L("$a = \\pm\\dfrac{7}{2}$", "$a = \\pm\\dfrac{7}{2}$"),
          correct: false,
        },
        {
          id: "c",
          text: L("$a = \\pm\\sqrt{7}$", "$a = \\pm\\sqrt{7}$"),
          correct: false,
        },
        {
          id: "d",
          text: L(
            "$a = \\pm\\dfrac{\\sqrt{14}}{4}$",
            "$a = \\pm\\dfrac{\\sqrt{14}}{4}$",
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Sin solución: coeficiente nulo con lado derecho no nulo",
          "No solution: zero coefficient with nonzero right-hand side",
        ),
        statement: L(
          "Encuentre el valor de $a$ para que el sistema $$\\begin{cases} x + 3y + 2z = 5 \\\\ x + y + z = 2 \\\\ 2x + 3y + (a^{2}-1)z = a + 1 \\end{cases}$$ NO tenga solución.",
          "Find the value of $a$ so that the system $$\\begin{cases} x + 3y + 2z = 5 \\\\ x + y + z = 2 \\\\ 2x + 3y + (a^{2}-1)z = a + 1 \\end{cases}$$ has NO solution.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Elimine $x$: con $F_1 - F_2$ y $F_3 - 2F_2$ quedan dos ecuaciones sólo en $y$ y $z$ (con $a$).",
            "Eliminate $x$: with $F_1 - F_2$ and $F_3 - 2F_2$ two equations in $y$ and $z$ alone remain (carrying $a$).",
          ),
          L(
            "Elimine también $y$ y llegue a una sola ecuación de la forma $z(2a^{2} - 7) = 2a - 9$.",
            "Eliminate $y$ too and arrive at a single equation of the form $z(2a^{2} - 7) = 2a - 9$.",
          ),
          L(
            "Para que NO haya solución se necesita $2a^{2} - 7 = 0$ con $2a - 9 \\neq 0$; simplifique $\\sqrt{7/2}$ racionalizando.",
            "For NO solution you need $2a^{2} - 7 = 0$ with $2a - 9 \\neq 0$; simplify $\\sqrt{7/2}$ by rationalizing.",
          ),
        ],
        answerDisplay: L(
          "$a = \\pm\\dfrac{\\sqrt{14}}{2}$",
          "$a = \\pm\\dfrac{\\sqrt{14}}{2}$",
        ),
        solution: [
          step(
            "given",
            "Sistema $3 \\times 3$ donde $a$ aparece en la matriz de coeficientes y en el lado derecho; se pide que NO tenga solución.",
            "A $3 \\times 3$ system where $a$ appears both in the coefficient matrix and in the right-hand side; it must have NO solution.",
          ),
          step(
            "approach",
            "Reducimos hasta una sola ecuación en $z$: el sistema es inconsistente precisamente cuando el coeficiente de $z$ se anula pero el lado derecho no.",
            "Reduce to a single equation in $z$: the system is inconsistent exactly when the coefficient of $z$ vanishes while the right-hand side does not.",
          ),
          step(
            "calculation",
            `$F_1 - F_2:\\ 2y + z = 3$<br>$F_3 - 2F_2:\\ y + (a^{2}-3)z = a - 3$<br>Duplicando la segunda y restando la primera: $z(2a^{2} - 6 - 1) = 2a - 6 - 3 \\Rightarrow z(2a^{2} - 7) = 2a - 9$<br>Sin solución $\\iff 2a^{2} - 7 = 0 \\wedge 2a \\neq 9 \\Rightarrow a = \\pm\\sqrt{\\dfrac{7}{2}} = \\pm\\dfrac{\\sqrt{14}}{2}$, y $2a = \\pm\\sqrt{14} \\approx \\pm 3{,}74 \\neq 9$.`,
            `$F_1 - F_2:\\ 2y + z = 3$<br>$F_3 - 2F_2:\\ y + (a^{2}-3)z = a - 3$<br>Doubling the second and subtracting the first: $z(2a^{2} - 6 - 1) = 2a - 6 - 3 \\Rightarrow z(2a^{2} - 7) = 2a - 9$<br>No solution $\\iff 2a^{2} - 7 = 0 \\wedge 2a \\neq 9 \\Rightarrow a = \\pm\\sqrt{\\dfrac{7}{2}} = \\pm\\dfrac{\\sqrt{14}}{2}$, and $2a = \\pm\\sqrt{14} \\approx \\pm 3.74 \\neq 9$.`,
          ),
          step(
            "result",
            `$a = \\pm\\dfrac{\\sqrt{14}}{2}$. Comprobación: con $a = \\dfrac{\\sqrt{14}}{2}$, $2a^{2} = 7$ y la última ecuación queda $z \\cdot 0 = \\sqrt{14} - 9 \\approx -5{,}26 \\neq 0$ → inconsistente ✓; lo mismo con $a = -\\dfrac{\\sqrt{14}}{2}$ ($2a - 9 = -\\sqrt{14} - 9 \\neq 0$) ✓. ERRATUM: la clave impresa (p. 942) indica $a = \\pm\\dfrac{7}{2}$, pero con $a = \\dfrac{7}{2}$ queda $2a^{2} - 7 = \\dfrac{35}{2} \\neq 0$ (el determinante $7 - 2a^{2} = -\\dfrac{35}{2} \\neq 0$), así que el sistema tendría solución única y NO quedaría sin solución; se envía el valor verificado $\\pm\\dfrac{\\sqrt{14}}{2}$ con la errata documentada (precedentes #82, #48d, G17).`,
            `$a = \\pm\\dfrac{\\sqrt{14}}{2}$. Check: with $a = \\dfrac{\\sqrt{14}}{2}$, $2a^{2} = 7$ and the last equation reads $z \\cdot 0 = \\sqrt{14} - 9 \\approx -5.26 \\neq 0$ → inconsistent ✓; likewise with $a = -\\dfrac{\\sqrt{14}}{2}$ ($2a - 9 = -\\sqrt{14} - 9 \\neq 0$) ✓. ERRATUM: the printed key (p. 942) states $a = \\pm\\dfrac{7}{2}$, but with $a = \\dfrac{7}{2}$ one gets $2a^{2} - 7 = \\dfrac{35}{2} \\neq 0$ (the determinant $7 - 2a^{2} = -\\dfrac{35}{2} \\neq 0$), so the system would have a unique solution and would NOT be left without one; the verified value $\\pm\\dfrac{\\sqrt{14}}{2}$ ships with the errata documented (precedents #82, #48d, G17).`,
          ),
        ],
      };
    },
  ),

  /* 5 · 61a — Gauss-Jordan 4×4 → (1, 2, 3, 4) (clave exacta). */
  template(
    {
      id: "sys-espol-ch5-61a",
      subject: "math",
      topicId: "systems",
      subtopicId: "gauss",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 420,
      tags: ["gauss-jordan", "4x4", "back-substitution"],
      prerequisites: ["gauss", "elimination"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 61a",
        page: 549,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L("$(1,\\ 2,\\ 3,\\ 4)$", "$(1,\\ 2,\\ 3,\\ 4)$"),
          correct: true,
        },
        {
          id: "b",
          text: L("$(2,\\ 1,\\ 4,\\ 3)$", "$(2,\\ 1,\\ 4,\\ 3)$"),
          correct: false,
        },
        {
          id: "c",
          text: L("$(1,\\ 2,\\ 3,\\ 5)$", "$(1,\\ 2,\\ 3,\\ 5)$"),
          correct: false,
        },
        {
          id: "d",
          text: L("$(2,\\ 2,\\ 3,\\ 4)$", "$(2,\\ 2,\\ 3,\\ 4)$"),
          correct: false,
        },
      ];
      return {
        skill: L("Gauss-Jordan en un sistema 4×4", "Gauss-Jordan on a 4×4 system"),
        statement: L(
          "Resuelva por Gauss-Jordan: $$\\begin{cases} x_1 + 2x_2 + x_3 = 8 \\\\ x_2 + 3x_3 + x_4 = 15 \\\\ 4x_1 + x_3 + x_4 = 11 \\\\ x_1 + x_2 + 5x_4 = 23 \\end{cases}$$",
          "Solve using Gauss-Jordan: $$\\begin{cases} x_1 + 2x_2 + x_3 = 8 \\\\ x_2 + 3x_3 + x_4 = 15 \\\\ 4x_1 + x_3 + x_4 = 11 \\\\ x_1 + x_2 + 5x_4 = 23 \\end{cases}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Arme la matriz ampliada $4 \\times 5$; la columna de $x_1$ es $(1,\\ 0,\\ 4,\\ 1)$: haga $F_3 - 4F_1$ y $F_4 - F_1$.",
            "Build the $4 \\times 5$ augmented matrix; the $x_1$ column is $(1,\\ 0,\\ 4,\\ 1)$: compute $F_3 - 4F_1$ and $F_4 - F_1$.",
          ),
          L(
            "Use $F_2$ como pivote para $x_2$: $F_3 + 8F_2$ y $F_4 + F_2$, y luego simplifique dividiendo $F_3$ entre $3$ y $F_4$ entre $2$.",
            "Use $F_2$ as the pivot for $x_2$: $F_3 + 8F_2$ and $F_4 + F_2$, then simplify by dividing $F_3$ by $3$ and $F_4$ by $2$.",
          ),
          L(
            "Quedan dos filas en $x_3$ y $x_4$; restando $7$ veces la última, la tercera fila deja $-18x_4 = -72$.",
            "Two rows in $x_3$ and $x_4$ remain; subtracting $7$ times the last one, the third row leaves $-18x_4 = -72$.",
          ),
        ],
        answerDisplay: L(
          "$(x_1, x_2, x_3, x_4) = (1,\\ 2,\\ 3,\\ 4)$",
          "$(x_1, x_2, x_3, x_4) = (1,\\ 2,\\ 3,\\ 4)$",
        ),
        solution: [
          step(
            "given",
            "El sistema $4 \\times 4$: $x_1 + 2x_2 + x_3 = 8$, $x_2 + 3x_3 + x_4 = 15$, $4x_1 + x_3 + x_4 = 11$, $x_1 + x_2 + 5x_4 = 23$.",
            "The $4 \\times 4$ system: $x_1 + 2x_2 + x_3 = 8$, $x_2 + 3x_3 + x_4 = 15$, $4x_1 + x_3 + x_4 = 11$, $x_1 + x_2 + 5x_4 = 23$.",
          ),
          step(
            "approach",
            "Gauss-Jordan sobre la matriz ampliada: pivotes sucesivos para $x_1$, $x_2$, $x_3$, $x_4$ con operaciones elementales de fila, y sustitución hacia atrás al final.",
            "Gauss-Jordan on the augmented matrix: successive pivots for $x_1$, $x_2$, $x_3$, $x_4$ using elementary row operations, then back-substitution.",
          ),
          step(
            "calculation",
            `$F_3 - 4F_1:\\ (0,\\ -8,\\ -3,\\ 1 \\mid -21)$; $F_4 - F_1:\\ (0,\\ -1,\\ -1,\\ 5 \\mid 15)$<br>$F_3 + 8F_2:\\ (0,\\ 0,\\ 21,\\ 9 \\mid 99)$; $F_4 + F_2:\\ (0,\\ 0,\\ 2,\\ 6 \\mid 30)$<br>$F_3/3:\\ (0,\\ 0,\\ 7,\\ 3 \\mid 33)$; $F_4/2:\\ (0,\\ 0,\\ 1,\\ 3 \\mid 15)$<br>$F_3 - 7F_4:\\ (0,\\ 0,\\ 0,\\ -18 \\mid -72) \\Rightarrow x_4 = 4$<br>$x_3 = 15 - 3\\cdot 4 = 3$; $x_2 = 15 - 3\\cdot 3 - 4 = 2$; $x_1 = 8 - 2\\cdot 2 - 3 = 1$.`,
            `$F_3 - 4F_1:\\ (0,\\ -8,\\ -3,\\ 1 \\mid -21)$; $F_4 - F_1:\\ (0,\\ -1,\\ -1,\\ 5 \\mid 15)$<br>$F_3 + 8F_2:\\ (0,\\ 0,\\ 21,\\ 9 \\mid 99)$; $F_4 + F_2:\\ (0,\\ 0,\\ 2,\\ 6 \\mid 30)$<br>$F_3/3:\\ (0,\\ 0,\\ 7,\\ 3 \\mid 33)$; $F_4/2:\\ (0,\\ 0,\\ 1,\\ 3 \\mid 15)$<br>$F_3 - 7F_4:\\ (0,\\ 0,\\ 0,\\ -18 \\mid -72) \\Rightarrow x_4 = 4$<br>$x_3 = 15 - 3\\cdot 4 = 3$; $x_2 = 15 - 3\\cdot 3 - 4 = 2$; $x_1 = 8 - 2\\cdot 2 - 3 = 1$.`,
          ),
          step(
            "result",
            `$(x_1, x_2, x_3, x_4) = (1,\\ 2,\\ 3,\\ 4)$ (clave impresa exacta ✓). Comprobación ecuación por ecuación: $1 + 2\\cdot 2 + 3 = 8$ ✓; $2 + 3\\cdot 3 + 4 = 15$ ✓; $4\\cdot 1 + 3 + 4 = 11$ ✓; $1 + 2 + 5\\cdot 4 = 23$ ✓.`,
            `$(x_1, x_2, x_3, x_4) = (1,\\ 2,\\ 3,\\ 4)$ (exact printed key ✓). Equation-by-equation check: $1 + 2\\cdot 2 + 3 = 8$ ✓; $2 + 3\\cdot 3 + 4 = 15$ ✓; $4\\cdot 1 + 3 + 4 = 11$ ✓; $1 + 2 + 5\\cdot 4 = 23$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 61b — Gauss 4×4 → (−1, 0, 1, 2) (clave exacta). */
  template(
    {
      id: "sys-espol-ch5-61b",
      subject: "math",
      topicId: "systems",
      subtopicId: "gauss",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 420,
      tags: ["gauss", "4x4", "elimination"],
      prerequisites: ["gauss", "elimination"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 61b",
        page: 549,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L("$(-1,\\ 0,\\ 1,\\ 2)$", "$(-1,\\ 0,\\ 1,\\ 2)$"),
          correct: true,
        },
        {
          id: "b",
          text: L("$(1,\\ 0,\\ -1,\\ 2)$", "$(1,\\ 0,\\ -1,\\ 2)$"),
          correct: false,
        },
        {
          id: "c",
          text: L("$(-1,\\ 0,\\ 1,\\ -2)$", "$(-1,\\ 0,\\ 1,\\ -2)$"),
          correct: false,
        },
        {
          id: "d",
          text: L("$(0,\\ -1,\\ 1,\\ 2)$", "$(0,\\ -1,\\ 1,\\ 2)$"),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Eliminación gaussiana 4×4 con signos alternados",
          "4×4 Gaussian elimination with alternating signs",
        ),
        statement: L(
          "Resuelva: $$\\begin{cases} x_1 - x_2 + x_3 - x_4 = -2 \\\\ x_1 + 2x_2 - 2x_3 - x_4 = -5 \\\\ 2x_1 + x_2 - 3x_3 + 2x_4 = -1 \\\\ x_1 + 2x_2 + 3x_3 - 6x_4 = -10 \\end{cases}$$",
          "Solve: $$\\begin{cases} x_1 - x_2 + x_3 - x_4 = -2 \\\\ x_1 + 2x_2 - 2x_3 - x_4 = -5 \\\\ 2x_1 + x_2 - 3x_3 + 2x_4 = -1 \\\\ x_1 + 2x_2 + 3x_3 - 6x_4 = -10 \\end{cases}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Elimine $x_1$ con $F_2 - F_1$, $F_3 - 2F_1$ y $F_4 - F_1$: las filas 2 a 4 quedan con coeficiente $3$ en $x_2$.",
            "Eliminate $x_1$ with $F_2 - F_1$, $F_3 - 2F_1$ and $F_4 - F_1$: rows 2 to 4 all keep coefficient $3$ in $x_2$.",
          ),
          L(
            "Divida $F_2$ entre $3$ (queda $x_2 - x_3 = -1$) y limpie debajo con $F_3 - 3F_2$ y $F_4 - 3F_2$.",
            "Divide $F_2$ by $3$ (it becomes $x_2 - x_3 = -1$) and clear below with $F_3 - 3F_2$ and $F_4 - 3F_2$.",
          ),
          L(
            "Simplifique $F_3$ entre $-2$ y $F_4$ entre $5$; al restarlas queda una sola ecuación en $x_4$.",
            "Simplify $F_3$ by $-2$ and $F_4$ by $5$; subtracting them leaves a single equation in $x_4$.",
          ),
        ],
        answerDisplay: L(
          "$(x_1, x_2, x_3, x_4) = (-1,\\ 0,\\ 1,\\ 2)$",
          "$(x_1, x_2, x_3, x_4) = (-1,\\ 0,\\ 1,\\ 2)$",
        ),
        solution: [
          step(
            "given",
            "El sistema $4 \\times 4$: $x_1 - x_2 + x_3 - x_4 = -2$, $x_1 + 2x_2 - 2x_3 - x_4 = -5$, $2x_1 + x_2 - 3x_3 + 2x_4 = -1$, $x_1 + 2x_2 + 3x_3 - 6x_4 = -10$.",
            "The $4 \\times 4$ system: $x_1 - x_2 + x_3 - x_4 = -2$, $x_1 + 2x_2 - 2x_3 - x_4 = -5$, $2x_1 + x_2 - 3x_3 + 2x_4 = -1$, $x_1 + 2x_2 + 3x_3 - 6x_4 = -10$.",
          ),
          step(
            "approach",
            "Eliminación gaussiana: ceros bajo cada pivote y sustitución hacia atrás; los signos alternados exigen cuidado aritmético en cada operación de fila.",
            "Gaussian elimination: zeros below each pivot and back-substitution; the alternating signs demand careful arithmetic in every row operation.",
          ),
          step(
            "calculation",
            `$F_2 - F_1:\\ (0,\\ 3,\\ -3,\\ 0 \\mid -3)$; $F_3 - 2F_1:\\ (0,\\ 3,\\ -5,\\ 4 \\mid 3)$; $F_4 - F_1:\\ (0,\\ 3,\\ 2,\\ -5 \\mid -8)$<br>$F_2/3:\\ (0,\\ 1,\\ -1,\\ 0 \\mid -1)$; $F_3 - 3F_2:\\ (0,\\ 0,\\ -2,\\ 4 \\mid 6)$; $F_4 - 3F_2:\\ (0,\\ 0,\\ 5,\\ -5 \\mid -5)$<br>$F_3/(-2):\\ (0,\\ 0,\\ 1,\\ -2 \\mid -3)$; $F_4/5:\\ (0,\\ 0,\\ 1,\\ -1 \\mid -1)$<br>$F_4 - F_3:\\ (0,\\ 0,\\ 0,\\ 1 \\mid 2) \\Rightarrow x_4 = 2$<br>$x_3 = -3 + 2\\cdot 2 = 1$; $x_2 = -1 + x_3 = 0$; $x_1 = -2 + x_2 - x_3 + x_4 = -1$.`,
            `$F_2 - F_1:\\ (0,\\ 3,\\ -3,\\ 0 \\mid -3)$; $F_3 - 2F_1:\\ (0,\\ 3,\\ -5,\\ 4 \\mid 3)$; $F_4 - F_1:\\ (0,\\ 3,\\ 2,\\ -5 \\mid -8)$<br>$F_2/3:\\ (0,\\ 1,\\ -1,\\ 0 \\mid -1)$; $F_3 - 3F_2:\\ (0,\\ 0,\\ -2,\\ 4 \\mid 6)$; $F_4 - 3F_2:\\ (0,\\ 0,\\ 5,\\ -5 \\mid -5)$<br>$F_3/(-2):\\ (0,\\ 0,\\ 1,\\ -2 \\mid -3)$; $F_4/5:\\ (0,\\ 0,\\ 1,\\ -1 \\mid -1)$<br>$F_4 - F_3:\\ (0,\\ 0,\\ 0,\\ 1 \\mid 2) \\Rightarrow x_4 = 2$<br>$x_3 = -3 + 2\\cdot 2 = 1$; $x_2 = -1 + x_3 = 0$; $x_1 = -2 + x_2 - x_3 + x_4 = -1$.`,
          ),
          step(
            "result",
            `$(x_1, x_2, x_3, x_4) = (-1,\\ 0,\\ 1,\\ 2)$ (clave impresa exacta ✓). Comprobación ecuación por ecuación: $-1 - 0 + 1 - 2 = -2$ ✓; $-1 + 0 - 2 - 2 = -5$ ✓; $2(-1) + 0 - 3 + 2\\cdot 2 = -1$ ✓; $-1 + 0 + 3 - 6\\cdot 2 = -10$ ✓.`,
            `$(x_1, x_2, x_3, x_4) = (-1,\\ 0,\\ 1,\\ 2)$ (exact printed key ✓). Equation-by-equation check: $-1 - 0 + 1 - 2 = -2$ ✓; $-1 + 0 - 2 - 2 = -5$ ✓; $2(-1) + 0 - 3 + 2\\cdot 2 = -1$ ✓; $-1 + 0 + 3 - 6\\cdot 2 = -10$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Cap. 5 §§5.4-5.6 «Sistemas no lineales y de inecuaciones» (ed.    */
  /* digital), pp. 550-554. Tutor: «prosigue con matrices y sistemas». */
  /* Clave impresa (p. 942) + sympy: download/verify_espol_ch5.py.     */
  /* NOTA: «log» del libro = base 10 (verificado con la clave).         */
  /* ---------------------------------------------------------------- */

  /* 5 · 66a — 3^(y−x) = 9; 3^(x+y) = 81 → (1, 3) (clave exacta). */
  template(
    {
      id: "sys-espol-ch5-66a",
      subject: "math",
      topicId: "systems",
      subtopicId: "nonlinear",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 270,
      tags: ["exponential-system", "equal-bases", "nonlinear"],
      prerequisites: ["nonlinear", "elimination"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 66a",
        page: 550,
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$(1,\\ 3)$", "$(1,\\ 3)$"), correct: true },
        { id: "b", text: L("$(3,\\ 1)$", "$(3,\\ 1)$"), correct: false },
        { id: "c", text: L("$(1,\\ -3)$", "$(1,\\ -3)$"), correct: false },
        { id: "d", text: L("$(2,\\ 3)$", "$(2,\\ 3)$"), correct: false },
      ];
      return {
        skill: L(
          "Sistema exponencial con bases iguales",
          "Exponential system with equal bases",
        ),
        statement: L(
          "Resuelva: $$\\begin{cases} 3^{y-x} = 9 \\\\ 3^{x+y} = 81 \\end{cases}$$",
          "Solve: $$\\begin{cases} 3^{y-x} = 9 \\\\ 3^{x+y} = 81 \\end{cases}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Las dos ecuaciones comparten la base $3$: escriba $9$ y $81$ como potencias de $3$.",
            "Both equations share the base $3$: write $9$ and $81$ as powers of $3$.",
          ),
          L(
            "Si $3^{a} = 3^{b}$ con la misma base, entonces $a = b$: cada ecuación se vuelve lineal.",
            "If $3^{a} = 3^{b}$ with the same base, then $a = b$: each equation becomes linear.",
          ),
          L(
            "Quedan $y - x = 2$ y $x + y = 4$: súmelas y réstelas para cerrar el sistema.",
            "You are left with $y - x = 2$ and $x + y = 4$: add and subtract them to close the system.",
          ),
        ],
        answerDisplay: L("$(x, y) = (1,\\ 3)$", "$(x, y) = (1,\\ 3)$"),
        solution: [
          step(
            "given",
            "El sistema $3^{y-x} = 9$, $3^{x+y} = 81$.",
            "The system $3^{y-x} = 9$, $3^{x+y} = 81$.",
          ),
          step(
            "approach",
            "Como $9 = 3^{2}$ y $81 = 3^{4}$, igualamos exponentes y el sistema exponencial se reduce a uno lineal en $x$ e $y$.",
            "Since $9 = 3^{2}$ and $81 = 3^{4}$, we equate exponents and the exponential system reduces to a linear one in $x$ and $y$.",
          ),
          step(
            "calculation",
            `$3^{y-x} = 3^{2} \\Rightarrow y - x = 2$<br>$3^{x+y} = 3^{4} \\Rightarrow x + y = 4$<br>Sumando: $2y = 6 \\Rightarrow y = 3$; restando: $2x = 2 \\Rightarrow x = 1$.`,
            `$3^{y-x} = 3^{2} \\Rightarrow y - x = 2$<br>$3^{x+y} = 3^{4} \\Rightarrow x + y = 4$<br>Adding: $2y = 6 \\Rightarrow y = 3$; subtracting: $2x = 2 \\Rightarrow x = 1$.`,
          ),
          step(
            "result",
            `$(x, y) = (1,\\ 3)$ (clave impresa exacta ✓). Comprobación: $3^{3-1} = 3^{2} = 9$ ✓ y $3^{1+3} = 3^{4} = 81$ ✓.`,
            `$(x, y) = (1,\\ 3)$ (exact printed key ✓). Check: $3^{3-1} = 3^{2} = 9$ ✓ and $3^{1+3} = 3^{4} = 81$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 66b — 3^(y−x) = 3; 3^x + 3^y = 36 → (2, 3) (clave exacta). */
  template(
    {
      id: "sys-espol-ch5-66b",
      subject: "math",
      topicId: "systems",
      subtopicId: "nonlinear",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["exponential-system", "common-factor", "substitution"],
      prerequisites: ["nonlinear", "substitution"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 66b",
        page: 550,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$(2,\\ 3)$", "$(2,\\ 3)$"), correct: true },
        { id: "b", text: L("$(3,\\ 2)$", "$(3,\\ 2)$"), correct: false },
        { id: "c", text: L("$(2,\\ 2)$", "$(2,\\ 2)$"), correct: false },
        { id: "d", text: L("$(1,\\ 3)$", "$(1,\\ 3)$"), correct: false },
      ];
      return {
        skill: L(
          "Exponentes iguales y factor común",
          "Equal exponents and common factoring",
        ),
        statement: L(
          "Resuelva: $$\\begin{cases} 3^{y-x} = 3 \\\\ 3^{x} + 3^{y} = 36 \\end{cases}$$",
          "Solve: $$\\begin{cases} 3^{y-x} = 3 \\\\ 3^{x} + 3^{y} = 36 \\end{cases}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "En la primera ecuación la base es la misma a ambos lados: iguale los exponentes y despeje $y$.",
            "In the first equation the base is the same on both sides: equate the exponents and solve for $y$.",
          ),
          L(
            "Con $y = x + 1$, la segunda ecuación queda escrita sólo con potencias de $3$ en $x$.",
            "With $y = x + 1$, the second equation is written only with powers of $3$ in $x$.",
          ),
          L(
            "Factorice $3^{x}$: $3^{x} + 3^{x+1} = 3^{x}(1 + 3) = 4\\cdot 3^{x}$.",
            "Factor out $3^{x}$: $3^{x} + 3^{x+1} = 3^{x}(1 + 3) = 4\\cdot 3^{x}$.",
          ),
        ],
        answerDisplay: L("$(x, y) = (2,\\ 3)$", "$(x, y) = (2,\\ 3)$"),
        solution: [
          step(
            "given",
            "El sistema $3^{y-x} = 3$, $3^{x} + 3^{y} = 36$.",
            "The system $3^{y-x} = 3$, $3^{x} + 3^{y} = 36$.",
          ),
          step(
            "approach",
            "La primera ecuación entrega $y$ en función de $x$; al sustituirla, la segunda queda con una sola exponencial que se factoriza.",
            "The first equation gives $y$ in terms of $x$; substituting it, the second one keeps a single exponential that factors out.",
          ),
          step(
            "calculation",
            `$3^{y-x} = 3^{1} \\Rightarrow y - x = 1 \\Rightarrow y = x + 1$<br>$3^{x} + 3^{x+1} = 3^{x} + 3\\cdot 3^{x} = 4\\cdot 3^{x} = 36 \\Rightarrow 3^{x} = 9 = 3^{2}$<br>$x = 2$ y $y = 2 + 1 = 3$.`,
            `$3^{y-x} = 3^{1} \\Rightarrow y - x = 1 \\Rightarrow y = x + 1$<br>$3^{x} + 3^{x+1} = 3^{x} + 3\\cdot 3^{x} = 4\\cdot 3^{x} = 36 \\Rightarrow 3^{x} = 9 = 3^{2}$<br>$x = 2$ and $y = 2 + 1 = 3$.`,
          ),
          step(
            "result",
            `$(x, y) = (2,\\ 3)$ (clave impresa exacta ✓). Comprobación: $3^{3-2} = 3^{1} = 3$ ✓ y $3^{2} + 3^{3} = 9 + 27 = 36$ ✓.`,
            `$(x, y) = (2,\\ 3)$ (exact printed key ✓). Check: $3^{3-2} = 3^{1} = 3$ ✓ and $3^{2} + 3^{3} = 9 + 27 = 36$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 66d — 2^(2x+1) − 3^(2y) = 23; 2x + 3y = 7 → (2, 1) (clave exacta). */
  template(
    {
      id: "sys-espol-ch5-66d",
      subject: "math",
      topicId: "systems",
      subtopicId: "nonlinear",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 360,
      tags: ["exponential-system", "monotonicity", "mixed-system"],
      prerequisites: ["nonlinear", "substitution"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 66d",
        page: 550,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$(2,\\ 1)$", "$(2,\\ 1)$"), correct: true },
        { id: "b", text: L("$(1,\\ 2)$", "$(1,\\ 2)$"), correct: false },
        { id: "c", text: L("$(2,\\ -1)$", "$(2,\\ -1)$"), correct: false },
        {
          id: "d",
          text: L(
            "$\\left(\\tfrac{1}{2},\\ 2\\right)$",
            "$\\left(\\tfrac{1}{2},\\ 2\\right)$",
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Sistema mixto exponencial-lineal",
          "Mixed exponential-linear system",
        ),
        statement: L(
          "Resuelva: $$\\begin{cases} 2^{2x+1} - 3^{2y} = 23 \\\\ 2x + 3y = 7 \\end{cases}$$",
          "Solve: $$\\begin{cases} 2^{2x+1} - 3^{2y} = 23 \\\\ 2x + 3y = 7 \\end{cases}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Use la ecuación lineal para escribir $2x$ en función de $y$; el exponente $2x + 1$ quedará también en función de $y$.",
            "Use the linear equation to write $2x$ in terms of $y$; the exponent $2x + 1$ will then be a function of $y$ as well.",
          ),
          L(
            "Al sustituir queda $2^{8-3y} - 3^{2y} = 23$: una sola incógnita.",
            "Substituting leaves $2^{8-3y} - 3^{2y} = 23$: a single unknown.",
          ),
          L(
            "El lado izquierdo decrece al crecer $y$ (una potencia de $2$ baja y una de $3$ sube): pruebe valores enteros de $y$.",
            "The left-hand side decreases as $y$ grows (a power of $2$ going down and a power of $3$ going up): try integer values of $y$.",
          ),
        ],
        answerDisplay: L("$(x, y) = (2,\\ 1)$", "$(x, y) = (2,\\ 1)$"),
        solution: [
          step(
            "given",
            "El sistema $2^{2x+1} - 3^{2y} = 23$, $2x + 3y = 7$.",
            "The system $2^{2x+1} - 3^{2y} = 23$, $2x + 3y = 7$.",
          ),
          step(
            "approach",
            "De la ecuación lineal, $2x = 7 - 3y$ y por tanto $2x + 1 = 8 - 3y$; al sustituir queda una ecuación en $y$ cuyo lado izquierdo es estrictamente decreciente, así que la solución hallada es única.",
            "From the linear equation, $2x = 7 - 3y$ and hence $2x + 1 = 8 - 3y$; substituting leaves one equation in $y$ whose left-hand side is strictly decreasing, so the solution found is unique.",
          ),
          step(
            "calculation",
            `Defina $f(y) = 2^{8-3y} - 3^{2y}$, estrictamente decreciente: $f(0) = 2^{8} - 1 = 255 > 23$ y $f(2) = 2^{2} - 3^{4} = -77 < 23$, así que la raíz es única y está entre $0$ y $2$.<br>Prueba $y = 1$: $f(1) = 2^{5} - 3^{2} = 32 - 9 = 23$ ✓<br>$2x = 7 - 3\\cdot 1 = 4 \\Rightarrow x = 2$.`,
            `Let $f(y) = 2^{8-3y} - 3^{2y}$, strictly decreasing: $f(0) = 2^{8} - 1 = 255 > 23$ and $f(2) = 2^{2} - 3^{4} = -77 < 23$, so the root is unique and lies between $0$ and $2$.<br>Try $y = 1$: $f(1) = 2^{5} - 3^{2} = 32 - 9 = 23$ ✓<br>$2x = 7 - 3\\cdot 1 = 4 \\Rightarrow x = 2$.`,
          ),
          step(
            "result",
            `$(x, y) = (2,\\ 1)$ (clave impresa exacta ✓). Comprobación: $2^{2\\cdot 2+1} - 3^{2\\cdot 1} = 2^{5} - 3^{2} = 32 - 9 = 23$ ✓ y $2\\cdot 2 + 3\\cdot 1 = 7$ ✓.`,
            `$(x, y) = (2,\\ 1)$ (exact printed key ✓). Check: $2^{2\\cdot 2+1} - 3^{2\\cdot 1} = 2^{5} - 3^{2} = 32 - 9 = 23$ ✓ and $2\\cdot 2 + 3\\cdot 1 = 7$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 66f — 2^x·2^y = 64; 2^x + 2^y = 20 → {(2, 4), (4, 2)}. ERRATA de
     clave: la clave impresa (p. 942) lista sólo (4, 2); el par simétrico
     (2, 4) también cumple (verify_espol_ch5.py, ch5-66f). */
  template(
    {
      id: "sys-espol-ch5-66f",
      subject: "math",
      topicId: "systems",
      subtopicId: "nonlinear",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 360,
      tags: ["exponential-system", "change-of-variable", "sum-product"],
      prerequisites: ["nonlinear", "substitution"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 66f",
        page: 550,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L("$\\{(2,\\ 4),\\ (4,\\ 2)\\}$", "$\\{(2,\\ 4),\\ (4,\\ 2)\\}$"),
          correct: true,
        },
        {
          id: "b",
          text: L(
            "Sólo $\\{(4,\\ 2)\\}$",
            "Only $\\{(4,\\ 2)\\}$",
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            "Sólo $\\{(2,\\ 4)\\}$",
            "Only $\\{(2,\\ 4)\\}$",
          ),
          correct: false,
        },
        {
          id: "d",
          text: L("$\\{(3,\\ 3)\\}$", "$\\{(3,\\ 3)\\}$"),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Cambio de variable en un sistema exponencial",
          "Change of variable in an exponential system",
        ),
        statement: L(
          "Resuelva: $$\\begin{cases} 2^{x} \\cdot 2^{y} = 64 \\\\ 2^{x} + 2^{y} = 20 \\end{cases}$$",
          "Solve: $$\\begin{cases} 2^{x} \\cdot 2^{y} = 64 \\\\ 2^{x} + 2^{y} = 20 \\end{cases}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El producto de potencias de igual base suma exponentes: $2^{x} \\cdot 2^{y} = 2^{x+y}$.",
            "A product of same-base powers adds the exponents: $2^{x} \\cdot 2^{y} = 2^{x+y}$.",
          ),
          L(
            "Con el cambio $u = 2^{x}$, $v = 2^{y}$ el sistema queda $uv = 64$, $u + v = 20$.",
            "With the change $u = 2^{x}$, $v = 2^{y}$ the system becomes $uv = 64$, $u + v = 20$.",
          ),
          L(
            "$u$ y $v$ son las raíces de $t^{2} - 20t + 64 = 0$; después deshaga el cambio con logaritmo base $2$.",
            "$u$ and $v$ are the roots of $t^{2} - 20t + 64 = 0$; then undo the change with a base-$2$ logarithm.",
          ),
        ],
        answerDisplay: L(
          "El conjunto solución es $\\{(2,\\ 4),\\ (4,\\ 2)\\}$",
          "The solution set is $\\{(2,\\ 4),\\ (4,\\ 2)\\}$",
        ),
        solution: [
          step(
            "given",
            "El sistema $2^{x} \\cdot 2^{y} = 64$, $2^{x} + 2^{y} = 20$.",
            "The system $2^{x} \\cdot 2^{y} = 64$, $2^{x} + 2^{y} = 20$.",
          ),
          step(
            "approach",
            "Sumar exponentes en la primera ecuación y cambiar de variables $u = 2^{x}$, $v = 2^{y}$ (con $u, v > 0$) convierte todo en un juego suma-producto; el sistema es simétrico en $x$, $y$, así que las soluciones vienen en pares.",
            "Adding exponents in the first equation and changing variables $u = 2^{x}$, $v = 2^{y}$ (with $u, v > 0$) turns everything into a sum-product game; the system is symmetric in $x$, $y$, so solutions come in pairs.",
          ),
          step(
            "calculation",
            `$2^{x} \\cdot 2^{y} = 2^{x+y} = 64 = 2^{6} \\Rightarrow x + y = 6$<br>$u = 2^{x}$, $v = 2^{y}$: $uv = 2^{x+y} = 64$ y $u + v = 20$, así que $u$ y $v$ son raíces de $t^{2} - 20t + 64 = (t - 4)(t - 16) = 0$<br>$u = 4 = 2^{2}$, $v = 16 = 2^{4}$: $(x, y) = (2,\\ 4)$; y al revés, $u = 16$, $v = 4$: $(x, y) = (4,\\ 2)$.`,
            `$2^{x} \\cdot 2^{y} = 2^{x+y} = 64 = 2^{6} \\Rightarrow x + y = 6$<br>$u = 2^{x}$, $v = 2^{y}$: $uv = 2^{x+y} = 64$ and $u + v = 20$, so $u$ and $v$ are roots of $t^{2} - 20t + 64 = (t - 4)(t - 16) = 0$<br>$u = 4 = 2^{2}$, $v = 16 = 2^{4}$: $(x, y) = (2,\\ 4)$; and the other way round, $u = 16$, $v = 4$: $(x, y) = (4,\\ 2)$.`,
          ),
          step(
            "result",
            `El conjunto solución es $\\{(2,\\ 4),\\ (4,\\ 2)\\}$ ✓. ERRATA de clave: la clave impresa (p. 942) lista sólo $(4,\\ 2)$; el par simétrico $(2,\\ 4)$ también cumple, así que la opción correcta muestra AMBOS pares. Comprobación de ambos: $2^{2}\\cdot 2^{4} = 4\\cdot 16 = 64$ ✓ y $4 + 16 = 20$ ✓; igual $2^{4}\\cdot 2^{2} = 64$ ✓ y $16 + 4 = 20$ ✓.`,
            `The solution set is $\\{(2,\\ 4),\\ (4,\\ 2)\\}$ ✓. Key ERRATUM: the printed key (p. 942) lists only $(4,\\ 2)$; the symmetric pair $(2,\\ 4)$ also works, so the correct option shows BOTH pairs. Check of both: $2^{2}\\cdot 2^{4} = 4\\cdot 16 = 64$ ✓ and $4 + 16 = 20$ ✓; likewise $2^{4}\\cdot 2^{2} = 64$ ✓ and $16 + 4 = 20$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 66g — log x + log y = 3; x + y = 110 → {(10, 100), (100, 10)}
     (clave exacta; «log» del libro = base 10). */
  template(
    {
      id: "sys-espol-ch5-66g",
      subject: "math",
      topicId: "systems",
      subtopicId: "nonlinear",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["logarithmic-system", "sum-product", "base-10"],
      prerequisites: ["nonlinear", "substitution"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 66g",
        page: 550,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "$\\{(10,\\ 100),\\ (100,\\ 10)\\}$",
            "$\\{(10,\\ 100),\\ (100,\\ 10)\\}$",
          ),
          correct: true,
        },
        {
          id: "b",
          text: L("Sólo $\\{(10,\\ 100)\\}$", "Only $\\{(10,\\ 100)\\}$"),
          correct: false,
        },
        {
          id: "c",
          text: L("$\\{(50,\\ 60)\\}$", "$\\{(50,\\ 60)\\}$"),
          correct: false,
        },
        {
          id: "d",
          text: L(
            "$\\{(1,\\ 1000),\\ (1000,\\ 1)\\}$",
            "$\\{(1,\\ 1000),\\ (1000,\\ 1)\\}$",
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Sistema logarítmico suma-producto",
          "Sum-product logarithmic system",
        ),
        statement: L(
          "Resuelva (con $\\log$ = logaritmo base $10$): $$\\begin{cases} \\log x + \\log y = 3 \\\\ x + y = 110 \\end{cases}$$",
          "Solve (with $\\log$ = base-$10$ logarithm): $$\\begin{cases} \\log x + \\log y = 3 \\\\ x + y = 110 \\end{cases}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "La suma de logaritmos es el logaritmo del producto (con $x, y > 0$).",
            "A sum of logarithms is the logarithm of the product (with $x, y > 0$).",
          ),
          L(
            "Como $3 = \\log 1000$, el sistema se convierte en $xy = 1000$ junto con $x + y = 110$.",
            "Since $3 = \\log 1000$, the system becomes $xy = 1000$ together with $x + y = 110$.",
          ),
          L(
            "$x$ y $y$ son las raíces de $u^{2} - 110u + 1000 = 0$: calcule el discriminante $110^{2} - 4\\cdot 1000$.",
            "$x$ and $y$ are the roots of $u^{2} - 110u + 1000 = 0$: compute the discriminant $110^{2} - 4\\cdot 1000$.",
          ),
        ],
        answerDisplay: L(
          "$\\{(10,\\ 100),\\ (100,\\ 10)\\}$",
          "$\\{(10,\\ 100),\\ (100,\\ 10)\\}$",
        ),
        solution: [
          step(
            "given",
            "El sistema $\\log x + \\log y = 3$ (base $10$), $x + y = 110$.",
            "The system $\\log x + \\log y = 3$ (base $10$), $x + y = 110$.",
          ),
          step(
            "approach",
            "Combinar los dos logaritmos en el logaritmo de un producto y deshacerlo con una potencia de $10$; queda el juego suma-producto de dos números.",
            "Combine the two logarithms into the logarithm of a product and undo it with a power of $10$; this leaves the sum-product game for two numbers.",
          ),
          step(
            "calculation",
            `$\\log(xy) = 3 \\Rightarrow xy = 10^{3} = 1000$<br>$x + y = 110$: $x$ y $y$ son raíces de $u^{2} - 110u + 1000 = 0$<br>$u = \\frac{110 \\pm \\sqrt{12100 - 4000}}{2} = \\frac{110 \\pm 90}{2} \\Rightarrow u = 100$ o $u = 10$<br>Pares: $(10,\\ 100)$ y $(100,\\ 10)$.`,
            `$\\log(xy) = 3 \\Rightarrow xy = 10^{3} = 1000$<br>$x + y = 110$: $x$ and $y$ are roots of $u^{2} - 110u + 1000 = 0$<br>$u = \\frac{110 \\pm \\sqrt{12100 - 4000}}{2} = \\frac{110 \\pm 90}{2} \\Rightarrow u = 100$ or $u = 10$<br>Pairs: $(10,\\ 100)$ and $(100,\\ 10)$.`,
          ),
          step(
            "result",
            `$\\{(10,\\ 100),\\ (100,\\ 10)\\}$ (clave impresa exacta ✓). Comprobación: $\\log 10 + \\log 100 = 1 + 2 = 3$ ✓ y $10 + 100 = 110$ ✓ (el par simétrico, igual). Los distractores caen: $(50,\\ 60)$ suma $110$ pero $\\log 50 + \\log 60 = \\log 3000 \\neq 3$; $(1,\\ 1000)$ multiplica $1000$ pero suma $1001 \\neq 110$.`,
            `$\\{(10,\\ 100),\\ (100,\\ 10)\\}$ (exact printed key ✓). Check: $\\log 10 + \\log 100 = 1 + 2 = 3$ ✓ and $10 + 100 = 110$ ✓ (likewise the symmetric pair). The distractors fall: $(50,\\ 60)$ adds up to $110$ but $\\log 50 + \\log 60 = \\log 3000 \\neq 3$; $(1,\\ 1000)$ multiplies to $1000$ but adds up to $1001 \\neq 110$.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 66h — log₂ x − log₂ y = 1; log₂(x − y) = 2 → (8, 4) (clave exacta). */
  template(
    {
      id: "sys-espol-ch5-66h",
      subject: "math",
      topicId: "systems",
      subtopicId: "nonlinear",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["logarithmic-system", "quotient-rule", "base-2"],
      prerequisites: ["nonlinear", "substitution"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 66h",
        page: 550,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$(8,\\ 4)$", "$(8,\\ 4)$"), correct: true },
        { id: "b", text: L("$(4,\\ 2)$", "$(4,\\ 2)$"), correct: false },
        { id: "c", text: L("$(8,\\ 2)$", "$(8,\\ 2)$"), correct: false },
        { id: "d", text: L("$(6,\\ 3)$", "$(6,\\ 3)$"), correct: false },
      ];
      return {
        skill: L(
          "Leyes de logaritmos en un sistema",
          "Logarithm laws in a system",
        ),
        statement: L(
          "Resuelva: $$\\begin{cases} \\log_{2} x - \\log_{2} y = 1 \\\\ \\log_{2}(x - y) = 2 \\end{cases}$$",
          "Solve: $$\\begin{cases} \\log_{2} x - \\log_{2} y = 1 \\\\ \\log_{2}(x - y) = 2 \\end{cases}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "La resta de logaritmos de igual base es el logaritmo del cociente.",
            "The difference of same-base logarithms is the logarithm of the quotient.",
          ),
          L(
            "Al deshacer los dos logaritmos queda $x/y = 2$ junto con $x - y = 4$: un sistema lineal pequeño.",
            "Undoing both logarithms leaves $x/y = 2$ together with $x - y = 4$: a small linear system.",
          ),
          L(
            "Sustituya $x = 2y$ en $x - y = 4$ para despejar $y$.",
            "Substitute $x = 2y$ into $x - y = 4$ to solve for $y$.",
          ),
        ],
        answerDisplay: L("$(x, y) = (8,\\ 4)$", "$(x, y) = (8,\\ 4)$"),
        solution: [
          step(
            "given",
            "El sistema $\\log_{2} x - \\log_{2} y = 1$, $\\log_{2}(x - y) = 2$.",
            "The system $\\log_{2} x - \\log_{2} y = 1$, $\\log_{2}(x - y) = 2$.",
          ),
          step(
            "approach",
            "Aplicar la ley del cociente a la primera ecuación y deshacer ambos logaritmos base $2$; queda un sistema lineal pequeño.",
            "Apply the quotient law to the first equation and undo both base-$2$ logarithms; a small linear system remains.",
          ),
          step(
            "calculation",
            `$\\log_{2}\\left(\\frac{x}{y}\\right) = 1 \\Rightarrow \\frac{x}{y} = 2^{1} = 2 \\Rightarrow x = 2y$<br>$\\log_{2}(x - y) = 2 \\Rightarrow x - y = 2^{2} = 4$<br>$2y - y = 4 \\Rightarrow y = 4$ y $x = 2\\cdot 4 = 8$.`,
            `$\\log_{2}\\left(\\frac{x}{y}\\right) = 1 \\Rightarrow \\frac{x}{y} = 2^{1} = 2 \\Rightarrow x = 2y$<br>$\\log_{2}(x - y) = 2 \\Rightarrow x - y = 2^{2} = 4$<br>$2y - y = 4 \\Rightarrow y = 4$ and $x = 2\\cdot 4 = 8$.`,
          ),
          step(
            "result",
            `$(x, y) = (8,\\ 4)$ (clave impresa exacta ✓). Comprobación: $\\log_{2} 8 - \\log_{2} 4 = 3 - 2 = 1$ ✓ y $\\log_{2}(8 - 4) = \\log_{2} 4 = 2$ ✓.`,
            `$(x, y) = (8,\\ 4)$ (exact printed key ✓). Check: $\\log_{2} 8 - \\log_{2} 4 = 3 - 2 = 1$ ✓ and $\\log_{2}(8 - 4) = \\log_{2} 4 = 2$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 66i — y − 4x = 0; log x + log y = 4 → (50, 200) (clave exacta;
     «log» del libro = base 10). */
  template(
    {
      id: "sys-espol-ch5-66i",
      subject: "math",
      topicId: "systems",
      subtopicId: "nonlinear",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["logarithmic-system", "substitution", "base-10"],
      prerequisites: ["nonlinear", "substitution"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 66i",
        page: 550,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$(50,\\ 200)$", "$(50,\\ 200)$"), correct: true },
        { id: "b", text: L("$(25,\\ 100)$", "$(25,\\ 100)$"), correct: false },
        { id: "c", text: L("$(50,\\ 100)$", "$(50,\\ 100)$"), correct: false },
        { id: "d", text: L("$(20,\\ 80)$", "$(20,\\ 80)$"), correct: false },
      ];
      return {
        skill: L(
          "Sustitución en un sistema logarítmico",
          "Substitution in a logarithmic system",
        ),
        statement: L(
          "Resuelva (con $\\log$ = logaritmo base $10$): $$\\begin{cases} y - 4x = 0 \\\\ \\log x + \\log y = 4 \\end{cases}$$",
          "Solve (with $\\log$ = base-$10$ logarithm): $$\\begin{cases} y - 4x = 0 \\\\ \\log x + \\log y = 4 \\end{cases}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "De la primera ecuación, $y = 4x$: sustitúyalo en el logaritmo.",
            "From the first equation, $y = 4x$: substitute it into the logarithm.",
          ),
          L(
            "$\\log x + \\log(4x) = \\log(4x^{2}) = 4$ lleva a una ecuación cuadrática en $x$.",
            "$\\log x + \\log(4x) = \\log(4x^{2}) = 4$ leads to a quadratic in $x$.",
          ),
          L(
            "$4x^{2} = 10^{4}$ tiene dos raíces; el logaritmo exige $x > 0$, así que sólo una vale.",
            "$4x^{2} = 10^{4}$ has two roots; the logarithm requires $x > 0$, so only one is valid.",
          ),
        ],
        answerDisplay: L("$(x, y) = (50,\\ 200)$", "$(x, y) = (50,\\ 200)$"),
        solution: [
          step(
            "given",
            "El sistema $y - 4x = 0$, $\\log x + \\log y = 4$ (base $10$).",
            "The system $y - 4x = 0$, $\\log x + \\log y = 4$ (base $10$).",
          ),
          step(
            "approach",
            "Sustituir $y = 4x$ y combinar los logaritmos en el logaritmo del producto; la ecuación resultante es cuadrática en $x$ y sólo la raíz positiva es válida.",
            "Substitute $y = 4x$ and combine the logarithms into the logarithm of the product; the resulting equation is quadratic in $x$ and only the positive root is valid.",
          ),
          step(
            "calculation",
            `$y = 4x$: $\\log(x\\cdot 4x) = \\log(4x^{2}) = 4 \\Rightarrow 4x^{2} = 10^{4} = 10000$<br>$x^{2} = 2500 \\Rightarrow x = 50$ (se descarta $x = -50$ porque el logaritmo exige $x > 0$)<br>$y = 4\\cdot 50 = 200$.`,
            `$y = 4x$: $\\log(x\\cdot 4x) = \\log(4x^{2}) = 4 \\Rightarrow 4x^{2} = 10^{4} = 10000$<br>$x^{2} = 2500 \\Rightarrow x = 50$ ($x = -50$ is discarded because the logarithm requires $x > 0$)<br>$y = 4\\cdot 50 = 200$.`,
          ),
          step(
            "result",
            `$(x, y) = (50,\\ 200)$ (clave impresa exacta ✓). Comprobación: $\\log 50 + \\log 200 = \\log(50\\cdot 200) = \\log 10000 = \\log 10^{4} = 4$ ✓ y $200 - 4\\cdot 50 = 0$ ✓.`,
            `$(x, y) = (50,\\ 200)$ (exact printed key ✓). Check: $\\log 50 + \\log 200 = \\log(50\\cdot 200) = \\log 10000 = \\log 10^{4} = 4$ ✓ and $200 - 4\\cdot 50 = 0$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 67a — cos(x−y) = 1; sen x + sen y = 1, x, y ∈ (0, 2π) →
     {(π/6, π/6), (5π/6, 5π/6)} (clave en grados: (30°, 30°), (150°, 150°)). */
  template(
    {
      id: "sys-espol-ch5-67a",
      subject: "math",
      topicId: "systems",
      subtopicId: "nonlinear",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 360,
      tags: ["trigonometric-system", "unit-circle", "case-analysis"],
      prerequisites: ["nonlinear"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 67a",
        page: 550,
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "$\\left\\{\\left(\\frac{\\pi}{6}, \\frac{\\pi}{6}\\right), \\left(\\frac{5\\pi}{6}, \\frac{5\\pi}{6}\\right)\\right\\}$",
            "$\\left\\{\\left(\\frac{\\pi}{6}, \\frac{\\pi}{6}\\right), \\left(\\frac{5\\pi}{6}, \\frac{5\\pi}{6}\\right)\\right\\}$",
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            "Sólo $\\left(\\frac{\\pi}{6}, \\frac{\\pi}{6}\\right)$",
            "Only $\\left(\\frac{\\pi}{6}, \\frac{\\pi}{6}\\right)$",
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            "$\\left\\{\\left(\\frac{\\pi}{6}, \\frac{5\\pi}{6}\\right), \\left(\\frac{5\\pi}{6}, \\frac{\\pi}{6}\\right)\\right\\}$",
            "$\\left\\{\\left(\\frac{\\pi}{6}, \\frac{5\\pi}{6}\\right), \\left(\\frac{5\\pi}{6}, \\frac{\\pi}{6}\\right)\\right\\}$",
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            "$\\left\\{\\left(\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right)\\right\\}$",
            "$\\left\\{\\left(\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right)\\right\\}$",
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Sistema trigonométrico en (0, 2π)",
          "Trigonometric system on (0, 2π)",
        ),
        statement: L(
          "Resuelva, con $x, y \\in (0, 2\\pi)$: $$\\begin{cases} \\cos(x - y) = 1 \\\\ \\operatorname{sen}(x) + \\operatorname{sen}(y) = 1 \\end{cases}$$",
          "Solve, with $x, y \\in (0, 2\\pi)$: $$\\begin{cases} \\cos(x - y) = 1 \\\\ \\sin(x) + \\sin(y) = 1 \\end{cases}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "$\\cos\\theta = 1$ sólo cuando $\\theta$ es múltiplo entero de $2\\pi$; con $x, y \\in (0, 2\\pi)$, la diferencia $x - y$ vive en $(-2\\pi, 2\\pi)$.",
            "$\\cos\\theta = 1$ only when $\\theta$ is an integer multiple of $2\\pi$; with $x, y \\in (0, 2\\pi)$, the difference $x - y$ lives in $(-2\\pi, 2\\pi)$.",
          ),
          L(
            "La única posibilidad es $x - y = 0$, es decir $x = y$: la segunda ecuación queda con una sola variable.",
            "The only possibility is $x - y = 0$, that is $x = y$: the second equation keeps a single variable.",
          ),
          L(
            "Con $x = y$ queda $2\\operatorname{sen}(x) = 1$; $\\operatorname{sen}(x) = \\frac{1}{2}$ tiene dos soluciones en $(0, 2\\pi)$ y ambas cuentan.",
            "With $x = y$ it becomes $2\\sin(x) = 1$; $\\sin(x) = \\frac{1}{2}$ has two solutions on $(0, 2\\pi)$ and both count.",
          ),
        ],
        answerDisplay: L(
          "$\\left\\{\\left(\\frac{\\pi}{6}, \\frac{\\pi}{6}\\right), \\left(\\frac{5\\pi}{6}, \\frac{5\\pi}{6}\\right)\\right\\}$",
          "$\\left\\{\\left(\\frac{\\pi}{6}, \\frac{\\pi}{6}\\right), \\left(\\frac{5\\pi}{6}, \\frac{5\\pi}{6}\\right)\\right\\}$",
        ),
        solution: [
          step(
            "given",
            "El sistema $\\cos(x - y) = 1$, $\\operatorname{sen}(x) + \\operatorname{sen}(y) = 1$, con $x, y \\in (0, 2\\pi)$.",
            "The system $\\cos(x - y) = 1$, $\\sin(x) + \\sin(y) = 1$, with $x, y \\in (0, 2\\pi)$.",
          ),
          step(
            "approach",
            "El coseno vale $1$ sólo en los múltiplos de $2\\pi$; como $x - y \\in (-2\\pi, 2\\pi)$, forzosamente $x = y$ y el sistema se reduce a una ecuación en seno.",
            "The cosine equals $1$ only at multiples of $2\\pi$; since $x - y \\in (-2\\pi, 2\\pi)$, necessarily $x = y$ and the system reduces to one sine equation.",
          ),
          step(
            "calculation",
            `$x = y \\Rightarrow \\operatorname{sen}(x) + \\operatorname{sen}(x) = 2\\operatorname{sen}(x) = 1 \\Rightarrow \\operatorname{sen}(x) = \\frac{1}{2}$<br>En $(0, 2\\pi)$: $x = \\frac{\\pi}{6}$ o $x = \\frac{5\\pi}{6}$ (la clave impresa los da en grados: $30^\\circ$ y $150^\\circ$)<br>Pares: $\\left(\\frac{\\pi}{6}, \\frac{\\pi}{6}\\right)$ y $\\left(\\frac{5\\pi}{6}, \\frac{5\\pi}{6}\\right)$.`,
            `$x = y \\Rightarrow \\sin(x) + \\sin(x) = 2\\sin(x) = 1 \\Rightarrow \\sin(x) = \\frac{1}{2}$<br>On $(0, 2\\pi)$: $x = \\frac{\\pi}{6}$ or $x = \\frac{5\\pi}{6}$ (the printed key gives them in degrees: $30^\\circ$ and $150^\\circ$)<br>Pairs: $\\left(\\frac{\\pi}{6}, \\frac{\\pi}{6}\\right)$ and $\\left(\\frac{5\\pi}{6}, \\frac{5\\pi}{6}\\right)$.`,
          ),
          step(
            "result",
            `$\\left\\{\\left(\\frac{\\pi}{6}, \\frac{\\pi}{6}\\right), \\left(\\frac{5\\pi}{6}, \\frac{5\\pi}{6}\\right)\\right\\}$ (clave impresa en grados: $(30^\\circ, 30^\\circ)$, $(150^\\circ, 150^\\circ)$ ✓). Comprobación: $\\cos\\left(\\frac{\\pi}{6} - \\frac{\\pi}{6}\\right) = \\cos 0 = 1$ ✓ y $\\operatorname{sen}\\frac{\\pi}{6} + \\operatorname{sen}\\frac{\\pi}{6} = \\frac{1}{2} + \\frac{1}{2} = 1$ ✓; igual para el segundo par, pues $\\operatorname{sen}\\frac{5\\pi}{6} = \\frac{1}{2}$ ✓. Los pares cruzados del distractor fallan: $\\cos\\left(\\frac{\\pi}{6} - \\frac{5\\pi}{6}\\right) = \\cos\\left(-\\frac{2\\pi}{3}\\right) = -\\frac{1}{2} \\neq 1$.`,
            `$\\left\\{\\left(\\frac{\\pi}{6}, \\frac{\\pi}{6}\\right), \\left(\\frac{5\\pi}{6}, \\frac{5\\pi}{6}\\right)\\right\\}$ (printed key in degrees: $(30^\\circ, 30^\\circ)$, $(150^\\circ, 150^\\circ)$ ✓). Check: $\\cos\\left(\\frac{\\pi}{6} - \\frac{\\pi}{6}\\right) = \\cos 0 = 1$ ✓ and $\\sin\\frac{\\pi}{6} + \\sin\\frac{\\pi}{6} = \\frac{1}{2} + \\frac{1}{2} = 1$ ✓; likewise for the second pair, since $\\sin\\frac{5\\pi}{6} = \\frac{1}{2}$ ✓. The crossed pairs of the distractor fail: $\\cos\\left(\\frac{\\pi}{6} - \\frac{5\\pi}{6}\\right) = \\cos\\left(-\\frac{2\\pi}{3}\\right) = -\\frac{1}{2} \\neq 1$.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 67b — sen(x+y) = 1; cos x·tan x = √3/2, x, y ∈ (0, 2π) →
     {(π/3, π/6), (2π/3, 11π/6)} (clave en grados: (60°, 30°), (120°, 330°)). */
  template(
    {
      id: "sys-espol-ch5-67b",
      subject: "math",
      topicId: "systems",
      subtopicId: "nonlinear",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 420,
      tags: ["trigonometric-system", "periodicity", "unit-circle"],
      prerequisites: ["nonlinear"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 67b",
        page: 550,
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "$\\left\\{\\left(\\frac{\\pi}{3}, \\frac{\\pi}{6}\\right), \\left(\\frac{2\\pi}{3}, \\frac{11\\pi}{6}\\right)\\right\\}$",
            "$\\left\\{\\left(\\frac{\\pi}{3}, \\frac{\\pi}{6}\\right), \\left(\\frac{2\\pi}{3}, \\frac{11\\pi}{6}\\right)\\right\\}$",
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            "Sólo $\\left(\\frac{\\pi}{3}, \\frac{\\pi}{6}\\right)$",
            "Only $\\left(\\frac{\\pi}{3}, \\frac{\\pi}{6}\\right)$",
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            "$\\left\\{\\left(\\frac{\\pi}{3}, \\frac{\\pi}{6}\\right), \\left(\\frac{2\\pi}{3}, \\frac{\\pi}{6}\\right)\\right\\}$",
            "$\\left\\{\\left(\\frac{\\pi}{3}, \\frac{\\pi}{6}\\right), \\left(\\frac{2\\pi}{3}, \\frac{\\pi}{6}\\right)\\right\\}$",
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            "$\\left\\{\\left(\\frac{\\pi}{3}, \\frac{5\\pi}{6}\\right)\\right\\}$",
            "$\\left\\{\\left(\\frac{\\pi}{3}, \\frac{5\\pi}{6}\\right)\\right\\}$",
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Sistema trigonométrico con dos familias",
          "Trigonometric system with two families",
        ),
        statement: L(
          "Resuelva, con $x, y \\in (0, 2\\pi)$: $$\\begin{cases} \\operatorname{sen}(x + y) = 1 \\\\ \\cos(x)\\tan(x) = \\tfrac{\\sqrt{3}}{2} \\end{cases}$$",
          "Solve, with $x, y \\in (0, 2\\pi)$: $$\\begin{cases} \\sin(x + y) = 1 \\\\ \\cos(x)\\tan(x) = \\tfrac{\\sqrt{3}}{2} \\end{cases}$$",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Simplifique la segunda ecuación: $\\cos(x)\\tan(x) = \\operatorname{sen}(x)$ (allí donde $\\cos(x) \\neq 0$).",
            "Simplify the second equation: $\\cos(x)\\tan(x) = \\sin(x)$ (wherever $\\cos(x) \\neq 0$).",
          ),
          L(
            "$\\operatorname{sen}(x) = \\tfrac{\\sqrt{3}}{2}$ tiene exactamente dos soluciones en $(0, 2\\pi)$: una en cada uno de los dos primeros cuadrantes.",
            "$\\sin(x) = \\tfrac{\\sqrt{3}}{2}$ has exactly two solutions on $(0, 2\\pi)$: one in each of the first two quadrants.",
          ),
          L(
            "Para cada $x$, la primera ecuación exige $x + y = \\frac{\\pi}{2} + 2k\\pi$: elija el entero $k$ que mantenga $y$ dentro de $(0, 2\\pi)$.",
            "For each $x$, the first equation forces $x + y = \\frac{\\pi}{2} + 2k\\pi$: choose the integer $k$ that keeps $y$ inside $(0, 2\\pi)$.",
          ),
        ],
        answerDisplay: L(
          "$\\left\\{\\left(\\frac{\\pi}{3}, \\frac{\\pi}{6}\\right), \\left(\\frac{2\\pi}{3}, \\frac{11\\pi}{6}\\right)\\right\\}$",
          "$\\left\\{\\left(\\frac{\\pi}{3}, \\frac{\\pi}{6}\\right), \\left(\\frac{2\\pi}{3}, \\frac{11\\pi}{6}\\right)\\right\\}$",
        ),
        solution: [
          step(
            "given",
            "El sistema $\\operatorname{sen}(x + y) = 1$, $\\cos(x)\\tan(x) = \\tfrac{\\sqrt{3}}{2}$, con $x, y \\in (0, 2\\pi)$.",
            "The system $\\sin(x + y) = 1$, $\\cos(x)\\tan(x) = \\tfrac{\\sqrt{3}}{2}$, with $x, y \\in (0, 2\\pi)$.",
          ),
          step(
            "approach",
            "Como $\\cos(x)\\tan(x) = \\operatorname{sen}(x)$, la segunda ecuación da las dos familias posibles de $x$; para cada una, la primera fija $y$ módulo $2\\pi$ y se elige la rama que cae en $(0, 2\\pi)$.",
            "Since $\\cos(x)\\tan(x) = \\sin(x)$, the second equation gives the two possible families of $x$; for each, the first one fixes $y$ modulo $2\\pi$ and we keep the branch falling inside $(0, 2\\pi)$.",
          ),
          step(
            "calculation",
            `$\\operatorname{sen}(x) = \\tfrac{\\sqrt{3}}{2} \\Rightarrow x = \\frac{\\pi}{3}$ o $x = \\frac{2\\pi}{3}$<br>$\\operatorname{sen}(x + y) = 1 \\Rightarrow x + y = \\frac{\\pi}{2} + 2k\\pi$<br>$x = \\frac{\\pi}{3}$: $y = \\frac{\\pi}{2} - \\frac{\\pi}{3} = \\frac{\\pi}{6}$ (con $k = 0$; $k = 1$ daría $\\frac{13\\pi}{6} > 2\\pi$)<br>$x = \\frac{2\\pi}{3}$: $y = \\frac{\\pi}{2} - \\frac{2\\pi}{3} = -\\frac{\\pi}{6} < 0$, así que $k = 1$: $y = -\\frac{\\pi}{6} + 2\\pi = \\frac{11\\pi}{6}$.`,
            `$\\sin(x) = \\tfrac{\\sqrt{3}}{2} \\Rightarrow x = \\frac{\\pi}{3}$ or $x = \\frac{2\\pi}{3}$<br>$\\sin(x + y) = 1 \\Rightarrow x + y = \\frac{\\pi}{2} + 2k\\pi$<br>$x = \\frac{\\pi}{3}$: $y = \\frac{\\pi}{2} - \\frac{\\pi}{3} = \\frac{\\pi}{6}$ (with $k = 0$; $k = 1$ would give $\\frac{13\\pi}{6} > 2\\pi$)<br>$x = \\frac{2\\pi}{3}$: $y = \\frac{\\pi}{2} - \\frac{2\\pi}{3} = -\\frac{\\pi}{6} < 0$, so $k = 1$: $y = -\\frac{\\pi}{6} + 2\\pi = \\frac{11\\pi}{6}$.`,
          ),
          step(
            "result",
            `$\\left\\{\\left(\\frac{\\pi}{3}, \\frac{\\pi}{6}\\right), \\left(\\frac{2\\pi}{3}, \\frac{11\\pi}{6}\\right)\\right\\}$ (clave impresa en grados: $(60^\\circ, 30^\\circ)$, $(120^\\circ, 330^\\circ)$ ✓). Comprobación: $\\operatorname{sen}\\left(\\frac{\\pi}{3} + \\frac{\\pi}{6}\\right) = \\operatorname{sen}\\frac{\\pi}{2} = 1$ ✓ y $\\operatorname{sen}\\frac{\\pi}{3} = \\tfrac{\\sqrt{3}}{2}$ ✓; para el segundo par, $\\operatorname{sen}\\left(\\frac{2\\pi}{3} + \\frac{11\\pi}{6}\\right) = \\operatorname{sen}\\frac{5\\pi}{2} = 1$ ✓ y $\\operatorname{sen}\\frac{2\\pi}{3} = \\tfrac{\\sqrt{3}}{2}$ ✓. El distractor con $y = \\frac{\\pi}{6}$ fijo falla: $\\operatorname{sen}\\left(\\frac{2\\pi}{3} + \\frac{\\pi}{6}\\right) = \\operatorname{sen}\\frac{5\\pi}{6} = \\frac{1}{2} \\neq 1$.`,
            `$\\left\\{\\left(\\frac{\\pi}{3}, \\frac{\\pi}{6}\\right), \\left(\\frac{2\\pi}{3}, \\frac{11\\pi}{6}\\right)\\right\\}$ (printed key in degrees: $(60^\\circ, 30^\\circ)$, $(120^\\circ, 330^\\circ)$ ✓). Check: $\\sin\\left(\\frac{\\pi}{3} + \\frac{\\pi}{6}\\right) = \\sin\\frac{\\pi}{2} = 1$ ✓ and $\\sin\\frac{\\pi}{3} = \\tfrac{\\sqrt{3}}{2}$ ✓; for the second pair, $\\sin\\left(\\frac{2\\pi}{3} + \\frac{11\\pi}{6}\\right) = \\sin\\frac{5\\pi}{2} = 1$ ✓ and $\\sin\\frac{2\\pi}{3} = \\tfrac{\\sqrt{3}}{2}$ ✓. The distractor with $y = \\frac{\\pi}{6}$ fixed fails: $\\sin\\left(\\frac{2\\pi}{3} + \\frac{\\pi}{6}\\right) = \\sin\\frac{5\\pi}{6} = \\frac{1}{2} \\neq 1$.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 68 — equilibrio p² + x² = 169; p = x + 7 → p = 12 (clave b).
     Opción impresa «17» descartada para mantener 4 (17² + 10² = 389 ≠ 169). */
  template(
    {
      id: "sys-espol-ch5-68",
      subject: "math",
      topicId: "systems",
      subtopicId: "applications",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["market-equilibrium", "quadratic", "modeling"],
      prerequisites: ["applications", "nonlinear"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 68",
        page: 551,
      },
      reasoning: "modeling",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$5$", "$5$"), correct: false },
        { id: "b", text: L("$12$", "$12$"), correct: true },
        { id: "c", text: L("$22$", "$22$"), correct: false },
        { id: "d", text: L("$19$", "$19$"), correct: false },
      ];
      return {
        skill: L(
          "Equilibrio de oferta y demanda",
          "Supply-demand equilibrium",
        ),
        statement: L(
          "La demanda para los bienes producidos por una industria está dada por la ecuación $p^{2} + x^{2} = 169$, donde $p$ es el precio y $x$ la cantidad demandada; la oferta está dada por $p = x + 7$. El punto de intersección de la demanda y la oferta se conoce como punto de equilibrio; el precio de equilibrio es:",
          "The demand for the goods produced by an industry is given by the equation $p^{2} + x^{2} = 169$, where $p$ is the price and $x$ the quantity demanded; the supply is given by $p = x + 7$. The intersection point of demand and supply is known as the equilibrium point; the equilibrium price is:",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "En el equilibrio, precio y cantidad cumplen a la vez demanda y oferta: sustituya $p = x + 7$ en $p^{2} + x^{2} = 169$.",
            "At equilibrium, price and quantity satisfy demand and supply at once: substitute $p = x + 7$ into $p^{2} + x^{2} = 169$.",
          ),
          L(
            "Tras expandir queda $2x^{2} + 14x - 120 = 0$: divida entre $2$ y factorice.",
            "After expanding you get $2x^{2} + 14x - 120 = 0$: divide by $2$ and factor.",
          ),
          L(
            "Descarte la raíz negativa (la cantidad demandada no puede serlo) y responda con el precio $p = x + 7$, no con $x$.",
            "Discard the negative root (the quantity demanded cannot be negative) and answer with the price $p = x + 7$, not with $x$.",
          ),
        ],
        answerDisplay: L(
          "El precio de equilibrio es $p = 12$",
          "The equilibrium price is $p = 12$",
        ),
        solution: [
          step(
            "given",
            "Demanda: $p^{2} + x^{2} = 169$; oferta: $p = x + 7$; el equilibrio es la intersección de ambas.",
            "Demand: $p^{2} + x^{2} = 169$; supply: $p = x + 7$; the equilibrium is the intersection of the two.",
          ),
          step(
            "approach",
            "Sustituir la oferta en la demanda para obtener una cuadrática en $x$; con la raíz positiva, el precio es $p = x + 7$.",
            "Substitute the supply into the demand to get a quadratic in $x$; with the positive root, the price is $p = x + 7$.",
          ),
          step(
            "calculation",
            `$(x + 7)^{2} + x^{2} = 169 \\Rightarrow x^{2} + 14x + 49 + x^{2} = 169 \\Rightarrow 2x^{2} + 14x - 120 = 0$<br>$x^{2} + 7x - 60 = 0 \\Rightarrow (x + 12)(x - 5) = 0 \\Rightarrow x = 5$ (se descarta $x = -12$)<br>$p = 5 + 7 = 12$.`,
            `$(x + 7)^{2} + x^{2} = 169 \\Rightarrow x^{2} + 14x + 49 + x^{2} = 169 \\Rightarrow 2x^{2} + 14x - 120 = 0$<br>$x^{2} + 7x - 60 = 0 \\Rightarrow (x + 12)(x - 5) = 0 \\Rightarrow x = 5$ (discarding $x = -12$)<br>$p = 5 + 7 = 12$.`,
          ),
          step(
            "result",
            `El precio de equilibrio es $p = 12$ (clave del libro, opción b ✓). Comprobación: $12^{2} + 5^{2} = 144 + 25 = 169$ ✓ y $12 = 5 + 7$ ✓. Los otros valores impresos fallan: $p = 22$ daría $x = 15$ y $22^{2} + 15^{2} = 709 \\neq 169$; $p = 19$ daría $x = 12$ y $19^{2} + 12^{2} = 505 \\neq 169$; $p = 5$ daría $x = -2$, cantidad negativa.`,
            `The equilibrium price is $p = 12$ (book key, option b ✓). Check: $12^{2} + 5^{2} = 144 + 25 = 169$ ✓ and $12 = 5 + 7$ ✓. The other printed values fail: $p = 22$ would give $x = 15$ and $22^{2} + 15^{2} = 709 \\neq 169$; $p = 19$ would give $x = 12$ and $19^{2} + 12^{2} = 505 \\neq 169$; $p = 5$ would give $x = -2$, a negative quantity.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 69 — trabajo conjunto 12 días, hijo +7 → padre 21, hijo 28 (clave). */
  template(
    {
      id: "sys-espol-ch5-69",
      subject: "math",
      topicId: "systems",
      subtopicId: "applications",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 330,
      tags: ["work-rate", "quadratic", "word-problem"],
      prerequisites: ["applications", "nonlinear"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 69",
        page: 551,
      },
      reasoning: "modeling",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "El padre $21$ días y el hijo $28$ días",
            "The father $21$ days and the son $28$ days",
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            "El padre $28$ días y el hijo $21$ días",
            "The father $28$ days and the son $21$ days",
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            "El padre $24$ días y el hijo $31$ días",
            "The father $24$ days and the son $31$ days",
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            "El padre $20$ días y el hijo $27$ días",
            "The father $20$ days and the son $27$ days",
          ),
          correct: false,
        },
      ];
      return {
        skill: L("Problema de trabajo conjunto", "Shared-work problem"),
        statement: L(
          "Un hombre y su hijo, trabajando juntos, pueden hacer una obra en $12$ días. Trabajando separadamente, el hijo tardaría $7$ días más que el padre en hacer él solo la obra. ¿Cuánto tiempo tardará cada uno trabajando por su cuenta?",
          "A man and his son, working together, can complete a job in $12$ days. Working separately, the son would take $7$ days more than the father to do the job alone. How long does each one take working on his own?",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Si el padre tarda $p$ días, en un día hace $\\frac{1}{p}$ de la obra; el hijo tarda $p + 7$ días.",
            "If the father takes $p$ days, in one day he does $\\frac{1}{p}$ of the job; the son takes $p + 7$ days.",
          ),
          L(
            "Juntos completan $\\frac{1}{12}$ de la obra por día: $\\frac{1}{p} + \\frac{1}{p+7} = \\frac{1}{12}$.",
            "Together they complete $\\frac{1}{12}$ of the job per day: $\\frac{1}{p} + \\frac{1}{p+7} = \\frac{1}{12}$.",
          ),
          L(
            "Multiplicando por $12p(p+7)$ llega a $p^{2} - 17p - 84 = 0$: busque dos números con producto $-84$ y suma $-17$.",
            "Multiplying by $12p(p+7)$ leads to $p^{2} - 17p - 84 = 0$: look for two numbers with product $-84$ and sum $-17$.",
          ),
        ],
        answerDisplay: L(
          "El padre $21$ días; el hijo $28$ días",
          "The father $21$ days; the son $28$ days",
        ),
        solution: [
          step(
            "given",
            "Juntos: $12$ días; el hijo tarda $7$ días más que el padre; incógnitas: los días de cada uno por separado.",
            "Together: $12$ days; the son takes $7$ days more than the father; unknowns: the days of each one separately.",
          ),
          step(
            "approach",
            "Modelar con tasas (fracción de obra por día): la suma de las tasas individuales es la tasa conjunta; eso da una cuadrática en los días $p$ del padre.",
            "Model with rates (fraction of the job per day): the sum of the individual rates is the joint rate; that gives a quadratic in the father's days $p$.",
          ),
          step(
            "calculation",
            `$\\frac{1}{p} + \\frac{1}{p+7} = \\frac{1}{12}$; multiplicando por $12p(p+7)$:<br>$12(p + 7) + 12p = p(p + 7) \\Rightarrow 24p + 84 = p^{2} + 7p$<br>$p^{2} - 17p - 84 = 0 \\Rightarrow (p - 21)(p + 4) = 0 \\Rightarrow p = 21$ (se descarta $p = -4$)<br>El hijo: $21 + 7 = 28$ días.`,
            `$\\frac{1}{p} + \\frac{1}{p+7} = \\frac{1}{12}$; multiplying by $12p(p+7)$:<br>$12(p + 7) + 12p = p(p + 7) \\Rightarrow 24p + 84 = p^{2} + 7p$<br>$p^{2} - 17p - 84 = 0 \\Rightarrow (p - 21)(p + 4) = 0 \\Rightarrow p = 21$ (discarding $p = -4$)<br>The son: $21 + 7 = 28$ days.`,
          ),
          step(
            "result",
            `El padre tarda $21$ días y el hijo $28$ días (clave impresa: «hijo 28 y padre 21 días» ✓). Comprobación: $\\frac{1}{21} + \\frac{1}{28} = \\frac{4}{84} + \\frac{3}{84} = \\frac{7}{84} = \\frac{1}{12}$ ✓ (juntos, $12$ días) y $28 = 21 + 7$ ✓. El distractor intercambiado viola la condición «el hijo tarda $7$ días más» ($21 \\neq 28 + 7$).`,
            `The father takes $21$ days and the son $28$ days (printed key: 'son 28 and father 21 days' ✓). Check: $\\frac{1}{21} + \\frac{1}{28} = \\frac{4}{84} + \\frac{3}{84} = \\frac{7}{84} = \\frac{1}{12}$ ✓ (together, $12$ days) and $28 = 21 + 7$ ✓. The swapped distractor violates the condition 'the son takes $7$ days more' ($21 \\neq 28 + 7$).`,
          ),
        ],
      };
    },
  ),

  /* 5 · 70 — resistencias serie 25 Ω, paralelo 6 Ω → 15 Ω y 10 Ω (clave). */
  template(
    {
      id: "sys-espol-ch5-70",
      subject: "math",
      topicId: "systems",
      subtopicId: "applications",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["resistors", "parallel", "sum-product"],
      prerequisites: ["applications", "nonlinear"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 70",
        page: 551,
      },
      reasoning: "modeling",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "$15\\ \\Omega$ y $10\\ \\Omega$",
            "$15\\ \\Omega$ and $10\\ \\Omega$",
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            "$20\\ \\Omega$ y $5\\ \\Omega$",
            "$20\\ \\Omega$ and $5\\ \\Omega$",
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            "$12{,}5\\ \\Omega$ y $12{,}5\\ \\Omega$",
            "$12.5\\ \\Omega$ and $12.5\\ \\Omega$",
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            "$18\\ \\Omega$ y $7\\ \\Omega$",
            "$18\\ \\Omega$ and $7\\ \\Omega$",
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Resistencias en serie y paralelo",
          "Series and parallel resistors",
        ),
        statement: L(
          "Dos resistencias conectadas en serie dan una resistencia total de $25\\ \\Omega$ y conectadas en paralelo dan una resistencia equivalente de $6\\ \\Omega$. ¿Cuántos ohmios tiene cada resistencia separadamente? [Si $r_{1}$ y $r_{2}$ son los ohmios de cada resistencia, $R$ la resistencia total cuando se conectan en serie y $r$ la equivalente cuando se conectan en paralelo, se sabe que $r_{1} + r_{2} = R$ y que $\\frac{1}{r_{1}} + \\frac{1}{r_{2}} = \\frac{1}{r}$.]",
          "Two resistors connected in series give a total resistance of $25\\ \\Omega$, and connected in parallel they give an equivalent resistance of $6\\ \\Omega$. How many ohms does each resistor have separately? [If $r_{1}$ and $r_{2}$ are the ohms of each resistor, $R$ the total resistance when connected in series and $r$ the equivalent one when connected in parallel, we know $r_{1} + r_{2} = R$ and $\\frac{1}{r_{1}} + \\frac{1}{r_{2}} = \\frac{1}{r}$.]",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Serie: $r_{1} + r_{2} = 25$. Paralelo: $\\frac{1}{r_{1}} + \\frac{1}{r_{2}} = \\frac{1}{6}$.",
            "Series: $r_{1} + r_{2} = 25$. Parallel: $\\frac{1}{r_{1}} + \\frac{1}{r_{2}} = \\frac{1}{6}$.",
          ),
          L(
            "La del paralelo se reescribe como $\\frac{r_{1} + r_{2}}{r_{1} r_{2}} = \\frac{1}{6}$: como ya conoce la suma, sale el producto.",
            "The parallel one rewrites as $\\frac{r_{1} + r_{2}}{r_{1} r_{2}} = \\frac{1}{6}$: since the sum is known, the product follows.",
          ),
          L(
            "Con suma $25$ y producto $150$, las resistencias son las raíces de $u^{2} - 25u + 150 = 0$.",
            "With sum $25$ and product $150$, the resistances are the roots of $u^{2} - 25u + 150 = 0$.",
          ),
        ],
        answerDisplay: L(
          "$15\\ \\Omega$ y $10\\ \\Omega$",
          "$15\\ \\Omega$ and $10\\ \\Omega$",
        ),
        solution: [
          step(
            "given",
            "Serie: $r_{1} + r_{2} = 25$; paralelo: $\\frac{1}{r_{1}} + \\frac{1}{r_{2}} = \\frac{1}{6}$.",
            "Series: $r_{1} + r_{2} = 25$; parallel: $\\frac{1}{r_{1}} + \\frac{1}{r_{2}} = \\frac{1}{6}$.",
          ),
          step(
            "approach",
            "Reescribir la condición del paralelo como cociente para despejar el producto $r_{1} r_{2}$ y resolver el juego suma-producto con una cuadrática.",
            "Rewrite the parallel condition as a quotient to solve for the product $r_{1} r_{2}$ and settle the sum-product game with a quadratic.",
          ),
          step(
            "calculation",
            `$\\frac{r_{1} + r_{2}}{r_{1} r_{2}} = \\frac{1}{6} \\Rightarrow r_{1} r_{2} = 6(r_{1} + r_{2}) = 6\\cdot 25 = 150$<br>$u^{2} - 25u + 150 = 0 \\Rightarrow (u - 15)(u - 10) = 0 \\Rightarrow u = 15$ o $u = 10$<br>Las resistencias son $15\\ \\Omega$ y $10\\ \\Omega$.`,
            `$\\frac{r_{1} + r_{2}}{r_{1} r_{2}} = \\frac{1}{6} \\Rightarrow r_{1} r_{2} = 6(r_{1} + r_{2}) = 6\\cdot 25 = 150$<br>$u^{2} - 25u + 150 = 0 \\Rightarrow (u - 15)(u - 10) = 0 \\Rightarrow u = 15$ or $u = 10$<br>The resistors are $15\\ \\Omega$ and $10\\ \\Omega$.`,
          ),
          step(
            "result",
            `Las resistencias son $15\\ \\Omega$ y $10\\ \\Omega$ (clave impresa exacta ✓). Comprobación: $15 + 10 = 25$ ✓ y el paralelo vale $\\frac{15\\cdot 10}{15 + 10} = \\frac{150}{25} = 6\\ \\Omega$ ✓. Los distractores fallan el paralelo: $20\\cdot 5/(20+5) = 4 \\neq 6$; $12{,}5^{2}/25 = 6{,}25 \\neq 6$; $18\\cdot 7/25 = 5{,}04 \\neq 6$.`,
            `The resistors are $15\\ \\Omega$ and $10\\ \\Omega$ (exact printed key ✓). Check: $15 + 10 = 25$ ✓ and the parallel combination gives $\\frac{15\\cdot 10}{15 + 10} = \\frac{150}{25} = 6\\ \\Omega$ ✓. The distractors fail the parallel test: $20\\cdot 5/(20+5) = 4 \\neq 6$; $12.5^{2}/25 = 6.25 \\neq 6$; $18\\cdot 7/25 = 5.04 \\neq 6$.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 72a — intersección de 5x+3y = 105 con 2x+4y = 70 → (15, 10) (clave). */
  template(
    {
      id: "sys-espol-ch5-72a",
      subject: "math",
      topicId: "systems",
      subtopicId: "inequalities",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 210,
      tags: ["feasible-region", "intersection", "linear-inequalities"],
      prerequisites: ["inequalities", "elimination"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 72a",
        page: 551,
      },
      reasoning: "modeling",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$(15,\\ 10)$", "$(15,\\ 10)$"), correct: true },
        { id: "b", text: L("$(10,\\ 15)$", "$(10,\\ 15)$"), correct: false },
        { id: "c", text: L("$(15,\\ 12)$", "$(15,\\ 12)$"), correct: false },
        { id: "d", text: L("$(21,\\ 0)$", "$(21,\\ 0)$"), correct: false },
      ];
      return {
        skill: L(
          "Vértices de una región factible",
          "Vertices of a feasible region",
        ),
        statement: L(
          "Para el siguiente sistema de desigualdades $$\\begin{cases} 2x + 4y \\le 70 \\\\ 5x + 3y \\le 105 \\\\ x \\ge 0 \\\\ y \\ge 0 \\end{cases}$$ determine el punto de intersección entre $5x + 3y = 105$ y $2x + 4y = 70$.",
          "For the following system of inequalities $$\\begin{cases} 2x + 4y \\le 70 \\\\ 5x + 3y \\le 105 \\\\ x \\ge 0 \\\\ y \\ge 0 \\end{cases}$$ determine the intersection point between $5x + 3y = 105$ and $2x + 4y = 70$.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El punto pedido resuelve a la vez las dos rectas frontera: $5x + 3y = 105$ y $2x + 4y = 70$.",
            "The requested point solves both boundary lines at once: $5x + 3y = 105$ and $2x + 4y = 70$.",
          ),
          L(
            "Despeje $x = 35 - 2y$ de la segunda ecuación y sustitúyala en la primera.",
            "Solve $x = 35 - 2y$ from the second equation and substitute it into the first.",
          ),
          L(
            "Queda $175 - 7y = 105$: una ecuación de primer grado en $y$.",
            "You are left with $175 - 7y = 105$: a first-degree equation in $y$.",
          ),
        ],
        answerDisplay: L("$(15,\\ 10)$", "$(15,\\ 10)$"),
        solution: [
          step(
            "given",
            "Las fronteras $5x + 3y = 105$ y $2x + 4y = 70$ del sistema de inecuaciones (con $x \\ge 0$, $y \\ge 0$).",
            "The boundaries $5x + 3y = 105$ and $2x + 4y = 70$ of the inequality system (with $x \\ge 0$, $y \\ge 0$).",
          ),
          step(
            "approach",
            "Resolver el sistema lineal $2 \\times 2$ formado por las dos fronteras, por sustitución.",
            "Solve the $2 \\times 2$ linear system formed by the two boundaries, by substitution.",
          ),
          step(
            "calculation",
            `De $2x + 4y = 70$: $x = 35 - 2y$<br>$5(35 - 2y) + 3y = 105 \\Rightarrow 175 - 10y + 3y = 105 \\Rightarrow -7y = -70 \\Rightarrow y = 10$<br>$x = 35 - 2\\cdot 10 = 15$.`,
            `From $2x + 4y = 70$: $x = 35 - 2y$<br>$5(35 - 2y) + 3y = 105 \\Rightarrow 175 - 10y + 3y = 105 \\Rightarrow -7y = -70 \\Rightarrow y = 10$<br>$x = 35 - 2\\cdot 10 = 15$.`,
          ),
          step(
            "result",
            `El punto de intersección es $(15,\\ 10)$ (clave impresa exacta ✓). Comprobación: $5\\cdot 15 + 3\\cdot 10 = 75 + 30 = 105$ ✓ y $2\\cdot 15 + 4\\cdot 10 = 30 + 40 = 70$ ✓ (además cumple $x, y \\ge 0$).`,
            `The intersection point is $(15,\\ 10)$ (exact printed key ✓). Check: $5\\cdot 15 + 3\\cdot 10 = 75 + 30 = 105$ ✓ and $2\\cdot 15 + 4\\cdot 10 = 30 + 40 = 70$ ✓ (it also satisfies $x, y \\ge 0$).`,
          ),
        ],
      };
    },
  ),

  /* 5 · 73 — traducción a inecuaciones → clave b: P ≤ 80−Q; P ≥ Q; Q ≥ 20.
     Opción impresa «P ≤ 80+Q; P ≥ Q; Q ≥ 20» (la d del libro) descartada
     para mantener 4. */
  template(
    {
      id: "sys-espol-ch5-73",
      subject: "math",
      topicId: "systems",
      subtopicId: "inequalities",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 270,
      tags: ["modeling", "linear-inequalities", "translation"],
      prerequisites: ["inequalities", "applications"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 73",
        page: 552,
      },
      reasoning: "modeling",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "$P \\le 80 - Q$; $P \\le Q$; $Q \\le 20$",
            "$P \\le 80 - Q$; $P \\le Q$; $Q \\le 20$",
          ),
          correct: false,
        },
        {
          id: "b",
          text: L(
            "$P \\le 80 - Q$; $P \\ge Q$; $Q \\ge 20$",
            "$P \\le 80 - Q$; $P \\ge Q$; $Q \\ge 20$",
          ),
          correct: true,
        },
        {
          id: "c",
          text: L(
            "$P \\le 80 - Q$; $P \\ge Q$; $Q \\le 20$",
            "$P \\le 80 - Q$; $P \\ge Q$; $Q \\le 20$",
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            "$P \\le 80 + Q$; $P \\le Q$; $Q \\ge 20$",
            "$P \\le 80 + Q$; $P \\le Q$; $Q \\ge 20$",
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Modelar condiciones como inecuaciones",
          "Modeling conditions as inequalities",
        ),
        statement: L(
          "Una máquina puede fabricar cajas de tornillos o cajas de pernos. Puede funcionar durante un máximo de $80$ horas semanales y lleva una hora fabricar una caja. Debe fabricar no menos de $20$ cajas de tornillos por semana y el número de cajas de pernos $P$ no debe ser menor que el número de cajas de tornillos $Q$. El sistema que representa las condiciones es:",
          "A machine can make boxes of screws or boxes of bolts. It can run for at most $80$ hours per week and it takes one hour to make a box. It must make no fewer than $20$ boxes of screws per week, and the number of bolt boxes $P$ must not be smaller than the number of screw boxes $Q$. The system that represents the conditions is:",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Traduzca cada condición por separado: horas semanales disponibles, mínimo de cajas de tornillos y comparación entre $P$ y $Q$.",
            "Translate each condition separately: weekly hours available, the minimum of screw boxes, and the comparison between $P$ and $Q$.",
          ),
          L(
            "«Máximo $80$ horas, una hora por caja» significa que el total de cajas $P + Q$ no pasa de $80$.",
            "'At most $80$ hours, one hour per box' means the total number of boxes $P + Q$ does not exceed $80$.",
          ),
          L(
            "«No menos de $20$ cajas de tornillos» acota $Q$ por abajo; «pernos no menores que tornillos» ordena $P$ frente a $Q$: cuida el sentido de cada desigualdad.",
            "'No fewer than $20$ screw boxes' bounds $Q$ from below; 'bolts not fewer than screws' orders $P$ against $Q$: mind the direction of each inequality.",
          ),
        ],
        answerDisplay: L(
          "$P \\le 80 - Q$; $P \\ge Q$; $Q \\ge 20$",
          "$P \\le 80 - Q$; $P \\ge Q$; $Q \\ge 20$",
        ),
        solution: [
          step(
            "given",
            "Máximo $80$ horas semanales a una hora por caja; no menos de $20$ cajas de tornillos; pernos $P$ no menos que tornillos $Q$.",
            "At most $80$ hours per week at one hour per box; no fewer than $20$ screw boxes; bolts $P$ not fewer than screws $Q$.",
          ),
          step(
            "approach",
            "Traducir frase por frase: horas → $P + Q \\le 80$; mínimo de tornillos → $Q \\ge 20$; comparación → $P \\ge Q$; y refutar las opciones que invierten algún sentido.",
            "Translate phrase by phrase: hours → $P + Q \\le 80$; the screw minimum → $Q \\ge 20$; the comparison → $P \\ge Q$; then refute the options that reverse some direction.",
          ),
          step(
            "calculation",
            `Horas: $P + Q \\le 80 \\Rightarrow P \\le 80 - Q$<br>Tornillos: $Q \\ge 20$<br>Comparación: $P \\ge Q$<br>Refutaciones: «$P \\le Q$» invierte la comparación; «$Q \\le 20$» invierte el mínimo; «$80 + Q$» no corresponde al total de horas disponibles.`,
            `Hours: $P + Q \\le 80 \\Rightarrow P \\le 80 - Q$<br>Screws: $Q \\ge 20$<br>Comparison: $P \\ge Q$<br>Refutations: '$P \\le Q$' reverses the comparison; '$Q \\le 20$' reverses the minimum; '$80 + Q$' does not match the available hours.`,
          ),
          step(
            "result",
            `El sistema es $P \\le 80 - Q$; $P \\ge Q$; $Q \\ge 20$ (clave del libro, opción b ✓). Comprobación con un punto factible: $Q = 30$, $P = 40$ cumple $40 + 30 = 70 \\le 80$ ✓, $30 \\ge 20$ ✓ y $40 \\ge 30$ ✓; y con uno no factible: $Q = 25$, $P = 60$ da $60 + 25 = 85 > 80$ ✗.`,
            `The system is $P \\le 80 - Q$; $P \\ge Q$; $Q \\ge 20$ (book key, option b ✓). Check with a feasible point: $Q = 30$, $P = 40$ satisfies $40 + 30 = 70 \\le 80$ ✓, $30 \\ge 20$ ✓ and $40 \\ge 30$ ✓; and with an infeasible one: $Q = 25$, $P = 60$ gives $60 + 25 = 85 > 80$ ✗.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 76 — y ≥ |x|; x²+y² ≤ 9; y+x² ≥ 0 → subconjunto de los cuadrantes
     I y II (clave e). Opción impresa «I y III» descartada para mantener 4. */
  template(
    {
      id: "sys-espol-ch5-76",
      subject: "math",
      topicId: "systems",
      subtopicId: "inequalities",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 270,
      tags: ["region", "absolute-value", "circle", "quadrants"],
      prerequisites: ["inequalities", "graphing"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 76",
        page: 552,
      },
      reasoning: "graphical",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("I y IV", "I and IV"), correct: false },
        { id: "b", text: L("II y IV", "II and IV"), correct: false },
        { id: "c", text: L("II y III", "II and III"), correct: false },
        { id: "d", text: L("I y II", "I and II"), correct: true },
      ];
      return {
        skill: L(
          "Región de un sistema no lineal y cuadrantes",
          "Region of a nonlinear system and quadrants",
        ),
        statement: L(
          "La región del plano cartesiano que corresponde al conjunto solución del sistema de desigualdades $$\\begin{cases} y \\ge |x| \\\\ x^{2} + y^{2} \\le 9 \\\\ y + x^{2} \\ge 0 \\end{cases}$$ es un subconjunto de los cuadrantes:",
          "The region of the Cartesian plane corresponding to the solution set of the system of inequalities $$\\begin{cases} y \\ge |x| \\\\ x^{2} + y^{2} \\le 9 \\\\ y + x^{2} \\ge 0 \\end{cases}$$ is a subset of the quadrants:",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Empiece por la condición más restrictiva: $y \\ge |x|$. Como $|x| \\ge 0$, ¿qué signo tiene $y$ en toda la región?",
            "Start with the most restrictive condition: $y \\ge |x|$. Since $|x| \\ge 0$, what sign does $y$ have over the whole region?",
          ),
          L(
            "Con $y \\ge 0$, la inecuación $y + x^{2} \\ge 0$ se cumple automáticamente; el círculo $x^{2} + y^{2} = 9$ sólo acota el tamaño de la región.",
            "With $y \\ge 0$, the inequality $y + x^{2} \\ge 0$ holds automatically; the circle $x^{2} + y^{2} = 9$ only bounds the size of the region.",
          ),
          L(
            "Compruebe si la región tiene puntos con $x > 0$ y con $x < 0$ (por ejemplo, a lo largo de la recta $y = 2$).",
            "Check whether the region has points with $x > 0$ and with $x < 0$ (for instance, along the line $y = 2$).",
          ),
        ],
        answerDisplay: L(
          "Cuadrantes I y II",
          "Quadrants I and II",
        ),
        solution: [
          step(
            "given",
            "El sistema $y \\ge |x|$, $x^{2} + y^{2} \\le 9$, $y + x^{2} \\ge 0$; pregunta: en qué cuadrantes vive su región solución.",
            "The system $y \\ge |x|$, $x^{2} + y^{2} \\le 9$, $y + x^{2} \\ge 0$; the question is which quadrants its solution region lives in.",
          ),
          step(
            "approach",
            "Determinar el signo de $y$ impuesto por $y \\ge |x|$ y luego ver a qué lado del eje $y$ llegan los puntos de la región; las cotas restantes sólo recortan.",
            "Determine the sign of $y$ forced by $y \\ge |x|$ and then see on which side of the $y$-axis the region reaches; the remaining bounds only trim it.",
          ),
          step(
            "calculation",
            `$|x| \\ge 0$ y $y \\ge |x|$ obligan a $y \\ge 0$ en toda la región: no hay puntos en los cuadrantes III y IV (donde $y < 0$).<br>Con $y \\ge 0$: $y + x^{2} \\ge 0$ se cumple sola, y $x^{2} + y^{2} \\le 9$ recorta al disco de radio $3$.<br>Puntos de prueba: $(1, 2)$: $2 \\ge 1$ ✓, $1 + 4 = 5 \\le 9$ ✓ (cuadrante I); $(-1, 2)$: $2 \\ge 1$ ✓, $5 \\le 9$ ✓ (cuadrante II).`,
            `$|x| \\ge 0$ and $y \\ge |x|$ force $y \\ge 0$ over the whole region: there are no points in quadrants III and IV (where $y < 0$).<br>With $y \\ge 0$: $y + x^{2} \\ge 0$ holds by itself, and $x^{2} + y^{2} \\le 9$ trims to the disk of radius $3$.<br>Test points: $(1, 2)$: $2 \\ge 1$ ✓, $1 + 4 = 5 \\le 9$ ✓ (quadrant I); $(-1, 2)$: $2 \\ge 1$ ✓, $5 \\le 9$ ✓ (quadrant II).`,
          ),
          step(
            "result",
            `La región es un subconjunto de los cuadrantes I y II (clave del libro, opción e ✓). Comprobación: $(1, 2)$ está en la región y en el cuadrante I ✓ y $(-1, 2)$ está en la región y en el cuadrante II ✓; en cambio $(2, -1)$ queda excluido por $y \\ge |x|$ ($-1 < |2|$), así que nada cae en los cuadrantes III o IV.`,
            `The region is a subset of quadrants I and II (book key, option e ✓). Check: $(1, 2)$ lies in the region and in quadrant I ✓ and $(-1, 2)$ lies in the region and in quadrant II ✓; by contrast $(2, -1)$ is excluded by $y \\ge |x|$ ($-1 < |2|$), so nothing falls into quadrants III or IV.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 80 — y ≥ x²−2x; y > 1−|x−1| → A_p ⊆ {x ∈ ℝ, y > 0} (clave e).
     Opción impresa «A_p ⊆ {(x, y)/x > 0, y ∈ ℝ}» (la d del libro)
     descartada para mantener 4. */
  template(
    {
      id: "sys-espol-ch5-80",
      subject: "math",
      topicId: "systems",
      subtopicId: "inequalities",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 330,
      tags: ["region", "truth-set", "parabola", "absolute-value"],
      prerequisites: ["inequalities", "graphing"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 80",
        page: 554,
      },
      reasoning: "graphical",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "$A_{p(x,y)} \\subseteq \\{(x, y)/x \\ge 0,\\ y \\ge 0\\}$",
            "$A_{p(x,y)} \\subseteq \\{(x, y)/x \\ge 0,\\ y \\ge 0\\}$",
          ),
          correct: false,
        },
        {
          id: "b",
          text: L(
            "$(1, 3) \\notin A_{p(x,y)}$",
            "$(1, 3) \\notin A_{p(x,y)}$",
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            "$(1, 1) \\in A_{p(x,y)}$",
            "$(1, 1) \\in A_{p(x,y)}$",
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            "$A_{p(x,y)} \\subseteq \\{(x, y)/x \\in \\mathbb{R},\\ y > 0\\}$",
            "$A_{p(x,y)} \\subseteq \\{(x, y)/x \\in \\mathbb{R},\\ y > 0\\}$",
          ),
          correct: true,
        },
      ];
      return {
        skill: L(
          "Conjunto de verdad y contraejemplos",
          "Truth set and counterexamples",
        ),
        statement: L(
          "Si $p(x, y): y \\ge x^{2} - 2x$; $y > 1 - |x - 1|$, con $x, y \\in \\mathbb{R}$, entonces es verdad que:",
          "If $p(x, y): y \\ge x^{2} - 2x$; $y > 1 - |x - 1|$, with $x, y \\in \\mathbb{R}$, then it is true that:",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "$A_{p(x,y)}$ reúne los puntos que cumplen las dos condiciones a la vez; una inclusión se refuta con un solo contraejemplo.",
            "$A_{p(x,y)}$ gathers the points satisfying both conditions at once; an inclusion is refuted by a single counterexample.",
          ),
          L(
            "Evalúe los puntos candidatos de las opciones, $(1, 3)$ y $(1, 1)$, en las dos desigualdades, cuidando la estricta.",
            "Evaluate the candidate points of the options, $(1, 3)$ and $(1, 1)$, on both inequalities, watching the strict one.",
          ),
          L(
            "Para la inclusión restante suponga $y \\le 0$: la desigualdad estricta obliga a $|x - 1| > 1$ y la parábola a $x(x - 2) \\le 0$; compare los rangos de $x$.",
            "For the remaining inclusion assume $y \\le 0$: the strict inequality forces $|x - 1| > 1$ and the parabola forces $x(x - 2) \\le 0$; compare the ranges of $x$.",
          ),
        ],
        answerDisplay: L(
          "$A_{p(x,y)} \\subseteq \\{(x, y)/x \\in \\mathbb{R},\\ y > 0\\}$",
          "$A_{p(x,y)} \\subseteq \\{(x, y)/x \\in \\mathbb{R},\\ y > 0\\}$",
        ),
        solution: [
          step(
            "given",
            "El predicado $p(x, y)$: $y \\ge x^{2} - 2x$ y $y > 1 - |x - 1|$; hay que señalar la afirmación verdadera sobre $A_{p(x,y)}$.",
            "The predicate $p(x, y)$: $y \\ge x^{2} - 2x$ and $y > 1 - |x - 1|$; we must point out the true statement about $A_{p(x,y)}$.",
          ),
          step(
            "approach",
            "Refutar las tres primeras opciones con puntos concretos y demostrar la cuarta por contradicción: suponer que algún punto de $A_{p(x,y)}$ tiene $y \\le 0$.",
            "Refute the first three options with concrete points and prove the fourth by contradiction: assume some point of $A_{p(x,y)}$ has $y \\le 0$.",
          ),
          step(
            "calculation",
            `$(1, 3)$: $3 \\ge 1 - 2 = -1$ ✓ y $3 > 1 - 0 = 1$ ✓, así que $(1, 3) \\in A_{p(x,y)}$ (refuta la opción b).<br>$(1, 1)$: $1 \\ge -1$ ✓ pero $1 > 1$ es falso por ser estricta: $(1, 1) \\notin A_{p(x,y)}$ (refuta la c).<br>$(-2, 9)$: $9 \\ge 4 + 4 = 8$ ✓ y $9 > 1 - 3 = -2$ ✓: hay puntos con $x < 0$ (refuta la a).<br>Inclusión: si $y \\le 0$, de $y > 1 - |x - 1|$ sale $|x - 1| > 1$, o sea $x < 0$ o $x > 2$; y de $x^{2} - 2x \\le y \\le 0$ sale $x(x - 2) \\le 0$, o sea $0 \\le x \\le 2$: contradicción, luego todo punto de $A_{p(x,y)}$ cumple $y > 0$.`,
            `$(1, 3)$: $3 \\ge 1 - 2 = -1$ ✓ and $3 > 1 - 0 = 1$ ✓, so $(1, 3) \\in A_{p(x,y)}$ (refutes option b).<br>$(1, 1)$: $1 \\ge -1$ ✓ but $1 > 1$ is false because the inequality is strict: $(1, 1) \\notin A_{p(x,y)}$ (refutes c).<br>$(-2, 9)$: $9 \\ge 4 + 4 = 8$ ✓ and $9 > 1 - 3 = -2$ ✓: there are points with $x < 0$ (refutes a).<br>Inclusion: if $y \\le 0$, from $y > 1 - |x - 1|$ one gets $|x - 1| > 1$, i.e. $x < 0$ or $x > 2$; and from $x^{2} - 2x \\le y \\le 0$ one gets $x(x - 2) \\le 0$, i.e. $0 \\le x \\le 2$: contradiction, hence every point of $A_{p(x,y)}$ has $y > 0$.`,
          ),
          step(
            "result",
            `La afirmación verdadera es $A_{p(x,y)} \\subseteq \\{(x, y)/x \\in \\mathbb{R},\\ y > 0\\}$ (clave del libro, opción e ✓): la región entera queda por encima del eje $x$. Comprobación de frontera: en $x = 0$ ambas cotas valen $0$ y la estricta exige $y > 0$ ✓; y los puntos de prueba $(1, 3) \\in A_{p(x,y)}$, $(1, 1) \\notin A_{p(x,y)}$ y $(-2, 9) \\in A_{p(x,y)}$ confirman las refutaciones.`,
            `The true statement is $A_{p(x,y)} \\subseteq \\{(x, y)/x \\in \\mathbb{R},\\ y > 0\\}$ (book key, option e ✓): the whole region lies above the $x$-axis. Boundary check: at $x = 0$ both bounds equal $0$ and the strict one demands $y > 0$ ✓; and the test points $(1, 3) \\in A_{p(x,y)}$, $(1, 1) \\notin A_{p(x,y)}$ and $(-2, 9) \\in A_{p(x,y)}$ confirm the refutations.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 81 — y ≥ x²+1; x+y < 2; y−x > 2 → sólo cuadrante II (clave c).
     Opción impresa «En todos los cuadrantes» (la e del libro) descartada
     para mantener 4. NOTA: y queda acotado sólo por abajo (y ≥ 1); la cota
     «2y < 4» de la suma directa NO es válida (la región contiene puntos
     con y > 2, p. ej. (−4/5, 5/2)). */
  template(
    {
      id: "sys-espol-ch5-81",
      subject: "math",
      topicId: "systems",
      subtopicId: "inequalities",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 360,
      tags: ["truth-set", "quadrants", "conjunction"],
      prerequisites: ["inequalities", "graphing"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 81",
        page: 554,
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "En el I y II cuadrante del plano cartesiano",
            "In quadrants I and II of the Cartesian plane",
          ),
          correct: false,
        },
        {
          id: "b",
          text: L(
            "En el II y III cuadrante del plano cartesiano",
            "In quadrants II and III of the Cartesian plane",
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            "Sólo en el II cuadrante del plano cartesiano",
            "Only in quadrant II of the Cartesian plane",
          ),
          correct: true,
        },
        {
          id: "d",
          text: L(
            "Sólo en el I cuadrante del plano cartesiano",
            "Only in quadrant I of the Cartesian plane",
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Conjunción de predicados y cuadrantes",
          "Conjunction of predicates and quadrants",
        ),
        statement: L(
          "Si $R_{ex} = R_{ey} = \\mathbb{R}$ y $p(x, y)$ es la conjunción de los predicados $$\\begin{cases} y \\ge x^{2} + 1 \\\\ x + y < 2 \\\\ y - x > 2 \\end{cases}$$ entonces los elementos de $A_{p(x,y)}$ están:",
          "If $R_{ex} = R_{ey} = \\mathbb{R}$ and $p(x, y)$ is the conjunction of the predicates $$\\begin{cases} y \\ge x^{2} + 1 \\\\ x + y < 2 \\\\ y - x > 2 \\end{cases}$$ then the elements of $A_{p(x,y)}$ are:",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "De $y \\ge x^{2} + 1$, ¿qué cota inferior tiene $y$ en toda la región? Atienda al signo.",
            "From $y \\ge x^{2} + 1$, what lower bound does $y$ have over the whole region? Mind the sign.",
          ),
          L(
            "Las dos desigualdades estrictas se combinan: multiplique una de ellas por $-1$ y súmelas miembro a miembro.",
            "The two strict inequalities combine: multiply one of them by $-1$ and add them member by member.",
          ),
          L(
            "La suma de $x + y < 2$ con $x - y < -2$ revela el signo de $x$ (sale $2x < 0$).",
            "Adding $x + y < 2$ and $x - y < -2$ reveals the sign of $x$ (it comes out as $2x < 0$).",
          ),
        ],
        answerDisplay: L(
          "Sólo en el II cuadrante del plano cartesiano",
          "Only in quadrant II of the Cartesian plane",
        ),
        solution: [
          step(
            "given",
            "La conjunción $y \\ge x^{2} + 1$, $x + y < 2$, $y - x > 2$, con $x, y \\in \\mathbb{R}$; pregunta: en qué cuadrantes están los elementos de $A_{p(x,y)}$.",
            "The conjunction $y \\ge x^{2} + 1$, $x + y < 2$, $y - x > 2$, with $x, y \\in \\mathbb{R}$; the question is which quadrants the elements of $A_{p(x,y)}$ lie in.",
          ),
          step(
            "approach",
            "Acotar $y$ por abajo con la parábola y el signo de $x$ combinando las dos desigualdades estrictas (una de ellas multiplicada por $-1$); al final mostrar que la región no es vacía.",
            "Bound $y$ from below with the parabola and get the sign of $x$ by combining the two strict inequalities (one of them multiplied by $-1$); finally show the region is non-empty.",
          ),
          step(
            "calculation",
            `$y \\ge x^{2} + 1 \\ge 1 > 0$ en toda la región (nada con $y \\le 0$).<br>De $x + y < 2$ y, multiplicada por $-1$, $x - y < -2$: sumando, $2x < 0 \\Rightarrow x < 0$ (nada con $x \\ge 0$).<br>Entonces todo punto cumple $x < 0 < 1 \\le y$: cuadrante II. La región no es vacía: $\\left(-\\frac{4}{5},\\ 2\\right)$ cumple $2 \\ge \\frac{16}{25} + 1 = \\frac{41}{25}$ ✓, $-\\frac{4}{5} + 2 = \\frac{6}{5} < 2$ ✓ y $2 - \\left(-\\frac{4}{5}\\right) = \\frac{14}{5} > 2$ ✓.`,
            `$y \\ge x^{2} + 1 \\ge 1 > 0$ over the whole region (nothing with $y \\le 0$).<br>From $x + y < 2$ and, multiplied by $-1$, $x - y < -2$: adding, $2x < 0 \\Rightarrow x < 0$ (nothing with $x \\ge 0$).<br>So every point satisfies $x < 0 < 1 \\le y$: quadrant II. The region is non-empty: $\\left(-\\frac{4}{5},\\ 2\\right)$ satisfies $2 \\ge \\frac{16}{25} + 1 = \\frac{41}{25}$ ✓, $-\\frac{4}{5} + 2 = \\frac{6}{5} < 2$ ✓ and $2 - \\left(-\\frac{4}{5}\\right) = \\frac{14}{5} > 2$ ✓.`,
          ),
          step(
            "result",
            `Los elementos de $A_{p(x,y)}$ están sólo en el II cuadrante del plano cartesiano (clave del libro, opción c ✓). Comprobación: el punto $\\left(-\\frac{4}{5},\\ 2\\right)$ pertenece a la región con $x < 0$ e $y > 0$ ✓; ningún punto puede tener $x \\ge 0$ ($2x < 0$ lo impide) ni $y \\le 0$ ($y \\ge 1$ lo impide) ✓.`,
            `The elements of $A_{p(x,y)}$ lie only in quadrant II of the Cartesian plane (book key, option c ✓). Check: the point $\\left(-\\frac{4}{5},\\ 2\\right)$ belongs to the region with $x < 0$ and $y > 0$ ✓; no point can have $x \\ge 0$ ($2x < 0$ forbids it) nor $y \\le 0$ ($y \\ge 1$ forbids it) ✓.`,
          ),
        ],
      };
    },
  ),
];

/** The bank for this topic: own generators + the tutor's curated Gauss/application set. */
export const templates: ProblemTemplate[] = [...ownTemplates, ...gaussTemplates];
