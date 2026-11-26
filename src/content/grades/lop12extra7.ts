/** Lớp 12, chi tiết thứ bảy: đường thẳng trong Oxyz, vị trí tương đối và các bài toán dựng đường thẳng. */
import type { GradeChapter } from "./types.ts";
import { bai, buoc, chuong, luyen, vd } from "./types.ts";

const R = String.raw;

export const lop12DtOxyzNC: GradeChapter = chuong("dt-oxyz-nc", "Đường thẳng trong Oxyz: vị trí tương đối và bài toán dựng", [
  bai("vtt-hai-dt", "Vị trí tương đối của hai đường thẳng",
    R`Cho $d_1$ qua $A$ với chỉ phương $\vec{u_1}$ và $d_2$ qua $B$ với chỉ phương $\vec{u_2}$. Nếu $\vec{u_1}$, $\vec{u_2}$ cùng phương thì hai đường song song hoặc trùng, và chúng trùng khi $A$ thuộc $d_2$. Nếu không cùng phương thì hai đường cắt nhau khi $\left[\vec{u_1},\vec{u_2}\right]\cdot\overrightarrow{AB}=0$ và chéo nhau khi tích này khác $0$.`,
    [
      vd(R`Cho $d_1$ qua $A(1;\ 2;\ 3)$ với chỉ phương $\vec{u_1}=(2;\ -1;\ 1)$. Xét $d_2$ qua $B(3;\ 1;\ 4)$ với chỉ phương $(4;\ -2;\ 2)$ và $d_3$ qua $C(1;\ 0;\ -1)$ với chỉ phương $(1;\ 2;\ 0)$. Xác định vị trí tương đối của $d_1$ với từng đường.`,
        [
          buoc(R`Chỉ phương của $d_2$ gấp đôi $\vec{u_1}$ nên hai đường song song hoặc trùng.`, R`Hai vectơ cùng phương thì hai đường không thể cắt nhau tại một điểm duy nhất.`),
          buoc(R`Với $t=1$ trên $d_1$ ta được $(3;\ 1;\ 4)=B$, nên $B\in d_1$ và hai đường trùng nhau.`, R`Chỉ cần một điểm chung là đủ kết luận trùng khi hai đường song song.`),
          buoc(R`Với $d_3$: $\left[\vec{u_1},\vec{u_3}\right]=(-2;\ 1;\ 5)$ và $\overrightarrow{AC}=(0;\ -2;\ -4)$, tích vô hướng bằng $-22$.`, R`Hai chỉ phương không cùng phương nên xét tích hỗn tạp với vectơ nối hai điểm.`),
          buoc(R`Tích hỗn tạp khác $0$ nên $d_1$ và $d_3$ chéo nhau.`, R`Tích hỗn tạp bằng $0$ mới là điều kiện để hai đường cùng nằm trong một mặt phẳng.`),
        ],
        R`Đường $d_1$ trùng $d_2$ và chéo với $d_3$.`,
        [{ expr: "Matrix([2,-1,1]).cross(Matrix([1,2,0])).dot(Matrix([0,-2,-4]))", expect: "-22" }]),
      vd(R`Hai đường $d:\ x=1+t;\ y=2;\ z=3-t$ và $d':\ x=2+s,\ y=2+s,\ z=2$ có vị trí tương đối nào?`,
        [
          buoc(R`Chỉ phương $(1;\ 0;\ -1)$ và $(1;\ 1;\ 0)$ không cùng phương.`, R`Hai bộ hệ số không tỉ lệ nên hai đường không song song.`),
          buoc(R`Từ $y=2$ ta được $s=0$; khi đó $d'$ qua $(2;\ 2;\ 2)$, và $t=1$ trên $d$ cho cùng điểm đó.`, R`Một điểm chung cho cả hai đường nghĩa là chúng cắt nhau.`),
        ],
        R`Hai đường cắt nhau tại $(2;\ 2;\ 2)$.`,
        [{ expr: "solve(1+x-2, x)[0]", expect: "1" }]),
    ],
    [
      luyen(R`Cho $d_1$ qua $A(0;\ 0;\ 0)$ chỉ phương $(1;\ 0;\ 1)$ và $d_2$ qua $B(1;\ 1;\ 0)$ chỉ phương $(0;\ 1;\ 1)$. Tính $\left[\vec{u_1},\vec{u_2}\right]\cdot\overrightarrow{AB}$.`, R`Kết quả bằng $-2$, nên hai đường chéo nhau.`, [{ expr: "Matrix([1,0,1]).cross(Matrix([0,1,1])).dot(Matrix([1,1,0]))", expect: "-2" }], R`Tích có hướng là $(-1;\ -1;\ 1)$ và $\overrightarrow{AB}=(1;\ 1;\ 0)$ nên tích vô hướng bằng $-2$.`),
      luyen(R`Hai đường $d:\ x=t,\ y=t,\ z=2t$ và $d':\ x=1+s,\ y=1+s,\ z=m+2s$. Tìm $m$ để hai đường trùng nhau.`, R`Giá trị cần tìm là $m=2$.`, [{ expr: "2*1", expect: "2" }], R`Hai chỉ phương bằng nhau; điểm $(1;\ 1;\ m)$ thuộc $d$ khi $t=1$, nên $z=2$ và $m=2$.`),
      { ...luyen(R`Hai đường $d:\ x=1+t;\ y=1;\ z=2-t$ và $d':\ x=s,\ y=1+s,\ z=3+s$ có vị trí tương đối nào?`, R`Hai đường cắt nhau tại điểm $(0;\ 1;\ 3)$.`, [{ expr: "solve(1+x, x)[0]", expect: "-1" }], R`Chỉ phương không cùng phương; từ $y=1$ ta được $s=0$, và điểm $(0;\ 1;\ 3)$ ứng với $t=-1$ trên $d$.`), ask: { kind: "choice", options: ["Trùng nhau.", "Song song.", "Cắt nhau.", "Chéo nhau."], correct: 2 } },
    ],
    { topicId: "analytic" }),
  bai("giao-hai-dt", "Giao điểm của hai đường thẳng và điều kiện cắt nhau",
    R`Để tìm giao điểm của $d$ và $d'$, ta cho hai tọa độ bằng nhau và giải hệ hai ẩn $t$, $s$, rồi thay vào tọa độ còn lại để kiểm tra. Hệ có đúng một nghiệm khi hai đường cắt nhau; hệ vô nghiệm khi hai đường song song hoặc chéo nhau. Bài toán chứa tham số $m$ thường đưa về việc cho ba phương trình cùng thỏa với một cặp $(t;\ s)$.`,
    [
      vd(R`Tìm giao điểm của $d:\ x=1+t,\ y=2-t,\ z=3+2t$ và $d':\ x=2+s,\ y=1+s,\ z=5-s$.`,
        [
          buoc(R`Cho $x$ và $y$ bằng nhau: $1+t=2+s$ và $2-t=1+s$.`, R`Hai phương trình đầu cho hệ hai ẩn $t$, $s$.`),
          buoc(R`Cộng hai phương trình được $3=3+2s$, nên $s=0$ và $t=1$.`, R`Cộng vế để khử $t$ rồi tìm $s$.`),
          buoc(R`Kiểm tra tọa độ $z$: $3+2\cdot1=5$ và $5-0=5$, khớp nhau.`, R`Phương trình thứ ba phải thỏa thì hai đường mới thật sự cắt nhau.`),
        ],
        R`Giao điểm là $(2;\ 1;\ 5)$.`,
        [{ expr: "3+2*1", expect: "5" }]),
      vd(R`Tìm $m$ để $d:\ x=1+t,\ y=2-t,\ z=m+t$ cắt $d':\ x=2+s,\ y=1+s,\ z=3-s$.`,
        [
          buoc(R`Hai phương trình đầu giống ví dụ trên, cho $s=0$ và $t=1$.`, R`Hai đường cắt nhau chỉ khi cặp $(t;\ s)$ này thỏa cả phương trình thứ ba.`),
          buoc(R`Phương trình thứ ba: $m+1=3-0$, nên $m=2$.`, R`Thay $t=1$ và $s=0$ vào tọa độ $z$.`),
        ],
        R`Hai đường cắt nhau khi $m=2$.`,
        [{ expr: "3-1", expect: "2" }]),
    ],
    [
      luyen(R`Hai đường $d:\ x=t,\ y=1+t,\ z=2t$ và $d':\ x=2+s,\ y=3-s,\ z=4+s$ cắt nhau. Tìm hoành độ giao điểm.`, R`Hoành độ giao điểm bằng $2$.`, [{ expr: "1+1", expect: "2" }], R`Từ $t=2+s$ và $1+t=3-s$ ta được $s=0$ và $t=2$, nên hoành độ bằng $2$.`),
      luyen(R`Hai đường $d:\ x=1+t,\ y=t,\ z=m$ và $d':\ x=1+s,\ y=2-s,\ z=1+s$ cắt nhau. Tìm $m$.`, R`Giá trị cần tìm là $m=2$.`, [{ expr: "(1+1)*1", expect: "2" }], R`Từ $t=s$ và $t=2-s$ ta được $s=1$, rồi $z=1+1=2$ nên $m=2$.`),
      luyen(R`Hai đường $d:\ x=2t,\ y=1+t,\ z=3$ và $d':\ x=1+s,\ y=2s,\ z=3$ cắt nhau. Tìm $t$ của giao điểm.`, R`Giá trị cần tìm là $t=1$.`, [{ expr: "solve(2*(2*x-1)-1-x, x)[0]", expect: "1" }], R`Từ $2t=1+s$ và $1+t=2s$ ta được $s=2t-1$ rồi $3t=3$, nên $t=1$.`),
    ],
    { topicId: "analytic" }),
  bai("duong-cat-hai-dt", "Đường thẳng cắt hai đường cho trước và đường vuông góc chung",
    R`Đường thẳng đi qua điểm $A$ và cắt hai đường $d_1$, $d_2$ được dựng bằng cách lấy $P\in d_1$ và $Q\in d_2$ theo tham số, rồi đặt ba điểm $A$, $P$, $Q$ thẳng hàng, tức $\overrightarrow{AP}=k\overrightarrow{AQ}$. Đường vuông góc chung của hai đường chéo nhau cắt cả hai và vuông góc với cả hai: $\overrightarrow{PQ}$ phải vuông góc với $\vec{u_1}$ và $\vec{u_2}$, tức hai tích vô hướng đều bằng $0$.`,
    [
      vd(R`Cho $d_1:\ x=t;\ y=0;\ z=0$ và $d_2:\ x=0;\ y=s;\ z=1$. Viết đường thẳng qua $A(2;\ 1;\ 2)$ cắt cả hai đường.`,
        [
          buoc(R`Lấy $P(t;\ 0;\ 0)\in d_1$ và $Q(0;\ s;\ 1)\in d_2$, khi đó $\overrightarrow{AP}=(t-2;\ -1;\ -2)$ và $\overrightarrow{AQ}=(-2;\ s-1;\ -1)$.`, R`Ba điểm thẳng hàng khi hai vectơ này cùng phương.`),
          buoc(R`Cho $\overrightarrow{AP}=k\overrightarrow{AQ}$: từ tọa độ $z$ ta có $-2=-k$ nên $k=2$.`, R`Tọa độ $z$ không chứa tham số nên cho ngay hệ số tỉ lệ.`),
          buoc(R`Từ $t-2=-4$ ta được $t=-2$, và từ $-1=2(s-1)$ ta được $s=\frac12$.`, R`Lần lượt dùng tọa độ $x$ và $y$ để tìm $t$ và $s$.`),
          buoc(R`Chỉ phương là $\overrightarrow{AQ}$ nhân hai, tức $(4;\ 1;\ 2)$, nên đường thẳng là $x=2+4k,\ y=1+k,\ z=2+2k$.`, R`Có điểm $A$ và một chỉ phương là viết được phương trình.`),
        ],
        R`Đường thẳng cần tìm là $x=2+4k,\ y=1+k,\ z=2+2k$.`,
        [{ expr: "solve(-1-2*(x-1), x)[0]", expect: "Rational(1,2)" }]),
      vd(R`Tìm đường vuông góc chung của $d_1:\ x=t;\ y=0;\ z=0$ và $d_2:\ x=1+s,\ y=s,\ z=1$.`,
        [
          buoc(R`Lấy $P(t;\ 0;\ 0)$ và $Q(1+s;\ s;\ 1)$, khi đó $\overrightarrow{PQ}=(1+s-t;\ s;\ 1)$.`, R`Hai chân của đường vuông góc chung nằm trên hai đường.`),
          buoc(R`Điều kiện vuông góc với $\vec{u_1}=(1;\ 0;\ 0)$ cho $t=1+s$.`, R`Tích vô hướng với $\vec{u_1}$ chỉ còn thành phần $x$.`),
          buoc(R`Điều kiện vuông góc với $\vec{u_2}=(1;\ 1;\ 0)$ cho $(1+s-t)+s=0$, nên $s=0$ và $t=1$.`, R`Thay $t=1+s$ vào rồi giải phương trình theo $s$.`),
        ],
        R`Chân đường vuông góc chung là $P(1;\ 0;\ 0)$ và $Q(1;\ 0;\ 1)$, nên đường đó có phương trình $x=1;\ y=0$ và độ dài $PQ=1$.`,
        [{ expr: "solve(x-(1+0), x)[0]", expect: "1" }]),
    ],
    [
      luyen(R`Với $d_1$, $d_2$ và $A(2;\ 1;\ 2)$ như ví dụ đầu, đường thẳng qua $A$ cắt $d_2$ tại $Q(0;\ s;\ 1)$. Tìm $s$.`, R`Giá trị cần tìm là $s=\frac12$.`, [{ expr: "solve(-1-2*(x-1), x)[0]", expect: "Rational(1,2)" }], R`Từ $-1=2(s-1)$ ta được $s-1=-\frac12$, nên $s=\frac12$.`),
      luyen(R`Đường vuông góc chung của $d_1$ và $d_2$ trong ví dụ thứ hai cắt $d_1$ tại $P(t;\ 0;\ 0)$. Tìm $t$.`, R`Giá trị cần tìm là $t=1$.`, [{ expr: "solve(x-(1+0), x)[0]", expect: "1" }], R`Từ $s=0$ và $t=1+s$ ta được $t=1$.`),
      luyen(R`Tính khoảng cách giữa $d_1$ qua $O$ chỉ phương $(1;\ 0;\ 0)$ và $d_2$ qua $B(1;\ 0;\ 1)$ chỉ phương $(1;\ 1;\ 0)$.`, R`Khoảng cách bằng $1$.`, [{ expr: "Abs(Matrix([1,0,0]).cross(Matrix([1,1,0])).dot(Matrix([1,0,1])))/Matrix([1,0,0]).cross(Matrix([1,1,0])).norm()", expect: "1" }], R`Tích có hướng là $(0;\ 0;\ 1)$ có độ dài $1$ và tích vô hướng với $\overrightarrow{OB}$ bằng $1$, nên khoảng cách là $\frac11=1$.`),
    ],
    { topicId: "analytic" }),
  bai("dt-trong-mp", "Đường thẳng nằm trong mặt phẳng và hình chiếu của đường thẳng",
    R`Đường thẳng $\Delta$ nằm trong $(P)$ có chỉ phương vuông góc với pháp tuyến $\vec n$ của $(P)$. Nếu $\Delta$ còn vuông góc với đường $d$ có chỉ phương $\vec u$ thì chỉ phương của $\Delta$ là $\left[\vec n,\vec u\right]$. Hình chiếu của $d$ lên $(P)$ là giao của $(P)$ với mặt phẳng $(Q)$ chứa $d$ và vuông góc với $(P)$, với pháp tuyến của $(Q)$ là $\left[\vec u,\vec n\right]$.`,
    [
      vd(R`Cho $(P):\ x+y+z-6=0$ và $d:\ x=1+t,\ y=2+2t,\ z=3$. Viết đường thẳng $\Delta$ nằm trong $(P)$, đi qua giao điểm của $d$ với $(P)$ và vuông góc với $d$.`,
        [
          buoc(R`Thay $d$ vào $(P)$: $1+t+2+2t+3-6=3t=0$ nên $t=0$ và giao điểm là $M(1;\ 2;\ 3)$.`, R`Giao điểm ứng với giá trị $t$ làm phương trình mặt phẳng bằng $0$.`),
          buoc(R`Chỉ phương của $\Delta$ là $\left[\vec n,\vec u\right]=(-2;\ 1;\ 1)$ với $\vec n=(1;\ 1;\ 1)$ và $\vec u=(1;\ 2;\ 0)$.`, R`Vectơ này vuông góc với cả pháp tuyến và chỉ phương của $d$.`),
          buoc(R`Do đó $\Delta:\ x=1-2k,\ y=2+k,\ z=3+k$.`, R`Có điểm $M$ và chỉ phương là viết được phương trình.`),
        ],
        R`Đường thẳng cần tìm là $x=1-2k,\ y=2+k,\ z=3+k$.`,
        [{ expr: "Matrix([1,1,1]).cross(Matrix([1,2,0]))[0]", expect: "-2" }]),
      vd(R`Với $(P)$ và $d$ ở ví dụ trên, viết hình chiếu của $d$ lên $(P)$.`,
        [
          buoc(R`Pháp tuyến của $(Q)$ là $\left[\vec u,\vec n\right]=(2;\ -1;\ -1)$, và $(Q)$ qua $M(1;\ 2;\ 3)$ nên $2x-y-z+3=0$.`, R`Thay $M$ vào để tìm hằng số: $2-2-3+d=0$ cho $d=3$.`),
          buoc(R`Chỉ phương của giao tuyến là $\left[\vec{n_P},\vec{n_Q}\right]=(0;\ 3;\ -3)$, chọn $(0;\ 1;\ -1)$.`, R`Giao tuyến của hai mặt phẳng vuông góc với cả hai pháp tuyến.`),
        ],
        R`Hình chiếu của $d$ là $x=1;\ y=2+k;\ z=3-k$.`,
        [{ expr: "Matrix([1,1,1]).cross(Matrix([2,-1,-1]))[1]", expect: "3" }]),
    ],
    [
      luyen(R`Mặt phẳng $(P):\ z-3=0$ có pháp tuyến $(0;\ 0;\ 1)$ và đường $d$ có chỉ phương $(1;\ 2;\ 1)$. Chỉ phương của đường nằm trong $(P)$ và vuông góc $d$ có dạng $(a;\ 1;\ 0)$. Tìm $a$.`, R`Giá trị cần tìm là $a=-2$.`, [{ expr: "Matrix([0,0,1]).cross(Matrix([1,2,1]))[0]", expect: "-2" }], R`Tích có hướng $\left[(0;\ 0;\ 1);(1;\ 2;\ 1)\right]=(-2;\ 1;\ 0)$ nên $a=-2$.`),
      luyen(R`Đường $d:\ x=2t,\ y=1+t,\ z=3-t$ cắt $(P):\ x+y+z-6=0$. Tìm $t$ của giao điểm.`, R`Giá trị cần tìm là $t=1$.`, [{ expr: "solve(2*x+1+x+3-x-6, x)[0]", expect: "1" }], R`Thay vào được $2t+4-6=0$, nên $t=1$ và giao điểm là $(2;\ 2;\ 2)$.`),
      luyen(R`Mặt phẳng $(Q)$ chứa $d$ có chỉ phương $(1;\ 0;\ 1)$ và vuông góc với $(P)$ có pháp tuyến $(0;\ 1;\ 0)$. Tìm thành phần thứ ba của pháp tuyến $\left[\vec u,\vec n\right]$.`, R`Thành phần thứ ba bằng $1$.`, [{ expr: "Matrix([1,0,1]).cross(Matrix([0,1,0]))[2]", expect: "1" }], R`Tích có hướng $\left[(1;\ 0;\ 1);(0;\ 1;\ 0)\right]=(-1;\ 0;\ 1)$ nên thành phần thứ ba bằng $1$.`),
    ],
    { topicId: "analytic" }),
]);
