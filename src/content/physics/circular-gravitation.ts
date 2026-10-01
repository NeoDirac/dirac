/**
 * PHYSICS · Circular Motion & Gravitation
 *
 * Centripetal acceleration and force, uniform circular motion, Newton's
 * law of gravitation and orbital motion. Values use G = 6.67e-11 and
 * sigfig-2 tolerance; two multiple-choice concept problems included.
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
const G_CONST = 6.67e-11;

/** Split a positive number into a 2-sig-fig mantissa (1 ≤ m < 10) and exponent. */
function sci2(n: number): { mant: number; exp: number } {
  let exp = Math.floor(Math.log10(Math.abs(n)));
  let mant = r1(n / Math.pow(10, exp));
  if (mant >= 10) {
    mant = 1;
    exp += 1;
  }
  return { mant, exp };
}

export const templates: ProblemTemplate[] = [
  /* ---------------------------------------------------------------- */
  /* rpm → period                                                     */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "cg-uniform-01",
      subject: "physics",
      topicId: "circular-gravitation",
      subtopicId: "circular-motion",
      difficulty: "easy",
      questionType: "numeric-unit",
      estimatedTimeSec: 90,
      tags: ["circular-motion", "period", "rpm"],
      prerequisites: [],
    },
    (rng) => {
      const rpm = rng.pick([60, 120, 240, 300]);
      const T = sig2(60 / rpm);
      return {
        skill: L("Periodo de un movimiento circular", "Period of circular motion"),
        statement: L(
          `Un ventilador gira a $${rpm}\\ \\text{rpm}$ (revoluciones por minuto). ¿Cuánto vale su **periodo** de giro? (2 cifras significativas).`,
          `A fan spins at $${rpm}\\ \\text{rpm}$ (revolutions per minute). What is its rotation **period**? (2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: T,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["s"],
          unitChoices: ["s", "min", "Hz", "rad/s"],
        },
        hints: [
          L(
            "El periodo es el tiempo de **una** vuelta completa.",
            "The period is the time for **one** full revolution.",
          ),
          L(
            "Convierte las revoluciones por minuto a revoluciones por segundo dividiendo entre 60.",
            "Convert revolutions per minute to revolutions per second by dividing by 60.",
          ),
          L(
            "El periodo es el inverso de la frecuencia: $T = 1/f$.",
            "The period is the inverse of the frequency: $T = 1/f$.",
          ),
        ],
        answerDisplay: L(`$T = ${tok(T)}\\ \\text{s}$`, `$T = ${tok(T)}\\ \\text{s}$`),
        solution: [
          step(
            "given",
            `Frecuencia de giro: $${rpm}\\ \\text{rpm} = \\frac{${rpm}}{60}\\ \\text{Hz}$.`,
            `Spin frequency: $${rpm}\\ \\text{rpm} = \\frac{${rpm}}{60}\\ \\text{Hz}$.`,
          ),
          step(
            "approach",
            "Primero pasamos rpm a hertz (vueltas por segundo) y luego usamos $T = 1/f$.",
            "First convert rpm to hertz (turns per second), then use $T = 1/f$.",
          ),
          step(
            "calculation",
            `$f = \\frac{${rpm}}{60} = ${tok(r2(rpm / 60))}\\ \\text{Hz}$<br>$T = \\frac{1}{ ${tok(r2(rpm / 60))}} = ${tok(r2(60 / rpm))}\\ \\text{s} \\approx ${tok(T)}\\ \\text{s}$`,
            `$f = \\frac{${rpm}}{60} = ${tok(r2(rpm / 60))}\\ \\text{Hz}$<br>$T = \\frac{1}{ ${tok(r2(rpm / 60))}} = ${tok(r2(60 / rpm))}\\ \\text{s} \\approx ${tok(T)}\\ \\text{s}$`,
          ),
          step(
            "result",
            `El ventilador tarda $${tok(T)}\\ \\text{s}$ en dar una vuelta completa.`,
            `The fan takes $${tok(T)}\\ \\text{s}$ to complete one revolution.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Centripetal acceleration a = v²/r                                 */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "cg-accel-01",
      subject: "physics",
      topicId: "circular-gravitation",
      subtopicId: "centripetal-acceleration",
      difficulty: "easy",
      questionType: "numeric-unit",
      estimatedTimeSec: 90,
      tags: ["centripetal-acceleration", "circular-motion"],
      prerequisites: ["circular-motion"],
    },
    (rng) => {
      const v = rng.pick([4, 6, 8, 10, 12, 15, 18, 20]);
      const r = rng.pick([10, 20, 25, 40, 50, 80]);
      const a = sig2((v * v) / r);
      return {
        skill: L("Aceleración centrípeta", "Centripetal acceleration"),
        statement: L(
          `Un coche toma una curva circular de radio $${r}\\ \\text{m}$ con rapidez constante de $${v}\\ \\text{m/s}$. ¿Cuál es su **aceleración centrípeta**? (2 cifras significativas).`,
          `A car takes a circular curve of radius $${r}\\ \\text{m}$ at a constant speed of $${v}\\ \\text{m/s}$. What is its **centripetal acceleration**? (2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: a,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m/s^2", "m/s²"],
          unitChoices: ["m/s^2", "m/s", "m", "N"],
        },
        hints: [
          L(
            "Aunque la rapidez sea constante, la dirección de la velocidad cambia: por eso hay aceleración.",
            "Even at constant speed the velocity direction changes: that is why there is acceleration.",
          ),
          L(
            "La aceleración centrípeta apunta al centro y vale $a = \\frac{v^2}{r}$.",
            "The centripetal acceleration points to the centre and equals $a = \\frac{v^2}{r}$.",
          ),
          L(
            "Eleva la rapidez al cuadrado y divide entre el radio.",
            "Square the speed and divide by the radius.",
          ),
        ],
        answerDisplay: L(
          `$a = ${tok(a)}\\ \\text{m/s}^2$`,
          `$a = ${tok(a)}\\ \\text{m/s}^2$`,
        ),
        solution: [
          step(
            "given",
            `$v = ${v}\\ \\text{m/s}$, $r = ${r}\\ \\text{m}$ (rapidez constante).`,
            `$v = ${v}\\ \\text{m/s}$, $r = ${r}\\ \\text{m}$ (constant speed).`,
          ),
          step(
            "approach",
            "Movimiento circular uniforme: la aceleración es centrípeta, $a = v^2/r$.",
            "Uniform circular motion: the acceleration is centripetal, $a = v^2/r$.",
          ),
          step(
            "calculation",
            `$a = \\frac{${v}^2}{${r}} = \\frac{${v * v}}{${r}} = ${tok(r2((v * v) / r))}\\ \\text{m/s}^2 \\approx ${tok(a)}\\ \\text{m/s}^2$`,
            `$a = \\frac{${v}^2}{${r}} = \\frac{${v * v}}{${r}} = ${tok(r2((v * v) / r))}\\ \\text{m/s}^2 \\approx ${tok(a)}\\ \\text{m/s}^2$`,
          ),
          step(
            "result",
            `La aceleración centrípeta es $\\approx ${tok(a)}\\ \\text{m/s}^2$, dirigida hacia el centro de la curva.`,
            `The centripetal acceleration is $\\approx ${tok(a)}\\ \\text{m/s}^2$, directed toward the centre of the curve.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Centripetal acceleration a = ω²·r (angular speed)                */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "cg-accel-02",
      subject: "physics",
      topicId: "circular-gravitation",
      subtopicId: "centripetal-acceleration",
      difficulty: "easy",
      questionType: "numeric-unit",
      estimatedTimeSec: 90,
      tags: ["centripetal-acceleration", "angular-velocity", "circular-motion"],
      prerequisites: ["circular-motion"],
    },
    (rng) => {
      // Hand-curated (ω, r): ω²·r is exact, so no rounding is needed at all.
      const sets = [
        { w: 0.5, r: 8 },
        { w: 0.8, r: 5 },
        { w: 1.2, r: 5 },
        { w: 1.5, r: 4 },
        { w: 2, r: 2 },
        { w: 2, r: 1.5 },
      ];
      const p = rng.pick(sets);
      const w2 = r2(p.w * p.w);
      const a = clean(w2 * p.r);
      return {
        skill: L(
          "Aceleración centrípeta con velocidad angular",
          "Centripetal acceleration from angular speed",
        ),
        statement: L(
          `En un carrusel de feria, un caballo describe un círculo horizontal de radio $${tok(p.r)}\\ \\text{m}$ con velocidad angular constante $\\omega = ${tok(p.w)}\\ \\text{rad/s}$. ¿Cuál es su **aceleración centrípeta**? (2 cifras significativas).`,
          `At a fairground, a merry-go-round horse moves in a horizontal circle of radius $${tok(p.r)}\\ \\text{m}$ at a constant angular speed of $\\omega = ${tok(p.w)}\\ \\text{rad/s}$. What is its **centripetal acceleration**? (2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: a,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m/s^2", "m/s²"],
          unitChoices: ["m/s^2", "m/s", "rad/s", "m"],
        },
        hints: [
          L(
            "Aunque la velocidad angular sea constante, la dirección de la velocidad cambia: por eso hay aceleración centrípeta.",
            "Even at constant angular speed the direction of the velocity changes: that is why there is a centripetal acceleration.",
          ),
          L(
            "Con la velocidad angular, la aceleración centrípeta vale $a_c = \\omega^2 r$ (equivale a $\\frac{v^2}{r}$ porque $v = \\omega r$).",
            "In terms of the angular speed, the centripetal acceleration is $a_c = \\omega^2 r$ (equivalent to $\\frac{v^2}{r}$ because $v = \\omega r$).",
          ),
          L(
            "Eleva la velocidad angular al cuadrado y multiplica por el radio.",
            "Square the angular speed and multiply by the radius.",
          ),
        ],
        answerDisplay: L(
          `$a_c = ${tok(a)}\\ \\text{m/s}^2$`,
          `$a_c = ${tok(a)}\\ \\text{m/s}^2$`,
        ),
        solution: [
          step(
            "given",
            `$\\omega = ${tok(p.w)}\\ \\text{rad/s}$, $r = ${tok(p.r)}\\ \\text{m}$ (velocidad angular constante).`,
            `$\\omega = ${tok(p.w)}\\ \\text{rad/s}$, $r = ${tok(p.r)}\\ \\text{m}$ (constant angular speed).`,
          ),
          step(
            "approach",
            "Movimiento circular uniforme con la velocidad angular como dato: $a_c = \\omega^2 r$.",
            "Uniform circular motion with the angular speed as data: $a_c = \\omega^2 r$.",
          ),
          step(
            "calculation",
            `$a_c = ${tok(p.w)}^2 \\cdot ${tok(p.r)} = ${tok(w2)} \\cdot ${tok(p.r)} = ${tok(a)}\\ \\text{m/s}^2$`,
            `$a_c = ${tok(p.w)}^2 \\cdot ${tok(p.r)} = ${tok(w2)} \\cdot ${tok(p.r)} = ${tok(a)}\\ \\text{m/s}^2$`,
          ),
          step(
            "result",
            `La aceleración centrípeta es $${tok(a)}\\ \\text{m/s}^2$, dirigida hacia el eje del carrusel.`,
            `The centripetal acceleration is $${tok(a)}\\ \\text{m/s}^2$, directed toward the merry-go-round's axis.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Speed from centripetal acceleration (rearranging)                */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "cg-accel-03",
      subject: "physics",
      topicId: "circular-gravitation",
      subtopicId: "centripetal-acceleration",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 120,
      tags: ["centripetal-acceleration", "circular-motion", "rearranging"],
      prerequisites: ["circular-motion", "centripetal-acceleration"],
    },
    (rng) => {
      // Hand-curated (a, r): a·r is a perfect square, so v = √(a·r) is exact.
      const sets = [
        { a: 8, r: 50 },
        { a: 5, r: 20 },
        { a: 2, r: 50 },
        { a: 8, r: 200 },
        { a: 4.5, r: 50 },
        { a: 5, r: 80 },
      ];
      const p = rng.pick(sets);
      const ar = clean(p.a * p.r);
      const v = sig2(Math.sqrt(ar));
      return {
        skill: L("Rapidez a partir de la aceleración centrípeta", "Speed from centripetal acceleration"),
        statement: L(
          `Un coche toma una curva circular de radio $${tok(p.r)}\\ \\text{m}$ y sus ocupantes notan una aceleración centrípeta de $${tok(p.a)}\\ \\text{m/s}^2$. ¿Con qué **rapidez** circula el coche? (2 cifras significativas).`,
          `A car takes a circular curve of radius $${tok(p.r)}\\ \\text{m}$ and its occupants feel a centripetal acceleration of $${tok(p.a)}\\ \\text{m/s}^2$. At what **speed** is the car travelling? (2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: v,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m/s"],
          unitChoices: ["m/s", "km/h", "m/s^2", "m"],
        },
        hints: [
          L(
            "Identifica los datos: el radio y la aceleración centrípeta; la incógnita es la rapidez $v$.",
            "Identify the data: the radius and the centripetal acceleration; the unknown is the speed $v$.",
          ),
          L(
            "La relación entre las tres magnitudes es $a_c = \\frac{v^2}{r}$.",
            "The relation between the three quantities is $a_c = \\frac{v^2}{r}$.",
          ),
          L(
            "Despeja $v = \\sqrt{a_c\\,r}$ y sustituye los dos datos.",
            "Solve for $v = \\sqrt{a_c\\,r}$ and substitute the two data values.",
          ),
        ],
        answerDisplay: L(
          `$v = ${tok(v)}\\ \\text{m/s}$`,
          `$v = ${tok(v)}\\ \\text{m/s}$`,
        ),
        solution: [
          step(
            "given",
            `$a_c = ${tok(p.a)}\\ \\text{m/s}^2$, $r = ${tok(p.r)}\\ \\text{m}$.`,
            `$a_c = ${tok(p.a)}\\ \\text{m/s}^2$, $r = ${tok(p.r)}\\ \\text{m}$.`,
          ),
          step(
            "approach",
            "De $a_c = \\frac{v^2}{r}$ despejamos la rapidez: $v = \\sqrt{a_c\\,r}$.",
            "From $a_c = \\frac{v^2}{r}$ we solve for the speed: $v = \\sqrt{a_c\\,r}$.",
          ),
          step(
            "calculation",
            `$v = \\sqrt{ ${tok(p.a)} \\cdot ${tok(p.r)}} = \\sqrt{ ${tok(ar)}} = ${tok(v)}\\ \\text{m/s}$`,
            `$v = \\sqrt{ ${tok(p.a)} \\cdot ${tok(p.r)}} = \\sqrt{ ${tok(ar)}} = ${tok(v)}\\ \\text{m/s}$`,
          ),
          step(
            "result",
            `El coche circula a $${tok(v)}\\ \\text{m/s}$ (unos $${Math.round(v * 3.6)}\\ \\text{km/h}$).`,
            `The car is travelling at $${tok(v)}\\ \\text{m/s}$ (about $${Math.round(v * 3.6)}\\ \\text{km/h}$).`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Centripetal force F = mv²/r                                       */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "cg-force-01",
      subject: "physics",
      topicId: "circular-gravitation",
      subtopicId: "centripetal-force",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 150,
      tags: ["centripetal-force", "circular-motion", "newtons-laws"],
      prerequisites: ["centripetal-acceleration"],
    },
    (rng) => {
      const m = rng.pick([800, 1000, 1200, 1500]);
      const v = rng.pick([10, 14, 15, 18, 20, 25]);
      const r = rng.pick([25, 40, 50, 80, 100]);
      const F = sig2((m * v * v) / r);
      return {
        skill: L("Fuerza centrípeta", "Centripetal force"),
        statement: L(
          `Un coche de $${m}\\ \\text{kg}$ toma una curva plana de radio $${r}\\ \\text{m}$ a $${v}\\ \\text{m/s}$. ¿Qué **fuerza centrípeta** se necesita para mantenerlo en la curva? (2 cifras significativas).`,
          `A $${m}\\ \\text{kg}$ car rounds a flat curve of radius $${r}\\ \\text{m}$ at $${v}\\ \\text{m/s}$. What **centripetal force** is needed to keep it on the curve? (2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: F,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["N"],
          unitChoices: ["N", "kg", "m/s^2", "J"],
        },
        hints: [
          L(
            "La fuerza centrípeta es la segunda ley aplicada a la aceleración centrípeta: $F = m\\,a_c$.",
            "Centripetal force is the second law applied to centripetal acceleration: $F = m\\,a_c$.",
          ),
          L(
            "Sustituye $a_c$ por $\\frac{v^2}{r}$: queda $F = \\frac{m\\,v^2}{r}$.",
            "Replace $a_c$ with $\\frac{v^2}{r}$: you get $F = \\frac{m\\,v^2}{r}$.",
          ),
          L(
            "En una curva plana, esa fuerza la proporciona el rozamiento de los neumáticos.",
            "On a flat curve that force is provided by the friction of the tyres.",
          ),
        ],
        answerDisplay: L(`$F \\approx ${tok(F)}\\ \\text{N}$`, `$F \\approx ${tok(F)}\\ \\text{N}$`),
        solution: [
          step(
            "given",
            `$m = ${m}\\ \\text{kg}$, $v = ${v}\\ \\text{m/s}$, $r = ${r}\\ \\text{m}$.`,
            `$m = ${m}\\ \\text{kg}$, $v = ${v}\\ \\text{m/s}$, $r = ${r}\\ \\text{m}$.`,
          ),
          step(
            "approach",
            "Fuerza centrípeta: $F = \\frac{m\\,v^2}{r}$ (segunda ley con $a_c = v^2/r$).",
            "Centripetal force: $F = \\frac{m\\,v^2}{r}$ (second law with $a_c = v^2/r$).",
          ),
          step(
            "calculation",
            `$F = \\frac{${m} \\cdot ${v}^2}{${r}} = \\frac{${m} \\cdot ${v * v}}{${r}} = \\frac{${m * v * v}}{${r}} = ${tok(r2((m * v * v) / r))}\\ \\text{N} \\approx ${tok(F)}\\ \\text{N}$`,
            `$F = \\frac{${m} \\cdot ${v}^2}{${r}} = \\frac{${m} \\cdot ${v * v}}{${r}} = \\frac{${m * v * v}}{${r}} = ${tok(r2((m * v * v) / r))}\\ \\text{N} \\approx ${tok(F)}\\ \\text{N}$`,
          ),
          step(
            "result",
            `Se necesitan $\\approx ${tok(F)}\\ \\text{N}$ de fuerza centrípeta; en una curva plana los neumáticos deben ejercer ese rozamiento para no derrapar.`,
            `About $\\approx ${tok(F)}\\ \\text{N}$ of centripetal force are needed; on a flat curve the tyres must supply that friction to avoid skidding.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* What provides the centripetal force? (concept MC)                 */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "cg-concept-01",
      subject: "physics",
      topicId: "circular-gravitation",
      subtopicId: "centripetal-force",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["centripetal-force", "concept", "free-body-diagrams"],
      prerequisites: ["centripetal-force"],
    },
    (rng) => {
      const scens = [
        {
          es: "Un coche toma una curva plana a rapidez constante",
          en: "A car rounds a flat curve at constant speed",
          okEs: "El rozamiento entre los neumáticos y la carretera",
          okEn: "Friction between the tyres and the road",
          bad: [
            {
              es: "Una fuerza centrífuga que lo empuja hacia afuera",
              en: "A centrifugal force pushing it outward",
            },
            { es: "El peso del coche", en: "The weight of the car" },
            { es: "El empuje del motor", en: "The push of the engine" },
          ],
        },
        {
          es: "Una pelota atada a una cuerda gira en círculo horizontal",
          en: "A ball tied to a string swings in a horizontal circle",
          okEs: "La tensión de la cuerda",
          okEn: "The tension in the string",
          bad: [
            {
              es: "Una fuerza centrífuga que la empuja hacia afuera",
              en: "A centrifugal force pushing it outward",
            },
            { es: "El peso de la pelota", en: "The weight of the ball" },
            { es: "La resistencia del aire", en: "Air resistance" },
          ],
        },
        {
          es: "La Luna orbita alrededor de la Tierra",
          en: "The Moon orbits the Earth",
          okEs: "La fuerza gravitatoria de la Tierra",
          okEn: "The Earth's gravitational force",
          bad: [
            {
              es: "Una fuerza centrífuga que la aleja",
              en: "A centrifugal force pulling it away",
            },
            { es: "El campo magnético terrestre", en: "The Earth's magnetic field" },
            { es: "La presión de la luz del Sol", en: "The pressure of sunlight" },
          ],
        },
      ];
      const pick = rng.pick(scens);
      const options: McOption[] = [
        { id: "a", text: L(pick.okEs, pick.okEn), correct: true },
        { id: "b", text: L(pick.bad[0].es, pick.bad[0].en), correct: false },
        { id: "c", text: L(pick.bad[1].es, pick.bad[1].en), correct: false },
        { id: "d", text: L(pick.bad[2].es, pick.bad[2].en), correct: false },
      ];
      return {
        skill: L("Origen de la fuerza centrípeta", "Origin of the centripetal force"),
        statement: L(
          `${pick.es}. ¿Qué fuerza real actúa como **fuerza centrípeta** en este caso?`,
          `${pick.en}. Which real force acts as the **centripetal force** here?`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "La fuerza centrípeta apunta hacia el centro del círculo y es necesaria en todo movimiento circular.",
            "The centripetal force points toward the centre of the circle and is required for any circular motion.",
          ),
          L(
            "No es un tipo nuevo de fuerza: es un **papel** que desempeña alguna fuerza real (rozamiento, tensión, gravedad…).",
            "It is not a new kind of force: it is a **role** played by a real force (friction, tension, gravity…).",
          ),
          L(
            "Descarta la \"fuerza centrífuga\": vista desde un marco inercial, no es una fuerza que actúe sobre el objeto.",
            "Discard the \"centrifugal force\": seen from an inertial frame, it is not a force acting on the object.",
          ),
        ],
        answerDisplay: L(pick.okEs, pick.okEn),
        solution: [
          step("given", pick.es + ".", pick.en + "."),
          step(
            "approach",
            "Buscamos la fuerza real con componente hacia el centro del círculo.",
            "Look for the real force with a component toward the centre of the circle.",
          ),
          step(
            "calculation",
            "Sobre el objeto actúan varias fuerzas; solo la componente radial (hacia el centro) produce la aceleración centrípeta $a_c = v^2/r$.",
            "Several forces act on the object; only the radial (inward) component produces the centripetal acceleration $a_c = v^2/r$.",
          ),
          step(
            "result",
            `${pick.okEs}: es la fuerza que apunta hacia el centro y mantiene la trayectoria circular.`,
            `${pick.okEn}: it is the force pointing to the centre that keeps the path circular.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Tangential speed v = 2πr/T                                        */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "cg-speed-01",
      subject: "physics",
      topicId: "circular-gravitation",
      subtopicId: "circular-motion",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 150,
      tags: ["circular-motion", "speed", "period"],
      prerequisites: ["circular-motion"],
    },
    (rng) => {
      const r = rng.pick([0.5, 1, 1.5, 2]);
      const T = rng.pick([2, 2.5, 4, 5]);
      const v = sig2((2 * Math.PI * r) / T);
      return {
        skill: L("Rapidez en movimiento circular uniforme", "Speed in uniform circular motion"),
        statement: L(
          `Una piedra atada a una cuerda de $${tok(r)}\\ \\text{m}$ gira en círculo horizontal cada $${tok(T)}\\ \\text{s}$. ¿Con qué rapidez se mueve la piedra? (Usa la tecla $\\pi$ de tu calculadora; 2 cifras significativas).`,
          `A stone tied to a $${tok(r)}\\ \\text{m}$ string swings in a horizontal circle once every $${tok(T)}\\ \\text{s}$. What is the stone's speed? (Use the $\\pi$ key on your calculator; 2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: v,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m/s"],
          unitChoices: ["m/s", "m/s^2", "m", "rad/s"],
        },
        hints: [
          L(
            "En una vuelta, la piedra recorre una distancia igual a la longitud de la circunferencia.",
            "In one revolution the stone covers a distance equal to the circumference.",
          ),
          L(
            "La circunferencia es $2\\pi r$ y el tiempo de una vuelta es el periodo $T$.",
            "The circumference is $2\\pi r$ and the time for one revolution is the period $T$.",
          ),
          L(
            "Rapidez = distancia / tiempo: $v = \\frac{2\\pi r}{T}$.",
            "Speed = distance / time: $v = \\frac{2\\pi r}{T}$.",
          ),
        ],
        answerDisplay: L(`$v \\approx ${tok(v)}\\ \\text{m/s}$`, `$v \\approx ${tok(v)}\\ \\text{m/s}$`),
        solution: [
          step(
            "given",
            `$r = ${tok(r)}\\ \\text{m}$, $T = ${tok(T)}\\ \\text{s}$.`,
            `$r = ${tok(r)}\\ \\text{m}$, $T = ${tok(T)}\\ \\text{s}$.`,
          ),
          step(
            "approach",
            "Una vuelta por periodo: $v = \\frac{\\text{circunferencia}}{\\text{periodo}} = \\frac{2\\pi r}{T}$.",
            "One revolution per period: $v = \\frac{\\text{circumference}}{\\text{period}} = \\frac{2\\pi r}{T}$.",
          ),
          step(
            "calculation",
            `$v = \\frac{2\\pi \\cdot ${tok(r)}}{ ${tok(T)}} = \\frac{ ${tok(r2(2 * Math.PI * r))}}{ ${tok(T)}} = ${tok(r2((2 * Math.PI * r) / T))}\\ \\text{m/s} \\approx ${tok(v)}\\ \\text{m/s}$`,
            `$v = \\frac{2\\pi \\cdot ${tok(r)}}{ ${tok(T)}} = \\frac{ ${tok(r2(2 * Math.PI * r))}}{ ${tok(T)}} = ${tok(r2((2 * Math.PI * r) / T))}\\ \\text{m/s} \\approx ${tok(v)}\\ \\text{m/s}$`,
          ),
          step(
            "result",
            `La piedra se mueve con una rapidez de $\\approx ${tok(v)}\\ \\text{m/s}$.`,
            `The stone moves with a speed of $\\approx ${tok(v)}\\ \\text{m/s}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Geostationary satellite (concept MC)                              */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "cg-geo-01",
      subject: "physics",
      topicId: "circular-gravitation",
      subtopicId: "orbital-motion",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["orbital-motion", "satellites", "concept"],
      prerequisites: ["gravitational-force"],
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "Gira con un periodo de 24 h, igual que el de rotación de la Tierra",
            "It orbits with a 24 h period, matching Earth's rotation period",
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            "Está en reposo absoluto en el espacio",
            "It is at absolute rest in space",
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            "Su órbita pasa sobre los polos cada 12 h",
            "Its orbit passes over the poles every 12 h",
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            "Puede estar a cualquier altura y seguir siendo geoestacionario",
            "It can sit at any altitude and still be geostationary",
          ),
          correct: false,
        },
      ];
      return {
        skill: L("Satélites geoestacionarios", "Geostationary satellites"),
        statement: L(
          "Los satélites de telecomunicaciones **geoestacionarios** parecen fijos en el cielo. ¿Qué condición cumple su órbita?",
          "Geostationary telecommunications satellites appear fixed in the sky. What condition does their orbit satisfy?",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "\"Geoestacionario\" significa estacionario respecto a la superficie de la Tierra.",
            "\"Geostationary\" means stationary relative to Earth's surface.",
          ),
          L(
            "Para verse fijo desde el suelo, el satélite debe girar al mismo ritmo que la Tierra.",
            "To look fixed from the ground, the satellite must rotate at the same rate as Earth.",
          ),
          L(
            "Solo hay una altura de órbita (en el plano ecuatorial) cuyo periodo es exactamente 24 h.",
            "Only one orbital altitude (over the equatorial plane) gives a period of exactly 24 h.",
          ),
        ],
        answerDisplay: L(
          "Su periodo es de **24 h** (sincronizado con la rotación terrestre)",
          "Its period is **24 h** (synchronised with Earth's rotation)",
        ),
        solution: [
          step(
            "given",
            "Satélite geoestacionario: debe verse fijo desde un punto de la Tierra.",
            "Geostationary satellite: it must look fixed from a point on Earth.",
          ),
          step(
            "approach",
            "Comparamos el periodo orbital con el periodo de rotación de la Tierra.",
            "Compare the orbital period with Earth's rotation period.",
          ),
          step(
            "calculation",
            "La Tierra gira una vez cada 24 h; el satélite debe repetir su órbita en ese mismo tiempo, y eso solo ocurre a una altura concreta sobre el ecuador.",
            "Earth rotates once every 24 h; the satellite must repeat its orbit in that same time, which happens only at one specific altitude above the equator.",
          ),
          step(
            "result",
            "Un satélite geoestacionario tiene un periodo de 24 h, en órbita ecuatorial; no está en reposo, sino girando con la Tierra.",
            "A geostationary satellite has a 24 h period, in an equatorial orbit; it is not at rest but rotating with the Earth.",
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Newton's law of gravitation between two small masses              */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "cg-grav-01",
      subject: "physics",
      topicId: "circular-gravitation",
      subtopicId: "gravitational-force",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 180,
      tags: ["gravitation", "newton", "scientific-notation"],
      prerequisites: ["forces"],
    },
    (rng) => {
      const m1 = rng.pick([3, 4, 5, 6, 8]);
      const m2 = rng.pick([3, 4, 5, 6, 8]);
      const r = rng.pick([0.4, 0.5, 0.6, 0.8, 1]);
      const F = (G_CONST * m1 * m2) / (r * r);
      const { mant, exp } = sci2(F);
      return {
        skill: L("Fuerza gravitatoria entre dos masas", "Gravitational force between two masses"),
        statement: L(
          `Dos esferas de $${m1}\\ \\text{kg}$ y $${m2}\\ \\text{kg}$ tienen sus centros separados $${tok(r)}\\ \\text{m}$. ¿Con qué fuerza se atraen? Usa $G = 6{,}67\\times10^{-11}\\ \\text{N}\\cdot\\text{m}^2/\\text{kg}^2$ y da el resultado en notación científica (2 cifras significativas).`,
          `Two spheres of $${m1}\\ \\text{kg}$ and $${m2}\\ \\text{kg}$ have their centres $${tok(r)}\\ \\text{m}$ apart. With what force do they attract each other? Use $G = 6.67\\times10^{-11}\\ \\text{N}\\cdot\\text{m}^2/\\text{kg}^2$ and give the result in scientific notation (2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: clean(mant * Math.pow(10, exp)),
          tolerance: { mode: "sigfig", value: 2 },
          units: ["N"],
          unitChoices: ["N", "J", "N/m", "N·s"],
        },
        hints: [
          L(
            "Identifica los datos: $m_1$, $m_2$, $r$ y la constante $G$; la incógnita es $F$.",
            "Identify the data: $m_1$, $m_2$, $r$ and the constant $G$; the unknown is $F$.",
          ),
          L(
            "La ley de gravitación de Newton es $F = G\\,\\dfrac{m_1 m_2}{r^2}$.",
            "Newton's law of gravitation is $F = G\\,\\dfrac{m_1 m_2}{r^2}$.",
          ),
          L(
            "Sustituye y opera con potencias de 10: el resultado será muy pequeño (entre $10^{-10}$ y $10^{-8}$ N).",
            "Substitute and work with powers of ten: the result will be tiny (between $10^{-10}$ and $10^{-8}$ N).",
          ),
        ],
        answerDisplay: L(
          `$F \\approx ${tok(mant)}\\times10^{${exp}}\\ \\text{N}$`,
          `$F \\approx ${tok(mant)}\\times10^{${exp}}\\ \\text{N}$`,
        ),
        solution: [
          step(
            "given",
            `$m_1 = ${m1}\\ \\text{kg}$, $m_2 = ${m2}\\ \\text{kg}$, $r = ${tok(r)}\\ \\text{m}$, $G = 6{,}67\\times10^{-11}\\ \\text{N}\\cdot\\text{m}^2/\\text{kg}^2$.`,
            `$m_1 = ${m1}\\ \\text{kg}$, $m_2 = ${m2}\\ \\text{kg}$, $r = ${tok(r)}\\ \\text{m}$, $G = 6.67\\times10^{-11}\\ \\text{N}\\cdot\\text{m}^2/\\text{kg}^2$.`,
          ),
          step(
            "approach",
            "Aplicamos la ley de gravitación de Newton: $F = G\\,\\dfrac{m_1 m_2}{r^2}$.",
            "Apply Newton's law of gravitation: $F = G\\,\\dfrac{m_1 m_2}{r^2}$.",
          ),
          step(
            "calculation",
            `$F = 6{,}67\\times10^{-11} \\cdot \\dfrac{${m1} \\cdot ${m2}}{(${tok(r)})^2} = \\dfrac{6{,}67\\times10^{-11} \\cdot ${m1 * m2}}{ ${tok(r2(r * r))}} \\approx ${tok(mant)}\\times10^{${exp}}\\ \\text{N}$`,
            `$F = 6.67\\times10^{-11} \\cdot \\dfrac{${m1} \\cdot ${m2}}{(${tok(r)})^2} = \\dfrac{6.67\\times10^{-11} \\cdot ${m1 * m2}}{ ${tok(r2(r * r))}} \\approx ${tok(mant)}\\times10^{${exp}}\\ \\text{N}$`,
          ),
          step(
            "result",
            `Las esferas se atraen con una fuerza de $\\approx ${tok(mant)}\\times10^{${exp}}\\ \\text{N}$: minúscula, como corresponde a masas de kilogramos.`,
            `The spheres attract each other with a force of $\\approx ${tok(mant)}\\times10^{${exp}}\\ \\text{N}$: tiny, as expected for kilogram-scale masses.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Planet mass from surface gravity                                  */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "cg-grav-02",
      subject: "physics",
      topicId: "circular-gravitation",
      subtopicId: "gravitational-force",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 240,
      tags: ["gravitation", "planets", "scientific-notation"],
      prerequisites: ["gravitational-force"],
    },
    (rng) => {
      const bodies = [
        {
          es: "la Tierra",
          en: "Earth",
          g: 9.8,
          rEs: "6{,}37\\times10^{6}",
          rEn: "6.37\\times10^{6}",
          rVal: 6.37e6,
        },
        {
          es: "Marte",
          en: "Mars",
          g: 3.7,
          rEs: "3{,}39\\times10^{6}",
          rEn: "3.39\\times10^{6}",
          rVal: 3.39e6,
        },
        {
          es: "la Luna",
          en: "the Moon",
          g: 1.6,
          rEs: "1{,}74\\times10^{6}",
          rEn: "1.74\\times10^{6}",
          rVal: 1.74e6,
        },
      ];
      const pick = rng.pick(bodies);
      const M = (pick.g * pick.rVal * pick.rVal) / G_CONST;
      const { mant, exp } = sci2(M);
      return {
        skill: L("Masa de un planeta a partir de su gravedad", "Planet mass from its surface gravity"),
        statement: L(
          `En la superficie de ${pick.es} la gravedad es $g = ${tok(pick.g)}\\ \\text{m/s}^2$ y su radio es $R = ${pick.rEs}\\ \\text{m}$. Usa $G = 6{,}67\\times10^{-11}\\ \\text{N}\\cdot\\text{m}^2/\\text{kg}^2$ para estimar la **masa** del astro (2 cifras significativas).`,
          `On the surface of ${pick.en}, gravity is $g = ${tok(pick.g)}\\ \\text{m/s}^2$ and its radius is $R = ${pick.rEn}\\ \\text{m}$. Use $G = 6.67\\times10^{-11}\\ \\text{N}\\cdot\\text{m}^2/\\text{kg}^2$ to estimate the body's **mass** (2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: clean(mant * Math.pow(10, exp)),
          tolerance: { mode: "sigfig", value: 2 },
          units: ["kg"],
          unitChoices: ["kg", "g", "N", "m/s^2"],
        },
        hints: [
          L(
            "El peso en la superficie es la gravitación universal con $r = R$ (el radio del astro).",
            "Surface weight is universal gravitation with $r = R$ (the body's radius).",
          ),
          L(
            "Escribe $mg = G\\,\\dfrac{M\\,m}{R^2}$: la masa $m$ del objeto se cancela.",
            "Write $mg = G\\,\\dfrac{M\\,m}{R^2}$: the object's mass $m$ cancels.",
          ),
          L(
            "Despeja $M = \\dfrac{g\\,R^2}{G}$ y sustituye en notación científica.",
            "Solve for $M = \\dfrac{g\\,R^2}{G}$ and substitute in scientific notation.",
          ),
        ],
        answerDisplay: L(
          `$M \\approx ${tok(mant)}\\times10^{${exp}}\\ \\text{kg}$`,
          `$M \\approx ${tok(mant)}\\times10^{${exp}}\\ \\text{kg}$`,
        ),
        solution: [
          step(
            "given",
            `Astro: ${pick.es}; $g = ${tok(pick.g)}\\ \\text{m/s}^2$, $R = ${pick.rEs}\\ \\text{m}$, $G = 6{,}67\\times10^{-11}\\ \\text{N}\\cdot\\text{m}^2/\\text{kg}^2$.`,
            `Body: ${pick.en}; $g = ${tok(pick.g)}\\ \\text{m/s}^2$, $R = ${pick.rEn}\\ \\text{m}$, $G = 6.67\\times10^{-11}\\ \\text{N}\\cdot\\text{m}^2/\\text{kg}^2$.`,
          ),
          step(
            "approach",
            "Igualamos peso y gravitación en la superficie: $mg = G\\frac{Mm}{R^2} \\Rightarrow M = \\frac{g R^2}{G}$.",
            "Equate weight and gravitation at the surface: $mg = G\\frac{Mm}{R^2} \\Rightarrow M = \\frac{g R^2}{G}$.",
          ),
          step(
            "calculation",
            `$M = \\dfrac{ ${tok(pick.g)} \\cdot (${pick.rEs})^2}{6{,}67\\times10^{-11}} = \\dfrac{ ${tok(pick.g)} \\cdot ${tok(r2((pick.rVal * pick.rVal) / 1e12))}\\times10^{12}}{6{,}67\\times10^{-11}} \\approx ${tok(mant)}\\times10^{${exp}}\\ \\text{kg}$`,
            `$M = \\dfrac{ ${tok(pick.g)} \\cdot (${pick.rEn})^2}{6.67\\times10^{-11}} = \\dfrac{ ${tok(pick.g)} \\cdot ${tok(r2((pick.rVal * pick.rVal) / 1e12))}\\times10^{12}}{6.67\\times10^{-11}} \\approx ${tok(mant)}\\times10^{${exp}}\\ \\text{kg}$`,
          ),
          step(
            "result",
            `La masa de ${pick.es} es del orden de $${tok(mant)}\\times10^{${exp}}\\ \\text{kg}$.`,
            `The mass of ${pick.en} is of order $${tok(mant)}\\times10^{${exp}}\\ \\text{kg}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Orbital speed of a low satellite                                  */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "cg-orbit-01",
      subject: "physics",
      topicId: "circular-gravitation",
      subtopicId: "orbital-motion",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 240,
      tags: ["orbital-motion", "satellites", "gravitation"],
      prerequisites: ["gravitational-force", "centripetal-force"],
    },
    (rng) => {
      const h = rng.pick([300, 400, 500, 600]);
      const r = 6.37e6 + h * 1000;
      const M = 5.97e24;
      const GM = G_CONST * M;
      const v = Math.sqrt(GM / r);
      return {
        skill: L("Velocidad orbital de un satélite", "Orbital speed of a satellite"),
        statement: L(
          `La Estación Espacial Internacional orbita a unos $${h}\\ \\text{km}$ de altura sobre la Tierra. ¿Con qué **rapidez orbital** se mueve? Datos: $M_T = 5{,}97\\times10^{24}\\ \\text{kg}$, $R_T = 6{,}37\\times10^{6}\\ \\text{m}$, $G = 6{,}67\\times10^{-11}\\ \\text{N}\\cdot\\text{m}^2/\\text{kg}^2$ (2 cifras significativas).`,
          `The International Space Station orbits about $${h}\\ \\text{km}$ above the Earth. What **orbital speed** does it have? Data: $M_E = 5.97\\times10^{24}\\ \\text{kg}$, $R_E = 6.37\\times10^{6}\\ \\text{m}$, $G = 6.67\\times10^{-11}\\ \\text{N}\\cdot\\text{m}^2/\\text{kg}^2$ (2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: sig2(v),
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m/s"],
          unitChoices: ["m/s", "km/h", "m/s^2", "m"],
        },
        hints: [
          L(
            "El radio de la órbita no es la altura: es $r = R_T + h$ (¡en metros!).",
            "The orbital radius is not the altitude: it is $r = R_E + h$ (in metres!).",
          ),
          L(
            "La gravedad actúa como fuerza centrípeta: $G\\dfrac{M\\,m}{r^2} = \\dfrac{m\\,v^2}{r}$.",
            "Gravity acts as the centripetal force: $G\\dfrac{M\\,m}{r^2} = \\dfrac{m\\,v^2}{r}$.",
          ),
          L(
            "Simplifica y despeja $v = \\sqrt{\\dfrac{G\\,M}{r}}$; la masa del satélite no interviene.",
            "Simplify and solve $v = \\sqrt{\\dfrac{G\\,M}{r}}$; the satellite's mass does not appear.",
          ),
        ],
        answerDisplay: L(
          `$v \\approx ${tok(sig2(v))}\\ \\text{m/s}$`,
          `$v \\approx ${tok(sig2(v))}\\ \\text{m/s}$`,
        ),
        solution: [
          step(
            "given",
            `$h = ${h}\\ \\text{km} = ${h * 1000}\\ \\text{m}$, $R_T = 6{,}37\\times10^{6}\\ \\text{m}$, $M_T = 5{,}97\\times10^{24}\\ \\text{kg}$, $G = 6{,}67\\times10^{-11}$.`,
            `$h = ${h}\\ \\text{km} = ${h * 1000}\\ \\text{m}$, $R_E = 6.37\\times10^{6}\\ \\text{m}$, $M_E = 5.97\\times10^{24}\\ \\text{kg}$, $G = 6.67\\times10^{-11}$.`,
          ),
          step(
            "approach",
            "Gravedad = fuerza centrípeta: $G\\frac{Mm}{r^2} = \\frac{mv^2}{r} \\Rightarrow v = \\sqrt{\\frac{GM}{r}}$, con $r = R_T + h$.",
            "Gravity = centripetal force: $G\\frac{Mm}{r^2} = \\frac{mv^2}{r} \\Rightarrow v = \\sqrt{\\frac{GM}{r}}$, with $r = R_E + h$.",
          ),
          step(
            "calculation",
            `$r = 6{,}37\\times10^{6} + ${h * 1000} = ${tok(r1(r / 1e6))}\\times10^{6}\\ \\text{m}$<br>$GM = ${tok(r2(GM / 1e14))}\\times10^{14}\\ \\text{m}^3/\\text{s}^2$<br>$v = \\sqrt{\\dfrac{ ${tok(r2(GM / 1e14))}\\times10^{14}}{ ${tok(r1(r / 1e6))}\\times10^{6}}} = \\sqrt{ ${tok(r2((GM / r) / 1e7))}\\times10^{7}} = ${Math.round(v)} \\approx ${tok(sig2(v))}\\ \\text{m/s}$`,
            `$r = 6.37\\times10^{6} + ${h * 1000} = ${tok(r1(r / 1e6))}\\times10^{6}\\ \\text{m}$<br>$GM = ${tok(r2(GM / 1e14))}\\times10^{14}\\ \\text{m}^3/\\text{s}^2$<br>$v = \\sqrt{\\dfrac{ ${tok(r2(GM / 1e14))}\\times10^{14}}{ ${tok(r1(r / 1e6))}\\times10^{6}}} = \\sqrt{ ${tok(r2((GM / r) / 1e7))}\\times10^{7}} = ${Math.round(v)} \\approx ${tok(sig2(v))}\\ \\text{m/s}$`,
          ),
          step(
            "result",
            `La estación orbita a $\\approx ${tok(sig2(v))}\\ \\text{m/s}$ (unos $${Math.round((sig2(v) * 3.6) / 100) * 100}\\ \\text{km/h}$): ¡da una vuelta al mundo cada hora y media!`,
            `The station orbits at $\\approx ${tok(sig2(v))}\\ \\text{m/s}$ (about $${Math.round((sig2(v) * 3.6) / 100) * 100}\\ \\text{km/h}$): it circles the Earth every ninety minutes!`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Challenge: minimum speed at the top of a loop                     */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "cg-chal-01",
      subject: "physics",
      topicId: "circular-gravitation",
      subtopicId: "centripetal-force",
      difficulty: "challenge",
      questionType: "numeric-unit",
      estimatedTimeSec: 300,
      tags: ["centripetal-force", "vertical-circle", "rollercoaster"],
      prerequisites: ["centripetal-force", "centripetal-acceleration"],
    },
    (rng) => {
      const r = rng.pick([3, 4, 5, 6, 8, 10, 12]);
      const v = sig2(Math.sqrt(G_ACC * r));
      return {
        skill: L("Mínima rapidez en lo alto de un rizo", "Minimum speed at the top of a loop"),
        statement: L(
          `En una montaña rusa, el vagón recorre un rizo vertical de radio $${r}\\ \\text{m}$. ¿Cuál es la **mínima** rapidez en el punto más alto para que el vagón no pierda contacto con la vía? ($g = 9{,}8\\ \\text{m/s}^2$, 2 cifras significativas).`,
          `On a roller coaster, the car goes around a vertical loop of radius $${r}\\ \\text{m}$. What is the **minimum** speed at the highest point so the car does not lose contact with the track? ($g = 9.8\\ \\text{m/s}^2$, 2 significant figures).`,
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
            "En lo alto del rizo, tanto el peso como la normal apuntan hacia el centro (hacia abajo).",
            "At the top of the loop, both the weight and the normal force point toward the centre (downward).",
          ),
          L(
            "Segunda ley en lo alto: $mg + N = \\dfrac{m\\,v^2}{r}$.",
            "Second law at the top: $mg + N = \\dfrac{m\\,v^2}{r}$.",
          ),
          L(
            "La rapidez mínima corresponde al caso límite $N = 0$: solo el peso mantiene el círculo.",
            "The minimum speed corresponds to the limiting case $N = 0$: gravity alone keeps the circular path.",
          ),
        ],
        answerDisplay: L(
          `$v_{min} \\approx ${tok(v)}\\ \\text{m/s}$`,
          `$v_{min} \\approx ${tok(v)}\\ \\text{m/s}$`,
        ),
        solution: [
          step(
            "given",
            `Rizo vertical de radio $r = ${r}\\ \\text{m}$; en lo alto, $mg$ y $N$ apuntan hacia abajo (al centro); $g = 9{,}8\\ \\text{m/s}^2$.`,
            `Vertical loop of radius $r = ${r}\\ \\text{m}$; at the top, $mg$ and $N$ point downward (to the centre); $g = 9.8\\ \\text{m/s}^2$.`,
          ),
          step(
            "approach",
            "En lo alto: $mg + N = \\frac{m v^2}{r}$. El límite de contacto es $N = 0$, y entonces la gravedad sola es la fuerza centrípeta.",
            "At the top: $mg + N = \\frac{m v^2}{r}$. The contact limit is $N = 0$, where gravity alone is the centripetal force.",
          ),
          step(
            "calculation",
            `$mg = \\frac{m\\,v_{min}^2}{r} \\Rightarrow v_{min} = \\sqrt{g\\,r}$<br>$v_{min} = \\sqrt{9{,}8 \\cdot ${r}} = \\sqrt{ ${tok(r1(G_ACC * r))}} = ${tok(r2(Math.sqrt(G_ACC * r)))}\\ \\text{m/s} \\approx ${tok(v)}\\ \\text{m/s}$`,
            `$mg = \\frac{m\\,v_{min}^2}{r} \\Rightarrow v_{min} = \\sqrt{g\\,r}$<br>$v_{min} = \\sqrt{9.8 \\cdot ${r}} = \\sqrt{ ${tok(r1(G_ACC * r))}} = ${tok(r2(Math.sqrt(G_ACC * r)))}\\ \\text{m/s} \\approx ${tok(v)}\\ \\text{m/s}$`,
          ),
          step(
            "result",
            `La rapidez mínima en lo alto es $\\approx ${tok(v)}\\ \\text{m/s}$; curiosamente no depende de la masa del vagón.`,
            `The minimum speed at the top is $\\approx ${tok(v)}\\ \\text{m/s}$; interestingly, it does not depend on the car's mass.`,
          ),
        ],
      };
    },
  ),
];
