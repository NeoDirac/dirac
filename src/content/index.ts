/**
 * Content registry — lazy loaders that pull in every topic file.
 *
 * Adding a problem:
 *   1. open (or create) the topic file in src/content/<subject>/<topicId>.ts
 *   2. add a `template({...}, (rng) => ({ ... }))` entry to `templates`
 *   3. run `bun run validate:content` to verify the bank
 *
 * See src/content/GUIDE.md for the full authoring guide.
 */

import type { ProblemTemplate, Subject } from "@/lib/types";

const mathModules: Record<string, () => Promise<{ templates: ProblemTemplate[] }>> = {
  foundations: () => import("./math/foundations"),
  "linear-equations": () => import("./math/linear-equations"),
  systems: () => import("./math/systems"),
  polynomials: () => import("./math/polynomials"),
  quadratics: () => import("./math/quadratics"),
  rational: () => import("./math/rational"),
  radicals: () => import("./math/radicals"),
  functions: () => import("./math/functions"),
  "poly-functions": () => import("./math/poly-functions"),
  exponential: () => import("./math/exponential"),
  logarithmic: () => import("./math/logarithmic"),
  sequences: () => import("./math/sequences"),
  "analytic-geometry": () => import("./math/analytic-geometry"),
  "trig-foundations": () => import("./math/trig-foundations"),
  "trig-functions": () => import("./math/trig-functions"),
  "trig-equations": () => import("./math/trig-equations"),
  "trig-applications": () => import("./math/trig-applications"),
  "precalculus-mixed": () => import("./math/precalculus-mixed"),
};

const physicsModules: Record<string, () => Promise<{ templates: ProblemTemplate[] }>> = {
  "physics-foundations": () => import("./physics/physics-foundations"),
  "measurement-vectors": () => import("./physics/measurement-vectors"),
  kinematics: () => import("./physics/kinematics"),
  "newtonian-mechanics": () => import("./physics/newtonian-mechanics"),
  "circular-gravitation": () => import("./physics/circular-gravitation"),
  "work-energy": () => import("./physics/work-energy"),
  momentum: () => import("./physics/momentum"),
  "rotational-motion": () => import("./physics/rotational-motion"),
  fluids: () => import("./physics/fluids"),
  "oscillations-waves": () => import("./physics/oscillations-waves"),
  "thermal-physics": () => import("./physics/thermal-physics"),
  electrostatics: () => import("./physics/electrostatics"),
  circuits: () => import("./physics/circuits"),
  magnetism: () => import("./physics/magnetism"),
  induction: () => import("./physics/induction"),
  optics: () => import("./physics/optics"),
  "modern-physics": () => import("./physics/modern-physics"),
  "physics-mixed": () => import("./physics/physics-mixed"),
};

export async function getSubjectTemplates(subject: Subject): Promise<ProblemTemplate[]> {
  const modules = subject === "math" ? mathModules : physicsModules;
  const loaded = await Promise.all(Object.values(modules).map((m) => m()));
  return loaded.flatMap((m) => m.templates);
}

export async function getAllTemplates(): Promise<ProblemTemplate[]> {
  const [math, physics] = await Promise.all([getSubjectTemplates("math"), getSubjectTemplates("physics")]);
  return [...math, ...physics];
}
