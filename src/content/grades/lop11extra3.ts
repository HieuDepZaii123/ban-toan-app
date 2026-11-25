/** Lớp 11, phần chi tiết thứ ba: vectơ, góc, khoảng cách và quan hệ trong không gian. */
import type { GradeChapter } from "./types.ts";
import { bai, buoc, chuong, luyen, vd } from "./types.ts";

const R = String.raw;

export const lop11VectoKg: GradeChapter = chuong("vecto-kg-11", "Vectơ trong không gian", [
  bai("quy-tac-vecto-kg", "Quy tắc cộng vectơ trong không gian",
    R`Quy tắc ba điểm: $\overrightarrow{AB}+\overrightarrow{BC}=\overrightarrow{AC}$. Quy tắc hình bình hành: nếu $ABCD$ là hình bình hành thì $\overrightarrow{AB}+\overrightarrow{AD}=\overrightarrow{AC}$. Quy tắc hình hộp: với hình hộp $ABCD.A'B'C'D'$ thì $\overrightarrow{AB}+\overrightarrow{AD}+\overrightarrow{AA'}=\overrightarrow{AC'}$. Điểm $G$ là trọng tâm tam giác $ABC$ khi $\overrightarrow{GA}+\overrightarrow{GB}+\overrightarrow{GC}=\vec0$.`,
    [
      vd(R`Cho hình lập phương $ABCD.A'B'C'D'$ cạnh $1$. Rút gọn $\overrightarrow{AB}+\overrightarrow{BC}+\overrightarrow{CC'}$ và tính độ dài.`,
        [
          buoc(R`Theo quy tắc ba điểm liên tiếp, tổng bằng $\overrightarrow{AC'}$.`, R`Điểm cuối của vectơ trước là điểm đầu của vectơ sau.`),
          buoc(R`Đường chéo hình lập phương cạnh $1$ dài $\sqrt{1+1+1}=\sqrt3$.`, R`Dùng công thức đường chéo hình lập phương.`),
        ],
        R`Tổng bằng $\overrightarrow{AC'}$ và có độ dài $\sqrt3$.`,
        [{ expr: "(Matrix([1,0,0])+Matrix([0,1,0])+Matrix([0,0,1])).norm()", expect: "sqrt(3)" }]),
      vd(R`Cho tam giác $ABC$ có trọng tâm $G$ và một điểm $O$ bất kì. Chứng tỏ $\overrightarrow{OA}+\overrightarrow{OB}+\overrightarrow{OC}=3\overrightarrow{OG}$ bằng một ví dụ số.`,
        [
          buoc(R`Chọn $O$ là gốc tọa độ, $A(3;\ 0;\ 0)$, $B(0;\ 3;\ 0)$, $C(0;\ 0;\ 3)$ thì $G(1;\ 1;\ 1)$.`, R`Trọng tâm có tọa độ là trung bình cộng ba đỉnh.`),
          buoc(R`Tổng ba vectơ là $(3;\ 3;\ 3)$ và đúng bằng $3\overrightarrow{OG}=(3;\ 3;\ 3)$.`, R`So sánh từng tọa độ của hai vế.`),
        ],
        R`Hệ thức $\overrightarrow{OA}+\overrightarrow{OB}+\overrightarrow{OC}=3\overrightarrow{OG}$ đúng.`,
        [{ expr: "(Matrix([3,0,0])+Matrix([0,3,0])+Matrix([0,0,3])-3*Matrix([1,1,1])).norm()", expect: "0" }]),
    ],
    [
      { ...luyen(R`Cho hình hộp $ABCD.A'B'C'D'$. Vectơ $\overrightarrow{AB}+\overrightarrow{AD}+\overrightarrow{AA'}$ bằng vectơ nào?`, R`Bằng $\overrightarrow{AC'}$.`, [{ expr: "(Matrix([1,0,0])+Matrix([0,1,0])+Matrix([0,0,1])-Matrix([1,1,1])).norm()", expect: "0" }], R`Theo quy tắc hình hộp, tổng ba cạnh xuất phát từ $A$ bằng đường chéo $\overrightarrow{AC'}$.`), ask: { kind: "choice", options: ["$\\overrightarrow{AC'}$", "$\\overrightarrow{AC}$", "$\\overrightarrow{AB'}$"], correct: 0 } },
      luyen(R`Hình hộp chữ nhật $ABCD.A'B'C'D'$ có $AB=3$, $AD=4$, $AA'=12$. Tính $\left|\overrightarrow{AB}+\overrightarrow{AD}+\overrightarrow{AA'}\right|$.`, R`Độ dài bằng $13$.`, [{ expr: "(Matrix([3,0,0])+Matrix([0,4,0])+Matrix([0,0,12])).norm()", expect: "13" }], R`Tổng là $\overrightarrow{AC'}$ nên độ dài là $\sqrt{9+16+144}=13$.`),
      luyen(R`Cho $AB=2$ và $AC=4$ vuông góc nhau tại $A$, $M$ là trung điểm $BC$. Tính $AM$ bằng cách dùng $\overrightarrow{AM}=\frac12\left(\overrightarrow{AB}+\overrightarrow{AC}\right)$.`, R`Độ dài bằng $\sqrt5$.`, [{ expr: "(Matrix([2,0,0])+Matrix([0,4,0])).norm()/2", expect: "sqrt(5)" }], R`Vectơ tổng có độ dài $\sqrt{4+16}=2\sqrt5$ và một nửa của nó là $\sqrt5$.`),
    ],
    { topicId: "vector" }),
  bai("phan-tich-vecto", "Biểu diễn một vectơ theo ba vectơ không đồng phẳng",
    R`Trong hình hộp $ABCD.A'B'C'D'$, đặt $\vec a=\overrightarrow{AB}$, $\vec b=\overrightarrow{AD}$, $\vec c=\overrightarrow{AA'}$. Mọi vectơ trong không gian đều viết được duy nhất dưới dạng $x\vec a+y\vec b+z\vec c$. Để tìm các hệ số, đi từ điểm đầu đến điểm cuối bằng các cạnh của hình hộp.`,
    [
      vd(R`Biểu diễn $\overrightarrow{BD'}$ theo $\vec a$, $\vec b$, $\vec c$.`,
        [
          buoc(R`Đi từ $B$ về $A$, rồi đến $D$, rồi lên $D'$: $\overrightarrow{BD'}=\overrightarrow{BA}+\overrightarrow{AD}+\overrightarrow{DD'}$.`, R`Chia đường đi thành các cạnh của hình hộp.`),
          buoc(R`Ta có $\overrightarrow{BA}=-\vec a$, $\overrightarrow{AD}=\vec b$, $\overrightarrow{DD'}=\vec c$ nên $\overrightarrow{BD'}=-\vec a+\vec b+\vec c$.`, R`Đổi chiều một cạnh thì đổi dấu vectơ.`),
        ],
        R`Kết quả là $\overrightarrow{BD'}=-\vec a+\vec b+\vec c$.`,
        [{ expr: "(-Matrix([1,0,0])+Matrix([0,1,0])+Matrix([0,0,1]))[0]", expect: "-1" }]),
      vd(R`Gọi $M$ là trung điểm $CC'$. Biểu diễn $\overrightarrow{AM}$ theo $\vec a$, $\vec b$, $\vec c$.`,
        [
          buoc(R`Ta có $\overrightarrow{AM}=\overrightarrow{AC}+\overrightarrow{CM}=\vec a+\vec b+\overrightarrow{CM}$.`, R`Đi từ $A$ đến $C$ trước rồi đến $M$.`),
          buoc(R`Vì $M$ là trung điểm của $CC'$ nên $\overrightarrow{CM}=\frac12\vec c$, và $\overrightarrow{AM}=\vec a+\vec b+\frac12\vec c$.`, R`Cạnh $CC'$ song song và bằng $AA'$ nên trung điểm của nó cho vectơ bằng một nửa $\vec c$.`),
        ],
        R`Kết quả là $\overrightarrow{AM}=\vec a+\vec b+\frac12\vec c$.`,
        [{ expr: "(Matrix([1,0,0])+Matrix([0,1,0])+Rational(1,2)*Matrix([0,0,1]))[2]", expect: "Rational(1,2)" }]),
    ],
    [
      luyen(R`Viết $\overrightarrow{DB'}=x\vec a+y\vec b+z\vec c$. Tính $x+y+z$.`, R`Tổng bằng $1$.`, [{ expr: "(Matrix([1,0,1])-Matrix([0,1,0])).dot(Matrix([1,1,1]))", expect: "1" }], R`Ta có $\overrightarrow{DB'}=\vec a-\vec b+\vec c$ nên $x+y+z=1-1+1=1$.`),
      luyen(R`Gọi $N$ là trung điểm $A'D'$. Viết $\overrightarrow{AN}=x\vec a+y\vec b+z\vec c$. Tìm $y$.`, R`Hệ số $y=\frac12$.`, [{ expr: "((Matrix([0,0,1])+Matrix([0,1,1]))/2)[1]", expect: "Rational(1,2)" }], R`Ta có $\overrightarrow{AN}=\overrightarrow{AA'}+\overrightarrow{A'N}=\vec c+\frac12\vec b$ nên $y=\frac12$.`),
      luyen(R`Cho $\overrightarrow{AB}=(3;\ 0;\ 0)$, $\overrightarrow{AC}=(0;\ 3;\ 0)$ và $G$ là trọng tâm tam giác $ABC$. Tính $AG$ bằng $\overrightarrow{AG}=\frac13\left(\overrightarrow{AB}+\overrightarrow{AC}\right)$.`, R`Độ dài bằng $\sqrt2$.`, [{ expr: "(Matrix([3,0,0])+Matrix([0,3,0])).norm()/3", expect: "sqrt(2)" }], R`Vectơ $\overrightarrow{AG}=(1;\ 1;\ 0)$ có độ dài $\sqrt2$.`),
    ],
    { topicId: "vector" }),
  bai("tich-vo-huong-hinh", "Tích vô hướng của hai vectơ trong hình",
    R`Tích vô hướng của hai vectơ khác $\vec0$ là $\vec a\cdot\vec b=|\vec a|\,|\vec b|\cos\varphi$ với $\varphi$ là góc giữa chúng. Tích bằng $0$ khi hai vectơ vuông góc. Ngoài ra $|\vec a+\vec b|^2=|\vec a|^2+2\vec a\cdot\vec b+|\vec b|^2$.`,
    [
      vd(R`Hình lập phương $ABCD.A'B'C'D'$ có cạnh $2$. Tính $\overrightarrow{AB}\cdot\overrightarrow{AC}$.`,
        [
          buoc(R`Ta có $|\overrightarrow{AB}|=2$, $|\overrightarrow{AC}|=2\sqrt2$ và góc $BAC=45^\circ$.`, R`Đoạn $AC$ là đường chéo của hình vuông cạnh $2$ nên dài $2\sqrt2$.`),
          buoc(R`Do đó tích bằng $2\cdot2\sqrt2\cdot\cos45^\circ=4$.`, R`Thay vào công thức với $\cos45^\circ=\frac{\sqrt2}{2}$.`),
        ],
        R`Tích vô hướng bằng $4$.`,
        [{ expr: "2*2*sqrt(2)*cos(pi/4)", expect: "4" }]),
      vd(R`Tứ diện đều $ABCD$. Chứng tỏ $\overrightarrow{AB}\cdot\overrightarrow{CD}=0$ bằng tọa độ $A(1;\ 1;\ 1)$, $B(1;\ -1;\ -1)$, $C(-1;\ 1;\ -1)$, $D(-1;\ -1;\ 1)$.`,
        [
          buoc(R`Ta có $\overrightarrow{AB}=(0;\ -2;\ -2)$ và $\overrightarrow{CD}=(0;\ -2;\ 2)$.`, R`Lấy tọa độ điểm cuối trừ điểm đầu.`),
          buoc(R`Tích vô hướng là $0+4-4=0$ nên hai cạnh đối vuông góc nhau.`, R`Tích vô hướng bằng $0$ thì hai vectơ vuông góc.`),
        ],
        R`Hai cạnh đối $AB$ và $CD$ vuông góc nhau.`,
        [{ expr: "Matrix([0,-2,-2]).dot(Matrix([0,-2,2]))", expect: "0" }]),
    ],
    [
      luyen(R`Cho $|\vec a|=3$, $|\vec b|=4$ và góc giữa hai vectơ bằng $60^\circ$. Tính $\vec a\cdot\vec b$.`, R`Tích vô hướng bằng $6$.`, [{ expr: "3*4*cos(pi/3)", expect: "6" }], R`Ta có $3\cdot4\cdot\cos60^\circ=12\cdot\frac12=6$.`),
      luyen(R`Cho $\vec a\cdot\vec b=-6$, $|\vec a|=3$, $|\vec b|=4$. Tính góc giữa hai vectơ theo đơn vị độ.`, R`Góc bằng $120$ độ.`, [{ expr: "acos(Rational(-6,12))*180/pi", expect: "120" }], R`Ta có $\cos\varphi=\frac{-6}{12}=-\frac12$ nên $\varphi=120^\circ$.`),
      luyen(R`Hai vectơ vuông góc có độ dài $3$ và $4$. Tính độ dài của tổng.`, R`Độ dài bằng $5$.`, [{ expr: "sqrt(3**2+4**2+2*0)", expect: "5" }], R`Vì tích vô hướng bằng $0$ nên $|\vec a+\vec b|^2=9+16=25$.`),
    ],
    { topicId: "vector" }),
  bai("dong-phang-3-vecto", "Ba vectơ đồng phẳng",
    R`Ba vectơ $\vec a$, $\vec b$, $\vec c$ đồng phẳng khi có thể viết $\vec c=m\vec a+n\vec b$ với $\vec a$, $\vec b$ không cùng phương. Bốn điểm $A$, $B$, $C$, $D$ đồng phẳng khi ba vectơ $\overrightarrow{AB}$, $\overrightarrow{AC}$, $\overrightarrow{AD}$ đồng phẳng.`,
    [
      vd(R`Cho $\overrightarrow{AB}=(1;\ 0;\ 0)$, $\overrightarrow{AC}=(0;\ 1;\ 0)$, $\overrightarrow{AD}=(2;\ 3;\ 0)$. Bốn điểm có đồng phẳng không?`,
        [
          buoc(R`Ta có $\overrightarrow{AD}=2\overrightarrow{AB}+3\overrightarrow{AC}$.`, R`So sánh từng tọa độ, tọa độ thứ ba cùng bằng $0$.`),
          buoc(R`Vậy $\overrightarrow{AD}$ viết được qua hai vectơ kia nên ba vectơ đồng phẳng.`, R`Đây chính là định nghĩa đồng phẳng.`),
        ],
        R`Bốn điểm đồng phẳng.`,
        [{ expr: "(Matrix([2,3,0])-2*Matrix([1,0,0])-3*Matrix([0,1,0])).norm()", expect: "0" }]),
      vd(R`Ba vectơ $\overrightarrow{AB}$, $\overrightarrow{AD}$, $\overrightarrow{AA'}$ của một hình hộp có đồng phẳng không?`,
        [
          buoc(R`Ba cạnh xuất phát từ một đỉnh của hình hộp không nằm trong cùng một mặt phẳng.`, R`Nếu chúng đồng phẳng thì hình hộp bị dẹt thành một hình phẳng.`),
          buoc(R`Chẳng hạn với hình hộp chữ nhật đơn vị, tích hỗn tạp bằng $1\ne0$ nên không đồng phẳng.`, R`Tích hỗn tạp bằng $0$ khi và chỉ khi ba vectơ đồng phẳng.`),
        ],
        R`Ba vectơ không đồng phẳng.`,
        [{ expr: "Matrix([1,0,0]).dot(Matrix([0,1,0]).cross(Matrix([0,0,1])))", expect: "1" }]),
    ],
    [
      luyen(R`Cho $\overrightarrow{AB}=(1;\ 0;\ 0)$, $\overrightarrow{AC}=(0;\ 1;\ 0)$, $\overrightarrow{AD}=(1;\ 2;\ m)$. Tìm $m$ để bốn điểm đồng phẳng.`, R`Giá trị cần tìm là $m=0$.`, [{ expr: "solve(Matrix([1,0,0]).dot(Matrix([0,1,0]).cross(Matrix([1,2,x]))), x)[0]", expect: "0" }], R`Cần $\overrightarrow{AD}$ nằm trong mặt phẳng của $\overrightarrow{AB}$, $\overrightarrow{AC}$, tức tọa độ thứ ba bằng $0$.`),
      { ...luyen(R`Cho $\vec c=2\vec a-\vec b$ với $\vec a$, $\vec b$ không cùng phương. Ba vectơ $\vec a$, $\vec b$, $\vec c$ có đồng phẳng không?`, R`Có, vì $\vec c$ viết được qua $\vec a$ và $\vec b$.`, [{ expr: "Matrix([1,0,0]).dot(Matrix([0,1,0]).cross(Matrix([2,-1,0])))", expect: "0" }], R`Một vectơ là tổ hợp tuyến tính của hai vectơ còn lại thì cả ba nằm trong cùng một mặt phẳng.`), ask: { kind: "choice", options: ["Có, vì $\\vec c$ viết được qua $\\vec a$ và $\\vec b$.", "Không, vì có ba vectơ khác nhau."], correct: 0 } },
      luyen(R`Cho $\vec a=(1;\ 1;\ 0)$, $\vec b=(0;\ 1;\ 1)$, $\vec c=(1;\ 2;\ k)$. Tìm $k$ để ba vectơ đồng phẳng.`, R`Giá trị cần tìm là $k=1$.`, [{ expr: "solve(Matrix([1,1,0]).dot(Matrix([0,1,1]).cross(Matrix([1,2,x]))), x)[0]", expect: "1" }], R`Cần $\vec c=\vec a+\vec b=(1;\ 2;\ 1)$ nên $k=1$.`),
    ],
    { topicId: "vector" }),
]);

