"use client";

/**
 * WorksheetView — a printable practice sheet generated from the same
 * parameterized bank as interactive sessions.
 *
 * - Deterministic seed → the URL is shareable and reproducible.
 * - Problems render one per block with workspace to work on paper.
 * - The answer key sits on its own printed page.
 * - Optional "warm-up" display ordering (easy → hard) for classroom use.
 * - `@media print` rules (globals.css) hide the app chrome; everything
 *   with the `no-print` class disappears on paper.
 */

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Flame, Printer, RotateCcw, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MathText } from "@/components/math/math-text";
import { ProblemDiagram } from "@/components/diagrams";
import { useI18n } from "@/lib/i18n/context";
import { useAllTemplates } from "@/lib/use-templates";
import { buildDeck } from "@/lib/session";
import { navigate, worksheetHref, href } from "@/lib/router";
import { mathCurriculum } from "@/content/curriculum/math";
import { physicsCurriculum } from "@/content/curriculum/physics";
import { siteConfig } from "@/config/site";
import type { Difficulty, Problem, SessionConfig } from "@/lib/types";
import { cn } from "@/lib/utils";

const MAX_WORKSHEET = 20;

const DIFFICULTY_RANK: Record<Difficulty, number> = {
  easy: 0,
  medium: 1,
  hard: 2,
  challenge: 3,
};

