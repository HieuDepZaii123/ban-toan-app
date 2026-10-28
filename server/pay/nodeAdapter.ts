import type { IncomingMessage, ServerResponse } from "node:http";
import { handlePremium } from "./handlers.ts";
import { payEnv } from "./env.ts";

type WithBody = IncomingMessage & { body?: unknown };

function headerPairs(headers: IncomingMessage["headers"]): [string, string][] {
  const pairs: [string, string][] = [];
  for (const [key, value] of Object.entries(headers)) {
    if (value === undefined) continue;
    pairs.push([key, Array.isArray(value) ? value.join(", ") : value]);
  }
  return pairs;
}

/** Vercel Node handler and the Vite dev middleware both end up here. */
export async function adaptNode(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(Buffer.from(chunk));
  const carried = (req as WithBody).body;
  let raw = Buffer.concat(chunks);
  if (raw.length === 0 && carried && typeof carried === "object") raw = Buffer.from(JSON.stringify(carried));
  if (raw.length === 0 && typeof carried === "string") raw = Buffer.from(carried);
  const host = headerValue(req.headers["x-forwarded-host"]) || headerValue(req.headers.host) || "127.0.0.1:43123";
  const proto = headerValue(req.headers["x-forwarded-proto"]) || "http";
  const url = new URL(req.url || "/", `${proto}://${host}`);
  const method = req.method || "GET";
  const request = new Request(url, {
    method,
    headers: headerPairs(req.headers),
    body: method === "GET" || method === "HEAD" ? undefined : raw,
  });
  const response = await handlePremium(request, payEnv());
  res.statusCode = response.status;
  response.headers.forEach((value, key) => res.setHeader(key, value));
  res.end(Buffer.from(await response.arrayBuffer()));
}

function headerValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}
