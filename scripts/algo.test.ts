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

// Bốn chuyên đề bổ sung.
{
  const r = mulberry32(5);
  const ok = A.counterexampleSearch((q) => q[0]! ** 2 + q[1]! ** 2 - 2 * q[0]! * q[1]!, 2, -10, 10, 20000, r);
  is("a²+b²≥2ab không có phản ví dụ", ok.counter === null && ok.min >= 0);
  const bad = A.counterexampleSearch((q) => (q[0]! + q[1]!) / 2 - Math.sqrt(Math.abs(q[0]! * q[1]!)), 2, -10, 10, 20000, r);
  is("trung bình cộng ≥ trung bình nhân của |ab| sai khi cả hai âm", bad.counter !== null && bad.counter.every((v) => v < 5));
  const bad2 = A.counterexampleSearch((q) => q[0]! + 1 / q[0]! - 2, 1, -5, 5, 20000, r);
  is("x+1/x≥2 sai với x âm", bad2.counter !== null && bad2.counter[0]! < 0);
  const mc = A.meanChain(3, 12);
  near("hm ≤ gm", mc.gm, 6, 1e-12);
  is("chuỗi bốn trung bình", mc.hm < mc.gm && mc.gm < mc.am && mc.am < mc.qm);
  near("độ cao nửa đường tròn = √(ab)", A.semicircleHeight(3, 12), Math.sqrt(36), 1e-12);
  const le = A.limitEstimate((x) => (x * x - 1) / (x - 1), 1, "right");
  near("(x²−1)/(x−1) → 2", le[8]!.value, 2, 1e-6);
  const sx = A.limitEstimate((x) => Math.sin(x) / x, 0, "left");
  near("sin x / x → 1", sx[5]!.value, 1, 1e-9);
  const lc = A.lineCircle(1, -1, 0, 0, 0, 2);
  near("y=x cắt tròn R=2: khoảng cách 0", lc.d, 0, 1e-12);
  is("hai giao điểm cách tâm R", lc.points.length === 2 && lc.points.every((p) => Math.abs(Math.hypot(p.x, p.y) - 2) < 1e-9));
  const tg = A.lineCircle(0, 1, -2, 0, 0, 2);
  is("tiếp xúc: một điểm", tg.points.length === 1 && Math.abs(tg.points[0]!.y - 2) < 1e-9);
  is("không cắt", A.lineCircle(0, 1, -5, 0, 0, 2).points.length === 0);
  const pl = A.planeThrough([1, 0, 0], [0, 1, 0], [0, 0, 1]);
  near("mặt x+y+z=1: khoảng cách từ gốc = 1/√3", A.distToPlane(pl, [0, 0, 0]), 1 / Math.sqrt(3), 1e-12);
  const cr = A.cross3([1, 2, 3], [4, 5, 6]);
  near("tích có hướng vuông góc a", A.dot3(cr, [1, 2, 3]), 0, 1e-12);
  near("tích có hướng vuông góc b", A.dot3(cr, [4, 5, 6]), 0, 1e-12);
  const T = A.triCenters({ x: 0, y: 0 }, { x: 6, y: 0 }, { x: 1, y: 4 });
  near("O, G, H thẳng hàng: H = 3G − 2O (x)", T.H.x, 3 * T.G.x - 2 * T.O.x, 1e-9);
  near("O, G, H thẳng hàng: H = 3G − 2O (y)", T.H.y, 3 * T.G.y - 2 * T.O.y, 1e-9);
  near("tâm ngoại tiếp cách đều ba đỉnh", Math.hypot(T.O.x - 6, T.O.y), T.R, 1e-9);
  near("bán kính nội tiếp = 2S/chu vi", T.r, (2 * T.area) / (6 + Math.hypot(1, 4) + Math.hypot(5, 4)), 1e-12);
  near("diện tích 12", T.area, 12, 1e-12);
  const lat = A.latticeArea([{ x: 0, y: 0 }, { x: 6, y: 0 }, { x: 1, y: 4 }], 0.05, 8);
  near("đếm ô ≈ 12", lat.area, 12, 0.1);
  const tm = A.tetraRatioMC(0.5, 0.6, 0.8, 200000, mulberry32(2));
  near("tỉ số thể tích = tích ba tỉ số", tm.fraction, 0.5 * 0.6 * 0.8, 0.005);
  near("diện tích quạt = ½r²α", A.sectorAreaNumeric(3, 2), 9, 1e-9);
}

