import { createHash, randomBytes } from "node:crypto";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { DatabaseSync } from "node:sqlite";
import type { PayMethod, PlanId } from "./env.ts";

export type OrderStatus = "pending" | "paid" | "expired";

export type OrderRow = {
  orderId: string;
  requestId: string;
  email: string;
  plan: PlanId;
  method: PayMethod;
  amount: number;
  transferCode: string;
  status: OrderStatus;
  createdAt: number;
  expiresAt: number;
  paidAt: number | null;
  momoTransId: string | null;
  licenseKey: string | null;
  licenseHash: string | null;
  payUrl: string;
  deeplink: string;
  qrCodeUrl: string;
  cryptoChain: string | null;
  cryptoAsset: string | null;
  cryptoUnits: string | null;
  cryptoRate: number | null;
  cryptoSuffix: number | null;
  cryptoSource: "live" | "config" | null;
  cryptoTx: string | null;
};

export type CryptoQuoteRow = {
  chain: string;
  asset: string;
  units: string;
  rate: number;
  suffix: number;
  source: "live" | "config";
};

export type MarkPaid =
  | { ok: true; applied: boolean; licenseKey: string; expiresAt: number }
  | { ok: false; error: "not_found" | "expired" | "amount" | "duplicate" };

type SqlOrder = {
  order_id: string;
  request_id: string;
  email: string;
  plan: string;
  method: string;
  amount: number;
  transfer_code: string;
  status: string;
  created_at: number;
  expires_at: number;
  paid_at: number | null;
  momo_trans_id: string | null;
  license_key: string | null;
  license_hash: string | null;
  pay_url: string | null;
  deeplink: string | null;
  qr_code_url: string | null;
  crypto_chain: string | null;
  crypto_asset: string | null;
  crypto_units: string | null;
  crypto_rate: number | null;
  crypto_suffix: number | null;
  crypto_source: string | null;
  crypto_tx: string | null;
};

export type PayStore = {
  insertOrder(row: OrderRow): void;
  getOrder(orderId: string, now: number): OrderRow | null;
  getByTransfer(code: string, now: number): OrderRow | null;
  getByLicense(hash: string): OrderRow | null;
  setMomo(orderId: string, payUrl: string, deeplink: string, qrCodeUrl: string): void;
  cryptoTaken(chain: string, asset: string, units: string, exceptId: string): boolean;
  setCryptoQuote(orderId: string, quote: CryptoQuoteRow): boolean;
  setCryptoTx(orderId: string, tx: string): void;
  listPendingCrypto(now: number): OrderRow[];
  eventOrder(kind: string, id: string): string | null;
  markPaid(orderId: string, now: number, amount: number, transId: string | null, eventKind: string, eventId: string): MarkPaid;
};

function hashKey(key: string): string {
  return createHash("sha256").update(key).digest("hex");
}

export function newLicenseKey(): string {
  return `bt_${randomBytes(24).toString("base64url")}`;
}

function storedMethod(value: string): PayMethod {
  if (value === "qr" || value === "bank" || value === "crypto") return value;
  return "wallet";
}

function rateSource(value: string | null): "live" | "config" | null {
  if (value === "live" || value === "config") return value;
  return null;
}

function fromSql(row: SqlOrder, now: number): OrderRow {
  const expired = row.status === "pending" && now > row.expires_at;
  return {
    orderId: row.order_id,
    requestId: row.request_id,
    email: row.email,
    plan: row.plan === "year" ? "year" : "month",
    method: storedMethod(row.method),
    amount: row.amount,
    transferCode: row.transfer_code,
    status: expired ? "expired" : row.status === "paid" ? "paid" : "pending",
    createdAt: row.created_at,
    expiresAt: row.expires_at,
    paidAt: row.paid_at,
    momoTransId: row.momo_trans_id,
    licenseKey: row.license_key,
    licenseHash: row.license_hash,
    payUrl: row.pay_url ?? "",
    deeplink: row.deeplink ?? "",
    qrCodeUrl: row.qr_code_url ?? "",
    cryptoChain: row.crypto_chain,
    cryptoAsset: row.crypto_asset,
    cryptoUnits: row.crypto_units,
    cryptoRate: row.crypto_rate,
    cryptoSuffix: row.crypto_suffix,
    cryptoSource: rateSource(row.crypto_source),
    cryptoTx: row.crypto_tx,
  };
}

