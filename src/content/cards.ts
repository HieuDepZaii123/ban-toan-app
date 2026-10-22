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

export const cards: Card[] = [
  {
    "id": "quadratic",
    "n": "01",
    "stream": "algebra",
    "grade": "10",
    "status": "ready",
    "title": "Hàm số bậc hai",
    "titleEn": "Quadratic functions",
    "blurb": "Parabol, đỉnh và Δ. Kéo hệ số, rồi đối chiếu với chuồng rào 40 m.",
    "blurbEn": "Parabola, vertex and discriminant. Drag the coefficients, then compare with a 40 m fence.",
    "questions": 6
  },
  {
    "id": "ineq",
    "n": "02",
    "stream": "algebra",
    "grade": "10",
    "status": "ready",
    "title": "Bất đẳng thức",
    "titleEn": "Inequalities",
    "blurb": "AM–GM, Cauchy–Schwarz, và lợi nhuận lớn nhất ở một đỉnh của xưởng.",
    "blurbEn": "AM–GM, Cauchy–Schwarz, and the greatest profit at a vertex of the workshop.",
    "questions": 6
  },
  {
    "id": "exp",
    "n": "03",
    "stream": "algebra",
    "grade": "12",
    "status": "ready",
    "title": "Mũ và logarit",
    "titleEn": "Exponents and logarithms",
    "blurb": "aˣ và logₐ là hai chiều của một việc, như lãi kép và thời gian để gấp đôi.",
    "blurbEn": "aˣ and logₐ are the two directions of one idea, like compound interest and doubling time.",
    "questions": 6
  },
  {
    "id": "sequence",
    "n": "04",
    "stream": "algebra",
    "grade": "11",
    "status": "ready",
    "title": "Dãy số",
    "titleEn": "Sequences",
    "blurb": "Cấp số cộng thêm một số cố định. Cấp số nhân nhân với một công bội.",
    "blurbEn": "An arithmetic sequence adds a fixed step. A geometric sequence multiplies by a fixed ratio.",
    "questions": 6
  },
  {
    "id": "trig",
    "n": "05",
    "stream": "analysis",
    "grade": "11",
    "status": "ready",
    "title": "Lượng giác",
    "titleEn": "Trigonometry",
    "blurb": "Trên đường tròn đơn vị, cos là cạnh ngang, sin là cạnh đứng.",
    "blurbEn": "On the unit circle, cos is the horizontal side and sin is the vertical side.",
    "questions": 6
  },
  {
    "id": "limit",
    "n": "06",
    "stream": "analysis",
    "grade": "11",
    "status": "ready",
    "title": "Giới hạn",
    "titleEn": "Limits",
    "blurb": "Giá trị hai phía tiến tới, kể cả khi đúng một điểm bị khuyết hoặc bị nhảy.",
    "blurbEn": "The value both sides approach, even if the point itself is missing or jumps.",
    "questions": 6
  },
  {
    "id": "derivative",
    "n": "07",
    "stream": "analysis",
    "grade": "11",
    "status": "ready",
    "title": "Đạo hàm",
    "titleEn": "Derivatives",
    "blurb": "Cát tuyến nằm xuống thành tiếp tuyến khi h về 0. Tỉ số đó là đạo hàm.",
    "blurbEn": "The secant settles onto the tangent as h goes to 0. That ratio is the derivative.",
    "questions": 7
  },
  {
    "id": "survey",
    "n": "08",
    "stream": "analysis",
    "grade": "12",
    "status": "ready",
    "title": "Khảo sát hàm số",
    "titleEn": "Curve sketching",
    "blurb": "Bảng biến thiên đọc đồng biến, cực trị và điểm uốn từ dấu của y′ và y″.",
    "blurbEn": "A variation table reads increase, extrema and inflection from the signs of y′ and y″.",
    "questions": 6
  },
  {
    "id": "integral",
    "n": "09",
    "stream": "analysis",
    "grade": "12",
    "status": "ready",
    "title": "Tích phân",
    "titleEn": "Integrals",
    "blurb": "Diện tích có dấu dưới một đường, và phần nằm giữa hai đường.",
    "blurbEn": "Signed area under a curve, and the region between two curves.",
    "questions": 6
  },
  {
    "id": "vector",
    "n": "10",
    "stream": "geometry",
    "grade": "10",
    "status": "ready",
    "title": "Vectơ và ma trận",
    "titleEn": "Vectors and matrices",
    "blurb": "Độ dài trong không gian, định thức hai cột, và một hệ hai ẩn có đúng một nghiệm.",
    "blurbEn": "Length in space, the determinant of two columns, and a two-unknown system with one solution.",
    "questions": 6
  },
  {
    "id": "analytic",
    "n": "11",
    "stream": "geometry",
    "grade": "10",
    "status": "ready",
    "title": "Hình giải tích",
    "titleEn": "Coordinate geometry",
    "blurb": "Khoảng cách tới đường thẳng và mặt phẳng, rồi vị trí của một điểm với đường tròn.",
    "blurbEn": "Distance to a line and to a plane, then where a point sits against a circle.",
    "questions": 6
  },
  {
    "id": "triangle",
    "n": "12",
    "stream": "geometry",
    "grade": "10",
    "status": "ready",
    "title": "Hình phẳng và không gian",
    "titleEn": "Plane and solid figures",
    "blurb": "Diện tích tam giác, thể tích hộp và chóp, và tứ diện đều có sáu cạnh bằng nhau.",
    "blurbEn": "Triangle area, box and pyramid volume, and a regular tetrahedron whose six edges match.",
    "questions": 6
  },
  {
    "id": "combo",
    "n": "13",
    "stream": "chance",
    "grade": "11",
    "status": "ready",
    "title": "Tổ hợp và thống kê",
    "titleEn": "Combinatorics and statistics",
    "blurb": "Chỉnh hợp kể thứ tự, tổ hợp thì không. Một điểm lệch kéo trung bình; trung vị có thể đứng yên.",
    "blurbEn": "Permutations count order, combinations do not. One outlier pulls the mean; the median can stay put.",
    "questions": 6
  },
  {
    "id": "probability",
    "n": "14",
    "stream": "chance",
    "grade": "12",
    "status": "ready",
    "title": "Xác suất",
    "titleEn": "Probability",
    "blurb": "Khi đã biết một phần kết quả, mẫu số không còn là mẫu ban đầu.",
    "blurbEn": "Once part of the outcome is known, the denominator is no longer the original sample.",
    "questions": 6
  }
];

export const QUESTION_TOTAL = cards.reduce((sum, card) => sum + card.questions, 0);

export function streamName(id: StreamId, lang: "vi" | "en"): string {
  const stream = streams.find((item) => item.id === id);
  if (!stream) return id;
  return lang === "en" ? stream.en : stream.vi;
}
