import type { NoteBook } from "./types.ts";
import { note } from "./types.ts";

const R = String.raw;

/** Lời giải thích cho các bài lớp 12 bổ sung (lop12extra.ts). */
export const thptExtraNotes: NoteBook = {
  "12/toi-uu": note(
    R`Hàm liên tục trên một đoạn đạt giá trị lớn nhất và nhỏ nhất, và chỉ có thể đạt ở điểm làm đạo hàm bằng $0$ hoặc ở đầu mút. Vì vậy chỉ cần so sánh vài giá trị, không phải thử mọi $x$.`,
    R`Trả lời giá trị của $x$ thay vì đại lượng được hỏi, hoặc nhận nghiệm của đạo hàm nằm ngoài miền. Hộp phải có cạnh đáy dương nên $x$ không thể bằng nửa cạnh tấm tôn.`,
  ),
  "12/tham-so-dd": note(
    R`Tam thức bậc hai có hệ số cao nhất dương và $\Delta'\le 0$ thì đồ thị nằm trên hoặc chạm trục hoành, nên không âm tại mọi $x$. Khi đó đạo hàm không âm và hàm số không bao giờ giảm.`,
    R`Bỏ dấu bằng nên mất giá trị biên của tham số. Với $\Delta'=0$ thì $y'=0$ chỉ tại một điểm, hàm số vẫn đồng biến, nên phải lấy cả giá trị biên.`,
  ),
  "12/boi-cuc-tri": note(
    R`Thừa số $(x-a)^k$ đổi dấu khi $x$ đi qua $a$ nếu $k$ lẻ, vì lũy thừa lẻ giữ dấu của $x-a$. Nếu $k$ chẵn thì lũy thừa luôn không âm nên dấu của $f'$ không đổi.`,
    R`Đếm mọi nghiệm của $f'(x)=0$ làm điểm cực trị. Nghiệm bội chẵn vẫn là nghiệm nhưng $f'$ giữ nguyên dấu, nên điểm đó không phải cực trị của $f$.`,
  ),
  "12/doi-bien-tp": note(
    R`Nếu $F$ là một nguyên hàm của $f$ thì đạo hàm của $F(g(x))$ là $f(g(x))\,g'(x)$ theo quy tắc hàm hợp. Do đó $F(g(x))$ là một nguyên hàm của biểu thức đang tích phân, và giá trị tích phân chỉ phụ thuộc giá trị của $g$ tại hai cận.`,
    R`Đổi biến nhưng giữ nguyên cận theo $x$ khi đã tính theo $t$. Phải đổi cận theo $t=g(x)$, hoặc trả về biến $x$ trước khi thay cận.`,
  ),
  "12/tung-phan-bai": note(
    R`Từ đạo hàm của tích $(uv)'=u'v+uv'$, lấy tích phân hai vế trên đoạn $[a;b]$ được $uv\Big|_a^b=\int_a^b v\,du+\int_a^b u\,dv$. Chuyển vế thì có công thức từng phần.`,
    R`Chọn nhầm $u$ và $dv$ nên tích phân mới còn phức tạp hơn. Với $x e^x$ nên chọn $u=x$ để đạo hàm chỉ còn $1$, chứ không chọn $u=e^x$.`,
  ),
  "12/van-toc-qd": note(
    R`Trong khoảng thời gian rất ngắn $dt$, vật đi được xấp xỉ $|v(t)|\,dt$. Cộng các đoạn nhỏ ấy lại chính là tích phân, và dấu giá trị tuyệt đối cho quãng đường không âm kể cả khi vật đổi chiều.`,
    R`Tính tích phân của $v(t)$ khi vật đổi chiều. Lúc đó phần có $v(t)<0$ bị trừ đi, nên kết quả là độ dời chứ không phải quãng đường, và phải chia đoạn tại các nghiệm của $v(t)=0$.`,
  ),
};
