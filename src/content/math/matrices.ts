/**
 * MATH · Matrices & Determinants
 *
 * Matrix operations, determinants, inverses and matrix equations.
 * First batch: ESPOL digital edition, Chapter 5 §5.1 (tutor's brief
 * «prosigue con matrices y sistemas», 2026-10-05).
 */

import { template, L, step } from "@/lib/problem";
import type { ProblemTemplate, McOption } from "@/lib/types";

export const templates: ProblemTemplate[] = [
  /* ---------------------------------------------------------------- */
  /* Cap. 5 §5.1 «Matrices y operaciones» (ed. digital), pp. 539-541.  */
  /* Matrices re-leídas visualmente (la capa de texto del PDF las     */
  /* extrae en orden de columnas). Clave impresa (pp. 941-942) +      */
  /* sympy: download/verify_espol_ch5.py.                              */
  /* ---------------------------------------------------------------- */

  /* 5 · 1 — verdadero/falso con contraejemplo 2×2 (clave impresa: Falso). */
  template(
    {
      id: "mat-espol-ch5-01",
      subject: "math",
      topicId: "matrices",
      subtopicId: "operations",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 150,
      tags: ["matrices", "square-identity", "counterexample"],
      prerequisites: ["operations"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 1",
        page: 539,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            `Falso, porque en general $AB \\ne BA$`,
            `False, because in general $AB \\ne BA$`,
          ),
          correct: true,
        },
        { id: "b", text: L(`Verdadero`, `True`), correct: false },
        {
          id: "c",
          text: L(
            `Falso, porque $(A+B)^{2}$ no existe`,
            `False, because $(A+B)^{2}$ does not exist`,
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            `Verdadero, siempre que $A$ sea inversible`,
            `True, as long as $A$ is invertible`,
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Propiedades de las operaciones con matrices",
          "Properties of matrix operations",
        ),
        statement: L(
          "Si $A$ y $B$ son dos matrices cuadradas cualesquiera, entonces $(A+B)^{2} = A^{2} + B^{2} + 2AB$. ¿Es verdadera o falsa la afirmación?",
          "If $A$ and $B$ are any two square matrices, then $(A+B)^{2} = A^{2} + B^{2} + 2AB$. Is the statement true or false?",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Desarrolla $(A+B)^{2}$ con cuidado: $(A+B)(A+B) = A^{2} + AB + BA + B^{2}$, y $AB$ y $BA$ no se pueden «juntar».",
            "Expand $(A+B)^{2}$ carefully: $(A+B)(A+B) = A^{2} + AB + BA + B^{2}$, and $AB$ and $BA$ cannot be «merged».",
          ),
          L(
            "La igualdad con $A^{2} + B^{2} + 2AB$ exige que $AB = BA$, y el producto de matrices no es conmutativo en general.",
            "Matching $A^{2} + B^{2} + 2AB$ requires $AB = BA$, and matrix multiplication is not commutative in general.",
          ),
          L(
            "Prueba con matrices concretas de $2 \\times 2$, por ejemplo $A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$ y $B = \\begin{pmatrix} 2 & 0 \\\\ 1 & 1 \\end{pmatrix}$, y compara ambas expresiones.",
            "Test concrete $2 \\times 2$ matrices, e.g. $A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$ and $B = \\begin{pmatrix} 2 & 0 \\\\ 1 & 1 \\end{pmatrix}$, and compare both expressions.",
          ),
        ],
        answerDisplay: L(
          "Falso: lo correcto es $(A+B)^{2} = A^{2} + AB + BA + B^{2}$, que coincide con $A^{2} + B^{2} + 2AB$ solo si $AB = BA$.",
          "False: the correct identity is $(A+B)^{2} = A^{2} + AB + BA + B^{2}$, which matches $A^{2} + B^{2} + 2AB$ only if $AB = BA$.",
        ),
        solution: [
          step(
            "given",
            "La afirmación: para matrices cuadradas cualesquiera $A$ y $B$, $(A+B)^{2} = A^{2} + B^{2} + 2AB$.",
            "The claim: for any square matrices $A$ and $B$, $(A+B)^{2} = A^{2} + B^{2} + 2AB$.",
          ),
          step(
            "approach",
            "Al desarrollar $(A+B)^{2} = (A+B)(A+B)$ aparecen $AB$ y $BA$. Como el producto de matrices no es conmutativo, basta un contraejemplo concreto para refutar la afirmación.",
            "Expanding $(A+B)^{2} = (A+B)(A+B)$ produces $AB$ and $BA$. Since matrix multiplication is not commutative, one concrete counterexample suffices to refute the claim.",
          ),
          step(
            "calculation",
            `Con $A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$ y $B = \\begin{pmatrix} 2 & 0 \\\\ 1 & 1 \\end{pmatrix}$:<br>$(A+B)^{2} = \\begin{pmatrix} 17 & 16 \\\\ 32 & 33 \\end{pmatrix}$, mientras que $A^{2} + B^{2} + 2AB = \\begin{pmatrix} 19 & 14 \\\\ 38 & 31 \\end{pmatrix}$.<br>La diferencia es $(A+B)^{2} - (A^{2} + B^{2} + 2AB) = \\begin{pmatrix} -2 & 2 \\\\ -6 & 2 \\end{pmatrix} = BA - AB \\ne 0$.`,
            `With $A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$ and $B = \\begin{pmatrix} 2 & 0 \\\\ 1 & 1 \\end{pmatrix}$:<br>$(A+B)^{2} = \\begin{pmatrix} 17 & 16 \\\\ 32 & 33 \\end{pmatrix}$, whereas $A^{2} + B^{2} + 2AB = \\begin{pmatrix} 19 & 14 \\\\ 38 & 31 \\end{pmatrix}$.<br>The difference is $(A+B)^{2} - (A^{2} + B^{2} + 2AB) = \\begin{pmatrix} -2 & 2 \\\\ -6 & 2 \\end{pmatrix} = BA - AB \\ne 0$.`,
          ),
          step(
            "result",
            "La afirmación es **falsa** (clave del libro): lo correcto es $(A+B)^{2} = A^{2} + AB + BA + B^{2}$, igual a $A^{2} + B^{2} + 2AB$ solo cuando $AB = BA$. Comprobación con el contraejemplo: la entrada $(1,1)$ da $17 \\ne 19$ ✓.",
            "The statement is **false** (book's key): the correct identity is $(A+B)^{2} = A^{2} + AB + BA + B^{2}$, equal to $A^{2} + B^{2} + 2AB$ only when $AB = BA$. Check with the counterexample: the $(1,1)$ entry gives $17 \\ne 19$ ✓.",
          ),
        ],
      };
    },
  ),

  /* 5 · 3a — ley de formación a_ij = i + j − 2 (clave exacta). */
  template(
    {
      id: "mat-espol-ch5-03a",
      subject: "math",
      topicId: "matrices",
      subtopicId: "operations",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 180,
      tags: ["matrices", "formation-law"],
      prerequisites: ["operations"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 3a",
        page: 539,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            `$\\begin{pmatrix} 0 & 1 \\\\ 1 & 2 \\end{pmatrix}$`,
            `$\\begin{pmatrix} 0 & 1 \\\\ 1 & 2 \\end{pmatrix}$`,
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            `$\\begin{pmatrix} 1 & 2 \\\\ 2 & 3 \\end{pmatrix}$`,
            `$\\begin{pmatrix} 1 & 2 \\\\ 2 & 3 \\end{pmatrix}$`,
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            `$\\begin{pmatrix} 0 & 1 \\\\ 1 & 3 \\end{pmatrix}$`,
            `$\\begin{pmatrix} 0 & 1 \\\\ 1 & 3 \\end{pmatrix}$`,
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            `$\\begin{pmatrix} 2 & 1 \\\\ 1 & 0 \\end{pmatrix}$`,
            `$\\begin{pmatrix} 2 & 1 \\\\ 1 & 0 \\end{pmatrix}$`,
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Construir una matriz desde su ley de formación",
          "Building a matrix from its formation law",
        ),
        statement: L(
          "Determine la matriz $A_{2 \\times 2} = (a_{ij})$ para la cual $a_{ij} = i + j - 2$.",
          "Determine the matrix $A_{2 \\times 2} = (a_{ij})$ for which $a_{ij} = i + j - 2$.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "El subíndice $i$ indica la fila y $j$ la columna: evalúa la ley $a_{ij} = i + j - 2$ en cada una de las cuatro posiciones.",
            "The subscript $i$ marks the row and $j$ the column: evaluate the law $a_{ij} = i + j - 2$ at each of the four positions.",
          ),
          L(
            "Empieza por la esquina $a_{11}$: ahí la ley queda $1 + 1 - 2$. Sigue con la primera fila completa.",
            "Start at the corner $a_{11}$: there the law reads $1 + 1 - 2$. Continue with the rest of the first row.",
          ),
          L(
            "Termina con la fila 2 y revisa la diagonal principal: las entradas $a_{11}$ y $a_{22}$ que calculaste deben aparecer en las opciones.",
            "Finish with row 2 and check the main diagonal: the $a_{11}$ and $a_{22}$ entries you computed must appear among the options.",
          ),
        ],
        answerDisplay: L(
          `$A = \\begin{pmatrix} 0 & 1 \\\\ 1 & 2 \\end{pmatrix}$`,
          `$A = \\begin{pmatrix} 0 & 1 \\\\ 1 & 2 \\end{pmatrix}$`,
        ),
        solution: [
          step(
            "given",
            "Se pide $A_{2 \\times 2} = (a_{ij})$ con la ley de formación $a_{ij} = i + j - 2$.",
            "We need $A_{2 \\times 2} = (a_{ij})$ with the formation law $a_{ij} = i + j - 2$.",
          ),
          step(
            "approach",
            "Evaluamos la ley posición por posición: $i$ recorre las filas $1, 2$ y $j$ las columnas $1, 2$.",
            "We evaluate the law position by position: $i$ runs over rows $1, 2$ and $j$ over columns $1, 2$.",
          ),
          step(
            "calculation",
            "$a_{11} = 1 + 1 - 2 = 0$<br>$a_{12} = 1 + 2 - 2 = 1$<br>$a_{21} = 2 + 1 - 2 = 1$<br>$a_{22} = 2 + 2 - 2 = 2$",
            "$a_{11} = 1 + 1 - 2 = 0$<br>$a_{12} = 1 + 2 - 2 = 1$<br>$a_{21} = 2 + 1 - 2 = 1$<br>$a_{22} = 2 + 2 - 2 = 2$",
          ),
          step(
            "result",
            `$A = \\begin{pmatrix} 0 & 1 \\\\ 1 & 2 \\end{pmatrix}$ (clave del libro, exacta). Comprobación: $a_{22} = 2 + 2 - 2 = 2$ ✓, y como la ley no distingue $i$ de $j$, la matriz resulta simétrica ✓.`,
            `$A = \\begin{pmatrix} 0 & 1 \\\\ 1 & 2 \\end{pmatrix}$ (book's key, exact). Check: $a_{22} = 2 + 2 - 2 = 2$ ✓, and since the law does not distinguish $i$ from $j$, the matrix is symmetric ✓.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 3b-c — ¿B diagonal? ¿C = A + B identidad? (clave: Sí / No). */
  template(
    {
      id: "mat-espol-ch5-03bc",
      subject: "math",
      topicId: "matrices",
      subtopicId: "operations",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 180,
      tags: ["matrices", "diagonal", "identity-matrix"],
      prerequisites: ["operations"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 3b-c",
        page: 539,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            `$B$ es diagonal y $C$ no es la matriz identidad`,
            `$B$ is diagonal and $C$ is not the identity matrix`,
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            `$B$ es diagonal y $C$ es la matriz identidad`,
            `$B$ is diagonal and $C$ is the identity matrix`,
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            `$B$ no es diagonal y $C$ es la matriz identidad`,
            `$B$ is not diagonal and $C$ is the identity matrix`,
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            `$B$ no es diagonal y $C$ no es la matriz identidad`,
            `$B$ is not diagonal and $C$ is not the identity matrix`,
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Matrices diagonales y matriz identidad",
          "Diagonal matrices and the identity matrix",
        ),
        statement: L(
          `Sea $B = \\begin{pmatrix} 0 & 0 \\\\ 0 & -2 \\end{pmatrix}$ y sea $C = A + B$, donde $A = \\begin{pmatrix} 0 & 1 \\\\ 1 & 2 \\end{pmatrix}$ es la matriz del ejercicio anterior. ¿Cuál de las siguientes afirmaciones es verdadera?`,
          `Let $B = \\begin{pmatrix} 0 & 0 \\\\ 0 & -2 \\end{pmatrix}$ and let $C = A + B$, where $A = \\begin{pmatrix} 0 & 1 \\\\ 1 & 2 \\end{pmatrix}$ is the matrix from the previous exercise. Which of the following statements is true?`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Una matriz es diagonal si todas sus entradas fuera de la diagonal principal son cero; las entradas diagonales pueden valer cualquier número (incluso 0).",
            "A matrix is diagonal if every entry off the main diagonal is zero; the diagonal entries may be any number (even 0).",
          ),
          L(
            "La suma de matrices es entrada a entrada: al sumar $B$, solo la posición $(2,2)$ de $A$ cambia.",
            "Matrix addition is entrywise: adding $B$ changes only the $(2,2)$ position of $A$.",
          ),
          L(
            "Compara tu $C$ con $I = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}$: las cuatro entradas deben coincidir para que sea la identidad.",
            "Compare your $C$ with $I = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}$: all four entries must match for it to be the identity.",
          ),
        ],
        answerDisplay: L(
          `$B$ es diagonal y $C = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}$ no es la identidad`,
          `$B$ is diagonal and $C = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}$ is not the identity`,
        ),
        solution: [
          step(
            "given",
            ` $B = \\begin{pmatrix} 0 & 0 \\\\ 0 & -2 \\end{pmatrix}$, $A = \\begin{pmatrix} 0 & 1 \\\\ 1 & 2 \\end{pmatrix}$ y $C = A + B$.`,
            ` $B = \\begin{pmatrix} 0 & 0 \\\\ 0 & -2 \\end{pmatrix}$, $A = \\begin{pmatrix} 0 & 1 \\\\ 1 & 2 \\end{pmatrix}$ and $C = A + B$.`,
          ),
          step(
            "approach",
            "Aplicamos las dos definiciones: diagonal (ceros fuera de la diagonal principal) e identidad (unos en la diagonal y ceros fuera de ella).",
            "We apply the two definitions: diagonal (zeros off the main diagonal) and identity (ones on the diagonal and zeros elsewhere).",
          ),
          step(
            "calculation",
            `$B$ tiene $b_{12} = b_{21} = 0$, así que **es** diagonal (su diagonal es $0, -2$).<br>$C = A + B = \\begin{pmatrix} 0+0 & 1+0 \\\\ 1+0 & 2-2 \\end{pmatrix} = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}$.`,
            `$B$ has $b_{12} = b_{21} = 0$, so it **is** diagonal (its diagonal is $0, -2$).<br>$C = A + B = \\begin{pmatrix} 0+0 & 1+0 \\\\ 1+0 & 2-2 \\end{pmatrix} = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}$.`,
          ),
          step(
            "result",
            `La afirmación verdadera es la primera: $B$ es diagonal y $C$ no es la identidad. Comprobación: $c_{11} = 0 \\ne 1$ (la identidad exige un $1$ ahí) ✓, y $c_{22} = 0 \\ne 1$ ✓.`,
            `The true statement is the first one: $B$ is diagonal and $C$ is not the identity. Check: $c_{11} = 0 \\ne 1$ (the identity requires a $1$ there) ✓, and $c_{22} = 0 \\ne 1$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 3d(i) — D (3×2) por ley de formación; producto DA (clave exacta). */
  template(
    {
      id: "mat-espol-ch5-03d-DA",
      subject: "math",
      topicId: "matrices",
      subtopicId: "operations",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["matrices", "formation-law", "matrix-product"],
      prerequisites: ["operations"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 3d(i)",
        page: 539,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            `$\\begin{pmatrix} 4 & 9 \\\\ 6 & 15 \\\\ 8 & 21 \\end{pmatrix}$`,
            `$\\begin{pmatrix} 4 & 9 \\\\ 6 & 15 \\\\ 8 & 21 \\end{pmatrix}$`,
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            `$\\begin{pmatrix} 4 & 6 & 8 \\\\ 9 & 15 & 21 \\end{pmatrix}$`,
            `$\\begin{pmatrix} 4 & 6 & 8 \\\\ 9 & 15 & 21 \\end{pmatrix}$`,
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            `$\\begin{pmatrix} 1 & 4 \\\\ 3 & 6 \\\\ 5 & 8 \\end{pmatrix}$`,
            `$\\begin{pmatrix} 1 & 4 \\\\ 3 & 6 \\\\ 5 & 8 \\end{pmatrix}$`,
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            `$\\begin{pmatrix} 4 & 9 \\\\ 15 & 6 \\\\ 8 & 21 \\end{pmatrix}$`,
            `$\\begin{pmatrix} 4 & 9 \\\\ 15 & 6 \\\\ 8 & 21 \\end{pmatrix}$`,
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Producto de matrices con ley de formación",
          "Matrix product with a formation law",
        ),
        statement: L(
          `Sea la matriz $D_{3 \\times 2} = (d_{ij})$ para la cual $d_{ij} = 2i + 3j - 4$, y sea $A = \\begin{pmatrix} 0 & 1 \\\\ 1 & 2 \\end{pmatrix}$ (la del ejercicio 3a). Calcule $DA$.`,
          `Let $D_{3 \\times 2} = (d_{ij})$ be the matrix for which $d_{ij} = 2i + 3j - 4$, and let $A = \\begin{pmatrix} 0 & 1 \\\\ 1 & 2 \\end{pmatrix}$ (from exercise 3a). Compute $DA$.`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Construye primero $D$ evaluando $d_{ij} = 2i + 3j - 4$ en las seis posiciones; por ejemplo $d_{11} = 2 + 3 - 4$.",
            "Build $D$ first by evaluating $d_{ij} = 2i + 3j - 4$ at the six positions; for instance $d_{11} = 2 + 3 - 4$.",
          ),
          L(
            "El producto está bien definido: $D$ es $3 \\times 2$ y $A$ es $2 \\times 2$, así que $DA$ es $3 \\times 2$.",
            "The product is well defined: $D$ is $3 \\times 2$ and $A$ is $2 \\times 2$, so $DA$ is $3 \\times 2$.",
          ),
          L(
            "Cada entrada de $DA$ es una fila de $D$ por una columna de $A$: la primera fila de $DA$ sale de multiplicar $(d_{11},\\ d_{12})$ por cada columna de $A$.",
            "Each entry of $DA$ is a row of $D$ times a column of $A$: the first row of $DA$ comes from multiplying $(d_{11},\\ d_{12})$ by each column of $A$.",
          ),
        ],
        answerDisplay: L(
          `$DA = \\begin{pmatrix} 4 & 9 \\\\ 6 & 15 \\\\ 8 & 21 \\end{pmatrix}$`,
          `$DA = \\begin{pmatrix} 4 & 9 \\\\ 6 & 15 \\\\ 8 & 21 \\end{pmatrix}$`,
        ),
        solution: [
          step(
            "given",
            "$D_{3 \\times 2} = (d_{ij})$ con $d_{ij} = 2i + 3j - 4$ y $A = \\begin{pmatrix} 0 & 1 \\\\ 1 & 2 \\end{pmatrix}$.",
            "$D_{3 \\times 2} = (d_{ij})$ with $d_{ij} = 2i + 3j - 4$ and $A = \\begin{pmatrix} 0 & 1 \\\\ 1 & 2 \\end{pmatrix}$.",
          ),
          step(
            "approach",
            "Primero construimos $D$ con su ley de formación y luego multiplicamos: cada entrada de $DA$ es el producto de una fila de $D$ por una columna de $A$.",
            "We first build $D$ from its formation law and then multiply: each entry of $DA$ is a row of $D$ times a column of $A$.",
          ),
          step(
            "calculation",
            `$D = \\begin{pmatrix} 1 & 4 \\\\ 3 & 6 \\\\ 5 & 8 \\end{pmatrix}$ (con $d_{11} = 1$, $d_{12} = 4$, $d_{21} = 3$, $d_{22} = 6$, $d_{31} = 5$, $d_{32} = 8$)<br>$DA = \\begin{pmatrix} 1 & 4 \\\\ 3 & 6 \\\\ 5 & 8 \\end{pmatrix}\\begin{pmatrix} 0 & 1 \\\\ 1 & 2 \\end{pmatrix} = \\begin{pmatrix} 0+4 & 1+8 \\\\ 0+6 & 3+12 \\\\ 0+8 & 5+16 \\end{pmatrix} = \\begin{pmatrix} 4 & 9 \\\\ 6 & 15 \\\\ 8 & 21 \\end{pmatrix}$`,
            `$D = \\begin{pmatrix} 1 & 4 \\\\ 3 & 6 \\\\ 5 & 8 \\end{pmatrix}$ (with $d_{11} = 1$, $d_{12} = 4$, $d_{21} = 3$, $d_{22} = 6$, $d_{31} = 5$, $d_{32} = 8$)<br>$DA = \\begin{pmatrix} 1 & 4 \\\\ 3 & 6 \\\\ 5 & 8 \\end{pmatrix}\\begin{pmatrix} 0 & 1 \\\\ 1 & 2 \\end{pmatrix} = \\begin{pmatrix} 0+4 & 1+8 \\\\ 0+6 & 3+12 \\\\ 0+8 & 5+16 \\end{pmatrix} = \\begin{pmatrix} 4 & 9 \\\\ 6 & 15 \\\\ 8 & 21 \\end{pmatrix}$`,
          ),
          step(
            "result",
            `$DA = \\begin{pmatrix} 4 & 9 \\\\ 6 & 15 \\\\ 8 & 21 \\end{pmatrix}$ (clave del libro, exacta). Comprobación, entrada $(1,1)$: $1 \\cdot 0 + 4 \\cdot 1 = 4$ ✓, y el tamaño $3 \\times 2$ es el esperado para $D_{3 \\times 2} \\cdot A_{2 \\times 2}$ ✓.`,
            `$DA = \\begin{pmatrix} 4 & 9 \\\\ 6 & 15 \\\\ 8 & 21 \\end{pmatrix}$ (book's key, exact). Check, entry $(1,1)$: $1 \\cdot 0 + 4 \\cdot 1 = 4$ ✓, and the $3 \\times 2$ size is what $D_{3 \\times 2} \\cdot A_{2 \\times 2}$ should give ✓.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 3d(ii) — producto DB; B diagonal escala columnas (clave exacta). */
  template(
    {
      id: "mat-espol-ch5-03d-DB",
      subject: "math",
      topicId: "matrices",
      subtopicId: "operations",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["matrices", "matrix-product", "diagonal"],
      prerequisites: ["operations"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 3d(ii)",
        page: 539,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            `$\\begin{pmatrix} 0 & -8 \\\\ 0 & -12 \\\\ 0 & -16 \\end{pmatrix}$`,
            `$\\begin{pmatrix} 0 & -8 \\\\ 0 & -12 \\\\ 0 & -16 \\end{pmatrix}$`,
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            `$\\begin{pmatrix} 0 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\end{pmatrix}$`,
            `$\\begin{pmatrix} 0 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\end{pmatrix}$`,
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            `$\\begin{pmatrix} 0 & -8 \\\\ 0 & -12 \\\\ 0 & 8 \\end{pmatrix}$`,
            `$\\begin{pmatrix} 0 & -8 \\\\ 0 & -12 \\\\ 0 & 8 \\end{pmatrix}$`,
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            `$\\begin{pmatrix} -2 & -8 \\\\ -6 & -12 \\\\ -10 & -16 \\end{pmatrix}$`,
            `$\\begin{pmatrix} -2 & -8 \\\\ -6 & -12 \\\\ -10 & -16 \\end{pmatrix}$`,
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Producto por una matriz diagonal",
          "Product with a diagonal matrix",
        ),
        statement: L(
          `Sea $D_{3 \\times 2} = (d_{ij})$ con $d_{ij} = 2i + 3j - 4$ (la del inciso anterior) y sea $B = \\begin{pmatrix} 0 & 0 \\\\ 0 & -2 \\end{pmatrix}$. Calcule $DB$.`,
          `Let $D_{3 \\times 2} = (d_{ij})$ with $d_{ij} = 2i + 3j - 4$ (from the previous item) and let $B = \\begin{pmatrix} 0 & 0 \\\\ 0 & -2 \\end{pmatrix}$. Compute $DB$.`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            `La ley da $D = \\begin{pmatrix} 1 & 4 \\\\ 3 & 6 \\\\ 5 & 8 \\end{pmatrix}$; multiplica esa matriz por las columnas de $B$.`,
            `The law gives $D = \\begin{pmatrix} 1 & 4 \\\\ 3 & 6 \\\\ 5 & 8 \\end{pmatrix}$; multiply that matrix by the columns of $B$.`,
          ),
          L(
            "La primera columna de $B$ es nula: deduce qué le ocurre a la primera columna de $DB$.",
            "The first column of $B$ is zero: deduce what happens to the first column of $DB$.",
          ),
          L(
            "Multiplicar por la diagonal $B$ escala las columnas de $D$: piensa qué operación sobre la segunda columna de $D$ produce la segunda columna de $DB$.",
            "Multiplying by the diagonal $B$ rescales the columns of $D$: think about which operation on the second column of $D$ yields the second column of $DB$.",
          ),
        ],
        answerDisplay: L(
          `$DB = \\begin{pmatrix} 0 & -8 \\\\ 0 & -12 \\\\ 0 & -16 \\end{pmatrix}$`,
          `$DB = \\begin{pmatrix} 0 & -8 \\\\ 0 & -12 \\\\ 0 & -16 \\end{pmatrix}$`,
        ),
        solution: [
          step(
            "given",
            `$D = \\begin{pmatrix} 1 & 4 \\\\ 3 & 6 \\\\ 5 & 8 \\end{pmatrix}$ y $B = \\begin{pmatrix} 0 & 0 \\\\ 0 & -2 \\end{pmatrix}$.`,
            `$D = \\begin{pmatrix} 1 & 4 \\\\ 3 & 6 \\\\ 5 & 8 \\end{pmatrix}$ and $B = \\begin{pmatrix} 0 & 0 \\\\ 0 & -2 \\end{pmatrix}$.`,
          ),
          step(
            "approach",
            "Multiplicamos por columnas: la columna $j$ de $DB$ es $D$ por la columna $j$ de $B$. Como $B$ es diagonal, su efecto es escalar las columnas de $D$.",
            "We multiply column by column: column $j$ of $DB$ is $D$ times column $j$ of $B$. Since $B$ is diagonal, its effect is to rescale the columns of $D$.",
          ),
          step(
            "calculation",
            `Columna 1: $D\\begin{pmatrix} 0 \\\\ 0 \\end{pmatrix} = \\begin{pmatrix} 0 \\\\ 0 \\\\ 0 \\end{pmatrix}$<br>Columna 2: $D\\begin{pmatrix} 0 \\\\ -2 \\end{pmatrix} = -2\\begin{pmatrix} 4 \\\\ 6 \\\\ 8 \\end{pmatrix} = \\begin{pmatrix} -8 \\\\ -12 \\\\ -16 \\end{pmatrix}$<br>Por lo tanto $DB = \\begin{pmatrix} 0 & -8 \\\\ 0 & -12 \\\\ 0 & -16 \\end{pmatrix}$.`,
            `Column 1: $D\\begin{pmatrix} 0 \\\\ 0 \\end{pmatrix} = \\begin{pmatrix} 0 \\\\ 0 \\\\ 0 \\end{pmatrix}$<br>Column 2: $D\\begin{pmatrix} 0 \\\\ -2 \\end{pmatrix} = -2\\begin{pmatrix} 4 \\\\ 6 \\\\ 8 \\end{pmatrix} = \\begin{pmatrix} -8 \\\\ -12 \\\\ -16 \\end{pmatrix}$<br>Therefore $DB = \\begin{pmatrix} 0 & -8 \\\\ 0 & -12 \\\\ 0 & -16 \\end{pmatrix}$.`,
          ),
          step(
            "result",
            `$DB = \\begin{pmatrix} 0 & -8 \\\\ 0 & -12 \\\\ 0 & -16 \\end{pmatrix}$ (clave del libro, exacta). Comprobación, entrada $(3,2)$: $5 \\cdot 0 + 8 \\cdot (-2) = -16$ ✓. Nota: $DB \\ne -2D$; multiplicar por la diagonal solo escala las columnas de $D$, no toda la matriz.`,
            `$DB = \\begin{pmatrix} 0 & -8 \\\\ 0 & -12 \\\\ 0 & -16 \\end{pmatrix}$ (book's key, exact). Check, entry $(3,2)$: $5 \\cdot 0 + 8 \\cdot (-2) = -16$ ✓. Note: $DB \\ne -2D$; multiplying by the diagonal only rescales the columns of $D$, not the whole matrix.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 4 — ley por casos 3×4 con diagonal nula (clave exacta). */
  template(
    {
      id: "mat-espol-ch5-04",
      subject: "math",
      topicId: "matrices",
      subtopicId: "operations",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 270,
      tags: ["matrices", "formation-law", "piecewise"],
      prerequisites: ["operations"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 4",
        page: 539,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            `$\\begin{pmatrix} 0 & 3 & 4 & 5 \\\\ 3 & 0 & 5 & 6 \\\\ 4 & 5 & 0 & 7 \\end{pmatrix}$`,
            `$\\begin{pmatrix} 0 & 3 & 4 & 5 \\\\ 3 & 0 & 5 & 6 \\\\ 4 & 5 & 0 & 7 \\end{pmatrix}$`,
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            `$\\begin{pmatrix} 2 & 3 & 4 & 5 \\\\ 3 & 4 & 5 & 6 \\\\ 4 & 5 & 6 & 7 \\end{pmatrix}$`,
            `$\\begin{pmatrix} 2 & 3 & 4 & 5 \\\\ 3 & 4 & 5 & 6 \\\\ 4 & 5 & 6 & 7 \\end{pmatrix}$`,
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            `$\\begin{pmatrix} 0 & 3 & 4 & 5 \\\\ 3 & 0 & 5 & 6 \\\\ 4 & 5 & 6 & 0 \\end{pmatrix}$`,
            `$\\begin{pmatrix} 0 & 3 & 4 & 5 \\\\ 3 & 0 & 5 & 6 \\\\ 4 & 5 & 6 & 0 \\end{pmatrix}$`,
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            `$\\begin{pmatrix} 0 & 3 & 4 \\\\ 3 & 0 & 5 \\\\ 4 & 5 & 0 \\\\ 5 & 6 & 7 \\end{pmatrix}$`,
            `$\\begin{pmatrix} 0 & 3 & 4 \\\\ 3 & 0 & 5 \\\\ 4 & 5 & 0 \\\\ 5 & 6 & 7 \\end{pmatrix}$`,
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Ley de formación por casos",
          "Casewise formation law",
        ),
        statement: L(
          "Determine la matriz $A_{3 \\times 4} = (a_{ij})$ para la cual: $a_{ij} = i + j$ si $i \\ne j$; $0$ si $i = j$.",
          "Determine the matrix $A_{3 \\times 4} = (a_{ij})$ for which: $a_{ij} = i + j$ if $i \\ne j$; $0$ if $i = j$.",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "La ley tiene dos casos: fuera de la diagonal principal vale $i + j$; sobre la diagonal ($i = j$) vale $0$.",
            "The law has two cases: off the main diagonal it equals $i + j$; on the diagonal ($i = j$) it equals $0$.",
          ),
          L(
            "Cuidado con la forma: la matriz es $3 \\times 4$, así que la diagonal principal solo cubre $a_{11}$, $a_{22}$ y $a_{33}$ (no existe $a_{44}$).",
            "Watch the shape: the matrix is $3 \\times 4$, so the main diagonal covers only $a_{11}$, $a_{22}$ and $a_{33}$ (there is no $a_{44}$).",
          ),
          L(
            "Calcula una fila completa, por ejemplo la fila 3: $a_{31}$, $a_{32}$, $a_{33}$, $a_{34}$, y usa el caso $i = j$ donde corresponda.",
            "Compute one full row, e.g. row 3: $a_{31}$, $a_{32}$, $a_{33}$, $a_{34}$, applying the $i = j$ case where it applies.",
          ),
        ],
        answerDisplay: L(
          `$A = \\begin{pmatrix} 0 & 3 & 4 & 5 \\\\ 3 & 0 & 5 & 6 \\\\ 4 & 5 & 0 & 7 \\end{pmatrix}$`,
          `$A = \\begin{pmatrix} 0 & 3 & 4 & 5 \\\\ 3 & 0 & 5 & 6 \\\\ 4 & 5 & 0 & 7 \\end{pmatrix}$`,
        ),
        solution: [
          step(
            "given",
            "$A_{3 \\times 4} = (a_{ij})$ con $a_{ij} = i + j$ si $i \\ne j$ y $a_{ij} = 0$ si $i = j$.",
            "$A_{3 \\times 4} = (a_{ij})$ with $a_{ij} = i + j$ if $i \\ne j$ and $a_{ij} = 0$ if $i = j$.",
          ),
          step(
            "approach",
            "Recorremos las 12 posiciones aplicando el caso que corresponde: solo $(1,1)$, $(2,2)$ y $(3,3)$ están sobre la diagonal principal de una matriz $3 \\times 4$.",
            "We walk through the 12 positions applying the matching case: only $(1,1)$, $(2,2)$ and $(3,3)$ lie on the main diagonal of a $3 \\times 4$ matrix.",
          ),
          step(
            "calculation",
            "Fila 1: $a_{11} = 0$, $a_{12} = 1+2 = 3$, $a_{13} = 4$, $a_{14} = 5$<br>Fila 2: $a_{21} = 3$, $a_{22} = 0$, $a_{23} = 5$, $a_{24} = 6$<br>Fila 3: $a_{31} = 4$, $a_{32} = 5$, $a_{33} = 0$, $a_{34} = 7$",
            "Row 1: $a_{11} = 0$, $a_{12} = 1+2 = 3$, $a_{13} = 4$, $a_{14} = 5$<br>Row 2: $a_{21} = 3$, $a_{22} = 0$, $a_{23} = 5$, $a_{24} = 6$<br>Row 3: $a_{31} = 4$, $a_{32} = 5$, $a_{33} = 0$, $a_{34} = 7$",
          ),
          step(
            "result",
            `$A = \\begin{pmatrix} 0 & 3 & 4 & 5 \\\\ 3 & 0 & 5 & 6 \\\\ 4 & 5 & 0 & 7 \\end{pmatrix}$ (clave del libro, exacta). Comprobación: $a_{33} = 0$ por el caso $i = j$ ✓ y $a_{34} = 3 + 4 = 7$ por el caso $i \\ne j$ ✓.`,
            `$A = \\begin{pmatrix} 0 & 3 & 4 & 5 \\\\ 3 & 0 & 5 & 6 \\\\ 4 & 5 & 0 & 7 \\end{pmatrix}$ (book's key, exact). Check: $a_{33} = 0$ from the $i = j$ case ✓ and $a_{34} = 3 + 4 = 7$ from the $i \\ne j$ case ✓.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 5a — f(A, A^T) = A + A^T con f(x,y) = x + y (clave exacta). */
  template(
    {
      id: "mat-espol-ch5-05a",
      subject: "math",
      topicId: "matrices",
      subtopicId: "operations",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 270,
      tags: ["matrices", "transpose", "matrix-addition"],
      prerequisites: ["operations"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 5a",
        page: 539,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            `$\\begin{pmatrix} 6 & 4 & 5 \\\\ 4 & 2 & 0 \\\\ 5 & 0 & 8 \\end{pmatrix}$`,
            `$\\begin{pmatrix} 6 & 4 & 5 \\\\ 4 & 2 & 0 \\\\ 5 & 0 & 8 \\end{pmatrix}$`,
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            `$\\begin{pmatrix} 0 & 0 & -3 \\\\ 0 & 0 & 2 \\\\ 3 & -2 & 0 \\end{pmatrix}$`,
            `$\\begin{pmatrix} 0 & 0 & -3 \\\\ 0 & 0 & 2 \\\\ 3 & -2 & 0 \\end{pmatrix}$`,
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            `$\\begin{pmatrix} 6 & 4 & 2 \\\\ 4 & 2 & 2 \\\\ 8 & -2 & 8 \\end{pmatrix}$`,
            `$\\begin{pmatrix} 6 & 4 & 2 \\\\ 4 & 2 & 2 \\\\ 8 & -2 & 8 \\end{pmatrix}$`,
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            `$\\begin{pmatrix} 14 & 9 & 14 \\\\ 9 & 6 & 11 \\\\ 14 & 11 & 33 \\end{pmatrix}$`,
            `$\\begin{pmatrix} 14 & 9 & 14 \\\\ 9 & 6 & 11 \\\\ 14 & 11 & 33 \\end{pmatrix}$`,
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Función definida sobre matrices",
          "A function defined on matrices",
        ),
        statement: L(
          `Sea $f(x, y) = x + y$ para matrices $x, y \\in M_{3 \\times 3}$, y sea $A = \\begin{pmatrix} 3 & 2 & 1 \\\\ 2 & 1 & 1 \\\\ 4 & -1 & 4 \\end{pmatrix}$. Determine $f(A, A^{T})$.`,
          `Let $f(x, y) = x + y$ for matrices $x, y \\in M_{3 \\times 3}$, and let $A = \\begin{pmatrix} 3 & 2 & 1 \\\\ 2 & 1 & 1 \\\\ 4 & -1 & 4 \\end{pmatrix}$. Determine $f(A, A^{T})$.`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "La función $f$ actúa sobre matrices con la misma regla que sobre números: aquí $f(x, y) = x + y$ es la suma de matrices.",
            "The function $f$ acts on matrices with the same rule as on numbers: here $f(x, y) = x + y$ is matrix addition.",
          ),
          L(
            "Calcula $A^{T}$ intercambiando filas por columnas, y luego suma entrada a entrada (ambas son $3 \\times 3$).",
            "Compute $A^{T}$ by swapping rows and columns, then add entrywise (both are $3 \\times 3$).",
          ),
          L(
            "En la diagonal principal, $a_{ii} + a_{ii} = 2a_{ii}$: usa eso para revisar rápido tus entradas diagonales.",
            "On the main diagonal, $a_{ii} + a_{ii} = 2a_{ii}$: use that to quickly review your diagonal entries.",
          ),
        ],
        answerDisplay: L(
          `$f(A, A^{T}) = A + A^{T} = \\begin{pmatrix} 6 & 4 & 5 \\\\ 4 & 2 & 0 \\\\ 5 & 0 & 8 \\end{pmatrix}$`,
          `$f(A, A^{T}) = A + A^{T} = \\begin{pmatrix} 6 & 4 & 5 \\\\ 4 & 2 & 0 \\\\ 5 & 0 & 8 \\end{pmatrix}$`,
        ),
        solution: [
          step(
            "given",
            `$f(x, y) = x + y$ para matrices y $A = \\begin{pmatrix} 3 & 2 & 1 \\\\ 2 & 1 & 1 \\\\ 4 & -1 & 4 \\end{pmatrix}$.`,
            `$f(x, y) = x + y$ for matrices and $A = \\begin{pmatrix} 3 & 2 & 1 \\\\ 2 & 1 & 1 \\\\ 4 & -1 & 4 \\end{pmatrix}$.`,
          ),
          step(
            "approach",
            "Evaluamos $f$ en las matrices $A$ y $A^{T}$: como la regla es la suma, $f(A, A^{T}) = A + A^{T}$. La transpuesta conserva la diagonal, así que la diagonal del resultado duplica la de $A$.",
            "We evaluate $f$ at the matrices $A$ and $A^{T}$: since the rule is addition, $f(A, A^{T}) = A + A^{T}$. The transpose keeps the diagonal, so the result's diagonal doubles $A$'s.",
          ),
          step(
            "calculation",
            `$A^{T} = \\begin{pmatrix} 3 & 2 & 4 \\\\ 2 & 1 & -1 \\\\ 1 & 1 & 4 \\end{pmatrix}$<br>$A + A^{T} = \\begin{pmatrix} 3+3 & 2+2 & 1+4 \\\\ 2+2 & 1+1 & 1-1 \\\\ 4+1 & -1+1 & 4+4 \\end{pmatrix} = \\begin{pmatrix} 6 & 4 & 5 \\\\ 4 & 2 & 0 \\\\ 5 & 0 & 8 \\end{pmatrix}$`,
            `$A^{T} = \\begin{pmatrix} 3 & 2 & 4 \\\\ 2 & 1 & -1 \\\\ 1 & 1 & 4 \\end{pmatrix}$<br>$A + A^{T} = \\begin{pmatrix} 3+3 & 2+2 & 1+4 \\\\ 2+2 & 1+1 & 1-1 \\\\ 4+1 & -1+1 & 4+4 \\end{pmatrix} = \\begin{pmatrix} 6 & 4 & 5 \\\\ 4 & 2 & 0 \\\\ 5 & 0 & 8 \\end{pmatrix}$`,
          ),
          step(
            "result",
            `$f(A, A^{T}) = \\begin{pmatrix} 6 & 4 & 5 \\\\ 4 & 2 & 0 \\\\ 5 & 0 & 8 \\end{pmatrix}$ (clave del libro, exacta). Comprobación: la entrada $(2,3)$ es $1 + (-1) = 0$ ✓ y el resultado es simétrico, como corresponde a $A + A^{T}$ ✓.`,
            `$f(A, A^{T}) = \\begin{pmatrix} 6 & 4 & 5 \\\\ 4 & 2 & 0 \\\\ 5 & 0 & 8 \\end{pmatrix}$ (book's key, exact). Check: the $(2,3)$ entry is $1 + (-1) = 0$ ✓ and the result is symmetric, as $A + A^{T}$ must be ✓.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 8a — A³ − 3B² + 10I; A y B re-leídas visualmente (clave exacta). */
  template(
    {
      id: "mat-espol-ch5-08a",
      subject: "math",
      topicId: "matrices",
      subtopicId: "operations",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 360,
      tags: ["matrices", "matrix-powers", "linear-combination"],
      prerequisites: ["operations"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 8a",
        page: 540,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            `$\\begin{pmatrix} 68 & -3 & -3 \\\\ 13 & 7 & 0 \\\\ 0 & 0 & 6 \\end{pmatrix}$`,
            `$\\begin{pmatrix} 68 & -3 & -3 \\\\ 13 & 7 & 0 \\\\ 0 & 0 & 6 \\end{pmatrix}$`,
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            `$\\begin{pmatrix} 64 & -3 & -3 \\\\ 13 & 1 & 0 \\\\ 0 & 0 & -1 \\end{pmatrix}$`,
            `$\\begin{pmatrix} 64 & -3 & -3 \\\\ 13 & 1 & 0 \\\\ 0 & 0 & -1 \\end{pmatrix}$`,
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            `$\\begin{pmatrix} 74 & -3 & -9 \\\\ 3 & 11 & -6 \\\\ 6 & 3 & 9 \\end{pmatrix}$`,
            `$\\begin{pmatrix} 74 & -3 & -9 \\\\ 3 & 11 & -6 \\\\ 6 & 3 & 9 \\end{pmatrix}$`,
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            `$\\begin{pmatrix} 68 & -3 & -3 \\\\ 13 & 7 & 0 \\\\ 0 & 0 & -6 \\end{pmatrix}$`,
            `$\\begin{pmatrix} 68 & -3 & -3 \\\\ 13 & 7 & 0 \\\\ 0 & 0 & -6 \\end{pmatrix}$`,
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Potencias de matrices y combinación lineal",
          "Matrix powers and linear combination",
        ),
        statement: L(
          `Sean las matrices $A = \\begin{pmatrix} 4 & 0 & 0 \\\\ 1 & 0 & 0 \\\\ 0 & 0 & -1 \\end{pmatrix}$ y $B = \\begin{pmatrix} 1 & 1 & 1 \\\\ 1 & 0 & -1 \\\\ 0 & 0 & 1 \\end{pmatrix}$. Calcule $A^{3} - 3B^{2} + 10I$.`,
          `Let $A = \\begin{pmatrix} 4 & 0 & 0 \\\\ 1 & 0 & 0 \\\\ 0 & 0 & -1 \\end{pmatrix}$ and $B = \\begin{pmatrix} 1 & 1 & 1 \\\\ 1 & 0 & -1 \\\\ 0 & 0 & 1 \\end{pmatrix}$. Compute $A^{3} - 3B^{2} + 10I$.`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Calcula cada pieza por separado: primero $A^{2}$, luego $A^{3} = A^{2} \\cdot A$, después $B^{2}$; recién al final combina con $10I$ (la identidad $3 \\times 3$).",
            "Compute each piece separately: first $A^{2}$, then $A^{3} = A^{2} \\cdot A$, then $B^{2}$; only at the end combine with $10I$ (the $3 \\times 3$ identity).",
          ),
          L(
            "Cuidado con el signo de la esquina $(3,3)$ de las potencias de $A$: en $A$ vale $-1$, en $A^{2}$ pasa a $+1$ y en $A^{3}$ vuelve a $-1$.",
            "Mind the sign of the $(3,3)$ corner of the powers of $A$: it is $-1$ in $A$, becomes $+1$ in $A^{2}$ and returns to $-1$ in $A^{3}$.",
          ),
          L(
            "Para $B^{2}$, la primera fila del resultado es la fila $(1, 1, 1)$ de $B$ multiplicada por $B$; usa ese resultado para controlar el resto.",
            "For $B^{2}$, the first row of the result is the row $(1, 1, 1)$ of $B$ times $B$; use that to check the rest.",
          ),
        ],
        answerDisplay: L(
          `$A^{3} - 3B^{2} + 10I = \\begin{pmatrix} 68 & -3 & -3 \\\\ 13 & 7 & 0 \\\\ 0 & 0 & 6 \\end{pmatrix}$`,
          `$A^{3} - 3B^{2} + 10I = \\begin{pmatrix} 68 & -3 & -3 \\\\ 13 & 7 & 0 \\\\ 0 & 0 & 6 \\end{pmatrix}$`,
        ),
        solution: [
          step(
            "given",
            `$A = \\begin{pmatrix} 4 & 0 & 0 \\\\ 1 & 0 & 0 \\\\ 0 & 0 & -1 \\end{pmatrix}$, $B = \\begin{pmatrix} 1 & 1 & 1 \\\\ 1 & 0 & -1 \\\\ 0 & 0 & 1 \\end{pmatrix}$; se pide $A^{3} - 3B^{2} + 10I$.`,
            `$A = \\begin{pmatrix} 4 & 0 & 0 \\\\ 1 & 0 & 0 \\\\ 0 & 0 & -1 \\end{pmatrix}$, $B = \\begin{pmatrix} 1 & 1 & 1 \\\\ 1 & 0 & -1 \\\\ 0 & 0 & 1 \\end{pmatrix}$; we need $A^{3} - 3B^{2} + 10I$.`,
          ),
          step(
            "approach",
            "Calculamos las potencias por separado y luego combinamos entrada a entrada. $A$ es triangular, así que sus potencias se obtienen rápido; $B$ requiere el producto completo.",
            "We compute the powers separately and then combine entrywise. $A$ is triangular, so its powers come quickly; $B$ needs the full product.",
          ),
          step(
            "calculation",
            `$A^{2} = \\begin{pmatrix} 16 & 0 & 0 \\\\ 4 & 0 & 0 \\\\ 0 & 0 & 1 \\end{pmatrix}$, $A^{3} = \\begin{pmatrix} 64 & 0 & 0 \\\\ 16 & 0 & 0 \\\\ 0 & 0 & -1 \\end{pmatrix}$<br>$B^{2} = \\begin{pmatrix} 2 & 1 & 1 \\\\ 1 & 1 & 0 \\\\ 0 & 0 & 1 \\end{pmatrix}$, así que $3B^{2} = \\begin{pmatrix} 6 & 3 & 3 \\\\ 3 & 3 & 0 \\\\ 0 & 0 & 3 \\end{pmatrix}$<br>$A^{3} - 3B^{2} + 10I = \\begin{pmatrix} 64-6+10 & -3 & -3 \\\\ 16-3 & 0-3+10 & 0 \\\\ 0 & 0 & -1-3+10 \\end{pmatrix} = \\begin{pmatrix} 68 & -3 & -3 \\\\ 13 & 7 & 0 \\\\ 0 & 0 & 6 \\end{pmatrix}$`,
            `$A^{2} = \\begin{pmatrix} 16 & 0 & 0 \\\\ 4 & 0 & 0 \\\\ 0 & 0 & 1 \\end{pmatrix}$, $A^{3} = \\begin{pmatrix} 64 & 0 & 0 \\\\ 16 & 0 & 0 \\\\ 0 & 0 & -1 \\end{pmatrix}$<br>$B^{2} = \\begin{pmatrix} 2 & 1 & 1 \\\\ 1 & 1 & 0 \\\\ 0 & 0 & 1 \\end{pmatrix}$, so $3B^{2} = \\begin{pmatrix} 6 & 3 & 3 \\\\ 3 & 3 & 0 \\\\ 0 & 0 & 3 \\end{pmatrix}$<br>$A^{3} - 3B^{2} + 10I = \\begin{pmatrix} 64-6+10 & -3 & -3 \\\\ 16-3 & 0-3+10 & 0 \\\\ 0 & 0 & -1-3+10 \\end{pmatrix} = \\begin{pmatrix} 68 & -3 & -3 \\\\ 13 & 7 & 0 \\\\ 0 & 0 & 6 \\end{pmatrix}$`,
          ),
          step(
            "result",
            `$A^{3} - 3B^{2} + 10I = \\begin{pmatrix} 68 & -3 & -3 \\\\ 13 & 7 & 0 \\\\ 0 & 0 & 6 \\end{pmatrix}$ (clave del libro, exacta). Comprobación, entrada $(1,1)$: $64 - 3 \\cdot 2 + 10 = 68$ ✓.`,
            `$A^{3} - 3B^{2} + 10I = \\begin{pmatrix} 68 & -3 & -3 \\\\ 13 & 7 & 0 \\\\ 0 & 0 & 6 \\end{pmatrix}$ (book's key, exact). Check, entry $(1,1)$: $64 - 3 \\cdot 2 + 10 = 68$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 13a — AD (2×2 · 2×3, clave exacta). */
  template(
    {
      id: "mat-espol-ch5-13a",
      subject: "math",
      topicId: "matrices",
      subtopicId: "operations",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 270,
      tags: ["matrices", "matrix-product"],
      prerequisites: ["operations"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 13a",
        page: 541,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            `$\\begin{pmatrix} 52 & 65 & 5 \\\\ 73 & 90 & 10 \\end{pmatrix}$`,
            `$\\begin{pmatrix} 52 & 65 & 5 \\\\ 73 & 90 & 10 \\end{pmatrix}$`,
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            `$\\begin{pmatrix} 52 & 73 \\\\ 65 & 90 \\\\ 5 & 10 \\end{pmatrix}$`,
            `$\\begin{pmatrix} 52 & 73 \\\\ 65 & 90 \\\\ 5 & 10 \\end{pmatrix}$`,
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            `$\\begin{pmatrix} 30 & 30 & -5 \\\\ 44 & 30 & 30 \\end{pmatrix}$`,
            `$\\begin{pmatrix} 30 & 30 & -5 \\\\ 44 & 30 & 30 \\end{pmatrix}$`,
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            `$\\begin{pmatrix} 62 & 75 & 0 \\\\ 84 & 100 & 15 \\end{pmatrix}$`,
            `$\\begin{pmatrix} 62 & 75 & 0 \\\\ 84 & 100 & 15 \\end{pmatrix}$`,
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Producto de matrices 2×2 por 2×3",
          "2×2 by 2×3 matrix product",
        ),
        statement: L(
          `Sean $A = \\begin{pmatrix} 3 & 2 \\\\ 4 & 3 \\end{pmatrix}$ y $D = \\begin{pmatrix} 10 & 15 & -5 \\\\ 11 & 10 & 10 \\end{pmatrix}$. Halle $AD$.`,
          `Let $A = \\begin{pmatrix} 3 & 2 \\\\ 4 & 3 \\end{pmatrix}$ and $D = \\begin{pmatrix} 10 & 15 & -5 \\\\ 11 & 10 & 10 \\end{pmatrix}$. Find $AD$.`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Verifica el tamaño: $A$ es $2 \\times 2$ y $D$ es $2 \\times 3$, así que $AD$ es $2 \\times 3$ (dos filas, tres columnas).",
            "Check the size: $A$ is $2 \\times 2$ and $D$ is $2 \\times 3$, so $AD$ is $2 \\times 3$ (two rows, three columns).",
          ),
          L(
            "Cada entrada de $AD$ es una fila de $A$ por una columna de $D$: por ejemplo $(AD)_{11} = 3 \\cdot 10 + 2 \\cdot 11$.",
            "Each entry of $AD$ is a row of $A$ times a column of $D$: e.g. $(AD)_{11} = 3 \\cdot 10 + 2 \\cdot 11$.",
          ),
          L(
            "La primera fila de $AD$ sale de multiplicar $(3,\\ 2)$ por cada una de las tres columnas de $D$; repite después con la fila $(4,\\ 3)$.",
            "The first row of $AD$ comes from multiplying $(3,\\ 2)$ by each of the three columns of $D$; then repeat with the row $(4,\\ 3)$.",
          ),
        ],
        answerDisplay: L(
          `$AD = \\begin{pmatrix} 52 & 65 & 5 \\\\ 73 & 90 & 10 \\end{pmatrix}$`,
          `$AD = \\begin{pmatrix} 52 & 65 & 5 \\\\ 73 & 90 & 10 \\end{pmatrix}$`,
        ),
        solution: [
          step(
            "given",
            `$A = \\begin{pmatrix} 3 & 2 \\\\ 4 & 3 \\end{pmatrix}$ y $D = \\begin{pmatrix} 10 & 15 & -5 \\\\ 11 & 10 & 10 \\end{pmatrix}$.`,
            `$A = \\begin{pmatrix} 3 & 2 \\\\ 4 & 3 \\end{pmatrix}$ and $D = \\begin{pmatrix} 10 & 15 & -5 \\\\ 11 & 10 & 10 \\end{pmatrix}$.`,
          ),
          step(
            "approach",
            "Multiplicamos fila por columna: la fila $i$ de $A$ combinada con la columna $j$ de $D$ produce la entrada $(i, j)$ de $AD$.",
            "We multiply row by column: row $i$ of $A$ combined with column $j$ of $D$ produces entry $(i, j)$ of $AD$.",
          ),
          step(
            "calculation",
            "Fila 1 de $A$: $(3, 2)$ por las columnas de $D$ da $30+22 = 52$, $45+20 = 65$, $-15+20 = 5$<br>Fila 2 de $A$: $(4, 3)$ por las columnas de $D$ da $40+33 = 73$, $60+30 = 90$, $-20+30 = 10$",
            "Row 1 of $A$: $(3, 2)$ against the columns of $D$ gives $30+22 = 52$, $45+20 = 65$, $-15+20 = 5$<br>Row 2 of $A$: $(4, 3)$ against the columns of $D$ gives $40+33 = 73$, $60+30 = 90$, $-20+30 = 10$",
          ),
          step(
            "result",
            `$AD = \\begin{pmatrix} 52 & 65 & 5 \\\\ 73 & 90 & 10 \\end{pmatrix}$ (clave del libro, exacta). Comprobación, entrada $(2,1)$: $4 \\cdot 10 + 3 \\cdot 11 = 73$ ✓.`,
            `$AD = \\begin{pmatrix} 52 & 65 & 5 \\\\ 73 & 90 & 10 \\end{pmatrix}$ (book's key, exact). Check, entry $(2,1)$: $4 \\cdot 10 + 3 \\cdot 11 = 73$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 13c — CD (4×2 · 2×3, clave exacta). */
  template(
    {
      id: "mat-espol-ch5-13c",
      subject: "math",
      topicId: "matrices",
      subtopicId: "operations",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 330,
      tags: ["matrices", "matrix-product", "dimensions"],
      prerequisites: ["operations"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 13c",
        page: 541,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            `$\\begin{pmatrix} 20 & 30 & -10 \\\\ -34 & -25 & -45 \\\\ 41 & 55 & -5 \\\\ -11 & -10 & -10 \\end{pmatrix}$`,
            `$\\begin{pmatrix} 20 & 30 & -10 \\\\ -34 & -25 & -45 \\\\ 41 & 55 & -5 \\\\ -11 & -10 & -10 \\end{pmatrix}$`,
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            `$\\begin{pmatrix} 20 & 30 & -10 \\\\ -34 & -25 & -45 \\\\ 41 & 55 & -5 \\\\ 0 & 0 & 0 \\end{pmatrix}$`,
            `$\\begin{pmatrix} 20 & 30 & -10 \\\\ -34 & -25 & -45 \\\\ 41 & 55 & -5 \\\\ 0 & 0 & 0 \\end{pmatrix}$`,
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            `$\\begin{pmatrix} 20 & -30 & -10 \\\\ -34 & 25 & -45 \\\\ 41 & -55 & -5 \\\\ -11 & 10 & -10 \\end{pmatrix}$`,
            `$\\begin{pmatrix} 20 & -30 & -10 \\\\ -34 & 25 & -45 \\\\ 41 & -55 & -5 \\\\ -11 & 10 & -10 \\end{pmatrix}$`,
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            `$\\begin{pmatrix} 20 & -34 & 41 & -11 \\\\ 30 & -25 & 55 & -10 \\\\ -10 & -45 & -5 & -10 \\end{pmatrix}$`,
            `$\\begin{pmatrix} 20 & -34 & 41 & -11 \\\\ 30 & -25 & 55 & -10 \\\\ -10 & -45 & -5 & -10 \\end{pmatrix}$`,
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Producto de matrices 4×2 por 2×3",
          "4×2 by 2×3 matrix product",
        ),
        statement: L(
          `Con $C = \\begin{pmatrix} 2 & 0 \\\\ 1 & -4 \\\\ 3 & 1 \\\\ 0 & -1 \\end{pmatrix}$ y el mismo $D = \\begin{pmatrix} 10 & 15 & -5 \\\\ 11 & 10 & 10 \\end{pmatrix}$ del ejercicio anterior, halle $CD$.`,
          `With $C = \\begin{pmatrix} 2 & 0 \\\\ 1 & -4 \\\\ 3 & 1 \\\\ 0 & -1 \\end{pmatrix}$ and the same $D = \\begin{pmatrix} 10 & 15 & -5 \\\\ 11 & 10 & 10 \\end{pmatrix}$ as the previous exercise, find $CD$.`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "$C$ es $4 \\times 2$ y $D$ es $2 \\times 3$: el producto $CD$ es $4 \\times 3$, con 12 entradas por calcular.",
            "$C$ is $4 \\times 2$ and $D$ is $2 \\times 3$: the product $CD$ is $4 \\times 3$, with 12 entries to compute.",
          ),
          L(
            "Cada fila de $C$ genera una fila de $CD$ como combinación lineal de las filas de $D$: la fila $(2,\\ 0)$ de $C$ produce el doble de la primera fila de $D$.",
            "Each row of $C$ generates a row of $CD$ as a linear combination of the rows of $D$: the row $(2,\\ 0)$ of $C$ produces twice the first row of $D$.",
          ),
          L(
            "La fila 4 de $C$ es $(0,\\ -1)$: piensa qué operación sobre la fila 2 de $D$ produce la fila 4 de $CD$.",
            "Row 4 of $C$ is $(0,\\ -1)$: think about which operation on row 2 of $D$ produces row 4 of $CD$.",
          ),
        ],
        answerDisplay: L(
          `$CD = \\begin{pmatrix} 20 & 30 & -10 \\\\ -34 & -25 & -45 \\\\ 41 & 55 & -5 \\\\ -11 & -10 & -10 \\end{pmatrix}$`,
          `$CD = \\begin{pmatrix} 20 & 30 & -10 \\\\ -34 & -25 & -45 \\\\ 41 & 55 & -5 \\\\ -11 & -10 & -10 \\end{pmatrix}$`,
        ),
        solution: [
          step(
            "given",
            `$C = \\begin{pmatrix} 2 & 0 \\\\ 1 & -4 \\\\ 3 & 1 \\\\ 0 & -1 \\end{pmatrix}$ y $D = \\begin{pmatrix} 10 & 15 & -5 \\\\ 11 & 10 & 10 \\end{pmatrix}$.`,
            `$C = \\begin{pmatrix} 2 & 0 \\\\ 1 & -4 \\\\ 3 & 1 \\\\ 0 & -1 \\end{pmatrix}$ and $D = \\begin{pmatrix} 10 & 15 & -5 \\\\ 11 & 10 & 10 \\end{pmatrix}$.`,
          ),
          step(
            "approach",
            "Conviene ver cada fila de $CD$ como combinación lineal de las dos filas de $D$, con coeficientes dados por la fila correspondiente de $C$.",
            "It helps to see each row of $CD$ as a linear combination of the two rows of $D$, with coefficients given by the corresponding row of $C$.",
          ),
          step(
            "calculation",
            "Fila 1: $2 \\cdot (10,\\ 15,\\ -5) = (20,\\ 30,\\ -10)$<br>Fila 2: $(10,\\ 15,\\ -5) - 4 \\cdot (11,\\ 10,\\ 10) = (-34,\\ -25,\\ -45)$<br>Fila 3: $3 \\cdot (10,\\ 15,\\ -5) + (11,\\ 10,\\ 10) = (41,\\ 55,\\ -5)$<br>Fila 4: $-(11,\\ 10,\\ 10) = (-11,\\ -10,\\ -10)$",
            "Row 1: $2 \\cdot (10,\\ 15,\\ -5) = (20,\\ 30,\\ -10)$<br>Row 2: $(10,\\ 15,\\ -5) - 4 \\cdot (11,\\ 10,\\ 10) = (-34,\\ -25,\\ -45)$<br>Row 3: $3 \\cdot (10,\\ 15,\\ -5) + (11,\\ 10,\\ 10) = (41,\\ 55,\\ -5)$<br>Row 4: $-(11,\\ 10,\\ 10) = (-11,\\ -10,\\ -10)$",
          ),
          step(
            "result",
            `$CD = \\begin{pmatrix} 20 & 30 & -10 \\\\ -34 & -25 & -45 \\\\ 41 & 55 & -5 \\\\ -11 & -10 & -10 \\end{pmatrix}$ (clave del libro, exacta). Comprobación, entrada $(2,2)$: $1 \\cdot 15 + (-4) \\cdot 10 = -25$ ✓.`,
            `$CD = \\begin{pmatrix} 20 & 30 & -10 \\\\ -34 & -25 & -45 \\\\ 41 & 55 & -5 \\\\ -11 & -10 & -10 \\end{pmatrix}$ (book's key, exact). Check, entry $(2,2)$: $1 \\cdot 15 + (-4) \\cdot 10 = -25$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 13d — C^T B^T = (BC)^T (clave exacta). */
  template(
    {
      id: "mat-espol-ch5-13d",
      subject: "math",
      topicId: "matrices",
      subtopicId: "operations",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["matrices", "transpose", "matrix-product"],
      prerequisites: ["operations"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 13d",
        page: 541,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            `$\\begin{pmatrix} 11 \\\\ -1 \\end{pmatrix}$`,
            `$\\begin{pmatrix} 11 \\\\ -1 \\end{pmatrix}$`,
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            `$\\begin{pmatrix} -1 \\\\ 11 \\end{pmatrix}$`,
            `$\\begin{pmatrix} -1 \\\\ 11 \\end{pmatrix}$`,
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            `$\\begin{pmatrix} 11 & -1 \\end{pmatrix}$`,
            `$\\begin{pmatrix} 11 & -1 \\end{pmatrix}$`,
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            `$\\begin{pmatrix} 9 \\\\ -1 \\end{pmatrix}$`,
            `$\\begin{pmatrix} 9 \\\\ -1 \\end{pmatrix}$`,
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Producto con matrices transpuestas",
          "Product with transposed matrices",
        ),
        statement: L(
          `Con $B = \\begin{pmatrix} 5 & 1 & 0 & -3 \\end{pmatrix}$ y $C = \\begin{pmatrix} 2 & 0 \\\\ 1 & -4 \\\\ 3 & 1 \\\\ 0 & -1 \\end{pmatrix}$, halle $C^{T}B^{T}$.`,
          `With $B = \\begin{pmatrix} 5 & 1 & 0 & -3 \\end{pmatrix}$ and $C = \\begin{pmatrix} 2 & 0 \\\\ 1 & -4 \\\\ 3 & 1 \\\\ 0 & -1 \\end{pmatrix}$, find $C^{T}B^{T}$.`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Identifica las formas: $C^{T}$ es $2 \\times 4$ y $B^{T}$ es $4 \\times 1$, así que $C^{T}B^{T}$ es una columna $2 \\times 1$.",
            "Identify the shapes: $C^{T}$ is $2 \\times 4$ and $B^{T}$ is $4 \\times 1$, so $C^{T}B^{T}$ is a $2 \\times 1$ column.",
          ),
          L(
            `Escribe $C^{T}$: sus filas son las columnas de $C$, es decir $(2,\\ 1,\\ 3,\\ 0)$ y $(0,\\ -4,\\ 1,\\ -1)$.`,
            `Write down $C^{T}$: its rows are the columns of $C$, namely $(2,\\ 1,\\ 3,\\ 0)$ and $(0,\\ -4,\\ 1,\\ -1)$.`,
          ),
          L(
            "Cada entrada de $C^{T}B^{T}$ es una de esas filas por la columna $B^{T} = (5,\\ 1,\\ 0,\\ -3)^{T}$.",
            "Each entry of $C^{T}B^{T}$ is one of those rows times the column $B^{T} = (5,\\ 1,\\ 0,\\ -3)^{T}$.",
          ),
        ],
        answerDisplay: L(
          `$C^{T}B^{T} = \\begin{pmatrix} 11 \\\\ -1 \\end{pmatrix}$`,
          `$C^{T}B^{T} = \\begin{pmatrix} 11 \\\\ -1 \\end{pmatrix}$`,
        ),
        solution: [
          step(
            "given",
            `$B = \\begin{pmatrix} 5 & 1 & 0 & -3 \\end{pmatrix}$ y $C = \\begin{pmatrix} 2 & 0 \\\\ 1 & -4 \\\\ 3 & 1 \\\\ 0 & -1 \\end{pmatrix}$.`,
            `$B = \\begin{pmatrix} 5 & 1 & 0 & -3 \\end{pmatrix}$ and $C = \\begin{pmatrix} 2 & 0 \\\\ 1 & -4 \\\\ 3 & 1 \\\\ 0 & -1 \\end{pmatrix}$.`,
          ),
          step(
            "approach",
            "Trasponemos ambas matrices y multiplicamos. También sirve la identidad $C^{T}B^{T} = (BC)^{T}$: primero el producto fila $BC$ de $1 \\times 2$ y luego su transpuesta.",
            "We transpose both matrices and multiply. The identity $C^{T}B^{T} = (BC)^{T}$ also works: first the $1 \\times 2$ row product $BC$, then its transpose.",
          ),
          step(
            "calculation",
            `$C^{T} = \\begin{pmatrix} 2 & 1 & 3 & 0 \\\\ 0 & -4 & 1 & -1 \\end{pmatrix}$, $B^{T} = \\begin{pmatrix} 5 \\\\ 1 \\\\ 0 \\\\ -3 \\end{pmatrix}$<br>$C^{T}B^{T} = \\begin{pmatrix} 2 \\cdot 5 + 1 \\cdot 1 + 3 \\cdot 0 + 0 \\cdot (-3) \\\\ 0 \\cdot 5 - 4 \\cdot 1 + 1 \\cdot 0 - 1 \\cdot (-3) \\end{pmatrix} = \\begin{pmatrix} 11 \\\\ -1 \\end{pmatrix}$`,
            `$C^{T} = \\begin{pmatrix} 2 & 1 & 3 & 0 \\\\ 0 & -4 & 1 & -1 \\end{pmatrix}$, $B^{T} = \\begin{pmatrix} 5 \\\\ 1 \\\\ 0 \\\\ -3 \\end{pmatrix}$<br>$C^{T}B^{T} = \\begin{pmatrix} 2 \\cdot 5 + 1 \\cdot 1 + 3 \\cdot 0 + 0 \\cdot (-3) \\\\ 0 \\cdot 5 - 4 \\cdot 1 + 1 \\cdot 0 - 1 \\cdot (-3) \\end{pmatrix} = \\begin{pmatrix} 11 \\\\ -1 \\end{pmatrix}$`,
          ),
          step(
            "result",
            `$C^{T}B^{T} = \\begin{pmatrix} 11 \\\\ -1 \\end{pmatrix}$ (clave del libro, exacta). Comprobación vía $(BC)^{T}$: $BC = \\begin{pmatrix} 5 \\cdot 2 + 1 \\cdot 1 + 0 \\cdot 3 - 3 \\cdot 0 & 5 \\cdot 0 - 1 \\cdot 4 + 0 \\cdot 1 - 3 \\cdot (-1) \\end{pmatrix} = \\begin{pmatrix} 11 & -1 \\end{pmatrix}$, cuya transpuesta es la columna obtenida ✓.`,
            `$C^{T}B^{T} = \\begin{pmatrix} 11 \\\\ -1 \\end{pmatrix}$ (book's key, exact). Check via $(BC)^{T}$: $BC = \\begin{pmatrix} 5 \\cdot 2 + 1 \\cdot 1 + 0 \\cdot 3 - 3 \\cdot 0 & 5 \\cdot 0 - 1 \\cdot 4 + 0 \\cdot 1 - 3 \\cdot (-1) \\end{pmatrix} = \\begin{pmatrix} 11 & -1 \\end{pmatrix}$, whose transpose is the column found ✓.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* §5.1/§5.3 Ecuaciones matriciales: #10 y #12 (p. 540), #53        */
  /* (p. 547). Clave impresa (pp. 941-942) + sympy.                    */
  /* ---------------------------------------------------------------- */

  /* 5 · 10 — AX + X = B → (A+I)X = B (clave exacta: (1/33)[[28,59],[20,28]]). */
  template(
    {
      id: "mat-espol-ch5-10",
      subject: "math",
      topicId: "matrices",
      subtopicId: "matrix-equations",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 360,
      tags: ["matrix-equations", "inverse", "common-factor"],
      prerequisites: ["operations", "inverse"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 10",
        page: 540,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            `$\\dfrac{1}{33}\\begin{pmatrix} 28 & 59 \\\\ 20 & 28 \\end{pmatrix}$`,
            `$\\dfrac{1}{33}\\begin{pmatrix} 28 & 59 \\\\ 20 & 28 \\end{pmatrix}$`,
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            `$\\dfrac{1}{33}\\begin{pmatrix} 28 & 20 \\\\ 59 & 28 \\end{pmatrix}$`,
            `$\\dfrac{1}{33}\\begin{pmatrix} 28 & 20 \\\\ 59 & 28 \\end{pmatrix}$`,
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            `$\\dfrac{1}{28}\\begin{pmatrix} 33 & 59 \\\\ 20 & 33 \\end{pmatrix}$`,
            `$\\dfrac{1}{28}\\begin{pmatrix} 33 & 59 \\\\ 20 & 33 \\end{pmatrix}$`,
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            `$\\begin{pmatrix} 28 & 59 \\\\ 20 & 28 \\end{pmatrix}$`,
            `$\\begin{pmatrix} 28 & 59 \\\\ 20 & 28 \\end{pmatrix}$`,
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Ecuación matricial con factor común",
          "Matrix equation with a common factor",
        ),
        statement: L(
          `Las matrices $A = \\begin{pmatrix} 3 & 1 \\\\ -5 & 6 \\end{pmatrix}$, $B = \\begin{pmatrix} 4 & 8 \\\\ 0 & -3 \\end{pmatrix}$ y $X = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$, donde $a, b, c, d \\in \\mathbb{R}$, satisfacen $AX + X = B$. Encuentre $X$.`,
          `The matrices $A = \\begin{pmatrix} 3 & 1 \\\\ -5 & 6 \\end{pmatrix}$, $B = \\begin{pmatrix} 4 & 8 \\\\ 0 & -3 \\end{pmatrix}$ and $X = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$, where $a, b, c, d \\in \\mathbb{R}$, satisfy $AX + X = B$. Find $X$.`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "La incógnita $X$ aparece sumada dos veces: saca factor común por la derecha, $AX + X = (A + I)X$, con $I$ la identidad.",
            "The unknown $X$ appears twice, added: factor it out on the right, $AX + X = (A + I)X$, with $I$ the identity.",
          ),
          L(
            "Así la ecuación queda $(A + I)X = B$, de donde $X = (A + I)^{-1}B$; calcula $A + I$ y su determinante.",
            "The equation becomes $(A + I)X = B$, so $X = (A + I)^{-1}B$; compute $A + I$ and its determinant.",
          ),
          L(
            "El determinante de $A + I$ es $33 \\ne 0$; usa la fórmula de la inversa $2 \\times 2$ y multiplica por $B$.",
            "The determinant of $A + I$ is $33 \\ne 0$; use the $2 \\times 2$ inverse formula and multiply by $B$.",
          ),
        ],
        answerDisplay: L(
          `$X = \\dfrac{1}{33}\\begin{pmatrix} 28 & 59 \\\\ 20 & 28 \\end{pmatrix}$, es decir $a = \\tfrac{28}{33}$, $b = \\tfrac{59}{33}$, $c = \\tfrac{20}{33}$, $d = \\tfrac{28}{33}$`,
          `$X = \\dfrac{1}{33}\\begin{pmatrix} 28 & 59 \\\\ 20 & 28 \\end{pmatrix}$, that is $a = \\tfrac{28}{33}$, $b = \\tfrac{59}{33}$, $c = \\tfrac{20}{33}$, $d = \\tfrac{28}{33}$`,
        ),
        solution: [
          step(
            "given",
            `$A = \\begin{pmatrix} 3 & 1 \\\\ -5 & 6 \\end{pmatrix}$, $B = \\begin{pmatrix} 4 & 8 \\\\ 0 & -3 \\end{pmatrix}$, $X = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$ con $AX + X = B$.`,
            `$A = \\begin{pmatrix} 3 & 1 \\\\ -5 & 6 \\end{pmatrix}$, $B = \\begin{pmatrix} 4 & 8 \\\\ 0 & -3 \\end{pmatrix}$, $X = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$ with $AX + X = B$.`,
          ),
          step(
            "approach",
            "Factorizamos la incógnita: $AX + X = (A + I)X = B$, de donde $X = (A + I)^{-1}B$. La matriz $A + I$ es invertible porque su determinante es $33 \\ne 0$.",
            "We factor out the unknown: $AX + X = (A + I)X = B$, hence $X = (A + I)^{-1}B$. The matrix $A + I$ is invertible because its determinant is $33 \\ne 0$.",
          ),
          step(
            "calculation",
            `$A + I = \\begin{pmatrix} 4 & 1 \\\\ -5 & 7 \\end{pmatrix}$, con $\\det(A + I) = 28 + 5 = 33$<br>$(A + I)^{-1} = \\dfrac{1}{33}\\begin{pmatrix} 7 & -1 \\\\ 5 & 4 \\end{pmatrix}$<br>$X = \\dfrac{1}{33}\\begin{pmatrix} 7 & -1 \\\\ 5 & 4 \\end{pmatrix}\\begin{pmatrix} 4 & 8 \\\\ 0 & -3 \\end{pmatrix} = \\dfrac{1}{33}\\begin{pmatrix} 28 & 59 \\\\ 20 & 28 \\end{pmatrix}$`,
            `$A + I = \\begin{pmatrix} 4 & 1 \\\\ -5 & 7 \\end{pmatrix}$, with $\\det(A + I) = 28 + 5 = 33$<br>$(A + I)^{-1} = \\dfrac{1}{33}\\begin{pmatrix} 7 & -1 \\\\ 5 & 4 \\end{pmatrix}$<br>$X = \\dfrac{1}{33}\\begin{pmatrix} 7 & -1 \\\\ 5 & 4 \\end{pmatrix}\\begin{pmatrix} 4 & 8 \\\\ 0 & -3 \\end{pmatrix} = \\dfrac{1}{33}\\begin{pmatrix} 28 & 59 \\\\ 20 & 28 \\end{pmatrix}$`,
          ),
          step(
            "result",
            `$X = \\dfrac{1}{33}\\begin{pmatrix} 28 & 59 \\\\ 20 & 28 \\end{pmatrix}$ (clave del libro, exacta), o sea $a = \\tfrac{28}{33}$, $b = \\tfrac{59}{33}$, $c = \\tfrac{20}{33}$, $d = \\tfrac{28}{33}$. Comprobación: la entrada $(1,1)$ de $(A+I)X$ es $\\tfrac{4 \\cdot 28 + 1 \\cdot 20}{33} = \\tfrac{132}{33} = 4$ ✓ y la $(2,2)$ es $\\tfrac{-5 \\cdot 59 + 7 \\cdot 28}{33} = \\tfrac{-99}{33} = -3$ ✓, ambas de $B$.`,
            `$X = \\dfrac{1}{33}\\begin{pmatrix} 28 & 59 \\\\ 20 & 28 \\end{pmatrix}$ (book's key, exact), i.e. $a = \\tfrac{28}{33}$, $b = \\tfrac{59}{33}$, $c = \\tfrac{20}{33}$, $d = \\tfrac{28}{33}$. Check: the $(1,1)$ entry of $(A+I)X$ is $\\tfrac{4 \\cdot 28 + 1 \\cdot 20}{33} = \\tfrac{132}{33} = 4$ ✓ and the $(2,2)$ entry is $\\tfrac{-5 \\cdot 59 + 7 \\cdot 28}{33} = \\tfrac{-99}{33} = -3$ ✓, both from $B$.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 12 — M² con parámetro entero a (clave: a = −1). */
  template(
    {
      id: "mat-espol-ch5-12",
      subject: "math",
      topicId: "matrices",
      subtopicId: "matrix-equations",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["matrix-equations", "parameters", "matrix-powers"],
      prerequisites: ["operations"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 12",
        page: 540,
      },
      reasoning: "parameters",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$a = -1$`, `$a = -1$`), correct: true },
        { id: "b", text: L(`$a = 1$`, `$a = 1$`), correct: false },
        { id: "c", text: L(`$a = \\pm 1$`, `$a = \\pm 1$`), correct: false },
        { id: "d", text: L(`$a = 3$`, `$a = 3$`), correct: false },
      ];
      return {
        skill: L(
          "Parámetro en una potencia de matriz",
          "Parameter in a matrix power",
        ),
        statement: L(
          `Sea $M = \\begin{pmatrix} a & 2 \\\\ 2 & -1 \\end{pmatrix}$, donde $a$ es un número entero. Si $M^{2} = \\begin{pmatrix} 5 & -4 \\\\ -4 & 5 \\end{pmatrix}$, el valor de $a$ es:`,
          `Let $M = \\begin{pmatrix} a & 2 \\\\ 2 & -1 \\end{pmatrix}$, where $a$ is an integer. If $M^{2} = \\begin{pmatrix} 5 & -4 \\\\ -4 & 5 \\end{pmatrix}$, the value of $a$ is:`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Calcula $M^{2}$ dejando $a$ como símbolo: cada entrada del resultado queda expresada en función de $a$.",
            "Compute $M^{2}$ keeping $a$ as a symbol: each entry of the result is left expressed in terms of $a$.",
          ),
          L(
            "Compara entrada por entrada con $\\begin{pmatrix} 5 & -4 \\\\ -4 & 5 \\end{pmatrix}$: las entradas $(1,2)$ y $(2,1)$ dan la ecuación más simple.",
            "Compare entrywise with $\\begin{pmatrix} 5 & -4 \\\\ -4 & 5 \\end{pmatrix}$: entries $(1,2)$ and $(2,1)$ give the simplest equation.",
          ),
          L(
            "De la entrada $(1,2)$ obtienes $2a - 2 = -4$; despeja $a$ y confirma con la entrada $(1,1)$.",
            "From entry $(1,2)$ you get $2a - 2 = -4$; solve for $a$ and confirm with entry $(1,1)$.",
          ),
        ],
        answerDisplay: L(`$a = -1$`, `$a = -1$`),
        solution: [
          step(
            "given",
            `$M = \\begin{pmatrix} a & 2 \\\\ 2 & -1 \\end{pmatrix}$ con $a$ entero, y $M^{2} = \\begin{pmatrix} 5 & -4 \\\\ -4 & 5 \\end{pmatrix}$.`,
            `$M = \\begin{pmatrix} a & 2 \\\\ 2 & -1 \\end{pmatrix}$ with $a$ an integer, and $M^{2} = \\begin{pmatrix} 5 & -4 \\\\ -4 & 5 \\end{pmatrix}$.`,
          ),
          step(
            "approach",
            "Elevamos $M$ al cuadrado con $a$ como parámetro y comparamos las cuatro entradas con la matriz dada.",
            "We square $M$ with $a$ as a parameter and compare the four entries with the given matrix.",
          ),
          step(
            "calculation",
            `$M^{2} = \\begin{pmatrix} a & 2 \\\\ 2 & -1 \\end{pmatrix}\\begin{pmatrix} a & 2 \\\\ 2 & -1 \\end{pmatrix} = \\begin{pmatrix} a^{2} + 4 & 2a - 2 \\\\ 2a - 2 & 5 \\end{pmatrix}$<br>Entrada $(1,2)$: $2a - 2 = -4 \\Rightarrow a = -1$<br>Entrada $(1,1)$: con $a = -1$, $a^{2} + 4 = 1 + 4 = 5$ ✓`,
            `$M^{2} = \\begin{pmatrix} a & 2 \\\\ 2 & -1 \\end{pmatrix}\\begin{pmatrix} a & 2 \\\\ 2 & -1 \\end{pmatrix} = \\begin{pmatrix} a^{2} + 4 & 2a - 2 \\\\ 2a - 2 & 5 \\end{pmatrix}$<br>Entry $(1,2)$: $2a - 2 = -4 \\Rightarrow a = -1$<br>Entry $(1,1)$: with $a = -1$, $a^{2} + 4 = 1 + 4 = 5$ ✓`,
          ),
          step(
            "result",
            `$a = -1$ (clave del libro, exacta). Comprobación completa: con $a = -1$, $M = \\begin{pmatrix} -1 & 2 \\\\ 2 & -1 \\end{pmatrix}$ y $M^{2} = \\begin{pmatrix} 1+4 & -2-2 \\\\ -2-2 & 4+1 \\end{pmatrix} = \\begin{pmatrix} 5 & -4 \\\\ -4 & 5 \\end{pmatrix}$ ✓.`,
            `$a = -1$ (book's key, exact). Full check: with $a = -1$, $M = \\begin{pmatrix} -1 & 2 \\\\ 2 & -1 \\end{pmatrix}$ and $M^{2} = \\begin{pmatrix} 1+4 & -2-2 \\\\ -2-2 & 4+1 \\end{pmatrix} = \\begin{pmatrix} 5 & -4 \\\\ -4 & 5 \\end{pmatrix}$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 53 — sistema 2×2 de ecuaciones matriciales (clave exacta). */
  template(
    {
      id: "mat-espol-ch5-53",
      subject: "math",
      topicId: "matrices",
      subtopicId: "matrix-equations",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 360,
      tags: ["matrix-equations", "linear-system"],
      prerequisites: ["operations"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 53",
        page: 547,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            `$X = \\begin{pmatrix} 3 & 3 \\\\ 4 & 6 \\end{pmatrix}$, $Y = \\begin{pmatrix} 1 & 3 \\\\ -2 & 7 \\end{pmatrix}$`,
            `$X = \\begin{pmatrix} 3 & 3 \\\\ 4 & 6 \\end{pmatrix}$, $Y = \\begin{pmatrix} 1 & 3 \\\\ -2 & 7 \\end{pmatrix}$`,
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            `$X = \\begin{pmatrix} 1 & 3 \\\\ -2 & 7 \\end{pmatrix}$, $Y = \\begin{pmatrix} 3 & 3 \\\\ 4 & 6 \\end{pmatrix}$`,
            `$X = \\begin{pmatrix} 1 & 3 \\\\ -2 & 7 \\end{pmatrix}$, $Y = \\begin{pmatrix} 3 & 3 \\\\ 4 & 6 \\end{pmatrix}$`,
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            `$X = \\begin{pmatrix} 3 & 3 \\\\ 4 & 6 \\end{pmatrix}$, $Y = \\begin{pmatrix} -1 & -3 \\\\ 2 & -7 \\end{pmatrix}$`,
            `$X = \\begin{pmatrix} 3 & 3 \\\\ 4 & 6 \\end{pmatrix}$, $Y = \\begin{pmatrix} -1 & -3 \\\\ 2 & -7 \\end{pmatrix}$`,
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            `$X = \\begin{pmatrix} 1 & 3 \\\\ -2 & 7 \\end{pmatrix}$, $Y = \\begin{pmatrix} \\tfrac{5}{3} & 3 \\\\ 0 & \\tfrac{20}{3} \\end{pmatrix}$`,
            `$X = \\begin{pmatrix} 1 & 3 \\\\ -2 & 7 \\end{pmatrix}$, $Y = \\begin{pmatrix} \\tfrac{5}{3} & 3 \\\\ 0 & \\tfrac{20}{3} \\end{pmatrix}$`,
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Sistema lineal de ecuaciones matriciales",
          "Linear system of matrix equations",
        ),
        statement: L(
          `Resuelva el sistema de ecuaciones matriciales: $3X - 2Y = \\begin{pmatrix} 7 & 3 \\\\ 16 & 4 \\end{pmatrix}$; $X + 3Y = \\begin{pmatrix} 6 & 12 \\\\ -2 & 27 \\end{pmatrix}$.`,
          `Solve the system of matrix equations: $3X - 2Y = \\begin{pmatrix} 7 & 3 \\\\ 16 & 4 \\end{pmatrix}$; $X + 3Y = \\begin{pmatrix} 6 & 12 \\\\ -2 & 27 \\end{pmatrix}$.`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Trata a $X$ y $Y$ como las incógnitas de un sistema lineal común: puedes eliminar una de ellas combinando las dos ecuaciones.",
            "Treat $X$ and $Y$ as the unknowns of an ordinary linear system: you can eliminate one of them by combining the two equations.",
          ),
          L(
            "Despeja $X$ de la segunda ecuación y sustituye en la primera: quedarán solo términos en $Y$ y las matrices conocidas.",
            "Solve for $X$ in the second equation and substitute into the first: only terms in $Y$ and the known matrices remain.",
          ),
          L(
            "Al sustituir, los términos en $Y$ se combinan como $-9Y - 2Y = -11Y$; despeja $Y$ y regresa por $X$.",
            "Substituting, the $Y$ terms combine as $-9Y - 2Y = -11Y$; solve for $Y$ and go back for $X$.",
          ),
        ],
        answerDisplay: L(
          `$X = \\begin{pmatrix} 3 & 3 \\\\ 4 & 6 \\end{pmatrix}$, $Y = \\begin{pmatrix} 1 & 3 \\\\ -2 & 7 \\end{pmatrix}$`,
          `$X = \\begin{pmatrix} 3 & 3 \\\\ 4 & 6 \\end{pmatrix}$, $Y = \\begin{pmatrix} 1 & 3 \\\\ -2 & 7 \\end{pmatrix}$`,
        ),
        solution: [
          step(
            "given",
            `$3X - 2Y = N_{1} = \\begin{pmatrix} 7 & 3 \\\\ 16 & 4 \\end{pmatrix}$ y $X + 3Y = N_{2} = \\begin{pmatrix} 6 & 12 \\\\ -2 & 27 \\end{pmatrix}$.`,
            `$3X - 2Y = N_{1} = \\begin{pmatrix} 7 & 3 \\\\ 16 & 4 \\end{pmatrix}$ and $X + 3Y = N_{2} = \\begin{pmatrix} 6 & 12 \\\\ -2 & 27 \\end{pmatrix}$.`,
          ),
          step(
            "approach",
            "Es un sistema lineal con «incógnitas» $X$ y $Y$: despejamos $X$ de la segunda ecuación, sustituimos en la primera y operamos igual que con un sistema numérico.",
            "This is a linear system with «unknowns» $X$ and $Y$: solve for $X$ in the second equation, substitute into the first and proceed as with a numeric system.",
          ),
          step(
            "calculation",
            `$X = N_{2} - 3Y$<br>$3(N_{2} - 3Y) - 2Y = N_{1} \\Rightarrow 3N_{2} - 11Y = N_{1} \\Rightarrow Y = \\tfrac{1}{11}(3N_{2} - N_{1})$<br>$3N_{2} - N_{1} = \\begin{pmatrix} 18-7 & 36-3 \\\\ -6-16 & 81-4 \\end{pmatrix} = \\begin{pmatrix} 11 & 33 \\\\ -22 & 77 \\end{pmatrix} \\Rightarrow Y = \\begin{pmatrix} 1 & 3 \\\\ -2 & 7 \\end{pmatrix}$<br>$X = N_{2} - 3Y = \\begin{pmatrix} 6-3 & 12-9 \\\\ -2+6 & 27-21 \\end{pmatrix} = \\begin{pmatrix} 3 & 3 \\\\ 4 & 6 \\end{pmatrix}$`,
            `$X = N_{2} - 3Y$<br>$3(N_{2} - 3Y) - 2Y = N_{1} \\Rightarrow 3N_{2} - 11Y = N_{1} \\Rightarrow Y = \\tfrac{1}{11}(3N_{2} - N_{1})$<br>$3N_{2} - N_{1} = \\begin{pmatrix} 18-7 & 36-3 \\\\ -6-16 & 81-4 \\end{pmatrix} = \\begin{pmatrix} 11 & 33 \\\\ -22 & 77 \\end{pmatrix} \\Rightarrow Y = \\begin{pmatrix} 1 & 3 \\\\ -2 & 7 \\end{pmatrix}$<br>$X = N_{2} - 3Y = \\begin{pmatrix} 6-3 & 12-9 \\\\ -2+6 & 27-21 \\end{pmatrix} = \\begin{pmatrix} 3 & 3 \\\\ 4 & 6 \\end{pmatrix}$`,
          ),
          step(
            "result",
            `$X = \\begin{pmatrix} 3 & 3 \\\\ 4 & 6 \\end{pmatrix}$, $Y = \\begin{pmatrix} 1 & 3 \\\\ -2 & 7 \\end{pmatrix}$ (clave del libro, exacta). Comprobación: $3X - 2Y = \\begin{pmatrix} 9-2 & 9-6 \\\\ 12+4 & 18-14 \\end{pmatrix} = \\begin{pmatrix} 7 & 3 \\\\ 16 & 4 \\end{pmatrix}$ ✓ y $X + 3Y = \\begin{pmatrix} 3+3 & 3+9 \\\\ 4-6 & 6+21 \\end{pmatrix} = \\begin{pmatrix} 6 & 12 \\\\ -2 & 27 \\end{pmatrix}$ ✓.`,
            `$X = \\begin{pmatrix} 3 & 3 \\\\ 4 & 6 \\end{pmatrix}$, $Y = \\begin{pmatrix} 1 & 3 \\\\ -2 & 7 \\end{pmatrix}$ (book's key, exact). Check: $3X - 2Y = \\begin{pmatrix} 9-2 & 9-6 \\\\ 12+4 & 18-14 \\end{pmatrix} = \\begin{pmatrix} 7 & 3 \\\\ 16 & 4 \\end{pmatrix}$ ✓ and $X + 3Y = \\begin{pmatrix} 3+3 & 3+9 \\\\ 4-6 & 6+21 \\end{pmatrix} = \\begin{pmatrix} 6 & 12 \\\\ -2 & 27 \\end{pmatrix}$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* §5.1/§5.2 Inversa: #15, #17, #18 (p. 541) y #48 a-b (p. 546).     */
  /* #15 lleva ERRATA de clave: la clave impresa lista solo ±I.        */
  /* ---------------------------------------------------------------- */

  /* 5 · 15 — matrices diagonales que coinciden con su inversa (clave
     impresa incompleta: lista solo I y −I; la cuenta completa es 4). */
  template(
    {
      id: "mat-espol-ch5-15",
      subject: "math",
      topicId: "matrices",
      subtopicId: "inverse",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 270,
      tags: ["inverse", "diagonal", "counting"],
      prerequisites: ["operations"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 15",
        page: 541,
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`4`, `4`), correct: true },
        { id: "b", text: L(`2 (solo $I$ y $-I$)`, `2 (only $I$ and $-I$)`), correct: false },
        { id: "c", text: L(`3`, `3`), correct: false },
        { id: "d", text: L(`Infinitas`, `Infinitely many`), correct: false },
      ];
      return {
        skill: L(
          "Matrices diagonales que son su propia inversa",
          "Diagonal matrices that are their own inverse",
        ),
        statement: L(
          "¿Cuántas matrices diagonales de orden 2 coinciden con su inversa?",
          "How many order-2 diagonal matrices coincide with their inverse?",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Una matriz diagonal $D = \\operatorname{diag}(d_{1}, d_{2})$ tiene inversa $\\operatorname{diag}(1/d_{1}, 1/d_{2})$, si ninguna entrada diagonal es cero.",
            "A diagonal matrix $D = \\operatorname{diag}(d_{1}, d_{2})$ has inverse $\\operatorname{diag}(1/d_{1}, 1/d_{2})$, provided no diagonal entry is zero.",
          ),
          L(
            "La condición $D = D^{-1}$ equivale a $D^{2} = I$; para una matriz diagonal esto impone una condición a cada entrada diagonal.",
            "The condition $D = D^{-1}$ is equivalent to $D^{2} = I$; for a diagonal matrix this imposes one condition per diagonal entry.",
          ),
          L(
            "Cada entrada diagonal debe satisfacer $d^{2} = 1$; enumera todas las combinaciones posibles y cuenta.",
            "Each diagonal entry must satisfy $d^{2} = 1$; enumerate all possible combinations and count.",
          ),
        ],
        answerDisplay: L(
          `Son 4: $I$, $-I$, $\\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}$ y $\\begin{pmatrix} -1 & 0 \\\\ 0 & 1 \\end{pmatrix}$`,
          `There are 4: $I$, $-I$, $\\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}$ and $\\begin{pmatrix} -1 & 0 \\\\ 0 & 1 \\end{pmatrix}$`,
        ),
        solution: [
          step(
            "given",
            `Buscamos matrices diagonales $D = \\begin{pmatrix} d_{1} & 0 \\\\ 0 & d_{2} \\end{pmatrix}$ tales que $D = D^{-1}$.`,
            `We look for diagonal matrices $D = \\begin{pmatrix} d_{1} & 0 \\\\ 0 & d_{2} \\end{pmatrix}$ such that $D = D^{-1}$.`,
          ),
          step(
            "approach",
            "Para una matriz diagonal, $D^{-1} = \\operatorname{diag}(1/d_{1}, 1/d_{2})$. La condición $D = D^{-1}$ equivale a $D^{2} = I$, que en una diagonal se aplica entrada por entrada.",
            "For a diagonal matrix, $D^{-1} = \\operatorname{diag}(1/d_{1}, 1/d_{2})$. The condition $D = D^{-1}$ is equivalent to $D^{2} = I$, which on a diagonal applies entrywise.",
          ),
          step(
            "calculation",
            `$D^{2} = \\begin{pmatrix} d_{1}^{2} & 0 \\\\ 0 & d_{2}^{2} \\end{pmatrix} = I \\Rightarrow d_{1}^{2} = 1$ y $d_{2}^{2} = 1 \\Rightarrow d_{1}, d_{2} \\in \\{-1,\\ 1\\}$<br>Las cuatro combinaciones: $\\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}$, $\\begin{pmatrix} -1 & 0 \\\\ 0 & -1 \\end{pmatrix}$, $\\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}$, $\\begin{pmatrix} -1 & 0 \\\\ 0 & 1 \\end{pmatrix}$`,
            `$D^{2} = \\begin{pmatrix} d_{1}^{2} & 0 \\\\ 0 & d_{2}^{2} \\end{pmatrix} = I \\Rightarrow d_{1}^{2} = 1$ and $d_{2}^{2} = 1 \\Rightarrow d_{1}, d_{2} \\in \\{-1,\\ 1\\}$<br>The four combinations: $\\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}$, $\\begin{pmatrix} -1 & 0 \\\\ 0 & -1 \\end{pmatrix}$, $\\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}$, $\\begin{pmatrix} -1 & 0 \\\\ 0 & 1 \\end{pmatrix}$`,
          ),
          step(
            "result",
            `Son **4** matrices. Comprobación: $\\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}^{2} = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix} = I$ ✓ (y lo mismo las otras tres). **Errata documentada**: la clave impresa del libro solo lista $I$ y $-I$; la enumeración completa con $d_{1}, d_{2} \\in \\{-1, 1\\}$ confirma que son cuatro las matrices diagonales de orden 2 que coinciden con su inversa.`,
            `There are **4** matrices. Check: $\\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}^{2} = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix} = I$ ✓ (and likewise the other three). **Documented erratum**: the book's printed key lists only $I$ and $-I$; the full enumeration with $d_{1}, d_{2} \\in \\{-1, 1\\}$ confirms that four order-2 diagonal matrices coincide with their inverse.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 17 — B² = 2B + I con B diagonal paramétrica (clave: m = ±√2). */
  template(
    {
      id: "mat-espol-ch5-17",
      subject: "math",
      topicId: "matrices",
      subtopicId: "inverse",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["inverse", "parameters", "diagonal"],
      prerequisites: ["operations"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 17",
        page: 541,
      },
      reasoning: "parameters",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$m = \\pm\\sqrt{2}$`, `$m = \\pm\\sqrt{2}$`), correct: true },
        { id: "b", text: L(`$m = \\pm 1$`, `$m = \\pm 1$`), correct: false },
        { id: "c", text: L(`$m = \\pm 2$`, `$m = \\pm 2$`), correct: false },
        { id: "d", text: L(`$m = 0$`, `$m = 0$`), correct: false },
      ];
      return {
        skill: L(
          "Parámetros en una matriz diagonal",
          "Parameters in a diagonal matrix",
        ),
        statement: L(
          `Dada la matriz $B = \\begin{pmatrix} 1+m & 0 \\\\ 0 & 1-m \\end{pmatrix}$, encuentre los valores de $m$ tales que $B^{2} = 2B + I$.`,
          `Given the matrix $B = \\begin{pmatrix} 1+m & 0 \\\\ 0 & 1-m \\end{pmatrix}$, find the values of $m$ such that $B^{2} = 2B + I$.`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Tanto $B^{2}$ como $2B + I$ son matrices diagonales: basta comparar las dos entradas diagonales.",
            "Both $B^{2}$ and $2B + I$ are diagonal matrices: it suffices to compare the two diagonal entries.",
          ),
          L(
            "La entrada $(1,1)$ da la ecuación $(1+m)^{2} = 3 + 2m$: expande el binomio y simplifica.",
            "Entry $(1,1)$ gives the equation $(1+m)^{2} = 3 + 2m$: expand the binomial and simplify.",
          ),
          L(
            "Debes llegar a una condición del tipo $m^{2} = $ constante; revisa que la entrada $(2,2)$ conduzca a la misma condición.",
            "You should reach a condition of the form $m^{2} = $ constant; check that entry $(2,2)$ leads to the same condition.",
          ),
        ],
        answerDisplay: L(`$m = \\pm\\sqrt{2}$`, `$m = \\pm\\sqrt{2}$`),
        solution: [
          step(
            "given",
            `$B = \\begin{pmatrix} 1+m & 0 \\\\ 0 & 1-m \\end{pmatrix}$ y la condición $B^{2} = 2B + I$.`,
            `$B = \\begin{pmatrix} 1+m & 0 \\\\ 0 & 1-m \\end{pmatrix}$ and the condition $B^{2} = 2B + I$.`,
          ),
          step(
            "approach",
            "Elevamos $B$ al cuadrado y escribimos $2B + I$; al ser ambas diagonales, la igualdad matricial se traduce en dos ecuaciones escalares.",
            "We square $B$ and write $2B + I$; since both are diagonal, the matrix equality becomes two scalar equations.",
          ),
          step(
            "calculation",
            `$B^{2} = \\begin{pmatrix} (1+m)^{2} & 0 \\\\ 0 & (1-m)^{2} \\end{pmatrix}$, $2B + I = \\begin{pmatrix} 3+2m & 0 \\\\ 0 & 3-2m \\end{pmatrix}$<br>$(1+m)^{2} = 3+2m \\Rightarrow 1 + 2m + m^{2} = 3 + 2m \\Rightarrow m^{2} = 2$<br>$(1-m)^{2} = 3-2m \\Rightarrow m^{2} = 2$ (la misma condición)`,
            `$B^{2} = \\begin{pmatrix} (1+m)^{2} & 0 \\\\ 0 & (1-m)^{2} \\end{pmatrix}$, $2B + I = \\begin{pmatrix} 3+2m & 0 \\\\ 0 & 3-2m \\end{pmatrix}$<br>$(1+m)^{2} = 3+2m \\Rightarrow 1 + 2m + m^{2} = 3 + 2m \\Rightarrow m^{2} = 2$<br>$(1-m)^{2} = 3-2m \\Rightarrow m^{2} = 2$ (the same condition)`,
          ),
          step(
            "result",
            `$m = \\pm\\sqrt{2}$ (clave del libro, exacta). Comprobación con $m = \\sqrt{2}$: $(1+\\sqrt{2})^{2} = 3+2\\sqrt{2} = 2(1+\\sqrt{2})+1$ ✓. Bonus del enunciado (la inversa): para $m = \\sqrt{2}$, $B^{-1} = \\begin{pmatrix} \\sqrt{2}-1 & 0 \\\\ 0 & -(1+\\sqrt{2}) \\end{pmatrix}$, pues $\\tfrac{1}{1+\\sqrt{2}} = \\sqrt{2}-1$ ✓.`,
            `$m = \\pm\\sqrt{2}$ (book's key, exact). Check with $m = \\sqrt{2}$: $(1+\\sqrt{2})^{2} = 3+2\\sqrt{2} = 2(1+\\sqrt{2})+1$ ✓. Statement bonus (the inverse): for $m = \\sqrt{2}$, $B^{-1} = \\begin{pmatrix} \\sqrt{2}-1 & 0 \\\\ 0 & -(1+\\sqrt{2}) \\end{pmatrix}$, since $\\tfrac{1}{1+\\sqrt{2}} = \\sqrt{2}-1$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 18 — semejanza refutada por el determinante (clave: no son semejantes). */
  template(
    {
      id: "mat-espol-ch5-18",
      subject: "math",
      topicId: "matrices",
      subtopicId: "inverse",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 240,
      tags: ["inverse", "similarity", "determinant"],
      prerequisites: ["operations", "determinants"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 18",
        page: 541,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            `No, porque $\\det(A) = 1 \\ne -1 = \\det(B)$ y matrices semejantes tienen igual determinante`,
            `No, because $\\det(A) = 1 \\ne -1 = \\det(B)$ and similar matrices have equal determinants`,
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(`Sí, con $P = I$`, `Yes, with $P = I$`),
          correct: false,
        },
        {
          id: "c",
          text: L(
            `Sí, porque ambas matrices son inversibles`,
            `Yes, because both matrices are invertible`,
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            `No se puede decidir con la información dada`,
            `It cannot be decided with the given information`,
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Criterio de semejanza por el determinante",
          "Similarity criterion via the determinant",
        ),
        statement: L(
          `Se dice que dos matrices cuadradas $A$ y $B$ de orden $n \\times n$ son **semejantes** si existe una matriz inversible $P$ tal que $B = P^{-1}AP$. Determine si son semejantes las matrices $A = \\begin{pmatrix} 1 & 0 \\\\ 2 & 1 \\end{pmatrix}$ y $B = \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}$.`,
          `Two square matrices $A$ and $B$ of order $n \\times n$ are said to be **similar** if there exists an invertible matrix $P$ such that $B = P^{-1}AP$. Determine whether the matrices $A = \\begin{pmatrix} 1 & 0 \\\\ 2 & 1 \\end{pmatrix}$ and $B = \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}$ are similar.`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Si $B = P^{-1}AP$, aplica determinantes a ambos lados y usa que $\\det(P^{-1}) = 1/\\det(P)$.",
            "If $B = P^{-1}AP$, take determinants on both sides and use $\\det(P^{-1}) = 1/\\det(P)$.",
          ),
          L(
            "Conseguirás que $\\det(B) = \\det(A)$ es una condición necesaria: matrices semejantes no pueden tener determinantes distintos.",
            "You will get that $\\det(B) = \\det(A)$ is a necessary condition: similar matrices cannot have different determinants.",
          ),
          L(
            "Calcula $\\det(A)$ y $\\det(B)$; si difieren, la respuesta es inmediata.",
            "Compute $\\det(A)$ and $\\det(B)$; if they differ, the answer is immediate.",
          ),
        ],
        answerDisplay: L(
          "No son semejantes: $\\det(A) = 1 \\ne -1 = \\det(B)$",
          "They are not similar: $\\det(A) = 1 \\ne -1 = \\det(B)$",
        ),
        solution: [
          step(
            "given",
            `$A = \\begin{pmatrix} 1 & 0 \\\\ 2 & 1 \\end{pmatrix}$, $B = \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}$; semejantes significa que existe $P$ inversible con $B = P^{-1}AP$.`,
            `$A = \\begin{pmatrix} 1 & 0 \\\\ 2 & 1 \\end{pmatrix}$, $B = \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}$; similar means there exists an invertible $P$ with $B = P^{-1}AP$.`,
          ),
          step(
            "approach",
            "Buscamos un invariante de la semejanza: el determinante. Si $B = P^{-1}AP$, entonces $\\det(B) = \\det(P^{-1})\\det(A)\\det(P) = \\det(A)$.",
            "We look for a similarity invariant: the determinant. If $B = P^{-1}AP$, then $\\det(B) = \\det(P^{-1})\\det(A)\\det(P) = \\det(A)$.",
          ),
          step(
            "calculation",
            "$\\det(A) = 1 \\cdot 1 - 0 \\cdot 2 = 1$<br>$\\det(B) = 1 \\cdot (-1) - 0 \\cdot 0 = -1$<br>Como $1 \\ne -1$, no puede existir tal matriz $P$.",
            "$\\det(A) = 1 \\cdot 1 - 0 \\cdot 2 = 1$<br>$\\det(B) = 1 \\cdot (-1) - 0 \\cdot 0 = -1$<br>Since $1 \\ne -1$, no such matrix $P$ can exist.",
          ),
          step(
            "result",
            "$A$ y $B$ **no** son semejantes (clave del libro), porque $\\det(A) = 1 \\ne -1 = \\det(B)$ y la semejanza conserva el determinante. Comprobación de la regla: $\\det(P^{-1}AP) = \\tfrac{1}{\\det(P)} \\cdot \\det(A) \\cdot \\det(P) = \\det(A)$ ✓. (Nótese que $P = I$ daría $P^{-1}AP = A \\ne B$.)",
            "$A$ and $B$ are **not** similar (book's key), because $\\det(A) = 1 \\ne -1 = \\det(B)$ and similarity preserves the determinant. Check of the rule: $\\det(P^{-1}AP) = \\tfrac{1}{\\det(P)} \\cdot \\det(A) \\cdot \\det(P) = \\det(A)$ ✓. (Note that $P = I$ would give $P^{-1}AP = A \\ne B$.)",
          ),
        ],
      };
    },
  ),

  /* 5 · 48 a-b — inversa 3×3 por adjunta + identidades (A^T)⁻¹ = (A⁻¹)^T
     y (A⁻¹)⁻¹ = A (clave exacta para ambas partes). */
  template(
    {
      id: "mat-espol-ch5-48ab",
      subject: "math",
      topicId: "matrices",
      subtopicId: "inverse",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 420,
      tags: ["inverse", "adjugate", "transpose"],
      prerequisites: ["operations", "determinants"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 48 a-b",
        page: 546,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            `$A^{-1} = \\dfrac{1}{3}\\begin{pmatrix} 1 & -2 & 2 \\\\ -2 & 7 & -4 \\\\ 1 & 1 & -1 \\end{pmatrix}$; $(A^{T})^{-1} = (A^{-1})^{T}$ y $(A^{-1})^{-1} = A$`,
            `$A^{-1} = \\dfrac{1}{3}\\begin{pmatrix} 1 & -2 & 2 \\\\ -2 & 7 & -4 \\\\ 1 & 1 & -1 \\end{pmatrix}$; $(A^{T})^{-1} = (A^{-1})^{T}$ and $(A^{-1})^{-1} = A$`,
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            `$A^{-1} = \\dfrac{1}{3}\\begin{pmatrix} 1 & -2 & 2 \\\\ -2 & 7 & -4 \\\\ 1 & 1 & -1 \\end{pmatrix}$; la relación $(A^{T})^{-1} = (A^{-1})^{T}$ es falsa en general`,
            `$A^{-1} = \\dfrac{1}{3}\\begin{pmatrix} 1 & -2 & 2 \\\\ -2 & 7 & -4 \\\\ 1 & 1 & -1 \\end{pmatrix}$; the relation $(A^{T})^{-1} = (A^{-1})^{T}$ is false in general`,
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            `$A^{-1} = \\dfrac{1}{3}\\begin{pmatrix} 1 & -2 & 2 \\\\ -2 & 7 & -4 \\\\ 1 & 1 & 1 \\end{pmatrix}$; $(A^{T})^{-1} = (A^{-1})^{T}$ y $(A^{-1})^{-1} = A$`,
            `$A^{-1} = \\dfrac{1}{3}\\begin{pmatrix} 1 & -2 & 2 \\\\ -2 & 7 & -4 \\\\ 1 & 1 & 1 \\end{pmatrix}$; $(A^{T})^{-1} = (A^{-1})^{T}$ and $(A^{-1})^{-1} = A$`,
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            `$A^{-1} = \\dfrac{1}{3}\\begin{pmatrix} 1 & -2 & 1 \\\\ -2 & 7 & 1 \\\\ 2 & -4 & -1 \\end{pmatrix}$; $(A^{T})^{-1} = (A^{-1})^{T}$ y $(A^{-1})^{-1} = A$`,
            `$A^{-1} = \\dfrac{1}{3}\\begin{pmatrix} 1 & -2 & 1 \\\\ -2 & 7 & 1 \\\\ 2 & -4 & -1 \\end{pmatrix}$; $(A^{T})^{-1} = (A^{-1})^{T}$ and $(A^{-1})^{-1} = A$`,
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Inversa 3×3 por la adjunta y sus propiedades",
          "3×3 inverse via the adjugate and its properties",
        ),
        statement: L(
          `Considere la matriz $A = \\begin{pmatrix} 1 & 0 & 2 \\\\ 2 & 1 & 0 \\\\ 3 & 1 & -1 \\end{pmatrix}$. Halle $A^{-1}$ e indique cuál de las siguientes opciones sobre las inversas de $A^{T}$ y de $A^{-1}$ es la verdadera.`,
          `Consider the matrix $A = \\begin{pmatrix} 1 & 0 & 2 \\\\ 2 & 1 & 0 \\\\ 3 & 1 & -1 \\end{pmatrix}$. Find $A^{-1}$ and indicate which of the following options about the inverses of $A^{T}$ and $A^{-1}$ is the true one.`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Usa $A^{-1} = \\tfrac{1}{\\det(A)}\\operatorname{adj}(A)$: empieza calculando $\\det(A)$, por ejemplo con expansión por la primera fila.",
            "Use $A^{-1} = \\tfrac{1}{\\det(A)}\\operatorname{adj}(A)$: start by computing $\\det(A)$, e.g. expanding along the first row.",
          ),
          L(
            "Cada entrada de la adjunta es un menor $2 \\times 2$ afectado por su signo de tablero de ajedrez, y recuerda trasponer la matriz de cofactores.",
            "Each adjugate entry is a $2 \\times 2$ minor with its checkerboard sign, and remember to transpose the cofactor matrix.",
          ),
          L(
            "Para la parte b, traspone la igualdad $A^{-1}A = I$: ¿qué matriz multiplicada por $A^{T}$ por la derecha produce la identidad?",
            "For part b, transpose the identity $A^{-1}A = I$: which matrix times $A^{T}$ on the right produces the identity?",
          ),
        ],
        answerDisplay: L(
          `$A^{-1} = \\dfrac{1}{3}\\begin{pmatrix} 1 & -2 & 2 \\\\ -2 & 7 & -4 \\\\ 1 & 1 & -1 \\end{pmatrix}$; además $(A^{T})^{-1} = (A^{-1})^{T}$ y $(A^{-1})^{-1} = A$`,
          `$A^{-1} = \\dfrac{1}{3}\\begin{pmatrix} 1 & -2 & 2 \\\\ -2 & 7 & -4 \\\\ 1 & 1 & -1 \\end{pmatrix}$; moreover $(A^{T})^{-1} = (A^{-1})^{T}$ and $(A^{-1})^{-1} = A$`,
        ),
        solution: [
          step(
            "given",
            `$A = \\begin{pmatrix} 1 & 0 & 2 \\\\ 2 & 1 & 0 \\\\ 3 & 1 & -1 \\end{pmatrix}$; se pide $A^{-1}$ y la forma correcta de $(A^{T})^{-1}$ y $(A^{-1})^{-1}$.`,
            `$A = \\begin{pmatrix} 1 & 0 & 2 \\\\ 2 & 1 & 0 \\\\ 3 & 1 & -1 \\end{pmatrix}$; we need $A^{-1}$ and the correct form of $(A^{T})^{-1}$ and $(A^{-1})^{-1}$.`,
          ),
          step(
            "approach",
            "Calculamos $\\det(A)$ y la adjunta (cofactores traspuestos). Las identidades de la parte b se deducen de la unicidad de la inversa y de trasponer $A^{-1}A = I$.",
            "We compute $\\det(A)$ and the adjugate (transposed cofactors). The part-b identities follow from the uniqueness of the inverse and from transposing $A^{-1}A = I$.",
          ),
          step(
            "calculation",
            `$\\det(A) = 1 \\cdot \\det\\begin{pmatrix} 1 & 0 \\\\ 1 & -1 \\end{pmatrix} - 0 + 2 \\cdot \\det\\begin{pmatrix} 2 & 1 \\\\ 3 & 1 \\end{pmatrix} = -1 + 2(-1) = -3$<br>$\\operatorname{adj}(A) = \\begin{pmatrix} -1 & 2 & -2 \\\\ 2 & -7 & 4 \\\\ -1 & -1 & 1 \\end{pmatrix}$, así que $A^{-1} = \\tfrac{1}{-3}\\operatorname{adj}(A) = \\dfrac{1}{3}\\begin{pmatrix} 1 & -2 & 2 \\\\ -2 & 7 & -4 \\\\ 1 & 1 & -1 \\end{pmatrix}$<br>Identidades: $(A^{-1})^{T}A^{T} = (A\\,A^{-1})^{T} = I^{T} = I \\Rightarrow (A^{T})^{-1} = (A^{-1})^{T}$; y como $A^{-1}A = AA^{-1} = I$, se tiene $(A^{-1})^{-1} = A$.`,
            `$\\det(A) = 1 \\cdot \\det\\begin{pmatrix} 1 & 0 \\\\ 1 & -1 \\end{pmatrix} - 0 + 2 \\cdot \\det\\begin{pmatrix} 2 & 1 \\\\ 3 & 1 \\end{pmatrix} = -1 + 2(-1) = -3$<br>$\\operatorname{adj}(A) = \\begin{pmatrix} -1 & 2 & -2 \\\\ 2 & -7 & 4 \\\\ -1 & -1 & 1 \\end{pmatrix}$, so $A^{-1} = \\tfrac{1}{-3}\\operatorname{adj}(A) = \\dfrac{1}{3}\\begin{pmatrix} 1 & -2 & 2 \\\\ -2 & 7 & -4 \\\\ 1 & 1 & -1 \\end{pmatrix}$<br>Identities: $(A^{-1})^{T}A^{T} = (A\\,A^{-1})^{T} = I^{T} = I \\Rightarrow (A^{T})^{-1} = (A^{-1})^{T}$; and since $A^{-1}A = AA^{-1} = I$, we get $(A^{-1})^{-1} = A$.`,
          ),
          step(
            "result",
            `$A^{-1} = \\dfrac{1}{3}\\begin{pmatrix} 1 & -2 & 2 \\\\ -2 & 7 & -4 \\\\ 1 & 1 & -1 \\end{pmatrix}$ (clave del libro, exacta) y las identidades verdaderas son $(A^{T})^{-1} = (A^{-1})^{T}$ y $(A^{-1})^{-1} = A$. Comprobación: la entrada $(1,1)$ de $A\\,A^{-1}$ es $\\tfrac{1 \\cdot 1 + 0 \\cdot (-2) + 2 \\cdot 1}{3} = 1$ ✓, y la entrada $(1,1)$ de $A^{-1}A$ es $\\tfrac{1 - 4 + 6}{3} = 1$ ✓.`,
            `$A^{-1} = \\dfrac{1}{3}\\begin{pmatrix} 1 & -2 & 2 \\\\ -2 & 7 & -4 \\\\ 1 & 1 & -1 \\end{pmatrix}$ (book's key, exact) and the true identities are $(A^{T})^{-1} = (A^{-1})^{T}$ and $(A^{-1})^{-1} = A$. Check: the $(1,1)$ entry of $A\\,A^{-1}$ is $\\tfrac{1 \\cdot 1 + 0 \\cdot (-2) + 2 \\cdot 1}{3} = 1$ ✓, and the $(1,1)$ entry of $A^{-1}A$ is $\\tfrac{1 - 4 + 6}{3} = 1$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Cap. 5 §5.2 «Determinantes» (ed. digital), pp. 541-546. Tutor:    */
  /* «prosigue con matrices y sistemas». Clave impresa (pp. 941-942)  */
  /* + sympy: download/verify_espol_ch5.py. Matrices re-leídas         */
  /* visualmente (capa de texto del PDF en orden de columnas).          */
  /* Páginas impresas verificadas contra los encabezados del libro     */
  /* (VLM, download/ch5-pages): #25 → 542, #30/#31 → 543 y #36 → 544.  */
  /* ---------------------------------------------------------------- */

  /* 5 · 19 — singular con valores absolutos: casos x ≥ 2, 0 ≤ x < 2, x < 0
     (clave impresa: {−2, 2/3}, exacta). */
  template(
    {
      id: "mat-espol-ch5-19",
      subject: "math",
      topicId: "matrices",
      subtopicId: "determinants",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["determinants", "absolute-value", "singular-matrix"],
      prerequisites: ["operations", "determinants"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 19",
        page: 541,
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            `$x = -2$ o $x = \\tfrac{2}{3}$`,
            `$x = -2$ or $x = \\tfrac{2}{3}$`,
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(`Solo $x = \\tfrac{2}{3}$`, `Only $x = \\tfrac{2}{3}$`),
          correct: false,
        },
        { id: "c", text: L(`Solo $x = -2$`, `Only $x = -2$`), correct: false },
        {
          id: "d",
          text: L(`$x = -2$ o $x = 2$`, `$x = -2$ or $x = 2$`),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Matriz singular con valores absolutos",
          "Singular matrix with absolute values",
        ),
        statement: L(
          `Halle los valores reales de $x$ para que la matriz $A = \\begin{pmatrix} 2 & 1 \\\\ |x-2| & |x| \\end{pmatrix}$ sea singular.`,
          `Find the real values of $x$ for which the matrix $A = \\begin{pmatrix} 2 & 1 \\\\ |x-2| & |x| \\end{pmatrix}$ is singular.`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Singular significa $\\det(A) = 0$: escribe la condición $2|x| - |x-2| = 0$.",
            "Singular means $\\det(A) = 0$: write the condition $2|x| - |x-2| = 0$.",
          ),
          L(
            "Los ceros de los valores absolutos, $x = 0$ y $x = 2$, dividen la recta en tres casos: $x \\ge 2$, $0 \\le x < 2$ y $x < 0$.",
            "The zeros of the absolute values, $x = 0$ and $x = 2$, split the line into three cases: $x \\ge 2$, $0 \\le x < 2$ and $x < 0$.",
          ),
          L(
            "En cada caso sustituye cada valor absoluto por su signo y resuelve; conserva solo las raíces que pertenecen al caso.",
            "In each case replace each absolute value by its sign and solve; keep only the roots that belong to the case.",
          ),
        ],
        answerDisplay: L(
          `$x = -2$ o $x = \\tfrac{2}{3}$`,
          `$x = -2$ or $x = \\tfrac{2}{3}$`,
        ),
        solution: [
          step(
            "given",
            `$A = \\begin{pmatrix} 2 & 1 \\\\ |x-2| & |x| \\end{pmatrix}$; $A$ es singular exactamente cuando $\\det(A) = 2 \\cdot |x| - 1 \\cdot |x-2| = 0$.`,
            `$A = \\begin{pmatrix} 2 & 1 \\\\ |x-2| & |x| \\end{pmatrix}$; $A$ is singular exactly when $\\det(A) = 2 \\cdot |x| - 1 \\cdot |x-2| = 0$.`,
          ),
          step(
            "approach",
            "La condición $2|x| - |x-2| = 0$ mezcla dos valores absolutos con ceros en $x = 0$ y $x = 2$: se analiza por casos según el signo de $x$ y de $x - 2$, y en cada caso se comprueba que la raíz obtenida pertenezca al caso.",
            "The condition $2|x| - |x-2| = 0$ mixes two absolute values with zeros at $x = 0$ and $x = 2$: analyze by cases according to the sign of $x$ and $x - 2$, and in each case check that the root obtained belongs to the case.",
          ),
          step(
            "calculation",
            `Caso $x \\ge 2$: $|x| = x$ y $|x-2| = x-2$, así que $2x - (x-2) = x + 2 = 0$ da $x = -2$, que **no** pertenece al caso (se descarta).<br>Caso $0 \\le x < 2$: $|x| = x$ y $|x-2| = 2-x$, así que $2x - (2-x) = 3x - 2 = 0$ da $x = \\tfrac{2}{3}$, que sí pertenece al caso.<br>Caso $x < 0$: $|x| = -x$ y $|x-2| = 2-x$, así que $-2x - (2-x) = -x - 2 = 0$ da $x = -2$, que sí pertenece al caso.`,
            `Case $x \\ge 2$: $|x| = x$ and $|x-2| = x-2$, so $2x - (x-2) = x + 2 = 0$ gives $x = -2$, which does **not** belong to the case (discarded).<br>Case $0 \\le x < 2$: $|x| = x$ and $|x-2| = 2-x$, so $2x - (2-x) = 3x - 2 = 0$ gives $x = \\tfrac{2}{3}$, which does belong to the case.<br>Case $x < 0$: $|x| = -x$ and $|x-2| = 2-x$, so $-2x - (2-x) = -x - 2 = 0$ gives $x = -2$, which does belong to the case.`,
          ),
          step(
            "result",
            `Los valores buscados son $x = -2$ y $x = \\tfrac{2}{3}$ (clave del libro). Comprobación: con $x = \\tfrac{2}{3}$, $\\det(A) = 2 \\cdot \\tfrac{2}{3} - |\\tfrac{2}{3} - 2| = \\tfrac{4}{3} - \\tfrac{4}{3} = 0$ ✓; con $x = -2$, $\\det(A) = 2 \\cdot 2 - |-4| = 4 - 4 = 0$ ✓; en cambio $x = 2$ da $\\det(A) = 4 - 0 = 4 \\ne 0$ ✓.`,
            `The required values are $x = -2$ and $x = \\tfrac{2}{3}$ (book's key). Check: with $x = \\tfrac{2}{3}$, $\\det(A) = 2 \\cdot \\tfrac{2}{3} - |\\tfrac{2}{3} - 2| = \\tfrac{4}{3} - \\tfrac{4}{3} = 0$ ✓; with $x = -2$, $\\det(A) = 2 \\cdot 2 - |-4| = 4 - 4 = 0$ ✓; by contrast $x = 2$ gives $\\det(A) = 4 - 0 = 4 \\ne 0$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 22 b — matriz de exponenciales no inversible (clave impresa: 0). */
  template(
    {
      id: "mat-espol-ch5-22b",
      subject: "math",
      topicId: "matrices",
      subtopicId: "determinants",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 270,
      tags: ["determinants", "exponentials", "singular-matrix"],
      prerequisites: ["operations", "determinants"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 22 b",
        page: 542,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$\\{0\\}$`, `$\\{0\\}$`), correct: true },
        {
          id: "b",
          text: L(`$\\varnothing$`, `$\\varnothing$`),
          correct: false,
        },
        {
          id: "c",
          text: L(`$\\mathbb{R}$`, `$\\mathbb{R}$`),
          correct: false,
        },
        {
          id: "d",
          text: L(`$\\{\\ln 2\\}$`, `$\\{\\ln 2\\}$`),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Determinante con funciones exponenciales",
          "Determinant with exponential functions",
        ),
        statement: L(
          `Encuentre los valores de $x$ tales que la matriz $B = \\begin{pmatrix} e^{x} & e^{-2x} \\\\ e^{2x} & e^{3x} \\end{pmatrix}$ no sea inversible.`,
          `Find the values of $x$ for which the matrix $B = \\begin{pmatrix} e^{x} & e^{-2x} \\\\ e^{2x} & e^{3x} \\end{pmatrix}$ is not invertible.`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "No inversible significa $\\det(B) = 0$: calcula el determinante $2 \\times 2$.",
            "Not invertible means $\\det(B) = 0$: compute the $2 \\times 2$ determinant.",
          ),
          L(
            "Usa las leyes de exponentes: $e^{a} \\cdot e^{b} = e^{a+b}$; fíjate en que $e^{-2x} \\cdot e^{2x} = e^{0}$.",
            "Use the laws of exponents: $e^{a} \\cdot e^{b} = e^{a+b}$; note that $e^{-2x} \\cdot e^{2x} = e^{0}$.",
          ),
          L(
            "El determinante queda de la forma $e^{4x} - 1$; recuerda que $e^{t} = 1$ tiene una única solución real.",
            "The determinant takes the form $e^{4x} - 1$; recall that $e^{t} = 1$ has exactly one real solution.",
          ),
        ],
        answerDisplay: L(`$x = 0$`, `$x = 0$`),
        solution: [
          step(
            "given",
            `$B = \\begin{pmatrix} e^{x} & e^{-2x} \\\\ e^{2x} & e^{3x} \\end{pmatrix}$; se buscan los $x$ con $\\det(B) = 0$.`,
            `$B = \\begin{pmatrix} e^{x} & e^{-2x} \\\\ e^{2x} & e^{3x} \\end{pmatrix}$; we look for the $x$ with $\\det(B) = 0$.`,
          ),
          step(
            "approach",
            "$B$ no es inversible exactamente cuando su determinante se anula. Cada término del determinante es un producto de potencias de $e$, que se simplifica con $e^{a} \\cdot e^{b} = e^{a+b}$.",
            "$B$ is not invertible exactly when its determinant vanishes. Each term of the determinant is a product of powers of $e$, which simplifies via $e^{a} \\cdot e^{b} = e^{a+b}$.",
          ),
          step(
            "calculation",
            `$\\det(B) = e^{x} \\cdot e^{3x} - e^{-2x} \\cdot e^{2x} = e^{4x} - e^{0} = e^{4x} - 1$.<br>$\\det(B) = 0 \\iff e^{4x} = 1 \\iff 4x = 0 \\iff x = 0$ (pues $e^{t} = 1$ solo en $t = 0$).`,
            `$\\det(B) = e^{x} \\cdot e^{3x} - e^{-2x} \\cdot e^{2x} = e^{4x} - e^{0} = e^{4x} - 1$.<br>$\\det(B) = 0 \\iff e^{4x} = 1 \\iff 4x = 0 \\iff x = 0$ (since $e^{t} = 1$ only at $t = 0$).`,
          ),
          step(
            "result",
            `El único valor es $x = 0$, es decir, el conjunto solución es $\\{0\\}$ (clave del libro). Comprobación: con $x = 0$, $B = \\begin{pmatrix} 1 & 1 \\\\ 1 & 1 \\end{pmatrix}$ tiene filas iguales y $\\det(B) = 1 - 1 = 0$ ✓; en cambio con $x = 1$, $\\det(B) = e^{4} - 1 > 0$, así que $B$ sí es inversible ✓.`,
            `The only value is $x = 0$, i.e. the solution set is $\\{0\\}$ (book's key). Check: with $x = 0$, $B = \\begin{pmatrix} 1 & 1 \\\\ 1 & 1 \\end{pmatrix}$ has equal rows and $\\det(B) = 1 - 1 = 0$ ✓; by contrast with $x = 1$, $\\det(B) = e^{4} - 1 > 0$, so $B$ is invertible ✓.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 22 d — matriz de rotación: sen² + cos² = 1 ≠ 0 (clave impresa: ∅). */
  template(
    {
      id: "mat-espol-ch5-22d",
      subject: "math",
      topicId: "matrices",
      subtopicId: "determinants",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 210,
      tags: ["determinants", "trigonometry", "rotation-matrix"],
      prerequisites: ["operations", "determinants"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 22 d",
        page: 542,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(`$\\varnothing$`, `$\\varnothing$`),
          correct: true,
        },
        { id: "b", text: L(`$\\{k\\pi\\}$`, `$\\{k\\pi\\}$`), correct: false },
        {
          id: "c",
          text: L(
            `$\\{\\tfrac{\\pi}{2} + k\\pi\\}$`,
            `$\\{\\tfrac{\\pi}{2} + k\\pi\\}$`,
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            `$\\{\\tfrac{\\pi}{4} + \\tfrac{k\\pi}{2}\\}$`,
            `$\\{\\tfrac{\\pi}{4} + \\tfrac{k\\pi}{2}\\}$`,
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Determinante trigonométrico 2×2",
          "2×2 trigonometric determinant",
        ),
        statement: L(
          `Encuentre los valores de $x$ tales que la matriz $D = \\begin{pmatrix} \\operatorname{sen}(x) & \\cos(x) \\\\ -\\cos(x) & \\operatorname{sen}(x) \\end{pmatrix}$ no sea inversible.`,
          `Find the values of $x$ for which the matrix $D = \\begin{pmatrix} \\sin(x) & \\cos(x) \\\\ -\\cos(x) & \\sin(x) \\end{pmatrix}$ is not invertible.`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "No inversible significa $\\det(D) = 0$: escribe el determinante $2 \\times 2$ con senos y cosenos.",
            "Not invertible means $\\det(D) = 0$: write out the $2 \\times 2$ determinant with sines and cosines.",
          ),
          L(
            "Al expandir aparece $\\operatorname{sen}^{2}(x) + \\cos^{2}(x)$: una identidad muy conocida.",
            "Expanding produces $\\sin^{2}(x) + \\cos^{2}(x)$: a very well-known identity.",
          ),
          L(
            "¿Puede valer $0$ esa expresión para algún $x$ real?",
            "Can that expression equal $0$ for some real $x$?",
          ),
        ],
        answerDisplay: L(
          "No existe tal $x$: $\\det(D) = 1 \\ne 0$ siempre",
          "No such $x$ exists: $\\det(D) = 1 \\ne 0$ always",
        ),
        solution: [
          step(
            "given",
            `$D = \\begin{pmatrix} \\operatorname{sen}(x) & \\cos(x) \\\\ -\\cos(x) & \\operatorname{sen}(x) \\end{pmatrix}$; se buscan los $x$ con $\\det(D) = 0$.`,
            `$D = \\begin{pmatrix} \\sin(x) & \\cos(x) \\\\ -\\cos(x) & \\sin(x) \\end{pmatrix}$; we look for the $x$ with $\\det(D) = 0$.`,
          ),
          step(
            "approach",
            "Calculamos el determinante $2 \\times 2$ (diagonal principal menos diagonal secundaria) y usamos la identidad pitagórica.",
            "We compute the $2 \\times 2$ determinant (main diagonal minus anti-diagonal) and use the Pythagorean identity.",
          ),
          step(
            "calculation",
            `$\\det(D) = \\operatorname{sen}(x) \\cdot \\operatorname{sen}(x) - \\cos(x) \\cdot (-\\cos(x)) = \\operatorname{sen}^{2}(x) + \\cos^{2}(x) = 1$.`,
            `$\\det(D) = \\sin(x) \\cdot \\sin(x) - \\cos(x) \\cdot (-\\cos(x)) = \\sin^{2}(x) + \\cos^{2}(x) = 1$.`,
          ),
          step(
            "result",
            `$\\det(D) = 1 \\ne 0$ para todo $x$ real, así que $D$ nunca es singular y el conjunto solución es $\\varnothing$ (clave del libro). Comprobación: con $x = 0$, $D = \\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix}$ y $\\det(D) = 0 - (-1) = 1$ ✓; con $x = \\tfrac{\\pi}{4}$, $\\det(D) = \\tfrac{1}{2} + \\tfrac{1}{2} = 1$ ✓. (Geométricamente, $D$ es una matriz de rotación: siempre inversible.)`,
            `$\\det(D) = 1 \\ne 0$ for every real $x$, so $D$ is never singular and the solution set is $\\varnothing$ (book's key). Check: with $x = 0$, $D = \\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix}$ and $\\det(D) = 0 - (-1) = 1$ ✓; with $x = \\tfrac{\\pi}{4}$, $\\det(D) = \\tfrac{1}{2} + \\tfrac{1}{2} = 1$ ✓. (Geometrically, $D$ is a rotation matrix: always invertible.)`,
          ),
        ],
      };
    },
  ),

  /* 5 · 25 — suma de los λ con A − λI singular = traza (clave c: 7).
     Se descartó la opción impresa «5» para mantener 4 opciones. */
  template(
    {
      id: "mat-espol-ch5-25",
      subject: "math",
      topicId: "matrices",
      subtopicId: "determinants",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["determinants", "characteristic-polynomial", "eigenvalues"],
      prerequisites: ["operations", "determinants"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 25",
        page: 542,
      },
      reasoning: "parameters",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$7$`, `$7$`), correct: true },
        { id: "b", text: L(`$6$`, `$6$`), correct: false },
        { id: "c", text: L(`$1$`, `$1$`), correct: false },
        { id: "d", text: L(`$-5$`, `$-5$`), correct: false },
      ];
      return {
        skill: L(
          "Valores que hacen singular a A − λI",
          "Values that make A − λI singular",
        ),
        statement: L(
          `Sabiendo que $A = \\begin{pmatrix} 3 & -2 \\\\ -3 & 4 \\end{pmatrix}$ e $I$ es la matriz identidad, la suma de los valores de $\\lambda$ para los cuales $(A - \\lambda I)$ es una matriz singular, es:`,
          `Given that $A = \\begin{pmatrix} 3 & -2 \\\\ -3 & 4 \\end{pmatrix}$ and $I$ is the identity matrix, the sum of the values of $\\lambda$ for which $(A - \\lambda I)$ is a singular matrix is:`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "$(A - \\lambda I)$ es singular exactamente cuando $\\det(A - \\lambda I) = 0$: eso da una ecuación cuadrática en $\\lambda$.",
            "$(A - \\lambda I)$ is singular exactly when $\\det(A - \\lambda I) = 0$: that gives a quadratic equation in $\\lambda$.",
          ),
          L(
            "Al expandir el determinante queda $\\lambda^{2} - (\\text{traza de } A)\\,\\lambda + \\det(A)$.",
            "Expanding the determinant yields $\\lambda^{2} - (\\text{trace of } A)\\,\\lambda + \\det(A)$.",
          ),
          L(
            "No hace falta resolver: por Vieta, la suma de las raíces es el opuesto del coeficiente de $\\lambda$.",
            "No need to solve: by Vieta, the sum of the roots is the negative of the coefficient of $\\lambda$.",
          ),
        ],
        answerDisplay: L(`$1 + 6 = 7$`, `$1 + 6 = 7$`),
        solution: [
          step(
            "given",
            `$A = \\begin{pmatrix} 3 & -2 \\\\ -3 & 4 \\end{pmatrix}$, $I$ la identidad; se pide la suma de los $\\lambda$ tales que $\\det(A - \\lambda I) = 0$.`,
            `$A = \\begin{pmatrix} 3 & -2 \\\\ -3 & 4 \\end{pmatrix}$, $I$ the identity; we need the sum of the $\\lambda$ such that $\\det(A - \\lambda I) = 0$.`,
          ),
          step(
            "approach",
            "La condición de singularidad es la ecuación característica $\\det(A - \\lambda I) = 0$; sus raíces se pueden sumar sin resolverlas, con la relación de Vieta (suma = traza de $A$).",
            "The singularity condition is the characteristic equation $\\det(A - \\lambda I) = 0$; its roots can be summed without solving, via Vieta's relation (sum = trace of $A$).",
          ),
          step(
            "calculation",
            `$\\det(A - \\lambda I) = \\begin{vmatrix} 3-\\lambda & -2 \\\\ -3 & 4-\\lambda \\end{vmatrix} = (3-\\lambda)(4-\\lambda) - (-2)(-3)$<br>$= \\lambda^{2} - 7\\lambda + 12 - 6 = \\lambda^{2} - 7\\lambda + 6 = (\\lambda - 1)(\\lambda - 6)$.<br>Las raíces son $\\lambda = 1$ y $\\lambda = 6$, y su suma es $1 + 6 = 7$.`,
            `$\\det(A - \\lambda I) = \\begin{vmatrix} 3-\\lambda & -2 \\\\ -3 & 4-\\lambda \\end{vmatrix} = (3-\\lambda)(4-\\lambda) - (-2)(-3)$<br>$= \\lambda^{2} - 7\\lambda + 12 - 6 = \\lambda^{2} - 7\\lambda + 6 = (\\lambda - 1)(\\lambda - 6)$.<br>The roots are $\\lambda = 1$ and $\\lambda = 6$, and their sum is $1 + 6 = 7$.`,
          ),
          step(
            "result",
            `La suma pedida es $7$ (clave c del libro). Comprobación: $A - I = \\begin{pmatrix} 2 & -2 \\\\ -3 & 3 \\end{pmatrix}$ con $\\det = 6 - 6 = 0$ ✓ y $A - 6I = \\begin{pmatrix} -3 & -2 \\\\ -3 & -2 \\end{pmatrix}$ con $\\det = 6 - 6 = 0$ ✓; además $1 + 6 = 7 = 3 + 4 = \\operatorname{traza}(A)$ ✓.`,
            `The required sum is $7$ (book's key c). Check: $A - I = \\begin{pmatrix} 2 & -2 \\\\ -3 & 3 \\end{pmatrix}$ with $\\det = 6 - 6 = 0$ ✓ and $A - 6I = \\begin{pmatrix} -3 & -2 \\\\ -3 & -2 \\end{pmatrix}$ with $\\det = 6 - 6 = 0$ ✓; moreover $1 + 6 = 7 = 3 + 4 = \\operatorname{trace}(A)$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 27 — det(X) a partir de XA + B = C (clave d: −10). Se descartó la
     opción impresa «19» para mantener 4 opciones. */
  template(
    {
      id: "mat-espol-ch5-27",
      subject: "math",
      topicId: "matrices",
      subtopicId: "determinants",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 360,
      tags: ["determinants", "matrix-equations", "product-rule"],
      prerequisites: ["operations", "determinants", "matrix-equations"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 27",
        page: 543,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        { id: "a", text: L(`$-10$`, `$-10$`), correct: true },
        { id: "b", text: L(`$14$`, `$14$`), correct: false },
        { id: "c", text: L(`$-14$`, `$-14$`), correct: false },
        { id: "d", text: L(`$0$`, `$0$`), correct: false },
      ];
      return {
        skill: L(
          "Determinante de una incógnita matricial",
          "Determinant of a matrix unknown",
        ),
        statement: L(
          `Sean $A = \\begin{pmatrix} 5 & -2 \\\\ 7 & 1 \\end{pmatrix}$, $B = \\begin{pmatrix} 6 & 7 \\\\ 5 & -2 \\end{pmatrix}$ y $C = \\begin{pmatrix} -5 & 0 \\\\ -8 & 7 \\end{pmatrix}$. Sabiendo que $XA + B = C$, el $\\det(X)$ es:`,
          `Let $A = \\begin{pmatrix} 5 & -2 \\\\ 7 & 1 \\end{pmatrix}$, $B = \\begin{pmatrix} 6 & 7 \\\\ 5 & -2 \\end{pmatrix}$ and $C = \\begin{pmatrix} -5 & 0 \\\\ -8 & 7 \\end{pmatrix}$. Knowing that $XA + B = C$, $\\det(X)$ is:`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Despeja primero el producto: $XA = C - B$.",
            "Isolate the product first: $XA = C - B$.",
          ),
          L(
            "El determinante es multiplicativo: $\\det(XA) = \\det(X) \\cdot \\det(A) = \\det(C - B)$.",
            "The determinant is multiplicative: $\\det(XA) = \\det(X) \\cdot \\det(A) = \\det(C - B)$.",
          ),
          L(
            "Calcula $\\det(A)$ y comprueba que no es cero antes de dividir.",
            "Compute $\\det(A)$ and check it is nonzero before dividing.",
          ),
        ],
        answerDisplay: L(`$\\det(X) = -10$`, `$\\det(X) = -10$`),
        solution: [
          step(
            "given",
            `$A = \\begin{pmatrix} 5 & -2 \\\\ 7 & 1 \\end{pmatrix}$, $B = \\begin{pmatrix} 6 & 7 \\\\ 5 & -2 \\end{pmatrix}$, $C = \\begin{pmatrix} -5 & 0 \\\\ -8 & 7 \\end{pmatrix}$ y $XA + B = C$.`,
            `$A = \\begin{pmatrix} 5 & -2 \\\\ 7 & 1 \\end{pmatrix}$, $B = \\begin{pmatrix} 6 & 7 \\\\ 5 & -2 \\end{pmatrix}$, $C = \\begin{pmatrix} -5 & 0 \\\\ -8 & 7 \\end{pmatrix}$ and $XA + B = C$.`,
          ),
          step(
            "approach",
            "De $XA + B = C$ se sigue $XA = C - B$. Tomando determinantes y usando que $\\det(XA) = \\det(X)\\det(A)$, se despeja $\\det(X) = \\det(C - B)/\\det(A)$, siempre que $\\det(A) \\ne 0$.",
            "From $XA + B = C$ it follows that $XA = C - B$. Taking determinants and using $\\det(XA) = \\det(X)\\det(A)$, we get $\\det(X) = \\det(C - B)/\\det(A)$, provided $\\det(A) \\ne 0$.",
          ),
          step(
            "calculation",
            `$C - B = \\begin{pmatrix} -5-6 & 0-7 \\\\ -8-5 & 7-(-2) \\end{pmatrix} = \\begin{pmatrix} -11 & -7 \\\\ -13 & 9 \\end{pmatrix}$, así que $\\det(C - B) = (-11)(9) - (-7)(-13) = -99 - 91 = -190$.<br>$\\det(A) = 5 \\cdot 1 - (-2)(7) = 5 + 14 = 19 \\ne 0$.<br>$\\det(X) = \\dfrac{-190}{19} = -10$.`,
            `$C - B = \\begin{pmatrix} -5-6 & 0-7 \\\\ -8-5 & 7-(-2) \\end{pmatrix} = \\begin{pmatrix} -11 & -7 \\\\ -13 & 9 \\end{pmatrix}$, so $\\det(C - B) = (-11)(9) - (-7)(-13) = -99 - 91 = -190$.<br>$\\det(A) = 5 \\cdot 1 - (-2)(7) = 5 + 14 = 19 \\ne 0$.<br>$\\det(X) = \\dfrac{-190}{19} = -10$.`,
          ),
          step(
            "result",
            `$\\det(X) = -10$ (clave d del libro). Comprobación: con $A^{-1} = \\tfrac{1}{19}\\begin{pmatrix} 1 & 2 \\\\ -7 & 5 \\end{pmatrix}$, $X = (C - B)A^{-1} = \\begin{pmatrix} 2 & -3 \\\\ -4 & 1 \\end{pmatrix}$; entonces $XA = \\begin{pmatrix} -11 & -7 \\\\ -13 & 9 \\end{pmatrix} = C - B$, o sea $XA + B = C$ ✓, y $\\det(X) = 2 \\cdot 1 - (-3)(-4) = 2 - 12 = -10$ ✓.`,
            `$\\det(X) = -10$ (book's key d). Check: with $A^{-1} = \\tfrac{1}{19}\\begin{pmatrix} 1 & 2 \\\\ -7 & 5 \\end{pmatrix}$, $X = (C - B)A^{-1} = \\begin{pmatrix} 2 & -3 \\\\ -4 & 1 \\end{pmatrix}$; then $XA = \\begin{pmatrix} -11 & -7 \\\\ -13 & 9 \\end{pmatrix} = C - B$, i.e. $XA + B = C$ ✓, and $\\det(X) = 2 \\cdot 1 - (-3)(-4) = 2 - 12 = -10$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 30 — B se obtiene de A invirtiendo filas y columnas (dos factores
     −1 que se cancelan), F2 − 3F1 y 2×F3 → det B = 2·det A (clave d). */
  template(
    {
      id: "mat-espol-ch5-30",
      subject: "math",
      topicId: "matrices",
      subtopicId: "determinants",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 420,
      tags: ["determinants", "row-operations", "elementary-operations"],
      prerequisites: ["determinants"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 30",
        page: 543,
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            `$\\dfrac{\\det(A)}{\\det(B)} = \\dfrac{1}{2}$`,
            `$\\dfrac{\\det(A)}{\\det(B)} = \\dfrac{1}{2}$`,
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(`$\\det(B) = -5$`, `$\\det(B) = -5$`),
          correct: false,
        },
        {
          id: "c",
          text: L(`$\\det(B) = -20$`, `$\\det(B) = -20$`),
          correct: false,
        },
        {
          id: "d",
          text: L(
            `$\\det(A) \\cdot \\det(B) = 25$`,
            `$\\det(A) \\cdot \\det(B) = 25$`,
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Determinantes y operaciones elementales",
          "Determinants and elementary operations",
        ),
        statement: L(
          `Sean $A = \\begin{pmatrix} m & h & g \\\\ f & e & d \\\\ c & b & a \\end{pmatrix}$ con $\\det(A) = 10$ y $B = \\begin{pmatrix} a & b & c \\\\ d-3a & e-3b & f-3c \\\\ 2g & 2h & 2m \\end{pmatrix}$. Entonces:`,
          `Let $A = \\begin{pmatrix} m & h & g \\\\ f & e & d \\\\ c & b & a \\end{pmatrix}$ with $\\det(A) = 10$ and $B = \\begin{pmatrix} a & b & c \\\\ d-3a & e-3b & f-3c \\\\ 2g & 2h & 2m \\end{pmatrix}$. Then:`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Expresa cada fila de $B$ con las entradas de $A$: la fila 1 de $B$ es $\\begin{pmatrix} a & b & c \\end{pmatrix}$, que en $A$ aparece «al revés».",
            "Express each row of $B$ with the entries of $A$: row 1 of $B$ is $\\begin{pmatrix} a & b & c \\end{pmatrix}$, which appears «reversed» in $A$.",
          ),
          L(
            "Invertir el orden de las filas y también el de las columnas son dos intercambios: cada uno vale $-1$ y se cancelan entre sí.",
            "Reversing the order of the rows and also of the columns are two swaps: each contributes $-1$ and they cancel each other.",
          ),
          L(
            "Después de la inversión quedan solo dos operaciones: $F_2 \\to F_2 - 3F_1$ (no cambia el det) y $F_3 \\to 2F_3$ (lo multiplica por 2).",
            "After the reversal only two operations remain: $F_2 \\to F_2 - 3F_1$ (det unchanged) and $F_3 \\to 2F_3$ (multiplies it by 2).",
          ),
        ],
        answerDisplay: L(
          `$\\det(B) = 2\\det(A) = 20$, así que $\\dfrac{\\det(A)}{\\det(B)} = \\dfrac{1}{2}$`,
          `$\\det(B) = 2\\det(A) = 20$, so $\\dfrac{\\det(A)}{\\det(B)} = \\dfrac{1}{2}$`,
        ),
        solution: [
          step(
            "given",
            `$A = \\begin{pmatrix} m & h & g \\\\ f & e & d \\\\ c & b & a \\end{pmatrix}$ con $\\det(A) = 10$ y $B = \\begin{pmatrix} a & b & c \\\\ d-3a & e-3b & f-3c \\\\ 2g & 2h & 2m \\end{pmatrix}$.`,
            `$A = \\begin{pmatrix} m & h & g \\\\ f & e & d \\\\ c & b & a \\end{pmatrix}$ with $\\det(A) = 10$ and $B = \\begin{pmatrix} a & b & c \\\\ d-3a & e-3b & f-3c \\\\ 2g & 2h & 2m \\end{pmatrix}$.`,
          ),
          step(
            "approach",
            "Construimos $B$ a partir de $A$ con operaciones elementales y multiplicamos los factores que cada una aporta al determinante: intercambio de filas o columnas $-1$, suma de un múltiplo de otra fila $1$, fila por escalar $k$.",
            "We build $B$ from $A$ with elementary operations and multiply the factors each one contributes to the determinant: row or column swap $-1$, adding a multiple of another row $1$, scaling a row by $k$.",
          ),
          step(
            "calculation",
            `1) Invertir el orden de las filas y el de las columnas de $A$ produce $\\begin{pmatrix} a & b & c \\\\ d & e & f \\\\ g & h & m \\end{pmatrix}$: son **dos** intercambios (filas y columnas), así que el determinante queda $(-1)(-1)\\det(A) = \\det(A) = 10$.<br>2) $F_2 \\to F_2 - 3F_1$ da $\\begin{pmatrix} a & b & c \\\\ d-3a & e-3b & f-3c \\\\ g & h & m \\end{pmatrix}$ sin cambiar el determinante.<br>3) $F_3 \\to 2F_3$ da exactamente $B$ y multiplica el determinante por $2$.<br>Por lo tanto $\\det(B) = 2 \\cdot \\det(A) = 2 \\cdot 10 = 20$.`,
            `1) Reversing the order of the rows and of the columns of $A$ produces $\\begin{pmatrix} a & b & c \\\\ d & e & f \\\\ g & h & m \\end{pmatrix}$: those are **two** swaps (rows and columns), so the determinant becomes $(-1)(-1)\\det(A) = \\det(A) = 10$.<br>2) $F_2 \\to F_2 - 3F_1$ gives $\\begin{pmatrix} a & b & c \\\\ d-3a & e-3b & f-3c \\\\ g & h & m \\end{pmatrix}$ without changing the determinant.<br>3) $F_3 \\to 2F_3$ gives exactly $B$ and multiplies the determinant by $2$.<br>Therefore $\\det(B) = 2 \\cdot \\det(A) = 2 \\cdot 10 = 20$.`,
          ),
          step(
            "result",
            `$\\det(B) = 20$ y la afirmación verdadera es $\\dfrac{\\det(A)}{\\det(B)} = \\dfrac{10}{20} = \\dfrac{1}{2}$ (clave d del libro). Comprobación con un ejemplo numérico: para $A = \\begin{pmatrix} 2 & 1 & 0 \\\\ 0 & 1 & 3 \\\\ 1 & 0 & 1 \\end{pmatrix}$ (con $m = 2$, $h = 1$, $g = 0$, $f = 0$, $e = 1$, $d = 3$, $c = 1$, $b = 0$, $a = 1$) se tiene $\\det(A) = 5$ y $B = \\begin{pmatrix} 1 & 0 & 1 \\\\ 0 & 1 & -3 \\\\ 0 & 2 & 4 \\end{pmatrix}$ con $\\det(B) = 10 = 2 \\cdot 5$: la razón es exactamente $2$ ✓.`,
            `$\\det(B) = 20$ and the true statement is $\\dfrac{\\det(A)}{\\det(B)} = \\dfrac{10}{20} = \\dfrac{1}{2}$ (book's key d). Check with a numeric example: for $A = \\begin{pmatrix} 2 & 1 & 0 \\\\ 0 & 1 & 3 \\\\ 1 & 0 & 1 \\end{pmatrix}$ (with $m = 2$, $h = 1$, $g = 0$, $f = 0$, $e = 1$, $d = 3$, $c = 1$, $b = 0$, $a = 1$) we have $\\det(A) = 5$ and $B = \\begin{pmatrix} 1 & 0 & 1 \\\\ 0 & 1 & -3 \\\\ 0 & 2 & 4 \\end{pmatrix}$ with $\\det(B) = 10 = 2 \\cdot 5$: the ratio is exactly $2$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 31 — B por intercambios y escalados (36n); C por un intercambio y
     sumas de columnas que no alteran el det (−n) (clave exacta). */
  template(
    {
      id: "mat-espol-ch5-31",
      subject: "math",
      topicId: "matrices",
      subtopicId: "determinants",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 420,
      tags: ["determinants", "row-operations", "column-operations"],
      prerequisites: ["determinants"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 31",
        page: 543,
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(`$36n$ y $-n$`, `$36n$ and $-n$`),
          correct: true,
        },
        {
          id: "b",
          text: L(`$6n$ y $n$`, `$6n$ and $n$`),
          correct: false,
        },
        {
          id: "c",
          text: L(`$36n$ y $n$`, `$36n$ and $n$`),
          correct: false,
        },
        {
          id: "d",
          text: L(`$-36n$ y $-n$`, `$-36n$ and $-n$`),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Seguimiento de operaciones elementales en determinantes",
          "Tracking elementary operations in determinants",
        ),
        statement: L(
          `Si el determinante de $A = \\begin{pmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{pmatrix}$ es $n$, entonces los determinantes de $B = \\begin{pmatrix} 6d & 4e & 2f \\\\ 3g & 2h & i \\\\ 9a & 6b & 3c \\end{pmatrix}$ y $C = \\begin{pmatrix} d+f & e & f+e \\\\ a+c & b & c+b \\\\ g+i & h & i+h \\end{pmatrix}$ son, respectivamente:`,
          `If the determinant of $A = \\begin{pmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{pmatrix}$ is $n$, then the determinants of $B = \\begin{pmatrix} 6d & 4e & 2f \\\\ 3g & 2h & i \\\\ 9a & 6b & 3c \\end{pmatrix}$ and $C = \\begin{pmatrix} d+f & e & f+e \\\\ a+c & b & c+b \\\\ g+i & h & i+h \\end{pmatrix}$ are, respectively:`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Para $B$: busca las filas de $A$ «disfrazadas»; por ejemplo, $\\begin{pmatrix} 3g & 2h & i \\end{pmatrix}$ es la tercera fila de $A$ con las columnas escaladas por $3$, $2$ y $1$.",
            "For $B$: look for the rows of $A$ in disguise; e.g. $\\begin{pmatrix} 3g & 2h & i \\end{pmatrix}$ is the third row of $A$ with its columns scaled by $3$, $2$ and $1$.",
          ),
          L(
            "Para $B$ salen un intercambio de filas, escalados de columnas ($\\times 3$, $\\times 2$), escalados de filas ($\\times 2$, $\\times 3$) y otro intercambio: multiplica todos los factores.",
            "For $B$ you get one row swap, column scalings ($\\times 3$, $\\times 2$), row scalings ($\\times 2$, $\\times 3$) and another swap: multiply all the factors.",
          ),
          L(
            "Para $C$: intercambiando dos filas de $A$ se obtiene $\\begin{pmatrix} d & e & f \\\\ a & b & c \\\\ g & h & i \\end{pmatrix}$, y las columnas de $C$ son $C_1 + C_3$ y $C_3 + C_2$: las sumas de columnas no cambian el determinante.",
            "For $C$: swapping two rows of $A$ gives $\\begin{pmatrix} d & e & f \\\\ a & b & c \\\\ g & h & i \\end{pmatrix}$, and the columns of $C$ are $C_1 + C_3$ and $C_3 + C_2$: column additions do not change the determinant.",
          ),
        ],
        answerDisplay: L(
          `$\\det(B) = 36n$ y $\\det(C) = -n$`,
          `$\\det(B) = 36n$ and $\\det(C) = -n$`,
        ),
        solution: [
          step(
            "given",
            `$A = \\begin{pmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{pmatrix}$ con $\\det(A) = n$; se piden $\\det(B)$ y $\\det(C)$.`,
            `$A = \\begin{pmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{pmatrix}$ with $\\det(A) = n$; we need $\\det(B)$ and $\\det(C)$.`,
          ),
          step(
            "approach",
            "En ambos casos construimos la matriz nueva desde $A$ con operaciones elementales y multiplicamos los factores: intercambio $-1$, sumas de múltiplos de otras filas o columnas $1$, escalado por $k$.",
            "In both cases we build the new matrix from $A$ with elementary operations and multiply the factors: swap $-1$, adding multiples of other rows or columns $1$, scaling by $k$.",
          ),
          step(
            "calculation",
            `Para $B$: intercambiando $F_1 \\leftrightarrow F_3$ en $A$ queda $\\begin{pmatrix} g & h & i \\\\ d & e & f \\\\ a & b & c \\end{pmatrix}$ (factor $-1$); escalando $C_1 \\times 3$ y $C_2 \\times 2$ queda $\\begin{pmatrix} 3g & 2h & i \\\\ 3d & 2e & f \\\\ 3a & 2b & c \\end{pmatrix}$ (factor $6$); escalando $F_2 \\times 2$ y $F_3 \\times 3$ queda $\\begin{pmatrix} 3g & 2h & i \\\\ 6d & 4e & 2f \\\\ 9a & 6b & 3c \\end{pmatrix}$ (factor $6$); e intercambiando $F_1 \\leftrightarrow F_2$ se llega a $B$ (factor $-1$).<br>$\\det(B) = (-1) \\cdot 6 \\cdot 6 \\cdot (-1) \\cdot n = 36n$.<br>Para $C$: intercambiando $F_1 \\leftrightarrow F_2$ en $A$ queda $M = \\begin{pmatrix} d & e & f \\\\ a & b & c \\\\ g & h & i \\end{pmatrix}$ con $\\det(M) = -n$; luego $C_1 \\to C_1 + C_3$ da $\\begin{pmatrix} d+f & e & f \\\\ a+c & b & c \\\\ g+i & h & i \\end{pmatrix}$ y $C_3 \\to C_3 + C_2$ da exactamente $C$; las dos sumas de columnas no cambian el determinante.<br>$\\det(C) = \\det(M) = -n$.`,
            `For $B$: swapping $F_1 \\leftrightarrow F_3$ in $A$ gives $\\begin{pmatrix} g & h & i \\\\ d & e & f \\\\ a & b & c \\end{pmatrix}$ (factor $-1$); scaling $C_1 \\times 3$ and $C_2 \\times 2$ gives $\\begin{pmatrix} 3g & 2h & i \\\\ 3d & 2e & f \\\\ 3a & 2b & c \\end{pmatrix}$ (factor $6$); scaling $F_2 \\times 2$ and $F_3 \\times 3$ gives $\\begin{pmatrix} 3g & 2h & i \\\\ 6d & 4e & 2f \\\\ 9a & 6b & 3c \\end{pmatrix}$ (factor $6$); and swapping $F_1 \\leftrightarrow F_2$ we reach $B$ (factor $-1$).<br>$\\det(B) = (-1) \\cdot 6 \\cdot 6 \\cdot (-1) \\cdot n = 36n$.<br>For $C$: swapping $F_1 \\leftrightarrow F_2$ in $A$ gives $M = \\begin{pmatrix} d & e & f \\\\ a & b & c \\\\ g & h & i \\end{pmatrix}$ with $\\det(M) = -n$; then $C_1 \\to C_1 + C_3$ gives $\\begin{pmatrix} d+f & e & f \\\\ a+c & b & c \\\\ g+i & h & i \\end{pmatrix}$ and $C_3 \\to C_3 + C_2$ gives exactly $C$; the two column additions do not change the determinant.<br>$\\det(C) = \\det(M) = -n$.`,
          ),
          step(
            "result",
            `$\\det(B) = 36n$ y $\\det(C) = -n$ (clave exacta del libro). Comprobación numérica: con $A = \\begin{pmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\\\ 7 & 8 & 10 \\end{pmatrix}$ se tiene $n = \\det(A) = -3$; entonces $B = \\begin{pmatrix} 24 & 20 & 12 \\\\ 21 & 16 & 10 \\\\ 9 & 12 & 9 \\end{pmatrix}$ con $\\det(B) = -108 = 36 \\cdot (-3)$ ✓ y $C = \\begin{pmatrix} 10 & 5 & 11 \\\\ 4 & 2 & 5 \\\\ 17 & 8 & 18 \\end{pmatrix}$ con $\\det(C) = 3 = -(-3)$ ✓.`,
            `$\\det(B) = 36n$ and $\\det(C) = -n$ (book's key, exact). Numeric check: with $A = \\begin{pmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\\\ 7 & 8 & 10 \\end{pmatrix}$ we have $n = \\det(A) = -3$; then $B = \\begin{pmatrix} 24 & 20 & 12 \\\\ 21 & 16 & 10 \\\\ 9 & 12 & 9 \\end{pmatrix}$ with $\\det(B) = -108 = 36 \\cdot (-3)$ ✓ and $C = \\begin{pmatrix} 10 & 5 & 11 \\\\ 4 & 2 & 5 \\\\ 17 & 8 & 18 \\end{pmatrix}$ with $\\det(C) = 3 = -(-3)$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 32 — Cj − C4 vuelve triangular la matriz: det = x(x+1)³ → {−1, 0}
     (clave exacta). */
  template(
    {
      id: "mat-espol-ch5-32",
      subject: "math",
      topicId: "matrices",
      subtopicId: "determinants",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 420,
      tags: ["determinants", "truth-set", "factorization"],
      prerequisites: ["determinants"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 32",
        page: 544,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(`$\\{-1, 0\\}$`, `$\\{-1, 0\\}$`),
          correct: true,
        },
        { id: "b", text: L(`$\\{0\\}$`, `$\\{0\\}$`), correct: false },
        { id: "c", text: L(`$\\{-1\\}$`, `$\\{-1\\}$`), correct: false },
        {
          id: "d",
          text: L(`$\\{-1, 0, 1\\}$`, `$\\{-1, 0, 1\\}$`),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Conjunto de verdad de un determinante 4×4",
          "Truth set of a 4×4 determinant",
        ),
        statement: L(
          `Sea $x \\in \\mathbb{R}$. Encuentre el conjunto de verdad $A_{p(x)}$ si $p(x): \\det\\begin{pmatrix} x+2 & 1 & 1 & 1 \\\\ 1 & x+2 & 1 & 1 \\\\ 1 & 1 & x+2 & 1 \\\\ x & x & x & x \\end{pmatrix} = 0$.`,
          `Let $x \\in \\mathbb{R}$. Find the truth set $A_{p(x)}$ if $p(x): \\det\\begin{pmatrix} x+2 & 1 & 1 & 1 \\\\ 1 & x+2 & 1 & 1 \\\\ 1 & 1 & x+2 & 1 \\\\ x & x & x & x \\end{pmatrix} = 0$.`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "La última fila es $x \\cdot \\begin{pmatrix} 1 & 1 & 1 & 1 \\end{pmatrix}$: intenta operaciones de columna que usen $C_4$.",
            "The last row is $x \\cdot \\begin{pmatrix} 1 & 1 & 1 & 1 \\end{pmatrix}$: try column operations that use $C_4$.",
          ),
          L(
            "Resta la cuarta columna a las tres primeras ($C_j \\to C_j - C_4$): el determinante no cambia y la matriz se vuelve triangular superior.",
            "Subtract the fourth column from the first three ($C_j \\to C_j - C_4$): the determinant does not change and the matrix becomes upper triangular.",
          ),
          L(
            "El determinante de una matriz triangular es el producto de su diagonal.",
            "The determinant of a triangular matrix is the product of its diagonal.",
          ),
        ],
        answerDisplay: L(
          `$A_{p(x)} = \\{-1, 0\\}$`,
          `$A_{p(x)} = \\{-1, 0\\}$`,
        ),
        solution: [
          step(
            "given",
            `Se pide el conjunto de verdad de $\\det\\begin{pmatrix} x+2 & 1 & 1 & 1 \\\\ 1 & x+2 & 1 & 1 \\\\ 1 & 1 & x+2 & 1 \\\\ x & x & x & x \\end{pmatrix} = 0$.`,
            `We need the truth set of $\\det\\begin{pmatrix} x+2 & 1 & 1 & 1 \\\\ 1 & x+2 & 1 & 1 \\\\ 1 & 1 & x+2 & 1 \\\\ x & x & x & x \\end{pmatrix} = 0$.`,
          ),
          step(
            "approach",
            "Con operaciones de columna del tipo «suma de un múltiplo de otra columna» el determinante no cambia. Restando $C_4$ a las demás columnas la matriz se simplifica muchísimo.",
            "Column operations of the type «add a multiple of another column» leave the determinant unchanged. Subtracting $C_4$ from the other columns simplifies the matrix a great deal.",
          ),
          step(
            "calculation",
            `Con $C_1 \\to C_1 - C_4$, $C_2 \\to C_2 - C_4$ y $C_3 \\to C_3 - C_4$ la matriz queda $\\begin{pmatrix} x+1 & 0 & 0 & 1 \\\\ 0 & x+1 & 0 & 1 \\\\ 0 & 0 & x+1 & 1 \\\\ 0 & 0 & 0 & x \\end{pmatrix}$, que es triangular superior.<br>$\\det = (x+1)(x+1)(x+1) \\cdot x = x(x+1)^{3}$.<br>$x(x+1)^{3} = 0 \\iff x = 0$ o $x = -1$.`,
            `With $C_1 \\to C_1 - C_4$, $C_2 \\to C_2 - C_4$ and $C_3 \\to C_3 - C_4$ the matrix becomes $\\begin{pmatrix} x+1 & 0 & 0 & 1 \\\\ 0 & x+1 & 0 & 1 \\\\ 0 & 0 & x+1 & 1 \\\\ 0 & 0 & 0 & x \\end{pmatrix}$, which is upper triangular.<br>$\\det = (x+1)(x+1)(x+1) \\cdot x = x(x+1)^{3}$.<br>$x(x+1)^{3} = 0 \\iff x = 0$ or $x = -1$.`,
          ),
          step(
            "result",
            `$A_{p(x)} = \\{-1, 0\\}$ (clave exacta del libro). Comprobación: con $x = 0$ la última fila es nula, así que el determinante es $0$ ✓; con $x = -1$ las tres primeras filas son iguales a $\\begin{pmatrix} 1 & 1 & 1 & 1 \\end{pmatrix}$, así que el determinante también es $0$ ✓; en cambio con $x = 1$ el determinante es $1 \\cdot 2^{3} = 8 \\ne 0$ ✓.`,
            `$A_{p(x)} = \\{-1, 0\\}$ (book's key, exact). Check: with $x = 0$ the last row is zero, so the determinant is $0$ ✓; with $x = -1$ the first three rows all equal $\\begin{pmatrix} 1 & 1 & 1 & 1 \\end{pmatrix}$, so the determinant is also $0$ ✓; by contrast with $x = 1$ the determinant is $1 \\cdot 2^{3} = 8 \\ne 0$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 33 — f(x) = ax³ + bx² − 2ax + 3b; f(0) = 3b y f(1) = f(−1) fuerza
     a = 0 → (a, b) = (0, −1) (clave exacta). */
  template(
    {
      id: "mat-espol-ch5-33",
      subject: "math",
      topicId: "matrices",
      subtopicId: "determinants",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 420,
      tags: ["determinants", "cofactor-expansion", "parameters"],
      prerequisites: ["determinants"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 33",
        page: 544,
      },
      reasoning: "parameters",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(`$a = 0$, $b = -1$`, `$a = 0$, $b = -1$`),
          correct: true,
        },
        {
          id: "b",
          text: L(`$a = -1$, $b = 0$`, `$a = -1$, $b = 0$`),
          correct: false,
        },
        {
          id: "c",
          text: L(`$a = 1$, $b = -1$`, `$a = 1$, $b = -1$`),
          correct: false,
        },
        {
          id: "d",
          text: L(`$a = 0$, $b = 1$`, `$a = 0$, $b = 1$`),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Parámetros dentro de un determinante 4×4",
          "Parameters inside a 4×4 determinant",
        ),
        statement: L(
          `Considere la función $f(x) = \\det\\begin{pmatrix} a & b & -2a & 3b \\\\ -1 & x & 0 & 0 \\\\ 0 & -1 & x & 0 \\\\ 0 & 0 & -1 & x \\end{pmatrix}$. Sabiendo que $f(0) = -3$ y $f(1) = f(-1)$, determine $a$ y $b$.`,
          `Consider the function $f(x) = \\det\\begin{pmatrix} a & b & -2a & 3b \\\\ -1 & x & 0 & 0 \\\\ 0 & -1 & x & 0 \\\\ 0 & 0 & -1 & x \\end{pmatrix}$. Knowing that $f(0) = -3$ and $f(1) = f(-1)$, determine $a$ and $b$.`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Expande el determinante por la primera fila: los menores $3 \\times 3$ son casi triangulares y dan potencias de $x$.",
            "Expand the determinant along the first row: the $3 \\times 3$ minors are nearly triangular and give powers of $x$.",
          ),
          L(
            "Con los signos correctos queda $f(x) = ax^{3} + bx^{2} - 2ax + 3b$.",
            "With the right signs you get $f(x) = ax^{3} + bx^{2} - 2ax + 3b$.",
          ),
          L(
            "Evalúa $f(0)$ (solo sobrevive el término independiente) e iguala $f(1)$ con $f(-1)$: los términos pares se cancelan y queda una condición sobre $a$.",
            "Evaluate $f(0)$ (only the constant term survives) and set $f(1)$ equal to $f(-1)$: the even terms cancel and one condition on $a$ remains.",
          ),
        ],
        answerDisplay: L(`$a = 0$, $b = -1$`, `$a = 0$, $b = -1$`),
        solution: [
          step(
            "given",
            `$f(x) = \\det\\begin{pmatrix} a & b & -2a & 3b \\\\ -1 & x & 0 & 0 \\\\ 0 & -1 & x & 0 \\\\ 0 & 0 & -1 & x \\end{pmatrix}$, con $f(0) = -3$ y $f(1) = f(-1)$.`,
            `$f(x) = \\det\\begin{pmatrix} a & b & -2a & 3b \\\\ -1 & x & 0 & 0 \\\\ 0 & -1 & x & 0 \\\\ 0 & 0 & -1 & x \\end{pmatrix}$, with $f(0) = -3$ and $f(1) = f(-1)$.`,
          ),
          step(
            "approach",
            "Expandimos por la primera fila: cada menor es un determinante triangular por bloques, así que $f(x)$ es un polinomio en $x$ con coeficientes $a$ y $b$. Después imponemos las dos condiciones.",
            "We expand along the first row: each minor is a triangular-by-blocks determinant, so $f(x)$ is a polynomial in $x$ with coefficients involving $a$ and $b$. Then we impose the two conditions.",
          ),
          step(
            "calculation",
            `Los cuatro menores con sus signos: $C_{11} = x^{3}$, $C_{12} = x^{2}$, $C_{13} = x$ y $C_{14} = 1$, así que<br>$f(x) = a \\cdot x^{3} + b \\cdot x^{2} + (-2a) \\cdot x + 3b \\cdot 1 = ax^{3} + bx^{2} - 2ax + 3b$.<br>$f(0) = 3b = -3 \\Rightarrow b = -1$.<br>$f(1) = a + b - 2a + 3b = -a + 4b$ y $f(-1) = -a + b + 2a + 3b = a + 4b$; al igualarlas, $-a + 4b = a + 4b \\Rightarrow a = 0$.`,
            `The four minors with their signs: $C_{11} = x^{3}$, $C_{12} = x^{2}$, $C_{13} = x$ and $C_{14} = 1$, so<br>$f(x) = a \\cdot x^{3} + b \\cdot x^{2} + (-2a) \\cdot x + 3b \\cdot 1 = ax^{3} + bx^{2} - 2ax + 3b$.<br>$f(0) = 3b = -3 \\Rightarrow b = -1$.<br>$f(1) = a + b - 2a + 3b = -a + 4b$ and $f(-1) = -a + b + 2a + 3b = a + 4b$; equating them, $-a + 4b = a + 4b \\Rightarrow a = 0$.`,
          ),
          step(
            "result",
            `$a = 0$ y $b = -1$ (clave exacta del libro). Comprobación: con $(a, b) = (0, -1)$ queda $f(x) = -x^{2} - 3$, y en efecto $f(0) = -3$ ✓ y $f(1) = -4 = f(-1)$ ✓.`,
            `$a = 0$ and $b = -1$ (book's key, exact). Check: with $(a, b) = (0, -1)$ we get $f(x) = -x^{2} - 3$, and indeed $f(0) = -3$ ✓ and $f(1) = -4 = f(-1)$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 34 — la FALSA escala las DOS filas por k (el factor es k², no k)
     (clave e). Se descartó la opción impresa del k³ para mantener 4. */
  template(
    {
      id: "mat-espol-ch5-34",
      subject: "math",
      topicId: "matrices",
      subtopicId: "determinants",
      difficulty: "medium",
      questionType: "multiple-choice",
      estimatedTimeSec: 210,
      tags: ["determinants", "properties", "counterexample"],
      prerequisites: ["determinants"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 34",
        page: 544,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            `$\\forall a, b, c, d, k \\in \\mathbb{R}: \\begin{vmatrix} ka & kb \\\\ kc & kd \\end{vmatrix} = k\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix}$`,
            `$\\forall a, b, c, d, k \\in \\mathbb{R}: \\begin{vmatrix} ka & kb \\\\ kc & kd \\end{vmatrix} = k\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix}$`,
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            `$\\forall a, b, c, d, k \\in \\mathbb{R}: \\begin{vmatrix} ka & kb \\\\ c & d \\end{vmatrix} = k\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix}$`,
            `$\\forall a, b, c, d, k \\in \\mathbb{R}: \\begin{vmatrix} ka & kb \\\\ c & d \\end{vmatrix} = k\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix}$`,
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            `$\\forall a, b, c, d \\in \\mathbb{R}: \\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = \\begin{vmatrix} d & c \\\\ b & a \\end{vmatrix}$`,
            `$\\forall a, b, c, d \\in \\mathbb{R}: \\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = \\begin{vmatrix} d & c \\\\ b & a \\end{vmatrix}$`,
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            `$\\forall a, b, c, d \\in \\mathbb{R}: \\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = \\begin{vmatrix} a & c \\\\ b & d \\end{vmatrix}$`,
            `$\\forall a, b, c, d \\in \\mathbb{R}: \\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = \\begin{vmatrix} a & c \\\\ b & d \\end{vmatrix}$`,
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Propiedades del determinante 2×2",
          "Properties of the 2×2 determinant",
        ),
        statement: L(
          "Una de las siguientes proposiciones es FALSA, identifíquela:",
          "One of the following statements is FALSE, identify it:",
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Prueba cada proposición con números concretos, por ejemplo $a = 1$, $b = 2$, $c = 3$, $d = 4$ y $k = 2$.",
            "Test each statement with concrete numbers, e.g. $a = 1$, $b = 2$, $c = 3$, $d = 4$ and $k = 2$.",
          ),
          L(
            "El determinante es lineal en cada fila: escalar **una** fila por $k$ multiplica el determinante por $k$. ¿Y si se escalan las **dos** filas?",
            "The determinant is linear in each row: scaling **one** row by $k$ multiplies the determinant by $k$. What if **both** rows are scaled?",
          ),
          L(
            "Recuerda también que $\\det(A^{T}) = \\det(A)$ y que dos intercambios seguidos (de filas y de columnas) se cancelan.",
            "Recall also that $\\det(A^{T}) = \\det(A)$ and that two consecutive swaps (rows and columns) cancel out.",
          ),
        ],
        answerDisplay: L(
          "La falsa es $\\begin{vmatrix} ka & kb \\\\ kc & kd \\end{vmatrix} = k\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix}$: el factor correcto es $k^{2}$",
          "The false one is $\\begin{vmatrix} ka & kb \\\\ kc & kd \\end{vmatrix} = k\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix}$: the correct factor is $k^{2}$",
        ),
        solution: [
          step(
            "given",
            "Cuatro proposiciones sobre determinantes $2 \\times 2$; exactamente una es falsa.",
            "Four statements about $2 \\times 2$ determinants; exactly one is false.",
          ),
          step(
            "approach",
            "El determinante es lineal en cada fila por separado. Escalar una fila por $k$ multiplica el determinante por $k$; escalar las dos filas lo multiplica por $k \\cdot k = k^{2}$. Las demás proposiciones se confirman con la traspuesta y con el efecto cancelatorio de dos intercambios.",
            "The determinant is linear in each row separately. Scaling one row by $k$ multiplies the determinant by $k$; scaling both rows multiplies it by $k \\cdot k = k^{2}$. The other statements are confirmed via the transpose and the cancellation of two swaps.",
          ),
          step(
            "calculation",
            `Proposición falsa (escalar las dos filas): con $a = 1$, $b = 2$, $c = 3$, $d = 4$, $k = 2$:<br>$\\begin{vmatrix} 2 & 4 \\\\ 6 & 8 \\end{vmatrix} = 16 - 24 = -8$, pero $2 \\begin{vmatrix} 1 & 2 \\\\ 3 & 4 \\end{vmatrix} = 2(4 - 6) = -4 \\ne -8$; el factor correcto es $k^{2} = 4$, pues $4(4 - 6) = -8$.<br>Las otras tres son verdaderas: escalar **una sola** fila sí factoriza $k$; $\\begin{vmatrix} d & c \\\\ b & a \\end{vmatrix} = da - cb = ad - bc$ (intercambio de filas y de columnas: dos signos $-$ que se cancelan); y $\\begin{vmatrix} a & c \\\\ b & d \\end{vmatrix} = ad - cb$ es la traspuesta, con el mismo determinante.`,
            `False statement (scaling both rows): with $a = 1$, $b = 2$, $c = 3$, $d = 4$, $k = 2$:<br>$\\begin{vmatrix} 2 & 4 \\\\ 6 & 8 \\end{vmatrix} = 16 - 24 = -8$, but $2 \\begin{vmatrix} 1 & 2 \\\\ 3 & 4 \\end{vmatrix} = 2(4 - 6) = -4 \\ne -8$; the correct factor is $k^{2} = 4$, since $4(4 - 6) = -8$.<br>The other three are true: scaling **a single** row does factor out $k$; $\\begin{vmatrix} d & c \\\\ b & a \\end{vmatrix} = da - cb = ad - bc$ (a row and a column swap: two $-$ signs that cancel); and $\\begin{vmatrix} a & c \\\\ b & d \\end{vmatrix} = ad - cb$ is the transpose, with the same determinant.`,
          ),
          step(
            "result",
            `La proposición FALSA es $\\begin{vmatrix} ka & kb \\\\ kc & kd \\end{vmatrix} = k\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix}$ (clave e del libro): el factor correcto es $k^{2}$. Comprobación numérica: $\\begin{vmatrix} 2 & 4 \\\\ 6 & 8 \\end{vmatrix} = -8$ y $2^{2}\\begin{vmatrix} 1 & 2 \\\\ 3 & 4 \\end{vmatrix} = 4 \\cdot (-2) = -8$ ✓.`,
            `The FALSE statement is $\\begin{vmatrix} ka & kb \\\\ kc & kd \\end{vmatrix} = k\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix}$ (book's key e): the correct factor is $k^{2}$. Numeric check: $\\begin{vmatrix} 2 & 4 \\\\ 6 & 8 \\end{vmatrix} = -8$ and $2^{2}\\begin{vmatrix} 1 & 2 \\\\ 3 & 4 \\end{vmatrix} = 4 \\cdot (-2) = -8$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 36 — cos²α − senα = 1 → senα(senα + 1) = 0 (clave: kπ o
     −π/2 + 2kπ). */
  template(
    {
      id: "mat-espol-ch5-36",
      subject: "math",
      topicId: "matrices",
      subtopicId: "determinants",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 270,
      tags: ["determinants", "trigonometry", "factoring"],
      prerequisites: ["determinants"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 36",
        page: 544,
      },
      reasoning: "case-analysis",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            `$\\alpha = k\\pi$ o $\\alpha = -\\tfrac{\\pi}{2} + 2k\\pi$, $k \\in \\mathbb{Z}$`,
            `$\\alpha = k\\pi$ or $\\alpha = -\\tfrac{\\pi}{2} + 2k\\pi$, $k \\in \\mathbb{Z}$`,
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            `Solo $\\alpha = k\\pi$, $k \\in \\mathbb{Z}$`,
            `Only $\\alpha = k\\pi$, $k \\in \\mathbb{Z}$`,
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            `$\\alpha = \\tfrac{\\pi}{2} + k\\pi$, $k \\in \\mathbb{Z}$`,
            `$\\alpha = \\tfrac{\\pi}{2} + k\\pi$, $k \\in \\mathbb{Z}$`,
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            `Solo $\\alpha = 2k\\pi$, $k \\in \\mathbb{Z}$`,
            `Only $\\alpha = 2k\\pi$, $k \\in \\mathbb{Z}$`,
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Ecuación trigonométrica con determinante",
          "Trigonometric equation with a determinant",
        ),
        statement: L(
          `Hallar $\\alpha \\in \\mathbb{R}$ de modo que $\\det(A) = 1$, para $A = \\begin{pmatrix} \\cos(\\alpha) & 1 \\\\ \\operatorname{sen}(\\alpha) & \\cos(\\alpha) \\end{pmatrix}$.`,
          `Find $\\alpha \\in \\mathbb{R}$ such that $\\det(A) = 1$, for $A = \\begin{pmatrix} \\cos(\\alpha) & 1 \\\\ \\sin(\\alpha) & \\cos(\\alpha) \\end{pmatrix}$.`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Escribe el determinante: $\\det(A) = \\cos^{2}(\\alpha) - \\operatorname{sen}(\\alpha)$.",
            "Write out the determinant: $\\det(A) = \\cos^{2}(\\alpha) - \\sin(\\alpha)$.",
          ),
          L(
            "Sustituye $\\cos^{2}(\\alpha) = 1 - \\operatorname{sen}^{2}(\\alpha)$ para dejar todo en función de $\\operatorname{sen}(\\alpha)$.",
            "Substitute $\\cos^{2}(\\alpha) = 1 - \\sin^{2}(\\alpha)$ to leave everything in terms of $\\sin(\\alpha)$.",
          ),
          L(
            "La ecuación se reduce a $\\operatorname{sen}(\\alpha)\\left(\\operatorname{sen}(\\alpha) + 1\\right) = 0$: resuelve cada factor por separado.",
            "The equation reduces to $\\sin(\\alpha)\\left(\\sin(\\alpha) + 1\\right) = 0$: solve each factor separately.",
          ),
        ],
        answerDisplay: L(
          `$\\alpha = k\\pi$ o $\\alpha = -\\tfrac{\\pi}{2} + 2k\\pi$, $k \\in \\mathbb{Z}$`,
          `$\\alpha = k\\pi$ or $\\alpha = -\\tfrac{\\pi}{2} + 2k\\pi$, $k \\in \\mathbb{Z}$`,
        ),
        solution: [
          step(
            "given",
            `$A = \\begin{pmatrix} \\cos(\\alpha) & 1 \\\\ \\operatorname{sen}(\\alpha) & \\cos(\\alpha) \\end{pmatrix}$ y se pide $\\det(A) = 1$.`,
            `$A = \\begin{pmatrix} \\cos(\\alpha) & 1 \\\\ \\sin(\\alpha) & \\cos(\\alpha) \\end{pmatrix}$ and we need $\\det(A) = 1$.`,
          ),
          step(
            "approach",
            "El determinante es $\\cos^{2}(\\alpha) - \\operatorname{sen}(\\alpha)$. Con la identidad pitagórica la ecuación queda como un polinomio en $\\operatorname{sen}(\\alpha)$ que se factoriza.",
            "The determinant is $\\cos^{2}(\\alpha) - \\sin(\\alpha)$. With the Pythagorean identity the equation becomes a polynomial in $\\sin(\\alpha)$ that factors.",
          ),
          step(
            "calculation",
            `$\\cos^{2}(\\alpha) - \\operatorname{sen}(\\alpha) = 1 \\Rightarrow 1 - \\operatorname{sen}^{2}(\\alpha) - \\operatorname{sen}(\\alpha) = 1$<br>$\\Rightarrow -\\operatorname{sen}^{2}(\\alpha) - \\operatorname{sen}(\\alpha) = 0 \\Rightarrow \\operatorname{sen}^{2}(\\alpha) + \\operatorname{sen}(\\alpha) = 0$<br>$\\Rightarrow \\operatorname{sen}(\\alpha)\\left(\\operatorname{sen}(\\alpha) + 1\\right) = 0$.<br>Entonces $\\operatorname{sen}(\\alpha) = 0 \\Rightarrow \\alpha = k\\pi$, o bien $\\operatorname{sen}(\\alpha) = -1 \\Rightarrow \\alpha = -\\tfrac{\\pi}{2} + 2k\\pi$.`,
            `$\\cos^{2}(\\alpha) - \\sin(\\alpha) = 1 \\Rightarrow 1 - \\sin^{2}(\\alpha) - \\sin(\\alpha) = 1$<br>$\\Rightarrow -\\sin^{2}(\\alpha) - \\sin(\\alpha) = 0 \\Rightarrow \\sin^{2}(\\alpha) + \\sin(\\alpha) = 0$<br>$\\Rightarrow \\sin(\\alpha)\\left(\\sin(\\alpha) + 1\\right) = 0$.<br>Then $\\sin(\\alpha) = 0 \\Rightarrow \\alpha = k\\pi$, or else $\\sin(\\alpha) = -1 \\Rightarrow \\alpha = -\\tfrac{\\pi}{2} + 2k\\pi$.`,
          ),
          step(
            "result",
            `$\\alpha = k\\pi$ o $\\alpha = -\\tfrac{\\pi}{2} + 2k\\pi$, con $k \\in \\mathbb{Z}$ (clave exacta del libro). Comprobación: con $\\alpha = \\pi$, $\\det(A) = \\cos^{2}(\\pi) - \\operatorname{sen}(\\pi) = 1 - 0 = 1$ ✓; con $\\alpha = -\\tfrac{\\pi}{2}$, $\\det(A) = 0 - (-1) = 1$ ✓; en cambio con $\\alpha = \\tfrac{\\pi}{6}$, $\\det(A) = \\tfrac{3}{4} - \\tfrac{1}{2} = \\tfrac{1}{4} \\ne 1$ ✓.`,
            `$\\alpha = k\\pi$ or $\\alpha = -\\tfrac{\\pi}{2} + 2k\\pi$, with $k \\in \\mathbb{Z}$ (book's key, exact). Check: with $\\alpha = \\pi$, $\\det(A) = \\cos^{2}(\\pi) - \\sin(\\pi) = 1 - 0 = 1$ ✓; with $\\alpha = -\\tfrac{\\pi}{2}$, $\\det(A) = 0 - (-1) = 1$ ✓; by contrast with $\\alpha = \\tfrac{\\pi}{6}$, $\\det(A) = \\tfrac{3}{4} - \\tfrac{1}{2} = \\tfrac{1}{4} \\ne 1$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 39 — F3 − F1 − F2 y Pitágoras → 1 + cos x (clave c). Se descartó la
     opción impresa «sen²(x) + sen(x) + cos(x)». */
  template(
    {
      id: "mat-espol-ch5-39",
      subject: "math",
      topicId: "matrices",
      subtopicId: "determinants",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 420,
      tags: ["determinants", "trigonometry", "row-operations"],
      prerequisites: ["determinants"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 39",
        page: 545,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(`$1 + \\cos(x)$`, `$1 + \\cos(x)$`),
          correct: true,
        },
        { id: "b", text: L(`$-1$`, `$-1$`), correct: false },
        { id: "c", text: L(`$1$`, `$1$`), correct: false },
        {
          id: "d",
          text: L(
            `$\\cos^{2}(x) - \\operatorname{sen}(x)$`,
            `$\\cos^{2}(x) - \\sin(x)$`,
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Determinante trigonométrico 3×3 con operaciones de fila",
          "3×3 trigonometric determinant with row operations",
        ),
        statement: L(
          `El valor del determinante $\\begin{vmatrix} \\operatorname{sen}(x) & \\cos(x) & \\operatorname{sen}(x) \\\\ \\cos(x)-\\operatorname{sen}(x) & -\\operatorname{sen}(x) & \\cos(x) \\\\ 1+\\cos(x)+\\operatorname{sen}(x) & \\cos(x) & \\operatorname{sen}(x) \\end{vmatrix}$ es:`,
          `The value of the determinant $\\begin{vmatrix} \\sin(x) & \\cos(x) & \\sin(x) \\\\ \\cos(x)-\\sin(x) & -\\sin(x) & \\cos(x) \\\\ 1+\\cos(x)+\\sin(x) & \\cos(x) & \\sin(x) \\end{vmatrix}$ is:`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Las operaciones de fila del tipo $F_i \\to F_i - aF_j - bF_k$ no cambian el determinante. Mira la tercera fila: $1 + \\cos + \\operatorname{sen}$ parece una suma de trozos de las filas 1 y 2.",
            "Row operations of the type $F_i \\to F_i - aF_j - bF_k$ do not change the determinant. Look at the third row: $1 + \\cos + \\sin$ looks like a sum of pieces of rows 1 and 2.",
          ),
          L(
            "Con $F_3 \\to F_3 - F_1 - F_2$ la tercera fila se convierte en $\\begin{pmatrix} 1+\\operatorname{sen}(x) & \\operatorname{sen}(x) & -\\cos(x) \\end{pmatrix}$.",
            "With $F_3 \\to F_3 - F_1 - F_2$ the third row becomes $\\begin{pmatrix} 1+\\sin(x) & \\sin(x) & -\\cos(x) \\end{pmatrix}$.",
          ),
          L(
            "Expande por la nueva tercera fila: dos de los menores $2 \\times 2$ se simplifican con $\\operatorname{sen}^{2} + \\cos^{2} = 1$.",
            "Expand along the new third row: two of the $2 \\times 2$ minors simplify via $\\sin^{2} + \\cos^{2} = 1$.",
          ),
        ],
        answerDisplay: L(`$1 + \\cos(x)$`, `$1 + \\cos(x)$`),
        solution: [
          step(
            "given",
            `Se pide el valor de $\\begin{vmatrix} \\operatorname{sen}(x) & \\cos(x) & \\operatorname{sen}(x) \\\\ \\cos(x)-\\operatorname{sen}(x) & -\\operatorname{sen}(x) & \\cos(x) \\\\ 1+\\cos(x)+\\operatorname{sen}(x) & \\cos(x) & \\operatorname{sen}(x) \\end{vmatrix}$.`,
            `We need the value of $\\begin{vmatrix} \\sin(x) & \\cos(x) & \\sin(x) \\\\ \\cos(x)-\\sin(x) & -\\sin(x) & \\cos(x) \\\\ 1+\\cos(x)+\\sin(x) & \\cos(x) & \\sin(x) \\end{vmatrix}$.`,
          ),
          step(
            "approach",
            "La tercera fila contiene trozos de las otras dos: la operación $F_3 \\to F_3 - F_1 - F_2$ (que no cambia el determinante) la simplifica, y luego conviene expandir por esa fila.",
            "The third row contains pieces of the other two: the operation $F_3 \\to F_3 - F_1 - F_2$ (which does not change the determinant) simplifies it, and then it pays to expand along that row.",
          ),
          step(
            "calculation",
            `$F_3 \\to F_3 - F_1 - F_2$ da la fila $\\begin{pmatrix} 1+\\operatorname{sen}(x) & \\operatorname{sen}(x) & -\\cos(x) \\end{pmatrix}$. Expandiendo por ella:<br>$(1+\\operatorname{sen})\\begin{vmatrix} \\cos & \\operatorname{sen} \\\\ -\\operatorname{sen} & \\cos \\end{vmatrix} - \\operatorname{sen}\\begin{vmatrix} \\operatorname{sen} & \\operatorname{sen} \\\\ \\cos-\\operatorname{sen} & \\cos \\end{vmatrix} - \\cos\\begin{vmatrix} \\operatorname{sen} & \\cos \\\\ \\cos-\\operatorname{sen} & -\\operatorname{sen} \\end{vmatrix}$<br>$= (1+\\operatorname{sen})(\\cos^{2}+\\operatorname{sen}^{2}) - \\operatorname{sen} \\cdot \\operatorname{sen}^{2} - \\cos(\\operatorname{sen}\\cos - 1)$<br>$= 1 + \\operatorname{sen} - \\operatorname{sen}^{3} - \\operatorname{sen}\\cos^{2} + \\cos = 1 + \\cos + \\operatorname{sen}\\left(1 - \\operatorname{sen}^{2} - \\cos^{2}\\right) = 1 + \\cos$.`,
            `$F_3 \\to F_3 - F_1 - F_2$ gives the row $\\begin{pmatrix} 1+\\sin(x) & \\sin(x) & -\\cos(x) \\end{pmatrix}$. Expanding along it:<br>$(1+\\sin)\\begin{vmatrix} \\cos & \\sin \\\\ -\\sin & \\cos \\end{vmatrix} - \\sin\\begin{vmatrix} \\sin & \\sin \\\\ \\cos-\\sin & \\cos \\end{vmatrix} - \\cos\\begin{vmatrix} \\sin & \\cos \\\\ \\cos-\\sin & -\\sin \\end{vmatrix}$<br>$= (1+\\sin)(\\cos^{2}+\\sin^{2}) - \\sin \\cdot \\sin^{2} - \\cos(\\sin\\cos - 1)$<br>$= 1 + \\sin - \\sin^{3} - \\sin\\cos^{2} + \\cos = 1 + \\cos + \\sin\\left(1 - \\sin^{2} - \\cos^{2}\\right) = 1 + \\cos$.`,
          ),
          step(
            "result",
            `El determinante vale $1 + \\cos(x)$ (clave c del libro). Comprobación: con $x = 0$ el determinante es el de $\\begin{pmatrix} 0 & 1 & 0 \\\\ 1 & 0 & 1 \\\\ 2 & 1 & 0 \\end{pmatrix}$, que expandido por la primera fila da $0 - 1 \\cdot (0 - 2) + 0 = 2$, y en efecto $1 + \\cos(0) = 2$ ✓; con $x = \\tfrac{\\pi}{2}$ el determinante da $1$ y $1 + \\cos\\left(\\tfrac{\\pi}{2}\\right) = 1$ ✓.`,
            `The determinant equals $1 + \\cos(x)$ (book's key c). Check: with $x = 0$ the determinant is that of $\\begin{pmatrix} 0 & 1 & 0 \\\\ 1 & 0 & 1 \\\\ 2 & 1 & 0 \\end{pmatrix}$, which expanded along the first row gives $0 - 1 \\cdot (0 - 2) + 0 = 2$, and indeed $1 + \\cos(0) = 2$ ✓; with $x = \\tfrac{\\pi}{2}$ the determinant gives $1$ and $1 + \\cos\\left(\\tfrac{\\pi}{2}\\right) = 1$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 41 a — x² − 5x + 4 = (x−1)(x−4) (clave exacta). */
  template(
    {
      id: "mat-espol-ch5-41a",
      subject: "math",
      topicId: "matrices",
      subtopicId: "determinants",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["determinants", "factorization", "quadratic"],
      prerequisites: ["determinants"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 41 a",
        page: 545,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(`$(x-1)(x-4)$`, `$(x-1)(x-4)$`),
          correct: true,
        },
        {
          id: "b",
          text: L(`$(x+1)(x+4)$`, `$(x+1)(x+4)$`),
          correct: false,
        },
        {
          id: "c",
          text: L(`$(x-1)(x+4)$`, `$(x-1)(x+4)$`),
          correct: false,
        },
        {
          id: "d",
          text: L(`$(x-2)(x-2)$`, `$(x-2)(x-2)$`),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Factorizar un determinante con entradas lineales",
          "Factoring a determinant with linear entries",
        ),
        statement: L(
          `Factorizar: $\\det\\begin{pmatrix} x+4 & x+14 \\\\ x & 2x+1 \\end{pmatrix}$.`,
          `Factor: $\\det\\begin{pmatrix} x+4 & x+14 \\\\ x & 2x+1 \\end{pmatrix}$.`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Primero expande el determinante $2 \\times 2$ y simplifica los términos en $x^{2}$.",
            "First expand the $2 \\times 2$ determinant and simplify the $x^{2}$ terms.",
          ),
          L(
            "Debería quedarte un polinomio cuadrático con término independiente $4$.",
            "You should be left with a quadratic polynomial with constant term $4$.",
          ),
          L(
            "Factoriza la cuadrática buscando dos números que multiplicados den $4$ y sumados den el coeficiente lineal.",
            "Factor the quadratic by looking for two numbers whose product is $4$ and whose sum is the linear coefficient.",
          ),
        ],
        answerDisplay: L(`$(x-1)(x-4)$`, `$(x-1)(x-4)$`),
        solution: [
          step(
            "given",
            `Se pide factorizar $\\det\\begin{pmatrix} x+4 & x+14 \\\\ x & 2x+1 \\end{pmatrix}$.`,
            `We need to factor $\\det\\begin{pmatrix} x+4 & x+14 \\\\ x & 2x+1 \\end{pmatrix}$.`,
          ),
          step(
            "approach",
            "Expandimos el determinante (diagonal principal menos diagonal secundaria), simplificamos y factorizamos la cuadrática resultante.",
            "Expand the determinant (main diagonal minus anti-diagonal), simplify, and factor the resulting quadratic.",
          ),
          step(
            "calculation",
            `$\\det = (x+4)(2x+1) - x(x+14) = 2x^{2} + x + 8x + 4 - x^{2} - 14x = x^{2} - 5x + 4$.<br>Como $(-1)(-4) = 4$ y $(-1) + (-4) = -5$: $x^{2} - 5x + 4 = (x-1)(x-4)$.`,
            `$\\det = (x+4)(2x+1) - x(x+14) = 2x^{2} + x + 8x + 4 - x^{2} - 14x = x^{2} - 5x + 4$.<br>Since $(-1)(-4) = 4$ and $(-1) + (-4) = -5$: $x^{2} - 5x + 4 = (x-1)(x-4)$.`,
          ),
          step(
            "result",
            `El determinante factorizado es $(x-1)(x-4)$ (clave exacta del libro). Comprobación: con $x = 1$, $\\begin{vmatrix} 5 & 15 \\\\ 1 & 3 \\end{vmatrix} = 15 - 15 = 0$ ✓; con $x = 4$, $\\begin{vmatrix} 8 & 18 \\\\ 4 & 9 \\end{vmatrix} = 72 - 72 = 0$ ✓.`,
            `The factored determinant is $(x-1)(x-4)$ (book's key, exact). Check: with $x = 1$, $\\begin{vmatrix} 5 & 15 \\\\ 1 & 3 \\end{vmatrix} = 15 - 15 = 0$ ✓; with $x = 4$, $\\begin{vmatrix} 8 & 18 \\\\ 4 & 9 \\end{vmatrix} = 72 - 72 = 0$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 41 c — expansión por la primera fila: 2(x² + 4x − 12) (clave:
     2(x−2)(x+6)). */
  template(
    {
      id: "mat-espol-ch5-41c",
      subject: "math",
      topicId: "matrices",
      subtopicId: "determinants",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 330,
      tags: ["determinants", "factorization", "cofactor-expansion"],
      prerequisites: ["determinants"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 41 c",
        page: 545,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(`$2(x-2)(x+6)$`, `$2(x-2)(x+6)$`),
          correct: true,
        },
        {
          id: "b",
          text: L(`$2(x+2)(x-6)$`, `$2(x+2)(x-6)$`),
          correct: false,
        },
        {
          id: "c",
          text: L(`$(x-2)(x+6)$`, `$(x-2)(x+6)$`),
          correct: false,
        },
        {
          id: "d",
          text: L(`$2(x-3)(x+6)$`, `$2(x-3)(x+6)$`),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Factorizar un determinante 3×3",
          "Factoring a 3×3 determinant",
        ),
        statement: L(
          `Factorizar: $\\det\\begin{pmatrix} 1 & -2 & 2 \\\\ x & -4 & 4 \\\\ 3 & x & 6 \\end{pmatrix}$.`,
          `Factor: $\\det\\begin{pmatrix} 1 & -2 & 2 \\\\ x & -4 & 4 \\\\ 3 & x & 6 \\end{pmatrix}$.`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "La primera fila tiene números fijos: expande por ella con los signos de tablero de ajedrez.",
            "The first row holds fixed numbers: expand along it with the checkerboard signs.",
          ),
          L(
            "Cada menor es un determinante $2 \\times 2$ con a lo sumo un término en $x^{2}$.",
            "Each minor is a $2 \\times 2$ determinant with at most one $x^{2}$ term.",
          ),
          L(
            "Al final debes poder sacar un factor $2$ común del polinomio.",
            "At the end you should be able to pull out a common factor of $2$ from the polynomial.",
          ),
        ],
        answerDisplay: L(`$2(x-2)(x+6)$`, `$2(x-2)(x+6)$`),
        solution: [
          step(
            "given",
            `Se pide factorizar $\\det\\begin{pmatrix} 1 & -2 & 2 \\\\ x & -4 & 4 \\\\ 3 & x & 6 \\end{pmatrix}$.`,
            `We need to factor $\\det\\begin{pmatrix} 1 & -2 & 2 \\\\ x & -4 & 4 \\\\ 3 & x & 6 \\end{pmatrix}$.`,
          ),
          step(
            "approach",
            "Expandimos por la primera fila (sus entradas son constantes) y factorizamos el polinomio cuadrático que queda.",
            "Expand along the first row (its entries are constants) and factor the resulting quadratic polynomial.",
          ),
          step(
            "calculation",
            `$\\det = 1 \\cdot \\begin{vmatrix} -4 & 4 \\\\ x & 6 \\end{vmatrix} - (-2) \\cdot \\begin{vmatrix} x & 4 \\\\ 3 & 6 \\end{vmatrix} + 2 \\cdot \\begin{vmatrix} x & -4 \\\\ 3 & x \\end{vmatrix}$<br>$= (-24 - 4x) + 2(6x - 12) + 2(x^{2} + 12) = 2x^{2} + 8x - 24 = 2(x^{2} + 4x - 12)$.<br>Como $x^{2} + 4x - 12 = (x-2)(x+6)$, el determinante es $2(x-2)(x+6)$.`,
            `$\\det = 1 \\cdot \\begin{vmatrix} -4 & 4 \\\\ x & 6 \\end{vmatrix} - (-2) \\cdot \\begin{vmatrix} x & 4 \\\\ 3 & 6 \\end{vmatrix} + 2 \\cdot \\begin{vmatrix} x & -4 \\\\ 3 & x \\end{vmatrix}$<br>$= (-24 - 4x) + 2(6x - 12) + 2(x^{2} + 12) = 2x^{2} + 8x - 24 = 2(x^{2} + 4x - 12)$.<br>Since $x^{2} + 4x - 12 = (x-2)(x+6)$, the determinant is $2(x-2)(x+6)$.`,
          ),
          step(
            "result",
            `El determinante factorizado es $2(x-2)(x+6)$ (clave exacta del libro). Comprobación: con $x = 2$ la segunda fila es $2 \\cdot \\begin{pmatrix} 1 & -2 & 2 \\end{pmatrix}$, igual al doble de la primera, así que el determinante es $0$ ✓; con $x = -6$ la tercera fila es $3 \\cdot \\begin{pmatrix} 1 & -2 & 2 \\end{pmatrix}$, el triple de la primera, y el determinante también es $0$ ✓.`,
            `The factored determinant is $2(x-2)(x+6)$ (book's key, exact). Check: with $x = 2$ the second row is $2 \\cdot \\begin{pmatrix} 1 & -2 & 2 \\end{pmatrix}$, twice the first one, so the determinant is $0$ ✓; with $x = -6$ the third row is $3 \\cdot \\begin{pmatrix} 1 & -2 & 2 \\end{pmatrix}$, three times the first one, and the determinant is also $0$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 42 — u = sen(2x): 2u² − 3u + 1 = 0 → {π/12, π/4, 5π/12} (clave
     exacta; la suma de los elementos es 3π/4). */
  template(
    {
      id: "mat-espol-ch5-42",
      subject: "math",
      topicId: "matrices",
      subtopicId: "determinants",
      difficulty: "challenge",
      questionType: "multiple-choice",
      estimatedTimeSec: 420,
      tags: ["determinants", "trigonometry", "truth-set", "quadratic"],
      prerequisites: ["determinants"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 42",
        page: 545,
      },
      reasoning: "multi-concept",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            `$\\left\\{\\tfrac{\\pi}{12}, \\tfrac{\\pi}{4}, \\tfrac{5\\pi}{12}\\right\\}$`,
            `$\\left\\{\\tfrac{\\pi}{12}, \\tfrac{\\pi}{4}, \\tfrac{5\\pi}{12}\\right\\}$`,
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            `$\\left\\{\\tfrac{\\pi}{6}, \\tfrac{\\pi}{4}, \\tfrac{\\pi}{3}\\right\\}$`,
            `$\\left\\{\\tfrac{\\pi}{6}, \\tfrac{\\pi}{4}, \\tfrac{\\pi}{3}\\right\\}$`,
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            `Solo $\\left\\{\\tfrac{\\pi}{4}\\right\\}$`,
            `Only $\\left\\{\\tfrac{\\pi}{4}\\right\\}$`,
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            `$\\left\\{\\tfrac{\\pi}{12}, \\tfrac{5\\pi}{12}\\right\\}$`,
            `$\\left\\{\\tfrac{\\pi}{12}, \\tfrac{5\\pi}{12}\\right\\}$`,
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Conjunto de verdad de un determinante trigonométrico",
          "Truth set of a trigonometric determinant",
        ),
        statement: L(
          `Halle $A_{p(x)}$. Considere $\\mathbb{R}_e = [0, \\pi]$ y el predicado $p(x): \\begin{vmatrix} 2\\operatorname{sen}^{2}(2x) & 2\\cos(x) \\\\ 3\\operatorname{sen}(x) & 1 \\end{vmatrix} = -1$.`,
          `Find $A_{p(x)}$. Consider $\\mathbb{R}_e = [0, \\pi]$ and the predicate $p(x): \\begin{vmatrix} 2\\sin^{2}(2x) & 2\\cos(x) \\\\ 3\\sin(x) & 1 \\end{vmatrix} = -1$.`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Expande el determinante: $2\\operatorname{sen}^{2}(2x) - 6\\operatorname{sen}(x)\\cos(x) = -1$.",
            "Expand the determinant: $2\\sin^{2}(2x) - 6\\sin(x)\\cos(x) = -1$.",
          ),
          L(
            "Usa $2\\operatorname{sen}(x)\\cos(x) = \\operatorname{sen}(2x)$ para escribir todo en función de $u = \\operatorname{sen}(2x)$.",
            "Use $2\\sin(x)\\cos(x) = \\sin(2x)$ to write everything in terms of $u = \\sin(2x)$.",
          ),
          L(
            "La ecuación queda $2u^{2} - 3u + 1 = 0$; resuelve para $u$ y después para $x$ recordando que $2x \\in [0, 2\\pi]$.",
            "The equation becomes $2u^{2} - 3u + 1 = 0$; solve for $u$ and then for $x$, remembering that $2x \\in [0, 2\\pi]$.",
          ),
        ],
        answerDisplay: L(
          `$A_{p(x)} = \\left\\{\\tfrac{\\pi}{12}, \\tfrac{\\pi}{4}, \\tfrac{5\\pi}{12}\\right\\}$ (la suma de sus elementos es $\\tfrac{3\\pi}{4}$)`,
          `$A_{p(x)} = \\left\\{\\tfrac{\\pi}{12}, \\tfrac{\\pi}{4}, \\tfrac{5\\pi}{12}\\right\\}$ (the sum of its elements is $\\tfrac{3\\pi}{4}$)`,
        ),
        solution: [
          step(
            "given",
            `$p(x): \\begin{vmatrix} 2\\operatorname{sen}^{2}(2x) & 2\\cos(x) \\\\ 3\\operatorname{sen}(x) & 1 \\end{vmatrix} = -1$ con $x \\in [0, \\pi]$; se pide $A_{p(x)}$.`,
            `$p(x): \\begin{vmatrix} 2\\sin^{2}(2x) & 2\\cos(x) \\\\ 3\\sin(x) & 1 \\end{vmatrix} = -1$ with $x \\in [0, \\pi]$; we need $A_{p(x)}$.`,
          ),
          step(
            "approach",
            "El determinante es $2\\operatorname{sen}^{2}(2x) - 6\\operatorname{sen}(x)\\cos(x)$. Con la identidad del seno doble, $6\\operatorname{sen}(x)\\cos(x) = 3\\operatorname{sen}(2x)$, la ecuación se vuelve cuadrática en $u = \\operatorname{sen}(2x)$.",
            "The determinant is $2\\sin^{2}(2x) - 6\\sin(x)\\cos(x)$. With the double-angle identity, $6\\sin(x)\\cos(x) = 3\\sin(2x)$, the equation becomes quadratic in $u = \\sin(2x)$.",
          ),
          step(
            "calculation",
            `$2\\operatorname{sen}^{2}(2x) - 3\\operatorname{sen}(2x) = -1 \\Rightarrow 2u^{2} - 3u + 1 = 0 \\Rightarrow (2u-1)(u-1) = 0$, así que $u = \\tfrac{1}{2}$ o $u = 1$.<br>Con $u = 1$: $\\operatorname{sen}(2x) = 1 \\Rightarrow 2x = \\tfrac{\\pi}{2} \\Rightarrow x = \\tfrac{\\pi}{4}$.<br>Con $u = \\tfrac{1}{2}$: $\\operatorname{sen}(2x) = \\tfrac{1}{2}$ y $2x \\in [0, 2\\pi]$ da $2x = \\tfrac{\\pi}{6}$ o $2x = \\tfrac{5\\pi}{6}$, es decir $x = \\tfrac{\\pi}{12}$ o $x = \\tfrac{5\\pi}{12}$.`,
            `$2\\sin^{2}(2x) - 3\\sin(2x) = -1 \\Rightarrow 2u^{2} - 3u + 1 = 0 \\Rightarrow (2u-1)(u-1) = 0$, so $u = \\tfrac{1}{2}$ or $u = 1$.<br>With $u = 1$: $\\sin(2x) = 1 \\Rightarrow 2x = \\tfrac{\\pi}{2} \\Rightarrow x = \\tfrac{\\pi}{4}$.<br>With $u = \\tfrac{1}{2}$: $\\sin(2x) = \\tfrac{1}{2}$ and $2x \\in [0, 2\\pi]$ give $2x = \\tfrac{\\pi}{6}$ or $2x = \\tfrac{5\\pi}{6}$, i.e. $x = \\tfrac{\\pi}{12}$ or $x = \\tfrac{5\\pi}{12}$.`,
          ),
          step(
            "result",
            `$A_{p(x)} = \\left\\{\\tfrac{\\pi}{12}, \\tfrac{\\pi}{4}, \\tfrac{5\\pi}{12}\\right\\}$ (clave exacta del libro; la suma de sus elementos es $\\tfrac{\\pi}{12} + \\tfrac{3\\pi}{12} + \\tfrac{5\\pi}{12} = \\tfrac{3\\pi}{4}$). Comprobación: con $x = \\tfrac{\\pi}{12}$, $\\operatorname{sen}(2x) = \\tfrac{1}{2}$ y el determinante es $2 \\cdot \\tfrac{1}{4} - 3 \\cdot \\tfrac{1}{2} = -1$ ✓; con $x = \\tfrac{\\pi}{4}$, $\\operatorname{sen}(2x) = 1$ y el determinante es $2 - 3 = -1$ ✓; en cambio con $x = \\tfrac{\\pi}{6}$, $\\operatorname{sen}(2x) = \\tfrac{\\sqrt{3}}{2}$ y el determinante es $\\tfrac{3}{2} - \\tfrac{3\\sqrt{3}}{2} \\approx -0{,}10 \\ne -1$ ✓.`,
            `$A_{p(x)} = \\left\\{\\tfrac{\\pi}{12}, \\tfrac{\\pi}{4}, \\tfrac{5\\pi}{12}\\right\\}$ (book's key, exact; the sum of its elements is $\\tfrac{\\pi}{12} + \\tfrac{3\\pi}{12} + \\tfrac{5\\pi}{12} = \\tfrac{3\\pi}{4}$). Check: with $x = \\tfrac{\\pi}{12}$, $\\sin(2x) = \\tfrac{1}{2}$ and the determinant is $2 \\cdot \\tfrac{1}{4} - 3 \\cdot \\tfrac{1}{2} = -1$ ✓; with $x = \\tfrac{\\pi}{4}$, $\\sin(2x) = 1$ and the determinant is $2 - 3 = -1$ ✓; by contrast with $x = \\tfrac{\\pi}{6}$, $\\sin(2x) = \\tfrac{\\sqrt{3}}{2}$ and the determinant is $\\tfrac{3}{2} - \\tfrac{3\\sqrt{3}}{2} \\approx -0.10 \\ne -1$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* 5 · 46 — linealidad en la segunda columna (clave a). Las opciones
     impresas posteriores a la a) son irreconocibles en la capa de texto
     del PDF: distractores redactados (errores clásicos de linealidad). */
  template(
    {
      id: "mat-espol-ch5-46",
      subject: "math",
      topicId: "matrices",
      subtopicId: "determinants",
      difficulty: "hard",
      questionType: "multiple-choice",
      estimatedTimeSec: 300,
      tags: ["determinants", "linearity", "column-properties"],
      prerequisites: ["determinants"],
      source: {
        sourceId: "fcnm-fundamentos-digital",
        license: "TUTOR_LICENSED",
        exerciseNumber: "5 · 46",
        page: 546,
      },
      reasoning: "definition-hunting",
    },
    (rng) => {
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            `$\\begin{vmatrix} a_1 & d_1 \\\\ c_1 & b_1 \\end{vmatrix} + \\begin{vmatrix} a_1 & d_2 \\\\ c_1 & b_2 \\end{vmatrix}$`,
            `$\\begin{vmatrix} a_1 & d_1 \\\\ c_1 & b_1 \\end{vmatrix} + \\begin{vmatrix} a_1 & d_2 \\\\ c_1 & b_2 \\end{vmatrix}$`,
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            `$\\begin{vmatrix} a_1 & d_1 \\\\ c_1 & b_1 \\end{vmatrix} + \\begin{vmatrix} d_2 & a_1 \\\\ b_2 & c_1 \\end{vmatrix}$`,
            `$\\begin{vmatrix} a_1 & d_1 \\\\ c_1 & b_1 \\end{vmatrix} + \\begin{vmatrix} d_2 & a_1 \\\\ b_2 & c_1 \\end{vmatrix}$`,
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            `$\\begin{vmatrix} a_1 + a_1 & d_1 + d_2 \\\\ c_1 + c_1 & b_1 + b_2 \\end{vmatrix}$`,
            `$\\begin{vmatrix} a_1 + a_1 & d_1 + d_2 \\\\ c_1 + c_1 & b_1 + b_2 \\end{vmatrix}$`,
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            `$(d_1 + d_2)(b_1 + b_2) - a_1 c_1$`,
            `$(d_1 + d_2)(b_1 + b_2) - a_1 c_1$`,
          ),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Linealidad del determinante por columnas",
          "Linearity of the determinant in columns",
        ),
        statement: L(
          `El determinante $\\begin{vmatrix} a_1 & d_1 + d_2 \\\\ c_1 & b_1 + b_2 \\end{vmatrix}$ es equivalente a:`,
          `The determinant $\\begin{vmatrix} a_1 & d_1 + d_2 \\\\ c_1 & b_1 + b_2 \\end{vmatrix}$ is equivalent to:`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "¿Cómo se comporta el determinante cuando una columna es una suma de dos columnas?",
            "How does the determinant behave when one column is a sum of two columns?",
          ),
          L(
            "El determinante es lineal en cada columna por separado: se puede «repartir» la suma de la segunda columna manteniendo fija la primera.",
            "The determinant is linear in each column separately: the sum in the second column can be «distributed» while keeping the first column fixed.",
          ),
          L(
            "Expande con letras ambos lados: $a_1(b_1 + b_2) - c_1(d_1 + d_2)$ y compara con la suma de los dos determinantes.",
            "Expand both sides with letters: $a_1(b_1 + b_2) - c_1(d_1 + d_2)$ and compare with the sum of the two determinants.",
          ),
        ],
        answerDisplay: L(
          `$\\begin{vmatrix} a_1 & d_1 \\\\ c_1 & b_1 \\end{vmatrix} + \\begin{vmatrix} a_1 & d_2 \\\\ c_1 & b_2 \\end{vmatrix}$`,
          `$\\begin{vmatrix} a_1 & d_1 \\\\ c_1 & b_1 \\end{vmatrix} + \\begin{vmatrix} a_1 & d_2 \\\\ c_1 & b_2 \\end{vmatrix}$`,
        ),
        solution: [
          step(
            "given",
            `Se pide una expresión equivalente de $\\begin{vmatrix} a_1 & d_1 + d_2 \\\\ c_1 & b_1 + b_2 \\end{vmatrix}$.`,
            `We need an expression equivalent to $\\begin{vmatrix} a_1 & d_1 + d_2 \\\\ c_1 & b_1 + b_2 \\end{vmatrix}$.`,
          ),
          step(
            "approach",
            "El determinante es lineal en cada columna: si la segunda columna es la suma de $\\begin{pmatrix} d_1 \\\\ b_1 \\end{pmatrix}$ y $\\begin{pmatrix} d_2 \\\\ b_2 \\end{pmatrix}$, el determinante se reparte en dos, manteniendo fija la primera columna $\\begin{pmatrix} a_1 \\\\ c_1 \\end{pmatrix}$.",
            "The determinant is linear in each column: if the second column is the sum of $\\begin{pmatrix} d_1 \\\\ b_1 \\end{pmatrix}$ and $\\begin{pmatrix} d_2 \\\\ b_2 \\end{pmatrix}$, the determinant splits into two, keeping the first column $\\begin{pmatrix} a_1 \\\\ c_1 \\end{pmatrix}$ fixed.",
          ),
          step(
            "calculation",
            `$\\begin{vmatrix} a_1 & d_1 + d_2 \\\\ c_1 & b_1 + b_2 \\end{vmatrix} = a_1(b_1 + b_2) - c_1(d_1 + d_2) = (a_1 b_1 - c_1 d_1) + (a_1 b_2 - c_1 d_2)$<br>$= \\begin{vmatrix} a_1 & d_1 \\\\ c_1 & b_1 \\end{vmatrix} + \\begin{vmatrix} a_1 & d_2 \\\\ c_1 & b_2 \\end{vmatrix}$.`,
            `$\\begin{vmatrix} a_1 & d_1 + d_2 \\\\ c_1 & b_1 + b_2 \\end{vmatrix} = a_1(b_1 + b_2) - c_1(d_1 + d_2) = (a_1 b_1 - c_1 d_1) + (a_1 b_2 - c_1 d_2)$<br>$= \\begin{vmatrix} a_1 & d_1 \\\\ c_1 & b_1 \\end{vmatrix} + \\begin{vmatrix} a_1 & d_2 \\\\ c_1 & b_2 \\end{vmatrix}$.`,
          ),
          step(
            "result",
            `La equivalencia correcta es la suma de los dos determinantes con la primera columna fija (clave a del libro). Comprobación numérica: con $a_1 = 1$, $c_1 = 2$, $d_1 = 3$, $b_1 = 4$, $d_2 = 5$, $b_2 = 6$, el lado izquierdo es $\\begin{vmatrix} 1 & 8 \\\\ 2 & 10 \\end{vmatrix} = 10 - 16 = -6$ y la suma de los dos determinantes es $(4 - 6) + (6 - 10) = -2 - 4 = -6$ ✓.`,
            `The correct equivalence is the sum of the two determinants with the first column fixed (book's key a). Numeric check: with $a_1 = 1$, $c_1 = 2$, $d_1 = 3$, $b_1 = 4$, $d_2 = 5$, $b_2 = 6$, the left-hand side is $\\begin{vmatrix} 1 & 8 \\\\ 2 & 10 \\end{vmatrix} = 10 - 16 = -6$ and the sum of the two determinants is $(4 - 6) + (6 - 10) = -2 - 4 = -6$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* ---------------------------------------------------------------- */
  /* Nivel inicial generado — suma, escalar, transpuesta, igualdad y   */
  /* determinantes 2×2 con parámetros limpios (política de contenido:  */
  /* easy = generado; medium+ = solo fuentes reales).                   */
  /* ---------------------------------------------------------------- */

  /* Fácil generado — entrada (2,1) de la suma A + B. */
  template(
    {
      id: "mat-easy-add",
      subject: "math",
      topicId: "matrices",
      subtopicId: "operations",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 60,
      tags: ["matrix-addition", "entries"],
      prerequisites: [],
    },
    (rng) => {
      const a = rng.int(-9, 9);
      const b = rng.int(-9, 9);
      const c = rng.int(-9, 9);
      const d = rng.int(-9, 9);
      const e = rng.int(-9, 9);
      const f = rng.int(-9, 9);
      const g = rng.int(-9, 9);
      const h = rng.int(-9, 9);
      const value = c + g;
      return {
        skill: L(
          "Suma de matrices entrada por entrada",
          "Matrix addition entry by entry",
        ),
        statement: L(
          `Si $A = \\begin{pmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{pmatrix}$ y $B = \\begin{pmatrix} ${e} & ${f} \\\\ ${g} & ${h} \\end{pmatrix}$, ¿cuánto vale la entrada $(2,1)$ de $A + B$?`,
          `If $A = \\begin{pmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{pmatrix}$ and $B = \\begin{pmatrix} ${e} & ${f} \\\\ ${g} & ${h} \\end{pmatrix}$, what is the $(2,1)$ entry of $A + B$?`,
        ),
        answer: { kind: "numeric", value },
        hints: [
          L(
            "Las matrices se suman entrada por entrada: cada posición de $A + B$ es la suma de las entradas de $A$ y de $B$ en esa misma posición.",
            "Matrices are added entry by entry: each position of $A + B$ is the sum of the entries of $A$ and of $B$ in that same position.",
          ),
          L(
            "La entrada $(i, j)$ está en la fila $i$ y la columna $j$: la $(2,1)$ es la de abajo a la izquierda.",
            "The entry $(i, j)$ sits in row $i$ and column $j$: the $(2,1)$ one is at the bottom left.",
          ),
          L(
            "Busca la entrada de $A$ y la de $B$ que están en la fila 2 y la columna 1, y súmalas.",
            "Locate the entries of $A$ and of $B$ in row 2 and column 1, and add them.",
          ),
        ],
        answerDisplay: L(`$${value}$`, `$${value}$`),
        solution: [
          step(
            "given",
            `$A = \\begin{pmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{pmatrix}$ y $B = \\begin{pmatrix} ${e} & ${f} \\\\ ${g} & ${h} \\end{pmatrix}$; se pide la entrada $(2,1)$ de $A + B$.`,
            `$A = \\begin{pmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{pmatrix}$ and $B = \\begin{pmatrix} ${e} & ${f} \\\\ ${g} & ${h} \\end{pmatrix}$; we need the $(2,1)$ entry of $A + B$.`,
          ),
          step(
            "approach",
            "La suma de matrices del mismo tamaño se hace entrada por entrada, y la entrada $(2,1)$ es la de la fila 2, columna 1.",
            "The sum of same-size matrices is computed entry by entry, and the $(2,1)$ entry is the one in row 2, column 1.",
          ),
          step(
            "calculation",
            `En la fila 2 y la columna 1, $A$ tiene ${c} y $B$ tiene ${g}:<br>$(A + B)_{21} = ${c} + (${g}) = ${value}$.`,
            `In row 2 and column 1, $A$ has ${c} and $B$ has ${g}:<br>$(A + B)_{21} = ${c} + (${g}) = ${value}$.`,
          ),
          step(
            "result",
            `La entrada $(2,1)$ de $A + B$ es $${value}$. Comprobación: $A + B = \\begin{pmatrix} ${a + e} & ${b + f} \\\\ ${c + g} & ${d + h} \\end{pmatrix}$ y su entrada $(2,1)$ es $${c + g} = ${value}$ ✓.`,
            `The $(2,1)$ entry of $A + B$ is $${value}$. Check: $A + B = \\begin{pmatrix} ${a + e} & ${b + f} \\\\ ${c + g} & ${d + h} \\end{pmatrix}$ and its $(2,1)$ entry is $${c + g} = ${value}$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* Fácil generado — entrada (1,2) del múltiplo escalar kA. */
  template(
    {
      id: "mat-easy-scalar",
      subject: "math",
      topicId: "matrices",
      subtopicId: "operations",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 75,
      tags: ["scalar-multiplication", "entries"],
      prerequisites: [],
    },
    (rng) => {
      const k = rng.int(2, 5);
      const a = rng.int(-6, 6);
      const b = rng.int(-6, 6);
      const c = rng.int(-6, 6);
      const d = rng.int(-6, 6);
      const value = k * b;
      return {
        skill: L(
          "Producto de un escalar por una matriz",
          "Scalar multiple of a matrix",
        ),
        statement: L(
          `Sea $A = \\begin{pmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{pmatrix}$. ¿Cuánto vale la entrada $(1,2)$ de $${k}A$?`,
          `Let $A = \\begin{pmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{pmatrix}$. What is the $(1,2)$ entry of $${k}A$?`,
        ),
        answer: { kind: "numeric", value },
        hints: [
          L(
            "Multiplicar una matriz por un escalar multiplica **cada** entrada por ese número.",
            "Multiplying a matrix by a scalar multiplies **every** entry by that number.",
          ),
          L(
            "La entrada $(1,2)$ es la de la fila 1 y la columna 2: la de arriba a la derecha.",
            "The $(1,2)$ entry is the one in row 1 and column 2: the top right one.",
          ),
          L(
            `Toma la entrada de $A$ en esa posición y multiplícala por $${k}$.`,
            `Take the entry of $A$ in that position and multiply it by $${k}$.`,
          ),
        ],
        answerDisplay: L(`$${value}$`, `$${value}$`),
        solution: [
          step(
            "given",
            `$A = \\begin{pmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{pmatrix}$ y el escalar $k = ${k}$; se pide la entrada $(1,2)$ de $${k}A$.`,
            `$A = \\begin{pmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{pmatrix}$ and the scalar $k = ${k}$; we need the $(1,2)$ entry of $${k}A$.`,
          ),
          step(
            "approach",
            "El producto $kA$ multiplica cada entrada de $A$ por $k$; la entrada $(1,2)$ es la de la fila 1, columna 2.",
            "The product $kA$ multiplies every entry of $A$ by $k$; the $(1,2)$ entry is the one in row 1, column 2.",
          ),
          step(
            "calculation",
            `$(kA)_{12} = ${k} \\cdot ${b} = ${value}$.`,
            `$(kA)_{12} = ${k} \\cdot ${b} = ${value}$.`,
          ),
          step(
            "result",
            `La entrada $(1,2)$ de $${k}A$ es $${value}$. Comprobación: $${k}A = \\begin{pmatrix} ${k * a} & ${k * b} \\\\ ${k * c} & ${k * d} \\end{pmatrix}$ y su entrada $(1,2)$ es $${k * b} = ${value}$ ✓.`,
            `The $(1,2)$ entry of $${k}A$ is $${value}$. Check: $${k}A = \\begin{pmatrix} ${k * a} & ${k * b} \\\\ ${k * c} & ${k * d} \\end{pmatrix}$ and its $(1,2)$ entry is $${k * b} = ${value}$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* Fácil generado — igualdad de matrices: despejar (x, y). */
  template(
    {
      id: "mat-easy-equal",
      subject: "math",
      topicId: "matrices",
      subtopicId: "operations",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 90,
      tags: ["matrix-equality", "equations"],
      prerequisites: [],
    },
    (rng) => {
      const p = rng.int(2, 5);
      const m = rng.pick([-2, -1, 1, 2]);
      const r = p * m;
      const u = rng.int(1, 5);
      const x = rng.int(1, 7);
      const y = rng.intExcluding(1, 7, [x]);
      const s = rng.int(-9, 9);
      const t = rng.int(-9, 9);
      const v = p * x + r;
      const w = y - u;
      const rTxt = r >= 0 ? `+ ${r}` : `- ${-r}`;
      const xWrong = x + 2 * m; // solves p·x − r = v (sign slip on r)
      const yWrong = y - 2 * u; // solves y + u = w (sign slip on u)
      const options: McOption[] = [
        {
          id: "a",
          text: L(`$(${x}, ${y})$`, `$(${x}, ${y})$`),
          correct: true,
        },
        {
          id: "b",
          text: L(`$(${y}, ${x})$`, `$(${y}, ${x})$`),
          correct: false,
        },
        {
          id: "c",
          text: L(`$(${xWrong}, ${y})$`, `$(${xWrong}, ${y})$`),
          correct: false,
        },
        {
          id: "d",
          text: L(`$(${x}, ${yWrong})$`, `$(${x}, ${yWrong})$`),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Igualdad de matrices y despeje",
          "Matrix equality and solving",
        ),
        statement: L(
          `Si $\\begin{pmatrix} ${p}x ${rTxt} & ${s} \\\\ ${t} & y - ${u} \\end{pmatrix} = \\begin{pmatrix} ${v} & ${s} \\\\ ${t} & ${w} \\end{pmatrix}$, entonces el par $(x, y)$ es:`,
          `If $\\begin{pmatrix} ${p}x ${rTxt} & ${s} \\\\ ${t} & y - ${u} \\end{pmatrix} = \\begin{pmatrix} ${v} & ${s} \\\\ ${t} & ${w} \\end{pmatrix}$, then the pair $(x, y)$ is:`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Dos matrices son iguales solo si coinciden entrada por entrada.",
            "Two matrices are equal only if they match entry by entry.",
          ),
          L(
            "Las entradas $(1,2)$ y $(2,1)$ ya coinciden; quedan dos ecuaciones: una con $x$ (fila 1) y otra con $y$ (fila 2).",
            "The $(1,2)$ and $(2,1)$ entries already match; two equations remain: one with $x$ (row 1) and one with $y$ (row 2).",
          ),
          L(
            `Despeja $x$ de $${p}x ${rTxt} = ${v}$ y $y$ de $y - ${u} = ${w}$.`,
            `Solve $x$ from $${p}x ${rTxt} = ${v}$ and $y$ from $y - ${u} = ${w}$.`,
          ),
        ],
        answerDisplay: L(`$(x, y) = (${x}, ${y})$`, `$(x, y) = (${x}, ${y})$`),
        solution: [
          step(
            "given",
            `$\\begin{pmatrix} ${p}x ${rTxt} & ${s} \\\\ ${t} & y - ${u} \\end{pmatrix} = \\begin{pmatrix} ${v} & ${s} \\\\ ${t} & ${w} \\end{pmatrix}$.`,
            `$\\begin{pmatrix} ${p}x ${rTxt} & ${s} \\\\ ${t} & y - ${u} \\end{pmatrix} = \\begin{pmatrix} ${v} & ${s} \\\\ ${t} & ${w} \\end{pmatrix}$.`,
          ),
          step(
            "approach",
            "Por la igualdad entrada por entrada, la posición $(1,1)$ da una ecuación en $x$ y la posición $(2,2)$ una ecuación en $y$; las otras dos ya coinciden.",
            "By entrywise equality, position $(1,1)$ gives an equation in $x$ and position $(2,2)$ an equation in $y$; the other two already match.",
          ),
          step(
            "calculation",
            `De la entrada $(1,1)$: $${p}x ${rTxt} = ${v}$, así que $${p}x = ${v - r}$ y $x = ${v - r} / ${p} = ${x}$.<br>De la entrada $(2,2)$: $y - ${u} = ${w}$, así que $y = ${w} + ${u} = ${y}$.`,
            `From the $(1,1)$ entry: $${p}x ${rTxt} = ${v}$, so $${p}x = ${v - r}$ and $x = ${v - r} / ${p} = ${x}$.<br>From the $(2,2)$ entry: $y - ${u} = ${w}$, so $y = ${w} + ${u} = ${y}$.`,
          ),
          step(
            "result",
            `El par buscado es $(x, y) = (${x}, ${y})$. Comprobación: $${p} \\cdot ${x} ${rTxt} = ${p * x} ${rTxt} = ${v}$ ✓ y $${y} - ${u} = ${w}$ ✓.`,
            `The required pair is $(x, y) = (${x}, ${y})$. Check: $${p} \\cdot ${x} ${rTxt} = ${p * x} ${rTxt} = ${v}$ ✓ and $${y} - ${u} = ${w}$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* Fácil generado — determinante 2×2 directo. */
  template(
    {
      id: "mat-easy-det2",
      subject: "math",
      topicId: "matrices",
      subtopicId: "determinants",
      difficulty: "easy",
      questionType: "numeric",
      estimatedTimeSec: 60,
      tags: ["determinants", "2x2"],
      prerequisites: ["operations"],
    },
    (rng) => {
      const a = rng.int(-9, 9);
      const b = rng.int(-9, 9);
      const c = rng.int(-9, 9);
      const d = rng.int(-9, 9);
      const value = a * d - b * c;
      return {
        skill: L("Determinante 2×2", "2×2 determinant"),
        statement: L(
          `Calcula el determinante $\\begin{vmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{vmatrix}$.`,
          `Compute the determinant $\\begin{vmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{vmatrix}$.`,
        ),
        answer: { kind: "numeric", value },
        hints: [
          L(
            "En un determinante $2 \\times 2$ se restan los productos de las dos diagonales.",
            "In a $2 \\times 2$ determinant you subtract the products of the two diagonals.",
          ),
          L(
            "La diagonal principal une las esquinas superior izquierda e inferior derecha.",
            "The main diagonal joins the top-left and bottom-right corners.",
          ),
          L(
            `Calcula $${a} \\cdot ${d}$, luego $${b} \\cdot ${c}$, y resta el segundo del primero.`,
            `Compute $${a} \\cdot ${d}$, then $${b} \\cdot ${c}$, and subtract the second from the first.`,
          ),
        ],
        answerDisplay: L(`$${value}$`, `$${value}$`),
        solution: [
          step(
            "given",
            `$\\begin{vmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{vmatrix}$.`,
            `$\\begin{vmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{vmatrix}$.`,
          ),
          step(
            "approach",
            "Regla del determinante $2 \\times 2$: producto de la diagonal principal menos producto de la diagonal secundaria.",
            "Rule for the $2 \\times 2$ determinant: product of the main diagonal minus product of the anti-diagonal.",
          ),
          step(
            "calculation",
            `$\\det = (${a})(${d}) - (${b})(${c}) = ${a * d} - ${b * c} = ${value}$.`,
            `$\\det = (${a})(${d}) - (${b})(${c}) = ${a * d} - ${b * c} = ${value}$.`,
          ),
          step(
            "result",
            `El determinante es $${value}$. Comprobación: $${a} \\cdot ${d} = ${a * d}$ y $${b} \\cdot ${c} = ${b * c}$, así que $${a * d} - ${b * c} = ${value}$ ✓.`,
            `The determinant is $${value}$. Check: $${a} \\cdot ${d} = ${a * d}$ and $${b} \\cdot ${c} = ${b * c}$, so $${a * d} - ${b * c} = ${value}$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* Fácil generado — valores de x que hacen singular [[x, p],[q, x]]. */
  template(
    {
      id: "mat-easy-det2-zero",
      subject: "math",
      topicId: "matrices",
      subtopicId: "determinants",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 90,
      tags: ["determinants", "singular-matrix"],
      prerequisites: ["determinants"],
    },
    (rng) => {
      const [p, q, t] = rng.pick([
        [1, 4, 2],
        [4, 1, 2],
        [2, 2, 2],
        [2, 8, 4],
        [8, 2, 4],
        [4, 4, 4],
        [1, 16, 4],
        [16, 1, 4],
        [4, 9, 6],
        [9, 4, 6],
        [6, 6, 6],
        [2, 18, 6],
        [18, 2, 6],
        [8, 8, 8],
        [4, 16, 8],
        [16, 4, 8],
        [10, 10, 10],
      ]);
      const half = t / 2;
      const options: McOption[] = [
        {
          id: "a",
          text: L(`$x = ${t}$ o $x = -${t}$`, `$x = ${t}$ or $x = -${t}$`),
          correct: true,
        },
        {
          id: "b",
          text: L(
            `$x = ${half}$ o $x = -${half}$`,
            `$x = ${half}$ or $x = -${half}$`,
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(`Solo $x = ${t}$`, `Only $x = ${t}$`),
          correct: false,
        },
        {
          id: "d",
          text: L(`Solo $x = -${t}$`, `Only $x = -${t}$`),
          correct: false,
        },
      ];
      return {
        skill: L(
          "Matriz singular 2×2 con una incógnita",
          "Singular 2×2 matrix with one unknown",
        ),
        statement: L(
          `¿Para qué valores de $x$ la matriz $M = \\begin{pmatrix} x & ${p} \\\\ ${q} & x \\end{pmatrix}$ es singular?`,
          `For which values of $x$ is the matrix $M = \\begin{pmatrix} x & ${p} \\\\ ${q} & x \\end{pmatrix}$ singular?`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Singular significa $\\det(M) = 0$: escribe el determinante y igualalo a cero.",
            "Singular means $\\det(M) = 0$: write the determinant and set it equal to zero.",
          ),
          L(
            `El determinante es $x^{2} - ${p} \\cdot ${q}$; calcula el producto $${p} \\cdot ${q} = ${p * q}$.`,
            `The determinant is $x^{2} - ${p} \\cdot ${q}$; compute the product $${p} \\cdot ${q} = ${p * q}$.`,
          ),
          L(
            `La ecuación $x^{2} = ${p * q}$ tiene **dos** soluciones reales, una positiva y una negativa.`,
            `The equation $x^{2} = ${p * q}$ has **two** real solutions, one positive and one negative.`,
          ),
        ],
        answerDisplay: L(
          `$x = ${t}$ o $x = -${t}$`,
          `$x = ${t}$ or $x = -${t}$`,
        ),
        solution: [
          step(
            "given",
            `$M = \\begin{pmatrix} x & ${p} \\\\ ${q} & x \\end{pmatrix}$; $M$ es singular cuando $\\det(M) = 0$.`,
            `$M = \\begin{pmatrix} x & ${p} \\\\ ${q} & x \\end{pmatrix}$; $M$ is singular when $\\det(M) = 0$.`,
          ),
          step(
            "approach",
            "Calculamos el determinante $2 \\times 2$ en función de $x$ y resolvemos la ecuación cuadrática que resulta.",
            "We compute the $2 \\times 2$ determinant as a function of $x$ and solve the resulting quadratic equation.",
          ),
          step(
            "calculation",
            `$\\det(M) = x \\cdot x - ${p} \\cdot ${q} = x^{2} - ${p * q}$.<br>$x^{2} - ${p * q} = 0 \\Rightarrow x^{2} = ${p * q} = ${t}^{2} \\Rightarrow x = ${t}$ o $x = -${t}$.`,
            `$\\det(M) = x \\cdot x - ${p} \\cdot ${q} = x^{2} - ${p * q}$.<br>$x^{2} - ${p * q} = 0 \\Rightarrow x^{2} = ${p * q} = ${t}^{2} \\Rightarrow x = ${t}$ or $x = -${t}$.`,
          ),
          step(
            "result",
            `La matriz es singular exactamente para $x = ${t}$ o $x = -${t}$. Comprobación: con $x = ${t}$, $\\det(M) = ${t * t} - ${p * q} = 0$ ✓; con $x = -${t}$, $\\det(M) = ${t * t} - ${p * q} = 0$ ✓.`,
            `The matrix is singular exactly for $x = ${t}$ or $x = -${t}$. Check: with $x = ${t}$, $\\det(M) = ${t * t} - ${p * q} = 0$ ✓; with $x = -${t}$, $\\det(M) = ${t * t} - ${p * q} = 0$ ✓.`,
          ),
        ],
      };
    },
  ),

  /* Fácil generado — transpuesta de una matriz 2×2. */
  template(
    {
      id: "mat-easy-transpose",
      subject: "math",
      topicId: "matrices",
      subtopicId: "operations",
      difficulty: "easy",
      questionType: "multiple-choice",
      estimatedTimeSec: 60,
      tags: ["transpose", "entries"],
      prerequisites: [],
    },
    (rng) => {
      const a = rng.int(-9, 9);
      const b = rng.int(-9, 9);
      const c = rng.intExcluding(-9, 9, [b]);
      const d = rng.int(-9, 9);
      const options: McOption[] = [
        {
          id: "a",
          text: L(
            `$\\begin{pmatrix} ${a} & ${c} \\\\ ${b} & ${d} \\end{pmatrix}$`,
            `$\\begin{pmatrix} ${a} & ${c} \\\\ ${b} & ${d} \\end{pmatrix}$`,
          ),
          correct: true,
        },
        {
          id: "b",
          text: L(
            `$\\begin{pmatrix} ${c} & ${d} \\\\ ${a} & ${b} \\end{pmatrix}$`,
            `$\\begin{pmatrix} ${c} & ${d} \\\\ ${a} & ${b} \\end{pmatrix}$`,
          ),
          correct: false,
        },
        {
          id: "c",
          text: L(
            `$\\begin{pmatrix} ${b} & ${a} \\\\ ${d} & ${c} \\end{pmatrix}$`,
            `$\\begin{pmatrix} ${b} & ${a} \\\\ ${d} & ${c} \\end{pmatrix}$`,
          ),
          correct: false,
        },
        {
          id: "d",
          text: L(
            `$\\begin{pmatrix} ${d} & ${b} \\\\ ${c} & ${a} \\end{pmatrix}$`,
            `$\\begin{pmatrix} ${d} & ${b} \\\\ ${c} & ${a} \\end{pmatrix}$`,
          ),
          correct: false,
        },
      ];
      return {
        skill: L("Transpuesta de una matriz", "Transpose of a matrix"),
        statement: L(
          `Si $A = \\begin{pmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{pmatrix}$, entonces $A^{T}$ es:`,
          `If $A = \\begin{pmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{pmatrix}$, then $A^{T}$ is:`,
        ),
        answer: { kind: "multiple-choice", options: rng.shuffle(options) },
        hints: [
          L(
            "Trasponer una matriz es intercambiar sus filas por sus columnas.",
            "Transposing a matrix means swapping its rows with its columns.",
          ),
          L(
            "La primera fila de $A^{T}$ es la primera **columna** de $A$.",
            "The first row of $A^{T}$ is the first **column** of $A$.",
          ),
          L(
            "Comprueba entrada por entrada: $(A^{T})_{ij} = A_{ji}$.",
            "Check entry by entry: $(A^{T})_{ij} = A_{ji}$.",
          ),
        ],
        answerDisplay: L(
          `$A^{T} = \\begin{pmatrix} ${a} & ${c} \\\\ ${b} & ${d} \\end{pmatrix}$`,
          `$A^{T} = \\begin{pmatrix} ${a} & ${c} \\\\ ${b} & ${d} \\end{pmatrix}$`,
        ),
        solution: [
          step(
            "given",
            `$A = \\begin{pmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{pmatrix}$; se pide $A^{T}$.`,
            `$A = \\begin{pmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{pmatrix}$; we need $A^{T}$.`,
          ),
          step(
            "approach",
            "La transpuesta intercambia filas y columnas: la entrada $(i, j)$ de $A^{T}$ es la entrada $(j, i)$ de $A$.",
            "The transpose swaps rows and columns: the $(i, j)$ entry of $A^{T}$ is the $(j, i)$ entry of $A$.",
          ),
          step(
            "calculation",
            `La primera columna de $A$ es $\\begin{pmatrix} ${a} \\\\ ${c} \\end{pmatrix}$ y se convierte en la primera fila de $A^{T}$; la segunda columna $\\begin{pmatrix} ${b} \\\\ ${d} \\end{pmatrix}$ se convierte en la segunda fila.<br>$A^{T} = \\begin{pmatrix} ${a} & ${c} \\\\ ${b} & ${d} \\end{pmatrix}$.`,
            `The first column of $A$ is $\\begin{pmatrix} ${a} \\\\ ${c} \\end{pmatrix}$ and it becomes the first row of $A^{T}$; the second column $\\begin{pmatrix} ${b} \\\\ ${d} \\end{pmatrix}$ becomes the second row.<br>$A^{T} = \\begin{pmatrix} ${a} & ${c} \\\\ ${b} & ${d} \\end{pmatrix}$.`,
          ),
          step(
            "result",
            `$A^{T} = \\begin{pmatrix} ${a} & ${c} \\\\ ${b} & ${d} \\end{pmatrix}$. Comprobación: $(A^{T})_{12} = ${c} = A_{21}$ ✓ y $(A^{T})_{21} = ${b} = A_{12}$ ✓.`,
            `$A^{T} = \\begin{pmatrix} ${a} & ${c} \\\\ ${b} & ${d} \\end{pmatrix}$. Check: $(A^{T})_{12} = ${c} = A_{21}$ ✓ and $(A^{T})_{21} = ${b} = A_{12}$ ✓.`,
          ),
        ],
      };
    },
  ),
];
