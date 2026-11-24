/** Lớp 10 và 11, phần chi tiết: hàm số, tọa độ vectơ, lượng giác nâng cao, mũ và logarit nâng cao. */
import type { GradeChapter } from "./types.ts";
import { bai, buoc, chuong, luyen, vd } from "./types.ts";

const R = String.raw;

export const lop10HamSo: GradeChapter = chuong("ham-so-10", "Hàm số và các tính chất", [
  bai("tap-xac-dinh", "Tập xác định của hàm số",
    R`Tập xác định của hàm số là tập các giá trị $x$ để biểu thức có nghĩa. Mẫu số phải khác $0$, biểu thức dưới căn bậc hai phải không âm, và biểu thức dưới căn nằm ở mẫu phải dương.`,
    [
      vd(R`Tìm tập xác định của $y=\frac{x+1}{x^2-4}$.`,
        [
          buoc(R`Hàm số xác định khi mẫu khác $0$, tức là $x^2-4\ne0$.`, R`Phân số chỉ có nghĩa khi mẫu khác $0$.`),
          buoc(R`Ta có $x^2-4=0$ khi $x=2$ hoặc $x=-2$, nên bỏ hai giá trị này.`, R`Giải phương trình mẫu bằng $0$ để biết cần loại giá trị nào.`),
        ],
        R`Tập xác định là $\mathbb{R}\setminus\{-2;\ 2\}$.`,
        [{ expr: "Max(*solve(x**2-4, x))", expect: "2" }, { expr: "Min(*solve(x**2-4, x))", expect: "-2" }]),
      vd(R`Tìm tập xác định của $y=\sqrt{3-x}$.`,
        [
          buoc(R`Biểu thức dưới căn phải không âm, tức là $3-x\ge0$.`, R`Căn bậc hai của số âm không có nghĩa trong tập số thực.`),
          buoc(R`Chuyển vế được $x\le3$.`, R`Cộng $x$ vào hai vế của $3-x\ge0$; giá trị $x=3$ làm biểu thức bằng $0$ nên vẫn thuộc tập xác định.`),
        ],
        R`Tập xác định là $(-\infty;\ 3]$.`,
        [{ expr: "solve(3-x, x)[0]", expect: "3" }]),
    ],
    [
      luyen(R`Hàm số $y=\frac{1}{x+5}$ không xác định tại giá trị $x$ nào?`, R`Tại $x=-5$.`, [{ expr: "solve(x+5, x)[0]", expect: "-5" }], R`Mẫu bằng $0$ khi $x+5=0$, tức $x=-5$.`),
      luyen(R`Giá trị nhỏ nhất của $x$ để $\sqrt{2x-6}$ có nghĩa là bao nhiêu?`, R`Giá trị nhỏ nhất bằng $3$.`, [{ expr: "solve(2*x-6, x)[0]", expect: "3" }], R`Cần $2x-6\ge0$, tức $x\ge3$.`),
      luyen(R`Có bao nhiêu số nguyên $x$ thuộc tập xác định của $y=\sqrt{6-x}+\sqrt{x+2}$?`, R`Có $9$ số nguyên.`, [{ expr: "6-(-2)+1", expect: "9" }], R`Cần $6-x\ge0$ và $x+2\ge0$, tức $-2\le x\le6$, có $6-(-2)+1=9$ số nguyên.`),
    ],
    { topicId: "quadratic" }),
  bai("chan-le", "Hàm số chẵn và hàm số lẻ",
    R`Hàm số $f$ có tập xác định đối xứng qua $0$ gọi là chẵn nếu $f(-x)=f(x)$ với mọi $x$, và gọi là lẻ nếu $f(-x)=-f(x)$ với mọi $x$. Đồ thị hàm chẵn đối xứng qua trục tung, đồ thị hàm lẻ đối xứng qua gốc tọa độ.`,
    [
      vd(R`Xét tính chẵn lẻ của $f(x)=x^4-2x^2$.`,
        [
          buoc(R`Tập xác định là $\mathbb{R}$, đối xứng qua $0$.`, R`Điều kiện đầu tiên là tập xác định phải đối xứng.`),
          buoc(R`Ta có $f(-x)=(-x)^4-2(-x)^2=x^4-2x^2=f(x)$.`, R`Lũy thừa chẵn của $-x$ bằng lũy thừa chẵn của $x$.`),
        ],
        R`Hàm số $f$ là hàm số chẵn.`,
        [{ expr: "(-2)**4-2*(-2)**2", expect: "8" }, { expr: "2**4-2*2**2", expect: "8" }]),
      vd(R`Xét tính chẵn lẻ của $f(x)=x^2+x$.`,
        [
          buoc(R`Tính thử tại $x=1$: $f(1)=2$ và $f(-1)=0$.`, R`Một cặp giá trị đủ để loại một tính chất.`),
          buoc(R`Vì $f(-1)=0$ khác $f(1)=2$ và khác $-f(1)=-2$, nên hàm số không chẵn cũng không lẻ.`, R`Chẵn cần $f(-1)=f(1)$ và lẻ cần $f(-1)=-f(1)$.`),
        ],
        R`Hàm số không chẵn và không lẻ.`,
        [{ expr: "(-1)**2+(-1)", expect: "0" }, { expr: "1**2+1", expect: "2" }]),
    ],
    [
      luyen(R`Với $f(x)=x^3-3x$, rút gọn $f(x)+f(-x)$ để quyết định hàm số chẵn hay lẻ.`, R`Bằng $0$ với mọi $x$, nên hàm số lẻ.`, [{ expr: "expand((-x)**3-3*(-x)+x**3-3*x)", expect: "0" }], R`Ta có $f(-x)=-x^3+3x=-f(x)$, nên $f(x)+f(-x)=0$ với mọi $x$, đúng là hàm số lẻ.`),
      luyen(R`Với $f(x)=x^2+1$, giá trị $f(3)-f(-3)$ bằng bao nhiêu?`, R`Bằng $0$.`, [{ expr: "3**2+1-((-3)**2+1)", expect: "0" }], R`Hàm số chẵn nên $f(-3)=f(3)$, và hiệu bằng $0$.`),
      luyen(R`Tìm $m$ để $f(x)=x^3+mx^2$ là hàm số lẻ.`, R`Giá trị cần tìm là $m=0$.`, [{ expr: "solve((1+x)+(-1+x), x)[0]", expect: "0" }], R`Hàm số lẻ cần $f(1)+f(-1)=2m=0$, và khi $m=0$ thì $f(x)=x^3$ đúng là hàm số lẻ.`),
    ],
    { topicId: "quadratic" }),
  bai("tinh-tien-do-thi", "Tịnh tiến đồ thị hàm số",
    R`Đồ thị của $y=f(x)+a$ nhận được từ đồ thị $y=f(x)$ bằng cách tịnh tiến lên $a$ đơn vị. Đồ thị của $y=f(x-b)$ nhận được bằng cách tịnh tiến sang phải $b$ đơn vị. Các số âm cho chiều ngược lại.`,
    [
      vd(R`Đồ thị $y=x^2$ tịnh tiến sang phải $2$ đơn vị và lên $3$ đơn vị. Viết hàm số mới và tìm đỉnh.`,
        [
          buoc(R`Tịnh tiến sang phải $2$ đơn vị thay $x$ bằng $x-2$, rồi lên $3$ đơn vị thì cộng $3$.`, R`Sang phải $2$ đơn vị là thay $x$ bằng $x-2$, lên $3$ đơn vị là cộng $3$ vào hàm số.`),
          buoc(R`Hàm số mới là $y=(x-2)^2+3$, có đỉnh $(2;\ 3)$.`, R`Đỉnh của $y=x^2$ là $(0;\ 0)$ đi theo phép tịnh tiến sang $(2;\ 3)$.`),
        ],
        R`Hàm số mới là $y=(x-2)^2+3$ với đỉnh $(2;\ 3)$.`,
        [{ expr: "(2-2)**2+3", expect: "3" }]),
      vd(R`Đồ thị $y=x^2$ tịnh tiến sang trái $1$ đơn vị và xuống $2$ đơn vị. Tính giá trị hàm số mới tại $x=0$.`,
        [
          buoc(R`Sang trái $1$ đơn vị là thay $x$ bằng $x+1$, xuống $2$ đơn vị là trừ $2$.`, R`Chiều sang trái ứng với dấu cộng trong ngoặc.`),
          buoc(R`Hàm số mới là $y=(x+1)^2-2$, nên tại $x=0$ có $y=1-2=-1$.`, R`Thay $x=0$ vào hàm số mới.`),
        ],
        R`Giá trị tại $x=0$ bằng $-1$.`,
        [{ expr: "(0+1)**2-2", expect: "-1" }]),
    ],
    [
      luyen(R`Đồ thị $y=|x|$ tịnh tiến sang trái $2$ đơn vị và xuống $1$ đơn vị. Hàm số mới đạt giá trị nhỏ nhất bằng bao nhiêu?`, R`Giá trị nhỏ nhất bằng $-1$.`, [{ expr: "abs(-2+2)-1", expect: "-1" }], R`Hàm số mới là $y=|x+2|-1$, nhỏ nhất khi $x=-2$ và bằng $0-1=-1$.`),
      luyen(R`Đồ thị $y=x^2$ tịnh tiến sang phải $a$ đơn vị và lên $5$ đơn vị đi qua điểm $(4;\ 6)$ với $a<4$. Tìm $a$.`, R`Giá trị cần tìm là $a=3$.`, [{ expr: "Min(*solve((4-x)**2-1, x))", expect: "3" }], R`Hàm số mới là $y=(x-a)^2+5$ nên $(4-a)^2+5=6$, tức $(4-a)^2=1$, và với $a<4$ được $a=3$.`),
      luyen(R`Đồ thị $y=x^2$ tịnh tiến sang phải $2$ đơn vị và lên $b$ đơn vị thì đi qua điểm $(0;\ 7)$. Tìm $b$.`, R`Giá trị cần tìm là $b=3$.`, [{ expr: "solve((0-2)**2+x-7, x)[0]", expect: "3" }], R`Hàm số mới là $y=(x-2)^2+b$, thay $(0;\ 7)$ được $4+b=7$ nên $b=3$.`),
    ],
    { topicId: "quadratic" }),
  bai("don-dieu-bac-hai", "Tính đơn điệu của hàm số bậc hai",
    R`Hàm số $y=ax^2+bx+c$ có đỉnh tại $x=-\frac{b}{2a}$. Khi $a>0$ hàm số nghịch biến trên khoảng bên trái đỉnh và đồng biến trên khoảng bên phải, còn khi $a<0$ thì ngược lại.`,
    [
      vd(R`Xét chiều biến thiên của $y=x^2-4x+1$.`,
        [
          buoc(R`Hoành độ đỉnh là $-\frac{-4}{2\cdot1}=2$.`, R`Thay $a=1$ và $b=-4$ vào công thức $-\frac{b}{2a}$.`),
          buoc(R`Vì $a=1>0$ nên hàm số nghịch biến trên $(-\infty;\ 2)$ và đồng biến trên $(2;\ +\infty)$.`, R`Parabol quay lên, nên giá trị giảm rồi tăng quanh đỉnh.`),
        ],
        R`Nghịch biến trên $(-\infty;\ 2)$ và đồng biến trên $(2;\ +\infty)$.`,
        [{ expr: "Rational(4,2)", expect: "2" }]),
      vd(R`Xét chiều biến thiên của $y=-2x^2+8x$.`,
        [
          buoc(R`Hoành độ đỉnh là $-\frac{8}{2\cdot(-2)}=2$.`, R`Thay $a=-2$ và $b=8$ vào công thức.`),
          buoc(R`Vì $a=-2<0$ nên hàm số đồng biến trên $(-\infty;\ 2)$ và nghịch biến trên $(2;\ +\infty)$.`, R`Parabol quay xuống, nên giá trị tăng rồi giảm quanh đỉnh.`),
        ],
        R`Đồng biến trên $(-\infty;\ 2)$ và nghịch biến trên $(2;\ +\infty)$.`,
        [{ expr: "Rational(-8,2*(-2))", expect: "2" }]),
    ],
    [
      luyen(R`Hàm số $y=x^2+6x$ nghịch biến trên khoảng $(-\infty;\ a)$. Tìm $a$ lớn nhất.`, R`Giá trị lớn nhất là $a=-3$.`, [{ expr: "Rational(-6,2)", expect: "-3" }], R`Parabol quay lên nên nghịch biến bên trái đỉnh, và đỉnh có hoành độ $-\frac{6}{2\cdot1}=-3$.`),
      luyen(R`Hàm số $y=-x^2+2x-5$ đồng biến trên khoảng $(-\infty;\ a)$. Tìm $a$ lớn nhất.`, R`Giá trị lớn nhất là $a=1$.`, [{ expr: "Rational(-2,2*(-1))", expect: "1" }], R`Parabol quay xuống nên đồng biến bên trái đỉnh, và đỉnh có hoành độ $-\frac{2}{2\cdot(-1)}=1$.`),
      luyen(R`Tìm $m$ để hàm số $y=x^2-mx+1$ nghịch biến trên $(-\infty;\ 3)$ và đồng biến trên $(3;\ +\infty)$.`, R`Giá trị cần tìm là $m=6$.`, [{ expr: "solve(x/2-3, x)[0]", expect: "6" }], R`Đỉnh nằm ở $x=\frac{m}{2}$ và phải bằng $3$, nên $m=6$.`),
    ],
    { topicId: "quadratic" }),
]);

