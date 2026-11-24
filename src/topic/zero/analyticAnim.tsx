import { lineCircle, lineRelation, sphereSliceRadius } from "../../algo/index.ts";
import { dashed, dot } from "../../labs/draw.ts";
import { Graph } from "../../labs/Graph.tsx";
import { fmt } from "../../lib/format.ts";
import { Slider } from "../../ui/Slider.tsx";
import { PlayButtons, useLoop, wave } from "./anim.tsx";
import { frame, label, line, useTx } from "./kit.ts";
import { Stage } from "./widgets.tsx";

const R = String.raw;

function drawFull(ctx: CanvasRenderingContext2D, map: { x: (v: number) => number; y: (v: number) => number }, a: number, b: number, c: number, color: string, lw = 2.4) {
  const lo = -12;
  const hi = 12;
  if (Math.abs(b) > 1e-9) line(ctx, map.x(lo), map.y(-(a * lo + c) / b), map.x(hi), map.y(-(a * hi + c) / b), color, lw);
  else if (Math.abs(a) > 1e-9) line(ctx, map.x(-c / a), map.y(lo), map.x(-c / a), map.y(hi), color, lw);
}

/* ---------- 1. Đường thẳng trượt qua đường tròn: 2 → 1 → 0 giao điểm ---------- */

