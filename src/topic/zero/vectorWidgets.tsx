import { useState } from "react";
import { matApply, matDet, matMul, polyArea, type M2 } from "../../algo/index.ts";
import { dashed, dot } from "../../labs/draw.ts";
import { Graph } from "../../labs/Graph.tsx";
import { fmt } from "../../lib/format.ts";
import { Slider } from "../../ui/Slider.tsx";
import { frame, label, line, useTx } from "./kit.ts";
import { Buttons, Stage } from "./widgets.tsx";

const R = String.raw;
type P2 = { x: number; y: number };

function arrow(ctx: CanvasRenderingContext2D, ax: number, ay: number, bx: number, by: number, color: string, lw = 2.4) {
  line(ctx, ax, ay, bx, by, color, lw);
  const ang = Math.atan2(by - ay, bx - ax);
  ctx.beginPath();
  ctx.moveTo(bx, by);
  ctx.lineTo(bx - 9 * Math.cos(ang - 0.4), by - 9 * Math.sin(ang - 0.4));
  ctx.lineTo(bx - 9 * Math.cos(ang + 0.4), by - 9 * Math.sin(ang + 0.4));
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

/* ---------- 1. Trung điểm, trọng tâm bằng vectơ ---------- */

export function VectorCentroidLab() {
  const tt = useTx();
  const [cx, setCx] = useState(2);
  const [cy, setCy] = useState(5);
  const [mx, setMx] = useState(-1);
  const [my, setMy] = useState(-1);
  const A: P2 = { x: 0, y: 0 };
  const B: P2 = { x: 6, y: 0 };
  const C: P2 = { x: cx, y: cy };
  const M: P2 = { x: mx, y: my };
  const G: P2 = { x: (A.x + B.x + C.x) / 3, y: (A.y + B.y + C.y) / 3 };
  const I: P2 = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 };
  const v = (P: P2, Q: P2): P2 => ({ x: Q.x - P.x, y: Q.y - P.y });
  const add = (...ps: P2[]): P2 => ({ x: ps.reduce((s, p) => s + p.x, 0), y: ps.reduce((s, p) => s + p.y, 0) });
  const sumAB = add(v(M, A), v(M, B));
  const sumABC = add(v(M, A), v(M, B), v(M, C));
  const gSum = add(v(G, A), v(G, B), v(G, C));
  return (
    <Stage
      title={tt("Vectơ cộng nối đuôi: trung điểm và trọng tâm", "Vectors add end to end: midpoint and centroid")}
      story={tt(
        R`Từ một điểm $M$ bất kì vẽ các vectơ tới ba đỉnh. Cộng vectơ là nối đuôi chúng. Nếu $I$ là trung điểm $AB$ thì $\overrightarrow{MA}+\overrightarrow{MB}=2\overrightarrow{MI}$ với mọi $M$; nếu $G$ là trọng tâm thì $\overrightarrow{MA}+\overrightarrow{MB}+\overrightarrow{MC}=3\overrightarrow{MG}$ với mọi $M$. Kéo $M$ đi đâu cũng thấy hai vế bằng nhau. Chọn $M=G$ thì vế phải bằng $\vec{0}$: tổng ba vectơ từ trọng tâm tới ba đỉnh triệt tiêu.`,
        R`From any point $M$ draw the vectors to the three vertices. Adding vectors means putting them end to end. If $I$ is the midpoint of $AB$ then $\overrightarrow{MA}+\overrightarrow{MB}=2\overrightarrow{MI}$ for every $M$; if $G$ is the centroid then $\overrightarrow{MA}+\overrightarrow{MB}+\overrightarrow{MC}=3\overrightarrow{MG}$ for every $M$. Drag $M$ anywhere and the two sides still agree. Choose $M=G$ and the right side is $\vec{0}$: the three vectors from the centroid to the vertices cancel.`,
      )}
      read={tt(
        `$\\overrightarrow{MA}+\\overrightarrow{MB}=(${fmt(sumAB.x, 3)};${fmt(sumAB.y, 3)})$ và $2\\overrightarrow{MI}=(${fmt(2 * (I.x - M.x), 3)};${fmt(2 * (I.y - M.y), 3)})$. $\\overrightarrow{MA}+\\overrightarrow{MB}+\\overrightarrow{MC}=(${fmt(sumABC.x, 3)};${fmt(sumABC.y, 3)})$ và $3\\overrightarrow{MG}=(${fmt(3 * (G.x - M.x), 3)};${fmt(3 * (G.y - M.y), 3)})$. Từ trọng tâm: $\\overrightarrow{GA}+\\overrightarrow{GB}+\\overrightarrow{GC}=(${fmt(gSum.x, 6)};${fmt(gSum.y, 6)})$. Trọng tâm $G=\\left(\\frac{x_A+x_B+x_C}{3};\\frac{y_A+y_B+y_C}{3}\\right)=(${fmt(G.x, 3)};${fmt(G.y, 3)})$.`,
        `$\\overrightarrow{MA}+\\overrightarrow{MB}=(${fmt(sumAB.x, 3)};${fmt(sumAB.y, 3)})$ and $2\\overrightarrow{MI}=(${fmt(2 * (I.x - M.x), 3)};${fmt(2 * (I.y - M.y), 3)})$. $\\overrightarrow{MA}+\\overrightarrow{MB}+\\overrightarrow{MC}=(${fmt(sumABC.x, 3)};${fmt(sumABC.y, 3)})$ and $3\\overrightarrow{MG}=(${fmt(3 * (G.x - M.x), 3)};${fmt(3 * (G.y - M.y), 3)})$. From the centroid: $\\overrightarrow{GA}+\\overrightarrow{GB}+\\overrightarrow{GC}=(${fmt(gSum.x, 6)};${fmt(gSum.y, 6)})$. The centroid $G=\\left(\\frac{x_A+x_B+x_C}{3};\\frac{y_A+y_B+y_C}{3}\\right)=(${fmt(G.x, 3)};${fmt(G.y, 3)})$.`,
      )}
      why={tt(
        R`Chèn điểm $I$ vào: $\overrightarrow{MA}=\overrightarrow{MI}+\overrightarrow{IA}$ và $\overrightarrow{MB}=\overrightarrow{MI}+\overrightarrow{IB}$. Cộng lại, $\overrightarrow{IA}+\overrightarrow{IB}=\vec{0}$ vì $I$ ở giữa, còn $2\overrightarrow{MI}$. Với toạ độ, cộng vectơ là cộng từng thành phần nên toạ độ trọng tâm là trung bình cộng toạ độ ba đỉnh. Một công thức hình học viết thành phép cộng số: đó là sức mạnh của vectơ.`,
        R`Insert the point $I$: $\overrightarrow{MA}=\overrightarrow{MI}+\overrightarrow{IA}$ and $\overrightarrow{MB}=\overrightarrow{MI}+\overrightarrow{IB}$. Adding, $\overrightarrow{IA}+\overrightarrow{IB}=\vec{0}$ because $I$ is in the middle, leaving $2\overrightarrow{MI}$. With coordinates, adding vectors is adding components so the centroid's coordinates are the averages of the three vertices'. A geometric formula becomes plain addition of numbers: that is the power of vectors.`,
      )}
    >
      <Graph
        label={tt("Tam giác ABC, điểm M và các vectơ từ M", "Triangle ABC, the point M and the vectors from M")}
        draw={(ctx, w, h) => {
          const { colors, map } = frame(ctx, w, h, -4, 9, -3, 8, "x", "y", true);
          ctx.beginPath();
          ctx.moveTo(map.x(A.x), map.y(A.y)); ctx.lineTo(map.x(B.x), map.y(B.y)); ctx.lineTo(map.x(C.x), map.y(C.y)); ctx.closePath();
          ctx.fillStyle = colors.curve; ctx.globalAlpha = 0.1; ctx.fill(); ctx.globalAlpha = 1; ctx.strokeStyle = colors.ink; ctx.lineWidth = 2; ctx.stroke();
          for (const [P, col] of [[A, colors.curve], [B, colors.curve], [C, colors.curve]] as const) arrow(ctx, map.x(M.x), map.y(M.y), map.x(P.x), map.y(P.y), col, 1.6);
          arrow(ctx, map.x(M.x), map.y(M.y), map.x(M.x + sumABC.x), map.y(M.y + sumABC.y), colors.alt, 3);
          dashed(ctx, map.x(M.x), map.y(M.y), map.x(G.x), map.y(G.y), colors.soft);
          for (const [nm, P] of [["A", A], ["B", B], ["C", C]] as const) { dot(ctx, map.x(P.x), map.y(P.y), colors.ink, colors.bg, 5); label(ctx, nm, map.x(P.x) + 8, map.y(P.y) - 6, colors.ink); }
          dot(ctx, map.x(G.x), map.y(G.y), colors.alt, colors.bg, 6); label(ctx, "G", map.x(G.x) + 8, map.y(G.y) - 6, colors.alt);
          dot(ctx, map.x(I.x), map.y(I.y), colors.curve, colors.bg, 5); label(ctx, "I", map.x(I.x) + 8, map.y(I.y) + 16, colors.curve);
          dot(ctx, map.x(M.x), map.y(M.y), colors.ink, colors.bg, 6); label(ctx, "M", map.x(M.x) - 14, map.y(M.y) + 16, colors.ink);
          label(ctx, tt("MA + MB + MC = 3·MG", "MA + MB + MC = 3·MG"), map.x(M.x + sumABC.x) + 6, map.y(M.y + sumABC.y) - 6, colors.alt);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Đỉnh C: x", "Vertex C: x")} value={cx} min={-2} max={8} step={0.5} onChange={setCx} />
        <Slider label={tt("Đỉnh C: y", "Vertex C: y")} value={cy} min={1} max={7} step={0.5} onChange={setCy} />
        <Slider label={tt("Điểm M: x", "Point M: x")} value={mx} min={-3} max={8} step={0.5} onChange={setMx} />
        <Slider label={tt("Điểm M: y", "Point M: y")} value={my} min={-2} max={7} step={0.5} onChange={setMy} />
      </div>
    </Stage>
  );
}

/* ---------- 2. Ma trận là một phép biến đổi; định thức là hệ số co giãn diện tích ---------- */

const PRESETS: { vi: string; en: string; m: M2 }[] = [
  { vi: "quay 30°", en: "rotate 30°", m: [0.866, -0.5, 0.5, 0.866] },
  { vi: "kéo xiên", en: "shear", m: [1, 1, 0, 1] },
  { vi: "giãn 2 lần theo x", en: "stretch ×2 along x", m: [2, 0, 0, 1] },
  { vi: "đối xứng qua trục x", en: "reflect across the x-axis", m: [1, 0, 0, -1] },
  { vi: "dẹt lại (định thức 0)", en: "squash flat (determinant 0)", m: [1, 2, 0.5, 1] },
];

export function MatrixLab() {
  const tt = useTx();
  const [m, setM] = useState<M2>([1.5, 0.5, 0, 1]);
  const S: M2 = [1, 1, 0, 1];
  const sq: P2[] = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }];
  const img = sq.map((p) => matApply(m, p));
  const area = polyArea(img);
  const det = matDet(m);
  const sm = matMul(S, m);
  const ms = matMul(m, S);
  const same = sm.every((v, i) => Math.abs(v - (ms[i] as number)) < 1e-9);
  const set = (i: number, v: number) => setM(m.map((x, k) => (k === i ? v : x)) as M2);
  return (
    <Stage
      title={tt("Ma trận là một phép biến đổi mặt phẳng; định thức là hệ số đổi diện tích", "A matrix is a transformation of the plane; the determinant is the area scale factor")}
      story={tt(
        R`Ma trận $\begin{pmatrix}a&b\\c&d\end{pmatrix}$ nói: vectơ $i=(1;0)$ biến thành $(a;c)$ và vectơ $j=(0;1)$ biến thành $(b;d)$ (hai cột), còn mọi vectơ khác biến theo. Cả lưới ô vuông bị uốn thành lưới hình bình hành; hình vuông đơn vị thành hình bình hành dựng trên hai cột. Diện tích của nó là $|ad-bc|$: định thức cho biết phép biến đổi phóng to hay thu nhỏ diện tích bao nhiêu lần, và bằng 0 khi mặt phẳng bị ép dẹt (không có phép biến đổi ngược). Đường nét đứt cho thấy thứ tự quan trọng: làm $M$ rồi kéo xiên khác với kéo xiên rồi làm $M$.`,
        R`The matrix $\begin{pmatrix}a&b\\c&d\end{pmatrix}$ says: the vector $i=(1;0)$ becomes $(a;c)$ and $j=(0;1)$ becomes $(b;d)$ (the two columns), and every other vector follows. The whole square grid is bent into a parallelogram grid; the unit square becomes the parallelogram spanned by the two columns. Its area is $|ad-bc|$: the determinant says how much the transformation scales areas, and it is 0 when the plane is squashed flat (no inverse transformation). The dashed outline shows that order matters: doing $M$ then a shear differs from shearing then doing $M$.`,
      )}
      read={tt(
        `$M=\\begin{pmatrix}${fmt(m[0], 2)}&${fmt(m[1], 2)}\\\\${fmt(m[2], 2)}&${fmt(m[3], 2)}\\end{pmatrix}$: $i\\to(${fmt(m[0], 2)};${fmt(m[2], 2)})$, $j\\to(${fmt(m[1], 2)};${fmt(m[3], 2)})$. Định thức $ad-bc=${fmt(det, 4)}$; diện tích ảnh hình vuông đơn vị (đo bằng toạ độ) $${fmt(area, 4)}$. ${Math.abs(det) < 1e-9 ? "Định thức 0: không có ma trận nghịch đảo." : `Có nghịch đảo, $M^{-1}=\\frac{1}{${fmt(det, 3)}}\\begin{pmatrix}${fmt(m[3], 2)}&${fmt(-m[1], 2)}\\\\${fmt(-m[2], 2)}&${fmt(m[0], 2)}\\end{pmatrix}$.`} Thứ tự: $SM$ ${same ? "=" : "≠"} $MS$ (với $S$ là phép kéo xiên $\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$).`,
        `$M=\\begin{pmatrix}${fmt(m[0], 2)}&${fmt(m[1], 2)}\\\\${fmt(m[2], 2)}&${fmt(m[3], 2)}\\end{pmatrix}$: $i\\to(${fmt(m[0], 2)};${fmt(m[2], 2)})$, $j\\to(${fmt(m[1], 2)};${fmt(m[3], 2)})$. Determinant $ad-bc=${fmt(det, 4)}$; area of the image of the unit square (measured from coordinates) $${fmt(area, 4)}$. ${Math.abs(det) < 1e-9 ? "Determinant 0: there is no inverse matrix." : `It has an inverse, $M^{-1}=\\frac{1}{${fmt(det, 3)}}\\begin{pmatrix}${fmt(m[3], 2)}&${fmt(-m[1], 2)}\\\\${fmt(-m[2], 2)}&${fmt(m[0], 2)}\\end{pmatrix}$.`} Order: $SM$ ${same ? "=" : "≠"} $MS$ (with $S$ the shear $\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$).`,
      )}
      why={tt(
        R`Diện tích hình bình hành dựng trên $(a;c)$ và $(b;d)$ là $|ad-bc|$. Vì phép biến đổi tuyến tính co giãn mọi diện tích cùng một hệ số, hệ số đó là $|\det M|$. Nối hai phép biến đổi là nhân hai ma trận, và vì $\det(AB)=\det A\cdot\det B$ nên hệ số co giãn nhân với nhau. Nhân ma trận không giao hoán vì thứ tự làm các phép biến đổi có ảnh hưởng.`,
        R`The area of the parallelogram spanned by $(a;c)$ and $(b;d)$ is $|ad-bc|$. Because a linear transformation scales all areas by the same factor, that factor is $|\det M|$. Chaining two transformations is multiplying two matrices, and since $\det(AB)=\det A\cdot\det B$ the scale factors multiply. Matrix multiplication is not commutative because the order of the transformations matters.`,
      )}
    >
      <Graph
        label={tt("Hình vuông đơn vị và ảnh của nó dưới ma trận", "The unit square and its image under the matrix")}
        draw={(ctx, w, h) => {
          const { colors, map } = frame(ctx, w, h, -4, 6, -3, 4, "x", "y", true);
          ctx.globalAlpha = 0.3;
          for (let g = -4; g <= 4; g++) {
            const pa = matApply(m, { x: g, y: -4 }); const pb = matApply(m, { x: g, y: 4 });
            line(ctx, map.x(pa.x), map.y(pa.y), map.x(pb.x), map.y(pb.y), colors.curve, 1);
            const pc = matApply(m, { x: -4, y: g }); const pd = matApply(m, { x: 4, y: g });
            line(ctx, map.x(pc.x), map.y(pc.y), map.x(pd.x), map.y(pd.y), colors.curve, 1);
          }
          ctx.globalAlpha = 1;
          ctx.beginPath();
          img.forEach((p, i) => (i === 0 ? ctx.moveTo(map.x(p.x), map.y(p.y)) : ctx.lineTo(map.x(p.x), map.y(p.y))));
          ctx.closePath(); ctx.fillStyle = colors.alt; ctx.globalAlpha = 0.3; ctx.fill(); ctx.globalAlpha = 1; ctx.strokeStyle = colors.alt; ctx.lineWidth = 2.4; ctx.stroke();
          ctx.setLineDash([5, 4]); ctx.strokeStyle = colors.ink; ctx.lineWidth = 1.4;
          for (const mm of [sm, ms]) { ctx.beginPath(); sq.map((p) => matApply(mm, p)).forEach((p, i) => (i === 0 ? ctx.moveTo(map.x(p.x), map.y(p.y)) : ctx.lineTo(map.x(p.x), map.y(p.y)))); ctx.closePath(); ctx.stroke(); }
          ctx.setLineDash([]);
          ctx.beginPath(); sq.forEach((p, i) => (i === 0 ? ctx.moveTo(map.x(p.x), map.y(p.y)) : ctx.lineTo(map.x(p.x), map.y(p.y)))); ctx.closePath(); ctx.strokeStyle = colors.soft; ctx.lineWidth = 1.6; ctx.stroke();
          arrow(ctx, map.x(0), map.y(0), map.x(m[0]), map.y(m[2]), colors.curve, 3);
          arrow(ctx, map.x(0), map.y(0), map.x(m[1]), map.y(m[3]), colors.ink, 3);
          label(ctx, "i′", map.x(m[0]) + 6, map.y(m[2]) + 14, colors.curve);
          label(ctx, "j′", map.x(m[1]) + 6, map.y(m[3]) - 6, colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label="a" value={m[0]} min={-3} max={3} step={0.25} onChange={(v) => set(0, v)} />
        <Slider label="b" value={m[1]} min={-3} max={3} step={0.25} onChange={(v) => set(1, v)} />
        <Slider label="c" value={m[2]} min={-3} max={3} step={0.25} onChange={(v) => set(2, v)} />
        <Slider label="d" value={m[3]} min={-3} max={3} step={0.25} onChange={(v) => set(3, v)} />
      </div>
      <Buttons>{PRESETS.map((q) => <button key={q.vi} type="button" className="text-btn" onClick={() => setM(q.m)}>{tt(q.vi, q.en)}</button>)}</Buttons>
    </Stage>
  );
}

/* ---------- 3. Một lớp nơ-ron là một ma trận cộng ReLU ---------- */

export function LayerLab() {
  const tt = useTx();
  const [m, setM] = useState<M2>([1, 0.6, -0.4, 1]);
  const [b1, setB1] = useState(0.3);
  const [b2, setB2] = useState(-0.2);
  const [relu, setRelu] = useState(true);
  const pts: P2[] = [];
  for (let i = -4; i <= 4; i++) for (let j = -4; j <= 4; j++) pts.push({ x: i * 0.5, y: j * 0.5 });
  const lin = pts.map((p) => { const q = matApply(m, p); return { x: q.x + b1, y: q.y + b2 }; });
  const out = lin.map((p) => (relu ? { x: Math.max(0, p.x), y: Math.max(0, p.y) } : p));
  const clipped = lin.filter((p) => p.x < 0 || p.y < 0).length;
  const set = (i: number, v: number) => setM(m.map((x, k) => (k === i ? v : x)) as M2);
  return (
    <Stage
      title={tt("Một lớp nơ-ron là một ma trận cộng một phép gấp", "A layer of neurons is a matrix plus a fold")}
      story={tt(
        R`Một lớp có hai nơ-ron nhận vectơ đầu vào $p$ và cho ra $\text{ReLU}(Wp+b)$. Bước một, ma trận $W$ biến lưới điểm thành lưới hình bình hành, cộng $b$ dịch cả lưới. Bước hai, ReLU thay mọi số âm bằng 0: mọi điểm rơi ra ngoài góc phần tư thứ nhất bị «gấp» về các trục. Chấm xám là đầu vào, chấm cam là sau phép biến đổi tuyến tính, chấm đen là sau ReLU. Xếp nhiều lớp như vậy ta được một mạng nơ-ron, và đó chính là đại số tuyến tính cộng một phép gấp lặp đi lặp lại.`,
        R`A layer with two neurons takes an input vector $p$ and outputs $\text{ReLU}(Wp+b)$. Step one: the matrix $W$ turns the grid of points into a parallelogram grid, and adding $b$ shifts the whole grid. Step two: ReLU replaces every negative number by 0, so every point falling outside the first quadrant is «folded» onto the axes. The grey dots are the inputs, the orange dots come after the linear step, the black dots after ReLU. Stack many such layers and you have a neural network: linear algebra plus a fold, repeated.`,
      )}
      read={tt(
        `$W=\\begin{pmatrix}${fmt(m[0], 2)}&${fmt(m[1], 2)}\\\\${fmt(m[2], 2)}&${fmt(m[3], 2)}\\end{pmatrix}$, $b=(${fmt(b1, 2)};${fmt(b2, 2)})$, $\\det W=${fmt(matDet(m), 3)}$. Trong ${pts.length} điểm đầu vào, ${relu ? `${clipped} điểm bị gấp về trục (${fmt((100 * clipped) / pts.length, 0)}%)` : "ReLU đang tắt: các điểm cam giữ nguyên"}. Các điểm bị gấp mất thông tin: nhiều điểm khác nhau cho cùng một đầu ra, nên lớp này không còn khả nghịch.`,
        `$W=\\begin{pmatrix}${fmt(m[0], 2)}&${fmt(m[1], 2)}\\\\${fmt(m[2], 2)}&${fmt(m[3], 2)}\\end{pmatrix}$, $b=(${fmt(b1, 2)};${fmt(b2, 2)})$, $\\det W=${fmt(matDet(m), 3)}$. Of the ${pts.length} input points, ${relu ? `${clipped} are folded onto the axes (${fmt((100 * clipped) / pts.length, 0)}%)` : "ReLU is off: the orange points stay where they are"}. Folded points lose information: many different points give the same output, so the layer is no longer invertible.`,
      )}
      why={tt(
        R`Nếu chỉ có ma trận (không có ReLU) thì xếp bao nhiêu lớp cũng chỉ là một ma trận lớn, vì tích các ma trận vẫn là một ma trận. Phép gấp phi tuyến là thứ cho mạng khả năng vẽ những đường cong và ranh giới phức tạp. Các trọng số trong $W$ chính là những số mà thuật toán lan truyền ngược chỉnh khi mạng học.`,
        R`With matrices alone (no ReLU), however many layers you stack is just one big matrix, since a product of matrices is still a matrix. The nonlinear fold is what lets the network draw complicated curves and boundaries. The weights in $W$ are exactly the numbers that backpropagation adjusts while the network learns.`,
      )}
    >
      <Graph
        label={tt("Lưới điểm trước và sau lớp nơ-ron", "The grid of points before and after the layer")}
        draw={(ctx, w, h) => {
          const { colors, map } = frame(ctx, w, h, -3.5, 4, -3, 3.5, "x", "y", true);
          pts.forEach((p, i) => {
            const l = lin[i] as P2; const o = out[i] as P2;
            if (relu && (l.x < 0 || l.y < 0)) dashed(ctx, map.x(l.x), map.y(l.y), map.x(o.x), map.y(o.y), colors.soft);
            dot(ctx, map.x(p.x), map.y(p.y), colors.soft, colors.bg, 2.5);
            dot(ctx, map.x(l.x), map.y(l.y), colors.alt, colors.bg, 3);
            dot(ctx, map.x(o.x), map.y(o.y), colors.ink, colors.bg, 3);
          });
        }}
      />
      <div className="fz-controls">
        <Slider label="W₁₁" value={m[0]} min={-2} max={2} step={0.1} onChange={(v) => set(0, v)} />
        <Slider label="W₁₂" value={m[1]} min={-2} max={2} step={0.1} onChange={(v) => set(1, v)} />
        <Slider label="W₂₁" value={m[2]} min={-2} max={2} step={0.1} onChange={(v) => set(2, v)} />
        <Slider label="W₂₂" value={m[3]} min={-2} max={2} step={0.1} onChange={(v) => set(3, v)} />
        <Slider label={tt("Ngưỡng b₁", "Bias b₁")} value={b1} min={-1.5} max={1.5} step={0.1} onChange={setB1} />
        <Slider label={tt("Ngưỡng b₂", "Bias b₂")} value={b2} min={-1.5} max={1.5} step={0.1} onChange={setB2} />
        <label className="fz-pick"><span>{tt("Bật ReLU", "ReLU on")}</span>
          <input type="checkbox" checked={relu} onChange={(e) => setRelu(e.target.checked)} />
        </label>
      </div>
    </Stage>
  );
}
