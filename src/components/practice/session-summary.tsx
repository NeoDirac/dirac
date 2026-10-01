"use client";

/**
 * Session summary — restrained stats overview + per-problem review list.
 */

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, BarChart3, CalendarClock, Check, CheckCircle2, CircleOff, ClipboardCopy, Eye, Lightbulb, RefreshCw, SkipForward, Target, Timer, Trophy, XCircle } from "lucide-react";
import type { ReactNode } from "react";
import { format, formatDistanceToNowStrict } from "date-fns";
import { es as dateEs, enUS as dateEn } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/lib/i18n/context";
import { href } from "@/lib/router";
import { mathCurriculum } from "@/content/curriculum/math";
import { physicsCurriculum } from "@/content/curriculum/physics";
import type { Problem, SessionConfig } from "@/lib/types";
import { findReviewEntry } from "@/lib/review";
import { countToday, loadDailyGoal } from "@/lib/goal";
import { loadProgress } from "@/lib/progress";
import type { ProblemState } from "./state";
import { cn, copyToClipboard, formatDuration } from "@/lib/utils";

/** Fixed confetti layout — deterministic so the render stays pure. */
const CONFETTI: { x: number; delay: number; dur: number; color: string }[] = [
  { x: 6, delay: 0, dur: 2600, color: "var(--subject-math)" },
  { x: 14, delay: 900, dur: 3000, color: "var(--subject-physics)" },
  { x: 22, delay: 300, dur: 2400, color: "var(--primary)" },
  { x: 30, delay: 1200, dur: 3200, color: "var(--success)" },
  { x: 38, delay: 600, dur: 2800, color: "var(--diff-medium)" },
  { x: 46, delay: 1500, dur: 2600, color: "var(--subject-math)" },
  { x: 54, delay: 200, dur: 3100, color: "var(--primary)" },
  { x: 62, delay: 1000, dur: 2700, color: "var(--subject-physics)" },
  { x: 70, delay: 400, dur: 2500, color: "var(--success)" },
  { x: 78, delay: 1300, dur: 3000, color: "var(--diff-medium)" },
  { x: 86, delay: 700, dur: 2800, color: "var(--subject-math)" },
  { x: 93, delay: 1100, dur: 2600, color: "var(--primary)" },
];

