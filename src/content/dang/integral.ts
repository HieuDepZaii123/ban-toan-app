import type { TopicDang } from "./types.ts";

const R = String.raw;

export const integralDang: TopicDang = {
  id: "integral",
  title: "Nguyên hàm và tích phân",
  dang: [
    {
      name: "Tích phân của đa thức trên một đoạn",
      nhanDang: "Đề cho đa thức và hai cận, hỏi đúng một số.",
      phuongPhap: R`Tìm một nguyên hàm $F$, rồi tính $F(b)-F(a)$. Công thức Newton–Leibniz dùng được khi $f$ liên tục trên đoạn. Đó là điều kiện đủ thường gặp ở phổ thông. Đảo cận làm đổi dấu, nên phải giữ đúng thứ tự cận.`,
      viDu: {
        prompt: R`Tính $\int_0^2 (2x+1)\,dx$.`,
        steps: [
          { claim: R`Một nguyên hàm là $F(x)=x^2+x$.`, why: "Đạo hàm của $x^2+x$ trả lại $2x+1$." },
          { claim: R`Ta có $F(2)-F(0)=6-0=6$.`, why: "Newton–Leibniz. Hàm đa thức liên tục trên $[0;2]$, nên công thức áp dụng được." },
        ],
        ket: "Tích phân bằng $6$.",
        check: { expr: "(2**2+2)-(0)", expect: "6" },
      },
      loi: "Quên trừ giá trị ở cận dưới, hoặc lấy nguyên hàm của $2x$ thành $x^2$ nhưng bỏ nguyên hàm của $1$.",
      luyen: {
        kind: "luyen",
        prompt: R`Tính $\int_0^1 (3x^2+2x)\,dx$.`,
        think: "Nguyên hàm của $3x^2$ là $x^3$, của $2x$ là $x^2$. Sau đó trừ theo hai cận.",
        answer: "Đáp số là $2$",
        steps: [
          { claim: R`Nguyên hàm $F(x)=x^3+x^2$.`, why: "Đạo hàm từng số hạng để kiểm tra." },
          { claim: R`Ta có $F(1)-F(0)=2$.`, why: "Cận dưới cho $0$, nên kết quả bằng đúng $F(1)$." },
        ],
        check: { expr: "1+1", expect: "2" },
      },
    },
    {
      name: "Diện tích giữa hai đồ thị",
      nhanDang: "Đề hỏi diện tích miền nằm giữa hai đường trên một đoạn.",
      phuongPhap: R`Diện tích là $\int_a^b |f-g|\,dx$. Trị tuyệt đối bắt buộc vì tích phân thường cho diện tích có dấu. Trên từng khoảng $f-g$ không đổi dấu, ta bỏ trị tuyệt đối theo dấu đó. Bỏ trị tuyệt đối ngay từ đầu chỉ là điều kiện đủ khi đã chứng minh $f\ge g$.`,
      viDu: {
        prompt: R`Tính diện tích giữa $y=x$ và $y=x^2$ trên $[0;1]$.`,
        steps: [
          { claim: R`Trên $[0;1]$, $x\ge x^2$.`, why: "Vì $x-x^2=x(1-x)$ không âm khi $x$ nằm trong đoạn này." },
          { claim: R`Diện tích bằng $\int_0^1 (x-x^2)\,dx=\frac{1}{2}-\frac{1}{3}=\frac{1}{6}$.`, why: R`Đã biết dấu nên bỏ được trị tuyệt đối. Nguyên hàm là $\frac{x^2}{2}-\frac{x^3}{3}$.` },
        ],
        ket: R`Diện tích bằng $\frac{1}{6}$.`,
        check: { expr: "Rational(1,2)-Rational(1,3)", expect: "Rational(1,6)" },
      },
      loi: "Lấy tích phân $x-x^2$ cả trên đoạn mà parabol nằm phía trên đường thẳng.",
      luyen: {
        kind: "luyen",
        prompt: R`Tính $\int_0^2 (2x-x^2)\,dx$.`,
        think: R`Hàm $2x-x^2$ không âm trên $[0;2]$ vì $x(2-x)\ge 0$. Tích phân này chính là diện tích dưới parabol.`,
        answer: R`Đáp số là $\frac{4}{3}$`,
        steps: [
          { claim: R`Nguyên hàm là $x^2-\frac{x^3}{3}$.`, why: "Đạo hàm trả lại $2x-x^2$." },
          { claim: R`Tại $2$ được $4-\frac{8}{3}=\frac{4}{3}$, tại $0$ được $0$.`, why: "Newton–Leibniz trên đoạn hàm đa thức liên tục." },
        ],
        check: { expr: "4-Rational(8,3)", expect: "Rational(4,3)" },
      },
    },
  ],
  sangTao: [
    {
      kind: "thuc-te",
      prompt: R`Vận tốc một xe là $v(t)=6t$ mét mỗi giây trên $[0;3]$. Quãng đường đi được bằng bao nhiêu?`,
      think: "Quãng đường theo một chiều là tích phân vận tốc không âm.",
      answer: "Đáp số là $27$ mét",
      steps: [
        { claim: R`Ta có $v(t)\ge 0$ trên đoạn này.`, why: "Không phải lấy trị tuyệt đối." },
        { claim: R`Ta có $\int_0^3 6t\,dt=3t^2$ từ $0$ đến $3$ bằng $27$.`, why: "Nguyên hàm của $6t$ là $3t^2$." },
      ],
      check: { expr: "3*3**2", expect: "27" },
    },
    {
      kind: "thuc-te",
      prompt: R`Một mảnh vườn có biên trên là $y=4-x^2$ và biên dưới là trục hoành, từ $x=-2$ đến $x=2$. Diện tích bằng bao nhiêu?`,
      think: R`Parabol cắt trục hoành tại $\pm 2$ và nằm phía trên giữa hai nghiệm. Có thể tính một nửa rồi nhân đôi vì hàm chẵn.`,
      answer: R`Đáp số là $\frac{32}{3}$`,
      steps: [
        { claim: R`Trên $[-2;2]$, $4-x^2\ge 0$.`, why: R`Hai nghiệm của $4-x^2$ là $\pm 2$, hệ số của $x^2$ âm nên trong khoảng giữa hàm không âm.` },
        { claim: R`Ta có $\int_{-2}^{2}(4-x^2)\,dx=2\int_0^2(4-x^2)\,dx=2\left(8-\frac{8}{3}\right)=\frac{32}{3}$.`, why: R`Hàm chẵn. Nguyên hàm $4x-\frac{x^3}{3}$ tại $2$ bằng $\frac{16}{3}$.` },
      ],
      check: { expr: "2*(8-Rational(8,3))", expect: "Rational(32,3)" },
    },
    {
      kind: "thuc-te",
      prompt: R`Nước chảy vào bể với lưu lượng $r(t)=2$ lít mỗi phút, đều trong $15$ phút. Thể tích nước vào bể bằng bao nhiêu?`,
      think: "Lưu lượng không đổi thì thể tích là tích phân của hằng số, tức là tích lưu lượng với thời gian.",
      answer: "Đáp số là $30$ lít",
      steps: [
        { claim: R`Ta có $\int_0^{15} 2\,dt=2\cdot 15$.`, why: "Nguyên hàm của hằng số $2$ là $2t$." },
        { claim: R`Kết quả bằng $30$.`, why: "Lưu lượng dương nên không xét chiều ngược." },
      ],
      check: { expr: "2*15", expect: "30" },
    },
    {
      kind: "thuc-te",
      prompt: R`Tính $\int_0^1 x e^x\,dx$ bằng tích phân từng phần.`,
      think: "Chọn $u=x$ để đạo hàm của $u$ làm mất bậc. Phần $e^x$ đi vào $dv$.",
      answer: "Đáp số là $1$",
      steps: [
        { claim: R`Đặt $u=x$, $dv=e^x dx$, thì $du=dx$ và $v=e^x$.`, why: R`Công thức từng phần là $uv-\int v\,du$.` },
        { claim: R`Ta có $\left[xe^x\right]_0^1-\int_0^1 e^x\,dx=e-(e-1)=1$.`, why: "Cận $0$ của $xe^x$ bằng $0$. Nguyên hàm của $e^x$ là chính nó." },
      ],
      check: { expr: "E-(E-1)", expect: "1" },
    },
    {
      kind: "tu-ra-de",
      prompt: "Hãy tự đặt một bài diện tích giữa một đường thẳng và một parabol trên một đoạn mà đường thẳng nằm phía trên. Đề mẫu ở lời giải dùng $y=2x$ và $y=x^2$ trên $[0;2]$.",
      think: "Trước khi bỏ trị tuyệt đối, phải chỉ ra khoảng nào thì hiệu không âm.",
      answer: R`Diện tích mẫu bằng $\frac{4}{3}$.`,
      steps: [
        { claim: R`Trên $[0;2]$, $2x-x^2=x(2-x)\ge 0$.`, why: "Cả hai thừa số không âm trong đoạn." },
        { claim: R`Diện tích bằng $\int_0^2(2x-x^2)\,dx=\frac{4}{3}$.`, why: R`Đã chứng minh dấu, rồi dùng nguyên hàm $x^2-\frac{x^3}{3}$.` },
      ],
      check: { expr: "4-Rational(8,3)", expect: "Rational(4,3)" },
    },
  ],
};