export const lop11GocVuongGoc: GradeChapter = chuong("goc-vuong-goc-11", "Góc và quan hệ vuông góc trong không gian", [
  bai("goc-hai-dt-cheo", "Góc giữa hai đường thẳng chéo nhau",
    R`Góc giữa hai đường thẳng chéo nhau là góc giữa hai đường thẳng cắt nhau, lần lượt song song với chúng. Với các vectơ chỉ phương $\vec u$ và $\vec v$ thì $\cos\varphi=\frac{|\vec u\cdot\vec v|}{|\vec u|\,|\vec v|}$ và $0^\circ\le\varphi\le90^\circ$.`,
    [
      vd(R`Hình lập phương $ABCD.A'B'C'D'$ có cạnh $1$. Tính góc giữa $AC$ và $A'D$.`,
        [
          buoc(R`Chọn $A$ làm gốc: $\overrightarrow{AC}=(1;\ 1;\ 0)$ và $\overrightarrow{A'D}=(0;\ 1;\ -1)$.`, R`Lấy tọa độ điểm cuối trừ điểm đầu.`),
          buoc(R`Tích vô hướng là $1$ và hai độ dài đều bằng $\sqrt2$ nên $\cos\varphi=\frac12$ và $\varphi=60^\circ$.`, R`Dùng công thức với trị tuyệt đối.`),
        ],
        R`Góc giữa $AC$ và $A'D$ bằng $60^\circ$.`,
        [{ expr: "acos(Abs(1*0+1*1+0*(-1))/(sqrt(2)*sqrt(2)))*180/pi", expect: "60" }]),
      vd(R`Hình hộp chữ nhật $ABCD.A'B'C'D'$ có $AB=3$, $AD=4$, $AA'=12$. Tính $\cos$ của góc giữa $BD'$ và $AC$.`,
        [
          buoc(R`Ta có $\overrightarrow{BD'}=(-3;\ 4;\ 12)$ có độ dài $13$, và $\overrightarrow{AC}=(3;\ 4;\ 0)$ có độ dài $5$.`, R`Đặt hệ trục tại $A$ rồi tính độ dài từng vectơ.`),
          buoc(R`Tích vô hướng là $-9+16+0=7$ nên $\cos\varphi=\frac{7}{13\cdot5}=\frac{7}{65}$.`, R`Lấy trị tuyệt đối của tích vô hướng.`),
        ],
        R`Giá trị $\cos\varphi=\frac{7}{65}$.`,
        [{ expr: "Abs(-3*3+4*4+12*0)/(13*5)", expect: "Rational(7,65)" }]),
    ],
    [
      luyen(R`Hình lập phương $ABCD.A'B'C'D'$ có cạnh $1$. Tính góc giữa $AB'$ và $CD'$ theo đơn vị độ.`, R`Góc bằng $90$ độ.`, [{ expr: "acos(Abs(1*(-1)+0*0+1*1)/(sqrt(2)*sqrt(2)))*180/pi", expect: "90" }], R`Ta có $\overrightarrow{AB'}=(1;\ 0;\ 1)$ và $\overrightarrow{CD'}=(-1;\ 0;\ 1)$ có tích vô hướng $-1+1=0$.`),
      { ...luyen(R`Trong tứ diện đều $ABCD$, góc giữa hai cạnh đối $AB$ và $CD$ bằng bao nhiêu?`, R`Bằng $90^\circ$.`, [{ expr: "Matrix([0,-2,-2]).dot(Matrix([0,-2,2]))", expect: "0" }], R`Với tọa độ tứ diện đều, $\overrightarrow{AB}\cdot\overrightarrow{CD}=0$ nên hai cạnh đối vuông góc.`), ask: { kind: "choice", options: ["$0^\\circ$", "$60^\\circ$", "$90^\\circ$"], correct: 2 } },
      luyen(R`Hình hộp có đáy là hình vuông cạnh $1$ và $AA'=\sqrt2$. Tính góc giữa $BD'$ và $AA'$ theo đơn vị độ.`, R`Góc bằng $45$ độ.`, [{ expr: "acos(Abs(sqrt(2)*sqrt(2))/(2*sqrt(2)))*180/pi", expect: "45" }], R`Ta có $\overrightarrow{BD'}=(-1;\ 1;\ \sqrt2)$ dài $2$ và $\overrightarrow{AA'}=(0;\ 0;\ \sqrt2)$, nên $\cos\varphi=\frac{2}{2\sqrt2}=\frac{\sqrt2}{2}$.`),
    ],
    { topicId: "triangle" }),
  bai("goc-duong-mat-11", "Góc giữa đường thẳng và mặt phẳng: hình chiếu vuông góc",
    R`Góc giữa đường thẳng $d$ cắt mặt phẳng $(P)$ là góc giữa $d$ và hình chiếu vuông góc của $d$ lên $(P)$. Nếu $A\in d$ có khoảng cách $h$ đến $(P)$ và $d$ cắt $(P)$ tại $B$ thì $\sin\varphi=\frac{h}{AB}$. Với $SA\perp(ABC)$ thì góc giữa $SB$ và $(ABC)$ là góc $SBA$, có $\tan=\frac{SA}{AB}$.`,
    [
      vd(R`Hình chóp $S.ABC$ có $SA\perp(ABC)$, $SA=3$ và $AB=3$. Tính góc giữa $SB$ và $(ABC)$.`,
        [
          buoc(R`Hình chiếu của $SB$ lên $(ABC)$ là $AB$, nên góc cần tìm là góc $SBA$.`, R`Vì $SA$ vuông góc mặt phẳng nên $A$ là hình chiếu của $S$ lên mặt phẳng đó.`),
          buoc(R`Trong tam giác vuông $SAB$ có $\tan SBA=\frac{3}{3}=1$ nên góc bằng $45^\circ$.`, R`Tang của góc bằng cạnh đối chia cạnh kề trong tam giác vuông.`),
        ],
        R`Góc giữa $SB$ và $(ABC)$ bằng $45^\circ$.`,
        [{ expr: "atan(3/3)*180/pi", expect: "45" }]),
      vd(R`Điểm $A$ cách mặt phẳng $(P)$ một khoảng $3$, đường thẳng $AB$ cắt $(P)$ tại $B$ và $AB=6$. Tính góc giữa $AB$ và $(P)$.`,
        [
          buoc(R`Hạ $AH\perp(P)$ thì $AH=3$ và góc cần tìm là góc $ABH$.`, R`Điểm $H$ là hình chiếu của $A$ lên $(P)$ nên $AH$ vuông góc với mặt phẳng.`),
          buoc(R`Trong tam giác vuông $AHB$ có $\sin ABH=\frac{3}{6}=\frac12$ nên góc bằng $30^\circ$.`, R`Cạnh đối chia cạnh huyền.`),
        ],
        R`Góc giữa $AB$ và $(P)$ bằng $30^\circ$.`,
        [{ expr: "asin(Rational(3,6))*180/pi", expect: "30" }]),
    ],
    [
      luyen(R`Hình chóp $S.ABCD$ có đáy là hình vuông cạnh $1$, $SA\perp(ABCD)$ và $SA=\sqrt2$. Tính góc giữa $SC$ và $(ABCD)$ theo đơn vị độ.`, R`Góc bằng $45$ độ.`, [{ expr: "atan(sqrt(2)/sqrt(2))*180/pi", expect: "45" }], R`Hình chiếu của $SC$ là $AC=\sqrt2$ nên $\tan SCA=\frac{\sqrt2}{\sqrt2}=1$.`),
      luyen(R`Hình chóp $S.ABC$ có $SA\perp(ABC)$, $SA=2$ và $AB=2\sqrt3$. Tính góc giữa $SB$ và $(ABC)$ theo đơn vị độ.`, R`Góc bằng $30$ độ.`, [{ expr: "atan(2/(2*sqrt(3)))*180/pi", expect: "30" }], R`Ta có $\tan SBA=\frac{2}{2\sqrt3}=\frac{1}{\sqrt3}$ nên góc bằng $30^\circ$.`),
      luyen(R`Điểm $A$ cách mặt phẳng $(P)$ một khoảng $4$ và $AB=4\sqrt2$ với $B\in(P)$. Tính góc giữa $AB$ và $(P)$ theo đơn vị độ.`, R`Góc bằng $45$ độ.`, [{ expr: "asin(4/(4*sqrt(2)))*180/pi", expect: "45" }], R`Ta có $\sin\varphi=\frac{4}{4\sqrt2}=\frac{\sqrt2}{2}$ nên $\varphi=45^\circ$.`),
    ],
    { topicId: "triangle" }),
  bai("goc-nhi-dien-11", "Hai mặt phẳng vuông góc và góc nhị diện",
    R`Hai mặt phẳng vuông góc khi một mặt phẳng chứa một đường thẳng vuông góc với mặt phẳng kia. Góc giữa hai mặt phẳng cắt nhau là góc giữa hai đường thẳng nằm trong hai mặt, cùng vuông góc với giao tuyến tại một điểm. Với $SA\perp(ABCD)$, góc giữa $(SBC)$ và $(ABCD)$ có $\tan=\frac{SA}{AB}$ khi $BC\perp AB$.`,
    [
      vd(R`Hình chóp $S.ABCD$ có đáy là hình vuông cạnh $2$, $SA\perp(ABCD)$, $SA=2$. Tính góc giữa $(SBC)$ và $(ABCD)$.`,
        [
          buoc(R`Giao tuyến là $BC$, và $BC\perp AB$, $BC\perp SB$ (vì $BC\perp(SAB)$).`, R`Vì $BC$ vuông góc với $AB$ và $SA$ nên $BC$ vuông góc với mặt phẳng $(SAB)$.`),
          buoc(R`Góc giữa hai mặt phẳng là góc $SBA$ với $\tan SBA=\frac{SA}{AB}=\frac22=1$, tức $45^\circ$.`, R`Trong tam giác vuông $SAB$.`),
        ],
        R`Góc giữa hai mặt phẳng bằng $45^\circ$.`,
        [{ expr: "atan(2/2)*180/pi", expect: "45" }]),
      vd(R`Lăng trụ đứng $ABC.A'B'C'$ có đáy là tam giác đều cạnh $2$ và $AA'=\sqrt3$. Tính góc giữa $(A'BC)$ và $(ABC)$.`,
        [
          buoc(R`Gọi $M$ là trung điểm $BC$, thì $AM\perp BC$ và $A'M\perp BC$ nên góc cần tìm là góc $A'MA$.`, R`Giao tuyến là $BC$, và đường cao $AM=\sqrt3$.`),
          buoc(R`Ta có $\tan A'MA=\frac{AA'}{AM}=\frac{\sqrt3}{\sqrt3}=1$ nên góc bằng $45^\circ$.`, R`Trong tam giác vuông $A'AM$.`),
        ],
        R`Góc giữa hai mặt phẳng bằng $45^\circ$.`,
        [{ expr: "atan(sqrt(3)/sqrt(3))*180/pi", expect: "45" }]),
    ],
    [
      luyen(R`Hình chóp $S.ABCD$ có đáy là hình vuông cạnh $\sqrt3$, $SA\perp(ABCD)$ và $SA=1$. Tính góc giữa $(SBC)$ và $(ABCD)$ theo đơn vị độ.`, R`Góc bằng $30$ độ.`, [{ expr: "atan(1/sqrt(3))*180/pi", expect: "30" }], R`Ta có $\tan SBA=\frac{SA}{AB}=\frac{1}{\sqrt3}$ nên góc bằng $30^\circ$.`),
      { ...luyen(R`Cho $SA\perp(ABCD)$. Mặt phẳng $(SAB)$ có vuông góc với $(ABCD)$ không?`, R`Có, vì $(SAB)$ chứa $SA$ vuông góc với $(ABCD)$.`, [{ expr: "Matrix([0,0,1]).dot(Matrix([1,0,0]))", expect: "0" }], R`Hai mặt phẳng vuông góc khi một mặt chứa đường thẳng vuông góc với mặt kia.`), ask: { kind: "choice", options: ["Có, vì $(SAB)$ chứa $SA$ vuông góc với $(ABCD)$.", "Không, vì chưa biết góc.", "Chỉ vuông góc khi đáy là hình vuông."], correct: 0 } },
      luyen(R`Điểm $A$ cách mặt phẳng $(P)$ khoảng $2$ và cách giao tuyến của hai mặt phẳng khoảng $4$. Tính góc nhị diện theo đơn vị độ.`, R`Góc bằng $30$ độ.`, [{ expr: "asin(Rational(2,4))*180/pi", expect: "30" }], R`Ta có $\sin\varphi=\frac{2}{4}=\frac12$ nên $\varphi=30^\circ$.`),
    ],
    { topicId: "triangle" }),
]);

