/**
 * Crypto Premium: VND quote, payment URI, mocked chain checks, idempotency, expiry.
 * Run with: tsx scripts/crypto.test.ts
 */
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  SAMPLE_BSC_ADDRESS,
  SAMPLE_SOL_ADDRESS,
  SAMPLE_TRON_ADDRESS,
  TRANSFER_TOPIC,
  chainSpec,
  paymentUri,
  quoteUnits,
  toSmallest,
  tronTo20,
} from "../server/pay/crypto.ts";
import { payEnv, type PayEnv } from "../server/pay/env.ts";
import { handlePremium } from "../server/pay/handlers.ts";

const fails: string[] = [];
function assert(cond: boolean, message: string): void {
  if (!cond) fails.push(message);
}

const quoted = quoteUnits(49000, 25000, 1234);
assert(quoted.display === "1.961234", `quote display ${quoted.display}`);
assert(quoted.units6 === 1_961_234n, "quote units");
const bscSmallest = toSmallest(quoted.units6, 18);
assert(bscSmallest === 1_961_234n * 10n ** 12n, "BSC 18-decimal smallest unit");
assert(toSmallest(quoted.units6, 6) === quoted.units6, "6-decimal smallest unit");

const bsc = chainSpec("bsc-usdt");
const sol = chainSpec("sol-usdc");
const tron = chainSpec("tron-usdt");
assert(
  paymentUri(bsc, SAMPLE_BSC_ADDRESS, quoted.display, bscSmallest, "BT1")
    === `ethereum:${bsc.contract}@56/transfer?address=${SAMPLE_BSC_ADDRESS}&uint256=${bscSmallest.toString()}`,
  "EIP-681 URI",
);
assert(
  paymentUri(sol, SAMPLE_SOL_ADDRESS, quoted.display, quoted.units6, "BT1")
    === `solana:${SAMPLE_SOL_ADDRESS}?amount=1.961234&spl-token=${sol.contract}&label=Ban+Toan+Premium&message=BT1`,
  "Solana Pay URI",
);
const tronUri = paymentUri(tron, SAMPLE_TRON_ADDRESS, quoted.display, quoted.units6, "BT1");
assert(tronUri.startsWith(`tron:${SAMPLE_TRON_ADDRESS}?`), "TRON URI scheme");
assert(tronUri.includes("amount=1.961234"), "TRON URI amount");
assert(tronUri.includes(`contract=${tron.contract}`), "TRON URI contract");
assert(tronTo20(tron.contract) === "a614f803b6fd780986a42c78ec9c7f77e6ded13c", "TRON USDT contract bytes");
assert(tronTo20(SAMPLE_TRON_ADDRESS) === "0000000000000000000000000000000000ba7010", "sample TRON address");
assert(!("cryptoPrivateKey" in payEnv()), "no private key in pay env");

const dir = mkdtempSync(join(tmpdir(), "ban-toan-crypto-"));
let clock = 1_700_000_000_000;
const world: {
  block: number;
  chainId: string;
  evmReceipt: unknown;
  tronInfo: unknown;
  tronTx: unknown;
  solTx: unknown;
  solStatus: unknown;
  rateBody: unknown;
  rateThrows: boolean;
  fetches: number;
} = {
  block: 100,
  chainId: "0x38",
  evmReceipt: null,
  tronInfo: {},
  tronTx: { ret: [{ contractRet: "SUCCESS" }] },
  solTx: null,
  solStatus: { confirmationStatus: "finalized", confirmations: null, err: null },
  rateBody: { rates: { VND: 25000 } },
  rateThrows: false,
  fetches: 0,
};