// Thống kê, xác suất, ma trận, dãy lặp.
{
  const d = [2, 4, 4, 4, 5, 5, 7, 9];
  near("trung bình", A.mean(d), 5, 1e-12);
  near("phương sai", A.variance(d), 4, 1e-12);
  const q = A.quartiles([1, 2, 3, 4, 5, 6, 7, 8]);
  is("tứ phân vị chẵn", q.q1 === 2.5 && q.q2 === 4.5 && q.q3 === 6.5);
  const q2 = A.quartiles([1, 2, 3, 4, 5, 6, 7]);
  is("tứ phân vị lẻ bỏ số giữa", q2.q1 === 2 && q2.q2 === 4 && q2.q3 === 6);
  const mean0 = A.mean([1, 5, 9, 13]);
  near("cộng c: trung bình +c", A.mean([1, 5, 9, 13].map((v) => v + 10)), mean0 + 10, 1e-12);
  near("cộng c: phương sai giữ", A.variance([1, 5, 9, 13].map((v) => v + 10)), A.variance([1, 5, 9, 13]), 1e-12);
  near("nhân k: phương sai ×k²", A.variance([1, 5, 9, 13].map((v) => v * 3)), 9 * A.variance([1, 5, 9, 13]), 1e-9);
  const h = A.histogram([1, 2, 3, 11, 12, 21], 0, 10, 3);
  is("histogram", h.join() === "3,2,1");
  near("trung bình ghép nhóm", A.groupedMean([3, 2, 1], 0, 10), (3 * 5 + 2 * 15 + 25) / 6, 1e-12);
  near("trung vị ghép nhóm", A.groupedQuartile([3, 2, 1], 0, 10, 2), 10 + ((3 - 3) / 2) * 10, 1e-12);
  const bn = A.binomialPmf(10, 0.3);
  near("nhị thức tổng 1", bn.reduce((s2, v) => s2 + v, 0), 1, 1e-12);
  near("nhị thức trung bình np", bn.reduce((s2, v, k) => s2 + k * v, 0), 3, 1e-12);
  near("C(10,3) 0.3^3 0.7^7", bn[3]!, 120 * 0.3 ** 3 * 0.7 ** 7, 1e-12);
  near("ngày sinh 23 người ≈ 0.507", A.birthdayExact(23), 0.5073, 1e-3);
  near("ngày sinh mô phỏng", A.birthdaySim(23, 40000, mulberry32(9)), A.birthdayExact(23), 0.015);
  const by = A.bayes(0.01, 0.95, 0.05);
  near("Bayes: P(A)", by.pA, 0.01 * 0.95 + 0.99 * 0.05, 1e-12);
  near("Bayes: P(B|A) ≈ 0.161", by.pBgA, 0.0095 / 0.059, 1e-12);
  const rp = A.runningProportion(20000, mulberry32(4));
  near("luật số lớn", rp[19999]!, 0.5, 0.02);
  const ds = A.diceSumHistogram(3, 30000, mulberry32(8));
  is("tổng 3 xúc xắc đỉnh ở 10–11", ds.indexOf(Math.max(...ds)) >= 10 && ds.indexOf(Math.max(...ds)) <= 11);
  const dc = A.simulateDecay(4000, 0.1, 7, mulberry32(3));
  near("phân rã mô phỏng ≈ N0·0.9^7", dc[7]!, 4000 * 0.9 ** 7, 120);
  const it = A.iterate((x) => (x + 2 / x) / 2, 1, 8);
  near("lặp Newton → √2", it[8]!, Math.SQRT2, 1e-12);
  is("iterate n=0 chỉ có giá trị đầu", A.iterate((x) => x + 1, 5, 0).join() === "5");
  is("(1+x)^4 hệ số", A.polyMul(A.polyMul([1, 1], [1, 1]), A.polyMul([1, 1], [1, 1])).join() === "1,4,6,4,1");
  near("diện tích dây giày", A.polyArea([{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 4, y: 3 }]), 6, 1e-12);
  const M: A.M2 = [2, 1, 0, 3];
  near("det", A.matDet(M), 6, 1e-12);
  const sq = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }].map((p) => A.matApply(M, p));
  near("diện tích ảnh = |det|", A.polyArea(sq), 6, 1e-12);
  near("det(AB)=det A·det B", A.matDet(A.matMul(M, [1, 2, 3, 4])), 6 * -2, 1e-12);
  is("AB ≠ BA", A.matMul([1, 1, 0, 1], [1, 0, 1, 1]).join() !== A.matMul([1, 0, 1, 1], [1, 1, 0, 1]).join());
  const vt = A.variationTable((x) => x ** 3 - 3 * x, -3, 3);
  is("bảng biến thiên x³−3x: tăng, giảm, tăng", vt.signs.join() === "1,-1,1" && vt.cuts.length === 4);
  is("f(x)=m có 3 nghiệm khi |m|<2", A.countSolutions((x) => x ** 3 - 3 * x, 1, -3, 3) === 3 && A.countSolutions((x) => x ** 3 - 3 * x, 3, -3, 3) === 1);
  is("2^n vượt 100n từ n=10", A.crossoverIndex((n) => 100 * n, (n) => 2 ** n, 40) === 10);
  is("không vượt trong giới hạn thì null", A.crossoverIndex((n) => 100 * n, (n) => 2 ** n, 8) === null);
}

