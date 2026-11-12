import type { ScienceId } from "./catalog.ts";
import type { ScienceDrill } from "./lessons.ts";

/** Bài luyện có đáp số là một số thì kèm phép tính để bộ kiểm thử đối chiếu. */
export type CheckedDrill = ScienceDrill & { num?: number; calc?: () => number };
export type MoreLayer = { bits: string[]; code?: string; drills: CheckedDrill[] };
export type LayerKey = "basic" | "exam" | "adv";

export const scienceMore: Record<ScienceId, Record<LayerKey, MoreLayer>> = {
  python: {
    basic: {
      bits: [
        "Phép chia lấy nguyên `//` và lấy dư `%`: `17 // 5` là 3, `17 % 5` là 2.",
        "Câu lệnh `if` rẽ nhánh theo điều kiện. Biểu thức `n % 2 == 0` kiểm tra số chẵn.",
        "Danh sách giữ nhiều số: `a = [3, 1, 4]`, `len(a)` là số phần tử, `sum(a)` là tổng.",
      ],
      drills: [
        {
          q: "Đặt `s = 0`, rồi chạy `for i in range(1, 6): s = s + i*i`. Cuối cùng `s` bằng bao nhiêu?",
          answer: "55",
          steps: ["Vòng lặp chạy i từ 1 đến 5.", "Cộng $1+4+9+16+25$.", "Tổng là 55."],
          num: 55,
          calc: () => [1, 2, 3, 4, 5].reduce((s, i) => s + i * i, 0),
        },
        {
          q: "`23 % 7` bằng bao nhiêu?",
          answer: "2",
          steps: ["$23=7\\cdot 3+2$.", "Số dư là 2."],
          num: 2,
          calc: () => 23 % 7,
        },
      ],
    },
    exam: {
      bits: [
        "Kiểm tra số nguyên tố: thử chia cho các số từ 2 đến $\\sqrt n$. Không số nào chia hết thì $n$ là số nguyên tố.",
        "Ước chung lớn nhất bằng thuật toán Euclid: thay cặp $(a, b)$ bằng $(b, a \\bmod b)$ cho tới khi $b=0$.",
        "Hàm giải phương trình bậc hai nên xét đủ ba trường hợp của $\\Delta$, và cả trường hợp $a=0$.",
      ],
      code: "def ucln(a, b):\n    while b != 0:\n        a, b = b, a % b\n    return a\n# ucln(48, 18) = 6",
      drills: [
        {
          q: "Thuật toán Euclid với 48 và 18 cho kết quả bao nhiêu?",
          answer: "6",
          steps: ["Cặp (48, 18) thành (18, 12).", "Cặp (18, 12) thành (12, 6), rồi (6, 0).", "Kết quả là 6."],
          num: 6,
          calc: () => { let a = 48, b = 18; while (b !== 0) [a, b] = [b, a % b]; return a; },
        },
        {
          q: "Để kiểm tra 97 có phải số nguyên tố không, cần thử chia cho những số nguyên tố nào?",
          answer: "2, 3, 5 và 7",
          steps: ["$\\sqrt{97}<10$.", "Chỉ cần thử 2, 3, 5, 7.", "Không số nào chia hết, nên 97 là số nguyên tố."],
        },
      ],
    },
    adv: {
      bits: [
        "Phương pháp chia đôi tìm nghiệm của $f(x)=0$ trên $[a;b]$ khi $f(a)$ và $f(b)$ trái dấu: lấy điểm giữa, rồi giữ nửa đoạn mà hàm còn đổi dấu.",
        "Mỗi bước chia đôi làm đoạn chứa nghiệm ngắn đi một nửa, nên sau $k$ bước độ dài đoạn là $\\dfrac{b-a}{2^k}$.",
        "Đạo hàm số: $f'(x)\\approx\\dfrac{f(x+h)-f(x-h)}{2h}$ với $h$ nhỏ.",
      ],
      code: "def chia_doi(f, a, b, k):\n    for _ in range(k):\n        m = (a + b) / 2\n        if f(a) * f(m) <= 0:\n            b = m\n        else:\n            a = m\n    return (a + b) / 2",
      drills: [
        {
          q: "Chia đôi đoạn $[1;2]$ để tìm $\\sqrt2$. Sau 10 bước, độ dài đoạn chứa nghiệm bằng bao nhiêu?",
          answer: "$1/1024$",
          steps: ["Mỗi bước giảm một nửa.", "$(2-1)/2^{10}=1/1024$."],
        },
        {
          q: "Với $f(x)=x^2$, $x=3$ và $h=0{,}1$, công thức đạo hàm số cho kết quả nào?",
          answer: "6",
          steps: ["$f(3{,}1)=9{,}61$ và $f(2{,}9)=8{,}41$.", "$(9{,}61-8{,}41)/0{,}2=6$."],
          num: 6,
          calc: () => (3.1 * 3.1 - 2.9 * 2.9) / 0.2,
        },
      ],
    },
  },
  "du-lieu": {
    basic: {
      bits: [
        "Mốt là giá trị xuất hiện nhiều nhất. Một dãy có thể có hai mốt hoặc không có mốt.",
        "Khoảng biến thiên là hiệu giữa giá trị lớn nhất và giá trị nhỏ nhất.",
        "Tần số tương đối bằng tần số chia cho cỡ mẫu, thường viết bằng phần trăm.",
      ],
      drills: [
        {
          q: "Dãy 3, 5, 5, 7, 8, 5, 9. Mốt và khoảng biến thiên?",
          answer: "Mốt 5, khoảng biến thiên 6",
          steps: ["Số 5 xuất hiện 3 lần, nhiều nhất.", "Khoảng biến thiên $9-3=6$."],
        },
        {
          q: "Trong 40 bạn có 14 bạn đi xe đạp. Tần số tương đối bằng bao nhiêu phần trăm?",
          answer: "35",
          steps: ["$14/40=0{,}35$.", "Tức 35%."],
          num: 35,
          calc: () => (14 / 40) * 100,
        },
      ],
    },
    exam: {
      bits: [
        "Tứ phân vị chia dãy đã sắp xếp thành bốn phần có số phần tử bằng nhau. Khoảng tứ phân vị là $\\Delta_Q=Q_3-Q_1$.",
        "Giá trị ngoại lệ thường được lấy là giá trị nhỏ hơn $Q_1-1{,}5\\Delta_Q$ hoặc lớn hơn $Q_3+1{,}5\\Delta_Q$.",
        "Cộng cùng một số vào mọi giá trị thì trung bình tăng đúng số đó, còn phương sai không đổi.",
      ],
      drills: [
        {
          q: "Dãy 1, 3, 5, 7, 9, 11, 13, 15. Tìm $Q_1$, $Q_3$ và khoảng tứ phân vị.",
          answer: "$Q_1=4$, $Q_3=12$, khoảng tứ phân vị 8",
          steps: ["Nửa dưới 1, 3, 5, 7 có trung vị 4.", "Nửa trên 9, 11, 13, 15 có trung vị 12.", "$12-4=8$."],
        },
        {
          q: "Độ lệch chuẩn của dãy 2, 4, 4, 4, 5, 5, 7, 9, tính với mẫu số $n$.",
          answer: "2",
          steps: ["Trung bình là 5.", "Tổng bình phương độ lệch là 32, phương sai $32/8=4$.", "Độ lệch chuẩn $\\sqrt4=2$."],
          num: 2,
          calc: () => { const d = [2, 4, 4, 4, 5, 5, 7, 9]; const m = d.reduce((s, x) => s + x, 0) / d.length; return Math.sqrt(d.reduce((s, x) => s + (x - m) ** 2, 0) / d.length); },
        },
      ],
    },
    adv: {
      bits: [
        "Hệ số tương quan $r$ nằm trong $[-1;1]$: gần 1 là cùng tăng, gần $-1$ là một tăng một giảm, gần 0 là không có quan hệ tuyến tính rõ.",
        "Tương quan không phải là nhân quả: hai đại lượng cùng tăng có thể do một nguyên nhân thứ ba.",
        "Trung bình có trọng số: $\\bar x=\\dfrac{\\sum w_ix_i}{\\sum w_i}$, dùng khi các giá trị nặng nhẹ khác nhau.",
      ],
      drills: [
        {
          q: "Điểm thường xuyên 8 (hệ số 1), giữa kỳ 7 (hệ số 2), cuối kỳ 9 (hệ số 3). Điểm trung bình môn bằng bao nhiêu?",
          answer: "$49/6\\approx 8{,}2$",
          steps: ["Tổng có trọng số: $8+14+27=49$.", "Tổng hệ số là 6.", "$49/6\\approx 8{,}2$."],
        },
        {
          q: "Lớp A có 30 bạn, điểm trung bình 7. Lớp B có 20 bạn, điểm trung bình 8. Điểm trung bình chung của hai lớp?",
          answer: "7,4",
          steps: ["Tổng điểm: $30\\cdot 7+20\\cdot 8=370$.", "Chia cho 50 bạn được 7,4.", "Không lấy trung bình cộng của 7 và 8, vì hai lớp khác sĩ số."],
          num: 7.4,
          calc: () => (30 * 7 + 20 * 8) / 50,
        },
      ],
    },
  },
  chuyen: {
    basic: {
      bits: [
        "Bất đẳng thức AM-GM cho hai số không âm: $a+b\\ge 2\\sqrt{ab}$, dấu bằng khi $a=b$.",
        "Muốn dùng được, tích hai số phải là hằng số. Nếu chưa, tách hoặc thêm bớt để tạo tích không đổi.",
        "Luôn kiểm tra dấu bằng có xảy ra trong miền cho phép hay không.",
      ],
      drills: [
        {
          q: "GTNN của $x+\\dfrac{9}{x-1}$ với $x>1$.",
          answer: "7",
          steps: ["Viết thành $(x-1)+\\dfrac{9}{x-1}+1$.", "Hai số hạng đầu có tổng không nhỏ hơn $2\\sqrt9=6$.", "GTNN là 7, đạt khi $x-1=3$, tức $x=4$."],
          num: 7,
          calc: () => 4 + 9 / (4 - 1),
        },
        {
          q: "Cho $a,b>0$ và $a+b=10$. GTLN của $ab$.",
          answer: "25",
          steps: ["$ab\\le\\left(\\dfrac{a+b}{2}\\right)^2$.", "$ab\\le 25$.", "Dấu bằng khi $a=b=5$."],
          num: 25,
          calc: () => 5 * 5,
        },
      ],
    },
    exam: {
      bits: [
        "Đồng dư: $a\\equiv b\\pmod m$ nghĩa là $a-b$ chia hết cho $m$. Cộng, trừ, nhân hai đồng dư thức cùng môđun vẫn đúng.",
        "Số chính phương chia 4 chỉ dư 0 hoặc 1, chia 3 cũng chỉ dư 0 hoặc 1.",
        "Tìm số dư của lũy thừa: tìm chu kỳ của các số dư, rồi lấy số mũ chia cho chu kỳ.",
      ],
      drills: [
        {
          q: "Số dư của $2^{100}$ khi chia cho 7.",
          answer: "2",
          steps: ["$2^3=8\\equiv 1\\pmod 7$.", "$100=3\\cdot 33+1$.", "$2^{100}\\equiv 2\\pmod 7$."],
          num: 2,
          calc: () => { let r = 1; for (let i = 0; i < 100; i += 1) r = (r * 2) % 7; return r; },
        },
        {
          q: "Số dư của $n^2+2$ khi chia cho 4 có thể là những số nào, với $n$ nguyên?",
          answer: "2 hoặc 3",
          steps: ["$n^2$ chia 4 dư 0 hoặc 1.", "Nên $n^2+2$ chia 4 dư 2 hoặc 3.", "Vì vậy $n^2+2$ không bao giờ chia hết cho 4."],
        },
      ],
    },
    adv: {
      bits: [
        "Phương trình nghiệm nguyên thường giải bằng cách đưa về tích: $xy+ax+by=c$ thành $(x+b)(y+a)=c+ab$.",
        "Nguyên lí Dirichlet: nhốt $n+1$ con thỏ vào $n$ chuồng thì có chuồng chứa ít nhất hai con.",
        "Sau khi tìm được các ứng viên, thử lại từng nghiệm vào đề.",
      ],
      drills: [
        {
          q: "Có bao nhiêu cặp số nguyên $(x;y)$ thỏa $xy-2x-3y=1$?",
          answer: "4",
          steps: ["Thêm 6 vào hai vế: $(x-3)(y-2)=7$.", "Số 7 có bốn ước nguyên: $\\pm1$ và $\\pm7$.", "Mỗi ước cho một cặp, nên có 4 cặp."],
          num: 4,
          calc: () => { let c = 0; for (let x = -50; x <= 50; x += 1) for (let y = -50; y <= 50; y += 1) if (x * y - 2 * x - 3 * y === 1) c += 1; return c; },
        },
        {
          q: "Cần ít nhất bao nhiêu người để chắc chắn có ba người sinh cùng tháng?",
          answer: "25",
          steps: ["Có 12 tháng, coi là 12 chuồng.", "Với 24 người, có thể mỗi tháng đúng 2 người.", "Người thứ 25 buộc một tháng có 3 người."],
          num: 25,
          calc: () => 2 * 12 + 1,
        },
      ],
    },
  },
  "vat-ly": {
    basic: {
      bits: [
        "Chuyển động thẳng đều: quãng đường $s=vt$, với vận tốc $v$ không đổi.",
        "Đổi đơn vị: $1\\ \\mathrm{m/s}=3{,}6\\ \\mathrm{km/h}$, vì một giờ có 3600 giây và một kilômét có 1000 mét.",
        "Chuyển động thẳng biến đổi đều: $v=v_0+at$ và $s=v_0t+\\dfrac12at^2$. Rơi tự do là trường hợp $v_0=0$ và $a=g\\approx 9{,}8\\ \\mathrm{m/s^2}$.",
      ],
      drills: [
        {
          q: "Một xe chạy đều 54 km/h. Vận tốc đó bằng bao nhiêu m/s?",
          answer: "15",
          steps: ["Chia số đo km/h cho 3,6.", "$54/3{,}6=15$."],
          num: 15,
          calc: () => 54 / 3.6,
        },
        {
          q: "Xe xuất phát từ trạng thái nghỉ, tăng tốc đều $2\\ \\mathrm{m/s^2}$ trong 10 giây. Quãng đường đi được bằng bao nhiêu mét?",
          answer: "100",
          steps: ["Vì $v_0=0$ nên $s=\\dfrac12at^2$.", "$s=\\dfrac12\\cdot 2\\cdot 10^2=100$."],
          num: 100,
          calc: () => 0.5 * 2 * 10 ** 2,
        },
      ],
    },
    exam: {
      bits: [
        "Định luật II Newton: $F=ma$, lực tính bằng niutơn, khối lượng tính bằng kilôgam.",
        "Động năng $W_{\\text{đ}}=\\dfrac12mv^2$, thế năng trọng trường $W_{\\text{t}}=mgh$. Bỏ qua ma sát thì tổng hai đại lượng này không đổi.",
        "Vật rơi không vận tốc đầu từ độ cao $h$ chạm đất với $v=\\sqrt{2gh}$.",
      ],
      drills: [
        {
          q: "Lực 20 N tác dụng lên vật 4 kg trên mặt phẳng không ma sát. Gia tốc bằng bao nhiêu $\\mathrm{m/s^2}$?",
          answer: "5",
          steps: ["$a=F/m$.", "$20/4=5$."],
          num: 5,
          calc: () => 20 / 4,
        },
        {
          q: "Vật rơi tự do từ độ cao 20 m, lấy $g=10\\ \\mathrm{m/s^2}$. Vận tốc lúc chạm đất bằng bao nhiêu m/s?",
          answer: "20",
          steps: ["$v=\\sqrt{2gh}$.", "$\\sqrt{2\\cdot 10\\cdot 20}=\\sqrt{400}=20$."],
          num: 20,
          calc: () => Math.sqrt(2 * 10 * 20),
        },
      ],
    },
    adv: {
      bits: [
        "Mắc nối tiếp: $R=R_1+R_2$. Mắc song song: $\\dfrac1R=\\dfrac1{R_1}+\\dfrac1{R_2}$.",
        "Điện năng tiêu thụ $A=Pt$. Một kilôoát giờ bằng $3{,}6\\cdot 10^6$ jun.",
        "Dao động điều hòa $x=A\\cos(\\omega t+\\varphi)$ có chu kỳ $T=\\dfrac{2\\pi}{\\omega}$ và vận tốc $v=x'=-A\\omega\\sin(\\omega t+\\varphi)$.",
      ],
      drills: [
        {
          q: "Hai điện trở 6 Ω và 3 Ω mắc song song. Điện trở tương đương bằng bao nhiêu ôm?",
          answer: "2",
          steps: ["$1/R=1/6+1/3=1/2$.", "$R=2$."],
          num: 2,
          calc: () => 1 / (1 / 6 + 1 / 3),
        },
        {
          q: "Bóng đèn 60 W thắp 5 giờ mỗi ngày. Trong 30 ngày đèn tiêu thụ bao nhiêu kWh?",
          answer: "9",
          steps: ["Đổi 60 W thành 0,06 kW.", "$A=Pt=0{,}06\\cdot 5\\cdot 30=9$."],
          num: 9,
          calc: () => 0.06 * 5 * 30,
        },
        {
          q: "Vật dao động theo $x=4\\cos(2\\pi t)$, với $x$ tính bằng cm và $t$ tính bằng giây. Chu kỳ bằng bao nhiêu giây?",
          answer: "1",
          steps: ["Tần số góc $\\omega=2\\pi$.", "$T=2\\pi/\\omega=1$."],
          num: 1,
          calc: () => (2 * Math.PI) / (2 * Math.PI),
        },
      ],
    },
  },
  hoa: {
    basic: {
      bits: [
        "Số Avogadro: một mol chứa khoảng $6{,}022\\cdot 10^{23}$ hạt.",
        "Ở điều kiện chuẩn (25 °C, 1 bar), một mol khí chiếm khoảng 24,79 lít.",
        "Khối lượng mol của hợp chất bằng tổng khối lượng mol các nguyên tử: $\\mathrm{CO_2}$ có $M=12+2\\cdot 16=44\\ \\mathrm{g/mol}$.",
      ],
      drills: [
        {
          q: "Khối lượng mol của $\\mathrm{H_2SO_4}$ bằng bao nhiêu g/mol? Cho H = 1, S = 32, O = 16.",
          answer: "98",
          steps: ["$2\\cdot 1+32+4\\cdot 16$.", "$2+32+64=98$."],
          num: 98,
          calc: () => 2 * 1 + 32 + 4 * 16,
        },
        {
          q: "22 g $\\mathrm{CO_2}$ là bao nhiêu mol?",
          answer: "0,5",
          steps: ["$M=44$ g/mol.", "$n=22/44=0{,}5$."],
          num: 0.5,
          calc: () => 22 / 44,
        },
      ],
    },
    exam: {
      bits: [
        "Cân bằng phương trình: số nguyên tử của mỗi nguyên tố ở hai vế phải bằng nhau. Ví dụ $2\\mathrm{H_2}+\\mathrm{O_2}\\to 2\\mathrm{H_2O}$.",
        "Tính theo phương trình: đổi ra mol, dùng tỉ lệ các hệ số, rồi đổi lại ra gam hoặc lít.",
        "Nồng độ mol $C_M=\\dfrac{n}{V}$, với $V$ tính bằng lít.",
      ],
      drills: [
        {
          q: "Đốt cháy hoàn toàn 4 g $\\mathrm{H_2}$ thu được bao nhiêu gam nước? Cho H = 1, O = 16.",
          answer: "36",
          steps: ["$n_{\\mathrm{H_2}}=4/2=2$ mol.", "Tỉ lệ hệ số 2 : 2 nên được 2 mol nước.", "$m=2\\cdot 18=36$ g."],
          num: 36,
          calc: () => (4 / 2) * 18,
        },
        {
          q: "Hòa tan 0,2 mol NaOH thành 500 mL dung dịch. Nồng độ mol bằng bao nhiêu mol/L?",
          answer: "0,4",
          steps: ["Đổi 500 mL thành 0,5 L.", "$C_M=0{,}2/0{,}5=0{,}4$."],
          num: 0.4,
          calc: () => 0.2 / 0.5,
        },
      ],
    },
    adv: {
      bits: [
        "Với dung dịch bazơ mạnh: $\\mathrm{pOH}=-\\log[\\mathrm{OH}^-]$, và ở 25 °C thì $\\mathrm{pH}+\\mathrm{pOH}=14$.",
        "Pha loãng axit mạnh 10 lần thì pH tăng 1 đơn vị, chừng nào dung dịch chưa quá loãng.",
        "Trung hòa: số mol $\\mathrm{H}^+$ bằng số mol $\\mathrm{OH}^-$, tức $C_1V_1=C_2V_2$ với axit và bazơ một nấc.",
      ],
      drills: [
        {
          q: "pH của dung dịch NaOH $0{,}001\\ \\mathrm{mol/L}$ ở 25 °C.",
          answer: "11",
          steps: ["$\\mathrm{pOH}=-\\log 10^{-3}=3$.", "$\\mathrm{pH}=14-3=11$."],
          num: 11,
          calc: () => 14 + Math.log10(0.001),
        },
        {
          q: "Cần bao nhiêu mL dung dịch NaOH 0,1 mol/L để trung hòa 20 mL dung dịch HCl 0,2 mol/L?",
          answer: "40",
          steps: ["Số mol $\\mathrm{H}^+$: $0{,}2\\cdot 0{,}02=0{,}004$.", "$V=0{,}004/0{,}1=0{,}04$ L, tức 40 mL."],
          num: 40,
          calc: () => ((0.2 * 20) / 0.1),
        },
      ],
    },
  },
};
