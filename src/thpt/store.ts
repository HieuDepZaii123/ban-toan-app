/**
 * Tiến độ luyện THPT: câu đã chọn, bài thi thử đang làm, lịch sử thi.
 * Khóa riêng, không đụng tiến độ luyện lớp 1–9 hay đề luyện chung.
 */
import { mulberry32 } from "../lib/prng.ts";

export const THPT_KEY = "ban-toan-thpt-v1";
export const EXAM_SIZES = [10, 20, 30, 40] as const;
export const EXAM_MINUTES = [0, 15, 30, 45, 60] as const;
const HISTORY = 20;

export type ExamRecord = {
  at: string;
  grades: number[];
  total: number;
  right: number;
  seconds: number;
  limit: number;
};

export type Exam = {
  ids: string[];
  answers: Record<string, number>;
  startedAt: number;
  limit: number;
  grades: number[];
};

export type FinishedExam = Exam & { record: ExamRecord };

export type ThptBag = {
  picks: Record<string, number>;
  at: string | null;
  grades: number[];
  topics: string[];
  active: Exam | null;
  last: FinishedExam | null;
  exams: ExamRecord[];
};

export type Scored = { id: string; answer: number; topic: string };

export function emptyThptBag(): ThptBag {
  return { picks: {}, at: null, grades: [10, 11, 12], topics: [], active: null, last: null, exams: [] };
}

const isChoice = (value: unknown): value is number => typeof value === "number" && Number.isInteger(value) && value >= 0 && value <= 3;
const isRecord = (value: unknown): value is Record<string, unknown> => !!value && typeof value === "object" && !Array.isArray(value);

function choices(value: unknown): Record<string, number> {
  const out: Record<string, number> = {};
  if (isRecord(value)) for (const [key, item] of Object.entries(value)) if (isChoice(item)) out[key] = item;
  return out;
}

function grades(value: unknown): number[] {
  return Array.isArray(value) ? value.filter((item): item is number => item === 10 || item === 11 || item === 12) : [];
}

function record(value: unknown): ExamRecord | null {
  if (!isRecord(value)) return null;
  const { at, total, right, seconds, limit } = value;
  if (typeof at !== "string" || typeof total !== "number" || typeof right !== "number" || typeof seconds !== "number" || typeof limit !== "number") return null;
  return { at, grades: grades(value.grades), total, right, seconds, limit };
}

function exam(value: unknown): Exam | null {
  if (!isRecord(value) || !Array.isArray(value.ids) || typeof value.startedAt !== "number" || typeof value.limit !== "number") return null;
  const ids = value.ids.filter((item): item is string => typeof item === "string");
  if (ids.length === 0) return null;
  return { ids, answers: choices(value.answers), startedAt: value.startedAt, limit: value.limit, grades: grades(value.grades) };
}

export function parseThptBag(raw: string | null): ThptBag {
  const bag = emptyThptBag();
  if (!raw) return bag;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) return bag;
    const picked = grades(parsed.grades);
    const last = exam(parsed.last);
    const lastRecord = isRecord(parsed.last) ? record(parsed.last.record) : null;
    return {
      picks: choices(parsed.picks),
      at: typeof parsed.at === "string" ? parsed.at : null,
      grades: picked.length ? picked : bag.grades,
      topics: Array.isArray(parsed.topics) ? parsed.topics.filter((item): item is string => typeof item === "string") : [],
      active: exam(parsed.active),
      last: last && lastRecord ? { ...last, record: lastRecord } : null,
      exams: Array.isArray(parsed.exams) ? parsed.exams.map(record).filter((item): item is ExamRecord => item !== null).slice(0, HISTORY) : [],
    };
  } catch {
    return bag;
  }
}

export function answerPractice(bag: ThptBag, id: string, choice: number): ThptBag {
  return { ...bag, picks: { ...bag.picks, [id]: choice }, at: id };
}

export function setScope(bag: ThptBag, nextGrades: number[], topics: string[]): ThptBag {
  return { ...bag, grades: nextGrades, topics };
}

/** Xóa kết quả luyện tập và lịch sử thi; giữ phạm vi đã chọn. */
export function resetProgress(bag: ThptBag): ThptBag {
  return { ...emptyThptBag(), grades: bag.grades, topics: bag.topics };
}

