# Inventario de fuentes — Fase 1 (auditoría)

Carpeta del tutor: `drive.google.com/drive/folders/1W9iYhZKMy6nrcgAbHKzg5a434cR1NEct`
Auditada el 2026-10-01. 9 archivos (7 PDF + 2 JPEG). Registro máquina:
`src/content/sources/registry.ts`.

## Resumen por fuente

| # | Archivo | Tipo | Idioma | Licencia (clasificación) | Nivel | Uso para el banco |
|---|---|---|---|---|---|---|
| 1 | `11_Kompetenzprofil_Physik.pdf` (6 págs.) | marco curricular oficial | DE | OPEN_LICENSE | Studienkolleg T/M | Calibración del nivel de física. Sin problemas. |
| 2 | `FP-M-2010-HT.pdf` (5 págs., escaneado) | notas trabajadas del tutor | DE/ES | INSTRUCTOR_CREATED | FP / Studienkolleg | **Importación directa**: \|2x−1\|=\|3x+5\| con casos; f(x)=\|2x+1\|−\|3x+2\| vs g(x)=−1; \|2,5x−7,5\| vs 0,5x²−3x+6,5; \|½x−2\|−\|¼+x\| vs −⅓x+2. |
| 3 | `Fundamentos de Matematicas Para Bachillerato.pdf` (845 págs., 206 MB) | libro de texto | ES | **TUTOR_LICENSED** (© 2017, FCNM-ESPOL — autorización explícita del tutor, 2026-10-01) | Bachillerato ECU | **Importación directa con atribución**: ejercicios del libro verificados programáticamente antes de integrar. |
| 4 | `Ubungsaufgaben...StandJan18.pdf` (23 págs.) | colección de preparación oficial | DE | OPEN_LICENSE | Studienkolleg Bayern | **Importación directa con atribución**: división de polinomios (§1), desigualdades (§5), parámetros (k: x²−kx+k+3), log (§8), trigonometría. **Ítem 5 en cuarentena**: la solución impresa contradice la re-derivación independiente — requiere revisión manual antes de importar. |
| 5 | `clase 30-sep.pdf` (5 págs.) | examen FOS/BOS 2010 HT (texto) | DE | OPEN_LICENSE | FOS/BOS | **Importación directa con atribución**: reescritura de términos con dominio, posición de un punto vs parábola, recta∩parábola, LGS, sección de semiesfera, área del trébol. |
| 6 | `stknew_FSP Mathematik WS 2019-2020.pdf` (4 págs.) | examen FSP 27.01.2020 (texto) | DE | OPEN_LICENSE | Studienkolleg (1.er semestre) | **Referencia del techo superior**. Fuera del alcance actual (límites, series, Taylor, integrales, autovalores, geometría 3D): requiere topics nuevos de cálculo. Registrado para la expansión. |
| 7 | `unknown-3pages.pdf` (3 págs., escaneado) = FOS/BOS 2011 + Lösungsvorschlag | examen estatal | DE | OPEN_LICENSE | FOS/BOS | Importación tras verificar OCR: fracciones con dominio, raíces/vértice (redondeo), LGS, área del trébol (Kleeblatt), verdadero/falso sobre rectas. |
| 8 | `desigualdades.jpeg` (imagen de clase) | hoja de problemas del tutor | DE | INSTRUCTOR_CREATED | FP / Studienkolleg | **Importación directa** (misma hoja que #2): tres problemas de valor absoluto con análisis por intervalos y comparación gráfico-analítico. |
| 9 | `preguntas.jpeg` (Kurzkontrolle 1) | control corto del tutor | DE | INSTRUCTOR_CREATED | Studienkolleg | **Importación directa**: conjunto de soluciones reales de (x+2)(x−5)(x²+9)(x²−25)=0 (descarte de raíces no reales); Venn de 3 conjuntos (encuesta); operaciones de intervalos. |
| 10 | Hoja de la alumna (2 fotos, oct. 2025): Übungsblatt Mathematik + problema de Venn | hoja de ejercicios del curso alemán de la alumna | DE | TUTOR_LICENSED (el tutor la compartió y pidió publicarlo, 2026-10-02) | Secundaria superior DE / Studienkolleg | **Importación directa** (22 plantillas, transcripción del tutor como fuente de verdad): S1 ausklammern con exponentes con variable → polynomials/factoring (MC, distractores verificados no-equivalentes); S2 fracciones algebraicas → rational/simplifying; S3 Anwendung exponentes negativos → foundations/powers; Venn mermelada/miel/Nutella → foundations/venn-diagrams (subtema nuevo; partes b–e numéricas 19/28/81/73). |
| 11 | Recopilación del autor — sistemas 3×3 por Gauss (18) + problemas de aplicación (9), con clave del tutor | recopilación propia del tutor (Sebastián Calderón) | ES | INSTRUCTOR_CREATED (instrucción del tutor: «si te doy yo los ejercicios esos son ejercicios reales que puedes poner como recopilación del autor», 2026-10-02) | Bachillerato / 1.er año univ. | **Importación directa con atribución «Recopilación del autor»** (27 plantillas, todas verificadas con sympy ANTES de importar, 28 checks): G1–G18 → subtema nuevo systems/gauss (11 solución única, 4 indeterminados con 1 parámetro, 2 incompatibles; distractores = errores clásicos de Gauss); A1–A9 → systems/applications (azafrán 3/7/15 g, hipermercado 25/50/60 €, barbecho 2 ha, casas 10/6/4, hotel 100/70/30, libro 21 €, estadio 26000, bar NO determinable — rango 2, buñuelos 40/120/60). **G17**: la clave del tutor decía «incompatible» pero el sistema tiene solución única (2, 2, 0) — verificado por tres vías (sympy, det = 2 ≠ 0, sustitución directa) e importado con la respuesta verificada; avisado al tutor. **RONDA 2 (2026-10-05)**: hoja LaTeX propia de inecuaciones y valor absoluto (35 ítems únicos A–E, clave del tutor verificada con sympy 39/39, `download/verify_author_round2.py`): A1–A5 + D22 → rational/inequalities; B6–B10, C11–C20, D23–D27 → subtemas de valor absoluto de linear-equations; 21 + variaciones 21.1–21.8 → quadratics/discriminant. |
| 12 | `FUNDAMENTOS_DE_MATEMATICAS_ESPOL_Para_Ba.pdf` (982 págs., 56 MB, edición anterior) | libro de texto FCNM-ESPOL — **edición DIGITAL con texto nativo** (no escaneado) | ES | TUTOR_LICENSED (misma autorización que #3, 2026-10-02) | Bachillerato ECU | **PRIMERA IMPORTACIÓN REALIZADA (2026-10-03)**: Capítulo 2 «Ejercicios propuestos» (impresas 225–250 = PDF 258–283), encargo del tutor: «extrae los que consideres más difíciles o los más integradores». 41 plantillas curadas (factorización, fracciones algebraicas, ecuaciones con valor absoluto/literales/radicales, cuadráticas, 10 problemas de aplicación, 8 de sucesiones) — todas con doble verificación (clave impresa pp. 938–939 + sympy; script `download/verify_espol_ch2.py`). Clave #82 incompleta (9/4 → corregida a {0, 9/4}); #77a y #151 sin clave impresa (solo sympy). Persistida en `/home/z/espol-book/espol-digital.pdf`. Numeración de páginas propia — citar siempre esta edición. |

## Metadatos por fuente (esquema interno)

Cada problema importado lleva en su template: `source: { sourceId, license,
exerciseNumber?, page? }` + `reasoning` (tipo de razonamiento dominante:
`case-analysis | parameters | spurious | graphical | multi-concept | modeling |
definition-hunting | estimation`). El validador del banco
(`bun run validate:content`) comprueba que cada `sourceId` exista en el registro.

## Decisiones de curaduría (2026-10-01)

1. **Prioridad absoluta → valor absoluto** como prueba del sistema (5 problemas
   curados e importados; ver worklog).
2. **Cuarentena**: Übungsaufgaben ítem 5 — desigualdad racional cuya solución
   impresa (−3 < x < 1/3) no coincide con la derivación independiente
   ((−3, 2) para (2x+1)/(x−2) < 1). No se importa hasta revisión manual del tutor.
3. **FSP 2020** queda como referencia del nivel Challenge; su importación exige
   crear topics de cálculo (fase posterior, con aprobación del tutor).
4. **Fundamentos (FCNM-ESPOL)**: AUTORIZADO — el tutor confirmó el
   2026-10-01 tener "total permiso para usar los ejercicios del libro de la
   ESPOL" y asume la responsabilidad de la licencia. Reclassificada a
   TUTOR_LICENSED: importación directa con atribución, siempre con
   verificación programática independiente antes de integrar (mismo
   estándar que las demás fuentes curadas).
5. Kompetenzprofil Physik: calibra el nivel de física esperado (modelización,
   matematización) para las futuras fases de física.

## Próximas fases (propuestas)

- Fase 2: clasificación de los 23 ejercicios de la Übungsaufgaben pendientes +
  exámenes FOS/BOS 2010/2011 ítem por ítem.
- Fase 3: muestra curada de física (cinemática/dinámica con razonamiento de
  modelo, no sustitución) — pendiente de fuentes de física específicas o
  autorización para usar el Kompetenzprofil como guía de diseño.
- Fase 4: topics de cálculo (límites/series/derivadas) para desbloquear el FSP 2020.

## Actualización — importación ESPOL por capítulos (2026-10-01, tarde)

El libro completo (845 págs.) fue descargado del Drive del tutor a
`/tmp/espol.pdf` y auditado por secciones. Estado de la importación:

| Cap. | Sección | Estado |
|---|---|---|
| 3 | §3.9–3.10 (valor absoluto, ecuaciones) | 8 problemas importados (fase previa) |
| 3 | §3.11 ejercicios 121a, 121c, 126, 127d, 128b, 128c | **6 importados** (desigualdades cuadráticas/radicales + modelado bonos) |
| 4 | Ejercicios 62, 63, 64 (funciones por tramos) | **3 importados** (costo C(g), propiedades de f, ranking IMG) |
| 5 | §5.6 ejercicios 1d, 1e, 1f, 1h, 1k, 1l, 1m (ecuaciones) | **7 importados** (suma de soluciones en radianes) |
| 5 | §5.6 ejercicios 2c, 2d, 2e, 2g (inecuaciones) | **4 importados** (MC con distractores por error) |
| 5 | §5.6 ejercicio 58 (presión arterial) | **2 importados** (periodo; primer cruce por la línea media) |

Total curado de `fcnm-fundamentos`: **30 plantillas**. Todas verificadas con
sympy (ver `/home/z/tmp/verify_espol.py`) antes de importar. El OCR del libro
daña fórmulas; cada transcripción se validó contra las respuestas impresas
(pp. 799–845) Y con derivación independiente — los ítems con OCR ambiguo
(p. ej. 111, 127a–c) quedaron FUERA hasta poder confirmar el enunciado
impreso.

Pendiente del libro (candidatos vistos, aún no importados): §5.6 ej. 59
(potencias de coseno), §5.5 identidades (necesitan formato "demostración"),
Ch. 6 FundaRETOS (matrices de Leslie — requiere topic de matrices), ej. 112
(4x²−4xy−y²=1 literal), ej. 113 (meta-ecuación con cardinalidades).

## Actualización — segunda tanda ESPOL con modelo de visión (2026-10-01, noche)

A petición del tutor («no solo uses OCR, usa tu modelo de visión para ver las
páginas»), el libro se re-descargó a **`/home/z/espol-book/espol.pdf`**
(persistente) y las páginas objetivo se rasterizaron a 150–300 dpi para
**leerlas con el modelo de visión (VLM, glm-5v)** en lugar del OCR de texto.
La diferencia fue decisiva: el OCR había dañado tres importaciones previas.

| Cap. | Sección | Estado |
|---|---|---|
| 5 | §5.5 ej. 45e, 45i (identidades «reemplaza Δ») | **2 importados** (MC; clave: sen²y, 1/2) |
| 5 | §5.5 ej. 46c, 46e (valores exactos sin calculadora) | **2 importados** (expresión; 2−√3, √6+√2) |
| 5 | §5.5 ej. 47a, 47d (composiciones con arcsen/arccos/arctan) | **2 importados** ((√15+√3)/8, 3/4) |
| 5 | §5.5 ej. 49a, 49b (cadenas de cosenos) | **2 importados** (cot 10°, 1/64) |
| 5 | §5.6 ej. 53i, 53j, 53n (ecuaciones; suma de soluciones) | **3 importados** (8π, 7π/2, 3/4) |
| 5 | §5.6 ej. 54f, 54h, 54i, 54j (inecuaciones/funciones especiales) | **4 importados** (MC) |
| 5 | §5.6 ej. 55, 56 (conjuntos de verdad de implicaciones) | **2 importados** (MC) |
| 5 | §5.6 ej. 57a, 57b (dominios ln/√ trigonométricos) | **2 importados** (MC) |
| 5 | §5.6 ej. 59, 60 (adaptados: n=1; a=4, b=1) | **2 importados** (MC/numérico) |
| 3 | §3.11 ej. 110 (mezcla H₂SO₄), 111a/b (parámetro m), 112, 116 | **5 importados** |
| 3 | §3.11 ej. 113 (meta-ecuación de cardinalidades) | **1 importado** (challenge, MC) |
| 6 | §6.6 S.E.N.L. ej. 1, 3, 4 | **3 importados** (t=2; (2,−2); log₂5) |

**Correcciones de fidelidad** (el VLM re-lecto detectó que el OCR anterior
había deformado tres enunciados importados; se reescribieron contra la clave
impresa): `trigeq-espol-2c` (era cos−sen<−√2/2; el libro imprime
cos²−sen²<−½), `trigeq-espol-2d` (era ≥¼; el libro imprime ≤¼),
`trigeq-espol-2g` (era sgn; el libro imprime **µ**, escalón unitario, con
respuesta ∅). Además se renumeraron los ítems §5.6 previos a la numeración
real del libro (1x→53x, 2x→54x) para que el tutor pueda cruzar con el libro.

Verificación: **43/43 checks sympy** (`/home/z/tmp/verify_espol_vlm.py`):
cada respuesta re-derivada de forma independiente y cotejada con la clave
impresa (Ap=∅, Aq={54}, Ar={−11}, At={−16}, Au={59/19}, z=1 para la
meta-ecuación; t=2, {(2,−2)}, x=y=log₂5 para los S.E.N.L.; m=±1 /
«No es posible» para 111; etc.).

Total curado de `fcnm-fundamentos`: **60 plantillas** (banco completo:
519 → **549**). Pendiente del libro: §5.5 ej. 48/50–52 (demuestraciones —
requieren formato de demostración), §5.6 ej. 2 gráfico (arctan), Ch. 6
matrices (requiere topic nuevo), FundaRETOS.


## Hoja de la alumna (oct. 2025) — `alumna-worksheet-2025`

Fotos compartidas por el tutor el 2026-10-02 con la instrucción de
publicarlas («que eso esté en la página porfa»). **La transcripción del
propio tutor es la fuente de verdad** («te pasé las imagenes ya
transcribidas») — donde su texto difiere de lecturas automáticas, manda el
tutor.

Distribución de las 22 plantillas importadas:

| Sección | Contenido | Destino | Tipo | Dificultades |
|---|---|---|---|---|
| S1 · 1–4 | Factor común con exponentes con variable (ausklammern) | `polynomials/factoring` (poly-fact-03…06) | MC (4 opciones, distractores = errores clásicos, verificados no-equivalentes) | 3 medium, 1 hard |
| S2 · 1–7 | Simplificar fracciones algebraicas con exponentes literales | `rational/simplifying` (rat-simp-05…11) | expression | 5 medium, 2 hard |
| S3 · 1–7 | Anwendung: productos/cocientes con exponentes negativos, potencias de potencias | `foundations/powers` (found-pow-03…09) | expression | 3 medium, 4 hard |
| Venn · b–e | Encuesta mermelada/miel/Nutella (3 conjuntos) | `foundations/venn-diagrams` (found-venn-01…04, subtema nuevo) | numeric (19/28/81/73) | 3 medium, 1 hard |

Verificación: **23/23 checks sympy** (`/home/z/tmp/verify_alumna.py`). El
script corrigió TRES errores del primer cálculo mental (S3.2 → a⁴/(x⁴y¹²),
S3.4 → a⁸s²/(b⁸r⁴), S3.5 → a²/(16b⁵y)) — motivo de más para exigir
verificación programática de todo ejercicio curado. Los 12 distractores MC
fueron verificados numéricamente como NO equivalentes al correcto.

Adaptación documentada: al problema de Venn se añadió el supuesto «a cada
encuestado le gusta al menos uno de los tres alimentos» — sin él, la zona
central no queda determinada por los datos (x ∈ [0, 19]). Con el supuesto,
x = 19 y las regiones quedan 27/25/20/3/6/0/19 (suma 100; la zona
«miel∧Nutella sin mermelada» resulta 0). El supuesto está declarado dentro
del enunciado y en el paso «given» de cada solución.

**Política de contenido del tutor (2026-10-02)**: en matemáticas solo el
nivel Fundamento (easy) puede ser generado; Estándar/Avanzado/Desafío deben
provenir de fuentes reales. Los 187 generados de nivel medio+ que siguen en
el banco quedan MARCADOS como provisionales (badge ámbar en el problema,
aviso de cobertura en la página del tema, reporte por tema en
`bun run validate:content`) a la espera de reemplazo progresivo por
material real (el tutor irá añadiendo libros como el de la ESPOL).

## Actualización — SEGUNDA TANDA edición digital ESPOL (2026-10-04)

Encargo del tutor: «el 2.9 debe ir y el 2.12 también. Quiero que ahora vayas a
por los ejercicios del cap 3». Estado tras la importación:

| Sección | Contenido | Estado |
|---|---|---|
| 2 §2.9 Inecuaciones | #85, 86, 89 (V/F + MC), 92b, 93a–f, 94b–h (intervalos de texto y MC) | **16 importados** (pruebas #95–#100 fuera: falta UI de demostración) |
| 2 §2.12 Teorema del binomio | #116–124 (coeficientes, término k-ésimo, término independiente, análisis de exponentes) | **8 importados** (subtema nuevo polynomials/binomial-theorem) |
| 3 §3.1–3.3 Dominios, par/impar | #5e, #7, #8 (dominios duros), #14 (descomposición par/impar), #15d | **5 importados** (subtema nuevo functions/even-odd) |
| 3 §3.4 Asíntotas | #21, #22, #24a (agujero vs asíntota) | **3 importados** (subtema nuevo rational/asymptotes) |
| 3 §3.6–3.7 Tramos + modelización lineal | #31b (rango a trozos), #35, #37c, #39a | **4 importados** |
| 3 §3.8 Cuadráticas | #42, #44, #48, #53c, #54, #57b | **6 importados** |
| 3 §3.9–3.11 Composición e inversas | #61 (f∘g a trozos), #65, #66, #79, #85 | **5 importados** |
| 3 §3.12 Polinomiales | #87, #89, #90, #93, #94, #95, #97 | **7 importados** |
| 3 §3.13–3.14 Exponencial y logarítmica | #103a/b, #106, #121, #123, #113, #118a, #120a, #115b, #131e, #137a, #137d | **12 importados** |

Total de la tanda: **67 plantillas reales** (banco 643 → 710; con fuente real
181 → 248). Verificación: **69/69 checks sympy**
(`download/verify_espol_ch3.py`, clave impresa pp. 938–940 + derivación
independiente). Los enunciados con radicales/fracciones dañadas por la capa de
texto (#5e, #7, #8, #14, #61, #65, #66, #79, #85, #93c) se re-leyeron con el
modelo de visión contra la página impresa antes de transcribir. En #93c la
capa de texto había perdido las barras de valor absoluto (la transcripción
naiva contradecía la clave impresa); recuperadas visualmente.

**Corrección de fidelidad**: ninguna discrepancia clave-derivación en esta
tanda (a diferencia de #82 de la tanda 1); #117b y #121 no tienen clave
impresa — verificación solo sympy, anotado dentro de sus soluciones.

Pendiente del libro digital: §2.9 pruebas #95–#100, §2.10–2.11, resto del
cap. 3 (ver registro `fcnm-fundamentos-digital` para la lista completa),
cap. 4 (trigonometría) — a la espera de encargo del tutor.

## Actualización — TERCERA TANDA edición digital ESPOL + recopilación del autor ronda 2 (2026-10-05)

Encargo del tutor: «Dale el patch para añadir estos ejercicios» (hoja LaTeX
propia de inecuaciones y valor absoluto, secciones A–E con clave) + «Y también
más logaritmos y lo de trigonometría».

### Recopilación del autor — ronda 2 (`autor-recopilacion-2025`, 35 plantillas)

| Bloque | Ítems | Destino |
|---|---|---|
| A. Inecuaciones fraccionarias (con \|·\|) | A1–A5 | rational/inequalities |
| B. Ecuaciones con valor absoluto | B6–B10 | linear-equations/abs-equations |
| C. Inecuaciones con valor absoluto | C11–C20 | linear-equations/abs-inequalities |
| D. Paramétricas, sistemas y combinadas | D22 (rational), D23 (compound), D24–D27 (abs) | rational + linear-equations |
| E. Parábolas con parámetro «positiva para todo x» | 21 + 21.1–21.8 (3 vacías, 2 degeneradas en a=1/a=2) | quadratics/discriminant |

Clave del tutor verificada con sympy ANTES de importar:
**39/39 checks** (`download/verify_author_round2.py`, barrido exacto de
pertenencia con puntos algebraicos de frontera). D27: la clave del tutor
(−∞,−1−√2)∪(1+√2,∞) es correcta; una transcripción inicial errónea por
nuestra parte ((−∞,−1)∪…) fue cazada por el propio gate.

### Edición digital ESPOL — ronda 3 (59 plantillas)

| Sección | Contenido | Estado |
|---|---|---|
| 3 §3.14 Logaritmos (resto) | #118b/c/g, #120b, #131a–d/f/i, #132, #135, #136 | **13 importados** (131i con bases variables {1, 4, √2/2}; 131f con sustitución t = 5^{1/(2x)}) |
| 4 Ejercicios propuestos (fundamentos) | #10–12 (palabra), #13b–f y #14c–e (valores exactos), #25, #30 | **13 importados** → trig-foundations |
| 4 Ejercicios propuestos (funciones) | #15, #17, #19a/b (modelización; mareas de Tahiti con diagrama SVG en vivo), #20–#22d (trig. inversa), #24, #26–#29, #32, #33a/b/c/d/f, #36–#38, #40, #42, #48a-b (forma armónica R·cos(x−α)) | **27 importados** → trig-functions |
| 4 §4.6 Ecuaciones e inecuaciones | #45, #46, #47, #48d, #49, #50 | **6 importados** → trig-equations |

Total de la tanda: **94 plantillas reales** (banco 710 → 804; con fuente real
248 → 342). Verificación: **88/88 checks sympy** para el libro
(`download/verify_espol_ch4.py`, clave impresa pp. 940–941 + derivación
independiente). Los enunciados dañados por la capa de texto (familia #13,
valores de la gráfica #19, #20, #22, opciones de #25/#26, el radical de #28,
familia #33, el coeficiente √3 de #48) se re-leyeron con el modelo de visión
(200 dpi) antes de transcribir; la fracción de #32 se fijó por la clave (una
lectura VLM invertida fue descartada numéricamente).

**Errata de clave encontrada**: #48d — la clave impresa dice 7π/12, fuera del
dominio declarado [0, π/2]; se envía la respuesta verificada π/12 con la
errata documentada en el ítem (precedentes: #82 tanda 1, G17 recopilación).
**Nota 131b**: sobre el dominio natural completo x = 1−e también es solución
(sympy); el enunciado se restringe a la rama x > 1 para mantener la clave
impresa {1+e} — posible errata del libro, anotada.
**Duplicados**: #24 y #33f coinciden con §5.5 · 49a/49b de la edición
ESCANADA (trigf-espol-49a/49b); se mantienen ambas versiones (la digital
lleva las opciones impresas del libro) — desduplicación a decisión del tutor.

Pendiente del libro digital: §2.9 pruebas #95–#100, §2.10–2.11, resto del
cap. 3, cap. 4 #16 (MC con imágenes — falta UI), #18 (graficar), #31
(composición a trozos — falta UI), pruebas #34/#35/#43, y cap. 5+ (matrices,
complejos…).
