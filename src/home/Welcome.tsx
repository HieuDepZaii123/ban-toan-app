import { useState } from "react";
import { QUESTION_TOTAL } from "../content/cards.ts";
import { A } from "../lib/route.tsx";
import { countRight, useSlice } from "../lib/store.ts";
import { t } from "../lib/text.ts";
import { useLang } from "../ui/useLang.ts";

const CURVE_KEY = "bt-curve";
const NOTE_KEY = "bt-notes-pad";

/** Đầu trang chủ: Bàn Toán là nơi học, nghiên cứu và sáng tạo, rồi các công cụ để làm điều đó. */
export function Welcome() {
  const lang = useLang();
  return (
    <section className="hero-welcome">
      <h1>{t(lang, "Bàn Toán – nơi học tập, nghiên cứu và sáng tạo.", "Bàn Toán – a place to learn, research and create.")}</h1>
      <p className="lead hero-call">{t(lang, "Hãy biến những ý tưởng của bạn thành hiện thực.", "Turn your ideas into reality.")}</p>
      {/* One short line per word of the title: học tập, nghiên cứu, sáng tạo. */}
      <p className="lead hero-ways">
        <span>{t(lang, "Học bằng cách kéo hình và nhìn con số đổi theo.", "Learn by dragging a figure and watching the numbers follow.")}</span>
        <span>{t(lang, "Nghiên cứu bằng cách tự đặt giả thuyết rồi kiểm chứng.", "Research by making a guess and testing it yourself.")}</span>
        <span>{t(lang, "Sáng tạo bằng cách dựng hình, dựng khối theo ý mình.", "Create by building figures and solids your own way.")}</span>
      </p>
      <p className="lead home-premium">
        {t(
          lang,
          "Bài học và luyện tập miễn phí. Đề thi thử đầu tiên miễn phí. Premium dành cho đề không giới hạn, ôn lỗi sai theo lịch và trợ lý sâu hơn.",
          "Lessons and practice stay free. The first mock exam is free. Premium is for unlimited papers, scheduled mistake review and a deeper tutor.",
        )}{" "}
        <A href="/nang-cap">{t(lang, "Xem Premium", "See Premium")}</A>
      </p>
    </section>
  );
}

/** Các tiện ích nhỏ của góc bàn: đường tiến độ, tiếp tuyến, sổ tay, bàn bên cạnh. */
export function DeskTools() {
  return (
    <div className="home-tools">
      <ProgressCurve />
      <FormulaPeek />
      <NotePad />
      <Circle />
    </div>
  );
}

function ProgressCurve() {
  const lang = useLang();
  const done = Math.min(useSlice((data) => countRight(data.right)), QUESTION_TOTAL);
  const [seen, setSeen] = useState(done);
  const [points, setPoints] = useState<number[]>(() => stampCurve(done));
  if (seen !== done) {
    setSeen(done);
    setPoints(stampCurve(done));
  }

  const drawn = points.length < 2 ? [0, points[0] ?? 0] : points;
  const max = Math.max(QUESTION_TOTAL, ...drawn, 1);
  const step = 240 / (drawn.length - 1);
  const coords = drawn.map((value, index) => `${(index * step).toFixed(1)},${(70 - (value / max) * 58).toFixed(1)}`);
  const line = coords.join(" ");
  return (
    <section className="tool-card" aria-label={t(lang, "Tiến độ", "Progress")}>
      <b>{t(lang, "Đường tiến độ", "Progress")}</b>
      <svg viewBox="0 0 240 78" className="curve" role="img" aria-label={t(lang, `${done} câu đúng`, `${done} correct`)}>
        <polyline points={line} />
      </svg>
      <small>{t(lang, `${done}/${QUESTION_TOTAL} câu đúng trên máy này.`, `${done}/${QUESTION_TOTAL} correct on this device.`)}</small>
    </section>
  );
}

