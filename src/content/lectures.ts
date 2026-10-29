import type { CardId } from "./cards.ts";

export type LectureLevel = "basic" | "exam";

/**
 * One lecture slot. Replace `youtubeId` with an 11-character YouTube id.
 * Placeholders are longer than 11 characters on purpose, so the page does not embed them.
 */
export type LectureVideo = {
  slot: string;
  youtubeId: string;
  title: string;
  level: LectureLevel;
};

export const lectures: Record<CardId, [LectureVideo, LectureVideo]> = {
  quadratic: [
    { slot: "quadratic-basic", youtubeId: "THAY_ID_QUADRATIC_BASIC", title: "Parabol là gì: miệng lên và miệng xuống", level: "basic" },
    { slot: "quadratic-exam", youtubeId: "THAY_ID_QUADRATIC_EXAM", title: "Đỉnh và delta của hàm bậc hai", level: "exam" },
  ],
  ineq: [
    { slot: "ineq-basic", youtubeId: "THAY_ID_INEQ_BASIC", title: "Bất đẳng thức và việc đảo dấu", level: "basic" },
    { slot: "ineq-exam", youtubeId: "THAY_ID_INEQ_EXAM", title: "AM–GM và cực trị trên miền đa giác", level: "exam" },
  ],
  exp: [
    { slot: "exp-basic", youtubeId: "THAY_ID_EXP_BASIC", title: "Mũ là nhân lặp, log hỏi số lần", level: "basic" },
    { slot: "exp-exam", youtubeId: "THAY_ID_EXP_EXAM", title: "Đối xứng mũ–log và lãi kép", level: "exam" },
  ],
  sequence: [
    { slot: "sequence-basic", youtubeId: "THAY_ID_SEQUENCE_BASIC", title: "Cấp số cộng và cấp số nhân", level: "basic" },
    { slot: "sequence-exam", youtubeId: "THAY_ID_SEQUENCE_EXAM", title: "Số hạng thứ n và tổng cấp số", level: "exam" },
  ],
  trig: [
    { slot: "trig-basic", youtubeId: "THAY_ID_TRIG_BASIC", title: "Sin và cos trên đường tròn đơn vị", level: "basic" },
    { slot: "trig-exam", youtubeId: "THAY_ID_TRIG_EXAM", title: "Góc bù và bài toán đo cao", level: "exam" },
  ],
  limit: [
    { slot: "limit-basic", youtubeId: "THAY_ID_LIMIT_BASIC", title: "Giới hạn là số hàm tiến tới", level: "basic" },
    { slot: "limit-exam", youtubeId: "THAY_ID_LIMIT_EXAM", title: "Hai phía, liên tục và bước nhảy", level: "exam" },
  ],
  derivative: [
    { slot: "derivative-basic", youtubeId: "THAY_ID_DERIVATIVE_BASIC", title: "Độ dốc: từ cát tuyến tới tiếp tuyến", level: "basic" },
    { slot: "derivative-exam", youtubeId: "THAY_ID_DERIVATIVE_EXAM", title: "Đạo hàm, vận tốc và cực trị", level: "exam" },
  ],
  survey: [
    { slot: "survey-basic", youtubeId: "THAY_ID_SURVEY_BASIC", title: "Đọc hàm đi lên hay đi xuống", level: "basic" },
    { slot: "survey-exam", youtubeId: "THAY_ID_SURVEY_EXAM", title: "Cực trị, điểm uốn và tiệm cận", level: "exam" },
  ],
  integral: [
    { slot: "integral-basic", youtubeId: "THAY_ID_INTEGRAL_BASIC", title: "Diện tích có dấu dưới đồ thị", level: "basic" },
    { slot: "integral-exam", youtubeId: "THAY_ID_INTEGRAL_EXAM", title: "Nguyên hàm và diện tích giữa hai đường", level: "exam" },
  ],
  vector: [
    { slot: "vector-basic", youtubeId: "THAY_ID_VECTOR_BASIC", title: "Vectơ là mũi tên có hướng", level: "basic" },
    { slot: "vector-exam", youtubeId: "THAY_ID_VECTOR_EXAM", title: "Độ dài, tích vô hướng và hệ hai ẩn", level: "exam" },
  ],
  analytic: [
    { slot: "analytic-basic", youtubeId: "THAY_ID_ANALYTIC_BASIC", title: "Đường thẳng và pháp tuyến", level: "basic" },
    { slot: "analytic-exam", youtubeId: "THAY_ID_ANALYTIC_EXAM", title: "Khoảng cách tới đường và đường tròn", level: "exam" },
  ],
  triangle: [
    { slot: "triangle-basic", youtubeId: "THAY_ID_TRIANGLE_BASIC", title: "Diện tích tam giác và thể tích hộp", level: "basic" },
    { slot: "triangle-exam", youtubeId: "THAY_ID_TRIANGLE_EXAM", title: "Chóp, tứ diện đều và đồng dạng", level: "exam" },
  ],
  combo: [
    { slot: "combo-basic", youtubeId: "THAY_ID_COMBO_BASIC", title: "Có kể thứ tự hay không", level: "basic" },
    { slot: "combo-exam", youtubeId: "THAY_ID_COMBO_EXAM", title: "Chỉnh hợp, tổ hợp, trung bình và trung vị", level: "exam" },
  ],
  probability: [
    { slot: "probability-basic", youtubeId: "THAY_ID_PROBABILITY_BASIC", title: "Xác suất là số ca thuận trên số ca còn", level: "basic" },
    { slot: "probability-exam", youtubeId: "THAY_ID_PROBABILITY_EXAM", title: "Xác suất có điều kiện và Bayes", level: "exam" },
  ],
};

export function isYoutubeId(value: string): boolean {
  return /^[A-Za-z0-9_-]{11}$/.test(value);
}

export function lecturesFor(topicId: string): LectureVideo[] {
  if (!Object.prototype.hasOwnProperty.call(lectures, topicId)) return [];
  return lectures[topicId as CardId];
}