async function fakeFetch(url: string | URL | Request, init?: RequestInit): Promise<Response> {
  world.fetches += 1;
  const target = String(url);
  if (target.includes("rate.test")) {
    if (world.rateThrows) throw new Error("rate down");
    return Response.json(world.rateBody);
  }
  const body = JSON.parse(String(init?.body ?? "{}")) as { method?: string };
  if (target.includes("bsc.test")) {
    if (body.method === "eth_chainId") return Response.json({ jsonrpc: "2.0", id: 1, result: world.chainId });
    if (body.method === "eth_blockNumber") return Response.json({ jsonrpc: "2.0", id: 1, result: `0x${world.block.toString(16)}` });
    if (body.method === "eth_getTransactionReceipt") return Response.json({ jsonrpc: "2.0", id: 1, result: world.evmReceipt });
  }
  if (target.includes("tron.test")) {
    if (target.endsWith("/wallet/getnowblock")) return Response.json({ block_header: { raw_data: { number: world.block } } });
    if (target.endsWith("/wallet/gettransactioninfobyid")) return Response.json(world.tronInfo);
    if (target.endsWith("/wallet/gettransactionbyid")) return Response.json(world.tronTx);
  }
  if (target.includes("sol.test")) {
    if (body.method === "getTransaction") return Response.json({ jsonrpc: "2.0", id: 1, result: world.solTx });
    if (body.method === "getSignatureStatuses") return Response.json({ jsonrpc: "2.0", id: 1, result: { value: [world.solStatus] } });
  }
  throw new Error(`unexpected fetch ${target}`);
}

function envFor(name: string, rateUrl = ""): PayEnv {
  return payEnv({
    PREMIUM_PRICE_MONTH: "49000",
    PREMIUM_PRICE_YEAR: "399000",
    PUBLIC_BASE_URL: "http://pay.local",
    ADMIN_TOKEN: "admin-secret",
    BANK_WEBHOOK_SECRET: "hook-secret",
    PREMIUM_DB_PATH: join(dir, `${name}.sqlite`),
    CRYPTO_RATE_URL: rateUrl,
    CRYPTO_VND_PER_USD: "25000",
    CRYPTO_BSC_RPC: "http://bsc.test/rpc",
    CRYPTO_TRON_API: "http://tron.test",
    CRYPTO_SOL_RPC: "http://sol.test/rpc",
    CRYPTO_BSC_CONFIRMATIONS: "15",
    CRYPTO_TRON_CONFIRMATIONS: "19",
  }, () => clock, fakeFetch);
}

const env = envFor("main");

async function post(target: PayEnv, path: string, body: unknown, headers: Record<string, string> = {}): Promise<{ status: number; json: Record<string, unknown> }> {
  const res = await handlePremium(new Request(`http://pay.local${path}`, {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: JSON.stringify(body),
  }), target);
  return { status: res.status, json: await res.json() as Record<string, unknown> };
}

async function get(path: string): Promise<{ status: number; json: Record<string, unknown> }> {
  const res = await handlePremium(new Request(`http://pay.local${path}`), env);
  return { status: res.status, json: await res.json() as Record<string, unknown> };
}

function topic(address: string): string {
  return `0x${address.toLowerCase().replace(/^0x/, "").padStart(64, "0")}`;
}

function word(amount: bigint): string {
  return `0x${amount.toString(16).padStart(64, "0")}`;
}

type CryptoJson = {
  chain: string;
  asset: string;
  display: string;
  smallest: string;
  address: string;
  contract: string;
  uri: string;
  qrDataUrl: string;
  sample: boolean;
  rate: number;
  rateSource: string;
  suffix: number;
  txHash: string;
};

function cryptoOf(json: Record<string, unknown>): CryptoJson {
  return json.crypto as CryptoJson;
}

const plans = await get("/api/premium/plans");
const chainIds = ((plans.json.crypto as { chains: { id: string }[] }).chains).map((item) => item.id);
assert(plans.status === 200, "plans");
assert(chainIds.join() === "tron-usdt,bsc-usdt,bsc-usdc,sol-usdc", `chains ${chainIds.join()}`);

const created = await post(env, "/api/premium/create", {
  email: "hieu@example.com",
  plan: "month",
  method: "crypto",
  chain: "bsc-usdt",
  amount: 1,
});
assert(created.status === 200, `create ${created.status} ${JSON.stringify(created.json)}`);
assert(created.json.amount === 49000, "client VND amount ignored");
const first = cryptoOf(created.json);
assert(/^1\.96\d{4}$/.test(first.display), `fallback display ${first.display}`);
assert(first.rate === 25000 && first.rateSource === "config", "fallback rate");
assert(first.sample === true, "sample wallet");
assert(first.address === SAMPLE_BSC_ADDRESS, "sample BSC address");
assert(first.uri === paymentUri(bsc, first.address, first.display, BigInt(first.smallest), String(created.json.orderId)), "create URI matches builder");
assert(first.qrDataUrl.startsWith("data:image/png;base64,"), "QR image");
assert(first.uri.includes(`uint256=${first.smallest}`), "URI carries smallest unit");

