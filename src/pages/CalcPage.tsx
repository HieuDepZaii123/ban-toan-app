import { useEffect, useRef, useState } from "react";
import { CALC_VARS, evaluate, formatCalc, type CalcCode, type CalcMode, type CalcVars } from "../calc/evaluate.ts";
import { exactTex, numberTex } from "../calc/exact.ts";
import { CALC_TAB_KEY, pushHistory, readAns, readHistory, readMode, readVars, writeAns, writeHistory, writeMode, writeVars, type CalcEntry } from "../calc/memory.ts";
import { CalculusPanel, EquationPanel, NumberPanel, StatsPanel, TablePanel } from "../calc/panels.tsx";
import type { Lang } from "../lib/math.ts";
import { t } from "../lib/text.ts";
import { MathText } from "../ui/MathText.tsx";
import { PageFrame } from "../ui/PageFrame.tsx";
import { useLang } from "../ui/useLang.ts";

type Tab = "tinh" | "pt" | "bang" | "tk" | "gt" | "so";

/** [chuỗi chèn vào, nhãn trên phím, tên đọc cho trình đọc màn hình] */
type Key = readonly [string, string, string?];

const FUNCTION_ROWS: { vi: string; en: string; keys: Key[] }[] = [
  { vi: "Lượng giác", en: "Trigonometry", keys: [["sin(", "sin"], ["cos(", "cos"], ["tan(", "tan"], ["cot(", "cot"], ["asin(", "sin⁻¹", "arcsin"], ["acos(", "cos⁻¹", "arccos"], ["atan(", "tan⁻¹", "arctan"]] },
  { vi: "Mũ, căn, logarit", en: "Powers, roots, logs", keys: [["^2", "x²", "bình phương"], ["^", "xʸ", "lũy thừa"], ["sqrt(", "√", "căn bậc hai"], ["cbrt(", "∛", "căn bậc ba"], ["root(", "ⁿ√", "căn bậc n: root(n; x)"], ["ln(", "ln"], ["log(", "log", "log cơ số 10, hoặc log(a; b)"], ["exp(", "eˣ", "e mũ x"]] },
  { vi: "Đếm và số nguyên", en: "Counting and integers", keys: [["!", "n!", "giai thừa"], ["ncr(", "nCr", "tổ hợp: ncr(n; k)"], ["npr(", "nPr", "chỉnh hợp: npr(n; k)"], ["gcd(", "ƯCLN", "ước chung lớn nhất"], ["lcm(", "BCNN", "bội chung nhỏ nhất"], ["mod(", "mod", "số dư: mod(a; b)"], ["abs(", "|x|", "trị tuyệt đối"], ["%", "%", "phần trăm"]] },
];

const KEYS: Key[] = [
  ["(", "("], [")", ")"], [";", ";", "ngăn các đối số"], ["pi", "π"],
  ["7", "7"], ["8", "8"], ["9", "9"], ["/", "÷"],
  ["4", "4"], ["5", "5"], ["6", "6"], ["*", "×"],
  ["1", "1"], ["2", "2"], ["3", "3"], ["-", "−"],
  ["0", "0"], [",", ","], ["e", "e"], ["+", "+"],
];

