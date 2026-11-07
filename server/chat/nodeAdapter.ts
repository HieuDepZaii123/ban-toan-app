import { nodeHandler } from "../http/bridge.ts";
import { chatEnv } from "./env.ts";
import { handleChat } from "./handlers.ts";

/** Tối đa 8 lượt × 1500 ký tự; 64 KB đủ rộng cho UTF-8 và JSON. */
export const CHAT_MAX_BYTES = 64 * 1024;

export const adaptChat = nodeHandler((request) => handleChat(request, chatEnv()), { name: "chat", maxBytes: CHAT_MAX_BYTES });
