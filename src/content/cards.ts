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
  /** Lớp (hoặc khoảng lớp) mà chương trình 2018 dạy nội dung này. */
  grade: "10" | "11" | "12" | "10–11" | "10–12";
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
    "blurb": "Tìm đỉnh, vẽ parabol, xét số nghiệm, và dùng hàm bậc hai để tìm diện tích lớn nhất của một mảnh đất.",
    "blurbEn": "Find the vertex, sketch the parabola, count the roots, and use a quadratic to get the largest area of a plot.",
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
    "blurb": "So sánh trung bình cộng với trung bình nhân, tìm giá trị lớn nhất, nhỏ nhất, và giải hệ bất phương trình trên một miền.",
    "blurbEn": "Compare arithmetic and geometric means, find maxima and minima, and solve systems of inequalities on a region.",
    "questions": 13
  },
  {
    "id": "exp",
    "n": "03",
    "stream": "algebra",
    "grade": "11",
    "status": "ready",
    "title": "Mũ và logarit",
    "titleEn": "Exponents and logarithms",
    "blurb": "Lũy thừa, logarit, lãi kép và tăng trưởng: vì sao tiền gửi lãi kép tăng nhanh hơn lãi đơn.",
    "blurbEn": "Powers, logarithms, compound interest and growth: why compound interest outgrows simple interest.",
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
    "blurb": "Cấp số cộng, cấp số nhân, công thức số hạng tổng quát, tính tổng và tổng vô hạn.",
    "blurbEn": "Arithmetic and geometric sequences, the general term, finite sums and infinite sums.",
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
    "blurb": "Đường tròn lượng giác, giá trị sin và cos của các góc, công thức biến đổi và phương trình lượng giác.",
    "blurbEn": "The unit circle, sine and cosine values, identities and trigonometric equations.",
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
    "blurb": "Giới hạn của dãy số và hàm số, cách khử dạng không xác định, và hàm số liên tục.",
    "blurbEn": "Limits of sequences and functions, removing indeterminate forms, and continuity.",
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
    "blurb": "Đạo hàm là hệ số góc của tiếp tuyến. Học các quy tắc tính đạo hàm và viết phương trình tiếp tuyến.",
    "blurbEn": "The derivative is the slope of the tangent. Learn the rules for derivatives and write tangent lines.",
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
    "blurb": "Dùng đạo hàm để biết hàm tăng giảm ở đâu, tìm cực trị, tiệm cận và vẽ bảng biến thiên.",
    "blurbEn": "Use derivatives to see where a function rises and falls, find extrema and asymptotes, and build the variation table.",
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
    "blurb": "Nguyên hàm, tích phân, diện tích hình phẳng và thể tích khối tròn xoay.",
    "blurbEn": "Antiderivatives, definite integrals, areas between curves and volumes of revolution.",
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
    "blurb": "Cộng trừ vectơ, tích vô hướng, góc giữa hai vectơ, và giải hệ hai ẩn bằng định thức.",
    "blurbEn": "Adding vectors, the dot product, the angle between vectors, and solving two-unknown systems with determinants.",
    "questions": 13
  },
  {
    "id": "analytic",
    "n": "11",
    "stream": "geometry",
    "grade": "10–12",
    "status": "ready",
    "title": "Hình giải tích",
    "titleEn": "Coordinate geometry",
    "blurb": "Phương trình đường thẳng, đường tròn, khoảng cách từ một điểm đến một đường thẳng trong mặt phẳng tọa độ.",
    "blurbEn": "Equations of lines and circles, and the distance from a point to a line in the coordinate plane.",
    "questions": 13
  },
  {
    "id": "triangle",
    "n": "12",
    "stream": "geometry",
    "grade": "10–11",
    "status": "ready",
    "title": "Hình phẳng và không gian",
    "titleEn": "Plane and solid figures",
    "blurb": "Định lí sin, định lí côsin, giải tam giác, diện tích và thể tích các khối hình.",
    "blurbEn": "The laws of sines and cosines, solving triangles, areas and volumes of solids.",
    "questions": 13
  },
  {
    "id": "combo",
    "n": "13",
    "stream": "chance",
    "grade": "10",
    "status": "ready",
    "title": "Tổ hợp và thống kê",
    "titleEn": "Combinatorics and statistics",
    "blurb": "Quy tắc đếm, hoán vị, chỉnh hợp, tổ hợp, và các số đặc trưng của một mẫu số liệu.",
    "blurbEn": "Counting rules, permutations, arrangements, combinations, and summary statistics of a data set.",
    "questions": 13
  },
  {
    "id": "probability",
    "n": "14",
    "stream": "chance",
    "grade": "10–12",
    "status": "ready",
    "title": "Xác suất",
    "titleEn": "Probability",
    "blurb": "Xác suất cổ điển, biến cố đối, xác suất có điều kiện và công thức Bayes qua các ví dụ đời thường.",
    "blurbEn": "Classical probability, complements, conditional probability and Bayes' rule through everyday examples.",
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
