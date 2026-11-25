/** Lớp 12, phần chi tiết thứ năm: tích vô hướng, quan hệ song song và vuông góc trong không gian Oxyz. */
import type { GradeChapter } from "./types.ts";
import { bai, buoc, chuong, luyen, vd } from "./types.ts";

const R = String.raw;

export const lop12QuanHeOxyz: GradeChapter = chuong("quan-he-oxyz", "Tích vô hướng, song song và vuông góc trong Oxyz", [
  bai("tich-vo-huong-kg", "Tích vô hướng và góc giữa hai vectơ trong không gian",
    R`Với $\vec a=(a_1;\ a_2;\ a_3)$ và $\vec b=(b_1;\ b_2;\ b_3)$, tích vô hướng là $\vec a\cdot\vec b=a_1b_1+a_2b_2+a_3b_3$ và độ dài là $|\vec a|=\sqrt{a_1^2+a_2^2+a_3^2}$. Góc $\varphi$ giữa hai vectơ khác $\vec0$ thỏa $\cos\varphi=\frac{\vec a\cdot\vec b}{|\vec a|\,|\vec b|}$, và hai vectơ vuông góc khi tích vô hướng bằng $0$.`,
    [
      vd(R`Cho $\vec a=(1;\ 2;\ 2)$ và $\vec b=(2;\ -1;\ 0)$. Tính $|\vec a|$ và xét xem hai vectơ có vuông góc không.`,
        [
          buoc(R`Độ dài là $|\vec a|=\sqrt{1+4+4}=3$.`, R`Cộng bình phương ba tọa độ rồi lấy căn.`),
          buoc(R`Tích vô hướng là $1\cdot2+2\cdot(-1)+2\cdot0=0$ nên hai vectơ vuông góc.`, R`Hai vectơ vuông góc khi tích vô hướng bằng $0$.`),
        ],
        R`Độ dài bằng $3$ và hai vectơ vuông góc.`,
        [{ expr: "Matrix([1,2,2]).norm()", expect: "3" }, { expr: "Matrix([1,2,2]).dot(Matrix([2,-1,0]))", expect: "0" }]),
      vd(R`Tính góc giữa $\vec a=(1;\ 1;\ 0)$ và $\vec b=(0;\ 1;\ 1)$.`,
        [
          buoc(R`Tích vô hướng là $0+1+0=1$, và $|\vec a|=|\vec b|=\sqrt2$.`, R`Tính tử và mẫu của $\cos\varphi$.`),
          buoc(R`Do đó $\cos\varphi=\frac{1}{\sqrt2\cdot\sqrt2}=\frac12$ nên $\varphi=60^\circ$.`, R`Đây là giá trị lượng giác quen thuộc.`),
        ],
        R`Góc giữa hai vectơ bằng $60^\circ$.`,
        [{ expr: "acos(1/(sqrt(2)*sqrt(2)))*180/pi", expect: "60" }]),
    ],
    [
      luyen(R`Tìm $m$ để $\vec a=(1;\ m;\ 2)$ vuông góc với $\vec b=(2;\ 1;\ 1)$.`, R`Giá trị cần tìm là $m=-4$.`, [{ expr: "solve(1*2+x*1+2*1, x)[0]", expect: "-4" }], R`Cần $1\cdot2+m\cdot1+2\cdot1=0$ nên $m=-4$.`),
      luyen(R`Tính tích vô hướng của $(3;\ -1;\ 2)$ và $(1;\ 4;\ 2)$.`, R`Tích vô hướng bằng $3$.`, [{ expr: "Matrix([3,-1,2]).dot(Matrix([1,4,2]))", expect: "3" }], R`Ta có $3\cdot1+(-1)\cdot4+2\cdot2=3-4+4=3$.`),
      luyen(R`Tính góc giữa $(1;\ 0;\ 0)$ và $(1;\ 1;\ \sqrt2)$ theo đơn vị độ.`, R`Góc bằng $60$ độ.`, [{ expr: "acos(1/(1*sqrt(1+1+2)))*180/pi", expect: "60" }], R`Tích vô hướng là $1$, $|(1;\ 1;\ \sqrt2)|=2$ nên $\cos\varphi=\frac12$ và $\varphi=60^\circ$.`),
    ],
    { topicId: "analytic" }),
  bai("goc-hai-dt-kg", "Góc giữa hai đường thẳng trong không gian",
    R`Góc $\varphi$ giữa hai đường thẳng có vectơ chỉ phương $\vec{u_1}$ và $\vec{u_2}$ thỏa $\cos\varphi=\frac{|\vec{u_1}\cdot\vec{u_2}|}{|\vec{u_1}|\,|\vec{u_2}|}$ với $0^\circ\le\varphi\le90^\circ$. Hai đường vuông góc khi $\vec{u_1}\cdot\vec{u_2}=0$, và song song hoặc trùng khi hai chỉ phương cùng phương.`,
    [
      vd(R`Tính góc giữa hai đường thẳng có chỉ phương $(1;\ 1;\ 0)$ và $(1;\ 0;\ 1)$.`,
        [
          buoc(R`Tích vô hướng là $1$ và mỗi chỉ phương có độ dài $\sqrt2$.`, R`Tính tử số và độ dài từng vectơ.`),
          buoc(R`Do đó $\cos\varphi=\frac{1}{2}$ và $\varphi=60^\circ$.`, R`Dùng trị tuyệt đối để góc không vượt quá $90^\circ$.`),
        ],
        R`Góc giữa hai đường bằng $60^\circ$.`,
        [{ expr: "Abs(1*1+1*0+0*1)/(sqrt(2)*sqrt(2))", expect: "Rational(1,2)" }]),
      vd(R`Tìm $m$ để hai đường có chỉ phương $(1;\ 1;\ m)$ và $(1;\ 2;\ -1)$ vuông góc.`,
        [
          buoc(R`Cần $1\cdot1+1\cdot2+m\cdot(-1)=0$.`, R`Hai đường vuông góc khi tích vô hướng hai chỉ phương bằng $0$.`),
          buoc(R`Suy ra $3-m=0$ nên $m=3$.`, R`Giải phương trình bậc nhất theo $m$.`),
        ],
        R`Giá trị cần tìm là $m=3$.`,
        [{ expr: "solve(1*1+1*2+x*(-1), x)[0]", expect: "3" }]),
    ],
    [
      luyen(R`Tính góc giữa hai đường có chỉ phương $(1;\ 1;\ 0)$ và $(0;\ 1;\ 0)$ theo đơn vị độ.`, R`Góc bằng $45$ độ.`, [{ expr: "acos(Abs(1*0+1*1+0*0)/(sqrt(2)*1))*180/pi", expect: "45" }], R`Tích vô hướng là $1$, độ dài là $\sqrt2$ và $1$, nên $\cos\varphi=\frac{1}{\sqrt2}$ và $\varphi=45^\circ$.`),
      luyen(R`Tìm $m$ để hai đường có chỉ phương $(m;\ 1;\ 2)$ và $(1;\ -3;\ 1)$ vuông góc.`, R`Giá trị cần tìm là $m=1$.`, [{ expr: "solve(x*1+1*(-3)+2*1, x)[0]", expect: "1" }], R`Cần $m-3+2=0$ nên $m=1$.`),
      { ...luyen(R`Hai đường thẳng có chỉ phương $(1;\ 2;\ 3)$ và $(2;\ 4;\ 6)$. Hai chỉ phương có quan hệ gì?`, R`Hai chỉ phương cùng phương.`, [{ expr: "Matrix([1,2,3]).cross(Matrix([2,4,6])).norm()", expect: "0" }], R`Vì $(2;\ 4;\ 6)=2\cdot(1;\ 2;\ 3)$ nên tích có hướng bằng $\vec0$, hai đường song song hoặc trùng nhau, không vuông góc.`), ask: { kind: "choice", options: ["Hai chỉ phương cùng phương.", "Hai chỉ phương vuông góc.", "Không cùng phương và không vuông góc."], correct: 0 } },
    ],
    { topicId: "analytic" }),
  bai("song-song-vuong-goc-mp", "Hai mặt phẳng song song, vuông góc và góc giữa chúng",
    R`Hai mặt phẳng $(P):\ A_1x+B_1y+C_1z+D_1=0$ và $(Q):\ A_2x+B_2y+C_2z+D_2=0$ song song khi hai pháp tuyến cùng phương và hai mặt không trùng nhau, vuông góc khi $\vec{n_1}\cdot\vec{n_2}=0$. Góc giữa chúng thỏa $\cos\varphi=\frac{|\vec{n_1}\cdot\vec{n_2}|}{|\vec{n_1}|\,|\vec{n_2}|}$.`,
    [
      vd(R`Xét vị trí của $(P):\ x+2y-z+1=0$ và $(Q):\ 2x+4y-2z+5=0$.`,
        [
          buoc(R`Hai pháp tuyến $(1;\ 2;\ -1)$ và $(2;\ 4;\ -2)$ cùng phương vì tích có hướng bằng $\vec0$.`, R`Pháp tuyến của $(Q)$ gấp đôi pháp tuyến của $(P)$.`),
          buoc(R`Viết $(Q)$ thành $x+2y-z+\frac52=0$ có hằng số khác $1$, nên hai mặt không trùng nhau.`, R`Chia hai vế của $(Q)$ cho $2$ để cùng hệ số với $(P)$.`),
        ],
        R`Hai mặt phẳng song song.`,
        [{ expr: "Matrix([1,2,-1]).cross(Matrix([2,4,-2])).norm()", expect: "0" }]),
      vd(R`Tìm $m$ để $(P):\ x+y+z=0$ vuông góc với $(Q):\ 2x-y+mz+1=0$.`,
        [
          buoc(R`Pháp tuyến là $(1;\ 1;\ 1)$ và $(2;\ -1;\ m)$.`, R`Lấy hệ số của $x$, $y$, $z$ trong từng phương trình.`),
          buoc(R`Cần $1\cdot2+1\cdot(-1)+1\cdot m=0$ nên $m=-1$.`, R`Hai mặt vuông góc khi tích vô hướng hai pháp tuyến bằng $0$.`),
        ],
        R`Giá trị cần tìm là $m=-1$.`,
        [{ expr: "solve(1*2+1*(-1)+1*x, x)[0]", expect: "-1" }]),
    ],
    [
      luyen(R`Tính góc giữa $(P):\ \sqrt3x+y=0$ và $(Q):\ y=0$ theo đơn vị độ.`, R`Góc bằng $60$ độ.`, [{ expr: "acos(Abs(sqrt(3)*0+1*1+0*0)/(2*1))*180/pi", expect: "60" }], R`Pháp tuyến $(\sqrt3;\ 1;\ 0)$ có độ dài $2$ và $(0;\ 1;\ 0)$ có độ dài $1$, nên $\cos\varphi=\frac12$ và $\varphi=60^\circ$.`),
      luyen(R`Tìm $m$ để $(P):\ x+my+2z-1=0$ song song với $(Q):\ 2x+4y+4z+3=0$.`, R`Giá trị cần tìm là $m=2$.`, [{ expr: "solve(x-4*Rational(1,2), x)[0]", expect: "2" }], R`Pháp tuyến $(2;\ 4;\ 4)$ gấp đôi $(1;\ 2;\ 2)$ nên $m=2$, và hằng số $-1$ không tỉ lệ với $\frac32$ nên hai mặt không trùng.`),
      { ...luyen(R`Hai mặt phẳng $2x-y+z=0$ và $x+y-z=0$ có quan hệ gì?`, R`Hai mặt phẳng vuông góc.`, [{ expr: "2*1+(-1)*1+1*(-1)", expect: "0" }], R`Hai pháp tuyến $(2;\ -1;\ 1)$ và $(1;\ 1;\ -1)$ có tích vô hướng $2-1-1=0$.`), ask: { kind: "choice", options: ["Hai mặt phẳng vuông góc.", "Hai mặt phẳng song song.", "Cắt nhau nhưng không vuông góc."], correct: 0 } },
    ],
    { topicId: "analytic" }),
  bai("duong-mat-quan-he", "Đường thẳng và mặt phẳng: song song, vuông góc và góc",
    R`Đường thẳng $d$ có chỉ phương $\vec u$ và mặt phẳng $(P)$ có pháp tuyến $\vec n$. Khi $\vec u\cdot\vec n=0$, $d$ song song với $(P)$ nếu một điểm của $d$ không thuộc $(P)$, và nằm trong $(P)$ nếu điểm đó thuộc $(P)$. Khi $\vec u$ và $\vec n$ cùng phương, $d$ vuông góc với $(P)$. Góc $\varphi$ giữa $d$ và $(P)$ thỏa $\sin\varphi=\frac{|\vec u\cdot\vec n|}{|\vec u|\,|\vec n|}$.`,
    [
      vd(R`Đường thẳng $d$ qua $M(0;\ 0;\ 1)$ có chỉ phương $(1;\ 1;\ 1)$ và $(P):\ x-2y+z-3=0$. Xét vị trí của $d$ và $(P)$.`,
        [
          buoc(R`Pháp tuyến là $(1;\ -2;\ 1)$ và $\vec u\cdot\vec n=1-2+1=0$.`, R`Tích vô hướng bằng $0$ nên $d$ song song hoặc nằm trong $(P)$.`),
          buoc(R`Điểm $M$ có $0-0+1-3=-2\ne0$ nên không thuộc $(P)$.`, R`Thử điểm của $d$ vào phương trình của $(P)$.`),
        ],
        R`Đường thẳng $d$ song song với $(P)$.`,
        [{ expr: "Matrix([1,1,1]).dot(Matrix([1,-2,1]))", expect: "0" }, { expr: "0-0+1-3", expect: "-2" }]),
      vd(R`Tính góc giữa đường thẳng có chỉ phương $(0;\ 0;\ 1)$ và mặt phẳng $x+z=0$.`,
        [
          buoc(R`Pháp tuyến là $(1;\ 0;\ 1)$, tích vô hướng là $1$, độ dài là $1$ và $\sqrt2$.`, R`Lấy hệ số của $x$, $y$, $z$ làm pháp tuyến.`),
          buoc(R`Do đó $\sin\varphi=\frac{1}{\sqrt2}$ nên $\varphi=45^\circ$.`, R`Góc giữa đường và mặt dùng sin chứ không dùng cos.`),
        ],
        R`Góc giữa đường thẳng và mặt phẳng bằng $45^\circ$.`,
        [{ expr: "asin(Abs(0*1+0*0+1*1)/(1*sqrt(2)))*180/pi", expect: "45" }]),
    ],
    [
      luyen(R`Tìm $m$ để đường thẳng có chỉ phương $(1;\ 2;\ m)$ vuông góc với mặt phẳng có pháp tuyến $(2;\ 4;\ 6)$.`, R`Giá trị cần tìm là $m=3$.`, [{ expr: "solve(1*6-x*2, x)[0]", expect: "3" }], R`Chỉ phương phải cùng phương với pháp tuyến, nên $\frac{1}{2}=\frac{m}{6}$ và $m=3$.`),
      luyen(R`Tìm $m$ để đường thẳng có chỉ phương $(1;\ -1;\ 2)$ song song với mặt phẳng có pháp tuyến $(1;\ m;\ -1)$ (điểm của đường không thuộc mặt).`, R`Giá trị cần tìm là $m=-1$.`, [{ expr: "solve(1*1+(-1)*x+2*(-1), x)[0]", expect: "-1" }], R`Cần $\vec u\cdot\vec n=1-m-2=0$ nên $m=-1$.`),
      luyen(R`Tính góc giữa đường thẳng có chỉ phương $(1;\ 0;\ \sqrt3)$ và mặt phẳng $z=0$ theo đơn vị độ.`, R`Góc bằng $60$ độ.`, [{ expr: "asin(sqrt(3)/(2*1))*180/pi", expect: "60" }], R`Pháp tuyến $(0;\ 0;\ 1)$ cho $\sin\varphi=\frac{\sqrt3}{2}$, tức $\varphi=60^\circ$.`),
    ],
    { topicId: "analytic" }),
]);
