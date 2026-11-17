import { useMemo, useState } from "react";
import { completeSquare, findRoots, fitQuadratic, newtonPath, solveInequality, type Fn } from "../../algo/index.ts";
import { dashed, dot, strokeFn } from "../../labs/draw.ts";
import { Graph } from "../../labs/Graph.tsx";
import { fmt } from "../../lib/format.ts";
import { freshSeed, mulberry32 } from "../../lib/prng.ts";
import { Slider } from "../../ui/Slider.tsx";
import { at, frame, label, line, useTicker } from "./kit.ts";
import { Buttons, Stage } from "./widgets.tsx";

const R = String.raw;

/** Viết ax²+bx+c thành TeX có dấu đúng. */
function qtex(a: number, b: number, c: number): string {
  const term = (v: number, body: string, first: boolean) => {
    if (Math.abs(v) < 1e-9) return "";
    const mag = Math.abs(v);
    const coef = body !== "" && Math.abs(mag - 1) < 1e-9 ? "" : fmt(mag, 2);
    return `${v < 0 ? "-" : first ? "" : "+"}${coef}${body}`;
  };
  const s = term(a, "x^2", true) + term(b, "x", a === 0) + term(c, "", a === 0 && b === 0);
  return s === "" ? "0" : s;
}

const fnOf = (a: number, b: number, c: number): Fn => (x) => a * x * x + b * x + c;
const safeA = (a: number) => (Math.abs(a) < 0.1 ? 0.25 : a);

/* ---------- 1. Hình dạng: hướng, độ rộng, trục đối xứng, giao trục tung ---------- */

