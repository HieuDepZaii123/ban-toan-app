import type { StreamId } from "./types.ts";

export const streams: { id: StreamId; vi: string; en: string }[] = [
  {
    "id": "algebra",
    "vi": "Đại số",
    "en": "Algebra"
  },
  {
    "id": "analysis",
    "vi": "Giải tích",
    "en": "Calculus"
  },
  {
    "id": "geometry",
    "vi": "Hình",
    "en": "Geometry"
  },
  {
    "id": "chance",
    "vi": "Xác suất",
    "en": "Chance"
  }
];

export type Card = {
  id: string;
  n: string;
  stream: StreamId;
  grade: "10" | "11" | "12";
  status: "ready" | "stub";
  title: string;
  titleEn: string;
  blurb: string;
  blurbEn: string;
  questions: number;
};

export const cards = [
  {
    "id": "quadratic",
    "n": "01",
    "stream": "algebra",
    "grade": "10",
    "status": "ready",
    "title": "Hàm số bậc hai",
    "titleEn": "Quadratic functions",
    "blurb": "Đỉnh và Δ. Chuồng 40 m đạt 200 m².",
    "blurbEn": "Vertex and discriminant. A 40 m fence reaches 200 m².",
    "questions": 13
  },
  {
    "id": "ineq",
    "n": "02",
    "stream": "algebra",
    "grade": "10",
    "status": "ready",
    "title": "Bất đẳng thức",
    "titleEn": "Inequalities",
    "blurb": "4 và 9: trung bình cộng 6,5, trung bình nhân 6.",
    "blurbEn": "4 and 9: arithmetic mean 6.5, geometric mean 6.",
    "questions": 13
  },
  {
    "id": "exp",
    "n": "03",
    "stream": "algebra",
    "grade": "12",
    "status": "ready",
    "title": "Mũ và logarit",
    "titleEn": "Exponents and logarithms",
    "blurb": "10 triệu, lãi kép 8% sau 5 năm khoảng 14,69, không phải 14.",
    "blurbEn": "10 million at 8% compound for 5 years is about 14.69, not 14.",
    "questions": 13
  },
  {
    "id": "sequence",
    "n": "04",
    "stream": "algebra",
    "grade": "11",
    "status": "ready",
    "title": "Dãy số",
    "titleEn": "Sequences",
    "blurb": "Cộng d hoặc nhân q. Có tổng vô hạn khi |q| < 1.",
    "blurbEn": "Add d, or multiply by q. An infinite sum when |q| < 1.",
    "questions": 13
  },
  {
    "id": "trig",
    "n": "05",
    "stream": "analysis",
    "grade": "11",
    "status": "ready",
    "title": "Lượng giác",
    "titleEn": "Trigonometry",
    "blurb": "Đường tròn bán kính 1: góc 90° là điểm (0; 1).",
    "blurbEn": "Circle of radius 1: 90° is the point (0, 1).",
    "questions": 13
  },
  {
    "id": "limit",
    "n": "06",
    "stream": "analysis",
    "grade": "11",
    "status": "ready",
    "title": "Giới hạn",
    "titleEn": "Limits",
    "blurb": "Hai phía cùng tiến tới một số. Giá trị tại điểm không quyết định giới hạn.",
    "blurbEn": "Both sides approach one number. The value at the point does not decide the limit.",
    "questions": 13
  },
  {
    "id": "derivative",
    "n": "07",
    "stream": "analysis",
    "grade": "11",
    "status": "ready",
    "title": "Đạo hàm",
    "titleEn": "Derivatives",
    "blurb": "Cát tuyến thành tiếp tuyến khi h về 0.",
    "blurbEn": "The secant becomes the tangent as h goes to 0.",
    "questions": 14
  },
  {
    "id": "survey",
    "n": "08",
    "stream": "analysis",
    "grade": "12",
    "status": "ready",
    "title": "Khảo sát hàm số",
    "titleEn": "Curve sketching",
    "blurb": "y = x³ − 3x: cực đại 2 tại x = −1, cực tiểu −2 tại x = 1.",
    "blurbEn": "y = x³ − 3x: maximum 2 at x = −1, minimum −2 at x = 1.",
    "questions": 13
  },
  {
    "id": "integral",
    "n": "09",
    "stream": "analysis",
    "grade": "12",
    "status": "ready",
    "title": "Tích phân",
    "titleEn": "Integrals",
    "blurb": "Diện tích có dấu, và phần giữa hai đồ thị.",
    "blurbEn": "Signed area, and the region between two graphs.",
    "questions": 13
  },
  {
    "id": "vector",
    "n": "10",
    "stream": "geometry",
    "grade": "10",
    "status": "ready",
    "title": "Vectơ và ma trận",
    "titleEn": "Vectors and matrices",
    "blurb": "Độ dài, định thức, và hệ hai ẩn khi có đúng một nghiệm.",
    "blurbEn": "Length, a determinant, and a two-unknown system with exactly one solution.",
    "questions": 13
  },
  {
    "id": "analytic",
    "n": "11",
    "stream": "geometry",
    "grade": "10",
    "status": "ready",
    "title": "Hình giải tích",
    "titleEn": "Coordinate geometry",
    "blurb": "(3; 1) cách đường x + y − 2 = 0 đúng √2.",
    "blurbEn": "(3, 1) is exactly √2 from the line x + y − 2 = 0.",
    "questions": 13
  },
  {
    "id": "triangle",
    "n": "12",
    "stream": "geometry",
    "grade": "10",
    "status": "ready",
    "title": "Hình phẳng và không gian",
    "titleEn": "Plane and solid figures",
    "blurb": "Đáy 6, cao 4 thì diện tích 12. Chóp còn nhân 1/3.",
    "blurbEn": "Base 6 and height 4 give area 12. A pyramid also multiplies by 1/3.",
    "questions": 13
  },
  {
    "id": "combo",
    "n": "13",
    "stream": "chance",
    "grade": "11",
    "status": "ready",
    "title": "Tổ hợp và thống kê",
    "titleEn": "Combinatorics and statistics",
    "blurb": "A kể thứ tự, C thì không. Một điểm lệch kéo trung bình.",
    "blurbEn": "A counts order, C does not. One outlier pulls the mean.",
    "questions": 13
  },
  {
    "id": "probability",
    "n": "14",
    "stream": "chance",
    "grade": "12",
    "status": "ready",
    "title": "Xác suất",
    "titleEn": "Probability",
    "blurb": "Khi đã biết thêm một dữ kiện, mẫu số không còn là mẫu lúc đầu.",
    "blurbEn": "Once one more fact is known, the denominator is no longer the original sample.",
    "questions": 13
  }
] as const satisfies readonly Card[];

export type CardId = (typeof cards)[number]["id"];

export const QUESTION_TOTAL = cards.reduce((sum, card) => sum + card.questions, 0);

export function streamName(id: StreamId, lang: "vi" | "en"): string {
  const stream = streams.find((item) => item.id === id);
  if (!stream) return id;
  return lang === "en" ? stream.en : stream.vi;
}
