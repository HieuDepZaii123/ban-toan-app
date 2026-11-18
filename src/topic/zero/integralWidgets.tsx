import { useMemo, useState } from "react";
import {
  areaBetween, cumulativeIntegral, diff, diskVolume, displacementAndDistance, monteCarloArea, partsBoth, simpson,
  substitutionBoth, type Fn,
} from "../../algo/index.ts";
import { dashed, dot, strokeFn } from "../../labs/draw.ts";
import { Graph } from "../../labs/Graph.tsx";
import { fmt } from "../../lib/format.ts";
import { freshSeed, mulberry32 } from "../../lib/prng.ts";
import { Slider } from "../../ui/Slider.tsx";
import { at, frame, label, useTicker, en, useTx } from "./kit.ts";
import { Buttons, Stage } from "./widgets.tsx";

const R = String.raw;

/** Tô miền dưới đồ thị f từ a đến b (chiều cao có dấu): chỗ f ≥ 0 màu xanh, f < 0 màu cam. */
function shade(ctx: CanvasRenderingContext2D, map: { x: (v: number) => number; y: (v: number) => number }, f: Fn, a: number, b: number, pos: string, neg: string, steps = 300) {
  const h = (b - a) / steps;
  for (let i = 0; i < steps; i++) {
    const xm = a + (i + 0.5) * h;
    const y = f(xm);
    ctx.fillStyle = y >= 0 ? pos : neg;
    ctx.globalAlpha = 0.32;
    ctx.fillRect(map.x(a + i * h), map.y(Math.max(0, y)), map.x(a + (i + 1) * h) - map.x(a + i * h) + 0.6, Math.abs(map.y(0) - map.y(y)));
  }
  ctx.globalAlpha = 1;
}

/* ---------- 1. Nguyên hàm: đi ngược đạo hàm, một họ đường cong ---------- */

const ANTI: { name: string; f: Fn; F: Fn; tex: string; Ftex: string; x0: number; x1: number; y0: number; y1: number }[] = [
  { name: "2x", f: (x) => 2 * x, F: (x) => x * x, tex: "2x", Ftex: "x^2", x0: -3, x1: 3, y0: -5, y1: 10 },
  { name: "cos x", f: Math.cos, F: Math.sin, tex: "\\cos x", Ftex: "\\sin x", x0: -6, x1: 6, y0: -4, y1: 4 },
  { name: "eˣ", f: Math.exp, F: Math.exp, tex: "e^x", Ftex: "e^x", x0: -3, x1: 2.2, y0: -3, y1: 10 },
  { name: "3x²", f: (x) => 3 * x * x, F: (x) => x ** 3, tex: "3x^2", Ftex: "x^3", x0: -2.2, x1: 2.2, y0: -10, y1: 10 },
];

export function AntiderivLab() {
  const tt = useTx();
  const [pick, setPick] = useState(0);
  const [C, setC] = useState(1);
  const [u, setU] = useState(0.55);
  const s = at(ANTI, pick);
  const x = s.x0 + (s.x1 - s.x0) * u;
  const path = useMemo(() => cumulativeIntegral(s.f, s.x0, s.x1, 1200, s.F(s.x0) + C), [s, C]);
  const num = (t: number) => at(path, Math.round(((t - s.x0) / (s.x1 - s.x0)) * 1200)).y;
  let worst = 0;
  for (let i = 0; i <= 1200; i += 10) worst = Math.max(worst, Math.abs(at(path, i).y - (s.F(at(path, i).x) + C)));
  return (
    <Stage
      title={tt(R`Nguyên hàm: cho độ dốc, dựng lại đường cong`, R`Antiderivative: given the slope, rebuild the curve`)}
      story={tt(R`Bạn biết độ dốc của đường cong ở mọi chỗ nhưng không biết đường cong ở độ cao nào. Hãy đặt bút tại một điểm bất kì rồi vẽ theo độ dốc cho trước: ta được một đường cong. Đặt bút cao hơn hay thấp hơn thì được đường cong cao hơn hay thấp hơn nhưng vẫn cùng một dáng, vì nâng cả đường lên không làm đổi độ dốc. Máy vẽ bằng cách cộng dồn độ dốc nhân bước ngang. Tại cùng một hoành độ, các tiếp tuyến của cả họ đường cong song song với nhau.`, R`You know the slope of a curve everywhere but not at what height it sits. Put the pen down at any point and draw along the given slope: you get a curve. Start higher or lower and you draw a higher or lower curve of the same shape, since lifting the whole curve does not change its slope. The machine draws by accumulating slope times the horizontal step. The tangents at the same position on every curve of the family are parallel.`)}
      read={tt(`Độ dốc cho trước $f(x)=${s.tex}$. Đường cam do máy cộng dồn từng bước xuất phát ở độ cao $F(x_0)+C$ với $C=${fmt(C)}$; công thức $F(x)+C=${s.Ftex}+${fmt(C)}$. Lệch lớn nhất giữa hai đường $${fmt(worst, 8)}$. Tại $x=${fmt(x, 2)}$ độ dốc của mọi đường trong họ đều bằng $${fmt(s.f(x), 3)}$.`, `Given slope $f(x)=${s.tex}$. The orange curve, accumulated step by step by the machine starting at height $F(x_0)+C$ with $C=${fmt(C)}$; the formula $F(x)+C=${s.Ftex}+${fmt(C)}$. Largest gap between the two curves $${fmt(worst, 8)}$. At $x=${fmt(x, 2)}$ the slope of every curve in the family equals $${fmt(s.f(x), 3)}$.`)}
      why={tt(R`Hai nguyên hàm của cùng một hàm chỉ khác nhau một hằng số vì hiệu của chúng có độ dốc 0 ở mọi nơi, tức là đường nằm ngang. Vì vậy ta phải ghi $+C$: nó lưu lại độ cao xuất phát mà độ dốc không cho biết.`, R`Two antiderivatives of the same function differ by a constant because their difference has slope 0 everywhere, i.e. it is a horizontal line. That is why we must write $+C$: it records the starting height, which the slope cannot tell us.`)}
    >
      <Graph
        label={tt("Họ các đường cong có cùng độ dốc", "A family of curves with the same slope")}
        draw={(ctx, w, h) => {
          const { colors, map, pad } = frame(ctx, w, h, s.x0, s.x1, s.y0, s.y1);
          for (const c of [-3, -2, -1, 0, 1, 2, 3]) {
            ctx.globalAlpha = 0.35;
            strokeFn(ctx, map, w, h, pad, s.x0, s.x1, (t) => s.F(t) + c, colors.soft, 1.2);
            ctx.globalAlpha = 1;
            const sl = s.f(x);
            dashed(ctx, map.x(x - 0.6), map.y(s.F(x) + c - 0.6 * sl), map.x(x + 0.6), map.y(s.F(x) + c + 0.6 * sl), colors.curve);
          }
          strokeFn(ctx, map, w, h, pad, s.x0, s.x1, num, colors.alt, 2.8);
          dot(ctx, map.x(s.x0), map.y(s.F(s.x0) + C), colors.alt, colors.bg, 6);
          label(ctx, tt("điểm đặt bút", "pen start"), map.x(s.x0) + 8, map.y(s.F(s.x0) + C) - 8, colors.alt);
        }}
      />
      <div className="fz-controls">
        <label className="fz-pick">{tt("Độ dốc cho trước", "Given slope")}
          <select value={pick} onChange={(e) => setPick(Number(e.target.value))}>{ANTI.map((a, i) => <option key={a.name} value={i}>{tt(a.name, en(a.name))}</option>)}</select>
        </label>
        <Slider label={tt("Hằng số C (độ cao đặt bút)", "Constant C (pen height)")} value={C} min={-3} max={3} step={0.5} onChange={setC} />
        <Slider label={tt("Vị trí xem tiếp tuyến", "Where to view the tangents")} value={u} min={0.1} max={0.9} step={0.02} onChange={setU} />
      </div>
    </Stage>
  );
}

