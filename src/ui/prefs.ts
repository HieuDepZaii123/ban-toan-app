import { useSyncExternalStore } from "react";

/**
 * Lựa chọn nhỏ của người học, mỗi thứ một khóa localStorage riêng (không nằm trong kho tiến độ `ban-toan`).
 * Ghi là phát sự kiện, nên mọi nơi đang đọc cùng khóa đều vẽ lại.
 */
export type PrefKey = "bt-grade" | "bt-font" | "bt-read" | "bt-contrast" | "bt-motion" | "bt-keys" | "bt-break";

const EVENT = "bt-prefs";

export function readPref(key: PrefKey): string {
  try {
    return localStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
}

export function writePref(key: PrefKey, value: string): void {
  try {
    if (value) localStorage.setItem(key, value);
    else localStorage.removeItem(key);
  } catch {
    /* lựa chọn vẫn áp dụng cho lần xem này */
  }
  applyPrefs();
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(listener: () => void): () => void {
  window.addEventListener(EVENT, listener);
  window.addEventListener("storage", listener);
  return () => {
    window.removeEventListener(EVENT, listener);
    window.removeEventListener("storage", listener);
  };
}

export function usePref(key: PrefKey): string {
  return useSyncExternalStore(subscribe, () => readPref(key), () => "");
}

/** Gắn các lựa chọn hiển thị lên <html> để CSS đọc. index.html làm việc này một lần trước khi vẽ. */
export function applyPrefs(): void {
  const root = document.documentElement;
  const font = readPref("bt-font");
  root.dataset.font = font === "s" || font === "l" || font === "xl" ? font : "m";
  root.dataset.read = readPref("bt-read") === "on" ? "on" : "off";
  root.dataset.contrast = readPref("bt-contrast") === "on" ? "on" : "off";
  root.dataset.motion = readPref("bt-motion") === "less" ? "less" : "full";
}

/** Lớp người học đã chọn: 1–12, "adult" cho phụ huynh và người lớn tự học, null khi chưa chọn. */
export type Grade = number | "adult" | null;

export function parseGrade(raw: string): Grade {
  if (raw === "adult") return "adult";
  const value = Number(raw);
  return raw !== "" && Number.isInteger(value) && value >= 1 && value <= 12 ? value : null;
}
