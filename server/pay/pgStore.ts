/**
 * Kho đơn hàng trên Postgres. Cùng hành vi với kho SQLite trong store.ts, nhưng an toàn khi nhiều
 * instance serverless chạy song song: khóa dòng (FOR UPDATE) khi đổi trạng thái, ON CONFLICT cho sự kiện
 * thanh toán và lượt ghé, và chỉ mục UNIQUE cho số token tiền mã hóa.
 */
import { ensureSchema } from "../db/schema.ts";
import { isUniqueViolation, num, numOrNull, type SqlClient, type SqlQuery } from "../db/sql.ts";
import { newAffiliateCode } from "./affiliate.ts";
import { CryptoAmountTaken, fromSql, hashKey, newLicenseKey, type AffiliateStats, type MarkPaid, type OrderRow, type PayStore, type SqlOrder } from "./store.ts";

const DAY_MS = 86_400_000;

/** BIGINT có thể về dạng chuỗi tùy driver; đưa mọi cột số về number trước khi dùng chung `fromSql`. */
function toSqlOrder(row: Record<string, unknown>): SqlOrder {
  return {
    ...(row as SqlOrder),
    amount: num(row.amount),
    created_at: num(row.created_at),
    expires_at: num(row.expires_at),
    paid_at: numOrNull(row.paid_at),
    crypto_rate: numOrNull(row.crypto_rate),
    crypto_suffix: numOrNull(row.crypto_suffix),
    ref_bps: numOrNull(row.ref_bps),
  };
}

function termMs(order: OrderRow): number {
  return (order.plan === "year" ? 365 : 30) * DAY_MS;
}

