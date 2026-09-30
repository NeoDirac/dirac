"use client";

import { useI18n } from "@/lib/i18n/context";
import type { Difficulty } from "@/lib/types";
import { cn } from "@/lib/utils";

const LEVEL: Record<Difficulty, number> = {
  easy: 1,
  medium: 2,
  hard: 3,
  challenge: 4,
};

const STYLES: Record<Difficulty, string> = {
  easy: "text-diff-easy",
  medium: "text-diff-medium",
  hard: "text-diff-hard",
  challenge: "text-diff-challenge",
};

const DOT: Record<Difficulty, string> = {
  easy: "bg-diff-easy",
  medium: "bg-diff-medium",
  hard: "bg-diff-hard",
  challenge: "bg-diff-challenge",
};

/** Subtle difficulty indicator: 4-segment meter + label (never color alone). */
export function DifficultyBadge({
  difficulty,
  className,
  compact = false,
}: {
  difficulty: Difficulty;
  className?: string;
  compact?: boolean;
}) {
  const { t } = useI18n();
  const level = LEVEL[difficulty];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border bg-card px-2.5 py-0.5 text-xs font-medium",
        STYLES[difficulty],
        className,
      )}
      title={`${t("difficulty.label")}: ${t(`difficulty.${difficulty}`)}`}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", DOT[difficulty])} aria-hidden="true" />
      <span className="inline-flex items-end gap-[2px]" aria-hidden="true">
        {[1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={cn(
              "w-[3px] rounded-[1px]",
              i <= level ? DOT[difficulty] : "bg-border",
              i === 4 ? "h-[9px]" : i === 3 ? "h-[8px]" : i === 2 ? "h-[6px]" : "h-[4px]",
            )}
          />
        ))}
      </span>
      {!compact && <span>{t(`difficulty.${difficulty}`)}</span>}
      <span className="sr-only">
        {t("difficulty.label")}: {t(`difficulty.${difficulty}`)}
      </span>
    </span>
  );
}
