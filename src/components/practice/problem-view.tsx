"use client";

/**
 * ProblemView — one problem at a time, attempt-first workflow:
 *   TRY → CHECK → HINT → ANSWER → SOLUTION
 *
 * Gating rules:
 *   - "Reveal answer" unlocks after the first attempt.
 *   - "Show solution" unlocks once the problem is resolved (correct, revealed
 *     or skipped).
 *   - Feedback is calm and never leaks the answer.
 */

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Eye, EyeOff, Lightbulb, Link2, RotateCcw, XCircle } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { MathText } from "@/components/math/math-text";
import { ProblemDiagram } from "@/components/diagrams";
import { DifficultyBadge } from "./difficulty-badge";
import { SourceBadge } from "./source-badge";
import { PendingSourceBadge } from "./pending-source-badge";
import { isPendingRealSource } from "@/content/policy";
import { ReasoningBadge } from "./reasoning-badge";
import { AnswerArea } from "./answer-area";
import { HintsSection } from "./hints-section";
import { SolutionPanel } from "./solution-panel";
import { useI18n } from "@/lib/i18n/context";
import { useToast } from "@/hooks/use-toast";
import { sessionHref } from "@/lib/router";
import type { AnswerSubmission, CheckOutcome } from "@/lib/validation/answer";
import type { Problem } from "@/lib/types";
import type { ProblemState } from "./state";
import { cn, copyToClipboard } from "@/lib/utils";

