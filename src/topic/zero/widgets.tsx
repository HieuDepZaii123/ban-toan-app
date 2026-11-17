import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  atLeastOneSimulate, bisection, combinations, compoundOne, cramer, descendQuadratic, estimateBallVolume, estimatePi,
  factorial, firstIndexWithin, geometricPartialSums, gradientDescent, hillClimbMin, makeNet, netForward, netTrainEpoch,
  pascalRows, perceptronTrain, permutations, riemann, signedDistance, slopeSequence, twoDiceExact, twoDiceSimulate, walkCircle,
  type Fn, type Net, type Pt,
} from "../../algo/index.ts";
import { dashed, dot, drawAxes, drawGrid, makeMap, paintBase, readColors, strokeFn, } from "../../labs/draw.ts";
import { Graph } from "../../labs/Graph.tsx";
import { fmt } from "../../lib/format.ts";
import { freshSeed, mulberry32 } from "../../lib/prng.ts";
import { MathText } from "../../ui/MathText.tsx";
import { Slider } from "../../ui/Slider.tsx";

const at = <T,>(list: readonly T[], i: number): T => list[Math.max(0, Math.min(list.length - 1, i))] as T;

/* ---------- Khung chung ---------- */

function Stage({ title, story, read, why, children }: { title: string; story: string; read: string; why: string; children: ReactNode }) {
  return (
    <figure className="fz-card">
      <h3><MathText text={title} /></h3>
      <p className="fz-story"><MathText text={story} /></p>
      {children}
      <p className="fz-read" role="status" aria-live="polite"><MathText text={read} /></p>
      <p className="fz-why"><b>Rút ra.</b> <MathText text={why} /></p>
    </figure>
  );
}

/** Gọi tick đều đặn khi running; dọn khi tắt hoặc gỡ. */
function useTicker(running: boolean, ms: number, tick: () => void): void {
  const ref = useRef(tick);
  useEffect(() => { ref.current = tick; });
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => ref.current(), ms);
    return () => window.clearInterval(id);
  }, [running, ms]);
}

function Buttons({ children }: { children: ReactNode }) {
  return <div className="fz-buttons">{children}</div>;
}

/** Dựng nền đồ thị: lưới, trục, trả về bản đồ tọa độ. */
function frame(ctx: CanvasRenderingContext2D, w: number, h: number, x0: number, x1: number, y0: number, y1: number, xl = "x", yl = "y") {
  const colors = readColors();
  const pad = 28;
  paintBase(ctx, w, h, colors);
  const map = makeMap(w, h, pad, x0, x1, y0, y1);
  drawGrid(ctx, map, x0, x1, y0, y1, colors);
  drawAxes(ctx, map, x0, x1, y0, y1, colors, xl, yl, w, pad);
  return { colors, map, pad };
}

function line(ctx: CanvasRenderingContext2D, ax: number, ay: number, bx: number, by: number, color: string, lw = 1.6) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = lw;
  ctx.moveTo(ax, ay);
  ctx.lineTo(bx, by);
  ctx.stroke();
}

function label(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color: string) {
  ctx.fillStyle = color;
  ctx.font = "12px system-ui, sans-serif";
  ctx.fillText(text, x, y);
}

/* ---------- 1. Bóng lăn xuống thung lũng (hạ gradient) ---------- */

type Valley = "quad" | "w";

export function BallValley({ kind }: { kind: Valley }) {
  const [a, setA] = useState(1);
  const [b, setB] = useState(-4);
  const [c, setC] = useState(1);
  const [start, setStart] = useState(kind === "quad" ? -1 : -2.6);
  const [lr, setLr] = useState(0.15);
  const [shown, setShown] = useState(0);
  const [running, setRunning] = useState(false);
  const f: Fn = kind === "quad" ? (x) => a * x * x + b * x + c : (x) => 0.25 * x ** 4 - x * x + 0.35 * x;
  const path = useMemo(
    () => (kind === "quad" ? descendQuadratic(a, b, c, start, lr, 80) : gradientDescent((x) => 0.25 * x ** 4 - x * x + 0.35 * x, start, lr, 80)),
    [kind, a, b, c, start, lr],
  );
  const reset = (fn: () => void) => { setRunning(false); setShown(0); fn(); };
  useTicker(running, 350, () => {
    if (shown >= path.length - 1) setRunning(false);
    else setShown(shown + 1);
  });
  const cur = at(path, shown);
  const view = kind === "quad" ? { x0: -6, x1: 8, y0: -10, y1: 22 } : { x0: -3.5, x1: 3.5, y0: -3, y1: 5 };
  const vertex = kind === "quad" ? -b / (2 * a) : null;
  const diverged = !Number.isFinite(cur.x) || Math.abs(cur.x) > 50;

  return (
    <Stage
      title="Bóng lăn xuống thung lũng"
      story={kind === "quad"
        ? "Hãy tưởng tượng đồ thị là một cái máng, thả quả bóng vào. Nó không biết đáy ở đâu; mỗi lần nó chỉ cảm nhận độ dốc dưới chân rồi bước một đoạn xuống dốc. Đoạn bước tỉ lệ với độ dốc: dốc càng đứng bước càng dài, gần đáy dốc thoai thoải nên bước ngắn dần. Đây chính là thuật toán hạ gradient mà mạng nơ-ron dùng để học."
        : "Cái máng này có hai đáy. Thả bóng ở những chỗ khác nhau và xem nó rơi vào đáy nào: thuật toán chỉ thấy độ dốc ngay dưới chân, nên nó chỉ tìm được đáy gần nhất. Đó là lý do toán học phân biệt cực tiểu cục bộ và giá trị nhỏ nhất."}
      read={diverged
        ? `Bước ${shown}: bóng văng ra xa vì mỗi lần bước quá dài (bước ${fmt(lr)}). Giảm hệ số bước.`
        : `Bước ${shown}: $x=${fmt(cur.x, 3)}$, độ cao $y=${fmt(cur.y, 3)}$, độ dốc $${fmt(cur.slope, 3)}$.${vertex !== null ? ` Đỉnh tính bằng công thức $-\\frac{b}{2a}=${fmt(vertex, 3)}$.` : ""}`}
      why={kind === "quad"
        ? "Đáy là nơi độ dốc bằng 0. Với $y=ax^2+bx+c$ độ dốc là $2ax+b$ nên đáy ở $x=-\\frac{b}{2a}$: thuật toán chạy bằng cách đo dốc, còn công thức là kết quả của việc giải «dốc bằng 0». Hai cách cho cùng một đáp số. Thử kéo hệ số bước lên cao: bước dài hơn $\\frac{1}{a}$ thì bóng nhảy qua đáy và càng nhảy càng xa."
        : "Tại mỗi đáy và mỗi đỉnh đồi, độ dốc bằng 0 nhưng chỉ đáy mới giữ được bóng. Đạo hàm bằng 0 là điều kiện cần của cực trị, còn đổi dấu mới quyết định đó là đáy hay đỉnh."}
    >
      <Graph
        label="Bóng lăn theo đường cong"
        draw={(ctx, w, h) => {
          const { colors, map, pad } = frame(ctx, w, h, view.x0, view.x1, view.y0, view.y1);
          strokeFn(ctx, map, w, h, pad, view.x0, view.x1, f, colors.curve);
          for (let i = 0; i <= shown && i < path.length; i++) {
            const p = at(path, i);
            if (Math.abs(p.x) < 60) dot(ctx, map.x(p.x), map.y(p.y), i === shown ? colors.alt : colors.soft, colors.bg, i === shown ? 7 : 3);
          }
          if (Math.abs(cur.x) < 60) {
            const dx = 1.4;
            dashed(ctx, map.x(cur.x - dx), map.y(cur.y - dx * cur.slope), map.x(cur.x + dx), map.y(cur.y + dx * cur.slope), colors.alt);
          }
          if (vertex !== null) { dashed(ctx, map.x(vertex), map.y(view.y0), map.x(vertex), map.y(view.y1), colors.soft); }
        }}
      />
      <div className="fz-controls">
        {kind === "quad" ? (
          <>
            <Slider label="a (độ cong)" value={a} min={0.3} max={2} step={0.1} onChange={(v) => reset(() => setA(v))} />
            <Slider label="b" value={b} min={-8} max={4} step={0.5} onChange={(v) => reset(() => setB(v))} />
            <Slider label="c" value={c} min={-3} max={6} step={0.5} onChange={(v) => reset(() => setC(v))} />
          </>
        ) : null}
        <Slider label="Vị trí thả bóng" value={start} min={-3.2} max={3.2} step={0.1} onChange={(v) => reset(() => setStart(v))} />
        <Slider label="Độ dài bước (hệ số lr)" value={lr} min={0.02} max={1.1} step={0.02} onChange={(v) => reset(() => setLr(v))} />
      </div>
      <Buttons>
        <button type="button" className="text-btn" onClick={() => setRunning(!running)}>{running ? "Dừng" : "Thả bóng"}</button>
        <button type="button" className="text-btn" onClick={() => { setRunning(false); setShown(Math.min(path.length - 1, shown + 1)); }}>Một bước</button>
        <button type="button" className="text-btn" onClick={() => { setRunning(false); setShown(0); }}>Đặt lại</button>
      </Buttons>
    </Stage>
  );
}

