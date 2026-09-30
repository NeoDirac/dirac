# Content Authoring Guide

How to add, edit or remove exercises in the question bank. No React knowledge
required — every problem is a structured TypeScript object in `src/content/`.

- **Validate as you go:** `bun run validate:content` (must exit with 0 errors)
- One file per topic: `src/content/<subject>/<topicId>.ts`
- Each file exports `templates: ProblemTemplate[]`

Reference exemplars (read these first!):

- `src/content/math/foundations.ts` — numeric/expression/MC types, parameterization
- `src/content/math/linear-equations.ts` — `text` type (intervals), function-graph diagram
- `src/content/physics/kinematics.ts` — unit answers, sig-fig tolerance, projectile/motion-graph diagrams
- `src/content/physics/measurement-vectors.ts` — vectors diagrams, degrees

## Anatomy of a problem

```ts
import { template, L, step, tok } from "@/lib/problem";
import type { ProblemTemplate, McOption } from "@/lib/types";

export const templates: ProblemTemplate[] = [
  template(
    {
      id: "sys-sub-01",            // unique, kebab-case, subject prefix
      subject: "math",
      topicId: "systems",          // must exist in src/content/curriculum/<subject>.ts
      subtopicId: "substitution",  // must exist in that topic's subtopics
      difficulty: "medium",        // easy | medium | hard | challenge
      questionType: "numeric",     // numeric | numeric-unit | expression | multiple-choice | text
      estimatedTimeSec: 120,
      tags: ["systems", "substitution"],
      prerequisites: ["linear-equations"],
    },
    (rng) => {
      // ---- variant parameters (deterministic per seed) ----
      const x = rng.nonZeroInt(-6, 6);
      const a = rng.nonZeroInt(2, 8);
      // ---- content (all student-facing strings bilingual) ----
      return {
        skill: L("Método de sustitución", "Substitution method"),
        statement: L(`Resuelve: ...`, `Solve: ...`),
        answer: { kind: "numeric", value: x },
        hints: [ L(...), L(...), L(...) ],        // 1–3 progressive hints
        answerDisplay: L(`$x = ${x}$`, `$x = ${x}$`),
        solution: [
          step("given", "...", "..."),
          step("approach", "...", "..."),
          step("calculation", "...", "..."),
          step("result", "...", "..."),
        ],
      };
    },
  ),
];
```

## Text conventions

Inside `statement`, `hints`, `answerDisplay`, `solution[].content`:

| Syntax | Renders as |
|---|---|
| `$...$` | inline LaTeX (KaTeX) — never shown raw |
| `$$...$$` | display (block) LaTeX |
| `**bold**` | **bold** |
| `<br>` or newline | line break |
| `tok(n)` → `{{n}}` | number rendered with `,` decimal in Spanish, `.` in English |

Rules:

- Write `$$` **only** when genuinely needed; prefer `$...$`.
- Percent: `$15\%$` (escape the `%` inside math).
- Decimal numbers that appear inside math: use `$${tok(v)}\ \text{m/s}$`
  (note the double `$` — one literal + one interpolation start).
- Integers may be interpolated directly: `$${a}x + ${b}$`.
- In Spanish strings write decimals in LaTeX with `{,}`: `$9{,}8$` when the
  number is literal (not a `tok`).
- Units inside math: `$5\ \text{m/s}$` (thin space + `\text{}`).

## Question types

```ts
// 1. numeric — free numeric input (accepts 2.5 / 2,5 / 3e8 / 3*10^8 / 3/4)
answer: { kind: "numeric", value: 42, tolerance?: { mode: "relative" | "absolute" | "sigfig", value: 0.02 } }
// default tolerance: integers exact, otherwise 1% relative

// 2. numeric-unit — value + unit, both checked (unit feedback if value right)
answer: {
  kind: "numeric-unit", value: 9.8,
  tolerance: { mode: "sigfig", value: 2 },   // value must be pre-rounded to 2 s.f.
  units: ["m/s"],                            // accepted spellings (normalized)
  unitChoices: ["m/s", "km/h", "m/s^2", "m"], // datalist incl. distractors
}

// 3. expression — mathematically equivalent forms accepted (sampling checker)
answer: { kind: "expression", accepted: ["4x", "2x+2x"], variables: ["x"] }
// students may type: 4x, 4*x, x4, 2(2x)…  sqrt(), ^, pi, sin/cos/tan (radians)

// 4. multiple-choice — exactly ONE correct, ids unique
answer: {
  kind: "multiple-choice",
  options: [
    { id: "a", text: L("$4.5\\times10^{3}$", "$4.5\\times10^{3}$"), correct: true },
    { id: "b", text: L(...), correct: false },
  ],
}
// shuffle per variant: options: rng.shuffle(options)

// 5. text — short symbolic/interval answers (normalized: case, spacing)
answer: { kind: "text", accepted: ["(-inf, 5)", "(-∞, 5)", "x<5"] }
```

