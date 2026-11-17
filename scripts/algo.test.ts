/** Kiểm các thuật toán trong src/algo: kết quả chạy phải khớp công thức toán đã biết. */
import { mulberry32 } from "../src/lib/prng.ts";
import * as A from "../src/algo/index.ts";

const fails: string[] = [];
const near = (name: string, got: number, want: number, tol: number) => {
  if (!(Math.abs(got - want) <= tol)) fails.push(`${name}: được ${got}, cần ${want} ± ${tol}`);
};
const is = (name: string, ok: boolean) => { if (!ok) fails.push(name); };

// Đạo hàm: cát tuyến của x² tại 3 dồn về 6.
const seq = A.slopeSequence((x) => x * x, 3, 1, 20);
near("cát tuyến x² tại 3", seq[19]!.slope, 6, 1e-4);
is("cát tuyến đơn điệu", seq.every((r, i) => i === 0 || Math.abs(r.slope - 6) < Math.abs(seq[i - 1]!.slope - 6)));

// Hạ gradient rơi vào đỉnh −b/(2a).
const d = A.descendQuadratic(2, -8, 3, -5, 0.1, 400);
near("đỉnh x", d[d.length - 1]!.x, 2, 1e-4);
near("đỉnh y", d[d.length - 1]!.y, 2 * 4 - 16 + 3, 1e-6);
// Bước quá lớn thì văng ra (lr > 1/a).
const bad = A.descendQuadratic(2, -8, 3, -5, 0.6, 30);
is("lr quá lớn phân kì", Math.abs(bad[bad.length - 1]!.x - 2) > 1);

// Chia đôi tìm nghiệm x²−2.
const bi = A.bisection((x) => x * x - 2, 0, 2, 40);
near("√2 bằng chia đôi", bi[bi.length - 1]!.mid, Math.SQRT2, 1e-9);
is("chia đôi không đổi dấu thì rỗng", A.bisection((x) => x * x + 1, -1, 1, 5).length === 0);

// Tích phân.
near("∫0..1 x² (mid)", A.riemann((x) => x * x, 0, 1, 1000), 1 / 3, 1e-6);
near("∫0..π sin", A.riemann(Math.sin, 0, Math.PI, 2000), 2, 1e-5);
near("tổng trái thô", A.riemann((x) => x * x, 0, 1, 4, "left"), (0 + 1 / 16 + 4 / 16 + 9 / 16) / 4, 1e-12);

// Monte Carlo.
const rng = mulberry32(7);
near("π phi tiêu", A.estimatePi(200000, rng), Math.PI, 0.02);
near("thể tích cầu phi tiêu", A.estimateBallVolume(300000, rng), (4 / 3) * Math.PI, 0.05);
near("diện tích dưới x²", A.monteCarloArea((x) => x * x, 0, 1, 1, 200000, rng).area, 1 / 3, 0.01);
const exact = A.twoDiceExact();
is("36 cặp xúc xắc", exact.reduce((s, v) => s + v, 0) === 36 && exact[7] === 6 && exact[2] === 1);
const sim = A.twoDiceSimulate(120000, rng);
near("P(tổng=7)", sim[7]! / 120000, 6 / 36, 0.01);
near("ít nhất một lần", A.atLeastOneSimulate(0.1, 10, 40000, rng), 1 - 0.9 ** 10, 0.01);

// Đếm.
const perms = A.permutations([1, 2, 3, 4]);
is("4! hoán vị", perms.length === 24 && new Set(perms.map((p) => p.join(""))).size === 24);
is("C(5,2)=10", A.combinations([1, 2, 3, 4, 5], 2).length === 10);
is("C(6,3)=20 từ điển", A.combinations([1, 2, 3, 4, 5, 6], 3).length === 20);
const pas = A.pascalRows(6);
is("Pascal hàng 6", pas[6]!.join() === "1,6,15,20,15,6,1");
is("tổng hàng = 2^n", pas.every((r, n) => r.reduce((s, v) => s + v, 0) === 2 ** n));
is("C(n,k)=n!/(k!(n-k)!)", pas[6]![3] === A.factorial(6) / (A.factorial(3) * A.factorial(3)));

