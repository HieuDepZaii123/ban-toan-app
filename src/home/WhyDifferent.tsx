import { t } from "../lib/text.ts";
import { useLang } from "../ui/useLang.ts";

/**
 * "Vì sao Bàn Toán khác": each reason names the usual habit it rejects ("Không …") and the feature that replaces it.
 * Every claim is something the app does today (see the file named in each comment). No promised results:
 * the app has no outcome data yet, so the copy describes the method, not test scores.
 */
const REASONS: { id: string; oldVi: string; oldEn: string; vi: string; en: string; bodyVi: string; bodyEn: string }[] = [
  {
    // src/labs/*, src/lib/math.ts
    id: "thay-truoc",
    oldVi: "học thuộc công thức", oldEn: "rote formulas",
    vi: "Thấy trước, nhớ sau", en: "See first, remember later",
    bodyVi: "Mỗi chuyên đề có một hình kéo được. Đổi tham số là đồ thị và con số đổi theo ngay, và hình với lời giải tính từ cùng một nguồn nên không bao giờ lệch nhau.",
    bodyEn: "Every topic has a figure you can drag. Change a parameter and the graph and the numbers follow at once, and the figure and the solution are computed from one source, so they never disagree.",
  },
  {
    // src/content/dang/types.ts: a step is a claim and its reason
    id: "ly-do",
    oldVi: "chỉ ghi phép biến đổi", oldEn: "bare algebra",
    vi: "Mỗi bước có một lý do", en: "Every step has a reason",
    bodyVi: "Lời giải được viết thành từng cặp: điều khẳng định và vì sao nó đúng. Không bước nào được bỏ trống lý do.",
    bodyEn: "Solutions are written as pairs: what is claimed and why it holds. No step is allowed without its reason.",
  },
  {
    // src/research/*: 28 studies
    id: "nghien-cuu",
    oldVi: "nhận định lý có sẵn", oldEn: "given theorems",
    vi: "Tự nghiên cứu như nhà toán học", en: "Investigate like a mathematician",
    bodyVi: "28 bài nghiên cứu: nêu giả thuyết, tự đo năm dòng số liệu, xem đồ thị, viết kết luận, rồi mới đối chiếu với chứng minh.",
    bodyEn: "28 investigations: state a guess, measure five rows of data, read the graph, write a conclusion, and only then compare with the proof.",
  },
  {
    // src/content/vary/*, src/lib/prng.ts, dss/
    id: "khong-hoc-vet",
    oldVi: "đề cố định", oldEn: "fixed papers",
    vi: "Không thể học vẹt", en: "No answers to memorise",
    bodyVi: "Mỗi lần làm là một bộ số mới, đáp án đúng không nằm lại chỗ cũ, và đáp án sai là những nhầm lẫn thật. Câu Đúng / Sai / Chưa đủ rèn thói quen hỏi: điều kiện đã đủ chưa?",
    bodyEn: "Every attempt brings new numbers, the right answer moves, and the wrong choices are real mistakes. True / False / Not enough questions train the habit of asking whether a condition is enough.",
  },
  {
    // scripts/*: SymPy oracles run in CI on every change
    id: "kiem-chung",
    oldVi: "đề còn sai đáp án", oldEn: "wrong answers",
    vi: "Nội dung được máy kiểm chứng", en: "Content checked by machine",
    bodyVi: "Mọi con số trong bài được đối chiếu với SymPy và một bộ tính độc lập, hơn 1.800 phép kiểm, chạy lại trên mỗi lần sửa. Nội dung sai không lên được trang.",
    bodyEn: "Every number in a lesson is checked against SymPy and an independent calculator, over 1,800 checks, re-run on every change. Wrong content cannot reach the page.",
  },
  {
    // src/thpt/review.ts: INTERVAL_DAYS = [1, 3, 7, 14]
    id: "on-dung-luc",
    oldVi: "ôn lại cả đề", oldEn: "redoing papers",
    vi: "Sai đâu ôn đó, đúng lúc", en: "Review what you missed, when it matters",
    bodyVi: "Câu sai trong đề thi thử quay lại sau 1, 3, 7 và 14 ngày. Sai lần nữa thì bắt đầu lại từ đầu lịch.",
    bodyEn: "Questions missed in a mock exam come back after 1, 3, 7 and 14 days. Miss one again and its schedule starts over.",
  },
  {
    // server/chat/policy.ts, facts.ts, check.ts; src/parent/parentMode.ts
    id: "tro-ly",
    oldVi: "chép lời giải", oldEn: "copied solutions",
    vi: "Trợ lý gợi mở, không làm hộ", en: "A tutor that guides, not one that does it for you",
    bodyVi: "Trợ lý chỉ nói về toán và không đưa đáp số trần. Máy chủ tự tính Δ và nghiệm để AI không nhầm. Chấm bài chỉ ra bước sai đầu tiên trong lời giải của chính bạn.",
    bodyEn: "The tutor only discusses maths and never gives a bare answer. The server works out Δ and the roots so the AI does not slip. Marking points to the first wrong step in your own working.",
  },
  {
    // src/workshop/*, src/docs/*
    id: "sang-tao",
    oldVi: "chỉ giải đề có sẵn", oldEn: "set problems",
    vi: "Từ người giải đề thành người làm ra", en: "From solving to making",
    bodyVi: "Dựng hình phẳng, xoay tám loại khối, tự soạn đề và phiếu học có công thức rồi xuất ra PDF hoặc Word.",
    bodyEn: "Build plane figures, turn eight kinds of solid, write your own tests and worksheets with formulas and export them to PDF or Word.",
  },
];

