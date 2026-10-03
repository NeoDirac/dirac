/**
 * Source registry — the audited inventory of every origin the problem bank
 * draws from (Phase 1 of the content-quality program; see
 * docs/source-inventory.md for the full audit).
 *
 * Rules of engagement (agreed with the tutor):
 * - Real source problems are preferred over generated variants.
 * - A curated problem keeps `source` on its template and is transcribed
 *   as printed (no parameter changes without a documented reason).
 * - REQUIRES_REVIEW sources are usable internally for classification and
 *   problem design only — never republished verbatim.
 * - Every curated problem is verified programmatically before it ships
 *   (scripts/validate-bank.ts + /tmp audit).
 */

import type { SourceLicense } from "@/lib/types";
import { l10n } from "@/lib/types";

export interface SourceRecord {
  id: string;
  title: string;
  /** author / institution as printed */
  origin: string;
  kind: "exam" | "problem-collection" | "textbook" | "class-sheet" | "framework";
  language: "de" | "es" | "en";
  /** classification that governs reuse of this source */
  license: SourceLicense;
  /** what the bank may take from it */
  use: string;
  /** topics it covers (keywords for curation) */
  topics: string[];
  level: string;
  /** compact bilingual label for the source badge shown on problems */
  short: { es: string; en: string };
}

