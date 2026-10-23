import { useSyncExternalStore } from "react";
import { snap } from "./format.ts";
import type { Range } from "../content/params.ts";

export type ThemeName = "paper" | "night";
export type LangName = "vi" | "en";

export type ThinkFlags = { nhin: boolean; lam: boolean; ket: boolean };

export type Stamps = {
  theme: number;
  lang: number;
  lastId: number;
  notes: Record<string, number>;
  right: Record<string, number>;
  wrong: Record<string, number>;
  think: Record<string, number>;
  params: Record<string, number>;
};

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
  /** Per-key edit times. A missing stamp means 0, so an older snapshot still loads. */
  at: Stamps;
};

const KEY = "ban-toan";
export const EMPTY_THINK: ThinkFlags = { nhin: false, lam: false, ket: false };

function preferredTheme(): ThemeName {
  if (typeof window === "undefined") return "paper";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "paper";
}

function emptyAt(): Stamps {
  return { theme: 0, lang: 0, lastId: 0, notes: {}, right: {}, wrong: {}, think: {}, params: {} };
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
    at: emptyAt(),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringMap(value: unknown): Record<string, string> {
  if (!isRecord(value)) return {};
  const out: Record<string, string> = {};
  for (const [key, item] of Object.entries(value)) {
    if (typeof item === "string") out[key] = item;
  }
  return out;
}

function wrongMap(value: unknown): Record<string, number> {
  if (!isRecord(value)) return {};
  const out: Record<string, number> = {};
  for (const [key, item] of Object.entries(value)) {
    if (typeof item === "number" && Number.isFinite(item)) out[key] = item;
  }
  return out;
}

function thinkMap(value: unknown): Record<string, ThinkFlags> {
  if (!isRecord(value)) return {};
  const out: Record<string, ThinkFlags> = {};
  for (const [key, item] of Object.entries(value)) {
    if (!isRecord(item)) continue;
    if (typeof item.nhin !== "boolean" || typeof item.lam !== "boolean" || typeof item.ket !== "boolean") continue;
    out[key] = { nhin: item.nhin, lam: item.lam, ket: item.ket };
  }
  return out;
}

function rightMap(value: unknown): Record<string, true> {
  if (!isRecord(value)) return {};
  const out: Record<string, true> = {};
  for (const [key, item] of Object.entries(value)) {
    if (item === true) out[key] = true;
  }
  return out;
}

function stampMap(value: unknown): Record<string, number> {
  if (!isRecord(value)) return {};
  const out: Record<string, number> = {};
  for (const [key, item] of Object.entries(value)) {
    if (typeof item === "number" && Number.isFinite(item)) out[key] = item;
  }
  return out;
}

function loadAt(value: unknown): Stamps {
  const empty = emptyAt();
  if (!isRecord(value)) return empty;
  return {
    theme: typeof value.theme === "number" && Number.isFinite(value.theme) ? value.theme : 0,
    lang: typeof value.lang === "number" && Number.isFinite(value.lang) ? value.lang : 0,
    lastId: typeof value.lastId === "number" && Number.isFinite(value.lastId) ? value.lastId : 0,
    notes: stampMap(value.notes),
    right: stampMap(value.right),
    wrong: stampMap(value.wrong),
    think: stampMap(value.think),
    params: stampMap(value.params),
  };
}

function paramsMap(value: unknown): Record<string, Record<string, number>> {
  if (!isRecord(value)) return {};
  const out: Record<string, Record<string, number>> = {};
  for (const [key, item] of Object.entries(value)) {
    if (!isRecord(item)) continue;
    const row: Record<string, number> = {};
    for (const [name, num] of Object.entries(item)) {
      if (typeof num === "number" && Number.isFinite(num)) row[name] = num;
    }
    out[key] = row;
  }
  return out;
}

/** Parse one stored snapshot. Corrupt JSON, a bad version, or a mistyped field is dropped. */
export function load(raw: string | null): Data {
  const base = blank();
  if (!raw) return base;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed) || parsed.v !== 1) return base;
    return {
      ...base,
      theme: parsed.theme === "night" || parsed.theme === "paper" ? parsed.theme : base.theme,
      lang: parsed.lang === "en" ? "en" : "vi",
      lastId: typeof parsed.lastId === "string" ? parsed.lastId : null,
      notes: stringMap(parsed.notes),
      right: rightMap(parsed.right),
      wrong: wrongMap(parsed.wrong),
      think: thinkMap(parsed.think),
      params: paramsMap(parsed.params),
      at: loadAt(parsed.at),
    };
  } catch {
    return base;
  }
}

