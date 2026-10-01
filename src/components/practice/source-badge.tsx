"use client";

/**
 * SourceBadge — provenance marker for curated problems.
 *
 * Problems transcribed from a real source (exam, prep collection, the
 * tutor's own class sheets) carry a SourceRef. The badge makes that
 * visible on the problem card: students see they are training on real
 * exam material, and the full attribution is one hover away.
 */

import { BookMarked } from "lucide-react";
import { sourceById } from "@/content/sources/registry";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";
import type { SourceRef } from "@/lib/types";

const KIND_LABEL: Record<string, { es: string; en: string }> = {
  exam: { es: "Examen real", en: "Real exam" },
  "problem-collection": { es: "Colección oficial", en: "Official collection" },
  "class-sheet": { es: "Hoja de clase", en: "Class sheet" },
  textbook: { es: "Libro de texto", en: "Textbook" },
};

export function SourceBadge({
  source,
  className,
}: {
  source: SourceRef;
  className?: string;
}) {
  const { t, lang } = useI18n();
  const record = sourceById(source.sourceId);
  if (!record) return null;

  const kindLabel = KIND_LABEL[record.kind];
  const kindText = kindLabel
    ? kindLabel[lang]
    : record.kind === "framework"
      ? t("source.kind.framework")
      : record.kind;
  const title = `${record.title} — ${record.origin}`;
  const short = record.short[lang];
  const exercise = source.exerciseNumber ? ` · ${t("source.exercise")} ${source.exerciseNumber}` : "";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/5 px-2.5 py-0.5 text-xs font-medium text-primary",
        className,
      )}
      title={title}
    >
      <BookMarked className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span className="sr-only">{`${kindText}: ${title}${exercise}`}</span>
      <span aria-hidden="true">
        {kindText}: {short}
        {exercise}
      </span>
    </span>
  );
}
