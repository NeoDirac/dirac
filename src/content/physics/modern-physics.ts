/**
 * PHYSICS · Introductory Modern Physics
 *
 * Photons (E = hc/λ), the photoelectric effect (with stopping-potential
 * inversion as a challenge), Bohr energy levels with an energy-level
 * diagram, basic special relativity, and simple nuclear arithmetic.
 */

import { template, L, step, tok } from "@/lib/problem";
import type { ProblemTemplate, McOption } from "@/lib/types";

/* Physical constants — must match the values quoted in the statements. */
const H_PLANCK = 6.626e-34; // J·s
const C_LIGHT = 3e8; // m/s
const EV = 1.602e-19; // J
const HC = H_PLANCK * C_LIGHT; // J·m
const R_H = 1.097e7; // m⁻¹ (Rydberg)

/* Deterministic formatting helpers (no RNG inside). */
const r1 = (v: number) => Math.round(v * 10) / 10;
const r2 = (v: number) => Math.round(v * 100) / 100;

/** Round to 3 significant figures. */
function sig3(v: number): number {
  if (v === 0) return 0;
  const exp = Math.floor(Math.log10(Math.abs(v)));
  return Math.round(v / Math.pow(10, exp - 2)) * Math.pow(10, exp - 2);
}

/** Splits a value into mantissa (2 decimals) × 10^exp for display/checking. */
function sci(v: number): { man: number; exp: number; value: number } {
  const exp = Math.floor(Math.log10(Math.abs(v)));
  const man = Math.round((v / Math.pow(10, exp)) * 100) / 100;
  return { man, exp, value: man * Math.pow(10, exp) };
}

/** Photon energy of a wavelength given in nm, in eV (unrounded chain). */
function photonEv(lamNm: number): number {
  return HC / (lamNm * 1e-9) / EV;
}

