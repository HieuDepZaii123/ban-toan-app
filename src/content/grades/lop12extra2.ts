/** Lớp 12, phần chi tiết: đồ thị và tương giao, tích phân nâng cao, hình học Oxyz nâng cao. */
import type { GradeChapter } from "./types.ts";
import { bai, buoc, chuong, luyen, vd } from "./types.ts";

const R = String.raw;

export const lop12DoThi: GradeChapter = chuong("do-thi-ham", "Đồ thị hàm số, tương giao và tiếp tuyến", [
  bai("nhan-dang-do-thi", "Nhận dạng đồ thị hàm bậc ba và hàm phân thức",
    R`Từ công thức hoặc bảng biến thiên có thể đọc đặc điểm của đồ thị. Hàm bậc ba $y=ax^3+bx^2+cx+d$ cắt trục tung tại $y=d$, và có cực đại rồi cực tiểu khi $a>0$. Hàm phân thức $y=\frac{ax+b}{cx+d}$ có tiệm cận đứng $x=-\frac{d}{c}$, tiệm cận ngang $y=\frac{a}{c}$, và đồng biến trên từng khoảng khi $ad-bc>0$.`,
    [
      vd(R`Đọc đặc điểm của đồ thị hàm số $y=x^3-3x^2+2$.`,
        [
          buoc(R`Đồ thị cắt trục tung tại $y(0)=2$.`, R`Thay $x=0$ vào công thức, chỉ còn hệ số tự do.`),
          buoc(R`Đạo hàm $y'=3x^2-6x=3x(x-2)$ bằng $0$ tại $x=0$ và $x=2$.`, R`Điểm cực trị phải làm đạo hàm bằng $0$.`),
          buoc(R`Hệ số $a=1>0$ nên $x=0$ là cực đại với $y(0)=2$, còn $x=2$ là cực tiểu với $y(2)=-2$.`, R`Với $a>0$ thì $y'$ dương, âm rồi dương, nên cực đại đến trước cực tiểu.`),
        ],
        R`Đồ thị có điểm cực đại $(0;\ 2)$ và điểm cực tiểu $(2;\ -2)$.`,
        [{ expr: "Min(*solve(diff(x**3-3*x**2+2, x), x))", expect: "0" }, { expr: "(2)**3-3*(2)**2+2", expect: "-2" }]),
      vd(R`Đọc đặc điểm của đồ thị hàm số $y=\frac{2x-1}{x+1}$.`,
        [
          buoc(R`Tiệm cận đứng là $x=-1$ và tiệm cận ngang là $y=2$.`, R`Mẫu bằng $0$ tại $x=-1$ còn tử khác $0$; tỉ số hai hệ số của $x$ là $\frac{2}{1}=2$.`),
          buoc(R`Đạo hàm $y'=\frac{3}{(x+1)^2}>0$ nên hàm số đồng biến trên từng khoảng xác định.`, R`Tử của $y'$ là $ad-bc=2\cdot1-(-1)\cdot1=3>0$.`),
          buoc(R`Đồ thị cắt trục tung tại $y(0)=-1$.`, R`Thay $x=0$ vào công thức.`),
        ],
        R`Tiệm cận đứng $x=-1$, tiệm cận ngang $y=2$, hàm số đồng biến trên từng khoảng.`,
        [{ expr: "limit((2*x-1)/(x+1), x, oo)", expect: "2" }, { expr: "diff((2*x-1)/(x+1), x).subs(x, 0)", expect: "3" }]),
    ],
    [
      luyen(R`Đồ thị hàm số $y=x^3-3x+1$ cắt trục tung tại điểm có tung độ bao nhiêu?`, R`Tung độ bằng $1$.`, [{ expr: "(0)**3-3*0+1", expect: "1" }], R`Thay $x=0$ vào công thức thì $y=1$.`),
      luyen(R`Tìm tiệm cận ngang của đồ thị $y=\frac{3x+1}{x-2}$.`, R`Tiệm cận ngang là $y=3$.`, [{ expr: "limit((3*x+1)/(x-2), x, oo)", expect: "3" }], R`Tỉ số hai hệ số của $x$ là $\frac{3}{1}=3$.`),
      luyen(R`Hàm số $y=\frac{x+2}{x-1}$ đồng biến hay nghịch biến trên từng khoảng xác định?`, R`Nghịch biến trên từng khoảng xác định.`, [{ expr: "diff((x+2)/(x-1), x).subs(x, 0)", expect: "-3" }], R`Đạo hàm là $\frac{-3}{(x-1)^2}<0$ vì $ad-bc=1\cdot(-1)-2\cdot1=-3$.`),
    ],
    { topicId: "survey" }),
  bai("tuong-giao", "Tương giao của đồ thị và số nghiệm phương trình",
    R`Số nghiệm của phương trình $f(x)=k$ bằng số giao điểm của đồ thị $y=f(x)$ với đường thẳng ngang $y=k$. Với hàm bậc ba có cực đại $y_{CD}$ và cực tiểu $y_{CT}$, phương trình có ba nghiệm khi $y_{CT}<k<y_{CD}$, có hai nghiệm khi $k$ bằng một trong hai giá trị đó, và có một nghiệm khi $k$ nằm ngoài đoạn $[y_{CT};\ y_{CD}]$.`,
    [
      vd(R`Phương trình $x^3-3x=1$ có bao nhiêu nghiệm thực?`,
        [
          buoc(R`Hàm $f(x)=x^3-3x$ có $f'(x)=3x^2-3=0$ tại $x=\pm1$.`, R`Các điểm cực trị là nghiệm của đạo hàm.`),
          buoc(R`Cực đại $f(-1)=2$ và cực tiểu $f(1)=-2$.`, R`Thay hai hoành độ vào hàm số.`),
          buoc(R`Vì $-2<1<2$ nên đường thẳng $y=1$ cắt đồ thị tại ba điểm.`, R`Giá trị $k=1$ nằm giữa cực tiểu và cực đại.`),
        ],
        R`Phương trình có ba nghiệm thực.`,
        [{ expr: "len(Poly(x**3-3*x-1, x).real_roots())", expect: "3" }]),
      vd(R`Đường thẳng $y=-4$ cắt đồ thị hàm số $y=x^3-3x^2$ tại bao nhiêu điểm?`,
        [
          buoc(R`Hàm số có cực đại $y(0)=0$ và cực tiểu $y(2)=-4$.`, R`Đạo hàm $3x^2-6x=0$ tại $x=0$ và $x=2$.`),
          buoc(R`Giá trị $k=-4$ đúng bằng giá trị cực tiểu nên đường thẳng tiếp xúc đồ thị tại cực tiểu và cắt thêm một điểm.`, R`Phương trình $x^3-3x^2+4=(x+1)(x-2)^2=0$ có nghiệm đơn $-1$ và nghiệm kép $2$.`),
        ],
        R`Có hai giao điểm.`,
        [{ expr: "len(Poly(x**3-3*x**2+4, x).sqf_part().real_roots())", expect: "2" }]),
    ],
    [
      luyen(R`Phương trình $x^3-3x^2=-2$ có bao nhiêu nghiệm thực?`, R`Có $3$ nghiệm.`, [{ expr: "len(Poly(x**3-3*x**2+2, x).real_roots())", expect: "3" }], R`Giá trị $-2$ nằm giữa cực tiểu $-4$ và cực đại $0$ của $y=x^3-3x^2$.`),
      luyen(R`Phương trình $x^3-3x^2=0$ có bao nhiêu nghiệm thực phân biệt?`, R`Có $2$ nghiệm phân biệt.`, [{ expr: "len(Poly(x**3-3*x**2, x).sqf_part().real_roots())", expect: "2" }], R`Giá trị $0$ bằng cực đại, nên có một nghiệm kép $x=0$ và một nghiệm đơn $x=3$.`),
      luyen(R`Phương trình $x^3-3x^2=1$ có bao nhiêu nghiệm thực?`, R`Có $1$ nghiệm.`, [{ expr: "len(Poly(x**3-3*x**2-1, x).real_roots())", expect: "1" }], R`Giá trị $1$ lớn hơn cực đại $0$ nên đường thẳng $y=1$ chỉ cắt đồ thị một lần.`),
    ],
    { topicId: "survey" }),
  bai("tham-so-cuc-tri", "Tham số và điều kiện có cực trị",
    R`Hàm bậc ba $y=ax^3+bx^2+cx+d$ có hai điểm cực trị khi $y'=0$ có hai nghiệm phân biệt, tức $\Delta'>0$. Hàm số đạt cực trị tại $x_0$ khi $y'(x_0)=0$ và $y'$ đổi dấu qua $x_0$; có thể kiểm tra bằng $y''(x_0)\ne0$.`,
    [
      vd(R`Tìm $m$ để hàm số $y=x^3-3x^2+mx$ có hai điểm cực trị.`,
        [
          buoc(R`Ta có $y'=3x^2-6x+m$ là tam thức bậc hai.`, R`Hai điểm cực trị ứng với hai nghiệm phân biệt của $y'=0$.`),
          buoc(R`Cần $\Delta'=9-3m>0$.`, R`Tam thức bậc hai có hai nghiệm phân biệt khi biệt thức thu gọn dương.`),
          buoc(R`Do đó $m<3$.`, R`Chia hai vế của $9-3m>0$ cho $3$ được $m<3$.`),
        ],
        R`Hàm số có hai điểm cực trị khi $m<3$.`,
        [{ expr: "solve(9-3*x, x)[0]", expect: "3" }]),
      vd(R`Tìm $m$ để hàm số $y=x^3-3x^2+mx$ đạt cực trị tại $x=2$.`,
        [
          buoc(R`Điều kiện cần là $y'(2)=12-12+m=0$, nên $m=0$.`, R`Điểm cực trị phải làm đạo hàm bằng $0$.`),
          buoc(R`Với $m=0$ thì $y'=3x(x-2)$ đổi dấu khi đi qua $x=2$.`, R`Kiểm tra điều kiện đủ: đạo hàm phải đổi dấu.`),
        ],
        R`Giá trị cần tìm là $m=0$.`,
        [{ expr: "solve(3*2**2-6*2+x, x)[0]", expect: "0" }, { expr: "diff(3*x**2-6*x, x).subs(x, 2)", expect: "6" }]),
    ],
    [
      luyen(R`Tìm $m$ để hàm số $y=x^3-6x^2+mx$ có hai điểm cực trị.`, R`Điều kiện là $m<12$.`, [{ expr: "solve(36-3*x, x)[0]", expect: "12" }], R`Đạo hàm $3x^2-12x+m$ có $\Delta'=36-3m>0$ nên $m<12$.`),
      luyen(R`Tìm $m$ để hàm số $y=x^3+3x^2+mx$ đạt cực tiểu tại $x=1$.`, R`Giá trị cần tìm là $m=-9$.`, [{ expr: "solve(3*1**2+6*1+x, x)[0]", expect: "-9" }], R`Từ $y'(1)=3+6+m=0$ được $m=-9$, và $y''(1)=6+6=12>0$ nên đó là cực tiểu.`),
      luyen(R`Có bao nhiêu số nguyên $m$ thuộc đoạn $[-5;\ 5]$ để hàm số $y=x^3-3x^2+mx+1$ có hai điểm cực trị?`, R`Có $8$ giá trị nguyên của $m$.`, [{ expr: "2-(-5)+1", expect: "8" }], R`Điều kiện là $m<3$, nên các số nguyên từ $-5$ đến $2$: $2-(-5)+1=8$ số.`),
    ],
    { topicId: "survey" }),
  bai("tiep-tuyen-hs", "Tiếp tuyến của đồ thị hàm số",
    R`Tiếp tuyến của đồ thị $y=f(x)$ tại điểm có hoành độ $x_0$ có phương trình $y=f'(x_0)(x-x_0)+f(x_0)$. Hệ số góc của tiếp tuyến bằng $f'(x_0)$. Hai đường thẳng song song có cùng hệ số góc, và vuông góc khi tích hai hệ số góc bằng $-1$.`,
    [
      vd(R`Viết phương trình tiếp tuyến của đồ thị $y=x^3-3x$ tại điểm có hoành độ $x=2$.`,
        [
          buoc(R`Ta có $y(2)=8-6=2$ và $y'(x)=3x^2-3$, nên $y'(2)=9$.`, R`Cần tọa độ tiếp điểm và hệ số góc tại đó.`),
          buoc(R`Phương trình là $y=9(x-2)+2=9x-16$.`, R`Thay vào công thức $y=f'(x_0)(x-x_0)+f(x_0)$.`),
        ],
        R`Tiếp tuyến là $y=9x-16$.`,
        [{ expr: "diff(x**3-3*x, x).subs(x, 2)", expect: "9" }, { expr: "2-9*2", expect: "-16" }]),
      vd(R`Viết tiếp tuyến của $y=x^3-3x$ song song với đường thẳng $y=-3x+5$.`,
        [
          buoc(R`Hệ số góc phải bằng $-3$, nên $3x^2-3=-3$, tức $x=0$.`, R`Hai đường thẳng song song có cùng hệ số góc.`),
          buoc(R`Tiếp điểm là $(0;\ 0)$ vì $y(0)=0$, nên tiếp tuyến là $y=-3x$.`, R`Tiếp tuyến này khác đường thẳng đã cho vì không đi qua $(0;\ 5)$.`),
        ],
        R`Tiếp tuyến là $y=-3x$.`,
        [{ expr: "solve(3*x**2-3+3, x)[0]", expect: "0" }]),
    ],
    [
      luyen(R`Hệ số góc của tiếp tuyến của $y=x^2-4x$ tại $x=3$ bằng bao nhiêu?`, R`Hệ số góc bằng $2$.`, [{ expr: "diff(x**2-4*x, x).subs(x, 3)", expect: "2" }], R`Ta có $y'=2x-4$ nên $y'(3)=2$.`),
      luyen(R`Viết tiếp tuyến của $y=x^2$ tại điểm có hoành độ $x=1$.`, R`Tiếp tuyến là $y=2x-1$.`, [{ expr: "2*(0-1)+1", expect: "-1" }, { expr: "diff(x**2, x).subs(x, 1)", expect: "2" }], R`Hệ số góc $y'(1)=2$ và $y(1)=1$ nên $y=2(x-1)+1=2x-1$.`),
      luyen(R`Có bao nhiêu tiếp tuyến của đồ thị $y=x^3$ vuông góc với đường thẳng $y=-\frac{x}{3}$?`, R`Có $2$ tiếp tuyến, vì $3x^2=3$ có hai nghiệm.`, [{ expr: "len(solve(3*x**2-3, x))", expect: "2" }], R`Hệ số góc phải bằng $3$ vì $3\cdot\left(-\frac{1}{3}\right)=-1$, nên $3x^2=3$ cho hai hoành độ $x=\pm1$.`),
    ],
    { topicId: "derivative" }),
]);

