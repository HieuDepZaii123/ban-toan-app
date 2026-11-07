/**
 * Máy tính khoa học: thứ tự phép tính, miền thực, và bộ nhớ riêng.
 * Run with: tsx scripts/calc.test.ts
 */
import assert from "node:assert/strict";
import { evaluate, formatCalc } from "../src/calc/evaluate.ts";
import { CALC_ANS_KEY, CALC_HISTORY_KEY, CALC_MODE_KEY, HISTORY_LIMIT, pushHistory, readAns, readHistory, readMode, writeAns, writeHistory, writeMode, type CalcStore } from "../src/calc/memory.ts";

function value(source: string, mode: "deg" | "rad" = "deg", ans: number | null = null): number {
  const outcome = evaluate(source, mode, ans);
  assert.equal(outcome.ok, true, `${source} -> ${outcome.ok ? "" : outcome.code}`);
  if (!outcome.ok) throw new Error(source);
  return outcome.value;
}

function code(source: string, mode: "deg" | "rad" = "deg", ans: number | null = null): string {
  const outcome = evaluate(source, mode, ans);
  assert.equal(outcome.ok, false, source);
  return outcome.ok ? "" : outcome.code;
}

assert.equal(value("2+3*4"), 14);
assert.equal(value("(2+3)*4"), 20);
assert.equal(value("-2^2"), -4);
assert.equal(value("(-2)^2"), 4);
assert.equal(value("2^3^2"), 512);
assert.equal(value("2^-2"), 0.25);
assert.ok(Math.abs(value("sin(30)", "deg") - 0.5) < 1e-12);
assert.ok(Math.abs(value("cos(pi)", "rad") + 1) < 1e-12);
assert.equal(value("sqrt(9)"), 3);
assert.ok(Math.abs(value("ln(e)") - 1) < 1e-12);
assert.ok(Math.abs(value("log(100)") - 2) < 1e-12);
assert.equal(formatCalc(value("0.1+0.2")), "0.3");
assert.equal(formatCalc(value("sin(30)")), "0.5");
assert.equal(code("1/0"), "div0");
assert.equal(code("0/0"), "div0");
assert.equal(code("sqrt(-9)"), "sqrt");
assert.equal(code("ln(0)"), "log");
assert.equal(code("ln(-1)"), "log");
assert.equal(code("log(0)"), "log");
assert.equal(code("tan(90)", "deg"), "tan");
assert.equal(code("tan(pi/2)", "rad"), "tan");
assert.equal(value("tan(0)", "deg"), 0);
assert.equal(value("abs(-3)"), 3);
assert.equal(value("Ans+1", "deg", 4), 5);
assert.equal(code("Ans"), "ans");

for (const bad of ["", "2+", "(2+3", "2(3)", "sin 30", "5!", "50%", "eval(1)", "Function('return 1')()", "alert(1)", "constructor", "__proto__", "process.exit(1)", ";alert(1)"]) {
  assert.equal(code(bad), "syntax", bad);
}

const memory = new Map<string, string>();
const store: CalcStore = {
  getItem: (key) => memory.get(key) ?? null,
  setItem: (key, valueText) => { memory.set(key, valueText); },
  removeItem: (key) => { memory.delete(key); },
};
store.setItem("ban-toan-soan-v1", "keep-doc");
store.setItem("bt-study-player", "keep-music");
store.setItem("ban-toan-lop-practice-v1", "keep-practice");
assert.equal(readMode(store), "deg");
writeMode("rad", store);
assert.equal(readMode(store), "rad");
writeAns(0.5, store);
assert.equal(readAns(store), 0.5);
let history = pushHistory([], { expr: "sin(30)", result: "0.5" });
for (let n = 0; n < 40; n += 1) history = pushHistory(history, { expr: `1+${n}`, result: String(1 + n) });
assert.equal(history.length, HISTORY_LIMIT);
assert.ok(HISTORY_LIMIT >= 20);
assert.equal(history[0]?.expr, "1+39");
assert.equal(history.some((item) => item.expr === "1+0"), false);
writeHistory(history, store);
assert.equal(readHistory(store).length, HISTORY_LIMIT);
assert.equal(store.getItem("ban-toan-soan-v1"), "keep-doc");
assert.equal(store.getItem("bt-study-player"), "keep-music");
assert.equal(store.getItem("ban-toan-lop-practice-v1"), "keep-practice");
assert.equal(store.getItem(CALC_MODE_KEY), "rad");
assert.ok(store.getItem(CALC_HISTORY_KEY)?.includes("1+39"));
assert.equal(store.getItem(CALC_ANS_KEY), "0.5");
store.setItem(CALC_HISTORY_KEY, "{");
assert.deepEqual(readHistory(store), []);
store.setItem(CALC_ANS_KEY, "nope");
assert.equal(readAns(store), null);

console.log("calc ok");
