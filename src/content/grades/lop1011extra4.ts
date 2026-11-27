/** Lớp 10, phần chi tiết thứ tư: đường thẳng với đường tròn, tiếp tuyến và hai đường tròn. */
import type { GradeChapter } from "./types.ts";
import { bai, buoc, chuong, luyen, vd } from "./types.ts";

const R = String.raw;

export const lop10DuongTronNC: GradeChapter = chuong("duong-tron-nc", "Đường thẳng, tiếp tuyến và hai đường tròn", [
  bai("vtt-dt-tron", "Vị trí tương đối của đường thẳng và đường tròn",
    R`Cho đường tròn $(C)$ tâm $I(x_0;\ y_0)$ bán kính $R$ và đường thẳng $\Delta:\ ax+by+c=0$. Đặt $h=\frac{\left|ax_0+by_0+c\right|}{\sqrt{a^2+b^2}}$ là khoảng cách từ $I$ đến $\Delta$. Nếu $h>R$ thì $\Delta$ không cắt $(C)$, nếu $h=R$ thì $\Delta$ tiếp xúc với $(C)$, và nếu $h<R$ thì $\Delta$ cắt $(C)$ tại hai điểm với dây cung dài $2\sqrt{R^2-h^2}$.`,
    [
      vd(R`Cho đường tròn $(C):\ (x-1)^2+(y+2)^2=25$ và đường thẳng $\Delta:\ 3x+4y-10=0$. Xét vị trí tương đối và tính độ dài dây cung nếu có.`,
        [
          buoc(R`Tâm là $I(1;\ -2)$ và bán kính $R=5$.`, R`Đọc tâm và bán kính từ phương trình chính tắc của đường tròn.`),
          buoc(R`Khoảng cách từ $I$ đến $\Delta$ là $h=\frac{\left|3-8-10\right|}{5}=3$, nhỏ hơn $R$ nên $\Delta$ cắt $(C)$ tại hai điểm.`, R`So sánh khoảng cách từ tâm đến đường thẳng với bán kính.`),
          buoc(R`Dây cung dài $2\sqrt{25-9}=8$.`, R`Nửa dây cung, khoảng cách $h$ và bán kính tạo thành tam giác vuông.`),
        ],
        R`Đường thẳng cắt đường tròn và dây cung dài $8$.`,
        [{ expr: "Abs(3*1+4*(-2)-10)/sqrt(9+16)", expect: "3" }, { expr: "2*sqrt(25-9)", expect: "8" }]),
      vd(R`Tìm $m$ để đường thẳng $\Delta:\ x+y+m=0$ tiếp xúc với đường tròn $x^2+y^2=2$.`,
        [
          buoc(R`Tâm là $O(0;\ 0)$ và $R=\sqrt2$, nên khoảng cách từ $O$ đến $\Delta$ là $\frac{\left|m\right|}{\sqrt2}$.`, R`Thay tọa độ tâm vào vế trái và chia cho độ dài pháp tuyến.`),
          buoc(R`Tiếp xúc khi $\frac{\left|m\right|}{\sqrt2}=\sqrt2$, tức $\left|m\right|=2$.`, R`Điều kiện tiếp xúc là khoảng cách từ tâm bằng bán kính.`),
        ],
        R`Giá trị cần tìm là $m=2$ hoặc $m=-2$.`,
        [{ expr: "sqrt(2)*sqrt(2)", expect: "2" }]),
    ],
    [
      luyen(R`Tính khoảng cách từ $I(2;\ 1)$ đến đường thẳng $4x-3y+5=0$.`, R`Khoảng cách bằng $2$.`, [{ expr: "Abs(4*2-3*1+5)/sqrt(16+9)", expect: "2" }], R`Ta có $\frac{\left|8-3+5\right|}{\sqrt{16+9}}=\frac{10}{5}=2$.`),
      { ...luyen(R`Đường tròn $x^2+y^2=9$ và đường thẳng $x+y-6=0$ có bao nhiêu điểm chung?`, R`Không có điểm chung nào.`, [{ expr: "6/sqrt(2)", expect: "3*sqrt(2)" }], R`Khoảng cách từ tâm là $\frac{6}{\sqrt2}=3\sqrt2$, lớn hơn bán kính $3$.`), ask: { kind: "choice", options: ["$0$ điểm.", "$1$ điểm.", "$2$ điểm."], correct: 0 } },
      luyen(R`Đường thẳng $x=3$ cắt đường tròn $x^2+y^2=25$ tại hai điểm. Tính độ dài dây cung.`, R`Dây cung dài $8$.`, [{ expr: "2*sqrt(25-9)", expect: "8" }], R`Khoảng cách từ tâm là $3$ nên dây cung dài $2\sqrt{25-9}=8$.`),
    ],
    { topicId: "analytic" }),
  bai("tiep-tuyen-tron", "Tiếp tuyến của đường tròn",
    R`Tiếp tuyến của $(C)$ tại $M_0(x_0;\ y_0)\in(C)$ nhận $\overrightarrow{IM_0}$ làm vectơ pháp tuyến, nên có phương trình $(x_0-a)(x-x_0)+(y_0-b)(y-y_0)=0$ với $I(a;\ b)$. Tiếp tuyến đi qua một điểm $A$ nằm ngoài $(C)$ được tìm bằng cách viết đường thẳng qua $A$ rồi cho khoảng cách từ $I$ bằng $R$, và thường có hai tiếp tuyến. Tiếp tuyến song song với $ax+by+c=0$ có dạng $ax+by+c'=0$ với khoảng cách từ $I$ bằng $R$.`,
    [
      vd(R`Viết tiếp tuyến của $(C):\ (x-1)^2+(y-2)^2=25$ tại $M_0(4;\ 6)$.`,
        [
          buoc(R`Điểm $M_0$ thuộc $(C)$ vì $(4-1)^2+(6-2)^2=9+16=25$.`, R`Thay tọa độ điểm vào phương trình để kiểm tra điểm nằm trên đường tròn.`),
          buoc(R`Vectơ $\overrightarrow{IM_0}=(3;\ 4)$ là pháp tuyến nên tiếp tuyến là $3(x-4)+4(y-6)=0$.`, R`Tiếp tuyến vuông góc với bán kính tại tiếp điểm.`),
        ],
        R`Tiếp tuyến là $3x+4y-36=0$.`,
        [{ expr: "(4-1)**2+(6-2)**2", expect: "25" }, { expr: "3*4+4*6-36", expect: "0" }]),
      vd(R`Viết các tiếp tuyến của $x^2+y^2=9$ đi qua $A(5;\ 0)$.`,
        [
          buoc(R`Đường thẳng qua $A$ là $y=k(x-5)$, tức $kx-y-5k=0$, và khoảng cách từ $O$ là $\frac{5\left|k\right|}{\sqrt{k^2+1}}$.`, R`Đường thẳng đứng $x=5$ không tiếp xúc nên có thể dùng hệ số góc.`),
          buoc(R`Cho khoảng cách bằng $3$: $25k^2=9(k^2+1)$, nên $k^2=\frac{9}{16}$ và $k=\pm\frac34$.`, R`Bình phương hai vế rồi giải phương trình theo $k^2$.`),
        ],
        R`Hai tiếp tuyến là $3x-4y-15=0$ và $3x+4y-15=0$.`,
        [{ expr: "sqrt(Rational(9,16))", expect: "3/4" }]),
    ],
    [
      luyen(R`Tiếp tuyến của $x^2+y^2=25$ tại $M_0(3;\ 4)$ có hệ số của $x$ bằng $3$, hệ số của $y$ bằng $4$ và hằng số $c$. Tìm $c$.`, R`Giá trị cần tìm là $c=-25$.`, [{ expr: "-(3*3+4*4)", expect: "-25" }], R`Phương trình là $3(x-3)+4(y-4)=0$ nên hằng số là $-9-16=-25$.`),
      luyen(R`Tiếp tuyến của $x^2+y^2=4$ song song với đường $x+y=0$ có dạng $x+y+c=0$. Tìm giá trị dương của $c$.`, R`Giá trị cần tìm là $c=2\sqrt2$.`, [{ expr: "sqrt(2)*2", expect: "2*sqrt(2)" }], R`Cần $\frac{\left|c\right|}{\sqrt2}=2$ nên $\left|c\right|=2\sqrt2$.`),
      { ...luyen(R`Từ $A(5;\ 0)$ kẻ được bao nhiêu tiếp tuyến đến đường tròn $x^2+y^2=9$?`, R`Kẻ được hai tiếp tuyến.`, [{ expr: "5**2+0-9", expect: "16" }], R`Vì $OA^2-R^2=25-9=16>0$ nên $A$ nằm ngoài đường tròn và có hai tiếp tuyến.`), ask: { kind: "choice", options: ["$0$ tiếp tuyến.", "$1$ tiếp tuyến.", "$2$ tiếp tuyến."], correct: 2 } },
    ],
    { topicId: "analytic" }),
  bai("hai-duong-tron", "Vị trí tương đối của hai đường tròn",
    R`Cho $(C)$ tâm $I$ bán kính $R$ và $(C')$ tâm $I'$ bán kính $R'$, và đặt $d=II'$. Nếu $d>R+R'$ thì hai đường tròn ở ngoài nhau, nếu $d=R+R'$ thì tiếp xúc ngoài, nếu $\left|R-R'\right|<d<R+R'$ thì cắt nhau tại hai điểm, nếu $d=\left|R-R'\right|$ với $R\ne R'$ thì tiếp xúc trong, nếu $d<\left|R-R'\right|$ thì đường tròn này chứa đường tròn kia, và nếu $d=0$ với $R=R'$ thì hai đường tròn trùng nhau. Khi hai đường tròn cắt nhau, trừ vế hai phương trình ta được đường thẳng chứa dây cung chung.`,
    [
      vd(R`Xét vị trí của $(C):\ x^2+y^2=9$ và $(C'):\ (x-5)^2+y^2=4$.`,
        [
          buoc(R`Tâm $O(0;\ 0)$ với $R=3$ và tâm $I'(5;\ 0)$ với $R'=2$.`, R`Đọc tâm và bán kính của từng đường tròn.`),
          buoc(R`Khoảng cách hai tâm $d=5$ và $R+R'=5$ nên $d=R+R'$.`, R`So sánh khoảng cách hai tâm với tổng và hiệu hai bán kính.`),
        ],
        R`Hai đường tròn tiếp xúc ngoài.`,
        [{ expr: "sqrt(25)", expect: "5" }]),
      vd(R`Cho $(C):\ x^2+y^2=25$ và $(C'):\ (x-8)^2+y^2=25$. Chứng tỏ hai đường tròn cắt nhau và tính độ dài dây chung.`,
        [
          buoc(R`Ta có $d=8$ và $R+R'=10$, $\left|R-R'\right|=0$ nên $0<d<10$, hai đường tròn cắt nhau.`, R`Điều kiện cắt nhau là khoảng cách hai tâm nằm giữa hiệu và tổng hai bán kính.`),
          buoc(R`Trừ vế hai phương trình được $16x-64=0$, tức dây chung nằm trên đường $x=4$.`, R`Hiệu hai phương trình là đường thẳng đi qua hai giao điểm.`),
          buoc(R`Thay $x=4$ vào $(C)$ được $y^2=9$, nên hai giao điểm là $(4;\ 3)$ và $(4;\ -3)$ với dây chung dài $6$.`, R`Giải phương trình theo $y$ rồi tính khoảng cách hai giao điểm.`),
        ],
        R`Hai đường tròn cắt nhau và dây chung dài $6$.`,
        [{ expr: "2*sqrt(25-16)", expect: "6" }]),
    ],
    [
      luyen(R`Tính khoảng cách hai tâm của $(x-1)^2+y^2=1$ và $(x+2)^2+y^2=4$.`, R`Khoảng cách bằng $3$.`, [{ expr: "sqrt((1-(-2))**2+0)", expect: "3" }], R`Tâm là $(1;\ 0)$ và $(-2;\ 0)$ nên khoảng cách bằng $\left|1+2\right|=3$.`),
      { ...luyen(R`Đường tròn tâm $O$ bán kính $5$ và đường tròn tâm $(3;\ 0)$ bán kính $2$ có vị trí tương đối nào?`, R`Hai đường tròn tiếp xúc trong.`, [{ expr: "sqrt((3-0)**2+0**2)", expect: "3" }], R`Khoảng cách hai tâm bằng $3$ và $R-R'=5-2=3$ nên chúng tiếp xúc trong.`), ask: { kind: "choice", options: ["Tiếp xúc ngoài.", "Tiếp xúc trong.", "Cắt nhau tại hai điểm."], correct: 1 } },
      luyen(R`Hai đường tròn $x^2+y^2=25$ và $x^2+(y-6)^2=25$ cắt nhau. Tính độ dài dây chung.`, R`Dây chung dài $8$.`, [{ expr: "2*sqrt(25-9)", expect: "8" }], R`Trừ vế được $12y-36=0$ nên $y=3$ và $x^2=16$, do đó dây chung dài $2\cdot4=8$.`),
    ],
    { topicId: "analytic" }),
]);
