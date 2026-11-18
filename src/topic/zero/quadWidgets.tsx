import { useMemo, useState } from "react";
import { completeSquare, findRoots, fitQuadratic, newtonPath, solveInequality, type Fn } from "../../algo/index.ts";
import { dashed, dot, strokeFn } from "../../labs/draw.ts";
import { Graph } from "../../labs/Graph.tsx";
import { fmt } from "../../lib/format.ts";
import { freshSeed, mulberry32 } from "../../lib/prng.ts";
import { Slider } from "../../ui/Slider.tsx";
import { at, frame, label, line, useTicker, en, useTx } from "./kit.ts";
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
  const tt = useTx();
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
      title={tt(R`Hình dạng parabol: a quyết định hướng, trục đối xứng là tấm gương`, R`The shape of a parabola: a sets the direction, the axis of symmetry is a mirror`)}
      story={tt(R`Kéo $a$ lên dương: parabol mở lên như cái bát; kéo xuống âm: úp xuống như cái nón. $|a|$ lớn thì dốc, đường cong hẹp lại. Đường thẳng đứng nét đứt là một tấm gương: hai điểm cách gương cùng một khoảng $t$, về hai phía, luôn có cùng độ cao. Ngoài ra, đường cong luôn cắt trục tung tại $(0;c)$, vì khi $x=0$ chỉ còn lại hạng tử $c$.`, R`Drag $a$ up to a positive value and the parabola opens upward like a bowl; drag it down to a negative value and it opens downward like a cap. A large $|a|$ makes it steep and narrow. The dashed vertical line is a mirror: two points at the same distance $t$ on either side of it always have the same height. The curve also always meets the vertical axis at $(0;c)$, because $x=0$ leaves only the term $c$.`)}
      read={tt(`$y=${qtex(a, b, c)}$ (a = ${fmt(a)} ${a > 0 ? "> 0: mở lên, đỉnh là điểm thấp nhất" : "< 0: mở xuống, đỉnh là điểm cao nhất"}). Trục đối xứng $x=-\\frac{b}{2a}=${fmt(h, 3)}$, đỉnh $(${fmt(h, 3)};\\ ${fmt(k, 3)})$. Hai điểm cách gương $t=${fmt(t)}$: $y(${fmt(h - t, 2)})=${fmt(f(h - t), 4)}$ và $y(${fmt(h + t, 2)})=${fmt(f(h + t), 4)}$. Cắt trục tung tại $(0;\\ ${fmt(c)})$.`, `$y=${qtex(a, b, c)}$ (a = ${fmt(a)} ${a > 0 ? "> 0: opens upward, the vertex is the lowest point" : "< 0: opens downward, the vertex is the highest point"}). Axis of symmetry $x=-\\frac{b}{2a}=${fmt(h, 3)}$, vertex $(${fmt(h, 3)};\\ ${fmt(k, 3)})$. Two points at distance from the mirror $t=${fmt(t)}$: $y(${fmt(h - t, 2)})=${fmt(f(h - t), 4)}$ and $y(${fmt(h + t, 2)})=${fmt(f(h + t), 4)}$. It meets the vertical axis at $(0;\\ ${fmt(c)})$.`)}
      why={tt(R`Dạng đỉnh $y=a(x-h)^2+k$ chỉ chứa $x$ qua $(x-h)^2$, mà $(h+t-h)^2=(h-t-h)^2=t^2$. Vậy giá trị tại $h+t$ và $h-t$ bằng nhau, và đó là lý do có trục đối xứng $x=h$. Còn $h=-\frac{b}{2a}$ là kết quả của việc hoàn thiện bình phương (xem hình sau).`, R`The vertex form $y=a(x-h)^2+k$ contains $x$ only through $(x-h)^2$, and $(h+t-h)^2=(h-t-h)^2=t^2$. So the values at $h+t$ and $h-t$ are equal: that is why there is an axis of symmetry $x=h$. And $h=-\frac{b}{2a}$ comes from completing the square (see the next picture).`)}
    >
      <Graph
        label={tt("Parabol, trục đối xứng và hai điểm đối xứng", "The parabola, its axis of symmetry and two symmetric points")}
        draw={(ctx, w, hh) => {
          const { colors, map, pad } = frame(ctx, w, hh, -7, 7, -10, 12);
          strokeFn(ctx, map, w, hh, pad, -7, 7, f, colors.curve, 2.6);
          dashed(ctx, map.x(h), map.y(-10), map.x(h), map.y(12), colors.alt);
          line(ctx, map.x(h - t), map.y(f(h - t)), map.x(h + t), map.y(f(h + t)), colors.soft, 1.2);
          dot(ctx, map.x(h - t), map.y(f(h - t)), colors.curve, colors.bg, 5);
          dot(ctx, map.x(h + t), map.y(f(h + t)), colors.curve, colors.bg, 5);
          dot(ctx, map.x(h), map.y(k), colors.alt, colors.bg, 7);
          dot(ctx, map.x(0), map.y(c), colors.ink, colors.bg, 5);
          label(ctx, tt("đỉnh", "vertex"), map.x(h) + 8, map.y(k) + (a > 0 ? 16 : -8), colors.alt);
          label(ctx, "(0; c)", map.x(0) + 8, map.y(c) - 8, colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("a (khác 0)", "a (non-zero)")} value={a0} min={-3} max={3} step={0.25} onChange={setA} />
        <Slider label="b" value={b} min={-8} max={8} step={0.5} onChange={setB} />
        <Slider label="c" value={c} min={-6} max={6} step={0.5} onChange={setC} />
        <Slider label={tt("Cách gương t", "Distance from the mirror t")} value={t} min={0.5} max={5} step={0.25} onChange={setT} />
      </div>
    </Stage>
  );
}

