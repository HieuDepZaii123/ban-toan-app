export const sciences = [
  {
    id: "python",
    title: "Lập trình toán",
    titleEn: "Maths programming",
    blurb: "Vòng lặp tính tổng 1 + … + n, rồi vẽ đồ thị.",
    blurbEn: "A loop adds 1 + … + n, then draws the graph.",
  },
  {
    id: "du-lieu",
    title: "Ứng dụng dữ liệu",
    titleEn: "Data in practice",
    blurb: "Dãy 2, 3, 4, 5, 20: trung vị 4, trung bình 6,8.",
    blurbEn: "The list 2, 3, 4, 5, 20: median 4, mean 6.8.",
  },
  {
    id: "chuyen",
    title: "Đề trường chuyên",
    titleEn: "Specialist school papers",
    blurb: "Bài kiểu chuyên: viết điều kiện, rồi thử lại vào đề.",
    blurbEn: "Specialist-style problems: write the conditions, then check back in the question.",
  },
  {
    id: "vat-ly",
    title: "Vật lý toán",
    titleEn: "Maths in physics",
    blurb: "s = 20t − 5t², vận tốc bằng 0 tại t = 2.",
    blurbEn: "s = 20t − 5t², velocity is 0 at t = 2.",
  },
  {
    id: "hoa",
    title: "Hóa tính toán",
    titleEn: "Chemistry calculations",
    blurb: "pH = −log[H⁺]: nồng độ 10⁻³ thì pH = 3.",
    blurbEn: "pH = −log[H⁺]: a concentration of 10⁻³ gives pH = 3.",
  },
] as const;

export type ScienceId = (typeof sciences)[number]["id"];

export function scienceById(id: string): (typeof sciences)[number] | undefined {
  return sciences.find((item) => item.id === id);
}
