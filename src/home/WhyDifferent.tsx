import { t } from "../lib/text.ts";
import { useLang } from "../ui/useLang.ts";

/**
 * "Vì sao Bàn Toán khác": each reason reads "Không …, hãy …": the habit to drop, then what to do and the feature that replaces it.
 * Every claim is something the app does today (see the file named in each comment). No promised results:
 * the app has no outcome data yet, so the copy describes the method, not test scores.
 */
const REASONS: { id: string; noVi: string; noEn: string; yesVi: string; yesEn: string; bodyVi: string; bodyEn: string }[] = [
  {
    // src/labs/*, src/lib/math.ts
    id: "thay-truoc",
    noVi: "Không học thuộc công thức,", noEn: "Don't memorise the formula.",
    yesVi: "hãy nhìn nó thay đổi.", yesEn: "Watch it change.",
    bodyVi: "Mỗi chuyên đề có một hình kéo được. Đổi tham số là đồ thị và con số đổi theo ngay, và hình với lời giải tính từ cùng một nguồn nên không bao giờ lệch nhau.",
    bodyEn: "Every topic has a figure you can drag. Change a parameter and the graph and the numbers follow at once, and the figure and the solution are computed from one source, so they never disagree.",
  },
  {
    // src/content/dang/types.ts: a step is a claim and its reason
    id: "ly-do",
    noVi: "Không chỉ ghi phép biến đổi,", noEn: "Don't just write the algebra.",
    yesVi: "hãy hiểu lý do từng bước.", yesEn: "Know the reason for each step.",
    bodyVi: "Lời giải được viết thành từng cặp: điều khẳng định và vì sao nó đúng. Không bước nào được bỏ trống lý do.",
    bodyEn: "Solutions are written as pairs: what is claimed and why it holds. No step is allowed without its reason.",
  },
  {
    // src/research/*: 28 studies
    id: "nghien-cuu",
    noVi: "Không nhận định lý có sẵn,", noEn: "Don't take the theorem as given.",
    yesVi: "hãy tự tìm ra nó.", yesEn: "Find it yourself.",
    bodyVi: "28 bài nghiên cứu: nêu giả thuyết, tự đo năm dòng số liệu, xem đồ thị, viết kết luận, rồi mới đối chiếu với chứng minh.",
    bodyEn: "28 investigations: state a guess, measure five rows of data, read the graph, write a conclusion, and only then compare with the proof.",
  },
  {
    // src/content/vary/*, src/lib/prng.ts, dss/
    id: "khong-hoc-vet",
    noVi: "Không học vẹt đáp án,", noEn: "Don't memorise answers.",
    yesVi: "hãy hiểu vì sao nó đúng.", yesEn: "Know why they are right.",
    bodyVi: "Mỗi lần làm là một bộ số mới, đáp án đúng không nằm lại chỗ cũ, và đáp án sai là những nhầm lẫn thật. Câu Đúng / Sai / Chưa đủ rèn thói quen hỏi: điều kiện đã đủ chưa?",
    bodyEn: "Every attempt brings new numbers, the right answer moves, and the wrong choices are real mistakes. True / False / Not enough questions train the habit of asking whether a condition is enough.",
  },
  {
    // scripts/*: SymPy oracles run in CI on every change
    id: "kiem-chung",
    noVi: "Không lo đề sai đáp án,", noEn: "Don't worry about wrong keys.",
    yesVi: "hãy học trên số đã kiểm chứng.", yesEn: "Learn from checked numbers.",
    bodyVi: "Mọi con số trong bài được đối chiếu với SymPy và một bộ tính độc lập, hơn 1.800 phép kiểm, chạy lại trên mỗi lần sửa. Nội dung sai không lên được trang.",
    bodyEn: "Every number in a lesson is checked against SymPy and an independent calculator, over 1,800 checks, re-run on every change. Wrong content cannot reach the page.",
  },
  {
    // src/thpt/review.ts: INTERVAL_DAYS = [1, 3, 7, 14]
    id: "on-dung-luc",
    noVi: "Không ôn lại cả đề,", noEn: "Don't redo whole papers.",
    yesVi: "hãy ôn đúng câu đã sai.", yesEn: "Review exactly what you missed.",
    bodyVi: "Câu sai trong đề thi thử quay lại sau 1, 3, 7 và 14 ngày. Sai lần nữa thì bắt đầu lại từ đầu lịch.",
    bodyEn: "Questions missed in a mock exam come back after 1, 3, 7 and 14 days. Miss one again and its schedule starts over.",
  },
  {
    // server/chat/policy.ts, facts.ts, check.ts; src/parent/parentMode.ts
    id: "tro-ly",
    noVi: "Không chép lời giải,", noEn: "Don't copy a solution.",
    yesVi: "hãy tìm bước sai của chính mình.", yesEn: "Find your own wrong step.",
    bodyVi: "Trợ lý chỉ nói về toán và không đưa đáp số trần. Máy chủ tự tính Δ và nghiệm để AI không nhầm. Chấm bài chỉ ra bước sai đầu tiên trong lời giải của chính bạn.",
    bodyEn: "The tutor only discusses maths and never gives a bare answer. The server works out Δ and the roots so the AI does not slip. Marking points to the first wrong step in your own working.",
  },
  {
    // src/workshop/*, src/docs/*
    id: "sang-tao",
    noVi: "Không chỉ giải đề người khác ra,", noEn: "Don't only solve others' problems.",
    yesVi: "hãy dựng hình và soạn đề của mình.", yesEn: "Build and write your own.",
    bodyVi: "Dựng hình phẳng, xoay tám loại khối, tự soạn đề và phiếu học có công thức rồi xuất ra PDF hoặc Word.",
    bodyEn: "Build plane figures, turn eight kinds of solid, write your own tests and worksheets with formulas and export them to PDF or Word.",
  },
];

const SHIFTS: [string, string, string, string][] = [
  ["ghi nhớ công thức", "hiểu qua hình và số", "memorise formulas", "understand through figures and numbers"],
  ["chỉ cần đáp số", "lập luận có lý do từng bước", "settle for the answer", "reason with a why for each step"],
  ["làm mãi một đề", "làm biến thể mới mỗi lần", "redo the same paper", "take a new variant every time"],
  ["chờ thầy chấm", "tự kiểm và xem bước sai", "wait for a mark", "check yourself and find the wrong step"],
  ["ôn dàn trải", "ôn theo lịch, đúng câu đã sai", "review everything", "review on a schedule, only what you missed"],
  ["chỉ tiếp nhận kiến thức", "tự nghiên cứu và sáng tạo", "just take in knowledge", "investigate and create"],
];

export function WhyDifferent() {
  const lang = useLang();
  return (
    <section id="vi-sao" className="stream why" aria-labelledby="why-title">
      <h2 id="why-title">{t(lang, "Vì sao Bàn Toán khác", "Why Bàn Toán is different")}</h2>
      <p className="lead">
        {t(
          lang,
          "Mỗi điều dưới đây là một thói quen nên bỏ, và việc bạn làm được ngay trên bàn này thay cho nó.",
          "Each point below is a habit to drop, and what you can do on this desk instead.",
        )}
      </p>
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
      <div className="why-shift">
        <h3>{t(lang, "Tóm lại", "In short")}</h3>
        <table>
          <thead>
            <tr>
              <th scope="col">{t(lang, "Không", "Don't")}</th>
              <th scope="col" aria-hidden="true"></th>
              <th scope="col">{t(lang, "Hãy", "Do")}</th>
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
