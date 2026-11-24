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

export function WhyDifferent() {
  const lang = useLang();
  return (
    <section id="vi-sao" className="stream why" aria-labelledby="why-title">
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