function explain(code: CalcCode, lang: Lang): string {
  if (code === "div0") return t(lang, "Không chia được cho 0.", "Cannot divide by zero.");
  if (code === "sqrt") return t(lang, "Căn bậc chẵn của số âm không có trong số thực.", "An even root of a negative number is not real.");
  if (code === "log") return t(lang, "Logarit cần số dương, và cơ số dương khác 1.", "A logarithm needs a positive number and a positive base other than 1.");
  if (code === "tan") return t(lang, "tan hoặc cot không xác định tại góc này.", "tan or cot is undefined at this angle.");
  if (code === "overflow") return t(lang, "Kết quả quá lớn.", "The result is too large.");
  if (code === "ans") return t(lang, "Chưa có đáp án trước.", "There is no previous answer yet.");
  if (code === "domain") return t(lang, "Giá trị nằm ngoài miền của phép tính này. Ví dụ: asin chỉ nhận số từ −1 đến 1, giai thừa chỉ nhận số tự nhiên.", "The value is outside this operation's domain. For example asin takes −1 to 1, and a factorial needs a natural number.");
  if (code === "args") return t(lang, "Sai số đối số. Các đối số ngăn nhau bằng dấu chấm phẩy, ví dụ log(2; 8).", "Wrong number of arguments. Separate arguments with semicolons, as in log(2; 8).");
  if (code === "var") return t(lang, "Biến này chưa được gán giá trị. Tính ra một kết quả rồi bấm \"Lưu vào\" để gán.", "That variable has no value yet. Compute a result, then use \"Store in\".");
  return t(lang, "Biểu thức chưa đúng cú pháp.", "That expression is not valid.");
}

function readTab(): Tab {
  try {
    const raw = localStorage.getItem(CALC_TAB_KEY);
    if (raw === "pt" || raw === "bang" || raw === "tk" || raw === "gt" || raw === "so") return raw;
  } catch { /* bỏ qua */ }
  return "tinh";
}

