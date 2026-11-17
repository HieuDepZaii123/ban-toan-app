import { useMemo, useState } from "react";
import { boxVolume, chainBackprop, criticalPoints, diff, eulerMotion, findRoots, hasDerivativeAt, oneSided, tangentsThrough, type Fn } from "../../algo/index.ts";
import { dashed, dot, strokeFn } from "../../labs/draw.ts";
import { Graph } from "../../labs/Graph.tsx";
import { fmt } from "../../lib/format.ts";
import { Slider } from "../../ui/Slider.tsx";
import { at, frame, label, line } from "./kit.ts";
import { Buttons, Stage } from "./widgets.tsx";

const R = String.raw;

/* ---------- 1. Đạo hàm là một hàm mới: đo độ dốc ở mọi nơi ---------- */

const CATALOG: { name: string; tex: string; f: Fn; df: Fn; x0: number; x1: number; y0: number; y1: number; dtex: string }[] = [
  { name: "x²", tex: "x^2", f: (x) => x * x, df: (x) => 2 * x, x0: -3, x1: 3, y0: -6, y1: 9, dtex: "2x" },
  { name: "x³", tex: "x^3", f: (x) => x ** 3, df: (x) => 3 * x * x, x0: -2.2, x1: 2.2, y0: -8, y1: 12, dtex: "3x^2" },
  { name: "√x", tex: "\\sqrt{x}", f: Math.sqrt, df: (x) => 1 / (2 * Math.sqrt(x)), x0: 0.05, x1: 5, y0: -1, y1: 4, dtex: "\\frac{1}{2\\sqrt{x}}" },
  { name: "1/x", tex: "\\frac{1}{x}", f: (x) => 1 / x, df: (x) => -1 / (x * x), x0: 0.35, x1: 5, y0: -5, y1: 5, dtex: "-\\frac{1}{x^2}" },
  { name: "sin x", tex: "\\sin x", f: Math.sin, df: Math.cos, x0: -6.3, x1: 6.3, y0: -1.6, y1: 1.6, dtex: "\\cos x" },
  { name: "e^x", tex: "e^x", f: Math.exp, df: Math.exp, x0: -3, x1: 2.2, y0: -1, y1: 9, dtex: "e^x" },
  { name: "ln x", tex: "\\ln x", f: Math.log, df: (x) => 1 / x, x0: 0.2, x1: 6, y0: -2, y1: 3, dtex: "\\frac{1}{x}" },
];

export function DerivCurveLab() {
  const [pick, setPick] = useState(0);
  const [u, setU] = useState(0.5);
  const spec = at(CATALOG, pick);
  const x = spec.x0 + (spec.x1 - spec.x0) * u;
  const slope = diff(spec.f, x);
  let worst = 0;
  for (let i = 0; i <= 400; i++) {
    const xi = spec.x0 + 0.02 * (spec.x1 - spec.x0) + (0.96 * (spec.x1 - spec.x0) * i) / 400;
    worst = Math.max(worst, Math.abs(diff(spec.f, xi) - spec.df(xi)) / (1 + Math.abs(spec.df(xi))));
  }
  return (
    <Stage
      title="Đạo hàm là một hàm mới: đo độ dốc ở mọi nơi rồi vẽ lại"
      story={R`Đi dọc đồ thị từ trái sang phải, ở mỗi chỗ ghi lại độ dốc của đường cong rồi chấm con số đó lên một đồ thị mới. Đường cam là đồ thị mới ấy, do máy đo bằng cát tuyến thật nhỏ. Đường xám đậm nét đứt là công thức trong bảng đạo hàm. Hai đường trùng nhau: bảng đạo hàm không phải thứ để thuộc lòng, nó là kết quả của phép đo độ dốc.`}
      read={`Tại $x=${fmt(x, 3)}$: độ dốc máy đo $${fmt(slope, 4)}$, công thức $(${spec.tex})'=${spec.dtex}$ cho $${fmt(spec.df(x), 4)}$. Độ lệch tương đối lớn nhất trên cả đoạn: $${fmt(worst, 10)}$.`}
      why={R`Khi đường cong đi lên thì đường cam nằm trên trục hoành, khi đường cong đi xuống thì đường cam nằm dưới, và ở chỗ đường cong quay đầu thì đường cam cắt trục. Đó là lý do «đạo hàm dương thì hàm tăng» và «cực trị tại nơi đạo hàm bằng 0».`}
    >
      <Graph
        label="Đồ thị hàm số, tiếp tuyến và đồ thị đạo hàm"
        draw={(ctx, w, h) => {
          const { colors, map, pad } = frame(ctx, w, h, spec.x0, spec.x1, spec.y0, spec.y1);
          strokeFn(ctx, map, w, h, pad, spec.x0, spec.x1, spec.df, colors.soft, 5);
          strokeFn(ctx, map, w, h, pad, spec.x0, spec.x1, (t) => diff(spec.f, t), colors.alt, 2.2);
          strokeFn(ctx, map, w, h, pad, spec.x0, spec.x1, spec.f, colors.curve, 2.6);
          const ext = (spec.x1 - spec.x0) * 0.12;
          dashed(ctx, map.x(x - ext), map.y(spec.f(x) - ext * slope), map.x(x + ext), map.y(spec.f(x) + ext * slope), colors.curve);
          dot(ctx, map.x(x), map.y(spec.f(x)), colors.curve, colors.bg, 6);
          dot(ctx, map.x(x), map.y(slope), colors.alt, colors.bg, 6);
          dashed(ctx, map.x(x), map.y(spec.f(x)), map.x(x), map.y(slope), colors.soft);
          label(ctx, "f", map.x(spec.x1) - 14, map.y(spec.f(spec.x1 - 0.01)) - 6, colors.curve);
          label(ctx, "f′", map.x(spec.x1) - 18, map.y(spec.df(spec.x1 - 0.01)) + 14, colors.alt);
        }}
      />
      <div className="fz-controls">
        <label className="fz-pick">Hàm
          <select value={pick} onChange={(e) => setPick(Number(e.target.value))}>{CATALOG.map((c, i) => <option key={c.name} value={i}>{c.name}</option>)}</select>
        </label>
        <Slider label="Vị trí đo (0 = trái, 1 = phải)" value={u} min={0.02} max={0.98} step={0.01} onChange={setU} />
      </div>
    </Stage>
  );
}

