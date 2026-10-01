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
  },
  {
    id: "fcnm-fundamentos",
    title: "Fundamentos de Matemáticas para Bachillerato (3.ª ed., 2017, 845 págs.)",
    origin:
      "FCNM — Facultad de Ciencias Naturales y Matemáticas (ESPOL) y universidades colaboradoras",
    kind: "textbook",
    language: "es",
    license: "REQUIRES_REVIEW",
    use: "Reference only: alignment of the Spanish bachillerato syllabus (álg. básica → precalc) and source of Foundation/Standard ideas. Commercial-style academic publication (© 2017): no verbatim import without the tutor's clearance.",
    topics: ["álgebra", "funciones", "trigonometría", "geometría analítica"],
    level: "Bachillerato (ECU), clases de repaso",
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
  },
];

export function sourceById(id: string): SourceRecord | undefined {
  return SOURCES.find((s) => s.id === id);
}