export const lop10ToaDoVt: GradeChapter = chuong("vt-toa-do-10", "Tọa độ của vectơ trong mặt phẳng", [
  bai("toa-do-vt", "Tọa độ của vectơ và các phép toán",
    R`Vectơ $\overrightarrow{AB}$ có tọa độ $(x_B-x_A;\ y_B-y_A)$. Với $\vec a=(x_1;\ y_1)$ và $\vec b=(x_2;\ y_2)$ thì $\vec a+\vec b=(x_1+x_2;\ y_1+y_2)$, $k\vec a=(kx_1;\ ky_1)$, và độ dài $|\vec a|=\sqrt{x_1^2+y_1^2}$.`,
    [
      vd(R`Cho $A(1;\ 2)$ và $B(4;\ 6)$. Tìm tọa độ và độ dài của $\overrightarrow{AB}$.`,
        [
          buoc(R`Tọa độ là $\overrightarrow{AB}=(4-1;\ 6-2)=(3;\ 4)$.`, R`Lấy tọa độ điểm cuối trừ tọa độ điểm đầu.`),
          buoc(R`Độ dài là $\sqrt{3^2+4^2}=5$.`, R`Dùng công thức độ dài theo tọa độ.`),
        ],
        R`Vectơ $\overrightarrow{AB}=(3;\ 4)$ có độ dài $5$.`,
        [{ expr: "sqrt(3**2+4**2)", expect: "5" }]),
      vd(R`Cho $\vec a=(2;\ -1)$ và $\vec b=(1;\ 3)$. Tìm tọa độ của $2\vec a-\vec b$.`,
        [
          buoc(R`Ta có $2\vec a=(4;\ -2)$.`, R`Nhân từng tọa độ với $2$.`),
          buoc(R`Trừ $\vec b$: $(4-1;\ -2-3)=(3;\ -5)$.`, R`Trừ từng tọa độ tương ứng.`),
        ],
        R`Vectơ $2\vec a-\vec b=(3;\ -5)$.`,
        [{ expr: "2*2-1", expect: "3" }, { expr: "2*(-1)-3", expect: "-5" }]),
    ],
    [
      luyen(R`Cho $A(1;\ 1)$ và $B(7;\ 9)$. Tính độ dài $AB$.`, R`Độ dài bằng $10$.`, [{ expr: "sqrt(6**2+8**2)", expect: "10" }], R`Vectơ $\overrightarrow{AB}=(6;\ 8)$ có độ dài $\sqrt{36+64}=10$.`),
      luyen(R`Cho $\vec a=(3;\ 1)$ và $\vec b=(-1;\ 2)$. Tung độ của $\vec a+\vec b$ bằng bao nhiêu?`, R`Tung độ bằng $3$.`, [{ expr: "1+2", expect: "3" }], R`Cộng hai tung độ tương ứng của hai vectơ: $1+2=3$.`),
      luyen(R`Tìm $m$ dương để vectơ $(m;\ 4)$ có độ dài bằng $5$.`, R`Giá trị cần tìm là $m=3$.`, [{ expr: "Max(*solve(x**2+16-25, x))", expect: "3" }], R`Cần $\sqrt{m^2+16}=5$, tức $m^2=9$, và lấy giá trị dương $m=3$.`),
    ],
    { topicId: "vector" }),
  bai("trung-diem-trong-tam", "Tọa độ trung điểm và trọng tâm",
    R`Trung điểm $M$ của $AB$ có tọa độ $\left(\frac{x_A+x_B}{2};\ \frac{y_A+y_B}{2}\right)$. Trọng tâm $G$ của tam giác $ABC$ có tọa độ $\left(\frac{x_A+x_B+x_C}{3};\ \frac{y_A+y_B+y_C}{3}\right)$.`,
    [
      vd(R`Tìm trung điểm $M$ của đoạn $AB$ với $A(1;\ 2)$ và $B(5;\ 8)$.`,
        [
          buoc(R`Hoành độ là $\frac{1+5}{2}=3$.`, R`Lấy trung bình cộng hai hoành độ.`),
          buoc(R`Tung độ là $\frac{2+8}{2}=5$.`, R`Lấy trung bình cộng hai tung độ.`),
        ],
        R`Trung điểm là $M(3;\ 5)$.`,
        [{ expr: "Rational(1+5,2)", expect: "3" }, { expr: "Rational(2+8,2)", expect: "5" }]),
      vd(R`Tìm trọng tâm $G$ của tam giác có $A(0;\ 0)$, $B(6;\ 0)$ và $C(0;\ 3)$.`,
        [
          buoc(R`Hoành độ là $\frac{0+6+0}{3}=2$.`, R`Lấy trung bình cộng ba hoành độ.`),
          buoc(R`Tung độ là $\frac{0+0+3}{3}=1$.`, R`Lấy trung bình cộng ba tung độ.`),
        ],
        R`Trọng tâm là $G(2;\ 1)$.`,
        [{ expr: "Rational(0+6+0,3)", expect: "2" }, { expr: "Rational(0+0+3,3)", expect: "1" }]),
    ],
    [
      luyen(R`Tìm hoành độ trung điểm của đoạn nối $A(-2;\ 4)$ và $B(4;\ 0)$.`, R`Hoành độ bằng $1$.`, [{ expr: "Rational(-2+4,2)", expect: "1" }], R`Ta có $\frac{-2+4}{2}=1$.`),
      luyen(R`Tìm hoành độ trọng tâm của tam giác có các đỉnh $(1;\ 1)$, $(4;\ 2)$ và $(1;\ 6)$.`, R`Hoành độ bằng $2$.`, [{ expr: "Rational(1+4+1,3)", expect: "2" }], R`Ta có $\frac{1+4+1}{3}=2$.`),
      luyen(R`Điểm $M(2;\ 3)$ là trung điểm của $AB$ với $A(1;\ 1)$. Tìm tung độ của $B$.`, R`Tung độ bằng $5$.`, [{ expr: "2*3-1", expect: "5" }], R`Từ $\frac{1+y_B}{2}=3$ được $y_B=2\cdot3-1=5$.`),
    ],
    { topicId: "vector" }),
  bai("goc-hai-vt", "Tích vô hướng và góc giữa hai vectơ",
    R`Tích vô hướng của $\vec a=(x_1;\ y_1)$ và $\vec b=(x_2;\ y_2)$ là $\vec a\cdot\vec b=x_1x_2+y_1y_2$. Góc $\varphi$ giữa hai vectơ khác $\vec0$ thỏa $\cos\varphi=\frac{\vec a\cdot\vec b}{|\vec a|\,|\vec b|}$.`,
    [
      vd(R`Tính góc giữa $\vec a=(1;\ 0)$ và $\vec b=(1;\ 1)$.`,
        [
          buoc(R`Tích vô hướng là $1\cdot1+0\cdot1=1$, độ dài $|\vec a|=1$ và $|\vec b|=\sqrt2$.`, R`Tính tử và mẫu của công thức $\cos\varphi$.`),
          buoc(R`Do đó $\cos\varphi=\frac{1}{\sqrt2}=\frac{\sqrt2}{2}$, nên $\varphi=45^\circ$.`, R`Đây là giá trị lượng giác quen thuộc của góc $45^\circ$.`),
        ],
        R`Góc giữa hai vectơ bằng $45^\circ$.`,
        [{ expr: "Rational(1,1)/(1*sqrt(2))", expect: "sqrt(2)/2" }]),
      vd(R`Chứng tỏ $\vec a=(1;\ 2)$ và $\vec b=(2;\ -1)$ vuông góc.`,
        [
          buoc(R`Tích vô hướng là $1\cdot2+2\cdot(-1)=0$.`, R`Hai vectơ vuông góc khi tích vô hướng bằng $0$.`),
          buoc(R`Tích bằng $0$ nên $\cos\varphi=0$ và $\varphi=90^\circ$.`, R`Tử số bằng $0$ thì cả phân số bằng $0$.`),
        ],
        R`Hai vectơ vuông góc với nhau.`,
        [{ expr: "1*2+2*(-1)", expect: "0" }]),
    ],
    [
      luyen(R`Tính tích vô hướng của $(3;\ 4)$ và $(1;\ 2)$.`, R`Tích vô hướng bằng $11$.`, [{ expr: "3*1+4*2", expect: "11" }], R`Ta có $3\cdot1+4\cdot2=11$.`),
      luyen(R`Tính $\cos\varphi$ của hai vectơ $(1;\ 0)$ và $(0;\ 1)$.`, R`Bằng $0$.`, [{ expr: "(1*0+0*1)/(1*1)", expect: "0" }], R`Tích vô hướng bằng $0$, nên $\cos\varphi=0$.`),
      luyen(R`Hai vectơ $(2;\ -3)$ và $(3;\ 2)$ tạo với nhau góc bao nhiêu độ?`, R`Góc bằng $90$ độ.`, [{ expr: "acos(0)*180/pi", expect: "90" }], R`Tích vô hướng là $6-6=0$ nên $\cos\varphi=0$, tức $\varphi=90^\circ$.`),
    ],
    { topicId: "vector" }),
  bai("dk-song-song-vuong", "Điều kiện cùng phương và vuông góc",
    R`Hai vectơ $\vec a=(x_1;\ y_1)$ và $\vec b=(x_2;\ y_2)$ cùng phương khi $x_1y_2-x_2y_1=0$, và vuông góc khi $x_1x_2+y_1y_2=0$. Ba điểm $A$, $B$, $C$ thẳng hàng khi $\overrightarrow{AB}$ và $\overrightarrow{AC}$ cùng phương.`,
    [
      vd(R`Hai vectơ $\vec a=(2;\ 3)$ và $\vec b=(4;\ 6)$ có cùng phương không?`,
        [
          buoc(R`Tính $x_1y_2-x_2y_1=2\cdot6-4\cdot3$.`, R`Thay tọa độ vào biểu thức điều kiện cùng phương.`),
          buoc(R`Kết quả bằng $0$ nên hai vectơ cùng phương.`, R`Thật vậy $\vec b=2\vec a$.`),
        ],
        R`Hai vectơ cùng phương.`,
        [{ expr: "2*6-4*3", expect: "0" }]),
      vd(R`Tìm $m$ để $\vec a=(1;\ m)$ vuông góc với $\vec b=(2;\ 4)$.`,
        [
          buoc(R`Cần $1\cdot2+m\cdot4=0$.`, R`Hai vectơ vuông góc khi tích vô hướng bằng $0$.`),
          buoc(R`Giải được $4m=-2$, nên $m=-\frac{1}{2}$.`, R`Chia cả hai vế của phương trình $4m=-2$ cho $4$.`),
        ],
        R`Giá trị cần tìm là $m=-\frac{1}{2}$.`,
        [{ expr: "solve(2+4*x, x)[0]", expect: "-Rational(1,2)" }]),
    ],
    [
      luyen(R`Tìm $m$ để $(1;\ 2)$ cùng phương với $(3;\ m)$.`, R`Giá trị cần tìm là $m=6$.`, [{ expr: "solve(1*x-3*2, x)[0]", expect: "6" }], R`Cần $1\cdot m-3\cdot2=0$, nên $m=6$.`),
      luyen(R`Tìm $m$ để $(m;\ 3)$ vuông góc với $(2;\ -1)$.`, R`Giá trị cần tìm là $m=\frac{3}{2}$.`, [{ expr: "solve(2*x-3, x)[0]", expect: "Rational(3,2)" }], R`Cần $2m-3=0$, nên $m=\frac{3}{2}$.`),
      luyen(R`Ba điểm $A(0;\ 0)$, $B(1;\ 2)$ và $C(3;\ m)$ thẳng hàng. Tìm $m$.`, R`Giá trị cần tìm là $m=6$.`, [{ expr: "solve(3*2-1*x, x)[0]", expect: "6" }], R`Hai vectơ $(1;\ 2)$ và $(3;\ m)$ cùng phương nên $1\cdot m-3\cdot2=0$ và $m=6$.`),
    ],
    { topicId: "vector" }),
]);

