import { useMemo, useState } from "react";
import { findRoots, measureWave, rotateBy, triangleSAS } from "../../algo/index.ts";
import { dashed, dot, strokeFn } from "../../labs/draw.ts";
import { Graph } from "../../labs/Graph.tsx";
import { fmt } from "../../lib/format.ts";
import { Slider } from "../../ui/Slider.tsx";
import { frame, label, line, en, useTx } from "./kit.ts";
import { Stage } from "./widgets.tsx";

const R = String.raw;
const TAU = 2 * Math.PI;

function circle(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, color: string) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.4;
  ctx.arc(cx, cy, r, 0, TAU);
  ctx.stroke();
}

/* ---------- Góc đối, bù, phụ, hơn kém nửa vòng: lật điểm ---------- */

const RELATIONS = {
  doi: { name: "góc đối  −α", beta: (a: number) => -a, how: "lật qua trục hoành", flip: (p: { x: number; y: number }) => ({ x: p.x, y: -p.y }) },
  bu: { name: "góc bù  π − α", beta: (a: number) => Math.PI - a, how: "lật qua trục tung", flip: (p: { x: number; y: number }) => ({ x: -p.x, y: p.y }) },
  phu: { name: "góc phụ  π/2 − α", beta: (a: number) => Math.PI / 2 - a, how: "lật qua đường chéo y = x (đổi chỗ hai toạ độ)", flip: (p: { x: number; y: number }) => ({ x: p.y, y: p.x }) },
  hon: { name: "hơn kém nửa vòng  α + π", beta: (a: number) => a + Math.PI, how: "lật qua gốc toạ độ (đổi dấu cả hai toạ độ)", flip: (p: { x: number; y: number }) => ({ x: -p.x, y: -p.y }) },
} as const;

type RelKey = keyof typeof RELATIONS;

