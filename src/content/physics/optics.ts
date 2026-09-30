/**
 * PHYSICS · Optics
 *
 * Reflection (with a mirror-geometry triangle diagram), plane mirrors,
 * refraction and Snell's law, thin lenses and concave mirrors with clean
 * integer image distances, image classification as multiple choice, and
 * a signed-distance challenge (object inside the focal length).
 */

import { template, L, step, tok } from "@/lib/problem";
import type { ProblemTemplate, McOption } from "@/lib/types";

/* Deterministic formatting helpers (no RNG inside). */
const r1 = (v: number) => Math.round(v * 10) / 10;
const r2 = (v: number) => Math.round(v * 100) / 100;
const r3 = (v: number) => Math.round(v * 1000) / 1000;

export const templates: ProblemTemplate[] = [
  /* ---------------------------------------------------------------- */
  /* Law of reflection: angle to the normal (triangle diagram)        */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "opt-refl-01",
      subject: "physics",
      topicId: "optics",
      subtopicId: "reflection",
      difficulty: "easy",
      questionType: "numeric-unit",
      estimatedTimeSec: 90,
      tags: ["reflection", "normal", "mirror"],
      prerequisites: [],
    },
    (rng) => {
      const theta = rng.pick([20, 25, 30, 35, 40, 50, 55, 60]);
      const inc = 90 - theta;
      return {
        skill: L("Ley de reflexión: ángulo con la normal", "Law of reflection: angle to the normal"),
        statement: L(
          `Un rayo de luz incide sobre un espejo plano formando $${theta}^{\\circ}$ con la **superficie** del espejo. ¿Cuánto vale el ángulo de incidencia medido desde la **normal** (y por tanto también el de reflexión)?`,
          `A light ray strikes a plane mirror at $${theta}^{\\circ}$ to the mirror **surface**. What is the angle of incidence measured from the **normal** (and hence the angle of reflection)?`,
        ),
        diagram: {
          kind: "right-triangle",
          aLabel: "espejo / mirror",
          bLabel: "normal",
          cLabel: "rayo / ray",
          angleLabel: `${theta}°`,
        },
        diagramLabel: L(
          `Triángulo de la geometría del rayo: la hipotenusa es el rayo, la base es el espejo y el cateto vertical la normal; el ángulo entre rayo y espejo es ${theta} grados.`,
          `Triangle of the ray geometry: the hypotenuse is the ray, the base is the mirror and the vertical side is the normal; the angle between ray and mirror is ${theta} degrees.`,
        ),
        answer: {
          kind: "numeric-unit",
          value: inc,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["°", "deg", "grados"],
          unitChoices: ["°", "deg", "rad"],
        },
        hints: [
          L(
            "El ángulo de incidencia se mide siempre respecto a la **normal**, no respecto al espejo.",
            "The angle of incidence is always measured from the **normal**, not from the mirror.",
          ),
          L(
            "La normal es perpendicular a la superficie: forma $90^{\\circ}$ con el espejo.",
            "The normal is perpendicular to the surface: it makes $90^{\\circ}$ with the mirror.",
          ),
          L(
            `Resta: $90^{\\circ} - ${theta}^{\\circ}$.`,
            `Subtract: $90^{\\circ} - ${theta}^{\\circ}$.`,
          ),
        ],
        answerDisplay: L(`$\\theta_i = ${inc}^{\\circ}$`, `$\\theta_i = ${inc}^{\\circ}$`),
        solution: [
          step(
            "given",
            `El rayo forma $${theta}^{\\circ}$ con la superficie del espejo.`,
            `The ray makes $${theta}^{\\circ}$ with the mirror surface.`,
          ),
          step(
            "approach",
            "La normal es perpendicular a la superficie ($90^{\\circ}$ con el espejo), y el ángulo de incidencia se mide desde la normal.",
            "The normal is perpendicular to the surface ($90^{\\circ}$ to the mirror), and the angle of incidence is measured from the normal.",
          ),
          step(
            "calculation",
            `$\\theta_i = 90^{\\circ} - ${theta}^{\\circ} = ${inc}^{\\circ}$<br>Por la ley de reflexión, $\\theta_r = \\theta_i = ${inc}^{\\circ}$.`,
            `$\\theta_i = 90^{\\circ} - ${theta}^{\\circ} = ${inc}^{\\circ}$<br>By the law of reflection, $\\theta_r = \\theta_i = ${inc}^{\\circ}$.`,
          ),
          step(
            "result",
            `El ángulo de incidencia (y de reflexión) es $${inc}^{\\circ}$.`,
            `The angle of incidence (and reflection) is $${inc}^{\\circ}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Plane mirror: object–image distance                              */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "opt-refl-02",
      subject: "physics",
      topicId: "optics",
      subtopicId: "reflection",
      difficulty: "easy",
      questionType: "numeric-unit",
      estimatedTimeSec: 90,
      tags: ["plane-mirror", "image-formation"],
      prerequisites: [],
    },
    (rng) => {
      const d = rng.pick([1.5, 2, 2.5, 3, 4]);
      const dist = r1(2 * d);
      return {
        skill: L("Distancia objeto–imagen en un espejo plano", "Object–image distance in a plane mirror"),
        statement: L(
          `Una persona está a $${tok(d)}\\ \\text{m}$ de un espejo plano. ¿A qué distancia está la persona de su imagen?`,
          `A person stands $${tok(d)}\\ \\text{m}$ from a plane mirror. How far is the person from their image?`,
        ),
        answer: {
          kind: "numeric-unit",
          value: dist,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["m"],
          unitChoices: ["m", "cm", "km", "m/s"],
        },
        hints: [
          L(
            "En un espejo plano, la imagen queda **detrás** del espejo, a la misma distancia que el objeto.",
            "In a plane mirror the image lies **behind** the mirror, as far as the object is in front.",
          ),
          L(
            "La distancia total objeto–imagen es la suma de las dos distancias al espejo.",
            "The total object–image distance is the sum of the two distances to the mirror.",
          ),
          L(
            "Suma $d + d$.",
            "Add $d + d$.",
          ),
        ],
        answerDisplay: L(`$d_{\\text{total}} = ${tok(dist)}\\ \\text{m}$`, `$d_{\\text{total}} = ${tok(dist)}\\ \\text{m}$`),
        solution: [
          step(
            "given",
            `Distancia al espejo: $d = ${tok(d)}\\ \\text{m}$ (persona delante, imagen detrás).`,
            `Distance to the mirror: $d = ${tok(d)}\\ \\text{m}$ (person in front, image behind).`,
          ),
          step(
            "approach",
            "La imagen de un espejo plano está simétrica: a la misma distancia detrás del espejo.",
            "The image of a plane mirror is symmetric: the same distance behind the mirror.",
          ),
          step(
            "calculation",
            `$d_{\\text{total}} = d + d = ${tok(d)} + ${tok(d)} = ${tok(dist)}\\ \\text{m}$`,
            `$d_{\\text{total}} = d + d = ${tok(d)} + ${tok(d)} = ${tok(dist)}\\ \\text{m}$`,
          ),
          step(
            "result",
            `La persona está a $${tok(dist)}\\ \\text{m}$ de su imagen.`,
            `The person is $${tok(dist)}\\ \\text{m}$ from their image.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Plane mirror: real or virtual? (text)                            */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "opt-img-01",
      subject: "physics",
      topicId: "optics",
      subtopicId: "image-formation",
      difficulty: "easy",
      questionType: "text",
      estimatedTimeSec: 60,
      tags: ["plane-mirror", "virtual-image", "conceptual"],
      prerequisites: [],
    },
    (rng) => {
      void rng;
      return {
        skill: L("Imagen de un espejo plano: ¿real o virtual?", "Plane-mirror image: real or virtual?"),
        statement: L(
          "La imagen de una lámpara vista en un espejo plano se forma **detrás** del espejo, donde no llega realmente la luz. ¿Es una imagen **real** o **virtual**? (Responde con una palabra.)",
          "The image of a lamp seen in a plane mirror forms **behind** the mirror, where no light actually reaches. Is it a **real** or a **virtual** image? (Answer with one word.)",
        ),
        answer: {
          kind: "text",
          accepted: ["virtual", "es virtual", "la imagen es virtual", "virtual image", "una imagen virtual", "it is virtual"],
        },
        hints: [
          L(
            "Una imagen **real** se forma donde convergen realmente los rayos de luz (puede recogerse en una pantalla).",
            "A **real** image forms where light rays actually converge (it can be caught on a screen).",
          ),
          L(
            "Una imagen **virtual** se forma donde *parecen* divergir los rayos: detrás del espejo.",
            "A **virtual** image forms where the rays only *appear* to diverge from: behind the mirror.",
          ),
          L(
            "¿Se puede recoger esta imagen en una pantalla colocada detrás del espejo?",
            "Could this image be caught on a screen placed behind the mirror?",
          ),
        ],
        answerDisplay: L(
          "Es una imagen **virtual** (y derecha, del mismo tamaño).",
          "It is a **virtual** image (and upright, same size).",
        ),
        solution: [
          step(
            "given",
            "La imagen está detrás del espejo plano; la luz no llega realmente allí.",
            "The image is behind the plane mirror; no light actually reaches that spot.",
          ),
          step(
            "approach",
            "Criterio: real = los rayos convergen de verdad; virtual = solo sus prolongaciones convergen.",
            "Criterion: real = rays truly converge; virtual = only their extensions converge.",
          ),
          step(
            "calculation",
            "Los rayos reflejados divergen delante del espejo; sus prolongaciones se cortan detrás del espejo, donde “vemos” la imagen.",
            "The reflected rays diverge in front of the mirror; their extensions cross behind the mirror, where we “see” the image.",
          ),
          step(
            "result",
            "La imagen es virtual (no puede recogerse en una pantalla).",
            "The image is virtual (it cannot be caught on a screen).",
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Refraction: toward or away from the normal (MC)                  */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "opt-refr-01",
      subject: "physics",
      topicId: "optics",
      subtopicId: "refraction",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["refraction", "conceptual", "snell"],
      prerequisites: [],
    },
    (rng) => {
      const cases = [
        { fromEs: "del aire", fromEn: "from air", toEs: "al agua", toEn: "into water", nFrom: 1.0, nTo: 1.33 },
        { fromEs: "del agua", fromEn: "from water", toEs: "al aire", toEn: "into air", nFrom: 1.33, nTo: 1.0 },
        { fromEs: "del aire", fromEn: "from air", toEs: "al vidrio", toEn: "into glass", nFrom: 1.0, nTo: 1.5 },
        { fromEs: "del vidrio", fromEn: "from glass", toEs: "al aire", toEn: "into air", nFrom: 1.5, nTo: 1.0 },
      ];
      const pick = rng.pick(cases);
      const toward = pick.nTo > pick.nFrom; // entering a denser medium
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            "Se acerca a la normal y su rapidez disminuye",
            "It bends toward the normal and slows down",
          ),
          correct: toward,
        },
        {
          id: "b",
          text: L(
            "Se aleja de la normal y su rapidez aumenta",
            "It bends away from the normal and speeds up",
          ),
          correct: !toward,
        },
        {
          id: "c",
          text: L(
            "Se acerca a la normal y su rapidez aumenta",
            "It bends toward the normal and speeds up",
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            "Se aleja de la normal y su rapidez disminuye",
            "It bends away from the normal and slows down",
          ),
          correct: false,
        },
      ];
      const nFromStr = pick.nFrom === 1.0 ? "1{,}0" : pick.nFrom === 1.33 ? "1{,}33" : "1{,}5";
      const nToStr = pick.nTo === 1.0 ? "1{,}0" : pick.nTo === 1.33 ? "1{,}33" : "1{,}5";
      return {
        skill: L("Refracción al cambiar de medio", "Refraction when changing medium"),
        statement: L(
          `Un rayo de luz pasa ${pick.fromEs} ${pick.toEs} (índices de refracción $n_1 = ${nFromStr}$ y $n_2 = ${nToStr}$). ¿Qué le ocurre al rayo refractado?`,
          `A light ray passes ${pick.fromEn} ${pick.toEn} (refractive indices $n_1 = ${nFromStr.replace("{,}", ".")}$ and $n_2 = ${nToStr.replace("{,}", ".")}$). What happens to the refracted ray?`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Compara los dos índices de refracción: ¿el rayo entra en un medio más refringente o menos?",
            "Compare the two refractive indices: is the ray entering a denser or a less dense medium?",
          ),
          L(
            "Al entrar en un medio con mayor $n$, la luz va más lenta y se acerca a la normal.",
            "Entering a medium with larger $n$, light slows down and bends toward the normal.",
          ),
          L(
            "Al pasar a un medio con menor $n$, acelera y se aleja de la normal.",
            "Passing into a medium with smaller $n$, it speeds up and bends away from the normal.",
          ),
        ],
        answerDisplay: toward
          ? L("Se acerca a la normal y su rapidez disminuye.", "It bends toward the normal and slows down.")
          : L("Se aleja de la normal y su rapidez aumenta.", "It bends away from the normal and speeds up."),
        solution: [
          step(
            "given",
            `Paso ${pick.fromEs} ${pick.toEs}: $n_1 = ${nFromStr}$, $n_2 = ${nToStr}$.`,
            `Passage ${pick.fromEn} ${pick.toEn}: $n_1 = ${nFromStr.replace("{,}", ".")}$, $n_2 = ${nToStr.replace("{,}", ".")}$.`,
          ),
          step(
            "approach",
            "La rapidez de la luz en el medio es $v = c/n$; la dirección sigue la ley de Snell $n_1\\text{sen}\\,\\theta_1 = n_2\\text{sen}\\,\\theta_2$.",
            "The speed of light in a medium is $v = c/n$; the direction follows Snell's law $n_1\\sin\\theta_1 = n_2\\sin\\theta_2$.",
          ),
          step(
            "calculation",
            toward
              ? "Aquí $n_2 > n_1$: la luz se frena y, para cumplir Snell, $\\theta_2 < \\theta_1$ (se acerca a la normal)."
              : "Aquí $n_2 < n_1$: la luz acelera y, para cumplir Snell, $\\theta_2 > \\theta_1$ (se aleja de la normal).",
            toward
              ? "Here $n_2 > n_1$: light slows down and, to satisfy Snell, $\\theta_2 < \\theta_1$ (toward the normal)."
              : "Here $n_2 < n_1$: light speeds up and, to satisfy Snell, $\\theta_2 > \\theta_1$ (away from the normal).",
          ),
          step(
            "result",
            toward
              ? "El rayo se acerca a la normal y su rapidez disminuye."
              : "El rayo se aleja de la normal y su rapidez aumenta.",
            toward
              ? "The ray bends toward the normal and slows down."
              : "The ray bends away from the normal and speeds up.",
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Snell's law: refraction angle                                    */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "opt-snell-01",
      subject: "physics",
      topicId: "optics",
      subtopicId: "snell",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 180,
      tags: ["snell", "refraction"],
      prerequisites: ["refraction"],
    },
    (rng) => {
      const pick = rng.pick([
        { th1: 30, sin1: 0.5, n: 1.33, medEs: "agua", medEn: "water" },
        { th1: 45, sin1: 0.707, n: 1.33, medEs: "agua", medEn: "water" },
        { th1: 30, sin1: 0.5, n: 1.5, medEs: "vidrio", medEn: "glass" },
        { th1: 45, sin1: 0.707, n: 1.5, medEs: "vidrio", medEn: "glass" },
        { th1: 37, sin1: 0.6, n: 1.33, medEs: "agua", medEn: "water" },
        { th1: 53, sin1: 0.8, n: 1.5, medEs: "vidrio", medEn: "glass" },
      ]);
      const sin2 = pick.sin1 / pick.n;
      const th2 = r1((Math.asin(sin2) * 180) / Math.PI);
      return {
        skill: L("Ley de Snell: ángulo de refracción", "Snell's law: refraction angle"),
        statement: L(
          `Un rayo viaja en el aire ($n_1 = 1{,}0$) e incide sobre la superficie del ${pick.medEs} ($n_2 = ${tok(pick.n)}$) con un ángulo de incidencia de $${pick.th1}^{\\circ}$ respecto a la normal. Calcula el ángulo de refracción, en grados con una cifra decimal. (Puedes usar $\\text{sen}\\,${pick.th1}^{\\circ} \\approx ${tok(pick.sin1)}$.)`,
          `A ray travels in air ($n_1 = 1.0$) and strikes the surface of ${pick.medEn} ($n_2 = ${tok(pick.n)}$) at an incidence angle of $${pick.th1}^{\\circ}$ to the normal. Compute the refraction angle, in degrees to one decimal. (You may use $\\sin ${pick.th1}^{\\circ} \\approx ${tok(pick.sin1)}$.)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: th2,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["°", "deg", "grados"],
          unitChoices: ["°", "deg", "rad"],
        },
        hints: [
          L(
            "Datos: $n_1$, $n_2$, $\\theta_1$. Incógnita: $\\theta_2$.",
            "Data: $n_1$, $n_2$, $\\theta_1$. Unknown: $\\theta_2$.",
          ),
          L(
            "Ley de Snell: $n_1\\,\\text{sen}\\,\\theta_1 = n_2\\,\\text{sen}\\,\\theta_2$. Con $n_1 = 1$, queda $\\text{sen}\\,\\theta_2 = \\frac{\\text{sen}\\,\\theta_1}{n_2}$.",
            "Snell's law: $n_1\\sin\\theta_1 = n_2\\sin\\theta_2$. With $n_1 = 1$: $\\sin\\theta_2 = \\frac{\\sin\\theta_1}{n_2}$.",
          ),
          L(
            `Calcula $\\text{sen}\\,\\theta_2$ y después el arcoseno en grados.`,
            `Compute $\\sin\\theta_2$ and then take the arcsine in degrees.`,
          ),
        ],
        answerDisplay: L(`$\\theta_2 \\approx ${tok(th2)}^{\\circ}$`, `$\\theta_2 \\approx ${tok(th2)}^{\\circ}$`),
        solution: [
          step(
            "given",
            `$n_1 = 1{,}0$, $n_2 = ${tok(pick.n)}$, $\\theta_1 = ${pick.th1}^{\\circ}$, $\\text{sen}\\,\\theta_1 \\approx ${tok(pick.sin1)}$`,
            `$n_1 = 1.0$, $n_2 = ${tok(pick.n)}$, $\\theta_1 = ${pick.th1}^{\\circ}$, $\\sin\\theta_1 \\approx ${tok(pick.sin1)}$`,
          ),
          step(
            "approach",
            "Ley de Snell: $n_1\\,\\text{sen}\\,\\theta_1 = n_2\\,\\text{sen}\\,\\theta_2$; despejamos $\\theta_2$.",
            "Snell's law: $n_1\\sin\\theta_1 = n_2\\sin\\theta_2$; we solve for $\\theta_2$.",
          ),
          step(
            "calculation",
            `$\\text{sen}\\,\\theta_2 = \\frac{ ${tok(pick.sin1)}}{ ${tok(pick.n)}} = ${tok(r3(sin2))}$<br>$\\theta_2 = \\text{arcosen}\\,(${tok(r3(sin2))}) \\approx ${tok(th2)}^{\\circ}$`,
            `$\\sin\\theta_2 = \\frac{ ${tok(pick.sin1)}}{ ${tok(pick.n)}} = ${tok(r3(sin2))}$<br>$\\theta_2 = \\arcsin(${tok(r3(sin2))}) \\approx ${tok(th2)}^{\\circ}$`,
          ),
          step(
            "result",
            `El rayo se refracta con un ángulo de $\\approx ${tok(th2)}^{\\circ}$ respecto a la normal.`,
            `The ray refracts at $\\approx ${tok(th2)}^{\\circ}$ to the normal.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Thin lens: image distance (integer results)                      */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "opt-lens-01",
      subject: "physics",
      topicId: "optics",
      subtopicId: "lenses",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 150,
      tags: ["thin-lens", "converging"],
      prerequisites: [],
    },
    (rng) => {
      const pick = rng.pick([
        { f: 10, doCm: 30 },
        { f: 10, doCm: 15 },
        { f: 20, doCm: 30 },
        { f: 20, doCm: 60 },
        { f: 15, doCm: 30 },
        { f: 12, doCm: 24 },
        { f: 8, doCm: 24 },
        { f: 6, doCm: 12 },
        { f: 5, doCm: 15 },
        { f: 5, doCm: 10 },
        { f: 10, doCm: 12 },
      ]);
      const di = r1(1 / (1 / pick.f - 1 / pick.doCm));
      return {
        skill: L("Ecuación de la lente delgada: distancia imagen", "Thin-lens equation: image distance"),
        statement: L(
          `Un objeto está a $${pick.doCm}\\ \\text{cm}$ de una lente convergente de distancia focal $f = ${pick.f}\\ \\text{cm}$. ¿A qué distancia de la lente se forma la imagen? (en cm, 2 cifras significativas)`,
          `An object is placed $${pick.doCm}\\ \\text{cm}$ from a converging lens of focal length $f = ${pick.f}\\ \\text{cm}$. At what distance from the lens does the image form? (in cm, 2 significant figures)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: di,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["cm"],
          unitChoices: ["cm", "m", "mm", "m^-1"],
        },
        hints: [
          L(
            "Datos: $f$ y $d_o$. Incógnita: $d_i$.",
            "Data: $f$ and $d_o$. Unknown: $d_i$.",
          ),
          L(
            "Ecuación de la lente delgada: $\\frac{1}{f} = \\frac{1}{d_o} + \\frac{1}{d_i}$.",
            "Thin-lens equation: $\\frac{1}{f} = \\frac{1}{d_o} + \\frac{1}{d_i}$.",
          ),
          L(
            `Despeja $\\frac{1}{d_i} = \\frac{1}{f} - \\frac{1}{d_o} = \\frac{d_o - f}{f\\,d_o}$ y, al final, invierte esa fracción.`,
            `Rearrange $\\frac{1}{d_i} = \\frac{1}{f} - \\frac{1}{d_o} = \\frac{d_o - f}{f\\,d_o}$ and invert that fraction at the end.`,
          ),
        ],
        answerDisplay: L(`$d_i = ${tok(di)}\\ \\text{cm}$`, `$d_i = ${tok(di)}\\ \\text{cm}$`),
        solution: [
          step(
            "given",
            `$f = ${pick.f}\\ \\text{cm}$, $d_o = ${pick.doCm}\\ \\text{cm}$ (objeto más lejos que el foco)`,
            `$f = ${pick.f}\\ \\text{cm}$, $d_o = ${pick.doCm}\\ \\text{cm}$ (object beyond the focal point)`,
          ),
          step(
            "approach",
            "Lente delgada: $\\frac{1}{f} = \\frac{1}{d_o} + \\frac{1}{d_i}$; trabajamos en cm.",
            "Thin lens: $\\frac{1}{f} = \\frac{1}{d_o} + \\frac{1}{d_i}$; we work in cm.",
          ),
          step(
            "calculation",
            `$\\frac{1}{d_i} = \\frac{1}{${pick.f}} - \\frac{1}{${pick.doCm}} = \\frac{${pick.doCm} - ${pick.f}}{${pick.f}\\cdot${pick.doCm}} = \\frac{${pick.doCm - pick.f}}{${pick.f * pick.doCm}}$<br>$d_i = \\frac{${pick.f * pick.doCm}}{${pick.doCm - pick.f}} = ${tok(di)}\\ \\text{cm}$`,
            `$\\frac{1}{d_i} = \\frac{1}{${pick.f}} - \\frac{1}{${pick.doCm}} = \\frac{${pick.doCm} - ${pick.f}}{${pick.f}\\cdot${pick.doCm}} = \\frac{${pick.doCm - pick.f}}{${pick.f * pick.doCm}}$<br>$d_i = \\frac{${pick.f * pick.doCm}}{${pick.doCm - pick.f}} = ${tok(di)}\\ \\text{cm}$`,
          ),
          step(
            "result",
            `La imagen (real e invertida) se forma a $${tok(di)}\\ \\text{cm}$ de la lente.`,
            `The image (real and inverted) forms at $${tok(di)}\\ \\text{cm}$ from the lens.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Image classification by object position (MC)                     */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "opt-lens-02",
      subject: "physics",
      topicId: "optics",
      subtopicId: "image-formation",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["thin-lens", "image-classification"],
      prerequisites: ["lenses"],
    },
    (rng) => {
      const pick = rng.pick([
        { f: 10, doCm: 30, c: "beyond" },
        { f: 10, doCm: 20, c: "at2f" },
        { f: 10, doCm: 15, c: "between" },
        { f: 10, doCm: 5, c: "inside" },
        { f: 15, doCm: 45, c: "beyond" },
        { f: 15, doCm: 30, c: "at2f" },
        { f: 15, doCm: 20, c: "between" },
        { f: 15, doCm: 10, c: "inside" },
        { f: 20, doCm: 60, c: "beyond" },
        { f: 20, doCm: 40, c: "at2f" },
        { f: 20, doCm: 30, c: "between" },
        { f: 20, doCm: 12, c: "inside" },
      ]);
      const texts: { c: string; es: string; en: string }[] = [
        { c: "beyond", es: "Real, invertida y más pequeña que el objeto", en: "Real, inverted and smaller than the object" },
        { c: "at2f", es: "Real, invertida y del mismo tamaño que el objeto", en: "Real, inverted and the same size as the object" },
        { c: "between", es: "Real, invertida y más grande que el objeto", en: "Real, inverted and larger than the object" },
        { c: "inside", es: "Virtual, derecha y más grande que el objeto", en: "Virtual, upright and larger than the object" },
      ];
      const options: McOption[] = texts.map((t, i) => ({
        id: String.fromCharCode(97 + i),
        text: L(t.es, t.en),
        correct: t.c === pick.c,
      }));
      const correct = texts.find((t) => t.c === pick.c)!;
      return {
        skill: L("Tipo de imagen según la posición del objeto", "Image type from the object position"),
        statement: L(
          `Un objeto se coloca a $${pick.doCm}\\ \\text{cm}$ de una lente convergente de distancia focal $f = ${pick.f}\\ \\text{cm}$. Describe la imagen que se forma.`,
          `An object is placed $${pick.doCm}\\ \\text{cm}$ from a converging lens of focal length $f = ${pick.f}\\ \\text{cm}$. Describe the image that forms.`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Compara la distancia del objeto con $f$ y con $2f$.",
            "Compare the object distance with $f$ and with $2f$.",
          ),
          L(
            "Más allá de $2f$: imagen real, invertida y reducida. Entre $f$ y $2f$: real, invertida y aumentada.",
            "Beyond $2f$: real, inverted, reduced. Between $f$ and $2f$: real, inverted, magnified.",
          ),
          L(
            "Dentro del foco ($d_o < f$): los rayos divergen al salir → imagen virtual, derecha y aumentada.",
            "Inside the focal length ($d_o < f$): the exiting rays diverge → virtual, upright, magnified image.",
          ),
        ],
        answerDisplay: L(correct.es, correct.en),
        solution: [
          step(
            "given",
            `$f = ${pick.f}\\ \\text{cm}$, $d_o = ${pick.doCm}\\ \\text{cm}$; por tanto $2f = ${2 * pick.f}\\ \\text{cm}$.`,
            `$f = ${pick.f}\\ \\text{cm}$, $d_o = ${pick.doCm}\\ \\text{cm}$; hence $2f = ${2 * pick.f}\\ \\text{cm}$.`,
          ),
          step(
            "approach",
            "La naturaleza de la imagen depende de dónde cae $d_o$ respecto a $f$ y $2f$ (reglas del diagrama de rayos).",
            "The nature of the image depends on where $d_o$ falls relative to $f$ and $2f$ (ray-diagram rules).",
          ),
          step(
            "calculation",
            pick.c === "beyond"
              ? `Aquí $d_o > 2f$: la imagen es real, invertida y más pequeña.`
              : pick.c === "at2f"
                ? `Aquí $d_o = 2f$: la imagen es real, invertida y del mismo tamaño.`
                : pick.c === "between"
                  ? `Aquí $f < d_o < 2f$: la imagen es real, invertida y más grande.`
                  : `Aquí $d_o < f$: los rayos salen divergiendo; la imagen es virtual, derecha y más grande.`,
            pick.c === "beyond"
              ? `Here $d_o > 2f$: the image is real, inverted and smaller.`
              : pick.c === "at2f"
                ? `Here $d_o = 2f$: the image is real, inverted and the same size.`
                : pick.c === "between"
                  ? `Here $f < d_o < 2f$: the image is real, inverted and larger.`
                  : `Here $d_o < f$: the exiting rays diverge; the image is virtual, upright and larger.`,
          ),
          step(
            "result",
            `${correct.es}.`,
            `${correct.en}.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Concave mirror: image distance                                   */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "opt-mirr-01",
      subject: "physics",
      topicId: "optics",
      subtopicId: "mirrors",
      difficulty: "medium",
      questionType: "numeric-unit",
      estimatedTimeSec: 150,
      tags: ["concave-mirror", "thin-mirror"],
      prerequisites: [],
    },
    (rng) => {
      const pick = rng.pick([
        { f: 20, doCm: 60 },
        { f: 10, doCm: 30 },
        { f: 15, doCm: 30 },
        { f: 20, doCm: 30 },
        { f: 12, doCm: 24 },
        { f: 25, doCm: 50 },
        { f: 30, doCm: 60 },
        { f: 10, doCm: 15 },
      ]);
      const di = r1(1 / (1 / pick.f - 1 / pick.doCm));
      return {
        skill: L("Espejo cóncavo: distancia imagen", "Concave mirror: image distance"),
        statement: L(
          `Un objeto está a $${pick.doCm}\\ \\text{cm}$ de un espejo cóncavo de distancia focal $f = ${pick.f}\\ \\text{cm}$. ¿A qué distancia del espejo se forma la imagen? (en cm, 2 cifras significativas)`,
          `An object is placed $${pick.doCm}\\ \\text{cm}$ from a concave mirror of focal length $f = ${pick.f}\\ \\text{cm}$. At what distance from the mirror does the image form? (in cm, 2 significant figures)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: di,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["cm"],
          unitChoices: ["cm", "m", "mm", "m^-1"],
        },
        hints: [
          L(
            "Los espejos esféricos cumplen la misma ecuación que las lentes delgadas.",
            "Spherical mirrors obey the same equation as thin lenses.",
          ),
          L(
            "$\\frac{1}{f} = \\frac{1}{d_o} + \\frac{1}{d_i}$, con $f > 0$ para un espejo cóncavo.",
            "$\\frac{1}{f} = \\frac{1}{d_o} + \\frac{1}{d_i}$, with $f > 0$ for a concave mirror.",
          ),
          L(
            `Despeja $\\frac{1}{d_i} = \\frac{1}{f} - \\frac{1}{d_o}$ y calcula el inverso.`,
            `Rearrange $\\frac{1}{d_i} = \\frac{1}{f} - \\frac{1}{d_o}$ and take the inverse.`,
          ),
        ],
        answerDisplay: L(`$d_i = ${tok(di)}\\ \\text{cm}$`, `$d_i = ${tok(di)}\\ \\text{cm}$`),
        solution: [
          step(
            "given",
            `$f = ${pick.f}\\ \\text{cm}$ (cóncavo), $d_o = ${pick.doCm}\\ \\text{cm}$`,
            `$f = ${pick.f}\\ \\text{cm}$ (concave), $d_o = ${pick.doCm}\\ \\text{cm}$`,
          ),
          step(
            "approach",
            "Ecuación del espejo: $\\frac{1}{f} = \\frac{1}{d_o} + \\frac{1}{d_i}$ (idéntica a la de la lente delgada).",
            "Mirror equation: $\\frac{1}{f} = \\frac{1}{d_o} + \\frac{1}{d_i}$ (identical to the thin-lens one).",
          ),
          step(
            "calculation",
            `$\\frac{1}{d_i} = \\frac{1}{${pick.f}} - \\frac{1}{${pick.doCm}} = \\frac{${pick.doCm} - ${pick.f}}{${pick.f}\\cdot${pick.doCm}} = \\frac{${pick.doCm - pick.f}}{${pick.f * pick.doCm}}$<br>$d_i = \\frac{${pick.f * pick.doCm}}{${pick.doCm - pick.f}} = ${tok(di)}\\ \\text{cm}$`,
            `$\\frac{1}{d_i} = \\frac{1}{${pick.f}} - \\frac{1}{${pick.doCm}} = \\frac{${pick.doCm} - ${pick.f}}{${pick.f}\\cdot${pick.doCm}} = \\frac{${pick.doCm - pick.f}}{${pick.f * pick.doCm}}$<br>$d_i = \\frac{${pick.f * pick.doCm}}{${pick.doCm - pick.f}} = ${tok(di)}\\ \\text{cm}$`,
          ),
          step(
            "result",
            `La imagen (real e invertida) se forma a $${tok(di)}\\ \\text{cm}$ delante del espejo.`,
            `The image (real and inverted) forms at $${tok(di)}\\ \\text{cm}$ in front of the mirror.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Index of refraction from two angles                              */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "opt-snell-02",
      subject: "physics",
      topicId: "optics",
      subtopicId: "snell",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 210,
      tags: ["snell", "index-of-refraction"],
      prerequisites: ["refraction"],
    },
    (rng) => {
      const pick = rng.pick([
        { th1: 40, sin1: 0.643, th2: 25, sin2: 0.423 },
        { th1: 45, sin1: 0.707, th2: 28, sin2: 0.469 },
        { th1: 35, sin1: 0.574, th2: 22, sin2: 0.375 },
        { th1: 50, sin1: 0.766, th2: 30, sin2: 0.5 },
        { th1: 30, sin1: 0.5, th2: 19, sin2: 0.326 },
        { th1: 55, sin1: 0.819, th2: 33, sin2: 0.545 },
      ]);
      const n = r2(pick.sin1 / pick.sin2);
      return {
        skill: L("Índice de refracción a partir de ángulos", "Refractive index from angles"),
        statement: L(
          `Un rayo pasa del aire a un medio transparente desconocido. El ángulo de incidencia (respecto a la normal) es $${pick.th1}^{\\circ}$ y el de refracción $${pick.th2}^{\\circ}$. Calcula el índice de refracción del medio (2 cifras significativas; usa $\\text{sen}\\,${pick.th1}^{\\circ} \\approx ${tok(pick.sin1)}$ y $\\text{sen}\\,${pick.th2}^{\\circ} \\approx ${tok(pick.sin2)}$).`,
          `A ray passes from air into an unknown transparent medium. The incidence angle (to the normal) is $${pick.th1}^{\\circ}$ and the refraction angle is $${pick.th2}^{\\circ}$. Compute the refractive index of the medium (2 significant figures; use $\\sin ${pick.th1}^{\\circ} \\approx ${tok(pick.sin1)}$ and $\\sin ${pick.th2}^{\\circ} \\approx ${tok(pick.sin2)}$).`,
        ),
        answer: {
          kind: "numeric",
          value: n,
          tolerance: { mode: "sigfig", value: 2 },
        },
        hints: [
          L(
            "En el aire $n_1 \\approx 1$, así que la ley de Snell se simplifica.",
            "In air $n_1 \\approx 1$, so Snell's law simplifies.",
          ),
          L(
            "$n_2\\,\\text{sen}\\,\\theta_2 = \\text{sen}\\,\\theta_1 \\Rightarrow n_2 = \\frac{\\text{sen}\\,\\theta_1}{\\text{sen}\\,\\theta_2}$.",
            "$n_2\\sin\\theta_2 = \\sin\\theta_1 \\Rightarrow n_2 = \\frac{\\sin\\theta_1}{\\sin\\theta_2}$.",
          ),
          L(
            `Divide los dos senos que te dan como dato.`,
            `Divide the two sines provided as data.`,
          ),
        ],
        answerDisplay: L(`$n_2 \\approx ${tok(n)}$`, `$n_2 \\approx ${tok(n)}$`),
        solution: [
          step(
            "given",
            `Del aire al medio: $\\theta_1 = ${pick.th1}^{\\circ}$, $\\theta_2 = ${pick.th2}^{\\circ}$, $n_1 = 1$; $\\text{sen}\\,\\theta_1 \\approx ${tok(pick.sin1)}$, $\\text{sen}\\,\\theta_2 \\approx ${tok(pick.sin2)}$`,
            `From air into the medium: $\\theta_1 = ${pick.th1}^{\\circ}$, $\\theta_2 = ${pick.th2}^{\\circ}$, $n_1 = 1$; $\\sin\\theta_1 \\approx ${tok(pick.sin1)}$, $\\sin\\theta_2 \\approx ${tok(pick.sin2)}$`,
          ),
          step(
            "approach",
            "Ley de Snell despejada para $n_2$ (con $n_1 = 1$): $n_2 = \\frac{\\text{sen}\\,\\theta_1}{\\text{sen}\\,\\theta_2}$.",
            "Snell's law solved for $n_2$ (with $n_1 = 1$): $n_2 = \\frac{\\sin\\theta_1}{\\sin\\theta_2}$.",
          ),
          step(
            "calculation",
            `$n_2 = \\frac{ ${tok(pick.sin1)}}{ ${tok(pick.sin2)}} = ${tok(n)}$`,
            `$n_2 = \\frac{ ${tok(pick.sin1)}}{ ${tok(pick.sin2)}} = ${tok(n)}$`,
          ),
          step(
            "result",
            `El índice de refracción del medio es $\\approx ${tok(n)}$, compatible con un vidrio.`,
            `The refractive index of the medium is $\\approx ${tok(n)}$, consistent with a glass.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Critical angle                                                   */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "opt-snell-03",
      subject: "physics",
      topicId: "optics",
      subtopicId: "refraction",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 210,
      tags: ["total-internal-reflection", "critical-angle"],
      prerequisites: ["snell"],
    },
    (rng) => {
      const pick = rng.pick([
        { n: 1.33, medEs: "agua", medEn: "water" },
        { n: 1.5, medEs: "vidrio", medEn: "glass" },
        { n: 2.42, medEs: "diamante", medEn: "diamond" },
        { n: 1.25, medEs: "un plástico", medEn: "a plastic" },
      ]);
      const thc = r1((Math.asin(1 / pick.n) * 180) / Math.PI);
      return {
        skill: L("Ángulo límite (reflexión total)", "Critical angle (total reflection)"),
        statement: L(
          `Un rayo viaja **dentro** del ${pick.medEs} ($n = ${tok(pick.n)}$) hacia la superficie de separación con el aire ($n = 1{,}0$). Calcula el ángulo límite a partir del cual se produce la reflexión total interna, en grados con una cifra decimal.`,
          `A ray travels **inside** ${pick.medEn} ($n = ${tok(pick.n)}$) toward the boundary with air ($n = 1.0$). Compute the critical angle beyond which total internal reflection occurs, in degrees to one decimal.`,
        ),
        answer: {
          kind: "numeric-unit",
          value: thc,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["°", "deg", "grados"],
          unitChoices: ["°", "deg", "rad"],
        },
        hints: [
          L(
            "En el ángulo límite, el rayo refractado sale justo rozando la superficie: $\\theta_2 = 90^{\\circ}$.",
            "At the critical angle the refracted ray emerges exactly along the surface: $\\theta_2 = 90^{\\circ}$.",
          ),
          L(
            "Con $n_2 = 1$: $n\\,\\text{sen}\\,\\theta_c = \\text{sen}\\,90^{\\circ} = 1$, así que $\\text{sen}\\,\\theta_c = \\frac{1}{n}$.",
            "With $n_2 = 1$: $n\\sin\\theta_c = \\sin 90^{\\circ} = 1$, so $\\sin\\theta_c = \\frac{1}{n}$.",
          ),
          L(
            `Calcula el arcoseno de $1/${tok(pick.n)}$ en grados.`,
            `Take the arcsine of $1/${tok(pick.n)}$ in degrees.`,
          ),
        ],
        answerDisplay: L(`$\\theta_c \\approx ${tok(thc)}^{\\circ}$`, `$\\theta_c \\approx ${tok(thc)}^{\\circ}$`),
        solution: [
          step(
            "given",
            `Rayo dentro del ${pick.medEs} hacia el aire: $n = ${tok(pick.n)}$, $n_{\\text{aire}} = 1{,}0$.`,
            `Ray inside ${pick.medEn} heading to air: $n = ${tok(pick.n)}$, $n_{\\text{air}} = 1.0$.`,
          ),
          step(
            "approach",
            "Condición del ángulo límite: $\\text{sen}\\,\\theta_c = \\frac{n_2}{n_1} = \\frac{1}{n}$ (rayo refractado a $90^{\\circ}$).",
            "Critical-angle condition: $\\sin\\theta_c = \\frac{n_2}{n_1} = \\frac{1}{n}$ (refracted ray at $90^{\\circ}$).",
          ),
          step(
            "calculation",
            `$\\text{sen}\\,\\theta_c = \\frac{1}{ ${tok(pick.n)}} = ${tok(r3(1 / pick.n))}$<br>$\\theta_c = \\text{arcosen}\\,(${tok(r3(1 / pick.n))}) \\approx ${tok(thc)}^{\\circ}$`,
            `$\\sin\\theta_c = \\frac{1}{ ${tok(pick.n)}} = ${tok(r3(1 / pick.n))}$<br>$\\theta_c = \\arcsin(${tok(r3(1 / pick.n))}) \\approx ${tok(thc)}^{\\circ}$`,
          ),
          step(
            "result",
            `El ángulo límite es $\\approx ${tok(thc)}^{\\circ}$: por encima de ese valor la luz no sale y se refleja totalmente dentro del medio.`,
            `The critical angle is $\\approx ${tok(thc)}^{\\circ}$: above it no light escapes and it is totally reflected inside the medium.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Image size from magnification (two-step)                         */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "opt-lens-03",
      subject: "physics",
      topicId: "optics",
      subtopicId: "lenses",
      difficulty: "hard",
      questionType: "numeric-unit",
      estimatedTimeSec: 240,
      tags: ["thin-lens", "magnification", "multi-step"],
      prerequisites: ["lenses"],
    },
    (rng) => {
      const pick = rng.pick([
        { f: 10, doCm: 30, h: 4 },
        { f: 10, doCm: 30, h: 6 },
        { f: 10, doCm: 15, h: 3 },
        { f: 10, doCm: 15, h: 2 },
        { f: 12, doCm: 24, h: 5 },
        { f: 20, doCm: 30, h: 2.5 },
        { f: 8, doCm: 24, h: 6 },
        { f: 6, doCm: 12, h: 4 },
        { f: 20, doCm: 60, h: 8 },
        { f: 5, doCm: 15, h: 4 },
      ]);
      const di = r1(1 / (1 / pick.f - 1 / pick.doCm));
      const m = r2(di / pick.doCm);
      const hImg = r1(m * pick.h);
      return {
        skill: L("Tamaño de la imagen (dos pasos)", "Image size (two steps)"),
        statement: L(
          `Un objeto de altura $h = ${tok(pick.h)}\\ \\text{cm}$ está a $${pick.doCm}\\ \\text{cm}$ de una lente convergente de distancia focal $f = ${pick.f}\\ \\text{cm}$. ¿Qué altura tiene la imagen? (en cm, 2 cifras significativas)`,
          `An object of height $h = ${tok(pick.h)}\\ \\text{cm}$ stands $${pick.doCm}\\ \\text{cm}$ from a converging lens of focal length $f = ${pick.f}\\ \\text{cm}$. What is the height of the image? (in cm, 2 significant figures)`,
        ),
        answer: {
          kind: "numeric-unit",
          value: hImg,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["cm"],
          unitChoices: ["cm", "m", "mm", "m^-1"],
        },
        hints: [
          L(
            "Dos pasos: primero la distancia imagen $d_i$ con la ecuación de la lente.",
            "Two steps: first the image distance $d_i$ from the lens equation.",
          ),
          L(
            "Después el aumento: $|m| = \\frac{d_i}{d_o}$, y la altura de la imagen es $h' = |m|\\,h$.",
            "Then the magnification: $|m| = \\frac{d_i}{d_o}$, and the image height is $h' = |m|\\,h$.",
          ),
          L(
            "La imagen es real e invertida, pero se pregunta por su **altura** (valor positivo).",
            "The image is real and inverted, but the question asks for its **height** (a positive value).",
          ),
        ],
        answerDisplay: L(`$h' = ${tok(hImg)}\\ \\text{cm}$`, `$h' = ${tok(hImg)}\\ \\text{cm}$`),
        solution: [
          step(
            "given",
            `$f = ${pick.f}\\ \\text{cm}$, $d_o = ${pick.doCm}\\ \\text{cm}$, $h = ${tok(pick.h)}\\ \\text{cm}$`,
            `$f = ${pick.f}\\ \\text{cm}$, $d_o = ${pick.doCm}\\ \\text{cm}$, $h = ${tok(pick.h)}\\ \\text{cm}$`,
          ),
          step(
            "approach",
            "Paso 1: $\\frac{1}{f} = \\frac{1}{d_o} + \\frac{1}{d_i}$. Paso 2: $|m| = \\frac{d_i}{d_o}$ y $h' = |m|\\,h$.",
            "Step 1: $\\frac{1}{f} = \\frac{1}{d_o} + \\frac{1}{d_i}$. Step 2: $|m| = \\frac{d_i}{d_o}$ and $h' = |m|\\,h$.",
          ),
          step(
            "calculation",
            `**Paso 1:** $\\frac{1}{d_i} = \\frac{1}{${pick.f}} - \\frac{1}{${pick.doCm}} = \\frac{${pick.doCm - pick.f}}{${pick.f * pick.doCm}} \\Rightarrow d_i = \\frac{${pick.f * pick.doCm}}{${pick.doCm - pick.f}} = ${tok(di)}\\ \\text{cm}$<br>**Paso 2:** $|m| = \\frac{ ${tok(di)}}{${pick.doCm}} = ${tok(m)}$<br>$h' = ${tok(m)} \\cdot ${tok(pick.h)} = ${tok(hImg)}\\ \\text{cm}$`,
            `**Step 1:** $\\frac{1}{d_i} = \\frac{1}{${pick.f}} - \\frac{1}{${pick.doCm}} = \\frac{${pick.doCm - pick.f}}{${pick.f * pick.doCm}} \\Rightarrow d_i = \\frac{${pick.f * pick.doCm}}{${pick.doCm - pick.f}} = ${tok(di)}\\ \\text{cm}$<br>**Step 2:** $|m| = \\frac{ ${tok(di)}}{${pick.doCm}} = ${tok(m)}$<br>$h' = ${tok(m)} \\cdot ${tok(pick.h)} = ${tok(hImg)}\\ \\text{cm}$`,
          ),
          step(
            "result",
            `La imagen (real e invertida) mide $${tok(hImg)}\\ \\text{cm}$ de altura.`,
            `The image (real and inverted) is $${tok(hImg)}\\ \\text{cm}$ tall.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Challenge: object inside the focal length (signed di)            */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "opt-chal-01",
      subject: "physics",
      topicId: "optics",
      subtopicId: "image-formation",
      difficulty: "challenge",
      questionType: "numeric-unit",
      estimatedTimeSec: 300,
      tags: ["thin-lens", "virtual-image", "sign-convention"],
      prerequisites: ["lenses", "image-formation"],
    },
    (rng) => {
      const pick = rng.pick([
        { f: 10, doCm: 5 },
        { f: 12, doCm: 6 },
        { f: 20, doCm: 10 },
        { f: 15, doCm: 10 },
        { f: 10, doCm: 8 },
        { f: 6, doCm: 3 },
        { f: 30, doCm: 15 },
      ]);
      const di = r1(1 / (1 / pick.f - 1 / pick.doCm)); // negative
      const m = r2(-di / pick.doCm); // |m|, positive
      return {
        skill: L("Objeto dentro del foco: imagen virtual con signo", "Object inside the focus: signed virtual image"),
        statement: L(
          `Un objeto está a $${pick.doCm}\\ \\text{cm}$ de una lente convergente de distancia focal $f = ${pick.f}\\ \\text{cm}$, es decir, **más cerca que el foco**. Usa la ecuación de la lente delgada y da la distancia imagen **con signo** (negativa = imagen virtual, del mismo lado que el objeto), en cm y 2 cifras significativas.`,
          `An object is placed $${pick.doCm}\\ \\text{cm}$ from a converging lens of focal length $f = ${pick.f}\\ \\text{cm}$, i.e. **closer than the focus**. Use the thin-lens equation and give the image distance **with its sign** (negative = virtual image, on the object's side), in cm and 2 significant figures.`,
        ),
        answer: {
          kind: "numeric-unit",
          value: di,
          tolerance: { mode: "sigfig", value: 2 },
          units: ["cm"],
          unitChoices: ["cm", "m", "mm", "m^-1"],
        },
        hints: [
          L(
            "Aunque el objeto esté dentro del foco, la ecuación es la misma: $\\frac{1}{f} = \\frac{1}{d_o} + \\frac{1}{d_i}$.",
            "Even with the object inside the focus, the equation is the same: $\\frac{1}{f} = \\frac{1}{d_o} + \\frac{1}{d_i}$.",
          ),
          L(
            `Calcula $\\frac{1}{d_i} = \\frac{1}{f} - \\frac{1}{d_o}$: como $d_o < f$, este número saldrá **negativo**.`,
            `Compute $\\frac{1}{d_i} = \\frac{1}{f} - \\frac{1}{d_o}$: since $d_o < f$, this number will come out **negative**.`,
          ),
          L(
            "Un $d_i$ negativo significa imagen virtual; el aumento es $|m| = |d_i|/d_o$.",
            "A negative $d_i$ means a virtual image; the magnification is $|m| = |d_i|/d_o$.",
          ),
        ],
        answerDisplay: L(
          `$d_i = ${tok(di)}\\ \\text{cm}$ (imagen virtual)`,
          `$d_i = ${tok(di)}\\ \\text{cm}$ (virtual image)`,
        ),
        solution: [
          step(
            "given",
            `$f = ${pick.f}\\ \\text{cm}$, $d_o = ${pick.doCm}\\ \\text{cm} < f$ (objeto dentro del foco).`,
            `$f = ${pick.f}\\ \\text{cm}$, $d_o = ${pick.doCm}\\ \\text{cm} < f$ (object inside the focus).`,
          ),
          step(
            "approach",
            "Ecuación de la lente delgada; el signo de $d_i$ informa de si la imagen es real (positiva) o virtual (negativa).",
            "Thin-lens equation; the sign of $d_i$ tells whether the image is real (positive) or virtual (negative).",
          ),
          step(
            "calculation",
            `$\\frac{1}{d_i} = \\frac{1}{${pick.f}} - \\frac{1}{${pick.doCm}} = \\frac{${pick.doCm} - ${pick.f}}{${pick.f}\\cdot${pick.doCm}} = \\frac{${pick.doCm - pick.f}}{${pick.f * pick.doCm}}$<br>$d_i = \\frac{${pick.f * pick.doCm}}{${pick.doCm - pick.f}} = ${tok(di)}\\ \\text{cm}$ (negativa)<br>$|m| = \\frac{|d_i|}{d_o} = ${tok(m)}$ → imagen derecha y ${m >= 1 ? "aumentada" : "reducida"}.`,
            `$\\frac{1}{d_i} = \\frac{1}{${pick.f}} - \\frac{1}{${pick.doCm}} = \\frac{${pick.doCm} - ${pick.f}}{${pick.f}\\cdot${pick.doCm}} = \\frac{${pick.doCm - pick.f}}{${pick.f * pick.doCm}}$<br>$d_i = \\frac{${pick.f * pick.doCm}}{${pick.doCm - pick.f}} = ${tok(di)}\\ \\text{cm}$ (negative)<br>$|m| = \\frac{|d_i|}{d_o} = ${tok(m)}$ → upright and ${m >= 1 ? "magnified" : "reduced"} image.`,
          ),
          step(
            "result",
            `La imagen es virtual: se forma a $${tok(di)}\\ \\text{cm}$, del mismo lado que el objeto, derecha y $${tok(m)}\\times$ el tamaño del objeto (efecto lupa).`,
            `The image is virtual: it forms at $${tok(di)}\\ \\text{cm}$ on the object's side, upright and $${tok(m)}\\times$ the size of the object (magnifying-glass effect).`,
          ),
        ],
      };
    },
  ),
];
