export const sciences = [
  {
    id: "python",
    title: "Lập trình toán",
    blurb: "Vòng lặp, hàm, và đồ thị cho bài THPT.",
  },
  {
    id: "du-lieu",
    title: "Ứng dụng dữ liệu",
    blurb: "Trung bình, trung vị, và cách đọc biểu đồ.",
  },
  {
    id: "chuyen",
    title: "Đề trường chuyên",
    blurb: "Bài kiểu chuyên: viết điều kiện, rồi thử lại vào đề.",
  },
  {
    id: "vat-ly",
    title: "Vật lý toán",
    blurb: "Chuyển động, lực, điện — viết bằng công thức.",
  },
  {
    id: "hoa",
    title: "Hóa tính toán",
    blurb: "Số mol, nồng độ, pH: đổi đơn vị rồi mới tính.",
  },
] as const;

export type ScienceId = (typeof sciences)[number]["id"];

export function scienceById(id: string): (typeof sciences)[number] | undefined {
  return sciences.find((item) => item.id === id);
}
