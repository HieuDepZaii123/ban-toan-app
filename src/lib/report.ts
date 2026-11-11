import { readDone } from "../grades/progress.ts";
import { readPref } from "../ui/prefs.ts";
import { loadMisses } from "./missBook.ts";
import type { Report } from "./reportCode.ts";
import { getData } from "./store.ts";
import { dayKey, lastDays, readTime, streak } from "./studyTime.ts";
import { activeProfileName } from "./userData.ts";

function examHistory(): { at: number; total: number }[] {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem("ban-toan-thi2025-v1") || "null");
    const history = raw && typeof raw === "object" ? (raw as { history?: unknown }).history : null;
    if (!Array.isArray(history)) return [];
    return history
      .flatMap((item) => {
        if (!item || typeof item !== "object") return [];
        const row = item as { at?: unknown; total?: unknown };
        return typeof row.at === "number" && typeof row.total === "number" ? [{ at: row.at, total: row.total }] : [];
      })
      .sort((a, b) => b.at - a.at)
      .slice(0, 3);
  } catch {
    return [];
  }
}

/** Gom tiến độ của hồ sơ đang mở thành một phiếu. Chỉ đọc dữ liệu trên máy này. */
export function buildReport(): Report {
  const book = readTime();
  const data = getData();
  const lessons: Record<string, number> = {};
  for (const id of readDone()) {
    const grade = id.split("/")[0] ?? "";
    if (/^\d{1,2}$/.test(grade)) lessons[grade] = (lessons[grade] ?? 0) + 1;
  }
  const topics: Record<string, number> = {};
  for (const key of Object.keys(data.right)) {
    const topic = key.split(":")[0] ?? "";
    if (/^[a-z]{2,16}$/.test(topic)) topics[topic] = (topics[topic] ?? 0) + 1;
  }
  return {
    name: activeProfileName(),
    grade: readPref("bt-grade"),
    made: dayKey(),
    days: lastDays(7, book).map((item) => ({ day: item.day, minutes: Math.round(item.seconds / 60) })),
    streak: streak(book),
    lessons,
    topics,
    exams: examHistory(),
    misses: loadMisses().length + Object.keys(data.wrong).length,
  };
}
