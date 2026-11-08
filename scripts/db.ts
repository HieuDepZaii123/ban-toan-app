/**
 * Lệnh quản lý Postgres. Đọc DATABASE_URL (hoặc POSTGRES_URL) từ shell hoặc `.env`.
 *   npm run db:migrate                         áp lược đồ còn thiếu
 *   npm run db:status                          phiên bản đã áp và số dòng mỗi bảng
 *   npm run db:copy-sqlite -- data/premium.sqlite   chép dữ liệu SQLite cũ sang Postgres
 */
import { existsSync } from "node:fs";
import { MIGRATIONS, migrate } from "../server/db/schema.ts";
import { pgClient } from "../server/db/sql.ts";

if (existsSync(".env")) process.loadEnvFile(".env");
const url = process.env.DATABASE_URL?.trim() || process.env.POSTGRES_URL?.trim() || "";
const [command, arg] = process.argv.slice(2);

if (!url) {
  console.error("Chưa có DATABASE_URL. Đặt trong shell hoặc .env, ví dụ postgres://user:pass@host:5432/db");
  process.exit(1);
}

const client = pgClient(url, { max: 1 });
try {
  if (command === "migrate") {
    const applied = await migrate(client);
    console.log(applied.length ? `Đã áp phiên bản ${applied.join(", ")}.` : "Lược đồ đã mới nhất.");
  } else if (command === "status") {
    await migrate(client);
    const versions = (await client.query<{ version: number }>("SELECT version FROM schema_migrations ORDER BY version")).rows.map((row) => Number(row.version));
    console.log(`Phiên bản: ${versions.join(", ")} / ${MIGRATIONS.length}`);
    for (const table of ["orders", "payment_events", "affiliates", "affiliate_visits", "affiliate_commissions", "chat_hits"]) {
      const row = (await client.query<{ n: unknown }>(`SELECT COUNT(*) AS n FROM ${table}`)).rows[0];
      console.log(`${table}: ${Number(row?.n ?? 0)} dòng`);
    }
  } else if (command === "copy-sqlite") {
    const path = arg || process.env.PREMIUM_DB_PATH || "data/premium.sqlite";
    if (!existsSync(path)) throw new Error(`Không thấy tệp SQLite ${path}`);
    const { copySqliteToPg } = await import("./dbTools.ts");
    const report = await copySqliteToPg(path, client);
    for (const [table, row] of Object.entries(report)) console.log(`${table}: đọc ${row.read}, thêm ${row.inserted}`);
  } else {
    console.error("Lệnh: migrate | status | copy-sqlite [đường dẫn]");
    process.exitCode = 1;
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  await client.close();
}
