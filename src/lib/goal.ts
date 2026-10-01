/**
 * Daily practice goal — a light habit-building layer stored in localStorage.
 *
 * The goal is a number of problems per day (default 10). Progress toward it
 * is derived from the existing ProblemRecords, so there is nothing extra to
 * track: every attempted problem on today's local date counts once.
 */

import type { ProblemRecord } from "./types";

const GOAL_KEY = "aula-daily-goal";

export const DEFAULT_DAILY_GOAL = 10;
/** Presets offered in the goal picker. */
export const GOAL_CHOICES = [5, 10, 15, 20, 30] as const;

export function loadDailyGoal(): number {
  if (typeof window === "undefined") return DEFAULT_DAILY_GOAL;
  try {
    const raw = window.localStorage.getItem(GOAL_KEY);
    if (!raw) return DEFAULT_DAILY_GOAL;
    const n = Number(raw);
    return Number.isFinite(n) && n >= 5 && n <= 100 ? Math.round(n) : DEFAULT_DAILY_GOAL;
  } catch {
    return DEFAULT_DAILY_GOAL;
  }
}

export function saveDailyGoal(n: number): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(GOAL_KEY, String(n));
  } catch {
    /* private mode — the in-memory value still works for this visit */
  }
}

/** Problems attempted so far today (local calendar day). */
export function countToday(records: ProblemRecord[]): number {
  const today = new Date().toDateString();
  let n = 0;
  for (const r of records) {
    if (new Date(r.timestamp).toDateString() === today) n += 1;
  }
  return n;
}

/** How many of today's attempts were solved on the first try. */
export function firstTryToday(records: ProblemRecord[]): number {
  const today = new Date().toDateString();
  let n = 0;
  for (const r of records) {
    if (r.firstTryCorrect && new Date(r.timestamp).toDateString() === today) n += 1;
  }
  return n;
}
