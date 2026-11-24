import { t } from "../lib/text.ts";
import { useLang } from "../ui/useLang.ts";

/**
 * "Cách Bàn Toán hoạt động": what the app does, one card per feature, each a thing it does today.
 * Card titles read "Không …, hãy …": the habit to drop, then what the feature lets you do instead
 * (see the file named in each comment). No promised results: the app has no outcome data yet.
 * Learning, investigating and building are covered by the three blocks at the top of the page.
 */
const REASONS: { id: string; noVi: string; noEn: string; yesVi: string; yesEn: string; bodyVi: string; bodyEn: string }[] = [
  {
    // src/labs/*, src/lib/math.ts
    id: "hinh-keo",
    noVi: "Không học thuộc công thức,", noEn: "Don't memorise the formula.",
    yesVi: "hãy nhìn nó thay đổi.", yesEn: "Watch it change.",
    bodyVi: "Đổi tham số là đồ thị và con số đổi theo ngay. Hình và lời giải tính từ cùng một nguồn nên khớp nhau.",
    bodyEn: "Change a parameter and the graph and the numbers follow at once. The figure and the solution are computed from one source, so they match.",
  },
  {
    // src/content/dang/types.ts: a step is a claim and its reason
    id: "ly-do",
    noVi: "Không chỉ ghi phép biến đổi,", noEn: "Don't just write the algebra.",
    yesVi: "hãy hiểu lý do từng bước.", yesEn: "Know the reason for each step.",
    bodyVi: "Lời giải viết thành từng cặp: điều khẳng định và vì sao nó đúng.",
    bodyEn: "Solutions are written as pairs: what is claimed and why it holds.",
  },
  {
    // src/content/vary/*, src/lib/prng.ts, dss/
    id: "so-moi",
    noVi: "Không học vẹt đáp án,", noEn: "Don't memorise answers.",
    yesVi: "hãy hiểu vì sao nó đúng.", yesEn: "Know why they are right.",
    bodyVi: "Mỗi lần làm là một bộ số mới, đáp án đúng đổi chỗ, và các đáp án sai là những lỗi hay gặp. Câu Đúng / Sai / Chưa đủ hỏi xem điều kiện đã đủ chưa.",
    bodyEn: "Each attempt has new numbers, the right answer moves, and the wrong choices are common mistakes. True / False / Not enough questions ask whether a condition is enough.",
  },
  {
    // scripts/*: SymPy oracles run in CI on every change
    id: "kiem-chung",
    noVi: "Không đoán số liệu,", noEn: "Don't guess at the numbers.",
    yesVi: "hãy học trên số đã kiểm bằng SymPy.", yesEn: "Learn from numbers checked with SymPy.",
    bodyVi: "Các con số trong bài được đối chiếu với SymPy và một bộ tính độc lập, hơn 1.800 phép kiểm, chạy lại mỗi khi nội dung thay đổi.",
    bodyEn: "The numbers in lessons are checked against SymPy and an independent calculator, over 1,800 checks, re-run whenever the content changes.",
  },
  {
    // src/thpt/review.ts: INTERVAL_DAYS = [1, 3, 7, 14]
    id: "on-lai",
    noVi: "Không ôn lại cả đề,", noEn: "Don't redo whole papers.",
    yesVi: "hãy ôn đúng câu đã sai.", yesEn: "Review exactly what you missed.",
    bodyVi: "Câu sai trong đề thi thử quay lại sau 1, 3, 7 và 14 ngày. Sai lần nữa thì lịch bắt đầu lại.",
    bodyEn: "Questions missed in a mock exam come back after 1, 3, 7 and 14 days. Miss one again and its schedule starts over.",
  },
  {
    // server/chat/policy.ts, facts.ts, check.ts; src/parent/parentMode.ts
    id: "tro-ly",
    noVi: "Không chép lời giải,", noEn: "Don't copy a solution.",
    yesVi: "hãy tìm bước sai của chính mình.", yesEn: "Find your own wrong step.",
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
            <h3 id={`why-${reason.id}`}>
              <span className="no">{t(lang, reason.noVi, reason.noEn)}</span>{" "}
              <span className="yes">{t(lang, reason.yesVi, reason.yesEn)}</span>
            </h3>
            <p>{t(lang, reason.bodyVi, reason.bodyEn)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
