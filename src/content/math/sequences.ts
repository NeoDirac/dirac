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
];
