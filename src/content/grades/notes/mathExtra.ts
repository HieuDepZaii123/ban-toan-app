import type { NoteBook } from "./types.ts";
import { note } from "./types.ts";

const R = String.raw;

/** Lời giải thích cho các bài bổ sung của lớp 9, 10, 11 (lopExtra.ts). */
export const mathExtraNotes: NoteBook = {
  "9/lai-suat": note(
    R`Mỗi kỳ, số tiền được nhân với cùng một hệ số $1+r$, vì lãi của kỳ trước cũng sinh lãi. Nhân $n$ lần liên tiếp cho lũy thừa bậc $n$ của hệ số đó.`,
    R`Cộng lãi theo lãi đơn: $100+10+10=120$ thay vì $121$. Lãi kép tính trên cả tiền lãi đã có, nên phải nhân với $1{,}1$ từng kỳ.`,
  ),
  "9/dong-nuoc": note(
    R`Dòng nước chảy theo chiều xuôi nên giúp ca nô nhanh thêm, và cản khi ngược dòng. Cộng hai phương trình thì vận tốc dòng nước mất đi, còn trừ hai phương trình thì vận tốc riêng mất đi.`,
    R`Dùng vận tốc riêng cho cả hai chiều. Xuôi dòng phải cộng vận tốc dòng nước, ngược dòng phải trừ, nên hai vận tốc thực khác nhau.`,
  ),
  "10/doanh-thu-b2": note(
    R`Hàm bậc hai có hệ số $a<0$ tăng đến đỉnh rồi giảm, nên đỉnh cho giá trị lớn nhất. Hoành độ đỉnh nằm chính giữa hai nghiệm, và bằng $-\frac{b}{2a}$.`,
    R`Chọn giá bán làm cho số sản phẩm lớn nhất thay vì doanh thu lớn nhất. Doanh thu là tích của giá và số lượng, hai đại lượng ngược chiều nhau nên phải tìm đỉnh của tích.`,
  ),
  "10/quy-dao-b2": note(
    R`Quỹ đạo của vật chịu trọng lực không đổi là parabol đối xứng qua đường thẳng đứng đi qua đỉnh. Vì thế điểm cao nhất nằm chính giữa chỗ ném và chỗ chạm đất.`,
    R`Lấy nghiệm $x=0$ làm tầm xa. Đó là chỗ ném, còn tầm xa là nghiệm dương còn lại của phương trình $y=0$.`,
  ),
  "11/goc-dt-mp": note(
    R`Góc giữa đường thẳng và mặt phẳng được định nghĩa là góc nhỏ nhất mà đường thẳng tạo với các đường trong mặt phẳng, và đó chính là góc với hình chiếu. Khi cạnh bên vuông góc với đáy, hình chiếu nằm sẵn trong đáy nên tam giác vuông cần tìm hiện ra ngay.`,
    R`Lấy góc giữa $SB$ và $SA$ thay cho góc giữa $SB$ và đáy. Góc đúng phải là góc giữa $SB$ và hình chiếu $AB$ của nó trên đáy.`,
  ),
  "11/the-tich-goc": note(
    R`Thể tích khối chóp bằng một phần ba thể tích khối lăng trụ cùng đáy và cùng chiều cao. Chiều cao tìm được từ góc cho trước qua tam giác vuông chứa cạnh bên.`,
    R`Dùng công thức lăng trụ $V=Bh$ cho khối chóp nên kết quả gấp ba lần. Khối chóp luôn có hệ số một phần ba.`,
  ),
  "11/kc-diem-mp": note(
    R`Đoạn vuông góc là đoạn ngắn nhất nối điểm với mặt phẳng, nên khoảng cách được định nghĩa bằng độ dài đoạn đó. Khi biết thể tích và diện tích đáy, chiều cao suy ra từ công thức thể tích.`,
    R`Lấy khoảng cách từ điểm đến một điểm của mặt phẳng thay vì đến chân đường vuông góc. Phải chứng minh đoạn đó vuông góc với hai đường cắt nhau trong mặt phẳng.`,
  ),
};