export const lop11LuongGiacNC: GradeChapter = chuong("luong-giac-nc", "Phương trình lượng giác nâng cao", [
  bai("pt-asin-bcos", "Phương trình $a\\sin x+b\\cos x=c$",
    R`Phương trình $a\sin x+b\cos x=c$ có nghiệm khi và chỉ khi $c^2\le a^2+b^2$. Khi đó chia hai vế cho $\sqrt{a^2+b^2}$ để đưa về dạng $\sin(x+\alpha)=\frac{c}{\sqrt{a^2+b^2}}$.`,
    [
      vd(R`Giải $\sqrt3\sin x+\cos x=2$.`,
        [
          buoc(R`Ta có $a^2+b^2=3+1=4$ và $c^2=4$, nên phương trình có nghiệm.`, R`Điều kiện có nghiệm là $c^2\le a^2+b^2$, ở đây dấu bằng xảy ra.`),
          buoc(R`Chia hai vế cho $2$: $\frac{\sqrt3}{2}\sin x+\frac12\cos x=1$, tức $\sin\left(x+\frac{\pi}{6}\right)=1$.`, R`Vì $\cos\frac{\pi}{6}=\frac{\sqrt3}{2}$ và $\sin\frac{\pi}{6}=\frac12$ nên vế trái là $\sin\left(x+\frac{\pi}{6}\right)$.`),
          buoc(R`Do đó $x+\frac{\pi}{6}=\frac{\pi}{2}+k2\pi$ và $x=\frac{\pi}{3}+k2\pi$.`, R`Giải phương trình $\sin t=1$.`),
        ],
        R`Nghiệm là $x=\frac{\pi}{3}+k2\pi$ với $k$ nguyên.`,
        [{ expr: "sqrt(3)*sin(pi/3)+cos(pi/3)", expect: "2" }]),
      vd(R`Phương trình $\sin x+\cos x=3$ có nghiệm không?`,
        [
          buoc(R`Ta có $a^2+b^2=1+1=2$ và $c^2=9$.`, R`Tính hai vế của điều kiện có nghiệm.`),
          buoc(R`Vì $9>2$ nên phương trình vô nghiệm.`, R`Giá trị lớn nhất của $\sin x+\cos x$ chỉ là $\sqrt2$.`),
        ],
        R`Phương trình vô nghiệm.`,
        [{ expr: "3**2-(1**2+1**2)", expect: "7" }]),
    ],
    [
      luyen(R`Có bao nhiêu số nguyên $c$ để phương trình $3\sin x+4\cos x=c$ có nghiệm?`, R`Có $11$ số nguyên.`, [{ expr: "2*floor(sqrt(3**2+4**2))+1", expect: "11" }], R`Cần $c^2\le9+16=25$, tức $-5\le c\le5$, gồm $11$ số nguyên.`),
      luyen(R`Giá trị nguyên dương lớn nhất của $c$ để $\sin x+\sqrt3\cos x=c$ có nghiệm là bao nhiêu?`, R`Bằng $2$.`, [{ expr: "floor(sqrt(1+3))", expect: "2" }], R`Cần $c^2\le1+3=4$, tức $c\le2$; giá trị $c=2$ vẫn có nghiệm vì xảy ra dấu bằng.`),
      luyen(R`Giải $\sin x+\cos x=\sqrt2$ trên $[0;\ 2\pi)$. Nghiệm đó bằng bao nhiêu độ?`, R`Bằng $45$ độ, tức $x=\frac{\pi}{4}$.`, [{ expr: "sin(pi/4)+cos(pi/4)-sqrt(2)", expect: "0" }], R`Ta có $\sqrt2\sin\left(x+\frac{\pi}{4}\right)=\sqrt2$ nên $x+\frac{\pi}{4}=\frac{\pi}{2}$ và $x=\frac{\pi}{4}$.`),
    ],
    { topicId: "trig" }),
  bai("pt-bac-hai-lg", "Phương trình bậc hai theo một hàm lượng giác",
    R`Phương trình có dạng $at^2+bt+c=0$ với $t=\sin x$ hoặc $t=\cos x$ được giải bằng cách đặt ẩn phụ $t$, giải phương trình bậc hai rồi chỉ giữ các nghiệm thỏa $-1\le t\le1$.`,
    [
      vd(R`Giải $2\sin^2x-\sin x-1=0$.`,
        [
          buoc(R`Đặt $t=\sin x$ với $|t|\le1$, ta được $2t^2-t-1=0$.`, R`Đưa về phương trình bậc hai theo $t$.`),
          buoc(R`Phương trình có nghiệm $t=1$ và $t=-\frac12$, cả hai đều thuộc $[-1;\ 1]$.`, R`Phân tích $2t^2-t-1=(t-1)(2t+1)$.`),
          buoc(R`Với $t=1$ thì $x=\frac{\pi}{2}+k2\pi$; với $t=-\frac12$ thì $x=-\frac{\pi}{6}+k2\pi$ hoặc $x=\frac{7\pi}{6}+k2\pi$.`, R`Giải từng phương trình lượng giác cơ bản.`),
        ],
        R`Có ba họ nghiệm như trên.`,
        [{ expr: "Max(*solve(2*x**2-x-1, x))", expect: "1" }, { expr: "Min(*solve(2*x**2-x-1, x))", expect: "-Rational(1,2)" }]),
      vd(R`Giải $2\cos^2x+3\cos x-2=0$.`,
        [
          buoc(R`Đặt $t=\cos x$, ta được $2t^2+3t-2=0$ có nghiệm $t=\frac12$ và $t=-2$.`, R`Phân tích $2t^2+3t-2=(2t-1)(t+2)$.`),
          buoc(R`Nghiệm $t=-2$ nhỏ hơn $-1$ nên bị loại, còn $\cos x=\frac12$ cho $x=\pm\frac{\pi}{3}+k2\pi$.`, R`Giá trị của $\cos x$ không bao giờ nhỏ hơn $-1$.`),
        ],
        R`Nghiệm là $x=\pm\frac{\pi}{3}+k2\pi$.`,
        [{ expr: "Max(*solve(2*x**2+3*x-2, x))", expect: "Rational(1,2)" }, { expr: "Min(*solve(2*x**2+3*x-2, x))", expect: "-2" }]),
    ],
    [
      luyen(R`Giải $t^2-3t+2=0$ với $t=\sin x$. Nghiệm nào của $t$ dùng được?`, R`Chỉ $t=1$, vì $t=2$ lớn hơn $1$.`, [{ expr: "Min(*solve(x**2-3*x+2, x))", expect: "1" }], R`Phương trình có nghiệm $t=1$ và $t=2$, mà $|\sin x|\le1$.`),
      luyen(R`Giải $2t^2-t=0$. Nghiệm lớn là bao nhiêu?`, R`Nghiệm lớn bằng $\frac12$.`, [{ expr: "Max(*solve(2*x**2-x, x))", expect: "Rational(1,2)" }], R`Phân tích $t(2t-1)=0$ nên $t=0$ hoặc $t=\frac12$.`),
      luyen(R`Nghiệm lớn của $t^2+t-6=0$ là bao nhiêu, và có dùng được cho $t=\cos x$ không?`, R`Bằng $2$, lớn hơn $1$ nên không dùng được.`, [{ expr: "Max(*solve(x**2+x-6, x))", expect: "2" }], R`Phương trình có hai nghiệm $2$ và $-3$, cả hai đều nằm ngoài $[-1;\ 1]$ nên phương trình lượng giác vô nghiệm.`),
    ],
    { topicId: "trig" }),
  bai("nghiem-trong-khoang", "Nghiệm của phương trình lượng giác trong một khoảng",
    R`Nghiệm tổng quát của $\sin x=\sin\alpha$ là $x=\alpha+k2\pi$ hoặc $x=\pi-\alpha+k2\pi$, của $\cos x=\cos\alpha$ là $x=\pm\alpha+k2\pi$. Để lấy các nghiệm trong một khoảng, thử các giá trị nguyên của $k$ rồi giữ lại nghiệm nằm trong khoảng.`,
    [
      vd(R`Tìm các nghiệm của $\sin x=\frac12$ trong $[0;\ 2\pi]$.`,
        [
          buoc(R`Ta có $\sin\frac{\pi}{6}=\frac12$ nên $x=\frac{\pi}{6}+k2\pi$ hoặc $x=\frac{5\pi}{6}+k2\pi$.`, R`Dùng hai họ nghiệm của $\sin x=\sin\alpha$ với $\alpha=\frac{\pi}{6}$.`),
          buoc(R`Với $k=0$ cả hai nghiệm đều thuộc $[0;\ 2\pi]$, còn các giá trị $k$ khác đưa nghiệm ra ngoài khoảng.`, R`Mỗi lần tăng $k$ nghiệm tăng $2\pi$, vượt quá $2\pi$.`),
        ],
        R`Có hai nghiệm là $\frac{\pi}{6}$ và $\frac{5\pi}{6}$.`,
        [{ expr: "asin(Rational(1,2))", expect: "pi/6" }, { expr: "pi-pi/6", expect: "5*pi/6" }]),
      vd(R`Tìm các nghiệm của $\cos x=-\frac12$ trong $[0;\ 2\pi]$.`,
        [
          buoc(R`Ta có $\cos\frac{2\pi}{3}=-\frac12$ nên $x=\pm\frac{2\pi}{3}+k2\pi$.`, R`Dùng họ nghiệm của $\cos x=\cos\alpha$ với $\alpha=\frac{2\pi}{3}$.`),
          buoc(R`Chọn $x=\frac{2\pi}{3}$ với dấu cộng và $k=0$, và $x=-\frac{2\pi}{3}+2\pi=\frac{4\pi}{3}$ với $k=1$.`, R`Nghiệm âm cần cộng thêm $2\pi$ để vào khoảng.`),
        ],
        R`Có hai nghiệm là $\frac{2\pi}{3}$ và $\frac{4\pi}{3}$.`,
        [{ expr: "acos(-Rational(1,2))", expect: "2*pi/3" }, { expr: "2*pi-2*pi/3", expect: "4*pi/3" }]),
    ],
    [
      luyen(R`Nghiệm của $\tan x=1$ trong $[0;\ \pi)$ bằng bao nhiêu độ?`, R`Bằng $45$ độ, tức $x=\frac{\pi}{4}$.`, [{ expr: "atan(1)*180/pi", expect: "45" }], R`Ta có $\tan\frac{\pi}{4}=1$ và hàm tan có chu kỳ $\pi$ nên chỉ có một nghiệm trong $[0;\ \pi)$.`),
      luyen(R`Nghiệm của $\sin x=1$ trong $[0;\ 2\pi]$ bằng bao nhiêu độ?`, R`Bằng $90$ độ, tức $x=\frac{\pi}{2}$.`, [{ expr: "asin(1)*180/pi", expect: "90" }], R`Hai họ nghiệm trùng nhau, và chỉ có một nghiệm trong khoảng.`),
      luyen(R`Tính tổng hai nghiệm của $\sin x=-\frac12$ trong $[0;\ 2\pi]$ theo đơn vị độ.`, R`Tổng bằng $540$ độ, tức $3\pi$.`, [{ expr: "7*180/6+11*180/6", expect: "540" }], R`Hai nghiệm là $\frac{7\pi}{6}$ và $\frac{11\pi}{6}$, tổng là $3\pi$ tức $540^\circ$.`),
    ],
    { topicId: "trig" }),
  bai("gtln-lg", "Giá trị lớn nhất và nhỏ nhất của biểu thức lượng giác",
    R`Biểu thức $a\sin x+b\cos x$ nhận mọi giá trị trong đoạn $[-\sqrt{a^2+b^2};\ \sqrt{a^2+b^2}]$. Vì vậy giá trị lớn nhất và nhỏ nhất của $y=a\sin x+b\cos x+d$ là $d\pm\sqrt{a^2+b^2}$.`,
    [
      vd(R`Tìm giá trị lớn nhất và nhỏ nhất của $y=3\sin x+4\cos x$.`,
        [
          buoc(R`Ta có $\sqrt{a^2+b^2}=\sqrt{9+16}=5$.`, R`Thay $a=3$ và $b=4$ vào công thức.`),
          buoc(R`Do đó $y$ nhận mọi giá trị trong $[-5;\ 5]$.`, R`Biên của đoạn là $\pm\sqrt{a^2+b^2}$.`),
        ],
        R`Giá trị lớn nhất bằng $5$ và giá trị nhỏ nhất bằng $-5$.`,
        [{ expr: "sqrt(3**2+4**2)", expect: "5" }]),
      vd(R`Tìm giá trị lớn nhất của $y=\sin x+\cos x+2$.`,
        [
          buoc(R`Ta có $\sqrt{1^2+1^2}=\sqrt2$.`, R`Thay $a=1$ và $b=1$ vào công thức.`),
          buoc(R`Giá trị lớn nhất là $2+\sqrt2$.`, R`Cộng hằng số $2$ với giá trị lớn nhất của phần lượng giác.`),
        ],
        R`Giá trị lớn nhất bằng $2+\sqrt2$.`,
        [{ expr: "2+sqrt(1**2+1**2)", expect: "sqrt(2)+2" }]),
    ],
    [
      luyen(R`Tìm giá trị lớn nhất của $y=5\sin x+12\cos x$.`, R`Giá trị lớn nhất bằng $13$.`, [{ expr: "sqrt(5**2+12**2)", expect: "13" }], R`Ta có $\sqrt{25+144}=13$.`),
      luyen(R`Tìm giá trị nhỏ nhất của $y=\sqrt3\sin x-\cos x$.`, R`Giá trị nhỏ nhất bằng $-2$.`, [{ expr: "-sqrt(3+1)", expect: "-2" }], R`Ta có $\sqrt{3+1}=2$ nên giá trị nhỏ nhất là $-2$.`),
      luyen(R`Tìm giá trị nhỏ nhất của $y=\sin x-\cos x+3$.`, R`Giá trị nhỏ nhất bằng $3-\sqrt2$.`, [{ expr: "3-sqrt(1**2+1**2)", expect: "3-sqrt(2)" }], R`Phần lượng giác có giá trị nhỏ nhất là $-\sqrt2$, cộng với $3$.`),
    ],
    { topicId: "trig" }),
]);

