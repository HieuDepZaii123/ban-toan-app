/** Lớp 10 và 11, phần chi tiết thứ hai: đường thẳng, thống kê nâng cao, phép chiếu song song và hình hộp. */
import type { GradeChapter } from "./types.ts";
import { bai, buoc, chuong, luyen, vd } from "./types.ts";

const R = String.raw;

export const lop10DuongThangNC: GradeChapter = chuong("duong-thang-nc", "Vị trí, góc và khoảng cách của đường thẳng", [
  bai("vi-tri-hai-dt", "Vị trí tương đối của hai đường thẳng",
    R`Hai đường thẳng $d_1:\ a_1x+b_1y+c_1=0$ và $d_2:\ a_2x+b_2y+c_2=0$ cắt nhau khi $a_1b_2-a_2b_1\ne0$. Khi $a_1b_2-a_2b_1=0$, hai đường song song nếu chúng không có điểm chung và trùng nhau nếu một điểm của đường này nằm trên đường kia.`,
    [
      vd(R`Xét vị trí của $d_1:\ x+2y-3=0$ và $d_2:\ 2x+4y-5=0$.`,
        [
          buoc(R`Tính $a_1b_2-a_2b_1=1\cdot4-2\cdot2=0$ nên hai đường song song hoặc trùng.`, R`Định thức bằng $0$ nghĩa là hai pháp tuyến cùng phương.`),
          buoc(R`Điểm $(3;\ 0)$ thuộc $d_1$ nhưng $2\cdot3-5=1\ne0$ nên không thuộc $d_2$.`, R`Thử một điểm của $d_1$ vào $d_2$ để phân biệt song song với trùng nhau.`),
        ],
        R`Hai đường thẳng song song và không trùng nhau.`,
        [{ expr: "1*4-2*2", expect: "0" }, { expr: "2*3+4*0-5", expect: "1" }]),
      vd(R`Tìm giao điểm của $d_1:\ x+y-3=0$ và $d_2:\ x-y-1=0$.`,
        [
          buoc(R`Cộng hai phương trình được $2x-4=0$ nên $x=2$.`, R`Cộng vế theo vế làm mất ẩn $y$.`),
          buoc(R`Thay vào $d_1$ được $y=3-2=1$.`, R`Thay $x=2$ vào một trong hai phương trình.`),
        ],
        R`Giao điểm là $(2;\ 1)$.`,
        [{ expr: "Rational(3+1,2)", expect: "2" }, { expr: "3-Rational(3+1,2)", expect: "1" }]),
    ],
    [
      luyen(R`Tìm $m$ để $x+my-1=0$ song song với $2x+4y+3=0$.`, R`Giá trị cần tìm là $m=2$.`, [{ expr: "solve(1*4-2*x, x)[0]", expect: "2" }], R`Cần $1\cdot4-2\cdot m=0$ nên $m=2$, và khi đó hai đường không trùng vì $\frac{-1}{3}\ne\frac{1}{2}$.`),
      luyen(R`Hai đường $2x+y-5=0$ và $x-y-1=0$ cắt nhau tại $(x_0;\ y_0)$. Tính $x_0+y_0$.`, R`Tổng bằng $3$.`, [{ expr: "(5+1)/3+(5-2*(5+1)/3)", expect: "3" }], R`Cộng hai phương trình được $3x=6$ nên $x_0=2$ và $y_0=5-2\cdot2=1$.`),
      { ...luyen(R`Hai đường $x+2y-3=0$ và $2x+4y-6=0$ có quan hệ nào?`, R`Hai đường trùng nhau.`, [{ expr: "1*4-2*2", expect: "0" }], R`Định thức bằng $0$ và phương trình thứ hai bằng hai lần phương trình thứ nhất, nên hai đường trùng nhau.`), ask: { kind: "choice", options: ["Hai đường trùng nhau.", "Hai đường song song và không trùng.", "Hai đường cắt nhau."], correct: 0 } },
    ],
    { topicId: "vector" }),
  bai("goc-hai-dt", "Góc giữa hai đường thẳng",
    R`Góc $\varphi$ giữa hai đường thẳng có vectơ pháp tuyến $\vec{n_1}$ và $\vec{n_2}$ thỏa $\cos\varphi=\frac{|\vec{n_1}\cdot\vec{n_2}|}{|\vec{n_1}|\,|\vec{n_2}|}$ và $0^\circ\le\varphi\le90^\circ$. Hai đường vuông góc khi $\vec{n_1}\cdot\vec{n_2}=0$.`,
    [
      vd(R`Tính góc giữa $x-y=0$ và $y=0$.`,
        [
          buoc(R`Pháp tuyến là $(1;\ -1)$ và $(0;\ 1)$, tích vô hướng bằng $-1$.`, R`Lấy hệ số của $x$ và $y$ trong từng phương trình.`),
          buoc(R`Do đó $\cos\varphi=\frac{|-1|}{\sqrt2\cdot1}=\frac{\sqrt2}{2}$ nên $\varphi=45^\circ$.`, R`Dùng trị tuyệt đối vì góc giữa hai đường không vượt quá $90^\circ$.`),
        ],
        R`Góc giữa hai đường bằng $45^\circ$.`,
        [{ expr: "Abs(1*0+(-1)*1)/(sqrt(2)*1)", expect: "sqrt(2)/2" }]),
      vd(R`Tìm $m$ để $mx+y-1=0$ vuông góc với $x+2y+3=0$.`,
        [
          buoc(R`Pháp tuyến là $(m;\ 1)$ và $(1;\ 2)$.`, R`Lấy hệ số của $x$ và $y$.`),
          buoc(R`Cần $m\cdot1+1\cdot2=0$ nên $m=-2$.`, R`Hai đường vuông góc khi tích vô hướng hai pháp tuyến bằng $0$.`),
        ],
        R`Giá trị cần tìm là $m=-2$.`,
        [{ expr: "solve(x*1+1*2, x)[0]", expect: "-2" }]),
    ],
    [
      luyen(R`Tính góc giữa $x+y=0$ và $x=0$ theo đơn vị độ.`, R`Góc bằng $45$ độ.`, [{ expr: "acos(Abs(1*1+0*1)/(sqrt(2)*1))*180/pi", expect: "45" }], R`Pháp tuyến $(1;\ 1)$ và $(1;\ 0)$ cho $\cos\varphi=\frac{1}{\sqrt2}$, tức $\varphi=45^\circ$.`),
      luyen(R`Tìm $m$ để $3x+my+1=0$ vuông góc với $2x-y+5=0$.`, R`Giá trị cần tìm là $m=6$.`, [{ expr: "solve(3*2+x*(-1), x)[0]", expect: "6" }], R`Cần $3\cdot2+m\cdot(-1)=0$ nên $m=6$.`),
      luyen(R`Tính góc giữa $x-\sqrt3y=0$ và $y=0$ theo đơn vị độ.`, R`Góc bằng $30$ độ.`, [{ expr: "acos(sqrt(3)/(2*1))*180/pi", expect: "30" }], R`Pháp tuyến $(1;\ -\sqrt3)$ có độ dài $2$ và $(0;\ 1)$ có độ dài $1$, nên $\cos\varphi=\frac{\sqrt3}{2}$ và $\varphi=30^\circ$.`),
    ],
    { topicId: "vector" }),
  bai("kc-hai-song-song", "Khoảng cách giữa hai đường song song",
    R`Hai đường song song $ax+by+c_1=0$ và $ax+by+c_2=0$ có khoảng cách $\frac{|c_1-c_2|}{\sqrt{a^2+b^2}}$. Cách khác là lấy một điểm trên đường này rồi tính khoảng cách đến đường kia.`,
    [
      vd(R`Tính khoảng cách giữa $3x+4y-5=0$ và $3x+4y+10=0$.`,
        [
          buoc(R`Hai đường có cùng hệ số $a=3$, $b=4$ và $c_1=-5$, $c_2=10$.`, R`Điều kiện để dùng công thức là hai phương trình có cùng pháp tuyến.`),
          buoc(R`Khoảng cách là $\frac{|10-(-5)|}{\sqrt{9+16}}=\frac{15}{5}=3$.`, R`Thay các hệ số $a$, $b$, $c_1$, $c_2$ vào công thức khoảng cách.`),
        ],
        R`Khoảng cách bằng $3$.`,
        [{ expr: "Abs(10-(-5))/sqrt(3**2+4**2)", expect: "3" }]),
      vd(R`Tìm đường thẳng song song với $x+y-1=0$ và cách nó $\sqrt2$.`,
        [
          buoc(R`Đường cần tìm có dạng $x+y+c=0$ với $\frac{|c+1|}{\sqrt2}=\sqrt2$.`, R`Dùng công thức khoảng cách giữa hai đường song song.`),
          buoc(R`Suy ra $|c+1|=2$ nên $c=1$ hoặc $c=-3$.`, R`Bỏ trị tuyệt đối cho hai trường hợp.`),
        ],
        R`Có hai đường là $x+y+1=0$ và $x+y-3=0$.`,
        [{ expr: "Max(*solve((x+1)**2-4, x))", expect: "1" }, { expr: "Min(*solve((x+1)**2-4, x))", expect: "-3" }]),
    ],
    [
      luyen(R`Tính khoảng cách giữa $x+y-2=0$ và $x+y+4=0$.`, R`Khoảng cách bằng $3\sqrt2$.`, [{ expr: "Abs(4-(-2))/sqrt(2)", expect: "3*sqrt(2)" }], R`Ta có $\frac{|4-(-2)|}{\sqrt2}=\frac{6}{\sqrt2}=3\sqrt2$.`),
      luyen(R`Hai đường $2x-y+1=0$ và $2x-y+m=0$ cách nhau $\sqrt5$. Tìm giá trị dương của $m$.`, R`Giá trị cần tìm là $m=6$.`, [{ expr: "Max(*solve((x-1)**2-25, x))", expect: "6" }], R`Cần $\frac{|m-1|}{\sqrt5}=\sqrt5$, tức $|m-1|=5$, nên $m=6$ hoặc $m=-4$; lấy giá trị dương.`),
      luyen(R`Tính khoảng cách từ gốc $O$ đến đường thẳng đi qua $A(3;\ 0)$ và $B(0;\ 4)$.`, R`Khoảng cách bằng $\frac{12}{5}$.`, [{ expr: "Rational(12,1)/sqrt(4**2+3**2)", expect: "Rational(12,5)" }], R`Đường $AB$ là $4x+3y-12=0$ nên khoảng cách từ $O$ là $\frac{12}{\sqrt{16+9}}=\frac{12}{5}$.`),
    ],
    { topicId: "vector" }),
  bai("lap-pt-dt", "Lập phương trình đường thẳng",
    R`Đường thẳng qua $M(x_0;\ y_0)$ có vectơ pháp tuyến $(a;\ b)$ là $a(x-x_0)+b(y-y_0)=0$. Đường song song với $ax+by+c=0$ có dạng $ax+by+c'=0$, và đường vuông góc có dạng $bx-ay+c'=0$.`,
    [
      vd(R`Viết đường thẳng qua $A(1;\ 2)$ song song với $2x-y+3=0$.`,
        [
          buoc(R`Đường cần tìm có dạng $2x-y+c'=0$.`, R`Hai đường song song có cùng pháp tuyến.`),
          buoc(R`Điểm $A$ thuộc đường nên $2\cdot1-2+c'=0$, tức $c'=0$.`, R`Thay tọa độ $A$ vào phương trình để tìm hằng số.`),
        ],
        R`Đường thẳng cần tìm là $2x-y=0$.`,
        [{ expr: "solve(2*1-2+x, x)[0]", expect: "0" }]),
      vd(R`Viết đường thẳng qua $A(1;\ 2)$ vuông góc với $x+3y-1=0$.`,
        [
          buoc(R`Pháp tuyến của đường cần tìm là chỉ phương của đường đã cho, tức $(3;\ -1)$.`, R`Chỉ phương của $x+3y-1=0$ là $(3;\ -1)$ vì vuông góc với pháp tuyến $(1;\ 3)$.`),
          buoc(R`Phương trình là $3(x-1)-(y-2)=0$, tức $3x-y-1=0$.`, R`Dùng công thức qua một điểm với pháp tuyến đã biết.`),
        ],
        R`Đường thẳng cần tìm là $3x-y-1=0$.`,
        [{ expr: "-3*1+2", expect: "-1" }]),
    ],
    [
      luyen(R`Đường thẳng qua $B(2;\ 3)$ song song với $3x+y-1=0$ có dạng $3x+y+c=0$. Tìm $c$.`, R`Giá trị cần tìm là $c=-9$.`, [{ expr: "-(3*2+3)", expect: "-9" }], R`Điểm $B$ thuộc đường nên $3\cdot2+3+c=0$, tức $c=-9$.`),
      luyen(R`Đường trung trực của $A(0;\ 0)$ và $B(2;\ 4)$ có dạng $x+2y+c=0$. Tìm $c$.`, R`Giá trị cần tìm là $c=-5$.`, [{ expr: "-(1+2*2)", expect: "-5" }], R`Đường đi qua trung điểm $M(1;\ 2)$ nên $1+2\cdot2+c=0$, tức $c=-5$.`),
      luyen(R`Đường thẳng qua $C(1;\ 1)$ vuông góc với $x-2y+3=0$ có dạng $2x+y+c=0$. Tìm $c$.`, R`Giá trị cần tìm là $c=-3$.`, [{ expr: "-(2*1+1*1)", expect: "-3" }], R`Điểm $C$ thuộc đường nên $2\cdot1+1+c=0$, tức $c=-3$.`),
    ],
    { topicId: "vector" }),
]);

