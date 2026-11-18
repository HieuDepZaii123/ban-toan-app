import { useMemo, useState } from "react";
import { countSolutions, criticalPoints, findRoots, variationTable, type Fn } from "../../algo/index.ts";
import { dashed, dot, strokeFn } from "../../labs/draw.ts";
import { Graph } from "../../labs/Graph.tsx";
import { fmt } from "../../lib/format.ts";
import { Slider } from "../../ui/Slider.tsx";
import { at, frame, label, useTx } from "./kit.ts";
import { Stage } from "./widgets.tsx";

const R = String.raw;

/* ---------- 1. Bảng biến thiên do máy lập ---------- */

type Piece = { cuts: number[]; signs: (1 | -1)[]; values: number[] };

const SHOW = [
  { vi: "x³ − 3x  (bậc ba, có cực trị)", en: "x³ − 3x  (cubic with extrema)", f: (x: number) => x ** 3 - 3 * x, pieces: [[-3, 3]] as [number, number][], asym: null as number | null, y0: -6, y1: 6 },
  { vi: "x⁴ − 4x² + 1  (trùng phương)", en: "x⁴ − 4x² + 1  (biquadratic)", f: (x: number) => x ** 4 - 4 * x * x + 1, pieces: [[-3, 3]] as [number, number][], asym: null, y0: -5, y1: 8 },
  { vi: "(2x + 1)/(x − 1)  (phân thức)", en: "(2x + 1)/(x − 1)  (rational)", f: (x: number) => (2 * x + 1) / (x - 1), pieces: [[-7, 0.98], [1.02, 9]] as [number, number][], asym: 1, y0: -7, y1: 9 },
  { vi: "x³ + x  (luôn đồng biến)", en: "x³ + x  (always increasing)", f: (x: number) => x ** 3 + x, pieces: [[-2.5, 2.5]] as [number, number][], asym: null, y0: -8, y1: 8 },
];

