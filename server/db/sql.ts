/**
 * Giao diện SQL tối thiểu cho Postgres. Production dùng `pg` (pgClient), test dùng PGlite,
 * nên cùng một câu SQL chạy trên Postgres thật ở cả hai nơi.
 */
import pg from "pg";

export type SqlResult<T> = { rows: T[]; rowCount: number };

export type SqlQuery = {
  query<T = Record<string, unknown>>(text: string, params?: readonly unknown[]): Promise<SqlResult<T>>;
};

export type SqlClient = SqlQuery & {
  /** Chạy `fn` trong một transaction; lỗi thì ROLLBACK rồi ném lại. */
  transaction<R>(fn: (tx: SqlQuery) => Promise<R>): Promise<R>;
  close(): Promise<void>;
};

/** Mã lỗi Postgres khi vi phạm ràng buộc UNIQUE. */
export const UNIQUE_VIOLATION = "23505";

export function isUniqueViolation(error: unknown, constraint?: string): boolean {
  if (!error || typeof error !== "object") return false;
  const row = error as { code?: unknown; constraint?: unknown; message?: unknown };
  if (row.code !== UNIQUE_VIOLATION) return false;
  if (!constraint) return true;
  return row.constraint === constraint || (typeof row.message === "string" && row.message.includes(constraint));
}

/** BIGINT/NUMERIC về số JS. Tiền tính bằng đồng và mốc thời gian ms đều nằm gọn trong 2^53. */
export function num(value: unknown): number {
  return typeof value === "number" ? value : Number(value);
}

export function numOrNull(value: unknown): number | null {
  return value === null || value === undefined ? null : num(value);
}

const INT8 = 20;

export type PgOptions = {
  max?: number;
  idleTimeoutMillis?: number;
  /** Đặt search_path cho mọi kết nối (test dùng một schema riêng cho mỗi lần chạy). */
  searchPath?: string;
};

export function pgClient(connectionString: string, options: PgOptions = {}): SqlClient {
  const pool = new pg.Pool({
    connectionString,
    max: options.max ?? 3,
    idleTimeoutMillis: options.idleTimeoutMillis ?? 10_000,
    ...(options.searchPath ? { options: `-c search_path=${options.searchPath}` } : {}),
    types: {
      getTypeParser: ((oid: number, format?: "text" | "binary") =>
        oid === INT8 ? (value: string) => Number(value) : pg.types.getTypeParser(oid, format)) as typeof pg.types.getTypeParser,
    },
  });
  pool.on("error", (error) => console.error("[db] idle client error", error));
  const run = async <T>(target: pg.Pool | pg.PoolClient, text: string, params?: readonly unknown[]): Promise<SqlResult<T>> => {
    const result = await target.query(text, params as unknown[] | undefined);
    return { rows: result.rows as T[], rowCount: result.rowCount ?? 0 };
  };
  return {
    query: (text, params) => run(pool, text, params),
    async transaction(fn) {
      const client = await pool.connect();
      try {
        await client.query("BEGIN");
        const result = await fn({ query: (text, params) => run(client, text, params) });
        await client.query("COMMIT");
        return result;
      } catch (error) {
        await client.query("ROLLBACK").catch(() => undefined);
        throw error;
      } finally {
        client.release();
      }
    },
    close: () => pool.end(),
  };
}

const clients = new Map<string, SqlClient>();

/** Một pool cho mỗi chuỗi kết nối trong một tiến trình (hàm serverless dùng lại giữa các request). */
export function sharedClient(connectionString: string): SqlClient {
  let client = clients.get(connectionString);
  if (!client) {
    client = pgClient(connectionString, { max: Number(process.env.PG_POOL_MAX) || 3 });
    clients.set(connectionString, client);
  }
  return client;
}