export const lop11KhoangCachKg: GradeChapter = chuong("khoang-cach-11", "Khoảng cách trong không gian", [
  bai("kc-diem-duong", "Khoảng cách từ một điểm đến một đường thẳng",
    R`Khoảng cách từ điểm $M$ đến đường thẳng $d$ là độ dài đoạn $MH$ với $H$ là chân đường vuông góc hạ từ $M$ xuống $d$. Trong tam giác vuông tại $A$ có đường cao $AH$ thì $AH=\frac{AB\cdot AC}{BC}$. Tổng quát $d(M;\ d)=\frac{2S}{AB}$, với $A$, $B$ là hai điểm của $d$ và $S$ là diện tích tam giác $MAB$.`,
    [
      vd(R`Hình chóp $S.ABC$ có $SA\perp(ABC)$, $SA=3$, $AB=4$ và $AB\perp SA$. Tính khoảng cách từ $A$ đến $SB$.`,
        [
          buoc(R`Tam giác $SAB$ vuông tại $A$ có $SB=\sqrt{9+16}=5$.`, R`Dùng định lí Pi-ta-go cho tam giác vuông $SAB$.`),
          buoc(R`Đường cao $AH=\frac{SA\cdot AB}{SB}=\frac{12}{5}$.`, R`Công thức đường cao trong tam giác vuông.`),
        ],
        R`Khoảng cách bằng $\frac{12}{5}$.`,
        [{ expr: "Rational(3*4,5)", expect: "Rational(12,5)" }]),
      vd(R`Hình lập phương cạnh $1$. Tính khoảng cách từ $A$ đến đường thẳng $BD'$.`,
        [
          buoc(R`Chọn $A$ làm gốc: $\overrightarrow{BA}=(-1;\ 0;\ 0)$ và $\overrightarrow{BD'}=(-1;\ 1;\ 1)$ có độ dài $\sqrt3$.`, R`Lập vectơ từ một điểm của đường thẳng đến $A$ và vectơ chỉ phương.`),
          buoc(R`Tích có hướng có độ dài $\sqrt2$ nên khoảng cách là $\frac{\sqrt2}{\sqrt3}=\frac{\sqrt6}{3}$.`, R`Khoảng cách bằng độ dài tích có hướng chia cho độ dài chỉ phương.`),
        ],
        R`Khoảng cách bằng $\frac{\sqrt6}{3}$.`,
        [{ expr: "Matrix([-1,0,0]).cross(Matrix([-1,1,1])).norm()/Matrix([-1,1,1]).norm()", expect: "sqrt(6)/3" }]),
    ],
    [
      luyen(R`Tam giác $SAB$ vuông tại $A$ có $SA=5$ và $AB=12$. Tính khoảng cách từ $A$ đến $SB$.`, R`Khoảng cách bằng $\frac{60}{13}$.`, [{ expr: "Rational(5*12,13)", expect: "Rational(60,13)" }], R`Ta có $SB=13$ nên $AH=\frac{5\cdot12}{13}=\frac{60}{13}$.`),
      luyen(R`Tính khoảng cách từ gốc $O$ đến đường thẳng qua $A(3;\ 0;\ 0)$ và $B(0;\ 4;\ 0)$.`, R`Khoảng cách bằng $\frac{12}{5}$.`, [{ expr: "Matrix([3,0,0]).cross(Matrix([0,4,0])).norm()/Matrix([-3,4,0]).norm()", expect: "Rational(12,5)" }], R`Tam giác $OAB$ vuông tại $O$ có $AB=5$ nên khoảng cách là $\frac{3\cdot4}{5}$.`),
      luyen(R`Tam giác $ABC$ đều cạnh $2$. Tính khoảng cách từ $A$ đến $BC$.`, R`Khoảng cách bằng $\sqrt3$.`, [{ expr: "sqrt(2**2-1**2)", expect: "sqrt(3)" }], R`Đường cao hạ từ $A$ cũng là trung tuyến nên có độ dài $\sqrt{4-1}=\sqrt3$.`),
    ],
    { topicId: "triangle" }),
  bai("kc-song-song-kg", "Khoảng cách giữa đường thẳng và mặt phẳng song song, giữa hai mặt phẳng song song",
    R`Khoảng cách giữa đường thẳng $d$ và mặt phẳng $(P)$ song song bằng khoảng cách từ một điểm bất kì của $d$ đến $(P)$. Khoảng cách giữa hai mặt phẳng song song bằng khoảng cách từ một điểm bất kì của mặt này đến mặt kia. Cả hai đều quy về khoảng cách từ điểm đến mặt phẳng.`,
    [
      vd(R`Hình chóp $S.ABCD$ có đáy là hình vuông cạnh $2$, $SA\perp(ABCD)$ và $SA=2$. Tính khoảng cách giữa $AB$ và $(SCD)$.`,
        [
          buoc(R`Vì $AB$ song song với $CD$ nên song song với $(SCD)$, và khoảng cách bằng $d(A;\ (SCD))$.`, R`Chọn điểm $A$ trên $AB$ cho dễ tính.`),
          buoc(R`Hạ $AH\perp SD$ thì $AH=\frac{SA\cdot AD}{SD}=\frac{2\cdot2}{2\sqrt2}=\sqrt2$.`, R`Vì $CD\perp(SAD)$ nên đường cao $AH$ của tam giác $SAD$ cũng vuông góc với $(SCD)$.`),
        ],
        R`Khoảng cách bằng $\sqrt2$.`,
        [{ expr: "2*2/sqrt(2**2+2**2)", expect: "sqrt(2)" }]),
      vd(R`Tính khoảng cách giữa hai mặt phẳng song song $2x+y+2z+1=0$ và $2x+y+2z-8=0$.`,
        [
          buoc(R`Hai mặt có cùng pháp tuyến $(2;\ 1;\ 2)$ có độ dài $3$.`, R`Điều kiện để dùng công thức khoảng cách giữa hai mặt song song.`),
          buoc(R`Khoảng cách là $\frac{|-8-1|}{3}=3$.`, R`Lấy hiệu hai hằng số chia cho độ dài pháp tuyến.`),
        ],
        R`Khoảng cách bằng $3$.`,
        [{ expr: "Abs(-8-1)/sqrt(2**2+1+2**2)", expect: "3" }]),
    ],
    [
      luyen(R`Hình chóp $S.ABCD$ có đáy là hình vuông cạnh $3$, $SA\perp(ABCD)$ và $SA=4$. Tính khoảng cách giữa $AB$ và $(SCD)$.`, R`Khoảng cách bằng $\frac{12}{5}$.`, [{ expr: "4*3/sqrt(4**2+3**2)", expect: "Rational(12,5)" }], R`Khoảng cách bằng $AH=\frac{SA\cdot AD}{SD}=\frac{4\cdot3}{5}=\frac{12}{5}$.`),
      luyen(R`Tính khoảng cách giữa hai mặt phẳng song song $x+y+z-6=0$ và $x+y+z+3=0$.`, R`Khoảng cách bằng $3\sqrt3$.`, [{ expr: "Abs(3-(-6))/sqrt(3)", expect: "3*sqrt(3)" }], R`Hai mặt có cùng pháp tuyến độ dài $\sqrt3$ nên khoảng cách là $\frac{|3-(-6)|}{\sqrt3}=3\sqrt3$.`),
      luyen(R`Lăng trụ đứng $ABC.A'B'C'$ có đáy là tam giác đều cạnh $4$. Tính khoảng cách giữa $AA'$ và mặt phẳng $(BCC'B')$.`, R`Khoảng cách bằng $2\sqrt3$.`, [{ expr: "sqrt(4**2-2**2)", expect: "2*sqrt(3)" }], R`Khoảng cách bằng đường cao hạ từ $A$ xuống $BC$ của tam giác đều cạnh $4$, tức $\sqrt{16-4}=2\sqrt3$.`),
    ],
    { topicId: "triangle" }),
  bai("kc-cheo-nhau", "Khoảng cách giữa hai đường thẳng chéo nhau",
    R`Khoảng cách giữa hai đường thẳng chéo nhau $a$ và $b$ là độ dài đoạn vuông góc chung. Cách làm thường dùng: dựng mặt phẳng chứa $b$ và song song với $a$, rồi khoảng cách cần tìm bằng khoảng cách từ một điểm của $a$ đến mặt phẳng đó. Nếu $a$ vuông góc với một mặt phẳng chứa $b$ thì chiếu $a$ thành một điểm và đưa về khoảng cách từ điểm đến đường thẳng.`,
    [
      vd(R`Hình hộp chữ nhật $ABCD.A'B'C'D'$ có $AB=6$, $AD=8$. Tính khoảng cách giữa $AA'$ và $BD$.`,
        [
          buoc(R`Vì $AA'\perp(ABCD)$ nên đoạn vuông góc chung nằm trong $(ABCD)$ và là khoảng cách từ $A$ đến $BD$.`, R`Chiếu $AA'$ lên $(ABCD)$ thành điểm $A$.`),
          buoc(R`Tam giác $ABD$ vuông tại $A$ có $BD=10$ nên $d=\frac{6\cdot8}{10}=\frac{24}{5}$.`, R`Đường cao trong tam giác vuông.`),
        ],
        R`Khoảng cách bằng $\frac{24}{5}$.`,
        [{ expr: "Rational(6*8,10)", expect: "Rational(24,5)" }]),
      vd(R`Hình lập phương cạnh $1$. Tính khoảng cách giữa $AA'$ và $BD$.`,
        [
          buoc(R`Cũng chiếu $AA'$ lên $(ABCD)$ thành điểm $A$, nên $d=d(A;\ BD)$.`, R`Vì $AA'$ vuông góc mặt phẳng đáy nên hình chiếu của nó là một điểm.`),
          buoc(R`Tam giác $ABD$ vuông cân tại $A$ cạnh $1$ nên $d=\frac{1}{\sqrt2}=\frac{\sqrt2}{2}$.`, R`Đường cao ứng với cạnh huyền bằng một nửa cạnh huyền.`),
        ],
        R`Khoảng cách bằng $\frac{\sqrt2}{2}$.`,
        [{ expr: "1/sqrt(2)", expect: "sqrt(2)/2" }]),
    ],
    [
      luyen(R`Hình hộp chữ nhật $ABCD.A'B'C'D'$ có $AB=5$, $AD=12$. Tính khoảng cách giữa $CC'$ và $BD$.`, R`Khoảng cách bằng $\frac{60}{13}$.`, [{ expr: "Rational(5*12,13)", expect: "Rational(60,13)" }], R`Khoảng cách bằng $d(C;\ BD)$ với $BD=13$ nên $d=\frac{5\cdot12}{13}=\frac{60}{13}$.`),
      luyen(R`Hình lập phương cạnh $2$. Tính khoảng cách giữa $AA'$ và $BD$.`, R`Khoảng cách bằng $\sqrt2$.`, [{ expr: "2/sqrt(2)", expect: "sqrt(2)" }], R`Khoảng cách bằng $d(A;\ BD)=\frac{2}{\sqrt2}=\sqrt2$.`),
      luyen(R`Tứ diện $OABC$ có $OA$, $OB$, $OC$ đôi một vuông góc, $OB=9$ và $OC=12$. Tính khoảng cách giữa $OA$ và $BC$.`, R`Khoảng cách bằng $\frac{36}{5}$.`, [{ expr: "Rational(9*12,15)", expect: "Rational(36,5)" }], R`Vì $OA\perp(OBC)$ nên khoảng cách bằng $d(O;\ BC)=\frac{9\cdot12}{15}=\frac{36}{5}$ với $BC=15$.`),
    ],
    { topicId: "triangle" }),
  bai("kc-the-tich", "Khoảng cách từ điểm đến mặt phẳng bằng thể tích",
    R`Khi khó dựng đường cao, dùng thể tích: nếu tứ diện có thể tích $V$ và đáy có diện tích $S$ thì chiều cao hạ từ đỉnh còn lại là $h=\frac{3V}{S}$. Khoảng cách từ một điểm đến mặt phẳng bằng chiều cao của tứ diện nhận mặt phẳng đó làm đáy.`,
    [
      vd(R`Tứ diện $OABC$ có $OA=OB=OC=3$ đôi một vuông góc. Tính khoảng cách từ $O$ đến $(ABC)$.`,
        [
          buoc(R`Thể tích $V=\frac{1}{6}\cdot27=\frac92$ và $ABC$ đều cạnh $3\sqrt2$ có diện tích $\frac{9\sqrt3}{2}$.`, R`Tính thể tích bằng đáy $OAB$ và đường cao $OC$, rồi diện tích tam giác đều.`),
          buoc(R`Do đó $h=\frac{3\cdot\frac92}{\frac{9\sqrt3}{2}}=\sqrt3$.`, R`Thay vào $h=\frac{3V}{S}$.`),
        ],
        R`Khoảng cách bằng $\sqrt3$.`,
        [{ expr: "3*Rational(9,2)/(9*sqrt(3)/2)", expect: "sqrt(3)" }]),
      vd(R`Hình chóp $S.ABC$ có $SA\perp(ABC)$, $SA=2$ và $ABC$ vuông cân tại $A$ với $AB=AC=2$. Tính khoảng cách từ $A$ đến $(SBC)$.`,
        [
          buoc(R`Thể tích $V=\frac13\cdot\frac{2\cdot2}{2}\cdot2=\frac43$ và $SBC$ đều cạnh $2\sqrt2$ có diện tích $2\sqrt3$.`, R`Ba cạnh $SB$, $SC$, $BC$ đều bằng $2\sqrt2$.`),
          buoc(R`Do đó $d=\frac{3\cdot\frac43}{2\sqrt3}=\frac{2\sqrt3}{3}$.`, R`Thay vào $h=\frac{3V}{S}$.`),
        ],
        R`Khoảng cách bằng $\frac{2\sqrt3}{3}$.`,
        [{ expr: "3*Rational(4,3)/(2*sqrt(3))", expect: "2*sqrt(3)/3" }]),
    ],
    [
      luyen(R`Tứ diện có thể tích $6$ và một mặt có diện tích $9$. Tính chiều cao hạ từ đỉnh còn lại xuống mặt đó.`, R`Chiều cao bằng $2$.`, [{ expr: "3*6/9", expect: "2" }], R`Ta có $h=\frac{3V}{S}=\frac{18}{9}=2$.`),
      luyen(R`Hình chóp $S.ABCD$ có đáy là hình vuông cạnh $3$, $SA\perp(ABCD)$ và $SA=4$. Tính khoảng cách từ $A$ đến $(SBC)$.`, R`Khoảng cách bằng $\frac{12}{5}$.`, [{ expr: "3*6/Rational(15,2)", expect: "Rational(12,5)" }], R`Tứ diện $SABC$ có $V=6$ và $SBC$ vuông tại $B$ có diện tích $\frac{5\cdot3}{2}=\frac{15}{2}$, nên $d=\frac{18}{\frac{15}{2}}=\frac{12}{5}$.`),
      luyen(R`Tứ diện $OABC$ có $OA=OB=OC=6$ đôi một vuông góc. Tính khoảng cách từ $O$ đến $(ABC)$.`, R`Khoảng cách bằng $2\sqrt3$.`, [{ expr: "6/sqrt(3)", expect: "2*sqrt(3)" }], R`Với ba cạnh bằng $a$ thì khoảng cách là $\frac{a}{\sqrt3}$, tức $\frac{6}{\sqrt3}=2\sqrt3$.`),
    ],
    { topicId: "triangle" }),
]);