// Bất đẳng thức: hình vuông và chữ nhật, bốn trung bình quanh m, tam thức Cauchy, độ dài tổng hai vectơ.
{
  const sq = A.squaresVsRectangles(7, 3);
  near("hình vuông − chữ nhật = (a−b)²", sq.excess, 16, 1e-12);
  is("hình vuông luôn ≥ chữ nhật", sq.squares >= sq.rectangles);
  const mc = A.meanChainAround(5, 3);
  near("a=8, b=2: trung bình nhân", mc.gm, 4, 1e-12);
  near("a=8, b=2: điều hòa", mc.hm, 3.2, 1e-12);
  is("chuỗi bốn trung bình đúng thứ tự", mc.hm <= mc.gm && mc.gm <= mc.am && mc.am <= mc.qm);
  const flat = A.meanChainAround(5, 0);
  is("d = 0 thì cả bốn bằng nhau", [flat.hm, flat.gm, flat.qm].every((v) => Math.abs(v - 5) < 1e-12));
  const cq = A.cauchyQuadratic(3, 1, 2, 5);
  near("cực tiểu tam thức Cauchy", cq.minValue, 169 / 10, 1e-12);
  near("g tại tMin bằng cực tiểu", cq.g(cq.tMin), cq.minValue, 1e-9);
  is("biệt thức ≤ 0", cq.discriminant <= 0);
  near("biệt thức = −(ay−bx)²", cq.discriminant, -((3 * 5 - 1 * 2) ** 2), 1e-9);
  const path = A.cauchyDescent(3, 1, 2, 5, 200, 0.05);
  near("hạ gradient tới tMin", path[path.length - 1]!, cq.tMin, 1e-6);
  const par = A.cauchyQuadratic(3, 1, 6, 2);
  near("hai cặp tỉ lệ thì cực tiểu bằng 0", par.minValue, 0, 1e-12);
  near("cùng hướng: |a+b| = |a|+|b|", A.vectorSumLength(3, 2, 0).gap, 0, 1e-12);
  near("ngược hướng: |a+b| = |a|−|b|", A.vectorSumLength(3, 2, Math.PI).sum, 1, 1e-12);
  is("|a+b| ≤ |a|+|b| mọi góc", Array.from({ length: 50 }, (_, i) => A.vectorSumLength(3, 2, (i * Math.PI) / 49).gap >= -1e-12).every(Boolean));
}

