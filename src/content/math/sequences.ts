/**
 * MATH · Sequences & Series
 *
 * Arithmetic and geometric sequences, explicit and recursive formulas,
 * finite and geometric sums. All answers are exact and computed from
 * the generated parameters.
 */

import { template, L, step } from "@/lib/problem";
import type { ProblemTemplate, McOption } from "@/lib/types";

/** signed term: "+ 3" / "- 3" */
const pmTerm = (n: number): string => (n >= 0 ? `+ ${n}` : `- ${-n}`);

export const templates: ProblemTemplate[] = [
  /* ---------------------------------------------------------------- */
  /* Arithmetic: nth term                                             */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "seq-arith-01",
      subject: "math",
      topicId: "sequences",
      subtopicId: "arithmetic",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 90,
      tags: ["arithmetic-sequences"],
      prerequisites: ["linear-equations"],
    },
    (rng) => {
      const a1 = rng.int(-9, 9);
      const d = rng.pick([2, 3, 4, 5, -3, -4]);
      const n = rng.int(8, 15);
      const value = a1 + (n - 1) * d;
      return {
        skill: L("Término general de una aritmética", "General term of an arithmetic sequence"),
        statement: L(
          `En una sucesión aritmética el primer término es $a_{1} = ${a1}$ y la diferencia común es $d = ${d}$. ¿Cuánto vale el término $a_{${n}}$?`,
          `In an arithmetic sequence the first term is $a_{1} = ${a1}$ and the common difference is $d = ${d}$. What is the term $a_{${n}}$?`,
        ),
        answer: { kind: "numeric", value },
        hints: [
          L(
            "Cada término se obtiene sumando $d$ al anterior.",
            "Each term is obtained by adding $d$ to the previous one.",
          ),
          L(
            "La fórmula general es $a_{n} = a_{1} + (n - 1)\\,d$.",
            "The general formula is $a_{n} = a_{1} + (n - 1)\\,d$.",
          ),
          L(
            `Aquí $n - 1 = ${n - 1}$.`,
            `Here $n - 1 = ${n - 1}$.`,
          ),
        ],
        answerDisplay: L(`$a_{${n}} = ${value}$`, `$a_{${n}} = ${value}$`),
        solution: [
          step(
            "given",
            `$a_{1} = ${a1}$, $d = ${d}$, $n = ${n}$.`,
            `$a_{1} = ${a1}$, $d = ${d}$, $n = ${n}$.`,
          ),
          step(
            "approach",
            "Sustituimos en la fórmula del término general.",
            "Substitute into the general-term formula.",
          ),
          step(
            "calculation",
            `$a_{${n}} = ${a1} + ${n - 1} \\cdot (${d}) = ${a1} + ${(n - 1) * d} = ${value}$`,
            `$a_{${n}} = ${a1} + ${n - 1} \\cdot (${d}) = ${a1} + ${(n - 1) * d} = ${value}$`,
          ),
          step("result", `$a_{${n}} = ${value}$`, `$a_{${n}} = ${value}$`),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Geometric: nth term                                              */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "seq-geo-01",
      subject: "math",
      topicId: "sequences",
      subtopicId: "geometric",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 90,
      tags: ["geometric-sequences"],
      prerequisites: ["linear-equations"],
    },
    (rng) => {
      const a1 = rng.int(1, 6);
      const r = rng.pick([2, 3]);
      const n = r === 2 ? rng.int(6, 10) : rng.int(5, 7);
      const value = a1 * Math.pow(r, n - 1);
      return {
        skill: L("Término general de una geométrica", "General term of a geometric sequence"),
        statement: L(
          `En una sucesión geométrica el primer término es $a_{1} = ${a1}$ y la razón es $r = ${r}$. ¿Cuánto vale $a_{${n}}$?`,
          `In a geometric sequence the first term is $a_{1} = ${a1}$ and the common ratio is $r = ${r}$. What is $a_{${n}}$?`,
        ),
        answer: { kind: "numeric", value },
        hints: [
          L(
            "Cada término se obtiene multiplicando el anterior por $r$.",
            "Each term is obtained by multiplying the previous one by $r$.",
          ),
          L(
            "La fórmula general es $a_{n} = a_{1} \\cdot r^{\\,n-1\\,}$.",
            "The general formula is $a_{n} = a_{1} \\cdot r^{\\,n-1\\,}$.",
          ),
          L(
            `El exponente de $r$ es $${n - 1}$.`,
            `The exponent of $r$ is $${n - 1}$.`,
          ),
        ],
        answerDisplay: L(`$a_{${n}} = ${value}$`, `$a_{${n}} = ${value}$`),
        solution: [
          step(
            "given",
            `$a_{1} = ${a1}$, $r = ${r}$, $n = ${n}$.`,
            `$a_{1} = ${a1}$, $r = ${r}$, $n = ${n}$.`,
          ),
          step(
            "approach",
            "Sustituimos en la fórmula del término general.",
            "Substitute into the general-term formula.",
          ),
          step(
            "calculation",
            `$a_{${n}} = ${a1} \\cdot ${r}^{${n - 1}} = ${a1} \\cdot ${Math.pow(r, n - 1)} = ${value}$`,
            `$a_{${n}} = ${a1} \\cdot ${r}^{${n - 1}} = ${a1} \\cdot ${Math.pow(r, n - 1)} = ${value}$`,
          ),
          step("result", `$a_{${n}} = ${value}$`, `$a_{${n}} = ${value}$`),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Explicit formula (expression)                                    */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "seq-explicit-01",
      subject: "math",
      topicId: "sequences",
      subtopicId: "explicit",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 150,
      tags: ["arithmetic-sequences", "explicit-formula"],
      prerequisites: ["linear-equations"],
    },
    (rng) => {
      const a1 = rng.int(-9, 9);
      const d = rng.nonZeroInt(-8, 8);
      const b = a1 - d;
      const acc1 = `${a1} ${d >= 0 ? "+" : "-"} ${Math.abs(d)}*(n-1)`;
      const acc2 = b === 0 ? `${d}n` : `${d}n ${b >= 0 ? "+" : "-"} ${Math.abs(b)}`;
      const dispB = b === 0 ? "" : ` ${b >= 0 ? "+" : "-"} ${Math.abs(b)}`;
      return {
        skill: L("Fórmula explícita de una aritmética", "Explicit formula of an arithmetic sequence"),
        statement: L(
          `Una sucesión aritmética tiene $a_{1} = ${a1}$ y diferencia común $d = ${d}$. Escribe la fórmula explícita de $a_{n}$ en función de $n$ (por ejemplo: 3 + 2*(n-1) o 2*n + 1).`,
          `An arithmetic sequence has $a_{1} = ${a1}$ and common difference $d = ${d}$. Write the explicit formula for $a_{n}$ in terms of $n$ (e.g. 3 + 2*(n-1) or 2*n + 1).`,
        ),
        answer: {
          kind: "expression",
          accepted: [acc1, acc2],
          variables: ["n"],
        },
        hints: [
          L(
            "La fórmula general es $a_{n} = a_{1} + (n - 1)\\,d$.",
            "The general formula is $a_{n} = a_{1} + (n - 1)\\,d$.",
          ),
          L(
            "Sustituye los valores de $a_{1}$ y $d$.",
            "Substitute the values of $a_{1}$ and $d$.",
          ),
          L(
            "Puedes dejarla sin simplificar o repartir el $d$: ambas formas son correctas.",
            "You may leave it unsimplified or distribute the $d$: both forms are correct.",
          ),
        ],
        answerDisplay: L(`$a_{n} = ${d}n${dispB}$`, `$a_{n} = ${d}n${dispB}$`),
        solution: [
          step(
            "given",
            `$a_{1} = ${a1}$, $d = ${d}$.`,
            `$a_{1} = ${a1}$, $d = ${d}$.`,
          ),
          step(
            "approach",
            "Partimos de la fórmula general y sustituimos los parámetros.",
            "Start from the general formula and substitute the parameters.",
          ),
          step(
            "calculation",
            `$a_{n} = ${a1} + (${d})(n - 1)$<br>$= ${a1} + ${d}n - ${d}$<br>$= ${d}n${dispB}$`,
            `$a_{n} = ${a1} + (${d})(n - 1)$<br>$= ${a1} + ${d}n - ${d}$<br>$= ${d}n${dispB}$`,
          ),
          step(
            "result",
            `Tanto $${acc1}$ como $${acc2}$ (o cualquier forma equivalente) son correctas.`,
            `Either $${acc1}$ or $${acc2}$ (or any equivalent form) is correct.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Recursive: iterate the rule                                       */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "seq-rec-01",
      subject: "math",
      topicId: "sequences",
      subtopicId: "recursive",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 150,
      tags: ["recursive-formula"],
      prerequisites: ["linear-equations"],
    },
    (rng) => {
      const a1 = rng.int(1, 4);
      const m = rng.pick([2, 3]);
      const s = rng.pick([-2, -1, 1, 2]);
      const a2 = m * a1 + s;
      const a3 = m * a2 + s;
      const a4 = m * a3 + s;
      const sg = s >= 0 ? "+" : "-";
      return {
        skill: L("Aplicar una fórmula recursiva", "Applying a recursive formula"),
        statement: L(
          `Una sucesión se define por $a_{1} = ${a1}$ y $a_{n+1} = ${m}a_{n} ${sg} ${Math.abs(s)}$. ¿Cuánto vale $a_{4}$?`,
          `A sequence is defined by $a_{1} = ${a1}$ and $a_{n+1} = ${m}a_{n} ${sg} ${Math.abs(s)}$. What is $a_{4}$?`,
        ),
        answer: { kind: "numeric", value: a4 },
        hints: [
          L(
            "Aplica la regla paso a paso desde $a_{1}$.",
            "Apply the rule step by step starting from $a_{1}$.",
          ),
          L(
            `Primero: $a_{2} = ${m} \\cdot ${a1} ${sg} ${Math.abs(s)}$.`,
            `First: $a_{2} = ${m} \\cdot ${a1} ${sg} ${Math.abs(s)}$.`,
          ),
          L(
            "Repite el proceso dos veces más con el resultado obtenido.",
            "Repeat the process twice more with each result.",
          ),
        ],
        answerDisplay: L(`$a_{4} = ${a4}$`, `$a_{4} = ${a4}$`),
        solution: [
          step(
            "given",
            `$a_{1} = ${a1}$, $\\quad a_{n+1} = ${m}a_{n} ${sg} ${Math.abs(s)}$.`,
            `$a_{1} = ${a1}$, $\\quad a_{n+1} = ${m}a_{n} ${sg} ${Math.abs(s)}$.`,
          ),
          step(
            "approach",
            "Las fórmulas recursivas se evalúan iterando: cada término usa el anterior.",
            "Recursive formulas are evaluated by iterating: each term uses the previous one.",
          ),
          step(
            "calculation",
            `$a_{2} = ${m} \\cdot ${a1} ${sg} ${Math.abs(s)} = ${a2}$<br>$a_{3} = ${m} \\cdot ${a2} ${sg} ${Math.abs(s)} = ${a3}$<br>$a_{4} = ${m} \\cdot ${a3} ${sg} ${Math.abs(s)} = ${a4}$`,
            `$a_{2} = ${m} \\cdot ${a1} ${sg} ${Math.abs(s)} = ${a2}$<br>$a_{3} = ${m} \\cdot ${a2} ${sg} ${Math.abs(s)} = ${a3}$<br>$a_{4} = ${m} \\cdot ${a3} ${sg} ${Math.abs(s)} = ${a4}$`,
          ),
          step("result", `$a_{4} = ${a4}$`, `$a_{4} = ${a4}$`),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Finite sums: Gauss formula                                        */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "seq-sum-01",
      subject: "math",
      topicId: "sequences",
      subtopicId: "finite-sums",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 180,
      tags: ["arithmetic-series", "gauss"],
      prerequisites: ["linear-equations"],
    },
    (rng) => {
      const a1 = rng.int(-5, 10);
      const d = rng.pick([2, 4, 6]);
      const n = rng.int(10, 20);
      const an = a1 + (n - 1) * d;
      const value = (n * (a1 + an)) / 2;
      return {
        skill: L("Suma de una aritmética", "Sum of an arithmetic sequence"),
        statement: L(
          `Una sucesión aritmética tiene $a_{1} = ${a1}$ y $d = ${d}$. Calcula la suma de los primeros $${n}$ términos, $S_{${n}}$.`,
          `An arithmetic sequence has $a_{1} = ${a1}$ and $d = ${d}$. Compute the sum of the first $${n}$ terms, $S_{${n}}$.`,
        ),
        answer: { kind: "numeric", value },
        hints: [
          L(
            "Usa la fórmula de Gauss: $S_{n} = \\frac{n\\,(a_{1} + a_{n})}{2}$.",
            "Use Gauss's formula: $S_{n} = \\frac{n\\,(a_{1} + a_{n})}{2}$.",
          ),
          L(
            `Antes necesitas el último término $a_{${n}}$.`,
            `You first need the last term $a_{${n}}$.`,
          ),
          L(
            `Suma el primer y el último término, multiplica por $${n}$ y divide entre $2$.`,
            `Add the first and last terms, multiply by $${n}$, and divide by $2$.`,
          ),
        ],
        answerDisplay: L(`$S_{${n}} = ${value}$`, `$S_{${n}} = ${value}$`),
        solution: [
          step(
            "given",
            `$a_{1} = ${a1}$, $d = ${d}$, $n = ${n}$.`,
            `$a_{1} = ${a1}$, $d = ${d}$, $n = ${n}$.`,
          ),
          step(
            "approach",
            "Calculamos el último término y aplicamos la fórmula de la suma.",
            "Compute the last term and apply the sum formula.",
          ),
          step(
            "calculation",
            `$a_{${n}} = ${a1} + ${n - 1} \\cdot ${d} = ${an}$<br>$S_{${n}} = \\frac{${n}\\,(${a1} + ${an})}{2} = \\frac{${n} \\cdot ${a1 + an}}{2} = ${value}$`,
            `$a_{${n}} = ${a1} + ${n - 1} \\cdot ${d} = ${an}$<br>$S_{${n}} = \\frac{${n}\\,(${a1} + ${an})}{2} = \\frac{${n} \\cdot ${a1 + an}}{2} = ${value}$`,
          ),
          step(
            "result",
            `La suma de los primeros $${n}$ términos es $${value}$.`,
            `The sum of the first $${n}$ terms is $${value}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Geometric sums                                                    */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "seq-geo-sum-01",
      subject: "math",
      topicId: "sequences",
      subtopicId: "geometric-sums",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 180,
      tags: ["geometric-series"],
      prerequisites: ["linear-equations"],
    },
    (rng) => {
      const a1 = rng.int(1, 5);
      const r = rng.pick([2, 3]);
      const n = r === 2 ? rng.int(6, 10) : rng.int(5, 7);
      const rn = Math.pow(r, n);
      const value = (a1 * (rn - 1)) / (r - 1);
      return {
        skill: L("Suma de una geométrica", "Sum of a geometric sequence"),
        statement: L(
          `Una sucesión geométrica tiene $a_{1} = ${a1}$ y razón $r = ${r}$. Calcula $S_{${n}} = a_{1} + a_{2} + \\cdots + a_{${n}}$.`,
          `A geometric sequence has $a_{1} = ${a1}$ and ratio $r = ${r}$. Compute $S_{${n}} = a_{1} + a_{2} + \\cdots + a_{${n}}$.`,
        ),
        answer: { kind: "numeric", value },
        hints: [
          L(
            "Usa la fórmula $S_{n} = a_{1}\\,\\dfrac{r^{n} - 1}{r - 1}$.",
            "Use the formula $S_{n} = a_{1}\\,\\dfrac{r^{n} - 1}{r - 1}$.",
          ),
          L(
            `Primero calcula $${r}^{${n}}$.`,
            `First compute $${r}^{${n}}$.`,
          ),
          L(
            `Resta 1, divide entre $${r - 1}$ y multiplica por $${a1}$.`,
            `Subtract 1, divide by $${r - 1}$, and multiply by $${a1}$.`,
          ),
        ],
        answerDisplay: L(`$S_{${n}} = ${value}$`, `$S_{${n}} = ${value}$`),
        solution: [
          step(
            "given",
            `$a_{1} = ${a1}$, $r = ${r}$, $n = ${n}$.`,
            `$a_{1} = ${a1}$, $r = ${r}$, $n = ${n}$.`,
          ),
          step(
            "approach",
            "Sustituimos en la fórmula de la suma geométrica finita.",
            "Substitute into the finite geometric sum formula.",
          ),
          step(
            "calculation",
            `$S_{${n}} = ${a1} \\cdot \\frac{${r}^{${n}} - 1}{${r} - 1} = ${a1} \\cdot \\frac{${rn} - 1}{${r - 1}} = ${a1} \\cdot \\frac{${rn - 1}}{${r - 1}} = ${value}$`,
            `$S_{${n}} = ${a1} \\cdot \\frac{${r}^{${n}} - 1}{${r} - 1} = ${a1} \\cdot \\frac{${rn} - 1}{${r - 1}} = ${a1} \\cdot \\frac{${rn - 1}}{${r - 1}} = ${value}$`,
          ),
          step(
            "result",
            `La suma de los primeros $${n}$ términos es $${value}$.`,
            `The sum of the first $${n}$ terms is $${value}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Classification (MC)                                              */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "seq-type-01",
      subject: "math",
      topicId: "sequences",
      subtopicId: "arithmetic",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["classification", "arithmetic-sequences", "geometric-sequences"],
      prerequisites: ["linear-equations"],
    },
    (rng) => {
      const kind = rng.pick(["arit", "geo", "none"] as const);
      let terms: number[];
      let correct: McOption;
      let d1: McOption;
      let d2: McOption;
      if (kind === "arit") {
        const d = rng.int(3, 6);
        const t = rng.int(-3, 8);
        terms = [t, t + d, t + 2 * d, t + 3 * d];
        correct = {
          id: "a",
          text: L(`Aritmética, de diferencia $${d}$`, `Arithmetic, common difference $${d}$`),
          correct: true,
        };
        d1 = {
          id: "b",
          text: L(`Geométrica, de razón $${d}$`, `Geometric, common ratio $${d}$`),
          correct: false,
        };
        d2 = {
          id: "c",
          text: L("Ni aritmética ni geométrica", "Neither arithmetic nor geometric"),
          correct: false,
        };
      } else if (kind === "geo") {
        const r = rng.pick([2, 3]);
        const t = rng.int(1, 4);
        terms = [t, t * r, t * r * r, t * r * r * r];
        correct = {
          id: "a",
          text: L(`Geométrica, de razón $${r}$`, `Geometric, common ratio $${r}$`),
          correct: true,
        };
        d1 = {
          id: "b",
          text: L(`Aritmética, de diferencia $${t * r - t}$`, `Arithmetic, common difference $${t * r - t}$`),
          correct: false,
        };
        d2 = {
          id: "c",
          text: L("Ni aritmética ni geométrica", "Neither arithmetic nor geometric"),
          correct: false,
        };
      } else {
        const squares = rng.bool();
        if (squares) {
          const c0 = rng.int(0, 3);
          terms = [c0 + 1, c0 + 4, c0 + 9, c0 + 16];
        } else {
          const p = rng.int(1, 4);
          const q = rng.int(p + 1, p + 4);
          terms = [p, q, p + q, p + 2 * q];
        }
        const ratio0 = terms[1] / terms[0];
        correct = {
          id: "a",
          text: L("Ni aritmética ni geométrica", "Neither arithmetic nor geometric"),
          correct: true,
        };
        d1 = {
          id: "b",
          text: L(
            `Aritmética, de diferencia $${terms[1] - terms[0]}$`,
            `Arithmetic, common difference $${terms[1] - terms[0]}$`,
          ),
          correct: false,
        };
        const rInt = Number.isInteger(ratio0) ? ratio0 : 2;
        d2 = {
          id: "c",
          text: L(`Geométrica, de razón $${rInt}$`, `Geometric, common ratio $${rInt}$`),
          correct: false,
        };
      }
      const options = rng.shuffle([correct, d1, d2]);
      const diffs = [terms[1] - terms[0], terms[2] - terms[1], terms[3] - terms[2]];
      const isArit = diffs[0] === diffs[1] && diffs[1] === diffs[2];
      const isGeo = !isArit && terms[1] * terms[1] === terms[0] * terms[2] && terms[2] * terms[2] === terms[1] * terms[3];
      return {
        skill: L("Clasificar una sucesión", "Classifying a sequence"),
        statement: L(
          `Analiza la sucesión: $${terms.join(",\\; ")}$. ¿Cómo es?`,
          `Analyze the sequence: $${terms.join(",\\; ")}$. What kind is it?`,
        ),
        answer: { kind: "multiple-choice", options },
        hints: [
          L(
            "Mira las **diferencias** entre términos consecutivos.",
            "Look at the **differences** between consecutive terms.",
          ),
          L(
            "Si las diferencias son constantes, es aritmética; si los **cocientes** son constantes, es geométrica.",
            "If the differences are constant, it is arithmetic; if the **ratios** are constant, it is geometric.",
          ),
          L(
            "Comprueba al menos dos pares consecutivos antes de decidir.",
            "Check at least two consecutive pairs before deciding.",
          ),
        ],
        answerDisplay: correct.text,
        solution: [
          step(
            "given",
            `Sucesión: $${terms.join(",\\; ")}$.`,
            `Sequence: $${terms.join(",\\; ")}$.`,
          ),
          step(
            "approach",
            "Calculamos diferencias y cocientes consecutivos y buscamos constantes.",
            "Compute consecutive differences and ratios and look for constants.",
          ),
          step(
            "calculation",
            `Diferencias: $${diffs[0]}$, $${diffs[1]}$, $${diffs[2]}$ → ${isArit ? "constantes" : "no constantes"}.<br>Cocientes: $${terms[1]} \\div ${terms[0]}$, $${terms[2]} \\div ${terms[1]}$ → ${isGeo ? "constantes" : "no constantes"}.`,
            `Differences: $${diffs[0]}$, $${diffs[1]}$, $${diffs[2]}$ → ${isArit ? "constant" : "not constant"}.<br>Ratios: $${terms[1]} \\div ${terms[0]}$, $${terms[2]} \\div ${terms[1]}$ → ${isGeo ? "constant" : "not constant"}.`,
          ),
          step(
            "result",
            isArit
              ? "Las diferencias son constantes: es aritmética."
              : isGeo
                ? "Los cocientes son constantes: es geométrica."
                : "Ni las diferencias ni los cocientes son constantes: no es aritmética ni geométrica.",
            isArit
              ? "The differences are constant: it is arithmetic."
              : isGeo
                ? "The ratios are constant: it is geometric."
                : "Neither differences nor ratios are constant: it is neither arithmetic nor geometric.",
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Geometric: how many terms were summed                            */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "seq-geo-02",
      subject: "math",
      topicId: "sequences",
      subtopicId: "geometric",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 210,
      tags: ["geometric-series", "equations"],
      prerequisites: ["linear-equations"],
    },
    (rng) => {
      const a1 = rng.pick([1, 2]);
      const n = rng.int(6, 10);
      const S = a1 * (Math.pow(2, n) - 1);
      return {
        skill: L("Invertir la fórmula de la suma", "Inverting the sum formula"),
        statement: L(
          `La suma de los primeros $n$ términos de una sucesión geométrica con $a_{1} = ${a1}$ y $r = 2$ vale $S_{n} = ${S}$. ¿Cuántos términos se han sumado?`,
          `The sum of the first $n$ terms of a geometric sequence with $a_{1} = ${a1}$ and $r = 2$ equals $S_{n} = ${S}$. How many terms were added?`,
        ),
        answer: { kind: "numeric", value: n },
        hints: [
          L(
            "La fórmula de la suma es $S_{n} = a_{1}\\,(2^{n} - 1)$.",
            "The sum formula is $S_{n} = a_{1}\\,(2^{n} - 1)$.",
          ),
          L(
            `Plantea $${a1}\\,(2^{n} - 1) = ${S}$ y despeja $2^{n}$.`,
            `Set up $${a1}\\,(2^{n} - 1) = ${S}$ and solve for $2^{n}$.`,
          ),
          L(
            "El resultado debe ser una potencia exacta de 2: identifica el exponente.",
            "The result must be an exact power of 2: identify the exponent.",
          ),
        ],
        answerDisplay: L(`$n = ${n}$`, `$n = ${n}$`),
        solution: [
          step(
            "given",
            `$a_{1} = ${a1}$, $r = 2$, $S_{n} = ${S}$.`,
            `$a_{1} = ${a1}$, $r = 2$, $S_{n} = ${S}$.`,
          ),
          step(
            "approach",
            "Invertimos la fórmula de la suma y reconocemos la potencia de 2.",
            "Invert the sum formula and recognize the power of 2.",
          ),
          step(
            "calculation",
            `$${a1}\\,(2^{n} - 1) = ${S}$<br>$2^{n} - 1 = ${S / a1}$<br>$2^{n} = ${S / a1 + 1} = ${Math.pow(2, n)}$<br>$n = ${n}$`,
            `$${a1}\\,(2^{n} - 1) = ${S}$<br>$2^{n} - 1 = ${S / a1}$<br>$2^{n} = ${S / a1 + 1} = ${Math.pow(2, n)}$<br>$n = ${n}$`,
          ),
          step("result", `Se sumaron $${n}$ términos.`, `$${n}$ terms were added.`),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Arithmetic: find d from two terms                                 */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "seq-arith-02",
      subject: "math",
      topicId: "sequences",
      subtopicId: "arithmetic",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 210,
      tags: ["arithmetic-sequences", "equations"],
      prerequisites: ["linear-equations"],
    },
    (rng) => {
      const a1 = rng.int(-8, 8);
      const d = rng.nonZeroInt(-6, 6);
      const i = rng.int(2, 4);
      const g = rng.int(5, 9);
      const j = i + g;
      const ai = a1 + (i - 1) * d;
      const aj = a1 + (j - 1) * d;
      return {
        skill: L("Diferencia común a partir de dos términos", "Common difference from two terms"),
        statement: L(
          `En una sucesión aritmética se sabe que $a_{${i}} = ${ai}$ y $a_{${j}} = ${aj}$. ¿Cuál es la diferencia común $d$?`,
          `In an arithmetic sequence you know $a_{${i}} = ${ai}$ and $a_{${j}} = ${aj}$. What is the common difference $d$?`,
        ),
        answer: { kind: "numeric", value: d },
        hints: [
          L(
            "De $a_{i}$ a $a_{j}$ hay $(j - i)$ pasos de tamaño $d$.",
            `From $a_{i}$ to $a_{j}$ there are $(j - i)$ steps of size $d$.`,
          ),
          L(
            `Aquí hay $${j} - ${i} = ${g}$ pasos.`,
            `Here there are $${j} - ${i} = ${g}$ steps.`,
          ),
          L(
            `Divide la variación total $a_{${j}} - a_{${i}}$ entre el número de pasos.`,
            `Divide the total change $a_{${j}} - a_{${i}}$ by the number of steps.`,
          ),
        ],
        answerDisplay: L(`$d = ${d}$`, `$d = ${d}$`),
        solution: [
          step(
            "given",
            `$a_{${i}} = ${ai}$, $a_{${j}} = ${aj}$.`,
            `$a_{${i}} = ${ai}$, $a_{${j}} = ${aj}$.`,
          ),
          step(
            "approach",
            "La diferencia entre dos términos es $(j - i)\\,d$; despejamos $d$.",
            "The difference between two terms is $(j - i)\\,d$; solve for $d$.",
          ),
          step(
            "calculation",
            `$a_{${j}} - a_{${i}} = ${aj} - (${ai}) = ${aj - ai}$<br>$(${j} - ${i}) \\cdot d = ${aj - ai}$<br>$${g}\\,d = ${aj - ai}$<br>$d = \\frac{${aj - ai}}{${g}} = ${d}$`,
            `$a_{${j}} - a_{${i}} = ${aj} - (${ai}) = ${aj - ai}$<br>$(${j} - ${i}) \\cdot d = ${aj - ai}$<br>$${g}\\,d = ${aj - ai}$<br>$d = \\frac{${aj - ai}}{${g}} = ${d}$`,
          ),
          step("result", `$d = ${d}$`, `$d = ${d}$`),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Challenge: recover a1 from S_n and a_n                            */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "seq-chal-01",
      subject: "math",
      topicId: "sequences",
      subtopicId: "finite-sums",
      difficulty: "challenge",
      questionType: "numeric",
      estimatedTimeSec: 300,
      tags: ["arithmetic-series", "multi-step", "equations"],
      prerequisites: ["linear-equations"],
    },
    (rng) => {
      const n = rng.pick([13, 15, 17]);
      const a1 = rng.int(10, 40);
      const d = rng.int(3, 8);
      const an = a1 + (n - 1) * d;
      const S = (n * (a1 + an)) / 2;
      return {
        skill: L("Recuperar el primer término", "Recovering the first term"),
        statement: L(
          `En una sucesión aritmética, la suma de los primeros $${n}$ términos es $S_{${n}} = ${S}$ y el último de ellos vale $a_{${n}} = ${an}$. ¿Cuánto vale el primer término $a_{1}$?`,
          `In an arithmetic sequence, the sum of the first $${n}$ terms is $S_{${n}} = ${S}$ and the last of them equals $a_{${n}} = ${an}$. What is the first term $a_{1}$?`,
        ),
        answer: { kind: "numeric", value: a1 },
        hints: [
          L(
            "La fórmula de Gauss une la suma con el primero y el último término: $S_{n} = \\frac{n\\,(a_{1} + a_{n})}{2}$.",
            "Gauss's formula links the sum to the first and last terms: $S_{n} = \\frac{n\\,(a_{1} + a_{n})}{2}$.",
          ),
          L(
            "Despeja $(a_{1} + a_{n})$ multiplicando por 2 y dividiendo entre $n$.",
            "Isolate $(a_{1} + a_{n})$ by multiplying by 2 and dividing by $n$.",
          ),
          L(
            `Resta el valor conocido de $a_{${n}}$.`,
            `Subtract the known value of $a_{${n}}$.`,
          ),
        ],
        answerDisplay: L(`$a_{1} = ${a1}$`, `$a_{1} = ${a1}$`),
        solution: [
          step(
            "given",
            `$S_{${n}} = ${S}$, $a_{${n}} = ${an}$, $n = ${n}$.`,
            `$S_{${n}} = ${S}$, $a_{${n}} = ${an}$, $n = ${n}$.`,
          ),
          step(
            "approach",
            "Usamos la fórmula de la suma en función de los extremos y despejamos $a_{1}$.",
            "Use the sum formula in terms of the end terms and solve for $a_{1}$.",
          ),
          step(
            "calculation",
            `$S_{${n}} = \\frac{${n}\\,(a_{1} + ${an})}{2} = ${S}$<br>$a_{1} + ${an} = \\frac{2 \\cdot ${S}}{${n}} = ${a1 + an}$<br>$a_{1} = ${a1 + an} - ${an} = ${a1}$`,
            `$S_{${n}} = \\frac{${n}\\,(a_{1} + ${an})}{2} = ${S}$<br>$a_{1} + ${an} = \\frac{2 \\cdot ${S}}{${n}} = ${a1 + an}$<br>$a_{1} = ${a1 + an} - ${an} = ${a1}$`,
          ),
          step(
            "result",
            `El primer término es $a_{1} = ${a1}$.`,
            `The first term is $a_{1} = ${a1}$.`,
          ),
        ],
      };
    },
  ),

  /* ================================================================== */
  /* Curated — ESPOL Fundamentos, EDICIÓN DIGITAL (TUTOR_LICENSED).      */
  /* Chapter 2 «Ejercicios propuestos», §2.13, pp. 247-250 (PDF 280-283)*/
  /* Tutor's brief: the most difficult / integrative ones.              */
  /* Double-verified: printed key pp. 939-940 + sympy (41/41 checks).    */
  /* #151 has no printed key — sympy-only (128 terms, 105..994).        */
  /* ================================================================== */

  /* 125 — PA: Sₙ=168, a₁=30, d=−2 → n = 7 ó 24 (aₙ: 18 ó −16). Key: a) 24,7 b) -16,18. */
  template(
    {
      id: "seq-espol-ch2-125",
      subject: "math",
      topicId: "sequences",
      subtopicId: "finite-sums",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 270,
      tags: ["arithmetic", "sum-formula", "quadratic-in-n"],
      prerequisites: ["arithmetic"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 125",
        page: 247,
      },
      reasoning: "parameters",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$n = 7$ ó $n = 24$`, `$n = 7$ or $n = 24$`), correct: true },
        { id: "b", text: L(`solo $n = 7$`, `only $n = 7$`), correct: false },
        { id: "c", text: L(`solo $n = 24$`, `only $n = 24$`), correct: false },
        { id: "d", text: L(`$n = 8$ ó $n = 21$`, `$n = 8$ or $n = 21$`), correct: false },
        { id: "e", text: L(`$n = 6$ ó $n = 28$`, `$n = 6$ or $n = 28$`), correct: false },
      ];
      return {
        skill: L("Sₙ conocida, n desconocido: la suma es cuadrática en n", "Sₙ known, n unknown: the sum is quadratic in n"),
        statement: L(
          "La suma de los $n$ primeros términos de una progresión aritmética es $168$. El primer término es $30$ y la diferencia es $-2$. Determinar los posibles valores de $n$ (los posibles valores de $a_{n}$ se desarrollan en la solución).",
          "The sum of the first $n$ terms of an arithmetic progression is $168$. The first term is $30$ and the common difference is $-2$. Determine the possible values of $n$ (the possible values of $a_{n}$ are developed in the solution).",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Escribe la suma con la fórmula que usa $a_{1}$ y $d$: $S_{n} = \\frac{n}{2}\\left[2a_{1} + (n-1)d\\right]$.",
            "Write the sum with the formula using $a_{1}$ and $d$: $S_{n} = \\frac{n}{2}\\left[2a_{1} + (n-1)d\\right]$.",
          ),
          L(
            "Con $a_{1} = 30$, $d = -2$: $S_{n} = \\frac{n}{2}(60 - 2n + 2) = 31n - n^{2}$; iguala a $168$.",
            "With $a_{1} = 30$, $d = -2$: $S_{n} = \\frac{n}{2}(60 - 2n + 2) = 31n - n^{2}$; set it equal to $168$.",
          ),
          L(
            "Queda $n^{2} - 31n + 168 = 0$; factoriza buscando dos números que multipliquen $168$ y sumen $31$.",
            "You get $n^{2} - 31n + 168 = 0$; factor looking for two numbers that multiply to $168$ and add to $31$.",
          ),
        ],
        answerDisplay: L(
          "$n \\in \\{7,\\ 24\\}$; con ellos $a_{n} \\in \\{18,\\ -16\\}$",
          "$n \\in \\{7,\\ 24\\}$; accordingly $a_{n} \\in \\{18,\\ -16\\}$",
        ),
        solution: [
          step(
            "given",
            "PA con $a_{1} = 30$, $d = -2$; $S_{n} = 168$; incógnita: $n$ (y después $a_{n}$).",
            "AP with $a_{1} = 30$, $d = -2$; $S_{n} = 168$; unknown: $n$ (and then $a_{n}$).",
          ),
          step(
            "approach",
            "La fórmula de la suma es cuadrática en $n$: plantearla y resolver la cuadrática; ambos enteros positivos son válidos (la serie empieza a decrecer cuando $d < 0$).",
            "The sum formula is quadratic in $n$: set it up and solve the quadratic; both positive integer roots are valid (with $d < 0$ the terms eventually decrease).",
          ),
          step(
            "calculation",
            "$S_{n} = \\frac{n}{2}\\left[60 - 2(n - 1)\\right] = \\frac{n}{2}(62 - 2n) = 31n - n^{2}$<br>$31n - n^{2} = 168 \\Rightarrow n^{2} - 31n + 168 = 0 \\Rightarrow (n - 7)(n - 24) = 0$<br>$n = 7$ o $n = 24$.<br>$a_{7} = 30 + 6(-2) = 18$; $\\quad a_{24} = 30 + 23(-2) = -16$.",
            "$S_{n} = \\frac{n}{2}\\left[60 - 2(n - 1)\\right] = 31n - n^{2}$<br>$31n - n^{2} = 168 \\Rightarrow n^{2} - 31n + 168 = 0 \\Rightarrow (n - 7)(n - 24) = 0$<br>$n = 7$ or $n = 24$.<br>$a_{7} = 30 + 6(-2) = 18$; $\\quad a_{24} = 30 + 23(-2) = -16$.",
          ),
          step(
            "result",
            "$n \\in \\{7, 24\\}$ con $a_{n} \\in \\{18, -16\\}$ (clave del libro: a) 24, 7; b) −16, 18 ✓). Comprobación: $S_{7} = \\frac{7}{2}(30 + 18) = 168$ ✓ y $S_{24} = \\frac{24}{2}(30 - 16) = 12 \\cdot 14 = 168$ ✓.",
            "$n \\in \\{7, 24\\}$ with $a_{n} \\in \\{18, -16\\}$ (book key: a) 24, 7; b) −16, 18 ✓). Check: $S_{7} = \\frac{7}{2}(30 + 18) = 168$ ✓ and $S_{24} = \\frac{24}{2}(30 - 16) = 168$ ✓.",
          ),
        ],
      };
    },
  ),

  /* 129 — PG a₁=2, Σ₃=86 → suma de los valores de r = −1 (r = 6 ó −7). Key: (c). */
  template(
    {
      id: "seq-espol-ch2-129",
      subject: "math",
      topicId: "sequences",
      subtopicId: "geometric",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["geometric", "sum", "two-roots"],
      prerequisites: ["geometric"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 129",
        page: 247,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`La media geométrica de los tres primeros números es $-\\frac{1}{2}$.`, `The geometric mean of the first three numbers is $-\\frac{1}{2}$.`), correct: false },
        { id: "b", text: L(`Hay un solo valor posible de la razón $(r)$.`, `There is only one possible value of the ratio $(r)$.`), correct: false },
        { id: "c", text: L(`La suma de los valores de $r$ es $-1$.`, `The sum of the values of $r$ is $-1$.`), correct: true },
        { id: "d", text: L(`La suma de los valores de $r$ es $13$.`, `The sum of the values of $r$ is $13$.`), correct: false },
        { id: "e", text: L(`La suma de los valores de $r$ es $-13$.`, `The sum of the values of $r$ is $-13$.`), correct: false },
      ];
      return {
        skill: L("PG con suma conocida: la razón aparece dos veces", "GP with known sum: the ratio shows up twice"),
        statement: L(
          "Sea una progresión geométrica cuyo primer término es $2$ y la suma de los tres primeros términos es $86$, entonces es verdad que:",
          "Let a geometric progression have first term $2$ and let the sum of its first three terms be $86$; then it is true that:",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Los tres primeros términos son $2$, $2r$, $2r^{2}$; su suma es $2(1 + r + r^{2}) = 86$.",
            "The first three terms are $2$, $2r$, $2r^{2}$; their sum is $2(1 + r + r^{2}) = 86$.",
          ),
          L(
            "Divide entre 2: $r^{2} + r - 42 = 0$; factoriza (¿dos números que multipliquen $-42$ y sumen $1$?).",
            "Divide by 2: $r^{2} + r - 42 = 0$; factor it (two numbers multiplying to $-42$ adding to $1$?).",
          ),
          L(
            "Obtendrás DOS valores de $r$; la pregunta es por su suma — o usa Vieta sin calcularlas.",
            "You will get TWO values of $r$; the question asks for their sum — or use Vieta without computing them.",
          ),
        ],
        answerDisplay: L(
          "$r = 6$ ó $r = -7$; suma de los valores de $r$: $-1$",
          "$r = 6$ or $r = -7$; sum of the $r$-values: $-1$",
        ),
        solution: [
          step(
            "given",
            "PG con $a_{1} = 2$; $2 + 2r + 2r^{2} = 86$.",
            "GP with $a_{1} = 2$; $2 + 2r + 2r^{2} = 86$.",
          ),
          step(
            "approach",
            "La suma de los tres primeros es cuadrática en $r$; aquí hay dos razones posibles, y el dato pedido (la suma de ambos valores) sale directo de Vieta.",
            "The three-term sum is quadratic in $r$; there are two possible ratios, and the requested datum (the sum of both values) comes straight from Vieta.",
          ),
          step(
            "calculation",
            "$2(1 + r + r^{2}) = 86 \\Rightarrow r^{2} + r - 42 = 0 \\Rightarrow (r + 7)(r - 6) = 0$<br>$r = 6$ o $r = -7$.<br>Vieta: suma de raíces $= -\\frac{1}{1} = -1$ (producto $-42$).",
            "$2(1 + r + r^{2}) = 86 \\Rightarrow r^{2} + r - 42 = 0 \\Rightarrow (r + 7)(r - 6) = 0$<br>$r = 6$ or $r = -7$.<br>Vieta: sum of roots $= -\\frac{1}{1} = -1$ (product $-42$).",
          ),
          step(
            "result",
            "La suma de los valores de $r$ es $-1$ (opción c; clave del libro: (c) ✓). Comprobación: $2 + 12 + 72 = 86$ ✓ con $r = 6$; $2 - 14 + 98 = 86$ ✓ con $r = -7$.",
            "The sum of the $r$-values is $-1$ (option c; book key: (c) ✓). Check: $2 + 12 + 72 = 86$ ✓ with $r = 6$; $2 - 14 + 98 = 86$ ✓ with $r = -7$.",
          ),
        ],
      };
    },
  ),

  /* 136 — ganó cada día la mitad del anterior; día 10: $10 → día 1: $5120. */
  template(
    {
      id: "seq-espol-ch2-136",
      subject: "math",
      topicId: "sequences",
      subtopicId: "geometric",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 180,
      tags: ["geometric", "backward", "halving"],
      prerequisites: ["geometric"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 136",
        page: 248,
      },
      reasoning: "modeling",
    },
    () => ({
      skill: L("Retroceder una PG de razón ½ (cada día hacia atrás duplica)", "Walking a GP of ratio ½ backwards (each day back doubles)"),
      statement: L(
        "Un hombre jugó durante 10 días y cada día ganó $\\frac{1}{2}$ de lo que ganó el día anterior. Si el décimo día ganó $10$, ¿cuánto ganó el primer día? (Responde en dólares.)",
        "A man gambled for 10 days and each day he won $\\frac{1}{2}$ of what he won the previous day. If on the tenth day he won $10$, how much did he win the first day? (Answer in dollars.)",
      ),
      answer: { kind: "numeric", value: 5120 },
      hints: [
        L(
          "Las ganancias forman una PG con razón $\\frac{1}{2}$: si el día $k$ ganó $g_{k}$, el día $k-1$ ganó el doble.",
          "The winnings form a GP with ratio $\\frac{1}{2}$: if day $k$ paid $g_{k}$, day $k-1$ paid twice as much.",
        ),
        L(
          "El día 9 ganó $2 \\cdot 10 = 20$; el día 8, $40$… Retroceder del día 10 al día 1 son 9 pasos hacia atrás.",
          "Day 9 paid $2 \\cdot 10 = 20$; day 8, $40$… Going back from day 10 to day 1 is 9 backward steps.",
        ),
        L(
          "Día 1: $10 \\cdot 2^{9}$ — calcula la potencia.",
          "Day 1: $10 \\cdot 2^{9}$ — compute the power.",
        ),
      ],
      answerDisplay: L(`$\\$5120$`, `$\\$5120$`),
      solution: [
        step(
          "given",
          "PG de razón $\\frac{1}{2}$ hacia adelante; $g_{10} = \\$10$; se pide $g_{1}$.",
          "GP of ratio $\\frac{1}{2}$ going forward; $g_{10} = \\$10$; find $g_{1}$.",
        ),
        step(
          "approach",
          "Recorrer la PG hacia atrás: cada paso hacia atrás multiplica por $2$ (recíproco de la razón).",
          "Walk the GP backwards: each backward step multiplies by $2$ (the reciprocal of the ratio).",
        ),
        step(
          "calculation",
          "$g_{k} = g_{1} \\cdot \\left(\\frac{1}{2}\\right)^{k - 1}$, así que $g_{10} = g_{1} \\cdot 2^{-9} = 10$<br>$g_{1} = 10 \\cdot 2^{9} = 10 \\cdot 512 = 5120$.",
          "$g_{k} = g_{1} \\cdot \\left(\\frac{1}{2}\\right)^{k - 1}$, so $g_{10} = g_{1} \\cdot 2^{-9} = 10$<br>$g_{1} = 10 \\cdot 2^{9} = 10 \\cdot 512 = 5120$.",
        ),
        step(
          "result",
          `El primer día ganó $\\$5120$ (clave del libro: 5120 ✓). Comprobación: $5120 \\to 2560 \\to 1280 \\to \\dots \\to 20 \\to 10$: son 9 mitades ✓.`,
          `He won $\\$5120$ on day one (book key: 5120 ✓). Check: $5120 \\to 2560 \\to 1280 \\to \\dots \\to 20 \\to 10$: that is 9 halvings ✓.`,
        ),
      ],
    }),
  ),

  /* 139 — PG positiva, Σ₂=15, Σ∞→27 → r = 2/3 (y a₁ = 9). Key: a) 2/3, b) 9. */
  template(
    {
      id: "seq-espol-ch2-139",
      subject: "math",
      topicId: "sequences",
      subtopicId: "geometric-sums",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 270,
      tags: ["geometric", "infinite-sum", "convergence"],
      prerequisites: ["geometric"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 139",
        page: 249,
      },
      reasoning: "case-analysis",
    },
    () => ({
      skill: L("Suma infinita: a/(1−r) junto con a(1+r)", "Infinite sum: a/(1−r) together with a(1+r)"),
      statement: L(
        "Una progresión geométrica tiene todos sus términos positivos. La suma de los dos primeros términos es $15$ y la suma de los infinitos términos de la sucesión tiende a $27$. Hallar el valor de la razón común (responde $r$ como fracción tipo 2/3 o dos decimales; el primer término va en la solución).",
        "A geometric progression has all its terms positive. The sum of its first two terms is $15$ and the sum of the infinitely many terms tends to $27$. Find the common ratio (answer $r$ as a fraction like 2/3 or two decimals; the first term is in the solution).",
      ),
      answer: { kind: "numeric", value: 2 / 3 },
      hints: [
        L(
          "Dos ecuaciones: $a(1 + r) = 15$ y $\\frac{a}{1 - r} = 27$ (convergencia exige $|r| < 1$).",
          "Two equations: $a(1 + r) = 15$ and $\\frac{a}{1 - r} = 27$ (convergence requires $|r| < 1$).",
        ),
        L(
          "De la segunda: $a = 27(1 - r)$; sustituye en la primera.",
          "From the second: $a = 27(1 - r)$; substitute into the first.",
        ),
        L(
          "Queda $27(1 - r)(1 + r) = 15$, o sea $1 - r^{2} = \\frac{5}{9}$; recuerda el requisito de términos positivos para elegir el signo de $r$.",
          "You get $27(1 - r)(1 + r) = 15$, i.e. $1 - r^{2} = \\frac{5}{9}$; recall the positive-terms requirement to choose the sign of $r$.",
        ),
      ],
      answerDisplay: L(
        "$r = \\dfrac{2}{3}$ (y $a_{1} = 9$)",
        "$r = \\dfrac{2}{3}$ (and $a_{1} = 9$)",
      ),
      solution: [
        step(
          "given",
          "PG de términos positivos: $a(1 + r) = 15$, $\\frac{a}{1 - r} = 27$.",
          "GP with positive terms: $a(1 + r) = 15$, $\\frac{a}{1 - r} = 27$.",
        ),
        step(
          "approach",
          "Combinar las dos condiciones para eliminar $a$; la elección del signo de $r$ la dicta «todos los términos positivos» (con $r < 0$ los términos alternan de signo).",
          "Combine the two conditions to eliminate $a$; the sign of $r$ is dictated by “all terms positive” (with $r < 0$ the terms alternate in sign).",
        ),
        step(
          "calculation",
          "$a = 27(1 - r)$; en $a(1 + r) = 15$: $27(1 - r)(1 + r) = 15$<br>$1 - r^{2} = \\frac{15}{27} = \\frac{5}{9} \\Rightarrow r^{2} = \\frac{4}{9} \\Rightarrow r = \\pm\\frac{2}{3}$<br>Términos positivos $\\Rightarrow r > 0$: $r = \\frac{2}{3}$.<br>$a_{1} = \\frac{15}{1 + \\frac{2}{3}} = \\frac{15 \\cdot 3}{5} = 9$.",
          "$a = 27(1 - r)$; in $a(1 + r) = 15$: $27(1 - r)(1 + r) = 15$<br>$1 - r^{2} = \\frac{15}{27} = \\frac{5}{9} \\Rightarrow r^{2} = \\frac{4}{9} \\Rightarrow r = \\pm\\frac{2}{3}$<br>Positive terms $\\Rightarrow r > 0$: $r = \\frac{2}{3}$.<br>$a_{1} = \\frac{15}{1 + \\frac{2}{3}} = 9$.",
        ),
        step(
          "result",
          "$r = \\frac{2}{3}$ y $a_{1} = 9$ (clave del libro: a) $\\frac{2}{3}$, b) 9 ✓). Comprobación: $9 + 6 = 15$ ✓ y $\\frac{9}{1 - \\frac{2}{3}} = \\frac{9}{1/3} = 27$ ✓.",
          "$r = \\frac{2}{3}$ and $a_{1} = 9$ (book key: a) $\\frac{2}{3}$, b) 9 ✓). Check: $9 + 6 = 15$ ✓ and $\\frac{9}{1 - \\frac{2}{3}} = 27$ ✓.",
        ),
      ],
    }),
  ),

  /* 141 — Sr. Dorado: $5000, 2% mensual sobre balance → total $6300. Key: a)25 b)204 c)6300 d)1300. */
  template(
    {
      id: "seq-espol-ch2-141",
      subject: "math",
      topicId: "sequences",
      subtopicId: "arithmetic",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 330,
      tags: ["finance", "amortization", "application"],
      prerequisites: ["arithmetic"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 141",
        page: 249,
      },
      reasoning: "modeling",
    },
    () => ({
      skill: L("Amortización: $200 al capital + 2% del balance pendiente", "Amortization: $200 to principal + 2% of the pending balance"),
      statement: L(
        "Considera el préstamo del banco al Sr. Dorado por $\\$5\\,000$ a un interés mensual del $2\\%$. Cada mes paga $\\$200$ al capital más el interés mensual del balance pendiente. Calcular el monto total pagado hasta saldar la deuda (el número de pagos, el último pago y el interés cancelado van en la solución).",
        "Consider the bank loan to Mr. Dorado of $\\$5,\\!000$ at $2\\%$ monthly interest. Each month he pays $\\$200$ to the principal plus the monthly interest on the pending balance. Compute the total amount paid until the debt is settled (the number of payments, the last payment and the interest paid are in the solution).",
      ),
      answer: { kind: "numeric", value: 6300 },
      hints: [
        L(
          "El balance antes del pago $k+1$ es $B_{k} = 5000 - 200k$; ese mes el interés es $0{,}02 \\cdot B_{k}$ y el pago total es $200 + 0{,}02B_{k}$.",
          "The balance before payment $k+1$ is $B_{k} = 5000 - 200k$; that month's interest is $0.02 \\cdot B_{k}$ and the full payment is $200 + 0.02B_{k}$.",
        ),
        L(
          "El último mes: $B_{24} = 200$, así que el interés final es $0{,}02 \\cdot 200 = 4$ y hay $25$ pagos.",
          "The last month: $B_{24} = 200$, so the final interest is $0.02 \\cdot 200 = 4$ and there are $25$ payments.",
        ),
        L(
          "Interés total: $0{,}02 \\sum_{k=0}^{24} B_{k}$ — la suma de una progresión aritmética de $25$ términos que va de $5000$ a $200$.",
          "Total interest: $0.02 \\sum_{k=0}^{24} B_{k}$ — the sum of an arithmetic progression of $25$ terms running from $5000$ down to $200$.",
        ),
      ],
      answerDisplay: L(
        `total pagado: $\\$6300$ (25 pagos · último $\\$204$ · interés $\\$1300$)`,
        `total paid: $\\$6300$ (25 payments · last one $\\$204$ · interest $\\$1300$)`,
      ),
      solution: [
        step(
          "given",
          `Préstamo $\\$5000$; cada mes: $\\$200$ al capital + $2\\%$ del balance; $B_{k} = 5000 - 200k$.`,
          `Loan $\\$5000$; each month: $\\$200$ to principal + $2\\%$ of the balance; $B_{k} = 5000 - 200k$.`,
        ),
        step(
          "approach",
          "Seguir el balance mes a mes: los pagos forman una sucesión decreciente (cada vez menos interés); el total pagado = capital + interés total.",
          "Track the balance month by month: the payments form a decreasing sequence (less interest each time); total paid = principal + total interest.",
        ),
        step(
          "calculation",
          `Balances: $B_{0} = 5000, B_{1} = 4800, \\dots, B_{24} = 200$ → $25$ pagos.<br>Último pago: $200 + 0{,}02 \\cdot 200 = 200 + 4 = 204$.<br>$\\sum_{k=0}^{24} B_{k} = \\frac{25(5000 + 200)}{2} = 25 \\cdot 2600 = 65\\,000$<br>Interés total: $0{,}02 \\cdot 65\\,000 = 1300$.<br>Total pagado: $5000 + 1300 = 6300$.`,
          `Balances: $B_{0} = 5000, B_{1} = 4800, \\dots, B_{24} = 200$ → $25$ payments.<br>Last payment: $200 + 0.02 \\cdot 200 = 204$.<br>$\\sum_{k=0}^{24} B_{k} = \\frac{25(5000 + 200)}{2} = 65,\\!000$<br>Total interest: $0.02 \\cdot 65,\\!000 = 1300$.<br>Total paid: $5000 + 1300 = 6300$.`,
        ),
        step(
          "result",
          `Monto total pagado: $\\$6300$ — a) 25 pagos, b) último pago $\\$204$, c) total $\\$6300$, d) interés $\\$1300$ (clave del libro ✓ en las cuatro partes). Comprobación: el primer pago sería $200 + 100 = \\$300$ y la suma de pagos $= 25 \\cdot 200 + 1300 = 6300$ ✓.`,
          `Total amount paid: $\\$6300$ — a) 25 payments, b) last payment $\\$204$, c) total $\\$6300$, d) interest $\\$1300$ (book key ✓ on all four parts). Check: the first payment would be $200 + 100 = \\$300$ and the sum of payments $= 25 \\cdot 200 + 1300 = 6300$ ✓.`,
        ),
      ],
    }),
  ),

  /* 146 — Sr. Piedra: 8º=$153, 15º=$181, total $5490 → 30 pagos (último $241). */
  template(
    {
      id: "seq-espol-ch2-146",
      subject: "math",
      topicId: "sequences",
      subtopicId: "finite-sums",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 300,
      tags: ["finance", "arithmetic-series", "application"],
      prerequisites: ["arithmetic"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 146",
        page: 250,
      },
      reasoning: "multi-concept",
    },
    () => ({
      skill: L("De dos términos de la PA a la suma total: tres pasos", "From two AP terms to the total sum: three steps"),
      statement: L(
        "Los pagos mensuales del Sr. Piedra al banco, ocasionados por un préstamo, forman una progresión aritmética. Si el octavo y el decimoquinto pagos son de $\\$153$ y $\\$181$, respectivamente, y en total pagó $5\\,490$ al banco, calcular el número de pagos que efectuó (el último pago va en la solución).",
        "Mr. Piedra's monthly payments to the bank, caused by a loan, form an arithmetic progression. If the eighth and fifteenth payments are $\\$153$ and $\\$181$, respectively, and he paid a total of $5,\\!490$ to the bank, compute the number of payments he made (the last payment is in the solution).",
      ),
      answer: { kind: "numeric", value: 30 },
      hints: [
        L(
          "De $a_{8} = a_{1} + 7d$ y $a_{15} = a_{1} + 14d$: la resta elimina $a_{1}$ y da $d$.",
          "From $a_{8} = a_{1} + 7d$ and $a_{15} = a_{1} + 14d$: subtracting kills $a_{1}$ and yields $d$.",
        ),
        L(
          "$7d = 181 - 153 = 28 \\Rightarrow d = 4$; luego $a_{1} = 153 - 7 \\cdot 4 = 125$.",
          "$7d = 181 - 153 = 28 \\Rightarrow d = 4$; then $a_{1} = 153 - 7 \\cdot 4 = 125$.",
        ),
        L(
          "Plantea $S_{n} = 125n + 2n(n - 1) = 5490$ y resuelve la cuadrática en $n$.",
          "Set $S_{n} = 125n + 2n(n - 1) = 5490$ and solve the quadratic in $n$.",
        ),
      ],
      answerDisplay: L(
        `$30$ pagos (último pago: $\\$241$)`,
        `$30$ payments (last payment: $\\$241$)`,
      ),
      solution: [
        step(
          "given",
          `PA de pagos: $a_{8} = \\$153$, $a_{15} = \\$181$; suma total $\\$5\\,490$.`,
          `AP of payments: $a_{8} = \\$153$, $a_{15} = \\$181$; total sum $\\$5,\\!490$.`,
        ),
        step(
          "approach",
          "Primero reconstruir la PA (diferencia y primer término), después igualar la fórmula de la suma al total y resolver la cuadrática en $n$.",
          "First reconstruct the AP (difference and first term), then set the sum formula equal to the total and solve the quadratic in $n$.",
        ),
        step(
          "calculation",
          `$a_{15} - a_{8} = 7d = 28 \\Rightarrow d = 4$; $a_{1} = 153 - 7 \\cdot 4 = 125$.<br>$S_{n} = \\frac{n}{2}\\left[2 \\cdot 125 + (n - 1) \\cdot 4\\right] = 125n + 2n^{2} - 2n$<br>$2n^{2} + 123n - 5490 = 0 \\Rightarrow n = \\dfrac{-123 + \\sqrt{15\\,129 + 43\\,920}}{4} = \\dfrac{-123 + 243}{4} = 30$.<br>Último pago: $a_{30} = 125 + 29 \\cdot 4 = 241$.`,
          `$a_{15} - a_{8} = 7d = 28 \\Rightarrow d = 4$; $a_{1} = 153 - 7 \\cdot 4 = 125$.<br>$S_{n} = 125n + 2n^{2} - 2n$<br>$2n^{2} + 123n - 5490 = 0 \\Rightarrow n = \\dfrac{-123 + 243}{4} = 30$.<br>Last payment: $a_{30} = 125 + 29 \\cdot 4 = 241$.`,
        ),
        step(
          "result",
          `Efectuó $30$ pagos y el último fue de $\\$241$ (clave del libro: a) 30, b) 241 ✓). Comprobación: $S_{30} = \\frac{30}{2}(125 + 241) = 15 \\cdot 366 = 5490$ ✓.`,
          `He made $30$ payments and the last one was $\\$241$ (book key: a) 30, b) 241 ✓). Check: $S_{30} = \\frac{30}{2}(125 + 241) = 15 \\cdot 366 = 5490$ ✓.`,
        ),
      ],
    }),
  ),

  /* 147 — deuda $1800, $150 + 1% mensual → total $1917. Key: a)168 b)151.5 c)1917 d)117. */
  template(
    {
      id: "seq-espol-ch2-147",
      subject: "math",
      topicId: "sequences",
      subtopicId: "arithmetic",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 330,
      tags: ["finance", "amortization", "application"],
      prerequisites: ["arithmetic"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 147",
        page: 250,
      },
      reasoning: "modeling",
    },
    () => ({
      skill: L("Interés sobre el balance restante: pagos decrecientes", "Interest on the remaining balance: shrinking payments"),
      statement: L(
        "Debe saldarse una deuda de $\\$1\\,800$ en un año, efectuando un pago de $\\$150$ al término de cada mes, más el interés a una tasa del $1\\%$ mensual sobre el balance restante. Hallar cuánto paga en total (el primer pago, el último pago y los intereses van en la solución).",
        "A debt of $\\$1,\\!800$ must be settled within a year by paying $\\$150$ at the end of each month, plus interest at $1\\%$ monthly on the remaining balance. Find how much is paid in total (the first payment, the last payment and the interest are in the solution).",
      ),
      answer: { kind: "numeric", value: 1917 },
      hints: [
        L(
          "Antes del pago $k$, el balance es $B_{k-1} = 1800 - 150(k - 1)$; el pago de ese mes es $150 + 0{,}01 \\cdot B_{k-1}$.",
          "Before payment $k$, the balance is $B_{k-1} = 1800 - 150(k - 1)$; that month's payment is $150 + 0.01 \\cdot B_{k-1}$.",
        ),
        L(
          "Con $\\$150$ al capital, la deuda se salda en $1800 / 150 = 12$ meses exactos; el balance antes del último pago es $\\$150$.",
          "With $\\$150$ to principal, the debt clears in exactly $1800 / 150 = 12$ months; the balance before the last payment is $\\$150$.",
        ),
        L(
          "Interés total: $0{,}01 \\sum_{k=0}^{11} B_{k}$ — suma aritmética de $1800$ hasta $150$.",
          "Total interest: $0.01 \\sum_{k=0}^{11} B_{k}$ — an arithmetic sum from $1800$ down to $150$.",
        ),
      ],
      answerDisplay: L(
        `total pagado: $\\$1917$ (12 pagos · primero $\\$168$ · último $\\$151{,}50$ · interés $\\$117$)`,
        `total paid: $\\$1917$ (12 payments · first $\\$168$ · last $\\$151.50$ · interest $\\$117$)`,
      ),
      solution: [
        step(
          "given",
          `Deuda $\\$1800$; $\\$150$ mensuales al capital + $1\\%$ del balance restante; $B_{k} = 1800 - 150k$.`,
          `Debt $\\$1800$; $\\$150$ monthly to principal + $1\\%$ of the remaining balance; $B_{k} = 1800 - 150k$.`,
        ),
        step(
          "approach",
          "Cada pago = cuota fija al capital + interés sobre balance: los pagos decaen mes a mes. Total = deuda + interés total.",
          "Each payment = fixed principal installment + interest on balance: payments shrink month by month. Total = debt + total interest.",
        ),
        step(
          "calculation",
          `Primer pago: $150 + 0{,}01 \\cdot 1800 = 150 + 18 = 168$.<br>$1800 / 150 = 12$ pagos; balance antes del último: $B_{11} = 150$ → último pago $150 + 1{,}50 = 151{,}50$.<br>$\\sum_{k=0}^{11} B_{k} = \\frac{12(1800 + 150)}{2} = 6 \\cdot 1950 = 11\\,700$<br>Interés total: $0{,}01 \\cdot 11\\,700 = 117$. Total: $1800 + 117 = 1917$.`,
          `First payment: $150 + 0.01 \\cdot 1800 = 168$.<br>$1800 / 150 = 12$ payments; balance before the last: $B_{11} = 150$ → last payment $150 + 1.5 = 151.5$.<br>$\\sum_{k=0}^{11} B_{k} = \\frac{12(1800 + 150)}{2} = 11,\\!700$<br>Total interest: $0.01 \\cdot 11,\\!700 = 117$. Total: $1800 + 117 = 1917$.`,
        ),
        step(
          "result",
          `Total pagado: $\\$1917$ — a) primer pago $\\$168$, b) último $\\$151{,}50$, c) total $\\$1917$, d) interés $\\$117$ (clave del libro ✓ en las cuatro partes). Comprobación: suma de pagos $= 12 \\cdot 150 + 117 = 1917$ ✓.`,
          `Total paid: $\\$1917$ — a) first payment $\\$168$, b) last $\\$151.50$, c) total $\\$1917$, d) interest $\\$117$ (book key ✓ on all four parts). Check: sum of payments $= 12 \\cdot 150 + 117 = 1917$ ✓.`,
        ),
      ],
    }),
  ),

  /* 151 — suma de múltiplos de 3 cifras de 7 → 70336. Sin clave impresa (sympy). */
  template(
    {
      id: "seq-espol-ch2-151",
      subject: "math",
      topicId: "sequences",
      subtopicId: "finite-sums",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 270,
      tags: ["arithmetic-series", "divisibility", "application"],
      prerequisites: ["arithmetic"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "2 · 151",
        page: 250,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$70\\,000$`, `$70,\\!000$`), correct: false },
        { id: "b", text: L(`$60\\,000$`, `$60,\\!000$`), correct: false },
        { id: "c", text: L(`$70\\,300$`, `$70,\\!300$`), correct: false },
        { id: "d", text: L(`$60\\,360$`, `$60,\\!360$`), correct: false },
        { id: "e", text: L(`$70\\,336$`, `$70,\\!336$`), correct: true },
      ];
      return {
        skill: L("Serie de múltiplos: primero, último, cuántos y Gauss", "Series of multiples: first, last, how many, and Gauss"),
        statement: L(
          "La suma de todos los números de tres cifras que son múltiplos de $7$ es:",
          "The sum of all three-digit numbers that are multiples of $7$ is:",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Primer múltiplo de 3 cifras: $7 \\cdot 15 = 105$; el último: el mayor $7k < 1000$.",
            "First three-digit multiple: $7 \\cdot 15 = 105$; the last one: the largest $7k < 1000$.",
          ),
          L(
            "$1000 / 7 \\approx 142{,}86$, así que el último es $7 \\cdot 142 = 994$; de $k = 15$ a $k = 142$ hay $142 - 15 + 1$ términos.",
            "$1000 / 7 \\approx 142.86$, so the last is $7 \\cdot 142 = 994$; from $k = 15$ to $k = 142$ there are $142 - 15 + 1$ terms.",
          ),
          L(
            "Suma $= \\frac{n(\\text{primero} + \\text{último})}{2}$ con $n = 128$.",
            "Sum $= \\frac{n(\\text{first} + \\text{last})}{2}$ with $n = 128$.",
          ),
        ],
        answerDisplay: L(`$70\\,336$ (128 términos: $105 \\to 994$)`, `$70,\\!336$ (128 terms: $105 \\to 994$)`),
        solution: [
          step(
            "given",
            "Se pide $\\Sigma$ de todos los múltiplos de $7$ con tres cifras.",
            "Requested: the $\\Sigma$ of all three-digit multiples of $7$.",
          ),
          step(
            "approach",
            "Identificar extremos y cantidad de términos; aplicar la fórmula de Gauss. (Este ejercicio no tiene clave impresa en el libro: la respuesta se verificó de forma independiente con sympy.)",
            "Identify the endpoints and the number of terms; apply Gauss's formula. (This exercise has no printed key in the book: the answer was independently verified with sympy.)",
          ),
          step(
            "calculation",
            `Primero: $7 \\cdot 15 = 105$; último: $7 \\cdot 142 = 994$ (pues $7 \\cdot 143 = 1001$).<br>$n = 142 - 15 + 1 = 128$ términos.<br>$S = \\dfrac{128(105 + 994)}{2} = 64 \\cdot 1099 = 70\\,336$.`,
            `First: $7 \\cdot 15 = 105$; last: $7 \\cdot 142 = 994$ (since $7 \\cdot 143 = 1001$).<br>$n = 142 - 15 + 1 = 128$ terms.<br>$S = \\dfrac{128(105 + 994)}{2} = 64 \\cdot 1099 = 70,\\!336$.`,
          ),
          step(
            "result",
            `La suma es $70\\,336$ (opción e). Comprobación cruzada: $S = 7 \\cdot \\sum_{k=15}^{142} k = 7 \\cdot \\frac{128(15 + 142)}{2} = 7 \\cdot 10048 = 70\\,336$ ✓.`,
            `The sum is $70,\\!336$ (option e). Cross-check: $S = 7 \\cdot \\frac{128(15 + 142)}{2} = 7 \\cdot 10048 = 70,\\!336$ ✓.`,
          ),
        ],
      };
    },
  ),
];