const second = cryptoOf((await post(env, "/api/premium/create", {
  email: "hieu@example.com",
  plan: "month",
  method: "crypto",
  chain: "bsc-usdt",
})).json);
assert(first.suffix !== second.suffix && first.display !== second.display, "unique suffix per order");

const orderId = String(created.json.orderId);
const smallest = BigInt(first.smallest);
const tx = `0x${"ab".repeat(32)}`;
world.evmReceipt = {
  status: "0x1",
  blockNumber: "0x10",
  logs: [{
    address: bsc.contract,
    topics: [TRANSFER_TOPIC, topic("0x1111111111111111111111111111111111111111"), topic(SAMPLE_BSC_ADDRESS)],
    data: word(smallest),
  }],
};
world.block = 20;
const waiting = await post(env, "/api/premium/crypto", { orderId, txHash: tx });
assert(waiting.status === 200, `low conf ${waiting.status}`);
const waitingCheck = waiting.json.cryptoCheck as { error?: string; have?: number; need?: number };
assert(waitingCheck.error === "confirmations" && waitingCheck.have === 5 && waitingCheck.need === 15, `confirmations ${JSON.stringify(waitingCheck)}`);
assert((await get(`/api/premium/status?orderId=${orderId}`)).json.status === "pending", "low conf stays pending");
world.block = 40;
const unauthWatch = await post(env, "/api/premium/crypto", { watch: true });
assert(unauthWatch.status === 401, "watch requires admin");
const watched = await post(env, "/api/premium/crypto", { watch: true }, { authorization: "Bearer admin-secret" });
assert(watched.json.applied === 1, `watch applied ${JSON.stringify(watched.json)}`);
const paid = await get(`/api/premium/status?orderId=${orderId}`);
assert(paid.json.status === "paid" && String(paid.json.licenseKey).startsWith("bt_"), "crypto license");
const license = String(paid.json.licenseKey);
const replay = await post(env, "/api/premium/crypto", { orderId, txHash: tx });
assert(replay.status === 200 && (replay.json.cryptoCheck as { applied?: boolean }).applied === false, "same tx is idempotent");
assert((await get(`/api/premium/status?orderId=${orderId}`)).json.licenseKey === license, "license unchanged");

const other = await post(env, "/api/premium/create", { email: "hieu@example.com", plan: "year", method: "crypto", chain: "bsc-usdc" });
const reused = await post(env, "/api/premium/crypto", { orderId: other.json.orderId, txHash: tx });
assert(reused.status === 409 && reused.json.error === "reuse", `reuse ${JSON.stringify(reused.json)}`);

