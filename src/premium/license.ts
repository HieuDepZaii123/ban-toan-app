import { useEffect, useState } from "react";

/** Where the Premium key lives on this device. Upgrade.tsx and ChatPanel.tsx read the same key. */
export const LICENSE_KEY = "ban-toan-license";
const CACHE_KEY = "ban-toan-premium-cache";

export type PremiumState =
  | { kind: "none" }
  | { kind: "checking" }
  | { kind: "active"; until: number }
  | { kind: "inactive" };

type Cache = { key: string; until: number };

export function savedLicense(): string {
  try {
    return localStorage.getItem(LICENSE_KEY)?.trim() ?? "";
  } catch {
    return "";
  }
}

function readCache(key: string): number | null {
  try {
    const raw = JSON.parse(localStorage.getItem(CACHE_KEY) || "null") as Partial<Cache> | null;
    if (!raw || raw.key !== key || typeof raw.until !== "number") return null;
    return raw.until > Date.now() ? raw.until : null;
  } catch {
    return null;
  }
}

function writeCache(key: string, until: number | null): void {
  try {
    if (until === null) localStorage.removeItem(CACHE_KEY);
    else localStorage.setItem(CACHE_KEY, JSON.stringify({ key, until }));
  } catch {
    /* storage blocked: the check simply runs again next time */
  }
}

/** Ask the server whether a key is a paid, unexpired, unrefunded licence. */
export async function checkLicense(key: string): Promise<{ active: boolean; until: number | null } | "offline"> {
  try {
    const res = await fetch(`/api/premium/status?license=${encodeURIComponent(key)}`, { headers: { accept: "application/json" } });
    if (!res.ok) return "offline";
    const body = (await res.json()) as { active?: unknown; premiumUntil?: unknown };
    const until = typeof body.premiumUntil === "number" ? body.premiumUntil : null;
    return { active: body.active === true && until !== null, until };
  } catch {
    return "offline";
  }
}

/** Save a key that the server confirmed. Returns the end of the paid term, or null if the key is not active. */
export async function activateLicense(raw: string): Promise<number | null | "offline"> {
  const key = raw.trim();
  if (!/^bt_[A-Za-z0-9_-]{16,}$/.test(key)) return null;
  const result = await checkLicense(key);
  if (result === "offline") return "offline";
  if (!result.active || result.until === null) return null;
  try {
    localStorage.setItem(LICENSE_KEY, key);
  } catch {
    /* ignore */
  }
  writeCache(key, result.until);
  window.dispatchEvent(new Event("ban-toan-premium"));
  return result.until;
}

/**
 * Premium status for this device. A confirmed licence is remembered until its term ends, so
 * Premium features keep working offline; online, the server is asked again on each visit
 * (a refunded key stops working).
 */
export function usePremium(): PremiumState {
  const [state, setState] = useState<PremiumState>(() => {
    const key = savedLicense();
    if (!key) return { kind: "none" };
    const until = readCache(key);
    return until ? { kind: "active", until } : { kind: "checking" };
  });
  useEffect(() => {
    let live = true;
    const run = () => {
      const key = savedLicense();
      if (!key) {
        setState({ kind: "none" });
        return;
      }
      void checkLicense(key).then((result) => {
        if (!live) return;
        if (result === "offline") {
          const until = readCache(key);
          setState(until ? { kind: "active", until } : { kind: "inactive" });
          return;
        }
        writeCache(key, result.active ? result.until : null);
        setState(result.active && result.until ? { kind: "active", until: result.until } : { kind: "inactive" });
      });
    };
    run();
    window.addEventListener("ban-toan-premium", run);
    return () => {
      live = false;
      window.removeEventListener("ban-toan-premium", run);
    };
  }, []);
  return state;
}

let sellingKnown: boolean | null = null;
let sellingAsk: Promise<boolean | null> | null = null;

/**
 * Bàn Toán có đang bán Premium không. null khi chưa biết (đang hỏi máy chủ hoặc ngoại tuyến).
 * Khi chưa bán, các trang không khóa gì sau Premium.
 */
export function useSelling(): boolean | null {
  const [value, setValue] = useState<boolean | null>(sellingKnown);
  useEffect(() => {
    if (sellingKnown !== null) return;
    let live = true;
    sellingAsk ??= fetch("/api/premium/plans", { headers: { accept: "application/json" } })
      .then(async (res) => (res.ok ? ((await res.json()) as { selling?: unknown }).selling === true : null))
      .catch(() => null);
    void sellingAsk.then((next) => {
      if (next !== null) sellingKnown = next;
      if (live) setValue(next);
    });
    return () => {
      live = false;
    };
  }, []);
  return value;
}