function FormulaPeek() {
  const lang = useLang();
  const [at, setAt] = useState(1);
  const slope = 2 * at;
  const y0 = at * at;
  return (
    <section className="tool-card peek" tabIndex={0}>
      <b>{t(lang, "Tiếp tuyến của y = x²", "Tangent to y = x²")}</b>
      <p className="lecture-note">{t(lang, "Rê vào thẻ: tiếp tuyến chạy theo x.", "Hover the card: the tangent follows x.")}</p>
      <div className="peek-stage">
        <svg viewBox="-2.2 -0.4 4.4 4.6" className="peek-plot" aria-hidden="true">
          <line x1="-2" y1="0" x2="2" y2="0" className="axis" />
          <line x1="0" y1="0" x2="0" y2="4" className="axis" />
          <path d="M-2 4 Q0 0 2 4" className="curve-path" />
          <line
            x1={at - 1.2}
            y1={y0 - slope * 1.2}
            x2={at + 1.2}
            y2={y0 + slope * 1.2}
            className="tangent"
          />
          <circle cx={at} cy={y0} r="0.08" />
        </svg>
        <label>
          x = {at.toFixed(1)}
          <input type="range" min={-1.5} max={1.5} step={0.1} value={at} onChange={(event) => setAt(Number(event.target.value))} />
        </label>
        <small>{`y = ${slope.toFixed(1)}(x − ${at.toFixed(1)}) + ${y0.toFixed(2)}`}</small>
      </div>
    </section>
  );
}

function stampCurve(done: number): number[] {
  const day = new Date().toISOString().slice(0, 10);
  let series: { d: string; n: number }[] = [];
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(CURVE_KEY) || "[]");
    if (Array.isArray(parsed)) {
      series = parsed.flatMap((item) => {
        if (!item || typeof item !== "object") return [];
        const row = item as { d?: string; n?: number };
        if (typeof row.d !== "string" || typeof row.n !== "number") return [];
        return [{ d: row.d, n: row.n }];
      });
    }
  } catch {
    series = [];
  }
  const last = series.at(-1);
  if (!last || last.d !== day) series.push({ d: day, n: done });
  else last.n = done;
  series = series.slice(-8);
  try { localStorage.setItem(CURVE_KEY, JSON.stringify(series)); } catch { /* ignore */ }
  return series.map((item) => item.n);
}

function NotePad() {
  const lang = useLang();
  const [text, setText] = useState(() => {
    try { return localStorage.getItem(NOTE_KEY) || ""; } catch { return ""; }
  });
  return (
    <section className="tool-card">
      <b>{t(lang, "Sổ tay", "Notebook")}</b>
      <textarea
        value={text}
        maxLength={2000}
        placeholder={t(lang, "Một ý toán bạn muốn giữ. Chỉ lưu trên máy này.", "A line of maths to keep. Stored only on this device.")}
        aria-label={t(lang, "Ghi chú cá nhân", "Personal notes")}
        onChange={(event) => {
          setText(event.target.value);
          try { localStorage.setItem(NOTE_KEY, event.target.value); } catch { /* ignore */ }
        }}
      />
    </section>
  );
}

function Circle() {
  const lang = useLang();
  const done = useSlice((data) => countRight(data.right));
  const friends = [
    { name: "Lan", line: "Đạo hàm · 11 câu" },
    { name: "Minh", line: "Xác suất · 8 câu" },
    { name: "Hà", line: "Hình · 13 câu" },
  ];
  return (
    <section className="tool-card" aria-label={t(lang, "Bảng trên máy này", "Scores on this device")}>
      <b>{t(lang, "Bàn bên cạnh", "Nearby desk")}</b>
      <p className="lecture-note">{t(lang, "Bảng giả lập, không có máy chủ.", "A local board, with no server.")}</p>
      <ul>
        <li><span>{t(lang, "Bạn", "You")}</span><b>{done}</b></li>
        {friends.map((friend) => (
          <li key={friend.name}><span>{friend.name}</span><small>{friend.line}</small></li>
        ))}
      </ul>
    </section>
  );
}
