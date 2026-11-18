import { useState } from "react";
import { cramer, distToPlane, dot3, lineCircle, planeThrough, sub3, type V3 } from "../../algo/index.ts";
import { dashed, dot, fitIso } from "../../labs/draw.ts";
import { Graph } from "../../labs/Graph.tsx";
import { fmt } from "../../lib/format.ts";
import { Slider } from "../../ui/Slider.tsx";
import { frame, label, line, useTx } from "./kit.ts";
import { Buttons, Stage } from "./widgets.tsx";

const R = String.raw;

/** Viết ax+by+c=0 thành TeX. */
function lineTex(a: number, b: number, c: number): string {
  const part = (v: number, s: string, first: boolean) => (Math.abs(v) < 1e-9 ? "" : `${v < 0 ? "-" : first ? "" : "+"}${Math.abs(Math.abs(v) - 1) < 1e-9 && s !== "" ? "" : fmt(Math.abs(v), 2)}${s}`);
  const txt = part(a, "x", true) + part(b, "y", a === 0) + part(c, "", a === 0 && b === 0);
  return `${txt || "0"}=0`;
}

/** Vẽ đường thẳng ax+by+c=0 trong khung đã dựng. */
function drawLine(ctx: CanvasRenderingContext2D, map: { x: (v: number) => number; y: (v: number) => number }, a: number, b: number, c: number, lo: number, hi: number, color: string, lw = 2.4) {
  const pts: [number, number][] = [];
  if (Math.abs(b) > 1e-9) for (const x of [lo, hi]) pts.push([x, -(a * x + c) / b]);
  else if (Math.abs(a) > 1e-9) for (const y of [lo, hi]) pts.push([-c / a, y]);
  if (pts.length === 2) line(ctx, map.x((pts[0] as [number, number])[0]), map.y((pts[0] as [number, number])[1]), map.x((pts[1] as [number, number])[0]), map.y((pts[1] as [number, number])[1]), color, lw);
}

/* ---------- 1. Một đường thẳng: pháp tuyến, chỉ phương, các dạng phương trình ---------- */

