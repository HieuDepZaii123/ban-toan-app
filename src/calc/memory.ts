export type CalcMode = "deg" | "rad";

export type CalcEntry = { expr: string; result: string };

export const CALC_MODE_KEY = "ban-toan-calc-mode";
export const CALC_HISTORY_KEY = "ban-toan-calc-history";
export const CALC_ANS_KEY = "ban-toan-calc-ans";
export const HISTORY_LIMIT = 30;

export type CalcStore = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
};

export function readMode(store: CalcStore): CalcMode {
  return store.getItem(CALC_MODE_KEY) === "rad" ? "rad" : "deg";
}

export function writeMode(mode: CalcMode, store: CalcStore): void {
  try { store.setItem(CALC_MODE_KEY, mode); } catch { /* máy đầy */ }
}

export function readHistory(store: CalcStore): CalcEntry[] {
  try {
    const parsed: unknown = JSON.parse(store.getItem(CALC_HISTORY_KEY) || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is CalcEntry => {
      if (!item || typeof item !== "object") return false;
      const entry = item as { expr?: unknown; result?: unknown };
      return typeof entry.expr === "string" && typeof entry.result === "string";
    }).slice(0, HISTORY_LIMIT);
  } catch {
    return [];
  }
}

export function writeHistory(entries: readonly CalcEntry[], store: CalcStore): void {
  try { store.setItem(CALC_HISTORY_KEY, JSON.stringify(entries.slice(0, HISTORY_LIMIT))); } catch { /* máy đầy */ }
}

export function pushHistory(entries: readonly CalcEntry[], entry: CalcEntry): CalcEntry[] {
  const next = [entry, ...entries.filter((item) => item.expr !== entry.expr)];
  return next.slice(0, HISTORY_LIMIT);
}

export function readAns(store: CalcStore): number | null {
  const raw = store.getItem(CALC_ANS_KEY);
  if (raw === null || raw === "") return null;
  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
}

export function writeAns(value: number | null, store: CalcStore): void {
  try {
    if (value === null) store.removeItem(CALC_ANS_KEY);
    else store.setItem(CALC_ANS_KEY, String(value));
  } catch { /* máy đầy */ }
}
