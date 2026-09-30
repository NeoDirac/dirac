/**
 * PHYSICS · Mixed Practice (exam-style)
 *
 * Every template deliberately combines 2+ areas of physics:
 * circuits + energy, dynamics + friction, projectile + energy, momentum +
 * energy, calorimetry, SHM + energy, gravitation + circular motion, and
 * energy bookkeeping with friction. Conceptual items are MC/text.
 */

import { template, L, step, tok } from "@/lib/problem";
import type { ProblemTemplate, McOption } from "@/lib/types";

const G_ACC = 9.8; // m/s²
const C_WATER = 4186; // J/(kg·K)
const G_CONST = 6.67e-11; // N·m²/kg²
const M_EARTH = 6e24; // kg

/* Deterministic formatting helpers (no RNG inside). */
const r1 = (v: number) => Math.round(v * 10) / 10;
const r2 = (v: number) => Math.round(v * 100) / 100;

/** Round to 3 significant figures. */
function sig3(v: number): number {
  if (v === 0) return 0;
  const exp = Math.floor(Math.log10(Math.abs(v)));
  return Math.round(v / Math.pow(10, exp - 2)) * Math.pow(10, exp - 2);
}

export const templates: ProblemTemplate[] = [
  /* ---------------------------------------------------------------- */
  /* Circuits + power + energy: energy delivered by a resistor        */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pmx-cir-pow-01",
      subject: "physics",
      topicId: "physics-mixed",
      subtopicId: "exam-style",
      difficulty: "easy",
      questionType: "numeric-unit",
      estimatedTimeSec: 150,
      tags: ["circuits", "power", "energy"],
      prerequisites: ["circuits"],
    },
    (rng) => {
      const pick = rng.pick([
        { V: 12, R: 4, tMin: 10 },
        { V: 6, R: 2, tMin: 10 },
        { V: 24, R: 6, tMin: 5 },
        { V: 12, R: 6, tMin: 15 },
        { V: 24, R: 8, tMin: 10 },
        { V: 6, R: 3, tMin: 15 },
        { V: 9, R: 3, tMin: 10 },
        { V: 12, R: 4, tMin: 5 },
      ]);
      const I = r1(pick.V / pick.R);
      const P = r1(pick.V * I);
      const E = r1((P * pick.tMin * 60) / 1000); // kJ
      return {
        skill: L("Circuito → potencia → energía", "Circuit → power → energy"),
        statement: L(
          `Una resistencia de $R = ${pick.R}\\ \\Omega$ se conecta a una pila de $${pick.V}\\ \\text{V}$ durante $${pick.tMin}\\ \\text{min}$. ¿Qué **energía** entrega el circuito en ese tiempo? (en kJ, 2 cifras significativas)`,
          `A resistor $R = ${pick.R}\\ \\Omega$ is connected to a $${pick.V}\\ \\text{V}$ battery for $${pick.tMin}\\ \\text{min}$. How much **energy** does the circuit deliver in that time? (in kJ, 2 significant figures)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: E,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["kJ"],
          unitChoices: ["kJ", "J", "kWh", "W"],
        },
        hints: [
          L(
            "Tres pasos: corriente con Ohm, potencia eléctrica y energía.",
            "Three steps: current from Ohm's law, electric power, and energy.",
          ),
          L(
            "$I = V/R$, $P = V\\,I$ y $E = P\\,t$ con $t$ en segundos.",
            "$I = V/R$, $P = V\\,I$ and $E = P\\,t$ with $t$ in seconds.",
          ),
          L(
            "Al final divide entre 1000 para expresar la energía en kilojulios.",
            "At the end divide by 1000 to express the energy in kilojoules.",
          ),
        ],
        answerDisplay: L(`$E = ${tok(E)}\\ \\text{kJ}$`, `$E = ${tok(E)}\\ \\text{kJ}$`),
        solution: [
          step(
            "given",
            `$V = ${pick.V}\\ \\text{V}$, $R = ${pick.R}\\ \\Omega$, $t = ${pick.tMin}\\ \\text{min} = ${pick.tMin * 60}\\ \\text{s}$`,
            `$V = ${pick.V}\\ \\text{V}$, $R = ${pick.R}\\ \\Omega$, $t = ${pick.tMin}\\ \\text{min} = ${pick.tMin * 60}\\ \\text{s}$`,
          ),
          step(
            "approach",
            "Ohm ($I = V/R$) → potencia ($P = VI$) → energía ($E = Pt$), convirtiendo el tiempo a segundos.",
            "Ohm ($I = V/R$) → power ($P = VI$) → energy ($E = Pt$), converting time to seconds.",
          ),
          step(
            "calculation",
            `**Corriente:** $I = \\frac{${pick.V}}{${pick.R}} = ${tok(I)}\\ \\text{A}$<br>**Potencia:** $P = ${pick.V} \\cdot ${tok(I)} = ${tok(P)}\\ \\text{W}$<br>**Energía:** $E = ${tok(P)} \\cdot ${pick.tMin * 60} = ${tok(P * pick.tMin * 60)}\\ \\text{J} = ${tok(E)}\\ \\text{kJ}$`,
            `**Current:** $I = \\frac{${pick.V}}{${pick.R}} = ${tok(I)}\\ \\text{A}$<br>**Power:** $P = ${pick.V} \\cdot ${tok(I)} = ${tok(P)}\\ \\text{W}$<br>**Energy:** $E = ${tok(P)} \\cdot ${pick.tMin * 60} = ${tok(P * pick.tMin * 60)}\\ \\text{J} = ${tok(E)}\\ \\text{kJ}$`,
          ),
          step(
            "result",
            `El circuito entrega $${tok(E)}\\ \\text{kJ}$ en ${pick.tMin} minutos.`,
            `The circuit delivers $${tok(E)}\\ \\text{kJ}$ in ${pick.tMin} minutes.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Dynamics + friction: acceleration of a pushed box                */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pmx-kin-fric-01",
      subject: "physics",
      topicId: "physics-mixed",
      subtopicId: "multi-step",
      difficulty: "easy",
      questionType: "numeric-unit",
      estimatedTimeSec: 180,
      tags: ["newton", "friction", "dynamics"],
      prerequisites: ["newtonian-mechanics"],
    },
    (rng) => {
      const pick = rng.pick([
        { m: 10, F: 60, mu: 0.2 },
        { m: 20, F: 100, mu: 0.3 },
        { m: 5, F: 40, mu: 0.4 },
        { m: 10, F: 80, mu: 0.2 },
        { m: 20, F: 150, mu: 0.4 },
        { m: 15, F: 90, mu: 0.3 },
        { m: 10, F: 50, mu: 0.3 },
        { m: 5, F: 30, mu: 0.2 },
      ]);
      const fr = r2(pick.mu * pick.m * G_ACC);
      const a = r2((pick.F - fr) / pick.m);
      return {
        skill: L("Fuerza horizontal + rozamiento", "Horizontal push + friction"),
        statement: L(
          `Se empuja una caja de $m = ${pick.m}\\ \\text{kg}$ sobre un suelo horizontal con una fuerza horizontal de $${pick.F}\\ \\text{N}$. El coeficiente de rozamiento cinético es $\\mu = ${tok(pick.mu)}$. Calcula la aceleración de la caja (2 cifras significativas; $g = 9{,}8\\ \\text{m/s}^2$).`,
          `A $m = ${pick.m}\\ \\text{kg}$ box is pushed along a horizontal floor with a horizontal force of $${pick.F}\\ \\text{N}$. The coefficient of kinetic friction is $\\mu = ${tok(pick.mu)}$. Compute the box's acceleration (2 significant figures; $g = 9.8\\ \\text{m/s}^2$).`,
        ),
        diagram: {
          kind: "free-body",
          inclineDeg: 0,
          massLabel: "m",
          forces: [
            { label: "F", dx: 1, dy: 0, color: "primary" },
            { label: "f", dx: -1, dy: 0, color: "secondary" },
            { label: "N", dx: 0, dy: -1, color: "primary" },
            { label: "mg", dx: 0, dy: 1, color: "secondary" },
          ],
        },
        diagramLabel: L(
          "Diagrama de cuerpo libre de la caja: fuerza de empuje F hacia la derecha, rozamiento f hacia la izquierda, normal N hacia arriba y peso mg hacia abajo.",
          "Free-body diagram of the box: push F to the right, friction f to the left, normal N up, and weight mg down.",
        ),
        answer: {
          kind: "numeric-unit",
          value: a,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m/s^2"],
          unitChoices: ["m/s^2", "m/s", "N", "m"],
        },
        hints: [
          L(
            "Primero el rozamiento: $f = \\mu\\,N = \\mu\\,m\\,g$.",
            "First the friction: $f = \\mu\\,N = \\mu\\,m\\,g$.",
          ),
          L(
            "Después la segunda ley de Newton en horizontal: $F - f = m\\,a$.",
            "Then Newton's second law along the horizontal: $F - f = m\\,a$.",
          ),
          L(
            "Despeja $a = \\frac{F - f}{m}$ y sustituye.",
            "Solve $a = \\frac{F - f}{m}$ and substitute.",
          ),
        ],
        answerDisplay: L(`$a = ${tok(a)}\\ \\text{m/s}^2$`, `$a = ${tok(a)}\\ \\text{m/s}^2$`),
        solution: [
          step(
            "given",
            `$m = ${pick.m}\\ \\text{kg}$, $F = ${pick.F}\\ \\text{N}$, $\\mu = ${tok(pick.mu)}$, $g = 9{,}8\\ \\text{m/s}^2$`,
            `$m = ${pick.m}\\ \\text{kg}$, $F = ${pick.F}\\ \\text{N}$, $\\mu = ${tok(pick.mu)}$, $g = 9.8\\ \\text{m/s}^2$`,
          ),
          step(
            "approach",
            "Rozamiento $f = \\mu m g$ y segunda ley de Newton en el eje horizontal: $F - f = ma$.",
            "Friction $f = \\mu m g$ and Newton's second law along the horizontal axis: $F - f = ma$.",
          ),
          step(
            "calculation",
            `$f = ${tok(pick.mu)} \\cdot ${pick.m} \\cdot 9{,}8 = ${tok(fr)}\\ \\text{N}$<br>$a = \\frac{${pick.F} - ${tok(fr)}}{${pick.m}} = ${tok(a)}\\ \\text{m/s}^2$`,
            `$f = ${tok(pick.mu)} \\cdot ${pick.m} \\cdot 9.8 = ${tok(fr)}\\ \\text{N}$<br>$a = \\frac{${pick.F} - ${tok(fr)}}{${pick.m}} = ${tok(a)}\\ \\text{m/s}^2$`,
          ),
          step(
            "result",
            `La caja acelera a $${tok(a)}\\ \\text{m/s}^2$.`,
            `The box accelerates at $${tok(a)}\\ \\text{m/s}^2$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Momentum concept: what is conserved in an inelastic collision    */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pmx-concept-02",
      subject: "physics",
      topicId: "physics-mixed",
      subtopicId: "exam-style",
      difficulty: "easy",
      questionType: "text",
      estimatedTimeSec: 90,
      tags: ["momentum", "collisions", "conservation", "conceptual"],
      prerequisites: ["momentum"],
    },
    (rng) => {
      void rng;
      return {
        skill: L("Conservación en choques inelásticos", "Conservation in inelastic collisions"),
        statement: L(
          "Dos objetos aislados chocan **perfectamente de forma inelástica** (quedan unidos). ¿Qué magnitud se conserva siempre en ese choque: la **energía cinética** o la **cantidad de movimiento**? (Responde con una frase corta.)",
          "Two isolated objects collide **perfectly inelastically** (they stick together). Which quantity is always conserved in that collision: **kinetic energy** or **momentum**? (Answer with a short phrase.)",
        ),
        answer: {
          kind: "text",
          accepted: [
            "cantidad de movimiento",
            "la cantidad de movimiento",
            "momentum",
            "el momentum",
            "momento lineal",
            "el momento lineal",
            "linear momentum",
            "momentum lineal",
            "la cantidad de movimiento lineal",
            "se conserva la cantidad de movimiento",
          ],
        },
        hints: [
          L(
            "Un sistema aislado (sin fuerzas externas netas) cumple una ley de conservación muy robusta.",
            "An isolated system (no net external forces) satisfies one very robust conservation law.",
          ),
          L(
            "En un choque inelástico los cuerpos se deforman y se calientan: parte de la energía mecánica se pierde.",
            "In an inelastic collision the bodies deform and warm up: part of the mechanical energy is lost.",
          ),
          L(
            "La conservación de esa magnitud solo exige que no haya fuerzas externas.",
            "The conservation of that quantity only requires the absence of external forces.",
          ),
        ],
        answerDisplay: L(
          "Se conserva la **cantidad de movimiento**; la energía cinética no (parte se disipa).",
          "**Momentum** is conserved; kinetic energy is not (part is dissipated).",
        ),
        solution: [
          step(
            "given",
            "Choque perfectamente inelástico entre dos objetos aislados.",
            "Perfectly inelastic collision between two isolated objects.",
          ),
          step(
            "approach",
            "Comparar las condiciones de las dos conservaciones: momento (sin fuerzas externas) y energía cinética (solo en choques elásticos).",
            "Compare the conditions of both conservations: momentum (no external forces) and kinetic energy (elastic collisions only).",
          ),
          step(
            "calculation",
            "Sin fuerzas externas, $\\vec{p}$ total se conserva siempre.<br>Al quedar unidos, los cuerpos se deforman y calientan → la energía cinética total disminuye.",
            "With no external forces, total $\\vec{p}$ is always conserved.<br>Sticking together deforms and heats the bodies → total kinetic energy decreases.",
          ),
          step(
            "result",
            "Se conserva la cantidad de movimiento; la energía cinética no.",
            "Momentum is conserved; kinetic energy is not.",
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Projectile + energy: speed at the highest point                  */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pmx-kin-en-01",
      subject: "physics",
      topicId: "physics-mixed",
      subtopicId: "mixed-concepts",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 210,
      tags: ["projectile", "energy", "components"],
      prerequisites: ["kinematics", "work-energy"],
    },
    (rng) => {
      const pick = rng.pick([
        { v0: 20, th: 30, cos: 0.866 },
        { v0: 20, th: 45, cos: 0.707 },
        { v0: 25, th: 30, cos: 0.866 },
        { v0: 15, th: 53, cos: 0.6 },
        { v0: 30, th: 30, cos: 0.866 },
        { v0: 20, th: 60, cos: 0.5 },
        { v0: 25, th: 53, cos: 0.6 },
        { v0: 10, th: 60, cos: 0.5 },
      ]);
      const v = r1(pick.v0 * pick.cos);
      return {
        skill: L("Proyectil + energía: rapidez en el punto más alto", "Projectile + energy: speed at the top"),
        statement: L(
          `Se lanza una pelota con $v_0 = ${pick.v0}\\ \\text{m/s}$ formando $${pick.th}^{\\circ}$ con la horizontal (se desprecia el rozamiento). ¿Con qué **rapidez** se mueve en el punto más alto de su trayectoria? (2 cifras significativas; $\\cos ${pick.th}^{\\circ} \\approx ${tok(pick.cos)}$)`,
          `A ball is kicked at $v_0 = ${pick.v0}\\ \\text{m/s}$ at $${pick.th}^{\\circ}$ above the horizontal (neglect air resistance). What is its **speed** at the highest point of the trajectory? (2 significant figures; $\\cos ${pick.th}^{\\circ} \\approx ${tok(pick.cos)}$)`,
        ),
        diagram: {
          kind: "projectile",
          v0: pick.v0,
          angleDeg: pick.th,
          h0: 0,
          g: 9.8,
          showAnnotations: true,
        },
        diagramLabel: L(
          `Trayectoria parabólica de la pelota lanzada a ${pick.v0} m/s y ${pick.th} grados.`,
          `Parabolic trajectory of the ball kicked at ${pick.v0} m/s and ${pick.th} degrees.`,
        ),
        answer: {
          kind: "numeric-unit",
          value: v,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m/s"],
          unitChoices: ["m/s", "m/s^2", "m", "km/h"],
        },
        hints: [
          L(
            "En el punto más alto la componente **vertical** de la velocidad es cero, pero la **horizontal** no.",
            "At the highest point the **vertical** component of the velocity is zero, but the **horizontal** one is not.",
          ),
          L(
            "No hay fuerza horizontal → la componente horizontal $v_x = v_0\\cos\\theta$ no cambia durante el vuelo.",
            "There is no horizontal force → the horizontal component $v_x = v_0\\cos\\theta$ never changes during the flight.",
          ),
          L(
            `Sustituye $v_x = ${pick.v0} \\cdot ${tok(pick.cos)}$.`,
            `Substitute $v_x = ${pick.v0} \\cdot ${tok(pick.cos)}$.`,
          ),
        ],
        answerDisplay: L(`$v_{\\text{cima}} = ${tok(v)}\\ \\text{m/s}$`, `$v_{\\text{top}} = ${tok(v)}\\ \\text{m/s}$`),
        solution: [
          step(
            "given",
            `$v_0 = ${pick.v0}\\ \\text{m/s}$, $\\theta = ${pick.th}^{\\circ}$, rozamiento nulo; $\\cos ${pick.th}^{\\circ} \\approx ${tok(pick.cos)}$.`,
            `$v_0 = ${pick.v0}\\ \\text{m/s}$, $\\theta = ${pick.th}^{\\circ}$, no air resistance; $\\cos ${pick.th}^{\\circ} \\approx ${tok(pick.cos)}$.`,
          ),
          step(
            "approach",
            "Energía: al subir, la energía cinética vertical se convierte en potencial; la horizontal se conserva (no hay fuerza horizontal). En la cima solo queda $v_x$.",
            "Energy: while rising, the vertical kinetic energy becomes potential; the horizontal one is conserved (no horizontal force). At the top only $v_x$ remains.",
          ),
          step(
            "calculation",
            `$v_{\\text{cima}} = v_x = v_0\\cos\\theta = ${pick.v0} \\cdot ${tok(pick.cos)} = ${tok(v)}\\ \\text{m/s}$`,
            `$v_{\\text{top}} = v_x = v_0\\cos\\theta = ${pick.v0} \\cdot ${tok(pick.cos)} = ${tok(v)}\\ \\text{m/s}$`,
          ),
          step(
            "result",
            `En el punto más alto la pelota se mueve horizontalmente con $${tok(v)}\\ \\text{m/s}$.`,
            `At the highest point the ball moves horizontally at $${tok(v)}\\ \\text{m/s}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Conceptual MC: projectile at the apex                            */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pmx-concept-01",
      subject: "physics",
      topicId: "physics-mixed",
      subtopicId: "mixed-concepts",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["projectile", "energy", "conceptual"],
      prerequisites: ["kinematics", "work-energy"],
    },
    (rng) => {
      const v0 = rng.pick([15, 20, 25]);
      const angle = rng.pick([35, 45, 55]);
      const object = rng.pick([
        { es: "pelota de fútbol", en: "football" },
        { es: "piedra", en: "stone" },
        { es: "pelota de béisbol", en: "baseball" },
      ]);
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "La velocidad vertical es cero, pero la velocidad total no lo es",
            "The vertical velocity is zero, but the total velocity is not",
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            "La energía cinética es cero",
            "The kinetic energy is zero",
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            "La energía mecánica es máxima",
            "The mechanical energy is maximum",
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            "La energía potencial disminuye al subir",
            "The potential energy decreases while rising",
          ),
          correct: false,
        },
      ];
      return {
        skill: L("Proyectil en la cima: energía y velocidad", "Projectile at the apex: energy and velocity"),
        statement: L(
          `Se lanza una ${object.es} por el aire y se desprecia el rozamiento. Considera el **punto más alto** de su trayectoria. ¿Qué afirmación es correcta?`,
          `A ${object.en} is launched through the air and air resistance is neglected. Consider the **highest point** of its trajectory. Which statement is correct?`,
        ),
        diagram: {
          kind: "projectile",
          v0,
          angleDeg: angle,
          h0: 0,
          g: 9.8,
          showAnnotations: true,
        },
        diagramLabel: L(
          `Trayectoria parabólica de una ${object.es} lanzada a ${v0} m/s con un ángulo de ${angle} grados.`,
          `Parabolic trajectory of a ${object.en} launched at ${v0} m/s at an angle of ${angle} degrees.`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Piensa por separado en las componentes horizontal y vertical del movimiento.",
            "Think separately about the horizontal and vertical components of the motion.",
          ),
          L(
            "Sin rozamiento, la energía mecánica total se conserva durante todo el vuelo.",
            "Without air resistance, the total mechanical energy is conserved during the whole flight.",
          ),
          L(
            "En la cima, ¿qué componente de la velocidad se ha anulado y cuál sigue intacta?",
            "At the apex, which velocity component has gone to zero and which is untouched?",
          ),
        ],
        answerDisplay: L(
          "La velocidad vertical es cero, pero la total no (queda la componente horizontal).",
          "The vertical velocity is zero, but the total one is not (the horizontal component remains).",
        ),
        solution: [
          step(
            "given",
            `Proyectil sin rozamiento; analizamos el punto más alto de la trayectoria.`,
            `Projectile without air resistance; we analyse the highest point of the trajectory.`,
          ),
          step(
            "approach",
            "Combinamos cinámica 2D (componentes) con la conservación de la energía mecánica.",
            "We combine 2D kinematics (components) with conservation of mechanical energy.",
          ),
          step(
            "calculation",
            "En la cima $v_y = 0$, pero $v_x \\neq 0$ → la velocidad total y la energía cinética no son cero.<br>La energía mecánica es constante (no hay rozamiento), no máxima en un punto.<br>Al subir, la altura aumenta → la energía potencial **aumenta**.",
            "At the apex $v_y = 0$ but $v_x \\neq 0$ → the total speed and kinetic energy are not zero.<br>Mechanical energy is constant (no friction), not maximal at one point.<br>While rising, height increases → potential energy **increases**.",
          ),
          step(
            "result",
            "La única afirmación correcta es que la velocidad vertical se anula pero la total no.",
            "The only correct statement is that the vertical velocity vanishes but the total one does not.",
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Calorimetry: equilibrium temperature                             */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pmx-thermo-01",
      subject: "physics",
      topicId: "physics-mixed",
      subtopicId: "multi-step",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 300,
      tags: ["calorimetry", "energy-conservation", "thermal"],
      prerequisites: ["thermal-physics", "work-energy"],
    },
    (rng) => {
      const pick = rng.pick([
        { mm: 0.2, cm: 900, Tm: 300, mw: 0.5, Tw: 20 },
        { mm: 0.5, cm: 400, Tm: 200, mw: 0.5, Tw: 20 },
        { mm: 0.1, cm: 900, Tm: 400, mw: 0.9, Tw: 25 },
        { mm: 0.3, cm: 400, Tm: 350, mw: 0.7, Tw: 15 },
      ]);
      const Cm = r1(pick.mm * pick.cm);
      const Cw = r1(pick.mw * C_WATER);
      const num = r1(Cm * pick.Tm + Cw * pick.Tw);
      const den = r1(Cm + Cw);
      const Tf = r1(num / den);
      return {
        skill: L("Calorimetría: temperatura de equilibrio", "Calorimetry: equilibrium temperature"),
        statement: L(
          `Una pieza de metal de $m_m = ${tok(pick.mm)}\\ \\text{kg}$ y calor específico $c_m = ${pick.cm}\\ \\text{J/(kg·K)}$, inicialmente a $${pick.Tm}\\ ^{\\circ}\\text{C}$, se sumerge en $m_a = ${tok(pick.mw)}\\ \\text{kg}$ de agua a $${pick.Tw}\\ ^{\\circ}\\text{C}$ dentro de un recipiente aislado. Calcula la **temperatura final de equilibrio** (en °C, 2 cifras significativas; $c_{\\text{agua}} = 4186\\ \\text{J/(kg·K)}$).`,
          `A metal piece of $m_m = ${tok(pick.mm)}\\ \\text{kg}$ and specific heat $c_m = ${pick.cm}\\ \\text{J/(kg·K)}$, initially at $${pick.Tm}\\ ^{\\circ}\\text{C}$, is plunged into $m_w = ${tok(pick.mw)}\\ \\text{kg}$ of water at $${pick.Tw}\\ ^{\\circ}\\text{C}$ inside an insulated container. Compute the **final equilibrium temperature** (in °C, 2 significant figures; $c_{\\text{water}} = 4186\\ \\text{J/(kg·K)}$).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: Tf,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["°C", "C", "celsius", "grados celsius"],
          unitChoices: ["°C", "K", "°F", "C"],
        },
        hints: [
          L(
            "En un sistema aislado, el calor que cede el metal caliente es el que gana el agua fría.",
            "In an insulated system, the heat given up by the hot metal equals the heat gained by the cold water.",
          ),
          L(
            "Plantea $m_m c_m (T_m - T_f) = m_a c_a (T_f - T_a)$ y despeja $T_f$.",
            "Set $m_m c_m (T_m - T_f) = m_w c_w (T_f - T_w)$ and solve for $T_f$.",
          ),
          L(
            "Puedes agrupar: $T_f = \\frac{m_m c_m T_m + m_a c_a T_a}{m_m c_m + m_a c_a}$.",
            "You can group: $T_f = \\frac{m_m c_m T_m + m_w c_w T_w}{m_m c_m + m_w c_w}$.",
          ),
        ],
        answerDisplay: L(`$T_f \\approx ${tok(Tf)}\\ ^{\\circ}\\text{C}$`, `$T_f \\approx ${tok(Tf)}\\ ^{\\circ}\\text{C}$`),
        solution: [
          step(
            "given",
            `Metal: $m_m = ${tok(pick.mm)}\\ \\text{kg}$, $c_m = ${pick.cm}\\ \\text{J/(kg·K)}$, $T_m = ${pick.Tm}\\ ^{\\circ}\\text{C}$.<br>Agua: $m_a = ${tok(pick.mw)}\\ \\text{kg}$, $c_a = 4186\\ \\text{J/(kg·K)}$, $T_a = ${pick.Tw}\\ ^{\\circ}\\text{C}$.`,
            `Metal: $m_m = ${tok(pick.mm)}\\ \\text{kg}$, $c_m = ${pick.cm}\\ \\text{J/(kg·K)}$, $T_m = ${pick.Tm}\\ ^{\\circ}\\text{C}$.<br>Water: $m_w = ${tok(pick.mw)}\\ \\text{kg}$, $c_w = 4186\\ \\text{J/(kg·K)}$, $T_w = ${pick.Tw}\\ ^{\\circ}\\text{C}$.`,
          ),
          step(
            "approach",
            "Conservación de la energía térmica: $Q_{\\text{cedido}} = Q_{\\text{ganado}}$, es decir $m_m c_m (T_m - T_f) = m_a c_a (T_f - T_a)$.",
            "Conservation of thermal energy: $Q_{\\text{lost}} = Q_{\\text{gained}}$, i.e. $m_m c_m (T_m - T_f) = m_w c_w (T_f - T_w)$.",
          ),
          step(
            "calculation",
            `$m_m c_m = ${tok(Cm)}\\ \\text{J/K}$, $m_a c_a = ${tok(Cw)}\\ \\text{J/K}$<br>$T_f = \\frac{ ${tok(Cm)} \\cdot ${pick.Tm} + ${tok(Cw)} \\cdot ${pick.Tw}}{ ${tok(Cm)} + ${tok(Cw)}} = \\frac{ ${tok(num)}}{ ${tok(den)}} \\approx ${tok(Tf)}\\ ^{\\circ}\\text{C}$`,
            `$m_m c_m = ${tok(Cm)}\\ \\text{J/K}$, $m_w c_w = ${tok(Cw)}\\ \\text{J/K}$<br>$T_f = \\frac{ ${tok(Cm)} \\cdot ${pick.Tm} + ${tok(Cw)} \\cdot ${pick.Tw}}{ ${tok(Cm)} + ${tok(Cw)}} = \\frac{ ${tok(num)}}{ ${tok(den)}} \\approx ${tok(Tf)}\\ ^{\\circ}\\text{C}$`,
          ),
          step(
            "result",
            `El sistema alcanza el equilibrio a $\\approx ${tok(Tf)}\\ ^{\\circ}\\text{C}$ (entre las dos temperaturas iniciales, más cerca del agua).`,
            `The system reaches equilibrium at $\\approx ${tok(Tf)}\\ ^{\\circ}\\text{C}$ (between the two initial temperatures, closer to the water's).`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* SHM + energy: speed at half amplitude                            */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pmx-shm-en-01",
      subject: "physics",
      topicId: "physics-mixed",
      subtopicId: "mixed-concepts",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 240,
      tags: ["shm", "energy", "spring"],
      prerequisites: ["oscillations-waves", "work-energy"],
    },
    (rng) => {
      const pick = rng.pick([
        { m: 0.5, k: 200, A: 0.1 },
        { m: 1, k: 200, A: 0.2 },
        { m: 1, k: 500, A: 0.2 },
        { m: 2, k: 800, A: 0.1 },
        { m: 0.4, k: 320, A: 0.1 },
        { m: 0.5, k: 500, A: 0.2 },
        { m: 0.8, k: 500, A: 0.2 },
      ]);
      const E = r2(0.5 * pick.k * pick.A * pick.A);
      const x = r2(pick.A / 2);
      const KE = r2(E - 0.5 * pick.k * x * x);
      const v = r1(Math.sqrt((2 * KE) / pick.m));
      return {
        skill: L("MAS + energía: velocidad a mitad de amplitud", "SHM + energy: speed at half amplitude"),
        statement: L(
          `Un carrito de $m = ${tok(pick.m)}\\ \\text{kg}$ unido a un muelle de constante $k = ${pick.k}\\ \\text{N/m}$ oscila con amplitud $A = ${tok(pick.A)}\\ \\text{m}$. ¿Qué rapidez tiene cuando está a **media amplitud** ($x = A/2$)? (2 cifras significativas)`,
          `A cart of $m = ${tok(pick.m)}\\ \\text{kg}$ attached to a spring of constant $k = ${pick.k}\\ \\text{N/m}$ oscillates with amplitude $A = ${tok(pick.A)}\\ \\text{m}$. What is its speed at **half amplitude** ($x = A/2$)? (2 significant figures)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: v,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m/s"],
          unitChoices: ["m/s", "m/s^2", "m", "N/m"],
        },
        hints: [
          L(
            "La energía total del oscilador es $E = \\frac{1}{2}kA^2$ (toda potencial en los extremos).",
            "The oscillator's total energy is $E = \\frac{1}{2}kA^2$ (all potential at the endpoints).",
          ),
          L(
            "En una posición intermedia: $E = \\frac{1}{2}kx^2 + \\frac{1}{2}mv^2$.",
            "At an intermediate position: $E = \\frac{1}{2}kx^2 + \\frac{1}{2}mv^2$.",
          ),
          L(
            `Calcula la energía cinética restante y despeja $v = \\sqrt{2E_{\\text{cin}}/m}$.`,
            `Compute the remaining kinetic energy and solve $v = \\sqrt{2K/m}$.`,
          ),
        ],
        answerDisplay: L(`$v \\approx ${tok(v)}\\ \\text{m/s}$`, `$v \\approx ${tok(v)}\\ \\text{m/s}$`),
        solution: [
          step(
            "given",
            `$m = ${tok(pick.m)}\\ \\text{kg}$, $k = ${pick.k}\\ \\text{N/m}$, $A = ${tok(pick.A)}\\ \\text{m}$, $x = ${tok(x)}\\ \\text{m}$`,
            `$m = ${tok(pick.m)}\\ \\text{kg}$, $k = ${pick.k}\\ \\text{N/m}$, $A = ${tok(pick.A)}\\ \\text{m}$, $x = ${tok(x)}\\ \\text{m}$`,
          ),
          step(
            "approach",
            "Conservación de la energía del oscilador: $\\frac{1}{2}kA^2 = \\frac{1}{2}kx^2 + \\frac{1}{2}mv^2$.",
            "Conservation of the oscillator's energy: $\\frac{1}{2}kA^2 = \\frac{1}{2}kx^2 + \\frac{1}{2}mv^2$.",
          ),
          step(
            "calculation",
            `$E = \\frac{1}{2}(${pick.k})(${tok(pick.A)})^2 = ${tok(E)}\\ \\text{J}$<br>$U(x) = \\frac{1}{2}(${pick.k})(${tok(x)})^2 = ${tok(r2(0.5 * pick.k * x * x))}\\ \\text{J}$<br>$E_{\\text{cin}} = ${tok(E)} - ${tok(r2(0.5 * pick.k * x * x))} = ${tok(KE)}\\ \\text{J}$<br>$v = \\sqrt{\\frac{2 \\cdot ${tok(KE)}}{ ${tok(pick.m)}}} \\approx ${tok(v)}\\ \\text{m/s}$`,
            `$E = \\frac{1}{2}(${pick.k})(${tok(pick.A)})^2 = ${tok(E)}\\ \\text{J}$<br>$U(x) = \\frac{1}{2}(${pick.k})(${tok(x)})^2 = ${tok(r2(0.5 * pick.k * x * x))}\\ \\text{J}$<br>$K = ${tok(E)} - ${tok(r2(0.5 * pick.k * x * x))} = ${tok(KE)}\\ \\text{J}$<br>$v = \\sqrt{\\frac{2 \\cdot ${tok(KE)}}{ ${tok(pick.m)}}} \\approx ${tok(v)}\\ \\text{m/s}$`,
          ),
          step(
            "result",
            `A media amplitud el carrito se mueve con $\\approx ${tok(v)}\\ \\text{m/s}$.`,
            `At half amplitude the cart moves at $\\approx ${tok(v)}\\ \\text{m/s}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Ballistic pendulum (momentum + energy)                           */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pmx-mom-en-01",
      subject: "physics",
      topicId: "physics-mixed",
      subtopicId: "multi-step",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 300,
      tags: ["momentum", "energy", "ballistic-pendulum"],
      prerequisites: ["momentum", "work-energy"],
    },
    (rng) => {
      const pick = rng.pick([
        { m: 0.05, M: 1.95, h: 0.2 },
        { m: 0.1, M: 1.9, h: 0.2 },
        { m: 0.02, M: 1.98, h: 0.2 },
        { m: 0.05, M: 1.95, h: 0.45 },
        { m: 0.04, M: 1.96, h: 0.2 },
        { m: 0.05, M: 1.45, h: 0.2 },
        { m: 0.1, M: 2.4, h: 0.2 },
        { m: 0.02, M: 1.98, h: 0.8 },
      ]);
      const mG = Math.round(pick.m * 1000);
      const V = r2(Math.sqrt(2 * G_ACC * pick.h));
      const v = r1(((pick.m + pick.M) / pick.m) * Math.sqrt(2 * G_ACC * pick.h));
      return {
        skill: L("Péndulo balístico (momento + energía)", "Ballistic pendulum (momentum + energy)"),
        statement: L(
          `Una bala de $${mG}\\ \\text{g}$ se incrusta en un bloque de madera de $${tok(pick.M)}\\ \\text{kg}$ colgado de un hilo (péndulo balístico) y el conjunto sube hasta una altura de $${tok(pick.h)}\\ \\text{m}$. ¿Con qué velocidad iba la bala? (en m/s, 2 cifras significativas; $g = 9{,}8\\ \\text{m/s}^2$)`,
          `A ${mG}\\ \\text{g}$ bullet embeds itself in a ${tok(pick.M)}\\ \\text{kg}$ wooden block hanging from a string (ballistic pendulum) and the pair rises to a height of $${tok(pick.h)}\\ \\text{m}$. How fast was the bullet going? (in m/s, 2 significant figures; $g = 9.8\\ \\text{m/s}^2$)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: v,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m/s"],
          unitChoices: ["m/s", "km/h", "m", "J"],
        },
        hints: [
          L(
            "Son dos etapas con leyes distintas: el choque (se conserva el momento) y la subida (se conserva la energía).",
            "Two stages with different laws: the collision (momentum conserved) and the rise (energy conserved).",
          ),
          L(
            "Etapa 2 (energía): $\\frac{1}{2}(m+M)V^2 = (m+M)gh \\Rightarrow V = \\sqrt{2gh}$.",
            "Stage 2 (energy): $\\frac{1}{2}(m+M)V^2 = (m+M)gh \\Rightarrow V = \\sqrt{2gh}$.",
          ),
          L(
            "Etapa 1 (momento): $mv = (m+M)V \\Rightarrow v = \\frac{m+M}{m}V$.",
            "Stage 1 (momentum): $mv = (m+M)V \\Rightarrow v = \\frac{m+M}{m}V$.",
          ),
        ],
        answerDisplay: L(`$v \\approx ${tok(v)}\\ \\text{m/s}$`, `$v \\approx ${tok(v)}\\ \\text{m/s}$`),
        solution: [
          step(
            "given",
            `Bala: $m = ${tok(pick.m)}\\ \\text{kg}$ ($${mG}\\ \\text{g}$); bloque: $M = ${tok(pick.M)}\\ \\text{kg}$; altura final: $h = ${tok(pick.h)}\\ \\text{m}$.`,
            `Bullet: $m = ${tok(pick.m)}\\ \\text{kg}$ ($${mG}\\ \\text{g}$); block: $M = ${tok(pick.M)}\\ \\text{kg}$; final height: $h = ${tok(pick.h)}\\ \\text{m}$.`,
          ),
          step(
            "approach",
            "Etapa 1 (choque inelástico): $mv = (m+M)V$. Etapa 2 (subida): $\\frac{1}{2}(m+M)V^2 = (m+M)gh$. No se puede aplicar energía en el choque ni momento en la subida.",
            "Stage 1 (inelastic collision): $mv = (m+M)V$. Stage 2 (rise): $\\frac{1}{2}(m+M)V^2 = (m+M)gh$. Energy cannot be used in the collision, nor momentum in the rise.",
          ),
          step(
            "calculation",
            `**Etapa 2:** $V = \\sqrt{2gh} = \\sqrt{2 \\cdot 9{,}8 \\cdot ${tok(pick.h)}} = ${tok(V)}\\ \\text{m/s}$<br>**Etapa 1:** $v = \\frac{ ${tok(pick.m)} + ${tok(pick.M)}}{ ${tok(pick.m)}} \\cdot ${tok(V)} = ${tok(r1((pick.m + pick.M) / pick.m))} \\cdot ${tok(V)} \\approx ${tok(v)}\\ \\text{m/s}$`,
            `**Stage 2:** $V = \\sqrt{2gh} = \\sqrt{2 \\cdot 9.8 \\cdot ${tok(pick.h)}} = ${tok(V)}\\ \\text{m/s}$<br>**Stage 1:** $v = \\frac{ ${tok(pick.m)} + ${tok(pick.M)}}{ ${tok(pick.m)}} \\cdot ${tok(V)} = ${tok(r1((pick.m + pick.M) / pick.m))} \\cdot ${tok(V)} \\approx ${tok(v)}\\ \\text{m/s}$`,
          ),
          step(
            "result",
            `La bala viajaba a $\\approx ${tok(v)}\\ \\text{m/s}$ justo antes del impacto.`,
            `The bullet was travelling at $\\approx ${tok(v)}\\ \\text{m/s}$ just before impact.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Gravitation + circular motion: orbital speed                     */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pmx-orbit-01",
      subject: "physics",
      topicId: "physics-mixed",
      subtopicId: "exam-style",
      difficulty: "challenge",
      questionType: "numeric-unit",
      estimatedTimeSec: 300,
      tags: ["gravitation", "circular-motion", "orbit"],
      prerequisites: ["circular-gravitation"],
    },
    (rng) => {
      const r = rng.pick([1.0e7, 1.6e7, 2.5e7, 4.0e7]);
      const rSci = { man: r / Math.pow(10, Math.floor(Math.log10(r))), exp: Math.floor(Math.log10(r)) };
      const v = sig3(Math.sqrt((G_CONST * M_EARTH) / r));
      return {
        skill: L("Velocidad orbital (gravitación + circular)", "Orbital speed (gravitation + circular)"),
        statement: L(
          `Un satélite describe una órbita circular de radio $r = ${tok(rSci.man)}\\times10^{${rSci.exp}}\\ \\text{m}$ alrededor de la Tierra. Calcula su rapidez orbital (en m/s, 2 cifras significativas). Datos: $G = 6{,}67\\times10^{-11}\\ \\text{N·m}^2/\\text{kg}^2$, $M_{\\text{Tierra}} = 6\\times10^{24}\\ \\text{kg}$.`,
          `A satellite moves on a circular orbit of radius $r = ${tok(rSci.man)}\\times10^{${rSci.exp}}\\ \\text{m}$ around the Earth. Compute its orbital speed (in m/s, 2 significant figures). Data: $G = 6.67\\times10^{-11}\\ \\text{N·m}^2/\\text{kg}^2$, $M_{\\text{Earth}} = 6\\times10^{24}\\ \\text{kg}$.`,
        ),
        answer: {
          kind: "numeric-unit",
          value: v,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m/s"],
          unitChoices: ["m/s", "km/s", "km/h", "m/s^2"],
        },
        hints: [
          L(
            "La fuerza gravitatoria es la fuerza centrípeta que curva la órbita.",
            "The gravitational force is the centripetal force bending the orbit.",
          ),
          L(
            "Plantea $\\frac{GMm}{r^2} = \\frac{mv^2}{r}$; la masa del satélite se cancela.",
            "Set $\\frac{GMm}{r^2} = \\frac{mv^2}{r}$; the satellite's mass cancels.",
          ),
          L(
            "Queda $v = \\sqrt{\\frac{GM}{r}}$; calcula primero $GM$.",
            "You get $v = \\sqrt{\\frac{GM}{r}}$; compute $GM$ first.",
          ),
        ],
        answerDisplay: L(`$v \\approx ${tok(v)}\\ \\text{m/s}$`, `$v \\approx ${tok(v)}\\ \\text{m/s}$`),
        solution: [
          step(
            "given",
            `$r = ${tok(rSci.man)}\\times10^{${rSci.exp}}\\ \\text{m}$, $G = 6{,}67\\times10^{-11}\\ \\text{N·m}^2/\\text{kg}^2$, $M = 6\\times10^{24}\\ \\text{kg}$`,
            `$r = ${tok(rSci.man)}\\times10^{${rSci.exp}}\\ \\text{m}$, $G = 6.67\\times10^{-11}\\ \\text{N·m}^2/\\text{kg}^2$, $M = 6\\times10^{24}\\ \\text{kg}$`,
          ),
          step(
            "approach",
            "Gravitación como fuerza centrípeta: $\\frac{GMm}{r^2} = \\frac{mv^2}{r} \\Rightarrow v = \\sqrt{\\frac{GM}{r}}$.",
            "Gravity as centripetal force: $\\frac{GMm}{r^2} = \\frac{mv^2}{r} \\Rightarrow v = \\sqrt{\\frac{GM}{r}}$.",
          ),
          step(
            "calculation",
            `$GM = (6{,}67\\times10^{-11})(6\\times10^{24}) \\approx 4{,}0\\times10^{14}\\ \\text{m}^3/\\text{s}^2$<br>$v = \\sqrt{\\frac{4{,}0\\times10^{14}}{ ${tok(rSci.man)}\\times10^{${rSci.exp}}}} \\approx ${tok(v)}\\ \\text{m/s}$`,
            `$GM = (6.67\\times10^{-11})(6\\times10^{24}) \\approx 4.0\\times10^{14}\\ \\text{m}^3/\\text{s}^2$<br>$v = \\sqrt{\\frac{4.0\\times10^{14}}{ ${tok(rSci.man)}\\times10^{${rSci.exp}}}} \\approx ${tok(v)}\\ \\text{m/s}$`,
          ),
          step(
            "result",
            `El satélite orbita a $\\approx ${tok(v)}\\ \\text{m/s}$ (unos $${tok(Math.round(v / 1000))}\\ \\text{km/s}$).`,
            `The satellite orbits at $\\approx ${tok(v)}\\ \\text{m/s}$ (about $${tok(Math.round(v / 1000))}\\ \\text{km/s}$).`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Challenge: ramp + rough floor (energy bookkeeping)               */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pmx-exam-01",
      subject: "physics",
      topicId: "physics-mixed",
      subtopicId: "exam-style",
      difficulty: "challenge",
      questionType: "numeric-unit",
      estimatedTimeSec: 300,
      tags: ["energy", "friction", "incline", "multi-step"],
      prerequisites: ["work-energy", "newtonian-mechanics"],
    },
    (rng) => {
      const pick = rng.pick([
        { h: 2, mu: 0.5 },
        { h: 1.5, mu: 0.3 },
        { h: 2.4, mu: 0.4 },
        { h: 3, mu: 0.6 },
        { h: 1.8, mu: 0.25 },
        { h: 4, mu: 0.5 },
        { h: 2.5, mu: 0.5 },
        { h: 1.2, mu: 0.25 },
      ]);
      const d = r1(pick.h / pick.mu);
      return {
        skill: L("Rampa lisa + suelo rugoso (energía)", "Smooth ramp + rough floor (energy)"),
        statement: L(
          `Un bloque parte del reposo desde una altura $h = ${tok(pick.h)}\\ \\text{m}$ y desliza **sin rozamiento** por una rampa hasta el suelo. Después recorre un tramo horizontal rugoso con coeficiente de rozamiento $\\mu = ${tok(pick.mu)}$ hasta detenerse. ¿Qué distancia recorre sobre el tramo rugoso? (en m, 2 cifras significativas; $g = 9{,}8\\ \\text{m/s}^2$)`,
          `A block starts from rest at a height $h = ${tok(pick.h)}\\ \\text{m}$ and slides **frictionlessly** down a ramp to the floor. It then travels along a rough horizontal stretch with friction coefficient $\\mu = ${tok(pick.mu)}$ until it stops. How far does it travel on the rough stretch? (in m, 2 significant figures; $g = 9.8\\ \\text{m/s}^2$)`,
        ),
        diagram: {
          kind: "free-body",
          inclineDeg: 30,
          massLabel: "m",
          forces: [
            { label: "mg", dx: 0, dy: 1, color: "secondary" },
            { label: "N", dx: -0.5, dy: -0.866, color: "primary" },
          ],
        },
        diagramLabel: L(
          "Bloque sobre la rampa inclinada (sin rozamiento): solo actúan el peso mg y la normal N; la altura inicial es h.",
          "Block on the incline (frictionless): only the weight mg and the normal N act; the starting height is h.",
        ),
        answer: {
          kind: "numeric-unit",
          value: d,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m"],
          unitChoices: ["m", "cm", "J", "m/s"],
        },
        hints: [
          L(
            "Aplica la conservación de la energía entre el punto de partida y la parada final.",
            "Apply conservation of energy between the starting point and the final stop.",
          ),
          L(
            "Toda la energía potencial inicial se disipa como trabajo del rozamiento: $mgh = \\mu m g\\,d$.",
            "All the initial potential energy is dissipated as friction work: $mgh = \\mu m g\\,d$.",
          ),
          L(
            "Observa que $m$ y $g$ aparecen en los dos lados: se cancelan y queda $d = h/\\mu$.",
            "Notice that $m$ and $g$ appear on both sides: they cancel, leaving $d = h/\\mu$.",
          ),
        ],
        answerDisplay: L(`$d = ${tok(d)}\\ \\text{m}$`, `$d = ${tok(d)}\\ \\text{m}$`),
        solution: [
          step(
            "given",
            `$h = ${tok(pick.h)}\\ \\text{m}$, rampa sin rozamiento, tramo horizontal con $\\mu = ${tok(pick.mu)}$, $v_{\\text{inicial}} = v_{\\text{final}} = 0$.`,
            `$h = ${tok(pick.h)}\\ \\text{m}$, frictionless ramp, horizontal stretch with $\\mu = ${tok(pick.mu)}$, $v_{\\text{initial}} = v_{\\text{final}} = 0$.`,
          ),
          step(
            "approach",
            "Energía de principio a fin: $E_{\\text{inicial}} = E_{\\text{final}} + $ trabajo del rozamiento, es decir $mgh = \\mu m g\\,d$.",
            "Energy from start to finish: $E_{\\text{initial}} = E_{\\text{final}} + $ friction work, i.e. $mgh = \\mu m g\\,d$.",
          ),
          step(
            "calculation",
            `$mgh = \\mu m g\\,d$<br>$d = \\frac{h}{\\mu} = \\frac{ ${tok(pick.h)}}{ ${tok(pick.mu)}} = ${tok(d)}\\ \\text{m}$<br>(La masa y $g$ se cancelan: el resultado no depende de ellas.)`,
            `$mgh = \\mu m g\\,d$<br>$d = \\frac{h}{\\mu} = \\frac{ ${tok(pick.h)}}{ ${tok(pick.mu)}} = ${tok(d)}\\ \\text{m}$<br>(Mass and $g$ cancel: the result does not depend on them.)`,
          ),
          step(
            "result",
            `El bloque recorre $${tok(d)}\\ \\text{m}$ por el tramo rugoso antes de detenerse.`,
            `The block travels $${tok(d)}\\ \\text{m}$ along the rough stretch before stopping.`,
          ),
        ],
      };
    },
  ),
];
