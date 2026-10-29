export type Quota = {
  used(key: string, now: number, windowMs: number): number;
  add(key: string, now: number): void;
};

export function createQuota(): Quota {
  const hits = new Map<string, number[]>();
  return {
    used(key, now, windowMs) {
      const prev = (hits.get(key) ?? []).filter((stamp) => now - stamp < windowMs);
      hits.set(key, prev);
      return prev.length;
    },
    add(key, now) {
      const prev = hits.get(key) ?? [];
      prev.push(now);
      hits.set(key, prev);
    },
  };
}