export function pgStore(client: SqlClient): PayStore {
  const ready = () => ensureSchema(client);

  async function one(db: SqlQuery, sql: string, params: readonly unknown[]): Promise<SqlOrder | null> {
    const row = (await db.query(sql, params)).rows[0];
    return row ? toSqlOrder(row) : null;
  }

  /** Đọc đơn; đơn chờ đã quá hạn được ghi lại là expired (giống SQLite). */
  async function readOrder(where: string, key: string, now: number): Promise<OrderRow | null> {
    await ready();
    const row = await one(client, `SELECT * FROM orders WHERE ${where} = $1`, [key]);
    if (!row) return null;
    const order = fromSql(row, now);
    if (order.status === "expired" && row.status === "pending") {
      await client.query("UPDATE orders SET status = 'expired' WHERE order_id = $1 AND status = 'pending'", [order.orderId]);
    }
    return order;
  }

  async function count(sql: string, params: readonly unknown[]): Promise<number> {
    return num((await client.query<{ n: unknown }>(sql, params)).rows[0]?.n ?? 0);
  }

  async function stats(code: string, now: number): Promise<AffiliateStats> {
    const [visits, ordersPending, ordersPaid, commissionAccrued, commissionApproved] = await Promise.all([
      count("SELECT COUNT(*) AS n FROM affiliate_visits WHERE code = $1", [code]),
      count("SELECT COUNT(*) AS n FROM orders WHERE ref_code = $1 AND status = 'pending' AND expires_at >= $2", [code, now]),
      count("SELECT COUNT(*) AS n FROM orders WHERE ref_code = $1 AND status = 'paid'", [code]),
      count("SELECT COALESCE(SUM(commission), 0) AS n FROM affiliate_commissions WHERE code = $1 AND status = 'accrued'", [code]),
      count("SELECT COALESCE(SUM(commission), 0) AS n FROM affiliate_commissions WHERE code = $1 AND status = 'approved'", [code]),
    ]);
    return { visits, ordersPending, ordersPaid, commissionAccrued, commissionApproved };
  }

  return {
    kind: "postgres",

    async insertOrder(row) {
      await ready();
      try {
        await client.query(
          `INSERT INTO orders (
            order_id, request_id, email, plan, method, amount, transfer_code, status, created_at, expires_at,
            crypto_chain, crypto_asset, crypto_units, crypto_rate, crypto_suffix, crypto_source, ref_code, ref_bps
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending', $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)`,
          [
            row.orderId, row.requestId, row.email, row.plan, row.method, row.amount, row.transferCode, row.createdAt, row.expiresAt,
            row.cryptoChain, row.cryptoAsset, row.cryptoUnits, row.cryptoRate, row.cryptoSuffix, row.cryptoSource, row.refCode, row.refBps,
          ],
        );
      } catch (error) {
        if (isUniqueViolation(error, "orders_crypto_amount")) throw new CryptoAmountTaken();
        throw error;
      }
    },

    getOrder: (orderId, now) => readOrder("order_id", orderId, now),
    getByTransfer: (code, now) => readOrder("transfer_code", code, now),

    async getByLicense(hash) {
      await ready();
      const row = await one(client, "SELECT * FROM orders WHERE license_hash = $1 AND status = 'paid' LIMIT 1", [hash]);
      return row ? fromSql(row, row.paid_at ?? 0) : null;
    },

    async setMomo(orderId, payUrl, deeplink, qrCodeUrl) {
      await ready();
      await client.query("UPDATE orders SET pay_url = $1, deeplink = $2, qr_code_url = $3 WHERE order_id = $4", [payUrl, deeplink, qrCodeUrl, orderId]);
    },

    async cryptoTaken(chain, asset, units, exceptId) {
      await ready();
      const found = await client.query(
        "SELECT 1 FROM orders WHERE crypto_chain = $1 AND crypto_asset = $2 AND crypto_units = $3 AND order_id <> $4 LIMIT 1",
        [chain, asset, units, exceptId],
      );
      return found.rows.length > 0;
    },

    async setCryptoQuote(orderId, quote) {
      await ready();
      try {
        return await client.transaction(async (tx) => {
          const current = await one(tx, "SELECT * FROM orders WHERE order_id = $1 FOR UPDATE", [orderId]);
          if (!current || current.status !== "pending" || (current.crypto_tx ?? "") !== "") return false;
          const updated = await tx.query(
            `UPDATE orders
             SET crypto_chain = $1, crypto_asset = $2, crypto_units = $3, crypto_rate = $4, crypto_suffix = $5, crypto_source = $6
             WHERE order_id = $7 AND status = 'pending' AND COALESCE(crypto_tx, '') = ''`,
            [quote.chain, quote.asset, quote.units, quote.rate, quote.suffix, quote.source, orderId],
          );
          return updated.rowCount > 0;
        });
      } catch (error) {
        if (isUniqueViolation(error, "orders_crypto_amount")) return false;
        throw error;
      }
    },

    async setCryptoTx(orderId, tx) {
      await ready();
      await client.query("UPDATE orders SET crypto_tx = $1 WHERE order_id = $2 AND status = 'pending'", [tx, orderId]);
    },

    async listPendingCrypto(now) {
      await ready();
      const rows = (await client.query(
        `SELECT * FROM orders
         WHERE method = 'crypto' AND status = 'pending' AND COALESCE(crypto_tx, '') <> ''
         ORDER BY created_at ASC
         LIMIT 20`,
      )).rows.map(toSqlOrder);
      const out: OrderRow[] = [];
      for (const row of rows) {
        const order = fromSql(row, now);
        if (order.status === "expired") {
          await client.query("UPDATE orders SET status = 'expired' WHERE order_id = $1 AND status = 'pending'", [order.orderId]);
          continue;
        }
        if (order.cryptoTx) out.push(order);
      }
      return out;
    },

    async eventOrder(kind, id) {
      await ready();
      const row = (await client.query<{ order_id: string }>("SELECT order_id FROM payment_events WHERE event_kind = $1 AND event_id = $2", [kind, id])).rows[0];
      return row?.order_id ?? null;
    },

    async markPaid(orderId, now, amount, transId, eventKind, eventId): Promise<MarkPaid> {
      await ready();
      return client.transaction(async (tx): Promise<MarkPaid> => {
        const current = await one(tx, "SELECT * FROM orders WHERE order_id = $1 FOR UPDATE", [orderId]);
        if (!current) return { ok: false, error: "not_found" };
        const order = fromSql(current, now);
        if (order.amount !== amount) return { ok: false, error: "amount" };
        if (order.status === "paid" && order.licenseKey) {
          return { ok: true, applied: false, licenseKey: order.licenseKey, expiresAt: (order.paidAt ?? now) + termMs(order) };
        }
        if (order.status === "expired" || now > order.expiresAt) {
          await tx.query("UPDATE orders SET status = 'expired' WHERE order_id = $1 AND status = 'pending'", [orderId]);
          return { ok: false, error: "expired" };
        }
        if (current.status !== "pending") return { ok: false, error: "duplicate" };
        const event = await tx.query(
          "INSERT INTO payment_events (event_kind, event_id, order_id) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING",
          [eventKind, eventId, orderId],
        );
        if (event.rowCount === 0) return { ok: false, error: "duplicate" };
        const licenseKey = newLicenseKey();
        const paid = await tx.query(
          `UPDATE orders SET status = 'paid', paid_at = $1, momo_trans_id = $2, license_key = $3, license_hash = $4
           WHERE order_id = $5 AND status = 'pending'`,
          [now, transId, licenseKey, hashKey(licenseKey), orderId],
        );
        if (paid.rowCount === 0) throw new Error("order changed while row was locked");
        if (order.refCode && order.refBps && order.refBps > 0) {
          await tx.query(
            `INSERT INTO affiliate_commissions (order_id, code, amount, commission, status, created_at)
             VALUES ($1, $2, $3, $4, 'accrued', $5) ON CONFLICT DO NOTHING`,
            [order.orderId, order.refCode, order.amount, Math.floor((order.amount * order.refBps) / 10_000), now],
          );
        }
        return { ok: true, applied: true, licenseKey, expiresAt: now + termMs(order) };
      });
    },

    async ensureAffiliate(ownerHash, email, now) {
      await ready();
      const byOwner = async () => (await client.query<{ code: string }>("SELECT code FROM affiliates WHERE owner_hash = $1", [ownerHash])).rows[0];
      const existing = await byOwner();
      if (existing) {
        if (email) await client.query("UPDATE affiliates SET email = $1 WHERE owner_hash = $2 AND (email IS NULL OR email = '')", [email, ownerHash]);
        return { code: existing.code };
      }
      for (let attempt = 0; attempt < 5; attempt += 1) {
        const code = newAffiliateCode();
        const inserted = await client.query(
          "INSERT INTO affiliates (code, owner_hash, email, created_at) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING",
          [code, ownerHash, email, now],
        );
        if (inserted.rowCount > 0) return { code };
        const again = await byOwner();
        if (again) return { code: again.code };
      }
      throw new Error("affiliate code");
    },

    async affiliateOfCode(code) {
      await ready();
      const row = (await client.query<{ code: string; owner_hash: string; email: string | null }>(
        "SELECT code, owner_hash, email FROM affiliates WHERE code = $1",
        [code],
      )).rows[0];
      return row ? { code: row.code, ownerHash: row.owner_hash, email: row.email } : null;
    },

    async recordVisit(code, visitorHash, now) {
      await ready();
      const inserted = await client.query(
        "INSERT INTO affiliate_visits (code, visitor_hash, created_at) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING",
        [code, visitorHash, now],
      );
      return inserted.rowCount > 0;
    },

    async affiliateStats(code, now) {
      await ready();
      return stats(code, now);
    },

    async listAffiliates(now) {
      await ready();
      const rows = (await client.query<{ code: string; email: string | null; created_at: unknown }>(
        "SELECT code, email, created_at FROM affiliates ORDER BY created_at ASC",
      )).rows;
      return Promise.all(rows.map(async (row) => ({ code: row.code, email: row.email, createdAt: num(row.created_at), ...(await stats(row.code, now)) })));
    },

    async approveAffiliate(code, now) {
      await ready();
      const approved = await client.query<{ commission: unknown }>(
        "UPDATE affiliate_commissions SET status = 'approved', approved_at = $1 WHERE code = $2 AND status = 'accrued' RETURNING commission",
        [now, code],
      );
      return { count: approved.rows.length, amount: approved.rows.reduce((sum, row) => sum + num(row.commission), 0) };
    },
  };
}