export function ShapeLab() {
  const [a0, setA] = useState(1);
  const [b, setB] = useState(-4);
  const [c, setC] = useState(1);
  const [t, setT] = useState(2);
  const a = safeA(a0);
  const f = fnOf(a, b, c);
  const h = -b / (2 * a);
  const k = f(h);
  return (
    <Stage
      title="Hình dạng parabol: a quyết định hướng, trục đối xứng là tấm gương"
      story={R`Kéo $a$ lên dương: parabol mở lên như cái bát; kéo xuống âm: úp xuống như cái nón. $|a|$ lớn thì dốc, đường cong hẹp lại. Đường thẳng đứng nét đứt là tấm gương: hai điểm cách gương một khoảng $t$ về hai phía luôn có cùng độ cao. Và đường cong luôn cắt trục tung ở $(0;c)$, vì $x=0$ thì chỉ còn lại hạng tử $c$.`}
      read={`$y=${qtex(a, b, c)}$ (a = ${fmt(a)} ${a > 0 ? "> 0: mở lên, đỉnh là điểm thấp nhất" : "< 0: mở xuống, đỉnh là điểm cao nhất"}). Trục đối xứng $x=-\\frac{b}{2a}=${fmt(h, 3)}$, đỉnh $(${fmt(h, 3)};\\ ${fmt(k, 3)})$. Hai điểm cách gương $t=${fmt(t)}$: $y(${fmt(h - t, 2)})=${fmt(f(h - t), 4)}$ và $y(${fmt(h + t, 2)})=${fmt(f(h + t), 4)}$. Cắt trục tung tại $(0;\\ ${fmt(c)})$.`}
      why={R`Dạng đỉnh $y=a(x-h)^2+k$ chỉ chứa $x$ qua $(x-h)^2$, mà $(h+t-h)^2=(h-t-h)^2=t^2$. Vậy giá trị tại $h+t$ và $h-t$ bằng nhau: đó là lý do có trục đối xứng $x=h$. Còn $h=-\frac{b}{2a}$ là kết quả của việc hoàn thiện bình phương (xem hình sau).`}
    >
      <Graph
        label="Parabol, trục đối xứng và hai điểm đối xứng"
        draw={(ctx, w, hh) => {
          const { colors, map, pad } = frame(ctx, w, hh, -7, 7, -10, 12);
          strokeFn(ctx, map, w, hh, pad, -7, 7, f, colors.curve, 2.6);
          dashed(ctx, map.x(h), map.y(-10), map.x(h), map.y(12), colors.alt);
          line(ctx, map.x(h - t), map.y(f(h - t)), map.x(h + t), map.y(f(h + t)), colors.soft, 1.2);
          dot(ctx, map.x(h - t), map.y(f(h - t)), colors.curve, colors.bg, 5);
          dot(ctx, map.x(h + t), map.y(f(h + t)), colors.curve, colors.bg, 5);
          dot(ctx, map.x(h), map.y(k), colors.alt, colors.bg, 7);
          dot(ctx, map.x(0), map.y(c), colors.ink, colors.bg, 5);
          label(ctx, "đỉnh", map.x(h) + 8, map.y(k) + (a > 0 ? 16 : -8), colors.alt);
          label(ctx, "(0; c)", map.x(0) + 8, map.y(c) - 8, colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label="a (khác 0)" value={a0} min={-3} max={3} step={0.25} onChange={setA} />
        <Slider label="b" value={b} min={-8} max={8} step={0.5} onChange={setB} />
        <Slider label="c" value={c} min={-6} max={6} step={0.5} onChange={setC} />
        <Slider label="Cách gương t" value={t} min={0.5} max={5} step={0.25} onChange={setT} />
      </div>
    </Stage>
  );
}

/* ---------- 2. Hoàn thiện bình phương bằng ô vuông ---------- */

export function CompleteSquareLab() {
  const [b, setB] = useState(4);
  const [c, setC] = useState(1);
  const [x, setX] = useState(3);
  const half = b / 2;
  const { h, k } = completeSquare(1, b, c);
  const lhs = x * x + b * x;
  const rhs = (x + half) ** 2 - half * half;
  return (
    <Stage
      title="Hoàn thiện bình phương: lắp nốt mảnh còn thiếu của hình vuông"
      story={R`$x^2+bx$ là diện tích của một hình vuông cạnh $x$ ghép với một dải rộng $b$ dài $x$. Chia dải làm đôi, dán mỗi nửa vào một cạnh của hình vuông: ta được một chữ L. Chữ L thiếu đúng một hình vuông nhỏ cạnh $\frac{b}{2}$ ở góc để thành hình vuông lớn cạnh $x+\frac{b}{2}$. Thêm mảnh đó (rồi trừ đi cho khỏi lệch) là «hoàn thiện bình phương». Từ đó thấy ngay giá trị nhỏ nhất.`}
      read={`$x=${fmt(x, 2)}$, $b=${fmt(b, 1)}$: diện tích chữ L $x^2+bx=${fmt(x * x, 3)}+${fmt(b * x, 3)}=${fmt(lhs, 4)}$. Hình vuông lớn $\\left(x+\\frac{b}{2}\\right)^2=${fmt((x + half) ** 2, 4)}$, trừ mảnh thiếu $\\left(\\frac{b}{2}\\right)^2=${fmt(half * half, 4)}$ còn $${fmt(rhs, 4)}$: bằng nhau. Vậy $x^2+${fmt(b, 1)}x+${fmt(c, 1)}=\\left(x+${fmt(half, 2)}\\right)^2${k >= 0 ? "+" : ""}${fmt(k, 3)}$, đạt nhỏ nhất $${fmt(k, 3)}$ tại $x=${fmt(h, 2)}$.`}
      why={R`Bình phương không bao giờ âm, nên $(x+\frac{b}{2})^2$ nhỏ nhất bằng 0, đạt khi $x=-\frac{b}{2}$. Khi đó cả biểu thức nhỏ nhất bằng $c-\frac{b^2}{4}$. Với $a\ne 1$, rút $a$ ra ngoài trước rồi làm tương tự, ra đỉnh $\left(-\frac{b}{2a};-\frac{\Delta}{4a}\right)$.`}
    >
      <Graph
        label="Hình vuông x nhân x, dải b nhân x và mảnh thiếu"
        draw={(ctx, w, hh) => {
          const { colors } = frame(ctx, w, hh, 0, 1, 0, 1);
          ctx.clearRect(0, 0, w, hh);
          ctx.fillStyle = colors.bg;
          ctx.fillRect(0, 0, w, hh);
          const total = x + half + 0.6;
          const s = Math.min(w - 40, hh - 40) / total;
          const ox = 24;
          const oy = hh - 20;
          const rect = (u0: number, v0: number, du: number, dv: number, fill: string, alpha: number, name: string) => {
            ctx.globalAlpha = alpha;
            ctx.fillStyle = fill;
            ctx.fillRect(ox + u0 * s, oy - (v0 + dv) * s, du * s, dv * s);
            ctx.globalAlpha = 1;
            ctx.strokeStyle = colors.ink;
            ctx.lineWidth = 1.2;
            ctx.strokeRect(ox + u0 * s, oy - (v0 + dv) * s, du * s, dv * s);
            if (name && du * s > 28 && dv * s > 16) label(ctx, name, ox + (u0 + du / 2) * s - 14, oy - (v0 + dv / 2) * s + 4, colors.ink);
          };
          rect(0, 0, x, x, colors.curve, 0.3, "x²");
          rect(x, 0, half, x, colors.alt, 0.35, `${fmt(half, 1)}x`);
          rect(0, x, x, half, colors.alt, 0.35, `${fmt(half, 1)}x`);
          rect(x, x, half, half, colors.soft, 0.25, "thiếu");
          ctx.setLineDash([5, 4]);
          ctx.strokeStyle = colors.soft;
          ctx.strokeRect(ox + x * s, oy - (x + half) * s, half * s, half * s);
          ctx.setLineDash([]);
          label(ctx, `cạnh lớn = x + ${fmt(half, 1)} = ${fmt(x + half, 2)}`, ox + 4, 16, colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label="b" value={b} min={0} max={6} step={0.5} onChange={setB} />
        <Slider label="c" value={c} min={-6} max={6} step={0.5} onChange={setC} />
        <Slider label="Cạnh hình vuông x" value={x} min={0.5} max={6} step={0.25} onChange={setX} />
      </div>
    </Stage>
  );
}

/* ---------- 3. Dạng đỉnh: tịnh tiến ---------- */

export function TranslateLab() {
  const [a0, setA] = useState(1);
  const [h, setH] = useState(2);
  const [k, setK] = useState(-3);
  const a = safeA(a0);
  const f: Fn = (x) => a * (x - h) ** 2 + k;
  const base: Fn = (x) => a * x * x;
  const b = -2 * a * h;
  const c = a * h * h + k;
  const probe = h + 1.5;
  return (
    <Stage
      title="Dạng đỉnh: trượt cả đường cong đi h ngang, k dọc"
      story={R`Lấy parabol gốc $y=ax^2$ có đỉnh ở gốc toạ độ (nét mờ). Đẩy nó sang phải $h$ đơn vị rồi lên $k$ đơn vị: đỉnh tới $(h;k)$ và mọi điểm đi theo, dáng không đổi. Độ cao mới tại $x$ chính là độ cao cũ tại $x-h$ cộng $k$. Đó là công thức $y=a(x-h)^2+k$ viết thành hình.`}
      read={`Điểm $x=${fmt(probe, 2)}$: độ cao mới $${fmt(f(probe), 4)}$; độ cao cũ tại $x-h=${fmt(probe - h, 2)}$ là $${fmt(base(probe - h), 4)}$, cộng $k=${fmt(k)}$ được $${fmt(base(probe - h) + k, 4)}$. Khai triển: $y=${qtex(a, b, c)}$, nên $b=-2ah=${fmt(b, 2)}$ và $c=ah^2+k=${fmt(c, 2)}$. Đỉnh $(${fmt(h)};\\ ${fmt(k)})$.`}
      why={R`Phép tịnh tiến không đổi hình dạng, nên mọi tính chất của $y=ax^2$ (hướng, độ rộng, đối xứng) giữ nguyên, chỉ vị trí đổi. Muốn biết đỉnh ở đâu, nhìn dạng đỉnh là xong; muốn biết cắt trục tung ở đâu, khai triển ra $c$.`}
    >
      <Graph
        label="Parabol gốc và parabol đã tịnh tiến"
        draw={(ctx, w, hh) => {
          const { colors, map, pad } = frame(ctx, w, hh, -7, 7, -10, 12);
          ctx.globalAlpha = 0.4;
          strokeFn(ctx, map, w, hh, pad, -7, 7, base, colors.soft, 2);
          ctx.globalAlpha = 1;
          strokeFn(ctx, map, w, hh, pad, -7, 7, f, colors.curve, 2.6);
          line(ctx, map.x(0), map.y(0), map.x(h), map.y(0), colors.alt, 2.4);
          line(ctx, map.x(h), map.y(0), map.x(h), map.y(k), colors.alt, 2.4);
          dot(ctx, map.x(0), map.y(0), colors.soft, colors.bg, 5);
          dot(ctx, map.x(h), map.y(k), colors.alt, colors.bg, 7);
          label(ctx, `(h; k) = (${fmt(h)}; ${fmt(k)})`, map.x(h) + 8, map.y(k) + (a > 0 ? 18 : -8), colors.alt);
        }}
      />
      <div className="fz-controls">
        <Slider label="a" value={a0} min={-3} max={3} step={0.25} onChange={setA} />
        <Slider label="h (trượt ngang)" value={h} min={-5} max={5} step={0.5} onChange={setH} />
        <Slider label="k (trượt dọc)" value={k} min={-6} max={6} step={0.5} onChange={setK} />
      </div>
    </Stage>
  );
}

/* ---------- 4. Nghiệm: biệt thức, Viète, và máy tìm nghiệm bằng Newton ---------- */

export function RootsLab() {
  const [a0, setA] = useState(1);
  const [b, setB] = useState(-5);
  const [c, setC] = useState(4);
  const [x0, setX0] = useState(6);
  const [steps, setSteps] = useState(3);
  const a = safeA(a0);
  const f = fnOf(a, b, c);
  const D = b * b - 4 * a * c;
  const found = findRoots(f, -30, 30, 6000);
  const formula = D < 0 ? [] : D === 0 ? [-b / (2 * a)] : [(-b - Math.sqrt(D)) / (2 * a), (-b + Math.sqrt(D)) / (2 * a)].sort((p, q) => p - q);
  const path = newtonPath(f, x0, steps);
  const last = at(path, path.length - 1);
  return (
    <Stage
      title="Nghiệm là chỗ parabol chạm trục hoành: biệt thức báo trước"
      story={R`Giải $ax^2+bx+c=0$ là hỏi parabol chạm trục hoành ở đâu. Biệt thức $\Delta=b^2-4ac$ báo trước: dương thì cắt hai điểm, bằng 0 thì chạm đúng một điểm (tiếp xúc), âm thì lơ lửng phía trên hoặc dưới, không chạm. Máy tìm nghiệm bằng hai cách không dùng công thức: quét chỗ đổi dấu rồi chia đôi, và phương pháp Newton: từ một điểm bất kì dựng tiếp tuyến, nhảy tới chỗ tiếp tuyến cắt trục, lặp lại.`}
      read={`$${qtex(a, b, c)}=0$, $\\Delta=(${fmt(b, 1)})^2-4\\cdot(${fmt(a)})\\cdot(${fmt(c, 1)})=${fmt(D, 3)}$:${D > 0 ? "hai nghiệm" : D === 0 ? "nghiệm kép" : "vô nghiệm"}. Máy chia đôi tìm ${found.length}: ${found.map((r) => fmt(r, 5)).join("; ") || "không có"}. Công thức $\\frac{-b\\pm\\sqrt{\\Delta}}{2a}$: ${formula.map((r) => fmt(r, 5)).join("; ") || "không có"}.${found.length === 2 ? ` Viète: $x_1+x_2=${fmt(found[0]! + found[1]!, 4)}=-\\frac{b}{a}=${fmt(-b / a, 4)}$, $x_1x_2=${fmt(found[0]! * found[1]!, 4)}=\\frac{c}{a}=${fmt(c / a, 4)}$.` : ""} Newton sau ${path.length - 1} bước từ $${fmt(x0)}$ tới $${fmt(last.x, 6)}$.`}
      why={R`Hoàn thiện bình phương: $a\left(x+\frac{b}{2a}\right)^2=\frac{\Delta}{4a}$. Bình phương không âm nên cần $\frac{\Delta}{4a}$ cùng dấu với $a$, tức $\Delta\ge 0$; lấy căn hai vế được hai nghiệm $\frac{-b\pm\sqrt{\Delta}}{2a}$. Cộng hai nghiệm thì hai căn triệt tiêu ra $-\frac{b}{a}$; nhân thì ra $\frac{c}{a}$ (Viète). Newton dùng tiếp tuyến để «trượt» về nghiệm, rất nhanh vì mỗi bước số chữ số đúng gần như gấp đôi.`}
    >
      <Graph
        label="Parabol, các nghiệm và các bước Newton"
        draw={(ctx, w, hh) => {
          const { colors, map, pad } = frame(ctx, w, hh, -8, 8, -10, 12);
          strokeFn(ctx, map, w, hh, pad, -8, 8, f, colors.curve, 2.6);
          for (let i = 0; i + 1 < path.length; i++) {
            const p0 = path[i] as { x: number; fx: number; slope: number };
            const p1 = path[i + 1] as { x: number };
            dashed(ctx, map.x(p0.x), map.y(p0.fx), map.x(p1.x), map.y(0), colors.alt);
            dashed(ctx, map.x(p0.x), map.y(0), map.x(p0.x), map.y(p0.fx), colors.soft);
            dot(ctx, map.x(p0.x), map.y(p0.fx), colors.alt, colors.bg, 4);
          }
          for (const r of found) dot(ctx, map.x(r), map.y(0), colors.ink, colors.bg, 7);
        }}
      />
      <div className="fz-controls">
        <Slider label="a" value={a0} min={-3} max={3} step={0.25} onChange={setA} />
        <Slider label="b" value={b} min={-8} max={8} step={0.5} onChange={setB} />
        <Slider label="c" value={c} min={-8} max={8} step={0.5} onChange={setC} />
        <Slider label="Newton: điểm xuất phát" value={x0} min={-7} max={7} step={0.5} onChange={setX0} />
        <Slider label="Newton: số bước" value={steps} min={0} max={8} step={1} onChange={setSteps} />
      </div>
    </Stage>
  );
}

/* ---------- 5. Dấu của tam thức và bất phương trình ---------- */

const REL_NAME = { ">": "> 0", "<": "< 0", ">=": "≥ 0", "<=": "≤ 0" } as const;
type Rel = keyof typeof REL_NAME;

function intervalText(list: { lo: number; hi: number }[], closed: boolean): string {
  if (list.length === 0) return "\\varnothing";
  return list.map((o) => {
    const lo = o.lo === -Infinity ? "(-\\infty" : `${closed ? "[" : "("}${fmt(o.lo, 3)}`;
    const hi = o.hi === Infinity ? "+\\infty)" : `${fmt(o.hi, 3)}${closed ? "]" : ")"}`;
    return o.lo === o.hi ? `\\{${fmt(o.lo, 3)}\\}` : `${lo};\\ ${hi}`;
  }).join("\\ \\cup\\ ");
}

export function SignLab() {
  const [a0, setA] = useState(1);
  const [b, setB] = useState(-5);
  const [c, setC] = useState(6);
  const [rel, setRel] = useState<Rel>("<");
  const a = safeA(a0);
  const f = fnOf(a, b, c);
  const D = b * b - 4 * a * c;
  const sol = solveInequality(f, rel, 60);
  let minV = Infinity;
  let maxV = -Infinity;
  for (let i = 0; i <= 8000; i++) { const y = f(-40 + (80 * i) / 8000); minV = Math.min(minV, y); maxV = Math.max(maxV, y); }
  const ruleAlways = a > 0 && D < 0;
  return (
    <Stage
      title="Dấu của tam thức: nhìn parabol so với trục hoành"
      story={R`Dấu của $ax^2+bx+c$ chính là việc parabol nằm trên hay dưới trục hoành. Phần nằm trên trục là chỗ dương, phần dưới là chỗ âm. Máy giải bất phương trình bằng cách tìm nghiệm, rồi thử một điểm trong mỗi khoảng giữa các nghiệm để xem khoảng đó dương hay âm. Các đoạn tô đậm trên trục hoành là tập nghiệm. Sau đó ta xem quy tắc «trong trái ngoài cùng» có khớp không.`}
      read={`$${qtex(a, b, c)}\\ ${REL_NAME[rel]}$: tập nghiệm máy tìm được $${intervalText(sol, rel === ">=" || rel === "<=")}$. $\\Delta=${fmt(D, 3)}$, $a=${fmt(a)}$. ${D > 0 ? `Quy tắc: giữa hai nghiệm trái dấu $a$, ngoài hai nghiệm cùng dấu $a$ (${a > 0 ? "parabol mở lên: giữa là âm, ngoài là dương" : "parabol mở xuống: giữa là dương, ngoài là âm"}).` : D === 0 ? "Quy tắc: $f$ cùng dấu $a$ mọi nơi, trừ tại nghiệm kép nơi bằng 0." : `Quy tắc: $f$ cùng dấu với $a$ với mọi $x$.`} Quét 8000 điểm: nhỏ nhất $${fmt(minV, 3)}$, lớn nhất $${fmt(maxV, 3)}$ (trên $[-40;40]$). «Luôn dương» theo quy tắc $a>0$ và $\\Delta<0$: ${ruleAlways ? "đúng" : "không"}; theo phép quét: ${minV > 0 ? "đúng" : "không"}.`}
      why={R`Từ $f(x)=a\left[\left(x+\frac{b}{2a}\right)^2-\frac{\Delta}{4a^2}\right]$: nếu $\Delta<0$ thì ngoặc luôn dương nên $f$ cùng dấu $a$. Nếu $\Delta>0$ thì $f=a(x-x_1)(x-x_2)$, và tích $(x-x_1)(x-x_2)$ âm đúng khi $x$ nằm giữa hai nghiệm. Do đó «trong trái, ngoài cùng».`}
    >
      <Graph
        label="Parabol và tập nghiệm của bất phương trình trên trục hoành"
        draw={(ctx, w, hh) => {
          const { colors, map, pad } = frame(ctx, w, hh, -8, 8, -10, 12);
          strokeFn(ctx, map, w, hh, pad, -8, 8, f, colors.curve, 2.6);
          for (const o of sol) {
            const lo = Math.max(-8, o.lo);
            const hi = Math.min(8, o.hi);
            if (o.lo === o.hi) dot(ctx, map.x(o.lo), map.y(0), colors.alt, colors.bg, 7);
            else line(ctx, map.x(lo), map.y(0), map.x(hi), map.y(0), colors.alt, 8);
          }
        }}
      />
      <div className="fz-controls">
        <Slider label="a" value={a0} min={-3} max={3} step={0.25} onChange={setA} />
        <Slider label="b" value={b} min={-8} max={8} step={0.5} onChange={setB} />
        <Slider label="c" value={c} min={-8} max={8} step={0.5} onChange={setC} />
        <label className="fz-pick">Bất phương trình
          <select value={rel} onChange={(e) => setRel(e.target.value as Rel)}>{(Object.keys(REL_NAME) as Rel[]).map((r) => <option key={r} value={r}>f(x) {REL_NAME[r]}</option>)}</select>
        </label>
      </div>
    </Stage>
  );
}

/* ---------- 6. Parabol và đường thẳng: cắt, tiếp xúc, không gặp ---------- */

export function LineIntersectLab() {
  const [p, setP] = useState(1);
  const [q, setQ] = useState(-1);
  const g = fnOf(1, -2, -1);
  const line_ = (x: number) => p * x + q;
  const D = (2 + p) ** 2 + 4 * (1 + q);
  const xs = findRoots((x) => g(x) - line_(x), -12, 12, 6000);
  const qTouch = -1 - (2 + p) ** 2 / 4;
  return (
    <Stage
      title="Đường thẳng và parabol: cắt hai điểm, chạm một điểm, hoặc không gặp"
      story={R`Parabol $y=x^2-2x-1$ cố định, đường thẳng $y=px+q$ di chuyển. Kéo $q$ (tịnh tiến lên xuống): lúc đầu đường thẳng cắt parabol hai điểm, nâng dần thì hai điểm gần nhau rồi chập thành một: đường thẳng vừa chạm, gọi là tiếp xúc. Nâng thêm thì không gặp nhau. Giao điểm là nghiệm của phương trình hoành độ, nên số giao điểm do biệt thức quyết định.`}
      read={`Hoành độ giao điểm: $x^2-2x-1=${qtex(0, p, q)}$, tức $${qtex(1, -(2 + p), -(1 + q))}=0$, $\\Delta=${fmt(D, 3)}$. Máy tìm được ${xs.length} giao điểm${xs.length ? `: $x=${xs.map((r) => fmt(r, 4)).join(";\\ ")}$` : ""}. ${Math.abs(D) < 1e-6 ? "Tiếp xúc: nghiệm kép." : ""} Tiếp xúc xảy ra khi $\\Delta=0$, tức $q=-1-\\frac{(2+p)^2}{4}=${fmt(qTouch, 3)}$.`}
      why={R`Số giao điểm bằng số nghiệm của phương trình hoành độ giao điểm. Nghiệm kép nghĩa là hai giao điểm chập làm một, và khi đó đường thẳng có cùng độ dốc với parabol tại điểm đó: nó là tiếp tuyến. Bài toán tham số «tìm $q$ để đường thẳng tiếp xúc» chỉ là giải $\Delta=0$.`}
    >
      <Graph
        label="Parabol cố định và đường thẳng di động"
        draw={(ctx, w, hh) => {
          const { colors, map, pad } = frame(ctx, w, hh, -6, 8, -8, 14);
          strokeFn(ctx, map, w, hh, pad, -6, 8, g, colors.curve, 2.6);
          line(ctx, map.x(-6), map.y(line_(-6)), map.x(8), map.y(line_(8)), Math.abs(D) < 0.15 ? colors.ink : colors.alt, 2.2);
          for (const r of xs) dot(ctx, map.x(r), map.y(g(r)), colors.ink, colors.bg, 7);
        }}
      />
      <div className="fz-controls">
        <Slider label="p (độ dốc đường thẳng)" value={p} min={-6} max={6} step={0.5} onChange={setP} />
        <Slider label="q (độ cao đường thẳng)" value={q} min={-12} max={8} step={0.25} onChange={setQ} />
      </div>
      <Buttons><button type="button" className="text-btn" onClick={() => setQ(Math.round(qTouch * 4) / 4)}>Chỉnh về gần tiếp xúc</button></Buttons>
    </Stage>
  );
}

/* ---------- 7. Hai nghiệm ở hai phía của một số: a·f(α) < 0 ---------- */

export function AlphaLab() {
  const [a0, setA] = useState(1);
  const [b, setB] = useState(-2);
  const [c, setC] = useState(-3);
  const [alpha, setAlpha] = useState(0);
  const a = safeA(a0);
  const f = fnOf(a, b, c);
  const roots = findRoots(f, -30, 30, 6000);
  const left = roots.filter((r) => r < alpha).length;
  const right = roots.filter((r) => r > alpha).length;
  const test = a * f(alpha);
  return (
    <Stage
      title="Số α nằm giữa hai nghiệm khi nào? Chỉ cần xét dấu a·f(α)"
      story={R`Chọn một số $\alpha$ và hỏi: hai nghiệm của parabol nằm hai phía của $\alpha$ hay không? Cách thử rất gọn: đứng tại $\alpha$ và nhìn độ cao đồ thị. Parabol mở lên cắt trục ở hai điểm thì giữa hai điểm đó nó nằm dưới trục. Vậy $\alpha$ ở giữa hai nghiệm khi và chỉ khi đồ thị tại $\alpha$ nằm về phía «trái dấu với $a$».`}
      read={`$f(\\alpha)=${fmt(f(alpha), 4)}$, $a\\cdot f(\\alpha)=${fmt(test, 4)}$ ${test < 0 ? "< 0" : "≥ 0"}. Máy đếm nghiệm: ${left} nghiệm bên trái $\\alpha$, ${right} nghiệm bên phải. ${test < 0 ? (left === 1 && right === 1 ? "Khớp: hai nghiệm ở hai phía." : "Không khớp, kiểm lại.") : "Không phải hai phía của α."}`}
      why={R`Nếu $x_1<\alpha<x_2$ thì $\alpha$ nằm giữa hai nghiệm nên $f(\alpha)$ trái dấu $a$, tức $a\,f(\alpha)<0$. Ngược lại, nếu $a\,f(\alpha)<0$ thì $f$ nhận một giá trị trái dấu $a$ nên không thể $\Delta\le 0$ (khi đó $f$ luôn cùng dấu $a$): tự động có hai nghiệm, và $\alpha$ nằm giữa. Điều kiện gọn vì đã chứa sẵn $\Delta>0$.`}
    >
      <Graph
        label="Parabol, các nghiệm và số α"
        draw={(ctx, w, hh) => {
          const { colors, map, pad } = frame(ctx, w, hh, -8, 8, -10, 12);
          strokeFn(ctx, map, w, hh, pad, -8, 8, f, colors.curve, 2.6);
          dashed(ctx, map.x(alpha), map.y(-10), map.x(alpha), map.y(12), colors.alt);
          dot(ctx, map.x(alpha), map.y(f(alpha)), test < 0 ? colors.alt : colors.ink, colors.bg, 7);
          for (const r of roots) dot(ctx, map.x(r), map.y(0), colors.ink, colors.bg, 6);
          label(ctx, "α", map.x(alpha) + 6, map.y(11), colors.alt);
        }}
      />
      <div className="fz-controls">
        <Slider label="a" value={a0} min={-3} max={3} step={0.25} onChange={setA} />
        <Slider label="b" value={b} min={-8} max={8} step={0.5} onChange={setB} />
        <Slider label="c" value={c} min={-8} max={8} step={0.5} onChange={setC} />
        <Slider label="α" value={alpha} min={-6} max={6} step={0.25} onChange={setAlpha} />
      </div>
    </Stage>
  );
}

/* ---------- 8. Giá trị lớn nhất, nhỏ nhất trên một đoạn ---------- */

export function IntervalLab() {
  const [a0, setA] = useState(-1);
  const [b, setB] = useState(4);
  const [c, setC] = useState(-1);
  const [p, setP] = useState(2.5);
  const [q, setQ] = useState(5);
  const a = safeA(a0);
  const f = fnOf(a, b, c);
  const lo = Math.min(p, q - 0.25);
  const hi = Math.max(q, lo + 0.25);
  const h = -b / (2 * a);
  const inside = h >= lo && h <= hi;
  const cands = [{ x: lo, y: f(lo), tag: "đầu mút trái" }, { x: hi, y: f(hi), tag: "đầu mút phải" }, ...(inside ? [{ x: h, y: f(h), tag: "đỉnh" }] : [])];
  const best = cands.reduce((m, e) => (e.y > m.y ? e : m));
  const worst = cands.reduce((m, e) => (e.y < m.y ? e : m));
  let sMax = -Infinity;
  let sMin = Infinity;
  for (let i = 0; i <= 6000; i++) { const y = f(lo + ((hi - lo) * i) / 6000); sMax = Math.max(sMax, y); sMin = Math.min(sMin, y); }
  return (
    <Stage
      title="Lớn nhất, nhỏ nhất trên một đoạn: đỉnh có thuộc đoạn không?"
      story={R`Chỉ nhìn đoạn đã chọn (vùng tô). Nếu đỉnh parabol rơi vào đoạn thì nó là một ứng viên, còn nếu nằm ngoài thì trong đoạn đường cong chỉ đi một chiều (lên mãi hoặc xuống mãi) nên cực trị phải ở một đầu mút. Máy so các ứng viên rồi quét 6000 điểm để kiểm.`}
      read={`Đoạn $[${fmt(lo, 2)};\\ ${fmt(hi, 2)}]$, hoành độ đỉnh $-\\frac{b}{2a}=${fmt(h, 3)}$ ${inside ? "thuộc" : "không thuộc"} đoạn. Ứng viên: ${cands.map((e) => `${e.tag} $y=${fmt(e.y, 3)}$`).join("; ")}. Lớn nhất $${fmt(best.y, 4)}$ (${best.tag}), nhỏ nhất $${fmt(worst.y, 4)}$ (${worst.tag}). Quét 6000 điểm cho $${fmt(sMax, 4)}$ và $${fmt(sMin, 4)}$.`}
      why={R`Parabol đơn điệu ở mỗi bên đỉnh. Khi đoạn nằm trọn một bên đỉnh, hàm chỉ tăng hoặc chỉ giảm trên đoạn nên cực trị ở đầu mút. Khi đỉnh nằm trong đoạn thì đỉnh là điểm thấp nhất (nếu mở lên) hoặc cao nhất (nếu mở xuống), còn phía kia là đầu mút xa đỉnh hơn.`}
    >
      <Graph
        label="Parabol, đoạn khảo sát và các ứng viên"
        draw={(ctx, w, hh) => {
          const { colors, map, pad } = frame(ctx, w, hh, -4, 9, -12, 8);
          ctx.fillStyle = colors.curve;
          ctx.globalAlpha = 0.12;
          ctx.fillRect(map.x(lo), 0, map.x(hi) - map.x(lo), hh);
          ctx.globalAlpha = 1;
          strokeFn(ctx, map, w, hh, pad, -4, 9, f, colors.curve, 2.6);
          for (const e of cands) dot(ctx, map.x(e.x), map.y(e.y), e === best ? colors.ink : e === worst ? colors.alt : colors.bg, colors.curve, 6);
          dashed(ctx, map.x(h), map.y(-12), map.x(h), map.y(8), colors.soft);
        }}
      />
      <div className="fz-controls">
        <Slider label="a" value={a0} min={-3} max={3} step={0.25} onChange={setA} />
        <Slider label="b" value={b} min={-8} max={8} step={0.5} onChange={setB} />
        <Slider label="c" value={c} min={-6} max={6} step={0.5} onChange={setC} />
        <Slider label="Đầu mút trái" value={p} min={-3} max={7} step={0.25} onChange={setP} />
        <Slider label="Đầu mút phải" value={q} min={-2} max={8} step={0.25} onChange={setQ} />
      </div>
    </Stage>
  );
}

/* ---------- 9. Nơ-ron học hệ số a, b, c từ dữ liệu đo ---------- */

function makeShots(seed: number): { x: number; y: number }[] {
  const r = mulberry32(seed);
  const a = -5; const b = 20; const c = 1;
  return Array.from({ length: 22 }, (_, i) => {
    const x = (i / 21) * 4;
    return { x, y: a * x * x + b * x + c + (r() - 0.5) * 3 };
  });
}

export function FitLab() {
  const [seed, setSeed] = useState(21);
  const [epoch, setEpoch] = useState(0);
  const [running, setRunning] = useState(false);
  const points = useMemo(() => makeShots(seed), [seed]);
  const history = useMemo(() => fitQuadratic(points, 4000, 0.3), [points]);
  const cur = at(history, epoch);
  useTicker(running, 50, () => {
    if (epoch >= history.length - 1) setRunning(false);
    else setEpoch(Math.min(history.length - 1, epoch + 60));
  });
  const f = fnOf(cur.a, cur.b, cur.c);
  const vx = Math.abs(cur.a) < 1e-9 ? 0 : -cur.b / (2 * cur.a);
  const flight = findRoots(f, 0.2, 8, 4000);
  return (
    <Stage
      title="Nơ-ron học hệ số a, b, c từ các lần đo quả bóng"
      story={R`Ném quả bóng, đo độ cao ở 22 thời điểm; mỗi số đo lệch đi một chút vì thước không hoàn hảo. Ta không biết quy luật, chỉ biết nó có dạng $y=ax^2+bx+c$. Một nơ-ron bắt đầu với $a=b=c=0$. Mỗi vòng, nó đo độ lệch giữa đường hiện tại và các điểm đo, rồi chỉnh ba hệ số theo hướng làm độ lệch giảm. Sau vài trăm vòng, đường cong ôm sát dữ liệu.`}
      read={`Vòng ${epoch}: $y=${qtex(cur.a, cur.b, cur.c)}$, sai số bình phương trung bình $${fmt(cur.loss, 4)}$. Sự thật được dùng để sinh dữ liệu: $a=-5$, $b=20$, $c=1$. Nơ-ron đã học: $a=${fmt(cur.a, 3)}$, $b=${fmt(cur.b, 3)}$, $c=${fmt(cur.c, 3)}$. Từ đường cong học được suy ra: đỉnh tại $t=-\\frac{b}{2a}=${fmt(vx, 3)}$ s (đúng 2), cao $${fmt(f(vx), 3)}$ m (đúng 21), bóng chạm đất lúc $t=${flight.length ? fmt(flight[flight.length - 1] as number, 3) : "?"}$ s.`}
      why={R`Đây là bài toán hạ gradient: sai số là một hàm của ba ẩn $a,b,c$, bước theo hướng ngược độ dốc của nó. Điều thú vị là hàm sai số cũng là một «parabol nhiều chiều» có đúng một đáy, nên thuật toán luôn tìm được đáy. Từ ba hệ số, mọi công thức của chuyên đề (đỉnh, nghiệm) cho ta biết độ cao lớn nhất và thời điểm chạm đất.`}
    >
      <Graph
        label="Các điểm đo và đường parabol mà nơ-ron học được"
        draw={(ctx, w, hh) => {
          const { colors, map, pad } = frame(ctx, w, hh, -0.2, 4.6, -3, 26, "t (s)", "h (m)");
          strokeFn(ctx, map, w, hh, pad, 0, 4.4, fnOf(-5, 20, 1), colors.soft, 1.4);
          strokeFn(ctx, map, w, hh, pad, 0, 4.4, f, colors.alt, 2.8);
          for (const pt of points) dot(ctx, map.x(pt.x), map.y(pt.y), colors.curve, colors.bg, 4);
          dot(ctx, map.x(vx), map.y(f(vx)), colors.ink, colors.bg, 6);
        }}
      />
      <div className="fz-controls">
        <Slider label="Số vòng đã học" value={epoch} min={0} max={4000} step={20} onChange={(v) => { setRunning(false); setEpoch(v); }} />
      </div>
      <Buttons>
        <button type="button" className="text-btn" onClick={() => { if (epoch >= history.length - 1) setEpoch(0); setRunning(!running); }}>{running ? "Dừng" : "Cho nơ-ron học"}</button>
        <button type="button" className="text-btn" onClick={() => { setRunning(false); setEpoch(0); setSeed(freshSeed() % 100000); }}>Đo lại (dữ liệu mới)</button>
      </Buttons>
    </Stage>
  );
}
