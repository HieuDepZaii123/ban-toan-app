import { dayKey } from "./studyTime.ts";

/**
 * Khóa của phụ huynh trên máy này: mã PIN, giới hạn phút học mỗi ngày, và tắt trợ lý AI.
 * Đây là rào chắn nhẹ nhàng trong trình duyệt (xóa dữ liệu trang là mất), không phải bảo mật thật.
 */
const KEY = "bt-parent";
const EXTRA = "bt-parent-extra";
export const PARENT_EVENT = "bt-parent";

export type ParentSettings = { pinHash: string; salt: string; limitMin: number; tutorOff: boolean };

const NONE: ParentSettings = { pinHash: "", salt: "", limitMin: 0, tutorOff: false };

export function parseParent(raw: string | null): ParentSettings {
  try {
    const parsed: unknown = JSON.parse(raw || "null");
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return { ...NONE };
    const row = parsed as Record<string, unknown>;
    const limit = typeof row.limitMin === "number" && Number.isInteger(row.limitMin) && row.limitMin >= 0 && row.limitMin <= 600 ? row.limitMin : 0;
    return {
      pinHash: typeof row.pinHash === "string" ? row.pinHash.slice(0, 128) : "",
      salt: typeof row.salt === "string" ? row.salt.slice(0, 64) : "",
      limitMin: limit,
      tutorOff: row.tutorOff === true,
    };
  } catch {
    return { ...NONE };
  }
}

export function readParent(): ParentSettings {
  try {
    return parseParent(localStorage.getItem(KEY));
  } catch {
    return { ...NONE };
  }
}

export function writeParent(next: ParentSettings): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* không lưu được: thiết lập chỉ có hiệu lực tới khi đóng trang */
  }
  window.dispatchEvent(new Event(PARENT_EVENT));
}

export function validPin(pin: string): boolean {
  return /^\d{4,8}$/.test(pin);
}

export async function hashPin(pin: string, salt: string): Promise<string> {
  const bytes = new TextEncoder().encode(`${salt}:${pin}`);
  if (typeof crypto !== "undefined" && crypto.subtle) {
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
  }
  // Trình duyệt không có Web Crypto (trang không chạy trên https): băm đơn giản, vẫn đủ làm rào chắn.
  let hash = 2166136261;
  for (const byte of bytes) hash = Math.imul(hash ^ byte, 16777619) >>> 0;
  return `f${hash.toString(16)}`;
}

function newSalt(): string {
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  return [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function setPin(pin: string): Promise<void> {
  const salt = newSalt();
  writeParent({ ...readParent(), salt, pinHash: await hashPin(pin, salt) });
}

export async function checkPin(pin: string): Promise<boolean> {
  const now = readParent();
  if (!now.pinHash) return true;
  return (await hashPin(pin, now.salt)) === now.pinHash;
}

export function clearParent(): void {
  try {
    localStorage.removeItem(KEY);
    localStorage.removeItem(EXTRA);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event(PARENT_EVENT));
}

function extraSeconds(now: Date): number {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(EXTRA) || "null");
    if (!raw || typeof raw !== "object") return 0;
    const row = raw as { day?: unknown; seconds?: unknown };
    return row.day === dayKey(now) && typeof row.seconds === "number" && row.seconds > 0 ? row.seconds : 0;
  } catch {
    return 0;
  }
}

/** Phụ huynh cho thêm phút trong hôm nay (sau khi nhập đúng PIN). */
export function grantExtra(minutes: number, now: Date = new Date()): void {
  try {
    localStorage.setItem(EXTRA, JSON.stringify({ day: dayKey(now), seconds: extraSeconds(now) + minutes * 60 }));
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event(PARENT_EVENT));
}

/** Hôm nay đã học hết số phút phụ huynh cho phép chưa. */
export function limitReached(todaySeconds: number, settings: ParentSettings = readParent(), now: Date = new Date()): boolean {
  if (!settings.pinHash || settings.limitMin <= 0) return false;
  return todaySeconds >= settings.limitMin * 60 + extraSeconds(now);
}
