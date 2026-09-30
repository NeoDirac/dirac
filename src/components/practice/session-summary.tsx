"use client";

/**
 * Session summary — restrained stats overview + per-problem review list.
 */

import { ArrowLeft, ArrowRight, BarChart3, Check, Eye, RefreshCw, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/context";
import { href } from "@/lib/router";
import { mathCurriculum } from "@/content/curriculum/math";
import { physicsCurriculum } from "@/content/curriculum/physics";
import type { Problem, SessionConfig } from "@/lib/types";
import type { ProblemState } from "./state";
import { cn } from "@/lib/utils";

export function SessionSummary({
  config,
  deck,
  states,
  onAgain,
}: {
  config: SessionConfig;
  deck: Problem[];
  states: ProblemState[];
  onAgain: () => void;
}) {
  const { t, lang } = useI18n();

  const attempted = states.filter((s) => s.attempts.length > 0).length;
  const firstTry = states.filter((s) => s.attempts[0]?.correct).length;
  const solved = states.filter((s) => s.attempts.some((a) => a.correct)).length;
  const hints = states.reduce((a, s) => a + s.hintsRevealed, 0);
  const revealed = states.filter((s) => s.status === "revealed").length;
  const skipped = states.filter((s) => s.status === "skipped").length;

  const stats = [
    { label: t("summary.attempted"), value: attempted },
    { label: t("summary.firstTry"), value: firstTry },
    { label: t("summary.eventual"), value: solved },
    { label: t("summary.hintsUsed"), value: hints },
    { label: t("summary.revealed"), value: revealed },
    { label: t("summary.skipped"), value: skipped },
  ];

  const backHref =
    config.mode === "topic" && config.topicId && config.subjects.length === 1
      ? href({ name: "topic", subject: config.subjects[0], topicId: config.topicId })
      : config.subjects.length === 1
        ? href({ name: "subject", subject: config.subjects[0] })
        : href({ name: "practice" });

  function topicLabel(p: Problem): string {
    const cur = p.subject === "math" ? mathCurriculum : physicsCurriculum;
    return cur.find((tp) => tp.id === p.topicId)?.name[lang] ?? p.topicId;
  }

  function statusInfo(s: ProblemState): { icon: React.ReactNode; label: string; className: string } {
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
                  className="flex items-center gap-3 rounded-xl border bg-card px-4 py-3"
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
                  <span className="shrink-0 text-xs text-muted-foreground">{info.label}</span>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      <div className="mt-8 flex flex-col gap-2 sm:flex-row">
        <Button type="button" onClick={onAgain} className="gap-2 font-semibold">
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          {t("summary.again")}
        </Button>
        <Button type="button" variant="outline" asChild className="gap-2">
          <a href={backHref}>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {config.mode === "topic" ? t("summary.backTopic") : t("summary.backSubject")}
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
