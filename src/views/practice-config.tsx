"use client";

/**
 * Mixed practice configuration page.
 */

import { useState } from "react";
import { ArrowRight, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n/context";
import { href, sessionHref, worksheetHref } from "@/lib/router";
import type { Difficulty, Subject } from "@/lib/types";

const DIFFICULTIES: (Difficulty | "any")[] = ["any", "easy", "medium", "hard", "challenge"];
const COUNTS = [5, 10, 20];

type SubjectChoice = "both" | "math" | "physics";

export function PracticeConfigView() {
  const { t } = useI18n();
  const [subject, setSubject] = useState<SubjectChoice>("both");
  const [difficulty, setDifficulty] = useState<Difficulty | "any">("any");
  const [count, setCount] = useState<number>(10);

  const startHref = sessionHref({
    mode: difficulty === "challenge" ? "challenge" : "mixed",
    subjects: subject === "both" ? ["math", "physics"] : [subject as Subject],
    difficulty,
    count,
    seed: 0,
  });

  const printHref = worksheetHref({
    mode: difficulty === "challenge" ? "challenge" : "mixed",
    subjects: subject === "both" ? ["math", "physics"] : [subject as Subject],
    difficulty,
    count,
    seed: 0,
  });

  const subjectChoices: { key: SubjectChoice; label: string }[] = [
    { key: "both", label: t("mixed.subject.both") },
    { key: "math", label: t("nav.math") },
    { key: "physics", label: t("nav.physics") },
  ];

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="font-serif text-4xl font-semibold tracking-tight">{t("mixed.title")}</h1>
      <p className="mt-2 text-muted-foreground">{t("mixed.desc")}</p>

      <div className="mt-9 space-y-7 rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
        <fieldset>
          <legend className="text-sm font-medium">{t("mixed.subject")}</legend>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {subjectChoices.map((s) => (
              <button
                key={s.key}
                type="button"
                onClick={() => setSubject(s.key)}
                aria-pressed={subject === s.key}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                  subject === s.key
                    ? "border-primary bg-primary text-primary-foreground"
                    : "bg-card hover:bg-secondary",
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-medium">{t("mixed.difficulty")}</legend>
          <div className="mt-2.5 grid grid-cols-3 gap-2 sm:grid-cols-5">
            {DIFFICULTIES.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDifficulty(d)}
                aria-pressed={difficulty === d}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                  difficulty === d
                    ? "border-primary bg-primary text-primary-foreground"
                    : "bg-card hover:bg-secondary",
                )}
              >
                {d === "any" ? t("topic.difficulty.any") : t(`difficulty.${d}`)}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-medium">{t("mixed.count")}</legend>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {COUNTS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCount(c)}
                aria-pressed={count === c}
                className={cn(
                  "inline-flex min-w-14 items-center justify-center rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                  count === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "bg-card hover:bg-secondary",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button asChild size="lg" className="flex-1 gap-2 text-[15px] font-semibold">
            <a href={startHref}>
              {t("mixed.start")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="gap-2 text-[15px] font-medium">
            <a href={printHref}>
              <Printer className="h-4 w-4" aria-hidden="true" />
              {t("worksheet.printButton")}
            </a>
          </Button>
          <a
            href={href({ name: "home" })}
            className="py-2 text-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:px-4"
          >
            {t("common.cancel")}
          </a>
        </div>
      </div>
    </div>
  );
}
