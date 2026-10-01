/**
 * PHYSICS · Electrostatics
 *
 * Charge quantization and sharing, Coulomb's law, electric field, potential
 * and potential energy. Charges are given in µC with distances of 0.1–1 m so
 * forces come out in the newton range; field/potential answers use scientific
 * notation. Includes MC and expression question types. es-field-03 is a
 * metre-scale variant that deliberately quotes the rounded constant
 * k = 9e9 (stated in its own statement) so students practice reading the
 * given data and entering scientific notation.
 */

import { template, L, step, tok } from "@/lib/problem";
import type { ProblemTemplate, McOption } from "@/lib/types";

/** Rounds to 2 significant figures (for sigfig-tolerance answers). */
const r2 = (n: number): number => Number(n.toPrecision(2));

/** Splits a value into mantissa (2 s.f. string) and exponent for LaTeX display. */
const sciTok = (n: number): { man: string; exp: number } => {
  const e = Math.floor(Math.log10(Math.abs(n)));
  return { man: (n / 10 ** e).toFixed(1), exp: e };
};

/** Coulomb constant. */
const K = 8.99e9;

export const templates: ProblemTemplate[] = [
  /* ---------------------------------------------------------------- */
  /* Charge sharing between identical conductors (MC)                 */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "es-charge-01",
      subject: "physics",
      topicId: "electrostatics",
      subtopicId: "charge",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 90,
      tags: ["charge", "conductors", "conservation"],
      prerequisites: [],
    },
    (rng) => {
      const [q1, q2] = rng.pick([
        [8, 4], [5, -3], [10, -4], [7, 3], [-4, -2], [8, 2], [10, 2], [-8, 4],
      ]);
      const final = (q1 + q2) / 2;
      const fmt = (v: number): string =>
        `${v > 0 ? "+" : v < 0 ? "-" : ""}${Math.abs(v)}\\ \\mu\\text{C}`;
      const options: McOption[] = [
        { id: "a", text: L(`$${fmt(final)}$`, `$${fmt(final)}$`), correct: true },
        { id: "b", text: L(`$${fmt(q1 + q2)}$`, `$${fmt(q1 + q2)}$`), correct: false },
        { id: "c", text: L(`$${fmt(q1 - q2)}$`, `$${fmt(q1 - q2)}$`), correct: false },
        { id: "d", text: L(`$${fmt((q1 - q2) / 2)}$`, `$${fmt((q1 - q2) / 2)}$`), correct: false },
      ];
      return {
        skill: L("Reparto de carga entre conductores", "Charge sharing between conductors"),
        statement: L(
          `Dos esferas metálicas idénticas y conductoras tienen cargas $q_1 = ${fmt(q1)}$ y $q_2 = ${fmt(q2)}$. Se ponen en contacto un instante y luego se separan. ¿Qué carga queda en cada esfera?`,
          `Two identical conducting metal spheres carry charges $q_1 = ${fmt(q1)}$ and $q_2 = ${fmt(q2)}$. They are touched together briefly and then separated. What charge remains on each sphere?`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "La carga total del par se conserva: el contacto no crea ni destruye carga.",
            "The total charge of the pair is conserved: touching neither creates nor destroys charge.",
          ),
          L(
            "Al ser esferas idénticas, la carga total se reparte por igual entre las dos.",
            "Since the spheres are identical, the total charge splits equally between them.",
          ),
          L(
            "Suma las dos cargas con su signo y divide el resultado entre dos.",
            "Add the two charges with their signs and divide the result by two.",
          ),
        ],
        answerDisplay: L(
          `Cada esfera queda con $${fmt(final)}$`,
          `Each sphere is left with $${fmt(final)}$`,
        ),
        solution: [
          step(
            "given",
            `Cargas iniciales: $q_1 = ${fmt(q1)}$, $q_2 = ${fmt(q2)}$; esferas idénticas en contacto.`,
            `Initial charges: $q_1 = ${fmt(q1)}$, $q_2 = ${fmt(q2)}$; identical spheres brought into contact.`,
          ),
          step(
            "approach",
            "Conservación de la carga + reparto a partes iguales entre conductores idénticos: $q_{final} = (q_1 + q_2)/2$.",
            "Charge conservation + equal sharing between identical conductors: $q_{final} = (q_1 + q_2)/2$.",
          ),
          step(
            "calculation",
            `$q_{total} = ${fmt(q1)} + (${fmt(q2)}) = ${fmt(q1 + q2)}$<br>$q_{final} = \\dfrac{${fmt(q1 + q2)}}{2} = ${fmt(final)}$`,
            `$q_{total} = ${fmt(q1)} + (${fmt(q2)}) = ${fmt(q1 + q2)}$<br>$q_{final} = \\dfrac{${fmt(q1 + q2)}}{2} = ${fmt(final)}$`,
          ),
          step(
            "result",
            `Cada esfera queda con $${fmt(final)}$: la carga se reparte por igual.`,
            `Each sphere is left with $${fmt(final)}$: the charge is shared equally.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Quantization of charge                                           */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "es-charge-02",
      subject: "physics",
      topicId: "electrostatics",
      subtopicId: "charge",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 120,
      tags: ["charge", "quantization", "electrons"],
      prerequisites: ["charge"],
    },
    (rng) => {
      const [coef, exp] = rng.pick([[1, 10], [2, 10], [5, 10], [1, 11], [2, 11]]);
      const nCount = coef * 10 ** exp;
      const gained = rng.bool();
      const qNc = r2(nCount * 1.602e-19 * 1e9);
      const qC = nCount * 1.602e-19;
      const cExp = Math.floor(Math.log10(qC));
      const cMan = (qC / 10 ** cExp).toFixed(2);
      const q = gained ? -qNc : qNc;
      return {
        skill: L("Cuantización de la carga", "Quantization of charge"),
        statement: L(
          `Un cuerpo neutro **${gained ? "gana" : "pierde"}** $N = ${coef}\\times 10^{${exp}}$ electrones. ¿Qué carga neta adquiere? Da el resultado en **nanocoulombs**, con signo (2 cifras significativas). ($e = 1{,}602\\times 10^{-19}\\ \\text{C}$)`,
          `A neutral body **${gained ? "gains" : "loses"}** $N = ${coef}\\times 10^{${exp}}$ electrons. What net charge does it acquire? Give the result in **nanocoulombs**, with sign (2 significant figures). ($e = 1{,}602\\times 10^{-19}\\ \\text{C}$)`,
        ),
        answer: {
          kind: "numeric",
          value: q,
          tolerance: { mode: "sigfig", value: 2 },
        },
        hints: [
          L(
            "La carga solo aparece en múltiplos enteros de $e$: la carga total es $N$ veces la carga de un electrón.",
            "Charge comes only in integer multiples of $e$: the total charge is $N$ times one electron's charge.",
          ),
          L(
            `Cada electrón aporta $-e$: si el cuerpo gana electrones su carga es negativa; si los pierde, positiva. Usa $q = N\\, e$ para el módulo.`,
            `Each electron contributes $-e$: gaining electrons makes the charge negative, losing them makes it positive. Use $q = N\\, e$ for the magnitude.`,
          ),
          L(
            "Multiplica, convierte de coulombs a nanocoulombs ($1\\ \\text{nC} = 10^{-9}\\ \\text{C}$) y aplica el signo.",
            "Multiply, convert from coulombs to nanocoulombs ($1\\ \\text{nC} = 10^{-9}\\ \\text{C}$) and apply the sign.",
          ),
        ],
        answerDisplay: L(`$q = ${tok(q)}\\ \\text{nC}$`, `$q = ${tok(q)}\\ \\text{nC}$`),
        solution: [
          step(
            "given",
            `$N = ${coef}\\times 10^{${exp}}$ electrones ${gained ? "ganados" : "perdidos"}, $e = 1{,}602\\times 10^{-19}\\ \\text{C}$.`,
            `$N = ${coef}\\times 10^{${exp}}$ electrons ${gained ? "gained" : "lost"}, $e = 1.602\\times 10^{-19}\\ \\text{C}$.`,
          ),
          step(
            "approach",
            "Cuantización: el módulo de la carga es $|q| = N\\, e$; el signo es negativo si gana electrones y positivo si los pierde.",
            "Quantization: the magnitude is $|q| = N\\, e$; the sign is negative if it gains electrons and positive if it loses them.",
          ),
          step(
            "calculation",
            `$|q| = ${coef}\\times 10^{${exp}} \\cdot 1{,}602\\times 10^{-19}\\ \\text{C} = ${cMan.replace(".", "{,}")}\\times 10^{${cExp}}\\ \\text{C} = ${tok(qNc)}\\ \\text{nC}$<br>Signo: ${gained ? "negativo (gana electrones)" : "positivo (pierde electrones)"}`,
            `$|q| = ${coef}\\times 10^{${exp}} \\cdot 1.602\\times 10^{-19}\\ \\text{C} = ${cMan}\\times 10^{${cExp}}\\ \\text{C} = ${tok(qNc)}\\ \\text{nC}$<br>Sign: ${gained ? "negative (gains electrons)" : "positive (loses electrons)"}`,
          ),
          step(
            "result",
            `La carga neta es $q = ${tok(q)}\\ \\text{nC}$.`,
            `The net charge is $q = ${tok(q)}\\ \\text{nC}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Coulomb's law symbolically (expression)                          */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "es-coul-expr",
      subject: "physics",
      topicId: "electrostatics",
      subtopicId: "coulomb",
      difficulty: "easy",
      questionType: "expression",
      estimatedTimeSec: 120,
      tags: ["coulomb", "formula"],
      prerequisites: [],
    },
    (rng) => {
      void rng;
      return {
        skill: L("Fórmula de la ley de Coulomb", "Coulomb's law formula"),
        statement: L(
          "Escribe el módulo de la fuerza eléctrica entre dos cargas puntuales $q$ y $Q$ separadas una distancia $r$, usando la constante de Coulomb $k$. (Usa * para multiplicar, / para dividir y ^ para las potencias; ejemplo de formato: k*x/y^2)",
          "Write the magnitude of the electric force between two point charges $q$ and $Q$ separated by a distance $r$, using Coulomb's constant $k$. (Use * to multiply, / to divide and ^ for powers; format example: k*x/y^2)",
        ),
        answer: {
          kind: "expression",
          accepted: ["k*q*Q/r^2"],
          variables: ["k", "q", "Q", "r"],
        },
        hints: [
          L(
            "La fuerza es proporcional a cada una de las dos cargas.",
            "The force is proportional to each of the two charges.",
          ),
          L(
            "Además depende del inverso del **cuadrado** de la distancia.",
            "It also depends on the inverse **square** of the distance.",
          ),
          L(
            "Une las tres piezas: constante, producto de cargas y distancia al cuadrado en el denominador.",
            "Put the three pieces together: the constant, the product of the charges, and the squared distance in the denominator.",
          ),
        ],
        answerDisplay: L(`$F = k\\dfrac{q\\,Q}{r^2}$`, `$F = k\\dfrac{q\\,Q}{r^2}$`),
        solution: [
          step(
            "given",
            "Incógnita: $F$ en función de $k$, $q$, $Q$ y $r$.",
            "Unknown: $F$ in terms of $k$, $q$, $Q$ and $r$.",
          ),
          step(
            "approach",
            "Ley de Coulomb: la fuerza entre cargas puntuales es proporcional al producto de las cargas e inversamente proporcional al cuadrado de la distancia.",
            "Coulomb's law: the force between point charges is proportional to the product of the charges and inversely proportional to the square of the distance.",
          ),
          step(
            "calculation",
            `$F = k\\,\\dfrac{q\\,Q}{r^2}$`,
            `$F = k\\,\\dfrac{q\\,Q}{r^2}$`,
          ),
          step(
            "result",
            "La respuesta es k*q*Q/r^2.",
            "The answer is k*q*Q/r^2.",
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Coulomb force magnitude                                          */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "es-coul-01",
      subject: "physics",
      topicId: "electrostatics",
      subtopicId: "coulomb",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 150,
      tags: ["coulomb", "force"],
      prerequisites: ["charge"],
    },
    (rng) => {
      const [q1, q2, r] = rng.pick([
        [3, 5, 0.2], [2, 4, 0.1], [5, 6, 0.3], [4, 6, 0.5],
        [2, 3, 0.1], [6, 6, 0.2], [3, 4, 0.5], [5, 2, 0.2],
      ]);
      const num = K * q1 * q2 * 1e-12;
      const fExact = num / (r * r);
      const f = r2(fExact);
      return {
        skill: L("Fuerza de Coulomb entre dos cargas", "Coulomb force between two charges"),
        statement: L(
          `Dos cargas puntuales positivas, $q_1 = ${q1}\\ \\mu\\text{C}$ y $q_2 = ${q2}\\ \\mu\\text{C}$, están separadas $${tok(r)}\\ \\text{m}$ en el vacío. ¿Cuál es el módulo de la fuerza entre ellas? ($k = 8{,}99\\times 10^{9}\\ \\text{N}\\cdot\\text{m}^2/\\text{C}^2$; en newtons, 2 cifras significativas)`,
          `Two positive point charges, $q_1 = ${q1}\\ \\mu\\text{C}$ and $q_2 = ${q2}\\ \\mu\\text{C}$, are $${tok(r)}\\ \\text{m}$ apart in vacuum. What is the magnitude of the force between them? ($k = 8.99\\times 10^{9}\\ \\text{N}\\cdot\\text{m}^2/\\text{C}^2$; in newtons, 2 significant figures)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: f,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["N", "newton", "newtons"],
          unitChoices: ["N", "N/C", "J", "C"],
        },
        hints: [
          L(
            "Datos: las dos cargas (en $\\mu\\text{C}$) y la separación; te piden la fuerza.",
            "Data: the two charges (in $\\mu\\text{C}$) and the separation; you need the force.",
          ),
          L(
            "Ley de Coulomb: $F = k\\,\\dfrac{q_1 q_2}{r^2}$, con las cargas convertidas a coulombs.",
            "Coulomb's law: $F = k\\,\\dfrac{q_1 q_2}{r^2}$, with the charges converted to coulombs.",
          ),
          L(
            `Pasa las cargas a coulombs ($\\mu\\text{C} = 10^{-6}\\ \\text{C}$), calcula el numerador $k\\, q_1 q_2$ y divide entre $r^2$.`,
            `Convert the charges to coulombs ($\\mu\\text{C} = 10^{-6}\\ \\text{C}$), compute the numerator $k\\, q_1 q_2$ and divide by $r^2$.`,
          ),
        ],
        answerDisplay: L(`$F \\approx ${tok(f)}\\ \\text{N}$`, `$F \\approx ${tok(f)}\\ \\text{N}$`),
        solution: [
          step(
            "given",
            `$q_1 = ${q1}\\ \\mu\\text{C} = ${q1}\\times 10^{-6}\\ \\text{C}$, $q_2 = ${q2}\\ \\mu\\text{C} = ${q2}\\times 10^{-6}\\ \\text{C}$, $r = ${tok(r)}\\ \\text{m}$.`,
            `$q_1 = ${q1}\\ \\mu\\text{C} = ${q1}\\times 10^{-6}\\ \\text{C}$, $q_2 = ${q2}\\ \\mu\\text{C} = ${q2}\\times 10^{-6}\\ \\text{C}$, $r = ${tok(r)}\\ \\text{m}$.`,
          ),
          step(
            "approach",
            "Ley de Coulomb: $F = k\\, q_1 q_2 / r^2$.",
            "Coulomb's law: $F = k\\, q_1 q_2 / r^2$.",
          ),
          step(
            "calculation",
            `$k\\, q_1 q_2 = 8{,}99\\times 10^{9} \\cdot ${q1 * q2}\\times 10^{-12} = ${tok(Number(num.toFixed(4)))}\\ \\text{N}\\cdot\\text{m}^2$<br>$F = \\dfrac{ ${tok(Number(num.toFixed(4)))}}{(${tok(r)})^2} = \\dfrac{ ${tok(Number(num.toFixed(4)))}}{ ${tok(Number((r * r).toFixed(4)))}} \\approx ${tok(f)}\\ \\text{N}$`,
            `$k\\, q_1 q_2 = 8.99\\times 10^{9} \\cdot ${q1 * q2}\\times 10^{-12} = ${tok(Number(num.toFixed(4)))}\\ \\text{N}\\cdot\\text{m}^2$<br>$F = \\dfrac{ ${tok(Number(num.toFixed(4)))}}{(${tok(r)})^2} = \\dfrac{ ${tok(Number(num.toFixed(4)))}}{ ${tok(Number((r * r).toFixed(4)))}} \\approx ${tok(f)}\\ \\text{N}$`,
          ),
          step(
            "result",
            `Las cargas se repelen con una fuerza de $\\approx ${tok(f)}\\ \\text{N}$.`,
            `The charges repel each other with a force of $\\approx ${tok(f)}\\ \\text{N}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Electric field of a point charge                                 */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "es-field-01",
      subject: "physics",
      topicId: "electrostatics",
      subtopicId: "electric-field",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 150,
      tags: ["electric-field", "point-charge"],
      prerequisites: ["coulomb"],
    },
    (rng) => {
      const [q, r] = rng.pick([
        [5, 0.5], [3, 0.1], [8, 0.2], [10, 0.5], [2, 0.2], [5, 0.1], [4, 0.3], [6, 0.3],
      ]);
      const kq = K * q * 1e-6;
      const eExact = kq / (r * r);
      const e = r2(eExact);
      const s = sciTok(e);
      return {
        skill: L("Campo eléctrico de una carga puntual", "Electric field of a point charge"),
        statement: L(
          `¿Cuál es el módulo del campo eléctrico a una distancia de $${tok(r)}\\ \\text{m}$ de una carga puntual de $q = ${q}\\ \\mu\\text{C}$? ($k = 8{,}99\\times 10^{9}\\ \\text{N}\\cdot\\text{m}^2/\\text{C}^2$; resultado en N/C, 2 cifras significativas)`,
          `What is the magnitude of the electric field at a distance of $${tok(r)}\\ \\text{m}$ from a point charge of $q = ${q}\\ \\mu\\text{C}$? ($k = 8.99\\times 10^{9}\\ \\text{N}\\cdot\\text{m}^2/\\text{C}^2$; answer in N/C, 2 significant figures)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: e,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["N/C", "V/m"],
          unitChoices: ["N/C", "V/m", "N", "C"],
        },
        hints: [
          L(
            "Datos: la carga que crea el campo y la distancia al punto; te piden el campo.",
            "Data: the charge creating the field and the distance to the point; you need the field.",
          ),
          L(
            "Campo de una carga puntual: $E = k\\,\\dfrac{q}{r^2}$.",
            "Field of a point charge: $E = k\\,\\dfrac{q}{r^2}$.",
          ),
          L(
            "Convierte la carga a coulombs, calcula $k\\, q$ y divide entre el cuadrado de la distancia.",
            "Convert the charge to coulombs, compute $k\\, q$ and divide by the squared distance.",
          ),
        ],
        answerDisplay: L(
          `$E \\approx ${tok(s.man)}\\times 10^{${s.exp}}\\ \\text{N/C}$`,
          `$E \\approx ${tok(s.man)}\\times 10^{${s.exp}}\\ \\text{N/C}$`,
        ),
        solution: [
          step(
            "given",
            `$q = ${q}\\ \\mu\\text{C} = ${q}\\times 10^{-6}\\ \\text{C}$, $r = ${tok(r)}\\ \\text{m}$.`,
            `$q = ${q}\\ \\mu\\text{C} = ${q}\\times 10^{-6}\\ \\text{C}$, $r = ${tok(r)}\\ \\text{m}$.`,
          ),
          step(
            "approach",
            "Campo eléctrico de una carga puntual: $E = k\\, q / r^2$.",
            "Electric field of a point charge: $E = k\\, q / r^2$.",
          ),
          step(
            "calculation",
            `$k\\, q = 8{,}99\\times 10^{9} \\cdot ${q}\\times 10^{-6} = ${kq.toFixed(0)}\\ \\text{N}\\cdot\\text{m}^2/\\text{C}$<br>$E = \\dfrac{${kq.toFixed(0)}}{(${tok(r)})^2} = \\dfrac{${kq.toFixed(0)}}{ ${tok(Number((r * r).toFixed(4)))}} \\approx ${tok(s.man)}\\times 10^{${s.exp}}\\ \\text{N/C}$`,
            `$k\\, q = 8.99\\times 10^{9} \\cdot ${q}\\times 10^{-6} = ${kq.toFixed(0)}\\ \\text{N}\\cdot\\text{m}^2/\\text{C}$<br>$E = \\dfrac{${kq.toFixed(0)}}{(${tok(r)})^2} = \\dfrac{${kq.toFixed(0)}}{ ${tok(Number((r * r).toFixed(4)))}} \\approx ${tok(s.man)}\\times 10^{${s.exp}}\\ \\text{N/C}$`,
          ),
          step(
            "result",
            `El campo vale $\\approx ${tok(s.man)}\\times 10^{${s.exp}}\\ \\text{N/C}$ (equivalente a V/m).`,
            `The field is $\\approx ${tok(s.man)}\\times 10^{${s.exp}}\\ \\text{N/C}$ (equivalent to V/m).`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Field direction (conceptual MC)                                  */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "es-field-02",
      subject: "physics",
      topicId: "electrostatics",
      subtopicId: "electric-field",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 90,
      tags: ["electric-field", "field-lines"],
      prerequisites: ["electric-field"],
    },
    (rng) => {
      const positive = rng.bool();
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "Radialmente hacia fuera, alejándose de la carga",
            "Radially outward, away from the charge",
          ),
          correct: positive,
        },
        {
          id: "b",
          text: L(
            "Radialmente hacia dentro, hacia la carga",
            "Radially inward, toward the charge",
          ),
          correct: !positive,
        },
        {
          id: "c",
          text: L(
            "En circunferencias concéntricas alrededor de la carga",
            "In concentric circles around the charge",
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            "No hay campo alrededor de una carga puntual",
            "There is no field around a point charge",
          ),
          correct: false,
        },
      ];
      return {
        skill: L("Dirección del campo eléctrico", "Direction of the electric field"),
        statement: L(
          `¿Cómo apuntan los vectores del campo eléctrico creado por una carga puntual ${positive ? "**positiva**" : "**negativa**"} en los puntos que la rodean?`,
          `In which direction do the electric field vectors created by a ${positive ? "**positive**" : "**negative**"} point charge point at the surrounding points?`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El campo se define por la fuerza que sentiría una carga de prueba **positiva** colocada en ese punto.",
            "The field is defined by the force that a **positive** test charge would feel at that point.",
          ),
          L(
            "Una carga de prueba positiva es repelida por las cargas positivas y atraída por las negativas.",
            "A positive test charge is repelled by positive charges and attracted by negative ones.",
          ),
          L(
            "La fuerza (y el campo) de una carga puntual siempre actúa sobre la recta que une ambos puntos: dirección radial.",
            "The force (and the field) of a point charge always acts along the line joining the two points: a radial direction.",
          ),
        ],
        answerDisplay: L(
          positive
            ? "Radialmente hacia fuera, alejándose de la carga"
            : "Radialmente hacia dentro, hacia la carga",
          positive
            ? "Radially outward, away from the charge"
            : "Radially inward, toward the charge",
        ),
        solution: [
          step(
            "given",
            `Carga puntual ${positive ? "positiva" : "negativa"}; se pide la dirección de $\\vec{E}$.`,
            `${positive ? "Positive" : "Negative"} point charge; the direction of $\\vec{E}$ is requested.`,
          ),
          step(
            "approach",
            "Definición: $\\vec{E}$ es la fuerza por unidad de carga de prueba positiva, $\\vec{E} = \\vec{F}/q_0$ con $q_0 > 0$.",
            "Definition: $\\vec{E}$ is the force per unit positive test charge, $\\vec{E} = \\vec{F}/q_0$ with $q_0 > 0$.",
          ),
          step(
            "calculation",
            positive
              ? "Una prueba positiva es repelida por la carga positiva → el campo apunta alejándose de ella."
              : "Una prueba positiva es atraída por la carga negativa → el campo apunta hacia ella.",
            positive
              ? "A positive test charge is repelled by the positive charge → the field points away from it."
              : "A positive test charge is attracted to the negative charge → the field points toward it.",
          ),
          step(
            "result",
            positive
              ? "El campo apunta radialmente hacia fuera."
              : "El campo apunta radialmente hacia dentro.",
            positive
              ? "The field points radially outward."
              : "The field points radially inward.",
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Field of a point charge with the rounded constant k = 9×10⁹      */
  /* (quoted in the statement; es-field-01/02 use the finer 8.99×10⁹. */
  /* Hand-curated (q, r) pairs give exact E values and the input      */
  /* hint reminds students the answer box takes scientific notation.) */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "es-field-03",
      subject: "physics",
      topicId: "electrostatics",
      subtopicId: "electric-field",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 150,
      tags: ["electric-field", "point-charge", "scientific-notation"],
      prerequisites: ["coulomb"],
    },
    (rng) => {
      // Hand-curated (q in µC, r in m) pairs: with k = 9e9 every E is an
      // exact integer in N/C (e.g. 2 µC at 3 m → 2000 N/C).
      const [q, r] = rng.pick([
        [2, 3], [4, 2], [5, 5], [1, 3], [8, 4], [6, 6],
      ]);
      const kq = Math.round(9e9 * q * 1e-6); // 9000·q, exact by curation
      const e = kq / (r * r); // exact integer by curation
      const s = sciTok(e);
      return {
        skill: L(
          "Campo eléctrico con la constante de Coulomb aproximada",
          "Electric field with the approximate Coulomb constant",
        ),
        statement: L(
          `¿Cuál es el módulo del campo eléctrico creado por una carga puntual de $q = ${q}\\times 10^{-6}\\ \\text{C}$ en un punto situado a $r = ${r}\\ \\text{m}$ de la carga? (Toma $k = 9\\times 10^{9}\\ \\text{N}\\cdot\\text{m}^2/\\text{C}^2$; resultado en N/C, 2 cifras significativas.)`,
          `What is the magnitude of the electric field created by a point charge of $q = ${q}\\times 10^{-6}\\ \\text{C}$ at a point $r = ${r}\\ \\text{m}$ away from the charge? (Use $k = 9\\times 10^{9}\\ \\text{N}\\cdot\\text{m}^2/\\text{C}^2$; answer in N/C, 2 significant figures.)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: e,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["N/C", "V/m"],
          unitChoices: ["N/C", "V/m", "N", "C"],
        },
        hints: [
          L(
            "Tienes la carga $q$ (ya en coulombs) y la distancia $r$ al punto; la incógnita es el módulo del campo $E$.",
            "You have the charge $q$ (already in coulombs) and the distance $r$ to the point; the unknown is the magnitude of the field $E$.",
          ),
          L(
            "El campo de una carga puntual es $E = k\\,\\dfrac{q}{r^2}$: decrece con el cuadrado de la distancia.",
            "The field of a point charge is $E = k\\,\\dfrac{q}{r^2}$: it decreases with the square of the distance.",
          ),
          L(
            `Sustituye: $E = \\dfrac{9\\times 10^{9} \\cdot ${q}\\times 10^{-6}}{(${r})^2}$. El campo de respuesta acepta notación científica (por ejemplo 3*10^4 o 3e4).`,
            `Substitute: $E = \\dfrac{9\\times 10^{9} \\cdot ${q}\\times 10^{-6}}{(${r})^2}$. The answer box accepts scientific notation (for example 3*10^4 or 3e4).`,
          ),
        ],
        answerDisplay: L(
          `$E = ${tok(s.man)}\\times 10^{${s.exp}}\\ \\text{N/C}$`,
          `$E = ${tok(s.man)}\\times 10^{${s.exp}}\\ \\text{N/C}$`,
        ),
        solution: [
          step(
            "given",
            `$q = ${q}\\times 10^{-6}\\ \\text{C}$, $r = ${r}\\ \\text{m}$, $k = 9\\times 10^{9}\\ \\text{N}\\cdot\\text{m}^2/\\text{C}^2$.`,
            `$q = ${q}\\times 10^{-6}\\ \\text{C}$, $r = ${r}\\ \\text{m}$, $k = 9\\times 10^{9}\\ \\text{N}\\cdot\\text{m}^2/\\text{C}^2$.`,
          ),
          step(
            "approach",
            "Campo eléctrico de una carga puntual: $E = k\\,q / r^2$.",
            "Electric field of a point charge: $E = k\\,q / r^2$.",
          ),
          step(
            "calculation",
            `$k\\,q = 9\\times 10^{9} \\cdot ${q}\\times 10^{-6} = ${kq}\\ \\text{N}\\cdot\\text{m}^2/\\text{C}$<br>$E = \\dfrac{${kq}}{(${r})^2} = \\dfrac{${kq}}{${r * r}} = ${e}\\ \\text{N/C} = ${tok(s.man)}\\times 10^{${s.exp}}\\ \\text{N/C}$`,
            `$k\\,q = 9\\times 10^{9} \\cdot ${q}\\times 10^{-6} = ${kq}\\ \\text{N}\\cdot\\text{m}^2/\\text{C}$<br>$E = \\dfrac{${kq}}{(${r})^2} = \\dfrac{${kq}}{${r * r}} = ${e}\\ \\text{N/C} = ${tok(s.man)}\\times 10^{${s.exp}}\\ \\text{N/C}$`,
          ),
          step(
            "result",
            `El campo vale $E = ${tok(s.man)}\\times 10^{${s.exp}}\\ \\text{N/C}$ (la unidad V/m es equivalente); como $q > 0$, apunta radialmente hacia fuera.`,
            `The field is $E = ${tok(s.man)}\\times 10^{${s.exp}}\\ \\text{N/C}$ (the unit V/m is equivalent); since $q > 0$, it points radially outward.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Electric potential of a point charge                             */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "es-pot-01",
      subject: "physics",
      topicId: "electrostatics",
      subtopicId: "potential",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 150,
      tags: ["potential", "point-charge"],
      prerequisites: ["coulomb"],
    },
    (rng) => {
      const [q, r] = rng.pick([
        [3, 0.3], [5, 0.5], [4, 0.2], [2, 0.5], [6, 0.1], [4, 0.5], [5, 0.2], [2, 0.1], [3, 0.1],
      ]);
      const kq = K * q * 1e-6;
      const vExact = kq / r;
      const v = r2(vExact);
      const s = sciTok(v);
      return {
        skill: L("Potencial de una carga puntual", "Potential of a point charge"),
        statement: L(
          `¿Cuál es el potencial eléctrico a una distancia de $${tok(r)}\\ \\text{m}$ de una carga puntual de $q = ${q}\\ \\mu\\text{C}$? ($k = 8{,}99\\times 10^{9}$; resultado en voltios, 2 cifras significativas)`,
          `What is the electric potential at a distance of $${tok(r)}\\ \\text{m}$ from a point charge of $q = ${q}\\ \\mu\\text{C}$? ($k = 8.99\\times 10^{9}$; answer in volts, 2 significant figures)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: v,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["V", "volt", "volts"],
          unitChoices: ["V", "V/m", "J", "N/C"],
        },
        hints: [
          L(
            "Datos: la carga y la distancia; te piden el potencial escalar, no el campo.",
            "Data: the charge and the distance; you need the scalar potential, not the field.",
          ),
          L(
            "Potencial de una carga puntual: $V = k\\,\\dfrac{q}{r}$ (sin cuadrado, a diferencia del campo).",
            "Potential of a point charge: $V = k\\,\\dfrac{q}{r}$ (no squared, unlike the field).",
          ),
          L(
            "Convierte la carga a coulombs, calcula $k\\, q$ y divide entre la distancia.",
            "Convert the charge to coulombs, compute $k\\, q$ and divide by the distance.",
          ),
        ],
        answerDisplay: L(
          `$V \\approx ${tok(s.man)}\\times 10^{${s.exp}}\\ \\text{V}$`,
          `$V \\approx ${tok(s.man)}\\times 10^{${s.exp}}\\ \\text{V}$`,
        ),
        solution: [
          step(
            "given",
            `$q = ${q}\\ \\mu\\text{C} = ${q}\\times 10^{-6}\\ \\text{C}$, $r = ${tok(r)}\\ \\text{m}$.`,
            `$q = ${q}\\ \\mu\\text{C} = ${q}\\times 10^{-6}\\ \\text{C}$, $r = ${tok(r)}\\ \\text{m}$.`,
          ),
          step(
            "approach",
            "Potencial de una carga puntual: $V = k\\, q / r$.",
            "Potential of a point charge: $V = k\\, q / r$.",
          ),
          step(
            "calculation",
            `$k\\, q = 8{,}99\\times 10^{9} \\cdot ${q}\\times 10^{-6} = ${kq.toFixed(0)}\\ \\text{V}\\cdot\\text{m}$<br>$V = \\dfrac{${kq.toFixed(0)}}{ ${tok(r)}} = ${vExact.toFixed(0)}\\ \\text{V} \\approx ${tok(s.man)}\\times 10^{${s.exp}}\\ \\text{V}$`,
            `$k\\, q = 8.99\\times 10^{9} \\cdot ${q}\\times 10^{-6} = ${kq.toFixed(0)}\\ \\text{V}\\cdot\\text{m}$<br>$V = \\dfrac{${kq.toFixed(0)}}{ ${tok(r)}} = ${vExact.toFixed(0)}\\ \\text{V} \\approx ${tok(s.man)}\\times 10^{${s.exp}}\\ \\text{V}$`,
          ),
          step(
            "result",
            `El potencial es $\\approx ${tok(s.man)}\\times 10^{${s.exp}}\\ \\text{V}$.`,
            `The potential is $\\approx ${tok(s.man)}\\times 10^{${s.exp}}\\ \\text{V}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Energy gained through a potential difference                     */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "es-pot-02",
      subject: "physics",
      topicId: "electrostatics",
      subtopicId: "potential",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 150,
      tags: ["potential-difference", "energy", "electron"],
      prerequisites: ["potential"],
    },
    (rng) => {
      const dv = rng.pick([100, 200, 500, 1000, 2000]);
      const wExact = 1.602e-19 * dv;
      const w = r2(wExact);
      const eExp = Math.floor(Math.log10(Math.abs(wExact)));
      const wMan = (wExact / 10 ** eExp).toFixed(2);
      const s = sciTok(w);
      return {
        skill: L("Energía al cruzar una diferencia de potencial", "Energy gained across a potential difference"),
        statement: L(
          `Un electrón parte del reposo y se acelera mediante una diferencia de potencial de $${dv}\\ \\text{V}$. ¿Cuánta energía cinética gana? (Carga elemental: $e = 1{,}602\\times 10^{-19}\\ \\text{C}$; resultado en joules, 2 cifras significativas)`,
          `An electron starts from rest and is accelerated through a potential difference of $${dv}\\ \\text{V}$. How much kinetic energy does it gain? (Elementary charge: $e = 1.602\\times 10^{-19}\\ \\text{C}$; answer in joules, 2 significant figures)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: w,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["J", "joule", "joules"],
          unitChoices: ["J", "eV", "V", "C"],
        },
        hints: [
          L(
            "Datos: la carga del electrón y la diferencia de potencial; te piden la energía.",
            "Data: the electron's charge and the potential difference; you need the energy.",
          ),
          L(
            "El trabajo del campo eléctrico es $W = q\\,\\Delta V$: carga por diferencia de potencial.",
            "The work done by the electric field is $W = q\\,\\Delta V$: charge times potential difference.",
          ),
          L(
            "Multiplica la carga elemental por la diferencia de potencial en voltios; el resultado sale en joules.",
            "Multiply the elementary charge by the potential difference in volts; the result comes out in joules.",
          ),
        ],
        answerDisplay: L(
          `$W \\approx ${tok(s.man)}\\times 10^{${s.exp}}\\ \\text{J}$`,
          `$W \\approx ${tok(s.man)}\\times 10^{${s.exp}}\\ \\text{J}$`,
        ),
        solution: [
          step(
            "given",
            `$|q| = e = 1{,}602\\times 10^{-19}\\ \\text{C}$, $\\Delta V = ${dv}\\ \\text{V}$.`,
            `$|q| = e = 1.602\\times 10^{-19}\\ \\text{C}$, $\\Delta V = ${dv}\\ \\text{V}$.`,
          ),
          step(
            "approach",
            "Energía ganada = trabajo del campo: $W = q\\,\\Delta V$ (por eso el electrón-voltio es una unidad de energía).",
            "Energy gained = work by the field: $W = q\\,\\Delta V$ (this is why the electron-volt is a unit of energy).",
          ),
          step(
            "calculation",
            `$W = 1{,}602\\times 10^{-19} \\cdot ${dv} = ${tok(wMan)}\\times 10^{${eExp}}\\ \\text{J} \\approx ${tok(s.man)}\\times 10^{${s.exp}}\\ \\text{J}$`,
            `$W = 1.602\\times 10^{-19} \\cdot ${dv} = ${tok(wMan)}\\times 10^{${eExp}}\\ \\text{J} \\approx ${tok(s.man)}\\times 10^{${s.exp}}\\ \\text{J}$`,
          ),
          step(
            "result",
            `El electrón gana $\\approx ${tok(s.man)}\\times 10^{${s.exp}}\\ \\text{J}$ de energía cinética.`,
            `The electron gains $\\approx ${tok(s.man)}\\times 10^{${s.exp}}\\ \\text{J}$ of kinetic energy.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Net force on the middle charge (hard)                            */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "es-coul-02",
      subject: "physics",
      topicId: "electrostatics",
      subtopicId: "coulomb",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 240,
      tags: ["coulomb", "superposition", "vectors"],
      prerequisites: ["coulomb"],
    },
    (rng) => {
      const [qa, qb, qc, dab, dbc] = rng.pick([
        [3, 2, 4, 0.3, 0.2], [4, 2, 2, 0.2, 0.3], [2, 3, 4, 0.2, 0.3], [4, 3, 2, 0.3, 0.2],
        [2, 1, 3, 0.2, 0.2], [3, 1, 6, 0.3, 0.3], [4, 1, 2, 0.2, 0.3], [2, 2, 6, 0.3, 0.2],
      ]);
      const faExact = (K * qa * qb * 1e-12) / (dab * dab);
      const fcExact = (K * qc * qb * 1e-12) / (dbc * dbc);
      const net = r2(faExact - fcExact);
      const fa2 = Number(faExact.toFixed(2));
      const fc2 = Number(fcExact.toFixed(2));
      return {
        skill: L("Fuerza neta por superposición", "Net force by superposition"),
        statement: L(
          `Tres cargas positivas están alineadas: la carga $A$ a la izquierda, la $B$ en el medio y la $C$ a la derecha. Sus valores son $q_A = ${qa}\\ \\mu\\text{C}$, $q_B = ${qb}\\ \\mu\\text{C}$ y $q_C = ${qc}\\ \\mu\\text{C}$. La distancia de $A$ a $B$ es $${tok(dab)}\\ \\text{m}$ y la de $B$ a $C$ es $${tok(dbc)}\\ \\text{m}$. Calcula la fuerza neta sobre $B$, con signo: **positiva** si apunta hacia $C$ y **negativa** si apunta hacia $A$. (en newtons, 2 cifras significativas)`,
          `Three positive charges lie on a line: charge $A$ on the left, $B$ in the middle and $C$ on the right. Their values are $q_A = ${qa}\\ \\mu\\text{C}$, $q_B = ${qb}\\ \\mu\\text{C}$ and $q_C = ${qc}\\ \\mu\\text{C}$. The distance from $A$ to $B$ is $${tok(dab)}\\ \\text{m}$ and from $B$ to $C$ is $${tok(dbc)}\\ \\text{m}$. Compute the net force on $B$, with sign: **positive** if it points toward $C$ and **negative** if it points toward $A$. (in newtons, 2 significant figures)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: net,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["N", "newton", "newtons"],
          unitChoices: ["N", "N/C", "C", "mN"],
        },
        hints: [
          L(
            "Calcula por separado la fuerza que cada carga exterior ejerce sobre $B$, y luego súmalas como vectores.",
            "Compute separately the force each outer charge exerts on $B$, then add them as vectors.",
          ),
          L(
            "Ambas cargas son positivas, así que $A$ empuja a $B$ hacia la derecha y $C$ lo empuja hacia la izquierda: las fuerzas se restan.",
            "Both outer charges are positive, so $A$ pushes $B$ to the right and $C$ pushes it to the left: the forces subtract.",
          ),
          L(
            "Usa $F = k\\, q\\, q_B / d^2$ para cada una y toma $F_{neta} = F_A - F_C$ con el signo pedido.",
            "Use $F = k\\, q\\, q_B / d^2$ for each and take $F_{net} = F_A - F_C$ with the requested sign.",
          ),
        ],
        answerDisplay: L(
          `$F_{neta} \\approx ${tok(net)}\\ \\text{N}$`,
          `$F_{net} \\approx ${tok(net)}\\ \\text{N}$`,
        ),
        solution: [
          step(
            "given",
            `$q_A = ${qa}\\ \\mu\\text{C}$, $q_B = ${qb}\\ \\mu\\text{C}$, $q_C = ${qc}\\ \\mu\\text{C}$; $d_{AB} = ${tok(dab)}\\ \\text{m}$, $d_{BC} = ${tok(dbc)}\\ \\text{m}$.`,
            `$q_A = ${qa}\\ \\mu\\text{C}$, $q_B = ${qb}\\ \\mu\\text{C}$, $q_C = ${qc}\\ \\mu\\text{C}$; $d_{AB} = ${tok(dab)}\\ \\text{m}$, $d_{BC} = ${tok(dbc)}\\ \\text{m}$.`,
          ),
          step(
            "approach",
            "Principio de superposición: fuerza de $A$ sobre $B$ (hacia $C$, positiva) menos fuerza de $C$ sobre $B$ (hacia $A$, negativa).",
            "Superposition principle: force of $A$ on $B$ (toward $C$, positive) minus force of $C$ on $B$ (toward $A$, negative).",
          ),
          step(
            "calculation",
            `$F_A = k\\dfrac{q_A q_B}{d_{AB}^2} = \\dfrac{ ${tok(Number((K * qa * qb * 1e-12).toFixed(4)))}}{ ${tok(Number((dab * dab).toFixed(4)))}} \\approx ${tok(fa2)}\\ \\text{N}$ (hacia $C$)<br>$F_C = k\\dfrac{q_C q_B}{d_{BC}^2} = \\dfrac{ ${tok(Number((K * qc * qb * 1e-12).toFixed(4)))}}{ ${tok(Number((dbc * dbc).toFixed(4)))}} \\approx ${tok(fc2)}\\ \\text{N}$ (hacia $A$)<br>$F_{neta} = ${tok(fa2)} - ${tok(fc2)} \\approx ${tok(net)}\\ \\text{N}$`,
            `$F_A = k\\dfrac{q_A q_B}{d_{AB}^2} = \\dfrac{ ${tok(Number((K * qa * qb * 1e-12).toFixed(4)))}}{ ${tok(Number((dab * dab).toFixed(4)))}} \\approx ${tok(fa2)}\\ \\text{N}$ (toward $C$)<br>$F_C = k\\dfrac{q_C q_B}{d_{BC}^2} = \\dfrac{ ${tok(Number((K * qc * qb * 1e-12).toFixed(4)))}}{ ${tok(Number((dbc * dbc).toFixed(4)))}} \\approx ${tok(fc2)}\\ \\text{N}$ (toward $A$)<br>$F_{net} = ${tok(fa2)} - ${tok(fc2)} \\approx ${tok(net)}\\ \\text{N}$`,
          ),
          step(
            "result",
            net >= 0
              ? `La fuerza neta sobre $B$ es $\\approx ${tok(net)}\\ \\text{N}$ hacia $C$.`
              : `La fuerza neta sobre $B$ es $\\approx ${tok(Math.abs(net))}\\ \\text{N}$ hacia $A$ (valor con signo: $${tok(net)}\\ \\text{N}$).`,
            net >= 0
              ? `The net force on $B$ is $\\approx ${tok(net)}\\ \\text{N}$ toward $C$.`
              : `The net force on $B$ is $\\approx ${tok(Math.abs(net))}\\ \\text{N}$ toward $A$ (signed value: $${tok(net)}\\ \\text{N}$).`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Electric potential energy of a pair                              */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "es-energy-01",
      subject: "physics",
      topicId: "electrostatics",
      subtopicId: "potential-energy",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 180,
      tags: ["potential-energy", "point-charges"],
      prerequisites: ["potential"],
    },
    (rng) => {
      const [q1, q2, r] = rng.pick([
        [2, 3, 0.3], [4, 5, 0.2], [3, 3, 0.1], [5, 5, 0.5], [2, 5, 0.1], [4, 2, 0.3],
      ]);
      const num = K * q1 * q2 * 1e-12;
      const uExact = num / r;
      const u = r2(uExact);
      return {
        skill: L("Energía potencial de un par de cargas", "Potential energy of a pair of charges"),
        statement: L(
          `Dos cargas positivas de $q_1 = ${q1}\\ \\mu\\text{C}$ y $q_2 = ${q2}\\ \\mu\\text{C}$ se mantienen fijas a una distancia de $${tok(r)}\\ \\text{m}$. ¿Cuál es la energía potencial eléctrica almacenada en el par? (en joules, 2 cifras significativas)`,
          `Two positive charges $q_1 = ${q1}\\ \\mu\\text{C}$ and $q_2 = ${q2}\\ \\mu\\text{C}$ are held fixed at a distance of $${tok(r)}\\ \\text{m}$. What electric potential energy is stored in the pair? (in joules, 2 significant figures)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: u,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["J", "joule", "joules"],
          unitChoices: ["J", "N", "V", "C"],
        },
        hints: [
          L(
            "Datos: las dos cargas y su separación; te piden la energía potencial del par.",
            "Data: the two charges and their separation; you need the pair's potential energy.",
          ),
          L(
            "Energía potencial eléctrica: $U = k\\,\\dfrac{q_1 q_2}{r}$ (mismo aspecto que el potencial, pero con las dos cargas).",
            "Electric potential energy: $U = k\\,\\dfrac{q_1 q_2}{r}$ (same shape as the potential, but with both charges).",
          ),
          L(
            "Convierte las cargas a coulombs, calcula $k\\, q_1 q_2$ y divide entre la distancia.",
            "Convert the charges to coulombs, compute $k\\, q_1 q_2$ and divide by the distance.",
          ),
        ],
        answerDisplay: L(`$U \\approx ${tok(u)}\\ \\text{J}$`, `$U \\approx ${tok(u)}\\ \\text{J}$`),
        solution: [
          step(
            "given",
            `$q_1 = ${q1}\\times 10^{-6}\\ \\text{C}$, $q_2 = ${q2}\\times 10^{-6}\\ \\text{C}$, $r = ${tok(r)}\\ \\text{m}$.`,
            `$q_1 = ${q1}\\times 10^{-6}\\ \\text{C}$, $q_2 = ${q2}\\times 10^{-6}\\ \\text{C}$, $r = ${tok(r)}\\ \\text{m}$.`,
          ),
          step(
            "approach",
            "Energía potencial de dos cargas puntuales: $U = k\\, q_1 q_2 / r$.",
            "Potential energy of two point charges: $U = k\\, q_1 q_2 / r$.",
          ),
          step(
            "calculation",
            `$k\\, q_1 q_2 = 8{,}99\\times 10^{9} \\cdot ${q1 * q2}\\times 10^{-12} = ${tok(Number(num.toFixed(4)))}\\ \\text{J}\\cdot\\text{m}$<br>$U = \\dfrac{ ${tok(Number(num.toFixed(4)))}}{ ${tok(r)}} \\approx ${tok(u)}\\ \\text{J}$`,
            `$k\\, q_1 q_2 = 8.99\\times 10^{9} \\cdot ${q1 * q2}\\times 10^{-12} = ${tok(Number(num.toFixed(4)))}\\ \\text{J}\\cdot\\text{m}$<br>$U = \\dfrac{ ${tok(Number(num.toFixed(4)))}}{ ${tok(r)}} \\approx ${tok(u)}\\ \\text{J}$`,
          ),
          step(
            "result",
            `El par almacena $\\approx ${tok(u)}\\ \\text{J}$ (positiva: hizo falta trabajo externo para juntarlas).`,
            `The pair stores $\\approx ${tok(u)}\\ \\text{J}$ (positive: external work was needed to bring them together).`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Challenge: proton released from rest near a charge               */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "es-chal-01",
      subject: "physics",
      topicId: "electrostatics",
      subtopicId: "potential-energy",
      difficulty: "challenge",
      questionType: "numeric-unit",
      estimatedTimeSec: 300,
      tags: ["energy-conservation", "potential-energy", "multi-step"],
      prerequisites: ["potential-energy", "electric-field"],
    },
    (rng) => {
      const [q, r] = rng.pick([
        [5, 0.1], [2, 0.1], [8, 0.2], [10, 0.5], [4, 0.1], [5, 0.2], [2, 0.5], [8, 0.1],
      ]);
      const mp = 1.67e-27;
      const eCharge = 1.602e-19;
      const u = (K * q * 1e-6 * eCharge) / r;
      const vExact = Math.sqrt((2 * u) / mp);
      const v = r2(vExact);
      const s = sciTok(v);
      const su = sciTok(u);
      const s2u = sciTok(2 * u);
      return {
        skill: L("Protón liberado: de energía potencial a cinética", "Proton released: potential to kinetic energy"),
        statement: L(
          `Un protón se mantiene en reposo a una distancia de $${tok(r)}\\ \\text{m}$ de una carga puntual fija $Q = ${q}\\ \\mu\\text{C}$ (positiva) y luego se suelta. Por repulsión se aleja acelerando. ¿Qué velocidad tiene cuando está muy lejos de la carga? (Toda la energía potencial se convierte en cinética; $m_p = 1{,}67\\times 10^{-27}\\ \\text{kg}$, $e = 1{,}602\\times 10^{-19}\\ \\text{C}$, $k = 8{,}99\\times 10^{9}$; resultado en m/s, 2 cifras significativas)`,
          `A proton is held at rest at a distance of $${tok(r)}\\ \\text{m}$ from a fixed point charge $Q = ${q}\\ \\mu\\text{C}$ (positive) and then released. It accelerates away by repulsion. What is its speed when it is very far from the charge? (All the potential energy becomes kinetic; $m_p = 1.67\\times 10^{-27}\\ \\text{kg}$, $e = 1.602\\times 10^{-19}\\ \\text{C}$, $k = 8.99\\times 10^{9}$; answer in m/s, 2 significant figures)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: v,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m/s"],
          unitChoices: ["m/s", "m/s^2", "J", "N"],
        },
        hints: [
          L(
            "Conservación de la energía: muy lejos la energía potencial es cero, así que toda la inicial pasa a cinética.",
            "Conservation of energy: far away the potential energy is zero, so all the initial energy becomes kinetic.",
          ),
          L(
            "Inicial: $U = k\\, Q\\, e / r$ con el protón en reposo. Final: $\\tfrac{1}{2} m_p v^2$.",
            "Initially: $U = k\\, Q\\, e / r$ with the proton at rest. Finally: $\\tfrac{1}{2} m_p v^2$.",
          ),
          L(
            "Iguala $\\tfrac{1}{2} m_p v^2 = k Q e / r$ y despeja $v = \\sqrt{2 k Q e / (m_p r)}$.",
            "Set $\\tfrac{1}{2} m_p v^2 = k Q e / r$ and solve $v = \\sqrt{2 k Q e / (m_p r)}$.",
          ),
        ],
        answerDisplay: L(
          `$v \\approx ${tok(s.man)}\\times 10^{${s.exp}}\\ \\text{m/s}$`,
          `$v \\approx ${tok(s.man)}\\times 10^{${s.exp}}\\ \\text{m/s}$`,
        ),
        solution: [
          step(
            "given",
            `$Q = ${q}\\ \\mu\\text{C} = ${q}\\times 10^{-6}\\ \\text{C}$, $r = ${tok(r)}\\ \\text{m}$, $m_p = 1{,}67\\times 10^{-27}\\ \\text{kg}$, carga del protón $e = 1{,}602\\times 10^{-19}\\ \\text{C}$.`,
            `$Q = ${q}\\ \\mu\\text{C} = ${q}\\times 10^{-6}\\ \\text{C}$, $r = ${tok(r)}\\ \\text{m}$, $m_p = 1.67\\times 10^{-27}\\ \\text{kg}$, proton charge $e = 1.602\\times 10^{-19}\\ \\text{C}$.`,
          ),
          step(
            "approach",
            "Conservación de la energía: $U_i = K_f$, es decir $k\\, Q e / r = \\tfrac{1}{2} m_p v^2$.",
            "Conservation of energy: $U_i = K_f$, i.e. $k\\, Q e / r = \\tfrac{1}{2} m_p v^2$.",
          ),
          step(
            "calculation",
            `$U_i = \\dfrac{8{,}99\\times 10^{9} \\cdot ${q}\\times 10^{-6} \\cdot 1{,}602\\times 10^{-19}}{ ${tok(r)}} \\approx ${tok(su.man)}\\times 10^{${su.exp}}\\ \\text{J}$<br>$\\tfrac{1}{2} m_p v^2 = U_i \\Rightarrow v = \\sqrt{\\dfrac{2\\,U_i}{m_p}} = \\sqrt{\\dfrac{ ${tok(s2u.man)}\\times 10^{${s2u.exp}}}{1{,}67\\times 10^{-27}}} \\approx ${tok(s.man)}\\times 10^{${s.exp}}\\ \\text{m/s}$`,
            `$U_i = \\dfrac{8.99\\times 10^{9} \\cdot ${q}\\times 10^{-6} \\cdot 1.602\\times 10^{-19}}{ ${tok(r)}} \\approx ${tok(su.man)}\\times 10^{${su.exp}}\\ \\text{J}$<br>$\\tfrac{1}{2} m_p v^2 = U_i \\Rightarrow v = \\sqrt{\\dfrac{2\\,U_i}{m_p}} = \\sqrt{\\dfrac{ ${tok(s2u.man)}\\times 10^{${s2u.exp}}}{1.67\\times 10^{-27}}} \\approx ${tok(s.man)}\\times 10^{${s.exp}}\\ \\text{m/s}$`,
          ),
          step(
            "result",
            `El protón sale disparado con $v \\approx ${tok(s.man)}\\times 10^{${s.exp}}\\ \\text{m/s}$.`,
            `The proton flies off with $v \\approx ${tok(s.man)}\\times 10^{${s.exp}}\\ \\text{m/s}$.`,
          ),
        ],
      };
    },
  ),
];