export function WorksheetView({ config }: { config: SessionConfig }) {
  const { t, lang, formatNumber } = useI18n();
  const { templates, loading } = useAllTemplates();
  const [seedBumped, setSeedBumped] = useState(0); // remount helper for animations
  const [warmup, setWarmup] = useState(false); // display order: easy → hard
  const configKey = useMemo(() => JSON.stringify(config), [config]);

  // worksheets need a finite count (unlimited makes no sense on paper)
  const effectiveCount = Math.min(
    Number.isFinite(config.count) ? config.count : 10,
    MAX_WORKSHEET,
  );

  // seed 0 → mint a real, shareable seed (same pattern as SessionView)
  useEffect(() => {
    if (loading) return;
    const cfg = JSON.parse(configKey) as SessionConfig;
    if (cfg.seed === 0) {
      navigate(worksheetHref({ ...cfg, seed: Math.floor(Math.random() * 2 ** 31) }));
    }
  }, [loading, configKey]);

  const deck = useMemo(() => {
    if (loading) return null;
    const cfg = JSON.parse(configKey) as SessionConfig;
    const result = buildDeck(cfg, templates, { batchSize: effectiveCount });
    return result.problems;
  }, [loading, templates, configKey, effectiveCount]);

  const topic = useMemo(() => {
    if ((config.mode === "topic" || config.mode === "single") && config.topicId) {
      const cur = config.subjects[0] === "physics" ? physicsCurriculum : mathCurriculum;
      return cur.find((tp) => tp.id === config.topicId) ?? null;
    }
    return null;
  }, [config]);

  const subtopic = useMemo(() => {
    if (topic && config.subtopicId) {
      return topic.subtopics.find((st) => st.id === config.subtopicId) ?? null;
    }
    return null;
  }, [topic, config.subtopicId]);

  if (loading || !deck) {
    return (
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-8 sm:px-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-96 w-full rounded-2xl" />
      </div>
    );
  }

  // warm-up ordering is only meaningful when several difficulty levels coexist
  const orderable = config.difficulty === "any" && config.mode !== "challenge";
  const displayDeck =
    warmup && orderable
      ? [...deck].sort(
          (a, b) => DIFFICULTY_RANK[a.difficulty] - DIFFICULTY_RANK[b.difficulty],
        )
      : deck;

  const title = topic
    ? topic.name[lang]
    : config.mode === "challenge"
      ? t("worksheet.titleChallenge")
      : t("worksheet.titleMixed");

  const difficultyLabel =
    config.difficulty === "any"
      ? t("topic.difficulty.any")
      : t(`difficulty.${config.difficulty}`);

  function handleNewVariants() {
    setSeedBumped((n) => n + 1);
    const cfg = JSON.parse(configKey) as SessionConfig;
    navigate(worksheetHref({ ...cfg, seed: Math.floor(Math.random() * 2 ** 31) }));
  }

  const backHref = topic && config.subjects.length === 1
    ? href({ name: "topic", subject: config.subjects[0], topicId: topic.id })
    : href({ name: "practice" });

  if (deck.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <h1 className="font-serif text-2xl font-semibold">{t("session.empty.title")}</h1>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          {t("session.empty.desc")}
        </p>
        <Button asChild variant="outline" className="mt-6">
          <a href={backHref}>{t("common.back")}</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 print:max-w-none print:p-0" key={seedBumped}>
      {/* on-screen controls (never printed) */}
      <div className="no-print mb-6 flex flex-wrap items-center gap-2">
        <Button asChild variant="ghost" className="gap-1.5 text-muted-foreground">
          <a href={backHref}>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t("common.back")}
          </a>
        </Button>
        {orderable ? (
          <div
            className="flex items-center rounded-lg border bg-card p-0.5"
            role="group"
            aria-label={t("worksheet.order")}
          >
            <button
              type="button"
              onClick={() => setWarmup(false)}
              aria-pressed={!warmup}
              className={cn(
                "inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium transition-colors",
                !warmup
                  ? "bg-secondary text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Shuffle className="h-3.5 w-3.5" aria-hidden="true" />
              {t("worksheet.order.mixed")}
            </button>
            <button
              type="button"
              onClick={() => setWarmup(true)}
              aria-pressed={warmup}
              title={t("worksheet.order.warmup.hint")}
              className={cn(
                "inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium transition-colors",
                warmup
                  ? "bg-secondary text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Flame className="h-3.5 w-3.5" aria-hidden="true" />
              {t("worksheet.order.warmup")}
            </button>
          </div>
        ) : null}
        <div className="ml-auto flex flex-wrap gap-2">
          <Button variant="outline" onClick={handleNewVariants} className="gap-2">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            {t("worksheet.newVariants")}
          </Button>
          <Button onClick={() => window.print()} className="gap-2 font-semibold">
            <Printer className="h-4 w-4" aria-hidden="true" />
            {t("worksheet.print")}
          </Button>
        </div>
      </div>

      <article className="worksheet-page rounded-2xl border bg-card p-6 shadow-sm sm:p-10 print:rounded-none print:border-0 print:p-0 print:shadow-none">
        {/* sheet header */}
        <header className="border-b-2 border-foreground/80 pb-4">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {siteConfig.brandName}
            </p>
            <p className="text-xs text-muted-foreground">
              {difficultyLabel} · {formatNumber(deck.length)} {t("worksheet.problems")}
            </p>
          </div>
          <h1 className="mt-1.5 font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
            {title}
            {subtopic ? <span className="text-muted-foreground"> — {subtopic.name[lang]}</span> : null}
          </h1>
          <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            <p className="border-b border-dashed border-border pb-0.5">
              <span className="text-muted-foreground">{t("worksheet.name")}: </span>
            </p>
            <p className="border-b border-dashed border-border pb-0.5">
              <span className="text-muted-foreground">{t("worksheet.date")}: </span>
            </p>
          </div>
          <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
            {t("worksheet.instructions")}
          </p>
        </header>

        {/* problems */}
        <ol className="mt-6 space-y-8">
          {displayDeck.map((problem, i) => (
            <WorksheetProblem key={`${problem.templateId}:${problem.seed}`} n={i + 1} problem={problem} />
          ))}
        </ol>

        {/* answer key — always starts on a fresh printed page */}
        <section className="worksheet-key mt-10 border-t-2 border-foreground/80 pt-5" aria-labelledby="key-heading">
          <h2 id="key-heading" className="font-serif text-xl font-semibold">
            {t("worksheet.answerKey")}
          </h2>
          <ol className="mt-3 grid gap-x-8 gap-y-2.5 text-[15px] sm:grid-cols-2">
            {displayDeck.map((problem, i) => (
              <li key={`key-${problem.templateId}:${problem.seed}`} className="flex gap-2.5 leading-relaxed">
                <span className="min-w-6 font-semibold">{formatNumber(i + 1)}.</span>
                <MathText>{problem.answerDisplay[lang]}</MathText>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-[11px] text-muted-foreground">{t("worksheet.footer")}</p>
        </section>
      </article>
    </div>
  );
}

function WorksheetProblem({ n, problem }: { n: number; problem: Problem }) {
  const { t, lang, formatNumber } = useI18n();
  const mcOptions =
    problem.questionType === "multiple-choice" && problem.answer.kind === "multiple-choice"
      ? problem.answer.options
      : null;

  return (
    <li className="worksheet-item break-inside-avoid">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-[17px] font-semibold leading-snug">
          <span className="font-serif text-lg">{formatNumber(n)}.</span>{" "}
          <span className="font-normal text-muted-foreground">
            ({t(`difficulty.${problem.difficulty}`)} · {t(`worksheet.type.${problem.questionType}`)})
          </span>
        </h3>
        <span className="text-[11px] text-muted-foreground">
          {t("practice.estimated", { n: Math.max(1, Math.round(problem.estimatedTimeSec / 60)) })}
        </span>
      </div>
      <div className="mt-1.5 text-[16px] leading-relaxed">
        <MathText>{problem.statement[lang]}</MathText>
      </div>

      {mcOptions ? (
        <ol className="mt-2 grid gap-1 text-[15px] sm:grid-cols-2">
          {mcOptions.map((opt, oi) => (
            <li key={opt.id} className="leading-relaxed">
              <span className="font-semibold">{String.fromCharCode(97 + oi)}) </span>
              <MathText>{opt.text[lang]}</MathText>
            </li>
          ))}
        </ol>
      ) : null}

      {problem.diagram ? (
        <div className="mt-3 max-w-sm">
          <ProblemDiagram spec={problem.diagram} label={problem.diagramLabel?.[lang]} />
        </div>
      ) : null}

      {/* work space — ruled lines that print nicely */}
      <div className="mt-4 space-y-9" aria-hidden="true">
        <div className="border-b border-dotted border-border/80" />
        <div className="border-b border-dotted border-border/80" />
      </div>
    </li>
  );
}