// Hàm mũ và logarit: độ dốc a^x chia a^x dồn về ln a; thước logarit biến nhân thành cộng.
{
  for (const a of [2, 3, 0.5, Math.E]) near(`độ dốc/giá trị của ${a}^x`, A.expSlopeRatio(a, 1.7), Math.log(a), 1e-6);
  near("thước logarit: 6×7 = 6 + 7 cộng độ dài", A.logRulerPosition(6 * 7), A.logRulerPosition(6) + A.logRulerPosition(7), 1e-12);
  near("thước logarit: 1 ở vị trí 0", A.logRulerPosition(1), 0, 1e-12);
}

// Dãy số: tổng riêng cấp số nhân, domino, ghép cặp Gauss.
{
  const gp = A.geometricPartials(1, 0.5, 40);
  near("1 + 1/2 + 1/4 + … dồn về 2", gp[39]!, 2, 1e-9);
  near("S_3 của 3, 6, 12 = 21", A.geometricPartials(3, 2, 3)[2]!, 21, 1e-12);
  near("S_n = u1(1−q^n)/(1−q)", A.geometricPartials(2, 0.3, 7)[6]!, 2 * (1 - 0.3 ** 7) / 0.7, 1e-12);
  const early = A.dominoAngles(5, 0.3);
  is("lúc đầu chỉ quân đầu nghiêng", early[0]! > 0 && early[1] === 0);
  const late = A.dominoAngles(5, 100);
  is("đủ lâu thì cả hàng đã đổ", late.every((v) => v === late[0] && v > 1));
  is("quân sau không đổ trước quân trước", A.dominoAngles(6, 2.1).every((v, i, a) => i === 0 || v <= a[i - 1]!));
  const g = A.gaussPairs(3, 4, 10);
  is("mọi cột cùng tổng u1 + un", g.sums.every((v) => v === 3 + 39));
  near("tổng các cột = 2·S_n", g.sums.reduce((a, b) => a + b, 0), 2 * 10 * (3 + 39) / 2, 1e-9);
}

// Giới hạn: δ theo ε, giới hạn hai bên, giới hạn ở vô cực, lịch ôn.
{
  const d = A.largestDelta((x) => 2 * x + 1, 3, 7, 0.1);
  near("f = 2x+1: δ = ε/2", d, 0.05, 1e-6);
  const d2 = A.largestDelta((x) => x * x, 2, 4, 0.01);
  is("f = x²: δ nhỏ hơn ε/4 một chút", d2 > 0.0024 && d2 < 0.0025);
  is("ε nhỏ hơn thì δ nhỏ hơn", A.largestDelta((x) => x * x, 2, 4, 0.001) < d2);
  const hole = A.twoSidedLimit((x) => (x * x - 1) / (x - 1), 1);
  is("lỗ hổng (x²−1)/(x−1) có giới hạn 2", hole.agree && Math.abs(hole.left - 2) < 1e-4);
  const jump = A.twoSidedLimit((x) => (x < 0 ? -1 : 1), 0);
  is("bước nhảy không có giới hạn hai bên", !jump.agree);
  near("(2x+1)/(x−3) → 2 ở vô cực", A.limitAtInfinity((x) => (2 * x + 1) / (x - 3)), 2, 1e-5);
  const now = 10 * 86_400_000;
  is("câu đúng thì không ôn", !A.reviewDue({ ok: true, tries: 1, at: 0 }, now));
  is("sai một lần: chưa tới 1 ngày thì chưa ôn", !A.reviewDue({ ok: false, tries: 1, at: now - 3_600_000 }, now));
  is("sai một lần: sau 1 ngày thì ôn", A.reviewDue({ ok: false, tries: 1, at: now - 86_400_000 }, now));
  is("sai nhiều lần: phải đợi 3 ngày", !A.reviewDue({ ok: false, tries: 2, at: now - 2 * 86_400_000 }, now) && A.reviewDue({ ok: false, tries: 2, at: now - 3 * 86_400_000 }, now));
}

