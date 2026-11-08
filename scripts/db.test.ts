/**
 * Postgres: lược đồ theo phiên bản, kho đơn hàng, bộ đếm chat chung, và công cụ chép từ SQLite.
 * Mặc định chạy trên PGlite; PAY_TEST_STORE=postgres TEST_DATABASE_URL=... thì chạy trên máy chủ Postgres qua `pg`.
 * Run with: tsx scripts/db.test.ts
 */
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { QUOTA_KEEP_MS, pgQuota } from "../server/chat/limit.ts";
import { MIGRATIONS, migrate } from "../server/db/schema.ts";
import { payEnv } from "../server/pay/env.ts";
import { pgStore } from "../server/pay/pgStore.ts";
import { CryptoAmountTaken, openStore, storeFor, type OrderRow } from "../server/pay/store.ts";
import { copySqliteToPg } from "./dbTools.ts";
import { testClient } from "./testDb.ts";

const NOW = 1_800_000_000_000;

function order(id: string, over: Partial<OrderRow> = {}): OrderRow {
  return {
    orderId: id, requestId: `r-${id}`, email: "hoc@sinh.vn", plan: "month", method: "bank", amount: 49_000,
    transferCode: `BT${id.padStart(8, "0").slice(-8).toUpperCase()}`, status: "pending", createdAt: NOW, expiresAt: NOW + 15 * 60_000,
    paidAt: null, momoTransId: null, licenseKey: null, licenseHash: null, payUrl: "", deeplink: "", qrCodeUrl: "",
    cryptoChain: null, cryptoAsset: null, cryptoUnits: null, cryptoRate: null, cryptoSuffix: null, cryptoSource: null, cryptoTx: null,
    refCode: null, refBps: null, ...over,
  };
}

/* ---------- lược đồ ---------- */
const client = testClient();
assert.deepEqual(await migrate(client, () => NOW), MIGRATIONS.map((_, index) => index + 1));
assert.deepEqual(await migrate(client), [], "migrate chạy lại không làm gì");
assert.deepEqual(await Promise.all([migrate(client), migrate(client)]), [[], []], "hai lần song song vẫn an toàn");
const tables = (await client.query<{ table_name: string }>("SELECT table_name FROM information_schema.tables WHERE table_schema = current_schema() ORDER BY 1")).rows.map((row) => row.table_name);
assert.deepEqual(tables, ["affiliate_commissions", "affiliate_visits", "affiliates", "chat_hits", "orders", "payment_events", "schema_migrations"]);

/* ---------- kho đơn ---------- */
const store = pgStore(client);
assert.equal(store.kind, "postgres");
await store.insertOrder(order("a1", { refCode: "REF1", refBps: 1000 }));
const read = await store.getOrder("a1", NOW);
assert.ok(read);
assert.equal(typeof read.amount, "number", "BIGINT về number");
assert.equal(read.expiresAt, NOW + 15 * 60_000);
assert.equal((await store.getByTransfer(read.transferCode, NOW))?.orderId, "a1");

// Hai xác nhận cùng lúc cho một đơn: chỉ một lần cấp mã, lần kia nhận lại đúng mã đó.
const [first, second] = await Promise.all([
  store.markPaid("a1", NOW + 1000, 49_000, null, "bank", "tx-1"),
  store.markPaid("a1", NOW + 1000, 49_000, null, "bank", "tx-2"),
]);
assert.ok(first.ok && second.ok);
assert.equal([first, second].filter((item) => item.ok && item.applied).length, 1);
assert.equal(first.ok && second.ok && first.licenseKey, second.ok && second.licenseKey);
const replay = await store.markPaid("a1", NOW + 2000, 49_000, null, "bank", "tx-1");
assert.ok(replay.ok && !replay.applied, "sự kiện đã xử lý thì không cấp lần hai");
assert.equal((await store.getByLicense(read.licenseHash ?? "x")), null);
const paid = await store.getOrder("a1", NOW + 3000);
assert.equal(paid?.status, "paid");
assert.equal(paid?.paidAt, NOW + 1000);
assert.equal((await client.query("SELECT * FROM affiliate_commissions WHERE order_id = 'a1'")).rows.length, 1, "hoa hồng ghi đúng một lần");

await store.insertOrder(order("a2"));
assert.deepEqual(await store.markPaid("a2", NOW, 1, null, "bank", "tx-3"), { ok: false, error: "amount" });
assert.deepEqual(await store.markPaid("a2", NOW + 60 * 60_000, 49_000, null, "bank", "tx-3"), { ok: false, error: "expired" });
assert.equal((await store.getOrder("a2", NOW))?.status, "expired");
assert.deepEqual(await store.markPaid("nope", NOW, 1, null, "bank", "tx-4"), { ok: false, error: "not_found" });