/* ---------- 2. Quy tắc tích, thương, hợp ---------- */

type RuleKey = "tich" | "thuong" | "hop";

const RULES: Record<RuleKey, { name: string; f: Fn; tex: string; parts: (x: number) => { u: number; v: number; du: number; dv: number }; formula: (p: { u: number; v: number; du: number; dv: number }) => number; ftex: string }> = {
  tich: {
    name: "tích  u·v",
    tex: "u\\cdot v=(1+0.4x^2)(2+\\sin x)",
    f: (x) => (1 + 0.4 * x * x) * (2 + Math.sin(x)),
    parts: (x) => ({ u: 1 + 0.4 * x * x, v: 2 + Math.sin(x), du: 0.8 * x, dv: Math.cos(x) }),
    formula: (p) => p.du * p.v + p.u * p.dv,
    ftex: "u'v+uv'",
  },
  thuong: {
    name: "thương  u/v",
    tex: "\\frac{u}{v}=\\frac{x^2+1}{x+2}",
    f: (x) => (x * x + 1) / (x + 2),
    parts: (x) => ({ u: x * x + 1, v: x + 2, du: 2 * x, dv: 1 }),
    formula: (p) => (p.du * p.v - p.u * p.dv) / (p.v * p.v),
    ftex: "\\frac{u'v-uv'}{v^2}",
  },
  hop: {
    name: "hàm hợp  sin(x²)",
    tex: "\\sin(x^2)",
    f: (x) => Math.sin(x * x),
    parts: (x) => ({ u: x * x, v: 1, du: 2 * x, dv: 0 }),
    formula: (p) => Math.cos(p.u) * p.du,
    ftex: "\\cos(u)\\cdot u'",
  },
};

