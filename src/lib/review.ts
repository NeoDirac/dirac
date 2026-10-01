/**
 * Spaced-repetition review scheduling — a light Leitner box on top of the
 * anonymous progress log. When a focused topic session ends, the topic's
 * mastery level moves up or down with the result and the next review date
 * is scheduled at a growing interval (2 → 4 → 7 → 14 → 30 days).
 *
 * Everything lives in localStorage; no accounts, no server.
 */

import type { SessionRecord, Subject } from "./types";

const REVIEW_KEY = "aula-practice-review";
const DAY_MS = 86_400_000;
const MAX_ENTRIES = 100;

/** Review interval in days per mastery level (0–4). */
export const REVIEW_INTERVALS_DAYS = [2, 4, 7, 14, 30] as const;

export interface ReviewEntry {
  subject: Subject;
  topicId: string;
  /** mastery level 0..4 — grows with strong sessions, shrinks with weak ones */
  level: number;
  /** ms epoch when the topic becomes due for review */
  dueAt: number;
  /** ms epoch when the scheduler last ran for this topic */
  scheduledAt: number;
  /** first-try accuracy of the session that produced this schedule (0..1) */
  lastAccuracy: number;
}

export interface ReviewState {
  version: 1;
  entries: ReviewEntry[];
}

const entryKey = (subject: Subject, topicId: string) => `${subject}:${topicId}`;

export function loadReview(): ReviewState {
  if (typeof window === "undefined") return { version: 1, entries: [] };
  try {
    const raw = window.localStorage.getItem(REVIEW_KEY);
    if (!raw) return { version: 1, entries: [] };
    const parsed = JSON.parse(raw) as ReviewState;
    if (!parsed || !Array.isArray(parsed.entries)) return { version: 1, entries: [] };
    return { version: 1, entries: parsed.entries.slice(-MAX_ENTRIES) };
  } catch {
    return { version: 1, entries: [] };
  }
}

function saveReview(state: ReviewState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      REVIEW_KEY,
      JSON.stringify({ version: 1, entries: state.entries.slice(-MAX_ENTRIES) }),
    );
  } catch {
    /* storage full / private mode — practice still works, just unscheduled */
  }
}

/** Removes the review log (called by resetProgress). */
export function clearReview(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(REVIEW_KEY);
  } catch {
    /* ignore */
  }
}

/**
 * Update the schedule after a finished session. Only focused topic sessions
 * with at least 3 attempted problems move the needle (mixed/challenge
 * sessions don't give a clean per-topic signal).
 *
 * Returns the entry that was written, or null when nothing was scheduled.
 */
export function scheduleFromSession(record: SessionRecord): ReviewEntry | null {
  if (typeof window === "undefined") return null;
  if (record.mode !== "topic" || !record.topicId || record.subjects.length !== 1) return null;
  if (record.attempted < 3) return null;

  const accuracy = record.firstTryCorrect / record.attempted;
  const state = loadReview();
  const subject = record.subjects[0];
  const prev = state.entries.find((e) => entryKey(e.subject, e.topicId) === entryKey(subject, record.topicId!));
  let level = prev?.level ?? 0;
  if (accuracy >= 0.8) {
    level = Math.min(level + 1, REVIEW_INTERVALS_DAYS.length - 1);
  } else if (accuracy < 0.5) {
    level = Math.max(level - 1, 0);
  }
  const now = Date.now();
  const entry: ReviewEntry = {
    subject,
    topicId: record.topicId,
    level,
    dueAt: now + REVIEW_INTERVALS_DAYS[level] * DAY_MS,
    scheduledAt: now,
    lastAccuracy: accuracy,
  };
  saveReview({
    version: 1,
    entries: [...state.entries.filter((e) => entryKey(e.subject, e.topicId) !== entryKey(subject, entry.topicId)), entry],
  });
  return entry;
}

/** Entries whose review date has already passed, most overdue first. */
export function dueReviewEntries(now: number = Date.now()): ReviewEntry[] {
  return loadReview()
    .entries.filter((e) => e.dueAt <= now)
    .sort((a, b) => a.dueAt - b.dueAt);
}

/** Future entries, soonest first (for "next review" hints). */
export function upcomingReviewEntries(now: number = Date.now()): ReviewEntry[] {
  return loadReview()
    .entries.filter((e) => e.dueAt > now)
    .sort((a, b) => a.dueAt - b.dueAt);
}

/** Current schedule entry for one topic, if any. */
export function findReviewEntry(subject: Subject, topicId: string): ReviewEntry | null {
  return (
    loadReview().entries.find((e) => entryKey(e.subject, e.topicId) === entryKey(subject, topicId)) ?? null
  );
}

/** Whole-topic label for the interval (used in summaries): "in 4 days". */
export function intervalDays(level: number): number {
  return REVIEW_INTERVALS_DAYS[Math.max(0, Math.min(level, REVIEW_INTERVALS_DAYS.length - 1))];
}
