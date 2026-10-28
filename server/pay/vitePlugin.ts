import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin } from "vite";
import { adaptNode } from "./nodeAdapter.ts";

/** Serves /api/premium on the Vite dev server. Production uses the api/ functions. */
export function payApi(): Plugin {
  return {
    name: "ban-toan-pay",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const path = req.url?.split("?")[0] ?? "";
        if (!path.startsWith("/api/premium")) {
          next();
          return;
        }
        void adaptNode(req as IncomingMessage, res as ServerResponse).catch((error: unknown) => {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: "server", message: error instanceof Error ? error.message : "error" }));
        });
      });
    },
  };
}
