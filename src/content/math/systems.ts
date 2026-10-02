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
];

/** The bank for this topic: own generators + the tutor's curated Gauss/application set. */
export const templates: ProblemTemplate[] = [...ownTemplates, ...gaussTemplates];
