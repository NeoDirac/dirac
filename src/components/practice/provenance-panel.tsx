"use client";

/**
 * ProvenancePanel — "real sources" analytics for the progress dashboard.
 *
 * Aggregates the student's records by curated source: how many real-exam,
 * textbook or class-sheet problems they have trained on, and their first-try
 * accuracy on each source. Hidden entirely while no curated problem has
 * been attempted (the section earns its place with data).
 */

import { useEffect, useState } from "react";
import { BookMarked, GraduationCap, Landmark, BookOpen, FileText } from "lucide-react";
import { getAllTemplates } from "@/content";
import { SOURCES } from "@/content/sources/registry";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";
import type { ProblemRecord } from "@/lib/types";

/** icon per source kind (visual identity, never the only signal — label too) */
const KIND_ICON: Record<string, typeof BookMarked> = {
  exam: FileText,
  "problem-collection": Landmark,
  textbook: BookOpen,
  "class-sheet": GraduationCap,
  framework: BookMarked,
};

interface SourceRow {
  sourceId: string;
  count: number;
  firstTry: number;
}

export function ProvenancePanel({ records }: { records: ProblemRecord[] }) {
  const { t, lang, formatNumber } = useI18n();
  const [rows, setRows] = useState<SourceRow[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const templates = await getAllTemplates();
      if (cancelled) return;
      const bySource = new Map<string, SourceRow>();
      for (const r of records) {
        const tpl = templates.find((tp) => tp.id === r.templateId);
        const sid = tpl?.source?.sourceId;
        if (!sid) continue;
        const row = bySource.get(sid) ?? { sourceId: sid, count: 0, firstTry: 0 };
        row.count += 1;
        if (r.firstTryCorrect) row.firstTry += 1;
        bySource.set(sid, row);
      }
      const sorted = [...bySource.values()].sort((a, b) => b.count - a.count);
      setRows(cancelled ? null : sorted);
    })();
    return () => {
      cancelled = true;
    };
  }, [records]);

  if (!rows || rows.length === 0) return null;

  return (
    <section aria-label={t("provenance.title")} className="rounded-2xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {t("provenance.title")}
        </h3>
        <span className="text-xs text-muted-foreground">
          {(() => {
            const total = rows.reduce((acc, r) => acc + r.count, 0);
            return (total === 1
              ? t("provenance.subtitle", { n: formatNumber(total) })
              : t("provenance.subtitlePlural", { n: formatNumber(total) }));
          })()}
        </span>
      </div>
      <ul className="mt-4 space-y-2.5">
        {rows.map((row) => {
          const record = SOURCES.find((s) => s.id === row.sourceId);
          if (!record) return null;
          const pct = row.count > 0 ? Math.round((row.firstTry / row.count) * 100) : 0;
          const Icon = KIND_ICON[record.kind] ?? BookMarked;
          return (
            <li
              key={row.sourceId}
              className="group rounded-xl border bg-background/40 px-4 py-3 transition-colors hover:border-ring/50"
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                <span
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                  aria-hidden="true"
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{record.short[lang]}</span>
                  <span className="block truncate text-xs text-muted-foreground" title={record.title}>
                    {record.origin}
                  </span>
                </span>
                <span className="text-right">
                  <span className="block text-sm font-semibold tabular-nums">
                    {row.count === 1
                      ? t("provenance.problems", { n: formatNumber(row.count) })
                      : t("provenance.problemsPlural", { n: formatNumber(row.count) })}
                  </span>
                  <span
                    className={cn(
                      "block text-xs tabular-nums",
                      pct >= 70
                        ? "text-success"
                        : pct >= 40
                          ? "text-diff-medium"
                          : "text-destructive",
                    )}
                  >
                    {t("provenance.firstTry", { p: pct })}
                  </span>
                </span>
              </div>
              {/* accuracy meter — same quiet language as the topic rows */}
              <div
                className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-muted"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={pct}
                aria-label={t("provenance.firstTry", { p: pct })}
              >
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    pct >= 70 ? "bg-success" : pct >= 40 ? "bg-diff-medium" : "bg-destructive",
                  )}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
