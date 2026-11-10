import type { PayStore } from "./store.ts";
import { SAMPLE_BSC_ADDRESS, SAMPLE_SOL_ADDRESS, SAMPLE_TRON_ADDRESS } from "./crypto.ts";

export type PlanId = "month" | "year";
export type PayMethod = "wallet" | "qr" | "bank" | "crypto";

export type PayEnv = {
  partnerCode: string;
  accessKey: string;
  secretKey: string;
  endpoint: string;
  priceMonth: number;
  priceYear: number;
  publicBaseUrl: string;
  bankBin: string;
  bankAccountNo: string;
  bankAccountName: string;
  bankName: string;
  webhookSecret: string;
  adminToken: string;
  dbPath: string;
  /** Chuỗi kết nối Postgres. Có thì dùng Postgres thay SQLite. */
  databaseUrl: string;
  /** Kho dựng sẵn (test). Bỏ trống thì handler tự chọn theo databaseUrl / dbPath. */
  store?: PayStore;
  sampleBank: boolean;
  lockContent: boolean;
  cryptoVndPerUsd: number;
  cryptoRateUrl: string;
  cryptoTronAddress: string;
  cryptoBscAddress: string;
  cryptoSolAddress: string;
  cryptoTronApi: string;
  cryptoBscRpc: string;
  cryptoSolRpc: string;
  cryptoTronConfirmations: number;
  cryptoBscConfirmations: number;
  cryptoSolConfirmations: number;
  cryptoSolFinalized: boolean;
  /** Hoa hồng theo phần vạn. 1000 = 10%. Chỉ áp vào đơn đã thanh toán. */
  affiliateRateBps: number;
  /** Production deploy: sandbox/sample secrets are refused instead of silently used. */
  live: boolean;
  /** MoMo has a real merchant secret (never the public sandbox one when live). */
  momoReady: boolean;
  now: () => number;
  fetchImpl: typeof fetch;
};

/** Public sandbox keys published by MoMo for test-payment.momo.vn. Not a live merchant secret. */
export const MOMO_SANDBOX = {
  partnerCode: "MOMO",
  accessKey: "F8BBA842ECF85",
  secretKey: "K951B6PE1waDMi640xX08PD3vg6EkVlz",
  endpoint: "https://test-payment.momo.vn/v2/gateway/api/create",
} as const;

const SAMPLE_ACCOUNT = "0000000000";

/** Placeholder values from .env.example. Never accepted as real secrets. */
const SAMPLE_SECRETS = new Set(["doi-bi-mat-webhook", "doi-token-admin"]);

/** A shared secret is only usable if it is not a placeholder (and, when live, long enough to guess-proof). */
function secret(value: string | undefined, live: boolean): string {
  const text = value?.trim() ?? "";
  if (!text || SAMPLE_SECRETS.has(text)) return "";
  if (live && text.length < 16) return "";
  return text;
}

export function isLive(source: NodeJS.ProcessEnv): boolean {
  if (source.PAY_LIVE === "0") return false;
  return source.PAY_LIVE === "1" || source.VERCEL_ENV === "production" || source.NODE_ENV === "production";
}

function integer(value: string | undefined, fallback: number): number {
  if (value === undefined || value.trim() === "") return fallback;
  const parsed = Number(value);
  if (!Number.isInteger(parsed)) throw new Error("price must be an integer number of dong");
  return parsed;
}

function bounded(value: string | undefined, fallback: number, min: number, max: number): number {
  if (value === undefined || value.trim() === "") return fallback;
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < min || parsed > max) return fallback;
  return parsed;
}

