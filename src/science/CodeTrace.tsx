import { useState } from "react";
import raw from "./traces.json" with { type: "json" };
import type { Lang } from "../lib/math.ts";
import { t } from "../lib/text.ts";

export type TraceStep = { line: number; vars: Record<string, string> };
export type Trace = { code: string; run: string; note: string; steps: TraceStep[] };

/** Bản ghi chạy thật bằng Python lúc kiểm thử (scripts/make_traces.py), phát lại từng bước. */
export const traces = raw as Trace[];

export function traceFor(code: string): Trace | undefined {
  return traces.find((item) => item.code === code);
}

/** Đoạn code kèm nút chạy từng bước: dòng sắp chạy được tô màu, bảng bên dưới là giá trị các biến lúc đó. */
export function CodeTrace({ code, lang }: { code: string; lang: Lang }) {
  const trace = traceFor(code);
  const [at, setAt] = useState(-1);
  if (!trace) return <pre className="code-block">{code}</pre>;
  const running = at >= 0;
  const step = running ? trace.steps[at] : undefined;
  const lines = (running ? trace.run : code).split("\n");
  const done = step?.line === -1;
  const names = step ? Object.keys(step.vars) : [];
  return (
    <div className="code-trace">
      <pre className="code-block" aria-label={t(lang, "Đoạn code", "Code")}>
        {lines.map((text, index) => (
          <span key={index} className={step && step.line === index ? "code-line is-now" : "code-line"}>
            <span className="code-no" aria-hidden="true">{index + 1}</span>
            {text}
            {"\n"}
          </span>
        ))}
      </pre>
      <div className="read-switch">
        {!running ? (
          <button type="button" onClick={() => setAt(0)}>{t(lang, "Chạy từng bước", "Run step by step")}</button>
        ) : (
          <>
            <button type="button" disabled={at === 0} onClick={() => setAt(at - 1)}>{t(lang, "Bước trước", "Back")}</button>
            <button type="button" disabled={at >= trace.steps.length - 1} onClick={() => setAt(at + 1)}>{t(lang, "Bước sau", "Next")}</button>
            <button type="button" onClick={() => setAt(trace.steps.length - 1)}>{t(lang, "Đến cuối", "To the end")}</button>
            <button type="button" onClick={() => setAt(-1)}>{t(lang, "Dừng", "Stop")}</button>
          </>
        )}
      </div>
      {running && step ? (
        <div className="code-state" role="status">
          <p className="lecture-note">
            {done
              ? t(lang, `Đã chạy xong sau ${trace.steps.length - 1} bước.`, `Finished after ${trace.steps.length - 1} steps.`)
              : t(lang, `Bước ${at + 1}: sắp chạy dòng ${step.line + 1}. Giá trị các biến lúc này:`, `Step ${at + 1}: about to run line ${step.line + 1}. Variables now:`)}
          </p>
          {names.length ? (
            <table className="calc-table">
              <tbody>
                {names.map((name) => <tr key={name}><th scope="row"><code>{name}</code></th><td><code>{step.vars[name]}</code></td></tr>)}
              </tbody>
            </table>
          ) : <p className="lecture-note">{t(lang, "Chưa có biến nào.", "No variables yet.")}</p>}
          <p className="lecture-note">{trace.note}</p>
        </div>
      ) : null}
    </div>
  );
}