export function ReflectLab() {
  const tt = useTx();
  const [alpha, setAlpha] = useState(0.6);
  const [key, setKey] = useState<RelKey>("bu");
  const rel = RELATIONS[key];
  const p = { x: Math.cos(alpha), y: Math.sin(alpha) };
  const q = rel.flip(p);
  const beta = rel.beta(alpha);
  const err = Math.hypot(q.x - Math.cos(beta), q.y - Math.sin(beta));
  return (
    <Stage
      title={tt(R`Lật điểm trên đường tròn: vì sao có góc đối, bù, phụ`, R`Flipping points on the circle: why there are opposite, supplementary and complementary angles`)}
      story={tt(R`Đừng học thuộc bảng góc liên quan. Hãy vẽ điểm ứng với góc α, rồi lật nó qua một trục (như soi gương). Điểm lật là điểm của một góc khác, và hai toạ độ của nó cho ngay công thức. Bốn phép lật dưới đây là bốn nhóm công thức.`, R`Do not memorise a table of related angles. Draw the point for angle α, then flip it across an axis (like a mirror). The flipped point belongs to another angle, and its two coordinates give the formula at once. Four flips below are four families of formulas.`)}
      read={tt(`${rel.name}: ${rel.how}. Điểm gốc $(\\cos\\alpha;\\sin\\alpha)=(${fmt(p.x, 3)};${fmt(p.y, 3)})$, điểm lật $(${fmt(q.x, 3)};${fmt(q.y, 3)})$. Máy tính trực tiếp $(\\cos\\beta;\\sin\\beta)=(${fmt(Math.cos(beta), 3)};${fmt(Math.sin(beta), 3)})$. Lệch $${fmt(err, 12)}$.`, `${tt(rel.name, en(rel.name))}: ${tt(rel.how, en(rel.how))}. Original point $(\\cos\\alpha;\\sin\\alpha)=(${fmt(p.x, 3)};${fmt(p.y, 3)})$, flipped point $(${fmt(q.x, 3)};${fmt(q.y, 3)})$. Computed directly $(\\cos\\beta;\\sin\\beta)=(${fmt(Math.cos(beta), 3)};${fmt(Math.sin(beta), 3)})$. Difference $${fmt(err, 12)}$.`)}
      why={tt(R`Phép lật chỉ đổi dấu hoặc đổi chỗ hai toạ độ, nên $\cos$ và $\sin$ của góc mới chính là $\pm\cos\alpha$ hoặc $\pm\sin\alpha$ (hoặc đổi vai cho nhau với góc phụ). Đó là toàn bộ bảng «góc liên quan»: không có gì để thuộc, chỉ cần soi gương.`, R`A flip only changes the sign or swaps the two coordinates, so the $\cos$ and $\sin$ of the new angle are $\pm\cos\alpha$ or $\pm\sin\alpha$ (or exchange roles for the complementary angle). That is the whole table of «related angles»: nothing to memorise, just look in a mirror.`)}
    >
      <Graph
        label={tt("Điểm ứng với góc α và ảnh của nó sau phép lật", "The point for angle α and its image after the flip")}
        draw={(ctx, w, h) => {
          const { colors, map } = frame(ctx, w, h, -1.6, 1.6, -1.4, 1.4, "x", "y", true);
          circle(ctx, map.x(0), map.y(0), map.x(1) - map.x(0), colors.soft);
          if (key === "doi") dashed(ctx, map.x(-1.6), map.y(0), map.x(1.6), map.y(0), colors.alt);
          if (key === "bu") dashed(ctx, map.x(0), map.y(-1.4), map.x(0), map.y(1.4), colors.alt);
          if (key === "phu") dashed(ctx, map.x(-1.4), map.y(-1.4), map.x(1.4), map.y(1.4), colors.alt);
          line(ctx, map.x(0), map.y(0), map.x(p.x), map.y(p.y), colors.curve, 2.4);
          line(ctx, map.x(0), map.y(0), map.x(q.x), map.y(q.y), colors.alt, 2.4);
          dashed(ctx, map.x(p.x), map.y(p.y), map.x(q.x), map.y(q.y), colors.soft);
          dot(ctx, map.x(p.x), map.y(p.y), colors.curve, colors.bg, 7);
          dot(ctx, map.x(q.x), map.y(q.y), colors.alt, colors.bg, 7);
          label(ctx, "α", map.x(p.x) + 8, map.y(p.y) - 6, colors.curve);
          label(ctx, "β", map.x(q.x) + 8, map.y(q.y) - 6, colors.alt);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Góc α (rad)", "Angle α (rad)")} value={alpha} min={0.05} max={1.55} step={0.05} onChange={setAlpha} />
        <label className="fz-pick">{tt("Phép lật", "Flip")}
          <select value={key} onChange={(e) => setKey(e.target.value as RelKey)}>
            {(Object.keys(RELATIONS) as RelKey[]).map((k) => <option key={k} value={k}>{tt(RELATIONS[k].name, en(RELATIONS[k].name))}</option>)}
          </select>
        </label>
      </div>
    </Stage>
  );
}

/* ---------- Công thức cộng = phép quay ---------- */

export function AdditionLab() {
  const tt = useTx();
  const [a, setA] = useState(0.7);
  const [b, setB] = useState(0.9);
  const [same, setSame] = useState(false);
  const bb = same ? a : b;
  const P = { x: Math.cos(a), y: Math.sin(a) };
  const rot = rotateBy(P, Math.cos(bb), Math.sin(bb));
  const t1 = Math.cos(a) * Math.cos(bb);
  const t2 = Math.sin(a) * Math.sin(bb);
  const s1 = Math.sin(a) * Math.cos(bb);
  const s2 = Math.cos(a) * Math.sin(bb);
  return (
    <Stage
      title={tt(R`Công thức cộng là phép quay`, R`The addition formula is a rotation`)}
      story={tt(R`Điểm P ứng với góc a. Quay cả điểm một góc b nữa thì nó tới điểm ứng với góc a+b. Phép quay có công thức toạ độ rất gọn: toạ độ mới là tổ hợp của toạ độ cũ với cos b và sin b. Chạy phép quay bằng nhân ma trận, rồi so với cos(a+b) và sin(a+b) tính trực tiếp.`, R`The point P corresponds to angle a. Rotate the whole point by a further angle b and it lands on the point for angle a+b. A rotation has a very compact coordinate formula: the new coordinates are combinations of the old ones with cos b and sin b. The machine performs the rotation as a matrix product, then compares with cos(a+b) and sin(a+b) computed directly.`)}
      read={tt(`Sau khi quay: $\\cos(a+b)=\\cos a\\cos b-\\sin a\\sin b=${fmt(t1, 4)}-${fmt(t2, 4)}=${fmt(rot.x, 4)}$. $\\sin(a+b)=\\sin a\\cos b+\\cos a\\sin b=${fmt(s1, 4)}+${fmt(s2, 4)}=${fmt(rot.y, 4)}$. Tính trực tiếp: $${fmt(Math.cos(a + bb), 4)}$ và $${fmt(Math.sin(a + bb), 4)}$.${same ? ` Khi $b=a$ đó là công thức nhân đôi: $\\sin 2a=2\\sin a\\cos a=${fmt(2 * Math.sin(a) * Math.cos(a), 4)}$.` : ""}`, `After rotating: $\\cos(a+b)=\\cos a\\cos b-\\sin a\\sin b=${fmt(t1, 4)}-${fmt(t2, 4)}=${fmt(rot.x, 4)}$. $\\sin(a+b)=\\sin a\\cos b+\\cos a\\sin b=${fmt(s1, 4)}+${fmt(s2, 4)}=${fmt(rot.y, 4)}$. Computed directly: $${fmt(Math.cos(a + bb), 4)}$ and $${fmt(Math.sin(a + bb), 4)}$.${same ? ` When $b=a$ this is the double-angle formula: $\\sin 2a=2\\sin a\\cos a=${fmt(2 * Math.sin(a) * Math.cos(a), 4)}$.` : ""}`)}
      why={tt(R`Quay P một góc b là xoay hai vectơ đơn vị: vectơ ngang $(1;0)$ thành $(\cos b;\sin b)$ và vectơ dọc $(0;1)$ thành $(-\sin b;\cos b)$. Điểm $P=\cos a\cdot(1;0)+\sin a\cdot(0;1)$ nên ảnh của nó là $\cos a\cdot(\cos b;\sin b)+\sin a\cdot(-\sin b;\cos b)$. Đọc từng toạ độ chính là hai công thức cộng. Đặt $b=a$ thì ra công thức nhân đôi.`, R`Rotating P by an angle b rotates two unit vectors: the horizontal vector $(1;0)$ becomes $(\cos b;\sin b)$ and the vertical vector $(0;1)$ becomes $(-\sin b;\cos b)$. Since $P=\cos a\cdot(1;0)+\sin a\cdot(0;1)$, its image is $\cos a\cdot(\cos b;\sin b)+\sin a\cdot(-\sin b;\cos b)$. Reading off each coordinate gives the two addition formulas. Setting $b=a$ gives the double-angle formulas.`)}
    >
      <Graph
        label={tt("Điểm P và ảnh của nó sau phép quay", "The point P and its image after the rotation")}
        draw={(ctx, w, h) => {
          const { colors, map } = frame(ctx, w, h, -1.6, 1.6, -1.4, 1.4, "x", "y", true);
          circle(ctx, map.x(0), map.y(0), map.x(1) - map.x(0), colors.soft);
          line(ctx, map.x(0), map.y(0), map.x(P.x), map.y(P.y), colors.curve, 2.4);
          line(ctx, map.x(0), map.y(0), map.x(rot.x), map.y(rot.y), colors.alt, 2.4);
          dashed(ctx, map.x(rot.x), map.y(rot.y), map.x(rot.x), map.y(0), colors.alt);
          dashed(ctx, map.x(rot.x), map.y(rot.y), map.x(0), map.y(rot.y), colors.alt);
          dot(ctx, map.x(P.x), map.y(P.y), colors.curve, colors.bg, 6);
          dot(ctx, map.x(rot.x), map.y(rot.y), colors.alt, colors.bg, 7);
          label(ctx, tt("P (góc a)", "P (angle a)"), map.x(P.x) + 8, map.y(P.y) - 6, colors.curve);
          label(ctx, tt("ảnh (góc a+b)", "image (angle a+b)"), map.x(rot.x) + 8, map.y(rot.y) - 6, colors.alt);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Góc a (rad)", "Angle a (rad)")} value={a} min={0} max={3.1} step={0.05} onChange={setA} />
        <Slider label={tt("Góc quay thêm b (rad)", "Extra rotation b (rad)")} value={same ? a : b} min={0} max={3.1} step={0.05} onChange={(v) => { setSame(false); setB(v); }} />
        <label className="fz-pick"><span>{tt("Đặt b = a (nhân đôi)", "Set b = a (doubling)")}</span>
          <input type="checkbox" checked={same} onChange={(e) => setSame(e.target.checked)} />
        </label>
      </div>
    </Stage>
  );
}

/* ---------- Sóng: biên độ, chu kì, pha đo được bằng mẫu ---------- */

export function WaveLab() {
  const tt = useTx();
  const [A, setA] = useState(2);
  const [w, setW] = useState(1.5);
  const [phi, setPhi] = useState(0.8);
  const [C, setC] = useState(0.5);
  const f = (x: number) => A * Math.sin(w * x + phi) + C;
  const m = useMemo(() => measureWave((x) => A * Math.sin(w * x + phi) + C, 0, 40), [A, w, phi, C]);
  const peak = ((Math.PI / 2 - phi) / w + TAU / w * 4) % (TAU / w);
  return (
    <Stage
      title={tt(R`Đu quay vẽ ra sóng: biên độ, chu kì, pha`, R`A Ferris wheel draws a wave: amplitude, period, phase`)}
      story={tt(R`Ngồi trên đu quay, độ cao của bạn theo thời gian là một đường sóng. Đu quay to thì sóng cao (biên độ), quay nhanh thì sóng dày (chu kì ngắn), xuất phát sớm hay muộn thì sóng bị dịch trái hoặc phải (pha), và trục của đu quay đặt cao hay thấp thì cả sóng dịch lên xuống. Máy đo sóng bằng cách lấy mẫu rồi xem cao nhất, thấp nhất và bao lâu thì lặp lại, không dùng công thức.`, R`Sit on a Ferris wheel and your height over time is a wave. A big wheel gives a tall wave (amplitude), a fast wheel gives a dense wave (short period), starting early or late shifts the wave left or right (phase), and a high or low axle shifts the whole wave up or down. The machine measures the wave by sampling and reading off the highest value, the lowest value and how long it takes to repeat, with no formula.`)}
      read={tt(`Đo bằng mẫu: biên độ $${fmt(m.amplitude, 4)}$, mức giữa $${fmt(m.centre, 4)}$, chu kì $${m.period === null ? "?" : fmt(m.period, 4)}$. Công thức: $|A|=${fmt(Math.abs(A))}$, $C=${fmt(C)}$, $\\frac{2\\pi}{|\\omega|}=${fmt(TAU / Math.abs(w), 4)}$. Đỉnh sóng đầu tiên sau $x=0$ ở $x=${fmt(peak, 3)}$.`, `Measured by sampling: amplitude $${fmt(m.amplitude, 4)}$, middle level $${fmt(m.centre, 4)}$, period $${m.period === null ? "?" : fmt(m.period, 4)}$. Formulas: $|A|=${fmt(Math.abs(A))}$, $C=${fmt(C)}$, $\\frac{2\\pi}{|\\omega|}=${fmt(TAU / Math.abs(w), 4)}$. The first peak after $x=0$ is at $x=${fmt(peak, 3)}$.`)}
      why={tt(R`Hàm $\sin$ chạy từ $-1$ đến $1$ nên $A\sin(\cdot)+C$ chạy từ $C-|A|$ đến $C+|A|$. Sóng lặp lại khi biểu thức trong sin tăng đúng một vòng $2\pi$; biểu thức đó tăng $\omega$ cho mỗi đơn vị $x$, nên chu kì là $\frac{2\pi}{|\omega|}$. Đỉnh đầu tiên khi $\omega x+\varphi=\frac{\pi}{2}$.`, R`The sine runs from $-1$ to $1$, so $A\sin(\cdot)+C$ runs from $C-|A|$ to $C+|A|$. The wave repeats when the argument of the sine grows by exactly one turn $2\pi$; the argument grows by $\omega$ per unit of $x$, so the period is $\frac{2\pi}{|\omega|}$. The first peak is when $\omega x+\varphi=\frac{\pi}{2}$.`)}
    >
      <Graph
        label={tt("Đồ thị sóng và các số đo", "The wave graph and its measurements")}
        draw={(ctx, wd, ht) => {
          const { colors, map, pad } = frame(ctx, wd, ht, -1, 12, -4.5, 4.5);
          strokeFn(ctx, map, wd, ht, pad, -1, 12, f, colors.curve, 2.6);
          dashed(ctx, map.x(-1), map.y(C + Math.abs(A)), map.x(12), map.y(C + Math.abs(A)), colors.soft);
          dashed(ctx, map.x(-1), map.y(C - Math.abs(A)), map.x(12), map.y(C - Math.abs(A)), colors.soft);
          dashed(ctx, map.x(-1), map.y(C), map.x(12), map.y(C), colors.alt);
          if (m.period !== null) {
            line(ctx, map.x(peak), map.y(C + Math.abs(A)) - 8, map.x(peak + m.period), map.y(C + Math.abs(A)) - 8, colors.alt, 2);
            label(ctx, tt("một chu kì", "one period"), map.x(peak), map.y(C + Math.abs(A)) - 14, colors.alt);
          }
          dot(ctx, map.x(peak), map.y(C + Math.abs(A)), colors.alt, colors.bg, 5);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("A (biên độ)", "A (amplitude)")} value={A} min={0.5} max={4} step={0.25} onChange={setA} />
        <Slider label={tt("ω (quay nhanh cỡ nào)", "ω (how fast it turns)")} value={w} min={0.5} max={5} step={0.1} onChange={setW} />
        <Slider label={tt("φ (pha xuất phát)", "φ (starting phase)")} value={phi} min={-3} max={3} step={0.1} onChange={setPhi} />
        <Slider label={tt("C (độ cao trục)", "C (height of the axis)")} value={C} min={-2} max={2} step={0.25} onChange={setC} />
      </div>
    </Stage>
  );
}

/* ---------- Giải phương trình lượng giác: đường ngang cắt sóng ---------- */

type Kind = "sin" | "cos" | "tan";

export function SolveLab() {
  const tt = useTx();
  const [kind, setKind] = useState<Kind>("sin");
  const [m, setM] = useState(0.5);
  const fn = kind === "sin" ? Math.sin : kind === "cos" ? Math.cos : Math.tan;
  const lo = -TAU;
  const hi = TAU;
  const found = findRoots((x) => fn(x) - m, lo, hi);
  const alpha = kind === "sin" ? Math.asin(m) : kind === "cos" ? Math.acos(m) : Math.atan(m);
  const formula: number[] = [];
  for (let k = -4; k <= 4; k++) {
    const add = (x: number) => { if (x >= lo - 1e-9 && x <= hi + 1e-9) formula.push(x); };
    if (kind === "sin") { add(alpha + k * TAU); add(Math.PI - alpha + k * TAU); }
    if (kind === "cos") { add(alpha + k * TAU); add(-alpha + k * TAU); }
    if (kind === "tan") add(alpha + k * Math.PI);
  }
  formula.sort((x, y) => x - y);
  const none = (kind !== "tan" && Math.abs(m) > 1);
  const cleaned = none ? [] : formula;
  const gap = found.length === cleaned.length ? Math.max(0, ...found.map((r, i) => Math.abs(r - (cleaned[i] as number)))) : NaN;
  const yRange = kind === "tan" ? 6 : 1.6;
  return (
    <Stage
      title={tt(R`Giải phương trình lượng giác: đường ngang cắt đường sóng`, R`Solving trigonometric equations: a horizontal line cutting the wave`)}
      story={tt(R`Giải sin x = m là hỏi: những giá trị x nào làm đường sóng cao đúng m? Kéo một thanh ngang ở độ cao m, mỗi chỗ nó cắt sóng là một nghiệm. Máy tìm chỗ cắt bằng cách chia đôi, rồi so với công thức nghiệm. Sóng lặp lại nên có vô số nghiệm, xếp đều theo chu kì.`, R`Solving sin x = m asks: for which x is the wave exactly m high? Slide a horizontal bar to height m; each place it crosses the wave is a solution. The machine finds the crossings by bisection, then compares with the solution formula. The wave repeats, so there are infinitely many solutions, evenly spaced by the period.`)}
      read={tt(none
        ? `Với $m=${fmt(m)}$ lớn hơn $1$ về độ lớn, đường ngang không cắt sóng: vô nghiệm. Đó là lý do điều kiện $|m|\\le 1$.`
        : `Máy tìm được ${found.length} nghiệm trong $[-2\\pi;2\\pi]$: ${found.slice(0, 8).map((r) => fmt(r, 3)).join("; ")}. Công thức cho ${cleaned.length} nghiệm${Number.isFinite(gap) ? `, lệch lớn nhất giữa hai cách $${fmt(gap, 12)}$` : ""}. Góc cơ sở $\\alpha=${fmt(alpha, 4)}$.`, none
        ? `For $m=${fmt(m)}$ is larger than $1$ in size, the horizontal line misses the wave: no solution. That is why the condition $|m|\\le 1$ is needed.`
        : `The machine finds ${found.length} solutions in $[-2\\pi;2\\pi]$: ${found.slice(0, 8).map((r) => fmt(r, 3)).join("; ")}. The formula gives ${cleaned.length} solutions${Number.isFinite(gap) ? `, the largest gap between the two methods $${fmt(gap, 12)}$` : ""}. Base angle $\\alpha=${fmt(alpha, 4)}$.`)}
      why={tt(kind === "sin"
        ? "Trên đường tròn, hai điểm có cùng độ cao nên $\\sin x=\\sin\\alpha$ có hai họ nghiệm: $x=\\alpha+k2\\pi$ và $x=\\pi-\\alpha+k2\\pi$. Trên đồ thị, đó là hai chỗ cắt trong mỗi chu kì."
        : kind === "cos"
          ? "Hai điểm có cùng vị trí ngang đối xứng qua trục hoành nên $\\cos x=\\cos\\alpha$ cho $x=\\pm\\alpha+k2\\pi$."
          : "Hai điểm đối diện qua tâm cho cùng độ dốc, cách nhau nửa vòng, nên $\\tan x=m$ chỉ cần một họ nghiệm $x=\\alpha+k\\pi$.", kind === "sin" ? R`On the circle, two points have the same height, so $\sin x=\sin\alpha$ has two families of solutions: $x=\alpha+k2\pi$ and $x=\pi-\alpha+k2\pi$. On the graph these are the two crossings in each period.` : kind === "cos" ? R`Two points with the same horizontal position are mirror images across the horizontal axis, so $\cos x=\cos\alpha$ gives $x=\pm\alpha+k2\pi$.` : R`Two points opposite each other through the centre give the same slope and are half a turn apart, so $\tan x=m$ needs only one family $x=\alpha+k\pi$.`)}
    >
      <Graph
        label={tt("Đường ngang cắt đồ thị lượng giác", "A horizontal line cutting the trigonometric graph")}
        draw={(ctx, wd, ht) => {
          const { colors, map, pad } = frame(ctx, wd, ht, lo, hi, -yRange, yRange);
          strokeFn(ctx, map, wd, ht, pad, lo, hi, fn, colors.curve, 2.4);
          dashed(ctx, map.x(lo), map.y(m), map.x(hi), map.y(m), colors.alt);
          for (const r of found) dot(ctx, map.x(r), map.y(m), colors.alt, colors.bg, 5);
        }}
      />
      <div className="fz-controls">
        <label className="fz-pick">{tt("Phương trình", "Equation")}
          <select value={kind} onChange={(e) => { const k = e.target.value as Kind; setKind(k); if (k === "tan") setM(1); }}>
            <option value="sin">sin x = m</option><option value="cos">cos x = m</option><option value="tan">tan x = m</option>
          </select>
        </label>
        <Slider label={tt("m (độ cao đường ngang)", "m (height of the horizontal line)")} value={m} min={kind === "tan" ? -4 : -1.4} max={kind === "tan" ? 4 : 1.4} step={0.05} onChange={setM} />
      </div>
    </Stage>
  );
}

/* ---------- Tam giác: định lí cosin, sin, diện tích ---------- */

export function TriangleLab() {
  const tt = useTx();
  const [b, setB] = useState(5);
  const [c, setC] = useState(7);
  const [A, setA] = useState(1.05);
  const t = triangleSAS(b, c, A);
  const cosLaw = Math.sqrt(b * b + c * c - 2 * b * c * Math.cos(A));
  const ratios = [t.a / Math.sin(t.angA), t.b / Math.sin(t.angB), t.c / Math.sin(t.angC)];
  return (
    <Stage
      title={tt(R`Dựng tam giác bằng toạ độ rồi đo: cosin, sin, diện tích`, R`Build the triangle from coordinates, then measure: cosine, sine, area`)}
      story={tt(R`Đặt đỉnh A ở gốc, cạnh c nằm dọc trục ngang, cạnh b chếch một góc A. Khi đã có toạ độ ba đỉnh, mọi số đo đều tính bằng khoảng cách và tích vô hướng, không cần công thức tam giác nào. Sau đó ta xem các công thức nổi tiếng có khớp với số đo thật không.`, R`Put vertex A at the origin, side c along the horizontal axis and side b tilted by the angle A. Once the three vertices have coordinates, every measurement is just a distance or a dot product, with no triangle formula needed. Then we check whether the famous formulas match the measured values.`)}
      read={tt(`Cạnh $a$ đo bằng toạ độ: $${fmt(t.a, 4)}$. Định lí cosin $\\sqrt{b^2+c^2-2bc\\cos A}=${fmt(cosLaw, 4)}$. Các góc đo được: $A=${fmt(t.angA, 3)}$, $B=${fmt(t.angB, 3)}$, $C=${fmt(t.angC, 3)}$, tổng $=${fmt(t.angA + t.angB + t.angC, 4)}$ ($=\\pi$). Tỉ số $\\frac{a}{\\sin A}=${fmt(ratios[0] as number, 4)}$, $\\frac{b}{\\sin B}=${fmt(ratios[1] as number, 4)}$, $\\frac{c}{\\sin C}=${fmt(ratios[2] as number, 4)}$, còn $2R=${fmt(2 * t.R, 4)}$. Diện tích $\\frac{1}{2}bc\\sin A=${fmt(0.5 * b * c * Math.sin(A), 4)}$, $\\frac{abc}{4R}=${fmt((t.a * t.b * t.c) / (4 * t.R), 4)}$, tích có hướng $${fmt(t.area, 4)}$.`, `Side $a$ measured from coordinates: $${fmt(t.a, 4)}$. Cosine rule $\\sqrt{b^2+c^2-2bc\\cos A}=${fmt(cosLaw, 4)}$. Measured angles: $A=${fmt(t.angA, 3)}$, $B=${fmt(t.angB, 3)}$, $C=${fmt(t.angC, 3)}$, sum $=${fmt(t.angA + t.angB + t.angC, 4)}$ ($=\\pi$). Ratios $\\frac{a}{\\sin A}=${fmt(ratios[0] as number, 4)}$, $\\frac{b}{\\sin B}=${fmt(ratios[1] as number, 4)}$, $\\frac{c}{\\sin C}=${fmt(ratios[2] as number, 4)}$, and $2R=${fmt(2 * t.R, 4)}$. Area $\\frac{1}{2}bc\\sin A=${fmt(0.5 * b * c * Math.sin(A), 4)}$, $\\frac{abc}{4R}=${fmt((t.a * t.b * t.c) / (4 * t.R), 4)}$, cross product $${fmt(t.area, 4)}$.`)}
      why={tt(R`Cosin: đỉnh $C=(b\cos A;\,b\sin A)$ và $B=(c;0)$, nên $a^2=(b\cos A-c)^2+(b\sin A)^2=b^2+c^2-2bc\cos A$ nhờ $\sin^2+\cos^2=1$. Sin: ba tỉ số bằng nhau và bằng đường kính đường tròn ngoại tiếp, vòng tròn xám qua ba đỉnh trong hình. Pythagore là trường hợp $A=90^\circ$, khi $\cos A=0$.`, R`Cosine rule: with $C=(b\cos A;\,b\sin A)$ and $B=(c;0)$, $a^2=(b\cos A-c)^2+(b\sin A)^2=b^2+c^2-2bc\cos A$ thanks to $\sin^2+\cos^2=1$. Sine rule: the three ratios are equal and equal the diameter of the circumscribed circle, the grey circle through the three vertices. Pythagoras is the case $A=90^\circ$, when $\cos A=0$.`)}
    >
      <Graph
        label={tt("Tam giác ABC và đường tròn ngoại tiếp", "Triangle ABC and its circumscribed circle")}
        draw={(ctx, wd, ht) => {
          const lim = Math.max(8, t.R * 1.4, Math.abs(t.C.x) + 2, t.c + 2);
          const { colors, map } = frame(ctx, wd, ht, -lim * 0.45, lim * 1.0, -lim * 0.7, lim * 0.7, "x", "y", true);
          circle(ctx, map.x(t.O.x), map.y(t.O.y), map.x(t.R) - map.x(0), colors.soft);
          ctx.beginPath();
          ctx.moveTo(map.x(t.A.x), map.y(t.A.y));
          ctx.lineTo(map.x(t.B.x), map.y(t.B.y));
          ctx.lineTo(map.x(t.C.x), map.y(t.C.y));
          ctx.closePath();
          ctx.fillStyle = colors.curve;
          ctx.globalAlpha = 0.18;
          ctx.fill();
          ctx.globalAlpha = 1;
          ctx.strokeStyle = colors.curve;
          ctx.lineWidth = 2.6;
          ctx.stroke();
          for (const [name, P] of [["A", t.A], ["B", t.B], ["C", t.C]] as const) {
            dot(ctx, map.x(P.x), map.y(P.y), colors.alt, colors.bg, 5);
            label(ctx, name, map.x(P.x) + 8, map.y(P.y) - 8, colors.ink);
          }
          label(ctx, `a=${fmt(t.a, 2)}`, map.x((t.B.x + t.C.x) / 2) + 8, map.y((t.B.y + t.C.y) / 2), colors.alt);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Cạnh b", "Side b")} value={b} min={2} max={9} step={0.5} onChange={setB} />
        <Slider label={tt("Cạnh c", "Side c")} value={c} min={2} max={9} step={0.5} onChange={setC} />
        <Slider label={tt("Góc A (rad)", "Angle A (rad)")} value={A} min={0.2} max={2.9} step={0.05} onChange={setA} />
      </div>
    </Stage>
  );
}

/* ---------- Hai âm thoa: tổng thành tích ---------- */

export function BeatLab() {
  const tt = useTx();
  const [f1, setF1] = useState(9);
  const [f2, setF2] = useState(7);
  const sum = (x: number) => Math.sin(f1 * x) + Math.sin(f2 * x);
  const prod = (x: number) => 2 * Math.sin(((f1 + f2) / 2) * x) * Math.cos(((f1 - f2) / 2) * x);
  let diff = 0;
  for (let i = 0; i <= 4000; i++) { const x = -3.2 + (6.4 * i) / 4000; diff = Math.max(diff, Math.abs(sum(x) - prod(x))); }
  return (
    <Stage
      title={tt(R`Hai âm thoa lệch nhau: tổng thành tích`, R`Two tuning forks slightly apart: sum to product`)}
      story={tt(R`Gõ hai âm thoa có tần số gần nhau, bạn nghe tiếng «u-u-u» to nhỏ luân phiên gọi là phách. Cộng hai sóng sin tần số khác nhau cho một sóng nhanh bị nhốt trong một đường bao chậm. Đường cam là tổng hai sóng, đường nét đứt là công thức «tích», đường xám là đường bao.`, R`Strike two tuning forks of nearby frequencies and you hear a «wow-wow-wow» swelling and fading, called beats. Adding two sine waves of different frequencies gives a fast wave trapped inside a slow envelope. The orange line is the sum of the two waves, the dashed line is the «product» formula, the grey line is the envelope.`)}
      read={tt(`Hai tần số ${f1} và ${f2}. Tổng $\\sin ${f1}x+\\sin ${f2}x$ bằng $2\\sin ${fmt((f1 + f2) / 2, 1)}x\\cdot\\cos ${fmt((f1 - f2) / 2, 1)}x$. Độ lệch lớn nhất giữa hai vế trên 4000 điểm mẫu: $${fmt(diff, 12)}$.`, `Two frequencies ${f1} and ${f2}. The sum $\\sin ${f1}x+\\sin ${f2}x$ equals $2\\sin ${fmt((f1 + f2) / 2, 1)}x\\cdot\\cos ${fmt((f1 - f2) / 2, 1)}x$. Largest difference between the two sides over 4000 sample points: $${fmt(diff, 12)}$.`)}
      why={tt(R`Viết $u=\frac{a+b}{2}$ và $v=\frac{a-b}{2}$ thì $a=u+v$ và $b=u-v$. Công thức cộng cho $\sin(u+v)+\sin(u-v)=2\sin u\cos v$: phần chứa $\cos u\sin v$ triệt tiêu. Đó là công thức tổng thành tích, và nó giải thích vì sao hai âm gần nhau tạo ra phách chậm $\cos\frac{a-b}{2}x$.`, R`Write $u=\frac{a+b}{2}$ and $v=\frac{a-b}{2}$, so $a=u+v$ and $b=u-v$. The addition formula gives $\sin(u+v)+\sin(u-v)=2\sin u\cos v$: the part containing $\cos u\sin v$ cancels. That is the sum-to-product formula, and it explains why two nearby notes make a slow beat $\cos\frac{a-b}{2}x$.`)}
    >
      <Graph
        label={tt("Tổng hai sóng sin và dạng tích của nó", "The sum of two sine waves and its product form")}
        draw={(ctx, wd, ht) => {
          const { colors, map, pad } = frame(ctx, wd, ht, -3.2, 3.2, -2.4, 2.4);
          strokeFn(ctx, map, wd, ht, pad, -3.2, 3.2, (x) => 2 * Math.cos(((f1 - f2) / 2) * x), colors.soft, 1.2);
          strokeFn(ctx, map, wd, ht, pad, -3.2, 3.2, (x) => -2 * Math.cos(((f1 - f2) / 2) * x), colors.soft, 1.2);
          strokeFn(ctx, map, wd, ht, pad, -3.2, 3.2, sum, colors.alt, 2.4);
          ctx.setLineDash([4, 4]);
          strokeFn(ctx, map, wd, ht, pad, -3.2, 3.2, prod, colors.curve, 1.6);
          ctx.setLineDash([]);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Tần số a", "Frequency a")} value={f1} min={1} max={16} step={1} onChange={setF1} />
        <Slider label={tt("Tần số b", "Frequency b")} value={f2} min={1} max={16} step={1} onChange={setF2} />
      </div>
    </Stage>
  );
}
