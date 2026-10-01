/**
 * Core domain types for the practice platform.
 *
 * The content pipeline is:
 *   ProblemTemplate (authored, in src/content/**)
 *     --generate(rng)-->  ProblemContent
 *     + template metadata --> Problem (fully instantiated, renderable)
 *
 * All student-facing strings are bilingual (es/en).
 * Numbers that should render with locale-aware decimal separators are written
 * inside content strings as {{value}} tokens; the MathText renderer resolves
 * them per active locale (see src/components/math/math-text.tsx).
 */

export type Locale = "es" | "en";

export type Subject = "math" | "physics";

export type Difficulty = "easy" | "medium" | "hard" | "challenge";

export type QuestionType =
  | "numeric"
  | "numeric-unit"
  | "expression"
  | "multiple-choice"
  | "text";

/** A value localized in Spanish and English. */
export interface L10n<T> {
  es: T;
  en: T;
}

export const l10n = <T>(es: T, en: T): L10n<T> => ({ es, en });

/* ------------------------------------------------------------------ */
/* Answers                                                             */
/* ------------------------------------------------------------------ */

export type ToleranceSpec =
  | { mode: "relative"; value: number }
  | { mode: "absolute"; value: number }
  /** value must be given already rounded to `value` significant figures */
  | { mode: "sigfig"; value: number };

export interface McOption {
  id: string;
  text: L10n<string>;
  correct: boolean;
}

export type AnswerSpec =
  | {
      kind: "numeric";
      value: number;
      tolerance?: ToleranceSpec;
      /** fixed unit shown as a suffix next to the input, e.g. "m" */
      unitSuffix?: string;
    }
  | {
      kind: "numeric-unit";
      value: number;
      tolerance?: ToleranceSpec;
      /** accepted unit spellings (first one is canonical for display) */
      units: string[];
      /** datalist suggestions for the unit input (may include distractors) */
      unitChoices?: string[];
    }
  | {
      kind: "expression";
      /** mathematically equivalent accepted expressions */
      accepted: string[];
      /** variables expected to appear, e.g. ["x"] */
      variables?: string[];
    }
  | {
      kind: "multiple-choice";
      options: McOption[];
    }
  | {
      kind: "text";
      /** accepted answers after normalization (trim, case-fold, spacing) */
      accepted: string[];
      caseSensitive?: boolean;
    };

/* ------------------------------------------------------------------ */
/* Diagrams (all rendered as parameterized SVG)                        */
/* ------------------------------------------------------------------ */

export type CurveColor = "primary" | "secondary" | "muted";

export interface FunctionGraphDiagram {
  kind: "function-graph";
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  /** expressions in x, parsed with the internal math parser, e.g. "2*x+1" */
  curves: {
    fn: string;
    color?: CurveColor;
    dashed?: boolean;
    label?: string;
  }[];
  points?: { x: number; y: number; label?: string }[];
  xLabel?: string;
  yLabel?: string;
  showGrid?: boolean;
}

export interface VectorsDiagram {
  kind: "vectors";
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  vectors: {
    x: number;
    y: number;
    label?: string;
    color?: CurveColor;
    /** tail position (defaults to origin) */
    from?: { x: number; y: number };
  }[];
  showComponents?: boolean;
  showGrid?: boolean;
  xLabel?: string;
  yLabel?: string;
}

export interface ProjectileDiagram {
  kind: "projectile";
  /** launch speed in m/s */
  v0: number;
  /** launch angle in degrees */
  angleDeg: number;
  /** initial height in m */
  h0?: number;
  /** gravity in m/s^2 (default 9.8) */
  g?: number;
  showAnnotations?: boolean;
}

export interface UnitCircleDiagram {
  kind: "unit-circle";
  angleDeg: number;
  /** show the (cos, sin) point label */
  showPoint?: boolean;
  /** custom label for the angle arc */
  angleLabel?: string;
}

export interface RightTriangleDiagram {
  kind: "right-triangle";
  /** side labels (LaTeX allowed), c is the hypotenuse */
  aLabel: string;
  bLabel: string;
  cLabel: string;
  /** label of the marked acute angle (bottom-right vertex) */
  angleLabel?: string;
}