const SHIFTS: [string, string, string, string][] = [
  ["Ghi nhớ công thức", "Hiểu qua hình và số", "Memorising formulas", "Understanding through figures and numbers"],
  ["Chỉ cần đáp số", "Lập luận có lý do từng bước", "Only the answer matters", "Reasoning with a reason for each step"],
  ["Đề cố định", "Biến thể mới mỗi lần làm", "Fixed papers", "A new variant every attempt"],
  ["Chờ thầy chấm", "Tự kiểm và được chấm từng bước", "Waiting for a mark", "Checking yourself, step by step"],
  ["Ôn dàn trải", "Ôn theo lịch, đúng câu đã sai", "Reviewing everything", "Spaced review of what you missed"],
  ["Tiếp nhận kiến thức", "Tự nghiên cứu và sáng tạo", "Receiving knowledge", "Investigating and creating"],
];

export function WhyDifferent() {
  const lang = useLang();
  return (
    <section id="vi-sao" className="stream why" aria-labelledby="why-title">
      <h2 id="why-title">{t(lang, "Vì sao Bàn Toán khác", "Why Bàn Toán is different")}</h2>
      <p className="lead">
        {t(
          lang,
          "Mỗi điều dưới đây thay một thói quen học toán quen thuộc bằng một việc bạn làm được ngay trên bàn này.",
          "Each point below replaces a familiar maths habit with something you can do on this desk today.",
        )}
      </p>
      <div className="why-grid">
        {REASONS.map((reason) => (
          <article key={reason.id} className="why-card" aria-labelledby={`why-${reason.id}`}>
            <p className="pillar-instead">
              <span>{t(lang, "Không", "Not")}</span> <s>{t(lang, reason.oldVi, reason.oldEn)}</s>
            </p>
            <h3 id={`why-${reason.id}`}>{t(lang, reason.vi, reason.en)}</h3>
            <p>{t(lang, reason.bodyVi, reason.bodyEn)}</p>
          </article>
        ))}
      </div>
      <div className="why-shift">
        <h3>{t(lang, "Từ cách cũ đến cách của Bàn Toán", "From the old way to Bàn Toán's way")}</h3>
        <table>
          <thead>
            <tr>
              <th scope="col">{t(lang, "Từ", "From")}</th>
              <th scope="col" aria-hidden="true"></th>
              <th scope="col">{t(lang, "Đến", "To")}</th>
            </tr>
          </thead>
          <tbody>
            {SHIFTS.map(([fromVi, toVi, fromEn, toEn]) => (
              <tr key={fromVi}>
                <td>{t(lang, fromVi, fromEn)}</td>
                <td className="why-arrow" aria-hidden="true">→</td>
                <td><b>{t(lang, toVi, toEn)}</b></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
