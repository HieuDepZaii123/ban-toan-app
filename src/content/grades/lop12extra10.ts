/** Lớp 12, chi tiết thứ mười: ứng dụng vectơ trong không gian, từ chứng minh quan hệ đến tính góc và đặt hệ trục. */
import type { GradeChapter } from "./types.ts";
import { bai, buoc, chuong, luyen, vd } from "./types.ts";

const R = String.raw;

export const lop12VectoUngDung: GradeChapter = chuong("vecto-kg-ung-dung", "Ứng dụng vectơ trong không gian: chứng minh, tính góc và đặt hệ trục", [
  bai("chung-minh-vecto-kg", "Chứng minh quan hệ bằng vectơ: thẳng hàng, song song và đồng phẳng",
    R`Ba điểm $A$, $B$, $C$ thẳng hàng khi $\overrightarrow{AB}=k\overrightarrow{AC}$. Hai đường $AB$ và $CD$ song song khi $\overrightarrow{AB}=k\overrightarrow{CD}$ và $A$ không thuộc đường $CD$. Bốn điểm $A$, $B$, $C$, $D$ đồng phẳng khi $\overrightarrow{AD}=x\overrightarrow{AB}+y\overrightarrow{AC}$ với hai số $x$, $y$. Mỗi vectơ trong hình nên được viết qua ba vectơ cạnh không đồng phẳng rồi so sánh hệ số.`,
    [
      vd(R`Cho tứ diện $ABCD$, $M$ là trung điểm $AB$, $N$ là trung điểm $CD$ và $G$ là trung điểm $MN$. Chứng minh $\overrightarrow{GA}+\overrightarrow{GB}+\overrightarrow{GC}+\overrightarrow{GD}=\vec{0}$.`,
        [
          buoc(R`Vì $M$ là trung điểm $AB$ nên $\overrightarrow{GA}+\overrightarrow{GB}=2\overrightarrow{GM}$.`, R`Tổng hai vectơ cùng gốc tới hai đầu mút của một đoạn bằng hai lần vectơ tới trung điểm.`),
          buoc(R`Tương tự $\overrightarrow{GC}+\overrightarrow{GD}=2\overrightarrow{GN}$.`, R`Áp dụng cùng tính chất cho trung điểm $N$ của $CD$.`),
          buoc(R`Cộng hai đẳng thức được $2\left(\overrightarrow{GM}+\overrightarrow{GN}\right)=\vec{0}$ vì $G$ là trung điểm $MN$.`, R`Hai vectơ $\overrightarrow{GM}$ và $\overrightarrow{GN}$ đối nhau khi $G$ nằm chính giữa.`),
        ],
        R`Tổng bốn vectơ bằng $\vec{0}$, tức $G$ là trọng tâm của tứ diện.`,
        [{ expr: "Rational(1,2)*(1+1)-1", expect: "0" }]),
      vd(R`Cho hình hộp $ABCD.A'B'C'D'$. Chứng minh bốn điểm $A$, $B$, $C'$, $D'$ đồng phẳng.`,
        [
          buoc(R`Đặt $\vec a=\overrightarrow{AB}$, $\vec b=\overrightarrow{AD}$, $\vec c=\overrightarrow{AA'}$; khi đó $\overrightarrow{AC'}=\vec a+\vec b+\vec c$ và $\overrightarrow{AD'}=\vec b+\vec c$.`, R`Viết các vectơ cần xét qua ba vectơ cạnh không đồng phẳng của hình hộp.`),
          buoc(R`Do đó $\overrightarrow{AD'}=\overrightarrow{AC'}-\overrightarrow{AB}$, tức $\overrightarrow{AD'}$ là tổ hợp của $\overrightarrow{AB}$ và $\overrightarrow{AC'}$.`, R`Tổ hợp tuyến tính của hai vectơ cùng gốc cho thấy ba vectơ đồng phẳng.`),
        ],
        R`Bốn điểm $A$, $B$, $C'$, $D'$ đồng phẳng.`,
        [{ expr: "(Matrix([1,1,1])-Matrix([1,0,0]))[1]", expect: "1" }]),
    ],
    [
      luyen(R`Cho $G$ là trọng tâm tam giác $ABC$ và $O$ là điểm bất kỳ, $\overrightarrow{OA}+\overrightarrow{OB}+\overrightarrow{OC}=k\overrightarrow{OG}$. Tìm $k$.`, R`Giá trị cần tìm là $k=3$.`, [{ expr: "solve(x*Rational(1,3)-1, x)[0]", expect: "3" }], R`Vì $\overrightarrow{OG}=\frac13\left(\overrightarrow{OA}+\overrightarrow{OB}+\overrightarrow{OC}\right)$ nên $k=3$.`),
      luyen(R`Cho hình hộp $ABCD.A'B'C'D'$ và $\overrightarrow{AC'}=\overrightarrow{AB}+\overrightarrow{AD}+x\overrightarrow{AA'}$. Tìm $x$.`, R`Giá trị cần tìm là $x=1$.`, [{ expr: "Matrix([1,1,1])[2]-Matrix([1,1,0])[2]", expect: "1" }], R`Đường chéo $AC'$ bằng tổng ba vectơ cạnh với hệ số $1$ mỗi vectơ.`),
      { ...luyen(R`Cho hình hộp $ABCD.A'B'C'D'$. Xét tính đúng sai của từng ý.`, R`Ý a đúng, ý b đúng, ý c sai, ý d sai.`, [{ expr: "Matrix([[1,0,1],[1,1,0],[0,1,1]]).det()", expect: "2" }], R`Đặt $A$ làm gốc: ba vectơ từ $A$ tới $B'$, $C$, $D'$ có định thức $2$ khác $0$ nên không đồng phẳng, còn $\overrightarrow{BD'}=-\overrightarrow{AB}+\overrightarrow{AD}+\overrightarrow{AA'}$ nên ý c sai.`), ask: { kind: "truefalse", statements: [R`Có $\overrightarrow{AC'}=\overrightarrow{AB}+\overrightarrow{AD}+\overrightarrow{AA'}$.`, R`Bốn điểm $A$, $B$, $C'$, $D'$ đồng phẳng.`, R`Có $\overrightarrow{BD'}=\overrightarrow{AB}+\overrightarrow{AD}+\overrightarrow{AA'}$.`, R`Bốn điểm $A$, $B'$, $C$, $D'$ đồng phẳng.`], truth: [true, true, false, false] } },
    ],
    { topicId: "analytic" }),
  bai("tinh-goc-do-dai-vecto", "Tính độ dài và góc bằng tích vô hướng trong hình",
    R`Bình phương độ dài bằng bình phương vô hướng: $AB^2=\overrightarrow{AB}\cdot\overrightarrow{AB}$. Tích vô hướng $\vec a\cdot\vec b=\left|\vec a\right|\left|\vec b\right|\cos\left(\vec a,\vec b\right)$, và góc $\varphi$ giữa hai đường thẳng thỏa $\cos\varphi=\frac{\left|\vec u\cdot\vec v\right|}{\left|\vec u\right|\left|\vec v\right|}$. Để tính, ta viết hai vectơ qua ba vectơ cạnh đã biết độ dài và góc từng đôi, rồi khai triển tích vô hướng.`,
    [
      vd(R`Cho tứ diện đều $ABCD$ cạnh $1$. Tính góc giữa hai đường thẳng $AB$ và $CD$.`,
        [
          buoc(R`Viết $\overrightarrow{CD}=\overrightarrow{AD}-\overrightarrow{AC}$, nên $\overrightarrow{AB}\cdot\overrightarrow{CD}=\overrightarrow{AB}\cdot\overrightarrow{AD}-\overrightarrow{AB}\cdot\overrightarrow{AC}$.`, R`Đưa vectơ $\overrightarrow{CD}$ về các vectơ chung gốc $A$ với $\overrightarrow{AB}$.`),
          buoc(R`Mỗi tích vô hướng bằng $1\cdot1\cdot\cos60^\circ=\frac12$, nên hiệu bằng $0$.`, R`Mọi góc ở đỉnh $A$ của các mặt tam giác đều bằng $60^\circ$.`),
        ],
        R`Hai đường $AB$ và $CD$ vuông góc nhau.`,
        [{ expr: "1*1*cos(pi/3)-1*1*cos(pi/3)", expect: "0" }]),
      vd(R`Cho hình lập phương $ABCD.A'B'C'D'$ cạnh $1$. Tính cô-sin góc giữa hai đường chéo $AC'$ và $BD'$.`,
        [
          buoc(R`Đặt $\vec a=\overrightarrow{AB}$, $\vec b=\overrightarrow{AD}$, $\vec c=\overrightarrow{AA'}$; khi đó $\overrightarrow{AC'}=\vec a+\vec b+\vec c$ và $\overrightarrow{BD'}=-\vec a+\vec b+\vec c$.`, R`Ba vectơ cạnh đôi một vuông góc và có độ dài bằng $1$.`),
          buoc(R`Tích vô hướng là $-1+1+1=1$ và mỗi vectơ có độ dài $\sqrt3$.`, R`Các tích vô hướng chéo giữa $\vec a$, $\vec b$, $\vec c$ đều bằng $0$.`),
          buoc(R`Do đó $\cos\varphi=\frac{1}{\sqrt3\cdot\sqrt3}=\frac13$.`, R`Áp dụng công thức cô-sin với trị tuyệt đối của tích vô hướng.`),
        ],
        R`Cô-sin của góc giữa hai đường chéo bằng $\frac13$.`,
        [{ expr: "Matrix([1,1,1]).dot(Matrix([-1,1,1]))", expect: "1" }]),
    ],
    [
      luyen(R`Cho hình lập phương $ABCD.A'B'C'D'$ cạnh $1$. Tính $\overrightarrow{AC}\cdot\overrightarrow{AC'}$.`, R`Tích vô hướng bằng $2$.`, [{ expr: "Matrix([1,1,0]).dot(Matrix([1,1,1]))", expect: "2" }], R`Ta có $\overrightarrow{AC}=\vec a+\vec b$ và $\overrightarrow{AC'}=\vec a+\vec b+\vec c$ nên tích vô hướng là $1+1=2$.`),
      luyen(R`Cho tứ diện đều $ABCD$ cạnh $2$. Tính $\overrightarrow{AB}\cdot\overrightarrow{AC}$.`, R`Tích vô hướng bằng $2$.`, [{ expr: "2*2*Rational(1,2)", expect: "2" }], R`Tích vô hướng bằng $2\cdot2\cdot\cos60^\circ=2$.`),
      { ...luyen(R`Cho hình lập phương $ABCD.A'B'C'D'$ cạnh $1$. Cô-sin góc giữa hai đường chéo $AC'$ và $BD'$ bằng bao nhiêu?`, R`Cô-sin bằng $\frac13$.`, [{ expr: "Matrix([1,1,1]).dot(Matrix([-1,1,1]))", expect: "1" }], R`Tích vô hướng bằng $1$ và mỗi đường chéo có độ dài $\sqrt3$, nên cô-sin bằng $\frac13$.`), ask: { kind: "choice", options: [R`$\frac13$`, R`$\frac{\sqrt3}{3}$`, R`$\frac12$`], correct: 0 } },
    ],
    { topicId: "analytic" }),
  bai("toa-do-hoa-hinh", "Đặt hệ trục tọa độ vào hình để tính góc và khoảng cách",
    R`Khi một đỉnh có ba cạnh đôi một vuông góc, ta đặt đỉnh đó làm gốc $O$ và ba cạnh dọc ba trục. Mọi đỉnh có tọa độ, rồi góc, khoảng cách và thể tích được tính bằng công thức Oxyz. Phương pháp này thay cho việc dựng hình khi hình khó vẽ đường vuông góc.`,
    [
      vd(R`Cho hình chóp $S.ABCD$ có đáy là hình vuông cạnh $2$, $SA$ vuông góc với đáy và $SA=2$. Tính khoảng cách từ $A$ đến mặt phẳng $(SBD)$.`,
        [
          buoc(R`Đặt $A(0;\ 0;\ 0)$, $B(2;\ 0;\ 0)$, $D(0;\ 2;\ 0)$ và $S(0;\ 0;\ 2)$.`, R`Ba cạnh $AB$, $AD$, $AS$ đôi một vuông góc nên đặt dọc ba trục.`),
          buoc(R`Mặt phẳng $(SBD)$ cắt ba trục tại $2$, $2$, $2$ nên có phương trình $x+y+z-2=0$.`, R`Dùng dạng chắn trục vì ba giao điểm với trục đã biết.`),
          buoc(R`Khoảng cách từ $A$ là $\frac{\left|-2\right|}{\sqrt3}=\frac{2\sqrt3}{3}$.`, R`Thay tọa độ $A$ vào vế trái rồi chia cho độ dài pháp tuyến.`),
        ],
        R`Khoảng cách bằng $\frac{2\sqrt3}{3}$.`,
        [{ expr: "2/sqrt(3)", expect: "2*sqrt(3)/3" }]),
      vd(R`Với hình chóp ở ví dụ trên, chứng minh $SC$ vuông góc với $BD$.`,
        [
          buoc(R`Ta có $C(2;\ 2;\ 0)$, nên $\overrightarrow{SC}=(2;\ 2;\ -2)$ và $\overrightarrow{BD}=(-2;\ 2;\ 0)$.`, R`Lấy tọa độ điểm cuối trừ điểm đầu.`),
          buoc(R`Tích vô hướng là $-4+4+0=0$ nên hai đường vuông góc.`, R`Hai đường vuông góc khi tích vô hướng của hai chỉ phương bằng $0$.`),
        ],
        R`Hai đường thẳng $SC$ và $BD$ vuông góc nhau.`,
        [{ expr: "Matrix([2,2,-2]).dot(Matrix([-2,2,0]))", expect: "0" }]),
    ],
    [
      luyen(R`Hình chóp $S.ABC$ có $SA$, $AB$, $AC$ đôi một vuông góc và $SA=AB=AC=1$. Tính thể tích.`, R`Thể tích bằng $\frac16$.`, [{ expr: "Abs(Matrix([[1,0,0],[0,1,0],[0,0,1]]).det())/6", expect: "1/6" }], R`Đặt $A$ làm gốc, định thức ba vectơ cạnh bằng $1$ nên thể tích là $\frac16$.`),
      luyen(R`Với hình chóp trên, mặt phẳng $(SBC)$ có phương trình $x+y+z-1=0$. Tính $\overrightarrow{AS}\cdot\vec n$ với $\vec n=(1;\ 1;\ 1)$ và $S(0;\ 0;\ 1)$.`, R`Tích vô hướng bằng $1$.`, [{ expr: "Matrix([0,0,1]).dot(Matrix([1,1,1]))", expect: "1" }], R`Ta có $\overrightarrow{AS}=(0;\ 0;\ 1)$ nên tích vô hướng với $(1;\ 1;\ 1)$ bằng $1$.`),
      { ...luyen(R`Với hình chóp trên, tọa độ trọng tâm của tam giác $SBC$ là điểm nào?`, R`Trọng tâm là $\left(\frac13;\ \frac13;\ \frac13\right)$.`, [{ expr: "(0+1+0)*Rational(1,3)", expect: "1/3" }], R`Với $S(0;\ 0;\ 1)$, $B(1;\ 0;\ 0)$, $C(0;\ 1;\ 0)$ mỗi tọa độ của trọng tâm bằng $\frac{1}{3}$.`), ask: { kind: "choice", options: [R`$\left(\frac13;\ \frac13;\ \frac13\right)$`, R`$\left(\frac12;\ \frac12;\ \frac12\right)$`, R`$\left(1;\ 1;\ 1\right)$`], correct: 0 } },
    ],
    { topicId: "analytic" }),
]);
