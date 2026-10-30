const RULES: [RegExp, string][] = [
  [/bậc hai|parabol|delta|Δ/i, "Gợi ý bậc hai:\n1) Tính $\\Delta=b^2-4ac$.\n2) $\\Delta>0$ có hai nghiệm, $\\Delta=0$ nghiệm kép, $\\Delta<0$ vô nghiệm thực.\n3) Thay số của bạn và tự tính bước cuối."],
  [/đạo hàm|tiếp tuyến|cực trị/i, "Gợi ý đạo hàm:\n1) Tính $f'(x)$.\n2) Tiếp tuyến tại $x_0$: $y=f'(x_0)(x-x_0)+f(x_0)$.\n3) Cực trị khi $f'$ đổi dấu."],
  [/tích phân|nguyên hàm/i, "Gợi ý tích phân:\n1) Tìm nguyên hàm $F$.\n2) $\\int_a^b f(x)\\,dx=F(b)-F(a)$.\n3) Diện tích giữa hai đồ thị lấy trị tuyệt đối."],
  [/giới hạn|\\blim\\b/i, "Gợi ý giới hạn:\n1) Thay trực tiếp.\n2) Dạng $0/0$ thì phân tích hoặc nhân liên hợp.\n3) Nhớ $\\lim_{x\\to 0}\\frac{\\sin x}{x}=1$."],
];

const MATH = /(toán|phương trình|hàm|đạo hàm|tích phân|giới hạn|log|mũ|lượng giác|sin|cos|xác suất|dãy|vectơ|hình|thể tích|cực trị|nghiệm|\$|\d)/i;

export function mockTutor(question: string): string {
  if (!MATH.test(question)) {
    return "Mình chỉ hỗ trợ câu hỏi toán THPT. Bạn gửi một bài hoặc một khái niệm cần gợi ý nhé.";
  }
  for (const [pattern, answer] of RULES) {
    if (pattern.test(question)) return answer;
  }
  return "Cùng đi từng bước:\n1) Ghi giả thiết và điều cần tìm.\n2) Chọn công thức trong Sổ công thức.\n3) Làm bước đầu rồi gửi lại để mình góp ý.\nHãy tự kiểm chứng công thức.";
}
