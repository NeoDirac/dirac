/**
 * PHYSICS · Magnetism
 *
 * Magnetic fields (right-hand rule around wires), the Lorentz force on
 * moving charges, forces on current-carrying wires, circular motion of
 * charged particles, and the basic idea of electromagnetic induction.
 */

import { template, L, step, tok } from "@/lib/problem";
import type { ProblemTemplate, McOption } from "@/lib/types";

/* Physical constants — must match the values quoted in the statements. */
const QE = 1.6e-19; // elementary charge (C)
const MP = 1.67e-27; // proton mass (kg)
const MU0_2PI = 2e-7; // μ0/(2π) (T·m/A)

/* Small deterministic formatting helpers (no RNG inside). */
const r1 = (v: number) => Math.round(v * 10) / 10;
const r2 = (v: number) => Math.round(v * 100) / 100;

/** Splits a value into mantissa (2 decimals) × 10^exp for display/checking. */
function sci(v: number): { man: number; exp: number; value: number } {
  const exp = Math.floor(Math.log10(Math.abs(v)));
  const man = Math.round((v / Math.pow(10, exp)) * 100) / 100;
  return { man, exp, value: man * Math.pow(10, exp) };
}

/** Short bilingual description of an axis direction (screen/page framing). */
function axisDesc(axis: "x" | "y" | "z", s: 1 | -1): { es: string; en: string } {
  if (axis === "x") {
    return s > 0
      ? { es: "$+x$ (a la derecha)", en: "$+x$ (to the right)" }
      : { es: "$-x$ (a la izquierda)", en: "$-x$ (to the left)" };
  }
  if (axis === "y") {
    return s > 0
      ? { es: "$+y$ (hacia arriba)", en: "$+y$ (upward)" }
      : { es: "$-y$ (hacia abajo)", en: "$-y$ (downward)" };
  }
  return s > 0
    ? { es: "$+z$ (hacia fuera de la página)", en: "$+z$ (out of the page)" }
    : { es: "$-z$ (hacia dentro de la página)", en: "$-z$ (into the page)" };
}

