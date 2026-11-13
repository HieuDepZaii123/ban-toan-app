import { useMemo, useState, type ReactNode } from "react";
import { compile, evaluate, type CalcMode, type CalcVars } from "./evaluate.ts";
import { niceTex, numberTex } from "./exact.ts";
import { convertBase, divisorCount, divisors, FACTOR_LIMIT, factorize, factorTex } from "./number.ts";
import { derivativeAt, findRoot, integrate, solveCubic, solveQuadratic, solveSystem } from "./solve.ts";
import { linearRegression, parseNumbers, summarize } from "./stats.ts";
import type { Lang } from "../lib/math.ts";
import { t } from "../lib/text.ts";
import { MathText } from "../ui/MathText.tsx";

export type PanelProps = { lang: Lang; mode: CalcMode; vars: CalcVars };

/** Ô nhập nhận cả biểu thức: 1/2, sqrt(2), 2pi. */
function useValue(mode: CalcMode, vars: CalcVars) {
  return (text: string): number | null => {
    if (!text.trim()) return null;
    const outcome = evaluate(text, mode, null, vars);
    return outcome.ok ? outcome.value : null;
  };
}

function Field({ label, value, onChange, wide }: { label: string; value: string; onChange: (next: string) => void; wide?: boolean }) {
  return (
    <label className={wide ? "calc-field is-wide" : "calc-field"}>
      <span><MathText text={label} /></span>
      <input value={value} inputMode="text" autoCapitalize="off" autoCorrect="off" spellCheck={false} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function Out({ children }: { children: ReactNode }) {
  return <div className="calc-out" role="status">{children}</div>;
}

function Line({ text }: { text: string }) {
  return <p><MathText text={text} /></p>;
}

const signed = (value: number): string => (value < 0 ? `- ${numberTex(-value)}` : `+ ${numberTex(value)}`);

/* ---------- Phương trình và hệ ---------- */

type EqKind = "quad" | "cubic" | "sys2" | "sys3";

export function EquationPanel({ lang, mode, vars }: PanelProps) {
  const num = useValue(mode, vars);
  const [kind, setKind] = useState<EqKind>("quad");
  // Mỗi loại phương trình giữ riêng các ô đã nhập, và mở đầu bằng một ví dụ giải được.
  const [cells, setCells] = useState<Record<string, string>>({
    "quad:a": "1", "quad:b": "-5", "quad:c": "6",
    "cubic:a": "1", "cubic:b": "-6", "cubic:c": "11", "cubic:d": "-6",
    "sys2:00": "1", "sys2:01": "1", "sys2:02": "5", "sys2:10": "1", "sys2:11": "-1", "sys2:12": "1",
    "sys3:00": "1", "sys3:01": "1", "sys3:02": "1", "sys3:03": "6", "sys3:10": "1", "sys3:11": "-1", "sys3:12": "1", "sys3:13": "2", "sys3:20": "2", "sys3:21": "1", "sys3:22": "-1", "sys3:23": "1",
  });
  const cell = (key: string) => cells[`${kind}:${key}`] ?? "";
  const setCell = (key: string, next: string) => setCells((current) => ({ ...current, [`${kind}:${key}`]: next }));

  const kinds: [EqKind, string][] = [
    ["quad", t(lang, "Bậc hai", "Quadratic")],
    ["cubic", t(lang, "Bậc ba", "Cubic")],
    ["sys2", t(lang, "Hệ 2 ẩn", "2 unknowns")],
    ["sys3", t(lang, "Hệ 3 ẩn", "3 unknowns")],
  ];

  let body: ReactNode = null;
  let result: ReactNode = null;
  const missing = <p className="lecture-note">{t(lang, "Điền đủ các hệ số. Mỗi ô nhận số hoặc biểu thức như 1/2, sqrt(2).", "Fill in every coefficient. Each box takes a number or an expression such as 1/2 or sqrt(2).")}</p>;

  if (kind === "quad" || kind === "cubic") {
    const names = kind === "quad" ? ["a", "b", "c"] : ["a", "b", "c", "d"];
    const values = names.map((name) => num(cell(name)));
    body = (
      <>
        <Line text={kind === "quad" ? "$ax^2+bx+c=0$" : "$ax^3+bx^2+cx+d=0$"} />
        <div className="calc-grid">{names.map((name) => <Field key={name} label={`$${name}$`} value={cell(name)} onChange={(next) => setCell(name, next)} />)}</div>
      </>
    );
    if (values.some((v) => v === null)) result = missing;
    else if (kind === "quad") {
      const [a, b, c] = values as [number, number, number];
      const solved = solveQuadratic(a, b, c);
      if (solved.kind === "not-quadratic") {
        result = <Line text={b === 0 ? t(lang, "Với $a=0$ và $b=0$, đây không còn là phương trình có ẩn.", "With $a=0$ and $b=0$ there is no unknown left.") : t(lang, `Vì $a=0$ nên đây là phương trình bậc nhất, nghiệm $x=${niceTex(-c / b)}$.`, `Since $a=0$ this is linear, with root $x=${niceTex(-c / b)}$.`)} />;
      } else {
        const delta = `$\\Delta=b^2-4ac=${niceTex(solved.delta)}$`;
        result = (
          <>
            <Line text={delta} />
            {solved.kind === "two" ? <Line text={t(lang, `Hai nghiệm phân biệt: $x_1=${niceTex(solved.roots[0])}$, $x_2=${niceTex(solved.roots[1])}$.`, `Two distinct roots: $x_1=${niceTex(solved.roots[0])}$, $x_2=${niceTex(solved.roots[1])}$.`)} /> : null}
            {solved.kind === "two" && solved.roots.some((x) => niceTex(x) !== numberTex(x)) ? <Line text={`$x_1\\approx ${numberTex(solved.roots[0])}$, $x_2\\approx ${numberTex(solved.roots[1])}$`} /> : null}
            {solved.kind === "double" ? <Line text={t(lang, `Nghiệm kép: $x=${niceTex(solved.root)}$.`, `Double root: $x=${niceTex(solved.root)}$.`)} /> : null}
            {solved.kind === "complex" ? <Line text={t(lang, `Vô nghiệm trên tập số thực, vì $\\Delta<0$. Trên tập số phức: $x=${numberTex(solved.roots[0].re)}\\pm ${numberTex(solved.roots[0].im)}\\,i$.`, `No real root, because $\\Delta<0$. Over the complex numbers: $x=${numberTex(solved.roots[0].re)}\\pm ${numberTex(solved.roots[0].im)}\\,i$.`)} /> : null}
            {solved.kind !== "complex" ? <Line text={t(lang, `Đỉnh parabol: $\\left(${niceTex(-b / (2 * a))};${niceTex(c - (b * b) / (4 * a))}\\right)$.`, `Vertex: $\\left(${niceTex(-b / (2 * a))},${niceTex(c - (b * b) / (4 * a))}\\right)$.`)} /> : null}
          </>
        );
      }
    } else {
      const [a, b, c, d] = values as [number, number, number, number];
      const roots = solveCubic(a, b, c, d);
      result = roots === null
        ? <Line text={t(lang, "Hệ số $a$ phải khác $0$.", "The coefficient $a$ must not be $0$.")} />
        : (
          <>
            <Line text={t(lang, `Có ${roots.length} nghiệm thực phân biệt:`, `${roots.length} distinct real root${roots.length === 1 ? "" : "s"}:`)} />
            {roots.map((x, index) => <Line key={x} text={`$x_${index + 1}=${niceTex(x)}${niceTex(x) === numberTex(x) ? "" : `\\approx ${numberTex(x)}`}$`} />)}
          </>
        );
    }
  } else {
    const size = kind === "sys2" ? 2 : 3;
    const unknowns = ["x", "y", "z"].slice(0, size);
    const rows = Array.from({ length: size }, (_, r) => Array.from({ length: size + 1 }, (_, c) => num(cell(`${r}${c}`))));
    body = (
      <>
        <p className="lecture-note">{t(lang, "Mỗi hàng là một phương trình: các hệ số, rồi vế phải.", "Each row is one equation: the coefficients, then the right-hand side.")}</p>
        {rows.map((_, r) => (
          <div key={r} className="calc-grid" style={{ gridTemplateColumns: `repeat(${size + 1}, minmax(0, 1fr))` }}>
            {Array.from({ length: size + 1 }, (_, c) => (
              <Field key={c} label={c < size ? t(lang, `Hệ số $${unknowns[c]}$, hàng ${r + 1}`, `Coefficient of $${unknowns[c]}$, row ${r + 1}`) : t(lang, `Vế phải, hàng ${r + 1}`, `Right side, row ${r + 1}`)} value={cell(`${r}${c}`)} onChange={(next) => setCell(`${r}${c}`, next)} />
            ))}
          </div>
        ))}
      </>
    );
    if (rows.flat().some((v) => v === null)) result = missing;
    else {
      const solved = solveSystem(rows as number[][]);
      result = solved.kind === "unique"
        ? <Line text={t(lang, "Nghiệm duy nhất: ", "Unique solution: ") + solved.values.map((v, i) => `$${unknowns[i]}=${niceTex(v)}$`).join(", ") + "."} />
        : <Line text={solved.kind === "none" ? t(lang, "Hệ vô nghiệm: các phương trình mâu thuẫn nhau.", "No solution: the equations contradict each other.") : t(lang, "Hệ có vô số nghiệm: có phương trình suy ra được từ các phương trình còn lại.", "Infinitely many solutions: one equation follows from the others.")} />;
    }
  }

  return (
    <section className="tool-card calc-panel" aria-label={t(lang, "Giải phương trình", "Equation solver")}>
      <div className="chips" role="group" aria-label={t(lang, "Loại phương trình", "Equation type")}>
        {kinds.map(([id, label]) => <button key={id} type="button" aria-pressed={kind === id} onClick={() => setKind(id)}>{label}</button>)}
      </div>
      {body}
      <Out>{result}</Out>
    </section>
  );
}

/* ---------- Bảng giá trị và đồ thị ---------- */

function Plot({ points, lang }: { points: [number, number | null][]; lang: Lang }) {
  const finite = points.filter((p): p is [number, number] => p[1] !== null && Number.isFinite(p[1]));
  if (finite.length < 2) return null;
  const xs = finite.map((p) => p[0]);
  const sortedY = finite.map((p) => p[1]).sort((a, b) => a - b);
  // Bỏ 4% giá trị ở mỗi đầu để một tiệm cận không ép dẹt cả đồ thị.
  const cut = Math.floor(sortedY.length * 0.04);
  let yMin = sortedY[cut] as number;
  let yMax = sortedY[sortedY.length - 1 - cut] as number;
  if (yMin === yMax) { yMin -= 1; yMax += 1; }
  const pad = (yMax - yMin) * 0.08;
  yMin -= pad;
  yMax += pad;
  const xMin = Math.min(...xs);
  const xMax = Math.max(...xs);
  const W = 320, H = 200;
  const sx = (x: number) => ((x - xMin) / (xMax - xMin)) * W;
  const sy = (y: number) => H - ((y - yMin) / (yMax - yMin)) * H;
  let path = "";
  let pen = false;
  let last: number | null = null;
  for (const [x, y] of points) {
    const off = y === null || !Number.isFinite(y) || y < yMin - (yMax - yMin) || y > yMax + (yMax - yMin);
    const jump = last !== null && y !== null && Math.abs(y - last) > (yMax - yMin) * 0.9;
    if (off || jump) { pen = false; last = off ? null : y; if (off) continue; }
    path += `${pen ? "L" : "M"}${sx(x).toFixed(1)},${sy(y as number).toFixed(1)}`;
    pen = true;
    last = y;
  }
  return (
    <svg className="calc-plot" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={t(lang, `Đồ thị trên đoạn từ ${xMin} đến ${xMax}`, `Graph from ${xMin} to ${xMax}`)}>
      {yMin < 0 && yMax > 0 ? <line x1={0} x2={W} y1={sy(0)} y2={sy(0)} className="calc-axis" /> : null}
      {xMin < 0 && xMax > 0 ? <line y1={0} y2={H} x1={sx(0)} x2={sx(0)} className="calc-axis" /> : null}
      <path d={path} className="calc-curve" />
    </svg>
  );
}

export function TablePanel({ lang, mode, vars }: PanelProps) {
  const num = useValue(mode, vars);
  const [source, setSource] = useState("x^2-4x+3");
  const [from, setFrom] = useState("-1");
  const [to, setTo] = useState("5");
  const [step, setStep] = useState("0,5");
  const fn = useMemo(() => compile(source, mode, vars), [source, mode, vars]);
  const a = num(from), b = num(to), h = num(step);
  let message = "";
  let rows: [number, number | null][] = [];
  let curve: [number, number | null][] = [];
  if (!fn.ok) message = t(lang, "Biểu thức theo x chưa đúng cú pháp.", "The expression in x is not valid.");
  else if (a === null || b === null || h === null) message = t(lang, "Điền đủ ba ô: từ, đến và bước nhảy.", "Fill in from, to and step.");
  else if (h <= 0 || b <= a) message = t(lang, "Cần \"đến\" lớn hơn \"từ\" và bước nhảy dương.", "\"To\" must exceed \"from\" and the step must be positive.");
  else if ((b - a) / h > 200) message = t(lang, "Bảng quá dài (hơn 200 dòng). Hãy tăng bước nhảy.", "The table is too long (over 200 rows). Use a larger step.");
  else {
    const count = Math.floor((b - a) / h + 1e-9);
    rows = Array.from({ length: count + 1 }, (_, i) => { const x = Number((a + i * h).toPrecision(12)); return [x, fn.at(x)]; });
    curve = Array.from({ length: 241 }, (_, i) => { const x = a + ((b - a) * i) / 240; return [x, fn.at(x)]; });
  }
  return (
    <section className="tool-card calc-panel" aria-label={t(lang, "Bảng giá trị và đồ thị", "Table and graph")}>
      <Field wide label={t(lang, "Hàm số $f(x)=$", "Function $f(x)=$")} value={source} onChange={setSource} />
      <div className="calc-grid">
        <Field label={t(lang, "Từ $x=$", "From $x=$")} value={from} onChange={setFrom} />
        <Field label={t(lang, "Đến $x=$", "To $x=$")} value={to} onChange={setTo} />
        <Field label={t(lang, "Bước nhảy", "Step")} value={step} onChange={setStep} />
      </div>
      {message ? <Out><p>{message}</p></Out> : (
        <>
          <Plot points={curve} lang={lang} />
          <div className="calc-table-wrap">
            <table className="calc-table">
              <thead><tr><th scope="col"><MathText text="$x$" /></th><th scope="col"><MathText text="$f(x)$" /></th></tr></thead>
              <tbody>
                {rows.map(([x, y]) => (
                  <tr key={x}><td><MathText text={`$${numberTex(x)}$`} /></td><td>{y === null ? t(lang, "không xác định", "undefined") : <MathText text={`$${numberTex(y, 8)}$`} />}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}

/* ---------- Thống kê ---------- */

export function StatsPanel({ lang }: PanelProps) {
  const [xText, setXText] = useState("2; 4; 4; 4; 5; 5; 7; 9");
  const [yText, setYText] = useState("");
  const xs = parseNumbers(xText);
  const ys = parseNumbers(yText);
  const summary = summarize(xs.values);
  const line = ys.values.length > 0 ? linearRegression(xs.values, ys.values) : null;
  const bad = [...xs.bad, ...ys.bad];
  const rows: [string, string][] = summary ? [
    [t(lang, "Cỡ mẫu $n$", "Sample size $n$"), String(summary.n)],
    [t(lang, "Tổng", "Sum"), numberTex(summary.sum)],
    [t(lang, "Số trung bình $\\bar x$", "Mean $\\bar x$"), numberTex(summary.mean)],
    [t(lang, "Trung vị", "Median"), numberTex(summary.median)],
    [t(lang, "Tứ phân vị $Q_1$; $Q_3$", "Quartiles $Q_1$, $Q_3$"), `${numberTex(summary.q1)};\\ ${numberTex(summary.q3)}`],
    [t(lang, "Khoảng tứ phân vị", "Interquartile range"), numberTex(summary.q3 - summary.q1)],
    [t(lang, "Mốt", "Mode"), summary.modes.length ? summary.modes.map((m) => numberTex(m)).join(";\\ ") : "\\text{—}"],
    [t(lang, "Nhỏ nhất; lớn nhất", "Min, max"), `${numberTex(summary.min)};\\ ${numberTex(summary.max)}`],
    [t(lang, "Khoảng biến thiên", "Range"), numberTex(summary.range)],
    [t(lang, "Phương sai $s^2$ (chia $n$)", "Variance $s^2$ (divide by $n$)"), numberTex(summary.variance)],
    [t(lang, "Độ lệch chuẩn $s$ (chia $n$)", "Standard deviation $s$ (divide by $n$)"), numberTex(summary.sd)],
    [t(lang, "Phương sai hiệu chỉnh (chia $n-1$)", "Sample variance (divide by $n-1$)"), summary.sampleVariance === null ? "\\text{—}" : numberTex(summary.sampleVariance)],
    [t(lang, "Độ lệch chuẩn hiệu chỉnh", "Sample standard deviation"), summary.sampleSd === null ? "\\text{—}" : numberTex(summary.sampleSd)],
  ] : [];
  return (
    <section className="tool-card calc-panel" aria-label={t(lang, "Thống kê", "Statistics")}>
      <label className="calc-field is-wide">
        <span>{t(lang, "Dãy số liệu x (ngăn bằng dấu chấm phẩy, dấu cách hoặc xuống dòng; 3,5 là số thập phân)", "Data x (separate with semicolons, spaces or new lines; 3,5 is a decimal)")}</span>
        <textarea rows={3} value={xText} onChange={(event) => setXText(event.target.value)} />
      </label>
      <label className="calc-field is-wide">
        <span>{t(lang, "Dãy y, nếu muốn tìm đường thẳng y = ax + b khớp nhất (để trống nếu không cần)", "Data y, to fit the line y = ax + b (leave empty if not needed)")}</span>
        <textarea rows={2} value={yText} onChange={(event) => setYText(event.target.value)} />
      </label>
      {bad.length ? <Out><p>{t(lang, `Không đọc được: ${bad.slice(0, 5).join(", ")}`, `Could not read: ${bad.slice(0, 5).join(", ")}`)}</p></Out> : null}
      {summary ? (
        <div className="calc-table-wrap">
          <table className="calc-table">
            <tbody>{rows.map(([label, value]) => <tr key={label}><th scope="row"><MathText text={label} /></th><td><MathText text={`$${value}$`} /></td></tr>)}</tbody>
          </table>
        </div>
      ) : <Out><p>{t(lang, "Nhập ít nhất một số.", "Enter at least one number.")}</p></Out>}
      {yText.trim() ? (
        <Out>
          {xs.values.length !== ys.values.length ? <p>{t(lang, `Hai dãy phải dài bằng nhau: x có ${xs.values.length} số, y có ${ys.values.length} số.`, `Both lists need the same length: x has ${xs.values.length}, y has ${ys.values.length}.`)}</p>
            : line ? (
              <>
                <Line text={t(lang, `Đường thẳng khớp nhất: $y=${numberTex(line.a, 8)}x ${signed(Number(line.b.toPrecision(8)))}$.`, `Best-fit line: $y=${numberTex(line.a, 8)}x ${signed(Number(line.b.toPrecision(8)))}$.`)} />
                <Line text={t(lang, `Hệ số tương quan $r=${numberTex(line.r, 6)}$. Càng gần $1$ hoặc $-1$ thì các điểm càng sát đường thẳng.`, `Correlation $r=${numberTex(line.r, 6)}$. The closer to $1$ or $-1$, the closer the points lie to the line.`)} />
              </>
            ) : <p>{t(lang, "Cần ít nhất hai điểm có hoành độ khác nhau.", "At least two points with different x are needed.")}</p>}
        </Out>
      ) : null}
    </section>
  );
}

/* ---------- Giải tích số ---------- */

export function CalculusPanel({ lang, mode, vars }: PanelProps) {
  const num = useValue(mode, vars);
  const [source, setSource] = useState("x^2");
  const [x0, setX0] = useState("3");
  const [from, setFrom] = useState("0");
  const [to, setTo] = useState("1");
  const [guess, setGuess] = useState("1");
  const fn = useMemo(() => compile(source, mode, vars), [source, mode, vars]);
  const undefinedText = t(lang, "không tính được trên miền này", "cannot be computed here");
  const point = num(x0), a = num(from), b = num(to), start = num(guess);
  const slope = fn.ok && point !== null ? derivativeAt(fn.at, point) : null;
  const area = fn.ok && a !== null && b !== null ? integrate(fn.at, a, b) : null;
  const root = fn.ok && start !== null ? findRoot(fn.at, start) : null;
  return (
    <section className="tool-card calc-panel" aria-label={t(lang, "Giải tích số", "Numerical calculus")}>
      <Field wide label={t(lang, "Hàm số $f(x)=$", "Function $f(x)=$")} value={source} onChange={setSource} />
      {!fn.ok ? <Out><p>{t(lang, "Biểu thức theo x chưa đúng cú pháp.", "The expression in x is not valid.")}</p></Out> : (
        <>
          <h3>{t(lang, "Đạo hàm tại một điểm", "Derivative at a point")}</h3>
          <div className="calc-grid"><Field label="$x_0=$" value={x0} onChange={setX0} /></div>
          <Out>{point === null ? <p>{t(lang, "Nhập điểm cần tính.", "Enter the point.")}</p> : <Line text={slope === null ? `$f'(${numberTex(point)})$: ${undefinedText}` : `$f'(${numberTex(point)})\\approx ${numberTex(Number(slope.toPrecision(9)))}$`} />}</Out>
          <h3>{t(lang, "Tích phân xác định", "Definite integral")}</h3>
          <div className="calc-grid">
            <Field label={t(lang, "Cận dưới $a=$", "Lower limit $a=$")} value={from} onChange={setFrom} />
            <Field label={t(lang, "Cận trên $b=$", "Upper limit $b=$")} value={to} onChange={setTo} />
          </div>
          <Out>{a === null || b === null ? <p>{t(lang, "Nhập hai cận.", "Enter both limits.")}</p> : <Line text={area === null ? `$\\int_{${numberTex(a)}}^{${numberTex(b)}} f(x)\\,dx$: ${undefinedText}` : `$\\int_{${numberTex(a)}}^{${numberTex(b)}} f(x)\\,dx\\approx ${niceTex(Number(area.toPrecision(10)))}${niceTex(Number(area.toPrecision(10))) === numberTex(Number(area.toPrecision(10))) ? "" : `\\approx ${numberTex(area)}`}$`} />}</Out>
          <h3>{t(lang, "Nghiệm của f(x) = 0", "A root of f(x) = 0")}</h3>
          <div className="calc-grid"><Field label={t(lang, "Tìm gần $x=$", "Search near $x=$")} value={guess} onChange={setGuess} /></div>
          <Out>{start === null ? <p>{t(lang, "Nhập giá trị bắt đầu.", "Enter a starting value.")}</p> : <Line text={root === null ? t(lang, "Không tìm thấy chỗ hàm đổi dấu quanh giá trị này. Hãy thử một giá trị bắt đầu khác.", "No sign change was found around this value. Try another starting value.") : `$x\\approx ${numberTex(root)}$${niceTex(root) === numberTex(root) ? "" : `, $x=${niceTex(root)}$`}`} />}</Out>
          <p className="lecture-note">{t(lang, "Các kết quả ở đây là số gần đúng, dùng để kiểm tra lại bài làm tay.", "These are numerical approximations, meant for checking hand work.")}</p>
        </>
      )}
    </section>
  );
}

/* ---------- Số học ---------- */

export function NumberPanel({ lang }: PanelProps) {
  const [text, setText] = useState("360");
  const [baseText, setBaseText] = useState("255");
  const [from, setFrom] = useState(10);
  const n = Number(text.trim().replace(/[.\s]/g, ""));
  const factors = /^\d+$/.test(text.trim().replace(/[.\s]/g, "")) ? factorize(n) : null;
  const list = factors ? divisors(n) : null;
  const bases: [number, string][] = [[2, t(lang, "Nhị phân", "Binary")], [8, t(lang, "Bát phân", "Octal")], [10, t(lang, "Thập phân", "Decimal")], [16, t(lang, "Thập lục phân", "Hexadecimal")]];
  return (
    <section className="tool-card calc-panel" aria-label={t(lang, "Số học", "Number theory")}>
      <h3>{t(lang, "Phân tích ra thừa số nguyên tố", "Prime factorisation")}</h3>
      <Field wide label={t(lang, "Số nguyên từ 2 đến 1 000 000 000 000", "A whole number from 2 to 1,000,000,000,000")} value={text} onChange={setText} />
      <Out>
        {factors ? (
          <>
            <Line text={`$${n}=${factorTex(factors)}$`} />
            <Line text={factors.length === 1 && factors[0]?.[1] === 1 ? t(lang, "Đây là số nguyên tố.", "This is a prime number.") : t(lang, `Đây là hợp số, có ${divisorCount(factors)} ước dương.`, `This is composite, with ${divisorCount(factors)} positive divisors.`)} />
            {list && list.length > 2 ? <Line text={t(lang, "Các ước: ", "Divisors: ") + `$${list.join(";\\ ")}$`} /> : null}
          </>
        ) : <p>{t(lang, `Nhập một số nguyên từ 2 đến ${FACTOR_LIMIT.toLocaleString("vi-VN")}.`, "Enter a whole number in range.")}</p>}
      </Out>
      <h3>{t(lang, "Đổi cơ số", "Base conversion")}</h3>
      <div className="chips" role="group" aria-label={t(lang, "Số đang viết ở cơ số", "The number is written in base")}>
        {bases.map(([base, label]) => <button key={base} type="button" aria-pressed={from === base} onClick={() => setFrom(base)}>{label} ({base})</button>)}
      </div>
      <Field wide label={t(lang, "Số cần đổi", "Number to convert")} value={baseText} onChange={setBaseText} />
      <Out>
        {convertBase(baseText, from, 10) === null ? <p>{t(lang, `Số này không hợp lệ ở cơ số ${from}.`, `That is not a valid base-${from} number.`)}</p>
          : bases.filter(([base]) => base !== from).map(([base, label]) => <p key={base}>{label}: <b>{convertBase(baseText, from, base)}</b></p>)}
      </Out>
      <p className="lecture-note">{t(lang, "Ước chung lớn nhất, bội chung nhỏ nhất, tổ hợp và chỉnh hợp có sẵn ở tab Tính: gcd(12; 18), lcm(4; 6), ncr(5; 2), npr(5; 2).", "GCD, LCM, combinations and permutations live in the Calculate tab: gcd(12; 18), lcm(4; 6), ncr(5; 2), npr(5; 2).")}</p>
    </section>
  );
}
