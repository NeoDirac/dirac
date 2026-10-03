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


  /* ---------------------------------------------------------------- */
  /* Curated Phase 2 — Übungsaufgaben Studienkolleg Bayern, §8        */
  /* (logaritmos). Transcribed as printed; verified independently     */
  /* before integration. Fixed problems — rng only shuffles MC.       */
  /* ---------------------------------------------------------------- */

  /* §8.2.1 d) — evaluación por definición con base fraccionaria. */
  template(
    {
      id: "log-eval-02",
      subject: "math",
      topicId: "logarithmic",
      subtopicId: "evaluating",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 90,
      tags: ["logarithms", "definition", "negative-exponent"],
      prerequisites: ["conversion"],
      source: {
        sourceId: "stk-bayern-ubung",
        license: "OPEN_LICENSE",
        exerciseNumber: "8.2.1 d)",
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      return {
        skill: L("Evaluar un logaritmo con base fraccionaria", "Evaluating a log with a fractional base"),
        statement: L(
          "Calcula: $$\\log_{1/3} 81$$",
          "Evaluate: $$\\log_{1/3} 81$$",
        ),
        answer: { kind: "numeric", value: -4 },
        hints: [
          L(
            "Desenvuelve la definición: $\\log_b a$ responde a la pregunta «$b$ elevado a **¿qué?** da $a$».",
            "Unpack the definition: $\\log_b a$ answers the question «$b$ raised to **what?** gives $a$».",
          ),
          L(
            "Escribe $\\left(\\frac{1}{3}\\right)^x = 81$ y convierte la base: $\\frac{1}{3} = 3^{-1}$.",
            "Write $\\left(\\frac{1}{3}\\right)^x = 81$ and convert the base: $\\frac{1}{3} = 3^{-1}$.",
          ),
          L(
            "Con base $3$: $3^{-x} = 81 = 3^4$, así que $-x = 4$.",
            "With base $3$: $3^{-x} = 81 = 3^4$, so $-x = 4$.",
          ),
        ],
        answerDisplay: L("$\\log_{1/3} 81 = -4$", "$\\log_{1/3} 81 = -4$"),
        solution: [
          step(
            "given",
            "La base es la fracción $\\frac{1}{3}$ y el argumento es $81 = 3^4$.",
            "The base is the fraction $\\frac{1}{3}$ and the argument is $81 = 3^4$.",
          ),
          step(
            "approach",
            "Definición de logaritmo: $\\log_b a = x \\iff b^x = a$. Convierte la base a una potencia de $3$ para comparar exponentes.",
            "Logarithm definition: $\\log_b a = x \\iff b^x = a$. Convert the base to a power of $3$ to compare exponents.",
          ),
          step(
            "calculation",
            "$\\log_{1/3} 81 = x \\iff \\left(\\frac{1}{3}\\right)^x = 81 \\iff \\left(3^{-1}\\right)^x = 3^4 \\iff 3^{-x} = 3^4$.<br>Igualando exponentes: $-x = 4 \\Rightarrow x = -4$.<br>Verificación: $\\left(\\frac{1}{3}\\right)^{-4} = 3^4 = 81$ ✓",
            "$\\log_{1/3} 81 = x \\iff \\left(\\frac{1}{3}\\right)^x = 81 \\iff \\left(3^{-1}\\right)^x = 3^4 \\iff 3^{-x} = 3^4$.<br>Equating exponents: $-x = 4 \\Rightarrow x = -4$.<br>Check: $\\left(\\frac{1}{3}\\right)^{-4} = 3^4 = 81$ ✓",
          ),
          step(
            "result",
            "$\\log_{1/3} 81 = -4$: una base menor que $1$ con argumento mayor que $1$ siempre da un logaritmo **negativo**.",
            "$\\log_{1/3} 81 = -4$: a base below $1$ with an argument above $1$ always gives a **negative** logarithm.",
          ),
        ],
      };
    },
  ),

  /* §8.2.5 c) — ecuación logarítmica con raíz espuria. */
  template(
    {
      id: "log-eq-03",
      subject: "math",
      topicId: "logarithmic",
      subtopicId: "equations",
      difficulty: "medium",
      questionType: "numeric",
      estimatedTimeSec: 240,
      tags: ["logarithms", "equations", "domain", "spurious-root"],
      prerequisites: ["properties"],
      source: {
        sourceId: "stk-bayern-ubung",
        license: "OPEN_LICENSE",
        exerciseNumber: "8.2.5 c)",
      },
      reasoning: "spurious",
    },
    (rng) => {
      return {
        skill: L("Ecuación logarítmica con raíz espuria", "Logarithmic equation with a spurious root"),
        statement: L(
          "Resuelve sobre $\\mathbb{R}$ (¡cuida el dominio!): $$\\log_2 (x + 2) + \\log_2 x - \\log_2 3 = 0$$",
          "Solve over $\\mathbb{R}$ (mind the domain!): $$\\log_2 (x + 2) + \\log_2 x - \\log_2 3 = 0$$",
        ),
        answer: { kind: "numeric", value: 1 },
        hints: [
          L(
            "Antes de tocar nada, escribe el dominio: se necesita $x > 0$ y $x + 2 > 0$.",
            "Before anything else, write the domain: you need $x > 0$ and $x + 2 > 0$.",
          ),
          L(
            "Reúne los tres logaritmos en uno solo con las propiedades (suma = producto, resta = cociente).",
            "Combine the three logarithms into one using the properties (sum = product, difference = quotient).",
          ),
          L(
            "Queda $\\log_2 \\frac{x(x+2)}{3} = 0$: un logaritmo vale $0$ exactamente cuando su argumento vale $1$. Resuelve $x(x+2) = 3$ y **filtra** con el dominio.",
            "You get $\\log_2 \\frac{x(x+2)}{3} = 0$: a logarithm equals $0$ exactly when its argument equals $1$. Solve $x(x+2) = 3$ and **filter** with the domain.",
          ),
        ],
        answerDisplay: L("$L = \\{1\\}$ (la raíz $-3$ se descarta)", "$L = \\{1\\}$ (the root $-3$ is discarded)"),
        solution: [
          step(
            "given",
            "La ecuación $\\log_2(x+2) + \\log_2 x - \\log_2 3 = 0$; dominio: $x > 0$ y $x + 2 > 0$, es decir $x > 0$.",
            "The equation $\\log_2(x+2) + \\log_2 x - \\log_2 3 = 0$; domain: $x > 0$ and $x + 2 > 0$, i.e. $x > 0$.",
          ),
          step(
            "approach",
            "Combinar en un único logaritmo, aplicar $\\log_b u = 0 \\iff u = 1$ y resolver la ecuación cuadrática resultante. Toda candidata debe pasar el filtro del dominio.",
            "Combine into a single logarithm, apply $\\log_b u = 0 \\iff u = 1$ and solve the resulting quadratic. Every candidate must pass the domain filter.",
          ),
          step(
            "calculation",
            "$\\log_2 \\frac{x(x+2)}{3} = 0 \\iff \\frac{x(x+2)}{3} = 1 \\iff x^2 + 2x - 3 = 0$.<br>Factorizando: $(x + 3)(x - 1) = 0 \\Rightarrow x = -3$ o $x = 1$.<br>Filtro del dominio ($x > 0$): $x = -3$ **se descarta**. $x = 1$ vale.<br>Verificación con $x = 1$: $\\log_2 3 + \\log_2 1 - \\log_2 3 = 0$ ✓",
            "$\\log_2 \\frac{x(x+2)}{3} = 0 \\iff \\frac{x(x+2)}{3} = 1 \\iff x^2 + 2x - 3 = 0$.<br>Factoring: $(x + 3)(x - 1) = 0 \\Rightarrow x = -3$ or $x = 1$.<br>Domain filter ($x > 0$): $x = -3$ **is discarded**. $x = 1$ works.<br>Check with $x = 1$: $\\log_2 3 + \\log_2 1 - \\log_2 3 = 0$ ✓",
          ),
          step(
            "result",
            "$L = \\{1\\}$. La raíz $-3$ es espuria: nació del álgebra, pero $\\log_2(-3)$ no existe — por eso el dominio se escribe **antes** de resolver.",
            "$L = \\{1\\}$. The root $-3$ is spurious: it was born from the algebra, but $\\log_2(-3)$ does not exist — that is why the domain is written **before** solving.",
          ),
        ],
      };
    },
  ),

  /* §8.2.5 d) — logaritmos de igual base: igualar argumentos. */
  template(
    {
      id: "log-eq-04",
      subject: "math",
      topicId: "logarithmic",
      subtopicId: "equations",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 150,
      tags: ["logarithms", "equations", "domain"],
      prerequisites: ["properties"],
      source: {
        sourceId: "stk-bayern-ubung",
        license: "OPEN_LICENSE",
        exerciseNumber: "8.2.5 d)",
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      return {
        skill: L("Logaritmos de igual base a ambos lados", "Same-base logarithms on both sides"),
        statement: L(
          "Resuelve sobre $\\mathbb{R}$: $$\\log (3x - 5) = \\lg (2x + 6)$$ (ambos logaritmos están en base 10; $\\lg$ y $\\log$ significan lo mismo aquí).",
          "Solve over $\\mathbb{R}$: $$\\log (3x - 5) = \\lg (2x + 6)$$ (both logarithms are base 10; $\\lg$ and $\\log$ mean the same here).",
        ),
        answer: { kind: "numeric", value: 11 },
        hints: [
          L(
            "Misma base a ambos lados: el logaritmo es **inyectivo**, así que dos logaritmos iguales tienen argumentos iguales.",
            "Same base on both sides: the logarithm is **injective**, so two equal logarithms have equal arguments.",
          ),
          L(
            "$3x - 5 = 2x + 6$: queda una ecuación lineal.",
            "$3x - 5 = 2x + 6$: a linear equation remains.",
          ),
          L(
            "Comprueba al final que ambos argumentos siguen siendo positivos con tu solución.",
            "Check at the end that both arguments remain positive with your solution.",
          ),
        ],
        answerDisplay: L("$L = \\{11\\}$", "$L = \\{11\\}$"),
        solution: [
          step(
            "given",
            "$\\log(3x - 5) = \\lg(2x + 6)$, ambos en base 10. Dominio: $3x - 5 > 0$ y $2x + 6 > 0$, es decir $x > \\frac{5}{3}$.",
            "$\\log(3x - 5) = \\lg(2x + 6)$, both base 10. Domain: $3x - 5 > 0$ and $2x + 6 > 0$, i.e. $x > \\frac{5}{3}$.",
          ),
          step(
            "approach",
            "Con la misma base, iguala directamente los argumentos (inyectividad del logaritmo) y resuelve la ecuación lineal.",
            "With the same base, equate the arguments directly (injectivity of the logarithm) and solve the linear equation.",
          ),
          step(
            "calculation",
            "$3x - 5 = 2x + 6 \\Rightarrow x = 11$.<br>Filtro del dominio: $x = 11 > \\frac{5}{3}$ ✓.<br>Verificación: $\\log(3 \\cdot 11 - 5) = \\log 28$ y $\\lg(2 \\cdot 11 + 6) = \\lg 28$ ✓ — el mismo argumento, luego el mismo logaritmo.",
            "$3x - 5 = 2x + 6 \\Rightarrow x = 11$.<br>Domain filter: $x = 11 > \\frac{5}{3}$ ✓.<br>Check: $\\log(3 \\cdot 11 - 5) = \\log 28$ and $\\lg(2 \\cdot 11 + 6) = \\lg 28$ ✓ — the same argument, hence the same logarithm.",
          ),
          step(
            "result",
            "$L = \\{11\\}$.",
            "$L = \\{11\\}$.",
          ),
        ],
      };
    },
  ),

  /* ================================================================== */
  /* Curated — ESPOL Fundamentos, EDICIÓN DIGITAL (TUTOR_LICENSED).      */
  /* Chapter 3 «Funciones de variable real»: §3.13 Función              */
  /* exponencial (pp. 389-393) / §3.14 Función logarítmica              */
  /* (pp. 391-396). Tutor's brief: «vayas a por los ejercicios del      */
  /* cap 3». Every answer double-verified: printed key pp. 939-940 +    */
  /* sympy (download/verify_espol_ch3.py).                               */
  /* ================================================================== */

  /* 113 — log 75 in terms of a=log2, b=log3 → 2+b−2a. Printed key: e). */
  template(
    {
      id: "log-espol-ch3-113",
      subject: "math",
      topicId: "logarithmic",
      subtopicId: "properties",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 210,
      tags: ["log-properties", "decomposition"],
      prerequisites: ["properties"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3 · 113",
        page: 391,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$3 - 3a$", "$3 - 3a$"), correct: false },
        { id: "b", text: L("$2 - a + b$", "$2 - a + b$"), correct: false },
        { id: "c", text: L("$2 - 2b + a$", "$2 - 2b + a$"), correct: false },
        { id: "d", text: L("$1 - a + b$", "$1 - a + b$"), correct: false },
        { id: "e", text: L("$2 + b - 2a$", "$2 + b - 2a$"), correct: true },
      ];
      return {
        skill: L("Descomponer $\\log 75$ a partir de $\\log 2$ y $\\log 3$", "Decomposing $\\log 75$ from $\\log 2$ and $\\log 3$"),
        statement: L(
          "Si $\\log 2 = a$ y $\\log 3 = b$ ($\\log$ denota el logaritmo decimal), entonces $\\log 75$ es:",
          "If $\\log 2 = a$ and $\\log 3 = b$ ($\\log$ denotes the base-10 logarithm), then $\\log 75$ is:",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Factoriza $75$ en primos: $75 = 3 \\cdot 5^{2}$. Aparece $\\log 5$, que no está entre los datos… pero se puede escribir a partir de $\\log 2$.",
            "Factor $75$ into primes: $75 = 3 \\cdot 5^{2}$. A $\\log 5$ shows up, which is not among the data… but it can be written from $\\log 2$.",
          ),
          L(
            "El truco está en $\\log 10 = 1$: como $\\log 2 + \\log 5 = \\log 10 = 1$, tienes $\\log 5 = 1 - a$.",
            "The trick lies in $\\log 10 = 1$: since $\\log 2 + \\log 5 = \\log 10 = 1$, you have $\\log 5 = 1 - a$.",
          ),
          L(
            "Aplica las leyes del producto y de la potencia: $\\log 75 = \\log 3 + 2\\log 5$; sustituye $b$ y el resultado del truco anterior, y simplifica.",
            "Apply the product and power laws: $\\log 75 = \\log 3 + 2\\log 5$; substitute $b$ and the result of the previous trick, then simplify.",
          ),
        ],
        answerDisplay: L("$\\log 75 = 2 + b - 2a$", "$\\log 75 = 2 + b - 2a$"),
        solution: [
          step(
            "given",
            "Datos: $\\log 2 = a$ y $\\log 3 = b$ (base 10); se pide $\\log 75$.",
            "Data: $\\log 2 = a$ and $\\log 3 = b$ (base 10); the goal is $\\log 75$.",
          ),
          step(
            "approach",
            "Descomponer $75$ en factores primos y usar las leyes del logaritmo, expresando el $\\log 5$ «faltante» mediante la pareja $\\log 2 + \\log 5 = \\log 10 = 1$.",
            "Decompose $75$ into prime factors and use the logarithm laws, expressing the «missing» $\\log 5$ through the pair $\\log 2 + \\log 5 = \\log 10 = 1$.",
          ),
          step(
            "calculation",
            "$75 = 3 \\cdot 5^{2}$, así que $\\log 75 = \\log 3 + 2\\log 5 = b + 2(1 - a) = b + 2 - 2a$.",
            "$75 = 3 \\cdot 5^{2}$, so $\\log 75 = \\log 3 + 2\\log 5 = b + 2(1 - a) = b + 2 - 2a$.",
          ),
          step(
            "result",
            "$\\log 75 = 2 + b - 2a$ (opción e). Verificación numérica: con $a \\approx 0{,}30103$ y $b \\approx 0{,}47712$, $2 + b - 2a \\approx 1{,}87506$, y directamente $\\log 75 \\approx 1{,}87506$ ✓.",
            "$\\log 75 = 2 + b - 2a$ (option e). Numeric check: with $a \\approx 0.30103$ and $b \\approx 0.47712$, $2 + b - 2a \\approx 1.87506$, and directly $\\log 75 \\approx 1.87506$ ✓.",
          ),
        ],
      };
    },
  ),

  /* 118a — 36^(log6 5)+10^(1−log2)−3^(log9 36) = 24. Printed key: a) 24. */
  template(
    {
      id: "log-espol-ch3-118a",
      subject: "math",
      topicId: "logarithmic",
      subtopicId: "evaluating",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 300,
      tags: ["log-evaluation", "power-identities"],
      prerequisites: ["evaluating", "properties"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3 · 118a",
        page: 392,
      },
      reasoning: "definition-hunting",
    },
    () => ({
      skill: L("La identidad $a^{\\log_{a} b} = b$ en sus tres disfraces", "The identity $a^{\\log_{a} b} = b$ in its three disguises"),
      statement: L(
        "Simplifica y calcula: $36^{\\log_{6} 5} + 10^{1 - \\log 2} - 3^{\\log_{9} 36}$ (logaritmo decimal donde no se escribe la base).",
        "Simplify and compute: $36^{\\log_{6} 5} + 10^{1 - \\log 2} - 3^{\\log_{9} 36}$ (base-10 logarithm where no base is written).",
      ),
      answer: { kind: "numeric", value: 24 },
      hints: [
        L(
          "Cada término es una potencia cuya base y cuyo exponente se relacionan: intenta escribir el exponente como **un solo** logaritmo cuya base coincida con la base de la potencia.",
          "Each term is a power whose base and exponent are related: try to write the exponent as **a single** logarithm whose base matches the base of the power.",
        ),
        L(
          "Como $36 = 6^{2}$, puedes meter el $2$ dentro del logaritmo: $36^{\\log_{6} 5} = 6^{2\\,\\log_{6} 5} = 6^{\\log_{6} 5^{2}}$.",
          "Since $36 = 6^{2}$, you can push the $2$ inside the logarithm: $36^{\\log_{6} 5} = 6^{2\\,\\log_{6} 5} = 6^{\\log_{6} 5^{2}}$.",
        ),
        L(
          "Para el último término cambia $\\log_{9} 36$ a base $3$ (recuerda $9 = 3^{2}$); para el del medio, $10^{1 - \\log 2} = \\dfrac{10}{10^{\\log 2}}$ y usa $10^{\\log u} = u$.",
          "For the last term change $\\log_{9} 36$ to base $3$ (recall $9 = 3^{2}$); for the middle one, $10^{1 - \\log 2} = \\dfrac{10}{10^{\\log 2}}$ and use $10^{\\log u} = u$.",
        ),
      ],
      answerDisplay: L("$25 + 5 - 6 = 24$", "$25 + 5 - 6 = 24$"),
      solution: [
        step(
          "given",
          "La expresión $36^{\\log_{6} 5} + 10^{1 - \\log 2} - 3^{\\log_{9} 36}$, con $\\log$ en base 10.",
          "The expression $36^{\\log_{6} 5} + 10^{1 - \\log 2} - 3^{\\log_{9} 36}$, with $\\log$ in base 10.",
        ),
        step(
          "approach",
          "Aplicar la identidad $a^{\\log_{a} b} = b$ a cada término, armonizando base y exponente: $36 = 6^{2}$, $10^{\\log u} = u$ y el cambio de base $\\log_{9} 36 = \\log_{3} 6$.",
          "Apply the identity $a^{\\log_{a} b} = b$ to each term, harmonizing base and exponent: $36 = 6^{2}$, $10^{\\log u} = u$ and the change of base $\\log_{9} 36 = \\log_{3} 6$.",
        ),
        step(
          "calculation",
          "$36^{\\log_{6} 5} = 6^{\\log_{6} 5^{2}} = 5^{2} = 25$<br>$10^{1 - \\log 2} = \\dfrac{10}{10^{\\log 2}} = \\dfrac{10}{2} = 5$<br>$\\log_{9} 36 = \\dfrac{\\log_{3} 36}{\\log_{3} 9} = \\dfrac{\\log_{3} 36}{2} = \\log_{3} 6$, luego $3^{\\log_{9} 36} = 3^{\\log_{3} 6} = 6$<br>Suma total: $25 + 5 - 6 = 24$",
          "$36^{\\log_{6} 5} = 6^{\\log_{6} 5^{2}} = 5^{2} = 25$<br>$10^{1 - \\log 2} = \\dfrac{10}{10^{\\log 2}} = \\dfrac{10}{2} = 5$<br>$\\log_{9} 36 = \\dfrac{\\log_{3} 36}{\\log_{3} 9} = \\dfrac{\\log_{3} 36}{2} = \\log_{3} 6$, then $3^{\\log_{9} 36} = 3^{\\log_{3} 6} = 6$<br>Total: $25 + 5 - 6 = 24$",
        ),
        step(
          "result",
          "El valor exacto es $24$. Verificación numérica: $\\log_{6} 5 \\approx 0{,}8982$ y $36^{0{,}8982} \\approx 25$; $1 - \\log 2 \\approx 0{,}6990$ y $10^{0{,}6990} \\approx 5$; $\\log_{9} 36 \\approx 1{,}6309$ y $3^{1{,}6309} \\approx 6$ ✓.",
          "The exact value is $24$. Numeric check: $\\log_{6} 5 \\approx 0.8982$ and $36^{0.8982} \\approx 25$; $1 - \\log 2 \\approx 0.6990$ and $10^{0.6990} \\approx 5$; $\\log_{9} 36 \\approx 1.6309$ and $3^{1.6309} \\approx 6$ ✓.",
        ),
      ],
    }),
  ),

  /* 120a — log₁₀₀ 40 with log₂ 5 = a → (a+3)/(2(a+1)) (option c here).
     Printed key: (a+3)/2(a+1). */
  template(
    {
      id: "log-espol-ch3-120a",
      subject: "math",
      topicId: "logarithmic",
      subtopicId: "evaluating",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["log-evaluation", "change-of-base", "algebra-in-logs"],
      prerequisites: ["evaluating", "properties"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3 · 120a",
        page: 392,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$\\dfrac{a+1}{2}$", "$\\dfrac{a+1}{2}$"), correct: false },
        { id: "b", text: L("$\\dfrac{3a+2}{2(a+1)}$", "$\\dfrac{3a+2}{2(a+1)}$"), correct: false },
        { id: "c", text: L("$\\dfrac{a+3}{2(a+1)}$", "$\\dfrac{a+3}{2(a+1)}$"), correct: true },
        { id: "d", text: L("$\\dfrac{a+3}{a+1}$", "$\\dfrac{a+3}{a+1}$"), correct: false },
        { id: "e", text: L("$\\dfrac{2a+3}{2(a+1)}$", "$\\dfrac{2a+3}{2(a+1)}$"), correct: false },
      ];
      return {
        skill: L("Cambio de base con datos indirectos: de $\\log_{2} 5 = a$ a $\\log_{100} 40$", "Change of base with indirect data: from $\\log_{2} 5 = a$ to $\\log_{100} 40$"),
        statement: L(
          "Si $\\log_{2} 5 = a$, determina $\\log_{100} 40$.",
          "If $\\log_{2} 5 = a$, determine $\\log_{100} 40$.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Cambia a base 10: $\\log_{100} 40 = \\dfrac{\\log 40}{\\log 100} = \\dfrac{\\log 40}{2}$.",
            "Switch to base 10: $\\log_{100} 40 = \\dfrac{\\log 40}{\\log 100} = \\dfrac{\\log 40}{2}$.",
          ),
          L(
            "Factoriza $40 = 8 \\cdot 5$ y usa la pareja clave $\\log 2 + \\log 5 = \\log 10 = 1$ para dejar todo en función de $\\log 2$.",
            "Factor $40 = 8 \\cdot 5$ and use the key pair $\\log 2 + \\log 5 = \\log 10 = 1$ to leave everything in terms of $\\log 2$.",
          ),
          L(
            "Traduce el dato: $\\log_{2} 5 = a$ significa $\\log 5 = a \\cdot \\log 2$; junto con la pareja anterior puedes despejar $\\log 2$ (y con ello el resultado).",
            "Translate the data: $\\log_{2} 5 = a$ means $\\log 5 = a \\cdot \\log 2$; combined with the previous pair you can isolate $\\log 2$ (and with it the result).",
          ),
        ],
        answerDisplay: L("$\\log_{100} 40 = \\dfrac{a+3}{2(a+1)}$", "$\\log_{100} 40 = \\dfrac{a+3}{2(a+1)}$"),
        solution: [
          step(
            "given",
            "Dato: $\\log_{2} 5 = a$; incógnita: $\\log_{100} 40$.",
            "Data: $\\log_{2} 5 = a$; unknown: $\\log_{100} 40$.",
          ),
          step(
            "approach",
            "Expresar $\\log_{100} 40$ en base 10, reducirla a una combinación de $\\log 2$ usando $\\log 2 + \\log 5 = 1$, y traducir el dato como $\\log 5 = a\\,\\log 2$.",
            "Express $\\log_{100} 40$ in base 10, reduce it to a combination of $\\log 2$ using $\\log 2 + \\log 5 = 1$, and translate the data as $\\log 5 = a\\,\\log 2$.",
          ),
          step(
            "calculation",
            "$\\log_{100} 40 = \\dfrac{\\log 40}{2} = \\dfrac{\\log 8 + \\log 5}{2} = \\dfrac{3\\log 2 + \\log 5}{2} = \\dfrac{2\\log 2 + 1}{2}$, donde se usó $\\log 5 = 1 - \\log 2$.<br>Del dato: $\\log 5 = a\\,\\log 2$ y $\\log 2 + \\log 5 = \\log 2\\,(1 + a) = 1 \\Rightarrow \\log 2 = \\dfrac{1}{1+a}$.<br>Por tanto: $\\dfrac{2\\log 2 + 1}{2} = \\dfrac{\\dfrac{2}{1+a} + 1}{2} = \\dfrac{3+a}{2(1+a)}$.",
            "$\\log_{100} 40 = \\dfrac{\\log 40}{2} = \\dfrac{\\log 8 + \\log 5}{2} = \\dfrac{3\\log 2 + \\log 5}{2} = \\dfrac{2\\log 2 + 1}{2}$, where $\\log 5 = 1 - \\log 2$ was used.<br>From the data: $\\log 5 = a\\,\\log 2$ and $\\log 2 + \\log 5 = \\log 2\\,(1 + a) = 1 \\Rightarrow \\log 2 = \\dfrac{1}{1+a}$.<br>Therefore: $\\dfrac{2\\log 2 + 1}{2} = \\dfrac{\\dfrac{2}{1+a} + 1}{2} = \\dfrac{3+a}{2(1+a)}$.",
          ),
          step(
            "result",
            "$\\log_{100} 40 = \\dfrac{a+3}{2(a+1)}$ (opción c). Verificación numérica: $a = \\log_{2} 5 \\approx 2{,}3219$, así que $\\dfrac{a+3}{2(a+1)} \\approx \\dfrac{5{,}3219}{6{,}6439} \\approx 0{,}8010$; y directamente $\\log_{100} 40 = \\dfrac{\\log 40}{2} \\approx 0{,}80103$ ✓.",
            "$\\log_{100} 40 = \\dfrac{a+3}{2(a+1)}$ (option c). Numeric check: $a = \\log_{2} 5 \\approx 2.3219$, so $\\dfrac{a+3}{2(a+1)} \\approx \\dfrac{5.3219}{6.6439} \\approx 0.8010$; and directly $\\log_{100} 40 = \\dfrac{\\log 40}{2} \\approx 0.80103$ ✓.",
          ),
        ],
      };
    },
  ),

  /* 115b — log(x²−4)−log(x+2)=3log(x−2) → {3}. Printed key: b){3}. */
  template(
    {
      id: "log-espol-ch3-115b",
      subject: "math",
      topicId: "logarithmic",
      subtopicId: "equations",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 270,
      tags: ["log-equation", "domain", "spurious"],
      prerequisites: ["equations", "properties"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3 · 115b",
        page: 391,
      },
      reasoning: "spurious",
    },
    () => ({
      skill: L("Ecuación logarítmica: dominio primero, soluciones extrañas después", "Logarithmic equation: domain first, spurious solutions later"),
      statement: L(
        "Halla el conjunto de verdad de $q(x):\\ \\log(x^{2} - 4) - \\log(x + 2) = 3\\log(x - 2)$ (logaritmo decimal; da el valor de $x$).",
        "Find the truth set of $q(x):\\ \\log(x^{2} - 4) - \\log(x + 2) = 3\\log(x - 2)$ (base-10 logarithm; give the value of $x$).",
      ),
      answer: { kind: "numeric", value: 3 },
      hints: [
        L(
          "Antes de operar, escribe el dominio: hacen falta $x^{2} - 4 > 0$, $x + 2 > 0$ y $x - 2 > 0$. Las tres juntas dejan una sola desigualdad.",
          "Before operating, write down the domain: you need $x^{2} - 4 > 0$, $x + 2 > 0$ and $x - 2 > 0$. Together they leave a single inequality.",
        ),
        L(
          "Con el dominio garantizado, condensa el lado izquierdo: $\\log(x^{2} - 4) - \\log(x + 2) = \\log\\dfrac{(x-2)(x+2)}{x+2}$.",
          "With the domain guaranteed, condense the left side: $\\log(x^{2} - 4) - \\log(x + 2) = \\log\\dfrac{(x-2)(x+2)}{x+2}$.",
        ),
        L(
          "Te queda $\\log(x - 2) = 3\\log(x - 2)$; pasa a forma exponencial y resuelve la ecuación algebraica — luego filtra cada candidata contra el dominio.",
          "You are left with $\\log(x - 2) = 3\\log(x - 2)$; go to exponential form and solve the algebraic equation — then filter every candidate against the domain.",
        ),
      ],
      answerDisplay: L("$A_{q(x)} = \\{3\\}$", "$A_{q(x)} = \\{3\\}$"),
      solution: [
        step(
          "given",
          "$\\log(x^{2} - 4) - \\log(x + 2) = 3\\log(x - 2)$, con $\\log$ en base 10.",
          "$\\log(x^{2} - 4) - \\log(x + 2) = 3\\log(x - 2)$, with $\\log$ in base 10.",
        ),
        step(
          "approach",
          "Fijar el dominio, condensar los logaritmos del lado izquierdo en un cociente y aplicar la definición; al final, filtrar las candidatas contra el dominio.",
          "Fix the domain, condense the left-side logarithms into a quotient and apply the definition; finally, filter the candidates against the domain.",
        ),
        step(
          "calculation",
          "Dominio: $x - 2 > 0 \\Rightarrow x > 2$ (implica $x + 2 > 0$ y $x^{2} - 4 > 0$).<br>Condensando: $\\log\\dfrac{x^{2}-4}{x+2} = \\log(x - 2)$ y, como $\\dfrac{x^{2}-4}{x+2} = x - 2$ (válido pues $x + 2 > 0$), queda $\\log(x - 2) = 3\\log(x - 2) = \\log(x-2)^{3}$.<br>Entonces $x - 2 = (x - 2)^{3} \\Rightarrow (x-2)\\bigl[(x-2)^{2} - 1\\bigr] = 0 \\Rightarrow x = 2$, $x = 1$ o $x = 3$.",
          "Domain: $x - 2 > 0 \\Rightarrow x > 2$ (it implies $x + 2 > 0$ and $x^{2} - 4 > 0$).<br>Condensing: $\\log\\dfrac{x^{2}-4}{x+2} = \\log(x - 2)$ and, since $\\dfrac{x^{2}-4}{x+2} = x - 2$ (valid because $x + 2 > 0$), one gets $\\log(x - 2) = 3\\log(x - 2) = \\log(x-2)^{3}$.<br>Then $x - 2 = (x - 2)^{3} \\Rightarrow (x-2)\\bigl[(x-2)^{2} - 1\\bigr] = 0 \\Rightarrow x = 2$, $x = 1$ or $x = 3$.",
        ),
        step(
          "result",
          "$A_{q(x)} = \\{3\\}$: $x = 2$ y $x = 1$ son soluciones extrañas (dan $x - 2 \\leq 0$ y el logaritmo no existe). Verificación con $x = 3$: $\\log 5 - \\log 5 = 0$ y $3\\log 1 = 0$ ✓.",
          "$A_{q(x)} = \\{3\\}$: $x = 2$ and $x = 1$ are spurious solutions (they give $x - 2 \\leq 0$ and the logarithm does not exist). Check at $x = 3$: $\\log 5 - \\log 5 = 0$ and $3\\log 1 = 0$ ✓.",
        ),
      ],
    }),
  ),

  /* 131e — log₂(9^(x−1)+7)=2+log₂(3^(x−1)+1) → {1,2}, sum 3. Printed key: e){1,2}. */
  template(
    {
      id: "log-espol-ch3-131e",
      subject: "math",
      topicId: "logarithmic",
      subtopicId: "equations",
      difficulty: "hard",
      questionType: "numeric",
      estimatedTimeSec: 300,
      tags: ["log-equation", "exponential-substitution"],
      prerequisites: ["equations", "properties"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3 · 131e",
        page: 394,
      },
      reasoning: "parameters",
    },
    () => ({
      skill: L("Logaritmos con argumentos exponenciales: aislar y sustituir $t = 3^{x-1}$", "Logarithms with exponential arguments: isolate and substitute $t = 3^{x-1}$"),
      statement: L(
        "Resuelve $\\log_{2}\\left(9^{x-1} + 7\\right) = 2 + \\log_{2}\\left(3^{x-1} + 1\\right)$ sobre $\\mathbb{R}$ y da la **suma** de las soluciones.",
        "Solve $\\log_{2}\\left(9^{x-1} + 7\\right) = 2 + \\log_{2}\\left(3^{x-1} + 1\\right)$ over $\\mathbb{R}$ and give the **sum** of the solutions.",
      ),
      answer: { kind: "numeric", value: 3 },
      hints: [
        L(
          "Reagrupa: pasa el $\\log_{2}(3^{x-1}+1)$ a la izquierda y escribe el $2$ de la derecha como $\\log_{2} 4$ — así tendrás un solo logaritmo a cada lado.",
          "Regroup: move $\\log_{2}(3^{x-1}+1)$ to the left and write the $2$ on the right as $\\log_{2} 4$ — that way you have a single logarithm on each side.",
        ),
        L(
          "Al igualar los argumentos queda $9^{x-1} + 7 = 4\\left(3^{x-1} + 1\\right)$; como $9 = 3^{2}$, el lado izquierdo es un cuadrado en $t = 3^{x-1}$.",
          "Equating the arguments gives $9^{x-1} + 7 = 4\\left(3^{x-1} + 1\\right)$; since $9 = 3^{2}$, the left side is a perfect square in $t = 3^{x-1}$.",
        ),
        L(
          "Resuelve la cuadrática en $t$ (solo valen $t > 0$) y recupera cada $x$ con $x = 1 + \\log_{3} t$; al final suma las dos soluciones.",
          "Solve the quadratic in $t$ (only $t > 0$ counts) and recover each $x$ with $x = 1 + \\log_{3} t$; finally add the two solutions.",
        ),
      ],
      answerDisplay: L("Soluciones: $x = 1$ y $x = 2$; suma $3$", "Solutions: $x = 1$ and $x = 2$; sum $3$"),
      solution: [
        step(
          "given",
          "$\\log_{2}\\left(9^{x-1} + 7\\right) = 2 + \\log_{2}\\left(3^{x-1} + 1\\right)$, $x \\in \\mathbb{R}$.",
          "$\\log_{2}\\left(9^{x-1} + 7\\right) = 2 + \\log_{2}\\left(3^{x-1} + 1\\right)$, $x \\in \\mathbb{R}$.",
        ),
        step(
          "approach",
          "Tener un logaritmo a cada lado usando $2 = \\log_{2} 4$ e igualar argumentos; después sustituir $t = 3^{x-1} > 0$ (con $9^{x-1} = t^{2}$) para obtener una cuadrática.",
          "Have a single logarithm on each side using $2 = \\log_{2} 4$ and equate arguments; then substitute $t = 3^{x-1} > 0$ (with $9^{x-1} = t^{2}$) to obtain a quadratic.",
        ),
        step(
          "calculation",
          "$\\log_{2}\\left(9^{x-1} + 7\\right) - \\log_{2}\\left(3^{x-1} + 1\\right) = 2 \\Rightarrow \\log_{2}\\dfrac{9^{x-1} + 7}{3^{x-1} + 1} = 2 \\Rightarrow 9^{x-1} + 7 = 4\\left(3^{x-1} + 1\\right)$.<br>Con $t = 3^{x-1}$: $t^{2} + 7 = 4t + 4 \\Rightarrow t^{2} - 4t + 3 = 0 \\Rightarrow (t-1)(t-3) = 0 \\Rightarrow t = 1$ o $t = 3$.<br>$3^{x-1} = 1 \\Rightarrow x = 1$; $3^{x-1} = 3 \\Rightarrow x = 2$.",
          "$\\log_{2}\\left(9^{x-1} + 7\\right) - \\log_{2}\\left(3^{x-1} + 1\\right) = 2 \\Rightarrow \\log_{2}\\dfrac{9^{x-1} + 7}{3^{x-1} + 1} = 2 \\Rightarrow 9^{x-1} + 7 = 4\\left(3^{x-1} + 1\\right)$.<br>With $t = 3^{x-1}$: $t^{2} + 7 = 4t + 4 \\Rightarrow t^{2} - 4t + 3 = 0 \\Rightarrow (t-1)(t-3) = 0 \\Rightarrow t = 1$ or $t = 3$.<br>$3^{x-1} = 1 \\Rightarrow x = 1$; $3^{x-1} = 3 \\Rightarrow x = 2$.",
        ),
        step(
          "result",
          "Las soluciones son $x = 1$ y $x = 2$: su **suma** es $3$. Verificación: $x = 1$: $\\log_{2}(1 + 7) = 3$ y $2 + \\log_{2}(1 + 1) = 3$ ✓; $x = 2$: $\\log_{2}(9 + 7) = \\log_{2} 16 = 4$ y $2 + \\log_{2}(3 + 1) = 4$ ✓.",
          "The solutions are $x = 1$ and $x = 2$: their **sum** is $3$. Check: $x = 1$: $\\log_{2}(1 + 7) = 3$ and $2 + \\log_{2}(1 + 1) = 3$ ✓; $x = 2$: $\\log_{2}(9 + 7) = \\log_{2} 16 = 4$ and $2 + \\log_{2}(3 + 1) = 4$ ✓.",
        ),
      ],
    }),
  ),

  /* 137a — log_{1/2}((2x²−4x−6)/(4x−11)) ≤ −1 → [2,11/4)∪[4,∞). Printed key: a). */
  template(
    {
      id: "log-espol-ch3-137a",
      subject: "math",
      topicId: "logarithmic",
      subtopicId: "equations",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 360,
      tags: ["log-inequality", "base-less-than-1", "sign-table"],
      prerequisites: ["equations", "properties"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3 · 137a",
        page: 396,
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$\\left[2, \\dfrac{11}{4}\\right) \\cup [4, +\\infty)$", "$\\left[2, \\dfrac{11}{4}\\right) \\cup [4, +\\infty)$"), correct: true },
        { id: "b", text: L("$(-\\infty, 2] \\cup \\left(\\dfrac{11}{4}, 4\\right)$", "$(-\\infty, 2] \\cup \\left(\\dfrac{11}{4}, 4\\right)$"), correct: false },
        { id: "c", text: L("$\\left[2, \\dfrac{11}{4}\\right]$", "$\\left[2, \\dfrac{11}{4}\\right]$"), correct: false },
        { id: "d", text: L("$\\left(\\dfrac{11}{4}, 4\\right]$", "$\\left(\\dfrac{11}{4}, 4\\right]$"), correct: false },
        { id: "e", text: L("$[2, +\\infty)$", "$[2, +\\infty)$"), correct: false },
      ];
      return {
        skill: L("Inecuación logarítmica con base en $(0,1)$: la desigualdad se invierte", "Logarithmic inequality with base in $(0,1)$: the inequality flips"),
        statement: L(
          "Determina el conjunto de verdad de la inecuación $\\log_{1/2}\\left(\\dfrac{2x^{2} - 4x - 6}{4x - 11}\\right) \\leq -1$, con $x \\in \\mathbb{R}$.",
          "Determine the truth set of the inequality $\\log_{1/2}\\left(\\dfrac{2x^{2} - 4x - 6}{4x - 11}\\right) \\leq -1$, with $x \\in \\mathbb{R}$.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Como la base $\\dfrac{1}{2}$ está entre $0$ y $1$, la función logaritmo es **decreciente**: al quitar el logaritmo, la desigualdad se invierte.",
            "Since the base $\\dfrac{1}{2}$ lies between $0$ and $1$, the logarithm function is **decreasing**: when you remove the logarithm, the inequality flips.",
          ),
          L(
            "$\\log_{1/2}(u) \\leq -1$ equivale a $u \\geq \\left(\\dfrac{1}{2}\\right)^{-1} = 2$ — observa que esta conversión ya obliga a que el argumento sea positivo.",
            "$\\log_{1/2}(u) \\leq -1$ is equivalent to $u \\geq \\left(\\dfrac{1}{2}\\right)^{-1} = 2$ — note that this conversion already forces the argument to be positive.",
          ),
          L(
            "Lleva todo a un lado y factoriza el numerador: queda un cociente con cortes en $x = 2$, $x = \\dfrac{11}{4}$ (excluido: anula el denominador) y $x = 4$; termina con la tabla de signos.",
            "Move everything to one side and factor the numerator: you get a quotient with cuts at $x = 2$, $x = \\dfrac{11}{4}$ (excluded: it zeroes the denominator) and $x = 4$; finish with the sign table.",
          ),
        ],
        answerDisplay: L(
          "$A = \\left[2, \\dfrac{11}{4}\\right) \\cup [4, +\\infty)$",
          "$A = \\left[2, \\dfrac{11}{4}\\right) \\cup [4, +\\infty)$",
        ),
        solution: [
          step(
            "given",
            "$\\log_{1/2}\\left(\\dfrac{2x^{2} - 4x - 6}{4x - 11}\\right) \\leq -1$, $x \\in \\mathbb{R}$.",
            "$\\log_{1/2}\\left(\\dfrac{2x^{2} - 4x - 6}{4x - 11}\\right) \\leq -1$, $x \\in \\mathbb{R}$.",
          ),
          step(
            "approach",
            "Con base $\\dfrac{1}{2} \\in (0,1)$, convertir el logaritmo en una inecuación racional (invirtiendo la desigualdad) y resolverla con una tabla de signos; el argumento positivo queda garantizado de paso.",
            "With base $\\dfrac{1}{2} \\in (0,1)$, convert the logarithm into a rational inequality (flipping the inequality sign) and solve it with a sign table; a positive argument is guaranteed along the way.",
          ),
          step(
            "calculation",
            "$\\dfrac{2x^{2} - 4x - 6}{4x - 11} \\geq 2 \\Rightarrow \\dfrac{2x^{2} - 4x - 6 - 2(4x - 11)}{4x - 11} \\geq 0 \\Rightarrow \\dfrac{2x^{2} - 12x + 16}{4x - 11} \\geq 0 \\Rightarrow \\dfrac{2(x - 2)(x - 4)}{4x - 11} \\geq 0$.<br>Cortes: $x = 2$, $x = \\dfrac{11}{4}$ (excluido) y $x = 4$.<br>Tabla de signos: $x < 2$: $(+)/(-) < 0$ ✗; $2 \\leq x < \\dfrac{11}{4}$: $(-)/(-) > 0$ ✓; $\\dfrac{11}{4} < x < 4$: $(-)/(+) < 0$ ✗; $x \\geq 4$: $(+)/(+) > 0$ ✓.",
            "$\\dfrac{2x^{2} - 4x - 6}{4x - 11} \\geq 2 \\Rightarrow \\dfrac{2x^{2} - 4x - 6 - 2(4x - 11)}{4x - 11} \\geq 0 \\Rightarrow \\dfrac{2x^{2} - 12x + 16}{4x - 11} \\geq 0 \\Rightarrow \\dfrac{2(x - 2)(x - 4)}{4x - 11} \\geq 0$.<br>Cuts: $x = 2$, $x = \\dfrac{11}{4}$ (excluded) and $x = 4$.<br>Sign table: $x < 2$: $(+)/(-) < 0$ ✗; $2 \\leq x < \\dfrac{11}{4}$: $(-)/(-) > 0$ ✓; $\\dfrac{11}{4} < x < 4$: $(-)/(+) < 0$ ✗; $x \\geq 4$: $(+)/(+) > 0$ ✓.",
          ),
          step(
            "result",
            "$A = \\left[2, \\dfrac{11}{4}\\right) \\cup [4, +\\infty)$. Verificación: $x = 2{,}5$: argumento $= 3{,}5 \\geq 2$ y $\\log_{1/2}(3{,}5) \\approx -1{,}81 \\leq -1$ ✓; $x = 3$: argumento $= 0$, logaritmo indefinido — correctamente excluido ✗; $x = 5$: argumento $= \\dfrac{24}{9} \\approx 2{,}67 \\geq 2$ ✓.",
            "$A = \\left[2, \\dfrac{11}{4}\\right) \\cup [4, +\\infty)$. Check: $x = 2.5$: argument $= 3.5 \\geq 2$ and $\\log_{1/2}(3.5) \\approx -1.81 \\leq -1$ ✓; $x = 3$: argument $= 0$, logarithm undefined — correctly excluded ✗; $x = 5$: argument $= \\dfrac{24}{9} \\approx 2.67 \\geq 2$ ✓.",
          ),
        ],
      };
    },
  ),

  /* 137d — log_{x−2}(2x−3) ≥ log_{x−2}(24−6x) → (2,3)∪[27/8,4) (option a here).
     Printed key (book letter): d) — same solution set. */
  template(
    {
      id: "log-espol-ch3-137d",
      subject: "math",
      topicId: "logarithmic",
      subtopicId: "equations",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 360,
      tags: ["log-inequality", "variable-base", "case-analysis"],
      prerequisites: ["equations", "properties"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "3 · 137d",
        page: 396,
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L("$(2, 3) \\cup \\left[\\dfrac{27}{8}, 4\\right)$", "$(2, 3) \\cup \\left[\\dfrac{27}{8}, 4\\right)$"), correct: true },
        { id: "b", text: L("$(2, \\dfrac{27}{8}] \\cup (3, 4)$", "$(2, \\dfrac{27}{8}] \\cup (3, 4)$"), correct: false },
        { id: "c", text: L("$(2, 4)$", "$(2, 4)$"), correct: false },
        { id: "d", text: L("$\\left[\\dfrac{27}{8}, 4\\right)$", "$\\left[\\dfrac{27}{8}, 4\\right)$"), correct: false },
        { id: "e", text: L("$\\left(3, \\dfrac{27}{8}\\right]$", "$\\left(3, \\dfrac{27}{8}\\right]$"), correct: false },
      ];
      return {
        skill: L("Inecuación logarítmica con base variable: casos base en $(0,1)$ y base mayor que $1$", "Logarithmic inequality with a variable base: the base-in-$(0,1)$ and base-greater-than-$1$ cases"),
        statement: L(
          "Determina el conjunto de verdad de la inecuación $\\log_{x-2}(2x - 3) \\geq \\log_{x-2}(24 - 6x)$, con $x \\in \\mathbb{R}$ (la base es $x - 2$).",
          "Determine the truth set of the inequality $\\log_{x-2}(2x - 3) \\geq \\log_{x-2}(24 - 6x)$, with $x \\in \\mathbb{R}$ (the base is $x - 2$).",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Primero las condiciones de existencia: base $x - 2 > 0$ con $x - 2 \\neq 1$, y argumentos $2x - 3 > 0$ y $24 - 6x > 0$.",
            "First the existence conditions: base $x - 2 > 0$ with $x - 2 \\neq 1$, and arguments $2x - 3 > 0$ and $24 - 6x > 0$.",
          ),
          L(
            "El punto que parte los casos es $x = 3$: para $2 < x < 3$ la base está en $(0,1)$ y la desigualdad se **invierte** al quitar logaritmos; para $x > 3$ la base es mayor que $1$ y se mantiene.",
            "The case-splitting point is $x = 3$: for $2 < x < 3$ the base lies in $(0,1)$ and the inequality **flips** when the logarithms are removed; for $x > 3$ the base is greater than $1$ and it keeps its direction.",
          ),
          L(
            "En cada caso compara los argumentos ($8x \\leq 27$ o $8x \\geq 27$) y conserva solo la parte del resultado que cae dentro del intervalo del caso.",
            "In each case compare the arguments ($8x \\leq 27$ or $8x \\geq 27$) and keep only the part of the result that falls inside the case's interval.",
          ),
        ],
        answerDisplay: L(
          "$A = (2, 3) \\cup \\left[\\dfrac{27}{8}, 4\\right)$",
          "$A = (2, 3) \\cup \\left[\\dfrac{27}{8}, 4\\right)$",
        ),
        solution: [
          step(
            "given",
            "$\\log_{x-2}(2x - 3) \\geq \\log_{x-2}(24 - 6x)$; la base es $b = x - 2$, variable.",
            "$\\log_{x-2}(2x - 3) \\geq \\log_{x-2}(24 - 6x)$; the base is $b = x - 2$, a variable.",
          ),
          step(
            "approach",
            "Asegurar las condiciones de existencia de base y argumentos, y después separar en dos casos según la base esté en $(0,1)$ o sea mayor que $1$: solo en el segundo se conserva el sentido de la desigualdad.",
            "Secure the existence conditions for base and arguments, then split into two cases depending on whether the base lies in $(0,1)$ or is greater than $1$: only in the second does the inequality keep its direction.",
          ),
          step(
            "calculation",
            "Existencia: $x > 2$ con $x \\neq 3$; $2x - 3 > 0$ (ya cierto para $x > 2$) y $24 - 6x > 0 \\Rightarrow x < 4$. Luego $x \\in (2, 3) \\cup (3, 4)$.<br>Caso $2 < x < 3$ (base en $(0,1)$, se invierte): $2x - 3 \\leq 24 - 6x \\Rightarrow 8x \\leq 27$, cierto en todo $(2, 3)$ ✓.<br>Caso $3 < x < 4$ (base mayor que $1$, se conserva): $2x - 3 \\geq 24 - 6x \\Rightarrow x \\geq \\dfrac{27}{8}$, que dentro del caso da $x \\in \\left[\\dfrac{27}{8}, 4\\right)$ ✓.",
            "Existence: $x > 2$ with $x \\neq 3$; $2x - 3 > 0$ (already true for $x > 2$) and $24 - 6x > 0 \\Rightarrow x < 4$. Hence $x \\in (2, 3) \\cup (3, 4)$.<br>Case $2 < x < 3$ (base in $(0,1)$, flips): $2x - 3 \\leq 24 - 6x \\Rightarrow 8x \\leq 27$, true on all of $(2, 3)$ ✓.<br>Case $3 < x < 4$ (base greater than $1$, keeps direction): $2x - 3 \\geq 24 - 6x \\Rightarrow x \\geq \\dfrac{27}{8}$, which inside the case gives $x \\in \\left[\\dfrac{27}{8}, 4\\right)$ ✓.",
          ),
          step(
            "result",
            "$A = (2, 3) \\cup \\left[\\dfrac{27}{8}, 4\\right)$. Verificación: $x = 2{,}5$ (base $\\tfrac{1}{2}$): $\\log_{1/2} 2 = -1 \\geq \\log_{1/2} 9 \\approx -3{,}17$ ✓; $x = 3{,}1$ (base $1{,}1$): $\\log_{1{,}1} 3{,}2 \\approx 12{,}2 < \\log_{1{,}1} 5{,}4 \\approx 17{,}7$ — no cumple, y en efecto $3{,}1 < \\tfrac{27}{8} = 3{,}375$ queda fuera ✗; $x = 3{,}5$ (base $1{,}5$): $\\log_{1{,}5} 4 \\approx 3{,}42 \\geq \\log_{1{,}5} 3 \\approx 2{,}71$ ✓.",
            "$A = (2, 3) \\cup \\left[\\dfrac{27}{8}, 4\\right)$. Check: $x = 2.5$ (base $\\tfrac{1}{2}$): $\\log_{1/2} 2 = -1 \\geq \\log_{1/2} 9 \\approx -3.17$ ✓; $x = 3.1$ (base $1.1$): $\\log_{1.1} 3.2 \\approx 12.2 < \\log_{1.1} 5.4 \\approx 17.7$ — it fails, and indeed $3.1 < \\tfrac{27}{8} = 3.375$ lies outside ✗; $x = 3.5$ (base $1.5$): $\\log_{1.5} 4 \\approx 3.42 \\geq \\log_{1.5} 3 \\approx 2.71$ ✓.",
          ),
        ],
      };
    },
  ),
];
