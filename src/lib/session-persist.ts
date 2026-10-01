"use client";

/**
 * Session persistence — survives accidental refreshes (very common on
 * phones) by mirroring the running session to sessionStorage. Progress
 * records themselves live in localStorage (lib/progress.ts); this only
 * restores the in-flight deck and per-problem states.
 */

import type { Problem } from "./types";
import type { ProblemState } from "@/components/practice/state";

const KEY = "aula-session-v1";

export interface PersistedSession {
  configKey: string;
  index: number;
  ended: boolean;
  problems: Problem[];
  states: ProblemState[];
  /** true when this deck is a "review missed problems" retry */
  reviewing?: boolean;
}

function isProblemLike(v: unknown): v is Problem {
  if (!v || typeof v !== "object") return false;
  const p = v as Partial<Problem> & { statement?: { es?: unknown; en?: unknown } };
  return (
    typeof p.templateId === "string" &&
    typeof p.seed === "number" &&
    !!p.statement &&
    typeof p.statement.es === "string" &&
    typeof p.statement.en === "string" &&
    !!p.answer &&
    typeof p.answer.kind === "string"
  );
}

function isStateLike(v: unknown): v is ProblemState {
  if (!v || typeof v !== "object") return false;
  const s = v as Partial<ProblemState>;
  return (
    (s.status === "attempting" ||
      s.status === "correct" ||
      s.status === "revealed" ||
      s.status === "skipped") &&
    Array.isArray(s.attempts) &&
    typeof s.hintsRevealed === "number" &&
    typeof s.recorded === "boolean"
  );
}

/** Returns the stored session when it matches this exact config (same URL seed). */
export function loadSession(configKey: string): PersistedSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedSession;
    if (
      !parsed ||
      parsed.configKey !== configKey ||
      !Array.isArray(parsed.problems) ||
      !Array.isArray(parsed.states) ||
      parsed.problems.length === 0 ||
      parsed.problems.length !== parsed.states.length ||
      typeof parsed.index !== "number" ||
      parsed.index < 0 ||
      parsed.index >= parsed.problems.length ||
      !parsed.problems.every(isProblemLike) ||
      !parsed.states.every(isStateLike)
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function saveSession(session: PersistedSession): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(session));
  } catch {
    /* quota exceeded / private mode — practice still works, just not restored */
  }
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