function FeedbackPanel({
  outcome,
  attempts,
  resolved,
}: {
  outcome: CheckOutcome | null;
  attempts: number;
  resolved: boolean;
}) {
  const { t } = useI18n();

  if (!outcome) return null;

  if (outcome.status === "correct") {
    return (
      <div
        role="status"
        className="animate-in fade-in slide-in-from-bottom-2 duration-200 flex items-start gap-3 rounded-xl border border-success/40 bg-success/10 px-4 py-3 text-[15px]"
      >
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden="true" />
        <div>
          <p className="font-semibold text-success">
            {attempts <= 1 ? t("feedback.correct.first") : t("feedback.correct.later")}
          </p>
          {attempts > 1 ? (
            <p className="text-sm text-muted-foreground">
              {t("practice.attemptsCountPlural", { n: attempts })}
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  if (outcome.status === "invalid-format") {
    return (
      <div
        role="status"
        className="animate-in fade-in slide-in-from-bottom-2 duration-200 flex items-start gap-3 rounded-xl border border-diff-medium/40 bg-diff-medium/10 px-4 py-3 text-[15px]"
      >
        <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-diff-medium" aria-hidden="true" />
        <p className="text-diff-medium">{t("feedback.invalid.numeric")}</p>
      </div>
    );
  }

  if (outcome.status === "wrong-unit") {
    return (
      <div
        role="status"
        className="animate-in fade-in slide-in-from-bottom-2 duration-200 flex items-start gap-3 rounded-xl border border-diff-medium/40 bg-diff-medium/10 px-4 py-3 text-[15px]"
      >
        <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-diff-medium" aria-hidden="true" />
        <p className="font-medium text-diff-medium">{t("feedback.wrongUnit")}</p>
      </div>
    );
  }

  // incorrect — calm, escalating gently
  const message =
    attempts <= 1
      ? t("feedback.incorrect.1")
      : attempts === 2
        ? t("feedback.incorrect.2")
        : t("feedback.incorrect.3");
  return (
    <div
      role="status"
      className={cn(
        "animate-in fade-in slide-in-from-bottom-2 duration-200 flex items-start gap-3 rounded-xl border px-4 py-3 text-[15px]",
        resolved ? "border-border bg-muted/50" : "border-destructive/30 bg-destructive/5",
      )}
    >
      <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive/80" aria-hidden="true" />
      <div>
        <p className={resolved ? "text-muted-foreground" : "font-medium"}>{message}</p>
        {!resolved && attempts >= 1 ? (
          <p className="mt-0.5 flex items-center gap-1 text-sm text-muted-foreground">
            <Lightbulb className="h-3.5 w-3.5" aria-hidden="true" />
            {t("hints.nudge")}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function ProblemView({
  problem,
  state,
  problemKey,
  number,
  checking,
  onCheck,
  onRevealHint,
  onRevealAnswer,
  onToggleSolution,
  onNewVariant,
}: {
  problem: Problem;
  state: ProblemState;
  problemKey: string;
  /** exercise number within the session — textbook-style ghost stamp */
  number?: number;
  checking: boolean;
  onCheck: (submission: AnswerSubmission) => void;
  onRevealHint: () => void;
  onRevealAnswer: () => void;
  onToggleSolution: () => void;
  onNewVariant: () => void;
}) {
  const { t, lang } = useI18n();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const resolved = state.status !== "attempting";
  const canRevealAnswer = state.attempts.length >= 1;
  const answerRevealed = state.status === "revealed" || state.answerRevealed;
  const focusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    focusRef.current?.scrollIntoView({ block: "nearest" });
  }, [state.status]);

  /** Deep link that reproduces exactly this variant (template + seed). */
  async function handleShare() {
    const hash = sessionHref({
      mode: "single",
      subjects: [problem.subject],
      topicId: problem.topicId,
      difficulty: "any",
      count: 1,
      seed: problem.seed,
      singleTemplateId: problem.templateId,
    });
    const url = `${window.location.origin}${window.location.pathname}${hash}`;
    const copiedOk = await copyToClipboard(url);
    if (copiedOk) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({ description: t("share.copied") });
    } else {
      toast({ description: t("share.failed") });
    }
  }

  return (
    <article
      key={problemKey}
      className="notebook-margin animate-in fade-in slide-in-from-bottom-3 duration-300 rounded-lg border bg-card p-5 pl-7 shadow-sm transition-shadow sm:p-7 sm:pl-9"
      ref={focusRef}
    >
      {/* ghost exercise number — the stamp of a textbook page */}
      {typeof number === "number" ? (
        <span
          className="pointer-events-none absolute -top-1 right-3 select-none font-serif text-6xl font-semibold italic leading-none text-foreground/[0.07] sm:right-5 sm:text-7xl"
          aria-hidden="true"
        >
          {number}
        </span>
      ) : null}
      {/* meta row */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <DifficultyBadge difficulty={problem.difficulty} />
        {problem.source ? <SourceBadge source={problem.source} /> : null}
        {isPendingRealSource(problem) ? <PendingSourceBadge /> : null}
        {problem.reasoning ? <ReasoningBadge reasoning={problem.reasoning} /> : null}
        <span className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{t("practice.skill")}:</span>{" "}
          {problem.skill[lang]}
        </span>
        <span className="ml-auto hidden text-xs text-muted-foreground sm:block">
          {t("practice.estimated", { n: Math.max(1, Math.round(problem.estimatedTimeSec / 60)) })}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleShare}
          aria-label={t("share.problem")}
          title={t("share.problem")}
          className={cn(
            "h-8 gap-1.5 px-2.5 text-xs text-muted-foreground transition-colors hover:text-foreground sm:ml-0 ml-auto",
            copied && "text-success hover:text-success",
          )}
        >
          {copied ? (
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
          ) : (
            <Link2 className="h-3.5 w-3.5" aria-hidden="true" />
          )}
          <span className="hidden sm:inline">{copied ? t("share.copiedShort") : t("share.problem")}</span>
        </Button>
      </div>

      <Separator className="my-5" />

      {/* statement */}
      <div className="text-[17px] leading-relaxed">
        <MathText>{problem.statement[lang]}</MathText>
      </div>

      {problem.diagram ? (
        <div className="mt-5">
          <ProblemDiagram spec={problem.diagram} label={problem.diagramLabel?.[lang]} />
        </div>
      ) : null}

      <div className="mt-6">
        <AnswerArea
          key={problemKey}
          problem={problem}
          disabled={resolved}
          checking={checking}
          onSubmit={onCheck}
        />
      </div>

      <div className="mt-4 min-h-[10px]">
        <FeedbackPanel
          outcome={state.lastOutcome}
          attempts={state.attempts.length}
          resolved={resolved && state.status !== "correct"}
        />
      </div>

      {/* revealed answer */}
      {answerRevealed && state.status !== "correct" ? (
        <div className="animate-in fade-in zoom-in-95 duration-200 mt-4 rounded-xl border border-diff-medium/40 bg-diff-medium/10 px-4 py-3.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-diff-medium">
            {t("answer.revealedTitle")}
          </p>
          <div className="mt-1 text-[16px]">
            <MathText>{problem.answerDisplay[lang]}</MathText>
          </div>
        </div>
      ) : null}

      {state.status === "correct" ? (
        <div className="animate-in fade-in zoom-in-95 duration-200 mt-4 rounded-xl border border-success/40 bg-success/10 px-4 py-3.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-success">
            {t("answer.revealedTitle")}
          </p>
          <div className="mt-1 text-[16px]">
            <MathText>{problem.answerDisplay[lang]}</MathText>
          </div>
        </div>
      ) : null}

      <Separator className="my-6" />

      <div className="space-y-4">
        <HintsSection problem={problem} state={state} onRevealHint={onRevealHint} />

        {/* reveal answer + solution */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {answerRevealed ? (
            <Button type="button" variant="ghost" disabled className="gap-2 text-muted-foreground">
              <EyeOff className="h-4 w-4" aria-hidden="true" />
              {t("answer.reveal")}
            </Button>
          ) : (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  disabled={!canRevealAnswer}
                  className={cn("gap-2", canRevealAnswer && "text-diff-medium hover:text-diff-medium")}
                >
                  <Eye className="h-4 w-4" aria-hidden="true" />
                  {t("answer.reveal")}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t("answer.confirmTitle")}</AlertDialogTitle>
                  <AlertDialogDescription>{t("answer.confirmDesc")}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
                  <AlertDialogAction onClick={onRevealAnswer}>{t("answer.reveal")}</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          {resolved ? (
            <Button
              type="button"
              variant="ghost"
              onClick={onNewVariant}
              className="gap-2 text-muted-foreground"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              {t("practice.newVariant")}
            </Button>
          ) : null}
        </div>

        {!canRevealAnswer && !resolved ? (
          <p className="text-xs text-muted-foreground">{t("answer.revealLocked")}</p>
        ) : null}

        {resolved ? (
          <SolutionPanel
            problem={problem}
            open={state.solutionRevealed}
            onToggle={onToggleSolution}
          />
        ) : null}
      </div>
    </article>
  );
}
