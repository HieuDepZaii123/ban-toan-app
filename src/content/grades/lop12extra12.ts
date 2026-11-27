/** Lớp 12, chi tiết thứ mười hai: hai bài vận dụng cao, dựng đường thẳng và mặt cầu từ nhiều điều kiện, và cực trị của tổng bình phương. */
import type { GradeLesson } from "./types.ts";
import { bai, buoc, luyen, vd } from "./types.ts";

const R = String.raw;

export const vdcDungHinhOxyz: GradeLesson = bai("vdc-dung-hinh-oxyz", "Dựng đường thẳng và mặt cầu từ nhiều điều kiện",
  R`Một đường thẳng cắt $d_2$ tại $M$ thì $M$ có tọa độ theo tham số của $d_2$, và các điều kiện còn lại thành phương trình cho tham số đó; chẳng hạn đường thẳng qua $A$, vuông góc với $d_1$ và cắt $d_2$ có chỉ phương $\overrightarrow{AM}$ với $\overrightarrow{AM}\cdot\vec{u_1}=0$. Mặt cầu đi qua $A$, $B$ có tâm $I$ thuộc đường thẳng $d$ thì $IA=IB$ cho vị trí của $I$ trên $d$, rồi $R=IA$.`,
  [
    vd(R`Cho $A(0;\ 0;\ 0)$, $d_1:\ x=t;\ y=t;\ z=1$ và $d_2:\ x=1+s;\ y=1-2s;\ z=s$. Viết đường thẳng qua $A$, vuông góc với $d_1$ và cắt $d_2$.`,
      [
        buoc(R`Gọi $M(1+s;\ 1-2s;\ s)$ là giao điểm với $d_2$, nên $\overrightarrow{AM}=(1+s;\ 1-2s;\ s)$.`, R`Điểm cắt nằm trên $d_2$ nên tọa độ của nó theo tham số $s$.`),
        buoc(R`Chỉ phương của $d_1$ là $\vec{u_1}=(1;\ 1;\ 0)$ và điều kiện $\overrightarrow{AM}\cdot\vec{u_1}=0$ cho $(1+s)+(1-2s)=0$, nên $s=2$.`, R`Vuông góc với $d_1$ nghĩa là tích vô hướng của hai chỉ phương bằng không.`),
        buoc(R`Khi đó $M(3;\ -3;\ 2)$ và đường thẳng cần tìm là $x=3k;\ y=-3k;\ z=2k$.`, R`Đường thẳng đi qua $A$ với chỉ phương $\overrightarrow{AM}$.`),
      ],
      R`Đường thẳng cần tìm là $x=3k;\ y=-3k;\ z=2k$.`,
      [{ expr: "solve((1+x)+(1-2*x), x)[0]", expect: "2" }, { expr: "Matrix([3,-3,2]).dot(Matrix([1,1,0]))", expect: "0" }]),
    vd(R`Viết phương trình mặt cầu đi qua $A(0;\ 0;\ 0)$ và $B(2;\ 2;\ 0)$ có tâm thuộc đường thẳng $d:\ x=t;\ y=t;\ z=2t$.`,
      [
        buoc(R`Tâm là $I(t;\ t;\ 2t)$, và $IA^2=6t^2$, $IB^2=2(t-2)^2+4t^2$.`, R`Biểu diễn bình phương khoảng cách từ tâm đến hai điểm theo tham số.`),
        buoc(R`Cho $IA^2=IB^2$ được $6t^2=6t^2-8t+8$, nên $t=1$ và $I(1;\ 1;\ 2)$.`, R`Hai bình phương $t^2$ triệt tiêu nên phương trình còn lại là bậc nhất.`),
        buoc(R`Bán kính thỏa $R^2=IA^2=1+1+4=6$.`, R`Bán kính bằng khoảng cách từ tâm đến một điểm của mặt cầu.`),
      ],
      R`Mặt cầu là $(x-1)^2+(y-1)^2+(z-2)^2=6$.`,
      [{ expr: "solve(6*x**2-(2*(x-2)**2+4*x**2), x)[0]", expect: "1" }]),
  ],
  [
    luyen(R`Cho $A(0;\ 0;\ 0)$, $\vec{u_1}=(1;\ 0;\ 1)$ và $d_2:\ x=s;\ y=3;\ z=2-3s$. Đường thẳng qua $A$ vuông góc với $\vec{u_1}$ và cắt $d_2$ tại $M$ ứng với giá trị $s$ nào?`, R`Giá trị cần tìm là $s=1$.`, [{ expr: "solve(x+(2-3*x), x)[0]", expect: "1" }], R`Điều kiện $\overrightarrow{AM}\cdot\vec{u_1}=s+(2-3s)=2-2s=0$ cho $s=1$.`),
    luyen(R`Mặt cầu tâm $I(1;\ 1;\ 2)$ đi qua $A(0;\ 0;\ 0)$. Tính $R^2$.`, R`Giá trị cần tìm là $R^2=6$.`, [{ expr: "1**2+1**2+2**2", expect: "6" }], R`Ta có $R^2=IA^2=1+1+4=6$.`),
    { ...luyen(R`Cho $A(0;\ 0;\ 0)$, $B(2;\ 2;\ 0)$ và mặt cầu $(S)$ tâm $I(1;\ 1;\ 2)$ với $R^2=6$. Xét tính đúng sai của từng ý.`, R`Ý a đúng, ý b đúng, ý c sai, ý d đúng.`, [{ expr: "1+1+4", expect: "6" }], R`Ta có $IA=IB=\sqrt6$ nên $A$, $B$ thuộc $(S)$, điểm $C(0;\ 0;\ 2)$ có $IC^2=2\ne6$, và mặt phẳng $z=0$ cách tâm $2$ nên cắt theo đường tròn có $r^2=6-4=2$.`), ask: { kind: "truefalse", statements: [R`Mặt cầu đi qua $A$.`, R`Mặt cầu đi qua $B$.`, R`Mặt cầu đi qua điểm $C(0;\ 0;\ 2)$.`, R`Mặt phẳng $z=0$ cắt mặt cầu theo đường tròn có bán kính bình phương bằng $2$.`], truth: [true, true, false, true] } },
  ],
  { topicId: "analytic" });

