/** Các môn đại học: chỉ môn «ready» có bộ kiến thức; môn còn lại hiện là «sắp có». */
export type Course = { id: string; title: string; titleEn: string; blurb: string; blurbEn: string; ready: boolean };

export const courses: Course[] = [
  { id: "linalg", title: "Đại số tuyến tính", titleEn: "Linear algebra", blurb: "Khử Gauss, định thức, giá trị riêng, hồi quy, PageRank và nén ảnh.", blurbEn: "Gaussian elimination, determinants, eigenvalues, regression, PageRank and image compression.", ready: true },
  { id: "calculus", title: "Giải tích một và nhiều biến", titleEn: "Calculus of one and several variables", blurb: "Chuỗi, Taylor, đạo hàm riêng, gradient, cực trị có điều kiện, tích phân bội.", blurbEn: "Series, Taylor, partial derivatives, gradients, constrained extrema, multiple integrals.", ready: true },
  { id: "stats", title: "Xác suất thống kê", titleEn: "Probability and statistics", blurb: "Kì vọng, luật số lớn, giới hạn trung tâm, khoảng tin cậy, kiểm định, A/B test.", blurbEn: "Expectation, law of large numbers, central limit theorem, confidence intervals, tests, A/B testing.", ready: false },
  { id: "discrete", title: "Phương trình vi phân và toán rời rạc", titleEn: "Differential equations and discrete maths", blurb: "Mô hình tăng trưởng và dịch bệnh, đồ thị, đồng dư và RSA.", blurbEn: "Growth and epidemic models, graphs, congruences and RSA.", ready: false },
];

export function courseById(id: string): Course | undefined {
  return courses.find((course) => course.id === id);
}