// Khảo sát hàm số: độ dốc, cực trị, số cực trị bậc ba, số nghiệm.
{
  near("độ dốc x³ − 3x tại 2 là 9", A.centralSlope((x) => x ** 3 - 3 * x, 2), 9, 1e-5);
  near("độ dốc x³ − 3x tại 1 là 0", A.centralSlope((x) => x ** 3 - 3 * x, 1), 0, 1e-5);
  is("x³ tại 0 không phải cực trị", A.isExtremum((x) => x ** 3, 0) === "none");
  is("x² tại 0 là cực tiểu", A.isExtremum((x) => x * x, 0) === "min");
  is("−x⁴ tại 0 là cực đại", A.isExtremum((x) => -(x ** 4), 0) === "max");
  is("x³ − 3x có 2 cực trị", A.cubicExtremaCount(1, 0, -3) === 2);
  is("x³ + x có 0 cực trị", A.cubicExtremaCount(1, 0, 1) === 0);
  is("x³ có 0 cực trị (y' có nghiệm kép)", A.cubicExtremaCount(1, 0, 0) === 0);
  let most = 0;
  const rng = mulberry32(7);
  for (let i = 0; i < 300; i++) most = Math.max(most, A.cubicExtremaCount(rng() * 4 - 2 || 1, rng() * 4 - 2, rng() * 4 - 2, rng() * 4 - 2));
  is("bậc ba không bao giờ có quá 2 cực trị", most === 2);
  is("Δ' = b² − 3ac quyết định số cực trị", [[1, 0, -3], [2, 1, 1], [1, 3, 3], [-1, 1, 1]].every(([a, b, c]) => (A.cubicExtremaCount(a!, b!, c!) === 2) === (b! * b! - 3 * a! * c! > 0)));
  is("y = 1 cắt x³ − 3x tại 3 điểm", A.countSolutions((x) => x ** 3 - 3 * x, 1, -4, 4) === 3);
  is("y = 3 cắt x³ − 3x tại 1 điểm", A.countSolutions((x) => x ** 3 - 3 * x, 3, -4, 4) === 1);
}

// Vectơ và ma trận: biến đổi dần, phân loại hệ, đường quay.
{
  const T: A.M2 = [2, 1, 1, 0.5];
  near("matLerp t=0 là ma trận đơn vị", A.matDet(A.matLerp(T, 0)), 1, 1e-12);
  near("matLerp t=1 có định thức của ma trận đích", A.matDet(A.matLerp(T, 1)), A.matDet(T), 1e-12);
  is("det(AB) = det A · det B", Math.abs(A.matDet(A.matMul([1, 2, 3, 4], [0, 1, 1, 1])) - A.matDet([1, 2, 3, 4]) * A.matDet([0, 1, 1, 1])) < 1e-9);
  is("x+2y=3, 2x+4y=7 vô nghiệm", A.systemKind(1, 2, 3, 2, 4, 7) === "none");
  is("x+2y=3, 2x+4y=6 vô số nghiệm", A.systemKind(1, 2, 3, 2, 4, 6) === "many");
  is("x+2y=5, 3x+4y=6 một nghiệm", A.systemKind(1, 2, 5, 3, 4, 6) === "one");
  near("đường quay: D = 0 ở 45°", A.rotatingLineSystem(Math.PI / 4).det, 0, 1e-12);
  is("đường quay: song song thì không có nghiệm", A.rotatingLineSystem(Math.PI / 4).solution === null);
  const near45 = A.rotatingLineSystem(Math.PI / 4 + 0.01).solution;
  is("đường quay: gần 45° nghiệm rất xa gốc", near45 !== null && Math.hypot(near45.x, near45.y) > 30);
  const far = A.rotatingLineSystem(0).solution;
  is("đường quay: θ = 0 cho nghiệm (1; 1)", far !== null && Math.abs(far.x - 1) < 1e-9 && Math.abs(far.y - 1) < 1e-9);
}