## Hints (pedagogy rules)

1–3 hints, **progressive**. Never include the final answer.

- Hint 1: orient — what to look for / identify.
- Hint 2: the method step to take.
- Hint 3: the concrete sub-calculation, without the final number.

Physics pattern: (1) identify knowns/unknown → (2) relevant principle/equation →
(3) how to substitute/rearrange.

## Solutions

Staged, line by line, using the four stages in order:
`given` → `approach` → `calculation` → `result`.

- `given`: data (with units for physics).
- `approach`: one or two sentences naming the method/equation.
- `calculation`: the algebra/computation **step by step**, one transformation per line (`<br>`).
- `result`: final answer with units and a closing sentence.

## Parameterized generators

Use the `rng` (deterministic per seed) so problems can regenerate variants:

```ts
rng.int(min, max)            // inclusive integer
rng.nonZeroInt(min, max)     // avoids 0
rng.intExcluding(min, max, [0, 1])
rng.pick([2, 3, 5])          // random element
rng.float(min, max, 2)       // 2 decimals
rng.sign()                   // 1 | -1
rng.bool()
rng.shuffle(arr)             // shuffled copy (use for MC options)
```

**Hard requirements** (the validator enforces some, you enforce the rest):

- Every seed must produce a valid, well-defined problem: no division by zero,
  no negative values under square roots (unless intended), no ambiguous wording.
- Difficulty must be **stable across variants** — vary numbers, not complexity.
- Answers must be computed from the parameters, never hard-coded.
- Physics: realistic magnitudes, SI units, state rounding ("2 cifras
  significativas") and use `{ mode: "sigfig", value: 2 }` with the value
  pre-rounded.
- Integer-friendly numbers for easy levels; fractions kept clean (use
  parameter sets that divide evenly).

## Diagrams (parameterized SVG — no static images)

```ts
diagram: {
  kind: "function-graph",       // lines/curves: curves use parser syntax "2*x+1"
  xMin: -6, xMax: 6, yMin: -6, yMax: 6,
  curves: [{ fn: "2*x + 1", color: "primary", dashed?: false, label?: "y" }],
  points: [{ x: 0, y: 1, label: "(0, 1)" }],
  xLabel: "t (s)", yLabel: "v (m/s)", showGrid: true,
},
diagramLabel: L("Descripción accesible…", "Accessible description…"), // aria-label
```

Kinds: `function-graph`, `vectors` (arrows, optional components), `projectile`
(v0, angleDeg, h0), `unit-circle` (angleDeg), `right-triangle` (side labels),
`free-body` (force arrows, optional incline), `circuit` (mode: "series" |
"parallel", voltage label, resistor labels, optional current arrow).
See the exemplar files.

```ts
diagram: {
  kind: "circuit",
  mode: "parallel",
  voltage: "12 V",
  resistors: ["R\u2081 = 30 \u03a9", "R\u2082 = 60 \u03a9"],
  showCurrent: true,
},
```

## Difficulty guide

- **easy** — one concept, direct calculation (≈1 min).
- **medium** — one concept with moderate algebra/interpretation (≈2 min).
- **hard** — multi-step or non-obvious setup (≈3–4 min).
- **challenge** — combines concepts, interpret a situation, choose an approach (≥4 min).
  Difficulty = reasoning complexity, **not** bigger numbers.

## Topic coverage targets

Per topic file: **8–12 templates**, at least 2 easy / 2 medium / 2 hard /
1 challenge, at least 2 parameterized generators, and at least 2 non-numeric
question types (MC / expression / text). Add diagrams where topically natural.
