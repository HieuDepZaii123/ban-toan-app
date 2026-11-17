import { useMemo, useState } from "react";
import { counterexampleSearch, hillClimbMin, meanChain, semicircleHeight } from "../../algo/index.ts";
import { dashed, dot, strokeFn } from "../../labs/draw.ts";
import { Graph } from "../../labs/Graph.tsx";
import { fmt } from "../../lib/format.ts";
import { freshSeed, mulberry32 } from "../../lib/prng.ts";
import { Slider } from "../../ui/Slider.tsx";
import { at, frame, label, line, useTx } from "./kit.ts";
import { Buttons, Stage } from "./widgets.tsx";

const R = String.raw;

/* ---------- 1. Xét hiệu: bản đồ nhiệt của «vế trái − vế phải» ---------- */

type Claim = { name: string; en: string; tex: string; diff: (a: number, b: number, c: number) => number; needsC?: boolean; posOnlyOk: boolean };

const CLAIMS: Claim[] = [
  { name: "a² + b² ≥ 2ab", en: "a² + b² ≥ 2ab", tex: "a^2+b^2-2ab=(a-b)^2", diff: (a, b) => a * a + b * b - 2 * a * b, posOnlyOk: true },
  { name: "(a + b)² ≥ 4ab", en: "(a + b)² ≥ 4ab", tex: "(a+b)^2-4ab=(a-b)^2", diff: (a, b) => (a + b) ** 2 - 4 * a * b, posOnlyOk: true },
  { name: "a³ + b³ ≥ a²b + ab²  (chỉ đúng khi a, b ≥ 0)", en: "a³ + b³ ≥ a²b + ab²  (true only for a, b ≥ 0)", tex: "a^3+b^3-a^2b-ab^2=(a+b)(a-b)^2", diff: (a, b) => a ** 3 + b ** 3 - a * a * b - a * b * b, posOnlyOk: true },
  { name: "a² + b² + c² ≥ ab + bc + ca  (c cố định)", en: "a² + b² + c² ≥ ab + bc + ca  (c fixed)", tex: "\\frac{1}{2}\\left[(a-b)^2+(b-c)^2+(c-a)^2\\right]", diff: (a, b, c) => a * a + b * b + c * c - a * b - b * c - c * a, needsC: true, posOnlyOk: true },
];

export function DiffHeatLab() {
  const tt = useTx();
  const [pick, setPick] = useState(0);
  const [posOnly, setPosOnly] = useState(false);
  const [c, setC] = useState(1);
  const s = at(CLAIMS, pick);
  const N = 60;
  const lo = -4;
  const hi = 4;
  let min = Infinity;
  let argA = 0;
  let argB = 0;
  const cells: { a: number; b: number; v: number }[] = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const a = lo + ((hi - lo) * (i + 0.5)) / N;
      const b = lo + ((hi - lo) * (j + 0.5)) / N;
      if (posOnly && (a < 0 || b < 0)) continue;
      const v = s.diff(a, b, c);
      cells.push({ a, b, v });
      if (v < min) { min = v; argA = a; argB = b; }
    }
  }
  const neg = cells.filter((q) => q.v < -1e-9).length;
  const vmax = Math.max(1, ...cells.map((q) => Math.abs(q.v)));
  return (
    <Stage
      title={tt("Xét hiệu: bản đồ «vế trái trừ vế phải»", "Look at the difference: a map of «left side minus right side»")}
      story={tt(
        R`Mọi bất đẳng thức đều quy về một câu hỏi: hiệu hai vế có bao giờ âm không? Máy tô mỗi điểm $(a;b)$ trên mặt phẳng: xanh nếu hiệu dương, cam nếu hiệu âm, và đường sáng là chỗ hiệu bằng 0. Nếu bất đẳng thức đúng thì cả bản đồ không có màu cam, và chỗ hiệu bằng 0 là dấu bằng. Hãy thử bật «chỉ xét a, b không âm» với bất đẳng thức bậc ba để thấy điều kiện quan trọng thế nào.`,
        R`Every inequality reduces to one question: is the difference of the two sides ever negative? The machine colours every point $(a;b)$ of the plane: green where the difference is positive, orange where it is negative, and the bright line is where it is zero. If the inequality is true the whole map has no orange, and the zero set is the equality case. Try switching on «only a, b ≥ 0» for the cubic inequality to see how much the condition matters.`,
      )}
      read={tt(
        `Hiệu $${s.tex}$. Trên ${cells.length} điểm đã thử: nhỏ nhất $${fmt(min, 4)}$ tại $(${fmt(argA, 2)};\\ ${fmt(argB, 2)})$; ${neg === 0 ? "không có điểm nào cho hiệu âm: bất đẳng thức đúng trên vùng này." : `có ${neg} điểm cho hiệu âm: bất đẳng thức SAI ở những chỗ này (vùng cam).`}`,
        `Difference $${s.tex}$. Over the ${cells.length} points tried: smallest $${fmt(min, 4)}$ at $(${fmt(argA, 2)};\\ ${fmt(argB, 2)})$; ${neg === 0 ? "no point gives a negative difference: the inequality holds on this region." : `${neg} points give a negative difference: the inequality is FALSE there (the orange region).`}`,
      )}
      why={tt(
        R`Mỗi hiệu đều viết được thành «tổng của những bình phương» hoặc «tích có dấu rõ ràng»: ví dụ $(a-b)^2$ hay $(a+b)(a-b)^2$. Bình phương thì không âm, nên hiệu không âm. Thừa số $(a+b)$ chỉ dương khi $a,b\ge 0$: đó là lý do bất đẳng thức bậc ba chỉ đúng với số không âm.`,
        R`Each difference can be written as a sum of squares or as a product with an obvious sign, such as $(a-b)^2$ or $(a+b)(a-b)^2$. A square is never negative, so the difference is not negative. The factor $(a+b)$ is only positive when $a,b\ge 0$, which is why the cubic inequality needs non-negative numbers.`,
      )}
    >
      <Graph
        label={tt("Bản đồ dấu của hiệu hai vế", "Sign map of the difference of the two sides")}
        draw={(ctx, w, h) => {
          const { colors, map } = frame(ctx, w, h, lo, hi, lo, hi, "a", "b");
          const half = (hi - lo) / N / 2;
          for (const q of cells) {
            ctx.fillStyle = q.v >= -1e-9 ? colors.curve : colors.alt;
            ctx.globalAlpha = q.v >= -1e-9 ? 0.12 + 0.55 * Math.min(1, q.v / vmax) : 0.25 + 0.5 * Math.min(1, -q.v / vmax);
            ctx.fillRect(map.x(q.a - half), map.y(q.b + half), map.x(q.a + half) - map.x(q.a - half) + 0.8, map.y(q.b - half) - map.y(q.b + half) + 0.8);
          }
          ctx.globalAlpha = 1;
          dot(ctx, map.x(argA), map.y(argB), colors.ink, colors.bg, 5);
          label(ctx, tt("chỗ thấp nhất", "lowest point"), map.x(argA) + 8, map.y(argB) - 8, colors.ink);
        }}
      />
      <div className="fz-controls">
        <label className="fz-pick">{tt("Bất đẳng thức", "Inequality")}
          <select value={pick} onChange={(e) => setPick(Number(e.target.value))}>{CLAIMS.map((q, i) => <option key={q.name} value={i}>{tt(q.name, q.en)}</option>)}</select>
        </label>
        <label className="fz-pick"><span>{tt("Chỉ xét a, b ≥ 0", "Only a, b ≥ 0")}</span>
          <input type="checkbox" checked={posOnly} onChange={(e) => setPosOnly(e.target.checked)} />
        </label>
        {s.needsC ? <Slider label="c" value={c} min={-3} max={3} step={0.25} onChange={setC} /> : null}
      </div>
    </Stage>
  );
}