export interface FreeBodyDiagram {
  kind: "free-body";
  /** incline angle in degrees; 0 = horizontal ground */
  inclineDeg?: number;
  massLabel?: string;
  /** force arrows from the block center, dx/dy give direction (auto-normalized) */
  forces: {
    label: string;
    dx: number;
    dy: number;
    color?: CurveColor;
  }[];
}

export interface CircuitDiagram {
  kind: "circuit";
  mode: "series" | "parallel";
  /** battery emf label drawn next to the battery, e.g. "12 V" */
  voltage: string;
  /** resistor labels, e.g. ["R₁ = 30 Ω", "R₂ = 60 Ω"] */
  resistors: string[];
  /** draw a small current-direction arrow on the loop */
  showCurrent?: boolean;
}

/** Two adjacent loops sharing a middle resistor branch (Kirchhoff practice). */
export interface TwoLoopCircuitDiagram {
  kind: "circuit-two-loop";
  /** left battery label, e.g. "ε₁ = 12 V" */
  emfLeft: string;
  /** right battery label, e.g. "ε₂ = 10 V" */
  emfRight: string;
  /** [R₁ top-left, R₂ middle branch, R₃ top-right] labels */
  resistors: [string, string, string];
  /** draw loop-current arrows I₁ and I₂ */
  showCurrents?: boolean;
}

export type DiagramSpec =
  | FunctionGraphDiagram
  | VectorsDiagram
  | ProjectileDiagram
  | UnitCircleDiagram
  | RightTriangleDiagram
  | FreeBodyDiagram
  | CircuitDiagram
  | TwoLoopCircuitDiagram;

/* ------------------------------------------------------------------ */
/* Worked solutions                                                    */
/* ------------------------------------------------------------------ */

export type SolutionStage = "given" | "approach" | "calculation" | "result";

export interface SolutionStep {
  stage: SolutionStage;
  /** LaTeX-enabled content; may use {{n}} number tokens and **bold** */
  content: L10n<string>;
}

/* ------------------------------------------------------------------ */
/* Problems                                                            */
/* ------------------------------------------------------------------ */

export interface ProblemContent {
  /** short "skill practiced" one-liner */
  skill: L10n<string>;
  /** problem statement; supports $...$, $$...$$, **bold**, {{number}} tokens */
  statement: L10n<string>;
  diagram?: DiagramSpec;
  /** accessible description of the diagram */
  diagramLabel?: L10n<string>;
  answer: AnswerSpec;
  /** 1–3 progressive hints; never contain the final answer */
  hints: L10n<string>[];
  /** how the final answer is displayed once revealed */
  answerDisplay: L10n<string>;
  /** staged worked solution (either an L10n object or a bare array —
   * steps are internally bilingual, so a bare array is accepted) */
  solution: L10n<SolutionStep[]> | SolutionStep[];
}

export interface Problem extends ProblemContent {
  templateId: string;
  seed: number;
  subject: Subject;
  topicId: string;
  subtopicId: string;
  difficulty: Difficulty;
  questionType: QuestionType;
  estimatedTimeSec: number;
  tags: string[];
  prerequisites: string[];
}

/** Resolves the per-locale solution steps (bare arrays are accepted). */
export function solutionSteps(
  problem: Pick<Problem, "solution">,
  locale: Locale,
): SolutionStep[] {
  return Array.isArray(problem.solution) ? problem.solution : problem.solution[locale];
}

/* ------------------------------------------------------------------ */
/* Provenance & reasoning taxonomy (content quality layer)             */
/* ------------------------------------------------------------------ */

/**
 * License classification for a source. Governs what may be published:
 * - INSTRUCTOR_CREATED: the tutor's own exams, sheets and worked notes.
 * - OPEN_LICENSE:        official exam documents an institution publishes
 *                        for public exam preparation (kept with attribution).
 * - PUBLIC_DOMAIN:       no known rights restrictions.
 * - REQUIRES_REVIEW:     commercial/ambiguous — usable internally as a
 *                        reference for classification and design only.
 */
