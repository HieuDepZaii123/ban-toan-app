/** Lớp 12, phần chi tiết thứ tư: tương giao của hai đồ thị và tích có hướng trong không gian. */
import type { GradeChapter } from "./types.ts";
import { bai, buoc, chuong, luyen, vd } from "./types.ts";

const R = String.raw;

export const lop12TuongGiao: GradeChapter = chuong("tuong-giao-nc", "Tương giao của hai đồ thị", [
  bai("giao-do-thi-duong-thang", "Giao điểm của hai đồ thị và phương trình hoành độ",
    R`Hoành độ giao điểm của đồ thị $y=f(x)$ và $y=g(x)$ là nghiệm của phương trình $f(x)=g(x)$. Số giao điểm bằng số nghiệm thực phân biệt của phương trình này, và tung độ tìm bằng cách thay hoành độ vào một trong hai hàm số.`,
    [
      vd(R`Tìm số giao điểm của $y=x^3-3x$ và $y=x$.`,
        [
          buoc(R`Phương trình hoành độ là $x^3-3x=x$, tức $x^3-4x=0$.`, R`Chuyển mọi số hạng về một vế.`),
          buoc(R`Phân tích $x(x-2)(x+2)=0$ nên có ba nghiệm $x=0$, $x=2$, $x=-2$.`, R`Đặt nhân tử chung $x$ rồi dùng hiệu hai bình phương.`),
        ],
        R`Hai đồ thị có $3$ giao điểm.`,
        [{ expr: "len(Poly(x**3-3*x-x, x).real_roots())", expect: "3" }]),
      vd(R`Tìm tọa độ các giao điểm của $y=x^2-2x$ và $y=x-2$.`,
        [
          buoc(R`Phương trình hoành độ là $x^2-2x=x-2$, tức $x^2-3x+2=0$ nên $x=1$ hoặc $x=2$.`, R`Phân tích $(x-1)(x-2)=0$.`),
          buoc(R`Thay vào $y=x-2$ được các giao điểm $(1;\ -1)$ và $(2;\ 0)$.`, R`Dùng hàm số bậc nhất để tìm tung độ cho dễ.`),
        ],
        R`Các giao điểm là $(1;\ -1)$ và $(2;\ 0)$.`,
        [{ expr: "1**2-2*1", expect: "-1" }, { expr: "2**2-2*2", expect: "0" }]),
    ],
    [
      luyen(R`Đồ thị $y=x^3-3x$ cắt đường thẳng $y=-2$ tại bao nhiêu điểm phân biệt?`, R`Tại $2$ điểm.`, [{ expr: "len(Poly(x**3-3*x+2, x).sqf_part().real_roots())", expect: "2" }], R`Phương trình $x^3-3x+2=(x-1)^2(x+2)=0$ có nghiệm kép $x=1$ và nghiệm đơn $x=-2$, nên chỉ có hai điểm phân biệt.`),
      luyen(R`Đồ thị $y=x^2-1$ cắt $y=x+1$ tại hai điểm. Tìm tung độ của giao điểm có hoành độ dương.`, R`Tung độ bằng $3$.`, [{ expr: "Max(*solve(x**2-x-2, x))+1", expect: "3" }], R`Phương trình $x^2-x-2=0$ có nghiệm dương $x=2$, và $y=2+1=3$.`),
      luyen(R`Đồ thị $y=x^4-2x^2$ cắt đường thẳng $y=-1$ tại bao nhiêu điểm phân biệt?`, R`Tại $2$ điểm.`, [{ expr: "len(Poly(x**4-2*x**2+1, x).sqf_part().real_roots())", expect: "2" }], R`Phương trình $x^4-2x^2+1=(x^2-1)^2=0$ có hai nghiệm kép $x=\pm1$, nên chỉ có hai điểm chung phân biệt.`),
    ],
    { topicId: "survey" }),
  bai("tuong-giao-tham-so", "Tương giao có tham số",
    R`Khi đường thẳng chứa tham số $m$ cắt một đồ thị, phương trình hoành độ có tham số. Với phương trình bậc hai, số giao điểm phụ thuộc dấu của $\Delta$: hai điểm khi $\Delta>0$, một điểm tiếp xúc khi $\Delta=0$, không giao khi $\Delta<0$. Nếu phương trình có nghiệm cố định thì tách nghiệm đó ra trước.`,
    [
      vd(R`Tìm $m$ để $y=x+m$ cắt $y=x^2$ tại hai điểm phân biệt.`,
        [
          buoc(R`Phương trình hoành độ là $x^2-x-m=0$.`, R`Chuyển mọi số hạng về một vế.`),
          buoc(R`Cần $\Delta=1+4m>0$, tức $m>-\frac{1}{4}$.`, R`Phương trình bậc hai có hai nghiệm phân biệt khi biệt thức dương.`),
        ],
        R`Điều kiện là $m>-\frac{1}{4}$.`,
        [{ expr: "solve(1+4*x, x)[0]", expect: "-Rational(1,4)" }]),
      vd(R`Với giá trị nào của $m$ thì $y=m(x-1)$ cắt $y=x^2-1$ tại hai điểm phân biệt?`,
        [
          buoc(R`Phương trình hoành độ là $x^2-1=m(x-1)$, tức $(x-1)(x+1-m)=0$.`, R`Phân tích $x^2-1=(x-1)(x+1)$ rồi đặt nhân tử chung.`),
          buoc(R`Nghiệm là $x=1$ và $x=m-1$, và hai nghiệm khác nhau khi $m-1\ne1$, tức $m\ne2$.`, R`Hai nghiệm trùng nhau khi $m-1=1$.`),
        ],
        R`Hai điểm phân biệt khi $m\ne2$.`,
        [{ expr: "solve(x-1-1, x)[0]", expect: "2" }]),
    ],
    [
      luyen(R`Tìm $m$ để $y=2x+m$ tiếp xúc với $y=x^2$.`, R`Giá trị cần tìm là $m=-1$.`, [{ expr: "solve(4+4*x, x)[0]", expect: "-1" }], R`Phương trình $x^2-2x-m=0$ có $\Delta=4+4m=0$ khi $m=-1$, tức nghiệm kép.`),
      luyen(R`Có bao nhiêu số nguyên $m$ trong đoạn $[-5;\ 5]$ để $y=x+m$ cắt $y=x^2$ tại hai điểm phân biệt?`, R`Có $6$ số nguyên.`, [{ expr: "floor(5)-ceiling(-Rational(1,4))+1", expect: "6" }], R`Điều kiện là $m>-\frac{1}{4}$ nên $m\in\{0;\ 1;\ 2;\ 3;\ 4;\ 5\}$, gồm $6$ số.`),
      luyen(R`Đường thẳng $y=mx+1$ cắt parabol $y=x^2$ tại hai điểm có hoành độ $x_1$ và $x_2$. Tính $x_1x_2$.`, R`Tích bằng $-1$.`, [{ expr: "Rational(-1,1)", expect: "-1" }], R`Phương trình $x^2-mx-1=0$ có tích hai nghiệm bằng $\frac{c}{a}=-1$ theo định lí Vi-ét, với mọi $m$.`),
    ],
    { topicId: "survey" }),
  bai("tiep-xuc-hai-do-thi", "Hai đồ thị tiếp xúc nhau",
    R`Hai đồ thị $y=f(x)$ và $y=g(x)$ tiếp xúc nhau tại điểm có hoành độ $x_0$ khi $f(x_0)=g(x_0)$ và $f'(x_0)=g'(x_0)$, tức hai đồ thị có chung điểm và chung tiếp tuyến. Khi đó $x_0$ là nghiệm kép của phương trình $f(x)=g(x)$.`,
    [
      vd(R`Chứng tỏ $y=x^2$ và $y=2x-1$ tiếp xúc nhau tại $x=1$.`,
        [
          buoc(R`Tại $x=1$ có $f(1)=1$ và $g(1)=2-1=1$, hai giá trị bằng nhau.`, R`Điều kiện thứ nhất là hai đồ thị có chung điểm.`),
          buoc(R`Đạo hàm $f'(1)=2$ và $g'(1)=2$ cũng bằng nhau.`, R`Điều kiện thứ hai là hai đồ thị có cùng hệ số góc tiếp tuyến.`),
        ],
        R`Hai đồ thị tiếp xúc nhau tại điểm $(1;\ 1)$.`,
        [{ expr: "1**2-(2*1-1)", expect: "0" }, { expr: "diff(x**2, x).subs(x, 1)-2", expect: "0" }]),
      vd(R`Tìm $m$ để $y=x^3$ tiếp xúc với $y=3x+m$.`,
        [
          buoc(R`Cần $3x^2=3$ nên hoành độ tiếp điểm là $x=1$ hoặc $x=-1$.`, R`Hệ số góc hai tiếp tuyến phải bằng nhau.`),
          buoc(R`Từ $x^3=3x+m$ suy ra $m=x^3-3x$, bằng $-2$ khi $x=1$ và $2$ khi $x=-1$.`, R`Thay từng hoành độ vào phương trình hoành độ.`),
        ],
        R`Có hai giá trị $m=-2$ và $m=2$.`,
        [{ expr: "1**3-3*1", expect: "-2" }, { expr: "(-1)**3-3*(-1)", expect: "2" }]),
    ],
    [
      luyen(R`Tìm $m$ để $y=x^2$ tiếp xúc với $y=4x+m$.`, R`Giá trị cần tìm là $m=-4$.`, [{ expr: "solve(16+4*x, x)[0]", expect: "-4" }], R`Phương trình $x^2-4x-m=0$ có nghiệm kép khi $\Delta=16+4m=0$, tức $m=-4$.`),
      luyen(R`Tìm giá trị dương của $m$ để $y=x^3$ tiếp xúc với $y=12x+m$.`, R`Giá trị cần tìm là $m=16$.`, [{ expr: "(-2)**3-12*(-2)", expect: "16" }], R`Cần $3x^2=12$ nên $x=\pm2$, và $m=x^3-12x$ bằng $-16$ khi $x=2$ và $16$ khi $x=-2$.`),
      luyen(R`Đồ thị $y=x^3$ tiếp xúc với đường thẳng $y=3x+2$. Tìm hoành độ tiếp điểm.`, R`Hoành độ tiếp điểm là $-1$.`, [{ expr: "Min(*solve(3*x**2-3, x))", expect: "-1" }], R`Phương trình $x^3-3x-2=(x+1)^2(x-2)$ có nghiệm kép $x=-1$ nên đó là tiếp điểm, còn $x=2$ là giao điểm còn lại.`),
    ],
    { topicId: "survey" }),
]);

