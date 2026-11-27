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

/**
 * Lợi ích: one card per group. `aimVi` says which problem above it answers; each item is an outcome (bold)
 * and how the app delivers it today (route or file in the comment). No promised results: the app has no outcome data.
 */
type Benefit = { vi: string; en: string; howVi: string; howEn: string };
const BENEFITS: { id: string; vi: string; en: string; aimVi: string; aimEn: string; items: Benefit[] }[] = [
  {
    id: "hoc-sinh",
    vi: "Học sinh", en: "Students",
    aimVi: "Từ “học để thi rồi quên” sang hiểu, nhớ lâu và dùng được.",
    aimEn: "From “learn for the exam, then forget” to understanding, remembering and using it.",
    items: [
      // src/labs/*
      {
        vi: "Hiểu thay vì học thuộc.", en: "Understand instead of memorising.",
        howVi: "Kéo hình, đổi một con số là đồ thị đổi theo, nên em tự thấy vì sao công thức đúng.",
        howEn: "Drag the figure or change a number and the graph follows, so you see for yourself why a formula holds.",
      },
      // src/research/briefs.ts
      {
        vi: "Dùng toán cho chuyện hằng ngày.", en: "Use maths on everyday things.",
        howVi: "Bài nghiên cứu xuất phát từ chuyện thật: ly trà nguội dần, tiền gửi bao lâu thì gấp đôi, xét nghiệm dương tính thì khả năng mắc bệnh là bao nhiêu. Em tự đoán, đo số liệu rồi kết luận.",
        howEn: "Investigations start from real things: a cup of tea cooling, how long savings take to double, what a positive test really means. You guess, measure and conclude.",
      },
      // src/thpt/review.ts
      {
        vi: "Nhớ lâu sau kỳ thi.", en: "Remember after the exam.",
        howVi: "Câu làm sai tự quay lại sau 1, 3, 7 rồi 14 ngày; sai lại thì lịch bắt đầu lại từ đầu.",
        howEn: "Questions you miss come back after 1, 3, 7 and then 14 days; miss one again and its schedule restarts.",
      },
      // /cham-bai
      {
        vi: "Biết mình sai ở đâu.", en: "Know where you went wrong.",
        howVi: "Gửi bài làm, máy chấm chỉ ra bước sai đầu tiên thay vì chỉ báo đúng hay sai.",
        howEn: "Send your working and the marker points to the first wrong step, not just right or wrong.",
      },
    ],
  },
  {
    id: "giao-vien",
    vi: "Giáo viên", en: "Teachers",
    aimVi: "Dạy với công cụ hiện đại mà không mất thêm thời gian chuẩn bị.",
    aimEn: "Teach with modern tools without spending more time preparing.",
    items: [
      // src/labs/*, /xuong-hinh
      {
        vi: "Bài giảng sinh động hơn.", en: "Livelier lessons.",
        howVi: "Chiếu hình kéo được lên lớp: đổi tham số, cả lớp thấy đồ thị và hình khối thay đổi ngay.",
        howEn: "Project draggable figures in class: change a parameter and everyone sees the graph or solid change at once.",
      },
      // /soan-tai-lieu
      {
        vi: "Soạn tài liệu nhanh.", en: "Write handouts quickly.",
        howVi: "Gõ đề có công thức toán ngay trên trang, xuất ra PDF hoặc Word để in.",
        howEn: "Type problems with formulas on the page and export to PDF or Word to print.",
      },
      // src/content/vary/*, scripts/*
      {
        vi: "Đề không trùng, đáp án tin được.", en: "Fresh exercises you can trust.",
        howVi: "Mỗi lần tạo là một bộ số mới nên học sinh khó chép nhau; đáp án đã được máy kiểm lại bằng SymPy.",
        howEn: "Each attempt gets new numbers, so copying is harder; answers are machine-checked with SymPy.",
      },
    ],
  },
  {
    id: "phu-huynh",
    vi: "Phụ huynh", en: "Parents",
    aimVi: "Biết rõ tiền và thời gian của con đang đi đâu.",
    aimEn: "Know where your child's time and your money go.",
    items: [
      // /nang-cap
      {
        vi: "Tốn ít tiền.", en: "Costs little.",
        howVi: "Toàn bộ bài học và luyện tập miễn phí. Premium chỉ cần cho đề thi không giới hạn, ôn lỗi theo lịch và trợ lý sâu hơn.",
        howEn: "All lessons and practice are free. Premium is only for unlimited papers, scheduled review and a deeper tutor.",
      },
      // /phu-huynh, /bao-cao
      {
        vi: "Thấy con học thật hay không.", en: "See whether your child is really studying.",
        howVi: "Báo cáo tuần gửi qua đường link: số đề thi thử con đã làm, số bài được chấm và số lỗi con đã tự sửa.",
        howEn: "A weekly report by link: mock papers finished, problems marked and mistakes your child fixed.",
      },
      // src/parent/parentMode.ts
      {
        vi: "Con tự làm, không chép lời giải.", en: "Your child works it out, not copies it.",
        howVi: "Bật chế độ phụ huynh bằng mã PIN: trợ lý chỉ gợi ý từng bước, không đưa lời giải sẵn.",
        howEn: "Turn on parent mode with a PIN: the tutor hints step by step and never hands over the answer.",
      },
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
        <p>{t(lang, "Mỗi thẻ dưới đây trả lời một vấn đề ở trên.", "Each card below answers one of the problems above.")}</p>
        <div className="why-grid">
          {BENEFITS.map((group) => (
            <article key={group.id} className="why-card" aria-labelledby={`benefit-${group.id}`}>
              <h4 id={`benefit-${group.id}`}>{t(lang, group.vi, group.en)}</h4>
              <p className="why-aim">{t(lang, group.aimVi, group.aimEn)}</p>
              <ul>
                {group.items.map((item) => (
                  <li key={item.vi}>
                    <strong>{t(lang, item.vi, item.en)}</strong> {t(lang, item.howVi, item.howEn)}
                  </li>
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
