"use client";

/**
 * Session summary — restrained stats overview + per-problem review list.
 */

import { ArrowLeft, ArrowRight, BarChart3, Check, CircleOff, Eye, RefreshCw, SkipForward, Target, Timer, XCircle } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/context";
import { href } from "@/lib/router";
import { mathCurriculum } from "@/content/curriculum/math";
import { physicsCurriculum } from "@/content/curriculum/physics";
import type { Problem, SessionConfig } from "@/lib/types";
import type { ProblemState } from "./state";
import { cn, formatDuration } from "@/lib/utils";

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
  const { t, lang } = useI18n();

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
    { label: t("summary.attempted"), value: attempted },
    { label: t("summary.firstTry"), value: firstTry },
    { label: t("summary.eventual"), value: solved },
    { label: t("summary.hintsUsed"), value: hints },
    { label: t("summary.revealed"), value: revealed },
    { label: t("summary.skipped"), value: skipped },
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

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-serif text-3xl font-semibold tracking-tight">
        {attempted === states.length && skipped === 0 ? t("summary.title") : t("summary.unfinished")}
      </h1>
      <p className="mt-2 text-muted-foreground">
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
          <div key={s.label} className="rounded-xl border bg-card p-4">
            <p className="font-serif text-2xl font-semibold">{s.value}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {deck.length > 0 ? (
        <section className="mt-8" aria-label={t("summary.listTitle")}>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {t("summary.listTitle")}
          </h2>
          <ul className="max-h-96 space-y-2 overflow-y-auto nice-scroll pr-1">
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
                    <p className="truncate text-sm font-medium">{p.skill[lang]}</p>
                    <p className="truncate text-xs text-muted-foreground">
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

      <div className="mt-8 flex flex-col gap-2 sm:flex-row">
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
