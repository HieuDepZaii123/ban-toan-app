/**
 * Cơ sở dữ liệu cho test thanh toán, chọn bằng PAY_TEST_STORE:
 *   sqlite   (mặc định) tệp SQLite tạm, như khi chạy local
 *   pglite   Postgres thật chạy trong tiến trình (PGlite), không cần máy chủ
 *   postgres máy chủ Postgres ở TEST_DATABASE_URL, qua driver `pg` như production;
 *            mỗi client test có schema riêng nên chạy song song hay chạy lại đều sạch
 */
import { randomBytes } from "node:crypto";
import { PGlite, type Transaction } from "@electric-sql/pglite";
import pg from "pg";
import { pgClient, type SqlClient, type SqlQuery, type SqlResult } from "../server/db/sql.ts";
import type { PayEnv } from "../server/pay/env.ts";
import { pgStore } from "../server/pay/pgStore.ts";

const INT8 = 20;

export type TestStore = "sqlite" | "pglite" | "postgres";

export const TEST_STORE: TestStore =
  process.env.PAY_TEST_STORE === "pglite" ? "pglite" : process.env.PAY_TEST_STORE === "postgres" ? "postgres" : "sqlite";

type Runner = PGlite | Transaction;

async function run<T>(db: Runner, text: string, params?: readonly unknown[]): Promise<SqlResult<T>> {
  const result = await db.query<T>(text, params as unknown[] | undefined);
  return { rows: result.rows, rowCount: result.affectedRows ?? result.rows.length };
}

/** Client PGlite trong bộ nhớ; khởi động ở truy vấn đầu tiên nên dựng được đồng bộ. */
export function pgliteClient(): SqlClient {
  let db: PGlite | null = null;
  const open = () => (db ??= new PGlite({ parsers: { [INT8]: (value: string) => Number(value) } }));
  const asQuery = (target: Runner): SqlQuery => ({ query: (text, params) => run(target, text, params) });
  return {
    query: (text, params) => run(open(), text, params),
    transaction: (fn) => open().transaction((tx) => fn(asQuery(tx))),
    close: async () => {
      if (db) await db.close();
    },
  };
}

const opened: SqlClient[] = [];

/** Client `pg` trên một schema mới, tạo ở truy vấn đầu tiên. */
export function serverClient(url: string): SqlClient {
  const schema = `t_${randomBytes(6).toString("hex")}`;
  let ready: Promise<SqlClient> | null = null;
  const open = () =>
    (ready ??= (async () => {
      const admin = new pg.Client({ connectionString: url });
      await admin.connect();
      await admin.query(`CREATE SCHEMA ${schema}`);
      await admin.end();
      return pgClient(url, { max: 4, searchPath: schema });
    })());
  const client: SqlClient = {
    query: async (text, params) => (await open()).query(text, params),
    transaction: async (fn) => (await open()).transaction(fn),
    close: async () => {
      if (!ready) return;
      const inner = await ready;
      await inner.query(`DROP SCHEMA ${schema} CASCADE`);
      await inner.close();
      ready = null;
    },
  };
  opened.push(client);
  return client;
}

/** Postgres cho test: máy chủ thật nếu PAY_TEST_STORE=postgres, không thì PGlite. */
export function testClient(): SqlClient {
  if (TEST_STORE === "postgres") {
    const url = process.env.TEST_DATABASE_URL?.trim();
    if (!url) throw new Error("PAY_TEST_STORE=postgres cần TEST_DATABASE_URL");
    return serverClient(url);
  }
  return pgliteClient();
}

/** Gắn kho Postgres vào env test khi PAY_TEST_STORE là pglite hoặc postgres. */
export function withTestStore<T extends PayEnv>(env: T): T {
  if (TEST_STORE !== "sqlite") env.store = pgStore(testClient());
  return env;
}

/** Đóng mọi pool `pg` đã mở để tiến trình test thoát được. */
export async function closeTestClients(): Promise<void> {
  await Promise.all(opened.splice(0).map((client) => client.close()));
}

/** Đóng pool khi bộ test chạy xong (pool `pg` mở sẽ giữ tiến trình sống). */
if (TEST_STORE === "postgres") {
  process.once("beforeExit", () => {
    void closeTestClients();
  });
}
