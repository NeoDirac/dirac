"use client";

/**
 * TopicView — subtopic overview + practice session configuration
 * (difficulty, number of questions, mixed & challenge shortcuts).
 */

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, BookMarked, Infinity as InfinityIcon, Printer, Shuffle, Swords } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TopicIcon } from "@/components/site/topic-icon";
import { useI18n } from "@/lib/i18n/context";
import { useSubjectTemplates } from "@/lib/use-templates";
import { href, sessionHref, worksheetHref } from "@/lib/router";
import { templateStats } from "@/lib/session";
import { computeStats, loadProgress, topicKey } from "@/lib/progress";
import { mathCurriculum } from "@/content/curriculum/math";
import { physicsCurriculum } from "@/content/curriculum/physics";
import type { Difficulty, Subject } from "@/lib/types";

const DIFFICULTIES: (Difficulty | "any")[] = ["any", "easy", "medium", "hard", "challenge"];
const COUNTS: { value: number; label?: string }[] = [
  { value: 5 },
  { value: 10 },
  { value: 20 },
  { value: Infinity },
];

const DIFF_CHIP: Record<string, string> = {
  any: "",
  easy: "text-diff-easy",
  medium: "text-diff-medium",
  hard: "text-diff-hard",
  challenge: "text-diff-challenge",
};