const probe = await post(env, "/api/premium/create", { email: "hieu@example.com", plan: "month", method: "crypto", chain: "bsc-usdt" });
const probeId = String(probe.json.orderId);
const probeSmallest = BigInt(cryptoOf(probe.json).smallest);
world.evmReceipt = {
  status: "0x1",
  blockNumber: "0x10",
  logs: [{
    address: "0x0000000000000000000000000000000000000001",
    topics: [TRANSFER_TOPIC, topic("0x1111111111111111111111111111111111111111"), topic(SAMPLE_BSC_ADDRESS)],
    data: word(probeSmallest),
  }],
};
const badContract = await post(env, "/api/premium/crypto", { orderId: probeId, txHash: `0x${"cd".repeat(32)}` });
assert(badContract.status === 400 && badContract.json.field === "contract", `contract ${JSON.stringify(badContract.json)}`);
world.evmReceipt = {
  status: "0x1",
  blockNumber: "0x10",
  logs: [{
    address: bsc.contract,
    topics: [TRANSFER_TOPIC, topic("0x1111111111111111111111111111111111111111"), topic("0x00000000000000000000000000000000000000aa")],
    data: word(probeSmallest),
  }],
};
const badTo = await post(env, "/api/premium/crypto", { orderId: probeId, txHash: `0x${"ef".repeat(32)}` });
assert(badTo.status === 400 && badTo.json.field === "to", `recipient ${JSON.stringify(badTo.json)}`);
world.evmReceipt = {
  status: "0x1",
  blockNumber: "0x10",
  logs: [{
    address: bsc.contract,
    topics: [TRANSFER_TOPIC, topic("0x1111111111111111111111111111111111111111"), topic(SAMPLE_BSC_ADDRESS)],
    data: word(probeSmallest + 1n),
  }],
};
const badAmount = await post(env, "/api/premium/crypto", { orderId: probeId, txHash: `0x${"11".repeat(32)}` });
assert(badAmount.status === 400 && badAmount.json.field === "amount", `amount ${JSON.stringify(badAmount.json)}`);
world.chainId = "0x1";
world.evmReceipt = {
  status: "0x1",
  blockNumber: "0x10",
  logs: [{
    address: bsc.contract,
    topics: [TRANSFER_TOPIC, topic("0x1111111111111111111111111111111111111111"), topic(SAMPLE_BSC_ADDRESS)],
    data: word(probeSmallest),
  }],
};
const badChain = await post(env, "/api/premium/crypto", { orderId: probeId, txHash: `0x${"22".repeat(32)}` });
assert(badChain.status === 400 && badChain.json.field === "chain", `chain ${JSON.stringify(badChain.json)}`);
world.chainId = "0x38";
world.evmReceipt = { status: "0x0", blockNumber: "0x10", logs: [] };
const failed = await post(env, "/api/premium/crypto", { orderId: probeId, txHash: `0x${"33".repeat(32)}` });
assert(failed.status === 400 && failed.json.error === "failed", `failed tx ${JSON.stringify(failed.json)}`);
assert((await get(`/api/premium/status?orderId=${probeId}`)).json.status === "pending", "mismatch does not pay");

const anchor = clock;
const expiring = await post(env, "/api/premium/create", { email: "hieu@example.com", plan: "month", method: "crypto", chain: "bsc-usdt" });
const beforeFetch = world.fetches;
clock = anchor + 16 * 60 * 1000;
const late = await post(env, "/api/premium/crypto", { orderId: expiring.json.orderId, txHash: `0x${"44".repeat(32)}` });
assert(late.status === 409 && late.json.error === "expired", `expired ${late.status}`);
assert(world.fetches === beforeFetch, "expired order does not call RPC");
const lateAdmin = await post(env, "/api/premium/confirm", { orderId: expiring.json.orderId }, { authorization: "Bearer admin-secret" });
assert(lateAdmin.status === 409, "admin cannot confirm an expired crypto order");

clock = anchor + 1000;
const manual = await post(env, "/api/premium/create", { email: "hieu@example.com", plan: "month", method: "crypto", chain: "tron-usdt" });
const allowed = await post(env, "/api/premium/confirm", { orderId: manual.json.orderId }, { authorization: "Bearer admin-secret" });
assert(allowed.status === 200 && allowed.json.applied === true, "admin confirms crypto");
const allowedAgain = await post(env, "/api/premium/confirm", { orderId: manual.json.orderId }, { authorization: "Bearer admin-secret" });
assert(allowedAgain.json.applied === false, "admin confirm is idempotent");

clock = anchor + 2000;
const tronOrder = await post(env, "/api/premium/create", { email: "hieu@example.com", plan: "month", method: "crypto", chain: "tron-usdt" });
const tronCrypto = cryptoOf(tronOrder.json);
assert(tronCrypto.uri.startsWith(`tron:${SAMPLE_TRON_ADDRESS}?`), "tron payment uri");
assert(tronCrypto.qrDataUrl.startsWith("data:image/png;base64,"), "tron QR");
const tronSmallest = BigInt(tronCrypto.smallest);
const tronContract = tronTo20(tron.contract) ?? "";
const tronTo = tronTo20(SAMPLE_TRON_ADDRESS) ?? "";
const tronTx = "aa".repeat(32);
world.tronInfo = {
  id: tronTx,
  blockNumber: 10,
  receipt: { result: "SUCCESS" },
  log: [{
    address: tronContract,
    topics: [TRANSFER_TOPIC.slice(2), `${"0".repeat(24)}${"ab".repeat(20)}`, `${"0".repeat(24)}${tronTo}`],
    data: word(tronSmallest).slice(2),
  }],
};
world.block = 15;
const tronWait = await post(env, "/api/premium/crypto", { orderId: tronOrder.json.orderId, txHash: tronTx });
assert((tronWait.json.cryptoCheck as { error?: string }).error === "confirmations", "tron confirmations");
world.block = 40;
const tronPaid = await post(env, "/api/premium/crypto", { orderId: tronOrder.json.orderId, txHash: tronTx });
assert(tronPaid.status === 200 && (await get(`/api/premium/status?orderId=${String(tronOrder.json.orderId)}`)).json.status === "paid", "tron payment");

