"use client";

/**
 * Anonymous progress dashboard (localStorage-backed, no accounts).
 */

import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight, Check, Eye, Flame, Lightbulb, RotateCcw, Sigma, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { es as dateEs, enUS as dateEn } from "date-fns/locale";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/context";
import { href } from "@/lib/router";
import { computeStats, loadProgress, resetProgress, type OverallStats } from "@/lib/progress";
import { mathCurriculum } from "@/content/curriculum/math";
import { physicsCurriculum } from "@/content/curriculum/physics";
import type { ProblemRecord, Subject } from "@/lib/types";
import { cn } from "@/lib/utils";

function timeAgo(ts: number, lang: "es" | "en"): string {
  try {
    return formatDistanceToNow(new Date(ts), {
      addSuffix: true,
      locale: lang === "es" ? dateEs : dateEn,
    });
  } catch {
    return "";
  }
}

function ActivityIcon({ r }: { r: ProblemRecord }) {
  if (r.firstTryCorrect) {
    return <Check className="h-4 w-4" aria-hidden="true" />;
  }
  if (r.revealedAnswer) {
    return <Eye className="h-4 w-4" aria-hidden="true" />;
  }
  if (r.hintsUsed > 0) {
    return <Lightbulb className="h-4 w-4" aria-hidden="true" />;
  }
  return <Sigma className="h-4 w-4" aria-hidden="true" />;
}

/** Uniform overview stat card — accent variant keeps the grid rhythm while
 *  letting one number (the streak) carry a little color. */
function StatCard({
  value,
  label,
  accent,
}: {
  value: ReactNode;
  label: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <p
        className={cn(
          "font-serif text-2xl font-semibold leading-tight",
          accent && "flex items-center gap-1.5 text-primary",
        )}
      >
        {value}
      </p>
      <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">{label}</p>
    </div>
  );
}

/** Consecutive calendar days (ending today, or yesterday if today is empty)
 *  on which at least one problem was attempted. */
