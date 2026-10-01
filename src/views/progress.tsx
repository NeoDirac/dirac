"use client";

/**
 * Anonymous progress dashboard (localStorage-backed, no accounts).
 */

import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowRight,
  BookOpen,
  CalendarClock,
  Check,
  CheckCircle2,
  Crosshair,
  Download,
  Eye,
  Flame,
  Lightbulb,
  RotateCcw,
  Sigma,
  Target,
  Timer,
  Trash2,
} from "lucide-react";
import { format, formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";
import { es as dateEs, enUS as dateEn } from "date-fns/locale";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { useToast } from "@/hooks/use-toast";
import { href, sessionHref } from "@/lib/router";
import { ActivityHeatmap, AccuracyTrend } from "@/components/practice/activity-insights";
import {
  computeStats,
  loadProgress,
  loadSessions,
  resetProgress,
  type OverallStats,
} from "@/lib/progress";
import { mathCurriculum } from "@/content/curriculum/math";
import { physicsCurriculum } from "@/content/curriculum/physics";
import { downloadRecordsCsv, downloadSessionsCsv } from "@/lib/export";
import { loadReview, type ReviewEntry } from "@/lib/review";
import type { ProblemRecord, SessionRecord, Subject } from "@/lib/types";
import { cn, formatDuration } from "@/lib/utils";

/** A topic needs attention once there is enough evidence: at least 3 attempts
 *  and under 50% first-try accuracy. */
function isWeakTopic(attempts: number, firstTryCorrect: number): boolean {
  return attempts >= 3 && attempts > 0 && firstTryCorrect / attempts < 0.5;
}

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

function sessionDate(ts: number, lang: "es" | "en"): string {
  try {
    return format(new Date(ts), "EEE d MMM · HH:mm", {
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

/** Uniform overview stat card — number + label + quiet icon. The accent
 *  variant lets one number (the streak) carry a little color. */
function StatCard({
  value,
  label,
  icon: Icon,
  accent,
}: {
  value: ReactNode;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  accent?: boolean;
}) {
  return (
    <div className="flex min-h-[5.25rem] flex-col justify-between rounded-xl border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-ring/50 hover:shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <p
          className={cn(
            "font-serif text-2xl font-bold leading-tight tabular-nums",
            accent && "flex items-center gap-1.5 text-primary",
          )}
        >
          {value}
        </p>
        {Icon ? (
          <span
            className={cn(
              "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg",
              accent ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
            )}
            aria-hidden="true"
          >
            <Icon className="h-4 w-4" />
          </span>
        ) : null}
      </div>
      <p className="mt-1 text-[11px] leading-snug text-muted-foreground">{label}</p>
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

/** Section header with a trailing hairline — a quiet editorial anchor that
 *  separates dashboard zones without adding color noise. */
function SectionHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <h2 className="shrink-0 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </h2>
      <span className="h-px flex-1 bg-border" aria-hidden="true" />
    </div>
  );
}

/** Human label for one finished session (subject · topic, or mixed). */
function sessionLabel(s: SessionRecord, lang: "es" | "en"): string {
  const subjectStr =
    s.subjects.length === 1
      ? s.subjects[0] === "math"
        ? lang === "es"
          ? "Matemáticas"
          : "Mathematics"
        : lang === "es"
          ? "Física"
          : "Physics"
      : lang === "es"
        ? "Mixto"
        : "Mixed";
  if (s.topicId && s.subjects.length === 1) {
    const cur = s.subjects[0] === "math" ? mathCurriculum : physicsCurriculum;
    const topic = cur.find((tp) => tp.id === s.topicId);
    if (topic) return `${subjectStr} · ${topic.name[lang]}`;
  }
  return subjectStr;
}

export function ProgressView() {
  const { t, lang, formatNumber } = useI18n();
  const { toast } = useToast();
  const [stats, setStats] = useState<OverallStats | null>(null);
  const [sessions, setSessions] = useState<SessionRecord[]>([]);
  const [reviewEntries, setReviewEntries] = useState<ReviewEntry[]>([]);
  const [records, setRecords] = useState<ProblemRecord[]>([]);

  useEffect(() => {
    // localStorage is an external system — read it async, then update state
    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) {
        const state = loadProgress();
        setRecords(state.records);
        setStats(computeStats(state));
        setSessions(loadSessions().sessions.slice(-8).reverse());
        setReviewEntries(loadReview().entries);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  function handleReset() {
    resetProgress();
    const state = loadProgress();
    setRecords(state.records);
    setStats(computeStats(state));
    setSessions([]);
    setReviewEntries([]);
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

  // weakest topic with enough evidence — powers the suggestion band
  const suggestion = (() => {
    const entries = Object.values(stats.byTopic).filter(
      (s) => s.attempts >= 3 && s.firstTryCorrect / s.attempts < 0.5,
    );
    entries.sort((a, b) => a.firstTryCorrect / a.attempts - b.firstTryCorrect / b.attempts);
    return entries[0] ?? null;
  })();
  const suggestionTopic = suggestion
    ? (suggestion.subject === "math" ? mathCurriculum : physicsCurriculum).find(
        (tp) => tp.id === suggestion.topicId,
      )
    : undefined;

  const overview = [
    { label: t("progress.overview.attempted"), value: stats.attempted, icon: Target },
    {
      label: t("progress.overview.firstTry"),
      value:
        stats.attempted > 0
          ? t("progress.topic.firstTry", { p: Math.round((stats.firstTryCorrect / stats.attempted) * 100) })
          : "—",
      icon: Crosshair,
    },
    { label: t("progress.overview.solved"), value: stats.eventualCorrect, icon: CheckCircle2 },
    {
      label: t("progress.overview.time"),
      value: stats.timeSec >= 5 ? formatDuration(stats.timeSec) : "—",
      icon: Timer,
    },
    { label: t("progress.overview.hints"), value: stats.hintsUsed, icon: Lightbulb },
    {
      label: t("progress.overview.revealedAnswers"),
      value: stats.revealedAnswers,
      icon: Eye,
    },
    { label: t("progress.overview.revealed"), value: stats.solutionsViewed, icon: BookOpen },
  ];

  function renderSubjectSection(subject: Subject) {
    if (!stats) return null;
    const curriculum = subject === "math" ? mathCurriculum : physicsCurriculum;
    const entries = curriculum
      .map((topic) => ({
        topic,
        s: stats.byTopic[`${subject}:${topic.id}`],
        review: reviewEntries.find((r) => r.subject === subject && r.topicId === topic.id),
      }))
      .filter((e) => e.s && e.s.attempts > 0);
    if (entries.length === 0) return null;
    const accent = subject === "math" ? "bg-subject-math" : "bg-subject-physics";
    return (
      <section key={subject} aria-label={t(subject === "math" ? "nav.math" : "nav.physics")}>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {t(subject === "math" ? "nav.math" : "nav.physics")}
        </h3>
        <ul className="mt-3 space-y-3">
          {entries.map(({ topic, s, review }) => {
            const pct = s!.firstTryCorrect / s!.attempts;
            const avgSec = s!.timedRecords > 0 ? Math.round(s!.timeSec / s!.timedRecords) : 0;
            const weak = isWeakTopic(s!.attempts, s!.firstTryCorrect);
            const reviewDue = review && review.dueAt <= Date.now();
            let reviewIn = "";
            if (review && !reviewDue) {
              try {
                reviewIn = formatDistanceToNowStrict(new Date(review.dueAt), {
                  locale: lang === "es" ? dateEs : dateEn,
                });
              } catch {
                /* date-fns guard */
              }
            }
            return (
              <li key={topic.id} className="rounded-xl border bg-card px-4 py-3.5 transition-colors hover:border-ring/50">
                <div className="flex items-center justify-between gap-3">
                  <a
                    href={href({ name: "topic", subject, topicId: topic.id })}
                    className="truncate text-sm font-medium hover:underline"
                  >
                    {topic.name[lang]}
                    {weak ? (
                      <span
                        className="ml-2 rounded-full border border-diff-medium/40 bg-diff-medium/10 px-2 py-0.5 align-middle text-[10px] font-semibold uppercase tracking-wide text-diff-medium"
                        title={t("progress.suggested.title")}
                      >
                        {t("progress.topic.weak")}
                      </span>
                    ) : null}
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
                <p className="mt-1.5 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[11px] text-muted-foreground">
                  <span>{t("progress.topic.firstTry", { p: Math.round(pct * 100) })}</span>
                  {avgSec > 0 ? (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{t("progress.topic.avgTime", { t: formatDuration(avgSec, { compact: true }) })}</span>
                    </>
                  ) : null}
                  <span aria-hidden="true">·</span>
                  <span>{timeAgo(s!.lastTs, lang)}</span>
                  {review ? (
                    reviewDue ? (
                      <a
                        href={sessionHref({
                          mode: "topic",
                          subjects: [subject],
                          topicId: topic.id,
                          difficulty: "any",
                          count: 10,
                          seed: 0,
                        })}
                        className="inline-flex items-center gap-1 rounded-full border border-diff-medium/40 bg-diff-medium/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-diff-medium transition-colors hover:border-diff-medium hover:bg-diff-medium/20"
                      >
                        <CalendarClock className="h-3 w-3" aria-hidden="true" />
                        {t("progress.review.due")}
                      </a>
                    ) : reviewIn ? (
                      <span className="inline-flex items-center gap-1 text-[10px]">
                        <CalendarClock className="h-3 w-3" aria-hidden="true" />
                        {t("progress.review.in", { t: reviewIn })}
                      </span>
                    ) : null
                  ) : null}
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
          <div className="flex shrink-0 items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button type="button" variant="outline" className="gap-2">
                  <Download className="h-4 w-4" aria-hidden="true" />
                  {t("progress.export")}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>{t("progress.export.label")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => { downloadRecordsCsv(); toast({ description: t("progress.export.done") }); }} className="gap-2">
                  <Sigma className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  {t("progress.export.records")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { downloadSessionsCsv(); toast({ description: t("progress.export.done") }); }} className="gap-2">
                  <Target className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  {t("progress.export.sessions")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="gap-2 border-destructive/40 bg-destructive/5 text-destructive hover:border-destructive hover:bg-destructive/10 hover:text-destructive"
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
          </div>
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
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {overview.map((o) => (
              <StatCard key={o.label} value={o.value} label={o.label} icon={o.icon} />
            ))}
            <StatCard
              accent
              icon={Flame}
              value={streak}
              label={t("progress.streak")}
            />
          </div>

          {suggestion && suggestionTopic ? (
            <section
              aria-labelledby="suggestion-heading"
              className="mt-8 flex flex-col items-start gap-4 rounded-2xl border border-diff-medium/30 bg-diff-medium/5 px-5 py-4 sm:flex-row sm:items-center"
            >
              <span
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-diff-medium/15 text-diff-medium"
                aria-hidden="true"
              >
                <Target className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <h2
                  id="suggestion-heading"
                  className="text-sm font-semibold uppercase tracking-wider text-diff-medium"
                >
                  {t("progress.suggested.title")}
                </h2>
                <p className="mt-1 text-[15px] font-medium leading-snug">
                  {suggestionTopic.name[lang]}
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    {t("progress.topic.firstTry", {
                      p: Math.round((suggestion.firstTryCorrect / suggestion.attempts) * 100),
                    })}{" "}
                    ·{" "}
                    {suggestion.attempts === 1
                      ? t("progress.topic.oneAttempt")
                      : t("progress.topic.attempts", { n: formatNumber(suggestion.attempts) })}
                  </span>
                </p>
              </div>
              <Button asChild className="shrink-0 gap-2 font-semibold">
                <a
                  href={sessionHref({
                    mode: "topic",
                    subjects: [suggestion.subject],
                    topicId: suggestion.topicId,
                    difficulty: "any",
                    count: 10,
                    seed: 0,
                  })}
                >
                  {t("progress.suggested.cta")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </section>
          ) : null}

          <div className="mt-12">
            <SectionHeader label={t("activity.title")} />
            <div className="mt-4 space-y-4">
              <ActivityHeatmap records={records} />
              <AccuracyTrend records={records} />
            </div>
          </div>

          <div className="mt-12">
            <SectionHeader label={t("progress.bySubject")} />
            <div className="mt-4 space-y-8">
              {renderSubjectSection("math")}
              {renderSubjectSection("physics")}
            </div>
          </div>

          {sessions.length > 0 ? (
            <div className="mt-12">
              <SectionHeader label={t("progress.sessions")} />
              <ul className="mt-4 space-y-2.5" aria-label={t("progress.sessions")}>
                {sessions.map((s, i) => {
                  const pct = s.problems > 0 ? Math.round((s.solved / s.problems) * 100) : 0;
                  const firstPct = s.problems > 0 ? Math.round((s.firstTryCorrect / s.problems) * 100) : 0;
                  return (
                    <li
                      key={`${s.endedAt}:${i}`}
                      className="flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-xl border bg-card px-4 py-3 text-sm transition-colors hover:border-ring/50"
                    >
                      <span
                        className={cn(
                          "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                          pct >= 70
                            ? "bg-success/10 text-success"
                            : pct >= 40
                              ? "bg-diff-medium/10 text-diff-medium"
                              : "bg-destructive/10 text-destructive",
                        )}
                        aria-hidden="true"
                      >
                        <Target className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium">
                          {sessionLabel(s, lang)}
                          {s.review ? (
                            <span className="ml-2 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                              {t("progress.sessionReview")}
                            </span>
                          ) : null}
                        </span>
                        <span className="block text-xs text-muted-foreground">
                          {sessionDate(s.endedAt, lang)} ·{" "}
                          {t("progress.sessionScore", {
                            solved: s.solved,
                            total: s.problems,
                          })}
                          {s.firstTryCorrect > 0 && s.firstTryCorrect < s.problems
                            ? ` · ${t("progress.topic.firstTry", { p: firstPct })}`
                            : ""}
                        </span>
                      </span>
                      {typeof s.elapsedSec === "number" && s.elapsedSec >= 60 ? (
                        <span
                          className="inline-flex shrink-0 items-center gap-1 text-xs tabular-nums text-muted-foreground"
                          title={t("summary.time")}
                        >
                          <Timer className="h-3 w-3" aria-hidden="true" />
                          {formatDuration(s.elapsedSec, { compact: true })}
                        </span>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}

          <div className="mt-12">
            <SectionHeader label={t("progress.recent")} />
            <ul className="mt-4 max-h-96 space-y-2.5 overflow-y-auto nice-scroll pr-1" aria-label={t("progress.recent")}>
              {stats.recent.map((r, i) => {
                const cur = r.subject === "math" ? mathCurriculum : physicsCurriculum;
                const topic = cur.find((tp) => tp.id === r.topicId);
                return (
                  <li
                    key={`${r.templateId}:${r.seed}:${r.timestamp}`}
                    className="flex items-center gap-3 rounded-xl border bg-card px-4 py-3 text-sm transition-colors hover:border-ring/50"
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
                      {typeof r.timeSec === "number" && r.timeSec >= 10 ? (
                        <span className="text-muted-foreground/70"> · {formatDuration(r.timeSec, { compact: true })}</span>
                      ) : null}
                    </span>
                    <span className="shrink-0 text-xs text-muted-foreground">{timeAgo(r.timestamp, lang)}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
