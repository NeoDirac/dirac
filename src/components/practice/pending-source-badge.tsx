"use client";

/**
 * PendingSourceBadge — provisional marker for generated math exercises
 * above Foundation level (the tutor's content policy: only easy math may
 * be generated; Standard and higher must come from real sources).
 *
 * Rendered instead of a SourceBadge on problems that carry no source,
 * so students (and the tutor reviewing the site) can see at a glance
 * which exercises are still waiting for real-source replacements.
 */

import { Stamp } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

export function PendingSourceBadge({ className }: { className?: string }) {
  const { t } = useI18n();

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-diff-medium/40 bg-diff-medium/10 px-2.5 py-0.5 text-xs font-medium text-diff-medium",
        className,
      )}
      title={t("policy.pending.tooltip")}
    >
      <Stamp className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span className="sr-only">{t("policy.pending.tooltip")}</span>
      <span aria-hidden="true">{t("policy.pending.badge")}</span>
    </span>
  );
}
