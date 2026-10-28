import { createHash, randomInt } from "node:crypto";
import type { PayEnv } from "./env.ts";

export const CRYPTO_CHAIN_IDS = ["tron-usdt", "bsc-usdt", "bsc-usdc", "sol-usdc"] as const;
export type CryptoChainId = (typeof CRYPTO_CHAIN_IDS)[number];
export type CryptoAsset = "USDT" | "USDC";
export type RateSource = "live" | "config";

/** keccak256("Transfer(address,address,uint256)") */
export const TRANSFER_TOPIC = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";

export const SAMPLE_BSC_ADDRESS = "0x0000000000000000000000000000000000ba7010";
export const SAMPLE_SOL_ADDRESS = "11111111111111111111111111111111";
const SAMPLE_TRON_HEX = `41${"0000000000000000000000000000000000ba7010"}`;

const B58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

export type ChainSpec = {
  id: CryptoChainId;
  family: "tron" | "evm" | "solana";
  asset: CryptoAsset;
  network: string;
  standard: string;
  decimals: number;
  contract: string;
  chainId: number | null;
};

export const CHAINS: Record<CryptoChainId, ChainSpec> = {
  "tron-usdt": {
    id: "tron-usdt",
    family: "tron",
    asset: "USDT",
    network: "TRON",
    standard: "TRC20",
    decimals: 6,
    contract: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
    chainId: null,
  },
  "bsc-usdt": {
    id: "bsc-usdt",
    family: "evm",
    asset: "USDT",
    network: "BSC",
    standard: "BEP20",
    decimals: 18,
    contract: "0x55d398326f99059fF775485246999027B3197955",
    chainId: 56,
  },
  "bsc-usdc": {
    id: "bsc-usdc",
    family: "evm",
    asset: "USDC",
    network: "BSC",
    standard: "BEP20",
    decimals: 18,
    contract: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
    chainId: 56,
  },
  "sol-usdc": {
    id: "sol-usdc",
    family: "solana",
    asset: "USDC",
    network: "Solana",
    standard: "SPL",
    decimals: 6,
    contract: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    chainId: null,
  },
};

export type CryptoQuote = {
  chain: CryptoChainId;
  asset: CryptoAsset;
  units: string;
  display: string;
  smallest: bigint;
  rate: number;
  rateSource: RateSource;
  suffix: number;
  address: string;
  contract: string;
  decimals: number;
};

export type VerifyResult =
  | { ok: true; confirmations: number }
  | {
      ok: false;
      error: "not_found" | "mismatch" | "confirmations" | "rpc" | "failed";
      field?: "contract" | "to" | "amount" | "chain" | "status";
      have?: number;
      need?: number;
    };

export function isCryptoChain(value: unknown): value is CryptoChainId {
  return typeof value === "string" && (CRYPTO_CHAIN_IDS as readonly string[]).includes(value);
}

export function chainSpec(id: CryptoChainId): ChainSpec {
  return CHAINS[id];
}

function sha256(bytes: Uint8Array): Buffer {
  return createHash("sha256").update(bytes).digest();
}

export function base58Encode(bytes: Uint8Array): string {
  let zeros = 0;
  while (zeros < bytes.length && bytes[zeros] === 0) zeros += 1;
  if (zeros === bytes.length) return "1".repeat(bytes.length);
  const digits = [0];
  for (let i = zeros; i < bytes.length; i += 1) {
    let carry = bytes[i] ?? 0;
    for (let j = 0; j < digits.length; j += 1) {
      carry += (digits[j] ?? 0) << 8;
      digits[j] = carry % 58;
      carry = Math.floor(carry / 58);
    }
    while (carry > 0) {
      digits.push(carry % 58);
      carry = Math.floor(carry / 58);
    }
  }
  let out = "1".repeat(zeros);
  for (let i = digits.length - 1; i >= 0; i -= 1) out += B58[digits[i] ?? 0];
  return out;
}

export function base58Decode(text: string): Uint8Array | null {
  if (!text || [...text].some((char) => !B58.includes(char))) return null;
  let zeros = 0;
  while (zeros < text.length && text[zeros] === "1") zeros += 1;
  if (zeros === text.length) return new Uint8Array(zeros);
  const digits = [0];
  for (let i = zeros; i < text.length; i += 1) {
    let carry = B58.indexOf(text[i] ?? "");
    for (let j = 0; j < digits.length; j += 1) {
      carry += (digits[j] ?? 0) * 58;
      digits[j] = carry & 0xff;
      carry >>= 8;
    }
    while (carry > 0) {
      digits.push(carry & 0xff);
      carry >>= 8;
    }
  }
  const body = new Uint8Array(zeros + digits.length);
  for (let i = 0; i < digits.length; i += 1) body[zeros + i] = digits[digits.length - 1 - i] ?? 0;
  return body;
}

