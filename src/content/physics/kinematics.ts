/**
 * PHYSICS · Kinematics
 *
 * Exemplar file: demonstrates unit-aware numeric answers with significant-
 * figure tolerance, motion-graph interpretation with diagrams, projectile
 * diagrams, and physics-style staged solutions (given / approach / calc).
 */

import { template, L, step, tok } from "@/lib/problem";
import type { ProblemTemplate, McOption } from "@/lib/types";

export const templates: ProblemTemplate[] = [
  /* ---------------------------------------------------------------- */
  /* Position & displacement                                          */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "kin-pos-01",
      subject: "physics",
      topicId: "kinematics",
      subtopicId: "position-displacement",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 60,
      tags: ["position", "displacement"],
      prerequisites: [],
    },
    (rng) => {
      // Hand-curated integer sets (two with motion toward -x) so Δx is exact.
      const sets = [
        { x0: 2, xf: 10, t0: 0, tf: 4 },
        { x0: -4, xf: 3, t0: 0, tf: 6 },
        { x0: 5, xf: -7, t0: 2, tf: 8 },
        { x0: -6, xf: -1, t0: 1, tf: 5 },
        { x0: 0, xf: 9, t0: 0, tf: 3 },
        { x0: 12, xf: 3, t0: 0, tf: 5 },
      ];
      const p = rng.pick(sets);
      const dx = p.xf - p.x0;
      const x0Tex = p.x0 < 0 ? `(${p.x0})` : `${p.x0}`;
      return {
        skill: L("Desplazamiento a partir de dos posiciones", "Displacement from two positions"),
        statement: L(
          `Un objeto se mueve a lo largo del eje $x$. En el instante $t_0 = ${p.t0}\\ \\text{s}$ está en la posición $x_0 = ${p.x0}\\ \\text{m}$ y en el instante $t_f = ${p.tf}\\ \\text{s}$ está en $x_f = ${p.xf}\\ \\text{m}$. ¿Cuál es su **desplazamiento** $\\Delta x$ entre esos dos instantes, con su signo (positivo = hacia $+x$)?`,
          `An object moves along the $x$-axis. At time $t_0 = ${p.t0}\\ \\text{s}$ it is at position $x_0 = ${p.x0}\\ \\text{m}$ and at time $t_f = ${p.tf}\\ \\text{s}$ it is at $x_f = ${p.xf}\\ \\text{m}$. What is its **displacement** $\\Delta x$ between those two instants, including its sign (positive = toward $+x$)?`,
        ),
        answer: { kind: "numeric", value: dx },
        hints: [
          L(
            "El desplazamiento no es la distancia recorrida: depende solo de la posición inicial y de la final, no del camino.",
            "Displacement is not the distance travelled: it depends only on the initial and final positions, not on the path.",
          ),
          L(
            "Por definición, $\\Delta x = x_f - x_0$: posición final menos posición inicial, en ese orden.",
            "By definition, $\\Delta x = x_f - x_0$: final position minus initial position, in that order.",
          ),
          L(
            "Resta conservando los signos: si $x_f < x_0$, el desplazamiento sale negativo (movimiento hacia $-x$).",
            "Subtract keeping the signs: if $x_f < x_0$, the displacement comes out negative (motion toward $-x$).",
          ),
        ],
        answerDisplay: L(`$\\Delta x = ${dx}\\ \\text{m}$`, `$\\Delta x = ${dx}\\ \\text{m}$`),
        solution: [
          step(
            "given",
            `$x_0 = ${p.x0}\\ \\text{m}$ (en $t_0 = ${p.t0}\\ \\text{s}$), $x_f = ${p.xf}\\ \\text{m}$ (en $t_f = ${p.tf}\\ \\text{s}$)`,
            `$x_0 = ${p.x0}\\ \\text{m}$ (at $t_0 = ${p.t0}\\ \\text{s}$), $x_f = ${p.xf}\\ \\text{m}$ (at $t_f = ${p.tf}\\ \\text{s}$)`,
          ),
          step(
            "approach",
            "El desplazamiento es el cambio de posición: $\\Delta x = x_f - x_0$.",
            "Displacement is the change in position: $\\Delta x = x_f - x_0$.",
          ),
          step(
            "calculation",
            `$\\Delta x = x_f - x_0 = ${p.xf} - ${x0Tex} = ${dx}\\ \\text{m}$`,
            `$\\Delta x = x_f - x_0 = ${p.xf} - ${x0Tex} = ${dx}\\ \\text{m}$`,
          ),
          step(
            "result",
            `El desplazamiento es $\\Delta x = ${dx}\\ \\text{m}$, ${dx < 0 ? "en el sentido $-x$" : "en el sentido $+x$"}.`,
            `The displacement is $\\Delta x = ${dx}\\ \\text{m}$, ${dx < 0 ? "in the $-x$ direction" : "in the $+x$ direction"}.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Average speed / velocity                                         */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "kin-avg-01",
      subject: "physics",
      topicId: "kinematics",
      subtopicId: "velocity",
      difficulty: "easy",
      questionType: "numeric-unit",
      estimatedTimeSec: 90,
      tags: ["average-speed"],
      prerequisites: [],
    },
    (rng) => {
      const km = rng.pick([12, 18, 24, 30, 36, 45, 54, 60]);
      const mins = rng.pick([10, 15, 20, 30, 40, 45]);
      const hours = mins / 60;
      const vKmh = km / hours;
      const vMs = Math.round(((vKmh * 1000) / 3600) * 10) / 10;
      return {
        skill: L("Rapidez media", "Average speed"),
        statement: L(
          `Un ciclista recorre $${km}\\ \\text{km}$ en $${mins}\\ \\text{min}$. Calcula su rapidez media en $\\text{m/s}$ (2 cifras significativas).`,
          `A cyclist covers $${km}\\ \\text{km}$ in $${mins}\\ \\text{min}$. Compute the average speed in $\\text{m/s}$ (2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: vMs,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m/s"],
          unitChoices: ["m/s", "km/h", "m/s^2", "m"],
        },
        hints: [
          L(
            "La rapidez media es distancia dividida por tiempo.",
            "Average speed is distance divided by time.",
          ),
          L(
            `Convierte primero: $${km}\\ \\text{km} = ${km * 1000}\\ \\text{m}$ y $${mins}\\ \\text{min} = {{${(mins / 60).toFixed(2)}}}\\ \\text{h} = ${mins * 60}\\ \\text{s}$.`,
            `Convert first: $${km}\\ \\text{km} = ${km * 1000}\\ \\text{m}$ and $${mins}\\ \\text{min} = ${mins * 60}\\ \\text{s}$.`,
          ),
          L(
            "Divide los metros entre los segundos.",
            "Divide the metres by the seconds.",
          ),
        ],
        answerDisplay: L(
          `$\\approx {{${vMs}}}\\ \\text{m/s}$`,
          `$\\approx {{${vMs}}}\\ \\text{m/s}$`,
        ),
        solution: [
          step(
            "given",
            `$d = ${km}\\ \\text{km} = ${km * 1000}\\ \\text{m}$<br>$t = ${mins}\\ \\text{min} = ${mins * 60}\\ \\text{s}$`,
            `$d = ${km}\\ \\text{km} = ${km * 1000}\\ \\text{m}$<br>$t = ${mins}\\ \\text{min} = ${mins * 60}\\ \\text{s}$`,
          ),
          step(
            "approach",
            "Rapidez media: $\\bar{v} = d/t$, todo en unidades del SI.",
            "Average speed: $\\bar{v} = d/t$, all in SI units.",
          ),
          step(
            "calculation",
            `$\\bar{v} = \\frac{${km * 1000}\\ \\text{m}}{${mins * 60}\\ \\text{s}} \\approx {{${vMs}}}\\ \\text{m/s}$`,
            `$\\bar{v} = \\frac{${km * 1000}\\ \\text{m}}{${mins * 60}\\ \\text{s}} \\approx {{${vMs}}}\\ \\text{m/s}$`,
          ),
          step(
            "result",
            `La rapidez media es $\\approx {{${vMs}}}\\ \\text{m/s}$.`,
            `The average speed is $\\approx {{${vMs}}}\\ \\text{m/s}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Average acceleration (with sign)                                 */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "kin-acc-01",
      subject: "physics",
      topicId: "kinematics",
      subtopicId: "acceleration",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 120,
      tags: ["acceleration", "average-acceleration"],
      prerequisites: ["velocity"],
    },
    (rng) => {
      // Hand-curated integer sets; three are braking (negative a) so the
      // answer is exact and the sign is meaningful.
      const sets = [
        { v0: 10, vf: 22, dt: 6 }, // a = +2
        { v0: 5, vf: 20, dt: 5 }, // a = +3
        { v0: 14, vf: 32, dt: 3 }, // a = +6
        { v0: 24, vf: 12, dt: 4 }, // a = -3 (braking)
        { v0: 16, vf: 4, dt: 2 }, // a = -6 (braking)
        { v0: 30, vf: 18, dt: 3 }, // a = -4 (braking)
      ];
      const s = rng.pick(sets);
      const dv = s.vf - s.v0;
      const a = dv / s.dt;
      return {
        skill: L("Aceleración media a partir de dos velocidades", "Average acceleration from two velocities"),
        statement: L(
          `Un automóvil circula por una carretera recta y su velocidad pasa de $v_0 = ${s.v0}\\ \\text{m/s}$ a $v_f = ${s.vf}\\ \\text{m/s}$ en un intervalo de $\\Delta t = ${s.dt}\\ \\text{s}$. ¿Cuál es su **aceleración media** en $\\text{m/s}^2$? Da el valor **con signo** (positivo = su rapidez aumenta).`,
          `A car travels along a straight road and its velocity changes from $v_0 = ${s.v0}\\ \\text{m/s}$ to $v_f = ${s.vf}\\ \\text{m/s}$ over an interval of $\\Delta t = ${s.dt}\\ \\text{s}$. What is its **average acceleration** in $\\text{m/s}^2$? Give the value **including the sign** (positive = its speed increases).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: a,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m/s^2", "m/s²"],
          unitChoices: ["m/s^2", "m/s", "km/h", "m"],
        },
        hints: [
          L(
            "Datos: la velocidad inicial $v_0$, la final $v_f$ y el intervalo $\\Delta t$; te piden la aceleración media.",
            "Data: the initial velocity $v_0$, the final one $v_f$ and the interval $\\Delta t$; you need the average acceleration.",
          ),
          L(
            "La aceleración media es el cambio de velocidad por unidad de tiempo: $a = \\frac{\\Delta v}{\\Delta t}$.",
            "Average acceleration is the change in velocity per unit time: $a = \\frac{\\Delta v}{\\Delta t}$.",
          ),
          L(
            "Calcula primero $\\Delta v = v_f - v_0$ conservando el signo y luego divídelo entre $\\Delta t$.",
            "First compute $\\Delta v = v_f - v_0$ keeping the sign, then divide it by $\\Delta t$.",
          ),
        ],
        answerDisplay: L(`$a = ${a}\\ \\text{m/s}^2$`, `$a = ${a}\\ \\text{m/s}^2$`),
        solution: [
          step(
            "given",
            `$v_0 = ${s.v0}\\ \\text{m/s}$, $v_f = ${s.vf}\\ \\text{m/s}$, $\\Delta t = ${s.dt}\\ \\text{s}$`,
            `$v_0 = ${s.v0}\\ \\text{m/s}$, $v_f = ${s.vf}\\ \\text{m/s}$, $\\Delta t = ${s.dt}\\ \\text{s}$`,
          ),
          step(
            "approach",
            "Aceleración media: $a = \\frac{\\Delta v}{\\Delta t} = \\frac{v_f - v_0}{\\Delta t}$, con su signo.",
            "Average acceleration: $a = \\frac{\\Delta v}{\\Delta t} = \\frac{v_f - v_0}{\\Delta t}$, keeping the sign.",
          ),
          step(
            "calculation",
            `$\\Delta v = v_f - v_0 = ${s.vf} - ${s.v0} = ${dv}\\ \\text{m/s}$<br>$a = \\frac{\\Delta v}{\\Delta t} = \\frac{${dv}}{${s.dt}} = ${a}\\ \\text{m/s}^2$`,
            `$\\Delta v = v_f - v_0 = ${s.vf} - ${s.v0} = ${dv}\\ \\text{m/s}$<br>$a = \\frac{\\Delta v}{\\Delta t} = \\frac{${dv}}{${s.dt}} = ${a}\\ \\text{m/s}^2$`,
          ),
          step(
            "result",
            `La aceleración media es $a = ${a}\\ \\text{m/s}^2$: ${a > 0 ? "el automóvil aumenta su rapidez" : "el automóvil frena (reduce su rapidez)"}.`,
            `The average acceleration is $a = ${a}\\ \\text{m/s}^2$: ${a > 0 ? "the car speeds up" : "the car brakes (its speed decreases)"}.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Constant velocity: d = v·t (metres or kilometres)                */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "kin-cv-01",
      subject: "physics",
      topicId: "kinematics",
      subtopicId: "constant-velocity",
      difficulty: "easy",
      questionType: "numeric-unit",
      estimatedTimeSec: 75,
      tags: ["constant-velocity", "uniform-motion"],
      prerequisites: ["velocity"],
    },
    (rng) => {
      // Hand-curated clean sets; the unit (m or km) is part of the variant.
      const sets: { v: number; t: number; unit: "m" | "km" }[] = [
        { v: 15, t: 40, unit: "m" }, // 600 m
        { v: 8, t: 45, unit: "m" }, // 360 m
        { v: 25, t: 60, unit: "m" }, // 1500 m
        { v: 10, t: 180, unit: "km" }, // 1.8 km
        { v: 20, t: 150, unit: "km" }, // 3 km
        { v: 5, t: 240, unit: "km" }, // 1.2 km
      ];
      const s = rng.pick(sets);
      const isKm = s.unit === "km";
      const dM = s.v * s.t;
      const dKm = dM / 1000;
      const unitEs = isKm ? "kilómetros" : "metros";
      const unitEn = isKm ? "kilometres" : "metres";
      return {
        skill: L("Distancia recorrida con velocidad constante", "Distance travelled at constant velocity"),
        statement: L(
          `Un móvil se desplaza en línea recta con **velocidad constante** de $${s.v}\\ \\text{m/s}$ durante $${s.t}\\ \\text{s}$. ¿Qué distancia recorre? Expresa el resultado en **${unitEs}**.`,
          `An object moves in a straight line at a **constant velocity** of $${s.v}\\ \\text{m/s}$ for $${s.t}\\ \\text{s}$. What distance does it cover? Express the result in **${unitEn}**.`,
        ),
        answer: {
          kind: "numeric-unit",
          value: isKm ? dKm : dM,
          tolerance: { mode: "sigfig", value: 2 },
          units: [s.unit],
          unitChoices: ["m", "km", "m/s", "s"],
        },
        hints: [
          L(
            "La velocidad es constante: no cambia durante el trayecto, así que la distancia crece linealmente con el tiempo.",
            "The velocity is constant: it does not change during the trip, so the distance grows linearly with time.",
          ),
          L(
            "En un movimiento rectilíneo uniforme, $d = v \\cdot t$ (distancia = velocidad × tiempo).",
            "In uniform straight-line motion, $d = v \\cdot t$ (distance = velocity × time).",
          ),
          isKm
            ? L(
                `Calcula $d = ${s.v} \\cdot ${s.t}$ en metros y convierte al final: $1\\ \\text{km} = 1000\\ \\text{m}$.`,
                `Compute $d = ${s.v} \\cdot ${s.t}$ in metres and convert at the end: $1\\ \\text{km} = 1000\\ \\text{m}$.`,
              )
            : L(
                "Sustituye los valores en $d = v\\,t$: el producto sale directamente en metros.",
                "Substitute into $d = v\\,t$: the product comes out directly in metres.",
              ),
        ],
        answerDisplay: isKm
          ? L(`$d = ${tok(dKm)}\\ \\text{km}$`, `$d = ${tok(dKm)}\\ \\text{km}$`)
          : L(`$d = ${dM}\\ \\text{m}$`, `$d = ${dM}\\ \\text{m}$`),
        solution: [
          step(
            "given",
            `$v = ${s.v}\\ \\text{m/s}$ (constante), $t = ${s.t}\\ \\text{s}$`,
            `$v = ${s.v}\\ \\text{m/s}$ (constant), $t = ${s.t}\\ \\text{s}$`,
          ),
          step(
            "approach",
            "Movimiento rectilíneo uniforme: $d = v\\,t$.",
            "Uniform straight-line motion: $d = v\\,t$.",
          ),
          step(
            "calculation",
            isKm
              ? `$d = ${s.v} \\cdot ${s.t} = ${dM}\\ \\text{m} = \\frac{${dM}}{1000}\\ \\text{km} = ${tok(dKm)}\\ \\text{km}$`
              : `$d = ${s.v} \\cdot ${s.t} = ${dM}\\ \\text{m}$`,
            isKm
              ? `$d = ${s.v} \\cdot ${s.t} = ${dM}\\ \\text{m} = \\frac{${dM}}{1000}\\ \\text{km} = ${tok(dKm)}\\ \\text{km}$`
              : `$d = ${s.v} \\cdot ${s.t} = ${dM}\\ \\text{m}$`,
          ),
          step(
            "result",
            isKm
              ? `El móvil recorre $${tok(dKm)}\\ \\text{km}$.`
              : `El móvil recorre $${dM}\\ \\text{m}$.`,
            isKm
              ? `The object covers $${tok(dKm)}\\ \\text{km}$.`
              : `The object covers $${dM}\\ \\text{m}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* v = v0 + a·t                                                     */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "kin-vat-01",
      subject: "physics",
      topicId: "kinematics",
      subtopicId: "constant-acceleration",
      difficulty: "easy",
      questionType: "numeric-unit",
      estimatedTimeSec: 90,
      tags: ["kinematics", "constant-acceleration"],
      prerequisites: [],
    },
    (rng) => {
      const v0 = rng.pick([0, 2, 4, 5, 8, 10]);
      const a = rng.pick([1.5, 2, 2.5, 3, 4]);
      const t = rng.pick([3, 4, 5, 6, 8]);
      const v = Math.round((v0 + a * t) * 10) / 10;
      return {
        skill: L("Velocidad final con aceleración constante", "Final velocity under constant acceleration"),
        statement: L(
          `Un móvil parte con $v_0 = {{${v0}}}\\ \\text{m/s}$ y acelera a $a = {{${a}}}\\ \\text{m/s}^2$ durante $${t}\\ \\text{s}$. ¿Qué velocidad alcanza?`,
          `An object starts with $v_0 = {{${v0}}}\\ \\text{m/s}$ and accelerates at $a = {{${a}}}\\ \\text{m/s}^2$ for $${t}\\ \\text{s}$. What velocity does it reach?`,
        ),
        answer: {
          kind: "numeric-unit",
          value: v,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m/s"],
          unitChoices: ["m/s", "m/s^2", "m", "N"],
        },
        hints: [
          L(
            "Identifica los datos y la incógnita: tienes $v_0$, $a$, $t$ y piden $v$.",
            "Identify the data and the unknown: you have $v_0$, $a$, $t$ and need $v$.",
          ),
          L(
            "La ecuación que conecta estos tres con $v$ es $v = v_0 + at$.",
            "The equation linking them is $v = v_0 + at$.",
          ),
          L(
            "Sustituye y suma: no hace falta despejar nada.",
            "Substitute and add: no rearranging needed.",
          ),
        ],
        answerDisplay: L(`$v = {{${v}}}\\ \\text{m/s}$`, `$v = {{${v}}}\\ \\text{m/s}$`),
        solution: [
          step(
            "given",
            `$v_0 = {{${v0}}}\\ \\text{m/s}$, $a = {{${a}}}\\ \\text{m/s}^2$, $t = ${t}\\ \\text{s}$`,
            `$v_0 = {{${v0}}}\\ \\text{m/s}$, $a = {{${a}}}\\ \\text{m/s}^2$, $t = ${t}\\ \\text{s}$`,
          ),
          step(
            "approach",
            "Aceleración constante → ecuación $v = v_0 + at$.",
            "Constant acceleration → the equation $v = v_0 + at$.",
          ),
          step(
            "calculation",
            `$v = {{${v0}}} + {{${a}}} \\cdot ${t} = {{${v0}}} + {{${Math.round(a * t * 10) / 10}}} = {{${v}}}\\ \\text{m/s}$`,
            `$v = {{${v0}}} + {{${a}}} \\cdot ${t} = {{${v0}}} + {{${Math.round(a * t * 10) / 10}}} = {{${v}}}\\ \\text{m/s}$`,
          ),
          step(
            "result",
            `La velocidad final es $${tok(v)}\\ \\text{m/s}$.`,
            `The final velocity is $${tok(v)}\\ \\text{m/s}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Displacement with constant acceleration                          */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "kin-disp-01",
      subject: "physics",
      topicId: "kinematics",
      subtopicId: "constant-acceleration",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 150,
      tags: ["kinematics", "constant-acceleration"],
      prerequisites: ["constant-acceleration"],
    },
    (rng) => {
      const v0 = rng.pick([0, 3, 5, 6, 8]);
      const a = rng.pick([-3, -2, 2, 2.5, 3]);
      const t = rng.pick([4, 5, 6, 8, 10]);
      const x = Math.round((v0 * t + 0.5 * a * t * t) * 10) / 10;
      return {
        skill: L("Desplazamiento con aceleración constante", "Displacement under constant acceleration"),
        statement: L(
          `Un móvil lleva $v_0 = {{${v0}}}\\ \\text{m/s}$ y acelera con $a = {{${a}}}\\ \\text{m/s}^2$ (si es negativa, frena). ¿Qué desplazamiento recorre en $${t}\\ \\text{s}$?`,
          `An object moves with $v_0 = {{${v0}}}\\ \\text{m/s}$ and accelerates at $a = {{${a}}}\\ \\text{m/s}^2$ (negative means it brakes). What displacement does it cover in $${t}\\ \\text{s}$?`,
        ),
        answer: {
          kind: "numeric-unit",
          value: x,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m"],
          unitChoices: ["m", "km", "m/s", "s"],
        },
        hints: [
          L(
            "Datos: $v_0$, $a$, $t$. Incógnita: $\\Delta x$.",
            "Data: $v_0$, $a$, $t$. Unknown: $\\Delta x$.",
          ),
          L(
            "La ecuación que no necesita $v$ es $\\Delta x = v_0 t + \\frac{1}{2}at^2$.",
            "The equation that avoids $v$ is $\\Delta x = v_0 t + \\frac{1}{2}at^2$.",
          ),
          L(
            `Calcula por separado $v_0 t$ y $\\frac{1}{2}at^2 = {{${Math.round(0.5 * a * t * t * 10) / 10}}}$.`,
            `Compute $v_0 t$ and $\\frac{1}{2}at^2 = {{${Math.round(0.5 * a * t * t * 10) / 10}}}$ separately.`,
          ),
        ],
        answerDisplay: L(`$\\Delta x = {{${x}}}\\ \\text{m}$`, `$\\Delta x = {{${x}}}\\ \\text{m}$`),
        solution: [
          step(
            "given",
            `$v_0 = {{${v0}}}\\ \\text{m/s}$, $a = {{${a}}}\\ \\text{m/s}^2$, $t = ${t}\\ \\text{s}$`,
            `$v_0 = {{${v0}}}\\ \\text{m/s}$, $a = {{${a}}}\\ \\text{m/s}^2$, $t = ${t}\\ \\text{s}$`,
          ),
          step(
            "approach",
            "Usamos $\\Delta x = v_0 t + \\tfrac{1}{2}at^2$ porque no interviene $v$.",
            "Use $\\Delta x = v_0 t + \\tfrac{1}{2}at^2$ since $v$ is not involved.",
          ),
          step(
            "calculation",
            `$\\Delta x = {{${v0}}} \\cdot ${t} + \\tfrac{1}{2} \\cdot ({{${a}}}) \\cdot ${t}^2$<br>$= {{${Math.round(v0 * t * 10) / 10}}} ${a < 0 ? "-" : "+"} {{${Math.abs(Math.round(0.5 * a * t * t * 10) / 10)}}} = {{${x}}}\\ \\text{m}$`,
            `$\\Delta x = {{${v0}}} \\cdot ${t} + \\tfrac{1}{2} \\cdot ({{${a}}}) \\cdot ${t}^2$<br>$= {{${Math.round(v0 * t * 10) / 10}}} ${a < 0 ? "-" : "+"} {{${Math.abs(Math.round(0.5 * a * t * t * 10) / 10)}}} = {{${x}}}\\ \\text{m}$`,
          ),
          step(
            "result",
            `El desplazamiento es $${tok(x)}\\ \\text{m}$.`,
            `The displacement is $${tok(x)}\\ \\text{m}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Free fall                                                        */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "kin-fall-01",
      subject: "physics",
      topicId: "kinematics",
      subtopicId: "free-fall",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 150,
      tags: ["free-fall", "gravity"],
      prerequisites: ["constant-acceleration"],
    },
    (rng) => {
      const h = rng.pick([20, 25, 30, 35, 40, 45, 50, 60, 80]);
      const v = Math.round(Math.sqrt(2 * 9.8 * h) * 10) / 10;
      return {
        skill: L("Caída libre: velocidad de impacto", "Free fall: impact velocity"),
        statement: L(
          `Se deja caer una piedra desde $${h}\\ \\text{m}$ de altura (sin velocidad inicial). ¿Con qué velocidad llega al suelo? Usa $g = 9{,}8\\ \\text{m/s}^2$ y desprecia el aire.`,
          `A stone is dropped from a height of $${h}\\ \\text{m}$ (no initial velocity). With what velocity does it hit the ground? Use $g = 9.8\\ \\text{m/s}^2$ and neglect air resistance.`,
        ),
        answer: {
          kind: "numeric-unit",
          value: v,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m/s"],
          unitChoices: ["m/s", "m", "m/s^2", "s"],
        },
        hints: [
          L(
            "Caída libre: aceleración constante $g$ hacia abajo, $v_0 = 0$.",
            "Free fall: constant downward acceleration $g$, with $v_0 = 0$.",
          ),
          L(
            "La ecuación que conecta velocidad y altura sin el tiempo es $v^2 = v_0^2 + 2g\\Delta y$.",
            "The equation linking velocity and height without time is $v^2 = v_0^2 + 2g\\Delta y$.",
          ),
          L(
            `Calcula $v^2 = 2 \\cdot 9{,}8 \\cdot ${h}$ y después la raíz.`,
            `Compute $v^2 = 2 \\cdot 9.8 \\cdot ${h}$ and then take the root.`,
          ),
        ],
        answerDisplay: L(`$v \\approx {{${v}}}\\ \\text{m/s}$`, `$v \\approx {{${v}}}\\ \\text{m/s}$`),
        solution: [
          step(
            "given",
            `$v_0 = 0$, $\\Delta y = ${h}\\ \\text{m}$, $g = 9{,}8\\ \\text{m/s}^2$`,
            `$v_0 = 0$, $\\Delta y = ${h}\\ \\text{m}$, $g = 9.8\\ \\text{m/s}^2$`,
          ),
          step(
            "approach",
            "Sin tiempo en los datos: usamos $v^2 = v_0^2 + 2g\\Delta y$.",
            "No time given: use $v^2 = v_0^2 + 2g\\Delta y$.",
          ),
          step(
            "calculation",
            `$v^2 = 0 + 2 \\cdot 9{,}8 \\cdot ${h} = ${Math.round(2 * 9.8 * h * 10) / 10}$<br>$v = \\sqrt{${Math.round(2 * 9.8 * h * 10) / 10}} \\approx {{${v}}}\\ \\text{m/s}$`,
            `$v^2 = 0 + 2 \\cdot 9.8 \\cdot ${h} = ${Math.round(2 * 9.8 * h * 10) / 10}$<br>$v = \\sqrt{${Math.round(2 * 9.8 * h * 10) / 10}} \\approx {{${v}}}\\ \\text{m/s}$`,
          ),
          step(
            "result",
            `Llega al suelo con $\\approx {{${v}}}\\ \\text{m/s}$ (hacia abajo).`,
            `It reaches the ground at $\\approx {{${v}}}\\ \\text{m/s}$ (downward).`,
          ),
        ],
      };
    },
  ),

  template(
    {
      id: "kin-fall-02",
      subject: "physics",
      topicId: "kinematics",
      subtopicId: "free-fall",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 150,
      tags: ["free-fall", "gravity"],
      prerequisites: ["free-fall"],
    },
    (rng) => {
      const t = rng.pick([2, 2.5, 3, 3.5, 4]);
      const h = Math.round(0.5 * 9.8 * t * t * 10) / 10;
      return {
        skill: L("Caída libre: altura desde el tiempo", "Free fall: height from time"),
        statement: L(
          `Un objeto en caída libre tarda $${tok(t)}\\ \\text{s}$ en llegar al suelo. ¿Desde qué altura cayó? ($g = 9{,}8\\ \\text{m/s}^2$)`,
          `An object in free fall takes $${tok(t)}\\ \\text{s}$ to reach the ground. From what height did it fall? ($g = 9.8\\ \\text{m/s}^2$)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: h,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m"],
          unitChoices: ["m", "km", "cm", "s"],
        },
        hints: [
          L(
            "Tienes el tiempo y la aceleración; piden el desplazamiento.",
            "You have the time and the acceleration; you need the displacement.",
          ),
          L(
            "Parte del reposo: $v_0 = 0$.",
            "It starts from rest: $v_0 = 0$.",
          ),
          L(
            "Usa $\\Delta y = \\frac{1}{2}gt^2$.",
            "Use $\\Delta y = \\frac{1}{2}gt^2$.",
          ),
        ],
        answerDisplay: L(`$h \\approx {{${h}}}\\ \\text{m}$`, `$h \\approx {{${h}}}\\ \\text{m}$`),
        solution: [
          step(
            "given",
            `$t = {{${t}}}\\ \\text{s}$, $v_0 = 0$, $g = 9{,}8\\ \\text{m/s}^2$`,
            `$t = {{${t}}}\\ \\text{s}$, $v_0 = 0$, $g = 9.8\\ \\text{m/s}^2$`,
          ),
          step(
            "approach",
            "Con $v_0 = 0$: $h = \\tfrac{1}{2}gt^2$.",
            "With $v_0 = 0$: $h = \\tfrac{1}{2}gt^2$.",
          ),
          step(
            "calculation",
            `$h = \\tfrac{1}{2} \\cdot 9{,}8 \\cdot ({{${t}}})^2 = {{${Math.round(0.5 * 9.8 * t * t * 10) / 10}}} \\approx {{${h}}}\\ \\text{m}$`,
            `$h = \\tfrac{1}{2} \\cdot 9.8 \\cdot ({{${t}}})^2 = {{${Math.round(0.5 * 9.8 * t * t * 10) / 10}}} \\approx {{${h}}}\\ \\text{m}$`,
          ),
          step("result", `Cayó desde $\\approx {{${h}}}\\ \\text{m}$.`, `It fell from $\\approx {{${h}}}\\ \\text{m}$.`),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Motion graph interpretation (diagram + MC)                       */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "kin-graph-01",
      subject: "physics",
      topicId: "kinematics",
      subtopicId: "motion-graphs",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["motion-graphs", "velocity-time"],
      prerequisites: ["constant-acceleration"],
    },
    (rng) => {
      const v0 = rng.pick([0, 2, 4]);
      const slope = rng.pick([1, 1.5, 2, -1.5, -2]);
      const tEnd = 6;
      const vEnd = v0 + slope * tEnd;
      const a = slope;
      const options: McOption[] = [
        { id: "a", text: L(`$\\text{m/s}^2$ con valor $${tok(a)}$`, `$\\text{m/s}^2$ with value $${tok(a)}$`), correct: true },
        { id: "b", text: L(`$\\text{m/s}^2$ con valor $${tok(Math.round(vEnd * 10) / 10)}$`, `$\\text{m/s}^2$ with value $${tok(Math.round(vEnd * 10) / 10)}$`), correct: false },
        { id: "c", text: L(`$\\text{m/s}$ con valor $${tok(a)}$`, `$\\text{m/s}$ with value $${tok(a)}$`), correct: false },
        { id: "d", text: L("$\\text{m/s}^2$ con valor 0 (velocidad constante)", "$\\text{m/s}^2$ with value 0 (constant velocity)"), correct: false },
      ];
      return {
        skill: L("Pendiente de una gráfica v–t", "Slope of a v–t graph"),
        statement: L(
          "La gráfica muestra la velocidad de un móvil en función del tiempo. ¿Qué representa la **pendiente** de esta gráfica y cuánto vale?",
          "The graph shows an object's velocity as a function of time. What does the **slope** of this graph represent and what is its value?",
        ),
        diagram: {
          kind: "function-graph",
          xMin: 0,
          xMax: 8,
          yMin: slope > 0 ? 0 : Math.min(0, vEnd) - 1,
          yMax: Math.max(v0, vEnd) + 2,
          curves: [{ fn: `${v0} + ${slope}*x`, color: "primary" }],
          points: [
            { x: 0, y: v0, label: `(0, ${v0})` },
            { x: tEnd, y: vEnd, label: `(${tEnd}, ${Math.round(vEnd * 10) / 10})` },
          ],
          xLabel: "t (s)",
          yLabel: "v (m/s)",
          showGrid: true,
        },
        diagramLabel: L(
          `Gráfica velocidad-tiempo: línea recta desde (${0}, ${v0}) hasta (${tEnd}, ${vEnd}).`,
          `Velocity-time graph: a straight line from (${0}, ${v0}) to (${tEnd}, ${vEnd}).`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "En una gráfica $v$–$t$, la pendiente tiene unidades de $\\text{m/s}$ dividido entre $\\text{s}$.",
            "In a $v$–$t$ graph the slope has units of $\\text{m/s}$ per $\\text{s}$.",
          ),
          L(
            "La pendiente de una gráfica $v$–$t$ es la aceleración.",
            "The slope of a $v$–$t$ graph is the acceleration.",
          ),
          L(
            `$a = \\frac{\\Delta v}{\\Delta t} = \\frac{${Math.round(vEnd * 10) / 10} - ${v0}}{${tEnd} - 0}$.`,
            `$a = \\frac{\\Delta v}{\\Delta t} = \\frac{${Math.round(vEnd * 10) / 10} - ${v0}}{${tEnd} - 0}$.`,
          ),
        ],
        answerDisplay: L(
          `Es la aceleración: $a = {{${a}}}\\ \\text{m/s}^2$`,
          `It is the acceleration: $a = {{${a}}}\\ \\text{m/s}^2$`,
        ),
        solution: [
          step(
            "given",
            `Recta desde $(0, ${v0})$ hasta $(${tEnd}, ${Math.round(vEnd * 10) / 10})$ en la gráfica $v$–$t$.`,
            `A straight line from $(0, ${v0})$ to $(${tEnd}, ${Math.round(vEnd * 10) / 10})$ on the $v$–$t$ graph.`,
          ),
          step(
            "approach",
            "En $v(t)$, la pendiente es $a = \\Delta v / \\Delta t$.",
            "On a $v(t)$ graph, the slope is $a = \\Delta v / \\Delta t$.",
          ),
          step(
            "calculation",
            `$a = \\frac{${Math.round(vEnd * 10) / 10} - ${v0}}{${tEnd} - 0} = \\frac{${Math.round((vEnd - v0) * 10) / 10}}{${tEnd}} = {{${a}}}\\ \\text{m/s}^2$`,
            `$a = \\frac{${Math.round(vEnd * 10) / 10} - ${v0}}{${tEnd} - 0} = \\frac{${Math.round((vEnd - v0) * 10) / 10}}{${tEnd}} = {{${a}}}\\ \\text{m/s}^2$`,
          ),
          step(
            "result",
            `La pendiente es la aceleración, $a = {{${a}}}\\ \\text{m/s}^2$.`,
            `The slope is the acceleration, $a = {{${a}}}\\ \\text{m/s}^2$.`,
          ),
        ],
      };
    },
  ),

  template(
    {
      id: "kin-graph-02",
      subject: "physics",
      topicId: "kinematics",
      subtopicId: "motion-graphs",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["motion-graphs", "position-time"],
      prerequisites: ["motion-graphs"],
    },
    (rng) => {
      // x(t) = v t  (constant velocity, v chosen ≠ 0)
      const v = rng.nonZeroInt(2, 6) * (rng.bool() ? 1 : -1);
      const options: McOption[] = [
        { id: "a", text: L("Móvil detenido", "Object at rest"), correct: false },
        { id: "b", text: L(`Movimiento uniforme con $v = ${v}\\ \\text{m/s}$`, `Uniform motion with $v = ${v}\\ \\text{m/s}$`), correct: true },
        { id: "c", text: L("Acelera uniformemente", "Uniformly accelerating"), correct: false },
        { id: "d", text: L(`Movimiento uniforme con $v = ${-v}\\ \\text{m/s}$`, `Uniform motion with $v = ${-v}\\ \\text{m/s}$`), correct: false },
      ];
      return {
        skill: L("Interpretar una gráfica x–t", "Interpreting an x–t graph"),
        statement: L(
          "La gráfica muestra la posición $x(t)$ de un móvil. ¿Qué describe el movimiento?",
          "The graph shows the position $x(t)$ of an object. What does it describe?",
        ),
        diagram: {
          kind: "function-graph",
          xMin: 0,
          xMax: 8,
          yMin: Math.min(0, v * 8) - 2,
          yMax: Math.max(0, v * 8) + 2,
          curves: [{ fn: `${v}*x`, color: "primary" }],
          points: [
            { x: 2, y: v * 2, label: `(2, ${v * 2})` },
            { x: 5, y: v * 5, label: `(5, ${v * 5})` },
          ],
          xLabel: "t (s)",
          yLabel: "x (m)",
          showGrid: true,
        },
        diagramLabel: L(
          `Gráfica posición-tiempo: recta que pasa por (2, ${v * 2}) y (5, ${v * 5}).`,
          `Position-time graph: a straight line through (2, ${v * 2}) and (5, ${v * 5}).`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Observa la forma de la curva: ¿es una recta o una parábola?",
            "Look at the shape: is it a straight line or a parabola?",
          ),
          L(
            "Una recta en $x$–$t$ significa velocidad constante.",
            "A straight line on $x$–$t$ means constant velocity.",
          ),
          L(
            `La pendiente es $\\frac{${v * 5} - ${v * 2}}{5 - 2}$; su signo indica el sentido.`,
            `The slope is $\\frac{${v * 5} - ${v * 2}}{5 - 2}$; its sign gives the direction.`,
          ),
        ],
        answerDisplay: L(
          `Movimiento uniforme con $v = ${v}\\ \\text{m/s}$`,
          `Uniform motion with $v = ${v}\\ \\text{m/s}$`,
        ),
        solution: [
          step(
            "given",
            `Recta en la gráfica $x$–$t$ que pasa por $(2, ${v * 2})$ y $(5, ${v * 5})$.`,
            `A straight line on the $x$–$t$ graph through $(2, ${v * 2})$ and $(5, ${v * 5})$.`,
          ),
          step(
            "approach",
            "En $x(t)$: recta → velocidad constante; parábola → aceleración constante.",
            "On $x(t)$: a line → constant velocity; a parabola → constant acceleration.",
          ),
          step(
            "calculation",
            `$v = \\frac{\\Delta x}{\\Delta t} = \\frac{${v * 5} - ${v * 2}}{5 - 2} = \\frac{${v * 3}}{3} = ${v}\\ \\text{m/s}$`,
            `$v = \\frac{\\Delta x}{\\Delta t} = \\frac{${v * 5} - ${v * 2}}{5 - 2} = \\frac{${v * 3}}{3} = ${v}\\ \\text{m/s}$`,
          ),
          step(
            "result",
            `Es un movimiento rectilíneo uniforme con $v = ${v}\\ \\text{m/s}$.`,
            `It is uniform linear motion with $v = ${v}\\ \\text{m/s}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Projectile motion (diagram exemplar)                             */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "kin-proj-01",
      subject: "physics",
      topicId: "kinematics",
      subtopicId: "projectile-motion",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 240,
      tags: ["projectile", "2d-motion"],
      prerequisites: ["constant-acceleration", "free-fall"],
    },
    (rng) => {
      const v0 = rng.pick([15, 18, 20, 22, 25]);
      const angle = rng.pick([30, 37, 40, 45, 50, 53, 60]);
      const rad = (angle * Math.PI) / 180;
      const range = (v0 * v0 * Math.sin(2 * rad)) / 9.8;
      const rRounded = Math.round(range * 10) / 10;
      return {
        skill: L("Alcance de un proyectil", "Range of a projectile"),
        statement: L(
          `Se lanza un proyectil con $v_0 = ${v0}\\ \\text{m/s}$ formando $${angle}^\\circ$ con la horizontal, desde el suelo. ¿Qué alcance horizontal alcanza? ($g = 9{,}8\\ \\text{m/s}^2$, desprecia el aire)`,
          `A projectile is launched at $v_0 = ${v0}\\ \\text{m/s}$ at $${angle}^\\circ$ above the horizontal, from ground level. What horizontal range does it achieve? ($g = 9.8\\ \\text{m/s}^2$, neglect air resistance)`,
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
          `Trayectoria parabólica de un proyectil lanzado a ${v0} m/s y ${angle} grados.`,
          `Parabolic trajectory of a projectile launched at ${v0} m/s and ${angle} degrees.`,
        ),
        answer: {
          kind: "numeric-unit",
          value: rRounded,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m"],
          unitChoices: ["m", "km", "m/s", "s"],
        },
        hints: [
          L(
            "Descompón el movimiento: horizontal (uniforme) y vertical (caída libre).",
            "Split the motion: horizontal (uniform) and vertical (free fall).",
          ),
          L(
            `El tiempo de vuelo sale del eje vertical: $t_v = \\frac{2 v_0 \\sin\\theta}{g}$.`,
            `The flight time comes from the vertical axis: $t_v = \\frac{2 v_0 \\sin\\theta}{g}$.`,
          ),
          L(
            `El alcance es $R = v_0 \\cos\\theta \\cdot t_v$, es decir $R = \\frac{v_0^2 \\sin 2\\theta}{g}$.`,
            `The range is $R = v_0 \\cos\\theta \\cdot t_v$, that is $R = \\frac{v_0^2 \\sin 2\\theta}{g}$.`,
          ),
        ],
        answerDisplay: L(`$R \\approx {{${rRounded}}}\\ \\text{m}$`, `$R \\approx {{${rRounded}}}\\ \\text{m}$`),
        solution: [
          step(
            "given",
            `$v_0 = ${v0}\\ \\text{m/s}$, $\\theta = ${angle}^\\circ$, $g = 9{,}8\\ \\text{m/s}^2$, $y_0 = 0$`,
            `$v_0 = ${v0}\\ \\text{m/s}$, $\\theta = ${angle}^\\circ$, $g = 9.8\\ \\text{m/s}^2$, $y_0 = 0$`,
          ),
          step(
            "approach",
            "Con $y_0 = 0$, el alcance es $R = \\frac{v_0^2 \\sin 2\\theta}{g}$ (tiempo de vuelo × velocidad horizontal).",
            "With $y_0 = 0$, the range is $R = \\frac{v_0^2 \\sin 2\\theta}{g}$ (flight time × horizontal velocity).",
          ),
          step(
            "calculation",
            `$R = \\frac{${v0}^2 \\cdot \\sin(${2 * angle}^\\circ)}{9{,}8} = \\frac{${v0 * v0} \\cdot {{${Math.round(Math.sin((2 * angle * Math.PI) / 180) * 1000) / 1000}}}}{9{,}8} \\approx {{${Math.round(range * 10) / 10}}}\\ \\text{m}$`,
            `$R = \\frac{${v0}^2 \\cdot \\sin(${2 * angle}^\\circ)}{9.8} = \\frac{${v0 * v0} \\cdot {{${Math.round(Math.sin((2 * angle * Math.PI) / 180) * 1000) / 1000}}}}{9.8} \\approx {{${Math.round(range * 10) / 10}}}\\ \\text{m}$`,
          ),
          step(
            "result",
            `El alcance horizontal es $\\approx {{${rRounded}}}\\ \\text{m}$.`,
            `The horizontal range is $\\approx {{${rRounded}}}\\ \\text{m}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Challenge: two-phase motion                                      */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "kin-chal-01",
      subject: "physics",
      topicId: "kinematics",
      subtopicId: "constant-acceleration",
      difficulty: "challenge",
      questionType: "numeric-unit",
      estimatedTimeSec: 300,
      tags: ["multi-step", "constant-acceleration"],
      prerequisites: ["constant-acceleration", "velocity"],
    },
    (rng) => {
      const a = rng.pick([1.5, 2, 2.5]);
      const vMax = rng.pick([15, 18, 20, 24]);
      const t1 = Math.round((vMax / a) * 10) / 10; // acceleration phase
      const d1 = (vMax * vMax) / (2 * a);
      const t2 = rng.pick([10, 15, 20]); // constant phase
      const dTotal = d1 + vMax * t2;
      const vAvg = Math.round((dTotal / (t1 + t2)) * 10) / 10;
      return {
        skill: L("Movimiento en dos fases", "Two-phase motion"),
        statement: L(
          `Un tren parte del reposo y acelera uniformemente hasta alcanzar $${vMax}\\ \\text{m/s}$. Después mantiene esa velocidad durante $${t2}\\ \\text{s}$. Si la aceleración fue $${tok(a)}\\ \\text{m/s}^2$, ¿cuál es la **velocidad media** de todo el viaje?`,
          `A train starts from rest and accelerates uniformly until it reaches $${vMax}\\ \\text{m/s}$. It then keeps that velocity for $${t2}\\ \\text{s}$. If the acceleration was $${tok(a)}\\ \\text{m/s}^2$, what is the **average velocity** of the whole trip?`,
        ),
        answer: {
          kind: "numeric-unit",
          value: vAvg,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m/s"],
          unitChoices: ["m/s", "m", "m/s^2", "s"],
        },
        hints: [
          L(
            "Divide el viaje en dos fases y calcula por separado distancia y tiempo de cada una.",
            "Split the trip into two phases and compute distance and time for each.",
          ),
          L(
            `Fase 1: $t_1 = v/a$, $d_1 = \\frac{v^2}{2a}$. Fase 2: $d_2 = v \\cdot ${t2}$.`,
            `Phase 1: $t_1 = v/a$, $d_1 = \\frac{v^2}{2a}$. Phase 2: $d_2 = v \\cdot ${t2}$.`,
          ),
          L(
            "La velocidad media es el total de distancia entre el total de tiempo.",
            "The average velocity is total distance over total time.",
          ),
        ],
        answerDisplay: L(
          `$\\bar{v} \\approx {{${vAvg}}}\\ \\text{m/s}$`,
          `$\\bar{v} \\approx {{${vAvg}}}\\ \\text{m/s}$`,
        ),
        solution: [
          step(
            "given",
            `Fase 1: $v_0 = 0 \\to ${vMax}\\ \\text{m/s}$ con $a = {{${a}}}\\ \\text{m/s}^2$.<br>Fase 2: $v = ${vMax}\\ \\text{m/s}$ durante $${t2}\\ \\text{s}$.`,
            `Phase 1: $v_0 = 0 \\to ${vMax}\\ \\text{m/s}$ with $a = {{${a}}}\\ \\text{m/s}^2$.<br>Phase 2: $v = ${vMax}\\ \\text{m/s}$ for $${t2}\\ \\text{s}$.`,
          ),
          step(
            "approach",
            "Calculamos distancia y tiempo de cada fase y aplicamos $\\bar{v} = d_{total}/t_{total}$.",
            "Compute distance and time per phase, then apply $\\bar{v} = d_{total}/t_{total}$.",
          ),
          step(
            "calculation",
            `**Fase 1:** $t_1 = \\frac{${vMax}}{{${a}}} = {{${t1}}}\\ \\text{s}$, $d_1 = \\frac{${vMax}^2}{2 \\cdot {{${a}}}} = {{${Math.round(d1 * 10) / 10}}}\\ \\text{m}$<br>**Fase 2:** $d_2 = ${vMax} \\cdot ${t2} = ${vMax * t2}\\ \\text{m}$<br>$\\bar{v} = \\frac{{{${Math.round(d1 * 10) / 10}}} + ${vMax * t2}}{ {{${t1}}} + ${t2} } = \\frac{{{${Math.round(dTotal * 10) / 10}}}}{ {{${Math.round((t1 + t2) * 10) / 10}}} } \\approx {{${vAvg}}}\\ \\text{m/s}$`,
            `**Phase 1:** $t_1 = \\frac{${vMax}}{{${a}}} = {{${t1}}}\\ \\text{s}$, $d_1 = \\frac{${vMax}^2}{2 \\cdot {{${a}}}} = {{${Math.round(d1 * 10) / 10}}}\\ \\text{m}$<br>**Phase 2:** $d_2 = ${vMax} \\cdot ${t2} = ${vMax * t2}\\ \\text{m}$<br>$\\bar{v} = \\frac{{{${Math.round(d1 * 10) / 10}}} + ${vMax * t2}}{ {{${t1}}} + ${t2} } = \\frac{{{${Math.round(dTotal * 10) / 10}}}}{ {{${Math.round((t1 + t2) * 10) / 10}}} } \\approx {{${vAvg}}}\\ \\text{m/s}$`,
          ),
          step(
            "result",
            `La velocidad media del viaje es $\\approx {{${vAvg}}}\\ \\text{m/s}$.`,
            `The average velocity of the trip is $\\approx {{${vAvg}}}\\ \\text{m/s}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Stopping distance (hard, reverse setup)                          */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "kin-stop-01",
      subject: "physics",
      topicId: "kinematics",
      subtopicId: "constant-acceleration",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 210,
      tags: ["deceleration", "word-problems"],
      prerequisites: ["constant-acceleration"],
    },
    (rng) => {
      const v0 = rng.pick([15, 20, 25, 30]);
      const d = rng.pick([25, 40, 50, 60]);
      const t = Math.round(((2 * d) / v0) * 10) / 10;
      return {
        skill: L("Frenada: tiempo hasta detenerse", "Braking: time to stop"),
        statement: L(
          `Un coche circula a $${v0}\\ \\text{m/s}$ y frena uniformemente hasta detenerse en $${d}\\ \\text{m}$. ¿Cuánto tarda en parar?`,
          `A car travels at $${v0}\\ \\text{m/s}$ and brakes uniformly to a stop over $${d}\\ \\text{m}$. How long does it take to stop?`,
        ),
        answer: {
          kind: "numeric-unit",
          value: t,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["s"],
          unitChoices: ["s", "m", "m/s", "m/s^2"],
        },
        hints: [
          L(
            "Datos: $v_0$, $v = 0$, $\\Delta x$. Incógnita: $t$.",
            "Data: $v_0$, $v = 0$, $\\Delta x$. Unknown: $t$.",
          ),
          L(
            "La ecuación que une estos cuatro es $\\Delta x = \\frac{v_0 + v}{2} t$.",
            "The equation linking them is $\\Delta x = \\frac{v_0 + v}{2} t$.",
          ),
          L(
            `Con $v = 0$: $t = \\frac{2\\,\\Delta x}{v_0}$.`,
            `With $v = 0$: $t = \\frac{2\\,\\Delta x}{v_0}$.`,
          ),
        ],
        answerDisplay: L(`$t = {{${t}}}\\ \\text{s}$`, `$t = {{${t}}}\\ \\text{s}$`),
        solution: [
          step(
            "given",
            `$v_0 = ${v0}\\ \\text{m/s}$, $v_f = 0$, $\\Delta x = ${d}\\ \\text{m}$`,
            `$v_0 = ${v0}\\ \\text{m/s}$, $v_f = 0$, $\\Delta x = ${d}\\ \\text{m}$`,
          ),
          step(
            "approach",
            "Usamos $\\Delta x = \\frac{v_0 + v_f}{2}\\,t$ (velocidad media × tiempo).",
            "Use $\\Delta x = \\frac{v_0 + v_f}{2}\\,t$ (average velocity × time).",
          ),
          step(
            "calculation",
            `$${d} = \\frac{${v0} + 0}{2} \\cdot t = ${v0 / 2}\\, t$<br>$t = \\frac{2 \\cdot ${d}}{${v0}} = {{${t}}}\\ \\text{s}$`,
            `$${d} = \\frac{${v0} + 0}{2} \\cdot t = ${v0 / 2}\\, t$<br>$t = \\frac{2 \\cdot ${d}}{${v0}} = {{${t}}}\\ \\text{s}$`,
          ),
          step("result", `Tarda $${tok(t)}\\ \\text{s}$ en detenerse.`, `It takes $${tok(t)}\\ \\text{s}$ to stop.`),
        ],
      };
    },
  ),
];
