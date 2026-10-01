"use client";

/**
 * Practice configuration page — two modes:
 *   - "Práctica mixta" (mixed): random order across topics
 *   - "Repaso integrador" (interleaved): topics alternate with discipline,
 *     weakest first, optionally without Foundation-level problems
 */

import { useState } from "react";
import { ArrowRight, Layers, Printer, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n/context";
import { href, sessionHref, worksheetHref } from "@/lib/router";
import type { Difficulty, SessionMode, Subject } from "@/lib/types";

const DIFFICULTIES: (Difficulty | "any")[] = ["any", "easy", "medium", "hard", "challenge"];
const COUNTS = [5, 10, 20];

type SubjectChoice = "both" | "math" | "physics";
type PracticeModeChoice = "mixed" | "interleaved";

const MODES: { key: PracticeModeChoice; icon: typeof Shuffle; labelKey: string; descKey: string }[] = [
  { key: "mixed", icon: Shuffle, labelKey: "practice.mode.mixed", descKey: "practice.mode.mixed.desc" },
  { key: "interleaved", icon: Layers, labelKey: "practice.mode.interleaved", descKey: "practice.mode.interleaved.desc" },
];

export function PracticeConfigView() {
  const { t } = useI18n();
  const [mode, setMode] = useState<PracticeModeChoice>("mixed");
  const [subject, setSubject] = useState<SubjectChoice>("both");
  const [difficulty, setDifficulty] = useState<Difficulty | "any">("any");
  const [count, setCount] = useState<number>(10);
  const [excludeEasy, setExcludeEasy] = useState(true);

  const sessionMode: SessionMode =
    mode === "interleaved" ? "interleaved" : difficulty === "challenge" ? "challenge" : "mixed";

  const config = {
    mode: sessionMode,
    subjects: subject === "both" ? (["math", "physics"] as Subject[]) : [subject as Subject],
    difficulty,
    count,
    seed: 0,
    // Foundation-level exercises are worked in class — the serious mode
    // leaves them out unless the student asks for them
    excludeEasy: mode === "interleaved" ? excludeEasy : undefined,
  };

  const startHref = sessionHref(config);
  const printHref = worksheetHref(config);

  const subjectChoices: { key: SubjectChoice; label: string }[] = [
    { key: "both", label: t("mixed.subject.both") },
    { key: "math", label: t("nav.math") },
    { key: "physics", label: t("nav.physics") },
  ];

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="font-serif text-4xl font-semibold tracking-tight">
        {t(mode === "interleaved" ? "interleaved.title" : "mixed.title")}
      </h1>
      <p className="mt-2 text-muted-foreground">
        {t(mode === "interleaved" ? "interleaved.desc" : "mixed.desc")}
      </p>

      <div className="mt-9 space-y-7 rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
        <fieldset>
          <legend className="text-sm font-medium">{t("practice.mode")}</legend>
          <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
            {MODES.map((m) => {
              const pressed = mode === m.key;
              return (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => setMode(m.key)}
                  aria-pressed={pressed}
                  className={cn(
                    "flex items-start gap-3 rounded-xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    pressed ? "border-primary bg-primary/[0.06]" : "bg-card hover:bg-secondary/60",
                  )}
                >
                  <m.icon
                    className={cn("mt-0.5 h-5 w-5 shrink-0", pressed ? "text-primary" : "text-muted-foreground")}
                    aria-hidden="true"
                  />
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{t(m.labelKey)}</span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                      {t(m.descKey)}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        {mode === "interleaved" ? (
          <fieldset>
            <legend className="sr-only">{t("interleaved.excludeEasy")}</legend>
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-dashed p-3.5 transition-colors hover:bg-secondary/40">
              <Checkbox
                checked={excludeEasy}
                onCheckedChange={(v) => setExcludeEasy(v === true)}
                className="mt-0.5"
                aria-label={t("interleaved.excludeEasy")}
              />
              <span className="min-w-0">
                <span className="block text-sm font-medium">{t("interleaved.excludeEasy")}</span>
                <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                  {t("interleaved.excludeEasy.hint")}
                </span>
              </span>
            </label>
          </fieldset>
        ) : null}

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
