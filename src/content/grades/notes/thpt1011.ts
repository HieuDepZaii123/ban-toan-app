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
    R`Nhầm $\overrightarrow{AB}$ với $\overrightarrow{BA}$ nên ra tọa độ đối nhau, hoặc cộng độ dài hai vectơ thay vì cộng tọa độ khi tính độ dài của tổng.`,
  ),
  "10/trung-diem-trong-tam": note(
    R`Trung điểm là điểm chia đoạn thành hai phần bằng nhau nên tọa độ là trung bình cộng. Trọng tâm cân bằng ba điểm nên tọa độ là trung bình cộng của ba tọa độ.`,
    R`Nhầm thứ tự khi tìm đầu mút còn lại từ trung điểm: phải lấy $B=2M-A$ chứ không phải $M-A$, và không dùng công thức chia $2$ cho trọng tâm.`,
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
    R`Cho rằng giá trị lớn nhất là $|a|+|b|$, vì hai hàm $\sin x$ và $\cos x$ không đạt giá trị lớn nhất cùng lúc.`,
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
  "10/vi-tri-hai-dt": note(
    R`Hai đường thẳng có pháp tuyến không cùng phương thì cắt nhau đúng một điểm. Khi hai pháp tuyến cùng phương, hai đường hoặc không có điểm chung hoặc trùng nhau, và một điểm thử phân biệt hai trường hợp.`,
    R`Kết luận song song chỉ vì định thức bằng $0$ mà quên kiểm tra trùng nhau, hoặc nhân sai hệ số khi so sánh tỉ lệ ba hệ số.`,
  ),
  "10/goc-hai-dt": note(
    R`Góc giữa hai đường thẳng bằng góc giữa hai pháp tuyến hoặc bù với nó. Lấy trị tuyệt đối của tích vô hướng để luôn được góc không tù.`,
    R`Bỏ trị tuyệt đối nên ra góc tù cho hai đường thẳng, hoặc dùng chỉ phương của một đường và pháp tuyến của đường kia.`,
  ),
  "10/kc-hai-song-song": note(
    R`Khoảng cách giữa hai đường song song bằng khoảng cách từ một điểm bất kì của đường này đến đường kia. Khi cùng hệ số $a$ và $b$, điều đó rút gọn thành hiệu hai hằng số chia cho độ dài pháp tuyến.`,
    R`Dùng công thức khi hai phương trình chưa có cùng hệ số $a$, $b$, chẳng hạn $x+y-2=0$ và $2x+2y+3=0$. Phải đưa về cùng hệ số trước.`,
  ),
  "10/lap-pt-dt": note(
    R`Đường song song giữ nguyên pháp tuyến, nên chỉ còn hằng số chưa biết và một điểm đủ để tìm nó. Đường vuông góc dùng chỉ phương của đường kia làm pháp tuyến.`,
    R`Nhầm pháp tuyến với chỉ phương khi viết đường vuông góc, hoặc quên đổi dấu hằng số khi chuyển từ dạng $a(x-x_0)+b(y-y_0)=0$ sang $ax+by+c=0$.`,
  ),
  "10/so-trung-binh": note(
    R`Số trung bình là tổng chia cho cỡ mẫu, và mỗi giá trị lặp lại được tính bằng tần số của nó. Biết số trung bình và cỡ mẫu thì suy ra tổng, rồi tìm được giá trị thêm hoặc bớt.`,
    R`Chia cho số giá trị khác nhau thay vì cỡ mẫu, hoặc khi thêm một giá trị vẫn dùng cỡ mẫu cũ để tính trung bình mới.`,
  ),
  "10/so-ngoai-le": note(
    R`Khoảng tứ phân vị chứa nửa số liệu ở giữa, nên các giá trị cách xa nó hơn một lần rưỡi bề rộng ấy là bất thường so với phần lớn mẫu. Ta dùng tứ phân vị vì chúng ít bị ảnh hưởng bởi chính các giá trị cực đoan.`,
    R`Tính cận bằng độ lệch chuẩn thay vì khoảng tứ phân vị, hoặc cho rằng giá trị ngoại lệ luôn là dữ liệu sai nên có thể bỏ ngay.`,
  ),
  "11/phep-chieu-ss": note(
    R`Phép chiếu song song biến các đường song song thành đường song song và giữ tỉ số trên mỗi đường, nên giữ trung điểm. Nó không giữ độ dài hay góc vì các đường chiếu nghiêng so với mặt phẳng.`,
    R`Cho rằng hình chiếu của góc vuông vẫn vuông, hoặc của đoạn bằng nhau trên hai đường không song song vẫn bằng nhau. Chỉ tỉ số trên cùng đường hoặc đường song song được giữ.`,
  ),
  "11/hinh-hop-11": note(
    R`Đường chéo đáy và chiều cao là hai cạnh góc vuông của một tam giác vuông có đường chéo hình hộp là cạnh huyền. Áp dụng Pi-ta-go hai lần cho công thức $\sqrt{a^2+b^2+c^2}$.`,
    R`Dùng công thức đường chéo hình lập phương $a\sqrt3$ cho hình hộp chữ nhật không đều, hoặc tính diện tích toàn phần thiếu hệ số $2$.`,
  ),
  "11/quy-tac-vecto-kg": note(
    R`Mỗi quy tắc cộng chỉ là cách đi từ điểm đầu đến điểm cuối qua các điểm trung gian, và kết quả không phụ thuộc đường đi. Hình hộp có ba cạnh xuất phát từ một đỉnh, nên tổng ba vectơ đó là đường chéo qua đỉnh ấy.`,
    R`Cộng hai vectơ mà điểm cuối vectơ đầu không trùng điểm đầu vectơ sau, hoặc dùng quy tắc hình hộp cho ba vectơ không cùng xuất phát từ một đỉnh.`,
  ),
  "11/phan-tich-vecto": note(
    R`Ba cạnh của hình hộp là ba vectơ không đồng phẳng nên làm cơ sở, và mọi vectơ đi từ đỉnh này đến đỉnh khác là một đường đi dọc cạnh. Đổi chiều một cạnh đổi dấu hệ số tương ứng.`,
    R`Quên đổi dấu khi đi ngược chiều cạnh, như viết $\overrightarrow{BA}=\vec a$, hoặc bỏ sót hệ số $\frac12$ khi đi tới trung điểm.`,
  ),
  "11/tich-vo-huong-hinh": note(
    R`Tích vô hướng đo mức hai vectơ cùng hướng, bằng tích hai độ dài nhân $\cos\varphi$. Bình phương độ dài của tổng khai triển như bình phương một tổng, và số hạng giữa chính là tích vô hướng.`,
    R`Lấy góc của hai đoạn thẳng thay cho góc của hai vectơ. Khi hai vectơ không cùng điểm đầu phải tịnh tiến về cùng một điểm trước.`,
  ),
  "11/dong-phang-3-vecto": note(
    R`Nếu $\vec c=m\vec a+n\vec b$ thì $\vec c$ nằm trong mặt phẳng của $\vec a$ và $\vec b$, nên ba vectơ cùng nằm trong một mặt phẳng. Ngược lại ba cạnh của hình hộp không đồng phẳng.`,
    R`Cho rằng ba vectơ đồng phẳng chỉ vì có một cặp cùng phương. Điều kiện đúng là một vectơ viết được qua hai vectơ không cùng phương còn lại.`,
  ),
  "11/goc-hai-dt-cheo": note(
    R`Góc giữa hai đường thẳng chỉ phụ thuộc phương của chúng, nên tịnh tiến một đường thẳng cắt đường kia mà không đổi góc. Dùng vectơ chỉ phương cho công thức gọn và không cần dựng hình.`,
    R`Bỏ trị tuyệt đối nên ra góc tù, hoặc lấy góc giữa hai vectơ nối các đỉnh thay cho góc giữa hai đường thẳng.`,
  ),
  "11/goc-duong-mat-11": note(
    R`Hình chiếu vuông góc của đường thẳng lên mặt phẳng là đường thẳng gần nhất với nó, nên góc giữa đường và hình chiếu là góc nhỏ nhất giữa đường và mặt. Tam giác vuông tạo bởi đường, hình chiếu và đường vuông góc cho tỉ số lượng giác.`,
    R`Dùng cos thay cho sin khi biết khoảng cách từ điểm đến mặt phẳng, hoặc lấy góc giữa đường và đường vuông góc với mặt phẳng.`,
  ),
  "11/goc-nhi-dien-11": note(
    R`Đường thẳng trong mỗi mặt vuông góc với giao tuyến tại cùng một điểm cho góc phẳng của nhị diện. Nếu đường vuông góc với mặt phẳng kia nằm trong mặt thứ nhất thì hai mặt vuông góc nhau.`,
    R`Lấy góc giữa hai cạnh bất kì của hai mặt thay vì góc giữa hai đường cùng vuông góc với giao tuyến.`,
  ),
  "11/kc-diem-duong": note(
    R`Hai cách tính diện tích tam giác, nửa tích hai cạnh góc vuông và nửa đáy nhân đường cao, bằng nhau nên đường cao bằng tích hai cạnh góc vuông chia cạnh huyền. Khoảng cách luôn đo theo đường vuông góc.`,
    R`Lấy độ dài một cạnh nghiêng thay cho đường vuông góc, hoặc quên chia cho cạnh huyền khi dùng công thức đường cao.`,
  ),
  "11/kc-song-song-kg": note(
    R`Mọi điểm của đường thẳng song song với mặt phẳng cách mặt phẳng một khoảng như nhau, và mọi điểm của mặt phẳng này cách mặt phẳng song song với nó một khoảng như nhau. Vì vậy chỉ cần chọn điểm thuận tiện.`,
    R`Chọn điểm rồi tính khoảng cách đến một mặt phẳng không phải mặt phẳng cần tìm, hoặc không chứng minh được hạ vuông góc xuống đúng mặt phẳng.`,
  ),
  "11/kc-cheo-nhau": note(
    R`Hai đường chéo nhau có đúng một đoạn vuông góc chung, và nó bằng khoảng cách giữa đường này và mặt phẳng chứa đường kia song song với nó. Khi một đường vuông góc mặt phẳng chứa đường kia, chiếu đường đó thành một điểm.`,
    R`Lấy khoảng cách giữa hai điểm bất kì của hai đường thay cho độ dài đoạn vuông góc chung, hoặc quên chiếu về cùng một mặt phẳng.`,
  ),
  "11/kc-the-tich": note(
    R`Thể tích tứ diện tính theo hai cách: đáy này với chiều cao đã biết, hoặc đáy kia với chiều cao cần tìm. Cho hai kết quả bằng nhau thì chiều cao cần tìm là $\frac{3V}{S}$.`,
    R`Quên nhân $3$ trong $\frac{3V}{S}$, hoặc dùng diện tích sai mặt, tức không phải mặt đang cần tính khoảng cách tới.`,
  ),
  "11/thales-kg": note(
    R`Các mặt phẳng song song cắt hai đường thẳng tạo ra các tam giác đồng dạng, nên các cặp đoạn tương ứng cùng tỉ lệ. Chọn đúng cặp đoạn tương ứng, đo từ cùng một phía.`,
    R`Viết sai thứ tự đoạn thẳng trong tỉ lệ thức, chẳng hạn $\frac{SM}{MA}$ thay cho $\frac{SM}{SA}$ khi tính $MN$.`,
  ),
  "11/thiet-dien-ss": note(
    R`Mặt phẳng song song với đáy cắt hình chóp thành hình đồng dạng với đáy, và hình chóp nhỏ đồng dạng với hình chóp lớn. Độ dài nhân $k$, diện tích nhân $k^2$ và thể tích nhân $k^3$.`,
    R`Dùng $k$ thay cho $k^2$ khi tính diện tích, hoặc quên rằng tỉ số $k$ được tính từ đỉnh chứ không từ đáy.`,
  ),
};
