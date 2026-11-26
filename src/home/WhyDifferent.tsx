import { t } from "../lib/text.ts";
import { useLang } from "../ui/useLang.ts";

/**
 * "Cách Bàn Toán hoạt động": what the app does, one card per feature, each a thing it does today
 * (see the file named in each comment). No promised results: the app has no outcome data yet.
 * Learning, investigating and building are covered by the three blocks at the top of the page.
 */
const REASONS: { id: string; vi: string; en: string; bodyVi: string; bodyEn: string }[] = [
  {
    // src/labs/*, src/lib/math.ts
    id: "hinh-keo",
    vi: "Hình kéo được ở mỗi chuyên đề", en: "A figure to drag on every topic",
    bodyVi: "Đổi tham số là đồ thị và con số đổi theo ngay. Hình và lời giải tính từ cùng một nguồn nên khớp nhau.",
    bodyEn: "Change a parameter and the graph and the numbers follow at once. The figure and the solution are computed from one source, so they match.",
  },
  {
    // src/content/dang/types.ts: a step is a claim and its reason
    id: "ly-do",
    vi: "Mỗi bước có lý do", en: "A reason for every step",
    bodyVi: "Lời giải viết thành từng cặp: điều khẳng định và vì sao nó đúng.",
    bodyEn: "Solutions are written as pairs: what is claimed and why it holds.",
  },
  {
    // src/content/vary/*, src/lib/prng.ts, dss/
    id: "so-moi",
    vi: "Số mới mỗi lần làm", en: "New numbers every attempt",
    bodyVi: "Mỗi lần làm là một bộ số mới, đáp án đúng đổi chỗ, và các đáp án sai là những lỗi hay gặp. Câu Đúng / Sai / Chưa đủ hỏi xem điều kiện đã đủ chưa.",
    bodyEn: "Each attempt has new numbers, the right answer moves, and the wrong choices are common mistakes. True / False / Not enough questions ask whether a condition is enough.",
  },
  {
    // scripts/*: SymPy oracles run in CI on every change
    id: "kiem-chung",
    vi: "Kiểm bằng SymPy", en: "Checked with SymPy",
    bodyVi: "Các con số trong bài được đối chiếu với SymPy và một bộ tính độc lập, hơn 1.800 phép kiểm, chạy lại mỗi khi nội dung thay đổi.",
    bodyEn: "The numbers in lessons are checked against SymPy and an independent calculator, over 1,800 checks, re-run whenever the content changes.",
  },
  {
    // src/thpt/review.ts: INTERVAL_DAYS = [1, 3, 7, 14]
    id: "on-lai",
    vi: "Ôn lại câu sai theo lịch", en: "Missed questions on a schedule",
    bodyVi: "Câu sai trong đề thi thử quay lại sau 1, 3, 7 và 14 ngày. Sai lần nữa thì lịch bắt đầu lại.",
    bodyEn: "Questions missed in a mock exam come back after 1, 3, 7 and 14 days. Miss one again and its schedule starts over.",
  },
  {
    // server/chat/policy.ts, facts.ts, check.ts; src/parent/parentMode.ts
    id: "tro-ly",
    vi: "Trợ lý và chấm bài", en: "Tutor and marking",
    bodyVi: "Trợ lý chỉ trả lời câu hỏi toán. Bản miễn phí gợi ý từng bước; lời giải đầy đủ có trong Premium. Máy chủ tự tính Δ và nghiệm để AI không nhầm. Chấm bài chỉ ra bước sai đầu tiên trong bài làm của bạn.",
    bodyEn: "The tutor only answers maths questions. The free version hints step by step; full solutions are in Premium. The server works out Δ and the roots so the AI does not slip. Marking points to the first wrong step in your own working.",
  },
];

/** Thực trạng: the problems Bàn Toán was made to address, in the founder's words. */
const PROBLEMS: { id: string; vi: string; en: string; bodyVi: string; bodyEn: string }[] = [
  {
    id: "hoc-sinh",
    vi: "Học sinh:", en: "Students:",
    bodyVi: "chỉ học để thi, thi xong rồi quên, không áp dụng được vào đời sống.",
    bodyEn: "learn only for the exam, forget it afterwards, and cannot use it in everyday life.",
  },
  {
    id: "giao-vien",
    vi: "Giáo viên:", en: "Teachers:",
    bodyVi: "nhiều nội dung và cách dạy đã lỗi thời, chưa theo kịp công nghệ.",
    bodyEn: "much of what is taught, and how, is out of date and has not kept up with technology.",
  },
  {
    id: "phu-huynh",
    vi: "Phụ huynh:", en: "Parents:",
    bodyVi: "chi nhiều tiền cho việc học của con nhưng không hiệu quả.",
    bodyEn: "spend a lot on their children's learning without much effect.",
  },
];