export const templates: ProblemTemplate[] = [
  /* ---------------------------------------------------------------- */
  /* Photon energy in eV (E = hc/λ)                                   */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "mp-photon-01",
      subject: "physics",
      topicId: "modern-physics",
      subtopicId: "photons",
      difficulty: "easy",
      questionType: "numeric-unit",
      estimatedTimeSec: 150,
      tags: ["photons", "energy"],
      prerequisites: [],
    },
    (rng) => {
      const lam = rng.pick([400, 450, 500, 550, 620, 700]);
      const EJ = sci(HC / (lam * 1e-9));
      const EeV = r2(photonEv(lam));
      return {
        skill: L("Energía de un fotón", "Energy of a photon"),
        statement: L(
          `Calcula la energía de un fotón de luz visible con longitud de onda $\\lambda = ${lam}\\ \\text{nm}$, expresada en electronvoltios (2 cifras significativas). Datos: $h = 6{,}626\\times10^{-34}\\ \\text{J}\\cdot\\text{s}$, $c = 3\\times10^{8}\\ \\text{m/s}$, $1\\ \\text{eV} = 1{,}602\\times10^{-19}\\ \\text{J}$.`,
          `Compute the energy of a visible-light photon with wavelength $\\lambda = ${lam}\\ \\text{nm}$, expressed in electronvolts (2 significant figures). Data: $h = 6.626\\times10^{-34}\\ \\text{J}\\cdot\\text{s}$, $c = 3\\times10^{8}\\ \\text{m/s}$, $1\\ \\text{eV} = 1.602\\times10^{-19}\\ \\text{J}$.`,
        ),
        answer: {
          kind: "numeric-unit",
          value: EeV,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["eV"],
          unitChoices: ["eV", "J", "keV", "MeV"],
        },
        hints: [
          L(
            "La energía de un fotón es $E = \\frac{hc}{\\lambda}$; primero saldrá en julios.",
            "A photon's energy is $E = \\frac{hc}{\\lambda}$; it comes out in joules first.",
          ),
          L(
            "Convierte $\\lambda$ a metros ($1\\ \\text{nm} = 10^{-9}\\ \\text{m}$) antes de sustituir.",
            "Convert $\\lambda$ to metres ($1\\ \\text{nm} = 10^{-9}\\ \\text{m}$) before substituting.",
          ),
          L(
            "Divide el resultado en julios entre $1{,}602\\times10^{-19}$ para pasarlo a eV.",
            "Divide the result in joules by $1.602\\times10^{-19}$ to convert to eV.",
          ),
        ],
        answerDisplay: L(`$E \\approx ${tok(EeV)}\\ \\text{eV}$`, `$E \\approx ${tok(EeV)}\\ \\text{eV}$`),
        solution: [
          step(
            "given",
            `$\\lambda = ${lam}\\ \\text{nm} = ${lam}\\times10^{-9}\\ \\text{m}$, $h = 6{,}626\\times10^{-34}\\ \\text{J}\\cdot\\text{s}$, $c = 3\\times10^{8}\\ \\text{m/s}$`,
            `$\\lambda = ${lam}\\ \\text{nm} = ${lam}\\times10^{-9}\\ \\text{m}$, $h = 6.626\\times10^{-34}\\ \\text{J}\\cdot\\text{s}$, $c = 3\\times10^{8}\\ \\text{m/s}$`,
          ),
          step(
            "approach",
            "Energía del fotón: $E = \\frac{hc}{\\lambda}$ en julios, y después $E(\\text{eV}) = \\frac{E(\\text{J})}{1{,}602\\times10^{-19}}$.",
            "Photon energy: $E = \\frac{hc}{\\lambda}$ in joules, then $E(\\text{eV}) = \\frac{E(\\text{J})}{1.602\\times10^{-19}}$.",
          ),
          step(
            "calculation",
            `$E = \\frac{(6{,}626\\times10^{-34})(3\\times10^{8})}{${lam}\\times10^{-9}} \\approx ${tok(EJ.man)}\\times10^{${EJ.exp}}\\ \\text{J}$<br>$E = \\frac{ ${tok(EJ.man)}\\times10^{${EJ.exp}}}{1{,}602\\times10^{-19}} \\approx ${tok(EeV)}\\ \\text{eV}$`,
            `$E = \\frac{(6.626\\times10^{-34})(3\\times10^{8})}{${lam}\\times10^{-9}} \\approx ${tok(EJ.man)}\\times10^{${EJ.exp}}\\ \\text{J}$<br>$E = \\frac{ ${tok(EJ.man)}\\times10^{${EJ.exp}}}{1.602\\times10^{-19}} \\approx ${tok(EeV)}\\ \\text{eV}$`,
          ),
          step(
            "result",
            `Cada fotón de ${lam} nm lleva $\\approx ${tok(EeV)}\\ \\text{eV}$.`,
            `Each ${lam} nm photon carries $\\approx ${tok(EeV)}\\ \\text{eV}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Expression: E = hf                                               */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "mp-photon-03",
      subject: "physics",
      topicId: "modern-physics",
      subtopicId: "photons",
      difficulty: "easy",
      questionType: "expression",
      estimatedTimeSec: 90,
      tags: ["photons", "formula"],
      prerequisites: [],
    },
    (rng) => {
      void rng;
      return {
        skill: L("Fórmula de la energía de un fotón", "Photon energy formula"),
        statement: L(
          "Escribe la energía de un fotón de frecuencia $f$, siendo $h$ la constante de Planck (por ejemplo h*f).",
          "Write the energy of a photon of frequency $f$, where $h$ is Planck's constant (e.g. h*f).",
        ),
        answer: {
          kind: "expression",
          accepted: ["h*f"],
          variables: ["h", "f"],
        },
        hints: [
          L(
            "En el efecto fotoeléctrico, la luz entrega energía en paquetes.",
            "In the photoelectric effect, light delivers energy in packets.",
          ),
          L(
            "Cada paquete (fotón) lleva una energía proporcional a la frecuencia.",
            "Each packet (photon) carries an energy proportional to the frequency.",
          ),
          L(
            "La constante de proporcionalidad es la constante de Planck.",
            "The proportionality constant is Planck's constant.",
          ),
        ],
        answerDisplay: L("$E = hf$", "$E = hf$"),
        solution: [
          step("given", "Frecuencia $f$ del fotón y constante de Planck $h$.", "Photon frequency $f$ and Planck constant $h$."),
          step(
            "approach",
            "Cuantización de Planck–Einstein: la energía de cada fotón es proporcional a la frecuencia.",
            "Planck–Einstein quantization: each photon's energy is proportional to its frequency.",
          ),
          step("calculation", "$E = h\\,f$", "$E = h\\,f$"),
          step("result", "La energía del fotón es $E = hf$.", "The photon energy is $E = hf$."),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Bohr: emit or absorb (MC + energy level diagram)                 */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "mp-atom-01",
      subject: "physics",
      topicId: "modern-physics",
      subtopicId: "atomic-models",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 90,
      tags: ["bohr", "energy-levels", "conceptual"],
      prerequisites: [],
    },
    (rng) => {
      const pick = rng.pick([
        { ni: 3, nf: 1 },
        { ni: 2, nf: 1 },
        { ni: 4, nf: 2 },
        { ni: 5, nf: 2 },
        { ni: 1, nf: 3 },
        { ni: 2, nf: 4 },
        { ni: 3, nf: 5 },
        { ni: 4, nf: 6 },
      ]);
      const emits = pick.ni > pick.nf;
      const options: McOption[] = [
        { id: "a", text: L("Emite un fotón", "It emits a photon"), correct: emits },
        { id: "b", text: L("Absorbe un fotón", "It absorbs a photon"), correct: !emits },
        { id: "c", text: L("No cambia su energía", "Its energy does not change"), correct: false },
        { id: "d", text: L("El átomo se ioniza (pierde el electrón)", "The atom ionizes (loses the electron)"), correct: false },
      ];
      return {
        skill: L("Transiciones en el modelo de Bohr", "Transitions in the Bohr model"),
        statement: L(
          `En el modelo de Bohr del átomo de hidrógeno (ver niveles de energía), un electrón pasa del nivel $n = ${pick.ni}$ al nivel $n = ${pick.nf}$. ¿Qué ocurre?`,
          `In the Bohr model of the hydrogen atom (see the energy levels), an electron goes from level $n = ${pick.ni}$ to level $n = ${pick.nf}$. What happens?`,
        ),
        diagram: {
          kind: "function-graph",
          xMin: 0,
          xMax: 12,
          yMin: -15,
          yMax: 1,
          curves: [
            { fn: "-13.6", color: "primary" },
            { fn: "-3.4", color: "primary" },
            { fn: "-1.51", color: "primary" },
            { fn: "-0.85", color: "primary" },
          ],
          points: [
            { x: 8, y: -13.6, label: "n = 1  (−13,6 eV)" },
            { x: 8, y: -3.4, label: "n = 2  (−3,4 eV)" },
            { x: 8, y: -1.51, label: "n = 3  (−1,51 eV)" },
            { x: 8, y: -0.85, label: "n = 4  (−0,85 eV)" },
          ],
          yLabel: "E (eV)",
          showGrid: false,
        },
        diagramLabel: L(
          "Diagrama de niveles de energía del hidrógeno: n = 1 en −13,6 eV; n = 2 en −3,4 eV; n = 3 en −1,51 eV; n = 4 en −0,85 eV.",
          "Hydrogen energy-level diagram: n = 1 at −13.6 eV; n = 2 at −3.4 eV; n = 3 at −1.51 eV; n = 4 at −0.85 eV.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Compara la energía de los dos niveles en el diagrama ($E_n$ es más negativa cuanto menor es $n$).",
            "Compare the energy of the two levels in the diagram ($E_n$ is more negative for smaller $n$).",
          ),
          L(
            "Si el electrón cae a un nivel más bajo, la energía sobrante tiene que salir del átomo.",
            "If the electron falls to a lower level, the surplus energy must leave the atom.",
          ),
          L(
            "Si sube a un nivel más alto, necesita recibir exactamente la diferencia de energía.",
            "If it rises to a higher level, it must receive exactly the energy difference.",
          ),
        ],
        answerDisplay: emits
          ? L("Emite un fotón con la diferencia de energía.", "It emits a photon carrying the energy difference.")
          : L("Absorbe un fotón con la diferencia de energía.", "It absorbs a photon with the energy difference."),
        solution: [
          step(
            "given",
            `Transición de $n = ${pick.ni}$ a $n = ${pick.nf}$ en el hidrógeno.`,
            `Transition from $n = ${pick.ni}$ to $n = ${pick.nf}$ in hydrogen.`,
          ),
          step(
            "approach",
            "En el modelo de Bohr la energía del electrón está cuantizada: $E_n = -\\frac{13{,}6}{n^2}\\ \\text{eV}$. Solo puede cambiar por emisión o absorción de un fotón.",
            "In the Bohr model the electron energy is quantized: $E_n = -\\frac{13.6}{n^2}\\ \\text{eV}$. It can only change by emitting or absorbing a photon.",
          ),
          step(
            "calculation",
            emits
              ? `Como $n = ${pick.nf} < n = ${pick.ni}$, la energía final es **más negativa** (menor): la diferencia se emite como un fotón.`
              : `Como $n = ${pick.nf} > n = ${pick.ni}$, la energía final es mayor: el electrón debe **absorber** un fotón con esa diferencia.`,
            emits
              ? `Since $n = ${pick.nf} < n = ${pick.ni}$, the final energy is more negative (lower): the difference is emitted as a photon.`
              : `Since $n = ${pick.nf} > n = ${pick.ni}$, the final energy is higher: the electron must **absorb** a photon with that difference.`,
          ),
          step(
            "result",
            emits
              ? "El átomo emite un fotón (los saltos hacia abajo dan las líneas de emisión)."
              : "El átomo absorbe un fotón (los saltos hacia arriba requieren luz entrante).",
            emits
              ? "The atom emits a photon (downward jumps give emission lines)."
              : "The atom absorbs a photon (upward jumps require incoming light).",
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Photoelectric effect: maximum kinetic energy                     */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "mp-photo-01",
      subject: "physics",
      topicId: "modern-physics",
      subtopicId: "photoelectric",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 210,
      tags: ["photoelectric", "energy"],
      prerequisites: ["photons"],
    },
    (rng) => {
      const pick = rng.pick([
        { lam: 400, phi: 2.0 },
        { lam: 400, phi: 2.5 },
        { lam: 500, phi: 2.0 },
        { lam: 550, phi: 1.6 },
        { lam: 450, phi: 2.2 },
        { lam: 620, phi: 1.9 },
        { lam: 600, phi: 1.5 },
        { lam: 500, phi: 1.8 },
      ]);
      const EeV = r2(photonEv(pick.lam));
      const KE = r2(EeV - pick.phi);
      return {
        skill: L("Efecto fotoeléctrico: energía cinética máxima", "Photoelectric effect: maximum kinetic energy"),
        statement: L(
          `Luz de longitud de onda $\\lambda = ${pick.lam}\\ \\text{nm}$ ilumina un metal cuya función de trabajo es $\\phi = ${tok(pick.phi)}\\ \\text{eV}$. Calcula la energía cinética máxima de los fotoelectrones emitidos (en eV, 2 cifras significativas). Datos: $h = 6{,}626\\times10^{-34}\\ \\text{J}\\cdot\\text{s}$, $c = 3\\times10^{8}\\ \\text{m/s}$, $1\\ \\text{eV} = 1{,}602\\times10^{-19}\\ \\text{J}$.`,
          `Light of wavelength $\\lambda = ${pick.lam}\\ \\text{nm}$ shines on a metal whose work function is $\\phi = ${tok(pick.phi)}\\ \\text{eV}$. Compute the maximum kinetic energy of the emitted photoelectrons (in eV, 2 significant figures). Data: $h = 6.626\\times10^{-34}\\ \\text{J}\\cdot\\text{s}$, $c = 3\\times10^{8}\\ \\text{m/s}$, $1\\ \\text{eV} = 1.602\\times10^{-19}\\ \\text{J}$.`,
        ),
        answer: {
          kind: "numeric-unit",
          value: KE,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["eV"],
          unitChoices: ["eV", "J", "keV", "V"],
        },
        hints: [
          L(
            "Dos energías intervienen: la del fotón $E = hc/\\lambda$ y la función de trabajo $\\phi$.",
            "Two energies are involved: the photon's $E = hc/\\lambda$ and the work function $\\phi$.",
          ),
          L(
            "Ecuación de Einstein: $E_{\\text{cin,max}} = E_{\\text{fotón}} - \\phi$.",
            "Einstein's equation: $K_{\\max} = E_{\\text{photon}} - \\phi$.",
          ),
          L(
            "Calcula $E$ en eV y resta $\\phi$ (que ya está en eV).",
            "Compute $E$ in eV and subtract $\\phi$ (already in eV).",
          ),
        ],
        answerDisplay: L(`$E_{\\text{cin,max}} \\approx ${tok(KE)}\\ \\text{eV}$`, `$K_{\\max} \\approx ${tok(KE)}\\ \\text{eV}$`),
        solution: [
          step(
            "given",
            `$\\lambda = ${pick.lam}\\ \\text{nm}$, $\\phi = ${tok(pick.phi)}\\ \\text{eV}$, $hc = 1{,}988\\times10^{-25}\\ \\text{J}\\cdot\\text{m}$`,
            `$\\lambda = ${pick.lam}\\ \\text{nm}$, $\\phi = ${tok(pick.phi)}\\ \\text{eV}$, $hc = 1.988\\times10^{-25}\\ \\text{J}\\cdot\\text{m}$`,
          ),
          step(
            "approach",
            "Einstein: $K_{\\max} = \\frac{hc}{\\lambda} - \\phi$; primero el fotón en eV y después restamos la función de trabajo.",
            "Einstein: $K_{\\max} = \\frac{hc}{\\lambda} - \\phi$; first the photon in eV, then subtract the work function.",
          ),
          step(
            "calculation",
            `$E_{\\text{fotón}} = \\frac{hc}{\\lambda} = \\frac{1{,}988\\times10^{-25}}{${pick.lam}\\times10^{-9}} \\approx ${tok(EeV)}\\ \\text{eV}$<br>$K_{\\max} = ${tok(EeV)} - ${tok(pick.phi)} = ${tok(KE)}\\ \\text{eV}$`,
            `$E_{\\text{photon}} = \\frac{hc}{\\lambda} = \\frac{1.988\\times10^{-25}}{${pick.lam}\\times10^{-9}} \\approx ${tok(EeV)}\\ \\text{eV}$<br>$K_{\\max} = ${tok(EeV)} - ${tok(pick.phi)} = ${tok(KE)}\\ \\text{eV}$`,
          ),
          step(
            "result",
            `Los fotoelectrones salen con un máximo de $\\approx ${tok(KE)}\\ \\text{eV}$.`,
            `The photoelectrons emerge with at most $\\approx ${tok(KE)}\\ \\text{eV}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Balmer / Lyman wavelength                                        */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "mp-atom-02",
      subject: "physics",
      topicId: "modern-physics",
      subtopicId: "atomic-models",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 240,
      tags: ["bohr", "rydberg", "wavelength"],
      prerequisites: ["atomic-models"],
    },
    (rng) => {
      const pick = rng.pick([
        { ni: 3, nf: 2 },
        { ni: 4, nf: 2 },
        { ni: 5, nf: 2 },
        { ni: 6, nf: 2 },
        { ni: 2, nf: 1 },
        { ni: 3, nf: 1 },
      ]);
      const invLam = R_H * (1 / (pick.nf * pick.nf) - 1 / (pick.ni * pick.ni));
      const lamNm = sig3(1e9 / invLam);
      return {
        skill: L("Longitud de onda de una transición (Bohr)", "Wavelength of a transition (Bohr)"),
        statement: L(
          `En el hidrógeno, un electrón cae del nivel $n = ${pick.ni}$ al nivel $n = ${pick.nf}$. Calcula la longitud de onda del fotón emitido, en nm (2 cifras significativas). Dato: $R = 1{,}097\\times10^{7}\\ \\text{m}^{-1}$, con $\\frac{1}{\\lambda} = R\\left(\\frac{1}{n_f^2} - \\frac{1}{n_i^2}\\right)$.`,
          `In hydrogen, an electron falls from level $n = ${pick.ni}$ to level $n = ${pick.nf}$. Compute the wavelength of the emitted photon, in nm (2 significant figures). Data: $R = 1.097\\times10^{7}\\ \\text{m}^{-1}$, with $\\frac{1}{\\lambda} = R\\left(\\frac{1}{n_f^2} - \\frac{1}{n_i^2}\\right)$.`,
        ),
        answer: {
          kind: "numeric-unit",
          value: lamNm,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["nm"],
          unitChoices: ["nm", "m", "mm", "eV"],
        },
        hints: [
          L(
            "Identifica $n_i = ${pick.ni}$ (inicial) y $n_f = ${pick.nf}$ (final) en la fórmula de Rydberg.",
            "Identify $n_i = ${pick.ni}$ (initial) and $n_f = ${pick.nf}$ (final) in the Rydberg formula.",
          ),
          L(
            `Calcula $\\frac{1}{n_f^2} - \\frac{1}{n_i^2}$ con cuidado: $\\frac{1}{${pick.nf * pick.nf}} - \\frac{1}{${pick.ni * pick.ni}}$.`,
            `Compute $\\frac{1}{n_f^2} - \\frac{1}{n_i^2}$ carefully: $\\frac{1}{${pick.nf * pick.nf}} - \\frac{1}{${pick.ni * pick.ni}}$.`,
          ),
          L(
            "Obtendrás $1/\\lambda$ en m⁻¹; invierte el resultado y convierte de metros a nanómetros.",
            "You will get $1/\\lambda$ in m⁻¹; invert it and convert from metres to nanometres.",
          ),
        ],
        answerDisplay: L(`$\\lambda \\approx ${tok(lamNm)}\\ \\text{nm}$`, `$\\lambda \\approx ${tok(lamNm)}\\ \\text{nm}$`),
        solution: [
          step(
            "given",
            `$n_i = ${pick.ni}$, $n_f = ${pick.nf}$, $R = 1{,}097\\times10^{7}\\ \\text{m}^{-1}$`,
            `$n_i = ${pick.ni}$, $n_f = ${pick.nf}$, $R = 1.097\\times10^{7}\\ \\text{m}^{-1}$`,
          ),
          step(
            "approach",
            "Fórmula de Rydberg–Bohr: $\\frac{1}{\\lambda} = R\\left(\\frac{1}{n_f^2} - \\frac{1}{n_i^2}\\right)$ (transición hacia abajo → fotón emitido).",
            "Rydberg–Bohr formula: $\\frac{1}{\\lambda} = R\\left(\\frac{1}{n_f^2} - \\frac{1}{n_i^2}\\right)$ (downward transition → emitted photon).",
          ),
          step(
            "calculation",
            `$\\frac{1}{\\lambda} = 1{,}097\\times10^{7}\\left(\\frac{1}{${pick.nf * pick.nf}} - \\frac{1}{${pick.ni * pick.ni}}\\right) = ${tok(sci(invLam).man)}\\times10^{${sci(invLam).exp}}\\ \\text{m}^{-1}$<br>$\\lambda = ${tok(sci(1 / invLam).man)}\\times10^{${sci(1 / invLam).exp}}\\ \\text{m} = ${tok(lamNm)}\\ \\text{nm}$`,
            `$\\frac{1}{\\lambda} = 1.097\\times10^{7}\\left(\\frac{1}{${pick.nf * pick.nf}} - \\frac{1}{${pick.ni * pick.ni}}\\right) = ${tok(sci(invLam).man)}\\times10^{${sci(invLam).exp}}\\ \\text{m}^{-1}$<br>$\\lambda = ${tok(sci(1 / invLam).man)}\\times10^{${sci(1 / invLam).exp}}\\ \\text{m} = ${tok(lamNm)}\\ \\text{nm}$`,
          ),
          step(
            "result",
            `La transición emite un fotón de $\\approx ${tok(lamNm)}\\ \\text{nm}$.`,
            `The transition emits a photon of $\\approx ${tok(lamNm)}\\ \\text{nm}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Time dilation                                                    */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "mp-rel-01",
      subject: "physics",
      topicId: "modern-physics",
      subtopicId: "relativity",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 180,
      tags: ["relativity", "time-dilation"],
      prerequisites: [],
    },
    (rng) => {
      const pick = rng.pick([
        { v: 0.6, dt0: 2 },
        { v: 0.6, dt0: 4 },
        { v: 0.6, dt0: 6 },
        { v: 0.6, dt0: 8 },
        { v: 0.8, dt0: 3 },
        { v: 0.8, dt0: 6 },
        { v: 0.8, dt0: 9 },
        { v: 0.8, dt0: 12 },
      ]);
      const gamma = 1 / Math.sqrt(1 - pick.v * pick.v);
      const dt = r1(gamma * pick.dt0);
      return {
        skill: L("Dilatación del tiempo", "Time dilation"),
        statement: L(
          `Una nave espacial viaja a $v = ${tok(pick.v)}c$ respecto a la Tierra. A bordo, un reloj mide un intervalo de $${pick.dt0}\\ \\text{s}$ entre dos sucesos que ocurren en el mismo punto de la nave. ¿Cuánto vale ese intervalo medido desde la Tierra? (en segundos, 2 cifras significativas)`,
          `A spaceship travels at $v = ${tok(pick.v)}c$ relative to Earth. On board, a clock measures an interval of $${pick.dt0}\\ \\text{s}$ between two events that happen at the same point on the ship. What is that interval as measured from Earth? (in seconds, 2 significant figures)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: dt,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["s"],
          unitChoices: ["s", "min", "m", "m/s"],
        },
        hints: [
          L(
            "El intervalo medido en la nave es el **tiempo propio** $\\Delta t_0$.",
            "The interval measured on the ship is the **proper time** $\\Delta t_0$.",
          ),
          L(
            "Dilatación del tiempo: $\\Delta t = \\gamma\\,\\Delta t_0$ con $\\gamma = \\frac{1}{\\sqrt{1 - v^2/c^2}}$.",
            "Time dilation: $\\Delta t = \\gamma\\,\\Delta t_0$ with $\\gamma = \\frac{1}{\\sqrt{1 - v^2/c^2}}$.",
          ),
          L(
            `Sustituye $v$ en unidades de $c$: el cociente $v^2/c^2$ es simplemente $${tok(r2(pick.v * pick.v))}$.`,
            `Substitute $v$ in units of $c$: the ratio $v^2/c^2$ is just $${tok(r2(pick.v * pick.v))}$.`,
          ),
        ],
        answerDisplay: L(`$\\Delta t = ${tok(dt)}\\ \\text{s}$`, `$\\Delta t = ${tok(dt)}\\ \\text{s}$`),
        solution: [
          step(
            "given",
            `$v = ${tok(pick.v)}c$, $\\Delta t_0 = ${pick.dt0}\\ \\text{s}$ (tiempo propio)`,
            `$v = ${tok(pick.v)}c$, $\\Delta t_0 = ${pick.dt0}\\ \\text{s}$ (proper time)`,
          ),
          step(
            "approach",
            "Dilatación del tiempo: $\\Delta t = \\gamma\\Delta t_0$, con $\\gamma = \\frac{1}{\\sqrt{1-v^2/c^2}} > 1$.",
            "Time dilation: $\\Delta t = \\gamma\\Delta t_0$, with $\\gamma = \\frac{1}{\\sqrt{1-v^2/c^2}} > 1$.",
          ),
          step(
            "calculation",
            `$\\gamma = \\frac{1}{\\sqrt{1 - ${tok(r2(pick.v * pick.v))}}} = ${tok(r2(gamma))}$<br>$\\Delta t = ${tok(r2(gamma))} \\cdot ${pick.dt0} = ${tok(dt)}\\ \\text{s}$`,
            `$\\gamma = \\frac{1}{\\sqrt{1 - ${tok(r2(pick.v * pick.v))}}} = ${tok(r2(gamma))}$<br>$\\Delta t = ${tok(r2(gamma))} \\cdot ${pick.dt0} = ${tok(dt)}\\ \\text{s}$`,
          ),
          step(
            "result",
            `Para la Tierra, el intervalo dura $${tok(dt)}\\ \\text{s}$ (el reloj de la nave va más lento visto desde fuera).`,
            `For Earth the interval lasts $${tok(dt)}\\ \\text{s}$ (the ship's clock runs slow as seen from outside).`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Mass–energy equivalence (E = Δmc²)                               */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "mp-nucl-01",
      subject: "physics",
      topicId: "modern-physics",
      subtopicId: "nuclear",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 150,
      tags: ["nuclear", "mass-energy"],
      prerequisites: [],
    },
    (rng) => {
      const mMan = rng.pick([2, 3, 5, 8]); // ×10⁻³⁰ kg
      const E = sci(mMan * 1e-30 * C_LIGHT * C_LIGHT);
      return {
        skill: L("Equivalencia masa–energía", "Mass–energy equivalence"),
        statement: L(
          `En una reacción nuclear, la masa de los productos es menor que la de los reactivos en $\\Delta m = ${mMan}\\times10^{-30}\\ \\text{kg}$. ¿Cuánta energía se libera? (en julios, 2 cifras significativas; $c = 3\\times10^{8}\\ \\text{m/s}$)`,
          `In a nuclear reaction the mass of the products is smaller than that of the reactants by $\\Delta m = ${mMan}\\times10^{-30}\\ \\text{kg}$. How much energy is released? (in joules, 2 significant figures; $c = 3\\times10^{8}\\ \\text{m/s}$)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: E.value,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["J"],
          unitChoices: ["J", "eV", "MeV", "W"],
        },
        hints: [
          L(
            "Datos: $\\Delta m$ y $c$. La energía liberada viene de la equivalencia masa–energía.",
            "Data: $\\Delta m$ and $c$. The released energy comes from mass–energy equivalence.",
          ),
          L(
            "La relación es $E = \\Delta m\\,c^{2}$.",
            "The relation is $E = \\Delta m\\,c^{2}$.",
          ),
          L(
            "Multiplica las potencias de diez por separado: $10^{-30}\\cdot(10^{8})^{2} = 10^{-14}$.",
            "Multiply the powers of ten separately: $10^{-30}\\cdot(10^{8})^{2} = 10^{-14}$.",
          ),
        ],
        answerDisplay: L(
          `$E = ${tok(E.man)}\\times10^{${E.exp}}\\ \\text{J}$`,
          `$E = ${tok(E.man)}\\times10^{${E.exp}}\\ \\text{J}$`,
        ),
        solution: [
          step(
            "given",
            `$\\Delta m = ${mMan}\\times10^{-30}\\ \\text{kg}$, $c = 3\\times10^{8}\\ \\text{m/s}$`,
            `$\\Delta m = ${mMan}\\times10^{-30}\\ \\text{kg}$, $c = 3\\times10^{8}\\ \\text{m/s}$`,
          ),
          step(
            "approach",
            "Equivalencia masa–energía de Einstein: $E = \\Delta m\\,c^{2}$.",
            "Einstein's mass–energy equivalence: $E = \\Delta m\\,c^{2}$.",
          ),
          step(
            "calculation",
            `$E = ${mMan}\\times10^{-30} \\cdot (3\\times10^{8})^{2} = ${mMan}\\times10^{-30} \\cdot 9\\times10^{16}$<br>$E = ${mMan * 9}\\times10^{-14} = ${tok(E.man)}\\times10^{${E.exp}}\\ \\text{J}$`,
            `$E = ${mMan}\\times10^{-30} \\cdot (3\\times10^{8})^{2} = ${mMan}\\times10^{-30} \\cdot 9\\times10^{16}$<br>$E = ${mMan * 9}\\times10^{-14} = ${tok(E.man)}\\times10^{${E.exp}}\\ \\text{J}$`,
          ),
          step(
            "result",
            `Se liberan $${tok(E.man)}\\times10^{${E.exp}}\\ \\text{J}$ (la masa “perdida” se convierte en energía).`,
            `$${tok(E.man)}\\times10^{${E.exp}}\\ \\text{J}$ are released (the “lost” mass becomes energy).`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Threshold wavelength                                             */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "mp-photo-02",
      subject: "physics",
      topicId: "modern-physics",
      subtopicId: "photoelectric",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 240,
      tags: ["photoelectric", "threshold", "wavelength"],
      prerequisites: ["photoelectric"],
    },
    (rng) => {
      const phi = rng.pick([1.5, 2.0, 2.5, 3.0]);
      const lam0 = sig3((HC / (phi * EV)) * 1e9);
      return {
        skill: L("Longitud de onda umbral", "Threshold wavelength"),
        statement: L(
          `Un metal tiene una función de trabajo $\\phi = ${tok(phi)}\\ \\text{eV}$. Calcula la **longitud de onda umbral**: la mayor longitud de onda de la luz que todavía puede arrancar electrones (en nm, 2 cifras significativas). Datos: $h = 6{,}626\\times10^{-34}\\ \\text{J}\\cdot\\text{s}$, $c = 3\\times10^{8}\\ \\text{m/s}$, $1\\ \\text{eV} = 1{,}602\\times10^{-19}\\ \\text{J}$.`,
          `A metal has a work function $\\phi = ${tok(phi)}\\ \\text{eV}$. Compute the **threshold wavelength**: the longest wavelength of light that can still eject electrons (in nm, 2 significant figures). Data: $h = 6.626\\times10^{-34}\\ \\text{J}\\cdot\\text{s}$, $c = 3\\times10^{8}\\ \\text{m/s}$, $1\\ \\text{eV} = 1.602\\times10^{-19}\\ \\text{J}$.`,
        ),
        answer: {
          kind: "numeric-unit",
          value: lam0,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["nm"],
          unitChoices: ["nm", "m", "mm", "eV"],
        },
        hints: [
          L(
            "En el umbral, los electrones salen con energía cinética **cero**.",
            "At threshold the electrons leave with **zero** kinetic energy.",
          ),
          L(
            "Por tanto toda la energía del fotón se invierte en la función de trabajo: $\\frac{hc}{\\lambda_0} = \\phi$.",
            "So the whole photon energy goes into the work function: $\\frac{hc}{\\lambda_0} = \\phi$.",
          ),
          L(
            "Despeja $\\lambda_0 = \\frac{hc}{\\phi}$; convierte $\\phi$ a julios y el resultado a nm.",
            "Solve $\\lambda_0 = \\frac{hc}{\\phi}$; convert $\\phi$ to joules and the result to nm.",
          ),
        ],
        answerDisplay: L(`$\\lambda_0 \\approx ${tok(lam0)}\\ \\text{nm}$`, `$\\lambda_0 \\approx ${tok(lam0)}\\ \\text{nm}$`),
        solution: [
          step(
            "given",
            `$\\phi = ${tok(phi)}\\ \\text{eV}$; en el umbral $K_{\\max} = 0$.`,
            `$\\phi = ${tok(phi)}\\ \\text{eV}$; at threshold $K_{\\max} = 0$.`,
          ),
          step(
            "approach",
            "Condición umbral: $\\frac{hc}{\\lambda_0} = \\phi \\Rightarrow \\lambda_0 = \\frac{hc}{\\phi}$.",
            "Threshold condition: $\\frac{hc}{\\lambda_0} = \\phi \\Rightarrow \\lambda_0 = \\frac{hc}{\\phi}$.",
          ),
          step(
            "calculation",
            `$\\phi = ${tok(phi)}\\ \\text{eV} = ${tok(phi)}\\times1{,}602\\times10^{-19}\\ \\text{J}$<br>$\\lambda_0 = \\frac{1{,}988\\times10^{-25}}{ ${tok(r2(phi * 1.602))}\\times10^{-19}} = ${tok(sci((HC / (phi * EV)) ).man)}\\times10^{${sci(HC / (phi * EV)).exp}}\\ \\text{m} = ${tok(lam0)}\\ \\text{nm}$`,
            `$\\phi = ${tok(phi)}\\ \\text{eV} = ${tok(phi)}\\times1.602\\times10^{-19}\\ \\text{J}$<br>$\\lambda_0 = \\frac{1.988\\times10^{-25}}{ ${tok(r2(phi * 1.602))}\\times10^{-19}} = ${tok(sci(HC / (phi * EV)).man)}\\times10^{${sci(HC / (phi * EV)).exp}}\\ \\text{m} = ${tok(lam0)}\\ \\text{nm}$`,
          ),
          step(
            "result",
            `La luz de mayor longitud de onda que aún arranca electrones es $\\approx ${tok(lam0)}\\ \\text{nm}$; por encima, no hay emisión.`,
            `The longest wavelength that still ejects electrons is $\\approx ${tok(lam0)}\\ \\text{nm}$; beyond it, no emission.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Photoelectric concept: intensity vs KE (MC)                      */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "mp-photo-03",
      subject: "physics",
      topicId: "modern-physics",
      subtopicId: "photoelectric",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["photoelectric", "conceptual"],
      prerequisites: ["photoelectric"],
    },
    (rng) => {
      const askAboutKe = rng.bool();
      const options: McOption[] = askAboutKe
        ? [
            { id: "a", text: L("No cambia", "It does not change"), correct: true },
            { id: "b", text: L("Aumenta", "It increases"), correct: false },
            { id: "c", text: L("Disminuye", "It decreases"), correct: false },
            { id: "d", text: L("Se hace cero", "It becomes zero"), correct: false },
          ]
        : [
            { id: "a", text: L("Aumenta", "It increases"), correct: true },
            { id: "b", text: L("No cambia", "It does not change"), correct: false },
            { id: "c", text: L("Disminuye", "It decreases"), correct: false },
            { id: "d", text: L("Se hace cero", "It becomes zero"), correct: false },
          ];
      return {
        skill: L("Intensidad frente a frecuencia (fotoeléctrico)", "Intensity versus frequency (photoelectric)"),
        statement: L(
          `Se ilumina un fotocátodo con luz de frecuencia fija (por encima del umbral) y se **duplica la intensidad** de la luz. ¿Qué le ocurre a ${askAboutKe ? "la energía cinética máxima de los fotoelectrones" : "el número de electrones emitidos por segundo"}?`,
          `A photocathode is lit with light of fixed frequency (above threshold) and the light's **intensity is doubled**. What happens to ${askAboutKe ? "the maximum kinetic energy of the photoelectrons" : "the number of electrons ejected per second"}?`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "La intensidad controla **cuántos fotones** llegan por segundo, no la energía de cada uno.",
            "Intensity controls **how many photons** arrive per second, not the energy of each one.",
          ),
          L(
            "La energía de cada fotón es $E = hf$, que depende solo de la frecuencia.",
            "Each photon's energy is $E = hf$, which depends only on frequency.",
          ),
          L(
            "Con la misma frecuencia, cada fotón sigue entregando la misma energía $hf - \\phi$.",
            "At the same frequency, each photon still delivers the same energy $hf - \\phi$.",
          ),
        ],
        answerDisplay: askAboutKe
          ? L(
              "No cambia: $K_{\\max} = hf - \\phi$ no depende de la intensidad.",
              "It does not change: $K_{\\max} = hf - \\phi$ does not depend on intensity.",
            )
          : L(
              "Aumenta (se duplica): hay el doble de fotones, luego el doble de electrones por segundo.",
              "It increases (doubles): there are twice as many photons, hence twice as many electrons per second.",
            ),
        solution: [
          step(
            "given",
            "Frecuencia fija por encima del umbral; la intensidad de la luz se duplica.",
            "Fixed frequency above threshold; the light intensity is doubled.",
          ),
          step(
            "approach",
            "Modelo de fotones de Einstein: la intensidad fija el **número** de fotones; la frecuencia fija la energía de **cada** fotón.",
            "Einstein's photon model: intensity sets the **number** of photons; frequency sets the energy of **each** photon.",
          ),
          step(
            "calculation",
            askAboutKe
              ? "$K_{\\max} = hf - \\phi$ solo contiene la frecuencia: al no cambiar $f$, $K_{\\max}$ tampoco cambia. El doble de fotones solo duplica la corriente."
              : "El doble de intensidad → el doble de fotones por segundo → el doble de electrones arrancados por segundo (cada uno con la misma $K_{\\max} = hf - \\phi$).",
            askAboutKe
              ? "$K_{\\max} = hf - \\phi$ contains only the frequency: with $f$ unchanged, $K_{\\max}$ is unchanged. Twice the photons only doubles the current."
              : "Twice the intensity → twice the photons per second → twice the electrons ejected per second (each with the same $K_{\\max} = hf - \\phi$).",
          ),
          step(
            "result",
            askAboutKe
              ? "La energía cinética máxima no cambia; lo que aumenta es el número de electrones emitidos."
              : "El número de electrones emitidos por segundo aumenta (se duplica).",
            askAboutKe
              ? "The maximum kinetic energy does not change; what increases is the number of emitted electrons."
              : "The number of electrons ejected per second increases (doubles).",
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Relativity: which statement is true (MC)                         */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "mp-rel-02",
      subject: "physics",
      topicId: "modern-physics",
      subtopicId: "relativity",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["relativity", "conceptual"],
      prerequisites: ["relativity"],
    },
    (rng) => {
      const truths = [
        {
          es: "La velocidad de la luz en el vacío es la misma para todos los observadores inerciales",
          en: "The speed of light in vacuum is the same for all inertial observers",
        },
        {
          es: "Un reloj que se mueve respecto a ti avanza más despacio que un reloj en reposo junto a ti",
          en: "A clock moving relative to you runs slower than a clock at rest next to you",
        },
        {
          es: "Las longitudes de un objeto en movimiento se contraen en la dirección del movimiento",
          en: "The lengths of a moving object contract along the direction of motion",
        },
        {
          es: "El tiempo propio entre dos sucesos es el intervalo de tiempo más corto que puede medir un reloj",
          en: "The proper time between two events is the shortest time interval any clock can measure",
        },
      ];
      const falses = [
        {
          es: "Un objeto con suficiente energía puede superar la velocidad de la luz en el vacío",
          en: "An object with enough energy can exceed the speed of light in vacuum",
        },
        {
          es: "La velocidad de la luz en el vacío depende del movimiento del observador que la mide",
          en: "The speed of light in vacuum depends on the motion of the observer measuring it",
        },
        {
          es: "Un reloj en movimiento avanza más rápido que un reloj idéntico en reposo",
          en: "A moving clock runs faster than an identical clock at rest",
        },
      ];
      const truth = rng.pick(truths);
      const options: McOption[] = [
        { id: "a", text: L(truth.es, truth.en), correct: true },
        { id: "b", text: L(falses[0].es, falses[0].en), correct: false },
        { id: "c", text: L(falses[1].es, falses[1].en), correct: false },
        { id: "d", text: L(falses[2].es, falses[2].en), correct: false },
      ];
      return {
        skill: L("Relatividad especial: afirmaciones verdaderas", "Special relativity: true statements"),
        statement: L(
          "¿Cuál de las siguientes afirmaciones de la relatividad especial es **verdadera**?",
          "Which of the following statements of special relativity is **true**?",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Dos postulados básicos: las leyes de la física son iguales en todos los sistemas inerciales, y la velocidad de la luz es invariante.",
            "Two basic postulates: the laws of physics are the same in all inertial frames, and the speed of light is invariant.",
          ),
          L(
            "De ellos se siguen la dilatación del tiempo y la contracción de longitudes, siempre “en contra” del móvil.",
            "Time dilation and length contraction follow from them, always making the moving object's clocks slow and lengths short.",
          ),
          L(
            "Ningún objeto material puede alcanzar ni superar $c$; solo la luz viaja siempre a $c$.",
            "No material object can reach or exceed $c$; only light always travels at $c$.",
          ),
        ],
        answerDisplay: L(truth.es, truth.en),
        solution: [
          step(
            "given",
            "Cuatro afirmaciones sobre relatividad especial; solo una es verdadera.",
            "Four statements about special relativity; only one is true.",
          ),
          step(
            "approach",
            "Se contrasta cada frase con los postulados y sus consecuencias: invariancia de $c$, dilatación del tiempo, contracción de longitudes.",
            "Check each sentence against the postulates and their consequences: invariance of $c$, time dilation, length contraction.",
          ),
          step(
            "calculation",
            `“Superar $c$”, “$c$ depende del observador” y “los relojes móviles van más rápido” contradicen la teoría.<br>La verdadera es: “${truth.es}”.`,
            `“Exceed $c$”, “$c$ depends on the observer” and “moving clocks run faster” contradict the theory.<br>The true one is: “${truth.en}”.`,
          ),
          step(
            "result",
            `${truth.es}.`,
            `${truth.en}.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Identify the decay particle (MC)                                 */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "mp-nucl-02",
      subject: "physics",
      topicId: "modern-physics",
      subtopicId: "nuclear",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 210,
      tags: ["nuclear", "decay", "conservation"],
      prerequisites: ["nuclear"],
    },
    (rng) => {
      const pool = [
        { pA: 238, pZ: 92, pS: "\\text{U}", dA: 234, dZ: 90, dS: "\\text{Th}", x: "alpha" },
        { pA: 234, pZ: 90, pS: "\\text{Th}", dA: 234, dZ: 91, dS: "\\text{Pa}", x: "beta-" },
        { pA: 14, pZ: 6, pS: "\\text{C}", dA: 14, dZ: 7, dS: "\\text{N}", x: "beta-" },
        { pA: 22, pZ: 11, pS: "\\text{Na}", dA: 22, dZ: 10, dS: "\\text{Ne}", x: "beta+" },
        { pA: 222, pZ: 86, pS: "\\text{Rn}", dA: 218, dZ: 84, dS: "\\text{Po}", x: "alpha" },
        { pA: 60, pZ: 27, pS: "\\text{Co}", dA: 60, dZ: 28, dS: "\\text{Ni}", x: "beta-" },
        { pA: 137, pZ: 55, pS: "\\text{Cs}", dA: 137, dZ: 56, dS: "\\text{Ba}", x: "beta-" },
      ];
      const pick = rng.pick(pool);
      const dA = pick.dA - pick.pA;
      const dZ = pick.dZ - pick.pZ;
      const eq = `$^{${pick.pA}}_{${pick.pZ}}${pick.pS} \\to\\ ^{${pick.dA}}_{${pick.dZ}}${pick.dS} + ?$`;
      const kinds: Record<string, { es: string; en: string; a: number; z: number }> = {
        alpha: { es: "Partícula α (núcleo de helio)", en: "Alpha particle (helium nucleus)", a: -4, z: -2 },
        "beta-": { es: "Partícula β⁻ (electrón)", en: "Beta-minus particle (electron)", a: 0, z: 1 },
        "beta+": { es: "Partícula β⁺ (positrón)", en: "Beta-plus particle (positron)", a: 0, z: -1 },
        gamma: { es: "Radiación γ (fotón de alta energía)", en: "Gamma radiation (high-energy photon)", a: 0, z: 0 },
      };
      const correctKind = Object.keys(kinds).find(
        (k) => kinds[k].a === dA && kinds[k].z === dZ,
      )!;
      const options: McOption[] = Object.keys(kinds).map((k, i) => ({
        id: String.fromCharCode(97 + i),
        text: L(kinds[k].es, kinds[k].en),
        correct: k === correctKind,
      }));
      return {
        skill: L("Identificar la partícula emitida", "Identifying the emitted particle"),
        statement: L(
          `Completa la desintegración nuclear conservando el número másico $A$ y la carga $Z$: ${eq}. ¿Qué es la partícula desconocida?`,
          `Complete the nuclear decay conserving the mass number $A$ and the charge $Z$: ${eq}. What is the unknown particle?`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Escribe la conservación: $A$ del reactivo = $A$ de los productos, e igual con $Z$.",
            "Write the conservation: the reactant's $A$ equals the products' $A$, and the same for $Z$.",
          ),
          L(
            `Aquí $A$ cambia en $${dA}$ y $Z$ cambia en $${dZ > 0 ? "+" + dZ : dZ}$.`,
            `Here $A$ changes by $${dA}$ and $Z$ by $${dZ > 0 ? "+" + dZ : dZ}$.`,
          ),
          L(
            "Recuerda las firmas: α tiene $(A, Z) = (4, 2)$; β⁻ resta nada de $A$ y suma 1 a $Z$; β⁺ resta 1 a $Z$; γ no cambia nada.",
            "Recall the signatures: α has $(A, Z) = (4, 2)$; β⁻ leaves $A$ alone and adds 1 to $Z$; β⁺ subtracts 1 from $Z$; γ changes nothing.",
          ),
        ],
        answerDisplay: L(kinds[correctKind].es, kinds[correctKind].en),
        solution: [
          step(
            "given",
            `${eq} con $A$ y $Z$ conservados.`,
            `${eq} with $A$ and $Z$ conserved.`,
          ),
          step(
            "approach",
            "Comparar $(\\Delta A, \\Delta Z)$ entre el núcleo padre y el hijo con la firma de cada partícula: α $(-4, -2)$, β⁻ $(0, +1)$, β⁺ $(0, -1)$, γ $(0, 0)$.",
            "Compare $(\\Delta A, \\Delta Z)$ between parent and daughter with each particle's signature: α $(-4, -2)$, β⁻ $(0, +1)$, β⁺ $(0, -1)$, γ $(0, 0)$.",
          ),
          step(
            "calculation",
            `$\\Delta A = ${pick.dA} - ${pick.pA} = ${dA}$ y $\\Delta Z = ${pick.dZ} - ${pick.pZ} = ${dZ > 0 ? "+" + dZ : dZ}$.<br>Esa firma corresponde a la ${kinds[correctKind].es.toLowerCase()}.`,
            `$\\Delta A = ${pick.dA} - ${pick.pA} = ${dA}$ and $\\Delta Z = ${pick.dZ} - ${pick.pZ} = ${dZ > 0 ? "+" + dZ : dZ}$.<br>That signature matches the ${kinds[correctKind].en.toLowerCase()}.`,
          ),
          step(
            "result",
            `La partícula emitida es: ${kinds[correctKind].es}.`,
            `The emitted particle is: ${kinds[correctKind].en}.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Challenge: work function from stopping potential                 */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "mp-chal-01",
      subject: "physics",
      topicId: "modern-physics",
      subtopicId: "photoelectric",
      difficulty: "challenge",
      questionType: "numeric-unit",
      estimatedTimeSec: 300,
      tags: ["photoelectric", "stopping-potential", "inversion", "multi-step"],
      prerequisites: ["photoelectric", "circuits"],
    },
    (rng) => {
      const pick = rng.pick([
        { lam: 400, V0: 1.5 },
        { lam: 400, V0: 1.0 },
        { lam: 450, V0: 1.0 },
        { lam: 500, V0: 1.5 },
        { lam: 550, V0: 1.0 },
        { lam: 600, V0: 0.5 },
        { lam: 620, V0: 0.4 },
        { lam: 500, V0: 0.5 },
      ]);
      const EeV = r2(photonEv(pick.lam));
      const phi = r2(EeV - pick.V0);
      return {
        skill: L("Función de trabajo a partir del potencial de frenado", "Work function from the stopping potential"),
        statement: L(
          `En un experimento fotoeléctrico, luz de $\\lambda = ${pick.lam}\\ \\text{nm}$ ilumina un fotocátodo y el potencial de frenado necesario para detener los fotoelectrones es $V_0 = ${tok(pick.V0)}\\ \\text{V}$. Calcula la **función de trabajo** del metal (en eV, 2 cifras significativas). Datos: $h = 6{,}626\\times10^{-34}\\ \\text{J}\\cdot\\text{s}$, $c = 3\\times10^{8}\\ \\text{m/s}$, $1\\ \\text{eV} = 1{,}602\\times10^{-19}\\ \\text{J}$.`,
          `In a photoelectric experiment, light of $\\lambda = ${pick.lam}\\ \\text{nm}$ illuminates a photocathode and the stopping potential needed to halt the photoelectrons is $V_0 = ${tok(pick.V0)}\\ \\text{V}$. Compute the **work function** of the metal (in eV, 2 significant figures). Data: $h = 6.626\\times10^{-34}\\ \\text{J}\\cdot\\text{s}$, $c = 3\\times10^{8}\\ \\text{m/s}$, $1\\ \\text{eV} = 1.602\\times10^{-19}\\ \\text{J}$.`,
        ),
        answer: {
          kind: "numeric-unit",
          value: phi,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["eV"],
          unitChoices: ["eV", "J", "V", "keV"],
        },
        hints: [
          L(
            "El potencial de frenado mide la energía cinética máxima: $eV_0 = K_{\\max}$.",
            "The stopping potential measures the maximum kinetic energy: $eV_0 = K_{\\max}$.",
          ),
          L(
            "En eV, $K_{\\max}$ numéricamente coincide con $V_0$ (1 eV por cada voltio).",
            "In eV, $K_{\\max}$ numerically equals $V_0$ (1 eV per volt).",
          ),
          L(
            "Combina con Einstein: $\\phi = \\frac{hc}{\\lambda} - K_{\\max}$.",
            "Combine with Einstein: $\\phi = \\frac{hc}{\\lambda} - K_{\\max}$.",
          ),
        ],
        answerDisplay: L(`$\\phi \\approx ${tok(phi)}\\ \\text{eV}$`, `$\\phi \\approx ${tok(phi)}\\ \\text{eV}$`),
        solution: [
          step(
            "given",
            `$\\lambda = ${pick.lam}\\ \\text{nm}$, $V_0 = ${tok(pick.V0)}\\ \\text{V}$; el potencial de frenado detiene justamente a los electrones más rápidos.`,
            `$\\lambda = ${pick.lam}\\ \\text{nm}$, $V_0 = ${tok(pick.V0)}\\ \\text{V}$; the stopping potential halts exactly the fastest electrons.`,
          ),
          step(
            "approach",
            "Dos piezas: (1) $K_{\\max} = eV_0$ (en eV coincide con $V_0$); (2) Einstein: $\\frac{hc}{\\lambda} = \\phi + K_{\\max}$, luego $\\phi = \\frac{hc}{\\lambda} - V_0$.",
            "Two pieces: (1) $K_{\\max} = eV_0$ (in eV it equals $V_0$); (2) Einstein: $\\frac{hc}{\\lambda} = \\phi + K_{\\max}$, so $\\phi = \\frac{hc}{\\lambda} - V_0$.",
          ),
          step(
            "calculation",
            `$E_{\\text{fotón}} = \\frac{hc}{\\lambda} \\approx ${tok(EeV)}\\ \\text{eV}$<br>$K_{\\max} = eV_0 = ${tok(pick.V0)}\\ \\text{eV}$<br>$\\phi = ${tok(EeV)} - ${tok(pick.V0)} = ${tok(phi)}\\ \\text{eV}$`,
            `$E_{\\text{photon}} = \\frac{hc}{\\lambda} \\approx ${tok(EeV)}\\ \\text{eV}$<br>$K_{\\max} = eV_0 = ${tok(pick.V0)}\\ \\text{eV}$<br>$\\phi = ${tok(EeV)} - ${tok(pick.V0)} = ${tok(phi)}\\ \\text{eV}$`,
          ),
          step(
            "result",
            `La función de trabajo del metal es $\\approx ${tok(phi)}\\ \\text{eV}$.`,
            `The work function of the metal is $\\approx ${tok(phi)}\\ \\text{eV}$.`,
          ),
        ],
      };
    },
  ),
];
