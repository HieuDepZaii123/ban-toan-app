/**
 * Premium payments: MoMo HMAC, VietQR CRC, IPN and bank webhook rules.
 * Run with: tsx scripts/pay.test.ts
 */
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { payEnv, type PayEnv } from "../server/pay/env.ts";
import { handlePremium } from "../server/pay/handlers.ts";
import { CREATE_FIELDS, CREATE_RESPONSE_FIELDS, IPN_FIELDS, hmacSha256, rawSignature, signFields } from "../server/pay/sign.ts";
import { buildVietQr, crc16CcittFalse, decodeVietQr, verifyVietQr } from "../server/pay/vietqr.ts";

const SECRET = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
const ACCESS = "F8BBA842ECF85";
const fails: string[] = [];

function assert(cond: boolean, message: string): void {
  if (!cond) fails.push(message);
}

const documentedCreate = [
  "accessKey=F8BBA842ECF85",
  "amount=50000",
  "extraData=",
  "ipnUrl=https://momo.vn/ipn",
  "orderId=BANTON1",
  "orderInfo=Ban Toan Premium",
  "partnerCode=MOMO",
  "redirectUrl=https://momo.vn/return",
  "requestId=BANTON1",
  "requestType=captureWallet",
].join("&");

const createValues = {
  accessKey: ACCESS,
  amount: "50000",
  extraData: "",
  ipnUrl: "https://momo.vn/ipn",
  orderId: "BANTON1",
  orderInfo: "Ban Toan Premium",
  partnerCode: "MOMO",
  redirectUrl: "https://momo.vn/return",
  requestId: "BANTON1",
  requestType: "captureWallet",
};

assert(rawSignature(CREATE_FIELDS, createValues) === documentedCreate, "create raw signature drifted from the MoMo field template");
assert(
  hmacSha256(SECRET, documentedCreate) === "2492c67292b427dcd8befced69ae077733a6525dd87f9c75cf7b38052cfc29c6",
  "create HMAC does not match the documented sandbox key",
);
assert(signFields(SECRET, CREATE_FIELDS, createValues) === hmacSha256(SECRET, documentedCreate), "signFields drifted");
assert(crc16CcittFalse("123456789") === "29B1", "CRC-16/CCITT-FALSE check value");

const viet = buildVietQr({
  bin: "970422",
  account: "0881000458086",
  amount: 49000,
  name: "Người dùng mẫu",
  message: "BT12AB34CD",
});
assert(verifyVietQr(viet), "VietQR CRC does not verify");
const decoded = decodeVietQr(viet);
assert(decoded?.bin === "970422", "VietQR BIN");
assert(decoded?.account === "0881000458086", "VietQR account");
assert(decoded?.amount === "49000", "VietQR amount");
assert(decoded?.message === "BT12AB34CD", "VietQR message");
assert(decoded?.service === "QRIBFTTA", "VietQR service");
assert(decoded?.dynamic === true, "VietQR is dynamic");
assert(decoded?.name === "NGUOI DUNG MAU", "VietQR name folded to ASCII");
assert(decodeVietQr(`${viet.slice(0, -1)}0`) === null, "tampered VietQR must fail");

const dir = mkdtempSync(join(tmpdir(), "ban-toan-pay-"));
let clock = 1_700_000_000_000;

async function fakeFetch(_url: string | URL | Request, init?: RequestInit): Promise<Response> {
  const body = JSON.parse(String(init?.body)) as Record<string, string | number>;
  const fields = {
    accessKey: ACCESS,
    amount: String(body.amount),
    extraData: "",
    ipnUrl: String(body.ipnUrl),
    orderId: String(body.orderId),
    orderInfo: String(body.orderInfo),
    partnerCode: "MOMO",
    redirectUrl: String(body.redirectUrl),
    requestId: String(body.requestId),
    requestType: String(body.requestType),
  };
  if (body.signature !== signFields(SECRET, CREATE_FIELDS, fields)) {
    return Response.json({ resultCode: 5, message: "bad sign" });
  }
  const reply = {
    accessKey: ACCESS,
    amount: String(body.amount),
    message: "Success",
    orderId: String(body.orderId),
    partnerCode: "MOMO",
    payUrl: "https://test-payment.momo.vn/pay/demo",
    requestId: String(body.requestId),
    responseTime: "1710000000000",
    resultCode: "0",
  };
  return Response.json({
    ...reply,
    resultCode: 0,
    amount: body.amount,
    deeplink: "momo://pay/demo",
    qrCodeUrl: "https://test-payment.momo.vn/qr/demo",
    signature: signFields(SECRET, CREATE_RESPONSE_FIELDS, reply),
  });
}