/** Lợi ích: each line is something the app does today (route or file in the comment). */
const BENEFITS: { id: string; vi: string; en: string; items: { vi: string; en: string }[] }[] = [
  {
    id: "hoc-sinh",
    vi: "Học sinh", en: "Students",
    items: [
      // src/labs/*
      { vi: "Kéo hình, đổi tham số để tự thấy vì sao công thức đúng, thay vì học thuộc.", en: "Drag figures and change parameters to see why a formula holds, instead of memorising it." },
      // /nghien-cuu
      { vi: "Bài nghiên cứu: nêu giả thuyết, đo số liệu, viết kết luận như một nhà nghiên cứu.", en: "Investigations: state a guess, measure data and write a conclusion like a researcher." },
      // src/thpt/review.ts, /cham-bai
      { vi: "Câu sai quay lại theo lịch 1, 3, 7, 14 ngày để nhớ lâu; chấm bài chỉ ra bước sai đầu tiên.", en: "Missed questions come back after 1, 3, 7 and 14 days so they stick; marking shows the first wrong step." },
    ],
  },
  {
    id: "giao-vien",
    vi: "Giáo viên", en: "Teachers",
    items: [
      // src/labs/*, /xuong-hinh
      { vi: "Hình động kéo được và Xưởng hình để minh họa trực tiếp trên lớp.", en: "Draggable figures and the Workshop to demonstrate live in class." },
      // /soan-tai-lieu
      { vi: "Soạn tài liệu có công thức, xuất PDF hoặc Word ngay.", en: "Write handouts with formulas and export to PDF or Word straight away." },
      // src/content/vary/*, scripts/*
      { vi: "Bài tập sinh số mới mỗi lần, đáp án được kiểm bằng SymPy.", en: "Exercises with new numbers each time, answers checked with SymPy." },
    ],
  },
  {
    id: "phu-huynh",
    vi: "Phụ huynh", en: "Parents",
    items: [
      // /nang-cap
      { vi: "Bài học và luyện tập miễn phí; Premium chỉ dành cho phần nâng cao.", en: "Lessons and practice are free; Premium is only for the extras." },
      // /phu-huynh, /bao-cao
      { vi: "Báo cáo tuần: số đề thi thử con đã làm, số bài được chấm và số lỗi đã tự sửa.", en: "A weekly report: mock papers your child finished, problems marked and mistakes they fixed." },
      // src/parent/parentMode.ts
      { vi: "Chế độ phụ huynh có mã PIN: trợ lý chỉ gợi ý, không đưa lời giải sẵn.", en: "PIN-protected parent mode: the tutor hints instead of handing over solutions." },
    ],
  },
];

export function WhyDifferent() {
  const lang = useLang();
  return (
    <section id="vi-sao" className="stream why" aria-labelledby="why-title">
      <div className="why-story">
        <h2 id="why-story-title">{t(lang, "Vì sao có Bàn Toán", "Why Bàn Toán exists")}</h2>
        <p>
          {t(
            lang,
            "Mình tạo ra Bàn Toán vì muốn thay đổi tận gốc cách học, tiếp cận và nhìn nhận toán: theo hướng nghiên cứu, sáng tạo và tạo ra những ý tưởng thiết thực cho đời sống hằng ngày, không gò bó.",
            "I built Bàn Toán to change, from the ground up, how maths is learned, approached and seen: through investigation and creativity, producing ideas that are useful in everyday life, without being boxed in.",
          )}
        </p>
        <p>
          {t(
            lang,
            "“Bàn Toán” là một chiếc bàn để học, làm việc, nghiên cứu và sáng tạo toán. Ý tưởng lấy từ chiếc bàn học: tông màu vàng gỗ, và có đầy đủ công cụ cho người học.",
            "“Bàn Toán” means “maths desk”: a desk for learning, working on, investigating and creating maths. The idea comes from a study desk, in warm wood-yellow tones, with every tool a learner needs.",
          )}
        </p>
        <h3>{t(lang, "Thực trạng học toán hiện nay", "How maths is learned today")}</h3>
        <ul className="why-problems">
          {PROBLEMS.map((item) => (
            <li key={item.id}>
              <strong>{t(lang, item.vi, item.en)}</strong> {t(lang, item.bodyVi, item.bodyEn)}
            </li>
          ))}
        </ul>
        <p>{t(lang, "Bàn Toán được làm ra để sửa những vấn đề này.", "Bàn Toán is built to fix these problems.")}</p>
        <h3>{t(lang, "Lợi ích cho từng người", "What each person gets")}</h3>
        <div className="why-grid">
          {BENEFITS.map((group) => (
            <article key={group.id} className="why-card" aria-labelledby={`benefit-${group.id}`}>
              <h4 id={`benefit-${group.id}`}>{t(lang, group.vi, group.en)}</h4>
              <ul>
                {group.items.map((item) => (
                  <li key={item.vi}>{t(lang, item.vi, item.en)}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
      <h2 id="why-title">{t(lang, "Cách Bàn Toán hoạt động", "How Bàn Toán works")}</h2>
      <div className="why-grid">
        {REASONS.map((reason) => (
          <article key={reason.id} className="why-card" aria-labelledby={`why-${reason.id}`}>
            <h3 id={`why-${reason.id}`}>{t(lang, reason.vi, reason.en)}</h3>
            <p>{t(lang, reason.bodyVi, reason.bodyEn)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
