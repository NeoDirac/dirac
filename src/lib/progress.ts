/**
 * Anonymous progress tracking — everything lives in localStorage.
 * No accounts, no server calls. The shape is forward-compatible with a future
 * backend sync (records are self-contained events).
 */

import type { Difficulty, ProblemRecord, ProgressState, Subject } from "./types";

const STORAGE_KEY = "aula-practice-progress";
const MAX_RECORDS = 800;

export function loadProgress(): ProgressState {
  if (typeof window === "undefined") return { version: 1, records: [] };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { version: 1, records: [] };
    const parsed = JSON.parse(raw) as ProgressState;
    if (!parsed || !Array.isArray(parsed.records)) return { version: 1, records: [] };
    return { version: 1, records: parsed.records.slice(-MAX_RECORDS) };
  } catch {
    return { version: 1, records: [] };
  }
}

export function saveProgress(state: ProgressState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: 1, records: state.records.slice(-MAX_RECORDS) }),
    );
  } catch {
    /* storage full / private mode — practice still works, just not tracked */
  }
}

export function appendRecord(record: ProblemRecord): ProgressState {
  const state = loadProgress();
  state.records.push(record);
  saveProgress(state);
  return state;
}

export function resetProgress(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

/* ------------------------------------------------------------------ */
/* Derived statistics                                                  */
/* ------------------------------------------------------------------ */

export interface TopicStats {
  subject: Subject;
  topicId: string;
  attempts: number;
  firstTryCorrect: number;
  eventualCorrect: number;
  hintsUsed: number;
  revealedAnswers: number;
  solutionsViewed: number;
  lastTs: number;
}

export interface OverallStats {
  attempted: number;
  firstTryCorrect: number;
  eventualCorrect: number;
  hintsUsed: number;
  revealedAnswers: number;
  solutionsViewed: number;
  byTopic: Record<string, TopicStats>;
  recent: ProblemRecord[];
}

export const topicKey = (subject: Subject, topicId: string) => `${subject}:${topicId}`;

export function computeStats(state: ProgressState): OverallStats {
  const byTopic: Record<string, TopicStats> = {};
  for (const r of state.records) {
    const key = topicKey(r.subject, r.topicId);
    let s = byTopic[key];
    if (!s) {
      s = {
        subject: r.subject,
        topicId: r.topicId,
        attempts: 0,
        firstTryCorrect: 0,
        eventualCorrect: 0,
        hintsUsed: 0,
        revealedAnswers: 0,
        solutionsViewed: 0,
        lastTs: 0,
      };
      byTopic[key] = s;
    }
    s.attempts += 1;
    if (r.firstTryCorrect) s.firstTryCorrect += 1;
    if (r.eventualCorrect) s.eventualCorrect += 1;
    s.hintsUsed += r.hintsUsed;
    if (r.revealedAnswer) s.revealedAnswers += 1;
    if (r.revealedSolution) s.solutionsViewed += 1;
    s.lastTs = Math.max(s.lastTs, r.timestamp);
  }
  const attempted = state.records.length;
  const firstTryCorrect = state.records.filter((r) => r.firstTryCorrect).length;
  const eventualCorrect = state.records.filter((r) => r.eventualCorrect).length;
  const hintsUsed = state.records.reduce((a, r) => a + r.hintsUsed, 0);
  const revealedAnswers = state.records.filter((r) => r.revealedAnswer).length;
  const solutionsViewed = state.records.filter((r) => r.revealedSolution).length;
  return {
    attempted,
    firstTryCorrect,
    eventualCorrect,
    hintsUsed,
    revealedAnswers,
    solutionsViewed,
    byTopic,
    recent: [...state.records].reverse().slice(0, 12),
  };
}

/** difficulty distribution helper for topic cards */
export function difficultyCounts(
  records: ProblemRecord[],
): Record<Difficulty, number> {
  const out: Record<Difficulty, number> = { easy: 0, medium: 0, hard: 0, challenge: 0 };
  for (const r of records) out[r.difficulty] += 1;
  return out;
}
