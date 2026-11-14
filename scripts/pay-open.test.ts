/**
 * Live deploys never take an order whose money would go to a placeholder: the public MoMo
 * sandbox key, the sample bank account, or a sample crypto wallet. Locally everything stays open.
 * Run with: tsx scripts/pay-open.test.ts
 */
import assert from "node:assert/strict";
import { payEnv } from "../server/pay/env.ts";
import { handlePremium, openMethods } from "../server/pay/handlers.ts";
import { closeTestClients, withTestStore } from "./testDb.ts";

const clock = 1_800_000_000_000;
const noFetch = (async () => {
  throw new Error("no network in this test");
}) as typeof fetch;

async function call(env: ReturnType<typeof payEnv>, path: string, body?: unknown): Promise<{ status: number; json: Record<string, unknown> }> {
  const res = await handlePremium(new Request(`http://pay.local${path}`, body === undefined ? {} : { method: "POST", body: JSON.stringify(body) }), env);
  return { status: res.status, json: (await res.json()) as Record<string, unknown> };
}

const order = (method: string, chain?: string) => ({ email: "hoc.sinh@example.vn", plan: "month", method, ...(chain ? { chain } : {}) });

// 1. Live, nothing configured (today's production): every way to pay is closed, and refused.
const bare = withTestStore(payEnv({ VERCEL_ENV: "production", CRYPTO_RATE_URL: "" }, () => clock, noFetch));
const bareOpen = openMethods(bare);
assert.deepEqual(bareOpen, { wallet: false, qr: false, bank: false, crypto: { "tron-usdt": false, "bsc-usdt": false, "bsc-usdc": false, "sol-usdc": false } });
assert.deepEqual((await call(bare, "/api/premium/plans")).json.open, bareOpen, "the page is told what is closed");
assert.equal((await call(bare, "/api/premium/create", order("bank"))).json.error, "bank_not_configured");
assert.equal((await call(bare, "/api/premium/create", order("bank"))).status, 503);
for (const chain of ["tron-usdt", "bsc-usdt", "bsc-usdc", "sol-usdc"]) {
  const res = await call(bare, "/api/premium/create", order("crypto", chain));
  assert.deepEqual([res.status, res.json.error], [503, "crypto_not_configured"], chain);
}
for (const method of ["wallet", "qr"]) assert.equal((await call(bare, "/api/premium/create", order(method))).status, 503, method);

// 2. Live with a real bank account and one real wallet: exactly those open.
const bank = withTestStore(payEnv({
  VERCEL_ENV: "production",
  BANK_BIN: "970436",
  BANK_ACCOUNT_NO: "1234567890",
  BANK_ACCOUNT_NAME: "NGUYEN VAN A",
  BANK_NAME: "Vietcombank",
  CRYPTO_TRON_ADDRESS: "TLa2f6VPqDgRE67v1736s7bJ8Ray5wYjU7",
  CRYPTO_RATE_URL: "",
}, () => clock, noFetch));
const bankOpen = openMethods(bank);
assert.deepEqual([bankOpen.wallet, bankOpen.qr, bankOpen.bank], [false, false, true]);
assert.deepEqual(bankOpen.crypto, { "tron-usdt": true, "bsc-usdt": false, "bsc-usdc": false, "sol-usdc": false });
const transfer = await call(bank, "/api/premium/create", order("bank"));
assert.equal(transfer.status, 200, JSON.stringify(transfer.json));
assert.equal((transfer.json.bank as { accountNo?: string }).accountNo, "1234567890", "the real account is shown");
assert.equal((await call(bank, "/api/premium/create", order("crypto", "tron-usdt"))).status, 200, "real TRON wallet takes orders");
assert.equal((await call(bank, "/api/premium/create", order("crypto", "sol-usdc"))).json.error, "crypto_not_configured", "sample Solana wallet still refused");

// 3. Local / preview (not live): everything open, so the flow can be tried with sample values.
const local = withTestStore(payEnv({ PAY_LIVE: "0", CRYPTO_RATE_URL: "" }, () => clock, noFetch));
const localOpen = openMethods(local);
assert.ok(localOpen.wallet && localOpen.qr && localOpen.bank && Object.values(localOpen.crypto).every(Boolean));
assert.equal((await call(local, "/api/premium/create", order("bank"))).status, 200);

await closeTestClients();
console.log("pay open ok");
