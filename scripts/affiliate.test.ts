import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { commissionOf, sameReferrer } from "../server/pay/affiliate.ts";
import { payEnv, type PayEnv } from "../server/pay/env.ts";
import { handlePremium } from "../server/pay/handlers.ts";
import { withTestStore } from "./testDb.ts";

const fails: string[] = [];
function assert(cond: boolean, message: string): void {
  if (!cond) fails.push(message);
}

assert(commissionOf(49_000, 1000) === 4900, "10% of 49000");
assert(commissionOf(49_000, 0) === 0, "zero rate");
assert(commissionOf(100, 1500) === 15, "floor 1.5%");
assert(sameReferrer("aa", "aa", "a@b.c", null) === true, "same owner");
assert(sameReferrer("aa", "bb", "hoc@example.com", "hoc@example.com") === true, "same email");
assert(sameReferrer(null, "bb", "khac@example.com", "hoc@example.com") === false, "different buyer");

const dir = mkdtempSync(join(tmpdir(), "ban-toan-aff-"));
let clock = 1_700_000_000_000;
const env: PayEnv = withTestStore(payEnv({
  PREMIUM_PRICE_MONTH: "49000",
  PREMIUM_PRICE_YEAR: "399000",
  PUBLIC_BASE_URL: "http://pay.local",
  ADMIN_TOKEN: "admin-secret",
  AFFILIATE_RATE_BPS: "1000",
  PREMIUM_DB_PATH: join(dir, "aff.sqlite"),
  BANK_WEBHOOK_SECRET: "hook",
}, () => clock, async () => {
  throw new Error("offline");
}));

async function post(path: string, body: unknown, headers: Record<string, string> = {}): Promise<{ status: number; json: Record<string, unknown> }> {
  const res = await handlePremium(new Request(`http://pay.local${path}`, {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: JSON.stringify(body),
  }), env);
  return { status: res.status, json: await res.json() as Record<string, unknown> };
}

const owner = "owner-secret-0001";
const buyer = "buyer-secret-0002";
const opened = await post("/api/premium/affiliate", { action: "open", ownerSecret: owner, email: "ban@example.com" });
assert(opened.status === 200, "open");
const code = String(opened.json.code);
assert(/^[A-Z0-9]{8}$/.test(code), "code shape");
assert(opened.json.sampleMonth === 4900, "sample month commission");

const again = await post("/api/premium/affiliate", { action: "open", ownerSecret: owner });
assert(again.json.code === code, "same owner keeps the code");

const visit = await post("/api/premium/affiliate", { action: "visit", code, visitorId: "visitor-000000000001" });
assert(visit.json.recorded === true, "first visit");
const repeat = await post("/api/premium/affiliate", { action: "visit", code, visitorId: "visitor-000000000001" });
assert(repeat.json.recorded === false, "duplicate visit");
const selfVisit = await post("/api/premium/affiliate", { action: "visit", code, visitorId: "visitor-000000000099", ownerSecret: owner });
assert(selfVisit.json.recorded === false, "owner visit ignored");

const selfOrder = await post("/api/premium/create", {
  email: "ban@example.com",
  plan: "month",
  method: "bank",
  ref: code,
  ownerSecret: owner,
});
assert(selfOrder.status === 200, "self order created");
await post("/api/premium/confirm", { orderId: selfOrder.json.orderId }, { authorization: "Bearer admin-secret" });

const friend = await post("/api/premium/create", {
  email: "banbe@example.com",
  plan: "month",
  method: "bank",
  ref: code,
  ownerSecret: buyer,
});
assert(friend.status === 200, "friend order");
const beforePay = await post("/api/premium/affiliate", { action: "stats", ownerSecret: owner });
assert(beforePay.json.commissionAccrued === 0, "no commission before payment");
assert(beforePay.json.ordersPending === 1, "one pending order");
assert(beforePay.json.visits === 1, "one visit");

const paid = await post("/api/premium/confirm", { orderId: friend.json.orderId }, { authorization: "Bearer admin-secret" });
assert(paid.json.applied === true, "friend paid");
const againPay = await post("/api/premium/confirm", { orderId: friend.json.orderId }, { authorization: "Bearer admin-secret" });
assert(againPay.json.applied === false, "second confirm does not apply again");

const after = await post("/api/premium/affiliate", { action: "stats", ownerSecret: owner });
assert(after.json.ordersPaid === 1, "one paid order");
assert(after.json.commissionAccrued === 4900, "10% accrued once");
assert(after.json.commissionApproved === 0, "not approved yet");

const noAdmin = await post("/api/premium/affiliate-admin", { action: "list" });
assert(noAdmin.status === 401, "admin list needs token");
const listed = await post("/api/premium/affiliate-admin", { action: "list" }, { authorization: "Bearer admin-secret" });
assert(listed.status === 200, "admin list");
const rows = listed.json.affiliates as { code: string }[];
assert(rows.some((row) => row.code === code), "code listed");
assert(!JSON.stringify(listed.json).includes(owner), "owner secret not in admin list");

const approved = await post("/api/premium/affiliate-admin", { action: "approve", code }, { authorization: "Bearer admin-secret" });
assert(approved.json.transferred === false, "no automatic transfer");
assert(approved.json.count === 1 && approved.json.amount === 4900, "approved the accrued row");
const done = await post("/api/premium/affiliate", { action: "stats", ownerSecret: owner });
assert(done.json.commissionAccrued === 0 && done.json.commissionApproved === 4900, "moved to approved");
const twice = await post("/api/premium/affiliate-admin", { action: "approve", code }, { authorization: "Bearer admin-secret" });
assert(twice.json.count === 0 && twice.json.amount === 0, "second approval is empty");

const stranger = await post("/api/premium/create", {
  email: "la@example.com",
  plan: "month",
  method: "bank",
  ref: "KHONGTONTAI",
});
assert(stranger.status === 200, "unknown ref still creates the order");

if (fails.length) {
  console.error(fails.join("\n"));
  process.exit(1);
}
console.log("affiliate ok");