export const lop10ThongKeNC: GradeChapter = chuong("thong-ke-nc", "Số trung bình và giá trị ngoại lệ", [
  bai("so-trung-binh", "Số trung bình của mẫu số liệu",
    R`Với các giá trị $x_1;\ x_2;\ \dots$ có tần số $n_1;\ n_2;\ \dots$ và cỡ mẫu $n$, số trung bình là $\bar x=\frac{n_1x_1+n_2x_2+\cdots}{n}$. Thêm hoặc bớt một giá trị làm số trung bình đổi theo tổng và cỡ mẫu mới.`,
    [
      vd(R`Các giá trị $1;\ 2;\ 3$ có tần số $2;\ 5;\ 3$. Tính số trung bình.`,
        [
          buoc(R`Cỡ mẫu là $n=2+5+3=10$.`, R`Cỡ mẫu bằng tổng của tất cả các tần số.`),
          buoc(R`Số trung bình là $\frac{1\cdot2+2\cdot5+3\cdot3}{10}=\frac{21}{10}$.`, R`Nhân từng giá trị với tần số rồi chia cho cỡ mẫu.`),
        ],
        R`Số trung bình bằng $\frac{21}{10}$.`,
        [{ expr: "Rational(1*2+2*5+3*3,10)", expect: "Rational(21,10)" }]),
      vd(R`Mẫu $4;\ 6;\ 8$ có số trung bình $6$. Thêm một số nữa để trung bình mới bằng $7$. Số đó là bao nhiêu?`,
        [
          buoc(R`Tổng ban đầu là $3\cdot6=18$, tổng mới phải là $4\cdot7=28$.`, R`Tổng bằng số trung bình nhân cỡ mẫu.`),
          buoc(R`Số thêm vào là $28-18=10$.`, R`Hiệu hai tổng chính là giá trị thêm vào.`),
        ],
        R`Số cần thêm là $10$.`,
        [{ expr: "7*4-18", expect: "10" }]),
    ],
    [
      luyen(R`Tính số trung bình của mẫu $5;\ 7;\ 9;\ 11$.`, R`Số trung bình bằng $8$.`, [{ expr: "Rational(5+7+9+11,4)", expect: "8" }], R`Tổng là $32$ và cỡ mẫu là $4$ nên số trung bình là $8$.`),
      luyen(R`Các giá trị $1;\ 2;\ 3$ có tần số $1;\ 1;\ 2$. Tính số trung bình.`, R`Số trung bình bằng $\frac{9}{4}$.`, [{ expr: "Rational(1+2+3*2,4)", expect: "Rational(9,4)" }], R`Tổng là $1+2+6=9$ và cỡ mẫu là $4$.`),
      luyen(R`Năm số có trung bình $8$. Thêm số $14$ thì trung bình mới bằng bao nhiêu?`, R`Trung bình mới bằng $9$.`, [{ expr: "Rational(5*8+14,6)", expect: "9" }], R`Tổng cũ là $40$, tổng mới là $54$ và cỡ mẫu mới là $6$ nên trung bình là $9$.`),
    ],
    { topicId: "combo" }),
  bai("so-ngoai-le", "Giá trị ngoại lệ",
    R`Một giá trị là ngoại lệ nếu nhỏ hơn $Q_1-1{,}5\Delta_Q$ hoặc lớn hơn $Q_3+1{,}5\Delta_Q$, với $\Delta_Q=Q_3-Q_1$ là khoảng tứ phân vị. Giá trị ngoại lệ có thể do nhập sai hoặc là trường hợp thật sự đặc biệt, nên cần xem xét chứ không tự động bỏ.`,
    [
      vd(R`Mẫu $2;\ 4;\ 5;\ 6;\ 7;\ 8;\ 30$ có giá trị ngoại lệ không?`,
        [
          buoc(R`Ta có $Q_1=4$ và $Q_3=8$ nên $\Delta_Q=4$.`, R`Trung vị là $6$, rồi lấy trung vị của nửa dưới $2;\ 4;\ 5$ và nửa trên $7;\ 8;\ 30$.`),
          buoc(R`Cận trên là $8+1{,}5\cdot4=14$, và $30>14$ nên $30$ là giá trị ngoại lệ.`, R`So từng giá trị cực biên với hai cận.`),
        ],
        R`Giá trị $30$ là giá trị ngoại lệ.`,
        [{ expr: "8+Rational(3,2)*4", expect: "14" }]),
      vd(R`Mẫu $3;\ 5;\ 6;\ 7;\ 9$ có giá trị ngoại lệ không?`,
        [
          buoc(R`Ta có $Q_1=\frac{3+5}{2}=4$, $Q_3=\frac{7+9}{2}=8$ và $\Delta_Q=4$.`, R`Bỏ trung vị $6$ rồi lấy trung vị của hai nửa.`),
          buoc(R`Cận dưới là $4-1{,}5\cdot4=-2$ và cận trên là $14$, nên mọi giá trị đều nằm trong hai cận.`, R`Giá trị nhỏ nhất $3>-2$ và lớn nhất $9<14$.`),
        ],
        R`Mẫu không có giá trị ngoại lệ.`,
        [{ expr: "4-Rational(3,2)*4", expect: "-2" }]),
    ],
    [
      luyen(R`Mẫu có $Q_1=10$ và $Q_3=20$. Cận trên để xét giá trị ngoại lệ bằng bao nhiêu?`, R`Cận trên bằng $35$.`, [{ expr: "20+Rational(3,2)*(20-10)", expect: "35" }], R`Khoảng tứ phân vị là $10$ nên cận trên là $20+1{,}5\cdot10=35$.`),
      luyen(R`Mẫu có $Q_1=10$ và $Q_3=20$. Cận dưới để xét giá trị ngoại lệ bằng bao nhiêu?`, R`Cận dưới bằng $-5$.`, [{ expr: "10-Rational(3,2)*10", expect: "-5" }], R`Cận dưới là $10-1{,}5\cdot10=-5$.`),
      { ...luyen(R`Với $Q_1=10$ và $Q_3=20$, giá trị $40$ có là giá trị ngoại lệ không?`, R`Có, vì $40$ lớn hơn cận trên $35$.`, [{ expr: "sign(40-(20+Rational(3,2)*10))", expect: "1" }], R`Cận trên là $35$ và $40>35$ nên $40$ là giá trị ngoại lệ.`), ask: { kind: "choice", options: ["Có, vì lớn hơn cận trên.", "Không, vì nhỏ hơn cận trên."], correct: 0 } },
    ],
    { topicId: "combo" }),
]);

