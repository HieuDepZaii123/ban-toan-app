/** Lớp 12, chi tiết thứ chín: khoảng cách trong Oxyz và cực trị của hiệu hai khoảng cách. */
import type { GradeLesson } from "./types.ts";
import { bai, buoc, luyen, vd } from "./types.ts";

const R = String.raw;

export const kcDiemOxyz: GradeLesson = bai("kc-diem-oxyz", "Khoảng cách trong Oxyz: điểm đến mặt phẳng, hai mặt song song, điểm đến đường thẳng",
  R`Khoảng cách từ $M(x_0;\ y_0;\ z_0)$ đến mặt phẳng $(P):\ Ax+By+Cz+D=0$ là $\frac{\left|Ax_0+By_0+Cz_0+D\right|}{\sqrt{A^2+B^2+C^2}}$. Hai mặt phẳng song song có khoảng cách bằng khoảng cách từ một điểm bất kỳ của mặt này đến mặt kia, và khi cùng pháp tuyến thì bằng $\frac{\left|D_1-D_2\right|}{\sqrt{A^2+B^2+C^2}}$. Khoảng cách từ $M$ đến đường thẳng qua $A$ với chỉ phương $\vec u$ là $\frac{\left|\left[\overrightarrow{AM},\vec u\right]\right|}{\left|\vec u\right|}$.`,
  [
    vd(R`Tính khoảng cách từ $M(1;\ 2;\ 3)$ đến $(P):\ 2x-y+2z-4=0$.`,
      [
        buoc(R`Giá trị của vế trái tại $M$ là $2-2+6-4=2$.`, R`Thay tọa độ điểm vào vế trái của phương trình mặt phẳng.`),
        buoc(R`Mẫu số là $\sqrt{4+1+4}=3$, nên khoảng cách bằng $\frac23$.`, R`Mẫu số là độ dài của vectơ pháp tuyến.`),
      ],
      R`Khoảng cách bằng $\frac23$.`,
      [{ expr: "Abs(2-2+6-4)/sqrt(4+1+4)", expect: "2/3" }]),
    vd(R`Tính khoảng cách từ $M(1;\ 2;\ 3)$ đến đường thẳng $\Delta$ qua $A(1;\ 0;\ 0)$ với chỉ phương $\vec u=(0;\ 1;\ 1)$.`,
      [
        buoc(R`Ta có $\overrightarrow{AM}=(0;\ 2;\ 3)$ và $\left[\vec u,\overrightarrow{AM}\right]=(1;\ 0;\ 0)$.`, R`Tích có hướng cho diện tích hình bình hành dựng trên hai vectơ.`),
        buoc(R`Khoảng cách là $\frac{1}{\sqrt2}=\frac{\sqrt2}{2}$.`, R`Chia diện tích hình bình hành cho độ dài đáy $\left|\vec u\right|$ để được chiều cao.`),
      ],
      R`Khoảng cách bằng $\frac{\sqrt2}{2}$.`,
      [{ expr: "Matrix([0,1,1]).cross(Matrix([0,2,3])).norm()/sqrt(2)", expect: "sqrt(2)/2" }]),
  ],
  [
    luyen(R`Tính khoảng cách từ gốc $O$ đến mặt phẳng $2x-2y+z-6=0$.`, R`Khoảng cách bằng $2$.`, [{ expr: "6/sqrt(4+4+1)", expect: "2" }], R`Ta có $\frac{\left|-6\right|}{\sqrt{4+4+1}}=\frac63=2$.`),
    luyen(R`Tính khoảng cách giữa hai mặt phẳng $2x+2y-z+3=0$ và $2x+2y-z-6=0$.`, R`Khoảng cách bằng $3$.`, [{ expr: "Abs(3-(-6))/sqrt(4+4+1)", expect: "3" }], R`Hai mặt có cùng pháp tuyến nên khoảng cách là $\frac{\left|3+6\right|}{3}=3$.`),
    { ...luyen(R`Cho $(P):\ x+2y+2z-6=0$. Xét tính đúng sai của từng ý.`, R`Ý a đúng, ý b đúng, ý c sai, ý d đúng.`, [{ expr: "6/sqrt(1+4+4)", expect: "2" }], R`Khoảng cách từ $O$ là $\frac63=2$, từ $M(1;\ 1;\ 1)$ là $\frac{1}{3}$, giữa hai mặt song song là $\frac{\left|-6-3\right|}{3}=3$ chứ không phải $1$, và hằng số mới $D'$ thỏa $\left|D'+6\right|=9$ cho đúng hai giá trị.`), ask: { kind: "truefalse", statements: [R`Khoảng cách từ gốc $O$ đến $(P)$ bằng $2$.`, R`Khoảng cách từ $M(1;\ 1;\ 1)$ đến $(P)$ bằng $\frac13$.`, R`Khoảng cách giữa $(P)$ và $(Q):\ x+2y+2z+3=0$ bằng $1$.`, R`Có đúng hai mặt phẳng song song với $(P)$ và cách $(P)$ một khoảng bằng $3$.`], truth: [true, true, false, true] } },
  ],
  { topicId: "analytic" });

