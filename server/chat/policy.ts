import { tutorAnswer } from "../../src/chat/tutorCopy.ts";
import { matchTopic, topicMenu } from "./topics.ts";

const ON_TOPIC = /toán|phương trình|bài học|bàn toán|premium|hàm|đạo hàm|tích phân|giới hạn|logarit|lượng giác|sin|cos|tan|vectơ|xác suất|tổ hợp|cấp số|parabol|bất đẳng|tam giác|đỉnh|nghiệm|ma trận|khảo sát|diện tích|thể tích|mũ\b|delta|định thức|derivative|integral|probability|vertex|equation/i;
const GREETING = /^(xin chào|chào|hello|hi|hey)\b/i;
const VI_MARK = /[ăâêôơưđáàảãạấầẩẫậắằẳẵặéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]/i;

export function replyLanguage(text: string): "vi" | "en" {
  if (VI_MARK.test(text)) return "vi";
  if (/[A-Za-z]/.test(text)) return "en";
  return "vi";
}

export const TUTOR_INSTRUCTIONS = `Bạn là trợ lý của app Bàn Toán. You are the tutor of the Bàn Toán app.
Detect the language of the latest user message and reply in that language. Vietnamese in, Vietnamese out. English in, English out. If the message mixes both, follow the language of the question itself.
Giọng chuyên nghiệp, trang trọng, đáng tin cậy, ấm và kiên nhẫn. Professional, dignified, trustworthy. Hài hước tinh tế, khôn ngoan, không trêu thô. Subtle wise humor only, for example «Phép chia này đang đùa anh đấy» or "This division is teasing you." Be serious when the student is stuck, upset, or the argument must be tight.

Người dùng phần lớn là học sinh lớp 1–12. Most users are school children aged 6–18.
Phạm vi: toán phổ thông, cách học, và cách dùng app. Scope: school mathematics, study habits, and how to use the app. Câu hỏi ngoài phạm vi thì đáp một câu thân thiện rồi kéo về việc học, không giảng giải dài. For an off-topic message, reply warmly in one line and steer back to studying; do not lecture and do not answer at length. Không dùng chữ «từ chối» hay "out of scope"; cứ nhẹ nhàng dẫn về bài. Never produce content unsuitable for children (violence, sexual content, self-harm instructions, hate, dangerous activities); if a child seems unsafe or upset, respond kindly and suggest talking to a trusted adult.
Không hỏi và không lưu thông tin cá nhân (họ tên đầy đủ, địa chỉ, số điện thoại, trường). Do not ask for personal details; if the student shares them, do not repeat them.
Nếu học sinh xin «chỉ cần đáp số» hay dán cả đề bài tập về nhà, không đưa đáp số cuối. If asked for "just the answer" or given a pasted homework set, do not give final answers: give the first hint, ask for the student's attempt, then continue from their work.
Thiếu thông tin thì hỏi một câu ấm. If information is missing, ask one calm question.

Tư duy giải / Solution thinking, trước hoặc xen với lời giải / before or interleaved with the worked lines:
- đọc đề / read the problem
- hướng tiếp cận / the approach
- vì sao chọn cách này chứ không phải cách khác / why this way rather than another
- lộ trình / the route
Mỗi kết luận toán cần chứng minh hoặc dẫn chứng. Every mathematical claim needs a proof or a cited reason. Không đổ đáp án ngay. Do not dump the final answer.
Sau đó gợi ý từng bước (1) (2) (3). Then hint the steps. Công thức trong $...$. Formulas inside dollar signs. Để người học tự kiểm bước cuối.

Khi một sơ đồ giúp ích, nhúng đúng một fence cho một ý. When a diagram helps, embed one markdown fence per idea, language mermaid, svg, or text (ASCII). Không trộn ba kiểu cho cùng một ý. Do not mix three kinds for one idea.

Xưng mình/bạn khi nói tiếng Việt, I/you khi nói tiếng Anh. Khích lệ. Khi nhắc một tờ trong app, dùng đúng đường dẫn:
${topicMenu()}`;

export function demoReply(text: string, topicId?: string): string {
  const lang = replyLanguage(text);
  const trimmed = text.trim();
  if (GREETING.test(trimmed) && !matchTopic(trimmed) && !topicId) {
    return lang === "en"
      ? [
          "Hello. I help with school maths, step by step.",
          "On a maths problem I set out the solution thinking, then hint each step. I will not lock the answer.",
          "What would you like to start with?",
        ].join("\n")
      : [
          "Chào bạn. Mình giúp bạn học toán, đi từng bước.",
          "Gặp bài thì mình nêu tư duy giải rồi đi từng bước, không chốt hộ đáp án.",
          "Bạn muốn bắt đầu từ đâu?",
        ].join("\n");
  }
  if (matchTopic(trimmed) || topicId || ON_TOPIC.test(trimmed)) return tutorAnswer(trimmed, topicId, lang);
  return lang === "en" ? openEn(trimmed) : openVi(trimmed);
}

function openVi(text: string): string {
  if (/sơ đồ|mermaid|ascii/i.test(text)) {
    return [
      "Mình vẽ một ý.",
      "```mermaid",
      "flowchart LR",
      "  De[Đề] --> Huong[Hướng]",
      "  Huong --> Buoc[Bước]",
      "```",
      "Muốn kiểu SVG hay ASCII thì nói mình.",
    ].join("\n");
  }
  if (/phở|nấu/i.test(text)) {
    return [
      "Phở để dành cho bữa tối nhé, ở đây mình lo phần toán.",
      "Nếu muốn, mình đố một bài đong đo: nồi 3 lít nước, mỗi bát cần 0,4 lít, múc được mấy bát?",
      "Hoặc đưa bài bạn đang làm, mình nêu tư duy giải trước.",
    ].join("\n");
  }
  if (/thời tiết/i.test(text)) {
    return [
      "Mình không xem được thời tiết, nhưng mưa thì hợp để ngồi học.",
      "Bạn đang học bài nào? Đưa đề, mình nêu tư duy giải trước.",
    ].join("\n");
  }
  return [
    "Mình nghe rồi. Ở đây mình giúp bạn học toán.",
    "Đưa một bài hoặc kể bạn đang vướng chỗ nào, mình đi từng bước cùng bạn.",
  ].join("\n");
}

function openEn(text: string): string {
  if (/diagram|mermaid|ascii|sketch/i.test(text)) {
    return [
      "One picture for one idea.",
      "```mermaid",
      "flowchart LR",
      "  Q[Question] --> A[Approach]",
      "  A --> S[Steps]",
      "```",
      "Ask if you would rather have SVG or ASCII.",
    ].join("\n");
  }
  if (/pho|cook|recipe/i.test(text)) {
    return [
      "Pho is best left for dinner; here I take care of the maths.",
      "Want a kitchen puzzle instead? A pot holds 3 litres and each bowl takes 0.4 litres. How many bowls?",
      "Or send the problem you are working on and I will set out the solution thinking first.",
    ].join("\n");
  }
  if (/weather/i.test(text)) {
    return [
      "I cannot read the weather, but rainy days are good for studying.",
      "Which lesson are you on? Send the problem and I will set out the solution thinking first.",
    ].join("\n");
  }
  return [
    "I heard you. Here I help with maths.",
    "Send a problem or tell me where you are stuck, and we will go step by step.",
  ].join("\n");
}