// Dãy.
near("1/2+1/4+… → 1", A.geometricPartialSums(0.5, 0.5, 60)[59]!, 1, 1e-12);
near("công thức tổng cấp số nhân", A.geometricPartialSums(3, 2, 10)[9]!, 3 * (1 - 2 ** 10) / (1 - 2), 1e-9);
is("N cho sai số", A.firstIndexWithin((n) => 1 / n, 0, 0.01, 1000) === 101);
near("(1+1/m)^m → e", A.compoundOne(1e6), Math.E, 1e-5);

// Leo đồi: x + 4/x nhỏ nhất bằng 4 tại x = 2.
const hc = A.hillClimbMin((x) => x + 4 / x, 0.5, 0.1, 10, 1);
near("Cauchy: min x+4/x", hc[hc.length - 1]!.y, 4, 1e-6);
near("Cauchy: tại x", hc[hc.length - 1]!.x, 2, 1e-3);

// Mạng nơ-ron học parabol.
{
  const r = mulberry32(3);
  const net = A.makeNet(8, r);
  const xs = Array.from({ length: 41 }, (_, i) => -2 + i * 0.1);
  const ys = xs.map((x) => x * x - 1);
  let loss = Infinity;
  const first = A.netTrainEpoch(net, xs, ys, 0.03);
  for (let e = 0; e < 2500; e++) loss = A.netTrainEpoch(net, xs, ys, 0.03);
  is(`mạng giảm sai số (${first.toFixed(3)} → ${loss.toFixed(5)})`, loss < first / 50 && loss < 0.01);
  near("mạng dự đoán f(1.5)", A.netForward(net, 1.5), 1.25, 0.15);
}
// Gradient của mạng khớp đạo hàm số.
{
  const r = mulberry32(11);
  const net = A.makeNet(4, r);
  const xs = [-1, 0, 0.5, 1.2];
  const ys = [1, 0, 0.3, 2];
  const loss = () => xs.reduce((s, x, i) => s + (A.netForward(net, x) - ys[i]!) ** 2, 0) / xs.length;
  const before = loss();
  const lossFromTrain = A.netTrainEpoch(net, xs, ys, 1e-3);
  near("loss trả về là loss trước cập nhật", lossFromTrain, before, 1e-12);
  is("một bước Adam làm loss giảm", loss() < before);
}

// Perceptron học đường thẳng; khoảng cách có dấu = công thức.
{
  const r = mulberry32(5);
  const pts: A.Pt[] = [];
  while (pts.length < 60) {
    const x = r() * 8 - 4;
    const y = r() * 8 - 4;
    const s = 2 * x - y + 1;
    if (Math.abs(s) / Math.hypot(2, -1) > 0.5) pts.push({ x, y, label: s > 0 ? 1 : -1 });
  }
  const h = A.perceptronTrain(pts, 500);
  is("perceptron hội tụ", h[h.length - 1]!.errors === 0);
  near("khoảng cách từ (1;1) đến 3x+4y−5=0", A.signedDistance([3, 4], -5, { x: 1, y: 1 }), 2 / 5, 1e-12);
}

// Cramer.
{
  const s = A.cramer(2, 1, 1, -1, 5, 1)!;
  near("Cramer x", s.x, 2, 1e-12);
  near("Cramer y", s.y, 1, 1e-12);
  is("Cramer D=0", A.cramer(1, 2, 2, 4, 3, 6) === null);
}

// Đi vòng tròn bằng bước nhỏ khớp sin/cos.
{
  const p = A.walkCircle(1, 20000);
  near("cos 1 bằng bước nhỏ", p.x, Math.cos(1), 1e-3);
  near("sin 1 bằng bước nhỏ", p.y, Math.sin(1), 1e-3);
}