export const lop11MuLogNC: GradeChapter = chuong("mu-log-nc", "Mũ và logarit nâng cao", [
  bai("pt-mu-an-phu", "Phương trình mũ giải bằng ẩn phụ",
    R`Các phương trình có dạng $a^{2x}+b\cdot a^x+c=0$ được giải bằng cách đặt $t=a^x$ với $t>0$, giải phương trình bậc hai theo $t$, bỏ nghiệm không dương, rồi quay về $x$.`,
    [
      vd(R`Giải $4^x-3\cdot2^x+2=0$.`,
        [
          buoc(R`Đặt $t=2^x>0$, ta được $t^2-3t+2=0$.`, R`Vì $4^x=(2^x)^2$ nên đặt ẩn phụ $t=2^x$ là hợp lý.`),
          buoc(R`Phương trình có nghiệm $t=1$ và $t=2$, đều dương.`, R`Phân tích $t^2-3t+2=(t-1)(t-2)$.`),
          buoc(R`Với $t=1$ thì $x=0$; với $t=2$ thì $x=1$.`, R`Giải $2^x=1$ và $2^x=2$.`),
        ],
        R`Phương trình có hai nghiệm $x=0$ và $x=1$.`,
        [{ expr: "Max(*solve(x**2-3*x+2, x))", expect: "2" }, { expr: "log(2)/log(2)", expect: "1" }]),
      vd(R`Giải $4^x+2^x-6=0$.`,
        [
          buoc(R`Đặt $t=2^x>0$, ta được $t^2+t-6=0$ có nghiệm $t=2$ và $t=-3$.`, R`Phân tích $t^2+t-6=(t-2)(t+3)$.`),
          buoc(R`Nghiệm $t=-3$ bị loại vì $2^x>0$, còn $2^x=2$ cho $x=1$.`, R`Lũy thừa với cơ số dương luôn dương.`),
        ],
        R`Phương trình có một nghiệm $x=1$.`,
        [{ expr: "Max(*solve(x**2+x-6, x))", expect: "2" }, { expr: "Min(*solve(x**2+x-6, x))", expect: "-3" }]),
    ],
    [
      luyen(R`Giải $4^x-5\cdot2^x+4=0$. Nghiệm lớn của $x$ là bao nhiêu?`, R`Nghiệm lớn bằng $2$.`, [{ expr: "log(4)/log(2)", expect: "2" }], R`Đặt $t=2^x$ được $t^2-5t+4=0$, nên $t=1$ hoặc $t=4$; nghiệm lớn ứng với $2^x=4$.`),
      luyen(R`Giải $9^x-10\cdot3^x+9=0$. Nghiệm lớn của $x$ là bao nhiêu?`, R`Nghiệm lớn bằng $2$.`, [{ expr: "log(9)/log(3)", expect: "2" }], R`Đặt $t=3^x$ được $t=1$ hoặc $t=9$; nghiệm lớn ứng với $3^x=9$.`),
      luyen(R`Phương trình $4^x-3\cdot2^x+m=0$ có đúng một nghiệm $x$ khi $t=2^x$ là nghiệm kép dương. Tìm $m$.`, R`Giá trị cần tìm là $m=\frac{9}{4}$.`, [{ expr: "solve(9-4*x, x)[0]", expect: "Rational(9,4)" }], R`Phương trình $t^2-3t+m=0$ có nghiệm kép khi $\Delta=9-4m=0$, và khi đó $t=\frac{3}{2}>0$.`),
    ],
    { topicId: "exp" }),
  bai("bpt-log-dk", "Bất phương trình logarit và điều kiện xác định",
    R`Khi giải bất phương trình logarit, phải đặt điều kiện cho biểu thức dưới dấu logarit dương. Với cơ số lớn hơn $1$, dấu của bất phương trình giữ nguyên khi bỏ logarit; với cơ số nằm giữa $0$ và $1$, dấu đổi chiều.`,
    [
      vd(R`Giải $\log_2(x-1)<3$.`,
        [
          buoc(R`Điều kiện là $x-1>0$, tức $x>1$.`, R`Biểu thức dưới logarit phải dương.`),
          buoc(R`Cơ số $2>1$ nên $x-1<2^3=8$, tức $x<9$.`, R`Bỏ logarit và giữ nguyên chiều của dấu.`),
        ],
        R`Tập nghiệm là $(1;\ 9)$.`,
        [{ expr: "2**3+1", expect: "9" }]),
      vd(R`Giải $\log_3(2x-4)\ge2$.`,
        [
          buoc(R`Điều kiện là $2x-4>0$, tức $x>2$.`, R`Biểu thức dưới logarit phải dương.`),
          buoc(R`Bất phương trình cho $2x-4\ge3^2=9$, nên $x\ge\frac{13}{2}$, thỏa điều kiện $x>2$.`, R`Cơ số $3>1$ nên giữ nguyên chiều của dấu.`),
        ],
        R`Tập nghiệm là $\left[\frac{13}{2};\ +\infty\right)$.`,
        [{ expr: "solve(2*x-4-9, x)[0]", expect: "Rational(13,2)" }]),
    ],
    [
      luyen(R`Điều kiện của $\log_5(x-7)$ là $x$ lớn hơn số nào?`, R`Lớn hơn $7$.`, [{ expr: "solve(x-7, x)[0]", expect: "7" }], R`Biểu thức dưới dấu logarit phải dương, tức $x-7>0$.`),
      luyen(R`Giải $\log_2x<4$. Cận trên của $x$ bằng bao nhiêu?`, R`Cận trên bằng $16$.`, [{ expr: "2**4", expect: "16" }], R`Cơ số $2>1$ nên $x<2^4=16$, kết hợp điều kiện $x>0$ được $0<x<16$.`),
      luyen(R`Giải $\log_3(x-1)\ge1$. Cận dưới của $x$ bằng bao nhiêu?`, R`Cận dưới bằng $4$.`, [{ expr: "3+1", expect: "4" }], R`Cần $x-1\ge3$, tức $x\ge4$, thỏa điều kiện $x>1$.`),
    ],
    { topicId: "exp" }),
  bai("ung-dung-mu-log", "Ứng dụng mũ và logarit: lãi kép và tăng trưởng",
    R`Số tiền $A$ gửi lãi kép với lãi suất $r$ mỗi kỳ có $A(1+r)^n$ sau $n$ kỳ. Để tìm số kỳ $n$ cần thiết, giải bất phương trình mũ bằng cách lấy logarit hai vế và làm tròn lên thành số nguyên.`,
    [
      vd(R`Gửi $100$ triệu đồng với lãi suất $10\%$ mỗi năm theo lãi kép. Sau ít nhất bao nhiêu năm số tiền gấp đôi?`,
        [
          buoc(R`Cần $100\cdot1{,}1^n\ge200$, tức $1{,}1^n\ge2$.`, R`Chia cả hai vế của bất phương trình cho số tiền gốc $100$.`),
          buoc(R`Lấy logarit: $n\ge\frac{\ln2}{\ln1{,}1}\approx7{,}27$.`, R`Chia hai vế cho $\ln1{,}1>0$ nên giữ nguyên chiều dấu.`),
          buoc(R`Số năm là số nguyên nên $n=8$.`, R`Làm tròn lên để đạt được yêu cầu.`),
        ],
        R`Sau ít nhất $8$ năm.`,
        [{ expr: "ceiling(log(2)/log(Rational(11,10)))", expect: "8" }]),
      vd(R`Dân số một thị trấn tăng $2\%$ mỗi năm. Sau ít nhất bao nhiêu năm dân số gấp đôi?`,
        [
          buoc(R`Cần $1{,}02^n\ge2$, nên $n\ge\frac{\ln2}{\ln1{,}02}\approx35{,}0$.`, R`Lấy logarit hai vế để đưa số mũ $n$ xuống thành thừa số.`),
          buoc(R`Giá trị $35{,}0$ hơi lớn hơn $35$ nên $n=36$.`, R`Tính được $1{,}02^{35}\approx1{,}9999$ vẫn nhỏ hơn $2$, còn $1{,}02^{36}\approx2{,}04$ đã lớn hơn $2$.`),
        ],
        R`Sau ít nhất $36$ năm.`,
        [{ expr: "ceiling(log(2)/log(Rational(51,50)))", expect: "36" }]),
    ],
    [
      luyen(R`Gửi $100$ triệu đồng với lãi suất $10\%$ mỗi năm theo lãi kép. Sau $3$ năm có bao nhiêu triệu đồng?`, R`Có $133{,}1$ triệu đồng.`, [{ expr: "100*Rational(11,10)**3", expect: "Rational(1331,10)" }], R`Ta có $100\cdot1{,}1^3=133{,}1$.`),
      luyen(R`Lãi suất $8\%$ mỗi năm theo lãi kép. Sau ít nhất bao nhiêu năm số tiền gấp ba?`, R`Sau ít nhất $15$ năm.`, [{ expr: "ceiling(log(3)/log(Rational(27,25)))", expect: "15" }], R`Cần $n\ge\frac{\ln3}{\ln1{,}08}\approx14{,}27$, làm tròn lên được $15$.`),
      luyen(R`Một chất phóng xạ giảm một nửa sau mỗi chu kỳ. Sau $3$ chu kỳ còn lại bao nhiêu phần khối lượng ban đầu?`, R`Còn $\frac{1}{8}$.`, [{ expr: "Rational(1,2)**3", expect: "Rational(1,8)" }], R`Mỗi chu kỳ nhân với $\frac12$ nên sau $3$ chu kỳ còn $\left(\frac12\right)^3=\frac18$.`),
    ],
    { topicId: "exp" }),
  bai("so-sanh-mu-log", "Tính và so sánh các số mũ và logarit",
    R`Với cơ số $a>1$, hàm $a^x$ và $\log_ax$ đồng biến; với $0<a<1$, chúng nghịch biến. Dùng định nghĩa $\log_ab=c\iff a^c=b$ để tính giá trị chính xác, và dùng chiều biến thiên để so sánh.`,
    [
      vd(R`So sánh $\log_23$ với $\frac32$.`,
        [
          buoc(R`Ta có $\frac32=\log_22^{3/2}=\log_2\left(2\sqrt2\right)$.`, R`Viết $\frac32$ dưới dạng logarit cơ số $2$.`),
          buoc(R`Vì $3^2=9>8=\left(2\sqrt2\right)^2$ nên $3>2\sqrt2$, và hàm $\log_2$ đồng biến.`, R`Bình phương hai số dương để so sánh.`),
        ],
        R`Vậy $\log_23>\frac32$.`,
        [{ expr: "(2*sqrt(2))**2", expect: "8" }]),
      vd(R`So sánh $\left(\frac12\right)^3$ và $\left(\frac12\right)^2$.`,
        [
          buoc(R`Cơ số $\frac12$ nằm giữa $0$ và $1$ nên hàm mũ nghịch biến.`, R`Số mũ lớn hơn cho giá trị nhỏ hơn.`),
          buoc(R`Vì $3>2$ nên $\left(\frac12\right)^3<\left(\frac12\right)^2$, tức $\frac18<\frac14$.`, R`Kiểm tra bằng cách tính trực tiếp hai lũy thừa.`),
        ],
        R`Vậy $\left(\frac12\right)^3<\left(\frac12\right)^2$.`,
        [{ expr: "Rational(1,2)**3", expect: "Rational(1,8)" }]),
    ],
    [
      { ...luyen(R`Số nào lớn hơn: $\log_{1/2}3$ hay $\log_{1/2}5$?`, R`Số $\log_{1/2}3$ lớn hơn, vì cơ số nằm giữa $0$ và $1$ nên hàm nghịch biến.`, [{ expr: "sign(N(log(3)/log(Rational(1,2))-log(5)/log(Rational(1,2))))", expect: "1" }], R`Cơ số $\frac12$ nằm giữa $0$ và $1$ nên $3<5$ cho $\log_{1/2}3>\log_{1/2}5$; thật vậy $\log_{1/2}3\approx-1{,}58$ còn $\log_{1/2}5\approx-2{,}32$.`), ask: { kind: "choice", options: ["$\\log_{1/2}3$", "$\\log_{1/2}5$"], correct: 0 } },
      luyen(R`Tính $\log_3\frac19$.`, R`Bằng $-2$.`, [{ expr: "log(Rational(1,9),3)", expect: "-2" }], R`Theo định nghĩa logarit, vì $3^{-2}=\frac19$ nên kết quả là $-2$.`),
      luyen(R`Tính $\log_{1/2}4$.`, R`Bằng $-2$.`, [{ expr: "log(4)/log(Rational(1,2))", expect: "-2" }], R`Theo định nghĩa logarit, vì $\left(\frac12\right)^{-2}=4$ nên kết quả là $-2$.`),
    ],
    { topicId: "exp" }),
]);
