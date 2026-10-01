"use client";

/**
 * SessionView — orchestrates a practice session:
 * loads templates, builds the deck, drives the per-problem state machine,
 * records anonymous progress, and renders the summary.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Flag, Inbox, Keyboard, RotateCcw, SkipForward, Timer, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProblemView } from "./problem-view";
import { SessionSummary } from "./session-summary";
import { initialProblemState, type ProblemState } from "./state";
import { useI18n } from "@/lib/i18n/context";
import { useAllTemplates } from "@/lib/use-templates";
import { buildDeck, findTemplate, instantiateProblem } from "@/lib/session";
import { loadSession, saveSession, clearSession } from "@/lib/session-persist";
import { navigate, href, sessionHref } from "@/lib/router";
import { appendRecord, appendSessionRecord } from "@/lib/progress";
import { scheduleFromSession } from "@/lib/review";
import { useToast } from "@/hooks/use-toast";
import { checkAnswer, type AnswerSubmission } from "@/lib/validation/answer";
import { mathCurriculum } from "@/content/curriculum/math";
import { physicsCurriculum } from "@/content/curriculum/physics";
import type { Problem, SessionConfig, SessionRecord } from "@/lib/types";
import { cn, formatClock } from "@/lib/utils";

const BATCH = 10;

const SHORTCUTS: { keys: string; labelKey: string }[] = [
  { keys: "H", labelKey: "practice.shortcuts.hint" },
  { keys: "N", labelKey: "practice.shortcuts.next" },
  { keys: "Ctrl ⏎", labelKey: "practice.shortcuts.check" },
  { keys: "1–9", labelKey: "practice.shortcuts.mc" },
  { keys: "?", labelKey: "practice.shortcuts.help" },
];

export function SessionView({ config }: { config: SessionConfig }) {
  const { t, lang } = useI18n();
  const { templates, loading } = useAllTemplates();
  const [deck, setDeck] = useState<Problem[] | null>(null);
  const [states, setStates] = useState<ProblemState[]>([]);
  const [index, setIndex] = useState(0);
  const [checking, setChecking] = useState(false);
  const [ended, setEnded] = useState(false);
  const [relaxed, setRelaxed] = useState(false);
  const [reviewing, setReviewing] = useState(false);
  const [builtKey, setBuiltKey] = useState<string | null>(null);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [times, setTimes] = useState<(number | undefined)[]>([]);
  const [sessionRecorded, setSessionRecorded] = useState(false);
  const nextRef = useRef<HTMLButtonElement>(null);
  const problemStartRef = useRef<number>(Date.now());
  const configKey = useMemo(() => JSON.stringify(config), [config]);

  const unlimited = !Number.isFinite(config.count);

  const { toast } = useToast();
  const sessionKeyRef = useRef<string | null>(null);

  useEffect(() => {
    if (loading) return;
    // deferred one frame so we never setState synchronously inside the effect
    const id = requestAnimationFrame(() => {
      const cfg = JSON.parse(configKey) as SessionConfig;
      // links generated with seed 0 get a real, shareable seed on entry
      if (cfg.seed === 0) {
        navigate(sessionHref({ ...cfg, seed: Math.floor(Math.random() * 2 ** 31) }));
        return;
      }
      // build/restore only once per config (language switches must not re-run it)
      if (sessionKeyRef.current === configKey) return;
      sessionKeyRef.current = configKey;
      // restore an interrupted session (same URL seed) instead of rebuilding
      const stored = loadSession(configKey);
      if (stored) {
        setDeck(stored.problems);
        setStates(stored.states);
        setIndex(stored.index);
        setElapsedSec(stored.elapsedSec ?? 0);
        setTimes(stored.times ?? []);
        setEnded(stored.ended);
        setRelaxed(false);
        setReviewing(stored.reviewing === true);
        setSessionRecorded(stored.sessionRecorded === true);
        setBuiltKey(configKey);
        toast({
          description: t("practice.restored"),
        });
        return;
      }
      clearSession();
      const result = buildDeck(cfg, templates, { batchSize: Number.isFinite(cfg.count) ? cfg.count : BATCH });
      setDeck(result.problems);
      setStates(result.problems.map(() => ({ ...initialProblemState })));
      setRelaxed(result.difficultyRelaxed);
      setReviewing(false);
      setIndex(0);
      setElapsedSec(0);
      setTimes([]);
      setEnded(false);
      setSessionRecorded(false);
      setBuiltKey(configKey);
    });
    return () => cancelAnimationFrame(id);
  }, [loading, templates, configKey, t, toast]);

  // mirror the running session so a refresh never loses it — but only once
  // the deck actually belongs to the current config (avoids saving the previous
  // session under the new key during the rebuild frame)
  useEffect(() => {
    if (!deck || !configKey || builtKey !== configKey) return;
    saveSession({
      configKey,
      index,
      ended,
      problems: deck,
      states,
      reviewing,
      elapsedSec,
      times,
      sessionRecorded,
    });
  }, [deck, states, index, ended, configKey, builtKey, reviewing, elapsedSec, times, sessionRecorded]);

  // live session timer — counts only while the tab is visible and the session
  // has not ended (an honest "time on task", safe across refresh via persistence)
  useEffect(() => {
    if (ended) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") setElapsedSec((s) => s + 1);
    }, 1000);
    return () => window.clearInterval(id);
  }, [ended]);

  // start of the current problem — reset on navigation, new variant or retry
  useEffect(() => {
    problemStartRef.current = Date.now();
  }, [index, deck, reviewing]);

  /** Seconds spent on the current problem so far (whole seconds, min 1). */
  const currentProblemSec = useCallback(
    () => Math.max(1, Math.round((Date.now() - problemStartRef.current) / 1000)),
    [],
  );

  /** Freeze the seconds spent on the current problem (first resolve only). */
  const stampTime = useCallback(
    (secs?: number) => {
      const value = secs ?? currentProblemSec();
      setTimes((prev) => {
        if (prev[index] !== undefined) return prev;
        const next = [...prev];
        next[index] = value;
        return next;
      });
    },
    [index, currentProblemSec],
  );

  const current = deck?.[index];
  const currentState = states[index];

  const topicName = useMemo(() => {
    if (config.mode === "topic" && config.topicId) {
      const cur = config.subjects[0] === "physics" ? physicsCurriculum : mathCurriculum;
      const topic = cur.find((tp) => tp.id === config.topicId);
      return topic?.name[lang] ?? "";
    }
    return "";
  }, [config, lang]);

  const subtopicName = useMemo(() => {
    if (config.mode === "topic" && config.topicId && config.subtopicId) {
      const cur = config.subjects[0] === "physics" ? physicsCurriculum : mathCurriculum;
      const topic = cur.find((tp) => tp.id === config.topicId);
      return topic?.subtopics.find((st) => st.id === config.subtopicId)?.name[lang] ?? "";
    }
    return "";
  }, [config, lang]);

  const subjectLabel =
    config.subjects.length === 1
      ? config.subjects[0] === "math"
        ? t("nav.math")
        : t("nav.physics")
      : t("mixed.subject.both");

  const backHref =
    (config.mode === "topic" || config.mode === "single") && config.topicId && config.subjects.length === 1
      ? href({ name: "topic", subject: config.subjects[0], topicId: config.topicId })
      : config.subjects.length === 1
        ? href({ name: "subject", subject: config.subjects[0] })
        : href({ name: "practice" });

  /* ---------------------------------------------------------------- */
  /* state helpers                                                     */
  /* ---------------------------------------------------------------- */

  const updateState = useCallback(
    (fn: (s: ProblemState) => ProblemState) => {
      setStates((prev) => prev.map((s, i) => (i === index ? fn(s) : s)));
    },
    [index],
  );

  const record = useCallback(
    (problem: Problem, state: ProblemState) => {
      appendRecord({
        templateId: problem.templateId,
        seed: problem.seed,
        subject: problem.subject,
        topicId: problem.topicId,
        subtopicId: problem.subtopicId,
        difficulty: problem.difficulty,
        attempts: state.attempts.length,
        firstTryCorrect: state.attempts[0]?.correct ?? false,
        eventualCorrect: state.attempts.some((a) => a.correct),
        hintsUsed: state.hintsRevealed,
        revealedAnswer: state.answerRevealed,
        revealedSolution: state.solutionRevealed,
        timestamp: Date.now(),
        timeSec: currentProblemSec(),
      });
    },
    [currentProblemSec],
  );

  const resolveAndRecord = useCallback(
    (problem: Problem, state: ProblemState, patch: Partial<ProblemState>) => {
      const next = { ...state, ...patch };
      if (!next.recorded) {
        const secs = currentProblemSec();
        record(problem, next);
        next.recorded = true;
        stampTime(secs);
      }
      return next;
    },
    [record, stampTime, currentProblemSec],
  );

  /* ---------------------------------------------------------------- */
  /* actions                                                           */
  /* ---------------------------------------------------------------- */

  const handleCheck = useCallback(
    (submission: AnswerSubmission) => {
      if (!current || !currentState || currentState.status !== "attempting") return;
      setChecking(true);
      const outcome = checkAnswer(current, submission);
      setChecking(false);
      const correct = outcome.status === "correct";
      const attempts = [...currentState.attempts, { correct }];
      if (correct) {
        const next = resolveAndRecord(current, currentState, {
          attempts,
          status: "correct",
          lastOutcome: outcome,
        });
        updateState(() => next);
        // move keyboard focus to "next problem"
        setTimeout(() => nextRef.current?.focus(), 80);
      } else {
        updateState((s) => ({ ...s, attempts, lastOutcome: outcome }));
      }
    },
    [current, currentState, resolveAndRecord, updateState],
  );

  const handleRevealAnswer = useCallback(() => {
    if (!current || !currentState || currentState.status !== "attempting") return;
    if (currentState.attempts.length < 1) return;
    const next = resolveAndRecord(current, currentState, {
      status: "revealed",
      answerRevealed: true,
    });
    updateState(() => next);
    setTimeout(() => nextRef.current?.focus(), 80);
  }, [current, currentState, resolveAndRecord, updateState]);

  const handleRevealHint = useCallback(() => {
    if (!current || !currentState) return;
    updateState((s) => ({
      ...s,
      hintsRevealed: Math.min(s.hintsRevealed + 1, current.hints.length),
    }));
  }, [current, currentState, updateState]);

  const handleToggleSolution = useCallback(() => {
    if (!current || !currentState || currentState.status === "attempting") return;
    if (currentState.solutionRevealed) {
      updateState((s) => ({ ...s, solutionRevealed: false }));
    } else {
      const next = { ...currentState, solutionRevealed: true };
      if (!next.recorded) {
        const secs = currentProblemSec();
        record(current, next);
        next.recorded = true;
        stampTime(secs);
      }
      updateState(() => next);
    }
  }, [current, currentState, record, stampTime, currentProblemSec, updateState]);

  const handleSkip = useCallback(() => {
    if (!current || !currentState || currentState.status !== "attempting") return;
    const next = resolveAndRecord(current, currentState, { status: "skipped" });
    updateState(() => next);
    setTimeout(() => nextRef.current?.focus(), 80);
  }, [current, currentState, resolveAndRecord, updateState]);

  const handleNext = useCallback(() => {
    if (!deck) return;
    if (index < deck.length - 1) {
      setIndex((i) => i + 1);
      return;
    }
    if (unlimited) {
      const cfg = JSON.parse(configKey) as SessionConfig;
      const batch = buildDeck(cfg, templates, { batchIndex: Math.floor(deck.length / BATCH) + 1, batchSize: BATCH });
      setDeck((d) => [...(d ?? []), ...batch.problems]);
      setStates((s) => [...s, ...batch.problems.map(() => ({ ...initialProblemState }))]);
      setIndex((i) => i + 1);
    } else {
      setEnded(true);
    }
  }, [deck, index, unlimited, configKey, templates]);

  const handleNewVariant = useCallback(() => {
    if (!current || !deck) return;
    const tpl = findTemplate(templates, current.templateId);
    if (!tpl) return;
    const fresh = instantiateProblem(tpl, Math.floor(Math.random() * 2 ** 31) || 7);
    setDeck((d) => (d ? d.map((p, i) => (i === index ? fresh : p)) : d));
    setStates((s) => s.map((st, i) => (i === index ? { ...initialProblemState } : st)));
    // a fresh variant restarts the clock for this slot
    setTimes((prev) => {
      if (prev[index] === undefined) return prev;
      const next = [...prev];
      next[index] = undefined;
      return next;
    });
  }, [current, deck, index, templates]);

  const handleAgain = useCallback(() => {
    clearSession();
    const cfg = JSON.parse(configKey) as SessionConfig;
    navigate(sessionHref({ ...cfg, seed: Math.floor(Math.random() * 2 ** 31) }));
  }, [configKey]);

  /** Re-run just the problems that were never solved (wrong, revealed or skipped)
   *  — same variants, fresh states. */
  const handleRetryMissed = useCallback(() => {
    if (!deck) return;
    const missed = deck.filter((_, i) => !states[i]?.attempts.some((a) => a.correct));
    if (missed.length === 0) return;
    setDeck(missed);
    setStates(missed.map(() => ({ ...initialProblemState })));
    setTimes([]);
    setIndex(0);
    setEnded(false);
    setSessionRecorded(false);
    setReviewing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [deck, states]);

  /* ---------------------------------------------------------------- */
  /* session history: append one record when the session truly ends    */
  /* (the sessionRecorded flag is persisted, so reloading an ended      */
  /* session or its summary never duplicates the entry)                */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    if (!ended || !deck || deck.length === 0 || sessionRecorded) return;
    const attempted = states.filter((s) => s.attempts.length > 0).length;
    const solved = states.filter((s) => s.attempts.some((a) => a.correct)).length;
    const firstTry = states.filter((s) => s.attempts[0]?.correct).length;
    const hintsUsed = states.reduce((a, s) => a + s.hintsRevealed, 0);
    const record: SessionRecord = {
      endedAt: Date.now(),
      mode: config.mode,
      subjects: config.subjects,
      topicId: config.topicId,
      subtopicId: config.subtopicId,
      review: reviewing,
      problems: deck.length,
      attempted,
      solved,
      firstTryCorrect: firstTry,
      hintsUsed,
      elapsedSec: elapsedSec >= 5 ? elapsedSec : undefined,
    };
    appendSessionRecord(record);
    // spaced repetition: focused topic sessions move the review schedule
    scheduleFromSession(record);
    setSessionRecorded(true);
  }, [ended, deck, states, sessionRecorded, config, reviewing, elapsedSec]);

  /* ---------------------------------------------------------------- */
  /* keyboard shortcuts: H = next hint, N = next problem               */
  /* (Ctrl/⌘+Enter for checking lives in the AnswerArea form)          */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }
      // don't fight with open dialogs / menus
      if (document.querySelector("[role=dialog], [role=menu]")) return;
      if (e.key === "?" || e.key === "¿") {
        e.preventDefault();
        setShortcutsOpen(true);
        return;
      }
      const key = e.key.toLowerCase();
      if (key === "h") {
        if (currentState && currentState.status === "attempting") {
          e.preventDefault();
          handleRevealHint();
        }
      } else if (key === "n") {
        if (currentState && currentState.status !== "attempting") {
          e.preventDefault();
          handleNext();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentState, handleRevealHint, handleNext]);

  /* ---------------------------------------------------------------- */
  /* render                                                            */
  /* ---------------------------------------------------------------- */

  if (loading || (!deck && !ended)) {
    return (
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-8 sm:px-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-2 w-full" />
        <Skeleton className="h-96 w-full rounded-2xl" />
      </div>
    );
  }

  if (ended || !current || !currentState) {
    if (deck && deck.length === 0) {
      // no problems matched the requested filters (e.g. an empty level)
      return (
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <Inbox className="mx-auto h-10 w-10 text-muted-foreground/60" aria-hidden="true" />
          <h1 className="mt-4 font-serif text-2xl font-semibold">{t("session.empty.title")}</h1>
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
      <SessionSummary
        config={config}
        deck={deck ?? []}
        states={states}
        times={times}
        elapsedSec={elapsedSec}
        onAgain={handleAgain}
        onRetryMissed={handleRetryMissed}
      />
    );
  }

  const resolvedCount = states.filter((s) => s.status !== "attempting").length;
  const correctCount = states.filter((s) => s.status === "correct").length;
  const missedCount = states.filter(
    (s) => s.status === "revealed" || s.status === "skipped",
  ).length;
  const progress = unlimited ? 0 : (resolvedCount / deck!.length) * 100;

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
      {/* session header */}
      <div className="mb-5 space-y-3">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <a
            href={backHref}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {config.mode === "topic" || config.mode === "single"
              ? t("practice.backToTopic")
              : t("common.back")}
          </a>
          <span className="text-sm font-semibold">
            {subjectLabel}
            {topicName ? <span className="text-muted-foreground"> · {topicName}</span> : null}
            {subtopicName ? <span className="text-muted-foreground"> · {subtopicName}</span> : null}
          </span>
          {reviewing ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
              <RotateCcw className="h-3 w-3" aria-hidden="true" />
              {t("session.reviewBadge")}
            </span>
          ) : null}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="ml-auto gap-1.5 text-muted-foreground"
              >
                <Flag className="h-3.5 w-3.5" aria-hidden="true" />
                {t("practice.endSession")}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t("summary.endTitle")}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t("session.endConfirmDesc")}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
                <AlertDialogAction onClick={() => setEnded(true)}>{t("common.confirm")}</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* keyboard legend — desktop only, never printed; click or press ? for help */}
        <button
          type="button"
          onClick={() => setShortcutsOpen(true)}
          className="hidden items-center gap-2.5 text-[11px] text-muted-foreground/80 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full px-1 sm:flex"
          aria-label={t("practice.shortcutsHelp.open")}
        >
          <span className="font-medium uppercase tracking-wider">{t("practice.shortcuts")}</span>
          <span className="inline-flex items-center gap-1"><kbd className="kbd-chip">H</kbd>{t("practice.shortcuts.hint")}</span>
          <span className="inline-flex items-center gap-1"><kbd className="kbd-chip">N</kbd>{t("practice.shortcuts.next")}</span>
          <span className="inline-flex items-center gap-1"><kbd className="kbd-chip">Ctrl ⏎</kbd>{t("practice.shortcuts.check")}</span>
          <span className="inline-flex items-center gap-1 opacity-70"><kbd className="kbd-chip">?</kbd></span>
        </button>
      </div>

      {/* progress strip — direct child of the tall session column so it can
          stick below the header on mobile (long problems always show where
          you are); static on desktop to keep the view quiet */}
      <div className="sticky top-16 z-20 -mx-4 mb-4 border-b bg-background/90 px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/75 sm:static sm:mx-0 sm:mb-5 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none">
        <div className="flex items-center gap-3">
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {unlimited
              ? t("practice.questionUnlimited", { n: index + 1 })
              : t("practice.questionOf", { current: index + 1, total: deck!.length })}
          </p>
          <div className="ml-auto flex items-center gap-2 text-xs font-medium">
            <span
              className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 tabular-nums text-muted-foreground"
              title={t("practice.elapsed")}
              aria-hidden="true"
            >
              <Timer className="h-3 w-3" aria-hidden="true" />
              {formatClock(elapsedSec)}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-success">
              <Check className="h-3 w-3" aria-hidden="true" />
              {correctCount} {t("practice.score.correct")}
            </span>
            {missedCount > 0 ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 text-destructive">
                <X className="h-3 w-3" aria-hidden="true" />
                {missedCount} {t("practice.score.incorrect")}
              </span>
            ) : null}
          </div>
        </div>
        <Progress value={progress} className="mt-2 h-1.5" aria-label={t("practice.questionOf", { current: index + 1, total: deck!.length })} />
      </div>

      {relaxed ? (
        <div className="mb-4 rounded-xl border border-diff-medium/40 bg-diff-medium/10 px-4 py-2.5 text-sm text-diff-medium">
          {t("session.lowStock.desc")}
        </div>
      ) : null}

      <ProblemView
        problem={current}
        state={currentState}
        problemKey={`${current.templateId}:${current.seed}`}
        checking={checking}
        onCheck={handleCheck}
        onRevealHint={handleRevealHint}
        onRevealAnswer={handleRevealAnswer}
        onToggleSolution={handleToggleSolution}
        onNewVariant={handleNewVariant}
      />

      {/* bottom actions */}
      <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
        {currentState.status === "attempting" ? (
          <Button type="button" variant="ghost" onClick={handleSkip} className="gap-2 text-muted-foreground">
            <SkipForward className="h-4 w-4" aria-hidden="true" />
            {t("practice.skip")}
          </Button>
        ) : (
          <span />
        )}
        <Button
          type="button"
          ref={nextRef}
          onClick={handleNext}
          className={cn(
            "gap-2 text-[15px] font-semibold",
            currentState.status === "correct" && "bg-success text-success-foreground hover:bg-success/90",
          )}
        >
          {t("practice.next")}
          <kbd className="kbd-chip" aria-hidden="true">N</kbd>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>

      {/* keyboard shortcuts help (press ? or click the legend) */}
      <Dialog open={shortcutsOpen} onOpenChange={setShortcutsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Keyboard className="h-5 w-5 text-primary" aria-hidden="true" />
              {t("practice.shortcutsHelp.title")}
            </DialogTitle>
            <DialogDescription>{t("practice.shortcutsHelp.desc")}</DialogDescription>
          </DialogHeader>
          <ul className="mt-2 divide-y">
            {SHORTCUTS.map((sc) => (
              <li key={sc.keys} className="flex items-center justify-between gap-4 py-2.5 text-sm">
                <span className="text-muted-foreground">{t(sc.labelKey)}</span>
                <kbd className="kbd-chip shrink-0 text-xs">{sc.keys}</kbd>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </div>
  );
}