/* ---------- 2. Định lí cơ bản: hàm diện tích có độ dốc bằng hàm gốc ---------- */

const AREA_FNS: { name: string; f: Fn; a: number; b: number; y0: number; y1: number; tex: string }[] = [
  { name: "x² − 1", f: (x) => x * x - 1, a: -1.5, b: 2.5, y0: -2, y1: 6, tex: "x^2-1" },
  { name: "sin x", f: Math.sin, a: 0, b: 6.3, y0: -2.2, y1: 2.2, tex: "\\sin x" },
  { name: "√x", f: Math.sqrt, a: 0, b: 4, y0: -1, y1: 5, tex: "\\sqrt{x}" },
];

export function AreaFunctionLab() {
  const tt = useTx();
  const [pick, setPick] = useState(0);
  const [u, setU] = useState(0.6);
  const s = at(AREA_FNS, pick);
  const n = 1000;
  const path = useMemo(() => cumulativeIntegral(s.f, s.a, s.b, n), [s]);
  const A = (t: number) => at(path, Math.round(((t - s.a) / (s.b - s.a)) * n)).y;
  const x = s.a + (s.b - s.a) * u;
  const slope = diff(A, x, (s.b - s.a) * 0.01);
  const mean = A(x) / (x - s.a);
  return (
    <Stage
      title={tt(R`Định lí cơ bản: diện tích đã quét có độ dốc bằng chiều cao`, R`The fundamental theorem: the area swept has slope equal to the height`)}
      story={tt(R`Hãy tưởng tượng một tấm rèm kéo từ trái sang phải, quét qua miền dưới đồ thị. Gọi $A(x)$ là diện tích đã quét tới vị trí x (đường cam trong hình). Khi rèm đi thêm một bước nhỏ, diện tích tăng thêm một dải mỏng cao đúng bằng giá trị của hàm tại chỗ rèm đứng. Vậy tốc độ tăng của diện tích chính là chiều cao của đồ thị tại đó.`, R`Imagine a curtain pulled from left to right, sweeping across the region under the graph. Let $A(x)$ be the area swept up to position x (the orange curve in the picture). When the curtain moves a little further, the area grows by a thin strip as tall as the value of the function where the curtain stands. So the rate at which the area grows is the height of the graph at that place.`)}
      read={tt(`Tại $x=${fmt(x, 3)}$: diện tích quét được $A=${fmt(A(x), 4)}$; chiều cao đồ thị $f(x)=${fmt(s.f(x), 4)}$; độ dốc của đường $A$ do máy đo $${fmt(slope, 4)}$. Hai số sau bằng nhau. Giá trị trung bình của hàm trên $[${fmt(s.a)};\\ ${fmt(x, 2)}]$ là $\\frac{A}{x-a}=${fmt(mean, 4)}$, là chiều cao hình chữ nhật có cùng diện tích.`, `At $x=${fmt(x, 3)}$: area swept $A=${fmt(A(x), 4)}$; height of the graph $f(x)=${fmt(s.f(x), 4)}$; the slope of the curve $A$ measured by the machine $${fmt(slope, 4)}$. The last two agree. The mean value of the function on $[${fmt(s.a)};\\ ${fmt(x, 2)}]$ is $\\frac{A}{x-a}=${fmt(mean, 4)}$, the height of the rectangle with the same area.`)}
      why={tt(R`$A(x+h)-A(x)\approx f(x)\cdot h$, chia cho $h$ rồi cho $h\to 0$ được $A'(x)=f(x)$. Vậy $A$ là một nguyên hàm của $f$, và nếu $F$ là nguyên hàm bất kì thì $A=F+C$ với $C=-F(a)$ vì $A(a)=0$. Vậy $\int_a^b f=F(b)-F(a)$: tính diện tích bằng cách trừ hai giá trị của nguyên hàm.`, R`$A(x+h)-A(x)\approx f(x)\cdot h$; divide by h and let $h\to 0$ to get $A'(x)=f(x)$. So $A$ is an antiderivative of $f$, and if $F$ is any antiderivative then $A=F+C$ with $C=-F(a)$ because $A(a)=0$. So $\int_a^b f=F(b)-F(a)$: compute an area by subtracting two values of the antiderivative.`)}
    >
      <Graph
        label={tt("Hàm số, miền đã quét và hàm diện tích", "The function, the swept region and the area function")}
        draw={(ctx, w, h) => {
          const aMin = Math.min(...path.map((p) => p.y));
          const aMax = Math.max(...path.map((p) => p.y));
          const lo = Math.min(s.y0, aMin - 0.3);
          const hi = Math.max(s.y1, aMax + 0.3);
          const { colors, map, pad } = frame(ctx, w, h, s.a - 0.1, s.b + 0.1, lo, hi);
          shade(ctx, map, s.f, s.a, x, colors.curve, colors.alt);
          strokeFn(ctx, map, w, h, pad, s.a, s.b, s.f, colors.curve, 2.4);
          strokeFn(ctx, map, w, h, pad, s.a, s.b, A, colors.alt, 2.4);
          dashed(ctx, map.x(x), map.y(lo), map.x(x), map.y(hi), colors.soft);
          dot(ctx, map.x(x), map.y(s.f(x)), colors.curve, colors.bg, 6);
          dot(ctx, map.x(x), map.y(A(x)), colors.alt, colors.bg, 6);
          const ext = (s.b - s.a) * 0.1;
          dashed(ctx, map.x(x - ext), map.y(A(x) - ext * slope), map.x(x + ext), map.y(A(x) + ext * slope), colors.alt);
          label(ctx, "f", map.x(s.b) - 10, map.y(s.f(s.b)) - 8, colors.curve);
          label(ctx, "A", map.x(s.b) - 10, map.y(A(s.b)) + 14, colors.alt);
        }}
      />
      <div className="fz-controls">
        <label className="fz-pick">{tt("Hàm", "Function")}
          <select value={pick} onChange={(e) => setPick(Number(e.target.value))}>{AREA_FNS.map((a, i) => <option key={a.name} value={i}>{tt(a.name, en(a.name))}</option>)}</select>
        </label>
        <Slider label={tt("Rèm đứng ở (0 = trái, 1 = phải)", "Curtain stands at (0 = left, 1 = right)")} value={u} min={0.05} max={1} step={0.01} onChange={setU} />
      </div>
    </Stage>
  );
}