const rebound = await post(env, "/api/premium/create", { email: "hieu@example.com", plan: "month", method: "crypto", chain: "tron-usdt" });
const switched = await post(env, "/api/premium/crypto", { orderId: rebound.json.orderId, chain: "sol-usdc" });
const solCrypto = cryptoOf(switched.json);
assert(switched.status === 200 && solCrypto.chain === "sol-usdc", "rebind chain");
assert(solCrypto.address === SAMPLE_SOL_ADDRESS, "sol sample address");
assert(solCrypto.uri.startsWith(`solana:${SAMPLE_SOL_ADDRESS}?amount=`), "solana pay uri");
assert(solCrypto.uri.includes(`spl-token=${sol.contract}`), "solana mint");
const solSmallest = solCrypto.smallest;
const solTx = "1".repeat(88);
world.solStatus = { confirmationStatus: "confirmed", confirmations: 3, err: null };
world.solTx = null;
const solWait = await post(env, "/api/premium/crypto", { orderId: rebound.json.orderId, txHash: solTx });
assert((solWait.json.cryptoCheck as { error?: string }).error === "confirmations", `sol confirmations ${JSON.stringify(solWait.json.cryptoCheck)}`);
world.solStatus = { confirmationStatus: "finalized", confirmations: null, err: null };
world.solTx = {
  meta: {
    err: null,
    preTokenBalances: [],
    postTokenBalances: [{ owner: SAMPLE_SOL_ADDRESS, mint: sol.contract, uiTokenAmount: { amount: String(BigInt(solSmallest) - 1n) } }],
  },
};
const solBad = await post(env, "/api/premium/crypto", { orderId: rebound.json.orderId, txHash: `${"2".repeat(87)}A` });
assert(solBad.status === 400 && solBad.json.field === "amount", `sol amount ${JSON.stringify(solBad.json)}`);
world.solTx = {
  meta: {
    err: null,
    preTokenBalances: [],
    postTokenBalances: [{ owner: SAMPLE_SOL_ADDRESS, mint: sol.contract, uiTokenAmount: { amount: solSmallest } }],
  },
};
const solOk = await post(env, "/api/premium/crypto", { orderId: rebound.json.orderId, txHash: solTx });
assert(solOk.status === 200 && (await get(`/api/premium/status?orderId=${String(rebound.json.orderId)}`)).json.status === "paid", `sol paid ${solOk.status}`);

const liveEnv = envFor("live", "https://rate.test/vnd");
world.rateBody = { rates: { VND: 26000.4 } };
const live = cryptoOf((await post(liveEnv, "/api/premium/create", { email: "hieu@example.com", plan: "month", method: "crypto", chain: "bsc-usdt" })).json);
assert(live.rate === 26000 && live.rateSource === "live" && /^1\.88\d{4}$/.test(live.display), `live rate ${live.display} ${live.rate}`);
world.rateThrows = true;
const fell = cryptoOf((await post(liveEnv, "/api/premium/create", { email: "hieu@example.com", plan: "month", method: "crypto", chain: "bsc-usdc" })).json);
assert(fell.rateSource === "config" && fell.rate === 25000 && /^1\.96\d{4}$/.test(fell.display), `rate fallback ${fell.display}`);

if (fails.length > 0) {
  console.error(fails.join("\n"));
  process.exit(1);
}
console.log("crypto ok");
