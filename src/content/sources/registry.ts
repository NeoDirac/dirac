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
    id: "uees-tarea-parcial1",
    title:
      "EJERCICIOS DE REPASO 1ER PARCIAL MATEMATICAS I — Tarea UEES (DOCX con capturas de libros de texto)",
    origin:
      "Tarea compilada por el tutor (Sebastián Calderón) para la preparación del 1er parcial de Matemáticas I (UEES); la mayoría de los ejercicios llegan como capturas de pantalla de libros de texto tipo Haeussler/Demidovich, subida el 2026-10-17",
    kind: "problem-collection",
    language: "es",
    license: "INSTRUCTOR_CREATED",
    use:
      "Tutor's own compiled assignment; he supplied the document and directs its incorporation. 17 numbered sections (productos notables → funciones cuadráticas) covering the whole first-partial syllabus. NO printed answer key exists: every answer was derived and double-verified with sympy BEFORE import (download/verify_repaso1.py, 417 checks, run to 0 FAIL; statements re-read visually from the DOCX pages rendered to PDF because the exercises are embedded as images — download/repaso1.pdf + VLM transcriptions of the 19 pages). FIRST IMPORT ROUND (2026-10-17), tutor's brief: «Quiero que se carguen todos estos ejercicios a la página»: 260 templates across 8 content files (62+48+38+26+31+25+30 by wave; S3 #20 excluded as flawed, S13 #3-#6/#39/#40 excluded pending graph-option UI). Notable verifications and decisions: S1 #39 — the y-terms cancel, (x+y+2)(3x+2y−4) = 3x²+5xy+2y²+2x−8 with NO y term; S3 #18 — the correct reading is profit ≥ 15% of fixed costs ON TOP of all costs (4x = 46000 → x = 11500, printed option d); S3 #20 EXCLUDED as flawed: the statement admits TWO valid answers (a = 125 with b = 100 AND a = 150 with b = 125 — both satisfy every printed condition and both appear among the printed options); S4 #46 over ℝ keeps only ±√5 (the ±i√2 branch is rejected, textbook convention); S7 #21 and #22 are the same sum in disguise (both 295425 — Σ k², k = 51..100 = Σ (k+50)², k = 1..50); S7 #24 exact value 13233/2500 = 5.2932; S11 #10 (f∘f)(x) = x⁴+4x³+4x²−2 (the tempting x²(x+2)² is wrong — caught by the sympy gate); S17 #19 vertex (+1/2, −17/4) (a hand-derivation slip caught by the gate); S17 #30 non-integer vertex q* = 8500/9 ≈ 944.4 with R* = 7225/18 ≈ 401.39. EXCLUDED for UI capability (same pending graph-option UI as ESPOL Ch.4 #16): S13 #3-#6 (leer gráficas, estimar f(0)…) and #39/#40 (cuáles gráficas son funciones / uno a uno). New curriculum scaffolding: linear-equations/applications (break-even, pricing, interest word problems) and functions/multivariable (S14). This worksheet also backs the EXAM MODE feature (src/content/exams/profiles.ts — Pedro's 1er-parcial profile with 17 temas and A/B versions drawing the most difficult item per tema).",
    topics: [
      "productos notables",
      "factorización",
      "ecuaciones lineales",
      "ecuaciones cuadráticas",
      "desigualdades",
      "valor absoluto",
      "sumatorias",
      "funciones",
      "recta",
      "funciones cuadráticas",
    ],
    level: "Primer año universitario (Matemáticas I)",
    short: l10n("Tarea UEES · 1er parcial", "UEES assignment · 1st partial"),
  },
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
    use: "Direct incorporation with 'Recopilación del autor' attribution, per the tutor's instruction ('si te doy yo los ejercicios esos son ejercicios reales que puedes poner como recopilación del autor'). 18 systems of 3 linear equations by Gauss (G1–G18: 11 unique solution, 4 underdetermined with 1 parameter, 2 inconsistent) → systems/gauss (new subtopic); 9 word problems (A1–A9: saffron, percentage discounts, farmland, prefab houses, hotel, student, stadium, university bar, fritters) → systems/applications. Every answer independently re-derived with sympy before import (28 checks). G17: the tutor's key listed 'incompatible', but the system has the unique solution (2, 2, 0) — verified three ways (sympy, det = 2 ≠ 0, direct substitution) and shipped with the verified answer; flagged to the tutor for confirmation against his source. A8 (bar) is intentionally indeterminate (rank 2) — its answer is the justification itself. SECOND BATCH (2026-10-05): the tutor's LaTeX sheet on inequalities and absolute value (35 unique items, sections A–E with his answer key, every answer verified with sympy — download/verify_author_round2.py, 39/39 checks): A1–A5 fractional inequalities (several with |·| in numerator/denominator) + D22 parametric (x−a)/(x−2) ≤ 0 → rational/inequalities; B6–B10 absolute-value equations (incl. |x²−3x| = 2x−1 with the RHS≥0 spurious-root filter) and C11–C20 + D23–D27 absolute-value inequalities (incl. the ∅ system D23 and |x−1|+|x+1| < x²−1 → D27) → linear-equations abs subtopics; E21 + variations 21.1–21.8 «positiva para todo x» parametric quadratics (three ∅ cases, two degenerate leading-coefficient collapses) → quadratics/discriminant. D27 note: the tutor's key (−∞,−1−√2)∪(1+√2,∞) is correct and was confirmed by the sympy membership sweep after an initial mis-transcription on our side was caught by the gate.",
    topics: [
      "sistemas de ecuaciones",
      "método de Gauss",
      "problemas de aplicación",
      "desigualdades",
      "valor absoluto",
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
    use: "Registered 2026-10-02 (tutor uploaded it to the sources Drive): digital edition with a NATIVE text layer — unlike the scanned edition (fcnm-fundamentos), statements extract reliably with no OCR damage. Page numbering differs from the scanned edition: always cite THIS edition for anything imported from it. Persisted at /home/z/espol-book/espol-digital.pdf. FIRST IMPORT ROUND (2026-10-03): Chapter 2 'Ejercicios propuestos' (printed pp. 225-250 = PDF 258-283), tutor's brief: 'extrae los que consideres más difíciles o los más integradores'. 41 curated templates selected; every answer double-verified (printed key pp. 938-939 + independent sympy). Notable: #82 — printed key lists only k=9/4, but the complete answer is k ∈ {0, 9/4} (k=0 makes it linear with a unique solution); shipped with the verified answer, key error flagged to the tutor. #77a and #151 have no printed key — sympy-only verification. Key items deliberately excluded in round 1 (chapter sections without a curriculum home or non-reproducible keys): #46/#57/#127/#144 (key vs. derivation mismatch), §2.10 induction proofs (no proof-format UI), §2.11 counting, §2.12 binomial theorem — available for future rounds. SECOND IMPORT ROUND (2026-10-04), tutor's instructions: «el 2.9 debe ir y el 2.12 también» + «vayas a por los ejercicios del cap 3»: (a) §2.9 «Inecuaciones» #85–#94h complete minus the proofs #95–#100 (proof-format UI still missing) — 16 templates; the text layer had lost the absolute-value bars on #93c (|(x−3)/(x−4)| < 5/2), recovered visually against the printed page and confirmed against the printed key; (b) §2.12 «Teorema del binomio» #116–#124 — 8 templates into the NEW subtopic polynomials/binomial-theorem; #117b and #121 have no printed key (sympy-only); (c) Chapter 3 «Funciones de variable real» (printed pp. 367-396 = PDF 400-429), most difficult/integrative items — 43 templates across functions (domains, NEW subtopic even-odd, piecewise ranges, composition incl. the piecewise f∘g #61, inverses), poly-functions (modeling: rent, break-even, palm-oil tank with units), quadratics (Vieta product=sum, |quadratic| symmetry, vertex form, profit maximization, supply-demand equilibrium), polynomials (remainder-theorem systems, 4th-degree construction), rational (NEW subtopic asymptotes incl. the hole-vs-asymptote cancellation trap #24a) and the exponential/logarithmic equation banks (incl. variable-base log inequalities #137a/#137d). Statements re-verified visually (VLM) on the printed pages where the text layer lost radicals/fraction bars (#5e, #7, #8, #14, #61, #65, #66, #79, #85, #93c). Every answer double-verified (printed key pp. 938-940 + sympy, download/verify_espol_ch3.py, 69/69 checks). Still available for future rounds: §2.9 proofs #95–#100, §2.10–2.11, Ch. 3 #30 (piecewise evaluation TF — text/key mismatch under review), #59/#60 (operations on piecewise), #72–#74 (sgn/µ special functions), #98 (root-doubling), #102, #107, #115a/c/d, #118b–f, #120b–e, #122, #131a–d/f–i, #132, #135, #136, Ch. 4+ (trigonometry). THIRD IMPORT ROUND (2026-10-05), tutor's brief: «Y también más logaritmos y lo de trigonometría»: (a) §3.14 remaining logarithm material — 13 templates into logarithmic.ts (118b/c/g simplification towers incl. the 81^{1/log₅3} = 5⁴ chain, 120b change-of-base in parameters, 131a–d/f/i equation sets incl. the variable-base triple 131i {1, 4, √2/2} and the t-substitution 131f {1/2, 1/4}, 132 t − 1/t = 3/2 with sum 33/16, 135 sgn(ln||x|−1|) = −1, 136 piecewise f⁻¹(−1) evaluation ln 9 − 2e⁻² − 2); 131b note: over the full natural domain x = 1−e is also a solution (sympy solveset) — the statement pins the x > 1 branch to keep the printed key {1+e} exact; flagged as a possible book erratum. (b) Chapter 4 «Trigonometría» (exercises printed pp. 467-475 = PDF 500-507, key pp. 940-941 = PDF 973-974), most difficult/integrative items — 46 templates across the four trig topics: trig-foundations 13 (angle word problems #10-12, exact-value medleys #13b-f and #14c-e, cos π/12 #25, tan 19π/12 #30), trig-functions 27 (sinusoidal modeling #15/#17/#19 incl. the Tahiti tide graph rendered as a live function-graph diagram, inverse-trig family #20-#22d, harmonic form R·cos(x−α) #48a-b, identity recognition #24/#26-29/#36, quadrant-aware compositions #37/#38/#40/#42, product chains #33a/f incl. ∏cos(2ᵏπ/65) = 1/64), trig-equations 6 (#45-#47, #48d, #49, #50). Statements re-verified visually (VLM, 200 dpi) where the text layer lost radicals/fraction bars/minus signs (#13 family, #19 graph values, #20, #22, #25/#26 options, #28's radical, #33 family, #48's √3 coefficient); every answer double-verified (printed key + sympy, download/verify_espol_ch4.py, 88/88 checks). KEY ERRATUM FOUND AND DOCUMENTED: #48d — the printed key says 7π/12, which lies OUTSIDE the function's declared domain [0, π/2]; the verified answer π/12 ships with the errata flagged in the item (house precedent: round-1 #82, G17). DUPLICATES NOTE: #24 and #33f overlap §5.5 · 49a/49b from the SCANNED edition (trigf-espol-49a/49b, imported earlier): both kept — the digital-edition versions carry the book's printed options; de-duplication left to the tutor. Still available for future rounds: Ch. 4 graph-image MC #16 (needs graph-option UI), drawing tasks #18, proofs #34/#35/#43, #31 composition (needs piecewise-option UI), plus all previously catalogued Ch. 2-3 remainders. FOURTH IMPORT ROUND (2026-10-05, later), tutor's brief: «si, prosigue con matrices y sistemas»: Chapter 5 «Matrices y Sistemas de Ecuaciones e Inecuaciones» (exercises printed pp. 539-554 = PDF 572-587; key printed pp. 941-942 = PDF 974-975, INTERLEAVED with the ch4/ch6 keys — full blocks must be read). CRITICAL extraction finding: the PDF text layer outputs matrix elements COLUMN-MAJOR (pinned: #13's A printed «3 4 2 3» is [[3,2],[4,3]], proven by the key's AD = [[52,65,5],[73,90,10]]) — every matrix was re-read visually (VLM, 200 dpi) and/or pinned by exact key agreement. 66 new templates (60 curated + 6 generated easy): NEW topic matrices (40 templates: §5.1 operations/equations/inverse #1/3a/3bc/3d/4/5a/8a/10/12/13/15/17/18/48/50/53 + §5.2 determinants #19/22b/22d/25/27/30/31/32/33/34/36/39/41a/41c/42/46 — 34 curated — plus a 6-template generated EASY tier per content policy so the topic has a warm-up level) and systems +26 (§5.3 parameters/gauss #47a-c/50/54/57/58/61a/61b/62; §5.4 nonlinear NEW subtopic #66a/b/d/f/g/h/i + #67a/b; applications #68/69/70; §5.5-5.6 inequalities NEW subtopic #72a/73/76/80/81). Every answer double-verified (printed key + sympy, download/verify_espol_ch5.py, 81/81 checks). KEY ERRATA found and documented in-item: #15 (the key lists only ±I but FOUR diagonal 2×2 matrices coincide with their inverse), #62 (printed key ±7/2 is wrong — at a = 7/2 the determinant is −35/2 ≠ 0 so a unique solution exists; verified answer ±√14/2 shipped), #66f (key lists only (4,2); the complete set is {(2,4),(4,2)} — shipped complete). DROPPED as unrecoverable (documented in the verify script): #21 (k-triangular matrices unreadable), #44 and #45 (transformed-determinant arrangements that no reading reproduces), #49 (3A+2B/A−B matrices not pinnable), #52 (statement/key irreconcilable: det = −λ²+3λ+1 gives (3±√13)/2 vs key (1±√3)/2), #60 (A = B statement inconsistent with key), #63 (flawed key), #67c (complete solution set on (0,2π) is FOUR pairs — key lists two; also #67d/e/f keys incomplete), #26 (log-determinant matrix unreadable). Note: the book's «log» is base 10 (pinned by the #66g/#66i keys). Still available for future rounds: §5.1 #2/6/7/9/11/14/16, §5.2 #20/23/24/28/29/35/37/38/40/43, §5.3 #46/49/51/52/55/59/63/64/65, §5.4 #66c/e #67d-f #71, §5.5 #74/75 (graph UI), Chapter 6 «Números Complejos» (PDF 588+) awaits the tutor's go-ahead.",
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
