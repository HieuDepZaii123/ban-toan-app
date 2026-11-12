import type { NoteBook } from "./types.ts";
import { note } from "./types.ts";

const R = String.raw;

export const thcsNotes: NoteBook = {
  // Lớp 6
  "6/thu-tu-tinh": note(
    R`Phép nhân là cách viết gọn của phép cộng lặp, nên $3\cdot 4$ là một khối $4+4+4$ phải tính xong trước khi cộng với số khác. Dấu ngoặc dùng để báo một khối cần tính trước mọi thứ còn lại.`,
    R`Tính lần lượt từ trái sang phải mà không nhìn loại phép tính. Biểu thức $2+3\cdot 4$ bằng $14$, không phải $20$.`,
  ),
  "6/luy-thua": note(
    R`Lũy thừa là cách viết gọn của tích nhiều thừa số bằng nhau, giống như phép nhân là cách viết gọn của tổng nhiều số hạng bằng nhau. Vì thế $2^5$ là $2\cdot 2\cdot 2\cdot 2\cdot 2$.`,
    R`Lấy cơ số nhân với số mũ. Giá trị $2^5$ là $32$, không phải $2\cdot 5=10$.`,
  ),
  "6/ucln": note(
    R`Phân tích ra thừa số nguyên tố cho thấy mỗi số được ghép từ những thừa số nào. Phần chung của hai số cho ước chung lớn nhất, còn gộp đủ mọi thừa số với số mũ lớn nhất cho bội chung nhỏ nhất.`,
    R`Lấy tích hai số làm bội chung nhỏ nhất. Tích $12\cdot 18=216$ là một bội chung, nhưng bội chung nhỏ nhất chỉ là $36$.`,
  ),
  "6/so-nguyen-to": note(
    R`Một hợp số luôn tách được thành tích hai số nhỏ hơn. Tách tiếp từng thừa số cho đến khi không tách được nữa thì chỉ còn lại các số nguyên tố.`,
    R`Xếp số $1$ vào số nguyên tố, hoặc cho rằng mọi số lẻ đều nguyên tố. Số $1$ chỉ có một ước, còn $9$ là số lẻ nhưng chia hết cho $3$.`,
  ),
  "6/cong-tru-nguyen": note(
    R`Trên trục số, cộng số dương là bước sang phải, cộng số âm là bước sang trái. Còn $(-4)\cdot(-3)$ phải bằng $12$ để dãy $(-4)\cdot 2=-8$, $(-4)\cdot 1=-4$, $(-4)\cdot 0=0$ tiếp tục tăng đều mỗi lần $4$.`,
    R`Dùng quy tắc dấu của phép nhân cho phép cộng. Tổng $(-3)+(-5)$ bằng $-8$, không phải $8$.`,
  ),
  "6/tri-tuyet-doi": note(
    R`Khoảng cách không bao giờ âm, nên trị tuyệt đối luôn lớn hơn hoặc bằng $0$. Với hai số âm, số nào xa $0$ hơn thì nằm bên trái hơn, tức là bé hơn.`,
    R`Cho rằng $-7$ lớn hơn $-2$ vì $7$ lớn hơn $2$. Trên trục số, $-7$ nằm bên trái $-2$ nên $-7<-2$.`,
  ),
  "6/phan-am": note(
    R`Phân số âm tuân theo đúng các quy tắc của số nguyên âm, vì cả hai đều là số đối của một số dương. Quy đồng mẫu trước rồi cộng các tử theo quy tắc dấu.`,
    R`Đặt dấu trừ vào cả tử lẫn mẫu. Phân số $\frac{-1}{-2}$ bằng $\frac{1}{2}$, là số dương.`,
  ),
  "6/hon-so": note(
    R`Mỗi đơn vị nguyên đổi được thành $b$ phần có mẫu $b$. Hỗn số $2\frac{1}{3}$ gồm $2\cdot 3=6$ phần ba, thêm $1$ phần ba, tức $\frac{7}{3}$.`,
    R`Hiểu $2\frac{1}{3}$ là $2$ nhân $\frac{1}{3}$. Giữa phần nguyên và phần phân số là phép cộng.`,
  ),
  "6/thap-phan-am": note(
    R`Số thập phân âm là phân số âm viết ở dạng khác, nên mọi quy tắc dấu vẫn giữ nguyên. Trên trục số, cộng $2{,}5$ vào $-1{,}5$ là bước sang phải $2{,}5$ đơn vị và dừng ở $1$.`,
    R`So sánh $-1{,}5$ với $-1{,}2$ như hai số dương. Vì $1{,}5>1{,}2$ nên $-1{,}5<-1{,}2$.`,
  ),
  "6/uoc-luong": note(
    R`Làm tròn chỉ đổi mỗi số đi một lượng nhỏ, nên kết quả tính trên số đã làm tròn không lệch xa kết quả đúng. Nếu hai kết quả cách nhau quá xa thì phép tính ban đầu có lỗi.`,
    R`Coi kết quả ước lượng là đáp số. Ước lượng $48+37$ được $90$, còn tổng đúng là $85$.`,
  ),
  "6/ti-so-phan-tram": note(
    R`Tỉ số $\frac{15}{60}$ bằng $\frac{25}{100}$. Viết về mẫu $100$ để mọi tỉ số dùng chung một thước đo và so sánh được ngay.`,
    R`Chia ngược hai số. Hỏi $a$ bằng bao nhiêu phần trăm của $b$ thì lấy $a$ chia cho $b$, số đứng sau chữ "của" nằm ở mẫu.`,
  ),
  "6/so-sanh-ti-so": note(
    R`Hai phân số khác mẫu khó so sánh trực tiếp. Đổi về phần trăm là quy đồng cả hai về mẫu $100$, lúc đó chỉ cần so hai tử.`,
    R`So sánh hai tử hoặc hai mẫu riêng lẻ khi mẫu khác nhau. Phân số $\frac{3}{5}$ là $60\%$, lớn hơn $\frac{1}{2}$ là $50\%$, dù $5$ lớn hơn $2$.`,
  ),
  "6/so-do-goc": note(
    R`Hai góc kề nhau ghép lại thành một góc lớn mà không chồng lên nhau, giống hai đoạn thẳng nối tiếp. Vì vậy số đo của góc gộp là tổng hai số đo.`,
    R`Cộng số đo của hai góc có phần chồng lên nhau. Chỉ cộng được khi hai góc kề nhau và nằm về hai phía của cạnh chung.`,
  ),
  "6/hinh-deu": note(
    R`Gấp hình theo trục đối xứng thì hai nửa trùng khít lên nhau. Hình vuông gấp được theo hai đường nối trung điểm cạnh đối và hai đường chéo, nên có $4$ trục.`,
    R`Cho rằng đường chéo của hình chữ nhật là trục đối xứng. Gấp hình chữ nhật theo đường chéo, hai nửa không trùng nhau.`,
  ),
  "6/diem-duong": note(
    R`Mỗi cặp điểm cho đúng một đoạn thẳng. Ba điểm $A$, $B$, $C$ có ba cặp là $AB$, $BC$ và $CA$, nên có ba đoạn thẳng.`,
    R`Nhầm đường thẳng, tia và đoạn thẳng. Đường thẳng kéo dài mãi về hai phía, tia bị chặn một đầu, đoạn thẳng bị chặn cả hai đầu.`,
  ),
  "6/thu-thap": note(
    R`Mỗi lần quan sát được ghi đúng một lần vào đúng một giá trị. Vì vậy cộng số lần của mọi giá trị là đếm lại toàn bộ các lần quan sát.`,
    R`Ghi một lần quan sát vào hai giá trị, hoặc bỏ sót. Kiểm tra bằng cách cộng các số lần rồi so với cỡ mẫu.`,
  ),
  "6/bieu-dien-6": note(
    R`Biểu đồ cột đổi mỗi số lần thành một độ cao theo cùng một thang đo. So sánh số liệu trở thành so sánh chiều cao bằng mắt.`,
    R`Vẽ trục đứng không bắt đầu từ $0$. Khi đó chênh lệch giữa các cột trông lớn hơn thực tế.`,
  ),
  "6/xs-thuc-nghiem": note(
    R`Xác suất thực nghiệm là tần suất quan sát được trong một đợt thử cụ thể. Thử càng nhiều lần, tần suất này càng ổn định quanh một giá trị.`,
    R`Coi kết quả của $20$ lần gieo là xác suất đúng của đồng xu. Một đợt thử khác có thể cho $11$ lần ngửa thay vì $9$.`,
  ),

  // Lớp 7
  "7/huu-ti-bai": note(
    R`Số hữu tỉ mở rộng số nguyên sao cho mọi quy tắc cộng, nhân và quy tắc dấu vẫn đúng. Tích $\left(-\frac{2}{5}\right)\cdot\left(-\frac{5}{2}\right)$ bằng $1$ vì hai số âm nhân nhau ra số dương và hai phân số là nghịch đảo của nhau.`,
    R`Cộng tử với tử và mẫu với mẫu. Muốn cộng hai phân số phải quy đồng mẫu trước.`,
  ),
  "7/so-thuc": note(
    R`Căn bậc hai số học là phép ngược của bình phương trên các số không âm. Vì $4^2=16$ và $4\ge 0$ nên $\sqrt{16}=4$, và theo đúng định nghĩa thì $\left(\sqrt{2}\right)^2=2$.`,
    R`Viết $\sqrt{16}=\pm 4$. Kí hiệu căn chỉ lấy giá trị không âm, còn phương trình $x^2=16$ mới có hai nghiệm $4$ và $-4$.`,
  ),
  "7/ti-le-thuc": note(
    R`Nhân cả hai vế của $\frac{a}{b}=\frac{c}{d}$ với $bd$ khác $0$ thì được $ad=bc$. Vì chỉ nhân với một số khác $0$ nên hai đẳng thức tương đương.`,
    R`Nhân nhầm hai số cùng một phân số. Tích chéo lấy tử của phân số này nhân với mẫu của phân số kia.`,
  ),
  "7/dai-luong-ti-le": note(
    R`Tỉ lệ thuận nghĩa là đại lượng này gấp lên bao nhiêu lần thì đại lượng kia gấp lên bấy nhiêu lần, nên thương không đổi. Tỉ lệ nghịch nghĩa là đại lượng này gấp lên bao nhiêu lần thì đại lượng kia giảm đi bấy nhiêu lần, nên tích không đổi.`,
    R`Dùng tỉ lệ thuận cho bài tỉ lệ nghịch. Thêm người thì số ngày làm phải giảm, nếu kết quả tăng lên là đã chọn sai loại.`,
  ),
  "7/gia-tri-bt": note(
    R`Chữ trong biểu thức đứng thay cho một số. Thay chữ bằng số thì biểu thức trở thành một dãy tính thông thường và tuân theo thứ tự phép tính đã học.`,
    R`Quên dấu ngoặc khi thay số âm. Với $x=-2$ thì $x^2$ là $(-2)^2=4$, không phải $-2^2=-4$.`,
  ),
  "7/da-thuc": note(
    R`Các số hạng cùng số mũ là những lượng cùng loại, nên gộp được như $2$ quả táo cộng $3$ quả táo. Nhân từng số hạng với từng số hạng là dùng tính chất phân phối của phép nhân đối với phép cộng.`,
    R`Cộng hệ số của hai số hạng khác bậc. Tổng $2x+3x^2$ không gộp được thành $5x^3$ hay $5x^2$.`,
  ),
  "7/tong-goc": note(
    R`Kẻ qua một đỉnh đường thẳng song song với cạnh đối diện. Hai góc ở đáy bằng hai góc so le trong, và cùng với góc ở đỉnh chúng xếp kín một góc bẹt $180^\circ$.`,
    R`Lấy $360^\circ$ làm tổng ba góc của tam giác. Tổng $360^\circ$ là của tứ giác.`,
  ),
  "7/bang-nhau": note(
    R`Ba cạnh đã cố định hình dạng của tam giác: dựng tam giác từ ba đoạn thẳng cho trước chỉ ra một hình, sai khác vị trí. Vì thế bằng nhau ba cạnh kéo theo bằng nhau cả ba góc.`,
    R`Viết sai thứ tự đỉnh tương ứng. Trong $\triangle ABC=\triangle DEF$, đỉnh $A$ ứng với $D$, $B$ với $E$ và $C$ với $F$.`,
  ),
  "7/can-deu": note(
    R`Gấp tam giác cân theo đường nối đỉnh với trung điểm cạnh đáy thì hai nửa trùng nhau, nên hai góc đáy bằng nhau. Tam giác đều cân tại cả ba đỉnh nên ba góc bằng nhau, mỗi góc $180^\circ:3=60^\circ$.`,
    R`Nhầm góc ở đỉnh với góc đáy. Biết góc ở đỉnh thì mỗi góc đáy bằng $180^\circ$ trừ góc ở đỉnh, rồi chia $2$.`,
  ),
  "7/doan-thang": note(
    R`Trục ngang ghi thời gian theo thứ tự, trục đứng ghi số liệu. Đoạn nối hai điểm liền nhau dốc lên hay dốc xuống cho thấy ngay số liệu tăng hay giảm.`,
    R`Đọc đoạn dốc nhất là giá trị lớn nhất. Độ dốc cho biết mức thay đổi, còn giá trị lớn nhất là điểm cao nhất.`,
  ),
  "7/quat-tron": note(
    R`Cả hình tròn là cả nhóm, nên mỗi phần chiếm một phần hình tròn đúng bằng tỉ lệ của nó. Nhóm chiếm $\frac{10}{40}$ lớp thì quạt chiếm $\frac{10}{40}$ của $360^\circ$, tức $90^\circ$.`,
    R`Dùng biểu đồ quạt cho các nhóm chồng lên nhau. Các quạt chỉ ghép kín hình tròn khi mỗi người thuộc đúng một nhóm.`,
  ),
  "7/xs-bien-co": note(
    R`Khi mỗi kết quả có khả năng như nhau, mỗi kết quả chiếm một phần bằng nhau của toàn bộ. Biến cố gồm bao nhiêu kết quả thuận lợi thì chiếm bấy nhiêu phần.`,
    R`Dùng công thức khi các kết quả không đồng khả năng. Rút được đỏ hoặc xanh không có nghĩa xác suất mỗi màu là $\frac{1}{2}$, phải đếm theo từng viên bi.`,
  ),

  // Lớp 8
  "8/binh-phuong-tong": note(
    R`Hình vuông cạnh $a+b$ cắt được thành một hình vuông cạnh $a$, một hình vuông cạnh $b$ và hai hình chữ nhật $a\cdot b$. Cộng bốn diện tích lại được $a^2+2ab+b^2$.`,
    R`Viết $(a+b)^2=a^2+b^2$. Thiếu số hạng $2ab$, chính là hai hình chữ nhật trong hình vẽ.`,
  ),
  "8/hieu-binh": note(
    R`Nhân $(a+b)^2$ với $(a+b)$ thêm một lần rồi gộp các số hạng đồng dạng thì được lập phương của tổng. Hai công thức tổng và hiệu hai lập phương kiểm tra được bằng cách nhân vế phải ra, các số hạng ở giữa triệt tiêu hết.`,
    R`Nhầm dấu của số hạng giữa. Trong $a^3+b^3=(a+b)(a^2-ab+b^2)$ dấu ở giữa ngược với dấu của tổng.`,
  ),
  "8/phan-tich": note(
    R`Phân tích thành nhân tử là đọc ngược tính chất phân phối. Viết được đa thức thành tích thì tìm nghiệm rất nhanh, vì một tích bằng $0$ khi có một thừa số bằng $0$.`,
    R`Đặt nhân tử chung nhưng quên số $1$ còn lại. Phân tích đúng của $2x^2+2x$ là $2x(x+1)$, không phải $2x\cdot x$.`,
  ),
  "8/phan-thuc": note(
    R`Phân thức cư xử như phân số: chia cả tử và mẫu cho cùng một nhân tử khác $0$ thì giá trị không đổi. Điều kiện xác định giữ cho nhân tử đem chia đó khác $0$.`,
    R`Gạch bỏ số hạng thay vì nhân tử. Trong $\frac{x^2-1}{x-1}$ phải viết tử thành $(x-1)(x+1)$ rồi mới rút gọn được.`,
  ),
  "8/pt-bac-nhat": note(
    R`Cộng cùng một số vào hai vế, hoặc chia hai vế cho cùng một số khác $0$, không làm đổi tập nghiệm. Hai bước đó đưa $ax+b=0$ về $x=-\frac{b}{a}$.`,
    R`Chuyển vế mà quên đổi dấu. Từ $3x-12=0$ suy ra $3x=12$, không phải $3x=-12$.`,
  ),
  "8/ham-bac-nhat": note(
    R`Khi $x$ tăng $1$ thì $a(x+1)+b$ lớn hơn $ax+b$ đúng $a$ đơn vị. Mức tăng không đổi này làm các điểm của đồ thị thẳng hàng.`,
    R`Lấy $b$ làm hệ số góc. Hệ số góc là số nhân với $x$, còn $b$ là tung độ của điểm đồ thị cắt trục tung.`,
  ),
  "8/ti-so-dong-dang": note(
    R`Hai hình đồng dạng là một hình được phóng to hoặc thu nhỏ đều theo mọi hướng. Mọi độ dài cùng nhân với một số $k$, còn các góc giữ nguyên.`,
    R`Dùng tỉ số $k$ cho diện tích. Độ dài nhân với $k$ thì diện tích nhân với $k^2$.`,
  ),
  "8/pitago": note(
    R`Xếp bốn tam giác vuông bằng nhau vào một hình vuông cạnh $a+b$ theo hai cách. Phần trống là một hình vuông cạnh $c$ ở cách thứ nhất và hai hình vuông cạnh $a$, cạnh $b$ ở cách thứ hai, nên $c^2=a^2+b^2$.`,
    R`Cộng hai cạnh góc vuông rồi coi là cạnh huyền. Tam giác vuông cạnh $3$ và $4$ có cạnh huyền $5$, không phải $7$.`,
  ),
  "8/binh-hanh": note(
    R`Cắt một tam giác vuông ở một bên hình bình hành rồi ghép sang bên kia thì được hình chữ nhật có cùng đáy và chiều cao. Diện tích không đổi nên bằng đáy nhân chiều cao.`,
    R`Nhân hai cạnh kề của hình bình hành. Phải nhân đáy với chiều cao vuông góc với đáy đó.`,
  ),
  "8/chop-deu": note(
    R`Một hình lập phương chia được thành ba hình chóp bằng nhau có chung đỉnh tại một góc và đáy là ba mặt không chứa góc đó. Vì thế thể tích hình chóp bằng một phần ba thể tích hình lăng trụ cùng đáy và cùng chiều cao.`,
    R`Dùng độ dài cạnh bên hoặc trung đoạn làm chiều cao. Chiều cao là đoạn vuông góc hạ từ đỉnh xuống mặt đáy.`,
  ),

  // Lớp 9
  "9/rut-gon-can": note(
    R`Căn của một tích hai số không âm bằng tích hai căn, nên $\sqrt{a^2b}=\sqrt{a^2}\cdot\sqrt{b}$. Căn số học không âm nên $\sqrt{a^2}$ là $|a|$.`,
    R`Viết $\sqrt{a^2}=a$ với mọi $a$. Khi $a=-3$ thì $\sqrt{(-3)^2}=3$, không phải $-3$.`,
  ),
  "9/nhan-can": note(
    R`Bình phương của $\sqrt{a}\cdot\sqrt{b}$ bằng $ab$, và tích này không âm. Theo định nghĩa căn bậc hai số học, đó chính là $\sqrt{ab}$.`,
    R`Áp dụng cho phép cộng. Tổng $\sqrt{9}+\sqrt{16}$ bằng $7$, còn $\sqrt{9+16}$ bằng $5$.`,
  ),
  "9/y-ax2": note(
    R`Bình phương $x^2$ không bao giờ âm và chỉ bằng $0$ khi $x=0$. Nhân với $a$ dương thì mọi giá trị đều từ $0$ trở lên, nhân với $a$ âm thì mọi giá trị đều từ $0$ trở xuống.`,
    R`Tính $-2x^2$ tại $x=3$ thành $(-2\cdot 3)^2=36$. Lũy thừa làm trước phép nhân, nên kết quả là $-2\cdot 9=-18$.`,
  ),
  "9/doi-xung": note(
    R`Hai số đối nhau có cùng bình phương. Do đó hai điểm $(x;ax^2)$ và $(-x;ax^2)$ cùng thuộc đồ thị và đối xứng nhau qua trục tung.`,
    R`Cho rằng đồ thị đối xứng qua trục hoành. Với $a\neq 0$, đồ thị nằm hẳn về một phía của trục hoành, chỉ chạm tại gốc tọa độ.`,
  ),
  "9/he-hai-an": note(
    R`Cộng hai đẳng thức đúng theo từng vế thì được một đẳng thức đúng. Khi hệ số của một ẩn đối nhau, ẩn đó triệt tiêu và chỉ còn phương trình một ẩn.`,
    R`Trừ từng vế nhưng quên đổi dấu mọi số hạng của phương trình bị trừ. Viết phương trình thứ hai trong ngoặc trước khi trừ.`,
  ),
  "9/he-the": note(
    R`Tại nghiệm của hệ, hai vế của phương trình thứ nhất là cùng một số. Vì vậy thay ẩn này bằng biểu thức của nó vào phương trình còn lại không làm mất hay thêm nghiệm.`,
    R`Thế trở lại vào chính phương trình vừa dùng để rút ẩn. Khi đó chỉ nhận được một đẳng thức luôn đúng như $0=0$.`,
  ),
  "9/delta": note(
    R`Thêm bớt để tạo bình phương đưa phương trình về $\left(x+\frac{b}{2a}\right)^2=\frac{\Delta}{4a^2}$. Vế trái không âm, nên dấu của $\Delta$ quyết định phương trình có hai nghiệm, một nghiệm kép hay vô nghiệm.`,
    R`Tính $\Delta$ sai dấu khi $c$ âm. Với $x^2-2x-3=0$ thì $\Delta=4-4\cdot 1\cdot(-3)=16$, không phải $-8$.`,
  ),
  "9/viete": note(
    R`Nếu hai nghiệm là $x_1$ và $x_2$ thì $ax^2+bx+c=a(x-x_1)(x-x_2)$. Nhân vế phải ra rồi so sánh hệ số, ta được tổng hai nghiệm bằng $-\frac{b}{a}$ và tích bằng $\frac{c}{a}$.`,
    R`Dùng định lí khi phương trình vô nghiệm. Phải kiểm tra $\Delta\ge 0$ trước, nếu không thì tổng và tích tính ra không ứng với nghiệm thực nào.`,
  ),
  "9/bpt-mot-an": note(
    R`Cộng cùng một số vào hai vế, hoặc chia hai vế cho cùng một số dương, không làm đổi thứ tự của hai vế. Hai bước đó đưa $2x-6>0$ về $x>3$.`,
    R`Lấy cả giá trị biên vào tập nghiệm. Với dấu lớn hơn chặt, $x=3$ làm vế trái bằng $0$ nên không phải nghiệm.`,
  ),
  "9/bpt-am": note(
    R`Trên trục số, lấy số đối là lật các điểm qua gốc $0$, nên thứ tự bị đảo: từ $2<5$ suy ra $-2>-5$. Nhân hay chia cho một số âm luôn kèm một lần lật như vậy.`,
    R`Chia cho số âm mà giữ nguyên chiều. Từ $-x<4$ suy ra $x>-4$, không phải $x<-4$.`,
  ),
  "9/ti-so-lg": note(
    R`Các tam giác vuông có chung một góc nhọn thì đồng dạng với nhau. Tỉ số giữa các cạnh vì thế chỉ phụ thuộc vào góc, không phụ thuộc tam giác to hay nhỏ.`,
    R`Nhầm cạnh đối với cạnh kề. Cạnh đối nằm trước mặt góc đang xét, cạnh kề là cạnh góc vuông tạo nên góc đó.`,
  ),
  "9/canh-lg": note(
    R`Từ định nghĩa, sin bằng cạnh đối chia cạnh huyền. Nhân hai vế với cạnh huyền thì cạnh đối bằng cạnh huyền nhân với sin.`,
    R`Chia cho sin trong khi phải nhân. Cạnh góc vuông luôn ngắn hơn cạnh huyền, nếu kết quả dài hơn cạnh huyền thì đã tính ngược.`,
  ),
  "9/tiep-tuyen": note(
    R`Tiếp điểm là điểm của tiếp tuyến gần tâm nhất, mà đoạn ngắn nhất từ một điểm đến một đường thẳng là đoạn vuông góc. Do đó bán kính vuông góc với tiếp tuyến, và tam giác $OAH$ vuông tại $H$ nên dùng được định lí Pythagore.`,
    R`Lấy $OA$ làm cạnh góc vuông. Góc vuông ở tiếp điểm $H$, nên $OA$ là cạnh huyền và $AH^2=OA^2-OH^2$.`,
  ),
  "9/goc-noi-tiep": note(
    R`Nối tâm với đỉnh của góc nội tiếp sẽ tạo ra các tam giác cân có hai cạnh là bán kính. Góc ngoài của mỗi tam giác cân bằng hai lần góc đáy, cộng lại thì góc ở tâm gấp đôi góc nội tiếp.`,
    R`Nhân đôi nhầm chiều. Góc nội tiếp là góc nhỏ hơn, bằng một nửa góc ở tâm cùng chắn một cung.`,
  ),
  "9/tru": note(
    R`Hình trụ là các lát tròn bằng nhau xếp chồng lên. Mỗi lát có diện tích $\pi r^2$, chồng cao $h$ thì thể tích là $\pi r^2h$.`,
    R`Dùng đường kính thay cho bán kính. Sai lầm này làm thể tích lớn gấp bốn lần, vì bán kính được bình phương.`,
  ),
  "9/non-cau": note(
    R`Đổ đầy nước vào hình nón rồi rót sang hình trụ có cùng đáy và cùng chiều cao, phải rót đúng ba lần mới đầy. Thí nghiệm tương tự cho thấy hình cầu chiếm hai phần ba hình trụ vừa khít bao quanh nó, từ đó có $\frac{4}{3}\pi r^3$.`,
    R`Quên hệ số $\frac{1}{3}$ của hình nón, hoặc bình phương bán kính hình cầu thay vì lập phương. Thể tích hình cầu dùng $r^3$.`,
  ),
  "9/tan-so-tuong-doi": note(
    R`Tần số tương đối cho biết một giá trị chiếm mấy phần của cả mẫu. Nhờ đó so sánh được hai mẫu có cỡ khác nhau.`,
    R`So sánh tần số của hai mẫu khác cỡ. Có $4$ trong $20$ bạn là $20\%$, nhiều hơn $6$ trong $50$ bạn là $12\%$.`,
  ),
  "9/tong-tuong-doi": note(
    R`Tổng các tần số bằng cỡ mẫu. Chia cả hai vế cho cỡ mẫu thì tổng các tần số tương đối bằng $1$.`,
    R`Tổng ra khác $1$ mà không kiểm tra lại. Khi đó bảng đã đếm thiếu, đếm trùng, hoặc các tần số tương đối bị làm tròn quá thô.`,
  ),
};
