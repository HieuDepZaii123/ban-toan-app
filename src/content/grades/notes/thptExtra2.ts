import type { NoteBook } from "./types.ts";
import { note } from "./types.ts";

const R = String.raw;

/** Lời giải thích cho các bài lớp 12 chi tiết (lop12extra2.ts). */
export const thptExtra2Notes: NoteBook = {
  "12/nhan-dang-do-thi": note(
    R`Giá trị $y(0)$ chính là hệ số tự do, và các điểm cực trị là nghiệm của đạo hàm. Với phân thức bậc nhất, đạo hàm có tử là $ad-bc$ nên dấu của nó quyết định hàm đồng biến hay nghịch biến.`,
    R`Nhầm tiệm cận ngang với tiệm cận đứng, hoặc lấy tiệm cận ngang là tỉ số hệ số của số hạng tự do. Tiệm cận ngang là tỉ số hệ số của $x$ ở tử và mẫu.`,
  ),
  "12/tuong-giao": note(
    R`Nghiệm của $f(x)=k$ là hoành độ giao điểm của đồ thị với đường thẳng ngang $y=k$. Số giao điểm phụ thuộc vị trí của $k$ so với cực đại và cực tiểu, nên chỉ cần tính hai giá trị đó.`,
    R`Đếm nghiệm kép như hai nghiệm. Khi $k$ bằng đúng giá trị cực trị, đường thẳng tiếp xúc đồ thị nên có một nghiệm kép và vẫn chỉ tính là một giao điểm.`,
  ),
  "12/tham-so-cuc-tri": note(
    R`Đạo hàm của hàm bậc ba là tam thức bậc hai. Hàm có hai cực trị khi tam thức đổi dấu hai lần, tức có hai nghiệm phân biệt, nên điều kiện là biệt thức dương.`,
    R`Chỉ giải $y'(x_0)=0$ mà không kiểm tra đạo hàm có đổi dấu. Nghiệm kép làm đạo hàm bằng $0$ nhưng không đổi dấu, nên không cho cực trị.`,
  ),
  "12/tiep-tuyen-hs": note(
    R`Đạo hàm tại một điểm là hệ số góc của đường thẳng áp sát đồ thị tại điểm đó. Biết hệ số góc và một điểm thuộc đường thẳng thì viết được phương trình đường thẳng.`,
    R`Dùng điểm bất kì thay cho tiếp điểm, hoặc quên kiểm tra tiếp tuyến tìm được có trùng đường thẳng đã cho hay không khi bài yêu cầu song song.`,
  ),
  "12/tp-tuyet-doi": note(
    R`Giá trị tuyệt đối đổi công thức tại điểm hàm đổi dấu. Chia đoạn tại các nghiệm thì trên từng đoạn con biểu thức bên trong có dấu cố định, nên bỏ được dấu giá trị tuyệt đối.`,
    R`Tính tích phân của $f(x)$ trên cả đoạn rồi mới lấy giá trị tuyệt đối. Hai phép làm này cho kết quả khác nhau khi $f$ đổi dấu, vì các phần âm bị trừ đi.`,
  ),
  "12/tp-chan-le": note(
    R`Với hàm lẻ, phần diện tích bên trái trục tung đối với phần bên phải về dấu nên hai phần triệt tiêu. Với hàm chẵn, hai phần bằng nhau nên tích phân gấp đôi phần bên phải.`,
    R`Áp dụng tính chất cho đoạn không đối xứng như $[-1;\ 2]$, hoặc coi hàm có cả hai loại số hạng là hàm lẻ. Phải tách từng số hạng trước.`,
  ),
  "12/dt-hai-do-thi": note(
    R`Diện tích bằng tích phân của hiệu hàm trên trừ hàm dưới, vì hiệu này là chiều cao của dải mỏng tại mỗi $x$. Các giao điểm là nơi hai hàm đổi vị trí trên dưới.`,
    R`Lấy hiệu theo thứ tự cố định trên cả đoạn dù hai đồ thị cắt nhau ở giữa. Khi đó các phần âm trừ vào phần dương và diện tích bị tính thiếu.`,
  ),
  "12/tp-huu-ti": note(
    R`Đạo hàm của $\ln|u|$ là $\frac{u'}{u}$, nên tích phân có tử là đạo hàm của mẫu thì quay về hàm $\ln$. Nếu tử chỉ bằng một hằng số nhân đạo hàm của mẫu thì đưa hằng số ra ngoài.`,
    R`Viết nguyên hàm của $\frac{1}{x+1}$ là $\frac{1}{(x+1)^2}$ hoặc quên hệ số khi tử không đúng bằng đạo hàm của mẫu, ví dụ $\frac{x}{x^2+1}$ cần nhân thêm $\frac{1}{2}$.`,
  ),
  "12/vtt-d-mp": note(
    R`Điểm chung của đường thẳng và mặt phẳng ứng với giá trị $t$ thỏa phương trình sau khi thay vào. Phương trình bậc nhất theo $t$ có một nghiệm, vô nghiệm hoặc nghiệm với mọi $t$.`,
    R`Kết luận song song khi hệ số của $t$ bằng $0$ mà không xét hằng số còn lại. Nếu hằng số cũng bằng $0$ thì đường thẳng nằm trong mặt phẳng.`,
  ),
  "12/kc-hai-dt": note(
    R`Thể tích khối hộp dựng trên ba vectơ bằng tích hỗn tạp, còn diện tích đáy bằng độ dài tích có hướng. Chiều cao, tức khoảng cách giữa hai đường thẳng, là thương của hai đại lượng đó.`,
    R`Quên lấy giá trị tuyệt đối của tích hỗn tạp, hoặc dùng công thức này cho hai đường thẳng cắt nhau hay song song. Khi đó tích hỗn tạp bằng $0$ hoặc tích có hướng bằng $0$.`,
  ),
  "12/mat-cau-tx": note(
    R`Mặt phẳng tiếp xúc mặt cầu tại đúng một điểm, nên khoảng cách từ tâm đến mặt phẳng đúng bằng bán kính. Nhỏ hơn thì mặt phẳng cắt mặt cầu, lớn hơn thì không có điểm chung.`,
    R`Quên dấu giá trị tuyệt đối ở tử, nên chỉ nhận một giá trị của tham số. Phương trình $|u|=k$ luôn cho hai trường hợp $u=k$ và $u=-k$.`,
  ),
  "12/hinh-chieu-dx": note(
    R`Hình chiếu của $M$ nằm trên đường thẳng qua $M$ vuông góc với mặt phẳng, nên đi từ $M$ theo hướng vectơ pháp tuyến. Điểm đối xứng đi gấp đôi quãng đường đó.`,
    R`Nhầm dấu của $t$ nên đi ngược hướng, hoặc lấy hình chiếu làm điểm đối xứng. Hình chiếu là trung điểm của đoạn nối $M$ với điểm đối xứng.`,
  ),
  "12/trung-vi-nhom": note(
    R`Trung vị chia mẫu thành hai nửa bằng nhau về số lượng. Nội suy trong nhóm chứa mốc $\frac{n}{2}$ coi các giá trị trong nhóm phân bố đều, nên phần cần đi thêm là tỉ lệ $\frac{\frac{n}{2}-N}{n_i}$ của độ dài nhóm.`,
    R`Chọn nhóm theo tần số lớn nhất thay vì theo tần số tích lũy, hoặc dùng cỡ mẫu $n$ thay cho $\frac{n}{2}$ trong tử. Nhóm đúng là nhóm đầu tiên mà tần số tích lũy đạt tới mốc.`,
  ),
  "12/phuong-sai-ngan": note(
    R`Khai triển $(c_i-\bar x)^2=c_i^2-2c_i\bar x+\bar x^2$ rồi lấy trung bình, các số hạng giữa gộp lại thành $-2\bar x^2$, nên còn lại trung bình bình phương trừ bình phương trung bình.`,
    R`Lấy bình phương của trung bình bình phương hoặc quên trừ $\bar x^2$. Trung bình bình phương luôn không nhỏ hơn bình phương của trung bình, nên kết quả âm là dấu hiệu sai.`,
  ),
  "12/so-sanh-hai-mau": note(
    R`Độ lệch chuẩn đo khoảng cách điển hình từ giá trị tới trung bình và cùng đơn vị với số liệu. Khi hai trung bình bằng nhau thì mẫu có độ lệch chuẩn lớn hơn có các giá trị nằm xa trung bình hơn.`,
    R`So sánh phương sai của hai mẫu khác đơn vị, hoặc kết luận chỉ từ trung bình. Hai mẫu có cùng trung bình vẫn có thể phân tán rất khác nhau.`,
  ),
  "12/bien-doi-mau": note(
    R`Cộng thêm $a$ làm cả giá trị và trung bình dịch cùng đoạn nên độ lệch không đổi. Nhân với $k$ làm mọi độ lệch nhân $k$, nên bình phương nhân $k^2$.`,
    R`Nhân phương sai với $k$ thay vì $k^2$, hoặc cho rằng cộng thêm một số làm phương sai tăng. Phương sai chỉ đo độ phân tán nên không đổi khi dịch cả mẫu.`,
  ),
  "12/cay-xac-suat": note(
    R`Nhánh sau của sơ đồ cây ghi xác suất có điều kiện, nên nhân dọc theo đường đi chính là công thức nhân. Các đường đi khác nhau loại trừ nhau nên cộng được.`,
    R`Dùng cùng một mẫu số ở cả hai lần lấy dù không hoàn lại. Sau lần đầu tổng số vật giảm một, nên mẫu số của nhánh thứ hai nhỏ hơn.`,
  ),
  "12/cong-thuc-nhan": note(
    R`Định nghĩa $P(B\mid A)=\frac{P(A\cap B)}{P(A)}$ chuyển vế cho ngay công thức nhân. Với ba biến cố, áp dụng công thức hai lần liên tiếp.`,
    R`Nhân $P(A)$ với $P(B)$ trong khi hai biến cố không độc lập. Phải dùng $P(B\mid A)$, vì sau khi $A$ xảy ra xác suất của $B$ đã thay đổi.`,
  ),
  "12/doc-lap-12": note(
    R`Nếu $A$ không ảnh hưởng $B$ thì $P(B\mid A)=P(B)$, thay vào công thức nhân được $P(A\cap B)=P(A)P(B)$. Điều ngược lại cũng đúng nên đây là điều kiện cần và đủ.`,
    R`Nhầm biến cố độc lập với biến cố xung khắc. Hai biến cố xung khắc có xác suất giao bằng $0$, nên chỉ độc lập khi có một biến cố có xác suất bằng $0$.`,
  ),
  "12/bayes-cay": note(
    R`Mỗi đường đi trên cây là một cách dẫn tới kết quả, và xác suất của nó là tích các nhánh. Biết kết quả $A$ đã xảy ra thì xác suất của một nguyên nhân là phần đóng góp của đường đi qua nguyên nhân ấy trong tổng các đường dẫn tới $A$.`,
    R`Chia cho xác suất của nguyên nhân thay vì chia cho tổng các đường dẫn tới kết quả. Với bệnh hiếm, xác suất mắc bệnh sau xét nghiệm dương tính thường nhỏ hơn nhiều so với mức nhiều người đoán.`,
  ),
  "12/giao-do-thi-duong-thang": note(
    R`Một điểm chung của hai đồ thị có cùng hoành độ và cùng tung độ, nên hoành độ làm hai hàm số nhận cùng giá trị. Vì vậy mỗi giao điểm ứng với đúng một nghiệm phân biệt của phương trình $f(x)=g(x)$.`,
    R`Đếm nghiệm kép là hai giao điểm. Nghiệm kép chỉ cho một điểm chung, nên $(x-1)^2(x+2)=0$ ứng với hai giao điểm chứ không phải ba.`,
  ),
  "12/tuong-giao-tham-so": note(
    R`Số nghiệm của phương trình bậc hai quyết định số giao điểm, và dấu của $\Delta$ cho biết số nghiệm. Khi phương trình có nghiệm không phụ thuộc tham số, tách nghiệm đó ra thì phần còn lại đơn giản hơn.`,
    R`Quên điều kiện hai nghiệm khác nhau khi một nghiệm phụ thuộc $m$, hoặc quên rằng hệ số của $x^2$ có thể bằng $0$ với một giá trị nào đó của tham số.`,
  ),
  "12/tiep-xuc-hai-do-thi": note(
    R`Hai đồ thị tiếp xúc tại một điểm khi chạm nhau mà không cắt, nên hiệu $f-g$ không đổi dấu qua điểm đó. Điều này xảy ra khi hiệu có nghiệm kép, tức cả $f-g$ và đạo hàm của nó cùng bằng $0$.`,
    R`Chỉ kiểm tra $f(x_0)=g(x_0)$ mà quên $f'(x_0)=g'(x_0)$, nên nhầm điểm cắt thường với điểm tiếp xúc.`,
  ),
  "12/tinh-tich-co-huong": note(
    R`Mỗi tọa độ của tích có hướng là một định thức cấp hai, và tích vô hướng của nó với $\vec a$ hay $\vec b$ khai triển ra bằng $0$. Vì vậy nó vuông góc với cả hai vectơ.`,
    R`Sai dấu ở tọa độ thứ hai, vì thứ tự là $a_3b_1-a_1b_3$ chứ không phải $a_1b_3-a_3b_1$, hoặc đảo thứ tự hai vectơ nên đổi dấu cả vectơ kết quả.`,
  ),
  "12/dien-tich-tam-giac": note(
    R`Độ dài tích có hướng bằng $|\vec a|\,|\vec b|\sin\varphi$, đúng là diện tích hình bình hành dựng trên hai vectơ. Tam giác là một nửa hình bình hành đó.`,
    R`Quên chia đôi khi tính diện tích tam giác, hoặc lấy tích vô hướng thay cho tích có hướng.`,
  ),
  "12/the-tich-hon-tap": note(
    R`Tích có hướng của hai vectơ cho diện tích đáy, và tích vô hướng với vectơ thứ ba cho chiều cao nhân diện tích đáy, tức thể tích. Ba vectơ nằm trong một mặt phẳng thì chiều cao bằng $0$.`,
    R`Quên trị tuyệt đối nên thể tích âm, hoặc quên chia cho $6$ khi tính thể tích tứ diện.`,
  ),
  "12/mp-qua-ba-diem": note(
    R`Hai vectơ $\overrightarrow{AB}$ và $\overrightarrow{AC}$ nằm trong mặt phẳng, nên tích có hướng của chúng vuông góc với mặt phẳng và là một vectơ pháp tuyến. Điều kiện này chỉ đúng khi ba điểm không thẳng hàng.`,
    R`Dùng một điểm khác $A$ trong công thức mà thay sai tọa độ, hoặc không kiểm tra lại bằng cách thay cả ba điểm vào phương trình vừa viết.`,
  ),
};
