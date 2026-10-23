/**
 * Corrupt snapshots, answer recording, and merges across tabs.
 * Run with: tsx scripts/store.test.ts
 */
import { applyStorageEvent, flushSave, getData, hasPendingSave, load, recordAnswer, resetStore, setNote } from "../src/lib/store.ts";

const fails: string[] = [];

function assert(cond: boolean, message: string): void {
  if (!cond) fails.push(message);
}

const broken = load("{");
assert(broken.v === 1 && broken.notes && Object.keys(broken.notes).length === 0, "bad json becomes a blank desk");

const old = load(JSON.stringify({ v: 2, notes: { a: "x" } }));
assert(Object.keys(old.notes).length === 0, "another version is ignored");

const mixed = load(JSON.stringify({
  v: 1,
  theme: "night",
  notes: { ok: "ghi", bad: 4, empty: null },
  wrong: { "t:q": 2, "t:s": "no", "t:flag": true },
  think: {
    good: { nhin: true, lam: false, ket: true },
    short: { nhin: true, lam: false },
    messy: { nhin: "yes", lam: false, ket: true },
  },
  right: { "t:q": true, "t:no": "yes" },
}));
assert(mixed.theme === "night", "theme kept");
assert(mixed.notes.ok === "ghi" && !("bad" in mixed.notes) && !("empty" in mixed.notes), "notes keep only strings");
assert(mixed.wrong["t:q"] === 2 && !("t:s" in mixed.wrong) && !("t:flag" in mixed.wrong), "wrong keeps only numbers");
assert(mixed.think.good?.nhin === true && mixed.think.good.lam === false && mixed.think.good.ket === true, "complete think flags kept");
assert(!("short" in mixed.think) && !("messy" in mixed.think), "partial think rows dropped");
assert(mixed.right["t:q"] === true && !("t:no" in mixed.right), "right keeps only true");

resetStore();
recordAnswer("ineq", "ineq-am", 1, false);
assert(getData().wrong["ineq:ineq-am"] === 1, "a miss is stored");
assert(!("ineq:ineq-am" in getData().right), "a miss is not marked right");
recordAnswer("ineq", "ineq-am", 1, false);
assert(getData().wrong["ineq:ineq-am"] === 1, "the same miss is not duplicated");
recordAnswer("ineq", "ineq-am", 0, true);
assert(getData().right["ineq:ineq-am"] === true, "the correct choice is stored");
assert(!("ineq:ineq-am" in getData().wrong), "a correct answer clears the miss");

resetStore(load(JSON.stringify({ v: 1, notes: { a: "local" } })));
applyStorageEvent("other", JSON.stringify({ v: 1, notes: { a: "remote" } }));
assert(getData().notes.a === "local", "a different storage key is ignored");
applyStorageEvent("ban-toan", JSON.stringify({ v: 1, notes: { a: "remote" }, wrong: { "q:1": 3 } }));
assert(getData().notes.a === "remote" && getData().wrong["q:1"] === 3, "the other tab's snapshot is adopted");

const memory = new Map<string, string>();
const storage = {
  getItem: (key: string) => memory.get(key) ?? null,
  setItem: (key: string, value: string) => {
    memory.set(key, value);
  },
  removeItem: (key: string) => {
    memory.delete(key);
  },
  clear: () => memory.clear(),
  key: () => null,
  get length() {
    return memory.size;
  },
};
Object.assign(globalThis, {
  localStorage: storage,
  window: globalThis,
  matchMedia: () => ({ matches: false }),
});

resetStore(load(JSON.stringify({ v: 1, notes: { a: "mine" } })));
recordAnswer("ineq", "q1", 1, false);
setNote("quadratic", "đang gõ");
assert(hasPendingSave(), "a miss schedules a save");
const remote = JSON.stringify({ v: 1, notes: { a: "theirs", derivative: "tab kia" } });
memory.set("ban-toan", remote);
applyStorageEvent("ban-toan", remote);
assert(!hasPendingSave(), "the merge is written immediately");
assert(getData().notes.a === "theirs", "the other tab's edit of a note this tab did not touch is kept");
assert(getData().notes.derivative === "tab kia", "a note for another topic is merged in");
assert(getData().notes.quadratic === "đang gõ", "a note being typed is kept");
assert(getData().wrong["ineq:q1"] === 1, "the pending miss is reapplied");
const kept = JSON.parse(memory.get("ban-toan") ?? "{}") as { notes?: { a?: string; quadratic?: string; derivative?: string }; wrong?: Record<string, number> };
assert(kept.notes?.a === "theirs" && kept.notes.quadratic === "đang gõ" && kept.notes.derivative === "tab kia" && kept.wrong?.["ineq:q1"] === 1, "the stored snapshot keeps both tabs' edits");

resetStore(load(JSON.stringify({ v: 1, notes: { a: "stale" } })));
const fresh = JSON.stringify({ v: 1, notes: { a: "fresh" } });
memory.set("ban-toan", fresh);
flushSave();
assert(getData().notes.a === "fresh", "a stale tab adopts the newer snapshot");
assert(memory.get("ban-toan") === fresh, "a stale tab does not paint over the newer snapshot");

memory.clear();
resetStore(load(JSON.stringify({ v: 1, notes: { a: "kept" } })));
flushSave();
assert(JSON.parse(memory.get("ban-toan") ?? "{}").notes?.a === "kept", "a save writes when the disk still matches");

resetStore();
setNote("quadratic", "bản nháp");
const newer = JSON.stringify({
  v: 1,
  notes: { quadratic: "mới hơn" },
  at: { notes: { quadratic: Date.now() + 60_000 } },
});
memory.set("ban-toan", newer);
applyStorageEvent("ban-toan", newer);
assert(getData().notes.quadratic === "mới hơn", "a newer edit from the other tab wins the same note");

setNote("quadratic", "gõ tiếp");
const older = JSON.stringify({
  v: 1,
  notes: { quadratic: "cũ" },
  at: { notes: { quadratic: 1 } },
});
memory.set("ban-toan", older);
applyStorageEvent("ban-toan", older);
assert(getData().notes.quadratic === "gõ tiếp", "an older disk edit does not replace a newer local note");

resetStore();

if (fails.length > 0) {
  console.error(fails.join("\n"));
  process.exit(1);
}
console.log("store ok");
