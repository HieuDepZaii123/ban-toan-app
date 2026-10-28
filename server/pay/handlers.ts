import { randomBytes } from "node:crypto";
import QRCode from "qrcode";
import {
  CHAINS,
  chainSample,
  CRYPTO_CHAIN_IDS,
  displayFromSmallest,
  isCryptoChain,
  minConfirmations,
  normalizeTx,
  paymentUri,
  quoteCrypto,
  receiveAddress,
  verifyCrypto,
  chainSpec,
  type CryptoQuote,
} from "./crypto.ts";
import { priceOf, type PayEnv, type PayMethod, type PlanId } from "./env.ts";
import { createMomoPayment, ipnSignatureOk, readIpn } from "./momo.ts";
import { licenseHash, storeFor, type OrderRow, type PayStore } from "./store.ts";
import { buildVietQr, emvName } from "./vietqr.ts";

const ORDER_TTL_MS = 15 * 60 * 1000;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type Json = Record<string, unknown>;

export function json(status: number, body: Json, extra?: Record<string, string>): Response {
  const headers = new Headers(extra);
  headers.set("content-type", "application/json; charset=utf-8");
  headers.set("cache-control", "no-store");
  return new Response(JSON.stringify(body), { status, headers });
}

function idPart(bytes: number): string {
  return randomBytes(bytes).toString("hex");
}

function planOf(value: unknown): PlanId | null {
  return value === "month" || value === "year" ? value : null;
}

function methodOf(value: unknown): PayMethod | null {
  return value === "wallet" || value === "qr" || value === "bank" || value === "crypto" ? value : null;
}

function termMs(plan: PlanId): number {
  return (plan === "year" ? 365 : 30) * 86_400_000;
}

async function qrImage(payload: string): Promise<string> {
  return QRCode.toDataURL(payload, { margin: 1, width: 280, errorCorrectionLevel: "M" });
}

function bankView(env: PayEnv, order: OrderRow, payload: string, image: string) {
  return {
    sample: env.sampleBank,
    bin: env.bankBin,
    bankName: env.bankName,
    accountNo: env.bankAccountNo,
    accountName: emvName(env.bankAccountName),
    amount: order.amount,
    content: order.transferCode,
    vietqr: payload,
    qrDataUrl: image,
  };
}

function publicOrder(env: PayEnv, order: OrderRow, extras: Json = {}): Json {
  const paid = order.status === "paid";
  return {
    orderId: order.orderId,
    email: order.email,
    plan: order.plan,
    method: order.method,
    amount: order.amount,
    status: order.status,
    transferCode: order.transferCode,
    expiresAt: order.expiresAt,
    paidAt: order.paidAt,
    licenseKey: paid ? order.licenseKey : null,
    premiumUntil: paid && order.paidAt ? order.paidAt + termMs(order.plan) : null,
    samplePrices: true,
    sampleBank: env.sampleBank,
    ...extras,
  };
}