export const cucTriHieuOxyz: GradeLesson = bai("cuc-tri-hieu-oxyz", "Cực trị của hiệu hai khoảng cách và khoảng cách nhỏ nhất",
  R`Với $M\in(P)$ và hai điểm $A$, $B$ nằm cùng phía $(P)$, ta có $\left|MA-MB\right|\le AB$ và dấu bằng xảy ra khi $M$ là giao điểm của đường thẳng $AB$ với $(P)$, với điều kiện $AB$ không song song với $(P)$. Nếu $A$, $B$ nằm khác phía thì lấy đối xứng một điểm qua $(P)$ để đưa về trường hợp cùng phía. Khoảng cách nhỏ nhất từ một điểm $A$ đến một điểm $M$ chạy trên đường thẳng $d$ đạt tại hình chiếu vuông góc của $A$ lên $d$, tức khi $\overrightarrow{AM}\cdot\vec u=0$.`,
  [
    vd(R`Cho $(P):\ z=0$, $A(1;\ 2;\ 3)$ và $B(3;\ 0;\ 1)$. Tìm giá trị lớn nhất của $\left|MA-MB\right|$ khi $M\in(P)$ và điểm $M$ tương ứng.`,
      [
        buoc(R`Hai điểm cùng phía $(P)$ vì cả hai có $z>0$, nên $\left|MA-MB\right|\le AB=\sqrt{4+4+4}=2\sqrt3$.`, R`Bất đẳng thức tam giác cho hiệu hai cạnh không vượt quá cạnh thứ ba.`),
        buoc(R`Đường $AB$ là $(1+2t;\ 2-2t;\ 3-2t)$; $z=0$ cho $t=\frac32$ nên $M=(4;\ -1;\ 0)$.`, R`Dấu bằng xảy ra khi ba điểm $A$, $B$, $M$ thẳng hàng với $M$ ngoài đoạn $AB$.`),
      ],
      R`Giá trị lớn nhất là $2\sqrt3$, đạt tại $M(4;\ -1;\ 0)$.`,
      [{ expr: "sqrt(4+4+4)", expect: "2*sqrt(3)" }, { expr: "Rational(3,2)*2-3", expect: "0" }]),
    vd(R`Tìm điểm $M$ trên $d:\ x=t,\ y=1+t,\ z=2t$ gần $A(1;\ 0;\ 0)$ nhất và tính khoảng cách $MA$ nhỏ nhất.`,
      [
        buoc(R`Với $M(t;\ 1+t;\ 2t)$ ta có $\overrightarrow{AM}=(t-1;\ 1+t;\ 2t)$ và $\vec u=(1;\ 1;\ 2)$.`, R`Biểu diễn $M$ theo tham số của đường thẳng.`),
        buoc(R`Điều kiện $\overrightarrow{AM}\cdot\vec u=0$ cho $6t=0$, nên $t=0$ và $M(0;\ 1;\ 0)$.`, R`Điểm gần nhất là chân đường vuông góc hạ từ $A$ xuống $d$.`),
        buoc(R`Khoảng cách nhỏ nhất là $MA=\sqrt{1+1+0}=\sqrt2$.`, R`Tính độ dài của $\overrightarrow{AM}=(-1;\ 1;\ 0)$ tại $t=0$.`),
      ],
      R`Điểm gần nhất là $M(0;\ 1;\ 0)$ và $MA=\sqrt2$.`,
      [{ expr: "solve((x-1)+(1+x)+4*x, x)[0]", expect: "0" }, { expr: "sqrt(1+1)", expect: "sqrt(2)" }]),
  ],
  [
    luyen(R`Cho $(P):\ z=0$, $A(0;\ 0;\ 1)$ và $B(0;\ 4;\ 4)$ nằm cùng phía $(P)$. Tìm giá trị lớn nhất của $\left|MA-MB\right|$ với $M\in(P)$.`, R`Giá trị lớn nhất bằng $5$.`, [{ expr: "sqrt(16+9)", expect: "5" }], R`Ta có $\left|MA-MB\right|\le AB=\sqrt{0+16+9}=5$, và dấu bằng đạt được.`),
    luyen(R`Tìm khoảng cách nhỏ nhất từ gốc $O$ đến một điểm của đường thẳng qua $P_0(3;\ 0;\ 0)$ với chỉ phương $(0;\ 3;\ 4)$.`, R`Khoảng cách nhỏ nhất bằng $3$.`, [{ expr: "sqrt(0+144+81)/5", expect: "3" }], R`Vì $\overrightarrow{OP_0}\cdot\vec u=0$ nên $P_0$ là chân đường vuông góc và khoảng cách bằng $OP_0=3$.`),
    { ...luyen(R`Cho $(P):\ z=0$ và hai điểm $A(0;\ 0;\ 1)$, $B(0;\ 3;\ -2)$ nằm khác phía $(P)$. Để tìm giá trị lớn nhất của $\left|MA-MB\right|$ ta nên làm gì trước?`, R`Lấy đối xứng một điểm qua $(P)$ để đưa về trường hợp hai điểm cùng phía.`, [{ expr: "sqrt(0+9+1)", expect: "sqrt(10)" }], R`Với hai điểm khác phía, giao điểm của $AB$ với $(P)$ cho hiệu nhỏ chứ không phải lớn nhất, nên phải đối xứng một điểm trước rồi lấy $A'B=\sqrt{10}$.`), ask: { kind: "choice", options: [R`Lấy đối xứng một điểm qua $(P)$ rồi dùng bất đẳng thức tam giác.`, R`Lấy giao điểm của $AB$ với $(P)$.`, R`Kết luận không có giá trị lớn nhất.`], correct: 0 } },
  ],
  { topicId: "analytic" });
