import { createOpenAI } from "@ai-sdk/openai";
import { generateText, type LanguageModel } from "ai";
import type { ChatTurn } from "./handlers.ts";

const DEFAULT_MODEL = "openai/gpt-5.4-mini";

export function hasLiveKey(source: NodeJS.ProcessEnv = process.env): boolean {
  return Boolean(source.AI_GATEWAY_API_KEY?.trim() || source.VERCEL_OIDC_TOKEN?.trim() || source.OPENAI_API_KEY?.trim());
}

export async function completeLive(instructions: string, messages: ChatTurn[], source: NodeJS.ProcessEnv = process.env): Promise<string> {
  const modelId = source.AI_MODEL?.trim() || DEFAULT_MODEL;
  const model = pickModel(modelId, source);
  const { text } = await generateText({
    model,
    instructions,
    messages: messages.map((turn) => ({ role: turn.role, content: turn.content })),
    maxOutputTokens: 700,
    timeout: { totalMs: 20_000 },
  });
  return text;
}

function pickModel(modelId: string, source: NodeJS.ProcessEnv): LanguageModel {
  const gateway = source.AI_GATEWAY_API_KEY?.trim() || source.VERCEL_OIDC_TOKEN?.trim();
  if (gateway) return modelId as LanguageModel;
  const apiKey = source.OPENAI_API_KEY?.trim() ?? "";
  const openai = createOpenAI({ apiKey });
  return openai(modelId.replace(/^openai\//, ""));
}
