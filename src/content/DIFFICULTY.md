# Difficulty rubric — v2 (reasoning-based)

This rubric replaces the old numeric-size heuristic. **Difficulty is measured by
the intellectual process the student must deploy, never by the size of the
numbers or the length of the arithmetic.** A single-formula problem with huge
numbers is Foundation; a two-absolute-value inequality with small numbers is
Advanced.

The four levels are shown to students as
**Fundamento / Estándar / Avanzado / Desafío** (ES) and
**Foundation / Standard / Advanced / Challenge** (EN). Internally (URL params,
`Difficulty` enum) the old keys `easy | medium | hard | challenge` are kept for
deep-link compatibility — the mapping is fixed:

| enum key | ES label | EN label | meaning |
|---|---|---|---|
| `easy` | Fundamento | Foundation | fundamental technique check |
| `medium` | Estándar | Standard | typical exam problem, one non-trivial step |
| `hard` | Avanzado | Advanced | several ideas / case analysis / non-obvious strategy |
| `challenge` | Desafío | Challenge | multi-stage reasoning, deep interpretation, parameters |

## Classification criteria

### Foundation (`easy`)
- One standard technique, applied once: solve |ax+b| = c, a·x = b, substitute into a formula.
- The decision the student makes is *which* known routine to apply, and the routine is unique.
- Example: `|x − 3| = 5` (two symmetric roots, no verification subtlety).

### Standard (`medium`)
- A routine exam problem that includes **one** non-trivial step: a domain to notice,
  a sign to fix, a formula to invert, one definition to unpack.
- May need a short verification (e.g. checking a candidate against the original equation).
- Example: count the integers in |x−a| < b; term rewriting with a stated domain;
  vertex of a parabola given in general form.

### Advanced (`hard`)
At least one of:
- **Case analysis**: the real line must be split into ≥2 intervals and each case
  solved and intersected with its own hypothesis (two absolute values, |·| vs parabola).
- **Parameters**: find the values of a parameter for which an equation has exactly
  N solutions, a line is tangent, an expression is defined.
- **Non-obvious strategy**: the first algebraic move is not the textbook reflex
  (complete the square inside an absolute value, symmetrise, bound both sides).
- **Significant algebra with a purpose**: multi-step manipulation whose *purpose*
  the student must see (e.g. reducing to a product to read off sign regions).
- **Graphical ↔ algebraic translation** with consequences (shading a region and
  matching it to computed intervals).
Examples: |2x−1| = |3x+5| (2 cases + verify — lower bound of Advanced);
f(x)=|2x+1|−|3x+2| > −1 (3 intervals); "for which k does x²−kx+k+3=0 have exactly
two distinct real solutions?".

### Challenge (`challenge`)
At least two Advanced criteria sustained simultaneously, or:
- Multi-stage modelling (build the model, solve, interpret, discard spurious roots).
- Deep interpretation: behaviour of a family of functions, rigorous justification
  of *why* the solution set is what it is, boundary analysis of parameter intervals.
- Multi-concept chains spanning topics (geometry + algebra + graph).
Examples (bank): FSP-2020-style problems (out of current scope, registered for the
calculus expansion), Atwood with two constraints, orbit problems combining
gravitation + circular motion.

## Anti-rules (what must NOT raise difficulty)
- Bigger coefficients. `|17x − 43| = 5` is Foundation, full stop.
- More decimal places or longer arithmetic.
- More of the *same* step repeated (three consecutive one-step equations ≠ Advanced).
- Formatting tricks (unusual notation) — that punishes reading, not reasoning.

## Relabeling the legacy bank (425 generated templates)
The generated bank was labelled under the old heuristic. Re-audit order:
1. `linear-equations` (abs value + inequalities) — done 2026-10-01, see worklog.
2. `quadratics`, `poly-functions`, `polynomials` — worst offenders relabeled with
   the curated import of 2026-10-01; full file pass scheduled next.
3. Remaining math files, then physics — scheduled with each file's next content
   pass; the validator reports the label distribution per topic on every run so
   drift is visible.

When in doubt, label DOWN: an over-labelled bank destroys trust in the tier
names, which is the whole point of the reform.
