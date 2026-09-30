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