// Số token tiền mã hóa là duy nhất kể cả khi hai đơn ghi cùng lúc.
const crypto = { method: "crypto" as const, cryptoChain: "bsc", cryptoAsset: "USDT", cryptoUnits: "1960001", cryptoRate: 25_000.5, cryptoSuffix: 1, cryptoSource: "config" as const };
await store.insertOrder(order("c1", crypto));
await assert.rejects(store.insertOrder(order("c2", crypto)), CryptoAmountTaken);
assert.equal(await store.cryptoTaken("bsc", "USDT", "1960001", ""), true);
assert.equal(await store.cryptoTaken("bsc", "USDT", "1960001", "c1"), false);
assert.equal((await store.getOrder("c1", NOW))?.cryptoRate, 25_000.5, "tỷ giá lẻ giữ nguyên");
await store.insertOrder(order("c3", { ...crypto, cryptoUnits: "1960002" }));
assert.equal(await store.setCryptoQuote("c3", { chain: "bsc", asset: "USDT", units: "1960001", rate: 25_000, suffix: 2, source: "config" }), false, "đổi sang số đã có đơn giữ thì từ chối");
assert.equal(await store.setCryptoQuote("c3", { chain: "bsc", asset: "USDT", units: "1960003", rate: 25_000, suffix: 3, source: "config" }), true);
await store.setCryptoTx("c3", "0xabc");
assert.deepEqual((await store.listPendingCrypto(NOW)).map((item) => item.orderId), ["c3"]);
assert.equal(await store.setCryptoQuote("c3", { chain: "bsc", asset: "USDT", units: "1960004", rate: 25_000, suffix: 4, source: "config" }), false, "đã có giao dịch thì khóa báo giá");

// Giới thiệu bạn bè.
const aff = await store.ensureAffiliate("owner-1", null, NOW);
assert.deepEqual(await store.ensureAffiliate("owner-1", "a@b.vn", NOW), aff, "một chủ một mã");
assert.equal((await store.affiliateOfCode(aff.code))?.email, "a@b.vn");
assert.equal(await store.recordVisit(aff.code, "v1", NOW), true);
assert.equal(await store.recordVisit(aff.code, "v1", NOW), false);
await client.query("UPDATE orders SET ref_code = $1 WHERE order_id = 'a1'", [aff.code]);
await client.query("UPDATE affiliate_commissions SET code = $1", [aff.code]);
assert.deepEqual(await store.affiliateStats(aff.code, NOW), { visits: 1, ordersPending: 0, ordersPaid: 1, commissionAccrued: 4900, commissionApproved: 0 });
assert.deepEqual(await store.approveAffiliate(aff.code, NOW), { count: 1, amount: 4900 });
assert.deepEqual(await store.approveAffiliate(aff.code, NOW), { count: 0, amount: 0 });
assert.equal((await store.listAffiliates(NOW))[0]?.commissionApproved, 4900);

/* ---------- bộ đếm chat dùng chung ---------- */
const quota = pgQuota(client);
const otherInstance = pgQuota(client);
await quota.add("day:1.2.3.4", NOW);
await otherInstance.add("day:1.2.3.4", NOW + 1);
assert.equal(await quota.used("day:1.2.3.4", NOW + 2, 86_400_000), 2, "hai instance thấy cùng số lượt");
assert.equal(await quota.used("day:1.2.3.4", NOW + 86_400_000 + 5, 86_400_000), 0, "ngoài cửa sổ thì không đếm");
await quota.add("day:1.2.3.4", NOW + QUOTA_KEEP_MS + 10);
assert.equal(num((await client.query<{ n: unknown }>("SELECT COUNT(*) AS n FROM chat_hits")).rows[0]?.n), 1, "lượt quá cũ bị dọn");

/* ---------- chọn kho theo cấu hình ---------- */
const dir = mkdtempSync(join(tmpdir(), "ban-toan-db-"));
assert.equal(storeFor({ databaseUrl: "", dbPath: join(dir, "a.sqlite") }).kind, "sqlite");
assert.equal(storeFor({ databaseUrl: "postgres://u:p@127.0.0.1:1/x", dbPath: "" }).kind, "postgres", "có DATABASE_URL thì dùng Postgres (chưa kết nối ngay)");
assert.equal(payEnv({ DATABASE_URL: " postgres://a " }).databaseUrl, "postgres://a");
assert.equal(payEnv({ POSTGRES_URL: "postgres://b" }).databaseUrl, "postgres://b");
assert.equal(payEnv({}).databaseUrl, "");

/* ---------- chép SQLite sang Postgres ---------- */
const sqlitePath = join(dir, "old.sqlite");
const old = openStore(sqlitePath);
await old.insertOrder(order("s1"));
await old.insertOrder(order("s2"));
await old.markPaid("s1", NOW + 1, 49_000, null, "bank", "old-tx");
const oldAff = await old.ensureAffiliate("old-owner", "x@y.vn", NOW);
await old.recordVisit(oldAff.code, "vv", NOW);
const target = testClient();
const report = await copySqliteToPg(sqlitePath, target);
assert.deepEqual(report.orders, { read: 2, inserted: 2 });
assert.deepEqual(report.payment_events, { read: 1, inserted: 1 });
assert.deepEqual(report.affiliate_visits, { read: 1, inserted: 1 });
assert.deepEqual((await copySqliteToPg(sqlitePath, target)).orders, { read: 2, inserted: 0 }, "chạy lại không nhân đôi");
const moved = pgStore(target);
const s1 = await moved.getOrder("s1", NOW + 2);
assert.equal(s1?.status, "paid");
assert.ok(s1?.licenseHash && (await moved.getByLicense(s1.licenseHash))?.orderId === "s1", "mã kích hoạt cũ vẫn dùng được");
assert.deepEqual(await moved.markPaid("s1", NOW + 3, 49_000, null, "bank", "old-tx"), { ok: true, applied: false, licenseKey: s1.licenseKey, expiresAt: NOW + 1 + 30 * 86_400_000 });

await client.close();
await target.close();
console.log("db ok");

function num(value: unknown): number {
  return Number(value);
}