export const lop11TyLeKg: GradeChapter = chuong("ty-le-kg-11", "Định lí Ta-lét và thiết diện song song", [
  bai("thales-kg", "Định lí Ta-lét trong không gian",
    R`Ba mặt phẳng song song chắn trên hai đường thẳng bất kì những đoạn thẳng tương ứng tỉ lệ. Trong tam giác $SAB$, nếu $M\in SA$, $N\in SB$ và $MN\parallel AB$ thì $\frac{SM}{SA}=\frac{SN}{SB}=\frac{MN}{AB}$.`,
    [
      vd(R`Ba mặt phẳng song song cắt đường thẳng $d$ tại $A$, $B$, $C$ và cắt $d'$ tại $A'$, $B'$, $C'$. Biết $AB=2$, $BC=3$ và $A'B'=4$. Tính $B'C'$.`,
        [
          buoc(R`Theo định lí Ta-lét, $\frac{AB}{BC}=\frac{A'B'}{B'C'}$.`, R`Các đoạn tương ứng trên hai đường thẳng tỉ lệ.`),
          buoc(R`Do đó $B'C'=\frac{A'B'\cdot BC}{AB}=\frac{4\cdot3}{2}=6$.`, R`Rút $B'C'$ từ tỉ lệ thức.`),
        ],
        R`Độ dài $B'C'$ bằng $6$.`,
        [{ expr: "4*3/2", expect: "6" }]),
      vd(R`Trong tam giác $SAB$ có $M\in SA$, $N\in SB$, $MN\parallel AB$, $\frac{SM}{SA}=\frac13$ và $AB=9$. Tính $MN$.`,
        [
          buoc(R`Do $MN\parallel AB$ nên $\frac{MN}{AB}=\frac{SM}{SA}=\frac13$.`, R`Hai tam giác $SMN$ và $SAB$ đồng dạng.`),
          buoc(R`Vậy $MN=\frac13\cdot9=3$.`, R`Nhân tỉ số $\frac13$ với độ dài $AB=9$ của cạnh đáy.`),
        ],
        R`Độ dài $MN$ bằng $3$.`,
        [{ expr: "9*Rational(1,3)", expect: "3" }]),
    ],
    [
      luyen(R`Ba mặt phẳng song song cắt đường thẳng $d$ tại $A$, $B$, $C$ với $AB=3$, $BC=5$ và cắt $d'$ tại $A'$, $B'$, $C'$ với $A'C'=24$. Tính $A'B'$.`, R`Độ dài $A'B'$ bằng $9$.`, [{ expr: "24*Rational(3,8)", expect: "9" }], R`Ta có $\frac{A'B'}{A'C'}=\frac{AB}{AC}=\frac38$ nên $A'B'=24\cdot\frac38=9$.`),
      luyen(R`Trong tam giác $SAB$, $MN\parallel AB$ với $M\in SA$, $N\in SB$, $\frac{SM}{SA}=\frac25$ và $AB=10$. Tính $MN$.`, R`Độ dài $MN$ bằng $4$.`, [{ expr: "10*Rational(2,5)", expect: "4" }], R`Ta có $MN=\frac25\cdot10=4$.`),
      luyen(R`Trong tam giác $SAB$, $MN\parallel AB$ với $SM=4$, $MA=2$ và $MN=8$. Tính $AB$.`, R`Độ dài $AB$ bằng $12$.`, [{ expr: "8*6/4", expect: "12" }], R`Ta có $SA=6$ nên $AB=MN\cdot\frac{SA}{SM}=8\cdot\frac64=12$.`),
    ],
    { topicId: "triangle" }),
  bai("thiet-dien-ss", "Thiết diện song song với đáy và tỉ số diện tích, thể tích",
    R`Mặt phẳng song song với mặt đáy của hình chóp cắt các cạnh bên theo cùng tỉ số $k=\frac{SM}{SA}$ và cho thiết diện đồng dạng với đáy với tỉ số $k$. Khi đó diện tích thiết diện bằng $k^2$ lần diện tích đáy, và thể tích khối chóp nhỏ bằng $k^3$ lần thể tích khối chóp lớn.`,
    [
      vd(R`Hình chóp $S.ABCD$ có đáy là hình vuông cạnh $6$. Một mặt phẳng song song với đáy cắt $SA$ tại $M$ với $\frac{SM}{SA}=\frac13$. Tính diện tích thiết diện.`,
        [
          buoc(R`Thiết diện là hình vuông có cạnh $6\cdot\frac13=2$.`, R`Thiết diện đồng dạng với đáy theo tỉ số $\frac13$.`),
          buoc(R`Diện tích là $2^2=4$.`, R`Bình phương cạnh hình vuông.`),
        ],
        R`Diện tích thiết diện bằng $4$.`,
        [{ expr: "(6*Rational(1,3))**2", expect: "4" }]),
      vd(R`Một mặt phẳng song song với đáy cắt hình chóp cho thiết diện có diện tích $16$, còn đáy có diện tích $36$. Tìm tỉ số $k$.`,
        [
          buoc(R`Tỉ số diện tích là $k^2=\frac{16}{36}=\frac49$.`, R`Diện tích tỉ lệ với bình phương tỉ số đồng dạng.`),
          buoc(R`Do đó $k=\frac23$.`, R`Lấy căn bậc hai dương của $\frac49$ vì tỉ số đồng dạng không âm.`),
        ],
        R`Tỉ số bằng $\frac23$.`,
        [{ expr: "sqrt(Rational(16,36))", expect: "Rational(2,3)" }]),
    ],
    [
      luyen(R`Đáy hình chóp có diện tích $20$ và tỉ số đồng dạng của thiết diện song song đáy là $\frac12$. Tính diện tích thiết diện.`, R`Diện tích bằng $5$.`, [{ expr: "20*Rational(1,2)**2", expect: "5" }], R`Diện tích bằng $k^2\cdot20=\frac14\cdot20=5$.`),
      luyen(R`Đáy hình chóp $S.ABC$ có diện tích $27$ và thiết diện song song đáy có diện tích $12$. Tìm tỉ số $\frac{SM}{SA}$.`, R`Tỉ số bằng $\frac23$.`, [{ expr: "sqrt(Rational(12,27))", expect: "Rational(2,3)" }], R`Ta có $k^2=\frac{12}{27}=\frac49$ nên $k=\frac23$.`),
      luyen(R`Khối chóp có thể tích $54$. Mặt phẳng song song đáy cắt cạnh bên theo tỉ số $\frac13$ tính từ đỉnh. Tính thể tích khối chóp nhỏ.`, R`Thể tích bằng $2$.`, [{ expr: "54*Rational(1,3)**3", expect: "2" }], R`Thể tích nhỏ bằng $k^3\cdot54=\frac{54}{27}=2$.`),
    ],
    { topicId: "triangle" }),
]);
