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
import { commissionOf, normalizeCode, sameReferrer, secretHash } from "./affiliate.ts";
import { isSelling, priceOf, type PayEnv, type PayMethod, type PlanId } from "./env.ts";
import { createMomoPayment, ipnSignatureOk, readIpn } from "./momo.ts";
import { CryptoAmountTaken, licenseHash, storeFor, type OrderRow, type PayStore } from "./store.ts";
import { buildVietQr, emvName } from "./vietqr.ts";
import { publicApiPath } from "../http/foldedRoutes.ts";

const ORDER_TTL_MS = 15 * 60 * 1000;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Mã Premium chỉ trả theo mã đơn trong một giờ sau khi thanh toán. Sau đó phải khôi phục bằng mã đơn và email. */
const KEY_WINDOW_MS = 60 * 60 * 1000;

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
  const fresh = paid && order.paidAt !== null && env.now() - order.paidAt <= KEY_WINDOW_MS;
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
    licenseKey: fresh ? order.licenseKey : null,
    keyHidden: paid && !fresh,
    premiumUntil: paid && order.paidAt ? order.paidAt + termMs(order.plan) : null,
    samplePrices: true,
    sampleBank: env.sampleBank,
    ...extras,
  };
}

export async function handlePremium(request: Request, env: PayEnv): Promise<Response> {
  const url = new URL(request.url);
  // Hobby plan: /api/premium/recover is rewritten onto the status function with ?route=recover.
  const path = publicApiPath(url);
  const store = env.store ?? storeFor(env);
  if (path === "/api/premium/plans" && request.method === "GET") return plans(env);
  if (path === "/api/premium/create" && request.method === "POST") return create(request, env, store);
  if (path === "/api/premium/ipn" && request.method === "POST") return ipn(request, env, store);
  if (path === "/api/premium/return" && request.method === "GET") return bounce(url, env);
  if (path === "/api/premium/status" && request.method === "GET") return status(url, env, store);
  if (path === "/api/premium/bank" && request.method === "POST") return bankHook(request, env, store);
  if (path === "/api/premium/confirm" && request.method === "POST") return confirm(request, env, store);
  if (path === "/api/premium/refund" && request.method === "POST") return refund(request, env, store);
  if (path === "/api/premium/recover" && request.method === "POST") return recover(request, env, store);
  if (path === "/api/premium/crypto" && request.method === "POST") return cryptoRoute(request, env, store);
  if (path === "/api/premium/affiliate" && request.method === "POST") return affiliateRoute(request, env, store);
  if (path === "/api/premium/affiliate-admin" && request.method === "POST") return affiliateAdmin(request, env, store);
  return json(404, { error: "not_found" });
}

function plans(env: PayEnv): Response {
  return json(200, {
    sample: !isSelling(env),
    selling: isSelling(env),
    demo: env.demo && !isSelling(env),
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
    ...(env.cryptoEnabled ? {
      crypto: {
        chains: CRYPTO_CHAIN_IDS.map((id) => ({
          id,
          asset: CHAINS[id].asset,
          network: CHAINS[id].network,
          standard: CHAINS[id].standard,
          sample: chainSample(env, id),
        })),
      },
    } : {}),
  });
}