/**
 * Chọn `size` câu cho đề thi thử, rải đều các chủ đề: xáo từng chủ đề theo `seed`,
 * rồi lấy lần lượt mỗi chủ đề một câu cho tới khi đủ.
 */
export function pickExam(pool: readonly Scored[], size: number, seed: number): string[] {
  const rand = mulberry32(seed);
  const shuffle = <T>(items: T[]): T[] => {
    for (let i = items.length - 1; i > 0; i -= 1) {
      const j = Math.floor(rand() * (i + 1));
      [items[i], items[j]] = [items[j] as T, items[i] as T];
    }
    return items;
  };
  const byTopic = new Map<string, string[]>();
  for (const item of pool) byTopic.set(item.topic, [...(byTopic.get(item.topic) ?? []), item.id]);
  const queues = shuffle([...byTopic.values()].map((ids) => shuffle([...ids])));
  const out: string[] = [];
  while (out.length < size && queues.some((queue) => queue.length > 0)) {
    for (const queue of queues) {
      const next = queue.shift();
      if (next !== undefined && out.length < size) out.push(next);
    }
  }
  return shuffle(out);
}

export function startExam(bag: ThptBag, ids: string[], limit: number, examGrades: number[], now: number): ThptBag {
  return { ...bag, active: { ids, answers: {}, startedAt: now, limit, grades: examGrades } };
}

export function answerExam(bag: ThptBag, id: string, choice: number): ThptBag {
  if (!bag.active || !bag.active.ids.includes(id)) return bag;
  return { ...bag, active: { ...bag.active, answers: { ...bag.active.answers, [id]: choice } } };
}

export function cancelExam(bag: ThptBag): ThptBag {
  return { ...bag, active: null };
}

/** Giây còn lại; `null` khi thi không giới hạn thời gian. */
export function secondsLeft(active: Exam, now: number): number | null {
  if (active.limit <= 0) return null;
  return Math.max(0, Math.ceil(active.limit * 60 - (now - active.startedAt) / 1000));
}

/** Nộp bài: chấm điểm, lưu lịch sử, và ghi các câu đã làm vào tiến độ luyện tập. */
export function finishExam(bag: ThptBag, answerOf: (id: string) => number | undefined, now: number): ThptBag {
  const active = bag.active;
  if (!active) return bag;
  const right = active.ids.filter((id) => active.answers[id] !== undefined && active.answers[id] === answerOf(id)).length;
  const elapsed = Math.round((now - active.startedAt) / 1000);
  const seconds = active.limit > 0 ? Math.min(elapsed, active.limit * 60) : elapsed;
  const result: ExamRecord = { at: new Date(now).toISOString(), grades: active.grades, total: active.ids.length, right, seconds, limit: active.limit };
  return {
    ...bag,
    picks: { ...bag.picks, ...active.answers },
    active: null,
    last: { ...active, record: result },
    exams: [result, ...bag.exams].slice(0, HISTORY),
  };
}

/** Điểm thang 10, làm tròn tới 0,25 như đề trắc nghiệm. */
export function scoreOf10(right: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((right / total) * 40) / 4;
}

export type Tally = { total: number; done: number; right: number };

export function tally(items: readonly Scored[], picks: Record<string, number>): Tally {
  let done = 0;
  let right = 0;
  for (const item of items) {
    const pick = picks[item.id];
    if (pick === undefined) continue;
    done += 1;
    if (pick === item.answer) right += 1;
  }
  return { total: items.length, done, right };
}

export function tallyBy<K>(items: readonly Scored[], picks: Record<string, number>, keyOf: (item: Scored) => K): Map<K, Tally> {
  const groups = new Map<K, Scored[]>();
  for (const item of items) groups.set(keyOf(item), [...(groups.get(keyOf(item)) ?? []), item]);
  return new Map([...groups].map(([key, group]) => [key, tally(group, picks)]));
}

export function wrongIds(items: readonly Scored[], picks: Record<string, number>): string[] {
  return items.filter((item) => picks[item.id] !== undefined && picks[item.id] !== item.answer).map((item) => item.id);
}

export function freshIds(items: readonly Scored[], picks: Record<string, number>): string[] {
  return items.filter((item) => picks[item.id] === undefined).map((item) => item.id);
}
