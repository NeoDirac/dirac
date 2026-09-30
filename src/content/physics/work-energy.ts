/**
 * PHYSICS · Work, Energy & Power
 *
 * Work (with and without an angle), kinetic and potential energies,
 * springs, conservation of energy, and power. Includes one MC concept
 * problem and one expression (symbolic) problem.
 */

import { template, L, step, tok } from "@/lib/problem";
import type { ProblemTemplate, McOption } from "@/lib/types";

/* ---------- number helpers (local conventions) ---------- */

/** Round to 1 decimal — intermediate display values. */
const r1 = (n: number): number => Math.round(n * 10) / 10;
/** Round to 2 decimals — intermediate display values. */
const r2 = (n: number): number => Math.round(n * 100) / 100;
/** Remove floating-point noise (0.30000000000000004 → 0.3). */
const clean = (n: number): number => Number(n.toPrecision(10));
/** Round to 2 significant figures, half away from zero (answers with sigfig tolerance). */
function sig2(n: number): number {
  if (n === 0) return 0;
  const exp = Math.floor(Math.log10(Math.abs(n)));
  const f = Math.pow(10, exp - 1);
  const scaled = n / f;
  const r = scaled >= 0 ? Math.floor(scaled + 0.5) : Math.ceil(scaled - 0.5);
  return clean(r * f);
}

const G_ACC = 9.8;

