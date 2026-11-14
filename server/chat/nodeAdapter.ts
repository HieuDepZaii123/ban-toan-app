import { nodeHandler } from "../http/bridge.ts";
import { chatEnv, checkEnv } from "./env.ts";
import { handleCheck } from "./check.ts";
import { handleChat } from "./handlers.ts";

/** Tối đa 8 lượt × 1500 ký tự; 64 KB đủ rộng cho UTF-8 và JSON. */
export const CHAT_MAX_BYTES = 64 * 1024;

/**
 * One serverless function serves both the tutor and marking: `/api/chat?do=check` goes to marking.
 * (Vercel's Hobby plan allows 12 functions per deployment, and api/ already has 12.)
 */
export const adaptChat = nodeHandler(
  (request) => (isCheck(request) ? handleCheck(request, checkEnv()) : handleChat(request, chatEnv())),
  { name: "chat", maxBytes: CHAT_MAX_BYTES },
);

export function isCheck(request: Request): boolean {
  return new URL(request.url).searchParams.get("do") === "check";
}

