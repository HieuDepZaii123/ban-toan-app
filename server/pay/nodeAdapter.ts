import { nodeHandler } from "../http/bridge.ts";
import { payEnv } from "./env.ts";
import { handlePremium } from "./handlers.ts";

/** Webhook Casso gửi mảng giao dịch, nên chừa rộng hơn chat. */
export const PAY_MAX_BYTES = 256 * 1024;

/** Vercel Node handler và middleware Vite dev/preview đều đi qua đây. */
export const adaptNode = nodeHandler((request) => handlePremium(request, payEnv()), { name: "pay", maxBytes: PAY_MAX_BYTES });