/* ---------- 2. Bốn trung bình trên nửa đường tròn ---------- */

export function MeansLab() {
  const tt = useTx();
  const [a, setA] = useState(2);
  const [b, setB] = useState(8);
  const m = meanChain(a, b);
  const hGeo = semicircleHeight(a, b);
  const r = (a + b) / 2;
  return (
    <Stage
      title={tt("Bốn loại trung bình nằm trên một nửa đường tròn", "Four kinds of mean on one semicircle")}
      story={tt(
        R`Đặt hai đoạn nối nhau, dài $a$ và $b$, thành đường kính $a+b$ của một nửa đường tròn. Bán kính chính là trung bình cộng $\frac{a+b}{2}$. Từ điểm nối, dựng đoạn vuông góc lên tới đường tròn: độ cao đo được chính là trung bình nhân $\sqrt{ab}$. Đoạn vuông góc luôn thấp hơn bán kính, nên trung bình nhân không vượt trung bình cộng. Máy tính độ cao bằng phương trình đường tròn, không dùng $\sqrt{ab}$.`,
        R`Place two segments end to end, of lengths $a$ and $b$, to form the diameter $a+b$ of a semicircle. The radius is the arithmetic mean $\frac{a+b}{2}$. At the joint, raise a perpendicular up to the circle: its measured height is the geometric mean $\sqrt{ab}$. The perpendicular is never higher than the radius, so the geometric mean never exceeds the arithmetic mean. The machine computes the height from the circle equation, without using $\sqrt{ab}$.`,
      )}
      read={tt(
        `Độ cao đo bằng phương trình đường tròn: $${fmt(hGeo, 5)}$; $\\sqrt{ab}=${fmt(m.gm, 5)}$. Bán kính $\\frac{a+b}{2}=${fmt(m.am, 4)}$. Chuỗi: điều hòa $${fmt(m.hm, 3)}$ ≤ nhân $${fmt(m.gm, 3)}$ ≤ cộng $${fmt(m.am, 3)}$ ≤ bình phương $${fmt(m.qm, 3)}$. ${Math.abs(a - b) < 1e-9 ? "Khi $a=b$ cả bốn bằng nhau." : ""}`,
        `Height measured from the circle equation: $${fmt(hGeo, 5)}$; $\\sqrt{ab}=${fmt(m.gm, 5)}$. Radius $\\frac{a+b}{2}=${fmt(m.am, 4)}$. Chain: harmonic $${fmt(m.hm, 3)}$ ≤ geometric $${fmt(m.gm, 3)}$ ≤ arithmetic $${fmt(m.am, 3)}$ ≤ quadratic $${fmt(m.qm, 3)}$. ${Math.abs(a - b) < 1e-9 ? "When $a=b$ all four are equal." : ""}`,
      )}
      why={tt(
        R`Hai tam giác vuông trong hình đồng dạng, nên $\frac{h}{a}=\frac{b}{h}$, suy ra $h^2=ab$. Điểm nối nằm đúng chính giữa (cách tâm 0) khi $a=b$, lúc đó độ cao bằng bán kính: dấu bằng. Càng lệch xa chính giữa thì đoạn vuông góc càng thấp.`,
        R`The two right triangles in the picture are similar, so $\frac{h}{a}=\frac{b}{h}$, giving $h^2=ab$. The joint sits exactly at the centre when $a=b$, and then the height equals the radius: the equality case. The further the joint moves from the centre, the lower the perpendicular.`,
      )}
    >
      <Graph
        label={tt("Nửa đường tròn đường kính a + b", "Semicircle with diameter a + b")}
        draw={(ctx, w, h) => {
          const total = a + b;
          const { colors, map } = frame(ctx, w, h, -0.5, total + 0.5, -1, total / 2 + 1, "x", "y", true);
          ctx.beginPath();
          ctx.strokeStyle = colors.ink;
          ctx.lineWidth = 2;
          ctx.arc(map.x(r), map.y(0), map.x(r) - map.x(0), Math.PI, 0);
          ctx.stroke();
          line(ctx, map.x(0), map.y(0), map.x(a), map.y(0), colors.curve, 5);
          line(ctx, map.x(a), map.y(0), map.x(total), map.y(0), colors.alt, 5);
          line(ctx, map.x(a), map.y(0), map.x(a), map.y(hGeo), colors.curve, 2.6);
          line(ctx, map.x(r), map.y(0), map.x(r), map.y(r), colors.soft, 1.4);
          dashed(ctx, map.x(r), map.y(0), map.x(a), map.y(hGeo), colors.soft);
          dot(ctx, map.x(a), map.y(hGeo), colors.curve, colors.bg, 6);
          label(ctx, `a = ${fmt(a)}`, map.x(a / 2) - 14, map.y(0) + 18, colors.curve);
          label(ctx, `b = ${fmt(b)}`, map.x(a + b / 2) - 14, map.y(0) + 18, colors.alt);
          label(ctx, tt(`√(ab) = ${fmt(hGeo, 2)}`, `√(ab) = ${fmt(hGeo, 2)}`), map.x(a) + 8, map.y(hGeo / 2), colors.curve);
          label(ctx, tt(`bán kính = ${fmt(r, 2)}`, `radius = ${fmt(r, 2)}`), map.x(r) + 8, map.y(r) - 6, colors.soft);
        }}
      />
      <div className="fz-controls">
        <Slider label="a" value={a} min={0.5} max={10} step={0.5} onChange={setA} />
        <Slider label="b" value={b} min={0.5} max={10} step={0.5} onChange={setB} />
      </div>
    </Stage>
  );
}

