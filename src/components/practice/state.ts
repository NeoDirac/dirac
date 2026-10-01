"use client";

import type { CheckOutcome } from "@/lib/validation/answer";

export type ProblemStatus = "attempting" | "correct" | "revealed" | "skipped";

export interface ProblemState {
  status: ProblemStatus;
  attempts: { correct: boolean }[];
  hintsRevealed: number;
  answerRevealed: boolean;
  solutionRevealed: boolean;
  recorded: boolean;
  lastOutcome: CheckOutcome | null;
}

export const initialProblemState: ProblemState = {
  status: "attempting",
  attempts: [],
  hintsRevealed: 0,
  answerRevealed: false,
  solutionRevealed: false,
  recorded: false,
  lastOutcome: null,
};

export function isResolved(state: ProblemState): boolean {
  return state.status !== "attempting";
}
