/**
 * Lược đồ Postgres theo phiên bản. Mỗi phiên bản là danh sách câu lệnh đơn (PGlite và pg đều chạy được),
 * áp dụng đúng một lần, trong một transaction, dưới advisory lock để các instance khởi động cùng lúc không đua nhau.
 * Chỉ thêm phiên bản mới ở cuối; không sửa phiên bản đã phát hành.
 */
import type { SqlClient } from "./sql.ts";

export const MIGRATIONS: readonly (readonly string[])[] = [
  [
    `CREATE TABLE IF NOT EXISTS orders (
      order_id TEXT PRIMARY KEY,
      request_id TEXT NOT NULL,
      email TEXT NOT NULL,
      plan TEXT NOT NULL,
      method TEXT NOT NULL,
      amount BIGINT NOT NULL,
      transfer_code TEXT NOT NULL UNIQUE,
      status TEXT NOT NULL,
      created_at BIGINT NOT NULL,
      expires_at BIGINT NOT NULL,
      paid_at BIGINT,
      momo_trans_id TEXT,
      license_key TEXT,
      license_hash TEXT,
      pay_url TEXT,
      deeplink TEXT,
      qr_code_url TEXT,
      crypto_chain TEXT,
      crypto_asset TEXT,
      crypto_units TEXT,
      crypto_rate DOUBLE PRECISION,
      crypto_suffix INTEGER,
      crypto_source TEXT,
      crypto_tx TEXT,
      ref_code TEXT,
      ref_bps INTEGER
    )`,
    "CREATE INDEX IF NOT EXISTS orders_license ON orders (license_hash)",
    "CREATE INDEX IF NOT EXISTS orders_ref ON orders (ref_code)",
    "CREATE INDEX IF NOT EXISTS orders_pending_crypto ON orders (created_at) WHERE method = 'crypto' AND status = 'pending'",
    // Tiền mã hóa được khớp theo đúng số token, nên hai đơn không bao giờ được trùng số.
    "CREATE UNIQUE INDEX IF NOT EXISTS orders_crypto_amount ON orders (crypto_chain, crypto_asset, crypto_units) WHERE crypto_units IS NOT NULL",
    `CREATE TABLE IF NOT EXISTS payment_events (
      event_kind TEXT NOT NULL,
      event_id TEXT NOT NULL,
      order_id TEXT NOT NULL,
      PRIMARY KEY (event_kind, event_id)
    )`,
    `CREATE TABLE IF NOT EXISTS affiliates (
      code TEXT PRIMARY KEY,
      owner_hash TEXT NOT NULL UNIQUE,
      email TEXT,
      created_at BIGINT NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS affiliate_visits (
      code TEXT NOT NULL,
      visitor_hash TEXT NOT NULL,
      created_at BIGINT NOT NULL,
      PRIMARY KEY (code, visitor_hash)
    )`,
    `CREATE TABLE IF NOT EXISTS affiliate_commissions (
      order_id TEXT PRIMARY KEY,
      code TEXT NOT NULL,
      amount BIGINT NOT NULL,
      commission BIGINT NOT NULL,
      status TEXT NOT NULL,
      created_at BIGINT NOT NULL,
      approved_at BIGINT
    )`,
    "CREATE INDEX IF NOT EXISTS affiliate_commissions_code ON affiliate_commissions (code, status)",
    `CREATE TABLE IF NOT EXISTS chat_hits (
      key TEXT NOT NULL,
      at BIGINT NOT NULL
    )`,
    "CREATE INDEX IF NOT EXISTS chat_hits_key_at ON chat_hits (key, at)",
  ],
];

/** Khóa advisory riêng của app (số tùy chọn, cố định). */
const LOCK = 7_310_284_551;

/** Áp các phiên bản còn thiếu; trả về các số phiên bản vừa áp. */
export async function migrate(client: SqlClient, now: () => number = Date.now): Promise<number[]> {
  return client.transaction(async (tx) => {
    await tx.query("SELECT pg_advisory_xact_lock($1)", [LOCK]);
    await tx.query("CREATE TABLE IF NOT EXISTS schema_migrations (version INTEGER PRIMARY KEY, applied_at BIGINT NOT NULL)");
    const done = new Set((await tx.query<{ version: number }>("SELECT version FROM schema_migrations")).rows.map((row) => Number(row.version)));
    const applied: number[] = [];
    for (const [index, statements] of MIGRATIONS.entries()) {
      const version = index + 1;
      if (done.has(version)) continue;
      for (const statement of statements) await tx.query(statement);
      await tx.query("INSERT INTO schema_migrations (version, applied_at) VALUES ($1, $2)", [version, now()]);
      applied.push(version);
    }
    return applied;
  });
}

const ready = new WeakMap<SqlClient, Promise<unknown>>();

/** Gọi migrate một lần cho mỗi client trong tiến trình; lần lỗi thì lần sau thử lại. */
export function ensureSchema(client: SqlClient): Promise<unknown> {
  let pending = ready.get(client);
  if (!pending) {
    pending = migrate(client).catch((error: unknown) => {
      ready.delete(client);
      throw error;
    });
    ready.set(client, pending);
  }
  return pending;
}
