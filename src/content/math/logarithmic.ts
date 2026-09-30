/**
 * MATH · Logarithmic Functions
 *
 * Properties, evaluation, exponential/log conversion, equations and
 * applications. All answers are exact integers built from clean powers.
 */

import { template, L, step } from "@/lib/problem";
import type { ProblemTemplate, McOption } from "@/lib/types";

export const templates: ProblemTemplate[] = [
  /* ---------------------------------------------------------------- */
  /* Evaluating: log_b(b^k)                                           */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "log-eval-01",
      subject: "math",
      topicId: "logarithmic",
      subtopicId: "evaluating",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 60,
      tags: ["logarithms", "evaluating"],
      prerequisites: ["exponential"],
    },
    (rng) => {
      const b = rng.pick([2, 10]);
      const k = b === 2 ? rng.int(2, 8) : rng.int(2, 5);
      const arg = Math.pow(b, k);
      return {
        skill: L("Evaluar un logaritmo", "Evaluating a logarithm"),
        statement: L(
          `Calcula: $\\log_{${b}}(${arg})$`,
          `Evaluate: $\\log_{${b}}(${arg})$`,
        ),
        answer: { kind: "numeric", value: k },
        hints: [
          L(
            "El logaritmo responde a la pregunta: ¿la base elevada a qué da ese número?",
            "A logarithm answers: the base raised to what power gives that number?",
          ),
          L(
            `Busca el exponente: $${b}^{\\,?} = ${arg}$.`,
            `Look for the exponent: $${b}^{\\,?} = ${arg}$.`,
          ),
          L(
            `Ve probando potencias de $${b}$ hasta alcanzar $${arg}$.`,
            `Try powers of $${b}$ until you reach $${arg}$.`,
          ),
        ],
        answerDisplay: L(`$\\log_{${b}}(${arg}) = ${k}$`, `$\\log_{${b}}(${arg}) = ${k}$`),
        solution: [
          step("given", `$\\log_{${b}}(${arg})$`, `$\\log_{${b}}(${arg})$`),
          step(
            "approach",
            "Usa la definición: $\\log_{b}(y) = x \\iff b^{x} = y$.",
            "Use the definition: $\\log_{b}(y) = x \\iff b^{x} = y$.",
          ),
          step(
            "calculation",
            `$${b}^{${k}} = ${arg} \\;\\Rightarrow\\; \\log_{${b}}(${arg}) = ${k}$`,
            `$${b}^{${k}} = ${arg} \\;\\Rightarrow\\; \\log_{${b}}(${arg}) = ${k}$`,
          ),
          step("result", `$\\log_{${b}}(${arg}) = ${k}$`, `$\\log_{${b}}(${arg}) = ${k}$`),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Properties: sum of logs                                          */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "log-prop-01",
      subject: "math",
      topicId: "logarithmic",
      subtopicId: "properties",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 90,
      tags: ["log-properties", "product-rule"],
      prerequisites: ["exponential"],
    },
    (rng) => {
      const m = rng.int(2, 6);
      const n = rng.int(2, 6);
      const value = m + n;
      return {
        skill: L("Suma de logaritmos", "Adding logarithms"),
        statement: L(
          `Calcula: $\\log_{2}(${Math.pow(2, m)}) + \\log_{2}(${Math.pow(2, n)})$`,
          `Evaluate: $\\log_{2}(${Math.pow(2, m)}) + \\log_{2}(${Math.pow(2, n)})$`,
        ),
        answer: { kind: "numeric", value },
        hints: [
          L(
            "Puedes evaluar cada logaritmo por separado.",
            "You can evaluate each logarithm separately.",
          ),
          L(
            "O bien aplica la propiedad del producto: $\\log(u) + \\log(v) = \\log(u \\cdot v)$.",
            "Or apply the product rule: $\\log(u) + \\log(v) = \\log(u \\cdot v)$.",
          ),
          L(
            `El producto de los argumentos es otra potencia de 2: $${Math.pow(2, m)} \\cdot ${Math.pow(2, n)}$.`,
            `The product of the arguments is another power of 2: $${Math.pow(2, m)} \\cdot ${Math.pow(2, n)}$.`,
          ),
        ],
        answerDisplay: L(`$${value}$`, `$${value}$`),
        solution: [
          step(
            "given",
            `$\\log_{2}(${Math.pow(2, m)}) + \\log_{2}(${Math.pow(2, n)})$`,
            `$\\log_{2}(${Math.pow(2, m)}) + \\log_{2}(${Math.pow(2, n)})$`,
          ),
          step(
            "approach",
            "Evaluamos cada logaritmo reconociendo potencias de 2 (equivalente a aplicar la propiedad del producto).",
            "Evaluate each logarithm by recognizing powers of 2 (equivalent to applying the product rule).",
          ),
          step(
            "calculation",
            `$\\log_{2}(${Math.pow(2, m)}) = ${m}$, $\\quad \\log_{2}(${Math.pow(2, n)}) = ${n}$<br>$${m} + ${n} = ${value}$`,
            `$\\log_{2}(${Math.pow(2, m)}) = ${m}$, $\\quad \\log_{2}(${Math.pow(2, n)}) = ${n}$<br>$${m} + ${n} = ${value}$`,
          ),
          step(
            "result",
            `El resultado es $${value}$.`,
            `The result is $${value}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Conversion: exponential → logarithmic (MC)                       */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "log-conv-01",
      subject: "math",
      topicId: "logarithmic",
      subtopicId: "conversion",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 120,
      tags: ["conversion", "definition"],
      prerequisites: ["exponential"],
    },
    (rng) => {
      const b = rng.pick([2, 3, 10]);
      const options: McOption[] = [
        { id: "a", text: L(`$x = \\log_{${b}}(y)$`, `$x = \\log_{${b}}(y)$`), correct: true },
        { id: "b", text: L(`$y = \\log_{${b}}(x)$`, `$y = \\log_{${b}}(x)$`), correct: false },
        { id: "c", text: L(`$x = ${b}^{y}$`, `$x = ${b}^{y}$`), correct: false },
        { id: "d", text: L(`$x = \\log_{y}(${b})$`, `$x = \\log_{y}(${b})$`), correct: false },
      ];
      return {
        skill: L("Forma logarítmica de una exponencial", "Logarithmic form of an exponential"),
        statement: L(
          `La ecuación exponencial $y = ${b}^{x}$ se puede reescribir en forma logarítmica con $x$ despejado. ¿Cuál es la forma correcta?`,
          `The exponential equation $y = ${b}^{x}$ can be rewritten in logarithmic form with $x$ isolated. Which is the correct form?`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "La definición conecta ambas formas: $b^{x} = y \\iff x = \\log_{b}(y)$.",
            "The definition links both forms: $b^{x} = y \\iff x = \\log_{b}(y)$.",
          ),
          L(
            `Identifica: base $${b}$, exponente $x$, resultado $y$.`,
            `Identify: base $${b}$, exponent $x$, result $y$.`,
          ),
          L(
            "El logaritmo de $y$ en base $b$ es precisamente el exponente que falta.",
            "The logarithm of $y$ base $b$ is exactly the missing exponent.",
          ),
        ],
        answerDisplay: L(`$x = \\log_{${b}}(y)$`, `$x = \\log_{${b}}(y)$`),
        solution: [
          step("given", `$y = ${b}^{x}$`, `$y = ${b}^{x}$`),
          step(
            "approach",
            "Aplicamos la definición de logaritmo para despejar el exponente.",
            "Apply the definition of logarithm to isolate the exponent.",
          ),
          step(
            "calculation",
            `$${b}^{x} = y \\iff x = \\log_{${b}}(y)$<br>La base $${b}$ queda como base del logaritmo y $y$ como argumento.`,
            `$${b}^{x} = y \\iff x = \\log_{${b}}(y)$<br>The base $${b}$ becomes the log's base and $y$ its argument.`,
          ),
          step("result", `$x = \\log_{${b}}(y)$`, `$x = \\log_{${b}}(y)$`),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Equations: log_2(x) = k                                          */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "log-eq-01",
      subject: "math",
      topicId: "logarithmic",
      subtopicId: "equations",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 120,
      tags: ["logarithmic-equations"],
      prerequisites: ["exponential"],
    },
    (rng) => {
      const k = rng.int(3, 8);
      const value = Math.pow(2, k);
      return {
        skill: L("Ecuación logarítmica sencilla", "Simple logarithmic equation"),
        statement: L(
          `Resuelve: $\\log_{2}(x) = ${k}$`,
          `Solve: $\\log_{2}(x) = ${k}$`,
        ),
        answer: { kind: "numeric", value },
        hints: [
          L(
            "Pasa la ecuación a forma exponencial.",
            "Rewrite the equation in exponential form.",
          ),
          L(
            `$\\log_{2}(x) = ${k}$ significa $x = 2^{${k}}$.`,
            `$\\log_{2}(x) = ${k}$ means $x = 2^{${k}}$.`,
          ),
          L(
            "Calcula la potencia de 2 indicada.",
            "Compute the indicated power of 2.",
          ),
        ],
        answerDisplay: L(`$x = ${value}$`, `$x = ${value}$`),
        solution: [
          step("given", `$\\log_{2}(x) = ${k}$`, `$\\log_{2}(x) = ${k}$`),
          step(
            "approach",
            "Usamos la definición: el logaritmo es el exponente al que se eleva la base.",
            "Use the definition: the logarithm is the exponent applied to the base.",
          ),
          step(
            "calculation",
            `$x = 2^{${k}} = ${value}$`,
            `$x = 2^{${k}} = ${value}$`,
          ),
          step("result", `$x = ${value}$`, `$x = ${value}$`),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Applications: Richter scale ratio                                 */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "log-app-01",
      subject: "math",
      topicId: "logarithmic",
      subtopicId: "applications",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 180,
      tags: ["log-scale", "applications", "richter"],
      prerequisites: ["exponential"],
    },
    (rng) => {
      const m1 = rng.int(4, 7);
      const d = rng.pick([2, 3]);
      const m2 = m1 + d;
      const value = Math.pow(10, d);
      return {
        skill: L("Comparar magnitudes en escala logarítmica", "Comparing magnitudes on a log scale"),
        statement: L(
          `En la escala de Richter, la magnitud de un sismo es $M = \\log_{10}(A/A_{0})$, donde $A$ es la amplitud de las ondas. ¿Cuántas veces mayor es la amplitud de un sismo de magnitud $${m2}$ que la de uno de magnitud $${m1}$?`,
          `On the Richter scale, an earthquake's magnitude is $M = \\log_{10}(A/A_{0})$, where $A$ is the wave amplitude. How many times larger is the amplitude of a magnitude $${m2}$ quake than a magnitude $${m1}$ one?`,
        ),
        answer: { kind: "numeric", value },
        hints: [
          L(
            "Despeja la amplitud: la definición da $A = A_{0} \\cdot 10^{M}$.",
            "Solve for the amplitude: the definition gives $A = A_{0} \\cdot 10^{M}$.",
          ),
          L(
            `Escribe cada amplitud como múltiplo de $A_{0}$.`,
            `Write each amplitude as a multiple of $A_{0}$.`,
          ),
          L(
            "Divide las dos amplitudes: los $A_{0}$ se cancelan.",
            "Divide the two amplitudes: the $A_{0}$ factors cancel.",
          ),
        ],
        answerDisplay: L(`$${value}$ veces`, `$${value}$ times`),
        solution: [
          step(
            "given",
            `Magnitudes: $M_{1} = ${m1}$ y $M_{2} = ${m2}$. Fórmula: $M = \\log_{10}(A/A_{0})$.`,
            `Magnitudes: $M_{1} = ${m1}$ and $M_{2} = ${m2}$. Formula: $M = \\log_{10}(A/A_{0})$.`,
          ),
          step(
            "approach",
            "Invertimos el logaritmo para obtener cada amplitud y luego comparamos por división.",
            "Invert the logarithm to get each amplitude, then compare by division.",
          ),
          step(
            "calculation",
            `$A_{1} = A_{0} \\cdot 10^{${m1}}$, $\\quad A_{2} = A_{0} \\cdot 10^{${m2}}$<br>$\\frac{A_{2}}{A_{1}} = \\frac{A_{0} \\cdot 10^{${m2}}}{A_{0} \\cdot 10^{${m1}}} = 10^{${m2} - ${m1}} = 10^{${d}} = ${value}$`,
            `$A_{1} = A_{0} \\cdot 10^{${m1}}$, $\\quad A_{2} = A_{0} \\cdot 10^{${m2}}$<br>$\\frac{A_{2}}{A_{1}} = \\frac{A_{0} \\cdot 10^{${m2}}}{A_{0} \\cdot 10^{${m1}}} = 10^{${m2} - ${m1}} = 10^{${d}} = ${value}$`,
          ),
          step(
            "result",
            `La amplitud del sismo de magnitud $${m2}$ es $${value}$ veces mayor.`,
            `The magnitude $${m2}$ quake has an amplitude $${value}$ times larger.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Properties: power rule with a variable (expression)              */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "log-prop-02",
      subject: "math",
      topicId: "logarithmic",
      subtopicId: "properties",
      difficulty: "medium",
      questionType: "expression",
      estimatedTimeSec: 150,
      tags: ["log-properties", "power-rule"],
      prerequisites: ["exponential"],
    },
    (rng) => {
      const m = rng.int(2, 4);
      return {
        skill: L("Propiedad de la potencia", "Power rule for logarithms"),
        statement: L(
          `Simplifica $\\log_{2}(${Math.pow(2, m)}^{x})$ y escríbelo como expresión en $x$ (por ejemplo: 3x o 3*x).`,
          `Simplify $\\log_{2}(${Math.pow(2, m)}^{x})$ and write it as an expression in $x$ (e.g. 3x or 3*x).`,
        ),
        answer: {
          kind: "expression",
          accepted: [`${m}x`, `${m}*x`],
          variables: ["x"],
        },
        hints: [
          L(
            "Usa la propiedad de la potencia: $\\log_{b}(u^{p}) = p \\cdot \\log_{b}(u)$.",
            "Use the power rule: $\\log_{b}(u^{p}) = p \\cdot \\log_{b}(u)$.",
          ),
          L(
            `Aquí $u = ${Math.pow(2, m)}$ y $p = x$.`,
            `Here $u = ${Math.pow(2, m)}$ and $p = x$.`,
          ),
          L(
            `Calcula $\\log_{2}(${Math.pow(2, m)})$ y multiplica por $x$.`,
            `Compute $\\log_{2}(${Math.pow(2, m)})$ and multiply by $x$.`,
          ),
        ],
        answerDisplay: L(`$${m}x$`, `$${m}x$`),
        solution: [
          step(
            "given",
            `$\\log_{2}(${Math.pow(2, m)}^{x})$`,
            `$\\log_{2}(${Math.pow(2, m)}^{x})$`,
          ),
          step(
            "approach",
            "Aplicamos la propiedad de la potencia y evaluamos el logaritmo que queda.",
            "Apply the power rule and evaluate the remaining logarithm.",
          ),
          step(
            "calculation",
            `$\\log_{2}(${Math.pow(2, m)}^{x}) = x \\cdot \\log_{2}(${Math.pow(2, m)}) = x \\cdot ${m} = ${m}x$`,
            `$\\log_{2}(${Math.pow(2, m)}^{x}) = x \\cdot \\log_{2}(${Math.pow(2, m)}) = x \\cdot ${m} = ${m}x$`,
          ),
          step("result", `$${m}x$`, `$${m}x$`),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Properties: power rule with numeric exponent                      */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "log-prop-03",
      subject: "math",
      topicId: "logarithmic",
      subtopicId: "properties",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 180,
      tags: ["log-properties", "power-rule"],
      prerequisites: ["exponential"],
    },
    (rng) => {
      const m = rng.int(2, 5);
      const p = rng.pick([2, 3]);
      const value = m * p;
      return {
        skill: L("Potencia dentro del logaritmo", "A power inside a logarithm"),
        statement: L(
          `Calcula: $\\log_{2}\\left(${Math.pow(2, m)}^{${p}}\\right)$`,
          `Evaluate: $\\log_{2}\\left(${Math.pow(2, m)}^{${p}}\\right)$`,
        ),
        answer: { kind: "numeric", value },
        hints: [
          L(
            "No hace falta calcular la potencia: usa la propiedad $\\log_{b}(u^{p}) = p \\cdot \\log_{b}(u)$.",
            "You don't need to compute the power: use $\\log_{b}(u^{p}) = p \\cdot \\log_{b}(u)$.",
          ),
          L(
            `El exponente externo es $${p}$: saldrá multiplicando.`,
            `The outer exponent is $${p}$: it comes out as a factor.`,
          ),
          L(
            `Evalúa $\\log_{2}(${Math.pow(2, m)})$ y multiplica por $${p}$.`,
            `Evaluate $\\log_{2}(${Math.pow(2, m)})$ and multiply by $${p}$.`,
          ),
        ],
        answerDisplay: L(`$${value}$`, `$${value}$`),
        solution: [
          step(
            "given",
            `$\\log_{2}\\left(${Math.pow(2, m)}^{${p}}\\right)$`,
            `$\\log_{2}\\left(${Math.pow(2, m)}^{${p}}\\right)$`,
          ),
          step(
            "approach",
            "Aplicamos la propiedad de la potencia y después evaluamos el logaritmo de la base.",
            "Apply the power rule and then evaluate the logarithm of the base.",
          ),
          step(
            "calculation",
            `$\\log_{2}\\left((${Math.pow(2, m)})^{${p}}\\right) = ${p} \\cdot \\log_{2}(${Math.pow(2, m)}) = ${p} \\cdot ${m} = ${value}$`,
            `$\\log_{2}\\left((${Math.pow(2, m)})^{${p}}\\right) = ${p} \\cdot \\log_{2}(${Math.pow(2, m)}) = ${p} \\cdot ${m} = ${value}$`,
          ),
          step(
            "result",
            `El resultado es $${value}$.`,
            `The result is $${value}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Equations: log + log with domain rejection                        */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "log-eq-02",
      subject: "math",
      topicId: "logarithmic",
      subtopicId: "equations",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 240,
      tags: ["logarithmic-equations", "domain", "quadratics"],
      prerequisites: ["exponential"],
    },
    (rng) => {
      // log2(x) + log2(x - c) = s with roots r > 0 and -d < 0
      const [r, d, c, s] = rng.pick([
        [8, 1, 7, 3],
        [8, 2, 6, 4],
        [8, 4, 4, 5],
        [16, 2, 14, 5],
        [4, 2, 2, 3],
      ]);
      const t = Math.pow(2, s);
      return {
        skill: L("Ecuación con dos logaritmos", "Equation with two logarithms"),
        statement: L(
          `Resuelve: $\\log_{2}(x) + \\log_{2}(x - ${c}) = ${s}$`,
          `Solve: $\\log_{2}(x) + \\log_{2}(x - ${c}) = ${s}$`,
        ),
        answer: { kind: "numeric", value: r },
        hints: [
          L(
            "Combina los dos logaritmos en uno solo con la propiedad del producto.",
            "Combine the two logarithms into one using the product rule.",
          ),
          L(
            `Queda $\\log_{2}\\big(x(x - ${c})\\big) = ${s}$, es decir, $x(x - ${c}) = ${t}$.`,
            `You get $\\log_{2}\\big(x(x - ${c})\\big) = ${s}$, that is, $x(x - ${c}) = ${t}$.`,
          ),
          L(
            "Resuelve la cuadrática y comprueba qué raíz respeta el dominio de los logaritmos.",
            "Solve the quadratic and check which root respects the domain of the logarithms.",
          ),
        ],
        answerDisplay: L(`$x = ${r}$`, `$x = ${r}$`),
        solution: [
          step(
            "given",
            `$\\log_{2}(x) + \\log_{2}(x - ${c}) = ${s}$`,
            `$\\log_{2}(x) + \\log_{2}(x - ${c}) = ${s}$`,
          ),
          step(
            "approach",
            "Aplicamos la propiedad del producto, resolvemos la cuadrática y filtramos por el dominio.",
            "Apply the product rule, solve the quadratic, and filter by the domain.",
          ),
          step(
            "calculation",
            `$\\log_{2}\\big(x(x - ${c})\\big) = ${s}$<br>$x(x - ${c}) = ${t}$<br>$x^{2} - ${c}x - ${t} = 0$<br>$(x - ${r})(x + ${d}) = 0$<br>$x = ${r}$ o $x = ${-d}$<br>Dominio: $x > 0$ y $x - ${c} > 0$; la raíz $x = ${-d}$ se rechaza.`,
            `$\\log_{2}\\big(x(x - ${c})\\big) = ${s}$<br>$x(x - ${c}) = ${t}$<br>$x^{2} - ${c}x - ${t} = 0$<br>$(x - ${r})(x + ${d}) = 0$<br>$x = ${r}$ or $x = ${-d}$<br>Domain: $x > 0$ and $x - ${c} > 0$; the root $x = ${-d}$ is rejected.`,
          ),
          step(
            "result",
            `La única solución válida es $x = ${r}$.`,
            `The only valid solution is $x = ${r}$.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Applications: decay time from a logarithmic formula               */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "log-app-02",
      subject: "math",
      topicId: "logarithmic",
      subtopicId: "applications",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 210,
      tags: ["half-life", "applications", "evaluating"],
      prerequisites: ["exponential"],
    },
    (rng) => {
      const H = rng.pick([10, 20, 30, 50]);
      const k = rng.int(4, 7);
      const value = H * k;
      return {
        skill: L("Evaluar una fórmula con logaritmo", "Evaluating a formula with a logarithm"),
        statement: L(
          `El tiempo (en años) que tarda una sustancia radiactiva en reducirse de una cantidad $N_{0}$ a una cantidad $N$ es $t = ${H} \\cdot \\log_{2}(N_{0}/N)$. ¿Cuántos años tardará en quedar reducida a $N = \\frac{N_{0}}{${Math.pow(2, k)}}$?`,
          `The time (in years) for a radioactive substance to decay from an amount $N_{0}$ to an amount $N$ is $t = ${H} \\cdot \\log_{2}(N_{0}/N)$. How many years until it is reduced to $N = \\frac{N_{0}}{${Math.pow(2, k)}}$?`,
        ),
        answer: { kind: "numeric", value },
        hints: [
          L(
            "Calcula primero el cociente $N_{0}/N$.",
            "First compute the ratio $N_{0}/N$.",
          ),
          L(
            `El cociente es $${Math.pow(2, k)} = 2^{${k}}$.`,
            `The ratio is $${Math.pow(2, k)} = 2^{${k}}$.`,
          ),
          L(
            "Recuerda: $\\log_{2}(2^{k}) = k$.",
            "Remember: $\\log_{2}(2^{k}) = k$.",
          ),
        ],
        answerDisplay: L(`$t = ${value}$ años`, `$t = ${value}$ years`),
        solution: [
          step(
            "given",
            `$t = ${H} \\cdot \\log_{2}(N_{0}/N)$ con $N = \\frac{N_{0}}{${Math.pow(2, k)}}$.`,
            `$t = ${H} \\cdot \\log_{2}(N_{0}/N)$ with $N = \\frac{N_{0}}{${Math.pow(2, k)}}$.`,
          ),
          step(
            "approach",
            "Sustituimos $N$ y evaluamos el logaritmo del cociente.",
            "Substitute $N$ and evaluate the logarithm of the ratio.",
          ),
          step(
            "calculation",
            `$\\frac{N_{0}}{N} = ${Math.pow(2, k)}$<br>$t = ${H} \\cdot \\log_{2}(${Math.pow(2, k)}) = ${H} \\cdot ${k} = ${value}$`,
            `$\\frac{N_{0}}{N} = ${Math.pow(2, k)}$<br>$t = ${H} \\cdot \\log_{2}(${Math.pow(2, k)}) = ${H} \\cdot ${k} = ${value}$`,
          ),
          step(
            "result",
            `La sustancia tarda $${value}$ años en reducirse a esa fracción.`,
            `The substance takes $${value}$ years to decay to that fraction.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Challenge: combine power + product rules                          */
  /* ---------------------------------------------------------------- */
  template(
    {
      id: "log-chal-01",
      subject: "math",
      topicId: "logarithmic",
      subtopicId: "properties",
      difficulty: "challenge",
      questionType: "numeric",
      estimatedTimeSec: 300,
      tags: ["log-properties", "multi-step"],
      prerequisites: ["exponential"],
    },
    (rng) => {
      const p = rng.int(2, 5);
      const q = rng.int(3, 7);
      const e = rng.pick([2, 3]);
      const value = e * p + q;
      return {
        skill: L("Combinar propiedades de los logaritmos", "Combining logarithm properties"),
        statement: L(
          `Sabemos que $\\log_{2}(a) = ${p}$ y $\\log_{2}(b) = ${q}$. Calcula $\\log_{2}\\left(a^{${e}} \\cdot b\\right)$.`,
          `Given $\\log_{2}(a) = ${p}$ and $\\log_{2}(b) = ${q}$, compute $\\log_{2}\\left(a^{${e}} \\cdot b\\right)$.`,
        ),
        answer: { kind: "numeric", value },
        hints: [
          L(
            "Usa primero la propiedad de la potencia y después la del producto.",
            "Apply the power rule first, then the product rule.",
          ),
          L(
            `$\\log_{2}(a^{${e}}) = ${e} \\cdot \\log_{2}(a)$.`,
            `$\\log_{2}(a^{${e}}) = ${e} \\cdot \\log_{2}(a)$.`,
          ),
          L(
            "El producto dentro del logaritmo se convierte en una suma de logaritmos.",
            "A product inside a logarithm becomes a sum of logarithms.",
          ),
        ],
        answerDisplay: L(`$${value}$`, `$${value}$`),
        solution: [
          step(
            "given",
            `$\\log_{2}(a) = ${p}$, $\\log_{2}(b) = ${q}$. Se pide $\\log_{2}(a^{${e}} \\cdot b)$.`,
            `$\\log_{2}(a) = ${p}$, $\\log_{2}(b) = ${q}$. Find $\\log_{2}(a^{${e}} \\cdot b)$.`,
          ),
          step(
            "approach",
            "Descomponemos con la propiedad del producto y luego aplicamos la de la potencia.",
            "Break it up with the product rule, then apply the power rule.",
          ),
          step(
            "calculation",
            `$\\log_{2}(a^{${e}} \\cdot b) = \\log_{2}(a^{${e}}) + \\log_{2}(b)$<br>$= ${e} \\cdot \\log_{2}(a) + \\log_{2}(b) = ${e} \\cdot ${p} + ${q} = ${value}$`,
            `$\\log_{2}(a^{${e}} \\cdot b) = \\log_{2}(a^{${e}}) + \\log_{2}(b)$<br>$= ${e} \\cdot \\log_{2}(a) + \\log_{2}(b) = ${e} \\cdot ${p} + ${q} = ${value}$`,
          ),
          step(
            "result",
            `$\\log_{2}(a^{${e}} \\cdot b) = ${value}$.`,
            `$\\log_{2}(a^{${e}} \\cdot b) = ${value}$.`,
          ),
        ],
      };
    },
  ),
];