// Đại số tuyến tính: hạng, giá trị riêng, lặp lũy thừa, hồi quy.
{
  is("hạng của ma trận có hàng hai gấp đôi hàng một là 2", A.matRank([[1, 2, 3], [2, 4, 6], [1, 0, 1]]) === 2);
  is("hạng của ma trận đơn vị 3×3 là 3", A.matRank([[1, 0, 0], [0, 1, 0], [0, 0, 1]]) === 3);
  is("hạng của ma trận không là 0", A.matRank([[0, 0], [0, 0]]) === 0);
  const ev = A.eigenvalues2([2, 1, 1, 2]);
  is("giá trị riêng của [[2,1],[1,2]] là 1 và 3", ev.length === 2 && Math.abs(ev[0]! - 1) < 1e-12 && Math.abs(ev[1]! - 3) < 1e-12);
  is("phép quay 90° không có giá trị riêng thực", A.eigenvalues2([0, -1, 1, 0]).length === 0);
  const ev2 = A.eigenvalues2([4, 1, 2, 3]);
  is("tổng giá trị riêng bằng vết, tích bằng định thức", Math.abs(ev2[0]! + ev2[1]! - 7) < 1e-12 && Math.abs(ev2[0]! * ev2[1]! - 10) < 1e-12);
  const it = A.powerIteration([2, 1, 1, 2], { x: 1, y: 0 }, 30);
  const last = it[it.length - 1]!;
  near("lặp lũy thừa về hướng (1;1)", Math.abs(last.v.x - last.v.y), 0, 1e-9);
  near("lặp lũy thừa: ước lượng giá trị riêng trội", last.lambda, 3, 1e-9);
  const ls = A.leastSquaresLine([{ x: 0, y: 1 }, { x: 1, y: 3 }, { x: 2, y: 4 }]);
  near("hồi quy: hệ số góc 3/2", ls.b, 1.5, 1e-12);
  near("hồi quy: tung độ gốc 7/6", ls.a, 7 / 6, 1e-12);
  is("hồi quy: đường tối ưu có sai số nhỏ hơn mọi đường lân cận", [-0.1, 0.1].every((d) => A.lineSse([{ x: 0, y: 1 }, { x: 1, y: 3 }, { x: 2, y: 4 }], ls.a, ls.b + d) > ls.sse));
}

// Giải tích đại học: Taylor, chuỗi, hạ gradient, điểm dừng.
{
  near("Taylor e^0,5 bậc 3 = 79/48", A.taylorPartial("exp", 0.5, 3), 79 / 48, 1e-12);
  near("Taylor e^1 bậc 20 ≈ e", A.taylorPartial("exp", 1, 20), Math.E, 1e-12);
  near("Taylor sin 0,3 bậc 5", A.taylorPartial("sin", 0.3, 5), Math.sin(0.3), 1e-6);
  near("Taylor cos 0,3 bậc 6", A.taylorPartial("cos", 0.3, 6), Math.cos(0.3), 1e-8);
  near("Taylor ln(1,5) bậc 30", A.taylorPartial("ln1p", 0.5, 30), Math.log(1.5), 1e-8);
  is("Taylor ln(1+x) lệch xa khi x = 1,5", Math.abs(A.taylorPartial("ln1p", 1.5, 30) - Math.log(2.5)) > 1);
  const geo = A.partialSums((k) => 0.5 ** k, 0, 40);
  near("chuỗi hình học q = 1/2 về 2", geo[geo.length - 1]!, 2, 1e-9);
  const har = A.partialSums((k) => 1 / k, 1, 1 << 12);
  is("chuỗi điều hòa: S_{2^m} ≥ 1 + m/2", [1, 2, 4, 8, 12].every((m) => har[(1 << m) - 1]! >= 1 + m / 2));
  const path = A.descend2D((x, y) => [2 * x, 6 * y], { x: 4, y: 2 }, 0.1, 1);
  near("hạ gradient bước một: x", path[1]!.x, 3.2, 1e-12);
  near("hạ gradient bước một: y", path[1]!.y, 0.8, 1e-12);
  const far = A.descend2D((x, y) => [2 * x, 6 * y], { x: 4, y: 2 }, 0.1, 80).pop()!;
  is("hạ gradient dần tới (0;0)", Math.hypot(far.x, far.y) < 1e-6);
  const big = A.descend2D((x, y) => [2 * x, 6 * y], { x: 4, y: 2 }, 0.4, 10).pop()!;
  is("bước học quá lớn thì phân kì", Math.hypot(big.x, big.y) > 10);
  is("x² − y² tại gốc là điểm yên", A.classifyStationary(2, -2, 0) === "saddle");
  is("x² + y² tại gốc là cực tiểu", A.classifyStationary(2, 2, 0) === "min");
  is("−x² − y² tại gốc là cực đại", A.classifyStationary(-2, -2, 0) === "max");
  const hs = A.hessian2D((x, y) => x * x - y * y, 0, 0);
  is("Hessian số của x² − y²", Math.abs(hs.fxx - 2) < 1e-6 && Math.abs(hs.fyy + 2) < 1e-6 && Math.abs(hs.fxy) < 1e-6);
}

