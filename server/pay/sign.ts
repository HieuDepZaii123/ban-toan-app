import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * MoMo AIO v2 signs a fixed field list, not a generic sort of the JSON body.
 * Create order template, from the captureWallet reference:
 * https://developers.momo.vn/v3/docs/payment/api/wallet/onetime/
 */
export const CREATE_FIELDS = [
  "accessKey",
  "amount",
  "extraData",
  "ipnUrl",
  "orderId",
  "orderInfo",
  "partnerCode",
  "redirectUrl",
  "requestId",
  "requestType",
] as const;

/**
 * IPN template used by MoMo's AIO v2 notification.
 * accessKey is added by the merchant; it is not a field MoMo posts.
 */
export const IPN_FIELDS = [
  "accessKey",
  "amount",
  "extraData",
  "message",
  "orderId",
  "orderInfo",
  "orderType",
  "partnerCode",
  "payType",
  "requestId",
  "responseTime",
  "resultCode",
  "transId",
] as const;

/** Create-payment response, same order as MoMo's sample clients. */
export const CREATE_RESPONSE_FIELDS = [
  "accessKey",
  "amount",
  "message",
  "orderId",
  "partnerCode",
  "payUrl",
  "requestId",
  "responseTime",
  "resultCode",
] as const;

export function rawSignature(fields: readonly string[], values: Record<string, string | number | null | undefined>): string {
  return fields.map((key) => `${key}=${values[key] ?? ""}`).join("&");
}

export function hmacSha256(secret: string, raw: string): string {
  return createHmac("sha256", secret).update(raw, "utf8").digest("hex");
}

export function signFields(secret: string, fields: readonly string[], values: Record<string, string | number | null | undefined>): string {
  return hmacSha256(secret, rawSignature(fields, values));
}

export function safeEqualHex(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length || left.length === 0) return false;
  return timingSafeEqual(left, right);
}
