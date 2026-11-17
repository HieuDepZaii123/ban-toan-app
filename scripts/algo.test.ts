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

if (fails.length) {
  console.error(fails.join("\n"));
  process.exit(1);
}
console.log("algo ok");