/* ---------- 2. Hoàn thiện bình phương bằng ô vuông ---------- */

export function CompleteSquareLab() {
  const tt = useTx();
  const [b, setB] = useState(4);
  const [c, setC] = useState(1);
  const [x, setX] = useState(3);
  const half = b / 2;
  const { h, k } = completeSquare(1, b, c);
  const lhs = x * x + b * x;
  const rhs = (x + half) ** 2 - half * half;
  return (
    <Stage
      title={tt(R`Hoàn thiện bình phương: lắp nốt mảnh còn thiếu của hình vuông`, R`Completing the square: fitting the missing piece of a square`)}
      story={tt(R`$x^2+bx$ là diện tích của một hình vuông cạnh $x$ ghép với một dải rộng $b$ dài $x$. Chia dải làm đôi, dán mỗi nửa vào một cạnh của hình vuông: ta được một chữ L. Chữ L còn thiếu đúng một hình vuông nhỏ cạnh $\frac{b}{2}$ ở góc thì thành hình vuông lớn cạnh $x+\frac{b}{2}$. Thêm mảnh đó (rồi trừ đi để biểu thức không đổi) chính là «hoàn thiện bình phương». Từ đây thấy ngay giá trị nhỏ nhất.`, R`$x^2+bx$ is the area of a square of side $x$ joined to a strip of width $b$ and length $x$. Split the strip in two and glue each half to one side of the square: you get an L-shape. The L is missing exactly one small square of side $\frac{b}{2}$ in the corner to become a big square of side $x+\frac{b}{2}$. Adding that piece (and subtracting it again so the expression is unchanged) is «completing the square». From there the smallest value is immediate.`)}
      read={tt(`$x=${fmt(x, 2)}$, $b=${fmt(b, 1)}$: diện tích chữ L $x^2+bx=${fmt(x * x, 3)}+${fmt(b * x, 3)}=${fmt(lhs, 4)}$. Hình vuông lớn $\\left(x+\\frac{b}{2}\\right)^2=${fmt((x + half) ** 2, 4)}$, trừ mảnh thiếu $\\left(\\frac{b}{2}\\right)^2=${fmt(half * half, 4)}$ còn $${fmt(rhs, 4)}$: bằng nhau. Vậy $x^2+${fmt(b, 1)}x+${fmt(c, 1)}=\\left(x+${fmt(half, 2)}\\right)^2${k >= 0 ? "+" : ""}${fmt(k, 3)}$, đạt nhỏ nhất $${fmt(k, 3)}$ tại $x=${fmt(h, 2)}$.`, `$x=${fmt(x, 2)}$, $b=${fmt(b, 1)}$: area of the L-shape $x^2+bx=${fmt(x * x, 3)}+${fmt(b * x, 3)}=${fmt(lhs, 4)}$. The big square $\\left(x+\\frac{b}{2}\\right)^2=${fmt((x + half) ** 2, 4)}$, minus the missing piece $\\left(\\frac{b}{2}\\right)^2=${fmt(half * half, 4)}$ leaves $${fmt(rhs, 4)}$: equal. So $x^2+${fmt(b, 1)}x+${fmt(c, 1)}=\\left(x+${fmt(half, 2)}\\right)^2${k >= 0 ? "+" : ""}${fmt(k, 3)}$, with smallest value $${fmt(k, 3)}$ at $x=${fmt(h, 2)}$.`)}
      why={tt(R`Bình phương không bao giờ âm, nên $(x+\frac{b}{2})^2$ nhỏ nhất bằng 0, đạt khi $x=-\frac{b}{2}$. Khi đó cả biểu thức đạt giá trị nhỏ nhất $c-\frac{b^2}{4}$. Với $a\ne 1$, ta rút $a$ ra ngoài trước rồi làm tương tự, được đỉnh $\left(-\frac{b}{2a};-\frac{\Delta}{4a}\right)$.`, R`A square is never negative, so $(x+\frac{b}{2})^2$ is smallest at 0, when $x=-\frac{b}{2}$. Then the whole expression has smallest value $c-\frac{b^2}{4}$. For $a\ne 1$, factor out $a$ first and do the same, getting the vertex $\left(-\frac{b}{2a};-\frac{\Delta}{4a}\right)$.`)}
    >
      <Graph
        label={tt("Hình vuông x nhân x, dải b nhân x và mảnh thiếu", "The x-by-x square, the b-by-x strip and the missing piece")}
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
          label(ctx, tt(`cạnh lớn = x + ${fmt(half, 1)} = ${fmt(x + half, 2)}`, `big side = x + ${fmt(half, 1)} = ${fmt(x + half, 2)}`), ox + 4, 16, colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label="b" value={b} min={0} max={6} step={0.5} onChange={setB} />
        <Slider label="c" value={c} min={-6} max={6} step={0.5} onChange={setC} />
        <Slider label={tt("Cạnh hình vuông x", "Side of the square x")} value={x} min={0.5} max={6} step={0.25} onChange={setX} />
      </div>
    </Stage>
  );
}

/* ---------- 3. Dạng đỉnh: tịnh tiến ---------- */

export function TranslateLab() {
  const tt = useTx();
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
      title={tt(R`Dạng đỉnh: trượt cả đường cong đi h ngang, k dọc`, R`Vertex form: slide the whole curve h across and k up`)}
      story={tt(R`Lấy parabol gốc $y=ax^2$ có đỉnh ở gốc toạ độ (nét mờ). Đẩy nó sang phải $h$ đơn vị rồi lên $k$ đơn vị: đỉnh tới $(h;k)$, mọi điểm đi theo và dáng không đổi. Độ cao mới tại $x$ là độ cao cũ tại $x-h$ cộng $k$. Đó chính là công thức $y=a(x-h)^2+k$, vẽ thành hình.`, R`Take the basic parabola $y=ax^2$ with its vertex at the origin (faint line). Push it $h$ units to the right and $k$ units up: the vertex moves to $(h;k)$ and every point follows, the shape unchanged. The new height at $x$ is the old height at $x-h$ plus $k$. That is the formula $y=a(x-h)^2+k$ drawn.`)}
      read={tt(`Điểm $x=${fmt(probe, 2)}$: độ cao mới $${fmt(f(probe), 4)}$; độ cao cũ tại $x-h=${fmt(probe - h, 2)}$ là $${fmt(base(probe - h), 4)}$, cộng $k=${fmt(k)}$ được $${fmt(base(probe - h) + k, 4)}$. Khai triển: $y=${qtex(a, b, c)}$, nên $b=-2ah=${fmt(b, 2)}$ và $c=ah^2+k=${fmt(c, 2)}$. Đỉnh $(${fmt(h)};\\ ${fmt(k)})$.`, `Point $x=${fmt(probe, 2)}$: new height $${fmt(f(probe), 4)}$; the old height at $x-h=${fmt(probe - h, 2)}$ is $${fmt(base(probe - h), 4)}$, plus $k=${fmt(k)}$ gives $${fmt(base(probe - h) + k, 4)}$. Expanding: $y=${qtex(a, b, c)}$, so $b=-2ah=${fmt(b, 2)}$ and $c=ah^2+k=${fmt(c, 2)}$. Vertex $(${fmt(h)};\\ ${fmt(k)})$.`)}
      why={tt(R`Phép tịnh tiến không đổi hình dạng, nên mọi tính chất của $y=ax^2$ (hướng, độ rộng, đối xứng) giữ nguyên, chỉ vị trí đổi. Muốn biết đỉnh ở đâu, nhìn dạng đỉnh là xong; muốn biết cắt trục tung ở đâu, khai triển ra $c$.`, R`A translation does not change the shape, so every property of $y=ax^2$ (direction, width, symmetry) stays, only the position changes. To know where the vertex is, read the vertex form; to know where it meets the vertical axis, expand to get $c$.`)}
    >
      <Graph
        label={tt("Parabol gốc và parabol đã tịnh tiến", "The basic parabola and the translated parabola")}
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
        <Slider label={tt("h (trượt ngang)", "h (slide sideways)")} value={h} min={-5} max={5} step={0.5} onChange={setH} />
        <Slider label={tt("k (trượt dọc)", "k (slide vertically)")} value={k} min={-6} max={6} step={0.5} onChange={setK} />
      </div>
    </Stage>
  );
}

