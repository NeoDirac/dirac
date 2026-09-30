"use client";

/**
 * Worked solution — staged display (Given → Approach → Calculation → Result)
 * rendered with KaTeX, never as a wall of text.
 */

import { BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MathText } from "@/components/math/math-text";
import { useI18n } from "@/lib/i18n/context";
import { solutionSteps, type Problem, type SolutionStage } from "@/lib/types";
import { cn } from "@/lib/utils";

const STAGE_COLOR: Record<SolutionStage, string> = {
  given: "bg-diagram-primary/10 text-diagram-primary",
  approach: "bg-diagram-secondary/10 text-diagram-secondary",
  calculation: "bg-diff-medium/10 text-diff-medium",
  result: "bg-diff-easy/10 text-diff-easy",
};

export function SolutionPanel({
  problem,
  open,
  onToggle,
}: {
  problem: Problem;
  open: boolean;
  onToggle: () => void;
}) {
  const { t, lang } = useI18n();
  const steps = solutionSteps(problem, lang);

  return (
    <section aria-label={t("solution.title")}>
      <Button
        type="button"
        variant="outline"
        onClick={onToggle}
        aria-expanded={open}
        className="w-full justify-between gap-2"
      >
        <span className="flex items-center gap-2">
          <BookOpen className="h-4 w-4" aria-hidden="true" />
          {open ? t("solution.title") : t("solution.show")}
        </span>
        {open ? <ChevronUp className="h-4 w-4" aria-hidden="true" /> : <ChevronDown className="h-4 w-4" aria-hidden="true" />}
      </Button>

      {open ? (
        <ol className="animate-in fade-in slide-in-from-top-2 duration-200 mt-4 space-y-0">
          {steps.map((step, i) => (
            <li key={i} className="relative flex gap-4 pb-5 last:pb-1">
              {/* rail */}
              <div className="flex flex-col items-center" aria-hidden="true">
                <span
                  className={cn(
                    "z-10 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold uppercase tracking-wide",
                    STAGE_COLOR[step.stage],
                  )}
                >
                  {i + 1}
                </span>
                {i < steps.length - 1 ? (
                  <span className="mt-1 w-px flex-1 bg-border" />
                ) : null}
              </div>
              {/* content */}
              <div className="min-w-0 flex-1 pt-0.5">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t(`solution.stage.${step.stage}`)}
                </p>
                <MathText className="text-[15px] leading-relaxed text-foreground">
                  {step.content[lang]}
                </MathText>
              </div>
            </li>
          ))}
        </ol>
      ) : null}
    </section>
  );
}