// Xác suất thống kê đại học: chuẩn, luật số lớn, khoảng tin cậy, A/B test.
{
  near("Φ(0) = 0,5", A.normalCdf(0), 0.5, 1e-7);
  near("Φ(1,96) ≈ 0,975", A.normalCdf(1.96), 0.9750021, 1e-6);
  near("Φ(1,9) ≈ 0,97128", A.normalCdf(1.9), 0.9712834, 1e-6);
  near("Φ(−z) = 1 − Φ(z)", A.normalCdf(-1.3), 1 - A.normalCdf(1.3), 1e-9);
  const means = A.runningDiceMeans(20000, mulberry32(7));
  near("trung bình xúc xắc sau 20000 lần ≈ 3,5", means[19999]!, 3.5, 0.05);
  is("trung bình dao động mạnh ở những lần đầu", Math.abs(means[0]! - 3.5) >= 0.5 || Math.abs(means[1]! - 3.5) >= 0.25);
  near("phương sai mẫu của 1..6 chia n−1 = 3,5", A.sampleVariance([1, 2, 3, 4, 5, 6]), 3.5, 1e-12);
  const vb = A.varianceBias(5, 4000, mulberry32(3));
  near("chia n−1 không chệch (≈ 1/12)", vb.divN1, 1 / 12, 0.003);
  is("chia n thấp hơn chia n−1 theo đúng tỉ lệ (n−1)/n", Math.abs(vb.divN / vb.divN1 - 4 / 5) < 1e-9);
  const cov = A.intervalCoverage(2000, 30, 1.96, mulberry32(11));
  near("khoảng tin cậy 95% phủ khoảng 95%", cov.covered / 2000, 0.95, 0.02);
  const cov2 = A.intervalCoverage(2000, 30, 1, mulberry32(11));
  near("khoảng z = 1 phủ khoảng 68%", cov2.covered / 2000, 0.6827, 0.03);
  const ab = A.twoProportionZ(200, 1000, 240, 1000);
  near("A/B: tỉ lệ gộp 0,22", ab.pooled, 0.22, 1e-12);
  near("A/B: z ≈ −2,159", ab.z, -2.1592, 1e-3);
  near("A/B: p ≈ 0,0308", ab.p, 0.0308, 5e-4);
  const sums = Array.from({ length: 36 }, (_, i) => 2 + Math.floor(i / 6) + (i % 6) - 1);
  near("phương sai tổng hai xúc xắc = 35/6", A.variance(sums), 35 / 6, 1e-12);
}

if (fails.length) {
  console.error(fails.join("\n"));
  process.exit(1);
}
console.log("algo ok");
