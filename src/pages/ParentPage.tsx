import { useEffect, useState } from "react";
import { cards } from "../content/cards.ts";
import { checkPin, clearParent, readParent, setPin, validPin, writeParent } from "../lib/parent.ts";
import { buildReport } from "../lib/report.ts";
import { decodeReport, encodeReport, reportCsv, weekMinutes, type Report } from "../lib/reportCode.ts";
import { A } from "../lib/route.tsx";
import { t } from "../lib/text.ts";
import { usePref, writePref } from "../ui/prefs.ts";
import { PageFrame } from "../ui/PageFrame.tsx";
import { useLang } from "../ui/useLang.ts";

const CLASS_KEY = "bt-class";

function readClass(): Report[] {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(CLASS_KEY) || "[]");
    if (!Array.isArray(raw)) return [];
    return raw.flatMap((item) => {
      const row = typeof item === "string" ? decodeReport(item) : null;
      return row ? [row] : [];
    });
  } catch {
    return [];
  }
}

function saveClass(rows: Report[]): void {
  try {
    localStorage.setItem(CLASS_KEY, JSON.stringify(rows.map(encodeReport)));
  } catch {
    /* bảng lớp chỉ giữ tới khi đóng trang */
  }
}

function download(name: string, text: string, type: string): void {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function total(values: Record<string, number>): number {
  return Object.values(values).reduce((sum, value) => sum + value, 0);
}

/** Trang cho phụ huynh và thầy cô: báo cáo tuần, nhắc nghỉ, khóa của phụ huynh, và bảng lớp không cần tài khoản. */
export function ParentPage() {
  const lang = useLang();
  const [settings, setSettings] = useState(readParent);
  const [unlocked, setUnlocked] = useState(() => readParent().pinHash === "");
  const [pin, setPinText] = useState("");
  const [again, setAgain] = useState("");
  const [note, setNote] = useState("");
  const [report] = useState(buildReport);
  const [codes, setCodes] = useState("");
  const [rows, setRows] = useState<Report[]>(readClass);
  const breakEvery = usePref("bt-break") || "25";
  const hasPin = settings.pinHash !== "";
  const locale = lang === "en" ? "en-GB" : "vi-VN";
  const dayLabel = (day: string) => new Date(`${day}T12:00:00`).toLocaleDateString(locale, { weekday: "short", day: "numeric", month: "numeric" });
  const who = report.name || t(lang, "hồ sơ đang mở", "the open profile");

  useEffect(() => {
    document.title = t(lang, "Phụ huynh và thầy cô · Bàn Toán", "Parents and teachers · Bàn Toán");
  }, [lang]);

  const save = (next: typeof settings) => {
    writeParent(next);
    setSettings(next);
  };

  return (
    <PageFrame
      kicker={t(lang, "Không cần tài khoản", "No account needed")}
      title={t(lang, "Phụ huynh và thầy cô", "Parents and teachers")}
      lead={t(lang, "Xem con học gì trong tuần, đặt nhắc nghỉ và giới hạn giờ học, tắt trợ lý AI nếu muốn. Thầy cô gom phiếu kết quả của học sinh thành bảng lớp. Mọi thứ nằm trên máy này.", "See what your child studied this week, set break reminders and a daily limit, turn the AI tutor off if you wish. Teachers collect students' result slips into a class table. Everything stays on this device.")}
    >
      <p role="status" className="status no-print">{note}</p>

      <section className="tool-card data-card no-print" aria-labelledby="parent-how">
        <h2 id="parent-how">{t(lang, "Bắt đầu trong năm bước", "Five steps to start")}</h2>
        <ol>
          <li>{t(lang, "Ở trang chủ, chọn lớp của con để bàn mở đúng bài.", "On the home page, pick your child's grade so the desk opens the right lessons.")}</li>
          <li>{t(lang, "Nhiều con học chung một máy thì tạo cho mỗi con một hồ sơ ở trang ", "If several children share a device, give each one a profile on the ")}<A href="/du-lieu">{t(lang, "Dữ liệu của tôi", "My data")}</A>{t(lang, ".", " page.")}</li>
          <li>{t(lang, "Cuối tuần mở trang này để xem báo cáo, hoặc in ra.", "At the weekend open this page to read the report, or print it.")}</li>
          <li>{t(lang, "Muốn thì đặt mã PIN, giới hạn phút học mỗi ngày và tắt trợ lý AI ở mục bên dưới.", "If you wish, set a PIN, a daily limit and turn the AI tutor off below.")}</li>
          <li>{t(lang, "Đọc ", "Read the ")}<A href="/chinh-sach">{t(lang, "Chính sách", "policy")}</A>{t(lang, " để biết dữ liệu nào ở lại trên máy và dữ liệu nào rời máy.", " to see which data stays on the device and which leaves it.")}</li>
        </ol>
      </section>

      <section className="tool-card data-card report-card" aria-labelledby="parent-report">
        <h2 id="parent-report">{t(lang, `Báo cáo tuần của ${who}`, `Weekly report for ${who}`)}</h2>
        <p className="lecture-note">
          {report.grade && report.grade !== "adult" ? t(lang, `Lớp ${report.grade} · `, `Grade ${report.grade} · `) : ""}
          {t(lang, `lập ngày ${dayLabel(report.made)} · số liệu tính trên máy này`, `made on ${dayLabel(report.made)} · counted on this device`)}
        </p>
        <table className="thpt-table report-table week-table">
          <caption className="sr">{t(lang, "Số phút học trong bảy ngày gần nhất", "Minutes studied in the last seven days")}</caption>
          <thead>
            <tr><th scope="col">{t(lang, "Ngày", "Day")}</th><th scope="col">{t(lang, "Thời gian học", "Time studied")}</th></tr>
          </thead>
          <tbody>
            {report.days.map((item) => (
              <tr key={item.day}><th scope="row">{dayLabel(item.day)}</th><td>{t(lang, `${item.minutes} phút`, `${item.minutes} min`)}</td></tr>
            ))}
            <tr><th scope="row">{t(lang, "Cả tuần", "Whole week")}</th><td><b>{t(lang, `${weekMinutes(report)} phút`, `${weekMinutes(report)} min`)}</b></td></tr>
          </tbody>
        </table>
        <ul>
          <li>{t(lang, `Chuỗi ngày học liên tiếp: ${report.streak} ngày.`, `Days studied in a row: ${report.streak}.`)}</li>
          <li>
            {total(report.lessons) === 0
              ? t(lang, "Bài học theo lớp: chưa xong bài nào.", "Grade lessons: none finished yet.")
              : t(lang, `Bài học đã xong: ${Object.entries(report.lessons).map(([grade, count]) => `lớp ${grade}: ${count} bài`).join("; ")}.`, `Lessons finished: ${Object.entries(report.lessons).map(([grade, count]) => `grade ${grade}: ${count}`).join("; ")}.`)}
          </li>
          <li>
            {total(report.topics) === 0
              ? t(lang, "Chuyên đề THPT: chưa có câu nào làm đúng.", "Upper-secondary topics: no correct answers yet.")
              : t(lang, `Câu chuyên đề đã làm đúng: ${Object.entries(report.topics).map(([id, count]) => `${cards.find((card) => card.id === id)?.title ?? id}: ${count}`).join("; ")}.`, `Topic questions answered correctly: ${Object.entries(report.topics).map(([id, count]) => `${cards.find((card) => card.id === id)?.titleEn ?? id}: ${count}`).join("; ")}.`)}
          </li>
          <li>
            {report.exams.length === 0
              ? t(lang, "Đề thi thử: chưa làm đề nào.", "Mock exams: none taken yet.")
              : t(lang, `Đề thi thử gần nhất: ${report.exams.map((exam) => `${String(exam.total).replace(".", ",")}/10 (${new Date(exam.at).toLocaleDateString(locale)})`).join("; ")}.`, `Latest mock exams: ${report.exams.map((exam) => `${exam.total}/10 (${new Date(exam.at).toLocaleDateString(locale)})`).join("; ")}.`)}
          </li>
          <li>{t(lang, `Câu đang nằm trong Sổ lỗi để ôn lại: ${report.misses}.`, `Questions waiting in the miss book: ${report.misses}.`)}</li>
        </ul>
        <div className="data-actions no-print">
          <button type="button" className="pay-btn" onClick={() => window.print()}>{t(lang, "In báo cáo", "Print the report")}</button>
          <button type="button" className="text-btn" onClick={() => download(`bao-cao-ban-toan-${report.made}.csv`, reportCsv([report]), "text/csv;charset=utf-8")}>{t(lang, "Tải bảng CSV", "Download CSV")}</button>
          <button
            type="button"
            className="text-btn"
            onClick={() => {
              void navigator.clipboard.writeText(encodeReport(report)).then(
                () => setNote(t(lang, "Đã chép mã phiếu kết quả. Dán mã vào tin nhắn gửi thầy cô.", "Result slip code copied. Paste it into a message to the teacher.")),
                () => setNote(t(lang, "Máy không cho chép tự động. Hãy chọn và chép mã ở ô bên dưới.", "The device did not allow copying. Select and copy the code in the box below.")),
              );
            }}
          >
            {t(lang, "Chép mã phiếu kết quả", "Copy the result slip code")}
          </button>
        </div>
        <details className="no-print">
          <summary>{t(lang, "Xem mã phiếu kết quả", "Show the result slip code")}</summary>
          <p className="lecture-note">{t(lang, "Mã chỉ chứa những số liệu ở trên và tên hồ sơ. Học sinh tự gửi mã cho thầy cô; không có gì được gửi tự động.", "The code holds only the figures above and the profile name. The student sends it to the teacher; nothing is sent automatically.")}</p>
          <textarea readOnly rows={3} value={encodeReport(report)} aria-label={t(lang, "Mã phiếu kết quả", "Result slip code")} onFocus={(event) => event.currentTarget.select()} />
        </details>
      </section>

      <section className="tool-card data-card no-print" aria-labelledby="parent-break">
        <h2 id="parent-break">{t(lang, "Nhắc nghỉ mắt", "Eye-break reminders")}</h2>
        <label className="prefs-row">
          <span>
            {t(lang, "Nhắc sau khi học liền", "Remind after studying for")}
            <small>{t(lang, "Lời nhắc hiện ở đầu trang: nhìn ra xa 20 giây rồi vươn vai. Nhắc cả khi đang làm đề thi thử.", "The reminder shows at the top of the page: look far away for 20 seconds, then stretch. It also shows during a mock exam.")}</small>
          </span>
          <select value={breakEvery} onChange={(event) => writePref("bt-break", event.target.value === "25" ? "" : event.target.value)}>
            <option value="20">{t(lang, "20 phút", "20 minutes")}</option>
            <option value="25">{t(lang, "25 phút", "25 minutes")}</option>
            <option value="45">{t(lang, "45 phút", "45 minutes")}</option>
            <option value="off">{t(lang, "Không nhắc", "Never")}</option>
          </select>
        </label>
      </section>

      <section className="tool-card data-card no-print" aria-labelledby="parent-lock">
        <h2 id="parent-lock">{t(lang, "Khóa của phụ huynh", "Parent lock")}</h2>
        <p className="lecture-note">{t(lang, "Mã PIN giữ các thiết lập dưới đây khỏi bị đổi. Đây là rào chắn trong trình duyệt của máy này: xóa dữ liệu trang web thì khóa cũng mất.", "The PIN keeps the settings below from being changed. It is a barrier inside this browser: clearing the site's data removes the lock too.")}</p>
        {!hasPin ? (
          <form
            className="data-row"
            onSubmit={(event) => {
              event.preventDefault();
              if (!validPin(pin) || pin !== again) {
                setNote(t(lang, "Mã PIN gồm 4 đến 8 chữ số và hai ô phải giống nhau.", "The PIN is 4 to 8 digits and both boxes must match."));
                return;
              }
              void setPin(pin).then(() => {
                setSettings(readParent());
                setUnlocked(true);
                setPinText("");
                setAgain("");
                setNote(t(lang, "Đã đặt mã PIN. Hãy nhớ mã này.", "PIN set. Please remember it."));
              });
            }}
          >
            <label>
              <span>{t(lang, "Mã PIN mới (4–8 chữ số)", "New PIN (4–8 digits)")}</span>
              <input type="password" inputMode="numeric" autoComplete="new-password" value={pin} onChange={(event) => setPinText(event.target.value)} />
            </label>
            <label>
              <span>{t(lang, "Nhập lại mã PIN", "Repeat the PIN")}</span>
              <input type="password" inputMode="numeric" autoComplete="new-password" value={again} onChange={(event) => setAgain(event.target.value)} />
            </label>
            <button type="submit" className="pay-btn">{t(lang, "Đặt mã PIN", "Set the PIN")}</button>
          </form>
        ) : !unlocked ? (
          <form
            className="data-row"
            onSubmit={(event) => {
              event.preventDefault();
              void checkPin(pin).then((ok) => {
                setPinText("");
                setUnlocked(ok);
                setNote(ok ? "" : t(lang, "Mã PIN chưa đúng.", "That PIN is not right."));
              });
            }}
          >
            <label>
              <span>{t(lang, "Nhập mã PIN để đổi thiết lập", "Enter the PIN to change the settings")}</span>
              <input type="password" inputMode="numeric" autoComplete="off" value={pin} onChange={(event) => setPinText(event.target.value)} />
            </label>
            <button type="submit" className="pay-btn">{t(lang, "Mở khóa", "Unlock")}</button>
          </form>
        ) : null}
        {hasPin && unlocked ? (
          <>
            <label className="prefs-row">
              <span>
                {t(lang, "Giới hạn học mỗi ngày", "Daily study limit")}
                <small>{t(lang, "Hết giờ thì màn hình khóa lại; nhập PIN để cho thêm 15 phút.", "When the time is up the screen locks; enter the PIN to allow 15 more minutes.")}</small>
              </span>
              <select value={String(settings.limitMin)} onChange={(event) => save({ ...settings, limitMin: Number(event.target.value) })}>
                <option value="0">{t(lang, "Không giới hạn", "No limit")}</option>
                {[30, 45, 60, 90, 120].map((minutes) => <option key={minutes} value={minutes}>{t(lang, `${minutes} phút`, `${minutes} minutes`)}</option>)}
              </select>
            </label>
            <label className="prefs-row">
              <span>
                {t(lang, "Tắt trợ lý AI trên máy này", "Turn the AI tutor off on this device")}
                <small>{t(lang, "Khi tắt, không câu hỏi nào được gửi ra ngoài. Bài học, gợi ý và lời giải vẫn dùng được.", "When off, no question is sent anywhere. Lessons, hints and solutions still work.")}</small>
              </span>
              <input type="checkbox" checked={settings.tutorOff} onChange={(event) => save({ ...settings, tutorOff: event.target.checked })} />
            </label>
            <div className="data-actions">
              <button type="button" className="text-btn" onClick={() => setUnlocked(false)}>{t(lang, "Khóa lại", "Lock again")}</button>
              <button
                type="button"
                className="text-btn"
                onClick={() => {
                  clearParent();
                  setSettings(readParent());
                  setUnlocked(true);
                  setNote(t(lang, "Đã gỡ khóa của phụ huynh trên máy này.", "The parent lock has been removed from this device."));
                }}
              >
                {t(lang, "Gỡ mã PIN và mọi giới hạn", "Remove the PIN and all limits")}
              </button>
            </div>
          </>
        ) : null}
      </section>

      <section className="tool-card data-card" aria-labelledby="class-board">
        <h2 id="class-board">{t(lang, "Bảng lớp cho thầy cô", "Class table for teachers")}</h2>
        <p className="lecture-note no-print">{t(lang, "Mỗi học sinh mở trang này trên máy của mình, bấm Chép mã phiếu kết quả rồi gửi mã cho thầy cô. Thầy cô dán các mã vào ô dưới đây, mỗi mã một dòng. Bảng nằm trên máy của thầy cô, không qua máy chủ nào. Nên dặn học sinh đặt tên hồ sơ bằng biệt danh hoặc số thứ tự.", "Each student opens this page on their own device, presses Copy the result slip code and sends the code to the teacher. The teacher pastes the codes below, one per line. The table stays on the teacher's device and goes through no server. Ask students to name their profile with a nickname or a class number.")}</p>
        <form
          className="data-row no-print"
          onSubmit={(event) => {
            event.preventDefault();
            const added = codes.split(/\s+/).flatMap((code) => {
              const row = decodeReport(code);
              return row ? [row] : [];
            });
            if (added.length === 0) {
              setNote(t(lang, "Không đọc được mã nào. Mã phiếu bắt đầu bằng BT1.", "No code could be read. A slip code starts with BT1."));
              return;
            }
            const names = new Set(added.map((row) => row.name));
            const next = [...rows.filter((row) => row.name === "" || !names.has(row.name)), ...added].slice(-60);
            setRows(next);
            saveClass(next);
            setCodes("");
            setNote(t(lang, `Đã thêm ${added.length} phiếu. Phiếu mới thay phiếu cũ của cùng một tên.`, `Added ${added.length} slip(s). A new slip replaces the old one with the same name.`));
          }}
        >
          <label>
            <span>{t(lang, "Dán mã phiếu của học sinh", "Paste the students' slip codes")}</span>
            <textarea rows={3} value={codes} onChange={(event) => setCodes(event.target.value)} placeholder="BT1.…" spellCheck={false} />
          </label>
          <button type="submit" className="text-btn">{t(lang, "Thêm vào bảng", "Add to the table")}</button>
        </form>
        {rows.length === 0 ? <p className="empty no-print">{t(lang, "Bảng lớp chưa có phiếu nào.", "The class table has no slips yet.")}</p> : (
          <>
            <div className="thpt-scroll">
              <table className="thpt-table report-table">
                <caption className="sr">{t(lang, "Bảng lớp từ các phiếu kết quả", "Class table from result slips")}</caption>
                <thead>
                  <tr>
                    <th scope="col">{t(lang, "Tên", "Name")}</th>
                    <th scope="col">{t(lang, "Lớp", "Grade")}</th>
                    <th scope="col">{t(lang, "Ngày lập", "Made")}</th>
                    <th scope="col">{t(lang, "Phút/7 ngày", "Min/7 days")}</th>
                    <th scope="col">{t(lang, "Chuỗi ngày", "Streak")}</th>
                    <th scope="col">{t(lang, "Bài đã xong", "Lessons")}</th>
                    <th scope="col">{t(lang, "Câu đúng", "Correct")}</th>
                    <th scope="col">{t(lang, "Đề gần nhất", "Last exam")}</th>
                    <th scope="col">{t(lang, "Sổ lỗi", "Misses")}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={`${row.name}-${row.made}-${index}`}>
                      <th scope="row">{row.name || t(lang, "(chưa đặt tên)", "(unnamed)")}</th>
                      <td>{row.grade === "adult" ? t(lang, "người lớn", "adult") : row.grade}</td>
                      <td>{row.made}</td>
                      <td>{weekMinutes(row)}</td>
                      <td>{row.streak}</td>
                      <td>{total(row.lessons)}</td>
                      <td>{total(row.topics)}</td>
                      <td>{row.exams[0] ? String(row.exams[0].total).replace(".", lang === "en" ? "." : ",") : ""}</td>
                      <td>{row.misses}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="data-actions no-print">
              <button type="button" className="pay-btn" onClick={() => download(`bang-lop-ban-toan-${new Date().toISOString().slice(0, 10)}.csv`, reportCsv(rows), "text/csv;charset=utf-8")}>{t(lang, "Tải bảng lớp (CSV)", "Download the class table (CSV)")}</button>
              <button type="button" className="text-btn" onClick={() => window.print()}>{t(lang, "In bảng lớp", "Print the class table")}</button>
              <button
                type="button"
                className="text-btn"
                onClick={() => {
                  if (!window.confirm(t(lang, "Xóa toàn bộ bảng lớp trên máy này?", "Delete the whole class table on this device?"))) return;
                  setRows([]);
                  saveClass([]);
                }}
              >
                {t(lang, "Xóa bảng lớp", "Clear the class table")}
              </button>
            </div>
          </>
        )}
      </section>
    </PageFrame>
  );
}
