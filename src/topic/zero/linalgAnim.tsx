import { eigenvalues2, leastSquaresLine, lineSse, matApply, powerIteration, type M2 } from "../../algo/index.ts";
import { arrow } from "../../labs/draw.ts";
import { Graph } from "../../labs/Graph.tsx";
import { fmt } from "../../lib/format.ts";
import { Slider } from "../../ui/Slider.tsx";
import { PlayButtons, useLoop, wave } from "./anim.tsx";
import { frame, label, line, useTx } from "./kit.ts";
import { Stage } from "./widgets.tsx";

const R = String.raw;
const SYM: M2 = [2, 1, 1, 2];

/* ---------- 1. Vectơ quay một vòng: chỉ hai hướng không bị lệch ---------- */

export function EigenSweepAnim() {
  const tt = useTx();
  const { phase, setPhase, running, setRunning } = useLoop(50, 0.004);
  const angle = Math.PI * phase;
  const v = { x: Math.cos(angle), y: Math.sin(angle) };
  const w = matApply(SYM, v);
  const cross = v.x * w.y - v.y * w.x;
  const ratio = Math.hypot(w.x, w.y);
  const onAxis = Math.abs(cross) < 0.05;
  const ev = eigenvalues2(SYM);
  return (
    <Stage
      title={tt("Cho một vectơ quay một vòng: chỉ hai hướng giữ nguyên sau khi qua ma trận", "Spin a vector around: only two directions survive the matrix unturned")}
      story={tt(
        R`Ma trận $A=\begin{pmatrix}2&1\\1&2\end{pmatrix}$ biến mỗi vectơ $\mathbf{v}$ thành $A\mathbf{v}$. Ta cho $\mathbf{v}$ (độ dài $1$) quay từ $0^\circ$ tới $180^\circ$ và vẽ cả $A\mathbf{v}$. Hầu hết lúc, $A\mathbf{v}$ lệch khỏi hướng của $\mathbf{v}$. Chỉ ở hai chỗ, $A\mathbf{v}$ nằm đúng trên đường thẳng chứa $\mathbf{v}$: đó là các vectơ riêng.`,
        R`The matrix $A=\begin{pmatrix}2&1\\1&2\end{pmatrix}$ turns each vector $\mathbf{v}$ into $A\mathbf{v}$. We spin $\mathbf{v}$ (length $1$) from $0^\circ$ to $180^\circ$ and draw $A\mathbf{v}$ as well. Most of the time $A\mathbf{v}$ points away from $\mathbf{v}$. At only two places $A\mathbf{v}$ lies exactly on the line through $\mathbf{v}$: those are the eigenvectors.`,
      )}
      read={tt(
        `Góc của $\\mathbf{v}$ là $${fmt((angle * 180) / Math.PI, 0)}^\\circ$, độ dài $|A\\mathbf{v}|=${fmt(ratio, 3)}$. ${onAxis ? `Hai vectơ cùng nằm trên một đường: đây là vectơ riêng, hệ số kéo giãn $${fmt(ratio, 2)}$.` : "Hai vectơ lệch nhau: đây chưa phải hướng riêng."}`,
        `The angle of $\\mathbf{v}$ is $${fmt((angle * 180) / Math.PI, 0)}^\\circ$, with $|A\\mathbf{v}|=${fmt(ratio, 3)}$. ${onAxis ? `The two vectors lie on one line: this is an eigenvector, stretch factor $${fmt(ratio, 2)}$.` : "The two vectors differ in direction: this is not an eigen-direction yet."}`,
      )}
      why={tt(
        R`Hướng riêng là nghiệm của $A\mathbf{v}=\lambda\mathbf{v}$, tức $\det(A-\lambda I)=0$. Ở đây $\lambda^2-4\lambda+3=0$ cho $\lambda=1$ và $\lambda=3$. Vectơ $(1;1)$ bị kéo gấp $3$ lần, vectơ $(1;-1)$ giữ nguyên độ dài. Hai hướng ấy vuông góc vì $A$ đối xứng.`,
        R`An eigen-direction solves $A\mathbf{v}=\lambda\mathbf{v}$, that is $\det(A-\lambda I)=0$. Here $\lambda^2-4\lambda+3=0$ gives $\lambda=1$ and $\lambda=3$. The vector $(1;1)$ is stretched $3$ times, while $(1;-1)$ keeps its length. The two directions are perpendicular because $A$ is symmetric.`,
      )}
    >
      <Graph
        label={tt("Vectơ đơn vị v quay và ảnh Av của nó qua ma trận", "A rotating unit vector v and its image Av under the matrix")}
        draw={(ctx, wd, hh) => {
          const { colors, map } = frame(ctx, wd, hh, -3.5, 3.5, -1, 3.5, "x", "y", true);
          ctx.beginPath();
          ctx.strokeStyle = colors.soft;
          ctx.lineWidth = 1;
          ctx.arc(map.x(0), map.y(0), map.x(1) - map.x(0), 0, Math.PI, true);
          ctx.stroke();
          line(ctx, map.x(-2.4), map.y(-2.4), map.x(2.4), map.y(2.4), colors.soft, 1);
          line(ctx, map.x(-1.4), map.y(1.4), map.x(1.4), map.y(-1.4), colors.soft, 1);
          arrow(ctx, map.x(0), map.y(0), map.x(v.x), map.y(v.y), colors.curve);
          arrow(ctx, map.x(0), map.y(0), map.x(w.x), map.y(w.y), onAxis ? colors.ink : colors.alt);
          label(ctx, "v", map.x(v.x) + 6, map.y(v.y) - 6, colors.curve);
          label(ctx, "Av", map.x(w.x) + 6, map.y(w.y) - 6, onAxis ? colors.ink : colors.alt);
          label(ctx, `λ = ${ev.map((e) => fmt(e, 0)).join(" , ")}`, map.x(-3.3), map.y(3.1), colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Góc của v", "Angle of v")} value={phase} min={0} max={0.999} step={0.005} onChange={(x) => { setRunning(false); setPhase(x); }} />
      </div>
      <PlayButtons running={running} setRunning={setRunning} tt={tt} />
    </Stage>
  );
}

/* ---------- 2. Lặp lũy thừa: hướng bất kì dồn về vectơ riêng trội ---------- */

export function PowerIterationAnim() {
  const tt = useTx();
  const { phase, setPhase, running, setRunning } = useLoop(120, 0.03);
  const steps = 1 + Math.floor(phase * 8);
  const seq = powerIteration(SYM, { x: 1, y: -0.35 }, 10);
  const cur = seq[steps]!;
  return (
    <Stage
      title={tt("Nhân đi nhân lại với ma trận: mọi hướng dồn về hướng kéo giãn mạnh nhất", "Multiply again and again: every direction is drawn to the strongest stretch")}
      story={tt(
        R`Bắt đầu từ một vectơ lệch, ví dụ $(1;-0{,}35)$, rồi nhân liên tiếp với $A=\begin{pmatrix}2&1\\1&2\end{pmatrix}$, sau mỗi lần chuẩn hóa độ dài về $1$ để dễ nhìn. Thành phần dọc hướng $(1;1)$ được nhân $3$ lần mỗi bước, còn thành phần dọc $(1;-1)$ chỉ nhân $1$ lần, nên chẳng bao lâu thành phần thứ nhất lấn át và mũi tên nằm sát $(1;1)$.`,
        R`Start from a skewed vector, say $(1;-0.35)$, and multiply by $A=\begin{pmatrix}2&1\\1&2\end{pmatrix}$ again and again, normalising the length to $1$ after each step so it is easy to see. The component along $(1;1)$ is multiplied by $3$ each step, while the component along $(1;-1)$ is multiplied by only $1$, so soon the first one dominates and the arrow lies close to $(1;1)$.`,
      )}
      read={tt(
        `Sau ${steps} bước: hướng $(${fmt(cur.v.x, 3)};${fmt(cur.v.y, 3)})$, ước lượng giá trị riêng ${Number.isNaN(cur.lambda) ? "chưa có" : `$${fmt(cur.lambda, 4)}$`}. Giá trị riêng trội thật sự là $3$ và vectơ riêng là $(1;1)/\\sqrt2\\approx(0{,}707;0{,}707)$.`,
        `After ${steps} steps: direction $(${fmt(cur.v.x, 3)};${fmt(cur.v.y, 3)})$, eigenvalue estimate ${Number.isNaN(cur.lambda) ? "not yet" : `$${fmt(cur.lambda, 4)}$`}. The true dominant eigenvalue is $3$ and the eigenvector is $(1;1)/\\sqrt2\\approx(0.707;0.707)$.`,
      )}
      why={tt(
        R`Viết vectơ đầu là $c_1\mathbf{p}_1+c_2\mathbf{p}_2$ theo hai vectơ riêng. Sau $k$ lần nhân ta được $c_1\lambda_1^k\mathbf{p}_1+c_2\lambda_2^k\mathbf{p}_2$. Khi $|\lambda_1|>|\lambda_2|$ và $c_1\neq0$, tỉ lệ giữa hai thành phần là $(\lambda_2/\lambda_1)^k$ tiến về $0$, nên hướng tiến về $\mathbf{p}_1$. Đó là nguyên lí đằng sau PageRank.`,
        R`Write the starting vector as $c_1\mathbf{p}_1+c_2\mathbf{p}_2$ in the two eigenvectors. After $k$ multiplications we get $c_1\lambda_1^k\mathbf{p}_1+c_2\lambda_2^k\mathbf{p}_2$. When $|\lambda_1|>|\lambda_2|$ and $c_1\neq0$ the ratio of the two parts is $(\lambda_2/\lambda_1)^k$, which tends to $0$, so the direction tends to $\mathbf{p}_1$. This is the principle behind PageRank.`,
      )}
    >
      <Graph
        label={tt("Hướng của vectơ sau mỗi lần nhân với ma trận", "Direction of the vector after each multiplication")}
        draw={(ctx, wd, hh) => {
          const { colors, map } = frame(ctx, wd, hh, -1.3, 1.3, -1.3, 1.3, "x", "y", true);
          ctx.beginPath();
          ctx.strokeStyle = colors.soft;
          ctx.lineWidth = 1;
          ctx.arc(map.x(0), map.y(0), map.x(1) - map.x(0), 0, 2 * Math.PI);
          ctx.stroke();
          line(ctx, map.x(-1.2), map.y(-1.2), map.x(1.2), map.y(1.2), colors.soft, 1);
          for (let i = 0; i <= steps; i++) {
            const p = seq[i]!.v;
            ctx.beginPath();
            ctx.fillStyle = i === steps ? colors.alt : colors.curve;
            ctx.globalAlpha = i === steps ? 1 : 0.45;
            ctx.arc(map.x(p.x), map.y(p.y), i === steps ? 5 : 3.5, 0, 2 * Math.PI);
            ctx.fill();
            ctx.globalAlpha = 1;
          }
          arrow(ctx, map.x(0), map.y(0), map.x(cur.v.x), map.y(cur.v.y), colors.alt);
          label(ctx, tt(`bước ${steps}`, `step ${steps}`), map.x(-1.2), map.y(1.1), colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Số lần nhân", "Number of multiplications")} value={phase} min={0} max={0.999} step={0.005} onChange={(x) => { setRunning(false); setPhase(x); }} />
      </div>
      <PlayButtons running={running} setRunning={setRunning} tt={tt} />
    </Stage>
  );
}

/* ---------- 3. Hồi quy: kéo hệ số góc, sai số có đáy ---------- */

const POINTS = [{ x: 0, y: 1 }, { x: 1, y: 3 }, { x: 2, y: 4 }, { x: 3, y: 4.5 }];

export function RegressionSweepAnim() {
  const tt = useTx();
  const { phase, setPhase, running, setRunning } = useLoop(50, 0.005);
  const best = leastSquaresLine(POINTS);
  const b = 3 * wave(phase);
  const meanX = POINTS.reduce((s, p) => s + p.x, 0) / POINTS.length;
  const meanY = POINTS.reduce((s, p) => s + p.y, 0) / POINTS.length;
  const a = meanY - b * meanX;
  const sse = lineSse(POINTS, a, b);
  const atBest = Math.abs(b - best.b) < 0.06;
  return (
    <Stage
      title={tt("Xoay đường thẳng quanh điểm trung bình: tổng bình phương phần dư có một đáy", "Turn the line about the mean point: the sum of squared residuals has a bottom")}
      story={tt(
        R`Bốn điểm dữ liệu và một đường $y=a+bx$ luôn đi qua điểm trung bình $(\bar x;\bar y)$. Khi hệ số góc $b$ đổi, đường quay quanh điểm đó. Ta tô các đoạn nối từ điểm tới đường (phần dư) và cộng bình phương của chúng. Tổng này giảm rồi lại tăng: nó có một đáy, và đường thẳng tại đáy là đường bình phương tối thiểu.`,
        R`Four data points and a line $y=a+bx$ that always passes through the mean point $(\bar x;\bar y)$. When the slope $b$ changes the line turns about that point. We draw the segments from the points to the line (the residuals) and add up their squares. The total falls and then rises: it has a bottom, and the line at the bottom is the least-squares line.`,
      )}
      read={tt(
        `Hệ số góc $b=${fmt(b, 3)}$, tổng bình phương phần dư $${fmt(sse, 3)}$. Đáy thật sự ở $b=${fmt(best.b, 3)}$ với tổng $${fmt(best.sse, 3)}$. ${atBest ? "Bạn đang ở đúng đáy." : "Chưa ở đáy: tổng còn lớn hơn mức nhỏ nhất."}`,
        `Slope $b=${fmt(b, 3)}$, sum of squared residuals $${fmt(sse, 3)}$. The true bottom is at $b=${fmt(best.b, 3)}$ with total $${fmt(best.sse, 3)}$. ${atBest ? "You are right at the bottom." : "Not at the bottom: the total is still above the minimum."}`,
      )}
      why={tt(
        R`Tổng bình phương phần dư là một hàm bậc hai của $b$ (và của $a$), nên có đáy duy nhất. Tại đáy, đạo hàm bằng $0$ và phần dư vuông góc với các cột $\mathbf{1}$ và $\mathbf{x}$ của ma trận dữ liệu, tức $A^TA\mathbf{x}=A^T\mathbf{b}$. Đó là lí do chỉ cần giải một hệ phương trình tuyến tính nhỏ.`,
        R`The sum of squared residuals is a quadratic function of $b$ (and of $a$), so it has a single bottom. At the bottom the derivative is $0$ and the residual is perpendicular to the columns $\mathbf{1}$ and $\mathbf{x}$ of the data matrix, that is $A^TA\mathbf{x}=A^T\mathbf{b}$. That is why one small linear system is all we need to solve.`,
      )}
    >
      <Graph
        label={tt("Bốn điểm dữ liệu, đường thẳng quay quanh điểm trung bình và các phần dư", "Four data points, a line turning about the mean point, and the residuals")}
        draw={(ctx, wd, hh) => {
          const { colors, map } = frame(ctx, wd, hh, -0.5, 3.5, -0.5, 6.5, "x", "y");
          line(ctx, map.x(-0.5), map.y(a - 0.5 * b), map.x(3.5), map.y(a + 3.5 * b), atBest ? colors.ink : colors.alt, 2.4);
          for (const p of POINTS) {
            line(ctx, map.x(p.x), map.y(p.y), map.x(p.x), map.y(a + b * p.x), colors.soft, 1.6);
            ctx.beginPath();
            ctx.fillStyle = colors.curve;
            ctx.arc(map.x(p.x), map.y(p.y), 5, 0, 2 * Math.PI);
            ctx.fill();
          }
          label(ctx, `SSE = ${fmt(sse, 2)}`, map.x(-0.4), map.y(6.1), colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Hệ số góc b", "Slope b")} value={b} min={0} max={3} step={0.01} onChange={(x) => { setRunning(false); setPhase(Math.acos(1 - 2 * (x / 3)) / (2 * Math.PI)); }} />
      </div>
      <PlayButtons running={running} setRunning={setRunning} tt={tt} />
    </Stage>
  );
}