export function LineFormsLab() {
  const tt = useTx();
  const [a0, setA] = useState(2);
  const [b0, setB] = useState(1);
  const [x0, setX0] = useState(1);
  const [y0, setY0] = useState(1);
  const [t, setT] = useState(1.5);
  const a = a0 === 0 && b0 === 0 ? 1 : a0;
  const b = b0;
  const n = Math.hypot(a, b);
  const c = -(a * x0 + b * y0);
  const u = { x: -b / n, y: a / n };
  const N = { x: x0 + t * u.x, y: y0 + t * u.y };
  const residual = a * (N.x - x0) + b * (N.y - y0);
  return (
    <Stage
      title={tt("Đường thẳng: một điểm và một hướng vuông góc", "A line: one point and one perpendicular direction")}
      story={tt(
        R`Muốn mô tả một đường thẳng, chỉ cần hai thứ: một điểm nó đi qua và hướng «đâm vuông góc» vào nó (pháp tuyến $\vec{n}=(a;b)$). Điểm $N$ nằm trên đường thẳng khi và chỉ khi mũi tên từ $M$ tới $N$ vuông góc với $\vec{n}$, tức tích vô hướng bằng 0: $a(x-x_0)+b(y-y_0)=0$. Kéo $t$ để trượt điểm $N$ dọc theo hướng của đường thẳng: tích vô hướng luôn bằng 0.`,
        R`To describe a line you only need two things: a point it passes through and a direction that «sticks out perpendicularly» from it (the normal $\vec{n}=(a;b)$). A point $N$ lies on the line exactly when the arrow from $M$ to $N$ is perpendicular to $\vec{n}$, i.e. their dot product is 0: $a(x-x_0)+b(y-y_0)=0$. Drag $t$ to slide $N$ along the direction of the line: the dot product stays 0.`,
      )}
      read={tt(
        `Pháp tuyến $\\vec{n}=(${fmt(a)};${fmt(b)})$, chỉ phương $\\vec{u}=(-b;a)$. Qua $M(${fmt(x0)};${fmt(y0)})$: $${lineTex(a, b, c)}$. ${Math.abs(b) > 1e-9 ? `Hệ số góc $k=-\\frac{a}{b}=${fmt(-a / b, 3)}$.` : "Đường thẳng đứng, không có hệ số góc."} Tham số: $x=${fmt(x0)}+${fmt(u.x * 1, 3)}t$, $y=${fmt(y0)}+${fmt(u.y, 3)}t$. Với $t=${fmt(t)}$: $N(${fmt(N.x, 3)};${fmt(N.y, 3)})$, $a(x_N-x_0)+b(y_N-y_0)=${fmt(residual, 10)}$.`,
        `Normal $\\vec{n}=(${fmt(a)};${fmt(b)})$, direction $\\vec{u}=(-b;a)$. Through $M(${fmt(x0)};${fmt(y0)})$: $${lineTex(a, b, c)}$. ${Math.abs(b) > 1e-9 ? `Slope $k=-\\frac{a}{b}=${fmt(-a / b, 3)}$.` : "A vertical line has no slope."} Parametric form: $x=${fmt(x0)}+${fmt(u.x, 3)}t$, $y=${fmt(y0)}+${fmt(u.y, 3)}t$. With $t=${fmt(t)}$: $N(${fmt(N.x, 3)};${fmt(N.y, 3)})$, $a(x_N-x_0)+b(y_N-y_0)=${fmt(residual, 10)}$.`,
      )}
      why={tt(
        R`Ba dạng phương trình là ba cách nói cùng một ý. Dạng tổng quát $ax+by+c=0$ có $c=-(ax_0+by_0)$. Dạng tham số dùng điểm cộng $t$ lần chỉ phương. Dạng hệ số góc $y=kx+m$ chỉ viết được khi đường không đứng. Chỉ phương $(-b;a)$ là pháp tuyến quay một phần tư vòng, nên vuông góc với nó.`,
        R`The three forms of the equation say the same thing in three ways. The general form $ax+by+c=0$ has $c=-(ax_0+by_0)$. The parametric form is a point plus $t$ times the direction. The slope form $y=kx+m$ only exists for non-vertical lines. The direction $(-b;a)$ is the normal rotated a quarter turn, so it is perpendicular to it.`,
      )}
    >
      <Graph
        label={tt("Đường thẳng, pháp tuyến và chỉ phương", "The line, its normal and its direction")}
        draw={(ctx, w, h) => {
          const { colors, map } = frame(ctx, w, h, -6, 6, -5, 5, "x", "y", true);
          drawLine(ctx, map, a, b, c, -6, 6, colors.curve, 2.8);
          line(ctx, map.x(x0), map.y(y0), map.x(x0 + (a / n) * 1.8), map.y(y0 + (b / n) * 1.8), colors.alt, 3);
          line(ctx, map.x(x0), map.y(y0), map.x(x0 + u.x * 1.8), map.y(y0 + u.y * 1.8), colors.ink, 3);
          dashed(ctx, map.x(x0), map.y(y0), map.x(N.x), map.y(N.y), colors.soft);
          dot(ctx, map.x(x0), map.y(y0), colors.curve, colors.bg, 6);
          dot(ctx, map.x(N.x), map.y(N.y), colors.alt, colors.bg, 6);
          label(ctx, tt("n (pháp tuyến)", "n (normal)"), map.x(x0 + (a / n) * 1.8) + 6, map.y(y0 + (b / n) * 1.8), colors.alt);
          label(ctx, tt("u (chỉ phương)", "u (direction)"), map.x(x0 + u.x * 1.8) + 6, map.y(y0 + u.y * 1.8), colors.ink);
          label(ctx, "M", map.x(x0) + 8, map.y(y0) + 16, colors.curve);
          label(ctx, "N", map.x(N.x) + 8, map.y(N.y) - 6, colors.alt);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("a (pháp tuyến)", "a (normal)")} value={a0} min={-4} max={4} step={0.5} onChange={setA} />
        <Slider label={tt("b (pháp tuyến)", "b (normal)")} value={b0} min={-4} max={4} step={0.5} onChange={setB} />
        <Slider label={tt("Điểm M: x₀", "Point M: x₀")} value={x0} min={-4} max={4} step={0.5} onChange={setX0} />
        <Slider label={tt("Điểm M: y₀", "Point M: y₀")} value={y0} min={-3} max={3} step={0.5} onChange={setY0} />
        <Slider label={tt("Tham số t (trượt N)", "Parameter t (slide N)")} value={t} min={-5} max={5} step={0.25} onChange={setT} />
      </div>
    </Stage>
  );
}

/* ---------- 2. Hai đường thẳng: cắt, song song, trùng; góc ---------- */

export function TwoLinesLab() {
  const tt = useTx();
  const [a1, setA1] = useState(2);
  const [b1, setB1] = useState(-1);
  const [c1, setC1] = useState(-1);
  const [a2, setA2] = useState(1);
  const [b2, setB2] = useState(2);
  const [c2, setC2] = useState(-4);
  const D = a1 * b2 - a2 * b1;
  const sol = cramer(a1, b1, a2, b2, -c1, -c2);
  const cosPhi = Math.abs(a1 * a2 + b1 * b2) / (Math.hypot(a1, b1) * Math.hypot(a2, b2));
  const phi = (Math.acos(Math.min(1, cosPhi)) * 180) / Math.PI;
  const sameLine = Math.abs(D) < 1e-9 && Math.abs(a1 * c2 - a2 * c1) < 1e-9 && Math.abs(b1 * c2 - b2 * c1) < 1e-9;
  return (
    <Stage
      title={tt("Hai đường thẳng: định thức báo trước kết quả", "Two lines: the determinant predicts the outcome")}
      story={tt(
        R`Hai đường thẳng chỉ có ba khả năng: cắt nhau tại một điểm, song song, hoặc trùng nhau. Con số $D=a_1b_2-a_2b_1$ báo trước: khác 0 thì pháp tuyến không cùng phương nên hai đường cắt nhau; bằng 0 thì cùng hướng, song song hoặc trùng. Góc giữa hai đường là góc giữa hai pháp tuyến (lấy góc không tù). Giao điểm là nghiệm của hệ hai phương trình, giải bằng quy tắc Cramer.`,
        R`Two lines have only three possibilities: they meet at one point, they are parallel, or they coincide. The number $D=a_1b_2-a_2b_1$ predicts which: non-zero means the normals are not parallel so the lines cross; zero means they have the same direction, so they are parallel or equal. The angle between the lines is the angle between their normals (taking the acute one). The intersection solves the two equations, via Cramer's rule.`,
      )}
      read={tt(
        `$${lineTex(a1, b1, c1)}$ và $${lineTex(a2, b2, c2)}$. $D=${fmt(a1)}\\cdot${fmt(b2)}-${fmt(a2)}\\cdot(${fmt(b1)})=${fmt(D, 3)}$: ${sol ? `cắt nhau tại $(${fmt(sol.x, 4)};\\ ${fmt(sol.y, 4)})$` : sameLine ? "trùng nhau" : "song song"}. Góc giữa hai đường: $\\cos\\varphi=\\frac{|a_1a_2+b_1b_2|}{\\sqrt{a_1^2+b_1^2}\\sqrt{a_2^2+b_2^2}}=${fmt(cosPhi, 4)}$, tức $\\varphi=${fmt(phi, 2)}^\\circ$.`,
        `$${lineTex(a1, b1, c1)}$ and $${lineTex(a2, b2, c2)}$. $D=${fmt(a1)}\\cdot${fmt(b2)}-${fmt(a2)}\\cdot(${fmt(b1)})=${fmt(D, 3)}$: ${sol ? `they meet at $(${fmt(sol.x, 4)};\\ ${fmt(sol.y, 4)})$` : sameLine ? "the lines coincide" : "the lines are parallel"}. Angle between the lines: $\\cos\\varphi=\\frac{|a_1a_2+b_1b_2|}{\\sqrt{a_1^2+b_1^2}\\sqrt{a_2^2+b_2^2}}=${fmt(cosPhi, 4)}$, so $\\varphi=${fmt(phi, 2)}^\\circ$.`,
      )}
      why={tt(
        R`Khử $y$ khỏi hai phương trình ra $D\cdot x=\ldots$; chia được cho $D$ khi $D\ne 0$ và có đúng một nghiệm. Hình học: $|D|$ là diện tích hình bình hành dựng trên hai pháp tuyến, bằng 0 khi hai pháp tuyến cùng phương. Cùng hướng mà hệ số tự do không tỉ lệ thì song song; tỉ lệ thì trùng.`,
        R`Eliminating $y$ from the two equations gives $D\cdot x=\ldots$; we can divide by $D$ when $D\ne 0$, and there is exactly one solution. Geometrically $|D|$ is the area of the parallelogram spanned by the two normals, and it is 0 when they are parallel. Same direction with non-proportional constant terms means parallel; proportional means identical.`,
      )}
    >
      <Graph
        label={tt("Hai đường thẳng và giao điểm", "Two lines and their intersection")}
        draw={(ctx, w, h) => {
          const { colors, map } = frame(ctx, w, h, -6, 6, -5, 5, "x", "y", true);
          drawLine(ctx, map, a1, b1, c1, -6, 6, colors.curve);
          drawLine(ctx, map, a2, b2, c2, -6, 6, colors.alt);
          if (sol) dot(ctx, map.x(sol.x), map.y(sol.y), colors.ink, colors.bg, 7);
        }}
      />
      <div className="fz-controls">
        <Slider label="a₁" value={a1} min={-4} max={4} step={1} onChange={setA1} />
        <Slider label="b₁" value={b1} min={-4} max={4} step={1} onChange={setB1} />
        <Slider label="c₁" value={c1} min={-8} max={8} step={1} onChange={setC1} />
        <Slider label="a₂" value={a2} min={-4} max={4} step={1} onChange={setA2} />
        <Slider label="b₂" value={b2} min={-4} max={4} step={1} onChange={setB2} />
        <Slider label="c₂" value={c2} min={-8} max={8} step={1} onChange={setC2} />
      </div>
    </Stage>
  );
}

/* ---------- 3. Đường tròn và đường thẳng ---------- */

export function CircleLineLab() {
  const tt = useTx();
  const [cx, setCx] = useState(1);
  const [cy, setCy] = useState(1);
  const [Rr, setR] = useState(2.5);
  const [a0, setA] = useState(1);
  const [b0, setB] = useState(1);
  const [c, setC] = useState(-1);
  const a = a0 === 0 && b0 === 0 ? 1 : a0;
  const b = b0;
  const res = lineCircle(a, b, c, cx, cy, Rr);
  const status = res.points.length === 2 ? "cut" : Math.abs(res.d - Rr) < 1e-6 ? "touch" : res.points.length === 1 ? "touch" : "miss";
  const cTouch = -(a * cx + b * cy) + Rr * Math.hypot(a, b);
  return (
    <Stage
      title={tt("Đường tròn và đường thẳng: so khoảng cách với bán kính", "A circle and a line: compare the distance with the radius")}
      story={tt(
        R`Đường tròn là mọi điểm cách tâm đúng $R$. Một đường thẳng có thể cắt nó tại hai điểm, chạm đúng một điểm (tiếp xúc), hoặc đứng ngoài. Cách phân biệt rất gọn: đo khoảng cách $d$ từ tâm đến đường thẳng rồi so với $R$. Máy tính chân đường vuông góc, rồi dùng Pythagore để tìm hai giao điểm cách chân một đoạn $\sqrt{R^2-d^2}$.`,
        R`A circle is every point at distance exactly $R$ from the centre. A line can cut it at two points, touch it at exactly one (tangent), or stay outside. Telling them apart is easy: measure the distance $d$ from the centre to the line and compare it with $R$. The machine finds the foot of the perpendicular, then uses Pythagoras to place the two intersection points at distance $\sqrt{R^2-d^2}$ from the foot.`,
      )}
      read={tt(
        `Đường tròn $(x-${fmt(cx)})^2+(y-${fmt(cy)})^2=${fmt(Rr * Rr, 3)}$; khai triển $x^2+y^2-${fmt(2 * cx)}x-${fmt(2 * cy)}y+${fmt(cx * cx + cy * cy - Rr * Rr, 3)}=0$. Đường thẳng $${lineTex(a, b, c)}$. Khoảng cách $d=\\frac{|a x_I+b y_I+c|}{\\sqrt{a^2+b^2}}=${fmt(res.d, 4)}$ so với $R=${fmt(Rr)}$: ${status === "cut" ? `$d<R$, cắt tại hai điểm: ${res.points.map((p) => `$(${fmt(p.x, 3)};${fmt(p.y, 3)})$`).join(", ")}` : status === "touch" ? "$d=R$, tiếp xúc" : "$d>R$, không có điểm chung"}. Tiếp xúc xảy ra khi $c=${fmt(cTouch, 3)}$.`,
        `Circle $(x-${fmt(cx)})^2+(y-${fmt(cy)})^2=${fmt(Rr * Rr, 3)}$; expanded $x^2+y^2-${fmt(2 * cx)}x-${fmt(2 * cy)}y+${fmt(cx * cx + cy * cy - Rr * Rr, 3)}=0$. Line $${lineTex(a, b, c)}$. Distance $d=\\frac{|a x_I+b y_I+c|}{\\sqrt{a^2+b^2}}=${fmt(res.d, 4)}$ versus $R=${fmt(Rr)}$: ${status === "cut" ? `$d<R$, it cuts at two points: ${res.points.map((p) => `$(${fmt(p.x, 3)};${fmt(p.y, 3)})$`).join(", ")}` : status === "touch" ? "$d=R$, tangent" : "$d>R$, no common point"}. Tangency happens when $c=${fmt(cTouch, 3)}$.`,
      )}
      why={tt(
        R`Từ tâm kẻ đường vuông góc xuống đường thẳng, chân là $H$. Với mọi điểm $N$ trên đường thẳng, $IN^2=d^2+HN^2$ (Pythagore). $N$ nằm trên đường tròn khi $IN=R$, tức $HN^2=R^2-d^2$: hai nghiệm nếu $d<R$, một nếu $d=R$, không có nếu $d>R$. Tiếp tuyến luôn vuông góc với bán kính tại tiếp điểm.`,
        R`Drop the perpendicular from the centre to the line, with foot $H$. For any point $N$ of the line, $IN^2=d^2+HN^2$ (Pythagoras). $N$ is on the circle when $IN=R$, i.e. $HN^2=R^2-d^2$: two solutions if $d<R$, one if $d=R$, none if $d>R$. A tangent is always perpendicular to the radius at the point of contact.`,
      )}
    >
      <Graph
        label={tt("Đường tròn, đường thẳng và các giao điểm", "The circle, the line and the intersection points")}
        draw={(ctx, w, h) => {
          const { colors, map } = frame(ctx, w, h, -6, 8, -5, 6, "x", "y", true);
          ctx.beginPath();
          ctx.strokeStyle = colors.ink;
          ctx.lineWidth = 2.4;
          ctx.ellipse(map.x(cx), map.y(cy), map.x(Rr) - map.x(0), map.y(0) - map.y(Rr), 0, 0, Math.PI * 2);
          ctx.stroke();
          drawLine(ctx, map, a, b, c, -6, 8, status === "touch" ? colors.ink : colors.alt, 2.6);
          dashed(ctx, map.x(cx), map.y(cy), map.x(res.foot.x), map.y(res.foot.y), colors.soft);
          dot(ctx, map.x(cx), map.y(cy), colors.curve, colors.bg, 5);
          dot(ctx, map.x(res.foot.x), map.y(res.foot.y), colors.soft, colors.bg, 4);
          for (const p of res.points) dot(ctx, map.x(p.x), map.y(p.y), colors.alt, colors.bg, 6);
          label(ctx, `d = ${fmt(res.d, 2)}`, map.x((cx + res.foot.x) / 2) + 6, map.y((cy + res.foot.y) / 2), colors.soft);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Tâm: x", "Centre: x")} value={cx} min={-3} max={5} step={0.5} onChange={setCx} />
        <Slider label={tt("Tâm: y", "Centre: y")} value={cy} min={-3} max={4} step={0.5} onChange={setCy} />
        <Slider label={tt("Bán kính R", "Radius R")} value={Rr} min={0.5} max={4} step={0.25} onChange={setR} />
        <Slider label="a" value={a0} min={-3} max={3} step={0.5} onChange={setA} />
        <Slider label="b" value={b0} min={-3} max={3} step={0.5} onChange={setB} />
        <Slider label="c" value={c} min={-12} max={12} step={0.5} onChange={setC} />
      </div>
      <Buttons><button type="button" className="text-btn" onClick={() => setC(Math.round(cTouch * 2) / 2)}>{tt("Chỉnh về gần tiếp xúc", "Adjust to nearly tangent")}</button></Buttons>
    </Stage>
  );
}

/* ---------- 4. Mặt phẳng trong không gian: tích có hướng và khoảng cách ---------- */

export function PlaneLab() {
  const tt = useTx();
  const [p, setP] = useState(3);
  const [q, setQ] = useState(3);
  const [r, setR] = useState(3);
  const [px, setPx] = useState(2);
  const [py, setPy] = useState(2);
  const [pz, setPz] = useState(3);
  const A: V3 = [p, 0, 0];
  const B: V3 = [0, q, 0];
  const C: V3 = [0, 0, r];
  const P: V3 = [px, py, pz];
  const AB = sub3(B, A);
  const AC = sub3(C, A);
  const plane = planeThrough(A, B, C);
  const nLen = Math.hypot(...plane.n);
  const dist = distToPlane(plane, P);
  const sgn = (dot3(plane.n, P) + plane.D) / nLen;
  const foot: V3 = [P[0] - (plane.n[0] / nLen) * sgn, P[1] - (plane.n[1] / nLen) * sgn, P[2] - (plane.n[2] / nLen) * sgn];
  const onPlane = dot3(plane.n, foot) + plane.D;
  const [nx, ny, nz] = plane.n;
  const eq = `${fmt(nx, 2)}x${ny < 0 ? "-" : "+"}${fmt(Math.abs(ny), 2)}y${nz < 0 ? "-" : "+"}${fmt(Math.abs(nz), 2)}z${plane.D < 0 ? "-" : "+"}${fmt(Math.abs(plane.D), 2)}=0`;
  return (
    <Stage
      title={tt("Mặt phẳng qua ba điểm: tích có hướng cho pháp tuyến", "A plane through three points: the cross product gives the normal")}
      story={tt(
        R`Ba điểm không thẳng hàng xác định một mặt phẳng. Để viết phương trình ta cần một hướng vuông góc với mặt phẳng (pháp tuyến). Lấy hai cạnh $\overrightarrow{AB}$ và $\overrightarrow{AC}$, tích có hướng của chúng là một vectơ vuông góc với cả hai, tức vuông góc với mặt phẳng. Từ pháp tuyến, khoảng cách từ một điểm tới mặt phẳng là độ dài hình chiếu của vectơ nối lên pháp tuyến.`,
        R`Three non-collinear points determine a plane. To write its equation we need a direction perpendicular to the plane (the normal). Take two edges $\overrightarrow{AB}$ and $\overrightarrow{AC}$; their cross product is perpendicular to both, hence to the plane. With the normal, the distance from a point to the plane is the length of the projection of a connecting vector onto the normal.`,
      )}
      read={tt(
        `$A(${fmt(p)};0;0)$, $B(0;${fmt(q)};0)$, $C(0;0;${fmt(r)})$. $\\overrightarrow{AB}\\times\\overrightarrow{AC}=(${fmt(nx, 2)};${fmt(ny, 2)};${fmt(nz, 2)})$; vuông góc: $n\\cdot AB=${fmt(dot3(plane.n, AB), 6)}$, $n\\cdot AC=${fmt(dot3(plane.n, AC), 6)}$. Mặt phẳng $${eq}$. Điểm $P(${fmt(px)};${fmt(py)};${fmt(pz)})$ cách mặt phẳng $d=\\frac{|Ax_0+By_0+Cz_0+D|}{\\sqrt{A^2+B^2+C^2}}=${fmt(dist, 4)}$; chân đường vuông góc $(${fmt(foot[0], 3)};${fmt(foot[1], 3)};${fmt(foot[2], 3)})$ thỏa phương trình mặt phẳng: sai số $${fmt(onPlane, 8)}$.`,
        `$A(${fmt(p)};0;0)$, $B(0;${fmt(q)};0)$, $C(0;0;${fmt(r)})$. $\\overrightarrow{AB}\\times\\overrightarrow{AC}=(${fmt(nx, 2)};${fmt(ny, 2)};${fmt(nz, 2)})$; perpendicular: $n\\cdot AB=${fmt(dot3(plane.n, AB), 6)}$, $n\\cdot AC=${fmt(dot3(plane.n, AC), 6)}$. Plane $${eq}$. Point $P(${fmt(px)};${fmt(py)};${fmt(pz)})$ is at distance $d=\\frac{|Ax_0+By_0+Cz_0+D|}{\\sqrt{A^2+B^2+C^2}}=${fmt(dist, 4)}$; the foot of the perpendicular $(${fmt(foot[0], 3)};${fmt(foot[1], 3)};${fmt(foot[2], 3)})$ satisfies the plane equation: error $${fmt(onPlane, 8)}$.`,
      )}
      why={tt(
        R`Với $\vec{n}=(A;B;C)$ và điểm $A_0$ trên mặt phẳng, điểm $X$ thuộc mặt phẳng khi $\vec{n}\cdot\overrightarrow{A_0X}=0$, khai triển ra $Ax+By+Cz+D=0$. Chiếu vectơ $\overrightarrow{A_0P}$ lên $\vec{n}$ được độ dài $\frac{|\vec{n}\cdot\overrightarrow{A_0P}|}{|\vec{n}|}$: đó là công thức khoảng cách. Độ dài tích có hướng còn bằng diện tích hình bình hành dựng trên $AB$ và $AC$.`,
        R`With $\vec{n}=(A;B;C)$ and a point $A_0$ on the plane, a point $X$ is on the plane when $\vec{n}\cdot\overrightarrow{A_0X}=0$, which expands to $Ax+By+Cz+D=0$. Projecting $\overrightarrow{A_0P}$ onto $\vec{n}$ gives length $\frac{|\vec{n}\cdot\overrightarrow{A_0P}|}{|\vec{n}|}$: that is the distance formula. The length of the cross product is also the area of the parallelogram spanned by $AB$ and $AC$.`,
      )}
    >
      <Graph
        label={tt("Mặt phẳng ABC, pháp tuyến và điểm P trong không gian", "The plane ABC, its normal and the point P in space")}
        draw={(ctx, w, h) => {
          const { colors } = frame(ctx, w, h, 0, 1, 0, 1);
          ctx.clearRect(0, 0, w, h);
          ctx.fillStyle = colors.bg;
          ctx.fillRect(0, 0, w, h);
          const m = fitIso([[0, 0, 0], [6, 0, 0], [0, 6, 0], [0, 0, 6], A, B, C, P], w, h, 30);
          const S = (v: V3) => m(v[0], v[1], v[2]);
          const axis = (to: V3, name: string) => { const a0 = S([0, 0, 0]); const a1 = S(to); line(ctx, a0.x, a0.y, a1.x, a1.y, colors.soft, 1.2); label(ctx, name, a1.x + 4, a1.y - 4, colors.soft); };
          axis([6, 0, 0], "x"); axis([0, 6, 0], "y"); axis([0, 0, 6], "z");
          ctx.beginPath();
          const sa = S(A); const sb = S(B); const sc = S(C);
          ctx.moveTo(sa.x, sa.y); ctx.lineTo(sb.x, sb.y); ctx.lineTo(sc.x, sc.y); ctx.closePath();
          ctx.fillStyle = colors.curve;
          ctx.globalAlpha = 0.22;
          ctx.fill();
          ctx.globalAlpha = 1;
          ctx.strokeStyle = colors.curve;
          ctx.lineWidth = 2.2;
          ctx.stroke();
          const cen: V3 = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3, (A[2] + B[2] + C[2]) / 3];
          const nUnit: V3 = [(plane.n[0] / nLen) * 2.4, (plane.n[1] / nLen) * 2.4, (plane.n[2] / nLen) * 2.4];
          const c0 = S(cen); const c1 = S([cen[0] + nUnit[0], cen[1] + nUnit[1], cen[2] + nUnit[2]]);
          line(ctx, c0.x, c0.y, c1.x, c1.y, colors.alt, 3);
          label(ctx, tt("pháp tuyến", "normal"), c1.x + 6, c1.y, colors.alt);
          const sp = S(P); const sf = S(foot);
          dashed(ctx, sp.x, sp.y, sf.x, sf.y, colors.ink);
          dot(ctx, sf.x, sf.y, colors.soft, colors.bg, 4);
          dot(ctx, sp.x, sp.y, colors.ink, colors.bg, 6);
          for (const [nm, v] of [["A", sa], ["B", sb], ["C", sc]] as const) { dot(ctx, v.x, v.y, colors.curve, colors.bg, 5); label(ctx, nm, v.x + 7, v.y - 6, colors.curve); }
          label(ctx, `P (d = ${fmt(dist, 2)})`, sp.x + 8, sp.y - 6, colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("A trên trục x", "A on the x-axis")} value={p} min={1} max={5} step={0.5} onChange={setP} />
        <Slider label={tt("B trên trục y", "B on the y-axis")} value={q} min={1} max={5} step={0.5} onChange={setQ} />
        <Slider label={tt("C trên trục z", "C on the z-axis")} value={r} min={1} max={5} step={0.5} onChange={setR} />
        <Slider label={tt("Điểm P: x", "Point P: x")} value={px} min={0} max={5} step={0.5} onChange={setPx} />
        <Slider label={tt("Điểm P: y", "Point P: y")} value={py} min={0} max={5} step={0.5} onChange={setPy} />
        <Slider label={tt("Điểm P: z", "Point P: z")} value={pz} min={0} max={5} step={0.5} onChange={setPz} />
      </div>
    </Stage>
  );
}

/* ---------- 5. Mặt phẳng cắt mặt cầu ---------- */

export function SphereSectionLab() {
  const tt = useTx();
  const [Rr, setR] = useState(3);
  const [d, setD] = useState(1.8);
  const dd = Math.min(d, Rr + 1);
  const r = dd <= Rr ? Math.sqrt(Math.max(0, Rr * Rr - dd * dd)) : null;
  return (
    <Stage
      title={tt("Mặt phẳng cắt mặt cầu: giao tuyến là một đường tròn", "A plane cutting a sphere: the section is a circle")}
      story={tt(
        R`Cắt một quả cam bằng một nhát dao phẳng: vết cắt luôn là hình tròn. Nhìn từ cạnh, mặt phẳng là một đường thẳng nằm ngang cách tâm $d$, quả cầu là đường tròn bán kính $R$. Dây cung nằm trên đường thẳng ấy chính là đường kính của vết cắt. Càng cắt xa tâm thì vết cắt càng nhỏ, đến khi $d=R$ thì dao chỉ chạm vào cam tại một điểm.`,
        R`Slice an orange with one flat cut: the cut is always a circle. Seen from the side, the plane is a horizontal line at distance $d$ from the centre and the sphere is a circle of radius $R$. The chord lying on that line is the diameter of the section. The farther from the centre you cut, the smaller the section, until at $d=R$ the knife only touches the orange at one point.`,
      )}
      read={r !== null
        ? tt(
          `$R=${fmt(Rr)}$, $d=${fmt(dd)}$: ${dd < Rr ? `cắt theo đường tròn bán kính $r=\\sqrt{R^2-d^2}=${fmt(r, 4)}$ (tam giác vuông: $${fmt(dd)}^2+${fmt(r, 3)}^2=${fmt(dd * dd + r * r, 3)}=${fmt(Rr * Rr, 3)}=R^2$). Chu vi vết cắt $${fmt(2 * Math.PI * r, 3)}$, diện tích $${fmt(Math.PI * r * r, 3)}$.` : "tiếp xúc tại đúng một điểm, $r=0$."}`,
          `$R=${fmt(Rr)}$, $d=${fmt(dd)}$: ${dd < Rr ? `the section is a circle of radius $r=\\sqrt{R^2-d^2}=${fmt(r, 4)}$ (right triangle: $${fmt(dd)}^2+${fmt(r, 3)}^2=${fmt(dd * dd + r * r, 3)}=${fmt(Rr * Rr, 3)}=R^2$). Its circumference is $${fmt(2 * Math.PI * r, 3)}$ and its area $${fmt(Math.PI * r * r, 3)}$.` : "tangent at exactly one point, $r=0$."}`,
        )
        : tt(`$d=${fmt(dd)}>R=${fmt(Rr)}$: mặt phẳng không cắt mặt cầu.`, `$d=${fmt(dd)}>R=${fmt(Rr)}$: the plane does not meet the sphere.`)}
      why={tt(
        R`Gọi $I$ là tâm cầu, $H$ là hình chiếu của $I$ lên mặt phẳng ($IH=d$), $N$ là một điểm của mặt cầu nằm trên mặt phẳng. Tam giác $IHN$ vuông tại $H$ nên $HN^2=R^2-d^2$ không phụ thuộc $N$: mọi điểm chung cách $H$ cùng một khoảng, tức nằm trên một đường tròn tâm $H$.`,
        R`Let $I$ be the centre of the sphere, $H$ the projection of $I$ onto the plane ($IH=d$), and $N$ a point of the sphere lying in the plane. Triangle $IHN$ is right-angled at $H$, so $HN^2=R^2-d^2$ does not depend on $N$: all common points are at the same distance from $H$, i.e. lie on a circle centred at $H$.`,
      )}
    >
      <Graph
        label={tt("Hình cắt ngang: quả cầu, mặt phẳng và vết cắt", "Side view: the sphere, the plane and the section")}
        draw={(ctx, w, h) => {
          const { colors, map } = frame(ctx, w, h, -5, 5, -4.5, 4.5, "x", "y", true);
          ctx.beginPath();
          ctx.strokeStyle = colors.ink;
          ctx.lineWidth = 2.4;
          ctx.ellipse(map.x(0), map.y(0), map.x(Rr) - map.x(0), map.y(0) - map.y(Rr), 0, 0, Math.PI * 2);
          ctx.stroke();
          line(ctx, map.x(-5), map.y(dd), map.x(5), map.y(dd), colors.curve, 2);
          if (r !== null) {
            line(ctx, map.x(-r), map.y(dd), map.x(r), map.y(dd), colors.alt, 5);
            dashed(ctx, map.x(0), map.y(0), map.x(0), map.y(dd), colors.soft);
            dashed(ctx, map.x(0), map.y(0), map.x(r), map.y(dd), colors.soft);
            dot(ctx, map.x(r), map.y(dd), colors.alt, colors.bg, 5);
            label(ctx, `r = ${fmt(r, 2)}`, map.x(r / 2) - 12, map.y(dd) - 8, colors.alt);
          }
          label(ctx, `d = ${fmt(dd, 2)}`, map.x(0) + 6, map.y(dd / 2), colors.soft);
          label(ctx, `R = ${fmt(Rr, 2)}`, map.x(Rr * 0.4), map.y(Rr * 0.5) + 14, colors.ink);
          dot(ctx, map.x(0), map.y(0), colors.ink, colors.bg, 4);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Bán kính R", "Radius R")} value={Rr} min={1} max={4} step={0.25} onChange={setR} />
        <Slider label={tt("Khoảng cách d từ tâm đến mặt phẳng", "Distance d from the centre to the plane")} value={d} min={0} max={5} step={0.1} onChange={setD} />
      </div>
    </Stage>
  );
}

