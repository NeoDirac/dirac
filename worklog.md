# Project Worklog — Bilingual Math & Physics Practice Platform

Project: Production-quality educational practice website for a private tutor.
- Bilingual (ES/EN), Math (algebra → pre-calculus) + Physics (foundations → intro modern physics)
- Single-route SPA at `/` with hash routing (`#/math`, `#/physics/<topic>`, `#/session?...`, `#/progress`, `#/about`)
- Attempt-first practice engine: TRY → CHECK → HINT (progressive) → ANSWER → SOLUTION
- Parameterized problem templates with deterministic seeds; content separated from UI in `src/content/`
- Answer validation: numeric (tolerance, `,`/`.` decimals, sci notation), expression equivalence (custom parser + sampling), units, MC
- Anonymous progress in localStorage; KaTeX rendering; SVG parameterized diagrams
- Stack: Next.js 16 App Router, TypeScript, Tailwind 4, shadcn/ui, katex

## Architecture contracts (do not break)

- Problem schema & factory: `src/lib/problem.ts`, types in `src/lib/types.ts`
- Seeded RNG: `src/lib/rng.ts` (mulberry32)
- Validation: `src/lib/validation/*` (answer checking happens ONLY here)
- i18n: `src/lib/i18n/*` (dictionary + LanguageProvider, fallback es)
- Curriculum metadata: `src/content/curriculum/{math,physics}.ts` (topic/subtopic ids are the contract for content files)
- Content: `src/content/{math,physics}/<topicId>.ts` — each exports `export const templates: ProblemTemplate[]`
- Registry: `src/content/index.ts` (lazy loaders with explicit import map)
- Content guide for authors: `src/content/GUIDE.md`
- Bank validation script: `bun run validate:content` (scripts/validate-bank.ts)

---
Task ID: 1
Agent: main (Z.ai Code)
Task: Project setup — inspect repo, install katex, establish architecture, create worklog

Work Log:
- Inspected repo: Next.js 16.1.3 + Turbopack dev server already running on port 3000 (dev.log clean)
- Confirmed shadcn/ui full component set, Tailwind 4, tsconfig path alias `@/*`
- Installed `katex` + `@types/katex`
- Created this worklog with architecture contracts

Stage Summary:
- Environment ready; architecture decided (single-route SPA + hash router, content-in-TS-modules, custom validation engine)
- Next: core libs (schema, RNG, validation), i18n, curriculum metadata, design system, exemplar content

---
Task ID: 1
Agent: main (Z.ai Code)
Task: Core platform — engine, i18n, design system, all views, exemplar content, validation

Work Log:
- Core libs: src/lib/types.ts (schema incl. solutionSteps union), rng.ts (mulberry32), problem.ts (template/L/step/tok factories), session.ts (deck builder, instantiate, stats)
- Validation engine: src/lib/validation/{expression,numeric,units,answer}.ts — custom recursive-descent parser + sampling equivalence (no eval), comma/dot decimals, sci notation, sigfig tolerance, unit normalize, MC/text
- i18n: dictionary (es/en ~230 keys), LanguageProvider (browser detect, es fallback, localStorage), locale number formatting
- Router: hash-based SPA router (src/lib/router.ts) — plain <a> anchors (next/link pushState does NOT fire hashchange — fixed by codemod)
- Progress: src/lib/progress.ts localStorage records + stats; session recording on resolution
- Curriculum metadata: 18 math + 18 physics topics, bilingual, with subtopic ids (the content contract)
- Content: registry with lazy per-topic imports; 36 topic stubs; 4 high-quality exemplar files (43 templates, 0 validation errors)
- Design system: warm paper palette + teal(math)/rust(physics) accents, serif headings (Source Serif 4) + Inter, dark mode, graph-paper hero, difficulty meter badges
- UI: MathText (KaTeX + {{tok}} locale decimals + **bold** + <br>), 6 parameterized SVG diagrams, header (lang/theme/mobile menu), footer, home/subject/topic/practice-config/progress/about views
- Practice engine: session-view state machine, attempt-first gating (reveal after attempt, solution after resolve), progressive hints, calm feedback, unit-aware partial feedback, new-variant, unlimited batches, summary + stats
- Validation script scripts/validate-bank.ts (`bun run validate:content`): bilingual completeness, hints 1–3, solution stages, answer specs, MC exactly-one-correct, generator determinism, curriculum id checks, coverage warnings
- Authoring guide: src/content/GUIDE.md

Bugs found & fixed during self-QA (agent-browser):
- next/link pushState doesn't fire hashchange → replaced with plain anchors
- Math.random() in render hrefs caused hydration mismatch → seed 0 links, materialized on session entry
- solution: bare array vs L10n crash in SolutionPanel → typed union + solutionSteps() resolver (bare arrays now the documented pattern)
- useRoute read hash during hydration → defer to post-mount rAF
- React 19 set-state-in-effect lint errors → deferred patterns (rAF/microtask/close-on-click)

Stage Summary:
- App fully functional end-to-end (verified in browser): home → subject → topic → session → wrong/right answers → hints → reveal → solution → next → summary; language switch works mid-session (content regenerates per locale); progress recorded
- 43 templates in 4 exemplar topics, validator green (0 errors), lint clean, hydration clean
- Remaining: fill 32 topic files (Wave 2 agents), then integration QA

---
Task ID: 2-d
Agent: general-purpose (content author D)
Task: Author physics topics physics-foundations, newtonian-mechanics, circular-gravitation, work-energy, momentum, rotational-motion

