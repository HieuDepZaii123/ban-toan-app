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
};