function hexToBytes(hex: string): Uint8Array {
  const clean = hex.replace(/^0x/, "");
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i += 1) out[i] = Number.parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  return out;
}

export function tronBase58(payload21: Uint8Array): string {
  const check = sha256(sha256(payload21)).subarray(0, 4);
  const full = new Uint8Array(payload21.length + 4);
  full.set(payload21, 0);
  full.set(check, payload21.length);
  return base58Encode(full);
}

/** 20-byte hex, lowercase, no 0x. Null when the address is not a TRON base58check. */
export function tronTo20(address: string): string | null {
  const raw = base58Decode(address.trim());
  if (!raw || raw.length !== 25 || raw[0] !== 0x41) return null;
  const payload = raw.subarray(0, 21);
  const check = raw.subarray(21);
  const expect = sha256(sha256(payload)).subarray(0, 4);
  for (let i = 0; i < 4; i += 1) if (check[i] !== expect[i]) return null;
  return Buffer.from(payload.subarray(1)).toString("hex");
}

export const SAMPLE_TRON_ADDRESS = tronBase58(hexToBytes(SAMPLE_TRON_HEX));

export function formatUnits6(units: bigint): string {
  const neg = units < 0n;
  const abs = neg ? -units : units;
  const whole = abs / 1_000_000n;
  const frac = (abs % 1_000_000n).toString().padStart(6, "0");
  return `${neg ? "-" : ""}${whole.toString()}.${frac}`;
}

/** VND → 6-decimal USD units, plus a 4-digit suffix that keeps the cent amount readable. */
export function quoteUnits(vnd: number, vndPerUsd: number, suffix: number): { units6: bigint; display: string } {
  if (!Number.isInteger(vnd) || vnd < 1000) throw new Error("amount");
  if (!Number.isInteger(vndPerUsd) || vndPerUsd < 1000 || vndPerUsd > 1_000_000) throw new Error("rate");
  if (!Number.isInteger(suffix) || suffix < 1 || suffix > 9999) throw new Error("suffix");
  const cents = Math.round((vnd * 100) / vndPerUsd);
  if (cents < 1) throw new Error("amount");
  const units6 = BigInt(cents) * 10_000n + BigInt(suffix);
  return { units6, display: formatUnits6(units6) };
}

export function toSmallest(units6: bigint, decimals: number): bigint {
  if (!Number.isInteger(decimals) || decimals < 6 || decimals > 36) throw new Error("decimals");
  return units6 * 10n ** BigInt(decimals - 6);
}

export function displayFromSmallest(smallest: bigint, decimals: number): string {
  const scale = 10n ** BigInt(decimals - 6);
  if (smallest % scale !== 0n) throw new Error("amount");
  return formatUnits6(smallest / scale);
}

export function readVndRate(value: unknown): number | null {
  if (!value || typeof value !== "object") return null;
  const body = value as Record<string, unknown>;
  if (typeof body.vndPerUsd === "number" && Number.isFinite(body.vndPerUsd)) return Math.round(body.vndPerUsd);
  const rates = body.rates;
  if (!rates || typeof rates !== "object") return null;
  const vnd = (rates as Record<string, unknown>).VND;
  if (typeof vnd !== "number" || !Number.isFinite(vnd)) return null;
  return Math.round(vnd);
}

export async function resolveRate(env: PayEnv): Promise<{ rate: number; source: RateSource }> {
  const fallback = env.cryptoVndPerUsd;
  if (!env.cryptoRateUrl) return { rate: fallback, source: "config" };
  try {
    const res = await env.fetchImpl(env.cryptoRateUrl, { signal: AbortSignal.timeout(2500) });
    if (!res.ok) return { rate: fallback, source: "config" };
    const rate = readVndRate(await res.json());
    if (rate === null || rate < 1000 || rate > 1_000_000) return { rate: fallback, source: "config" };
    return { rate, source: "live" };
  } catch {
    return { rate: fallback, source: "config" };
  }
}

export function receiveAddress(env: PayEnv, id: CryptoChainId): string {
  const spec = CHAINS[id];
  if (spec.family === "tron") return env.cryptoTronAddress.trim();
  if (spec.family === "evm") return env.cryptoBscAddress.trim();
  return env.cryptoSolAddress.trim();
}