Work Log:
- Read worklog, GUIDE.md, exemplars (kinematics.ts, measurement-vectors.ts), curriculum/physics.ts, lib/{problem,types,rng,validation/*}.ts and the diagram components to internalise the authoring contract.
- Found the 6 target files already fully authored (~1000 lines each, written 21:37–21:50, ids/diagrams/difficulties matching this task's spec exactly) by an earlier unlogged run of Task 2-d; worklog had no 2-d record, so I took ownership: full line-by-line review of all 6 files rather than a blind rewrite.
- Verified per-file contract compliance: 9–12 templates; ≥2 easy / ≥2 medium / ≥2 hard / ≥1 challenge; ≥2 rng-parameterised generators (all 68 use rng); ≥2 non-numeric templates per topic; ids prefixed pf-/nm-/cg-/we-/mom-/rot-; subtopicIds all exist in curriculum; MC = exactly one correct with unique ids and rng.shuffle; hints 1–3 progressive L()-wrapped, never the final number; solutions staged given→approach→calculation→result with units at every step; sigfig-2 tolerance with values pre-rounded via local sig2(); g = 9{,}8 in Spanish math, G = 6.67e-11 in cg; friction μ dimensionless; normal force ≠ weight handled correctly (nm-fbd-01 teaches N = mg only on horizontal ground; nm-incline-01 draws N ⊥ incline).
- Recomputed every answer formula by hand across all parameter sets (weights, tensions incl. Atwood & table–pulley, inclines, skid μ, centripetal a/F, v=2πr/T, gravitation F/GM/gR²/GM, orbital speed √(GM/r), loop minimum √(gr), work/KE/PE/spring/conservation/power, impulse (rect + triangle F–t areas), bounce 2mv, inelastic couplings signed, recoil with M−m recoiling mass, 2πn radians, ω=v/r, τ=rF sinθ, I=Σmr², K=½Iω², L=Iω, skater conservation, rolling ¾mv², seesaw m₁d₁=m₂d₂).
- Pitfall sweep: zero single-backslash LaTeX bugs (unlike measurement-vectors.ts's river template), no Math.random/Date.now in generators, no ${ literal, even $-delimiter parity everywhere, no NaN/undefined tokens.
- Fixed 4 defects found in review:
  1. nm-friction-02: v0 and d were picked independently → deduced μ could reach 2.0 (unrealistic, contradicted the "typical tyre on dry asphalt" closing sentence). Replaced with paired skid combos so μ ∈ 0.51–0.68 for every seed.
  2. we-power-01: closing line said "(unos caballos de vapor: 0,13)" for sub-horsepower variants — grammatically wrong Spanish. Made the horsepower remark conditional (menos de un caballo de vapor / unos $X$ caballos de vapor).
  3. mom-coll-02: removed a stray unused m2dir property from one combo.
  4. cg-grav-01: hint 3 claimed the force is "of order 10⁻⁹ N", wrong for extreme variants (actual range 6×10⁻¹⁰–2.7×10⁻⁸ N); corrected to "entre 10⁻¹⁰ y 10⁻⁸ N".
- Wrote and ran a 340-instantiation audit script (68 templates × 5 seeds × both locales) checking $ parity, {{NaN}}/{{undefined}} tokens and finite answer values in every statement/hint/answerDisplay/solution step: 0 issues. Spot-printed nm-friction-02 μ and we-power-01 result strings across 12 seeds to confirm both fixes behave.

Stage Summary:
- Files (all 6 complete, filename kept): src/content/physics/{physics-foundations,newtonian-mechanics,circular-gravitation,work-energy,momentum,rotational-motion}.ts
- Templates: 68 total — physics-foundations 12 (2E/6M/3H/1C; 5 MC, 3 numeric, 4 numeric-unit; 3 diagrams: 2 function-graph + 1 right-triangle) · newtonian-mechanics 11 (3E/3M/4H/1C; 2 MC, 1 numeric, 8 numeric-unit; 3 free-body diagrams incl. one incline) · circular-gravitation 10 (2E/5M/2H/1C; 2 MC, 8 numeric-unit) · work-energy 12 (4E/5M/2H/1C; 1 MC, 1 expression, 1 numeric, 9 numeric-unit) · momentum 11 (3E/4M/3H/1C; 2 MC, 9 numeric-unit; 3 force–time function-graph diagrams) · rotational-motion 12 (4E/5M/2H/1C; 2 MC, 10 numeric-unit)
- Validation: `bun run validate:content` → 392 templates, 0 errors (sole warning: physics:circuits still empty — belongs to another batch). `bun run lint` → clean, exit 0. tsc: no errors in these 6 files (remaining repo errors are pre-existing in examples/, skills/ and another agent's optics.ts).
- Next: circuits batch (warning above), then bank-wide integration QA in browser.

---
Task ID: 2-a
Agent: general-purpose (content author A)
Task: Author math topics systems, polynomials, quadratics, rational, radicals, functions

Work Log:
- Read worklog, GUIDE.md, curriculum contract, and both exemplar files (foundations.ts, linear-equations.ts) plus lib/problem.ts, lib/rng.ts, lib/types.ts, validation engine and scripts/validate-bank.ts
- Found the six target files already fully populated (apparently from an earlier unlogged run of this same task): took ownership and performed a full line-by-line review of all 70 templates — math correctness of every generator/solution chain, bilingual quality, contract compliance (ids, subtopicIds, difficulty spread, hint progression, MC uniqueness, diagrams, determinism)
- Verified each generator algebraically (solutions built from chosen roots/answers so every variant is clean; guards for parallel systems, q = −p MC collisions, nonzero denominators, extraneous-root checks)
- Fixed defects found during review:
  - poly-spec-02: wrong Spanish terminology "cuadrado de una diferencia" → "diferencia de cuadrados"
  - poly-fact-01: MC became ambiguous when q = −p (distractor mathematically identical to key) → q now excludes ±p
  - poly-eq-01: Spanish grammar "la factor" → "el factor"
  - quad-fact-02: broken mixed LaTeX in Spanish hint → clean $(\square\,x - \triangle)(x + \circ)$ form
  - quad-app-01: ambiguous word problem (negative consecutive pair also valid) → restricted to consecutive positive integers; solution note updated
  - quad-vertex-02 → renamed quad-vertex-01 for numbering consistency
  - rat-div-01: rendered "x - -3" for negative parameters → new sign-aware minusFac() helper
  - rat-add-01: removed duplicated accepted-expression entry
  - rad-rat-02: excluded perfect-square radicands (√4, √9, √16) from the conjugate problem
  - fn-chal-01: rendered "1x"/"-1x" when |b| = 1 → new lead() coefficient formatter
  - fn-notation-01 / fn-roc-01: parameters now nonzero (avoids "+ 0" display artifacts and a hint that mentions a sum that isn't there)
  - poly-ineq-01 + rat-ineq-01: added mixed-spacing interval-notation variants (and ∪ forms) to the accepted text answers
- Ran extra robustness sweep (temp script, deleted after): 70 templates × 500 seeds = 35,000 generations → 0 throws, 0 non-finite answers, 0 duplicate MC option texts, 0 unbalanced $ delimiters
- Confirmed requirements per topic: 9–12 templates, ≥2 easy / ≥2 medium / ≥2 hard / ≥1 challenge, ≥2 parameterized generators, ≥2 non-numeric question types; function-graph diagrams present in functions (transformation + V-graph reading) and quadratics (vertex reading + intercepts→vertex), plus one in systems (intersection reading)

Stage Summary:
- Files finalized: src/content/math/{systems,polynomials,quadratics,rational,radicals,functions}.ts — 70 templates total
  - systems.ts: 11 (2 easy / 4 medium / 3 hard / 2 challenge) — substitution, elimination, graphing, parameters, applications; 1 function-graph diagram
  - polynomials.ts: 12 (2/7/2/1) — operations, special-products, factoring, equations, remainder-theorem, synthetic-division, inequalities
  - quadratics.ts: 12 (3/5/3/1) — standard-form, factoring, quadratic-formula, discriminant, completing-square, vertex, graphs, applications; 2 function-graph diagrams
  - rational.ts: 12 (3/5/3/1) — simplifying, mult-div, add-sub, equations, domain, inequalities
  - radicals.ts: 11 (3/5/2/1) — simplifying, operations, rationalizing, equations, fractional-exponents
  - functions.ts: 12 (2/6/3/1) — notation, domain-range, evaluation, composition, inverse, transformations, piecewise, interpreting-graphs, rate-of-change; 2 function-graph diagrams
- Validation: `bun run validate:content` → 392 templates · 0 errors · 1 warning (physics:circuits has no templates yet — other agent's topic; none of my six topics warn); `bun run lint` → clean; tsc → 0 errors in the six content files (11 pre-existing strict-mode errors elsewhere in src/views + src/lib/validation, outside this task's scope, untouched)

---
Task ID: 2-e2
Agent: general-purpose (content author — circuits)
Task: Author physics topic circuits (the only missing topic in the bank)

Work Log:
- Read worklog.md, GUIDE.md, the kinematics exemplar, curriculum/physics.ts (circuits subtopics: current, voltage-resistance, ohms-law, series, parallel, kirchhoff, electrical-power), plus lib/{problem,rng,types}.ts, validation/{numeric,units,answer}.ts, validate-bank.ts and the function-graph diagram component (tick/step + locale number formatting) to internalise the authoring contract.
- Replaced the circuits.ts stub with 12 templates (ids cir-*), designed to cover all 7 subtopics with a 4 easy / 5 medium / 2 hard / 1 challenge spread and both non-numeric types (MC + expression).
- All parameter sets are hand-curated so every answer is exact at 2 significant figures and every intermediate (currents, voltage drops, equivalent resistances) is clean: Ohm pairs (V = I·R with E-series R), V–I graph triples (I, V=RI), divider triples (V, R1, R2) with V2 = V·R2/(R1+R2) integer, parallel pairs (product/sum clean, e.g. 30∥60=20 Ω, 300∥200=120 Ω), two-branch battery-current sets (I1+I2 clean), two-EMF loop sets ((ε1−ε2)/(R1+R2) clean, incl. realistic 13.5 V charger over 12 V battery), V²/R power pairs, and mixed-network challenge combos (R1 + R2∥R3 → integer R23, clean I and P).
- Question types: 10 numeric-unit (sigfig-2 tolerance, value pre-rounded via local sig2(), generous unit spellings ["Ω","ohm","ohms","ohmio","ohmios"] etc., distractor unitChoices), 1 parameterized MC (resistance vs length/area ×2/×3 with four distinct factor distractors, rng.shuffled), 1 parameterized expression (P = V²/R or I²R depending on which variable rng picks).
- Included one parameterized function-graph diagram (cir-ohm-02): linear V–I characteristic through the origin with marked point P, window sized so the line ends at the top-right corner; point label "P" avoids locale-decimal issues, coordinates given in the statement via tok().
- Hints: 3 per template, progressive (identify → principle/equation → how to substitute), none contains the final number; solutions staged given → approach → calculation → result with units at every step (divider and parallel solutions include a cross-check line, e.g. V1+V2 = V and Req < min(R1,R2)).
- Self-inflicted bug caught and fixed: the first Write mixed single/double backslashes in ~60 LaTeX escapes (`\varepsilon` → JS vertical-tab escape, `\ ` thin spaces lost); two clumsy Edit passes made it worse (stray `;`/`,`), so I repaired all 60 sequences deterministically with a one-off String.raw Bun script and re-verified with a byte-level grep (0 single-backslash escapes remain).
- Ran a throwaway multi-seed audit (12 templates × 14 seeds × both locales): $ delimiter parity OK in every statement/hint/answerDisplay/solution step, no {{NaN}}/{{undefined}}/Infinity tokens, all numeric answers finite/positive and exact at 2 s.f., MC exactly-one-correct with unique ids and distinct texts, generation deterministic; also verified variant diversity (all 13 divider combos appear across 60 seeds) and realistic answer ranges. Deleted both temp scripts afterwards.
- Spot-checked rendered bilingual strings (EN statements, ES/EN solutions) and the diagram JSON for two templates.

Stage Summary:
- File written: src/content/physics/circuits.ts (12 templates, replacing the empty stub) — the last empty topic in the bank.
- Counts: easy 4 (current-01 NU, volt-01 MC, ohm-01 NU, power-01 expression) · medium 5 (ohm-02 NU+diagram, series-01 NU, parallel-01 NU, kirch-01 NU, power-02 NU) · hard 2 (parallel-02 NU, kirch-02 NU) · challenge 1 (chal-01 NU). Subtopic coverage: all 7 (current, voltage-resistance, ohms-law ×2, series, parallel ×2, kirchhoff ×2, electrical-power ×3). 11/12 templates rng-parameterized; non-numeric types: multiple-choice + expression.
- Validation: `bun run validate:content` → 404 templates · 0 errors · 0 warnings (the previous "physics:circuits has NO templates" warning is gone). `bun run lint` → exit 0. tsc → no errors in circuits.ts (11 pre-existing errors elsewhere: examples/, skills/, optics.ts, src/views, src/lib — untouched).
- Next: bank is now complete at 404 templates; remaining work is bank-wide integration QA in the browser (per Task 2-d note).

---
Task ID: 3-bc
Agent: general-purpose (content reviewer B+C)
Task: Review and fix math topics poly-functions, exponential, logarithmic, sequences, analytic-geometry, trig-foundations, trig-functions, trig-equations, trig-applications, precalculus-mixed

Work Log:
- Read worklog.md, GUIDE.md, foundations.ts exemplar, curriculum/math.ts, and lib/{problem,types,rng}.ts plus the diagram components (right-triangle side/angle geometry, unit-circle standard position) to internalise the contract before reviewing.
- Reviewed all 10 target files line by line (106 templates, ~7,700 lines): recomputed every answer formula from the parameters for ≥3 parameter sets (independent brute force for the trig equations), verified solution-step algebra, hint progression (1–3, never the final number), bilingual ES/EN equivalence, MC exactly-one-correct with unique ids and distinct texts, diagram/parameter consistency, determinism, and difficulty coverage.
- Pitfall sweeps: custom string-literal scanner for single-backslash LaTeX escapes (only false positives in two JSDoc comments — 0 real bugs, unlike circuits' history), tok()-in-comparison grep (0), Math.random/Date.now grep (0), control-character scan of all generated strings (0).
- MATH DEFECTS found & fixed:
  1. trig-equations trigeq-basic-01: for cosine the reference angle and the value were mismatched (claimed θ=30° solves cosθ=1/2; cos30°=√3/2). Value now depends on the function: sin30°=1/2 but cos30°=√3/2 (and symmetrically for 60°). Verified by brute force over 400 seeds: marked angle and answer are both true solutions in every variant.
  2. trig-equations trigeq-int-01: same sin/cos value mismatch, AND the solution claimed "Hay 4 soluciones" listing only 4 u-roots — for k=3 there are 6 (u covers [0°,1080°)). Rewrote to enumerate all 2·k roots per turn and a dynamic count; answer (smallest = ref/k) unchanged and now re-verified by 0.25°-step brute force ×400 seeds.
  3. trig-equations trigeq-gen-01: cosine general solution used the sine mapping (offered x = ±π/6 + 2πn for cos x = 1/2, whose solutions are ±π/3). Now picks d per function (sin: π/6→1/2, π/3→√3/2; cos: π/3→1/2, π/6→√3/2); answerDisplay and both solution branches re-verified against arcsin/arccos ×400 seeds.
  4. analytic-geometry ag-dist-02: the n=3 variant asked for k√3 but integer legs (kp)²+(kq)² = k²(p²+q²) can never give 3 (p²+q²=3 has no integer solutions). Replaced the pick list with valid triples p²+q² ∈ {2,5,10,13}; 300 seeds cross-checked statement-points vs k√n answer.
- TEXT/PARITY defects found & fixed:
  5. sequences seq-type-01: EN given-step was missing the closing $ of the math span (odd $ count → KaTeX would eat the rest of the line).
  6. trig-foundations trigf-quad-01: stray unmatched $ in the ES calculation step ("positivo}$<br>") — odd $ count.
  7. poly-functions pfn-model-02: EN result step had an unclosed math span ("a 10 \times 10\ \text{m}$ square") — added the opening $.
  8. poly-functions pfn-trans-02: expanded form could render "+ 0" as the constant term (a h² = k cases) — zero constant now omitted.
  9. exponential exp-chal-01: ES result said "superar el metro establecido" even when the target is 2 m or 5 m → "la altura establecida".
  10. precalculus-mixed pcm-chal-01: broken Spanish "para que el capital se más que duplique" → "se haya más que duplicado".
- logarithmic.ts, trig-functions.ts and trig-applications.ts required no fixes (hand-verified all cfg tables: log equation root sets, arcsin/arccos/arctan values, quotient/Pythagorean identity chains, law-of-sines/cosines triples incl. ambiguous SSA cases, two-observation tower heights, 120° ship routes).

Stage Summary:
- Files touched (targeted fixes only): poly-functions.ts, exponential.ts, sequences.ts, analytic-geometry.ts, trig-foundations.ts, trig-equations.ts, precalculus-mixed.ts. logarithmic.ts, trig-functions.ts, trig-applications.ts reviewed and clean.
- 106 templates across the 10 topics; every topic ≥2 easy / ≥2 medium / ≥2 hard / ≥1 challenge, ≥2 parameterized generators, and ≥2 non-numeric types (MC + expression everywhere); diagrams: 2 function-graph (poly-functions), 2 function-graph (exponential), 5 unit-circle + 3 right-triangle (trig topics), 1 vectors (trig-applications).
- Throwaway audit (kept out of src/, deleted after): every template × 30 seeds × both locales = 3,180 generations → 0 exceptions, 0 {{NaN}}/{{undefined}}/undefined/NaN/Infinity tokens, 0 control chars, even $-parity in every statement/hint/answerDisplay/solution step, MC exactly-one-correct + unique ids + distinct texts both locales, all numeric answers finite, generation deterministic (JSON-identical regeneration).
- Verification: `bun run validate:content` → 404 templates · 0 errors · 0 warnings. `bunx tsc --noEmit` (grep -v examples/skills) → 0 errors. `bun run lint` → exit 0.
- Next: batch B+C topics are review-green; remaining pre-existing tsc errors live outside these files (src/views, src/lib/validation, examples/, skills/ — other tasks' scope).

---
Task ID: 3-e
Agent: general-purpose (content reviewer E)
Task: Review and fix physics topics fluids, oscillations-waves, thermal-physics, electrostatics

Work Log:
- Read worklog.md, GUIDE.md, the kinematics exemplar, curriculum/physics.ts, lib/{problem,rng,types}.ts, the validation engine (numeric sigfig window, MC checks), MathText's token/LaTeX pipeline and the diagram components to internalise the authoring contract; then full line-by-line review of all 4 files (47 templates: fluids 12, oscillations-waves 12, thermal-physics 12, electrostatics 11).
- Physics recomputation: hand-recomputed the answer of EVERY parameter set of every template (not just 3 seeds — all sets are small hand-curated lists): ρ=m/V (2700/7800/8900 blocks), P=F/A, P=ρgh, F_b=ρVg, dam F=P̄·A with P̄=ρg(h/2), floating fraction ρ_obj/ρ_water, A₁v₁=A₂v₂, hose Q=πr²v + fill time (π≈3.14 vs Math.PI within 2 s.f.), Bernoulli ΔP=½ρ(v₂²−v₁²), apparent-weight density ρ=W·ρ_w/F_b; f=1/T, T=1/f, v=fλ, T=2π√(m/k), pendulum L=gT²/(4π²), standing waves λ_n=2L/n and f_n=nv/(2L), string v=√(F/μ) and f₁=v/(2L); T_K=T_C+273, Q=mcΔT, Q=mL_f, ΔL=αL₀ΔT (α 0.9–2.4×10⁻⁵ verified per material), STP V=nRT/P with R=8.314 (22.4 L/mol), mixing T_f=(m₁T₁+m₂T₂)/(m₁+m₂), Charles/Gay-Lussac/Boyle (all 12 process tuples exact), ΔU=Q−W with all four sign conventions, W=PΔV (kPa·L=J), ice+water equilibrium including the "does all ice melt" check; charge sharing (q₁+q₂)/2 with distractor-collision check (q₁=3q₂ etc. impossible in the set), q=Ne in nC, F=kq₁q₂/r², 3-charge superposition F_A−F_C with stated sign convention, E=kq/r², V=kq/r, W=qΔV, U=kq₁q₂/r, proton v=√(2kQe/(m_p r)) (all 8 sets → 2.6–12×10⁶ m/s). All magnitudes realistic; units present at every solution step.
- Constants audit: ρ_water=1000, g=9.8, c_water=4186, L_f=3.34×10⁵, k=8.99e9, e=1.602e-19 everywhere — one exception found (defect 3 below).
- Pitfall sweeps: byte-level scan for single-backslash LaTeX corruption (control chars / unpaired backslashes) → 0; no Math.random/Date.now in generators; no `${tok(x) >= …}` string-vs-number comparisons; ids unique; subtopicIds all exist (validator-confirmed); hints 1–3 progressive and never the final number; sigfig-2 values pre-rounded via r2() with rounding stated in statements; difficulty spreads fluids 3E/4M/4H/1C, oscillations 3E/5M/3H/1C, thermal 2E/5M/4H/1C, electrostatics 3E/5M/2H/1C; non-numeric types ≥2 per topic (MC ×6, expression ×4); diagrams: 2 vectors (buoyancy equilibrium, spring-scale submersion), 2 function-graph (x–t cosine reading, P–V isobar) all valid.
- Defects found & fixed (targeted, count-verified replacements via throwaway bun scripts; an Edit-tool multi-edit failed mid-way once, so remaining fixes were applied deterministically with expected-occurrence counts and re-verified):
  1. fluids fl-cont-01: Spanish typo "incomprensible" (incomprehensible) → "incompresible" (incompressible) in hint 1.
  2. oscillations ow-standing-01: two tuples ([3,80,2] and [3,40,1]) give λ=4/3 and 2/3 m, so the calculation step displayed "1.3333333333 m"/"0.6666666667 m" float noise. Replaced with [3,80,1.5] and [3,40,1.5] (λ=1 m, f clean) so every variant is exact.
  3. thermal tp-ice-01: used c_water=4200 J/(kg·K) and L_f=3.36×10⁵ J/kg, contradicting the file's own header (4186 / 3.34×10⁵), tp-heat-01/02 and the bank constants — a student crossing from tp-heat-01 saw two different c_water values. Aligned to 4186 / 3.34×10⁵ in statement+given+calculation (both locales); answers unchanged at 2 s.f. (28/46/32/39 °C), and the final "T_f = … = value" changed to "≈" since the division is no longer exact.
  4. electrostatics es-charge-02: the coulomb magnitude was rendered through a raw e-notation token ({{1.6e-9}} → KaTeX draws italic "1,6e−9"); replaced with the file's own mantissa×10^exp style (1,60×10⁻⁹ C) via new qC/cExp/cMan helpers.
  5. electrostatics es-coul-02 & es-energy-01: raw untokenized decimal interpolations inside math ((K·qa·qb·1e-12).toFixed(4), (dab·dab).toFixed(4), (dbc·dbc).toFixed(4), num.toFixed(4)) rendered "." decimals in Spanish; wrapped in tok(Number(...)) per the GUIDE rule (8 interpolation sites).
  6. SYSTEMIC in all four files (66 sites): a "{{token}}" written immediately after a LaTeX "{" — e.g. \dfrac{${tok(x)}} → emitted as "{{{x}}}" — defeats MathText's token regex (it captures "{x", fails to parse, and skips the comma conversion), so Spanish students saw "0.2" instead of "0,2" inside \dfrac arguments. Proved by simulating the exact regex, and confirmed the exemplar files never use this pattern. Fixed by inserting a space ({ ${tok(x)} } — LaTeX ignores it, token resolves in both locales). Affected 24 templates (fluids 8 sites, oscillations 22, thermal 10, electrostatics 26).
- Wrote a throwaway audit script (bun) covering all 47 templates × 30 seeds × both locales = 2,820 generations: 0 exceptions, 0 NaN/undefined/Infinity artifacts, every {{token}} finite and e-notation-free, even $-delimiter parity in es AND en for statements/hints/answerDisplay/solution steps/MC options, MC exactly-one-correct with unique ids and no distractor text equal to the key, deterministic regeneration (double-generate deep-equal), staged solutions given→approach→calculation→result, and every numeric answer inside an independently hand-derived min/max range table (this range check initially flagged 4 templates whose r2-pre-rounded endpoints differ from exact values, e.g. 196000→200000 — verified as intended rounding, table adjusted, no content change). Deleted all throwaway scripts afterwards.

Stage Summary:
- Files reviewed & fixed (no others touched): src/content/physics/{fluids,oscillations-waves,thermal-physics,electrostatics}.ts — 47 templates total (12+12+12+11), filenames kept, all ids/subtopics unchanged.
- Fixes: 6 defect classes, 75+ targeted string/data replacements; every fix preserves the template structure, bilingual pairing and answer keys (only tp-ice-01 constants changed, answers identical at stated precision).
- Verification: `bun run validate:content` → 404 templates · 0 errors · 0 warnings. `bunx tsc --noEmit` (excluding examples/ & skills/) → 0 errors. `bun run lint` → exit 0. Multi-seed × dual-locale audit → 0 failures across 2,820 generations.
- Next: the brace-adjacent-token locale defect (fix 6) also exists in 11 files owned by other batches (~68 sites: circular-gravitation 12, physics-mixed 10, work-energy 10, optics 8, newtonian-mechanics 6, rotational-motion 6, induction 4, magnetism 4, modern-physics 4, momentum 2, math/exponential 2) — recommend applying the same one-line fix ({${tok( → { ${tok() during bank-wide integration QA. Also note scripts/fix-tokens.ts and scripts/qa-batch-f.ts are leftover scratch files from another agent that could be cleaned up by whoever owns them.

---
Task ID: 3-f
Agent: general-purpose (content reviewer F)
Task: Review and fix physics topics magnetism, induction, optics, modern-physics, physics-mixed

Work Log:
- Read worklog.md, GUIDE.md, the kinematics exemplar, curriculum/physics.ts, lib/{problem,rng,types}.ts, the validation engine (sigfig window = ±½ unit in the 2nd significant digit of the stored value) and the diagram components (free-body +y is down; incline rises to the right) to internalise the contract; then full line-by-line review of all 5 files (58 templates: magnetism 12, induction 12, optics 12, modern-physics 12, physics-mixed 10).
- Physics recomputation: hand-recomputed EVERY parameter set of every template (all sets are small hand-curated lists, not just 3 seeds): F=qvB (1.6e-19·v·1e5·B mantissas), F=BIL (all 125 products), B=μ0I/2πr, F/L=μ0I₁I₂/2πd, r=mv/qB, f=qB/2πm (1.52 MHz @0.1 T ✓), mass spectrometer r=√(2mV/q)/B; Φ=BAcosθ (cos 30/45/60 given values), ε=NΔΦ/Δt, ε=BLv, Φ–t slope→emf, transformer Vs=Vp·Ns/Np, generator ε₀=NBAω, rod P=ε²/R; θi=90°−θsurface, plane-mirror 2d, Snell θ₂=asin(sinθ₁/n₂) with stated sine approximations (37°↔0.6, 53°↔0.8 3-4-5), n₂=sinθ₁/sinθ₂ (all 6 sets → 1.50–1.53, glass-like ✓), θc=asin(1/n) (48.8°/41.8°/24.4°/53.1° ✓), 1/f=1/do+1/di (all integer/7.5 image distances), m=−di/do, h'=|m|h; E=hc/λ (3.1 eV @400 nm ✓), KE=hf−φ (all sets E>φ ✓), λ₀=hc/φ, Rydberg λ (656/486/434/410/122/103 nm ✓ Balmer/Lyman), γΔt₀ (0.6c/0.8c exact 3-4-5 triples), E=Δmc², decay (ΔA,ΔZ) signatures (real U-238, Th-234, C-14, Na-22 β⁺, Rn-222, Co-60, Cs-137 chains), φ=E_photon−V₀ (0.98–2.1 eV realistic); mixed: I=V/R→P=VI→E=Pt (all exact kJ), a=(F−μmg)/m, v_apex=v₀cosθ, Tf=(CmTm+CwTw)/(Cm+Cw), v=√(2·KE/m) at A/2 (⅔·½kA² energy split), ballistic pendulum v=(m+M)/m·√(2gh), v_orbit=√(GM/r) (GM=4.0×10¹⁴), d=h/μ (energy bookkeeping). Units and magnitudes realistic at every step.
- Direction-concept verification (MC keys recomputed by right-hand rule / Lenz): wire field compass directions for both current senses, v×B ±z with electron sign flip, parallel-wire attract/repel + force direction on top/bottom wire, Lenz magnet-and-coil (all 4 pole×approach combos), Lenz changing-field (all 4 out×increasing combos), refraction toward/away + speed, image classification (beyond/2f/between/inside all 12 sets), Bohr emit/absorb, intensity-vs-KE. All correct.
- Pitfall sweeps: byte-level single-backslash scan (0 — no `\f`/`\t`/`\v` corruption), tok()-in-comparison grep (0 — the previously fixed optics line ~1019 is still clean), Math.random/Date.now grep (0), ids unique, subtopicIds all exist, hints 1–3 progressive and never the final number, sigfig-2 tolerance values pre-rounded with rounding stated in every statement, difficulty spreads verified, MC distractors genuinely distinct from keys in both locales.
- Defects found & fixed (targeted, structure/ids/answers preserved):
  1. optics opt-lens-01 (hint 3 + calculation), opt-mirr-01 (calculation), opt-lens-03 (calculation), opt-chal-01 (calculation): the 1/d_i intermediate was rounded to 1 decimal via r1(), so variants displayed mathematically false chains — e.g. "1/20 − 1/60 = 0,0 → d_i = 30 cm" (implied division by zero) or "1/10 − 1/30 = 0,1 → d_i = 15 cm" (0.1 implies d_i = 10); 30/32 parameter sets were affected, hint 3 even showed "d_i = {{0.0}}⁻¹". Replaced with exact-fraction chains (1/d_i = (d_o−f)/(f·d_o) = e.g. 20/300; d_i = f·d_o/(d_o−f)) that are exact for every parameter set (sign flows naturally for the negative virtual-image challenge), and hint 3 now guides through the rearranged form d_o−f/(f·d_o) without the final number.
  2. optics opt-snell-01 & opt-snell-03 calculation steps: the arcsin argument was displayed at 2 decimals while the answer came from the unrounded value — "arcosen(0,75) ≈ 48,8°" when arcsin(0.75) = 48.6° (0.2–0.3° visible inconsistency in 7/10 variants). Added an r3 helper and now display 3 decimals (0.752 → 48.8°, 0.376 → 22.1°, 0.667 → 41.8°, 0.413 → 24.4°), consistent to 0.05° in every variant (verified numerically in the audit).
  3. induction ind-flux-02 hint 2: written as a plain double-quoted string containing a literal "${pick.th}" — students saw the raw text "$\theta = ${pick.th}^{∘}$" and an unbalanced math span (odd $ count = 5). Converted to template literals so the angle value interpolates (integer, no tok needed).
  4. modern-physics mp-nucl-01 EN result step: missing the opening $ of the math span ("{{1.8}}\times10^{-13}\ \text{J}$ are released…", odd $ count) — KaTeX would eat the rest of the line. Added the opening $.
  5. induction ind-faraday-04: ΔΦ and Δt were interpolated raw inside $…$ math (hint 3, given step, calculation) → dot decimals in Spanish ("0.02/0.1"). Now use tok() with the brace-space convention (0,02/0,1), and the ES diagramLabel endpoint is locale-formatted with units ((0,1 s, 0,02 Wb)); the SVG point label stays raw per the bank-wide exemplar convention (kinematics does the same).
- Throwaway audit script (scripts/audit-batch-f.ts, deleted after): 58 templates × 7 seeds × both locales — 0 exceptions, deterministic regeneration (double-generate JSON-identical), 0 NaN/undefined/Infinity/control-char artifacts, even $-parity in every statement/hint/answerDisplay/solution step/MC option in BOTH locales, every {{token}} finite/e-notation-free, no brace-adjacent "{{{" regressions, no raw dot-decimals in ES strings, MC exactly-one-correct + unique ids + distinct texts + no distractor equal to the key, plus independent physics recomputation parsed from the rendered EN strings (lens/mirror d_i + fraction-display exactness, lens-03 height chain, Snell arcsin chains, Faraday slope/emf chain, proton radius, mass-spectrometer radius) → 13,804 checks, 0 failures.

Stage Summary:
- Files touched (targeted fixes only): src/content/physics/optics.ts (defect classes 1–2, 8 display chains), src/content/physics/induction.ts (defects 3 & 5), src/content/physics/modern-physics.ts (defect 4). magnetism.ts and physics-mixed.ts reviewed in full and clean — no changes.
- Coverage after fixes (unchanged): magnetism 12 (3E/6M/2H/1C), induction 12 (2E/5M/4H/1C), optics 12 (3E/5M/3H/1C), modern-physics 12 (3E/4M/4H/1C), physics-mixed 10 (3E/2M/3H/2C) — every topic ≥2 easy / ≥2 medium / ≥2 hard / ≥1 challenge, ≥2 parameterized generators, ≥2 non-numeric types; physics-mixed items each genuinely combine 2+ areas (circuit+power+energy, dynamics+friction, projectile+energy, calorimetry, SHM+energy, momentum+energy, gravitation+circular, energy+friction). Diagrams verified against component conventions (free-body force directions incl. 30° incline normal, vectors v/B, projectile, Φ–t function graph, Bohr level diagram, mirror right-triangle).
- Constants verified against the checklist and statement-quoted data: q=1.6×10⁻¹⁹ C, m_p=1.67×10⁻²⁷ kg, μ₀/2π=2×10⁻⁷, h=6.626×10⁻³⁴, c=3×10⁸, 1 eV=1.602×10⁻¹⁹ J, R=1.097×10⁷, n_water=1.33, n_glass=1.5, g=9.8, G=6.67×10⁻¹¹, M_E=6×10²⁴. One cross-file note (no change made): pmx-thermo-01 quotes c_water=4200 while thermal-physics quotes 4186 — both problems are self-consistent with their own stated data; flagged for a future bank-wide constants harmonization pass.
- Verification: `bun run validate:content` → 404 templates · 0 errors · 0 warnings. `bunx tsc --noEmit` (excluding examples/ & skills/) → 0 errors. `bun run lint` → exit 0. Multi-seed × dual-locale audit → 13,804 checks, 0 failures.
- Next: batch F topics are review-green. Note: scripts/fix-tokens.ts, scripts/qa-batch-f.ts and scripts/validate-2b-scratch.ts are still leftover scratch files owned by other agents (per task 3-e) — recommend their owners delete them during bank-wide integration QA.

---
Task ID: 3
Agent: main (Z.ai Code)
Task: Integration — content waves, global fixes, end-to-end QA

Work Log:
- Wave 2 content: 36 topic files populated (404 templates total) across 6 agent batches; batches reviewed line-by-line by 4 reviewer agents (2-a, 2-d, 2-e2, 3-bc, 3-e, 3-f)
- Reviewer agents found & fixed real defects: trig equation value/angle mismatches, unsolvable distance variants, broken optics lens chains (~30 variants), Snell rounding, LaTeX single-backslash corruption, bilingual gaps, MC key-equal distractors, physics constant drift
- Global fixes by main: 102 brace-adjacent {{token}} sites (11 files), optics tok() string comparison, c_water harmonized to 4186, TypeScript errors in router/answer/topic/progress/optics all fixed
- Scratch scripts removed; scripts/ contains only validate-bank.ts

QA (agent-browser, fresh sessions):
- Homepage ES/EN, language switch mid-session regenerates content per locale
- Subject pages (18 topics each) with live counts + difficulty dots + progress bars
- Topic pages: subtopic chips with counts, difficulty/count config, mixed + challenge shortcuts
- Sessions: expression answers (k*q*Q/r^2 accepted), numeric-unit with decimal comma (0,8 A ✓), wrong-unit partial feedback, MC radio flow, reveal-answer gating (locked before attempt, confirm dialog), progressive hints, staged solutions (Datos/Planteamiento/Cálculo/Resultado), next problem, unlimited extension, session summary with stats
- Progress dashboard records real attempts (2 attempted, 50% first-try shown during test)
- Quick practice (mixed math+physics, easy-weighted) works end-to-end
- Sticky footer verified (sticks on short pages at 1400px viewport, pushes naturally on long), mobile 390px with hamburger menu, dark mode toggle, hydration clean (0 errors fresh load), dev.log clean

Stage Summary:
- Platform COMPLETE and browser-verified: 404 bilingual templates across 36 topics, all validation gates green (validator 0 errors/0 warnings, tsc 0 app errors, lint clean)
- Ready for Vercel deployment (single route, static-prerendered, local storage progress)
- Remaining nice-to-haves: session persistence across refresh, per-problem deep-link sharing UI, teacher-facing analytics (future backend)

---
Task ID: 4
Agent: main (Z.ai Code) — scheduled review round 1
Task: QA sweep + new features (session persistence, MC keyboard shortcuts, circuit diagrams) + animation polish

Work Log:
- Reviewed worklog (platform complete at Task 3), confirmed all gates green at start: 404 templates/0 errors/0 warnings, tsc 0 app errors, lint clean, server healthy
- Browser QA re-run of golden path (quadratics: wrong answer → hint → correct k=4 → staged solution → next) — all working, 0 page errors
- NEW FEATURE 1 — Session persistence across refresh (src/lib/session-persist.ts):
  - Running session (deck, per-problem states, index, ended) mirrored to sessionStorage on every state change
  - On reload with the same URL seed the session restores exactly (position, score, attempts, skip/reveal states) with a bilingual "Session restored" toast
  - Fixed a race found during QA: navigating from an ended session to a new seed briefly saved the old deck under the new key → restored a phantom "Session ended"; now guarded with builtKey state so saves only happen when the deck belongs to the current config
  - "Practice again" clears storage before re-seeding; ended sessions restore to their summary
- NEW FEATURE 2 — Multiple-choice keyboard shortcuts:
  - Keys 1–9 select the nth option (ignored while typing in inputs), numbered badge chips on every option, "choose with keys 1–4" helper text, radio dots replaced by badges with visible :focus-visible ring on the label for a11y
- NEW FEATURE 3 — Circuit schematic diagram kind (series + parallel):
  - New CircuitDiagram spec (mode, voltage, resistor labels, optional current arrow) + renderer with battery two-plate symbol, resistor boxes, current arrow
  - Wired into cir-series-01 and cir-parallel-01 with generated labels (R₁ = 30 Ω…); validator + GUIDE.md updated
- STYLING POLISH — restrained motion pass (tw-animate-css, reduced-motion respected globally):
  - Problem card entrance (fade + slide-up), feedback panels, revealed-answer boxes (zoom-in), progressive hint items (slide from left), solution panel (slide from top)

Verification:
- bun run validate:content → 404 templates · 0 errors · 0 warnings
- bunx tsc --noEmit (excl. examples/skills) → 0 errors; bun run lint → clean; dev.log → 0 errors
- agent-browser: restore verified at problem 2/5 with score chip "1 correct"; fresh seed no longer phantom-restores after race fix; MC key "3" selects option 3 (synthetic + real keypress), Check enables; circuit diagram renders (aria-label "Parallel circuit: R₁ = 100 Ω…", 11 SVG shapes); fresh reload → 0 page errors, hydration clean

Stage Summary:
- Platform stable + 3 new features shipped and browser-verified; session UX now survives accidental refresh (top gap closed)
- Next-round ideas: per-subtopic practice filters, print-friendly worksheet mode, keyboard shortcut for Check (Ctrl+Enter), more circuit diagrams (kirchhoff loops), thin-topic content top-ups (topics with <10 templates)

---
Task ID: 5
Agent: main (Z.ai Code) — scheduled review round 2
Task: QA sweep + new features (subtopic filters, keyboard shortcuts, worksheet mode, two-loop circuits, streak) + styling polish

Work Log:
- Reviewed worklog (platform complete at Task 4); all gates green at start (404 templates/0 errors/0 warnings, tsc 0, lint clean)
- Browser QA re-run of golden path (quadratics: wrong → hint → correct −5/3 → staged solution → next; negative discriminant −8 accepted; ES mid-session switch; progress dashboard with real data) — all working, 0 page errors
- NEW FEATURE 1 — Per-subtopic practice filter:
  - SessionConfig gains optional subtopicId; router parses/serializes `u=` param; buildDeck filters by topic+subtopic
  - Topic page subtopic chips are now toggle buttons (aria-pressed, selected state, disabled when a subtopic has 0 templates); helper text shows focus; session header shows "Topic · Subtopic"
  - Difficulty availability recomputes for the focused subtopic, with a derived (non-state) fallback to "any" if the chosen level is unavailable — no cascading renders, lint-clean
  - filterTemplates now honors an explicit topicId/subtopicId restriction in ANY mode (previously topicId was silently ignored in challenge mode deep links)
- NEW FEATURE 2 — Keyboard shortcuts:
  - H = next hint, N = next problem (SessionView global handler; ignored while typing in inputs, with modifiers held, or when a dialog/menu is open)
  - Ctrl/⌘+Enter = check answer from anywhere (AnswerArea window listener, fresh closure per render)
  - Discreet kbd-chip legend in the session header (desktop only), kbd chips on Hint and Next buttons, ⏎ chip on the Check button; new .kbd-chip utility in globals.css
- NEW FEATURE 3 — Printable worksheet mode (#/worksheet?...):
  - New WorksheetView sharing the session params + deterministic seed (shareable URLs, "New variants" mints a fresh seed); capped at 20 problems, finite count only
  - Print-optimized sheet: brand + topic/subtopic title, difficulty/count meta, Name/Date lines, instructions, numbered problems (difficulty + type + time meta, KaTeX statements, lettered MC options a)–d), compact diagrams, ruled work space), answer key on its own page (break-before:page)
  - @media print rules: hides site chrome (.site-header/.site-footer/.no-print classes added), forces light paper palette even in dark mode, break-inside-avoid per problem, @page margins; KaTeX print-color-adjust exact
  - Entry points: "Printable worksheet" outline button on both topic page (respects subtopic+difficulty) and practice-config page
- NEW FEATURE 4 — Two-loop Kirchhoff circuit diagram + template:
  - New TwoLoopCircuitDiagram spec (emfLeft/emfRight, [R₁,R₂-middle,R₃] labels, showCurrents) + SVG renderer: two meshes sharing a middle branch, vertical battery symbols, loop-current arrows I₁/I₂ and I₃=I₁+I₂ down the middle (direction-aware arrowheads)
  - New template cir-kirch-03 (hard, numeric-unit): 7 hand-curated parameter sets where both loop equations and all currents are exact integers; solution shows the 2×2 system, elimination result and a numeric check of the left loop
  - Verified by throwaway script: 300 seeds → answer matches brute-force 2×2 solve, all loop currents integer, $-parity even everywhere, 0 NaN/undefined; validator + GUIDE.md updated for the new diagram kind
- NEW FEATURE 5 — Practice streak on progress dashboard: consecutive-day computation from record timestamps (today or yesterday anchored), 6th overview card with Flame icon, grid now 2/3/6 columns
- NEW FEATURE 6 — Empty-deck state: sessions with no matching problems (e.g. challenge + a subtopic without challenge templates) now show a friendly bilingual empty state + back link instead of a blank summary
- STYLING POLISH (VLM-assisted critique rounds):
  - Fixed real bug found by VLM: right battery label in the two-loop diagram overflowed the SVG viewBox (now anchors inward)
  - Hero decorative graph now reads as a real figure (quiet t, f(t), max., 0 labels, language-neutral)
  - Worksheet work space deepened (space-y-9 ruled lines) per print-critique feedback
  - Shortcut legend labels deduplicated (chip shows the key, label no longer repeats it)

Verification (all green):
- bun run validate:content → 405 templates · 0 errors · 0 warnings (new cir-kirch-03 included)
- bunx tsc --noEmit (excl. examples/skills) → 0 errors; bun run lint → clean; dev.log → no runtime errors
- agent-browser: subtopic filter end-to-end (chip → u=discriminant → session header "· Discriminante" → discriminant-only problems); H reveals hint (with input blur), Ctrl+Enter checks 41 ✓, N advances; session restore still works with subtopic configs; empty state renders for impossible filters; worksheet PDF (3 pages: chrome hidden, numbered problems + workspace, answer key on its own page, black-on-white); MC options lettered a)–d); "New variants" reseeds; streak card shows 1 day; difficulty fallback to "All levels" verified; mobile 390px topic + worksheet layouts clean (no overflow, proper wrapping); fresh load 0 console errors

Stage Summary:
- Platform stable; 5 new user-facing features + 1 robustness fix shipped and browser-verified; bank grew to 405 templates
- Next-round ideas: thin-topic content top-ups (topics < 10 templates), worksheet difficulty mix option, session summary "review missed problems" mode, per-problem deep-link share button, teacher-facing analytics (future backend)

---
Task ID: 7-b
Agent: general-purpose (physics content top-up)
Task: Add 6 physics problem templates to existing files (kinematics ×3, measurement-vectors ×1, newtonian-mechanics ×1, electrostatics ×1) per the thin-topic/empty-subtopic content plan.

Work Log:
- Read worklog.md (Tasks 1–5 + reviewer notes 2-d/2-e2/3-bc/3-e/3-f: constants audit, brace-adjacent-token rule, single-backslash corruption class, sigfig-2 conventions), GUIDE.md, lib/{problem,rng,types}.ts, validation/{numeric,units,answer}.ts, validate-bank.ts, the Vectors diagram renderer and MathText token pipeline, then the four target files in full.
- IDs follow each file's own prefix convention (task suggested nwt-/est-/mv- but the files use nm-/es-/vec-; nm-atwood-01 exists so the new one is nm-atwood-02 with a deliberately different angle):
  1. kin-pos-01 (easy/numeric, position-displacement — was EMPTY subtopic): Δx = x_f − x_0 from two positions at two times; 6 hand-curated integer sets incl. two negative-direction cases (Δx = −12, −9); sign convention stated in both locales; no diagram (task allows plain numeric).
  2. kin-acc-01 (medium/numeric-unit, acceleration — was EMPTY): a = Δv/Δt from integer v₀, v_f, Δt; 6 sets, three braking (a = −3, −6, −4); "con signo" / "including the sign" explicitly in both statements; units ["m/s^2","m/s²"], sigfig-2.
  3. kin-cv-01 (easy/numeric-unit, constant-velocity — was EMPTY): d = v·t with 6 clean sets; the requested unit (m or km) is part of the variant and stated in the statement ("Expresa el resultado en…" / "Express the result in…"); km answers 1.8 / 3 / 1.2 via tok().
  4. vec-add-02 (medium/numeric, measurement-vectors/addition — thinnest topic, 8→9): |A⃗+B⃗| by components with chained-displacement robot context; 6 curated sets whose sums are 3-4-5 / 6-8-10 / 5-12-13 triples (|S| = 5, 10, 13, 15, 9, 20 exact); vectors diagram (A from origin, B chained from A's tip, A+B diagonal, grid on), bounds derived from the three chain vertices; relative-0.01 tolerance matching vec-add-01.
  5. nm-atwood-02 (hard/numeric-unit, connected-systems): Atwood machine with m₁ > m₂ and the mandated a = (m₁−m₂)g/(m₁+m₂); differentiated from nm-atwood-01 (which uses the whole-system shortcut with m₂ > m₁) by instructing the per-mass second-law derivation — hints and solution build the two equations, add them to eliminate T, and the result step cross-checks T = m₂(g+a) between the two weights (all curated so a and T are exact to one decimal: a ∈ {4.2, 2.8, 1.4, 7, 5.6, 4.9}); g = 9.8 quoted, sigfig-2, units copied from atwood-01.
  6. es-field-03 (medium/numeric-unit, electric-field): E = kq/r² with the task-mandated rounded constant k = 9×10⁹ quoted in the statement (file header + banner comment document that es-field-01/02 use the finer 8.99×10⁹ — problem is self-consistent with its stated data; a student using 8.99×10⁹ still lands inside the sigfig-2 window); 6 curated (q µC, r m) pairs give exact integer E ∈ {2000, 9000, 1800, 1000, 4500, 1500} N/C; sci-notation answerDisplay via the file's sciTok; hint 3 carries the scientific-notation input guidance (3*10^4 / 3e4); units ["N/C","V/m"].
- Self-inflicted defect caught and fixed: the first write of vec-add-02/es-field-03 and parts of kin-pos-01/kin-acc-01 used single-backslash LaTeX escapes in TS strings (`$\Delta`, `\vec`, `\times`, `\dfrac`, `\,`, `\ ` → dropped backslashes / vertical-tab corruption — the exact defect class reviewers 3-bc/3-e swept for). Detected by the throwaway audit (a rendered statement showed "$Delta t = 4$"); repaired deterministically with a one-off bun script that doubles every un-doubled backslash in the 3 affected files (16 + 126 + 102 = 244 escapes), after grepping that all un-doubled backslashes were confined to my inserted lines. Re-verified: 0 single-backslash escapes remain, 0 control characters in any rendered string, rendered spot-checks (\vec, \Delta, \times chains) all correct.
- Throwaway audit (scripts/audit-7b.ts, deleted after): 6 templates × 10 seeds × both locales → 7,500 checks, 0 failures: no throw, deterministic double-generate, exactly 3 hints, staged given→approach→calculation→result, finite answers, non-empty units, hints never contain the answer token, even $-parity + no NaN/undefined/Infinity + no control chars + valid {{tokens}} + no raw dot-decimals in ES math, plus INDEPENDENT physics recomputation parsed from rendered EN statements (Δx, a = Δv/Δt, d = v·t with unit, |A⃗+B⃗| via hypot, Atwood a with sigfig-2 window + clean-one-decimal + m₁>m₂, E = kq/r² with k = 9×10⁹ + exactness), curated-set membership, sign/rounding/constant-quoted assertions (g = 9{,}8/9.8, k = 9×10⁹, "con signo"), and a source-level single-backslash guard on the 4 files.
- Verification: `bun run validate:content` → 411 templates · 0 errors · 0 warnings (405 baseline + my 6; the parallel math agent's 7 templates had not fully landed at last count — lin-ineq-01 visible, others pending; expected final 418). `bunx tsc --noEmit` → 0 errors in src/ (only pre-existing errors under examples/, skills/, and scripts/thin-analysis.ts — an untracked scratch file from the planning agent, not mine, recommend its owner deletes it). `bun run lint` → clean. Bank ids unique (dup scan over all content files: only the GUIDE.md doc example and MC option letters match).

Stage Summary:
- Files touched (only the 4 in scope): src/content/physics/kinematics.ts (10→13 templates; position-displacement, acceleration, constant-velocity subtopics no longer empty), measurement-vectors.ts (8→9), newtonian-mechanics.ts (11→12), electrostatics.ts (11→12) — plus worklog.md; throwaway audit script deleted.
- Templates added: kin-pos-01 (easy/numeric, position-displacement), kin-acc-01 (medium/numeric-unit, acceleration), kin-cv-01 (easy/numeric-unit, constant-velocity), vec-add-02 (medium/numeric, addition, vectors diagram), nm-atwood-02 (hard/numeric-unit, connected-systems), es-field-03 (medium/numeric-unit, electric-field).
- All gates green for my scope: validator 411 · 0/0, tsc clean in src, lint clean, 7,500-check audit 0 failures.
- Notes for future reviewers: (1) id prefixes follow file conventions (nm-/es-/vec-), not the task's speculative nwt-/est-/mv-; (2) es-field-03 deliberately quotes k = 9×10⁹ (mandated) while es-field-01/02 quote 8.99×10⁹ — both self-consistent, flagged here for any bank-wide constants harmonization pass; (3) scripts/thin-analysis.ts is an untracked planning scratch file that breaks tsc (Bun global) — its owner should delete it.

---
Task ID: 7-a
Agent: general-purpose (math content top-up)
Task: Add 7 math problem templates to existing files (quadratics ×2, linear-equations ×3, foundations ×2) covering the empty subtopics roots, inequalities, compound, abs-inequalities, algebraic-notation and simplifying, per the thin-topic/empty-subtopic content plan.

Work Log:
- Read worklog.md (architecture contracts + Task 7-b physics top-up working pattern), GUIDE.md, lib/{problem,rng,types}.ts, validate-bank.ts, the MathText token pipeline (locale-aware {{n}} tokens, ES math {,} decimals), then the three target files (helpers, exemplars, MC/text/expression conventions, existing id prefixes).
- ID deviation (mandatory, collision): the task-specified `lin-ineq-01` already exists in linear-equations.ts (subtopic interval-notation, text type) — so the two new inequality templates are numbered **lin-ineq-02** (subtopic `inequalities`) and **lin-ineq-03** (subtopic `compound`). All other task ids were free and used as given.
- Templates added (all with hand-curated rng.pick parameter sets, 3 progressive answer-free hints, 4 staged given→approach→calculation→result steps, bilingual L() everywhere):
  1. quad-roots-01 (medium/numeric, quadratics/roots — was EMPTY): Vieta sum-or-product (rng.bool() parameterized) on x² + bx + c built from 6 curated integer root pairs (b = −(r₁+r₂), c = r₁r₂; one pair gives b = −1, rendered via the file's poly/op/linFac helpers which omit the 1); solution shows x₁+x₂ = −b/a, x₁·x₂ = c/a with a = 1 plus a factoring cross-check.
  2. quad-roots-02 (hard/numeric, quadratics/roots): x² + bx + k = 0 with one stated integer root, 6 curated (stated, other) pairs; Vieta-sum route to the second root, then k = product; result step cross-checks by substituting the stated root (s² + bs + k = 0).
  3. lin-ineq-02 (medium/numeric, linear-equations/inequalities — was EMPTY): a·x + b ≤ c / ≥ c asking for the smallest integer solution; 6 curated sets whose boundary (c−b)/a is always a NON-integer (3.5, −3.5, 6.75, −3.25, 4.5, −5.5 — unambiguous in both languages); the ≤ variants use a < 0 so the flip is exercised and the solution is still x ≥ boundary; decimals rendered via tok() → ES "3,5"; answer = ceil(boundary).
  4. lin-ineq-03 (hard/multiple-choice, linear-equations/compound — was EMPTY): solve A < a·x + b ≤ B, 7 curated sets (a ∈ {2,3,4}, one with positive b and a negative endpoint) with integer solution endpoints; 4 MC options in inequality form: correct, left-endpoint inclusivity flip, right-endpoint exclusivity flip, and forgot-to-divide (A−b < x ≤ B−b) — pairwise distinct as strings in both locales; rng.shuffle(options).
  5. lin-absi-01 (hard/numeric, linear-equations/abs-inequalities — was EMPTY): |x − a| < b with 6 curated (a, b), b ∈ {2,3} so the open interval (a−b, a+b) holds exactly 3 or 5 integers (within the 3–6 spec; integer a, b forces odd counts); |x| rendering for a = 0; solution lists the integer set explicitly.
  6. found-alg-01 (easy/multiple-choice, foundations/algebraic-notation — was EMPTY): translate "k less than m times a number" (bilingual phrase sets incl. «el doble/el triple») to m·x − k; distractors are the classic mistranslations k − mx, m(x − k), mx + k (all distinct for m ≥ 2, k ≥ 4).
  7. found-simp-01 (easy/expression, foundations/simplifying — was EMPTY): combine like terms a·x + b − c·x + d over 7 curated sets with a > c; accepted in both bank spellings ["6x + 9", "6*x + 9"] (implicit form per found-like-01/found-dist-01, explicit `*` parser form per the task example — dual-form convention already used by logarithmic.ts).
- ES grammar fix during self-review (before any gate run): "la producto" → "el producto" gender agreement in the quad-roots-01 statement/result; hint 2 of quad-roots-01 rephrased to avoid a bare "$a = 1$" that would coincidentally equal the answer 1 in the (−3, 4) sum variant.
- Throwaway audit (scripts/audit-7a.ts, DELETED after): 7 templates × 24 seeds × both locales → 7,670 checks, 0 failures: deterministic double-generate, exactly 3 hints, staged given→approach→calculation→result, no NaN/undefined/Infinity, no control characters, even $-parity on statement/hints/answerDisplay/solution/MC options, well-formed {{number}} tokens with no stray braces, no raw dot-decimals in ES math spans, MC exactly-one-correct + 4 pairwise-distinct texts per locale + expected distractor set, meta (subtopic/difficulty/type) match, hints never contain the final answer (numeric leak regex with digit-boundary lookarounds, MC/expression text containment), INDEPENDENT numeric recomputation parsed from rendered EN statements (Vieta −b / c, k = −(s²+bs) substitution route, ceil((c−b)/a) with non-integer boundary assertion, compound endpoints (A−b)/a & (B−b)/a vs the correct option text, brute-force count of integers with |x−a| < b, like-term recomputation vs accepted), curated-set membership for every template, plus a source-level single-backslash guard on the 3 files (0 hits). Separate coverage sweep confirmed every curated set (and both askSum variants, 12 total for quad-roots-01) is reachable within seeds 1–2000.
- Verification: `bun run validate:content` → **418 templates · 0 errors · 0 warnings** (411 from 7-b's count + my 7). `bunx tsc --noEmit` → 0 errors in src/ (only the 4 pre-existing errors under examples/ and skills/, out of scope; scripts/thin-analysis.ts from 7-b's notes is already gone). `bun run lint` → clean. Bank ids unique (validator duplicate check passes; physics ids untouched).

Stage Summary:
- Files touched (only the 3 in scope): src/content/math/quadratics.ts (12→14 templates; `roots` subtopic no longer empty), linear-equations.ts (11→14; `inequalities`, `compound`, `abs-inequalities` no longer empty — plus adding tok to the file's problem-helper import), foundations.ts (15→17; `algebraic-notation`, `simplifying` no longer empty) — plus worklog.md; throwaway audit script deleted.
- Templates added: quad-roots-01 (medium/numeric, Vieta sum/product), quad-roots-02 (hard/numeric, recover k from one root), lin-ineq-02 (medium/numeric, smallest integer satisfying a·x + b ≤/≥ c), lin-ineq-03 (hard/MC, compound inequality), lin-absi-01 (hard/numeric, count integers in |x − a| < b), found-alg-01 (easy/MC, phrase → expression), found-simp-01 (easy/expression, combine like terms).
- All gates green: validator 418 · 0/0, tsc clean in src, lint clean, 7,670-check audit 0 failures, all curated variants reachable.
- Notes for future reviewers: (1) task ids lin-ineq-01/02 were renumbered to lin-ineq-02/03 because lin-ineq-01 already existed (interval-notation); (2) found-simp-01 intentionally neighbours found-like-01 (like-terms subtopic) — same shape by task spec but curated sets, guaranteed a > c, and dual accepted spellings; (3) lin-absi-01 answers are always odd (3 or 5) — a mathematical consequence of integer a, b in |x − a| < b, already within the task's 3–6 window.

---
Task ID: 6
Agent: main (Z.ai Code) — scheduled review round 3
Task: QA sweep + bug fixes + new features (review-missed retry mode, per-problem share deep links, thin-topic content top-ups) + styling polish

Work Log:
- Reviewed worklog (platform complete at Task 5); all gates green at start (405 templates · 0/0, tsc clean, lint clean, dev.log healthy)
- QA via agent-browser (fresh storage, ES+EN): homepage, subject pages, topic pages with subtopic chips, golden session path (wrong answer → H hints after input blur → correct → staged GIVEN/APPROACH/CALCULATION/RESULT solution → N next), language switch mid-session, reveal-answer gating + confirm dialog, worksheet + print PDF (3 pages, VLM-approved print design), dark mode, fresh-load 0 console errors
- BUGS FOUND & FIXED:
  1. End-session confirm dialog showed the reveal-answer warning copy ("Piénsalo un momento más…") — wrong dictionary key reused. New keys summary.endTitle/session.endConfirmDesc (ES+EN), session-view now uses them; verified in browser
  2. Wrong-answer feedback nudge duplicated the hints section heading ("Need help?" twice in a row) — new hints.nudge copy ("¿Atascado? Las pistas de abajo te guían…"), problem-view updated
  3. Session summary labeled every non-resolved problem "Skipped" even when it was attempted-but-wrong (unresolved) or never reached — two new statuses with icons: summary.status.unresolved (XCircle, destructive) and summary.status.notReached (CircleOff); verified in browser with a mixed-status session
- NEW FEATURE 1 — Review missed problems (retry mode):
  - SessionSummary computes missed = problems with no correct attempt; when > 0 a primary "Repasar los fallados (n) / Review missed (n)" button (Target icon) appears and "Practice again" is demoted to outline
  - handleRetryMissed in SessionView: filters deck to missed problems (same variants/seeds), resets states, index 0, reviewing flag on; "Repaso/Review" pill badge with RotateCcw icon in the session header; reviewing persisted in sessionStorage (restores across refresh)
  - Browser-verified end-to-end: summary → retry → badge → fresh attempts; refresh-safe
- NEW FEATURE 2 — Per-problem share deep links:
  - SessionMode gains "single"; SessionConfig.singleTemplateId; router parses/serializes tpl= param; buildDeck pins single-mode decks to exactly (template, seed) — deterministic variants
  - Share button (Link2 icon) in the problem card meta row: copies origin+pathname+hash URL; clipboard API with legacy execCommand textarea fallback; success/error toasts + 2s ✓ state; icon-only on mobile
  - Single sessions render "Problema 1 de 1", back link goes to the topic, "Practice again" mints a new variant; worksheet view also resolves single-mode titles
  - Browser-verified: URL format captured via clipboard stub, deep link reproduces the exact variant after reload (determinism check via sessionStorage text compare), full answer→summary flow
- NEW FEATURE 3 — Thin-topic content top-ups (+13 templates → 418 total, delegated to two parallel agents):
  - Task 7-a (math, 7): quad-roots-01/02 (Vieta sum/product + recover k — `roots` subtopic was EMPTY, chip now enabled with count 2), lin-ineq-02 (smallest integer solution), lin-ineq-03 (compound MC), lin-absi-01 (count integers in |x−a|<b) — inequalities/compound/abs-inequalities subtopics were EMPTY; found-alg-01 (phrase→expression MC), found-simp-01 (like terms expression) — algebraic-notation/simplifying were EMPTY. Note: ids renumbered vs spec (lin-ineq-01 already existed)
  - Task 7-b (physics, 6): kin-pos-01 (displacement), kin-acc-01 (average acceleration), kin-cv-01 (constant velocity) — position-displacement/acceleration/constant-velocity subtopics were EMPTY; vec-add-02 (vector addition via components, vectors diagram), nm-atwood-02 (Atwood acceleration), es-field-03 (point-charge E field)
  - Both agents ran multi-seed dual-locale audits (7,670 + 7,500 checks) with independent recomputation — 0 failures; validator 418 · 0 errors · 0 warnings
- STYLING POLISH (VLM-guided, screenshots at 1280×800 + 390×844):
  - Progress dashboard: uniform StatCard component (streak card no longer breaks the grid — same bg-card, primary-colored number + Flame), header alignment sm:items-center
  - Practice config: Cancel is now a centered text link instead of a third full-height ghost button (cleaner action row hierarchy)
  - Footer: bg-card/50 → bg-muted/40 for clearer section separation
  - Topic page: prerequisites spacing harmonized (mt-4 → mt-3)
  - Summary list: hover state (border-ring/50 + bg-secondary/40), stronger not-attempted tint (bg-secondary)
  - VLM ratings after polish: summary/progress/practice-config all 8/10 with no blocking issues; mobile pass: no overflow, adequate touch targets, share button 36×32px visible

Verification (all green):
- bun run validate:content → 418 templates · 0 errors · 0 warnings
- bunx tsc --noEmit (excl. examples/skills) → 0 errors; bun run lint → clean; dev.log → no runtime errors
- agent-browser: golden path, retry mode, share deep link (determinism verified), roots subtopic chip enabled → focused session shows Vieta problems, fresh-load full navigation (home → math → physics → session) 0 errors, mobile 390px no overflow

Stage Summary:
- Platform stable; 1 real UX bug fixed (end-session dialog), 2 labeling/copy issues fixed, 3 new features shipped (retry missed, share links, +13 templates → 418), styling polished with VLM critiques
- Next-round ideas: teacher-facing analytics (future backend), worksheet difficulty-mix option, more Kirchhoff/multi-concept templates, constants harmonization pass (k = 9×10⁹ vs 8.99×10⁹, flagged by 7-b)

---
Task ID: 7
Agent: main (Z.ai Code) — scheduled review round 4
Task: QA sweep + new features (session time tracking, smart-resume home card, shortcuts help dialog) + styling polish

Work Log:
- Reviewed worklog (round 6 complete: 418 templates, retry/share features); all gates green at start (validate 418·0/0, tsc clean, lint clean, dev.log healthy)
- QA via agent-browser (fresh storage): golden path incl. wrong → hints (H after blur) → reveal answer + confirm dialog → staged solution → next; retry-missed flow with badge; share deep-link (single mode); language switch ES/EN mid-session and on summary; progress dashboard; worksheet; dark mode; 0 console errors. No bugs found this round (one test-script artifact: MC problems have no text input, so a scripted "fill+check" was a no-op — app behavior correct)
- NEW FEATURE 1 — Session time tracking:
  - Live timer chip in the session header (Timer icon, mm:ss, tabular-nums, title="Session time"); ticks only while document is visible and the session has not ended (honest time-on-task, no wall-clock drift across refresh)
  - Per-problem times: problemStartRef resets on navigation/new-variant/retry; stamped once at first resolve (correct, reveal, skip, or first solution view) into a times[] array persisted with the session; new-variant resets its slot for re-measurement
  - Session summary gains a time line under the title: "Time practiced: X · ≈ Y estimated · Z per problem" (estimated = Σ estimatedTimeSec of the deck; avg over stamped problems) + per-problem compact time chips (desktop, title="Time on this problem") in the detail list; hidden when < 5s (old sessions show nothing)
  - formatDuration/formatClock helpers in lib/utils.ts; PersistedSession extended with elapsedSec/times (optional, backward-compatible restores)
  - Browser-verified: live tick (0:10), summary line "Tiempo de práctica: 1 min 16 s · ≈ 24 min 50 s estimado · 1 min 7 s por problema", per-problem chip "1m 7s", exact restore after refresh ("1 min 16 s" preserved), EN copy check
- NEW FEATURE 2 — Smart-resume "Continue practicing" card on home:
  - ContinueCard component reads progress after mount (no hydration mismatch): finds the topic with the most recent lastTs, renders a banded section between hero and subjects — History icon, "Pick up where you left off / Sigue donde lo dejaste", topic name links to topic page, "{n} attempts · {timeAgo}" meta (date-fns locale-aware), primary "Keep practicing / Seguir practicando" CTA straight into a fresh 10-problem topic session; gracefully absent with no history
  - Browser-verified: band appears with real progress data, CTA navigates into a working session, EN copy correct, mobile layout clean (VLM: "clean and professional, excellent hierarchy")
- NEW FEATURE 3 — Keyboard shortcuts help dialog:
  - Press ? (or ¿ on Spanish layouts) during a session, or click the shortcuts legend (now a real button with focus ring), opens a Dialog listing all 5 shortcuts: H hint, N next, Ctrl⏎ check, 1–9 MC choice, ? help
  - SHORTCUTS table in session-view; dictionary keys ES/EN; ignores open dialogs/typing per existing guard
  - Browser-verified: opens via keypress and legend click, Esc closes, fits 390px viewport, correct ES copy
- STYLING POLISH (VLM-guided):
  - Subject page topic cards: fixed-height trailing slot (h-7) for the progress bar so every card is identical height whether or not there's progress (VLM confirmed uniform alignment after fix, light+dark); decorative card numbers text-border → text-muted-foreground/30 for legibility; progress caption gets truncate
  - Dialog overlay bg-black/50 → /60 for stronger focus (shortcuts + all dialogs)
  - VLM ratings: continue card, shortcuts dialog, time summary, subject light/dark, session with timer all 8/10; mobile pass clean (no overflow, no broken layouts, dialogs fit)

Verification (all green):
- bun run validate:content → 418 templates · 0 errors · 0 warnings
- bunx tsc --noEmit (excl. examples/skills) → 0 errors; bun run lint → clean; dev.log → no runtime errors
- agent-browser: fresh-storage full navigation (home → math → physics topic → session → progress → about) 0 errors; mobile 390px home/session/continue band/dialogs clean; MC numeric-key answering verified in passing (key 1 selects + Ctrl⏎ checks)

Stage Summary:
- Platform stable; 3 new user-facing features shipped and browser-verified (time tracking, smart resume, shortcuts help) + subject-card alignment fix
- Next-round ideas: teacher-facing analytics (future backend), worksheet difficulty-mix option, constants harmonization pass (k = 9×10⁹ vs 8.99×10⁹), more multi-concept templates, per-problem time in progress dashboard records (persist timeSec in ProblemRecord for cross-session analytics)

---
Task ID: 8
Agent: main (Z.ai Code) — scheduled review round 5
Task: QA sweep + new features (per-problem time analytics, session history, copy-results report, weak-topic suggestions) + VLM-guided styling polish

Work Log:
- Reviewed worklog (round 7 complete: 418 templates, time tracking, smart resume, shortcuts help); all gates green at start (validate 418·0/0, tsc clean, lint clean, dev.log healthy)
- QA via agent-browser (fresh storage, ES+EN): golden path (quadratics: wrong 5 → feedback nudge → Hint 1/2 → correct 4/3 accepted as "3 attempts" → staged solution GIVEN… → next), mid-session language switch to ES (Problema 2 de 10, Comprobar respuesta), session refresh restore (same seed, 0 errors), end-session dialog with correct copy, session summary with per-problem times/statuses, progress dashboard, worksheet mode, dark mode, mobile 390px (no overflow), physics circuits session (V–I graph problem), invalid topic id → graceful error page (correct behavior). No bugs found this round
- Verified the flagged constants issue from round 7-b: k = 9×10⁹ vs 8.99×10⁹ in electrostatics is deliberate and documented (each statement quotes its own constant; es-field-03 hand-curated for exact answers) — no change needed
- NEW FEATURE 1 — Per-problem time persistence (timeSec in ProblemRecord):
  - ProblemRecord gains optional timeSec; session-view computes it at the moment of recording (currentProblemSec helper) so record + stampTime share one measurement; resolveAndRecord/toggleSolution pass the frozen seconds
  - TopicStats/OverallStats aggregate timeSec/timedRecords; progress.ts gains SessionRecord/SessionLogState types + loadSessions/appendSessionRecord (localStorage key aula-practice-sessions, cap 40); resetProgress also clears the session log
  - Browser-verified: records carry timeSec (43s for the answered problem, 1s for skips); dashboard "Time practiced" stat card + "≈ 9s per problem" in topic rows + per-problem time chips in recent activity
- NEW FEATURE 2 — Recent sessions history:
  - One SessionRecord appended when a session truly ends (mode, subjects, topic, review flag, problems/attempted/solved/firstTry/hints/elapsedSec); sessionRecorded flag persisted in PersistedSession so reloads never duplicate; retry-missed resets the flag so a review session logs as its own entry (review: true → "Repaso/Review" pill)
  - Dashboard gains "Sesiones recientes/Recent sessions" section (last 8): date (locale-aware), subject · topic label, solved/total, first-try %, elapsed time chip, score-tinted icon
  - Browser-verified: original session + review session both logged with correct review badge
- NEW FEATURE 3 — Copy results to clipboard (share with tutor):
  - SessionSummary "Copiar resultados/Copy results" outline button with ✓ 2s success state; builds a plain-text report (title + locale date, subject · topic, solved/first-try/hints, time line when tracked, numbered per-problem list with status + time); shared copyToClipboard helper extracted to lib/utils.ts (clipboard API + execCommand fallback) and problem-view share link refactored onto it
  - Browser-verified via clipboard stub: full ES report captured with correct statuses and times; toast shown
- NEW FEATURE 4 — Weak-topic detection + practice suggestion:
  - isWeakTopic (≥3 attempts, <50% first-try) drives an amber "Refuerza/Needs work" badge on topic rows and a "Sugerencia de práctica/Practice suggestion" band above PROGRESS BY TOPIC (weakest qualifying topic, its stats, primary CTA into a 10-problem session)
  - Browser-verified: band appears for quadratics (20% · 5 attempts) in both languages; absent when no weak topics
- STYLING POLISH (VLM-guided, initial ratings 7.5 → final 8.5-9):
  - Progress dashboard: StatCard redesign (quiet icon chip, font-bold tabular numbers, min-height, hover border) now 8 cards in a 2/4-col responsive grid incl. new "Time practiced" and "Answers revealed"; SectionHeader with trailing hairline rule; mt-12 section rhythm; destructive reset button now outline + bg-destructive/5 tint; activity rows gap-2.5 + hover; per-problem time in activity rows
  - Session summary: same icon-card treatment for the 6 stats (font-bold, icon chips, items-center alignment); action row wraps (sm:flex-wrap) to fit the new Copy button
  - Home hero: subtitle mt-6, CTAs mt-9, stats row mt-12 with border-t separator, de-emphasized numbers (text-xl foreground/80 instead of primary 2xl), quick-practice outline button gets stronger border/shadow/hover
  - Answer input: plain numeric input constrained to sm:max-w-xs (no more full-width single-number field)
  - VLM final: home 8.5/10, session 9/10, summary 9/10 (dark, controlled), dashboard cards aligned, contrast excellent

Verification (all green):
- bun run validate:content → 418 templates · 0 errors · 0 warnings
- bunx tsc --noEmit (excl. examples/skills) → 0 errors; bun run lint → clean; dev.log → no runtime errors
- agent-browser: full navigation journey (home → math → physics → topic → practice → about → progress) 0 console errors, no horizontal overflow at 1280px and 390px; MC numeric-key answering (press 1 → select → check → correct) after blurring focused input (guard correctly ignores keys while typing); timeSec + session log verified in localStorage; copy-results clipboard stub verified; retry-missed creates a second review session record; suggestion band + weak badges in ES/EN; dark mode summary 9/10

Stage Summary:
- Platform stable; zero bugs found in QA; 4 new features shipped and browser-verified (time analytics in records/dashboard, session history with review badges, tutor-facing copy-results report, weak-topic suggestions)
- Data layer now fully self-contained for a future backend sync (records carry timeSec; sessions are self-contained events)
- Next-round ideas: teacher-facing analytics (export CSV of records/sessions), worksheet difficulty-mix option, more Kirchhoff/multi-concept templates, topic search/filter on subject pages, spaced-repetition scheduling ("review due today" based on first-try misses)

---
Task ID: 9
Agent: main (Z.ai Code) — scheduled review round 6
Task: QA sweep + 3 new features (spaced-repetition review scheduling, topic search/filter, CSV export) + styling polish

Work Log:
- Reviewed worklog (rounds 1–8 complete: 418 templates, session persistence, time tracking, smart resume, shortcuts help, retry/share, weak-topic suggestions); all gates green at start (validate 418·0/0, tsc clean, lint clean, dev.log healthy)
- QA via agent-browser (fresh storage): golden path (completing-the-square problem: wrong 10 → "Not yet" feedback → Hint 1 with math content → correct 25 → "2 attempts" → THE ANSWER IS 25 → staged solution GIVEN/APPROACH… → next), language switch EN→ES→EN mid-session (Problema 2 de 10 / Comprobar respuesta / Pista 1 / Mostrar la respuesta), progress dashboard recording real data (1 attempted, 0% first-try, 33s, 1 hint, 1 solution viewed, streak), 0 console errors, dev.log clean. No bugs found
- INFRA ISSUE FOUND & RESOLVED: the system dev server had been OOM-killed (kernel oom-kill of next-server at 1.77 GB RSS during Turbopack recompile churn; dmesg confirmed). Restarted it detached (setsid nohup, port 3000, appending to dev.log) and kept file-edit churn batched afterwards — server stayed healthy through the rest of the round
- NEW FEATURE 1 — Spaced-repetition review scheduling (src/lib/review.ts):
  - Leitner-style mastery levels 0–4 with intervals 2/4/7/14/30 days, persisted in localStorage key aula-practice-review (ReviewEntry: level, dueAt, scheduledAt, lastAccuracy)
  - scheduleFromSession runs when a session truly ends (same effect that appends the SessionRecord): only focused topic sessions with ≥3 attempted problems move the schedule; accuracy ≥0.8 levels up, <0.5 levels down; mixed/challenge/single sessions never touch it
  - resetProgress now also clears the review log; clearReview exported for that
  - Session summary gains "Next review: in 4 days · level 2 of 5" line (reads findReviewEntry after mount so it survives refreshes of ended summaries); verified in EN and ES ("Próximo repaso: en 4 días · nivel 2 de 5")
  - Home gains an amber "Review due / Repaso pendiente" band above the continue band when topics are overdue: count line, up to 3 topic chips linking into 10-problem sessions, +N overflow, "Review now / Repasar ahora" primary CTA into the most overdue topic
  - Progress dashboard topic rows gain review chips: amber "Review due / Repaso pendiente" link chip (straight into a session) when overdue, quiet "review in 2 days / repaso en 2 días" note with CalendarClock icon when upcoming
  - Browser-verified end-to-end: ended a 3-attempt quadratics session → localStorage entry with dueAt exactly +2 days (level 0, lastAccuracy 0); backdated dueAt → home band + dashboard due chip appear; restored ES/EN copy correct
- NEW FEATURE 2 — Topic search + quick filters on subject pages (src/views/subject.tsx rewrite):
  - Search box (accent-insensitive fold: "ecuac" matches "Ecuaciones"; matches ES+EN names, short descriptions, topic ids) with clear button
  - Filter chips All / Started / Not started / Needs work with live counts, disabled at 0; "Refuerza/Needs work" uses the ≥3 attempts & <50% first-try rule (shares the progress.ts definition via inline re-implementation)
  - Topics heading shows "n / total" while filtering; dashed empty state ("No matching topics") with clear-search-and-filters button
  - Weak badge now also renders on subject topic cards (same pill as dashboard)
  - React Compiler lint rule required dropping manual useMemo (inferred function deps) — plain derivations, compiler memoizes
- NEW FEATURE 3 — CSV export for tutors (src/lib/export.ts + utils.ts csvEscape/toCsv/downloadTextFile):
  - "Export / Exportar" dropdown on the progress dashboard header: "Problems (CSV)" (one row per problem record: ISO date, subject, topic name, ids, difficulty, template, seed, attempts, first-try, eventual, hints, reveals, time_sec) and "Sessions (CSV)" (one row per finished session: ended_at, mode, subjects, topic, review flag, counts, elapsed)
  - RFC-4180 escaping; UTF-8 BOM so Excel renders Spanish accents; filename aula-vega-{problems|sessions}-YYYYMMDD.csv; success toast
  - Browser-verified by stubbing URL.createObjectURL + anchor click: both files download with well-formed rows (spot-checked content of both)
- STYLING POLISH:
  - Sticky mobile progress strip in sessions: problem counter + timer/score chips + progress bar now pin below the header on <sm viewports (backdrop blur, border-b, negative-margin full-bleed) and stay static on desktop; restructured as a direct child of the tall session column so stickiness actually works (first attempt inside the header block would have been constrained to the header's height)
  - focus-visible rings on all large card links (subject topic cards, home subject cards) — keyboard a11y
  - Stat tiles on dashboard + session summary get hover lift (-translate-y-0.5 + shadow) matching the card language elsewhere
  - VLM review of the mobile sticky session screenshot: 8/10, strip cleanly pinned below header, no overflow (its one nitpick — an option badge overlap — checked against markup: gap-3 spacing, false positive)

Verification (all green):
- bun run validate:content → 418 templates · 0 errors · 0 warnings
- bunx tsc --noEmit (excl. examples/skills) → 0 errors; bun run lint → clean; dev.log → no runtime errors
- agent-browser: golden path, language switching, session refresh restore (with new layout, "Session restored" toast, 0 errors), physics circuits deep-link session, wrong-topic-id graceful empty state (validated by accident with a bad id — correct behavior shown), review scheduling end-to-end, home due band ES/EN, dashboard chips ES/EN, search/filter with accents + counts + empty state, both CSV exports, mobile 390px sticky strip (top: 64px verified after scroll), server healthy on port 3000

Stage Summary:
- Platform stable; zero product bugs found in QA; 3 substantial features shipped and browser-verified in both languages (spaced repetition across summary/home/dashboard, subject-page search+filters, CSV export)
- Infrastructure note: dev server is OOM-fragile under heavy hot-reload churn (4 GB sandbox) — batch edits and restart detached if it dies (dmesg shows the oom-kill)
- Next-round ideas: teacher-facing analytics UI on top of the CSV data (charts of first-try accuracy over time), worksheet difficulty-mix option, more Kirchhoff/multi-concept templates, review-due digest for multiple students (needs backend), per-subtopic review scheduling granularity

---
Task ID: 10
Agent: main (Z.ai Code) — scheduled review round 7
Task: QA sweep + bug fix (RadioGroup warning) + 3 new features (daily goal ring, activity heatmap + accuracy chart, worksheet warm-up ordering) + VLM-guided styling polish

Work Log:
- Reviewed worklog (rounds 1–9 complete: 418 templates, spaced repetition, CSV export, search/filters, session persistence, time tracking, smart resume, shortcuts help, retry/share, weak-topic suggestions); all gates green at start (validate 418·0/0, tsc clean, lint clean, server healthy on 3000)
- QA via agent-browser (fresh storage): golden path (factoring problem: wrong 4 → "Not yet" feedback → Hint 1 → correct 5 accepted as "2 attempts" → THE ANSWER IS → staged GIVEN/APPROACH/CALCULATION solution → next), MC problem with keyboard 1–3 selection + Ctrl⏎ check, session refresh restore (same problem, answered state disabled correctly), end-session dialog → summary with time stats/per-problem chips/actions, progress dashboard (8 stat cards, topic rows, recent sessions, activity), CSV exports (stubbed download, both files well-formed), worksheet mode, language switch EN→ES mid-session + on summary/dashboard, mobile 390px no overflow (home/progress/worksheet), 0 console errors
- BUG FOUND & FIXED: React warning "RadioGroup is changing from uncontrolled to controlled" on multiple-choice problems — answer-area.tsx passed `value={choice ?? undefined}` so the RadioGroup started uncontrolled; fixed to `value={choice ?? ""}` (empty string = controlled, no option matches). Verified: key-press selection + submit produce zero warnings (initial console listing was a stale buffer; patched console.warn to capture fresh — empty)
- INFRA ISSUE FOUND & RESOLVED (2nd occurrence, same as round 6): dev server OOM-killed again during heavy hot-reload churn (dmesg: next-server killed at ~1.5 GB anon-rss; 4 GB sandbox). Restarted with `(setsid bun run dev … &)` subshell pattern — NOTE: plain `setsid cmd &` from the tool shell died when the session ended; the subshell-parenthesized form survives across tool calls. Server stayed healthy after that
- NEW FEATURE 1 — Daily practice goal with progress ring (home):
  - src/lib/goal.ts: loadDailyGoal/saveDailyGoal (localStorage aula-daily-goal, default 10, validated 5–100), GOAL_CHOICES 5/10/15/20/30, countToday/firstTryToday derive from existing records (nothing extra to track)
  - TodayGoalCard band on home between review-due and continue bands: animated SVG ring (56px, stroke 6, 700ms dash-offset transition, tabular-nums count in center; check icon + success tint when done), "TODAY'S GOAL/Objetivo de hoy" header, "n of N problems · N to go/goal complete" line, goal picker DropdownMenuRadioGroup (5–30/day, persisted), CTA into quick 5-problem mixed session (label switches Start with one → Practice now at 0 → >0; hidden when done); primary tint in progress, success tint when complete
  - Verified: 0/10 fresh state, 3/5 partial (ring + "2 to go"), 5/5 complete (check in ring, no CTA, green tint), picker changes persist across reload, resetProgress keeps goal (preference, not progress), ES/EN copy, VLM 9/10 partial + 10/10 complete + 9/10 mobile
- NEW FEATURE 2 — Activity insights on the progress dashboard:
  - src/components/practice/activity-insights.tsx: ActivityHeatmap (GitHub-style 13-week calendar; per-day aggregation of records; 5 intensity levels bg-primary/25→full; month labels via date-fns locale; L/X/V or M/W/F weekday labels; native title tooltips + sr-only text per cell; today ring-highlight; less/more legend; active-days summary) + AccuracyTrend (shadcn ChartContainer/recharts ComposedChart: muted bars = problems per day (left axis), primary line = first-try % (right axis 0–100%, 0/50/100 ticks), locale date labels, ChartTooltipContent with per-day attempts + accuracy; dashed empty state when <2 active days)
  - ProgressView: new records state (loaded with stats in the same async effect, reset clears it), ACTIVITY/ACTIVIDAD SectionHeader section between the suggestion band and PROGRESS BY TOPIC
  - Verified with seeded 13-day history: 13 active days counted, heatmap cells/labels/legend render, trend chart shows both series with correct axes, tooltip on hover ("24 Sep · Problems 9 · First-try accuracy 78"), ES locale (jul/ago/sep, L/X/V), VLM 9/10 after fixing a real defect it caught (left y-axis tick labels were clipped by a negative chart margin — fixed margin left −22→−12 and axis width 34→42)
- NEW FEATURE 3 — Worksheet warm-up ordering:
  - worksheet.tsx: local `warmup` display-order toggle (Mixed ↔ Warm-up) in the no-print controls, only shown when difficulty is "any" and mode is not challenge; warm-up sorts a copy of the deck by difficulty rank easy→challenge (stable within level); problems list AND answer key both render the ordered deck; URL unchanged (order is a print-time choice, share links still reproducible)
  - Verified: quadratics 10-problem sheet — mixed order (all Media first originally) → warm-up reorders to Fácil first, answer key follows, ES copy (Mezclado/Calentamiento + title hint "De fácil a difícil")
- STYLING POLISH (VLM-guided): goal band uses the established band language (border-b, icon slot, uppercase tracking-wider header) with primary/success tints; insights cards match the dashboard card language (rounded-2xl border bg-card, hover:border-ring/50); heatmap has hover ring on active cells; chart dots stroked with var(--card) so they read on the line; VLM ratings: goal partial 9/10, complete 10/10, insights 9/10 (after axis fix), mobile goal 9/10, mobile insights 8.5/10 (both "cut-off" notes were scroll-position artifacts, checked against markup), dark goal 9/10, dark chart 8.5/10 (right-axis labels intentionally quiet)

Verification (all green):
- bun run validate:content → 418 templates · 0 errors · 0 warnings
- bunx tsc --noEmit (excl. examples/skills) → 0 errors; bun run lint → clean
- agent-browser: golden path + MC keyboard flow post-fix (zero console warnings), goal band all states + picker persistence, insights heatmap/trend/tooltip in both languages, warm-up ordering + answer-key consistency, reset clears records → empty state, mobile 390px no overflow on home/progress/worksheet, dark mode pass, dev.log healthy (after OOM restart)

Stage Summary:
- Platform stable; 1 real bug fixed (RadioGroup controlled/uncontrolled), 3 features shipped and browser-verified in both languages (daily goal ring, activity heatmap + accuracy trend chart, worksheet warm-up ordering) — dashboard now has a real analytics layer, home has a habit-building element, worksheets gained classroom ordering
- Infra note: dev server OOM-fragile under hot-reload churn (2nd documented occurrence); restart with `(setsid bun run dev … &)` subshell form — it survives across tool calls; batch edits when possible
- Next-round ideas: per-subtopic analytics granularity in the dashboard, accuracy trend per subject (math vs physics lines), goal-aware session end ("goal complete" celebration on summary), teacher-facing analytics UI (charts already in place for export), more content templates for thin topics, review-due digest email (needs backend)

---
Task ID: 11-b
Agent: content-physics (Z.ai Code subagent)
Task: Add 7 physics problem templates (5 to measurement-vectors.ts for the thin subtopics unit-vectors / scalar-vector / components ×2 / magnitude-direction, and 2 to circular-gravitation.ts for centripetal-acceleration), following the established bilingual template conventions and passing all content gates.

Work Log:
- Read worklog.md (Tasks 1–10 + 7-a/7-b top-up patterns: single-backslash corruption class, brace-adjacent-token rule, sigfig-2 conventions, hint-leak sweeps), GUIDE.md, lib/{problem,rng,types}.ts, validation/{answer,numeric,expression}.ts, validate-bank.ts, the MathText token pipeline (locale-aware {{n}} → {,} in ES math), the MC rendering path (options go through MathText, so LaTeX/tokens work there), then both target files in full.
- IDs follow each file's own prefix convention, NOT the task's speculative ids: the task suggested "vec-unit-01"/"cg-centacc-01", but vec-unit-01 already exists and centripetal-acceleration in the cg file is prefixed cg-accel-01 — so the new templates are numbered vec-unit-02 and cg-accel-02/cg-accel-03 (same policy 7-b applied with nm-/es- prefixes).
- Templates added (all with hand-curated rng.pick parameter sets, 3 progressive answer-free hints, 4 staged given→approach→calculation→result steps, bilingual L() everywhere, diagrams where topically natural):
  1. vec-scalar-02 (easy/expression, scalar-vector — thinnest subtopic 1→2): product k·A⃗ of a scalar and a unit-vector-notation vector; 7 curated (k, x, y) sets with k ∈ {2,3,4,5,−2,−3} incl. negative-k direction-flip variants; every component of k·A is a nonzero integer so no decimal input is ever needed; answer checked via the expression sampler (equivalent forms like 2*(3i+4j) or spaced input accepted); statement shows the answer format $a\,i + b\,j$ / $a*i + b*j$ with letters so the example can never leak the answer.
  2. vec-comp-02 (medium/multiple-choice, components 1→3): resolve a vector of magnitude A at angle θ into BOTH components; 8 curated (angle, mag) pairs over 30/37/53/60° with sin/cos quoted in the statement (37/53 give exact integer components, 30/60 give ≤2-decimal ones); distractors are the classic swapped-sin/cos, cos-for-both, sin-for-both pairs (all 4 distinct because cos θ ≠ sin θ for every set); vectors diagram with showComponents + grid, bounds from the computed tip.
  3. vec-comp-03 (easy/multiple-choice, components): recognize the angle from components via tan θ = Ay/Ax; 6 curated Pythagorean pairs (3-4-5 / 6-8-8-6 / 5-12 / 12-5) whose arctangent rounds to 53/37/67/23°; distractors = 90−θ (ratio flipped), 180−θ (supplement), 45° (assumed equal components) — pairwise distinct in every set; solution cross-checks with cos θ = Ax/|A|.
  4. vec-mag-02 (medium/numeric, magnitude-direction 2→3): |r⃗₁ − r⃗₂| between two drone position vectors — the difference-vector framing the subtopic lacked (vec-add-01/02 only ever sum); 6 curated position pairs whose difference is a Pythagorean triple (|D| ∈ {5, 10, 13} exact), two sets with a negative difference component; vectors diagram draws r1, r2 from the origin and the difference arrow chained from r2's tip to r1's tip; relative-0.01 tolerance matching vec-mag-01/vec-add-02.
  5. vec-unit-02 (medium/multiple-choice, unit-vectors 1→2): normalize a given vector to its unit vector; 6 curated ±(3,4)/(4,3)/(6,8)/(8,6) sets so |A| = 5 or 10 and the unit components are exactly ±0.6/±0.8; distractors = swapped components, unnormalized (x, y), divided-by-|A|²; result step verifies |û| = √(0.36 + 0.64) = 1.
  6. cg-accel-02 (easy/numeric-unit, centripetal-acceleration 1→3): a = ω²·r from angular speed on a carousel horse; 6 curated (ω, r) pairs (ω ∈ 0.5–2 rad/s, r ∈ 1.5–8 m, realistic ride values) with ω²·r exact (a ∈ {2, 3.2, 7.2, 9, 8, 6}); sigfig-2, units ["m/s^2","m/s²"] copied from cg-accel-01; approach step links ω²r to v²/r via v = ωr.
  7. cg-accel-03 (medium/numeric-unit, centripetal-acceleration): the INVERSE direction of a = v²/r the subtopic lacked — speed from measured centripetal acceleration, v = √(a·r); 6 curated (a, r) cornering pairs whose product is a perfect square (v ∈ {10, 15, 20, 40} m/s exact); result step converts to km/h (all exact); distinct from cg-accel-01 (forward a from v, r) and cg-accel-02 (ω form).
- Insertion method (edit discipline: one write per file): the 5+2 template bodies were authored as raw TS chunks in /tmp/t11b/*.ts via byte-exact quoted heredocs, then a /tmp splice script inserted each chunk before its subtopic-family banner (regex-anchored on the file's unique banner lines, dashes banner regenerated at the file's 72-char width) and wrote each project file exactly ONCE with fs.writeFileSync; a 3-line brace-adjacent-token defect I caught afterwards ($\sqrt{${tok(...)} — the exact locale-defect class reviewer 3-e fixed bank-wide) was repaired with 2 surgical MultiEdits adding the mandated space (`\sqrt{ ${tok(...)`), mirrored into the /tmp chunks; grep confirms 0 brace-adjacent tokens remain in all of src/content and 0 single-backslash LaTeX escapes + 0 control chars in both files.
- Throwaway audit (/tmp/t11b/audit.ts, NOT in the project): 7 templates × 25 seeds × both locales → **18,280 checks, 0 failures**: deterministic double-generate, exactly 3 hints, staged given→approach→calculation→result, even $-parity + non-empty + no control chars + finite {{tokens}} + no raw dot-decimals in ES math spans on statement/hints/answerDisplay/solution/MC options, MC exactly-one-correct + unique ids + 4 pairwise-distinct texts per locale, meta (subtopic/difficulty/questionType/estimatedTimeSec) match, hints never leak the final answer (digit-boundary regex with LaTeX-exponent stripping for numeric answers, correct-option-text containment for MC, component-string containment for the expression template), curated-set membership for every variant, plus INDEPENDENT physics recomputation parsed from the rendered EN statements (k·(xi+yj) products, A cosθ/A sinθ with the statement-quoted trig values, round(arctan(y/x)), |r₁−r₂| via hypot, û = (x/|A|, y/|A|) with |û| = 1 check, a = ω²r exactness, v = √(a·r) perfect-square exactness) cross-checked against the template's internal answers, and built-in validator accept/reject tests through checkAnswer: canonical answers accepted (incl. ES comma-decimal "3,2" + "m/s²" unit spelling, student-style expression forms like 2*(3i+4j) and spaced input), wrong answers rejected (wrong MC option, value+3 / ×2 / +5, wrong units flagged as wrong-unit, non-equivalent expressions). Separate reachability sweep: every curated set of all 7 templates occurs within seeds 1–2000.
- Audit false-positive handled: the leak regex initially flagged cg-accel-02 hint 2 for answer a = 2 — the "2" was the exponent in the hint's legitimate $v^2/r$ formula mention (same wording family as cg-accel-01's hint); fixed the AUDIT (strip LaTeX exponents before the digit-boundary test), not the template.
- Verification: `bun run validate:content` → **425 templates · 0 errors · 0 warnings** (418 baseline + my 7; the parallel math agent's 7 templates had not landed at this count — task said 432 would also be acceptable). `bunx tsc --noEmit` → 0 errors in src/ (only the pre-existing examples/ and skills/ errors, excluded per task). Bank ids unique (validator duplicate check passes).

Stage Summary:
- Files touched (only the 2 in scope): src/content/physics/measurement-vectors.ts (9→14 templates; subtopic counts now addition 4, magnitude-direction 3, unit-vectors 2, scalar-vector 2, components 3 — thinnest topic no longer thin) and src/content/physics/circular-gravitation.ts (10→12; centripetal-acceleration 1→3) — plus worklog.md; all scratch work confined to /tmp/t11b (never in the project).
- Templates added: vec-scalar-02 (easy/expression, scalar-vector), vec-comp-02 (medium/MC, components), vec-comp-03 (easy/MC, components), vec-mag-02 (medium/numeric, magnitude-direction, vectors diagram), vec-unit-02 (medium/MC, unit-vectors), cg-accel-02 (easy/numeric-unit, centripetal-acceleration, a = ω²r), cg-accel-03 (medium/numeric-unit, centripetal-acceleration, v = √(a·r)).
- All gates green: validator 425 · 0/0, tsc clean in src (examples/skills pre-existing noise only), 18,280-check dual-locale multi-seed audit with independent recomputation → 0 failures, all curated variants reachable in seeds 1–2000.
- Notes for future reviewers: (1) ids continue each file's prefix conventions (vec-unit-02 / cg-accel-02/03) rather than the task-speculated vec-unit-01/cg-centacc-01 because those slots are taken by other subtopic families; (2) the 3 self-caught brace-adjacent-token sites are now fixed and worth remembering whenever a ${tok()} lands right after a literal LaTeX brace — always write `{ ${tok(...)}`; (3) no physics constants were needed by these 7 templates (no g/G in centripetal-acceleration or pure-vector work), so the es-field-03-style constants-harmonization question is untouched; (4) /tmp/t11b contains the splice+audit scripts if anyone wants to re-run the audit: `cd /home/z/my-project && bun run /tmp/t11b/audit.ts`.

---
Task ID: 12
Agent: main (Z.ai Code) — content-quality program (user directive: reform the bank)
Task: Fase 1 completa de la reforma de calidad del banco: auditoría de las fuentes del Drive, rúbrica de dificultad por razonamiento, metadatos de procedencia/licencia, y primera muestra curada (valor absoluto) verificada programáticamente.

Work Log:
- Directiva del tutor: el banco actual confunde "números grandes" con dificultad. Nuevo estándar: razonamiento > tamaño; fuente real > variante generada; calidad > cantidad. Flujo: fuente → extraer → clasificar → verificar → estructurar → integrar. Dificultad: Fundamento/Estándar/Avanzado/Desafío según el proceso intelectual.
- FASE 1 — AUDITORÍA DEL DRIVE (carpeta 1W9iYhZKMy6nrcgAbHKzg5a434cR1NEct): 9 archivos identificados, descargados y analizados (curl + pdftotext + pdftoppm + VLM-OCR para escaneados):
  1. Kompetenzprofil Physik (6 págs.) — marco curricular oficial, calibración de nivel.
  2. FP-M-2010-HT.pdf (5 págs., escaneado) — NOTAS TRABAJADAS DEL TUTOR: |2x−1|=|3x+5| por casos; f=|2x+1|−|3x+2| vs g=−1; |·| vs parábola; |½x−2|−|¼+x| vs −⅓x+2. INSTRUCTOR_CREATED.
  3. Fundamentos de Matemáticas para Bachillerato (FCNM-ESPOL, 3.ª ed. 2017, 845 págs., © 2017) — REQUIRES_REVIEW: solo referencia.
  4. Übungsaufgaben Studienkolleg Bayern (23 págs. con soluciones) — OPEN_LICENSE. Incluye problema de parámetros (k: x²−kx+k+3). ÍTEM 5 EN CUARENTENA: la solución impresa (−3<x<1/3) contradice la re-derivación independiente ((−3,2)) — no se importa.
  5. clase 30-sep.pdf = FOS/BOS 2010 HT (texto) — OPEN_LICENSE.
  6. stknew FSP Mathematik WS 2019-2020 (27.01.2020, 180 min) — cálculo/álgebra lineal/3D: FUERA DE ALCANCE ACTUAL (requiere topics de cálculo). Registrado para la expansión.
  7. unknown-3pages.pdf = FOS/BOS 2011 + Lösungsvorschlag (escaneado, OCR VLM).
  8. desigualdades.jpeg — hoja de clase del tutor (los 3 problemas de valor absoluto). INSTRUCTOR_CREATED.
  9. preguntas.jpeg — Kurzkontrolle 1 del tutor (conjuntos, Venn 3 conjuntos, soluciones reales). INSTRUCTOR_CREATED.
- Nuevo registro de fuentes: src/content/sources/registry.ts (8 fuentes con licencia clasificada). Inventario completo: docs/source-inventory.md.
- NUEVA RÚBRICA DE DIFICULTAD: src/content/DIFFICULTY.md — Foundation/Standard/Advanced/Challenge por proceso intelectual, con anti-reglas (números grandes ≠ dificultad). Etiquetas i18n cambiadas: Fácil→Fundamento, Media→Estándar, Difícil→Avanzado (EN: Easy→Foundation, Medium→Standard, Hard→Advanced). Las claves enum internas (easy/medium/hard/challenge) se conservan para compatibilidad de URL/deep-links (mapa fijo documentado).
- ESQUEMA EXTENDIDO (src/lib/types.ts): SourceLicense (INSTRUCTOR_CREATED | OPEN_LICENSE | PUBLIC_DOMAIN | REQUIRES_REVIEW), SourceRef {sourceId, license, exerciseNumber?, page?}, ReasoningType (case-analysis | parameters | spurious | graphical | multi-concept | modeling | definition-hunting | estimation). ProblemTemplate acepta source?/reasoning? — fluye por template() sin cambios.
- VALIDADOR (scripts/validate-bank.ts): valida sourceId contra el registro, licencia válida, PROHÍBE transcripciones de fuentes REQUIRES_REVIEW, reasoning contra el enum, y añade el resumen de procedencia al output.
- MUESTRA CURADA — 5 problemas reales transcritos tal cual, con verificación independiente (script /tmp/curated-blocks/verify.py, grid-scan de 12000 puntos por desigualdad):
  1. lin-abs-02 (hard/MC, abs-equations): |2x−1|=|3x+5| → {−6, −4/5}. Fuente: hoja del tutor. Casos con verificación |−13|=|−13|.
  2. lin-absi-02 (hard/MC, abs-inequalities): f=|2x+1|−|3x+2| > g=−1 → (−2,0). Tres tramos; los puntos de corte quedan dentro (f vale 1/3 y 1/2 ahí).
  3. pfn-grap-01 (hard/MC, poly-functions/graphs): |5/2x−15/2| vs ½x²−3x+13/2 → (−1,2)∪(4,7). Los 4 extremos son exactamente f=g (cortes, NO tangencias — verificado; el "]" de la hoja original era errata).
  4. quad-param-01 (hard/MC, quadratics/discriminant): ¿para qué k tiene x²−kx+k+3=0 exactamente dos soluciones reales distintas? → k<−2 ∨ k>6. Fuente: Übungsaufgaben Bayern. Con controles k=0 (falla ✓) y k=7 (vale ✓).
  5. poly-eq-03 (medium/MC, polynomials/equations): soluciones reales de (x+2)(x−5)(x²+9)(x²−25)=0 → {−5,−2,5}. x²+9 no aporta (±3i descartados). Fuente: Kurzkontrolle 1.
- RE-ETIQUETADO HONESTO (primer tramo): lin-abs-01 medium→easy (|x−h|=k es Fundamento), lin-absi-01 hard→medium (contar enteros es Estándar). lin-abs-02/lin-absi-02/pfn-grap-01/quad-param-01 entran ya como Avanzado.
- Problemas de ingeniería resueltos en el camino: (a) corrupción de \t (JSON→TAB) en LaTeX tfrac al usar Edit — regenerados con generador python (r-strings + ts_double) y corregidos por cirugía de líneas; (b) comas faltantes entre elementos de array del bloque generado — parcheados por regex; (c) \mathbb{{R}} de doble llave → \mathbb{R}; (d) colisión de id poly-eq-01/02 existentes → el curado es poly-eq-03; (e) artefacto de escaneo en mi verificador (doble conteo junto a raíces exactas) — corregido el script, no el problema.
- QA agent-browser: sesión enfocada abs-equations nivel Avanzado → problema curado renderiza (VLM 9/10, fracciones correctas), respuesta errónea → feedback, revelado → "THE ANSWER IS x=−6 o x=−4/5", nueva variante, opción correcta aceptada ("2 attempts"), solución escalonada GIVEN/APPROACH/CALCULATION con casos y verificaciones, copy ES verificado ("Resuelve la ecuación… por casos"), recarga limpia 0 errores de consola.

Verification (all green):
- bun run validate:content → 430 templates · 0 errors · 0 warnings · Provenance: 5 con fuente (tutor-fp-sheet-2024: 3, tutor-kurzkontrolle-1: 1, stk-bayern-ubung: 1) · registro: 8 fuentes (1 REQUIRES_REVIEW)
- bunx tsc --noEmit (excl. examples/skills) → 0 errores; bun run lint → limpio; dev.log sin errores nuevos (los 2 errores de console eran buffers HMR históricos — recarga fresca los descarta)
- /tmp/curated-blocks/verify.py → TODOS LOS PROBLEMAS CURADOS VERIFICADOS — 0 fallos (raíces exactas, regiones por grid-scan, fronteras de igualdad, controles de parámetros)

Stage Summary:
- La reforma de calidad está en marcha: auditoría de fuentes completa (9 archivos, licencias clasificadas), rúbrica de dificultad por razonamiento documentada y activa en UI, procedencia estructural (registro + validador), y 5 problemas reales del tutor/fuentes integrados y verificados.
- Pendiente / próximos pasos (por prioridad):
  1. Fase 2 matemáticas: importar el resto de la Übungsaufgaben (división de polinomios §1, desigualdades §5 menos el ítem en cuarentena, log §8) + FOS/BOS 2010/2011 ítem por ítem.
  2. Resolver la cuarentena del ítem 5 (desigualdad racional) con el tutor: la solución impresa es incorrecta o el enunciado impreso difiere del transcrito.
  3. Re-auditoría de dificultad del banco legado (425 generados) — solo linear-equations rehecho; falta quadratics completo, poly-functions, polynomials y el resto (documentado en DIFFICULTY.md, orden fijado).
  4. Física: muestra curada con razonamiento de modelo (no sustitución) — pendiente de más fuentes de física o aprobación de diseño guiado por Kompetenzprofil.
  5. Topics de cálculo (límites/series/derivadas/integrales) para desbloquear el FSP 2020 (nivel Challenge real) — requiere decisión del tutor sobre el plan de estudios.
  6. Fundamentos (FCNM-ESPOL): pedir al tutor confirmación de uso privado; mientras tanto solo referencia.
  7. Colecciones (Practice/Challenge/Teacher's Picks), filtros por reasoningType/fuente, y problemas multiparte (estilo FSP) — fases posteriores de UI, tras el contenido.

---
Task ID: 13
Agent: main (Z.ai Code) — scheduled review round 8 + tutor ESPOL authorization
Task: QA de la Fase 2 sin documentar (27 plantillas FOS/BOS+Bayern, SourceBadge, filtro curados) + actualización del registro de fuentes con la autorización del tutor para el libro ESPOL + primer lote curado ESPOL.

Work Log (interino — se amplía al cierre):
- Contexto: la sesión anterior (Fase 2, commit dab57ba 04:56) importó 27 plantillas curadas (fos-bos-2010-ht: 10, fos-bos-2011: 7, stk-bayern-ubung: 11) en 9 archivos math, creó src/components/practice/source-badge.tsx, el filtro "solo curados" (c=1 en URL, session.ts/router.ts/views/topic.tsx, curatedOnly en types.ts) — pero se cortó ANTES del QA runtime y ANTES de actualizar este worklog. Gates estáticos ya verdes: validate 457·0/0, tsc limpio (solo ruido examples/skills excluido), lint limpio.
- MENSAJE DEL TUTOR (este chat): "tengo total permiso para usar los ejercicios del libro de la ESPOL… De la cuestión legal me encargo yo" — resuelve el pendiente #6 de la Task 12 y la decisión 4 del inventario (fcnm-fundamentos estaba REQUIRES_REVIEW "solo referencia"). Se procede a reclasificar la fuente e importar el primer lote.
- QA agent-browser de la Fase 2: home OK; tema logarithmic → BUG: el toggle "solo curados" mostraba las claves crudas topic.curatedOnly/topic.curatedHint (la sesión anterior añadió las claves source.* al diccionario pero NO estas dos — se cortó antes). CORREGIDO: añadidas ambas claves a ES y EN junto al resto del bloque topic.*. Verificado: "Real exam sources only / Verified official exams and collections: 3 real exam problems" y "Solo problemas de fuentes reales / …4 problemas de examen real" (quadratics).
- Mejora proactiva en source-badge.tsx: añadida etiqueta kind "textbook" (ES "Libro de texto" / EN "Textbook") al KIND_LABEL — necesaria para la fuente ESPOL que entra esta ronda; sin ella el badge mostraría la cadena cruda "textbook".
- Flujo curado verificado end-to-end (logarithmic, c=1, EN y ES): sesión 1/10 con problema real de Bayern 8.2.5c (log₂(x+2)+log₂x−log₂3=0, raíz espuria) → respuesta −3 rechazada ("Not yet") → Hint 1 (dominio) → respuesta 1 aceptada ("2 attempts") → solución escalonada GIVEN/APPROACH/CALCULATION/RESULT con "is discarded" para −3 → siguiente problema también curado (8.2.1d) → cambio ES a mitad de sesión OK ("Problema 2 de 10", "Comprobar respuesta") → 0 errores de consola. VLM sobre captura del badge: 10/10 (pill limpia, sin overflow, KaTeX correcto).
- AUTORIZACIÓN ESPOL APLICADA (pendiente #6 de Task 12 resuelto):
  - types.ts: nueva clase de licencia TUTOR_LICENSED ("obra de terceros cuyo uso el tutor autorizó explícitamente; la responsabilidad de la autorización es del tutor") — válida también en validate-bank.ts.
  - registry.ts: fcnm-fundamentos REQUIRES_REVIEW → TUTOR_LICENSED, use actualizado con la declaración del tutor (2026-10-01), short "Fundamentos ESPOL"/"ESPOL Fundamentals" (ya no "solo referencia").
  - docs/source-inventory.md: fila 3 de la tabla y decisión 4 actualizadas (AUTORIZADO).
- PRIMER LOTE CURADO ESPOL — 8 problemas del libro (Cap. 3 Números Reales), seleccionados tras explorar el PDF con pdftoppm+VLM-OCR (offset PDF = página libro + 27; se descartaron conjuntos/lógica por no existir topic en el currículo, y el FundaRETO del cartero por ser fuera de currículo):
  1. found-pct-03 (medium/numeric, percentages, p.212 ex.2d): 33% de 45 5/11 = 15 exacto (33/11=3, 500/100=5)
  2. found-prop-03 (medium/numeric, ratios-proportions, p.213 ex.4a): 180 ejercicios en 3 días con la prima → 2 h/día (15 ej/h por persona)
  3. found-prop-04 (hard/MC, ratios-proportions, p.213 ex.4b): ganancia del agricultor → 5/6·G (900/1080 kg; se explicitó la proporcionalidad a semilla para dejar el modelo bien planteado — razón documentada)
  4. lin-abs-03 (easy/numeric, abs-equations, p.222 ex.2b): |π−8|+π = 8 (cancelación del π)
  5. lin-abs-04 (medium/numeric, abs-equations, p.222 ex.2a): |1−|3−5|−|1−7|| = 7 (evaluación por capas)
  6. rat-add-05 (medium/expression, add-sub, p.205 ex.2a): (1/10)(1/(x−5)−1/(x+5)) = 1/(x²−25)
  7. rad-simp-03 (hard/expression, simplifying, p.205 ex.2b): producto con conjugado (x+√(x²+1)) → 1/√(x²+1)
  8. rad-fexp-03 (hard/MC, fractional-exponents, p.205 ex.3): la expresión-monstruo F = [7^(−3/2)·7^(4/5)·Q(x)]³ con Q(x)=1 → F = 7^(−21/10), preguntada como k en F = 7^k
  - Verificación independiente ANTES de integrar: /tmp/curated-espol/verify.py → 19/19 checks (fracciones exactas, identidades por muestreo multi-punto, razón 5/6, exponentes, distractores vivos).
  - Integración por chunks TS crudos (/tmp/curated-espol/chunks/, heredocs citados) + splice de una sola escritura por archivo (radicals.ts anclado al PRIMER "^];" porque tiene helpers gcd después del array — los otros 3 al último). Chequeo de corrupción a nivel FUENTE: 0 backslash-simple en literales (la clase histórica).
  - Audit dual-locale (/tmp/curated-espol/audit.ts, seeds 1/42/777/123456): 1023 checks, 0 failures — determinismo, ES≠EN, 3 pistas, given→approach→calculation→result, $-paridad, MC 4+1 correcta+distintos+sin fugas, acepta/rechaza (incl. formas equivalentes −1/(25−x²), (x²+1)^(−1/2)), source/reasoning fluyen al Problem, MC fijo estable entre seeds. NOTA: 32 "fallos" iniciales eran de MI propio regex de escape mal diseñado (buscaba backslash-simple en strings runtime, que es correcto que exista); se eliminó el check bogus y se añadió el check a nivel fuente correcto.
- NUEVA FUNCIÓN 1 — ReasoningBadge (src/components/practice/reasoning-badge.tsx): chip punteado con icono Brain que muestra el razonamiento dominante del problema (la taxonomía existía en los datos pero nunca se mostraba): 8 tipos con etiquetas idiomáticas ES/EN y tooltip explicativo ("Este ejercicio exige separar el problema en casos…"). Integrado en el meta row de problem-view tras el SourceBadge. Clave i18n reasoning.label.
- NUEVA FUNCIÓN 2 — ProvenancePanel (src/components/practice/provenance-panel.tsx): sección "FUENTES REALES" en el dashboard de progreso que agrega los records por fuente curada (mapa templateId→source vía getAllTemplates): icono por tipo de fuente (examen/colección/libro/hoja), nombre corto, origen, nº de problemas con singular/plural correcto ("1 problema"/"3 problemas"), % al primer intento con meter de color umbral (≥70 success / ≥40 medium / resto destructive) y progressbar accesible. Oculto mientras no haya records curados. Colocado dentro de la sección ACTIVIDAD tras el heatmap y la tendencia.
- Refinamientos de copy: topic.curatedOnly EN "Real exam sources only"→"Real source problems only"; topic.curatedHint actualizado para incluir libro de texto ("examen, libro o clase real"); plurales ES/EN del panel (problems/problemsPlural, subtitle/subtitlePlural).
- QA browser de todo lo nuevo: sesión curada foundations c=1 → problema ESPOL 3.8·4a en vivo con badge "Libro de texto: Fundamentos de Matemáticas para Bachillerato… · ej. 3.8 · 4a", respuesta 2 aceptada ("¡Correcto! Bien resuelto"), solución escalonada DATOS/PLANTEAMIENTO/CÁLCULO/RESULTADO; ReasoningBadge verificado en problema Bayern (Definiciones al detalle) — VLM: meta row de 3 chips limpio y coherente; ProvenancePanel verificado ES ("FUENTES REALES · 3 problemas… · 1 problema · 100% al primer intento") y EN ("REAL SOURCES"); móvil 390px dashboard 6/10 (el "corte" señalado era el fold del scroll — artefacto) y problema 8/10 (advertencias especulativas de flex-wrap preexistente); 0 errores de consola en todos los pasos.

Verification (all green):
- bun run validate:content → 465 templates · 0 errors · 0 warnings · fcnm-fundamentos: 8 · registro: 8 fuentes (0 REQUIRES_REVIEW)
- bunx tsc --noEmit (excl. examples/skills) → 0 errores; bun run lint → limpio
- /tmp/curated-espol/verify.py → 19/19; /tmp/curated-espol/audit.ts → 1023 checks, 0 failures
- agent-browser: flujo curado ESPOL completo (badge → respuesta → solución), ReasoningBadge, ProvenancePanel ES/EN, móvil, consola limpia

Stage Summary:
- El permiso ESPOL del tutor quedó registrado estructuralmente (TUTOR_LICENSED) y el primer lote de 8 problemas REALES del libro está integrado y verificado: el banco pasa de 457 a 465 plantillas con 40 curadas de 5 fuentes distintas (exámenes FOS/BOS ×2, Bayern, hojas del tutor, libro ESPOL). El registro ya no tiene ninguna fuente en cuarentena.
- 2 funciones nuevas visibles para el estudiante (ReasoningBadge + ProvenancePanel) que hacen tangible el programa de calidad ("razonamiento > tamaño", "fuente real > variante"): ahora el estudiante VE de dónde viene cada problema y qué tipo de pensamiento exige.
- Pendiente / próximos pasos (prioridad):
  1. Continuar la importación ESPOL por capítulos (el libro tiene ~15 capítulos y 845 págs.; siguientes buenos candidatos: trigonometría, geometría analítica, desigualdades — mapear a topics existentes; TOC completo pendiente de extraer más allá del cap. 3).
  2. Re-auditoría de dificultad del banco legado (solo linear-equations + algunos retoques hechos; falta quadratics completo, poly-functions, polynomials y el resto — orden en DIFFICULTY.md).
  3. Cuarentena Bayern ítem 5 (desigualdad racional) — requiere decisión del tutor.
  4. Física curada con razonamiento de modelo (Kompetenzprofil como guía de diseño).
  5. Topics de cálculo para desbloquear el FSP 2020 (decisión del tutor).
  6. Ideas UI del worklog anterior aún vivas: per-subtopic analytics, goal-aware celebration en el resumen de sesión, filtros por reasoning/fuente en la vista de tema.

---
Task ID: 14
Agent: main (Z.ai Code) — scheduled review round 9 + tutor identity & rebranding directive
Task: QA de estabilidad + directiva del tutor Sebastián Calderón: rebranding completo a "Profe Dirac" (WhatsApp +593999595175 preferente, email asecald@gmail.com), eliminación TOTAL del verde (paleta neutra cálida), y rediseño anti-"look IA" (más artesanal/editorial).

Work Log:
- Gates al inicio: validate 465·0/0, tsc limpio (solo ruido examples/skills), lint limpio, servidor 3000 OK.
- DIRECTIVA DEL TUTOR (este chat): nombre Sebastián Calderón, pseudónimo "Profe Dirac", WhatsApp +593999595175 (PREFERIDO sobre correo), email asecald@gmail.com, NO le gusta el verde (quiere neutros sin verde), y opina que el sitio "se ve muy hecho por IA".
- REBRANDING (src/config/site.ts reescrito): tutorName "Sebastián Calderón", brandName "Profe Dirac", monogram "δ" (delta de Dirac — nuevo campo que reemplaza initials), whatsapp { number: "593999595175", display: "+593 99 959 5175" }, email real, bookingUrl/socials ELIMINADOS (eran placeholders cal.com/example — el mayor "tell" de IA), bio reescrita sin inventar credenciales ("más de diez años" eliminado), site.url → profedirac.com (placeholder de dominio futuro).
- PALETA "tinta, arcilla y latón" (globals.css completo): verde/teal ELIMINADO al 100% (hues 152/172 → 0 apariciones). Primary = tinta grafito oklch(0.32 0.014 70) (botones tipo letterpress). Subject math = grafito, physics = arcilla oklch(0.50 0.115 42). Success = latón oklch(0.50 0.10 75) (la "estrella dorada" del profe — ya no verde). Dificultad = rampa térmica terracota (arena 0.62/0.08/80 → ocre → arcilla → oxblood 0.40/0.12/28). Dark mode espejado (pizarra de tiza). Print palette también despintada de teal. Radius 0.625→0.375rem + --radius-2xl/3xl conectados a la variable (esquinas editoriales).
- TIPOGRAFÍA (layout.tsx): Inter → IBM Plex Sans (UI), Source Serif 4 → Fraunces con ejes opsz/SOFT (display), JetBrains Mono se mantiene. Variables renombradas (--font-ui, --font-serif-display). Metadata + JSON-LD Person con alternateName "Profe Dirac", telephone, email real. themeColor actualizado.
- MARCA: src/app/icon.svg NUEVO (favicon δ sobre tinta), public/logo.svg reemplazado (la Z del template), public/tutor.svg rehecho como ex-libris tipográfico (marco doble, δ grande, "PROFE DIRAC" espaciado, ⟨ψ|φ⟩ en arcilla).
- COPY (dictionary.ts ES+EN): hero "Entender está bien. / Resolver es lo que cuenta." (acento serif itálico en arcilla), badge→overline editorial con δ, bio en primera persona del profe, CTA "manda foto del problema por WhatsApp", about.whyDirac.* (¿Por qué «Dirac»? — Paul Dirac, ecuaciones cortas sin símbolos de más; "el seudónimo empezó como broma y se quedó"), footer.contact.fastest/note, practice.askTutor(±message), home.section.* ("§ 1 · Las materias"…). Sección about "la firma de la casa" con ∫δ(x−a)f(x)dx=f(a).
- COMPONENTES: header.tsx BrandMark = sello δ con filo interior (rounded-md, italic serif). footer.tsx reescrito: WhatsApp primero (destacado, con nota "respondo más rápido"), email segundo, línea "Hecho a mano — sin plantillas ni relleno." about.tsx: sección whyDirac con notebook-margin, contacto WhatsApp-primero. home.tsx: HeroCurve → PIZARRRA SVG artesanal (marco de madera arcilla, tiza: δ(x−a) con pico y eje, ∫δ(x−a)f(x)dx=f(a), ⟨ψ|φ⟩, ecuaciones fantasma de tiza, PIEZA DE TIZA y BORRADOR en la repisa — VLM: "el toque maestro de humanidad"), overline con δ, stats con separadores hairline, tarjetas rounded-lg con bordes en hover, CTA band = tinta con marca de agua δ gigante.
- NUEVA FUNCIÓN — "¿No sale? Pregúntame" (session-view.tsx): enlace discreto a WhatsApp bajo el problema (siempre visible en bottom actions), con mensaje PRE-RELLENADO que incluye el tema (topicName/subjectLabel según modo) y el enunciado del problema (LaTeX/markup pelado, 140 chars). AskTutorLink component + askTutorHref useMemo. VERIFICADO en vivo: URL wa.me/593999595175?text=... con "Hola profe Dirac: estoy practicando Funciones y ecuaciones cuadráticas y me atascué en este problema: Calcula el vértice…" (ES) y equivalente EN.
- Detalle artesanal: notebook-margin (línea vertical arcilla al 42% dentro de la tarjeta del problema — margen de cuaderno escolar) aplicada a problem-view.tsx; bg-paper-grain (grano de papel feTurbulence al 5%, multiply/overlay según tema) en el hero; rule-label (§ + mayúsculas + filete) en secciones.
- FIXES de QA propia+VLM: (a) overline contraste bajo → foreground/75; (b) stats flotantes → grid 3 cols con border-l; (c) badge "Fundamento" casi invisible → diff-easy oscurecido 0.70→0.62; (d) botón "Desafío" huérfano en selectores de dificultad (practice-config.tsx y topic.tsx) → grid grid-cols-3 sm:grid-cols-5 (5 botones en una fila en desktop, 3+2 en móvil); (e) CalendarClock import restaurado tras 500 transitorio.
- QA browser completo: home ES/EN (título "Profe Dirac — Práctica de Matemáticas y Física"), flujo dorado quadratics k=7 (MC: incorrecta→"Not yet"→pista H→correcta aceptada→Next), cambio ES mid-sesión, about completo, móvil 390px home/progress/session SIN overflow, dark mode (paleta cálida consistente, pizarra integrada), footer sticky en página larga, consola sin errores reales (solo buffers HMR históricos), dev.log limpio (GET / 200).
- VLM (4 rondas): "Sin rastro de verde/teal — terracota sofisticado y artesanal"; pizarra "demuestra autoría temática inmediata, la tiza es el toque maestro"; tipografía "revista científica de lujo, no la típica Inter+Bold"; logo "sello personal, no un logo de Midjourney con gradientes"; ex-libris "perfecto"; fixes posteriores confirmados (grid ordenado, Fundamento legible).

Verification (all green):
- bunx tsc --noEmit → 0 errores (excl. examples/skills); bun run lint → limpio
- bun run validate:content → 465 templates · 0 errors · 0 warnings · 40 curadas · 8 fuentes
- agent-browser: flujo completo + móvil + dark + WhatsApp links verificados con texto pre-rellenado ES/EN
- 0 verde/teal en src (rg oklch hues 152/172 → solo aparecen… ninguno; paleta 100% warm-neutral)

Stage Summary:
- Rebranding COMPLETO a Profe Dirac con identidad real (nombre, WhatsApp preferente, email), cero placeholders. Las tres directrices del tutor cumplidas: sin verde (paleta tinta/arcilla/latón), WhatsApp-primero en TODOS los puntos de contacto (footer, about, home, y el nuevo "¿No sale? Pregúntame" en plena sesión con contexto del problema), y diseño editorial artesanal (pizarra de tiza con notación de Dirac, ex-libris tipográfico, sello δ, Fraunces+Plex, margen de cuaderno, grano de papel, copy con voz de profe real).
- La función "Pregúntame" convierte el canal preferido del tutor en feature del producto: el estudiante atascado manda el problema con un clic.
- Pendiente / próximos pasos (prioridad):
  1. El tutor debe reemplazar public/tutor.svg por su foto real cuando la tenga (siteConfig.photo apunta ahí; el ex-libris es el placeholder digno).
  2. Dominio real: siteConfig.site.url usa profedirac.com como placeholder — confirmar dominio cuando exista (metadata/OpenGraph/JSON-LD lo usan).
  3. Re-auditoría de dificultad del banco legado (solo linear-equations rehecho; orden en DIFFICULTY.md) — sigue siendo el pendiente #1 de contenido.
  4. Continuar importación ESPOL por capítulos (trigonometría, geometría analítica, desigualdades).
  5. Cuarentena Bayern ítem 5 + física curada con Kompetenzprofil — requieren decisión del tutor.
  6. Ideas UI vivas: per-subtopic analytics, filtros por reasoning/fuente en la vista de tema.

---
Task ID: 15
Agent: main (Z.ai Code) — scheduled review round 10
Task: QA post-rebranding + fix de restos de marca antigua + función nueva (chips de dominio por subtema) + lote de detalles editoriales (worksheet con contacto del profe, número fantasma de ejercicio, doble línea de cabecera).

Work Log:
- Gates al inicio: validate 465·0/0, tsc limpio, lint limpio, servidor 3000 OK (dev.log sin 500s nuevos — los 2 visibles son los históricos de Task 14 ya documentados).
- QA con trampa de errores fresca (window.onerror + unhandledrejection): navegación home→physics→progress→sesión física kinematics k=3 → 0 errores JS. VLM física: paleta cálida sin verde, KaTeX/unidades perfectas, "cuaderno de física clásico".
- Confeti de celebración y heatmap revisados: usan var(--success)/var(--primary) → se adaptaron solos a latón/tinta en el rebranding. Sin verde residual.
- BUGS DE REBRANDING INCOMPLETO (Task 14 dejó restos) — ENCONTRADOS Y CORREGIDOS:
  1. src/lib/export.ts: nombres de CSV "aula-vega-problems/sessions-*.csv" → "profe-dirac-*.csv".
  2. dictionary.ts "summary.report.title" ES+EN: "…— Aula Vega" → "…— Profe Dirac" (el reporte copiable que el estudiante manda al profe).
  3. dictionary.ts "worksheet.footer" ES+EN: "Generado con Aula Vega" → "Generado con Profe Dirac".
  Barrido completo rg -i "vega" → 0 restos reales (solo falso positivo "navega" en trig-applications).
- NUEVA FUNCIÓN — Chips de dominio por subtema (topic.tsx): los chips de apartado del tema ahora muestran el dominio del estudiante "primer-intento/total" (p.ej. "0/1") con color por umbral — ≥70% latón (success), ≥40% ocre (diff-medium), <40% oxblood (destructive) — reemplazando la píldora de nº de plantillas cuando hay historial (el nº pasa al tooltip junto con "Aciertos al primer intento"). Usa progress.bySubtopic (ya computado; clave subtopicKey importada). Datos reales verificados en vivo: "Discriminante 0/1" tras la sesión de QA previa. i18n topic.subtopic.mastery ES/EN.
- DETALLES EDITORIALES (worksheet.tsx): (a) encabezado de la hoja impresa ahora "δ PROFE DIRAC" (delta serif itálica en arcilla + tracking amplio); (b) NUEVA línea de contacto bajo las instrucciones: "¿Dudas con la hoja? Escríbeme por WhatsApp: +593 99 959 5175 · asecald@gmail.com" (worksheet.contact ES/EN con {phone}/{email} desde siteConfig) — el WhatsApp del profe llega al PAPEL, como una hoja real de clase.
- DETALLES EDITORIALES (sesión): número fantasma de ejercicio en la tarjeta del problema — sello serif itálico text-6xl/7xl al 7% de opacidad, esquina sup. derecha, pointer-events-none. ProblemView recibe prop opcional `number`; session-view pasa index+1. Verificado en DOM ("GHOST: 1").
- DETALLES EDITORIALES (globals.css): doble línea de periódico bajo la cabecera — .site-header { box-shadow: 0 3px 0 -2px var(--border) } (segunda hairline 3px bajo el border-b). Confirmada computada en vivo.
- QA del lote: tsc limpio, lint limpio, validate 465·0/0. Móvil 390px tema con chips de dominio SIN overflow. VLM 3 vistas: chip 0/1 "claro y distintivo, color rojo indica umbral bajo, integración excelente"; número fantasma "elegante, no estorba, toque académico sofisticado"; hoja "δ PROFE DIRAC confirmado, formal y profesional".
- Fix menor de proceso: MultiEdit parcial ante old_str no único (primer intento mezcló dictionary keys en topic.tsx) — verificado estado real del archivo antes de reintentar (import y bloque ya aplicados; solo faltaban las claves i18n).

Verification (all green):
- bunx tsc --noEmit → 0 errores (excl. examples/skills); bun run lint → limpio; bun run validate:content → 465·0/0
- agent-browser: 0 errores JS con trampa fresca; chips de dominio con datos reales; ghost number en DOM; sombra doble del header computada; móvil sin overflow
- VLM: 3 vistas nuevas aprobadas con elogios específicos

Stage Summary:
- Proyecto ESTABLE y evolucionando: el rebranding Task 14 quedó ahora 100% completo (los restos de "Aula Vega" en CSVs/reportes/hojas eran el último rastro) y la plataforma gana su primera superficie de analítica contextual (dominio por subtema donde eliges qué practicar) + artefactos físicos con la identidad del profe (hoja impresa con δ y WhatsApp).
- Estado: 465 plantillas (40 curadas de 5 fuentes reales), doble idioma, 3 gates verdes, 0 bugs abiertos conocidos.
- Pendiente / próximos pasos (prioridad):
  1. Re-auditoría de dificultad del banco legado (solo linear-equations rehecho; orden fijado en DIFFICULTY.md: quadratics → poly-functions → polynomials) — pendiente #1 de contenido.
  2. Continuar importación ESPOL por capítulos (trigonometría, geometría analítica, desigualdades) — el libro tiene ~15 capítulos por mapear.
  3. Cuarentena Bayern ítem 5 (desigualdad racional con solución impresa contradictoria) + física curada guiada por Kompetenzprofil — requieren decisión del tutor.
  4. Foto real del tutor (public/tutor.svg es el ex-libris placeholder) y dominio definitivo (site.url placeholder profedirac.com).
  5. Ideas UI vivas: filtro por tipo de razonamiento en la vista de tema (la taxonomía ya existe y se muestra con ReasoningBadge), goal-aware celebration, colecciones (Teacher's Picks).
---
Task ID: 17-a
Agent: main (Z.ai Code) — new feature: "Repaso integrador" (interleaved consolidation mode)
Task: Responder a la queja del tutor "los temas van de forma lineal, quiero que se consolide los conocimientos entre sí": nuevo modo de sesión "interleaved" con disciplina de intercalado (ningún problema consecutivo del mismo tema, round-robin por temas, weakest-first), filtro excludeEasy ("sin problemas de Fundamento" — los fáciles se hacen en clase), selector de modo en la página de práctica, badge + overline "TEMA · …" en sesión, CTAs en home y materia, y eliminación del sesgo easyWeighted de la práctica rápida.

Work Log:
- DIRECTIVA DEL TUTOR (este chat): los temas avanzan lineal y nunca se consolida el conocimiento ENTRE temas. Solución insignia: práctica intercalada (interleaving) con espaciado disciplinado + conciencia de debilidades.
- NÚCLEO — src/lib/session.ts:
  - SessionMode + "interleaved" (types.ts). SessionConfig.excludeEasy?: boolean.
  - interleavedOrder(): agrupa el pool por topicId (fallback a subtopicId si todo el pool es un solo tema → un tema con varios apartados también intercala); colas por grupo en orden debilidad (media de first-try accuracy de los subtemas con historial; desconocido = 1 "no débil" → estudiante nuevo degrada a round-robin barajado); rotación estricta last+1 (con ≥2 grupos NUNCA hay dos consecutivos del mismo tema); dentro de cada grupo las tarjetas se barajan y se ordenan por subtopic más débil primero (sort estable). Cuando la pila de un tema se agota se re-reparte (barajado fresco) → el espaciado vive para siempre en sesiones largas. Todo el azar vía Rng sembrado con hashString(`interleave:${seed}`) → determinista; el stream se genera izquierda→derecha así que un batch más largo comparte prefijo con el corto (los batches de una sesión ilimitada continúan la rotación exactamente donde terminó el anterior: posición densa batchIndex*batchSize, independiente del espacio de semillas globalIndex*64 que se mantiene para variantes frescas).
  - excludeEasy en filterTemplates (después del filtro de dificultad); relajación: si el pool queda vacío por difficulty O excludeEasy → se re-filtra con difficulty:any + excludeEasy:false y difficultyRelaxed=true (banner "nivel ampliado" existente). Verificado: pool todo-easy relaja en vez de vaciar.
  - DeckOptions.weakSubtopics?: Record<subtopicKey, accuracy 0..1> — solo lo consume el modo interleaved; los demás modos pasan por el código original idéntico (rng.shuffle + guard anti-repetición; guard desactivado solo para interleaved donde la disciplina ya lo garantiza). weightedPool/easyWeighted se CONSERVAN (otros deep links).
- ROUTER (router.ts): m=interleaved parseado/serializado; ne=1 ↔ excludeEasy. Doc de params actualizada.
- BUG preexistente corregido de paso: handleNext calculaba batchIndex = floor(deck.length/BATCH)+1 → el batch 1 JAMÁS se usaba (0→2→3…). Ahora floor(deck.length/BATCH) (1,2,3…) — los batches ilimitados son secuenciales de verdad y el stream interleaved no tiene saltos. Sin impacto en el contrato de los modos viejos (seeds de variantes cambian, siguen siendo frescos).
- UI practice-config.tsx: selector de modo arriba de la tarjeta (2 tarjetas radio-style: "Práctica mixta" / "Repaso integrador" con descripciones de una línea, iconos Shuffle/Layers, aria-pressed). Al elegir integrador aparece el checkbox (border dashed, estilo cuaderno) "Sin problemas de Fundamento" — default ON — con hint "Los ejercicios de nivel Fundamento se trabajan en clase". Título+descripción de la página dinámicos según modo. Empezar/Hoja imprimible llevan m=interleaved&ne=1.
- UI sesión (session-view.tsx): badge terracota "Repaso integrador" (Layers) en la cabecera junto a la materia; overline "TEMA · {nombre}" (11px, tracking 0.16em, icono Layers) encima de la tarjeta de cada problema → el mezclado es VISIBLE al avanzar. Wiring de debilidades: weakSubtopicsOf() computa first-try accuracy por subtopicKey desde computeStats(loadProgress()).bySubtopic y se pasa a buildDeck SOLO en modo interleaved (con try/catch para modo privado). El enlace "¿No sale? Pregúntame" ahora incluye el tema concreto del problema actual (topicName || currentTopicName || subjectLabel) — el WhatsApp del profe recibe contexto incluso en sesión mixta/integradora.
- UI resumen (session-summary.tsx): subtítulo añade "· Repaso integrador" en modo interleaved. UI hoja (worksheet.tsx): título "Repaso integrador" (worksheet.titleInterleaved) y el orden "Calentamiento" se DESACTIVA para interleaved (ordenar fácil→difícil destruiría el espaciado); la hoja reconstruye con buildDeck(cfg) así que m/ne fluyen solos. NOTA de diseño: la hoja NO usa weakSubtopics (reproducible por URL, compartible entre estudiantes); la sesión sí (experiencia personal).
- HOME (home.tsx): nueva sección editorial "§ 2 · Repaso integrador" (method pasa a § 3, tutor a § 4) con tarjeta-enlace "Consolidar lo aprendido" (overline rule-label, serif, icono Layers, CTA "Empezar el repaso") → sesión directa m=interleaved&s=math,physics&n=10&ne=1. ELIMINADO easyWeighted de la práctica rápida (banda Zap y botón del objetivo diario — el tutor dijo que el sitio se sentía demasiado fácil; quick practice ya no triplica el peso de los fáciles). home.quick.desc actualizado ES/EN ("de cualquier nivel" / "any level").
- SUBJECT (subject.tsx): botón outline compacto "Repaso integrador de {subject}" bajo el header (junto al "Practicar esta materia" existente) → m=interleaved&s={subject}&n=10&ne=1.
- I18N (dictionary.ts ES+EN completos): practice.mode, practice.mode.mixed(.desc), practice.mode.interleaved(.desc), interleaved.title/desc/badge/excludeEasy(.hint)/topicLabel/home.title/home.desc/home.cta/subject.cta, home.section.consolidate, worksheet.titleInterleaved, renumeración home.section.method/tutor. Voz ES primaria y natural: "Mezcla de temas con espaciado inteligente: ningún problema consecutivo del mismo tema".
- VERIFICACIÓN ALGORÍTMICA (/home/z/tmp-qa-17a/test-interleave.ts, 14 checks + test-realbank.ts, 6 checks — TODO PASS): no-adjacencia (20 problemas/4 temas y banco real 465→20 problemas de 20 TEMAS DISTINTOS), primera pasada toca todos los temas, determinismo por seed, prefijo batch 10⊂20, batchIndex 1 continúa el MISMO stream, tema más débil lidera el deck, subtopic débil se reparte primero, excludeEasy filtra + relaja, pool de un solo tema intercala subtemas, modos mixed/single intactos, variante fresca por ocurrencia (40 problemas sin semilla repetida), sin adjacencia en 5 seeds sobre el banco real.
- QA agent-browser (sesión task17a, trampa de errores fresca): home ES→tarjeta "Consolidar lo aprendido" con URL correcta (m=interleaved&s=math,physics&d=any&n=10&k=…&ne=1) y práctica rápida SIN w=easy; sesión interleaved ambos subjects → 6 problemas consecutivos con overlines TODOS distintos (Magnetismo → Movimiento rotacional → Funciones exponenciales → Herramientas matemáticas → Fundamentos de trigonometría → Práctica mixta de física), NINGUNO "Fundamento" (solo Estándar/Avanzado), badge "Repaso integrador" visible; math subject → 5 problemas 5 temas distintos con KaTeX renderizando (1-3 elementos por problema); práctica-config: selector de modo, título dinámico, checkbox default ON, ne=1 aparece/desaparece al togglear, hoja imprimible con mismos params; worksheet interleaved → título "Repaso integrador", SIN toggle Calentamiento, 0/10 Fundamento; resumen "Matemáticas · Repaso integrador"; EN verificado (Interleaved review, No Foundation-level problems, Topic · Electromagnetic Induction, Interleaved review of Physics, Consolidate what you've learned); WhatsApp "Pregúntame" con tema concreto ("I'm practicing Logarithmic Functions…"); móvil 390px sesión/config/home SIN overflow horizontal (scrollW=390); dark mode consistente (paleta tinta cálida, tarjeta interleaved resaltada, checkbox dashed visible — VLM 2 imágenes aprobadas); sesión topic (quadratics) SIN badge/overline (regresión OK); 0 errores JS y 0 en consola en TODOS los pasos; dev.log sin 500s.
- NOTA: el banco pasó de 465 a 470 plantillas durante esta tarea (agentes paralelos editando contenido — prohibido tocarlo aquí; el validador sigue en 0/0).

Verification (all green):
- bun run validate:content → 470 templates · 0 errors · 0 warnings (crecimiento del banco es de agentes paralelos de contenido)
- bunx tsc --noEmit → 0 errores en src/ (solo ruido preexistente examples/skills); bun run lint → limpio
- /home/z/tmp-qa-17a/test-interleave.ts → 14/14 PASS; test-realbank.ts → 6/6 PASS
- agent-browser: flujo completo interleaved ES/EN + móvil 390px + dark + hoja + regresión modos viejos + consola limpia (screenshots en /home/z/tmp-qa-17a/)

Stage Summary:
- La queja estructural del tutor queda respondida con una función insignia: "Repaso integrador" — práctica intercalada con disciplina verificada (ningún problema consecutivo del mismo tema, cada pasada toca todos los temas posibles), consciente de las debilidades del estudiante (los temas donde falla aparecen primero, alimentado por el historial first-try por subtema ya existente) y con modo serio "Sin problemas de Fundamento" (los fáciles se trabajan en clase). Disponible desde 3 puertas: home (tarjeta editorial § 2), vista de materia (CTA compacto) y página de práctica (selector de modo con hoja imprimible equivalente).
- Cambios de comportamiento deliberados: (1) práctica rápida y objetivo diario YA NO sesgan 3x hacia fáciles (weightedPool se conserva para deep links legacy); (2) fix del off-by-one de batchIndex en sesiones ilimitadas (el batch 1 antes nunca se usaba).
- Pendiente / próximos pasos:
  1. Analítica: el resumen de sesión interleaved podría mostrar cuántos temas distintos se tocaron (dato ya disponible en el deck).
  2. El tutor podría querer "repaso integrador" como hoja imprimible desde la vista de tema (hoy el CTA va a sesión interactiva).
  3. Ideas UI vivas anteriores sin tocar: per-subtopic analytics en dashboard, goal-aware celebration, filtros por reasoning/fuente.

---
Task ID: 17-b
Agent: main (Z.ai Code) — content batch: hard multi-concept "bridge" problems (interleaved-knowledge consolidation)
Task: Responder a la queja del tutor "los problemas están demasiado repetitivos y demasiado fáciles… quiero ejercicios más pesados… que se consolide los conocimientos entre sí": lote de 18 plantillas NUEVAS de composición original que encadenan ≥2 temas del currículo — 15 "pcm-bridge-01..15" en precalculus-mixed (todas hard/challenge, reasoning multi-concept, subtema mixed-topics) + 3 "sys-nonlin-01..03" de sistemas NO lineales en systems. Solo se tocaron esos dos archivos (agentes paralelos en physics-mixed/quadratics).

Work Log:
- PREPARACIÓN: GUIDE.md + DIFFICULTY.md + curriculum verificados (subtopic "mixed-topics" existe en precalculus-mixed; ids de systems siguen el patrón sys-<método>-NN). Convenciones trigonométricas del banco respetadas (bpi ≡ piFrac de trig-equations, [0, 2π) half-open).
- LAS 15 BRIDGE (todas con solución de 4 etapas cuyo "Paso N (tema)" nombra explícitamente la cadena de temas, 3 pistas progresivas estrategia→paso→casi-respuesta, ES primero con voz de tutor, EN espejo, rng-parametrizadas con tuples curados / re-roll acotado para respuestas limpias):
  01 log₂(g(x)+b)=C con g cuadrática — funciones→logaritmos→cuadráticas→dominio (hard, numeric). 02 catetos difieren d + área A → hipotenusa — geometría→cuadráticas→Pitágoras/radicales, 14 ternas pitagóricas (hard, numeric+cm). 03 recta y=mx+k tangente a parábola → Δ=0 despeja k — geometría analítica→sistemas→discriminante/parámetros (challenge, numeric). 04 serie aritmética: "¿cuál n da S_n=S?" → cuadrática en n + raíz negativa descartada por Vieta (hard, numeric). 05 circunferencia x²+y²+Dx+Ey+F=0 por 3 puntos → sistema lineal 2×2 en D,E — sistemas→geometría analítica (hard, numeric). 06 interés compuesto vs simple: primer año en que A>B (C₀ se cancela, tabla de factores tok) — exponencial→lineal→desigualdad (challenge, numeric, 420 s). 07 ecuación racional → cuadrática con raíz espuria x=a (dominio) — MC con distractores de error real: solo la espuria / ambas sin comprobar / "no tiene solución" (hard, multiple-choice). 08 contar soluciones de ecuación trig con ángulo doble en [0,2π) (6 variantes: cos2x=±sinx, cos2x=cosx, sin2x=±sinx, sin2x=cosx) — identidades→cuadrática→familias/intervalo, MC count−1/count+1/2·count (challenge, multiple-choice). 09 dos corrales contra el muro, 2l+3w=F → área máx por vértice SIN cálculo diferencial — modelización→restricción lineal→vértice (hard, numeric+m²). 10 f(x)=|x−a|+|x−b|: mínimo constante en [a,b], menor entero k con exactamente 2 soluciones — análisis por casos→umbral de parámetro (challenge, numeric). 11 sistema exponencial 4^x·8^y=2^K1, 27^x/9^y=3^K2 → leyes de exponentes + factorización prima → 2×2 lineal (hard, text "(x, y)"). 12 triángulo rectángulo con lados en P.A. y perímetro P → (a−d,a,a+d) en Pitágoras ⇒ 3d-4d-5d — sucesiones→Pitágoras (hard, numeric+cm). 13 inversa de cuadrática restringida x≥b (vértice) — inversas→cuadrática→selección de rama por dominio (hard, numeric). 14 log₂x+log₂y=p, log₂x−log₂y=q → xy=2^p, x/y=2^q → potencias de 2 — propiedades log→sistemas→exponentes (hard, numeric). 15 monica con raíces α², β² vía Vieta (S=p²−2q, P=q²) — Vieta→identidades simétricas→construcción (challenge, expression "x^2 - Sx + P").
- SISTEMAS NO LINEALES (sys-nonlin-01..03, hard, multi-concept, subtopic substitution): 01 recta∩parábola y=x²: punto de abscisa positiva (text, convención de accepted idéntica a sys-sub-01). 02 parábola y=x²−c ∩ circunferencia x²+y²=r²: mayor ordenada entre los 4 cortes (bicuadrada con u=x²). 03 circunferencia∩hipérbola xy=P: la sustitución produce la CUÁRTICA x⁴−R²x²+P²=0 que se factoriza con u=x²; se pide x+y de la solución x>y>0.
- DISTRIBUCIÓN: 13 hard + 5 challenge; 13 numeric / 2 MC (límite ≤4) / 2 text / 1 expression; 240–420 s; todos reasoning "multi-concept"; source: undefined (composición original). precalculus-mixed 14→29, systems 13→16 → crecimiento EXACTO +18 (el resto del banco 465→497 es de los agentes paralelos: physics-mixed +10, quadratics +4).
- AUDITORÍA POSTERIOR (revisión manual de cada variante renderizada) — 6 issues de renderizado/prosa encontrados y corregidos: (a) bridge-05 el Paso 2 decía "restando la ecuación de P2 a las otras dos" pero la 2ª ecuación mostrada era P1−P3 → texto corregido a la resta real (P3−P2 y P1−P3), verificado con check nuevo (abajo); (b) bridge-05 "1D" cuando r−a=1 (mitad de las ternas) → coeficiente 1 suprimido; (c) bridge-05 "25 − 0 = 25" cuando F=0 (circunferencia por el origen) → término condicional fTerm; (d) bridge-06 "Paso 1" duplicado (exponenciales/lineal) → un solo "Paso 1 (modelos)"; (e) bridge-08 "todas esas valores"→"todos esos valores" + "no añade ninguna solución"; (f) bridge-11 "descomponlo"→"descompónlo". Guardas anti-degeneración añadidas: "+ 0" imposible en bridge-01 (b=0) y bridge-03 (q=0), "(x + 0)²" imposible en bridge-13 (b=0 → "x²"), "0 − 2x" imposible en bridge-10 (a+b=0 → "−2x").
- VERIFICACIÓN INDEPENDIENTE (/tmp/verify-bridge.ts, bun): 18 plantillas × 12 seeds (≥8 exigidos) — re-deriva cada respuesta SIN reusar la construcción del generador (parsea los números del enunciado ES y resuelve: fórmula cuadrática, ajuste de circunferencia por mediatrices, conteo numérico de raíces por bisección fina para las trig, Vieta sobre las raíces verdaderas, maximización numérica para el vértice, comprobación de raíces espurias sustituyendo en la ORIGINAL) + checks estructurales (determinismo, 3 pistas, 4 etapas, paridad de $, forma MC, bilingüe, etiqueta "Paso 1"). NUEVO esta ronda: el sistema lineal INTERMEDIO mostrado en bridge-05 se parsea del paso de cálculo y se resuelve — debe dar exactamente (D,E)=(−2h,−2k) del ajuste independiente. Resultado: 2762 checks · 0 failures.
- SWEEP DE CASOS BORDE (/home/z/tmp-edge-scan.ts): 18 × 4000 seeds — 0 problemas de renderizado ("+ 0", "(x+0)²", "1D", "0−2x", Paso duplicado, typos) y todos los casos borde con guarda EJERCIDOS de verdad (b=0 en 01/13, q=0 en 03, r−a=1 en 05, a+b=0 en 10 aparecen en ≤4000 seeds).

Verification (all green):
- bun run /tmp/verify-bridge.ts → 2762 checks · 0 failures (18 × 12 seeds, re-derivación independiente)
- /home/z/tmp-edge-scan.ts → 18 × 4000 seeds, 0 rendering problems, 5/5 edges exercised
- bun run validate:content → 497 templates · 0 errors · 0 warnings (mi aporte: +18 exactos)
- bunx tsc --noEmit → 0 errores en src/ (solo ruido preexistente examples/skills); bun run lint → limpio (exit 0)
- agent-browser (ES): #/math → "Práctica mixta de pre-cálculo" (chip "Temas mezclados 19", antes 4) → sesión d=hard n=10 → 5 de 10 problemas NUEVOS (bridge-12, 14, 11, 09, 07) todos con KaTeX y 0 "$" crudos; Pista 1 abre (bridge-07, denominador común renderizado); MC correcto "x=−12" aceptado ("¡Correcto! Bien resuelto."); sesión single tpl=pcm-bridge-02&k=7 → respuesta tipiada "5" (de la tabla de verificación, dump seed 7) aceptada; solución completa con DATOS/PLANTEAMIENTO/CÁLCULO/RESULTADO y cadena "Paso N (tema)", 18 elementos KaTeX; consola sin errores; dev.log limpio (GET / 200). Screenshots: /home/z/qa-17b/.

Stage Summary:
- El banco gana 18 composiciones "puente" pesadas que consolidan temas entre sí (la queja estructural del tutor, complemento de contenido al modo "Repaso integrador" de 17-a): cada problema obliga a encadenar ≥2 temas (p. ej. logaritmo∘cuadrática+dominio, tangencia→Δ=0→parámetro, circunferencia por 3 puntos→sistema→centro/radio, bicuadrada/cuártica que se factoriza, |x−a|+|x−b| a trozos→umbral de k) con soluciones que NOMBRAN la cadena ("Paso 1 (sucesiones) → Paso 2 (cuadráticas) → Paso 3 (descarte)"). Ningún template es transcripción (source undefined); todos multi-concept; 240–420 s.
- Nivel: 13 Avanzado + 5 Desafío — el tema precalculus-mixed pasa de 1 hard + 1 challenge a 11 hard + 6 challenge y ya no tiene pool dominado por fáciles; combinado con excludeEasy del modo integrador, el "demasiado fácil" queda resuelto donde el tutor lo pidió.
- Verificación a tres niveles: re-derivación independiente (2762 checks), sweep anti-degeneración 72 000 generaciones, y QA en vivo con respuesta tipiada aceptada desde la tabla de verificación.
- Pendiente / próximos pasos:
  1. El tutor debería probar el lote en clase; si quiere MÁS peso, el siguiente escalón natural son composiciones con 3+ temas por problema (p. ej. log+trig+cuadrática) o "misma familia, datos cambiantes" (parámetros sobre las propias bridge).
  2. Los sys-nonlin podrían migrar a un subtema propio "no lineales" si el tutor lo quiere visible en el chip del tema (hoy viven en substitution).
  3. Re-auditoría de dificultad del banco legado (DIFFICULTY.md orden: quadratics → poly-functions → polynomials) sigue pendiente; quadratics recibió +4 templates del agente paralelo y conviene re-auditar juntos.

---
Task ID: 17-c
Agent: main (Z.ai Code) — content batch: hard integrative PHYSICS batch + anti-repetitiveness overhaul of quadratics
Task: Segunda mitad de la directiva del tutor ("los problemas están demasiado repetitivos y demasiado fáciles… quiero ejercicios más pesados"). JOB A: 10 plantillas NUEVAS hard/challenge en src/content/physics/physics-mixed.ts, cada una encadenando ≥2 áreas de física en UN escenario coherente (lista exacta del encargo: rizo vertical, rampa+choque inelástico+rozamiento, muelle→proyectil, transferencia orbital, disco sobre disco, resistencia→ΔT, péndulo, electrón acelerado+desviado, flotación→MAS, fotoeléctrico). JOB B: auditoría anti-repetitividad de TODAS las plantillas de src/content/math/quadratics.ts (rangos más anchos, coeficiente principal variado, variación estructural) + 4 plantillas NUEVAS hard/challenge. Solo esos dos archivos (+ scripts /tmp + este worklog).

Work Log:
- PREPARACIÓN: GUIDE.md, DIFFICULTY.md y worklog leídos completos; convenciones verificadas: g = 9{,}8 idéntica a kinematics.ts y a las constantes del propio archivo (G_ACC = 9.8, C_WATER = 4186, G_CONST = 6.67e-11, M_EARTH = 6e24), tok() para decimales computados, "{,}" para literales en ES, ids pmx-<área>-NN / quad-<subtema>-NN.
- JOB A — LAS 10 PLANTILLAS NUEVAS (todas numeric-unit con unitChoices distractoras, ES/EN con voz natural ecuatoriana, 3 pistas progresivas, solución de 4 etapas que NOMBRA la cadena, 240–480 s, tuples curados con rangos físicamente válidos, respuestas pre-redondeadas sigfig 2–3):
  1. pmx-loop-01 (challenge, multi-concept, 420 s): rizo vertical sin rozamiento. Dos variantes rng: altura mínima h = 5R/2 (contacto N=0 en la cima) o fuerza normal en la cima N = m(v²/R − g) desde h; cadena dinámica circular → energía.
  2. pmx-mom-fric-01 (challenge, multi-concept, 420 s): bloque baja por rampa sin rozamiento desde h, choque perfectamente inelástico con segundo bloque en reposo, conjunto se detiene tras d en suelo rugoso → h = μd((m₁+m₂)/m₁)²; se resuelve al revés: frenado → choque → rampa ("Energía → cantidad de movimiento → rozamiento").
  3. pmx-spr-proj-01 (hard, multi-concept, 360 s): muelle (k, x) lanza carrito horizontalmente desde una mesa de altura H → alcance R = x√(k/m)·√(2H/g); tuples con v ∈ 2–5 m/s y t = 0.5 s / 1 s exactos.
  4. pmx-orbit-02 (challenge, multi-concept, 480 s): impulso de transferencia de Hohmann Δv = vp − v₁ entre dos órbitas circulares (elipse tangente: energía + momento angular en perigeo/apogeo, sin cálculo diferencial); 3 cifras significativas.
  5. pmx-rot-coll-01 (hard, multi-concept, 300 s): disco coaxial caído sobre disco giratorio. Dos variantes rng: ω común = I₁ω₁/(I₁+I₂) o energía disipada ΔE = ½I₁ω₁² − ½(I₁+I₂)ω²; I = ½MR².
  6. pmx-cir-therm-01 (hard, multi-concept, 360 s): calentador de inmersión P = V²/R → Q = Pt → ΔT = Q/(mc_agua), c = 4186.
  7. pmx-pend-en-01 (hard, multi-concept, 300 s): período de pequeñas oscilaciones T → L = gT²/4π²; suelta desde horizontal → v_max = √(2gL) (el período "mide" la longitud sin regla).
  8. pmx-elec-def-01 (challenge, multi-concept, 480 s): electrón acelerado por ΔV (v = √(2eΔV/m)) y desviado entre placas (a = eV_p/(m·d), t = L/v, y = ½at²); trayectoria parabólica, se comprueba que y < d.
  9. pmx-buoy-shm-01 (hard, modeling, 360 s): cilindro flotante hundido y soltado → MAS vertical con k_ef = ρgA; T = 2π√(m/ρgA).
  10. pmx-photo-01 (hard, multi-concept, 300 s): potencial de frenado V_s = 1240/λ − φ (hc = 1240 eV·nm; eV→V directo).
- JOB B — QUADRATICS (18 → 22, +4 exactos; ninguna plantilla eliminada ni re-etiquetada — el diff solo AÑADE 14 líneas de difficulty, nunca las modifica):
  - RANGOS AMPLIADOS (donde la matemática sigue limpia): quad-std-01 h/k −4..4/−5..5 → −7..7/−8..8; quad-fact-01 raíces −6..6 → −12..12; quad-fact-02 p {2,3} → {2,3,4,5} con listas m coprimas a p, n 1..5 → 1..7; quad-fact-03 a {2,3} → {2..5}, t 1..4 → 1..6 (m coprimo, raíz −m/a); quad-form-01 a {1,2} → {1,2,3}, b −8..8 → −12..12, c −6..6 → −9..9; quad-disc-02 raíces ±4 → ±9 + 4 pares nuevos en kind-2 con escalado a ∈ {1,2} (Δ = a²(bp²−4cp), el signo se conserva); quad-cs-01 m −5..5 → −9..9, c −8..8 → −12..12; quad-vertex-01 a {1,2,3} → {1..5}, h −4..4 → −7..7, k −6..6 → −9..9; quad-ver-02 (h,k) ±3 → ±4; quad-graph-01 intersecciones 1..4 → 1..7 y VENTANA del diagrama parametrizada (xMin = r₁−2, xMax = r₂+2, yMin = min(−18, yᵥ−6)); quad-app-01 n 3..12 → 3..15; quad-chal-01 c {4,9,16,25} → +{36,49}; quad-roots-01 y quad-roots-02 +8 tuples curados cada una.
  - VARIACIÓN ESTRUCTURAL (rng.pick de qué se pregunta, enunciado lo dice EXPLÍCITAMENTE): quad-fact-01 ahora pide la raíz MAYOR / la MENOR / la SUMA de las dos (answerDisplay "x₁ + x₂ = …" en el caso suma); quad-fact-02 alterna raíz no entera / raíz ENTERA; coeficiente principal variado donde el formato lo expresa (a ∈ {1..5} en fact-01 con factor común en la solución; a ∈ {1,2} multiplicando en disc-02).
  - LAS 4 NUEVAS: quad-param-02 (hard, MC, parameters, 300 s): ¿para qué k tiene x²−kx+k+q = 0 (q ∈ {8,15,24,35}) exactamente dos raíces reales distintas? → k < k₂ ∨ k > k₁ con Δ = k²−4k−4q = (k−k₁)(k−k₂), k₁+k₂ = 4, k₁k₂ = −4q; solución con controles k=0 (falla) / k=k₁ (raíz doble, no vale). quad-roots-04 (challenge, expression, modeling, 270 s): construir la cuadrática mónica desde "las raíces suman S y se diferencian en D" (14 pares curados; r = (S±D)/2 enteras; b = −S, c = r₁r₂; acepta formas equivalentes por sampling). quad-common-01 (hard, numeric, multi-concept, 240 s): la cuadrática comparte raíz con la lineal lx − l·s = 0 y la suma de raíces vale S → la otra raíz es S−s y c = s·o (lineal → Vieta). quad-vertex-03 (hard, numeric, graphical, 300 s): parábola ax²+bx+c con vértice sobre la recta y = mx+q → cuadrática en b, b²−2mb+4a(q−c) = 0; se pide el valor POSITIVO de b (el negativo se descarta); 8 tuples verificados con vértice de coordenadas ENTERAS y exactamente una raíz positiva.
- AUDITORÍA POST-EDICIÓN (revisión propia + verificación independiente) — 5 DEFECTOS ENCONTRADOS Y CORREGIDOS, tres clases de bug sutil que el validador de banco NO detecta:
  (1) TUPLE VÁLIDO PERO MAL CLASIFICADO: quad-disc-02 kind-2 ("ninguna raíz real") incluía el par [4,4] → Δ = 16−16 = 0: la ecuación generada tenía raíz doble pero answerDisplay/result decían "ninguna" (la opción MC correcta, basada en disc, decía "doble" — contradicción visible). Mi script verify llevaba la aserción expectedClass === kind pero ningún seed 1..12 sorteó ese tuple → sustituido por [7,13] (Δ<0 estricto) y el chequeo exhaustivo por-tuple ahora lo cubre determinísticamente.
  (2) FILTRO DE RESPUESTA POR EL EJEMPLO: quad-roots-04 decía "(por ejemplo, x^2-7x+10)" y el PRIMER tuple {r₁:5,r₂:2} produce exactamente x²−7x+10 = 0 — el seed 7 del deck lo sorteaba (verificado en el dump): el estudiante copiaba el ejemplo. Ejemplo cambiado a x^2-3x+2 + guard que comprueba que NINGÚN tuple produce el ejemplo (S=3 ∧ P=2 imposible).
  (3) DECIMAL NO ENTERO EN ES: quad-vertex-03 tuple {a:2,b:6,c:3,m:1,q:0} → vértice (−1.5, −1.5) renderizado con punto decimal en ES (viola la convención {,}/tok) → sustituido por {a:2,b:8,c:5,m:3,q:3} (vértice (−2,−3) enteros; b²−6b−16=0 → b=8 ∨ −2).
  (4) FUGA DE RESPUESTA POR EL DIAGRAMA: pmx-spr-proj-01 usaba el diagrama projectile con showAnnotations — el componente dibuja "R ≈ 2.5 m" (¡LA RESPUESTA!) y "v₀ = 5 m/s" (el paso intermedio, incondicional en el componente: el label v₀ no tiene flag para ocultarlo). Diagrama ELIMINADO de la plantilla (el componente no se puede tocar en 17-c; el enunciado es autocontenido). Verificado en vivo: ya no aparece "R ≈" ni "v₀" en el DOM del problema.
  (5) RESPUESTA EN FRONTERA DE REDONDEO: pmx-elec-def-01 tuple {ΔV:2000, V_p:100, L:0.06, d:0.02} → y = 2.25 mm EXACTAMENTE en la frontera de 2 cifras significativas: guardado 0.0022 (ventana ±5·10⁻⁵) y un estudiante que redondeara bien a 0.0023 quedaba RECHAZADO. Tuple cambiado a L=0.05 (y = 1.5625 mm → 0.0016 sin ambigüedad) + guard reutilizable onBoundary() (valor d.dd5 exacto) aplicado a TODOS los tuple-sets de física del lote: 0 fronteras.
- ESTRATEGIA DE VERIFICACIÓN (todos en /tmp, bun; patrón de import de scripts/validate-bank.ts):
  - /tmp/verify-phy.ts: 12 seeds (≥8 exigidos) por cada plantilla nueva/cambiada de AMBOS archivos; espeja el consumo de rng, re-deriva cada respuesta con álgebra INDEPENDIENTE (p. ej. y = L²V_p/(4dΔV) en forma cerrada vs cadena por etapas — ambas rutas deben coincidir a 1e-12; cadena hacia atrás en mom-fric; N = m(v²/R−g) desde energía), imprime (params, answer) por variante, aserta igualdad dentro de la ventana de tolerancia del template + sanidad dimensional (energías/velocidades positivas, y < d, N > 0, h < 50 m, ΔT < 100 K, vértice sobre la recta) → 552 checks · 0 failures.
  - /tmp/stress-17c.ts: la misma batería a 300 seeds → 13,800 checks · 0 failures (cubre con probabilidad abrumadora cada tuple de listas ≤16; incluye la aserción expectedClass === kind de disc-02).
  - /tmp/tuples-17c.ts: chequeo EXHAUSTIVO por tuple, sin RNG — 294 checks (propiedades físicas/matemáticas de cada tuple curado + fronteras de redondeo) · 0 failures.
  - /tmp/deck-17c.ts y /tmp/single-17c.ts: helpers de smoke que imprimen el deck exacto (buildDeck con la misma config) y las respuestas correctas por posición para las URLs de sesión del navegador.

Verification (all green):
- bun run validate:content → 497 templates · 0 errors · 0 warnings. Aporte EXACTO +14: physics-mixed 10 → 20 (el tema queda 9 hard + 6 challenge; las nuevas: 6 hard + 4 challenge), quadratics 18 → 22 (queda 8 hard + 2 challenge; las nuevas: 3 hard + 1 challenge). Diff de difficulty: solo 14 líneas AÑADIDAS, ninguna existente modificada.
- bunx tsc --noEmit → 0 errores en src/ (solo ruido preexistente examples/skills); bun run lint → limpio.
- /tmp/verify-phy.ts → 552·0; /tmp/stress-17c.ts → 13,800·0; /tmp/tuples-17c.ts → 294·0 (incl. guard de fronteras).
- agent-browser (sesiones ES/EN, desktop + 390 px):
  - "Práctica mixta de física" (m=topic&t=physics-mixed&d=any&n=10&k=42): el deck trae 4 plantillas nuevas; respondidas correctamente EN SESIÓN: pmx-orbit-02 → 522 m/s, pmx-pend-en-01 → 6,6 m/s (coma decimal aceptada), pmx-spr-proj-01 → 2.5 m (fuga del diagrama eliminada: no hay "R ≈" ni "v₀" en el DOM), pmx-elec-def-01 → 0.005 m. Enlaces single: pmx-elec-def-01 (0.005 m, solución GIVEN/APPROACH/CALCULATION/RESULT con la cadena "energy → electric field → 2D kinematics"), pmx-photo-01 → 1.0 V en ES ("¡Correcto! Bien resuelto.", ϕ = 2,1 eV con coma), pmx-loop-01 → 49 N en ES a 390 px SIN overflow horizontal (scrollW = 390). KaTeX + datalist de unidades verificados en todas.
  - Quadratics d=hard n=10 k=42: 3 problemas nuevos en el deck; quad-common-01 → −54 aceptada, quad-vertex-03 → 8 aceptada, quad-param-02 → MC "k < −8 o k > 12" aceptada (solución con controles de sanidad renderizando); variante con rango ampliado quad-vertex-01 y = 3x²+12x+15 (a = 3 > mónica) → 3 aceptada.
  - 0 page-errors en mis flujos. Los GET / 500 del dev.log son los históricos de Task 14 (footer/socials); una ventana transitoria mientras el agente paralelo 17-b tenía precalculus-mixed.ts a medio editar (const bT duplicada) bloqueó la app ~1 min — resuelta por 17-b; estado final GET / 200.

Stage Summary:
- La queja del tutor queda cubierta en física y cuadráticas: physics-mixed pasa de 10 a 20 plantillas con las 10 cadenas multi-área pedidas (todas hard/challenge, ninguna transcripción, reasoning multi-concept/modeling, 240–480 s) y quadratics gana variedad estructural real (rangos −12..12, a ≠ 1, mayor/menor/suma, entera/no-entera) + 4 plantillas de parámetros/construcción/raíz compartida/vértice-sobre-recta. Combinado con el lote 17-b y el modo "Repaso integrador" de 17-a, el "demasiado fácil" queda resuelto en los tres frentes que el tutor señaló.
- Lección de calidad registrada: la verificación independiente cazó tres CLASES de bug que el validador de banco no ve — (a) tuples válidos para el generador pero mal clasificados ([4,4] con Δ=0 en una lista de "sin raíces"), (b) fugas de respuesta por el enunciado (ejemplo = respuesta) y por DIAGRAMAS (labels v₀/R del componente projectile), (c) respuestas exactamente en la frontera de redondeo (2.25 mm) que rechazan input estudiantil correcto. Las tres clases tienen ahora guards automatizados (tuple-exhaustivo, ejemplo≠respuesta, onBoundary()).
- Pendiente / próximos pasos:
  1. El tutor debería probar el lote de física en clase; cadenas aún disponibles para una segunda tanda: rotación+proyectil, dos muelles acoplados, térmica+MAS (amortiguamiento), inducción+circuito.
  2. El componente projectile (src/components/diagrams/index.tsx) podría ganar showV0: false — el label v₀ es incondicional y filtró el paso intermedio; fuera del alcance de 17-c (solo contenido), anotado para el siguiente agente de UI.
  3. Re-auditoría de dificultad del banco legado (DIFFICULTY.md): poly-functions y polynomials siguen pendientes; quadratics recibió +4 y conviene re-auditar el conjunto.
  4. El guard onBoundary() de /tmp/tuples-17c.ts merece mudarse a scripts/validate-bank.ts como chequeo permanente del banco completo (decisión del próximo agente de tooling).

---
Task ID: 16
Agent: main (Z.ai Code)
Task: Responder a la queja del tutor "Los problemas están demasiado repetitivos y demasiado fáciles / ¿No pudiste ver los de la espol? / consolidar los conocimientos entre sí" — descarga del libro ESPOL, importación curada verificada, y coordinación de los tres subagentes paralelos (17-a/b/c).

Work Log:
- Descargado el libro completo "Fundamentos de Matemáticas para Bachillerato" (FCNM-ESPOL, 3.ª ed. 2017, 845 págs., 206 MB) desde el Drive del tutor a /tmp/espol.pdf (curl a drive.usercontent.google.com con confirm=t). El libro estaba accesible pero NADIE lo había usado más allá de 8 problemas: el tutor tenía razón.
- Auditoría por secciones con pdftotext: localizados los Ejercicios Propuestos y FundaRETOS de los capítulos 3 (Números Reales), 4 (Funciones), 5 (Trigonometría), 6 (Matrices). La sección §5.6 "Ecuaciones e inecuaciones trigonométricas" (pp. 668–669) es la mina: ecuaciones con referencial + inecuaciones con verdad-conjunto.
- Selección de 22 problemas alineados con el currículo (trig-equations, trig-functions, polynomials, linear-equations, radicals, functions). OCR del libro daña fórmulas → cada lectura se contrastó con (a) las respuestas impresas del libro (pp. 799+) y (b) derivación independiente.
- VERIFICACIÓN: script sympy (/home/z/tmp/verify_espol.py) re-deriva cada respuesta. El proceso cazó DOS clases de problema: (1) mi lista manual del 5.6·1e olvidaba x=3π/2 (la verificación lo devolvió — el conjunto correcto son 8 soluciones, no 7); (2) el buscador numérico de raíces pierde raíces tangenciales/en extremos (π en 1f, 2π en 1m) — confirmadas con solveset simbólico. Ítems con OCR irreconstruible (111, 127a–c, 59–60, balanza) quedaron FUERA deliberadamente.
- IMPORTADOS 22 plantillas curadas con source fcnm-fundamentos (exerciseNumber + página impresa): 11 en trig-equations (7 ecuaciones con "suma de todas las soluciones" como respuesta numérica en radianes — el parser acepta "3pi/4"; 4 inecuaciones como MC con distractores basados en errores reales), 2 en trig-functions (modelo de presión arterial P(t)=−20cos(5πt/3)+100: periodo y primer cruce por la línea media), 3 en polynomials (desigualdades cuadráticas), 1 en linear-equations (bonos de la señora Moreno, modelado), 2 en radicals (inecuaciones con raíz: aislar antes de elevar), 3 en functions (costo por tramos C(g), auditoría de propiedades de f a trozos, ranking IMG de mérito de graduación).
- Subagentes coordinados en paralelo (Task IDs 17-a/b/c, sus entradas están arriba): modo "Repaso integrador" intercalado con ponderación por debilidad + excludeEasy; +18 problemas puente multi-concepto (precalculus-mixed 14→29, systems +3 no lineales); +10 cadenas de física integradora (physics-mixed 10→20) + overhaul anti-repetición de quadratics (rangos ±12, a≠1, variación estructural mayor/menor/suma, +4 plantillas de parámetros).
- Fix menor durante la escritura: escape de backticks en template literals (\\` → \`) que rompía la compilación de las instrucciones "p. ej. `3pi/4`".
- QA con agent-browser del estado INTEGRADO: (1) tarjeta "Consolidar lo aprendido" en home → sesión #/session?m=interleaved&s=math,physics&ne=1 con overline "Topic · X" por problema — P1 Exponential → P2 Trig Foundations → P3 Oscillations (cero consecutivos iguales), 0 badges Fundamento, avance gated a intento (attempt-first intacto); (2) problema ESPOL trigeq-espol-2c renderizado con badge completo de fuente ("Fundamentos de Matemáticas para Bachillerato (3.ª ed., 2017, 845 págs.) — FCNM · ex. 5.6 · 2c"), razonamiento y KaTeX impecable; opción correcta aceptada; (3) trigeq-espol-1d respondido con "3pi/4" ✓ y con "2,36" (coma decimal, ES) ✓ — los dos formatos numéricos funcionan; (4) solución paso a paso 4 etapas Given/Approach/Calculation/Result; (5) ES/EN completos (badge "Libro de texto: … ej. 5.6 · 1d"); (6) móvil 390px scrollWidth=390 sin overflow; (7) dark mode screenshot + VLM aprobado (limpio, buen contraste); (8) dev.log sin errores nuevos (GET / 200).

Verification (all green):
- bun run validate:content → 519 templates · 0 errors · 0 warnings (banco 465 → 519 en esta ronda: +22 ESPOL, +18 puente matemática, +14 física/quadratics; curados con fuente: 62, de los cuales fcnm-fundamentos 30)
- bunx tsc --noEmit → 0 errores en src/ (solo ruido preexistente examples/skills); bun run lint → limpio
- sympy: 22/22 respuestas re-derivadas; libro: 8 de las lecturas confirmadas textualmente por las respuestas impresas (121a, 121c, 126, 127d, 128b, 62, 64, 5.6·1)
- agent-browser: flujo dorado completo ES/EN, móvil, dark, π-numérico, coma decimal, MC, fuente visible

Stage Summary:
- La queja del tutor queda atendida en sus TRES frentes: (1) "demasiado fáciles" → 49 nuevos problemas hard/challenge + excludeEasy por defecto en el repaso integrador + fin del sesgo easy×3 en práctica rápida; (2) "¿no pudiste ver los de la ESPOL?" → el libro completo descargado y 22 problemas curados-verificados importados (8→30 de fcnm-fundamentos), con el inventario de fuentes actualizado capítulo por capítulo; (3) "consolidar los conocimientos" → modo Repaso integrador (interleaving con disciplina + ponderación por debilidad) + 28 problemas puente multi-concepto que encadenan temas explícitamente.
- La convención "suma de todas las soluciones" (para respuestas π-numéricas verificables) y el MC con distractores-por-error son reutilizables para la siguiente tanda de importación ESPOL.
- Pendiente / próximos pasos:
  1. Continuar importación ESPOL: §5.6 ej. 59 (potencias de coseno), ej. 112 (literal 4x²−4xy−y²=1), Ch. 3 §3.10.2 restantes; §5.5 identidades requiere formato de demostración (feature nueva).
  2. Ch. 6 (matrices/sistemas no lineales SENL pp. 755–762) — candidato para ampliar el topic systems con SEL 3×3; FundaRETOS Ch. 6 (ballenas/Leslie) requiere topic de matrices (decisión del tutor).
  3. Re-auditoría de dificultad legado: poly-functions y polynomials aún pendientes (DIFFICULTY.md); quadratics re-auditar el conjunto tras el overhaul 17-c.
  4. Mover el guard onBoundary() de /tmp/tuples-17c.ts a scripts/validate-bank.ts (tooling).
  5. showV0: false en el componente projectile (fuga de paso intermedio anotada por 17-c).
  6. El libro /tmp/espol.pdf (206 MB) es efímero — si se borra, re-descargar del Drive del tutor (folder id 1W9iYhZKMy6nrcgAbHKzg5a434cR1NEct, archivo 1ebj6_uQqeWkUW7EUiqvcT1HegkGVK9Ox).

---
Task ID: 18
Agent: main (Z.ai Code)
Task: Responder al pedido del tutor «no solo uses OCR, usa tu modelo de visión para ver las páginas de ejercicios difíciles y extraer más ejercicios… si quiero ese material extra que mencionas» — re-lectura VLM del libro ESPOL, segunda tanda de importación curada (+30), correcciones de fidelidad del lote OCR previo, y verificación completa.

Work Log:
- Re-descargado el libro completo (206 MB) del Drive del tutor a **/home/z/espol-book/espol.pdf** (ubicación PERSISTENTE — /tmp/espol.pdf había desaparecido; offset de página: PDF = impresa + 27 en Cap. 5, + 29 en Cap. 3).
- Rasterizadas 26 páginas objetivo a PNG 150 dpi (§3.11 ej. 108–116 → PDF 351–361; §5.5/§5.6 → PDF 692–697; §6.6 S.E.N.L. → PDF 780–782; respuestas Cap. 3/5/6 → PDF 830–831, 835–839) y recortes zoom 300 dpi de las zonas ambiguas.
- **Transcripción con el modelo de visión (z-ai vision, glm-5v)** página por página: la lectura VLM resolvió lo que el OCR dañaba (p. ej. 53n = 2sen²(2πβ)−3sen(2πβ)+1=0 confirmado por zoom + clave impresa {1/12, ¼, 5/12}; µ del libro = escalón unitario, no sgn; ⌊⌋ en el ej. 56 = parte entera). Estructura real del §5.6: ej. 53 (14 literales), 54 (10 literales), 55–60.
- Descubiertas y CORREGIDAS tres deformaciones del lote OCR anterior (la queja implícita del tutor era justa): 2c era «cos−sen<−√2/2» y el libro imprime **cos²−sen²<−½** (clave: (π/3,2π/3)∪(4π/3,5π/3)); 2d tenía **≥¼** y el libro imprime **≤¼** (clave: [0,1/12]∪[5/12,7/12]∪[11/12,1]); 2g usaba **sgn** y el libro imprime **µ(sen2θ−1)<0** → Ap=∅ (la versión sgn se conserva como distractor). Renumerados además los ítems previos a la numeración real del libro (1x→53x, 2x→54x).
- IMPORTADAS 30 plantillas nuevas con fuente fcnm-fundamentos (todas hard/challenge):
  - trig-equations (+11): 53i (suma 8π), 53j (7π/2), 53n (¾ — sustitución u=sen(2πt)), 54f (argumento escalado), 54h (sgn+|2α|), 54i (sgn≥1), 54j (µ(√3−2cos x)=0, extremos cerrados), 55 (implicación falsa en (0,π/2)), 56 (⌊1−2cos(x/2)⌋=1 ∧ sgn(sen2x)=0 → [0,π]∪[4π/3,2π]), 59 adaptado n=1 (cadena de potencias del coseno), 60 adaptado a=4,b=1 (mínimo AM-GM = 4, con igualdad alcanzable en sen²x=½).
  - trig-functions (+10): 45e (Δ=sen²y, producto→suma), 45i (Δ=½, recíprocas), 46c (tan15°=2−√3, expresión), 46e (sec(−75°)=√6+√2, expresión), 47a (sen[arccos½+arccos¼]=(√15+√3)/8, expresión), 47d (cot[2arctan½]=¾), 49a (8cos10cos20cos40=cot10°, MC), 49b (∏cos(2^k·π/65)=1/64 — la joya), 57a (dominio del ln con sen(x/2)cos(x/2)=sen x/2), 57b (dominio con cos⁴−cos²+sen²=sen⁴).
  - systems (+4): S.E.N.L. 1 (t=a²+b²=2 vía (a+b)²), 3 (identidad (x+y)³=0 → (2,−2)), 4 (ln(ex)−ln y=1 fuerza x=y; u²−u−20=0 → log₂5), 110 (mezcla H₂SO₄ 60/140 gal — modelado MC).
  - quadratics (+4): 111a (m=±1 con raíces reales verificadas), 111b («No es posible» — el candidato m=½ muere en Δ=−63), 112 (fórmula general con y de parámetro → x=(y±√(2y²+1))/2), 116 (mínimo trivariado = 0 por suma de cuadrados).
  - rational (+1): 113 — la meta-ecuación de cardinalidades ([N(At)+N(Aq)+N(Ar)][N(Aw)−N(Au)]+2(N(Aw)−1)−N(Ap)=0): el estudiante resuelve CINCO ecuaciones racionales (q→{54}, r→{−11}, t→{−16}, u→{59/19}, p→∅) y despeja z=N(Aw)=1. Challenge 600 s.
- Dos adaptaciones documentadas en el badge: 59 «(n = 1)» y 60 «(a = 4, b = 1)» — en 60 la elección garantiza que la cota AM-GM 2√(ab) es alcanzable dentro del rango de sen² (con a=3,b=12 NO lo sería: el mínimo real sería 15, no 12 — trampa evitada y documentada).
- docs/source-inventory.md actualizado con la tabla de la segunda tanda, las tres correcciones de fidelidad y la nueva ubicación persistente del libro.

Verification (all green):
- bun run validate:content → **549 templates · 0 errors · 0 warnings** (519 → 549: +30; curadas con fuente 62 → **92**, de las cuales fcnm-fundamentos 30 → **60**).
- bunx tsc --noEmit → 0 errores en src/; bun run lint → limpio.
- **sympy 43/43 checks** (/home/z/tmp/verify_espol_vlm.py): cada una de las 30 respuestas nuevas re-derivada de forma independiente y cotejada con la clave impresa del libro (53n→{1/12,¼,5/12}; 54j cerrado; 55→[π/2,3π/2]; 56→[0,π]∪[4π/3,2π]; 47a/47d/49a/49b exactos; senl 1/3/4 = 2, (2,−2), log₂5; 111a ±1 / 111b imposible; 112 expresiones exactas; 113 z=1 con las cinco cardinalidades). Los 7 «fallos» iniciales del script eran bugs del propio script (umbral float en fronteras, raíces complejas no filtradas) — verificado punto por punto antes de dar por bueno el contenido.
- agent-browser (ES + EN, desktop 1280 y móvil 390): 53n respondida 0.75 ✓; 53j con «7pi/2» (expresión π en campo numérico) ✓; meta-ecuación 113 con las cinco fracciones renderizadas en KaTeX y MC N(Aw)=1 ✓ (atajo teclado «1»); 46c expresión «2-sqrt(3)» ✓; senl-4 MC ✓; 2g corregida (∅ correcto, µ definida en el enunciado) ✓; 54j en 390 px scrollWidth=390 sin overflow + VLM aprobó el screenshot (KaTeX limpio, sin solapamientos); deck challenge de trig-equations incluye el nuevo 56; 0 page-errors; dev.log GET / 200 (el «Failed to start server» del log es el intento duplicado histórico de la Task 14).

Stage Summary:
- El pedido del tutor queda cubierto de lleno: el libro ahora se lee CON EL MODELO DE VISIÓN (no OCR), lo que permitió (a) importar el «material extra» pendiente (S.E.N.L. §6.6, §5.5 valores exactos/identidades/cadenas, §5.6 ítems 53i/j/n + 54f/h/i/j + 55/56/57/59/60, §3.11 ej. 110–116), (b) corregir tres importaciones previas deformadas por el OCR y (c) alinear la numeración con el libro para que el tutor pueda cruzar ejercicios por número de página. Banco: 519 → 549 plantillas (+30 duras, 92 con fuente académica verificada).
- Lección registrada: para material escaneado, VLM + zoom + clave impresa es el estándar; el OCR de texto (CamScanner layer) deformó 3 de 13 importaciones previas (23%) y habría deformado más en fórmulas con potencias/fracciones.
- Pendiente / próximos pasos:
  1. §5.5 ej. 48, 50, 51, 52 y §5.6 ej. 59/60 en su forma general son «demuestre que…» — requieren un formato de demostración (feature nueva de UI) para importarse sin degradar.
  2. Ch. 6 matrices (FundaRETOS: ballenas/Leslie, SENL 3×3) requiere crear el topic «matrices» — decisión del tutor.
  3. Ejercicio 47c (tan[arcsen(1/√5)−arccos(√2/3)]) quedó fuera: mi derivación (3√14−16)/10 no cuadra con la clave impresa 18−5√14; requiere zoom adicional antes de importar.
  4. Mover el guard onBoundary() a scripts/validate-bank.ts (pendiente de tooling de la Task 17-c) y showV0:false en el componente projectile — ambas anotadas por agentes previos, siguen abiertas.
  5. El libro persiste en /home/z/espol-book/espol.pdf; páginas PNG en /home/z/espol-book/pages/.

---
Task ID: 1
Agent: main (Z.ai Code)
Task: Fix "absolute value inequalities shows the same problem every time" — add real variety to the abs-inequalities subtopic (user report: "Sale un mismo problema en todas las preguntas. Le falta variedad a ese tema.")

Work Log:
- Diagnosed: subtopic `math/linear-equations/abs-inequalities` had only 2 templates — lin-absi-01 (rigid "count integers" shape, 6 hand-curated (a,b) pairs, always strict <) and lin-absi-02 (FIXED tutor-sheet problem, rng only shuffles MC options). A focused 10-problem session drew ~5 verbatim copies of the fixed problem + near-identical counting questions → user's complaint.
- Upgraded lin-absi-01: generated center h ∈ [-6,6], radius r ∈ [2,4], strictness < vs ≤ (endpoints excluded vs included → count 2r−1 vs 2r+1); hints/solutions now branch on strictness.
- Added 5 new fully parameterized, structurally distinct templates (src/content/math/linear-equations.ts):
  - lin-absi-03 (medium/text): inside case |ax+b| {<,≤} c → answer as interval notation; 8 accepted spellings (spaced/unspaced, ≤/<=, ∈-forms); a ∈ {1,2,3} via |a(x−h)| construction so endpoints stay integers.
  - lin-absi-04 (medium/MC): outside case |x−h| {>,≥} r → union of two rays; distractors model the 3 classic errors: AND-trap (inside interval), bracket swap, forgot-right-branch.
  - lin-absi-05 (medium/MC): degenerate right-hand sides (|x−h| < negative → none; ≤ 0 → exactly 1; > negative → all reals); trains sign-reading before expanding (reasoning: definition-hunting).
  - lin-absi-06 (hard/MC): distance comparison |x−h| > |x−k| → midpoint cut; solution (m, +∞) with tie-point excluded; distractors: tie-included [m,∞), swapped side, breakpoint reflex (k,∞); squaring verification in solution (reasoning: graphical).
  - lin-absi-07 (hard/numeric): consolidation — |x−h| ≤ r AND a linear cut (x > / ≥ s or x < / ≤ t), count integers attending to whether the cut point counts (reasoning: multi-concept; links compound inequalities with absolute value per user's "consolidar los conocimientos" request).
- Validation: `bun run validate:content` → 554 templates, 0 errors, 0 warnings (all new templates pass bilingual/hints/stages/MC/text-answer checks). `bunx tsc --noEmit` → 0 errors in src/ (examples/ and skills/ errors are pre-existing and out of scope). `bun run lint` → clean.
- Simulation with the real session engine (buildDeck): 120 draws over 6 seeds → balanced distribution lin-absi-01:15, 02:19, 03:14, 04:15, 05:19, 06:20, 07:18; a 20-problem session now yields 18 distinct statements (was ~1 before).
- agent-browser QA (named session): topic page shows "Absolute value inequalities 7" (was 2); ran a 10-problem EN session → 7 distinct problem shapes (curated MC, degenerate reading, counting, consolidation, interval text, distance comparison, outside MC); answered numeric (5), text (accepted `[-6,2]` no-space form) and MC correctly; ran ES session → new templates render in Spanish (`\text{y}` works), all 4 MC traps display correctly, "¡Correcto! Bien resuelto."; progress chips update (3/3 shown on subtopic). dev.log healthy (only GET / 200; one historical EADDRINUSE from an old duplicate start attempt, not current).

Stage Summary:
- abs-inequalities now has 7 templates (4 medium incl. upgraded 01, 3 hard incl. fixed curated 02) with 5 question-type/shape families: counting (numeric), interval notation (text), outside-union + degenerate-reading + distance-comparison (MC), compound consolidation (numeric).
- The fixed curated problem (lin-absi-02, tutor class sheet) no longer dominates: ~16% of draws vs ~50% before; it repeats by design as a real-class anchor.
- All three verification gates green: validator (0/0), tsc (src clean), lint (clean); browser QA passed in both languages.
- No open regressions; subtopic id / template ids stable so existing progress records keep working (lin-absi-01 keeps its id).
