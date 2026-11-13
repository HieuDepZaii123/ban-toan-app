/**
 * Máy tính khoa học: thứ tự phép tính, miền thực, và bộ nhớ riêng.
 * Run with: tsx scripts/calc.test.ts
 */
import assert from "node:assert/strict";
import { compile, evaluate, formatCalc } from "../src/calc/evaluate.ts";
import { exactTex, numberTex, toFraction } from "../src/calc/exact.ts";
import { convertBase, divisors, factorize, factorTex, isPrime } from "../src/calc/number.ts";
import { derivativeAt, findRoot, integrate, solveCubic, solveQuadratic, solveSystem } from "../src/calc/solve.ts";
import { linearRegression, parseNumbers, summarize } from "../src/calc/stats.ts";
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

for (const bad of ["", "2+", "(2+3", "sin 30", "2;3", "x y z w", "2 +* 3", "eval(1)", "Function('return 1')()", "alert(1)", "constructor", "__proto__", "process.exit(1)", ";alert(1)"]) {
  assert.equal(code(bad), "syntax", bad);
}

// Phép nhân ngầm, giai thừa, phần trăm và dấu phẩy thập phân.
assert.equal(value("2(3)"), 6);
assert.equal(value("2pi", "rad"), 2 * Math.PI);
assert.equal(value("(1+2)(3+4)"), 21);
assert.ok(Math.abs(value("3sin(30)") - 1.5) < 1e-12);
assert.equal(value("5!"), 120);
assert.equal(value("0!"), 1);
assert.equal(value("50%"), 0.5);
assert.ok(Math.abs(value("200*15%") - 30) < 1e-12);
assert.equal(value("3,5+1,5"), 5);
assert.equal(value("2²+3³"), 31);
assert.equal(value("√16+√(9)"), 7);
assert.equal(value("12:4"), 3);
assert.equal(code("3.5!"), "domain");
assert.equal(code("(-1)!"), "domain");

// Hàm nhiều đối số ngăn bằng chấm phẩy.
assert.ok(Math.abs(value("log(2; 8)") - 3) < 1e-12);
assert.ok(Math.abs(value("root(3; 27)") - 3) < 1e-12);
assert.ok(Math.abs(value("root(3; -8)") + 2) < 1e-12);
assert.equal(value("ncr(5; 2)"), 10);
assert.equal(value("npr(5; 2)"), 20);
assert.equal(value("gcd(12; 18)"), 6);
assert.equal(value("lcm(4; 6; 10)"), 60);
assert.equal(value("mod(-7; 3)"), 2);
assert.equal(value("max(1; 5; 3)"), 5);
assert.equal(value("round(3,14159; 2)"), 3.14);
assert.equal(value("cbrt(-27)"), -3);
assert.ok(Math.abs(value("asin(0.5)", "deg") - 30) < 1e-9);
assert.ok(Math.abs(value("atan(1)", "rad") - Math.PI / 4) < 1e-12);
assert.ok(Math.abs(value("cot(45)", "deg") - 1) < 1e-12);
assert.equal(code("asin(2)"), "domain");
assert.equal(code("log(1; 8)"), "log");
assert.equal(code("root(2; -4)"), "sqrt");
assert.equal(code("ncr(2; 5)"), "domain");
assert.equal(code("gcd(1)"), "args");
assert.equal(code("sin(1; 2)"), "args");
assert.equal(code("(-8)^(1/3)"), "domain");
assert.equal(code("0^-1"), "div0");

// Biến.
{
  const withVars = evaluate("2x+a", "deg", null, { x: 3, a: 4 });
  assert.deepEqual(withVars, { ok: true, value: 10 });
  assert.deepEqual(evaluate("x+1", "deg", null), { ok: false, code: "var" });
  const f = compile("x^2-4", "deg");
  assert.equal(f.ok, true);
  if (f.ok) {
    assert.equal(f.at(3), 5);
    assert.equal(compile("1/x", "deg").ok && (compile("1/x", "deg") as { at: (x: number) => number | null }).at(0), null);
  }
  assert.equal(compile("2+", "deg").ok, false);
}

// Dạng đúng.
assert.deepEqual(toFraction(0.75), { n: 3, d: 4 });
assert.deepEqual(toFraction(-1 / 3), { n: -1, d: 3 });
assert.equal(toFraction(Math.PI), null);
assert.equal(exactTex(0.5), "\\dfrac{1}{2}");
assert.equal(exactTex(3), null);
assert.equal(exactTex(Math.SQRT2), "\\sqrt{2}");
assert.equal(exactTex(Math.sqrt(12)), "2\\sqrt{3}");
assert.equal(exactTex(Math.sqrt(3) / 2), "\\dfrac{\\sqrt{3}}{2}");
assert.equal(exactTex(-Math.SQRT1_2), "-\\dfrac{\\sqrt{2}}{2}");
assert.equal(exactTex(Math.PI / 6), "\\dfrac{\\pi}{6}");
assert.equal(exactTex(2 * Math.PI), "2\\pi");
assert.equal(exactTex(Math.E), null);
assert.equal(numberTex(0.5), "0{,}5");
assert.equal(numberTex(1.5e20), "1{,}5\\cdot 10^{20}");

