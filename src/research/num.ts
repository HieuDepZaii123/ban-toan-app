export function num(params: Record<string, number>, key: string, fallback = 0): number {
  const value = params[key];
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}