export function RuleLab() {
  const [key, setKey] = useState<RuleKey>("tich");
  const [x, setX] = useState(1.2);
  const [hExp, setHExp] = useState(0.6);
  const rule = RULES[key];
  const p = rule.parts(x);
  const exact = rule.formula(p);
  const numeric = diff(rule.f, x);
  const h = 10 ** -hExp * 2;
  const dU = rule.parts(x + h).u - p.u;
  const dV = rule.parts(x + h).v - p.v;
  return (
    <Stage
      title="Quy tắc tích, thương, hợp: máy kiểm từng công thức"
      story={R`Tích hai hàm là diện tích hình chữ nhật có hai cạnh u và v. Khi x nhích một chút, cả hai cạnh dài ra, diện tích có thêm ba mảnh: dải dọc, dải ngang và một mảnh góc bé xíu. Mảnh góc nhỏ như tích của hai số nhỏ nên bị bỏ qua khi bước dần về 0. Hãy kéo bước h xuống thật nhỏ và xem mảnh góc biến mất, còn hai dải còn lại cho $u'v+uv'$.`}
      read={`${rule.name}: $${rule.tex}$ tại $x=${fmt(x)}$. Độ dốc máy đo $${fmt(numeric, 6)}$. Công thức $${rule.ftex}$ với $u=${fmt(p.u, 3)}$, $v=${fmt(p.v, 3)}$, $u'=${fmt(p.du, 3)}$, $v'=${fmt(p.dv, 3)}$ cho $${fmt(exact, 6)}$.${key === "tich" ? ` Với bước $h=${fmt(h, 4)}$: dải dọc $v\\Delta u=${fmt(p.v * dU, 5)}$, dải ngang $u\\Delta v=${fmt(p.u * dV, 5)}$, mảnh góc $\\Delta u\\Delta v=${fmt(dU * dV, 7)}$.` : ""}`}
      why={key === "tich"
        ? R`Chia diện tích tăng thêm cho h: $\frac{\Delta u}{h}v+u\frac{\Delta v}{h}+\frac{\Delta u}{h}\Delta v$. Số hạng cuối có thừa số $\Delta v$ tiến về 0, nên chỉ còn $u'v+uv'$.`
        : key === "thuong"
          ? R`Gọi $w=\frac{u}{v}$ thì $u=wv$. Lấy đạo hàm hai vế bằng quy tắc tích: $u'=w'v+wv'$, giải ra $w'=\frac{u'v-uv'}{v^2}$. Quy tắc thương không phải công thức mới, nó là quy tắc tích đọc ngược.`
          : R`Tốc độ nhân với nhau: nếu $u$ đổi nhanh gấp 3 lần $x$ và hàm ngoài đổi nhanh gấp 2 lần $u$ thì hàm hợp đổi nhanh gấp 6 lần $x$. Viết $\frac{\Delta f}{\Delta x}=\frac{\Delta f}{\Delta u}\cdot\frac{\Delta u}{\Delta x}$ rồi cho bước về 0.`}
    >
      <Graph
        label="Đồ thị hàm hợp từ các hàm thành phần và tiếp tuyến"
        draw={(ctx, w, hh) => {
          const { colors, map, pad } = frame(ctx, w, hh, -1, 4, -3, 8);
          strokeFn(ctx, map, w, hh, pad, -1, 4, rule.f, colors.curve, 2.6);
          const ext = 0.8;
          line(ctx, map.x(x - ext), map.y(rule.f(x) - ext * exact), map.x(x + ext), map.y(rule.f(x) + ext * exact), colors.alt, 2.2);
          dot(ctx, map.x(x), map.y(rule.f(x)), colors.curve, colors.bg, 6);
          if (key === "tich") {
            const s = 13;
            const ox = 120;
            const oy = 96;
            const mag = Math.max(1, Math.min(60, 22 / Math.max(1e-9, Math.abs(dU) * s, Math.abs(dV) * s)));
            const sw = Math.max(1.5, Math.abs(dU) * s * mag);
            const sh = Math.max(1.5, Math.abs(dV) * s * mag);
            ctx.fillStyle = colors.bg;
            ctx.fillRect(ox - 44, oy - p.v * s - sh - 22, p.u * s + sw + 60, p.v * s + sh + 58);
            ctx.fillStyle = colors.curve;
            ctx.globalAlpha = 0.25;
            ctx.fillRect(ox, oy - p.v * s, p.u * s, p.v * s);
            ctx.globalAlpha = 0.7;
            ctx.fillStyle = colors.alt;
            ctx.fillRect(ox + p.u * s, oy - p.v * s, sw, p.v * s);
            ctx.fillRect(ox, oy - p.v * s - sh, p.u * s, sh);
            ctx.globalAlpha = 1;
            ctx.strokeStyle = colors.ink;
            ctx.lineWidth = 1.2;
            ctx.strokeRect(ox, oy - p.v * s, p.u * s, p.v * s);
            label(ctx, "cạnh u", ox + (p.u * s) / 2 - 16, oy + 14, colors.ink);
            label(ctx, "cạnh v", ox - 42, oy - (p.v * s) / 2 + 4, colors.ink);
            label(ctx, `hai dải thêm (phóng ×${fmt(mag, 0)})`, ox - 40, oy - p.v * s - sh - 8, colors.alt);
          }
        }}
      />
      <div className="fz-controls">
        <label className="fz-pick">Quy tắc
          <select value={key} onChange={(e) => setKey(e.target.value as RuleKey)}>
            {(Object.keys(RULES) as RuleKey[]).map((k) => <option key={k} value={k}>{RULES[k].name}</option>)}
          </select>
        </label>
        <Slider label="Vị trí x" value={x} min={-0.8} max={3.5} step={0.05} onChange={setX} />
        <Slider label="Bước h nhỏ dần (kéo phải)" value={hExp} min={0} max={4} step={0.1} onChange={setHExp} />
      </div>
    </Stage>
  );
}

/* ---------- 3. Lan truyền ngược = quy tắc hàm hợp ---------- */

