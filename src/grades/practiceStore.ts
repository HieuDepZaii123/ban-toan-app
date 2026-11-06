import { resolveDrillIndex } from "../lib/drillPlace.ts";

/** Tiến độ luyện lớp 1–9, tách khỏi đề THPT `ban-toan-shared-drill`. */
export const GRADE_PRACTICE_KEY = "ban-toan-lop-practice-v1";

export type GradePracticeBag = {
  picks: Record<string, number>;
  at: Record<string, string>;
};

export function emptyGradeBag(): GradePracticeBag {
  return { picks: {}, at: {} };
}

export function gradePickKey(grade: number, id: string): string {
  return `${grade}:${id}`;
}

export function parseGradeBag(raw: string | null): GradePracticeBag {
  if (!raw) return emptyGradeBag();
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return emptyGradeBag();
    const row = parsed as { picks?: unknown; at?: unknown };
    const picks: Record<string, number> = {};
    if (row.picks && typeof row.picks === "object") {
      for (const [key, value] of Object.entries(row.picks)) {
        if (typeof value === "number" && value >= 0 && value <= 3) picks[key] = value;
      }
    }
    const at: Record<string, string> = {};
    if (row.at && typeof row.at === "object") {
      for (const [key, value] of Object.entries(row.at)) {
        if (typeof value === "string") at[key] = value;
      }
    }
    return { picks, at };
  } catch {
    return emptyGradeBag();
  }
}

export function gradeIndex(ids: readonly string[], bag: GradePracticeBag, grade: number): number {
  return resolveDrillIndex(ids, 0, bag.at[String(grade)] ?? null);
}

export function rememberGrade(bag: GradePracticeBag, grade: number, id: string): GradePracticeBag {
  return { picks: bag.picks, at: { ...bag.at, [String(grade)]: id } };
}

export function answerGrade(bag: GradePracticeBag, grade: number, id: string, choice: number): GradePracticeBag {
  return {
    picks: { ...bag.picks, [gradePickKey(grade, id)]: choice },
    at: { ...bag.at, [String(grade)]: id },
  };
}