export const lop12TichPhanNC: GradeChapter = chuong("tp-nang-cao", "Tích phân nâng cao và diện tích", [
  bai("tp-tuyet-doi", "Tích phân có dấu giá trị tuyệt đối",
    R`Để tính $\int_a^b |f(x)|\,dx$, tìm nghiệm của $f(x)=0$ trong đoạn $[a;\ b]$, chia đoạn tại các nghiệm đó, và bỏ dấu giá trị tuyệt đối theo dấu của $f$ trên từng đoạn con rồi cộng các tích phân lại.`,
    [
      vd(R`Tính $\displaystyle\int_0^3 |x-1|\,dx$.`,
        [
          buoc(R`Hàm $x-1$ đổi dấu tại $x=1$, âm trên $[0;\ 1]$ và dương trên $[1;\ 3]$.`, R`Nghiệm của $x-1=0$ chia đoạn thành hai phần.`),
          buoc(R`Ta có $\displaystyle\int_0^1(1-x)\,dx+\int_1^3(x-1)\,dx=\frac{1}{2}+2$.`, R`Trên mỗi đoạn con thay $|x-1|$ bằng $1-x$ hoặc $x-1$.`),
        ],
        R`Giá trị bằng $\frac{5}{2}$.`,
        [{ expr: "integrate(Abs(x-1), (x, 0, 3))", expect: "Rational(5,2)" }, { expr: "integrate(1-x, (x, 0, 1))+integrate(x-1, (x, 1, 3))", expect: "Rational(5,2)" }]),
      vd(R`Tính $\displaystyle\int_{-1}^2 |x^2-1|\,dx$.`,
        [
          buoc(R`Ta có $x^2-1=0$ tại $x=-1$ và $x=1$; trên $[-1;\ 1]$ thì $x^2-1\le0$ và trên $[1;\ 2]$ thì $x^2-1\ge0$.`, R`Xét dấu tam thức bậc hai trên từng đoạn con.`),
          buoc(R`Ta có $\displaystyle\int_{-1}^1(1-x^2)\,dx+\int_1^2(x^2-1)\,dx=\frac{4}{3}+\frac{4}{3}$.`, R`Hai tích phân lần lượt là $2-\frac{2}{3}$ và $\frac{7}{3}-1$.`),
        ],
        R`Giá trị bằng $\frac{8}{3}$.`,
        [{ expr: "integrate(1-x**2, (x, -1, 1))+integrate(x**2-1, (x, 1, 2))", expect: "Rational(8,3)" }]),
    ],
    [
      luyen(R`Tính $\displaystyle\int_0^4 |x-2|\,dx$.`, R`Giá trị bằng $4$.`, [{ expr: "integrate(2-x, (x, 0, 2))+integrate(x-2, (x, 2, 4))", expect: "4" }], R`Chia tại $x=2$: $\int_0^2(2-x)\,dx=2$ và $\int_2^4(x-2)\,dx=2$.`),
      luyen(R`Tính $\displaystyle\int_{-2}^1 |x|\,dx$.`, R`Giá trị bằng $\frac{5}{2}$.`, [{ expr: "integrate(-x, (x, -2, 0))+integrate(x, (x, 0, 1))", expect: "Rational(5,2)" }], R`Chia tại $x=0$: $\int_{-2}^0(-x)\,dx=2$ và $\int_0^1 x\,dx=\frac{1}{2}$.`),
      luyen(R`Tính $\displaystyle\int_0^{\pi}|\cos x|\,dx$.`, R`Giá trị bằng $2$.`, [{ expr: "integrate(cos(x), (x, 0, pi/2))-integrate(cos(x), (x, pi/2, pi))", expect: "2" }], R`Chia tại $x=\frac{\pi}{2}$: mỗi đoạn cho $1$, tổng là $2$.`),
    ],
    { topicId: "integral" }),
  bai("tp-chan-le", "Tích phân trên đoạn đối xứng và hàm chẵn, hàm lẻ",
    R`Nếu $f$ là hàm lẻ thì $\int_{-a}^a f(x)\,dx=0$. Nếu $f$ là hàm chẵn thì $\int_{-a}^a f(x)\,dx=2\int_0^a f(x)\,dx$. Một hàm bất kì có thể tách thành phần chẵn và phần lẻ, rồi áp dụng từng tính chất.`,
    [
      vd(R`Tính $\displaystyle\int_{-2}^2 (x^3+x)\,dx$.`,
        [
          buoc(R`Hàm $f(x)=x^3+x$ là hàm lẻ vì $f(-x)=-f(x)$.`, R`Mỗi số hạng $x^3$ và $x$ đều đổi dấu khi thay $x$ bằng $-x$.`),
          buoc(R`Đoạn $[-2;\ 2]$ đối xứng qua $0$ nên tích phân bằng $0$.`, R`Phần diện tích ở hai bên trục tung triệt tiêu nhau.`),
        ],
        R`Giá trị bằng $0$.`,
        [{ expr: "integrate(x**3+x, (x, -2, 2))", expect: "0" }]),
      vd(R`Tính $\displaystyle\int_{-1}^1 (3x^2+x)\,dx$.`,
        [
          buoc(R`Tách $3x^2$ là hàm chẵn và $x$ là hàm lẻ.`, R`Hàm chẵn có $f(-x)=f(x)$, hàm lẻ có $f(-x)=-f(x)$.`),
          buoc(R`Ta có $\displaystyle 2\int_0^1 3x^2\,dx+0=2\cdot1=2$.`, R`Phần lẻ cho $0$; phần chẵn gấp đôi tích phân trên $[0;\ 1]$.`),
        ],
        R`Giá trị bằng $2$.`,
        [{ expr: "integrate(3*x**2+x, (x, -1, 1))", expect: "2" }]),
    ],
    [
      luyen(R`Tính $\displaystyle\int_{-3}^3 x^5\,dx$.`, R`Giá trị bằng $0$.`, [{ expr: "integrate(x**5, (x, -3, 3))", expect: "0" }], R`Hàm $x^5$ là hàm lẻ nên tích phân trên đoạn đối xứng bằng $0$.`),
      luyen(R`Tính $\displaystyle\int_{-2}^2 x^2\,dx$.`, R`Giá trị bằng $\frac{16}{3}$.`, [{ expr: "2*integrate(x**2, (x, 0, 2))", expect: "Rational(16,3)" }], R`Hàm $x^2$ là hàm chẵn nên bằng $2\int_0^2 x^2\,dx=2\cdot\frac{8}{3}$.`),
      luyen(R`Tính $\displaystyle\int_{-1}^1 (x^4+x^3)\,dx$.`, R`Giá trị bằng $\frac{2}{5}$.`, [{ expr: "integrate(x**4+x**3, (x, -1, 1))", expect: "Rational(2,5)" }], R`Phần lẻ $x^3$ cho $0$, phần chẵn cho $2\int_0^1 x^4\,dx=\frac{2}{5}$.`),
    ],
    { topicId: "integral" }),
  bai("dt-hai-do-thi", "Diện tích hình phẳng giữa hai đồ thị",
    R`Diện tích hình phẳng giới hạn bởi hai đồ thị $y=f(x)$ và $y=g(x)$ là $\int_a^b|f(x)-g(x)|\,dx$, với $a$ và $b$ là các hoành độ giao điểm liên tiếp. Khi hai đồ thị cắt nhau nhiều lần thì chia đoạn tại mọi giao điểm rồi lấy hiệu hàm trên trừ hàm dưới trên từng đoạn.`,
    [
      vd(R`Tính diện tích hình phẳng giới hạn bởi $y=x^2$ và $y=x+2$.`,
        [
          buoc(R`Hoành độ giao điểm: $x^2=x+2\iff x^2-x-2=0$, nên $x=-1$ hoặc $x=2$.`, R`Giải phương trình hoành độ giao điểm để tìm cận.`),
          buoc(R`Trên $[-1;\ 2]$ thì đường thẳng nằm trên parabol, nên $S=\displaystyle\int_{-1}^2(x+2-x^2)\,dx=\frac{9}{2}$.`, R`Lấy hàm trên trừ hàm dưới, ví dụ tại $x=0$: $2>0$.`),
        ],
        R`Diện tích bằng $\frac{9}{2}$.`,
        [{ expr: "integrate(x+2-x**2, (x, -1, 2))", expect: "Rational(9,2)" }, { expr: "Max(*solve(x**2-x-2, x))", expect: "2" }]),
      vd(R`Tính diện tích hình phẳng giới hạn bởi $y=x^3$ và $y=x$.`,
        [
          buoc(R`Hoành độ giao điểm: $x^3=x$ cho $x=-1$, $x=0$, $x=1$.`, R`Phương trình $x(x-1)(x+1)=0$ có ba nghiệm.`),
          buoc(R`Hai phần đối xứng: $S=\displaystyle\int_{-1}^0(x^3-x)\,dx+\int_0^1(x-x^3)\,dx=\frac{1}{4}+\frac{1}{4}$.`, R`Trên $[-1;\ 0]$ đồ thị $y=x^3$ nằm trên, còn trên $[0;\ 1]$ thì đường thẳng nằm trên.`),
        ],
        R`Diện tích bằng $\frac{1}{2}$.`,
        [{ expr: "integrate(x**3-x, (x, -1, 0))+integrate(x-x**3, (x, 0, 1))", expect: "Rational(1,2)" }]),
    ],
    [
      luyen(R`Tính diện tích hình phẳng giới hạn bởi $y=x^2$ và $y=4$.`, R`Diện tích bằng $\frac{32}{3}$.`, [{ expr: "integrate(4-x**2, (x, -2, 2))", expect: "Rational(32,3)" }], R`Giao điểm tại $x=\pm2$ và $S=\int_{-2}^2(4-x^2)\,dx=16-\frac{16}{3}$.`),
      luyen(R`Tính diện tích hình phẳng giới hạn bởi $y=x^2-2x$ và trục $Ox$.`, R`Diện tích bằng $\frac{4}{3}$.`, [{ expr: "integrate(2*x-x**2, (x, 0, 2))", expect: "Rational(4,3)" }], R`Giao điểm với $Ox$ tại $x=0$ và $x=2$, và parabol nằm dưới trục nên $S=\int_0^2(2x-x^2)\,dx$.`),
      luyen(R`Tính diện tích hình phẳng giới hạn bởi $y=x^2$ và $y=x^3$.`, R`Diện tích bằng $\frac{1}{12}$.`, [{ expr: "integrate(x**2-x**3, (x, 0, 1))", expect: "Rational(1,12)" }], R`Giao điểm tại $x=0$ và $x=1$, trên đó $x^2\ge x^3$, nên $S=\frac{1}{3}-\frac{1}{4}$.`),
    ],
    { topicId: "integral" }),
  bai("tp-huu-ti", "Tích phân hàm hữu tỉ",
    R`Nguyên hàm của $\frac{1}{x}$ là $\ln|x|+C$, và nguyên hàm của $\frac{u'(x)}{u(x)}$ là $\ln|u(x)|+C$. Vì vậy các tích phân dạng $\int\frac{dx}{x+a}$ và $\int\frac{2x}{x^2+1}\,dx$ đều đưa về hàm ln.`,
    [
      vd(R`Tính $\displaystyle\int_0^1\frac{1}{x+1}\,dx$.`,
        [
          buoc(R`Một nguyên hàm của $\frac{1}{x+1}$ là $\ln|x+1|$.`, R`Đạo hàm của $\ln|x+1|$ là $\frac{1}{x+1}$.`),
          buoc(R`Giá trị là $\ln2-\ln1=\ln2$.`, R`Lấy giá trị tại cận trên trừ giá trị tại cận dưới, với $\ln1=0$.`),
        ],
        R`Giá trị bằng $\ln2$.`,
        [{ expr: "integrate(1/(x+1), (x, 0, 1))", expect: "log(2)" }]),
      vd(R`Tính $\displaystyle\int_0^1\frac{2x}{x^2+1}\,dx$.`,
        [
          buoc(R`Đặt $u=x^2+1$ thì $u'=2x$, nên biểu thức có dạng $\frac{u'}{u}$.`, R`Tử số đúng bằng đạo hàm của mẫu số.`),
          buoc(R`Giá trị là $\ln(x^2+1)\Big|_0^1=\ln2-\ln1=\ln2$.`, R`Nguyên hàm của $\frac{u'}{u}$ là $\ln|u|$.`),
        ],
        R`Giá trị bằng $\ln2$.`,
        [{ expr: "integrate(2*x/(x**2+1), (x, 0, 1))", expect: "log(2)" }]),
    ],
    [
      luyen(R`Tính $\displaystyle\int_0^2\frac{1}{x+1}\,dx$.`, R`Giá trị bằng $\ln3$.`, [{ expr: "integrate(1/(x+1), (x, 0, 2))", expect: "log(3)" }], R`Nguyên hàm là $\ln|x+1|$, và $\ln3-\ln1=\ln3$.`),
      luyen(R`Tính $\displaystyle\int_1^2\frac{3}{x}\,dx$.`, R`Giá trị bằng $3\ln2$.`, [{ expr: "integrate(3/x, (x, 1, 2))", expect: "3*log(2)" }], R`Nguyên hàm là $3\ln|x|$, và $3\ln2-3\ln1=3\ln2$.`),
      luyen(R`Tính $\displaystyle\int_0^1\frac{x}{x^2+1}\,dx$.`, R`Giá trị bằng $\frac{1}{2}\ln2$.`, [{ expr: "integrate(x/(x**2+1), (x, 0, 1))", expect: "log(2)/2" }], R`Viết $\frac{x}{x^2+1}=\frac{1}{2}\cdot\frac{2x}{x^2+1}$ nên giá trị là $\frac{1}{2}\ln2$.`),
    ],
    { topicId: "integral" }),
]);