// Lượng giác bổ sung.
{
  const roots = A.findRoots((x) => Math.sin(x) - 0.5, -2 * Math.PI, 2 * Math.PI);
  const want = [-11 * Math.PI / 6, -7 * Math.PI / 6, Math.PI / 6, 5 * Math.PI / 6].sort((a, b) => a - b);
  is("sin x = 1/2 có 4 nghiệm trong [−2π;2π]", roots.length === 4);
  roots.forEach((r, i) => near(`nghiệm ${i}`, r, want[i]!, 1e-9));
  is("tan x = 1 bỏ chỗ nhảy", A.findRoots((x) => Math.tan(x) - 1, -1.5, 1.5).length === 1);
  const w = A.measureWave((x) => 2 * Math.sin(3 * x + 1) + 0.5, 0, 20);
  near("biên độ đo được", w.amplitude, 2, 1e-4);
  near("mức giữa đo được", w.centre, 0.5, 1e-4);
  near("chu kì đo được = 2π/3", w.period!, (2 * Math.PI) / 3, 1e-3);
  // Công thức cộng bằng phép quay: quay (cos a; sin a) một góc b cho (cos(a+b); sin(a+b)).
  const rot = A.rotateBy({ x: Math.cos(0.7), y: Math.sin(0.7) }, Math.cos(1.1), Math.sin(1.1));
  near("cos(a+b) bằng quay", rot.x, Math.cos(1.8), 1e-12);
  near("sin(a+b) bằng quay", rot.y, Math.sin(1.8), 1e-12);
  const t = A.triangleSAS(5, 7, 1.0);
  near("định lí cosin", t.a * t.a, 25 + 49 - 2 * 5 * 7 * Math.cos(1.0), 1e-9);
  near("định lí sin: a/sin A = 2R", t.a / Math.sin(t.angA), 2 * t.R, 1e-9);
  near("b/sin B = 2R", t.b / Math.sin(t.angB), 2 * t.R, 1e-9);
  near("tổng ba góc = π", t.angA + t.angB + t.angC, Math.PI, 1e-9);
  const p = (t.a + t.b + t.c) / 2;
  near("Heron = nửa tích có hướng", Math.sqrt(p * (p - t.a) * (p - t.b) * (p - t.c)), t.area, 1e-9);
  near("S = abc/4R", (t.a * t.b * t.c) / (4 * t.R), t.area, 1e-9);
}

// Đạo hàm bổ sung.
{
  near("diff x³ tại 2", A.diff((x) => x ** 3, 2), 12, 1e-6);
  near("diff sin tại 1", A.diff(Math.sin, 1), Math.cos(1), 1e-9);
  near("diff ln tại 2", A.diff(Math.log, 2), 0.5, 1e-9);
  const k = A.oneSided(Math.abs, 0, 1e-6);
  is("|x| tại 0: hai bên lệch", Math.abs(k.left + 1) < 1e-6 && Math.abs(k.right - 1) < 1e-6);
  const k2 = A.oneSided((x) => x * x, 3, 1e-6);
  near("x² hai bên cùng 6 (trái)", k2.left, 6, 1e-4);
  near("x² hai bên cùng 6 (phải)", k2.right, 6, 1e-4);
  const cp = A.criticalPoints((x) => x ** 3 - 3 * x, -3, 3);
  is("x³−3x có 2 điểm tới hạn", cp.length === 2);
  near("cực đại tại −1", cp[0]!.x, -1, 1e-4);
  is("−1 là cực đại, 1 là cực tiểu", cp[0]!.kind === "max" && cp[1]!.kind === "min");
  near("giá trị cực đại", cp[0]!.y, 2, 1e-6);
  const f3 = (x: number) => x ** 3 - 3 * x;
  const tg = A.tangentsThrough(f3, 2, 0, -4, 4);
  is("3 tiếp tuyến qua (2;0)", tg.length === 3);
  for (const x0 of tg) near("tiếp tuyến qua điểm", f3(x0) + A.diff(f3, x0, 1e-4) * (2 - x0), 0, 1e-5);
  // Từ gia tốc −10 dựng lại vận tốc, vị trí; đạo hàm số của vị trí phải ra vận tốc.
  const mo = A.eulerMotion(() => -10, 0, 20, 1e-4, 40000);
  near("s(2)", mo[20000]!.s, 20, 1e-2);
  near("v(2)=0", mo[20000]!.v, 0, 1e-6);
  const sAt = (t: number) => mo[Math.round(t * 1e4)]!.s;
  near("đạo hàm của s = v", A.diff(sAt, 1, 1e-3), 20 - 10 * 1, 1e-2);
  near("V lớn nhất của hộp 12 cm", A.criticalPoints((x) => A.boxVolume(x, 12), 0.1, 5.9).find((c) => c.kind === "max")!.x, 2, 1e-3);
  near("V(2)=128", A.boxVolume(2, 12), 128, 1e-12);
  const g = A.chainBackprop(0.7, 1.3, -0.8);
  near("lan truyền ngược dy/dx", g.dy_dx, A.diff((x) => -0.8 * Math.tanh(1.3 * x), 0.7), 1e-8);
  near("lan truyền ngược dy/dw1", g.dy_dw1, A.diff((w) => -0.8 * Math.tanh(w * 0.7), 1.3), 1e-8);
  near("lan truyền ngược dy/dw2", g.dy_dw2, A.diff((w) => w * Math.tanh(1.3 * 0.7), -0.8), 1e-8);
}

