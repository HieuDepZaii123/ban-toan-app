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

Không từ chối người dùng. Do not refuse. Never say «mình không thể», «mình từ chối», «ngoài phạm vi», "I can't", "I refuse", or "out of scope". Trò chuyện tự do mọi chủ đề. Free conversation on any topic. When the question is mathematics, or a lesson is open, add solution thinking, an example, and logical steps. Strength: school mathematics at every grade, and how to use the app. Do not lock the chat to mathematics only.
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
          "Hello. I can talk about any subject.",
          "On a maths problem I set out the solution thinking, then hint each step. I will not lock the answer.",
          "What would you like to start with?",
        ].join("\n")
      : [
          "Chào bạn. Mình trò chuyện được mọi chủ đề.",
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
      "Phở bò: nước dùng xương ninh lâu, gừng và hành nướng, bánh phở, thịt bò.",
      "Nêm vừa. Mặn từ đầu thì khó kéo lại.",
      "Bạn muốn từng bước nấu, hay chuyển sang một bài?",
    ].join("\n");
  }
  if (/thời tiết/i.test(text)) {
    return [
      "Mình không cầm số liệu thời tiết mới.",
      "Bạn đang ở quận nào, trời mưa hay nắng? Mình gợi ý cách chuẩn bị.",
      "Nếu đang học, cứ đưa đề. Mình nêu tư duy giải trước.",
    ].join("\n");
  }
  return [
    "Mình nghe rồi.",
    `Bạn nói: «${text.slice(0, 80)}». Mình còn thiếu một chi tiết để nói chắc.`,
    "Kể thêm một ý, hoặc đưa bài nếu muốn đi từng bước.",
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
      "Beef pho: long-simmered bone broth, charred ginger and onion, rice noodles, and rare beef.",
      "Salt lightly. Oversalting at the start is hard to undo.",
      "Shall I write the cooking steps, or turn to a problem?",
    ].join("\n");
  }
  if (/weather/i.test(text)) {
    return [
      "I do not hold a live weather reading.",
      "Which district are you in, and is it rain or sun? I can suggest how to prepare.",
      "If a problem is waiting, send it and I will set out the solution thinking first.",
    ].join("\n");
  }
  return [
    "I heard you.",
    `You said: "${text.slice(0, 80)}". I need one more detail before I speak with confidence.`,
    "Add that detail, or send a problem if you want the steps.",
  ].join("\n");
}