export function TopicView({ subject, topicId }: { subject: Subject; topicId: string }) {
  const { t, lang, formatNumber } = useI18n();
  const { templates, loading } = useSubjectTemplates(subject);
  const [difficulty, setDifficulty] = useState<Difficulty | "any">("any");
  const [count, setCount] = useState<number>(10);
  const [subtopic, setSubtopic] = useState<string | null>(null);
  const [curatedOnly, setCuratedOnly] = useState(false);

  const curriculum = subject === "math" ? mathCurriculum : physicsCurriculum;
  const topic = curriculum.find((tp) => tp.id === topicId);

  // template stats are computed for the active subtopic filter (hooks must run
  // before the not-found early return, so keep them above it)
  const topicTemplates = templates.filter((tp) => tp.topicId === topicId);
  const activeTemplates = subtopic
    ? topicTemplates.filter((tp) => tp.subtopicId === subtopic)
    : topicTemplates;
  const stats = loading ? null : templateStats(activeTemplates);
  // if the focused subtopic lacks the chosen level, fall back to “any” (derived,
  // not stored — no cascading renders)
  const effectiveDifficulty: Difficulty | "any" =
    stats && difficulty !== "any" && stats.byDifficulty[difficulty] === 0 ? "any" : difficulty;

  if (!topic) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <h1 className="font-serif text-2xl font-semibold">{t("error.generic")}</h1>
        <Button asChild variant="outline" className="mt-6">
          <a href={href({ name: "subject", subject })}>{t("common.back")}</a>
        </Button>
      </div>
    );
  }

  const subjectColor = subject === "math" ? "text-subject-math" : "text-subject-physics";
  const subjectBg = subject === "math" ? "bg-subject-math/10" : "bg-subject-physics/10";

  const progress = computeStats(loadProgress());
  const topicProgress = progress.byTopic[topicKey(subject, topicId)];

  const subCounts = new Map<string, number>();
  for (const tp of topicTemplates) {
    subCounts.set(tp.subtopicId, (subCounts.get(tp.subtopicId) ?? 0) + 1);
  }

  const selectedSubtopic = topic.subtopics.find((st) => st.id === subtopic) ?? null;

  // curated (real-source) problems available under the current focus
  const curatedCount = activeTemplates.filter((tp) => tp.source).length;
  const effectiveCuratedOnly = curatedOnly && curatedCount > 0;

  const startHref = sessionHref({
    mode: "topic",
    subjects: [subject],
    topicId,
    subtopicId: subtopic ?? undefined,
    difficulty: effectiveDifficulty,
    count,
    seed: 0,
    curatedOnly: effectiveCuratedOnly || undefined,
  });

  const printHref = worksheetHref({
    mode: "topic",
    subjects: [subject],
    topicId,
    subtopicId: subtopic ?? undefined,
    difficulty: effectiveDifficulty,
    count: Number.isFinite(count) ? count : 10,
    seed: 0,
    curatedOnly: effectiveCuratedOnly || undefined,
  });

  const mixedHref = sessionHref({
    mode: "mixed",
    subjects: [subject],
    difficulty: "any",
    count: 10,
    seed: 0,
  });

  const challengeHref = sessionHref({
    mode: "challenge",
    subjects: [subject],
    difficulty: "challenge",
    count: 10,
    seed: 0,
  });

  const prereqTopics = topic.prerequisites
    .map((pid) => curriculum.find((p) => p.id === pid))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <a
        href={href({ name: "subject", subject })}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {t("topic.backToSubject", {
          subject: t(subject === "math" ? "subject.math.title" : "subject.physics.title"),
        })}
      </a>

      <header className="mt-5 flex items-start gap-4">
        <span className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${subjectBg} ${subjectColor}`}>
          <TopicIcon icon={topic.icon} />
        </span>
        <div>
          <h1 className="font-serif text-3xl font-semibold tracking-tight">{topic.name[lang]}</h1>
          <p className="mt-1.5 text-muted-foreground">{topic.short[lang]}</p>
        </div>
      </header>

      {topicProgress && topicProgress.attempts > 0 ? (
        <div className="mt-6 rounded-xl border bg-card px-4 py-3 text-sm text-muted-foreground">
          {formatNumber(topicProgress.attempts)} {t("topic.stats.attempts")} ·{" "}
          <span className="font-medium text-foreground">
            {Math.round((topicProgress.firstTryCorrect / topicProgress.attempts) * 100)}%{" "}
            {t("topic.stats.firstTry")}
          </span>
        </div>
      ) : null}

      {/* subtopics — click one to focus practice on it */}
      <section className="mt-8" aria-labelledby="subtopics-heading">
        <h2 id="subtopics-heading" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {t("topic.subtopics")}
        </h2>
        <ul className="mt-3.5 flex flex-wrap gap-2">
          {topic.subtopics.map((st) => {
            const selected = subtopic === st.id;
            const n = subCounts.get(st.id) ?? 0;
            return (
              <li key={st.id}>
                <button
                  type="button"
                  onClick={() => setSubtopic(selected ? null : st.id)}
                  aria-pressed={selected}
                  disabled={!loading && n === 0}
                  title={selected ? t("topic.subtopic.clear") : t("topic.subtopic.practice")}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition-all",
                    "hover:border-ring/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    selected
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "bg-card text-foreground hover:bg-secondary",
                    n === 0 && !loading && "cursor-not-allowed opacity-50 hover:bg-card",
                  )}
                >
                  {st.name[lang]}
                  {n ? (
                    <span
                      className={cn(
                        "rounded-full px-1.5 text-[11px] font-semibold",
                        selected ? "bg-primary-foreground/20 text-primary-foreground" : "bg-secondary text-muted-foreground",
                      )}
                    >
                      {formatNumber(n)}
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          {subtopic
            ? t("topic.subtopic.selected", { name: selectedSubtopic?.name[lang] ?? "" })
            : t("topic.subtopic.hint")}
        </p>
        {prereqTopics.length > 0 ? (
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            <span className="font-medium">{t("topic.prerequisites")}:</span>{" "}
            {prereqTopics.map((p) => p.name[lang]).join(" · ")}
          </p>
        ) : null}
      </section>

      {/* practice setup */}
      <section
        aria-labelledby="setup-heading"
        className="mt-10 rounded-2xl border bg-card p-5 shadow-sm sm:p-7"
      >
        <h2 id="setup-heading" className="font-serif text-xl font-semibold">
          {t("topic.practiceTitle")}
        </h2>

        <div className="mt-6 space-y-6">
          <fieldset>
            <legend className="text-sm font-medium">{t("topic.difficulty")}</legend>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {DIFFICULTIES.map((d) => {
                const unavailable = Boolean(stats) && d !== "any" && stats !== null && stats.byDifficulty[d] === 0;
                const pressed = effectiveDifficulty === d;
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDifficulty(d)}
                    aria-pressed={pressed}
                    disabled={unavailable}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                      pressed
                        ? "border-primary bg-primary text-primary-foreground"
                        : "bg-card hover:bg-secondary",
                      d !== "any" && DIFF_CHIP[d],
                      pressed && DIFF_CHIP[d] && "text-primary-foreground",
                      unavailable && "cursor-not-allowed opacity-40",
                    )}
                  >
                    {d === "any" ? t("topic.difficulty.any") : t(`difficulty.${d}`)}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-medium">{t("topic.count")}</legend>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {COUNTS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setCount(c.value)}
                  aria-pressed={count === c.value}
                  className={cn(
                    "inline-flex min-w-14 items-center justify-center gap-1 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                    count === c.value
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-card hover:bg-secondary",
                  )}
                >
                  {Number.isFinite(c.value) ? c.value : <InfinityIcon className="h-4 w-4" aria-label={t("topic.count.unlimited")} />}
                </button>
              ))}
            </div>
          </fieldset>

          {curatedCount > 0 ? (
            <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <BookMarked className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{t("topic.curatedOnly")}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                      {t("topic.curatedHint", { n: formatNumber(curatedCount) })}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={curatedOnly}
                  onClick={() => setCuratedOnly(!curatedOnly)}
                  className={cn(
                    "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    curatedOnly
                      ? "border-primary bg-primary"
                      : "border-border bg-secondary",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "inline-block h-4.5 w-4.5 rounded-full bg-background shadow-sm transition-transform",
                      "h-[18px] w-[18px]",
                      curatedOnly ? "translate-x-[22px]" : "translate-x-[3px]",
                    )}
                  />
                </button>
              </div>
            </div>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="gap-2 text-[15px] font-semibold sm:px-10">
              <a href={startHref}>
                {t("topic.start")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2 text-[15px] font-medium">
              <a href={printHref}>
                <Printer className="h-4 w-4" aria-hidden="true" />
                {t("worksheet.printButton")}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* shortcuts */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <a
          href={mixedHref}
          className="group rounded-2xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Shuffle className="h-5 w-5" aria-hidden="true" />
          </span>
          <h3 className="mt-3 font-semibold">{t("topic.mixedTitle")}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {t("topic.mixedDesc", {
              subject: t(subject === "math" ? "subject.math.title" : "subject.physics.title"),
            })}
          </p>
        </a>
        <a
          href={challengeHref}
          className="group rounded-2xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-diff-challenge/10 text-diff-challenge">
            <Swords className="h-5 w-5" aria-hidden="true" />
          </span>
          <h3 className="mt-3 font-semibold">{t("topic.challengeTitle")}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t("topic.challengeDesc")}</p>
        </a>
      </div>
    </div>
  );
}