export function chainSample(env: PayEnv, id: CryptoChainId): boolean {
  const got = receiveAddress(env, id);
  const spec = CHAINS[id];
  if (spec.family === "evm") return got.toLowerCase() === SAMPLE_BSC_ADDRESS;
  if (spec.family === "solana") return got === SAMPLE_SOL_ADDRESS;
  return got === SAMPLE_TRON_ADDRESS;
}

export function addressOk(spec: ChainSpec, address: string): boolean {
  if (spec.family === "evm") return /^0x[0-9a-fA-F]{40}$/.test(address);
  if (spec.family === "tron") return tronTo20(address) !== null;
  const raw = base58Decode(address);
  return raw !== null && raw.length === 32;
}

export function minConfirmations(env: PayEnv, spec: ChainSpec): number {
  if (spec.family === "tron") return env.cryptoTronConfirmations;
  if (spec.family === "evm") return env.cryptoBscConfirmations;
  return env.cryptoSolFinalized ? 1 : env.cryptoSolConfirmations;
}

export async function quoteCrypto(
  env: PayEnv,
  chainId: CryptoChainId,
  vnd: number,
  taken: (units: string) => boolean,
): Promise<CryptoQuote> {
  const spec = CHAINS[chainId];
  const address = receiveAddress(env, chainId);
  if (!addressOk(spec, address)) throw new Error("receive address is not valid");
  const { rate, source } = await resolveRate(env);
  const start = randomInt(1, 10_000);
  for (let i = 0; i < 9999; i += 1) {
    const suffix = ((start + i - 1) % 9999) + 1;
    const quoted = quoteUnits(vnd, rate, suffix);
    const smallest = toSmallest(quoted.units6, spec.decimals);
    const units = smallest.toString();
    if (taken(units)) continue;
    return {
      chain: chainId,
      asset: spec.asset,
      units,
      display: quoted.display,
      smallest,
      rate,
      rateSource: source,
      suffix,
      address,
      contract: spec.contract,
      decimals: spec.decimals,
    };
  }
  throw new Error("suffix space is full");
}

export function paymentUri(spec: ChainSpec, address: string, display: string, smallest: bigint, orderId: string): string {
  if (spec.family === "evm") {
    return `ethereum:${spec.contract}@${spec.chainId}/transfer?address=${address}&uint256=${smallest.toString()}`;
  }
  if (spec.family === "solana") {
    const query = new URLSearchParams({
      amount: display,
      "spl-token": spec.contract,
      label: "Ban Toan Premium",
      message: orderId,
    });
    return `solana:${address}?${query.toString()}`;
  }
  const query = new URLSearchParams({
    amount: display,
    token: spec.asset,
    contract: spec.contract,
    memo: orderId,
  });
  return `tron:${address}?${query.toString()}`;
}

export function normalizeTx(chainId: CryptoChainId, raw: string): string | null {
  const text = raw.trim();
  const spec = CHAINS[chainId];
  if (spec.family === "evm") {
    const hex = text.startsWith("0x") || text.startsWith("0X") ? text : `0x${text}`;
    return /^0x[0-9a-fA-F]{64}$/.test(hex) ? hex.toLowerCase() : null;
  }
  if (spec.family === "tron") {
    const hex = text.replace(/^0x/i, "");
    return /^[0-9a-fA-F]{64}$/.test(hex) ? hex.toLowerCase() : null;
  }
  return /^[1-9A-HJ-NP-Za-km-z]{64,88}$/.test(text) ? text : null;
}

export async function verifyCrypto(env: PayEnv, chainId: CryptoChainId, tx: string, smallest: bigint): Promise<VerifyResult> {
  const spec = CHAINS[chainId];
  try {
    if (spec.family === "evm") return await verifyEvm(env, spec, tx, smallest);
    if (spec.family === "tron") return await verifyTron(env, spec, tx, smallest);
    return await verifySolana(env, spec, tx, smallest);
  } catch {
    return { ok: false, error: "rpc" };
  }
}

function asRecord(value: unknown): Record<string, unknown> {
  if (value && typeof value === "object" && !Array.isArray(value)) return value as Record<string, unknown>;
  return {};
}

function hexInt(value: unknown): bigint | null {
  if (typeof value === "bigint") return value >= 0n ? value : null;
  if (typeof value === "number" && Number.isInteger(value) && value >= 0) return BigInt(value);
  if (typeof value !== "string") return null;
  const text = value.trim();
  if (/^0x[0-9a-fA-F]+$/.test(text)) return BigInt(text);
  if (/^[0-9]+$/.test(text)) return BigInt(text);
  return null;
}

