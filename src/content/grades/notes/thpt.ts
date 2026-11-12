import type { NoteBook } from "./types.ts";
import { note } from "./types.ts";

const R = String.raw;

export const thptNotes: NoteBook = {
  // Lớp 10
  "10/menh-de-bai": note(
    R`Toán học chỉ lập luận trên những câu có giá trị đúng sai rõ ràng. Phủ định đổi đúng thành sai và sai thành đúng, nên phủ định hai lần thì trở về mệnh đề ban đầu.`,
    R`Phủ định "mọi" bằng "mọi... không". Phủ định của "mọi số tự nhiên đều chẵn" là "có ít nhất một số tự nhiên không chẵn".`,
  ),
  "10/phep-tap": note(
    R`Cộng $n(A)$ với $n(B)$ thì các phần tử thuộc cả hai tập bị đếm hai lần. Trừ đi $n(A\cap B)$ một lần để mỗi phần tử được đếm đúng một lần.`,
    R`Cộng thẳng $20+15$ khi có bạn học cả hai môn. Tám bạn chung đã bị đếm lặp, nên số bạn học ít nhất một môn là $27$.`,
  ),
  "10/bpt-hai": note(
    R`Đường thẳng $ax+by=c$ chia mặt phẳng thành hai nửa. Biểu thức $ax+by-c$ giữ một dấu trên mỗi nửa, vì muốn đổi dấu thì phải đi qua giá trị $0$, tức là băng qua đường thẳng.`,
    R`Gạch nhầm nửa mặt phẳng. Thử một điểm không nằm trên biên, thường là gốc tọa độ, rồi mới quyết định miền nào là miền nghiệm.`,
  ),
  "10/he-bpt": note(
    R`Một điểm là nghiệm của hệ khi thỏa mãn mọi bất phương trình cùng lúc, nên miền nghiệm là phần chung của các nửa mặt phẳng. Biểu thức bậc nhất $F=ax+by$ trên một miền đa giác đạt giá trị lớn nhất và nhỏ nhất tại các đỉnh.`,
    R`Lấy giao của hai đường biên làm đỉnh mà không kiểm tra. Giao điểm đó phải thỏa cả các bất phương trình còn lại mới là đỉnh của miền nghiệm.`,
  ),
  "10/do-thi": note(
    R`Viết $ax^2+bx+c=a\left(x+\frac{b}{2a}\right)^2-\frac{\Delta}{4a}$. Bình phương nhỏ nhất bằng $0$ khi $x=-\frac{b}{2a}$, nên đó là hoành độ đỉnh và $-\frac{\Delta}{4a}$ là tung độ đỉnh.`,
    R`Quên dấu trừ trong hoành độ đỉnh. Với $y=x^2-4x+1$ thì $-\frac{b}{2a}=2$, không phải $-2$.`,
  ),
  "10/dau-tam-thuc": note(
    R`Khi có hai nghiệm, $f(x)=a(x-x_1)(x-x_2)$. Ở giữa hai nghiệm, hai thừa số trái dấu nên tích âm và $f$ trái dấu với $a$. Ở ngoài hai nghiệm, hai thừa số cùng dấu nên $f$ cùng dấu với $a$.`,
    R`Thuộc lòng "trong trái, ngoài cùng" rồi dùng cả khi $\Delta\le 0$. Lúc đó không có khoảng ở giữa, tam thức cùng dấu với $a$ tại mọi $x$ không phải nghiệm kép.`,
  ),
  "10/bpt-bac-hai": note(
    R`Giải bất phương trình là hỏi tam thức mang dấu nào ở đâu. Bảng xét dấu đã trả lời câu hỏi đó trên từng khoảng, chỉ cần chọn các khoảng có dấu phù hợp.`,
    R`Giải như phương trình rồi viết $x\le 2$ hoặc $x\le 3$. Tập nghiệm của $x^2-5x+6\le 0$ là đoạn $[2;3]$, đọc từ bảng dấu.`,
  ),
  "10/quy-ve-bac-hai": note(
    R`Bình phương hai vế có thể sinh thêm nghiệm, vì $A^2=B^2$ đúng cả khi $A=-B$. Thử lại vào phương trình ban đầu để loại những nghiệm sinh thêm đó.`,
    R`Bình phương rồi nhận hết các nghiệm. Phương trình $\sqrt{x+1}=x-1$ sau khi bình phương có $x=0$ và $x=3$, nhưng $x=0$ cho vế phải âm nên bị loại.`,
  ),
  "10/gtlg": note(
    R`Trên nửa đường tròn đơn vị, hai góc $\alpha$ và $180^\circ-\alpha$ ứng với hai điểm đối xứng nhau qua trục tung. Hai điểm đó có cùng tung độ và hoành độ đối nhau, nên sin bằng nhau còn côsin đối nhau.`,
    R`Cho côsin của góc tù một giá trị dương. Góc lớn hơn $90^\circ$ có điểm nằm bên trái trục tung, nên côsin âm.`,
  ),
  "10/dinh-li-sin": note(
    R`Vẽ đường kính qua một đỉnh của tam giác nội tiếp. Góc nội tiếp chắn nửa đường tròn là góc vuông, và trong tam giác vuông ấy cạnh $a$ bằng đường kính $2R$ nhân với $\sin A$.`,
    R`Ghép cạnh với sin của góc kề. Cạnh $a$ luôn đi với góc $A$ đối diện nó.`,
  ),
  "10/giai-tam-giac": note(
    R`Định lí côsin là định lí Pythagore có thêm số hạng hiệu chỉnh $-2ab\cos C$. Khi $C=90^\circ$ thì $\cos C=0$ và công thức trở về $c^2=a^2+b^2$.`,
    R`Dùng góc không xen giữa hai cạnh đã biết. Công thức côsin và công thức diện tích đều cần đúng góc tạo bởi hai cạnh đó.`,
  ),
  "10/tong-hieu": note(
    R`Vectơ $(x;y)$ là phép dời $x$ đơn vị theo trục hoành và $y$ đơn vị theo trục tung. Dời liên tiếp theo $\vec u$ rồi $\vec v$ thì độ dời theo mỗi trục cộng lại, nên tọa độ cộng theo từng thành phần.`,
    R`Lấy tọa độ điểm đầu trừ điểm cuối. Vectơ $\overrightarrow{AB}$ có tọa độ bằng tọa độ của $B$ trừ tọa độ của $A$.`,
  ),
  "10/tich-vh": note(
    R`Áp dụng định lí côsin cho tam giác tạo bởi $\vec u$, $\vec v$ và $\vec u-\vec v$ thì được $|\vec u||\vec v|\cos(\vec u,\vec v)=x_1x_2+y_1y_2$. Khi hai vectơ vuông góc, côsin bằng $0$ nên tích vô hướng bằng $0$.`,
    R`Viết kết quả tích vô hướng thành một vectơ. Tích vô hướng là một số, ví dụ $(1;2)\cdot(3;-1)=3-2=1$.`,
  ),
  "10/duong-thang": note(
    R`Hai điểm $M$, $M_0$ cùng thuộc đường thẳng thì $a(x-x_0)+b(y-y_0)=0$, tức $\vec n=(a;b)$ vuông góc với $\overrightarrow{M_0M}$. Khoảng cách từ một điểm đến đường thẳng là độ dài hình chiếu của vectơ nối lên phương pháp tuyến, nên có mẫu $\sqrt{a^2+b^2}$.`,
    R`Lấy $(a;b)$ làm vectơ chỉ phương. Vectơ $(a;b)$ là pháp tuyến, còn một chỉ phương là $(-b;a)$ hoặc $(b;-a)$.`,
  ),
  "10/duong-tron": note(
    R`Đường tròn là tập hợp các điểm cách tâm một khoảng $R$. Viết điều kiện khoảng cách bằng $R$ theo tọa độ rồi bình phương hai vế là ra phương trình.`,
    R`Đọc sai dấu của tâm và quên lấy căn bán kính. Phương trình $(x-1)^2+(y+2)^2=9$ có tâm $(1;-2)$ và bán kính $3$.`,
  ),
  "10/ba-conic": note(
    R`Mỗi đường được định nghĩa bằng khoảng cách: elip có tổng khoảng cách tới hai tiêu điểm không đổi, hypebol có hiệu khoảng cách không đổi, parabol có khoảng cách tới tiêu điểm bằng khoảng cách tới đường chuẩn. Viết các điều kiện ấy theo tọa độ thì được ba phương trình chính tắc.`,
    R`Lấy $a^2$ và $b^2$ làm độ dài bán trục. Elip $\frac{x^2}{9}+\frac{y^2}{4}=1$ có bán trục lớn $3$ và bán trục bé $2$.`,
  ),
  "10/quy-tac": note(
    R`Với mỗi cách làm bước một có đủ mọi cách làm bước hai, nên số cách nhân với nhau. Khi các phương án không thể xảy ra cùng lúc, mỗi cách thuộc đúng một phương án nên số cách cộng lại.`,
    R`Cộng khi công việc gồm các bước nối tiếp. Đi từ $A$ qua $B$ đến $C$ có $2\cdot 3=6$ cách, không phải $2+3=5$.`,
  ),
  "10/hoan-vi": note(
    R`Vị trí thứ nhất có $n$ cách chọn, vị trí thứ hai còn $n-1$ cách, cứ thế giảm dần. Quy tắc nhân cho $n!$ khi xếp hết và $A_n^k$ khi chỉ xếp $k$ vị trí.`,
    R`Dùng chỉnh hợp khi thứ tự không có ý nghĩa. Chọn ra một nhóm mà không xếp chỗ, không phân vai thì dùng tổ hợp.`,
  ),
  "10/to-hop-bai": note(
    R`Mỗi nhóm $k$ phần tử xếp được thành $k!$ thứ tự khác nhau, và các thứ tự ấy đều được chỉnh hợp đếm riêng. Chia $A_n^k$ cho $k!$ để mỗi nhóm chỉ còn được đếm một lần.`,
    R`Quên chia cho $k!$. Chọn $3$ bạn từ $10$ bạn có $\frac{10\cdot 9\cdot 8}{3!}=120$ cách, không phải $720$.`,
  ),
  "10/nhi-thuc": note(
    R`Khai triển $(a+b)^n$ là nhân $n$ ngoặc với nhau, mỗi ngoặc góp $a$ hoặc $b$. Số hạng $a^{n-k}b^k$ xuất hiện một lần cho mỗi cách chọn $k$ ngoặc góp $b$, tức $C_n^k$ lần.`,
    R`Quên lũy thừa của hệ số đi kèm biến. Trong $(1+2x)^5$, hệ số của $x^2$ là $C_5^2\cdot 2^2=40$, không phải $10$.`,
  ),
  "10/sai-so": note(
    R`Sai số tuyệt đối đo khoảng cách giữa số gần đúng và số đúng trên trục số. Sai số tương đối so khoảng cách ấy với độ lớn của số đúng, nên so sánh được độ chính xác của những phép đo lớn nhỏ khác nhau.`,
    R`So sánh độ chính xác chỉ bằng sai số tuyệt đối. Sai $1$ mét khi đo $1$ kilômét chính xác hơn nhiều so với sai $1$ mét khi đo $10$ mét.`,
  ),
  "10/trung-vi": note(
    R`Trung vị chia dãy đã sắp xếp thành hai nửa có số phần tử bằng nhau, các tứ phân vị chia tiếp mỗi nửa làm đôi. Các mốc này dựa vào vị trí nên ít bị kéo lệch bởi vài giá trị quá lớn hoặc quá bé.`,
    R`Tìm trung vị khi chưa sắp xếp dãy. Phải xếp theo thứ tự tăng dần trước, rồi mới lấy số đứng giữa.`,
  ),
  "10/phuong-sai": note(
    R`Mỗi độ lệch $x_i-\bar x$ cho biết một giá trị cách số trung bình bao xa. Bình phương để độ lệch âm và dương không triệt tiêu nhau, rồi lấy trung bình để được một số đo độ phân tán.`,
    R`Quên bình phương, hoặc quên lấy căn khi đề hỏi độ lệch chuẩn. Tổng các độ lệch chưa bình phương luôn bằng $0$ nên không đo được gì.`,
  ),
  "10/liet-ke": note(
    R`Hai đồng xu phân biệt cho bốn kết quả đồng khả năng là SS, SN, NS và NN. Biến cố hai mặt ngửa chỉ có một kết quả thuận lợi trong bốn kết quả đó.`,
    R`Coi SN và NS là một kết quả rồi kết luận có ba kết quả đồng khả năng. Kết quả một sấp một ngửa xảy ra theo hai cách nên có xác suất $\frac{1}{2}$.`,
  ),
  "10/bien-co-doi": note(
    R`Mỗi kết quả hoặc thuộc $A$ hoặc thuộc $\overline A$, không thuộc cả hai. Hai xác suất vì thế cộng lại bằng $1$.`,
    R`Bỏ qua biến cố đối với câu hỏi "ít nhất một". Tính xác suất không có lần nào rồi lấy $1$ trừ đi thường nhanh hơn nhiều so với xét từng trường hợp.`,
  ),

  // Lớp 11
  "11/goc-lg": note(
    R`Trên đường tròn đơn vị, mỗi góc ứng với một điểm, và quay thêm đủ một vòng $2\pi$ thì trở về đúng điểm đó. Sin và côsin là tọa độ của điểm ấy nên lặp lại sau mỗi vòng.`,
    R`Để máy tính ở chế độ độ khi góc cho bằng rađian. Góc $\frac{5\pi}{6}$ rađian là $150^\circ$.`,
  ),
  "11/cong-thuc": note(
    R`Công thức cộng suy ra từ tích vô hướng của hai vectơ đơn vị tạo với trục hoành các góc $a$ và $b$. Cho $b=a$ trong công thức cộng thì được các công thức nhân đôi.`,
    R`Viết $\sin(a+b)=\sin a+\sin b$. Thử $a=b=90^\circ$: vế trái bằng $0$ còn vế phải bằng $2$.`,
  ),
  "11/do-thi-lg": note(
    R`Sin là tung độ của một điểm chạy trên đường tròn đơn vị, nên luôn nằm trong đoạn $[-1;1]$ và lặp lại sau mỗi vòng $2\pi$. Nhân với $a$ dương là kéo giãn đồ thị theo chiều dọc $a$ lần.`,
    R`Cho rằng $y=\sin 2x$ có chu kỳ $4\pi$. Hệ số nhân với $x$ làm đồ thị co lại, chu kỳ là $\frac{2\pi}{2}=\pi$.`,
  ),
  "11/pt-lg": note(
    R`Đường thẳng $y=m$ cắt đường tròn đơn vị tại hai điểm đối xứng qua trục tung, ứng với hai góc $\alpha$ và $\pi-\alpha$. Mỗi điểm lặp lại sau mỗi vòng, nên phải cộng thêm $k\cdot 2\pi$.`,
    R`Chỉ viết họ nghiệm $x=\alpha+k\cdot 2\pi$ cho phương trình sin. Còn họ thứ hai $x=\pi-\alpha+k\cdot 2\pi$.`,
  ),
  "11/cap-so": note(
    R`Viết tổng cấp số cộng theo chiều xuôi và chiều ngược rồi cộng lại: mỗi cặp số hạng đều có tổng $u_1+u_n$, và có $n$ cặp như vậy. Với cấp số nhân, lấy $S_n$ trừ $qS_n$ thì các số hạng ở giữa triệt tiêu, chỉ còn $u_1(1-q^n)$.`,
    R`Dùng $u_n=u_1+nd$. Từ số hạng thứ nhất đến số hạng thứ $n$ chỉ có $n-1$ bước nhảy.`,
  ),
  "11/don-dieu": note(
    R`Xét hiệu $u_{n+1}-u_n$: hiệu luôn dương thì mỗi số hạng lớn hơn số hạng đứng trước nó. Với $u_n=1-\frac{1}{n}$, hiệu bằng $\frac{1}{n(n+1)}$ luôn dương, và mọi số hạng nằm trong nửa khoảng $[0;1)$.`,
    R`Kết luận dãy tăng sau khi thử vài số hạng đầu. Phải chứng minh hiệu dương với mọi $n$.`,
  ),
  "11/gh-day": note(
    R`Tổng $n$ số hạng đầu là $u_1\frac{1-q^n}{1-q}$. Khi $|q|<1$ thì $q^n$ tiến tới $0$, nên tổng tiến tới $\frac{u_1}{1-q}$.`,
    R`Dùng công thức tổng vô hạn khi $|q|\ge 1$. Với $q=2$ các số hạng lớn dần và tổng không tiến tới một số hữu hạn nào.`,
  ),
  "11/gh-ham": note(
    R`Giới hạn tại $2$ chỉ quan tâm các giá trị của $x$ gần $2$ nhưng khác $2$. Với những $x$ đó, $\frac{x^2-4}{x-2}$ và $x+2$ bằng nhau, nên hai giới hạn bằng nhau.`,
    R`Thay số ra $\frac{0}{0}$ rồi kết luận giới hạn không tồn tại. Dạng này mới chỉ báo rằng cần biến đổi tiếp.`,
  ),
  "11/lien-tuc": note(
    R`Liên tục nghĩa là giá trị của hàm tại điểm khớp với xu hướng của các giá trị xung quanh, đồ thị không bị đứt hay nhảy tại đó. Tổng, tích của các hàm liên tục vẫn liên tục, nên đa thức liên tục tại mọi điểm.`,
    R`Chỉ kiểm tra hàm số có xác định tại điểm đó. Còn phải có giới hạn tồn tại và bằng đúng giá trị của hàm.`,
  ),
  "11/phep-tinh-log": note(
    R`Logarit là phép ngược của lũy thừa: $\log_a b$ là số mũ cần đặt lên $a$ để được $b$. Vì $a^m\cdot a^n=a^{m+n}$ nên logarit đổi phép nhân thành phép cộng.`,
    R`Viết $\log_a(b+c)=\log_a b+\log_a c$. Quy tắc đúng là $\log_a(bc)=\log_a b+\log_a c$ với $b$ và $c$ dương.`,
  ),
  "11/ham-mu": note(
    R`Khi $a>1$, tăng $x$ thêm một lượng dương là nhân $a^x$ với một số lớn hơn $1$, nên hàm số mũ đồng biến. Hàm logarit là hàm ngược của hàm mũ nên đồ thị đối xứng qua đường $y=x$ và cũng đồng biến.`,
    R`Quên tập xác định của logarit. Biểu thức $\log_a x$ chỉ có nghĩa khi $x>0$.`,
  ),
  "11/pt-log": note(
    R`Hàm mũ và hàm logarit đơn điệu nên mỗi giá trị chỉ đạt được tại một điểm, do đó bỏ được cùng một hàm ở hai vế. Với cơ số lớn hơn $1$ hàm đồng biến nên chiều bất phương trình được giữ nguyên.`,
    R`Giữ nguyên chiều khi cơ số nằm giữa $0$ và $1$. Khi đó hàm nghịch biến và chiều bất phương trình phải đổi ngược.`,
  ),
  "11/dinh-nghia-dh": note(
    R`Thương $\frac{f(x_0+h)-f(x_0)}{h}$ là hệ số góc của cát tuyến qua hai điểm của đồ thị. Khi $h$ tiến tới $0$, cát tuyến xoay dần về tiếp tuyến, nên đạo hàm là hệ số góc của tiếp tuyến.`,
    R`Thay $h=0$ ngay từ đầu để nhận $\frac{0}{0}$. Phải rút gọn thương trước, rồi mới cho $h$ tiến tới $0$.`,
  ),
  "11/tich-thuong": note(
    R`Hình chữ nhật có hai cạnh $u$ và $v$ cùng thay đổi thì phần diện tích tăng thêm gồm hai dải $u'v$ và $uv'$, còn góc nhỏ thì không đáng kể. Với hàm hợp, tốc độ thay đổi nhân dồn qua từng lớp.`,
    R`Viết $(uv)'=u'v'$ hoặc quên nhân đạo hàm của hàm bên trong. Đạo hàm của $(2x+1)^2$ là $2(2x+1)\cdot 2$.`,
  ),
  "11/dh-lg-mu": note(
    R`Tại $x=0$ đồ thị $\sin x$ đi lên với hệ số góc $1$, đúng bằng $\cos 0$, và tại đỉnh $x=\frac{\pi}{2}$ tiếp tuyến nằm ngang, đúng bằng $\cos\frac{\pi}{2}=0$. Số $e$ được chọn để hàm $e^x$ có tốc độ tăng đúng bằng giá trị của chính nó.`,
    R`Quên dấu trừ trong đạo hàm của côsin. Đạo hàm của $\cos x$ là $-\sin x$.`,
  ),
  "11/cap-hai": note(
    R`Tiếp tuyến là đường thẳng đi qua điểm $(x_0;f(x_0))$ và có hệ số góc $f'(x_0)$. Viết phương trình đường thẳng qua một điểm với hệ số góc cho trước là ra công thức.`,
    R`Để hệ số góc ở dạng $f'(x)$ còn chứa $x$. Phải thay $x_0$ vào để hệ số góc là một số cụ thể.`,
  ),
  "11/song-song": note(
    R`Nếu $d$ song song với một đường thẳng $a$ nằm trong $(P)$ mà lại cắt $(P)$, thì giao điểm phải nằm trên $a$, trái với giả thiết song song. Vì vậy $d$ không có điểm chung với $(P)$.`,
    R`Cho rằng hai đường thẳng không cắt nhau trong không gian thì song song. Chúng còn có thể chéo nhau, tức không cùng nằm trong một mặt phẳng nào.`,
  ),
  "11/vuong-goc": note(
    R`Hai đường thẳng cắt nhau xác định phương của cả mặt phẳng: mọi vectơ trong mặt phẳng viết được qua hai vectơ chỉ phương của chúng. Vuông góc với cả hai thì tích vô hướng với mọi vectơ trong mặt phẳng đều bằng $0$.`,
    R`Kết luận đường thẳng vuông góc với mặt phẳng khi mới chỉ ra một đường, hoặc hai đường song song. Cần hai đường cắt nhau nằm trong mặt phẳng.`,
  ),
  "11/goc-kc": note(
    R`Hai đường thẳng cùng vuông góc với giao tuyến tại một điểm đo đúng độ mở giữa hai mặt, giống như đo góc mở của một quyển sách bằng hai mép giấy vuông góc với gáy. Khoảng cách luôn đo theo đoạn vuông góc vì đó là đoạn ngắn nhất.`,
    R`Lấy góc giữa hai đường thẳng bất kỳ nằm trong hai mặt. Cả hai đường phải vuông góc với giao tuyến tại cùng một điểm.`,
  ),
  "11/the-tich-11": note(
    R`Lăng trụ là các lát đáy bằng nhau xếp chồng, nên thể tích là diện tích đáy nhân chiều cao. Một lăng trụ tam giác cắt được thành ba hình chóp có thể tích bằng nhau, nên hình chóp bằng một phần ba lăng trụ cùng đáy và cùng chiều cao.`,
    R`Dùng cạnh bên của hình chóp hoặc lăng trụ xiên làm chiều cao. Chiều cao là khoảng cách vuông góc từ đỉnh tới mặt đáy.`,
  ),
  "11/tb-nhom": note(
    R`Khi số liệu đã gộp nhóm, giá trị riêng của từng phần tử không còn. Coi mọi phần tử của một nhóm nằm ở điểm giữa nhóm cho ta một ước lượng hợp lí của số trung bình.`,
    R`Lấy trung bình các giá trị đại diện mà bỏ qua tần số. Nhóm có nhiều phần tử hơn phải được tính nặng hơn.`,
  ),
  "11/tu-phan-vi-11": note(
    R`Tần số tích lũy đếm số phần tử từ đầu đến hết mỗi nhóm. Nhóm nào làm con số ấy lần đầu vượt một phần tư cỡ mẫu thì phần tử ở vị trí một phần tư nằm trong nhóm đó.`,
    R`So mốc $\frac{n}{4}$ với tần số của từng nhóm riêng lẻ. Phải so với tần số tích lũy.`,
  ),
  "11/hop-giao": note(
    R`Biến cố là tập con của không gian mẫu, nên hợp và giao của biến cố chính là hợp và giao của tập hợp. Công thức đếm phần tử của hợp hai tập vì thế chuyển nguyên sang xác suất.`,
    R`Nhầm "hoặc" với "và". Biến cố hợp cần ít nhất một trong hai xảy ra, biến cố giao cần cả hai cùng xảy ra.`,
  ),
  "11/quy-tac-cong": note(
    R`Cộng $P(A)$ với $P(B)$ thì phần chung $A\cap B$ được tính hai lần, nên phải trừ đi một lần. Khi hai biến cố xung khắc, phần chung rỗng và không có gì để trừ.`,
    R`Cộng thẳng hai xác suất khi hai biến cố có thể cùng xảy ra. Kết quả lúc đó bị thừa, có khi còn lớn hơn $1$.`,
  ),
  "11/doc-lap": note(
    R`Độc lập nghĩa là biết $B$ xảy ra không làm đổi khả năng của $A$. Trong những lần $B$ xảy ra, $A$ vẫn chiếm đúng tỉ lệ $P(A)$, nên cả hai cùng xảy ra với xác suất $P(A)P(B)$.`,
    R`Nhầm độc lập với xung khắc. Hai biến cố xung khắc có xác suất dương thì không độc lập, vì biến cố này xảy ra sẽ loại hẳn biến cố kia.`,
  ),

  // Lớp 12
  "12/cuc-tri": note(
    R`Tại một điểm cực trị có đạo hàm, tiếp tuyến phải nằm ngang, nếu không thì hàm số còn tăng tiếp về một phía. Đạo hàm đổi dấu từ dương sang âm nghĩa là hàm số đang tăng rồi chuyển sang giảm, nên điểm đó là cực đại.`,
    R`Giải $f'(x)=0$ rồi coi mọi nghiệm là cực trị. Hàm $g(x)=x^3$ có $g'(0)=0$ nhưng đạo hàm không đổi dấu, nên $x=0$ không phải điểm cực trị.`,
  ),
  "12/gtln": note(
    R`Trên một đoạn, giá trị lớn nhất chỉ có thể nằm ở đầu mút hoặc ở một điểm bên trong. Nếu nằm bên trong và hàm có đạo hàm thì đạo hàm tại đó bằng $0$, nên chỉ cần so sánh một số hữu hạn giá trị.`,
    R`Quên tính giá trị tại hai đầu mút, hoặc tính cả ở điểm dừng nằm ngoài đoạn. Chỉ xét các điểm thuộc đoạn đã cho.`,
  ),
  "12/tiem-can": note(
    R`Tiệm cận là đường thẳng mà đồ thị tiến sát khi điểm trên đồ thị chạy ra xa vô tận. Tiệm cận ngang mô tả $y$ khi $x$ rất lớn, tiệm cận đứng mô tả chỗ $y$ tăng hoặc giảm không giới hạn.`,
    R`Kết luận mọi nghiệm của mẫu đều cho tiệm cận đứng. Nếu tử cũng bằng $0$ tại đó thì phải rút gọn và tính giới hạn trước.`,
  ),
  "12/bbt": note(
    R`Dấu của đạo hàm cho biết hàm số tăng hay giảm trên từng khoảng. Ghi dấu ấy cùng các giá trị tại điểm chuyển tiếp là đủ để hình dung dáng điệu của đồ thị.`,
    R`Xét dấu đạo hàm bằng cách thử một điểm rồi suy cho mọi khoảng. Mỗi khoảng giữa hai nghiệm liên tiếp của đạo hàm phải được xét riêng.`,
  ),
  "12/nguyen-ham": note(
    R`Hai hàm số có cùng đạo hàm trên một khoảng thì hiệu của chúng có đạo hàm bằng $0$, nên hiệu ấy là hằng số. Vì thế mọi nguyên hàm của $f$ trên khoảng đó đều có dạng $F(x)+C$.`,
    R`Quên hằng số $C$, hoặc nhầm chiều công thức lũy thừa. Nguyên hàm của $x^n$ với $n\neq -1$ là $\frac{x^{n+1}}{n+1}+C$.`,
  ),
  "12/tich-phan-bai": note(
    R`Hàm số $S(x)$ đo diện tích dưới đồ thị từ $a$ đến $x$ có tốc độ tăng đúng bằng chiều cao $f(x)$, nên $S$ là một nguyên hàm của $f$. Diện tích đến $b$ vì thế bằng $F(b)-F(a)$.`,
    R`Tính $F(a)-F(b)$. Luôn lấy giá trị tại cận trên trừ giá trị tại cận dưới.`,
  ),
  "12/dien-tich": note(
    R`Tích phân cộng các dải hẹp có chiều cao $f(x)$ và bề rộng $\mathrm{d}x$. Khi $f$ không âm, mỗi dải đóng góp đúng phần diện tích của nó.`,
    R`Lấy tích phân trực tiếp khi đồ thị có phần nằm dưới trục hoành. Phần đó cho giá trị âm, nên diện tích phải tính bằng tích phân của $|f(x)|$.`,
  ),
  "12/the-tich-tp": note(
    R`Cắt khối tròn xoay bằng các mặt phẳng vuông góc với trục hoành thì mỗi lát là một đĩa tròn bán kính $f(x)$, có diện tích $\pi\bigl(f(x)\bigr)^2$. Cộng thể tích các đĩa mỏng bằng tích phân.`,
    R`Quên bình phương hàm số hoặc quên nhân với $\pi$. Công thức là $\pi\int_a^b\bigl(f(x)\bigr)^2\,\mathrm{d}x$.`,
  ),
  "12/vecto-kg": note(
    R`Độ dài trong không gian có được khi dùng định lí Pythagore hai lần: một lần trong mặt phẳng đáy, một lần với chiều cao. Tích vô hướng vẫn bằng tích hai độ dài nhân côsin góc xen giữa, giống như trong mặt phẳng.`,
    R`Bỏ sót tọa độ thứ ba. Vectơ $(1;2;2)$ có độ dài $\sqrt{1+4+4}=3$.`,
  ),
  "12/mat-phang": note(
    R`Điểm $M$ thuộc mặt phẳng khi vectơ $\overrightarrow{M_0M}$ nằm trong mặt phẳng, tức vuông góc với pháp tuyến. Viết tích vô hướng $\vec n\cdot\overrightarrow{M_0M}=0$ theo tọa độ là ra phương trình.`,
    R`Dùng vectơ chỉ phương của một đường nằm trong mặt phẳng làm pháp tuyến. Pháp tuyến phải vuông góc với mặt phẳng.`,
  ),
  "12/duong-cau": note(
    R`Đi từ $M_0$ theo hướng $\vec u$ với mọi hệ số $t$ thì quét hết đường thẳng, nên mỗi điểm của đường thẳng ứng với đúng một giá trị $t$. Mặt cầu là điều kiện khoảng cách tới tâm bằng $R$ viết theo tọa độ.`,
    R`Viết vế phải của phương trình mặt cầu là $R$. Vế phải là $R^2$, nên mặt cầu bán kính $3$ có vế phải bằng $9$.`,
  ),
  "12/goc-kc-12": note(
    R`Khoảng cách từ một điểm đến mặt phẳng là độ dài hình chiếu của một vectơ nối lên pháp tuyến. Chia cho độ dài pháp tuyến để chuẩn hóa, và lấy trị tuyệt đối vì khoảng cách không âm.`,
    R`Quên chia cho độ dài của pháp tuyến. Kết quả lúc đó thay đổi nếu nhân cả phương trình với một số, điều không thể xảy ra với khoảng cách.`,
  ),
  "12/khoang-12": note(
    R`Trong nhóm chứa mốc, coi các phần tử trải đều dọc theo nhóm. Mốc cần tìm nằm cách mút trái một đoạn tỉ lệ với số phần tử còn thiếu so với tần số của nhóm.`,
    R`Lấy $N$ là tần số tích lũy tính cả nhóm đang xét. Số $N$ chỉ tính các nhóm đứng trước nhóm chứa mốc.`,
  ),
  "12/lech-chuan": note(
    R`Mỗi nhóm được thay bằng giá trị đại diện lặp lại đúng bằng tần số của nhóm. Áp dụng công thức phương sai quen thuộc cho dãy số thay thế đó.`,
    R`Quên nhân bình phương độ lệch với tần số, hoặc chia cho số nhóm. Phải chia cho cỡ mẫu $n$.`,
  ),
  "12/co-dieu-kien": note(
    R`Biết $B$ đã xảy ra thì không gian mẫu thu hẹp lại còn $B$. Trong không gian thu hẹp ấy, $A$ chỉ xảy ra ở phần chung $A\cap B$, nên xác suất là tỉ lệ của phần chung so với $B$.`,
    R`Nhầm $P(A\mid B)$ với $P(B\mid A)$. Hai xác suất này có mẫu khác nhau và nói chung không bằng nhau.`,
  ),
  "12/toan-phan": note(
    R`Biến cố $A$ tách thành hai phần rời nhau: phần xảy ra cùng $B$ và phần xảy ra cùng $\overline B$. Mỗi phần có xác suất bằng xác suất của nhánh nhân với xác suất có điều kiện trên nhánh đó.`,
    R`Cộng thẳng $P(A\mid B)$ với $P(A\mid\overline B)$. Mỗi số hạng phải nhân với xác suất của nhánh tương ứng.`,
  ),
  "12/bayes": note(
    R`Xác suất của $A\cap B$ viết được theo hai cách: $P(A\mid B)P(B)$ và $P(B\mid A)P(A)$. Cho hai biểu thức bằng nhau rồi chia cho $P(A)$ là ra công thức Bayes.`,
    R`Bỏ qua tỉ lệ ban đầu $P(B)$. Khi $B$ hiếm gặp, $P(B\mid A)$ vẫn có thể nhỏ dù $P(A\mid B)$ rất lớn.`,
  ),
};
