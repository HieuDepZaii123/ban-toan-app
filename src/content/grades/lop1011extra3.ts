/** Lớp 10, phần chi tiết thứ ba: tiêu điểm, tâm sai, đường chuẩn và lập phương trình của ba đường conic. */
import type { GradeChapter } from "./types.ts";
import { bai, buoc, chuong, luyen, vd } from "./types.ts";

const R = String.raw;

export const lop10ConicNC: GradeChapter = chuong("conic-nc", "Elip, hypebol và parabol: tiêu điểm, tâm sai, đường chuẩn", [
  bai("elip-tieu-diem", "Tiêu điểm, tiêu cự và tâm sai của elip",
    R`Elip $\frac{x^2}{a^2}+\frac{y^2}{b^2}=1$ với $a>b>0$ có $c^2=a^2-b^2$, tiêu điểm $F_1(-c;\ 0)$ và $F_2(c;\ 0)$, tiêu cự $2c$ và tâm sai $e=\frac{c}{a}$ thỏa $0<e<1$. Mọi điểm $M$ của elip có $MF_1+MF_2=2a$. Khi mẫu lớn hơn nằm dưới $y^2$ thì trục lớn nằm trên trục tung và tiêu điểm cũng nằm trên trục tung.`,
    [
      vd(R`Tìm tiêu điểm, tiêu cự và tâm sai của elip $\frac{x^2}{25}+\frac{y^2}{9}=1$.`,
        [
          buoc(R`Ta có $a^2=25$ và $b^2=9$, nên $c^2=25-9=16$ và $c=4$.`, R`Dùng hệ thức $c^2=a^2-b^2$ của elip.`),
          buoc(R`Tiêu điểm là $F_1(-4;\ 0)$ và $F_2(4;\ 0)$, tiêu cự bằng $2c=8$.`, R`Tiêu điểm nằm trên trục lớn, cách tâm một đoạn $c$.`),
          buoc(R`Tâm sai là $e=\frac{c}{a}=\frac{4}{5}$.`, R`Tâm sai là tỉ số giữa $c$ và $a$, luôn nhỏ hơn $1$ với elip.`),
        ],
        R`Tiêu điểm $(\pm4;\ 0)$, tiêu cự $8$ và tâm sai $\frac45$.`,
        [{ expr: "25-9", expect: "16" }, { expr: "4*1/5", expect: "4/5" }]),
      vd(R`Điểm $M$ thuộc elip $\frac{x^2}{25}+\frac{y^2}{9}=1$ có $MF_1=7$. Tính $MF_2$.`,
        [
          buoc(R`Với $a=5$ ta có $MF_1+MF_2=2a=10$.`, R`Tổng khoảng cách từ một điểm của elip đến hai tiêu điểm luôn bằng $2a$.`),
          buoc(R`Do đó $MF_2=10-7=3$, và giá trị này nằm giữa $a-c=1$ và $a+c=9$.`, R`Khoảng cách đến một tiêu điểm của elip luôn nằm trong đoạn từ $a-c$ đến $a+c$.`),
        ],
        R`Khoảng cách $MF_2$ bằng $3$.`,
        [{ expr: "10-7", expect: "3" }]),
    ],
    [
      luyen(R`Elip $\frac{x^2}{16}+\frac{y^2}{7}=1$ có tiêu cự bằng bao nhiêu?`, R`Tiêu cự bằng $6$.`, [{ expr: "2*sqrt(16-7)", expect: "6" }], R`Ta có $c^2=16-7=9$ nên $c=3$ và tiêu cự $2c=6$.`),
      luyen(R`Elip có $a=5$ và tâm sai $e=\frac35$. Tìm $b$.`, R`Giá trị cần tìm là $b=4$.`, [{ expr: "sqrt(25-9)", expect: "4" }], R`Từ $c=ae=3$ ta được $b^2=a^2-c^2=25-9=16$ nên $b=4$.`),
      { ...luyen(R`Tiêu điểm của elip $\frac{x^2}{9}+\frac{y^2}{16}=1$ nằm trên trục nào?`, R`Tiêu điểm nằm trên trục tung.`, [{ expr: "16-9", expect: "7" }], R`Mẫu lớn hơn là $16$ nằm dưới $y^2$, nên trục lớn và hai tiêu điểm nằm trên trục tung với $c^2=16-9=7$.`), ask: { kind: "choice", options: ["Trục hoành.", "Trục tung.", "Cả hai trục."], correct: 1 } },
    ],
    { topicId: "analytic" }),
  bai("hypebol-tieu-diem", "Tiêu điểm, tâm sai và tiệm cận của hypebol",
    R`Hypebol $\frac{x^2}{a^2}-\frac{y^2}{b^2}=1$ có $c^2=a^2+b^2$, tiêu điểm $F_1(-c;\ 0)$ và $F_2(c;\ 0)$, tâm sai $e=\frac{c}{a}>1$ và hai tiệm cận $y=\pm\frac{b}{a}x$. Mọi điểm $M$ của hypebol có $\left|MF_1-MF_2\right|=2a$. Khác với elip, ở đây $a$ có thể nhỏ hơn hoặc lớn hơn $b$.`,
    [
      vd(R`Tìm tiêu điểm, tâm sai và tiệm cận của hypebol $\frac{x^2}{9}-\frac{y^2}{16}=1$.`,
        [
          buoc(R`Ta có $a^2=9$ và $b^2=16$, nên $c^2=9+16=25$ và $c=5$.`, R`Hypebol dùng hệ thức $c^2=a^2+b^2$, với dấu cộng chứ không phải dấu trừ.`),
          buoc(R`Tiêu điểm là $F_1(-5;\ 0)$ và $F_2(5;\ 0)$, tâm sai $e=\frac{5}{3}$.`, R`Tâm sai của hypebol luôn lớn hơn $1$.`),
          buoc(R`Hai tiệm cận là $y=\pm\frac{4}{3}x$.`, R`Hệ số góc tiệm cận bằng $\frac{b}{a}$ với $a=3$ và $b=4$.`),
        ],
        R`Tiêu điểm $(\pm5;\ 0)$, tâm sai $\frac53$ và tiệm cận $y=\pm\frac43x$.`,
        [{ expr: "9+16", expect: "25" }, { expr: "4*1/3", expect: "4/3" }]),
      vd(R`Tìm tung độ của điểm $M$ có hoành độ $5$ trên hypebol $\frac{x^2}{9}-\frac{y^2}{16}=1$.`,
        [
          buoc(R`Thay $x=5$ được $\frac{25}{9}-\frac{y^2}{16}=1$, nên $\frac{y^2}{16}=\frac{16}{9}$.`, R`Chuyển vế để tách riêng phần chứa $y^2$.`),
          buoc(R`Do đó $y^2=\frac{256}{9}$ và $y=\pm\frac{16}{3}$.`, R`Lấy căn bậc hai, nhớ rằng có hai dấu vì hypebol đối xứng qua trục hoành.`),
        ],
        R`Có hai điểm $M\left(5;\ \frac{16}{3}\right)$ và $M\left(5;\ -\frac{16}{3}\right)$.`,
        [{ expr: "16*(25/9-1)", expect: "256/9" }]),
    ],
    [
      luyen(R`Hypebol $\frac{x^2}{4}-\frac{y^2}{5}=1$ có tiêu cự bằng bao nhiêu?`, R`Tiêu cự bằng $6$.`, [{ expr: "2*sqrt(4+5)", expect: "6" }], R`Ta có $c^2=4+5=9$ nên $c=3$ và tiêu cự $2c=6$.`),
      luyen(R`Tính tâm sai của hypebol $\frac{x^2}{16}-\frac{y^2}{9}=1$.`, R`Tâm sai bằng $\frac54$.`, [{ expr: "5*1/4", expect: "5/4" }], R`Ta có $c^2=16+9=25$ nên $c=5$ và $e=\frac{c}{a}=\frac{5}{4}$.`),
      { ...luyen(R`Hypebol $\frac{x^2}{4}-\frac{y^2}{16}=1$ có hai tiệm cận nào?`, R`Hai tiệm cận là $y=\pm2x$.`, [{ expr: "sqrt(16)/sqrt(4)", expect: "2" }], R`Hệ số góc tiệm cận bằng $\frac{b}{a}=\frac{4}{2}=2$.`), ask: { kind: "choice", options: [R`$y=\pm2x$`, R`$y=\pm\frac12x$`, R`$y=\pm4x$`], correct: 0 } },
      { ...luyen(R`Cho hypebol $\frac{x^2}{9}-\frac{y^2}{16}=1$. Xét tính đúng sai của từng ý.`, R`Ý a đúng, ý b đúng, ý c sai, ý d sai.`, [{ expr: "9+16", expect: "25" }], R`Ta có $c=5$ nên tiêu cự là $10$ và tâm sai là $\frac53$; tiệm cận có hệ số góc $\frac43$ chứ không phải $\frac34$, và điểm $(0;\ 4)$ cho vế trái bằng $-1$.`), ask: { kind: "truefalse", statements: [R`Tiêu cự của hypebol bằng $10$.`, R`Tâm sai của hypebol bằng $\frac53$.`, R`Hai tiệm cận là $y=\pm\frac34x$.`, R`Điểm $(0;\ 4)$ thuộc hypebol.`], truth: [true, true, false, false] } },
    ],
    { topicId: "analytic" }),
  bai("parabol-chuan", "Tiêu điểm và đường chuẩn của parabol",
    R`Parabol $y^2=2px$ với $p>0$ có tiêu điểm $F\left(\frac{p}{2};\ 0\right)$ và đường chuẩn $\Delta:\ x=-\frac{p}{2}$. Mọi điểm $M$ của parabol có $MF=d(M;\ \Delta)=x_M+\frac{p}{2}$. Parabol $x^2=2py$ có tiêu điểm trên trục tung và đường chuẩn $y=-\frac{p}{2}$.`,
    [
      vd(R`Tìm tiêu điểm và đường chuẩn của parabol $y^2=12x$, rồi tính $MF$ khi $M$ thuộc parabol có hoành độ $5$.`,
        [
          buoc(R`Từ $2p=12$ ta được $p=6$, nên tiêu điểm là $F(3;\ 0)$ và đường chuẩn là $x=-3$.`, R`So sánh với dạng chính tắc $y^2=2px$ để đọc ra $p$.`),
          buoc(R`Khoảng cách từ $M$ đến tiêu điểm bằng khoảng cách đến đường chuẩn, tức $MF=5+3=8$.`, R`Định nghĩa parabol: mọi điểm cách đều tiêu điểm và đường chuẩn.`),
        ],
        R`Tiêu điểm $(3;\ 0)$, đường chuẩn $x=-3$ và $MF=8$.`,
        [{ expr: "12/2", expect: "6" }, { expr: "6/2", expect: "3" }, { expr: "5+3", expect: "8" }]),
      vd(R`Viết phương trình parabol dạng $y^2=2px$ đi qua $A(2;\ 4)$ và tìm tiêu điểm.`,
        [
          buoc(R`Thay tọa độ của $A$ vào: $16=2p\cdot2$, nên $p=4$.`, R`Điểm thuộc parabol thì tọa độ thỏa phương trình.`),
          buoc(R`Phương trình là $y^2=8x$ với tiêu điểm $F(2;\ 0)$.`, R`Tiêu điểm có hoành độ $\frac{p}{2}=2$.`),
        ],
        R`Parabol là $y^2=8x$ và tiêu điểm là $F(2;\ 0)$.`,
        [{ expr: "16/4", expect: "4" }]),
    ],
    [
      luyen(R`Parabol $y^2=20x$ có tiêu điểm với hoành độ bằng bao nhiêu?`, R`Hoành độ bằng $5$.`, [{ expr: "20/4", expect: "5" }], R`Từ $2p=20$ ta được $p=10$ và hoành độ tiêu điểm là $\frac{p}{2}=5$.`),
      luyen(R`Điểm $M$ thuộc parabol $y^2=8x$ có hoành độ $6$. Tính khoảng cách từ $M$ đến tiêu điểm.`, R`Khoảng cách bằng $8$.`, [{ expr: "6+8/4", expect: "8" }], R`Ta có $p=4$ nên $MF=x_M+\frac{p}{2}=6+2=8$.`),
      { ...luyen(R`Tiêu điểm của parabol $x^2=8y$ là điểm nào?`, R`Tiêu điểm là $F(0;\ 2)$.`, [{ expr: "8/4", expect: "2" }], R`Từ $2p=8$ ta được $p=4$ và tiêu điểm nằm trên trục tung tại $\left(0;\ \frac{p}{2}\right)=(0;\ 2)$.`), ask: { kind: "choice", options: [R`$F(2;\ 0)$`, R`$F(0;\ 2)$`, R`$F(0;\ 4)$`], correct: 1 } },
    ],
    { topicId: "analytic" }),
  bai("lap-pt-conic", "Lập phương trình chính tắc của elip, hypebol và parabol",
    R`Để lập phương trình ta tìm các số $a$, $b$ hoặc $p$ từ điều kiện cho trước. Với elip dùng $b^2=a^2-c^2$, với hypebol dùng $b^2=c^2-a^2$, với parabol đỉnh $O$ và tiêu điểm $F\left(\frac{p}{2};\ 0\right)$ ta có $y^2=2px$. Tâm sai $e=\frac{c}{a}$ và hệ số góc tiệm cận $\frac{b}{a}$ giúp tìm $a$ từ $c$.`,
    [
      vd(R`Lập phương trình elip có tiêu điểm $(\pm3;\ 0)$ và tâm sai $e=\frac35$.`,
        [
          buoc(R`Ta có $c=3$ và $e=\frac{c}{a}=\frac35$, nên $a=5$.`, R`Từ tâm sai suy ra độ dài bán trục lớn.`),
          buoc(R`Khi đó $b^2=a^2-c^2=25-9=16$.`, R`Dùng hệ thức của elip để tìm bán trục nhỏ.`),
        ],
        R`Elip cần tìm là $\frac{x^2}{25}+\frac{y^2}{16}=1$.`,
        [{ expr: "3/Rational(3,5)", expect: "5" }, { expr: "25-9", expect: "16" }]),
      vd(R`Lập phương trình hypebol có tiêu điểm $(\pm5;\ 0)$ và hai tiệm cận $y=\pm\frac34x$.`,
        [
          buoc(R`Ta có $\frac{b}{a}=\frac34$ nên $b=\frac34a$, và $c^2=a^2+b^2=25$.`, R`Hệ số góc tiệm cận cho tỉ lệ giữa $a$ và $b$.`),
          buoc(R`Do đó $a^2\left(1+\frac{9}{16}\right)=25$, suy ra $a^2=16$ và $b^2=9$.`, R`Thay $b=\frac34a$ vào hệ thức rồi giải phương trình theo $a^2$.`),
        ],
        R`Hypebol cần tìm là $\frac{x^2}{16}-\frac{y^2}{9}=1$.`,
        [{ expr: "25/(1+Rational(9,16))", expect: "16" }]),
    ],
    [
      luyen(R`Elip có độ dài trục lớn bằng $10$ và tiêu cự bằng $6$. Tìm $b^2$.`, R`Giá trị cần tìm là $b^2=16$.`, [{ expr: "25-9", expect: "16" }], R`Ta có $2a=10$ nên $a=5$, và $2c=6$ nên $c=3$, suy ra $b^2=25-9=16$.`),
      luyen(R`Hypebol có tiêu cự bằng $10$ và $a=3$. Tìm $b$.`, R`Giá trị cần tìm là $b=4$.`, [{ expr: "sqrt(25-9)", expect: "4" }], R`Ta có $c=5$ nên $b^2=c^2-a^2=25-9=16$ và $b=4$.`),
      { ...luyen(R`Parabol đỉnh $O$ có tiêu điểm $F(3;\ 0)$ có phương trình nào?`, R`Phương trình là $y^2=12x$.`, [{ expr: "2*3*2", expect: "12" }], R`Từ $\frac{p}{2}=3$ ta được $p=6$ nên $y^2=2px=12x$.`), ask: { kind: "choice", options: [R`$y^2=6x$`, R`$y^2=12x$`, R`$y^2=3x$`], correct: 1 } },
    ],
    { topicId: "analytic" }),
]);