export const vdcCucTriBinhPhuong: GradeLesson = bai("vdc-cuc-tri-binh-phuong", "Cực trị của tổng bình phương khoảng cách",
  R`Với hai điểm $A$, $B$ và trung điểm $I$ của $AB$ ta có $MA^2+MB^2=2MI^2+\frac{AB^2}{2}$. Tổng quát, với các số dương $w_i$ có tổng $W$ và điểm $K$ thỏa $\sum w_i\overrightarrow{KP_i}=\vec{0}$ thì $\sum w_iMP_i^2=W\cdot MK^2+\sum w_iKP_i^2$. Vì vậy khi $M$ chạy trên mặt phẳng $(P)$, tổng nhỏ nhất đạt khi $M$ là hình chiếu của $K$ lên $(P)$.`,
  [
    vd(R`Cho $(P):\ x+y+z-3=0$, $A(1;\ 2;\ 3)$ và $B(3;\ 0;\ 1)$. Tìm giá trị nhỏ nhất của $MA^2+MB^2$ với $M\in(P)$ và điểm $M$ tương ứng.`,
      [
        buoc(R`Trung điểm $I(2;\ 1;\ 2)$ và $AB^2=4+4+4=12$, nên $MA^2+MB^2=2MI^2+6$.`, R`Dùng công thức trung tuyến để đưa tổng về một khoảng cách duy nhất.`),
        buoc(R`Vế trái của $(P)$ tại $I$ bằng $2$, nên $d\left(I;\ (P)\right)=\frac{2}{\sqrt3}$ và $MI^2\ge\frac43$.`, R`Khoảng cách từ $I$ đến mặt phẳng là giá trị nhỏ nhất của $MI$.`),
        buoc(R`Giá trị nhỏ nhất là $2\cdot\frac43+6=\frac{26}{3}$, đạt tại hình chiếu $M=I-\frac23(1;\ 1;\ 1)=\left(\frac43;\ \frac13;\ \frac43\right)$.`, R`Dấu bằng xảy ra khi $M$ là chân đường vuông góc hạ từ $I$ xuống mặt phẳng.`),
      ],
      R`Giá trị nhỏ nhất là $\frac{26}{3}$, đạt tại $M\left(\frac43;\ \frac13;\ \frac43\right)$.`,
      [{ expr: "2*Rational(4,3)+6", expect: "26/3" }]),
    vd(R`Cho $(P):\ z=0$, $A(0;\ 0;\ 3)$ và $B(3;\ 0;\ 0)$. Tìm giá trị nhỏ nhất của $MA^2+2MB^2$ với $M\in(P)$.`,
      [
        buoc(R`Điểm $K$ thỏa $\overrightarrow{KA}+2\overrightarrow{KB}=\vec{0}$ là $K=\frac{A+2B}{3}=(2;\ 0;\ 1)$.`, R`Trọng số của $A$ là một và của $B$ là hai nên $K$ chia đoạn $AB$ theo tỉ lệ nghịch.`),
        buoc(R`Ta có $KA^2=8$ và $KB^2=2$, nên $MA^2+2MB^2=3MK^2+8+2\cdot2=3MK^2+12$.`, R`Áp dụng công thức tổng bình phương có trọng số với tổng trọng số bằng ba.`),
        buoc(R`Khoảng cách từ $K$ đến $(P)$ bằng $1$, nên giá trị nhỏ nhất là $3\cdot1+12=15$.`, R`Thay $MK$ nhỏ nhất bằng khoảng cách từ $K$ đến mặt phẳng.`),
      ],
      R`Giá trị nhỏ nhất bằng $15$, đạt tại $M(2;\ 0;\ 0)$.`,
      [{ expr: "3*1**2+(2**2+0+2**2)+2*(1+0+1)", expect: "15" }]),
  ],
  [
    luyen(R`Cho $(P):\ z=1$, $A(0;\ 0;\ 0)$ và $B(2;\ 0;\ 0)$. Tìm giá trị nhỏ nhất của $MA^2+MB^2$ với $M\in(P)$.`, R`Giá trị nhỏ nhất bằng $4$.`, [{ expr: "2*1**2+4/2", expect: "4" }], R`Trung điểm $I(1;\ 0;\ 0)$ cách $(P)$ một khoảng $1$ và $AB^2=4$, nên giá trị nhỏ nhất là $2\cdot1+\frac42=4$.`),
    luyen(R`Cho $(P):\ z=0$ và ba điểm $A(3;\ 0;\ 3)$, $B(0;\ 3;\ 3)$, $C(0;\ 0;\ 3)$ với trọng tâm $G(1;\ 1;\ 3)$. Tìm giá trị nhỏ nhất của $MA^2+MB^2+MC^2$ với $M\in(P)$.`, R`Giá trị nhỏ nhất bằng $39$.`, [{ expr: "3*3**2+5+5+2", expect: "39" }], R`Ta có $GA^2=5$, $GB^2=5$, $GC^2=2$ và $G$ cách $(P)$ một khoảng $3$, nên giá trị nhỏ nhất là $3\cdot9+12=39$.`),
    { ...luyen(R`Cho mặt phẳng $(P)$ và hai điểm $A$, $B$. Tổng $MA^2+MB^2$ với $M\in(P)$ nhỏ nhất khi $M$ là điểm nào?`, R`Khi $M$ là hình chiếu của trung điểm $AB$ lên $(P)$.`, [{ expr: "(2/sqrt(3))**2", expect: "4/3" }], R`Vì $MA^2+MB^2=2MI^2+\frac{AB^2}{2}$ với $I$ là trung điểm $AB$, nên tổng nhỏ nhất khi $MI$ nhỏ nhất.`), ask: { kind: "choice", options: [R`Hình chiếu của trung điểm $AB$ lên $(P)$.`, R`Giao điểm của $AB$ với $(P)$.`, R`Hình chiếu của $A$ lên $(P)$.`], correct: 0 } },
  ],
  { topicId: "analytic" });