// Có đạo hàm hay không.
{
  is("x² có đạo hàm tại 0", A.hasDerivativeAt((x) => x * x, 0));
  is("sin có đạo hàm tại 1", A.hasDerivativeAt(Math.sin, 1));
  is("|x| tại 1 có đạo hàm", A.hasDerivativeAt(Math.abs, 1));
  is("|x| tại 0 không", !A.hasDerivativeAt(Math.abs, 0));
  is("∛x tại 0 không (tiếp tuyến đứng)", !A.hasDerivativeAt(Math.cbrt, 0));
  is("x·sin(1/x) tại 0 không", !A.hasDerivativeAt((x) => (x === 0 ? 0 : x * Math.sin(1 / x)), 0));
  is("x²·sin(1/x) tại 0 có (đạo hàm 0)", A.hasDerivativeAt((x) => (x === 0 ? 0 : x * x * Math.sin(1 / x)), 0));
}

// Tích phân bổ sung.
{
  near("Simpson ∫0..π sin", A.simpson(Math.sin, 0, Math.PI, 20), 2, 1e-4);
  near("Simpson ∫0..2 x³ chính xác", A.simpson((x) => x ** 3, 0, 2, 2), 4, 1e-12);
  const cum = A.cumulativeIntegral((x) => 2 * x, 0, 3, 3000);
  near("A(3) của 2x là 9", cum[3000]!.y, 9, 1e-5);
  near("A(x)=x² tại giữa", cum[1500]!.y, 2.25, 1e-5);
  const withC = A.cumulativeIntegral(Math.cos, 0, 2, 4000, 5);
  near("nguyên hàm cos qua C=5: sin x + 5", withC[4000]!.y, Math.sin(2) + 5, 1e-5);
  // Định lí cơ bản: đạo hàm của hàm diện tích bằng hàm gốc.
  const area = (x: number) => A.cumulativeIntegral(Math.sin, 0, x, 4000)[4000]!.y;
  near("A'(1) = sin 1", A.diff(area, 1, 1e-3), Math.sin(1), 1e-4);
  const p1 = A.areaBetween((x) => x, (x) => x * x, 0, 1);
  near("giữa y=x và y=x²", p1.area, 1 / 6, 1e-9);
  const p2 = A.areaBetween((x) => 4 - x * x, (x) => x + 2, -3, 3);
  is("giao điểm −2 và 1", p2.cuts.length === 4 && Math.abs(p2.cuts[1]! + 2) < 1e-6 && Math.abs(p2.cuts[2]! - 1) < 1e-6);
  near("hai đồ thị cắt nhau nhiều lần, tính theo |f−g|", A.areaBetween((x) => 4 - x * x, (x) => x + 2, -2, 1).area, 4.5, 1e-9);
  near("giữa sin và cos", A.areaBetween(Math.sin, Math.cos, Math.PI / 4, (5 * Math.PI) / 4).area, 2 * Math.SQRT2, 1e-9);
  near("thể tích nón", A.diskVolume((x) => x, 0, 3, 3000), 9 * Math.PI, 1e-4);
  near("thể tích cầu", A.diskVolume((x) => Math.sqrt(Math.max(0, 4 - x * x)), -2, 2, 6000), (32 / 3) * Math.PI, 1e-3);
  near("thể tích parabol", A.diskVolume(Math.sqrt, 0, 4, 4000), 8 * Math.PI, 1e-3);
  const sub = A.substitutionBoth(Math.cos, (x) => x * x, (x) => 2 * x, 0, 1.5);
  near("đổi biến hai vế bằng nhau", sub.inX, sub.inU, 1e-9);
  near("đổi biến cho sin(2,25)", sub.inU, Math.sin(2.25), 1e-9);
  const pr = A.partsBoth((x) => x, Math.exp, () => 1, Math.exp, 0, 2);
  near("từng phần hai vế", pr.left, pr.right, 1e-9);
  near("∫0..2 x eˣ = e²+1", pr.left, Math.E ** 2 + 1, 1e-9);
  const dd = A.displacementAndDistance((t) => 4 - t * t, 0, 3);
  near("độ dời ∫(4−t²)", dd.displacement, 3, 1e-9);
  near("quãng đường = 23/3", dd.distance, 23 / 3, 1e-9);
  is("đổi chiều tại t=2", dd.turns.length === 1 && Math.abs(dd.turns[0]! - 2) < 1e-9);
}