export function openStore(dbPath: string): PayStore {
  mkdirSync(dirname(dbPath), { recursive: true });
  const db = new DatabaseSync(dbPath);
  db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      order_id TEXT PRIMARY KEY,
      request_id TEXT NOT NULL,
      email TEXT NOT NULL,
      plan TEXT NOT NULL,
      method TEXT NOT NULL,
      amount INTEGER NOT NULL,
      transfer_code TEXT NOT NULL UNIQUE,
      status TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      expires_at INTEGER NOT NULL,
      paid_at INTEGER,
      momo_trans_id TEXT,
      license_key TEXT,
      license_hash TEXT
    );
    CREATE TABLE IF NOT EXISTS payment_events (
      event_kind TEXT NOT NULL,
      event_id TEXT NOT NULL,
      order_id TEXT NOT NULL,
      PRIMARY KEY (event_kind, event_id)
    );
    CREATE INDEX IF NOT EXISTS orders_license ON orders (license_hash);
  `);
  const columns = new Set((db.prepare("PRAGMA table_info(orders)").all() as { name: string }[]).map((column) => column.name));
  const added: [string, string][] = [
    ["pay_url", "TEXT"],
    ["deeplink", "TEXT"],
    ["qr_code_url", "TEXT"],
    ["crypto_chain", "TEXT"],
    ["crypto_asset", "TEXT"],
    ["crypto_units", "TEXT"],
    ["crypto_rate", "INTEGER"],
    ["crypto_suffix", "INTEGER"],
    ["crypto_source", "TEXT"],
    ["crypto_tx", "TEXT"],
  ];
  for (const [name, type] of added) {
    if (!columns.has(name)) db.exec(`ALTER TABLE orders ADD COLUMN ${name} ${type}`);
  }

  const insert = db.prepare(`
    INSERT INTO orders (
      order_id, request_id, email, plan, method, amount, transfer_code, status, created_at, expires_at,
      crypto_chain, crypto_asset, crypto_units, crypto_rate, crypto_suffix, crypto_source
    ) VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const byId = db.prepare("SELECT * FROM orders WHERE order_id = ?");
  const byTransfer = db.prepare("SELECT * FROM orders WHERE transfer_code = ?");
  const byLicense = db.prepare("SELECT * FROM orders WHERE license_hash = ? AND status = 'paid'");
  const expire = db.prepare("UPDATE orders SET status = 'expired' WHERE order_id = ? AND status = 'pending'");
  const insertEvent = db.prepare("INSERT INTO payment_events (event_kind, event_id, order_id) VALUES (?, ?, ?)");
  const setMomo = db.prepare("UPDATE orders SET pay_url = ?, deeplink = ?, qr_code_url = ? WHERE order_id = ?");
  const taken = db.prepare(`
    SELECT order_id FROM orders
    WHERE crypto_chain = ? AND crypto_asset = ? AND crypto_units = ? AND order_id != ?
    LIMIT 1
  `);
  const setQuote = db.prepare(`
    UPDATE orders
    SET crypto_chain = ?, crypto_asset = ?, crypto_units = ?, crypto_rate = ?, crypto_suffix = ?, crypto_source = ?
    WHERE order_id = ? AND status = 'pending' AND IFNULL(crypto_tx, '') = ''
  `);
  const setTx = db.prepare("UPDATE orders SET crypto_tx = ? WHERE order_id = ? AND status = 'pending'");
  const pendingCrypto = db.prepare(`
    SELECT * FROM orders
    WHERE method = 'crypto' AND status = 'pending' AND IFNULL(crypto_tx, '') != ''
    ORDER BY created_at ASC
    LIMIT 20
  `);
  const eventOf = db.prepare("SELECT order_id FROM payment_events WHERE event_kind = ? AND event_id = ?");
  const pay = db.prepare(`
    UPDATE orders
    SET status = 'paid', paid_at = ?, momo_trans_id = ?, license_key = ?, license_hash = ?
    WHERE order_id = ? AND status = 'pending'
  `);

  function read(stmt: { get: (...args: string[]) => unknown }, key: string, now: number): OrderRow | null {
    const row = stmt.get(key) as SqlOrder | undefined;
    if (!row) return null;
    const order = fromSql(row, now);
    if (order.status === "expired" && row.status === "pending") expire.run(order.orderId);
    return order;
  }

  return {
    insertOrder(row) {
      insert.run(
        row.orderId,
        row.requestId,
        row.email,
        row.plan,
        row.method,
        row.amount,
        row.transferCode,
        row.createdAt,
        row.expiresAt,
        row.cryptoChain,
        row.cryptoAsset,
        row.cryptoUnits,
        row.cryptoRate,
        row.cryptoSuffix,
        row.cryptoSource,
      );
    },
    getOrder(orderId, now) {
      return read(byId, orderId, now);
    },
    getByTransfer(code, now) {
      return read(byTransfer, code, now);
    },
    getByLicense(hash) {
      const row = byLicense.get(hash) as SqlOrder | undefined;
      return row ? fromSql(row, row.paid_at ?? 0) : null;
    },
    setMomo(orderId, payUrl, deeplink, qrCodeUrl) {
      setMomo.run(payUrl, deeplink, qrCodeUrl, orderId);
    },
    cryptoTaken(chain, asset, units, exceptId) {
      return taken.get(chain, asset, units, exceptId) !== undefined;
    },
    setCryptoQuote(orderId, quote) {
      db.exec("BEGIN IMMEDIATE");
      try {
        const current = byId.get(orderId) as SqlOrder | undefined;
        if (!current || current.status !== "pending" || (current.crypto_tx ?? "") !== "") {
          db.exec("ROLLBACK");
          return false;
        }
        if (taken.get(quote.chain, quote.asset, quote.units, orderId) !== undefined) {
          db.exec("ROLLBACK");
          return false;
        }
        const result = setQuote.run(quote.chain, quote.asset, quote.units, quote.rate, quote.suffix, quote.source, orderId) as { changes: number };
        if (!result.changes) {
          db.exec("ROLLBACK");
          return false;
        }
        db.exec("COMMIT");
        return true;
      } catch (error) {
        try {
          db.exec("ROLLBACK");
        } catch {
          /* already closed */
        }
        throw error;
      }
    },
    setCryptoTx(orderId, tx) {
      setTx.run(tx, orderId);
    },
    listPendingCrypto(now) {
      return (pendingCrypto.all() as SqlOrder[]).map((row) => {
        const order = fromSql(row, now);
        if (order.status === "expired" && row.status === "pending") expire.run(order.orderId);
        return order;
      }).filter((order) => order.status === "pending" && order.cryptoTx);
    },
    eventOrder(kind, id) {
      const row = eventOf.get(kind, id) as { order_id: string } | undefined;
      return row?.order_id ?? null;
    },
    markPaid(orderId, now, amount, transId, eventKind, eventId) {
      db.exec("BEGIN IMMEDIATE");
      try {
        const current = byId.get(orderId) as SqlOrder | undefined;
        if (!current) {
          db.exec("ROLLBACK");
          return { ok: false, error: "not_found" };
        }
        const order = fromSql(current, now);
        if (order.amount !== amount) {
          db.exec("ROLLBACK");
          return { ok: false, error: "amount" };
        }
        if (order.status === "paid" && order.licenseKey) {
          db.exec("ROLLBACK");
          const term = order.plan === "year" ? 365 : 30;
          return { ok: true, applied: false, licenseKey: order.licenseKey, expiresAt: (order.paidAt ?? now) + term * 86_400_000 };
        }
        if (order.status === "expired" || now > order.expiresAt) {
          expire.run(orderId);
          db.exec("COMMIT");
          return { ok: false, error: "expired" };
        }
        try {
          insertEvent.run(eventKind, eventId, orderId);
        } catch {
          db.exec("ROLLBACK");
          return { ok: false, error: "duplicate" };
        }
        const licenseKey = newLicenseKey();
        const result = pay.run(now, transId, licenseKey, hashKey(licenseKey), orderId) as { changes: number };
        if (!result.changes) {
          db.exec("ROLLBACK");
          return { ok: false, error: "duplicate" };
        }
        db.exec("COMMIT");
        const term = order.plan === "year" ? 365 : 30;
        return { ok: true, applied: true, licenseKey, expiresAt: now + term * 86_400_000 };
      } catch (error) {
        try {
          db.exec("ROLLBACK");
        } catch {
          /* already closed */
        }
        throw error;
      }
    },
  };
}

const stores = new Map<string, PayStore>();

export function storeFor(dbPath: string): PayStore {
  const existing = stores.get(dbPath);
  if (existing) return existing;
  const opened = openStore(dbPath);
  stores.set(dbPath, opened);
  return opened;
}

export function licenseHash(key: string): string {
  return hashKey(key);
}
