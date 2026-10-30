export type SharedQuestion = {
  id: string;
  topic: string;
  href: string;
  prompt: string;
  choices: [string, string, string, string];
  answer: 0 | 1 | 2 | 3;
  steps: string[];
};

export const sharedDrill: SharedQuestion[] = [
  {
    id: "rao",
    topic: "Hàm bậc hai",
    href: "/t/quadratic?tab=so",
    prompt: "Rào chuồng chữ nhật ba phía (một phía là tường) bằng 36 m lưới. Diện tích lớn nhất là bao nhiêu?",
    choices: ["81 m²", "108 m²", "162 m²", "324 m²"],
    answer: 2,
    steps: ["2x + y = 36, với x vuông góc tường.", "S = x(36 − 2x).", "S' = 36 − 4x = 0 khi x = 9.", "y = 18, S = 162 m²."],
  },
  {
    id: "bayes",
    topic: "Xác suất",
    href: "/t/probability?tab=so",
    prompt: "Xét nghiệm dương 99% nếu có bệnh, âm 99% nếu khỏe. Tỉ lệ bệnh 0,2%. Người dương tính thì P(bệnh) gần",
    choices: ["99%", "50%", "≈17%", "≈2%"],
    answer: 2,
    steps: ["P(+) = 0,002·0,99 + 0,998·0,01 = 0,01196.", "P(bệnh|+) = 0,00198 / 0,01196 ≈ 0,166.", "Gần 17%."],
  },
  {
    id: "cuc-tri",
    topic: "Đạo hàm",
    href: "/t/derivative?tab=so",
    prompt: "f(x) = x³ − 3x có bao nhiêu điểm cực trị trên ℝ?",
    choices: ["0", "1", "2", "3"],
    answer: 2,
    steps: ["f' = 3x² − 3 = 3(x − 1)(x + 1).", "Hai nghiệm đơn, f' đổi dấu tại cả hai.", "Có 2 điểm cực trị."],
  },
  {
    id: "sin3",
    topic: "Giới hạn",
    href: "/t/limit?tab=so",
    prompt: "lim khi x → 0 của (sin 3x)/x bằng",
    choices: ["0", "1", "3", "không tồn tại"],
    answer: 2,
    steps: ["(sin 3x)/x = 3 · sin(3x)/(3x).", "sin t / t → 1 khi t → 0.", "Giới hạn bằng 3."],
  },
  {
    id: "cheo",
    topic: "Hình không gian",
    href: "/t/triangle?tab=so",
    prompt: "Lập phương cạnh a có đường chéo không gian dài bao nhiêu?",
    choices: ["a√2", "a√3", "2a", "a√6"],
    answer: 1,
    steps: ["Đường chéo mặt là a√2.", "d = √(2a² + a²) = a√3."],
  },
  {
    id: "tiep",
    topic: "Đạo hàm",
    href: "/t/derivative?tab=so",
    prompt: "Tiếp tuyến của y = x² tại x = 2 có phương trình",
    choices: ["y = 2x", "y = 4x − 4", "y = 4x + 4", "y = 2x + 4"],
    answer: 1,
    steps: ["y' = 2x, hệ số góc tại 2 là 4.", "Điểm (2; 4).", "y = 4(x − 2) + 4 = 4x − 4."],
  },
  {
    id: "tich",
    topic: "Tích phân",
    href: "/t/integral?tab=so",
    prompt: "∫ từ 0 đến 1 của (3x² + 2x) dx bằng",
    choices: ["1", "2", "3", "5/2"],
    answer: 1,
    steps: ["Nguyên hàm x³ + x².", "F(1) − F(0) = 2."],
  },
  {
    id: "csc",
    topic: "Dãy số",
    href: "/t/sequence?tab=so",
    prompt: "Cấp số cộng u₁ = 2, d = 3. Tổng 10 số hạng đầu S₁₀ bằng",
    choices: ["145", "155", "165", "310"],
    answer: 1,
    steps: ["u₁₀ = 2 + 9·3 = 29.", "S₁₀ = 10·(2 + 29)/2 = 155."],
  },
  {
    id: "lai",
    topic: "Mũ và logarit",
    href: "/t/exp?tab=so",
    prompt: "Gửi 100 triệu, lãi kép 6%/năm. Sau 3 năm số tiền gần nhất với",
    choices: ["118,00 triệu", "119,10 triệu", "119,50 triệu", "120,00 triệu"],
    answer: 1,
    steps: ["100·1,06³.", "1,06³ ≈ 1,191016.", "Khoảng 119,10 triệu."],
  },
  {
    id: "log",
    topic: "Mũ và logarit",
    href: "/t/exp?tab=so",
    prompt: "Nghiệm của log₂(x − 1) = 3 là",
    choices: ["x = 7", "x = 8", "x = 9", "x = 10"],
    answer: 2,
    steps: ["Điều kiện x > 1.", "x − 1 = 8.", "x = 9."],
  },
  {
    id: "chop",
    topic: "Hình không gian",
    href: "/t/triangle?tab=so",
    prompt: "Chóp tứ giác đều cạnh đáy 2, chiều cao 3. Thể tích bằng",
    choices: ["4", "6", "12", "2"],
    answer: 0,
    steps: ["Đáy vuông, diện tích 4.", "V = (1/3)·4·3 = 4."],
  },
  {
    id: "kc",
    topic: "Hình giải tích",
    href: "/t/analytic?tab=so",
    prompt: "Khoảng cách từ A(1; 2; 3) đến mặt phẳng 2x − y + 2z − 3 = 0 bằng",
    choices: ["1", "2", "3", "1/3"],
    answer: 0,
    steps: ["Tử |2 − 2 + 6 − 3| = 3.", "Mẫu √(4 + 1 + 4) = 3.", "Khoảng cách bằng 1."],
  },
  {
    id: "nu",
    topic: "Xác suất",
    href: "/t/probability?tab=so",
    prompt: "Lớp 5 nam, 4 nữ. Chọn 2 bạn. Xác suất cả hai là nữ là",
    choices: ["1/6", "2/9", "4/9", "1/3"],
    answer: 0,
    steps: ["C(9,2) = 36.", "C(4,2) = 6.", "P = 6/36 = 1/6."],
  },
  {
    id: "cos",
    topic: "Lượng giác",
    href: "/t/trig?tab=so",
    prompt: "Phương trình cos x = 1/2 có bao nhiêu nghiệm trên [0; 2π]?",
    choices: ["1", "2", "3", "4"],
    answer: 1,
    steps: ["x = ±π/3 + k2π.", "Trên [0; 2π]: π/3 và 5π/3.", "Có 2 nghiệm."],
  },
];

export function isSharedCorrect(index: number, choice: number): boolean {
  const question = sharedDrill[index];
  return question !== undefined && choice === question.answer;
}
