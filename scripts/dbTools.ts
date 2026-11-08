/** Chép dữ liệu thanh toán từ SQLite (local cũ) sang Postgres. Chạy lại an toàn: dòng đã có thì bỏ qua. */
import { DatabaseSync } from "node:sqlite";
import { ensureSchema } from "../server/db/schema.ts";
import type { SqlClient } from "../server/db/sql.ts";
import { openStore } from "../server/pay/store.ts";

export const COPY_TABLES = ["orders", "payment_events", "affiliates", "affiliate_visits", "affiliate_commissions"] as const;

export type CopyReport = Record<(typeof COPY_TABLES)[number], { read: number; inserted: number }>;

export async function copySqliteToPg(sqlitePath: string, client: SqlClient): Promise<CopyReport> {
  openStore(sqlitePath); // nâng lược đồ SQLite cũ lên đủ cột trước khi đọc
  await ensureSchema(client);
  const db = new DatabaseSync(sqlitePath, { readOnly: true });
  const report = {} as CopyReport;
  try {
    await client.transaction(async (tx) => {
      for (const table of COPY_TABLES) {
        const rows = db.prepare(`SELECT * FROM ${table}`).all() as Record<string, unknown>[];
        let inserted = 0;
        for (const row of rows) {
          const columns = Object.keys(row);
          const marks = columns.map((_, index) => `$${index + 1}`).join(", ");
          const result = await tx.query(
            `INSERT INTO ${table} (${columns.join(", ")}) VALUES (${marks}) ON CONFLICT DO NOTHING`,
            columns.map((column) => row[column] ?? null),
          );
          inserted += result.rowCount;
        }
        report[table] = { read: rows.length, inserted };
      }
    });
  } finally {
    db.close();
  }
  return report;
}
