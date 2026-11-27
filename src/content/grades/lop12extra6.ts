/** Lớp 12, chi tiết thứ sáu: phương trình đường thẳng, đoạn thẳng và mặt phẳng trong Oxyz. */
import type { GradeChapter } from "./types.ts";
import { bai, buoc, chuong, luyen, vd } from "./types.ts";

const R = String.raw;

export const lop12PtOxyz: GradeChapter = chuong("pt-oxyz", "Phương trình đường thẳng, đoạn thẳng và mặt phẳng trong Oxyz", [
  bai("pt-dt-oxyz", "Phương trình tham số và chính tắc của đường thẳng",
    R`Đường thẳng qua $M_0(x_0;\ y_0;\ z_0)$ có vectơ chỉ phương $\vec u=(a;\ b;\ c)$ có phương trình tham số $x=x_0+at$, $y=y_0+bt$, $z=z_0+ct$ và, khi $a$, $b$, $c$ khác $0$, phương trình chính tắc $\frac{x-x_0}{a}=\frac{y-y_0}{b}=\frac{z-z_0}{c}$. Đường thẳng qua hai điểm $A$ và $B$ nhận $\overrightarrow{AB}$ làm vectơ chỉ phương. Một điểm thuộc đường thẳng khi có giá trị $t$ cho đủ ba tọa độ.`,
    [
      vd(R`Viết phương trình tham số của đường thẳng $d$ qua $A(1;\ 2;\ 3)$ có vectơ chỉ phương $\vec u=(2;\ -1;\ 4)$. Điểm $M(3;\ 1;\ 7)$ có thuộc $d$ không?`,
        [
          buoc(R`Phương trình tham số là $x=1+2t$, $y=2-t$, $z=3+4t$.`, R`Thay $x_0=1$, $y_0=2$, $z_0=3$ và $a=2$, $b=-1$, $c=4$.`),
          buoc(R`Từ $x=3$ được $t=1$; khi đó $y=2-1=1$ và $z=3+4=7$, khớp với $M$.`, R`Điểm thuộc đường thẳng khi cùng một giá trị $t$ cho đủ ba tọa độ.`),
        ],
        R`Có, điểm $M$ thuộc $d$ ứng với $t=1$.`,
        [{ expr: "3+4*1", expect: "7" }, { expr: "2-1", expect: "1" }]),
      vd(R`Viết phương trình tham số của đường thẳng qua $A(1;\ 0;\ 2)$ và $B(3;\ 2;\ -2)$.`,
        [
          buoc(R`Vectơ chỉ phương là $\overrightarrow{AB}=(2;\ 2;\ -4)$.`, R`Lấy tọa độ điểm cuối trừ điểm đầu.`),
          buoc(R`Phương trình là $x=1+2t$, $y=2t$, $z=2-4t$.`, R`Dùng điểm $A$ làm điểm đi qua.`),
        ],
        R`Đường thẳng có phương trình $x=1+2t$, $y=2t$, $z=2-4t$.`,
        [{ expr: "(Matrix([3,2,-2])-Matrix([1,0,2]))[2]", expect: "-4" }]),
    ],
    [
      luyen(R`Đường thẳng $d:\ x=1+t,\ y=-2t,\ z=3+t$. Điểm của $d$ có hoành độ $4$ có tung độ bằng bao nhiêu?`, R`Tung độ bằng $-6$.`, [{ expr: "-2*3", expect: "-6" }], R`Từ $1+t=4$ được $t=3$, nên $y=-2\cdot3=-6$.`),
      luyen(R`Đường thẳng $d:\ x=1+2t,\ y=3-t,\ z=-2+t$. Tìm $m$ để điểm $A(5;\ m;\ 0)$ thuộc $d$.`, R`Giá trị cần tìm là $m=1$.`, [{ expr: "3-2", expect: "1" }], R`Từ $1+2t=5$ được $t=2$, khi đó $z=-2+2=0$ khớp và $y=3-2=1$.`),
      luyen(R`Đường thẳng qua $A(1;\ 2;\ 3)$ và $B(4;\ 2;\ 1)$ có phương trình tham số $z=3+ct$. Tìm $c$.`, R`Hệ số $c=-2$.`, [{ expr: "1-3", expect: "-2" }], R`Vectơ chỉ phương $\overrightarrow{AB}=(3;\ 0;\ -2)$ nên $c=1-3=-2$.`),
    ],
    { topicId: "analytic" }),
  bai("doan-thang-oxyz", "Phương trình đoạn thẳng và điểm chia",
    R`Đoạn thẳng $AB$ gồm các điểm $M=A+t\overrightarrow{AB}$ với $0\le t\le1$, tức $x=x_A+t(x_B-x_A)$ và tương tự cho $y$, $z$. Khi đó $AM=t\cdot AB$, $t=\frac12$ cho trung điểm, và $AM:MB=t:(1-t)$. Đường thẳng $AB$ cắt một mặt phẳng tại giá trị $t$ tìm được, và nếu $AB$ song song với mặt phẳng thì không có giá trị nào hoặc mọi giá trị đều thỏa; đoạn thẳng $AB$ cắt mặt phẳng khi giá trị đó thuộc đoạn $[0;\ 1]$.`,
    [
      vd(R`Cho $A(1;\ 2;\ 3)$ và $B(5;\ 6;\ 7)$. Tìm trung điểm của $AB$ và điểm $N$ trên $AB$ sao cho $AN=\frac34AB$.`,
        [
          buoc(R`Trung điểm ứng với $t=\frac12$: $\left(1+\frac12\cdot4;\ 2+\frac12\cdot4;\ 3+\frac12\cdot4\right)=(3;\ 4;\ 5)$.`, R`Thay $t=\frac12$ vào phương trình đoạn thẳng với $\overrightarrow{AB}=(4;\ 4;\ 4)$.`),
          buoc(R`Điểm $N$ ứng với $t=\frac34$: $(1+3;\ 2+3;\ 3+3)=(4;\ 5;\ 6)$.`, R`Vì độ dài $AN=t\cdot AB$ nên $t=\frac34$.`),
        ],
        R`Trung điểm là $(3;\ 4;\ 5)$ và $N=(4;\ 5;\ 6)$.`,
        [{ expr: "1+Rational(3,4)*4", expect: "4" }, { expr: "1+Rational(1,2)*4", expect: "3" }]),
      vd(R`Đoạn thẳng $AB$ với $A(1;\ 1;\ 2)$, $B(3;\ -1;\ -2)$ có cắt mặt phẳng $z=0$ không? Nếu có, tìm giao điểm.`,
        [
          buoc(R`Phương trình đoạn thẳng cho $z=2-4t$; $z=0$ khi $t=\frac12$.`, R`Thay vào phương trình mặt phẳng $z=0$.`),
          buoc(R`Vì $\frac12\in[0;\ 1]$ nên đoạn thẳng cắt mặt phẳng, tại $(2;\ 0;\ 0)$.`, R`Thay $t=\frac12$ vào $x=1+2t$ và $y=1-2t$.`),
        ],
        R`Có, giao điểm là $(2;\ 0;\ 0)$.`,
        [{ expr: "solve(2-4*x, x)[0]", expect: "Rational(1,2)" }]),
    ],
    [
      luyen(R`Cho $A(0;\ 0;\ 0)$ và $B(6;\ 3;\ 9)$. Điểm $M$ trên $AB$ có $AM=\frac13AB$. Tìm cao độ của $M$.`, R`Cao độ bằng $3$.`, [{ expr: "9*Rational(1,3)", expect: "3" }], R`Điểm $M$ ứng với $t=\frac13$ nên $z=\frac13\cdot9=3$.`),
      luyen(R`Điểm $M$ trên đoạn $AB$ với $A$ có hoành độ $2$, $B$ có hoành độ $10$, và $AM=\frac14AB$. Tìm hoành độ của $M$.`, R`Hoành độ bằng $4$.`, [{ expr: "2+Rational(1,4)*(10-2)", expect: "4" }], R`Hoành độ là $2+\frac14\cdot(10-2)=4$.`),
      { ...luyen(R`Đoạn thẳng $AB$ với $A(1;\ 1;\ 2)$ và $B(3;\ 1;\ 4)$ có cắt mặt phẳng $z=0$ không?`, R`Không, vì giao điểm ứng với $t=-1$ nằm ngoài đoạn $[0;\ 1]$.`, [{ expr: "solve(2+2*x, x)[0]", expect: "-1" }], R`Phương trình đoạn thẳng cho $z=2+2t=0$ nên $t=-1$, không thuộc $[0;\ 1]$; đường thẳng $AB$ cắt mặt phẳng nhưng đoạn thẳng thì không.`), ask: { kind: "choice", options: ["Có, vì đường thẳng $AB$ cắt mặt phẳng.", "Không, vì giao điểm ứng với $t=-1$ ngoài đoạn.", "Chưa đủ dữ kiện."], correct: 1 } },
    ],
    { topicId: "analytic" }),
  bai("pt-mp-dang", "Các cách viết phương trình mặt phẳng",
    R`Mặt phẳng qua $M(x_0;\ y_0;\ z_0)$ có pháp tuyến $\vec n=(A;\ B;\ C)$ là $A(x-x_0)+B(y-y_0)+C(z-z_0)=0$. Nếu biết hai vectơ chỉ phương không cùng phương $\vec u$, $\vec v$ thì $\vec n=\left[\vec u,\vec v\right]$. Mặt phẳng cắt ba trục tại $(a;\ 0;\ 0)$, $(0;\ b;\ 0)$, $(0;\ 0;\ c)$ với $a$, $b$, $c$ khác $0$ có phương trình $\frac xa+\frac yb+\frac zc=1$. Mặt phẳng trung trực của $AB$ đi qua trung điểm của $AB$ và nhận $\overrightarrow{AB}$ làm pháp tuyến.`,
    [
      vd(R`Viết phương trình mặt phẳng qua $M(1;\ 2;\ 3)$ có hai vectơ chỉ phương $\vec u=(1;\ 0;\ 1)$ và $\vec v=(0;\ 1;\ 2)$.`,
        [
          buoc(R`Tích có hướng $\left[\vec u,\vec v\right]=(-1;\ -2;\ 1)$, ta chọn pháp tuyến $(1;\ 2;\ -1)$.`, R`Đổi dấu cả vectơ để hệ số $x$ dương, mặt phẳng không đổi.`),
          buoc(R`Phương trình có dạng $x+2y-z+d=0$ và qua $M$ nên $1+4-3+d=0$, tức $d=-2$.`, R`Thay tọa độ $M$ để tìm hằng số.`),
        ],
        R`Mặt phẳng cần tìm là $x+2y-z-2=0$.`,
        [{ expr: "Matrix([1,0,1]).cross(Matrix([0,1,2]))[2]", expect: "1" }, { expr: "-(1+2*2-3)", expect: "-2" }]),
      vd(R`Viết phương trình mặt phẳng trung trực của đoạn $AB$ với $A(1;\ 2;\ 3)$ và $B(3;\ 4;\ 1)$.`,
        [
          buoc(R`Trung điểm là $M(2;\ 3;\ 2)$ và $\overrightarrow{AB}=(2;\ 2;\ -2)$, chọn pháp tuyến $(1;\ 1;\ -1)$.`, R`Pháp tuyến cùng phương với $\overrightarrow{AB}$.`),
          buoc(R`Phương trình $x+y-z+d=0$ qua $M$ nên $2+3-2+d=0$, tức $d=-3$.`, R`Thay tọa độ trung điểm $M$.`),
        ],
        R`Mặt phẳng trung trực là $x+y-z-3=0$.`,
        [{ expr: "-(2+3-2)", expect: "-3" }]),
    ],
    [
      luyen(R`Mặt phẳng cắt các trục tại $A(2;\ 0;\ 0)$, $B(0;\ 3;\ 0)$, $C(0;\ 0;\ 6)$. Tính khoảng cách từ gốc $O$ đến mặt phẳng, biết phương trình là $3x+2y+z-6=0$.`, R`Khoảng cách bằng $\frac{3\sqrt{14}}{7}$.`, [{ expr: "Rational(6,1)/sqrt(14)", expect: "3*sqrt(14)/7" }], R`Ta có $\frac{|-6|}{\sqrt{9+4+1}}=\frac{6}{\sqrt{14}}=\frac{3\sqrt{14}}{7}$.`),
      luyen(R`Mặt phẳng qua $M(1;\ 1;\ 1)$ với pháp tuyến $(2;\ -1;\ 3)$ có dạng $2x-y+3z+d=0$. Tìm $d$.`, R`Giá trị cần tìm là $d=-4$.`, [{ expr: "-(2-1+3)", expect: "-4" }], R`Thay $M$ được $2-1+3+d=0$ nên $d=-4$.`),
      luyen(R`Mặt phẳng trung trực của đoạn $AB$ với $A(0;\ 0;\ 0)$ và $B(4;\ 0;\ 0)$ có dạng $x+d=0$. Tìm $d$.`, R`Giá trị cần tìm là $d=-2$.`, [{ expr: "-(Rational(0+4,2))", expect: "-2" }], R`Mặt phẳng đi qua trung điểm $(2;\ 0;\ 0)$ nên $2+d=0$ và $d=-2$.`),
    ],
    { topicId: "analytic" }),
  bai("lap-dt-mp", "Lập phương trình đường thẳng và mặt phẳng từ quan hệ cho trước",
    R`Đường thẳng vuông góc với mặt phẳng $(P)$ nhận pháp tuyến của $(P)$ làm chỉ phương. Mặt phẳng song song với $(P):\ Ax+By+Cz+D=0$ có dạng $Ax+By+Cz+D'=0$. Mặt phẳng chứa đường thẳng $d$ và đi qua điểm $A$ ngoài $d$ nhận $\left[\vec u,\overrightarrow{MA}\right]$ làm pháp tuyến, với $M\in d$. Hình chiếu của điểm $A$ lên $(P)$ là giao điểm của $(P)$ với đường thẳng qua $A$ vuông góc $(P)$.`,
    [
      vd(R`Viết phương trình đường thẳng qua $A(1;\ 2;\ 3)$ vuông góc với $(P):\ x-2y+z+1=0$ và tìm giá trị $t$ của hình chiếu của $A$ lên $(P)$.`,
        [
          buoc(R`Chỉ phương là pháp tuyến $(1;\ -2;\ 1)$, nên $x=1+t$, $y=2-2t$, $z=3+t$.`, R`Đường thẳng vuông góc với mặt phẳng nhận pháp tuyến làm chỉ phương.`),
          buoc(R`Thay vào $(P)$: $(1+t)-2(2-2t)+(3+t)+1=6t+1=0$ nên $t=-\frac16$.`, R`Giao điểm với $(P)$ là hình chiếu cần tìm.`),
        ],
        R`Hình chiếu ứng với $t=-\frac16$, tức là điểm $\left(\frac56;\ \frac73;\ \frac{17}{6}\right)$.`,
        [{ expr: "solve((1+x)-2*(2-2*x)+(3+x)+1, x)[0]", expect: "-Rational(1,6)" }]),
      vd(R`Viết mặt phẳng qua $A(1;\ 0;\ 0)$ và chứa đường thẳng $d:\ x=t,\ y=1+t,\ z=2$.`,
        [
          buoc(R`Điểm $B(0;\ 1;\ 2)\in d$ và chỉ phương $\vec u=(1;\ 1;\ 0)$, $\overrightarrow{AB}=(-1;\ 1;\ 2)$.`, R`Lấy một điểm của $d$ ứng với $t=0$.`),
          buoc(R`Pháp tuyến $\left[\vec u,\overrightarrow{AB}\right]=(2;\ -2;\ 2)$, chọn $(1;\ -1;\ 1)$; qua $A$ nên $x-y+z-1=0$.`, R`Thay tọa độ $A$ để tìm hằng số.`),
        ],
        R`Mặt phẳng cần tìm là $x-y+z-1=0$.`,
        [{ expr: "Matrix([1,1,0]).cross(Matrix([-1,1,2]))[0]", expect: "2" }]),
    ],
    [
      luyen(R`Mặt phẳng qua $A(1;\ 2;\ 3)$ song song với $(P):\ 2x-y+2z-7=0$ có dạng $2x-y+2z+d=0$. Tìm $d$.`, R`Giá trị cần tìm là $d=-6$.`, [{ expr: "-(2*1-2+2*3)", expect: "-6" }], R`Thay $A$ được $2-2+6+d=0$ nên $d=-6$.`),
      luyen(R`Đường thẳng qua $A(2;\ 0;\ 1)$ song song với đường thẳng có chỉ phương $(1;\ 2;\ -1)$. Điểm ứng với $t=2$ có tung độ bằng bao nhiêu?`, R`Tung độ bằng $4$.`, [{ expr: "0+2*2", expect: "4" }], R`Phương trình có $y=0+2t$, nên với $t=2$ được $y=4$.`),
      luyen(R`Đường thẳng qua gốc $O$ vuông góc với mặt phẳng $x+y+z-3=0$ có phương trình $x=t$, $y=t$, $z=t$. Tìm $t$ ứng với hình chiếu của $O$ lên mặt phẳng.`, R`Giá trị $t=1$.`, [{ expr: "solve(x+x+x-3, x)[0]", expect: "1" }], R`Thay vào mặt phẳng được $3t-3=0$ nên $t=1$, hình chiếu là $(1;\ 1;\ 1)$.`),
    ],
    { topicId: "analytic" }),
]);
