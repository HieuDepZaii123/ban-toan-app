import { createOpenAI } from "@ai-sdk/openai";
import { generateText, type LanguageModel } from "ai";
import type { ChatTurn } from "./handlers.ts";
import { freeCandidates, hasFreeKey } from "./free.ts";

const DEFAULT_MODEL = "openai/gpt-5.4-mini";
const ATTEMPT_MS = 20_000;
const TOTAL_MS = 25_000;
/** Room for reasoning models (e.g. gpt-oss on Groq), which count hidden reasoning against this budget. */
const MAX_OUTPUT_TOKENS = 1_500;

export type LiveCandidate = { id: string; model: LanguageModel };

/** A photo attached to the latest question: raw bytes and their media type. */
export type ChatImage = { data: Uint8Array; mediaType: "image/jpeg" | "image/png" | "image/webp" };

type Part = { type: "text"; text: string } | { type: "image"; image: Uint8Array; mediaType: string };

type Generate = (options: {
  model: LanguageModel;
  instructions: string;
  messages: { role: ChatTurn["role"]; content: string | Part[] }[];
  maxOutputTokens: number;
  timeout: { totalMs: number };
}) => Promise<{ text: string; finishReason?: string }>;

/** One line per failed provider so Vercel logs show why. No keys or prompts. */
function logFailure(id: string, detail: unknown): void {
  const message = detail instanceof Error ? `${detail.name}: ${detail.message}` : String(detail);
  const status = (detail as { statusCode?: unknown } | null)?.statusCode;
  console.error(`[chat] model ${id} failed${typeof status === "number" ? ` (HTTP ${status})` : ""}: ${message.slice(0, 300)}`);
}

export function hasLiveKey(source: NodeJS.ProcessEnv = process.env): boolean {
  return hasPaidKey(source) || hasFreeKey(source);
}

function hasPaidKey(source: NodeJS.ProcessEnv): boolean {
  return Boolean(source.AI_GATEWAY_API_KEY?.trim() || source.VERCEL_OIDC_TOKEN?.trim() || source.OPENAI_API_KEY?.trim());
}

/**
 * Paid gateway / OpenAI first when configured, then every free provider that has a key.
 * With `vision`, the free providers use their image model (the default paid model reads images).
 */
export function liveCandidates(source: NodeJS.ProcessEnv = process.env, vision = false): LiveCandidate[] {
  const out: LiveCandidate[] = [];
  if (hasPaidKey(source)) out.push({ id: "primary", model: pickModel(source.AI_MODEL?.trim() || DEFAULT_MODEL, source) });
  for (const free of freeCandidates(source, undefined, vision)) {
    const provider = createOpenAI({ name: free.id, baseURL: free.baseURL, apiKey: free.apiKey });
    out.push({ id: free.id, model: provider.chat(free.model) });
  }
  return out;
}

export async function completeLive(
  instructions: string,
  messages: ChatTurn[],
  source: NodeJS.ProcessEnv = process.env,
  generate: Generate = generateText as unknown as Generate,
  now: () => number = Date.now,
  image?: ChatImage,
): Promise<string> {
  const candidates = liveCandidates(source, Boolean(image));
  const lastIndex = messages.length - 1;
  const shaped = messages.map((turn, index) => ({
    role: turn.role,
    content: image && index === lastIndex && turn.role === "user"
      ? [{ type: "text" as const, text: turn.content }, { type: "image" as const, image: image.data, mediaType: image.mediaType }]
      : turn.content,
  }));
  const deadline = now() + TOTAL_MS;
  let lastError: unknown = new Error("no live model configured");
  for (const candidate of candidates) {
    const left = deadline - now();
    if (left <= 1_000) break;
    try {
      const { text, finishReason } = await generate({
        model: candidate.model,
        instructions,
        messages: shaped,
        maxOutputTokens: MAX_OUTPUT_TOKENS,
        timeout: { totalMs: Math.min(ATTEMPT_MS, left) },
      });
      if (text.trim()) return finishReason === "length" ? `${text.trimEnd()} …` : text;
      lastError = new Error(`${candidate.id}: empty reply (finish: ${finishReason ?? "unknown"})`);
      logFailure(candidate.id, lastError);
    } catch (error) {
      lastError = error;
      logFailure(candidate.id, error);
    }
  }
  throw lastError;
}

function pickModel(modelId: string, source: NodeJS.ProcessEnv): LanguageModel {
  const gateway = source.AI_GATEWAY_API_KEY?.trim() || source.VERCEL_OIDC_TOKEN?.trim();
  if (gateway) return modelId as LanguageModel;
  const apiKey = source.OPENAI_API_KEY?.trim() ?? "";
  const openai = createOpenAI({ apiKey });
  return openai(modelId.replace(/^openai\//, ""));
}
