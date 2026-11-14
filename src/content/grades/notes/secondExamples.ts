/**
 * Ví dụ mẫu thứ hai cho các bài THPT: khác ví dụ thứ nhất về dạng hoặc độ khó, để người học
 * thấy cùng một quy tắc dùng trong hoàn cảnh khác. Khóa là "<lớp>/<mã bài>".
 */
import type { GradeExample } from "../types.ts";
import { buoc, vd } from "../types.ts";

const R = String.raw;

export const secondExamples: Record<string, GradeExample> = {
  // Lớp 10
  "10/menh-de-bai": vd(
    R`Xét mệnh đề $Q$: "Mọi số tự nhiên $n$ đều có $n^2\ge n$". Mệnh đề này đúng hay sai? Phát biểu mệnh đề phủ định của $Q$.`,
    [
      buoc(R`Với $n=0$ ta có $0\ge 0$, với $n\ge 1$ thì $n^2=n\cdot n\ge n$. Vậy $Q$ đúng.`, R`Một mệnh đề có chữ "mọi" chỉ đúng khi không có trường hợp nào làm nó sai.`),
      buoc(R`Phủ định của $Q$ là: "Có ít nhất một số tự nhiên $n$ mà $n^2<n$".`, R`Phủ định của "mọi ... đều ..." là "có ít nhất một ... không ...", và dấu $\ge$ đổi thành dấu $<$.`),
    ],
    R`Mệnh đề $Q$ đúng, nên mệnh đề phủ định của nó sai.`,
    [{ expr: "Min(0**2-0, 1**2-1, 2**2-2, 3**2-3)", expect: "0" }],
  ),
  "10/phep-tap": vd(
    R`Cho $A=\{1;2;3;4;5\}$ và $B=\{4;5;6;7\}$. Tìm $A\cap B$, $A\cup B$ và $A\setminus B$.`,
    [
      buoc(R`Phần tử thuộc cả hai tập là $4$ và $5$, nên $A\cap B=\{4;5\}$.`, R`Giao của hai tập gồm các phần tử có mặt đồng thời trong cả hai tập.`),
      buoc(R`Gộp mọi phần tử, mỗi phần tử viết một lần: $A\cup B=\{1;2;3;4;5;6;7\}$.`, R`Hợp gồm phần tử thuộc ít nhất một tập; phần tử chung chỉ viết một lần.`),
      buoc(R`Bỏ khỏi $A$ các phần tử thuộc $B$: $A\setminus B=\{1;2;3\}$.`, R`Hiệu $A\setminus B$ giữ những phần tử của $A$ không nằm trong $B$.`),
    ],
    R`Ta có $n(A\cup B)=5+4-2=7$, đúng với công thức đếm phần tử của hợp.`,
    [{ expr: "5+4-2", expect: "7" }],
  ),
  "10/bpt-hai": vd(
    R`Một xưởng làm $x$ cái bàn và $y$ cái ghế, mỗi bàn cần $2$ giờ và mỗi ghế cần $1$ giờ, tổng thời gian không quá $10$ giờ. Điểm $(3;5)$ có thỏa điều kiện không?`,
    [
      buoc(R`Điều kiện thời gian viết thành bất phương trình $2x+y\le 10$, với $x\ge 0$, $y\ge 0$.`, R`Mỗi bàn tốn hai giờ nên $x$ bàn tốn $2x$ giờ, cộng với $y$ giờ của ghế.`),
      buoc(R`Thay $(3;5)$: $2\cdot 3+5=11>10$, nên điểm này không thuộc miền nghiệm.`, R`Một điểm thuộc miền nghiệm khi thay tọa độ vào thì bất phương trình đúng.`),
    ],
    R`Làm $3$ bàn và $5$ ghế cần $11$ giờ, vượt quá $10$ giờ cho phép.`,
    [{ expr: "2*3+5", expect: "11" }],
  ),
  "10/he-bpt": vd(
    R`Tìm giá trị lớn nhất của $F=3x+2y$ trên miền $x\ge 0$, $y\ge 0$, $x+y\le 5$, $x\le 3$.`,
    [
      buoc(R`Các đỉnh của miền là $(0;0)$, $(3;0)$, $(3;2)$ và $(0;5)$.`, R`Mỗi đỉnh là giao của hai đường biên và phải thỏa mọi bất phương trình còn lại.`),
      buoc(R`Giá trị của $F$ tại bốn đỉnh lần lượt là $0$, $9$, $13$ và $10$.`, R`Biểu thức bậc nhất trên một đa giác đạt giá trị lớn nhất tại một đỉnh của đa giác.`),
    ],
    R`Giá trị lớn nhất của $F$ là $13$, đạt tại $(3;2)$.`,
    [{ expr: "Max(0, 3*3, 3*3+2*2, 2*5)", expect: "13" }],
  ),
  "10/do-thi": vd(
    R`Hàm số $y=-2x^2+8x-3$ đạt giá trị lớn nhất hay nhỏ nhất? Tìm giá trị đó.`,
    [
      buoc(R`Hệ số $a=-2<0$ nên parabol úp xuống và đỉnh là điểm cao nhất.`, R`Dấu của $a$ quyết định parabol mở lên hay úp xuống.`),
      buoc(R`Hoành độ đỉnh $x=-\frac{8}{2\cdot(-2)}=2$, tung độ $y=-8+16-3=5$.`, R`Thay hoành độ đỉnh vào hàm số để được giá trị tại đỉnh.`),
    ],
    R`Hàm số đạt giá trị lớn nhất bằng $5$ tại $x=2$.`,
    [{ expr: "-2*2**2+8*2-3", expect: "5" }],
  ),
  "10/dau-tam-thuc": vd(
    R`Xét dấu $f(x)=-x^2+2x+3$.`,
    [
      buoc(R`Giải $-x^2+2x+3=0$ được hai nghiệm $x=-1$ và $x=3$.`, R`Hai nghiệm chia trục số thành ba khoảng để xét dấu.`),
      buoc(R`Vì $a=-1<0$ nên $f(x)>0$ khi $-1<x<3$, và $f(x)<0$ khi $x<-1$ hoặc $x>3$.`, R`Trong khoảng giữa hai nghiệm, tam thức trái dấu với hệ số $a$.`),
    ],
    R`Tam thức dương trên $(-1;3)$ và âm ở hai khoảng bên ngoài.`,
    [{ expr: "-(1)**2+2*1+3", expect: "4" }],
  ),
  "10/bpt-bac-hai": vd(
    R`Giải bất phương trình $x^2-4\ge 0$.`,
    [
      buoc(R`Tam thức $x^2-4$ có hai nghiệm $x=-2$ và $x=2$, hệ số $a=1>0$.`, R`Hệ số dương nên tam thức dương ở hai khoảng bên ngoài hai nghiệm.`),
      buoc(R`Bất phương trình không chặt nên nhận cả hai nghiệm.`, R`Dấu lớn hơn hoặc bằng cho phép tam thức bằng không tại hai đầu.`),
    ],
    R`Tập nghiệm là $(-\infty;-2]\cup[2;+\infty)$.`,
    [{ expr: "solve(x**2-4, x)", expect: "[-2, 2]" }],
  ),
  "10/quy-ve-bac-hai": vd(
    R`Giải phương trình $\sqrt{2x+3}=x$.`,
    [
      buoc(R`Điều kiện $x\ge 0$. Bình phương hai vế: $2x+3=x^2$, tức $x^2-2x-3=0$.`, R`Vế phải bằng một căn số học nên phải không âm trước khi bình phương.`),
      buoc(R`Phương trình bậc hai có nghiệm $x=3$ và $x=-1$; loại $x=-1$ vì âm.`, R`Bình phương có thể sinh nghiệm thừa, nên đối chiếu lại điều kiện.`),
      buoc(R`Thử lại $x=3$: $\sqrt{9}=3$, đúng.`, R`Thay vào phương trình gốc để chắc chắn nghiệm còn lại không phải nghiệm thừa.`),
    ],
    R`Phương trình có nghiệm duy nhất $x=3$.`,
    [{ expr: "sqrt(2*3+3)", expect: "3" }],
  ),
  "10/gtlg": vd(
    R`Biết $\sin\alpha=\frac{3}{5}$ với $90^\circ<\alpha<180^\circ$. Tính $\cos\alpha$ và $\tan\alpha$.`,
    [
      buoc(R`Từ $\sin^2\alpha+\cos^2\alpha=1$ suy ra $\cos^2\alpha=\frac{16}{25}$.`, R`Hằng đẳng thức cơ bản đúng với mọi góc.`),
      buoc(R`Góc tù có côsin âm, nên $\cos\alpha=-\frac{4}{5}$ và $\tan\alpha=-\frac{3}{4}$.`, R`Điểm ứng với góc tù nằm bên trái trục tung, nên hoành độ âm.`),
    ],
    R`Ta có $\cos\alpha=-\frac{4}{5}$ và $\tan\alpha=-\frac{3}{4}$.`,
    [{ expr: "-sqrt(1-Rational(9,25))", expect: "Rational(-4,5)" }],
  ),
  "10/dinh-li-sin": vd(
    R`Tam giác $ABC$ có $A=45^\circ$, $B=60^\circ$ và $a=10$. Tính cạnh $b$.`,
    [
      buoc(R`Theo định lí sin, $\frac{a}{\sin A}=\frac{b}{\sin B}$.`, R`Mỗi cạnh tỉ lệ với sin của góc đối diện cạnh đó.`),
      buoc(R`Từ đó suy ra $b=\frac{10\sin 60^\circ}{\sin 45^\circ}=5\sqrt6$.`, R`Thay giá trị $\sin 60^\circ$ và $\sin 45^\circ$ rồi rút gọn căn.`),
    ],
    R`Cạnh $b=5\sqrt6\approx 12{,}25$.`,
    [{ expr: "10*sin(pi/3)/sin(pi/4)", expect: "5*sqrt(6)" }],
  ),
  "10/giai-tam-giac": vd(
    R`Tam giác có ba cạnh $a=7$, $b=5$, $c=8$. Tính góc $A$.`,
    [
      buoc(R`Theo định lí côsin, $\cos A=\frac{b^2+c^2-a^2}{2bc}=\frac{25+64-49}{80}=\frac{1}{2}$.`, R`Biết đủ ba cạnh thì định lí côsin cho côsin của từng góc.`),
      buoc(R`Góc trong tam giác có côsin bằng $\frac{1}{2}$ là $60^\circ$.`, R`Côsin xác định duy nhất một góc trong khoảng từ $0^\circ$ đến $180^\circ$.`),
    ],
    R`Góc $A=60^\circ$.`,
    [{ expr: "Rational(25+64-49,80)", expect: "Rational(1,2)" }],
  ),
  "10/tong-hieu": vd(
    R`Cho $A(1;2)$ và $B(5;-2)$. Tìm tọa độ trung điểm $M$ của $AB$ và vectơ $\overrightarrow{AB}$.`,
    [
      buoc(R`Vectơ $\overrightarrow{AB}=(5-1;-2-2)=(4;-4)$.`, R`Tọa độ vectơ bằng tọa độ điểm cuối trừ tọa độ điểm đầu.`),
      buoc(R`Trung điểm $M=\left(\frac{1+5}{2};\frac{2+(-2)}{2}\right)=(3;0)$.`, R`Trung điểm có tọa độ là trung bình cộng tọa độ hai đầu mút.`),
    ],
    R`Vectơ $\overrightarrow{AB}=(4;-4)$ và trung điểm $M(3;0)$.`,
    [{ expr: "Rational(1+5,2)", expect: "3" }],
  ),
  "10/tich-vh": vd(
    R`Tính góc giữa hai vectơ $\vec u=(1;1)$ và $\vec v=(0;2)$.`,
    [
      buoc(R`Tích vô hướng $\vec u\cdot\vec v=0+2=2$; độ dài $|\vec u|=\sqrt2$, $|\vec v|=2$.`, R`Côsin của góc cần tích vô hướng và độ dài của hai vectơ.`),
      buoc(R`Do đó $\cos(\vec u,\vec v)=\frac{2}{2\sqrt2}=\frac{\sqrt2}{2}$.`, R`Chia tích vô hướng cho tích hai độ dài để được côsin của góc.`),
    ],
    R`Góc giữa hai vectơ bằng $45^\circ$.`,
    [{ expr: "2/(sqrt(2)*2)", expect: "sqrt(2)/2" }],
  ),
  "10/duong-thang": vd(
    R`Viết phương trình đường thẳng đi qua $A(1;2)$ và $B(3;6)$.`,
    [
      buoc(R`Vectơ chỉ phương $\overrightarrow{AB}=(2;4)$, nên một pháp tuyến là $(2;-1)$.`, R`Pháp tuyến vuông góc với chỉ phương, đổi chỗ hai tọa độ và đổi dấu một tọa độ.`),
      buoc(R`Phương trình qua $A$: $2(x-1)-(y-2)=0$, tức $2x-y=0$.`, R`Đường thẳng qua một điểm với pháp tuyến cho trước có dạng $a(x-x_0)+b(y-y_0)=0$.`),
      buoc(R`Kiểm tra $B$: $2\cdot 3-6=0$, đúng.`, R`Thay điểm thứ hai vào để chắc chắn phương trình đi qua cả hai điểm.`),
    ],
    R`Phương trình đường thẳng là $2x-y=0$.`,
    [{ expr: "2*3-6", expect: "0" }],
  ),
  "10/duong-tron": vd(
    R`Tìm tâm và bán kính của đường tròn $x^2+y^2-4x+6y-3=0$.`,
    [
      buoc(R`Thêm bớt để tạo bình phương: $(x-2)^2+(y+3)^2=3+4+9=16$.`, R`Nhóm theo từng biến rồi cộng thêm bình phương nửa hệ số vào hai vế.`),
      buoc(R`So với dạng $(x-a)^2+(y-b)^2=R^2$: tâm $(2;-3)$, $R=4$.`, R`Dấu trong ngoặc ngược với dấu của tọa độ tâm.`),
    ],
    R`Đường tròn có tâm $I(2;-3)$ và bán kính $4$.`,
    [{ expr: "sqrt(3+4+9)", expect: "4" }],
  ),
  "10/ba-conic": vd(
    R`Tìm tiêu điểm của elip $\frac{x^2}{25}+\frac{y^2}{9}=1$.`,
    [
      buoc(R`Ta có $a=5$, $b=3$, và $c^2=a^2-b^2=16$, nên $c=4$.`, R`Với elip, khoảng cách từ tâm đến tiêu điểm thỏa $c^2=a^2-b^2$.`),
      buoc(R`Hai tiêu điểm nằm trên trục lớn là trục hoành: $F_1(-4;0)$ và $F_2(4;0)$.`, R`Trục lớn là trục ứng với mẫu lớn hơn trong phương trình chính tắc.`),
    ],
    R`Hai tiêu điểm là $F_1(-4;0)$ và $F_2(4;0)$.`,
    [{ expr: "sqrt(25-9)", expect: "4" }],
  ),
  "10/quy-tac": vd(
    R`Một bạn có $3$ áo và $4$ quần. Có bao nhiêu cách chọn một bộ gồm một áo và một quần?`,
    [
      buoc(R`Việc chọn gồm hai bước nối tiếp: chọn áo rồi chọn quần.`, R`Các bước nối tiếp, bước nào cũng phải làm, thì dùng quy tắc nhân.`),
      buoc(R`Số cách là $3\cdot 4=12$.`, R`Mỗi chiếc áo ghép được với đủ bốn chiếc quần.`),
    ],
    R`Có $12$ cách chọn một bộ quần áo.`,
    [{ expr: "3*4", expect: "12" }],
  ),
  "10/hoan-vi": vd(
    R`Có bao nhiêu cách chọn ra lớp trưởng, lớp phó và thủ quỹ từ $10$ bạn, mỗi bạn giữ nhiều nhất một chức?`,
    [
      buoc(R`Ba chức vụ khác nhau nên thứ tự chọn có ý nghĩa: đây là chỉnh hợp chập $3$ của $10$.`, R`Đổi vai trò giữa các bạn tạo ra cách chọn khác, nên phải kể thứ tự.`),
      buoc(R`Số cách là $A_{10}^3=10\cdot 9\cdot 8=720$.`, R`Chức thứ nhất có mười cách, chức thứ hai còn chín cách, chức thứ ba còn tám cách.`),
    ],
    R`Có $720$ cách chọn.`,
    [{ expr: "factorial(10)/factorial(7)", expect: "720" }],
  ),
  "10/to-hop-bai": vd(
    R`Từ $6$ bạn nam và $4$ bạn nữ, chọn một nhóm $3$ người gồm $2$ nam và $1$ nữ. Có bao nhiêu cách?`,
    [
      buoc(R`Chọn $2$ nam trong $6$ có $C_6^2=15$ cách; chọn $1$ nữ trong $4$ có $4$ cách.`, R`Nhóm không phân biệt vai trò nên dùng tổ hợp cho từng phần.`),
      buoc(R`Hai bước nối tiếp nên nhân: $15\cdot 4=60$.`, R`Mỗi cặp nam ghép được với bất kỳ bạn nữ nào.`),
    ],
    R`Có $60$ cách chọn nhóm.`,
    [{ expr: "binomial(6,2)*4", expect: "60" }],
  ),
  "10/nhi-thuc": vd(
    R`Khai triển $(x-1)^4$.`,
    [
      buoc(R`Các hệ số nhị thức của bậc $4$ là $1;\ 4;\ 6;\ 4;\ 1$.`, R`Hàng thứ tư của tam giác Pascal cho các số $C_4^k$.`),
      buoc(R`Số hạng thứ $k$ mang dấu của $(-1)^k$: $x^4-4x^3+6x^2-4x+1$.`, R`Lũy thừa lẻ của $-1$ là âm, lũy thừa chẵn là dương.`),
    ],
    R`Ta có $(x-1)^4=x^4-4x^3+6x^2-4x+1$.`,
    [{ expr: "expand((x-1)**4)", expect: "x**4-4*x**3+6*x**2-4*x+1" }],
  ),
  "10/sai-so": vd(
    R`Đo chiều dài một cây cầu được $152$ m với sai số tuyệt đối không quá $0{,}5$ m. Sai số tương đối nhiều nhất là bao nhiêu phần trăm?`,
    [
      buoc(R`Sai số tương đối là $\frac{0{,}5}{152}\approx 0{,}0033$.`, R`Sai số tương đối so sai số tuyệt đối với độ lớn của số đo.`),
      buoc(R`Đổi ra phần trăm được khoảng $0{,}33\%$.`, R`Nhân với một trăm để đổi một tỉ số ra phần trăm.`),
    ],
    R`Sai số tương đối không quá khoảng $0{,}33\%$.`,
    [{ expr: "Rational(1,2)/152*100", expect: "Rational(25,76)" }],
  ),
  "10/trung-vi": vd(
    R`Tìm trung vị và mốt của dãy $3;\ 7;\ 7;\ 2;\ 9;\ 7;\ 4$.`,
    [
      buoc(R`Sắp xếp tăng: $2;\ 3;\ 4;\ 7;\ 7;\ 7;\ 9$. Dãy có $7$ số, số thứ tư là $7$.`, R`Trung vị của dãy lẻ là số đứng chính giữa sau khi sắp xếp.`),
      buoc(R`Giá trị $7$ xuất hiện ba lần, nhiều nhất.`, R`Mốt là giá trị có tần số lớn nhất trong mẫu.`),
    ],
    R`Trung vị bằng $7$ và mốt bằng $7$.`,
    [{ expr: "Max(2,3,4,7)", expect: "7" }],
  ),
  "10/phuong-sai": vd(
    R`Điểm của hai bạn: An $6;\ 8;\ 10$, Bình $8;\ 8;\ 8$. Ai học đều hơn?`,
    [
      buoc(R`Hai bạn cùng có điểm trung bình $8$.`, R`Trung bình bằng nhau thì phải nhìn độ phân tán để so mức độ đều.`),
      buoc(R`Phương sai của An là $\frac{4+0+4}{3}=\frac{8}{3}$, của Bình là $0$.`, R`Phương sai đo các điểm lệch khỏi trung bình bao xa.`),
    ],
    R`Bình học đều hơn vì có phương sai nhỏ hơn.`,
    [{ expr: "Rational(4+0+4,3)", expect: "Rational(8,3)" }],
  ),
  "10/liet-ke": vd(
    R`Gieo một con xúc xắc cân đối hai lần. Tính xác suất tổng số chấm bằng $9$.`,
    [
      buoc(R`Không gian mẫu có $6\cdot 6=36$ kết quả đồng khả năng.`, R`Mỗi lần gieo có sáu kết quả, hai lần gieo ghép thành các cặp có thứ tự.`),
      buoc(R`Các cặp có tổng $9$: $(3;6)$, $(4;5)$, $(5;4)$, $(6;3)$, tức $4$ cặp.`, R`Liệt kê theo kết quả lần đầu để không bỏ sót cặp nào.`),
    ],
    R`Xác suất bằng $\frac{4}{36}=\frac{1}{9}$.`,
    [{ expr: "Rational(4,36)", expect: "Rational(1,9)" }],
  ),
  "10/bien-co-doi": vd(
    R`Tung ba đồng xu cân đối. Tính xác suất có ít nhất một mặt ngửa.`,
    [
      buoc(R`Biến cố đối là cả ba đồng đều sấp, có xác suất $\frac{1}{8}$.`, R`Câu hỏi "ít nhất một" thường tính nhanh qua biến cố đối "không có cái nào".`),
      buoc(R`Xác suất cần tìm là $1-\frac{1}{8}=\frac{7}{8}$.`, R`Xác suất của một biến cố và biến cố đối của nó có tổng bằng một.`),
    ],
    R`Xác suất có ít nhất một mặt ngửa là $\frac{7}{8}$.`,
    [{ expr: "1-Rational(1,8)", expect: "Rational(7,8)" }],
  ),
  // Lớp 11
  "11/goc-lg": vd(
    R`Đổi $135^\circ$ sang rađian và tính $\sin 135^\circ$, $\cos 135^\circ$.`,
    [
      buoc(R`Ta có $135^\circ=135\cdot\frac{\pi}{180}=\frac{3\pi}{4}$.`, R`Một độ bằng $\frac{\pi}{180}$ rađian, nên nhân số độ với tỉ số này.`),
      buoc(R`Góc $135^\circ$ bù với $45^\circ$, nên $\sin 135^\circ=\frac{\sqrt2}{2}$ và $\cos 135^\circ=-\frac{\sqrt2}{2}$.`, R`Hai góc bù nhau có cùng sin và có côsin đối nhau.`),
    ],
    R`Góc đó là $\frac{3\pi}{4}$ rađian, có sin bằng $\frac{\sqrt2}{2}$ và côsin bằng $-\frac{\sqrt2}{2}$.`,
    [{ expr: "cos(3*pi/4)", expect: "-sqrt(2)/2" }],
  ),
  "11/cong-thuc": vd(
    R`Biết $\cos a=\frac{3}{5}$ với $0<a<\frac{\pi}{2}$. Tính $\sin 2a$ và $\cos 2a$.`,
    [
      buoc(R`Góc nhọn có sin dương, nên $\sin a=\sqrt{1-\frac{9}{25}}=\frac{4}{5}$.`, R`Hằng đẳng thức cơ bản cho sin khi biết côsin, dấu chọn theo góc phần tư.`),
      buoc(R`Áp dụng công thức nhân đôi: $\sin 2a=2\sin a\cos a=\frac{24}{25}$ và $\cos 2a=2\cos^2 a-1=-\frac{7}{25}$.`, R`Công thức nhân đôi là công thức cộng với hai góc bằng nhau.`),
    ],
    R`Ta có $\sin 2a=\frac{24}{25}$ và $\cos 2a=-\frac{7}{25}$.`,
    [{ expr: "2*Rational(9,25)-1", expect: "Rational(-7,25)" }],
  ),
  "11/do-thi-lg": vd(
    R`Tìm chu kì, giá trị lớn nhất và nhỏ nhất của $y=3\cos 2x+1$.`,
    [
      buoc(R`Hệ số $2$ nhân với $x$ làm chu kì còn $\frac{2\pi}{2}=\pi$.`, R`Hàm $\cos kx$ lặp lại sau mỗi đoạn dài $\frac{2\pi}{|k|}$.`),
      buoc(R`Vì $-1\le\cos 2x\le 1$ nên $-2\le 3\cos 2x+1\le 4$.`, R`Nhân bất đẳng thức với số dương $3$ rồi cộng thêm $1$ vào cả ba vế.`),
    ],
    R`Chu kì là $\pi$, giá trị lớn nhất bằng $4$ và giá trị nhỏ nhất bằng $-2$.`,
    [{ expr: "3*1+1", expect: "4" }],
  ),
  "11/pt-lg": vd(
    R`Giải phương trình $\cos x=-\frac{1}{2}$.`,
    [
      buoc(R`Ta có $\cos\frac{2\pi}{3}=-\frac{1}{2}$, nên chọn $\alpha=\frac{2\pi}{3}$.`, R`Tìm một góc quen thuộc có côsin bằng giá trị đã cho.`),
      buoc(R`Nghiệm tổng quát: $x=\pm\frac{2\pi}{3}+k2\pi$ với $k\in\mathbb{Z}$.`, R`Hai điểm trên đường tròn có cùng hoành độ đối xứng nhau qua trục hoành.`),
    ],
    R`Phương trình có nghiệm $x=\pm\frac{2\pi}{3}+k2\pi$, $k\in\mathbb{Z}$.`,
    [{ expr: "cos(2*pi/3)", expect: "Rational(-1,2)" }],
  ),
  "11/cap-so": vd(
    R`Cấp số nhân có $u_1=3$ và $q=2$. Tính $u_6$ và tổng $6$ số hạng đầu.`,
    [
      buoc(R`Số hạng thứ sáu: $u_6=u_1q^5=3\cdot 32=96$.`, R`Từ số hạng đầu đến số hạng thứ sáu có năm lần nhân với công bội.`),
      buoc(R`Tổng: $S_6=u_1\frac{q^6-1}{q-1}=3\cdot 63=189$.`, R`Công thức tổng cấp số nhân dùng được vì công bội khác một.`),
    ],
    R`Ta có $u_6=96$ và $S_6=189$.`,
    [{ expr: "3*(2**6-1)/(2-1)", expect: "189" }],
  ),
  "11/don-dieu": vd(
    R`Xét tính tăng, giảm của dãy $u_n=\frac{n+1}{n}$.`,
    [
      buoc(R`Viết $u_n=1+\frac{1}{n}$, rồi tính $u_{n+1}-u_n=\frac{1}{n+1}-\frac{1}{n}=-\frac{1}{n(n+1)}$.`, R`Xét dấu hiệu của hai số hạng liên tiếp để biết dãy tăng hay giảm.`),
      buoc(R`Hiệu luôn âm, và $1<u_n\le 2$ với mọi $n$.`, R`Phân số $\frac{1}{n}$ dương và không vượt quá một nên dãy bị chặn cả hai phía.`),
    ],
    R`Dãy giảm và bị chặn: $1<u_n\le 2$.`,
    [{ expr: "Rational(1,2)-Rational(1,1)", expect: "Rational(-1,2)" }],
  ),
  "11/gh-day": vd(
    R`Tính $\lim\frac{2n^2+3}{n^2-n}$.`,
    [
      buoc(R`Chia cả tử và mẫu cho $n^2$: được $\frac{2+\frac{3}{n^2}}{1-\frac{1}{n}}$.`, R`Chia cho lũy thừa cao nhất làm lộ ra các số hạng tiến tới không.`),
      buoc(R`Khi $n\to+\infty$, hai phân số nhỏ tiến tới $0$, nên giới hạn bằng $\frac{2}{1}=2$.`, R`Số chia cho một lũy thừa của $n$ đang tăng mãi thì tiến tới không.`),
    ],
    R`Giới hạn bằng $2$.`,
    [{ expr: "limit((2*n**2+3)/(n**2-n), n, oo)", expect: "2" }],
  ),
  "11/gh-ham": vd(
    R`Tính $\lim_{x\to 1^+}\frac{1}{x-1}$ và $\lim_{x\to 1^-}\frac{1}{x-1}$.`,
    [
      buoc(R`Khi $x$ tiến tới $1$ từ bên phải thì $x-1$ là số dương rất nhỏ, nên phân số tăng tới $+\infty$.`, R`Chia một cho số dương càng nhỏ thì thương càng lớn.`),
      buoc(R`Khi $x$ tiến tới $1$ từ bên trái thì $x-1$ âm và rất nhỏ, nên phân số giảm tới $-\infty$.`, R`Mẫu âm làm thương mang dấu âm.`),
    ],
    R`Hai giới hạn một bên khác nhau, nên không có giới hạn tại $x=1$.`,
    [{ expr: "limit(1/(x-1), x, 1, '+')", expect: "oo" }],
  ),
  "11/lien-tuc": vd(
    R`Tìm $m$ để hàm $f(x)=\frac{x^2-4}{x-2}$ khi $x\neq 2$ và $f(2)=m$ liên tục tại $x=2$.`,
    [
      buoc(R`Với $x\neq 2$, $f(x)=x+2$, nên giới hạn tại $2$ bằng $4$.`, R`Rút gọn nhân tử chung trước khi tính giới hạn dạng không trên không.`),
      buoc(R`Liên tục tại $2$ cần giới hạn bằng giá trị: $m=4$.`, R`Định nghĩa liên tục đòi giới hạn tồn tại và bằng đúng giá trị của hàm tại điểm đó.`),
    ],
    R`Hàm số liên tục tại $x=2$ khi $m=4$.`,
    [{ expr: "limit((x**2-4)/(x-2), x, 2)", expect: "4" }],
  ),
  "11/phep-tinh-log": vd(
    R`Tính $\log_2 12-\log_2 3$ và $\log_3 5\cdot\log_5 9$.`,
    [
      buoc(R`Ta có $\log_2 12-\log_2 3=\log_2 4=2$.`, R`Hiệu hai logarit cùng cơ số bằng logarit của thương.`),
      buoc(R`Đổi cơ số: $\log_3 5\cdot\log_5 9=\log_3 9=2$.`, R`Tích $\log_a b\cdot\log_b c$ bằng $\log_a c$ theo công thức đổi cơ số.`),
    ],
    R`Cả hai biểu thức đều bằng $2$.`,
    [{ expr: "log(12,2)-log(3,2)", expect: "2" }],
  ),
  "11/ham-mu": vd(
    R`So sánh $0{,}5^{2}$ và $0{,}5^{3}$, rồi so sánh $\log_2 5$ và $\log_2 7$.`,
    [
      buoc(R`Cơ số $0{,}5<1$ nên hàm $0{,}5^x$ nghịch biến, do đó $0{,}5^2>0{,}5^3$.`, R`Hàm mũ có cơ số nhỏ hơn một thì số mũ lớn hơn cho giá trị nhỏ hơn.`),
      buoc(R`Cơ số $2>1$ nên hàm $\log_2 x$ đồng biến, do đó $\log_2 5<\log_2 7$.`, R`Hàm logarit cơ số lớn hơn một giữ nguyên thứ tự của các số dương.`),
    ],
    R`Ta có $0{,}5^2>0{,}5^3$ và $\log_2 5<\log_2 7$.`,
    [{ expr: "Rational(1,2)**2-Rational(1,2)**3", expect: "Rational(1,8)" }],
  ),
  "11/pt-log": vd(
    R`Giải bất phương trình $\log_3(x-1)<2$.`,
    [
      buoc(R`Điều kiện $x-1>0$, tức $x>1$.`, R`Biểu thức trong logarit phải dương.`),
      buoc(R`Cơ số $3>1$ nên giữ chiều: $x-1<9$, tức $x<10$.`, R`Hàm logarit cơ số lớn hơn một đồng biến nên bỏ logarit hai vế không đổi chiều.`),
    ],
    R`Tập nghiệm là $(1;10)$.`,
    [{ expr: "3**2+1", expect: "10" }],
  ),
  "11/dinh-nghia-dh": vd(
    R`Dùng định nghĩa tính đạo hàm của $f(x)=\frac{1}{x}$ tại $x=1$.`,
    [
      buoc(R`Thương sai phân $\frac{f(1+h)-f(1)}{h}=\frac{\frac{1}{1+h}-1}{h}=-\frac{1}{1+h}$.`, R`Quy đồng tử số rồi rút gọn $h$ trước khi cho $h$ tiến tới không.`),
      buoc(R`Cho $h\to 0$ được $-1$.`, R`Biểu thức đã rút gọn liên tục tại $h=0$ nên thay trực tiếp.`),
    ],
    R`Đạo hàm của $\frac{1}{x}$ tại $x=1$ bằng $-1$.`,
    [{ expr: "limit((1/(1+h)-1)/h, h, 0)", expect: "-1" }],
  ),
  "11/tich-thuong": vd(
    R`Tính đạo hàm của $y=\frac{2x+1}{x-1}$.`,
    [
      buoc(R`Theo quy tắc thương: $y'=\frac{2(x-1)-(2x+1)\cdot 1}{(x-1)^2}$.`, R`Đạo hàm của thương là đạo hàm tử nhân mẫu trừ tử nhân đạo hàm mẫu, chia bình phương mẫu.`),
      buoc(R`Rút gọn tử số: $2x-2-2x-1=-3$.`, R`Các số hạng chứa $x$ triệt tiêu, chỉ còn hằng số.`),
    ],
    R`Đạo hàm là $y'=-\frac{3}{(x-1)^2}$, luôn âm trên tập xác định.`,
    [{ expr: "simplify(diff((2*x+1)/(x-1), x))", expect: "-3/(x-1)**2" }],
  ),
  "11/dh-lg-mu": vd(
    R`Tính đạo hàm của $y=e^{2x}\sin x$.`,
    [
      buoc(R`Đạo hàm của $e^{2x}$ là $2e^{2x}$, của $\sin x$ là $\cos x$.`, R`Đạo hàm hàm hợp $e^{u}$ bằng $u'e^{u}$ với $u=2x$.`),
      buoc(R`Theo quy tắc tích: $y'=2e^{2x}\sin x+e^{2x}\cos x$.`, R`Đạo hàm của tích là đạo hàm thừa số đầu nhân thừa số sau, cộng thừa số đầu nhân đạo hàm thừa số sau.`),
    ],
    R`Ta có $y'=e^{2x}(2\sin x+\cos x)$.`,
    [{ expr: "diff(exp(2*x)*sin(x), x)", expect: "exp(2*x)*(2*sin(x)+cos(x))" }],
  ),
  "11/cap-hai": vd(
    R`Cho $f(x)=x^3-3x^2$. Tính $f''(x)$ và viết tiếp tuyến của đồ thị tại $x=1$.`,
    [
      buoc(R`Ta có $f'(x)=3x^2-6x$ và $f''(x)=6x-6$.`, R`Đạo hàm cấp hai là đạo hàm của đạo hàm cấp một.`),
      buoc(R`Tại $x=1$: $f(1)=-2$ và $f'(1)=-3$, nên tiếp tuyến là $y=-3(x-1)-2=-3x+1$.`, R`Tiếp tuyến đi qua điểm của đồ thị và có hệ số góc bằng đạo hàm tại đó.`),
    ],
    R`Đạo hàm cấp hai là $6x-6$, tiếp tuyến tại $x=1$ là $y=-3x+1$.`,
    [{ expr: "diff(x**3-3*x**2, x).subs(x,1)", expect: "-3" }],
  ),
  "11/song-song": vd(
    R`Hình chóp $S.ABCD$ có đáy là hình bình hành. Gọi $M$ là trung điểm $SA$. Chứng minh $SC$ song song với mặt phẳng $(MBD)$.`,
    [
      buoc(R`Gọi $O$ là giao điểm hai đường chéo của đáy; $O$ là trung điểm của $AC$.`, R`Hai đường chéo của hình bình hành cắt nhau tại trung điểm của mỗi đường.`),
      buoc(R`Trong tam giác $SAC$, đoạn $MO$ nối trung điểm hai cạnh nên $MO$ song song với $SC$.`, R`Đường trung bình của tam giác song song với cạnh thứ ba.`),
      buoc(R`Đường $MO$ nằm trong mặt phẳng $(MBD)$, còn $SC$ không nằm trong mặt phẳng đó.`, R`Đường thẳng song song với một đường của mặt phẳng và nằm ngoài mặt phẳng thì song song với mặt phẳng.`),
    ],
    R`Do đó $SC$ song song với mặt phẳng $(MBD)$.`,
    [{ expr: "Rational(1,2)*2", expect: "1" }],
  ),
  "11/vuong-goc": vd(
    R`Hình chóp $S.ABCD$ có đáy là hình vuông và $SA$ vuông góc với đáy. Chứng minh $BC$ vuông góc với mặt phẳng $(SAB)$.`,
    [
      buoc(R`Đáy là hình vuông nên $BC$ vuông góc với $AB$.`, R`Hai cạnh kề của hình vuông vuông góc với nhau.`),
      buoc(R`Vì $SA$ vuông góc với đáy nên $SA$ vuông góc với $BC$.`, R`Đường thẳng vuông góc với mặt phẳng thì vuông góc với mọi đường nằm trong mặt phẳng đó.`),
      buoc(R`Hai đường $AB$ và $SA$ cắt nhau tại $A$ và cùng nằm trong $(SAB)$.`, R`Vuông góc với hai đường cắt nhau của một mặt phẳng là đủ để vuông góc với cả mặt phẳng.`),
    ],
    R`Vậy $BC$ vuông góc với mặt phẳng $(SAB)$.`,
    [{ expr: "1*0+0*1", expect: "0" }],
  ),
  "11/goc-kc": vd(
    R`Hình lập phương $ABCD.A'B'C'D'$ cạnh $a$. Tính khoảng cách từ $A$ đến mặt phẳng $(A'B'C'D')$ và góc giữa $AC'$ với mặt đáy $(ABCD)$.`,
    [
      buoc(R`Đoạn $AA'$ vuông góc với mặt phẳng trên, nên khoảng cách bằng $AA'=a$.`, R`Khoảng cách từ một điểm đến mặt phẳng là độ dài đoạn vuông góc hạ từ điểm đó.`),
      buoc(R`Hình chiếu của $AC'$ lên đáy là $AC=a\sqrt2$, và $CC'=a$, nên $\tan\varphi=\frac{a}{a\sqrt2}=\frac{\sqrt2}{2}$.`, R`Góc giữa đường thẳng và mặt phẳng là góc giữa đường đó và hình chiếu của nó lên mặt phẳng.`),
    ],
    R`Khoảng cách bằng $a$, và góc $\varphi$ thỏa $\tan\varphi=\frac{\sqrt2}{2}$, khoảng $35{,}3^\circ$.`,
    [{ expr: "1/sqrt(2)", expect: "sqrt(2)/2" }],
  ),
  "11/the-tich-11": vd(
    R`Hình chóp $S.ABC$ có đáy là tam giác đều cạnh $6$ và chiều cao $SH=4$. Tính thể tích.`,
    [
      buoc(R`Diện tích đáy tam giác đều cạnh $6$ là $\frac{\sqrt3}{4}\cdot 36=9\sqrt3$.`, R`Tam giác đều cạnh $a$ có diện tích $\frac{\sqrt3}{4}a^2$.`),
      buoc(R`Thể tích $V=\frac{1}{3}\cdot 9\sqrt3\cdot 4=12\sqrt3$.`, R`Thể tích hình chóp bằng một phần ba diện tích đáy nhân chiều cao.`),
    ],
    R`Thể tích hình chóp bằng $12\sqrt3$.`,
    [{ expr: "Rational(1,3)*sqrt(3)/4*36*4", expect: "12*sqrt(3)" }],
  ),
  "11/tb-nhom": vd(
    R`Thời gian tự học của $20$ bạn: nhóm $[0;2)$ có $4$ bạn, $[2;4)$ có $10$ bạn, $[4;6)$ có $6$ bạn. Tính số trung bình.`,
    [
      buoc(R`Giá trị đại diện của ba nhóm là $1$, $3$ và $5$.`, R`Giá trị đại diện là trung điểm của mỗi nhóm.`),
      buoc(R`Số trung bình $\bar x=\frac{4\cdot 1+10\cdot 3+6\cdot 5}{20}=\frac{64}{20}=3{,}2$.`, R`Mỗi giá trị đại diện được nhân với tần số của nhóm rồi chia cho cỡ mẫu.`),
    ],
    R`Thời gian tự học trung bình khoảng $3{,}2$ giờ.`,
    [{ expr: "Rational(4*1+10*3+6*5,20)", expect: "Rational(16,5)" }],
  ),
  "11/tu-phan-vi-11": vd(
    R`Thời gian tự học của $20$ bạn: nhóm $[0;2)$ có $4$ bạn, $[2;4)$ có $10$ bạn, $[4;6)$ có $6$ bạn. Nhóm nào chứa mốt, và nhóm nào chứa tứ phân vị thứ ba?`,
    [
      buoc(R`Nhóm $[2;4)$ có tần số lớn nhất là $10$, nên chứa mốt.`, R`Nhóm chứa mốt là nhóm có tần số lớn nhất.`),
      buoc(R`Ba phần tư cỡ mẫu là $15$. Tần số tích lũy là $4$, $14$, $20$, nên lần đầu đạt $15$ ở nhóm $[4;6)$.`, R`So mốc với tần số tích lũy, không so với tần số của từng nhóm.`),
    ],
    R`Mốt thuộc nhóm $[2;4)$ và tứ phân vị thứ ba thuộc nhóm $[4;6)$.`,
    [{ expr: "Rational(3,4)*20", expect: "15" }],
  ),
  "11/hop-giao": vd(
    R`Trong lớp, $60\%$ học sinh thích Toán, $50\%$ thích Văn, $30\%$ thích cả hai. Chọn ngẫu nhiên một bạn. Tính xác suất bạn đó thích ít nhất một trong hai môn.`,
    [
      buoc(R`Gọi $T$ là thích Toán, $V$ là thích Văn. Biến cố cần tìm là $T\cup V$.`, R`Thích ít nhất một môn nghĩa là thích Toán hoặc thích Văn.`),
      buoc(R`Ta có $P(T\cup V)=0{,}6+0{,}5-0{,}3=0{,}8$.`, R`Phần thích cả hai bị cộng hai lần nên phải trừ đi một lần.`),
    ],
    R`Xác suất bằng $0{,}8$.`,
    [{ expr: "Rational(6,10)+Rational(5,10)-Rational(3,10)", expect: "Rational(4,5)" }],
  ),
  "11/quy-tac-cong": vd(
    R`Rút ngẫu nhiên một lá từ bộ bài tây $52$ lá. Tính xác suất được lá cơ hoặc lá át.`,
    [
      buoc(R`Có $13$ lá cơ và $4$ lá át, trong đó có $1$ lá vừa là cơ vừa là át.`, R`Hai biến cố có phần chung nên không xung khắc.`),
      buoc(R`Xác suất là $\frac{13}{52}+\frac{4}{52}-\frac{1}{52}=\frac{16}{52}=\frac{4}{13}$.`, R`Quy tắc cộng tổng quát trừ đi xác suất của phần chung.`),
    ],
    R`Xác suất được lá cơ hoặc lá át là $\frac{4}{13}$.`,
    [{ expr: "Rational(13+4-1,52)", expect: "Rational(4,13)" }],
  ),
  "11/doc-lap": vd(
    R`Hai xạ thủ bắn độc lập vào một bia, xác suất trúng lần lượt là $0{,}8$ và $0{,}7$. Tính xác suất bia bị trúng ít nhất một phát.`,
    [
      buoc(R`Xác suất cả hai cùng trượt là $0{,}2\cdot 0{,}3=0{,}06$.`, R`Hai lần bắn độc lập nên xác suất cùng xảy ra bằng tích các xác suất.`),
      buoc(R`Xác suất trúng ít nhất một phát là $1-0{,}06=0{,}94$.`, R`Trúng ít nhất một phát là biến cố đối của cả hai cùng trượt.`),
    ],
    R`Xác suất bia bị trúng là $0{,}94$.`,
    [{ expr: "1-Rational(2,10)*Rational(3,10)", expect: "Rational(47,50)" }],
  ),
  // Lớp 12
  "12/cuc-tri": vd(
    R`Tìm các điểm cực trị của $f(x)=x^3-3x^2+2$.`,
    [
      buoc(R`Đạo hàm $f'(x)=3x^2-6x=3x(x-2)$ bằng $0$ tại $x=0$ và $x=2$.`, R`Điểm cực trị của hàm có đạo hàm phải là nghiệm của đạo hàm.`),
      buoc(R`Đạo hàm dương trước $0$, âm giữa $0$ và $2$, dương sau $2$.`, R`Dấu của tam thức bậc hai: cùng dấu hệ số ở ngoài hai nghiệm, trái dấu ở giữa.`),
      buoc(R`Vậy $x=0$ là điểm cực đại với $f(0)=2$, và $x=2$ là điểm cực tiểu với $f(2)=-2$.`, R`Đạo hàm đổi từ dương sang âm cho cực đại, từ âm sang dương cho cực tiểu.`),
    ],
    R`Hàm đạt cực đại $2$ tại $x=0$ và cực tiểu $-2$ tại $x=2$.`,
    [{ expr: "(x**3-3*x**2+2).subs(x,2)", expect: "-2" }],
  ),
  "12/gtln": vd(
    R`Tìm giá trị lớn nhất và nhỏ nhất của $f(x)=x^3-3x$ trên đoạn $[0;2]$.`,
    [
      buoc(R`Đạo hàm $f'(x)=3x^2-3$ bằng $0$ tại $x=1$ (nghiệm $x=-1$ nằm ngoài đoạn).`, R`Chỉ giữ những điểm dừng nằm trong đoạn đang xét.`),
      buoc(R`So sánh $f(0)=0$, $f(1)=-2$, $f(2)=2$.`, R`Giá trị lớn nhất và nhỏ nhất trên đoạn nằm ở điểm dừng hoặc ở hai đầu mút.`),
    ],
    R`Giá trị lớn nhất bằng $2$ tại $x=2$, giá trị nhỏ nhất bằng $-2$ tại $x=1$.`,
    [{ expr: "Max(0, 1-3, 8-6)", expect: "2" }],
  ),
  "12/tiem-can": vd(
    R`Tìm các đường tiệm cận của đồ thị $y=\frac{2x-1}{x+1}$.`,
    [
      buoc(R`Khi $x\to\pm\infty$, $y\to\frac{2}{1}=2$, nên $y=2$ là tiệm cận ngang.`, R`Tử và mẫu cùng bậc thì giới hạn ở vô cực bằng tỉ số hai hệ số cao nhất.`),
      buoc(R`Khi $x\to -1$, mẫu tiến tới $0$ còn tử tiến tới $-3$, nên $x=-1$ là tiệm cận đứng.`, R`Mẫu bằng không mà tử khác không thì hàm tăng hoặc giảm không giới hạn.`),
    ],
    R`Đồ thị có tiệm cận ngang $y=2$ và tiệm cận đứng $x=-1$.`,
    [{ expr: "limit((2*x-1)/(x+1), x, oo)", expect: "2" }],
  ),
  "12/bbt": vd(
    R`Lập bảng biến thiên của $y=-x^2+4x$.`,
    [
      buoc(R`Đạo hàm $y'=-2x+4$ bằng $0$ tại $x=2$, dương khi $x<2$ và âm khi $x>2$.`, R`Đạo hàm bậc nhất đổi dấu đúng một lần tại nghiệm của nó.`),
      buoc(R`Hàm tăng trên $(-\infty;2)$, đạt giá trị lớn nhất $y(2)=4$, rồi giảm trên $(2;+\infty)$.`, R`Dấu của đạo hàm cho biết chiều biến thiên trên từng khoảng.`),
    ],
    R`Hàm tăng rồi giảm, đạt giá trị lớn nhất bằng $4$ tại $x=2$.`,
    [{ expr: "-2**2+4*2", expect: "4" }],
  ),
  "12/nguyen-ham": vd(
    R`Tìm nguyên hàm $F$ của $f(x)=3x^2-2x+1$ thỏa $F(1)=4$.`,
    [
      buoc(R`Mọi nguyên hàm có dạng $F(x)=x^3-x^2+x+C$.`, R`Nguyên hàm của $x^n$ là $\frac{x^{n+1}}{n+1}$, cộng thêm một hằng số.`),
      buoc(R`Điều kiện $F(1)=1-1+1+C=4$ cho $C=3$.`, R`Một điều kiện tại một điểm xác định đúng một giá trị của hằng số.`),
    ],
    R`Nguyên hàm cần tìm là $F(x)=x^3-x^2+x+3$.`,
    [{ expr: "integrate(3*x**2-2*x+1, x).subs(x,1)+3", expect: "4" }],
  ),
  "12/tich-phan-bai": vd(
    R`Tính $\int_0^{\pi}\sin x\,dx$.`,
    [
      buoc(R`Một nguyên hàm của $\sin x$ là $-\cos x$.`, R`Đạo hàm của $-\cos x$ bằng $\sin x$.`),
      buoc(R`Tích phân bằng $-\cos\pi-(-\cos 0)=1+1=2$.`, R`Lấy giá trị tại cận trên trừ giá trị tại cận dưới.`),
    ],
    R`Tích phân bằng $2$.`,
    [{ expr: "integrate(sin(x), (x, 0, pi))", expect: "2" }],
  ),
  "12/dien-tich": vd(
    R`Tính diện tích hình phẳng giới hạn bởi $y=x^2$ và $y=x$.`,
    [
      buoc(R`Hai đồ thị cắt nhau tại $x=0$ và $x=1$; trên $[0;1]$ đường $y=x$ nằm trên.`, R`Giải phương trình hoành độ giao điểm để tìm hai cận.`),
      buoc(R`Diện tích bằng $\int_0^1(x-x^2)\,dx=\frac{1}{2}-\frac{1}{3}=\frac{1}{6}$.`, R`Diện tích giữa hai đồ thị là tích phân của hiệu, lấy hàm ở trên trừ hàm ở dưới.`),
    ],
    R`Diện tích hình phẳng bằng $\frac{1}{6}$.`,
    [{ expr: "integrate(x-x**2, (x, 0, 1))", expect: "Rational(1,6)" }],
  ),
  "12/the-tich-tp": vd(
    R`Tính thể tích khối tròn xoay khi quay hình phẳng $0\le y\le\sqrt{x}$, $0\le x\le 4$ quanh trục hoành.`,
    [
      buoc(R`Mỗi lát cắt vuông góc với trục hoành là một hình tròn bán kính $\sqrt{x}$, diện tích $\pi x$.`, R`Quay quanh trục hoành, bán kính lát cắt bằng tung độ của đồ thị.`),
      buoc(R`Thể tích $V=\pi\int_0^4 x\,dx=\pi\cdot 8=8\pi$.`, R`Cộng diện tích các lát mỏng dọc theo trục bằng tích phân.`),
    ],
    R`Thể tích khối tròn xoay bằng $8\pi$.`,
    [{ expr: "pi*integrate(x, (x, 0, 4))", expect: "8*pi" }],
  ),
  "12/vecto-kg": vd(
    R`Cho $A(1;0;2)$, $B(3;2;1)$, $C(2;-1;3)$. Tính tích vô hướng $\overrightarrow{AB}\cdot\overrightarrow{AC}$ và độ dài $AB$.`,
    [
      buoc(R`Ta có $\overrightarrow{AB}=(2;2;-1)$ và $\overrightarrow{AC}=(1;-1;1)$.`, R`Lấy tọa độ điểm cuối trừ tọa độ điểm đầu theo từng thành phần.`),
      buoc(R`Tích vô hướng $2-2-1=-1$, độ dài $AB=\sqrt{4+4+1}=3$.`, R`Tích vô hướng cộng tích các tọa độ tương ứng; độ dài là căn của tổng bình phương.`),
    ],
    R`Tích vô hướng bằng $-1$ và $AB=3$.`,
    [{ expr: "sqrt(2**2+2**2+1)", expect: "3" }],
  ),
  "12/mat-phang": vd(
    R`Viết phương trình mặt phẳng đi qua ba điểm $A(1;0;0)$, $B(0;2;0)$, $C(0;0;3)$.`,
    [
      buoc(R`Ba điểm nằm trên ba trục tọa độ, nên dùng phương trình đoạn chắn $\frac{x}{1}+\frac{y}{2}+\frac{z}{3}=1$.`, R`Mặt phẳng cắt ba trục tại $a$, $b$, $c$ khác không có dạng đoạn chắn.`),
      buoc(R`Nhân hai vế với $6$: $6x+3y+2z-6=0$.`, R`Khử mẫu để có phương trình tổng quát với hệ số nguyên.`),
    ],
    R`Mặt phẳng có phương trình $6x+3y+2z-6=0$.`,
    [{ expr: "6*0+3*2+2*0-6", expect: "0" }],
  ),
  "12/duong-cau": vd(
    R`Viết phương trình mặt cầu đường kính $AB$ với $A(1;2;3)$ và $B(3;0;1)$.`,
    [
      buoc(R`Tâm là trung điểm $I(2;1;2)$ của đoạn $AB$.`, R`Đường kính đi qua tâm, nên tâm nằm chính giữa hai đầu mút.`),
      buoc(R`Bán kính $R=IA=\sqrt{1+1+1}=\sqrt3$.`, R`Bán kính bằng khoảng cách từ tâm đến một đầu của đường kính.`),
    ],
    R`Mặt cầu có phương trình $(x-2)^2+(y-1)^2+(z-2)^2=3$.`,
    [{ expr: "(1-2)**2+(2-1)**2+(3-2)**2", expect: "3" }],
  ),
  "12/goc-kc-12": vd(
    R`Tính khoảng cách từ $M(1;2;3)$ đến mặt phẳng $(P): 2x-y+2z+1=0$.`,
    [
      buoc(R`Tử số: $|2\cdot 1-2+2\cdot 3+1|=7$.`, R`Thay tọa độ điểm vào vế trái của phương trình mặt phẳng rồi lấy trị tuyệt đối.`),
      buoc(R`Mẫu số: $\sqrt{4+1+4}=3$.`, R`Mẫu là độ dài của vectơ pháp tuyến.`),
    ],
    R`Khoảng cách bằng $\frac{7}{3}$.`,
    [{ expr: "Abs(2-2+6+1)/sqrt(4+1+4)", expect: "Rational(7,3)" }],
  ),
  "12/khoang-12": vd(
    R`Mẫu ghép nhóm có các nhóm $[0;10)$, $[10;20)$, $[20;30)$ với tần số $3$, $5$, $2$. Tính tứ phân vị thứ nhất.`,
    [
      buoc(R`Cỡ mẫu $n=10$, mốc $\frac{n}{4}=2{,}5$; tần số tích lũy nhóm đầu là $3$, nên $Q_1$ thuộc nhóm $[0;10)$.`, R`Nhóm chứa tứ phân vị là nhóm mà tần số tích lũy lần đầu vượt mốc.`),
      buoc(R`Nội suy: $Q_1=0+\frac{2{,}5-0}{3}\cdot 10\approx 8{,}33$.`, R`Trong nhóm chứa mốc, coi các giá trị trải đều theo độ dài nhóm.`),
    ],
    R`Tứ phân vị thứ nhất khoảng $8{,}33$.`,
    [{ expr: "Rational(5,2)/3*10", expect: "Rational(25,3)" }],
  ),
  "12/lech-chuan": vd(
    R`Hai lớp có cùng điểm trung bình $7$; độ lệch chuẩn của lớp A là $0{,}8$, của lớp B là $1{,}6$. Nhận xét.`,
    [
      buoc(R`Phương sai của hai lớp lần lượt là $0{,}64$ và $2{,}56$.`, R`Phương sai bằng bình phương của độ lệch chuẩn.`),
      buoc(R`Lớp A có độ lệch chuẩn nhỏ hơn nên điểm tập trung quanh $7$ hơn.`, R`Độ lệch chuẩn đo mức phân tán của số liệu quanh số trung bình.`),
    ],
    R`Lớp A có kết quả đồng đều hơn lớp B.`,
    [{ expr: "Rational(16,10)**2", expect: "Rational(64,25)" }],
  ),
  "12/co-dieu-kien": vd(
    R`Một hộp có $5$ bi đỏ và $3$ bi xanh. Lấy lần lượt hai bi không trả lại. Biết bi thứ nhất màu đỏ, tính xác suất bi thứ hai cũng màu đỏ.`,
    [
      buoc(R`Sau khi lấy một bi đỏ, hộp còn $4$ bi đỏ và $3$ bi xanh.`, R`Điều kiện đã biết làm thay đổi thành phần của hộp trước lần lấy thứ hai.`),
      buoc(R`Xác suất cần tìm là $\frac{4}{7}$.`, R`Trong phần còn lại, mỗi viên bi có khả năng được lấy như nhau.`),
    ],
    R`Xác suất bằng $\frac{4}{7}$.`,
    [{ expr: "Rational(5*4,8*7)/Rational(5,8)", expect: "Rational(4,7)" }],
  ),
  "12/toan-phan": vd(
    R`Hai máy sản xuất lần lượt $60\%$ và $40\%$ sản phẩm, tỉ lệ lỗi tương ứng $2\%$ và $5\%$. Chọn ngẫu nhiên một sản phẩm. Tính xác suất sản phẩm bị lỗi.`,
    [
      buoc(R`Sản phẩm lỗi từ máy thứ nhất có xác suất $0{,}6\cdot 0{,}02=0{,}012$.`, R`Xác suất của một nhánh bằng xác suất chọn nhánh nhân với xác suất có điều kiện trên nhánh đó.`),
      buoc(R`Từ máy thứ hai: $0{,}4\cdot 0{,}05=0{,}02$. Cộng lại được $0{,}032$.`, R`Hai nhánh rời nhau và phủ hết mọi trường hợp nên cộng lại.`),
    ],
    R`Xác suất sản phẩm bị lỗi là $0{,}032$.`,
    [{ expr: "Rational(6,10)*Rational(2,100)+Rational(4,10)*Rational(5,100)", expect: "Rational(4,125)" }],
  ),
  "12/bayes": vd(
    R`Hai máy sản xuất lần lượt $60\%$ và $40\%$ sản phẩm, tỉ lệ lỗi tương ứng $2\%$ và $5\%$, nên tỉ lệ lỗi chung là $0{,}032$. Biết sản phẩm chọn ra bị lỗi. Tính xác suất nó do máy thứ hai sản xuất.`,
    [
      buoc(R`Theo công thức Bayes, xác suất bằng $\frac{0{,}4\cdot 0{,}05}{0{,}032}$.`, R`Tử là nhánh của máy thứ hai, mẫu là xác suất toàn phần của sản phẩm lỗi.`),
      buoc(R`Tính ra $\frac{0{,}02}{0{,}032}=0{,}625$.`, R`Máy thứ hai làm ít sản phẩm hơn nhưng tỉ lệ lỗi cao hơn nên chiếm phần lớn sản phẩm lỗi.`),
    ],
    R`Xác suất sản phẩm lỗi do máy thứ hai là $0{,}625$.`,
    [{ expr: "Rational(2,100)/Rational(32,1000)", expect: "Rational(5,8)" }],
  ),
};