/* ---------- 4. Nghiệm: biệt thức, Viète, và máy tìm nghiệm bằng Newton ---------- */

export function RootsLab() {
  const tt = useTx();
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
      title={tt(R`Nghiệm là chỗ parabol chạm trục hoành: biệt thức báo trước`, R`Roots are where the parabola touches the horizontal axis: the discriminant predicts them`)}
      story={tt(R`Giải $ax^2+bx+c=0$ là hỏi parabol chạm trục hoành ở đâu. Biệt thức $\Delta=b^2-4ac$ báo trước: dương thì cắt hai điểm, bằng 0 thì chạm đúng một điểm (tiếp xúc), âm thì lơ lửng phía trên hoặc dưới, không chạm. Máy tìm nghiệm bằng hai cách không cần công thức: quét tìm chỗ đổi dấu rồi chia đôi, và phương pháp Newton: từ một điểm bất kì dựng tiếp tuyến, nhảy tới chỗ tiếp tuyến cắt trục, lặp lại.`, R`Solving $ax^2+bx+c=0$ asks where the parabola touches the horizontal axis. The discriminant $\Delta=b^2-4ac$ predicts: positive means two crossing points, zero means it touches at exactly one point (tangent), negative means it floats above or below without touching. The machine finds roots in two ways without the formula: scanning for a sign change and then bisecting, and Newton's method: from any starting point draw the tangent, jump to where the tangent meets the axis, and repeat.`)}
      read={tt(`$${qtex(a, b, c)}=0$, $\\Delta=(${fmt(b, 1)})^2-4\\cdot(${fmt(a)})\\cdot(${fmt(c, 1)})=${fmt(D, 3)}$:${D > 0 ? "hai nghiệm" : D === 0 ? "nghiệm kép" : "vô nghiệm"}. Máy chia đôi tìm ${found.length}: ${found.map((r) => fmt(r, 5)).join("; ") || "không có"}. Công thức $\\frac{-b\\pm\\sqrt{\\Delta}}{2a}$: ${formula.map((r) => fmt(r, 5)).join("; ") || "không có"}.${found.length === 2 ? ` Viète: $x_1+x_2=${fmt(found[0]! + found[1]!, 4)}=-\\frac{b}{a}=${fmt(-b / a, 4)}$, $x_1x_2=${fmt(found[0]! * found[1]!, 4)}=\\frac{c}{a}=${fmt(c / a, 4)}$.` : ""} Newton sau ${path.length - 1} bước từ $${fmt(x0)}$ tới $${fmt(last.x, 6)}$.`, `$${qtex(a, b, c)}=0$, $\\Delta=(${fmt(b, 1)})^2-4\\cdot(${fmt(a)})\\cdot(${fmt(c, 1)})=${fmt(D, 3)}$:${D > 0 ? "two roots" : D === 0 ? "a double root" : "no real root"}. Bisection finds ${found.length}: ${found.map((r) => fmt(r, 5)).join("; ") || "none"}. The formula $\\frac{-b\\pm\\sqrt{\\Delta}}{2a}$: ${formula.map((r) => fmt(r, 5)).join("; ") || "none"}.${found.length === 2 ? ` Viète: $x_1+x_2=${fmt(found[0]! + found[1]!, 4)}=-\\frac{b}{a}=${fmt(-b / a, 4)}$, $x_1x_2=${fmt(found[0]! * found[1]!, 4)}=\\frac{c}{a}=${fmt(c / a, 4)}$.` : ""} Newton after ${path.length - 1} steps from $${fmt(x0)}$ reaches $${fmt(last.x, 6)}$.`)}
      why={tt(R`Hoàn thiện bình phương: $a\left(x+\frac{b}{2a}\right)^2=\frac{\Delta}{4a}$. Bình phương không âm nên cần $\frac{\Delta}{4a}$ cùng dấu với $a$, tức $\Delta\ge 0$; lấy căn hai vế được hai nghiệm $\frac{-b\pm\sqrt{\Delta}}{2a}$. Cộng hai nghiệm thì hai căn triệt tiêu ra $-\frac{b}{a}$; nhân thì ra $\frac{c}{a}$ (Viète). Newton dùng tiếp tuyến để «trượt» về nghiệm và rất nhanh, vì mỗi bước số chữ số đúng gần như gấp đôi.`, R`Completing the square: $a\left(x+\frac{b}{2a}\right)^2=\frac{\Delta}{4a}$. A square is not negative so $\frac{\Delta}{4a}$ must have the same sign as $a$, i.e. $\Delta\ge 0$; taking the square root of both sides gives the two roots $\frac{-b\pm\sqrt{\Delta}}{2a}$. Adding the two roots makes the square roots cancel and leaves $-\frac{b}{a}$; multiplying gives $\frac{c}{a}$ (Viète). Newton uses the tangent to «slide» towards the root, very fast because the number of correct digits roughly doubles at each step.`)}
    >
      <Graph
        label={tt("Parabol, các nghiệm và các bước Newton", "The parabola, its roots and the Newton steps")}
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
        <Slider label={tt("Newton: điểm xuất phát", "Newton: starting point")} value={x0} min={-7} max={7} step={0.5} onChange={setX0} />
        <Slider label={tt("Newton: số bước", "Newton: number of steps")} value={steps} min={0} max={8} step={1} onChange={setSteps} />
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
  const tt = useTx();
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
      title={tt(R`Dấu của tam thức: nhìn parabol so với trục hoành`, R`The sign of a quadratic: look at the parabola against the horizontal axis`)}
      story={tt(R`Dấu của $ax^2+bx+c$ chính là việc parabol nằm trên hay dưới trục hoành. Phần nằm trên trục là chỗ dương, phần dưới là chỗ âm. Máy giải bất phương trình bằng cách tìm nghiệm, rồi thử một điểm trong mỗi khoảng giữa các nghiệm để biết khoảng đó dương hay âm. Các đoạn tô đậm trên trục hoành là tập nghiệm. Cuối cùng ta kiểm tra xem quy tắc «trong trái ngoài cùng» có khớp không.`, R`The sign of $ax^2+bx+c$ is just whether the parabola is above or below the horizontal axis. Where it is above the axis the value is positive, where below it is negative. The machine solves inequalities by finding the roots and then testing one point in each interval between roots to see whether that interval is positive or negative. The thick segments on the axis are the solution set. Afterwards we check whether the rule «inside opposite, outside same» agrees.`)}
      read={tt(`$${qtex(a, b, c)}\\ ${REL_NAME[rel]}$: tập nghiệm máy tìm được $${intervalText(sol, rel === ">=" || rel === "<=")}$. $\\Delta=${fmt(D, 3)}$, $a=${fmt(a)}$. ${D > 0 ? `Quy tắc: giữa hai nghiệm trái dấu $a$, ngoài hai nghiệm cùng dấu $a$ (${a > 0 ? "parabol mở lên: giữa là âm, ngoài là dương" : "parabol mở xuống: giữa là dương, ngoài là âm"}).` : D === 0 ? "Quy tắc: $f$ cùng dấu $a$ mọi nơi, trừ tại nghiệm kép nơi bằng 0." : `Quy tắc: $f$ cùng dấu với $a$ với mọi $x$.`} Quét 8000 điểm: nhỏ nhất $${fmt(minV, 3)}$, lớn nhất $${fmt(maxV, 3)}$ (trên $[-40;40]$). «Luôn dương» theo quy tắc $a>0$ và $\\Delta<0$: ${ruleAlways ? "đúng" : "không"}; theo phép quét: ${minV > 0 ? "đúng" : "không"}.`, `$${qtex(a, b, c)}\\ ${REL_NAME[rel]}$: solution set found by the machine $${intervalText(sol, rel === ">=" || rel === "<=")}$. $\\Delta=${fmt(D, 3)}$, $a=${fmt(a)}$. ${D > 0 ? `Rule: between the roots the sign is opposite to $a$, outside the roots it is the same as $a$ (${a > 0 ? "the parabola opens upward: negative between, positive outside" : "the parabola opens downward: positive between, negative outside"}).` : D === 0 ? "Rule: $f$ has the sign of $a$ everywhere except at the double root where it is 0." : `Rule: $f$ has the sign of $a$ for every $x$.`} Scanning 8000 points: smallest $${fmt(minV, 3)}$, largest $${fmt(maxV, 3)}$ (on $[-40;40]$). «Always positive» by the rule $a>0$ and $\\Delta<0$: ${ruleAlways ? "true" : "no"}; by the scan: ${minV > 0 ? "true" : "no"}.`)}
      why={tt(R`Từ $f(x)=a\left[\left(x+\frac{b}{2a}\right)^2-\frac{\Delta}{4a^2}\right]$: nếu $\Delta<0$ thì ngoặc luôn dương nên $f$ cùng dấu $a$. Nếu $\Delta>0$ thì $f=a(x-x_1)(x-x_2)$, và tích $(x-x_1)(x-x_2)$ âm đúng khi $x$ nằm giữa hai nghiệm. Do đó «trong trái, ngoài cùng».`, R`From $f(x)=a\left[\left(x+\frac{b}{2a}\right)^2-\frac{\Delta}{4a^2}\right]$: if $\Delta<0$ the bracket is always positive so $f$ has the sign of $a$. If $\Delta>0$ then $f=a(x-x_1)(x-x_2)$, and the product $(x-x_1)(x-x_2)$ is negative exactly when $x$ lies between the roots. Hence «inside opposite, outside same».`)}
    >
      <Graph
        label={tt("Parabol và tập nghiệm của bất phương trình trên trục hoành", "The parabola and the solution set of the inequality on the horizontal axis")}
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
        <label className="fz-pick">{tt("Bất phương trình", "Inequality")}
          <select value={rel} onChange={(e) => setRel(e.target.value as Rel)}>{(Object.keys(REL_NAME) as Rel[]).map((r) => <option key={r} value={r}>f(x) {REL_NAME[r]}</option>)}</select>
        </label>
      </div>
    </Stage>
  );
}

