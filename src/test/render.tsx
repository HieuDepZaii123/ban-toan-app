import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { vi } from "vitest";
import { RouteProvider } from "../lib/route.tsx";

/** Render a page the way main.tsx does: inside the router, starting at `path`. */
export function renderAt(path: string, ui: ReactElement) {
  window.history.replaceState(null, "", path);
  return render(<RouteProvider>{ui}</RouteProvider>);
}

type Reply = { status?: number; body: unknown } | Error;
type Handler = (url: URL, init: RequestInit | undefined) => Reply;

/**
 * Stand-in for the server. Keys are "METHOD /path"; a request that matches no key fails the
 * test, so a page cannot quietly call an endpoint the test did not expect.
 */
export function fakeServer(routes: Record<string, Handler>) {
  const fetch = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = new URL(String(input), window.location.origin);
    const key = `${init?.method ?? "GET"} ${url.pathname}`;
    const handler = routes[key];
    if (!handler) throw new Error(`Unexpected request: ${key}`);
    const reply = handler(url, init);
    if (reply instanceof Error) throw reply;
    return new Response(JSON.stringify(reply.body), {
      status: reply.status ?? 200,
      headers: { "content-type": "application/json" },
    });
  });
  vi.stubGlobal("fetch", fetch);
  /** Parsed JSON bodies sent to one route, in order. */
  const sent = (key: string): unknown[] => fetch.mock.calls
    .filter(([input, init]) => `${init?.method ?? "GET"} ${new URL(String(input), window.location.origin).pathname}` === key)
    .map(([, init]) => JSON.parse(String(init?.body)));
  return { fetch, sent };
}
