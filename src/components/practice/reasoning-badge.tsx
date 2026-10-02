"use client";

/**
 * ReasoningBadge — the dominant intellectual process a problem demands.
 *
 * Part of the content-quality program: difficulty reflects the reasoning
 * process (not the size of the numbers), and curated problems carry a
 * `reasoning` tag. Showing it next to the skill trains students to name
 * the kind of thinking each exercise is really asking for.
 */

import { Brain } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";
import type { ReasoningType } from "@/lib/types";

/** Bilingual labels for each reasoning process (idiomatic, student-facing). */
const LABEL: Record<ReasoningType, { es: string; en: string }> = {
  "case-analysis": { es: "Análisis por casos", en: "Case analysis" },
  parameters: { es: "Trabajo con parámetros", en: "Working with parameters" },
  spurious: { es: "Raíces espurias", en: "Spurious roots" },
  graphical: { es: "Lectura gráfica", en: "Graphical reading" },
  "multi-concept": { es: "Multi-concepto", en: "Multi-concept" },
  modeling: { es: "Modelización", en: "Modeling" },
  "definition-hunting": { es: "Definiciones al detalle", en: "Definition hunting" },
  estimation: { es: "Estimación", en: "Estimation" },
};

const HINT: Record<ReasoningType, { es: string; en: string }> = {
  "case-analysis": {
    es: "Este ejercicio exige separar el problema en casos y tratar cada uno por separado",
    en: "This exercise demands splitting the problem into cases and handling each separately",
  },
  parameters: {
    es: "Este ejercicio gira en torno a un parámetro: la respuesta depende de su valor",
    en: "This exercise revolves around a parameter: the answer depends on its value",
  },
  spurious: {
    es: "Cuidado: alguna candidata a solución puede no satisfacer la condición original",
    en: "Careful: a candidate solution may fail the original condition",
  },
  graphical: {
    es: "Este ejercicio se lee mejor traduciendo entre gráfica y cálculo",
    en: "This exercise reads best by translating between graph and computation",
  },
  "multi-concept": {
    es: "Este ejercicio encadena varias destrezas en un mismo desarrollo",
    en: "This exercise chains several skills in one development",
  },
  modeling: {
    es: "Este ejercicio pide traducir una situación real a matemáticas antes de calcular",
    en: "This exercise asks you to translate a real situation into math before computing",
  },
  "definition-hunting": {
    es: "La clave está en aplicar una definición con precisión",
    en: "The key lies in applying a definition precisely",
  },
  estimation: {
    es: "Aquí importa el orden de magnitud más que el valor exacto",
    en: "Here the order of magnitude matters more than the exact value",
  },
};

export function ReasoningBadge({
  reasoning,
  className,
}: {
  reasoning: ReasoningType;
  className?: string;
}) {
  const { t, lang } = useI18n();
  const label = LABEL[reasoning];
  const hint = HINT[reasoning];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-dashed border-foreground/25 bg-secondary/60 px-2.5 py-0.5 text-xs font-medium text-foreground/80",
        className,
      )}
      title={hint[lang]}
    >
      <Brain className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span className="sr-only">{`${t("reasoning.label")}: ${label[lang]} — ${hint[lang]}`}</span>
      <span aria-hidden="true">{label[lang]}</span>
    </span>
  );
}
