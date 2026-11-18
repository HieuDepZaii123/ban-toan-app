import { useState, type ReactNode } from "react";
import { binomialPmf, cumulativeIntegral, diff, findRoots, gradientDescent, riemann, simpson } from "../../algo/index.ts";
import { dashed, dot, strokeFn } from "../../labs/draw.ts";
import { Graph } from "../../labs/Graph.tsx";
import { fmt } from "../../lib/format.ts";
import { Slider } from "../../ui/Slider.tsx";
import { at, frame, label, line, useTx } from "./kit.ts";
import { Buttons, Stage } from "./widgets.tsx";

const R = String.raw;

/* ---------- Cầu nối 1: bậc hai ↔ đạo hàm ↔ khảo sát ---------- */

function QuadDerivBridge() {
  const tt = useTx();
  const [a0, setA] = useState(1);
  const [b, setB] = useState(-4);
  const [c, setC] = useState(1);
  const [t, setT] = useState(3);
  const a = Math.abs(a0) < 0.25 ? 0.25 : a0;
  const f = (x: number) => a * x * x + b * x + c;
  const df = (x: number) => diff(f, x);
  const root = findRoots(df, -8, 8, 2000)[0];
  return (
    <Stage
      title={tt("Cầu nối: đạo hàm của parabol là một đường thẳng, và nó cắt trục ở đỉnh", "Bridge: the derivative of a parabola is a straight line, and it crosses the axis at the vertex")}
      story={tt(
        R`Đo độ dốc của parabol ở mọi chỗ rồi vẽ lại (đường cam): ta được một đường thẳng $y'=2ax+b$. Parabol đi xuống khi đường thẳng dưới trục, đi lên khi đường thẳng trên trục, và chỗ quay đầu (đỉnh) đúng là chỗ đường thẳng cắt trục. Công thức đỉnh $-\frac{b}{2a}$ và «đạo hàm bằng 0» là một. Chuyên đề bậc hai, đạo hàm và khảo sát hàm số gặp nhau ở đây.`,
        R`Measure the slope of the parabola everywhere and redraw it (the orange line): we get a straight line $y'=2ax+b$. The parabola falls where the line is below the axis, rises where the line is above, and the turning point (the vertex) is exactly where the line meets the axis. The vertex formula $-\frac{b}{2a}$ and «derivative equals 0» are one thing. The topics of quadratics, derivatives and studying a function meet here.`,
      )}
      read={tt(
        `Tại $x=${fmt(t, 2)}$: độ dốc đo được $${fmt(df(t), 4)}$, công thức $2ax+b=${fmt(2 * a * t + b, 4)}$. Đường thẳng đạo hàm cắt trục tại $x=${root === undefined ? "?" : fmt(root, 5)}$; công thức đỉnh $-\\frac{b}{2a}=${fmt(-b / (2 * a), 5)}$. ${a > 0 ? "$a>0$: đạo hàm tăng từ âm sang dương, nên đỉnh là cực tiểu." : "$a<0$: đạo hàm giảm từ dương sang âm, nên đỉnh là cực đại."}`,
        `At $x=${fmt(t, 2)}$: measured slope $${fmt(df(t), 4)}$, formula $2ax+b=${fmt(2 * a * t + b, 4)}$. The derivative line meets the axis at $x=${root === undefined ? "?" : fmt(root, 5)}$; the vertex formula $-\\frac{b}{2a}=${fmt(-b / (2 * a), 5)}$. ${a > 0 ? "$a>0$: the derivative goes from negative to positive, so the vertex is a minimum." : "$a<0$: the derivative goes from positive to negative, so the vertex is a maximum."}`,
      )}
      why={tt(
        R`Đạo hàm của $x^2$ là $2x$ (bậc giảm đi một), nên đạo hàm của hàm bậc hai là hàm bậc nhất. Hệ số $2a$ của nó là «độ dốc của độ dốc»: parabol càng cong ($|a|$ lớn) thì độ dốc đổi càng nhanh. Đó chính là đạo hàm cấp hai $y''=2a$, và dấu của nó cho biết bát hay nón.`,
        R`The derivative of $x^2$ is $2x$ (the degree drops by one), so the derivative of a quadratic is linear. Its coefficient $2a$ is the «slope of the slope»: the more curved the parabola ($|a|$ large) the faster the slope changes. That is the second derivative $y''=2a$, and its sign tells bowl from cap.`,
      )}
    >
      <Graph
        label={tt("Parabol và đồ thị đạo hàm của nó", "The parabola and its derivative graph")}
        draw={(ctx, w, h) => {
          const { colors, map, pad } = frame(ctx, w, h, -7, 7, -10, 12);
          strokeFn(ctx, map, w, h, pad, -7, 7, f, colors.curve, 2.6);
          strokeFn(ctx, map, w, h, pad, -7, 7, df, colors.alt, 2.4);
          const sx = -b / (2 * a);
          dashed(ctx, map.x(sx), map.y(-10), map.x(sx), map.y(12), colors.soft);
          dot(ctx, map.x(sx), map.y(f(sx)), colors.ink, colors.bg, 6);
          dot(ctx, map.x(sx), map.y(0), colors.alt, colors.bg, 6);
          dot(ctx, map.x(t), map.y(df(t)), colors.alt, colors.bg, 5);
          dot(ctx, map.x(t), map.y(f(t)), colors.curve, colors.bg, 5);
          label(ctx, "y", map.x(5.2), map.y(f(5.2)) - 8, colors.curve);
          label(ctx, "y′", map.x(5.2), map.y(df(5.2)) + 14, colors.alt);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("a (khác 0)", "a (non-zero)")} value={a0} min={-3} max={3} step={0.25} onChange={setA} />
        <Slider label="b" value={b} min={-8} max={8} step={0.5} onChange={setB} />
        <Slider label="c" value={c} min={-6} max={6} step={0.5} onChange={setC} />
        <Slider label={tt("Điểm xem x", "Point to inspect x")} value={t} min={-6} max={6} step={0.25} onChange={setT} />
      </div>
    </Stage>
  );
}

/* ---------- Cầu nối 2: mũ ↔ đạo hàm ↔ tích phân ---------- */

function ExpBridge() {
  const tt = useTx();
  const [a, setA] = useState(2);
  const f = (x: number) => a ** x;
  const lnA = Math.log(a);
  const F = cumulativeIntegral(f, -3, 3, 1200, 0);
  const num = (x: number) => at(F, Math.round(((x + 3) / 6) * 1200)).y;
  return (
    <Stage
      title={tt("Cầu nối: hàm mũ, đạo hàm của nó và nguyên hàm của nó là ba anh em", "Bridge: the exponential, its derivative and its antiderivative are three siblings")}
      story={tt(
        R`Đo độ dốc của $a^x$ rồi chia cho chính $a^x$: ở mọi chỗ ra cùng một con số, đó là $\ln a$. Cộng dồn diện tích dưới $a^x$ (nguyên hàm) rồi so với chính $a^x$: tỉ lệ cũng là hằng số $\frac{1}{\ln a}$. Vậy ba đường cong chỉ khác nhau một hệ số. Chỉ khi $a=e\approx 2{,}718$ thì hệ số bằng 1 và cả ba đường trùng nhau: $e^x$ bằng đạo hàm của nó và bằng nguyên hàm của nó (cộng một hằng số).`,
        R`Measure the slope of $a^x$ and divide by $a^x$ itself: everywhere you get the same number, $\ln a$. Accumulate the area under $a^x$ (the antiderivative) and compare with $a^x$: the ratio is also a constant, $\frac{1}{\ln a}$. So the three curves differ only by a factor. Only for $a=e\approx 2.718$ is the factor 1 and all three curves coincide: $e^x$ equals its derivative and its antiderivative (up to a constant).`,
      )}
      read={tt(
        `$a=${fmt(a, 3)}$, $\\ln a=${fmt(lnA, 4)}$. Độ dốc chia cho hàm: tại $x=-1$: $${fmt(diff(f, -1) / f(-1), 5)}$; tại $0$: $${fmt(diff(f, 0) / f(0), 5)}$; tại $1$: $${fmt(diff(f, 1) / f(1), 5)}$ (cùng bằng $\\ln a$). Nguyên hàm cộng dồn tại $x=1$ trừ tại $x=0$: $${fmt(num(1) - num(0), 5)}$; công thức $\\frac{a-1}{\\ln a}=${fmt((a - 1) / lnA, 5)}$.`,
        `$a=${fmt(a, 3)}$, $\\ln a=${fmt(lnA, 4)}$. Slope divided by the function: at $x=-1$: $${fmt(diff(f, -1) / f(-1), 5)}$; at $0$: $${fmt(diff(f, 0) / f(0), 5)}$; at $1$: $${fmt(diff(f, 1) / f(1), 5)}$ (all equal to $\\ln a$). The accumulated antiderivative at $x=1$ minus at $x=0$: $${fmt(num(1) - num(0), 5)}$; the formula $\\frac{a-1}{\\ln a}=${fmt((a - 1) / lnA, 5)}$.`,
      )}
      why={tt(
        R`Vì $a^{x+h}=a^x\cdot a^h$, thương $\frac{a^{x+h}-a^x}{h}=a^x\cdot\frac{a^h-1}{h}$ và thừa số sau không phụ thuộc $x$: đạo hàm tỉ lệ với chính hàm, với hệ số $\ln a$. Nguyên hàm là phép ngược nên có hệ số $\frac{1}{\ln a}$. Số $e$ là cơ số làm hệ số đó bằng đúng 1: lý do $e$ xuất hiện khắp nơi trong giải tích.`,
        R`Since $a^{x+h}=a^x\cdot a^h$, the quotient $\frac{a^{x+h}-a^x}{h}=a^x\cdot\frac{a^h-1}{h}$ and the second factor does not depend on $x$: the derivative is proportional to the function itself, with factor $\ln a$. The antiderivative is the reverse operation so it carries $\frac{1}{\ln a}$. The number $e$ is the base that makes that factor exactly 1: the reason $e$ shows up everywhere in calculus.`,
      )}
    >
      <Graph
        label={tt("Hàm mũ, đạo hàm và nguyên hàm", "The exponential, its derivative and its antiderivative")}
        draw={(ctx, w, h) => {
          const { colors, map, pad } = frame(ctx, w, h, -3, 3, -1, 9);
          ctx.save(); ctx.beginPath(); ctx.rect(map.x(-3), map.y(9), map.x(3) - map.x(-3), map.y(-1) - map.y(9)); ctx.clip();
          strokeFn(ctx, map, w, h, pad, -3, 3, (x) => num(x) + a ** -3 / lnA, colors.soft, 3);
          strokeFn(ctx, map, w, h, pad, -3, 3, (x) => diff(f, x), colors.alt, 2.2);
          strokeFn(ctx, map, w, h, pad, -3, 3, f, colors.curve, 2.6);
          ctx.restore();
          label(ctx, tt("nguyên hàm (chọn hằng số để so sánh)", "antiderivative (constant chosen for comparison)"), map.x(-2.8), map.y(0.7), colors.soft);
          label(ctx, tt("đạo hàm", "derivative"), map.x(1.2), map.y(diff(f, 1.2)) - 8, colors.alt);
          label(ctx, tt("hàm", "function"), map.x(-2.6), map.y(f(-2.6)) - 20, colors.curve);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Cơ số a", "Base a")} value={a} min={1.2} max={4} step={0.01} onChange={setA} />
      </div>
      <Buttons><button type="button" className="text-btn" onClick={() => setA(Math.round(Math.E * 100) / 100)}>{tt("Đặt a = e", "Set a = e")}</button></Buttons>
    </Stage>
  );
}

/* ---------- Cầu nối 3: lượng giác ↔ vectơ ↔ hình giải tích ---------- */

function TrigVectorBridge() {
  const tt = useTx();
  const [al, setAl] = useState(1.0);
  const [be, setBe] = useState(0.2);
  const u = { x: Math.cos(al), y: Math.sin(al) };
  const v = { x: Math.cos(be), y: Math.sin(be) };
  const dotp = u.x * v.x + u.y * v.y;
  const phi = Math.acos(Math.max(-1, Math.min(1, dotp)));
  const lineAngle = Math.min(phi, Math.PI - phi);
  return (
    <Stage
      title={tt("Cầu nối: cosin của góc giữa hai hướng chính là tích vô hướng", "Bridge: the cosine of the angle between two directions is the dot product")}
      story={tt(
        R`Hai vectơ đơn vị chỉ các hướng $\alpha$ và $\beta$ có toạ độ $(\cos\alpha;\sin\alpha)$ và $(\cos\beta;\sin\beta)$. Tích vô hướng tính theo toạ độ là $\cos\alpha\cos\beta+\sin\alpha\sin\beta$, còn tính theo độ dài và góc là $1\cdot 1\cdot\cos(\alpha-\beta)$. Hai cách phải bằng nhau: đó chính là công thức cộng của lượng giác. Nếu hai vectơ là pháp tuyến của hai đường thẳng thì góc giữa hai đường là góc nhọn trong hai góc bù nhau.`,
        R`Two unit vectors pointing in directions $\alpha$ and $\beta$ have coordinates $(\cos\alpha;\sin\alpha)$ and $(\cos\beta;\sin\beta)$. The dot product from coordinates is $\cos\alpha\cos\beta+\sin\alpha\sin\beta$, and from lengths and angle it is $1\cdot 1\cdot\cos(\alpha-\beta)$. The two must agree: that is exactly the trigonometric subtraction formula. If the two vectors are the normals of two lines, the angle between the lines is the acute one of the two supplementary angles.`,
      )}
      read={tt(
        `Theo toạ độ: $\\cos\\alpha\\cos\\beta+\\sin\\alpha\\sin\\beta=${fmt(dotp, 5)}$. Theo góc: $\\cos(\\alpha-\\beta)=\\cos(${fmt(al - be, 3)})=${fmt(Math.cos(al - be), 5)}$. Góc giữa hai vectơ $${fmt(phi, 4)}$ rad (${fmt((phi * 180) / Math.PI, 1)}°); góc giữa hai đường thẳng nhận chúng làm pháp tuyến: $${fmt((lineAngle * 180) / Math.PI, 1)}°$.`,
        `From coordinates: $\\cos\\alpha\\cos\\beta+\\sin\\alpha\\sin\\beta=${fmt(dotp, 5)}$. From the angle: $\\cos(\\alpha-\\beta)=\\cos(${fmt(al - be, 3)})=${fmt(Math.cos(al - be), 5)}$. The angle between the vectors is $${fmt(phi, 4)}$ rad (${fmt((phi * 180) / Math.PI, 1)}°); the angle between two lines having them as normals: $${fmt((lineAngle * 180) / Math.PI, 1)}°$.`,
      )}
      why={tt(
        R`Một ý tưởng nối ba chuyên đề: lượng giác cho toạ độ của điểm trên đường tròn, vectơ cho phép nhân hai vectơ thành một số, và hình giải tích dùng số đó để đo góc và khoảng cách. Công thức góc giữa hai đường thẳng $\frac{|a_1a_2+b_1b_2|}{\sqrt{a_1^2+b_1^2}\sqrt{a_2^2+b_2^2}}$ chỉ là $|\cos\varphi|$ của hai pháp tuyến.`,
        R`One idea ties three topics together: trigonometry gives the coordinates of a point on the circle, vectors multiply two vectors into a number, and analytic geometry uses that number to measure angles and distances. The formula for the angle between two lines $\frac{|a_1a_2+b_1b_2|}{\sqrt{a_1^2+b_1^2}\sqrt{a_2^2+b_2^2}}$ is just $|\cos\varphi|$ of the two normals.`,
      )}
    >
      <Graph
        label={tt("Hai vectơ đơn vị trên đường tròn lượng giác", "Two unit vectors on the unit circle")}
        draw={(ctx, w, h) => {
          const { colors, map } = frame(ctx, w, h, -1.6, 1.6, -1.4, 1.4, "x", "y", true);
          ctx.beginPath(); ctx.strokeStyle = colors.soft; ctx.lineWidth = 1.4; ctx.arc(map.x(0), map.y(0), map.x(1) - map.x(0), 0, Math.PI * 2); ctx.stroke();
          line(ctx, map.x(0), map.y(0), map.x(u.x), map.y(u.y), colors.curve, 3);
          line(ctx, map.x(0), map.y(0), map.x(v.x), map.y(v.y), colors.alt, 3);
          dashed(ctx, map.x(u.x), map.y(u.y), map.x(v.x), map.y(v.y), colors.soft);
          dot(ctx, map.x(u.x), map.y(u.y), colors.curve, colors.bg, 6); dot(ctx, map.x(v.x), map.y(v.y), colors.alt, colors.bg, 6);
          label(ctx, `u (α)`, map.x(u.x) + 8, map.y(u.y) - 6, colors.curve);
          label(ctx, `v (β)`, map.x(v.x) + 8, map.y(v.y) + 14, colors.alt);
          label(ctx, `u·v = ${fmt(dotp, 3)}`, map.x(-1.5), map.y(1.2), colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Hướng α (rad)", "Direction α (rad)")} value={al} min={-3.14} max={3.14} step={0.05} onChange={setAl} />
        <Slider label={tt("Hướng β (rad)", "Direction β (rad)")} value={be} min={-3.14} max={3.14} step={0.05} onChange={setBe} />
      </div>
    </Stage>
  );
}

/* ---------- Cầu nối 4: dãy số ↔ tích phân ↔ giới hạn ---------- */

function RiemannSeqBridge() {
  const tt = useTx();
  const [n, setN] = useState(10);
  const f = (x: number) => x * x;
  const left = (m: number) => riemann(f, 0, 1, m, "left");
  const mid = (m: number) => riemann(f, 0, 1, m, "mid");
  const N = 60;
  return (
    <Stage
      title={tt("Cầu nối: tổng Riemann là một dãy số, tích phân là giới hạn của nó", "Bridge: Riemann sums form a sequence, the integral is its limit")}
      story={tt(
        R`Chia $[0;1]$ thành $n$ dải và cộng diện tích các hình chữ nhật dưới $y=x^2$: ta được số $S_n$. Cho $n=1,2,3,\dots$ thì $S_n$ là một dãy số, và dãy ấy hội tụ về $\frac{1}{3}$, chính là tích phân. Hai cách chọn chiều cao dải cho hai dãy hội tụ với tốc độ khác nhau: sai số của quy tắc mép trái giảm như $\frac{1}{n}$, của quy tắc giữa dải giảm như $\frac{1}{n^2}$. Ba chuyên đề dãy số, giới hạn và tích phân là một câu chuyện.`,
        R`Cut $[0;1]$ into $n$ strips and add the areas of the rectangles under $y=x^2$: you get a number $S_n$. For $n=1,2,3,\dots$ the $S_n$ form a sequence, and it converges to $\frac{1}{3}$, which is the integral. The two ways of choosing the strip height give two sequences converging at different speeds: the error of the left rule shrinks like $\frac{1}{n}$, of the midpoint rule like $\frac{1}{n^2}$. The topics of sequences, limits and integrals tell one story.`,
      )}
      read={tt(
        `$n=${n}$: quy tắc mép trái $S_n=${fmt(left(n), 6)}$ (sai số $${fmt(Math.abs(left(n) - 1 / 3), 6)}$), quy tắc giữa dải $${fmt(mid(n), 6)}$ (sai số $${fmt(Math.abs(mid(n) - 1 / 3), 8)}$). Khi gấp đôi $n$ lên ${2 * n}$: sai số mép trái $${fmt(Math.abs(left(2 * n) - 1 / 3), 6)}$ (tỉ số $${fmt(Math.abs(left(2 * n) - 1 / 3) / Math.abs(left(n) - 1 / 3), 3)}$, gần $\\frac{1}{2}$), sai số giữa dải $${fmt(Math.abs(mid(2 * n) - 1 / 3), 8)}$ (tỉ số $${fmt(Math.abs(mid(2 * n) - 1 / 3) / Math.abs(mid(n) - 1 / 3), 3)}$, gần $\\frac{1}{4}$). Giới hạn $\\frac{1}{3}=${fmt(1 / 3, 6)}$.`,
        `$n=${n}$: the left rule gives $S_n=${fmt(left(n), 6)}$ (error $${fmt(Math.abs(left(n) - 1 / 3), 6)}$), the midpoint rule $${fmt(mid(n), 6)}$ (error $${fmt(Math.abs(mid(n) - 1 / 3), 8)}$). Doubling $n$ to ${2 * n}$: the left error becomes $${fmt(Math.abs(left(2 * n) - 1 / 3), 6)}$ (ratio $${fmt(Math.abs(left(2 * n) - 1 / 3) / Math.abs(left(n) - 1 / 3), 3)}$, close to $\\frac{1}{2}$), the midpoint error $${fmt(Math.abs(mid(2 * n) - 1 / 3), 8)}$ (ratio $${fmt(Math.abs(mid(2 * n) - 1 / 3) / Math.abs(mid(n) - 1 / 3), 3)}$, close to $\\frac{1}{4}$). The limit $\\frac{1}{3}=${fmt(1 / 3, 6)}$.`,
      )}
      why={tt(
        R`Giới hạn của dãy $S_n$ là định nghĩa của tích phân. Tốc độ hội tụ cho biết dãy «ngoan» đến đâu: sai số giảm như $\frac{1}{n^2}$ nghĩa là chỉ cần $n$ nhỏ đã rất chính xác. Đây cũng là lý do thuật toán Simpson và các quy tắc bậc cao hơn được dùng trong máy tính.`,
        R`The limit of the sequence $S_n$ is the definition of the integral. The speed of convergence tells how well-behaved a sequence is: an error shrinking like $\frac{1}{n^2}$ means a small $n$ is already very accurate. That is also why Simpson's rule and higher-order rules are used in computers.`,
      )}
    >
      <Graph
        label={tt("Dãy các tổng Riemann hội tụ về 1/3", "The sequence of Riemann sums converging to 1/3")}
        draw={(ctx, w, h) => {
          const { colors, map } = frame(ctx, w, h, 0, N + 1, 0, 1, "n", "S");
          dashed(ctx, map.x(0), map.y(1 / 3), map.x(N + 1), map.y(1 / 3), colors.ink);
          for (let m = 1; m <= N; m++) { dot(ctx, map.x(m), map.y(left(m)), colors.alt, colors.bg, 3.5); dot(ctx, map.x(m), map.y(mid(m)), colors.curve, colors.bg, 3.5); }
          dashed(ctx, map.x(n), map.y(0), map.x(n), map.y(1), colors.soft);
          label(ctx, tt("mép trái", "left rule"), map.x(2), map.y(left(2)) - 8, colors.alt);
          label(ctx, tt("giữa dải", "midpoint rule"), map.x(3), map.y(mid(3)) + 16, colors.curve);
          label(ctx, "1/3", map.x(N - 4), map.y(1 / 3) - 8, colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Số dải n", "Number of strips n")} value={n} min={1} max={30} step={1} onChange={setN} />
      </div>
    </Stage>
  );
}

/* ---------- Cầu nối 5: tổ hợp ↔ xác suất ↔ tích phân ---------- */

function PascalBellBridge() {
  const tt = useTx();
  const [n, setN] = useState(30);
  const pmf = binomialPmf(n, 0.5);
  const mu = n / 2;
  const sd = Math.sqrt(n) / 2;
  const pdf = (x: number) => Math.exp(-((x - mu) ** 2) / (2 * sd * sd)) / (sd * Math.sqrt(2 * Math.PI));
  const bars = pmf.reduce((s, v, k) => (Math.abs(k - mu) <= sd ? s + v : s), 0);
  const area = simpson(pdf, mu - sd, mu + sd, 400);
  const top = Math.max(...pmf) * 1.15;
  return (
    <Stage
      title={tt("Cầu nối: hàng của tam giác Pascal, chia cho $2^n$, thành hình chuông", "Bridge: a row of Pascal's triangle, divided by $2^n$, becomes a bell")}
      story={tt(
        R`Hàng thứ $n$ của tam giác Pascal là các số cách chọn $C_n^k$ (chuyên đề tổ hợp). Chia cho tổng $2^n$ ta được xác suất tung $n$ đồng xu có đúng $k$ mặt ngửa (chuyên đề xác suất). Khi $n$ lớn, các cột xếp thành hình chuông trơn, và xác suất kết quả nằm trong một khoảng là diện tích dưới đường chuông (chuyên đề tích phân). Các cột là thật, đường cong là công thức chuẩn với cùng trung bình $\frac{n}{2}$ và độ lệch $\frac{\sqrt{n}}{2}$.`,
        R`Row $n$ of Pascal's triangle holds the counts $C_n^k$ (the counting topic). Divide by their total $2^n$ and you get the probability that $n$ coin tosses give exactly $k$ heads (the probability topic). When $n$ is large the bars line up into a smooth bell, and the probability of landing in an interval is the area under the bell curve (the integral topic). The bars are real, the curve is the normal formula with the same mean $\frac{n}{2}$ and deviation $\frac{\sqrt{n}}{2}$.`,
      )}
      read={tt(
        `$n=${n}$: hàng ${n} có ${n + 1} số, tổng $2^{${n}}$. Xác suất $k$ nằm trong $\\mu\\pm\\sigma$ (cộng các cột): $${fmt(bars, 4)}$; diện tích dưới đường chuông trong cùng khoảng (tích phân Simpson): $${fmt(area, 4)}$. Cả hai gần $0{,}683$ khi $n$ lớn.`,
        `$n=${n}$: row ${n} has ${n + 1} numbers, total $2^{${n}}$. The probability that $k$ lies within $\\mu\\pm\\sigma$ (adding the bars): $${fmt(bars, 4)}$; the area under the bell curve in the same interval (Simpson integral): $${fmt(area, 4)}$. Both are close to $0.683$ when $n$ is large.`,
      )}
      why={tt(
        R`Ba chuyên đề dùng chung một đối tượng: số cách chọn là hệ số nhị thức, xác suất là hệ số chia cho tổng, và xấp xỉ liên tục của nó là hàm chuẩn với diện tích tính bằng tích phân. Hệ số lớn nhất ở giữa vì có nhiều cách tạo ra kết quả «nửa ngửa nửa sấp» nhất.`,
        R`Three topics share one object: the number of ways is the binomial coefficient, the probability is the coefficient divided by the total, and its continuous approximation is the normal function whose areas are computed with integrals. The largest coefficient is in the middle because there are the most ways to get «half heads, half tails».`,
      )}
    >
      <Graph
        label={tt("Các cột nhị thức và đường chuông", "The binomial bars and the bell curve")}
        draw={(ctx, w, h) => {
          const { colors, map, pad } = frame(ctx, w, h, -0.8, n + 0.8, 0, top, "k", "P");
          pmf.forEach((p, k) => { const x0 = map.x(k - 0.45); const bw = map.x(k + 0.45) - x0; ctx.fillStyle = Math.abs(k - mu) <= sd ? colors.alt : colors.curve; ctx.globalAlpha = 0.45; ctx.fillRect(x0, map.y(p), bw, map.y(0) - map.y(p)); ctx.globalAlpha = 1; });
          strokeFn(ctx, map, w, h, pad, -0.5, n + 0.5, pdf, colors.ink, 2.4);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Số đồng xu n", "Number of coins n")} value={n} min={2} max={80} step={1} onChange={setN} />
      </div>
    </Stage>
  );
}

/* ---------- Cầu nối 6: tam giác ↔ lượng giác ↔ vectơ ---------- */

function CosineVectorBridge() {
  const tt = useTx();
  const [lu, setLu] = useState(4);
  const [lv, setLv] = useState(3);
  const [ang, setAng] = useState(1.2);
  const u = { x: lu, y: 0 };
  const v = { x: lv * Math.cos(ang), y: lv * Math.sin(ang) };
  const d = { x: u.x - v.x, y: u.y - v.y };
  const direct = d.x * d.x + d.y * d.y;
  const viaDot = lu * lu + lv * lv - 2 * (u.x * v.x + u.y * v.y);
  const viaCos = lu * lu + lv * lv - 2 * lu * lv * Math.cos(ang);
  return (
    <Stage
      title={tt("Cầu nối: định lí cosin là $|\\vec{u}-\\vec{v}|^2$ khai triển bằng tích vô hướng", "Bridge: the cosine rule is $|\\vec{u}-\\vec{v}|^2$ expanded with the dot product")}
      story={tt(
        R`Hai vectơ $\vec{u}$, $\vec{v}$ chung gốc làm thành hai cạnh của một tam giác, cạnh thứ ba là $\vec{u}-\vec{v}$. Bình phương độ dài cạnh thứ ba: $|\vec{u}-\vec{v}|^2=|\vec{u}|^2+|\vec{v}|^2-2\,\vec{u}\cdot\vec{v}$. Thay $\vec{u}\cdot\vec{v}=|\vec{u}||\vec{v}|\cos\varphi$ ta được định lí cosin. Khi góc là $90^\circ$ thì tích vô hướng bằng 0 và còn lại định lí Pythagore. Ba chuyên đề tam giác, lượng giác và vectơ nói cùng một điều.`,
        R`Two vectors $\vec{u}$, $\vec{v}$ from a common point form two sides of a triangle, and the third side is $\vec{u}-\vec{v}$. Squaring its length: $|\vec{u}-\vec{v}|^2=|\vec{u}|^2+|\vec{v}|^2-2\,\vec{u}\cdot\vec{v}$. Substituting $\vec{u}\cdot\vec{v}=|\vec{u}||\vec{v}|\cos\varphi$ gives the cosine rule. At $90^\circ$ the dot product is 0 and only Pythagoras remains. The topics of triangles, trigonometry and vectors say the same thing.`,
      )}
      read={tt(
        `Cạnh thứ ba đo từ toạ độ: $|\\vec{u}-\\vec{v}|^2=${fmt(direct, 5)}$. Theo tích vô hướng: $${fmt(lu * lu, 2)}+${fmt(lv * lv, 2)}-2\\cdot${fmt(u.x * v.x + u.y * v.y, 3)}=${fmt(viaDot, 5)}$. Theo định lí cosin: $${fmt(viaCos, 5)}$. ${Math.abs(ang - Math.PI / 2) < 0.03 ? "Gần $90^\\\\circ$: số hạng cosin gần 0, còn Pythagore $a^2=b^2+c^2$." : ""}`,
        `The third side measured from coordinates: $|\\vec{u}-\\vec{v}|^2=${fmt(direct, 5)}$. By the dot product: $${fmt(lu * lu, 2)}+${fmt(lv * lv, 2)}-2\\cdot${fmt(u.x * v.x + u.y * v.y, 3)}=${fmt(viaDot, 5)}$. By the cosine rule: $${fmt(viaCos, 5)}$. ${Math.abs(ang - Math.PI / 2) < 0.03 ? "Near $90^\\\\circ$: the cosine term is nearly 0, leaving Pythagoras $a^2=b^2+c^2$." : ""}`,
      )}
      why={tt(
        R`Tích vô hướng là cách đo «hai vectơ giúp nhau bao nhiêu», nên khi góc tù ($\cos\varphi<0$) cạnh thứ ba dài hơn Pythagore dự đoán, khi góc nhọn thì ngắn hơn. Định lí cosin là Pythagore có sửa sai bằng một số hạng chứa cosin.`,
        R`The dot product measures «how much two vectors help each other», so when the angle is obtuse ($\cos\varphi<0$) the third side is longer than Pythagoras predicts, and shorter when the angle is acute. The cosine rule is Pythagoras corrected by one term containing the cosine.`,
      )}
    >
      <Graph
        label={tt("Tam giác dựng từ hai vectơ chung gốc", "The triangle built from two vectors with a common start")}
        draw={(ctx, w, h) => {
          const { colors, map } = frame(ctx, w, h, -1, 6, -1, 4, "x", "y", true);
          ctx.beginPath(); ctx.moveTo(map.x(0), map.y(0)); ctx.lineTo(map.x(u.x), map.y(u.y)); ctx.lineTo(map.x(v.x), map.y(v.y)); ctx.closePath();
          ctx.fillStyle = colors.curve; ctx.globalAlpha = 0.12; ctx.fill(); ctx.globalAlpha = 1;
          line(ctx, map.x(0), map.y(0), map.x(u.x), map.y(u.y), colors.curve, 3);
          line(ctx, map.x(0), map.y(0), map.x(v.x), map.y(v.y), colors.alt, 3);
          line(ctx, map.x(u.x), map.y(u.y), map.x(v.x), map.y(v.y), colors.ink, 3);
          label(ctx, `u = ${fmt(lu)}`, map.x(u.x / 2) - 10, map.y(0) + 18, colors.curve);
          label(ctx, `v = ${fmt(lv)}`, map.x(v.x / 2) - 40, map.y(v.y / 2), colors.alt);
          label(ctx, `|u − v| = ${fmt(Math.sqrt(direct), 2)}`, map.x((u.x + v.x) / 2) + 8, map.y((u.y + v.y) / 2) - 8, colors.ink);
          label(ctx, "φ", map.x(0.5), map.y(0.25), colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Độ dài u", "Length of u")} value={lu} min={1} max={5} step={0.25} onChange={setLu} />
        <Slider label={tt("Độ dài v", "Length of v")} value={lv} min={1} max={5} step={0.25} onChange={setLv} />
        <Slider label={tt("Góc φ (rad)", "Angle φ (rad)")} value={ang} min={0.1} max={3.0} step={0.02} onChange={setAng} />
      </div>
    </Stage>
  );
}

/* ---------- Cầu nối 7: bất đẳng thức ↔ bậc hai ↔ đạo hàm ---------- */

function ThreeWaysBridge() {
  const tt = useTx();
  const [k, setK] = useState(4);
  const f = (x: number) => x + k / x;
  const path = gradientDescent(f, 0.6, 0.04, 300);
  const last = at(path, path.length - 1);
  const crit = findRoots((x) => diff(f, x, 1e-5), 0.1, 10, 4000)[0];
  return (
    <Stage
      title={tt("Cầu nối: ba cách tìm giá trị nhỏ nhất của x + k/x, cùng một đáp số", "Bridge: three ways to find the minimum of x + k/x, one answer")}
      story={tt(
        R`Cách một (bất đẳng thức): Cauchy cho $x+\frac{k}{x}\ge 2\sqrt{k}$, dấu bằng khi $x=\sqrt{k}$. Cách hai (đạo hàm): $y'=1-\frac{k}{x^2}=0$ cho $x=\sqrt{k}$, và $y'$ đổi từ âm sang dương nên là cực tiểu. Cách ba (thuật toán): lăn bóng xuống đáy bằng hạ gradient, không biết gì về cả hai cách trên. Quy về bậc hai: nhân $x$ vào hai vế, $x^2-yx+k=0$ có nghiệm khi $y^2-4k\ge 0$, tức $y\ge 2\sqrt{k}$ (dùng biệt thức!). Bốn lối đi, một đích.`,
        R`Way one (inequality): Cauchy gives $x+\frac{k}{x}\ge 2\sqrt{k}$, with equality at $x=\sqrt{k}$. Way two (derivative): $y'=1-\frac{k}{x^2}=0$ gives $x=\sqrt{k}$, and $y'$ goes from negative to positive so it is a minimum. Way three (algorithm): roll a ball down to the bottom by gradient descent, knowing neither of the above. Reduce to a quadratic: multiply by $x$, $x^2-yx+k=0$ has a solution when $y^2-4k\ge 0$, i.e. $y\ge 2\sqrt{k}$ (using the discriminant!). Four paths, one destination.`,
      )}
      read={tt(
        `$k=${fmt(k)}$. Cauchy: $2\\sqrt{k}=${fmt(2 * Math.sqrt(k), 6)}$ tại $x=\\sqrt{k}=${fmt(Math.sqrt(k), 6)}$. Đạo hàm: máy giải $y'=0$ ra $x=${crit === undefined ? "?" : fmt(crit, 6)}$, giá trị $${crit === undefined ? "?" : fmt(f(crit), 6)}$. Hạ gradient sau ${path.length - 1} bước: $x=${fmt(last.x, 6)}$, $y=${fmt(last.y, 6)}$. Biệt thức: $y^2-4k\\ge 0\\Rightarrow y\\ge ${fmt(2 * Math.sqrt(k), 6)}$.`,
        `$k=${fmt(k)}$. Cauchy: $2\\sqrt{k}=${fmt(2 * Math.sqrt(k), 6)}$ at $x=\\sqrt{k}=${fmt(Math.sqrt(k), 6)}$. Derivative: the machine solves $y'=0$ and gets $x=${crit === undefined ? "?" : fmt(crit, 6)}$, value $${crit === undefined ? "?" : fmt(f(crit), 6)}$. Gradient descent after ${path.length - 1} steps: $x=${fmt(last.x, 6)}$, $y=${fmt(last.y, 6)}$. Discriminant: $y^2-4k\\ge 0\\Rightarrow y\\ge ${fmt(2 * Math.sqrt(k), 6)}$.`,
      )}
      why={tt(
        R`Khi các cách độc lập cho cùng đáp số, ta tin đáp số ấy hơn. Mỗi cách còn dạy một điều: bất đẳng thức cho biết đáp số và lý do không có gì thấp hơn, đạo hàm cho thấy đó là cực tiểu cục bộ, thuật toán chạy được khi không có công thức, còn bậc hai biến bài toán thành một câu hỏi về nghiệm.`,
        R`When independent methods give the same answer, we trust it more. Each method also teaches something: the inequality gives the answer and why nothing lies lower, the derivative shows it is a local minimum, the algorithm works when there is no formula, and the quadratic turns the problem into a question about roots.`,
      )}
    >
      <Graph
        label={tt("Đồ thị x + k/x với đáp số của ba cách", "The graph of x + k/x with the answers of the three ways")}
        draw={(ctx, w, h) => {
          const { colors, map, pad } = frame(ctx, w, h, 0, 10, 0, 14);
          strokeFn(ctx, map, w, h, pad, 0.2, 10, f, colors.curve, 2.6);
          dashed(ctx, map.x(0), map.y(2 * Math.sqrt(k)), map.x(10), map.y(2 * Math.sqrt(k)), colors.soft);
          path.forEach((p, i) => { if (i % 3 === 0 || i === path.length - 1) dot(ctx, map.x(p.x), map.y(p.y), colors.alt, colors.bg, 3); });
          dot(ctx, map.x(Math.sqrt(k)), map.y(2 * Math.sqrt(k)), colors.ink, colors.bg, 7);
          label(ctx, tt("Cauchy · đạo hàm · hạ gradient", "Cauchy · derivative · gradient descent"), map.x(Math.sqrt(k)) + 10, map.y(2 * Math.sqrt(k)) - 10, colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label="k" value={k} min={1} max={9} step={1} onChange={setK} />
      </div>
    </Stage>
  );
}

/* ---------- Cầu nối 8: giới hạn ↔ đạo hàm ↔ tích phân ---------- */

function TwoLimitsBridge() {
  const tt = useTx();
  const [e, setE] = useState(1);
  const h = 10 ** -e;
  const nStrips = Math.max(1, Math.round(1 / h));
  const f = (x: number) => x * x;
  const quotient = (f(1 + h) - f(1)) / h;
  const sum = riemann(f, 0, 1, nStrips, "left");
  const pts = Array.from({ length: 30 }, (_, i) => { const ee = (i * 3) / 29; const hh = 10 ** -ee; return { ee, q: (f(1 + hh) - f(1)) / hh, s: riemann(f, 0, 1, Math.max(1, Math.round(1 / hh)), "left") }; });
  return (
    <Stage
      title={tt("Cầu nối: hai giới hạn đứng sau toàn bộ giải tích", "Bridge: two limits stand behind all of calculus")}
      story={tt(
        R`Đạo hàm và tích phân đều là giới hạn của một cái gì đó khi một số nhỏ dần về 0. Cùng một thanh trượt điều khiển cả hai: bước $h$ co lại. Thương $\frac{f(1+h)-f(1)}{h}$ của hàm $x^2$ dồn về $2$ (đạo hàm), còn tổng $n=\frac{1}{h}$ dải mỏng dưới $x^2$ trên $[0;1]$ dồn về $\frac{1}{3}$ (tích phân). Kéo $h$ nhỏ dần và xem hai dãy số cùng đi tới đích của mình.`,
        R`The derivative and the integral are both limits of something as a small number shrinks to 0. One slider drives both: the step $h$ shrinking. The quotient $\frac{f(1+h)-f(1)}{h}$ of $x^2$ settles at $2$ (the derivative), while the sum of $n=\frac{1}{h}$ thin strips under $x^2$ on $[0;1]$ settles at $\frac{1}{3}$ (the integral). Shrink $h$ and watch the two lists of numbers each head for their destination.`,
      )}
      read={tt(
        `$h=${fmt(h, 6)}$: thương $\\frac{(1+h)^2-1}{h}=${fmt(quotient, 6)}$ (→ 2, đúng bằng $2+h$). Tổng ${nStrips} dải $=${fmt(sum, 6)}$ (→ ${fmt(1 / 3, 6)}). Hai sai số: $${fmt(Math.abs(quotient - 2), 6)}$ và $${fmt(Math.abs(sum - 1 / 3), 6)}$, cả hai co theo $h$.`,
        `$h=${fmt(h, 6)}$: the quotient $\\frac{(1+h)^2-1}{h}=${fmt(quotient, 6)}$ (→ 2, exactly $2+h$). The sum of ${nStrips} strips $=${fmt(sum, 6)}$ (→ ${fmt(1 / 3, 6)}). The two errors: $${fmt(Math.abs(quotient - 2), 6)}$ and $${fmt(Math.abs(sum - 1 / 3), 6)}$, both shrinking with $h$.`,
      )}
      why={tt(
        R`Định lí cơ bản của giải tích nói hai giới hạn này ngược nhau: nếu $F$ là hàm có đạo hàm $f$ thì $\int_0^1 f=F(1)-F(0)$. Ví dụ ở đây: $f(x)=x^2$ có đạo hàm $2$ tại $1$, và tích phân của nó trên $[0;1]$ là $\frac{1}{3}=F(1)-F(0)$ với $F=\frac{x^3}{3}$ là nguyên hàm của $x^2$.`,
        R`The fundamental theorem of calculus says these two limits are inverse to each other: if $F$ has derivative $f$ then $\int_0^1 f=F(1)-F(0)$. Here is an example: $f(x)=x^2$ has derivative 2 at 1 and integral $\frac{1}{3}$ over $[0;1]$, and $\frac{1}{3}=F(1)-F(0)$ with $F=\frac{x^3}{3}$.`,
      )}
    >
      <Graph
        label={tt("Hai dãy số cùng co về giới hạn khi h nhỏ dần", "Two sequences heading for their limits as h shrinks")}
        draw={(ctx, w, hh) => {
          const { colors, map } = frame(ctx, w, hh, 0, 3, 0, 3.2, tt("−log₁₀ h", "−log₁₀ h"), "");
          dashed(ctx, map.x(0), map.y(2), map.x(3), map.y(2), colors.curve);
          dashed(ctx, map.x(0), map.y(1 / 3), map.x(3), map.y(1 / 3), colors.alt);
          pts.forEach((p) => { dot(ctx, map.x(p.ee), map.y(p.q), colors.curve, colors.bg, 3.5); dot(ctx, map.x(p.ee), map.y(p.s), colors.alt, colors.bg, 3.5); });
          dashed(ctx, map.x(e), map.y(0), map.x(e), map.y(3.2), colors.ink);
          label(ctx, tt("đạo hàm → 2", "derivative → 2"), map.x(1.9), map.y(2) - 8, colors.curve);
          label(ctx, tt("tích phân → 1/3", "integral → 1/3"), map.x(1.9), map.y(1 / 3) - 8, colors.alt);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Bước h nhỏ dần (10 mũ −)", "Step h shrinking (10 to the power −)")} value={e} min={0} max={3} step={0.1} onChange={setE} />
      </div>
    </Stage>
  );
}

/** Mỗi cầu nối ghi rõ nó nối những chuyên đề nào; chuyên đề nào có tên trong danh sách sẽ hiện hình đó. */
const BRIDGES: { id: string; topics: string[]; node: ReactNode }[] = [
  { id: "quad-deriv", topics: ["quadratic", "derivative", "survey"], node: <QuadDerivBridge /> },
  { id: "exp-deriv-int", topics: ["exp", "derivative", "integral"], node: <ExpBridge /> },
  { id: "trig-vec-analytic", topics: ["trig", "vector", "analytic"], node: <TrigVectorBridge /> },
  { id: "riemann-seq", topics: ["sequence", "integral", "limit"], node: <RiemannSeqBridge /> },
  { id: "pascal-bell", topics: ["combo", "probability", "integral"], node: <PascalBellBridge /> },
  { id: "cosine-vec", topics: ["triangle", "trig", "vector"], node: <CosineVectorBridge /> },
  { id: "three-ways", topics: ["ineq", "quadratic", "derivative"], node: <ThreeWaysBridge /> },
  { id: "two-limits", topics: ["limit", "derivative", "integral"], node: <TwoLimitsBridge /> },
];

export function BridgeFigures({ topicId }: { topicId: string }) {
  const mine = BRIDGES.filter((b) => b.topics.includes(topicId));
  const tt = useTx();
  if (mine.length === 0) return null;
  return (
    <>
      <h3 className="fz-bridge-title">{tt("Cầu nối: một ý, nhiều chuyên đề", "Bridges: one idea, several topics")}</h3>
      {mine.map((b) => <div key={b.id}>{b.node}</div>)}
    </>
  );
}