/* ---------- 6. Parabol và đường thẳng: cắt, tiếp xúc, không gặp ---------- */

export function LineIntersectLab() {
  const tt = useTx();
  const [p, setP] = useState(1);
  const [q, setQ] = useState(-1);
  const g = fnOf(1, -2, -1);
  const line_ = (x: number) => p * x + q;
  const D = (2 + p) ** 2 + 4 * (1 + q);
  const xs = findRoots((x) => g(x) - line_(x), -12, 12, 6000);
  const qTouch = -1 - (2 + p) ** 2 / 4;
  return (
    <Stage
      title={tt(R`Đường thẳng và parabol: cắt hai điểm, chạm một điểm, hoặc không gặp`, R`A line and a parabola: two crossings, one touch, or no meeting`)}
      story={tt(R`Parabol $y=x^2-2x-1$ cố định, đường thẳng $y=px+q$ di chuyển. Hãy kéo $q$ (tịnh tiến lên xuống): lúc đầu đường thẳng cắt parabol tại hai điểm; nâng dần thì hai điểm gần nhau rồi chập thành một, khi đó đường thẳng vừa chạm parabol, gọi là tiếp xúc. Nâng thêm nữa thì chúng không gặp nhau. Giao điểm là nghiệm của phương trình hoành độ, nên số giao điểm do biệt thức quyết định.`, R`The parabola $y=x^2-2x-1$ is fixed, the line $y=px+q$ moves. Drag $q$ (shifting up and down): at first the line crosses the parabola at two points, raise it and the two points come together and merge into one: the line just touches, called tangent. Raise it more and they no longer meet. The intersections are the solutions of the equation for the x-coordinates, so the number of intersections is decided by the discriminant.`)}
      read={tt(`Hoành độ giao điểm: $x^2-2x-1=${qtex(0, p, q)}$, tức $${qtex(1, -(2 + p), -(1 + q))}=0$, $\\Delta=${fmt(D, 3)}$. Máy tìm được ${xs.length} giao điểm${xs.length ? `: $x=${xs.map((r) => fmt(r, 4)).join(";\\ ")}$` : ""}. ${Math.abs(D) < 1e-6 ? "Tiếp xúc: nghiệm kép." : ""} Tiếp xúc xảy ra khi $\\Delta=0$, tức$q=-1-\\frac{(2+p)^2}{4}=${fmt(qTouch, 3)}$.`, `Intersection equation: $x^2-2x-1=${qtex(0, p, q)}$, i.e. $${qtex(1, -(2 + p), -(1 + q))}=0$, $\\Delta=${fmt(D, 3)}$. The machine finds ${xs.length} intersections${xs.length ? `: $x=${xs.map((r) => fmt(r, 4)).join(";\\ ")}$` : ""}. ${Math.abs(D) < 1e-6 ? "Tangent: a double root." : ""} Tangency happens when $\\Delta=0$, i.e.$q=-1-\\frac{(2+p)^2}{4}=${fmt(qTouch, 3)}$.`)}
      why={tt(R`Số giao điểm bằng số nghiệm của phương trình hoành độ giao điểm. Nghiệm kép nghĩa là hai giao điểm chập làm một, và khi đó đường thẳng có cùng độ dốc với parabol tại điểm đó: nó là tiếp tuyến. Bài toán tham số «tìm $q$ để đường thẳng tiếp xúc» chỉ là giải $\Delta=0$.`, R`The number of intersections equals the number of solutions of the intersection equation. A double root means the two intersections merge into one, and then the line has the same slope as the parabola at that point: it is the tangent. The parameter problem «find $q$ for the line to be tangent» is just solving $\Delta=0$.`)}
    >
      <Graph
        label={tt("Parabol cố định và đường thẳng di động", "A fixed parabola and a moving line")}
        draw={(ctx, w, hh) => {
          const { colors, map, pad } = frame(ctx, w, hh, -6, 8, -8, 14);
          strokeFn(ctx, map, w, hh, pad, -6, 8, g, colors.curve, 2.6);
          line(ctx, map.x(-6), map.y(line_(-6)), map.x(8), map.y(line_(8)), Math.abs(D) < 0.15 ? colors.ink : colors.alt, 2.2);
          for (const r of xs) dot(ctx, map.x(r), map.y(g(r)), colors.ink, colors.bg, 7);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("p (độ dốc đường thẳng)", "p (slope of the line)")} value={p} min={-6} max={6} step={0.5} onChange={setP} />
        <Slider label={tt("q (độ cao đường thẳng)", "q (height of the line)")} value={q} min={-12} max={8} step={0.25} onChange={setQ} />
      </div>
      <Buttons><button type="button" className="text-btn" onClick={() => setQ(Math.round(qTouch * 4) / 4)}>{tt("Chỉnh về gần tiếp xúc", "Adjust to nearly tangent")}</button></Buttons>
    </Stage>
  );
}

/* ---------- 7. Hai nghiệm ở hai phía của một số: a·f(α) < 0 ---------- */

export function AlphaLab() {
  const tt = useTx();
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
      title={tt(R`Số α nằm giữa hai nghiệm khi nào? Chỉ cần xét dấu a·f(α)`, R`When does α lie between the two roots? Just check the sign of a·f(α)`)}
      story={tt(R`Chọn một số $\alpha$ và hỏi: hai nghiệm của parabol nằm hai phía của $\alpha$ hay không? Cách thử rất gọn: đứng tại $\alpha$ và nhìn độ cao đồ thị. Parabol mở lên cắt trục tại hai điểm thì giữa hai điểm đó nó nằm dưới trục. Vậy $\alpha$ ở giữa hai nghiệm khi và chỉ khi đồ thị tại $\alpha$ nằm về phía «trái dấu với $a$».`, R`Choose a number $\alpha$ and ask: do the two roots of the parabola lie on either side of $\alpha$? There is a very short test: stand at $\alpha$ and look at the height of the graph. A parabola opening upward that crosses the axis at two points lies below the axis between them. So $\alpha$ is between the two roots exactly when the graph at $\alpha$ is on the side «opposite to the sign of $a$».`)}
      read={tt(`$f(\\alpha)=${fmt(f(alpha), 4)}$, $a\\cdot f(\\alpha)=${fmt(test, 4)}$ ${test < 0 ? "< 0" : "≥ 0"}. Máy đếm nghiệm: ${left} nghiệm bên trái $\\alpha$, ${right} nghiệm bên phải. ${test < 0 ? (left === 1 && right === 1 ? "Khớp: hai nghiệm ở hai phía." : "Không khớp, kiểm lại.") : "Không phải hai phía của α."}`, `$f(\\alpha)=${fmt(f(alpha), 4)}$, $a\\cdot f(\\alpha)=${fmt(test, 4)}$ ${test < 0 ? "< 0" : "≥ 0"}. The machine counts roots: ${left} roots to the left of $\\alpha$, ${right} roots to the right. ${test < 0 ? (left === 1 && right === 1 ? "It matches: the two roots are on either side." : "No match, check again.") : "The roots are not on either side of α."}`)}
      why={tt(R`Nếu $x_1<\alpha<x_2$ thì $\alpha$ nằm giữa hai nghiệm nên $f(\alpha)$ trái dấu $a$, tức $a\,f(\alpha)<0$. Ngược lại, nếu $a\,f(\alpha)<0$ thì $f$ nhận một giá trị trái dấu $a$ nên không thể $\Delta\le 0$ (khi đó $f$ luôn cùng dấu $a$): tự động có hai nghiệm, và $\alpha$ nằm giữa. Điều kiện gọn vì đã chứa sẵn $\Delta>0$.`, R`If $x_1<\alpha<x_2$ then $\alpha$ lies between the roots so $f(\alpha)$ has the sign opposite to $a$, i.e. $a\,f(\alpha)<0$. Conversely, if $a\,f(\alpha)<0$ then $f$ takes a value opposite to the sign of $a$ so $\Delta\le 0$ is impossible (then $f$ always has the sign of $a$): there are automatically two roots, and $\alpha$ lies between them. The condition is compact because it already contains $\Delta>0$.`)}
    >
      <Graph
        label={tt("Parabol, các nghiệm và số α", "The parabola, its roots and the number α")}
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
  const tt = useTx();
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
      title={tt(R`Lớn nhất, nhỏ nhất trên một đoạn: đỉnh có thuộc đoạn không?`, R`Largest and smallest on an interval: is the vertex in the interval?`)}
      story={tt(R`Chỉ nhìn đoạn đã chọn (vùng tô). Nếu đỉnh parabol rơi vào đoạn thì nó là một ứng viên, còn nếu nằm ngoài thì trong đoạn đường cong chỉ đi một chiều (lên mãi hoặc xuống mãi) nên cực trị phải ở một đầu mút. Máy so các ứng viên rồi quét 6000 điểm để kiểm.`, R`Look only at the chosen interval (the shaded region). If the vertex of the parabola falls inside the interval it is a candidate; if it lies outside, the curve only goes one way in the interval (up all the time or down all the time) so the extremum must be at an endpoint. The machine compares the candidates and then scans 6000 points to check.`)}
      read={tt(`Đoạn $[${fmt(lo, 2)};\\ ${fmt(hi, 2)}]$, hoành độ đỉnh $-\\frac{b}{2a}=${fmt(h, 3)}$ ${inside ? "thuộc" : "không thuộc"} đoạn. Ứng viên: ${cands.map((e) => `${e.tag} $y=${fmt(e.y, 3)}$`).join("; ")}. Lớn nhất $${fmt(best.y, 4)}$ (${best.tag}), nhỏ nhất $${fmt(worst.y, 4)}$ (${worst.tag}). Quét 6000 điểm cho $${fmt(sMax, 4)}$ và $${fmt(sMin, 4)}$.`, `Interval $[${fmt(lo, 2)};\\ ${fmt(hi, 2)}]$, the x-coordinate of the vertex $-\\frac{b}{2a}=${fmt(h, 3)}$ ${inside ? "belongs to" : "does not belong to"} the interval. Candidates: ${cands.map((e) => `${tt(e.tag, en(e.tag))} $y=${fmt(e.y, 3)}$`).join("; ")}. Largest $${fmt(best.y, 4)}$ (${tt(best.tag, en(best.tag))}), smallest $${fmt(worst.y, 4)}$ (${tt(worst.tag, en(worst.tag))}). Scanning 6000 points gives $${fmt(sMax, 4)}$ and $${fmt(sMin, 4)}$.`)}
      why={tt(R`Parabol đơn điệu ở mỗi bên đỉnh. Khi đoạn nằm trọn một bên đỉnh, hàm chỉ tăng hoặc chỉ giảm trên đoạn nên cực trị ở đầu mút. Khi đỉnh nằm trong đoạn thì đỉnh là điểm thấp nhất (nếu mở lên) hoặc cao nhất (nếu mở xuống), còn phía kia là đầu mút xa đỉnh hơn.`, R`A parabola is monotonic on each side of its vertex. When the interval lies wholly on one side of the vertex the function only increases or only decreases on it, so the extremum is at an endpoint. When the vertex is inside the interval it is the lowest point (if opening upward) or highest (if opening downward), and the other extreme is the endpoint farther from the vertex.`)}
    >
      <Graph
        label={tt("Parabol, đoạn khảo sát và các ứng viên", "The parabola, the interval studied and the candidates")}
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
        <Slider label={tt("Đầu mút trái", "Left endpoint")} value={p} min={-3} max={7} step={0.25} onChange={setP} />
        <Slider label={tt("Đầu mút phải", "Right endpoint")} value={q} min={-2} max={8} step={0.25} onChange={setQ} />
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
  const tt = useTx();
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
      title={tt(R`Nơ-ron học hệ số a, b, c từ các lần đo quả bóng`, R`A neuron learns the coefficients a, b, c from measurements of a ball`)}
      story={tt(R`Ném quả bóng, đo độ cao ở 22 thời điểm; mỗi số đo lệch đi một chút vì thước không hoàn hảo. Ta không biết quy luật, chỉ biết nó có dạng $y=ax^2+bx+c$. Một nơ-ron bắt đầu với $a=b=c=0$. Mỗi vòng, nó đo độ lệch giữa đường hiện tại và các điểm đo, rồi chỉnh ba hệ số theo hướng làm độ lệch giảm. Sau vài trăm vòng, đường cong ôm sát dữ liệu.`, R`Throw a ball and measure its height at 22 moments; every measurement is slightly off because the ruler is imperfect. We do not know the law, only that it has the form $y=ax^2+bx+c$. A neuron starts with $a=b=c=0$. In every round it measures the gap between the current curve and the measured points, then adjusts the three coefficients in the direction that reduces the gap. After a few hundred rounds the curve hugs the data.`)}
      read={tt(`Vòng ${epoch}: $y=${qtex(cur.a, cur.b, cur.c)}$, sai số bình phương trung bình $${fmt(cur.loss, 4)}$. Sự thật được dùng để sinh dữ liệu: $a=-5$, $b=20$, $c=1$. Nơ-ron đã học: $a=${fmt(cur.a, 3)}$, $b=${fmt(cur.b, 3)}$, $c=${fmt(cur.c, 3)}$. Từ đường cong học được suy ra: đỉnh tại $t=-\\frac{b}{2a}=${fmt(vx, 3)}$ s (đúng 2), cao $${fmt(f(vx), 3)}$ m (đúng 21), bóng chạm đất lúc $t=${flight.length ? fmt(flight[flight.length - 1] as number, 3) : "?"}$ s.`, `Round ${epoch}: $y=${qtex(cur.a, cur.b, cur.c)}$, mean squared error $${fmt(cur.loss, 4)}$. The truth used to generate the data: $a=-5$, $b=20$, $c=1$. The neuron has learned: $a=${fmt(cur.a, 3)}$, $b=${fmt(cur.b, 3)}$, $c=${fmt(cur.c, 3)}$. From the learned curve we infer: the vertex at $t=-\\frac{b}{2a}=${fmt(vx, 3)}$ s (true value 2), height $${fmt(f(vx), 3)}$ m (true value 21), the ball lands at $t=${flight.length ? fmt(flight[flight.length - 1] as number, 3) : "?"}$ s.`)}
      why={tt(R`Đây là bài toán hạ gradient: sai số là một hàm của ba ẩn $a,b,c$, bước theo hướng ngược độ dốc của nó. Điều thú vị là hàm sai số cũng là một «parabol nhiều chiều» có đúng một đáy, nên thuật toán luôn tìm ra đáy. Từ ba hệ số, mọi công thức của chuyên đề (đỉnh, nghiệm) cho ta biết độ cao lớn nhất và thời điểm chạm đất.`, R`This is a gradient descent problem: the error is a function of the three unknowns $a,b,c$ and we step against its slope. The interesting thing is that the error function is also a «multidimensional parabola» with exactly one bottom, so the algorithm always finds it. From the three coefficients every formula of this topic (vertex, roots) tells us the maximum height and the time of landing.`)}
    >
      <Graph
        label={tt("Các điểm đo và đường parabol mà nơ-ron học được", "The measured points and the parabola the neuron learned")}
        draw={(ctx, w, hh) => {
          const { colors, map, pad } = frame(ctx, w, hh, -0.2, 4.6, -3, 26, "t (s)", "h (m)");
          strokeFn(ctx, map, w, hh, pad, 0, 4.4, fnOf(-5, 20, 1), colors.soft, 1.4);
          strokeFn(ctx, map, w, hh, pad, 0, 4.4, f, colors.alt, 2.8);
          for (const pt of points) dot(ctx, map.x(pt.x), map.y(pt.y), colors.curve, colors.bg, 4);
          dot(ctx, map.x(vx), map.y(f(vx)), colors.ink, colors.bg, 6);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Số vòng đã học", "Rounds learned")} value={epoch} min={0} max={4000} step={20} onChange={(v) => { setRunning(false); setEpoch(v); }} />
      </div>
      <Buttons>
        <button type="button" className="text-btn" onClick={() => { if (epoch >= history.length - 1) setEpoch(0); setRunning(!running); }}>{running ? tt("Dừng", "Stop") : tt("Cho nơ-ron học", "Let the neuron learn")}</button>
        <button type="button" className="text-btn" onClick={() => { setRunning(false); setEpoch(0); setSeed(freshSeed() % 100000); }}>{tt("Đo lại (dữ liệu mới)", "Measure again (new data)")}</button>
      </Buttons>
    </Stage>
  );
}
