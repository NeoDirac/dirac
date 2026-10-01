import { templates } from "../src/content/physics/physics-foundations";
import { Rng } from "../src/lib/rng";

let issues = 0;
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
      if (/NaN|undefined|Infinity/.test(s)) { console.log(`!! ${t.id} seed ${seed}: NaN/undefined in: ${s.slice(0, 90)}`); issues++; }
    }
  }
}
console.log(issues === 0 ? "smoke clean" : `smoke found ${issues} issues`);