export function BackpropLab() {
  const [x, setX] = useState(0.7);
  const [w1, setW1] = useState(1.3);
  const [w2, setW2] = useState(-0.8);
  const [target, setTarget] = useState(1);
  const g = chainBackprop(x, w1, w2);
  const loss = (g.y - target) ** 2;
  const numeric = diff((t) => w2 * Math.tanh(w1 * t), x);
  const step = () => {
    const d = 2 * (g.y - target);
    setW1(Math.max(-3, Math.min(3, w1 - 0.15 * d * g.dy_dw1)));
    setW2(Math.max(-3, Math.min(3, w2 - 0.15 * d * g.dy_dw2)));
  };
  return (
    <Stage
      title="Mạng nơ-ron học bằng quy tắc hàm hợp (lan truyền ngược)"
      story={R`Một mạng nhỏ nhất: số x nhân với trọng số $w_1$, rồi qua hàm $\tanh$ (một chữ S), rồi nhân với $w_2$ ra kết quả y. Đó là ba hàm xếp nối nhau, tức một hàm hợp. Muốn biết nên chỉnh $w_1$ hay $w_2$ thế nào để y gần mục tiêu, ta cần đạo hàm của y theo chúng, và quy tắc hàm hợp cho đạo hàm đó bằng cách nhân các đạo hàm cục bộ dọc chuỗi, đi ngược từ phải sang trái.`}
      read={`Xuôi: $z=w_1x=${fmt(g.z, 3)}$, $a=\\tanh z=${fmt(g.a, 3)}$, $y=w_2a=${fmt(g.y, 3)}$. Ngược: $\\frac{dy}{dx}=w_2\\cdot(1-a^2)\\cdot w_1=${fmt(w2, 2)}\\cdot${fmt(g.da, 3)}\\cdot${fmt(w1, 2)}=${fmt(g.dy_dx, 5)}$; máy đo bằng cát tuyến $${fmt(numeric, 5)}$. Sai số mục tiêu $(y-t)^2=${fmt(loss, 5)}$.`}
      why={R`Đạo hàm của $\tanh z$ là $1-\tanh^2z$ nên các đạo hàm cục bộ có sẵn trong lần tính xuôi. Gradient theo $w_1$ là $w_2\cdot(1-a^2)\cdot x$, theo $w_2$ là $a$. Bấm «Học một bước» rồi xem sai số giảm: mỗi bước đi ngược hướng dốc của sai số. Mạng lớn chỉ là chuỗi dài hơn cùng một quy tắc.`}
    >
      <Graph
        label="Sơ đồ chuỗi tính toán và các đạo hàm cục bộ"
        draw={(ctx, w, h) => {
          const { colors } = frame(ctx, w, h, 0, 1, 0, 1);
          ctx.clearRect(0, 0, w, h);
          ctx.fillStyle = colors.bg;
          ctx.fillRect(0, 0, w, h);
          const nodes: [string, string][] = [["x", fmt(x, 2)], ["z = w₁·x", fmt(g.z, 2)], ["a = tanh z", fmt(g.a, 2)], ["y = w₂·a", fmt(g.y, 2)]];
          const bw = Math.min(110, (w - 60) / 4 - 14);
          const gap = (w - 40 - bw * 4) / 3;
          const locals = [`× w₁ = ${fmt(g.dz, 2)}`, `1 − a² = ${fmt(g.da, 2)}`, `× w₂ = ${fmt(w2, 2)}`];
          const back = [g.dy_dx, w2 * g.da, w2, 1];
          nodes.forEach(([name, value], i) => {
            const nx = 20 + i * (bw + gap);
            ctx.strokeStyle = colors.curve;
            ctx.lineWidth = 2;
            ctx.fillStyle = colors.bg;
            ctx.beginPath();
            ctx.roundRect(nx, h / 2 - 34, bw, 68, 10);
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = colors.ink;
            ctx.font = "13px system-ui, sans-serif";
            ctx.fillText(name, nx + 8, h / 2 - 8);
            ctx.font = "bold 16px system-ui, sans-serif";
            ctx.fillText(value, nx + 8, h / 2 + 18);
            ctx.fillStyle = colors.alt;
            ctx.font = "13px system-ui, sans-serif";
            ctx.fillText(`dy/d${["x", "z", "a", "y"][i]} = ${fmt(back[i] as number, 3)}`, nx + 2, h / 2 + 56);
            if (i < 3) {
              const ax = nx + bw;
              line(ctx, ax, h / 2, ax + gap, h / 2, colors.soft, 2);
              label(ctx, locals[i] as string, ax - 2, h / 2 - 44, colors.alt);
            }
          });
          label(ctx, "lan truyền xuôi →", 20, 24, colors.curve);
          label(ctx, `← ngược: bắt đầu từ dy/dy = 1, mỗi bước nhân thêm một đạo hàm cục bộ`, 20, h - 14, colors.alt);
        }}
      />
      <div className="fz-controls">
        <Slider label="Đầu vào x" value={x} min={-2} max={2} step={0.1} onChange={setX} />
        <Slider label="Trọng số w₁" value={w1} min={-3} max={3} step={0.05} onChange={setW1} />
        <Slider label="Trọng số w₂" value={w2} min={-3} max={3} step={0.05} onChange={setW2} />
        <Slider label="Mục tiêu t" value={target} min={-2} max={2} step={0.1} onChange={setTarget} />
      </div>
      <Buttons><button type="button" className="text-btn" onClick={step}>Học một bước</button></Buttons>
    </Stage>
  );
}

/* ---------- 4. Chuyển động: gia tốc → vận tốc → vị trí ---------- */

