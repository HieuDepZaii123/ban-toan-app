import type { StudyLog } from "../lib/store.ts";

export const STUDY_ROWS = 5;

export function studyDone(log: StudyLog | undefined): boolean {
  if (!log?.revealed) return false;
  if (log.conclusion.trim().length === 0) return false;
  return log.rows.length >= STUDY_ROWS;
}
