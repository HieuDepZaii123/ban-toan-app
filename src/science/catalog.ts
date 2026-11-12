export const sciences = [
  {
    id: "python",
    title: "Lập trình toán",
    blurb: "Vòng lặp tính tổng, thuật toán Euclid, chia đôi tìm nghiệm.",
  },
  {
    id: "du-lieu",
    title: "Ứng dụng dữ liệu",
    blurb: "Dãy 2, 3, 4, 5, 20: trung vị 4, trung bình 6,8.",
  },
  {
    id: "chuyen",
    title: "Đề trường chuyên",
    blurb: "Bài kiểu chuyên: viết điều kiện, rồi thử lại vào đề.",
  },
  {
    id: "vat-ly",
    title: "Vật lý toán",
    blurb: "s = 20t − 5t², vận tốc bằng 0 tại t = 2.",
  },
  {
    id: "hoa",
    title: "Hóa tính toán",
    blurb: "pH = −log[H⁺]: nồng độ 10⁻³ thì pH = 3.",
  },
] as const;

export type ScienceId = (typeof sciences)[number]["id"];

export function scienceById(id: string): (typeof sciences)[number] | undefined {
  return sciences.find((item) => item.id === id);
}