export function MotionLab() {
  const [a, setA] = useState(-10);
  const [v0, setV0] = useState(20);
  const [t, setT] = useState(1);
  const dt = 0.002;
  const steps = useMemo(() => eulerMotion(() => a, 0, v0, dt, 4000), [a, v0]);
  const at_ = (time: number) => at(steps, Math.round(time / dt));
  const cur = at_(t);
  const vNumeric = diff((time) => at_(time).s, Math.max(0.05, t), 0.02);
  const tPeak = a < 0 ? v0 / -a : 0;
  const sPeak = a < 0 ? at_(tPeak).s : 0;
  const tEnd = 8;
  const vMax = Math.max(v0, 1);
  return (
    <Stage
      title="Quả bóng ném lên: gia tốc, vận tốc, vị trí"
      story={R`Máy chỉ biết một luật: mỗi khoảnh khắc nhỏ dt, vận tốc đổi một lượng a·dt, vị trí đổi một lượng v·dt. Cho máy gia tốc rồi để nó chạy, ta thu được vận tốc và vị trí theo thời gian. Sau đó làm ngược: lấy đường vị trí đo độ dốc bằng cát tuyến, ta thấy nó đúng bằng vận tốc mà máy đã dùng. Hai phép làm ngược nhau là cùng một chuyện.`}
      read={`Lúc $t=${fmt(t)}$ s: vị trí $s=${fmt(cur.s, 3)}$ m, vận tốc máy dùng $v=${fmt(cur.v, 3)}$ m/s. Đo độ dốc của đường vị trí cho $${fmt(vNumeric, 3)}$ m/s. ${a < 0 ? `Bóng đạt đỉnh khi $v=0$, tức $t=\\frac{v_0}{|a|}=${fmt(tPeak, 3)}$ s, cao $${fmt(sPeak, 3)}$ m.` : "Gia tốc không âm nên bóng không quay lại."}`}
      why={R`Vận tốc là đạo hàm của vị trí, gia tốc là đạo hàm của vận tốc. Đường vị trí là parabol $s=v_0t+\frac{1}{2}at^2$, đạo hàm của nó là $v_0+at$: đường thẳng dốc xuống, cắt trục tại đỉnh. Ở đỉnh, độ dốc của vị trí bằng 0, đó chính là điều kiện cực trị.`}
    >
      <Graph
        label="Vị trí, vận tốc theo thời gian và quả bóng"
        draw={(ctx, w, h) => {
          const sTop = Math.max(10, sPeak * 1.15);
          const { colors, map, pad } = frame(ctx, w, h, 0, tEnd, -vMax * 1.2, Math.max(sTop, vMax * 1.2), "t (s)", "");
          strokeFn(ctx, map, w, h, pad, 0, tEnd, (time) => at_(time).s, colors.curve, 2.6);
          strokeFn(ctx, map, w, h, pad, 0, tEnd, (time) => at_(time).v, colors.alt, 2.2);
          dashed(ctx, map.x(t), map.y(-vMax * 1.2), map.x(t), map.y(Math.max(sTop, vMax * 1.2)), colors.soft);
          dot(ctx, map.x(t), map.y(cur.s), colors.curve, colors.bg, 6);
          dot(ctx, map.x(t), map.y(cur.v), colors.alt, colors.bg, 6);
          const ext = 0.6;
          dashed(ctx, map.x(t - ext), map.y(cur.s - ext * cur.v), map.x(t + ext), map.y(cur.s + ext * cur.v), colors.curve);
          label(ctx, "vị trí s", map.x(0.2), map.y(sTop * 0.9), colors.curve);
          label(ctx, "vận tốc v", map.x(0.2), map.y(v0 * 0.86), colors.alt);
        }}
      />
      <div className="fz-controls">
        <Slider label="Gia tốc a (m/s²)" value={a} min={-20} max={-2} step={0.5} onChange={setA} />
        <Slider label="Vận tốc ném v₀ (m/s)" value={v0} min={5} max={40} step={1} onChange={setV0} />
        <Slider label="Thời điểm t (s)" value={t} min={0.1} max={7.9} step={0.1} onChange={setT} />
      </div>
    </Stage>
  );
}

/* ---------- 5. Khi nào không có đạo hàm ---------- */

const KINKS: { name: string; f: Fn; note: string }[] = [
  { name: "|x| tại 0 (góc nhọn)", f: Math.abs, note: "hai bên cho hai độ dốc khác nhau" },
  { name: "∛x tại 0 (tiếp tuyến đứng)", f: Math.cbrt, note: "độ dốc lớn tùy ý, không dừng ở số nào" },
  { name: "x·sin(1/x) tại 0 (rung vô hạn)", f: (x) => (x === 0 ? 0 : x * Math.sin(1 / x)), note: "độ dốc cứ nhảy qua lại, không dồn về số nào" },
  { name: "x² tại 0 (trơn, đối chứng)", f: (x) => x * x, note: "hai bên dồn về cùng một số" },
];

