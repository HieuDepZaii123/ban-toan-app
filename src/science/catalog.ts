export const sciences = [
  {
    id: "python",
    title: "Lập trình toán",
    blurb: "Python cho bài toán THPT: vòng lặp, hàm và đồ thị.",
  },
  {
    id: "du-lieu",
    title: "Ứng dụng dữ liệu",
    blurb: "Thống kê mô tả và cách đọc một biểu đồ số liệu.",
  },
  {
    id: "chuyen",
    title: "Đề trường chuyên",
    blurb: "Bài phong cách trường chuyên, làm chậm và đối chiếu lời giải.",
  },
  {
    id: "vat-ly",
    title: "Vật lý toán",
    blurb: "Chuyển động, lực và điện ở mức THPT, viết bằng công thức toán.",
  },
  {
    id: "hoa",
    title: "Hóa tính toán",
    blurb: "Lượng chất, nồng độ và pH — tính được thì mới cân được.",
  },
] as const;

export type ScienceId = (typeof sciences)[number]["id"];

export function scienceById(id: string): (typeof sciences)[number] | undefined {
  return sciences.find((item) => item.id === id);
}