export const SOURCES: SourceRecord[] = [
  {
    id: "tutor-fp-sheet-2024",
    title:
      "Hoja de problemas de valor absoluto (Feststellungsprüfung) + soluciones trabajadas en clase",
    origin: "Material de clase del tutor (FP-Vorbereitung, Mathematik)",
    kind: "class-sheet",
    language: "de",
    license: "INSTRUCTOR_CREATED",
    use: "Direct incorporation: three absolute-value problems (two-abs equations, piecewise |a|−|b| vs constant/line, |·| vs parabola) with the tutor's own worked case analyses.",
    topics: ["valor absoluto", "ecuaciones", "desigualdades", "gráficas", "parábolas"],
    level: "Bachillerato avanzado / Studienkolleg (FSP)",
    short: l10n("Hoja de clase del tutor", "Tutor's class sheet"),
  },
  {
    id: "tutor-kurzkontrolle-1",
    title: "Kurzkontrolle 1 (conjuntos, Venn, raíces reales)",
    origin: "Material de clase del tutor (Studienkolleg-Vorbereitung)",
    kind: "class-sheet",
    language: "de",
    license: "INSTRUCTOR_CREATED",
    use: "Direct incorporation: real-solution-set problem (x+2)(x−5)(x²+9)(x²−25)=0; 3-set Venn survey problem; set operations. Remaining items pending verification pass.",
    topics: ["conjuntos", "ecuaciones polinómicas", "soluciones reales"],
    level: "Bachillerato avanzado / Studienkolleg",
    short: l10n("Kurzkontrolle del tutor", "Tutor's short quiz"),
  },
  {
    id: "stk-bayern-ubung",
    title:
      "Übungsaufgaben zur Vorbereitung auf den Mathematiktest (Stand Jan 18) — 23 páginas con soluciones",
    origin: "Studienkolleg bei den Universitäten des Freistaates Bayern",
    kind: "problem-collection",
    language: "de",
    license: "OPEN_LICENSE",
    use: "Direct incorporation with attribution (official public exam-prep document). Parameter/discriminant problems, polynomial division with answers, root equations, log equations. Item '5' (rational inequality) flagged: printed solution contradicts independent re-derivation — quarantined for manual review.",
    topics: [
      "polinomios",
      "ecuaciones cuadráticas",
      "desigualdades",
      "logaritmos",
      "trigonometría",
      "geometría",
    ],
    level: "Studienkolleg (G-Kurs) / FOS-BOS",
    short: l10n("Übungsaufgaben Bayern", "Bayern prep collection"),
  },
  {
    id: "fos-bos-2010-ht",
    title: "Feststellungsprüfung Mathematik FOS/BOS 2010 — Haupttermin (con soluciones)",
    origin: "Examen estatal FOS/BOS (distribución oficial de preparación)",
    kind: "exam",
    language: "de",
    license: "OPEN_LICENSE",
    use: "Direct incorporation with attribution: term rewriting with domain, vertex/position of a point vs parabola, line∩parabola, LGS, hemisphere cross-section, cloverleaf area.",
    topics: ["fracciones algebraicas", "rectas y parábolas", "sistemas", "geometría"],
    level: "FOS/BOS (Bachillerato avanzado)",
    short: l10n("Examen FOS/BOS 2010", "FOS/BOS 2010 exam"),
  },
  {
    id: "fos-bos-2011",
    title: "Feststellungsprüfung Mathematik FOS/BOS 2011 (escaneado, con Lösungsvorschlag)",
    origin: "Examen estatal FOS/BOS (distribución oficial de preparación)",
    kind: "exam",
    language: "de",
    license: "OPEN_LICENSE",
    use: "Direct incorporation after OCR verification: rational simplification with domain, parabola roots/vertex, LGS, wahr/falsch statements about lines. Scanned — every transcribed item needs the programmatic check before import.",
    topics: ["fracciones algebraicas", "parábolas", "sistemas", "geometría (Kleeblatt)"],
    level: "FOS/BOS (Bachillerato avanzado)",
    short: l10n("Examen FOS/BOS 2011", "FOS/BOS 2011 exam"),
  },
  {
    id: "stk-fsp-2020",
    title:
      "Schriftliche Feststellungsprüfung Mathematik 27.01.2020 (180 min: cálculo, álgebra lineal, geometría 3D)",
    origin: "Studienkolleg (examen oficial)",
    kind: "exam",
    language: "de",
    license: "OPEN_LICENSE",
    use: "Reference for the top tier. Out of current curriculum scope (límites, series, Taylor, integrales, autovalores, proyecciones): requires new precalculus→calculus topics before import. Registered now for the expansion plan.",
    topics: ["límites", "series", "integrales", "Taylor", "álgebra lineal", "geometría 3D"],
    level: "Studienkolleg T-Kurs (primer semestre universitario)",
    short: l10n("FSP 2020 (referencia)", "FSP 2020 (reference)"),
  },
  {
    id: "fcnm-fundamentos",
    title: "Fundamentos de Matemáticas para Bachillerato (3.ª ed., 2017, 845 págs.)",
    origin:
      "FCNM — Facultad de Ciencias Naturales y Matemáticas (ESPOL) y universidades colaboradoras",
    kind: "textbook",
    language: "es",
    license: "TUTOR_LICENSED",
    use: "Direct incorporation with attribution. The tutor explicitly authorized full use of this book's exercises on the platform (statement of 2026-10-01: 'tengo total permiso para usar los ejercicios del libro de la ESPOL'; the tutor assumes responsibility for the authorization). Curated transcriptions must still pass independent programmatic verification before import. Spanish-language source aligned with the Ecuadorian bachillerato syllabus (álgebra básica → precalc).",
    topics: ["álgebra", "funciones", "trigonometría", "geometría analítica", "desigualdades", "logaritmos"],
    level: "Bachillerato (ECU), clases de repaso",
    short: l10n("Fundamentos ESPOL", "ESPOL Fundamentals"),
  },
  {
    id: "alumna-worksheet-2025",
    title:
      "Übungsblatt Mathematik — Ausklammern, fracciones algebraicas y potencias + problema de Venn (Marmelade/Honig/Nutella)",
    origin:
      "Hoja de ejercicios del curso alemán de la alumna (fotos compartidas por el tutor, oct. 2025)",
    kind: "class-sheet",
    language: "de",
    license: "TUTOR_LICENSED",
    use: "Direct incorporation: the tutor passed photos of his student's worksheet and asked for it on the site (statement of 2026-10-02: 'te comparto unas fotos que me pasó mi alumna hoy para revisar, que eso esté en la página'). The tutor's own transcription is the ground truth ('te pasé las imagenes ya transcribidas'). Sección 1 (ausklammern con exponentes con variable) → polynomials/factoring; Sección 2 (simplificar fracciones algebraicas) → rational/simplifying; Sección 3 (Anwendung: productos y cocientes con exponentes negativos) → foundations/powers; problema de Venn (encuesta mermelada/miel/Nutella) → foundations/venn-diagrams. Every answer independently re-derived with sympy before import (23/23 checks, incl. three corrections to the first mental pass). One clarification added to the Venn statement for well-posedness — 'every surveyed person likes at least one of the three foods' — documented inside each affected solution.",
    topics: [
      "factorización",
      "fracciones algebraicas",
      "leyes de exponentes",
      "conjuntos",
      "diagramas de Venn",
    ],
    level: "Secundaria superior alemana / transición Studienkolleg",
    short: l10n("Hoja de la alumna (DE)", "Student's worksheet (DE)"),
  },
  {
    id: "autor-recopilacion-2025",
    title:
      "Recopilación del autor — sistemas 3×3 por Gauss y problemas de aplicación",
    origin:
      "Recopilación propia del tutor (Sebastián Calderón), compartida el 2026-10-02 con su clave de soluciones",
    kind: "problem-collection",
    language: "es",
    license: "INSTRUCTOR_CREATED",
    use: "Direct incorporation with 'Recopilación del autor' attribution, per the tutor's instruction ('si te doy yo los ejercicios esos son ejercicios reales que puedes poner como recopilación del autor'). 18 systems of 3 linear equations by Gauss (G1–G18: 11 unique solution, 4 underdetermined with 1 parameter, 2 inconsistent) → systems/gauss (new subtopic); 9 word problems (A1–A9: saffron, percentage discounts, farmland, prefab houses, hotel, student, stadium, university bar, fritters) → systems/applications. Every answer independently re-derived with sympy before import (28 checks). G17: the tutor's key listed 'incompatible', but the system has the unique solution (2, 2, 0) — verified three ways (sympy, det = 2 ≠ 0, direct substitution) and shipped with the verified answer; flagged to the tutor for confirmation against his source. A8 (bar) is intentionally indeterminate (rank 2) — its answer is the justification itself.",
    topics: [
      "sistemas de ecuaciones",
      "método de Gauss",
      "problemas de aplicación",
      "álgebra lineal",
    ],
    level: "Bachillerato / primer año universitario",
    short: l10n("Recopilación del autor", "Author's compilation"),
  },
  {
    id: "fcnm-fundamentos-digital",
    title:
      "Fundamentos de Matemáticas para Bachillerato — edición digital (texto nativo, 982 págs.)",
    origin: "FCNM · Escuela Superior Politécnica del Litoral (edición anterior a la impresa de 2017)",
    kind: "textbook",
    language: "es",
    license: "TUTOR_LICENSED",
    use: "Registered 2026-10-02 (tutor uploaded it to the sources Drive): digital edition with a NATIVE text layer — unlike the scanned edition (fcnm-fundamentos), statements extract reliably with no OCR damage. Page numbering differs from the scanned edition: always cite THIS edition for anything imported from it. Persisted at /home/z/espol-book/espol-digital.pdf. FIRST IMPORT ROUND (2026-10-03): Chapter 2 'Ejercicios propuestos' (printed pp. 225-250 = PDF 258-283), tutor's brief: 'extrae los que consideres más difíciles o los más integradores'. 41 curated templates selected; every answer double-verified (printed key pp. 938-939 + independent sympy). Notable: #82 — printed key lists only k=9/4, but the complete answer is k ∈ {0, 9/4} (k=0 makes it linear with a unique solution); shipped with the verified answer, key error flagged to the tutor. #77a and #151 have no printed key — sympy-only verification. Key items deliberately excluded in round 1 (chapter sections without a curriculum home or non-reproducible keys): #46/#57/#127/#144 (key vs. derivation mismatch), §2.10 induction proofs (no proof-format UI), §2.11 counting, §2.12 binomial theorem — available for future rounds. SECOND IMPORT ROUND (2026-10-04), tutor's instructions: «el 2.9 debe ir y el 2.12 también» + «vayas a por los ejercicios del cap 3»: (a) §2.9 «Inecuaciones» #85–#94h complete minus the proofs #95–#100 (proof-format UI still missing) — 16 templates; the text layer had lost the absolute-value bars on #93c (|(x−3)/(x−4)| < 5/2), recovered visually against the printed page and confirmed against the printed key; (b) §2.12 «Teorema del binomio» #116–#124 — 8 templates into the NEW subtopic polynomials/binomial-theorem; #117b and #121 have no printed key (sympy-only); (c) Chapter 3 «Funciones de variable real» (printed pp. 367-396 = PDF 400-429), most difficult/integrative items — 43 templates across functions (domains, NEW subtopic even-odd, piecewise ranges, composition incl. the piecewise f∘g #61, inverses), poly-functions (modeling: rent, break-even, palm-oil tank with units), quadratics (Vieta product=sum, |quadratic| symmetry, vertex form, profit maximization, supply-demand equilibrium), polynomials (remainder-theorem systems, 4th-degree construction), rational (NEW subtopic asymptotes incl. the hole-vs-asymptote cancellation trap #24a) and the exponential/logarithmic equation banks (incl. variable-base log inequalities #137a/#137d). Statements re-verified visually (VLM) on the printed pages where the text layer lost radicals/fraction bars (#5e, #7, #8, #14, #61, #65, #66, #79, #85, #93c). Every answer double-verified (printed key pp. 938-940 + sympy, download/verify_espol_ch3.py, 69/69 checks). Still available for future rounds: §2.9 proofs #95–#100, §2.10–2.11, Ch. 3 #30 (piecewise evaluation TF — text/key mismatch under review), #59/#60 (operations on piecewise), #72–#74 (sgn/µ special functions), #98 (root-doubling), #102, #107, #115a/c/d, #118b–f, #120b–e, #122, #131a–d/f–i, #132, #135, #136, Ch. 4+ (trigonometry).",
    topics: [
      "álgebra",
      "factorización",
      "fracciones algebraicas",
      "ecuaciones",
      "valor absoluto",
      "radicales",
      "trigonometría",
      "funciones",
      "sistemas de ecuaciones",
      "sucesiones",
      "matrices",
    ],
    level: "Bachillerato ECU",
    short: l10n("Fundamentos ESPOL (digital)", "ESPOL Fundamentals (digital)"),
  },
  {
    id: "kompetenzprofil-physik",
    title: "Kompetenzprofile der Fächer — Physik, Kurs T und M",
    origin: "Studienkollegs in Deutschland (documento curricular oficial)",
    kind: "framework",
    language: "de",
    license: "OPEN_LICENSE",
    use: "Calibration only: defines the required physics competence level (model building, mathematisation) for the Studienkolleg audience. No problems to import.",
    topics: ["estándares de física"],
    level: "Studienkolleg T/M",
    short: l10n("Kompetenzprofil Physik", "Physics competence profile"),
  },
];

export function sourceById(id: string): SourceRecord | undefined {
  return SOURCES.find((s) => s.id === id);
}
