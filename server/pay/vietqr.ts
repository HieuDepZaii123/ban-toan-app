/** CRC-16/CCITT-FALSE. The check value of "123456789" is 29B1. */
export function crc16CcittFalse(data: string): string {
  let crc = 0xffff;
  for (let i = 0; i < data.length; i += 1) {
    crc ^= data.charCodeAt(i) << 8;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) : (crc << 1);
      crc &= 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

function tlv(tag: string, value: string): string {
  if (value.length > 99) throw new Error(`VietQR field ${tag} is too long`);
  return `${tag}${String(value.length).padStart(2, "0")}${value}`;
}

export type VietQrInput = {
  bin: string;
  account: string;
  amount: number;
  name: string;
  message: string;
  city?: string;
};

export type VietQrDecoded = {
  bin: string;
  account: string;
  amount: string;
  name: string;
  message: string;
  service: string;
  dynamic: boolean;
};

/** ASCII, uppercase, at most 25 characters. EMV merchant name has no diacritics. */
export function emvName(name: string): string {
  const ascii = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Za-z0-9 ]/g, " ").replace(/\s+/g, " ").trim().toUpperCase();
  return ascii.slice(0, 25) || "NGUOI NHAN";
}

export function parseTlv(payload: string): Map<string, string> {
  const out = new Map<string, string>();
  let index = 0;
  while (index + 4 <= payload.length) {
    const tag = payload.slice(index, index + 2);
    const len = Number(payload.slice(index + 2, index + 4));
    if (!Number.isInteger(len) || len < 0) break;
    const value = payload.slice(index + 4, index + 4 + len);
    if (value.length !== len) break;
    out.set(tag, value);
    index += 4 + len;
  }
  return out;
}

/**
 * NAPAS VietQR, EMVCo merchant-presented.
 * Tag 38 holds GUID A000000727, the beneficiary, and service QRIBFTTA (transfer to account).
 * Tag 63 is CRC-16/CCITT-FALSE over the payload including the literal "6304".
 */
export function buildVietQr(input: VietQrInput): string {
  if (!/^\d{6}$/.test(input.bin)) throw new Error("BANK_BIN must be 6 digits");
  if (!/^[0-9A-Za-z]{1,19}$/.test(input.account)) throw new Error("BANK_ACCOUNT_NO is not a usable account number");
  if (!Number.isInteger(input.amount) || input.amount < 1) throw new Error("amount must be a positive integer");
  const beneficiary = tlv("00", input.bin) + tlv("01", input.account);
  const merchant = tlv("00", "A000000727") + tlv("01", beneficiary) + tlv("02", "QRIBFTTA");
  const message = input.message.replace(/[^A-Za-z0-9]/g, "").slice(0, 25);
  if (!message) throw new Error("transfer message is empty");
  const body = [
    tlv("00", "01"),
    tlv("01", "12"),
    tlv("38", merchant),
    tlv("53", "704"),
    tlv("54", String(input.amount)),
    tlv("58", "VN"),
    tlv("59", emvName(input.name)),
    tlv("60", (input.city ?? "HANOI").slice(0, 15)),
    tlv("62", tlv("08", message)),
  ].join("");
  const signed = `${body}6304`;
  return signed + crc16CcittFalse(signed);
}

export function verifyVietQr(payload: string): boolean {
  if (!/6304[0-9A-F]{4}$/.test(payload)) return false;
  return crc16CcittFalse(payload.slice(0, -4)) === payload.slice(-4);
}

export function decodeVietQr(payload: string): VietQrDecoded | null {
  if (!verifyVietQr(payload)) return null;
  const top = parseTlv(payload);
  const merchant = top.get("38");
  if (!merchant) return null;
  const nested = parseTlv(merchant);
  const beneficiary = nested.get("01");
  if (!beneficiary) return null;
  const who = parseTlv(beneficiary);
  const extra = top.get("62");
  const message = extra ? parseTlv(extra).get("08") ?? "" : "";
  return {
    bin: who.get("00") ?? "",
    account: who.get("01") ?? "",
    amount: top.get("54") ?? "",
    name: top.get("59") ?? "",
    message,
    service: nested.get("02") ?? "",
    dynamic: top.get("01") === "12",
  };
}
