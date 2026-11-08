import type { IncomingMessage, ServerResponse } from "node:http";
import { loadEnv, type Connect, type Plugin } from "vite";
import { adaptChat } from "../chat/nodeAdapter.ts";
import { adaptNode } from "./nodeAdapter.ts";

type Route = { prefix: string; handle: (req: IncomingMessage, res: ServerResponse) => Promise<void> };

const ROUTES: Route[] = [
  { prefix: "/api/chat", handle: adaptChat },
  { prefix: "/api/premium", handle: adaptNode },
];

/** Đường API nào xử lý `path`, hoặc null nếu không phải API. */
export function routeFor(path: string): Route | null {
  return ROUTES.find((route) => path === route.prefix || path.startsWith(`${route.prefix}/`) || path.startsWith(`${route.prefix}?`)) ?? null;
}

/**
 * Chép biến từ `.env*` vào `process.env` cho phía server. Vite chỉ đưa `VITE_*` cho trình duyệt,
 * nên thiếu bước này thì khóa AI, ADMIN_TOKEN, BANK_* trong `.env` không tới API khi chạy local.
 * Biến đã đặt trong shell được giữ nguyên, giống thứ tự ưu tiên của Vite.
 */
export function mergeServerEnv(target: NodeJS.ProcessEnv, loaded: Record<string, string>): string[] {
  const added: string[] = [];
  for (const [key, value] of Object.entries(loaded)) {
    if (target[key] !== undefined) continue;
    target[key] = value;
    added.push(key);
  }
  return added;
}

function middleware(): Connect.NextHandleFunction {
  return (req, res, next) => {
    const route = routeFor(req.url?.split("?")[0] ?? "");
    if (!route) {
      next();
      return;
    }
    void route.handle(req, res);
  };
}

/** Phục vụ /api/chat và /api/premium trên Vite dev và preview. Production dùng các hàm trong `api/`. */
export function payApi(): Plugin {
  return {
    name: "ban-toan-api",
    configResolved(config) {
      if (config.command !== "serve") return;
      mergeServerEnv(process.env, loadEnv(config.mode, config.envDir || config.root, ""));
    },
    configureServer(server) {
      server.middlewares.use(middleware());
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware());
    },
  };
}