/* ---------- 2. Mạng nơ-ron tự học một đường cong ---------- */

export type NetTarget = { name: string; fn: Fn; x0: number; x1: number; y0: number; y1: number };

export function NetFit({ target, story, why }: { target: NetTarget; story: string; why: string }) {
  const [hidden, setHidden] = useState(6);
  const [lr, setLr] = useState(0.03);
  const [running, setRunning] = useState(false);
  const [epochs, setEpochs] = useState(0);
  const [loss, setLoss] = useState<number | null>(null);
  const [version, setVersion] = useState(0);
  const [net, setNet] = useState<Net>(() => makeNet(6, mulberry32(1042)));
  const xs = useMemo(() => Array.from({ length: 41 }, (_, i) => target.x0 + ((target.x1 - target.x0) * i) / 40), [target]);
  const ys = useMemo(() => xs.map(target.fn), [xs, target]);

  const restart = (h: number, ver: number) => {
    setNet(makeNet(h, mulberry32(1000 + h * 7 + ver)));
    setEpochs(0);
    setLoss(null);
    setRunning(false);
  };

  useTicker(running, 40, () => {
    let last = 0;
    for (let i = 0; i < 25; i++) last = netTrainEpoch(net, xs, ys, lr);
    // net được cập nhật tại chỗ; bản sao nông kích hoạt vẽ lại.
    setNet({ ...net });
    setEpochs((e) => e + 25);
    setLoss(last);
  });

  return (
    <Stage
      title={`Mạng nơ-ron tự học đường cong ${target.name}`}
      story={story}
      read={`Đã học ${epochs} vòng với ${hidden} nơ-ron. Sai số bình phương trung bình: ${loss === null ? "chưa học" : fmt(loss, 5)}.`}
      why={why}
    >
      <Graph
        label={`Mạng nơ-ron xấp xỉ ${target.name}`}
        draw={(ctx, w, h) => {
          const { colors, map, pad } = frame(ctx, w, h, target.x0, target.x1, target.y0, target.y1);
          ctx.globalAlpha = 0.35;
          for (let i = 0; i < net.w1.length; i++) {
            strokeFn(ctx, map, w, h, pad, target.x0, target.x1, (x) => (net.w2[i] as number) * Math.tanh((net.w1[i] as number) * x + (net.b1[i] as number)), colors.soft, 1.2);
          }
          ctx.globalAlpha = 1;
          strokeFn(ctx, map, w, h, pad, target.x0, target.x1, (x) => netForward(net, x), colors.alt, 2.6);
          for (let i = 0; i < xs.length; i += 1) dot(ctx, map.x(at(xs, i)), map.y(at(ys, i)), colors.curve, colors.bg, 3);
        }}
      />
      <div className="fz-controls">
        <Slider label="Số nơ-ron ẩn" value={hidden} min={1} max={16} step={1} onChange={(v) => { setHidden(v); restart(v, version); }} />
        <Slider label="Tốc độ học" value={lr} min={0.005} max={0.08} step={0.005} onChange={setLr} />
      </div>
      <Buttons>
        <button type="button" className="text-btn" onClick={() => setRunning(!running)}>{running ? "Dừng" : "Cho mạng học"}</button>
        <button type="button" className="text-btn" onClick={() => { setVersion(version + 1); restart(hidden, version + 1); }}>Khởi tạo lại</button>
      </Buttons>
    </Stage>
  );
}

/* ---------- 3. Leo đồi tìm dấu bằng (Cauchy) ---------- */

export function HillClimbLab() {
  const [k, setK] = useState(4);
  const [x0, setX0] = useState(0.4);
  const [shown, setShown] = useState(0);
  const f: Fn = (x) => x + k / x;
  const path = useMemo(() => hillClimbMin((x) => x + k / x, x0, 0.15, 9, 1), [k, x0]);
  const cur = at(path, shown);
  const done = shown >= path.length - 1;
  useTicker(!done, 120, () => setShown((s) => Math.min(path.length - 1, s + 1)));
  const min = 2 * Math.sqrt(k);
  return (
    <Stage
      title="Leo đồi tìm giá trị nhỏ nhất của x + k/x"
      story="Người leo đồi bịt mắt chỉ biết thử một bước sang trái, một bước sang phải, bước nào thấp hơn thì đi. Khi cả hai bên đều cao hơn thì thu ngắn bước. Chúng ta chạy thuật toán ấy trên tổng của một số dương và số nghịch đảo của nó (nhân k): hai số có tích không đổi."
      read={`Bước ${shown}: $x=${fmt(cur.x, 4)}$, $x+\\frac{${fmt(k)}}{x}=${fmt(cur.y, 4)}$. Cauchy dự đoán giá trị nhỏ nhất $2\\sqrt{${fmt(k)}}=${fmt(min, 4)}$ tại $x=\\sqrt{${fmt(k)}}=${fmt(Math.sqrt(k), 4)}$.`}
      why="Hai số dương có tích cố định thì tổng nhỏ nhất khi hai số bằng nhau: $x=\frac{k}{x}$, tức $x=\sqrt{k}$. Người leo đồi không biết bất đẳng thức nào, nhưng dừng đúng ở dấu bằng. Bất đẳng thức cho ta biết trước đích đến và lý do không có chỗ nào thấp hơn."
    >
      <Graph
        label="Leo đồi trên đồ thị x + k/x"
        draw={(ctx, w, h) => {
          const { colors, map, pad } = frame(ctx, w, h, 0, 9, 0, 14);
          strokeFn(ctx, map, w, h, pad, 0.2, 9, f, colors.curve);
          dashed(ctx, map.x(0), map.y(min), map.x(9), map.y(min), colors.soft);
          for (let i = 0; i <= shown; i++) dot(ctx, map.x(at(path, i).x), map.y(at(path, i).y), i === shown ? colors.alt : colors.soft, colors.bg, i === shown ? 7 : 3);
        }}
      />
      <div className="fz-controls">
        <Slider label="k (tích hai số)" value={k} min={1} max={9} step={1} onChange={(v) => { setK(v); setShown(0); }} />
        <Slider label="Điểm xuất phát" value={x0} min={0.3} max={8} step={0.1} onChange={(v) => { setX0(v); setShown(0); }} />
      </div>
      <Buttons><button type="button" className="text-btn" onClick={() => setShown(0)}>Chạy lại</button></Buttons>
    </Stage>
  );
}

