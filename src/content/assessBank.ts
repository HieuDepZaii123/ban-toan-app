import { displayOrder } from "../lib/prng.ts";

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

const R = String.raw;

export const assessBanks: AssessBank[] = [
  {
    id: "tuduy",
    name: "Tư duy toán",
    desc: "Nhận quy luật và ước lượng nhanh.",
    questions: [
      { t: R`Tìm số tiếp theo của dãy $2;\ 6;\ 12;\ 20;\ 30;\ \ldots$`, choices: [R`$40$`, R`$42$`, R`$44$`, R`$36$`], answer: 1, steps: [R`Hiệu liên tiếp: $4;\ 6;\ 8;\ 10$.`, R`Hiệu kế tiếp là $12$.`, R`$30+12=42$.`] },
      { t: R`Dãy $1;\ 1;\ 2;\ 3;\ 5;\ 8;\ 13;\ \ldots$ Số kế tiếp là số nào?`, numeric: 21, steps: [R`Mỗi số bằng tổng hai số liền trước.`, R`$8+13=21$.`] },
      { t: R`$\sqrt{50}$ gần nhất với giá trị nào?`, choices: [R`$6{,}9$`, R`$7{,}1$`, R`$7{,}3$`, R`$7{,}5$`], answer: 1, steps: [R`$7^2=49$.`, R`$\sqrt{50}\approx 7+\dfrac{1}{14}\approx 7{,}07$.`, R`Gần nhất là $7{,}1$.`] },
      { t: R`Số $n$ không chia hết cho $3$. Điều nào chắc chắn đúng, nếu mọi số chia hết cho $6$ đều chia hết cho $3$?`, choices: [R`$n$ chia hết cho $2$`, R`$n$ không chia hết cho $6$`, R`$n$ là số lẻ`, "Không kết luận được"], answer: 1, steps: [R`Phản đảo: không chia hết cho $3$ thì không chia hết cho $6$.`] },
      { t: R`Chữ số tận cùng của $7^{2026}$ là chữ số nào?`, numeric: 9, steps: [R`Chữ số tận cùng lặp theo chu kỳ $4$: $7;\ 9;\ 3;\ 1$.`, R`$2026=4\cdot 506+2$.`, R`Vị trí thứ $2$ trong chu kỳ là $9$.`] },
      { t: R`$0{,}49\cdot 201$ gần nhất với giá trị nào?`, choices: [R`$10$`, R`$50$`, R`$100$`, R`$200$`], answer: 2, steps: [R`$0{,}5\cdot 200=100$.`, R`Giá trị đúng khoảng $98{,}49$.`] },
      { t: R`Đa giác lồi $10$ cạnh có bao nhiêu đường chéo?`, numeric: 35, steps: [R`Số đường chéo của đa giác $n$ cạnh là $\dfrac{n(n-3)}{2}$.`, R`$\dfrac{10\cdot 7}{2}=35$.`] },
      { t: R`Tính $1+3+5+\cdots+99$.`, numeric: 2500, steps: [R`Có $50$ số lẻ.`, R`Tổng $n$ số lẻ đầu tiên là $n^2$.`, R`$50^2=2500$.`] },
    ],
  },
  {
    id: "tonghop",
    name: "Năng lực tổng hợp",
    desc: "Toán trong vật lý, hóa và đời sống.",
    questions: [
      { t: R`Vật rơi theo $h=4{,}9t^2$, với $h$ tính bằng mét và $t$ tính bằng giây. Từ độ cao $122{,}5$ m, sau bao nhiêu giây vật chạm đất?`, numeric: 5, steps: [R`$4{,}9t^2=122{,}5$.`, R`$t^2=25$.`, R`$t=5$, lấy nghiệm dương.`] },
      { t: R`Gửi $100$ triệu đồng, lãi kép $6\%$ mỗi năm. Sau $3$ năm có khoảng bao nhiêu triệu đồng?`, numeric: 119.1, tol: 0.01, steps: [R`Số tiền là $100\cdot 1{,}06^3$.`, R`$1{,}06^3\approx 1{,}191016$.`, R`Khoảng $119{,}10$ triệu đồng.`] },
      { t: R`Có $200$ g dung dịch muối $10\%$. Thêm bao nhiêu gam nước để được dung dịch $8\%$?`, numeric: 50, steps: [R`Lượng muối là $20$ g.`, R`$\dfrac{20}{200+x}=0{,}08$.`, R`$x=50$.`] },
      { t: R`Đi với vận tốc $60$ km/h, về với vận tốc $40$ km/h trên cùng quãng đường. Tốc độ trung bình cả đi lẫn về là bao nhiêu km/h?`, numeric: 48, steps: [R`Tốc độ trung bình là trung bình điều hòa $\dfrac{2ab}{a+b}$.`, R`$\dfrac{2\cdot 60\cdot 40}{100}=48$.`] },
      { t: R`Bể hình hộp chữ nhật dài $3$ m, rộng $2$ m, cao $1{,}5$ m, bơm $15$ lít mỗi phút. Sau bao nhiêu phút thì đầy bể?`, numeric: 600, steps: [R`$V=2\cdot 3\cdot 1{,}5=9$ m³, tức $9000$ lít.`, R`$9000:15=600$.`] },
      { t: R`Cọc cao $1{,}5$ m có bóng dài $2$ m. Cùng lúc đó, cây có bóng dài $12$ m thì cao bao nhiêu mét?`, numeric: 9, steps: [R`Hai tam giác đồng dạng.`, R`$\dfrac{h}{12}=\dfrac{1{,}5}{2}$.`, R`$h=9$.`] },
    ],
  },
  {
    id: "hsg",
    name: "Đội tuyển HSG",
    desc: "Mức chọn đội, kết hợp nhiều chuyên đề.",
    questions: [
      { t: R`Có bao nhiêu cặp số nguyên dương $(x;y)$ thỏa $\dfrac{1}{x}+\dfrac{1}{y}=\dfrac{1}{2026}$?`, numeric: 9, steps: [R`$(x-2026)(y-2026)=2026^2$.`, R`$2026^2=2^2\cdot 1013^2$ có $9$ ước dương.`, R`Mỗi ước cho một cặp.`] },
      { t: R`Tìm số dư khi chia $2^{2026}$ cho $1013$.`, numeric: 4, steps: [R`Định lí Fermat nhỏ: $2^{1012}\equiv 1\pmod{1013}$.`, R`$2026=2\cdot 1012+2$.`, R`$2^{2026}\equiv 2^2=4\pmod{1013}$.`] },
      { t: R`Đa thức $P$ có bậc không quá $3$ và $P(k)=\dfrac{1}{k}$ với $k=1;\ 2;\ 3;\ 4$. Tính $P(5)$.`, numeric: 0, steps: [R`Đa thức $Q(x)=xP(x)-1$ có bốn nghiệm $1;\ 2;\ 3;\ 4$ và $Q(0)=-1$.`, R`Suy ra $Q(x)=-\dfrac{(x-1)(x-2)(x-3)(x-4)}{24}$, nên $Q(5)=-1$.`, R`$5P(5)-1=-1$, vậy $P(5)=0$.`] },
      { t: R`Hàm $f$ thỏa $f(x+y)=f(x)+f(y)+2xy$ và $f(1)=3$. Tính $f(10)$.`, numeric: 120, steps: [R`Hàm $g(x)=f(x)-x^2$ thỏa $g(x+y)=g(x)+g(y)$.`, R`Với số nguyên, $g(x)=g(1)\cdot x=2x$.`, R`$f(10)=10^2+2\cdot 10=120$.`] },
      { t: R`Có bao nhiêu cách lát kín bảng $2\times 10$ bằng các quân domino $1\times 2$?`, numeric: 89, steps: [R`Gọi $a_n$ là số cách lát bảng có $2$ hàng và $n$ cột, ta có $a_n=a_{n-1}+a_{n-2}$.`, R`$a_1=1$ và $a_2=2$.`, R`$a_{10}=89$.`] },
      { t: R`Cho $x+2y+3z=14$. Tìm giá trị nhỏ nhất của $x^2+y^2+z^2$.`, numeric: 14, steps: [R`Bất đẳng thức Cauchy-Schwarz: $14^2\le(1+4+9)(x^2+y^2+z^2)$.`, R`Giá trị nhỏ nhất là $14$, đạt khi $(x;y;z)=(1;2;3)$.`] },
      { t: R`Có bao nhiêu số nguyên $n$ với $1\le n\le 1000$ để $n^2+1$ chia hết cho $5$?`, numeric: 400, steps: [R`$n^2\equiv 4\pmod 5$ khi $n\equiv 2$ hoặc $n\equiv 3\pmod 5$.`, R`Cứ $5$ số liên tiếp có $2$ số thỏa mãn.`, R`$\dfrac{1000}{5}\cdot 2=400$.`] },
      { t: R`Số $10!$ có bao nhiêu ước nguyên dương?`, numeric: 270, steps: [R`$10!=2^8\cdot 3^4\cdot 5^2\cdot 7$.`, R`$(8+1)(4+1)(2+1)(1+1)=270$.`] },
    ],
  },
];

export function gradeNumber(value: number, answer: number, tol = 1e-9): boolean {
  return Number.isFinite(value) && Math.abs(value - answer) <= tol;
}

/**
 * Chữ cái của đáp án như đang hiện trên màn hình. Trang xáo các lựa chọn theo `displayOrder(question.t)`,
 * nên chữ cái theo vị trí gốc (`answer`) có thể chỉ nhầm sang lựa chọn khác.
 */
export function shownLetter(question: AssessQuestion): string {
  if (!question.choices || question.answer === undefined) return "";
  const at = displayOrder(question.t, question.choices.length).indexOf(question.answer);
  return String.fromCharCode(65 + Math.max(0, at));
}
