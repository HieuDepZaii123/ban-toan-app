/** mulberry32. `seed` is any uint32. The stream returns numbers in [0, 1). */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function freshSeed(): number {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return buf[0] ?? 1;
}

export function pick<T>(rng: () => number, items: readonly T[]): T {
  const item = items[Math.floor(rng() * items.length)];
  if (item === undefined) throw new Error("empty pick");
  return item;
}

/** Next correct-choice slot. Never repeats the previous attempt. The chain is uniform. */
export function nextPos(prev: number | undefined, rng: () => number): 0 | 1 | 2 | 3 {
  if (prev === undefined || !Number.isInteger(prev) || prev < 0 || prev > 3) {
    return Math.floor(rng() * 4) as 0 | 1 | 2 | 3;
  }
  const slots = [0, 1, 2, 3].filter((slot) => slot !== prev);
  return slots[Math.floor(rng() * slots.length)] as 0 | 1 | 2 | 3;
}

export function shuffleIds(ids: readonly string[], seed: number): string[] {
  const order = [...ids];
  const rng = mulberry32(seed);
  for (let i = order.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    const left = order[i];
    const right = order[j];
    if (left === undefined || right === undefined) continue;
    order[i] = right;
    order[j] = left;
  }
  return order;
}

/** Answer-slot stream, independent of the stream that draws the question's numbers from the same seed. */
export function slotRng(seed: number): () => number {
  return mulberry32((seed ^ 0x9e3779b9) >>> 0);
}

/**
 * A stable display order for a fixed question, so hand-written banks (stored with the key
 * first) do not always show the answer as A. Same id, same order on every visit.
 */
export function displayOrder(id: string, count: number): number[] {
  let hash = 2166136261;
  for (let i = 0; i < id.length; i += 1) hash = Math.imul(hash ^ id.charCodeAt(i), 16777619);
  const rng = mulberry32(hash >>> 0);
  const order = Array.from({ length: count }, (_, i) => i);
  for (let i = count - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [order[i], order[j]] = [order[j] as number, order[i] as number];
  }
  return order;
}
