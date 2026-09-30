/**
 * PHYSICS · Momentum
 *
 * Linear momentum, impulse (with force–time graphs), conservation,
 * collisions and explosions. Three problems use function-graph diagrams
 * (force vs time); answers use sigfig-2 tolerance with SI units.
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
  /* p = mv                                                           */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "mom-p-01",
      subject: "physics",
      topicId: "momentum",
      subtopicId: "linear-momentum",
      difficulty: "easy",
      questionType: "numeric-unit",
      estimatedTimeSec: 90,
      tags: ["momentum", "linear-momentum"],
      prerequisites: [],
    },
    (rng) => {
      const m = rng.pick([2, 4, 5, 8, 10, 15, 20, 25]);
      const v = rng.pick([2, 3, 4, 5, 6, 8, 10]);
      const p = m * v;
      return {
        skill: L("Cantidad de movimiento", "Linear momentum"),
        statement: L(
          `Una bola de bolos de $${m}\\ \\text{kg}$ rueda con una rapidez de $${v}\\ \\text{m/s}$. ¿Cuál es su **cantidad de movimiento**? (2 cifras significativas).`,
          `A $${m}\\ \\text{kg}$ bowling ball rolls with a speed of $${v}\\ \\text{m/s}$. What is its **momentum**? (2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: sig2(p),
          tolerance: { mode: "sigfig", value: 2 },
          units: ["kg·m/s", "kg*m/s", "N·s", "N*s"],
          unitChoices: ["kg·m/s", "kg*m/s", "kg/m/s", "kg·m^2/s", "N·s"],
        },
        hints: [
          L(
            "La cantidad de movimiento combina masa y velocidad: es un vector en la dirección del movimiento.",
            "Momentum combines mass and velocity: it is a vector along the motion.",
          ),
          L(
            "Se define como $p = m\\,v$.",
            "It is defined as $p = m\\,v$.",
          ),
          L(
            "Multiplica la masa por la rapidez; las unidades son kg·m/s.",
            "Multiply mass by speed; the units are kg·m/s.",
          ),
        ],
        answerDisplay: L(
          `$p = ${tok(sig2(p))}\\ \\text{kg·m/s}$`,
          `$p = ${tok(sig2(p))}\\ \\text{kg·m/s}$`,
        ),
        solution: [
          step(
            "given",
            `$m = ${m}\\ \\text{kg}$, $v = ${v}\\ \\text{m/s}$.`,
            `$m = ${m}\\ \\text{kg}$, $v = ${v}\\ \\text{m/s}$.`,
          ),
          step(
            "approach",
            "Cantidad de movimiento: $p = m\\,v$ (vector en la dirección de $v$).",
            "Momentum: $p = m\\,v$ (a vector along $v$).",
          ),
          step(
            "calculation",
            `$p = ${m}\\ \\text{kg} \\cdot ${v}\\ \\text{m/s} = ${p}\\ \\text{kg·m/s}$`,
            `$p = ${m}\\ \\text{kg} \\cdot ${v}\\ \\text{m/s} = ${p}\\ \\text{kg·m/s}$`,
          ),
          step(
            "result",
            `Su cantidad de movimiento es $${tok(sig2(p))}\\ \\text{kg·m/s}$.`,
            `Its momentum is $${tok(sig2(p))}\\ \\text{kg·m/s}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* v = p/m                                                          */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "mom-p-02",
      subject: "physics",
      topicId: "momentum",
      subtopicId: "linear-momentum",
      difficulty: "easy",
      questionType: "numeric-unit",
      estimatedTimeSec: 90,
      tags: ["momentum", "rearrangement"],
      prerequisites: ["linear-momentum"],
    },
    (rng) => {
      const m = rng.pick([2, 4, 5, 8, 10]);
      const v = rng.pick([3, 4, 6, 8]);
      const p = m * v;
      return {
        skill: L("Velocidad a partir del momento", "Velocity from momentum"),
        statement: L(
          `Un ciclista con su bici tiene una cantidad de movimiento de $${p}\\ \\text{kg·m/s}$ y una masa total de $${m}\\ \\text{kg}$. ¿Con qué **rapidez** circula? (2 cifras significativas).`,
          `A cyclist with their bike has a momentum of $${p}\\ \\text{kg·m/s}$ and a total mass of $${m}\\ \\text{kg}$. At what **speed** are they riding? (2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: sig2(v),
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m/s"],
          unitChoices: ["m/s", "km/h", "m/s^2", "kg·m/s"],
        },
        hints: [
          L(
            "Datos: $p$ y $m$; incógnita: $v$.",
            "Data: $p$ and $m$; unknown: $v$.",
          ),
          L(
            "Parte de la definición $p = m\\,v$ y despeja la velocidad.",
            "Start from the definition $p = m\\,v$ and solve for the velocity.",
          ),
          L(
            "Divide la cantidad de movimiento entre la masa.",
            "Divide the momentum by the mass.",
          ),
        ],
        answerDisplay: L(`$v = ${tok(sig2(v))}\\ \\text{m/s}$`, `$v = ${tok(sig2(v))}\\ \\text{m/s}$`),
        solution: [
          step(
            "given",
            `$p = ${p}\\ \\text{kg·m/s}$, $m = ${m}\\ \\text{kg}$.`,
            `$p = ${p}\\ \\text{kg·m/s}$, $m = ${m}\\ \\text{kg}$.`,
          ),
          step(
            "approach",
            "De la definición $p = m\\,v$ despejamos $v = p/m$.",
            "From the definition $p = m\\,v$ we solve $v = p/m$.",
          ),
          step(
            "calculation",
            `$v = \\frac{${p}\\ \\text{kg·m/s}}{${m}\\ \\text{kg}} = ${tok(sig2(v))}\\ \\text{m/s}$`,
            `$v = \\frac{${p}\\ \\text{kg·m/s}}{${m}\\ \\text{kg}} = ${tok(sig2(v))}\\ \\text{m/s}$`,
          ),
          step(
            "result",
            `El ciclista circula a $${tok(sig2(v))}\\ \\text{m/s}$.`,
            `The cyclist rides at $${tok(sig2(v))}\\ \\text{m/s}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Concepts (MC bank)                                                */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "mom-concept-01",
      subject: "physics",
      topicId: "momentum",
      subtopicId: "conservation",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 90,
      tags: ["momentum", "concept", "conservation"],
      prerequisites: ["linear-momentum"],
    },
    (rng) => {
      const questions = [
        {
          es: "¿Qué magnitud se conserva **siempre** en un choque perfectamente inelástico entre dos cuerpos?",
          en: "Which quantity is **always** conserved in a perfectly inelastic collision between two bodies?",
          okEs: "La cantidad de movimiento total del sistema",
          okEn: "The total momentum of the system",
          bad: [
            { es: "La energía cinética total", en: "The total kinetic energy" },
            {
              es: "Ambas: la cantidad de movimiento y la energía cinética",
              en: "Both: momentum and kinetic energy",
            },
            { es: "Ninguna de las dos", en: "Neither of them" },
          ],
        },
        {
          es: "¿Qué representa el **área bajo la curva** de una gráfica fuerza–tiempo?",
          en: "What does the **area under the curve** of a force–time graph represent?",
          okEs: "El impulso: la variación de la cantidad de movimiento",
          okEn: "The impulse: the change in momentum",
          bad: [
            { es: "El trabajo realizado por la fuerza", en: "The work done by the force" },
            { es: "La potencia media", en: "The average power" },
            { es: "La energía cinética final", en: "The final kinetic energy" },
          ],
        },
        {
          es: "Si la fuerza neta sobre un objeto es cero durante cierto tiempo, su cantidad de movimiento...",
          en: "If the net force on an object is zero for a while, its momentum...",
          okEs: "No cambia (se conserva)",
          okEn: "Does not change (it is conserved)",
          bad: [
            { es: "Aumenta siempre", en: "Always increases" },
            { es: "Disminuye siempre", en: "Always decreases" },
            { es: "Se hace cero", en: "Becomes zero" },
          ],
        },
      ];
      const pick = rng.pick(questions);
      const options: McOption[] = [
        { id: "a", text: L(pick.okEs, pick.okEn), correct: true },
        { id: "b", text: L(pick.bad[0].es, pick.bad[0].en), correct: false },
        { id: "c", text: L(pick.bad[1].es, pick.bad[1].en), correct: false },
        { id: "d", text: L(pick.bad[2].es, pick.bad[2].en), correct: false },
      ];
      return {
        skill: L("Conceptos de cantidad de movimiento", "Momentum concepts"),
        statement: L(pick.es, pick.en),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Piensa en qué magnitud se \"almacena\" en el sistema aunque cambie la forma de la energía.",
            "Think about which quantity is \"stored\" in the system even as energy changes form.",
          ),
          L(
            "El impulso (fuerza × tiempo) cambia la cantidad de movimiento; sin fuerza neta no hay cambio.",
            "Impulse (force × time) changes momentum; with no net force there is no change.",
          ),
          L(
            "En choques inelásticos parte de la energía cinética se pierde (deformación, calor), pero hay una magnitud vectorial que no.",
            "In inelastic collisions some kinetic energy is lost (deformation, heat), but one vector quantity is not.",
          ),
        ],
        answerDisplay: L(pick.okEs, pick.okEn),
        solution: [
          step("given", pick.es, pick.en),
          step(
            "approach",
            "Distinguimos lo que se conserva siempre (cantidad de movimiento, sin fuerzas externas) de lo que depende del tipo de choque (energía cinética).",
            "Distinguish what is always conserved (momentum, absent external forces) from what depends on the collision type (kinetic energy).",
          ),
          step(
            "calculation",
            "Sin fuerzas externas, $\\Sigma p$ es constante; el impulso $F\\,\\Delta t$ mide el cambio de $p$; y el área bajo $F$–$t$ es exactamente ese impulso.",
            "With no external forces, $\\Sigma p$ is constant; the impulse $F\\,\\Delta t$ measures the change of $p$; and the area under $F$–$t$ is exactly that impulse.",
          ),
          step("result", pick.okEs + ".", pick.okEn + "."),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Impulse from a constant-force graph (diagram)                     */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "mom-impulse-01",
      subject: "physics",
      topicId: "momentum",
      subtopicId: "impulse",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 150,
      tags: ["impulse", "graphs", "area"],
      prerequisites: ["linear-momentum"],
    },
    (rng) => {
      const F = rng.pick([10, 15, 20, 25, 30, 40, 50]);
      const t = rng.pick([4, 5, 6, 8, 10]);
      const J = F * t;
      return {
        skill: L("Impulso desde una gráfica F–t", "Impulse from an F–t graph"),
        statement: L(
          "La gráfica muestra la fuerza neta sobre un objeto durante un impacto: es constante mientras dura. Calcula el **impulso total** (2 cifras significativas).",
          "The graph shows the net force on an object during an impact: it stays constant while it lasts. Compute the **total impulse** (2 significant figures).",
        ),
        diagram: {
          kind: "function-graph",
          xMin: 0,
          xMax: t,
          yMin: 0,
          yMax: Math.round(F * 1.3) + 5,
          curves: [{ fn: `${F}`, color: "primary" }],
          points: [{ x: t, y: F, label: `(${t}, ${F})` }],
          xLabel: "t (s)",
          yLabel: "F (N)",
          showGrid: true,
        },
        diagramLabel: L(
          `Gráfica fuerza-tiempo: una línea horizontal a ${F} newtons durante ${t} segundos.`,
          `Force-time graph: a horizontal line at ${F} newtons lasting ${t} seconds.`,
        ),
        answer: {
          kind: "numeric-unit",
          value: sig2(J),
          tolerance: { mode: "sigfig", value: 2 },
          units: ["N·s", "N*s", "kg·m/s", "kg*m/s"],
          unitChoices: ["N·s", "N*s", "N", "J", "kg·m/s"],
        },
        hints: [
          L(
            "Lee de la gráfica la fuerza y el tiempo durante el que actúa.",
            "Read the force and the time it acts for from the graph.",
          ),
          L(
            "El impulso es el **área** bajo la curva fuerza–tiempo; aquí es un rectángulo.",
            "The impulse is the **area** under the force–time curve; here it is a rectangle.",
          ),
          L(
            "Área del rectángulo = base × altura = $F\\cdot t$.",
            "Area of the rectangle = base × height = $F\\cdot t$.",
          ),
        ],
        answerDisplay: L(
          `$J = ${tok(sig2(J))}\\ \\text{N·s}$`,
          `$J = ${tok(sig2(J))}\\ \\text{N·s}$`,
        ),
        solution: [
          step(
            "given",
            `De la gráfica: $F = ${F}\\ \\text{N}$ constante durante $t = ${t}\\ \\text{s}$.`,
            `From the graph: $F = ${F}\\ \\text{N}$ constant for $t = ${t}\\ \\text{s}$.`,
          ),
          step(
            "approach",
            "Impulso = área bajo la curva $F$–$t$; con fuerza constante es el área de un rectángulo.",
            "Impulse = area under the $F$–$t$ curve; with a constant force it is the area of a rectangle.",
          ),
          step(
            "calculation",
            `$J = F\\,t = ${F}\\ \\text{N} \\cdot ${t}\\ \\text{s} = ${J}\\ \\text{N·s}$`,
            `$J = F\\,t = ${F}\\ \\text{N} \\cdot ${t}\\ \\text{s} = ${J}\\ \\text{N·s}$`,
          ),
          step(
            "result",
            `El impulso total es $${tok(sig2(J))}\\ \\text{N·s}$: esa es también la variación de la cantidad de movimiento del objeto.`,
            `The total impulse is $${tok(sig2(J))}\\ \\text{N·s}$: this is also the object's change in momentum.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Impulse of a bouncing ball                                        */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "mom-impulse-03",
      subject: "physics",
      topicId: "momentum",
      subtopicId: "impulse",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 180,
      tags: ["impulse", "bounce", "sign"],
      prerequisites: ["impulse", "linear-momentum"],
    },
    (rng) => {
      const m = rng.pick([0.15, 0.2, 0.25, 0.3, 0.4, 0.5]);
      const v = rng.pick([10, 12, 15, 20, 25, 30]);
      const J = sig2(2 * m * v);
      return {
        skill: L("Impulso en un rebote", "Impulse in a bounce"),
        statement: L(
          `Una pelota de $${tok(m)}\\ \\text{kg}$ golpea una pared en horizontal con una rapidez de $${v}\\ \\text{m/s}$ y rebota con la misma rapidez. ¿Cuál es el **módulo del impulso** que la pared transfiere a la pelota? (2 cifras significativas).`,
          `A $${tok(m)}\\ \\text{kg}$ ball hits a wall horizontally with a speed of $${v}\\ \\text{m/s}$ and bounces back at the same speed. What is the **magnitude of the impulse** the wall transfers to the ball? (2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: J,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["N·s", "N*s", "kg·m/s", "kg*m/s"],
          unitChoices: ["N·s", "N*s", "N", "kg·m/s"],
        },
        hints: [
          L(
            "El impulso es la variación de la cantidad de movimiento: $J = \\Delta p = m v_f - m v_i$.",
            "Impulse is the change in momentum: $J = \\Delta p = m v_f - m v_i$.",
          ),
          L(
            "Toma un signo coherente: si \"hacia la pared\" es positivo, el rebote sale con velocidad negativa.",
            "Keep a consistent sign: if \"toward the wall\" is positive, the rebound has negative velocity.",
          ),
          L(
            "Las dos velocidades tienen el mismo módulo y signos opuestos: el cambio vale el doble.",
            "The two velocities have equal magnitude and opposite signs: the change is twice as big.",
          ),
        ],
        answerDisplay: L(`$|J| \\approx ${tok(J)}\\ \\text{N·s}$`, `$|J| \\approx ${tok(J)}\\ \\text{N·s}$`),
        solution: [
          step(
            "given",
            `$m = ${tok(m)}\\ \\text{kg}$, $v_i = +${v}\\ \\text{m/s}$ (hacia la pared), $v_f = -${v}\\ \\text{m/s}$ (rebote).`,
            `$m = ${tok(m)}\\ \\text{kg}$, $v_i = +${v}\\ \\text{m/s}$ (toward the wall), $v_f = -${v}\\ \\text{m/s}$ (rebound).`,
          ),
          step(
            "approach",
            "El impulso es la variación de la cantidad de movimiento: $J = m v_f - m v_i$, con signos.",
            "Impulse is the change in momentum: $J = m v_f - m v_i$, with signs.",
          ),
          step(
            "calculation",
            `$J = ${tok(m)} \\cdot (-${v}) - ${tok(m)} \\cdot (+${v}) = ${tok(r2(-m * v))} - ${tok(r2(m * v))} = ${tok(r2(-2 * m * v))}\\ \\text{N·s}$<br>$|J| = ${tok(J)}\\ \\text{N·s}$`,
            `$J = ${tok(m)} \\cdot (-${v}) - ${tok(m)} \\cdot (+${v}) = ${tok(r2(-m * v))} - ${tok(r2(m * v))} = ${tok(r2(-2 * m * v))}\\ \\text{N·s}$<br>$|J| = ${tok(J)}\\ \\text{N·s}$`,
          ),
          step(
            "result",
            `La pared transfiere un impulso de módulo $\\approx ${tok(J)}\\ \\text{N·s}$, el doble que si la pelota se quedara pegada.`,
            `The wall transfers an impulse of magnitude $\\approx ${tok(J)}\\ \\text{N·s}$, twice what it would be if the ball stuck.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Recoil of two skaters                                             */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "mom-cons-01",
      subject: "physics",
      topicId: "momentum",
      subtopicId: "conservation",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 180,
      tags: ["conservation", "recoil"],
      prerequisites: ["linear-momentum", "conservation"],
    },
    (rng) => {
      const m1 = rng.pick([45, 50, 55, 60, 65, 70]);
      const v1 = rng.pick([1.5, 2, 2.5, 3]);
      const m2 = rng.pick([50, 60, 70, 80]);
      const v2 = sig2((m1 * v1) / m2);
      return {
        skill: L("Retroceso y conservación del momento", "Recoil and momentum conservation"),
        statement: L(
          `Dos patinadores inicialmente en reposo y en contacto se empujan. El de $${m1}\\ \\text{kg}$ sale moviéndose a $${tok(v1)}\\ \\text{m/s}$. ¿Con qué **rapidez** se mueve el otro, de $${m2}\\ \\text{kg}$? (2 cifras significativas).`,
          `Two skaters, initially at rest and in contact, push off each other. The $${m1}\\ \\text{kg}$ one moves away at $${tok(v1)}\\ \\text{m/s}$. At what **speed** does the other, of $${m2}\\ \\text{kg}$, move? (2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: v2,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m/s"],
          unitChoices: ["m/s", "km/h", "m/s^2", "kg·m/s"],
        },
        hints: [
          L(
            "Antes del empujón, la cantidad de movimiento total del sistema es cero.",
            "Before the push, the total momentum of the system is zero.",
          ),
          L(
            "La conservación exige que siga siendo cero: $m_1 v_1 + m_2 v_2 = 0$ (con velocidades en sentidos opuestos).",
            "Conservation requires it to stay zero: $m_1 v_1 + m_2 v_2 = 0$ (velocities in opposite directions).",
          ),
          L(
            "Despeja $|v_2| = \\dfrac{m_1 v_1}{m_2}$.",
            "Solve $|v_2| = \\dfrac{m_1 v_1}{m_2}$.",
          ),
        ],
        answerDisplay: L(`$v_2 \\approx ${tok(v2)}\\ \\text{m/s}$`, `$v_2 \\approx ${tok(v2)}\\ \\text{m/s}$`),
        solution: [
          step(
            "given",
            `$p_{inicial} = 0$; $m_1 = ${m1}\\ \\text{kg}$, $v_1 = ${tok(v1)}\\ \\text{m/s}$; $m_2 = ${m2}\\ \\text{kg}$.`,
            `$p_{initial} = 0$; $m_1 = ${m1}\\ \\text{kg}$, $v_1 = ${tok(v1)}\\ \\text{m/s}$; $m_2 = ${m2}\\ \\text{kg}$.`,
          ),
          step(
            "approach",
            "Sin fuerzas externas horizontales, la cantidad de movimiento total se conserva: $0 = m_1 v_1 + m_2 v_2$.",
            "With no horizontal external forces, total momentum is conserved: $0 = m_1 v_1 + m_2 v_2$.",
          ),
          step(
            "calculation",
            `$|v_2| = \\dfrac{m_1 v_1}{m_2} = \\dfrac{${m1} \\cdot ${tok(v1)}}{${m2}} = ${tok(r2((m1 * v1) / m2))}\\ \\text{m/s} \\approx ${tok(v2)}\\ \\text{m/s}$`,
            `$|v_2| = \\dfrac{m_1 v_1}{m_2} = \\dfrac{${m1} \\cdot ${tok(v1)}}{${m2}} = ${tok(r2((m1 * v1) / m2))}\\ \\text{m/s} \\approx ${tok(v2)}\\ \\text{m/s}$`,
          ),
          step(
            "result",
            `El segundo patinador se aleja en sentido contrario a $\\approx ${tok(v2)}\\ \\text{m/s}$.`,
            `The second skater moves away in the opposite direction at $\\approx ${tok(v2)}\\ \\text{m/s}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* What the area under F–t means (MC, diagram)                       */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "mom-graph-01",
      subject: "physics",
      topicId: "momentum",
      subtopicId: "impulse",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["impulse", "graphs", "concept"],
      prerequisites: ["impulse"],
    },
    (rng) => {
      const F = rng.pick([20, 30, 40, 50]);
      const t = rng.pick([4, 5, 8, 10]);
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "El impulso: la variación de la cantidad de movimiento",
            "The impulse: the change in momentum",
          ),
          correct: true,
        },
        {
          id: "b",
          text: L("El trabajo realizado por la fuerza", "The work done by the force"),
          correct: false,
        },
        {
          id: "c",
          text: L("La potencia media de la fuerza", "The average power of the force"),
          correct: false,
        },
        {
          id: "d",
          text: L(
            "La energía cinética ganada por el objeto",
            "The kinetic energy gained by the object",
          ),
          correct: false,
        },
      ];
      return {
        skill: L("Área bajo una gráfica F–t", "Area under an F–t graph"),
        statement: L(
          "La gráfica muestra cómo crece la fuerza neta sobre un objeto desde cero hasta un valor máximo. ¿Qué representa físicamente el **área bajo la curva**?",
          "The graph shows the net force on an object growing from zero to a maximum. What does the **area under the curve** physically represent?",
        ),
        diagram: {
          kind: "function-graph",
          xMin: 0,
          xMax: t,
          yMin: 0,
          yMax: Math.round(F * 1.3) + 5,
          curves: [{ fn: `${F}*x/${t}`, color: "primary" }],
          points: [{ x: t, y: F, label: `(${t}, ${F})` }],
          xLabel: "t (s)",
          yLabel: "F (N)",
          showGrid: true,
        },
        diagramLabel: L(
          `Gráfica fuerza-tiempo: la fuerza crece linealmente desde 0 hasta ${F} newtons en ${t} segundos.`,
          `Force-time graph: the force ramps up linearly from 0 to ${F} newtons over ${t} seconds.`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Observa las unidades del área: (eje vertical) × (eje horizontal).",
            "Look at the units of the area: (vertical axis) × (horizontal axis).",
          ),
          L(
            "Aquí el área se mide en $\\text{N} \\cdot \\text{s}$.",
            "Here the area is measured in $\\text{N} \\cdot \\text{s}$.",
          ),
          L(
            "Un newton-segundo equivale a un kg·m/s: las unidades de la variación de la cantidad de movimiento.",
            "One newton-second equals one kg·m/s: the units of the change in momentum.",
          ),
        ],
        answerDisplay: L(
          "Es el **impulso**: la variación de la cantidad de movimiento",
          "It is the **impulse**: the change in momentum",
        ),
        solution: [
          step(
            "given",
            "Gráfica de fuerza $F(t)$ frente al tiempo $t$.",
            "A graph of force $F(t)$ versus time $t$.",
          ),
          step(
            "approach",
            "Analizamos las unidades del área: $[F]\\cdot[t]$.",
            "Analyse the units of the area: $[F]\\cdot[t]$.",
          ),
          step(
            "calculation",
            "$\\text{N}\\cdot\\text{s} = \\dfrac{\\text{kg}\\cdot\\text{m/s}^2}{1} \\cdot \\text{s} = \\text{kg}\\cdot\\text{m/s}$, exactamente las unidades de la cantidad de movimiento. Y de $J = F\\,t$ se sigue que el área $F$–$t$ es la variación $\\Delta p$.",
            "$\\text{N}\\cdot\\text{s} = \\dfrac{\\text{kg}\\cdot\\text{m/s}^2}{1} \\cdot \\text{s} = \\text{kg}\\cdot\\text{m/s}$, exactly the units of momentum. And from $J = F\\,t$ the $F$–$t$ area is the change $\\Delta p$.",
          ),
          step(
            "result",
            "El área bajo una gráfica fuerza–tiempo es el impulso: la variación de la cantidad de movimiento.",
            "The area under a force-time graph is the impulse: the change in momentum.",
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Impulse from a ramp of force (diagram), then Δv                   */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "mom-impulse-02",
      subject: "physics",
      topicId: "momentum",
      subtopicId: "impulse",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 240,
      tags: ["impulse", "graphs", "triangle-area", "momentum"],
      prerequisites: ["impulse", "linear-momentum"],
    },
    (rng) => {
      const F = rng.pick([20, 30, 40, 50, 60]);
      const t = rng.pick([4, 5, 8, 10]);
      const m = rng.pick([2, 4, 5, 8, 10]);
      const J = 0.5 * F * t;
      const dv = sig2(J / m);
      return {
        skill: L("Impulso de una fuerza creciente", "Impulse of a ramping force"),
        statement: L(
          `La gráfica muestra la fuerza neta sobre un objeto de $${m}\\ \\text{kg}$, inicialmente en reposo: crece linealmente desde 0 hasta el máximo y luego cesa. ¿Qué **variación de velocidad** produce? (2 cifras significativas).`,
          `The graph shows the net force on a $${m}\\ \\text{kg}$ object, initially at rest: it ramps up linearly from zero to its maximum and then stops. What **change in velocity** does it produce? (2 significant figures).`,
        ),
        diagram: {
          kind: "function-graph",
          xMin: 0,
          xMax: t,
          yMin: 0,
          yMax: Math.round(F * 1.3) + 5,
          curves: [{ fn: `${F}*x/${t}`, color: "primary" }],
          points: [{ x: t, y: F, label: `(${t}, ${F})` }],
          xLabel: "t (s)",
          yLabel: "F (N)",
          showGrid: true,
        },
        diagramLabel: L(
          `Gráfica fuerza-tiempo: la fuerza crece linealmente desde 0 hasta ${F} newtons en ${t} segundos.`,
          `Force-time graph: the force ramps linearly from 0 to ${F} newtons over ${t} seconds.`,
        ),
        answer: {
          kind: "numeric-unit",
          value: dv,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m/s"],
          unitChoices: ["m/s", "m/s^2", "N·s", "m"],
        },
        hints: [
          L(
            "Lee de la gráfica la fuerza máxima y el tiempo que dura el empujón.",
            "Read the maximum force and the duration of the push from the graph.",
          ),
          L(
            "El impulso es el área bajo la curva: un triángulo de área $\\frac{1}{2} F_{max}\\,t$.",
            "The impulse is the area under the curve: a triangle of area $\\frac{1}{2} F_{max}\\,t$.",
          ),
          L(
            "Ese impulso es la variación de la cantidad de movimiento: $J = m\\,\\Delta v$; despeja $\\Delta v$.",
            "That impulse is the change in momentum: $J = m\\,\\Delta v$; solve for $\\Delta v$.",
          ),
        ],
        answerDisplay: L(
          `$\\Delta v \\approx ${tok(dv)}\\ \\text{m/s}$`,
          `$\\Delta v \\approx ${tok(dv)}\\ \\text{m/s}$`,
        ),
        solution: [
          step(
            "given",
            `De la gráfica: $F_{max} = ${F}\\ \\text{N}$ alcanzada en $t = ${t}\\ \\text{s}$ (crecimiento lineal); masa $m = ${m}\\ \\text{kg}$.`,
            `From the graph: $F_{max} = ${F}\\ \\text{N}$ reached at $t = ${t}\\ \\text{s}$ (linear ramp); mass $m = ${m}\\ \\text{kg}$.`,
          ),
          step(
            "approach",
            "Primero el impulso (área del triángulo) y después $J = \\Delta p = m\\,\\Delta v$.",
            "First the impulse (triangle area), then $J = \\Delta p = m\\,\\Delta v$.",
          ),
          step(
            "calculation",
            `$J = \\tfrac{1}{2} F_{max}\\,t = \\tfrac{1}{2} \\cdot ${F} \\cdot ${t} = ${tok(r1(J))}\\ \\text{N·s}$<br>$\\Delta v = \\dfrac{J}{m} = \\dfrac{ ${tok(r1(J))}}{${m}} = ${tok(r2(J / m))}\\ \\text{m/s} \\approx ${tok(dv)}\\ \\text{m/s}$`,
            `$J = \\tfrac{1}{2} F_{max}\\,t = \\tfrac{1}{2} \\cdot ${F} \\cdot ${t} = ${tok(r1(J))}\\ \\text{N·s}$<br>$\\Delta v = \\dfrac{J}{m} = \\dfrac{ ${tok(r1(J))}}{${m}} = ${tok(r2(J / m))}\\ \\text{m/s} \\approx ${tok(dv)}\\ \\text{m/s}$`,
          ),
          step(
            "result",
            `El objeto pasa del reposo a $\\approx ${tok(dv)}\\ \\text{m/s}$ en la dirección de la fuerza.`,
            `The object goes from rest to $\\approx ${tok(dv)}\\ \\text{m/s}$ in the direction of the force.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Perfectly inelastic coupling                                      */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "mom-coll-01",
      subject: "physics",
      topicId: "momentum",
      subtopicId: "collisions",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 240,
      tags: ["collisions", "inelastic", "conservation"],
      prerequisites: ["conservation", "linear-momentum"],
    },
    (rng) => {
      const combos = [
        { m1: 4, v1: 8, m2: 6, v2: 4 },
        { m1: 10, v1: 6, m2: 5, v2: 2 },
        { m1: 3, v1: 10, m2: 3, v2: 4 },
        { m1: 6, v1: 12, m2: 4, v2: 5 },
        { m1: 8, v1: 5, m2: 2, v2: 2 },
        { m1: 2, v1: 6, m2: 4, v2: 3 },
      ];
      const pick = rng.pick(combos);
      const pTotal = pick.m1 * pick.v1 + pick.m2 * pick.v2;
      const vf = sig2(pTotal / (pick.m1 + pick.m2));
      return {
        skill: L("Choque perfectamente inelástico", "Perfectly inelastic collision"),
        statement: L(
          `Un vagón de $${pick.m1}\\ \\text{kg}$ se mueve a $${pick.v1}\\ \\text{m/s}$ por la vía y alcanza a otro vagón de $${pick.m2}\\ \\text{kg}$ que iba a $${pick.v2}\\ \\text{m/s}$ en el **mismo sentido**. Los vagones se enganchan y siguen juntos. ¿Con qué velocidad se mueven tras el enganche? (2 cifras significativas).`,
          `A $${pick.m1}\\ \\text{kg}$ wagon moving at $${pick.v1}\\ \\text{m/s}$ catches up with another wagon of $${pick.m2}\\ \\text{kg}$ travelling at $${pick.v2}\\ \\text{m/s}$ in the **same direction**. The wagons couple and move on together. At what velocity do they move after coupling? (2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: vf,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m/s"],
          unitChoices: ["m/s", "km/h", "m/s^2", "kg·m/s"],
        },
        hints: [
          L(
            "En el choque inelástico solo se conserva la cantidad de movimiento, no la energía cinética.",
            "In an inelastic collision only momentum is conserved, not kinetic energy.",
          ),
          L(
            "Escribe la conservación: $m_1 v_1 + m_2 v_2 = (m_1 + m_2)\\,v'$, porque quedan pegados.",
            "Write conservation as $m_1 v_1 + m_2 v_2 = (m_1 + m_2)\\,v'$, since they stick together.",
          ),
          L(
            "Despeja $v' = \\dfrac{m_1 v_1 + m_2 v_2}{m_1 + m_2}$.",
            "Solve $v' = \\dfrac{m_1 v_1 + m_2 v_2}{m_1 + m_2}$.",
          ),
        ],
        answerDisplay: L(`$v' \\approx ${tok(vf)}\\ \\text{m/s}$`, `$v' \\approx ${tok(vf)}\\ \\text{m/s}$`),
        solution: [
          step(
            "given",
            `$m_1 = ${pick.m1}\\ \\text{kg}$, $v_1 = ${pick.v1}\\ \\text{m/s}$; $m_2 = ${pick.m2}\\ \\text{kg}$, $v_2 = ${pick.v2}\\ \\text{m/s}$ (mismo sentido); se enganchan.`,
            `$m_1 = ${pick.m1}\\ \\text{kg}$, $v_1 = ${pick.v1}\\ \\text{m/s}$; $m_2 = ${pick.m2}\\ \\text{kg}$, $v_2 = ${pick.v2}\\ \\text{m/s}$ (same direction); they couple.`,
          ),
          step(
            "approach",
            "Conservación de la cantidad de movimiento con masa final conjunta: $m_1 v_1 + m_2 v_2 = (m_1 + m_2) v'$.",
            "Momentum conservation with a combined final mass: $m_1 v_1 + m_2 v_2 = (m_1 + m_2) v'$.",
          ),
          step(
            "calculation",
            `$p_{total} = ${pick.m1} \\cdot ${pick.v1} + ${pick.m2} \\cdot ${pick.v2} = ${pick.m1 * pick.v1} + ${pick.m2 * pick.v2} = ${pTotal}\\ \\text{kg·m/s}$<br>$v' = \\dfrac{${pTotal}}{${pick.m1 + pick.m2}} = ${tok(r2(pTotal / (pick.m1 + pick.m2)))}\\ \\text{m/s} \\approx ${tok(vf)}\\ \\text{m/s}$`,
            `$p_{total} = ${pick.m1} \\cdot ${pick.v1} + ${pick.m2} \\cdot ${pick.v2} = ${pick.m1 * pick.v1} + ${pick.m2 * pick.v2} = ${pTotal}\\ \\text{kg·m/s}$<br>$v' = \\dfrac{${pTotal}}{${pick.m1 + pick.m2}} = ${tok(r2(pTotal / (pick.m1 + pick.m2)))}\\ \\text{m/s} \\approx ${tok(vf)}\\ \\text{m/s}$`,
          ),
          step(
            "result",
            `Los vagones acoplados se mueven a $\\approx ${tok(vf)}\\ \\text{m/s}$: la energía cinética ha disminuido, pero el momento total se mantiene.`,
            `The coupled wagons move at $\\approx ${tok(vf)}\\ \\text{m/s}$: kinetic energy has dropped, but total momentum is unchanged.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Head-on inelastic collision (signed)                              */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "mom-coll-02",
      subject: "physics",
      topicId: "momentum",
      subtopicId: "collisions",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 240,
      tags: ["collisions", "inelastic", "vectors", "sign"],
      prerequisites: ["collisions"],
    },
    (rng) => {
      const combos = [
        { m1: 4, v1: 6, m2: 3, v2: 2 },
        { m1: 2, v1: 8, m2: 4, v2: 5 },
        { m1: 5, v1: 4, m2: 2, v2: 6 },
        { m1: 3, v1: 5, m2: 5, v2: 2 },
        { m1: 6, v1: 5, m2: 3, v2: 8 },
      ];
      const pick = rng.pick(combos);
      const pNet = pick.m1 * pick.v1 - pick.m2 * pick.v2;
      const vf = sig2(pNet / (pick.m1 + pick.m2));
      return {
        skill: L("Choque de frente con signos", "Head-on collision with signs"),
        statement: L(
          `Dos carritos chocan de frente y quedan pegados. El carrito 1 ($${pick.m1}\\ \\text{kg}$) iba a $${pick.v1}\\ \\text{m/s}$ hacia la **derecha**; el carrito 2 ($${pick.m2}\\ \\text{kg}$) iba a $${pick.v2}\\ \\text{m/s}$ hacia la **izquierda**. ¿Con qué velocidad (con signo; positivo = derecha) se mueven tras el choque? (2 cifras significativas).`,
          `Two carts collide head-on and stick together. Cart 1 ($${pick.m1}\\ \\text{kg}$) was moving at $${pick.v1}\\ \\text{m/s}$ to the **right**; cart 2 ($${pick.m2}\\ \\text{kg}$) was moving at $${pick.v2}\\ \\text{m/s}$ to the **left**. With what velocity (signed; positive = right) do they move after the collision? (2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: vf,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m/s"],
          unitChoices: ["m/s", "km/h", "m/s^2", "kg·m/s"],
        },
        hints: [
          L(
            "Fija el signo positivo hacia la derecha y convierte ambas velocidades con su signo.",
            "Take rightward as positive and write both velocities with their signs.",
          ),
          L(
            "Conservación: $m_1 v_1 - m_2 v_2 = (m_1 + m_2)\\,v'$ con $v_2$ en valor absoluto.",
            "Conservation: $m_1 v_1 - m_2 v_2 = (m_1 + m_2)\\,v'$ with $v_2$ as a magnitude.",
          ),
          L(
            "El signo del resultado te dice hacia qué lado salen los carritos pegados.",
            "The sign of the result tells you which way the stuck-together carts move.",
          ),
        ],
        answerDisplay: L(
          `$v' \\approx ${tok(vf)}\\ \\text{m/s}$ ${vf >= 0 ? "(hacia la derecha)" : "(hacia la izquierda)"}`,
          `$v' \\approx ${tok(vf)}\\ \\text{m/s}$ ${vf >= 0 ? "(to the right)" : "(to the left)"}`,
        ),
        solution: [
          step(
            "given",
            `$m_1 = ${pick.m1}\\ \\text{kg}$, $v_1 = +${pick.v1}\\ \\text{m/s}$; $m_2 = ${pick.m2}\\ \\text{kg}$, $v_2 = -${pick.v2}\\ \\text{m/s}$; choque perfectamente inelástico.`,
            `$m_1 = ${pick.m1}\\ \\text{kg}$, $v_1 = +${pick.v1}\\ \\text{m/s}$; $m_2 = ${pick.m2}\\ \\text{kg}$, $v_2 = -${pick.v2}\\ \\text{m/s}$; perfectly inelastic collision.`,
          ),
          step(
            "approach",
            "Conservación de la cantidad de movimiento sobre el eje horizontal, con signos: $p_{total}$ antes = $p_{total}$ después.",
            "Momentum conservation along the horizontal axis, with signs: $p_{total}$ before = $p_{total}$ after.",
          ),
          step(
            "calculation",
            `$p_{antes} = ${pick.m1} \\cdot (+${pick.v1}) + ${pick.m2} \\cdot (-${pick.v2}) = ${pick.m1 * pick.v1} - ${pick.m2 * pick.v2} = ${pNet}\\ \\text{kg·m/s}$<br>$v' = \\dfrac{${pNet}}{${pick.m1 + pick.m2}} = ${tok(r2(pNet / (pick.m1 + pick.m2)))}\\ \\text{m/s} \\approx ${tok(vf)}\\ \\text{m/s}$`,
            `$p_{before} = ${pick.m1} \\cdot (+${pick.v1}) + ${pick.m2} \\cdot (-${pick.v2}) = ${pick.m1 * pick.v1} - ${pick.m2 * pick.v2} = ${pNet}\\ \\text{kg·m/s}$<br>$v' = \\dfrac{${pNet}}{${pick.m1 + pick.m2}} = ${tok(r2(pNet / (pick.m1 + pick.m2)))}\\ \\text{m/s} \\approx ${tok(vf)}\\ \\text{m/s}$`,
          ),
          step(
            "result",
            `Tras el choque se mueven juntos a $\\approx ${tok(vf)}\\ \\text{m/s}$ ${vf >= 0 ? "hacia la derecha" : "hacia la izquierda"}: gana el carrito con más cantidad de movimiento.`,
            `After the collision they move together at $\\approx ${tok(vf)}\\ \\text{m/s}$ ${vf >= 0 ? "to the right" : "to the left"}: the cart with more momentum wins.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Challenge: skater throws a ball (explosion-like recoil)           */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "mom-expl-01",
      subject: "physics",
      topicId: "momentum",
      subtopicId: "explosions",
      difficulty: "challenge",
      questionType: "numeric-unit",
      estimatedTimeSec: 300,
      tags: ["explosions", "recoil", "conservation", "systems"],
      prerequisites: ["conservation", "linear-momentum"],
    },
    (rng) => {
      const combos = [
        { M: 50, m: 3, v: 8 },
        { M: 60, m: 4, v: 6 },
        { M: 70, m: 5, v: 10 },
        { M: 80, m: 2, v: 12 },
        { M: 55, m: 3, v: 10 },
      ];
      const pick = rng.pick(combos);
      const vs = sig2((pick.m * pick.v) / (pick.M - pick.m));
      return {
        skill: L("Retroceso al lanzar un objeto", "Recoil when throwing an object"),
        statement: L(
          `Una patinadora de $${pick.M}\\ \\text{kg}$ (contando una pelota de $${pick.m}\\ \\text{kg}$ que lleva en las manos) está en reposo sobre hielo horizontal sin rozamiento. Lanza la pelota horizontalmente a $${pick.v}\\ \\text{m/s}$. ¿Con qué **rapidez** retrocede la patinadora? (2 cifras significativas).`,
          `A skater of $${pick.M}\\ \\text{kg}$ (including a $${pick.m}\\ \\text{kg}$ ball she holds) is at rest on frictionless horizontal ice. She throws the ball horizontally at $${pick.v}\\ \\text{m/s}$. At what **speed** does the skater recoil? (2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: vs,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m/s"],
          unitChoices: ["m/s", "km/h", "m/s^2", "kg·m/s"],
        },
        hints: [
          L(
            "El sistema es patinadora **más** pelota: inicialmente todo está en reposo, así que $p_{total} = 0$.",
            "The system is skater **plus** ball: initially everything is at rest, so $p_{total} = 0$.",
          ),
          L(
            `Al lanzar, la masa que retrocede no es toda la inicial: la patinadora sin pelota pesa $M - m$.`,
            `After the throw, the recoiling mass is not the whole initial one: the skater without the ball weighs $M - m$.`,
          ),
          L(
            "Escribe $0 = m\\,v_{pelota} + (M - m)\\,v_{patinadora}$ y despeja el módulo.",
            "Write $0 = m\\,v_{ball} + (M - m)\\,v_{skater}$ and solve for the magnitude.",
          ),
        ],
        answerDisplay: L(
          `$v_{patinadora} \\approx ${tok(vs)}\\ \\text{m/s}$`,
          `$v_{skater} \\approx ${tok(vs)}\\ \\text{m/s}$`,
        ),
        solution: [
          step(
            "given",
            `Masa total inicial: $M = ${pick.M}\\ \\text{kg}$; pelota: $m = ${pick.m}\\ \\text{kg}$ lanzada a $${pick.v}\\ \\text{m/s}$; patinadora tras lanzar: $M - m = ${pick.M - pick.m}\\ \\text{kg}$; sistema inicialmente en reposo.`,
            `Initial total mass: $M = ${pick.M}\\ \\text{kg}$; ball: $m = ${pick.m}\\ \\text{kg}$ thrown at $${pick.v}\\ \\text{m/s}$; skater after the throw: $M - m = ${pick.M - pick.m}\\ \\text{kg}$; system initially at rest.`,
          ),
          step(
            "approach",
            "Conservación del momento total (el hielo no ejerce fuerza horizontal): $0 = m v_{pelota} + (M-m) v_{patinadora}$.",
            "Conservation of total momentum (the ice exerts no horizontal force): $0 = m v_{ball} + (M-m) v_{skater}$.",
          ),
          step(
            "calculation",
            `$|v_{patinadora}| = \\dfrac{m\\,v_{pelota}}{M - m} = \\dfrac{${pick.m} \\cdot ${pick.v}}{${pick.M - pick.m}} = \\dfrac{${pick.m * pick.v}}{${pick.M - pick.m}} = ${tok(r2((pick.m * pick.v) / (pick.M - pick.m)))}\\ \\text{m/s} \\approx ${tok(vs)}\\ \\text{m/s}$`,
            `$|v_{skater}| = \\dfrac{m\\,v_{ball}}{M - m} = \\dfrac{${pick.m} \\cdot ${pick.v}}{${pick.M - pick.m}} = \\dfrac{${pick.m * pick.v}}{${pick.M - pick.m}} = ${tok(r2((pick.m * pick.v) / (pick.M - pick.m)))}\\ \\text{m/s} \\approx ${tok(vs)}\\ \\text{m/s}$`,
          ),
          step(
            "result",
            `La patinadora retrocede (en sentido contrario al lanzamiento) a $\\approx ${tok(vs)}\\ \\text{m/s}$: muy despacio, porque su masa es mucho mayor que la de la pelota.`,
            `The skater recoils (opposite to the throw) at $\\approx ${tok(vs)}\\ \\text{m/s}$: quite slowly, because her mass is much larger than the ball's.`,
          ),
        ],
      };
    },
  ),
];
