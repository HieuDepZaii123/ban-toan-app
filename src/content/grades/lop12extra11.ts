/** Lớp 12, chi tiết thứ mười một: vị trí tương đối với mặt cầu, khoảng cách song song và các bài vận dụng cao trong Oxyz. */
import type { GradeChapter } from "./types.ts";
import { bai, buoc, chuong, luyen, vd } from "./types.ts";

const R = String.raw;

export const lop12MatCauVtt: GradeChapter = chuong("mat-cau-vtt", "Mặt cầu: giao với mặt phẳng, đường thẳng, mặt cầu khác và khoảng cách song song", [
  bai("cau-cat-mp-dt", "Mặt phẳng và đường thẳng cắt mặt cầu",
    R`Cho mặt cầu $(S)$ tâm $I$ bán kính $R$. Mặt phẳng $(P)$ với $h=d\left(I;\ (P)\right)<R$ cắt $(S)$ theo đường tròn có bán kính $r=\sqrt{R^2-h^2}$ và tâm là hình chiếu của $I$ lên $(P)$. Đường thẳng $\Delta$ với $h=d(I;\ \Delta)<R$ cắt $(S)$ tại hai điểm với dây cung dài $2\sqrt{R^2-h^2}$. Khi $h=R$ thì tiếp xúc, và khi $h>R$ thì không có điểm chung.`,
    [
      vd(R`Cho $(S):\ (x-1)^2+(y-2)^2+(z-3)^2=25$ và $(P):\ 2x-y+2z+3=0$. Chứng tỏ $(P)$ cắt $(S)$ và tìm bán kính, tâm của đường tròn giao.`,
        [
          buoc(R`Tâm $I(1;\ 2;\ 3)$ và $R=5$, khoảng cách từ $I$ đến $(P)$ là $h=\frac{\left|2-2+6+3\right|}{\sqrt{4+1+4}}=3$.`, R`Thay tọa độ tâm vào vế trái và chia cho độ dài pháp tuyến.`),
          buoc(R`Vì $h<R$ nên mặt phẳng cắt mặt cầu, bán kính đường tròn giao là $r=\sqrt{25-9}=4$.`, R`Bán kính mặt cầu là cạnh huyền, khoảng cách $h$ và bán kính $r$ là hai cạnh góc vuông.`),
          buoc(R`Tâm là hình chiếu của $I$: $I-\frac{9}{9}(2;\ -1;\ 2)=(-1;\ 3;\ 1)$.`, R`Đi từ $I$ ngược theo pháp tuyến một đoạn đúng bằng $h$ để rơi vào mặt phẳng.`),
        ],
        R`Bán kính đường tròn giao bằng $4$ và tâm là điểm $(-1;\ 3;\ 1)$.`,
        [{ expr: "Abs(2*1-2+2*3+3)/sqrt(4+1+4)", expect: "3" }, { expr: "2*(-1)-3+2*1+3", expect: "0" }]),
      vd(R`Đường thẳng $\Delta:\ x=2;\ y=2;\ z=t$ cắt mặt cầu $x^2+y^2+z^2=9$ tại hai điểm. Tìm tọa độ hai điểm và độ dài dây cung.`,
        [
          buoc(R`Thay vào phương trình mặt cầu: $4+4+t^2=9$, nên $t^2=1$ và $t=\pm1$.`, R`Giao điểm thỏa đồng thời phương trình đường thẳng và phương trình mặt cầu.`),
          buoc(R`Hai giao điểm là $(2;\ 2;\ 1)$ và $(2;\ 2;\ -1)$, nên dây cung dài $2$.`, R`Hai điểm khác nhau ở tọa độ $z$ một đoạn bằng $2$.`),
        ],
        R`Dây cung dài $2$, nối $(2;\ 2;\ 1)$ với $(2;\ 2;\ -1)$.`,
        [{ expr: "2*sqrt(9-8)", expect: "2" }]),
    ],
    [
      luyen(R`Mặt phẳng $(P)$ cách tâm mặt cầu bán kính $13$ một khoảng $5$. Tính bán kính đường tròn giao.`, R`Bán kính bằng $12$.`, [{ expr: "sqrt(169-25)", expect: "12" }], R`Ta có $r=\sqrt{13^2-5^2}=\sqrt{144}=12$.`),
      luyen(R`Đường thẳng cách tâm mặt cầu bán kính $10$ một khoảng $6$ và cắt mặt cầu. Tính độ dài dây cung.`, R`Dây cung dài $16$.`, [{ expr: "2*sqrt(100-36)", expect: "16" }], R`Ta có $2\sqrt{10^2-6^2}=2\cdot8=16$.`),
      { ...luyen(R`Cho $(S):\ x^2+y^2+z^2=25$. Xét tính đúng sai của từng ý.`, R`Ý a đúng, ý b đúng, ý c sai, ý d đúng.`, [{ expr: "sqrt(25-9)", expect: "4" }], R`Mặt phẳng $z=3$ và $z=-3$ cắt theo đường tròn bán kính $\sqrt{25-9}=4$ với tâm $(0;\ 0;\ 3)$, còn mặt phẳng $z=5$ tiếp xúc nên giao chỉ là một điểm chứ không phải đường tròn bán kính $5$.`), ask: { kind: "truefalse", statements: [R`Mặt phẳng $z=3$ cắt $(S)$ theo đường tròn bán kính $4$.`, R`Tâm của đường tròn giao với mặt phẳng $z=3$ là $(0;\ 0;\ 3)$.`, R`Mặt phẳng $z=5$ cắt $(S)$ theo đường tròn bán kính $5$.`, R`Mặt phẳng $z=-3$ cắt $(S)$ theo đường tròn bán kính $4$.`], truth: [true, true, false, true] } },
    ],
    { topicId: "analytic" }),
  bai("hai-cau-kc-ss", "Hai mặt cầu và khoảng cách giữa các đối tượng song song",
    R`Hai mặt cầu $(S)$, $(S')$ có tâm $I$, $I'$, bán kính $R$, $R'$ và $d=II'$ có vị trí giống hai đường tròn: ngoài nhau khi $d>R+R'$, tiếp xúc ngoài khi $d=R+R'$, cắt nhau theo một đường tròn khi $\left|R-R'\right|<d<R+R'$, tiếp xúc trong khi $d=\left|R-R'\right|$ với $R\ne R'$, chứa nhau khi $d<\left|R-R'\right|$ và trùng nhau khi $d=0$ với $R=R'$. Trừ vế hai phương trình được mặt phẳng chứa đường tròn giao. Khoảng cách giữa hai đường thẳng song song, hay giữa đường thẳng và mặt phẳng song song, bằng khoảng cách từ một điểm của đường thứ nhất đến đối tượng kia.`,
    [
      vd(R`Cho $(S):\ x^2+y^2+z^2=25$ và $(S'):\ (x-8)^2+y^2+z^2=25$. Chứng tỏ hai mặt cầu cắt nhau và tìm mặt phẳng chứa đường tròn giao cùng bán kính của nó.`,
        [
          buoc(R`Khoảng cách hai tâm là $d=8$, và $R+R'=10$, $\left|R-R'\right|=0$, nên $0<d<10$ và hai mặt cầu cắt nhau.`, R`Điều kiện cắt nhau là khoảng cách hai tâm nằm giữa hiệu và tổng hai bán kính.`),
          buoc(R`Trừ vế hai phương trình được $16x-64=0$, nên đường tròn giao nằm trong mặt phẳng $x=4$.`, R`Hiệu hai phương trình mặt cầu là phương trình bậc nhất đi qua mọi điểm chung.`),
          buoc(R`Thay $x=4$ vào $(S)$ được $y^2+z^2=9$, nên bán kính đường tròn giao bằng $3$.`, R`Mặt phẳng $x=4$ cắt mặt cầu theo đường tròn nên phương trình còn lại là của đường tròn.`),
        ],
        R`Hai mặt cầu cắt nhau theo đường tròn bán kính $3$ nằm trong mặt phẳng $x=4$.`,
        [{ expr: "sqrt(25-16)", expect: "3" }]),
      vd(R`Tính khoảng cách giữa hai đường thẳng song song: $\Delta_1$ qua $A(0;\ 0;\ 0)$ và $\Delta_2$ qua $B(0;\ 3;\ 0)$, cùng có chỉ phương $\vec u=(1;\ 2;\ 2)$.`,
        [
          buoc(R`Hai đường song song và phân biệt, nên khoảng cách bằng khoảng cách từ $B$ đến $\Delta_1$.`, R`Lấy một điểm bất kỳ của đường này rồi tính khoảng cách đến đường kia.`),
          buoc(R`Ta có $\left[\overrightarrow{AB},\vec u\right]=(6;\ 0;\ -3)$ có độ dài $3\sqrt5$ và $\left|\vec u\right|=3$.`, R`Dùng công thức khoảng cách từ một điểm đến đường thẳng bằng tích có hướng.`),
          buoc(R`Do đó khoảng cách bằng $\frac{3\sqrt5}{3}=\sqrt5$.`, R`Chia diện tích hình bình hành cho đáy $\left|\vec u\right|$.`),
        ],
        R`Khoảng cách bằng $\sqrt5$.`,
        [{ expr: "Matrix([0,3,0]).cross(Matrix([1,2,2])).norm()/3", expect: "sqrt(5)" }]),
    ],
    [
      { ...luyen(R`Mặt cầu bán kính $3$ và mặt cầu bán kính $2$ có hai tâm cách nhau $5$. Hai mặt cầu có vị trí tương đối nào?`, R`Hai mặt cầu tiếp xúc ngoài.`, [{ expr: "sqrt(0**2+0**2+5**2)", expect: "5" }], R`Vì khoảng cách hai tâm bằng $5=3+2$ nên hai mặt cầu tiếp xúc ngoài.`), ask: { kind: "choice", options: ["Ngoài nhau.", "Tiếp xúc ngoài.", "Cắt nhau theo một đường tròn."], correct: 1 } },
      luyen(R`Đường thẳng đi qua $A(1;\ 2;\ 3)$ với chỉ phương $(1;\ 0;\ -1)$ song song với $(P):\ 2x-y+2z+3=0$. Tính khoảng cách giữa đường thẳng và mặt phẳng.`, R`Khoảng cách bằng $3$.`, [{ expr: "Abs(2*1-2+2*3+3)/sqrt(4+1+4)", expect: "3" }], R`Khoảng cách bằng khoảng cách từ $A$ đến $(P)$, tức $\frac{\left|2-2+6+3\right|}{3}=3$.`),
      luyen(R`Đường $\Delta_1$ qua $O$ và đường $\Delta_2$ qua $B(5;\ 0;\ 0)$ cùng có chỉ phương $(0;\ 3;\ 4)$. Tính khoảng cách giữa hai đường.`, R`Khoảng cách bằng $5$.`, [{ expr: "Matrix([5,0,0]).cross(Matrix([0,3,4])).norm()/5", expect: "5" }], R`Tích có hướng $\left[\overrightarrow{OB},\vec u\right]=(0;\ -20;\ 15)$ có độ dài $25$ và $\left|\vec u\right|=5$, nên khoảng cách bằng $5$.`),
    ],
    { topicId: "analytic" }),
]);

