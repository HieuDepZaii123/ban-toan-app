/**
 * Cầu nối Node ↔ Fetch cho mọi API: hàm Vercel trong `api/` và middleware của Vite dev/preview
 * đều đi qua đây, nên giới hạn thân request, lỗi 500 và mã request giống nhau ở mọi nơi.
 */
import { randomUUID } from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";

export type FetchHandler = (request: Request) => Promise<Response>;

export type BridgeOptions = {
  /** Tên ngắn trong log, ví dụ "pay" hoặc "chat". */
  name: string;
  /** Số byte tối đa của thân request; vượt quá thì trả 413. */
  maxBytes: number;
  /** Ghi log lỗi; mặc định console.error. */
  log?: (line: string, error?: unknown) => void;
};

type WithBody = IncomingMessage & { body?: unknown };

export class BodyTooLarge extends Error {
  readonly limit: number;
  constructor(limit: number) {
    super(`body over ${limit} bytes`);
    this.limit = limit;
  }
}

function headerValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

function headerPairs(headers: IncomingMessage["headers"]): [string, string][] {
  const pairs: [string, string][] = [];
  for (const [key, value] of Object.entries(headers)) {
    if (value === undefined) continue;
    pairs.push([key, Array.isArray(value) ? value.join(", ") : value]);
  }
  return pairs;
}

/** Đọc thân request, dừng sớm khi quá `maxBytes`. Vercel có thể đã đọc sẵn vào `req.body`. */
export async function readBody(req: IncomingMessage, maxBytes: number): Promise<Buffer<ArrayBufferLike>> {
  const declared = Number(headerValue(req.headers["content-length"]));
  if (Number.isFinite(declared) && declared > maxBytes) throw new BodyTooLarge(maxBytes);
  const chunks: Buffer<ArrayBufferLike>[] = [];
  let size = 0;
  for await (const chunk of req) {
    const part = Buffer.from(chunk as Uint8Array);
    size += part.length;
    if (size > maxBytes) throw new BodyTooLarge(maxBytes);
    chunks.push(part);
  }
  let raw: Buffer<ArrayBufferLike> = Buffer.concat(chunks);
  const carried = (req as WithBody).body;
  if (raw.length === 0 && carried !== undefined && carried !== null) {
    if (typeof carried === "string") raw = Buffer.from(carried);
    else if (Buffer.isBuffer(carried)) raw = carried;
    else if (typeof carried === "object") raw = Buffer.from(JSON.stringify(carried));
  }
  if (raw.length > maxBytes) throw new BodyTooLarge(maxBytes);
  return raw;
}

export async function toRequest(req: IncomingMessage, maxBytes: number): Promise<Request> {
  const host = headerValue(req.headers["x-forwarded-host"]) || headerValue(req.headers.host) || "127.0.0.1:43123";
  const proto = headerValue(req.headers["x-forwarded-proto"]) || "http";
  const url = new URL(req.url || "/", `${proto}://${host}`);
  const method = req.method || "GET";
  const hasBody = method !== "GET" && method !== "HEAD";
  return new Request(url, {
    method,
    headers: headerPairs(req.headers),
    body: hasBody ? new Uint8Array(await readBody(req, maxBytes)) : undefined,
  });
}

function sendJson(res: ServerResponse, status: number, body: Record<string, unknown>, id: string): void {
  res.statusCode = status;
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("cache-control", "no-store");
  res.setHeader("x-request-id", id);
  res.end(JSON.stringify(body));
}

/** Biến một handler Fetch thành handler Node (Vercel, Vite). Lỗi không lộ chi tiết ra ngoài. */
export function nodeHandler(handle: FetchHandler, options: BridgeOptions) {
  const log = options.log ?? ((line: string, error?: unknown) => console.error(line, error ?? ""));
  return async function bridge(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const id = headerValue(req.headers["x-request-id"]).slice(0, 64) || randomUUID();
    const where = `[${options.name}] ${req.method ?? "GET"} ${(req.url ?? "/").split("?")[0]} ${id}`;
    let request: Request;
    try {
      request = await toRequest(req, options.maxBytes);
    } catch (error) {
      if (error instanceof BodyTooLarge) {
        req.resume();
        sendJson(res, 413, { error: "too_large", message: "Dữ liệu gửi lên quá lớn." }, id);
        return;
      }
      log(`${where} read failed`, error);
      sendJson(res, 400, { error: "body", message: "Không đọc được dữ liệu gửi lên." }, id);
      return;
    }
    let response: Response;
    try {
      response = await handle(request);
    } catch (error) {
      log(`${where} failed`, error);
      sendJson(res, 500, { error: "server", message: "Máy chủ gặp lỗi. Hãy thử lại sau." }, id);
      return;
    }
    res.statusCode = response.status;
    response.headers.forEach((value, key) => res.setHeader(key, value));
    res.setHeader("x-request-id", id);
    res.end(Buffer.from(await response.arrayBuffer()));
  };
}
