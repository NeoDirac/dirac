"use client";

import { ArrowRight, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TopicIcon } from "@/components/site/topic-icon";
import { useI18n } from "@/lib/i18n/context";
import { useSubjectTemplates } from "@/lib/use-templates";
import { href, sessionHref } from "@/lib/router";
import { templateStats } from "@/lib/session";
import { computeStats, loadProgress, topicKey } from "@/lib/progress";
import { mathCurriculum } from "@/content/curriculum/math";
import { physicsCurriculum } from "@/content/curriculum/physics";
import type { Difficulty, Subject } from "@/lib/types";

const DIFFICULTY_ORDER: Difficulty[] = ["easy", "medium", "hard", "challenge"];

const DIFF_DOT: Record<Difficulty, string> = {
  easy: "bg-diff-easy",
  medium: "bg-diff-medium",
  hard: "bg-diff-hard",
  challenge: "bg-diff-challenge",
};

export function SubjectView({ subject }: { subject: Subject }) {
  const { t, lang, formatNumber } = useI18n();
  const { templates, loading } = useSubjectTemplates(subject);
  const curriculum = subject === "math" ? mathCurriculum : physicsCurriculum;
  const subjectColor = subject === "math" ? "text-subject-math" : "text-subject-physics";
  const subjectBg = subject === "math" ? "bg-subject-math/10" : "bg-subject-physics/10";

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
        <Button asChild className="shrink-0 gap-2 font-semibold">
          <a href={mixedHref}>
            <Shuffle className="h-4 w-4" aria-hidden="true" />
            {t("subject.startPracticing")}
          </a>
        </Button>
      </header>

      <h2 className="mb-4 mt-10 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        {t("subject.topicsHeading")}
      </h2>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {curriculum.map((topic, i) => {
          const stats = statsByTopic.get(topic.id);
          const topicProgress = progress.byTopic[topicKey(subject, topic.id)];
          const percent = topicProgress && topicProgress.attempts > 0
            ? topicProgress.firstTryCorrect / topicProgress.attempts
            : null;
          return (
            <li key={topic.id}>
              <a
                href={href({ name: "topic", subject, topicId: topic.id })}
                className="group flex h-full flex-col rounded-2xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${subjectBg} ${subjectColor}`}>
                    <TopicIcon icon={topic.icon} />
                  </span>
                  <span className="font-serif text-2xl font-semibold text-muted-foreground/30" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-3.5 font-semibold leading-snug">{topic.name[lang]}</h3>
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

      <p className="mt-6 flex items-center gap-1.5 text-xs text-muted-foreground">
        <ArrowRight className="h-3 w-3" aria-hidden="true" />
        {t("subject.variantsNote")}
      </p>
    </div>
  );
}
