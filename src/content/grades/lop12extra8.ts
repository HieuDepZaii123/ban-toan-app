/** Lớp 12, chi tiết thứ tám: bài tổng hợp và vận dụng cao trong Oxyz. */
import type { GradeChapter } from "./types.ts";
import { bai, buoc, chuong, luyen, vd } from "./types.ts";
import { cucTriHieuOxyz, kcDiemOxyz } from "./lop12extra9.ts";

const R = String.raw;

export const lop12OxyzTongHop: GradeChapter = chuong("oxyz-tong-hop", "Oxyz tổng hợp: khoảng cách, cực trị và bài toán nhiều bước", [
  kcDiemOxyz,
  bai("mp-cuc-tri-oxyz", "Cực trị với mặt phẳng: dùng điểm đối xứng",
    R`Cho mặt phẳng $(P)$ và hai điểm $A$, $B$. Nếu $A$, $B$ nằm cùng phía $(P)$ thì $MA+MB$ với $M\in(P)$ nhỏ nhất khi $M$ là giao điểm của $A'B$ với $(P)$, trong đó $A'$ đối xứng với $A$ qua $(P)$, và giá trị nhỏ nhất là $A'B$. Nếu $A$, $B$ nằm khác phía thì $M$ là giao điểm của $AB$ với $(P)$ và giá trị nhỏ nhất là $AB$. Hai điểm cùng phía khi hai giá trị thay vào vế trái phương trình mặt phẳng cùng dấu.`,
    [
      vd(R`Cho $(P):\ z=0$, $A(1;\ 2;\ 3)$ và $B(3;\ 0;\ 1)$. Tìm $M\in(P)$ để $MA+MB$ nhỏ nhất và tính giá trị nhỏ nhất đó.`,
        [
          buoc(R`Cả hai điểm đều có $z>0$ nên nằm cùng phía $(P)$, và điểm đối xứng của $A$ là $A'(1;\ 2;\ -3)$.`, R`Hai điểm cùng phía nên phải lấy đối xứng một điểm để đưa về hai điểm khác phía.`),
          buoc(R`Giá trị nhỏ nhất là $A'B=\sqrt{4+4+16}=2\sqrt6$.`, R`Với $M$ bất kỳ trên $(P)$ ta có $MA'=MA$, và $MA'+MB\ge A'B$ theo bất đẳng thức tam giác.`),
          buoc(R`Đường $A'B$ là $(1+2t;\ 2-2t;\ -3+4t)$; $z=0$ cho $t=\frac34$ nên $M=\left(\frac52;\ \frac12;\ 0\right)$.`, R`Dấu bằng xảy ra khi $M$ nằm trên đoạn $A'B$, tức là giao điểm với mặt phẳng.`),
        ],
        R`Giá trị nhỏ nhất là $2\sqrt6$, đạt tại $M\left(\frac52;\ \frac12;\ 0\right)$.`,
        [{ expr: "sqrt(4+4+16)", expect: "2*sqrt(6)" }, { expr: "Rational(3,4)*4-3", expect: "0" }]),
      vd(R`Cho $(P):\ x+y+z-3=0$, $A(2;\ 1;\ 1)$ và $B(1;\ 2;\ 3)$. Tìm giá trị nhỏ nhất của $MA+MB$ với $M\in(P)$.`,
      [
        buoc(R`Vế trái tại $A$ bằng $1$ và tại $B$ bằng $3$, cùng dấu nên hai điểm cùng phía $(P)$.`, R`Hai điểm cùng phía khi hai giá trị này có cùng dấu.`),
        buoc(R`Điểm đối xứng của $A$ là $A'=A-\frac{2\cdot1}{3}(1;\ 1;\ 1)=\left(\frac43;\ \frac13;\ \frac13\right)$.`, R`Đối xứng qua mặt phẳng nghĩa là đi thêm hai lần khoảng cách có dấu dọc theo pháp tuyến.`),
        buoc(R`Khi đó $A'B=\sqrt{\frac19+\frac{25}{9}+\frac{64}{9}}=\sqrt{10}$.`, R`Lấy hiệu tọa độ của $B$ và $A'$ rồi tính độ dài.`),
      ],
      R`Giá trị nhỏ nhất của $MA+MB$ là $\sqrt{10}$.`,
      [{ expr: "2-Rational(2,3)", expect: "4/3" }, { expr: "sqrt(Rational(1,9)+Rational(25,9)+Rational(64,9))", expect: "sqrt(10)" }]),
    ],
    [
      luyen(R`Cho $(P):\ z=0$, $A(0;\ 0;\ 1)$ và $B(0;\ 3;\ 3)$. Tính giá trị nhỏ nhất của $MA+MB$ với $M\in(P)$.`, R`Giá trị nhỏ nhất bằng $5$.`, [{ expr: "sqrt(0+9+16)", expect: "5" }], R`Hai điểm cùng phía, $A'(0;\ 0;\ -1)$ và $A'B=\sqrt{0+9+16}=5$.`),
      luyen(R`Điểm $M$ của đường $d:\ x=t;\ y=0;\ z=2t$ cách $(P):\ z=0$ một khoảng $4$. Tìm giá trị dương của $t$.`, R`Giá trị cần tìm là $t=2$.`, [{ expr: "4/2", expect: "2" }], R`Khoảng cách bằng $\left|2t\right|=4$ nên $t=2$ với giá trị dương.`),
      { ...luyen(R`Cho $(P):\ z=0$, $A(0;\ 0;\ 1)$ và $B(0;\ 0;\ -1)$ khác phía $(P)$. Giá trị nhỏ nhất của $MA+MB$ là bao nhiêu và đạt khi nào?`, R`Giá trị nhỏ nhất bằng $2$, đạt khi $M$ là giao điểm của $AB$ với $(P)$.`, [{ expr: "1-(-1)", expect: "2" }], R`Hai điểm khác phía nên $MA+MB\ge AB=2$, với dấu bằng khi $M$ nằm trên đoạn $AB$.`), ask: { kind: "choice", options: [R`Bằng $2$, đạt khi $M$ là giao điểm của $AB$ với $(P)$.`, R`Bằng $0$.`, R`Bằng $\sqrt2$.`], correct: 0 } },
      { ...luyen(R`Cho $(P):\ z=0$, $A(1;\ 2;\ 3)$ và $B(3;\ 0;\ 1)$, với $M\in(P)$. Xét tính đúng sai của từng ý.`, R`Ý a đúng, ý b đúng, ý c sai, ý d đúng.`, [{ expr: "sqrt(4+4+16)", expect: "2*sqrt(6)" }], R`Hai điểm cùng phía nên giá trị nhỏ nhất là $A'B=\sqrt{4+4+16}=2\sqrt6$ chứ không phải $AB=2\sqrt3$.`), ask: { kind: "truefalse", statements: [R`Hai điểm $A$ và $B$ nằm cùng phía so với $(P)$.`, R`Điểm đối xứng của $A$ qua $(P)$ là $A'(1;\ 2;\ -3)$.`, R`Giá trị nhỏ nhất của $MA+MB$ bằng $AB$.`, R`Giá trị nhỏ nhất của $MA+MB$ bằng $2\sqrt6$.`], truth: [true, true, false, true] } },
    ],
    { topicId: "analytic" }),
  cucTriHieuOxyz,
  bai("tong-hop-oxyz", "Bài tổng hợp: mặt phẳng chắn trục, thể tích và hình chiếu",
    R`Một bài Oxyz nhiều bước thường kết hợp: viết mặt phẳng từ ba điểm bằng tích có hướng, tính thể tích tứ diện $\frac{1}{6}\left|\left[\overrightarrow{OA},\overrightarrow{OB}\right]\cdot\overrightarrow{OC}\right|$, diện tích tam giác $\frac12\left|\left[\overrightarrow{AB},\overrightarrow{AC}\right]\right|$ và khoảng cách $h=\frac{3V}{S}$, rồi lập đường vuông góc để tìm hình chiếu. Hai cách tính cùng một đại lượng nên là phép kiểm tra lẫn nhau.`,
    [
      vd(R`Cho $A(1;\ 0;\ 0)$, $B(0;\ 2;\ 0)$, $C(0;\ 0;\ 3)$. Viết mặt phẳng $(ABC)$, tính thể tích $OABC$, diện tích tam giác $ABC$ và khoảng cách từ $O$ đến $(ABC)$.`,
        [
          buoc(R`Ta có $\overrightarrow{AB}=(-1;\ 2;\ 0)$, $\overrightarrow{AC}=(-1;\ 0;\ 3)$ và $\left[\overrightarrow{AB},\overrightarrow{AC}\right]=(6;\ 3;\ 2)$, nên $(ABC):\ 6x+3y+2z-6=0$.`, R`Pháp tuyến là tích có hướng, và thay điểm $A$ để tìm hằng số.`),
          buoc(R`Thể tích $V=\frac{1\cdot2\cdot3}{6}=1$ và diện tích $S=\frac12\sqrt{36+9+4}=\frac72$.`, R`Tứ diện $OABC$ vuông tại $O$ nên thể tích là một phần sáu tích ba cạnh.`),
          buoc(R`Khoảng cách $h=\frac{3V}{S}=\frac{3}{\frac72}=\frac67$, trùng với $\frac{6}{\sqrt{36+9+4}}=\frac67$.`, R`Hai cách tính độc lập cho cùng kết quả nên có thể tin vào cả hai.`),
        ],
        R`Mặt phẳng $6x+3y+2z-6=0$, thể tích $1$, diện tích $\frac72$ và khoảng cách $\frac67$.`,
        [{ expr: "Matrix([-1,2,0]).cross(Matrix([-1,0,3]))[0]", expect: "6" }, { expr: "3*1/(Rational(7,2))", expect: "6/7" }]),
      vd(R`Tìm hình chiếu $H$ của $O$ lên mặt phẳng $(ABC):\ 6x+3y+2z-6=0$ ở ví dụ trên.`,
        [
          buoc(R`Đường qua $O$ vuông góc $(ABC)$ là $x=6t,\ y=3t,\ z=2t$.`, R`Chỉ phương là pháp tuyến $(6;\ 3;\ 2)$.`),
          buoc(R`Thay vào mặt phẳng: $36t+9t+4t-6=0$, nên $t=\frac{6}{49}$.`, R`Giá trị $t$ làm phương trình mặt phẳng bằng $0$ cho giao điểm.`),
          buoc(R`Vậy $H=\left(\frac{36}{49};\ \frac{18}{49};\ \frac{12}{49}\right)$ và $OH=\frac{6}{49}\cdot7=\frac67$.`, R`Độ dài $OH$ trùng với khoảng cách đã tính ở ví dụ trước.`),
        ],
        R`Hình chiếu là $H\left(\frac{36}{49};\ \frac{18}{49};\ \frac{12}{49}\right)$.`,
        [{ expr: "6*1/49", expect: "6/49" }]),
    ],
    [
      luyen(R`Tính thể tích tứ diện $OABC$ với $A(2;\ 0;\ 0)$, $B(0;\ 3;\ 0)$, $C(0;\ 0;\ 4)$.`, R`Thể tích bằng $4$.`, [{ expr: "2*3*4/6", expect: "4" }], R`Tứ diện vuông tại $O$ nên $V=\frac{2\cdot3\cdot4}{6}=4$.`),
      luyen(R`Tính khoảng cách từ $O$ đến mặt phẳng $6x+3y+2z-12=0$.`, R`Khoảng cách bằng $\frac{12}{7}$.`, [{ expr: "12/sqrt(36+9+4)", expect: "12/7" }], R`Ta có $\frac{|-12|}{\sqrt{36+9+4}}=\frac{12}{7}$.`),
      luyen(R`Đường qua $O$ vuông góc với $6x+3y+2z-12=0$ có phương trình $x=6t,\ y=3t,\ z=2t$. Tìm $t$ ứng với hình chiếu của $O$.`, R`Giá trị cần tìm là $t=\frac{12}{49}$.`, [{ expr: "12*1/49", expect: "12/49" }], R`Thay vào được $49t-12=0$, nên $t=\frac{12}{49}$.`),
      { ...luyen(R`Cho $A(1;\ 0;\ 0)$, $B(0;\ 2;\ 0)$ và $C(0;\ 0;\ 3)$. Xét tính đúng sai của từng ý.`, R`Ý a đúng, ý b sai, ý c đúng, ý d sai.`, [{ expr: "Matrix([-1,2,0]).cross(Matrix([-1,0,3]))[2]", expect: "2" }], R`Thể tích $OABC$ bằng $\frac{1\cdot2\cdot3}{6}=1$ và diện tích $ABC$ bằng $\frac72$, từ đó khoảng cách từ $O$ là $\frac{3}{\frac72}=\frac67$.`), ask: { kind: "truefalse", statements: [R`Phương trình mặt phẳng $(ABC)$ là $6x+3y+2z-6=0$.`, R`Thể tích tứ diện $OABC$ bằng $2$.`, R`Khoảng cách từ $O$ đến $(ABC)$ bằng $\frac67$.`, R`Diện tích tam giác $ABC$ bằng $7$.`], truth: [true, false, true, false] } },
    ],
    { topicId: "analytic" }),
]);
