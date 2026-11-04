import type { TopicDang } from "./types.ts";

const R = String.raw;

export const sequenceDang: TopicDang = {
  id: "sequence",
  title: "Dãy số",
  dang: [
    {
      name: "Cấp số cộng",
      nhanDang: "Mỗi số hạng hơn số liền trước một hằng số $d$, hỏi số hạng hoặc tổng.",
      phuongPhap: R`Quy tắc là $u_n=u_1+(n-1)d$ là công thức số hạng, tương đương với định nghĩa cộng dồn khi $n$ nguyên dương. Tổng $S_n=\frac{n}{2}(u_1+u_n)$ cần đúng số số hạng. Dùng $n$ thay cho $n-1$ trong số hạng là sai chỉ số, không phải làm tròn.`,
      viDu: {
        prompt: R`Cấp số cộng có $u_1=3$, $d=4$. Tính $u_{10}$ và $S_{10}$.`,
        steps: [
          { claim: R`Ta có $u_{10}=3+9\cdot 4=39$.`, why: "Từ hạng thứ nhất đến hạng thứ mười có $9$ bước cộng." },
          { claim: R`Ta có $S_{10}=\frac{10}{2}(3+39)=210$.`, why: "Công thức tổng theo hai đầu. Có đúng $10$ số hạng." },
        ],
        ket: R`Kết quả là $u_{10}=39$ và $S_{10}=210$.`,
        check: { expr: "10*(3+39)/2", expect: "210" },
      },
      loi: "Tính $u_{10}=u_1+10d$, đếm thừa một bước.",
      luyen: {
        kind: "luyen",
        prompt: R`Cấp số cộng $u_1=2$, $d=3$. Tính $S_{10}$.`,
        think: "Tính $u_{10}$ trước, rồi mới dùng tổng hai đầu.",
        answer: "Đáp số là $155$",
        steps: [
          { claim: R`Ta có $u_{10}=2+9\cdot 3=29$.`, why: "Chín công sai." },
          { claim: R`Ta có $S_{10}=\frac{10}{2}(2+29)=155$.`, why: "Công thức tổng." },
        ],
        check: { expr: "5*(2+29)", expect: "155" },
      },
    },
    {
      name: "Cấp số nhân và tổng vô hạn",
      nhanDang: "Mỗi số hạng bằng số liền trước nhân với $q$ không đổi.",
      phuongPhap: R`Khi $q\neq 1$, $S_n=u_1\frac{1-q^n}{1-q}$. Tổng vô hạn $S=\frac{u_1}{1-q}$ chỉ khi $|q|<1$. Điều kiện $|q|<1$ là cần và đủ để chuỗi cấp số nhân hội tụ. Nếu $|q|\ge 1$ và $u_1\neq 0$ thì không có tổng vô hạn hữu hạn.`,
      viDu: {
        prompt: R`Cấp số nhân $u_1=2$, $q=3$. Tính $S_5$.`,
        steps: [
          { claim: R`Ta có $q\neq 1$, nên dùng $S_5=2\cdot\frac{3^5-1}{3-1}$.`, why: R`Công thức tổng hữu hạn. Ở tử viết $q^n-1$ khi $q>1$ để tránh dấu trừ kép, tương đương công thức $u_1\frac{1-q^n}{1-q}$.` },
          { claim: R`Ta có $3^5=243$, nên $S_5=2\cdot\frac{242}{2}=242$.`, why: "Rút gọn phân số trước khi kết luận." },
        ],
        ket: "Kết quả là $S_5=242$.",
        check: { expr: "2*(3**5-1)/(3-1)", expect: "242" },
      },
      loi: R`Viết tổng vô hạn khi $|q|\ge 1$.`,
      luyen: {
        kind: "luyen",
        prompt: R`Tính tổng vô hạn $1+\frac{1}{2}+\frac{1}{4}+\cdots$.`,
        think: R`Nhận $u_1=1$, $q=\frac{1}{2}$. Kiểm tra $|q|<1$ trước khi dùng công thức.`,
        answer: "Đáp số là $2$",
        steps: [
          { claim: R`Ta có $|q|=\frac{1}{2}<1$.`, why: "Điều kiện cần và đủ để tổng vô hạn hữu hạn." },
          { claim: R`Ta có $S=\frac{1}{1-\frac{1}{2}}=2$.`, why: "Công thức tổng vô hạn." },
        ],
        check: { expr: "1/(1-Rational(1,2))", expect: "2" },
      },
    },
  ],
  sangTao: [
    {
      kind: "thuc-te",
      prompt: R`Một người gửi đều mỗi tháng $1$ triệu đồng vào cuối tháng, trong $3$ tháng, không lãi. Tổng số tiền đã gửi bằng bao nhiêu?`,
      think: "Không lãi thì đây là cấp số cộng với công sai $0$, tức mỗi hạng bằng $1$. Tổng bằng số tháng nhân số tiền.",
      answer: "Đáp số là $3$ triệu đồng",
      steps: [
        { claim: R`Ba khoản bằng nhau, mỗi khoản $1$ triệu.`, why: "Đề nói không lãi và gửi đều." },
        { claim: R`Tổng bằng $3$.`, why: R`Vì $S_3=3\cdot 1$.` },
      ],
      check: { expr: "3*1", expect: "3" },
    },
    {
      kind: "thuc-te",
      prompt: R`Một quần thể vi khuẩn nhân đôi mỗi giờ, ban đầu có $5$ cá thể. Sau $4$ giờ có bao nhiêu cá thể?`,
      think: "Đây là cấp số nhân, $u_1=5$, $q=2$, số hạng sau $4$ giờ là hạng thứ $5$ nếu tính mốc ban đầu là giờ $0$. Đề hỏi sau $4$ lần nhân đôi, tức nhân $2^4$.",
      answer: "Đáp số là $80$ cá thể",
      steps: [
        { claim: R`Sau $4$ giờ, số cá thể bằng $5\cdot 2^4$.`, why: "Mỗi giờ nhân thêm một lần, đủ bốn lần." },
        { claim: R`Ta có $2^4=16$, nên tích bằng $80$.`, why: "Nhân với số ban đầu." },
      ],
      check: { expr: "5*2**4", expect: "80" },
    },
    {
      kind: "thuc-te",
      prompt: R`Một quả bóng rơi và nảy lên $80\%$ độ cao ngay trước đó. Lần rơi đầu từ $10$ mét. Độ cao ngay trước lần rơi thứ ba bằng bao nhiêu?`,
      think: R`Lần rơi thứ nhất từ $10$ mét. Trước lần thứ hai còn $80\%$, trước lần thứ ba còn $80\%$ của mức đó.`,
      answer: "Đáp số là $6{,}4$ mét",
      steps: [
        { claim: R`Trước lần thứ ba, bóng đã nảy hai lần.`, why: "Từ lần một sang lần ba có hai bước nhân." },
        { claim: R`Độ cao bằng $10\cdot\left(\frac{4}{5}\right)^2=\frac{32}{5}$.`, why: R`Vì $80\%=\frac{4}{5}$.` },
      ],
      check: { expr: "10*(Rational(4,5))**2", expect: "Rational(32,5)" },
    },
    {
      kind: "thuc-te",
      prompt: R`Ghế trong một hội trường có $12$ ghế ở hàng đầu và mỗi hàng sau thêm $2$ ghế. Hàng thứ $8$ có bao nhiêu ghế?`,
      think: "Cấp số cộng, $u_1=12$, $d=2$. Hàng thứ tám cách hàng đầu bảy bước.",
      answer: "Đáp số là $26$ ghế",
      steps: [
        { claim: R`Ta có $u_8=12+7\cdot 2$.`, why: "Công thức số hạng, số bước là $8-1$." },
        { claim: R`Kết quả bằng $26$.`, why: R`Vì $7\cdot 2=14$, cộng $12$.` },
      ],
      check: { expr: "12+7*2", expect: "26" },
    },
    {
      kind: "tu-ra-de",
      prompt: "Hãy tự đặt một cấp số cộng và hỏi tổng mười số hạng đầu. Đề mẫu: $u_1=1$, $d=1$, tức các số tự nhiên từ $1$ đến $10$.",
      think: "Ghi rõ $u_1$, $d$ và số hạng cần cộng. Đừng đếm nhầm số bước.",
      answer: "Tổng mẫu bằng $55$.",
      steps: [
        { claim: R`Ta có $u_{10}=1+9\cdot 1=10$.`, why: "Chín công sai." },
        { claim: R`Ta có $S_{10}=\frac{10}{2}(1+10)=55$.`, why: "Công thức tổng hai đầu." },
      ],
      check: { expr: "10*(1+10)/2", expect: "55" },
    },
  ],
};