// Hàm bậc hai bổ sung.
{
  const cs = A.completeSquare(2, -8, 3);
  near("hoàn thiện bình phương h", cs.h, 2, 1e-12);
  near("hoàn thiện bình phương k", cs.k, 3 - 64 / 8, 1e-12);
  for (const x of [-3, 0, 1.7, 5]) near("a(x−h)²+k = ax²+bx+c", 2 * (x - cs.h) ** 2 + cs.k, 2 * x * x - 8 * x + 3, 1e-9);
  const nw = A.newtonPath((x) => x * x - 2, 3, 8);
  near("Newton → √2", nw[nw.length - 1]!.x, Math.SQRT2, 1e-9);
  is("Newton hội tụ rất nhanh (số chữ số tăng gấp đôi)", Math.abs(nw[4]!.x - Math.SQRT2) < 1e-6);
  // Nơ-ron học parabol h = −5t² + 20t + 1 từ 25 điểm nhiễu.
  const r = mulberry32(21);
  const pts = Array.from({ length: 25 }, (_, i) => { const x = (i / 24) * 4; return { x, y: -5 * x * x + 20 * x + 1 + (r() - 0.5) * 1.2 }; });
  const hist = A.fitQuadratic(pts, 6000, 0.3);
  const last = hist[hist.length - 1]!;
  near("học ra a ≈ −5", last.a, -5, 0.3);
  near("học ra b ≈ 20", last.b, 20, 0.8);
  near("học ra c ≈ 1", last.c, 1, 0.4);
  is("sai số giảm", last.loss < hist[0]!.loss / 100);
  near("đỉnh của đường học được ≈ 2", -last.b / (2 * last.a), 2, 0.1);
  // Giải bất phương trình bằng nghiệm và thử điểm, đối chiếu quy tắc.
  const i1 = A.solveInequality((x) => x * x - 5 * x + 6, "<");
  is("x²−5x+6<0 là (2;3)", i1.length === 1 && Math.abs(i1[0]!.lo - 2) < 1e-6 && Math.abs(i1[0]!.hi - 3) < 1e-6);
  const i2 = A.solveInequality((x) => x * x + x + 1, ">");
  is("x²+x+1>0 với mọi x", i2.length === 1 && i2[0]!.lo === -Infinity && i2[0]!.hi === Infinity);
  const i3 = A.solveInequality((x) => -x * x + 4, ">=");
  is("−x²+4≥0 là [−2;2]", i3.length === 1 && Math.abs(i3[0]!.lo + 2) < 1e-6 && Math.abs(i3[0]!.hi - 2) < 1e-6);
  const i4 = A.solveInequality((x) => x * x - 5 * x + 6, ">");
  is("x²−5x+6>0 là hai khoảng ngoài", i4.length === 2 && i4[0]!.lo === -Infinity && i4[1]!.hi === Infinity);
  const i5 = A.solveInequality((x) => (x - 1) ** 2, "<=");
  is("(x−1)²≤0 chỉ có x=1", i5.length === 1 && Math.abs(i5[0]!.lo - 1) < 1e-6 && Math.abs(i5[0]!.hi - 1) < 1e-6);
}

if (fails.length) {
  console.error(fails.join("\n"));
  process.exit(1);
}
console.log("algo ok");