/* ---------- 4. Tổng vô hạn: cộng dồn từng miếng ---------- */

export function PartialSums() {
  const [q, setQ] = useState(0.5);
  const [a, setA] = useState(1);
  const [n, setN] = useState(8);
  const sums = useMemo(() => geometricPartialSums(a, q, 30), [a, q]);
  const limit = a / (1 - q);
  const sn = at(sums, n - 1);
  return (
    <Stage
      title="Cộng dồn từng miếng: tổng riêng của cấp số nhân"
      story="Có một cái bánh dài. Bạn ăn miếng đầu có độ dài a, miếng sau bằng q lần miếng trước, rồi cứ thế. Mỗi lần ăn xong, vạch lại tổng đã ăn. Nếu mỗi miếng nhỏ đi thật nhanh (q nằm giữa -1 và 1) thì tổng đã ăn không vọt đi mãi mà dồn về một vạch cố định."
      read={`Sau ${n} miếng: $S_{${n}}=${fmt(sn, 5)}$. Công thức $\\frac{a}{1-q}=${fmt(limit, 5)}$. Chênh lệch $${fmt(Math.abs(limit - sn), 5)}$. Công thức tổng hữu hạn $a\\cdot\\frac{1-q^{n}}{1-q}=${fmt(a * (1 - q ** n) / (1 - q), 5)}$.`}
      why="Nhân $S_n$ với $q$ rồi trừ, mọi miếng ở giữa triệt tiêu, còn $S_n(1-q)=a(1-q^n)$. Khi $|q|<1$ thì $q^n\to 0$ nên $S\to\frac{a}{1-q}$. Kéo q về 1 hoặc quá 1: tổng không còn dồn về vạch nào."
    >
      <Graph
        label="Tổng riêng dồn về giới hạn"
        draw={(ctx, w, h) => {
          const lo = Math.min(0, ...sums, limit);
          const hi = Math.max(1, ...sums.map((s) => Math.min(s, 60)), Math.min(limit, 60));
          const { colors, map } = frame(ctx, w, h, 0, 31, lo - 0.2, hi + 0.5, "n", "S");
          if (q < 1 && q > -1) dashed(ctx, map.x(0), map.y(limit), map.x(31), map.y(limit), colors.alt);
          for (let i = 0; i < sums.length; i++) dot(ctx, map.x(i + 1), map.y(at(sums, i)), i + 1 === n ? colors.alt : colors.curve, colors.bg, i + 1 === n ? 6 : 3);
        }}
      />
      <div className="fz-controls">
        <Slider label="a (miếng đầu)" value={a} min={0.5} max={3} step={0.5} onChange={setA} />
        <Slider label="q (tỉ lệ co)" value={q} min={-1.2} max={1.2} step={0.05} onChange={setQ} />
        <Slider label="Số miếng n" value={n} min={1} max={30} step={1} onChange={setN} />
      </div>
    </Stage>
  );
}

/* ---------- 5. Đi dọc đường tròn bằng những bước nhỏ ---------- */

