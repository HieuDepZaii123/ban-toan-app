export type Params = Record<string, number>;

export const sig = (p: Params): string => Object.keys(p).sort().map((k) => `${k}=${p[k] ?? 0}`).join("&");

/** Undo and redo for lab settings. `now` is the last settled state; `record` is called when the person stops dragging. */
export class History {
  past: Params[] = [];
  future: Params[] = [];
  now: Params;
  private readonly limit: number;

  constructor(now: Params, limit = 100) {
    this.now = now;
    this.limit = limit;
  }

  record(next: Params): boolean {
    if (sig(next) === sig(this.now)) return false;
    this.past.push(this.now);
    if (this.past.length > this.limit) this.past.shift();
    this.future = [];
    this.now = { ...next };
    return true;
  }

  undo(): Params | null {
    const prev = this.past.pop();
    if (!prev) return null;
    this.future.push(this.now);
    this.now = prev;
    return prev;
  }

  redo(): Params | null {
    const next = this.future.pop();
    if (!next) return null;
    this.past.push(this.now);
    this.now = next;
    return next;
  }
}