export async function handlePremium(request: Request, env: PayEnv): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/$/, "") || "/";
  const store = storeFor(env.dbPath);
  try {
    if (path === "/api/premium/plans" && request.method === "GET") return plans(env);
    if (path === "/api/premium/create" && request.method === "POST") return create(request, env, store);
    if (path === "/api/premium/ipn" && request.method === "POST") return ipn(request, env, store);
    if (path === "/api/premium/return" && request.method === "GET") return bounce(url, env);
    if (path === "/api/premium/status" && request.method === "GET") return status(url, env, store);
    if (path === "/api/premium/bank" && request.method === "POST") return bankHook(request, env, store);
    if (path === "/api/premium/confirm" && request.method === "POST") return confirm(request, env, store);
    if (path === "/api/premium/crypto" && request.method === "POST") return cryptoRoute(request, env, store);
    return json(404, { error: "not_found" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "error";
    return json(500, { error: "server", message });
  }
}

function plans(env: PayEnv): Response {
  return json(200, {
    sample: true,
    currency: "VND",
    lockContent: env.lockContent,
    plans: [
      { id: "month", amount: priceOf(env, "month"), days: 30 },
      { id: "year", amount: priceOf(env, "year"), days: 365 },
    ],
    bank: {
      sample: env.sampleBank,
      bin: env.bankBin,
      bankName: env.bankName,
      accountName: emvName(env.bankAccountName),
    },
    crypto: {
      chains: CRYPTO_CHAIN_IDS.map((id) => ({
        id,
        asset: CHAINS[id].asset,
        network: CHAINS[id].network,
        standard: CHAINS[id].standard,
        sample: chainSample(env, id),
      })),
    },
  });
}

async function create(request: Request, env: PayEnv, store: PayStore): Promise<Response> {
  const body = await readJson(request);
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const plan = planOf(body.plan);
  const method = methodOf(body.method);
  if (!EMAIL.test(email) || email.length > 120) return json(400, { error: "email" });
  if (!plan || !method) return json(400, { error: "plan" });
  const amount = priceOf(env, plan);
  const now = env.now();
  const order: OrderRow = {
    orderId: `BT${idPart(8)}`,
    requestId: `RQ${idPart(8)}`,
    email,
    plan,
    method,
    amount,
    transferCode: `BT${idPart(4).toUpperCase()}`,
    status: "pending",
    createdAt: now,
    expiresAt: now + ORDER_TTL_MS,
    paidAt: null,
    momoTransId: null,
    licenseKey: null,
    licenseHash: null,
    payUrl: "",
    deeplink: "",
    qrCodeUrl: "",
    cryptoChain: null,
    cryptoAsset: null,
    cryptoUnits: null,
    cryptoRate: null,
    cryptoSuffix: null,
    cryptoSource: null,
    cryptoTx: null,
  };
  if (method === "crypto") {
    if (!isCryptoChain(body.chain)) return json(400, { error: "chain" });
    const chain = body.chain;
    try {
      const quote = await quoteCrypto(env, chain, amount, (units) => store.cryptoTaken(chain, CHAINS[chain].asset, units, ""));
      order.cryptoChain = quote.chain;
      order.cryptoAsset = quote.asset;
      order.cryptoUnits = quote.units;
      order.cryptoRate = quote.rate;
      order.cryptoSuffix = quote.suffix;
      order.cryptoSource = quote.rateSource;
    } catch (error) {
      const message = error instanceof Error ? error.message : "quote";
      return json(400, { error: "quote", message });
    }
    store.insertOrder(order);
    return json(200, await enrich(env, order));
  }
  store.insertOrder(order);
  try {
    const session = await createMomoPayment(env, {
      orderId: order.orderId,
      requestId: order.requestId,
      amount,
      orderInfo: plan === "year" ? "Ban Toan Premium nam" : "Ban Toan Premium thang",
      method,
    });
    order.payUrl = session.payUrl;
    order.deeplink = session.deeplink;
    order.qrCodeUrl = session.qrCodeUrl;
    store.setMomo(order.orderId, session.payUrl, session.deeplink, session.qrCodeUrl);
  } catch (error) {
    const message = error instanceof Error ? error.message : "MoMo error";
    if (method === "wallet") return json(502, { error: "momo", message, orderId: order.orderId, amount });
    return json(200, { ...(await enrich(env, order)), momoError: message });
  }
  return json(200, await enrich(env, order));
}

async function enrich(env: PayEnv, order: OrderRow, cryptoCheck?: Json): Promise<Json> {
  const base = publicOrder(env, order, {
    payUrl: order.payUrl,
    deeplink: order.deeplink,
    qrCodeUrl: order.qrCodeUrl,
    ...(cryptoCheck ? { cryptoCheck } : {}),
  });
  if (order.method === "crypto") {
    const crypto = await cryptoPayload(env, order);
    return crypto ? { ...base, crypto } : base;
  }
  if (order.method === "wallet") return base;
  const payload = buildVietQr({
    bin: env.bankBin,
    account: env.bankAccountNo,
    amount: order.amount,
    name: env.bankAccountName,
    message: order.transferCode,
  });
  const image = await qrImage(payload);
  const momoQrPayload = order.qrCodeUrl || (order.method === "qr" ? order.payUrl : "");
  const momoQrDataUrl = momoQrPayload ? await qrImage(momoQrPayload) : "";
  return { ...base, momoQrDataUrl, bank: bankView(env, order, payload, image) };
}

async function ipn(request: Request, env: PayEnv, store: PayStore): Promise<Response> {
  const notice = readIpn(await readJson(request));
  if (!notice) return json(400, { error: "body" });
  if (!ipnSignatureOk(env, notice)) return json(401, { error: "bad_signature" });
  if (notice.partnerCode && notice.partnerCode !== env.partnerCode) return json(401, { error: "partner" });
  if (notice.resultCode !== 0) return json(200, { ok: true, applied: false, resultCode: notice.resultCode });
  const order = store.getOrder(notice.orderId, env.now());
  if (!order) return json(404, { error: "not_found" });
  if (notice.amount !== order.amount) return json(400, { error: "amount" });
  const marked = store.markPaid(
    order.orderId,
    env.now(),
    order.amount,
    notice.transId || null,
    "momo",
    notice.transId || `${notice.orderId}:${notice.requestId}`,
  );
  if (!marked.ok) return json(marked.error === "expired" ? 409 : 400, { error: marked.error, applied: false });
  return json(200, { ok: true, applied: marked.applied });
}

function bounce(url: URL, env: PayEnv): Response {
  const next = new URL("/nang-cap", env.publicBaseUrl);
  const orderId = url.searchParams.get("orderId");
  if (orderId) next.searchParams.set("orderId", orderId);
  return new Response(null, { status: 302, headers: { location: next.toString(), "cache-control": "no-store" } });
}

async function status(url: URL, env: PayEnv, store: PayStore): Promise<Response> {
  const license = url.searchParams.get("license");
  if (license) {
    const order = store.getByLicense(licenseHash(license));
    if (!order || !order.paidAt) return json(200, { active: false });
    const until = order.paidAt + termMs(order.plan);
    return json(200, { active: env.now() < until, premiumUntil: until, plan: order.plan, email: order.email });
  }
  const orderId = url.searchParams.get("orderId") ?? "";
  const order = orderId ? store.getOrder(orderId, env.now()) : null;
  if (!order) return json(404, { error: "not_found" });
  return json(200, await enrich(env, order));
}

async function cryptoPayload(env: PayEnv, order: OrderRow): Promise<Json | null> {
  if (!isCryptoChain(order.cryptoChain) || !order.cryptoUnits || order.cryptoRate === null || order.cryptoSuffix === null || !order.cryptoSource) {
    return null;
  }
  const spec = chainSpec(order.cryptoChain);
  let smallest: bigint;
  try {
    smallest = BigInt(order.cryptoUnits);
  } catch {
    return null;
  }
  const address = receiveAddress(env, spec.id);
  const display = displayFromSmallest(smallest, spec.decimals);
  const uri = paymentUri(spec, address, display, smallest, order.orderId);
  return {
    chain: spec.id,
    asset: spec.asset,
    network: spec.network,
    standard: spec.standard,
    decimals: spec.decimals,
    display,
    smallest: smallest.toString(),
    address,
    contract: spec.contract,
    uri,
    qrDataUrl: await qrImage(uri),
    sample: chainSample(env, spec.id),
    rate: order.cryptoRate,
    rateSource: order.cryptoSource,
    suffix: order.cryptoSuffix,
    minConfirmations: minConfirmations(env, spec),
    finalized: spec.family === "solana" && env.cryptoSolFinalized,
    txHash: order.cryptoTx ?? "",
  };
}

async function cryptoRoute(request: Request, env: PayEnv, store: PayStore): Promise<Response> {
  const body = await readJson(request);
  if (body.watch === true) return watchCrypto(request, env, store);
  const orderId = typeof body.orderId === "string" ? body.orderId : "";
  const order = orderId ? store.getOrder(orderId, env.now()) : null;
  if (!order) return json(404, { error: "not_found" });
  if (order.method !== "crypto") return json(400, { error: "method" });
  if (typeof body.chain === "string" && (typeof body.txHash !== "string" || body.txHash.trim() === "")) {
    return rebindCrypto(env, store, order, body.chain);
  }
  const txRaw = typeof body.txHash === "string" && body.txHash.trim() ? body.txHash : order.cryptoTx ?? "";
  if (!txRaw) return json(400, { error: "tx" });
  const result = await settleCrypto(env, store, order, txRaw);
  return cryptoResult(env, store, order, result);
}

async function rebindCrypto(env: PayEnv, store: PayStore, order: OrderRow, chainRaw: string): Promise<Response> {
  if (!isCryptoChain(chainRaw)) return json(400, { error: "chain" });
  if (order.status !== "pending") return json(409, { error: order.status });
  if (order.cryptoTx) return json(409, { error: "tx" });
    let quote: CryptoQuote;
    try {
      quote = await quoteCrypto(env, chainRaw, order.amount, (units) => store.cryptoTaken(chainRaw, CHAINS[chainRaw].asset, units, order.orderId));
  } catch (error) {
    const message = error instanceof Error ? error.message : "quote";
    return json(400, { error: "quote", message });
  }
  const saved = store.setCryptoQuote(order.orderId, {
    chain: quote.chain,
    asset: quote.asset,
    units: quote.units,
    rate: quote.rate,
    suffix: quote.suffix,
    source: quote.rateSource,
  });
  if (!saved) return json(409, { error: "order" });
  const fresh = store.getOrder(order.orderId, env.now());
  if (!fresh) return json(404, { error: "not_found" });
  return json(200, await enrich(env, fresh));
}

async function watchCrypto(request: Request, env: PayEnv, store: PayStore): Promise<Response> {
  if (!env.adminToken || !bearerOk(request, env.adminToken)) return json(401, { error: "admin" });
  const rows = store.listPendingCrypto(env.now());
  let checked = 0;
  let applied = 0;
  for (const order of rows) {
    if (!order.cryptoTx) continue;
    checked += 1;
    const result = await settleCrypto(env, store, order, order.cryptoTx);
    if (result.applied === true) applied += 1;
  }
  return json(200, { ok: true, checked, applied });
}

type Settle = { applied?: boolean; error?: string; field?: string; have?: number; need?: number };

async function settleCrypto(env: PayEnv, store: PayStore, order: OrderRow, txRaw: string): Promise<Settle> {
  if (order.status === "expired") return { error: "expired" };
  if (order.status === "paid") return { applied: false };
  if (!isCryptoChain(order.cryptoChain) || !order.cryptoUnits) return { error: "chain" };
  const tx = normalizeTx(order.cryptoChain, txRaw);
  if (!tx) return { error: "tx" };
  const owner = store.eventOrder("crypto", tx);
  if (owner && owner !== order.orderId) return { error: "reuse" };
  if (owner === order.orderId) return { applied: false };
  store.setCryptoTx(order.orderId, tx);
  let smallest: bigint;
  try {
    smallest = BigInt(order.cryptoUnits);
  } catch {
    return { error: "amount" };
  }
  const checked = await verifyCrypto(env, order.cryptoChain, tx, smallest);
  if (!checked.ok) {
    return { error: checked.error, field: checked.field, have: checked.have, need: checked.need };
  }
  const marked = store.markPaid(order.orderId, env.now(), order.amount, tx, "crypto", tx);
  if (!marked.ok) {
    if (marked.error === "duplicate") {
      const who = store.eventOrder("crypto", tx);
      if (who && who !== order.orderId) return { error: "reuse" };
      return { applied: false };
    }
    return { error: marked.error };
  }
  return { applied: marked.applied };
}

async function cryptoResult(env: PayEnv, store: PayStore, order: OrderRow, result: Settle): Promise<Response> {
  if (result.error === "expired") return json(409, { error: "expired" });
  if (result.error === "reuse") return json(409, { error: "reuse" });
  if (result.error === "not_found") return json(404, { error: "not_found" });
  if (result.error === "rpc") return json(502, { error: "rpc" });
  if (result.error === "mismatch" || result.error === "failed" || result.error === "tx" || result.error === "amount" || result.error === "chain") {
    return json(400, { error: result.error, field: result.field });
  }
  const fresh = store.getOrder(order.orderId, env.now()) ?? order;
  return json(200, await enrich(env, fresh, result));
}

async function bankHook(request: Request, env: PayEnv, store: PayStore): Promise<Response> {
  if (!env.webhookSecret || !secretOk(request, env.webhookSecret)) return json(401, { error: "bad_secret" });
  const notices = readBankNotices(await readJson(request));
  if (notices.length === 0) return json(400, { error: "body" });
  const results = [];
  for (const notice of notices) {
    results.push(await settleBank(env, store, notice));
  }
  const first = results[0];
  if (!first) return json(400, { error: "body" });
  if (results.length === 1) return first;
  return json(200, { ok: true, count: results.length });
}

async function settleBank(env: PayEnv, store: PayStore, notice: BankNotice): Promise<Response> {
  const code = transferCodeIn(notice.content);
  if (!code) return json(404, { error: "content" });
  const order = store.getByTransfer(code, env.now());
  if (!order) return json(404, { error: "not_found" });
  if (notice.amount !== order.amount) return json(400, { error: "amount" });
  const marked = store.markPaid(order.orderId, env.now(), order.amount, null, "bank", notice.transactionId);
  if (!marked.ok) {
    if (marked.error === "duplicate") return json(200, { ok: true, applied: false });
    return json(marked.error === "expired" ? 409 : 400, { error: marked.error, applied: false });
  }
  return json(200, { ok: true, applied: marked.applied, orderId: order.orderId });
}

async function confirm(request: Request, env: PayEnv, store: PayStore): Promise<Response> {
  if (!env.adminToken || !bearerOk(request, env.adminToken)) return json(401, { error: "admin" });
  const body = await readJson(request);
  const orderId = typeof body.orderId === "string" ? body.orderId : "";
  const order = orderId ? store.getOrder(orderId, env.now()) : null;
  if (!order) return json(404, { error: "not_found" });
  const marked = store.markPaid(order.orderId, env.now(), order.amount, null, "admin", order.orderId);
  if (!marked.ok) return json(marked.error === "expired" ? 409 : 400, { error: marked.error, applied: false });
  return json(200, { ok: true, applied: marked.applied, orderId: order.orderId });
}

type BankNotice = { content: string; amount: number; transactionId: string };

function readBankNotices(value: unknown): BankNotice[] {
  if (!value || typeof value !== "object") return [];
  const body = value as Record<string, unknown>;
  if (Array.isArray(body.data)) return body.data.flatMap(oneNotice);
  return oneNotice(body);
}

function oneNotice(value: unknown): BankNotice[] {
  if (!value || typeof value !== "object") return [];
  const body = value as Record<string, unknown>;
  const content = typeof body.content === "string" ? body.content : typeof body.description === "string" ? body.description : "";
  const amount = Number(body.amount ?? body.transferAmount);
  const transactionId = String(body.transactionId ?? body.id ?? "");
  if (!content || !Number.isInteger(amount) || !transactionId) return [];
  return [{ content, amount, transactionId }];
}

function transferCodeIn(content: string): string | null {
  const match = content.toUpperCase().match(/BT[0-9A-F]{8}/);
  return match ? match[0] : null;
}

async function readJson(request: Request): Promise<Record<string, unknown>> {
  try {
    const parsed: unknown = await request.json();
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) return parsed as Record<string, unknown>;
  } catch {
    /* empty */
  }
  return {};
}

function presentedSecret(request: Request): string {
  const header = request.headers.get("x-bank-secret") ?? "";
  if (header) return header;
  const auth = request.headers.get("authorization") ?? "";
  const apikey = auth.match(/^Apikey\s+(.+)$/i);
  return apikey?.[1]?.trim() ?? "";
}

function secretOk(request: Request, expected: string): boolean {
  return safeText(presentedSecret(request), expected);
}

function bearerOk(request: Request, expected: string): boolean {
  const auth = request.headers.get("authorization") ?? "";
  const match = auth.match(/^Bearer\s+(.+)$/i);
  return safeText(match?.[1]?.trim() ?? "", expected);
}

function safeText(got: string, expected: string): boolean {
  if (!got || got.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < got.length; i += 1) diff |= got.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}
