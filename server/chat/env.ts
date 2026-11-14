import { licenseHash, storeFor } from "../pay/store.ts";
import { payEnv } from "../pay/env.ts";
import { demoReply } from "./policy.ts";
import { sharedClient } from "../db/sql.ts";
import { createQuota, pgQuota, type Quota } from "./limit.ts";
import type { ChatEnv, ChatTurn } from "./handlers.ts";
import type { CheckEnv } from "./check.ts";
import { completeLive, hasLiveKey } from "./model.ts";

const DAY = 86_400_000;

function integer(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

export async function premiumNow(license: string, now = Date.now()): Promise<boolean> {
  try {
    const order = await storeFor(payEnv()).getByLicense(licenseHash(license));
    if (!order?.paidAt) return false;
    const term = (order.plan === "year" ? 365 : 30) * DAY;
    return now < order.paidAt + term;
  } catch {
    return false;
  }
}

/** Có Postgres thì đếm lượt chung cho mọi instance; không thì đếm trong bộ nhớ của tiến trình. */
export function quotaFor(source: NodeJS.ProcessEnv): Quota {
  const url = source.DATABASE_URL?.trim() || source.POSTGRES_URL?.trim() || "";
  return url ? pgQuota(sharedClient(url)) : sharedQuota;
}

export function chatEnv(source: NodeJS.ProcessEnv = process.env, quota: Quota = quotaFor(source)): ChatEnv {
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
    networkDaily: integer(source.CHAT_NETWORK_DAILY, 160),
  };
}

/** Chấm bài dùng chung bộ đếm và mô hình với trợ lý, cộng hạn mức riêng. */
export function checkEnv(source: NodeJS.ProcessEnv = process.env, quota: Quota = quotaFor(source)): CheckEnv {
  return {
    ...chatEnv(source, quota),
    freeChecksWeekly: integer(source.CHECK_FREE_WEEKLY, 3),
    premiumChecksDaily: integer(source.CHECK_PREMIUM_DAILY, 40),
  };
}

const sharedQuota = createQuota();
