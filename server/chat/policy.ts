import { tutorAnswer } from "../../src/chat/tutorCopy.ts";
import { matchTopic, topicMenu } from "./topics.ts";

const ON_TOPIC = /toán|phương trình|bài học|bàn toán|premium|hàm|đạo hàm|tích phân|giới hạn|logarit|lượng giác|\\bsin\\b|\\bcos\\b|\\btan\\b|vectơ|xác suất|tổ hợp|cấp số|parabol|bất đẳng|tam giác|đỉnh|nghiệm|ma trận|khảo sát|diện tích|thể tích|mũ\b|delta|định thức|derivative|integral|probability|vertex|equation/i;
const GREETING = /^(xin chào|chào|hello|hi|hey)\b/i;
const VI_MARK = /[ăâêôơưđáàảãạấầẩẫậắằẳẵặéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]/i;

export function replyLanguage(text: string): "vi" | "en" {
  if (VI_MARK.test(text)) return "vi";
  if (/[A-Za-z]/.test(text)) return "en";
  return "vi";
}

export const TUTOR_INSTRUCTIONS = `Bạn là trợ lý của app Bàn Toán. You are the tutor of the Bàn Toán app.
Detect the language of the latest user message and reply in that language. Vietnamese in, Vietnamese out. English in, English out. If the message mixes both, follow the language of the question itself.
Giọng chuyên nghiệp, trang trọng, đáng tin cậy, ấm và kiên nhẫn. Professional, dignified, trustworthy. Hài hước tinh tế, khôn ngoan, không trêu thô. Subtle wise humor only, for example «Phép chia này đang đùa anh đấy» or "This division is teasing you." Những câu đó chỉ là ví dụ, đừng chép lại; tự nghĩ câu hợp ngữ cảnh, hoặc bỏ qua. These are examples only: never repeat them word for word. Be serious when the student is stuck, upset, or the argument must be tight.

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

Trình bày / Format: khung chat chỉ hiện dòng chữ thường. The chat shows plain lines only.
- Ngắn gọn: tối đa khoảng 200 từ, mỗi lượt một vài bước. Keep it short: about 200 words at most, a few steps per turn.
- Không dùng tiêu đề #, bảng, chữ đậm **, đường kẻ ---. No markdown headings, tables, bold or horizontal rules.
- Mọi công thức viết $...$ trên một dòng, không dùng \\( \\), \\[ \\] hay $$. Every formula as $...$ on one line, never \\( \\), \\[ \\] or $$.

Khi một sơ đồ giúp ích, nhúng đúng một fence cho một ý. When a diagram helps, embed one markdown fence per idea, language mermaid, svg, or text (ASCII). Không trộn ba kiểu cho cùng một ý. Do not mix three kinds for one idea.

Xưng mình/bạn khi nói tiếng Việt, I/you khi nói tiếng Anh. Khích lệ. Khi nhắc một tờ trong app, dùng đúng đường dẫn:
${topicMenu()}`;

const DISTRESS = /tự tử|tự sát|tự vẫn|muốn chết|chết cho xong|chết đi cho|không muốn sống|chẳng muốn sống|kết liễu|tự hại|tự làm đau|rạch tay|cắt tay|bị xâm hại|bị lạm dụng|bị quấy rối|bị bạo hành|bị đánh đập|bị bắt nạt|suicid|kill myself|want to die|end my life|self[- ]?harm|hurt myself|cut myself|abus(e|ed|ing) me|molest|bullied/i;

/**
 * Lưới an toàn chạy trước cả mô hình lẫn câu mẫu: tin nhắn có dấu hiệu tự hại, bị xâm hại hay bị bắt nạt
 * luôn nhận một câu trả lời cố định, có người lớn tin cậy và Tổng đài 111. Không gửi tin này cho bên ngoài.
 */
export function safetyReply(text: string): string | null {
  if (!DISTRESS.test(text)) return null;
  if (replyLanguage(text) === "en") {
    return [
      "I am really sorry you are going through this, and thank you for telling me. You do not have to carry it alone.",
      "Please talk to an adult you trust right now: a parent, a teacher or a relative.",
      "In Vietnam you can call 111, the National Child Protection Hotline. It is free and open day and night. If you are in danger right now, call 113 or 115.",
      "I am only a maths tutor and cannot replace a real person, but I will be here to study with you whenever you are ready.",
    ].join("\n");
  }
  return [
    "Mình rất tiếc vì bạn đang phải chịu điều này, và cảm ơn bạn đã nói ra. Bạn không phải chịu một mình.",
    "Hãy nói ngay với một người lớn bạn tin: cha mẹ, thầy cô hoặc người thân.",
    "Bạn có thể gọi 111, Tổng đài Quốc gia Bảo vệ Trẻ em. Cuộc gọi miễn phí và có người trực suốt ngày đêm. Nếu đang gặp nguy hiểm ngay lúc này, hãy gọi 113 hoặc 115.",
    "Mình chỉ là trợ lý học toán nên không thay được người thật, nhưng khi nào bạn sẵn sàng, mình vẫn ở đây học cùng bạn.",
  ].join("\n");
}

/** Premium tutor modes, appended to TUTOR_INSTRUCTIONS. "hint" (the default) adds nothing. */
export type TutorMode = "hint" | "solve" | "check";

export const MODE_INSTRUCTIONS: Record<TutorMode, string> = {
  hint: "",
  solve: `

Chế độ LỜI GIẢI ĐẦY ĐỦ (Premium). Mode: FULL WORKED SOLUTION.
Học sinh đã thử và xin lời giải trọn vẹn. Lần này được chốt đáp án: viết đủ mọi bước, mỗi bước một dòng, có lý do, kết thúc bằng một dòng «Đáp số: …» (tiếng Anh: "Answer: …"). Sau đó thêm một dòng «Kiểm tra lại: …» thay đáp số vào đề. Giới hạn 200 từ được nới thành khoảng 350 từ.
The student asked for the complete solution: give every step with its reason, end with the final answer line, then one line checking it against the problem. About 350 words at most.`,
  check: `

Chế độ KIỂM TRA BÀI LÀM (Premium). Mode: CHECK MY WORK.
Tin nhắn chứa bài làm của học sinh. Đọc từng bước theo thứ tự.
- Nếu có bước sai: trích đúng bước sai đầu tiên, nói sai ở đâu và vì sao (quy tắc nào, số nào), viết lại bước đó cho đúng, rồi để học sinh tự làm tiếp từ đó. Không sửa hộ các bước sau.
- Nếu mọi bước đều đúng: xác nhận ngắn gọn, khen một điểm cụ thể, và gợi ý một cách kiểm tra hoặc trình bày gọn hơn.
- Nếu thiếu đề bài hay bài làm: hỏi lại một câu.
The message holds the student's own working. Find the FIRST wrong step, quote it, explain exactly why it is wrong, show the corrected step, and let the student continue. If every step is right, confirm it and name one specific strength.`,
};

export function demoReply(text: string, topicId?: string): string {
  const lang = replyLanguage(text);
  const trimmed = text.trim();
  if (GREETING.test(trimmed) && !matchTopic(trimmed) && !topicId) {
    return lang === "en"
      ? [
          "Hello. I help with school maths, step by step.",
          "On a maths problem I set out the solution thinking, then hint each step. I will not do the problem for you.",
          "What would you like to start with?",
        ].join("\n")
      : [
          "Chào bạn. Mình giúp bạn học toán, đi từng bước.",
          "Gặp bài thì mình nêu tư duy giải rồi gợi ý từng bước, không làm hộ bài.",
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