export const lop12OxyzNC: GradeChapter = chuong("oxyz-nang-cao", "Hình học Oxyz nâng cao", [
  bai("kc-hai-dt", "Khoảng cách giữa hai đường thẳng chéo nhau",
    R`Hai đường thẳng chéo nhau $\Delta_1$ qua $A$ có vectơ chỉ phương $\vec{u_1}$ và $\Delta_2$ qua $B$ có vectơ chỉ phương $\vec{u_2}$. Khoảng cách giữa chúng là $d=\frac{\left|\left[\vec{u_1},\vec{u_2}\right]\cdot\overrightarrow{AB}\right|}{\left|\left[\vec{u_1},\vec{u_2}\right]\right|}$.`,
    [
      vd(R`Tính khoảng cách giữa $\Delta_1$ qua $A(0;\ 0;\ 0)$ với $\vec{u_1}=(1;\ 0;\ 0)$ và $\Delta_2$ qua $B(0;\ 1;\ 1)$ với $\vec{u_2}=(0;\ 1;\ 0)$.`,
        [
          buoc(R`Tích có hướng $\left[\vec{u_1},\vec{u_2}\right]=(0;\ 0;\ 1)$ và $\overrightarrow{AB}=(0;\ 1;\ 1)$.`, R`Tích có hướng của hai vectơ chỉ phương vuông góc với cả hai đường thẳng.`),
          buoc(R`Tích vô hướng $(0;\ 0;\ 1)\cdot(0;\ 1;\ 1)=1$ và độ dài $\left|\left[\vec{u_1},\vec{u_2}\right]\right|=1$ nên $d=1$.`, R`Thay vào công thức khoảng cách.`),
        ],
        R`Khoảng cách bằng $1$.`,
        [{ expr: "abs(Matrix([0,1,1]).dot(Matrix([1,0,0]).cross(Matrix([0,1,0]))))", expect: "1" }]),
      vd(R`Tính khoảng cách giữa $\Delta_1$ qua $A(0;\ 0;\ 0)$ với $\vec{u_1}=(1;\ 1;\ 0)$ và $\Delta_2$ qua $B(1;\ 0;\ 2)$ với $\vec{u_2}=(0;\ 1;\ 1)$.`,
        [
          buoc(R`Tích có hướng $\left[\vec{u_1},\vec{u_2}\right]=(1;\ -1;\ 1)$ và $\overrightarrow{AB}=(1;\ 0;\ 2)$.`, R`Tính $1\cdot1-0\cdot1$, $0\cdot0-1\cdot1$ và $1\cdot1-1\cdot0$ cho ba tọa độ.`),
          buoc(R`Tích vô hướng bằng $1+0+2=3$ và độ dài là $\sqrt{3}$, nên $d=\frac{3}{\sqrt{3}}=\sqrt{3}$.`, R`Rút gọn phân số bằng cách chia tử và mẫu cho $\sqrt{3}$.`),
        ],
        R`Khoảng cách bằng $\sqrt{3}$.`,
        [{ expr: "abs(Matrix([1,0,2]).dot(Matrix([1,1,0]).cross(Matrix([0,1,1]))))/sqrt(3)", expect: "sqrt(3)" }]),
    ],
    [
      luyen(R`Đường $\Delta_1$ qua $O$ có $\vec{u_1}=(2;\ 0;\ 0)$ và đường $\Delta_2$ qua $B(1;\ 5;\ 4)$ có $\vec{u_2}=(0;\ 3;\ 0)$. Tính khoảng cách giữa hai đường.`, R`Khoảng cách bằng $4$.`, [{ expr: "abs(Matrix([1,5,4]).dot(Matrix([2,0,0]).cross(Matrix([0,3,0]))))/Matrix([2,0,0]).cross(Matrix([0,3,0])).norm()", expect: "4" }], R`Tích có hướng là $(0;\ 0;\ 6)$, tích vô hướng với $\overrightarrow{OB}$ là $24$ và độ dài là $6$, nên $d=\frac{24}{6}=4$.`),
      { ...luyen(R`Hai đường có $\vec{u_1}=(1;\ 2;\ 3)$ và $\vec{u_2}=(2;\ 4;\ 6)$. Có dùng được công thức khoảng cách giữa hai đường chéo nhau không?`, R`Không dùng được, vì hai vectơ cùng phương nên tích có hướng bằng $\vec0$.`, [{ expr: "Matrix([1,2,3]).cross(Matrix([2,4,6])).norm()", expect: "0" }], R`Tích có hướng bằng $\vec0$ nên mẫu số của công thức bằng $0$, và hai đường song song hoặc trùng nhau.`), ask: { kind: "choice", options: ["Dùng được.", "Không dùng được."], correct: 1 } },
      luyen(R`Tính khoảng cách giữa $\Delta_1$ qua $O(0;\ 0;\ 0)$ với $\vec{u_1}=(1;\ 0;\ 0)$ và $\Delta_2$ qua $B(0;\ 0;\ 3)$ với $\vec{u_2}=(0;\ 1;\ 0)$.`, R`Khoảng cách bằng $3$.`, [{ expr: "abs(Matrix([0,0,3]).dot(Matrix([1,0,0]).cross(Matrix([0,1,0]))))", expect: "3" }], R`Tích có hướng $(0;\ 0;\ 1)$, tích vô hướng với $\overrightarrow{OB}$ bằng $3$ và độ dài bằng $1$, nên $d=3$.`),
    ],
    { topicId: "analytic" }),
  bai("mat-cau-tx", "Mặt cầu và mặt phẳng tiếp xúc",
    R`Mặt phẳng $(P)$ tiếp xúc với mặt cầu tâm $I$ bán kính $R$ khi khoảng cách $d(I;\ (P))=R$. Khoảng cách từ $I(x_0;\ y_0;\ z_0)$ đến $(P):\ Ax+By+Cz+D=0$ là $\frac{|Ax_0+By_0+Cz_0+D|}{\sqrt{A^2+B^2+C^2}}$.`,
    [
      vd(R`Mặt cầu tâm $I(1;\ 2;\ 3)$ bán kính $2$ có tiếp xúc với mặt phẳng $(P):\ x+2y+2z-5=0$ không?`,
        [
          buoc(R`Khoảng cách là $d=\frac{|1+4+6-5|}{\sqrt{1+4+4}}=\frac{6}{3}=2$.`, R`Thay tọa độ tâm vào vế trái rồi chia cho độ dài vectơ pháp tuyến $(1;\ 2;\ 2)$.`),
          buoc(R`Vì $d=2=R$ nên mặt phẳng tiếp xúc với mặt cầu.`, R`Khoảng cách từ tâm đến mặt phẳng bằng bán kính.`),
        ],
        R`Có, mặt phẳng tiếp xúc với mặt cầu.`,
        [{ expr: "abs(1+4+6-5)/sqrt(1+4+4)", expect: "2" }]),
      vd(R`Tìm $D$ để mặt phẳng $(P):\ x+2y+2z+D=0$ tiếp xúc với mặt cầu tâm $I(1;\ 2;\ 3)$ bán kính $2$.`,
        [
          buoc(R`Điều kiện là $\frac{|1+4+6+D|}{3}=2$, tức $|11+D|=6$.`, R`Khoảng cách từ $I$ đến $(P)$ phải bằng bán kính.`),
          buoc(R`Suy ra $11+D=6$ hoặc $11+D=-6$, nên $D=-5$ hoặc $D=-17$.`, R`Bỏ dấu giá trị tuyệt đối cho hai trường hợp.`),
        ],
        R`Giá trị cần tìm là $D=-5$ hoặc $D=-17$.`,
        [{ expr: "Max(*solve((11+x)**2-36, x))", expect: "-5" }, { expr: "Min(*solve((11+x)**2-36, x))", expect: "-17" }]),
    ],
    [
      luyen(R`Tính khoảng cách từ $I(0;\ 0;\ 0)$ đến mặt phẳng $2x+y+2z-9=0$.`, R`Khoảng cách bằng $3$.`, [{ expr: "abs(-9)/sqrt(4+1+4)", expect: "3" }], R`Ta có $\frac{|-9|}{\sqrt{4+1+4}}=\frac{9}{3}=3$.`),
      luyen(R`Tìm $D$ dương để mặt phẳng $x+2y+2z+D=0$ tiếp xúc với mặt cầu tâm $O$ bán kính $3$.`, R`Giá trị cần tìm là $D=9$.`, [{ expr: "Max(*solve(x**2-81, x))", expect: "9" }], R`Cần $\frac{|D|}{\sqrt{1+4+4}}=3$, tức $|D|=9$, và lấy giá trị dương $D=9$.`),
      luyen(R`Tìm bán kính mặt cầu tâm $I(1;\ 1;\ 1)$ tiếp xúc với mặt phẳng $x+y+z-6=0$ (kết quả dạng $\sqrt{3}$).`, R`Bán kính bằng $\sqrt{3}$.`, [{ expr: "abs(1+1+1-6)/sqrt(3)", expect: "sqrt(3)" }], R`Bán kính bằng khoảng cách $\frac{|3-6|}{\sqrt{3}}=\frac{3}{\sqrt{3}}=\sqrt{3}$.`),
    ],
    { topicId: "analytic" }),
  bai("hinh-chieu-dx", "Hình chiếu và điểm đối xứng qua mặt phẳng",
    R`Hình chiếu $H$ của $M$ lên mặt phẳng $(P):\ Ax+By+Cz+D=0$ là $H=M-t\vec{n}$ với $\vec{n}=(A;\ B;\ C)$ và $t=\frac{AM_x+BM_y+CM_z+D}{A^2+B^2+C^2}$. Điểm đối xứng $M'$ của $M$ qua $(P)$ là $M'=M-2t\vec{n}$, tức $H$ là trung điểm của $MM'$.`,
    [
      vd(R`Tìm hình chiếu và điểm đối xứng của $M(1;\ 2;\ 3)$ qua mặt phẳng $(P):\ x+y+z-3=0$.`,
        [
          buoc(R`Ta có $\vec{n}=(1;\ 1;\ 1)$ và $t=\frac{1+2+3-3}{3}=1$.`, R`Thay tọa độ $M$ vào vế trái rồi chia cho $A^2+B^2+C^2=3$.`),
          buoc(R`Hình chiếu $H=M-\vec{n}=(0;\ 1;\ 2)$.`, R`Đi từ $M$ ngược chiều pháp tuyến một đoạn $t\vec{n}$.`),
          buoc(R`Điểm đối xứng $M'=M-2\vec{n}=(-1;\ 0;\ 1)$.`, R`Điểm $H$ là trung điểm của $MM'$ nên $M'=2H-M$.`),
        ],
        R`Hình chiếu $H(0;\ 1;\ 2)$ và điểm đối xứng $M'(-1;\ 0;\ 1)$.`,
        [{ expr: "Rational(1+2+3-3, 3)", expect: "1" }, { expr: "2*0-1", expect: "-1" }]),
      vd(R`Tìm điểm đối xứng của $M(4;\ 2;\ 4)$ qua mặt phẳng $(P):\ 2x+y+2z-9=0$.`,
        [
          buoc(R`Ta có $\vec{n}=(2;\ 1;\ 2)$ và $t=\frac{8+2+8-9}{9}=1$.`, R`Thay tọa độ $M$ và chia cho $4+1+4=9$.`),
          buoc(R`Hình chiếu $H=M-\vec{n}=(2;\ 1;\ 2)$ và điểm đối xứng $M'=M-2\vec{n}=(0;\ 0;\ 0)$.`, R`Lấy $M$ trừ một lần rồi hai lần vectơ pháp tuyến.`),
        ],
        R`Điểm đối xứng là $M'(0;\ 0;\ 0)$.`,
        [{ expr: "Rational(8+2+8-9, 9)", expect: "1" }, { expr: "4-2*2", expect: "0" }]),
    ],
    [
      luyen(R`Tìm $t$ của điểm $M(2;\ 0;\ 0)$ với mặt phẳng $x+y+z-1=0$.`, R`Giá trị $t=\frac{1}{3}$.`, [{ expr: "Rational(2+0+0-1, 3)", expect: "Rational(1,3)" }], R`Ta có $\frac{2-1}{3}=\frac{1}{3}$.`),
      luyen(R`Tìm điểm đối xứng $M'$ của $M(1;\ 2;\ 3)$ qua mặt phẳng $x+y+z-9=0$ rồi tính tổng ba tọa độ của $M'$.`, R`Tổng ba tọa độ bằng $12$, vì $M'=(3;\ 4;\ 5)$.`, [{ expr: "sum(Matrix([1,2,3])-2*Rational(1+2+3-9,3)*Matrix([1,1,1]))", expect: "12" }], R`Ta có $t=\frac{6-9}{3}=-1$ nên $M'=M-2t\vec{n}=(1;\ 2;\ 3)+2(1;\ 1;\ 1)=(3;\ 4;\ 5)$.`),
      luyen(R`Tìm hoành độ hình chiếu của $M(2;\ 2;\ 2)$ lên mặt phẳng $x+y+z-3=0$.`, R`Hoành độ bằng $1$.`, [{ expr: "2-Rational(2+2+2-3, 3)", expect: "1" }], R`Ta có $t=\frac{3}{3}=1$ và hoành độ là $2-1\cdot1=1$.`),
    ],
    { topicId: "analytic" }),
]);