export const lop12TichCoHuong: GradeChapter = chuong("tich-co-huong", "Tích có hướng và ứng dụng trong không gian", [
  bai("tinh-tich-co-huong", "Tính tích có hướng của hai vectơ",
    R`Tích có hướng của $\vec a=(a_1;\ a_2;\ a_3)$ và $\vec b=(b_1;\ b_2;\ b_3)$ là $\left[\vec a,\vec b\right]=(a_2b_3-a_3b_2;\ a_3b_1-a_1b_3;\ a_1b_2-a_2b_1)$. Vectơ này vuông góc với cả $\vec a$ và $\vec b$, có độ dài $|\vec a|\,|\vec b|\sin\varphi$, và bằng $\vec0$ khi hai vectơ cùng phương.`,
    [
      vd(R`Tính $\left[\vec a,\vec b\right]$ với $\vec a=(1;\ 2;\ 3)$ và $\vec b=(2;\ -1;\ 0)$ rồi kiểm tra vuông góc với $\vec a$.`,
        [
          buoc(R`Tọa độ thứ nhất là $2\cdot0-3\cdot(-1)=3$, thứ hai là $3\cdot2-1\cdot0=6$, thứ ba là $1\cdot(-1)-2\cdot2=-5$.`, R`Áp dụng công thức cho từng tọa độ.`),
          buoc(R`Tích vô hướng với $\vec a$ là $3\cdot1+6\cdot2-5\cdot3=0$.`, R`Vuông góc khi tích vô hướng bằng $0$.`),
        ],
        R`Tích có hướng là $(3;\ 6;\ -5)$ và vuông góc với $\vec a$.`,
        [{ expr: "Matrix([1,2,3]).cross(Matrix([2,-1,0]))[0]", expect: "3" }, { expr: "Matrix([3,6,-5]).dot(Matrix([1,2,3]))", expect: "0" }]),
      vd(R`Hai vectơ $(1;\ 2;\ 3)$ và $(2;\ 4;\ 6)$ có tích có hướng bằng bao nhiêu?`,
        [
          buoc(R`Vì $(2;\ 4;\ 6)=2\cdot(1;\ 2;\ 3)$ nên hai vectơ cùng phương.`, R`Vectơ này gấp đôi vectơ kia.`),
          buoc(R`Do đó mọi tọa độ của tích có hướng bằng $0$, chẳng hạn $2\cdot6-3\cdot4=0$.`, R`Tích có hướng của hai vectơ cùng phương là $\vec0$.`),
        ],
        R`Tích có hướng bằng $\vec0$.`,
        [{ expr: "Matrix([1,2,3]).cross(Matrix([2,4,6])).norm()", expect: "0" }]),
    ],
    [
      luyen(R`Tính tọa độ thứ hai của $\left[\vec a,\vec b\right]$ với $\vec a=(2;\ 1;\ 0)$ và $\vec b=(1;\ 3;\ 1)$.`, R`Tọa độ thứ hai bằng $-2$.`, [{ expr: "Matrix([2,1,0]).cross(Matrix([1,3,1]))[1]", expect: "-2" }], R`Tọa độ thứ hai là $a_3b_1-a_1b_3=0\cdot1-2\cdot1=-2$.`),
      luyen(R`Tìm $m$ để $\vec a=(1;\ 2;\ m)$ và $\vec b=(2;\ 4;\ 6)$ cùng phương.`, R`Giá trị cần tìm là $m=3$.`, [{ expr: "solve(1*6-x*2, x)[0]", expect: "3" }], R`Cùng phương khi $\left[\vec a,\vec b\right]=\vec0$; tọa độ thứ hai là $m\cdot2-1\cdot6=0$ nên $m=3$.`),
      luyen(R`Tính độ dài của $\left[\vec a,\vec b\right]$ với $\vec a=(3;\ 0;\ 0)$ và $\vec b=(0;\ 4;\ 0)$.`, R`Độ dài bằng $12$.`, [{ expr: "Matrix([3,0,0]).cross(Matrix([0,4,0])).norm()", expect: "12" }], R`Tích có hướng là $(0;\ 0;\ 12)$ vì hai vectơ vuông góc với độ dài $3$ và $4$.`),
    ],
    { topicId: "analytic" }),
  bai("dien-tich-tam-giac", "Diện tích tam giác và hình bình hành",
    R`Diện tích tam giác $ABC$ là $S=\frac12\left|\left[\overrightarrow{AB},\overrightarrow{AC}\right]\right|$. Diện tích hình bình hành $ABCD$ là $\left|\left[\overrightarrow{AB},\overrightarrow{AD}\right]\right|$. Khoảng cách từ $C$ đến đường thẳng $AB$ bằng $\frac{\left|\left[\overrightarrow{AB},\overrightarrow{AC}\right]\right|}{|\overrightarrow{AB}|}$.`,
    [
      vd(R`Tính diện tích tam giác $ABC$ với $A(1;\ 0;\ 0)$, $B(0;\ 2;\ 0)$, $C(0;\ 0;\ 2)$.`,
        [
          buoc(R`Ta có $\overrightarrow{AB}=(-1;\ 2;\ 0)$ và $\overrightarrow{AC}=(-1;\ 0;\ 2)$, tích có hướng là $(4;\ 2;\ 2)$.`, R`Tính từng tọa độ theo công thức tích có hướng.`),
          buoc(R`Độ dài là $\sqrt{16+4+4}=2\sqrt6$ nên $S=\sqrt6$.`, R`Lấy một nửa độ dài tích có hướng.`),
        ],
        R`Diện tích bằng $\sqrt6$.`,
        [{ expr: "Matrix([-1,2,0]).cross(Matrix([-1,0,2])).norm()/2", expect: "sqrt(6)" }]),
      vd(R`Hình bình hành $ABCD$ có $\overrightarrow{AB}=(2;\ 0;\ 0)$ và $\overrightarrow{AD}=(0;\ 3;\ 4)$. Tính diện tích.`,
        [
          buoc(R`Tích có hướng là $(0\cdot4-0\cdot3;\ 0\cdot0-2\cdot4;\ 2\cdot3-0)=(0;\ -8;\ 6)$.`, R`Tính từng tọa độ theo công thức.`),
          buoc(R`Độ dài là $\sqrt{64+36}=10$.`, R`Diện tích hình bình hành bằng đúng độ dài này.`),
        ],
        R`Diện tích hình bình hành bằng $10$.`,
        [{ expr: "Matrix([2,0,0]).cross(Matrix([0,3,4])).norm()", expect: "10" }]),
    ],
    [
      luyen(R`Tính diện tích tam giác $ABC$ với $A(0;\ 0;\ 0)$, $B(3;\ 0;\ 0)$, $C(0;\ 4;\ 0)$.`, R`Diện tích bằng $6$.`, [{ expr: "Matrix([3,0,0]).cross(Matrix([0,4,0])).norm()/2", expect: "6" }], R`Tích có hướng của $(3;\ 0;\ 0)$ và $(0;\ 4;\ 0)$ có độ dài $12$ nên $S=6$.`),
      luyen(R`Tính diện tích tam giác $ABC$ với $A(0;\ 0;\ 0)$, $B(1;\ 1;\ 0)$, $C(0;\ 1;\ 1)$.`, R`Diện tích bằng $\frac{\sqrt3}{2}$.`, [{ expr: "Matrix([1,1,0]).cross(Matrix([0,1,1])).norm()/2", expect: "sqrt(3)/2" }], R`Tích có hướng là $(1;\ -1;\ 1)$ có độ dài $\sqrt3$, nên $S=\frac{\sqrt3}{2}$.`),
      luyen(R`Tính khoảng cách từ $C(0;\ 3;\ 0)$ đến đường thẳng $AB$ với $A(0;\ 0;\ 0)$ và $B(2;\ 0;\ 0)$.`, R`Khoảng cách bằng $3$.`, [{ expr: "Matrix([2,0,0]).cross(Matrix([0,3,0])).norm()/Matrix([2,0,0]).norm()", expect: "3" }], R`Ta có $\frac{|[\overrightarrow{AB},\overrightarrow{AC}]|}{|\overrightarrow{AB}|}=\frac{6}{2}=3$.`),
    ],
    { topicId: "analytic" }),
  bai("the-tich-hon-tap", "Thể tích hình hộp, tứ diện và điểm đồng phẳng",
    R`Thể tích hình hộp dựng trên ba vectơ $\vec a$, $\vec b$, $\vec c$ là $\left|\left[\vec a,\vec b\right]\cdot\vec c\right|$ (tích hỗn tạp). Thể tích tứ diện là một phần sáu giá trị này. Bốn điểm $A$, $B$, $C$, $D$ đồng phẳng khi tích hỗn tạp của $\overrightarrow{AB}$, $\overrightarrow{AC}$, $\overrightarrow{AD}$ bằng $0$.`,
    [
      vd(R`Tính thể tích hình hộp dựng trên $\vec a=(1;\ 0;\ 0)$, $\vec b=(0;\ 2;\ 0)$, $\vec c=(0;\ 0;\ 3)$ và thể tích tứ diện tương ứng.`,
        [
          buoc(R`Tích có hướng $\left[\vec a,\vec b\right]=(0;\ 0;\ 2)$ và tích vô hướng với $\vec c$ bằng $6$.`, R`Tính tích có hướng rồi nhân vô hướng với vectơ thứ ba.`),
          buoc(R`Thể tích hình hộp là $6$ và thể tích tứ diện là $\frac{6}{6}=1$.`, R`Tứ diện có thể tích bằng một phần sáu hình hộp.`),
        ],
        R`Thể tích hình hộp bằng $6$ và thể tích tứ diện bằng $1$.`,
        [{ expr: "abs(Matrix([0,0,2]).dot(Matrix([0,0,3])))", expect: "6" }]),
      vd(R`Ba vectơ $\vec a=(1;\ 2;\ 3)$, $\vec b=(0;\ 1;\ 1)$, $\vec c=(1;\ 3;\ 4)$ có đồng phẳng không?`,
        [
          buoc(R`Tích có hướng $\left[\vec a,\vec b\right]=(-1;\ -1;\ 1)$.`, R`Tính từng tọa độ theo công thức.`),
          buoc(R`Tích hỗn tạp là $-1-3+4=0$ nên ba vectơ đồng phẳng, thật vậy $\vec c=\vec a+\vec b$.`, R`Tích hỗn tạp bằng $0$ khi ba vectơ nằm trong cùng một mặt phẳng.`),
        ],
        R`Ba vectơ đồng phẳng.`,
        [{ expr: "Matrix([-1,-1,1]).dot(Matrix([1,3,4]))", expect: "0" }]),
    ],
    [
      luyen(R`Tứ diện $OABC$ có $A(2;\ 0;\ 0)$, $B(0;\ 3;\ 0)$, $C(0;\ 0;\ 4)$. Tính thể tích.`, R`Thể tích bằng $4$.`, [{ expr: "abs(Matrix([2,0,0]).dot(Matrix([0,3,0]).cross(Matrix([0,0,4]))))/6", expect: "4" }], R`Tích hỗn tạp là $2\cdot3\cdot4=24$ nên thể tích là $\frac{24}{6}=4$.`),
      luyen(R`Bốn điểm $A(0;\ 0;\ 0)$, $B(1;\ 0;\ 0)$, $C(0;\ 1;\ 0)$, $D(1;\ 1;\ m)$ đồng phẳng. Tìm $m$.`, R`Giá trị cần tìm là $m=0$.`, [{ expr: "solve(Matrix([1,0,0]).dot(Matrix([0,1,0]).cross(Matrix([1,1,x]))), x)[0]", expect: "0" }], R`Tích hỗn tạp của $\overrightarrow{AB}$, $\overrightarrow{AC}$, $\overrightarrow{AD}$ bằng $m$, nên đồng phẳng khi $m=0$.`),
      luyen(R`Hình hộp có $\overrightarrow{AB}=(1;\ 0;\ 0)$, $\overrightarrow{AD}=(1;\ 2;\ 0)$, $\overrightarrow{AA'}=(0;\ 1;\ 3)$. Tính thể tích.`, R`Thể tích bằng $6$.`, [{ expr: "abs(Matrix([1,0,0]).dot(Matrix([1,2,0]).cross(Matrix([0,1,3]))))", expect: "6" }], R`Tích có hướng của $\overrightarrow{AD}$ và $\overrightarrow{AA'}$ là $(6;\ -3;\ 1)$, tích vô hướng với $\overrightarrow{AB}$ bằng $6$.`),
    ],
    { topicId: "analytic" }),
  bai("mp-qua-ba-diem", "Mặt phẳng đi qua ba điểm",
    R`Mặt phẳng đi qua ba điểm không thẳng hàng $A$, $B$, $C$ có vectơ pháp tuyến $\vec n=\left[\overrightarrow{AB},\overrightarrow{AC}\right]$. Phương trình là $n_1(x-x_A)+n_2(y-y_A)+n_3(z-z_A)=0$. Ba điểm thẳng hàng khi tích có hướng này bằng $\vec0$.`,
    [
      vd(R`Viết phương trình mặt phẳng đi qua $A(1;\ 0;\ 0)$, $B(0;\ 1;\ 0)$, $C(0;\ 0;\ 1)$.`,
        [
          buoc(R`Ta có $\overrightarrow{AB}=(-1;\ 1;\ 0)$ và $\overrightarrow{AC}=(-1;\ 0;\ 1)$, tích có hướng là $(1;\ 1;\ 1)$.`, R`Tích có hướng là một pháp tuyến của mặt phẳng.`),
          buoc(R`Phương trình là $1(x-1)+y+z=0$, tức $x+y+z-1=0$.`, R`Dùng điểm $A$ làm điểm đi qua.`),
        ],
        R`Mặt phẳng cần tìm là $x+y+z-1=0$.`,
        [{ expr: "Matrix([-1,1,0]).cross(Matrix([-1,0,1]))[2]", expect: "1" }]),
      vd(R`Viết phương trình mặt phẳng đi qua $A(0;\ 0;\ 1)$, $B(1;\ 0;\ 0)$, $C(0;\ 2;\ 0)$.`,
        [
          buoc(R`Ta có $\overrightarrow{AB}=(1;\ 0;\ -1)$ và $\overrightarrow{AC}=(0;\ 2;\ -1)$, tích có hướng là $(2;\ 1;\ 2)$.`, R`Tính từng tọa độ của tích có hướng.`),
          buoc(R`Phương trình có dạng $2x+y+2z+d=0$ và đi qua $A$ nên $d=-2$, tức $2x+y+2z-2=0$.`, R`Thay tọa độ $A$ để tìm hằng số.`),
        ],
        R`Mặt phẳng cần tìm là $2x+y+2z-2=0$.`,
        [{ expr: "-(2*0+1*0+2*1)", expect: "-2" }]),
    ],
    [
      luyen(R`Mặt phẳng đi qua $A(1;\ 0;\ 0)$, $B(0;\ 2;\ 0)$, $C(0;\ 0;\ 3)$ có phương trình với hệ số của $x$ bằng $6$ và hằng số $d$. Tìm $d$.`, R`Giá trị cần tìm là $d=-6$.`, [{ expr: "-(6*1)", expect: "-6" }], R`Điểm $A$ thuộc mặt phẳng nên $6\cdot1+d=0$, tức $d=-6$.`),
      luyen(R`Tính khoảng cách từ gốc $O$ đến mặt phẳng $6x+3y+2z-6=0$.`, R`Khoảng cách bằng $\frac{6}{7}$.`, [{ expr: "Rational(6,1)/sqrt(6**2+3**2+2**2)", expect: "Rational(6,7)" }], R`Ta có $\frac{|-6|}{\sqrt{36+9+4}}=\frac{6}{7}$.`),
      luyen(R`Ba điểm $A(0;\ 0;\ 0)$, $B(1;\ 2;\ 3)$, $C(2;\ 4;\ m)$ thẳng hàng. Tìm $m$.`, R`Giá trị cần tìm là $m=6$.`, [{ expr: "solve(1*x-3*2, x)[0]", expect: "6" }], R`Cần $\left[\overrightarrow{AB},\overrightarrow{AC}\right]=\vec0$; tọa độ thứ hai là $3\cdot2-1\cdot m=0$ nên $m=6$.`),
    ],
    { topicId: "analytic" }),
]);