async function create(request: Request, env: PayEnv, store: PayStore): Promise<Response> {
  const body = await readJson(request);
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const plan = planOf(body.plan);
  const method = methodOf(body.method);
  if (!EMAIL.test(email) || email.length > 120) return json(400, { error: "email" });
  if (!plan || !method) return json(400, { error: "plan" });
  if ((method === "wallet" || method === "qr") && !env.momoReady) return json(503, { error: "momo_not_configured" });
  // Người mua tự khai: từ 18 tuổi, hoặc 16–17 tuổi đã được cha mẹ đồng ý. Dưới 16 tuổi thì cha mẹ mua giúp.
  if (body.buyer !== "adult" && body.buyer !== "teen") {
    return json(403, {
      error: "buyer",
      message: "Người dưới 16 tuổi cần cha mẹ hoặc người giám hộ mua giúp. / Buyers under 16 need a parent or guardian to buy for them.",
    });
  }
  if (method === "crypto" && body.buyer !== "adult") {
    return json(403, { error: "buyer", message: "Tiền mã hóa chỉ dành cho người mua từ 18 tuổi. / Crypto is for buyers aged 18 or older only." });
  }
  if (method === "crypto" && !env.cryptoEnabled) {
    return json(403, { error: "crypto_off", message: "Bàn Toán không nhận tiền mã hóa. / Crypto payments are not accepted." });
  }
  const amount = priceOf(env, plan);
  const now = env.now();
  const referred = await acceptedRef(store, body, email, env.affiliateRateBps);
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
    refCode: referred.code,
    refBps: referred.bps,
  };
  if (method === "crypto") {
    if (!isCryptoChain(body.chain)) return json(400, { error: "chain" });
    const chain = body.chain;
    // Hai request song song có thể cùng chọn một số token; Postgres chặn bằng chỉ mục UNIQUE, ta báo giá lại.
    for (let attempt = 0; ; attempt += 1) {
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
      try {
        await store.insertOrder(order);
        break;
      } catch (error) {
        if (!(error instanceof CryptoAmountTaken) || attempt >= 2) throw error;
      }
    }
    return json(200, await enrich(env, order));
  }
  await store.insertOrder(order);
  // Bank transfer works on its own; only ask MoMo for a session when MoMo is really set up.
  if (!env.momoReady) return json(200, await enrich(env, order));
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
    await store.setMomo(order.orderId, session.payUrl, session.deeplink, session.qrCodeUrl);
  } catch (error) {
    // Never forward the raw exception text to buyers; it is technical and untranslated.
    void error;
    const message = "MoMo chưa nhận đơn. Thử lại sau hoặc chọn chuyển khoản. / MoMo did not accept the order. Try again later or pay by bank transfer.";
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
  // Live deploy without a real MoMo secret: the public sandbox key would let anyone forge an IPN.
  if (!env.momoReady) return json(503, { error: "momo_not_configured" });
  const notice = readIpn(await readJson(request));
  if (!notice) return json(400, { error: "body" });
  if (!ipnSignatureOk(env, notice)) return json(401, { error: "bad_signature" });
  if (notice.partnerCode && notice.partnerCode !== env.partnerCode) return json(401, { error: "partner" });
  if (notice.resultCode !== 0) return json(200, { ok: true, applied: false, resultCode: notice.resultCode });
  const order = await store.getOrder(notice.orderId, env.now());
  if (!order) return json(404, { error: "not_found" });
  if (notice.amount !== order.amount) return json(400, { error: "amount" });
  const marked = await store.markPaid(
    order.orderId,
    env.now(),
    order.amount,
    notice.transId || null,
    "momo",
    notice.transId || `${notice.orderId}:${notice.requestId}`,
    true,
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
    const order = await store.getByLicense(licenseHash(license));
    if (!order || !order.paidAt) return json(200, { active: false });
    const until = order.paidAt + termMs(order.plan);
    return json(200, { active: env.now() < until, premiumUntil: until, plan: order.plan, email: order.email });
  }
  const orderId = url.searchParams.get("orderId") ?? "";
  const order = orderId ? await store.getOrder(orderId, env.now()) : null;
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
  const order = orderId ? await store.getOrder(orderId, env.now()) : null;
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
  const saved = await store.setCryptoQuote(order.orderId, {
    chain: quote.chain,
    asset: quote.asset,
    units: quote.units,
    rate: quote.rate,
    suffix: quote.suffix,
    source: quote.rateSource,
  });
  if (!saved) return json(409, { error: "order" });
  const fresh = await store.getOrder(order.orderId, env.now());
  if (!fresh) return json(404, { error: "not_found" });
  return json(200, await enrich(env, fresh));
}