export function CircleWalk() {
  const [angle, setAngle] = useState(1);
  const [steps, setSteps] = useState(4);
  const p = walkCircle(angle, steps);
  const exact = { x: Math.cos(angle), y: Math.sin(angle) };
  return (
    <Stage
      title="Đi dọc đường tròn: sin và cos là hai bóng của một điểm"
      story="Đặt một cái đèn trên cao rọi xuống: điểm chạy trên đường tròn bán kính 1 có bóng đổ xuống trục ngang và bóng đổ sang trục dọc. Bóng ngang là cosin, bóng dọc là sin. Máy tính không biết sin là gì; nó xoay vectơ từng bước nhỏ cho đến khi tới góc cần tìm. Hãy giảm số bước xuống thật ít để thấy kết quả lệch, rồi tăng lên."
      read={`Góc $${fmt(angle, 2)}$ rad, ${steps} bước xoay: $\\cos\\approx${fmt(p.x, 4)}$, $\\sin\\approx${fmt(p.y, 4)}$. Giá trị đúng: $\\cos=${fmt(exact.x, 4)}$, $\\sin=${fmt(exact.y, 4)}$. Kiểm: $x^2+y^2=${fmt(p.x * p.x + p.y * p.y, 4)}$ (phải bằng 1).`}
      why="Hệ thức $\sin^2\alpha+\cos^2\alpha=1$ chính là điều kiện điểm nằm trên đường tròn bán kính 1, theo Pythagore. Mỗi bước xoay giữ độ dài, nên tổng bình phương hai bóng luôn gần 1; số bước càng nhiều thì càng sát."
    >
      <Graph
        label="Điểm chạy trên đường tròn đơn vị và hai bóng"
        draw={(ctx, w, h) => {
          const { colors, map } = frame(ctx, w, h, -1.6, 1.6, -1.4, 1.4);
          ctx.beginPath();
          ctx.strokeStyle = colors.soft;
          ctx.lineWidth = 1.2;
          ctx.arc(map.x(0), map.y(0), map.x(1) - map.x(0), 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(map.x(1), map.y(0));
          for (let i = 1; i <= steps; i++) {
            const q = walkCircle((angle * i) / steps, i);
            ctx.lineTo(map.x(q.x), map.y(q.y));
          }
          ctx.strokeStyle = colors.curve;
          ctx.lineWidth = 3;
          ctx.stroke();
          dashed(ctx, map.x(p.x), map.y(p.y), map.x(p.x), map.y(0), colors.alt);
          dashed(ctx, map.x(p.x), map.y(p.y), map.x(0), map.y(p.y), colors.alt);
          line(ctx, map.x(0), map.y(0), map.x(p.x), map.y(p.y), colors.axis, 1.4);
          dot(ctx, map.x(p.x), map.y(p.y), colors.alt, colors.bg, 7);
          label(ctx, "cos", map.x(p.x) - 10, map.y(0) + 16, colors.alt);
          label(ctx, "sin", map.x(0) + 6, map.y(p.y) - 6, colors.alt);
        }}
      />
      <div className="fz-controls">
        <Slider label="Góc (rad)" value={angle} min={0} max={6.28} step={0.02} onChange={setAngle} />
        <Slider label="Số bước xoay nhỏ" value={steps} min={1} max={60} step={1} onChange={setSteps} />
      </div>
    </Stage>
  );
}

/* ---------- 6. Thử thách sai số: giới hạn của dãy ---------- */

export function EpsilonGame() {
  const [e10, setE10] = useState(1);
  const eps = 10 ** -e10;
  const u = (n: number) => (2 * n + 1) / (n + 1);
  const nStar = firstIndexWithin(u, 2, eps, 200000);
  const show = Math.min(60, Math.max(12, (nStar ?? 40) * 2));
  return (
    <Stage
      title="Thử thách sai số: dãy $u_n=\frac{2n+1}{n+1}$ có đến gần 2 không?"
      story="Một người thách bạn: «Tôi chọn một dải rất hẹp quanh số 2. Bạn có chỉ ra được một vị trí trong dãy sao cho từ đó trở đi mọi số hạng đều nằm trong dải không?» Thu dải hẹp bao nhiêu thì bạn vẫn tìm được vị trí đó: đó chính là định nghĩa giới hạn, không còn là lời nói suông."
      read={`Dải: $|u_n-2|<${fmt(eps, 6)}$. Máy duyệt dãy và tìm được: từ số hạng thứ ${nStar ?? "(quá xa)"} trở đi, mọi số hạng đều nằm trong dải. Kiểm bằng đại số: $|u_n-2|=\\frac{1}{n+1}<${fmt(eps, 6)}$ khi $n>${fmt(1 / eps - 1, 1)}$.`}
      why="Muốn thu dải hẹp gấp 10 lần thì phải đi xa gấp khoảng 10 lần, nhưng bao giờ cũng có đích. Giới hạn là số mà dãy bám sát lâu dài, không cần chạm."
    >
      <Graph
        label="Dải sai số quanh giới hạn 2"
        draw={(ctx, w, h) => {
          const { colors, map } = frame(ctx, w, h, 0, show + 1, 0.8, 2.4, "n", "u");
          ctx.fillStyle = colors.alt;
          ctx.globalAlpha = 0.18;
          ctx.fillRect(map.x(0), map.y(2 + eps), map.x(show + 1) - map.x(0), Math.max(2, map.y(2 - eps) - map.y(2 + eps)));
          ctx.globalAlpha = 1;
          dashed(ctx, map.x(0), map.y(2), map.x(show + 1), map.y(2), colors.alt);
          for (let n = 1; n <= show; n++) dot(ctx, map.x(n), map.y(u(n)), nStar !== null && n >= nStar ? colors.curve : colors.soft, colors.bg, 3.5);
          if (nStar !== null && nStar <= show) dashed(ctx, map.x(nStar), map.y(0.8), map.x(nStar), map.y(2.4), colors.curve);
        }}
      />
      <div className="fz-controls">
        <Slider label="Độ hẹp của dải (10 mũ −)" value={e10} min={0.5} max={4} step={0.25} onChange={setE10} />
      </div>
    </Stage>
  );
}

/* ---------- 7. Chia đôi bắt nghiệm ---------- */

export function BisectLab() {
  const f: Fn = (x) => x ** 3 - x - 2;
  const rows = useMemo(() => bisection(f, 1, 2, 24), []);
  const [i, setI] = useState(0);
  const cur = at(rows, i);
  return (
    <Stage
      title="Chia đôi bắt nghiệm: vì sao hàm liên tục đổi dấu thì có nghiệm"
      story="Bạn đi bộ từ một chỗ dưới mực nước lên chỗ trên mực nước theo một đường liền nét. Chắc chắn có lúc đúng ngang mực nước. Để bắt nó: đứng giữa đoạn, xem đang trên hay dưới nước rồi giữ lại nửa đoạn có hai đầu trái dấu. Mỗi lần đoạn ngắn đi một nửa nhưng vẫn kẹp lấy chỗ cắt trục."
      read={`Lần ${i + 1}: đoạn $[${fmt(cur.lo, 6)};\\ ${fmt(cur.hi, 6)}]$, giữa $${fmt(cur.mid, 6)}$, $f=${fmt(cur.fmid, 6)}$. Độ dài đoạn $${fmt(cur.hi - cur.lo, 8)}$ = $\\frac{1}{2^{${i}}}$.`}
      why="Các đoạn lồng nhau co về một điểm duy nhất, và tại đó hàm vừa không dương vừa không âm nên bằng 0. Đây là định lí giá trị trung gian, và cũng là thuật toán máy tính dùng để tìm nghiệm khi không có công thức."
    >
      <Graph
        label="Chia đôi đoạn chứa nghiệm"
        draw={(ctx, w, h) => {
          const { colors, map, pad } = frame(ctx, w, h, 0.8, 2.2, -3, 5);
          strokeFn(ctx, map, w, h, pad, 0.8, 2.2, f, colors.curve);
          ctx.fillStyle = colors.alt;
          ctx.globalAlpha = 0.2;
          ctx.fillRect(map.x(cur.lo), map.y(5), map.x(cur.hi) - map.x(cur.lo) + 1, map.y(-3) - map.y(5));
          ctx.globalAlpha = 1;
          dot(ctx, map.x(cur.mid), map.y(cur.fmid), colors.alt, colors.bg, 6);
        }}
      />
      <Buttons>
        <button type="button" className="text-btn" onClick={() => setI(Math.min(rows.length - 1, i + 1))}>Chia đôi tiếp</button>
        <button type="button" className="text-btn" onClick={() => setI(0)}>Đặt lại</button>
      </Buttons>
    </Stage>
  );
}

/* ---------- 8. Cát tuyến thành tiếp tuyến ---------- */

export function SecantLab() {
  const f: Fn = (x) => x ** 3 - 3 * x;
  const df = (x: number) => 3 * x * x - 3;
  const [x0, setX0] = useState(1.5);
  const [e, setE] = useState(0.2);
  const h = 10 ** -e * 2;
  const rows = useMemo(() => slopeSequence(f, x0, 1, 12), [x0]);
  const s = (f(x0 + h) - f(x0)) / h;
  return (
    <Stage
      title="Cát tuyến co lại thành tiếp tuyến"
      story="Nối điểm của bạn với một điểm khác cách nó một bước h. Đường nối ấy có độ dốc cụ thể: cao lên bao nhiêu chia cho bước ngang h. Rút ngắn h, đường xoay dần và ôm sát đường cong. Đạo hàm là độ dốc mà các đường nối ấy tiến tới."
      read={`Bước $h=${fmt(h, 5)}$: độ dốc cát tuyến $${fmt(s, 5)}$. Đạo hàm đúng $3x^2-3=${fmt(df(x0), 5)}$. Dãy độ dốc khi h giảm một nửa mỗi lần: ${rows.slice(0, 8).map((r) => fmt(r.slope, 3)).join("; ")}…`}
      why="Với $x^3-3x$, khai triển $\frac{(x+h)^3-3(x+h)-x^3+3x}{h}=3x^2+3xh+h^2-3$. Khi h nhỏ dần thì hai số hạng chứa h biến mất, còn $3x^2-3$: bảng số bên trên chính là bước này viết bằng con số."
    >
      <Graph
        label="Cát tuyến và tiếp tuyến"
        draw={(ctx, w, h2) => {
          const { colors, map, pad } = frame(ctx, w, h2, -3, 3, -5, 5);
          strokeFn(ctx, map, w, h2, pad, -3, 3, f, colors.curve);
          const ext = 3;
          dashed(ctx, map.x(x0 - ext), map.y(f(x0) - ext * df(x0)), map.x(x0 + ext), map.y(f(x0) + ext * df(x0)), colors.soft);
          line(ctx, map.x(x0 - ext), map.y(f(x0) - ext * s), map.x(x0 + ext), map.y(f(x0) + ext * s), colors.alt, 2);
          dot(ctx, map.x(x0), map.y(f(x0)), colors.curve, colors.bg, 6);
          dot(ctx, map.x(x0 + h), map.y(f(x0 + h)), colors.alt, colors.bg, 5);
        }}
      />
      <div className="fz-controls">
        <Slider label="Điểm x" value={x0} min={-2} max={2} step={0.1} onChange={setX0} />
        <Slider label="Độ ngắn của bước h (kéo phải = ngắn hơn)" value={e} min={-0.5} max={3} step={0.1} onChange={setE} />
      </div>
    </Stage>
  );
}

/* ---------- 9. Tổng Riemann: cộng các dải mỏng ---------- */

const RIEMANN: { name: string; f: Fn; a: number; b: number; F: Fn; ymax: number; tex: string }[] = [
  { name: "x²  từ 0 đến 2", f: (x) => x * x, a: 0, b: 2, F: (x) => x ** 3 / 3, ymax: 4.5, tex: "\\int_0^2 x^2dx=\\frac{2^3}{3}" },
  { name: "sin x  từ 0 đến π", f: Math.sin, a: 0, b: Math.PI, F: (x) => -Math.cos(x), ymax: 1.3, tex: "\\int_0^\\pi\\sin x\\,dx=-\\cos\\pi+\\cos 0" },
  { name: "√x  từ 0 đến 4", f: Math.sqrt, a: 0, b: 4, F: (x) => (2 / 3) * x ** 1.5, ymax: 2.4, tex: "\\int_0^4\\sqrt{x}dx=\\frac{2}{3}\\cdot 4^{3/2}" },
];

export function RiemannLab() {
  const [pick, setPick] = useState(0);
  const [n, setN] = useState(4);
  const [rule, setRule] = useState<"left" | "right" | "mid">("left");
  const spec = at(RIEMANN, pick);
  const sum = riemann(spec.f, spec.a, spec.b, n, rule);
  const exact = spec.F(spec.b) - spec.F(spec.a);
  return (
    <Stage
      title="Diện tích bằng cách cộng các dải mỏng"
      story="Muốn biết diện tích dưới đường cong, hãy cắt nó thành n dải đứng. Mỗi dải coi như hình chữ nhật: rộng bằng bề rộng dải, cao bằng giá trị của hàm. Cộng lại được một xấp xỉ. Càng nhiều dải mỏng thì xấp xỉ càng tốt. Tích phân là giá trị mà tổng này dồn về."
      read={`${spec.name}: ${n} dải, tổng $=${fmt(sum, 5)}$. Giá trị đúng bằng nguyên hàm $F(b)-F(a)$: $${spec.tex}=${fmt(exact, 5)}$. Sai lệch $${fmt(Math.abs(sum - exact), 5)}$.`}
      why="Nguyên hàm là con đường tắt: thay vì cộng vô số dải, chỉ cần lấy giá trị của nguyên hàm ở hai đầu mút trừ nhau. Hãy tăng n và xem sai lệch rơi như thế nào, rồi đổi quy tắc chọn chiều cao dải (trái, phải, giữa) để thấy dải giữa chính xác hơn hẳn."
    >
      <Graph
        label="Các hình chữ nhật Riemann"
        draw={(ctx, w, h) => {
          const { colors, map, pad } = frame(ctx, w, h, spec.a - 0.2, spec.b + 0.2, -0.2, spec.ymax);
          const dx = (spec.b - spec.a) / n;
          ctx.fillStyle = colors.curve;
          ctx.globalAlpha = 0.25;
          for (let i = 0; i < n; i++) {
            const x = rule === "left" ? spec.a + i * dx : rule === "right" ? spec.a + (i + 1) * dx : spec.a + (i + 0.5) * dx;
            const y = spec.f(x);
            ctx.fillRect(map.x(spec.a + i * dx), map.y(Math.max(0, y)), map.x(spec.a + (i + 1) * dx) - map.x(spec.a + i * dx) - (n > 60 ? 0 : 1), Math.abs(map.y(0) - map.y(y)));
          }
          ctx.globalAlpha = 1;
          strokeFn(ctx, map, w, h, pad, spec.a, spec.b, spec.f, colors.curve);
        }}
      />
      <div className="fz-controls">
        <label className="fz-pick">Hàm
          <select value={pick} onChange={(e) => setPick(Number(e.target.value))}>{RIEMANN.map((r, i) => <option key={r.name} value={i}>{r.name}</option>)}</select>
        </label>
        <label className="fz-pick">Chiều cao dải lấy ở
          <select value={rule} onChange={(e) => setRule(e.target.value as "left" | "right" | "mid")}>
            <option value="left">mép trái</option><option value="right">mép phải</option><option value="mid">giữa dải</option>
          </select>
        </label>
        <Slider label="Số dải n" value={n} min={1} max={120} step={1} onChange={setN} />
      </div>
    </Stage>
  );
}

/* ---------- 10. Nơ-ron là tích vô hướng ---------- */

export function DotNeuron() {
  const [wa, setWa] = useState(0.6);
  const [pa, setPa] = useState(1.1);
  const [pl, setPl] = useState(2.2);
  const [bias, setBias] = useState(-0.5);
  const w = { x: 2 * Math.cos(wa), y: 2 * Math.sin(wa) };
  const p = { x: pl * Math.cos(pa), y: pl * Math.sin(pa) };
  const dotp = w.x * p.x + w.y * p.y;
  const out = dotp + bias;
  return (
    <Stage
      title="Một nơ-ron chỉ là một tích vô hướng"
      story="Mỗi nơ-ron trong mạng nhận một vectơ đầu vào p, nhân từng thành phần với vectơ trọng số w rồi cộng lại: đó chính là tích vô hướng. Tích lớn khi hai vectơ chỉ cùng hướng, bằng 0 khi vuông góc, âm khi ngược hướng. Cộng thêm một ngưỡng b rồi hỏi «dương không?» thì được câu trả lời bật hoặc tắt."
      read={`$w\\cdot p=${fmt(w.x, 2)}\\cdot${fmt(p.x, 2)}+${fmt(w.y, 2)}\\cdot${fmt(p.y, 2)}=${fmt(dotp, 3)}$. Bằng hình học: $|w||p|\\cos\\varphi=2\\cdot${fmt(pl, 2)}\\cdot\\cos(${fmt(pa - wa, 2)})=${fmt(2 * pl * Math.cos(pa - wa), 3)}$. Cộng ngưỡng ${fmt(bias)}: ${fmt(out, 3)}, nơ-ron ${out > 0 ? "BẬT" : "TẮT"}.`}
      why="Hai cách tính, theo tọa độ và theo độ dài với cosin, luôn cho cùng một số. Đó là lý do công thức tọa độ $a_1b_1+a_2b_2$ đúng: nó không phải một mẹo, mà là phép chiếu của p lên hướng của w."
    >
      <Graph
        label="Hai vectơ và tích vô hướng"
        draw={(ctx, wd, ht) => {
          const { colors, map } = frame(ctx, wd, ht, -3.5, 3.5, -3, 3);
          const proj = dotp / 4;
          dashed(ctx, map.x(p.x), map.y(p.y), map.x(w.x * proj / 1), map.y(w.y * proj / 1), colors.soft);
          line(ctx, map.x(0), map.y(0), map.x(w.x), map.y(w.y), colors.curve, 3);
          line(ctx, map.x(0), map.y(0), map.x(p.x), map.y(p.y), out > 0 ? colors.alt : colors.soft, 3);
          dot(ctx, map.x(w.x), map.y(w.y), colors.curve, colors.bg, 6);
          dot(ctx, map.x(p.x), map.y(p.y), colors.alt, colors.bg, 6);
          label(ctx, "w (trọng số)", map.x(w.x) + 8, map.y(w.y), colors.curve);
          label(ctx, "p (đầu vào)", map.x(p.x) + 8, map.y(p.y), colors.alt);
        }}
      />
      <div className="fz-controls">
        <Slider label="Hướng của w (rad)" value={wa} min={-3.14} max={3.14} step={0.05} onChange={setWa} />
        <Slider label="Hướng của p (rad)" value={pa} min={-3.14} max={3.14} step={0.05} onChange={setPa} />
        <Slider label="Độ dài của p" value={pl} min={0.3} max={3} step={0.1} onChange={setPl} />
        <Slider label="Ngưỡng b" value={bias} min={-3} max={3} step={0.1} onChange={setBias} />
      </div>
    </Stage>
  );
}

/* ---------- 11. Perceptron học đường thẳng ---------- */

function makePoints(seed: number): Pt[] {
  const r = mulberry32(seed);
  const ang = r() * Math.PI;
  const nx = Math.cos(ang);
  const ny = Math.sin(ang);
  const off = (r() * 2 - 1) * 1.2;
  const pts: Pt[] = [];
  while (pts.length < 40) {
    const x = r() * 8 - 4;
    const y = r() * 8 - 4;
    const s = nx * x + ny * y + off;
    if (Math.abs(s) > 0.5) pts.push({ x, y, label: s > 0 ? 1 : -1 });
  }
  return pts;
}

export function PerceptronLab() {
  const [seed, setSeed] = useState(7);
  const [epoch, setEpoch] = useState(0);
  const [qx, setQx] = useState(1.5);
  const [qy, setQy] = useState(-1);
  const points = useMemo(() => makePoints(seed), [seed]);
  const history = useMemo(() => perceptronTrain(points, 200), [points]);
  const cur = epoch === 0 ? { w: [0, 0] as [number, number], b: 0, errors: points.length } : at(history, epoch - 1);
  const ok = cur.w[0] !== 0 || cur.w[1] !== 0;
  const dist = ok ? signedDistance(cur.w, cur.b, { x: qx, y: qy }) : 0;
  const formula = ok ? Math.abs(cur.w[0] * qx + cur.w[1] * qy + cur.b) / Math.sqrt(cur.w[0] ** 2 + cur.w[1] ** 2) : 0;
  return (
    <Stage
      title="Nơ-ron học tìm đường thẳng ngăn cách hai nhóm điểm"
      story="Có hai nhóm điểm, chấm đặc và chấm rỗng. Nơ-ron bắt đầu mù tịt (w bằng 0). Với mỗi điểm bị phân loại sai, nó kéo vectơ trọng số về phía điểm đó nếu là nhóm đặc, đẩy ra xa nếu là nhóm rỗng, rồi thử lại. Đường thẳng w·p+b=0 xoay và tịnh tiến cho đến khi mọi điểm về đúng phía."
      read={`Vòng ${epoch}: còn ${cur.errors} điểm sai. Đường thẳng: $${fmt(cur.w[0], 2)}x${cur.w[1] < 0 ? "-" : "+"}${fmt(Math.abs(cur.w[1]), 2)}y${cur.b < 0 ? "-" : "+"}${fmt(Math.abs(cur.b), 2)}=0$. Khoảng cách từ điểm hỏi $(${fmt(qx)};${fmt(qy)})$ đến đường: $\\frac{|ax_0+by_0+c|}{\\sqrt{a^2+b^2}}=${fmt(formula, 4)}$ (máy tính cho ${fmt(Math.abs(dist), 4)}).`}
      why="Vectơ trọng số w chính là pháp tuyến của đường thẳng, nên tích vô hướng w·p đo «điểm p đứng cao bao xa so với đường». Chia cho độ dài của w thì ra khoảng cách thật: đó là công thức khoảng cách từ điểm đến đường thẳng, được học ở đây bằng cách để máy tự tìm ra."
    >
      <Graph
        label="Các điểm hai nhóm và đường thẳng nơ-ron tìm được"
        draw={(ctx, w, h) => {
          const { colors, map } = frame(ctx, w, h, -4.5, 4.5, -4.5, 4.5);
          for (const p of points) {
            ctx.beginPath();
            ctx.arc(map.x(p.x), map.y(p.y), 5, 0, Math.PI * 2);
            ctx.strokeStyle = p.label === 1 ? colors.alt : colors.curve;
            ctx.lineWidth = 2;
            ctx.fillStyle = p.label === 1 ? colors.alt : colors.bg;
            ctx.fill();
            ctx.stroke();
          }
          if (ok) {
            const [a, b] = cur.w;
            const c = cur.b;
            const pts: [number, number][] = [];
            for (const x of [-4.5, 4.5]) if (Math.abs(b) > 1e-9) pts.push([x, -(a * x + c) / b]);
            if (Math.abs(b) <= 1e-9) for (const y of [-4.5, 4.5]) pts.push([-c / a, y]);
            if (pts.length === 2) line(ctx, map.x((pts[0] as [number, number])[0]), map.y((pts[0] as [number, number])[1]), map.x((pts[1] as [number, number])[0]), map.y((pts[1] as [number, number])[1]), colors.axis, 2.4);
            const n2 = a * a + b * b;
            const t = (a * qx + b * qy + c) / n2;
            const fx = qx - a * t;
            const fy = qy - b * t;
            dashed(ctx, map.x(qx), map.y(qy), map.x(fx), map.y(fy), colors.alt);
            dot(ctx, map.x(fx), map.y(fy), colors.soft, colors.bg, 3);
          }
          ctx.fillStyle = colors.ink;
          ctx.fillRect(map.x(qx) - 6, map.y(qy) - 6, 12, 12);
        }}
      />
      <div className="fz-controls">
        <Slider label="Điểm hỏi: x" value={qx} min={-4} max={4} step={0.1} onChange={setQx} />
        <Slider label="Điểm hỏi: y" value={qy} min={-4} max={4} step={0.1} onChange={setQy} />
      </div>
      <Buttons>
        <button type="button" className="text-btn" onClick={() => setEpoch(Math.min(history.length, epoch + 1))}>Cho học một vòng</button>
        <button type="button" className="text-btn" onClick={() => setEpoch(history.length)}>Học đến khi xong</button>
        <button type="button" className="text-btn" onClick={() => { setSeed(freshSeed() % 100000); setEpoch(0); }}>Dữ liệu mới</button>
      </Buttons>
    </Stage>
  );
}

/* ---------- 12. Ném phi tiêu: π và thể tích hình cầu ---------- */

export function DartLab({ mode }: { mode: "pi" | "ball" }) {
  const [running, setRunning] = useState(false);
  const [rng, setRng] = useState(() => mulberry32(42));
  const [state, setState] = useState<{ dots: { x: number; y: number; in: boolean }[]; inside: number; total: number }>({ dots: [], inside: 0, total: 0 });
  useTicker(running, 60, () => {
    const dots = state.dots.slice();
    let inside = state.inside;
    for (let i = 0; i < 60; i++) {
      const x = rng() * 2 - 1;
      const y = rng() * 2 - 1;
      const z = mode === "ball" ? rng() * 2 - 1 : 0;
      const hit = x * x + y * y + z * z <= 1;
      if (hit) inside += 1;
      if (dots.length < 1500) dots.push({ x, y, in: hit });
    }
    setState({ dots, inside, total: state.total + 60 });
  });
  const { dots, inside, total: thrown } = state;
  const est = thrown === 0 ? 0 : mode === "pi" ? (4 * inside) / thrown : (8 * inside) / thrown;
  const exact = mode === "pi" ? Math.PI : (4 / 3) * Math.PI;
  const quick = useMemo(() => (mode === "pi" ? estimatePi(100000, mulberry32(9)) : estimateBallVolume(100000, mulberry32(9))), [mode]);
  return (
    <Stage
      title={mode === "pi" ? "Ném phi tiêu tìm π" : "Ném điểm vào hộp để đo thể tích hình cầu"}
      story={mode === "pi"
        ? "Vẽ hình vuông cạnh 2 và đường tròn bán kính 1 nằm gọn trong nó. Nhắm mắt ném phi tiêu rải đều. Tỉ lệ phi tiêu rơi vào đường tròn bằng tỉ lệ diện tích: diện tích tròn chia diện tích vuông. Không dùng một công thức nào về đường tròn, ta vẫn đo được π."
        : "Ném điểm ngẫu nhiên vào hộp lập phương cạnh 2, đếm tỉ lệ điểm rơi vào quả cầu bán kính 1 nằm bên trong. Tỉ lệ ấy nhân với thể tích hộp (8) cho thể tích quả cầu, không cần biết công thức. Hình chỉ vẽ hình chiếu xuống mặt phẳng."}
      read={`Đã ném ${thrown} lần, ${inside} lần trúng. Ước lượng: $${fmt(est, 4)}$. Giá trị đúng ${mode === "pi" ? "$\\pi" : "$\\frac{4}{3}\\pi"}=${fmt(exact, 4)}$. Chạy nhanh 100000 lần cho $${fmt(quick, 4)}$.`}
      why={mode === "pi"
        ? "Diện tích tròn là $\\pi r^2=\\pi$, diện tích vuông là $4$, nên tỉ lệ trúng là $\\frac{\\pi}{4}$, và $\\pi\\approx 4\\times$ (tỉ lệ trúng). Ném càng nhiều, ước lượng càng sát: sai số giảm khoảng theo căn bậc hai của số lần ném."
        : "Thể tích cầu là $\\frac{4}{3}\\pi r^3=\\frac{4}{3}\\pi$ và hộp là $8$. Máy đo được số này mà không chứa công thức nào, rồi ta mới so với $\\frac{4}{3}\\pi R^3$ đã học: hai bên khớp nhau."}
    >
      <Graph
        label="Các điểm phi tiêu rơi trong và ngoài đường tròn"
        draw={(ctx, w, h) => {
          const { colors, map } = frame(ctx, w, h, -1.1, 1.1, -1.1, 1.1);
          ctx.beginPath();
          ctx.strokeStyle = colors.soft;
          ctx.lineWidth = 1.5;
          ctx.arc(map.x(0), map.y(0), map.x(1) - map.x(0), 0, Math.PI * 2);
          ctx.stroke();
          for (const d of dots) {
            ctx.fillStyle = d.in ? colors.alt : colors.curve;
            ctx.fillRect(map.x(d.x) - 1, map.y(d.y) - 1, 2.5, 2.5);
          }
        }}
      />
      <Buttons>
        <button type="button" className="text-btn" onClick={() => setRunning(!running)}>{running ? "Dừng" : "Ném phi tiêu"}</button>
        <button type="button" className="text-btn" onClick={() => { setRunning(false); setState({ dots: [], inside: 0, total: 0 }); setRng(() => mulberry32(freshSeed())); }}>Xóa</button>
      </Buttons>
    </Stage>
  );
}

/* ---------- 13. Máy đếm: hoán vị, tổ hợp, tam giác Pascal ---------- */

const LETTERS = ["A", "B", "C", "D", "E", "F", "G"];

export function EnumLab() {
  const [n, setN] = useState(4);
  const [k, setK] = useState(2);
  const [mode, setMode] = useState<"perm" | "comb">("perm");
  const kk = Math.min(k, n);
  const items = LETTERS.slice(0, n);
  const list = mode === "perm" ? permutations(items) : combinations(items, kk);
  const rows = pascalRows(n);
  const row = at(rows, n);
  const expected = mode === "perm" ? factorial(n) : factorial(n) / (factorial(kk) * factorial(n - kk));
  return (
    <Stage
      title="Máy liệt kê: đếm bằng cách viết ra hết"
      story="Cách chắc chắn nhất để đếm là liệt kê từng khả năng rồi đếm. Máy dưới đây viết ra mọi cách xếp n bạn vào một hàng (hoán vị), hoặc mọi cách chọn k bạn đi trực nhật không kể thứ tự (tổ hợp). Khi n lớn, danh sách quá dài để viết, và công thức xuất hiện để đếm mà không cần viết."
      read={`${mode === "perm" ? `Hoán vị của ${n} phần tử` : `Chọn ${kk} trong ${n} phần tử`}: máy liệt kê được ${list.length} cách. Công thức ${mode === "perm" ? `$${n}!$` : `$\\frac{${n}!}{${kk}!\\,${n - kk}!}$`} cho $${expected}$. Hàng ${n} của tam giác Pascal: ${row.join(", ")}; tổng $=${row.reduce((s, v) => s + v, 0)}=2^{${n}}$.`}
      why={`Hoán vị: vị trí đầu có ${n} cách chọn, vị trí kế còn ${Math.max(1, n - 1)}, cứ thế, nhân lại được $n!$. Tổ hợp: mỗi nhóm k người xếp được $k!$ thứ tự, nên số chỉnh hợp chia $k!$. Trong tam giác Pascal, mỗi số là tổng hai số phía trên vì một nhóm k người hoặc có thêm người cuối, hoặc không; cộng cả hàng ra $2^n$ vì mỗi người được chọn hoặc không.`}
    >
      <div className="fz-list" aria-label="Danh sách các khả năng">
        {list.slice(0, 120).map((entry) => <span key={entry.join("")} className="fz-chip">{entry.join("")}</span>)}
        {list.length > 120 ? <span className="fz-chip">… còn {list.length - 120}</span> : null}
      </div>
      <div className="fz-pascal" aria-label="Tam giác Pascal">
        {rows.map((r, i) => (
          <div key={r.join(",")} className={i === n ? "fz-prow cur" : "fz-prow"}>
            {r.map((v, j) => <span key={`${i}-${j}`} className={i === n && mode === "comb" && j === kk ? "hit" : ""}>{v}</span>)}
          </div>
        ))}
      </div>
      <div className="fz-controls">
        <Slider label="Số phần tử n" value={n} min={1} max={7} step={1} onChange={setN} />
        <Slider label="Số được chọn k" value={kk} min={0} max={n} step={1} onChange={setK} />
        <label className="fz-pick">Đếm
          <select value={mode} onChange={(e) => setMode(e.target.value as "perm" | "comb")}>
            <option value="perm">cách xếp thành hàng</option><option value="comb">cách chọn nhóm</option>
          </select>
        </label>
      </div>
    </Stage>
  );
}

/* ---------- 14. Xúc xắc và «ít nhất một lần» ---------- */

export function DiceLab() {
  const [running, setRunning] = useState(false);
  const [rng, setRng] = useState(() => mulberry32(5));
  const [tally, setTally] = useState<{ counts: number[]; throws: number }>({ counts: Array<number>(13).fill(0), throws: 0 });
  const { counts, throws } = tally;
  const [p, setP] = useState(0.1);
  const [tries, setTries] = useState(10);
  const exact = twoDiceExact();
  useTicker(running, 60, () => {
    const batch = twoDiceSimulate(40, rng);
    setTally({ counts: counts.map((c, i) => c + (batch[i] ?? 0)), throws: throws + 40 });
  });
  const sim = useMemo(() => atLeastOneSimulate(p, tries, 20000, mulberry32(Math.round(p * 1000) + tries)), [p, tries]);
  const share = (i: number) => (throws === 0 ? 0 : (counts[i] ?? 0) / throws);
  return (
    <Stage
      title="Tung hai xúc xắc: đếm đúng và đo thật"
      story="Có 36 cặp kết quả khi tung hai xúc xắc, trong đó tổng 7 xuất hiện ở 6 cặp còn tổng 2 chỉ ở 1 cặp. Ta có thể đếm trước (cột viền) hoặc tung thật rồi ghi lại (cột đặc). Tung nhiều lần, hai kết quả dồn vào nhau: đó là xác suất."
      read={`Đã tung ${throws} lần. Tổng 7: đo được $${fmt(share(7), 4)}$, đếm trước $\\frac{6}{36}=${fmt(6 / 36, 4)}$. Mô phỏng «ít nhất một lần thành công» với p=${fmt(p)}, ${tries} lần: $${fmt(sim, 4)}$. Công thức $1-(1-p)^{n}=${fmt(1 - (1 - p) ** tries, 4)}$.`}
      why="Xác suất cổ điển là số kết quả thuận lợi chia tổng số kết quả: ở đây $\frac{n(A)}{36}$. Biến cố «ít nhất một lần» khó đếm trực tiếp nhưng biến cố đối «không lần nào» chỉ có một cách là cả $n$ lần đều thất bại, xác suất $(1-p)^n$."
    >
      <Graph
        label="Cột đo được và cột đếm đúng của tổng hai xúc xắc"
        draw={(ctx, w, h) => {
          const { colors, map } = frame(ctx, w, h, 1, 13, 0, 0.2, "tổng", "tỉ lệ");
          for (let s = 2; s <= 12; s++) {
            const x0 = map.x(s - 0.4);
            const bw = map.x(s + 0.4) - x0;
            ctx.fillStyle = colors.curve;
            ctx.globalAlpha = 0.5;
            ctx.fillRect(x0, map.y(share(s)), bw, map.y(0) - map.y(share(s)));
            ctx.globalAlpha = 1;
            ctx.strokeStyle = colors.alt;
            ctx.lineWidth = 2;
            ctx.strokeRect(x0, map.y((exact[s] ?? 0) / 36), bw, map.y(0) - map.y((exact[s] ?? 0) / 36));
          }
        }}
      />
      <div className="fz-controls">
        <Slider label="p (xác suất một lần)" value={p} min={0.01} max={0.5} step={0.01} onChange={setP} />
        <Slider label="Số lần thử n" value={tries} min={1} max={60} step={1} onChange={setTries} />
      </div>
      <Buttons>
        <button type="button" className="text-btn" onClick={() => setRunning(!running)}>{running ? "Dừng" : "Tung xúc xắc"}</button>
        <button type="button" className="text-btn" onClick={() => { setRunning(false); setRng(() => mulberry32(freshSeed())); setTally({ counts: Array<number>(13).fill(0), throws: 0 }); }}>Xóa</button>
      </Buttons>
    </Stage>
  );
}

/* ---------- 15. Hệ hai phương trình: hai đường thẳng gặp nhau ---------- */

export function CramerLab() {
  const [a, setA] = useState(2);
  const [b, setB] = useState(1);
  const [c, setC] = useState(1);
  const [d, setD] = useState(-1);
  const [e, setE] = useState(5);
  const [f, setF] = useState(1);
  const sol = cramer(a, b, c, d, e, f);
  const D = a * d - b * c;
  return (
    <Stage
      title="Hai đường thẳng có cắt nhau không? Định thức trả lời"
      story="Mỗi phương trình bậc nhất hai ẩn là một đường thẳng. Giải hệ là hỏi hai đường thẳng gặp nhau ở đâu. Chỉ có ba khả năng: cắt tại một điểm, song song không gặp, hoặc trùng nhau. Con số D = ad − bc báo trước tình huống: khác 0 là cắt nhau đúng một điểm."
      read={`Hệ $${a}x+${b}y=${e}$ và $${c}x+${d}y=${f}$ có $D=${a}\\cdot${d}-${b}\\cdot${c}=${fmt(D)}$. ${sol ? `Nghiệm $x=${fmt(sol.x, 3)}$, $y=${fmt(sol.y, 3)}$.` : "D bằng 0: hai đường cùng hướng (song song hoặc trùng), không có đúng một nghiệm."}`}
      why="Khử y: nhân phương trình đầu với d, phương trình sau với b rồi trừ, được $(ad-bc)x=ed-bf$. Có chia được cho $ad-bc$ hay không quyết định mọi chuyện. Hình học: $ad-bc$ là diện tích hình bình hành dựng trên hai pháp tuyến, bằng 0 khi chúng cùng phương."
    >
      <Graph
        label="Hai đường thẳng và giao điểm"
        draw={(ctx, w, h) => {
          const { colors, map } = frame(ctx, w, h, -6, 6, -6, 6);
          const drawLine = (p: number, q: number, r: number, color: string) => {
            const pts: [number, number][] = [];
            if (Math.abs(q) > 1e-9) { for (const x of [-6, 6]) pts.push([x, (r - p * x) / q]); } else if (Math.abs(p) > 1e-9) { for (const y of [-6, 6]) pts.push([r / p, y]); }
            if (pts.length === 2) line(ctx, map.x((pts[0] as [number, number])[0]), map.y((pts[0] as [number, number])[1]), map.x((pts[1] as [number, number])[0]), map.y((pts[1] as [number, number])[1]), color, 2.4);
          };
          drawLine(a, b, e, colors.curve);
          drawLine(c, d, f, colors.alt);
          if (sol) dot(ctx, map.x(sol.x), map.y(sol.y), colors.ink, colors.bg, 6);
        }}
      />
      <div className="fz-controls">
        <Slider label="a" value={a} min={-4} max={4} step={1} onChange={setA} />
        <Slider label="b" value={b} min={-4} max={4} step={1} onChange={setB} />
        <Slider label="vế phải e" value={e} min={-6} max={6} step={1} onChange={setE} />
        <Slider label="c" value={c} min={-4} max={4} step={1} onChange={setC} />
        <Slider label="d" value={d} min={-4} max={4} step={1} onChange={setD} />
        <Slider label="vế phải f" value={f} min={-6} max={6} step={1} onChange={setF} />
      </div>
    </Stage>
  );
}

/* ---------- 16. Lãi kép và số e ---------- */

export function CompoundLab() {
  const [m, setM] = useState(4);
  const periods = Math.round(10 ** (m / 2));
  const value = compoundOne(periods);
  return (
    <Stage
      title="Chia nhỏ kì nhập lãi và số e"
      story="Gửi 1 đồng, lãi 100% một năm. Nếu nhập lãi một lần cuối năm bạn có 2 đồng. Nếu nhập lãi mỗi nửa năm, lãi của nửa năm đầu cũng sinh lãi và bạn có 2,25. Nhập lãi từng tháng, từng ngày, từng giây: số tiền cuối năm tăng nhưng chậm dần và không vượt quá một con số."
      read={`Chia năm thành ${periods} kì: $\\left(1+\\frac{1}{${periods}}\\right)^{${periods}}=${fmt(value, 6)}$. Số $e=${fmt(Math.E, 6)}$. Còn thiếu $${fmt(Math.E - value, 6)}$.`}
      why="Mỗi kì nhân thêm hệ số $1+\frac{1}{m}$, nên cả năm nhân $m$ lần. Dãy tăng và không vượt 3 nên có giới hạn, đặt tên là $e$. Cũng vì vậy hàm $e^x$ là hàm mà tốc độ tăng bằng chính nó: mỗi giây lãi sinh ra tỉ lệ với số tiền đang có."
    >
      <Graph
        label="Số tiền cuối năm theo số kì nhập lãi"
        draw={(ctx, w, h) => {
          const { colors, map, pad } = frame(ctx, w, h, 0, 6, 1.8, 2.9, "log10(số kì)", "tiền");
          strokeFn(ctx, map, w, h, pad, 0, 6, (x) => compoundOne(Math.max(1, Math.round(10 ** x))), colors.curve);
          dashed(ctx, map.x(0), map.y(Math.E), map.x(6), map.y(Math.E), colors.alt);
          dot(ctx, map.x(Math.log10(periods)), map.y(value), colors.alt, colors.bg, 6);
        }}
      />
      <div className="fz-controls">
        <Slider label="Số kì (10 mũ m/2)" value={m} min={0} max={12} step={1} onChange={setM} />
      </div>
    </Stage>
  );
}
