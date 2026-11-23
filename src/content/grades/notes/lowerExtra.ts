import type { NoteBook } from "./types.ts";
import { note } from "./types.ts";

const R = String.raw;

/** Lời giải thích cho các bài bổ sung lớp 1–8 (lopExtra2.ts). */
export const lowerExtraNotes: NoteBook = {
  "6/day-cach-deu": note(
    R`Từ số hạng đầu, mỗi bước sang số hạng sau cộng thêm công sai, nên đến số hạng thứ $n$ phải cộng $n-1$ lần. Ghép số đầu với số cuối, số thứ hai với số kề cuối thì mỗi cặp có cùng tổng.`,
    R`Cộng $n$ lần công sai thay vì $n-1$ lần. Số hạng thứ nhất chưa cộng công sai nào.`,
  ),
  "7/chia-ti-le": note(
    R`Các phần tỉ lệ với $a$, $b$, $c$ nghĩa là chúng bằng $ka$, $kb$, $kc$ với cùng một hệ số $k$. Cộng lại được $k(a+b+c)$ bằng tổng, từ đó tìm được $k$.`,
    R`Lấy tổng chia cho số các tỉ số mà không cộng các tỉ số. Phải chia cho $a+b+c$, tức tổng các phần.`,
  ),
  "6/tinh-nhanh": note(
    R`Các tính chất giao hoán, kết hợp và phân phối luôn đúng với mọi số, nên đổi thứ tự hoặc nhóm lại không làm thay đổi kết quả. Ta chỉ chọn cách nhóm sao cho phép tính ra số tròn.`,
    R`Đặt thừa số chung sai, chẳng hạn $45\cdot99+45$ thành $45\cdot99$. Số hạng cuối $45$ chính là $45\cdot1$, nên nhóm lại là $45\cdot(99+1)$.`,
  ),
  "7/luy-thua-huu-ti": note(
    R`Lũy thừa là phép nhân lặp, nên nhân hai lũy thừa cùng cơ số là cộng số lượng thừa số, tức cộng số mũ. Chia thì bớt thừa số, tức trừ số mũ.`,
    R`Nhân số mũ khi nhân hai lũy thừa cùng cơ số. Với $2^3\cdot2^2$ là cộng số mũ được $2^5$, không phải $2^6$.`,
  ),
  "8/pt-tich": note(
    R`Một tích bằng $0$ thì ít nhất một thừa số bằng $0$, vì tích của hai số khác $0$ thì khác $0$. Do đó chỉ cần cho từng thừa số bằng $0$ rồi giải riêng.`,
    R`Chia hai vế cho $x$ nên mất nghiệm $x=0$. Với $x^2-5x=0$ phải đặt nhân tử chung $x(x-5)=0$, không được chia.`,
  ),
  "8/pt-mau": note(
    R`Phân thức chỉ có nghĩa khi mẫu khác $0$, nên điều kiện được tìm trước. Khử mẫu có thể sinh ra nghiệm làm mẫu bằng $0$, nên mọi nghiệm phải được đối chiếu với điều kiện.`,
    R`Giải xong và nhận luôn nghiệm mà không đối chiếu điều kiện. Nghiệm làm mẫu bằng $0$ là nghiệm ngoại lai và phải bị loại.`,
  ),
};
