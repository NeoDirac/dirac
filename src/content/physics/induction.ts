/**
 * PHYSICS · Electromagnetic Induction
 *
 * Magnetic flux, Faraday's law (with a flux-vs-time graph exercise),
 * Lenz's law as qualitative multiple choice, and applications
 * (transformers, generators, sliding rods).
 */

import { template, L, step, tok } from "@/lib/problem";
import type { ProblemTemplate, McOption } from "@/lib/types";

/* Deterministic formatting helpers (no RNG inside). */
const r1 = (v: number) => Math.round(v * 10) / 10;
const r2 = (v: number) => Math.round(v * 100) / 100;
const r3 = (v: number) => Math.round(v * 1000) / 1000;

export const templates: ProblemTemplate[] = [
  /* ---------------------------------------------------------------- */
  /* Magnetic flux, field perpendicular (Φ = BA)                      */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "ind-flux-01",
      subject: "physics",
      topicId: "induction",
      subtopicId: "magnetic-flux",
      difficulty: "easy",
      questionType: "numeric-unit",
      estimatedTimeSec: 90,
      tags: ["magnetic-flux"],
      prerequisites: [],
    },
    (rng) => {
      const B = rng.pick([0.2, 0.4, 1.2]);
      const A = rng.pick([0.05, 0.1, 0.2, 0.25]);
      const Phi = r2(B * A);
      return {
        skill: L("Flujo magnético (campo perpendicular)", "Magnetic flux (perpendicular field)"),
        statement: L(
          `Una espira plana de área $A = ${tok(A)}\\ \\text{m}^2$ está en una región de campo magnético uniforme $B = ${tok(B)}\\ \\text{T}$, perpendicular al plano de la espira. Calcula el flujo magnético que la atraviesa (2 cifras significativas).`,
          `A flat loop of area $A = ${tok(A)}\\ \\text{m}^2$ sits in a uniform magnetic field $B = ${tok(B)}\\ \\text{T}$, perpendicular to the plane of the loop. Compute the magnetic flux through it (2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: Phi,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["Wb", "weber", "T·m^2"],
          unitChoices: ["Wb", "T", "V", "A"],
        },
        hints: [
          L(
            "Datos: $B$ y $A$; el campo es perpendicular al plano, así que el ángulo con la normal es $\\theta = 0^{\\circ}$.",
            "Data: $B$ and $A$; the field is perpendicular to the plane, so the angle with the normal is $\\theta = 0^{\\circ}$.",
          ),
          L(
            "El flujo es $\\Phi = BA\\cos\\theta$.",
            "The flux is $\\Phi = BA\\cos\\theta$.",
          ),
          L(
            "Con $\\theta = 0^{\\circ}$, $\\cos\\theta = 1$: solo queda multiplicar $B \\cdot A$.",
            "With $\\theta = 0^{\\circ}$, $\\cos\\theta = 1$: it reduces to multiplying $B \\cdot A$.",
          ),
        ],
        answerDisplay: L(`$\\Phi = ${tok(Phi)}\\ \\text{Wb}$`, `$\\Phi = ${tok(Phi)}\\ \\text{Wb}$`),
        solution: [
          step(
            "given",
            `$B = ${tok(B)}\\ \\text{T}$, $A = ${tok(A)}\\ \\text{m}^2$, $\\theta = 0^{\\circ}$ (campo perpendicular al plano)`,
            `$B = ${tok(B)}\\ \\text{T}$, $A = ${tok(A)}\\ \\text{m}^2$, $\\theta = 0^{\\circ}$ (field perpendicular to the plane)`,
          ),
          step(
            "approach",
            "Definición de flujo magnético: $\\Phi = BA\\cos\\theta$.",
            "Definition of magnetic flux: $\\Phi = BA\\cos\\theta$.",
          ),
          step(
            "calculation",
            `$\\Phi = ${tok(B)} \\cdot ${tok(A)} \\cdot \\cos 0^{\\circ} = ${tok(B)} \\cdot ${tok(A)} = ${tok(Phi)}\\ \\text{Wb}$`,
            `$\\Phi = ${tok(B)} \\cdot ${tok(A)} \\cdot \\cos 0^{\\circ} = ${tok(B)} \\cdot ${tok(A)} = ${tok(Phi)}\\ \\text{Wb}$`,
          ),
          step(
            "result",
            `El flujo magnético es $${tok(Phi)}\\ \\text{Wb}$.`,
            `The magnetic flux is $${tok(Phi)}\\ \\text{Wb}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Magnetic flux with an angle (Φ = BA cosθ)                        */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "ind-flux-02",
      subject: "physics",
      topicId: "induction",
      subtopicId: "magnetic-flux",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 150,
      tags: ["magnetic-flux", "trigonometry"],
      prerequisites: ["magnetic-flux"],
    },
    (rng) => {
      const pick = rng.pick([
        { B: 0.5, A: 0.4, th: 60, cos: 0.5 },
        { B: 1.2, A: 0.25, th: 45, cos: 0.707 },
        { B: 0.5, A: 0.2, th: 30, cos: 0.866 },
        { B: 0.8, A: 0.5, th: 45, cos: 0.707 },
        { B: 0.8, A: 0.25, th: 60, cos: 0.5 },
        { B: 0.5, A: 0.5, th: 30, cos: 0.866 },
        { B: 1.2, A: 0.4, th: 45, cos: 0.707 },
        { B: 0.8, A: 0.4, th: 30, cos: 0.866 },
      ]);
      const Phi = r3(pick.B * pick.A * pick.cos);
      return {
        skill: L("Flujo magnético con ángulo", "Magnetic flux at an angle"),
        statement: L(
          `Una espira de área $A = ${tok(pick.A)}\\ \\text{m}^2$ está en un campo uniforme $B = ${tok(pick.B)}\\ \\text{T}$. El campo forma un ángulo de $${pick.th}^{\\circ}$ con la **normal** de la espira. Calcula el flujo magnético (2 cifras significativas; usa $\\cos ${pick.th}^{\\circ} \\approx ${tok(pick.cos)}$).`,
          `A loop of area $A = ${tok(pick.A)}\\ \\text{m}^2$ sits in a uniform field $B = ${tok(pick.B)}\\ \\text{T}$. The field makes an angle of $${pick.th}^{\\circ}$ with the loop's **normal**. Compute the magnetic flux (2 significant figures; use $\\cos ${pick.th}^{\\circ} \\approx ${tok(pick.cos)}$).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: Phi,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["Wb", "weber", "T·m^2"],
          unitChoices: ["Wb", "T", "V", "J"],
        },
        hints: [
          L(
            "Cuidado: el ángulo del flujo se mide respecto a la **normal** de la espira, no respecto a su plano.",
            "Careful: the flux angle is measured from the loop's **normal**, not from its plane.",
          ),
          L(
            `La fórmula es $\\Phi = BA\\cos\\theta$ con $\\theta = ${pick.th}^{\\circ}$.`,
            `The formula is $\\Phi = BA\\cos\\theta$ with $\\theta = ${pick.th}^{\\circ}$.`,
          ),
          L(
            `Sustituye: $\\Phi = ${tok(pick.B)} \\cdot ${tok(pick.A)} \\cdot ${tok(pick.cos)}$.`,
            `Substitute: $\\Phi = ${tok(pick.B)} \\cdot ${tok(pick.A)} \\cdot ${tok(pick.cos)}$.`,
          ),
        ],
        answerDisplay: L(`$\\Phi \\approx ${tok(Phi)}\\ \\text{Wb}$`, `$\\Phi \\approx ${tok(Phi)}\\ \\text{Wb}$`),
        solution: [
          step(
            "given",
            `$B = ${tok(pick.B)}\\ \\text{T}$, $A = ${tok(pick.A)}\\ \\text{m}^2$, $\\theta = ${pick.th}^{\\circ}$ (con la normal), $\\cos ${pick.th}^{\\circ} \\approx ${tok(pick.cos)}$`,
            `$B = ${tok(pick.B)}\\ \\text{T}$, $A = ${tok(pick.A)}\\ \\text{m}^2$, $\\theta = ${pick.th}^{\\circ}$ (from the normal), $\\cos ${pick.th}^{\\circ} \\approx ${tok(pick.cos)}$`,
          ),
          step(
            "approach",
            "Flujo magnético: $\\Phi = BA\\cos\\theta$, con $\\theta$ medido desde la normal de la espira.",
            "Magnetic flux: $\\Phi = BA\\cos\\theta$, with $\\theta$ measured from the loop's normal.",
          ),
          step(
            "calculation",
            `$\\Phi = ${tok(pick.B)} \\cdot ${tok(pick.A)} \\cdot ${tok(pick.cos)} \\approx ${tok(Phi)}\\ \\text{Wb}$`,
            `$\\Phi = ${tok(pick.B)} \\cdot ${tok(pick.A)} \\cdot ${tok(pick.cos)} \\approx ${tok(Phi)}\\ \\text{Wb}$`,
          ),
          step(
            "result",
            `El flujo magnético es $\\approx ${tok(Phi)}\\ \\text{Wb}$.`,
            `The magnetic flux is $\\approx ${tok(Phi)}\\ \\text{Wb}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Angle for maximum flux (MC)                                      */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "ind-flux-03",
      subject: "physics",
      topicId: "induction",
      subtopicId: "magnetic-flux",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 60,
      tags: ["magnetic-flux", "conceptual"],
      prerequisites: [],
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$0^{\\circ}$ (campo paralelo a la normal)", "$0^{\\circ}$ (field parallel to the normal)"), correct: true },
        { id: "b", text: L("$30^{\\circ}$", "$30^{\\circ}$"), correct: false },
        { id: "c", text: L("$60^{\\circ}$", "$60^{\\circ}$"), correct: false },
        { id: "d", text: L("$90^{\\circ}$ (campo paralelo al plano)", "$90^{\\circ}$ (field parallel to the plane)"), correct: false },
      ];
      return {
        skill: L("Flujo máximo: el ángulo correcto", "Maximum flux: the right angle"),
        statement: L(
          "¿Para qué ángulo $\\theta$ entre el campo magnético y la **normal** de la espira el flujo $\\Phi = BA\\cos\\theta$ es **máximo**?",
          "For which angle $\\theta$ between the magnetic field and the loop's **normal** is the flux $\\Phi = BA\\cos\\theta$ **maximum**?",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El flujo depende de $\\cos\\theta$.",
            "The flux depends on $\\cos\\theta$.",
          ),
          L(
            "Pregúntate dónde alcanza el coseno su valor máximo.",
            "Ask yourself where the cosine reaches its maximum value.",
          ),
          L(
            "$\\cos 0^{\\circ} = 1$ y $\\cos 90^{\\circ} = 0$.",
            "$\\cos 0^{\\circ} = 1$ and $\\cos 90^{\\circ} = 0$.",
          ),
        ],
        answerDisplay: L(
          "$\\theta = 0^{\\circ}$: el campo perpendicular al plano de la espira.",
          "$\\theta = 0^{\\circ}$: the field perpendicular to the plane of the loop.",
        ),
        solution: [
          step(
            "given",
            "Flujo $\\Phi = BA\\cos\\theta$ con $\\theta$ medido desde la normal.",
            "Flux $\\Phi = BA\\cos\\theta$ with $\\theta$ measured from the normal.",
          ),
          step(
            "approach",
            "$B$ y $A$ son fijos; solo $\\cos\\theta$ varía. Buscamos su máximo.",
            "$B$ and $A$ are fixed; only $\\cos\\theta$ varies. We look for its maximum.",
          ),
          step(
            "calculation",
            "$\\cos 0^{\\circ} = 1$ (máximo), $\\cos 30^{\\circ} \\approx 0{,}866$, $\\cos 60^{\\circ} = 0{,}5$, $\\cos 90^{\\circ} = 0$.",
            "$\\cos 0^{\\circ} = 1$ (maximum), $\\cos 30^{\\circ} \\approx 0.866$, $\\cos 60^{\\circ} = 0.5$, $\\cos 90^{\\circ} = 0$.",
          ),
          step(
            "result",
            "El flujo es máximo cuando $\\theta = 0^{\\circ}$, es decir, con el campo perpendicular al plano de la espira.",
            "The flux is maximum when $\\theta = 0^{\\circ}$, i.e. with the field perpendicular to the plane of the loop.",
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Faraday's law: coil with changing flux                           */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "ind-faraday-01",
      subject: "physics",
      topicId: "induction",
      subtopicId: "faraday",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 150,
      tags: ["faraday", "emf"],
      prerequisites: ["magnetic-flux"],
    },
    (rng) => {
      const pick = rng.pick([
        { N: 100, dPhi: 0.02, dt: 0.1 },
        { N: 50, dPhi: 0.01, dt: 0.05 },
        { N: 200, dPhi: 0.05, dt: 0.2 },
        { N: 20, dPhi: 0.02, dt: 0.1 },
        { N: 50, dPhi: 0.04, dt: 0.2 },
        { N: 100, dPhi: 0.05, dt: 0.5 },
        { N: 200, dPhi: 0.02, dt: 0.1 },
        { N: 100, dPhi: 0.03, dt: 0.2 },
      ]);
      const emf = r1((pick.N * pick.dPhi) / pick.dt);
      return {
        skill: L("Fem inducida (ley de Faraday)", "Induced emf (Faraday's law)"),
        statement: L(
          `Una bobina de $${pick.N}\\ \\text{espiras}$ está en un campo magnético que varía. El flujo que atraviesa **cada espira** pasa de $${tok(pick.dPhi)}\\ \\text{Wb}$ a cero en $${tok(pick.dt)}\\ \\text{s}$. Calcula el módulo de la fem inducida (2 cifras significativas).`,
          `A coil of $${pick.N}\\ \\text{turns}$ sits in a changing magnetic field. The flux through **each turn** drops from $${tok(pick.dPhi)}\\ \\text{Wb}$ to zero in $${tok(pick.dt)}\\ \\text{s}$. Compute the magnitude of the induced emf (2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: emf,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["V"],
          unitChoices: ["V", "Wb", "A", "T"],
        },
        hints: [
          L(
            "Datos: $N$, el cambio de flujo $\\Delta\\Phi$ por espira y el intervalo $\\Delta t$.",
            "Data: $N$, the flux change $\\Delta\\Phi$ per turn and the interval $\\Delta t$.",
          ),
          L(
            "Ley de Faraday: $|\\varepsilon| = N\\,\\dfrac{|\\Delta\\Phi|}{\\Delta t}$.",
            "Faraday's law: $|\\varepsilon| = N\\,\\dfrac{|\\Delta\\Phi|}{\\Delta t}$.",
          ),
          L(
            "El flujo **por espira** se multiplica por el número de espiras.",
            "The flux **per turn** gets multiplied by the number of turns.",
          ),
        ],
        answerDisplay: L(`$|\\varepsilon| = ${tok(emf)}\\ \\text{V}$`, `$|\\varepsilon| = ${tok(emf)}\\ \\text{V}$`),
        solution: [
          step(
            "given",
            `$N = ${pick.N}$, $\\Delta\\Phi = -${tok(pick.dPhi)}\\ \\text{Wb}$ (de $${tok(pick.dPhi)}$ a 0), $\\Delta t = ${tok(pick.dt)}\\ \\text{s}$`,
            `$N = ${pick.N}$, $\\Delta\\Phi = -${tok(pick.dPhi)}\\ \\text{Wb}$ (from $${tok(pick.dPhi)}$ to 0), $\\Delta t = ${tok(pick.dt)}\\ \\text{s}$`,
          ),
          step(
            "approach",
            "Ley de Faraday: $|\\varepsilon| = N\\,\\frac{|\\Delta\\Phi|}{\\Delta t}$.",
            "Faraday's law: $|\\varepsilon| = N\\,\\frac{|\\Delta\\Phi|}{\\Delta t}$.",
          ),
          step(
            "calculation",
            `$|\\varepsilon| = ${pick.N} \\cdot \\frac{ ${tok(pick.dPhi)}\\ \\text{Wb}}{ ${tok(pick.dt)}\\ \\text{s}} = ${tok(emf)}\\ \\text{V}$`,
            `$|\\varepsilon| = ${pick.N} \\cdot \\frac{ ${tok(pick.dPhi)}\\ \\text{Wb}}{ ${tok(pick.dt)}\\ \\text{s}} = ${tok(emf)}\\ \\text{V}$`,
          ),
          step(
            "result",
            `La fem inducida tiene un módulo de $${tok(emf)}\\ \\text{V}$.`,
            `The induced emf has magnitude $${tok(emf)}\\ \\text{V}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Motional emf (ε = BLv)                                           */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "ind-faraday-02",
      subject: "physics",
      topicId: "induction",
      subtopicId: "faraday",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 180,
      tags: ["motional-emf", "faraday", "rod"],
      prerequisites: ["faraday"],
    },
    (rng) => {
      const pick = rng.pick([
        { B: 0.5, len: 0.2, v: 4 },
        { B: 0.8, len: 0.25, v: 5 },
        { B: 0.2, len: 0.1, v: 10 },
        { B: 0.5, len: 0.1, v: 5 },
        { B: 0.8, len: 0.2, v: 5 },
        { B: 0.2, len: 0.25, v: 8 },
        { B: 0.5, len: 0.25, v: 8 },
        { B: 0.8, len: 0.1, v: 2.5 },
      ]);
      const emf = r2(pick.B * pick.len * pick.v);
      return {
        skill: L("Fem de una varilla en movimiento (ε = BLv)", "Motional emf of a sliding rod (ε = BLv)"),
        statement: L(
          `Una varilla conductora de longitud $L = ${tok(pick.len)}\\ \\text{m}$ se desliza con velocidad constante $v = ${tok(pick.v)}\\ \\text{m/s}$ sobre raíles paralelos, en un campo magnético $B = ${tok(pick.B)}\\ \\text{T}$ perpendicular al plano de los raíles. Calcula la fem inducida (2 cifras significativas).`,
          `A conducting rod of length $L = ${tok(pick.len)}\\ \\text{m}$ slides at constant speed $v = ${tok(pick.v)}\\ \\text{m/s}$ on parallel rails in a magnetic field $B = ${tok(pick.B)}\\ \\text{T}$ perpendicular to the rail plane. Compute the induced emf (2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: emf,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["V"],
          unitChoices: ["V", "A", "T", "Wb"],
        },
        hints: [
          L(
            "En cada segundo, la varilla barre un área $A = L\\,v\\,\\Delta t$.",
            "Each second, the rod sweeps an area $A = L\\,v\\,\\Delta t$.",
          ),
          L(
            "El flujo barrido por unidad de tiempo da la fem: $|\\varepsilon| = B\\,L\\,v$.",
            "The flux swept per unit time gives the emf: $|\\varepsilon| = B\\,L\\,v$.",
          ),
          L(
            "Sustituye los tres valores directamente; el resultado sale en voltios.",
            "Substitute the three values directly; the result comes out in volts.",
          ),
        ],
        answerDisplay: L(`$\\varepsilon = ${tok(emf)}\\ \\text{V}$`, `$\\varepsilon = ${tok(emf)}\\ \\text{V}$`),
        solution: [
          step(
            "given",
            `$B = ${tok(pick.B)}\\ \\text{T}$, $L = ${tok(pick.len)}\\ \\text{m}$, $v = ${tok(pick.v)}\\ \\text{m/s}$ (perpendiculares entre sí)`,
            `$B = ${tok(pick.B)}\\ \\text{T}$, $L = ${tok(pick.len)}\\ \\text{m}$, $v = ${tok(pick.v)}\\ \\text{m/s}$ (mutually perpendicular)`,
          ),
          step(
            "approach",
            "Fem de movimiento: $|\\varepsilon| = B L v$ (flujo barrido por segundo).",
            "Motional emf: $|\\varepsilon| = B L v$ (flux swept per second).",
          ),
          step(
            "calculation",
            `$\\varepsilon = ${tok(pick.B)} \\cdot ${tok(pick.len)} \\cdot ${tok(pick.v)} = ${tok(emf)}\\ \\text{V}$`,
            `$\\varepsilon = ${tok(pick.B)} \\cdot ${tok(pick.len)} \\cdot ${tok(pick.v)} = ${tok(emf)}\\ \\text{V}$`,
          ),
          step(
            "result",
            `La fem inducida en la varilla es $${tok(emf)}\\ \\text{V}$.`,
            `The emf induced in the rod is $${tok(emf)}\\ \\text{V}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Expression: motional emf formula                                 */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "ind-faraday-03",
      subject: "physics",
      topicId: "induction",
      subtopicId: "faraday",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 120,
      tags: ["motional-emf", "formula"],
      prerequisites: ["faraday"],
    },
    (rng) => {
      void rng;
      return {
        skill: L("Fórmula de la fem de movimiento", "Motional emf formula"),
        statement: L(
          "Una varilla de longitud $L$ se mueve con velocidad $v$ perpendicular a un campo magnético $B$. Escribe la expresión del módulo de la fem inducida usando las variables $B$, $L$ y $v$ (por ejemplo, B*L*v).",
          "A rod of length $L$ moves with velocity $v$ perpendicular to a magnetic field $B$. Write the expression for the magnitude of the induced emf using the variables $B$, $L$ and $v$ (e.g. B*L*v).",
        ),
        answer: {
          kind: "expression",
          accepted: ["B*L*v"],
          variables: ["B", "L", "v"],
        },
        hints: [
          L(
            "Piensa cuánto flujo barre la varilla en un tiempo $\\Delta t$.",
            "Think about how much flux the rod sweeps in a time $\\Delta t$.",
          ),
          L(
            "En $\\Delta t$ barre un rectángulo de área $L\\,v\\,\\Delta t$.",
            "In $\\Delta t$ it sweeps a rectangle of area $L\\,v\\,\\Delta t$.",
          ),
          L(
            "Divide el flujo barrido $B L v\\,\\Delta t$ entre $\\Delta t$.",
            "Divide the swept flux $B L v\\,\\Delta t$ by $\\Delta t$.",
          ),
        ],
        answerDisplay: L("$\\varepsilon = B\\,L\\,v$", "$\\varepsilon = B\\,L\\,v$"),
        solution: [
          step(
            "given",
            "Variables: $B$ (campo), $L$ (longitud de la varilla), $v$ (velocidad, perpendicular a $B$ y a $L$).",
            "Variables: $B$ (field), $L$ (rod length), $v$ (speed, perpendicular to both $B$ and $L$).",
          ),
          step(
            "approach",
            "La fem es el flujo barrido por unidad de tiempo: $|\\varepsilon| = \\frac{\\Delta\\Phi}{\\Delta t}$.",
            "The emf is the flux swept per unit time: $|\\varepsilon| = \\frac{\\Delta\\Phi}{\\Delta t}$.",
          ),
          step(
            "calculation",
            "$\\Delta\\Phi = B\\,L\\,v\\,\\Delta t \\Rightarrow |\\varepsilon| = \\frac{B\\,L\\,v\\,\\Delta t}{\\Delta t} = B\\,L\\,v$",
            "$\\Delta\\Phi = B\\,L\\,v\\,\\Delta t \\Rightarrow |\\varepsilon| = \\frac{B\\,L\\,v\\,\\Delta t}{\\Delta t} = B\\,L\\,v$",
          ),
          step(
            "result",
            "La fem de movimiento es $\\varepsilon = B\\,L\\,v$.",
            "The motional emf is $\\varepsilon = B\\,L\\,v$.",
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Faraday's law from a Φ(t) graph                                  */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "ind-faraday-04",
      subject: "physics",
      topicId: "induction",
      subtopicId: "faraday",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 210,
      tags: ["faraday", "graph-reading", "emf"],
      prerequisites: ["faraday", "magnetic-flux"],
    },
    (rng) => {
      const pick = rng.pick([
        { N: 50, phi1: 0.02, t1: 0.1 },
        { N: 25, phi1: 0.01, t1: 0.05 },
        { N: 100, phi1: 0.05, t1: 0.2 },
        { N: 50, phi1: 0.01, t1: 0.1 },
        { N: 100, phi1: 0.02, t1: 0.05 },
        { N: 25, phi1: 0.05, t1: 0.25 },
        { N: 50, phi1: 0.05, t1: 0.1 },
      ]);
      const slope = r2(pick.phi1 / pick.t1);
      const emf = r1(pick.N * slope);
      return {
        skill: L("Fem inducida a partir de una gráfica Φ–t", "Induced emf from a Φ–t graph"),
        statement: L(
          `La gráfica muestra el flujo magnético que atraviesa **cada espira** de una bobina de $${pick.N}\\ \\text{espiras}$ en función del tiempo. Calcula el módulo de la fem inducida mientras dura la variación (2 cifras significativas).`,
          `The graph shows the magnetic flux through **each turn** of a $${pick.N}\\ \\text{turn}$ coil as a function of time. Compute the magnitude of the induced emf while the change lasts (2 significant figures).`,
        ),
        diagram: {
          kind: "function-graph",
          xMin: 0,
          xMax: pick.t1,
          yMin: 0,
          yMax: pick.phi1,
          curves: [{ fn: `${slope}*x`, color: "primary" }],
          points: [
            { x: 0, y: 0, label: "(0, 0)" },
            { x: pick.t1, y: pick.phi1, label: `(${pick.t1}, ${pick.phi1})` },
          ],
          xLabel: "t (s)",
          yLabel: "Φ (Wb)",
          showGrid: true,
        },
        diagramLabel: L(
          `Gráfica del flujo en función del tiempo: una recta que sube desde el origen hasta el punto (${String(pick.t1).replace(".", ",")} s, ${String(pick.phi1).replace(".", ",")} Wb).`,
          `Graph of flux versus time: a straight line rising from the origin to the point (${pick.t1} s, ${pick.phi1} Wb).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: emf,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["V"],
          unitChoices: ["V", "Wb", "Wb/s", "T"],
        },
        hints: [
          L(
            "De la gráfica necesitas $\\Delta\\Phi$ y $\\Delta t$: usa los puntos marcados.",
            "From the graph you need $\\Delta\\Phi$ and $\\Delta t$: use the marked points.",
          ),
          L(
            "La pendiente de la recta es $\\frac{\\Delta\\Phi}{\\Delta t}$, y la fem es $|\\varepsilon| = N$ veces esa pendiente.",
            "The slope of the line is $\\frac{\\Delta\\Phi}{\\Delta t}$, and the emf is $|\\varepsilon| = N$ times that slope.",
          ),
          L(
            `Calcula $\\frac{ ${tok(pick.phi1)}}{ ${tok(pick.t1)}}$ y multiplica por $${pick.N}$.`,
            `Compute $\\frac{ ${tok(pick.phi1)}}{ ${tok(pick.t1)}}$ and multiply by $${pick.N}$.`,
          ),
        ],
        answerDisplay: L(`$|\\varepsilon| = ${tok(emf)}\\ \\text{V}$`, `$|\\varepsilon| = ${tok(emf)}\\ \\text{V}$`),
        solution: [
          step(
            "given",
            `Recta desde $(0, 0)$ hasta $(${tok(pick.t1)}\\ \\text{s}, ${tok(pick.phi1)}\\ \\text{Wb})$ en la gráfica $\\Phi$–$t$; $N = ${pick.N}$ espiras.`,
            `A straight line from $(0, 0)$ to $(${tok(pick.t1)}\\ \\text{s}, ${tok(pick.phi1)}\\ \\text{Wb})$ on the $\\Phi$–$t$ graph; $N = ${pick.N}$ turns.`,
          ),
          step(
            "approach",
            "Ley de Faraday: $|\\varepsilon| = N\\,\\frac{\\Delta\\Phi}{\\Delta t}$; el cociente $\\Delta\\Phi/\\Delta t$ es la pendiente de la gráfica.",
            "Faraday's law: $|\\varepsilon| = N\\,\\frac{\\Delta\\Phi}{\\Delta t}$; the ratio $\\Delta\\Phi/\\Delta t$ is the slope of the graph.",
          ),
          step(
            "calculation",
            `$\\frac{\\Delta\\Phi}{\\Delta t} = \\frac{ ${tok(pick.phi1)}\\ \\text{Wb}}{ ${tok(pick.t1)}\\ \\text{s}} = ${tok(slope)}\\ \\text{Wb/s}$<br>$|\\varepsilon| = ${pick.N} \\cdot ${tok(slope)} = ${tok(emf)}\\ \\text{V}$`,
            `$\\frac{\\Delta\\Phi}{\\Delta t} = \\frac{ ${tok(pick.phi1)}\\ \\text{Wb}}{ ${tok(pick.t1)}\\ \\text{s}} = ${tok(slope)}\\ \\text{Wb/s}$<br>$|\\varepsilon| = ${pick.N} \\cdot ${tok(slope)} = ${tok(emf)}\\ \\text{V}$`,
          ),
          step(
            "result",
            `La fem inducida es $${tok(emf)}\\ \\text{V}$ mientras el flujo varía.`,
            `The induced emf is $${tok(emf)}\\ \\text{V}$ while the flux changes.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Lenz's law: magnet and coil (MC)                                 */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "ind-lenz-01",
      subject: "physics",
      topicId: "induction",
      subtopicId: "lenz",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["lenz", "conceptual", "magnet"],
      prerequisites: ["faraday"],
    },
    (rng) => {
      const pole = rng.bool(); // true = north pole
      const approaching = rng.bool();
      const ccw = pole === approaching;
      const options: McOption[] = [
        { id: "a", text: L("Sentido antihorario", "Counter-clockwise"), correct: ccw },
        { id: "b", text: L("Sentido horario", "Clockwise"), correct: !ccw },
        { id: "c", text: L("No se induce corriente", "No current is induced"), correct: false },
        { id: "d", text: L("No se puede saber sin conocer la resistencia de la bobina", "Cannot be determined without the coil resistance"), correct: false },
      ];
      return {
        skill: L("Ley de Lenz: imán y bobina", "Lenz's law: magnet and coil"),
        statement: L(
          `El polo ${pole ? "norte" : "sur"} de un imán se ${approaching ? "acerca a" : "aleja de"} una bobina moviéndose a lo largo de su eje. Mirando la bobina **desde el lado del imán**, ¿qué sentido tiene la corriente inducida?`,
          `The ${pole ? "north" : "south"} pole of a magnet ${approaching ? "moves toward" : "moves away from"} a coil along its axis. Looking at the coil **from the magnet's side**, what is the direction of the induced current?`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Ley de Lenz: la corriente inducida se opone al **cambio** de flujo.",
            "Lenz's law: the induced current opposes the **change** in flux.",
          ),
          L(
            `Al ${approaching ? "acercarse" : "alejarse"} el polo ${pole ? "norte" : "sur"}, la bobina presenta hacia el imán una cara que lo ${approaching ? "rechaza" : "atrae"}.`,
            `As the ${pole ? "north" : "south"} pole ${approaching ? "approaches" : "leaves"}, the coil turns toward the magnet a face that ${approaching ? "repels" : "attracts"} it.`,
          ),
          L(
            "Una espira con corriente antihoraria (vista desde un lado) se comporta como un polo norte hacia el observador.",
            "A loop with counter-clockwise current (viewed from one side) acts as a north pole toward the observer.",
          ),
        ],
        answerDisplay: ccw
          ? L("Sentido antihorario (visto desde el imán).", "Counter-clockwise (viewed from the magnet).")
          : L("Sentido horario (visto desde el imán).", "Clockwise (viewed from the magnet)."),
        solution: [
          step(
            "given",
            `Polo ${pole ? "norte" : "sur"} ${approaching ? "acercándose a" : "alejándose de"} la bobina; observamos desde el lado del imán.`,
            `${pole ? "North" : "South"} pole ${approaching ? "approaching" : "moving away from"} the coil; we watch from the magnet's side.`,
          ),
          step(
            "approach",
            "Ley de Lenz: la corriente inducida crea un campo que se opone a la variación del flujo; la cara de la bobina que mira al imán debe " +
              (approaching ? "repelerlo" : "atraerlo") +
              ".",
            "Lenz's law: the induced current creates a field opposing the flux change; the coil face toward the magnet must " +
              (approaching ? "repel it" : "attract it") +
              ".",
          ),
          step(
            "calculation",
            `Se ${approaching ? "acerca" : "aleja"} un polo ${pole ? "norte" : "sur"} → la cara próxima debe ser ${approaching === pole ? "un polo norte" : "un polo sur"}.<br>Una cara norte hacia el observador corresponde a corriente **antihoraria**; una cara sur, a **horaria**.`,
            `A ${pole ? "north" : "south"} pole ${approaching ? "approaches" : "leaves"} → the near face must be ${approaching === pole ? "a north pole" : "a south pole"}.<br>A north face toward the observer means **counter-clockwise** current; a south face means **clockwise**.`,
          ),
          step(
            "result",
            ccw
              ? "La corriente inducida es antihoraria vista desde el imán."
              : "La corriente inducida es horaria vista desde el imán.",
            ccw
              ? "The induced current is counter-clockwise viewed from the magnet."
              : "The induced current is clockwise viewed from the magnet.",
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Lenz's law: loop in a changing field (MC)                        */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "ind-lenz-02",
      subject: "physics",
      topicId: "induction",
      subtopicId: "lenz",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 180,
      tags: ["lenz", "conceptual", "field-change"],
      prerequisites: ["lenz"],
    },
    (rng) => {
      const out = rng.bool(); // field out of the page (toward the reader)
      const increasing = rng.bool();
      // counter-clockwise (seen head-on) creates a field out of the page
      const ccw = out !== increasing;
      const options: McOption[] = [
        { id: "a", text: L("Sentido antihorario (visto de frente)", "Counter-clockwise (seen head-on)"), correct: ccw },
        { id: "b", text: L("Sentido horario (visto de frente)", "Clockwise (seen head-on)"), correct: !ccw },
        { id: "c", text: L("No se induce corriente", "No current is induced"), correct: false },
        { id: "d", text: L("No se puede determinar sin conocer el área de la espira", "Cannot be determined without knowing the loop area"), correct: false },
      ];
      return {
        skill: L("Ley de Lenz: campo que cambia", "Lenz's law: a changing field"),
        statement: L(
          `Una espira circular está en una región donde hay un campo magnético ${out ? "que apunta **hacia fuera de la página** (hacia ti)" : "que apunta **hacia dentro de la página**"}, y su módulo ${increasing ? "**aumenta**" : "**disminuye**"} uniformemente con el tiempo. Visto de frente, ¿qué sentido tiene la corriente inducida en la espira?`,
          `A circular loop lies in a region with a magnetic field ${out ? "pointing **out of the page** (toward you)" : "pointing **into the page**"}, whose magnitude ${increasing ? "**increases**" : "**decreases**"} steadily with time. Seen head-on, what is the direction of the induced current in the loop?`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Como el flujo cambia, sí hay fem inducida; el área no determina el sentido.",
            "Since the flux changes, there IS an induced emf; the area does not set the direction.",
          ),
          L(
            "Una corriente antihoraria vista de frente crea un campo hacia fuera de la página; una horaria, hacia dentro.",
            "A counter-clockwise current seen head-on creates a field out of the page; a clockwise one, into the page.",
          ),
          L(
            `El campo inducido debe oponerse al **cambio**: aquí el flujo hacia ${out ? "fuera" : "dentro"} ${increasing ? "aumenta" : "disminuye"}.`,
            `The induced field must oppose the **change**: here the ${out ? "outward" : "inward"} flux is ${increasing ? "increasing" : "decreasing"}.`,
          ),
        ],
        answerDisplay: ccw
          ? L("Sentido antihorario (visto de frente).", "Counter-clockwise (seen head-on).")
          : L("Sentido horario (visto de frente).", "Clockwise (seen head-on)."),
        solution: [
          step(
            "given",
            `Campo hacia ${out ? "fuera de la página" : "dentro de la página"} cuyo módulo ${increasing ? "aumenta" : "disminuye"} con el tiempo.`,
            `Field pointing ${out ? "out of the page" : "into the page"} whose magnitude ${increasing ? "increases" : "decreases"} with time.`,
          ),
          step(
            "approach",
            "Ley de Lenz: la corriente inducida genera un campo que se opone a la **variación** del flujo (no al campo en sí).",
            "Lenz's law: the induced current generates a field opposing the **change** in flux (not the field itself).",
          ),
          step(
            "calculation",
            `Flujo hacia ${out ? "fuera" : "dentro"} que ${increasing ? "aumenta" : "disminuye"} → el campo inducido debe apuntar hacia ${out === increasing ? "dentro de la página" : "fuera de la página"}.<br>Campo inducido hacia fuera = corriente **antihoraria**; hacia dentro = **horaria**.`,
            `${out ? "Outward" : "Inward"} flux that ${increasing ? "increases" : "decreases"} → the induced field must point ${out === increasing ? "into the page" : "out of the page"}.<br>Induced field out of the page = **counter-clockwise** current; into the page = **clockwise**.`,
          ),
          step(
            "result",
            ccw
              ? "La corriente inducida circula en sentido antihorario vista de frente."
              : "La corriente inducida circula en sentido horario vista de frente.",
            ccw
              ? "The induced current flows counter-clockwise seen head-on."
              : "The induced current flows clockwise seen head-on.",
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Ideal transformer                                                */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "ind-app-01",
      subject: "physics",
      topicId: "induction",
      subtopicId: "applications",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 150,
      tags: ["transformer", "applications"],
      prerequisites: ["faraday"],
    },
    (rng) => {
      const pick = rng.pick([
        { Np: 1000, Ns: 100 },
        { Np: 1000, Ns: 50 },
        { Np: 500, Ns: 200 },
        { Np: 2000, Ns: 400 },
        { Np: 500, Ns: 100 },
        { Np: 2000, Ns: 50 },
        { Np: 1000, Ns: 200 },
      ]);
      const Vp = 220;
      const Vs = r1((Vp * pick.Ns) / pick.Np);
      return {
        skill: L("Transformador ideal", "Ideal transformer"),
        statement: L(
          `El primario de un transformador ideal tiene $${pick.Np}\\ \\text{espiras}$ y está conectado a $${Vp}\\ \\text{V}$. El secundario tiene $${pick.Ns}\\ \\text{espiras}$. ¿Qué tensión hay en el secundario? (2 cifras significativas)`,
          `The primary of an ideal transformer has $${pick.Np}\\ \\text{turns}$ and is connected to $${Vp}\\ \\text{V}$. The secondary has $${pick.Ns}\\ \\text{turns}$. What is the voltage across the secondary? (2 significant figures)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: Vs,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["V"],
          unitChoices: ["V", "A", "W", "Ω"],
        },
        hints: [
          L(
            "Datos: $V_p$, $N_p$ y $N_s$. Incógnita: $V_s$.",
            "Data: $V_p$, $N_p$ and $N_s$. Unknown: $V_s$.",
          ),
          L(
            "En un transformador ideal, $\\dfrac{V_s}{V_p} = \\dfrac{N_s}{N_p}$.",
            "In an ideal transformer, $\\dfrac{V_s}{V_p} = \\dfrac{N_s}{N_p}$.",
          ),
          L(
            `Despeja $V_s = V_p \\cdot \\frac{${pick.Ns}}{${pick.Np}}$.`,
            `Solve $V_s = V_p \\cdot \\frac{${pick.Ns}}{${pick.Np}}$.`,
          ),
        ],
        answerDisplay: L(`$V_s = ${tok(Vs)}\\ \\text{V}$`, `$V_s = ${tok(Vs)}\\ \\text{V}$`),
        solution: [
          step(
            "given",
            `$V_p = ${Vp}\\ \\text{V}$, $N_p = ${pick.Np}$, $N_s = ${pick.Ns}$`,
            `$V_p = ${Vp}\\ \\text{V}$, $N_p = ${pick.Np}$, $N_s = ${pick.Ns}$`,
          ),
          step(
            "approach",
            "Transformador ideal: $\\frac{V_s}{V_p} = \\frac{N_s}{N_p}$ (misma fem por espira).",
            "Ideal transformer: $\\frac{V_s}{V_p} = \\frac{N_s}{N_p}$ (same emf per turn).",
          ),
          step(
            "calculation",
            `$V_s = ${Vp} \\cdot \\frac{${pick.Ns}}{${pick.Np}} = ${Vp} \\cdot ${tok(pick.Ns / pick.Np)} = ${tok(Vs)}\\ \\text{V}$`,
            `$V_s = ${Vp} \\cdot \\frac{${pick.Ns}}{${pick.Np}} = ${Vp} \\cdot ${tok(pick.Ns / pick.Np)} = ${tok(Vs)}\\ \\text{V}$`,
          ),
          step(
            "result",
            pick.Ns < pick.Np
              ? `El secundario entrega $${tok(Vs)}\\ \\text{V}$ (transformador reductor).`
              : `El secundario entrega $${tok(Vs)}\\ \\text{V}$ (transformador elevador).`,
            pick.Ns < pick.Np
              ? `The secondary delivers $${tok(Vs)}\\ \\text{V}$ (step-down transformer).`
              : `The secondary delivers $${tok(Vs)}\\ \\text{V}$ (step-up transformer).`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Generator: peak emf                                              */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "ind-app-02",
      subject: "physics",
      topicId: "induction",
      subtopicId: "applications",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 210,
      tags: ["generator", "emf", "applications"],
      prerequisites: ["faraday"],
    },
    (rng) => {
      const pick = rng.pick([
        { N: 100, B: 0.5, A: 0.01, f: 50 },
        { N: 50, B: 0.5, A: 0.02, f: 50 },
        { N: 100, B: 0.2, A: 0.05, f: 60 },
        { N: 200, B: 0.8, A: 0.01, f: 50 },
        { N: 100, B: 0.5, A: 0.02, f: 60 },
        { N: 200, B: 0.5, A: 0.01, f: 60 },
      ]);
      const omega = r1(2 * Math.PI * pick.f);
      const emf = r1(pick.N * pick.B * pick.A * 2 * Math.PI * pick.f);
      return {
        skill: L("Fem máxima de un generador", "Peak emf of a generator"),
        statement: L(
          `Una bobina de $${pick.N}\\ \\text{espiras}$ y área $A = ${tok(pick.A)}\\ \\text{m}^2$ gira con frecuencia $f = ${pick.f}\\ \\text{Hz}$ dentro de un campo uniforme $B = ${tok(pick.B)}\\ \\text{T}$. Calcula la **fem máxima** (pico) inducida (2 cifras significativas).`,
          `A coil of $${pick.N}\\ \\text{turns}$ and area $A = ${tok(pick.A)}\\ \\text{m}^2$ rotates at frequency $f = ${pick.f}\\ \\text{Hz}$ inside a uniform field $B = ${tok(pick.B)}\\ \\text{T}$. Compute the **peak** induced emf (2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: emf,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["V"],
          unitChoices: ["V", "Hz", "T", "A"],
        },
        hints: [
          L(
            "Al girar, el flujo varía como $\\Phi = BA\\cos(\\omega t)$ con $\\omega = 2\\pi f$.",
            "While rotating, the flux varies as $\\Phi = BA\\cos(\\omega t)$ with $\\omega = 2\\pi f$.",
          ),
          L(
            "Derivando, la fem es $\\varepsilon = NBA\\omega\\,\\text{sen}(\\omega t)$; su valor máximo es $\\varepsilon_0 = NBA\\omega$.",
            "Differentiating, the emf is $\\varepsilon = NBA\\omega\\sin(\\omega t)$; its peak value is $\\varepsilon_0 = NBA\\omega$.",
          ),
          L(
            "No olvides convertir la frecuencia a velocidad angular antes de sustituir.",
            "Do not forget to convert the frequency to angular speed before substituting.",
          ),
        ],
        answerDisplay: L(`$\\varepsilon_0 \\approx ${tok(emf)}\\ \\text{V}$`, `$\\varepsilon_0 \\approx ${tok(emf)}\\ \\text{V}$`),
        solution: [
          step(
            "given",
            `$N = ${pick.N}$, $B = ${tok(pick.B)}\\ \\text{T}$, $A = ${tok(pick.A)}\\ \\text{m}^2$, $f = ${pick.f}\\ \\text{Hz}$`,
            `$N = ${pick.N}$, $B = ${tok(pick.B)}\\ \\text{T}$, $A = ${tok(pick.A)}\\ \\text{m}^2$, $f = ${pick.f}\\ \\text{Hz}$`,
          ),
          step(
            "approach",
            "Fem máxima de una bobina giratoria: $\\varepsilon_0 = NBA\\omega$, con $\\omega = 2\\pi f$.",
            "Peak emf of a rotating coil: $\\varepsilon_0 = NBA\\omega$, with $\\omega = 2\\pi f$.",
          ),
          step(
            "calculation",
            `$\\omega = 2\\pi f = 2\\pi \\cdot ${pick.f} \\approx ${tok(omega)}\\ \\text{rad/s}$<br>$\\varepsilon_0 = ${pick.N} \\cdot ${tok(pick.B)} \\cdot ${tok(pick.A)} \\cdot ${tok(omega)} \\approx ${tok(emf)}\\ \\text{V}$`,
            `$\\omega = 2\\pi f = 2\\pi \\cdot ${pick.f} \\approx ${tok(omega)}\\ \\text{rad/s}$<br>$\\varepsilon_0 = ${pick.N} \\cdot ${tok(pick.B)} \\cdot ${tok(pick.A)} \\cdot ${tok(omega)} \\approx ${tok(emf)}\\ \\text{V}$`,
          ),
          step(
            "result",
            `La fem máxima inducida es $\\approx ${tok(emf)}\\ \\text{V}$.`,
            `The peak induced emf is $\\approx ${tok(emf)}\\ \\text{V}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Challenge: sliding rod → power dissipated                        */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "ind-chal-01",
      subject: "physics",
      topicId: "induction",
      subtopicId: "applications",
      difficulty: "challenge",
      questionType: "numeric-unit",
      estimatedTimeSec: 300,
      tags: ["sliding-rod", "faraday", "ohm", "power", "multi-step"],
      prerequisites: ["faraday", "ohms-law", "electrical-power"],
    },
    (rng) => {
      const pick = rng.pick([
        { B: 0.5, len: 0.2, v: 3, R: 0.6 },
        { B: 0.4, len: 0.25, v: 4, R: 0.8 },
        { B: 0.8, len: 0.1, v: 5, R: 1.2 },
        { B: 0.5, len: 0.2, v: 5, R: 0.5 },
        { B: 0.4, len: 0.25, v: 2, R: 0.2 },
        { B: 0.8, len: 0.25, v: 3, R: 1.2 },
      ]);
      const emf = r2(pick.B * pick.len * pick.v);
      const current = r2(emf / pick.R);
      const power = r2((emf * emf) / pick.R);
      return {
        skill: L("Varilla deslizante: fem, corriente y potencia", "Sliding rod: emf, current and power"),
        statement: L(
          `Una varilla de longitud $L = ${tok(pick.len)}\\ \\text{m}$ se desliza a velocidad constante $v = ${pick.v}\\ \\text{m/s}$ sobre raíles conductores cerrados en una resistencia $R = ${tok(pick.R)}\\ \\Omega$, dentro de un campo $B = ${tok(pick.B)}\\ \\text{T}$ perpendicular al plano. Calcula la **potencia disipada** en la resistencia (en vatios, 2 cifras significativas).`,
          `A rod of length $L = ${tok(pick.len)}\\ \\text{m}$ slides at constant speed $v = ${pick.v}\\ \\text{m/s}$ on conducting rails closed by a resistor $R = ${tok(pick.R)}\\ \\Omega$, inside a field $B = ${tok(pick.B)}\\ \\text{T}$ perpendicular to the plane. Compute the **power dissipated** in the resistor (in watts, 2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: power,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["W"],
          unitChoices: ["W", "V", "A", "J"],
        },
        hints: [
          L(
            "Son tres pasos: fem inducida, corriente y potencia.",
            "There are three steps: induced emf, current, and power.",
          ),
          L(
            "Fem: $\\varepsilon = BLv$. Corriente: $I = \\varepsilon/R$. Potencia: $P = I^2R = \\varepsilon^2/R$.",
            "Emf: $\\varepsilon = BLv$. Current: $I = \\varepsilon/R$. Power: $P = I^2R = \\varepsilon^2/R$.",
          ),
          L(
            "Calcula primero $\\varepsilon$ y luego usa $P = \\varepsilon^2/R$ para ahorrar un paso.",
            "Compute $\\varepsilon$ first and then use $P = \\varepsilon^2/R$ to save one step.",
          ),
        ],
        answerDisplay: L(`$P \\approx ${tok(power)}\\ \\text{W}$`, `$P \\approx ${tok(power)}\\ \\text{W}$`),
        solution: [
          step(
            "given",
            `$B = ${tok(pick.B)}\\ \\text{T}$, $L = ${tok(pick.len)}\\ \\text{m}$, $v = ${pick.v}\\ \\text{m/s}$, $R = ${tok(pick.R)}\\ \\Omega$`,
            `$B = ${tok(pick.B)}\\ \\text{T}$, $L = ${tok(pick.len)}\\ \\text{m}$, $v = ${pick.v}\\ \\text{m/s}$, $R = ${tok(pick.R)}\\ \\Omega$`,
          ),
          step(
            "approach",
            "Combinamos Faraday ($\\varepsilon = BLv$), Ohm ($I = \\varepsilon/R$) y Joule ($P = \\varepsilon^2/R$).",
            "We combine Faraday ($\\varepsilon = BLv$), Ohm ($I = \\varepsilon/R$) and Joule ($P = \\varepsilon^2/R$).",
          ),
          step(
            "calculation",
            `**Fem:** $\\varepsilon = ${tok(pick.B)} \\cdot ${tok(pick.len)} \\cdot ${pick.v} = ${tok(emf)}\\ \\text{V}$<br>**Corriente:** $I = \\frac{ ${tok(emf)}}{ ${tok(pick.R)}} = ${tok(current)}\\ \\text{A}$<br>**Potencia:** $P = I^2R = \\frac{ ${tok(emf)}^2}{ ${tok(pick.R)}} \\approx ${tok(power)}\\ \\text{W}$`,
            `**Emf:** $\\varepsilon = ${tok(pick.B)} \\cdot ${tok(pick.len)} \\cdot ${pick.v} = ${tok(emf)}\\ \\text{V}$<br>**Current:** $I = \\frac{ ${tok(emf)}}{ ${tok(pick.R)}} = ${tok(current)}\\ \\text{A}$<br>**Power:** $P = I^2R = \\frac{ ${tok(emf)}^2}{ ${tok(pick.R)}} \\approx ${tok(power)}\\ \\text{W}$`,
          ),
          step(
            "result",
            `La resistencia disipa $\\approx ${tok(power)}\\ \\text{W}$; esa es también la potencia mecánica que hay que suministrar a la varilla.`,
            `The resistor dissipates $\\approx ${tok(power)}\\ \\text{W}$; that is also the mechanical power that must be supplied to the rod.`,
          ),
        ],
      };
    },
  ),
];