function readStorage(): string | null {
  if (typeof localStorage === "undefined") return null;
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

let data = load(readStorage());
/** Last snapshot incorporated into this tab. Pending edits are the diff against it. */
let baseData: Data = structuredClone(data);
/** Last raw snapshot this tab loaded or wrote. A different disk value means another tab wrote. */
let baseline = readStorage();
let timer = 0;
const listeners = new Set<() => void>();

function notify(): void {
  for (const listener of listeners) listener();
}

function stable(value: unknown): string {
  if (value === undefined) return "u";
  if (value === null || typeof value !== "object") return JSON.stringify(value) ?? "u";
  if (Array.isArray(value)) return `[${value.map((item) => stable(item)).join(",")}]`;
  const obj = value as Record<string, unknown>;
  return `{${Object.keys(obj).sort().map((key) => `${JSON.stringify(key)}:${stable(obj[key])}`).join(",")}}`;
}

function owns(obj: object, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function pickValue<T>(base: T | undefined, local: T | undefined, disk: T | undefined, baseAt: number, localAt: number, diskAt: number): { value: T | undefined; at: number } {
  const localChanged = stable(local) !== stable(base);
  const diskChanged = stable(disk) !== stable(base);
  if (localChanged && diskChanged) {
    if (diskAt > localAt) return { value: disk, at: diskAt };
    return { value: local, at: localAt };
  }
  if (localChanged) return { value: local, at: localAt };
  if (diskChanged) return { value: disk, at: diskAt };
  return { value: local, at: Math.max(baseAt, localAt, diskAt) };
}

function mergeMap<T>(
  base: Record<string, T>,
  local: Record<string, T>,
  disk: Record<string, T>,
  baseAt: Record<string, number>,
  localAt: Record<string, number>,
  diskAt: Record<string, number>,
): { value: Record<string, T>; at: Record<string, number> } {
  const keys = new Set([...Object.keys(base), ...Object.keys(local), ...Object.keys(disk), ...Object.keys(baseAt), ...Object.keys(localAt), ...Object.keys(diskAt)]);
  const value: Record<string, T> = {};
  const at: Record<string, number> = {};
  for (const key of keys) {
    const picked = pickValue(
      owns(base, key) ? base[key] : undefined,
      owns(local, key) ? local[key] : undefined,
      owns(disk, key) ? disk[key] : undefined,
      baseAt[key] ?? 0,
      localAt[key] ?? 0,
      diskAt[key] ?? 0,
    );
    if (picked.value !== undefined) value[key] = picked.value;
    if (picked.at !== 0) at[key] = picked.at;
  }
  return { value, at };
}

/** Disk wins where this tab has no newer pending edit. Notes are one key per topic. */
function mergeData(base: Data, local: Data, disk: Data): Data {
  const theme = pickValue(base.theme, local.theme, disk.theme, base.at.theme, local.at.theme, disk.at.theme);
  const lang = pickValue(base.lang, local.lang, disk.lang, base.at.lang, local.at.lang, disk.at.lang);
  const lastId = pickValue(base.lastId, local.lastId, disk.lastId, base.at.lastId, local.at.lastId, disk.at.lastId);
  const notes = mergeMap(base.notes, local.notes, disk.notes, base.at.notes, local.at.notes, disk.at.notes);
  const right = mergeMap(base.right, local.right, disk.right, base.at.right, local.at.right, disk.at.right);
  const wrong = mergeMap(base.wrong, local.wrong, disk.wrong, base.at.wrong, local.at.wrong, disk.at.wrong);
  const think = mergeMap(base.think, local.think, disk.think, base.at.think, local.at.think, disk.at.think);
  const params = mergeMap(base.params, local.params, disk.params, base.at.params, local.at.params, disk.at.params);
  return {
    v: 1,
    theme: theme.value ?? base.theme,
    lang: lang.value ?? base.lang,
    lastId: lastId.value === undefined ? base.lastId : lastId.value,
    notes: notes.value,
    right: right.value,
    wrong: wrong.value,
    think: think.value,
    params: params.value,
    at: {
      theme: theme.at,
      lang: lang.at,
      lastId: lastId.at,
      notes: notes.at,
      right: right.at,
      wrong: wrong.at,
      think: think.at,
      params: params.at,
    },
  };
}

function valuesEqual(a: Data, b: Data): boolean {
  return a.theme === b.theme
    && a.lang === b.lang
    && a.lastId === b.lastId
    && stable(a.notes) === stable(b.notes)
    && stable(a.right) === stable(b.right)
    && stable(a.wrong) === stable(b.wrong)
    && stable(a.think) === stable(b.think)
    && stable(a.params) === stable(b.params);
}

function touchMap<T>(prev: Record<string, T>, next: Record<string, T>, stamps: Record<string, number>, now: number): Record<string, number> {
  const out = { ...stamps };
  const keys = new Set([...Object.keys(prev), ...Object.keys(next)]);
  for (const key of keys) {
    const before = owns(prev, key) ? prev[key] : undefined;
    const after = owns(next, key) ? next[key] : undefined;
    if (stable(before) !== stable(after)) out[key] = now;
  }
  return out;
}

function stampChanges(prev: Data, next: Data, now: number): Data {
  return {
    ...next,
    at: {
      theme: next.theme === prev.theme ? prev.at.theme : now,
      lang: next.lang === prev.lang ? prev.at.lang : now,
      lastId: next.lastId === prev.lastId ? prev.at.lastId : now,
      notes: touchMap(prev.notes, next.notes, prev.at.notes, now),
      right: touchMap(prev.right, next.right, prev.at.right, now),
      wrong: touchMap(prev.wrong, next.wrong, prev.at.wrong, now),
      think: touchMap(prev.think, next.think, prev.at.think, now),
      params: touchMap(prev.params, next.params, prev.at.params, now),
    },
  };
}

/** Take the disk snapshot, then put this tab's pending edits back. Newest stamp wins. */
function absorb(raw: string | null): void {
  if (typeof window !== "undefined") window.clearTimeout(timer);
  timer = 0;
  const disk = load(raw);
  const merged = mergeData(baseData, data, disk);
  data = merged;
  baseData = structuredClone(merged);
  if (typeof localStorage === "undefined") {
    baseline = raw;
    notify();
    return;
  }
  try {
    if (valuesEqual(merged, disk)) {
      baseline = raw;
    } else {
      const next = JSON.stringify(merged);
      localStorage.setItem(KEY, next);
      baseline = next;
    }
  } catch {
    baseline = raw;
  }
  notify();
}

function saveNow(): void {
  if (typeof localStorage === "undefined") return;
  let current: string | null;
  try {
    current = localStorage.getItem(KEY);
  } catch {
    return;
  }
  if (current !== baseline) {
    absorb(current);
    return;
  }
  try {
    const raw = JSON.stringify(data);
    localStorage.setItem(KEY, raw);
    baseline = raw;
    baseData = structuredClone(data);
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
  data = stampChanges(data, next, Date.now());
  scheduleSave();
  notify();
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

/** Another tab wrote the same key. Merge that snapshot with edits this tab has not saved yet. */
export function applyStorageEvent(key: string | null, value: string | null): void {
  if (key !== KEY) return;
  absorb(value);
}

/** Test hook. Replaces the in-memory desk without writing storage. */
export function resetStore(next: Data = blank()): void {
  if (typeof window !== "undefined") window.clearTimeout(timer);
  timer = 0;
  data = next;
  baseData = structuredClone(next);
  baseline = readStorage();
  notify();
}

/** Test hook. True while a debounced write is waiting. */
export function hasPendingSave(): boolean {
  return timer !== 0;
}

/** Test hook. Runs the debounced write immediately. */
export function flushSave(): void {
  if (typeof window !== "undefined") window.clearTimeout(timer);
  timer = 0;
  saveNow();
}

if (typeof window !== "undefined") {
  window.addEventListener("pagehide", saveNow);
  window.addEventListener("storage", (event) => {
    applyStorageEvent(event.key, event.newValue);
  });
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
