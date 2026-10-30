import type { SharedQuestion } from "../content/sharedDrill.ts";

const PICK_KEY = "ban-toan-shared-drill";
const MISS_KEY = "ban-toan-misses";

export type MissRow = {
  id: string;
  topic: string;
  href: string;
  prompt: string;
  chosen: string;
  answer: string;
  steps: string[];
};

export function loadPicks(): Record<string, number> {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(PICK_KEY) || "{}");
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    const out: Record<string, number> = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (typeof value === "number" && value >= 0 && value <= 3) out[key] = value;
    }
    return out;
  } catch {
    return {};
  }
}

export function savePicks(picks: Record<string, number>): void {
  try { localStorage.setItem(PICK_KEY, JSON.stringify(picks)); } catch { /* ignore */ }
}

export function loadMisses(): MissRow[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(MISS_KEY) || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.flatMap((item) => {
      if (!item || typeof item !== "object") return [];
      const row = item as MissRow;
      if (typeof row.id !== "string" || typeof row.prompt !== "string" || !Array.isArray(row.steps)) return [];
      return [row];
    });
  } catch {
    return [];
  }
}

export function writeMisses(rows: MissRow[]): void {
  try { localStorage.setItem(MISS_KEY, JSON.stringify(rows)); } catch { /* ignore */ }
}

export function withPick(rows: MissRow[], question: SharedQuestion, choice: number): MissRow[] {
  const rest = rows.filter((row) => row.id !== question.id);
  if (choice === question.answer) return rest;
  return [
    ...rest,
    {
      id: question.id,
      topic: question.topic,
      href: question.href,
      prompt: question.prompt,
      chosen: question.choices[choice] ?? "",
      answer: question.choices[question.answer],
      steps: question.steps,
    },
  ];
}

export function withoutMiss(rows: MissRow[], id: string): MissRow[] {
  return rows.filter((row) => row.id !== id);
}
