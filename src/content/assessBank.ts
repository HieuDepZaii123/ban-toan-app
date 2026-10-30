export type AssessQuestion = {
  t: string;
  choices?: string[];
  answer?: number;
  numeric?: number;
  tol?: number;
  steps: string[];
};

export type AssessBank = {
  id: "tuduy" | "tonghop" | "hsg";
  name: string;
  desc: string;
  questions: AssessQuestion[];
};

export const assessBanks: AssessBank[] = [
  {
    id: "tuduy",
    name: "Tư duy toán",
    desc: "Nhận quy luật và ước lượng nhanh.",
    questions: [
      { t: "Tìm số tiếp theo: 2, 6, 12, 20, 30, …", choices: ["40", "42", "44", "36"], answer: 1, steps: ["Hiệu liên tiếp: 4, 6, 8, 10.", "Hiệu kế tiếp là 12.", "30 + 12 = 42."] },
      { t: "Dãy 1, 1, 2, 3, 5, 8, 13, … Số kế tiếp?", numeric: 21, steps: ["Mỗi số bằng tổng hai số liền trước.", "8 + 13 = 21."] },
      { t: "√50 gần nhất với giá trị nào?", choices: ["6,9", "7,1", "7,3", "7,5"], answer: 1, steps: ["7² = 49.", "√50 ≈ 7 + 1/14 ≈ 7,07.", "Gần nhất: 7,1."] },
      { t: "n không chia hết cho 3. Điều nào chắc chắn đúng, nếu mọi số chia hết cho 6 đều chia hết cho 3?", choices: ["n chia hết cho 2", "n không chia hết cho 6", "n là số lẻ", "Không kết luận được"], answer: 1, steps: ["Phản đảo: không chia hết cho 3 thì không chia hết cho 6."] },
      { t: "Chữ số tận cùng của 7^2026?", numeric: 9, steps: ["Chu kỳ 4: 7, 9, 3, 1.", "2026 = 4·506 + 2.", "Vị trí thứ 2 là 9."] },
      { t: "0,49 × 201 gần nhất với", choices: ["10", "50", "100", "200"], answer: 2, steps: ["0,5 × 200 = 100.", "Giá trị đúng khoảng 98,49."] },
      { t: "Đa giác lồi 10 cạnh có bao nhiêu đường chéo?", numeric: 35, steps: ["n(n − 3)/2.", "10·7/2 = 35."] },
      { t: "Tính 1 + 3 + 5 + … + 99.", numeric: 2500, steps: ["Có 50 số lẻ.", "Tổng n số lẻ đầu là n².", "50² = 2500."] },
    ],
  },
  {
    id: "tonghop",
    name: "Năng lực tổng hợp",
    desc: "Toán trong vật lý, hóa và đời sống.",
    questions: [
      { t: "Vật rơi h = 4,9t². Từ 122,5 m, sau bao nhiêu giây chạm đất?", numeric: 5, steps: ["4,9t² = 122,5.", "t² = 25.", "t = 5."] },
      { t: "Gửi 100 triệu, lãi kép 6%/năm. Sau 3 năm còn khoảng bao nhiêu triệu?", numeric: 119.1, tol: 0.01, steps: ["100·1,06³.", "1,06³ ≈ 1,191016.", "Khoảng 119,10 triệu."] },
      { t: "200 g dung dịch muối 10%. Thêm bao nhiêu gam nước để được 8%?", numeric: 50, steps: ["Muối: 20 g.", "20/(200 + x) = 0,08.", "x = 50."] },
      { t: "Đi 60 km/h, về 40 km/h. Tốc độ trung bình cả đi lẫn về?", numeric: 48, steps: ["Trung bình điều hòa 2ab/(a+b).", "2·60·40/100 = 48."] },
      { t: "Bể 2 m × 3 m × 1,5 m, bơm 15 lít/phút. Bao nhiêu phút thì đầy?", numeric: 600, steps: ["V = 9 m³ = 9000 lít.", "9000/15 = 600."] },
      { t: "Cọc 1,5 m bóng 2 m. Cây bóng 12 m thì cao bao nhiêu mét?", numeric: 9, steps: ["Tam giác đồng dạng.", "h/12 = 1,5/2.", "h = 9."] },
    ],
  },
  {
    id: "hsg",
    name: "Đội tuyển HSG",
    desc: "Mức chọn đội, kết hợp nhiều chuyên đề.",
    questions: [
      { t: "Có bao nhiêu cặp nguyên dương (x; y) thỏa 1/x + 1/y = 1/2026?", numeric: 9, steps: ["(x − 2026)(y − 2026) = 2026².", "2026² có 9 ước dương.", "Mỗi ước cho một cặp."] },
      { t: "Số dư khi chia 2^2026 cho 1013?", numeric: 4, steps: ["Fermat: 2^1012 ≡ 1 (mod 1013).", "2026 = 2·1012 + 2.", "2^2026 ≡ 4."] },
      { t: "P bậc không quá 3, P(k) = 1/k với k = 1, 2, 3, 4. Tính P(5).", numeric: 0, steps: ["Q(x) = xP(x) − 1 có nghiệm 1, 2, 3, 4.", "Q(5) = −1.", "P(5) = 0."] },
      { t: "f(x+y) = f(x)+f(y)+2xy, f(1) = 3. Tính f(10).", numeric: 120, steps: ["g(x) = f(x) − x² thỏa Cauchy.", "g(x) = 2x.", "f(10) = 120."] },
      { t: "Số cách lát bảng 2×10 bằng domino 1×2?", numeric: 89, steps: ["aₙ = aₙ₋₁ + aₙ₋₂.", "a₁ = 1, a₂ = 2.", "a₁₀ = 89."] },
      { t: "x + 2y + 3z = 14. Giá trị nhỏ nhất của x² + y² + z²?", numeric: 14, steps: ["Cauchy: 14² ≤ 14(x²+y²+z²).", "Min = 14 khi (x,y,z) = (1,2,3)."] },
      { t: "Bao nhiêu số n, 1 ≤ n ≤ 1000, để n² + 1 chia hết cho 5?", numeric: 400, steps: ["n² ≡ 4 (mod 5) khi n ≡ 2 hoặc 3.", "Mỗi 5 số có 2 số.", "1000/5·2 = 400."] },
      { t: "10! có bao nhiêu ước nguyên dương?", numeric: 270, steps: ["10! = 2⁸·3⁴·5²·7.", "9·5·3·2 = 270."] },
    ],
  },
];

export function gradeNumber(value: number, answer: number, tol = 1e-9): boolean {
  return Number.isFinite(value) && Math.abs(value - answer) <= tol;
}