export const lop12OxyzVanDungCao: GradeChapter = chuong("oxyz-van-dung-cao", "Oxyz vận dụng cao: mặt phẳng chứa đường thẳng và cực trị với mặt cầu", [
  bai("mp-chua-dt-cuc-tri", "Mặt phẳng chứa đường thẳng: khoảng cách lớn nhất và tiếp xúc có tham số",
    R`Cho điểm $A$ và đường thẳng $d$ không đi qua $A$. Với mọi mặt phẳng $(P)$ chứa $d$ ta có $d\left(A;\ (P)\right)\le d(A;\ d)$, và dấu bằng xảy ra khi $(P)$ vuông góc với $AH$ với $H$ là hình chiếu của $A$ lên $d$; khi đó $\overrightarrow{HA}$ là pháp tuyến của $(P)$. Với bài có tham số $m$, ta đưa điều kiện về một phương trình theo $m$ rồi giải, nhớ kiểm tra mọi nghiệm.`,
    [
      vd(R`Cho $A(1;\ 0;\ 0)$ và $d:\ x=t,\ y=1+t,\ z=2t$. Trong các mặt phẳng chứa $d$, tìm mặt phẳng cách $A$ xa nhất và tính khoảng cách đó.`,
        [
          buoc(R`Với $H(t;\ 1+t;\ 2t)$ và $\vec u=(1;\ 1;\ 2)$, điều kiện $\overrightarrow{AH}\cdot\vec u=0$ cho $6t=0$, nên $H(0;\ 1;\ 0)$.`, R`Hình chiếu của $A$ lên $d$ làm vectơ nối vuông góc với chỉ phương của $d$.`),
          buoc(R`Khoảng cách lớn nhất là $AH=\sqrt{1+1+0}=\sqrt2$, đạt khi pháp tuyến là $\overrightarrow{HA}=(1;\ -1;\ 0)$.`, R`Với mặt phẳng chứa $d$, khoảng cách đến $A$ không vượt quá độ dài đoạn vuông góc $AH$.`),
          buoc(R`Mặt phẳng qua $H$ với pháp tuyến đó là $x-y+1=0$, và nó chứa $d$ vì $(1;\ -1;\ 0)\cdot(1;\ 1;\ 2)=0$.`, R`Pháp tuyến vuông góc với chỉ phương của $d$ và mặt phẳng đi qua điểm $H$ của $d$.`),
        ],
        R`Mặt phẳng cần tìm là $x-y+1=0$ và khoảng cách lớn nhất bằng $\sqrt2$.`,
        [{ expr: "solve((x-1)+(1+x)+4*x, x)[0]", expect: "0" }, { expr: "1*1+1*(-1)+2*0", expect: "0" }]),
      vd(R`Tìm $m$ để mặt phẳng $(P_m):\ 2x+2y+mz-6=0$ tiếp xúc với mặt cầu $x^2+y^2+z^2=4$.`,
        [
          buoc(R`Khoảng cách từ tâm $O$ đến $(P_m)$ là $\frac{6}{\sqrt{8+m^2}}$ và bán kính bằng $2$.`, R`Thay tọa độ tâm vào vế trái và chia cho độ dài pháp tuyến.`),
          buoc(R`Tiếp xúc khi $\frac{6}{\sqrt{8+m^2}}=2$, tức $8+m^2=9$ và $m^2=1$.`, R`Bình phương hai vế rồi giải phương trình theo $m^2$.`),
        ],
        R`Giá trị cần tìm là $m=1$ hoặc $m=-1$.`,
        [{ expr: "sqrt(36/4-8)", expect: "1" }]),
    ],
    [
      luyen(R`Cho $A$ là gốc $O$ và $d$ qua $P_0(3;\ 0;\ 0)$ với chỉ phương $(0;\ 3;\ 4)$. Tìm khoảng cách lớn nhất từ $O$ đến một mặt phẳng chứa $d$.`, R`Khoảng cách lớn nhất bằng $3$.`, [{ expr: "sqrt(0+144+81)/5", expect: "3" }], R`Vì $\overrightarrow{OP_0}\cdot\vec u=0$ nên $P_0$ là hình chiếu của $O$ lên $d$ và khoảng cách lớn nhất bằng $OP_0=3$.`),
      luyen(R`Mặt phẳng $2x+y+2z+m=0$ với $m>0$ tiếp xúc với mặt cầu $x^2+y^2+z^2=9$. Tìm $m$.`, R`Giá trị cần tìm là $m=9$.`, [{ expr: "sqrt(81)", expect: "9" }], R`Khoảng cách từ $O$ là $\frac{m}{3}$ và phải bằng bán kính $3$, nên $m=9$.`),
      { ...luyen(R`Trong các mặt phẳng chứa đường thẳng $d$, mặt phẳng cách điểm $A$ xa nhất có tính chất nào?`, R`Mặt phẳng vuông góc với $AH$, với $H$ là hình chiếu của $A$ lên $d$.`, [{ expr: "sqrt((1-0)**2+(0-1)**2+0**2)", expect: "sqrt(2)" }], R`Khoảng cách từ $A$ đến mọi mặt phẳng chứa $d$ không vượt quá $AH$, với dấu bằng khi mặt phẳng vuông góc với $AH$.`), ask: { kind: "choice", options: [R`Vuông góc với $AH$ với $H$ là hình chiếu của $A$ lên $d$.`, R`Song song với $AH$.`, R`Đi qua điểm $A$.`], correct: 0 } },
    ],
    { topicId: "analytic" }),
  bai("cuc-tri-mat-cau", "Cực trị với mặt cầu: khoảng cách lớn nhất và nhỏ nhất",
    R`Cho mặt cầu $(S)$ tâm $I$ bán kính $R$ và điểm $A$. Với $M\in(S)$ ta có $\left|IA-R\right|\le MA\le IA+R$, và hai giá trị biên đạt khi $M$ nằm trên đường thẳng $IA$. Với mặt phẳng $(P)$ không cắt $(S)$ và $h=d\left(I;\ (P)\right)>R$ thì khoảng cách từ $M$ đến $(P)$ nằm trong đoạn từ $h-R$ đến $h+R$.`,
    [
      vd(R`Cho mặt cầu tâm $I(1;\ 2;\ 3)$ bán kính $2$ và $A(4;\ 6;\ 3)$. Tìm giá trị nhỏ nhất, lớn nhất của $MA$ và điểm $M$ gần $A$ nhất.`,
        [
          buoc(R`Ta có $\overrightarrow{IA}=(3;\ 4;\ 0)$ và $IA=5$, và $A$ nằm ngoài mặt cầu vì $5>2$.`, R`So sánh $IA$ với bán kính để biết $A$ nằm trong hay ngoài mặt cầu.`),
          buoc(R`Do đó giá trị nhỏ nhất là $5-2=3$ và giá trị lớn nhất là $5+2=7$.`, R`Hai điểm cực trị nằm trên đường nối tâm với $A$, ở hai phía của tâm.`),
          buoc(R`Điểm gần nhất là $M=I+2\cdot\frac{\overrightarrow{IA}}{5}=\left(\frac{11}{5};\ \frac{18}{5};\ 3\right)$.`, R`Đi từ tâm về phía $A$ một đoạn đúng bằng bán kính.`),
        ],
        R`Giá trị nhỏ nhất là $3$, lớn nhất là $7$ và $M=\left(\frac{11}{5};\ \frac{18}{5};\ 3\right)$.`,
        [{ expr: "sqrt(9+16)", expect: "5" }, { expr: "1+2*Rational(3,5)", expect: "11/5" }]),
      vd(R`Với mặt cầu ở ví dụ trên và $(P):\ 2x-y+2z+3=0$, tìm khoảng cách nhỏ nhất và lớn nhất từ $M\in(S)$ đến $(P)$.`,
        [
          buoc(R`Khoảng cách từ $I$ đến $(P)$ là $h=\frac{\left|2-2+6+3\right|}{3}=3$, lớn hơn bán kính $2$ nên mặt phẳng không cắt mặt cầu.`, R`Cần biết mặt phẳng nằm ngoài mặt cầu thì công thức biên mới đúng.`),
          buoc(R`Khoảng cách nhỏ nhất là $3-2=1$ và lớn nhất là $3+2=5$.`, R`Đường thẳng qua $I$ vuông góc với $(P)$ cắt mặt cầu ở hai điểm cực trị.`),
        ],
        R`Khoảng cách nhỏ nhất là $1$ và lớn nhất là $5$.`,
        [{ expr: "Abs(2*1-2+2*3+3)/sqrt(4+1+4)", expect: "3" }]),
    ],
    [
      luyen(R`Mặt cầu tâm $O$ bán kính $3$ và $A(2;\ 3;\ 6)$. Tính giá trị nhỏ nhất của $MA$ với $M$ thuộc mặt cầu.`, R`Giá trị nhỏ nhất bằng $4$.`, [{ expr: "sqrt(4+9+36)-3", expect: "4" }], R`Ta có $OA=7$ nên giá trị nhỏ nhất là $7-3=4$.`),
      luyen(R`Mặt cầu $x^2+y^2+z^2=4$ và $(P):\ 2x-y+2z-9=0$. Tính khoảng cách lớn nhất từ một điểm của mặt cầu đến $(P)$.`, R`Khoảng cách lớn nhất bằng $5$.`, [{ expr: "9/sqrt(4+1+4)+2", expect: "5" }], R`Khoảng cách từ $O$ đến $(P)$ là $3$ nên lớn nhất là $3+2=5$.`),
      { ...luyen(R`Cho mặt cầu $x^2+y^2+z^2=4$ và $A(0;\ 0;\ 5)$. Xét tính đúng sai của từng ý.`, R`Ý a đúng, ý b đúng, ý c sai, ý d đúng.`, [{ expr: "sqrt(0+0+25)-2", expect: "3" }], R`Ta có $OA=5$ nên $MA$ nhỏ nhất bằng $5-2=3$ chứ không phải $1$, lớn nhất bằng $7$, và điểm $(0;\ 0;\ 2)$ nằm trên đoạn $OA$ nên cho giá trị nhỏ nhất.`), ask: { kind: "truefalse", statements: [R`Giá trị nhỏ nhất của $MA$ bằng $3$.`, R`Giá trị lớn nhất của $MA$ bằng $7$.`, R`Giá trị nhỏ nhất của $MA$ bằng $1$.`, R`Điểm $(0;\ 0;\ 2)$ là điểm của mặt cầu gần $A$ nhất.`], truth: [true, true, false, true] } },
    ],
    { topicId: "analytic" }),
]);
