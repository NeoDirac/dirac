import { templates } from "../src/content/physics/physics-foundations";
import { Rng } from "../src/lib/rng";
for (const id of ["pf-slope-01", "pf-chal-01", "pf-sigfig-02"]) {
  const t = templates.find(x => x.id === id)!;
  const c = t.generate(new Rng(4242));
  console.log("=== " + id + " (es) ===");
  console.log(c.statement.es);
  console.log("answer:", JSON.stringify(c.answer));
}
