import { classifyStationary, descend2D, hessian2D, taylorPartial } from "../../algo/index.ts";
import { Graph } from "../../labs/Graph.tsx";
import { strokeFn } from "../../labs/draw.ts";
import { fmt } from "../../lib/format.ts";
import { Slider } from "../../ui/Slider.tsx";
import { PlayButtons, useLoop } from "./anim.tsx";
import { frame, label, line, useTx } from "./kit.ts";
import { Stage } from "./widgets.tsx";

const R = String.raw;

/* ---------- 1. Đa thức Taylor bậc tăng dần bám đồ thị sin x ---------- */

export function TaylorGrowAnim() {
  const tt = useTx();
  const { phase, setPhase, running, setRunning } = useLoop(500, 0.12);
  const n = 1 + 2 * Math.floor(phase * 6);
  const x0 = 2.5;
  const err = Math.abs(taylorPartial("sin", x0, n) - Math.sin(x0));
  return (
    <Stage
      title={tt("Cộng thêm từng số hạng: đa thức Taylor bám đồ thị sin x ngày càng xa", "Adding one term at a time: the Taylor polynomial hugs the sine graph farther and farther")}
      story={tt(
        R`Đồ thị $y=\sin x$ (nét liền) và đa thức Taylor $T_n(x)=x-\frac{x^3}{6}+\frac{x^5}{120}-\cdots$ (nét cam) tại $0$. Bậc $1$ chỉ là tiếp tuyến. Mỗi lần thêm một số hạng bậc lẻ, đa thức bám sát đường cong trên một đoạn dài hơn. Ngoài đoạn đó nó vẫn bay đi rất xa.`,
        R`The graph $y=\sin x$ (solid) and the Taylor polynomial $T_n(x)=x-\frac{x^3}{6}+\frac{x^5}{120}-\cdots$ (orange) at $0$. Degree $1$ is just the tangent line. Each time an odd-degree term is added, the polynomial hugs the curve over a longer stretch. Outside that stretch it still flies far away.`,
      )}
      read={tt(
        `Bậc $n=${n}$. Tại $x=${fmt(x0, 1)}$: $T_n=${fmt(taylorPartial("sin", x0, n), 5)}$, $\\sin x=${fmt(Math.sin(x0), 5)}$, sai số $${fmt(err, 5)}$. Phần dư Lagrange chặn sai số bởi $\\frac{x^{${n + 1}}}{${n + 1}!}=${fmt(x0 ** (n + 1) / [...Array(n + 1).keys()].reduce((p, k) => p * (k + 1), 1), 5)}$.`,
        `Degree $n=${n}$. At $x=${fmt(x0, 1)}$: $T_n=${fmt(taylorPartial("sin", x0, n), 5)}$, $\\sin x=${fmt(Math.sin(x0), 5)}$, error $${fmt(err, 5)}$. The Lagrange remainder bounds the error by $\\frac{x^{${n + 1}}}{${n + 1}!}=${fmt(x0 ** (n + 1) / [...Array(n + 1).keys()].reduce((p, k) => p * (k + 1), 1), 5)}$.`,
      )}
      why={tt(
        R`Hệ số của $T_n$ được chọn để $T_n$ và $\sin x$ có cùng giá trị và cùng $n$ đạo hàm đầu tại $0$. Phần dư là $\frac{f^{(n+1)}(c)}{(n+1)!}x^{n+1}$ với $|f^{(n+1)}|\le1$, nên khi $n$ tăng, mẫu $(n+1)!$ lớn nhanh hơn tử $|x|^{n+1}$ và sai số tiến về $0$ với mọi $x$.`,
        R`The coefficients of $T_n$ are chosen so that $T_n$ and $\sin x$ share their value and first $n$ derivatives at $0$. The remainder is $\frac{f^{(n+1)}(c)}{(n+1)!}x^{n+1}$ with $|f^{(n+1)}|\le1$, so as $n$ grows the denominator $(n+1)!$ outgrows the numerator $|x|^{n+1}$ and the error tends to $0$ for every $x$.`,
      )}
    >
      <Graph
        label={tt("Đồ thị sin x và đa thức Taylor bậc n", "The graph of sin x and its degree-n Taylor polynomial")}
        draw={(ctx, w, hh) => {
          const { colors, map, pad } = frame(ctx, w, hh, -7, 7, -3, 3);
          strokeFn(ctx, map, w, hh, pad, -7, 7, Math.sin, colors.curve, 2.4);
          strokeFn(ctx, map, w, hh, pad, -7, 7, (x) => taylorPartial("sin", x, n), colors.alt, 2);
          line(ctx, map.x(x0), map.y(-3), map.x(x0), map.y(3), colors.soft, 1);
          label(ctx, `n = ${n}`, map.x(-6.8), map.y(2.6), colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Bậc của đa thức", "Degree of the polynomial")} value={n} min={1} max={13} step={2} onChange={(v) => { setRunning(false); setPhase((v - 1) / 12 + 0.001); }} />
      </div>
      <PlayButtons running={running} setRunning={setRunning} tt={tt} />
    </Stage>
  );
}

/* ---------- 2. Hạ gradient xuống thung lũng ---------- */

const grad = (x: number, y: number): [number, number] => [2 * x, 6 * y];
const height = (x: number, y: number) => x * x + 3 * y * y;

export function GradientDescentAnim() {
  const tt = useTx();
  const { phase, setPhase, running, setRunning } = useLoop(250, 0.04);
  const steps = Math.floor(phase * 25);
  const path = descend2D(grad, { x: 4, y: 2 }, 0.1, 25);
  const cur = path[steps]!;
  return (
    <Stage
      title={tt("Đi ngược gradient từng bước nhỏ: xuống tận đáy thung lũng", "Walking against the gradient in small steps: down to the bottom of the valley")}
      story={tt(
        R`Địa hình $f(x;y)=x^2+3y^2$ có các đường đồng mức là hình elip. Từ điểm $(4;2)$ ta tính gradient $\nabla f=(2x;6y)$, đi một đoạn ngược hướng đó, rồi tính lại. Mỗi bước vuông góc với đường đồng mức đang đứng, nên đường đi cắt các elip và cứ thế thu về tâm, nơi $f$ nhỏ nhất.`,
        R`The landscape $f(x;y)=x^2+3y^2$ has elliptical level curves. From the point $(4;2)$ we compute the gradient $\nabla f=(2x;6y)$, move a short step against it, and compute again. Each step is perpendicular to the level curve we stand on, so the path cuts across the ellipses and closes in on the centre, where $f$ is smallest.`,
      )}
      read={tt(
        `Sau ${steps} bước: $(x;y)=(${fmt(cur.x, 3)};${fmt(cur.y, 3)})$, $f=${fmt(height(cur.x, cur.y), 4)}$, $|\\nabla f|=${fmt(Math.hypot(...grad(cur.x, cur.y)), 3)}$. Bước học $\\eta=0{,}1$.`,
        `After ${steps} steps: $(x;y)=(${fmt(cur.x, 3)};${fmt(cur.y, 3)})$, $f=${fmt(height(cur.x, cur.y), 4)}$, $|\\nabla f|=${fmt(Math.hypot(...grad(cur.x, cur.y)), 3)}$. Learning rate $\\eta=0.1$.`,
      )}
      why={tt(
        R`Gradient chỉ hướng $f$ tăng nhanh nhất, nên $-\nabla f$ là hướng giảm nhanh nhất: với bước nhỏ, $f$ giảm khoảng $\eta|\nabla f|^2$ mỗi lần. Hệ số $y$ bị nhân $1-0{,}6=0{,}4$ và hệ số $x$ nhân $1-0{,}2=0{,}8$ mỗi bước, nên $y$ về $0$ trước. Nếu $\eta$ quá lớn, ví dụ $0{,}4$, thì $y$ bị nhân $-1{,}4$ và dao động xa dần.`,
        R`The gradient points where $f$ increases fastest, so $-\nabla f$ is the steepest descent: for small steps $f$ drops by about $\eta|\nabla f|^2$ each time. The $y$-coordinate is multiplied by $1-0.6=0.4$ and the $x$-coordinate by $1-0.2=0.8$ each step, so $y$ reaches $0$ first. If $\eta$ is too large, say $0.4$, $y$ is multiplied by $-1.4$ and oscillates ever farther.`,
      )}
    >
      <Graph
        label={tt("Các đường đồng mức elip và đường đi hạ gradient", "Elliptical level curves and the gradient descent path")}
        draw={(ctx, w, hh) => {
          const { colors, map } = frame(ctx, w, hh, -5, 5, -3, 3, "x", "y", true);
          for (const c of [1, 4, 9, 16, 25, 36]) {
            ctx.beginPath();
            ctx.strokeStyle = colors.soft;
            ctx.lineWidth = 1;
            for (let i = 0; i <= 120; i++) {
              const a = (2 * Math.PI * i) / 120;
              const px = map.x(Math.sqrt(c) * Math.cos(a));
              const py = map.y((Math.sqrt(c / 3)) * Math.sin(a));
              if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            }
            ctx.stroke();
          }
          for (let i = 0; i < steps; i++) line(ctx, map.x(path[i]!.x), map.y(path[i]!.y), map.x(path[i + 1]!.x), map.y(path[i + 1]!.y), colors.alt, 2);
          for (let i = 0; i <= steps; i++) {
            ctx.beginPath();
            ctx.fillStyle = i === steps ? colors.ink : colors.alt;
            ctx.arc(map.x(path[i]!.x), map.y(path[i]!.y), i === steps ? 5 : 3, 0, 2 * Math.PI);
            ctx.fill();
          }
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Số bước", "Number of steps")} value={steps} min={0} max={24} step={1} onChange={(v) => { setRunning(false); setPhase(v / 25 + 0.001); }} />
      </div>
      <PlayButtons running={running} setRunning={setRunning} tt={tt} />
    </Stage>
  );
}

/* ---------- 3. Điểm yên: lên theo hướng này, xuống theo hướng kia ---------- */

const saddle = (x: number, y: number) => x * x - y * y;

export function SaddleSweepAnim() {
  const tt = useTx();
  const { phase, setPhase, running, setRunning } = useLoop(60, 0.004);
  const angle = Math.PI * phase;
  const dx = Math.cos(angle);
  const dy = Math.sin(angle);
  const along = (t: number) => saddle(t * dx, t * dy);
  const h = hessian2D(saddle, 0, 0);
  const kind = classifyStationary(h.fxx, h.fyy, h.fxy);
  const curv = along(1);
  return (
    <Stage
      title={tt("Điểm yên: đạo hàm bằng 0 nhưng đi theo hướng khác nhau lại lên hoặc xuống", "A saddle point: the derivative is 0, yet other directions go up or down")}
      story={tt(
        R`Hàm $f(x;y)=x^2-y^2$ có $\nabla f=(2x;-2y)=(0;0)$ tại gốc. Ta đi qua gốc theo một đường thẳng có hướng quay dần từ $0^\circ$ tới $180^\circ$ và vẽ độ cao $f$ dọc đường đi. Theo hướng $x$ đường cong là parabol cực tiểu, theo hướng $y$ là parabol cực đại, và ở giữa có hướng cho đường phẳng.`,
        R`The function $f(x;y)=x^2-y^2$ has $\nabla f=(2x;-2y)=(0;0)$ at the origin. We cross the origin along a straight line whose direction turns from $0^\circ$ to $180^\circ$ and draw the height $f$ along the path. In the $x$ direction the curve is a minimum parabola, in the $y$ direction a maximum parabola, and in between there is a direction that gives a flat line.`,
      )}
      read={tt(
        `Hướng ${fmt((angle * 180) / Math.PI, 0)}°: độ cao dọc đường là $f(t)=${fmt(curv, 3)}\\,t^2$. ${curv > 0.05 ? "Hệ số dương: gốc là điểm thấp nhất theo hướng này." : curv < -0.05 ? "Hệ số âm: gốc là điểm cao nhất theo hướng này." : "Hệ số gần $0$: hướng phẳng, đường đồng mức đi qua gốc."} Hessian cho $D=${fmt(h.fxx * h.fyy - h.fxy ** 2, 2)}<0$, nên ${kind === "saddle" ? "gốc là điểm yên" : "chưa kết luận"}.`,
        `Direction ${fmt((angle * 180) / Math.PI, 0)}°: the height along the path is $f(t)=${fmt(curv, 3)}\\,t^2$. ${curv > 0.05 ? "Positive coefficient: the origin is the lowest point in this direction." : curv < -0.05 ? "Negative coefficient: the origin is the highest point in this direction." : "Coefficient near $0$: a flat direction, a level curve passes through the origin."} The Hessian gives $D=${fmt(h.fxx * h.fyy - h.fxy ** 2, 2)}<0$, so ${kind === "saddle" ? "the origin is a saddle point" : "no conclusion"}.`,
      )}
      why={tt(
        R`Dọc đường đi theo hướng $(\cos\alpha;\sin\alpha)$, $f(t\cos\alpha;t\sin\alpha)=t^2\cos2\alpha$. Hệ số $\cos2\alpha$ đổi dấu khi $\alpha$ đi qua $45^\circ$, nên có cả hướng đi lên lẫn hướng đi xuống. Điều đó khớp với $D=f_{xx}f_{yy}-f_{xy}^2=-4<0$: hai hệ số của dạng bậc hai trái dấu.`,
        R`Along the line in direction $(\cos\alpha;\sin\alpha)$, $f(t\cos\alpha;t\sin\alpha)=t^2\cos2\alpha$. The coefficient $\cos2\alpha$ changes sign as $\alpha$ passes $45^\circ$, so there are both upward and downward directions. This matches $D=f_{xx}f_{yy}-f_{xy}^2=-4<0$: the two coefficients of the quadratic form have opposite signs.`,
      )}
    >
      <Graph
        label={tt("Độ cao f dọc đường thẳng đi qua gốc theo hướng đang chọn", "The height f along a line through the origin in the chosen direction")}
        draw={(ctx, w, hh) => {
          const { colors, map, pad } = frame(ctx, w, hh, -2, 2, -4, 4, "t", "f");
          strokeFn(ctx, map, w, hh, pad, -2, 2, along, curv >= 0 ? colors.curve : colors.alt, 2.4);
          label(ctx, `α = ${fmt((angle * 180) / Math.PI, 0)}°`, map.x(-1.9), map.y(3.5), colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Hướng đi (độ)", "Direction (degrees)")} value={phase * 180} min={0} max={179.5} step={0.5} onChange={(v) => { setRunning(false); setPhase(v / 180); }} />
      </div>
      <PlayButtons running={running} setRunning={setRunning} tt={tt} />
    </Stage>
  );
}
