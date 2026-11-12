/**
 * Vercel Hobby allows 12 Serverless Functions per deployment. `GET /api/health` and
 * `POST /api/premium/recover` therefore have no files of their own: `vercel.json`
 * rewrites them onto `/api/chat` and `/api/premium/status` with `?route=`.
 * Handlers call this so they still match the public path. Vite dev does not rewrite;
 * it routes the public paths directly.
 */
export function publicApiPath(url: URL): string {
  const path = url.pathname.replace(/\/$/, "") || "/";
  const route = url.searchParams.get("route");
  if (route === "health" && (path === "/api/chat" || path === "/api/health")) return "/api/health";
  if (route === "recover" && (path === "/api/premium/status" || path === "/api/premium/recover")) return "/api/premium/recover";
  return path;
}
