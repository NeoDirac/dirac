/**
 * PHYSICS · Oscillations & Waves
 *
 * SHM (mass-spring, pendulum), frequency/period, wavelength and wave speed,
 * superposition (path-difference interference) and standing waves. Includes
 * a motion-graph diagram problem (reading the period from x(t)) and symbolic
 * expression answers.
 */

import { template, L, step, tok } from "@/lib/problem";
import type { ProblemTemplate, McOption } from "@/lib/types";

/** Rounds to 2 significant figures (for sigfig-tolerance answers). */
const r2 = (n: number): number => Number(n.toPrecision(2));

export const templates: ProblemTemplate[] = [
  /* ---------------------------------------------------------------- */
  /* Frequency from period                                            */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "ow-freq-01",
      subject: "physics",
      topicId: "oscillations-waves",
      subtopicId: "frequency-period",
      difficulty: "easy",
      questionType: "numeric-unit",
      estimatedTimeSec: 75,
      tags: ["frequency", "period", "reciprocal"],
      prerequisites: [],
    },
    (rng) => {
      const per = rng.pick([0.125, 0.2, 0.25, 0.5, 2, 4, 5, 10]);
      const freq = r2(1 / per);
      return {
        skill: L("Frecuencia a partir del periodo", "Frequency from the period"),
        statement: L(
          `Un péndulo tarda $${tok(per)}\\ \\text{s}$ en completar una oscilación. ¿Cuál es su frecuencia? (en Hz, 2 cifras significativas)`,
          `A pendulum takes $${tok(per)}\\ \\text{s}$ to complete one oscillation. What is its frequency? (in Hz, 2 significant figures)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: freq,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["Hz", "hz", "hertz"],
          unitChoices: ["Hz", "s", "m", "m/s"],
        },
        hints: [
          L(
            "El dato es el tiempo de una oscilación completa (el periodo) y piden cuántas oscilaciones hay por segundo.",
            "The data is the time of one full oscillation (the period) and you need how many oscillations occur per second.",
          ),
          L(
            "Frecuencia y periodo son recíprocos: $f = 1/T$.",
            "Frequency and period are reciprocals: $f = 1/T$.",
          ),
          L(
            "Invierte el valor del periodo; la unidad de frecuencia es el hercio ($\\text{Hz} = 1/\\text{s}$).",
            "Invert the period value; the unit of frequency is the hertz ($\\text{Hz} = 1/\\text{s}$).",
          ),
        ],
        answerDisplay: L(`$f = ${tok(freq)}\\ \\text{Hz}$`, `$f = ${tok(freq)}\\ \\text{Hz}$`),
        solution: [
          step(
            "given",
            `Periodo: $T = ${tok(per)}\\ \\text{s}$.`,
            `Period: $T = ${tok(per)}\\ \\text{s}$.`,
          ),
          step(
            "approach",
            "La frecuencia es la inversa del periodo: $f = 1/T$.",
            "Frequency is the inverse of the period: $f = 1/T$.",
          ),
          step(
            "calculation",
            `$f = \\dfrac{1}{ ${tok(per)}\\ \\text{s}} = ${tok(freq)}\\ \\text{Hz}$`,
            `$f = \\dfrac{1}{ ${tok(per)}\\ \\text{s}} = ${tok(freq)}\\ \\text{Hz}$`,
          ),
          step(
            "result",
            `El péndulo oscila con una frecuencia de $${tok(freq)}\\ \\text{Hz}$.`,
            `The pendulum oscillates with a frequency of $${tok(freq)}\\ \\text{Hz}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Period from frequency                                            */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "ow-period-01",
      subject: "physics",
      topicId: "oscillations-waves",
      subtopicId: "frequency-period",
      difficulty: "easy",
      questionType: "numeric-unit",
      estimatedTimeSec: 75,
      tags: ["frequency", "period", "reciprocal"],
      prerequisites: [],
    },
    (rng) => {
      const freq = rng.pick([0.5, 1, 2, 4, 5, 10, 20, 25, 50, 100]);
      const per = r2(1 / freq);
      return {
        skill: L("Periodo a partir de la frecuencia", "Period from the frequency"),
        statement: L(
          `La rueda de una máquina gira con una frecuencia de $${tok(freq)}\\ \\text{Hz}$. ¿Cuánto dura una vuelta, es decir, cuál es su periodo? (en segundos, 2 cifras significativas)`,
          `A machine wheel rotates with a frequency of $${tok(freq)}\\ \\text{Hz}$. How long does one turn take, i.e. what is its period? (in seconds, 2 significant figures)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: per,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["s", "segundo", "segundos", "second", "seconds"],
          unitChoices: ["s", "Hz", "m", "m/s"],
        },
        hints: [
          L(
            "El dato es la frecuencia (vueltas por segundo) y piden el tiempo de una vuelta.",
            "The data is the frequency (turns per second) and you need the time of one turn.",
          ),
          L(
            "El periodo es el recíproco de la frecuencia: $T = 1/f$.",
            "The period is the reciprocal of the frequency: $T = 1/f$.",
          ),
          L(
            "Invierte el valor de la frecuencia para obtener el periodo en segundos.",
            "Invert the frequency value to obtain the period in seconds.",
          ),
        ],
        answerDisplay: L(`$T = ${tok(per)}\\ \\text{s}$`, `$T = ${tok(per)}\\ \\text{s}$`),
        solution: [
          step(
            "given",
            `Frecuencia: $f = ${tok(freq)}\\ \\text{Hz}$.`,
            `Frequency: $f = ${tok(freq)}\\ \\text{Hz}$.`,
          ),
          step(
            "approach",
            "El periodo es la inversa de la frecuencia: $T = 1/f$.",
            "The period is the inverse of the frequency: $T = 1/f$.",
          ),
          step(
            "calculation",
            `$T = \\dfrac{1}{ ${tok(freq)}\\ \\text{Hz}} = ${tok(per)}\\ \\text{s}$`,
            `$T = \\dfrac{1}{ ${tok(freq)}\\ \\text{Hz}} = ${tok(per)}\\ \\text{s}$`,
          ),
          step(
            "result",
            `Cada vuelta dura $${tok(per)}\\ \\text{s}$.`,
            `Each turn takes $${tok(per)}\\ \\text{s}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Wave speed v = f·λ                                               */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "ow-wave-01",
      subject: "physics",
      topicId: "oscillations-waves",
      subtopicId: "wave-speed",
      difficulty: "easy",
      questionType: "numeric-unit",
      estimatedTimeSec: 75,
      tags: ["wave-speed", "wavelength"],
      prerequisites: ["frequency-period", "wavelength"],
    },
    (rng) => {
      const freq = rng.pick([2, 4, 5, 10, 20, 25, 50]);
      const lam = rng.pick([0.5, 2, 4, 6, 8]);
      const speed = r2(freq * lam);
      return {
        skill: L("Rapidez de onda: $v = f\\lambda$", "Wave speed: $v = f\\lambda$"),
        statement: L(
          `Por una cuerda se propaga una onda con una frecuencia de $${tok(freq)}\\ \\text{Hz}$ y una longitud de onda de $${tok(lam)}\\ \\text{m}$. ¿Con qué rapidez viaja la onda? (en m/s, 2 cifras significativas)`,
          `A wave travels along a string with a frequency of $${tok(freq)}\\ \\text{Hz}$ and a wavelength of $${tok(lam)}\\ \\text{m}$. How fast does the wave travel? (in m/s, 2 significant figures)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: speed,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m/s"],
          unitChoices: ["m/s", "m", "Hz", "s"],
        },
        hints: [
          L(
            "Datos: frecuencia y longitud de onda; te piden la rapidez de propagación.",
            "Data: frequency and wavelength; you need the propagation speed.",
          ),
          L(
            "La ecuación de onda es $v = f\\,\\lambda$.",
            "The wave equation is $v = f\\,\\lambda$.",
          ),
          L(
            "Multiplica la frecuencia (en Hz) por la longitud de onda (en m).",
            "Multiply the frequency (in Hz) by the wavelength (in m).",
          ),
        ],
        answerDisplay: L(`$v = ${tok(speed)}\\ \\text{m/s}$`, `$v = ${tok(speed)}\\ \\text{m/s}$`),
        solution: [
          step(
            "given",
            `$f = ${tok(freq)}\\ \\text{Hz}$, $\\lambda = ${tok(lam)}\\ \\text{m}$`,
            `$f = ${tok(freq)}\\ \\text{Hz}$, $\\lambda = ${tok(lam)}\\ \\text{m}$`,
          ),
          step(
            "approach",
            "Ecuación de onda: $v = f\\,\\lambda$.",
            "Wave equation: $v = f\\,\\lambda$.",
          ),
          step(
            "calculation",
            `$v = ${tok(freq)}\\ \\text{Hz} \\cdot ${tok(lam)}\\ \\text{m} = ${tok(speed)}\\ \\text{m/s}$`,
            `$v = ${tok(freq)}\\ \\text{Hz} \\cdot ${tok(lam)}\\ \\text{m} = ${tok(speed)}\\ \\text{m/s}$`,
          ),
          step(
            "result",
            `La onda viaja a $${tok(speed)}\\ \\text{m/s}$.`,
            `The wave travels at $${tok(speed)}\\ \\text{m/s}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Mass-spring period                                               */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "ow-shm-01",
      subject: "physics",
      topicId: "oscillations-waves",
      subtopicId: "shm",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 150,
      tags: ["shm", "mass-spring", "period"],
      prerequisites: ["frequency-period"],
    },
    (rng) => {
      const [mass, k] = rng.pick([
        [0.1, 10], [0.1, 40], [0.2, 20], [0.5, 20], [0.5, 50], [0.5, 100],
        [1, 20], [1, 50], [1, 100], [2, 20], [2, 50], [2, 200],
      ]);
      const ratio = mass / k;
      const root = Math.sqrt(ratio);
      const per = r2(2 * Math.PI * root);
      return {
        skill: L("Periodo de un masa-muelle", "Period of a mass-spring system"),
        statement: L(
          `Un bloque de masa $${tok(mass)}\\ \\text{kg}$ cuelga de un muelle de constante $${k}\\ \\text{N/m}$ y oscila libremente. ¿Cuál es su periodo? (en segundos, 2 cifras significativas)`,
          `A block of mass $${tok(mass)}\\ \\text{kg}$ hangs from a spring of constant $${k}\\ \\text{N/m}$ and oscillates freely. What is its period? (in seconds, 2 significant figures)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: per,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["s", "segundo", "segundos", "second", "seconds"],
          unitChoices: ["s", "Hz", "m", "N/m"],
        },
        hints: [
          L(
            "Datos: la masa y la constante del muelle; la incógnita es el periodo de la oscilación.",
            "Data: the mass and the spring constant; the unknown is the oscillation period.",
          ),
          L(
            "Para un masa-muelle, $T = 2\\pi\\sqrt{m/k}$.",
            "For a mass-spring system, $T = 2\\pi\\sqrt{m/k}$.",
          ),
          L(
            "Calcula primero el cociente $m/k$, después su raíz cuadrada y multiplica por $2\\pi$.",
            "Compute the ratio $m/k$ first, then its square root, and multiply by $2\\pi$.",
          ),
        ],
        answerDisplay: L(`$T \\approx ${tok(per)}\\ \\text{s}$`, `$T \\approx ${tok(per)}\\ \\text{s}$`),
        solution: [
          step(
            "given",
            `$m = ${tok(mass)}\\ \\text{kg}$, $k = ${k}\\ \\text{N/m}$`,
            `$m = ${tok(mass)}\\ \\text{kg}$, $k = ${k}\\ \\text{N/m}$`,
          ),
          step(
            "approach",
            "Oscilación armónica simple de un muelle: $T = 2\\pi\\sqrt{m/k}$.",
            "Simple harmonic motion of a spring: $T = 2\\pi\\sqrt{m/k}$.",
          ),
          step(
            "calculation",
            `$\\dfrac{m}{k} = ${tok(ratio)}\\ \\text{kg}\\cdot\\text{m/N}$<br>$\\sqrt{m/k} = ${tok(Number(root.toFixed(3)))}$<br>$T = 2\\pi \\cdot ${tok(Number(root.toFixed(3)))} \\approx ${tok(per)}\\ \\text{s}$`,
            `$\\dfrac{m}{k} = ${tok(ratio)}\\ \\text{kg}\\cdot\\text{m/N}$<br>$\\sqrt{m/k} = ${tok(Number(root.toFixed(3)))}$<br>$T = 2\\pi \\cdot ${tok(Number(root.toFixed(3)))} \\approx ${tok(per)}\\ \\text{s}$`,
          ),
          step(
            "result",
            `El sistema oscila con un periodo de $\\approx ${tok(per)}\\ \\text{s}$.`,
            `The system oscillates with a period of $\\approx ${tok(per)}\\ \\text{s}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* SHM at key positions (conceptual MC)                             */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "ow-shm-03",
      subject: "physics",
      topicId: "oscillations-waves",
      subtopicId: "shm",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["shm", "velocity", "acceleration"],
      prerequisites: ["shm"],
    },
    (rng) => {
      const atExtreme = rng.bool();
      const options: McOption[] = [
        {
          id: "a",
          text: L("Velocidad máxima y aceleración máxima", "Maximum velocity and maximum acceleration"),
          correct: false,
        },
        {
          id: "b",
          text: L("Velocidad máxima y aceleración nula", "Maximum velocity and zero acceleration"),
          correct: !atExtreme,
        },
        {
          id: "c",
          text: L("Velocidad nula y aceleración máxima", "Zero velocity and maximum acceleration"),
          correct: atExtreme,
        },
        {
          id: "d",
          text: L("Velocidad nula y aceleración nula", "Zero velocity and zero acceleration"),
          correct: false,
        },
      ];
      return {
        skill: L("Velocidad y aceleración en el MAS", "Velocity and acceleration in SHM"),
        statement: L(
          atExtreme
            ? "Un objeto describe un movimiento armónico simple. ¿Cómo son su **velocidad** y su **aceleración** cuando se encuentra en un **extremo** de la oscilación (desplazamiento máximo)?"
            : "Un objeto describe un movimiento armónico simple. ¿Cómo son su **velocidad** y su **aceleración** cuando pasa por la **posición de equilibrio**?",
          atExtreme
            ? "An object undergoes simple harmonic motion. What are its **velocity** and **acceleration** when it is at an **extreme** of the oscillation (maximum displacement)?"
            : "An object undergoes simple harmonic motion. What are its **velocity** and **acceleration** as it passes through the **equilibrium position**?",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Piensa en un péndulo: ¿dónde va más rápido y dónde se detiene un instante?",
            "Think of a pendulum: where does it move fastest, and where does it momentarily stop?",
          ),
          L(
            "La fuerza restauradora $F = -kx$ (y por tanto $a$) es máxima donde el desplazamiento es máximo.",
            "The restoring force $F = -kx$ (and hence $a$) is maximum where the displacement is maximum.",
          ),
          L(
            "La energía se transforma: en los extremos toda es potencial y en el equilibrio toda es cinética.",
            "Energy transforms: at the extremes it is all potential, at equilibrium all kinetic.",
          ),
        ],
        answerDisplay: L(
          atExtreme
            ? "Velocidad nula y aceleración máxima"
            : "Velocidad máxima y aceleración nula",
          atExtreme
            ? "Zero velocity and maximum acceleration"
            : "Maximum velocity and zero acceleration",
        ),
        solution: [
          step(
            "given",
            atExtreme
              ? "Posición: extremo de la oscilación ($x = \\pm A$)."
              : "Posición: punto de equilibrio ($x = 0$).",
            atExtreme
              ? "Position: extreme of the oscillation ($x = \\pm A$)."
              : "Position: equilibrium point ($x = 0$).",
          ),
          step(
            "approach",
            "En el MAS la energía oscila entre cinética y potencial: $v$ es máxima donde $x = 0$ y $a = -\\omega^2 x$ es máxima donde $|x| = A$.",
            "In SHM energy oscillates between kinetic and potential: $v$ is maximum where $x = 0$, and $a = -\\omega^2 x$ is maximum where $|x| = A$.",
          ),
          step(
            "calculation",
            atExtreme
              ? "En $x = \\pm A$: toda la energía es potencial → $v = 0$; y $|a| = \\omega^2 A$ → máxima."
              : "En $x = 0$: toda la energía es cinética → $v$ máxima; y $a = -\\omega^2 \\cdot 0 = 0$.",
            atExtreme
              ? "At $x = \\pm A$: all the energy is potential → $v = 0$; and $|a| = \\omega^2 A$ → maximum."
              : "At $x = 0$: all the energy is kinetic → maximum $v$; and $a = -\\omega^2 \\cdot 0 = 0$.",
          ),
          step(
            "result",
            atExtreme
              ? "En el extremo: velocidad nula y aceleración máxima."
              : "En el equilibrio: velocidad máxima y aceleración nula.",
            atExtreme
              ? "At the extreme: zero velocity and maximum acceleration."
              : "At equilibrium: maximum velocity and zero acceleration.",
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Sound wavelength                                                 */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "ow-sound-01",
      subject: "physics",
      topicId: "oscillations-waves",
      subtopicId: "wavelength",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 120,
      tags: ["sound", "wavelength", "wave-equation"],
      prerequisites: ["wave-speed"],
    },
    (rng) => {
      const freq = rng.pick([50, 100, 170, 340, 680, 1700]);
      const lam = r2(340 / freq);
      return {
        skill: L("Longitud de onda del sonido", "Wavelength of sound"),
        statement: L(
          `Una nota musical de frecuencia $${tok(freq)}\\ \\text{Hz}$ se propaga por el aire con una rapidez de $340\\ \\text{m/s}$. ¿Cuál es su longitud de onda? (en metros, 2 cifras significativas)`,
          `A musical note of frequency $${tok(freq)}\\ \\text{Hz}$ travels through the air at $340\\ \\text{m/s}$. What is its wavelength? (in metres, 2 significant figures)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: lam,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m", "metro", "metros", "meter", "meters"],
          unitChoices: ["m", "Hz", "s", "m/s"],
        },
        hints: [
          L(
            "Datos: frecuencia y rapidez de la onda; te piden la longitud de onda.",
            "Data: the wave's frequency and speed; you need the wavelength.",
          ),
          L(
            "Despeja $\\lambda$ de la ecuación de onda $v = f\\lambda$.",
            "Solve $\\lambda$ from the wave equation $v = f\\lambda$.",
          ),
          L(
            "Divide la rapidez entre la frecuencia, ambos en unidades del SI.",
            "Divide the speed by the frequency, both in SI units.",
          ),
        ],
        answerDisplay: L(`$\\lambda = ${tok(lam)}\\ \\text{m}$`, `$\\lambda = ${tok(lam)}\\ \\text{m}$`),
        solution: [
          step(
            "given",
            `$f = ${tok(freq)}\\ \\text{Hz}$, $v = 340\\ \\text{m/s}$`,
            `$f = ${tok(freq)}\\ \\text{Hz}$, $v = 340\\ \\text{m/s}$`,
          ),
          step(
            "approach",
            "Ecuación de onda despejada: $\\lambda = v/f$.",
            "Rearranged wave equation: $\\lambda = v/f$.",
          ),
          step(
            "calculation",
            `$\\lambda = \\dfrac{340\\ \\text{m/s}}{ ${tok(freq)}\\ \\text{Hz}} = ${tok(lam)}\\ \\text{m}$`,
            `$\\lambda = \\dfrac{340\\ \\text{m/s}}{ ${tok(freq)}\\ \\text{Hz}} = ${tok(lam)}\\ \\text{m}$`,
          ),
          step(
            "result",
            `La longitud de onda de la nota es $${tok(lam)}\\ \\text{m}$.`,
            `The wavelength of the note is $${tok(lam)}\\ \\text{m}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* SHM period formula (expression answer)                           */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "ow-expr-01",
      subject: "physics",
      topicId: "oscillations-waves",
      subtopicId: "shm",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 150,
      tags: ["shm", "formula"],
      prerequisites: ["shm"],
    },
    (rng) => {
      void rng;
      return {
        skill: L("Fórmula del periodo del masa-muelle", "Mass-spring period formula"),
        statement: L(
          "Escribe el periodo $T$ de un oscilador masa-muelle en función de la masa **m** y de la constante elástica **k**. Usa pi para $\\pi$ y sqrt() para la raíz cuadrada (ejemplo de formato: pi*sqrt(m)).",
          "Write the period $T$ of a mass-spring oscillator in terms of the mass **m** and the spring constant **k**. Use pi for $\\pi$ and sqrt() for the square root (format example: pi*sqrt(m)).",
        ),
        answer: {
          kind: "expression",
          accepted: ["2*pi*sqrt(m/k)"],
          variables: ["m", "k"],
        },
        hints: [
          L(
            "El periodo depende de la masa y de lo rígido que es el muelle (su constante).",
            "The period depends on the mass and on how stiff the spring is (its constant).",
          ),
          L(
            "Más masa → periodo mayor; muelle más rígido → periodo menor: la masa va arriba y $k$ abajo dentro de una raíz.",
            "More mass → longer period; stiffer spring → shorter period: the mass goes on top and $k$ at the bottom, inside a square root.",
          ),
          L(
            "No olvides el factor $2\\pi$ que multiplica a la raíz.",
            "Do not forget the $2\\pi$ factor multiplying the root.",
          ),
        ],
        answerDisplay: L(`$T = 2\\pi\\sqrt{\\dfrac{m}{k}}$`, `$T = 2\\pi\\sqrt{\\dfrac{m}{k}}$`),
        solution: [
          step(
            "given",
            "Incógnita: $T$ en función de $m$ y $k$.",
            "Unknown: $T$ in terms of $m$ and $k$.",
          ),
          step(
            "approach",
            "La dinámica del masa-muelle ($F = -kx$) lleva a un movimiento armónico simple de periodo característico.",
            "The dynamics of the mass-spring system ($F = -kx$) leads to simple harmonic motion with a characteristic period.",
          ),
          step(
            "calculation",
            `$\\omega = \\sqrt{\\dfrac{k}{m}}$ y $T = \\dfrac{2\\pi}{\\omega}$, luego $T = 2\\pi\\sqrt{\\dfrac{m}{k}}$`,
            `$\\omega = \\sqrt{\\dfrac{k}{m}}$ and $T = \\dfrac{2\\pi}{\\omega}$, hence $T = 2\\pi\\sqrt{\\dfrac{m}{k}}$`,
          ),
          step(
            "result",
            "La respuesta es 2*pi*sqrt(m/k).",
            "The answer is 2*pi*sqrt(m/k).",
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Read the period from an x(t) graph (diagram)                     */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "ow-graph-01",
      subject: "physics",
      topicId: "oscillations-waves",
      subtopicId: "frequency-period",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 150,
      tags: ["shm", "graphs", "period"],
      prerequisites: ["shm", "frequency-period"],
    },
    (rng) => {
      const amp = rng.pick([2, 3, 4, 5]);
      const per = rng.pick([0.5, 1, 2, 4, 5]);
      const freq = r2(1 / per);
      const omega = (2 * Math.PI) / per;
      return {
        skill: L("Leer el periodo en una gráfica x–t", "Reading the period from an x–t graph"),
        statement: L(
          "La gráfica muestra la posición $x(t)$ de un oscilador en función del tiempo (en segundos). Determina su **frecuencia** (en Hz, 2 cifras significativas).",
          "The graph shows the position $x(t)$ of an oscillator as a function of time (in seconds). Determine its **frequency** (in Hz, 2 significant figures).",
        ),
        diagram: {
          kind: "function-graph",
          xMin: 0,
          xMax: 2 * per,
          yMin: -amp - 1,
          yMax: amp + 1,
          curves: [{ fn: `${amp}*cos(${omega.toFixed(4)}*x)`, color: "primary" }],
          points: [
            { x: 0, y: amp, label: `(0, ${amp})` },
            { x: per, y: amp, label: `(${per}, ${amp})` },
          ],
          xLabel: "t (s)",
          yLabel: "x (cm)",
          showGrid: true,
        },
        diagramLabel: L(
          `Curva cosenoidal que comienza en un máximo de ${amp} en t = 0 y vuelve a un máximo en t = ${per} s.`,
          `Cosine curve starting at a maximum of ${amp} at t = 0 and returning to a maximum at t = ${per} s.`,
        ),
        answer: {
          kind: "numeric-unit",
          value: freq,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["Hz", "hz", "hertz"],
          unitChoices: ["Hz", "s", "m", "m/s"],
        },
        hints: [
          L(
            "Busca en la gráfica dos **máximos** consecutivos (o dos pasos por el mismo punto en el mismo sentido).",
            "Find two consecutive **maxima** on the graph (or two crossings of the same point in the same direction).",
          ),
          L(
            "La separación temporal entre máximos consecutivos es el periodo $T$, y $f = 1/T$.",
            "The time between consecutive maxima is the period $T$, and $f = 1/T$.",
          ),
          L(
            "Usa las coordenadas de los dos puntos marcados: su diferencia de tiempos es $T$.",
            "Use the coordinates of the two marked points: their time difference is $T$.",
          ),
        ],
        answerDisplay: L(`$f = ${tok(freq)}\\ \\text{Hz}$`, `$f = ${tok(freq)}\\ \\text{Hz}$`),
        solution: [
          step(
            "given",
            `Máximos marcados en $t_1 = 0$ y $t_2 = ${tok(per)}\\ \\text{s}$, ambos con $x = ${amp}$.`,
            `Marked maxima at $t_1 = 0$ and $t_2 = ${tok(per)}\\ \\text{s}$, both with $x = ${amp}$.`,
          ),
          step(
            "approach",
            "El periodo es el tiempo de una oscilación completa (máximo a máximo); luego $f = 1/T$.",
            "The period is the time of one full oscillation (maximum to maximum); then $f = 1/T$.",
          ),
          step(
            "calculation",
            `$T = t_2 - t_1 = ${tok(per)}\\ \\text{s}$<br>$f = \\dfrac{1}{ ${tok(per)}} = ${tok(freq)}\\ \\text{Hz}$`,
            `$T = t_2 - t_1 = ${tok(per)}\\ \\text{s}$<br>$f = \\dfrac{1}{ ${tok(per)}} = ${tok(freq)}\\ \\text{Hz}$`,
          ),
          step(
            "result",
            `La frecuencia del oscilador es $${tok(freq)}\\ \\text{Hz}$.`,
            `The oscillator's frequency is $${tok(freq)}\\ \\text{Hz}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Pendulum length from period (hard)                               */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "ow-shm-02",
      subject: "physics",
      topicId: "oscillations-waves",
      subtopicId: "shm",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 180,
      tags: ["pendulum", "shm", "rearrangement"],
      prerequisites: ["shm"],
    },
    (rng) => {
      const per = rng.pick([1, 1.5, 2, 3, 4]);
      const len = r2((9.8 * per * per) / (4 * Math.PI * Math.PI));
      return {
        skill: L("Longitud de un péndulo a partir del periodo", "Pendulum length from its period"),
        statement: L(
          `¿De qué longitud debe ser un péndulo simple para que oscile con un periodo de $${tok(per)}\\ \\text{s}$? ($g = 9{,}8\\ \\text{m/s}^2$; resultado en metros, 2 cifras significativas)`,
          `How long must a simple pendulum be to swing with a period of $${tok(per)}\\ \\text{s}$? ($g = 9.8\\ \\text{m/s}^2$; answer in metres, 2 significant figures)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: len,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m", "metro", "metros", "meter", "meters"],
          unitChoices: ["m", "cm", "s", "Hz"],
        },
        hints: [
          L(
            "Dato: el periodo; incógnita: la longitud. Tendrás que despejar de la fórmula del péndulo.",
            "Data: the period; unknown: the length. You will have to rearrange the pendulum formula.",
          ),
          L(
            "Para un péndulo simple: $T = 2\\pi\\sqrt{L/g}$.",
            "For a simple pendulum: $T = 2\\pi\\sqrt{L/g}$.",
          ),
          L(
            "Despeja: eleva al cuadrado y multiplica: $L = \\dfrac{g\\,T^2}{4\\pi^2}$.",
            "Rearrange: square and multiply: $L = \\dfrac{g\\,T^2}{4\\pi^2}$.",
          ),
        ],
        answerDisplay: L(`$L \\approx ${tok(len)}\\ \\text{m}$`, `$L \\approx ${tok(len)}\\ \\text{m}$`),
        solution: [
          step(
            "given",
            `$T = ${tok(per)}\\ \\text{s}$, $g = 9{,}8\\ \\text{m/s}^2$`,
            `$T = ${tok(per)}\\ \\text{s}$, $g = 9.8\\ \\text{m/s}^2$`,
          ),
          step(
            "approach",
            "Fórmula del péndulo simple despejada: de $T = 2\\pi\\sqrt{L/g}$ sale $L = gT^2/(4\\pi^2)$.",
            "Rearranged simple-pendulum formula: from $T = 2\\pi\\sqrt{L/g}$ we get $L = gT^2/(4\\pi^2)$.",
          ),
          step(
            "calculation",
            `$L = \\dfrac{9{,}8 \\cdot (${tok(per)})^2}{4\\pi^2} = \\dfrac{ ${tok(r2(9.8 * per * per))}}{39{,}48} \\approx ${tok(len)}\\ \\text{m}$`,
            `$L = \\dfrac{9.8 \\cdot (${tok(per)})^2}{4\\pi^2} = \\dfrac{ ${tok(r2(9.8 * per * per))}}{39.48} \\approx ${tok(len)}\\ \\text{m}$`,
          ),
          step(
            "result",
            `El péndulo debe medir $\\approx ${tok(len)}\\ \\text{m}$.`,
            `The pendulum must be $\\approx ${tok(len)}\\ \\text{m}$ long.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Path difference: constructive vs destructive (hard MC)           */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "ow-super-01",
      subject: "physics",
      topicId: "oscillations-waves",
      subtopicId: "superposition",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 180,
      tags: ["superposition", "interference", "path-difference"],
      prerequisites: ["wavelength"],
    },
    (rng) => {
      const lambda = rng.pick([0.5, 1, 2, 4]);
      const constructive = rng.bool();
      const m = rng.pick([1, 2, 3]);
      const dist = constructive ? m * lambda : (m + 0.5) * lambda;
      const ratio = dist / lambda;
      const options: McOption[] = [
        {
          id: "a",
          text: L("Constructiva (un máximo)", "Constructive (a maximum)"),
          correct: constructive,
        },
        {
          id: "b",
          text: L("Destructiva (un mínimo)", "Destructive (a minimum)"),
          correct: !constructive,
        },
        {
          id: "c",
          text: L(
            "No hay interferencia: las ondas se cruzan sin afectarse",
            "There is no interference: the waves cross without affecting each other",
          ),
          correct: false,
        },
        {
          id: "d",
          text: L("Depende de la amplitud de los altavoces", "It depends on the speakers' amplitude"),
          correct: false,
        },
      ];
      return {
        skill: L("Interferencia por diferencia de caminos", "Interference from path difference"),
        statement: L(
          `Dos altavoces idénticos emiten en fase ondas sonoras de longitud de onda $${tok(lambda)}\\ \\text{m}$. En cierto punto, la diferencia de caminos hasta los dos altavoces es de $${tok(dist)}\\ \\text{m}$. ¿Qué tipo de interferencia hay en ese punto?`,
          `Two identical speakers emit in phase sound waves of wavelength $${tok(lambda)}\\ \\text{m}$. At a certain point the path difference to the two speakers is $${tok(dist)}\\ \\text{m}$. What kind of interference occurs there?`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Compara la diferencia de caminos con la longitud de onda: ¿cuántas longitudes de onda de diferencia hay?",
            "Compare the path difference with the wavelength: how many wavelengths of difference are there?",
          ),
          L(
            "Interferencia constructiva si $\\Delta d = n\\lambda$ (número entero de longitudes de onda); destructiva si $\\Delta d = (n + \\tfrac{1}{2})\\lambda$.",
            "Constructive interference if $\\Delta d = n\\lambda$ (whole number of wavelengths); destructive if $\\Delta d = (n + \\tfrac{1}{2})\\lambda$.",
          ),
          L(
            "Calcula el cociente $\\Delta d / \\lambda$ y mira si es un número entero o termina en $\\tfrac{1}{2}$.",
            "Compute the ratio $\\Delta d / \\lambda$ and see whether it is a whole number or ends in $\\tfrac{1}{2}$.",
          ),
        ],
        answerDisplay: L(
          constructive
            ? `Interferencia constructiva: $\\Delta d / \\lambda = ${tok(ratio)}$ es entero`
            : `Interferencia destructiva: $\\Delta d / \\lambda = ${tok(ratio)}$ es semientero`,
          constructive
            ? `Constructive interference: $\\Delta d / \\lambda = ${tok(ratio)}$ is a whole number`
            : `Destructive interference: $\\Delta d / \\lambda = ${tok(ratio)}$ is a half-integer`,
        ),
        solution: [
          step(
            "given",
            `$\\lambda = ${tok(lambda)}\\ \\text{m}$, diferencia de caminos $\\Delta d = ${tok(dist)}\\ \\text{m}$, fuentes en fase.`,
            `$\\lambda = ${tok(lambda)}\\ \\text{m}$, path difference $\\Delta d = ${tok(dist)}\\ \\text{m}$, sources in phase.`,
          ),
          step(
            "approach",
            "Con fuentes en fase: constructiva si $\\Delta d$ es un número entero de $\\lambda$; destructiva si es un número impar de medias $\\lambda$.",
            "With in-phase sources: constructive if $\\Delta d$ is a whole number of $\\lambda$; destructive if it is an odd number of half wavelengths.",
          ),
          step(
            "calculation",
            `$\\dfrac{\\Delta d}{\\lambda} = \\dfrac{ ${tok(dist)}}{ ${tok(lambda)}} = ${tok(ratio)}$ → ${constructive ? "número entero" : "número semientero"}`,
            `$\\dfrac{\\Delta d}{\\lambda} = \\dfrac{ ${tok(dist)}}{ ${tok(lambda)}} = ${tok(ratio)}$ → ${constructive ? "a whole number" : "a half-integer"}`,
          ),
          step(
            "result",
            constructive
              ? "Las dos ondas llegan en fase: interferencia constructiva (máximo)."
              : "Las dos ondas llegan en contrafase: interferencia destructiva (mínimo).",
            constructive
              ? "The two waves arrive in phase: constructive interference (a maximum)."
              : "The two waves arrive out of phase: destructive interference (a minimum).",
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Standing wave harmonic frequency                                 */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "ow-standing-01",
      subject: "physics",
      topicId: "oscillations-waves",
      subtopicId: "standing-waves",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 210,
      tags: ["standing-waves", "harmonics", "string"],
      prerequisites: ["wave-speed", "wavelength"],
    },
    (rng) => {
      const [n, speed, len] = rng.pick([
        [1, 20, 0.5], [2, 40, 1], [3, 60, 1.5], [2, 60, 1.5], [4, 80, 2],
        [1, 40, 2], [3, 80, 1.5], [2, 20, 0.5], [3, 40, 1.5], [4, 60, 1.5],
        [1, 60, 1.5], [5, 40, 1],
      ]);
      const lam = (2 * len) / n;
      const freq = r2(speed / lam);
      return {
        skill: L("Frecuencia de un armónico en una cuerda", "Frequency of a string harmonic"),
        statement: L(
          `Una cuerda de $${tok(len)}\\ \\text{m}$, fijada por ambos extremos, mantiene ondas transversales que viajan a $${speed}\\ \\text{m/s}$. ¿Cuál es la frecuencia del armónico número $${n}$? (en Hz, 2 cifras significativas)`,
          `A string of length $${tok(len)}\\ \\text{m}$, fixed at both ends, carries transverse waves travelling at $${speed}\\ \\text{m/s}$. What is the frequency of harmonic number $${n}$? (in Hz, 2 significant figures)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: freq,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["Hz", "hz", "hertz"],
          unitChoices: ["Hz", "s", "m", "m/s"],
        },
        hints: [
          L(
            "Una cuerda fija en ambos extremos solo puede oscilar con nodos en los extremos: la longitud debe contener un número entero de medias longitudes de onda.",
            "A string fixed at both ends can only vibrate with nodes at the ends: the length must hold a whole number of half wavelengths.",
          ),
          L(
            "La condición es $L = n\\,\\lambda/2$, es decir $\\lambda_n = 2L/n$.",
            "The condition is $L = n\\,\\lambda/2$, i.e. $\\lambda_n = 2L/n$.",
          ),
          L(
            "Con la longitud de onda del armónico, usa $f_n = v/\\lambda_n$.",
            "With the harmonic's wavelength, use $f_n = v/\\lambda_n$.",
          ),
        ],
        answerDisplay: L(`$f_{${n}} = ${tok(freq)}\\ \\text{Hz}$`, `$f_{${n}} = ${tok(freq)}\\ \\text{Hz}$`),
        solution: [
          step(
            "given",
            `$L = ${tok(len)}\\ \\text{m}$, $v = ${speed}\\ \\text{m/s}$, armónico $n = ${n}$.`,
            `$L = ${tok(len)}\\ \\text{m}$, $v = ${speed}\\ \\text{m/s}$, harmonic $n = ${n}$.`,
          ),
          step(
            "approach",
            "Cuerda fija en los extremos: $\\lambda_n = 2L/n$ y $f_n = v/\\lambda_n = n\\,v/(2L)$.",
            "String fixed at both ends: $\\lambda_n = 2L/n$ and $f_n = v/\\lambda_n = n\\,v/(2L)$.",
          ),
          step(
            "calculation",
            `$\\lambda_{${n}} = \\dfrac{2 \\cdot ${tok(len)}}{${n}} = ${tok(lam)}\\ \\text{m}$<br>$f_{${n}} = \\dfrac{${speed}}{ ${tok(lam)}} = ${tok(freq)}\\ \\text{Hz}$`,
            `$\\lambda_{${n}} = \\dfrac{2 \\cdot ${tok(len)}}{${n}} = ${tok(lam)}\\ \\text{m}$<br>$f_{${n}} = \\dfrac{${speed}}{ ${tok(lam)}} = ${tok(freq)}\\ \\text{Hz}$`,
          ),
          step(
            "result",
            `El armónico $${n}$ vibra a $${tok(freq)}\\ \\text{Hz}$.`,
            `Harmonic $${n}$ vibrates at $${tok(freq)}\\ \\text{Hz}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Challenge: tension → wave speed → fundamental frequency          */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "ow-chal-01",
      subject: "physics",
      topicId: "oscillations-waves",
      subtopicId: "standing-waves",
      difficulty: "challenge",
      questionType: "numeric-unit",
      estimatedTimeSec: 300,
      tags: ["standing-waves", "wave-speed", "multi-step", "string"],
      prerequisites: ["standing-waves", "wave-speed"],
    },
    (rng) => {
      const [tension, mu, len] = rng.pick([
        [20, 0.05, 0.5], [45, 0.05, 0.75], [80, 0.05, 1.0], [125, 0.05, 1.25],
        [50, 0.02, 0.5], [18, 0.02, 0.6], [72, 0.08, 0.5], [200, 0.08, 0.5],
        [8, 0.02, 0.4], [32, 0.08, 0.5], [125, 0.05, 1.0], [80, 0.05, 0.5],
      ]);
      const speed = Math.sqrt(tension / mu);
      const freq = r2(speed / (2 * len));
      return {
        skill: L("Del tirón a la nota: frecuencia fundamental", "From tension to note: fundamental frequency"),
        statement: L(
          `Una cuerda de guitarra de $${tok(len)}\\ \\text{m}$ tiene una densidad lineal de $${tok(mu)}\\ \\text{kg/m}$ y se tensa con una fuerza de $${tension}\\ \\text{N}$. ¿Cuál es la frecuencia de su **modo fundamental**? (en Hz, 2 cifras significativas)`,
          `A guitar string of length $${tok(len)}\\ \\text{m}$ has a linear density of $${tok(mu)}\\ \\text{kg/m}$ and is stretched with a force of $${tension}\\ \\text{N}$. What is the frequency of its **fundamental mode**? (in Hz, 2 significant figures)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: freq,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["Hz", "hz", "hertz"],
          unitChoices: ["Hz", "s", "m/s", "N"],
        },
        hints: [
          L(
            "Son dos pasos: primero la rapidez de la onda en la cuerda y después la frecuencia fundamental.",
            "There are two steps: first the wave speed on the string, then the fundamental frequency.",
          ),
          L(
            "La rapidez es $v = \\sqrt{F/\\mu}$ y el modo fundamental cumple $\\lambda_1 = 2L$, así que $f_1 = v/(2L)$.",
            "The speed is $v = \\sqrt{F/\\mu}$ and the fundamental mode satisfies $\\lambda_1 = 2L$, so $f_1 = v/(2L)$.",
          ),
          L(
            "Calcula $v$ con la tensión y la densidad lineal, y divídela entre $2L$.",
            "Compute $v$ from the tension and linear density, and divide it by $2L$.",
          ),
        ],
        answerDisplay: L(`$f_1 \\approx ${tok(freq)}\\ \\text{Hz}$`, `$f_1 \\approx ${tok(freq)}\\ \\text{Hz}$`),
        solution: [
          step(
            "given",
            `$L = ${tok(len)}\\ \\text{m}$, $\\mu = ${tok(mu)}\\ \\text{kg/m}$, tensión $F = ${tension}\\ \\text{N}$.`,
            `$L = ${tok(len)}\\ \\text{m}$, $\\mu = ${tok(mu)}\\ \\text{kg/m}$, tension $F = ${tension}\\ \\text{N}$.`,
          ),
          step(
            "approach",
            "Rapidez de onda en una cuerda: $v = \\sqrt{F/\\mu}$. Fundamental: $\\lambda_1 = 2L$ → $f_1 = v/(2L)$.",
            "Wave speed on a string: $v = \\sqrt{F/\\mu}$. Fundamental: $\\lambda_1 = 2L$ → $f_1 = v/(2L)$.",
          ),
          step(
            "calculation",
            `$\\dfrac{F}{\\mu} = \\dfrac{${tension}}{ ${tok(mu)}} = ${tok(tension / mu)}$<br>$v = \\sqrt{ ${tok(tension / mu)}} = ${tok(speed)}\\ \\text{m/s}$<br>$f_1 = \\dfrac{ ${tok(speed)}}{2 \\cdot ${tok(len)}} = ${tok(freq)}\\ \\text{Hz}$`,
            `$\\dfrac{F}{\\mu} = \\dfrac{${tension}}{ ${tok(mu)}} = ${tok(tension / mu)}$<br>$v = \\sqrt{ ${tok(tension / mu)}} = ${tok(speed)}\\ \\text{m/s}$<br>$f_1 = \\dfrac{ ${tok(speed)}}{2 \\cdot ${tok(len)}} = ${tok(freq)}\\ \\text{Hz}$`,
          ),
          step(
            "result",
            `La cuerda emite un fundamental de $\\approx ${tok(freq)}\\ \\text{Hz}$.`,
            `The string's fundamental is $\\approx ${tok(freq)}\\ \\text{Hz}$.`,
          ),
        ],
      };
    },
  ),
];
