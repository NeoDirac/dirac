"use client";

/**
 * AnswerArea — renders the appropriate input for the problem's question type
 * and reports a typed submission upward. Never validates answers itself.
 */

import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MathText } from "@/components/math/math-text";
import { useI18n } from "@/lib/i18n/context";
import type { AnswerSubmission } from "@/lib/validation/answer";
import type { Problem } from "@/lib/types";
import { cn } from "@/lib/utils";

interface AnswerAreaProps {
  problem: Problem;
  disabled: boolean;
  checking: boolean;
  onSubmit: (submission: AnswerSubmission) => void;
}

export function AnswerArea({ problem, disabled, checking, onSubmit }: AnswerAreaProps) {
  const { t, lang } = useI18n();
  const formId = useId();
  const valueRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState("");
  const [text, setText] = useState("");
  const [expr, setExpr] = useState("");
  const [choice, setChoice] = useState<string | null>(null);

  // focus the main input when a new problem mounts
  useEffect(() => {
    if (!disabled) valueRef.current?.focus();
  }, [disabled]);

  const mcOptionIds =
    problem.questionType === "multiple-choice" && problem.answer.kind === "multiple-choice"
      ? problem.answer.options.map((o) => o.id)
      : null;

  // keyboard shortcuts: 1–9 select the nth multiple-choice option
  useEffect(() => {
    if (!mcOptionIds || disabled) return;
    const onKeyDown = (e: KeyboardEvent) => {
      const n = Number(e.key);
      if (!Number.isInteger(n) || n < 1 || n > mcOptionIds.length) return;
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) return;
      e.preventDefault();
      setChoice(mcOptionIds[n - 1]);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mcOptionIds, disabled]);

  const canSubmit = (() => {
    if (disabled) return false;
    switch (problem.questionType) {
      case "numeric":
        return value.trim().length > 0;
      case "numeric-unit":
        return value.trim().length > 0;
      case "expression":
        return expr.trim().length > 0;
      case "text":
        return text.trim().length > 0;
      case "multiple-choice":
        return choice !== null;
      default:
        return false;
    }
  })();

  function submit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!canSubmit || checking) return;
    switch (problem.questionType) {
      case "numeric":
        onSubmit({ kind: "numeric", value });
        break;
      case "numeric-unit":
        onSubmit({ kind: "numeric-unit", value, unit });
        break;
      case "expression":
        onSubmit({ kind: "expression", text: expr });
        break;
      case "text":
        onSubmit({ kind: "text", text });
        break;
      case "multiple-choice":
        if (choice) onSubmit({ kind: "multiple-choice", optionId: choice });
        break;
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      {problem.questionType === "multiple-choice" ? (
        <RadioGroup
          value={choice ?? undefined}
          onValueChange={(v) => !disabled && setChoice(v)}
          className="gap-2.5"
          aria-label={t("input.yourAnswer")}
          disabled={disabled}
        >
          {problem.answer.kind === "multiple-choice" &&
            problem.answer.options.map((opt, i) => (
              <label
                key={opt.id}
                htmlFor={`${formId}-${opt.id}`}
                className={cn(
                  "group flex cursor-pointer items-start gap-3 rounded-xl border bg-card px-4 py-3 text-[15px] transition-colors",
                  "hover:border-ring/60 hover:bg-secondary/50",
                  "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2",
                  choice === opt.id && "border-primary bg-primary/5",
                  disabled && "cursor-default",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-0.5 inline-flex h-5 w-5 shrink-0 select-none items-center justify-center rounded-md border bg-muted text-[11px] font-semibold text-muted-foreground transition-colors",
                    "group-hover:border-ring/60 group-hover:text-foreground",
                    choice === opt.id && "border-primary bg-primary text-primary-foreground",
                  )}
                >
                  {i + 1}
                </span>
                <RadioGroupItem value={opt.id} id={`${formId}-${opt.id}`} className="mt-0.5 sr-only" />
                <MathText className="min-w-0 flex-1 leading-relaxed">{opt.text[lang]}</MathText>
              </label>
            ))}
        </RadioGroup>
      ) : problem.questionType === "numeric-unit" ? (
        <div className="grid gap-3 sm:grid-cols-[1fr_1fr]">
          <div className="space-y-1.5">
            <Label htmlFor={`${formId}-value`}>{t("input.yourAnswer")}</Label>
            <Input
              id={`${formId}-value`}
              ref={valueRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              inputMode="decimal"
              autoComplete="off"
              placeholder={t("input.placeholder")}
              disabled={disabled}
              className="h-12 text-base"
              aria-describedby={`${formId}-hint`}
              dir="ltr"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor={`${formId}-unit`}>{t("input.unit.placeholder")}</Label>
            <Input
              id={`${formId}-unit`}
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              list={`${formId}-units`}
              autoComplete="off"
              placeholder={t("input.unit.placeholder")}
              disabled={disabled}
              className="h-12 text-base"
              aria-describedby={`${formId}-hint`}
              dir="ltr"
            />
            {problem.answer.kind === "numeric-unit" && problem.answer.unitChoices ? (
              <datalist id={`${formId}-units`}>
                {problem.answer.unitChoices.map((u) => (
                  <option key={u} value={u} />
                ))}
              </datalist>
            ) : null}
          </div>
        </div>
      ) : problem.questionType === "expression" ? (
        <div className="space-y-1.5">
          <Label htmlFor={`${formId}-expr`}>{t("input.yourAnswer")}</Label>
          <Input
            id={`${formId}-expr`}
            value={expr}
            onChange={(e) => setExpr(e.target.value)}
            autoComplete="off"
            spellCheck={false}
            placeholder="e.g. 3x + 5"
            disabled={disabled}
            className="h-12 text-base font-mono"
            aria-describedby={`${formId}-hint`}
            dir="ltr"
          />
        </div>
      ) : problem.questionType === "text" ? (
        <div className="space-y-1.5">
          <Label htmlFor={`${formId}-text`}>{t("input.yourAnswer")}</Label>
          <Input
            id={`${formId}-text`}
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoComplete="off"
            placeholder={t("input.placeholder")}
            disabled={disabled}
            className="h-12 text-base"
            aria-describedby={`${formId}-hint`}
            dir="ltr"
          />
        </div>
      ) : (
        <div className="space-y-1.5">
          <Label htmlFor={`${formId}-value`}>{t("input.yourAnswer")}</Label>
          <div className="flex items-stretch gap-2">
            <Input
              id={`${formId}-value`}
              ref={valueRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              inputMode="decimal"
              autoComplete="off"
              placeholder={t("input.placeholder")}
              disabled={disabled}
              className="h-12 flex-1 text-base"
              aria-describedby={`${formId}-hint`}
              dir="ltr"
            />
            {problem.answer.kind === "numeric" && problem.answer.unitSuffix ? (
              <span className="inline-flex min-w-12 items-center justify-center rounded-lg border bg-muted px-3 text-base font-medium text-muted-foreground">
                {problem.answer.unitSuffix}
              </span>
            ) : null}
          </div>
        </div>
      )}

      <p id={`${formId}-hint`} className="text-xs leading-relaxed text-muted-foreground">
        {problem.questionType === "numeric" && t("input.numeric.hint")}
        {problem.questionType === "numeric-unit" && `${t("input.numeric.hint")} ${t("input.unit.hint")}`}
        {problem.questionType === "expression" && t("input.expression.hint")}
        {problem.questionType === "multiple-choice" && mcOptionIds && mcOptionIds.length > 1
          ? t("input.mc.hint", { n: Math.min(mcOptionIds.length, 9) })
          : ""}
      </p>

      <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:items-center">
        <Button
          type="submit"
          disabled={!canSubmit || checking}
          className="h-12 flex-1 text-[15px] font-semibold sm:flex-none sm:px-10"
        >
          {checking ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
              {t("practice.checking")}
            </>
          ) : (
            <>
              {t("practice.check")}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