/* ---------- 3. Chu vi cố định, diện tích lớn nhất ---------- */

export function RectangleLab() {
  const tt = useTx();
  const [mode, setMode] = useState<"area" | "perimeter">("area");
  const [S, setS] = useState(10);
  const [x, setX] = useState(2);
  const [K, setK] = useState(16);
  const path = useMemo(() => {
    const f = mode === "area" ? (t: number) => -(t * (S - t)) : (t: number) => 2 * (t + K / t);
    return hillClimbMin(f, mode === "area" ? 0.5 : 0.7, 0.05, mode === "area" ? S - 0.05 : 30, 1);
  }, [mode, S, K]);
  const best = at(path, path.length - 1);
  const side = mode === "area" ? x : x;
  const other = mode === "area" ? S - x : K / x;
  const val = mode === "area" ? side * other : 2 * (side + other);
  return (
    <Stage
      title={tt("Hình chữ nhật: cùng chu vi thì hình nào rộng nhất?", "Rectangles: with the same perimeter, which is the biggest?")}
      story={tt(
        R`Có một sợi dây dài cố định, uốn thành hình chữ nhật. Kéo một cạnh dài ra thì cạnh kia ngắn lại, diện tích lúc tăng lúc giảm. Người leo đồi bịt mắt tìm chỗ diện tích lớn nhất: nó dừng đúng khi hai cạnh bằng nhau, tức hình vuông. Chế độ thứ hai làm ngược lại: cố định diện tích và tìm chu vi nhỏ nhất.`,
        R`Take a fixed length of string and bend it into a rectangle. Stretch one side and the other shrinks, so the area goes up and down. A blindfolded hill climber looking for the largest area stops exactly when the two sides are equal: a square. The second mode does the reverse: fix the area and look for the smallest perimeter.`,
      )}
      read={mode === "area"
        ? tt(
          `Nửa chu vi $x+y=${fmt(S)}$. Cạnh $x=${fmt(x, 2)}$ thì $y=${fmt(other, 2)}$, diện tích $${fmt(val, 3)}$. Người leo đồi dừng ở $x=${fmt(best.x, 3)}$, diện tích $${fmt(-best.y, 3)}$. Bất đẳng thức cho $xy\\le\\frac{(x+y)^2}{4}=${fmt((S * S) / 4, 3)}$.`,
          `Half-perimeter $x+y=${fmt(S)}$. With $x=${fmt(x, 2)}$, $y=${fmt(other, 2)}$ and the area is $${fmt(val, 3)}$. The hill climber stops at $x=${fmt(best.x, 3)}$ with area $${fmt(-best.y, 3)}$. The inequality gives $xy\\le\\frac{(x+y)^2}{4}=${fmt((S * S) / 4, 3)}$.`,
        )
        : tt(
          `Diện tích $xy=${fmt(K)}$. Cạnh $x=${fmt(x, 2)}$ thì $y=${fmt(other, 2)}$, chu vi $${fmt(val, 3)}$. Người leo đồi dừng ở $x=${fmt(best.x, 3)}$, chu vi $${fmt(best.y, 3)}$. Cauchy cho $x+y\\ge 2\\sqrt{xy}=${fmt(2 * Math.sqrt(K), 3)}$, chu vi nhỏ nhất $${fmt(4 * Math.sqrt(K), 3)}$.`,
          `Area $xy=${fmt(K)}$. With $x=${fmt(x, 2)}$, $y=${fmt(other, 2)}$ and the perimeter is $${fmt(val, 3)}$. The hill climber stops at $x=${fmt(best.x, 3)}$ with perimeter $${fmt(best.y, 3)}$. Cauchy gives $x+y\\ge 2\\sqrt{xy}=${fmt(2 * Math.sqrt(K), 3)}$, so the smallest perimeter is $${fmt(4 * Math.sqrt(K), 3)}$.`,
        )}
      why={tt(
        R`Tổng hai số không đổi thì tích lớn nhất khi hai số bằng nhau; tích không đổi thì tổng nhỏ nhất khi hai số bằng nhau. Cả hai đều là bất đẳng thức Cauchy $\sqrt{xy}\le\frac{x+y}{2}$ với dấu bằng khi $x=y$.`,
        R`If the sum of two numbers is fixed, their product is largest when they are equal; if their product is fixed, their sum is smallest when they are equal. Both are the Cauchy inequality $\sqrt{xy}\le\frac{x+y}{2}$, with equality when $x=y$.`,
      )}
    >
      <div className="fz-pair">
        <Graph
          label={tt("Hình chữ nhật", "The rectangle")}
          draw={(ctx, w, h) => {
            const { colors } = frame(ctx, w, h, 0, 1, 0, 1);
            ctx.clearRect(0, 0, w, h);
            ctx.fillStyle = colors.bg;
            ctx.fillRect(0, 0, w, h);
            const big = Math.max(side, other, 1);
            const k = Math.min(w - 40, h - 40) / big;
            const rw = Math.min(w - 30, side * k);
            const rh = Math.min(h - 30, other * k);
            ctx.fillStyle = colors.curve;
            ctx.globalAlpha = 0.3;
            ctx.fillRect(20, h - 20 - rh, rw, rh);
            ctx.globalAlpha = 1;
            ctx.strokeStyle = colors.ink;
            ctx.lineWidth = 2;
            ctx.strokeRect(20, h - 20 - rh, rw, rh);
            label(ctx, `x = ${fmt(side, 2)}`, 24, h - 24 - rh - 4, colors.ink);
            label(ctx, `y = ${fmt(other, 2)}`, 26 + rw, h - 20 - rh / 2, colors.ink);
          }}
        />
        <Graph
          label={tt("Đại lượng theo x", "The quantity as a function of x")}
          draw={(ctx, w, h) => {
            const x1 = mode === "area" ? S : 10;
            const { colors, map, pad } = frame(ctx, w, h, 0, x1, 0, mode === "area" ? (S * S) / 4 * 1.2 : 40, "x", "");
            const g = (t: number) => (mode === "area" ? t * (S - t) : 2 * (t + K / t));
            strokeFn(ctx, map, w, h, pad, 0.05, x1 - 0.01, g, colors.curve, 2.4);
            dot(ctx, map.x(x), map.y(g(x)), colors.ink, colors.bg, 6);
            dot(ctx, map.x(best.x), map.y(mode === "area" ? -best.y : best.y), colors.alt, colors.bg, 7);
          }}
        />
      </div>
      <div className="fz-controls">
        <label className="fz-pick">{tt("Bài toán", "Problem")}
          <select value={mode} onChange={(e) => { const m = e.target.value as "area" | "perimeter"; setMode(m); setX(m === "area" ? 2 : 2); }}>
            <option value="area">{tt("chu vi cố định → diện tích lớn nhất", "fixed perimeter → largest area")}</option>
            <option value="perimeter">{tt("diện tích cố định → chu vi nhỏ nhất", "fixed area → smallest perimeter")}</option>
          </select>
        </label>
        {mode === "area"
          ? <Slider label={tt("Nửa chu vi S", "Half-perimeter S")} value={S} min={4} max={20} step={1} onChange={(v) => { setS(v); setX(Math.min(x, v - 0.5)); }} />
          : <Slider label={tt("Diện tích K", "Area K")} value={K} min={4} max={36} step={1} onChange={setK} />}
        <Slider label={tt("Cạnh x", "Side x")} value={x} min={0.5} max={mode === "area" ? S - 0.5 : 10} step={0.25} onChange={setX} />
      </div>
    </Stage>
  );
}