function computeStreak(records: ProblemRecord[]): number {
  if (records.length === 0) return 0;
  const days = new Set(records.map((r) => new Date(r.timestamp).toDateString()));
  const cursor = new Date();
  if (!days.has(cursor.toDateString())) {
    // the streak survives until the end of today only if yesterday was active
    cursor.setDate(cursor.getDate() - 1);
    if (!days.has(cursor.toDateString())) return 0;
  }
  let streak = 0;
  while (days.has(cursor.toDateString())) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function ProgressView() {
  const { t, lang, formatNumber } = useI18n();
  const [stats, setStats] = useState<OverallStats | null>(null);

  useEffect(() => {
    // localStorage is an external system — read it async, then update state
    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) setStats(computeStats(loadProgress()));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  function handleReset() {
    resetProgress();
    setStats(computeStats(loadProgress()));
  }

  if (!stats) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div className="h-8 w-40 animate-pulse rounded bg-muted" />
      </div>
    );
  }

  const hasData = stats.attempted > 0;
  const streak = computeStreak(stats.recent);

  const overview = [
    { label: t("progress.overview.attempted"), value: stats.attempted },
    {
      label: t("progress.overview.firstTry"),
      value: stats.attempted > 0
        ? t("progress.topic.firstTry", { p: Math.round((stats.firstTryCorrect / stats.attempted) * 100) })
        : "—",
    },
    { label: t("progress.overview.solved"), value: stats.eventualCorrect },
    { label: t("progress.overview.hints"), value: stats.hintsUsed },
    { label: t("progress.overview.revealed"), value: stats.solutionsViewed },
  ];

  function renderSubjectSection(subject: Subject) {
    if (!stats) return null;
    const curriculum = subject === "math" ? mathCurriculum : physicsCurriculum;
    const entries = curriculum
      .map((topic) => ({ topic, s: stats.byTopic[`${subject}:${topic.id}`] }))
      .filter((e) => e.s && e.s.attempts > 0);
    if (entries.length === 0) return null;
    const accent = subject === "math" ? "bg-subject-math" : "bg-subject-physics";
    return (
      <section key={subject} aria-label={t(subject === "math" ? "nav.math" : "nav.physics")}>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {t(subject === "math" ? "nav.math" : "nav.physics")}
        </h3>
        <ul className="mt-3 space-y-3">
          {entries.map(({ topic, s }) => {
            const pct = s!.firstTryCorrect / s!.attempts;
            return (
              <li key={topic.id} className="rounded-xl border bg-card px-4 py-3.5">
                <div className="flex items-center justify-between gap-3">
                  <a
                    href={href({ name: "topic", subject, topicId: topic.id })}
                    className="truncate text-sm font-medium hover:underline"
                  >
                    {topic.name[lang]}
                  </a>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {s!.attempts === 1
                      ? t("progress.topic.oneAttempt")
                      : t("progress.topic.attempts", { n: formatNumber(s!.attempts) })}
                  </span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border">
                  <div
                    className={`h-full rounded-full ${accent}`}
                    style={{ width: `${Math.max(5, pct * 100)}%` }}
                  />
                </div>
                <p className="mt-1.5 text-[11px] text-muted-foreground">
                  {t("progress.topic.firstTry", { p: Math.round(pct * 100) })} ·{" "}
                  {timeAgo(s!.lastTs, lang)}
                </p>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-4xl font-semibold tracking-tight">{t("progress.title")}</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {t("progress.subtitle")}
          </p>
        </div>
        {hasData ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                className="gap-2 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
                {t("progress.reset")}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t("progress.reset.confirmTitle")}</AlertDialogTitle>
                <AlertDialogDescription>{t("progress.reset.confirmDesc")}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleReset}
                  className="bg-destructive text-white hover:bg-destructive/90"
                >
                  {t("common.confirm")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : null}
      </header>

      {!hasData ? (
        <div className="mt-12 rounded-2xl border border-dashed bg-card/60 px-6 py-16 text-center">
          <RotateCcw className="mx-auto h-8 w-8 text-muted-foreground/60" aria-hidden="true" />
          <h2 className="mt-4 font-serif text-2xl font-semibold">{t("progress.empty.title")}</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {t("progress.empty.desc")}
          </p>
          <Button asChild className="mt-6 gap-2 font-semibold">
            <a href={href({ name: "practice" })}>
              {t("progress.empty.cta")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {overview.map((o) => (
              <StatCard key={o.label} value={o.value} label={o.label} />
            ))}
            <StatCard
              accent
              value={
                <>
                  {streak}
                  <Flame className="h-4.5 w-4.5" aria-hidden="true" />
                </>
              }
              label={t("progress.streak")}
            />
          </div>

          <h2 className="mb-4 mt-10 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {t("progress.bySubject")}
          </h2>
          <div className="space-y-8">
            {renderSubjectSection("math")}
            {renderSubjectSection("physics")}
          </div>

          <h2 className="mb-4 mt-10 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {t("progress.recent")}
          </h2>
          <ul className="max-h-96 space-y-2 overflow-y-auto nice-scroll pr-1" aria-label={t("progress.recent")}>
            {stats.recent.map((r, i) => {
              const cur = r.subject === "math" ? mathCurriculum : physicsCurriculum;
              const topic = cur.find((tp) => tp.id === r.topicId);
              return (
                <li
                  key={`${r.templateId}:${r.seed}:${r.timestamp}`}
                  className="flex items-center gap-3 rounded-xl border bg-card px-4 py-3 text-sm"
                >
                  <span
                    className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                      r.firstTryCorrect
                        ? "bg-success/10 text-success"
                        : r.revealedAnswer
                          ? "bg-diff-medium/10 text-diff-medium"
                          : "bg-muted text-muted-foreground"
                    }`}
                    aria-hidden="true"
                  >
                    <ActivityIcon r={r} />
                  </span>
                  <span className="min-w-0 flex-1 truncate">
                    <span className="font-medium">{topic?.name[lang] ?? r.topicId}</span>
                    <span className="text-muted-foreground"> · {t(`difficulty.${r.difficulty}`)}</span>
                  </span>
                  <span className="shrink-0 text-xs text-muted-foreground">{timeAgo(r.timestamp, lang)}</span>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
