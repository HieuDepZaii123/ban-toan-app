const core = [
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

const more = [
  {
    id: "sinh",
    title: "Sinh học tính toán",
    blurb: "Lai Aa × Aa cho trội : lặn = 3 : 1; quần thể tăng gấp đôi sau 70/r năm.",
  },
  {
    id: "thuat-toan",
    title: "Thuật toán và độ phức tạp",
    blurb: "Số 13 là 1101 nhị phân; tìm nhị phân 1000 số chỉ cần 10 lần chia đôi.",
  },
  {
    id: "song-quang",
    title: "Sóng và quang học",
    blurb: "v = λf; thấu kính f = 10 cm, vật cách 30 cm cho ảnh cách 15 cm.",
  },
  {
    id: "nhiet-khi",
    title: "Nhiệt và chất khí",
    blurb: "Q = mcΔt; nén đẳng nhiệt gấp đôi áp suất thì thể tích giảm một nửa.",
  },
] as const;

export const sciences = [...core, ...more] as const;
export type CoreScienceId = (typeof core)[number]["id"];
export type ExtraScienceId = (typeof more)[number]["id"];

export type ScienceId = (typeof sciences)[number]["id"];

export function scienceById(id: string): (typeof sciences)[number] | undefined {
  return sciences.find((item) => item.id === id);
}
