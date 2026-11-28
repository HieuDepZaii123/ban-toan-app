import { type ReactNode, useState } from "react";
import { QUESTION_TOTAL } from "../content/cards.ts";
import { A } from "../lib/route.tsx";
import { countRight, useSlice } from "../lib/store.ts";
import { t } from "../lib/text.ts";
import { useLang } from "../ui/useLang.ts";

const CURVE_KEY = "bt-curve";
const NOTE_KEY = "bt-notes-pad";

/**
 * Đầu trang chủ: tiêu đề, rồi `start` (học tiếp và tìm tờ: việc chính nên nằm ngay dưới tiêu đề),
 * rồi ba lối vào chính và phần miễn phí / Premium.
 */
export function Welcome({ start, searching = false }: { start?: ReactNode; searching?: boolean }) {
  const lang = useLang();
  return (
    <section className="hero-welcome">
      <p className="kicker">{t(lang, "Toán lớp 1–12", "Maths, grades 1–12")}</p>
      <h1>{t(lang, "Kéo hình, làm bài, xem lời giải từng bước.", "Drag the figure, try the problem, read each step.")}</h1>
      <p className="lead">
        {t(
          lang,
          "Mười bốn chuyên đề THPT, 182 bài từ lớp 1 đến lớp 12 và 28 bài nghiên cứu, có gợi ý và lời giải.",
          "Fourteen upper-secondary topics, 182 lessons from grade 1 to 12 and 28 investigations, with hints and worked solutions.",
        )}{" "}
        <a href="#vi-sao">{t(lang, "Cách Bàn Toán hoạt động", "How Bàn Toán works")}</a>
      </p>
      {start}
      {/* While searching, the results come straight after the search box. */}
      {searching ? null : <>
      {/* Counts are the app's real numbers (14 topics, 182 grade lessons, 28 studies). */}
      <div className="pillars">
        {PILLARS.map((pillar) => (
          <article key={pillar.id} className="pillar" aria-labelledby={`pillar-${pillar.id}`}>
            <PillarMark id={pillar.id} />
            <h2 id={`pillar-${pillar.id}`}>{t(lang, pillar.vi, pillar.en)}</h2>
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
      </>}
    </section>
  );
}

type PillarId = "hoc" | "nghien-cuu" | "sang-tao";

const PILLARS: {
  id: PillarId;
  vi: string; en: string;
  bodyVi: string; bodyEn: string;
  links: { href: string; vi: string; en: string }[];
}[] = [
  {
    id: "hoc",
    vi: "Học", en: "Learn",
    bodyVi: "Kéo một tham số, đồ thị và con số đổi theo. Mỗi bài giải từng bước, bước nào cũng ghi lý do.",
    bodyEn: "Drag a parameter and the graph and the numbers follow. Every lesson is worked step by step, with a reason for each step.",
    links: [
      { href: "#chuyen-de", vi: "Chuyên đề", en: "Topics" },
      { href: "/kien-thuc", vi: "Lớp 1–12", en: "Grades 1–12" },
      { href: "/thi-thu", vi: "Thi thử 2025", en: "2025 mock exam" },
      { href: "/bao-cao-ca-nhan", vi: "Báo cáo", en: "Report" },
    ],
  },
  {
    id: "nghien-cuu",
    vi: "Nghiên cứu", en: "Investigate",
    bodyVi: "Nêu giả thuyết, đo năm dòng số liệu, xem đồ thị, viết kết luận, rồi đối chiếu với chứng minh.",
    bodyEn: "State a guess, measure five rows of data, read the graph, write a conclusion, then compare it with the proof.",
    links: [
      { href: "/nghien-cuu", vi: "Nghiên cứu", en: "Research" },
      { href: "/khoa-hoc", vi: "Khoa học", en: "Science" },
    ],
  },
  {
    id: "sang-tao",
    vi: "Dựng hình và soạn đề", en: "Build and write",
    bodyVi: "Dựng hình phẳng, xoay tám loại khối, soạn đề và phiếu học có công thức rồi xuất PDF hoặc Word.",
    bodyEn: "Build plane figures, turn eight kinds of solid, write tests and worksheets with formulas and export them to PDF or Word.",
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

/** Các tiện ích nhỏ của góc bàn: đường tiến độ, tiếp tuyến, sổ tay. */
export function DeskTools() {
  return (
    <div className="home-tools">
      <ProgressCurve />
      <FormulaPeek />
      <NotePad />
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