export const lop11ChieuSongSong: GradeChapter = chuong("chieu-ss-11", "Phép chiếu song song và hình hộp", [
  bai("phep-chieu-ss", "Phép chiếu song song và các tính chất",
    R`Phép chiếu song song biến đường thẳng thành đường thẳng, giữ nguyên tính song song và giữ nguyên tỉ số độ dài của các đoạn thẳng trên cùng một đường thẳng hoặc trên hai đường thẳng song song. Phép chiếu không giữ nguyên độ dài, góc hay tính vuông góc.`,
    [
      vd(R`Ba điểm $M$, $N$, $P$ thẳng hàng với $MN:NP=1:3$. Hình chiếu của chúng là $M'$, $N'$, $P'$ với $M'N'=2$. Tính $N'P'$.`,
        [
          buoc(R`Phép chiếu giữ tỉ số nên $M'N':N'P'=1:3$.`, R`Ba điểm cùng nằm trên một đường thẳng.`),
          buoc(R`Do đó $N'P'=3\cdot M'N'=6$.`, R`Từ tỉ số $1:3$ suy ra $N'P'$ gấp $3$ lần $M'N'=2$.`),
        ],
        R`Độ dài $N'P'$ bằng $6$.`,
        [{ expr: "2*3", expect: "6" }]),
      vd(R`Tứ giác $ABCD$ là hình bình hành có $AB=4$ và $BC=3$. Hình chiếu $A'B'C'D'$ có $A'B'=2$. Tính $C'D'$ và $A'B':C'D'$.`,
        [
          buoc(R`Vì $AB$ và $CD$ song song và bằng nhau nên chúng chiếu thành hai đoạn song song có cùng tỉ số.`, R`Phép chiếu giữ tỉ số trên hai đường song song.`),
          buoc(R`Do đó $C'D'=A'B'=2$ và tỉ số $A'B':C'D'=1$.`, R`Hai đoạn bằng nhau ban đầu vẫn bằng nhau sau phép chiếu.`),
        ],
        R`Độ dài $C'D'$ bằng $2$ và hình chiếu vẫn là hình bình hành.`,
        [{ expr: "2*1", expect: "2" }]),
    ],
    [
      luyen(R`Ba điểm $M$, $N$, $P$ thẳng hàng với $MN:NP=2:5$ và hình chiếu có $M'N'=4$. Tính $N'P'$.`, R`Độ dài bằng $10$.`, [{ expr: "4*5/2", expect: "10" }], R`Tỉ số $M'N':N'P'=2:5$ nên $N'P'=4\cdot\frac{5}{2}=10$.`),
      { ...luyen(R`Phép chiếu song song có luôn giữ nguyên độ dài các đoạn thẳng không?`, R`Không, chỉ giữ tỉ số trên cùng đường thẳng hoặc trên các đường song song.`, [{ expr: "Rational(2,1)*3", expect: "6" }], R`Ví dụ hai đoạn $MN=1$, $NP=3$ có thể chiếu thành hai đoạn $2$ và $6$, nên độ dài thay đổi nhưng tỉ số vẫn là $1:3$.`), ask: { kind: "choice", options: ["Có, luôn giữ nguyên độ dài.", "Không, chỉ giữ tỉ số trên cùng đường thẳng hoặc đường song song."], correct: 1 } },
      luyen(R`Điểm $M$ là trung điểm của $AB$ và hình chiếu có $A'B'=10$. Tính $A'M'$.`, R`Độ dài bằng $5$.`, [{ expr: "Rational(10,2)", expect: "5" }], R`Phép chiếu giữ trung điểm nên $M'$ là trung điểm của $A'B'$ và $A'M'=\frac{10}{2}=5$.`),
    ],
    { topicId: "triangle" }),
  bai("hinh-hop-11", "Hình hộp chữ nhật: đường chéo, thể tích, diện tích",
    R`Hình hộp chữ nhật có ba kích thước $a$, $b$, $c$ có đường chéo $\sqrt{a^2+b^2+c^2}$, thể tích $abc$ và diện tích toàn phần $2(ab+bc+ca)$. Hình lập phương cạnh $a$ có đường chéo $a\sqrt3$.`,
    [
      vd(R`Tính đường chéo của hình hộp chữ nhật có ba kích thước $3$, $4$, $12$.`,
        [
          buoc(R`Đường chéo đáy là $\sqrt{3^2+4^2}=5$.`, R`Áp dụng định lí Pi-ta-go cho đáy.`),
          buoc(R`Đường chéo hình hộp là $\sqrt{5^2+12^2}=13$.`, R`Tam giác vuông với hai cạnh là đường chéo đáy và chiều cao.`),
        ],
        R`Đường chéo bằng $13$.`,
        [{ expr: "sqrt(3**2+4**2+12**2)", expect: "13" }]),
      vd(R`Hình lập phương có đường chéo $6\sqrt3$. Tính cạnh.`,
        [
          buoc(R`Đường chéo hình lập phương là $a\sqrt3$.`, R`Ba kích thước đều bằng $a$ nên $\sqrt{a^2+a^2+a^2}=a\sqrt3$.`),
          buoc(R`Từ $a\sqrt3=6\sqrt3$ được $a=6$.`, R`Chia hai vế cho $\sqrt3$.`),
        ],
        R`Cạnh hình lập phương bằng $6$.`,
        [{ expr: "solve(x*sqrt(3)-6*sqrt(3), x)[0]", expect: "6" }]),
    ],
    [
      luyen(R`Tính đường chéo của hình hộp chữ nhật có ba kích thước $2$, $3$, $6$.`, R`Đường chéo bằng $7$.`, [{ expr: "sqrt(2**2+3**2+6**2)", expect: "7" }], R`Ta có $\sqrt{4+9+36}=\sqrt{49}=7$.`),
      luyen(R`Hình hộp chữ nhật có đáy vuông cạnh $3$ và đường chéo $\sqrt{34}$. Tính chiều cao.`, R`Chiều cao bằng $4$.`, [{ expr: "sqrt(34-9-9)", expect: "4" }], R`Cần $9+9+c^2=34$ nên $c^2=16$ và $c=4$.`),
      luyen(R`Tính diện tích toàn phần của hình hộp chữ nhật có ba kích thước $2$, $3$, $4$.`, R`Diện tích toàn phần bằng $52$.`, [{ expr: "2*(2*3+3*4+4*2)", expect: "52" }], R`Ta có $2\cdot(6+12+8)=52$.`),
    ],
    { topicId: "triangle" }),
]);