async function watchCrypto(request: Request, env: PayEnv, store: PayStore): Promise<Response> {
  if (!env.adminToken || !bearerOk(request, env.adminToken)) return json(401, { error: "admin" });
  const rows = await store.listPendingCrypto(env.now());
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
  const owner = await store.eventOrder("crypto", tx);
  if (owner && owner !== order.orderId) return { error: "reuse" };
  if (owner === order.orderId) return { applied: false };
  await store.setCryptoTx(order.orderId, tx);
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
  const marked = await store.markPaid(order.orderId, env.now(), order.amount, tx, "crypto", tx);
  if (!marked.ok) {
    if (marked.error === "duplicate") {
      const who = await store.eventOrder("crypto", tx);
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
  const fresh = await store.getOrder(order.orderId, env.now()) ?? order;
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
  const order = await store.getByTransfer(code, env.now());
  if (!order) return json(404, { error: "not_found" });
  if (notice.amount !== order.amount) return json(400, { error: "amount" });
  const marked = await store.markPaid(order.orderId, env.now(), order.amount, null, "bank", notice.transactionId, true);
  if (!marked.ok) {
    if (marked.error === "duplicate") return json(200, { ok: true, applied: false });
    return json(marked.error === "expired" ? 409 : 400, { error: marked.error, applied: false });
  }
  return json(200, { ok: true, applied: marked.applied, orderId: order.orderId });
}

/** Admin: the money has been returned, so the licence stops working. */
async function refund(request: Request, env: PayEnv, store: PayStore): Promise<Response> {
  if (!env.adminToken || !bearerOk(request, env.adminToken)) return json(401, { error: "admin" });
  const body = await readJson(request);
  const orderId = typeof body.orderId === "string" ? body.orderId : "";
  if (!orderId) return json(400, { error: "order" });
  const done = await store.refundOrder(orderId);
  return done ? json(200, { ok: true, orderId }) : json(404, { error: "not_paid" });
}

/** Khôi phục mã Premium: phải khớp cả mã đơn lẫn email đã mua. Sai một trong hai đều trả cùng một lỗi. */
async function recover(request: Request, env: PayEnv, store: PayStore): Promise<Response> {
  const body = await readJson(request);
  const orderId = typeof body.orderId === "string" ? body.orderId.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const order = orderId && email ? await store.getOrder(orderId, env.now()) : null;
  if (!order || order.status !== "paid" || !order.licenseKey || !order.paidAt || !safeText(email, order.email)) {
    return json(404, { error: "not_found" });
  }
  return json(200, { licenseKey: order.licenseKey, premiumUntil: order.paidAt + termMs(order.plan), plan: order.plan });
}

async function confirm(request: Request, env: PayEnv, store: PayStore): Promise<Response> {
  if (!env.adminToken || !bearerOk(request, env.adminToken)) return json(401, { error: "admin" });
  const body = await readJson(request);
  const orderId = typeof body.orderId === "string" ? body.orderId : "";
  const order = orderId ? await store.getOrder(orderId, env.now()) : null;
  if (!order) return json(404, { error: "not_found" });
  const marked = await store.markPaid(order.orderId, env.now(), order.amount, null, "admin", order.orderId, order.method !== "crypto");
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

async function acceptedRef(store: PayStore, body: Record<string, unknown>, email: string, rateBps: number): Promise<{ code: string | null; bps: number | null }> {
  const code = normalizeCode(body.ref);
  if (!code) return { code: null, bps: null };
  const affiliate = await store.affiliateOfCode(code);
  if (!affiliate) return { code: null, bps: null };
  if (sameReferrer(secretHash(body.ownerSecret), affiliate.ownerHash, email, affiliate.email)) return { code: null, bps: null };
  return { code, bps: rateBps };
}

function optionalEmail(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const email = value.trim().toLowerCase();
  return EMAIL.test(email) && email.length <= 120 ? email : null;
}

async function affiliateRoute(request: Request, env: PayEnv, store: PayStore): Promise<Response> {
  const body = await readJson(request);
  const action = body.action;
  // Mở mã và xem hoa hồng chỉ dành cho người từ 18 tuổi (tự khai ở trang Giới thiệu). Đếm lượt khách thì không cần.
  if ((action === "open" || action === "stats") && body.adult !== true) {
    return json(403, { error: "adult_only", message: "Chương trình giới thiệu chỉ dành cho người từ 18 tuổi. / The referral programme is for adults (18+)." });
  }
  if (action === "open") {
    const owner = secretHash(body.ownerSecret);
    if (!owner) return json(400, { error: "secret" });
    const row = await store.ensureAffiliate(owner, optionalEmail(body.email), env.now());
    return json(200, {
      code: row.code,
      rateBps: env.affiliateRateBps,
      sampleMonth: commissionOf(priceOf(env, "month"), env.affiliateRateBps),
    });
  }
  if (action === "visit") {
    const code = normalizeCode(body.code);
    const visitor = secretHash(body.visitorId);
    if (!code || !visitor) return json(200, { ok: true, recorded: false });
    const affiliate = await store.affiliateOfCode(code);
    if (!affiliate) return json(200, { ok: true, recorded: false });
    if (sameReferrer(secretHash(body.ownerSecret), affiliate.ownerHash, "", affiliate.email)) {
      return json(200, { ok: true, recorded: false });
    }
    return json(200, { ok: true, recorded: await store.recordVisit(code, visitor, env.now()) });
  }
  if (action === "stats") {
    const owner = secretHash(body.ownerSecret);
    if (!owner) return json(400, { error: "secret" });
    const row = await store.ensureAffiliate(owner, optionalEmail(body.email), env.now());
    const affiliate = await store.affiliateOfCode(row.code);
    const stats = await store.affiliateStats(row.code, env.now());
    return json(200, {
      code: row.code,
      rateBps: env.affiliateRateBps,
      sampleMonth: commissionOf(priceOf(env, "month"), env.affiliateRateBps),
      email: affiliate?.email ?? null,
      ...stats,
    });
  }
  return json(400, { error: "action" });
}

async function affiliateAdmin(request: Request, env: PayEnv, store: PayStore): Promise<Response> {
  if (!env.adminToken || !bearerOk(request, env.adminToken)) return json(401, { error: "admin" });
  const body = await readJson(request);
  if (body.action === "list") {
    return json(200, { rateBps: env.affiliateRateBps, affiliates: await store.listAffiliates(env.now()) });
  }
  if (body.action === "approve") {
    const code = normalizeCode(body.code);
    if (!code || !await store.affiliateOfCode(code)) return json(404, { error: "not_found" });
    const result = await store.approveAffiliate(code, env.now());
    return json(200, { ok: true, code, ...result, transferred: false });
  }
  return json(400, { error: "action" });
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