/* ---------- 3. Độ dời và quãng đường ---------- */

export function DisplacementLab() {
  const tt = useTx();
  const [vmax, setVmax] = useState(4);
  const [T, setT] = useState(3);
  const v: Fn = (t) => vmax - t * t;
  const r = displacementAndDistance(v, 0, T);
  return (
    <Stage
      title={tt(R`Đi rồi quay lại: độ dời và quãng đường khác nhau`, R`Out and back: displacement and distance differ`)}
      story={tt(R`Xe chạy với vận tốc $v(t)=${"v_{\\max}"}-t^2$: lúc đầu chạy tới, vận tốc giảm dần, rồi vận tốc âm nghĩa là xe chạy lùi. Phần diện tích phía trên trục là đoạn đi tới, phần phía dưới trục là đoạn đi lùi. Độ dời là hiệu «tới trừ lùi», quãng đường là tổng «tới cộng lùi» mà đồng hồ cây số thực sự đếm.`, R`A car drives with velocity $v(t)=v_{\max}-t^2$: at first it goes forward, the velocity decreases, then a negative velocity means the car reverses. The area above the axis is the forward stretch, the area below is the backward stretch. The displacement is «forward minus backward», the distance is «forward plus backward» that the odometer really counts.`)}
      read={tt(`$v(t)=${fmt(vmax)}-t^2$ trong $[0;\\ ${fmt(T)}]$. ${r.turns.length ? `Xe đổi chiều tại $t=${fmt(r.turns[0] as number, 3)}$ s.` : "Xe không đổi chiều."} Độ dời $\\int v\\,dt=${fmt(r.displacement, 4)}$ m. Quãng đường $\\int|v|\\,dt=${fmt(r.distance, 4)}$ m.`, `$v(t)=${fmt(vmax)}-t^2$ on $[0;\\ ${fmt(T)}]$. ${r.turns.length ? `The car turns at $t=${fmt(r.turns[0] as number, 3)}$ s.` : "The car does not turn."} Displacement $\\int v\\,dt=${fmt(r.displacement, 4)}$ m. Distance $\\int|v|\\,dt=${fmt(r.distance, 4)}$ m.`)}
      why={tt(R`Vận tốc là đạo hàm của vị trí nên $\int_0^T v\,dt=s(T)-s(0)$ là độ dời (hiệu vị trí). Quãng đường thì phải tính riêng chiều đi và chiều lùi rồi cộng các độ lớn, tức $\int|v|\,dt$: ta tách tích phân tại các chỗ $v$ đổi dấu.`, R`Velocity is the derivative of position, so $\int_0^T v\,dt=s(T)-s(0)$ is the displacement (difference of positions). The distance, on the other hand, counts the forward and backward parts separately and adds their sizes, i.e. $\int|v|\,dt$: we split the integral where $v$ changes sign.`)}
    >
      <Graph
        label={tt("Vận tốc theo thời gian, phần đi tới và phần đi lùi", "Velocity against time, forward and backward parts")}
        draw={(ctx, w, h) => {
          const { colors, map, pad } = frame(ctx, w, h, 0, 4.5, -9, 9, "t (s)", "v");
          shade(ctx, map, v, 0, T, colors.curve, colors.alt);
          strokeFn(ctx, map, w, h, pad, 0, 4.5, v, colors.curve, 2.4);
          dashed(ctx, map.x(T), map.y(-9), map.x(T), map.y(9), colors.soft);
          label(ctx, tt("đi tới (+)", "forward (+)"), map.x(0.2), map.y(Math.max(1, vmax * 0.5)), colors.curve);
          label(ctx, tt("đi lùi (−)", "backward (−)"), map.x(Math.max(2.3, Math.sqrt(vmax) + 0.3)), map.y(-1.5), colors.alt);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Vận tốc ban đầu v", "Initial velocity v")} value={vmax} min={1} max={8} step={0.5} onChange={setVmax} />
        <Slider label={tt("Thời gian T (s)", "Time T (s)")} value={T} min={0.5} max={4.5} step={0.1} onChange={setT} />
      </div>
    </Stage>
  );
}

/* ---------- 4. Diện tích giữa hai đồ thị ---------- */

const PAIRS: { name: string; f: Fn; g: Fn; a: number; b: number; y0: number; y1: number; exact: number; tex: string }[] = [
  { name: "y = x và y = x²", f: (x) => x, g: (x) => x * x, a: -0.3, b: 1.3, y0: -0.5, y1: 1.8, exact: 1 / 6, tex: "\\frac{1}{6}" },
  { name: "y = 4 − x² và y = x + 2", f: (x) => 4 - x * x, g: (x) => x + 2, a: -3, b: 2.3, y0: -6, y1: 6, exact: 4.5, tex: "\\frac{9}{2}" },
  { name: "y = sin x và y = cos x", f: Math.sin, g: Math.cos, a: 0, b: 6, y0: -1.5, y1: 1.5, exact: 2 * Math.SQRT2, tex: "2\\sqrt{2}" },
];

export function AreaBetweenLab() {
  const tt = useTx();
  const [pick, setPick] = useState(1);
  const [lo, setLo] = useState(0);
  const s = at(PAIRS, pick);
  const a = Math.max(s.a, Math.min(s.b - 0.3, s.a + (s.b - s.a) * lo));
  const r = areaBetween(s.f, s.g, a, s.b);
  const full = areaBetween(s.f, s.g, s.a, s.b);
  const inner = full.cuts.slice(1, -1);
  const closed = inner.length >= 2 ? areaBetween(s.f, s.g, inner[0] as number, inner[inner.length - 1] as number).area : NaN;
  return (
    <Stage
      title={tt(R`Diện tích giữa hai đường cong`, R`Area between two curves`)}
      story={tt(R`Hai đường cong vây quanh một miền. Cắt miền thành những dải đứng mỏng: mỗi dải cao bằng khoảng cách giữa hai đường tại chỗ đó, tức độ lớn của hiệu hai hàm. Khi hai đường đổi vị trí trên dưới thì hiệu đổi dấu, nên máy tìm các giao điểm trước, chia thành từng đoạn rồi mới cộng.`, R`Two curves enclose a region. Cut the region into thin vertical strips: each strip is as tall as the distance between the two curves there, i.e. the size of the difference of the two functions. When the curves swap places the difference changes sign, so the machine first finds the intersections, splits into pieces and only then adds.`)}
      read={tt(`Máy tìm được các giao điểm: ${inner.map((c) => fmt(c, 3)).join("; ")}. Miền kín nằm giữa giao điểm đầu và cuối, diện tích $${fmt(closed, 5)}$; đáp số đúng $${s.tex}=${fmt(s.exact, 5)}$. Phần bạn đang tô, từ $x=${fmt(a, 2)}$ đến $x=${fmt(s.b, 2)}$, có diện tích $${fmt(r.area, 5)}$${r.area > closed + 1e-6 ? ", lớn hơn vì đã lấn ra ngoài miền kín (phần đó không được hai đường vây lại)" : ""}.`, `The machine finds the intersections: ${inner.map((c) => fmt(c, 3)).join("; ")}. The enclosed region lies between the first and last intersection, area $${fmt(closed, 5)}$; the exact answer $${s.tex}=${fmt(s.exact, 5)}$. The part you are shading, from $x=${fmt(a, 2)}$ to $x=${fmt(s.b, 2)}$, has area $${fmt(r.area, 5)}$${r.area > closed + 1e-6 ? ", larger because it reaches outside the enclosed region (that part is not fenced in by the two curves)" : ""}.`)}
      why={tt(R`Diện tích là $\int_a^b|f-g|\,dx$. Dấu giá trị tuyệt đối không lấy tích phân trực tiếp được, nên ta tách tại các nghiệm của $f=g$: trên mỗi đoạn đã biết hàm nào nằm trên, nên bỏ được dấu tuyệt đối. Nếu quên tách, phần trên và phần dưới sẽ trừ nhau và diện tích bị tính thiếu.`, R`The area is $\int_a^b|f-g|\,dx$. The absolute value cannot be integrated directly, so split at the solutions of $f=g$; on each piece we know which function is on top and can drop the absolute value. If you forget to split, the parts above and below cancel and the area comes out too small.`)}
    >
      <Graph
        label={tt("Miền giữa hai đồ thị", "The region between two graphs")}
        draw={(ctx, w, h) => {
          const { colors, map, pad } = frame(ctx, w, h, s.a, s.b, s.y0, s.y1);
          const steps = 360;
          const dx = (s.b - a) / steps;
          ctx.fillStyle = colors.alt;
          ctx.globalAlpha = 0.28;
          for (let i = 0; i < steps; i++) {
            const xm = a + (i + 0.5) * dx;
            const y1 = map.y(s.f(xm));
            const y2 = map.y(s.g(xm));
            ctx.fillRect(map.x(a + i * dx), Math.min(y1, y2), map.x(a + (i + 1) * dx) - map.x(a + i * dx) + 0.6, Math.abs(y1 - y2));
          }
          ctx.globalAlpha = 1;
          strokeFn(ctx, map, w, h, pad, s.a, s.b, s.f, colors.curve, 2.4);
          strokeFn(ctx, map, w, h, pad, s.a, s.b, s.g, colors.ink, 2.4);
          for (const c of r.cuts.slice(1, -1)) dot(ctx, map.x(c), map.y(s.f(c)), colors.alt, colors.bg, 5);
          dashed(ctx, map.x(a), map.y(s.y0), map.x(a), map.y(s.y1), colors.soft);
        }}
      />
      <div className="fz-controls">
        <label className="fz-pick">{tt("Cặp đường cong", "Pair of curves")}
          <select value={pick} onChange={(e) => { setPick(Number(e.target.value)); setLo(0); }}>{PAIRS.map((p, i) => <option key={p.name} value={i}>{tt(p.name, en(p.name))}</option>)}</select>
        </label>
        <Slider label={tt("Bắt đầu tính từ (0 = mép trái)", "Start counting from (0 = left edge)")} value={lo} min={0} max={0.9} step={0.02} onChange={setLo} />
      </div>
    </Stage>
  );
}

/* ---------- 5. Khối tròn xoay: chồng đĩa ---------- */

const SOLIDS: { name: string; f: Fn; a: number; b: number; exact: number; tex: string }[] = [
  { name: "hình nón: y = x, 0 ≤ x ≤ 3", f: (x) => x, a: 0, b: 3, exact: 9 * Math.PI, tex: "\\frac{1}{3}\\pi r^2h=\\frac{1}{3}\\pi\\cdot 9\\cdot 3=9\\pi" },
  { name: "hình cầu: y = √(4 − x²)", f: (x) => Math.sqrt(Math.max(0, 4 - x * x)), a: -2, b: 2, exact: (32 / 3) * Math.PI, tex: "\\frac{4}{3}\\pi R^3=\\frac{32}{3}\\pi" },
  { name: "parabol xoay: y = √x, 0 ≤ x ≤ 4", f: Math.sqrt, a: 0, b: 4, exact: 8 * Math.PI, tex: "\\pi\\int_0^4 x\\,dx=8\\pi" },
];

export function VolumeLab() {
  const tt = useTx();
  const [pick, setPick] = useState(1);
  const [n, setN] = useState(6);
  const s = at(SOLIDS, pick);
  const v = diskVolume(s.f, s.a, s.b, n);
  const dx = (s.b - s.a) / n;
  return (
    <Stage
      title={tt(R`Khối tròn xoay: xếp chồng những chiếc đĩa mỏng`, R`Solids of revolution: stacking thin discs`)}
      story={tt(R`Quay một đường cong quanh trục ngang, ta được một khối tròn như chiếc bình tiện bằng máy. Cắt khối thành những lát mỏng vuông góc với trục: mỗi lát gần như một chiếc đĩa tròn, bán kính bằng độ cao của đường cong tại chỗ cắt. Thể tích một đĩa là diện tích mặt tròn nhân bề dày. Cộng mọi đĩa lại, càng nhiều đĩa mỏng thì càng sát. Hình dưới là hình cắt dọc: mỗi cột là một đĩa nhìn nghiêng.`, R`Rotate a curve around the horizontal axis and you get a round solid, like a vase turned on a lathe. Cut the solid into thin slices perpendicular to the axis: each slice is nearly a round disc whose radius is the height of the curve at the cut. A disc's volume is the area of its face times its thickness. Add up all the discs: the thinner and more numerous they are, the closer the sum. The picture is a vertical section: each column is a disc seen from the side.`)}
      read={tt(`${n} đĩa dày $${fmt(dx, 3)}$ cho thể tích $\\sum\\pi f(x_i)^2\\Delta x=${fmt(v, 4)}$. Công thức hình học $${s.tex}$ cho $${fmt(s.exact, 4)}$. Sai lệch $${fmt(Math.abs(v - s.exact), 4)}$.`, `${n} discs of thickness $${fmt(dx, 3)}$ give the volume $\\sum\\pi f(x_i)^2\\Delta x=${fmt(v, 4)}$. The geometric formula $${s.tex}$ gives $${fmt(s.exact, 4)}$. Error $${fmt(Math.abs(v - s.exact), 4)}$.`)}
      why={tt(R`Một đĩa bán kính $r=f(x)$ có thể tích $\pi r^2\,dx$. Khi số đĩa tăng vô hạn, tổng các đĩa tiến về $V=\pi\int_a^b[f(x)]^2dx$. Hãy chọn hình cầu và thấy kết quả khớp công thức $\frac{4}{3}\pi R^3$: công thức ấy được suy ra từ chồng đĩa chứ không phải thứ để học thuộc.`, R`A disc of radius $r=f(x)$ has volume $\pi r^2\,dx$. As the number of discs tends to infinity the sum tends to $V=\pi\int_a^b[f(x)]^2dx$. Choose the sphere and see the result match the formula $\frac{4}{3}\pi R^3$: the formula is derived from a stack of discs, not something to memorise.`)}
    >
      <Graph
        label={tt("Hình cắt dọc khối tròn xoay và các đĩa", "Vertical section of the solid of revolution and the discs")}
        draw={(ctx, w, h) => {
          const rMax = Math.max(...Array.from({ length: 101 }, (_, i) => s.f(s.a + ((s.b - s.a) * i) / 100)));
          const { colors, map, pad } = frame(ctx, w, h, s.a - 0.3, s.b + 0.3, -rMax * 1.25, rMax * 1.25, "x", "y", true);
          for (let i = 0; i < n; i++) {
            const xm = s.a + (i + 0.5) * dx;
            const r = s.f(xm);
            ctx.fillStyle = colors.curve;
            ctx.globalAlpha = 0.25;
            ctx.fillRect(map.x(s.a + i * dx), map.y(r), map.x(s.a + (i + 1) * dx) - map.x(s.a + i * dx) - 1, map.y(-r) - map.y(r));
            ctx.globalAlpha = 1;
            ctx.strokeStyle = colors.curve;
            ctx.lineWidth = 1;
            ctx.strokeRect(map.x(s.a + i * dx), map.y(r), map.x(s.a + (i + 1) * dx) - map.x(s.a + i * dx) - 1, map.y(-r) - map.y(r));
          }
          strokeFn(ctx, map, w, h, pad, s.a, s.b, s.f, colors.alt, 2.6);
          strokeFn(ctx, map, w, h, pad, s.a, s.b, (t) => -s.f(t), colors.alt, 2.6);
        }}
      />
      <div className="fz-controls">
        <label className="fz-pick">{tt("Khối", "Solid")}
          <select value={pick} onChange={(e) => setPick(Number(e.target.value))}>{SOLIDS.map((o, i) => <option key={o.name} value={i}>{tt(o.name, en(o.name))}</option>)}</select>
        </label>
        <Slider label={tt("Số đĩa", "Number of discs")} value={n} min={1} max={60} step={1} onChange={setN} />
      </div>
    </Stage>
  );
}

/* ---------- 6. Đổi biến: cùng diện tích, hai hình dạng ---------- */

const SUBS: { name: string; itex: string; f: Fn; u: Fn; du: Fn; ftex: string; utex: string; Ftex: (b: number) => string; closed: (b: number) => number }[] = [
  { name: "∫ 2x·cos(x²) dx", itex: "2x\\cos(x^2)", f: Math.cos, u: (x) => x * x, du: (x) => 2 * x, ftex: "\\cos u", utex: "x^2", Ftex: (b) => `\\sin(${fmt(b * b, 3)})`, closed: (b) => Math.sin(b * b) },
  { name: "∫ 2x·e^(x²) dx", itex: "2x\\,e^{x^2}", f: Math.exp, u: (x) => x * x, du: (x) => 2 * x, ftex: "e^u", utex: "x^2", Ftex: (b) => `e^{${fmt(b * b, 3)}}-1`, closed: (b) => Math.exp(b * b) - 1 },
  { name: "∫ 2x/(x²+1) dx", itex: "\\frac{2x}{x^2+1}", f: (t) => 1 / t, u: (x) => x * x + 1, du: (x) => 2 * x, ftex: "\\frac{1}{u}", utex: "x^2+1", Ftex: (b) => `\\ln(${fmt(b * b + 1, 3)})`, closed: (b) => Math.log(b * b + 1) },
];

export function SubstitutionLab() {
  const tt = useTx();
  const [pick, setPick] = useState(0);
  const [b, setB] = useState(1.2);
  const s = at(SUBS, pick);
  const both = substitutionBoth(s.f, s.u, s.du, 0, b);
  const gx: Fn = (x) => s.f(s.u(x)) * s.du(x);
  const ub = s.u(b);
  const u0 = s.u(0);
  const maxG = Math.max(1, ...Array.from({ length: 80 }, (_, i) => Math.abs(gx((b * (i + 1)) / 80))));
  const maxF = Math.max(1, ...Array.from({ length: 80 }, (_, i) => Math.abs(s.f(u0 + ((ub - u0) * (i + 1)) / 80))));
  return (
    <Stage
      title={tt(R`Đổi biến: kéo giãn trục, diện tích không đổi`, R`Substitution: stretch the axis, the area stays the same`)}
      story={tt(R`Hai hình dưới có dáng khác nhau nhưng diện tích bằng nhau. Hình trái là đồ thị theo biến $x$ với dải rộng $dx$ đều nhau. Đặt $u=u(x)$ thì trục ngang bị kéo giãn: chỗ nào $u$ đổi nhanh thì dải bị dãn rộng, và cao độ co lại đúng bằng hệ số đó. Hình phải là đồ thị theo $u$. Kéo $x$ thành $u$ làm dải rộng gấp $u'$ lần và cao chỉ còn $\frac{1}{u'}$: tích không đổi.`, R`The two pictures below have different shapes but the same area. The left is the graph in the variable $x$ with strips of equal width $dx$. Setting $u=u(x)$ stretches the horizontal axis: where $u$ changes quickly the strips are stretched wider, and the heights shrink by exactly that factor. The right is the graph in $u$. Turning $x$ into $u$ makes a strip $u'$ times wider and only $\frac{1}{u'}$ as tall: the product is unchanged.`)}
      read={tt(`$\\int_0^{${fmt(b)}} ${s.itex}\\,dx=${fmt(both.inX, 6)}$ (theo $x$). Đặt $u=${s.utex}$ thì thành $\\int_{${fmt(u0, 2)}}^{${fmt(ub, 3)}} ${s.ftex}\\,du=${fmt(both.inU, 6)}$ (theo $u$, cận đổi theo). Công thức $${s.Ftex(b)}=${fmt(s.closed(b), 6)}$.`, `$\\int_0^{${fmt(b)}} ${s.itex}\\,dx=${fmt(both.inX, 6)}$ (in $x$). Setting $u=${s.utex}$ it becomes $\\int_{${fmt(u0, 2)}}^{${fmt(ub, 3)}} ${s.ftex}\\,du=${fmt(both.inU, 6)}$ (in $u$, with the limits changed). The formula $${s.Ftex(b)}=${fmt(s.closed(b), 6)}$.`)}
      why={tt(R`Quy tắc hàm hợp cho $\frac{d}{dx}F(u(x))=f(u(x))\,u'(x)$, nên $F(u(x))$ là nguyên hàm của vế trái, và theo định lí cơ bản $\int_a^b f(u(x))u'(x)dx=F(u(b))-F(u(a))$, chính là $\int_{u(a)}^{u(b)}f(u)du$. Nhớ đổi cả hai cận khi đổi biến.`, R`The chain rule gives $\frac{d}{dx}F(u(x))=f(u(x))\,u'(x)$, so $F(u(x))$ is an antiderivative of the left side, and by the fundamental theorem $\int_a^b f(u(x))u'(x)dx=F(u(b))-F(u(a))$, which is $\int_{u(a)}^{u(b)}f(u)du$. Remember to change the limits as well when you change the variable.`)}
    >
      <div className="fz-pair">
        <Graph
          label={tt("Đồ thị theo biến x", "Graph in the variable x")}
          draw={(ctx, w, h) => {
            const { colors, map, pad } = frame(ctx, w, h, 0, b + 0.2, -maxG * 0.3, maxG * 1.15, "x", "");
            shade(ctx, map, gx, 0, b, colors.curve, colors.alt);
            strokeFn(ctx, map, w, h, pad, 0, b + 0.2, gx, colors.curve, 2.4);
            label(ctx, tt("theo x", "in x"), map.x(0) + 8, map.y(maxG * 1.05), colors.curve);
          }}
        />
        <Graph
          label={tt("Đồ thị theo biến u", "Graph in the variable u")}
          draw={(ctx, w, h) => {
            const { colors, map, pad } = frame(ctx, w, h, u0 - 0.05, ub + 0.2, -maxF * 0.3, maxF * 1.15, "u", "");
            shade(ctx, map, s.f, u0, ub, colors.alt, colors.curve);
            strokeFn(ctx, map, w, h, pad, u0 + 1e-6, ub + 0.2, s.f, colors.alt, 2.4);
            label(ctx, tt("theo u", "in u"), map.x(u0) + 8, map.y(maxF * 1.05), colors.alt);
          }}
        />
      </div>
      <div className="fz-controls">
        <label className="fz-pick">{tt("Tích phân", "Integral")}
          <select value={pick} onChange={(e) => setPick(Number(e.target.value))}>{SUBS.map((o, i) => <option key={o.name} value={i}>{tt(o.name, en(o.name))}</option>)}</select>
        </label>
        <Slider label={tt("Cận trên b", "Upper limit b")} value={b} min={0.3} max={1.6} step={0.05} onChange={setB} />
      </div>
    </Stage>
  );
}

/* ---------- 7. Từng phần: hai diện tích lấp đầy hình chữ nhật ---------- */

const PARTS: { name: string; u: Fn; v: Fn; du: Fn; dv: Fn; a: number; bMax: number; tex: string }[] = [
  { name: "∫ x·eˣ dx   (u = x, dv = eˣdx)", u: (x) => x, v: Math.exp, du: () => 1, dv: Math.exp, a: 0, bMax: 2, tex: "x e^x" },
  { name: "∫ x·cos x dx   (u = x, dv = cos x dx)", u: (x) => x, v: Math.sin, du: () => 1, dv: Math.cos, a: 0, bMax: 1.5, tex: "x\\cos x" },
  { name: "∫ ln x dx   (u = ln x, dv = dx)", u: Math.log, v: (x) => x, du: (x) => 1 / x, dv: () => 1, a: 1, bMax: 4, tex: "\\ln x" },
];

export function PartsLab() {
  const tt = useTx();
  const [pick, setPick] = useState(0);
  const [t, setT] = useState(0.8);
  const s = at(PARTS, pick);
  const b = s.a + (s.bMax - s.a) * t;
  const r = partsBoth(s.u, s.v, s.du, s.dv, s.a, b);
  const A1 = simpson((x) => s.u(x) * s.dv(x), s.a, b);
  const A2 = simpson((x) => s.v(x) * s.du(x), s.a, b);
  const v0 = s.v(s.a);
  const u0 = s.u(s.a);
  const v1 = s.v(b);
  const u1 = s.u(b);
  return (
    <Stage
      title={tt(R`Tích phân từng phần: hai mảnh ghép thành hình chữ nhật`, R`Integration by parts: two pieces fit into a rectangle`)}
      story={tt(R`Vẽ điểm có tọa độ $(v;u)$ khi $x$ chạy từ cận dưới đến cận trên: ta được một đường cong. Phần diện tích nằm dưới đường cong là $\int u\,dv$ (cam). Phần diện tích nằm bên trái đường cong là $\int v\,du$ (xanh). Hai phần ghép lại vừa khít hình chữ nhật cạnh $v$ và $u$. Đó là công thức từng phần, vẽ thành hình.`, R`Plot the point with coordinates $(v;u)$ as $x$ runs from the lower to the upper limit: you get a curve. The area under the curve is $\int u\,dv$ (orange). The area to the left of the curve is $\int v\,du$ (green). The two pieces together fit exactly into the rectangle with sides $v$ and $u$. That is the integration by parts formula, drawn.`)}
      read={tt(`$\\int ${s.tex}\\,dx$ từ $${fmt(s.a)}$ đến $${fmt(b, 2)}$: vế trái $\\int u\\,dv=${fmt(r.left, 5)}$. Vế phải $[uv]-\\int v\\,du=${fmt(u1 * v1 - u0 * v0, 4)}-${fmt(A2, 4)}=${fmt(r.right, 5)}$. Diện tích cam $${fmt(A1, 4)}$ + xanh $${fmt(A2, 4)}$ $=${fmt(A1 + A2, 4)}$ $=u_1v_1-u_0v_0=${fmt(u1 * v1 - u0 * v0, 4)}$.`, `$\\int ${s.tex}\\,dx$ from $${fmt(s.a)}$ to $${fmt(b, 2)}$: left side $\\int u\\,dv=${fmt(r.left, 5)}$. Right side $[uv]-\\int v\\,du=${fmt(u1 * v1 - u0 * v0, 4)}-${fmt(A2, 4)}=${fmt(r.right, 5)}$. Orange area $${fmt(A1, 4)}$ + green $${fmt(A2, 4)}$ $=${fmt(A1 + A2, 4)}$ $=u_1v_1-u_0v_0=${fmt(u1 * v1 - u0 * v0, 4)}$.`)}
      why={tt(R`Quy tắc đạo hàm của tích: $(uv)'=u'v+uv'$. Lấy tích phân hai vế từ $a$ đến $b$: $[uv]_a^b=\int v\,du+\int u\,dv$. Chuyển vế được $\int u\,dv=[uv]-\int v\,du$. Nên chọn $u$ là phần trở nên đơn giản hơn khi lấy đạo hàm (như $x$ hay $\ln x$) để $\int v\,du$ dễ tính hơn.`, R`The product rule: $(uv)'=u'v+uv'$. Integrate both sides from $a$ to $b$: $[uv]_a^b=\int v\,du+\int u\,dv$. Rearranging gives $\int u\,dv=[uv]-\int v\,du$. It is best to choose $u$ as the part that becomes simpler when differentiated (like $x$ or $\ln x$), so that $\int v\,du$ is easier to compute.`)}
    >
      <Graph
        label={tt("Đường cong (v; u) và hai miền diện tích", "The curve (v; u) and the two area regions")}
        draw={(ctx, w, h) => {
          const vMax = Math.max(v1, v0) * 1.12;
          const uMax = Math.max(u1, u0) * 1.12;
          const { colors, map } = frame(ctx, w, h, -vMax * 0.06, vMax, -uMax * 0.08, uMax, "v", "u");
          const pts: { x: number; y: number }[] = [];
          for (let i = 0; i <= 200; i++) { const x = s.a + ((b - s.a) * i) / 200; pts.push({ x: s.v(x), y: s.u(x) }); }
          ctx.globalAlpha = 0.3;
          ctx.fillStyle = colors.alt;
          ctx.beginPath();
          ctx.moveTo(map.x(v0), map.y(0));
          for (const p of pts) ctx.lineTo(map.x(p.x), map.y(p.y));
          ctx.lineTo(map.x(v1), map.y(0));
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = colors.curve;
          ctx.beginPath();
          ctx.moveTo(map.x(0), map.y(u0));
          for (const p of pts) ctx.lineTo(map.x(p.x), map.y(p.y));
          ctx.lineTo(map.x(0), map.y(u1));
          ctx.closePath();
          ctx.fill();
          ctx.globalAlpha = 1;
          ctx.beginPath();
          ctx.strokeStyle = colors.ink;
          ctx.lineWidth = 2.4;
          pts.forEach((p, i) => (i === 0 ? ctx.moveTo(map.x(p.x), map.y(p.y)) : ctx.lineTo(map.x(p.x), map.y(p.y))));
          ctx.stroke();
          ctx.strokeStyle = colors.soft;
          ctx.lineWidth = 1.2;
          ctx.strokeRect(map.x(0), map.y(u1), map.x(v1) - map.x(0), map.y(0) - map.y(u1));
          label(ctx, "∫ u dv", map.x(v1) - 52, map.y(u1 * 0.3), colors.alt);
          label(ctx, "∫ v du", map.x(v1 * 0.08), map.y(u1 * 0.8), colors.curve);
        }}
      />
      <div className="fz-controls">
        <label className="fz-pick">{tt("Tích phân", "Integral")}
          <select value={pick} onChange={(e) => { setPick(Number(e.target.value)); setT(0.8); }}>{PARTS.map((p, i) => <option key={p.name} value={i}>{tt(p.name, en(p.name))}</option>)}</select>
        </label>
        <Slider label={tt("Cận trên", "Upper limit")} value={t} min={0.15} max={1} step={0.01} onChange={setT} />
      </div>
    </Stage>
  );
}

/* ---------- 8. Ném phi tiêu đo diện tích dưới đường cong ---------- */

const MC: { name: string; f: Fn; a: number; b: number; top: number; exact: number; tex: string }[] = [
  { name: "y = x²  (0 → 2)", f: (x) => x * x, a: 0, b: 2, top: 4, exact: 8 / 3, tex: "\\frac{8}{3}" },
  { name: "y = sin x  (0 → π)", f: Math.sin, a: 0, b: Math.PI, top: 1, exact: 2, tex: "2" },
  { name: "y = √x  (0 → 4)", f: Math.sqrt, a: 0, b: 4, top: 2, exact: 16 / 3, tex: "\\frac{16}{3}" },
];

export function MonteCarloAreaLab() {
  const tt = useTx();
  const [pick, setPick] = useState(0);
  const [running, setRunning] = useState(false);
  const [rng, setRng] = useState(() => mulberry32(77));
  const [state, setState] = useState<{ dots: { x: number; y: number; hit: boolean }[]; hits: number; total: number }>({ dots: [], hits: 0, total: 0 });
  const s = at(MC, pick);
  useTicker(running, 60, () => {
    const dots = state.dots.slice();
    let hits = state.hits;
    for (let i = 0; i < 40; i++) {
      const x = s.a + rng() * (s.b - s.a);
      const y = rng() * s.top;
      const hit = y <= s.f(x);
      if (hit) hits += 1;
      if (dots.length < 1500) dots.push({ x, y, hit });
    }
    setState({ dots, hits, total: state.total + 40 });
  });
  const est = state.total === 0 ? 0 : (state.hits / state.total) * (s.b - s.a) * s.top;
  const sure = useMemo(() => monteCarloArea(s.f, s.a, s.b, s.top, 200000, mulberry32(3)).area, [s]);
  return (
    <Stage
      title={tt(R`Đo diện tích bằng phi tiêu: không cần nguyên hàm`, R`Measuring area with darts: no antiderivative needed`)}
      story={tt(R`Vẽ hình chữ nhật bao quanh miền dưới đường cong rồi ném phi tiêu rải đều. Tỉ lệ phi tiêu rơi vào dưới đường cong bằng tỉ lệ diện tích. Phương pháp này không cần biết nguyên hàm, nên máy tính dùng nó cho những tích phân không có công thức, và nó đặc biệt hữu ích khi có hàng trăm biến.`, R`Draw a rectangle around the region under the curve and throw darts evenly. The share of darts landing under the curve equals the share of area. This method needs no antiderivative, so computers use it for integrals with no formula, and it is especially useful with hundreds of variables.`)}
      read={tt(`Đã ném ${state.total} phi tiêu, ${state.hits} trúng. Ước lượng diện tích $${fmt(est, 4)}$. Đáp số đúng $${s.tex}=${fmt(s.exact, 4)}$. Chạy nhanh 200000 phi tiêu cho $${fmt(sure, 4)}$.`, `Threw ${state.total} darts, ${state.hits} hit. Estimated area $${fmt(est, 4)}$. Exact answer $${s.tex}=${fmt(s.exact, 4)}$. A quick run of 200000 darts gives $${fmt(sure, 4)}$.`)}
      why={tt(R`Sai số giảm như $\frac{1}{\sqrt{N}}$: muốn chính xác gấp 10 lần phải ném nhiều gấp 100 lần. Cách này chậm hơn nhiều so với tổng Riemann cho một biến, nhưng sai số không phụ thuộc số biến, nên Monte Carlo có lợi khi số biến lớn.`, R`The error shrinks like $\frac{1}{\sqrt{N}}$: to be 10 times more accurate you must throw 100 times as many darts. It is much slower than Riemann sums in one variable, but this error does not depend on the number of variables, so Monte Carlo has the advantage when there are many.`)}
    >
      <Graph
        label={tt("Phi tiêu rơi dưới và trên đường cong", "Darts landing below and above the curve")}
        draw={(ctx, w, h) => {
          const { colors, map, pad } = frame(ctx, w, h, s.a - 0.1, s.b + 0.1, -s.top * 0.08, s.top * 1.1);
          for (const d of state.dots) {
            ctx.fillStyle = d.hit ? colors.alt : colors.curve;
            ctx.fillRect(map.x(d.x) - 1, map.y(d.y) - 1, 2.5, 2.5);
          }
          strokeFn(ctx, map, w, h, pad, s.a, s.b, s.f, colors.ink, 2.4);
        }}
      />
      <div className="fz-controls">
        <label className="fz-pick">{tt("Đường cong", "Curve")}
          <select value={pick} onChange={(e) => { setRunning(false); setState({ dots: [], hits: 0, total: 0 }); setPick(Number(e.target.value)); }}>{MC.map((m, i) => <option key={m.name} value={i}>{tt(m.name, en(m.name))}</option>)}</select>
        </label>
      </div>
      <Buttons>
        <button type="button" className="text-btn" onClick={() => setRunning(!running)}>{running ? tt("Dừng", "Stop") : tt("Ném phi tiêu", "Throw darts")}</button>
        <button type="button" className="text-btn" onClick={() => { setRunning(false); setState({ dots: [], hits: 0, total: 0 }); setRng(() => mulberry32(freshSeed())); }}>{tt("Xóa", "Clear")}</button>
      </Buttons>
    </Stage>
  );
}

