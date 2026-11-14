/**
 * Ví dụ mẫu thứ hai cho các bài từ lớp 6 (lớp 1–5 ở secondKids.ts): khác ví dụ thứ nhất về dạng hoặc độ khó, để người học
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
  // Lớp 6
  "6/thu-tu-tinh": vd(
    R`Tính $48:(2+6)\cdot 3-5$.`,
    [
      buoc(R`Trong ngoặc trước: $2+6=8$.`, R`Phần trong ngoặc luôn được tính trước mọi phép tính khác.`),
      buoc(R`Nhân và chia từ trái sang phải: $48:8=6$, rồi $6\cdot 3=18$.`, R`Nhân và chia cùng mức nên làm lần lượt theo chiều đọc từ trái sang phải.`),
      buoc(R`Cuối cùng trừ: $18-5=13$.`, R`Cộng và trừ làm sau cùng.`),
    ],
    R`Kết quả bằng $13$.`,
    [{ expr: "48/(2+6)*3-5", expect: "13" }],
  ),
  "6/luy-thua": vd(
    R`Viết gọn $3^4\cdot 3^2$ và tính $5^6:5^4$.`,
    [
      buoc(R`Nhân hai lũy thừa cùng cơ số thì cộng số mũ: $3^4\cdot 3^2=3^6=729$.`, R`Có bốn thừa số $3$ rồi thêm hai thừa số $3$, tổng cộng sáu thừa số.`),
      buoc(R`Chia hai lũy thừa cùng cơ số thì trừ số mũ: $5^6:5^4=5^2=25$.`, R`Bốn thừa số $5$ ở mẫu triệt tiêu với bốn thừa số ở tử.`),
    ],
    R`Ta có $3^4\cdot 3^2=3^6=729$ và $5^6:5^4=25$.`,
    [{ expr: "3**4*3**2", expect: "729" }, { expr: "5**6/5**4", expect: "25" }],
  ),
  "6/ucln": vd(
    R`Có $24$ quyển vở và $36$ cái bút, chia đều vào các phần quà sao cho không thừa. Nhiều nhất làm được bao nhiêu phần quà?`,
    [
      buoc(R`Số phần quà phải là ước chung của $24$ và $36$, và cần lớn nhất.`, R`Chia đều không thừa nghĩa là số phần chia hết cả số vở lẫn số bút.`),
      buoc(R`Phân tích: $24=2^3\cdot 3$ và $36=2^2\cdot 3^2$, nên ước chung lớn nhất là $2^2\cdot 3=12$.`, R`Ước chung lớn nhất lấy các thừa số chung với số mũ nhỏ nhất.`),
    ],
    R`Làm được nhiều nhất $12$ phần quà, mỗi phần có $2$ quyển vở và $3$ cái bút.`,
    [{ expr: "gcd(24,36)", expect: "12" }],
  ),
  "6/so-nguyen-to": vd(
    R`Phân tích $180$ ra thừa số nguyên tố.`,
    [
      buoc(R`Chia lần lượt cho các số nguyên tố nhỏ: $180=2\cdot 90=2\cdot 2\cdot 45$.`, R`Chia cho $2$ chừng nào còn chia hết, rồi chuyển sang số nguyên tố kế tiếp.`),
      buoc(R`Tiếp tục: $45=3\cdot 15=3\cdot 3\cdot 5$.`, R`Dừng lại khi thương còn lại là một số nguyên tố.`),
    ],
    R`Ta có $180=2^2\cdot 3^2\cdot 5$.`,
    [{ expr: "2**2*3**2*5", expect: "180" }],
  ),
  "6/cong-tru-nguyen": vd(
    R`Nhiệt độ buổi sáng là $-5^\circ\mathrm{C}$, đến trưa tăng thêm $9^\circ\mathrm{C}$, tối lại giảm $7^\circ\mathrm{C}$. Nhiệt độ buổi tối là bao nhiêu?`,
    [
      buoc(R`Buổi trưa: $-5+9=4$ độ.`, R`Tăng nhiệt độ là cộng một số dương, trên trục số là bước sang phải.`),
      buoc(R`Buổi tối: $4-7=-3$ độ.`, R`Giảm nhiệt độ là trừ, đi qua điểm $0$ thì sang phía âm.`),
    ],
    R`Nhiệt độ buổi tối là $-3^\circ\mathrm{C}$.`,
    [{ expr: "-5+9-7", expect: "-3" }],
  ),
  "6/tri-tuyet-doi": vd(
    R`Sắp xếp các số $-4$, $3$, $-9$, $0$, $|-6|$ theo thứ tự tăng dần.`,
    [
      buoc(R`Ta có $|-6|=6$.`, R`Trị tuyệt đối là khoảng cách tới $0$ nên không âm.`),
      buoc(R`Số âm có trị tuyệt đối lớn hơn thì nhỏ hơn: $-9<-4<0<3<6$.`, R`Trên trục số, số nằm xa về bên trái hơn thì nhỏ hơn.`),
    ],
    R`Thứ tự tăng dần là $-9$, $-4$, $0$, $3$, $|-6|$.`,
    [{ expr: "Abs(-6)", expect: "6" }],
  ),
  "6/phan-am": vd(
    R`Tính $\frac{-2}{3}-\frac{1}{4}$.`,
    [
      buoc(R`Mẫu chung là $12$: $\frac{-8}{12}-\frac{3}{12}$.`, R`Quy đồng để các phần có cùng kích thước rồi mới trừ.`),
      buoc(R`Trừ hai tử: $\frac{-8-3}{12}=\frac{-11}{12}$.`, R`Trừ một số dương từ một số âm cho số âm có trị tuyệt đối lớn hơn.`),
    ],
    R`Kết quả bằng $-\frac{11}{12}$.`,
    [{ expr: "Rational(-2,3)-Rational(1,4)", expect: "Rational(-11,12)" }],
  ),
  "6/hon-so": vd(
    R`Tính $1\frac{1}{2}+2\frac{2}{3}$.`,
    [
      buoc(R`Đổi ra phân số: $\frac{3}{2}+\frac{8}{3}$.`, R`Hỗn số bằng phần nguyên cộng phần phân số, nên đổi được về một phân số.`),
      buoc(R`Quy đồng mẫu $6$: $\frac{9}{6}+\frac{16}{6}=\frac{25}{6}=4\frac{1}{6}$.`, R`Kết quả lớn hơn $1$ nên viết lại dưới dạng hỗn số cho dễ đọc.`),
    ],
    R`Tổng bằng $4\frac{1}{6}$.`,
    [{ expr: "Rational(3,2)+Rational(8,3)", expect: "Rational(25,6)" }],
  ),
  "6/cong-tru-phan-so-6": vd(
    R`Một bể có $\frac{3}{4}$ thể tích nước. Dùng hết $\frac{1}{3}$ thể tích bể. Bể còn lại bao nhiêu phần thể tích?`,
    [
      buoc(R`Phép tính cần làm là $\frac{3}{4}-\frac{1}{3}$.`, R`Lượng còn lại bằng lượng có trừ đi lượng đã dùng.`),
      buoc(R`Quy đồng mẫu $12$: $\frac{9}{12}-\frac{4}{12}=\frac{5}{12}$.`, R`Hai phân số cùng chỉ các phần của cùng một bể nên trừ được sau khi quy đồng.`),
    ],
    R`Bể còn $\frac{5}{12}$ thể tích nước.`,
    [{ expr: "Rational(3,4)-Rational(1,3)", expect: "Rational(5,12)" }],
  ),
  "6/nhan-chia-phan-so-6": vd(
    R`Một tấm vải dài $\frac{15}{4}$ m, cắt thành các mảnh dài $\frac{3}{8}$ m. Được bao nhiêu mảnh?`,
    [
      buoc(R`Số mảnh là $\frac{15}{4}:\frac{3}{8}$.`, R`Hỏi trong một độ dài chứa bao nhiêu đoạn bằng nhau thì làm phép chia.`),
      buoc(R`Nhân với nghịch đảo: $\frac{15}{4}\cdot\frac{8}{3}=\frac{120}{12}=10$.`, R`Chia cho một phân số là nhân với phân số đảo ngược của nó.`),
    ],
    R`Cắt được $10$ mảnh vải.`,
    [{ expr: "Rational(15,4)/Rational(3,8)", expect: "10" }],
  ),
  "6/thap-phan-am": vd(
    R`Tính $-2{,}4-1{,}6+3{,}5$.`,
    [
      buoc(R`Gộp hai số âm trước: $-2{,}4-1{,}6=-4$.`, R`Trừ thêm một số dương từ số âm thì đi tiếp về phía âm.`),
      buoc(R`Cộng tiếp: $-4+3{,}5=-0{,}5$.`, R`Hai số trái dấu thì lấy hiệu hai trị tuyệt đối, mang dấu của số có trị tuyệt đối lớn hơn.`),
    ],
    R`Kết quả bằng $-0{,}5$.`,
    [{ expr: "-Rational(24,10)-Rational(16,10)+Rational(35,10)", expect: "Rational(-1,2)" }],
  ),
  "6/uoc-luong": vd(
    R`Mua $3$ món đồ giá $19\,800$ đồng, $31\,200$ đồng và $48\,900$ đồng. Ước lượng tổng tiền đến hàng nghìn.`,
    [
      buoc(R`Làm tròn từng giá đến hàng nghìn: $20\,000$, $31\,000$ và $49\,000$.`, R`Làm tròn trước giúp phép cộng nhẩm được nhanh.`),
      buoc(R`Tổng ước lượng là $100\,000$ đồng; tổng đúng là $99\,900$ đồng.`, R`Kết quả ước lượng gần kết quả đúng nên dùng để kiểm tra phép tính.`),
    ],
    R`Tổng tiền khoảng $100\,000$ đồng.`,
    [{ expr: "19800+31200+48900", expect: "99900" }],
  ),
  "6/ti-so-phan-tram": vd(
    R`Một chiếc áo giá $250\,000$ đồng được giảm $50\,000$ đồng. Số tiền giảm bằng bao nhiêu phần trăm giá ban đầu?`,
    [
      buoc(R`Tỉ số của tiền giảm và giá gốc là $\frac{50\,000}{250\,000}=\frac{1}{5}$.`, R`Số đứng sau chữ "của" là giá ban đầu nên nằm ở mẫu.`),
      buoc(R`Đổi ra phần trăm: $\frac{1}{5}\cdot 100\%=20\%$.`, R`Nhân tỉ số với một trăm phần trăm để đổi ra phần trăm.`),
    ],
    R`Áo được giảm $20\%$.`,
    [{ expr: "Rational(50000,250000)*100", expect: "20" }],
  ),
  "6/so-sanh-ti-so": vd(
    R`Lớp A có $18$ trên $30$ bạn đạt loại giỏi, lớp B có $14$ trên $20$ bạn. Lớp nào có tỉ lệ giỏi cao hơn?`,
    [
      buoc(R`Lớp A: $\frac{18}{30}=60\%$. Lớp B: $\frac{14}{20}=70\%$.`, R`Đổi về phần trăm để hai tỉ số có cùng mẫu một trăm.`),
      buoc(R`Vì $70\%>60\%$ nên lớp B có tỉ lệ cao hơn.`, R`Lớp A có nhiều bạn giỏi hơn nhưng sĩ số lớn hơn, nên phải so tỉ lệ chứ không so số lượng.`),
    ],
    R`Lớp B có tỉ lệ học sinh giỏi cao hơn.`,
    [{ expr: "Rational(14,20)*100-Rational(18,30)*100", expect: "10" }],
  ),
  "6/so-do-goc": vd(
    R`Tia $Oy$ nằm giữa hai tia $Ox$ và $Oz$, với $\widehat{xOy}=35^\circ$ và $\widehat{xOz}=110^\circ$. Tính $\widehat{yOz}$.`,
    [
      buoc(R`Vì $Oy$ nằm giữa nên $\widehat{xOy}+\widehat{yOz}=\widehat{xOz}$.`, R`Hai góc kề nhau ghép lại thành góc lớn mà không chồng lên nhau.`),
      buoc(R`Do đó $\widehat{yOz}=110^\circ-35^\circ=75^\circ$.`, R`Tìm một phần khi biết toàn bộ và phần còn lại thì làm phép trừ.`),
    ],
    R`Góc $\widehat{yOz}=75^\circ$.`,
    [{ expr: "110-35", expect: "75" }],
  ),
  "6/hinh-deu": vd(
    R`Lục giác đều có cạnh $4$ cm. Tính chu vi và cho biết lục giác đều có mấy trục đối xứng.`,
    [
      buoc(R`Lục giác đều có $6$ cạnh bằng nhau, nên chu vi là $6\cdot 4=24$ cm.`, R`Hình đều có mọi cạnh bằng nhau nên chu vi bằng số cạnh nhân độ dài một cạnh.`),
      buoc(R`Có $3$ trục qua các cặp đỉnh đối diện và $3$ trục qua trung điểm các cặp cạnh đối diện.`, R`Đa giác đều $n$ cạnh có đúng $n$ trục đối xứng.`),
    ],
    R`Chu vi bằng $24$ cm và lục giác đều có $6$ trục đối xứng.`,
    [{ expr: "6*4", expect: "24" }],
  ),
  "6/diem-duong": vd(
    R`Cho $5$ điểm, không có ba điểm nào thẳng hàng. Vẽ được bao nhiêu đường thẳng đi qua hai trong số các điểm đó?`,
    [
      buoc(R`Mỗi điểm nối được với $4$ điểm còn lại, tổng cộng $5\cdot 4=20$ lần nối.`, R`Đếm theo từng điểm thì mỗi đường thẳng được đếm hai lần, từ hai đầu của nó.`),
      buoc(R`Chia đôi: $20:2=10$ đường thẳng.`, R`Qua hai điểm phân biệt chỉ có đúng một đường thẳng.`),
    ],
    R`Vẽ được $10$ đường thẳng.`,
    [{ expr: "5*4/2", expect: "10" }],
  ),
  "6/thu-thap": vd(
    R`Hỏi $30$ bạn về môn thể thao yêu thích: $12$ bạn chọn bóng đá, $8$ bạn chọn cầu lông, số còn lại chọn bơi. Có bao nhiêu bạn chọn bơi?`,
    [
      buoc(R`Cỡ mẫu là $30$, mỗi bạn chọn đúng một môn.`, R`Tổng số lần đếm của mọi lựa chọn phải bằng cỡ mẫu.`),
      buoc(R`Số bạn chọn bơi là $30-12-8=10$.`, R`Phần còn lại bằng cả mẫu trừ đi các phần đã biết.`),
    ],
    R`Có $10$ bạn chọn bơi.`,
    [{ expr: "30-12-8", expect: "10" }],
  ),
  "6/bieu-dien-6": vd(
    R`Số liệu giả định. Biểu đồ cột cho số sách bốn tổ đọc được: $6$, $9$, $4$, $11$. Tổ nào đọc nhiều nhất, và tổng cộng bao nhiêu quyển?`,
    [
      buoc(R`Cột cao nhất ứng với số $11$, là tổ thứ tư.`, R`Trên biểu đồ cột, chiều cao của cột chính là số liệu.`),
      buoc(R`Tổng cộng $6+9+4+11=30$ quyển.`, R`Cộng chiều cao mọi cột để được tổng số liệu.`),
    ],
    R`Tổ thứ tư đọc nhiều nhất, cả lớp đọc $30$ quyển.`,
    [{ expr: "6+9+4+11", expect: "30" }],
  ),
  "6/xs-thuc-nghiem": vd(
    R`Số liệu giả định. Rút một quả bóng từ hộp rồi trả lại, làm $50$ lần, được bóng đỏ $18$ lần. Tính xác suất thực nghiệm của bóng đỏ.`,
    [
      buoc(R`Xác suất thực nghiệm bằng số lần được bóng đỏ chia cho số lần thử: $\frac{18}{50}$.`, R`Đây là tỉ lệ quan sát được trong chính đợt thử này.`),
      buoc(R`Rút gọn được $\frac{9}{25}=0{,}36$.`, R`Viết ở dạng thập phân để dễ so sánh với các đợt thử khác.`),
    ],
    R`Xác suất thực nghiệm của bóng đỏ là $0{,}36$.`,
    [{ expr: "Rational(18,50)", expect: "Rational(9,25)" }],
  ),

  // Lớp 7
  "7/huu-ti-bai": vd(
    R`Tính $\left(\frac{1}{2}-\frac{2}{3}\right):\frac{-5}{6}$.`,
    [
      buoc(R`Trong ngoặc: $\frac{3}{6}-\frac{4}{6}=-\frac{1}{6}$.`, R`Quy đồng mẫu rồi trừ hai tử.`),
      buoc(R`Nhân với nghịch đảo: $-\frac{1}{6}\cdot\frac{6}{-5}=\frac{1}{5}$.`, R`Chia cho phân số là nhân nghịch đảo, và hai số âm cho kết quả dương.`),
    ],
    R`Kết quả bằng $\frac{1}{5}$.`,
    [{ expr: "(Rational(1,2)-Rational(2,3))/Rational(-5,6)", expect: "Rational(1,5)" }],
  ),
  "7/so-thuc": vd(
    R`So sánh $\sqrt{50}$ với $7$, và tính $\sqrt{0{,}49}+\sqrt{\frac{9}{4}}$.`,
    [
      buoc(R`Ta có $7=\sqrt{49}$ và $49<50$, nên $7<\sqrt{50}$.`, R`Hai số không âm, số nào có bình phương lớn hơn thì lớn hơn.`),
      buoc(R`Ta có $\sqrt{0{,}49}=0{,}7$ và $\sqrt{\frac{9}{4}}=\frac{3}{2}$, tổng bằng $2{,}2$.`, R`Vì $0{,}7^2=0{,}49$ và $\left(\frac{3}{2}\right)^2=\frac{9}{4}$.`),
    ],
    R`Ta có $\sqrt{50}>7$, và tổng hai căn bằng $2{,}2$.`,
    [{ expr: "sqrt(Rational(49,100))+sqrt(Rational(9,4))", expect: "Rational(11,5)" }],
  ),
  "7/ti-le-thuc": vd(
    R`Tìm hai số $x$, $y$ biết $\frac{x}{3}=\frac{y}{5}$ và $x+y=32$.`,
    [
      buoc(R`Theo tính chất dãy tỉ số bằng nhau: $\frac{x}{3}=\frac{y}{5}=\frac{x+y}{3+5}=\frac{32}{8}=4$.`, R`Cộng tử với tử và mẫu với mẫu vẫn được tỉ số bằng các tỉ số đã cho.`),
      buoc(R`Suy ra $x=3\cdot 4=12$ và $y=5\cdot 4=20$.`, R`Mỗi số bằng mẫu của nó nhân với giá trị chung của các tỉ số.`),
    ],
    R`Hai số là $x=12$ và $y=20$.`,
    [{ expr: "solve([5*x-3*y, x+y-32],[x,y])[x]", expect: "12" }],
  ),
  "7/dai-luong-ti-le": vd(
    R`Chia $120$ quyển vở cho ba tổ tỉ lệ thuận với số học sinh $8$, $10$ và $12$. Mỗi tổ nhận bao nhiêu quyển?`,
    [
      buoc(R`Tổng số học sinh là $30$, nên mỗi học sinh ứng với $\frac{120}{30}=4$ quyển.`, R`Tỉ lệ thuận nghĩa là số vở chia cho số học sinh là một hằng số chung cho cả ba tổ.`),
      buoc(R`Ba tổ nhận $8\cdot 4=32$, $10\cdot 4=40$ và $12\cdot 4=48$ quyển.`, R`Nhân hằng số đó với số học sinh của từng tổ.`),
    ],
    R`Ba tổ nhận lần lượt $32$, $40$ và $48$ quyển, tổng đúng $120$.`,
    [{ expr: "32+40+48", expect: "120" }],
  ),
  "7/gia-tri-bt": vd(
    R`Tính giá trị của $3x^2-2xy+y^2$ khi $x=-1$ và $y=2$.`,
    [
      buoc(R`Thay số: $3\cdot(-1)^2-2\cdot(-1)\cdot 2+2^2$.`, R`Số âm thay vào phải đặt trong ngoặc để giữ đúng dấu.`),
      buoc(R`Tính: $3+4+4=11$.`, R`Lũy thừa trước, rồi nhân, cuối cùng cộng.`),
    ],
    R`Giá trị của biểu thức bằng $11$.`,
    [{ expr: "3*(-1)**2-2*(-1)*2+2**2", expect: "11" }],
  ),
  "7/da-thuc": vd(
    R`Cho $P(x)=x^2-3x+2$. Tính $P(1)$ và $P(2)$, rồi cho biết $x=1$, $x=2$ có là nghiệm của $P$ không.`,
    [
      buoc(R`Ta có $P(1)=1-3+2=0$ và $P(2)=4-6+2=0$.`, R`Thay từng giá trị vào đa thức rồi tính theo thứ tự phép tính.`),
      buoc(R`Cả hai giá trị làm đa thức bằng $0$ nên đều là nghiệm.`, R`Nghiệm của đa thức là giá trị của biến làm đa thức bằng không.`),
    ],
    R`Cả $x=1$ và $x=2$ đều là nghiệm của $P(x)$.`,
    [{ expr: "(x**2-3*x+2).subs(x,2)", expect: "0" }],
  ),
  "7/tong-goc": vd(
    R`Tam giác $ABC$ có $\widehat{A}=2\widehat{B}$ và $\widehat{C}=30^\circ$. Tính $\widehat{A}$ và $\widehat{B}$.`,
    [
      buoc(R`Từ tổng ba góc: $\widehat{A}+\widehat{B}=180^\circ-30^\circ=150^\circ$.`, R`Tổng ba góc trong tam giác luôn bằng $180^\circ$.`),
      buoc(R`Thay $\widehat{A}=2\widehat{B}$: $3\widehat{B}=150^\circ$, nên $\widehat{B}=50^\circ$ và $\widehat{A}=100^\circ$.`, R`Góc $A$ gồm hai phần bằng góc $B$, nên tổng ứng với ba phần.`),
    ],
    R`Ta có $\widehat{A}=100^\circ$ và $\widehat{B}=50^\circ$.`,
    [{ expr: "solve([a-2*b, a+b-150],[a,b])[a]", expect: "100" }],
  ),
  "7/bang-nhau": vd(
    R`Cho tam giác $ABC$ có $AB=AC$, $M$ là trung điểm $BC$. Chứng minh $\triangle ABM=\triangle ACM$, rồi suy ra $\widehat{B}=\widehat{C}$.`,
    [
      buoc(R`Hai tam giác có $AB=AC$, $BM=CM$ và cạnh chung $AM$.`, R`Điểm $M$ là trung điểm nên chia $BC$ thành hai đoạn bằng nhau.`),
      buoc(R`Theo trường hợp cạnh-cạnh-cạnh, $\triangle ABM=\triangle ACM$, nên $\widehat{B}=\widehat{C}$.`, R`Hai tam giác bằng nhau thì các góc tương ứng bằng nhau.`),
    ],
    R`Hai tam giác bằng nhau, và tam giác cân có hai góc đáy bằng nhau.`,
    [{ expr: "Rational(10,2)", expect: "5" }],
  ),
  "7/can-deu": vd(
    R`Tam giác cân có một góc đáy bằng $65^\circ$. Tính góc ở đỉnh.`,
    [
      buoc(R`Hai góc đáy của tam giác cân bằng nhau, cùng bằng $65^\circ$.`, R`Tính chất đối xứng của tam giác cân cho hai góc đáy bằng nhau.`),
      buoc(R`Góc ở đỉnh bằng $180^\circ-2\cdot 65^\circ=50^\circ$.`, R`Lấy tổng ba góc trừ đi hai góc đáy.`),
    ],
    R`Góc ở đỉnh bằng $50^\circ$.`,
    [{ expr: "180-2*65", expect: "50" }],
  ),
  "7/doan-thang": vd(
    R`Số liệu giả định. Số khách của một cửa hàng bốn ngày liền là $40$, $55$, $50$, $70$. Ngày nào tăng nhiều nhất so với ngày trước?`,
    [
      buoc(R`Các mức thay đổi lần lượt là $+15$, $-5$ và $+20$.`, R`Mức thay đổi giữa hai ngày bằng số sau trừ số trước.`),
      buoc(R`Mức tăng lớn nhất là $+20$, từ ngày thứ ba sang ngày thứ tư.`, R`Trên biểu đồ đoạn thẳng, đoạn dốc lên nhiều nhất ứng với mức tăng lớn nhất.`),
    ],
    R`Ngày thứ tư tăng nhiều nhất, thêm $20$ khách.`,
    [{ expr: "70-50", expect: "20" }],
  ),
  "7/quat-tron": vd(
    R`Số liệu giả định. Một quạt tròn có góc ở tâm $72^\circ$ biểu diễn một nhóm trong $50$ người được hỏi. Nhóm đó có bao nhiêu người?`,
    [
      buoc(R`Nhóm này chiếm $\frac{72}{360}=\frac{1}{5}$ hình tròn.`, R`Góc ở tâm so với cả vòng tròn cho biết nhóm chiếm mấy phần của cả mẫu.`),
      buoc(R`Số người là $\frac{1}{5}\cdot 50=10$.`, R`Nhân tỉ lệ đó với tổng số người được hỏi.`),
    ],
    R`Nhóm đó có $10$ người.`,
    [{ expr: "Rational(72,360)*50", expect: "10" }],
  ),
  "7/xs-bien-co": vd(
    R`Chọn ngẫu nhiên một số trong các số từ $1$ đến $20$. Tính xác suất số được chọn chia hết cho $3$.`,
    [
      buoc(R`Các số chia hết cho $3$ là $3$, $6$, $9$, $12$, $15$, $18$, tức $6$ số.`, R`Liệt kê các kết quả thuận lợi để không bỏ sót.`),
      buoc(R`Xác suất là $\frac{6}{20}=\frac{3}{10}$.`, R`Có hai mươi kết quả đồng khả năng.`),
    ],
    R`Xác suất bằng $\frac{3}{10}$.`,
    [{ expr: "Rational(6,20)", expect: "Rational(3,10)" }],
  ),
  "7/doi-dinh": vd(
    R`Hai đường thẳng cắt nhau tạo bốn góc, trong đó một góc gấp đôi góc kề với nó. Tính bốn góc.`,
    [
      buoc(R`Gọi góc nhỏ là $x$, góc kề là $2x$. Hai góc kề bù nên $3x=180^\circ$, tức $x=60^\circ$.`, R`Hai góc kề bù có tổng $180^\circ$.`),
      buoc(R`Hai góc còn lại đối đỉnh với hai góc trên nên bằng $60^\circ$ và $120^\circ$.`, R`Hai góc đối đỉnh thì bằng nhau.`),
    ],
    R`Bốn góc là $60^\circ$, $120^\circ$, $60^\circ$ và $120^\circ$.`,
    [{ expr: "solve(3*x-180, x)[0]", expect: "60" }],
  ),
  "7/song-song-7": vd(
    R`Cho $a$ song song với $b$, đường thẳng $c$ cắt $a$ tại $A$ và cắt $b$ tại $B$. Góc tạo bởi $c$ và $a$ tại $A$ bằng $3x+10^\circ$, góc so le trong với nó tại $B$ bằng $5x-30^\circ$. Tìm $x$.`,
    [
      buoc(R`Vì $a$ song song với $b$ nên hai góc so le trong bằng nhau: $3x+10=5x-30$.`, R`Hai đường thẳng song song bị cắt thì các góc so le trong bằng nhau.`),
      buoc(R`Giải được $2x=40$, tức $x=20$, và mỗi góc bằng $70^\circ$.`, R`Chuyển các số hạng chứa $x$ về một vế rồi chia cho hệ số.`),
    ],
    R`Ta có $x=20$, mỗi góc bằng $70^\circ$.`,
    [{ expr: "solve(3*x+10-(5*x-30), x)[0]", expect: "20" }],
  ),
  "7/hop-7": vd(
    R`Một bể cá hình hộp chữ nhật dài $60$ cm, rộng $40$ cm, cao $50$ cm, đang chứa nước cao $30$ cm. Bể đang chứa bao nhiêu lít nước?`,
    [
      buoc(R`Phần nước là một hình hộp chữ nhật $60\cdot 40\cdot 30=72\,000$ cm³.`, R`Nước chiếm phần dưới của bể, có cùng đáy và chiều cao bằng mực nước.`),
      buoc(R`Một lít bằng $1000$ cm³, nên có $72$ lít nước.`, R`Đổi đơn vị thể tích sang lít để trả lời đúng câu hỏi.`),
    ],
    R`Bể đang chứa $72$ lít nước.`,
    [{ expr: "60*40*30/1000", expect: "72" }],
  ),
  "7/lang-tru-7": vd(
    R`Một lăng trụ đứng có đáy là tam giác vuông với hai cạnh góc vuông $6$ cm và $8$ cm, chiều cao lăng trụ $10$ cm. Tính diện tích toàn phần.`,
    [
      buoc(R`Cạnh huyền của đáy là $\sqrt{36+64}=10$ cm, chu vi đáy $24$ cm, diện tích xung quanh $24\cdot 10=240$ cm².`, R`Diện tích xung quanh bằng chu vi đáy nhân chiều cao.`),
      buoc(R`Mỗi đáy có diện tích $\frac{1}{2}\cdot 6\cdot 8=24$ cm², hai đáy là $48$ cm². Toàn phần: $240+48=288$ cm².`, R`Diện tích toàn phần gồm mặt xung quanh cộng hai đáy.`),
    ],
    R`Diện tích toàn phần bằng $288$ cm².`,
    [{ expr: "(6+8+sqrt(36+64))*10+2*Rational(1,2)*6*8", expect: "288" }],
  ),
  // Lớp 8
  "8/binh-phuong-tong": vd(
    R`Khai triển $(2x-3y)^2$, rồi tính nhanh $99^2$.`,
    [
      buoc(R`Áp dụng hằng đẳng thức $(a-b)^2=a^2-2ab+b^2$ với $a=2x$ và $b=3y$: $(2x-3y)^2=4x^2-12xy+9y^2$.`, R`Hạng tử giữa bằng hai lần tích của hai số, và mang dấu trừ vì là bình phương của một hiệu.`),
      buoc(R`Viết $99=100-1$, nên $99^2=10\,000-200+1=9801$.`, R`Tách thành hiệu với một số tròn trăm thì mọi phép tính đều nhẩm được.`),
    ],
    R`Ta có $(2x-3y)^2=4x^2-12xy+9y^2$ và $99^2=9801$.`,
    [{ expr: "expand((2*x-3*y)**2)", expect: "4*x**2-12*x*y+9*y**2" }, { expr: "99**2", expect: "9801" }],
  ),
  "8/hieu-binh": vd(
    R`Phân tích $x^3-27$ thành nhân tử và khai triển $(x+2)^3$.`,
    [
      buoc(R`Viết $27=3^3$ rồi dùng hiệu hai lập phương: $x^3-27=(x-3)(x^2+3x+9)$.`, R`Hằng đẳng thức $a^3-b^3=(a-b)(a^2+ab+b^2)$ áp dụng với $a=x$ và $b=3$.`),
      buoc(R`Theo lập phương của một tổng: $(x+2)^3=x^3+6x^2+12x+8$.`, R`Các hệ số $1$, $3$, $3$, $1$ nhân lần lượt với lũy thừa giảm dần của $x$ và tăng dần của $2$.`),
    ],
    R`Ta có $x^3-27=(x-3)(x^2+3x+9)$ và $(x+2)^3=x^3+6x^2+12x+8$.`,
    [{ expr: "expand((x-3)*(x**2+3*x+9))", expect: "x**3-27" }, { expr: "expand((x+2)**3)", expect: "x**3+6*x**2+12*x+8" }],
  ),
  "8/phan-tich": vd(
    R`Phân tích $x^3-4x$ và $x^2-xy+3x-3y$ thành nhân tử.`,
    [
      buoc(R`Đặt nhân tử chung $x$: $x^3-4x=x(x^2-4)=x(x-2)(x+2)$.`, R`Sau khi đặt nhân tử chung, phần trong ngoặc còn là hiệu hai bình phương.`),
      buoc(R`Nhóm hai cặp: $x(x-y)+3(x-y)=(x-y)(x+3)$.`, R`Mỗi nhóm đều có thừa số $x-y$, nên đưa được ra ngoài làm nhân tử chung.`),
    ],
    R`Ta có $x^3-4x=x(x-2)(x+2)$ và $x^2-xy+3x-3y=(x-y)(x+3)$.`,
    [{ expr: "expand(x*(x-2)*(x+2))", expect: "x**3-4*x" }, { expr: "expand((x-y)*(x+3))", expect: "x**2-x*y+3*x-3*y" }],
  ),
  "8/phan-thuc": vd(
    R`Tính $\frac{1}{x-2}-\frac{4}{x^2-4}$ với $x\neq 2$ và $x\neq -2$.`,
    [
      buoc(R`Mẫu thứ hai là $(x-2)(x+2)$, nên mẫu chung là $(x-2)(x+2)$.`, R`Phân tích các mẫu thành nhân tử rồi lấy tích các nhân tử khác nhau.`),
      buoc(R`Quy đồng và trừ: $\frac{x+2-4}{(x-2)(x+2)}=\frac{x-2}{(x-2)(x+2)}=\frac{1}{x+2}$.`, R`Tử và mẫu có chung thừa số $x-2$ khác không nên rút gọn được.`),
    ],
    R`Kết quả bằng $\frac{1}{x+2}$.`,
    [{ expr: "simplify(1/(x-2)-4/(x**2-4))", expect: "1/(x+2)" }],
  ),
  "8/pt-bac-nhat": vd(
    R`Giải phương trình $\frac{x-1}{2}+\frac{x+2}{3}=4$.`,
    [
      buoc(R`Nhân hai vế với $6$: $3(x-1)+2(x+2)=24$.`, R`Nhân với mẫu chung để khử mẫu, nhớ nhân cả vế phải.`),
      buoc(R`Thu gọn: $5x+1=24$, nên $x=\frac{23}{5}$.`, R`Chuyển hằng số sang vế phải rồi chia hai vế cho hệ số của $x$.`),
    ],
    R`Phương trình có nghiệm $x=\frac{23}{5}$.`,
    [{ expr: "solve((x-1)/2+(x+2)/3-4, x)[0]", expect: "Rational(23,5)" }],
  ),
  "8/ham-bac-nhat": vd(
    R`Tìm hàm số bậc nhất $y=ax+b$ có đồ thị đi qua hai điểm $A(1;3)$ và $B(3;7)$.`,
    [
      buoc(R`Thay tọa độ hai điểm: $a+b=3$ và $3a+b=7$.`, R`Điểm thuộc đồ thị thì tọa độ của nó thỏa mãn công thức hàm số.`),
      buoc(R`Trừ hai phương trình: $2a=4$, nên $a=2$ và $b=1$.`, R`Hệ số $a$ chính là độ tăng của $y$ khi $x$ tăng thêm một đơn vị, ở đây $\frac{7-3}{3-1}=2$.`),
    ],
    R`Hàm số cần tìm là $y=2x+1$.`,
    [{ expr: "solve([a+b-3, 3*a+b-7],[a,b])[a]", expect: "2" }],
  ),
  "8/lap-pt": vd(
    R`Một ô tô đi từ A đến B với vận tốc $50$ km/h, rồi quay về với vận tốc $40$ km/h. Tổng thời gian đi và về là $4{,}5$ giờ. Tính quãng đường AB.`,
    [
      buoc(R`Gọi quãng đường là $x$ km với $x>0$. Thời gian đi là $\frac{x}{50}$, thời gian về là $\frac{x}{40}$.`, R`Thời gian bằng quãng đường chia cho vận tốc trên mỗi chiều.`),
      buoc(R`Lập phương trình $\frac{x}{50}+\frac{x}{40}=4{,}5$, nhân hai vế với $200$: $9x=900$, nên $x=100$.`, R`Mẫu chung của $50$ và $40$ là $200$, khử mẫu cho phương trình bậc nhất.`),
    ],
    R`Quãng đường AB dài $100$ km.`,
    [{ expr: "solve(x/50+x/40-Rational(9,2), x)[0]", expect: "100" }],
  ),
  "8/ti-so-dong-dang": vd(
    R`Hai tam giác đồng dạng theo tỉ số $\frac{3}{2}$. Tam giác nhỏ có chu vi $20$ cm và diện tích $16$ cm². Tính chu vi và diện tích tam giác lớn.`,
    [
      buoc(R`Chu vi tỉ lệ theo đúng tỉ số đồng dạng: $20\cdot\frac{3}{2}=30$ cm.`, R`Mọi độ dài, kể cả tổng các cạnh, đều nhân với cùng tỉ số.`),
      buoc(R`Diện tích tỉ lệ theo bình phương tỉ số: $16\cdot\frac{9}{4}=36$ cm².`, R`Diện tích là tích của hai độ dài nên nhân tỉ số hai lần.`),
    ],
    R`Tam giác lớn có chu vi $30$ cm và diện tích $36$ cm².`,
    [{ expr: "16*Rational(3,2)**2", expect: "36" }],
  ),
  "8/pitago": vd(
    R`Một chiếc thang dài $5$ m dựa vào tường, chân thang cách chân tường $1{,}4$ m. Đầu thang chạm tường ở độ cao bao nhiêu?`,
    [
      buoc(R`Thang, tường và mặt đất tạo thành tam giác vuông với cạnh huyền là thang dài $5$ m.`, R`Tường vuông góc với mặt đất, nên góc vuông nằm ở chân tường.`),
      buoc(R`Độ cao là $\sqrt{5^2-1{,}4^2}=\sqrt{25-1{,}96}=\sqrt{23{,}04}=4{,}8$ m.`, R`Cạnh góc vuông bằng căn của bình phương cạnh huyền trừ bình phương cạnh góc vuông kia.`),
    ],
    R`Đầu thang chạm tường ở độ cao $4{,}8$ m.`,
    [{ expr: "sqrt(25-Rational(196,100))", expect: "Rational(24,5)" }],
  ),
  "8/binh-hanh": vd(
    R`Hình thoi có hai đường chéo dài $6$ cm và $8$ cm. Tính cạnh và diện tích hình thoi.`,
    [
      buoc(R`Hai đường chéo vuông góc tại trung điểm, chia hình thoi thành bốn tam giác vuông có hai cạnh góc vuông $3$ và $4$, nên cạnh bằng $5$ cm.`, R`Hình thoi là hình bình hành có các đường chéo vuông góc và cắt nhau tại trung điểm mỗi đường.`),
      buoc(R`Diện tích bằng nửa tích hai đường chéo: $\frac{1}{2}\cdot 6\cdot 8=24$ cm².`, R`Bốn tam giác vuông ghép lại đúng bằng nửa hình chữ nhật có hai cạnh là hai đường chéo.`),
    ],
    R`Cạnh hình thoi bằng $5$ cm và diện tích bằng $24$ cm².`,
    [{ expr: "sqrt(3**2+4**2)", expect: "5" }, { expr: "Rational(1,2)*6*8", expect: "24" }],
  ),
  "8/chop-deu": vd(
    R`Hình chóp tứ giác đều có cạnh đáy $10$ cm và trung đoạn $13$ cm. Tính diện tích xung quanh và chiều cao của hình chóp.`,
    [
      buoc(R`Diện tích xung quanh bằng nửa chu vi đáy nhân trung đoạn: $\frac{1}{2}\cdot 40\cdot 13=260$ cm².`, R`Bốn mặt bên là bốn tam giác cân bằng nhau, mỗi tam giác có đáy $10$ và chiều cao $13$.`),
      buoc(R`Chiều cao, trung đoạn và nửa cạnh đáy tạo tam giác vuông: $h=\sqrt{13^2-5^2}=12$ cm.`, R`Chân đường cao là tâm đáy, cách trung điểm mỗi cạnh đáy đúng nửa cạnh, tức $5$ cm.`),
    ],
    R`Diện tích xung quanh bằng $260$ cm² và chiều cao bằng $12$ cm.`,
    [{ expr: "sqrt(13**2-5**2)", expect: "12" }],
  ),
  "8/thales": vd(
    R`Để đo chiều cao một cây, người ta cắm cọc cao $2$ m. Bóng cọc dài $1{,}5$ m, cùng lúc đó bóng cây dài $9$ m. Cây cao bao nhiêu?`,
    [
      buoc(R`Tia nắng song song, nên tam giác tạo bởi cọc và bóng cọc đồng dạng với tam giác tạo bởi cây và bóng cây.`, R`Hai tam giác vuông có góc tạo bởi tia nắng và mặt đất bằng nhau.`),
      buoc(R`Lập tỉ lệ $\frac{h}{9}=\frac{2}{1{,}5}$, nên $h=9\cdot\frac{4}{3}=12$ m.`, R`Chiều cao chia cho độ dài bóng là như nhau với mọi vật đứng thẳng cùng một lúc.`),
    ],
    R`Cây cao $12$ m.`,
    [{ expr: "9*2/Rational(3,2)", expect: "12" }],
  ),
  "8/duong-trung-binh": vd(
    R`Hình thang $ABCD$ có đáy $AB=6$ cm và $CD=14$ cm. Tính độ dài đường trung bình của hình thang.`,
    [
      buoc(R`Đường trung bình nối trung điểm hai cạnh bên và song song với hai đáy.`, R`Đây là định nghĩa đường trung bình của hình thang, tương tự với tam giác.`),
      buoc(R`Độ dài bằng nửa tổng hai đáy: $\frac{6+14}{2}=10$ cm.`, R`Kẻ đường chéo chia hình thang thành hai tam giác, mỗi đoạn là đường trung bình của một tam giác.`),
    ],
    R`Đường trung bình dài $10$ cm.`,
    [{ expr: "(6+14)/2", expect: "10" }],
  ),
  "8/phan-giac": vd(
    R`Tam giác $ABC$ có $AB=4$, $AC=6$, phân giác góc $A$ cắt $BC$ tại $D$ với $BD=2$. Tính $DC$ và $BC$.`,
    [
      buoc(R`Theo tính chất đường phân giác: $\frac{DB}{DC}=\frac{AB}{AC}=\frac{4}{6}$.`, R`Phân giác chia cạnh đối diện thành hai đoạn tỉ lệ với hai cạnh kề.`),
      buoc(R`Từ đó $DC=2\cdot\frac{6}{4}=3$, và $BC=2+3=5$.`, R`Điểm $D$ nằm giữa $B$ và $C$ nên $BC$ bằng tổng hai đoạn.`),
    ],
    R`Ta có $DC=3$ và $BC=5$.`,
    [{ expr: "2*Rational(6,4)", expect: "3" }],
  ),
  "8/xs-ti-so": vd(
    R`Một hộp có $5$ bi đỏ, $3$ bi xanh và $2$ bi vàng. Lấy ngẫu nhiên một viên. Tính xác suất viên lấy ra không phải màu đỏ.`,
    [
      buoc(R`Có $10$ viên bi đồng khả năng, trong đó $3+2=5$ viên không đỏ.`, R`Các kết quả thuận lợi là bi xanh hoặc bi vàng.`),
      buoc(R`Xác suất là $\frac{5}{10}=\frac{1}{2}$.`, R`Cũng có thể tính bằng một trừ xác suất lấy được bi đỏ.`),
    ],
    R`Xác suất bằng $\frac{1}{2}$.`,
    [{ expr: "1-Rational(5,10)", expect: "Rational(1,2)" }],
  ),
  "8/xs-thuc-nghiem-8": vd(
    R`Số liệu giả định. Một nhà máy kiểm tra $400$ sản phẩm thấy $12$ sản phẩm lỗi. Ước lượng số sản phẩm lỗi trong lô $5000$ sản phẩm.`,
    [
      buoc(R`Xác suất thực nghiệm của sản phẩm lỗi là $\frac{12}{400}=0{,}03$.`, R`Tỉ lệ quan sát được trên mẫu lớn dùng làm ước lượng cho xác suất.`),
      buoc(R`Ước lượng số lỗi: $5000\cdot 0{,}03=150$ sản phẩm.`, R`Nhân xác suất với số sản phẩm để được số lỗi dự kiến, chỉ là con số gần đúng.`),
    ],
    R`Lô hàng có khoảng $150$ sản phẩm lỗi.`,
    [{ expr: "5000*Rational(12,400)", expect: "150" }],
  ),

  // Lớp 9
  "9/rut-gon-can": vd(
    R`Rút gọn $\sqrt{50}-\sqrt{18}+\sqrt{8}$.`,
    [
      buoc(R`Đưa thừa số ra ngoài căn: $\sqrt{50}=5\sqrt{2}$, $\sqrt{18}=3\sqrt{2}$ và $\sqrt{8}=2\sqrt{2}$.`, R`Tách số dưới căn thành tích của một số chính phương với $2$.`),
      buoc(R`Gộp các căn đồng dạng: $(5-3+2)\sqrt{2}=4\sqrt{2}$.`, R`Các căn cùng là $\sqrt{2}$ nên cộng trừ hệ số như với các hạng tử đồng dạng.`),
    ],
    R`Biểu thức bằng $4\sqrt{2}$.`,
    [{ expr: "sqrt(50)-sqrt(18)+sqrt(8)", expect: "4*sqrt(2)" }],
  ),
  "9/nhan-can": vd(
    R`Trục căn thức ở mẫu của $\frac{2}{\sqrt{3}-1}$.`,
    [
      buoc(R`Nhân cả tử và mẫu với biểu thức liên hợp $\sqrt{3}+1$.`, R`Tích $(\sqrt{3}-1)(\sqrt{3}+1)$ là hiệu hai bình phương nên mất căn.`),
      buoc(R`Mẫu bằng $3-1=2$, nên phân thức bằng $\frac{2(\sqrt{3}+1)}{2}=\sqrt{3}+1$.`, R`Tử và mẫu cùng có thừa số $2$ nên rút gọn được.`),
    ],
    R`Ta có $\frac{2}{\sqrt{3}-1}=\sqrt{3}+1$.`,
    [{ expr: "radsimp(2/(sqrt(3)-1))", expect: "sqrt(3)+1" }],
  ),
  "9/can-bac-ba": vd(
    R`Tính $\sqrt[3]{54}:\sqrt[3]{2}+\sqrt[3]{-125}$.`,
    [
      buoc(R`Gộp phép chia vào một căn: $\sqrt[3]{54:2}=\sqrt[3]{27}=3$.`, R`Thương hai căn bậc ba bằng căn bậc ba của thương.`),
      buoc(R`Ta có $\sqrt[3]{-125}=-5$, nên tổng bằng $3-5=-2$.`, R`Căn bậc ba của số âm là số âm, vì $(-5)^3=-125$.`),
    ],
    R`Kết quả bằng $-2$.`,
    [{ expr: "cbrt(27)-cbrt(125)", expect: "-2" }],
  ),
  "9/y-ax2": vd(
    R`Tìm $a$ để đồ thị $y=ax^2$ đi qua điểm $M(2;-8)$, rồi tính $y$ khi $x=-3$.`,
    [
      buoc(R`Thay tọa độ $M$: $-8=a\cdot 4$, nên $a=-2$.`, R`Điểm thuộc đồ thị thì tọa độ thỏa mãn công thức hàm số.`),
      buoc(R`Khi $x=-3$ thì $y=-2\cdot 9=-18$.`, R`Bình phương của $-3$ là $9$, rồi nhân với hệ số âm.`),
    ],
    R`Ta có $a=-2$, và tại $x=-3$ thì $y=-18$.`,
    [{ expr: "-2*(-3)**2", expect: "-18" }],
  ),
  "9/doi-xung": vd(
    R`Đồ thị $y=\frac{1}{2}x^2$ đi qua điểm $A(4;8)$. Tìm điểm đối xứng với $A$ trên cùng đồ thị, và trục đối xứng của đồ thị.`,
    [
      buoc(R`Trục đối xứng là trục tung, tức đường thẳng $x=0$.`, R`Thay $x$ bằng $-x$ thì $x^2$ không đổi nên $y$ không đổi.`),
      buoc(R`Điểm đối xứng với $A$ là $A'(-4;8)$, kiểm tra: $\frac{1}{2}\cdot 16=8$.`, R`Đối xứng qua trục tung thì hoành độ đổi dấu, tung độ giữ nguyên.`),
    ],
    R`Điểm đối xứng là $A'(-4;8)$, trục đối xứng là trục tung.`,
    [{ expr: "Rational(1,2)*(-4)**2", expect: "8" }],
  ),
  "9/he-hai-an": vd(
    R`Giải hệ $2x+3y=13$ và $3x-2y=0$.`,
    [
      buoc(R`Nhân phương trình đầu với $2$, phương trình sau với $3$: $4x+6y=26$ và $9x-6y=0$.`, R`Làm cho hệ số của $y$ đối nhau để khi cộng thì $y$ triệt tiêu.`),
      buoc(R`Cộng lại: $13x=26$, nên $x=2$, thay vào được $y=3$.`, R`Thay $x$ vào một phương trình bất kì để tìm ẩn còn lại.`),
    ],
    R`Hệ có nghiệm $(x;y)=(2;3)$.`,
    [{ expr: "solve([2*x+3*y-13, 3*x-2*y],[x,y])[y]", expect: "3" }],
  ),
  "9/he-the": vd(
    R`Giải hệ $x-2y=1$ và $3x+y=10$.`,
    [
      buoc(R`Từ phương trình đầu rút $x=1+2y$, thay vào phương trình sau: $3(1+2y)+y=10$.`, R`Rút ẩn có hệ số bằng $1$ để không phải làm việc với phân số.`),
      buoc(R`Giải được $7y=7$, tức $y=1$, nên $x=3$.`, R`Thay giá trị vừa tìm vào biểu thức đã rút để được ẩn kia.`),
    ],
    R`Hệ có nghiệm $(x;y)=(3;1)$.`,
    [{ expr: "solve([x-2*y-1, 3*x+y-10],[x,y])[x]", expect: "3" }],
  ),
  "9/delta": vd(
    R`Giải phương trình $2x^2-5x-3=0$.`,
    [
      buoc(R`Tính biệt thức: $\Delta=(-5)^2-4\cdot 2\cdot(-3)=25+24=49$.`, R`Biệt thức dương nên phương trình có hai nghiệm phân biệt.`),
      buoc(R`Hai nghiệm là $x=\frac{5\pm 7}{4}$, tức $x=3$ và $x=-\frac{1}{2}$.`, R`Vì $\sqrt{49}=7$ nên thay vào công thức nghiệm được hai giá trị.`),
    ],
    R`Phương trình có hai nghiệm $x=3$ và $x=-\frac{1}{2}$.`,
    [{ expr: "solve(2*x**2-5*x-3, x)", expect: "[Rational(-1,2), 3]" }],
  ),
  "9/viete": vd(
    R`Phương trình $x^2-7x+3=0$ có hai nghiệm $x_1$, $x_2$. Không giải phương trình, tính $x_1^2+x_2^2$.`,
    [
      buoc(R`Theo định lí Vi-ét: $x_1+x_2=7$ và $x_1x_2=3$.`, R`Biệt thức $49-12=37$ dương nên phương trình có hai nghiệm.`),
      buoc(R`Biến đổi: $x_1^2+x_2^2=(x_1+x_2)^2-2x_1x_2=49-6=43$.`, R`Biểu thức đối xứng nên viết được theo tổng và tích hai nghiệm.`),
    ],
    R`Ta có $x_1^2+x_2^2=43$.`,
    [{ expr: "7**2-2*3", expect: "43" }],
  ),
  "9/bpt-mot-an": vd(
    R`Giải bất phương trình $3(x-1)\le x+5$.`,
    [
      buoc(R`Phá ngoặc: $3x-3\le x+5$, chuyển vế được $2x\le 8$.`, R`Chuyển một hạng tử sang vế kia thì đổi dấu hạng tử đó, chiều bất đẳng thức giữ nguyên.`),
      buoc(R`Chia hai vế cho $2$: $x\le 4$.`, R`Chia cho số dương thì giữ nguyên chiều của bất phương trình.`),
    ],
    R`Nghiệm của bất phương trình là $x\le 4$.`,
    [{ expr: "solve(3*(x-1)<=x+5, x)", expect: "(x<=4) & (-oo<x)" }],
  ),
  "9/bpt-am": vd(
    R`Giải bất phương trình $5-3x>11$.`,
    [
      buoc(R`Chuyển $5$ sang vế phải: $-3x>6$.`, R`Chuyển vế một hằng số thì đổi dấu hằng số đó.`),
      buoc(R`Chia hai vế cho $-3$ và đổi chiều: $x<-2$.`, R`Nhân hay chia hai vế cho số âm thì thứ tự trên trục số bị lật ngược.`),
    ],
    R`Nghiệm của bất phương trình là $x<-2$.`,
    [{ expr: "solve(5-3*x>11, x)", expect: "(x<-2) & (-oo<x)" }],
  ),
  "9/ti-so-lg": vd(
    R`Tam giác $ABC$ vuông tại $A$ có $AB=5$ và $BC=13$. Tính $\sin B$, $\cos B$ và $\tan B$.`,
    [
      buoc(R`Theo định lí Pythagore: $AC=\sqrt{169-25}=12$.`, R`Cần đủ ba cạnh mới lập được cả ba tỉ số.`),
      buoc(R`Với góc $B$: $\sin B=\frac{12}{13}$, $\cos B=\frac{5}{13}$ và $\tan B=\frac{12}{5}$.`, R`Cạnh đối góc $B$ là $AC$, cạnh kề là $AB$, cạnh huyền là $BC$.`),
    ],
    R`Ta có $\sin B=\frac{12}{13}$, $\cos B=\frac{5}{13}$ và $\tan B=\frac{12}{5}$.`,
    [{ expr: "sqrt(169-25)", expect: "12" }, { expr: "Rational(12,13)**2+Rational(5,13)**2", expect: "1" }],
  ),
  "9/canh-lg": vd(
    R`Một con diều bay với dây dài $50$ m, dây tạo với mặt đất góc $30^\circ$. Diều cao bao nhiêu mét so với tay người cầm?`,
    [
      buoc(R`Dây diều là cạnh huyền, độ cao là cạnh đối với góc $30^\circ$.`, R`Bỏ qua độ chùng của dây, coi dây là một đoạn thẳng.`),
      buoc(R`Độ cao bằng $50\cdot\sin 30^\circ=50\cdot\frac{1}{2}=25$ m.`, R`Cạnh đối bằng cạnh huyền nhân sin của góc.`),
    ],
    R`Diều cao $25$ m so với tay người cầm.`,
    [{ expr: "50*sin(pi/6)", expect: "25" }],
  ),
  "9/tiep-tuyen": vd(
    R`Từ điểm $A$ ngoài đường tròn tâm $O$ bán kính $3$ cm kẻ hai tiếp tuyến $AB$, $AC$ với $AB=4$ cm. Tính $OA$ và chu vi tứ giác $ABOC$.`,
    [
      buoc(R`Tiếp tuyến vuông góc với bán kính tại tiếp điểm, nên $OA=\sqrt{3^2+4^2}=5$ cm.`, R`Tam giác $OBA$ vuông tại $B$ với cạnh huyền là $OA$.`),
      buoc(R`Hai tiếp tuyến cắt nhau tại $A$ nên $AC=AB=4$, chu vi là $4+4+3+3=14$ cm.`, R`Tính chất hai tiếp tuyến cắt nhau cho hai đoạn tiếp tuyến bằng nhau.`),
    ],
    R`Ta có $OA=5$ cm và chu vi tứ giác bằng $14$ cm.`,
    [{ expr: "sqrt(3**2+4**2)", expect: "5" }],
  ),
  "9/goc-noi-tiep": vd(
    R`Cho $AB$ là đường kính của đường tròn tâm $O$, $C$ là một điểm trên đường tròn với $\widehat{CAB}=35^\circ$. Tính $\widehat{ACB}$ và $\widehat{ABC}$.`,
    [
      buoc(R`Góc $\widehat{ACB}$ là góc nội tiếp chắn nửa đường tròn, nên bằng $90^\circ$.`, R`Nửa đường tròn là cung $180^\circ$, góc nội tiếp bằng nửa số đo cung bị chắn.`),
      buoc(R`Trong tam giác vuông $ACB$: $\widehat{ABC}=90^\circ-35^\circ=55^\circ$.`, R`Hai góc nhọn của tam giác vuông phụ nhau.`),
    ],
    R`Ta có $\widehat{ACB}=90^\circ$ và $\widehat{ABC}=55^\circ$.`,
    [{ expr: "90-35", expect: "55" }],
  ),
  "9/tu-giac-noi-tiep": vd(
    R`Cho tam giác $ABC$ có hai đường cao $BD$ và $CE$. Chứng minh bốn điểm $B$, $C$, $D$, $E$ cùng nằm trên một đường tròn.`,
    [
      buoc(R`Ta có $\widehat{BDC}=90^\circ$ và $\widehat{BEC}=90^\circ$.`, R`Đường cao vuông góc với cạnh đối diện tại chân đường cao.`),
      buoc(R`Hai điểm $D$, $E$ cùng nhìn đoạn $BC$ dưới góc vuông, nên cùng nằm trên đường tròn đường kính $BC$.`, R`Mọi điểm nhìn một đoạn thẳng dưới góc vuông đều nằm trên đường tròn có đường kính là đoạn đó.`),
    ],
    R`Tứ giác $BCDE$ nội tiếp đường tròn đường kính $BC$.`,
    [{ expr: "90+90", expect: "180" }],
  ),
  "9/do-dai-cung": vd(
    R`Một bánh xe có bán kính $30$ cm quay được $120^\circ$. Một điểm trên vành bánh xe đi được quãng đường bao nhiêu?`,
    [
      buoc(R`Quãng đường là độ dài cung $120^\circ$: $l=\frac{\pi\cdot 30\cdot 120}{180}$.`, R`Độ dài cung bằng chu vi nhân với tỉ lệ của số đo cung so với $360^\circ$.`),
      buoc(R`Tính được $l=20\pi\approx 62{,}8$ cm.`, R`Lấy $\pi\approx 3{,}14$ để đổi ra số gần đúng.`),
    ],
    R`Điểm đó đi được $20\pi$ cm, khoảng $62{,}8$ cm.`,
    [{ expr: "pi*30*120/180", expect: "20*pi" }],
  ),
  "9/tru": vd(
    R`Một thùng phi hình trụ có đường kính đáy $60$ cm và chiều cao $90$ cm. Thùng chứa được khoảng bao nhiêu lít?`,
    [
      buoc(R`Bán kính đáy là $30$ cm, thể tích $V=\pi\cdot 30^2\cdot 90=81\,000\pi$ cm³.`, R`Thể tích hình trụ bằng diện tích đáy nhân chiều cao.`),
      buoc(R`Đổi đơn vị: $81\,000\pi$ cm³ khoảng $254\,469$ cm³, tức khoảng $254$ lít.`, R`Một lít bằng một nghìn xăng-ti-mét khối.`),
    ],
    R`Thùng chứa được khoảng $254$ lít.`,
    [{ expr: "pi*30**2*90", expect: "81000*pi" }],
  ),
  "9/non-cau": vd(
    R`Một quả bóng hình cầu có đường kính $20$ cm. Tính diện tích mặt cầu và thể tích quả bóng.`,
    [
      buoc(R`Bán kính là $10$ cm, diện tích mặt cầu $4\pi\cdot 10^2=400\pi$ cm².`, R`Diện tích mặt cầu bằng bốn lần diện tích hình tròn lớn của nó.`),
      buoc(R`Thể tích $\frac{4}{3}\pi\cdot 10^3=\frac{4000}{3}\pi$ cm³, khoảng $4189$ cm³.`, R`Thể tích hình cầu tỉ lệ với lập phương của bán kính.`),
    ],
    R`Diện tích mặt cầu là $400\pi$ cm² và thể tích là $\frac{4000}{3}\pi$ cm³.`,
    [{ expr: "Rational(4,3)*pi*10**3", expect: "4000*pi/3" }],
  ),
  "9/tan-so-tuong-doi": vd(
    R`Số liệu giả định. Điểm kiểm tra của $40$ bạn: $6$ bạn điểm dưới $5$, $18$ bạn từ $5$ đến dưới $8$, còn lại từ $8$ trở lên. Lập bảng tần số tương đối.`,
    [
      buoc(R`Nhóm cuối có $40-6-18=16$ bạn.`, R`Tổng các tần số phải bằng cỡ mẫu.`),
      buoc(R`Tần số tương đối lần lượt là $\frac{6}{40}=15\%$, $\frac{18}{40}=45\%$ và $\frac{16}{40}=40\%$.`, R`Chia tần số của từng nhóm cho cỡ mẫu rồi đổi sang phần trăm.`),
    ],
    R`Ba nhóm chiếm lần lượt $15\%$, $45\%$ và $40\%$.`,
    [{ expr: "Rational(16,40)*100", expect: "40" }],
  ),
  "9/tong-tuong-doi": vd(
    R`Số liệu giả định. Một bảng tần số tương đối có ba nhóm: $25\%$, $40\%$ và $x\%$. Cỡ mẫu là $60$. Tìm $x$ và số phần tử của nhóm thứ ba.`,
    [
      buoc(R`Tổng các tần số tương đối bằng $100\%$, nên $x=100-25-40=35$.`, R`Mỗi phần tử của mẫu thuộc đúng một nhóm.`),
      buoc(R`Số phần tử nhóm thứ ba là $60\cdot 35\%=21$.`, R`Tần số bằng cỡ mẫu nhân với tần số tương đối.`),
    ],
    R`Ta có $x=35$ và nhóm thứ ba có $21$ phần tử.`,
    [{ expr: "60*Rational(35,100)", expect: "21" }],
  ),
  "9/khong-gian-mau-9": vd(
    R`Gieo đồng thời hai con xúc xắc cân đối. Tính xác suất tổng số chấm bằng $7$.`,
    [
      buoc(R`Không gian mẫu có $6\cdot 6=36$ kết quả đồng khả năng.`, R`Mỗi con có sáu mặt, và kết quả của hai con là độc lập.`),
      buoc(R`Các cặp có tổng $7$ là $(1;6)$, $(2;5)$, $(3;4)$, $(4;3)$, $(5;2)$, $(6;1)$, tức $6$ kết quả, nên xác suất là $\frac{6}{36}=\frac{1}{6}$.`, R`Hai con phân biệt nên $(1;6)$ và $(6;1)$ là hai kết quả khác nhau.`),
    ],
    R`Xác suất bằng $\frac{1}{6}$.`,
    [{ expr: "Rational(6,36)", expect: "Rational(1,6)" }],
  ),
  "9/on10-vi-et": vd(
    R`Cho phương trình $x^2-2(m+1)x+m^2=0$. Tìm $m$ để phương trình có hai nghiệm phân biệt và $x_1+x_2=x_1x_2$.`,
    [
      buoc(R`Điều kiện có hai nghiệm phân biệt: $\Delta'=(m+1)^2-m^2=2m+1>0$, tức $m>-\frac{1}{2}$.`, R`Hệ số $b$ chẵn nên dùng biệt thức thu gọn cho gọn.`),
      buoc(R`Theo Vi-ét: $x_1+x_2=2(m+1)$ và $x_1x_2=m^2$. Lập phương trình $2m+2=m^2$, tức $m^2-2m-2=0$, nên $m=1\pm\sqrt{3}$.`, R`Thay tổng và tích vào hệ thức đã cho để được phương trình theo $m$.`),
      buoc(R`Đối chiếu điều kiện: $1-\sqrt{3}\approx -0{,}73<-\frac{1}{2}$ bị loại.`, R`Giá trị tìm được phải thỏa điều kiện có nghiệm ở bước đầu.`),
    ],
    R`Giá trị cần tìm là $m=1+\sqrt{3}$.`,
    [{ expr: "solve(m**2-2*m-2, m)", expect: "[1-sqrt(3), 1+sqrt(3)]" }],
  ),
  "9/on10-lap-he": vd(
    R`Hai vòi nước cùng chảy vào một bể cạn thì sau $6$ giờ đầy. Nếu vòi thứ nhất chảy $2$ giờ rồi vòi thứ hai chảy $3$ giờ thì được $\frac{2}{5}$ bể. Mỗi vòi chảy riêng thì bao lâu đầy bể?`,
    [
      buoc(R`Gọi $u$, $v$ là phần bể mỗi vòi chảy được trong một giờ. Ta có $u+v=\frac{1}{6}$ và $2u+3v=\frac{2}{5}$.`, R`Đặt ẩn là năng suất mỗi giờ thì các phương trình đều bậc nhất.`),
      buoc(R`Thế $u=\frac{1}{6}-v$ vào phương trình sau: $\frac{1}{3}+v=\frac{2}{5}$, nên $v=\frac{1}{15}$ và $u=\frac{1}{10}$.`, R`Nhân phương trình đầu với $2$ rồi trừ cũng cho cùng kết quả.`),
    ],
    R`Vòi thứ nhất chảy riêng mất $10$ giờ, vòi thứ hai mất $15$ giờ.`,
    [{ expr: "solve([u+v-Rational(1,6), 2*u+3*v-Rational(2,5)],[u,v])[u]", expect: "Rational(1,10)" }],
  ),
  "9/on10-hinh": vd(
    R`Cho đường tròn tâm $O$, dây $AB$ không đi qua tâm, $M$ là trung điểm $AB$. Biết bán kính $10$ cm và $AB=16$ cm. Tính khoảng cách từ $O$ đến $AB$.`,
    [
      buoc(R`Đường kính đi qua trung điểm của dây không qua tâm thì vuông góc với dây, nên $OM\perp AB$.`, R`Tam giác $OAB$ cân tại $O$, đường trung tuyến $OM$ cũng là đường cao.`),
      buoc(R`Trong tam giác vuông $OMA$: $OM=\sqrt{10^2-8^2}=6$ cm.`, R`Ta có $MA$ bằng nửa dây, tức $8$ cm, và $OA$ là bán kính.`),
    ],
    R`Khoảng cách từ $O$ đến $AB$ bằng $6$ cm.`,
    [{ expr: "sqrt(10**2-8**2)", expect: "6" }],
  ),
};
