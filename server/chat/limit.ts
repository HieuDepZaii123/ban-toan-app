import { ensureSchema } from "../db/schema.ts";
import { num, type SqlClient } from "../db/sql.ts";

/** One allowance to respect: at most `max` hits on `key` within `windowMs`. */
export type Limit = { key: string; windowMs: number; max: number };

/** What `claim` decided. `used` holds the count for each limit before this request, in order. */
export type Claim = { ok: true; used: number[] } | { ok: false; full: number; used: number[] };

/** Đếm lượt hỏi theo khóa (ví dụ `day:<ip>`) trong một cửa sổ thời gian. */
export type Quota = {
  used(key: string, now: number, windowMs: number): Promise<number>;
  add(key: string, now: number): Promise<void>;
  /**
   * Check every limit and, only if all have room, record one hit on each, as one atomic step.
   * Checking with `used` and then calling `add` lets parallel requests all pass before any is
   * counted, so a burst could run far past the daily allowance. `full` is the first limit with no room.
   */
  claim(limits: readonly Limit[], now: number): Promise<Claim>;
  /** Give back hits recorded by `claim` at `now`, for a request that then failed. */
  release(keys: readonly string[], now: number): Promise<void>;
};

/** Bộ đếm trong bộ nhớ: đủ cho local, nhưng mỗi instance serverless đếm riêng. */
export function createQuota(): Quota {
  const hits = new Map<string, number[]>();
  const count = (key: string, now: number, windowMs: number): number => {
    const prev = (hits.get(key) ?? []).filter((stamp) => now - stamp < windowMs);
    hits.set(key, prev);
    return prev.length;
  };
  const push = (key: string, now: number): void => {
    const prev = hits.get(key) ?? [];
    prev.push(now);
    hits.set(key, prev);
  };
  return {
    async used(key, now, windowMs) {
      return count(key, now, windowMs);
    },
    async add(key, now) {
      push(key, now);
    },
    // No await between the counts and the pushes, so nothing else runs in between.
    async claim(limits, now) {
      const used = limits.map((limit) => count(limit.key, now, limit.windowMs));
      const full = limits.findIndex((limit, index) => (used[index] ?? 0) >= limit.max);
      if (full >= 0) return { ok: false, full, used };
      for (const limit of limits) push(limit.key, now);
      return { ok: true, used };
    },
    async release(keys, now) {
      for (const key of keys) {
        const prev = hits.get(key) ?? [];
        const at = prev.lastIndexOf(now);
        if (at >= 0) prev.splice(at, 1);
      }
    },
  };
}

/** Lượt cũ hơn mốc này bị xóa khi ghi lượt mới cùng khóa; cửa sổ dài nhất đang dùng là một tuần (lượt chấm miễn phí). */
export const QUOTA_KEEP_MS = 8 * 86_400_000;

/** Bộ đếm trên Postgres: mọi instance thấy cùng số lượt. */
export function pgQuota(client: SqlClient): Quota {
  return {
    async used(key, now, windowMs) {
      await ensureSchema(client);
      const row = (await client.query<{ n: unknown }>("SELECT COUNT(*) AS n FROM chat_hits WHERE key = $1 AND at > $2", [key, now - windowMs])).rows[0];
      return num(row?.n ?? 0);
    },
    async add(key, now) {
      await ensureSchema(client);
      await client.query("INSERT INTO chat_hits (key, at) VALUES ($1, $2)", [key, now]);
      await client.query("DELETE FROM chat_hits WHERE key = $1 AND at < $2", [key, now - QUOTA_KEEP_MS]);
    },
    async claim(limits, now) {
      await ensureSchema(client);
      return client.transaction(async (tx) => {
        // One lock per key, taken in a fixed order so two requests sharing keys cannot deadlock.
        // The lock is held until COMMIT, so every instance sees the count this request leaves.
        for (const key of [...new Set(limits.map((limit) => limit.key))].sort()) {
          await tx.query("SELECT pg_advisory_xact_lock(hashtext($1))", [`chat_hits:${key}`]);
        }
        const used: number[] = [];
        for (const limit of limits) {
          const row = (await tx.query<{ n: unknown }>("SELECT COUNT(*) AS n FROM chat_hits WHERE key = $1 AND at > $2", [limit.key, now - limit.windowMs])).rows[0];
          used.push(num(row?.n ?? 0));
        }
        const full = limits.findIndex((limit, index) => (used[index] ?? 0) >= limit.max);
        if (full >= 0) return { ok: false as const, full, used };
        for (const limit of limits) {
          await tx.query("INSERT INTO chat_hits (key, at) VALUES ($1, $2)", [limit.key, now]);
          await tx.query("DELETE FROM chat_hits WHERE key = $1 AND at < $2", [limit.key, now - QUOTA_KEEP_MS]);
        }
        return { ok: true as const, used };
      });
    },
    // One transaction, so a failure part-way gives back every hit or none: a marking never ends up with its
    // `win:` hit returned and its `chk:` hit kept. Two requests that claimed in the same millisecond have
    // identical `at`; removing any one row for the key is correct because the rows are interchangeable.
    async release(keys, now) {
      await ensureSchema(client);
      await client.transaction(async (tx) => {
        for (const key of [...new Set(keys)].sort()) {
          await tx.query("DELETE FROM chat_hits WHERE ctid IN (SELECT ctid FROM chat_hits WHERE key = $1 AND at = $2 LIMIT 1)", [key, now]);
        }
      });
    },
  };
}
