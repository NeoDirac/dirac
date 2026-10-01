# Inventario de fuentes — Fase 1 (auditoría)

Carpeta del tutor: `drive.google.com/drive/folders/1W9iYhZKMy6nrcgAbHKzg5a434cR1NEct`
Auditada el 2026-10-01. 9 archivos (7 PDF + 2 JPEG). Registro máquina:
`src/content/sources/registry.ts`.

## Resumen por fuente

| # | Archivo | Tipo | Idioma | Licencia (clasificación) | Nivel | Uso para el banco |
|---|---|---|---|---|---|---|
| 1 | `11_Kompetenzprofil_Physik.pdf` (6 págs.) | marco curricular oficial | DE | OPEN_LICENSE | Studienkolleg T/M | Calibración del nivel de física. Sin problemas. |
| 2 | `FP-M-2010-HT.pdf` (5 págs., escaneado) | notas trabajadas del tutor | DE/ES | INSTRUCTOR_CREATED | FP / Studienkolleg | **Importación directa**: \|2x−1\|=\|3x+5\| con casos; f(x)=\|2x+1\|−\|3x+2\| vs g(x)=−1; \|2,5x−7,5\| vs 0,5x²−3x+6,5; \|½x−2\|−\|¼+x\| vs −⅓x+2. |
| 3 | `Fundamentos de Matematicas Para Bachillerato.pdf` (845 págs., 206 MB) | libro de texto | ES | **REQUIRES_REVIEW** (© 2017, FCNM-ESPOL) | Bachillerato ECU | Solo referencia (alineación del plan ecuatoriano; ideas Foundation/Standard). Sin importación literal sin autorización. |
| 4 | `Ubungsaufgaben...StandJan18.pdf` (23 págs.) | colección de preparación oficial | DE | OPEN_LICENSE | Studienkolleg Bayern | **Importación directa con atribución**: división de polinomios (§1), desigualdades (§5), parámetros (k: x²−kx+k+3), log (§8), trigonometría. **Ítem 5 en cuarentena**: la solución impresa contradice la re-derivación independiente — requiere revisión manual antes de importar. |
| 5 | `clase 30-sep.pdf` (5 págs.) | examen FOS/BOS 2010 HT (texto) | DE | OPEN_LICENSE | FOS/BOS | **Importación directa con atribución**: reescritura de términos con dominio, posición de un punto vs parábola, recta∩parábola, LGS, sección de semiesfera, área del trébol. |
| 6 | `stknew_FSP Mathematik WS 2019-2020.pdf` (4 págs.) | examen FSP 27.01.2020 (texto) | DE | OPEN_LICENSE | Studienkolleg (1.er semestre) | **Referencia del techo superior**. Fuera del alcance actual (límites, series, Taylor, integrales, autovalores, geometría 3D): requiere topics nuevos de cálculo. Registrado para la expansión. |
| 7 | `unknown-3pages.pdf` (3 págs., escaneado) = FOS/BOS 2011 + Lösungsvorschlag | examen estatal | DE | OPEN_LICENSE | FOS/BOS | Importación tras verificar OCR: fracciones con dominio, raíces/vértice (redondeo), LGS, área del trébol (Kleeblatt), verdadero/falso sobre rectas. |
| 8 | `desigualdades.jpeg` (imagen de clase) | hoja de problemas del tutor | DE | INSTRUCTOR_CREATED | FP / Studienkolleg | **Importación directa** (misma hoja que #2): tres problemas de valor absoluto con análisis por intervalos y comparación gráfico-analítico. |
| 9 | `preguntas.jpeg` (Kurzkontrolle 1) | control corto del tutor | DE | INSTRUCTOR_CREATED | Studienkolleg | **Importación directa**: conjunto de soluciones reales de (x+2)(x−5)(x²+9)(x²−25)=0 (descarte de raíces no reales); Venn de 3 conjuntos (encuesta); operaciones de intervalos. |

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
4. **Fundamentos (FCNM-ESPOL)**: solo referencia. El tutor debe confirmar si su
   uso privado autoriza transcripciones literales; mientras tanto no se importa.
5. Kompetenzprofil Physik: calibra el nivel de física esperado (modelización,
   matematización) para las futuras fases de física.

## Próximas fases (propuestas)

- Fase 2: clasificación de los 23 ejercicios de la Übungsaufgaben pendientes +
  exámenes FOS/BOS 2010/2011 ítem por ítem.
- Fase 3: muestra curada de física (cinemática/dinámica con razonamiento de
  modelo, no sustitución) — pendiente de fuentes de física específicas o
  autorización para usar el Kompetenzprofil como guía de diseño.
- Fase 4: topics de cálculo (límites/series/derivadas) para desbloquear el FSP 2020.