function topicAddress(topic: string): string {
  return topic.toLowerCase().replace(/^0x/, "").slice(-40);
}

async function rpcCall(env: PayEnv, url: string, method: string, params: unknown[]): Promise<unknown> {
  const res = await env.fetchImpl(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`rpc ${res.status}`);
  const body = asRecord(await res.json());
  if (body.error) throw new Error("rpc");
  return body.result;
}

async function postJson(env: PayEnv, url: string, payload: unknown): Promise<unknown> {
  const res = await env.fetchImpl(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`http ${res.status}`);
  return res.json();
}

type TransferScan = { ok: true } | { ok: false; field: "contract" | "to" | "amount" };

function scanTransfers(
  logs: { address?: string; topics?: string[]; data?: string }[],
  contractKey: string,
  toKey: string,
  expected: bigint,
): TransferScan {
  const fromContract = logs.filter((log) => topicAddress(log.address ?? "") === contractKey && (log.topics?.[0] ?? "").toLowerCase().replace(/^0x/, "") === TRANSFER_TOPIC.slice(2));
  if (fromContract.length === 0) return { ok: false, field: "contract" };
  const toUs = fromContract.filter((log) => topicAddress(log.topics?.[2] ?? "") === toKey);
  if (toUs.length === 0) return { ok: false, field: "to" };
  let sum = 0n;
  for (const log of toUs) {
    const data = log.data ?? "";
    const parsed = hexInt(data.startsWith("0x") || data.startsWith("0X") ? data : `0x${data}`);
    if (parsed === null) return { ok: false, field: "amount" };
    sum += parsed;
  }
  return sum === expected ? { ok: true } : { ok: false, field: "amount" };
}

async function verifyEvm(env: PayEnv, spec: ChainSpec, tx: string, smallest: bigint): Promise<VerifyResult> {
  const [chainHex, receiptRaw, latestRaw] = await Promise.all([
    rpcCall(env, env.cryptoBscRpc, "eth_chainId", []),
    rpcCall(env, env.cryptoBscRpc, "eth_getTransactionReceipt", [tx]),
    rpcCall(env, env.cryptoBscRpc, "eth_blockNumber", []),
  ]);
  const chain = hexInt(chainHex);
  if (chain === null || Number(chain) !== spec.chainId) return { ok: false, error: "mismatch", field: "chain" };
  if (receiptRaw == null) return { ok: false, error: "not_found" };
  const receipt = asRecord(receiptRaw);
  const status = String(receipt.status ?? "").toLowerCase();
  if (status !== "0x1" && status !== "0x01") return { ok: false, error: "failed", field: "status" };
  const txBlock = hexInt(receipt.blockNumber);
  const head = hexInt(latestRaw);
  if (txBlock === null || head === null || head < txBlock) return { ok: false, error: "rpc" };
  const have = Number(head - txBlock + 1n);
  const need = minConfirmations(env, spec);
  if (have < need) return { ok: false, error: "confirmations", have, need };
  const logs = Array.isArray(receipt.logs) ? receipt.logs.map((log) => asRecord(log)) : [];
  const scan = scanTransfers(
    logs.map((log) => ({
      address: typeof log.address === "string" ? log.address : "",
      topics: Array.isArray(log.topics) ? log.topics.filter((topic): topic is string => typeof topic === "string") : [],
      data: typeof log.data === "string" ? log.data : "",
    })),
    spec.contract.toLowerCase().replace(/^0x/, ""),
    receiveAddress(env, spec.id).toLowerCase().replace(/^0x/, ""),
    smallest,
  );
  if (!scan.ok) return { ok: false, error: "mismatch", field: scan.field };
  return { ok: true, confirmations: have };
}