const env: PayEnv = payEnv({
  MOMO_PARTNER_CODE: "MOMO",
  MOMO_ACCESS_KEY: ACCESS,
  MOMO_SECRET_KEY: SECRET,
  MOMO_ENDPOINT: "https://test-payment.momo.vn/v2/gateway/api/create",
  PREMIUM_PRICE_MONTH: "49000",
  PREMIUM_PRICE_YEAR: "399000",
  PUBLIC_BASE_URL: "http://pay.local",
  BANK_BIN: "970422",
  BANK_ACCOUNT_NO: "0000000000",
  BANK_ACCOUNT_NAME: "NGUOI DUNG MAU",
  BANK_WEBHOOK_SECRET: "hook-secret",
  ADMIN_TOKEN: "admin-secret",
  PREMIUM_DB_PATH: join(dir, "pay.sqlite"),
}, () => clock, fakeFetch);

async function post(path: string, body: unknown, headers: Record<string, string> = {}): Promise<{ status: number; json: Record<string, unknown> }> {
  const res = await handlePremium(new Request(`http://pay.local${path}`, {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: JSON.stringify(body),
  }), env);
  return { status: res.status, json: await res.json() as Record<string, unknown> };
}

async function get(path: string): Promise<{ status: number; json: Record<string, unknown> }> {
  const res = await handlePremium(new Request(`http://pay.local${path}`), env);
  return { status: res.status, json: await res.json() as Record<string, unknown> };
}

function signedIpn(orderId: string, amount: number, resultCode = 0, transId = "9001"): Record<string, unknown> {
  const fields = {
    accessKey: ACCESS,
    amount: String(amount),
    extraData: "",
    message: "Success",
    orderId,
    orderInfo: "Ban Toan Premium thang",
    orderType: "momo_wallet",
    partnerCode: "MOMO",
    payType: "qr",
    requestId: "req-1",
    responseTime: "1710000000000",
    resultCode: String(resultCode),
    transId,
  };
  return { ...fields, amount, resultCode: Number(resultCode), signature: signFields(SECRET, IPN_FIELDS, fields) };
}

const plans = await get("/api/premium/plans");
assert(plans.status === 200, "plans status");
assert(plans.json.lockContent === false, "content lock defaults off");
assert((plans.json.plans as { amount: number }[])[0]?.amount === 49000, "month price is server config");

const tampered = await post("/api/premium/create", { email: "hieu@example.com", plan: "month", method: "bank", amount: 1000 });
assert(tampered.status === 200, "bank order created");
assert(tampered.json.amount === 49000, "client amount was ignored");
assert(typeof tampered.json.transferCode === "string", "transfer code");
const bankQr = tampered.json.bank as { qrDataUrl?: string; accountNo?: string; sample?: boolean } | undefined;
assert(bankQr?.qrDataUrl?.startsWith("data:image/png;base64,") === true, "VietQR image");
assert(bankQr?.accountNo === "0000000000", "sample account");
assert(bankQr?.sample === true, "sample bank flag");

const wallet = await post("/api/premium/create", { email: "hieu@example.com", plan: "month", method: "wallet" });
assert(wallet.status === 200, `wallet create ${wallet.status} ${JSON.stringify(wallet.json)}`);
assert(wallet.json.payUrl === "https://test-payment.momo.vn/pay/demo", "payUrl");
assert(wallet.json.amount === 49000, "wallet amount");
const orderId = String(wallet.json.orderId);