export function KinkLab() {
  const [pick, setPick] = useState(0);
  const [e, setE] = useState(1);
  const spec = at(KINKS, pick);
  const h = 10 ** -e;
  const rows = [0, 1, 2, 3, 4, 5].map((k) => { const hh = 10 ** -(k * 0.8); return { hh, ...oneSided(spec.f, 0, hh) }; });
  const cur = oneSided(spec.f, 0, h);
  const agree = hasDerivativeAt(spec.f, 0);
  return (
    <Stage
      title="Khi nào đường cong không có tiếp tuyến"
      story={R`Đạo hàm đòi hỏi độ dốc từ hai phía cùng dồn về một con số. Tiến sát điểm 0 từ bên trái và bên phải, ghi độ dốc cát tuyến: nếu hai dãy số hội tụ về cùng một chỗ thì có tiếp tuyến. Hãy thử bốn đường cong và nhìn bảng.`}
      read={`Bước $h=${fmt(h, 5)}$: độ dốc trái $${fmt(cur.left, 4)}$, phải $${fmt(cur.right, 4)}$. Bảng khi h giảm dần (trái; phải): ${rows.map((r) => `${fmt(r.left, 2)}; ${fmt(r.right, 2)}`).join(" | ")}. Kết luận: ${agree ? "có đạo hàm tại 0" : "không có đạo hàm tại 0"} (${spec.note}).`}
      why={R`Hàm $|x|$ liên tục tại 0 mà không có đạo hàm: có đạo hàm thì chắc chắn liên tục, nhưng liên tục thì chưa chắc có đạo hàm. Vì $f(a+h)-f(a)=\frac{f(a+h)-f(a)}{h}\cdot h$, nếu thương dồn về một số hữu hạn thì phần chênh lệch tiến về 0, tức hàm liên tục.`}
    >
      <Graph
        label="Đường cong và hai cát tuyến sát điểm 0"
        draw={(ctx, w, hh) => {
          const { colors, map, pad } = frame(ctx, w, hh, -1, 1, -1, 1);
          strokeFn(ctx, map, w, hh, pad, -1, 1, spec.f, colors.curve, 2.4);
          const hv = Math.min(h, 0.9);
          line(ctx, map.x(-1), map.y(spec.f(0) - cur.left * (1)) , map.x(1), map.y(spec.f(0) + cur.left * 1), colors.alt, 1.6);
          dashed(ctx, map.x(-1), map.y(spec.f(0) - cur.right), map.x(1), map.y(spec.f(0) + cur.right), colors.soft);
          dot(ctx, map.x(-hv), map.y(spec.f(-hv)), colors.alt, colors.bg, 5);
          dot(ctx, map.x(hv), map.y(spec.f(hv)), colors.ink, colors.bg, 5);
          dot(ctx, map.x(0), map.y(0), colors.curve, colors.bg, 6);
        }}
      />
      <div className="fz-controls">
        <label className="fz-pick">Đường cong
          <select value={pick} onChange={(ev) => setPick(Number(ev.target.value))}>{KINKS.map((k, i) => <option key={k.name} value={i}>{k.name}</option>)}</select>
        </label>
        <Slider label="Bước h nhỏ dần (10 mũ −)" value={e} min={0.2} max={5} step={0.1} onChange={setE} />
      </div>
    </Stage>
  );
}

/* ---------- 6. Phương trình tiếp tuyến ba kiểu ---------- */

type TanMode = "diem" | "k" | "qua";
const CUBIC: Fn = (x) => x ** 3 - 3 * x;

export function TangentLab() {
  const [mode, setMode] = useState<TanMode>("qua");
  const [x0, setX0] = useState(1.5);
  const [k, setK] = useState(2);
  const [px, setPx] = useState(2);
  const [py, setPy] = useState(0);
  const xs: number[] = mode === "diem" ? [x0] : mode === "k" ? findRoots((t) => diff(CUBIC, t, 1e-4) - k, -3, 3) : tangentsThrough(CUBIC, px, py, -3.5, 3.5);
  const eqs = xs.map((t) => { const s = diff(CUBIC, t, 1e-4); return { t, s, m: CUBIC(t) - s * t }; });
  return (
    <Stage
      title="Ba kiểu tiếp tuyến của $y=x^3-3x$: máy tìm tiếp điểm"
      story={R`Tiếp tuyến tại một điểm thì dễ: biết chỗ đứng là biết độ dốc. Khó hơn là hai kiểu còn lại, vì ta chưa biết tiếp điểm ở đâu: «tiếp tuyến có độ dốc cho trước» và «tiếp tuyến đi qua một điểm ngoài đồ thị». Máy giải bằng cách viết điều kiện thành một phương trình theo hoành độ tiếp điểm rồi tìm mọi nghiệm. Số nghiệm chính là số tiếp tuyến.`}
      read={`${eqs.length} tiếp tuyến: ${eqs.map((q) => `$y=${fmt(q.s, 3)}x${q.m < 0 ? "-" : "+"}${fmt(Math.abs(q.m), 3)}$ (tiếp điểm $x_0=${fmt(q.t, 3)}$)`).join("; ") || "không có"}.`}
      why={mode === "diem"
        ? R`Tiếp tuyến tại $x_0$: $y=f'(x_0)(x-x_0)+f(x_0)$. Đạo hàm cho độ dốc, đồ thị cho điểm đi qua.`
        : mode === "k"
          ? R`Độ dốc cho trước nghĩa là $f'(x_0)=k$. Với $f'=3x^2-3$ đó là phương trình bậc hai, nên có tối đa hai tiếp điểm: hai tiếp tuyến song song.`
          : R`Tiếp tuyến tại $x_0$ đi qua $P$ nghĩa là $f(x_0)+f'(x_0)(p_x-x_0)=p_y$. Điểm $P$ ở những chỗ khác nhau cho 1, 2 hoặc 3 tiếp tuyến: hãy kéo $P$ để thấy số tiếp tuyến thay đổi.`}
    >
      <Graph
        label="Đồ thị bậc ba và các tiếp tuyến"
        draw={(ctx, w, h) => {
          const { colors, map, pad } = frame(ctx, w, h, -3.5, 3.5, -6, 6);
          strokeFn(ctx, map, w, h, pad, -3.5, 3.5, CUBIC, colors.curve, 2.6);
          for (const q of eqs) {
            line(ctx, map.x(-3.5), map.y(q.s * -3.5 + q.m), map.x(3.5), map.y(q.s * 3.5 + q.m), colors.alt, 1.6);
            dot(ctx, map.x(q.t), map.y(CUBIC(q.t)), colors.alt, colors.bg, 5);
          }
          if (mode === "qua") { ctx.fillStyle = colors.ink; ctx.fillRect(map.x(px) - 6, map.y(py) - 6, 12, 12); }
        }}
      />
      <div className="fz-controls">
        <label className="fz-pick">Kiểu bài
          <select value={mode} onChange={(ev) => setMode(ev.target.value as TanMode)}>
            <option value="diem">tại một điểm của đồ thị</option><option value="k">có hệ số góc cho trước</option><option value="qua">đi qua một điểm ngoài đồ thị</option>
          </select>
        </label>
        {mode === "diem" ? <Slider label="Hoành độ tiếp điểm" value={x0} min={-3} max={3} step={0.1} onChange={setX0} /> : null}
        {mode === "k" ? <Slider label="Hệ số góc k" value={k} min={-3} max={12} step={0.5} onChange={setK} /> : null}
        {mode === "qua" ? (<><Slider label="Điểm P: x" value={px} min={-3} max={3} step={0.1} onChange={setPx} /><Slider label="Điểm P: y" value={py} min={-5} max={5} step={0.1} onChange={setPy} /></>) : null}
      </div>
    </Stage>
  );
}

