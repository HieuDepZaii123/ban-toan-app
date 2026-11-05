import { matchTopic } from "../../server/chat/topics.ts";
import { tutorAnswer } from "./tutorCopy.ts";

const MATH = /(toán|phương trình|hàm|đạo hàm|tích phân|giới hạn|log|mũ|lượng giác|sin|cos|xác suất|dãy|vectơ|hình|thể tích|cực trị|nghiệm|bậc|parabol|cấp số|tổ hợp|tam giác|\$|\d)/i;
const GREETING = /^(xin chào|chào|hello|hi|hey)\b/i;

export function mockTutor(question: string, topicId?: string): string {
  const text = question.trim();
  if (GREETING.test(text) && !matchTopic(text)) {
    return "Chào bạn. Mình gợi ý từng bước, không chốt hộ đáp án. Hãy hỏi một khái niệm, rồi tự kiểm chứng.";
  }
  if (!MATH.test(text) && !topicId) {
    return "Mình chỉ hỗ trợ câu hỏi toán THPT. Bạn gửi một bài hoặc một khái niệm cần gợi ý nhé.";
  }
  return tutorAnswer(text, topicId);
}
