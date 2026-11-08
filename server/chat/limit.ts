import { ensureSchema } from "../db/schema.ts";
import { num, type SqlClient } from "../db/sql.ts";

/** Đếm lượt hỏi theo khóa (ví dụ `day:<ip>`) trong một cửa sổ thời gian. */
export type Quota = {
  used(key: string, now: number, windowMs: number): Promise<number>;
  add(key: string, now: number): Promise<void>;
};

/** Bộ đếm trong bộ nhớ: đủ cho local, nhưng mỗi instance serverless đếm riêng. */
export function createQuota(): Quota {
  const hits = new Map<string, number[]>();
  return {
    async used(key, now, windowMs) {
      const prev = (hits.get(key) ?? []).filter((stamp) => now - stamp < windowMs);
      hits.set(key, prev);
      return prev.length;
    },
    async add(key, now) {
      const prev = hits.get(key) ?? [];
      prev.push(now);
      hits.set(key, prev);
    },
  };
}

/** Lượt cũ hơn mốc này bị xóa khi ghi lượt mới cùng khóa; cửa sổ dài nhất đang dùng là một ngày. */
export const QUOTA_KEEP_MS = 2 * 86_400_000;

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
  };
}
