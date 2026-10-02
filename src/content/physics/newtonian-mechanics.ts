/**
 * PHYSICS · Newtonian Mechanics
 *
 * Forces, free-body diagrams, Newton's laws, friction, tension,
 * inclines and connected systems. Free-body diagrams (kind: "free-body")
 * appear in three problems; answers use sigfig-2 tolerance with SI units.
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
  /* Newton's first law (conceptual MC)                                */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "nm-first-law-01",
      subject: "physics",
      topicId: "newtonian-mechanics",
      subtopicId: "newtons-laws",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 90,
      tags: ["newtons-laws", "first-law", "equilibrium"],
      prerequisites: ["forces"],
    },
    (rng) => {
      const scens = [
        {
          es: "Un libro permanece en reposo sobre una mesa",
          en: "A book remains at rest on a table",
        },
        {
          es: "Un coche avanza en línea recta por una carretera recta con velocidad constante",
          en: "A car moves along a straight road at constant velocity",
        },
        {
          es: "Una caja se desliza sobre hielo sin rozamiento con velocidad constante",
          en: "A box slides across frictionless ice at constant velocity",
        },
        {
          es: "Un ascensor sube con velocidad constante",
          en: "An elevator rises at constant velocity",
        },
      ];
      const pick = rng.pick(scens);
      const options: McOption[] = [
        { id: "a", text: L("Es cero", "It is zero"), correct: true },
        {
          id: "b",
          text: L("Es igual al peso del objeto", "It equals the object's weight"),
          correct: false,
        },
        {
          id: "c",
          text: L(
            "Apunta en la misma dirección del movimiento",
            "It points in the direction of motion",
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            "Es constante, pero distinta de cero",
            "It is constant but non-zero",
          ),
          correct: false,
        },
      ];
      return {
        skill: L("Primera ley de Newton", "Newton's first law"),
        statement: L(
          `${pick.es}. Según la **primera ley de Newton**, ¿qué puede afirmarse de la **fuerza neta** que actúa sobre el objeto?`,
          `${pick.en}. According to **Newton's first law**, what can be said about the **net force** acting on the object?`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "La primera ley dice que, sin fuerza neta, el estado de movimiento no cambia.",
            "The first law says that with no net force, the state of motion does not change.",
          ),
          L(
            "Clasifica el estado: ¿reposo o velocidad constante? Ambos significan aceleración nula.",
            "Classify the state: rest or constant velocity? Both mean zero acceleration.",
          ),
          L(
            "Aplica la segunda ley con $a = 0$: si $\\Sigma F = m a$ y $a = 0$, entonces $\\Sigma F = 0$.",
            "Apply the second law with $a = 0$: if $\\Sigma F = m a$ and $a = 0$, then $\\Sigma F = 0$.",
          ),
        ],
        answerDisplay: L(
          "La fuerza neta es **cero**",
          "The net force is **zero**",
        ),
        solution: [
          step("given", pick.es + ".", pick.en + "."),
          step(
            "approach",
            "Primera ley (inercia): si la velocidad no cambia (en módulo ni dirección), la fuerza neta es nula.",
            "First law (inertia): if the velocity does not change (in magnitude or direction), the net force is zero.",
          ),
          step(
            "calculation",
            "El estado es de reposo o de velocidad constante $\\Rightarrow a = 0\\ \\text{m/s}^2$.",
            "The state is rest or constant velocity $\\Rightarrow a = 0\\ \\text{m/s}^2$.",
          ),
          step(
            "result",
            "Como $a = 0$, la fuerza neta sobre el objeto es cero (las fuerzas individuales se equilibran).",
            "Since $a = 0$, the net force on the object is zero (the individual forces balance).",
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Second law: a = F/m                                               */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "nm-second-law-01",
      subject: "physics",
      topicId: "newtonian-mechanics",
      subtopicId: "newtons-laws",
      difficulty: "easy",
      questionType: "numeric-unit",
      estimatedTimeSec: 90,
      tags: ["newtons-laws", "second-law"],
      prerequisites: ["forces"],
    },
    (rng) => {
      const m = rng.pick([2, 3, 4, 5, 6, 8, 10, 12]);
      const a = rng.pick([1, 2, 3, 4, 5, 6]);
      const F = m * a;
      return {
        skill: L("Segunda ley de Newton", "Newton's second law"),
        statement: L(
          `Sobre un carro de $${m}\\ \\text{kg}$ actúa una fuerza neta de $${F}\\ \\text{N}$. ¿Qué aceleración adquiere? (2 cifras significativas).`,
          `A net force of $${F}\\ \\text{N}$ acts on a $${m}\\ \\text{kg}$ cart. What acceleration does it acquire? (2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: sig2(a),
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m/s^2", "m/s²"],
          unitChoices: ["m/s^2", "m/s", "N", "kg"],
        },
        hints: [
          L(
            "Datos: la masa y la fuerza neta; la incógnita es la aceleración.",
            "Data: the mass and the net force; the unknown is the acceleration.",
          ),
          L(
            "La segunda ley de Newton la conecta: $\\Sigma F = m\\,a$.",
            "Newton's second law links them: $\\Sigma F = m\\,a$.",
          ),
          L(
            "Despeja $a = \\Sigma F / m$ y sustituye.",
            "Rearrange to $a = \\Sigma F / m$ and substitute.",
          ),
        ],
        answerDisplay: L(
          `$a = ${tok(sig2(a))}\\ \\text{m/s}^2$`,
          `$a = ${tok(sig2(a))}\\ \\text{m/s}^2$`,
        ),
        solution: [
          step(
            "given",
            `$m = ${m}\\ \\text{kg}$, $\\Sigma F = ${F}\\ \\text{N}$`,
            `$m = ${m}\\ \\text{kg}$, $\\Sigma F = ${F}\\ \\text{N}$`,
          ),
          step(
            "approach",
            "Segunda ley de Newton: $\\Sigma F = m\\,a$, despejando $a$.",
            "Newton's second law: $\\Sigma F = m\\,a$, solving for $a$.",
          ),
          step(
            "calculation",
            `$a = \\frac{${F}\\ \\text{N}}{${m}\\ \\text{kg}} = ${tok(sig2(a))}\\ \\text{m/s}^2$`,
            `$a = \\frac{${F}\\ \\text{N}}{${m}\\ \\text{kg}} = ${tok(sig2(a))}\\ \\text{m/s}^2$`,
          ),
          step(
            "result",
            `El carro acelera a $${tok(sig2(a))}\\ \\text{m/s}^2$ en la dirección de la fuerza neta.`,
            `The cart accelerates at $${tok(sig2(a))}\\ \\text{m/s}^2$ in the direction of the net force.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Weight                                                            */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "nm-weight-01",
      subject: "physics",
      topicId: "newtonian-mechanics",
      subtopicId: "forces",
      difficulty: "easy",
      questionType: "numeric-unit",
      estimatedTimeSec: 90,
      tags: ["weight", "gravity", "forces"],
      prerequisites: ["newtons-laws"],
    },
    (rng) => {
      const m = rng.pick([3, 5, 8, 12, 15, 20, 25, 30, 40, 50]);
      const W = sig2(m * G_ACC);
      return {
        skill: L("Peso de un objeto", "Weight of an object"),
        statement: L(
          `Una mochila tiene una masa de $${m}\\ \\text{kg}$. ¿Cuál es su **peso** en la Tierra? Usa $g = 9{,}8\\ \\text{m/s}^2$ y da el resultado con 2 cifras significativas.`,
          `A backpack has a mass of $${m}\\ \\text{kg}$. What is its **weight** on Earth? Use $g = 9.8\\ \\text{m/s}^2$ and give the result to 2 significant figures.`,
        ),
        answer: {
          kind: "numeric-unit",
          value: W,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["N"],
          unitChoices: ["N", "kg", "m/s^2", "J"],
        },
        hints: [
          L(
            "Masa y peso son magnitudes distintas: la masa está en kg, el peso es una fuerza.",
            "Mass and weight are different: mass is in kg, weight is a force.",
          ),
          L(
            "El peso es la fuerza gravitatoria: $W = m\\,g$.",
            "Weight is the gravitational force: $W = m\\,g$.",
          ),
          L(
            "Sustituye la masa y $g$; el resultado queda en newtons.",
            "Substitute the mass and $g$; the result is in newtons.",
          ),
        ],
        answerDisplay: L(`$W = ${tok(W)}\\ \\text{N}$`, `$W = ${tok(W)}\\ \\text{N}$`),
        solution: [
          step(
            "given",
            `$m = ${m}\\ \\text{kg}$, $g = 9{,}8\\ \\text{m/s}^2$`,
            `$m = ${m}\\ \\text{kg}$, $g = 9.8\\ \\text{m/s}^2$`,
          ),
          step(
            "approach",
            "El peso es la fuerza de gravedad sobre la masa: $W = m\\,g$.",
            "Weight is the force of gravity on the mass: $W = m\\,g$.",
          ),
          step(
            "calculation",
            `$W = ${m}\\ \\text{kg} \\cdot 9{,}8\\ \\text{m/s}^2 = ${tok(r1(m * G_ACC))}\\ \\text{N} \\approx ${tok(W)}\\ \\text{N}$`,
            `$W = ${m}\\ \\text{kg} \\cdot 9.8\\ \\text{m/s}^2 = ${tok(r1(m * G_ACC))}\\ \\text{N} \\approx ${tok(W)}\\ \\text{N}$`,
          ),
          step(
            "result",
            `El peso de la mochila es $\\approx ${tok(W)}\\ \\text{N}$ (y su masa sigue siendo ${m} kg).`,
            `The backpack's weight is $\\approx ${tok(W)}\\ \\text{N}$ (its mass is still ${m} kg).`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Free-body diagram: normal force (MC)                              */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "nm-fbd-01",
      subject: "physics",
      topicId: "newtonian-mechanics",
      subtopicId: "free-body-diagrams",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["free-body-diagrams", "normal-force", "equilibrium"],
      prerequisites: ["forces", "newtons-laws"],
    },
    (rng) => {
      const m = rng.pick([6, 8, 10, 12, 15, 20]);
      const F = rng.pick([20, 30, 40, 50]);
      const W = r1(m * G_ACC);
      const options: McOption[] = [
        { id: "a", text: L(`$${tok(W)}\\ \\text{N}$`, `$${tok(W)}\\ \\text{N}$`), correct: true },
        {
          id: "b",
          text: L(`$${tok(r1(W + F))}\\ \\text{N}$`, `$${tok(r1(W + F))}\\ \\text{N}$`),
          correct: false,
        },
        {
          id: "c",
          text: L(`$${tok(r1(W - F))}\\ \\text{N}$`, `$${tok(r1(W - F))}\\ \\text{N}$`),
          correct: false,
        },
        { id: "d", text: L(`$${F}\\ \\text{N}$`, `$${F}\\ \\text{N}$`), correct: false },
      ];
      return {
        skill: L("Diagrama de cuerpo libre: fuerza normal", "Free-body diagram: normal force"),
        statement: L(
          `Una caja de $${m}\\ \\text{kg}$ está sobre el suelo horizontal. Se le aplica una fuerza horizontal de $${F}\\ \\text{N}$, como muestra el diagrama de cuerpo libre. ¿Cuánto vale la fuerza normal $N$? ($g = 9{,}8\\ \\text{m/s}^2$)`,
          `A $${m}\\ \\text{kg}$ crate sits on a horizontal floor. A horizontal force of $${F}\\ \\text{N}$ is applied to it, as the free-body diagram shows. What is the normal force $N$? ($g = 9.8\\ \\text{m/s}^2$)`,
        ),
        diagram: {
          kind: "free-body",
          massLabel: `${m} kg`,
          forces: [
            { label: "mg", dx: 0, dy: -1, color: "secondary" },
            { label: "N", dx: 0, dy: 1, color: "primary" },
            { label: "F", dx: 1, dy: 0, color: "primary" },
            { label: "f", dx: -1, dy: 0, color: "muted" },
          ],
        },
        diagramLabel: L(
          `Diagrama de cuerpo libre de una caja sobre el suelo: peso mg hacia abajo, normal N hacia arriba, fuerza aplicada F hacia la derecha y rozamiento f hacia la izquierda.`,
          `Free-body diagram of a crate on the floor: weight mg down, normal force N up, applied force F to the right, friction f to the left.`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Clasifica las fuerzas del diagrama en verticales ($mg$, $N$) y horizontales ($F$, $f$).",
            "Sort the forces in the diagram into vertical ($mg$, $N$) and horizontal ($F$, $f$).",
          ),
          L(
            "La caja no se mueve verticalmente: la aceleración vertical es cero, así que las fuerzas verticales se equilibran.",
            "The crate does not move vertically: the vertical acceleration is zero, so vertical forces balance.",
          ),
          L(
            "La fuerza $F$ es horizontal: no tiene componente vertical que se sume a $N$.",
            "The force $F$ is horizontal: it has no vertical component to add to $N$.",
          ),
        ],
        answerDisplay: L(`$N = ${tok(W)}\\ \\text{N}$`, `$N = ${tok(W)}\\ \\text{N}$`),
        solution: [
          step(
            "given",
            `$m = ${m}\\ \\text{kg}$, $F = ${F}\\ \\text{N}$ (horizontal), $g = 9{,}8\\ \\text{m/s}^2$`,
            `$m = ${m}\\ \\text{kg}$, $F = ${F}\\ \\text{N}$ (horizontal), $g = 9.8\\ \\text{m/s}^2$`,
          ),
          step(
            "approach",
            "Equilibrio vertical ($a_y = 0$): $N - mg = 0$. Las fuerzas horizontales no intervienen en el eje $y$.",
            "Vertical equilibrium ($a_y = 0$): $N - mg = 0$. Horizontal forces play no role along $y$.",
          ),
          step(
            "calculation",
            `$N = mg = ${m}\\ \\text{kg} \\cdot 9{,}8\\ \\text{m/s}^2 = ${tok(W)}\\ \\text{N}$`,
            `$N = mg = ${m}\\ \\text{kg} \\cdot 9.8\\ \\text{m/s}^2 = ${tok(W)}\\ \\text{N}$`,
          ),
          step(
            "result",
            `La fuerza normal vale $${tok(W)}\\ \\text{N}$, igual al peso: la fuerza horizontal $F$ no la modifica.`,
            `The normal force is $${tok(W)}\\ \\text{N}$, equal to the weight: the horizontal force $F$ does not change it.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Static friction: maximum value                                    */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "nm-friction-01",
      subject: "physics",
      topicId: "newtonian-mechanics",
      subtopicId: "friction",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 150,
      tags: ["friction", "static-friction", "normal-force"],
      prerequisites: ["forces", "free-body-diagrams"],
    },
    (rng) => {
      const m = rng.pick([5, 8, 10, 12, 15, 20, 25]);
      const mu = rng.pick([0.2, 0.3, 0.4, 0.5, 0.6]);
      const N = r1(m * G_ACC);
      const fmax = sig2(mu * m * G_ACC);
      return {
        skill: L("Rozamiento estático máximo", "Maximum static friction"),
        statement: L(
          `Una caja de $${m}\\ \\text{kg}$ reposa sobre un suelo horizontal. El coeficiente de rozamiento estático entre la caja y el suelo es $\\mu_e = ${tok(mu)}$. ¿Cuál es la **máxima** fuerza de rozamiento que el suelo puede ejercer sobre la caja? ($g = 9{,}8\\ \\text{m/s}^2$, 2 cifras significativas).`,
          `A $${m}\\ \\text{kg}$ crate rests on a horizontal floor. The coefficient of static friction between crate and floor is $\\mu_s = ${tok(mu)}$. What is the **maximum** friction force the floor can exert on the crate? ($g = 9.8\\ \\text{m/s}^2$, 2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: fmax,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["N"],
          unitChoices: ["N", "kg", "m/s^2", "J"],
        },
        hints: [
          L(
            "Primero necesitas la fuerza normal: sobre suelo horizontal, $N = mg$.",
            "You first need the normal force: on a horizontal floor, $N = mg$.",
          ),
          L(
            "El rozamiento estático máximo es $f_{max} = \\mu_e N$.",
            "The maximum static friction is $f_{max} = \\mu_s N$.",
          ),
          L(
            "Sustituye $N$ por $mg$ y calcula el producto.",
            "Replace $N$ with $mg$ and compute the product.",
          ),
        ],
        answerDisplay: L(
          `$f_{max} \\approx ${tok(fmax)}\\ \\text{N}$`,
          `$f_{max} \\approx ${tok(fmax)}\\ \\text{N}$`,
        ),
        solution: [
          step(
            "given",
            `$m = ${m}\\ \\text{kg}$, $\\mu_e = ${tok(mu)}$, $g = 9{,}8\\ \\text{m/s}^2$`,
            `$m = ${m}\\ \\text{kg}$, $\\mu_s = ${tok(mu)}$, $g = 9.8\\ \\text{m/s}^2$`,
          ),
          step(
            "approach",
            "Sobre suelo horizontal $N = mg$ y el rozamiento estático máximo es $f_{max} = \\mu_e N$.",
            "On a horizontal floor $N = mg$ and the maximum static friction is $f_{max} = \\mu_s N$.",
          ),
          step(
            "calculation",
            `$N = ${m} \\cdot 9{,}8 = ${tok(N)}\\ \\text{N}$<br>$f_{max} = ${tok(mu)} \\cdot ${tok(N)}\\ \\text{N} = ${tok(r2(mu * m * G_ACC))}\\ \\text{N} \\approx ${tok(fmax)}\\ \\text{N}$`,
            `$N = ${m} \\cdot 9.8 = ${tok(N)}\\ \\text{N}$<br>$f_{max} = ${tok(mu)} \\cdot ${tok(N)}\\ \\text{N} = ${tok(r2(mu * m * G_ACC))}\\ \\text{N} \\approx ${tok(fmax)}\\ \\text{N}$`,
          ),
          step(
            "result",
            `El suelo puede ejercer hasta $\\approx ${tok(fmax)}\\ \\text{N}$ de rozamiento; mientras la fuerza aplicada no supere ese valor, la caja no se mueve.`,
            `The floor can exert up to $\\approx ${tok(fmax)}\\ \\text{N}$ of friction; as long as the applied force does not exceed it, the crate stays put.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Tension in an accelerating elevator                                */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "nm-tension-01",
      subject: "physics",
      topicId: "newtonian-mechanics",
      subtopicId: "tension",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 180,
      tags: ["tension", "newtons-laws", "elevator"],
      prerequisites: ["newtons-laws"],
    },
    (rng) => {
      const combos = [
        { m: 40, a: 1.5 },
        { m: 50, a: 2.5 },
        { m: 60, a: 2 },
        { m: 70, a: 1 },
        { m: 55, a: 2 },
      ];
      const pick = rng.pick(combos);
      const T = sig2(pick.m * (G_ACC + pick.a));
      return {
        skill: L("Tensión con aceleración", "Tension under acceleration"),
        statement: L(
          `Un ascensor de $${pick.m}\\ \\text{kg}$ sube acelerando hacia arriba con $a = ${tok(pick.a)}\\ \\text{m/s}^2$, colgado de un cable. ¿Qué **tensión** soporta el cable? ($g = 9{,}8\\ \\text{m/s}^2$, 2 cifras significativas).`,
          `A $${pick.m}\\ \\text{kg}$ elevator accelerates upward at $a = ${tok(pick.a)}\\ \\text{m/s}^2$, hanging from a cable. What **tension** does the cable carry? ($g = 9.8\\ \\text{m/s}^2$, 2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: T,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["N"],
          unitChoices: ["N", "kg", "m/s^2", "J"],
        },
        hints: [
          L(
            "Dibuja las fuerzas sobre el ascensor: el peso $mg$ hacia abajo y la tensión $T$ hacia arriba.",
            "Draw the forces on the elevator: the weight $mg$ down and the tension $T$ up.",
          ),
          L(
            "Como acelera hacia arriba, $T$ debe ser mayor que el peso: $T - mg = m\\,a$.",
            "Since it accelerates upward, $T$ must exceed the weight: $T - mg = m\\,a$.",
          ),
          L(
            "Despeja $T = m(g + a)$ y sustituye.",
            "Solve for $T = m(g + a)$ and substitute.",
          ),
        ],
        answerDisplay: L(`$T \\approx ${tok(T)}\\ \\text{N}$`, `$T \\approx ${tok(T)}\\ \\text{N}$`),
        solution: [
          step(
            "given",
            `$m = ${pick.m}\\ \\text{kg}$, $a = ${tok(pick.a)}\\ \\text{m/s}^2$ (hacia arriba), $g = 9{,}8\\ \\text{m/s}^2$`,
            `$m = ${pick.m}\\ \\text{kg}$, $a = ${tok(pick.a)}\\ \\text{m/s}^2$ (upward), $g = 9.8\\ \\text{m/s}^2$`,
          ),
          step(
            "approach",
            "Segunda ley en el eje vertical (positivo hacia arriba): $T - mg = m\\,a$.",
            "Second law along the vertical axis (positive up): $T - mg = m\\,a$.",
          ),
          step(
            "calculation",
            `$T = m(g + a) = ${pick.m}\\ \\text{kg} \\cdot (9{,}8 + ${tok(pick.a)})\\ \\text{m/s}^2$<br>$T = ${pick.m} \\cdot ${tok(r1(G_ACC + pick.a))} = ${tok(r1(pick.m * (G_ACC + pick.a)))}\\ \\text{N} \\approx ${tok(T)}\\ \\text{N}$`,
            `$T = m(g + a) = ${pick.m}\\ \\text{kg} \\cdot (9.8 + ${tok(pick.a)})\\ \\text{m/s}^2$<br>$T = ${pick.m} \\cdot ${tok(r1(G_ACC + pick.a))} = ${tok(r1(pick.m * (G_ACC + pick.a)))}\\ \\text{N} \\approx ${tok(T)}\\ \\text{N}$`,
          ),
          step(
            "result",
            `El cable soporta una tensión de $\\approx ${tok(T)}\\ \\text{N}$, mayor que el peso de $${tok(r1(pick.m * G_ACC))}\\ \\text{N}$ porque el ascensor acelera hacia arriba.`,
            `The cable carries a tension of $\\approx ${tok(T)}\\ \\text{N}$, larger than the weight of $${tok(r1(pick.m * G_ACC))}\\ \\text{N}$ because the elevator accelerates upward.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Free-body diagram + friction: acceleration (diagram)              */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "nm-fbd-02",
      subject: "physics",
      topicId: "newtonian-mechanics",
      subtopicId: "free-body-diagrams",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 240,
      tags: ["free-body-diagrams", "friction", "newtons-laws"],
      prerequisites: ["free-body-diagrams", "friction"],
    },
    (rng) => {
      const combos = [
        { m: 10, F: 50, mu: 0.2 },
        { m: 20, F: 100, mu: 0.3 },
        { m: 5, F: 40, mu: 0.4 },
        { m: 15, F: 80, mu: 0.25 },
        { m: 25, F: 120, mu: 0.35 },
      ];
      const pick = rng.pick(combos);
      const N = r1(pick.m * G_ACC);
      const f = r1(pick.mu * pick.m * G_ACC);
      const a = sig2((pick.F - f) / pick.m);
      return {
        skill: L("Fuerza neta con rozamiento", "Net force with friction"),
        statement: L(
          `Se empuja una caja de $${pick.m}\\ \\text{kg}$ con una fuerza horizontal de $${pick.F}\\ \\text{N}$, como muestra el diagrama. La caja se desliza y el coeficiente de rozamiento cinético es $\\mu_c = ${tok(pick.mu)}$. ¿Qué **aceleración** adquiere la caja? ($g = 9{,}8\\ \\text{m/s}^2$, 2 cifras significativas).`,
          `A $${pick.m}\\ \\text{kg}$ crate is pushed with a horizontal force of $${pick.F}\\ \\text{N}$, as the diagram shows. The crate slides and the coefficient of kinetic friction is $\\mu_k = ${tok(pick.mu)}$. What **acceleration** does the crate acquire? ($g = 9.8\\ \\text{m/s}^2$, 2 significant figures).`,
        ),
        diagram: {
          kind: "free-body",
          massLabel: `${pick.m} kg`,
          forces: [
            { label: "mg", dx: 0, dy: -1, color: "secondary" },
            { label: "N", dx: 0, dy: 1, color: "primary" },
            { label: "F", dx: 1, dy: 0, color: "primary" },
            { label: "f", dx: -1, dy: 0, color: "muted" },
          ],
        },
        diagramLabel: L(
          `Diagrama de cuerpo libre de la caja: peso mg abajo, normal N arriba, fuerza aplicada F a la derecha y rozamiento cinético f a la izquierda.`,
          `Free-body diagram of the crate: weight mg down, normal force N up, applied force F right, kinetic friction f left.`,
        ),
        answer: {
          kind: "numeric-unit",
          value: a,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m/s^2", "m/s²"],
          unitChoices: ["m/s^2", "m/s", "N", "kg"],
        },
        hints: [
          L(
            "Calcula primero la fuerza normal (equilibrio vertical) y después el rozamiento $f = \\mu_c N$.",
            "First find the normal force (vertical equilibrium), then the friction $f = \\mu_k N$.",
          ),
          L(
            "En el eje horizontal solo quedan $F$ y $f$: la fuerza neta es su diferencia.",
            "Along the horizontal axis only $F$ and $f$ remain: the net force is their difference.",
          ),
          L(
            "Aplica $a = \\Sigma F / m$ con $\\Sigma F = F - f$.",
            "Apply $a = \\Sigma F / m$ with $\\Sigma F = F - f$.",
          ),
        ],
        answerDisplay: L(
          `$a \\approx ${tok(a)}\\ \\text{m/s}^2$`,
          `$a \\approx ${tok(a)}\\ \\text{m/s}^2$`,
        ),
        solution: [
          step(
            "given",
            `$m = ${pick.m}\\ \\text{kg}$, $F = ${pick.F}\\ \\text{N}$, $\\mu_c = ${tok(pick.mu)}$, $g = 9{,}8\\ \\text{m/s}^2$`,
            `$m = ${pick.m}\\ \\text{kg}$, $F = ${pick.F}\\ \\text{N}$, $\\mu_k = ${tok(pick.mu)}$, $g = 9.8\\ \\text{m/s}^2$`,
          ),
          step(
            "approach",
            "Eje vertical: $N = mg$. Eje horizontal: $\\Sigma F = F - f$ con $f = \\mu_c N$; luego $a = \\Sigma F/m$.",
            "Vertical axis: $N = mg$. Horizontal axis: $\\Sigma F = F - f$ with $f = \\mu_k N$; then $a = \\Sigma F/m$.",
          ),
          step(
            "calculation",
            `$N = ${pick.m} \\cdot 9{,}8 = ${tok(N)}\\ \\text{N}$<br>$f = ${tok(pick.mu)} \\cdot ${tok(N)} = ${tok(f)}\\ \\text{N}$<br>$\\Sigma F = ${pick.F} - ${tok(f)} = ${tok(r1(pick.F - f))}\\ \\text{N}$<br>$a = \\frac{ ${tok(r1(pick.F - f))}}{${pick.m}} = ${tok(r2((pick.F - f) / pick.m))} \\approx ${tok(a)}\\ \\text{m/s}^2$`,
            `$N = ${pick.m} \\cdot 9.8 = ${tok(N)}\\ \\text{N}$<br>$f = ${tok(pick.mu)} \\cdot ${tok(N)} = ${tok(f)}\\ \\text{N}$<br>$\\Sigma F = ${pick.F} - ${tok(f)} = ${tok(r1(pick.F - f))}\\ \\text{N}$<br>$a = \\frac{ ${tok(r1(pick.F - f))}}{${pick.m}} = ${tok(r2((pick.F - f) / pick.m))} \\approx ${tok(a)}\\ \\text{m/s}^2$`,
          ),
          step(
            "result",
            `La caja acelera a $\\approx ${tok(a)}\\ \\text{m/s}^2$ en la dirección del empujón.`,
            `The crate accelerates at $\\approx ${tok(a)}\\ \\text{m/s}^2$ in the direction of the push.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Finding μ from a skid                                             */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "nm-friction-02",
      subject: "physics",
      topicId: "newtonian-mechanics",
      subtopicId: "friction",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 240,
      tags: ["friction", "kinematics", "deceleration"],
      prerequisites: ["friction", "newtons-laws"],
    },
    (rng) => {
      // (v0, d) pairs chosen so the deduced μ stays in a realistic
      // tyre-on-dry-asphalt range (≈ 0.5–0.7) for every variant.
      const skids = [
        { v0: 10, d: 10 },
        { v0: 12, d: 12.5 },
        { v0: 14, d: 16 },
        { v0: 16, d: 20 },
        { v0: 20, d: 30 },
      ];
      const pick = rng.pick(skids);
      const v0 = pick.v0;
      const d = pick.d;
      const aDec = r2((v0 * v0) / (2 * d));
      const mu = sig2(aDec / G_ACC);
      return {
        skill: L("Coeficiente de rozamiento desde una frenada", "Friction coefficient from a skid"),
        statement: L(
          `Un coche circula a $${v0}\\ \\text{m/s}$ y el conductor frena con las ruedas bloqueadas; el coche se detiene tras recorrer $${tok(d)}\\ \\text{m}$. ¿Qué **coeficiente de rozamiento cinético** se deduce? ($g = 9{,}8\\ \\text{m/s}^2$; el resultado no tiene unidades; 2 cifras significativas).`,
          `A car travels at $${v0}\\ \\text{m/s}$ and the driver brakes with locked wheels; the car stops after $${tok(d)}\\ \\text{m}$. What **coefficient of kinetic friction** follows? ($g = 9.8\\ \\text{m/s}^2$; the result has no units; 2 significant figures).`,
        ),
        answer: {
          kind: "numeric",
          value: mu,
          tolerance: { mode: "sigfig", value: 2 },
        },
        hints: [
          L(
            "Primero halla la deceleración: parte de $v_0$ y se detiene tras $d$; usa $v^2 = v_0^2 - 2\\,a\\,d$.",
            "First find the deceleration: it starts at $v_0$ and stops after $d$; use $v^2 = v_0^2 - 2\\,a\\,d$.",
          ),
          L(
            "La única fuerza horizontal es el rozamiento: $\\mu_c\\,m\\,g = m\\,a$, así que $a = \\mu_c g$.",
            "Friction is the only horizontal force: $\\mu_k\\,m\\,g = m\\,a$, so $a = \\mu_k g$.",
          ),
          L(
            "Despeja $\\mu_c = a/g$; la masa no aparece en el resultado.",
            "Solve for $\\mu_k = a/g$; the mass does not appear in the result.",
          ),
        ],
        answerDisplay: L(
          `$\\mu_c \\approx ${tok(mu)}$`,
          `$\\mu_k \\approx ${tok(mu)}$`,
        ),
        solution: [
          step(
            "given",
            `$v_0 = ${v0}\\ \\text{m/s}$, $v = 0$, $d = ${tok(d)}\\ \\text{m}$, $g = 9{,}8\\ \\text{m/s}^2$`,
            `$v_0 = ${v0}\\ \\text{m/s}$, $v = 0$, $d = ${tok(d)}\\ \\text{m}$, $g = 9.8\\ \\text{m/s}^2$`,
          ),
          step(
            "approach",
            "Cinemática para la deceleración y segunda ley para el rozamiento: $a = \\mu_c g$.",
            "Kinematics for the deceleration and the second law for friction: $a = \\mu_k g$.",
          ),
          step(
            "calculation",
            `$0 = v_0^2 - 2ad \\Rightarrow a = \\frac{${v0}^2}{2 \\cdot ${tok(d)}} = \\frac{${v0 * v0}}{ ${tok(r1(2 * d))}} = ${tok(aDec)}\\ \\text{m/s}^2$<br>$\\mu_c = \\frac{a}{g} = \\frac{ ${tok(aDec)}}{9{,}8} \\approx ${tok(mu)}$`,
            `$0 = v_0^2 - 2ad \\Rightarrow a = \\frac{${v0}^2}{2 \\cdot ${tok(d)}} = \\frac{${v0 * v0}}{ ${tok(r1(2 * d))}} = ${tok(aDec)}\\ \\text{m/s}^2$<br>$\\mu_k = \\frac{a}{g} = \\frac{ ${tok(aDec)}}{9.8} \\approx ${tok(mu)}$`,
          ),
          step(
            "result",
            `El coeficiente de rozamiento cinético es $\\approx ${tok(mu)}$ (valor típico de un neumático sobre asfalto seco).`,
            `The coefficient of kinetic friction is $\\approx ${tok(mu)}$ (a typical value for a tyre on dry asphalt).`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Frictionless incline (free-body diagram)                          */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "nm-incline-01",
      subject: "physics",
      topicId: "newtonian-mechanics",
      subtopicId: "inclined-planes",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 240,
      tags: ["inclined-planes", "components", "free-body-diagrams"],
      prerequisites: ["free-body-diagrams", "newtons-laws"],
    },
    (rng) => {
      const inclines = [
        { ang: 20, sin: 0.342 },
        { ang: 25, sin: 0.423 },
        { ang: 30, sin: 0.5 },
        { ang: 35, sin: 0.574 },
        { ang: 37, sin: 0.602 },
        { ang: 40, sin: 0.643 },
      ];
      const pick = rng.pick(inclines);
      const rad = (pick.ang * Math.PI) / 180;
      const a = sig2(G_ACC * pick.sin);
      return {
        skill: L("Aceleración en un plano inclinado sin rozamiento", "Acceleration on a frictionless incline"),
        statement: L(
          `Un bloque se desliza por un plano inclinado **sin rozamiento** que forma $${pick.ang}^\\circ$ con la horizontal, como muestra el diagrama. ¿Con qué aceleración baja por el plano? Usa $\\sin ${pick.ang}^\\circ \\approx ${tok(pick.sin)}$ y $g = 9{,}8\\ \\text{m/s}^2$ (2 cifras significativas).`,
          `A block slides down a **frictionless** incline at $${pick.ang}^\\circ$ to the horizontal, as the diagram shows. What acceleration does it have along the plane? Use $\\sin ${pick.ang}^\\circ \\approx ${tok(pick.sin)}$ and $g = 9.8\\ \\text{m/s}^2$ (2 significant figures).`,
        ),
        diagram: {
          kind: "free-body",
          inclineDeg: pick.ang,
          massLabel: "m",
          forces: [
            { label: "mg", dx: 0, dy: -1, color: "secondary" },
            { label: "N", dx: -Math.sin(rad), dy: Math.cos(rad), color: "primary" },
          ],
        },
        diagramLabel: L(
          `Diagrama de cuerpo libre de un bloque en un plano inclinado de ${pick.ang} grados: el peso mg apunta hacia abajo y la normal N es perpendicular a la superficie.`,
          `Free-body diagram of a block on a ${pick.ang}-degree incline: the weight mg points straight down and the normal force N is perpendicular to the surface.`,
        ),
        answer: {
          kind: "numeric-unit",
          value: a,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m/s^2", "m/s²"],
          unitChoices: ["m/s^2", "m/s", "N", "m"],
        },
        hints: [
          L(
            "Elige ejes paralelos y perpendiculares al plano; descompón el peso.",
            "Choose axes parallel and perpendicular to the plane; decompose the weight.",
          ),
          L(
            "La componente del peso a lo largo del plano es $mg\\sin\\theta$; la normal no tiene componente a lo largo del plano.",
            "The component of the weight along the plane is $mg\\sin\\theta$; the normal force has no component along the plane.",
          ),
          L(
            "Segunda ley a lo largo del plano: $mg\\sin\\theta = m\\,a$; la masa se cancela.",
            "Second law along the plane: $mg\\sin\\theta = m\\,a$; the mass cancels.",
          ),
        ],
        answerDisplay: L(
          `$a \\approx ${tok(a)}\\ \\text{m/s}^2$`,
          `$a \\approx ${tok(a)}\\ \\text{m/s}^2$`,
        ),
        solution: [
          step(
            "given",
            `$\\theta = ${pick.ang}^\\circ$, $\\sin\\theta \\approx ${tok(pick.sin)}$, $g = 9{,}8\\ \\text{m/s}^2$, sin rozamiento.`,
            `$\\theta = ${pick.ang}^\\circ$, $\\sin\\theta \\approx ${tok(pick.sin)}$, $g = 9.8\\ \\text{m/s}^2$, frictionless.`,
          ),
          step(
            "approach",
            "Descomponemos el peso en componentes paralela y perpendicular al plano; solo la paralela produce aceleración.",
            "Decompose the weight into components parallel and perpendicular to the plane; only the parallel one produces acceleration.",
          ),
          step(
            "calculation",
            `$mg\\sin\\theta = m\\,a \\Rightarrow a = g\\sin\\theta$<br>$a = 9{,}8 \\cdot ${tok(pick.sin)} = ${tok(r2(G_ACC * pick.sin))}\\ \\text{m/s}^2 \\approx ${tok(a)}\\ \\text{m/s}^2$`,
            `$mg\\sin\\theta = m\\,a \\Rightarrow a = g\\sin\\theta$<br>$a = 9.8 \\cdot ${tok(pick.sin)} = ${tok(r2(G_ACC * pick.sin))}\\ \\text{m/s}^2 \\approx ${tok(a)}\\ \\text{m/s}^2$`,
          ),
          step(
            "result",
            `El bloque baja con aceleración $\\approx ${tok(a)}\\ \\text{m/s}^2$, independiente de su masa.`,
            `The block slides down with acceleration $\\approx ${tok(a)}\\ \\text{m/s}^2$, independent of its mass.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Atwood machine                                                    */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "nm-atwood-01",
      subject: "physics",
      topicId: "newtonian-mechanics",
      subtopicId: "connected-systems",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 240,
      tags: ["connected-systems", "tension", "pulley", "atwood"],
      prerequisites: ["tension", "newtons-laws"],
    },
    (rng) => {
      const pairs = [
        { m1: 2, m2: 3 },
        { m1: 3, m2: 5 },
        { m1: 4, m2: 6 },
        { m1: 2, m2: 5 },
        { m1: 5, m2: 8 },
        { m1: 3, m2: 4 },
      ];
      const pick = rng.pick(pairs);
      const aExact = (pick.m2 - pick.m1) * G_ACC / (pick.m1 + pick.m2);
      const a = sig2(aExact);
      return {
        skill: L("Máquina de Atwood", "Atwood machine"),
        statement: L(
          `Dos masas cuelgan de una cuerda ligera que pasa por una polea ideal sin rozamiento: $m_1 = ${pick.m1}\\ \\text{kg}$ y $m_2 = ${pick.m2}\\ \\text{kg}$ ($m_2 > m_1$). Al soltarlas, ¿con qué **aceleración** se mueven? ($g = 9{,}8\\ \\text{m/s}^2$, 2 cifras significativas).`,
          `Two masses hang from a light rope over an ideal frictionless pulley: $m_1 = ${pick.m1}\\ \\text{kg}$ and $m_2 = ${pick.m2}\\ \\text{kg}$ ($m_2 > m_1$). When released, with what **acceleration** do they move? ($g = 9.8\\ \\text{m/s}^2$, 2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: a,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m/s^2", "m/s²"],
          unitChoices: ["m/s^2", "m/s", "N", "kg"],
        },
        hints: [
          L(
            "Trata el sistema (dos masas + cuerda) como un solo cuerpo: la tensión es interna.",
            "Treat the system (both masses + rope) as a single body: the tension is internal.",
          ),
          L(
            "La fuerza que mueve el sistema es el desequilibrio de pesos: $(m_2 - m_1)g$.",
            "The force driving the system is the weight imbalance: $(m_2 - m_1)g$.",
          ),
          L(
            `Aplica $a = \\frac{(m_2 - m_1)\\,g}{m_1 + m_2}$.`,
            `Apply $a = \\frac{(m_2 - m_1)\\,g}{m_1 + m_2}$.`,
          ),
        ],
        answerDisplay: L(
          `$a \\approx ${tok(a)}\\ \\text{m/s}^2$`,
          `$a \\approx ${tok(a)}\\ \\text{m/s}^2$`,
        ),
        solution: [
          step(
            "given",
            `$m_1 = ${pick.m1}\\ \\text{kg}$, $m_2 = ${pick.m2}\\ \\text{kg}$, $g = 9{,}8\\ \\text{m/s}^2$, polea ideal.`,
            `$m_1 = ${pick.m1}\\ \\text{kg}$, $m_2 = ${pick.m2}\\ \\text{kg}$, $g = 9.8\\ \\text{m/s}^2$, ideal pulley.`,
          ),
          step(
            "approach",
            "Sistema completo: la fuerza neta es $(m_2 - m_1)g$ y la masa total es $m_1 + m_2$.",
            "Whole system: the net force is $(m_2 - m_1)g$ and the total mass is $m_1 + m_2$.",
          ),
          step(
            "calculation",
            `$a = \\frac{(m_2 - m_1)\\,g}{m_1 + m_2} = \\frac{(${pick.m2} - ${pick.m1}) \\cdot 9{,}8}{${pick.m1} + ${pick.m2}} = \\frac{ ${tok(r1((pick.m2 - pick.m1) * G_ACC))}}{${pick.m1 + pick.m2}} = ${tok(r2(aExact))} \\approx ${tok(a)}\\ \\text{m/s}^2$`,
            `$a = \\frac{(m_2 - m_1)\\,g}{m_1 + m_2} = \\frac{(${pick.m2} - ${pick.m1}) \\cdot 9.8}{${pick.m1} + ${pick.m2}} = \\frac{ ${tok(r1((pick.m2 - pick.m1) * G_ACC))}}{${pick.m1 + pick.m2}} = ${tok(r2(aExact))} \\approx ${tok(a)}\\ \\text{m/s}^2$`,
          ),
          step(
            "result",
            `El sistema se mueve con $a \\approx ${tok(a)}\\ \\text{m/s}^2$: $m_2$ baja y $m_1$ sube.`,
            `The system moves with $a \\approx ${tok(a)}\\ \\text{m/s}^2$: $m_2$ descends and $m_1$ rises.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Atwood machine: two-equation derivation                          */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "nm-atwood-02",
      subject: "physics",
      topicId: "newtonian-mechanics",
      subtopicId: "connected-systems",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 240,
      tags: ["connected-systems", "pulley", "atwood", "newtons-laws"],
      prerequisites: ["tension", "newtons-laws"],
    },
    (rng) => {
      // Hand-curated pairs with m1 > m2: a = (m1 - m2)g/(m1 + m2) is exact
      // to one decimal with g = 9.8 (and so is the tension check T = m2(g+a)).
      const pairs = [
        { m1: 5, m2: 2 }, // a = 4.2, T = 28 N
        { m1: 9, m2: 5 }, // a = 2.8, T = 63 N
        { m1: 8, m2: 6 }, // a = 1.4, T = 67.2 N
        { m1: 6, m2: 1 }, // a = 7, T = 16.8 N
        { m1: 11, m2: 3 }, // a = 5.6, T = 46.2 N
        { m1: 12, m2: 4 }, // a = 4.9, T = 58.8 N
      ];
      const pick = rng.pick(pairs);
      const aExact = ((pick.m1 - pick.m2) * G_ACC) / (pick.m1 + pick.m2);
      const a = sig2(aExact);
      const T = pick.m2 * (G_ACC + a); // tension check, clean by curation
      const w1 = pick.m1 * G_ACC;
      const w2 = pick.m2 * G_ACC;
      return {
        skill: L("Máquina de Atwood: dos ecuaciones", "Atwood machine: two equations"),
        statement: L(
          `Dos masas cuelgan de los extremos de una cuerda ligera que pasa por una polea ideal sin rozamiento: $m_1 = ${pick.m1}\\ \\text{kg}$ y $m_2 = ${pick.m2}\\ \\text{kg}$, con $m_1 > m_2$. Escribe la segunda ley de Newton para **cada masa por separado** y deduce la **aceleración** $a$ del sistema. ($g = 9{,}8\\ \\text{m/s}^2$, 2 cifras significativas).`,
          `Two masses hang from the ends of a light rope over an ideal frictionless pulley: $m_1 = ${pick.m1}\\ \\text{kg}$ and $m_2 = ${pick.m2}\\ \\text{kg}$, with $m_1 > m_2$. Write Newton's second law for **each mass separately** and deduce the system's **acceleration** $a$. ($g = 9.8\\ \\text{m/s}^2$, 2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: a,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m/s^2", "m/s²"],
          unitChoices: ["m/s^2", "m/s", "N", "kg"],
        },
        hints: [
          L(
            "La cuerda es ligera e inextensible: ambas masas comparten el mismo módulo de aceleración y la cuerda tiene la misma tensión $T$ en sus dos extremos.",
            "The rope is light and inextensible: both masses share the same acceleration magnitude and the rope has the same tension $T$ at both ends.",
          ),
          L(
            "Con el sentido del movimiento como positivo: para $m_1$ (que baja), $m_1 g - T = m_1 a$; para $m_2$ (que sube), $T - m_2 g = m_2 a$.",
            "Taking the direction of motion as positive: for $m_1$ (descending), $m_1 g - T = m_1 a$; for $m_2$ (rising), $T - m_2 g = m_2 a$.",
          ),
          L(
            "Suma las dos ecuaciones: la tensión $T$ se elimina y queda una sola ecuación con la incógnita $a$.",
            "Add the two equations: the tension $T$ cancels out, leaving a single equation in the unknown $a$.",
          ),
        ],
        answerDisplay: L(
          `$a = ${tok(a)}\\ \\text{m/s}^2$`,
          `$a = ${tok(a)}\\ \\text{m/s}^2$`,
        ),
        solution: [
          step(
            "given",
            `$m_1 = ${pick.m1}\\ \\text{kg}$, $m_2 = ${pick.m2}\\ \\text{kg}$ ($m_1 > m_2$), $g = 9{,}8\\ \\text{m/s}^2$, polea ideal: misma $a$ y misma $T$.`,
            `$m_1 = ${pick.m1}\\ \\text{kg}$, $m_2 = ${pick.m2}\\ \\text{kg}$ ($m_1 > m_2$), $g = 9.8\\ \\text{m/s}^2$, ideal pulley: same $a$ and same $T$.`,
          ),
          step(
            "approach",
            "Segunda ley para cada masa (positivo en el sentido del movimiento): $m_1 g - T = m_1 a$ y $T - m_2 g = m_2 a$; se suman para eliminar $T$.",
            "Second law for each mass (positive along the motion): $m_1 g - T = m_1 a$ and $T - m_2 g = m_2 a$; add them to eliminate $T$.",
          ),
          step(
            "calculation",
            `$(m_1 g - T) + (T - m_2 g) = (m_1 + m_2)\\,a \\Rightarrow (m_1 - m_2)\\,g = (m_1 + m_2)\\,a$<br>$a = \\dfrac{(m_1 - m_2)\\,g}{m_1 + m_2} = \\dfrac{(${pick.m1} - ${pick.m2}) \\cdot 9{,}8}{${pick.m1} + ${pick.m2}} = \\dfrac{ ${tok(r1((pick.m1 - pick.m2) * G_ACC))}}{${pick.m1 + pick.m2}} = ${tok(a)}\\ \\text{m/s}^2$`,
            `$(m_1 g - T) + (T - m_2 g) = (m_1 + m_2)\\,a \\Rightarrow (m_1 - m_2)\\,g = (m_1 + m_2)\\,a$<br>$a = \\dfrac{(m_1 - m_2)\\,g}{m_1 + m_2} = \\dfrac{(${pick.m1} - ${pick.m2}) \\cdot 9.8}{${pick.m1} + ${pick.m2}} = \\dfrac{ ${tok(r1((pick.m1 - pick.m2) * G_ACC))}}{${pick.m1 + pick.m2}} = ${tok(a)}\\ \\text{m/s}^2$`,
          ),
          step(
            "result",
            `El sistema se mueve con $a = ${tok(a)}\\ \\text{m/s}^2$: $m_1$ baja y $m_2$ sube.<br>Comprobación: de la ecuación de $m_2$, $T = m_2 (g + a) = ${pick.m2} \\cdot (${tok(r1(G_ACC + a))}) = ${tok(r1(T))}\\ \\text{N}$, entre los dos pesos ($${tok(r1(w2))}\\ \\text{N}$ y $${tok(r1(w1))}\\ \\text{N}$), como debe ser.`,
            `The system moves with $a = ${tok(a)}\\ \\text{m/s}^2$: $m_1$ descends and $m_2$ rises.<br>Check: from $m_2$'s equation, $T = m_2 (g + a) = ${pick.m2} \\cdot (${tok(r1(G_ACC + a))}) = ${tok(r1(T))}\\ \\text{N}$, between the two weights ($${tok(r1(w2))}\\ \\text{N}$ and $${tok(r1(w1))}\\ \\text{N}$), as it must be.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Challenge: table + pulley, find the tension                       */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "nm-connected-01",
      subject: "physics",
      topicId: "newtonian-mechanics",
      subtopicId: "connected-systems",
      difficulty: "challenge",
      questionType: "numeric-unit",
      estimatedTimeSec: 300,
      tags: ["connected-systems", "tension", "pulley", "newtons-laws"],
      prerequisites: ["tension", "connected-systems"],
    },
    (rng) => {
      const combos = [
        { mA: 5, mB: 2 },
        { mA: 10, mB: 5 },
        { mA: 3, mB: 3 },
        { mA: 8, mB: 4 },
        { mA: 6, mB: 2 },
        { mA: 4, mB: 6 },
      ];
      const pick = rng.pick(combos);
      const a = (pick.mB * G_ACC) / (pick.mA + pick.mB);
      const T = sig2(pick.mA * a);
      return {
        skill: L("Sistema mesa–polea: tensión", "Table–pulley system: tension"),
        statement: L(
          `Un bloque A de $${pick.mA}\\ \\text{kg}$ está sobre una mesa **sin rozamiento**, unido por una cuerda ligera que pasa por una polea ideal a un bloque B de $${pick.mB}\\ \\text{kg}$ que cuelga. Al soltar el sistema desde el reposo, ¿qué **tensión** tiene la cuerda? ($g = 9{,}8\\ \\text{m/s}^2$, 2 cifras significativas).`,
          `Block A, of mass $${pick.mA}\\ \\text{kg}$, sits on a **frictionless** table, connected by a light rope over an ideal pulley to a hanging block B of $${pick.mB}\\ \\text{kg}$. When the system is released from rest, what is the **tension** in the rope? ($g = 9.8\\ \\text{m/s}^2$, 2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: T,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["N"],
          unitChoices: ["N", "kg", "m/s^2", "J"],
        },
        hints: [
          L(
            "Escribe la segunda ley para cada bloque por separado: A solo siente la tensión (horizontal); B siente su peso y la tensión.",
            "Write the second law for each block separately: A only feels the tension (horizontal); B feels its weight and the tension.",
          ),
          L(
            "Para A: $T = m_A a$. Para B: $m_B g - T = m_B a$. Ambos comparten la misma $a$.",
            "For A: $T = m_A a$. For B: $m_B g - T = m_B a$. Both share the same $a$.",
          ),
          L(
            "Suma las dos ecuaciones para eliminar $T$ y hallar $a$; después despeja $T = m_A a$.",
            "Add the two equations to eliminate $T$ and find $a$; then solve $T = m_A a$.",
          ),
        ],
        answerDisplay: L(`$T \\approx ${tok(T)}\\ \\text{N}$`, `$T \\approx ${tok(T)}\\ \\text{N}$`),
        solution: [
          step(
            "given",
            `$m_A = ${pick.mA}\\ \\text{kg}$ (mesa lisa), $m_B = ${pick.mB}\\ \\text{kg}$ (cuelga), $g = 9{,}8\\ \\text{m/s}^2$.`,
            `$m_A = ${pick.mA}\\ \\text{kg}$ (smooth table), $m_B = ${pick.mB}\\ \\text{kg}$ (hanging), $g = 9.8\\ \\text{m/s}^2$.`,
          ),
          step(
            "approach",
            "Una ecuación por bloque, misma aceleración: $T = m_A a$ y $m_B g - T = m_B a$.",
            "One equation per block, same acceleration: $T = m_A a$ and $m_B g - T = m_B a$.",
          ),
          step(
            "calculation",
            `Sumando: $m_B g = (m_A + m_B)\\,a \\Rightarrow a = \\frac{${pick.mB} \\cdot 9{,}8}{${pick.mA + pick.mB}} = ${tok(r2(a))}\\ \\text{m/s}^2$<br>$T = m_A\\,a = ${pick.mA} \\cdot ${tok(r2(a))} = ${tok(r2(pick.mA * a))}\\ \\text{N} \\approx ${tok(T)}\\ \\text{N}$`,
            `Adding: $m_B g = (m_A + m_B)\\,a \\Rightarrow a = \\frac{${pick.mB} \\cdot 9.8}{${pick.mA + pick.mB}} = ${tok(r2(a))}\\ \\text{m/s}^2$<br>$T = m_A\\,a = ${pick.mA} \\cdot ${tok(r2(a))} = ${tok(r2(pick.mA * a))}\\ \\text{N} \\approx ${tok(T)}\\ \\text{N}$`,
          ),
          step(
            "result",
            `La cuerda trabaja con una tensión de $\\approx ${tok(T)}\\ \\text{N}$: menor que el peso de B ($${tok(r1(pick.mB * G_ACC))}\\ \\text{N}$), y por eso B baja acelerando.`,
            `The rope works with a tension of $\\approx ${tok(T)}\\ \\text{N}$: less than B's weight ($${tok(r1(pick.mB * G_ACC))}\\ \\text{N}$), which is why B accelerates downward.`,
          ),
        ],
      };
    },
  ),
];
