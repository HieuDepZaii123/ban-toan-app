import { useEffect, useState } from "react";
import { deviceId } from "../lib/device.ts";
import { A } from "../lib/route.tsx";
import { t } from "../lib/text.ts";
import { savedLicense } from "../premium/license.ts";
import { useParentMode } from "../parent/parentMode.ts";
import { logCheck, problemKey } from "../parent/report.ts";
import { MathText } from "../ui/MathText.tsx";
import { PageFrame } from "../ui/PageFrame.tsx";
import { useLang } from "../ui/useLang.ts";

type Result = {
  verdict?: "ok" | "wrong" | "unclear";
  step?: number | null;
  why?: string;
  hint?: string;
  fix?: string;
  remaining?: number;
  limit?: number;
  period?: "week" | "day";
  premium?: boolean;
  error?: string;
  message?: string;
};

const MAX_STEPS = 20;

export function CheckPage() {
  const lang = useLang();
  const parent = useParentMode();
  const [problem, setProblem] = useState("");
  const [working, setWorking] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [marked, setMarked] = useState<string[]>([]);

  useEffect(() => {
    document.title = t(lang, "Chấm bài làm · Bàn Toán", "Mark my working · Bàn Toán");
  }, [lang]);

  const steps = working.split("\n").map((line) => line.trim()).filter((line) => line !== "");

  async function submit(): Promise<void> {
    if (!problem.trim() || steps.length === 0) return;
    setBusy(true);
    setResult(null);
    const sent = steps.slice(0, MAX_STEPS);
    try {
      const res = await fetch("/api/check", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ problem: problem.trim(), steps: sent, license: savedLicense(), device: deviceId(), parent }),
      });
      const body = await res.json() as Result;
      setResult(body);
      setMarked(sent);
      if (res.ok && body.verdict) {
        logCheck({ at: Date.now(), key: problemKey(problem), verdict: body.verdict, step: body.step ?? null });
      }
    } catch {
      setResult({ error: "offline", message: t(lang, "Không nối được máy chủ. Thử lại khi có mạng.", "The server did not answer. Try again online.") });
    } finally {
      setBusy(false);
    }
  }

  const quota = result && typeof result.remaining === "number" && typeof result.limit === "number"
    ? result.period === "day"
      ? t(lang, `Premium: còn ${result.remaining}/${result.limit} lượt chấm hôm nay.`, `Premium: ${result.remaining}/${result.limit} markings left today.`)
      : t(lang, `Miễn phí: còn ${result.remaining}/${result.limit} lượt chấm tuần này.`, `Free: ${result.remaining}/${result.limit} markings left this week.`)
    : "";

  return (
    <PageFrame
      kicker={t(lang, "Luyện tập · Chấm bài", "Practice · Marking")}
      title={t(lang, "Chấm bài làm", "Mark my working")}
      lead={t(
        lang,
        "Ghi đề và các bước con tự làm, mỗi dòng một bước. Bàn Toán tìm bước sai đầu tiên và gợi ý để con tự sửa. Miễn phí 3 lượt mỗi tuần; Premium chấm 40 lượt mỗi ngày.",
        "Write the problem and your own working, one step per line. Bàn Toán finds the first wrong step and gives a hint so you can fix it yourself. 3 free markings a week; Premium marks 40 a day.",
      )}
    >
      <form
        className="tool-card check-form"
        onSubmit={(event) => {
          event.preventDefault();
          void submit();
        }}
      >
        <label>
          <b>{t(lang, "Đề bài", "Problem")}</b>
          <textarea value={problem} maxLength={600} onChange={(event) => setProblem(event.target.value)} placeholder={t(lang, "Ví dụ: Giải phương trình 2x + 6 = 0", "Example: Solve 2x + 6 = 0")} />
        </label>
        <label>
          <b>{t(lang, "Bài làm của con (mỗi dòng một bước)", "Your working (one step per line)")}</b>
          <textarea
            value={working}
            onChange={(event) => setWorking(event.target.value)}
            rows={6}
            placeholder={t(lang, "2x = -6\nx = -3", "2x = -6\nx = -3")}
          />
        </label>
        {steps.length > MAX_STEPS ? <small>{t(lang, `Chỉ chấm ${MAX_STEPS} bước đầu.`, `Only the first ${MAX_STEPS} steps are marked.`)}</small> : null}
        <p>
          <button type="submit" className="pay-btn" disabled={busy || !problem.trim() || steps.length === 0}>
            {busy ? t(lang, "Đang chấm…", "Marking…") : t(lang, "Tìm bước sai đầu tiên", "Find my first wrong step")}
          </button>
        </p>
        {parent ? <small>{t(lang, "Chế độ phụ huynh đang bật: chỉ hiện gợi ý, không hiện bước sửa.", "Parent mode is on: hints only, no corrected step.")}</small> : null}
      </form>

      {result?.error ? (
        <p className="pay-card" role="status">
          <span>{result.message}</span>
          {result.error === "quota" && !result.premium ? <> <A href="/nang-cap">{t(lang, "Xem Premium", "See Premium")}</A></> : null}
        </p>
      ) : null}

      {result?.verdict ? (
        <section className={`check-result is-${result.verdict}`} aria-live="polite" aria-labelledby="check-title">
          <h2 id="check-title">
            {result.verdict === "ok"
              ? t(lang, "Các bước đều đúng", "Every step checks out")
              : result.verdict === "wrong"
                ? t(lang, `Bước ${result.step} sai`, `Step ${result.step} is wrong`)
                : t(lang, "Chưa chấm chắc được", "Could not mark this for sure")}
          </h2>
          <ol className="check-steps">
            {marked.map((step, index) => (
              <li key={index} className={result.step === index + 1 ? "is-wrong" : result.step && index + 1 > result.step ? "is-after" : ""}>
                <MathText text={step} />
              </li>
            ))}
          </ol>
          {result.why ? <p><MathText text={result.why} /></p> : null}
          {result.hint ? <p><b>{t(lang, "Gợi ý: ", "Hint: ")}</b><MathText text={result.hint} /></p> : null}
          {result.fix ? (
            <details>
              <summary>{t(lang, "Xem bước sửa (thử tự sửa trước)", "Show the corrected step (try first)")}</summary>
              <p><MathText text={result.fix} /></p>
            </details>
          ) : null}
          <small>{t(lang, "Máy chấm có thể nhầm. Nếu con chắc bước của mình đúng, hỏi thầy cô.", "The marker can be wrong. If you are sure your step is right, ask your teacher.")}</small>
        </section>
      ) : null}
      {quota ? <p className="chat-note">{quota}</p> : null}
      <p className="pay-note">
        <A href="/phu-huynh">{t(lang, "Gửi báo cáo tuần cho bố mẹ", "Send the weekly report to a parent")}</A>
      </p>
    </PageFrame>
  );
}
