import type { ScienceId } from "../science/catalog.ts";
import type { CardId } from "./cards.ts";

export type LectureLevel = "basic" | "exam";

/**
 * Một ô bài giảng. `youtubeId` là id YouTube đúng 11 ký tự
 * (phần sau `youtube.com/embed/`). Để chuỗi rỗng `""` thì trang hiện «Sắp có» và không nhúng iframe.
 * `SAMPLE_YOUTUBE_ID` là video mẫu chung — thay từng dòng khi đã có bài thật.
 */
export type LectureVideo = {
  slot: string;
  youtubeId: string;
  title: string;
  level: LectureLevel;
};

/** Video mẫu của YouTube (iframe API). Đổi id này không đổi các dòng đã gắn id riêng. */
export const SAMPLE_YOUTUBE_ID = "M7lc1UVf-VE";

export const lectures: Record<CardId, [LectureVideo, LectureVideo]> = {
  quadratic: [
    { slot: "quadratic-basic", youtubeId: SAMPLE_YOUTUBE_ID, title: "Parabol là gì: miệng lên và miệng xuống", level: "basic" },
    { slot: "quadratic-exam", youtubeId: "", title: "Đỉnh và delta của hàm bậc hai", level: "exam" },
  ],
  ineq: [
    { slot: "ineq-basic", youtubeId: "", title: "Bất đẳng thức và việc đảo dấu", level: "basic" },
    { slot: "ineq-exam", youtubeId: "", title: "AM–GM và cực trị trên miền đa giác", level: "exam" },
  ],
  exp: [
    { slot: "exp-basic", youtubeId: "", title: "Mũ là nhân lặp, log hỏi số lần", level: "basic" },
    { slot: "exp-exam", youtubeId: "", title: "Đối xứng mũ–log và lãi kép", level: "exam" },
  ],
  sequence: [
    { slot: "sequence-basic", youtubeId: "", title: "Cấp số cộng và cấp số nhân", level: "basic" },
    { slot: "sequence-exam", youtubeId: "", title: "Số hạng thứ n và tổng cấp số", level: "exam" },
  ],
  trig: [
    { slot: "trig-basic", youtubeId: "", title: "Sin và cos trên đường tròn đơn vị", level: "basic" },
    { slot: "trig-exam", youtubeId: "", title: "Góc bù và bài toán đo cao", level: "exam" },
  ],
  limit: [
    { slot: "limit-basic", youtubeId: "", title: "Giới hạn là số hàm tiến tới", level: "basic" },
    { slot: "limit-exam", youtubeId: "", title: "Hai phía, liên tục và bước nhảy", level: "exam" },
  ],
  derivative: [
    { slot: "derivative-basic", youtubeId: "", title: "Độ dốc: từ cát tuyến tới tiếp tuyến", level: "basic" },
    { slot: "derivative-exam", youtubeId: "", title: "Đạo hàm, vận tốc và cực trị", level: "exam" },
  ],
  survey: [
    { slot: "survey-basic", youtubeId: "", title: "Đọc hàm đi lên hay đi xuống", level: "basic" },
    { slot: "survey-exam", youtubeId: "", title: "Cực trị, điểm uốn và tiệm cận", level: "exam" },
  ],
  integral: [
    { slot: "integral-basic", youtubeId: "", title: "Diện tích có dấu dưới đồ thị", level: "basic" },
    { slot: "integral-exam", youtubeId: "", title: "Nguyên hàm và diện tích giữa hai đường", level: "exam" },
  ],
  vector: [
    { slot: "vector-basic", youtubeId: "", title: "Vectơ là mũi tên có hướng", level: "basic" },
    { slot: "vector-exam", youtubeId: "", title: "Độ dài, tích vô hướng và hệ hai ẩn", level: "exam" },
  ],
  analytic: [
    { slot: "analytic-basic", youtubeId: "", title: "Đường thẳng và pháp tuyến", level: "basic" },
    { slot: "analytic-exam", youtubeId: "", title: "Khoảng cách tới đường và đường tròn", level: "exam" },
  ],
  triangle: [
    { slot: "triangle-basic", youtubeId: "", title: "Diện tích tam giác và thể tích hộp", level: "basic" },
    { slot: "triangle-exam", youtubeId: "", title: "Chóp, tứ diện đều và đồng dạng", level: "exam" },
  ],
  combo: [
    { slot: "combo-basic", youtubeId: "", title: "Có kể thứ tự hay không", level: "basic" },
    { slot: "combo-exam", youtubeId: "", title: "Chỉnh hợp, tổ hợp, trung bình và trung vị", level: "exam" },
  ],
  probability: [
    { slot: "probability-basic", youtubeId: "", title: "Xác suất là số ca thuận trên số ca còn", level: "basic" },
    { slot: "probability-exam", youtubeId: "", title: "Xác suất có điều kiện và Bayes", level: "exam" },
  ],
};

/** Bài giảng các mảng Khoa học — cùng kiểu id với Toán. */
export const scienceLectures: Record<ScienceId, [LectureVideo, LectureVideo]> = {
  python: [
    { slot: "python-basic", youtubeId: SAMPLE_YOUTUBE_ID, title: "Biến, vòng lặp và một hàm tính toán", level: "basic" },
    { slot: "python-exam", youtubeId: "", title: "Vẽ đồ thị từ dãy số tính được", level: "exam" },
  ],
  "du-lieu": [
    { slot: "du-lieu-basic", youtubeId: "", title: "Trung bình và trung vị trên một dãy điểm", level: "basic" },
    { slot: "du-lieu-exam", youtubeId: "", title: "Đọc biểu đồ cột và độ lệch", level: "exam" },
  ],
  chuyen: [
    { slot: "chuyen-basic", youtubeId: "", title: "Cách đọc một đề trường chuyên", level: "basic" },
    { slot: "chuyen-exam", youtubeId: "", title: "Một bài số học và một bài hình", level: "exam" },
  ],
  "vat-ly": [
    { slot: "vat-ly-basic", youtubeId: "", title: "Rơi tự do và vận tốc theo thời gian", level: "basic" },
    { slot: "vat-ly-exam", youtubeId: "", title: "Định luật Ohm và công suất", level: "exam" },
  ],
  hoa: [
    { slot: "hoa-basic", youtubeId: "", title: "Lượng chất n = m/M", level: "basic" },
    { slot: "hoa-exam", youtubeId: "", title: "Nồng độ mol và pH", level: "exam" },
  ],
};

export function isYoutubeId(value: string): boolean {
  return /^[A-Za-z0-9_-]{11}$/.test(value);
}

export function embedUrl(youtubeId: string): string | null {
  if (!isYoutubeId(youtubeId)) return null;
  return `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`;
}

export function lecturesFor(topicId: string): LectureVideo[] {
  if (Object.prototype.hasOwnProperty.call(lectures, topicId)) return lectures[topicId as CardId];
  if (Object.prototype.hasOwnProperty.call(scienceLectures, topicId)) return scienceLectures[topicId as ScienceId];
  return [];
}
