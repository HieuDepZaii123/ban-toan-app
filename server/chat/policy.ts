import { matchTopic, topicMenu } from "./topics.ts";

const OFF_TOPIC = /thời tiết|nấu ăn|nấu phở|công thức nấu|bóng đá|chính trị|bầu cử|viết văn|làm thơ|mật khẩu|hack |bitcoin|chứng khoán|ngoại ngữ|dịch giúp/i;
const ON_TOPIC = /toán|phương trình|bài học|bàn toán|premium|hàm|đạo hàm|tích phân|giới hạn|logarit|lượng giác|sin|cos|tan|vectơ|xác suất|tổ hợp|cấp số|parabol|bất đẳng|tam giác|đỉnh|nghiệm|ma trận|khảo sát|diện tích|thể tích|mũ\b|delta|định thức/i;
const GREETING = /^(xin chào|chào|hello|hi|hey)\b/i;

export const TUTOR_INSTRUCTIONS = `Bạn là trợ lý Toán của app Bàn Toán, nói tiếng Việt, cho học sinh THPT.
Chỉ trả lời Toán THPT và cách dùng app (bài học, luyện, sổ, premium).
Từ chối ngắn gọn mọi chủ đề khác. Không viết văn, không tư vấn đời sống, không lập trình.
Không chốt mỗi đáp án. Gợi ý từng bước, để học sinh tính nốt một bước.
Công thức viết trong cặp dấu $. Nhắc học sinh tự kiểm chứng công thức trước khi chốt.
Khi hợp chủ đề, thêm một liên kết markdown tới bài trong app, đúng đường dẫn dưới đây:
${topicMenu()}`;

export function isOffTopic(text: string): boolean {
  const value = text.trim();
  if (!value) return true;
  if (GREETING.test(value)) return false;
  if (OFF_TOPIC.test(value) && !ON_TOPIC.test(value)) return true;
  if (!ON_TOPIC.test(value) && !matchTopic(value)) return true;
  return false;
}

export const REFUSAL = "Mình chỉ hỗ trợ Toán THPT và cách học trên Bàn Toán. Hãy hỏi một khái niệm hoặc một bài trong chương trình.";

export function demoReply(text: string): string {
  if (GREETING.test(text.trim()) && !matchTopic(text)) {
    return [
      "Chào bạn. Mình gợi ý từng bước, không chốt hộ đáp án.",
      "Hãy hỏi một khái niệm, ví dụ đỉnh của parabol hoặc đạo hàm tại một điểm.",
      "Hãy tự kiểm chứng công thức trước khi chốt.",
    ].join("\n");
  }
  const topic = matchTopic(text);
  const link = topic ? `[${topic.title}](/t/${topic.id})` : "các tờ trên bàn học";
  const steps = topic
    ? [
        `Đọc đề và gọi tên dạng bài trong ${topic.title}.`,
        "Viết dữ kiện đã cho và công thức đúng dạng đó, trong dấu $.",
        "Tính một bước, rồi thế lại để kiểm.",
      ]
    : [
        "Gọi tên dạng bài: hàm, phương trình, hình, hay xác suất.",
        "Viết dữ kiện và một công thức, trong dấu $.",
        "Tính một bước rồi kiểm chiều và đơn vị.",
      ];
  return [
    "Mình không chốt đáp án hộ. Làm lần lượt:",
    `1. ${steps[0]}`,
    `2. ${steps[1]}`,
    `3. ${steps[2]}`,
    `Xem bài trong app: ${link}.`,
    "Hãy tự kiểm chứng công thức trước khi chốt.",
  ].join("\n");
}
