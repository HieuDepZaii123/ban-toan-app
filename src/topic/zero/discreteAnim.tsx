import { degreeSum, eulerPath, logisticSolution, sirPath } from "../../algo/index.ts";
import { Graph } from "../../labs/Graph.tsx";
import { strokeFn } from "../../labs/draw.ts";
import { fmt } from "../../lib/format.ts";
import { Slider } from "../../ui/Slider.tsx";
import { PlayButtons, useLoop, wave } from "./anim.tsx";
import { frame, label, line, useTx } from "./kit.ts";
import { Stage } from "./widgets.tsx";

const R = String.raw;

/* ---------- 1. Euler đi theo tiếp tuyến: bước nhỏ thì bám sát nghiệm logistic ---------- */

export function EulerLogisticAnim() {
  const tt = useTx();
  const { phase, setPhase, running, setRunning } = useLoop(60, 0.004);
  const h = 4 * 0.08 ** wave(phase);
  const steps = Math.max(1, Math.round(12 / h));
  const path = eulerPath((_x, y) => 0.5 * y * (1 - y / 100), 0, 10, 12 / steps, steps);
  const end = path[path.length - 1]!;
  const exact = logisticSolution(0.5, 100, 10, 12);
  return (
    <Stage
      title={tt("Phương pháp Euler: đi theo tiếp tuyến từng bước, bước càng nhỏ càng bám nghiệm thật", "Euler's method: follow the tangent step by step, and the smaller the step the closer it tracks the true solution")}
      story={tt(
        R`Quần thể logistic $y'=0{,}5\,y\left(1-\frac{y}{100}\right)$ bắt đầu từ $y_0=10$. Đường liền là nghiệm đúng $y=\frac{100}{1+9e^{-0,5t}}$. Đường gấp khúc cam là nghiệm Euler: từ mỗi điểm đi một đoạn dọc theo tiếp tuyến, rồi tính lại độ dốc ở điểm mới. Bước $h$ lớn thì đường gấp khúc lệch xa, bước nhỏ thì gần như trùng.`,
        R`The logistic population $y'=0.5\,y\left(1-\frac{y}{100}\right)$ starts at $y_0=10$. The solid line is the exact solution $y=\frac{100}{1+9e^{-0.5t}}$. The orange polyline is Euler's solution: from each point go a short way along the tangent, then recompute the slope at the new point. A large step $h$ leaves the polyline far off, a small one makes it nearly coincide.`,
      )}
      read={tt(
        `Bước $h=${fmt(12 / steps, 2)}$ (${steps} bước). Tại $t=12$: Euler cho $${fmt(end.y, 2)}$, nghiệm đúng $${fmt(exact, 2)}$, sai số $${fmt(Math.abs(end.y - exact), 2)}$.`,
        `Step $h=${fmt(12 / steps, 2)}$ (${steps} steps). At $t=12$: Euler gives $${fmt(end.y, 2)}$, the exact solution $${fmt(exact, 2)}$, error $${fmt(Math.abs(end.y - exact), 2)}$.`,
      )}
      why={tt(
        R`Mỗi bước Euler thay đường cong bằng tiếp tuyến, mắc sai số cục bộ khoảng $\frac{h^2}{2}y''$. Cần $\frac{T}{h}$ bước nên sai số cộng dồn cỡ $\frac{T}{h}\cdot h^2=Th$: giảm $h$ đi $10$ lần thì sai số cũng giảm khoảng $10$ lần. Nghiệm logistic tiến tới cân bằng ổn định $K=100$ nên sai số không bị khuếch đại.`,
        R`Each Euler step replaces the curve by its tangent, making a local error of about $\frac{h^2}{2}y''$. We need $\frac{T}{h}$ steps, so the accumulated error is about $\frac{T}{h}\cdot h^2=Th$: reducing $h$ ten times reduces the error about ten times. The logistic solution tends to the stable equilibrium $K=100$, so errors are not amplified.`,
      )}
    >
      <Graph
        label={tt("Nghiệm logistic đúng và đường gấp khúc Euler", "The exact logistic solution and the Euler polyline")}
        draw={(ctx, w, hh) => {
          const { colors, map, pad } = frame(ctx, w, hh, 0, 12, 0, 115, "t", "y");
          strokeFn(ctx, map, w, hh, pad, 0, 12, (t) => logisticSolution(0.5, 100, 10, t), colors.curve, 2.4);
          for (let i = 0; i < path.length - 1; i++) line(ctx, map.x(path[i]!.x), map.y(path[i]!.y), map.x(path[i + 1]!.x), map.y(path[i + 1]!.y), colors.alt, 2);
          for (const p of path) {
            ctx.beginPath();
            ctx.fillStyle = colors.alt;
            ctx.arc(map.x(p.x), map.y(p.y), 3, 0, 2 * Math.PI);
            ctx.fill();
          }
          line(ctx, map.x(0), map.y(100), map.x(12), map.y(100), colors.soft, 1);
          label(ctx, `h = ${fmt(12 / steps, 2)}`, map.x(0.3), map.y(108), colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Số bước Euler", "Number of Euler steps")} value={steps} min={3} max={150} step={1} onChange={(v) => { setRunning(false); setPhase(Math.acos(1 - 2 * Math.min(0.999, Math.max(0.001, Math.log(4 / (12 / v)) / Math.log(4 / 0.32)))) / (2 * Math.PI)); }} />
      </div>
      <PlayButtons running={running} setRunning={setRunning} tt={tt} />
    </Stage>
  );
}

/* ---------- 2. Dịch bệnh SIR: giảm hệ số lây thì đỉnh dịch hạ xuống ---------- */

export function SirAnim() {
  const tt = useTx();
  const { phase, setPhase, running, setRunning } = useLoop(60, 0.004);
  const beta = 0.12 + 0.38 * wave(phase);
  const gamma = 0.1;
  const path = sirPath({ s: 990, i: 10, r: 0 }, beta, gamma, 0.2, 800);
  const peak = path.reduce((a, b) => (b.i > a.i ? b : a));
  const r0 = beta / gamma;
  return (
    <Stage
      title={tt("Dịch bệnh SIR: giảm hệ số lây, đỉnh dịch thấp xuống và có thể không bùng phát", "The SIR epidemic: lower the infection rate and the peak drops, or the outbreak never starts")}
      story={tt(
        R`Dân số $1000$ người, lúc đầu có $10$ người nhiễm. Mỗi ngày một người nhiễm làm lây theo hệ số $\beta$ và khỏi bệnh theo hệ số $\gamma=0{,}1$. Ba đường là số người chưa nhiễm $S$ (xanh lục), đang nhiễm $I$ (cam) và đã khỏi $R$ (xám). Kéo $\beta$ xuống thì đỉnh của $I$ thấp dần, và khi $R_0=\frac{\beta}{\gamma}\le1$ thì $I$ chỉ giảm.`,
        R`A population of $1000$ with $10$ infected at the start. Each day an infected person spreads the disease at rate $\beta$ and recovers at rate $\gamma=0.1$. The three lines are the susceptible $S$ (green), infected $I$ (orange) and recovered $R$ (grey). Lowering $\beta$ lowers the peak of $I$, and when $R_0=\frac{\beta}{\gamma}\le1$ the infected only decline.`,
      )}
      read={tt(
        `$\\beta=${fmt(beta, 2)}$, $R_0=${fmt(r0, 2)}$. Đỉnh dịch: $${fmt(peak.i, 0)}$ người nhiễm sau khoảng ${fmt(path.indexOf(peak) * 0.2, 0)} ngày. ${r0 > 1 ? `Khi đạt đỉnh còn $S\\approx${fmt(peak.s, 0)}$, gần $\\frac{N}{R_0}=${fmt(1000 / r0, 0)}$.` : "Vì $R_0\\le1$ dịch không bùng phát."}`,
        `$\\beta=${fmt(beta, 2)}$, $R_0=${fmt(r0, 2)}$. Peak: $${fmt(peak.i, 0)}$ infected after about ${fmt(path.indexOf(peak) * 0.2, 0)} days. ${r0 > 1 ? `At the peak $S\\approx${fmt(peak.s, 0)}$, close to $\\frac{N}{R_0}=${fmt(1000 / r0, 0)}$.` : "Since $R_0\\le1$ the outbreak does not take off."}`,
      )}
      why={tt(
        R`Từ $I'=I\left(\beta\frac{S}{N}-\gamma\right)$, số người nhiễm tăng đúng khi $\frac{\beta S}{\gamma N}>1$. Lúc đầu $S\approx N$ nên dịch bùng khi $R_0>1$. Khi $S$ giảm tới $\frac{N}{R_0}$ thì $I'=0$ và $I$ đạt đỉnh, rồi giảm dù vẫn còn nhiều người chưa nhiễm. Đó là ngưỡng miễn dịch cộng đồng $1-\frac{1}{R_0}$.`,
        R`From $I'=I\left(\beta\frac{S}{N}-\gamma\right)$ the number infected grows exactly when $\frac{\beta S}{\gamma N}>1$. At the start $S\approx N$, so the outbreak takes off when $R_0>1$. When $S$ falls to $\frac{N}{R_0}$ we have $I'=0$ and $I$ peaks, then declines although many are still susceptible. That is the herd-immunity threshold $1-\frac{1}{R_0}$.`,
      )}
    >
      <Graph
        label={tt("Số người chưa nhiễm, đang nhiễm và đã khỏi theo ngày", "Susceptible, infected and recovered people by day")}
        draw={(ctx, w, hh) => {
          const { colors, map } = frame(ctx, w, hh, 0, 160, 0, 1000, "ngày", "người");
          const draw = (pick: (p: { s: number; i: number; r: number }) => number, color: string) => {
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.lineWidth = 2.2;
            path.forEach((p, k) => {
              const px = map.x(k * 0.2);
              const py = map.y(pick(p));
              if (k === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            });
            ctx.stroke();
          };
          draw((p) => p.s, colors.curve);
          draw((p) => p.r, colors.soft);
          draw((p) => p.i, colors.alt);
          label(ctx, `R0 = ${fmt(r0, 2)}`, map.x(5), map.y(940), colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Hệ số lây β", "Infection rate β")} value={beta} min={0.12} max={0.5} step={0.01} onChange={(v) => { setRunning(false); setPhase(Math.acos(1 - 2 * ((v - 0.12) / 0.38)) / (2 * Math.PI)); }} />
      </div>
      <PlayButtons running={running} setRunning={setRunning} tt={tt} />
    </Stage>
  );
}

/* ---------- 3. Bổ đề bắt tay: mỗi cạnh thêm vào cộng đúng 2 vào tổng bậc ---------- */

const NODES: [number, number][] = [[0, 1], [-1.4, 0.4], [-0.9, -1], [0.9, -1], [1.4, 0.4], [0, -0.1]];
const EDGES: [number, number][] = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [5, 0], [5, 3]];

export function HandshakeAnim() {
  const tt = useTx();
  const { phase, setPhase, running, setRunning } = useLoop(450, 0.15);
  const shown = Math.floor(phase * (EDGES.length + 1));
  const sub = EDGES.slice(0, shown);
  const { degrees, sum } = degreeSum(sub);
  return (
    <Stage
      title={tt("Thêm từng cạnh: mỗi cạnh làm tổng bậc tăng đúng 2", "Add one edge at a time: each edge raises the sum of degrees by exactly 2")}
      story={tt(
        R`Đồ thị có $6$ đỉnh và tối đa $7$ cạnh. Mỗi lần thêm một cạnh, hai đỉnh đầu mút của nó đều tăng bậc thêm $1$, nên tổng bậc tăng đúng $2$. Vì vậy sau $k$ cạnh tổng bậc luôn là $2k$, và ở cuối là $14$. Số trên mỗi đỉnh là bậc của đỉnh đó.`,
        R`The graph has $6$ vertices and at most $7$ edges. Each time an edge is added, both of its endpoints gain $1$ in degree, so the sum of degrees rises by exactly $2$. Hence after $k$ edges the sum is always $2k$, and at the end it is $14$. The number on each vertex is its degree.`,
      )}
      read={tt(
        `Đã có ${shown} cạnh. Bậc từng đỉnh: ${NODES.map((_, v) => degrees.get(v) ?? 0).join(", ")}. Tổng bậc $=${sum}=2\\cdot${shown}$. Số đỉnh bậc lẻ: ${NODES.filter((_, v) => (degrees.get(v) ?? 0) % 2 === 1).length}, luôn là số chẵn.`,
        `${shown} edges so far. Degrees by vertex: ${NODES.map((_, v) => degrees.get(v) ?? 0).join(", ")}. Sum of degrees $=${sum}=2\\cdot${shown}$. Number of odd-degree vertices: ${NODES.filter((_, v) => (degrees.get(v) ?? 0) % 2 === 1).length}, always even.`,
      )}
      why={tt(
        R`Đó chính là chứng minh bằng quy nạp theo số cạnh: đồ thị không cạnh có tổng bậc $0$, và thêm một cạnh làm tổng bậc tăng $2$. Cách đếm khác cho cùng kết luận: đếm các cặp (đỉnh, cạnh chứa đỉnh), theo từng đỉnh được $\sum\deg v$, theo từng cạnh được $2|E|$. Từ đó số đỉnh bậc lẻ phải là số chẵn.`,
        R`This is exactly the proof by induction on the number of edges: the graph with no edges has degree sum $0$, and adding an edge raises it by $2$. The other way of counting gives the same conclusion: count pairs (vertex, edge containing it), per vertex we get $\sum\deg v$, per edge we get $2|E|$. So the number of odd-degree vertices must be even.`,
      )}
    >
      <Graph
        label={tt("Đồ thị 6 đỉnh được thêm dần các cạnh, số trên đỉnh là bậc", "A 6-vertex graph gaining edges one by one; the number on each vertex is its degree")}
        draw={(ctx, w, hh) => {
          const { colors, map } = frame(ctx, w, hh, -2.2, 2.2, -1.8, 1.8, "", "", true);
          EDGES.forEach(([u, v], i) => {
            const a = NODES[u]!;
            const b = NODES[v]!;
            line(ctx, map.x(a[0]), map.y(a[1]), map.x(b[0]), map.y(b[1]), i < shown ? (i === shown - 1 ? colors.alt : colors.ink) : colors.soft, i < shown ? 2.6 : 1);
          });
          NODES.forEach(([x, y], v) => {
            ctx.beginPath();
            ctx.fillStyle = colors.bg;
            ctx.strokeStyle = colors.curve;
            ctx.lineWidth = 2;
            ctx.arc(map.x(x), map.y(y), 15, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
            label(ctx, String(degrees.get(v) ?? 0), map.x(x) - 4, map.y(y) + 4, colors.ink);
          });
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Số cạnh đã thêm", "Edges added")} value={shown} min={0} max={EDGES.length} step={1} onChange={(v) => { setRunning(false); setPhase(v / (EDGES.length + 1) + 0.001); }} />
      </div>
      <PlayButtons running={running} setRunning={setRunning} tt={tt} />
    </Stage>
  );
}
