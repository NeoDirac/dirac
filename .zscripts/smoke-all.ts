import { Rng } from "../src/lib/rng";
const files = [
  "../src/content/physics/physics-foundations.ts",
  "../src/content/physics/newtonian-mechanics.ts",
  "../src/content/physics/circular-gravitation.ts",
  "../src/content/physics/work-energy.ts",
  "../src/content/physics/momentum.ts",
  "../src/content/physics/rotational-motion.ts",
];
let issues = 0;
for (const f of files) {
  const { templates } = await import(f);
  for (const t of templates) {
    for (const seed of [1, 7, 4242, 999983]) {
      const c = t.generate(new Rng(seed));
      const all = [
        c.statement.es, c.statement.en, c.answerDisplay.es, c.answerDisplay.en,
        ...c.hints.flatMap(h => [h.es, h.en]),
        ...(Array.isArray(c.solution) ? c.solution : []).flatMap(s => [s.content.es, s.content.en]),
      ];
      for (const s of all) {
        if (/\$\{(?!\{)/.test(s)) { console.log(`!! ${t.id} seed ${seed}: raw \${ in: ${s.slice(0, 90)}`); issues++; }
        const dollars = (s.match(/\$/g) ?? []).length;
        if (dollars % 2 !== 0) { console.log(`?? ${t.id} seed ${seed}: odd $ in: ${s.slice(0, 90)}`); issues++; }
        if (/NaN|undefined|Infinity|function/.test(s)) { console.log(`!! ${t.id} seed ${seed}: bad token in: ${s.slice(0, 90)}`); issues++; }
        const toks = s.match(/\{\{([^}]*)\}\}/g) ?? [];
        for (const tk of toks) {
          const inner = tk.slice(2, -2);
          if (!Number.isFinite(Number(inner))) {
            console.log(`!! ${t.id} seed ${seed}: non-numeric token {{${inner}}} in: ${s.slice(0, 90)}`);
            issues++;
          }
        }
      }
    }
  }
}
console.log(issues === 0 ? "smoke clean (all 6 files, 4 seeds each)" : `smoke found ${issues} issues`);
