/**
 * PHYSICS · Rotational Motion
 *
 * Angular displacement, angular velocity, torque, moment of inertia,
 * rotational energy and angular momentum (including its conservation).
 * Two multiple-choice problems included; sigfig-2 tolerance throughout.
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

export const templates: ProblemTemplate[] = [
  /* ---------------------------------------------------------------- */
  /* Full turns → radians                                             */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "rot-angdisp-01",
      subject: "physics",
      topicId: "rotational-motion",
      subtopicId: "angular-displacement",
      difficulty: "easy",
      questionType: "numeric-unit",
      estimatedTimeSec: 90,
      tags: ["angular-displacement", "radians"],
      prerequisites: [],
    },
    (rng) => {
      const n = rng.pick([2, 3, 5, 8]);
      const theta = sig2(2 * Math.PI * n);
      return {
        skill: L("Vueltas a radianes", "Turns to radians"),
        statement: L(
          `Una rueda gira $${n}$ vueltas completas. ¿Qué **desplazamiento angular** recorre, en radianes? (Usa $\\pi \\approx 3{,}1416$; 2 cifras significativas).`,
          `A wheel makes $${n}$ complete turns. What **angular displacement** does it cover, in radians? (Use $\\pi \\approx 3.1416$; 2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: theta,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["rad", "radianes", "radians"],
          unitChoices: ["rad", "°", "rev", "m"],
        },
        hints: [
          L(
            "Una vuelta completa equivale a $2\\pi$ radianes.",
            "One full turn equals $2\\pi$ radians.",
          ),
          L(
            "El desplazamiento angular total es $\\theta = 2\\pi n$ para $n$ vueltas.",
            "The total angular displacement is $\\theta = 2\\pi n$ for $n$ turns.",
          ),
          L(
            "Multiplica $2\\pi$ por el número de vueltas.",
            "Multiply $2\\pi$ by the number of turns.",
          ),
        ],
        answerDisplay: L(
          `$\\theta \\approx ${tok(theta)}\\ \\text{rad}$`,
          `$\\theta \\approx ${tok(theta)}\\ \\text{rad}$`,
        ),
        solution: [
          step(
            "given",
            `$n = ${n}$ vueltas; $1$ vuelta $= 2\\pi\\ \\text{rad}$.`,
            `$n = ${n}$ turns; $1$ turn $= 2\\pi\\ \\text{rad}$.`,
          ),
          step(
            "approach",
            "Convertimos vueltas a radianes con $\\theta = 2\\pi n$.",
            "Convert turns to radians with $\\theta = 2\\pi n$.",
          ),
          step(
            "calculation",
            `$\\theta = 2\\pi \\cdot ${n} = ${2 * n}\\pi = ${2 * n} \\cdot 3{,}1416 = ${tok(r1(2 * Math.PI * n))}\\ \\text{rad} \\approx ${tok(theta)}\\ \\text{rad}$`,
            `$\\theta = 2\\pi \\cdot ${n} = ${2 * n}\\pi = ${2 * n} \\cdot 3.1416 = ${tok(r1(2 * Math.PI * n))}\\ \\text{rad} \\approx ${tok(theta)}\\ \\text{rad}$`,
          ),
          step(
            "result",
            `La rueda recorre $\\approx ${tok(theta)}\\ \\text{rad}$.`,
            `The wheel covers $\\approx ${tok(theta)}\\ \\text{rad}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Angular velocity of a rolling wheel                               */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "rot-angvel-01",
      subject: "physics",
      topicId: "rotational-motion",
      subtopicId: "angular-velocity",
      difficulty: "easy",
      questionType: "numeric-unit",
      estimatedTimeSec: 90,
      tags: ["angular-velocity", "rolling"],
      prerequisites: ["angular-displacement"],
    },
    (rng) => {
      const r = rng.pick([0.1, 0.2, 0.25, 0.5]);
      const v = rng.pick([2, 3, 4, 5, 6, 8, 10]);
      const w = sig2(v / r);
      return {
        skill: L("Velocidad angular de una rueda que rueda", "Angular velocity of a rolling wheel"),
        statement: L(
          `Una bicicleta avanza con rapidez constante de $${v}\\ \\text{m/s}$ y sus ruedas tienen un radio de $${tok(r)}\\ \\text{m}$. ¿Con qué **velocidad angular** giran las ruedas? (2 cifras significativas).`,
          `A bicycle moves at a constant speed of $${v}\\ \\text{m/s}$ and its wheels have a radius of $${tok(r)}\\ \\text{m}$. At what **angular velocity** do the wheels spin? (2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: w,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["rad/s"],
          unitChoices: ["rad/s", "m/s", "rad", "s"],
        },
        hints: [
          L(
            "Al rodar sin deslizar, la rapidez del centro es la rapidez tangencial del borde: $v = \\omega r$.",
            "When rolling without slipping, the centre's speed equals the rim's tangential speed: $v = \\omega r$.",
          ),
          L(
            "Despeja la velocidad angular: $\\omega = \\dfrac{v}{r}$.",
            "Solve for the angular velocity: $\\omega = \\dfrac{v}{r}$.",
          ),
          L(
            "Divide la rapidez lineal entre el radio; el resultado queda en rad/s.",
            "Divide the linear speed by the radius; the result is in rad/s.",
          ),
        ],
        answerDisplay: L(
          `$\\omega = ${tok(w)}\\ \\text{rad/s}$`,
          `$\\omega = ${tok(w)}\\ \\text{rad/s}$`,
        ),
        solution: [
          step(
            "given",
            `$v = ${v}\\ \\text{m/s}$, $r = ${tok(r)}\\ \\text{m}$ (rueda que rueda sin deslizar).`,
            `$v = ${v}\\ \\text{m/s}$, $r = ${tok(r)}\\ \\text{m}$ (wheel rolling without slipping).`,
          ),
          step(
            "approach",
            "Relación entre cantidades lineales y angulares: $v = \\omega r \\Rightarrow \\omega = v/r$.",
            "Link between linear and angular quantities: $v = \\omega r \\Rightarrow \\omega = v/r$.",
          ),
          step(
            "calculation",
            `$\\omega = \\dfrac{${v}\\ \\text{m/s}}{ ${tok(r)}\\ \\text{m}} = ${tok(w)}\\ \\text{rad/s}$`,
            `$\\omega = \\dfrac{${v}\\ \\text{m/s}}{ ${tok(r)}\\ \\text{m}} = ${tok(w)}\\ \\text{rad/s}$`,
          ),
          step(
            "result",
            `Las ruedas giran a $${tok(w)}\\ \\text{rad/s}$.`,
            `The wheels spin at $${tok(w)}\\ \\text{rad/s}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Torque of a perpendicular force                                   */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "rot-torque-01",
      subject: "physics",
      topicId: "rotational-motion",
      subtopicId: "torque",
      difficulty: "easy",
      questionType: "numeric-unit",
      estimatedTimeSec: 90,
      tags: ["torque", "wrench"],
      prerequisites: [],
    },
    (rng) => {
      const r = rng.pick([0.2, 0.25, 0.3, 0.4, 0.5, 0.8, 1]);
      const F = rng.pick([20, 30, 40, 50, 60, 80, 100]);
      const tau = sig2(r * F);
      return {
        skill: L("Par de una fuerza perpendicular", "Torque of a perpendicular force"),
        statement: L(
          `Para aflojar un tornillo se aplica una fuerza de $${F}\\ \\text{N}$ en el extremo de una llave, perpendicular al mango y a $${tok(r)}\\ \\text{m}$ del tornillo. ¿Qué **par (torque)** se ejerce sobre el tornillo? (2 cifras significativas).`,
          `To loosen a bolt, a force of $${F}\\ \\text{N}$ is applied at the end of a wrench, perpendicular to the handle and $${tok(r)}\\ \\text{m}$ from the bolt. What **torque** is exerted on the bolt? (2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: tau,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["N·m", "N*m"],
          unitChoices: ["N·m", "N", "N/m", "J"],
        },
        hints: [
          L(
            "El par mide el efecto de giro de una fuerza: depende de la fuerza y del brazo (distancia al eje).",
            "Torque measures the turning effect of a force: it depends on the force and on the lever arm (distance to the axis).",
          ),
          L(
            "Con la fuerza perpendicular al brazo: $\\tau = r\\,F$ (el seno de 90° vale 1).",
            "With the force perpendicular to the arm: $\\tau = r\\,F$ (the sine of 90° is 1).",
          ),
          L(
            "Multiplica el brazo por la fuerza; las unidades son N·m.",
            "Multiply the lever arm by the force; the units are N·m.",
          ),
        ],
        answerDisplay: L(
          `$\\tau = ${tok(tau)}\\ \\text{N·m}$`,
          `$\\tau = ${tok(tau)}\\ \\text{N·m}$`,
        ),
        solution: [
          step(
            "given",
            `$F = ${F}\\ \\text{N}$, $r = ${tok(r)}\\ \\text{m}$, $\\theta = 90^\\circ$.`,
            `$F = ${F}\\ \\text{N}$, $r = ${tok(r)}\\ \\text{m}$, $\\theta = 90^\\circ$.`,
          ),
          step(
            "approach",
            "Par de una fuerza: $\\tau = r\\,F\\sin\\theta$; con $\\theta = 90^\\circ$ queda $\\tau = r F$.",
            "Torque of a force: $\\tau = r\\,F\\sin\\theta$; with $\\theta = 90^\\circ$ it becomes $\\tau = r F$.",
          ),
          step(
            "calculation",
            `$\\tau = ${tok(r)}\\ \\text{m} \\cdot ${F}\\ \\text{N} = ${tok(r2(r * F))}\\ \\text{N·m} \\approx ${tok(tau)}\\ \\text{N·m}$`,
            `$\\tau = ${tok(r)}\\ \\text{m} \\cdot ${F}\\ \\text{N} = ${tok(r2(r * F))}\\ \\text{N·m} \\approx ${tok(tau)}\\ \\text{N·m}$`,
          ),
          step(
            "result",
            `El par sobre el tornillo es $\\approx ${tok(tau)}\\ \\text{N·m}$.`,
            `The torque on the bolt is $\\approx ${tok(tau)}\\ \\text{N·m}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Fractions of a turn in radians (MC)                               */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "rot-turns-01",
      subject: "physics",
      topicId: "rotational-motion",
      subtopicId: "angular-displacement",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 90,
      tags: ["angular-displacement", "radians", "pi"],
      prerequisites: ["angular-displacement"],
    },
    (rng) => {
      const items = [
        {
          nEs: "media vuelta",
          nEn: "half a turn",
          ok: "\\pi",
          bad: ["2\\pi", "\\frac{\\pi}{2}", "3\\pi"],
        },
        {
          nEs: "un cuarto de vuelta",
          nEn: "a quarter turn",
          ok: "\\frac{\\pi}{2}",
          bad: ["\\pi", "2\\pi", "\\frac{\\pi}{4}"],
        },
        {
          nEs: "una vuelta completa",
          nEn: "one full turn",
          ok: "2\\pi",
          bad: ["\\pi", "4\\pi", "\\frac{\\pi}{2}"],
        },
        {
          nEs: "una vuelta y media",
          nEn: "one and a half turns",
          ok: "3\\pi",
          bad: ["\\pi", "2\\pi", "4\\pi"],
        },
        {
          nEs: "dos vueltas completas",
          nEn: "two full turns",
          ok: "4\\pi",
          bad: ["2\\pi", "3\\pi", "\\pi"],
        },
      ];
      const pick = rng.pick(items);
      const options: McOption[] = [
        { id: "a", text: L(`$${pick.ok}$`, `$${pick.ok}$`), correct: true },
        { id: "b", text: L(`$${pick.bad[0]}$`, `$${pick.bad[0]}$`), correct: false },
        { id: "c", text: L(`$${pick.bad[1]}$`, `$${pick.bad[1]}$`), correct: false },
        { id: "d", text: L(`$${pick.bad[2]}$`, `$${pick.bad[2]}$`), correct: false },
      ];
      return {
        skill: L("Fracciones de vuelta en radianes", "Turn fractions in radians"),
        statement: L(
          `Una rueda gira ${pick.nEs}. ¿Qué ángulo barre, en radianes?`,
          `A wheel turns through ${pick.nEn}. What angle does it sweep, in radians?`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Una vuelta completa son $2\\pi$ radianes.",
            "A full turn is $2\\pi$ radians.",
          ),
          L(
            "Las fracciones de vuelta son fracciones de $2\\pi$.",
            "Turn fractions are fractions of $2\\pi$.",
          ),
          L(
            "Por ejemplo, media vuelta es la mitad de $2\\pi$.",
            "For instance, half a turn is half of $2\\pi$.",
          ),
        ],
        answerDisplay: L(`$${pick.ok}\\ \\text{rad}$`, `$${pick.ok}\\ \\text{rad}$`),
        solution: [
          step(
            "given",
            `Giro: ${pick.nEs}.`,
            `Rotation: ${pick.nEn}.`,
          ),
          step(
            "approach",
            "Comparamos la fracción de vuelta con la vuelta completa ($2\\pi$ rad).",
            "Compare the turn fraction with the full turn ($2\\pi$ rad).",
          ),
          step(
            "calculation",
            `1 vuelta $= 2\\pi$ rad, así que ${pick.nEs} corresponde a $${pick.ok}\\ \\text{rad}$.`,
            `1 turn $= 2\\pi$ rad, so ${pick.nEn} corresponds to $${pick.ok}\\ \\text{rad}$.`,
          ),
          step(
            "result",
            `El ángulo barrido es $${pick.ok}\\ \\text{rad}$.`,
            `The swept angle is $${pick.ok}\\ \\text{rad}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Torque with an angle (sin 30° = 0.5)                              */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "rot-torque-02",
      subject: "physics",
      topicId: "rotational-motion",
      subtopicId: "torque",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 150,
      tags: ["torque", "angle", "sine"],
      prerequisites: ["torque"],
    },
    (rng) => {
      const ang = rng.pick([30, 150]);
      const r = rng.pick([0.4, 0.5, 0.8, 1, 1.2]);
      const F = rng.pick([30, 40, 50, 60, 80, 100]);
      const tau = sig2(r * F * 0.5);
      return {
        skill: L("Par con ángulo cualquiera", "Torque at an arbitrary angle"),
        statement: L(
          `Una fuerza de $${F}\\ \\text{N}$ se aplica en el extremo de una barra, a $${tok(r)}\\ \\text{m}$ del eje de giro, formando $${ang}^\\circ$ con la barra. ¿Qué **par** ejerce? Usa $\\sin ${ang}^\\circ = 0{,}5$ (2 cifras significativas).`,
          `A force of $${F}\\ \\text{N}$ is applied at the end of a bar, $${tok(r)}\\ \\text{m}$ from the pivot, making $${ang}^\\circ$ with the bar. What **torque** does it exert? Use $\\sin ${ang}^\\circ = 0.5$ (2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: tau,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["N·m", "N*m"],
          unitChoices: ["N·m", "N", "N/m", "J"],
        },
        hints: [
          L(
            "Solo la componente perpendicular de la fuerza produce giro.",
            "Only the component of the force perpendicular to the arm produces rotation.",
          ),
          L(
            "El par es $\\tau = r\\,F\\,\\sin\\theta$, donde $\\theta$ es el ángulo entre la fuerza y el brazo.",
            "The torque is $\\tau = r\\,F\\,\\sin\\theta$, where $\\theta$ is the angle between force and arm.",
          ),
          L(
            `Sustituye: $\\tau = ${tok(r)} \\cdot ${F} \\cdot 0{,}5$.`,
            `Substitute: $\\tau = ${tok(r)} \\cdot ${F} \\cdot 0.5$.`,
          ),
        ],
        answerDisplay: L(
          `$\\tau \\approx ${tok(tau)}\\ \\text{N·m}$`,
          `$\\tau \\approx ${tok(tau)}\\ \\text{N·m}$`,
        ),
        solution: [
          step(
            "given",
            `$F = ${F}\\ \\text{N}$, $r = ${tok(r)}\\ \\text{m}$, $\\theta = ${ang}^\\circ$, $\\sin\\theta = 0{,}5$.`,
            `$F = ${F}\\ \\text{N}$, $r = ${tok(r)}\\ \\text{m}$, $\\theta = ${ang}^\\circ$, $\\sin\\theta = 0.5$.`,
          ),
          step(
            "approach",
            "Par de una fuerza: $\\tau = r\\,F\\,\\sin\\theta$.",
            "Torque of a force: $\\tau = r\\,F\\,\\sin\\theta$.",
          ),
          step(
            "calculation",
            `$\\tau = ${tok(r)} \\cdot ${F} \\cdot 0{,}5 = ${tok(r2(r * F * 0.5))}\\ \\text{N·m} \\approx ${tok(tau)}\\ \\text{N·m}$`,
            `$\\tau = ${tok(r)} \\cdot ${F} \\cdot 0.5 = ${tok(r2(r * F * 0.5))}\\ \\text{N·m} \\approx ${tok(tau)}\\ \\text{N·m}$`,
          ),
          step(
            "result",
            `El par es $\\approx ${tok(tau)}\\ \\text{N·m}$: la mitad del que daría la fuerza perpendicular, porque $\\sin ${ang}^\\circ = 0{,}5$.`,
            `The torque is $\\approx ${tok(tau)}\\ \\text{N·m}$: half of what a perpendicular force would give, because $\\sin ${ang}^\\circ = 0.5$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Which case gives the largest torque? (MC)                         */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "rot-torque-03",
      subject: "physics",
      topicId: "rotational-motion",
      subtopicId: "torque",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["torque", "concept", "lever-arm"],
      prerequisites: ["torque"],
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "$F = 30\\ \\text{N}$ aplicada a $0{,}4\\ \\text{m}$ del eje",
            "$F = 30\\ \\text{N}$ applied $0.4\\ \\text{m}$ from the axis",
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            "$F = 30\\ \\text{N}$ aplicada a $0{,}3\\ \\text{m}$ del eje",
            "$F = 30\\ \\text{N}$ applied $0.3\\ \\text{m}$ from the axis",
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            "$F = 15\\ \\text{N}$ aplicada a $0{,}4\\ \\text{m}$ del eje",
            "$F = 15\\ \\text{N}$ applied $0.4\\ \\text{m}$ from the axis",
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            "$F = 15\\ \\text{N}$ aplicada a $0{,}2\\ \\text{m}$ del eje",
            "$F = 15\\ \\text{N}$ applied $0.2\\ \\text{m}$ from the axis",
          ),
          correct: false,
        },
      ];
      return {
        skill: L("Comparar pares", "Comparing torques"),
        statement: L(
          "Se aprietan tuercas con la misma llave, aplicando la fuerza perpendicular al mango en cada caso. ¿Cuál de estas cuatro aplicaciones produce el **mayor par** sobre la tuerca?",
          "Nuts are tightened with the same wrench, applying the force perpendicular to the handle in every case. Which of these four applications produces the **largest torque** on the nut?",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Con la fuerza perpendicular al mango, el par es $\\tau = r\\,F$.",
            "With the force perpendicular to the handle, the torque is $\\tau = r\\,F$.",
          ),
          L(
            "El par crece tanto con la fuerza como con la distancia al eje: calcula el producto en cada caso.",
            "Torque grows with both the force and the distance to the axis: compute the product in each case.",
          ),
          L(
            "Compara los cuatro productos $r\\,F$.",
            "Compare the four products $r\\,F$.",
          ),
        ],
        answerDisplay: L(
          "$F = 30\\ \\text{N}$ a $0{,}4\\ \\text{m}$: $\\tau = 12\\ \\text{N·m}$, el mayor",
          "$F = 30\\ \\text{N}$ at $0.4\\ \\text{m}$: $\\tau = 12\\ \\text{N·m}$, the largest",
        ),
        solution: [
          step(
            "given",
            "Cuatro combinaciones de fuerza y brazo, todas perpendiculares al mango.",
            "Four force-and-arm combinations, all perpendicular to the handle.",
          ),
          step(
            "approach",
            "Con $\\theta = 90^\\circ$, comparamos los pares $\\tau = r\\,F$ de cada caso.",
            "With $\\theta = 90^\\circ$, we compare the torques $\\tau = r\\,F$ of each case.",
          ),
          step(
            "calculation",
            "Caso a: $0{,}4 \\cdot 30 = 12\\ \\text{N·m}$; caso b: $0{,}3 \\cdot 30 = 9\\ \\text{N·m}$; caso c: $0{,}4 \\cdot 15 = 6\\ \\text{N·m}$; caso d: $0{,}2 \\cdot 15 = 3\\ \\text{N·m}$.",
            "Case a: $0.4 \\cdot 30 = 12\\ \\text{N·m}$; case b: $0.3 \\cdot 30 = 9\\ \\text{N·m}$; case c: $0.4 \\cdot 15 = 6\\ \\text{N·m}$; case d: $0.2 \\cdot 15 = 3\\ \\text{N·m}$.",
          ),
          step(
            "result",
            "El mayor par es $12\\ \\text{N·m}$: fuerza grande y brazo largo ganan.",
            "The largest torque is $12\\ \\text{N·m}$: large force and long arm win.",
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Moment of inertia of point masses                                 */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "rot-inertia-01",
      subject: "physics",
      topicId: "rotational-motion",
      subtopicId: "moment-of-inertia",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 180,
      tags: ["moment-of-inertia", "point-masses"],
      prerequisites: ["angular-velocity"],
    },
    (rng) => {
      const combos = [
        { m1: 2, r1: 1, m2: 3, r2: 1.5 },
        { m1: 4, r1: 0.5, m2: 2, r2: 1 },
        { m1: 1, r1: 2, m2: 4, r2: 0.5 },
        { m1: 3, r1: 1, m2: 3, r2: 2 },
        { m1: 2, r1: 1.5, m2: 4, r2: 0.5 },
        { m1: 6, r1: 0.5, m2: 2, r2: 2 },
      ];
      const pick = rng.pick(combos);
      const I1 = pick.m1 * pick.r1 * pick.r1;
      const I2 = pick.m2 * pick.r2 * pick.r2;
      const I = sig2(I1 + I2);
      return {
        skill: L("Momento de inercia de masas puntuales", "Moment of inertia of point masses"),
        statement: L(
          `Un sistema está formado por dos masas puntuales unidas por una varilla ligera que gira alrededor de un eje: la masa de $${pick.m1}\\ \\text{kg}$ está a $${tok(pick.r1)}\\ \\text{m}$ del eje y la de $${pick.m2}\\ \\text{kg}$ a $${tok(pick.r2)}\\ \\text{m}$. ¿Cuál es el **momento de inercia total**? (2 cifras significativas).`,
          `A system consists of two point masses joined by a light rod rotating about an axis: the $${pick.m1}\\ \\text{kg}$ mass sits $${tok(pick.r1)}\\ \\text{m}$ from the axis and the $${pick.m2}\\ \\text{kg}$ mass $${tok(pick.r2)}\\ \\text{m}$ away. What is the **total moment of inertia**? (2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: I,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["kg·m^2", "kg*m^2", "kg·m²"],
          unitChoices: ["kg·m^2", "kg*m^2", "kg·m", "kg/m^2", "N·m"],
        },
        hints: [
          L(
            "El momento de inercia mide la resistencia a girar: juega el papel de la masa en rotación.",
            "The moment of inertia measures resistance to spinning: it plays the role of mass in rotation.",
          ),
          L(
            "Para masas puntuales: $I = \\Sigma m\\,r^2$, sumando cada masa por el cuadrado de su distancia al eje.",
            "For point masses: $I = \\Sigma m\\,r^2$, adding each mass times the square of its distance to the axis.",
          ),
          L(
            "Calcula cada término por separado y súmalos.",
            "Compute each term separately and add them.",
          ),
        ],
        answerDisplay: L(`$I \\approx ${tok(I)}\\ \\text{kg·m}^2$`, `$I \\approx ${tok(I)}\\ \\text{kg·m}^2$`),
        solution: [
          step(
            "given",
            `$m_1 = ${pick.m1}\\ \\text{kg}$ a $r_1 = ${tok(pick.r1)}\\ \\text{m}$; $m_2 = ${pick.m2}\\ \\text{kg}$ a $r_2 = ${tok(pick.r2)}\\ \\text{m}$.`,
            `$m_1 = ${pick.m1}\\ \\text{kg}$ at $r_1 = ${tok(pick.r1)}\\ \\text{m}$; $m_2 = ${pick.m2}\\ \\text{kg}$ at $r_2 = ${tok(pick.r2)}\\ \\text{m}$.`,
          ),
          step(
            "approach",
            "Momento de inercia de masas puntuales: $I = m_1 r_1^2 + m_2 r_2^2$.",
            "Moment of inertia of point masses: $I = m_1 r_1^2 + m_2 r_2^2$.",
          ),
          step(
            "calculation",
            `$I = ${pick.m1} \\cdot (${tok(pick.r1)})^2 + ${pick.m2} \\cdot (${tok(pick.r2)})^2 = ${tok(r2(I1))} + ${tok(r2(I2))} = ${tok(r2(I1 + I2))}\\ \\text{kg·m}^2 \\approx ${tok(I)}\\ \\text{kg·m}^2$`,
            `$I = ${pick.m1} \\cdot (${tok(pick.r1)})^2 + ${pick.m2} \\cdot (${tok(pick.r2)})^2 = ${tok(r2(I1))} + ${tok(r2(I2))} = ${tok(r2(I1 + I2))}\\ \\text{kg·m}^2 \\approx ${tok(I)}\\ \\text{kg·m}^2$`,
          ),
          step(
            "result",
            `El sistema tiene un momento de inercia de $\\approx ${tok(I)}\\ \\text{kg·m}^2$.`,
            `The system has a moment of inertia of $\\approx ${tok(I)}\\ \\text{kg·m}^2$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Rotational kinetic energy                                         */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "rot-energy-01",
      subject: "physics",
      topicId: "rotational-motion",
      subtopicId: "rotational-energy",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 150,
      tags: ["rotational-energy", "flywheel"],
      prerequisites: ["moment-of-inertia", "angular-velocity"],
    },
    (rng) => {
      const I = rng.pick([2, 4, 5, 8, 10, 20]);
      const w = rng.pick([2, 3, 4, 5, 6, 10]);
      const K = sig2(0.5 * I * w * w);
      return {
        skill: L("Energía cinética rotacional", "Rotational kinetic energy"),
        statement: L(
          `Un volante de inercia con $I = ${I}\\ \\text{kg·m}^2$ gira a $\\omega = ${w}\\ \\text{rad/s}$. ¿Qué **energía cinética rotacional** almacena? (2 cifras significativas).`,
          `A flywheel with $I = ${I}\\ \\text{kg·m}^2$ spins at $\\omega = ${w}\\ \\text{rad/s}$. How much **rotational kinetic energy** does it store? (2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: K,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["J", "joules"],
          unitChoices: ["J", "N·m", "W", "kg·m^2/s"],
        },
        hints: [
          L(
            "La energía cinética rotacional es el análogo de $\\frac{1}{2}mv^2$ con $I$ y $\\omega$.",
            "Rotational kinetic energy is the analogue of $\\frac{1}{2}mv^2$ with $I$ and $\\omega$.",
          ),
          L(
            "La fórmula es $K = \\frac{1}{2} I \\omega^2$.",
            "The formula is $K = \\frac{1}{2} I \\omega^2$.",
          ),
          L(
            "Eleva $\\omega$ al cuadrado, multiplica por $I$ y divide entre 2.",
            "Square $\\omega$, multiply by $I$ and divide by 2.",
          ),
        ],
        answerDisplay: L(`$K = ${tok(K)}\\ \\text{J}$`, `$K = ${tok(K)}\\ \\text{J}$`),
        solution: [
          step(
            "given",
            `$I = ${I}\\ \\text{kg·m}^2$, $\\omega = ${w}\\ \\text{rad/s}$.`,
            `$I = ${I}\\ \\text{kg·m}^2$, $\\omega = ${w}\\ \\text{rad/s}$.`,
          ),
          step(
            "approach",
            "Energía cinética rotacional: $K = \\frac{1}{2} I \\omega^2$.",
            "Rotational kinetic energy: $K = \\frac{1}{2} I \\omega^2$.",
          ),
          step(
            "calculation",
            `$K = \\tfrac{1}{2} \\cdot ${I} \\cdot ${w}^2 = \\tfrac{1}{2} \\cdot ${I} \\cdot ${w * w} = ${tok(r1(0.5 * I * w * w))}\\ \\text{J} \\approx ${tok(K)}\\ \\text{J}$`,
            `$K = \\tfrac{1}{2} \\cdot ${I} \\cdot ${w}^2 = \\tfrac{1}{2} \\cdot ${I} \\cdot ${w * w} = ${tok(r1(0.5 * I * w * w))}\\ \\text{J} \\approx ${tok(K)}\\ \\text{J}$`,
          ),
          step(
            "result",
            `El volante almacena $\\approx ${tok(K)}\\ \\text{J}$ de energía rotacional.`,
            `The flywheel stores $\\approx ${tok(K)}\\ \\text{J}$ of rotational energy.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Angular momentum L = Iω                                           */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "rot-angmom-01",
      subject: "physics",
      topicId: "rotational-motion",
      subtopicId: "angular-momentum",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 150,
      tags: ["angular-momentum"],
      prerequisites: ["moment-of-inertia", "angular-velocity"],
    },
    (rng) => {
      const I = rng.pick([4, 5, 8, 10, 12, 20, 25]);
      const w = rng.pick([2, 3, 4, 6, 8, 10]);
      const Lval = sig2(I * w);
      return {
        skill: L("Momento angular", "Angular momentum"),
        statement: L(
          `Un disco gira con momento de inercia $I = ${I}\\ \\text{kg·m}^2$ y velocidad angular $\\omega = ${w}\\ \\text{rad/s}$. ¿Cuál es su **momento angular**? (2 cifras significativas).`,
          `A disk spins with moment of inertia $I = ${I}\\ \\text{kg·m}^2$ and angular velocity $\\omega = ${w}\\ \\text{rad/s}$. What is its **angular momentum**? (2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: Lval,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["kg·m^2/s", "kg*m^2/s"],
          unitChoices: ["kg·m^2/s", "kg*m^2/s", "kg·m/s", "rad/s", "J·s"],
        },
        hints: [
          L(
            "El momento angular es el análogo rotatorio de la cantidad de movimiento $p = m v$.",
            "Angular momentum is the rotational analogue of momentum $p = m v$.",
          ),
          L(
            "Para un cuerpo rígido: $L = I\\,\\omega$.",
            "For a rigid body: $L = I\\,\\omega$.",
          ),
          L(
            "Multiplica el momento de inercia por la velocidad angular; las unidades son kg·m²/s.",
            "Multiply the moment of inertia by the angular velocity; the units are kg·m²/s.",
          ),
        ],
        answerDisplay: L(
          `$L = ${tok(Lval)}\\ \\text{kg·m}^2/\\text{s}$`,
          `$L = ${tok(Lval)}\\ \\text{kg·m}^2/\\text{s}$`,
        ),
        solution: [
          step(
            "given",
            `$I = ${I}\\ \\text{kg·m}^2$, $\\omega = ${w}\\ \\text{rad/s}$.`,
            `$I = ${I}\\ \\text{kg·m}^2$, $\\omega = ${w}\\ \\text{rad/s}$.`,
          ),
          step(
            "approach",
            "Momento angular de un cuerpo rígido: $L = I\\,\\omega$.",
            "Angular momentum of a rigid body: $L = I\\,\\omega$.",
          ),
          step(
            "calculation",
            `$L = ${I}\\ \\text{kg·m}^2 \\cdot ${w}\\ \\text{rad/s} = ${I * w}\\ \\text{kg·m}^2/\\text{s}$`,
            `$L = ${I}\\ \\text{kg·m}^2 \\cdot ${w}\\ \\text{rad/s} = ${I * w}\\ \\text{kg·m}^2/\\text{s}$`,
          ),
          step(
            "result",
            `Su momento angular es $${tok(Lval)}\\ \\text{kg·m}^2/\\text{s}$, y se conservará mientras no actúe un par externo.`,
            `Its angular momentum is $${tok(Lval)}\\ \\text{kg·m}^2/\\text{s}$, and it will stay constant unless an external torque acts.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Angular momentum conservation: skater pulls arms in               */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "rot-angmom-02",
      subject: "physics",
      topicId: "rotational-motion",
      subtopicId: "angular-momentum",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 240,
      tags: ["angular-momentum", "conservation", "skater"],
      prerequisites: ["angular-momentum"],
    },
    (rng) => {
      const combos = [
        { I1: 8, factor: 2, w1: 3 },
        { I1: 12, factor: 2, w1: 4 },
        { I1: 16, factor: 4, w1: 2 },
        { I1: 20, factor: 2, w1: 5 },
        { I1: 12, factor: 4, w1: 3 },
        { I1: 16, factor: 2, w1: 2 },
      ];
      const pick = rng.pick(combos);
      const I2 = r2(pick.I1 / pick.factor);
      const w2 = pick.w1 * pick.factor;
      return {
        skill: L("Conservación del momento angular: la patinadora", "Angular momentum conservation: the skater"),
        statement: L(
          `Una patinadora gira con los brazos extendidos: su momento de inercia es $I = ${pick.I1}\\ \\text{kg·m}^2$ y su velocidad angular $\\omega = ${pick.w1}\\ \\text{rad/s}$. Al juntar los brazos, su momento de inercia ${pick.factor === 2 ? "se reduce a la **mitad**" : "se reduce a la **cuarta parte**"}. ¿Con qué velocidad angular gira entonces? (2 cifras significativas).`,
          `A skater spins with her arms extended: her moment of inertia is $I = ${pick.I1}\\ \\text{kg·m}^2$ and her angular velocity $\\omega = ${pick.w1}\\ \\text{rad/s}$. When she pulls her arms in, her moment of inertia ${pick.factor === 2 ? "drops to **half**" : "drops to **a quarter**"}. At what angular velocity does she then spin? (2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: sig2(w2),
          tolerance: { mode: "sigfig", value: 2 },
          units: ["rad/s"],
          unitChoices: ["rad/s", "m/s", "rad", "s"],
        },
        hints: [
          L(
            "Con los patines sobre el hielo, casi no hay par externo sobre la patinadora (respecto al eje vertical).",
            "On the skates, there is almost no external torque on her (about the vertical axis).",
          ),
          L(
            "Sin par externo, el momento angular se conserva: $I_1\\,\\omega_1 = I_2\\,\\omega_2$.",
            "With no external torque, angular momentum is conserved: $I_1\\,\\omega_1 = I_2\\,\\omega_2$.",
          ),
          L(
            "Si $I$ disminuye, $\\omega$ debe aumentar en la misma proporción.",
            "If $I$ decreases, $\\omega$ must increase by the same factor.",
          ),
        ],
        answerDisplay: L(
          `$\\omega_2 = ${tok(sig2(w2))}\\ \\text{rad/s}$`,
          `$\\omega_2 = ${tok(sig2(w2))}\\ \\text{rad/s}$`,
        ),
        solution: [
          step(
            "given",
            `$I_1 = ${pick.I1}\\ \\text{kg·m}^2$, $\\omega_1 = ${pick.w1}\\ \\text{rad/s}$; $I_2 = ${tok(I2)}\\ \\text{kg·m}^2$ (${pick.factor === 2 ? "la mitad" : "la cuarta parte"}).`,
            `$I_1 = ${pick.I1}\\ \\text{kg·m}^2$, $\\omega_1 = ${pick.w1}\\ \\text{rad/s}$; $I_2 = ${tok(I2)}\\ \\text{kg·m}^2$ (${pick.factor === 2 ? "half" : "a quarter"}).`,
          ),
          step(
            "approach",
            "Sin par externo, $L$ se conserva: $I_1\\,\\omega_1 = I_2\\,\\omega_2$.",
            "With no external torque, $L$ is conserved: $I_1\\,\\omega_1 = I_2\\,\\omega_2$.",
          ),
          step(
            "calculation",
            `$L = ${pick.I1} \\cdot ${pick.w1} = ${pick.I1 * pick.w1}\\ \\text{kg·m}^2/\\text{s}$ (constante)<br>$\\omega_2 = \\dfrac{I_1\\,\\omega_1}{I_2} = \\dfrac{${pick.I1 * pick.w1}}{ ${tok(I2)}} = ${tok(sig2(w2))}\\ \\text{rad/s}$`,
            `$L = ${pick.I1} \\cdot ${pick.w1} = ${pick.I1 * pick.w1}\\ \\text{kg·m}^2/\\text{s}$ (constant)<br>$\\omega_2 = \\dfrac{I_1\\,\\omega_1}{I_2} = \\dfrac{${pick.I1 * pick.w1}}{ ${tok(I2)}} = ${tok(sig2(w2))}\\ \\text{rad/s}$`,
          ),
          step(
            "result",
            `Gira a $${tok(sig2(w2))}\\ \\text{rad/s}$: al juntar los brazos gira más rápido. Su energía cinética aumenta porque sus músculos hacen trabajo.`,
            `She spins at $${tok(sig2(w2))}\\ \\text{rad/s}$: pulling her arms in spins her faster. Her kinetic energy rises because her muscles do work.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Rolling solid cylinder: total kinetic energy                      */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "rot-kin-01",
      subject: "physics",
      topicId: "rotational-motion",
      subtopicId: "rotational-energy",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 300,
      tags: ["rolling", "rotational-energy", "kinetic-energy"],
      prerequisites: ["rotational-energy", "angular-velocity"],
    },
    (rng) => {
      const combos = [
        { m: 2, v: 2 },
        { m: 4, v: 4 },
        { m: 8, v: 6 },
        { m: 10, v: 4 },
        { m: 5, v: 2 },
        { m: 20, v: 8 },
      ];
      const pick = rng.pick(combos);
      const K = sig2(0.75 * pick.m * pick.v * pick.v);
      return {
        skill: L("Energía de un cilindro que rueda", "Energy of a rolling cylinder"),
        statement: L(
          `Un cilindro sólido de $${pick.m}\\ \\text{kg}$ rueda sin deslizar; su centro avanza a $${pick.v}\\ \\text{m/s}$. Su momento de inercia es $I = \\frac{1}{2} m R^2$. ¿Cuál es su **energía cinética total** (traslación + rotación)? (2 cifras significativas).`,
          `A solid cylinder of $${pick.m}\\ \\text{kg}$ rolls without slipping; its centre moves at $${pick.v}\\ \\text{m/s}$. Its moment of inertia is $I = \\frac{1}{2} m R^2$. What is its **total kinetic energy** (translation + rotation)? (2 significant figures).`,
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
            "La energía total tiene dos partes: $\\frac{1}{2} m v^2$ del centro de masa y $\\frac{1}{2} I \\omega^2$ de la rotación.",
            "The total energy has two parts: $\\frac{1}{2} m v^2$ of the centre of mass and $\\frac{1}{2} I \\omega^2$ of the rotation.",
          ),
          L(
            "Al rodar sin deslizar, $\\omega = v/R$; sustitúyelo en el término rotacional.",
            "Rolling without slipping gives $\\omega = v/R$; substitute it into the rotational term.",
          ),
          L(
            "Con $I = \\frac{1}{2} m R^2$, el término rotacional queda $\\frac{1}{4} m v^2$ (el radio se cancela).",
            "With $I = \\frac{1}{2} m R^2$, the rotational term becomes $\\frac{1}{4} m v^2$ (the radius cancels).",
          ),
        ],
        answerDisplay: L(`$K_{total} \\approx ${tok(K)}\\ \\text{J}$`, `$K_{total} \\approx ${tok(K)}\\ \\text{J}$`),
        solution: [
          step(
            "given",
            `$m = ${pick.m}\\ \\text{kg}$, $v = ${pick.v}\\ \\text{m/s}$, $I = \\frac{1}{2} m R^2$, rueda sin deslizar ($\\omega = v/R$).`,
            `$m = ${pick.m}\\ \\text{kg}$, $v = ${pick.v}\\ \\text{m/s}$, $I = \\frac{1}{2} m R^2$, rolling without slipping ($\\omega = v/R$).`,
          ),
          step(
            "approach",
            "Sumar traslación y rotación: $K = \\frac{1}{2} m v^2 + \\frac{1}{2} I \\omega^2$ y usar $\\omega = v/R$.",
            "Add translation and rotation: $K = \\frac{1}{2} m v^2 + \\frac{1}{2} I \\omega^2$ and use $\\omega = v/R$.",
          ),
          step(
            "calculation",
            `$K_{tras} = \\tfrac{1}{2} \\cdot ${pick.m} \\cdot ${pick.v * pick.v} = ${tok(r1(0.5 * pick.m * pick.v * pick.v))}\\ \\text{J}$<br>$K_{rot} = \\tfrac{1}{2} \\cdot \\tfrac{1}{2} m R^2 \\cdot \\dfrac{v^2}{R^2} = \\tfrac{1}{4} m v^2 = ${tok(r1(0.25 * pick.m * pick.v * pick.v))}\\ \\text{J}$<br>$K = \\tfrac{3}{4} m v^2 = ${tok(r1(0.75 * pick.m * pick.v * pick.v))}\\ \\text{J} \\approx ${tok(K)}\\ \\text{J}$`,
            `$K_{trans} = \\tfrac{1}{2} \\cdot ${pick.m} \\cdot ${pick.v * pick.v} = ${tok(r1(0.5 * pick.m * pick.v * pick.v))}\\ \\text{J}$<br>$K_{rot} = \\tfrac{1}{2} \\cdot \\tfrac{1}{2} m R^2 \\cdot \\dfrac{v^2}{R^2} = \\tfrac{1}{4} m v^2 = ${tok(r1(0.25 * pick.m * pick.v * pick.v))}\\ \\text{J}$<br>$K = \\tfrac{3}{4} m v^2 = ${tok(r1(0.75 * pick.m * pick.v * pick.v))}\\ \\text{J} \\approx ${tok(K)}\\ \\text{J}$`,
          ),
          step(
            "result",
            `La energía total es $\\approx ${tok(K)}\\ \\text{J}$: un tercio de ella es rotación, y no hace falta conocer el radio.`,
            `The total energy is $\\approx ${tok(K)}\\ \\text{J}$: one third of it is rotational, and the radius is not needed.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Challenge: balancing a seesaw                                     */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "rot-chal-01",
      subject: "physics",
      topicId: "rotational-motion",
      subtopicId: "torque",
      difficulty: "challenge",
      questionType: "numeric-unit",
      estimatedTimeSec: 300,
      tags: ["torque", "equilibrium", "seesaw"],
      prerequisites: ["torque"],
    },
    (rng) => {
      const combos = [
        { m1: 30, d1: 2, m2: 45 },
        { m1: 40, d1: 1.5, m2: 25 },
        { m1: 20, d1: 2.5, m2: 50 },
        { m1: 35, d1: 2, m2: 20 },
        { m1: 25, d1: 1.6, m2: 40 },
        { m1: 50, d1: 1.2, m2: 30 },
      ];
      const pick = rng.pick(combos);
      const d2 = sig2((pick.m1 * pick.d1) / pick.m2);
      return {
        skill: L("Equilibrio de un balancín", "Balancing a seesaw"),
        statement: L(
          `En un balancín (sube y baja) de masa despreciable con el pivote en el centro, un niño de $${pick.m1}\\ \\text{kg}$ se sienta a $${tok(pick.d1)}\\ \\text{m}$ del pivote. ¿A qué **distancia** del pivote debe sentarse su hermana, de $${pick.m2}\\ \\text{kg}$, para que el balancín quede equilibrado? ($g = 9{,}8\\ \\text{m/s}^2$, 2 cifras significativas).`,
          `On a seesaw of negligible mass pivoted at its centre, a $${pick.m1}\\ \\text{kg}$ child sits $${tok(pick.d1)}\\ \\text{m}$ from the pivot. At what **distance** from the pivot should their $${pick.m2}\\ \\text{kg}$ sister sit so the seesaw balances? ($g = 9.8\\ \\text{m/s}^2$, 2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: d2,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m"],
          unitChoices: ["m", "cm", "kg·m", "N·m"],
        },
        hints: [
          L(
            "El equilibrio rotacional exige que los pares con respecto al pivote se compensen.",
            "Rotational equilibrium requires the torques about the pivot to cancel.",
          ),
          L(
            "El par de cada niño es su peso por su distancia: $\\tau = m\\,g\\,d$.",
            "Each child's torque is their weight times their distance: $\\tau = m\\,g\\,d$.",
          ),
          L(
            "Escribe $m_1 g d_1 = m_2 g d_2$ y observa que $g$ se cancela.",
            "Write $m_1 g d_1 = m_2 g d_2$ and notice that $g$ cancels.",
          ),
        ],
        answerDisplay: L(`$d_2 \\approx ${tok(d2)}\\ \\text{m}$`, `$d_2 \\approx ${tok(d2)}\\ \\text{m}$`),
        solution: [
          step(
            "given",
            `$m_1 = ${pick.m1}\\ \\text{kg}$ a $d_1 = ${tok(pick.d1)}\\ \\text{m}$; $m_2 = ${pick.m2}\\ \\text{kg}$ a distancia desconocida $d_2$; pivote en el centro.`,
            `$m_1 = ${pick.m1}\\ \\text{kg}$ at $d_1 = ${tok(pick.d1)}\\ \\text{m}$; $m_2 = ${pick.m2}\\ \\text{kg}$ at unknown distance $d_2$; pivot at the centre.`,
          ),
          step(
            "approach",
            "Equilibrio de pares respecto al pivote: $\\tau_1 = \\tau_2$, es decir $m_1 g d_1 = m_2 g d_2$.",
            "Balance of torques about the pivot: $\\tau_1 = \\tau_2$, i.e. $m_1 g d_1 = m_2 g d_2$.",
          ),
          step(
            "calculation",
            `$d_2 = \\dfrac{m_1 d_1}{m_2} = \\dfrac{${pick.m1} \\cdot ${tok(pick.d1)}}{${pick.m2}} = \\dfrac{ ${tok(r1(pick.m1 * pick.d1))}}{${pick.m2}} = ${tok(r2((pick.m1 * pick.d1) / pick.m2))}\\ \\text{m} \\approx ${tok(d2)}\\ \\text{m}$`,
            `$d_2 = \\dfrac{m_1 d_1}{m_2} = \\dfrac{${pick.m1} \\cdot ${tok(pick.d1)}}{${pick.m2}} = \\dfrac{ ${tok(r1(pick.m1 * pick.d1))}}{${pick.m2}} = ${tok(r2((pick.m1 * pick.d1) / pick.m2))}\\ \\text{m} \\approx ${tok(d2)}\\ \\text{m}$`,
          ),
          step(
            "result",
            `Su hermana debe sentarse a $\\approx ${tok(d2)}\\ \\text{m}$ del pivote${d2 > pick.d1 ? " (más lejos, porque pesa menos)" : " (más cerca, porque pesa más)"}: la gravedad se cancela y solo importan masa por distancia.`,
            `His sister should sit $\\approx ${tok(d2)}\\ \\text{m}$ from the pivot${d2 > pick.d1 ? " (farther away, since she is lighter)" : " (closer in, since she is heavier)"}: gravity cancels and only mass times distance matters.`,
          ),
        ],
      };
    },
  ),
];