const badSign = signedIpn(orderId, 49000);
const sig = String(badSign.signature);
badSign.signature = `${sig.slice(0, -1)}${sig.endsWith("0") ? "1" : "0"}`;
const rejected = await post("/api/premium/ipn", badSign);
assert(rejected.status === 401, `bad signature ${rejected.status}`);
const still = await get(`/api/premium/status?orderId=${orderId}`);
assert(still.json.status === "pending", "bad signature did not pay");

const mismatch = await post("/api/premium/ipn", signedIpn(orderId, 1000));
assert(mismatch.status === 400 && mismatch.json.error === "amount", "amount mismatch");
const stillPending = await get(`/api/premium/status?orderId=${orderId}`);
assert(stillPending.json.status === "pending", "mismatch did not pay");

const paid = await post("/api/premium/ipn", signedIpn(orderId, 49000, 0, "9001"));
assert(paid.status === 200 && paid.json.applied === true, "first IPN applies");
const again = await post("/api/premium/ipn", signedIpn(orderId, 49000, 0, "9001"));
assert(again.status === 200 && again.json.applied === false, "replay IPN does not apply twice");
const otherTrans = await post("/api/premium/ipn", signedIpn(orderId, 49000, 0, "9002"));
assert(otherTrans.json.applied === false, "second transId does not grant again");
const after = await get(`/api/premium/status?orderId=${orderId}`);
assert(after.json.status === "paid" && typeof after.json.licenseKey === "string", "one license");
const license = String(after.json.licenseKey);
const active = await get(`/api/premium/status?license=${encodeURIComponent(license)}`);
assert(active.json.active === true, "license is active");

const code = String(tampered.json.transferCode);
const hook = await post("/api/premium/bank", { content: `CK ${code} tien hoc`, amount: 1000, transactionId: "tx-1" }, { "x-bank-secret": "hook-secret" });
assert(hook.status === 400 && hook.json.error === "amount", "bank amount mismatch");
const unauth = await post("/api/premium/bank", { content: code, amount: 49000, transactionId: "tx-2" }, { "x-bank-secret": "nope" });
assert(unauth.status === 401, "bank secret rejected");
const sepay = await post("/api/premium/bank", { content: code, transferAmount: 49000, id: "tx-3" }, { authorization: "Apikey hook-secret" });
assert(sepay.status === 200 && sepay.json.applied === true, "SePay-shaped webhook applies");
const replay = await post("/api/premium/bank", { description: code, amount: 49000, id: "tx-3" }, { "x-bank-secret": "hook-secret" });
assert(replay.status === 200 && replay.json.applied === false, "bank replay does not grant twice");

const anchor = clock;
const fresh = await post("/api/premium/create", { email: "hieu@example.com", plan: "year", method: "bank" });
const freshId = String(fresh.json.orderId);
clock = anchor + 16 * 60 * 1000;
const late = await post("/api/premium/confirm", { orderId: freshId }, { authorization: "Bearer admin-secret" });
assert(late.status === 409, `expired confirm ${late.status}`);
const noAdmin = await post("/api/premium/confirm", { orderId: freshId });
assert(noAdmin.status === 401, "admin token required");

clock = anchor + 1000;
const manual = await post("/api/premium/create", { email: "hieu@example.com", plan: "month", method: "bank" });
const allowed = await post("/api/premium/confirm", { orderId: manual.json.orderId }, { authorization: "Bearer admin-secret" });
assert(allowed.status === 200 && allowed.json.applied === true, "admin confirm");
const allowedAgain = await post("/api/premium/confirm", { orderId: manual.json.orderId }, { authorization: "Bearer admin-secret" });
assert(allowedAgain.json.applied === false, "admin confirm is idempotent");

const ret = await handlePremium(new Request("http://pay.local/api/premium/return?orderId=BTDEMO&resultCode=0"), env);
assert(ret.status === 302, "return redirects");
assert(ret.headers.get("location") === "http://pay.local/nang-cap?orderId=BTDEMO", "return keeps order id and drops resultCode");

if (fails.length > 0) {
  console.error(fails.join("\n"));
  process.exit(1);
}
console.log("pay ok");
