import { createHash, randomBytes } from "node:crypto";

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function commissionOf(amount: number, rateBps: number): number {
  if (!Number.isInteger(amount) || amount < 0) return 0;
  if (!Number.isInteger(rateBps) || rateBps <= 0) return 0;
  return Math.floor(amount * rateBps / 10_000);
}

export function normalizeCode(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const code = value.trim().toUpperCase();
  return /^[A-Z0-9]{6,12}$/.test(code) ? code : null;
}

export function secretHash(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const secret = value.trim();
  if (!/^[A-Za-z0-9_-]{16,128}$/.test(secret)) return null;
  return createHash("sha256").update(secret).digest("hex");
}

export function newAffiliateCode(): string {
  const bytes = randomBytes(8);
  let code = "";
  for (const byte of bytes) code += ALPHABET[byte % ALPHABET.length];
  return code;
}

export function sameReferrer(ownerHash: string | null, codeOwner: string, buyerEmail: string, codeEmail: string | null): boolean {
  if (ownerHash && ownerHash === codeOwner) return true;
  if (codeEmail && buyerEmail === codeEmail) return true;
  return false;
}