export function LineSlideAnim() {
  const tt = useTx();
  const { phase, setPhase, running, setRunning } = useLoop(50, 0.004);
  const Rr = 3;
  const c = -7 + 14 * wave(phase);
  const res = lineCircle(1, 1, -c, 0, 0, Rr);
  const touch = Math.abs(res.d - Rr) < 0.05;
  const state = res.points.length === 2 && !touch ? tt("cắt tại hai điểm", "cuts at two points") : touch ? tt("tiếp xúc", "tangent") : tt("không giao nhau", "no common point");
  return (
    <Stage
      title={tt("Đường thẳng trượt qua đường tròn: số giao điểm đổi đúng lúc $d=R$", "A line sliding past a circle: the number of intersections changes exactly when $d=R$")}
      story={tt(
        R`Đường tròn $x^2+y^2=9$ (tâm $O$, $R=3$) và đường thẳng $x+y=c$ trượt song song với chính nó khi $c$ đổi. Khoảng cách từ tâm đến đường thẳng là $d=\frac{|c|}{\sqrt2}$. Khi $d<R$ đường thẳng cắt tại hai điểm, hai điểm ấy nhích lại gần nhau; đúng lúc $d=R$ chúng nhập làm một (tiếp xúc), rồi đường thẳng rời hẳn đường tròn.`,
        R`The circle $x^2+y^2=9$ (centre $O$, $R=3$) and the line $x+y=c$ slide parallel to itself as $c$ changes. The distance from the centre to the line is $d=\frac{|c|}{\sqrt2}$. When $d<R$ the line cuts at two points that move closer together; exactly when $d=R$ they merge into one (tangent), and then the line leaves the circle.`,
      )}
      read={tt(
        `$c=${fmt(c, 2)}$: $d=${fmt(res.d, 3)}$, $R=${fmt(Rr, 0)}$, nên ${state}. ${touch ? "Tiếp xúc ở $c=\\pm3\\sqrt2\\approx\\pm4{,}243$." : res.points.length === 2 ? `Hai giao điểm cách nhau $2\\sqrt{R^2-d^2}=${fmt(2 * Math.sqrt(Rr * Rr - res.d * res.d), 3)}$.` : ""}`,
        `$c=${fmt(c, 2)}$: $d=${fmt(res.d, 3)}$, $R=${fmt(Rr, 0)}$, so the line ${state}. ${touch ? "Tangency occurs at $c=\\pm3\\sqrt2\\approx\\pm4.243$." : res.points.length === 2 ? `The two points are $2\\sqrt{R^2-d^2}=${fmt(2 * Math.sqrt(Rr * Rr - res.d * res.d), 3)}$ apart.` : ""}`,
      )}
      why={tt(
        R`Thay điểm của đường thẳng vào đường tròn được một phương trình bậc hai theo tham số. Biệt thức của nó có dấu của $R^2-d^2$: hai nghiệm khi $d<R$, nghiệm kép khi $d=R$, vô nghiệm khi $d>R$. Cách nhìn hình học cho cùng kết quả: từ chân đường vuông góc, hai giao điểm nằm cách chân $\sqrt{R^2-d^2}$ về hai phía, và khoảng này co về $0$ khi $d\to R$.`,
        R`Substituting the points of the line into the circle gives a quadratic in the parameter. Its discriminant has the sign of $R^2-d^2$: two roots when $d<R$, a double root when $d=R$, none when $d>R$. The geometric view agrees: from the foot of the perpendicular the two points lie $\sqrt{R^2-d^2}$ away on either side, and this distance shrinks to $0$ as $d\to R$.`,
      )}
    >
      <Graph
        label={tt("Đường thẳng x + y = c trượt qua đường tròn bán kính 3", "The line x + y = c sliding past a circle of radius 3")}
        draw={(ctx, w, hh) => {
          const { colors, map } = frame(ctx, w, hh, -6, 6, -6, 6, "x", "y", true);
          ctx.beginPath();
          ctx.strokeStyle = colors.ink;
          ctx.lineWidth = 2.4;
          ctx.ellipse(map.x(0), map.y(0), map.x(Rr) - map.x(0), map.y(0) - map.y(Rr), 0, 0, Math.PI * 2);
          ctx.stroke();
          drawFull(ctx, map, 1, 1, -c, touch ? colors.ink : colors.alt);
          dashed(ctx, map.x(0), map.y(0), map.x(res.foot.x), map.y(res.foot.y), colors.soft);
          for (const p of res.points) dot(ctx, map.x(p.x), map.y(p.y), colors.alt, colors.bg, 6);
          label(ctx, `d = ${fmt(res.d, 2)}`, map.x(res.foot.x / 2) + 6, map.y(res.foot.y / 2), colors.soft);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Hằng số c", "Constant c")} value={c} min={-7} max={7} step={0.05} onChange={(v) => { setRunning(false); setPhase(Math.acos(1 - 2 * ((v + 7) / 14)) / (2 * Math.PI)); }} />
      </div>
      <PlayButtons running={running} setRunning={setRunning} tt={tt} />
    </Stage>
  );
}

/* ---------- 2. Đường thẳng quay: cắt rồi song song rồi lại cắt ---------- */

export function RotatingLineAnim() {
  const tt = useTx();
  const { phase, setPhase, running, setRunning } = useLoop(50, 0.004);
  const theta = Math.PI * (0.05 + 0.9 * phase);
  // Đường thứ hai qua (0;1) với pháp tuyến (cosθ; sinθ): cosθ·x + sinθ·y − sinθ = 0.
  const a2 = Math.cos(theta);
  const b2 = Math.sin(theta);
  const c2 = -b2;
  const D = 1 * b2 - a2 * -1;
  const kind = lineRelation(1, -1, 0, a2, b2, c2);
  const parallel = Math.abs(D) < 0.03;
  // Giao điểm của x − y = 0 và a2·x + b2·y + c2 = 0 (nghiệm x = y = −c2 / (a2 + b2)).
  const inter = parallel ? null : { x: -c2 / (a2 + b2), y: -c2 / (a2 + b2) };
  return (
    <Stage
      title={tt("Một đường thẳng quay: số giao điểm đổi khi định thức về 0", "A rotating line: the number of intersections changes when the determinant reaches 0")}
      story={tt(
        R`Đường thứ nhất cố định là $x-y=0$. Đường thứ hai đi qua điểm $(0;1)$ và quay quanh nó; pháp tuyến của nó là $(\cos\theta;\sin\theta)$. Phần lớn thời gian hai đường cắt nhau tại đúng một điểm (nó chạy dọc đường thứ nhất). Khi đường thứ hai quay tới cùng hướng với đường thứ nhất, hai đường song song và giao điểm biến mất.`,
        R`The first line is fixed: $x-y=0$. The second passes through the point $(0;1)$ and turns about it; its normal is $(\cos\theta;\sin\theta)$. Most of the time the two lines cross at exactly one point (which runs along the first line). When the second line turns to the same direction as the first, the lines are parallel and the intersection disappears.`,
      )}
      read={tt(
        `$\\theta=${fmt((theta * 180) / Math.PI, 0)}^\\circ$, định thức $D=a_1b_2-a_2b_1=${fmt(D, 3)}$. ${kind === "cat" && !parallel ? `Hai đường cắt nhau tại $(${fmt(inter!.x, 2)};${fmt(inter!.y, 2)})$.` : "$D$ gần $0$: hai đường song song, không có giao điểm."}`,
        `$\\theta=${fmt((theta * 180) / Math.PI, 0)}^\\circ$, determinant $D=a_1b_2-a_2b_1=${fmt(D, 3)}$. ${kind === "cat" && !parallel ? `The lines cross at $(${fmt(inter!.x, 2)};${fmt(inter!.y, 2)})$.` : "$D$ is close to $0$: the lines are parallel and there is no intersection."}`,
      )}
      why={tt(
        R`Hai đường cắt nhau đúng một điểm khi và chỉ khi $D=a_1b_2-a_2b_1\neq0$. Cách nhìn bằng hệ số góc cho cùng kết quả: hai đường cắt nhau khi độ dốc khác nhau, vì $k_1-k_2=\frac{a_2b_1-a_1b_2}{b_1b_2}$. Khi $D=0$ hai pháp tuyến cùng phương, nên hai đường song song hoặc trùng nhau; đường thứ hai không đi qua gốc nên chúng song song.`,
        R`Two lines meet in exactly one point if and only if $D=a_1b_2-a_2b_1\neq0$. The slope view gives the same result: the lines cross when their slopes differ, because $k_1-k_2=\frac{a_2b_1-a_1b_2}{b_1b_2}$. When $D=0$ the two normals are parallel, so the lines are parallel or coincide; the second line does not pass through the origin, so here they are parallel.`,
      )}
    >
      <Graph
        label={tt("Đường x − y = 0 và một đường quay quanh điểm (0;1)", "The line x − y = 0 and a line turning about the point (0;1)")}
        draw={(ctx, w, hh) => {
          const { colors, map } = frame(ctx, w, hh, -5, 5, -4, 6, "x", "y", true);
          drawFull(ctx, map, 1, -1, 0, colors.curve);
          drawFull(ctx, map, a2, b2, c2, parallel ? colors.ink : colors.alt);
          dot(ctx, map.x(0), map.y(1), colors.ink, colors.bg, 4);
          if (inter && Math.abs(inter.x) < 5 && Math.abs(inter.y) < 6) dot(ctx, map.x(inter.x), map.y(inter.y), colors.alt, colors.bg, 6);
          label(ctx, `D = ${fmt(D, 2)}`, map.x(-4.8), map.y(5.4), colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Góc θ (độ)", "Angle θ (degrees)")} value={(theta * 180) / Math.PI} min={9} max={171} step={1} onChange={(v) => { setRunning(false); setPhase(((v * Math.PI) / 180 / Math.PI - 0.05) / 0.9); }} />
      </div>
      <PlayButtons running={running} setRunning={setRunning} tt={tt} />
    </Stage>
  );
}

/* ---------- 3. Mặt phẳng cắt mặt cầu: đường tròn giao thu nhỏ ---------- */

export function SphereSliceAnim() {
  const tt = useTx();
  const { phase, setPhase, running, setRunning } = useLoop(50, 0.004);
  const Rr = 5;
  const d = -6 + 12 * wave(phase);
  const r = sphereSliceRadius(Rr, Math.abs(d));
  return (
    <Stage
      title={tt("Mặt phẳng quét qua mặt cầu: đường tròn giao thu nhỏ rồi biến mất", "A plane sweeping through a sphere: the circle of intersection shrinks and vanishes")}
      story={tt(
        R`Nhìn mặt cầu bán kính $R=5$ từ cạnh: đó là một đường tròn lớn. Mặt phẳng $z=d$ hiện ra như một đường nằm ngang. Nó cắt mặt cầu theo một đường tròn, hiện ở đây là đoạn thẳng có độ dài bằng đường kính của đường tròn giao. Khi mặt phẳng đi dần ra xa tâm, đường kính này co lại về $0$ đúng lúc $|d|=R$, rồi không còn giao.`,
        R`Look at a sphere of radius $R=5$ from the side: it is a great circle. The plane $z=d$ shows up as a horizontal line. It cuts the sphere in a circle, shown here as a segment as long as the diameter of that circle. As the plane moves away from the centre, this diameter shrinks to $0$ exactly when $|d|=R$, and then there is no intersection.`,
      )}
      read={tt(
        `$d=${fmt(d, 2)}$, $R=5$. ${r === null ? "$|d|>R$: mặt phẳng không giao mặt cầu." : r < 1e-6 ? "$|d|=R$: mặt phẳng tiếp xúc mặt cầu tại một điểm." : `Đường tròn giao có bán kính $r=\\sqrt{R^2-d^2}=${fmt(r, 3)}$.`}`,
        `$d=${fmt(d, 2)}$, $R=5$. ${r === null ? "$|d|>R$: the plane does not meet the sphere." : r < 1e-6 ? "$|d|=R$: the plane touches the sphere at one point." : `The circle of intersection has radius $r=\\sqrt{R^2-d^2}=${fmt(r, 3)}$.`}`,
      )}
      why={tt(
        R`Chọn hệ trục có gốc ở tâm mặt cầu và mặt phẳng là $z=d$. Mặt cầu là $x^2+y^2+z^2=R^2$, nên giao với mặt phẳng cho $x^2+y^2=R^2-d^2$. Đó là đường tròn bán kính $\sqrt{R^2-d^2}$ khi $|d|<R$, một điểm khi $|d|=R$, và rỗng khi $|d|>R$. Cách nhìn Pythagore cho cùng kết quả: $IN^2=d^2+HN^2$ với $H$ là hình chiếu của tâm.`,
        R`Choose axes with the origin at the centre of the sphere and the plane $z=d$. The sphere is $x^2+y^2+z^2=R^2$, so intersecting with the plane gives $x^2+y^2=R^2-d^2$. That is a circle of radius $\sqrt{R^2-d^2}$ when $|d|<R$, a point when $|d|=R$, and empty when $|d|>R$. The Pythagorean view agrees: $IN^2=d^2+HN^2$ with $H$ the projection of the centre.`,
      )}
    >
      <Graph
        label={tt("Mặt cầu nhìn từ cạnh và mặt phẳng nằm ngang z = d", "A sphere seen from the side and the horizontal plane z = d")}
        draw={(ctx, w, hh) => {
          const { colors, map } = frame(ctx, w, hh, -7, 7, -7, 7, "x", "z", true);
          ctx.beginPath();
          ctx.strokeStyle = colors.ink;
          ctx.lineWidth = 2.4;
          ctx.ellipse(map.x(0), map.y(0), map.x(Rr) - map.x(0), map.y(0) - map.y(Rr), 0, 0, Math.PI * 2);
          ctx.stroke();
          line(ctx, map.x(-7), map.y(d), map.x(7), map.y(d), colors.soft, 1.4);
          if (r !== null) {
            line(ctx, map.x(-r), map.y(d), map.x(r), map.y(d), colors.alt, 4);
            dot(ctx, map.x(0), map.y(d), colors.alt, colors.bg, 4);
            line(ctx, map.x(0), map.y(0), map.x(r), map.y(d), colors.curve, 1.6);
          }
          dot(ctx, map.x(0), map.y(0), colors.ink, colors.bg, 4);
          label(ctx, `d = ${fmt(d, 2)}`, map.x(-6.8), map.y(d) - 6, colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Khoảng cách d", "Distance d")} value={d} min={-6} max={6} step={0.05} onChange={(v) => { setRunning(false); setPhase(Math.acos(1 - 2 * ((v + 6) / 12)) / (2 * Math.PI)); }} />
      </div>
      <PlayButtons running={running} setRunning={setRunning} tt={tt} />
    </Stage>
  );
}
