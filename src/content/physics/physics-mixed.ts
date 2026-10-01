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

/** Round to 2 significant figures. */
function sig2(v: number): number {
  return v === 0 ? 0 : Number(v.toPrecision(2));
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

  /* ---------------------------------------------------------------- */
  /* Circular motion + energy + forces: the vertical loop             */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pmx-loop-01",
      subject: "physics",
      topicId: "physics-mixed",
      subtopicId: "mixed-concepts",
      difficulty: "challenge",
      questionType: "numeric-unit",
      estimatedTimeSec: 420,
      tags: ["circular-motion", "energy", "normal-force", "loop"],
      prerequisites: ["circular-gravitation", "work-energy"],
      reasoning: "multi-concept",
    },
    (rng) => {
      const rider = rng.pick([
        { es: "patinadora", en: "skater" },
        { es: "esquiadora", en: "skier" },
        { es: "bola de acero", en: "steel ball" },
      ]);
      const askMinHeight = rng.bool();
      if (askMinHeight) {
        const R = rng.pick([1.2, 1.6, 2, 2.4, 3, 4]);
        const hMin = r2(2.5 * R);
        const vTopSq = r2(G_ACC * R);
        const vTop = r1(Math.sqrt(G_ACC * R));
        return {
          skill: L(
            "Rizo vertical: altura mínima (circular + energía)",
            "Vertical loop: minimum height (circular + energy)",
          ),
          statement: L(
            `Una ${rider.es} parte del reposo desde una altura $h$ sobre la base de una pista **sin rozamiento** que termina en un rizo vertical de radio $R = ${tok(R)}\\ \\text{m}$. ¿Cuál es la **altura mínima** $h$ para que recorra el rizo completo sin perder contacto con la pista? (en m, 2 cifras significativas; $g = 9{,}8\\ \\text{m/s}^2$)`,
            `A ${rider.en} starts from rest at a height $h$ above the bottom of a **frictionless** track that ends in a vertical loop of radius $R = ${tok(R)}\\ \\text{m}$. What is the **minimum height** $h$ so that it goes round the full loop without losing contact with the track? (in m, 2 significant figures; $g = 9.8\\ \\text{m/s}^2$)`,
          ),
          answer: {
            kind: "numeric-unit",
            value: hMin,
            tolerance: { mode: "sigfig", value: 2 },
            units: ["m"],
            unitChoices: ["m", "cm", "m/s", "J"],
          },
          hints: [
            L(
              "El punto crítico es la cima del rizo: allí la pista y el peso deben juntos producir la fuerza centrípeta.",
              "The critical point is the top of the loop: there the track and the weight must together provide the centripetal force.",
            ),
            L(
              "Contacto mínimo significa $N = 0$: queda $mg = m\\frac{v_{\\text{cima}}^2}{R}$, o sea $v_{\\text{cima}}^2 = gR$.",
              "Minimum contact means $N = 0$: that leaves $mg = m\\frac{v_{\\text{top}}^2}{R}$, i.e. $v_{\\text{top}}^2 = gR$.",
            ),
            L(
              "Ahora la energía entre la salida y la cima: $mgh = mg\\,(2R) + \\frac{1}{2}m v_{\\text{cima}}^2$.",
              "Now energy between the start and the top: $mgh = mg\\,(2R) + \\frac{1}{2}m v_{\\text{top}}^2$.",
            ),
          ],
          answerDisplay: L(
            `$h_{\\min} = ${tok(hMin)}\\ \\text{m}$`,
            `$h_{\\min} = ${tok(hMin)}\\ \\text{m}$`,
          ),
          solution: [
            step(
              "given",
              `$R = ${tok(R)}\\ \\text{m}$, parte del reposo, pista sin rozamiento, $g = 9{,}8\\ \\text{m/s}^2$; la cima del rizo está a $2R = ${tok(r2(2 * R))}\\ \\text{m}$ de altura.`,
              `$R = ${tok(R)}\\ \\text{m}$, starts from rest, frictionless track, $g = 9.8\\ \\text{m/s}^2$; the top of the loop is at $2R = ${tok(r2(2 * R))}\\ \\text{m}$.`,
            ),
            step(
              "approach",
              "Cadena: **dinámica circular en la cima** (condición de contacto) → **conservación de la energía** desde la salida. En la cima, $N + mg = m\\frac{v^2}{R}$ con ambas fuerzas hacia el centro.",
              "Chain: **circular dynamics at the top** (contact condition) → **conservation of energy** from the start. At the top, $N + mg = m\\frac{v^2}{R}$ with both forces pointing toward the centre.",
            ),
            step(
              "calculation",
              `**Cima, $N = 0$:** $mg = m\\frac{v_{\\text{cima}}^2}{R} \\Rightarrow v_{\\text{cima}}^2 = gR = 9{,}8 \\cdot ${tok(R)} = ${tok(vTopSq)}\\ \\text{m}^2/\\text{s}^2$ (unos $${tok(vTop)}\\ \\text{m/s}$)<br>**Energía:** $mgh = mg \\cdot 2R + \\frac{1}{2}m v_{\\text{cima}}^2 = 2mgR + \\frac{1}{2}mgR = \\frac{5}{2}mgR$<br>**Despeje:** $h = \\frac{5R}{2} = 2{,}5 \\cdot ${tok(R)} = ${tok(hMin)}\\ \\text{m}$`,
              `**Top, $N = 0$:** $mg = m\\frac{v_{\\text{top}}^2}{R} \\Rightarrow v_{\\text{top}}^2 = gR = 9.8 \\cdot ${tok(R)} = ${tok(vTopSq)}\\ \\text{m}^2/\\text{s}^2$ (about $${tok(vTop)}\\ \\text{m/s}$)<br>**Energy:** $mgh = mg \\cdot 2R + \\frac{1}{2}m v_{\\text{top}}^2 = 2mgR + \\frac{1}{2}mgR = \\frac{5}{2}mgR$<br>**Solving:** $h = \\frac{5R}{2} = 2.5 \\cdot ${tok(R)} = ${tok(hMin)}\\ \\text{m}$`,
            ),
            step(
              "result",
              `La altura mínima es $h_{\\min} = ${tok(hMin)}\\ \\text{m}$, independiente de la masa: con menos altura la pista dejaría de empujar antes de la cima.`,
              `The minimum height is $h_{\\min} = ${tok(hMin)}\\ \\text{m}$, independent of the mass: any lower and the track stops pushing before the top.`,
            ),
          ],
        };
      }
      const pick = rng.pick([
        { R: 1.5, m: 2, hMul: 3 },
        { R: 2, m: 5, hMul: 3 },
        { R: 2.5, m: 10, hMul: 3 },
        { R: 1.6, m: 5, hMul: 3.5 },
        { R: 2, m: 2, hMul: 3.5 },
        { R: 2.4, m: 10, hMul: 3.5 },
        { R: 3, m: 5, hMul: 4 },
        { R: 2, m: 10, hMul: 4 },
      ]);
      const h = r2(pick.hMul * pick.R);
      const vTopSq = r2(2 * G_ACC * (h - 2 * pick.R));
      const vTop = r1(Math.sqrt(2 * G_ACC * (h - 2 * pick.R)));
      const N = r2(pick.m * (vTopSq / pick.R - G_ACC));
      return {
        skill: L(
          "Rizo vertical: fuerza normal en la cima (energía + circular)",
          "Vertical loop: normal force at the top (energy + circular)",
        ),
        statement: L(
          `Una ${rider.es} de masa $m = ${tok(pick.m)}\\ \\text{kg}$ parte del reposo desde una altura $h = ${tok(h)}\\ \\text{m}$ sobre la base de una pista **sin rozamiento** que termina en un rizo vertical de radio $R = ${tok(pick.R)}\\ \\text{m}$. Calcula la **fuerza normal** que la pista ejerce sobre ella al pasar por el punto más alto del rizo. (en N, 2 cifras significativas; $g = 9{,}8\\ \\text{m/s}^2$)`,
          `A ${rider.en} of mass $m = ${tok(pick.m)}\\ \\text{kg}$ starts from rest at a height $h = ${tok(h)}\\ \\text{m}$ above the bottom of a **frictionless** track that ends in a vertical loop of radius $R = ${tok(pick.R)}\\ \\text{m}$. Compute the **normal force** the track exerts on it at the highest point of the loop. (in N, 2 significant figures; $g = 9.8\\ \\text{m/s}^2$)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: N,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["N", "newton", "newtons"],
          unitChoices: ["N", "J", "m/s", "kg"],
        },
        hints: [
          L(
            "Primero la rapidez en la cima, con energía: al subir de $h$ a $2R$ se pierde energía potencial.",
            "First the speed at the top, using energy: rising from $h$ to $2R$ costs potential energy.",
          ),
          L(
            "$\\frac{1}{2}mv_{\\text{salida}}^2 + mgh = mg \\cdot 2R + \\frac{1}{2}m v_{\\text{cima}}^2$ con $v_{\\text{salida}} = 0$.",
            "$\\frac{1}{2}mv_{\\text{start}}^2 + mgh = mg \\cdot 2R + \\frac{1}{2}m v_{\\text{top}}^2$ with $v_{\\text{start}} = 0$.",
          ),
          L(
            "En la cima, $N + mg = m\\frac{v_{\\text{cima}}^2}{R}$ (las dos hacia el centro): despeja $N = m\\left(\\frac{v_{\\text{cima}}^2}{R} - g\\right)$.",
            "At the top, $N + mg = m\\frac{v_{\\text{top}}^2}{R}$ (both toward the centre): solve $N = m\\left(\\frac{v_{\\text{top}}^2}{R} - g\\right)$.",
          ),
        ],
        answerDisplay: L(`$N = ${tok(N)}\\ \\text{N}$`, `$N = ${tok(N)}\\ \\text{N}$`),
        solution: [
          step(
            "given",
            `$m = ${tok(pick.m)}\\ \\text{kg}$, $h = ${tok(h)}\\ \\text{m}$, $R = ${tok(pick.R)}\\ \\text{m}$, $g = 9{,}8\\ \\text{m/s}^2$; cima del rizo a $2R = ${tok(r2(2 * pick.R))}\\ \\text{m}$.`,
            `$m = ${tok(pick.m)}\\ \\text{kg}$, $h = ${tok(h)}\\ \\text{m}$, $R = ${tok(pick.R)}\\ \\text{m}$, $g = 9.8\\ \\text{m/s}^2$; top of the loop at $2R = ${tok(r2(2 * pick.R))}\\ \\text{m}$.`,
          ),
          step(
            "approach",
            "Cadena: **energía** (de la salida a la cima) → **dinámica circular** (fuerza normal en la cima). Dos leyes distintas aplicadas en dos puntos distintos del recorrido.",
            "Chain: **energy** (from the start to the top) → **circular dynamics** (normal force at the top). Two different laws applied at two different points of the motion.",
          ),
          step(
            "calculation",
            `**Energía:** $v_{\\text{cima}}^2 = 2g(h - 2R) = 2 \\cdot 9{,}8 \\cdot (${tok(h)} - ${tok(r2(2 * pick.R))}) = ${tok(vTopSq)}\\ \\text{m}^2/\\text{s}^2$ ($v_{\\text{cima}} \\approx ${tok(vTop)}\\ \\text{m/s}$)<br>**Fuerza en la cima:** $N + mg = m\\frac{v_{\\text{cima}}^2}{R}$<br>$N = ${tok(pick.m)} \\cdot \\left(\\frac{${tok(vTopSq)}}{${tok(pick.R)}} - 9{,}8\\right) = ${tok(N)}\\ \\text{N}$`,
            `**Energy:** $v_{\\text{top}}^2 = 2g(h - 2R) = 2 \\cdot 9.8 \\cdot (${tok(h)} - ${tok(r2(2 * pick.R))}) = ${tok(vTopSq)}\\ \\text{m}^2/\\text{s}^2$ ($v_{\\text{top}} \\approx ${tok(vTop)}\\ \\text{m/s}$)<br>**Force at the top:** $N + mg = m\\frac{v_{\\text{top}}^2}{R}$<br>$N = ${tok(pick.m)} \\cdot \\left(\\frac{${tok(vTopSq)}}{${tok(pick.R)}} - 9.8\\right) = ${tok(N)}\\ \\text{N}$`,
          ),
          step(
            "result",
            `La pista empuja con $N = ${tok(N)}\\ \\text{N}$ en la cima (hacia el centro). Como $N > 0$, no pierde contacto.`,
            `The track pushes with $N = ${tok(N)}\\ \\text{N}$ at the top (toward the centre). Since $N > 0$, it keeps contact.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Incline + inelastic collision + friction: find the initial height */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pmx-mom-fric-01",
      subject: "physics",
      topicId: "physics-mixed",
      subtopicId: "multi-step",
      difficulty: "challenge",
      questionType: "numeric-unit",
      estimatedTimeSec: 420,
      tags: ["momentum", "energy", "friction", "inelastic-collision", "incline"],
      prerequisites: ["momentum", "work-energy"],
      reasoning: "multi-concept",
    },
    (rng) => {
      const pick = rng.pick([
        { m1: 2, m2: 4, mu: 0.1, d: 5 },
        { m1: 1, m2: 3, mu: 0.2, d: 2.5 },
        { m1: 2, m2: 6, mu: 0.1, d: 4 },
        { m1: 3, m2: 3, mu: 0.3, d: 2 },
        { m1: 1, m2: 1, mu: 0.4, d: 3 },
        { m1: 2, m2: 2, mu: 0.25, d: 4 },
        { m1: 4, m2: 4, mu: 0.2, d: 5 },
        { m1: 1, m2: 2, mu: 0.1, d: 5 },
        { m1: 3, m2: 6, mu: 0.2, d: 2.5 },
        { m1: 5, m2: 5, mu: 0.3, d: 3 },
      ]);
      const ratio = (pick.m1 + pick.m2) / pick.m1;
      const h = r2(pick.mu * pick.d * ratio * ratio);
      const V = r2(Math.sqrt(2 * pick.mu * G_ACC * pick.d));
      const v1 = r2(ratio * Math.sqrt(2 * pick.mu * G_ACC * pick.d));
      return {
        skill: L(
          "Rampa + choque inelástico + rozamiento: hallar la altura",
          "Ramp + inelastic collision + friction: find the height",
        ),
        statement: L(
          `Un bloque de $m_1 = ${pick.m1}\\ \\text{kg}$ parte del reposo desde la cima de una rampa **sin rozamiento** a una altura $h$ sobre el suelo. Al llegar abajo choca contra un segundo bloque de $m_2 = ${pick.m2}\\ \\text{kg}$ que estaba en reposo y quedan **pegados**. El conjunto se desliza por un suelo horizontal rugoso con $\\mu = ${tok(pick.mu)}$ y se detiene tras recorrer $d = ${tok(pick.d)}\\ \\text{m}$. ¿Desde qué altura $h$ partió el primer bloque? (en m, 2 cifras significativas; $g = 9{,}8\\ \\text{m/s}^2$)`,
          `A block of $m_1 = ${pick.m1}\\ \\text{kg}$ starts from rest at the top of a **frictionless** ramp at a height $h$ above the floor. At the bottom it collides with a second block of $m_2 = ${pick.m2}\\ \\text{kg}$ at rest and they **stick together**. The pair slides along a rough horizontal floor with $\\mu = ${tok(pick.mu)}$ and stops after travelling $d = ${tok(pick.d)}\\ \\text{m}$. From what height $h$ did the first block start? (in m, 2 significant figures; $g = 9.8\\ \\text{m/s}^2$)`,
        ),
        diagram: {
          kind: "free-body",
          inclineDeg: 0,
          massLabel: "m",
          forces: [
            { label: "f", dx: -1, dy: 0, color: "secondary" },
            { label: "N", dx: 0, dy: -1, color: "primary" },
            { label: "mg", dx: 0, dy: 1, color: "secondary" },
          ],
        },
        diagramLabel: L(
          "Cuerpo libre del conjunto sobre el suelo rugoso: rozamiento f hacia atrás, normal N hacia arriba y peso mg hacia abajo.",
          "Free-body diagram of the pair on the rough floor: friction f backwards, normal N up and weight mg down.",
        ),
        answer: {
          kind: "numeric-unit",
          value: h,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m"],
          unitChoices: ["m", "cm", "J", "m/s"],
        },
        hints: [
          L(
            "Son tres etapas con leyes distintas: bajada de la rampa, choque y frenado sobre el suelo.",
            "There are three stages with different laws: the ramp descent, the collision and the braking on the floor.",
          ),
          L(
            "Del frenado: $\\frac{1}{2}(m_1+m_2)V^2 = \\mu (m_1+m_2) g\\,d \\Rightarrow V = \\sqrt{2\\mu g\\,d}$. Del choque: $m_1 v_1 = (m_1+m_2)V$.",
            "From the braking: $\\frac{1}{2}(m_1+m_2)V^2 = \\mu (m_1+m_2) g\\,d \\Rightarrow V = \\sqrt{2\\mu g\\,d}$. From the collision: $m_1 v_1 = (m_1+m_2)V$.",
          ),
          L(
            "De la rampa: $v_1 = \\sqrt{2gh}$. Recorre la cadena al revés y despeja $h$.",
            "From the ramp: $v_1 = \\sqrt{2gh}$. Walk the chain backwards and solve for $h$.",
          ),
        ],
        answerDisplay: L(`$h = ${tok(h)}\\ \\text{m}$`, `$h = ${tok(h)}\\ \\text{m}$`),
        solution: [
          step(
            "given",
            `$m_1 = ${pick.m1}\\ \\text{kg}$, $m_2 = ${pick.m2}\\ \\text{kg}$ (en reposo), $\\mu = ${tok(pick.mu)}$, $d = ${tok(pick.d)}\\ \\text{m}$, rampa sin rozamiento, $g = 9{,}8\\ \\text{m/s}^2$.`,
            `$m_1 = ${pick.m1}\\ \\text{kg}$, $m_2 = ${pick.m2}\\ \\text{kg}$ (at rest), $\\mu = ${tok(pick.mu)}$, $d = ${tok(pick.d)}\\ \\text{m}$, frictionless ramp, $g = 9.8\\ \\text{m/s}^2$.`,
          ),
          step(
            "approach",
            "Cadena completa: **Energía → cantidad de movimiento → rozamiento**. Se resuelve al revés: la distancia de frenado da $V$; la conservación del momento en el choque da $v_1$; la energía en la rampa da $h$. En el choque NO se conserva la energía cinética.",
            "Full chain: **Energy → momentum → friction**. Solve it backwards: the braking distance gives $V$; momentum conservation in the collision gives $v_1$; energy on the ramp gives $h$. Kinetic energy is NOT conserved in the collision.",
          ),
          step(
            "calculation",
            `**Frenado:** $V = \\sqrt{2\\mu g\\,d} = \\sqrt{2 \\cdot ${tok(pick.mu)} \\cdot 9{,}8 \\cdot ${tok(pick.d)}} = ${tok(V)}\\ \\text{m/s}$<br>**Choque:** $v_1 = \\frac{m_1+m_2}{m_1}V = ${tok(r1(ratio))} \\cdot ${tok(V)} = ${tok(v1)}\\ \\text{m/s}$<br>**Rampa:** $m_1 g h = \\frac{1}{2}m_1 v_1^2 \\Rightarrow h = \\frac{v_1^2}{2g} = \\frac{${tok(r2(v1 * v1))}}{19{,}6} = ${tok(h)}\\ \\text{m}$`,
            `**Braking:** $V = \\sqrt{2\\mu g\\,d} = \\sqrt{2 \\cdot ${tok(pick.mu)} \\cdot 9.8 \\cdot ${tok(pick.d)}} = ${tok(V)}\\ \\text{m/s}$<br>**Collision:** $v_1 = \\frac{m_1+m_2}{m_1}V = ${tok(r1(ratio))} \\cdot ${tok(V)} = ${tok(v1)}\\ \\text{m/s}$<br>**Ramp:** $m_1 g h = \\frac{1}{2}m_1 v_1^2 \\Rightarrow h = \\frac{v_1^2}{2g} = \\frac{${tok(r2(v1 * v1))}}{19.6} = ${tok(h)}\\ \\text{m}$`,
          ),
          step(
            "result",
            `El primer bloque partió desde $h = ${tok(h)}\\ \\text{m}$. (Comprobación directa: $h = \\mu d\\left(\\frac{m_1+m_2}{m_1}\\right)^2$.)`,
            `The first block started from $h = ${tok(h)}\\ \\text{m}$. (Direct check: $h = \\mu d\\left(\\frac{m_1+m_2}{m_1}\\right)^2$.)`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Spring energy → horizontal projectile: range from the table       */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pmx-spr-proj-01",
      subject: "physics",
      topicId: "physics-mixed",
      subtopicId: "multi-step",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 360,
      tags: ["spring", "energy", "projectile", "horizontal-launch"],
      prerequisites: ["work-energy", "kinematics"],
      reasoning: "multi-concept",
    },
    (rng) => {
      const pick = rng.pick([
        { k: 100, x: 0.2, m: 1, H: 1.225 },
        { k: 100, x: 0.3, m: 1, H: 1.225 },
        { k: 400, x: 0.2, m: 1, H: 1.225 },
        { k: 100, x: 0.5, m: 1, H: 1.225 },
        { k: 400, x: 0.2, m: 4, H: 1.225 },
        { k: 400, x: 0.2, m: 1, H: 4.9 },
        { k: 900, x: 0.1, m: 1, H: 4.9 },
        { k: 100, x: 0.2, m: 1, H: 4.9 },
        { k: 400, x: 0.4, m: 4, H: 4.9 },
      ]);
      const E = r2(0.5 * pick.k * pick.x * pick.x);
      const v = r2(pick.x * Math.sqrt(pick.k / pick.m));
      const t = r2(Math.sqrt((2 * pick.H) / G_ACC));
      const R = r2(v * t);
      return {
        skill: L(
          "Muelle → tiro horizontal: alcance desde la mesa",
          "Spring → horizontal launch: range from the table",
        ),
        statement: L(
          `Un carrito de $m = ${tok(pick.m)}\\ \\text{kg}$ está apoyado en una pista horizontal contra un muelle de constante $k = ${pick.k}\\ \\text{N/m}$ comprimido $x = ${tok(pick.x)}\\ \\text{m}$. Al soltarse, el muelle lo empuja (sin rozamiento) y el carrito sale **horizontalmente** desde el borde de una mesa de altura $H = ${tok(pick.H)}\\ \\text{m}$. ¿A qué distancia del pie de la mesa aterriza? (en m, 2 cifras significativas; $g = 9{,}8\\ \\text{m/s}^2$)`,
          `A cart of $m = ${tok(pick.m)}\\ \\text{kg}$ rests on a horizontal track against a spring of constant $k = ${pick.k}\\ \\text{N/m}$ compressed by $x = ${tok(pick.x)}\\ \\text{m}$. When released, the spring pushes it (frictionless) and the cart flies off **horizontally** from the edge of a table of height $H = ${tok(pick.H)}\\ \\text{m}$. How far from the foot of the table does it land? (in m, 2 significant figures; $g = 9.8\\ \\text{m/s}^2$)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: R,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m"],
          unitChoices: ["m", "cm", "m/s", "J"],
        },
        hints: [
          L(
            "Dos etapas encadenadas: primero la rapidez de salida del muelle, después el tiro horizontal.",
            "Two chained stages: first the launch speed from the spring, then the horizontal projectile.",
          ),
          L(
            "Energía elástica → cinética: $\\frac{1}{2}kx^2 = \\frac{1}{2}mv^2 \\Rightarrow v = x\\sqrt{k/m}$.",
            "Elastic → kinetic energy: $\\frac{1}{2}kx^2 = \\frac{1}{2}mv^2 \\Rightarrow v = x\\sqrt{k/m}$.",
          ),
          L(
            "Caída desde la mesa: $t = \\sqrt{2H/g}$ y el alcance es $R = v\\,t$.",
            "Fall from the table: $t = \\sqrt{2H/g}$ and the range is $R = v\\,t$.",
          ),
        ],
        answerDisplay: L(`$R = ${tok(R)}\\ \\text{m}$`, `$R = ${tok(R)}\\ \\text{m}$`),
        solution: [
          step(
            "given",
            `$k = ${pick.k}\\ \\text{N/m}$, $x = ${tok(pick.x)}\\ \\text{m}$, $m = ${tok(pick.m)}\\ \\text{kg}$, $H = ${tok(pick.H)}\\ \\text{m}$, $g = 9{,}8\\ \\text{m/s}^2$.`,
            `$k = ${pick.k}\\ \\text{N/m}$, $x = ${tok(pick.x)}\\ \\text{m}$, $m = ${tok(pick.m)}\\ \\text{kg}$, $H = ${tok(pick.H)}\\ \\text{m}$, $g = 9.8\\ \\text{m/s}^2$.`,
          ),
          step(
            "approach",
            "Cadena: **energía elástica del muelle → tiro horizontal**. La rapidez de salida sale de conservar la energía; el alcance, de la caída libre con velocidad horizontal constante.",
            "Chain: **spring elastic energy → horizontal projectile**. The launch speed comes from energy conservation; the range, from free fall with constant horizontal velocity.",
          ),
          step(
            "calculation",
            `**Muelle:** $\\frac{1}{2}kx^2 = \\frac{1}{2}mv^2 \\Rightarrow v = x\\sqrt{\\frac{k}{m}} = ${tok(pick.x)}\\sqrt{\\frac{${pick.k}}{${tok(pick.m)}}} = ${tok(v)}\\ \\text{m/s}$ (energía almacenada: $${tok(E)}\\ \\text{J}$)<br>**Caída:** $t = \\sqrt{\\frac{2H}{g}} = \\sqrt{\\frac{${tok(r2(2 * pick.H))}}{9{,}8}} = ${tok(t)}\\ \\text{s}$<br>**Alcance:** $R = v\\,t = ${tok(v)} \\cdot ${tok(t)} = ${tok(R)}\\ \\text{m}$`,
            `**Spring:** $\\frac{1}{2}kx^2 = \\frac{1}{2}mv^2 \\Rightarrow v = x\\sqrt{\\frac{k}{m}} = ${tok(pick.x)}\\sqrt{\\frac{${pick.k}}{${tok(pick.m)}}} = ${tok(v)}\\ \\text{m/s}$ (stored energy: $${tok(E)}\\ \\text{J}$)<br>**Fall:** $t = \\sqrt{\\frac{2H}{g}} = \\sqrt{\\frac{${tok(r2(2 * pick.H))}}{9.8}} = ${tok(t)}\\ \\text{s}$<br>**Range:** $R = v\\,t = ${tok(v)} \\cdot ${tok(t)} = ${tok(R)}\\ \\text{m}$`,
          ),
          step(
            "result",
            `El carrito aterriza a $R = ${tok(R)}\\ \\text{m}$ del pie de la mesa.`,
            `The cart lands $R = ${tok(R)}\\ \\text{m}$ from the foot of the table.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Gravitation + circular + energy: Hohmann transfer boost           */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pmx-orbit-02",
      subject: "physics",
      topicId: "physics-mixed",
      subtopicId: "exam-style",
      difficulty: "challenge",
      questionType: "numeric-unit",
      estimatedTimeSec: 480,
      tags: ["gravitation", "circular-motion", "orbit", "energy-conservation"],
      prerequisites: ["circular-gravitation", "work-energy"],
      reasoning: "multi-concept",
    },
    (rng) => {
      const pick = rng.pick([
        { r1: 1.0e7, r2: 2.5e7 },
        { r1: 1.0e7, r2: 4.0e7 },
        { r1: 1.6e7, r2: 4.0e7 },
        { r1: 2.5e7, r2: 4.0e7 },
        { r1: 1.6e7, r2: 2.5e7 },
      ]);
      const GM = G_CONST * M_EARTH;
      const sci = (v: number) => ({
        man: Number((v / Math.pow(10, Math.floor(Math.log10(v)))).toPrecision(2)),
        exp: Math.floor(Math.log10(v)),
      });
      const s1 = sci(pick.r1);
      const s2 = sci(pick.r2);
      const v1 = Math.sqrt(GM / pick.r1);
      const vpSq = (2 * GM * pick.r2) / (pick.r1 * (pick.r1 + pick.r2));
      const vp = Math.sqrt(vpSq);
      const dv = sig3(vp - v1);
      return {
        skill: L(
          "Transferencia entre órbitas: impulso necesario (gravitación + energía)",
          "Orbit transfer: required boost (gravitation + energy)",
        ),
        statement: L(
          `Un satélite describe una órbita circular de radio $r_1 = ${tok(s1.man)}\\times10^{${s1.exp}}\\ \\text{m}$ alrededor de la Tierra y debe pasar a una órbita circular de radio $r_2 = ${tok(s2.man)}\\times10^{${s2.exp}}\\ \\text{m}$. Para eso entra en una órbita de transferencia **elíptica** tangente a las dos órbitas. ¿En cuánto debe **aumentar** su rapidez en el instante de iniciar la transferencia? (en m/s, 3 cifras significativas; $G = 6{,}67\\times10^{-11}\\ \\text{N·m}^2/\\text{kg}^2$, $M_{\\text{Tierra}} = 6\\times10^{24}\\ \\text{kg}$)`,
          `A satellite moves on a circular orbit of radius $r_1 = ${tok(s1.man)}\\times10^{${s1.exp}}\\ \\text{m}$ around the Earth and must move to a circular orbit of radius $r_2 = ${tok(s2.man)}\\times10^{${s2.exp}}\\ \\text{m}$. To do so it enters an **elliptical** transfer orbit tangent to both circles. By how much must it **increase** its speed at the moment it starts the transfer? (in m/s, 3 significant figures; $G = 6.67\\times10^{-11}\\ \\text{N·m}^2/\\text{kg}^2$, $M_{\\text{Earth}} = 6\\times10^{24}\\ \\text{kg}$)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: dv,
          tolerance: { mode: "sigfig", value: 3 },
          units: ["m/s"],
          unitChoices: ["m/s", "km/s", "km/h", "m/s^2"],
        },
        hints: [
          L(
            "Necesitas dos rapideces: la de la órbita circular baja ($\\frac{GMm}{r^2} = \\frac{mv^2}{r}$) y la del perigeo de la elipse.",
            "You need two speeds: the one on the low circular orbit ($\\frac{GMm}{r^2} = \\frac{mv^2}{r}$) and the one at the perigee of the ellipse.",
          ),
          L(
            "En la elipse se conservan la energía mecánica y el momento angular entre perigeo ($r_1$, $v_p$) y apogeo ($r_2$, $v_a$): $\\frac{1}{2}v_p^2 - \\frac{GM}{r_1} = \\frac{1}{2}v_a^2 - \\frac{GM}{r_2}$ y $r_1 v_p = r_2 v_a$.",
            "On the ellipse both mechanical energy and angular momentum are conserved between perigee ($r_1$, $v_p$) and apogee ($r_2$, $v_a$): $\\frac{1}{2}v_p^2 - \\frac{GM}{r_1} = \\frac{1}{2}v_a^2 - \\frac{GM}{r_2}$ and $r_1 v_p = r_2 v_a$.",
          ),
          L(
            "Sustituyendo $v_a = \\frac{r_1}{r_2}v_p$ queda $v_p^2 = \\frac{2GM\\,r_2}{r_1(r_1+r_2)}$; el aumento pedido es $\\Delta v = v_p - v_1$.",
            "Substituting $v_a = \\frac{r_1}{r_2}v_p$ leaves $v_p^2 = \\frac{2GM\\,r_2}{r_1(r_1+r_2)}$; the required boost is $\\Delta v = v_p - v_1$.",
          ),
        ],
        answerDisplay: L(`$\\Delta v = ${tok(dv)}\\ \\text{m/s}$`, `$\\Delta v = ${tok(dv)}\\ \\text{m/s}$`),
        solution: [
          step(
            "given",
            `$r_1 = ${tok(s1.man)}\\times10^{${s1.exp}}\\ \\text{m}$, $r_2 = ${tok(s2.man)}\\times10^{${s2.exp}}\\ \\text{m}$, $G = 6{,}67\\times10^{-11}\\ \\text{N·m}^2/\\text{kg}^2$, $M = 6\\times10^{24}\\ \\text{kg}$; órbita de transferencia elíptica tangente a ambas.`,
            `$r_1 = ${tok(s1.man)}\\times10^{${s1.exp}}\\ \\text{m}$, $r_2 = ${tok(s2.man)}\\times10^{${s2.exp}}\\ \\text{m}$, $G = 6.67\\times10^{-11}\\ \\text{N·m}^2/\\text{kg}^2$, $M = 6\\times10^{24}\\ \\text{kg}$; elliptical transfer orbit tangent to both.`,
          ),
          step(
            "approach",
            "Cadena: **gravitación → dinámica circular → conservación (energía + momento angular)** en la elipse, sin cálculo diferencial. Primero $v_1$ en la órbita circular; después $v_p$ en el perigeo de la elipse combinando las dos conservaciones; el impulso es la diferencia.",
            "Chain: **gravitation → circular dynamics → conservation (energy + angular momentum)** on the ellipse, no calculus needed. First $v_1$ on the circular orbit; then $v_p$ at the perigee of the ellipse by combining both conservations; the boost is the difference.",
          ),
          step(
            "calculation",
            `$GM = 6{,}67\\times10^{-11} \\cdot 6\\times10^{24} \\approx 4{,}0\\times10^{14}\\ \\text{m}^3/\\text{s}^2$<br>**Órbita circular baja:** $v_1 = \\sqrt{\\frac{GM}{r_1}} = ${tok(Math.round(v1))}\\ \\text{m/s}$<br>**Perigeo de la elipse:** con $v_a = \\frac{r_1}{r_2}v_p$ y la energía: $v_p^2 = \\frac{2GM\\,r_2}{r_1(r_1+r_2)} = ${tok((vpSq / 1e7).toFixed(2))}\\times10^{7}\\ \\text{m}^2/\\text{s}^2 \\Rightarrow v_p = ${tok(Math.round(vp))}\\ \\text{m/s}$<br>$\\Delta v = ${tok(Math.round(vp))} - ${tok(Math.round(v1))} = ${tok(Math.round(vp - v1))}\\ \\text{m/s}$`,
            `$GM = 6.67\\times10^{-11} \\cdot 6\\times10^{24} \\approx 4.0\\times10^{14}\\ \\text{m}^3/\\text{s}^2$<br>**Low circular orbit:** $v_1 = \\sqrt{\\frac{GM}{r_1}} = ${tok(Math.round(v1))}\\ \\text{m/s}$<br>**Perigee of the ellipse:** with $v_a = \\frac{r_1}{r_2}v_p$ and energy: $v_p^2 = \\frac{2GM\\,r_2}{r_1(r_1+r_2)} = ${tok((vpSq / 1e7).toFixed(2))}\\times10^{7}\\ \\text{m}^2/\\text{s}^2 \\Rightarrow v_p = ${tok(Math.round(vp))}\\ \\text{m/s}$<br>$\\Delta v = ${tok(Math.round(vp))} - ${tok(Math.round(v1))} = ${tok(Math.round(vp - v1))}\\ \\text{m/s}$`,
          ),
          step(
            "result",
            `El satélite debe acelerar unos $${tok(dv)}\\ \\text{m/s}$ para entrar en la órbita de transferencia (más adelante necesitará otro impulso para circularizar en $r_2$).`,
            `The satellite must speed up by about $${tok(dv)}\\ \\text{m/s}$ to enter the transfer orbit (later it will need another boost to circularise at $r_2$).`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Rotational + collision: disk dropped on a spinning disk           */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pmx-rot-coll-01",
      subject: "physics",
      topicId: "physics-mixed",
      subtopicId: "multi-step",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 300,
      tags: ["rotational-motion", "angular-momentum", "collisions", "energy"],
      prerequisites: ["rotational-motion", "momentum"],
      reasoning: "multi-concept",
    },
    (rng) => {
      const pick = rng.pick([
        { M1: 4, R1: 0.5, w1: 8, M2: 4, R2: 0.5 },
        { M1: 2, R1: 0.4, w1: 10, M2: 2, R2: 0.4 },
        { M1: 8, R1: 0.5, w1: 6, M2: 4, R2: 0.5 },
        { M1: 6, R1: 0.4, w1: 12, M2: 6, R2: 0.4 },
        { M1: 2, R1: 0.6, w1: 10, M2: 8, R2: 0.6 },
        { M1: 10, R1: 0.3, w1: 16, M2: 10, R2: 0.3 },
      ]);
      const askOmega = rng.bool();
      const I1 = 0.5 * pick.M1 * pick.R1 * pick.R1;
      const I2 = 0.5 * pick.M2 * pick.R2 * pick.R2;
      const w = I1 * pick.w1 / (I1 + I2);
      const Ei = 0.5 * I1 * pick.w1 * pick.w1;
      const Ef = 0.5 * (I1 + I2) * w * w;
      const dE = r2(Ei - Ef);
      if (askOmega) {
        return {
          skill: L(
            "Disco sobre disco giratorio: rapidez angular común",
            "Disk dropped on a spinning disk: common angular speed",
          ),
          statement: L(
            `Un disco de $M_1 = ${pick.M1}\\ \\text{kg}$ y radio $R_1 = ${tok(pick.R1)}\\ \\text{m}$ gira con $\\omega_1 = ${pick.w1}\\ \\text{rad/s}$ alrededor de su eje vertical, sin rozamiento con el suelo. Se deja caer suavemente, **coaxial**, un segundo disco de $M_2 = ${pick.M2}\\ \\text{kg}$ y radio $R_2 = ${tok(pick.R2)}\\ \\text{m}$ que estaba en reposo, y ambos quedan girando **juntos** como un solo cuerpo rígido. Calcula la **rapidez angular común** final. (en rad/s, 2 cifras significativas; momento de inercia de un disco: $I = \\frac{1}{2}MR^2$)`,
            `A disk of $M_1 = ${pick.M1}\\ \\text{kg}$ and radius $R_1 = ${tok(pick.R1)}\\ \\text{m}$ spins at $\\omega_1 = ${pick.w1}\\ \\text{rad/s}$ about its vertical axis, frictionless. A second disk of $M_2 = ${pick.M2}\\ \\text{kg}$ and radius $R_2 = ${tok(pick.R2)}\\ \\text{m}$, initially at rest, is gently dropped onto it **coaxially**, and the two end up spinning **together** as one rigid body. Compute the final **common angular speed**. (in rad/s, 2 significant figures; moment of inertia of a disk: $I = \\frac{1}{2}MR^2$)`,
          ),
          answer: {
            kind: "numeric-unit",
            value: r2(w),
            tolerance: { mode: "sigfig", value: 2 },
            units: ["rad/s"],
            unitChoices: ["rad/s", "rad/s^2", "Hz", "J"],
          },
          hints: [
            L(
              "Durante el acoplamiento no hay par externo respecto al eje: el **momento angular** $L = I\\omega$ se conserva (la energía NO).",
              "During the coupling there is no external torque about the axis: **angular momentum** $L = I\\omega$ is conserved (energy is NOT).",
            ),
            L(
              `Calcula $I_1 = \\frac{1}{2}M_1R_1^2$ y $I_2 = \\frac{1}{2}M_2R_2^2$, y plantea $I_1\\omega_1 = (I_1+I_2)\\omega$.`,
              `Compute $I_1 = \\frac{1}{2}M_1R_1^2$ and $I_2 = \\frac{1}{2}M_2R_2^2$, and set $I_1\\omega_1 = (I_1+I_2)\\omega$.`,
            ),
            L(
              "Despeja $\\omega = \\frac{I_1}{I_1+I_2}\\omega_1$; es el análogo rotacional de un choque perfectamente inelástico.",
              "Solve $\\omega = \\frac{I_1}{I_1+I_2}\\omega_1$; it is the rotational analogue of a perfectly inelastic collision.",
            ),
          ],
          answerDisplay: L(`$\\omega = ${tok(r2(w))}\\ \\text{rad/s}$`, `$\\omega = ${tok(r2(w))}\\ \\text{rad/s}$`),
          solution: [
            step(
              "given",
              `$M_1 = ${pick.M1}\\ \\text{kg}$, $R_1 = ${tok(pick.R1)}\\ \\text{m}$, $\\omega_1 = ${pick.w1}\\ \\text{rad/s}$; $M_2 = ${pick.M2}\\ \\text{kg}$, $R_2 = ${tok(pick.R2)}\\ \\text{m}$, en reposo; $I = \\frac{1}{2}MR^2$.`,
              `$M_1 = ${pick.M1}\\ \\text{kg}$, $R_1 = ${tok(pick.R1)}\\ \\text{m}$, $\\omega_1 = ${pick.w1}\\ \\text{rad/s}$; $M_2 = ${pick.M2}\\ \\text{kg}$, $R_2 = ${tok(pick.R2)}\\ \\text{m}$, at rest; $I = \\frac{1}{2}MR^2$.`,
            ),
            step(
              "approach",
              "Choque rotacional: **conservación del momento angular** respecto al eje ($I_1\\omega_1 = (I_1+I_2)\\omega$). La energía cinética rotacional disminuye por el rozamiento interno entre los discos.",
              "Rotational collision: **conservation of angular momentum** about the axis ($I_1\\omega_1 = (I_1+I_2)\\omega$). Rotational kinetic energy decreases due to internal friction between the disks.",
            ),
            step(
              "calculation",
              `$I_1 = \\frac{1}{2} \\cdot ${pick.M1} \\cdot ${tok(pick.R1)}^2 = ${tok(r2(I1))}\\ \\text{kg·m}^2$; $I_2 = \\frac{1}{2} \\cdot ${pick.M2} \\cdot ${tok(pick.R2)}^2 = ${tok(r2(I2))}\\ \\text{kg·m}^2$<br>$\\omega = \\frac{I_1}{I_1+I_2}\\omega_1 = \\frac{${tok(r2(I1))}}{${tok(r2(I1 + I2))}} \\cdot ${pick.w1} = ${tok(r2(w))}\\ \\text{rad/s}$`,
              `$I_1 = \\frac{1}{2} \\cdot ${pick.M1} \\cdot ${tok(pick.R1)}^2 = ${tok(r2(I1))}\\ \\text{kg·m}^2$; $I_2 = \\frac{1}{2} \\cdot ${pick.M2} \\cdot ${tok(pick.R2)}^2 = ${tok(r2(I2))}\\ \\text{kg·m}^2$<br>$\\omega = \\frac{I_1}{I_1+I_2}\\omega_1 = \\frac{${tok(r2(I1))}}{${tok(r2(I1 + I2))}} \\cdot ${pick.w1} = ${tok(r2(w))}\\ \\text{rad/s}$`,
            ),
            step(
              "result",
              `Los dos discos giran juntos con $\\omega = ${tok(r2(w))}\\ \\text{rad/s}$, menor que $\\omega_1$: parte de la energía se disipó en el acoplamiento.`,
              `The two disks spin together at $\\omega = ${tok(r2(w))}\\ \\text{rad/s}$, less than $\\omega_1$: part of the energy dissipated in the coupling.`,
            ),
          ],
        };
      }
      return {
        skill: L(
          "Disco sobre disco giratorio: energía disipada (angular + energía)",
          "Disk dropped on a spinning disk: energy dissipated (angular + energy)",
        ),
        statement: L(
          `Un disco de $M_1 = ${pick.M1}\\ \\text{kg}$ y radio $R_1 = ${tok(pick.R1)}\\ \\text{m}$ gira con $\\omega_1 = ${pick.w1}\\ \\text{rad/s}$ alrededor de su eje vertical, sin rozamiento con el suelo. Se deja caer suavemente, **coaxial**, un segundo disco de $M_2 = ${pick.M2}\\ \\text{kg}$ y radio $R_2 = ${tok(pick.R2)}\\ \\text{m}$ que estaba en reposo, y ambos quedan girando **juntos**. ¿Cuánta **energía mecánica** se disipa en el acoplamiento? (en J, 2 cifras significativas; $I = \\frac{1}{2}MR^2$)`,
          `A disk of $M_1 = ${pick.M1}\\ \\text{kg}$ and radius $R_1 = ${tok(pick.R1)}\\ \\text{m}$ spins at $\\omega_1 = ${pick.w1}\\ \\text{rad/s}$ about its vertical axis, frictionless. A second disk of $M_2 = ${pick.M2}\\ \\text{kg}$ and radius $R_2 = ${tok(pick.R2)}\\ \\text{m}$, initially at rest, is gently dropped onto it **coaxially**, and the two end up spinning **together**. How much **mechanical energy** is dissipated in the coupling? (in J, 2 significant figures; $I = \\frac{1}{2}MR^2$)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: dE,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["J", "joule", "joules"],
          unitChoices: ["J", "kJ", "N", "W"],
        },
        hints: [
          L(
            "Primero halla la rapidez angular común: sin par externo, $I_1\\omega_1 = (I_1+I_2)\\omega$.",
            "First find the common angular speed: with no external torque, $I_1\\omega_1 = (I_1+I_2)\\omega$.",
          ),
          L(
            "Luego compara energías cinéticas rotacionales: $E_i = \\frac{1}{2}I_1\\omega_1^2$ y $E_f = \\frac{1}{2}(I_1+I_2)\\omega^2$.",
            "Then compare rotational kinetic energies: $E_i = \\frac{1}{2}I_1\\omega_1^2$ and $E_f = \\frac{1}{2}(I_1+I_2)\\omega^2$.",
          ),
          L(
            "La energía disipada es la diferencia $E_i - E_f$ (siempre positiva: el acoplamiento es inelástico).",
            "The dissipated energy is the difference $E_i - E_f$ (always positive: the coupling is inelastic).",
          ),
        ],
        answerDisplay: L(`$\\Delta E = ${tok(dE)}\\ \\text{J}$`, `$\\Delta E = ${tok(dE)}\\ \\text{J}$`),
        solution: [
          step(
            "given",
            `$M_1 = ${pick.M1}\\ \\text{kg}$, $R_1 = ${tok(pick.R1)}\\ \\text{m}$, $\\omega_1 = ${pick.w1}\\ \\text{rad/s}$; $M_2 = ${pick.M2}\\ \\text{kg}$, $R_2 = ${tok(pick.R2)}\\ \\text{m}$, en reposo; $I = \\frac{1}{2}MR^2$.`,
            `$M_1 = ${pick.M1}\\ \\text{kg}$, $R_1 = ${tok(pick.R1)}\\ \\text{m}$, $\\omega_1 = ${pick.w1}\\ \\text{rad/s}$; $M_2 = ${pick.M2}\\ \\text{kg}$, $R_2 = ${tok(pick.R2)}\\ \\text{m}$, at rest; $I = \\frac{1}{2}MR^2$.`,
          ),
          step(
            "approach",
            "Cadena: **momento angular → energía**. El momento angular se conserva (da $\\omega$); la energía cinética no (la diferencia es lo disipado por el rozamiento entre los discos).",
            "Chain: **angular momentum → energy**. Angular momentum is conserved (gives $\\omega$); kinetic energy is not (the difference is what friction between the disks dissipates).",
          ),
          step(
            "calculation",
            `$I_1 = ${tok(r2(I1))}\\ \\text{kg·m}^2$, $I_2 = ${tok(r2(I2))}\\ \\text{kg·m}^2$<br>$\\omega = \\frac{I_1}{I_1+I_2}\\omega_1 = \\frac{${tok(r2(I1))}}{${tok(r2(I1 + I2))}} \\cdot ${pick.w1} = ${tok(r2(w))}\\ \\text{rad/s}$<br>$E_i = \\frac{1}{2}I_1\\omega_1^2 = ${tok(r2(Ei))}\\ \\text{J}$; $E_f = \\frac{1}{2}(I_1+I_2)\\omega^2 = ${tok(r2(Ef))}\\ \\text{J}$<br>$\\Delta E = ${tok(r2(Ei))} - ${tok(r2(Ef))} = ${tok(dE)}\\ \\text{J}$`,
            `$I_1 = ${tok(r2(I1))}\\ \\text{kg·m}^2$, $I_2 = ${tok(r2(I2))}\\ \\text{kg·m}^2$<br>$\\omega = \\frac{I_1}{I_1+I_2}\\omega_1 = \\frac{${tok(r2(I1))}}{${tok(r2(I1 + I2))}} \\cdot ${pick.w1} = ${tok(r2(w))}\\ \\text{rad/s}$<br>$E_i = \\frac{1}{2}I_1\\omega_1^2 = ${tok(r2(Ei))}\\ \\text{J}$; $E_f = \\frac{1}{2}(I_1+I_2)\\omega^2 = ${tok(r2(Ef))}\\ \\text{J}$<br>$\\Delta E = ${tok(r2(Ei))} - ${tok(r2(Ef))} = ${tok(dE)}\\ \\text{J}$`,
          ),
          step(
            "result",
            `Se disipan $${tok(dE)}\\ \\text{J}$ (calor por el rozamiento entre las caras de los discos); el momento angular, en cambio, quedó intacto.`,
            `${tok(dE)}\\ \\text{J}$ are dissipated (heat from friction between the disk faces); angular momentum, in contrast, stayed intact.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Circuits + thermal: resistor heating water                        */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pmx-cir-therm-01",
      subject: "physics",
      topicId: "physics-mixed",
      subtopicId: "multi-step",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 360,
      tags: ["circuits", "power", "thermal", "calorimetry"],
      prerequisites: ["circuits", "thermal-physics"],
      reasoning: "multi-concept",
    },
    (rng) => {
      const pick = rng.pick([
        { V: 12, R: 4, tSec: 300, m: 0.2 },
        { V: 24, R: 12, tSec: 600, m: 0.4 },
        { V: 9, R: 3, tSec: 300, m: 0.15 },
        { V: 6, R: 2, tSec: 600, m: 0.3 },
        { V: 24, R: 6, tSec: 300, m: 0.5 },
        { V: 12, R: 6, tSec: 900, m: 0.6 },
        { V: 24, R: 8, tSec: 750, m: 0.5 },
      ]);
      const tMin = pick.tSec / 60;
      const P = r1((pick.V * pick.V) / pick.R);
      const Q = r1(P * pick.tSec);
      const dT = sig2(Q / (pick.m * C_WATER));
      return {
        skill: L(
          "Resistencia eléctrica que calienta agua (circuitos + térmica)",
          "Electric resistor heating water (circuits + thermal)",
        ),
        statement: L(
          `Un calentador de inmersión es una resistencia de $R = ${pick.R}\\ \\Omega$ conectada a una pila de $${pick.V}\\ \\text{V}$. Se sumerge en un recipiente aislado con $m = ${tok(pick.m)}\\ \\text{kg}$ de agua y funciona durante $t = ${tok(tMin)}\\ \\text{min}$. ¿Cuánto **sube** la temperatura del agua? (el aumento es el mismo en K que en °C; 2 cifras significativas; $c_{\\text{agua}} = 4186\\ \\text{J/(kg·K)}$; desprecia la capacidad térmica del recipiente y las pérdidas)`,
          `An immersion heater is a resistor of $R = ${pick.R}\\ \\Omega$ connected to a $${pick.V}\\ \\text{V}$ battery. It is plunged into an insulated container with $m = ${tok(pick.m)}\\ \\text{kg}$ of water and runs for $t = ${tok(tMin)}\\ \\text{min}$. By how much does the water's temperature **rise**? (the rise is the same in K as in °C; 2 significant figures; $c_{\\text{water}} = 4186\\ \\text{J/(kg·K)}$; neglect the container's heat capacity and any losses)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: dT,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["K", "°C", "C", "celsius", "grados celsius"],
          unitChoices: ["K", "°C", "J", "W"],
        },
        hints: [
          L(
            "Primero la potencia eléctrica disipada: $P = \\frac{V^2}{R}$.",
            "First the electric power dissipated: $P = \\frac{V^2}{R}$.",
          ),
          L(
            "La energía entregada es $Q = P\\,t$ con $t$ en segundos; toda ella va al agua.",
            "The energy delivered is $Q = P\\,t$ with $t$ in seconds; all of it goes into the water.",
          ),
          L(
            "Calorimetría: $Q = m\\,c\\,\\Delta T \\Rightarrow \\Delta T = \\frac{Q}{mc}$.",
            "Calorimetry: $Q = m\\,c\\,\\Delta T \\Rightarrow \\Delta T = \\frac{Q}{mc}$.",
          ),
        ],
        answerDisplay: L(
          `$\\Delta T \\approx ${tok(dT)}\\ \\text{K}$`,
          `$\\Delta T \\approx ${tok(dT)}\\ \\text{K}$`,
        ),
        solution: [
          step(
            "given",
            `$V = ${pick.V}\\ \\text{V}$, $R = ${pick.R}\\ \\Omega$, $t = ${tok(tMin)}\\ \\text{min} = ${pick.tSec}\\ \\text{s}$, $m = ${tok(pick.m)}\\ \\text{kg}$, $c = 4186\\ \\text{J/(kg·K)}$.`,
            `$V = ${pick.V}\\ \\text{V}$, $R = ${pick.R}\\ \\Omega$, $t = ${tok(tMin)}\\ \\text{min} = ${pick.tSec}\\ \\text{s}$, $m = ${tok(pick.m)}\\ \\text{kg}$, $c = 4186\\ \\text{J/(kg·K)}$.`,
          ),
          step(
            "approach",
            "Cadena: **circuito (potencia) → energía → calorimetría**. La resistencia convierte energía eléctrica en térmica a ritmo constante $P = V^2/R$, y esa energía sube la temperatura del agua.",
            "Chain: **circuit (power) → energy → calorimetry**. The resistor converts electric energy into thermal energy at a constant rate $P = V^2/R$, and that energy raises the water's temperature.",
          ),
          step(
            "calculation",
            `**Potencia:** $P = \\frac{V^2}{R} = \\frac{${pick.V}^2}{${pick.R}} = ${tok(P)}\\ \\text{W}$<br>**Energía:** $Q = P\\,t = ${tok(P)} \\cdot ${pick.tSec} = ${tok(Q)}\\ \\text{J}$<br>**Calorimetría:** $\\Delta T = \\frac{Q}{mc} = \\frac{${tok(Q)}}{${tok(pick.m)} \\cdot 4186} \\approx ${tok(dT)}\\ \\text{K}$`,
            `**Power:** $P = \\frac{V^2}{R} = \\frac{${pick.V}^2}{${pick.R}} = ${tok(P)}\\ \\text{W}$<br>**Energy:** $Q = P\\,t = ${tok(P)} \\cdot ${pick.tSec} = ${tok(Q)}\\ \\text{J}$<br>**Calorimetry:** $\\Delta T = \\frac{Q}{mc} = \\frac{${tok(Q)}}{${tok(pick.m)} \\cdot 4186} \\approx ${tok(dT)}\\ \\text{K}$`,
          ),
          step(
            "result",
            `El agua sube unos $${tok(dT)}\\ \\text{K}$ (equivalente a $${tok(dT)}\\ \\text{°C}$): la energía eléctrica acabó en energía térmica.`,
            `The water rises by about $${tok(dT)}\\ \\text{K}$ (equivalent to $${tok(dT)}\\ \\text{°C}$): the electric energy ended up as thermal energy.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Pendulum: period → length → energy → maximum speed                */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pmx-pend-en-01",
      subject: "physics",
      topicId: "physics-mixed",
      subtopicId: "mixed-concepts",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 300,
      tags: ["pendulum", "shm", "energy"],
      prerequisites: ["oscillations-waves", "work-energy"],
      reasoning: "multi-concept",
    },
    (rng) => {
      const T = rng.pick([1, 1.5, 2, 2.5, 3]);
      const len = r2((G_ACC * T * T) / (4 * Math.PI * Math.PI));
      const v = sig2(Math.sqrt(2 * G_ACC * len));
      return {
        skill: L(
          "Péndulo: del período a la rapidez máxima (MAS + energía)",
          "Pendulum: from period to maximum speed (SHM + energy)",
        ),
        statement: L(
          `Al hacer oscilar un péndulo con **pequeña amplitud** se mide un período $T = ${tok(T)}\\ \\text{s}$. Luego se separa la esfera hasta poner el hilo en **horizontal** y se suelta desde el reposo. ¿Con qué rapidez **máxima** pasa por el punto más bajo? (en m/s, 2 cifras significativas; $g = 9{,}8\\ \\text{m/s}^2$)`,
          `When set swinging with a **small amplitude**, a pendulum is measured to have period $T = ${tok(T)}\\ \\text{s}$. The bob is then pulled aside until the string is **horizontal** and released from rest. With what **maximum** speed does it pass through the lowest point? (in m/s, 2 significant figures; $g = 9.8\\ \\text{m/s}^2$)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: v,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m/s"],
          unitChoices: ["m/s", "m/s^2", "m", "Hz"],
        },
        hints: [
          L(
            "El período mide la longitud sin necesidad de regla: $T = 2\\pi\\sqrt{\\frac{L}{g}}$.",
            "The period measures the length without a ruler: $T = 2\\pi\\sqrt{\\frac{L}{g}}$.",
          ),
          L(
            "Desde la horizontal hasta el punto más bajo la esfera desciende una altura igual a $L$.",
            "From the horizontal position to the lowest point the bob drops a height equal to $L$.",
          ),
          L(
            "Conservación de la energía: $mgL = \\frac{1}{2}mv_{\\max}^2 \\Rightarrow v_{\\max} = \\sqrt{2gL}$.",
            "Conservation of energy: $mgL = \\frac{1}{2}mv_{\\max}^2 \\Rightarrow v_{\\max} = \\sqrt{2gL}$.",
          ),
        ],
        answerDisplay: L(`$v_{\\max} \\approx ${tok(v)}\\ \\text{m/s}$`, `$v_{\\max} \\approx ${tok(v)}\\ \\text{m/s}$`),
        solution: [
          step(
            "given",
            `$T = ${tok(T)}\\ \\text{s}$ (pequeñas oscilaciones), suelta desde horizontal, $g = 9{,}8\\ \\text{m/s}^2$.`,
            `$T = ${tok(T)}\\ \\text{s}$ (small oscillations), released from horizontal, $g = 9.8\\ \\text{m/s}^2$.`,
          ),
          step(
            "approach",
            "Cadena: **oscilaciones (período → longitud)** → **energía (caída de altura $L$ → rapidez máxima)**. El período de pequeñas oscilaciones da $L$; la energía de la caída desde la horizontal da $v_{\\max}$.",
            "Chain: **oscillations (period → length)** → **energy (drop of height $L$ → maximum speed)**. The small-oscillation period gives $L$; the energy of the fall from horizontal gives $v_{\\max}$.",
          ),
          step(
            "calculation",
            `**Longitud:** $L = \\frac{gT^2}{4\\pi^2} = \\frac{9{,}8 \\cdot ${tok(T)}^2}{39{,}48} = ${tok(len)}\\ \\text{m}$<br>**Energía (horizontal → punto más bajo):** $mgL = \\frac{1}{2}mv_{\\max}^2$<br>$v_{\\max} = \\sqrt{2gL} = \\sqrt{2 \\cdot 9{,}8 \\cdot ${tok(len)}} \\approx ${tok(v)}\\ \\text{m/s}$`,
            `**Length:** $L = \\frac{gT^2}{4\\pi^2} = \\frac{9.8 \\cdot ${tok(T)}^2}{39.48} = ${tok(len)}\\ \\text{m}$<br>**Energy (horizontal → lowest point):** $mgL = \\frac{1}{2}mv_{\\max}^2$<br>$v_{\\max} = \\sqrt{2gL} = \\sqrt{2 \\cdot 9.8 \\cdot ${tok(len)}} \\approx ${tok(v)}\\ \\text{m/s}$`,
          ),
          step(
            "result",
            `La esfera pasa por el punto más bajo con $\\approx ${tok(v)}\\ \\text{m/s}$: el período sirvió para \"medir\" la longitud del péndulo.`,
            `The bob passes the lowest point at $\\approx ${tok(v)}\\ \\text{m/s}$: the period served to \"measure\" the pendulum's length.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Electrostatics + kinematics: electron deflected between plates    */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pmx-elec-def-01",
      subject: "physics",
      topicId: "physics-mixed",
      subtopicId: "exam-style",
      difficulty: "challenge",
      questionType: "numeric-unit",
      estimatedTimeSec: 480,
      tags: ["electrostatics", "kinematics", "deflection", "energy"],
      prerequisites: ["electrostatics", "kinematics"],
      reasoning: "multi-concept",
    },
    (rng) => {
      const pick = rng.pick([
        { Vacc: 1000, Vp: 100, L: 0.05, d: 0.02 },
        { Vacc: 500, Vp: 60, L: 0.04, d: 0.01 },
        // (a previous tuple L = 0.06 gave y = 2.25 mm — exactly on the 2-s.f.
        //  rounding boundary between 0.0022 and 0.0023; L = 0.05 keeps the
        //  answer 0.0016 unambiguous)
        { Vacc: 2000, Vp: 100, L: 0.05, d: 0.02 },
        { Vacc: 1000, Vp: 80, L: 0.05, d: 0.01 },
        { Vacc: 2000, Vp: 60, L: 0.04, d: 0.02 },
        { Vacc: 500, Vp: 40, L: 0.05, d: 0.02 },
      ]);
      const eC = 1.6e-19;
      const mE = 9.11e-31;
      const v = Math.sqrt((2 * eC * pick.Vacc) / mE);
      const a = (eC * pick.Vp) / (mE * pick.d);
      const t = pick.L / v;
      const y = 0.5 * a * t * t;
      const yAns = sig2(y);
      return {
        skill: L(
          "Electrón acelerado y desviado por placas (campos + cinemática)",
          "Electron accelerated and deflected by plates (fields + kinematics)",
        ),
        statement: L(
          `Un electrón parte del reposo y es acelerado por una diferencia de potencial $\\Delta V = ${pick.Vacc}\\ \\text{V}$. A continuación entra **horizontalmente** en la región entre dos placas paralelas de longitud $L = ${tok(pick.L)}\\ \\text{m}$, separadas $d = ${tok(pick.d)}\\ \\text{m}$, entre las que hay una diferencia de potencial $V_p = ${pick.Vp}\\ \\text{V}$. ¿Cuánto se desvía **verticalmente** (magnitud) al salir de las placas? (en m, 2 cifras significativas; $m_e = 9{,}11\\times10^{-31}\\ \\text{kg}$, $e = 1{,}6\\times10^{-19}\\ \\text{C}$; desprecia los efectos de borde)`,
          `An electron starts from rest and is accelerated through a potential difference $\\Delta V = ${pick.Vacc}\\ \\text{V}$. It then enters **horizontally** the region between two parallel plates of length $L = ${tok(pick.L)}\\ \\text{m}$, separated by $d = ${tok(pick.d)}\\ \\text{m}$, with a potential difference $V_p = ${pick.Vp}\\ \\text{V}$ between them. How far is it **vertically** deflected (magnitude) as it leaves the plates? (in m, 2 significant figures; $m_e = 9.11\\times10^{-31}\\ \\text{kg}$, $e = 1.6\\times10^{-19}\\ \\text{C}$; neglect edge effects)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: yAns,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m"],
          unitChoices: ["m", "cm", "mm", "m/s"],
        },
        hints: [
          L(
            "Primero la rapidez de entrada: la energía $e\\Delta V$ se convierte en cinética, $\\frac{1}{2}m_ev^2 = e\\Delta V$.",
            "First the entry speed: the energy $e\\Delta V$ becomes kinetic, $\\frac{1}{2}m_ev^2 = e\\Delta V$.",
          ),
          L(
            "Dentro de las placas el campo es $E = V_p/d$ y la fuerza $F = eE$ da una aceleración vertical $a = \\frac{eV_p}{m_e d}$, mientras el movimiento horizontal es uniforme.",
            "Inside the plates the field is $E = V_p/d$ and the force $F = eE$ gives a vertical acceleration $a = \\frac{eV_p}{m_e d}$, while the horizontal motion stays uniform.",
          ),
          L(
            "Tiempo de tránsito $t = L/v$; la desviación es $y = \\frac{1}{2}at^2$ (movimiento parabólico).",
            "Transit time $t = L/v$; the deflection is $y = \\frac{1}{2}at^2$ (parabolic motion).",
          ),
        ],
        answerDisplay: L(`$y \\approx ${tok(yAns)}\\ \\text{m}$`, `$y \\approx ${tok(yAns)}\\ \\text{m}$`),
        solution: [
          step(
            "given",
            `$\\Delta V = ${pick.Vacc}\\ \\text{V}$ (aceleración), placas: $L = ${tok(pick.L)}\\ \\text{m}$, $d = ${tok(pick.d)}\\ \\text{m}$, $V_p = ${pick.Vp}\\ \\text{V}$; $m_e = 9{,}11\\times10^{-31}\\ \\text{kg}$, $e = 1{,}6\\times10^{-19}\\ \\text{C}$.`,
            `$\\Delta V = ${pick.Vacc}\\ \\text{V}$ (acceleration), plates: $L = ${tok(pick.L)}\\ \\text{m}$, $d = ${tok(pick.d)}\\ \\text{m}$, $V_p = ${pick.Vp}\\ \\text{V}$; $m_e = 9.11\\times10^{-31}\\ \\text{kg}$, $e = 1.6\\times10^{-19}\\ \\text{C}$.`,
          ),
          step(
            "approach",
            "Cadena: **energía (aceleración) → campo eléctrico → cinemática 2D (desviación)**. La etapa aceleradora da $v$; dentro de las placas hay aceleración vertical constante y velocidad horizontal constante: trayectoria parabólica.",
            "Chain: **energy (acceleration) → electric field → 2D kinematics (deflection)**. The accelerating stage gives $v$; inside the plates there is constant vertical acceleration and constant horizontal velocity: a parabolic path.",
          ),
          step(
            "calculation",
            `**Aceleración:** $v = \\sqrt{\\frac{2e\\Delta V}{m_e}} = ${tok((v / 1e7).toFixed(2))}\\times10^{7}\\ \\text{m/s}$<br>**Campo y fuerza:** $E = \\frac{V_p}{d} = \\frac{${pick.Vp}}{${tok(pick.d)}} = ${tok((pick.Vp / pick.d).toFixed(0))}\\ \\text{V/m}$; $a = \\frac{eE}{m_e} = ${tok((a / 1e14).toFixed(2))}\\times10^{14}\\ \\text{m/s}^2$<br>**Tránsito y desviación:** $t = \\frac{L}{v} = ${tok((t * 1e9).toFixed(2))}\\times10^{-9}\\ \\text{s}$<br>$y = \\frac{1}{2}at^2 = \\frac{1}{2} \\cdot ${tok((a / 1e14).toFixed(2))}\\times10^{14} \\cdot (${tok((t * 1e9).toFixed(2))}\\times10^{-9})^2 \\approx ${tok(yAns)}\\ \\text{m}$`,
            `**Acceleration:** $v = \\sqrt{\\frac{2e\\Delta V}{m_e}} = ${tok((v / 1e7).toFixed(2))}\\times10^{7}\\ \\text{m/s}$<br>**Field and force:** $E = \\frac{V_p}{d} = \\frac{${pick.Vp}}{${tok(pick.d)}} = ${tok((pick.Vp / pick.d).toFixed(0))}\\ \\text{V/m}$; $a = \\frac{eE}{m_e} = ${tok((a / 1e14).toFixed(2))}\\times10^{14}\\ \\text{m/s}^2$<br>**Transit and deflection:** $t = \\frac{L}{v} = ${tok((t * 1e9).toFixed(2))}\\times10^{-9}\\ \\text{s}$<br>$y = \\frac{1}{2}at^2 = \\frac{1}{2} \\cdot ${tok((a / 1e14).toFixed(2))}\\times10^{14} \\cdot (${tok((t * 1e9).toFixed(2))}\\times10^{-9})^2 \\approx ${tok(yAns)}\\ \\text{m}$`,
          ),
          step(
            "result",
            `El electrón sale desviado $\\approx ${tok(yAns)}\\ \\text{m}$ (hacia la placa positiva), menos que la separación $d = ${tok(pick.d)}\\ \\text{m}$, así que no choca contra las placas.`,
            `The electron leaves deflected by $\\approx ${tok(yAns)}\\ \\text{m}$ (toward the positive plate), less than the gap $d = ${tok(pick.d)}\\ \\text{m}$, so it does not hit the plates.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Buoyancy + oscillations: floating cylinder pushed down            */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pmx-buoy-shm-01",
      subject: "physics",
      topicId: "physics-mixed",
      subtopicId: "mixed-concepts",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 360,
      tags: ["buoyancy", "fluids", "shm", "oscillations"],
      prerequisites: ["fluids", "oscillations-waves"],
      reasoning: "modeling",
    },
    (rng) => {
      const pick = rng.pick([
        { m: 2, A: 0.01 },
        { m: 5, A: 0.02 },
        { m: 8, A: 0.01 },
        { m: 12, A: 0.02 },
        { m: 20, A: 0.05 },
        { m: 4, A: 0.01 },
        { m: 10, A: 0.02 },
        { m: 1, A: 0.005 },
      ]);
      const RHO = 1000; // kg/m³
      const kEff = RHO * G_ACC * pick.A;
      const T = sig2(2 * Math.PI * Math.sqrt(pick.m / kEff));
      const depth = r2(pick.m / (RHO * pick.A));
      return {
        skill: L(
          "Cilindro flotante empujado: período de oscilación (flotación + MAS)",
          "Pushed-down floating cylinder: oscillation period (buoyancy + SHM)",
        ),
        statement: L(
          `Un cilindro de masa $m = ${pick.m}\\ \\text{kg}$ y sección transversal $A = ${tok(pick.A)}\\ \\text{m}^2$ flota **en equilibrio** en agua de densidad $\\rho = 1000\\ \\text{kg/m}^3$. Se lo hunde un poco más y se lo suelta; oscila verticalmente sin rozamiento con el agua. ¿Cuál es el **período** de la oscilación? (en s, 2 cifras significativas; $g = 9{,}8\\ \\text{m/s}^2$)`,
          `A cylinder of mass $m = ${pick.m}\\ \\text{kg}$ and cross-section $A = ${tok(pick.A)}\\ \\text{m}^2$ floats **in equilibrium** in water of density $\\rho = 1000\\ \\text{kg/m}^3$. It is pushed slightly deeper and released; it oscillates vertically without drag. What is the oscillation **period**? (in s, 2 significant figures; $g = 9.8\\ \\text{m/s}^2$)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: T,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["s"],
          unitChoices: ["s", "Hz", "min", "m"],
        },
        hints: [
          L(
            "Si se hunde una distancia $x$ extra, el volumen sumergido aumenta en $Ax$ y aparece una fuerza de flotación adicional.",
            "If it is pushed a distance $x$ deeper, the submerged volume grows by $Ax$ and an extra buoyant force appears.",
          ),
          L(
            "Esa fuerza extra es $\\rho g A\\,x$, hacia arriba: una fuerza restauradora $F = -k_{\\text{ef}}x$ con $k_{\\text{ef}} = \\rho g A$.",
            "That extra force is $\\rho g A\\,x$, upward: a restoring force $F = -k_{\\text{eff}}x$ with $k_{\\text{eff}} = \\rho g A$.",
          ),
          L(
            "Con la masa $m$ y esa \"constante elástica\" equivalente, el período es $T = 2\\pi\\sqrt{\\frac{m}{\\rho g A}}$.",
            "With the mass $m$ and that equivalent \"spring constant\", the period is $T = 2\\pi\\sqrt{\\frac{m}{\\rho g A}}$.",
          ),
        ],
        answerDisplay: L(`$T \\approx ${tok(T)}\\ \\text{s}$`, `$T \\approx ${tok(T)}\\ \\text{s}$`),
        solution: [
          step(
            "given",
            `$m = ${pick.m}\\ \\text{kg}$, $A = ${tok(pick.A)}\\ \\text{m}^2$, $\\rho = 1000\\ \\text{kg/m}^3$, $g = 9{,}8\\ \\text{m/s}^2$; en equilibrio flota con $${tok(depth)}\\ \\text{m}$ sumergidos.`,
            `$m = ${pick.m}\\ \\text{kg}$, $A = ${tok(pick.A)}\\ \\text{m}^2$, $\\rho = 1000\\ \\text{kg/m}^3$, $g = 9.8\\ \\text{m/s}^2$; in equilibrium it floats with $${tok(depth)}\\ \\text{m}$ submerged.`,
          ),
          step(
            "approach",
            "Cadena: **flotación (modelar la fuerza extra) → MAS**. Al hundirlo $x$, la flotación adicional $\\rho gAx$ actúa como un muelle de constante $k_{\\text{ef}} = \\rho gA$; el cilindro es un oscilador armónico de período $2\\pi\\sqrt{m/k_{\\text{ef}}}$.",
            "Chain: **buoyancy (model the extra force) → SHM**. Pushed down by $x$, the additional buoyancy $\\rho gAx$ acts like a spring of constant $k_{\\text{eff}} = \\rho gA$; the cylinder is a harmonic oscillator with period $2\\pi\\sqrt{m/k_{\\text{eff}}}$.",
          ),
          step(
            "calculation",
            `**Constante equivalente:** $k_{\\text{ef}} = \\rho g A = 1000 \\cdot 9{,}8 \\cdot ${tok(pick.A)} = ${tok(r1(kEff))}\\ \\text{N/m}$<br>**Período:** $T = 2\\pi\\sqrt{\\frac{m}{k_{\\text{ef}}}} = 2\\pi\\sqrt{\\frac{${pick.m}}{${tok(r1(kEff))}}} \\approx ${tok(T)}\\ \\text{s}$`,
            `**Equivalent constant:** $k_{\\text{eff}} = \\rho g A = 1000 \\cdot 9.8 \\cdot ${tok(pick.A)} = ${tok(r1(kEff))}\\ \\text{N/m}$<br>**Period:** $T = 2\\pi\\sqrt{\\frac{m}{k_{\\text{ef}}}} = 2\\pi\\sqrt{\\frac{${pick.m}}{${tok(r1(kEff))}}} \\approx ${tok(T)}\\ \\text{s}$`,
          ),
          step(
            "result",
            `El cilindro oscila con período $\\approx ${tok(T)}\\ \\text{s}$: el agua \"juega el papel\" de un muelle de constante $\\rho gA$.`,
            `The cylinder oscillates with period $\\approx ${tok(T)}\\ \\text{s}$: the water \"plays the role\" of a spring of constant $\\rho gA$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Photoelectric effect + energy conservation: stopping potential    */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "pmx-photo-01",
      subject: "physics",
      topicId: "physics-mixed",
      subtopicId: "exam-style",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 300,
      tags: ["photoelectric", "modern-physics", "energy-conservation"],
      prerequisites: ["modern-physics", "work-energy"],
      reasoning: "multi-concept",
    },
    (rng) => {
      const pick = rng.pick([
        { lam: 400, phi: 2.1 },
        { lam: 400, phi: 1.6 },
        { lam: 400, phi: 2.6 },
        { lam: 310, phi: 3.0 },
        { lam: 310, phi: 2.5 },
        { lam: 310, phi: 2.0 },
        { lam: 248, phi: 4.0 },
        { lam: 248, phi: 3.5 },
        { lam: 248, phi: 3.0 },
        { lam: 248, phi: 2.0 },
        { lam: 200, phi: 4.2 },
        { lam: 200, phi: 5.2 },
        { lam: 200, phi: 3.2 },
        { lam: 155, phi: 7.0 },
        { lam: 155, phi: 6.5 },
        { lam: 155, phi: 5.5 },
      ]);
      const E = 1240 / pick.lam; // eV
      const Kmax = E - pick.phi; // eV
      const Vs = r2(Kmax);
      return {
        skill: L(
          "Efecto fotoeléctrico: potencial de frenado (modernos + energía)",
          "Photoelectric effect: stopping potential (modern + energy)",
        ),
        statement: L(
          `Se ilumina un metal cuya función de trabajo es $\\phi = ${tok(pick.phi.toFixed(1))}\\ \\text{eV}$ con luz de longitud de onda $\\lambda = ${pick.lam}\\ \\text{nm}$. ¿Cuál es el **potencial de frenado** de los fotoelectrones emitidos? (en voltios, 2 cifras significativas; dato útil: $hc = 1240\\ \\text{eV·nm}$)`,
          `A metal with work function $\\phi = ${tok(pick.phi.toFixed(1))}\\ \\text{eV}$ is lit with light of wavelength $\\lambda = ${pick.lam}\\ \\text{nm}$. What is the **stopping potential** of the emitted photoelectrons? (in volts, 2 significant figures; useful data: $hc = 1240\\ \\text{eV·nm}$)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: Vs,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["V", "volt", "volts", "voltios"],
          unitChoices: ["V", "eV", "J", "W"],
        },
        hints: [
          L(
            "Primero la energía de cada fotón: $E = \\frac{hc}{\\lambda}$ (con $hc$ en eV·nm sale directamente en eV).",
            "First the energy of each photon: $E = \\frac{hc}{\\lambda}$ (with $hc$ in eV·nm it comes out directly in eV).",
          ),
          L(
            "Conservación de la energía en la emisión: $K_{\\max} = E - \\phi$ (lo que sobra de la energía del fotón tras \"pagar\" la salida).",
            "Energy conservation in the emission: $K_{\\max} = E - \\phi$ (what is left of the photon energy after \"paying\" the exit).",
          ),
          L(
            "El potencial de frenado es el que anula esa energía cinética: $eV_s = K_{\\max}$; como $K_{\\max}$ está en eV, $V_s$ es ese mismo número en voltios.",
            "The stopping potential is the one that cancels that kinetic energy: $eV_s = K_{\\max}$; since $K_{\\max}$ is in eV, $V_s$ is that same number in volts.",
          ),
        ],
        answerDisplay: L(`$V_s \\approx ${tok(Vs)}\\ \\text{V}$`, `$V_s \\approx ${tok(Vs)}\\ \\text{V}$`),
        solution: [
          step(
            "given",
            `$\\lambda = ${pick.lam}\\ \\text{nm}$, $\\phi = ${tok(pick.phi.toFixed(1))}\\ \\text{eV}$, $hc = 1240\\ \\text{eV·nm}$.`,
            `$\\lambda = ${pick.lam}\\ \\text{nm}$, $\\phi = ${tok(pick.phi.toFixed(1))}\\ \\text{eV}$, $hc = 1240\\ \\text{eV·nm}$.`,
          ),
          step(
            "approach",
            "Cadena: **cuanto de luz (energía del fotón) → conservación de la energía (efecto fotoeléctrico) → potencial de frenado**. Cada fotón entrega su energía a un electrón; parte se usa para salir y el resto es energía cinética máxima.",
            "Chain: **light quantum (photon energy) → energy conservation (photoelectric effect) → stopping potential**. Each photon hands its energy to one electron; part pays the exit and the rest is maximum kinetic energy.",
          ),
          step(
            "calculation",
            `**Fotón:** $E = \\frac{hc}{\\lambda} = \\frac{1240}{${pick.lam}} = ${tok(E.toFixed(1))}\\ \\text{eV}$<br>**Energía cinética máxima:** $K_{\\max} = E - \\phi = ${tok(E.toFixed(1))} - ${tok(pick.phi.toFixed(1))} = ${tok(Vs)}\\ \\text{eV}$<br>**Frenado:** $eV_s = K_{\\max} \\Rightarrow V_s = ${tok(Vs)}\\ \\text{V}$`,
            `**Photon:** $E = \\frac{hc}{\\lambda} = \\frac{1240}{${pick.lam}} = ${tok(E.toFixed(1))}\\ \\text{eV}$<br>**Maximum kinetic energy:** $K_{\\max} = E - \\phi = ${tok(E.toFixed(1))} - ${tok(pick.phi.toFixed(1))} = ${tok(Vs)}\\ \\text{eV}$<br>**Stopping:** $eV_s = K_{\\max} \\Rightarrow V_s = ${tok(Vs)}\\ \\text{V}$`,
          ),
          step(
            "result",
            `El potencial de frenado es $\\approx ${tok(Vs)}\\ \\text{V}$: con ese voltaje en contra, ni siquiera los electrones más rápidos llegan al ánodo.`,
            `The stopping potential is $\\approx ${tok(Vs)}\\ \\text{V}$: with that reverse voltage, not even the fastest electrons reach the anode.`,
          ),
        ],
      };
    },
  ),
];