/* ---------- 7. Chiều biến thiên, cực trị, giá trị lớn nhất trên đoạn ---------- */

export function ExtremaLab() {
  const [lo, setLo] = useState(-2.5);
  const [hi, setHi] = useState(2.5);
  const f = CUBIC;
  const cps = criticalPoints(f, lo, hi);
  const cands = [{ x: lo, y: f(lo), tag: "đầu mút trái" }, { x: hi, y: f(hi), tag: "đầu mút phải" }, ...cps.map((c) => ({ x: c.x, y: c.y, tag: c.kind === "max" ? "cực đại" : "cực tiểu" }))];
  const best = cands.reduce((m, c) => (c.y > m.y ? c : m));
  const worst = cands.reduce((m, c) => (c.y < m.y ? c : m));
  let scanMax = -Infinity;
  let scanMin = Infinity;
  for (let i = 0; i <= 5000; i++) { const y = f(lo + ((hi - lo) * i) / 5000); scanMax = Math.max(scanMax, y); scanMin = Math.min(scanMin, y); }
  return (
    <Stage
      title="Tìm giá trị lớn nhất, nhỏ nhất trên một đoạn"
      story={R`Hãy tô màu đường cong theo dấu của độ dốc: xanh khi đang đi lên, cam khi đang đi xuống. Chỗ đổi màu là chỗ quay đầu, tức điểm tới hạn. Để tìm cao nhất và thấp nhất trên một đoạn, ta chỉ cần so sánh các ứng viên: hai đầu mút và các chỗ quay đầu nằm trong đoạn. Máy làm đúng việc đó rồi kiểm lại bằng cách quét 5000 điểm.`}
      read={`Trên $[${fmt(lo)};\\ ${fmt(hi)}]$ có ${cps.length} điểm tới hạn: ${cps.map((c) => `$x=${fmt(c.x, 3)}$ (${c.kind === "max" ? "cực đại" : "cực tiểu"}, $y=${fmt(c.y, 3)}$)`).join("; ") || "không có"}. So các ứng viên: lớn nhất $${fmt(best.y, 4)}$ tại $x=${fmt(best.x, 3)}$ (${best.tag}), nhỏ nhất $${fmt(worst.y, 4)}$ tại $x=${fmt(worst.x, 3)}$ (${worst.tag}). Quét 5000 điểm cho $${fmt(scanMax, 4)}$ và $${fmt(scanMin, 4)}$.`}
      why={R`Trong khoảng mà $f'>0$ hàm đi lên nên cao nhất ở đầu bên phải; trong khoảng mà $f'<0$ hàm đi xuống nên cao nhất ở đầu bên trái. Do đó cực trị chỉ có thể ở đầu mút hoặc ở chỗ $f'$ đổi dấu. Cực đại hay cực tiểu thì nhìn đạo hàm cấp hai: độ dốc đang tăng là đáy, đang giảm là đỉnh.`}
    >
      <Graph
        label="Đường cong tô màu theo dấu đạo hàm, điểm tới hạn và đoạn khảo sát"
        draw={(ctx, w, h) => {
          const { colors, map } = frame(ctx, w, h, -3.2, 3.2, -4.5, 4.5);
          ctx.fillStyle = colors.curve;
          ctx.globalAlpha = 0.1;
          ctx.fillRect(map.x(lo), 0, map.x(hi) - map.x(lo), h);
          ctx.globalAlpha = 1;
          for (let i = 0; i < 640; i++) {
            const xa = -3.2 + (6.4 * i) / 640;
            const xb = -3.2 + (6.4 * (i + 1)) / 640;
            line(ctx, map.x(xa), map.y(f(xa)), map.x(xb), map.y(f(xb)), diff(f, xa) >= 0 ? colors.curve : colors.alt, 3);
          }
          for (const c of cands) dot(ctx, map.x(c.x), map.y(c.y), c === best ? colors.ink : colors.bg, c === worst ? colors.alt : colors.curve, 6);
        }}
      />
      <div className="fz-controls">
        <Slider label="Đầu mút trái" value={lo} min={-3} max={1.5} step={0.1} onChange={(v) => setLo(Math.min(v, hi - 0.3))} />
        <Slider label="Đầu mút phải" value={hi} min={-1.5} max={3} step={0.1} onChange={(v) => setHi(Math.max(v, lo + 0.3))} />
      </div>
    </Stage>
  );
}

