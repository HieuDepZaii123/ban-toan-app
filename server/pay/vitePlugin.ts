import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin } from "vite";
import { adaptChat } from "../chat/nodeAdapter.ts";
import { adaptNode } from "./nodeAdapter.ts";

/** Serves /api/premium on the Vite dev server. Production uses the api/ functions. */
export function payApi(): Plugin {
  return {
    name: "ban-toan-pay",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const path = req.url?.split("?")[0] ?? "";
        const chat = path.startsWith("/api/chat");
        if (!chat && !path.startsWith("/api/premium")) {
          next();
          return;
        }
        const run = chat ? adaptChat(req as IncomingMessage, res as ServerResponse) : adaptNode(req as IncomingMessage, res as ServerResponse);
        void run.catch((error: unknown) => {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: "server", message: error instanceof Error ? error.message : "error" }));
        });
      });
    },
  };
}
