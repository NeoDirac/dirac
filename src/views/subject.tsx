"use client";

import { useState } from "react";
import { ArrowRight, Layers, Search, Shuffle, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TopicIcon } from "@/components/site/topic-icon";
import { useI18n } from "@/lib/i18n/context";
import { useSubjectTemplates } from "@/lib/use-templates";
import { href, sessionHref } from "@/lib/router";
import { templateStats } from "@/lib/session";
import { computeStats, loadProgress, topicKey, type TopicStats } from "@/lib/progress";
import { mathCurriculum } from "@/content/curriculum/math";
import { physicsCurriculum } from "@/content/curriculum/physics";
import type { Difficulty, Subject } from "@/lib/types";
import { cn } from "@/lib/utils";

const DIFFICULTY_ORDER: Difficulty[] = ["easy", "medium", "hard", "challenge"];

const DIFF_DOT: Record<Difficulty, string> = {
  easy: "bg-diff-easy",
  medium: "bg-diff-medium",
  hard: "bg-diff-hard",
  challenge: "bg-diff-challenge",
};

type TopicFilter = "all" | "started" | "new" | "weak";

const FILTERS: TopicFilter[] = ["all", "started", "new", "weak"];

/** accent-insensitive lowercase fold so "ecuaciones" matches "Ecuaciónes" etc. */
function fold(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function SubjectView({ subject }: { subject: Subject }) {
  const { t, lang, formatNumber } = useI18n();
  const { templates, loading } = useSubjectTemplates(subject);
  const curriculum = subject === "math" ? mathCurriculum : physicsCurriculum;
  const subjectColor = subject === "math" ? "text-subject-math" : "text-subject-physics";
  const subjectBg = subject === "math" ? "bg-subject-math/10" : "bg-subject-physics/10";

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<TopicFilter>("all");

  const statsByTopic = new Map<string, ReturnType<typeof templateStats>>();
  if (!loading) {
    for (const topic of curriculum) {
      const topicTemplates = templates.filter((tp) => tp.topicId === topic.id);
      statsByTopic.set(topic.id, templateStats(topicTemplates));
    }
  }

  const progress = computeStats(loadProgress());

  const mixedHref = sessionHref({
    mode: "mixed",
    subjects: [subject],
    difficulty: "any",
    count: 10,
    seed: 0,
  });

  // interleaved consolidation for this subject — topics alternate with
  // discipline, weakest first, without Foundation-level problems
  const interleavedHref = sessionHref({
    mode: "interleaved",
    subjects: [subject],
    difficulty: "any",
    count: 10,
    seed: 0,
    excludeEasy: true,
  });

  /* ------- search + filter over the topic list ------- */

  const topicProgressOf = (topicId: string): TopicStats | undefined =>
    progress.byTopic[topicKey(subject, topicId)];

  const isStarted = (topicId: string) => (topicProgressOf(topicId)?.attempts ?? 0) > 0;
  const isWeak = (topicId: string) => {
    const s = topicProgressOf(topicId);
    return Boolean(s && s.attempts >= 3 && s.firstTryCorrect / s.attempts < 0.5);
  };

  const counts = {
    all: curriculum.length,
    started: curriculum.filter((tp) => isStarted(tp.id)).length,
    new: curriculum.filter((tp) => !isStarted(tp.id)).length,
    weak: curriculum.filter((tp) => isWeak(tp.id)).length,
  };

  const visible = (() => {
    const q = fold(query.trim());
    return curriculum
      .map((topic, i) => ({ topic, i }))
      .filter(({ topic }) => {
        if (filter === "started" && !isStarted(topic.id)) return false;
        if (filter === "new" && isStarted(topic.id)) return false;
        if (filter === "weak" && !isWeak(topic.id)) return false;
        if (q) {
          const hay = fold(
            `${topic.name.es} ${topic.name.en} ${topic.short.es} ${topic.short.en} ${topic.id}`,
          );
          if (!hay.includes(q)) return false;
        }
        return true;
      });
  })();

  const filtering = query.trim().length > 0 || filter !== "all";

  function clearFilters() {
    setQuery("");
    setFilter("all");
  }

  const FILTER_LABEL: Record<TopicFilter, string> = {
    all: t("subject.filter.all"),
    started: t("subject.filter.started"),
    new: t("subject.filter.new"),
    weak: t("subject.filter.weak"),
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-4xl font-semibold tracking-tight">
            {t(subject === "math" ? "subject.math.title" : "subject.physics.title")}
          </h1>
          <p className="mt-2 max-w-xl text-muted-foreground">
            {t(subject === "math" ? "subject.subtitle.math" : "subject.subtitle.physics")}
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:items-end">
          <Button asChild className="gap-2 font-semibold">
            <a href={mixedHref}>
              <Shuffle className="h-4 w-4" aria-hidden="true" />
              {t("subject.startPracticing")}
            </a>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <a href={interleavedHref}>
              <Layers className="h-4 w-4 text-subject-physics" aria-hidden="true" />
              {t("interleaved.subject.cta", { subject: t(subject === "math" ? "nav.math" : "nav.physics") })}
            </a>
          </Button>
        </div>
      </header>

      {/* topic search + quick filters */}
      <div className="mt-8 flex flex-col gap-3 rounded-2xl border bg-card/60 p-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("subject.searchPlaceholder")}
            aria-label={t("subject.searchLabel")}
            className="h-10 w-full rounded-xl border bg-background pl-10 pr-9 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label={t("subject.searchClear")}
              className="absolute right-2.5 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          ) : null}
        </div>
        <div
          className="flex flex-wrap items-center gap-1.5"
          role="group"
          aria-label={t("subject.filterLabel")}
        >
          <SlidersHorizontal
            className="mr-0.5 hidden h-3.5 w-3.5 text-muted-foreground sm:block"
            aria-hidden="true"
          />
          {FILTERS.map((f) => {
            const pressed = filter === f;
            const disabled = f !== "all" && counts[f] === 0;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={pressed}
                disabled={disabled}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  pressed
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "bg-card text-foreground hover:bg-secondary",
                  disabled && "cursor-not-allowed opacity-50 hover:bg-card",
                )}
              >
                {FILTER_LABEL[f]}
                <span
                  className={cn(
                    "rounded-full px-1.5 text-[10px] font-semibold tabular-nums",
                    pressed ? "bg-primary-foreground/20 text-primary-foreground" : "bg-secondary text-muted-foreground",
                  )}
                >
                  {formatNumber(counts[f])}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <h2 className="mb-4 mt-8 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        {t("subject.topicsHeading")}
        {filtering && visible.length !== curriculum.length ? (
          <span className="ml-2 font-normal normal-case tracking-normal">
            · {formatNumber(visible.length)} / {formatNumber(curriculum.length)}
          </span>
        ) : null}
      </h2>

      {visible.length === 0 ? (
        <div className="rounded-2xl border border-dashed bg-card/60 px-6 py-14 text-center">
          <Search className="mx-auto h-7 w-7 text-muted-foreground/60" aria-hidden="true" />
          <p className="mt-3 font-medium">{t("subject.searchEmpty.title")}</p>
          <p className="mt-1 text-sm text-muted-foreground">{t("subject.searchEmpty.desc")}</p>
          <Button type="button" variant="outline" onClick={clearFilters} className="mt-5 gap-2">
            <X className="h-4 w-4" aria-hidden="true" />
            {t("subject.searchEmpty.clear")}
          </Button>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map(({ topic, i }) => {
            const stats = statsByTopic.get(topic.id);
            const topicProgress = topicProgressOf(topic.id);
            const percent =
              topicProgress && topicProgress.attempts > 0
                ? topicProgress.firstTryCorrect / topicProgress.attempts
                : null;
            const weak = isWeak(topic.id);
            return (
              <li key={topic.id}>
                <a
                  href={href({ name: "topic", subject, topicId: topic.id })}
                  className="group flex h-full flex-col rounded-2xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${subjectBg} ${subjectColor}`}>
                      <TopicIcon icon={topic.icon} />
                    </span>
                    <span className="font-serif text-2xl font-semibold text-muted-foreground/30" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-3.5 font-semibold leading-snug">
                    {topic.name[lang]}
                    {weak ? (
                      <span
                        className="ml-2 rounded-full border border-diff-medium/40 bg-diff-medium/10 px-2 py-0.5 align-middle text-[10px] font-semibold uppercase tracking-wide text-diff-medium"
                        title={t("progress.suggested.title")}
                      >
                        {t("progress.topic.weak")}
                      </span>
                    ) : null}
                  </h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {topic.short[lang]}
                  </p>
                  <div className="mt-4 flex items-center justify-between gap-2 border-t pt-3.5">
                    {loading || !stats ? (
                      <Skeleton className="h-5 w-24" />
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        {stats.total === 1
                          ? t("subject.exerciseTypesSingular")
                          : t("subject.exerciseTypes", { n: formatNumber(stats.total) })}
                      </span>
                    )}
                    <span className="flex items-center gap-1" aria-label={t("subject.levels")}>
                      {DIFFICULTY_ORDER.map((d) => (
                        <span
                          key={d}
                          title={t(`difficulty.${d}`)}
                          className={`h-1.5 w-1.5 rounded-full ${
                            stats && stats.byDifficulty[d] > 0 ? DIFF_DOT[d] : "bg-border"
                          }`}
                        />
                      ))}
                    </span>
                  </div>
                  {/* fixed-height trailing slot keeps every card the same height,
                      whether or not there is progress to show */}
                  <div className="mt-3 h-7">
                    {percent !== null ? (
                      <div>
                        <div className="h-1 w-full overflow-hidden rounded-full bg-border">
                          <div
                            className={`h-full rounded-full ${subject === "math" ? "bg-subject-math" : "bg-subject-physics"}`}
                            style={{ width: `${Math.max(6, percent * 100)}%` }}
                          />
                        </div>
                        <p className="mt-1.5 truncate text-[11px] text-muted-foreground">
                          {formatNumber(topicProgress!.attempts)} {t("topic.stats.attempts")} ·{" "}
                          {t("topic.stats.firstTry")}: {Math.round(percent * 100)}%
                        </p>
                      </div>
                    ) : null}
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      )}

      <p className="mt-6 flex items-center gap-1.5 text-xs text-muted-foreground">
        <ArrowRight className="h-3 w-3" aria-hidden="true" />
        {t("subject.variantsNote")}
      </p>
    </div>
  );
}
