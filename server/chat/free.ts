import { FREE_CATALOG, type FreeCatalogEntry } from "./freeCatalog.ts";

/**
 * Free-tier providers from mnfst/awesome-free-llm-apis that speak the OpenAI chat API and only need
 * a free key. Keyless or anonymous endpoints are left out on purpose: they rotate too often to be a
 * tutor's backend. The catalog (base URL, live model ids) is generated from the vendored data.json.
 */
export type FreeProvider = {
  id: string;
  /** `name` of the provider in data.json. */
  catalogName: string;
  keyEnv: string;
  modelEnv: string;
  defaultModel: string;
  /** Path to append to the catalog's base URL to reach the OpenAI-compatible API. */
  openaiPath?: string;
  /** Replaces the catalog base URL (e.g. an international endpoint named in a footnote). */
  baseUrlOverride?: string;
};

export const FREE_PROVIDERS: readonly FreeProvider[] = [
  { id: "groq", catalogName: "Groq", keyEnv: "GROQ_API_KEY", modelEnv: "GROQ_MODEL", defaultModel: "openai/gpt-oss-120b" },
  {
    id: "gemini",
    catalogName: "Google Gemini",
    keyEnv: "GEMINI_API_KEY",
    modelEnv: "GEMINI_MODEL",
    defaultModel: "gemini-3.6-flash",
    openaiPath: "/openai",
  },
  {
    id: "openrouter",
    catalogName: "OpenRouter",
    keyEnv: "OPENROUTER_API_KEY",
    modelEnv: "OPENROUTER_MODEL",
    defaultModel: "google/gemma-4-31b-it:free",
  },
  { id: "mistral", catalogName: "Mistral AI", keyEnv: "MISTRAL_API_KEY", modelEnv: "MISTRAL_MODEL", defaultModel: "mistral-small-2603" },
  {
    id: "nvidia",
    catalogName: "NVIDIA NIM",
    keyEnv: "NVIDIA_API_KEY",
    modelEnv: "NVIDIA_MODEL",
    defaultModel: "nvidia/nemotron-3-ultra-550b-a55b",
  },
  {
    id: "zai",
    catalogName: "Z AI (Zhipu AI)",
    keyEnv: "ZAI_API_KEY",
    modelEnv: "ZAI_MODEL",
    defaultModel: "glm-4.7-flash",
    baseUrlOverride: "https://api.z.ai/api/paas/v4",
  },
];

export type FreeCandidate = { id: string; baseURL: string; apiKey: string; model: string };

function entryFor(provider: FreeProvider, catalog: readonly FreeCatalogEntry[]): FreeCatalogEntry | undefined {
  return catalog.find((entry) => entry.name === provider.catalogName);
}

export function freeBaseUrl(provider: FreeProvider, catalog: readonly FreeCatalogEntry[] = FREE_CATALOG): string | undefined {
  if (provider.baseUrlOverride) return provider.baseUrlOverride;
  const entry = entryFor(provider, catalog);
  return entry ? entry.baseUrl.replace(/\/+$/, "") + (provider.openaiPath ?? "") : undefined;
}

/** Order from FREE_LLM_ORDER (comma-separated ids), then the remaining providers in default order. */
export function freeOrder(source: NodeJS.ProcessEnv): FreeProvider[] {
  const asked = (source.FREE_LLM_ORDER ?? "")
    .split(",")
    .map((part) => part.trim().toLowerCase())
    .filter(Boolean);
  const picked = asked
    .map((id) => FREE_PROVIDERS.find((provider) => provider.id === id))
    .filter((provider): provider is FreeProvider => Boolean(provider));
  const rest = FREE_PROVIDERS.filter((provider) => !picked.includes(provider));
  return [...new Set([...picked, ...rest])];
}

/** Providers that have a key set, in the order they should be tried. */
export function freeCandidates(source: NodeJS.ProcessEnv = process.env, catalog: readonly FreeCatalogEntry[] = FREE_CATALOG): FreeCandidate[] {
  const out: FreeCandidate[] = [];
  for (const provider of freeOrder(source)) {
    const apiKey = source[provider.keyEnv]?.trim();
    const baseURL = freeBaseUrl(provider, catalog);
    if (!apiKey || !baseURL) continue;
    const model = source[provider.modelEnv]?.trim() || provider.defaultModel;
    out.push({ id: provider.id, baseURL, apiKey, model });
  }
  return out;
}

export function hasFreeKey(source: NodeJS.ProcessEnv = process.env): boolean {
  return FREE_PROVIDERS.some((provider) => Boolean(source[provider.keyEnv]?.trim()));
}
