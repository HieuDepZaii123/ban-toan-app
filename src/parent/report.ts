/**
 * The weekly progress report a child shares with a parent by link.
 * Everything is built on the child's device from data already stored there, and the report travels
 * in the link's #fragment, which browsers never send to the server. Bàn Toán stores no copy.
 */

/** Where the mock-exam page keeps its history (src/pages/ExamPage.tsx). */
export const EXAM_KEY = "ban-toan-thi2025-v1";
/** Where the marking page logs each result (src/check/CheckPage.tsx). */
export const CHECK_LOG_KEY = "ban-toan-checks";
const CHECK_LOG_MAX = 200;
const WEEK_MS = 7 * 86_400_000;

export type ExamRow = { at: number; total: number };
export type CheckRow = { at: number; key: string; verdict: "ok" | "wrong" | "unclear"; step: number | null };

export type Report = {
  v: 1;
  from: number;
  to: number;
  /** Mock papers finished in the week, oldest first. */
  papers: ExamRow[];
  /** Markings in the week. */
  checks: number;
  /** Markings that found a wrong step. */
  wrong: number;
  /** Problems that were marked wrong and later marked right. */
  fixed: number;
  /** Was parent mode on for the whole week? */
  parent: boolean;
};

const isObj = (value: unknown): value is Record<string, unknown> => !!value && typeof value === "object" && !Array.isArray(value);

/** A short, stable key for a problem so a later re-check of the same problem can count as a fix. */
export function problemKey(problem: string): string {
  const text = problem.normalize("NFC").toLowerCase().replace(/\s+/g, " ").trim();
  let hash = 0x811c9dc5;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash.toString(36);
}

export function readExamRows(raw: string | null): ExamRow[] {
  try {
    const parsed: unknown = JSON.parse(raw || "null");
    if (!isObj(parsed) || !Array.isArray(parsed.history)) return [];
    return parsed.history
      .filter((row): row is ExamRow => isObj(row) && typeof row.at === "number" && typeof row.total === "number")
      .map((row) => ({ at: row.at, total: row.total }));
  } catch {
    return [];
  }
}

export function readCheckRows(raw: string | null): CheckRow[] {
  try {
    const parsed: unknown = JSON.parse(raw || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((row): row is CheckRow =>
      isObj(row) && typeof row.at === "number" && typeof row.key === "string"
      && (row.verdict === "ok" || row.verdict === "wrong" || row.verdict === "unclear")
      && (row.step === null || typeof row.step === "number"));
  } catch {
    return [];
  }
}

export function appendCheck(rows: CheckRow[], row: CheckRow): CheckRow[] {
  return [...rows, row].slice(-CHECK_LOG_MAX);
}

export function buildReport(input: { now: number; exams: ExamRow[]; checks: CheckRow[]; parentSince: number | null }): Report {
  const from = input.now - WEEK_MS;
  const inWeek = <T extends { at: number }>(row: T) => row.at > from && row.at <= input.now;
  const papers = input.exams.filter(inWeek).sort((a, b) => a.at - b.at);
  const checks = input.checks.filter(inWeek).sort((a, b) => a.at - b.at);
  const wrongAt = new Map<string, number>();
  const fixed = new Set<string>();
  for (const row of checks) {
    if (row.verdict === "wrong" && !wrongAt.has(row.key)) wrongAt.set(row.key, row.at);
    if (row.verdict === "ok" && wrongAt.has(row.key)) fixed.add(row.key);
  }
  return {
    v: 1,
    from,
    to: input.now,
    papers,
    checks: checks.length,
    wrong: checks.filter((row) => row.verdict === "wrong").length,
    fixed: fixed.size,
    parent: input.parentSince !== null && input.parentSince <= from,
  };
}

function toBase64Url(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(text: string): string {
  const binary = atob(text.replace(/-/g, "+").replace(/_/g, "/"));
  return new TextDecoder().decode(Uint8Array.from(binary, (ch) => ch.charCodeAt(0)));
}

export function encodeReport(report: Report): string {
  return toBase64Url(JSON.stringify(report));
}

const count = (value: unknown) => typeof value === "number" && Number.isInteger(value) && value >= 0 && value <= 10_000;

export function decodeReport(code: string): Report | null {
  try {
    const raw: unknown = JSON.parse(fromBase64Url(code));
    if (!isObj(raw) || raw.v !== 1) return null;
    if (typeof raw.from !== "number" || typeof raw.to !== "number" || raw.to < raw.from) return null;
    if (!count(raw.checks) || !count(raw.wrong) || !count(raw.fixed) || typeof raw.parent !== "boolean") return null;
    if (!Array.isArray(raw.papers) || raw.papers.length > 100) return null;
    const papers: ExamRow[] = [];
    for (const row of raw.papers) {
      if (!isObj(row) || typeof row.at !== "number" || typeof row.total !== "number" || row.total < 0 || row.total > 10) return null;
      papers.push({ at: row.at, total: row.total });
    }
    return { v: 1, from: raw.from, to: raw.to, papers, checks: raw.checks as number, wrong: raw.wrong as number, fixed: raw.fixed as number, parent: raw.parent };
  } catch {
    return null;
  }
}

/** The report from the data on this device. */
export function reportFromDevice(now: number, parentSince: number | null): Report {
  let exams: string | null = null;
  let checks: string | null = null;
  try {
    exams = localStorage.getItem(EXAM_KEY);
    checks = localStorage.getItem(CHECK_LOG_KEY);
  } catch {
    /* storage blocked: an empty report */
  }
  return buildReport({ now, exams: readExamRows(exams), checks: readCheckRows(checks), parentSince });
}

export function logCheck(row: CheckRow): void {
  try {
    const next = appendCheck(readCheckRows(localStorage.getItem(CHECK_LOG_KEY)), row);
    localStorage.setItem(CHECK_LOG_KEY, JSON.stringify(next));
  } catch {
    /* storage full or blocked: the marking still shows */
  }
}
