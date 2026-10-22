/**
 * Corrupt snapshots and answer recording. Run with:
 *   node --experimental-strip-types scripts/store.test.ts
 */
import { applyStorageEvent, getData, load, recordAnswer, resetStore } from "../src/lib/store.ts";

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

if (fails.length > 0) {
  console.error(fails.join("\n"));
  process.exit(1);
}
console.log("store ok");
