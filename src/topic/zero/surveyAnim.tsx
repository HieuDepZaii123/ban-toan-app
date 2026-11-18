import { centralSlope, countSolutions, criticalPoints } from "../../algo/index.ts";
import { dashed, dot, strokeFn } from "../../labs/draw.ts";
import { Graph } from "../../labs/Graph.tsx";
import { fmt } from "../../lib/format.ts";
import { Slider } from "../../ui/Slider.tsx";
import { PlayButtons, useLoop, wave } from "./anim.tsx";
import { frame, label, line, useTx } from "./kit.ts";
import { Stage } from "./widgets.tsx";

const R = String.raw;
const cubic = (x: number) => x ** 3 - 3 * x;

/* ---------- 1. Tiếp tuyến chạy dọc đồ thị: độ dốc đổi dấu ---------- */

export function TangentRunAnim() {
  const tt = useTx();
  const { phase, setPhase, running, setRunning } = useLoop(50, 0.005);
  const x0 = -2.2 + 4.4 * phase;
  const y0 = cubic(x0);
  const slope = centralSlope(cubic, x0);
  const state = Math.abs(slope) < 0.15 ? tt("gần như nằm ngang: sắp tới chỗ quay đầu", "almost flat: a turning point is near") : slope > 0 ? tt("dốc lên: hàm đang tăng", "slanting up: the function is increasing") : tt("dốc xuống: hàm đang giảm", "slanting down: the function is decreasing");
  return (
    <Stage
      title={tt("Cho tiếp tuyến chạy dọc đồ thị: dấu độ dốc cho biết chiều đi", "Let a tangent run along the graph: the sign of its slope tells the direction")}
      story={tt(
        R`Xét $y=x^3-3x$. Một điểm chạy từ trái sang phải, tại mỗi chỗ máy dựng tiếp tuyến và đo độ dốc bằng hiệu hai điểm rất gần nhau. Đường cong đang đi lên thì tiếp tuyến dốc lên, đi xuống thì dốc xuống. Ở chỗ đồ thị quay đầu, tiếp tuyến nằm ngang: độ dốc bằng $0$. Hai chỗ như vậy chia đồ thị thành ba đoạn tăng, giảm, tăng.`,
        R`Consider $y=x^3-3x$. A point runs from left to right, and at each place the machine draws the tangent and measures its slope from two very close points. Where the curve goes up the tangent slants up, where it goes down the tangent slants down. At a turning point the tangent is horizontal: the slope is $0$. Two such places split the graph into three stretches: increasing, decreasing, increasing.`,
      )}
      read={tt(
        `Tại $x=${fmt(x0, 3)}$: $y=${fmt(y0, 3)}$, độ dốc đo được $${fmt(slope, 3)}$; công thức $y'=3x^2-3$ cho $${fmt(3 * x0 * x0 - 3, 3)}$. Tiếp tuyến ${state}.`,
        `At $x=${fmt(x0, 3)}$: $y=${fmt(y0, 3)}$, measured slope $${fmt(slope, 3)}$; the formula $y'=3x^2-3$ gives $${fmt(3 * x0 * x0 - 3, 3)}$. The tangent is ${state}.`,
      )}
      why={tt(
        R`Độ dốc của tiếp tuyến chính là $y'$. Dấu của $y'$ cho chiều biến thiên: dương thì hàm tăng, âm thì hàm giảm. Cực trị chỉ có thể nằm ở chỗ $y'=0$, nhưng chưa chắc: phải xem $y'$ có đổi dấu khi đi qua chỗ đó không, như hai điểm $x=\pm 1$ ở đây.`,
        R`The slope of the tangent is $y'$. The sign of $y'$ gives the direction: positive means increasing, negative means decreasing. An extremum can only sit where $y'=0$, but not necessarily: we must check whether $y'$ changes sign there, as at the two points $x=\pm 1$ here.`,
      )}
    >
      <Graph
        label={tt("Đồ thị y = x³ − 3x và tiếp tuyến tại điểm đang chạy", "The graph y = x³ − 3x and the tangent at the moving point")}
        draw={(ctx, w, hh) => {
          const { colors, map, pad } = frame(ctx, w, hh, -2.5, 2.5, -4, 4);
          strokeFn(ctx, map, w, hh, pad, -2.5, 2.5, cubic, colors.curve, 2.4);
          const xa = x0 - 1;
          const xb = x0 + 1;
          line(ctx, map.x(xa), map.y(y0 + slope * (xa - x0)), map.x(xb), map.y(y0 + slope * (xb - x0)), Math.abs(slope) < 0.15 ? colors.ink : slope > 0 ? colors.alt : colors.soft, 2.4);
          dot(ctx, map.x(x0), map.y(y0), colors.alt, colors.bg, 6);
          label(ctx, `y' = ${fmt(slope, 2)}`, map.x(-2.4), map.y(3.4), colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Vị trí điểm", "Position of the point")} value={phase} min={0} max={0.999} step={0.005} onChange={(v) => { setRunning(false); setPhase(v); }} />
      </div>
      <PlayButtons running={running} setRunning={setRunning} tt={tt} />
    </Stage>
  );
}

/* ---------- 2. Đường ngang quét lên xuống: đếm giao điểm ---------- */

export function HorizontalSweepAnim() {
  const tt = useTx();
  const { phase, setPhase, running, setRunning } = useLoop(50, 0.005);
  const m = -3.6 + 7.2 * wave(phase);
  const n = countSolutions(cubic, m, -4, 4);
  const roots = rootsAt(m);
  return (
    <Stage
      title={tt("Đường ngang y = m quét lên xuống: số giao điểm đổi theo m", "A horizontal line y = m sweeping up and down: the number of intersections changes with m")}
      story={tt(
        R`Số nghiệm của $x^3-3x=m$ là số giao điểm của đồ thị với đường ngang $y=m$. Cho $m$ chạy lên xuống: ở dưới đáy hay ở trên đỉnh, đường ngang chỉ cắt một lần. Khi lên tới giữa hai mức cực trị, nó cắt ba lần. Số giao điểm đổi đúng ở hai mức $m=\pm 2$, tức là hai giá trị cực trị.`,
        R`The number of solutions of $x^3-3x=m$ is the number of intersections of the graph with the horizontal line $y=m$. Let $m$ run up and down: below the bottom or above the top, the line meets the graph once. Between the two extreme values it meets it three times. The number changes exactly at $m=\pm 2$, the two extreme values.`,
      )}
      read={tt(
        `$m=${fmt(m, 2)}$: máy đếm được ${n} giao điểm${roots.length ? `, tại $x=${roots.map((r) => fmt(r, 3)).join(";\\ ")}$` : ""}. Hai giá trị cực trị là $y(-1)=2$ và $y(1)=-2$.`,
        `$m=${fmt(m, 2)}$: the machine counts ${n} intersection${n === 1 ? "" : "s"}${roots.length ? `, at $x=${roots.map((r) => fmt(r, 3)).join(";\\ ")}$` : ""}. The two extreme values are $y(-1)=2$ and $y(1)=-2$.`,
      )}
      why={tt(
        R`Trên mỗi đoạn đơn điệu của đồ thị, mỗi mức $m$ trong khoảng giá trị của đoạn đó được đạt đúng một lần. Đồ thị có ba đoạn đơn điệu, nên số nghiệm là số đoạn mà $m$ nằm trong khoảng giá trị của chúng: $|m|<2$ thì cả ba, $|m|>2$ thì chỉ một (riêng $m=\pm 2$, hai đoạn chung một đầu mút nên chỉ có hai nghiệm). Vì thế bài toán «tìm $m$ để phương trình có ba nghiệm» là bài toán về hai giá trị cực trị.`,
        R`On each monotonic stretch of the graph, every level $m$ in that stretch's range of values is reached exactly once. The graph has three monotonic stretches, so the number of solutions is the number of stretches whose range contains $m$: all three when $|m|<2$, only one when $|m|>2$ (except $m=\pm 2$: two stretches share an endpoint, so only two solutions). That is why «find $m$ so that the equation has three roots» is a question about the two extreme values.`,
      )}
    >
      <Graph
        label={tt("Đồ thị y = x³ − 3x và đường ngang y = m", "The graph y = x³ − 3x and the horizontal line y = m")}
        draw={(ctx, w, hh) => {
          const { colors, map, pad } = frame(ctx, w, hh, -2.6, 2.6, -4, 4);
          strokeFn(ctx, map, w, hh, pad, -2.6, 2.6, cubic, colors.curve, 2.4);
          line(ctx, map.x(-2.6), map.y(m), map.x(2.6), map.y(m), colors.alt, 2);
          for (const r of roots) dot(ctx, map.x(r), map.y(m), colors.ink, colors.bg, 6);
          dashed(ctx, map.x(-2.6), map.y(2), map.x(2.6), map.y(2), colors.soft);
          dashed(ctx, map.x(-2.6), map.y(-2), map.x(2.6), map.y(-2), colors.soft);
          label(ctx, `m = ${fmt(m, 2)}  (${n})`, map.x(-2.5), map.y(m) - 8, colors.alt);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Mức m", "Level m")} value={phase} min={0} max={0.999} step={0.005} onChange={(v) => { setRunning(false); setPhase(v); }} />
      </div>
      <PlayButtons running={running} setRunning={setRunning} tt={tt} />
    </Stage>
  );
}

/** Các hoành độ giao điểm của x³ − 3x = m, tìm bằng cách quét đổi dấu (không dùng công thức nghiệm). */
function rootsAt(m: number): number[] {
  const out: number[] = [];
  const N = 2400;
  let prev = cubic(-4) - m;
  for (let i = 1; i <= N; i++) {
    const x = -4 + (8 * i) / N;
    const cur = cubic(x) - m;
    if (prev === 0 || prev * cur < 0) {
      let lo = x - 8 / N;
      let hi = x;
      for (let k = 0; k < 50; k++) {
        const mid = (lo + hi) / 2;
        if ((cubic(lo) - m) * (cubic(mid) - m) <= 0) hi = mid;
        else lo = mid;
      }
      out.push((lo + hi) / 2);
    }
    prev = cur;
  }
  return out;
}

/* ---------- 3. Tham số k làm hai cực trị hợp lại rồi biến mất ---------- */

export function VanishingExtremaAnim() {
  const tt = useTx();
  const { phase, setPhase, running, setRunning } = useLoop(60, 0.005);
  const k = 1.2 - 2.4 * wave(phase);
  const f = (x: number) => x ** 3 - 3 * k * x;
  const crit = criticalPoints(f, -3, 3);
  const disc = 9 * k;
  return (
    <Stage
      title={tt("Hai cực trị xích lại, hợp làm một rồi biến mất", "Two extrema approach, merge into one and disappear")}
      story={tt(
        R`Xét $y=x^3-3kx$ với tham số $k$ đang trượt. Khi $k>0$, đồ thị có một đỉnh đồi và một đáy. Cho $k$ nhỏ dần, hai chỗ quay đầu xích lại gần nhau; đến $k=0$ chúng chập thành một chỗ mà đồ thị chỉ «ngưng» một thoáng rồi đi tiếp. Khi $k<0$ đồ thị tăng suốt, không còn chỗ quay đầu nào.`,
        R`Consider $y=x^3-3kx$ with the parameter $k$ sliding. When $k>0$ the graph has one hilltop and one bottom. As $k$ shrinks the two turning points approach each other; at $k=0$ they merge into one place where the graph only «pauses» for a moment and goes on. When $k<0$ the graph increases all the way, with no turning point left.`,
      )}
      read={tt(
        `$k=${fmt(k, 2)}$: $\\Delta'=b^2-3ac=${fmt(disc, 2)}$; máy tìm được ${crit.length} cực trị${crit.length ? `, tại $x=${crit.map((c) => fmt(c.x, 3)).join(";\\ ")}$` : ""}.`,
        `$k=${fmt(k, 2)}$: $\\Delta'=b^2-3ac=${fmt(disc, 2)}$; the machine finds ${crit.length} extremum point${crit.length === 1 ? "" : "s"}${crit.length ? `, at $x=${crit.map((c) => fmt(c.x, 3)).join(";\\ ")}$` : ""}.`,
      )}
      why={tt(
        R`$y'=3x^2-3k$ là tam thức bậc hai theo $x$, có biệt thức thu gọn $\Delta'=b^2-3ac$, với $a=1$, $b=0$, $c=-3k$ là các hệ số của $y=ax^3+bx^2+cx+d$, tức $\Delta'=9k$. Khi $\Delta'>0$, $y'$ có hai nghiệm và đổi dấu qua từng nghiệm: hai cực trị. Khi $\Delta'\le 0$, $y'$ không đổi dấu: hàm đơn điệu, không có cực trị.`,
        R`$y'=3x^2-3k$ is a quadratic in $x$ with reduced discriminant $\Delta'=b^2-3ac$, where $a=1$, $b=0$, $c=-3k$ are the coefficients of $y=ax^3+bx^2+cx+d$, which gives $9k$. When $\Delta'>0$, $y'$ has two roots and changes sign at each: two extrema. When $\Delta'\le 0$, $y'$ does not change sign: the function is monotonic, with no extremum.`,
      )}
    >
      <Graph
        label={tt("Đồ thị y = x³ − 3kx khi k thay đổi", "The graph y = x³ − 3kx as k changes")}
        draw={(ctx, w, hh) => {
          const { colors, map, pad } = frame(ctx, w, hh, -2.6, 2.6, -5, 5);
          strokeFn(ctx, map, w, hh, pad, -2.6, 2.6, f, colors.curve, 2.4);
          for (const c of crit) {
            dot(ctx, map.x(c.x), map.y(c.y), c.kind === "max" ? colors.alt : colors.ink, colors.bg, 6);
            dashed(ctx, map.x(c.x), map.y(0), map.x(c.x), map.y(c.y), colors.soft);
          }
          label(ctx, `k = ${fmt(k, 2)}  ·  ${crit.length} ${tt("cực trị", "extrema")}`, map.x(-2.5), map.y(4.4), colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Tham số k", "Parameter k")} value={phase} min={0} max={0.999} step={0.005} onChange={(v) => { setRunning(false); setPhase(v); }} />
      </div>
      <PlayButtons running={running} setRunning={setRunning} tt={tt} />
    </Stage>
  );
}
