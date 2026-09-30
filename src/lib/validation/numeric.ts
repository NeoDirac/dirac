/**
 * Numeric answer parsing and checking.
 *
 * Accepts:
 *  - decimal point and decimal comma (2.5 / 2,5)
 *  - scientific notation (3e8, 2,5E-3)
 *  - simple arithmetic that evaluates to a constant (3*10^8, (2+3)/2, 45/2)
 *
 * Tolerance modes: relative (default), absolute, sigfig.
 */

import type { ToleranceSpec } from "../types";
import { evaluateConstant, ExpressionError } from "./expression";

/** Parses student numeric input; returns null when it is not a valid number. */
export function parseNumericInput(input: string): number | null {
  const raw = input.trim();
  if (!raw) return null;
  try {
    const v = evaluateConstant(raw);
    return Number.isFinite(v) ? v : null;
  } catch (e) {
    if (e instanceof ExpressionError) return null;
    return null;
  }
}

/** Absolute tolerance window for a value under a tolerance spec. */
export function toleranceWindow(value: number, tol?: ToleranceSpec): number {
  if (!tol) {
    // sensible default: integers essentially exact, otherwise 1% relative
    return Number.isInteger(value) ? 1e-6 : 0.01 * Math.max(1, Math.abs(value));
  }
  switch (tol.mode) {
    case "absolute":
      return tol.value;
    case "relative":
      return tol.value * Math.max(1, Math.abs(value));
    case "sigfig": {
      if (value === 0) return 1e-9;
      const exp = Math.floor(Math.log10(Math.abs(value)));
      return 0.5001 * Math.pow(10, exp - tol.value + 1);
    }
  }
}

export function checkNumeric(
  input: string,
  value: number,
  tol?: ToleranceSpec,
): { status: "correct" | "incorrect" | "invalid" } {
  const parsed = parseNumericInput(input);
  if (parsed === null) return { status: "invalid" };
  const window = toleranceWindow(value, tol);
  return Math.abs(parsed - value) <= window
    ? { status: "correct" }
    : { status: "incorrect" };
}
