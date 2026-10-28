import { CREATE_FIELDS, CREATE_RESPONSE_FIELDS, IPN_FIELDS, safeEqualHex, signFields } from "./sign.ts";
import type { PayEnv, PayMethod } from "./env.ts";

export type MomoCreate = {
  orderId: string;
  requestId: string;
  amount: number;
  orderInfo: string;
  method: PayMethod;
};

export type MomoSession = {
  resultCode: number;
  message: string;
  payUrl: string;
  deeplink: string;
  qrCodeUrl: string;
};

function requestType(method: PayMethod): string {
  if (method === "qr") return "payWithMethod";
  if (method === "bank") return "payWithATM";
  return "captureWallet";
}

export function createRaw(env: PayEnv, input: MomoCreate): Record<string, string> {
  return {
    accessKey: env.accessKey,
    amount: String(input.amount),
    extraData: "",
    ipnUrl: `${env.publicBaseUrl}/api/premium/ipn`,
    orderId: input.orderId,
    orderInfo: input.orderInfo,
    partnerCode: env.partnerCode,
    redirectUrl: `${env.publicBaseUrl}/api/premium/return`,
    requestId: input.requestId,
    requestType: requestType(input.method),
  };
}

export async function createMomoPayment(env: PayEnv, input: MomoCreate): Promise<MomoSession> {
  const fields = createRaw(env, input);
  const signature = signFields(env.secretKey, CREATE_FIELDS, fields);
  const response = await env.fetchImpl(env.endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      partnerCode: fields.partnerCode,
      accessKey: fields.accessKey,
      requestId: fields.requestId,
      amount: input.amount,
      orderId: fields.orderId,
      orderInfo: fields.orderInfo,
      redirectUrl: fields.redirectUrl,
      ipnUrl: fields.ipnUrl,
      extraData: "",
      requestType: fields.requestType,
      lang: "vi",
      signature,
    }),
  });
  const text = await response.text();
  let body: Record<string, unknown> = {};
  try {
    const parsed: unknown = JSON.parse(text);
    if (parsed && typeof parsed === "object") body = parsed as Record<string, unknown>;
  } catch {
    throw new Error("MoMo did not return JSON");
  }
  const resultCode = Number(body.resultCode);
  const message = typeof body.message === "string" ? body.message : "MoMo error";
  if (!response.ok || resultCode !== 0) {
    throw new Error(message || `MoMo result ${resultCode}`);
  }
  const reply = {
    accessKey: env.accessKey,
    amount: String(body.amount ?? input.amount),
    message,
    orderId: String(body.orderId ?? input.orderId),
    partnerCode: String(body.partnerCode ?? env.partnerCode),
    payUrl: typeof body.payUrl === "string" ? body.payUrl : "",
    requestId: String(body.requestId ?? input.requestId),
    responseTime: String(body.responseTime ?? ""),
    resultCode: String(resultCode),
  };
  const got = typeof body.signature === "string" ? body.signature : "";
  if (got) {
    const expected = signFields(env.secretKey, CREATE_RESPONSE_FIELDS, reply);
    if (!safeEqualHex(expected, got)) throw new Error("MoMo response signature does not match");
  }
  return {
    resultCode,
    message,
    payUrl: reply.payUrl,
    deeplink: typeof body.deeplink === "string" ? body.deeplink : "",
    qrCodeUrl: typeof body.qrCodeUrl === "string" ? body.qrCodeUrl : "",
  };
}

export type IpnBody = {
  amount: number;
  extraData: string;
  message: string;
  orderId: string;
  orderInfo: string;
  orderType: string;
  partnerCode: string;
  payType: string;
  requestId: string;
  responseTime: string;
  resultCode: number;
  transId: string;
  signature: string;
};

function asString(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return "";
}

export function readIpn(value: unknown): IpnBody | null {
  if (!value || typeof value !== "object") return null;
  const body = value as Record<string, unknown>;
  const orderId = asString(body.orderId);
  const signature = asString(body.signature);
  if (!orderId || !signature) return null;
  const amount = Number(body.amount);
  const resultCode = Number(body.resultCode);
  if (!Number.isFinite(amount) || !Number.isFinite(resultCode)) return null;
  return {
    amount,
    extraData: asString(body.extraData),
    message: asString(body.message),
    orderId,
    orderInfo: asString(body.orderInfo),
    orderType: asString(body.orderType),
    partnerCode: asString(body.partnerCode),
    payType: asString(body.payType),
    requestId: asString(body.requestId),
    responseTime: asString(body.responseTime),
    resultCode,
    transId: asString(body.transId),
    signature,
  };
}

export function ipnSignatureOk(env: PayEnv, ipn: IpnBody): boolean {
  const expected = signFields(env.secretKey, IPN_FIELDS, {
    accessKey: env.accessKey,
    amount: String(ipn.amount),
    extraData: ipn.extraData,
    message: ipn.message,
    orderId: ipn.orderId,
    orderInfo: ipn.orderInfo,
    orderType: ipn.orderType,
    partnerCode: ipn.partnerCode,
    payType: ipn.payType,
    requestId: ipn.requestId,
    responseTime: ipn.responseTime,
    resultCode: String(ipn.resultCode),
    transId: ipn.transId,
  });
  return safeEqualHex(expected, ipn.signature);
}
