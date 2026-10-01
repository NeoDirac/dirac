/**
 * Anonymous progress tracking — everything lives in localStorage.
 * No accounts, no server calls. The shape is forward-compatible with a future
 * backend sync (records are self-contained events).
 */

import { clearReview } from "./review";
import type {
  Difficulty,
  ProblemRecord,
  ProgressState,
  SessionLogState,
  SessionRecord,
  Subject,
} from "./types";

const STORAGE_KEY = "aula-practice-progress";
const SESSIONS_KEY = "aula-practice-sessions";
const MAX_RECORDS = 800;
const MAX_SESSIONS = 40;

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
    window.localStorage.removeItem(SESSIONS_KEY);
    clearReview();
  } catch {
    /* ignore */
  }
}

/* ------------------------------------------------------------------ */
/* Session log (one entry per finished session)                       */
/* ------------------------------------------------------------------ */

export function loadSessions(): SessionLogState {
  if (typeof window === "undefined") return { version: 1, sessions: [] };
  try {
    const raw = window.localStorage.getItem(SESSIONS_KEY);
    if (!raw) return { version: 1, sessions: [] };
    const parsed = JSON.parse(raw) as SessionLogState;
    if (!parsed || !Array.isArray(parsed.sessions)) return { version: 1, sessions: [] };
    return { version: 1, sessions: parsed.sessions.slice(-MAX_SESSIONS) };
  } catch {
    return { version: 1, sessions: [] };
  }
}

export function appendSessionRecord(record: SessionRecord): SessionLogState {
  const state = loadSessions();
  state.sessions.push(record);
  try {
    window.localStorage.setItem(
      SESSIONS_KEY,
      JSON.stringify({ version: 1, sessions: state.sessions.slice(-MAX_SESSIONS) }),
    );
  } catch {
    /* storage full / private mode — practice still works */
  }
  return state;
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
  /** total seconds across stamped records (0 when nothing was timed) */
  timeSec: number;
  /** how many records carried a time stamp */
  timedRecords: number;
}

export interface OverallStats {
  attempted: number;
  firstTryCorrect: number;
  eventualCorrect: number;
  hintsUsed: number;
  revealedAnswers: number;
  solutionsViewed: number;
  /** total stamped seconds across all records */
  timeSec: number;
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
        timeSec: 0,
        timedRecords: 0,
      };
      byTopic[key] = s;
    }
    s.attempts += 1;
    if (r.firstTryCorrect) s.firstTryCorrect += 1;
    if (r.eventualCorrect) s.eventualCorrect += 1;
    s.hintsUsed += r.hintsUsed;
    if (r.revealedAnswer) s.revealedAnswers += 1;
    if (r.revealedSolution) s.solutionsViewed += 1;
    if (typeof r.timeSec === "number" && r.timeSec > 0) {
      s.timeSec += r.timeSec;
      s.timedRecords += 1;
    }
    s.lastTs = Math.max(s.lastTs, r.timestamp);
  }
  const attempted = state.records.length;
  const firstTryCorrect = state.records.filter((r) => r.firstTryCorrect).length;
  const eventualCorrect = state.records.filter((r) => r.eventualCorrect).length;
  const hintsUsed = state.records.reduce((a, r) => a + r.hintsUsed, 0);
  const revealedAnswers = state.records.filter((r) => r.revealedAnswer).length;
  const solutionsViewed = state.records.filter((r) => r.revealedSolution).length;
  const timeSec = state.records.reduce(
    (a, r) => a + (typeof r.timeSec === "number" ? r.timeSec : 0),
    0,
  );
  return {
    attempted,
    firstTryCorrect,
    eventualCorrect,
    hintsUsed,
    revealedAnswers,
    solutionsViewed,
    timeSec,
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