// Phương trình và hệ.
{
  const two = solveQuadratic(1, -5, 6);
  assert.deepEqual(two, { kind: "two", delta: 1, roots: [2, 3] });
  assert.deepEqual(solveQuadratic(1, -2, 1), { kind: "double", delta: 0, root: 1 });
  const complex = solveQuadratic(1, 2, 5);
  assert.equal(complex.kind, "complex");
  if (complex.kind === "complex") assert.deepEqual(complex.roots[0], { re: -1, im: 2 });
  assert.equal(solveQuadratic(0, 2, 1).kind, "not-quadratic");
  const big = solveQuadratic(1, -1e8, 1);
  assert.ok(big.kind === "two" && Math.abs(big.roots[0] - 1e-8) < 1e-16);

  const near = (got: number[] | null, want: number[]) => {
    assert.ok(got && got.length === want.length, `${String(got)} vs ${String(want)}`);
    got.forEach((x, i) => assert.ok(Math.abs(x - (want[i] as number)) < 1e-9, `${x} vs ${want[i]}`));
  };
  near(solveCubic(1, -6, 11, -6), [1, 2, 3]);
  near(solveCubic(1, 0, 0, -8), [2]);
  near(solveCubic(1, -3, 3, -1), [1]);
  near(solveCubic(1, -3, 0, 4), [-1, 2]);
  near(solveCubic(2, 0, -8, 0), [-2, 0, 2]);
  assert.equal(solveCubic(0, 1, 2, 3), null);

  assert.deepEqual(solveSystem([[1, 1, 5], [1, -1, 1]]), { kind: "unique", values: [3, 2] });
  assert.deepEqual(solveSystem([[1, 1, 1, 6], [1, -1, 1, 2], [2, 1, -1, 1]]), { kind: "unique", values: [1, 2, 3] });
  assert.deepEqual(solveSystem([[1, 1, 2], [2, 2, 4]]), { kind: "infinite" });
  assert.deepEqual(solveSystem([[1, 1, 2], [2, 2, 5]]), { kind: "none" });
  assert.deepEqual(solveSystem([[0, 1, 2], [1, 0, 3]]), { kind: "unique", values: [3, 2] });
}

// Giải tích số.
{
  const square = (x: number) => x * x;
  assert.ok(Math.abs((derivativeAt(square, 3) ?? 0) - 6) < 1e-8);
  assert.ok(Math.abs((derivativeAt(Math.sin, 0) ?? 0) - 1) < 1e-8);
  assert.ok(Math.abs((integrate(square, 0, 1) ?? 0) - 1 / 3) < 1e-10);
  assert.ok(Math.abs((integrate(Math.sin, 0, Math.PI) ?? 0) - 2) < 1e-9);
  assert.ok(Math.abs((integrate(square, 1, 0) ?? 0) + 1 / 3) < 1e-10);
  assert.equal(integrate((x) => (x === 0.5 ? null : 1), 0, 1), null);
  assert.ok(Math.abs((findRoot((x) => x * x - 2, 1) ?? 0) - Math.SQRT2) < 1e-10);
  assert.ok(Math.abs((findRoot((x) => Math.cos(x) - x, 0) ?? 0) - 0.7390851332151607) < 1e-10);
  assert.equal(findRoot((x) => x * x + 1, 0), null);
}

// Thống kê.
{
  assert.deepEqual(parseNumbers("2; 4; 4; 6; 9"), { values: [2, 4, 4, 6, 9], bad: [] });
  assert.deepEqual(parseNumbers("1,5 2,5\n-3"), { values: [1.5, 2.5, -3], bad: [] });
  assert.deepEqual(parseNumbers("1; hai; 3").bad, ["hai"]);
  const s = summarize([2, 4, 4, 4, 5, 5, 7, 9]);
  assert.ok(s && s.n === 8 && s.mean === 5 && s.variance === 4 && s.sd === 2 && s.median === 4.5);
  assert.deepEqual(s?.modes, [4]);
  const q = summarize([1, 3, 5, 7, 9, 11]);
  assert.ok(q && q.median === 6 && q.q1 === 3 && q.q3 === 9 && q.range === 10);
  const odd = summarize([1, 2, 3, 4, 5, 6, 7]);
  assert.ok(odd && odd.median === 4 && odd.q1 === 2 && odd.q3 === 6);
  assert.deepEqual(summarize([1, 2, 3])?.modes, []);
  assert.equal(summarize([]), null);
  const line = linearRegression([1, 2, 3, 4], [3, 5, 7, 9]);
  assert.ok(line && Math.abs(line.a - 2) < 1e-12 && Math.abs(line.b - 1) < 1e-12 && Math.abs(line.r - 1) < 1e-12);
  assert.equal(linearRegression([1, 1], [2, 3]), null);
}

// Số học.
assert.deepEqual(factorize(360), [[2, 3], [3, 2], [5, 1]]);
assert.deepEqual(factorize(97), [[97, 1]]);
assert.deepEqual(factorize(1_000_000_007), [[1_000_000_007, 1]]);
assert.equal(factorize(1), null);
assert.equal(factorize(2.5), null);
assert.equal(isPrime(97), true);
assert.equal(isPrime(91), false);
assert.equal(factorTex([[2, 3], [5, 1]]), "2^{3}\\cdot 5");
assert.deepEqual(divisors(12), [1, 2, 3, 4, 6, 12]);
assert.equal(convertBase("255", 10, 2), "11111111");
assert.equal(convertBase("FF", 16, 10), "255");
assert.equal(convertBase("777", 8, 16), "1FF");
assert.equal(convertBase("12", 2, 10), null);

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