async function verifyTron(env: PayEnv, spec: ChainSpec, tx: string, smallest: bigint): Promise<VerifyResult> {
  const base = env.cryptoTronApi.replace(/\/$/, "");
  const [infoRaw, txRaw, headRaw] = await Promise.all([
    postJson(env, `${base}/wallet/gettransactioninfobyid`, { value: tx }),
    postJson(env, `${base}/wallet/gettransactionbyid`, { value: tx }),
    postJson(env, `${base}/wallet/getnowblock`, {}),
  ]);
  const info = asRecord(infoRaw);
  if (!info.id && info.blockNumber === undefined) return { ok: false, error: "not_found" };
  const contractRet = String(asRecord(Array.isArray(asRecord(txRaw).ret) ? (asRecord(txRaw).ret as unknown[])[0] : {}).contractRet ?? "");
  const receiptResult = String(asRecord(info.receipt).result ?? "");
  if (contractRet && contractRet !== "SUCCESS") return { ok: false, error: "failed", field: "status" };
  if (receiptResult && receiptResult !== "SUCCESS") return { ok: false, error: "failed", field: "status" };
  const txBlock = hexInt(info.blockNumber);
  const head = hexInt(asRecord(asRecord(asRecord(headRaw).block_header).raw_data).number);
  if (txBlock === null || head === null || head < txBlock) return { ok: false, error: "rpc" };
  const have = Number(head - txBlock + 1n);
  const need = minConfirmations(env, spec);
  if (have < need) return { ok: false, error: "confirmations", have, need };
  const contract = tronTo20(spec.contract);
  const to = tronTo20(receiveAddress(env, spec.id));
  if (!contract || !to) return { ok: false, error: "rpc" };
  const logs = Array.isArray(info.log) ? info.log.map((log) => asRecord(log)) : [];
  const scan = scanTransfers(
    logs.map((log) => ({
      address: typeof log.address === "string" ? log.address : "",
      topics: Array.isArray(log.topics) ? log.topics.filter((topic): topic is string => typeof topic === "string") : [],
      data: typeof log.data === "string" ? log.data : "",
    })),
    contract,
    to,
    smallest,
  );
  if (!scan.ok) return { ok: false, error: "mismatch", field: scan.field };
  return { ok: true, confirmations: have };
}

type TokenBal = { owner?: string; mint?: string; uiTokenAmount?: { amount?: string } };

function tokenSum(rows: TokenBal[], owner: string, mint: string): { sum: bigint; sawMint: boolean; sawOwner: boolean } {
  let sum = 0n;
  let sawMint = false;
  let sawOwner = false;
  for (const row of rows) {
    if (row.mint === mint) sawMint = true;
    if (row.owner === owner && row.mint === mint) {
      sawOwner = true;
      sum += BigInt(row.uiTokenAmount?.amount || "0");
    }
  }
  return { sum, sawMint, sawOwner };
}

async function verifySolana(env: PayEnv, spec: ChainSpec, tx: string, smallest: bigint): Promise<VerifyResult> {
  const [txRaw, statusRaw] = await Promise.all([
    rpcCall(env, env.cryptoSolRpc, "getTransaction", [tx, { encoding: "jsonParsed", commitment: "finalized", maxSupportedTransactionVersion: 0 }]),
    rpcCall(env, env.cryptoSolRpc, "getSignatureStatuses", [[tx], { searchTransactionHistory: true }]),
  ]);
  const slot = asRecord(statusRaw);
  const status = Array.isArray(slot.value) ? asRecord(slot.value[0]) : {};
  if (txRaw == null && !status.confirmationStatus) return { ok: false, error: "not_found" };
  if (status.err) return { ok: false, error: "failed", field: "status" };
  const finalized = status.confirmationStatus === "finalized";
  const have = status.confirmations == null ? (finalized ? minConfirmations(env, spec) : 0) : Number(status.confirmations);
  if (env.cryptoSolFinalized) {
    if (!finalized) return { ok: false, error: "confirmations", have, need: 32 };
  } else if (!finalized && have < env.cryptoSolConfirmations) {
    return { ok: false, error: "confirmations", have, need: env.cryptoSolConfirmations };
  }
  if (txRaw == null) return { ok: false, error: "not_found" };
  const meta = asRecord(asRecord(txRaw).meta);
  if (meta.err) return { ok: false, error: "failed", field: "status" };
  const pre = (Array.isArray(meta.preTokenBalances) ? meta.preTokenBalances : []) as TokenBal[];
  const post = (Array.isArray(meta.postTokenBalances) ? meta.postTokenBalances : []) as TokenBal[];
  const owner = receiveAddress(env, spec.id);
  const before = tokenSum(pre, owner, spec.contract);
  const after = tokenSum(post, owner, spec.contract);
  if (!after.sawMint && !before.sawMint) return { ok: false, error: "mismatch", field: "contract" };
  if (!after.sawOwner && !before.sawOwner) return { ok: false, error: "mismatch", field: "to" };
  const delta = after.sum - before.sum;
  if (delta !== smallest) return { ok: false, error: "mismatch", field: "amount" };
  return { ok: true, confirmations: finalized ? Math.max(have, 1) : have };
}
