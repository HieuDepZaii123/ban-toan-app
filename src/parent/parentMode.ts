import { useEffect, useState } from "react";

/**
 * Parent mode: a PIN-protected setting on this device. While it is on,
 * - the tutor will not write full worked solutions (server/chat/handlers.ts adds PARENT_NOTE),
 * - marking shows the first wrong step and a hint, never the corrected step (server/chat/check.ts),
 * - the mock-exam review shows a solution only for questions the child attempted.
 * It is a device setting, not a lock: clearing site data removes it. The weekly report says whether it was on.
 */
const KEY = "ban-toan-parent";
const EVENT = "ban-toan-parent";
export const PIN_RULE = /^\d{4,8}$/;

type Saved = { salt: string; hash: string; since: number };

function read(): Saved | null {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(KEY) || "null");
    if (!raw || typeof raw !== "object") return null;
    const row = raw as Record<string, unknown>;
    if (typeof row.salt !== "string" || typeof row.hash !== "string" || typeof row.since !== "number") return null;
    return { salt: row.salt, hash: row.hash, since: row.since };
  } catch {
    return null;
  }
}

export async function hashPin(pin: string, salt: string): Promise<string> {
  const bytes = new TextEncoder().encode(`${salt}:${pin}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function parentModeOn(): boolean {
  return read() !== null;
}

/** When parent mode was turned on, or null. */
export function parentSince(): number | null {
  return read()?.since ?? null;
}

export async function enableParentMode(pin: string, now = Date.now()): Promise<boolean> {
  if (!PIN_RULE.test(pin)) return false;
  const salt = crypto.randomUUID();
  const saved: Saved = { salt, hash: await hashPin(pin, salt), since: now };
  try {
    localStorage.setItem(KEY, JSON.stringify(saved));
  } catch {
    return false;
  }
  window.dispatchEvent(new Event(EVENT));
  return true;
}

/** Turns parent mode off only with the right PIN. */
export async function disableParentMode(pin: string): Promise<boolean> {
  const saved = read();
  if (!saved) return true;
  if ((await hashPin(pin, saved.salt)) !== saved.hash) return false;
  try {
    localStorage.removeItem(KEY);
  } catch {
    return false;
  }
  window.dispatchEvent(new Event(EVENT));
  return true;
}

export function useParentMode(): boolean {
  const [on, setOn] = useState(parentModeOn);
  useEffect(() => {
    const sync = () => setOn(parentModeOn());
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return on;
}
