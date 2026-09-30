/**
 * Answer-checking dispatcher — the single entry point used by the practice UI.
 *
 * All answer validation lives here (numeric, expression, multiple-choice,
 * text, unit-aware). The UI never compares answers itself.
 */

import type { Problem } from "../types";
import { checkExpressionEquivalent } from "./expression";
import { checkNumeric } from "./numeric";
import { checkUnit } from "./units";

export type AnswerSubmission =
  | { kind: "numeric"; value: string }
  | { kind: "numeric-unit"; value: string; unit: string }
  | { kind: "expression"; text: string }
  | { kind: "multiple-choice"; optionId: string }
  | { kind: "text"; text: string };

export type CheckOutcome =
  | { status: "correct" }
  | { status: "incorrect" }
  /** input could not be parsed at all (e.g. not a number) */
  | { status: "invalid-format" }
  /** numeric-unit problems: value is right, unit is not */
  | { status: "wrong-unit" };

function normalizeText(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[−–—]/g, "-")
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"');
}

export function checkAnswer(
  problem: Problem,
  submission: AnswerSubmission,
): CheckOutcome {
  const ans = problem.answer;

  switch (ans.kind) {
    case "numeric": {
      const num = checkNumeric(
        submission.kind === "numeric" || submission.kind === "numeric-unit" ? submission.value : "",
        ans.value,
        ans.tolerance,
      );
      if (num.status === "invalid") return { status: "invalid-format" };
      return num.status === "correct" ? { status: "correct" } : { status: "incorrect" };
    }

    case "numeric-unit": {
      if (submission.kind !== "numeric-unit") return { status: "invalid-format" };
      const num = checkNumeric(submission.value, ans.value, ans.tolerance);
      if (num.status === "invalid") return { status: "invalid-format" };
      if (num.status === "incorrect") return { status: "incorrect" };
      return checkUnit(submission.unit, ans.units)
        ? { status: "correct" }
        : { status: "wrong-unit" };
    }

    case "expression": {
      const text = submission.kind === "expression" ? submission.text : "";
      if (!text.trim()) return { status: "invalid-format" };
      const res = checkExpressionEquivalent(text, ans.accepted);
      if (res === "invalid") return { status: "invalid-format" };
      return res === "equivalent" ? { status: "correct" } : { status: "incorrect" };
    }

    case "multiple-choice": {
      if (submission.kind !== "multiple-choice") return { status: "invalid-format" };
      const opt = ans.options.find((o) => o.id === submission.optionId);
      if (!opt) return { status: "invalid-format" };
      return opt.correct ? { status: "correct" } : { status: "incorrect" };
    }

    case "text": {
      const text = submission.kind === "text" ? submission.text : "";
      if (!text.trim()) return { status: "invalid-format" };
      const given = ans.caseSensitive ? text.trim() : normalizeText(text);
      const ok = ans.accepted.some((a) =>
        ans.caseSensitive ? a.trim() === given : normalizeText(a) === given,
      );
      return ok ? { status: "correct" } : { status: "incorrect" };
    }
  }
}

/** For multiple-choice: the id of the correct option (used when revealing). */
export function correctOptionId(problem: Problem): string | undefined {
  if (problem.answer.kind === "multiple-choice") {
    return problem.answer.options.find((o) => o.correct)?.id;
  }
  return undefined;
}
