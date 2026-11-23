/** Ví dụ có lời giải từng bước và lỗi hay gặp cho mỗi mức của mỗi mảng Khoa học. Đáp số được tính lại trong scripts/gap.test.ts. */
import type { ScienceId } from "./catalog.ts";
import type { LayerKey } from "./more.ts";

export type WorkedStep = { claim: string; why: string };
export type ScienceWorked = { q: string; steps: WorkedStep[]; answer: string; pitfall: string; num: number; calc: () => number };

const R = String.raw;
const s = (claim: string, why: string): WorkedStep => ({ claim, why });
const digitsOne = (n: number): number => n.toString(2).split("").filter((c) => c === "1").length;

export const scienceWorked: Record<ScienceId, Record<LayerKey, ScienceWorked>> = {
  python: {
    basic: {
      q: R`Tính tổng các số lẻ nhỏ hơn $10$ bằng vòng lặp for i in range(1, 10, 2).`,
      steps: [
        s(R`range(1, 10, 2) cho các số $1;\ 3;\ 5;\ 7;\ 9$.`, R`Tham số thứ ba là bước nhảy, nên mỗi lần i tăng thêm $2$, và số cuối $10$ không được lấy.`),
        s(R`Tổng là $1+3+5+7+9=25$.`, R`Đây là tổng năm số lẻ đầu tiên, và bằng $5^2=25$.`),
      ],
      answer: "25",
      pitfall: R`Tưởng range(1, 10) chạy tới cả số $10$. Số cuối của range luôn bị bỏ.`,
      num: 25,
      calc: () => [1, 3, 5, 7, 9].reduce((a, b) => a + b, 0),
    },
    exam: {
      q: R`Dùng thuật toán Euclid tính ước chung lớn nhất của $48$ và $18$.`,
      steps: [
        s(R`Cặp $(48;\ 18)$ chuyển thành $(18;\ 12)$.`, R`Thay cặp bằng số bé và số dư của phép chia: $48=2\cdot18+12$.`),
        s(R`Tiếp tục $(18;\ 12)\to(12;\ 6)\to(6;\ 0)$, nên kết quả là $6$.`, R`Lặp cho tới khi số dư bằng $0$; số chia cuối cùng là ước chung lớn nhất.`),
      ],
      answer: "6",
      pitfall: R`Dừng khi số dư còn khác $0$. Phải lặp tiếp cho tới khi $b=0$.`,
      num: 6,
      calc: () => { let a = 48; let b = 18; while (b !== 0) [a, b] = [b, a % b]; return a; },
    },
    adv: {
      q: R`Chia đôi tìm nghiệm của $x^2-2=0$ trên $[1;\ 2]$. Sau hai bước, đoạn chứa nghiệm dài bao nhiêu?`,
      steps: [
        s(R`Bước một: trung điểm $1{,}5$ có $1{,}5^2-2=0{,}25>0$, nên nghiệm nằm trong $[1;\ 1{,}5]$.`, R`Hàm đổi dấu giữa hai đầu của đoạn mới nên vẫn có nghiệm trong đoạn đó.`),
        s(R`Bước hai: trung điểm $1{,}25$ có $1{,}25^2-2=-0{,}4375<0$, nên nghiệm nằm trong $[1{,}25;\ 1{,}5]$.`, R`Đoạn mới dài $0{,}25$, bằng $\frac{1}{4}$ độ dài ban đầu.`),
      ],
      answer: "0,25",
      pitfall: R`Giữ cả hai nửa của đoạn, trong khi hàm chỉ đổi dấu ở một nửa.`,
      num: 0.25,
      calc: () => 1 / 2 ** 2,
    },
  },
  "du-lieu": {
    basic: {
      q: R`Dãy số $4;\ 8;\ 6;\ 5;\ 7$. Tính trung bình cộng.`,
      steps: [
        s(R`Tổng là $4+8+6+5+7=30$.`, R`Trung bình cộng bắt đầu bằng tổng mọi số của dãy.`),
        s(R`Có $5$ số nên trung bình là $\frac{30}{5}=6$.`, R`Chia tổng cho số phần tử của dãy.`),
      ],
      answer: "6",
      pitfall: R`Chia tổng cho số lớn nhất thay vì cho số phần tử.`,
      num: 6,
      calc: () => (4 + 8 + 6 + 5 + 7) / 5,
    },
    exam: {
      q: R`Dãy số $2;\ 4;\ 6;\ 8$. Tính phương sai quần thể.`,
      steps: [
        s(R`Trung bình là $\bar x=5$.`, R`Tổng bằng $20$ và chia cho $4$ số.`),
        s(R`Tổng bình phương độ lệch là $9+1+1+9=20$.`, R`Độ lệch của bốn số so với trung bình là $-3$, $-1$, $1$, $3$.`),
        s(R`Phương sai là $\frac{20}{4}=5$.`, R`Chia cho số phần tử $n=4$ với dữ liệu quần thể.`),
      ],
      answer: "5",
      pitfall: R`Quên bình phương độ lệch, nên tổng các độ lệch luôn bằng $0$.`,
      num: 5,
      calc: () => { const a = [2, 4, 6, 8]; const m = a.reduce((x, y) => x + y, 0) / a.length; return a.reduce((x, y) => x + (y - m) ** 2, 0) / a.length; },
    },
    adv: {
      q: R`Mẫu có $n=5$ giá trị và tổng bình phương độ lệch bằng $20$. Phương sai mẫu hiệu chỉnh bằng bao nhiêu?`,
      steps: [
        s(R`Phương sai mẫu hiệu chỉnh chia cho $n-1$.`, R`Mẫu nhỏ thường đánh giá thấp độ phân tán của quần thể, nên chia cho $n-1$ để bù lại.`),
        s(R`Ta có $s^2=\frac{20}{5-1}=5$.`, R`Thay $n=5$ vào công thức.`),
      ],
      answer: "5",
      pitfall: R`Dùng $n$ thay cho $n-1$ khi chỉ có một mẫu.`,
      num: 5,
      calc: () => 20 / (5 - 1),
    },
  },
  chuyen: {
    basic: {
      q: R`Có bao nhiêu số nguyên dương nhỏ hơn $50$ chia hết cho $6$?`,
      steps: [
        s(R`Các số đó là $6;\ 12;\ \dots;\ 48$.`, R`Bội của $6$ nhỏ hơn $50$ lớn nhất là $48=6\cdot8$.`),
        s(R`Có $8$ số như vậy.`, R`Số thứ $k$ là $6k$ với $k=1;\ 2;\ \dots;\ 8$.`),
      ],
      answer: "8",
      pitfall: R`Đếm cả số $0$, hoặc lấy $\frac{50}{6}$ rồi làm tròn lên.`,
      num: 8,
      calc: () => { let c = 0; for (let n = 1; n < 50; n += 1) if (n % 6 === 0) c += 1; return c; },
    },
    exam: {
      q: R`Tìm số dư của $3^{20}$ khi chia cho $4$.`,
      steps: [
        s(R`Số $3^2=9$ chia cho $4$ dư $1$.`, R`Ta có $9=2\cdot4+1$.`),
        s(R`Số $3^{20}=(3^2)^{10}$ nên dư $1^{10}=1$.`, R`Lũy thừa của một số dư $1$ vẫn dư $1$.`),
      ],
      answer: "1",
      pitfall: R`Tính $3^{20}$ ra số rất lớn rồi mới chia, thay vì dùng số dư của $3^2$.`,
      num: 1,
      calc: () => { let r = 1; for (let i = 0; i < 20; i += 1) r = (r * 3) % 4; return r; },
    },
    adv: {
      q: R`Có bao nhiêu cặp số nguyên dương $(x;\ y)$ thỏa $x+y=10$ và $x>y$?`,
      steps: [
        s(R`Số $y$ nhận các giá trị $1;\ 2;\ 3;\ 4$.`, R`Từ $x=10-y>y$ suy ra $y<5$.`),
        s(R`Có $4$ cặp.`, R`Mỗi giá trị của $y$ cho đúng một giá trị của $x$.`),
      ],
      answer: "4",
      pitfall: R`Tính cả $y=5$. Khi đó $x=y$ nên không thỏa $x>y$.`,
      num: 4,
      calc: () => { let c = 0; for (let y = 1; y < 10; y += 1) if (10 - y > y) c += 1; return c; },
    },
  },
  "vat-ly": {
    basic: {
      q: R`Xe chạy đều $72\ \mathrm{km/h}$ trong $30$ giây. Quãng đường đi được bằng bao nhiêu mét?`,
      steps: [
        s(R`Đổi $72\ \mathrm{km/h}=20\ \mathrm{m/s}$.`, R`Chia số đo km/h cho $3{,}6$ để được m/s.`),
        s(R`Ta có $s=vt=20\cdot30=600$ mét.`, R`Chuyển động đều có $s=vt$ khi các đơn vị cùng hệ.`),
      ],
      answer: "600",
      pitfall: R`Nhân $72$ với $30$ mà không đổi đơn vị.`,
      num: 600,
      calc: () => (72 / 3.6) * 30,
    },
    exam: {
      q: R`Vật $2\ \mathrm{kg}$ chịu lực kéo $10\ \mathrm{N}$ trên mặt phẳng không ma sát trong $3$ giây, bắt đầu từ nghỉ. Vận tốc cuối bằng bao nhiêu m/s?`,
      steps: [
        s(R`Gia tốc là $a=\frac{F}{m}=5\ \mathrm{m/s^2}$.`, R`Theo định luật II Newton, gia tốc bằng lực chia khối lượng.`),
        s(R`Vận tốc là $v=at=5\cdot3=15$ m/s.`, R`Vật xuất phát từ nghỉ nên vận tốc đầu $v_0=0$.`),
      ],
      answer: "15",
      pitfall: R`Dùng $a=F\cdot m$ thay cho $a=\frac{F}{m}$.`,
      num: 15,
      calc: () => (10 / 2) * 3,
    },
    adv: {
      q: R`Con lắc lò xo có $k=100\ \mathrm{N/m}$ và $m=1\ \mathrm{kg}$. Tần số góc bằng bao nhiêu rad/s?`,
      steps: [
        s(R`Công thức là $\omega=\sqrt{\frac{k}{m}}$.`, R`Lực đàn hồi $-kx$ cho gia tốc $a=-\frac{k}{m}x$, đúng dạng dao động điều hòa.`),
        s(R`Ta có $\omega=\sqrt{100}=10$ rad/s.`, R`Thay $k=100$ và $m=1$ vào công thức.`),
      ],
      answer: "10",
      pitfall: R`Nhầm tần số góc $\omega$ với tần số $f$; hai đại lượng liên hệ qua $f=\frac{\omega}{2\pi}$.`,
      num: 10,
      calc: () => Math.sqrt(100 / 1),
    },
  },
  hoa: {
    basic: {
      q: R`Tính số mol của $9\ \mathrm{g}$ nước, biết $M=18\ \mathrm{g/mol}$.`,
      steps: [
        s(R`Công thức là $n=\frac{m}{M}$.`, R`Số mol bằng khối lượng chia khối lượng mol.`),
        s(R`Ta có $n=\frac{9}{18}=0{,}5$ mol.`, R`Thay $m=9$ và $M=18$ vào công thức.`),
      ],
      answer: "0,5",
      pitfall: R`Nhân khối lượng với $M$ thay vì chia.`,
      num: 0.5,
      calc: () => 9 / 18,
    },
    exam: {
      q: R`Hòa tan $4\ \mathrm{g}$ NaOH ($M=40$) thành $500\ \mathrm{mL}$ dung dịch. Nồng độ mol bằng bao nhiêu mol/L?`,
      steps: [
        s(R`Số mol là $n=\frac{4}{40}=0{,}1$.`, R`Dùng $n=\frac{m}{M}$ với $M=40$.`),
        s(R`Nồng độ là $C_M=\frac{0{,}1}{0{,}5}=0{,}2$ mol/L.`, R`Đổi $500\ \mathrm{mL}$ thành $0{,}5\ \mathrm{L}$ trước khi chia.`),
      ],
      answer: "0,2",
      pitfall: R`Dùng $500$ thay cho $0{,}5$ lít khi tính nồng độ.`,
      num: 0.2,
      calc: () => 0.1 / 0.5,
    },
    adv: {
      q: R`Tính pH của dung dịch $\mathrm{Ba(OH)_2}$ nồng độ $0{,}005\ \mathrm{mol/L}$ ở $25\ ^\circ\mathrm{C}$.`,
      steps: [
        s(R`Nồng độ $[\mathrm{OH}^-]=2\cdot0{,}005=0{,}01$.`, R`Mỗi mol $\mathrm{Ba(OH)_2}$ cho hai mol ion $\mathrm{OH}^-$.`),
        s(R`Suy ra $\mathrm{pOH}=2$ và $\mathrm{pH}=14-2=12$.`, R`Ở $25\ ^\circ\mathrm{C}$ ta có $\mathrm{pH}+\mathrm{pOH}=14$.`),
      ],
      answer: "12",
      pitfall: R`Quên nhân $2$ vì bazơ này có hai nhóm $\mathrm{OH}$.`,
      num: 12,
      calc: () => 14 + Math.log10(0.005 * 2),
    },
  },
  sinh: {
    basic: {
      q: R`Lai $Aa\cdot Aa$, đời con có $200$ cây. Kì vọng có bao nhiêu cây kiểu hình lặn?`,
      steps: [
        s(R`Xác suất kiểu hình lặn là $\frac{1}{4}$.`, R`Cần giao tử $a$ từ cả bố và mẹ: $\frac{1}{2}\cdot\frac{1}{2}$.`),
        s(R`Số cây lặn kì vọng là $200\cdot\frac{1}{4}=50$.`, R`Số kì vọng bằng tổng số cây nhân với xác suất.`),
      ],
      answer: "50",
      pitfall: R`Lấy $\frac{1}{2}$ làm xác suất của kiểu hình lặn.`,
      num: 50,
      calc: () => 200 * 0.25,
    },
    exam: {
      q: R`Quần thể cân bằng có tần số kiểu gen $aa$ là $0{,}09$. Tần số alen $A$ bằng bao nhiêu?`,
      steps: [
        s(R`Tần số alen lặn là $q=\sqrt{0{,}09}=0{,}3$.`, R`Kiểu gen $aa$ có tần số $q^2$.`),
        s(R`Tần số alen $A$ là $p=1-q=0{,}7$.`, R`Hai alen có tần số cộng lại bằng $1$.`),
      ],
      answer: "0,7",
      pitfall: R`Lấy $0{,}09$ làm tần số alen $a$ thay vì lấy căn bậc hai của nó.`,
      num: 0.7,
      calc: () => 1 - Math.sqrt(0.09),
    },
    adv: {
      q: R`Quần thể $1000$ cá thể tăng $5\%$ mỗi năm. Sau $2$ năm có bao nhiêu cá thể?`,
      steps: [
        s(R`Mỗi năm số lượng nhân với $1{,}05$.`, R`Tăng $5\%$ nghĩa là còn $105\%$ so với năm trước.`),
        s(R`Sau $2$ năm có $1000\cdot1{,}05^2=1102{,}5$.`, R`Nhân hai lần liên tiếp, và có thể làm tròn thành khoảng $1103$ cá thể.`),
      ],
      answer: "1102,5",
      pitfall: R`Cộng $5\%$ hai lần thành $10\%$ rồi tính ra $1100$.`,
      num: 1102.5,
      calc: () => 1000 * 1.05 ** 2,
    },
  },
  "thuat-toan": {
    basic: {
      q: R`Đổi số $10$ sang nhị phân và cho biết có bao nhiêu chữ số $1$.`,
      steps: [
        s(R`Ta có $10=1\cdot2^3+0\cdot2^2+1\cdot2^1+0\cdot2^0$.`, R`Tách $10$ thành tổng các lũy thừa của $2$.`),
        s(R`Nhị phân là $1010$, nên có $2$ chữ số $1$.`, R`Đếm các chữ số $1$ trong dãy $1010$.`),
      ],
      answer: "2",
      pitfall: R`Đọc các số dư từ trên xuống thay vì từ dưới lên khi chia liên tiếp cho $2$.`,
      num: 2,
      calc: () => digitsOne(10),
    },
    exam: {
      q: R`Tìm kiếm nhị phân trên dãy $16$ số đã sắp xếp cần nhiều nhất bao nhiêu lần so sánh?`,
      steps: [
        s(R`Ta có $\log_2 16=4$.`, R`Mỗi lần so sánh bỏ đi một nửa, nên sau $4$ lần chia đôi dãy chỉ còn một phần tử.`),
        s(R`Số lần so sánh nhiều nhất là $4+1=5$.`, R`Cộng thêm một lần so sánh cuối cùng với phần tử còn lại.`),
      ],
      answer: "5",
      pitfall: R`Dùng cách tìm tuần tự, cần tới $16$ lần so sánh.`,
      num: 5,
      calc: () => Math.log2(16) + 1,
    },
    adv: {
      q: R`Có bao nhiêu cách leo $5$ bậc thang nếu mỗi lần bước $1$ hoặc $2$ bậc?`,
      steps: [
        s(R`Các giá trị đầu là $f(1)=1$, $f(2)=2$, $f(3)=3$ và $f(4)=5$.`, R`Theo quy tắc $f(n)=f(n-1)+f(n-2)$, vì bước cuối là $1$ bậc hoặc $2$ bậc.`),
        s(R`Suy ra $f(5)=f(4)+f(3)=8$.`, R`Cộng hai giá trị liền trước.`),
      ],
      answer: "8",
      pitfall: R`Đặt sai hai giá trị đầu nên cả dãy bị lệch.`,
      num: 8,
      calc: () => { const f = [1, 1]; for (let i = 2; i <= 5; i += 1) f.push(f[i - 1]! + f[i - 2]!); return f[5]!; },
    },
  },
  "song-quang": {
    basic: {
      q: R`Sóng có chu kỳ $0{,}02\ \mathrm{s}$ và bước sóng $4\ \mathrm{m}$. Vận tốc truyền bằng bao nhiêu m/s?`,
      steps: [
        s(R`Tần số là $f=\frac{1}{T}=50\ \mathrm{Hz}$.`, R`Tần số là nghịch đảo của chu kỳ.`),
        s(R`Vận tốc là $v=\lambda f=4\cdot50=200$ m/s.`, R`Vận tốc truyền bằng bước sóng nhân tần số.`),
      ],
      answer: "200",
      pitfall: R`Nhầm chu kỳ $T$ với tần số $f$.`,
      num: 200,
      calc: () => 4 / 0.02,
    },
    exam: {
      q: R`Vật cao $4\ \mathrm{cm}$ đặt cách thấu kính hội tụ tiêu cự $6\ \mathrm{cm}$ một đoạn $12\ \mathrm{cm}$. Ảnh cao bao nhiêu cm?`,
      steps: [
        s(R`Từ $\frac{1}{d'}=\frac{1}{6}-\frac{1}{12}=\frac{1}{12}$ suy ra $d'=12$ cm.`, R`Dùng công thức thấu kính $\frac{1}{f}=\frac{1}{d}+\frac{1}{d'}$.`),
        s(R`Ta có $|k|=\frac{12}{12}=1$ nên ảnh cao $4$ cm.`, R`Độ phóng đại bằng khoảng cách ảnh chia khoảng cách vật.`),
      ],
      answer: "4",
      pitfall: R`Lấy khoảng cách ảnh bằng tiêu cự mà không tính từ công thức.`,
      num: 4,
      calc: () => (4 * (1 / (1 / 6 - 1 / 12))) / 12,
    },
    adv: {
      q: R`Hai khe cách nhau $0{,}5\ \mathrm{mm}$, màn cách hai khe $1\ \mathrm{m}$, ánh sáng có bước sóng $0{,}6\ \mu\mathrm{m}$. Khoảng vân bằng bao nhiêu mm?`,
      steps: [
        s(R`Công thức là $i=\frac{\lambda D}{a}$.`, R`Khoảng vân tỉ lệ thuận với bước sóng và khoảng cách tới màn, và tỉ lệ nghịch với khoảng cách giữa hai khe.`),
        s(R`Ta có $i=\frac{0{,}6\cdot10^{-6}\cdot1}{0{,}5\cdot10^{-3}}=1{,}2\cdot10^{-3}$ m, tức $1{,}2$ mm.`, R`Đổi mọi đại lượng về mét trước khi tính.`),
      ],
      answer: "1,2",
      pitfall: R`Quên đổi milimét và micrômét về mét nên sai các bậc của mười.`,
      num: 1.2,
      calc: () => ((0.6e-6 * 1) / 0.5e-3) * 1000,
    },
  },
  "nhiet-khi": {
    basic: {
      q: R`Nhiệt lượng $8400\ \mathrm{J}$ làm nóng $0{,}5\ \mathrm{kg}$ nước thêm bao nhiêu độ? Lấy $c=4200\ \mathrm{J/(kg\cdot K)}$.`,
      steps: [
        s(R`Từ $Q=mc\Delta t$ suy ra $\Delta t=\frac{Q}{mc}$.`, R`Chia nhiệt lượng cho tích của khối lượng và nhiệt dung riêng.`),
        s(R`Ta có $\Delta t=\frac{8400}{0{,}5\cdot4200}=4$ độ.`, R`Thay số, với $0{,}5\cdot4200=2100$.`),
      ],
      answer: "4",
      pitfall: R`Quên nhân với khối lượng nên ra $2$ độ.`,
      num: 4,
      calc: () => 8400 / (0.5 * 4200),
    },
    exam: {
      q: R`Khí $3\ \mathrm{L}$ ở $2\ \mathrm{atm}$ giãn đẳng nhiệt tới $6\ \mathrm{L}$. Áp suất mới bằng bao nhiêu atm?`,
      steps: [
        s(R`Quá trình đẳng nhiệt có $p_1V_1=p_2V_2$.`, R`Định luật Bôi-lơ–Ma-ri-ốt: tích áp suất và thể tích không đổi.`),
        s(R`Suy ra $p_2=\frac{2\cdot3}{6}=1$ atm.`, R`Thể tích tăng gấp đôi thì áp suất giảm một nửa.`),
      ],
      answer: "1",
      pitfall: R`Dùng quan hệ tỉ lệ thuận giữa áp suất và thể tích thay vì tỉ lệ nghịch.`,
      num: 1,
      calc: () => (2 * 3) / 6,
    },
    adv: {
      q: R`Động cơ nhiệt nhận $1000\ \mathrm{J}$ từ nguồn nóng và sinh công $300\ \mathrm{J}$. Hiệu suất bằng bao nhiêu?`,
      steps: [
        s(R`Công thức là $H=\frac{A}{Q_1}$.`, R`Hiệu suất là tỉ số giữa công có ích và nhiệt nhận từ nguồn nóng.`),
        s(R`Ta có $H=\frac{300}{1000}=0{,}3$, tức $30\%$.`, R`Thay $A=300$ và $Q_1=1000$.`),
      ],
      answer: "0,3",
      pitfall: R`Lấy nhiệt tỏa ra nguồn lạnh làm mẫu số.`,
      num: 0.3,
      calc: () => 300 / 1000,
    },
  },
};
