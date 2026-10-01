/**
 * CSV export of anonymous progress data — tutor-facing analytics without a
 * backend. Builds RFC-4180 documents from the localStorage records and
 * session log, with the UTF-8 BOM so Excel opens Spanish accents correctly.
 */

import { loadProgress, loadSessions } from "./progress";
import { mathCurriculum } from "@/content/curriculum/math";
import { physicsCurriculum } from "@/content/curriculum/physics";
import type { Subject } from "./types";
import { toCsv, downloadTextFile } from "./utils";

function topicName(subject: Subject, topicId: string): string {
  const cur = subject === "math" ? mathCurriculum : physicsCurriculum;
  return cur.find((tp) => tp.id === topicId)?.name.en ?? topicId;
}

function stamp(ms: number): string {
  return new Date(ms).toISOString();
}

/** One row per attempted problem — the atomic history. */
export function buildRecordsCsv(): string {
  const records = loadProgress().records;
  const rows: (string | number | boolean | null | undefined)[][] = [
    [
      "date",
      "subject",
      "topic",
      "topic_id",
      "subtopic_id",
      "difficulty",
      "template",
      "seed",
      "attempts",
      "first_try_correct",
      "eventually_correct",
      "hints_used",
      "answer_revealed",
      "solution_viewed",
      "time_sec",
    ],
  ];
  for (const r of records) {
    rows.push([
      stamp(r.timestamp),
      r.subject,
      topicName(r.subject, r.topicId),
      r.topicId,
      r.subtopicId,
      r.difficulty,
      r.templateId,
      r.seed,
      r.attempts,
      r.firstTryCorrect,
      r.eventualCorrect,
      r.hintsUsed,
      r.revealedAnswer,
      r.revealedSolution,
      r.timeSec ?? "",
    ]);
  }
  return toCsv(rows);
}

/** One row per finished session — the coarse-grained view. */
export function buildSessionsCsv(): string {
  const sessions = loadSessions().sessions;
  const rows: (string | number | boolean | null | undefined)[][] = [
    [
      "ended_at",
      "mode",
      "subjects",
      "topic",
      "topic_id",
      "subtopic_id",
      "review",
      "problems",
      "attempted",
      "solved",
      "first_try_correct",
      "hints_used",
      "elapsed_sec",
    ],
  ];
  for (const s of sessions) {
    rows.push([
      stamp(s.endedAt),
      s.mode,
      s.subjects.join("+"),
      s.topicId && s.subjects.length === 1 ? topicName(s.subjects[0], s.topicId) : "",
      s.topicId ?? "",
      s.subtopicId ?? "",
      s.review,
      s.problems,
      s.attempted,
      s.solved,
      s.firstTryCorrect,
      s.hintsUsed,
      s.elapsedSec ?? "",
    ]);
  }
  return toCsv(rows);
}

function fileStamp(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}`;
}

export function downloadRecordsCsv(): void {
  downloadTextFile(`profe-dirac-problems-${fileStamp()}.csv`, buildRecordsCsv());
}

export function downloadSessionsCsv(): void {
  downloadTextFile(`profe-dirac-sessions-${fileStamp()}.csv`, buildSessionsCsv());
}