export function SessionSummary({
  config,
  deck,
  states,
  times,
  elapsedSec,
  onAgain,
  onRetryMissed,
}: {
  config: SessionConfig;
  deck: Problem[];
  states: ProblemState[];
  /** seconds spent per problem (undefined = still open) */
  times?: (number | undefined)[];
  /** total active session seconds */
  elapsedSec?: number;
  onAgain: () => void;
  onRetryMissed: () => void;
}) {
  const { t, lang, formatNumber } = useI18n();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [nextReview, setNextReview] = useState<{ dueAt: number; level: number } | null>(null);
  const [goalDone, setGoalDone] = useState<{ done: number; total: number } | null>(null);

  // focused topic sessions carry a spaced-repetition schedule — read it after
  // mount so the hint survives refreshes of an ended session
  const isTopicSession =
    (config.mode === "topic" || config.mode === "single") &&
    config.topicId &&
    config.subjects.length === 1;
  useEffect(() => {
    if (!isTopicSession || !config.topicId) return;
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      const entry = findReviewEntry(config.subjects[0], config.topicId!);
      if (entry && entry.dueAt > Date.now()) {
        setNextReview({ dueAt: entry.dueAt, level: entry.level });
      }
    });
    return () => {
      cancelled = true;
    };
  }, [isTopicSession, config.subjects, config.topicId]);

  // daily-goal celebration — shown when THIS session pushed today's count to
  // the goal (records for its problems are already persisted by now)
  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      const attemptedInSession = states.filter((s) => s.attempts.length > 0).length;
      if (attemptedInSession === 0) return;
      const today = countToday(loadProgress().records);
      const goal = loadDailyGoal();
      if (today >= goal && today - attemptedInSession < goal) {
        setGoalDone({ done: today, total: goal });
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  let reviewIn = "";
  if (nextReview) {
    try {
      reviewIn = formatDistanceToNowStrict(new Date(nextReview.dueAt), {
        addSuffix: true,
        locale: lang === "es" ? dateEs : dateEn,
      });
    } catch {
      /* date-fns guard */
    }
  }

  const attempted = states.filter((s) => s.attempts.length > 0).length;
  const firstTry = states.filter((s) => s.attempts[0]?.correct).length;
  const solved = states.filter((s) => s.attempts.some((a) => a.correct)).length;
  const hints = states.reduce((a, s) => a + s.hintsRevealed, 0);
  const revealed = states.filter((s) => s.status === "revealed").length;
  const skipped = states.filter((s) => s.status === "skipped").length;
  const missed = deck.filter((_, i) => !states[i]?.attempts.some((a) => a.correct)).length;
  // time stats — shown only when the timer actually ran (old sessions lack them)
  const showTime = (elapsedSec ?? 0) >= 5;
  const knownTimes = (times ?? []).filter((x): x is number => typeof x === "number");
  const avgTime = knownTimes.length > 0 ? Math.round(knownTimes.reduce((a, b) => a + b, 0) / knownTimes.length) : 0;
  const estimatedSec = deck.reduce((a, p) => a + p.estimatedTimeSec, 0);

  const stats = [
    { label: t("summary.attempted"), value: attempted, icon: Target },
    { label: t("summary.firstTry"), value: firstTry, icon: Check },
    { label: t("summary.eventual"), value: solved, icon: CheckCircle2 },
    { label: t("summary.hintsUsed"), value: hints, icon: Lightbulb },
    { label: t("summary.revealed"), value: revealed, icon: Eye },
    { label: t("summary.skipped"), value: skipped, icon: SkipForward },
  ];

  const backHref =
    (config.mode === "topic" || config.mode === "single") && config.topicId && config.subjects.length === 1
      ? href({ name: "topic", subject: config.subjects[0], topicId: config.topicId })
      : config.subjects.length === 1
        ? href({ name: "subject", subject: config.subjects[0] })
        : href({ name: "practice" });

  function topicLabel(p: Problem): string {
    const cur = p.subject === "math" ? mathCurriculum : physicsCurriculum;
    return cur.find((tp) => tp.id === p.topicId)?.name[lang] ?? p.topicId;
  }

  function statusInfo(s: ProblemState): { icon: ReactNode; label: string; className: string } {
    if (s.status === "correct") {
      return {
        icon: <Check className="h-4 w-4" aria-hidden="true" />,
        label: s.hintsRevealed > 0 ? t("summary.status.correctHints") : t("summary.status.correct"),
        className: "text-success bg-success/10",
      };
    }
    if (s.status === "revealed") {
      return {
        icon: <Eye className="h-4 w-4" aria-hidden="true" />,
        label: t("summary.status.revealed"),
        className: "text-diff-medium bg-diff-medium/10",
      };
    }
    if (s.status === "attempting") {
      // the session ended with this problem still open
      if (s.attempts.length > 0) {
        return {
          icon: <XCircle className="h-4 w-4" aria-hidden="true" />,
          label: t("summary.status.unresolved"),
          className: "text-destructive bg-destructive/10",
        };
      }
      return {
        icon: <CircleOff className="h-4 w-4" aria-hidden="true" />,
        label: t("summary.status.notReached"),
        className: "text-muted-foreground bg-secondary",
      };
    }
    return {
      icon: <SkipForward className="h-4 w-4" aria-hidden="true" />,
      label: t("summary.status.skipped"),
      className: "text-muted-foreground bg-muted",
    };
  }

  /** Plain-text status label for the clipboard report. */
  function statusLabel(s: ProblemState): string {
    return statusInfo(s).label;
  }

  /** Shareable plain-text report — a student can paste it to their tutor. */
  async function handleCopyResults() {
    const dateStr = format(new Date(), "EEE d MMM yyyy, HH:mm", {
      locale: lang === "es" ? dateEs : dateEn,
    });
    const subjectStr =
      config.subjects.length === 1
        ? config.subjects[0] === "math"
          ? t("nav.math")
          : t("nav.physics")
        : t("mixed.subject.both");
    const topicStr =
      config.mode === "topic" && config.topicId
        ? ` · ${
            (config.subjects[0] === "physics" ? physicsCurriculum : mathCurriculum).find(
              (tp) => tp.id === config.topicId,
            )?.name[lang] ?? ""
          }`
        : "";
    const lines: string[] = [
      `${t("summary.report.title")} — ${dateStr}`,
      `${subjectStr}${topicStr}`,
      "",
      `${t("summary.report.score")}: ${solved}/${states.length} · ${t("summary.report.firstTry")}: ${firstTry}/${states.length} · ${t("summary.hintsUsed")}: ${hints}`,
    ];
    if (showTime) {
      lines.push(
        `${t("summary.time")}: ${formatDuration(elapsedSec ?? 0)}${
          avgTime > 0 ? ` · ${t("summary.timeAvg", { t: formatDuration(avgTime) })}` : ""
        }`,
      );
    }
    lines.push("", t("summary.listTitle"), "");
    deck.forEach((p, i) => {
      const st = states[i];
      const status = st ? statusLabel(st) : "—";
      const time = typeof times?.[i] === "number" ? ` (${formatDuration(times[i]!, { compact: true })})` : "";
      lines.push(`${i + 1}. ${p.skill[lang]} — ${status}${time}`);
    });
    const ok = await copyToClipboard(lines.join("\n"));
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({ description: t("summary.report.copied") });
    } else {
      toast({ description: t("share.failed") });
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      {goalDone ? (
        <div
          role="status"
          aria-live="polite"
          className="goal-celebration relative mb-6 overflow-hidden rounded-2xl border border-success/40 bg-success/10 px-5 py-5 sm:px-6"
        >
          {/* confetti — deterministic positions, decorative only */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            {CONFETTI.map((c, i) => (
              <span
                key={i}
                className="confetti-piece absolute"
                style={{
                  left: `${c.x}%`,
                  backgroundColor: c.color,
                  animationDelay: `${c.delay}ms`,
                  animationDuration: `${c.dur}ms`,
                }}
              />
            ))}
          </div>
          <div className="relative flex items-start gap-4">
            <span
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-success/20 text-success"
              aria-hidden="true"
            >
              <Trophy className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold uppercase tracking-wider text-success">
                {t("goal.done")}
              </p>
              <p className="mt-1 text-[15px] font-medium leading-snug">
                {t("goal.summary.today", {
                  done: formatNumber(goalDone.done),
                  total: formatNumber(goalDone.total),
                })}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {t("goal.summary.keep")}
              </p>
            </div>
          </div>
        </div>
      ) : null}
      <h1 className="font-serif text-3xl font-semibold tracking-tight">
        {attempted === states.length && skipped === 0 ? t("summary.title") : t("summary.unfinished")}
      </h1>
      <p className="mt-3 text-muted-foreground">
        {config.subjects.length === 1
          ? config.subjects[0] === "math"
            ? t("nav.math")
            : t("nav.physics")
            : t("mixed.subject.both")}
        {config.mode === "topic" && config.topicId
          ? ` · ${
              (config.subjects[0] === "physics" ? physicsCurriculum : mathCurriculum).find(
                (tp) => tp.id === config.topicId,
              )?.name[lang]
            }`
          : ""}
      </p>

      {nextReview && reviewIn ? (
        <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
          <CalendarClock className="h-4 w-4 text-diff-medium" aria-hidden="true" />
          <span>
            <span className="font-medium text-foreground">{t("summary.nextReview")}</span>{" "}
            {reviewIn}
            <span className="text-muted-foreground"> · {t("summary.reviewStreak", { n: nextReview.level + 1 })}</span>
          </span>
        </p>
      ) : null}

      {showTime ? (
        <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
          <Timer className="h-4 w-4 text-primary" aria-hidden="true" />
          <span>
            <span className="font-medium text-foreground">{t("summary.time")}: {formatDuration(elapsedSec ?? 0)}</span>
            {estimatedSec > 0 ? (
              <span className="text-muted-foreground">
                {" "}· {t("summary.timeEstimated", { t: formatDuration(estimatedSec) })}
              </span>
            ) : null}
            {avgTime > 0 ? (
              <span className="text-muted-foreground">
                {" "}· {t("summary.timeAvg", { t: formatDuration(avgTime) })}
              </span>
            ) : null}
          </span>
        </p>
      ) : null}

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-ring/50 hover:shadow-sm sm:p-5">
            <div className="flex items-center justify-between gap-2">
              <p className="font-serif text-2xl font-bold leading-tight tabular-nums">{s.value}</p>
              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground" aria-hidden="true">
                <s.icon className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-1.5 text-xs leading-snug text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {deck.length > 0 ? (
        <section className="mt-8" aria-label={t("summary.listTitle")}>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {t("summary.listTitle")}
          </h2>
          <ul className="max-h-96 space-y-2 overflow-y-auto nice-scroll p-1 pr-1.5 pb-2">
            {deck.map((p, i) => {
              const info = statusInfo(states[i] ?? { status: "skipped", attempts: [], hintsRevealed: 0, answerRevealed: false, solutionRevealed: false, recorded: true, lastOutcome: null });
              return (
                <li
                  key={`${p.templateId}:${p.seed}`}
                  className="flex items-center gap-3 rounded-xl border bg-card px-4 py-3 transition-colors hover:border-ring/50 hover:bg-secondary/40"
                >
                  <span
                    className={cn(
                      "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                      info.className,
                    )}
                    aria-hidden="true"
                  >
                    {info.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium leading-snug">{p.skill[lang]}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {topicLabel(p)} · {t(`difficulty.${p.difficulty}`)}
                    </p>
                  </div>
                  {typeof times?.[i] === "number" ? (
                    <span
                      className="hidden shrink-0 items-center gap-1 text-xs tabular-nums text-muted-foreground/80 sm:inline-flex"
                      title={t("practice.timeSpent")}
                    >
                      <Timer className="h-3 w-3" aria-hidden="true" />
                      {formatDuration(times[i]!, { compact: true })}
                    </span>
                  ) : null}
                  <span className="shrink-0 text-xs text-muted-foreground">{info.label}</span>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        {missed > 0 ? (
          <Button type="button" onClick={onRetryMissed} className="gap-2 font-semibold">
            <Target className="h-4 w-4" aria-hidden="true" />
            {t("summary.retryMissed", { n: missed })}
          </Button>
        ) : null}
        <Button
          type="button"
          onClick={onAgain}
          variant={missed > 0 ? "outline" : "default"}
          className={cn("gap-2", missed === 0 && "font-semibold")}
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          {t("summary.again")}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleCopyResults}
          className={cn("gap-2", copied && "border-success/60 text-success hover:text-success")}
        >
          {copied ? (
            <Check className="h-4 w-4" aria-hidden="true" />
          ) : (
            <ClipboardCopy className="h-4 w-4" aria-hidden="true" />
          )}
          {copied ? t("summary.report.copiedShort") : t("summary.report.copy")}
        </Button>
        <Button type="button" variant="outline" asChild className="gap-2">
          <a href={backHref}>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {config.mode === "topic" || config.mode === "single" ? t("summary.backTopic") : t("summary.backSubject")}
          </a>
        </Button>
        <Button type="button" variant="ghost" asChild className="gap-2 text-muted-foreground">
          <a href={href({ name: "progress" })}>
            <BarChart3 className="h-4 w-4" aria-hidden="true" />
            {t("summary.viewProgress")}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </Button>
      </div>
    </div>
  );
}
