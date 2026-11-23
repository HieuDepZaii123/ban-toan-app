import { matApply, matDet, matLerp, rotatingLineSystem, type M2 } from "../../algo/index.ts";
import { arrow } from "../../labs/draw.ts";
import { Graph } from "../../labs/Graph.tsx";
import { fmt } from "../../lib/format.ts";
import { Slider } from "../../ui/Slider.tsx";
import { PlayButtons, useLoop, wave } from "./anim.tsx";
import { frame, label, line, useTx } from "./kit.ts";
import { Stage } from "./widgets.tsx";

const R = String.raw;

/* ---------- 1. Cộng nối đuôi rồi thành hình bình hành ---------- */

export function AddVectorsAnim() {
  const tt = useTx();
  const { phase, setPhase, running, setRunning } = useLoop(50, 0.006);
  const u = { x: 3, y: 1 };
  const v = { x: 1, y: 2.5 };
  const slide = Math.min(1, phase / 0.5);
  const done = phase > 0.5;
  const vStart = { x: u.x * slide, y: u.y * slide };
  const sum = { x: u.x + v.x, y: u.y + v.y };
  return (
    <Stage
      title={tt("Cộng hai vectơ: đi nối tiếp hay dựng hình bình hành đều ra cùng một đích", "Adding two vectors: walking one after the other or building a parallelogram reaches the same place")}
      story={tt(
        R`Cho $\vec{u}=(3;1)$ và $\vec{v}=(1;2{,}5)$. Đầu tiên $\vec{v}$ trượt song song cho tới khi gốc của nó trùng ngọn của $\vec{u}$: đó là đi hai chặng liên tiếp, và mũi tên từ gốc tới ngọn cuối chính là $\vec{u}+\vec{v}$. Sau đó $\vec{u}$ cũng được dời sang gốc của $\vec{v}$, hai chặng còn lại khép thành một hình bình hành mà $\vec{u}+\vec{v}$ là đường chéo.`,
        R`Take $\vec{u}=(3;1)$ and $\vec{v}=(1;2.5)$. First $\vec{v}$ slides parallel until its tail meets the tip of $\vec{u}$: that is two legs of a walk, and the arrow from the start to the final tip is $\vec{u}+\vec{v}$. Then $\vec{u}$ is also moved to the tail of $\vec{v}$, and the other two legs close up a parallelogram whose diagonal is $\vec{u}+\vec{v}$.`,
      )}
      read={tt(
        `$\\vec{u}+\\vec{v}=(${fmt(sum.x, 1)};${fmt(sum.y, 1)})$: cộng từng thành phần $3+1$ và $1+2{,}5$. ${done ? "Hai đường đi $\\vec{u}$ rồi $\\vec{v}$, và $\\vec{v}$ rồi $\\vec{u}$, tới cùng một điểm." : "Vectơ $\\vec{v}$ đang trượt tới ngọn của $\\vec{u}$."}`,
        `$\\vec{u}+\\vec{v}=(${fmt(sum.x, 1)};${fmt(sum.y, 1)})$: add component by component, $3+1$ and $1+2.5$. ${done ? "The two routes, $\\vec{u}$ then $\\vec{v}$ and $\\vec{v}$ then $\\vec{u}$, reach the same point." : "The vector $\\vec{v}$ is sliding to the tip of $\\vec{u}$."}`,
      )}
      why={tt(
        R`Với ba điểm $A,B,C$ thì $\overrightarrow{AB}+\overrightarrow{BC}=\overrightarrow{AC}$: đây là quy tắc ba điểm. Hình bình hành có hai cạnh đối bằng nhau như vectơ, nên đi theo cạnh này rồi cạnh kia hay ngược lại đều tới đỉnh đối diện, và ta có quy tắc hình bình hành. Viết theo tọa độ, bước nào cũng chỉ là cộng từng thành phần.`,
        R`For three points $A,B,C$ we have $\overrightarrow{AB}+\overrightarrow{BC}=\overrightarrow{AC}$: this is the triangle rule. Opposite sides of a parallelogram are equal as vectors, so walking along one side then the other, or the reverse, reaches the opposite corner, which gives the parallelogram rule. In coordinates each step is just adding component by component.`,
      )}
    >
      <Graph
        label={tt("Hai vectơ u, v nối đuôi và hình bình hành tạo bởi chúng", "Two vectors u, v placed end to end and the parallelogram they span")}
        draw={(ctx, w, hh) => {
          const { colors, map } = frame(ctx, w, hh, -0.5, 5.5, -0.5, 4.5, "x", "y", true);
          const P = (p: { x: number; y: number }) => ({ x: map.x(p.x), y: map.y(p.y) });
          const o = P({ x: 0, y: 0 });
          const uTip = P(u);
          const vFrom = P(vStart);
          const vTo = P({ x: vStart.x + v.x, y: vStart.y + v.y });
          arrow(ctx, o.x, o.y, uTip.x, uTip.y, colors.curve);
          arrow(ctx, vFrom.x, vFrom.y, vTo.x, vTo.y, colors.alt);
          if (done) {
            const k = Math.min(1, (phase - 0.5) / 0.3);
            const vAtO = P({ x: v.x * k, y: v.y * k });
            line(ctx, o.x, o.y, vAtO.x, vAtO.y, colors.alt, 1.4);
            const uFrom = P({ x: v.x * k, y: v.y * k });
            const uTo = P({ x: v.x * k + u.x * k, y: v.y * k + u.y * k });
            line(ctx, uFrom.x, uFrom.y, uTo.x, uTo.y, colors.curve, 1.4);
          }
          const s = P(sum);
          arrow(ctx, o.x, o.y, s.x, s.y, colors.ink);
          label(ctx, "u", (o.x + uTip.x) / 2, (o.y + uTip.y) / 2 + 16, colors.curve);
          label(ctx, "v", (vFrom.x + vTo.x) / 2 + 6, (vFrom.y + vTo.y) / 2, colors.alt);
          label(ctx, "u + v", s.x + 6, s.y - 6, colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Tiến trình", "Progress")} value={phase} min={0} max={0.999} step={0.005} onChange={(x) => { setRunning(false); setPhase(x); }} />
      </div>
      <PlayButtons running={running} setRunning={setRunning} tt={tt} />
    </Stage>
  );
}

/* ---------- 2. Hình vuông đơn vị bị kéo dẹt: diện tích là định thức ---------- */

const FLATTEN: M2 = [2, 1, 1, 0.5];

export function SquareFlattenAnim() {
  const tt = useTx();
  const { phase, setPhase, running, setRunning } = useLoop(50, 0.006);
  const t = wave(phase);
  const m = matLerp(FLATTEN, t);
  const det = matDet(m);
  const corners = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }].map((p) => matApply(m, p));
  const flat = Math.abs(det) < 0.02;
  return (
    <Stage
      title={tt("Một ma trận biến hình vuông đơn vị thành hình bình hành, diện tích mới chính là định thức", "A matrix turns the unit square into a parallelogram whose area is the determinant")}
      story={tt(
        R`Ma trận $M=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ đưa hai cạnh $(1;0)$ và $(0;1)$ của hình vuông đơn vị thành hai cột $(a;c)$ và $(b;d)$. Ở đây ma trận được trượt từ ma trận đơn vị tới $\begin{pmatrix}2&1\\1&0{,}5\end{pmatrix}$. Hình vuông bị xiên và kéo, diện tích đổi dần, và ở cuối hai cột nằm trên cùng một đường thẳng nên hình bình hành bị ép thành một đoạn.`,
        R`The matrix $M=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ sends the two sides $(1;0)$ and $(0;1)$ of the unit square to its two columns $(a;c)$ and $(b;d)$. Here the matrix slides from the identity to $\begin{pmatrix}2&1\\1&0.5\end{pmatrix}$. The square is sheared and stretched, its area changes gradually, and at the end both columns lie on one line, so the parallelogram is squashed into a segment.`,
      )}
      read={tt(
        `Hai cột hiện tại: $(${fmt(m[0], 2)};${fmt(m[2], 2)})$ và $(${fmt(m[1], 2)};${fmt(m[3], 2)})$. Định thức $ad-bc=${fmt(det, 3)}$, và hình bình hành có diện tích $${fmt(Math.abs(det), 3)}$. ${flat ? "Định thức gần bằng $0$: hai cột cùng phương, hình bị dẹt." : "Hình vuông ban đầu có diện tích $1$."}`,
        `Current columns: $(${fmt(m[0], 2)};${fmt(m[2], 2)})$ and $(${fmt(m[1], 2)};${fmt(m[3], 2)})$. The determinant $ad-bc=${fmt(det, 3)}$, and the parallelogram has area $${fmt(Math.abs(det), 3)}$. ${flat ? "The determinant is almost $0$: the two columns are parallel and the shape is flat." : "The original square has area $1$."}`,
      )}
      why={tt(
        R`Diện tích hình bình hành dựng trên hai vectơ $(a;c)$ và $(b;d)$ bằng $|ad-bc|$, nên định thức cho biết ma trận làm diện tích đổi bao nhiêu lần. Phép biến đổi tuyến tính đổi mọi diện tích cùng một tỉ lệ, vì hình bất kì chia được thành các ô vuông nhỏ và mỗi ô bị đổi cùng tỉ lệ. Khi $\det=0$ thì hai cột cùng phương, hình dẹt thành đoạn thẳng và không thể kéo ngược lại: ma trận không có nghịch đảo.`,
        R`The parallelogram on the vectors $(a;c)$ and $(b;d)$ has area $|ad-bc|$, so the determinant says how many times the matrix scales area. A linear map scales every area by the same ratio, because any shape splits into small square cells and each cell is scaled the same way. When $\det=0$ the two columns are parallel, the shape is squashed to a segment and cannot be stretched back: the matrix has no inverse.`,
      )}
    >
      <Graph
        label={tt("Hình vuông đơn vị và ảnh của nó qua ma trận đang trượt", "The unit square and its image under the sliding matrix")}
        draw={(ctx, w, hh) => {
          const { colors, map } = frame(ctx, w, hh, -0.5, 3.5, -0.5, 2.5, "x", "y", true);
          const trace = (pts: { x: number; y: number }[], stroke: string, fill: string | null) => {
            ctx.beginPath();
            pts.forEach((p, i) => (i === 0 ? ctx.moveTo(map.x(p.x), map.y(p.y)) : ctx.lineTo(map.x(p.x), map.y(p.y))));
            ctx.closePath();
            if (fill) { ctx.fillStyle = fill; ctx.globalAlpha = 0.28; ctx.fill(); ctx.globalAlpha = 1; }
            ctx.strokeStyle = stroke;
            ctx.lineWidth = 2;
            ctx.stroke();
          };
          trace([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }], colors.soft, null);
          trace(corners, colors.alt, colors.alt);
          label(ctx, `det = ${fmt(det, 2)}`, map.x(2.1), map.y(2.2), colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Mức biến đổi", "Amount of transformation")} value={t} min={0} max={1} step={0.005} onChange={(x) => { setRunning(false); setPhase(Math.acos(1 - 2 * x) / (2 * Math.PI)); }} />
      </div>
      <PlayButtons running={running} setRunning={setRunning} tt={tt} />
    </Stage>
  );
}

/* ---------- 3. Hai đường quay tới song song: nghiệm bay đi ---------- */

export function CramerRotateAnim() {
  const tt = useTx();
  const { phase, setPhase, running, setRunning } = useLoop(50, 0.004);
  const theta = (Math.PI / 4) * (0.5 + 1.5 * phase) - 0.0001;
  const { det, solution } = rotatingLineSystem(theta);
  const huge = solution !== null && Math.hypot(solution.x, solution.y) > 12;
  const lines: { a: number; b: number; e: number; color: "curve" | "alt" }[] = [
    { a: 1, b: 1, e: 2, color: "curve" },
    { a: Math.cos(theta), b: Math.sin(theta), e: 1, color: "alt" },
  ];
  return (
    <Stage
      title={tt("Hai đường thẳng quay tới song song: nghiệm theo Cramer bay ra vô cực", "Two lines turning until parallel: the Cramer solution flies off to infinity")}
      story={tt(
        R`Hệ $x+y=2$ và $x\cos\theta+y\sin\theta=1$ là hai đường thẳng. Khi góc $\theta$ tăng, đường thứ hai quay quanh và điểm cắt đổi chỗ. Gần lúc hai đường sắp song song, giao điểm lao ra rất xa. Đúng lúc song song, hai đường không còn cắt nhau và không có nghiệm.`,
        R`The system $x+y=2$ and $x\cos\theta+y\sin\theta=1$ is two lines. As the angle $\theta$ grows the second line turns and the crossing point moves. Just before the lines become parallel the intersection shoots far away. At the moment they are parallel the lines no longer meet and there is no solution.`,
      )}
      read={tt(
        `Góc $\\theta=${fmt((theta * 180) / Math.PI, 1)}^\\circ$, định thức $D=\\sin\\theta-\\cos\\theta=${fmt(det, 4)}$. ${solution === null ? "$D=0$: hai đường song song, hệ vô nghiệm." : `Nghiệm $x=\\frac{D_x}{D}=${fmt(solution.x, 2)}$, $y=\\frac{D_y}{D}=${fmt(solution.y, 2)}$.${huge ? " $D$ rất nhỏ nên nghiệm rất lớn." : ""}`}`,
        `Angle $\\theta=${fmt((theta * 180) / Math.PI, 1)}^\\circ$, determinant $D=\\sin\\theta-\\cos\\theta=${fmt(det, 4)}$. ${solution === null ? "$D=0$: the lines are parallel and the system has no solution." : `Solution $x=\\frac{D_x}{D}=${fmt(solution.x, 2)}$, $y=\\frac{D_y}{D}=${fmt(solution.y, 2)}$.${huge ? " $D$ is tiny, so the solution is huge." : ""}`}`,
      )}
      why={tt(
        R`Theo quy tắc Cramer, khi $D\neq0$ thì $x=\frac{D_x}{D}$ và $y=\frac{D_y}{D}$. Tử số $D_x,D_y$ ở đây không về $0$ cùng lúc với $D$, nên khi $D\to0$ thì nghiệm lớn dần mà không bị chặn. Khi $D=0$ không còn phép chia nữa: hai đường song song, và hệ vô nghiệm nếu $D_x$ hoặc $D_y$ khác $0$, hoặc vô số nghiệm nếu hai đường trùng nhau.`,
        R`By Cramer's rule, when $D\neq0$ we get $x=\frac{D_x}{D}$ and $y=\frac{D_y}{D}$. Here the numerators $D_x,D_y$ do not vanish together with $D$, so as $D\to0$ the solution grows without bound. When $D=0$ there is no division any more: the lines are parallel, and the system has no solution if $D_x$ or $D_y$ is nonzero, or infinitely many if the lines coincide.`,
      )}
    >
      <Graph
        label={tt("Hai đường thẳng của hệ và giao điểm", "The two lines of the system and their intersection")}
        draw={(ctx, w, hh) => {
          const { colors, map } = frame(ctx, w, hh, -6, 6, -6, 6, "x", "y", true);
          for (const ln of lines) {
            const n2 = ln.a * ln.a + ln.b * ln.b;
            const p0 = { x: (ln.e * ln.a) / n2, y: (ln.e * ln.b) / n2 };
            line(ctx, map.x(p0.x + 30 * -ln.b), map.y(p0.y + 30 * ln.a), map.x(p0.x - 30 * -ln.b), map.y(p0.y - 30 * ln.a), colors[ln.color], 2.2);
          }
          if (solution && Math.abs(solution.x) < 6 && Math.abs(solution.y) < 6) {
            ctx.beginPath();
            ctx.fillStyle = colors.ink;
            ctx.arc(map.x(solution.x), map.y(solution.y), 5, 0, 2 * Math.PI);
            ctx.fill();
          }
          label(ctx, `D = ${fmt(det, 3)}`, map.x(-5.6), map.y(5.2), colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Góc quay", "Turning angle")} value={phase} min={0} max={0.999} step={0.002} onChange={(x) => { setRunning(false); setPhase(x); }} />
      </div>
      <PlayButtons running={running} setRunning={setRunning} tt={tt} />
    </Stage>
  );
}
