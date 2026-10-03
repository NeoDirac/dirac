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
];

/** The bank for this topic: own generators + the tutor's curated Gauss/application set. */
export const templates: ProblemTemplate[] = [...ownTemplates, ...gaussTemplates];