export const templates: ProblemTemplate[] = [
  /* ---------------------------------------------------------------- */
  /* Field direction around a straight wire (right-hand rule, MC)     */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "mag-field-01",
      subject: "physics",
      topicId: "magnetism",
      subtopicId: "magnetic-fields",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 90,
      tags: ["magnetic-field", "right-hand-rule", "straight-wire"],
      prerequisites: [],
    },
    (rng) => {
      // compass order counter-clockwise viewed from above, current pointing up
      const dirs = ["este", "norte", "oeste", "sur"];
      const dirEn = (d: string): string =>
        d === "este" ? "east" : d === "norte" ? "north" : d === "oeste" ? "west" : "south";
      const currentUp = rng.bool();
      const idx = rng.int(0, 3);
      const point = dirs[idx];
      const bDir = dirs[(idx + (currentUp ? 1 : 3)) % 4];
      const options: McOption[] = dirs.map((d, i) => ({
        id: String.fromCharCode(97 + i),
        text: L(`Hacia el ${d}`, `Toward the ${dirEn(d)}`),
        correct: d === bDir,
      }));
      return {
        skill: L("Regla de la mano derecha en un hilo recto", "Right-hand rule for a straight wire"),
        statement: L(
          `Un hilo vertical largo transporta una corriente que va **${currentUp ? "hacia arriba" : "hacia abajo"}**. Mirando **desde arriba**, ¿hacia dónde apunta el campo magnético en un punto P situado al **${point}** del hilo?`,
          `A long vertical wire carries a current flowing **${currentUp ? "upward" : "downward"}**. Looking **from above**, which way does the magnetic field point at a point P located to the **${dirEn(point)}** of the wire?`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El campo magnético de un hilo recto circula en circunferencias centradas en el hilo.",
            "The magnetic field of a straight wire circulates in circles centred on the wire.",
          ),
          L(
            "Regla de la mano derecha: el pulgar sigue la corriente y los dedos se curvan en el sentido del campo.",
            "Right-hand rule: the thumb follows the current and the curled fingers follow the field.",
          ),
          L(
            "Con la corriente hacia arriba, el campo gira en sentido antihorario visto desde arriba; se invierte si la corriente baja. El campo en P es tangente al círculo que pasa por P.",
            "With the current upward the field circles counter-clockwise viewed from above; it reverses if the current goes down. The field at P is tangent to the circle through P.",
          ),
        ],
        answerDisplay: L(`Hacia el ${bDir}`, `Toward the ${dirEn(bDir)}`),
        solution: [
          step(
            "given",
            `Hilo vertical con corriente hacia ${currentUp ? "arriba" : "abajo"}; el punto P está al ${point} del hilo.`,
            `Vertical wire with current flowing ${currentUp ? "upward" : "downward"}; point P lies to the ${dirEn(point)} of the wire.`,
          ),
          step(
            "approach",
            "El campo de un hilo recto es tangente a circunferencias centradas en el hilo; su sentido se obtiene con la regla de la mano derecha.",
            "The field of a straight wire is tangent to circles centred on the wire; its sense follows from the right-hand rule.",
          ),
          step(
            "calculation",
            `Pulgar hacia ${currentUp ? "arriba" : "abajo"}: visto desde arriba, los dedos se curvan en sentido ${currentUp ? "antihorario" : "horario"}.<br>En un punto al ${point}, la tangente a la circunferencia apunta hacia el ${bDir}.`,
            `Thumb ${currentUp ? "upward" : "downward"}: viewed from above, the fingers curl ${currentUp ? "counter-clockwise" : "clockwise"}.<br>At a point to the ${dirEn(point)}, the tangent to the circle points toward the ${dirEn(bDir)}.`,
          ),
          step(
            "result",
            `El campo magnético en P apunta hacia el ${bDir}.`,
            `The magnetic field at P points toward the ${dirEn(bDir)}.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Lorentz force on a proton (F = qvB)                              */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "mag-force-01",
      subject: "physics",
      topicId: "magnetism",
      subtopicId: "magnetic-force",
      difficulty: "easy",
      questionType: "numeric-unit",
      estimatedTimeSec: 90,
      tags: ["lorentz-force", "magnetic-force"],
      prerequisites: [],
    },
    (rng) => {
      const v = rng.pick([2, 3, 4, 5]); // ×10⁵ m/s
      const B = rng.pick([0.5, 0.8, 1.2]); // T
      const F = sci(QE * v * 1e5 * B);
      return {
        skill: L("Fuerza magnética sobre una carga en movimiento", "Magnetic force on a moving charge"),
        statement: L(
          `Un protón ($q = 1{,}6\\times10^{-19}\\ \\text{C}$) se mueve con $v = ${v}\\times10^{5}\\ \\text{m/s}$ en dirección **perpendicular** a un campo magnético de $${tok(B)}\\ \\text{T}$. Calcula el módulo de la fuerza magnética (2 cifras significativas).`,
          `A proton ($q = 1.6\\times10^{-19}\\ \\text{C}$) moves at $v = ${v}\\times10^{5}\\ \\text{m/s}$ **perpendicular** to a magnetic field of $${tok(B)}\\ \\text{T}$. Compute the magnitude of the magnetic force (2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: F.value,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["N"],
          unitChoices: ["N", "J", "T", "C"],
        },
        hints: [
          L(
            "Identifica los datos: $q$, $v$ y $B$, con $\\theta = 90^{\\circ}$ entre $\\vec{v}$ y $\\vec{B}$.",
            "Identify the data: $q$, $v$ and $B$, with $\\theta = 90^{\\circ}$ between $\\vec{v}$ and $\\vec{B}$.",
          ),
          L(
            "La fuerza magnética es $F = qvB\\,\\text{sen}\\,\\theta$; con $\\text{sen}\\,90^{\\circ} = 1$ queda $F = qvB$.",
            "The magnetic force is $F = qvB\\sin\\theta$; with $\\sin 90^{\\circ} = 1$ it becomes $F = qvB$.",
          ),
          L(
            "Multiplica los coeficientes y suma los exponentes: $10^{-19}\\cdot10^{5} = 10^{-14}$.",
            "Multiply the coefficients and add the exponents: $10^{-19}\\cdot10^{5} = 10^{-14}$.",
          ),
        ],
        answerDisplay: L(
          `$F \\approx ${tok(F.man)}\\times10^{${F.exp}}\\ \\text{N}$`,
          `$F \\approx ${tok(F.man)}\\times10^{${F.exp}}\\ \\text{N}$`,
        ),
        solution: [
          step(
            "given",
            `$q = 1{,}6\\times10^{-19}\\ \\text{C}$, $v = ${v}\\times10^{5}\\ \\text{m/s}$, $B = ${tok(B)}\\ \\text{T}$, $\\theta = 90^{\\circ}$`,
            `$q = 1.6\\times10^{-19}\\ \\text{C}$, $v = ${v}\\times10^{5}\\ \\text{m/s}$, $B = ${tok(B)}\\ \\text{T}$, $\\theta = 90^{\\circ}$`,
          ),
          step(
            "approach",
            "Fuerza de Lorentz con la velocidad perpendicular al campo: $F = qvB$.",
            "Lorentz force with the velocity perpendicular to the field: $F = qvB$.",
          ),
          step(
            "calculation",
            `$F = (1{,}6\\times10^{-19})\\cdot(${v}\\times10^{5})\\cdot${tok(B)}$<br>$F = (1{,}6\\cdot${v}\\cdot${tok(B)})\\times10^{-14} = ${tok(F.man)}\\times10^{-14}\\ \\text{N}$`,
            `$F = (1.6\\times10^{-19})\\cdot(${v}\\times10^{5})\\cdot${tok(B)}$<br>$F = (1.6\\cdot${v}\\cdot${tok(B)})\\times10^{-14} = ${tok(F.man)}\\times10^{-14}\\ \\text{N}$`,
          ),
          step(
            "result",
            `La fuerza magnética sobre el protón es $\\approx ${tok(F.man)}\\times10^{-14}\\ \\text{N}$.`,
            `The magnetic force on the proton is $\\approx ${tok(F.man)}\\times10^{-14}\\ \\text{N}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* What induces a current (MC)                                      */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "mag-induct-01",
      subject: "physics",
      topicId: "magnetism",
      subtopicId: "induction-basics",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 90,
      tags: ["induction", "flux", "conceptual"],
      prerequisites: [],
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "Un imán en reposo dentro de una bobina cerrada",
            "A magnet at rest inside a closed coil",
          ),
          correct: false,
        },
        {
          id: "b",
          text: L(
            "Un imán que se acerca a una bobina cerrada",
            "A magnet moving toward a closed coil",
          ),
          correct: true,
        },
        {
          id: "c",
          text: L(
            "Una bobina dentro de una región de campo magnético constante y uniforme",
            "A coil inside a region of constant, uniform magnetic field",
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            "Un imán que se mueve junto a un circuito con el interruptor abierto",
            "A magnet moving next to a circuit whose switch is open",
          ),
          correct: false,
        },
      ];
      return {
        skill: L("¿Cuándo se induce una corriente?", "When is a current induced?"),
        statement: L(
          "¿En cuál de estas situaciones se induce una **corriente** en la bobina o espira?",
          "In which of these situations is a **current** induced in the coil or loop?",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Para que haya corriente inducida se necesita fem inducida (ley de Faraday).",
            "An induced current requires an induced emf (Faraday's law).",
          ),
          L(
            "La fem aparece solo si el **flujo magnético** que atraviesa la espira cambia con el tiempo.",
            "An emf appears only if the magnetic **flux** through the loop changes with time.",
          ),
          L(
            "Además, el circuito debe estar cerrado para que la fem produzca corriente.",
            "Additionally, the circuit must be closed for the emf to drive a current.",
          ),
        ],
        answerDisplay: L(
          "Solo con el imán acercándose a la bobina cerrada: el flujo cambia y el circuito está cerrado.",
          "Only with the magnet approaching the closed coil: the flux changes and the circuit is closed.",
        ),
        solution: [
          step(
            "given",
            "Cuatro situaciones posibles; hay que decidir en cuál se induce corriente.",
            "Four possible situations; we must decide in which one a current is induced.",
          ),
          step(
            "approach",
            "Ley de Faraday: fem inducida $\\varepsilon = -N\\,\\dfrac{\\Delta\\Phi}{\\Delta t}$; hace falta un flujo **cambiante** y un circuito **cerrado**.",
            "Faraday's law: induced emf $\\varepsilon = -N\\,\\dfrac{\\Delta\\Phi}{\\Delta t}$; we need a **changing** flux and a **closed** circuit.",
          ),
          step(
            "calculation",
            "Imán en reposo o campo constante → $\\Delta\\Phi = 0$ → sin fem.<br>Interruptor abierto → hay fem pero no puede circular corriente.<br>Imán acercándose a una bobina cerrada → $\\Delta\\Phi \\neq 0$ y circuito cerrado → corriente inducida.",
            "Magnet at rest or constant field → $\\Delta\\Phi = 0$ → no emf.<br>Open switch → emf may exist but no current can flow.<br>Magnet approaching a closed coil → $\\Delta\\Phi \\neq 0$ and closed circuit → induced current.",
          ),
          step(
            "result",
            "La única situación con corriente inducida es el imán que se acerca a la bobina cerrada.",
            "The only situation with an induced current is the magnet approaching the closed coil.",
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Force on a current-carrying wire (F = BIL)                       */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "mag-force-02",
      subject: "physics",
      topicId: "magnetism",
      subtopicId: "wires",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 120,
      tags: ["magnetic-force", "current", "wires"],
      prerequisites: ["magnetic-force"],
    },
    (rng) => {
      const B = rng.pick([0.2, 0.5, 0.8, 1.2, 1.5]);
      const I = rng.pick([2, 3.5, 5, 6, 8]);
      const len = rng.pick([0.1, 0.2, 0.25, 0.4, 0.5]);
      const F = r2(B * I * len);
      return {
        skill: L("Fuerza sobre un hilo con corriente", "Force on a current-carrying wire"),
        statement: L(
          `Un tramo recto de hilo de longitud $L = ${tok(len)}\\ \\text{m}$ transporta una corriente de $I = ${tok(I)}\\ \\text{A}$ en dirección perpendicular a un campo magnético de $${tok(B)}\\ \\text{T}$. ¿Qué fuerza ejerce el campo sobre el tramo de hilo? (2 cifras significativas)`,
          `A straight wire segment of length $L = ${tok(len)}\\ \\text{m}$ carries a current of $I = ${tok(I)}\\ \\text{A}$ perpendicular to a magnetic field of $${tok(B)}\\ \\text{T}$. What force does the field exert on the wire segment? (2 significant figures)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: F,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["N"],
          unitChoices: ["N", "T", "A", "N/m"],
        },
        hints: [
          L(
            "Datos: $B$, $I$, $L$ (perpendiculares). Incógnita: $F$.",
            "Data: $B$, $I$, $L$ (perpendicular). Unknown: $F$.",
          ),
          L(
            "La fuerza sobre un hilo con corriente es $F = BIL\\,\\text{sen}\\,\\theta$, y aquí $\\theta = 90^{\\circ}$.",
            "The force on a current-carrying wire is $F = BIL\\sin\\theta$, and here $\\theta = 90^{\\circ}$.",
          ),
          L(
            "Sustituye directamente los tres valores: $F = B \\cdot I \\cdot L$.",
            "Substitute the three values directly: $F = B \\cdot I \\cdot L$.",
          ),
        ],
        answerDisplay: L(`$F = ${tok(F)}\\ \\text{N}$`, `$F = ${tok(F)}\\ \\text{N}$`),
        solution: [
          step(
            "given",
            `$B = ${tok(B)}\\ \\text{T}$, $I = ${tok(I)}\\ \\text{A}$, $L = ${tok(len)}\\ \\text{m}$, $\\theta = 90^{\\circ}$`,
            `$B = ${tok(B)}\\ \\text{T}$, $I = ${tok(I)}\\ \\text{A}$, $L = ${tok(len)}\\ \\text{m}$, $\\theta = 90^{\\circ}$`,
          ),
          step(
            "approach",
            "Fuerza sobre un conductor rectilíneo: $F = BIL$ (campo perpendicular a la corriente).",
            "Force on a straight conductor: $F = BIL$ (field perpendicular to the current).",
          ),
          step(
            "calculation",
            `$F = ${tok(B)} \\cdot ${tok(I)} \\cdot ${tok(len)} = ${tok(F)}\\ \\text{N}$`,
            `$F = ${tok(B)} \\cdot ${tok(I)} \\cdot ${tok(len)} = ${tok(F)}\\ \\text{N}$`,
          ),
          step(
            "result",
            `El campo ejerce una fuerza de $${tok(F)}\\ \\text{N}$ sobre el tramo de hilo.`,
            `The field exerts a force of $${tok(F)}\\ \\text{N}$ on the wire segment.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Direction of the magnetic force (v × B, MC + vectors diagram)    */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "mag-force-03",
      subject: "physics",
      topicId: "magnetism",
      subtopicId: "magnetic-force",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["right-hand-rule", "cross-product", "lorentz-force"],
      prerequisites: ["magnetic-force"],
    },
    (rng) => {
      const vAxis: "x" | "y" = rng.pick(["x", "y"] as const);
      const bAxis: "x" | "y" = vAxis === "x" ? "y" : "x";
      const vs = rng.sign();
      const bs = rng.sign();
      const isElectron = rng.bool();
      // v̂ × B̂ : x̂×ŷ = ẑ  (and reversed if the axes are swapped)
      const crossZ = (vAxis === "x" ? 1 : -1) * vs * bs;
      const fz = isElectron ? -crossZ : crossZ;
      const fSign: 1 | -1 = fz > 0 ? 1 : -1;
      const vDesc = axisDesc(vAxis, vs);
      const bDesc = axisDesc(bAxis, bs);
      const fDesc = axisDesc("z", fSign);
      const fOpp = axisDesc("z", (-fSign) as 1 | -1);
      const options: McOption[] = [
        { id: "a", text: L(fDesc.es, fDesc.en), correct: true },
        { id: "b", text: L(fOpp.es, fOpp.en), correct: false },
        { id: "c", text: L(vDesc.es, vDesc.en), correct: false },
        { id: "d", text: L(bDesc.es, bDesc.en), correct: false },
      ];
      return {
        skill: L("Dirección de la fuerza magnética (v × B)", "Direction of the magnetic force (v × B)"),
        statement: L(
          `Un ${isElectron ? "electrón (carga $-e$)" : "protón (carga $+e$)"} se mueve con velocidad ${vDesc.es}. En esa región hay un campo magnético ${bDesc.es}. ¿Hacia dónde apunta la fuerza magnética sobre la partícula?`,
          `An ${isElectron ? "electron (charge $-e$)" : "proton (charge $+e$)"} moves with velocity ${vDesc.en}. The region contains a magnetic field ${bDesc.en}. Which way does the magnetic force on the particle point?`,
        ),
        diagram: {
          kind: "vectors",
          xMin: -1.6,
          xMax: 1.6,
          yMin: -1.6,
          yMax: 1.6,
          vectors: [
            { x: vAxis === "x" ? vs : 0, y: vAxis === "y" ? vs : 0, label: "v", color: "primary" },
            { x: bAxis === "x" ? bs : 0, y: bAxis === "y" ? bs : 0, label: "B", color: "secondary" },
          ],
          showGrid: true,
          xLabel: "x",
          yLabel: "y",
        },
        diagramLabel: L(
          "Vectores velocidad (v) y campo magnético (B) sobre los ejes x e y; la fuerza es perpendicular al plano de la página.",
          "Velocity (v) and magnetic field (B) vectors on the x and y axes; the force is perpendicular to the plane of the page.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "La fuerza magnética es $\\vec{F} = q\\,\\vec{v}\\times\\vec{B}$, perpendicular a $\\vec{v}$ y a $\\vec{B}$ a la vez.",
            "The magnetic force is $\\vec{F} = q\\,\\vec{v}\\times\\vec{B}$, perpendicular to both $\\vec{v}$ and $\\vec{B}$.",
          ),
          L(
            "Regla de la mano derecha: dedos según $\\vec{v}$, se curvan hacia $\\vec{B}$; el pulgar da $\\vec{v}\\times\\vec{B}$. Si la carga es negativa, invierte el sentido.",
            "Right-hand rule: fingers along $\\vec{v}$, curl toward $\\vec{B}$; the thumb gives $\\vec{v}\\times\\vec{B}$. If the charge is negative, flip the direction.",
          ),
          L(
            "Recuerda: $\\hat{x}\\times\\hat{y} = \\hat{z}$ (y al cambiar el orden se invierte el resultado).",
            "Remember: $\\hat{x}\\times\\hat{y} = \\hat{z}$ (swapping the order reverses the result).",
          ),
        ],
        answerDisplay: L(fDesc.es, fDesc.en),
        solution: [
          step(
            "given",
            `Partícula: ${isElectron ? "electrón, $q = -e$" : "protón, $q = +e$"}; $\\vec{v}$ según ${vDesc.es}; $\\vec{B}$ según ${bDesc.es}.`,
            `Particle: ${isElectron ? "electron, $q = -e$" : "proton, $q = +e$"}; $\\vec{v}$ along ${vDesc.en}; $\\vec{B}$ along ${bDesc.en}.`,
          ),
          step(
            "approach",
            "$\\vec{F} = q\\,(\\vec{v}\\times\\vec{B})$: primero el producto vectorial con la regla de la mano derecha y después el signo de la carga.",
            "$\\vec{F} = q\\,(\\vec{v}\\times\\vec{B})$: first the cross product via the right-hand rule, then the sign of the charge.",
          ),
          step(
            "calculation",
            `$\\vec{v}\\times\\vec{B}$ apunta ${axisDesc("z", (crossZ > 0 ? 1 : -1) as 1 | -1).es}.${isElectron ? "<br>La carga es negativa → se invierte el sentido." : "<br>La carga es positiva → no se invierte."}`,
            `$\\vec{v}\\times\\vec{B}$ points ${axisDesc("z", (crossZ > 0 ? 1 : -1) as 1 | -1).en}.${isElectron ? "<br>The charge is negative → flip the direction." : "<br>The charge is positive → keep the direction."}`,
          ),
          step(
            "result",
            `La fuerza magnética apunta ${fDesc.es}.`,
            `The magnetic force points ${fDesc.en}.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Field of a straight wire (B = μ0I/2πr)                           */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "mag-field-02",
      subject: "physics",
      topicId: "magnetism",
      subtopicId: "magnetic-fields",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 150,
      tags: ["magnetic-field", "straight-wire", "sci-notation"],
      prerequisites: [],
    },
    (rng) => {
      const I = rng.pick([10, 20, 25, 40]);
      const rCm = rng.pick([5, 10, 20]);
      const Bv = sci((MU0_2PI * I) / (rCm / 100));
      return {
        skill: L("Campo magnético de un hilo recto", "Magnetic field of a straight wire"),
        statement: L(
          `Un hilo recto y largo transporta una corriente de $I = ${I}\\ \\text{A}$. Calcula el módulo del campo magnético a una distancia de $${rCm}\\ \\text{cm}$ del hilo, en teslas (2 cifras significativas). Dato: $\\frac{\\mu_0}{2\\pi} = 2\\times10^{-7}\\ \\text{T}\\cdot\\text{m/A}$.`,
          `A long straight wire carries a current $I = ${I}\\ \\text{A}$. Compute the magnitude of the magnetic field at a distance of $${rCm}\\ \\text{cm}$ from the wire, in teslas (2 significant figures). Data: $\\frac{\\mu_0}{2\\pi} = 2\\times10^{-7}\\ \\text{T}\\cdot\\text{m/A}$.`,
        ),
        answer: {
          kind: "numeric-unit",
          value: Bv.value,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["T"],
          unitChoices: ["T", "N", "A", "Wb"],
        },
        hints: [
          L(
            "Datos: $I$ y $r$ (convierte $r$ a metros). Incógnita: $B$.",
            "Data: $I$ and $r$ (convert $r$ to metres). Unknown: $B$.",
          ),
          L(
            "El campo de un hilo recto es $B = \\frac{\\mu_0 I}{2\\pi r} = 2\\times10^{-7}\\,\\frac{I}{r}$.",
            "The field of a straight wire is $B = \\frac{\\mu_0 I}{2\\pi r} = 2\\times10^{-7}\\,\\frac{I}{r}$.",
          ),
          L(
            "Sustituye $I$ en amperios y $r$ en metros; el resultado sale en teslas (probablemente en notación científica).",
            "Substitute $I$ in amperes and $r$ in metres; the result comes in teslas (likely in scientific notation).",
          ),
        ],
        answerDisplay: L(
          `$B \\approx ${tok(Bv.man)}\\times10^{${Bv.exp}}\\ \\text{T}$`,
          `$B \\approx ${tok(Bv.man)}\\times10^{${Bv.exp}}\\ \\text{T}$`,
        ),
        solution: [
          step(
            "given",
            `$I = ${I}\\ \\text{A}$, $r = ${rCm}\\ \\text{cm} = ${tok(rCm / 100)}\\ \\text{m}$, $\\frac{\\mu_0}{2\\pi} = 2\\times10^{-7}\\ \\text{T}\\cdot\\text{m/A}$`,
            `$I = ${I}\\ \\text{A}$, $r = ${rCm}\\ \\text{cm} = ${tok(rCm / 100)}\\ \\text{m}$, $\\frac{\\mu_0}{2\\pi} = 2\\times10^{-7}\\ \\text{T}\\cdot\\text{m/A}$`,
          ),
          step(
            "approach",
            "Campo de un hilo recto: $B = \\frac{\\mu_0 I}{2\\pi r}$, todo en unidades del SI.",
            "Field of a straight wire: $B = \\frac{\\mu_0 I}{2\\pi r}$, all in SI units.",
          ),
          step(
            "calculation",
            `$B = 2\\times10^{-7}\\ \\frac{\\text{T}\\cdot\\text{m}}{\\text{A}} \\cdot \\frac{${I}\\ \\text{A}}{ ${tok(rCm / 100)}\\ \\text{m}} = ${tok(Bv.man)}\\times10^{${Bv.exp}}\\ \\text{T}$`,
            `$B = 2\\times10^{-7}\\ \\frac{\\text{T}\\cdot\\text{m}}{\\text{A}} \\cdot \\frac{${I}\\ \\text{A}}{ ${tok(rCm / 100)}\\ \\text{m}} = ${tok(Bv.man)}\\times10^{${Bv.exp}}\\ \\text{T}$`,
          ),
          step(
            "result",
            `El campo a ${rCm} cm del hilo es $\\approx ${tok(Bv.man)}\\times10^{${Bv.exp}}\\ \\text{T}$.`,
            `The field at ${rCm} cm from the wire is $\\approx ${tok(Bv.man)}\\times10^{${Bv.exp}}\\ \\text{T}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Force per unit length between parallel wires                     */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "mag-wire-01",
      subject: "physics",
      topicId: "magnetism",
      subtopicId: "wires",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 180,
      tags: ["parallel-wires", "magnetic-force", "sci-notation"],
      prerequisites: ["magnetic-fields"],
    },
    (rng) => {
      const I1 = rng.pick([5, 10, 20]);
      const I2 = rng.pick([10, 20, 40]);
      const dCm = rng.pick([5, 10, 20]);
      const FL = sci((MU0_2PI * I1 * I2) / (dCm / 100));
      return {
        skill: L("Fuerza entre hilos paralelos", "Force between parallel wires"),
        statement: L(
          `Dos hilos rectos y largos, paralelos, separados $${dCm}\\ \\text{cm}$, transportan corrientes del mismo sentido de $${I1}\\ \\text{A}$ y $${I2}\\ \\text{A}$. Calcula la fuerza por unidad de longitud sobre cada hilo (en N/m, 2 cifras significativas). Dato: $\\frac{\\mu_0}{2\\pi} = 2\\times10^{-7}\\ \\text{T}\\cdot\\text{m/A}$.`,
          `Two long, straight, parallel wires separated by $${dCm}\\ \\text{cm}$ carry same-direction currents of $${I1}\\ \\text{A}$ and $${I2}\\ \\text{A}$. Compute the force per unit length on each wire (in N/m, 2 significant figures). Data: $\\frac{\\mu_0}{2\\pi} = 2\\times10^{-7}\\ \\text{T}\\cdot\\text{m/A}$.`,
        ),
        answer: {
          kind: "numeric-unit",
          value: FL.value,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["N/m", "N*m^-1"],
          unitChoices: ["N/m", "N", "N·m", "A/m"],
        },
        hints: [
          L(
            "Datos: $I_1$, $I_2$ y la separación $d$ (en metros). Incógnita: $F/L$.",
            "Data: $I_1$, $I_2$ and the separation $d$ (in metres). Unknown: $F/L$.",
          ),
          L(
            "La fuerza por unidad de longitud entre hilos paralelos es $\\frac{F}{L} = \\frac{\\mu_0 I_1 I_2}{2\\pi d} = 2\\times10^{-7}\\frac{I_1 I_2}{d}$.",
            "The force per unit length between parallel wires is $\\frac{F}{L} = \\frac{\\mu_0 I_1 I_2}{2\\pi d} = 2\\times10^{-7}\\frac{I_1 I_2}{d}$.",
          ),
          L(
            "Sustituye con $d$ en metros y simplifica las potencias de 10.",
            "Substitute with $d$ in metres and simplify the powers of ten.",
          ),
        ],
        answerDisplay: L(
          `$\\frac{F}{L} \\approx ${tok(FL.man)}\\times10^{${FL.exp}}\\ \\text{N/m}$`,
          `$\\frac{F}{L} \\approx ${tok(FL.man)}\\times10^{${FL.exp}}\\ \\text{N/m}$`,
        ),
        solution: [
          step(
            "given",
            `$I_1 = ${I1}\\ \\text{A}$, $I_2 = ${I2}\\ \\text{A}$, $d = ${dCm}\\ \\text{cm} = ${tok(dCm / 100)}\\ \\text{m}$`,
            `$I_1 = ${I1}\\ \\text{A}$, $I_2 = ${I2}\\ \\text{A}$, $d = ${dCm}\\ \\text{cm} = ${tok(dCm / 100)}\\ \\text{m}$`,
          ),
          step(
            "approach",
            "Fuerza entre hilos paralelos: $\\frac{F}{L} = \\frac{\\mu_0 I_1 I_2}{2\\pi d}$; como las corrientes tienen el mismo sentido, los hilos se atraen.",
            "Force between parallel wires: $\\frac{F}{L} = \\frac{\\mu_0 I_1 I_2}{2\\pi d}$; since the currents point the same way, the wires attract.",
          ),
          step(
            "calculation",
            `$\\frac{F}{L} = 2\\times10^{-7} \\cdot \\frac{${I1} \\cdot ${I2}}{ ${tok(dCm / 100)}} = 2\\times10^{-7} \\cdot ${tok((I1 * I2) / (dCm / 100))}$<br>$\\frac{F}{L} \\approx ${tok(FL.man)}\\times10^{${FL.exp}}\\ \\text{N/m}$`,
            `$\\frac{F}{L} = 2\\times10^{-7} \\cdot \\frac{${I1} \\cdot ${I2}}{ ${tok(dCm / 100)}} = 2\\times10^{-7} \\cdot ${tok((I1 * I2) / (dCm / 100))}$<br>$\\frac{F}{L} \\approx ${tok(FL.man)}\\times10^{${FL.exp}}\\ \\text{N/m}$`,
          ),
          step(
            "result",
            `Cada hilo sufre una fuerza por unidad de longitud de $\\approx ${tok(FL.man)}\\times10^{${FL.exp}}\\ \\text{N/m}$, de atracción.`,
            `Each wire experiences a force per unit length of $\\approx ${tok(FL.man)}\\times10^{${FL.exp}}\\ \\text{N/m}$, attractive.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Radius of a proton's circular path (r = mv/qB)                   */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "mag-charged-01",
      subject: "physics",
      topicId: "magnetism",
      subtopicId: "charged-particles",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 180,
      tags: ["circular-motion", "charged-particles"],
      prerequisites: ["magnetic-force"],
    },
    (rng) => {
      const v = rng.pick([2, 4, 6, 8]); // ×10⁵ m/s
      const B = rng.pick([0.2, 0.4, 0.5]);
      const rM = (MP * v * 1e5) / (QE * B);
      const rCm = r2(rM * 100);
      return {
        skill: L("Radio de la órbita de una partícula cargada", "Radius of a charged particle's orbit"),
        statement: L(
          `Un protón ($m = 1{,}67\\times10^{-27}\\ \\text{kg}$, $q = 1{,}6\\times10^{-19}\\ \\text{C}$) entra con velocidad $v = ${v}\\times10^{5}\\ \\text{m/s}$ perpendicular a un campo magnético de $${tok(B)}\\ \\text{T}$, y describe una circunferencia. Calcula el radio en cm (2 cifras significativas).`,
          `A proton ($m = 1.67\\times10^{-27}\\ \\text{kg}$, $q = 1.6\\times10^{-19}\\ \\text{C}$) enters at $v = ${v}\\times10^{5}\\ \\text{m/s}$ perpendicular to a magnetic field of $${tok(B)}\\ \\text{T}$ and moves in a circle. Compute the radius in cm (2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: rCm,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["cm"],
          unitChoices: ["cm", "m", "mm", "m/s"],
        },
        hints: [
          L(
            "La fuerza magnética, siempre perpendicular a la velocidad, actúa como fuerza centrípeta.",
            "The magnetic force, always perpendicular to the velocity, acts as the centripetal force.",
          ),
          L(
            "Plantea $qvB = \\dfrac{mv^2}{r}$ y despeja $r = \\dfrac{mv}{qB}$.",
            "Set $qvB = \\dfrac{mv^2}{r}$ and solve for $r = \\dfrac{mv}{qB}$.",
          ),
          L(
            "Obtendrás $r$ en metros; multiplica por 100 para pasarlo a centímetros.",
            "You will get $r$ in metres; multiply by 100 to convert to centimetres.",
          ),
        ],
        answerDisplay: L(`$r \\approx ${tok(rCm)}\\ \\text{cm}$`, `$r \\approx ${tok(rCm)}\\ \\text{cm}$`),
        solution: [
          step(
            "given",
            `$m = 1{,}67\\times10^{-27}\\ \\text{kg}$, $q = 1{,}6\\times10^{-19}\\ \\text{C}$, $v = ${v}\\times10^{5}\\ \\text{m/s}$, $B = ${tok(B)}\\ \\text{T}$`,
            `$m = 1.67\\times10^{-27}\\ \\text{kg}$, $q = 1.6\\times10^{-19}\\ \\text{C}$, $v = ${v}\\times10^{5}\\ \\text{m/s}$, $B = ${tok(B)}\\ \\text{T}$`,
          ),
          step(
            "approach",
            "Fuerza magnética = fuerza centrípeta: $qvB = \\frac{mv^2}{r} \\Rightarrow r = \\frac{mv}{qB}$.",
            "Magnetic force = centripetal force: $qvB = \\frac{mv^2}{r} \\Rightarrow r = \\frac{mv}{qB}$.",
          ),
          step(
            "calculation",
            `$r = \\frac{(1{,}67\\times10^{-27})(${v}\\times10^{5})}{(1{,}6\\times10^{-19})(${tok(B)})}\\ \\text{m}$<br>$r = ${tok(rCm / 100)}\\ \\text{m} = ${tok(rCm)}\\ \\text{cm}$`,
            `$r = \\frac{(1.67\\times10^{-27})(${v}\\times10^{5})}{(1.6\\times10^{-19})(${tok(B)})}\\ \\text{m}$<br>$r = ${tok(rCm / 100)}\\ \\text{m} = ${tok(rCm)}\\ \\text{cm}$`,
          ),
          step(
            "result",
            `El protón describe una circunferencia de radio $\\approx ${tok(rCm)}\\ \\text{cm}$.`,
            `The proton moves on a circle of radius $\\approx ${tok(rCm)}\\ \\text{cm}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Zero force when v ∥ B (text answer)                              */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "mag-charged-03",
      subject: "physics",
      topicId: "magnetism",
      subtopicId: "charged-particles",
      difficulty: "medium",
      questionType: "text",
      estimatedTimeSec: 90,
      tags: ["lorentz-force", "conceptual"],
      prerequisites: ["magnetic-force"],
    },
    (rng) => {
      void rng;
      return {
        skill: L("Carga que se mueve paralela al campo", "Charge moving parallel to the field"),
        statement: L(
          "Una partícula cargada se mueve **paralela** a las líneas de campo magnético ($\\theta = 0^{\\circ}$ entre $\\vec{v}$ y $\\vec{B}$). ¿Qué fuerza magnética experimenta? Responde con una palabra o con su valor.",
          "A charged particle moves **parallel** to the magnetic field lines ($\\theta = 0^{\\circ}$ between $\\vec{v}$ and $\\vec{B}$). What magnetic force does it experience? Answer with one word or with its value.",
        ),
        answer: {
          kind: "text",
          accepted: [
            "cero",
            "zero",
            "ninguna",
            "nula",
            "0",
            "no hay fuerza",
            "no experimenta fuerza",
            "cero newtons",
            "0 n",
            "f = 0",
            "0 newtons",
          ],
        },
        hints: [
          L(
            "La fuerza magnética depende del ángulo entre $\\vec{v}$ y $\\vec{B}$.",
            "The magnetic force depends on the angle between $\\vec{v}$ and $\\vec{B}$.",
          ),
          L(
            "La fórmula es $F = qvB\\,\\text{sen}\\,\\theta$. Piensa cuánto vale $\\text{sen}\\,0^{\\circ}$.",
            "The formula is $F = qvB\\sin\\theta$. Think about the value of $\\sin 0^{\\circ}$.",
          ),
          L(
            "Al sustituir $\\theta = 0^{\\circ}$, uno de los factores se anula.",
            "Substituting $\\theta = 0^{\\circ}$, one of the factors vanishes.",
          ),
        ],
        answerDisplay: L(
          "$F = qvB\\,\\text{sen}\\,0^{\\circ} = 0\\ \\text{N}$ (no hay fuerza magnética).",
          "$F = qvB\\sin 0^{\\circ} = 0\\ \\text{N}$ (no magnetic force).",
        ),
        solution: [
          step(
            "given",
            "Partícula cargada con $\\vec{v}$ paralelo a $\\vec{B}$: $\\theta = 0^{\\circ}$.",
            "Charged particle with $\\vec{v}$ parallel to $\\vec{B}$: $\\theta = 0^{\\circ}$.",
          ),
          step(
            "approach",
            "Fuerza magnética: $F = qvB\\,\\text{sen}\\,\\theta$.",
            "Magnetic force: $F = qvB\\sin\\theta$.",
          ),
          step(
            "calculation",
            `$F = qvB\\,\\text{sen}\\,0^{\\circ} = qvB\\cdot 0 = 0\\ \\text{N}$`,
            `$F = qvB\\sin 0^{\\circ} = qvB\\cdot 0 = 0\\ \\text{N}$`,
          ),
          step(
            "result",
            "La fuerza magnética es nula: la partícula sigue moviéndose en línea recta.",
            "The magnetic force is zero: the particle keeps moving in a straight line.",
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Cyclotron frequency of a proton                                  */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "mag-charged-02",
      subject: "physics",
      topicId: "magnetism",
      subtopicId: "charged-particles",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 210,
      tags: ["circular-motion", "cyclotron", "frequency"],
      prerequisites: ["charged-particles"],
    },
    (rng) => {
      const B = rng.pick([0.1, 0.3, 0.5]);
      const fHz = (QE * B) / (2 * Math.PI * MP);
      const fMHz = r2(fHz / 1e6);
      const fSci = sci(fHz);
      return {
        skill: L("Frecuencia de ciclotrón", "Cyclotron frequency"),
        statement: L(
          `Un protón ($m = 1{,}67\\times10^{-27}\\ \\text{kg}$, $q = 1{,}6\\times10^{-19}\\ \\text{C}$) gira dentro de un campo magnético uniforme de $${tok(B)}\\ \\text{T}$ (velocidad perpendicular al campo). Calcula la frecuencia de rotación en MHz (2 cifras significativas).`,
          `A proton ($m = 1.67\\times10^{-27}\\ \\text{kg}$, $q = 1.6\\times10^{-19}\\ \\text{C}$) circles inside a uniform magnetic field of $${tok(B)}\\ \\text{T}$ (velocity perpendicular to the field). Compute the rotation frequency in MHz (2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: fMHz,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["MHz"],
          unitChoices: ["MHz", "kHz", "Hz", "GHz"],
        },
        hints: [
          L(
            "Busca la relación entre el periodo y el radio: $v = \\frac{2\\pi r}{T}$.",
            "Link the period and the radius: $v = \\frac{2\\pi r}{T}$.",
          ),
          L(
            "Con $r = \\frac{mv}{qB}$, la velocidad se cancela y queda $f = \\frac{1}{T} = \\frac{qB}{2\\pi m}$.",
            "With $r = \\frac{mv}{qB}$ the speed cancels, leaving $f = \\frac{1}{T} = \\frac{qB}{2\\pi m}$.",
          ),
          L(
            "Calcula $f$ en hercios y divide entre $10^{6}$ para pasar a MHz.",
            "Compute $f$ in hertz and divide by $10^{6}$ to convert to MHz.",
          ),
        ],
        answerDisplay: L(`$f \\approx ${tok(fMHz)}\\ \\text{MHz}$`, `$f \\approx ${tok(fMHz)}\\ \\text{MHz}$`),
        solution: [
          step(
            "given",
            `$m = 1{,}67\\times10^{-27}\\ \\text{kg}$, $q = 1{,}6\\times10^{-19}\\ \\text{C}$, $B = ${tok(B)}\\ \\text{T}$`,
            `$m = 1.67\\times10^{-27}\\ \\text{kg}$, $q = 1.6\\times10^{-19}\\ \\text{C}$, $B = ${tok(B)}\\ \\text{T}$`,
          ),
          step(
            "approach",
            "De $qvB = \\frac{mv^2}{r}$ y $v = \\frac{2\\pi r}{T}$ se obtiene $f = \\frac{qB}{2\\pi m}$ (no depende de la velocidad).",
            "From $qvB = \\frac{mv^2}{r}$ and $v = \\frac{2\\pi r}{T}$ one gets $f = \\frac{qB}{2\\pi m}$ (independent of speed).",
          ),
          step(
            "calculation",
            `$f = \\frac{(1{,}6\\times10^{-19})(${tok(B)})}{2\\pi\\,(1{,}67\\times10^{-27})} \\approx ${tok(fSci.man)}\\times10^{${fSci.exp}}\\ \\text{Hz}$<br>$f = ${tok(fMHz)}\\ \\text{MHz}$`,
            `$f = \\frac{(1.6\\times10^{-19})(${tok(B)})}{2\\pi\\,(1.67\\times10^{-27})} \\approx ${tok(fSci.man)}\\times10^{${fSci.exp}}\\ \\text{Hz}$<br>$f = ${tok(fMHz)}\\ \\text{MHz}$`,
          ),
          step(
            "result",
            `El protón gira con una frecuencia de $\\approx ${tok(fMHz)}\\ \\text{MHz}$.`,
            `The proton rotates at $\\approx ${tok(fMHz)}\\ \\text{MHz}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Attract or repel? Parallel wires (MC)                            */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "mag-wire-02",
      subject: "physics",
      topicId: "magnetism",
      subtopicId: "wires",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 180,
      tags: ["parallel-wires", "right-hand-rule", "conceptual"],
      prerequisites: ["magnetic-fields"],
    },
    (rng) => {
      const sameDir = rng.bool();
      const askTop = rng.bool();
      const attract = sameDir;
      // wire 1 is on top (current to the right); wire 2 is below
      // attract: each wire is pulled toward the other; repel: pushed away
      const targetUp = askTop ? !attract : attract; // force on target points up?
      const wireEs = askTop ? "de arriba" : "de abajo";
      const wireEn = askTop ? "top" : "bottom";
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            `Se ${attract ? "atraen" : "repelen"}: la fuerza sobre el hilo ${wireEs} apunta hacia ${targetUp ? "arriba" : "abajo"}`,
            `They ${attract ? "attract" : "repel"}: the force on the ${wireEn} wire points ${targetUp ? "upward" : "downward"}`,
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            `Se ${attract ? "repelen" : "atraen"}: la fuerza sobre el hilo ${wireEs} apunta hacia ${targetUp ? "abajo" : "arriba"}`,
            `They ${attract ? "repel" : "attract"}: the force on the ${wireEn} wire points ${targetUp ? "downward" : "upward"}`,
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            "No actúa ninguna fuerza porque los hilos no se tocan",
            "No force acts because the wires do not touch",
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            "La fuerza es paralela a los hilos, a lo largo de la corriente",
            "The force is parallel to the wires, along the current",
          ),
          correct: false,
        },
      ];
      return {
        skill: L("Atracción y repulsión entre hilos paralelos", "Attraction and repulsion between parallel wires"),
        statement: L(
          `Dos hilos rectos horizontales y paralelos están en el plano de la página, uno encima del otro. El hilo de arriba lleva corriente hacia la derecha; el de abajo lleva corriente hacia ${sameDir ? "la derecha" : "la izquierda"}. ¿Qué le ocurre al hilo ${wireEs}?`,
          `Two straight horizontal parallel wires lie in the plane of the page, one above the other. The top wire carries current to the right; the bottom wire carries current ${sameDir ? "to the right" : "to the left"}. What happens to the ${wireEn} wire?`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Cada hilo genera un campo magnético en el lugar donde está el otro.",
            "Each wire creates a magnetic field where the other wire sits.",
          ),
          L(
            "Aplica $F = BIL$ al hilo en cuestión con la regla de la mano derecha: corrientes del mismo sentido se atraen; de sentidos opuestos se repelen.",
            "Apply $F = BIL$ to the wire in question with the right-hand rule: same-direction currents attract; opposite directions repel.",
          ),
          L(
            "La fuerza sobre cada hilo apunta según la recta que une los hilos: hacia el otro hilo si se atraen, lejos si se repelen.",
            "The force on each wire points along the line joining the wires: toward the other wire if they attract, away if they repel.",
          ),
        ],
        answerDisplay: L(
          `Se ${attract ? "atraen" : "repelen"}: la fuerza sobre el hilo ${wireEs} apunta hacia ${targetUp ? "arriba" : "abajo"}.`,
          `They ${attract ? "attract" : "repel"}: the force on the ${wireEn} wire points ${targetUp ? "upward" : "downward"}.`,
        ),
        solution: [
          step(
            "given",
            `Hilo superior: corriente hacia la derecha. Hilo inferior: corriente hacia ${sameDir ? "la derecha" : "la izquierda"}. Preguntamos por el hilo ${wireEs}.`,
            `Top wire: current to the right. Bottom wire: current ${sameDir ? "to the right" : "to the left"}. We ask about the ${wireEn} wire.`,
          ),
          step(
            "approach",
            "Regla práctica: corrientes paralelas del mismo sentido se **atraen**; de sentidos opuestos se **repelen**. La fuerza es perpendicular a ambos hilos.",
            "Rule of thumb: parallel currents in the same direction **attract**; opposite directions **repel**. The force is perpendicular to both wires.",
          ),
          step(
            "calculation",
            `Las corrientes son ${sameDir ? "del mismo sentido" : "de sentidos opuestos"} → los hilos se ${attract ? "atraen" : "repelen"}.<br>El hilo ${wireEs} queda ${askTop ? "encima" : "debajo"}, así que la fuerza apunta hacia ${targetUp ? "arriba" : "abajo"}.`,
            `The currents are ${sameDir ? "in the same direction" : "in opposite directions"} → the wires ${attract ? "attract" : "repel"}.<br>The ${wireEn} wire is ${askTop ? "on top" : "below"}, so the force points ${targetUp ? "upward" : "downward"}.`,
          ),
          step(
            "result",
            `Se ${attract ? "atraen" : "repelen"} y la fuerza sobre el hilo ${wireEs} apunta hacia ${targetUp ? "arriba" : "abajo"}.`,
            `They ${attract ? "attract" : "repel"} and the force on the ${wireEn} wire points ${targetUp ? "upward" : "downward"}.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Challenge: mass spectrometer (energy + circular motion)          */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "mag-chal-01",
      subject: "physics",
      topicId: "magnetism",
      subtopicId: "charged-particles",
      difficulty: "challenge",
      questionType: "numeric-unit",
      estimatedTimeSec: 300,
      tags: ["mass-spectrometer", "energy", "circular-motion", "multi-step"],
      prerequisites: ["charged-particles", "electric-potential"],
    },
    (rng) => {
      const V = rng.pick([200, 500, 800, 1000]);
      const B = rng.pick([0.1, 0.25]);
      const v = Math.sqrt((2 * QE * V) / MP);
      const vSci = sci(v);
      const rCm = r2(((MP * v) / (QE * B)) * 100);
      return {
        skill: L("Espectrómetro de masas: aceleración + campo", "Mass spectrometer: acceleration + field"),
        statement: L(
          `Un protón ($m = 1{,}67\\times10^{-27}\\ \\text{kg}$, $q = 1{,}6\\times10^{-19}\\ \\text{C}$) parte del reposo y es acelerado por una diferencia de potencial de $${V}\\ \\text{V}$. Después entra en una región con campo magnético de $${tok(B)}\\ \\text{T}$, perpendicular a su velocidad, y describe una circunferencia. Calcula el radio de la órbita en cm (2 cifras significativas).`,
          `A proton ($m = 1.67\\times10^{-27}\\ \\text{kg}$, $q = 1.6\\times10^{-19}\\ \\text{C}$) starts from rest and is accelerated through a potential difference of $${V}\\ \\text{V}$. It then enters a region with a magnetic field of $${tok(B)}\\ \\text{T}$, perpendicular to its velocity, and moves in a circle. Compute the orbit radius in cm (2 significant figures).`,
        ),
        answer: {
          kind: "numeric-unit",
          value: rCm,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["cm"],
          unitChoices: ["cm", "m", "mm", "V"],
        },
        hints: [
          L(
            "Son dos etapas: (1) aceleración eléctrica, (2) órbita circular en el campo magnético.",
            "There are two stages: (1) electric acceleration, (2) circular orbit in the magnetic field.",
          ),
          L(
            "Etapa 1, energía: $qV = \\frac{1}{2}mv^2$ → despeja $v$. Etapa 2: $r = \\frac{mv}{qB}$.",
            "Stage 1, energy: $qV = \\frac{1}{2}mv^2$ → solve for $v$. Stage 2: $r = \\frac{mv}{qB}$.",
          ),
          L(
            "También puedes combinar ambas: $r = \\frac{1}{B}\\sqrt{\\frac{2mV}{q}}$.",
            "You can also combine them: $r = \\frac{1}{B}\\sqrt{\\frac{2mV}{q}}$.",
          ),
        ],
        answerDisplay: L(`$r \\approx ${tok(rCm)}\\ \\text{cm}$`, `$r \\approx ${tok(rCm)}\\ \\text{cm}$`),
        solution: [
          step(
            "given",
            `$V = ${V}\\ \\text{V}$, $B = ${tok(B)}\\ \\text{T}$, $m = 1{,}67\\times10^{-27}\\ \\text{kg}$, $q = 1{,}6\\times10^{-19}\\ \\text{C}$, $v_0 = 0$`,
            `$V = ${V}\\ \\text{V}$, $B = ${tok(B)}\\ \\text{T}$, $m = 1.67\\times10^{-27}\\ \\text{kg}$, $q = 1.6\\times10^{-19}\\ \\text{C}$, $v_0 = 0$`,
          ),
          step(
            "approach",
            "Etapa 1 (energía): $qV = \\frac{1}{2}mv^2$. Etapa 2 (fuerza centrípeta): $qvB = \\frac{mv^2}{r} \\Rightarrow r = \\frac{mv}{qB}$.",
            "Stage 1 (energy): $qV = \\frac{1}{2}mv^2$. Stage 2 (centripetal force): $qvB = \\frac{mv^2}{r} \\Rightarrow r = \\frac{mv}{qB}$.",
          ),
          step(
            "calculation",
            `**Etapa 1:** $v = \\sqrt{\\frac{2qV}{m}} = \\sqrt{\\frac{2(1{,}6\\times10^{-19})(${V})}{1{,}67\\times10^{-27}}} \\approx ${tok(vSci.man)}\\times10^{${vSci.exp}}\\ \\text{m/s}$<br>**Etapa 2:** $r = \\frac{mv}{qB} = \\frac{(1{,}67\\times10^{-27})(${tok(vSci.man)}\\times10^{${vSci.exp}})}{(1{,}6\\times10^{-19})(${tok(B)})} = ${tok(rCm / 100)}\\ \\text{m} = ${tok(rCm)}\\ \\text{cm}$`,
            `**Stage 1:** $v = \\sqrt{\\frac{2qV}{m}} = \\sqrt{\\frac{2(1.6\\times10^{-19})(${V})}{1.67\\times10^{-27}}} \\approx ${tok(vSci.man)}\\times10^{${vSci.exp}}\\ \\text{m/s}$<br>**Stage 2:** $r = \\frac{mv}{qB} = \\frac{(1.67\\times10^{-27})(${tok(vSci.man)}\\times10^{${vSci.exp}})}{(1.6\\times10^{-19})(${tok(B)})} = ${tok(rCm / 100)}\\ \\text{m} = ${tok(rCm)}\\ \\text{cm}$`,
          ),
          step(
            "result",
            `El protón describe una circunferencia de radio $\\approx ${tok(rCm)}\\ \\text{cm}$ dentro del campo.`,
            `The proton moves on a circle of radius $\\approx ${tok(rCm)}\\ \\text{cm}$ inside the field.`,
          ),
        ],
      };
    },
  ),
];
