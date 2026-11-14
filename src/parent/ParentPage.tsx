import { useEffect, useMemo, useState } from "react";
import { t } from "../lib/text.ts";
import { PageFrame } from "../ui/PageFrame.tsx";
import { useLang } from "../ui/useLang.ts";
import { disableParentMode, enableParentMode, parentSince, PIN_RULE, useParentMode } from "./parentMode.ts";
import { encodeReport, reportFromDevice } from "./report.ts";
import { ReportView } from "./ReportView.tsx";

export function ParentPage() {
  const lang = useLang();
  const on = useParentMode();
  const [pin, setPin] = useState("");
  const [again, setAgain] = useState("");
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);
  const [now] = useState(() => Date.now());

  useEffect(() => {
    document.title = t(lang, "Phụ huynh · Bàn Toán", "Parents · Bàn Toán");
  }, [lang]);

  // Rebuilt when parent mode changes, so the preview matches the link.
  const report = useMemo(() => reportFromDevice(now, on ? parentSince() : null), [now, on]);
  const link = `${window.location.origin}/bao-cao#r=${encodeReport(report)}`;

  async function turnOn(): Promise<void> {
    setNote("");
    if (!PIN_RULE.test(pin)) return setNote(t(lang, "Mã PIN gồm 4 đến 8 chữ số.", "The PIN is 4 to 8 digits."));
    if (pin !== again) return setNote(t(lang, "Hai lần nhập không khớp.", "The two PINs do not match."));
    const ok = await enableParentMode(pin);
    setPin("");
    setAgain("");
    setNote(ok ? t(lang, "Đã bật chế độ phụ huynh trên máy này.", "Parent mode is on for this device.") : t(lang, "Máy này không lưu được cài đặt.", "This device could not save the setting."));
  }

  async function turnOff(): Promise<void> {
    setNote("");
    const ok = await disableParentMode(pin);
    setPin("");
    setNote(ok ? t(lang, "Đã tắt chế độ phụ huynh.", "Parent mode is off.") : t(lang, "Mã PIN không đúng.", "Wrong PIN."));
  }

  async function share(): Promise<void> {
    const title = t(lang, "Báo cáo học tuần này · Bàn Toán", "This week's study report · Bàn Toán");
    try {
      if (navigator.share) {
        await navigator.share({ title, url: link });
        return;
      }
    } catch {
      /* closed the share sheet: fall back to copying */
    }
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <PageFrame
      kicker={t(lang, "Dành cho phụ huynh", "For parents")}
      title={t(lang, "Phụ huynh", "Parents")}
      lead={t(
        lang,
        "Bật chế độ phụ huynh để con phải tự làm trước khi xem lời giải, và nhận báo cáo tuần con gửi bằng đường link.",
        "Turn on parent mode so your child has to try before seeing solutions, and get a weekly report your child sends by link.",
      )}
    >
      <section className="tool-card parent-card" aria-labelledby="pm-title">
        <h2 id="pm-title">{t(lang, "Chế độ phụ huynh", "Parent mode")}: {on ? t(lang, "đang bật", "on") : t(lang, "đang tắt", "off")}</h2>
        <ul className="parent-list">
          <li>{t(lang, "Trợ lý không viết lời giải đầy đủ hay đáp số; con phải gửi bài làm của mình trước.", "The tutor writes no full solution or final answer; your child sends their own attempt first.")}</li>
          <li>{t(lang, "Chấm bài chỉ chỉ ra bước sai đầu tiên kèm gợi ý, không đưa bước sửa.", "Marking shows the first wrong step and a hint, never the corrected step.")}</li>
          <li>{t(lang, "Trong đề thi thử, lời giải chỉ hiện ở câu con đã làm.", "In mock exams, solutions show only for questions your child attempted.")}</li>
        </ul>
        <label>
          <span>{on ? t(lang, "Nhập mã PIN để tắt", "Enter the PIN to turn it off") : t(lang, "Đặt mã PIN (4–8 chữ số)", "Set a PIN (4–8 digits)")}</span>
          <input type="password" inputMode="numeric" autoComplete="off" value={pin} maxLength={8} onChange={(event) => setPin(event.target.value.replace(/\D/g, ""))} />
        </label>
        {!on ? (
          <label>
            <span>{t(lang, "Nhập lại mã PIN", "Repeat the PIN")}</span>
            <input type="password" inputMode="numeric" autoComplete="off" value={again} maxLength={8} onChange={(event) => setAgain(event.target.value.replace(/\D/g, ""))} />
          </label>
        ) : null}
        <p>
          <button type="button" className="pay-btn" onClick={() => void (on ? turnOff() : turnOn())}>
            {on ? t(lang, "Tắt chế độ phụ huynh", "Turn parent mode off") : t(lang, "Bật chế độ phụ huynh", "Turn parent mode on")}
          </button>
        </p>
        {note ? <p className="chat-note" role="status">{note}</p> : null}
        <small>{t(
          lang,
          "Đây là cài đặt trên máy, không phải khóa: xóa dữ liệu trình duyệt sẽ tắt nó. Báo cáo tuần ghi rõ chế độ này có bật suốt tuần hay không.",
          "This is a setting on the device, not a lock: clearing browser data turns it off. The weekly report says whether it was on all week.",
        )}</small>
      </section>

      <section className="tool-card" aria-labelledby="report-title">
        <h2 id="report-title">{t(lang, "Báo cáo tuần", "Weekly report")}</h2>
        <ReportView report={report} />
        <p>
          <button type="button" className="pay-btn" onClick={() => void share()}>{t(lang, "Gửi báo cáo cho bố mẹ", "Send the report to a parent")}</button>
          {copied ? <small> {t(lang, "Đã chép đường link.", "Link copied.")}</small> : null}
        </p>
        <small>{t(
          lang,
          "Báo cáo nằm trong chính đường link, Bàn Toán không lưu bản nào. Ai có link đều xem được, nên chỉ gửi cho bố mẹ.",
          "The report lives inside the link itself; Bàn Toán keeps no copy. Anyone with the link can read it, so send it only to a parent.",
        )}</small>
      </section>
    </PageFrame>
  );
}