export const templates: ProblemTemplate[] = [
  /* ---------------------------------------------------------------- */
  /* Work of a parallel force                                          */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "we-work-01",
      subject: "physics",
      topicId: "work-energy",
      subtopicId: "work",
      difficulty: "easy",
      questionType: "numeric-unit",
      estimatedTimeSec: 90,
      tags: ["work", "forces"],
      prerequisites: ["forces"],
    },
    (rng) => {
      const F = rng.pick([10, 15, 20, 25, 30, 40, 50, 60]);
      const d = rng.pick([2, 3, 4, 5, 8, 10, 12, 15]);
      const W = sig2(F * d);
      return {
        skill: L("Trabajo de una fuerza constante", "Work of a constant force"),
        statement: L(
          `Para arrastrar un cajón por el suelo se ejerce una fuerza horizontal de $${F}\\ \\text{N}$, paralela al desplazamiento, mientras el cajón avanza $${d}\\ \\text{m}$. ¿Qué **trabajo** realiza esa fuerza? (2 cifras significativas).`,
          `To drag a crate along the floor a horizontal force of $${F}\\ \\text{N}$ is applied, parallel to the displacement, while the crate moves $${d}\\ \\text{m}$. How much **work** does that force do? (2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: W,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["J", "joules", "N·m", "N*m"],
          unitChoices: ["J", "N", "W", "N·m"],
        },
        hints: [
          L(
            "Trabajo = fuerza por desplazamiento en la dirección de la fuerza.",
            "Work = force times displacement along the force.",
          ),
          L(
            "Con la fuerza paralela al desplazamiento: $W = F\\,d\\cos 0^\\circ = F\\,d$.",
            "With the force parallel to the displacement: $W = F\\,d\\cos 0^\\circ = F\\,d$.",
          ),
          L(
            "Multiplica los newtons por los metros; el resultado queda en julios.",
            "Multiply newtons by metres; the result is in joules.",
          ),
        ],
        answerDisplay: L(`$W = ${tok(W)}\\ \\text{J}$`, `$W = ${tok(W)}\\ \\text{J}$`),
        solution: [
          step(
            "given",
            `$F = ${F}\\ \\text{N}$, $d = ${d}\\ \\text{m}$, $\\theta = 0^\\circ$ (paralelos).`,
            `$F = ${F}\\ \\text{N}$, $d = ${d}\\ \\text{m}$, $\\theta = 0^\\circ$ (parallel).`,
          ),
          step(
            "approach",
            "Trabajo de una fuerza constante: $W = F\\,d\\cos\\theta$.",
            "Work of a constant force: $W = F\\,d\\cos\\theta$.",
          ),
          step(
            "calculation",
            `$W = ${F}\\ \\text{N} \\cdot ${d}\\ \\text{m} \\cdot \\cos 0^\\circ = ${F * d}\\ \\text{J}$`,
            `$W = ${F}\\ \\text{N} \\cdot ${d}\\ \\text{m} \\cdot \\cos 0^\\circ = ${F * d}\\ \\text{J}$`,
          ),
          step(
            "result",
            `La fuerza realiza un trabajo de $${tok(W)}\\ \\text{J}$.`,
            `The force does $${tok(W)}\\ \\text{J}$ of work.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Kinetic energy                                                    */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "we-ke-01",
      subject: "physics",
      topicId: "work-energy",
      subtopicId: "kinetic-energy",
      difficulty: "easy",
      questionType: "numeric-unit",
      estimatedTimeSec: 90,
      tags: ["kinetic-energy"],
      prerequisites: [],
    },
    (rng) => {
      const m = rng.pick([2, 4, 5, 6, 8, 10]);
      const v = rng.pick([2, 3, 4, 5, 6, 8, 10]);
      const K = sig2(0.5 * m * v * v);
      return {
        skill: L("Energía cinética", "Kinetic energy"),
        statement: L(
          `Una pelota de $${m}\\ \\text{kg}$ se mueve con una rapidez de $${v}\\ \\text{m/s}$. ¿Cuál es su **energía cinética**? (2 cifras significativas).`,
          `A $${m}\\ \\text{kg}$ ball moves with a speed of $${v}\\ \\text{m/s}$. What is its **kinetic energy**? (2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: K,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["J", "joules"],
          unitChoices: ["J", "N", "W", "kg·m/s"],
        },
        hints: [
          L(
            "La energía cinética depende de la masa y del cuadrado de la rapidez.",
            "Kinetic energy depends on the mass and on the square of the speed.",
          ),
          L(
            "La fórmula es $K = \\frac{1}{2} m v^2$.",
            "The formula is $K = \\frac{1}{2} m v^2$.",
          ),
          L(
            "Eleva la rapidez al cuadrado, multiplica por la masa y divide entre 2.",
            "Square the speed, multiply by the mass and divide by 2.",
          ),
        ],
        answerDisplay: L(`$K = ${tok(K)}\\ \\text{J}$`, `$K = ${tok(K)}\\ \\text{J}$`),
        solution: [
          step(
            "given",
            `$m = ${m}\\ \\text{kg}$, $v = ${v}\\ \\text{m/s}$.`,
            `$m = ${m}\\ \\text{kg}$, $v = ${v}\\ \\text{m/s}$.`,
          ),
          step(
            "approach",
            "Energía cinética: $K = \\frac{1}{2} m v^2$.",
            "Kinetic energy: $K = \\frac{1}{2} m v^2$.",
          ),
          step(
            "calculation",
            `$K = \\tfrac{1}{2} \\cdot ${m} \\cdot ${v}^2 = \\tfrac{1}{2} \\cdot ${m} \\cdot ${v * v} = ${tok(r1(0.5 * m * v * v))}\\ \\text{J} \\approx ${tok(K)}\\ \\text{J}$`,
            `$K = \\tfrac{1}{2} \\cdot ${m} \\cdot ${v}^2 = \\tfrac{1}{2} \\cdot ${m} \\cdot ${v * v} = ${tok(r1(0.5 * m * v * v))}\\ \\text{J} \\approx ${tok(K)}\\ \\text{J}$`,
          ),
          step(
            "result",
            `La pelota tiene una energía cinética de $\\approx ${tok(K)}\\ \\text{J}$.`,
            `The ball has a kinetic energy of $\\approx ${tok(K)}\\ \\text{J}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Gravitational PE                                                  */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "we-pe-01",
      subject: "physics",
      topicId: "work-energy",
      subtopicId: "gravitational-pe",
      difficulty: "easy",
      questionType: "numeric-unit",
      estimatedTimeSec: 90,
      tags: ["potential-energy", "gravity"],
      prerequisites: [],
    },
    (rng) => {
      const m = rng.pick([2, 3, 5, 8, 10, 15, 20]);
      const h = rng.pick([3, 5, 8, 10, 12, 15, 20]);
      const U = sig2(m * G_ACC * h);
      return {
        skill: L("Energía potencial gravitatoria", "Gravitational potential energy"),
        statement: L(
          `Una lámpara de $${m}\\ \\text{kg}$ cuelga a $${h}\\ \\text{m}$ sobre el suelo. Tomando el suelo como nivel de referencia, ¿qué **energía potencial gravitatoria** tiene? ($g = 9{,}8\\ \\text{m/s}^2$, 2 cifras significativas).`,
          `A $${m}\\ \\text{kg}$ lamp hangs $${h}\\ \\text{m}$ above the floor. Taking the floor as the reference level, what **gravitational potential energy** does it have? ($g = 9.8\\ \\text{m/s}^2$, 2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: U,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["J", "joules"],
          unitChoices: ["J", "N", "W", "kg"],
        },
        hints: [
          L(
            "La energía potencial depende de la altura sobre el nivel de referencia elegido.",
            "Potential energy depends on the height above the chosen reference level.",
          ),
          L(
            "La fórmula es $U = m\\,g\\,h$.",
            "The formula is $U = m\\,g\\,h$.",
          ),
          L(
            "Multiplica masa, $g$ y altura; el resultado es en julios.",
            "Multiply mass, $g$ and height; the result is in joules.",
          ),
        ],
        answerDisplay: L(`$U = ${tok(U)}\\ \\text{J}$`, `$U = ${tok(U)}\\ \\text{J}$`),
        solution: [
          step(
            "given",
            `$m = ${m}\\ \\text{kg}$, $h = ${h}\\ \\text{m}$, $g = 9{,}8\\ \\text{m/s}^2$, referencia: suelo.`,
            `$m = ${m}\\ \\text{kg}$, $h = ${h}\\ \\text{m}$, $g = 9.8\\ \\text{m/s}^2$, reference: floor.`,
          ),
          step(
            "approach",
            "Energía potencial gravitatoria: $U = m\\,g\\,h$.",
            "Gravitational potential energy: $U = m\\,g\\,h$.",
          ),
          step(
            "calculation",
            `$U = ${m} \\cdot 9{,}8 \\cdot ${h} = ${tok(r1(m * G_ACC * h))}\\ \\text{J} \\approx ${tok(U)}\\ \\text{J}$`,
            `$U = ${m} \\cdot 9.8 \\cdot ${h} = ${tok(r1(m * G_ACC * h))}\\ \\text{J} \\approx ${tok(U)}\\ \\text{J}$`,
          ),
          step(
            "result",
            `La lámpara almacena $\\approx ${tok(U)}\\ \\text{J}$ de energía potencial.`,
            `The lamp stores $\\approx ${tok(U)}\\ \\text{J}$ of potential energy.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Zero-work situations (concept MC)                                 */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "we-concept-01",
      subject: "physics",
      topicId: "work-energy",
      subtopicId: "work",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["work", "concept", "perpendicular-force"],
      prerequisites: ["work"],
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "La fuerza normal sobre un coche que recorre una carretera llana",
            "The normal force on a car driving along a level road",
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            "El peso de una manzana que cae",
            "The weight of a falling apple",
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            "El rozamiento sobre un trineo que se desliza",
            "Friction on a sliding sled",
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            "El empuje del viento sobre una vela que avanza",
            "The push of the wind on a moving sail",
          ),
          correct: false,
        },
      ];
      return {
        skill: L("Trabajo nulo", "Zero work"),
        statement: L(
          "¿En cuál de estas situaciones la fuerza indicada realiza **trabajo nulo** sobre el objeto?",
          "In which of these situations does the stated force do **zero work** on the object?",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El trabajo es $W = F\\,d\\cos\\theta$, donde $\\theta$ es el ángulo entre la fuerza y el desplazamiento.",
            "Work is $W = F\\,d\\cos\\theta$, where $\\theta$ is the angle between force and displacement.",
          ),
          L(
            "El trabajo es nulo cuando la fuerza es **perpendicular** al desplazamiento ($\\cos 90^\\circ = 0$).",
            "Work is zero when the force is **perpendicular** to the displacement ($\\cos 90^\\circ = 0$).",
          ),
          L(
            "Busca la fuerza que apunta en dirección perpendicular al movimiento.",
            "Look for the force pointing perpendicular to the motion.",
          ),
        ],
        answerDisplay: L(
          "La normal sobre un coche en carretera llana (perpendicular al movimiento)",
          "The normal force on a car on a level road (perpendicular to the motion)",
        ),
        solution: [
          step(
            "given",
            "Cuatro pares fuerza–movimiento distintos.",
            "Four different force–motion pairs.",
          ),
          step(
            "approach",
            "Evaluar el ángulo $\\theta$ entre cada fuerza y su desplazamiento.",
            "Evaluate the angle $\\theta$ between each force and its displacement.",
          ),
          step(
            "calculation",
            "El peso de la manzana y el viento en la vela actúan a lo largo del movimiento ($\\theta = 0^\\circ$, trabajo positivo); el rozamiento va en contra ($\\theta = 180^\\circ$, trabajo negativo); la normal sobre la carretera llana es vertical y el movimiento horizontal: $\\theta = 90^\\circ \\Rightarrow W = 0$.",
            "The apple's weight and the wind on the sail act along the motion ($\\theta = 0^\\circ$, positive work); friction opposes it ($\\theta = 180^\\circ$, negative work); the normal force on a level road is vertical while the motion is horizontal: $\\theta = 90^\\circ \\Rightarrow W = 0$.",
          ),
          step(
            "result",
            "Solo la normal sobre el coche en carretera llana hace trabajo nulo.",
            "Only the normal force on the car on a level road does zero work.",
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Work with an angle (positive or negative)                          */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "we-work-02",
      subject: "physics",
      topicId: "work-energy",
      subtopicId: "work",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 150,
      tags: ["work", "angle", "cosine"],
      prerequisites: ["work"],
    },
    (rng) => {
      const ang = rng.pick([60, 120]);
      const cosA = ang === 60 ? 0.5 : -0.5;
      const F = rng.pick([20, 30, 40, 50, 60, 80]);
      const d = rng.pick([4, 5, 8, 10, 12]);
      const W = sig2(F * d * cosA);
      return {
        skill: L("Trabajo con ángulo", "Work at an angle"),
        statement: L(
          `Se arrastra un equipaje aplicando una fuerza de $${F}\\ \\text{N}$ mediante un asa; la fuerza forma $${ang}^\\circ$ con el desplazamiento de $${d}\\ \\text{m}$. Calcula el **trabajo** de esa fuerza (con signo). Usa $\\cos ${ang}^\\circ = ${tok(cosA)}$ (2 cifras significativas).`,
          `A suitcase is pulled with a force of $${F}\\ \\text{N}$ through its handle; the force makes $${ang}^\\circ$ with the $${d}\\ \\text{m}$ displacement. Compute the **work** of that force (with sign). Use $\\cos ${ang}^\\circ = ${tok(cosA)}$ (2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: W,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["J", "joules"],
          unitChoices: ["J", "N", "W", "N·m"],
        },
        hints: [
          L(
            "Solo la componente de la fuerza a lo largo del desplazamiento trabaja.",
            "Only the component of the force along the displacement does work.",
          ),
          L(
            "El trabajo es $W = F\\,d\\cos\\theta$; fíjate en el signo del coseno.",
            "Work is $W = F\\,d\\cos\\theta$; mind the sign of the cosine.",
          ),
          L(
            `Sustituye: multiplica $F$, $d$ y $\\cos ${ang}^\\circ$.`,
            `Substitute: multiply $F$, $d$ and $\\cos ${ang}^\\circ$.`,
          ),
        ],
        answerDisplay: L(`$W = ${tok(W)}\\ \\text{J}$`, `$W = ${tok(W)}\\ \\text{J}$`),
        solution: [
          step(
            "given",
            `$F = ${F}\\ \\text{N}$, $d = ${d}\\ \\text{m}$, $\\theta = ${ang}^\\circ$, $\\cos\\theta = ${tok(cosA)}$.`,
            `$F = ${F}\\ \\text{N}$, $d = ${d}\\ \\text{m}$, $\\theta = ${ang}^\\circ$, $\\cos\\theta = ${tok(cosA)}$.`,
          ),
          step(
            "approach",
            "Trabajo de una fuerza constante: $W = F\\,d\\cos\\theta$.",
            "Work of a constant force: $W = F\\,d\\cos\\theta$.",
          ),
          step(
            "calculation",
            `$W = ${F} \\cdot ${d} \\cdot (${tok(cosA)}) = ${tok(r1(F * d * cosA))}\\ \\text{J} \\approx ${tok(W)}\\ \\text{J}$`,
            `$W = ${F} \\cdot ${d} \\cdot (${tok(cosA)}) = ${tok(r1(F * d * cosA))}\\ \\text{J} \\approx ${tok(W)}\\ \\text{J}$`,
          ),
          step(
            "result",
            `${ang === 60
              ? `El trabajo es $${tok(W)}\\ \\text{J}$, positivo: la fuerza ayuda al avance.`
              : `El trabajo es $${tok(W)}\\ \\text{J}$, negativo: la componente de la fuerza se opone al avance.`}`,
            `${ang === 60
              ? `The work is $${tok(W)}\\ \\text{J}$, positive: the force helps the motion.`
              : `The work is $${tok(W)}\\ \\text{J}$, negative: the force component opposes the motion.`}`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Power: climbing stairs                                            */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "we-power-01",
      subject: "physics",
      topicId: "work-energy",
      subtopicId: "power",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 180,
      tags: ["power", "work", "stairs"],
      prerequisites: ["work", "gravitational-pe"],
    },
    (rng) => {
      const m = rng.pick([50, 55, 60, 65, 70, 75, 80]);
      const h = rng.pick([3, 4, 5, 6, 8, 10, 12]);
      const t = rng.pick([4, 5, 8, 10, 12, 15]);
      const work = m * G_ACC * h;
      const P = sig2(work / t);
      return {
        skill: L("Potencia media", "Average power"),
        statement: L(
          `Una persona de $${m}\\ \\text{kg}$ sube corriendo una escalera que la eleva $${h}\\ \\text{m}$ en $${t}\\ \\text{s}$. ¿Qué **potencia media** desarrolla? ($g = 9{,}8\\ \\text{m/s}^2$, 2 cifras significativas).`,
          `A $${m}\\ \\text{kg}$ person runs up a staircase that raises them $${h}\\ \\text{m}$ in $${t}\\ \\text{s}$. What **average power** do they develop? ($g = 9.8\\ \\text{m/s}^2$, 2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: P,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["W", "watts", "J/s"],
          unitChoices: ["W", "kW", "J", "N"],
        },
        hints: [
          L(
            "Primero calcula el trabajo para subir: es el aumento de energía potencial, $W = m\\,g\\,h$.",
            "First compute the work to climb: it is the gain in potential energy, $W = m\\,g\\,h$.",
          ),
          L(
            "La potencia media es el trabajo entre el tiempo: $P = W/t$.",
            "Average power is work over time: $P = W/t$.",
          ),
          L(
            "Sustituye el trabajo y el tiempo; el resultado queda en vatios (W).",
            "Substitute work and time; the result is in watts (W).",
          ),
        ],
        answerDisplay: L(`$P \\approx ${tok(P)}\\ \\text{W}$`, `$P \\approx ${tok(P)}\\ \\text{W}$`),
        solution: [
          step(
            "given",
            `$m = ${m}\\ \\text{kg}$, $h = ${h}\\ \\text{m}$, $t = ${t}\\ \\text{s}$, $g = 9{,}8\\ \\text{m/s}^2$.`,
            `$m = ${m}\\ \\text{kg}$, $h = ${h}\\ \\text{m}$, $t = ${t}\\ \\text{s}$, $g = 9.8\\ \\text{m/s}^2$.`,
          ),
          step(
            "approach",
            "El trabajo al subir a velocidad constante es $W = mgh$; la potencia media es $P = W/t$.",
            "The work to climb at steady speed is $W = mgh$; average power is $P = W/t$.",
          ),
          step(
            "calculation",
            `$W = ${m} \\cdot 9{,}8 \\cdot ${h} = ${tok(r1(work))}\\ \\text{J}$<br>$P = \\frac{ ${tok(r1(work))}}{${t}} = ${tok(r2(work / t))}\\ \\text{W} \\approx ${tok(P)}\\ \\text{W}$`,
            `$W = ${m} \\cdot 9.8 \\cdot ${h} = ${tok(r1(work))}\\ \\text{J}$<br>$P = \\frac{ ${tok(r1(work))}}{${t}} = ${tok(r2(work / t))}\\ \\text{W} \\approx ${tok(P)}\\ \\text{W}$`,
          ),
          step(
            "result",
            `La persona desarrolla una potencia media de $\\approx ${tok(P)}\\ \\text{W}$${P >= 746 ? ` (unos $${tok(r2(P / 746))}$ caballos de vapor)` : " (menos de un caballo de vapor)"}.`,
            `The person develops an average power of $\\approx ${tok(P)}\\ \\text{W}$${P >= 746 ? ` (about $${tok(r2(P / 746))}$ horsepower)` : " (less than one horsepower)"}.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Elastic PE of a spring                                            */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "we-spring-01",
      subject: "physics",
      topicId: "work-energy",
      subtopicId: "elastic-pe",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 150,
      tags: ["spring", "elastic-pe", "hooke"],
      prerequisites: [],
    },
    (rng) => {
      const k = rng.pick([100, 150, 200, 250, 300, 400, 500]);
      const x = rng.pick([0.1, 0.15, 0.2, 0.25, 0.3]);
      const U = sig2(0.5 * k * x * x);
      return {
        skill: L("Energía potencial elástica", "Elastic potential energy"),
        statement: L(
          `Se comprime un muelle de constante $k = ${k}\\ \\text{N/m}$ una distancia de $${tok(x)}\\ \\text{m}$ desde su longitud natural. ¿Qué **energía potencial elástica** se almacena? (2 cifras significativas).`,
          `A spring with stiffness $k = ${k}\\ \\text{N/m}$ is compressed by $${tok(x)}\\ \\text{m}$ from its natural length. How much **elastic potential energy** is stored? (2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: U,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["J", "joules"],
          unitChoices: ["J", "N", "N/m", "W"],
        },
        hints: [
          L(
            "La energía de un muelle depende del cuadrado de la deformación.",
            "A spring's energy depends on the square of the deformation.",
          ),
          L(
            "La fórmula es $U = \\frac{1}{2} k x^2$.",
            "The formula is $U = \\frac{1}{2} k x^2$.",
          ),
          L(
            "Eleva $x$ al cuadrado, multiplica por $k$ y divide entre 2.",
            "Square $x$, multiply by $k$ and divide by 2.",
          ),
        ],
        answerDisplay: L(`$U = ${tok(U)}\\ \\text{J}$`, `$U = ${tok(U)}\\ \\text{J}$`),
        solution: [
          step(
            "given",
            `$k = ${k}\\ \\text{N/m}$, $x = ${tok(x)}\\ \\text{m}$.`,
            `$k = ${k}\\ \\text{N/m}$, $x = ${tok(x)}\\ \\text{m}$.`,
          ),
          step(
            "approach",
            "Energía potencial elástica: $U = \\frac{1}{2} k x^2$.",
            "Elastic potential energy: $U = \\frac{1}{2} k x^2$.",
          ),
          step(
            "calculation",
            `$U = \\tfrac{1}{2} \\cdot ${k} \\cdot (${tok(x)})^2 = \\tfrac{1}{2} \\cdot ${k} \\cdot ${tok(r2(x * x))} = ${tok(r2(0.5 * k * x * x))}\\ \\text{J} \\approx ${tok(U)}\\ \\text{J}$`,
            `$U = \\tfrac{1}{2} \\cdot ${k} \\cdot (${tok(x)})^2 = \\tfrac{1}{2} \\cdot ${k} \\cdot ${tok(r2(x * x))} = ${tok(r2(0.5 * k * x * x))}\\ \\text{J} \\approx ${tok(U)}\\ \\text{J}$`,
          ),
          step(
            "result",
            `El muelle almacena $\\approx ${tok(U)}\\ \\text{J}$, lista para devolverse al soltarlo.`,
            `The spring stores $\\approx ${tok(U)}\\ \\text{J}$, ready to be given back on release.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Symbolic: v from work-energy theorem (expression)                 */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "we-expr-01",
      subject: "physics",
      topicId: "work-energy",
      subtopicId: "kinetic-energy",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 180,
      tags: ["work-energy-theorem", "symbolic", "rearrangement"],
      prerequisites: ["work", "kinetic-energy"],
    },
    (rng) => {
      const ctx = [
        { es: "una caja", en: "a crate" },
        { es: "un trineo", en: "a sled" },
        { es: "un disco de hielo", en: "an ice puck" },
      ];
      const pick = rng.pick(ctx);
      return {
        skill: L("Teorema trabajo–energía (simbólico)", "Work–energy theorem (symbolic)"),
        statement: L(
          `Sobre ${pick.es} de masa $m$, inicialmente en reposo, se realiza un trabajo neto total $W$. Escribe su rapidez final $v$ **en función de $W$ y $m$**. (Teclea la fórmula con * para multiplicar, / para dividir, ^ para potencias y sqrt() para raíces; por ejemplo sqrt(2*g*h).)`,
          `A total net work $W$ is done on ${pick.en} of mass $m$, initially at rest. Write its final speed $v$ **in terms of $W$ and $m$**. (Type the formula using * for times, / for divide, ^ for powers and sqrt() for roots; for instance sqrt(2*g*h).)`,
        ),
        answer: {
          kind: "expression",
          accepted: ["sqrt(2*W/m)", "sqrt(2W/m)", "(2*W/m)^(1/2)", "sqrt(2*W)/sqrt(m)"],
          variables: ["W", "m"],
        },
        hints: [
          L(
            "El teorema trabajo–energía conecta el trabajo neto con el cambio de energía cinética.",
            "The work–energy theorem links net work to the change in kinetic energy.",
          ),
          L(
            "Parte del reposo, así que $\\Delta K = \\frac{1}{2} m v^2 - 0$.",
            "It starts from rest, so $\\Delta K = \\frac{1}{2} m v^2 - 0$.",
          ),
          L(
            "Iguala $W = \\frac{1}{2} m v^2$, despeja $v^2 = \\frac{2W}{m}$ y toma la raíz.",
            "Set $W = \\frac{1}{2} m v^2$, solve $v^2 = \\frac{2W}{m}$ and take the root.",
          ),
        ],
        answerDisplay: L(
          `$v = \\sqrt{\\dfrac{2W}{m}}$`,
          `$v = \\sqrt{\\dfrac{2W}{m}}$`,
        ),
        solution: [
          step(
            "given",
            `Masa $m$, trabajo neto total $W$, rapidez inicial nula.`,
            `Mass $m$, total net work $W$, initial speed zero.`,
          ),
          step(
            "approach",
            "Teorema trabajo–energía: $W_{neto} = \\Delta K$.",
            "Work–energy theorem: $W_{net} = \\Delta K$.",
          ),
          step(
            "calculation",
            `$W = \\tfrac{1}{2} m v^2 - 0 \\Rightarrow v^2 = \\dfrac{2W}{m} \\Rightarrow v = \\sqrt{\\dfrac{2W}{m}}$`,
            `$W = \\tfrac{1}{2} m v^2 - 0 \\Rightarrow v^2 = \\dfrac{2W}{m} \\Rightarrow v = \\sqrt{\\dfrac{2W}{m}}$`,
          ),
          step(
            "result",
            `La rapidez final es $v = \\sqrt{\\frac{2W}{m}}$, independiente de la trayectoria.`,
            `The final speed is $v = \\sqrt{\\frac{2W}{m}}$, independent of the path.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Conservation: speed at the bottom of a drop                       */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "we-cons-01",
      subject: "physics",
      topicId: "work-energy",
      subtopicId: "conservation",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 180,
      tags: ["conservation", "free-fall", "energy"],
      prerequisites: ["gravitational-pe", "kinetic-energy"],
    },
    (rng) => {
      const h = rng.pick([5, 8, 10, 12, 15, 20, 30, 45]);
      const v = sig2(Math.sqrt(2 * G_ACC * h));
      return {
        skill: L("Conservación de la energía en una caída", "Energy conservation in a fall"),
        statement: L(
          `Se deja caer una manzana desde $${h}\\ \\text{m}$ de altura. Usando **conservación de la energía** (no cinemática), ¿con qué rapidez llega al suelo? ($g = 9{,}8\\ \\text{m/s}^2$, 2 cifras significativas).`,
          `An apple is dropped from a height of $${h}\\ \\text{m}$. Using **energy conservation** (not kinematics), with what speed does it reach the ground? ($g = 9.8\\ \\text{m/s}^2$, 2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: v,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m/s"],
          unitChoices: ["m/s", "m/s^2", "m", "J"],
        },
        hints: [
          L(
            "Sin rozamiento, la energía potencial inicial se convierte en cinética al final.",
            "Without friction, the initial potential energy turns into kinetic energy at the end.",
          ),
          L(
            "Escribe $m\\,g\\,h = \\frac{1}{2} m v^2$: la masa se cancela.",
            "Write $m\\,g\\,h = \\frac{1}{2} m v^2$: the mass cancels.",
          ),
          L(
            "Despeja $v = \\sqrt{2gh}$ y sustituye la altura.",
            "Solve $v = \\sqrt{2gh}$ and substitute the height.",
          ),
        ],
        answerDisplay: L(
          `$v \\approx ${tok(v)}\\ \\text{m/s}$`,
          `$v \\approx ${tok(v)}\\ \\text{m/s}$`,
        ),
        solution: [
          step(
            "given",
            `$h = ${h}\\ \\text{m}$, $v_0 = 0$, $g = 9{,}8\\ \\text{m/s}^2$, sin rozamiento.`,
            `$h = ${h}\\ \\text{m}$, $v_0 = 0$, $g = 9.8\\ \\text{m/s}^2$, frictionless.`,
          ),
          step(
            "approach",
            "Conservación de la energía mecánica: $U_i = K_f$, es decir $mgh = \\frac{1}{2}mv^2$.",
            "Conservation of mechanical energy: $U_i = K_f$, i.e. $mgh = \\frac{1}{2}mv^2$.",
          ),
          step(
            "calculation",
            `$mgh = \\tfrac{1}{2} m v^2 \\Rightarrow v = \\sqrt{2gh}$<br>$v = \\sqrt{2 \\cdot 9{,}8 \\cdot ${h}} = \\sqrt{ ${tok(r1(2 * G_ACC * h))}} = ${tok(r2(Math.sqrt(2 * G_ACC * h)))}\\ \\text{m/s} \\approx ${tok(v)}\\ \\text{m/s}$`,
            `$mgh = \\tfrac{1}{2} m v^2 \\Rightarrow v = \\sqrt{2gh}$<br>$v = \\sqrt{2 \\cdot 9.8 \\cdot ${h}} = \\sqrt{ ${tok(r1(2 * G_ACC * h))}} = ${tok(r2(Math.sqrt(2 * G_ACC * h)))}\\ \\text{m/s} \\approx ${tok(v)}\\ \\text{m/s}$`,
          ),
          step(
            "result",
            `La manzana llega al suelo con $\\approx ${tok(v)}\\ \\text{m/s}$, el mismo resultado que daría la cinemática.`,
            `The apple reaches the ground at $\\approx ${tok(v)}\\ \\text{m/s}$, the same result kinematics gives.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Work-energy theorem: braking force                                */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "we-work-theorem-01",
      subject: "physics",
      topicId: "work-energy",
      subtopicId: "kinetic-energy",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 240,
      tags: ["work-energy-theorem", "braking", "force"],
      prerequisites: ["work", "kinetic-energy", "conservation"],
    },
    (rng) => {
      const combos = [
        { m: 800, v: 20, d: 40 },
        { m: 1200, v: 20, d: 30 },
        { m: 1500, v: 20, d: 60 },
        { m: 1000, v: 30, d: 50 },
        { m: 1500, v: 30, d: 45 },
        { m: 1000, v: 25, d: 50 },
      ];
      const pick = rng.pick(combos);
      const F = sig2((0.5 * pick.m * pick.v * pick.v) / pick.d);
      return {
        skill: L("Fuerza de frenado con el teorema trabajo–energía", "Braking force via the work–energy theorem"),
        statement: L(
          `Un coche de $${pick.m}\\ \\text{kg}$ circula a $${pick.v}\\ \\text{m/s}$ y frena hasta detenerse en $${pick.d}\\ \\text{m}$. ¿Qué **fuerza media de frenado** ejercen los frenos? (2 cifras significativas).`,
          `A $${pick.m}\\ \\text{kg}$ car travelling at $${pick.v}\\ \\text{m/s}$ brakes to a stop over $${pick.d}\\ \\text{m}$. What **average braking force** do the brakes apply? (2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: F,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["N"],
          unitChoices: ["N", "J", "W", "kg·m/s"],
        },
        hints: [
          L(
            "El trabajo de la fuerza de frenado se lleva toda la energía cinética del coche.",
            "The work of the braking force removes all the car's kinetic energy.",
          ),
          L(
            "Escribe $W = \\Delta K$: $-F\\,d = 0 - \\frac{1}{2} m v^2$ (el trabajo es negativo porque la fuerza se opone).",
            "Write $W = \\Delta K$: $-F\\,d = 0 - \\frac{1}{2} m v^2$ (the work is negative because the force opposes motion).",
          ),
          L(
            "Despeja $F = \\frac{m v^2}{2 d}$ y sustituye.",
            "Solve $F = \\frac{m v^2}{2 d}$ and substitute.",
          ),
        ],
        answerDisplay: L(`$F \\approx ${tok(F)}\\ \\text{N}$`, `$F \\approx ${tok(F)}\\ \\text{N}$`),
        solution: [
          step(
            "given",
            `$m = ${pick.m}\\ \\text{kg}$, $v = ${pick.v}\\ \\text{m/s}$, $d = ${pick.d}\\ \\text{m}$, $v_f = 0$.`,
            `$m = ${pick.m}\\ \\text{kg}$, $v = ${pick.v}\\ \\text{m/s}$, $d = ${pick.d}\\ \\text{m}$, $v_f = 0$.`,
          ),
          step(
            "approach",
            "Teorema trabajo–energía: el trabajo de frenado es el cambio de energía cinética.",
            "Work–energy theorem: the braking work equals the change in kinetic energy.",
          ),
          step(
            "calculation",
            `$-F\\,d = 0 - \\tfrac{1}{2} m v^2 \\Rightarrow F = \\frac{m v^2}{2d}$<br>$F = \\frac{${pick.m} \\cdot ${pick.v * pick.v}}{2 \\cdot ${pick.d}} = \\frac{ ${tok(r1(0.5 * pick.m * pick.v * pick.v))}\\ \\text{J}}{${pick.d}\\ \\text{m}} = ${tok(r2((0.5 * pick.m * pick.v * pick.v) / pick.d))}\\ \\text{N} \\approx ${tok(F)}\\ \\text{N}$`,
            `$-F\\,d = 0 - \\tfrac{1}{2} m v^2 \\Rightarrow F = \\frac{m v^2}{2d}$<br>$F = \\frac{${pick.m} \\cdot ${pick.v * pick.v}}{2 \\cdot ${pick.d}} = \\frac{ ${tok(r1(0.5 * pick.m * pick.v * pick.v))}\\ \\text{J}}{${pick.d}\\ \\text{m}} = ${tok(r2((0.5 * pick.m * pick.v * pick.v) / pick.d))}\\ \\text{N} \\approx ${tok(F)}\\ \\text{N}$`,
          ),
          step(
            "result",
            `Los frenos ejercen una fuerza media de $\\approx ${tok(F)}\\ \\text{N}$, opuesta al movimiento.`,
            `The brakes apply an average force of $\\approx ${tok(F)}\\ \\text{N}$, opposing the motion.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Spring launches a block up a ramp                                 */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "we-spring-02",
      subject: "physics",
      topicId: "work-energy",
      subtopicId: "elastic-pe",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 240,
      tags: ["elastic-pe", "conservation", "spring", "ramp"],
      prerequisites: ["elastic-pe", "gravitational-pe", "conservation"],
    },
    (rng) => {
      const combos = [
        { k: 200, x: 0.3, m: 2 },
        { k: 500, x: 0.2, m: 5 },
        { k: 400, x: 0.25, m: 1 },
        { k: 300, x: 0.4, m: 6 },
        { k: 250, x: 0.2, m: 0.5 },
      ];
      const pick = rng.pick(combos);
      const Ue = 0.5 * pick.k * pick.x * pick.x;
      const h = sig2(Ue / (pick.m * G_ACC));
      return {
        skill: L("Muelle que lanza un bloque por una rampa", "Spring launching a block up a ramp"),
        statement: L(
          `Un bloque de $${pick.m}\\ \\text{kg}$ comprime un muelle ($k = ${pick.k}\\ \\text{N/m}$) una distancia de $${tok(pick.x)}\\ \\text{m}$. Al soltarlo, el bloque sale disparado por una pista **sin rozamiento** y sube por una rampa lisa. ¿A qué **altura máxima** llega? ($g = 9{,}8\\ \\text{m/s}^2$, 2 cifras significativas).`,
          `A $${pick.m}\\ \\text{kg}$ block compresses a spring ($k = ${pick.k}\\ \\text{N/m}$) by $${tok(pick.x)}\\ \\text{m}$. On release, the block is launched along a **frictionless** track and climbs a smooth ramp. What **maximum height** does it reach? ($g = 9.8\\ \\text{m/s}^2$, 2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: h,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m"],
          unitChoices: ["m", "cm", "m/s", "J"],
        },
        hints: [
          L(
            "Sin rozamiento, toda la energía potencial elástica se convierte en potencial gravitatoria en el punto más alto.",
            "Without friction, all the elastic potential energy becomes gravitational potential energy at the highest point.",
          ),
          L(
            "Escribe $\\frac{1}{2} k x^2 = m\\,g\\,h$ en el punto más alto (allí la energía cinética es cero).",
            "Write $\\frac{1}{2} k x^2 = m\\,g\\,h$ at the highest point (kinetic energy is zero there).",
          ),
          L(
            "Despeja $h = \\dfrac{k x^2}{2 m g}$ y sustituye.",
            "Solve $h = \\dfrac{k x^2}{2 m g}$ and substitute.",
          ),
        ],
        answerDisplay: L(`$h \\approx ${tok(h)}\\ \\text{m}$`, `$h \\approx ${tok(h)}\\ \\text{m}$`),
        solution: [
          step(
            "given",
            `$k = ${pick.k}\\ \\text{N/m}$, $x = ${tok(pick.x)}\\ \\text{m}$, $m = ${pick.m}\\ \\text{kg}$, $g = 9{,}8\\ \\text{m/s}^2$, pista sin rozamiento.`,
            `$k = ${pick.k}\\ \\text{N/m}$, $x = ${tok(pick.x)}\\ \\text{m}$, $m = ${pick.m}\\ \\text{kg}$, $g = 9.8\\ \\text{m/s}^2$, frictionless track.`,
          ),
          step(
            "approach",
            "Conservación de la energía: $\\frac{1}{2} k x^2 = m g h$ (elástica → gravitatoria).",
            "Energy conservation: $\\frac{1}{2} k x^2 = m g h$ (elastic → gravitational).",
          ),
          step(
            "calculation",
            `$U_e = \\tfrac{1}{2} \\cdot ${pick.k} \\cdot (${tok(pick.x)})^2 = ${tok(r1(Ue))}\\ \\text{J}$<br>$h = \\dfrac{U_e}{m g} = \\dfrac{ ${tok(r1(Ue))}}{${pick.m} \\cdot 9{,}8} = ${tok(r2(Ue / (pick.m * G_ACC)))}\\ \\text{m} \\approx ${tok(h)}\\ \\text{m}$`,
            `$U_e = \\tfrac{1}{2} \\cdot ${pick.k} \\cdot (${tok(pick.x)})^2 = ${tok(r1(Ue))}\\ \\text{J}$<br>$h = \\dfrac{U_e}{m g} = \\dfrac{ ${tok(r1(Ue))}}{${pick.m} \\cdot 9.8} = ${tok(r2(Ue / (pick.m * G_ACC)))}\\ \\text{m} \\approx ${tok(h)}\\ \\text{m}$`,
          ),
          step(
            "result",
            `El bloque sube hasta $\\approx ${tok(h)}\\ \\text{m}$, donde se detiene un instante antes de volver.`,
            `The block climbs to $\\approx ${tok(h)}\\ \\text{m}$, pausing an instant before sliding back.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Challenge: ramp + rough floor, find μ                             */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "we-cons-02",
      subject: "physics",
      topicId: "work-energy",
      subtopicId: "conservation",
      difficulty: "challenge",
      questionType: "numeric",
      estimatedTimeSec: 300,
      tags: ["conservation", "friction", "energy-bookkeeping"],
      prerequisites: ["conservation", "work"],
    },
    (rng) => {
      const combos = [
        { h: 2, d: 8 },
        { h: 3, d: 15 },
        { h: 4, d: 10 },
        { h: 5, d: 20 },
        { h: 1.5, d: 5 },
        { h: 6, d: 20 },
      ];
      const pick = rng.pick(combos);
      const mu = sig2(pick.h / pick.d);
      return {
        skill: L("Rampa + suelo rugoso: energía con balance completo", "Ramp + rough floor: full energy bookkeeping"),
        statement: L(
          `Un bloque parte del reposo en lo alto de una rampa **sin rozamiento** de altura $${tok(pick.h)}\\ \\text{m}$ y, al llegar abajo, se desliza por un suelo horizontal rugoso hasta detenerse tras recorrer $${pick.d}\\ \\text{m}$. ¿Cuál es el **coeficiente de rozamiento** entre el bloque y el suelo? (2 cifras significativas; el resultado no tiene unidades).`,
          `A block starts from rest at the top of a **frictionless** ramp of height $${tok(pick.h)}\\ \\text{m}$ and, at the bottom, slides along a rough horizontal floor until it stops after $${pick.d}\\ \\text{m}$. What is the **coefficient of friction** between block and floor? (2 significant figures; the result has no units).`,
        ),
        answer: {
          kind: "numeric",
          value: mu,
          tolerance: { mode: "sigfig", value: 2 },
        },
        hints: [
          L(
            "Haz la contabilidad de la energía del trayecto completo: la energía potencial inicial se disipa por el rozamiento en el suelo.",
            "Do the energy accounting of the whole trip: the initial potential energy is dissipated by friction on the floor.",
          ),
          L(
            "El trabajo del rozamiento en el tramo horizontal es $-\\mu\\,m\\,g\\,d$ (la normal allí es $mg$).",
            "The work of friction along the horizontal stretch is $-\\mu\\,m\\,g\\,d$ (the normal force there is $mg$).",
          ),
          L(
            "Iguala $m\\,g\\,h = \\mu\\,m\\,g\\,d$: masa y $g$ se cancelan.",
            "Set $m\\,g\\,h = \\mu\\,m\\,g\\,d$: the mass and $g$ cancel.",
          ),
        ],
        answerDisplay: L(`$\\mu \\approx ${tok(mu)}$`, `$\\mu \\approx ${tok(mu)}$`),
        solution: [
          step(
            "given",
            `Rampa lisa de altura $h = ${tok(pick.h)}\\ \\text{m}$; suelo rugoso con recorrido $d = ${pick.d}\\ \\text{m}$ hasta pararse; arranque desde el reposo y parada final.`,
            `Smooth ramp of height $h = ${tok(pick.h)}\\ \\text{m}$; rough floor with a run of $d = ${pick.d}\\ \\text{m}$ to a stop; start from rest, end at rest.`,
          ),
          step(
            "approach",
            "Energía total: toda la $U$ inicial acaba disipada por el rozamiento: $mgh = \\mu\\,m\\,g\\,d$.",
            "Total energy: all the initial $U$ ends up dissipated by friction: $mgh = \\mu\\,m\\,g\\,d$.",
          ),
          step(
            "calculation",
            `$m\\,g\\,h = \\mu\\,m\\,g\\,d \\Rightarrow \\mu = \\dfrac{h}{d} = \\dfrac{ ${tok(pick.h)}}{${pick.d}} = ${tok(r2(pick.h / pick.d))} \\approx ${tok(mu)}$`,
            `$m\\,g\\,h = \\mu\\,m\\,g\\,d \\Rightarrow \\mu = \\dfrac{h}{d} = \\dfrac{ ${tok(pick.h)}}{${pick.d}} = ${tok(r2(pick.h / pick.d))} \\approx ${tok(mu)}$`,
          ),
          step(
            "result",
            `El coeficiente de rozamiento es $\\approx ${tok(mu)}$: ni la masa ni $g$ aparecen en el resultado, solo la razón entre altura y alcance.`,
            `The coefficient of friction is $\\approx ${tok(mu)}$: neither the mass nor $g$ appears in the result, only the ratio of height to run.`,
          ),
        ],
      };
    },
  ),
];