/* ---------- 8. Bài tối ưu: gấp hộp ---------- */

export function BoxLab() {
  const [side, setSide] = useState(12);
  const [x, setX] = useState(1.5);
  const xm = Math.min(x, side / 2 - 0.05);
  const V = (t: number) => boxVolume(t, side);
  const best = criticalPoints(V, 0.01, side / 2 - 0.01).find((c) => c.kind === "max");
  return (
    <Stage
      title="Gấp hộp lớn nhất từ một tấm bìa vuông"
      story={R`Có tấm bìa vuông. Cắt bỏ bốn hình vuông nhỏ cạnh x ở bốn góc rồi gấp các cánh lên thành hộp không nắp. Cắt ít thì đáy to nhưng thành thấp, cắt nhiều thì thành cao nhưng đáy bé. Có một cỡ cắt cho thể tích lớn nhất. Kéo x để tự tìm, rồi xem máy tìm bằng đạo hàm.`}
      read={`Cắt $x=${fmt(xm, 2)}$: đáy $${fmt(side - 2 * xm, 2)}\\times${fmt(side - 2 * xm, 2)}$, cao $${fmt(xm, 2)}$, thể tích $V=${fmt(V(xm), 3)}$. Độ dốc của $V$ tại đó $${fmt(diff(V, xm), 3)}$. Máy giải $V'=0$ tìm được $x=${best ? fmt(best.x, 4) : "?"}$, thể tích lớn nhất $${best ? fmt(best.y, 3) : "?"}$. So với $\\frac{${fmt(side)}}{6}=${fmt(side / 6, 4)}$.`}
      why={R`$V=x(a-2x)^2$ với $a$ là cạnh tấm bìa. Đạo hàm: $V'=(a-2x)^2-4x(a-2x)=(a-2x)(a-6x)$. Nghiệm hợp lệ là $x=\frac{a}{6}$, với mọi cỡ bìa. Bên trái đó $V'>0$ (hộp đang to lên), bên phải $V'<0$ (hộp nhỏ lại): đúng đỉnh.`}
    >
      <Graph
        label="Tấm bìa cắt góc và đồ thị thể tích theo x"
        draw={(ctx, w, h) => {
          const half = Math.floor(w * 0.34);
          const s = Math.min(half - 20, h - 40);
          const ox = 14;
          const oy = (h - s) / 2;
          const { colors } = frame(ctx, w, h, 0, 1, 0, 1);
          ctx.clearRect(0, 0, w, h);
          ctx.fillStyle = colors.bg;
          ctx.fillRect(0, 0, w, h);
          const k = s / side;
          ctx.fillStyle = colors.curve;
          ctx.globalAlpha = 0.25;
          ctx.fillRect(ox, oy, s, s);
          ctx.globalAlpha = 1;
          ctx.fillStyle = colors.bg;
          for (const [cx, cy] of [[0, 0], [1, 0], [0, 1], [1, 1]] as const) ctx.fillRect(ox + cx * (s - xm * k), oy + cy * (s - xm * k), xm * k, xm * k);
          ctx.strokeStyle = colors.alt;
          ctx.lineWidth = 1.5;
          ctx.strokeRect(ox, oy, s, s);
          label(ctx, `cạnh ${side}`, ox + s / 2 - 22, oy - 6, colors.ink);
          const gx0 = ox + s + 26;
          const gw = w - gx0 - 12;
          const vMax = boxVolume(side / 6, side) * 1.15;
          const gy = (v: number) => h - 26 - (v / vMax) * (h - 50);
          const gxf = (t: number) => gx0 + (t / (side / 2)) * gw;
          line(ctx, gx0, h - 26, gx0 + gw, h - 26, colors.axis, 1.2);
          ctx.beginPath();
          ctx.strokeStyle = colors.curve;
          ctx.lineWidth = 2.6;
          for (let i = 0; i <= 200; i++) { const t = (side / 2) * (i / 200); (i === 0 ? ctx.moveTo : ctx.lineTo).call(ctx, gxf(t), gy(boxVolume(t, side))); }
          ctx.stroke();
          if (best) { dot(ctx, gxf(best.x), gy(best.y), colors.alt, colors.bg, 6); dashed(ctx, gxf(best.x), gy(best.y), gxf(best.x), h - 26, colors.alt); }
          dot(ctx, gxf(xm), gy(V(xm)), colors.ink, colors.bg, 6);
          label(ctx, "V theo x", gx0 + 6, 18, colors.curve);
        }}
      />
      <div className="fz-controls">
        <Slider label="Cạnh tấm bìa" value={side} min={6} max={30} step={1} onChange={setSide} />
        <Slider label="Cắt góc cạnh x" value={xm} min={0.1} max={side / 2 - 0.1} step={0.05} onChange={setX} />
      </div>
    </Stage>
  );
}
