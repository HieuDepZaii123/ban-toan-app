import { licenseHash, storeFor } from "../pay/store.ts";
import { payEnv } from "../pay/env.ts";
import { demoReply } from "./policy.ts";
import { createQuota, type Quota } from "./limit.ts";
import type { ChatEnv, ChatTurn } from "./handlers.ts";
import { completeLive, hasLiveKey } from "./model.ts";

const DAY = 86_400_000;

function integer(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

export function premiumNow(license: string, now = Date.now()): boolean {
  try {
    const order = storeFor(payEnv().dbPath).getByLicense(licenseHash(license));
    if (!order?.paidAt) return false;
    const term = (order.plan === "year" ? 365 : 30) * DAY;
    return now < order.paidAt + term;
  } catch {
    return false;
  }
}

export function chatEnv(source: NodeJS.ProcessEnv = process.env, quota: Quota = sharedQuota): ChatEnv {
  const live = hasLiveKey(source);
  return {
    now: Date.now,
    mode: live ? "live" : "demo",
    complete: live
      ? (instructions, messages) => completeLive(instructions, messages, source)
      : (_instructions: string, messages: ChatTurn[]) => Promise.resolve(demoReply(messages.at(-1)?.content ?? "")),
    premium: (license) => premiumNow(license),
    quota,
    freeDaily: integer(source.CHAT_FREE_DAILY, 8),
    premiumDaily: integer(source.CHAT_PREMIUM_DAILY, 40),
    windowLimit: integer(source.CHAT_WINDOW_LIMIT, 10),
    windowMs: integer(source.CHAT_WINDOW_MS, 10 * 60 * 1000),
  };
}

const sharedQuota = createQuota();
