"use client";

/**
 * Progressive hint reveal — hints never contain the final answer and are
 * revealed strictly one at a time.
 */

import { Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MathText } from "@/components/math/math-text";
import { useI18n } from "@/lib/i18n/context";
import type { Problem } from "@/lib/types";
import type { ProblemState } from "./state";
import { cn } from "@/lib/utils";

export function HintsSection({
  problem,
  state,
  onRevealHint,
}: {
  problem: Problem;
  state: ProblemState;
  onRevealHint: () => void;
}) {
  const { t, lang } = useI18n();
  if (problem.hints.length === 0) return null;

  const revealed = state.hintsRevealed;
  const allRevealed = revealed >= problem.hints.length;

  return (
    <section
      aria-label={t("hints.title")}
      className="rounded-xl border border-dashed bg-secondary/40 p-4"
    >
      <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
        <Lightbulb className="h-4 w-4" aria-hidden="true" />
        {t("hints.title")}
      </h3>

      <ol className={cn("mt-3 space-y-2.5", revealed === 0 && "hidden")}>
        {problem.hints.slice(0, revealed).map((hint, i) => (
          <li
            key={i}
            className="animate-in fade-in slide-in-from-left-2 duration-200 flex gap-3 rounded-lg border bg-card px-3.5 py-2.5 text-[15px] leading-relaxed"
          >
            <span
              aria-hidden="true"
              className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-diff-medium/15 text-[11px] font-bold text-diff-medium"
            >
              {i + 1}
            </span>
            <span>{hint[lang] ? <MathText>{hint[lang]}</MathText> : null}</span>
          </li>
        ))}
      </ol>

      <div className="mt-3">
        {allRevealed ? (
          <p className="text-xs text-muted-foreground">{t("hints.noMore")}</p>
        ) : (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onRevealHint}
            className="gap-2"
          >
            <Lightbulb className="h-3.5 w-3.5" aria-hidden="true" />
            {t("hints.hintN", { n: revealed + 1 })}
          </Button>
        )}
      </div>
    </section>
  );
}