export function payEnv(source: NodeJS.ProcessEnv = process.env, now: () => number = Date.now, fetchImpl: typeof fetch = fetch): PayEnv {
  const bankAccountNo = source.BANK_ACCOUNT_NO?.trim() || SAMPLE_ACCOUNT;
  const bankAccountName = source.BANK_ACCOUNT_NAME?.trim() || "NGUOI DUNG MAU";
  const live = isLive(source);
  const secretKey = source.MOMO_SECRET_KEY?.trim() || MOMO_SANDBOX.secretKey;
  const endpoint = source.MOMO_ENDPOINT?.trim() || MOMO_SANDBOX.endpoint;
  const sandbox = secretKey === MOMO_SANDBOX.secretKey || endpoint === MOMO_SANDBOX.endpoint;
  return {
    partnerCode: source.MOMO_PARTNER_CODE?.trim() || MOMO_SANDBOX.partnerCode,
    accessKey: source.MOMO_ACCESS_KEY?.trim() || MOMO_SANDBOX.accessKey,
    secretKey,
    endpoint,
    priceMonth: integer(source.PREMIUM_PRICE_MONTH, 49000),
    priceYear: integer(source.PREMIUM_PRICE_YEAR, 399000),
    publicBaseUrl: (source.PUBLIC_BASE_URL?.trim() || "http://127.0.0.1:43123").replace(/\/$/, ""),
    bankBin: source.BANK_BIN?.trim() || "970422",
    bankAccountNo,
    bankAccountName,
    bankName: source.BANK_NAME?.trim() || "Ngan hang mau",
    webhookSecret: secret(source.BANK_WEBHOOK_SECRET, live),
    adminToken: secret(source.ADMIN_TOKEN, live),
    dbPath: source.PREMIUM_DB_PATH?.trim() || "data/premium.sqlite",
    databaseUrl: source.DATABASE_URL?.trim() || source.POSTGRES_URL?.trim() || "",
    sampleBank: bankAccountNo === SAMPLE_ACCOUNT || bankAccountName === "NGUOI DUNG MAU",
    lockContent: source.PREMIUM_LOCK === "1" || source.VITE_PREMIUM_LOCK === "1",
    cryptoVndPerUsd: bounded(source.CRYPTO_VND_PER_USD, 25_000, 1000, 1_000_000),
    cryptoRateUrl: source.CRYPTO_RATE_URL === undefined
      ? "https://api.frankfurter.app/latest?from=USD&to=VND"
      : source.CRYPTO_RATE_URL.trim(),
    cryptoTronAddress: source.CRYPTO_TRON_ADDRESS?.trim() || SAMPLE_TRON_ADDRESS,
    cryptoBscAddress: source.CRYPTO_BSC_ADDRESS?.trim() || SAMPLE_BSC_ADDRESS,
    cryptoSolAddress: source.CRYPTO_SOL_ADDRESS?.trim() || SAMPLE_SOL_ADDRESS,
    cryptoTronApi: (source.CRYPTO_TRON_API?.trim() || "https://api.trongrid.io").replace(/\/$/, ""),
    cryptoBscRpc: source.CRYPTO_BSC_RPC?.trim() || "https://bsc-dataseed.binance.org",
    cryptoSolRpc: source.CRYPTO_SOL_RPC?.trim() || "https://api.mainnet-beta.solana.com",
    cryptoTronConfirmations: bounded(source.CRYPTO_TRON_CONFIRMATIONS, 19, 1, 200),
    cryptoBscConfirmations: bounded(source.CRYPTO_BSC_CONFIRMATIONS, 15, 1, 200),
    cryptoSolConfirmations: bounded(source.CRYPTO_SOL_CONFIRMATIONS, 32, 1, 200),
    cryptoSolFinalized: source.CRYPTO_SOL_REQUIRE_FINALIZED !== "0",
    affiliateRateBps: bounded(source.AFFILIATE_RATE_BPS, 1000, 0, 5000),
    live,
    momoReady: !(live && sandbox),
    now,
    fetchImpl,
  };
}

export function priceOf(env: PayEnv, plan: PlanId): number {
  const amount = plan === "month" ? env.priceMonth : env.priceYear;
  if (!Number.isInteger(amount) || amount < 1000 || amount > 50_000_000) {
    throw new Error("premium price is outside MoMo's 1.000–50.000.000 VND range");
  }
  return amount;
}