/* ---------- 4. Cauchy–Schwarz: tích vô hướng và hình bình hành ---------- */

export function CauchyVecLab() {
  const tt = useTx();
  const [lu, setLu] = useState(3);
  const [lv, setLv] = useState(2.5);
  const [ang, setAng] = useState(0.9);
  const u = { x: lu, y: 0 };
  const v = { x: lv * Math.cos(ang), y: lv * Math.sin(ang) };
  const dotp = u.x * v.x + u.y * v.y;
  const cross = u.x * v.y - u.y * v.x;
  const prod = lu * lv;
  return (
    <Stage
      title={tt("Cauchy–Schwarz: tích vô hướng không vượt tích hai độ dài", "Cauchy–Schwarz: the dot product never exceeds the product of the lengths")}
      story={tt(
        R`Với hai vectơ $u=(a;b)$ và $v=(x;y)$, bất đẳng thức nói $(ax+by)^2\le(a^2+b^2)(x^2+y^2)$. Ý nghĩa hình học: tích vô hướng là $|u||v|\cos\varphi$, mà $\cos\varphi\le 1$. Phần chênh lệch giữa hai vế là $(ay-bx)^2$, đúng bằng bình phương diện tích hình bình hành dựng trên $u$ và $v$ (tô màu). Hai vectơ cùng phương thì hình bình hành dẹt lại, diện tích 0: dấu bằng.`,
        R`For two vectors $u=(a;b)$ and $v=(x;y)$ the inequality says $(ax+by)^2\le(a^2+b^2)(x^2+y^2)$. Geometrically the dot product is $|u||v|\cos\varphi$ and $\cos\varphi\le 1$. The gap between the two sides is $(ay-bx)^2$, exactly the square of the area of the parallelogram spanned by $u$ and $v$ (shaded). When the vectors are parallel the parallelogram flattens to area 0: the equality case.`,
      )}
      read={tt(
        `$u\\cdot v=${fmt(dotp, 4)}$; $|u||v|=${fmt(prod, 4)}$ nên $|u\\cdot v|\\le|u||v|$ ${Math.abs(dotp) <= prod + 1e-9 ? "đúng" : "sai"}. Vế phải trừ vế trái: $(|u||v|)^2-(u\\cdot v)^2=${fmt(prod * prod - dotp * dotp, 4)}$ và diện tích hình bình hành bình phương $(ay-bx)^2=${fmt(cross * cross, 4)}$: bằng nhau.`,
        `$u\\cdot v=${fmt(dotp, 4)}$; $|u||v|=${fmt(prod, 4)}$, so $|u\\cdot v|\\le|u||v|$ is ${Math.abs(dotp) <= prod + 1e-9 ? "true" : "false"}. Right side minus left side: $(|u||v|)^2-(u\\cdot v)^2=${fmt(prod * prod - dotp * dotp, 4)}$ and the squared parallelogram area $(ay-bx)^2=${fmt(cross * cross, 4)}$: equal.`,
      )}
      why={tt(
        R`Khai triển trực tiếp: $(a^2+b^2)(x^2+y^2)-(ax+by)^2=a^2y^2-2abxy+b^2x^2=(ay-bx)^2\ge 0$. Một bình phương thì không âm, nên bất đẳng thức đúng, và dấu bằng khi $ay=bx$, tức hai vectơ cùng phương.`,
        R`Expanding directly: $(a^2+b^2)(x^2+y^2)-(ax+by)^2=a^2y^2-2abxy+b^2x^2=(ay-bx)^2\ge 0$. A square is not negative, so the inequality holds, with equality when $ay=bx$, i.e. when the vectors are parallel.`,
      )}
    >
      <Graph
        label={tt("Hai vectơ và hình bình hành dựng trên chúng", "Two vectors and the parallelogram they span")}
        draw={(ctx, w, h) => {
          const { colors, map } = frame(ctx, w, h, -1, 7, -1.5, 4.5, "x", "y", true);
          ctx.beginPath();
          ctx.moveTo(map.x(0), map.y(0));
          ctx.lineTo(map.x(u.x), map.y(u.y));
          ctx.lineTo(map.x(u.x + v.x), map.y(u.y + v.y));
          ctx.lineTo(map.x(v.x), map.y(v.y));
          ctx.closePath();
          ctx.fillStyle = colors.alt;
          ctx.globalAlpha = 0.25;
          ctx.fill();
          ctx.globalAlpha = 1;
          line(ctx, map.x(0), map.y(0), map.x(u.x), map.y(u.y), colors.curve, 3);
          line(ctx, map.x(0), map.y(0), map.x(v.x), map.y(v.y), colors.alt, 3);
          dot(ctx, map.x(u.x), map.y(u.y), colors.curve, colors.bg, 6);
          dot(ctx, map.x(v.x), map.y(v.y), colors.alt, colors.bg, 6);
          label(ctx, "u", map.x(u.x) + 8, map.y(u.y) + 14, colors.curve);
          label(ctx, "v", map.x(v.x) + 8, map.y(v.y) - 6, colors.alt);
          label(ctx, tt(`diện tích = ${fmt(Math.abs(cross), 2)}`, `area = ${fmt(Math.abs(cross), 2)}`), map.x((u.x + v.x) / 2) - 30, map.y((u.y + v.y) / 2), colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Độ dài u", "Length of u")} value={lu} min={0.5} max={5} step={0.25} onChange={setLu} />
        <Slider label={tt("Độ dài v", "Length of v")} value={lv} min={0.5} max={5} step={0.25} onChange={setLv} />
        <Slider label={tt("Góc giữa hai vectơ (rad)", "Angle between the vectors (rad)")} value={ang} min={0} max={3.14} step={0.02} onChange={setAng} />
      </div>
    </Stage>
  );
}

/* ---------- 5. Bất đẳng thức tam giác ---------- */

export function TriIneqLab() {
  const tt = useTx();
  const [lu, setLu] = useState(3);
  const [lv, setLv] = useState(2);
  const [ang, setAng] = useState(1.2);
  const u = { x: lu, y: 0 };
  const v = { x: lv * Math.cos(ang), y: lv * Math.sin(ang) };
  const sum = { x: u.x + v.x, y: u.y + v.y };
  const len = Math.hypot(sum.x, sum.y);
  return (
    <Stage
      title={tt("Đường thẳng là đường ngắn nhất: bất đẳng thức tam giác", "A straight line is the shortest path: the triangle inequality")}
      story={tt(
        R`Đi từ gốc theo vectơ $u$ rồi theo vectơ $v$ (nối đuôi). Đi thẳng từ gốc tới đích là vectơ $u+v$. Hiển nhiên đi thẳng ngắn hơn đi vòng, nên $|u+v|\le|u|+|v|$. Chỉ khi hai vectơ cùng hướng thì đường vòng chính là đường thẳng. Kéo góc về 0 để thấy dấu bằng, kéo về 180° để thấy hai bước triệt tiêu nhau.`,
        R`Walk from the origin along $u$, then along $v$ (end to end). Going straight from the start to the finish is the vector $u+v$. Walking straight is obviously shorter than taking the detour, so $|u+v|\le|u|+|v|$. Only when the two vectors point the same way does the detour coincide with the straight line. Drag the angle to 0 to see equality, and to 180° to see the two steps cancel.`,
      )}
      read={tt(
        `$|u|+|v|=${fmt(lu + lv, 4)}$ (đi vòng). $|u+v|=${fmt(len, 4)}$ (đi thẳng). ${len <= lu + lv + 1e-9 ? "Đúng: đi thẳng không dài hơn." : "Sai."} Cũng có $\\big||u|-|v|\\big|=${fmt(Math.abs(lu - lv), 4)}\\le|u+v|$. Khi hai vectơ ngược hướng, $|u+v|=${fmt(Math.abs(lu - lv), 4)}$.`,
        `$|u|+|v|=${fmt(lu + lv, 4)}$ (the detour). $|u+v|=${fmt(len, 4)}$ (the straight path). ${len <= lu + lv + 1e-9 ? "True: the straight path is not longer." : "False."} Also $\\big||u|-|v|\\big|=${fmt(Math.abs(lu - lv), 4)}\\le|u+v|$. When the vectors point in opposite directions, $|u+v|=${fmt(Math.abs(lu - lv), 4)}$.`,
      )}
      why={tt(
        R`Bình phương độ dài: $|u+v|^2=|u|^2+2u\cdot v+|v|^2$, mà $u\cdot v\le|u||v|$ nên $|u+v|^2\le(|u|+|v|)^2$. Lấy căn hai vế (cả hai đều không âm) được bất đẳng thức tam giác. Dấu bằng khi $u\cdot v=|u||v|$, tức hai vectơ cùng hướng.`,
        R`Squaring the length: $|u+v|^2=|u|^2+2u\cdot v+|v|^2$, and $u\cdot v\le|u||v|$, so $|u+v|^2\le(|u|+|v|)^2$. Taking square roots (both sides are non-negative) gives the triangle inequality. Equality holds when $u\cdot v=|u||v|$, i.e. when the vectors point the same way.`,
      )}
    >
      <Graph
        label={tt("Đi vòng theo hai vectơ so với đi thẳng", "Two steps versus one straight step")}
        draw={(ctx, w, h) => {
          const { colors, map } = frame(ctx, w, h, -3, 6, -1, 4, "x", "y", true);
          line(ctx, map.x(0), map.y(0), map.x(u.x), map.y(u.y), colors.curve, 3);
          line(ctx, map.x(u.x), map.y(u.y), map.x(sum.x), map.y(sum.y), colors.alt, 3);
          line(ctx, map.x(0), map.y(0), map.x(sum.x), map.y(sum.y), colors.ink, 3);
          dot(ctx, map.x(0), map.y(0), colors.ink, colors.bg, 6);
          dot(ctx, map.x(u.x), map.y(u.y), colors.curve, colors.bg, 5);
          dot(ctx, map.x(sum.x), map.y(sum.y), colors.alt, colors.bg, 6);
          label(ctx, `u = ${fmt(lu)}`, map.x(u.x / 2) - 10, map.y(0) + 18, colors.curve);
          label(ctx, `v = ${fmt(lv)}`, map.x(u.x + v.x / 2) + 8, map.y(v.y / 2), colors.alt);
          label(ctx, `|u+v| = ${fmt(len, 2)}`, map.x(sum.x / 2) - 40, map.y(sum.y / 2) - 8, colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Độ dài u", "Length of u")} value={lu} min={0.5} max={5} step={0.25} onChange={setLu} />
        <Slider label={tt("Độ dài v", "Length of v")} value={lv} min={0.5} max={5} step={0.25} onChange={setLv} />
        <Slider label={tt("Góc giữa u và v (rad)", "Angle between u and v (rad)")} value={ang} min={0} max={3.14} step={0.02} onChange={setAng} />
      </div>
    </Stage>
  );
}

/* ---------- 6. Săn phản ví dụ: thử ngẫu nhiên ---------- */

type Rule = { vi: string; en: string; tex: string; diff: (p: number[]) => number; dims: number; lo: number; hi: number; holds: boolean };

const RULES: Rule[] = [
  { vi: "a² + b² ≥ 2ab  với mọi a, b", en: "a² + b² ≥ 2ab  for all a, b", tex: "a^2+b^2-2ab", diff: ([a, b]) => (a as number) ** 2 + (b as number) ** 2 - 2 * (a as number) * (b as number), dims: 2, lo: -10, hi: 10, holds: true },
  { vi: "(a + b)/2 ≥ √(ab)  với a, b > 0", en: "(a + b)/2 ≥ √(ab)  for a, b > 0", tex: "\\frac{a+b}{2}-\\sqrt{ab}", diff: ([a, b]) => ((a as number) + (b as number)) / 2 - Math.sqrt((a as number) * (b as number)), dims: 2, lo: 0, hi: 10, holds: true },
  { vi: "x + 1/x ≥ 2  với mọi x ≠ 0", en: "x + 1/x ≥ 2  for all x ≠ 0", tex: "x+\\frac{1}{x}-2", diff: ([x]) => (x as number) + 1 / (x as number) - 2, dims: 1, lo: -5, hi: 5, holds: false },
  { vi: "x + 1/x ≥ 2  với x > 0", en: "x + 1/x ≥ 2  for x > 0", tex: "x+\\frac{1}{x}-2", diff: ([x]) => (x as number) + 1 / (x as number) - 2, dims: 1, lo: 0.0001, hi: 5, holds: true },
  { vi: "a³ + b³ ≥ a²b + ab²  với mọi a, b", en: "a³ + b³ ≥ a²b + ab²  for all a, b", tex: "a^3+b^3-a^2b-ab^2", diff: ([a, b]) => (a as number) ** 3 + (b as number) ** 3 - (a as number) ** 2 * (b as number) - (a as number) * (b as number) ** 2, dims: 2, lo: -5, hi: 5, holds: false },
  { vi: "a³ + b³ ≥ a²b + ab²  với a, b ≥ 0", en: "a³ + b³ ≥ a²b + ab²  for a, b ≥ 0", tex: "a^3+b^3-a^2b-ab^2", diff: ([a, b]) => (a as number) ** 3 + (b as number) ** 3 - (a as number) ** 2 * (b as number) - (a as number) * (b as number) ** 2, dims: 2, lo: 0, hi: 5, holds: true },
];

export function CounterexampleLab() {
  const tt = useTx();
  const [pick, setPick] = useState(2);
  const [exp, setExp] = useState(2);
  const [seed, setSeed] = useState(11);
  const rule = at(RULES, pick);
  const n = Math.round(10 ** exp);
  const res = useMemo(() => counterexampleSearch(rule.diff, rule.dims, rule.lo, rule.hi, n, mulberry32(seed)), [rule, n, seed]);
  return (
    <Stage
      title={tt("Săn phản ví dụ: thử ngẫu nhiên có chứng minh được không?", "Hunting for counterexamples: can random tests prove anything?")}
      story={tt(
        R`Một cách thử bất đẳng thức là chọn thật nhiều số ngẫu nhiên rồi xem vế trái trừ vế phải có âm không. Nếu tìm được một điểm âm, đó là phản ví dụ và bất đẳng thức sai. Nhưng nếu thử 100000 lần mà không thấy âm thì chưa kết luận được là đúng: máy chỉ mạnh hơn lời khẳng định bằng cách tìm lỗi, không phải bằng cách chứng minh. Đó là lý do toán học cần chứng minh, và cần điều kiện đi kèm (như $a,b\ge 0$).`,
        R`One way to test an inequality is to try many random numbers and see whether the left side minus the right side is ever negative. A single negative point is a counterexample and the inequality is false. But trying 100000 numbers without finding one does not prove it true: the machine can only hunt for mistakes, not prove anything. That is why mathematics needs proofs, and needs conditions such as $a,b\ge 0$.`,
      )}
      read={tt(
        `Đã thử ${res.tried} điểm trong $[${fmt(rule.lo, 3)};\\ ${fmt(rule.hi, 1)}]$. Hiệu nhỏ nhất tìm được $${fmt(res.min, 5)}$. ${res.counter ? `PHẢN VÍ DỤ: ${res.counter.map((q) => fmt(q, 3)).join("; ")} cho hiệu âm: bất đẳng thức sai.` : "Chưa thấy phản ví dụ."} Sự thật (đã chứng minh): bất đẳng thức này ${rule.holds ? "ĐÚNG" : "SAI"}${!rule.holds && !res.counter ? " nhưng thử ít quá nên chưa bắt được: thử thêm" : ""}.`,
        `Tried ${res.tried} points in $[${fmt(rule.lo, 3)};\\ ${fmt(rule.hi, 1)}]$. Smallest difference found $${fmt(res.min, 5)}$. ${res.counter ? `COUNTEREXAMPLE: ${res.counter.map((q) => fmt(q, 3)).join("; ")} gives a negative difference: the inequality is false.` : "No counterexample yet."} The truth (proved): this inequality is ${rule.holds ? "TRUE" : "FALSE"}${!rule.holds && !res.counter ? " but too few tests were run to catch it: try more" : ""}.`,
      )}
      why={tt(
        R`Muốn chắc chắn một bất đẳng thức đúng, hãy chứng minh: xét hiệu rồi viết thành bình phương hoặc tích có dấu rõ ràng. Thử số chỉ giúp phát hiện sai và đoán dấu bằng. Hãy so $x+\frac{1}{x}\ge 2$ với mọi $x\ne 0$ (sai khi $x<0$) và với $x>0$ (đúng).`,
        R`To be sure an inequality is true, prove it: look at the difference and write it as a square or as a product with a clear sign. Testing numbers only helps to detect mistakes and to guess the equality case. Compare $x+\frac{1}{x}\ge 2$ for all $x\ne 0$ (false for $x<0$) with the version for $x>0$ (true).`,
      )}
    >
      <Graph
        label={tt("Điểm thử và điểm cho hiệu nhỏ nhất", "Tested points and the point with the smallest difference")}
        draw={(ctx, w, h) => {
          if (rule.dims === 1) {
            const { colors, map, pad } = frame(ctx, w, h, Math.min(rule.lo, -0.2), rule.hi, -6, 12);
            strokeFn(ctx, map, w, h, pad, Math.max(rule.lo, 0.05), rule.hi, (q) => rule.diff([q]), colors.curve, 2.2);
            if (rule.lo < 0) strokeFn(ctx, map, w, h, pad, rule.lo, -0.05, (q) => rule.diff([q]), colors.curve, 2.2);
            dashed(ctx, map.x(rule.lo), map.y(0), map.x(rule.hi), map.y(0), colors.alt);
            dot(ctx, map.x(res.at[0] as number), map.y(res.min), colors.alt, colors.bg, 6);
            if (res.counter) dot(ctx, map.x(res.counter[0] as number), map.y(rule.diff(res.counter)), colors.ink, colors.bg, 7);
          } else {
            const { colors, map } = frame(ctx, w, h, rule.lo, rule.hi, rule.lo, rule.hi, "a", "b");
            const r = mulberry32(seed);
            for (let i = 0; i < Math.min(n, 1500); i++) {
              const a = rule.lo + r() * (rule.hi - rule.lo);
              const b = rule.lo + r() * (rule.hi - rule.lo);
              ctx.fillStyle = rule.diff([a, b]) < -1e-12 ? colors.alt : colors.curve;
              ctx.globalAlpha = rule.diff([a, b]) < -1e-12 ? 0.9 : 0.35;
              ctx.fillRect(map.x(a) - 1.5, map.y(b) - 1.5, 3, 3);
            }
            ctx.globalAlpha = 1;
            dot(ctx, map.x(res.at[0] as number), map.y(res.at[1] as number), colors.ink, colors.bg, 6);
          }
        }}
      />
      <div className="fz-controls">
        <label className="fz-pick">{tt("Khẳng định", "Claim")}
          <select value={pick} onChange={(e) => setPick(Number(e.target.value))}>{RULES.map((q, i) => <option key={q.vi} value={i}>{tt(q.vi, q.en)}</option>)}</select>
        </label>
        <Slider label={tt("Số điểm thử (10 mũ)", "Number of tests (power of 10)")} value={exp} min={0} max={5} step={0.5} onChange={setExp} />
      </div>
      <Buttons><button type="button" className="text-btn" onClick={() => setSeed(freshSeed() % 100000)}>{tt("Thử lại với số khác", "Run again with other numbers")}</button></Buttons>
    </Stage>
  );
}