export function VariationTableLab() {
  const tt = useTx();
  const [pick, setPick] = useState(0);
  const s = at(SHOW, pick);
  const tables: Piece[] = s.pieces.map(([a, b]) => variationTable(s.f, a, b));
  const cell = (v: number) => (Math.abs(v) > 40 ? (v > 0 ? "+∞" : "−∞") : fmt(v, 2));
  return (
    <Stage
      title={tt("Bảng biến thiên do máy lập: đọc đường cong bằng độ dốc", "A variation table built by the machine: reading a curve through its slope")}
      story={tt(
        R`Khảo sát hàm số quy về một bảng nhỏ. Máy làm đúng các bước ấy: tìm chỗ độ dốc $y'=0$ (điểm tới hạn), thử một điểm giữa mỗi khoảng để biết dấu của $y'$, rồi suy ra mũi tên: $y'>0$ thì hàm đi lên, $y'<0$ thì đi xuống. Bảng nằm ngay dưới đồ thị: mỗi cột của bảng là một chỗ quay đầu hoặc một khoảng đơn điệu.`,
        R`Studying a function boils down to a small table. The machine follows the same steps: find where the slope $y'=0$ (critical points), test one point inside each interval to get the sign of $y'$, then deduce the arrows: $y'>0$ means rising, $y'<0$ means falling. The table sits right under the graph: each column of the table is a turning point or a monotonic interval.`,
      )}
      read={tt(
        `Máy tìm được ${tables.reduce((c, t) => c + t.cuts.length - 2, 0)} điểm tới hạn${s.asym !== null ? ` và tiệm cận đứng $x=${s.asym}$ (mẫu bằng 0)` : ""}. ${tables.map((t) => t.signs.map((g, i) => `trên $(${cell(t.cuts[i] as number).replace("−∞", "-\\\\infty")};\\ ${cell(t.cuts[i + 1] as number)})$: $y'${g > 0 ? ">0$ tăng" : "<0$ giảm"}`).join("; ")).join(" | ")}.`,
        `The machine finds ${tables.reduce((c, t) => c + t.cuts.length - 2, 0)} critical points${s.asym !== null ? ` and the vertical asymptote $x=${s.asym}$ (the denominator is zero)` : ""}. ${tables.map((t) => t.signs.map((g, i) => `on $(${cell(t.cuts[i] as number).replace("−∞", "-\\\\infty")};\\ ${cell(t.cuts[i + 1] as number)})$: $y'${g > 0 ? ">0$ increasing" : "<0$ decreasing"}`).join("; ")).join(" | ")}.`,
      )}
      why={tt(
        R`Một hàm chỉ có thể đổi chiều biến thiên ở chỗ $y'=0$ hoặc $y'$ không xác định, nên chỉ cần xét dấu $y'$ ở một điểm trong mỗi khoảng giữa các chỗ đó. Cực đại là chỗ $y'$ đổi từ dương sang âm, cực tiểu là chỗ đổi từ âm sang dương. Hàm không có cực trị nếu $y'$ không bao giờ đổi dấu, như $x^3+x$.`,
        R`A function can only change direction where $y'=0$ or $y'$ is undefined, so it suffices to test the sign of $y'$ at one point inside each interval between those places. A maximum is where $y'$ changes from positive to negative, a minimum where it changes from negative to positive. There is no extremum if $y'$ never changes sign, like $x^3+x$.`,
      )}
    >
      <Graph
        label={tt("Đồ thị tô màu theo dấu của y'", "The graph coloured by the sign of y'")}
        draw={(ctx, w, h) => {
          const { colors, map, pad } = frame(ctx, w, h, -7, 9, s.y0, s.y1);
          for (const t of tables) for (let i = 0; i < t.signs.length; i++) {
            const a = t.cuts[i] as number; const b = t.cuts[i + 1] as number;
            ctx.save(); ctx.beginPath(); ctx.rect(map.x(-7), map.y(s.y1), map.x(9) - map.x(-7), map.y(s.y0) - map.y(s.y1)); ctx.clip();
            strokeFn(ctx, map, w, h, pad, a, b, s.f, t.signs[i] === 1 ? colors.curve : colors.alt, 3);
            ctx.restore();
          }
          if (s.asym !== null) dashed(ctx, map.x(s.asym), map.y(s.y0), map.x(s.asym), map.y(s.y1), colors.soft);
          for (const t of tables) for (let i = 1; i < t.cuts.length - 1; i++) dot(ctx, map.x(t.cuts[i] as number), map.y(t.values[i] as number), colors.ink, colors.bg, 6);
        }}
      />
      <div className="fz-vt" role="table" aria-label={tt("Bảng biến thiên", "Variation table")}>
        {tables.map((t, ti) => (
          <div key={ti} className="fz-vt-piece">
            {t.cuts.map((x, i) => (
              <div key={i} className="fz-vt-col">
                <div className="fz-vt-x">{i === 0 || i === t.cuts.length - 1 ? (Math.abs(x) > 6.5 ? (x < 0 ? "−∞" : "+∞") : s.asym !== null && Math.abs(x - s.asym) < 0.1 ? `${s.asym}` : fmt(x, 1)) : fmt(x, 2)}</div>
                <div className="fz-vt-y">{cell(t.values[i] as number)}</div>
                {i < t.signs.length ? <div className={t.signs[i] === 1 ? "fz-vt-up" : "fz-vt-down"}>{t.signs[i] === 1 ? "↗ y′>0" : "↘ y′<0"}</div> : null}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="fz-controls">
        <label className="fz-pick">{tt("Hàm số", "Function")}
          <select value={pick} onChange={(e) => setPick(Number(e.target.value))}>{SHOW.map((q, i) => <option key={q.vi} value={i}>{tt(q.vi, q.en)}</option>)}</select>
        </label>
      </div>
    </Stage>
  );
}

/* ---------- 2. Hàm bậc ba: hai cực trị hay không, tâm đối xứng ---------- */

export function CubicTypesLab() {
  const tt = useTx();
  const [a0, setA] = useState(1);
  const [b, setB] = useState(0);
  const [c, setC] = useState(-3);
  const [d, setD] = useState(0);
  const a = Math.abs(a0) < 0.25 ? 0.25 : a0;
  const f = (x: number) => a * x ** 3 + b * x * x + c * x + d;
  const dp = b * b - 3 * a * c;
  const crit = criticalPoints(f, -8, 8);
  const h = -b / (3 * a);
  const k = f(h);
  let asym = 0;
  for (const t of [0.5, 1, 2, 3]) asym = Math.max(asym, Math.abs(f(h + t) + f(h - t) - 2 * k));
  return (
    <Stage
      title={tt("Hàm bậc ba: có hai cực trị hay không, và tâm đối xứng", "The cubic: two extrema or none, and its centre of symmetry")}
      story={tt(
        R`Đạo hàm của hàm bậc ba là một tam thức bậc hai $y'=3ax^2+2bx+c$, nên số cực trị phụ thuộc biệt thức thu gọn $\Delta'=b^2-3ac$: dương thì $y'$ đổi dấu hai lần (đồ thị lượn một đỉnh và một đáy), không dương thì $y'$ không đổi dấu (đồ thị đi thẳng một mạch). Có cực trị hay không, đồ thị vẫn luôn nhận điểm uốn làm tâm đối xứng. Máy kiểm tâm đối xứng bằng số.`,
        R`The derivative of a cubic is a quadratic $y'=3ax^2+2bx+c$, so the number of extrema depends on the reduced discriminant $\Delta'=b^2-3ac$: positive means $y'$ changes sign twice (the graph wiggles through one peak and one valley), non-positive means $y'$ never changes sign (the graph runs straight through). Whether or not there are extrema, the graph always has its inflection point as a centre of symmetry. The machine checks the symmetry numerically.`,
      )}
      read={tt(
        `$y=${fmt(a, 2)}x^3${b < 0 ? "-" : "+"}${fmt(Math.abs(b), 2)}x^2${c < 0 ? "-" : "+"}${fmt(Math.abs(c), 2)}x${d < 0 ? "-" : "+"}${fmt(Math.abs(d), 2)}$. $\\Delta'=b^2-3ac=${fmt(dp, 3)}$: ${dp > 0 ? "hai cực trị" : "không có cực trị"}. Máy tìm được ${crit.length} điểm tới hạn${crit.map((q) => `: $x=${fmt(q.x, 3)}$ (${q.kind === "max" ? "cực đại" : "cực tiểu"}, $y=${fmt(q.y, 3)}$)`).join("")}. Điểm uốn $x=-\\frac{b}{3a}=${fmt(h, 3)}$, $y=${fmt(k, 3)}$. Kiểm đối xứng: $f(h+t)+f(h-t)-2f(h)$ lớn nhất $${fmt(asym, 10)}$.`,
        `$y=${fmt(a, 2)}x^3${b < 0 ? "-" : "+"}${fmt(Math.abs(b), 2)}x^2${c < 0 ? "-" : "+"}${fmt(Math.abs(c), 2)}x${d < 0 ? "-" : "+"}${fmt(Math.abs(d), 2)}$. $\\Delta'=b^2-3ac=${fmt(dp, 3)}$: ${dp > 0 ? "two extrema" : "no extrema"}. The machine finds ${crit.length} critical points${crit.map((q) => `: $x=${fmt(q.x, 3)}$ (${q.kind === "max" ? "maximum" : "minimum"}, $y=${fmt(q.y, 3)}$)`).join("")}. Inflection point $x=-\\frac{b}{3a}=${fmt(h, 3)}$, $y=${fmt(k, 3)}$. Symmetry check: the largest of $f(h+t)+f(h-t)-2f(h)$ is $${fmt(asym, 10)}$.`,
      )}
      why={tt(
        R`Dời gốc về điểm uốn bằng cách đặt $x=h+t$ với $h=-\frac{b}{3a}$: số hạng bậc hai $t^2$ biến mất, còn $y=at^3+pt+k$, một hàm lẻ theo $t$ cộng hằng số $k$. Hàm lẻ có đồ thị đối xứng qua gốc, nên đồ thị gốc đối xứng qua điểm $(h;k)$.`,
        R`Shift the origin to the inflection point by setting $x=h+t$ with $h=-\frac{b}{3a}$: the $t^2$ term disappears leaving $y=at^3+pt+k$, an odd function of $t$ plus the constant $k$. An odd function has a graph symmetric about the origin, so the original graph is symmetric about the point $(h;k)$.`,
      )}
    >
      <Graph
        label={tt("Đồ thị bậc ba, cực trị và tâm đối xứng", "The cubic graph, its extrema and centre of symmetry")}
        draw={(ctx, w, hh) => {
          const { colors, map, pad } = frame(ctx, w, hh, -6, 6, -10, 10);
          ctx.save(); ctx.beginPath(); ctx.rect(map.x(-6), map.y(10), map.x(6) - map.x(-6), map.y(-10) - map.y(10)); ctx.clip();
          strokeFn(ctx, map, w, hh, pad, -6, 6, f, colors.curve, 2.8);
          ctx.restore();
          for (const q of crit) dot(ctx, map.x(q.x), map.y(q.y), colors.alt, colors.bg, 6);
          dot(ctx, map.x(h), map.y(k), colors.ink, colors.bg, 7);
          label(ctx, tt("tâm đối xứng", "centre of symmetry"), map.x(h) + 8, map.y(k) - 8, colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("a (khác 0)", "a (non-zero)")} value={a0} min={-2} max={2} step={0.25} onChange={setA} />
        <Slider label="b" value={b} min={-4} max={4} step={0.5} onChange={setB} />
        <Slider label="c" value={c} min={-6} max={6} step={0.5} onChange={setC} />
        <Slider label="d" value={d} min={-6} max={6} step={0.5} onChange={setD} />
      </div>
    </Stage>
  );
}

/* ---------- 3. Hàm trùng phương: chữ U, chữ W ---------- */

export function QuarticLab() {
  const tt = useTx();
  const [a0, setA] = useState(1);
  const [b, setB] = useState(-4);
  const [c, setC] = useState(1);
  const a = Math.abs(a0) < 0.25 ? 0.25 : a0;
  const f = (x: number) => a * x ** 4 + b * x * x + c;
  const crit = criticalPoints(f, -4, 4);
  const roots = findRoots(f, -4, 4, 8000);
  const D = b * b - 4 * a * c;
  const tRoots = D < 0 ? [] : [(-b - Math.sqrt(D)) / (2 * a), (-b + Math.sqrt(D)) / (2 * a)].filter((t, i, arr) => t > 1e-9 && (i === 0 || Math.abs(t - (arr[0] as number)) > 1e-9));
  const predicted = tRoots.length * 2 + (D >= 0 && Math.abs(c) < 1e-9 ? 1 : 0);
  return (
    <Stage
      title={tt("Hàm trùng phương: chữ U hay chữ W, nghiệm qua ẩn phụ t = x²", "The biquadratic: a U or a W, and roots through the substitution t = x²")}
      story={tt(
        R`Hàm $y=ax^4+bx^2+c$ chỉ chứa các lũy thừa chẵn nên đồ thị đối xứng qua trục tung. Đạo hàm $y'=2x(2ax^2+b)$ luôn có nghiệm $x=0$, và có thêm hai nghiệm đối nhau khi $ab<0$. Vậy $ab<0$ cho ba cực trị (chữ W hoặc chữ M), $ab\ge 0$ chỉ cho một cực trị (chữ U hoặc chữ ∩). Muốn tìm giao điểm với trục hoành, ta đặt $t=x^2\ge 0$ rồi giải phương trình bậc hai theo $t$: mỗi $t>0$ cho hai nghiệm $x=\pm\sqrt{t}$.`,
        R`The function $y=ax^4+bx^2+c$ contains only even powers so its graph is symmetric about the vertical axis. The derivative $y'=2x(2ax^2+b)$ always has the root $x=0$, and two more opposite roots when $ab<0$. So $ab<0$ gives three extrema (a W or an M), $ab\ge 0$ gives only one (a U or an ∩). To find where it meets the horizontal axis, put $t=x^2\ge 0$ and solve the quadratic in $t$: each $t>0$ gives two roots $x=\pm\sqrt{t}$.`,
      )}
      read={tt(
        `$ab=${fmt(a * b, 3)}$: ${a * b < 0 ? "ba cực trị" : "một cực trị"}; máy tìm được ${crit.length}: ${crit.map((q) => `$x=${fmt(q.x, 2)}$`).join(", ")}. Ẩn phụ $t=x^2$: $${fmt(a, 2)}t^2${b < 0 ? "-" : "+"}${fmt(Math.abs(b), 2)}t${c < 0 ? "-" : "+"}${fmt(Math.abs(c), 2)}=0$ có $\\Delta=${fmt(D, 3)}$ và ${tRoots.length} nghiệm $t>0$ (${tRoots.map((t) => fmt(t, 3)).join("; ") || "không có"}), nên dự đoán ${predicted} nghiệm $x$. Máy quét thấy ${roots.length} nghiệm${roots.length ? `: ${roots.map((r) => fmt(r, 3)).join("; ")}` : ""}.`,
        `$ab=${fmt(a * b, 3)}$: ${a * b < 0 ? "three extrema" : "one extremum"}; the machine finds ${crit.length}: ${crit.map((q) => `$x=${fmt(q.x, 2)}$`).join(", ")}. Substitution $t=x^2$: $${fmt(a, 2)}t^2${b < 0 ? "-" : "+"}${fmt(Math.abs(b), 2)}t${c < 0 ? "-" : "+"}${fmt(Math.abs(c), 2)}=0$ has $\\Delta=${fmt(D, 3)}$ and ${tRoots.length} roots with $t>0$ (${tRoots.map((t) => fmt(t, 3)).join("; ") || "none"}), so we predict ${predicted} roots in $x$. The machine's scan finds ${roots.length}${roots.length ? `: ${roots.map((r) => fmt(r, 3)).join("; ")}` : ""}.`,
      )}
      why={tt(
        R`$y'=0$ cho $x=0$ hoặc $x^2=-\frac{b}{2a}$; vế phải dương đúng khi $a,b$ trái dấu, tức $ab<0$. Khi $a>0$ hai đầu đồ thị cùng đi lên: một cực trị cho chữ U, ba cực trị cho chữ W. Ẩn phụ $t=x^2$ biến phương trình bậc bốn thành bậc hai, và điều kiện $t\ge 0$ là chỗ dễ quên nhất.`,
        R`$y'=0$ gives $x=0$ or $x^2=-\frac{b}{2a}$; the right side is positive exactly when $a,b$ have opposite signs, i.e. $ab<0$. When $a>0$ both ends of the graph go up: one extremum gives a U, three give a W. The substitution $t=x^2$ turns the quartic into a quadratic, and the condition $t\ge 0$ is the easiest thing to forget.`,
      )}
    >
      <Graph
        label={tt("Đồ thị trùng phương, cực trị và giao với trục hoành", "The biquadratic graph, extrema and crossings of the horizontal axis")}
        draw={(ctx, w, hh) => {
          const { colors, map, pad } = frame(ctx, w, hh, -4, 4, -8, 10);
          ctx.save(); ctx.beginPath(); ctx.rect(map.x(-4), map.y(10), map.x(4) - map.x(-4), map.y(-8) - map.y(10)); ctx.clip();
          strokeFn(ctx, map, w, hh, pad, -4, 4, f, colors.curve, 2.8);
          ctx.restore();
          for (const q of crit) dot(ctx, map.x(q.x), map.y(q.y), colors.alt, colors.bg, 6);
          for (const r of roots) dot(ctx, map.x(r), map.y(0), colors.ink, colors.bg, 5);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("a (khác 0)", "a (non-zero)")} value={a0} min={-2} max={2} step={0.25} onChange={setA} />
        <Slider label="b" value={b} min={-6} max={6} step={0.5} onChange={setB} />
        <Slider label="c" value={c} min={-6} max={6} step={0.5} onChange={setC} />
      </div>
    </Stage>
  );
}

/* ---------- 4. Biện luận số nghiệm: đường ngang quét qua đồ thị ---------- */

const FNS: { vi: string; en: string; f: Fn }[] = [
  { vi: "x³ − 3x", en: "x³ − 3x", f: (x) => x ** 3 - 3 * x },
  { vi: "x⁴ − 4x² + 1", en: "x⁴ − 4x² + 1", f: (x) => x ** 4 - 4 * x * x + 1 },
  { vi: "−x³ + 3x + 1", en: "−x³ + 3x + 1", f: (x) => -(x ** 3) + 3 * x + 1 },
];

export function SolutionsLab() {
  const tt = useTx();
  const [pick, setPick] = useState(0);
  const [m, setM] = useState(0.5);
  const s = at(FNS, pick);
  const count = countSolutions(s.f, m, -4, 4);
  const profile = useMemo(() => Array.from({ length: 161 }, (_, i) => { const mm = -6 + (12 * i) / 160; return { m: mm, n: countSolutions(s.f, mm, -4, 4) }; }), [s]);
  const extremeValues = criticalPoints(s.f, -4, 4).map((q) => q.y);
  return (
    <Stage
      title={tt("Biện luận số nghiệm: một đường ngang quét qua đồ thị", "Discussing the number of solutions: a horizontal line sweeping over the graph")}
      story={tt(
        R`Số nghiệm của $f(x)=m$ là số giao điểm của đồ thị với đường ngang $y=m$. Hãy kéo $m$ từ dưới lên: số giao điểm chỉ đổi khi đường ngang đi qua một giá trị cực trị. Máy đếm số giao điểm cho từng $m$ rồi vẽ thành bậc thang bên phải: đó là kết quả của bài «biện luận số nghiệm theo tham số». Các bậc đổi chiều tại đúng các giá trị cực đại, cực tiểu.`,
        R`The number of solutions of $f(x)=m$ is the number of intersections of the graph with the horizontal line $y=m$. Drag $m$ upwards: the number of intersections changes exactly when the line passes a critical value. The machine counts the intersections for every $m$ and draws them as a staircase on the right: that is the answer to a «discuss the number of solutions in terms of the parameter» problem. The steps change exactly at the maximum and minimum values.`,
      )}
      read={tt(
        `Với $m=${fmt(m, 2)}$: máy đếm được ${count} nghiệm. Các giá trị cực trị của hàm: ${extremeValues.map((v) => fmt(v, 2)).join("; ") || "không có"}; số nghiệm chỉ đổi khi $m$ đi qua các giá trị này.`,
        `For $m=${fmt(m, 2)}$: the machine counts ${count} solutions. The extreme values of the function: ${extremeValues.map((v) => fmt(v, 2)).join("; ") || "none"}; the number of solutions only changes when $m$ crosses these values.`,
      )}
      why={tt(
        R`Giữa hai giá trị cực trị liên tiếp, hàm đơn điệu trên từng khoảng và liên tục nên đường ngang cắt đồ thị đúng một lần trên mỗi khoảng đơn điệu mà giá trị $m$ nằm trong tập giá trị của nó. Vì vậy chỉ cần đọc bảng biến thiên: so $m$ với giá trị cực đại, cực tiểu và giới hạn ở hai đầu.`,
        R`Between two consecutive extreme values the function is continuous and monotonic on each stretch, so the horizontal line meets the graph exactly once on each monotonic stretch whose range contains $m$. So all you need is the variation table: compare $m$ with the maximum, the minimum and the limits at the two ends.`,
      )}
    >
      <div className="fz-pair">
        <Graph
          label={tt("Đồ thị và đường ngang y = m", "The graph and the horizontal line y = m")}
          draw={(ctx, w, hh) => {
            const { colors, map, pad } = frame(ctx, w, hh, -4, 4, -6, 6);
            ctx.save(); ctx.beginPath(); ctx.rect(map.x(-4), map.y(6), map.x(4) - map.x(-4), map.y(-6) - map.y(6)); ctx.clip();
            strokeFn(ctx, map, w, hh, pad, -4, 4, s.f, colors.curve, 2.6);
            ctx.restore();
            dashed(ctx, map.x(-4), map.y(m), map.x(4), map.y(m), colors.alt);
            for (const r of findRoots((x) => s.f(x) - m, -4, 4, 6000)) dot(ctx, map.x(r), map.y(m), colors.alt, colors.bg, 6);
          }}
        />
        <Graph
          label={tt("Số nghiệm theo m", "Number of solutions against m")}
          draw={(ctx, w, hh) => {
            const { colors, map } = frame(ctx, w, hh, -6, 6, -0.5, 5.5, "m", tt("số nghiệm", "solutions"));
            ctx.beginPath();
            profile.forEach((p, i) => { const px = map.x(p.m); const py = map.y(p.n); if (i === 0) ctx.moveTo(px, py); else { ctx.lineTo(px, map.y((profile[i - 1] as { n: number }).n)); ctx.lineTo(px, py); } });
            ctx.strokeStyle = colors.curve; ctx.lineWidth = 2.6; ctx.stroke();
            for (const v of extremeValues) dashed(ctx, map.x(v), map.y(-0.5), map.x(v), map.y(5.5), colors.soft);
            dot(ctx, map.x(m), map.y(count), colors.alt, colors.bg, 7);
          }}
        />
      </div>
      <div className="fz-controls">
        <label className="fz-pick">{tt("Hàm số", "Function")}
          <select value={pick} onChange={(e) => setPick(Number(e.target.value))}>{FNS.map((q, i) => <option key={q.vi} value={i}>{tt(q.vi, q.en)}</option>)}</select>
        </label>
        <Slider label={tt("Tham số m", "Parameter m")} value={m} min={-6} max={6} step={0.05} onChange={setM} />
      </div>
    </Stage>
  );
}

