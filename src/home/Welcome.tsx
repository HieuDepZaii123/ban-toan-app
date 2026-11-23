import { useState } from "react";
import { QUESTION_TOTAL } from "../content/cards.ts";
import { A } from "../lib/route.tsx";
import { countRight, useSlice } from "../lib/store.ts";
import { t } from "../lib/text.ts";
import { useLang } from "../ui/useLang.ts";

const CURVE_KEY = "bt-curve";
const NOTE_KEY = "bt-notes-pad";

/** Đầu trang chủ, viết theo một giọng: "Không …, hãy …". Vế "Không" nhạt, vế "hãy" đậm. */
export function Welcome() {
  const lang = useLang();
  return (
    <section className="hero-welcome">
      <p className="kicker">{t(lang, "Bàn Toán – nơi học tập, nghiên cứu và sáng tạo", "Bàn Toán – a place to learn, research and create")}</p>
      <h1>
        <span className="no">{t(lang, "Không học thuộc công thức toán học,", "Don't memorise maths formulas.")}</span>{" "}
        <span className="yes">{t(lang, "hãy hiểu nó.", "Understand them.")}</span>
      </h1>
      <p className="lead hero-manifesto">
        {t(
          lang,
          "Không chép công thức rồi giải theo bài mẫu, hãy nhìn toán chuyển động, tự đặt câu hỏi và tự kiểm chứng. Không nhớ trước rồi mới hiểu, hãy hiểu vì sao trước, rồi bạn sẽ nhớ.",
          "Don't copy formulas and follow the worked example. Watch maths move, ask your own questions and test them yourself. Don't remember first and hope to understand later. Understand why first, and you will remember.",
        )}{" "}
        <a href="#vi-sao">{t(lang, "Vì sao Bàn Toán khác?", "Why is Bàn Toán different?")}</a>
      </p>
      <p className="lead hero-call">{t(lang, "Hãy biến những ý tưởng của bạn thành hiện thực.", "Turn your ideas into reality.")}</p>
      {/* One block per word of the title. Counts are the app's real numbers (14 topics, 182 grade lessons, 28 studies). */}
      <div className="pillars">
        {PILLARS.map((pillar) => (
          <article key={pillar.id} className="pillar" aria-labelledby={`pillar-${pillar.id}`}>
            <PillarMark id={pillar.id} />
            <h2 id={`pillar-${pillar.id}`}>{t(lang, pillar.vi, pillar.en)}</h2>
            <p className="pillar-gist">
              <span className="no">{t(lang, pillar.noVi, pillar.noEn)}</span>{" "}
              <span className="yes">{t(lang, pillar.yesVi, pillar.yesEn)}</span>
            </p>
            <p className="pillar-body">{t(lang, pillar.bodyVi, pillar.bodyEn)}</p>
            <p className="pillar-links">
              {pillar.links.map((link) => (
                link.href.startsWith("#")
                  ? <a key={link.href} href={link.href}>{t(lang, link.vi, link.en)}</a>
                  : <A key={link.href} href={link.href}>{t(lang, link.vi, link.en)}</A>
              ))}
            </p>
          </article>
        ))}
      </div>
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

type PillarId = "hoc" | "nghien-cuu" | "sang-tao";

const PILLARS: {
  id: PillarId;
  vi: string; en: string;
  /** "Không …," then "hãy …": the habit to drop, then what to do instead. */
  noVi: string; noEn: string;
  yesVi: string; yesEn: string;
  bodyVi: string; bodyEn: string;
  links: { href: string; vi: string; en: string }[];
}[] = [
  {
    id: "hoc",
    vi: "Học tập", en: "Learn",
    noVi: "Không chép công thức,", noEn: "Don't copy the formula.",
    yesVi: "hãy nhìn nó chuyển động.", yesEn: "Watch it move.",
    bodyVi: "Kéo một tham số, đồ thị đổi theo ngay trước mắt. Mười bốn chuyên đề THPT và 182 bài từ lớp 1 đến lớp 12, bài nào cũng giải từng bước và nói rõ vì sao.",
    bodyEn: "Drag a parameter and the graph changes right in front of you. Fourteen upper-secondary topics and 182 lessons from grade 1 to 12, each worked step by step with the reason for every step.",
    links: [
      { href: "#chuyen-de", vi: "Chuyên đề", en: "Topics" },
      { href: "/kien-thuc", vi: "Lớp 1–12", en: "Grades 1–12" },
      { href: "/thi-thu", vi: "Thi thử 2025", en: "2025 mock exam" },
    ],
  },
  {
    id: "nghien-cuu",
    vi: "Nghiên cứu", en: "Research",
    noVi: "Không làm theo bài mẫu,", noEn: "Don't follow the example.",
    yesVi: "hãy tự đặt câu hỏi.", yesEn: "Ask your own question.",
    bodyVi: "Nêu giả thuyết, tự đo, tự vẽ đồ thị, rồi đối chiếu với chứng minh. 28 bài nghiên cứu dẫn bạn đi từ phỏng đoán đến chắc chắn.",
    bodyEn: "Make a guess, measure it, plot it yourself, then check it against the proof. 28 investigations take you from a hunch to certainty.",
    links: [
      { href: "/nghien-cuu", vi: "Nghiên cứu", en: "Research" },
      { href: "/khoa-hoc", vi: "Khoa học", en: "Science" },
    ],
  },
  {
    id: "sang-tao",
    vi: "Sáng tạo", en: "Create",
    noVi: "Không chỉ giải đề có sẵn,", noEn: "Don't just solve set problems.",
    yesVi: "hãy tự làm ra đề.", yesEn: "Make your own.",
    bodyVi: "Dựng hình phẳng, xoay khối không gian, soạn đề và phiếu học có công thức. Điều bạn nghĩ ra, bạn làm ra được ở đây.",
    bodyEn: "Build plane figures, turn solids in space, write tests and worksheets with formulas. What you think up, you can make here.",
    links: [
      { href: "/xuong-hinh", vi: "Xưởng hình", en: "Workshop" },
      { href: "/soan-tai-lieu", vi: "Soạn tài liệu", en: "Documents" },
    ],
  },
];

/** A small drawing for each pillar: a parabola with its tangent, measured points with a fitted line, a cube. */
function PillarMark({ id }: { id: PillarId }) {
  return (
    <svg className="pillar-mark" viewBox="0 0 72 44" aria-hidden="true">
      {id === "hoc" ? (
        <>
          <path d="M8 6 Q36 64 64 6" />
          <path className="soft" d="M22 40 L62 10" />
          <circle cx="46" cy="22" r="3" />
        </>
      ) : null}
      {id === "nghien-cuu" ? (
        <>
          <path className="soft" d="M6 38 L66 8" />
          {[[12, 33], [20, 31], [27, 25], [35, 24], [43, 18], [51, 16], [60, 10]].map(([x, y]) => (
            <circle key={x} cx={x} cy={y} r="2.6" />
          ))}
        </>
      ) : null}
      {id === "sang-tao" ? (
        <>
          <path d="M18 14 H46 V40 H18 Z M18 14 L30 4 H58 L46 14 M58 4 V30 L46 40" />
          <path className="soft" d="M18 40 L30 30 H58 M30 30 V4" />
        </>
      ) : null}
    </svg>
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
