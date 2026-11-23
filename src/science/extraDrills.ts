/** Bài luyện thêm cho năm mảng đầu của Khoa học; đáp số tính lại trong scripts/gap.test.ts. */
import type { CoreScienceId } from "./catalog.ts";
import type { CheckedDrill } from "./more.ts";

type Layers = { basic: CheckedDrill[]; exam: CheckedDrill[]; adv: CheckedDrill[] };

const primes = (limit: number): number => {
  let count = 0;
  for (let n = 2; n < limit; n += 1) {
    let prime = true;
    for (let d = 2; d * d <= n; d += 1) if (n % d === 0) prime = false;
    if (prime) count += 1;
  }
  return count;
};

export const extraDrills: Record<CoreScienceId, Layers> = {
  python: {
    basic: [
      { q: "`len([3, 1, 4, 1, 5])` bằng bao nhiêu?", answer: "5", steps: ["`len` đếm số phần tử.", "Danh sách có năm số."], num: 5, calc: () => [3, 1, 4, 1, 5].length },
      { q: "`7 // 2` bằng bao nhiêu?", answer: "3", steps: ["Phép chia lấy nguyên bỏ phần thập phân.", "$7=2\\cdot 3+1$ nên kết quả là 3."], num: 3, calc: () => Math.floor(7 / 2) },
    ],
    exam: [
      { q: "`ucln(84, 36)` theo thuật toán Euclid bằng bao nhiêu?", answer: "12", steps: ["$(84;36)\\to(36;12)\\to(12;0)$.", "Ước chung lớn nhất là 12."], num: 12, calc: () => { let a = 84; let b = 36; while (b !== 0) [a, b] = [b, a % b]; return a; } },
      { q: "Có bao nhiêu số nguyên tố nhỏ hơn 20?", answer: "8", steps: ["Các số đó là $2;\\ 3;\\ 5;\\ 7;\\ 11;\\ 13;\\ 17;\\ 19$.", "Có 8 số."], num: 8, calc: () => primes(20) },
    ],
    adv: [
      { q: "Tổng Riemann trái của $x^2$ trên $[0;1]$ với $n=4$ hình chữ nhật bằng bao nhiêu?", answer: "0,21875", steps: ["Các điểm trái là $0;\\ 0{,}25;\\ 0{,}5;\\ 0{,}75$ và độ rộng $0{,}25$.", "$0{,}25\\cdot(0+0{,}0625+0{,}25+0{,}5625)=0{,}21875$."], num: 0.21875, calc: () => [0, 0.25, 0.5, 0.75].reduce((s, x) => s + x * x * 0.25, 0) },
      { q: "Chia đôi tìm nghiệm của $x^2-2=0$ trên $[1;2]$. Sau $3$ bước, độ dài đoạn chứa nghiệm bằng bao nhiêu?", answer: "0,125", steps: ["Mỗi bước chia đôi độ dài.", "$\\dfrac{1}{2^3}=0{,}125$."], num: 0.125, calc: () => 1 / 2 ** 3 },
    ],
  },
  "du-lieu": {
    basic: [
      { q: "Dãy $3;\\ 7;\\ 7;\\ 2;\\ 9;\\ 7;\\ 5$ có mốt bằng bao nhiêu?", answer: "7", steps: ["Mốt là giá trị xuất hiện nhiều nhất.", "Số 7 xuất hiện ba lần."], num: 7, calc: () => { const a = [3, 7, 7, 2, 9, 7, 5]; return a.reduce((best, x) => (a.filter((y) => y === x).length > a.filter((y) => y === best).length ? x : best), a[0]!); } },
      { q: "Trung bình cộng của $8;\\ 10;\\ 12;\\ 14$ bằng bao nhiêu?", answer: "11", steps: ["Tổng là 44.", "$\\dfrac{44}{4}=11$."], num: 11, calc: () => (8 + 10 + 12 + 14) / 4 },
    ],
    exam: [
      { q: "Phương sai quần thể của $2;\\ 4;\\ 4;\\ 4;\\ 5;\\ 5;\\ 7;\\ 9$ bằng bao nhiêu?", answer: "4", steps: ["Trung bình là 5.", "Tổng bình phương độ lệch là 32, chia cho 8 được 4."], num: 4, calc: () => { const a = [2, 4, 4, 4, 5, 5, 7, 9]; const m = a.reduce((s, x) => s + x, 0) / a.length; return a.reduce((s, x) => s + (x - m) ** 2, 0) / a.length; } },
      { q: "Khoảng biến thiên của $12;\\ 5;\\ 9;\\ 20;\\ 7$ bằng bao nhiêu?", answer: "15", steps: ["Giá trị lớn nhất là 20 và nhỏ nhất là 5.", "$20-5=15$."], num: 15, calc: () => Math.max(12, 5, 9, 20, 7) - Math.min(12, 5, 9, 20, 7) },
    ],
    adv: [
      { q: "Bài kiểm tra điểm 8 có hệ số 2 và điểm 6 có hệ số 3. Điểm trung bình có trọng số bằng bao nhiêu?", answer: "6,8", steps: ["Tổng có trọng số là $8\\cdot 2+6\\cdot 3=34$.", "Tổng hệ số là 5, nên $\\dfrac{34}{5}=6{,}8$."], num: 6.8, calc: () => (8 * 2 + 6 * 3) / 5 },
      { q: "Trung vị của $2;\\ 3;\\ 8;\\ 10$ bằng bao nhiêu?", answer: "5,5", steps: ["Dãy có chẵn phần tử nên lấy trung bình hai số giữa.", "$\\dfrac{3+8}{2}=5{,}5$."], num: 5.5, calc: () => (3 + 8) / 2 },
    ],
  },
  chuyen: {
    basic: [
      { q: "Số $36$ có bao nhiêu ước nguyên dương?", answer: "9", steps: ["$36=2^2\\cdot 3^2$.", "Số ước là $(2+1)(2+1)=9$."], num: 9, calc: () => { let c = 0; for (let d = 1; d <= 36; d += 1) if (36 % d === 0) c += 1; return c; } },
      { q: "Có bao nhiêu số có hai chữ số chia hết cho $7$?", answer: "13", steps: ["Số nhỏ nhất là 14 và lớn nhất là 98.", "Có $\\dfrac{98-14}{7}+1=13$ số."], num: 13, calc: () => { let c = 0; for (let n = 10; n <= 99; n += 1) if (n % 7 === 0) c += 1; return c; } },
    ],
    exam: [
      { q: "Có bao nhiêu số chính phương nhỏ hơn $200$ (không kể $0$)?", answer: "14", steps: ["$14^2=196<200$ và $15^2=225>200$.", "Các số là $1^2;\\ 2^2;\\ \\dots;\\ 14^2$."], num: 14, calc: () => { let c = 0; for (let n = 1; n * n < 200; n += 1) c += 1; return c; } },
      { q: "Số dư của $2^{10}$ khi chia cho $7$ là bao nhiêu?", answer: "2", steps: ["$2^3=8$ chia cho 7 dư 1.", "$2^{10}=(2^3)^3\\cdot 2$ nên dư 2."], num: 2, calc: () => 1024 % 7 },
    ],
    adv: [
      { q: "Chọn $3$ số khác nhau từ $\\{1;2;3;4;5;6\\}$. Có bao nhiêu cách để tổng ba số là số chẵn?", answer: "10", steps: ["Tổng chẵn khi cả ba số chẵn hoặc có đúng một số chẵn.", "$1+3\\cdot 3=10$ cách."], num: 10, calc: () => { let c = 0; for (let a = 1; a <= 6; a += 1) for (let b = a + 1; b <= 6; b += 1) for (let d = b + 1; d <= 6; d += 1) if ((a + b + d) % 2 === 0) c += 1; return c; } },
      { q: "Số $25!$ có tận cùng bao nhiêu chữ số $0$?", answer: "6", steps: ["Mỗi thừa số 5 cùng một thừa số 2 tạo một chữ số 0 ở cuối.", "$\\left\\lfloor\\dfrac{25}{5}\\right\\rfloor+\\left\\lfloor\\dfrac{25}{25}\\right\\rfloor=5+1=6$."], num: 6, calc: () => Math.floor(25 / 5) + Math.floor(25 / 25) },
    ],
  },
  "vat-ly": {
    basic: [
      { q: "Ném vật thẳng đứng lên với vận tốc $20\\ \\mathrm{m/s}$, lấy $g=10\\ \\mathrm{m/s^2}$. Độ cao cực đại bằng bao nhiêu mét?", answer: "20", steps: ["Tại đỉnh $v=0$ nên $h=\\dfrac{v_0^2}{2g}$.", "$\\dfrac{400}{20}=20$."], num: 20, calc: () => 400 / 20 },
      { q: "Với vật trên, sau bao nhiêu giây vật tới độ cao cực đại?", answer: "2", steps: ["$v=v_0-gt=0$.", "$t=\\dfrac{20}{10}=2$."], num: 2, calc: () => 20 / 10 },
    ],
    exam: [
      { q: "Động cơ nâng đều vật $50\\ \\mathrm{kg}$ lên cao $10\\ \\mathrm{m}$ trong $5\\ \\mathrm{s}$, lấy $g=10\\ \\mathrm{m/s^2}$. Công suất có ích bằng bao nhiêu oát?", answer: "1000", steps: ["Công $A=mgh=50\\cdot 10\\cdot 10=5000$ J.", "$P=\\dfrac{A}{t}=\\dfrac{5000}{5}=1000$."], num: 1000, calc: () => (50 * 10 * 10) / 5 },
      { q: "Vật $2\\ \\mathrm{kg}$ chuyển động với vận tốc $3\\ \\mathrm{m/s}$. Động năng bằng bao nhiêu jun?", answer: "9", steps: ["Động năng bằng $\\dfrac12mv^2$.", "$\\dfrac12\\cdot 2\\cdot 9=9$."], num: 9, calc: () => 0.5 * 2 * 9 },
    ],
    adv: [
      { q: "Con lắc đơn dài $1\\ \\mathrm{m}$, lấy $g=\\pi^2\\ \\mathrm{m/s^2}$. Chu kỳ bằng bao nhiêu giây?", answer: "2", steps: ["$T=2\\pi\\sqrt{\\dfrac{\\ell}{g}}$.", "$2\\pi\\sqrt{\\dfrac{1}{\\pi^2}}=2$."], num: 2, calc: () => 2 * Math.PI * Math.sqrt(1 / Math.PI ** 2) },
      { q: "Tụ điện $2\\ \\mu\\mathrm{F}$ được nối vào hiệu điện thế $10\\ \\mathrm{V}$. Điện tích của tụ bằng bao nhiêu micrôculông?", answer: "20", steps: ["$Q=CU$.", "$2\\cdot 10=20$."], num: 20, calc: () => 2 * 10 },
    ],
  },
  hoa: {
    basic: [
      { q: "Ở $25\\ ^\\circ\\mathrm{C}$ và $1\\ \\mathrm{bar}$, $49{,}58\\ \\mathrm{L}$ khí là bao nhiêu mol? Lấy thể tích mol $24{,}79\\ \\mathrm{L}$.", answer: "2", steps: ["$n=\\dfrac{V}{24{,}79}$.", "$\\dfrac{49{,}58}{24{,}79}=2$."], num: 2, calc: () => 49.58 / 24.79 },
      { q: "Khối lượng của $0{,}25$ mol NaCl bằng bao nhiêu gam? Cho $\\mathrm{Na}=23$, $\\mathrm{Cl}=35{,}5$.", answer: "14,625", steps: ["$M=23+35{,}5=58{,}5$ g/mol.", "$m=0{,}25\\cdot 58{,}5=14{,}625$."], num: 14.625, calc: () => 0.25 * 58.5 },
    ],
    exam: [
      { q: "Cân bằng $\\mathrm{C_3H_8}+x\\,\\mathrm{O_2}\\to 3\\,\\mathrm{CO_2}+4\\,\\mathrm{H_2O}$. Hệ số $x$ bằng bao nhiêu?", answer: "5", steps: ["Số nguyên tử O ở vế phải là $3\\cdot 2+4\\cdot 1=10$.", "Mỗi phân tử $\\mathrm{O_2}$ có 2 nguyên tử nên $x=5$."], num: 5, calc: () => (3 * 2 + 4) / 2 },
      { q: "Hòa tan $20\\ \\mathrm{g}$ muối vào $180\\ \\mathrm{g}$ nước. Nồng độ phần trăm khối lượng bằng bao nhiêu?", answer: "10", steps: ["Khối lượng dung dịch là $20+180=200$ g.", "$\\dfrac{20}{200}\\cdot 100=10$ phần trăm."], num: 10, calc: () => (20 / 200) * 100 },
    ],
    adv: [
      { q: "pH của dung dịch HCl $0{,}01\\ \\mathrm{mol/L}$ bằng bao nhiêu?", answer: "2", steps: ["HCl là axit mạnh nên $[\\mathrm{H}^+]=0{,}01$.", "$\\mathrm{pH}=-\\log 10^{-2}=2$."], num: 2, calc: () => -Math.log10(0.01) },
      { q: "Phản ứng lí thuyết cho $50\\ \\mathrm{g}$ sản phẩm nhưng thực tế thu $40\\ \\mathrm{g}$. Hiệu suất bằng bao nhiêu phần trăm?", answer: "80", steps: ["Hiệu suất bằng khối lượng thực tế chia khối lượng lí thuyết, nhân $100$.", "$\\dfrac{40}{50}\\cdot 100=80$."], num: 80, calc: () => (40 / 50) * 100 },
    ],
  },
};