export type SourceLicense =
  | "INSTRUCTOR_CREATED"
  | "OPEN_LICENSE"
  | "PUBLIC_DOMAIN"
  | "REQUIRES_REVIEW";

/** Per-problem pointer into a registered source (see src/content/sources). */
export interface SourceRef {
  /** key of a record in src/content/sources/registry.ts */
  sourceId: string;
  /** license classification the bank entry carries for THIS source */
  license: SourceLicense;
  /** exercise number/label as printed in the source ("5.4", "1.", …) */
  exerciseNumber?: string;
  /** page in the source document */
  page?: number;
}

/**
 * Intellectual process a problem demands — used for honest difficulty
 * classification (see src/content/DIFFICULTY.md) and future filtering.
 * Not a difficulty: a problem carries 1–2 of these.
 */
export type ReasoningType =
  | "case-analysis" // split the domain / several cases must be handled
  | "parameters" // find values of a parameter with a required behaviour
  | "spurious" // candidate solutions must be tested and discarded
  | "graphical" // reading/combining information from graphs
  | "multi-concept" // chains techniques from different topics
  | "modeling" // build the model before computing
  | "definition-hunting" // the key step is unpacking a definition
  | "estimation"; // bounds / orders of magnitude

export interface ProblemTemplate {
  id: string;
  subject: Subject;
  topicId: string;
  subtopicId: string;
  difficulty: Difficulty;
  questionType: QuestionType;
  estimatedTimeSec: number;
  tags: string[];
  prerequisites: string[];
  /** provenance: where this problem comes from (curated entries) */
  source?: SourceRef;
  /** dominant intellectual demand (curated entries) */
  reasoning?: ReasoningType;
  /** deterministic: same seed → same problem (locale-independent) */
  generate(rng: RngLike): ProblemContent;
}

/** Minimal RNG interface (implemented by src/lib/rng.ts, mocked in validation). */
export interface RngLike {
  next(): number;
}

/* ------------------------------------------------------------------ */
/* Sessions & progress                                                 */
/* ------------------------------------------------------------------ */

export type SessionMode = "topic" | "mixed" | "challenge" | "single";

export interface SessionConfig {
  mode: SessionMode;
  subjects: Subject[];
  topicId?: string;
  /** optional: restrict a topic session to a single subtopic */
  subtopicId?: string;
  difficulty: Difficulty | "any";
  /** 5 | 10 | 20 | Infinity (unlimited) */
  count: number;
  /** quick-practice weighting toward easy/medium problems */
  easyWeighted?: boolean;
  /** session seed — makes a session deep-linkable and reproducible */
  seed: number;
  /** single-problem mode: pin the deck to exactly this template */
  singleTemplateId?: string;
}

export interface ProblemRecord {
  templateId: string;
  seed: number;
  subject: Subject;
  topicId: string;
  subtopicId: string;
  difficulty: Difficulty;
  attempts: number;
  firstTryCorrect: boolean;
  eventualCorrect: boolean;
  hintsUsed: number;
  revealedAnswer: boolean;
  revealedSolution: boolean;
  /** ms epoch */
  timestamp: number;
  /** seconds spent on the problem before it was resolved (first resolve only;
   *  absent in records written before time tracking existed) */
  timeSec?: number;
}

export interface ProgressState {
  version: 1;
  records: ProblemRecord[];
}

/** One finished practice session — appended when a session ends, kept for the
 *  dashboard's session history. Self-contained so it survives schema growth. */
export interface SessionRecord {
  /** ms epoch of the moment the session ended */
  endedAt: number;
  /** session mode for label/badge rendering */
  mode: SessionConfig["mode"];
  subjects: Subject[];
  topicId?: string;
  subtopicId?: string;
  /** true when this record describes a retry of previously missed problems */
  review: boolean;
  problems: number;
  attempted: number;
  solved: number;
  firstTryCorrect: number;
  hintsUsed: number;
  /** total active seconds (absent in very old records) */
  elapsedSec?: number;
}

export interface SessionLogState {
  version: 1;
  sessions: SessionRecord[];
}
