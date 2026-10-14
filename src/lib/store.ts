import { useSyncExternalStore } from "react";
import { snap } from "./format.ts";
import type { Range } from "../content/params.ts";

export type ThemeName = "paper" | "night";
export type LangName = "vi" | "en";

export type ThinkFlags = { nhin: boolean; lam: boolean; ket: boolean };

export type Data = {
  v: 1;
  theme: ThemeName;
  lang: LangName;
  lastId: string | null;
  notes: Record<string, string>;
  right: Record<string, true>;
  wrong: Record<string, number>;
  think: Record<string, ThinkFlags>;
  params: Record<string, Record<string, number>>;
};

const KEY = "ban-toan";
export const EMPTY_THINK: ThinkFlags = { nhin: false, lam: false, ket: false };

function preferredTheme(): ThemeName {
  if (typeof window === "undefined") return "paper";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "paper";
}

function blank(): Data {
  return {
    v: 1,
    theme: preferredTheme(),
    lang: "vi",
    lastId: null,
    notes: {},
    right: {},
    wrong: {},
    think: {},
    params: {},
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function load(): Data {
  const base = blank();
  if (typeof localStorage === "undefined") return base;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return base;
    const parsed = JSON.parse(raw) as Partial<Data>;
    if (parsed.v !== 1) return base;
    return {
      ...base,
      theme: parsed.theme === "night" || parsed.theme === "paper" ? parsed.theme : base.theme,
      lang: parsed.lang === "en" ? "en" : "vi",
      lastId: typeof parsed.lastId === "string" ? parsed.lastId : null,
      notes: isRecord(parsed.notes) ? (parsed.notes as Record<string, string>) : {},
      right: isRecord(parsed.right) ? (parsed.right as Record<string, true>) : {},
      wrong: isRecord(parsed.wrong) ? (parsed.wrong as Record<string, number>) : {},
      think: isRecord(parsed.think) ? (parsed.think as Record<string, ThinkFlags>) : {},
      params: isRecord(parsed.params) ? (parsed.params as Record<string, Record<string, number>>) : {},
    };
  } catch {
    return base;
  }
}

let data = load();
let timer = 0;
const listeners = new Set<() => void>();

function saveNow(): void {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* private mode or a full disk: the desk still works for this visit */
  }
}

function scheduleSave(): void {
  if (typeof window === "undefined") return;
  window.clearTimeout(timer);
  timer = window.setTimeout(saveNow, 200);
}

function commit(next: Data): void {
  data = next;
  scheduleSave();
  for (const listener of listeners) listener();
}

export function getData(): Data {
  return data;
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useSlice<T>(select: (value: Data) => T): T {
  return useSyncExternalStore(subscribe, () => select(getData()), () => select(getData()));
}

if (typeof window !== "undefined") {
  window.addEventListener("pagehide", saveNow);
}

export function setTheme(theme: ThemeName): void {
  if (data.theme === theme) return;
  commit({ ...data, theme });
}

export function setLang(lang: LangName): void {
  if (data.lang === lang) return;
  commit({ ...data, lang });
}

export function setLast(id: string): void {
  if (data.lastId === id) return;
  commit({ ...data, lastId: id });
}

export function setNote(id: string, note: string): void {
  if (data.notes[id] === note) return;
  commit({ ...data, notes: { ...data.notes, [id]: note } });
}

export function questionKey(topicId: string, questionId: string): string {
  return `${topicId}:${questionId}`;
}

export function recordAnswer(topicId: string, questionId: string, choice: number, correct: boolean): void {
  const key = questionKey(topicId, questionId);
  if (correct) {
    if (data.right[key] && !(key in data.wrong)) return;
    const wrong = { ...data.wrong };
    delete wrong[key];
    commit({ ...data, right: { ...data.right, [key]: true }, wrong });
    return;
  }
  if (data.wrong[key] === choice && !(key in data.right)) return;
  const right = { ...data.right };
  delete right[key];
  commit({ ...data, right, wrong: { ...data.wrong, [key]: choice } });
}

export function dismissWrong(key: string): void {
  if (!(key in data.wrong)) return;
  const wrong = { ...data.wrong };
  delete wrong[key];
  commit({ ...data, wrong });
}

export function toggleThink(id: string, flag: keyof ThinkFlags): void {
  const current = data.think[id] ?? EMPTY_THINK;
  const next = { ...current, [flag]: !current[flag] };
  commit({ ...data, think: { ...data.think, [id]: next } });
}

export function writeParams(id: string, params: Record<string, number>): void {
  const prev = data.params[id];
  if (prev && sameParams(prev, params)) return;
  commit({ ...data, params: { ...data.params, [id]: params } });
}

function sameParams(a: Record<string, number>, b: Record<string, number>): boolean {
  const keys = Object.keys(b);
  if (keys.length !== Object.keys(a).length) return false;
  return keys.every((key) => a[key] === b[key]);
}

export function readParams(id: string, initial: Record<string, number>, ranges: Range): Record<string, number> {
  const saved = getData().params[id];
  const out = { ...initial };
  for (const key of Object.keys(initial)) {
    const range = ranges[key];
    const raw = saved?.[key];
    if (!range || typeof raw !== "number" || !Number.isFinite(raw)) continue;
    out[key] = snap(raw, range[2], range[0], range[1]);
  }
  return out;
}

export function countRight(right: Record<string, true>, topicId?: string): number {
  const prefix = topicId ? `${topicId}:` : "";
  let count = 0;
  for (const key of Object.keys(right)) {
    if (!prefix || key.startsWith(prefix)) count += 1;
  }
  return count;
}
