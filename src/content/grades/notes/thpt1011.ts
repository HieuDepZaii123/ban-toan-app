import type { NoteBook } from "./types.ts";
import { note } from "./types.ts";

const R = String.raw;

/** Lời giải thích cho các bài lớp 10 và 11 chi tiết (lop1011extra.ts). */
export const thpt1011Notes: NoteBook = {
  "10/tap-xac-dinh": note(
    R`Phép chia cho $0$ và căn bậc hai của số âm không có nghĩa trong số thực, nên mỗi biểu thức đặt ra một điều kiện cho $x$. Tập xác định là phần chung của mọi điều kiện đó.`,
    R`Quên rằng biểu thức dưới căn ở mẫu phải dương chứ không chỉ không âm, nên nhận nhầm giá trị làm mẫu bằng $0$.`,
  ),
  "10/chan-le": note(
    R`Thay $x$ bằng $-x$ là phép đối xứng qua trục tung. Nếu giá trị không đổi thì đồ thị đối xứng qua trục tung, còn nếu đổi dấu thì đồ thị đối xứng qua gốc tọa độ.`,
    R`Kết luận từ một giá trị cụ thể. Một cặp giá trị chỉ đủ để loại tính chất, còn để khẳng định phải chứng minh cho mọi $x$ và kiểm tra tập xác định đối xứng.`,
  ),
  "10/tinh-tien-do-thi": note(
    R`Điểm $(x;\ y)$ thuộc đồ thị mới $y=f(x-b)$ khi $(x-b;\ y)$ thuộc đồ thị cũ, nên mọi điểm dịch sang phải $b$ đơn vị. Cộng $a$ vào $f$ làm mọi tung độ tăng $a$.`,
    R`Nhầm chiều của phép tịnh tiến ngang: $f(x+1)$ dịch sang trái chứ không sang phải, vì dấu trong ngoặc ngược với chiều dịch.`,
  ),
  "10/don-dieu-bac-hai": note(
    R`Parabol đối xứng qua đường thẳng đi qua đỉnh nên chiều biến thiên đổi ở hoành độ đỉnh. Với $a>0$ đỉnh là điểm thấp nhất, nên hai bên đỉnh giá trị đều tăng khi ra xa đỉnh.`,
    R`Nhầm dấu của hoành độ đỉnh $-\frac{b}{2a}$, hoặc quên xét dấu của $a$ khi kết luận đồng biến hay nghịch biến.`,
  ),
  "10/toa-do-vt": note(
    R`Vectơ chỉ phụ thuộc hiệu của hai điểm, nên lấy tọa độ điểm cuối trừ điểm đầu. Các phép cộng và nhân với số được làm trên từng tọa độ độc lập.`,
    R`Lấy điểm đầu trừ điểm cuối nên đổi dấu cả hai tọa độ, hoặc quên căn bậc hai khi tính độ dài.`,
  ),
  "10/trung-diem-trong-tam": note(
    R`Trung điểm là điểm chia đoạn thành hai phần bằng nhau nên tọa độ là trung bình cộng. Trọng tâm cân bằng ba điểm nên tọa độ là trung bình cộng của ba tọa độ.`,
    R`Chia cho $2$ thay vì $3$ khi tìm trọng tâm, hoặc quên tìm cả hai tọa độ của điểm.`,
  ),
  "10/goc-hai-vt": note(
    R`Tích vô hướng đo mức hai vectơ cùng hướng: bằng tích hai độ dài nhân với $\cos\varphi$. Biết tích vô hướng và độ dài thì suy ra góc, và tích vô hướng bằng $0$ nghĩa là góc vuông.`,
    R`Quên chia cho tích hai độ dài khi tính $\cos\varphi$, hoặc quên căn bậc hai khi tính độ dài.`,
  ),
  "10/dk-song-song-vuong": note(
    R`Hai vectơ cùng phương khi các tọa độ tỉ lệ, tức định thức $x_1y_2-x_2y_1$ bằng $0$. Vuông góc khi tích vô hướng bằng $0$, nên hai điều kiện dùng hai biểu thức khác nhau.`,
    R`Nhầm điều kiện cùng phương với điều kiện vuông góc, vì cả hai đều dẫn tới một biểu thức bằng $0$ nhưng biểu thức khác nhau.`,
  ),
  "11/pt-asin-bcos": note(
    R`Khai triển $\sin(x+\alpha)=\sin x\cos\alpha+\cos x\sin\alpha$ cho thấy $a\sin x+b\cos x=\sqrt{a^2+b^2}\sin(x+\alpha)$. Giá trị lớn nhất của vế trái là $\sqrt{a^2+b^2}$, nên $c$ không được vượt quá số đó.`,
    R`Quên kiểm tra điều kiện $c^2\le a^2+b^2$ rồi vẫn giải. Khi $c^2>a^2+b^2$ phương trình vô nghiệm dù phép biến đổi vẫn làm được.`,
  ),
  "11/pt-bac-hai-lg": note(
    R`Mọi giá trị của $\sin x$ và $\cos x$ nằm trong $[-1;\ 1]$, nên chỉ nghiệm $t$ trong đoạn này mới ứng với một giá trị $x$ nào đó.`,
    R`Giữ lại nghiệm $t$ nằm ngoài $[-1;\ 1]$ rồi giải $\sin x=t$, hoặc quên giải tiếp phương trình lượng giác cơ bản sau khi tìm $t$.`,
  ),
  "11/nghiem-trong-khoang": note(
    R`Mỗi lần $k$ tăng $1$ thì nghiệm tăng một chu kỳ, nên chỉ vài giá trị của $k$ đưa nghiệm vào đúng khoảng. Thử các $k$ liền kề rồi dừng khi nghiệm vượt ra ngoài khoảng.`,
    R`Chỉ lấy một họ nghiệm mà bỏ họ thứ hai, hoặc lấy nghiệm nằm đúng đầu mút khi khoảng là khoảng mở.`,
  ),
  "11/gtln-lg": note(
    R`Biểu thức $a\sin x+b\cos x$ là tích vô hướng của hai vectơ, và theo bất đẳng thức Cauchy–Schwarz trị tuyệt đối của nó không vượt quá tích hai độ dài. Dấu bằng đạt được ở một giá trị $x$ nào đó.`,
    R`Cộng hằng số $d$ vào cả hai đầu của khoảng nhưng quên rằng cận trên và cận dưới đều dịch cùng một lượng.`,
  ),
  "11/pt-mu-an-phu": note(
    R`Viết $a^{2x}=(a^x)^2$ đưa phương trình về bậc hai theo $t=a^x$. Vì lũy thừa của cơ số dương luôn dương nên nghiệm $t\le0$ không ứng với giá trị $x$ nào.`,
    R`Giữ lại nghiệm $t$ âm rồi giải $a^x=t$ ra vô nghĩa, hoặc dừng lại ở $t$ mà quên tìm $x$.`,
  ),
  "11/bpt-log-dk": note(
    R`Logarit chỉ xác định cho số dương, nên điều kiện đi trước mọi phép biến đổi. Hàm logarit đồng biến khi cơ số lớn hơn $1$ nên bỏ logarit không đổi chiều dấu.`,
    R`Bỏ qua điều kiện xác định, hoặc quên đổi chiều bất đẳng thức khi cơ số nằm giữa $0$ và $1$.`,
  ),
  "11/ung-dung-mu-log": note(
    R`Lấy logarit hai vế biến bất phương trình mũ thành bất phương trình bậc nhất theo $n$, và hàm logarit đồng biến nên giữ nguyên chiều. Số kỳ là số nguyên nên phải làm tròn lên.`,
    R`Làm tròn xuống hoặc làm tròn gần nhất, nên số tiền thực tế chưa đạt mục tiêu ở kỳ vừa tìm được.`,
  ),
  "11/so-sanh-mu-log": note(
    R`Hàm mũ và logarit cùng cơ số là hai hàm ngược nhau và cùng chiều biến thiên. Biết chiều biến thiên thì so sánh hai giá trị bằng cách so sánh hai đối số.`,
    R`Quên rằng cơ số nằm giữa $0$ và $1$ làm đổi chiều so sánh, hoặc nhầm $\log_ab$ với $\log_ba$.`,
  ),
};
