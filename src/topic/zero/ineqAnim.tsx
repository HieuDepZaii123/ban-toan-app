import { cauchyQuadratic, meanChainAround, semicircleHeight, squaresVsRectangles, vectorSumLength } from "../../algo/index.ts";
import { dashed, dot } from "../../labs/draw.ts";
import { Graph } from "../../labs/Graph.tsx";
import { fmt } from "../../lib/format.ts";
import { Slider } from "../../ui/Slider.tsx";
import { PlayButtons, useLoop, wave } from "./anim.tsx";
import { frame, label, line, useTx } from "./kit.ts";
import { Stage } from "./widgets.tsx";

const R = String.raw;

/* ---------- 1. Hai hình vuông phủ hai hình chữ nhật ---------- */

export function SquaresRectsAnim() {
  const tt = useTx();
  const { phase, setPhase, running, setRunning } = useLoop();
  const a = 6;
  const b = 0.8 + 5.2 * wave(phase);
  const q = squaresVsRectangles(a, b);
  return (
    <Stage
      title={tt("Hai hình vuông luôn phủ được hai hình chữ nhật", "Two squares always cover two rectangles")}
      story={tt(
        R`Xếp hình vuông cạnh $a$ và hình vuông cạnh $b$ vào hai góc đối nhau của một hình vuông lớn cạnh $a+b$. Hai góc còn lại là hai hình chữ nhật $a\times b$. Cạnh $b$ tự co giãn: khi $b$ càng gần $a$, phần các hình vuông trội hơn các hình chữ nhật càng mỏng. Đến lúc $b=a$ thì bốn mảnh bằng nhau, và phần trội biến mất: đó là dấu bằng.`,
        R`Place a square of side $a$ and a square of side $b$ in two opposite corners of a big square of side $a+b$. The two remaining corners are two $a\times b$ rectangles. Side $b$ grows and shrinks on its own: the closer $b$ gets to $a$, the thinner the surplus of the squares over the rectangles. When $b=a$ the four pieces are equal and the surplus vanishes: that is the equality case.`,
      )}
      read={tt(
        `$a=${fmt(a)}$, $b=${fmt(b, 2)}$: hai hình vuông $a^2+b^2=${fmt(q.squares, 3)}$, hai hình chữ nhật $2ab=${fmt(q.rectangles, 3)}$, phần trội $(a-b)^2=${fmt(q.excess, 3)}$.`,
        `$a=${fmt(a)}$, $b=${fmt(b, 2)}$: the two squares $a^2+b^2=${fmt(q.squares, 3)}$, the two rectangles $2ab=${fmt(q.rectangles, 3)}$, the surplus $(a-b)^2=${fmt(q.excess, 3)}$.`,
      )}
      why={tt(
        R`Diện tích hình vuông lớn là $(a+b)^2=a^2+b^2+2ab$. Hai hình vuông nhỏ có diện tích $a^2+b^2$, hai hình chữ nhật có $2ab$. Hiệu của chúng là $a^2+b^2-2ab=(a-b)^2$, là diện tích của một hình vuông nên không âm. Vì thế $a^2+b^2\ge 2ab$, và bằng nhau chỉ khi $a=b$.`,
        R`The big square has area $(a+b)^2=a^2+b^2+2ab$. The two small squares have area $a^2+b^2$ and the two rectangles have $2ab$. Their difference is $a^2+b^2-2ab=(a-b)^2$, the area of a square, so it is not negative. Hence $a^2+b^2\ge 2ab$, with equality only when $a=b$.`,
      )}
    >
      <Graph
        label={tt("Hình vuông cạnh a + b chia thành hai hình vuông và hai hình chữ nhật", "A square of side a + b split into two squares and two rectangles")}
        draw={(ctx, w, h) => {
          const total = a + b;
          const { colors, map } = frame(ctx, w, h, -0.5, 12.5, -0.5, 12.5, "", "", true);
          const rect = (x0: number, y0: number, x1: number, y1: number, fill: string, text: string) => {
            ctx.save();
            ctx.globalAlpha = 0.35;
            ctx.fillStyle = fill;
            ctx.fillRect(map.x(x0), map.y(y1), map.x(x1) - map.x(x0), map.y(y0) - map.y(y1));
            ctx.restore();
            ctx.strokeStyle = colors.ink;
            ctx.lineWidth = 1.4;
            ctx.strokeRect(map.x(x0), map.y(y1), map.x(x1) - map.x(x0), map.y(y0) - map.y(y1));
            label(ctx, text, map.x((x0 + x1) / 2) - 16, map.y((y0 + y1) / 2) + 4, colors.ink);
          };
          rect(0, 0, a, a, colors.curve, "a²");
          rect(a, a, total, total, colors.alt, "b²");
          rect(a, 0, total, a, colors.soft, "ab");
          rect(0, a, a, total, colors.soft, "ab");
          label(ctx, `(a−b)² = ${fmt(q.excess, 2)}`, map.x(0.2), map.y(12), colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Pha chuyển động", "Animation phase")} value={phase} min={0} max={0.999} step={0.005} onChange={(v) => { setRunning(false); setPhase(v); }} />
      </div>
      <PlayButtons running={running} setRunning={setRunning} tt={tt} />
    </Stage>
  );
}

/* ---------- 2. Điểm nối trượt trên đường kính của nửa đường tròn ---------- */

export function SweepSemicircleAnim() {
  const tt = useTx();
  const { phase, setPhase, running, setRunning } = useLoop();
  const D = 10;
  const a = 0.6 + (D - 1.2) * wave(phase);
  const b = D - a;
  const h = semicircleHeight(a, b);
  const r = D / 2;
  const equal = Math.abs(a - b) < 0.15;
  return (
    <Stage
      title={tt("Điểm nối trượt: dây vuông góc chạm bán kính ở chính giữa", "A sliding joint: the perpendicular reaches the radius at the centre")}
      story={tt(
        R`Giữ nguyên đường kính $a+b=10$ và cho điểm chia nó thành $a$ và $b$ trượt qua lại. Đoạn vuông góc dựng từ điểm chia lên nửa đường tròn có độ dài $\sqrt{ab}$. Nhìn nó lên xuống: lúc nào cũng thấp hơn bán kính (đoạn nét đứt), và chỉ đạt bằng bán kính khi điểm chia ở đúng tâm, tức $a=b$.`,
        R`Keep the diameter $a+b=10$ and let the point that splits it into $a$ and $b$ slide back and forth. The perpendicular raised from the split point up to the semicircle has length $\sqrt{ab}$. Watch it rise and fall: it is always lower than the radius (the dashed segment) and equals the radius only when the point sits exactly at the centre, that is $a=b$.`,
      )}
      read={tt(
        `$a=${fmt(a, 2)}$, $b=${fmt(b, 2)}$: dây vuông góc $\\sqrt{ab}=${fmt(h, 3)}$, bán kính $\\frac{a+b}{2}=${fmt(r)}$. ${equal ? "Hai độ dài gần như bằng nhau: sắp tới dấu bằng." : `Còn thiếu $${fmt(r - h, 3)}$ mới bằng bán kính.`}`,
        `$a=${fmt(a, 2)}$, $b=${fmt(b, 2)}$: perpendicular $\\sqrt{ab}=${fmt(h, 3)}$, radius $\\frac{a+b}{2}=${fmt(r)}$. ${equal ? "The two lengths are almost equal: the equality case is near." : `It is still $${fmt(r - h, 3)}$ short of the radius.`}`,
      )}
      why={tt(
        R`Điểm chia nằm trên đường kính, nên khoảng cách từ nó tới tâm là $|a-r|$ với $r=\frac{a+b}{2}$. Theo Pythagore trong tam giác vuông tâm, chân dây, điểm trên đường tròn: $h^2=r^2-(a-r)^2=ab$. Vì $(a-r)^2\ge 0$ nên $h\le r$, tức $\sqrt{ab}\le\frac{a+b}{2}$, và bằng nhau chỉ khi $a=r$.`,
        R`The split point lies on the diameter, so its distance from the centre is $|a-r|$ with $r=\frac{a+b}{2}$. By Pythagoras in the right triangle centre, foot, point on the circle: $h^2=r^2-(a-r)^2=ab$. Since $(a-r)^2\ge 0$ we get $h\le r$, that is $\sqrt{ab}\le\frac{a+b}{2}$, with equality only when $a=r$.`,
      )}
    >
      <Graph
        label={tt("Nửa đường tròn đường kính 10 và điểm nối đang trượt", "A semicircle of diameter 10 with a sliding joint")}
        draw={(ctx, w, hh) => {
          const { colors, map } = frame(ctx, w, hh, -0.8, D + 0.8, -1, r + 1.2, "", "", true);
          ctx.beginPath();
          ctx.strokeStyle = colors.ink;
          ctx.lineWidth = 2;
          ctx.arc(map.x(r), map.y(0), map.x(r) - map.x(0), Math.PI, 0);
          ctx.stroke();
          line(ctx, map.x(0), map.y(0), map.x(a), map.y(0), colors.curve, 5);
          line(ctx, map.x(a), map.y(0), map.x(D), map.y(0), colors.alt, 5);
          dashed(ctx, map.x(r), map.y(0), map.x(r), map.y(r), colors.soft);
          line(ctx, map.x(a), map.y(0), map.x(a), map.y(h), equal ? colors.alt : colors.curve, 3);
          dot(ctx, map.x(a), map.y(h), colors.curve, colors.bg, 6);
          label(ctx, `√(ab) = ${fmt(h, 2)}`, map.x(a) + 8, map.y(h / 2), colors.curve);
          label(ctx, `r = ${fmt(r)}`, map.x(r) + 8, map.y(r) - 4, colors.soft);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Vị trí điểm nối", "Position of the joint")} value={phase} min={0} max={0.999} step={0.005} onChange={(v) => { setRunning(false); setPhase(v); }} />
      </div>
      <PlayButtons running={running} setRunning={setRunning} tt={tt} />
    </Stage>
  );
}

/* ---------- 3. Tam thức (at − x)² + (bt − y)² không bao giờ âm ---------- */

export function CauchyQuadraticAnim() {
  const tt = useTx();
  const { phase, setPhase, running, setRunning } = useLoop(60, 0.008);
  const a = 3;
  const b = 1;
  const len = 4;
  const aim = Math.atan2(b, a);
  const angle = aim + (phase * 2 - 1) * Math.PI * 0.45;
  const x = len * Math.cos(angle);
  const y = len * Math.sin(angle);
  const cq = cauchyQuadratic(a, b, x, y);
  const parallel = cq.minValue < 0.02;
  return (
    <Stage
      title={tt("Tam thức không bao giờ âm, nên biệt thức không dương", "A quadratic that is never negative, so its discriminant is not positive")}
      story={tt(
        R`Với hai cặp số $(a;b)$ và $(x;y)$, xét $g(t)=(at-x)^2+(bt-y)^2$: tổng hai bình phương nên đồ thị luôn nằm trên trục hoành. Ta xoay cặp $(x;y)$ quanh gốc. Khi nó lệch khỏi hướng của $(a;b)$, đáy parabol nâng lên khỏi trục; khi hai cặp tỉ lệ nhau, đáy chạm đúng trục hoành.`,
        R`For two pairs of numbers $(a;b)$ and $(x;y)$ consider $g(t)=(at-x)^2+(bt-y)^2$: a sum of two squares, so its graph always stays above the horizontal axis. We rotate the pair $(x;y)$ around the origin. When it turns away from the direction of $(a;b)$ the bottom of the parabola lifts off the axis; when the two pairs are proportional the bottom touches the axis exactly.`,
      )}
      read={tt(
        `$(a;b)=(${fmt(a)};${fmt(b)})$, $(x;y)=(${fmt(x, 2)};${fmt(y, 2)})$. Đáy tại $t=${fmt(cq.tMin, 3)}$ có giá trị $${fmt(cq.minValue, 4)}\\ge 0$. Biệt thức $\\Delta'=${fmt(cq.discriminant, 3)}\\le 0$. ${parallel ? "Hai cặp gần tỉ lệ: đáy gần chạm trục." : ""}`,
        `$(a;b)=(${fmt(a)};${fmt(b)})$, $(x;y)=(${fmt(x, 2)};${fmt(y, 2)})$. The bottom at $t=${fmt(cq.tMin, 3)}$ has value $${fmt(cq.minValue, 4)}\\ge 0$. Discriminant $\\Delta'=${fmt(cq.discriminant, 3)}\\le 0$. ${parallel ? "The pairs are almost proportional: the bottom nearly touches the axis." : ""}`,
      )}
      why={tt(
        R`Khai triển $g(t)=(a^2+b^2)t^2-2(ax+by)t+(x^2+y^2)$ (với $(a;b)\neq(0;0)$, nếu không thì bất đẳng thức là $0\le 0$). Vì $g(t)\ge 0$ với mọi $t$ nên đồ thị không cắt trục tại hai điểm, tức biệt thức thu gọn không dương: $(ax+by)^2-(a^2+b^2)(x^2+y^2)\le 0$. Chuyển vế được $(ax+by)^2\le(a^2+b^2)(x^2+y^2)$. Dấu bằng khi đáy chạm trục, tức $g(t)=0$ có nghiệm, khi $(x;y)$ tỉ lệ với $(a;b)$.`,
        R`Expand $g(t)=(a^2+b^2)t^2-2(ax+by)t+(x^2+y^2)$ (with $(a;b)\neq(0;0)$, otherwise the inequality reads $0\le 0$). Since $g(t)\ge 0$ for every $t$, the graph never crosses the axis in two points, so the reduced discriminant is not positive: $(ax+by)^2-(a^2+b^2)(x^2+y^2)\le 0$. Moving a term across gives $(ax+by)^2\le(a^2+b^2)(x^2+y^2)$. Equality holds when the bottom touches the axis, that is when $g(t)=0$ has a root, when $(x;y)$ is proportional to $(a;b)$.`,
      )}
    >
      <Graph
        label={tt("Đồ thị tam thức g(t) và đáy của nó", "The graph of the quadratic g(t) and its bottom")}
        draw={(ctx, w, hh) => {
          const { colors, map } = frame(ctx, w, hh, -1, 4, -2, 20, "t", "g");
          ctx.beginPath();
          ctx.strokeStyle = colors.curve;
          ctx.lineWidth = 2.4;
          for (let i = 0; i <= 200; i++) {
            const t = -1 + (5 * i) / 200;
            const px = map.x(t);
            const py = map.y(cq.g(t));
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.stroke();
          dashed(ctx, map.x(cq.tMin), map.y(0), map.x(cq.tMin), map.y(cq.minValue), colors.soft);
          dot(ctx, map.x(cq.tMin), map.y(cq.minValue), colors.alt, colors.bg, 6);
          label(ctx, `min = ${fmt(cq.minValue, 2)}`, map.x(cq.tMin) + 8, map.y(cq.minValue) - 8, colors.alt);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Hướng của (x; y)", "Direction of (x; y)")} value={phase} min={0} max={0.999} step={0.005} onChange={(v) => { setRunning(false); setPhase(v); }} />
      </div>
      <PlayButtons running={running} setRunning={setRunning} tt={tt} />
    </Stage>
  );
}

/* ---------- 4. Bốn trung bình dồn về một ---------- */

export function FourMeansAnim() {
  const tt = useTx();
  const { phase, setPhase, running, setRunning } = useLoop();
  const m = 5;
  const d = 4 * Math.abs(Math.cos(Math.PI * phase));
  const c = meanChainAround(m, d);
  return (
    <Stage
      title={tt("Bốn loại trung bình dồn về một khi hai số xích lại gần nhau", "Four kinds of mean merge into one as the two numbers approach")}
      story={tt(
        R`Cho $a=m+d$ và $b=m-d$, tức hai số cách đều trung bình cộng $m=5$. Khi $d$ co lại, hai số xích lại gần nhau và bốn vạch trung bình, từ trái sang phải là điều hòa, nhân, cộng, bình phương, ép sát vào nhau. Vạch cộng luôn đứng yên tại $m$, còn ba vạch kia xếp đúng thứ tự cho tới khi nhập làm một ở $d=0$.`,
        R`Let $a=m+d$ and $b=m-d$, two numbers equally spaced around their arithmetic mean $m=5$. As $d$ shrinks the numbers approach each other and the four mean marks, from left to right harmonic, geometric, arithmetic, quadratic, squeeze together. The arithmetic mark stays put at $m$ while the other three keep their order until they merge at $d=0$.`,
      )}
      read={tt(
        `$a=${fmt(m + d, 2)}$, $b=${fmt(m - d, 2)}$: điều hòa $${fmt(c.hm, 3)}$ ≤ nhân $${fmt(c.gm, 3)}$ ≤ cộng $${fmt(c.am, 3)}$ ≤ bình phương $${fmt(c.qm, 3)}$.`,
        `$a=${fmt(m + d, 2)}$, $b=${fmt(m - d, 2)}$: harmonic $${fmt(c.hm, 3)}$ ≤ geometric $${fmt(c.gm, 3)}$ ≤ arithmetic $${fmt(c.am, 3)}$ ≤ quadratic $${fmt(c.qm, 3)}$.`,
      )}
      why={tt(
        R`Với $a,b>0$ thì $m>0$. Có $ab=m^2-d^2$ và $\frac{a^2+b^2}{2}=m^2+d^2$. Vì $d^2\ge 0$ nên $ab\le m^2$ và $\frac{a^2+b^2}{2}\ge m^2$, tức $\sqrt{ab}\le m\le\sqrt{\frac{a^2+b^2}{2}}$. Trung bình điều hòa là $\frac{ab}{m}=\frac{m^2-d^2}{m}\le m$, và nó cũng bằng $\frac{(\sqrt{ab})^2}{m}$ nên không vượt $\sqrt{ab}$ vì $\sqrt{ab}\le m$. Cả ba dấu bằng cùng xảy ra khi $d=0$.`,
        R`For $a,b>0$ we have $m>0$. Then $ab=m^2-d^2$ and $\frac{a^2+b^2}{2}=m^2+d^2$. Since $d^2\ge 0$, $ab\le m^2$ and $\frac{a^2+b^2}{2}\ge m^2$, that is $\sqrt{ab}\le m\le\sqrt{\frac{a^2+b^2}{2}}$. The harmonic mean is $\frac{ab}{m}=\frac{m^2-d^2}{m}\le m$, and it also equals $\frac{(\sqrt{ab})^2}{m}$ so it does not exceed $\sqrt{ab}$ because $\sqrt{ab}\le m$. All three equalities hold together when $d=0$.`,
      )}
    >
      <Graph
        label={tt("Bốn vạch trung bình trên một trục số", "Four mean marks on a number line")}
        draw={(ctx, w, hh) => {
          const { colors, map } = frame(ctx, w, hh, 0, 10, -1, 4, "", "");
          const mark = (v: number, color: string, text: string, row: number) => {
            line(ctx, map.x(v), map.y(0), map.x(v), map.y(2.4), color, 3);
            dot(ctx, map.x(v), map.y(2.4), color, colors.bg, 5);
            label(ctx, text, map.x(v) - 12, map.y(2.8 + row * 0.5), color);
          };
          line(ctx, map.x(0), map.y(0), map.x(10), map.y(0), colors.ink, 1.6);
          dot(ctx, map.x(m + d), map.y(0), colors.alt, colors.bg, 7);
          dot(ctx, map.x(m - d), map.y(0), colors.alt, colors.bg, 7);
          label(ctx, "a", map.x(m + d) - 3, map.y(-0.5), colors.alt);
          label(ctx, "b", map.x(m - d) - 3, map.y(-0.5), colors.alt);
          mark(c.hm, colors.soft, tt("ĐH", "H"), 0);
          mark(c.gm, colors.curve, tt("N", "G"), 1);
          mark(c.am, colors.ink, tt("C", "A"), 0);
          mark(c.qm, colors.alt, tt("BP", "Q"), 1);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Pha chuyển động", "Animation phase")} value={phase} min={0} max={0.999} step={0.005} onChange={(v) => { setRunning(false); setPhase(v); }} />
      </div>
      <PlayButtons running={running} setRunning={setRunning} tt={tt} />
    </Stage>
  );
}

/* ---------- 5. Hai mũi tên quay: |a + b| ≤ |a| + |b| ---------- */

export function ArrowsTriangleAnim() {
  const tt = useTx();
  const { phase, setPhase, running, setRunning } = useLoop();
  const la = 3;
  const lb = 2;
  const theta = Math.PI * wave(phase);
  const v = vectorSumLength(la, lb, theta);
  const bx = lb * Math.cos(theta);
  const by = lb * Math.sin(theta);
  return (
    <Stage
      title={tt("Đi thẳng không bao giờ dài hơn đi vòng", "Going straight is never longer than going around")}
      story={tt(
        R`Hai bước đi nối đuôi: bước thứ nhất dài $3$ theo trục ngang, bước thứ hai dài $2$ hợp với bước đầu một góc quay dần từ $0$ tới nửa vòng. Mũi tên đậm là đường đi thẳng từ gốc tới đích, tức tổng hai vectơ. Nó luôn không dài hơn quãng đường đi vòng $3+2$, và chỉ dài bằng khi hai bước cùng hướng.`,
        R`Two steps laid end to end: the first has length $3$ along the horizontal axis and the second has length $2$, turned from the first by an angle that grows from $0$ to half a turn. The bold arrow is the straight path from the origin to the destination, the sum of the two vectors. It is never longer than the detour $3+2$ and equals it only when the two steps point the same way.`,
      )}
      read={tt(
        `Góc $${fmt(theta * 180 / Math.PI, 0)}^\\circ$: $|\\vec a+\\vec b|=${fmt(v.sum, 3)}$, $|\\vec a|+|\\vec b|=${fmt(v.bound, 1)}$, còn thiếu $${fmt(v.gap, 3)}$.`,
        `Angle $${fmt(theta * 180 / Math.PI, 0)}^\\circ$: $|\\vec a+\\vec b|=${fmt(v.sum, 3)}$, $|\\vec a|+|\\vec b|=${fmt(v.bound, 1)}$, a shortfall of $${fmt(v.gap, 3)}$.`,
      )}
      why={tt(
        R`Bình phương độ dài tổng là $|a|^2+|b|^2+2|a||b|\cos\theta$. Vì $\cos\theta\le 1$ nên nó không vượt $|a|^2+|b|^2+2|a||b|=(|a|+|b|)^2$, rồi lấy căn được $|a+b|\le|a|+|b|$. Dấu bằng khi $\cos\theta=1$, tức hai bước cùng hướng. Trên trục số (một chiều), điều này cũng suy ra từ $-|a|\le a\le|a|$ và $-|b|\le b\le|b|$ bằng cách cộng vế theo vế.`,
        R`The squared length of the sum is $|a|^2+|b|^2+2|a||b|\cos\theta$. Since $\cos\theta\le 1$ it does not exceed $|a|^2+|b|^2+2|a||b|=(|a|+|b|)^2$, and taking square roots gives $|a+b|\le|a|+|b|$. Equality holds when $\cos\theta=1$, that is when the two steps point the same way. On the number line (one dimension) it also follows by adding $-|a|\le a\le|a|$ and $-|b|\le b\le|b|$.`,
      )}
    >
      <Graph
        label={tt("Hai bước đi nối đuôi và đường đi thẳng", "Two steps end to end and the straight path")}
        draw={(ctx, w, hh) => {
          const { colors, map } = frame(ctx, w, hh, -3, 6, -1, 4, "", "", true);
          line(ctx, map.x(0), map.y(0), map.x(la), map.y(0), colors.curve, 3);
          line(ctx, map.x(la), map.y(0), map.x(la + bx), map.y(by), colors.alt, 3);
          line(ctx, map.x(0), map.y(0), map.x(la + bx), map.y(by), colors.ink, 4);
          dot(ctx, map.x(la + bx), map.y(by), colors.ink, colors.bg, 6);
          label(ctx, "a", map.x(la / 2), map.y(0) + 18, colors.curve);
          label(ctx, "b", map.x(la + bx / 2) + 6, map.y(by / 2), colors.alt);
          label(ctx, `|a+b| = ${fmt(v.sum, 2)}`, map.x(0.2), map.y(3.4), colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Góc giữa hai bước", "Angle between the steps")} value={phase} min={0} max={0.999} step={0.005} onChange={(val) => { setRunning(false); setPhase(val); }} />
      </div>
      <PlayButtons running={running} setRunning={setRunning} tt={tt} />
    </Stage>
  );
}