export function CalcPage() {
  const lang = useLang();
  const field = useRef<HTMLInputElement>(null);
  const [tab, setTab] = useState<Tab>(readTab);
  const [expr, setExpr] = useState("");
  const [value, setValue] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<CalcMode>(() => readMode(localStorage));
  const [history, setHistory] = useState<CalcEntry[]>(() => readHistory(localStorage));
  const [ans, setAns] = useState<number | null>(() => readAns(localStorage));
  const [vars, setVars] = useState<CalcVars>(() => readVars(localStorage));

  useEffect(() => {
    document.title = t(lang, "Máy tính · Bàn Toán", "Calculator · Bàn Toán");
  }, [lang]);

  useEffect(() => {
    writeMode(mode, localStorage);
    writeHistory(history, localStorage);
    writeAns(ans, localStorage);
    writeVars(vars as Record<string, number>, localStorage);
    try { localStorage.setItem(CALC_TAB_KEY, tab); } catch { /* máy đầy */ }
  }, [mode, history, ans, vars, tab]);

  function place(token: string) {
    const el = field.current;
    if (!el) {
      setExpr((current) => current + token);
      return;
    }
    const start = el.selectionStart ?? expr.length;
    const end = el.selectionEnd ?? expr.length;
    setExpr(expr.slice(0, start) + token + expr.slice(end));
    const cursor = start + token.length;
    window.requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(cursor, cursor);
    });
  }

  function backspace() {
    const el = field.current;
    if (!el) {
      setExpr((current) => current.slice(0, -1));
      return;
    }
    const start = el.selectionStart ?? expr.length;
    const end = el.selectionEnd ?? expr.length;
    const from = start === end ? Math.max(0, start - 1) : start;
    setExpr(expr.slice(0, from) + expr.slice(end));
    window.requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(from, from);
    });
  }

  function run() {
    const source = expr.trim();
    if (!source) {
      setValue(null);
      setError(explain("syntax", lang));
      return;
    }
    const outcome = evaluate(source, mode, ans, vars);
    if (!outcome.ok) {
      setValue(null);
      setError(explain(outcome.code, lang));
      return;
    }
    setValue(outcome.value);
    setError("");
    setAns(outcome.value);
    setHistory((current) => pushHistory(current, { expr: source, result: formatCalc(outcome.value) }));
  }

  const exact = value === null ? null : exactTex(value);
  const tabs: [Tab, string][] = [
    ["tinh", t(lang, "Tính", "Calculate")],
    ["pt", t(lang, "Phương trình", "Equations")],
    ["bang", t(lang, "Bảng và đồ thị", "Table and graph")],
    ["tk", t(lang, "Thống kê", "Statistics")],
    ["gt", t(lang, "Đạo hàm, tích phân", "Calculus")],
    ["so", t(lang, "Số học", "Number theory")],
  ];
  const panel = { lang, mode, vars };

  return (
    <PageFrame
      kicker={t(lang, "Máy tính", "Calculator")}
      title={t(lang, "Máy tính khoa học", "Scientific calculator")}
      lead={t(
        lang,
        "Sáu chế độ: tính biểu thức và cho cả dạng đúng (phân số, căn, bội của π); giải phương trình bậc hai, bậc ba và hệ bậc nhất; lập bảng giá trị và vẽ đồ thị; thống kê; đạo hàm, tích phân, tìm nghiệm bằng số; phân tích thừa số và đổi cơ số.",
        "Six modes: evaluate expressions with exact forms (fractions, surds, multiples of π); solve quadratics, cubics and linear systems; build tables and graphs; statistics; numerical derivatives, integrals and roots; factorisation and base conversion.",
      )}
    >
      <div className="read-switch calc-tabs" role="tablist" aria-label={t(lang, "Chế độ máy tính", "Calculator mode")}>
        {tabs.map(([id, label]) => (
          <button key={id} type="button" role="tab" aria-selected={tab === id} onClick={() => setTab(id)}>{label}</button>
        ))}
      </div>
      <div className="calc-mode" role="group" aria-label={t(lang, "Đơn vị góc", "Angle unit")}>
        <button type="button" className="text-btn" aria-pressed={mode === "deg"} onClick={() => setMode("deg")}>{t(lang, "Độ (DEG)", "Degrees (DEG)")}</button>
        <button type="button" className="text-btn" aria-pressed={mode === "rad"} onClick={() => setMode("rad")}>{t(lang, "Rađian (RAD)", "Radians (RAD)")}</button>
      </div>

      {tab === "tinh" ? (
        <section className="calc" id="may-tinh" aria-label={t(lang, "Máy tính khoa học", "Scientific calculator")}>
          <div className="calc-screen">
            <input
              ref={field}
              value={expr}
              aria-label={t(lang, "Biểu thức", "Expression")}
              inputMode="text"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              placeholder="2+3*4"
              onChange={(event) => setExpr(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === "=") {
                  event.preventDefault();
                  run();
                }
              }}
            />
            <div className={error ? "calc-result is-error" : "calc-result"} role="status">
              {error ? error : value === null ? "0" : <MathText text={`$${numberTex(value, 12)}$`} />}
            </div>
            {exact ? <p className="calc-exact"><span>{t(lang, "Dạng đúng: ", "Exact form: ")}</span><MathText text={`$${exact}$`} /></p> : null}
          </div>

          <div className="calc-keys">
            {KEYS.map(([token, label, name]) => (
              <button key={token} type="button" aria-label={name} onClick={() => place(token)}>{label}</button>
            ))}
            <button type="button" onClick={() => { setExpr(""); setValue(null); setError(""); }}>{t(lang, "Xóa", "Clear")}</button>
            <button type="button" aria-label={t(lang, "Xóa một ký tự", "Delete one character")} onClick={backspace}>←</button>
            <button type="button" onClick={() => place("Ans")}>Ans</button>
            <button type="button" className="calc-eq" onClick={run}>=</button>
          </div>

          {FUNCTION_ROWS.map((row) => (
            <div key={row.vi} className="calc-fn-group">
              <p className="lecture-note">{t(lang, row.vi, row.en)}</p>
              <div className="calc-fns">
                {row.keys.map(([token, label, name]) => (
                  <button key={token} type="button" className="text-btn" aria-label={name} title={name} onClick={() => place(token)}>{label}</button>
                ))}
              </div>
            </div>
          ))}

          <div className="calc-fn-group">
            <p className="lecture-note">{t(lang, "Biến nhớ. Bấm tên biến để chèn vào biểu thức; bấm \"Lưu vào\" để gán kết quả vừa tính.", "Memory variables. Tap a name to insert it; use \"Store in\" to save the last result.")}</p>
            <div className="calc-vars">
              {CALC_VARS.map((name) => (
                <div key={name} className="calc-var">
                  <button type="button" className="text-btn" onClick={() => place(name)}>
                    {name.toUpperCase()}{vars[name] === undefined ? "" : ` = ${formatCalc(vars[name] as number)}`}
                  </button>
                  <button type="button" className="text-btn" disabled={value === null} aria-label={t(lang, `Lưu kết quả vào ${name.toUpperCase()}`, `Store the result in ${name.toUpperCase()}`)} onClick={() => { if (value !== null) setVars((current) => ({ ...current, [name]: value })); }}>
                    {t(lang, "Lưu vào", "Store in")}
                  </button>
                </div>
              ))}
            </div>
            {Object.keys(vars).length > 0 ? <button type="button" className="text-btn" onClick={() => setVars({})}>{t(lang, "Xóa mọi biến", "Clear all variables")}</button> : null}
          </div>

          <details className="fold calc-help">
            <summary>{t(lang, "Cách gõ", "How to type")}</summary>
            <ul>
              <li>{t(lang, "Số thập phân gõ dấu phẩy hoặc dấu chấm đều được: 3,5 hay 3.5.", "Decimals accept a comma or a point: 3,5 or 3.5.")}</li>
              <li>{t(lang, "Các đối số của hàm ngăn nhau bằng dấu chấm phẩy: log(2; 8) = 3, root(3; 27) = 3, ncr(5; 2) = 10.", "Separate function arguments with semicolons: log(2; 8) = 3, root(3; 27) = 3, ncr(5; 2) = 10.")}</li>
              <li>{t(lang, "Được viết tắt phép nhân: 2pi, 3(4+1), 2sin(30).", "Multiplication can be implied: 2pi, 3(4+1), 2sin(30).")}</li>
              <li>{t(lang, "Mũ tính từ phải sang trái: 2^3^2 = 512. Dấu trừ đứng trước tính sau mũ: -2^2 = −4, còn (-2)^2 = 4.", "Powers group to the right: 2^3^2 = 512. A leading minus applies after the power: -2^2 = −4, while (-2)^2 = 4.")}</li>
              <li>{t(lang, "Giai thừa và phần trăm viết sau số: 5! = 120, 200*15% = 30.", "Factorial and percent follow the number: 5! = 120, 200*15% = 30.")}</li>
              <li>{t(lang, "Hàm lượng giác ngược trả kết quả theo đơn vị góc đang chọn.", "Inverse trig functions answer in the selected angle unit.")}</li>
            </ul>
          </details>

          <div className="calc-history">
            <div className="calc-history-head">
              <b>{t(lang, "Lịch sử", "History")}</b>
              {history.length > 0 ? <button type="button" className="text-btn" onClick={() => setHistory([])}>{t(lang, "Xóa lịch sử", "Clear history")}</button> : null}
            </div>
            {history.length === 0 ? <p className="lecture-note">{t(lang, "Chưa có phép tính.", "No calculations yet.")}</p> : (
              <ul>
                {history.map((item) => (
                  <li key={`${item.expr}=${item.result}`}>
                    <button type="button" onClick={() => setExpr(item.expr)} aria-label={t(lang, `Dùng lại ${item.expr}`, `Reuse ${item.expr}`)}>
                      <span>{item.expr}</span>
                      <b>{item.result}</b>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      ) : null}
      {tab === "pt" ? <EquationPanel {...panel} /> : null}
      {tab === "bang" ? <TablePanel {...panel} /> : null}
      {tab === "tk" ? <StatsPanel {...panel} /> : null}
      {tab === "gt" ? <CalculusPanel {...panel} /> : null}
      {tab === "so" ? <NumberPanel {...panel} /> : null}
    </PageFrame>
  );
}
