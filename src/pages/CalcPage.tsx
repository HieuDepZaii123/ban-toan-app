import { useEffect, useRef, useState } from "react";
import { evaluate, formatCalc, type CalcCode, type CalcMode } from "../calc/evaluate.ts";
import { pushHistory, readAns, readHistory, readMode, writeAns, writeHistory, writeMode, type CalcEntry } from "../calc/memory.ts";
import type { Lang } from "../lib/math.ts";
import { t } from "../lib/text.ts";
import { PageFrame } from "../ui/PageFrame.tsx";
import { useLang } from "../ui/useLang.ts";

const FUNCTIONS = [
  ["sin(", "sin"],
  ["cos(", "cos"],
  ["tan(", "tan"],
  ["ln(", "ln"],
  ["log(", "log"],
  ["sqrt(", "√"],
  ["^", "xʸ"],
  ["abs(", "|x|"],
] as const;

const KEYS = [
  ["(", "("],
  [")", ")"],
  ["pi", "π"],
  ["e", "e"],
  ["7", "7"],
  ["8", "8"],
  ["9", "9"],
  ["/", "÷"],
  ["4", "4"],
  ["5", "5"],
  ["6", "6"],
  ["*", "×"],
  ["1", "1"],
  ["2", "2"],
  ["3", "3"],
  ["-", "−"],
  ["0", "0"],
  [".", "."],
  ["Ans", "Ans"],
  ["+", "+"],
] as const;

function explain(code: CalcCode, lang: Lang): string {
  if (code === "div0") return t(lang, "Không chia được cho 0.", "Cannot divide by zero.");
  if (code === "sqrt") return t(lang, "Căn của số âm không có trong số thực.", "Square root of a negative number is not real.");
  if (code === "log") return t(lang, "Logarit chỉ nhận số dương.", "Logarithm needs a positive number.");
  if (code === "tan") return t(lang, "tan không xác định tại góc này.", "tan is undefined at this angle.");
  if (code === "overflow") return t(lang, "Kết quả quá lớn.", "The result is too large.");
  if (code === "ans") return t(lang, "Chưa có đáp án trước.", "There is no previous answer yet.");
  return t(lang, "Biểu thức chưa đúng cú pháp.", "That expression is not valid.");
}

export function CalcPage() {
  const lang = useLang();
  const field = useRef<HTMLInputElement>(null);
  const [expr, setExpr] = useState("");
  const [shown, setShown] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<CalcMode>(() => readMode(localStorage));
  const [history, setHistory] = useState<CalcEntry[]>(() => readHistory(localStorage));
  const [ans, setAns] = useState<number | null>(() => readAns(localStorage));

  useEffect(() => {
    document.title = t(lang, "Máy tính · Bàn Toán", "Calculator · Bàn Toán");
  }, [lang]);

  useEffect(() => {
    writeMode(mode, localStorage);
    writeHistory(history, localStorage);
    writeAns(ans, localStorage);
  }, [mode, history, ans]);

  function place(token: string) {
    const el = field.current;
    if (!el) {
      setExpr((current) => current + token);
      return;
    }
    const start = el.selectionStart ?? expr.length;
    const end = el.selectionEnd ?? expr.length;
    const next = expr.slice(0, start) + token + expr.slice(end);
    setExpr(next);
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
    const next = expr.slice(0, from) + expr.slice(end);
    setExpr(next);
    window.requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(from, from);
    });
  }

  function run() {
    const source = expr.trim();
    if (!source) {
      setShown("");
      setError(explain("syntax", lang));
      return;
    }
    const outcome = evaluate(source, mode, ans);
    if (!outcome.ok) {
      setShown("");
      setError(explain(outcome.code, lang));
      return;
    }
    const result = formatCalc(outcome.value);
    setShown(result);
    setError("");
    setAns(outcome.value);
    setHistory((current) => pushHistory(current, { expr: source, result }));
  }

  function clearHistory() {
    setHistory([]);
  }

  return (
    <PageFrame
      kicker={t(lang, "Máy tính", "Calculator")}
      title={t(lang, "Máy tính khoa học", "Scientific calculator")}
      lead={t(
        lang,
        "Cộng trừ nhân chia, ngoặc, mũ, căn, trị tuyệt đối, ln, log, sin, cos, tan. Mũ tính từ phải sang trái: 2^3^2 = 512. Dấu trừ đứng trước mũ tính sau: -2^2 = −4, còn (-2)^2 = 4. Hàm cần ngoặc, như sin(30). Không nhân ngầm: viết 2*pi, không viết 2pi.",
        "Add, subtract, multiply, divide, parentheses, powers, roots, absolute value, ln, log, sin, cos, and tan. Powers group to the right: 2^3^2 = 512. A leading minus applies after the power: -2^2 = −4, while (-2)^2 = 4. Functions need parentheses, as in sin(30). There is no implied multiplication: write 2*pi, not 2pi.",
      )}
    >
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
          <p className={error ? "calc-result is-error" : "calc-result"} role="status">{error || shown || "0"}</p>
        </div>
        <div className="calc-mode" role="group" aria-label={t(lang, "Đơn vị góc", "Angle unit")}>
          <button type="button" className="text-btn" aria-pressed={mode === "deg"} onClick={() => setMode("deg")}>DEG</button>
          <button type="button" className="text-btn" aria-pressed={mode === "rad"} onClick={() => setMode("rad")}>RAD</button>
        </div>
        <div className="calc-fns">
          {FUNCTIONS.map(([token, label]) => (
            <button key={token} type="button" className="text-btn" onClick={() => place(token)}>{label}</button>
          ))}
        </div>
        <div className="calc-keys">
          {KEYS.map(([token, label]) => (
            <button key={token} type="button" onClick={() => place(token)}>{label}</button>
          ))}
          <button type="button" onClick={() => { setExpr(""); setShown(""); setError(""); }}>{t(lang, "Xóa", "Clear")}</button>
          <button type="button" aria-label={t(lang, "Xóa một ký tự", "Delete one character")} onClick={backspace}>←</button>
          <button type="button" className="calc-eq" onClick={run}>=</button>
        </div>
        <div className="calc-history">
          <div className="calc-history-head">
            <b>{t(lang, "Lịch sử", "History")}</b>
            {history.length > 0 ? <button type="button" className="text-btn" onClick={clearHistory}>{t(lang, "Xóa lịch sử", "Clear history")}</button> : null}
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
    </PageFrame>
  );
}
