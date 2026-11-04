import type { TopicDang } from "./types.ts";

const R = String.raw;

export const limitDang: TopicDang = {
  id: "limit",
  title: "Giới hạn",
  dang: [
    {
      name: R`Dạng $\frac{0}{0}$ của phân thức`,
      nhanDang: "Thay điểm vào phân thức thì tử và mẫu cùng bằng $0$.",
      phuongPhap: R`Dạng $\frac{0}{0}$ chưa cho giá trị giới hạn. Cần phân tích và rút nhân tử chung, với điều kiện $x$ khác điểm đang xét. Rút gọn tương đương với hàm cũ trên tập đã bỏ điểm đó. Giới hạn không đòi hàm xác định tại chính điểm, nên sau khi rút gọn được phép thay số.`,
      viDu: {
        prompt: R`Tính $\lim_{x\to 2}\frac{x^2-4}{x-2}$.`,
        steps: [
          { claim: R`Thay $x=2$ được $\frac{0}{0}$, nên chưa kết luận.`, why: "Phép chia cho $0$ không có nghĩa. Đây chỉ là dạng vô định." },
          { claim: R`Với $x\neq 2$, $\frac{(x-2)(x+2)}{x-2}=x+2$.`, why: R`Hiệu bình phương. Rút gọn hợp lệ đúng trên miền $x\neq 2$, là miền dùng để lấy giới hạn.` },
          { claim: R`Giới hạn bằng $2+2=4$.`, why: R`Hàm $x+2$ trùng hàm cũ khi $x\neq 2$ và liên tục tại $2$.` },
        ],
        ket: "Giới hạn bằng $4$.",
        check: { expr: "2+2", expect: "4" },
      },
      loi: "Thay $x=2$ vào biểu thức gốc và viết kết quả bằng $0$.",
      luyen: {
        kind: "luyen",
        prompt: R`Tính $\lim_{x\to 0}\frac{\sqrt{x+4}-2}{x}$.`,
        think: "Nhân liên hợp để tạo nhân tử $x$ ở tử, rồi rút với mẫu. Sau đó mới thay $x=0$.",
        answer: R`Đáp số là $\frac{1}{4}$`,
        steps: [
          { claim: R`Nhân liên hợp, với $x\neq 0$, được $\frac{1}{\sqrt{x+4}+2}$.`, why: R`Vì $(\sqrt{x+4}-2)(\sqrt{x+4}+2)=x$.` },
          { claim: R`Thay $x=0$ vào biểu thức đã rút được $\frac{1}{2+2}=\frac{1}{4}$.`, why: R`Biểu thức mới liên tục tại $0$ và trùng hàm cũ khi $x\neq 0$.` },
        ],
        check: { expr: "1/(2+2)", expect: "Rational(1,4)" },
      },
    },
    {
      name: "Giới hạn tại vô cực của hai đa thức",
      nhanDang: "Tử và mẫu là đa thức, $x$ tiến ra vô cực.",
      phuongPhap: R`Chia tử và mẫu cho lũy thừa cao nhất của $x$ ở mẫu. Các số hạng có mẫu là lũy thừa dương của $x$ tiến tới $0$. Nếu bậc tử nhỏ hơn bậc mẫu, giới hạn bằng $0$. Nếu bậc bằng nhau, giới hạn bằng tỉ số hai hệ số cao nhất. Nếu bậc tử lớn hơn, giới hạn không hữu hạn. Phải xét đúng trường hợp bậc, không dùng một công thức cho cả ba.`,
      viDu: {
        prompt: R`Tính $\lim_{x\to\infty}\frac{2x^2+1}{x^2-3x}$.`,
        steps: [
          { claim: R`Bậc tử và bậc mẫu cùng bằng $2$.`, why: "Xếp đúng trường hợp trước khi chia." },
          { claim: R`Chia cho $x^2$ được $\frac{2+\frac{1}{x^2}}{1-\frac{3}{x}}$.`, why: R`Tương đương với phân thức cũ khi $x\neq 0$, còn khi $x$ ra vô cực thì $x\neq 0$.` },
          { claim: R`Tử tiến tới $2$, mẫu tiến tới $1$, giới hạn bằng $2$.`, why: R`Mỗi số hạng $\frac{1}{x^k}$ với $k>0$ tiến tới $0$.` },
        ],
        ket: "Giới hạn bằng $2$.",
        check: { expr: "(2*100+Rational(1,100))/(100-30)", expect: "(200+Rational(1,100))/70" },
      },
      loi: "Kết luận giới hạn bằng $0$ chỉ vì có $x$ ở mẫu, dù bậc tử không nhỏ hơn.",
      luyen: {
        kind: "luyen",
        prompt: R`Tính $\lim_{x\to 0}\frac{\sin 3x}{x}$.`,
        think: R`Đưa về $\frac{\sin t}{t}$ bằng cách nhóm hệ số $3$.`,
        answer: "Đáp số là $3$",
        steps: [
          { claim: R`Ta có $\frac{\sin 3x}{x}=3\cdot\frac{\sin 3x}{3x}$ khi $x\neq 0$.`, why: "Nhân và chia cho $3$. Giới hạn không dùng giá trị tại $0$." },
          { claim: R`Khi $x\to 0$ thì $3x\to 0$, và $\frac{\sin t}{t}\to 1$.`, why: "Giới hạn lượng giác cơ bản, với $t=3x$." },
          { claim: R`Vậy giới hạn bằng $3\cdot 1=3$.`, why: "Tích của hằng số với giới hạn bằng $1$." },
        ],
        check: { expr: "3*1", expect: "3" },
      },
    },
  ],
  sangTao: [
    {
      kind: "thuc-te",
      prompt: R`Nồng độ thuốc trong máu theo mô hình $\frac{5t}{t+2}$ mg/L khi $t>0$ tính bằng giờ. Nồng độ tiến tới bao nhiêu khi thời gian rất lớn?`,
      think: "Bậc tử và mẫu bằng nhau. Giới hạn là tỉ số hệ số.",
      answer: "Đáp số là $5$ mg/L",
      steps: [
        { claim: R`Chia tử và mẫu cho $t$ được $\frac{5}{1+\frac{2}{t}}$.`, why: "Vì $t>0$ nên chia được." },
        { claim: R`Khi $t$ ra vô cực, biểu thức tiến tới $5$.`, why: R`Vì $\frac{2}{t}$ tiến tới $0$.` },
      ],
      check: { expr: "(5*100)/(100+2)", expect: "Rational(500,102)" },
    },
    {
      kind: "thuc-te",
      prompt: R`Hiệu suất một quy trình là $1-\frac{1}{n}$ với $n$ nguyên dương. Khi $n$ rất lớn, hiệu suất tiến tới bao nhiêu?`,
      think: R`Hằng số $1$ giữ nguyên. Số hạng $\frac{1}{n}$ tiến tới $0$.`,
      answer: "Đáp số là $1$",
      steps: [
        { claim: R`Ta có $\frac{1}{n}\to 0$ khi $n\to\infty$.`, why: "Nghịch đảo của đại lượng ra vô cực." },
        { claim: R`Hiệu tiến tới $1-0=1$.`, why: "Giới hạn của hiệu bằng hiệu các giới hạn hữu hạn." },
      ],
      check: { expr: "1-0", expect: "1" },
    },
    {
      kind: "thuc-te",
      prompt: R`Một cảm biến báo $\frac{s^2-1}{s-1}$ khi tín hiệu $s$ tiến tới $1$ nhưng chưa bằng $1$. Giá trị cảm biến tiến tới bao nhiêu?`,
      think: R`Dạng $\frac{0}{0}$. Phân tích $s^2-1$ trước khi thay.`,
      answer: "Đáp số là $2$",
      steps: [
        { claim: R`Với $s\neq 1$, $\frac{(s-1)(s+1)}{s-1}=s+1$.`, why: "Hiệu bình phương, rút gọn ngoài điểm $s=1$." },
        { claim: R`Biểu thức tiến tới $2$.`, why: "Vì $s+1$ liên tục tại $1$." },
      ],
      check: { expr: "1+1", expect: "2" },
    },
    {
      kind: "thuc-te",
      prompt: R`Tỉ lệ hao hụt còn lại sau nhiều vòng là $\left(\frac{9}{10}\right)^n$. Khi số vòng $n$ ra vô cực, tỉ lệ này tiến tới bao nhiêu?`,
      think: "Cơ số có trị tuyệt đối nhỏ hơn $1$, nên lũy thừa tiến tới $0$, không tiến tới $1$.",
      answer: "Đáp số là $0$",
      steps: [
        { claim: R`Ta có $\left|\frac{9}{10}\right|<1$.`, why: "Điều kiện để lũy thừa tiến tới $0$." },
        { claim: R`Vậy $\left(\frac{9}{10}\right)^n\to 0$.`, why: "Định lý giới hạn của cấp số nhân." },
      ],
      check: { expr: "Abs(Rational(9,10))", expect: "Rational(9,10)" },
    },
    {
      kind: "tu-ra-de",
      prompt: R`Hãy tự đặt một giới hạn dạng $\frac{0}{0}$ của phân thức bậc hai trên bậc nhất. Đề mẫu: $\lim_{x\to 3}\frac{x^2-9}{x-3}$.`,
      think: "Đừng thay số vào dạng vô định. Rút nhân tử rồi mới thay.",
      answer: "Giới hạn mẫu bằng $6$.",
      steps: [
        { claim: R`Với $x\neq 3$, phân thức bằng $x+3$.`, why: "Vì $x^2-9=(x-3)(x+3)$." },
        { claim: R`Giới hạn bằng $6$.`, why: "Hàm $x+3$ liên tục tại $3$." },
      ],
      check: { expr: "3+3", expect: "6" },
    },
  ],
};
