import type { TopicDang } from "./types.ts";

const R = String.raw;

export const expDang: TopicDang = {
  id: "exp",
  title: "Mũ và logarit",
  dang: [
    {
      name: "Đưa về cùng cơ số",
      nhanDang: "Phương trình mũ mà hai vế viết được thành lũy thừa của cùng một cơ số dương khác $1$.",
      phuongPhap: R`Với $a>0$ và $a\neq 1$, đẳng thức $a^u=a^v$ tương đương $u=v$. Đây là điều kiện cần và đủ. Nếu cơ số nằm trong $(0;1)$, hàm mũ vẫn đơn ánh nên vẫn tương đương, không cần đổi chiều. Điều kiện cơ số phải được kiểm trước khi dùng.`,
      viDu: {
        prompt: R`Giải $2^{x+1}=16$.`,
        steps: [
          { claim: R`Cơ số $2>1$ hợp lệ, và $16=2^4$.`, why: "Hai vế phải cùng cơ số thì mới so được số mũ." },
          { claim: R`Phương trình tương đương $x+1=4$.`, why: R`Hàm $2^t$ đơn ánh trên $\mathbb{R}$, nên bằng nhau khi và chỉ khi số mũ bằng nhau.` },
          { claim: R`Nghiệm là $x=3$.`, why: "Phương trình bậc nhất này không còn điều kiện loại." },
        ],
        ket: "Nghiệm duy nhất là $x=3$.",
        check: { expr: "2**(3+1)", expect: "16" },
      },
      loi: "Đổi chiều bất phương trình mũ khi cơ số lớn hơn $1$.",
      luyen: {
        kind: "luyen",
        prompt: R`Giải $3^{2x}=81$.`,
        think: "Viết $81$ theo cơ số $3$, rồi dùng tính đơn ánh.",
        answer: "Đáp số là $x=2$",
        steps: [
          { claim: R`Ta có $81=3^4$.`, why: "Vì $3^4=81$." },
          { claim: R`Vậy $2x=4$, nên $x=2$.`, why: "Cơ số $3>1$ nên hai lũy thừa bằng nhau đúng khi số mũ bằng nhau." },
        ],
        check: { expr: "3**(2*2)", expect: "81" },
      },
    },
    {
      name: "Logarit và điều kiện xác định",
      nhanDang: "Phương trình có logarit, hoặc hỏi giá trị của một biểu thức logarit.",
      phuongPhap: R`Quy tắc là $\log_a b=c$ tương đương $a^c=b$ khi $a>0$, $a\neq 1$ và $b>0$. Điều kiện $b>0$ là cần để biểu thức tồn tại. Sau khi giải phải thử lại điều kiện này. Bỏ điều kiện chỉ tìm được điều kiện cần.`,
      viDu: {
        prompt: R`Giải $\log_3(x+2)=2$.`,
        steps: [
          { claim: R`Điều kiện cần là $x+2>0$, tức $x>-2$.`, why: "Đối số của logarit phải dương. Cơ số $3$ đã hợp lệ." },
          { claim: R`Phương trình tương đương $x+2=3^2=9$.`, why: "Định nghĩa logarit, vì đối số sẽ dương nếu nghiệm này thỏa." },
          { claim: R`Ta có $x=7$ thỏa $x>-2$.`, why: "Thử lại điều kiện cần. Nghiệm không bị loại." },
        ],
        ket: "Nghiệm là $x=7$.",
        check: { expr: "log(9,3)", expect: "2" },
      },
      loi: "Nhận nghiệm làm đối số âm hoặc bằng $0$.",
      luyen: {
        kind: "luyen",
        prompt: R`Tính $\log_2 8+\log_3 \frac{1}{9}$.`,
        think: R`Mỗi số hạng đổi về số mũ. Phân số $\frac{1}{9}$ là lũy thừa âm của $3$.`,
        answer: "Đáp số là $1$",
        steps: [
          { claim: R`Ta có $\log_2 8=3$ vì $2^3=8$.`, why: "Định nghĩa." },
          { claim: R`Ta có $\log_3 \frac{1}{9}=\log_3 3^{-2}=-2$.`, why: R`Vì $\log_a(a^k)=k$ khi cơ số hợp lệ.` },
          { claim: R`Tổng bằng $3-2=1$.`, why: "Cộng hai giá trị vừa tìm." },
        ],
        check: { expr: "log(8,2)+log(Rational(1,9),3)", expect: "1" },
      },
    },
  ],
  sangTao: [
    {
      kind: "thuc-te",
      prompt: R`Gửi $100$ triệu đồng, lãi kép $6\%$ mỗi năm, không rút lãi. Sau $3$ năm có bao nhiêu triệu đồng?`,
      think: R`Công thức $T=A(1+r)^n$ với $r=\frac{6}{100}$. Kết quả có thể để dạng phân số rồi làm tròn.`,
      answer: R`Đáp số là $\frac{148877}{1250}$ triệu đồng, khoảng $119{,}10$ triệu.`,
      steps: [
        { claim: R`Ta có $T=100\left(\frac{53}{50}\right)^3$.`, why: R`Vì $1+\frac{6}{100}=\frac{53}{50}$.` },
        { claim: R`Ta có $\left(\frac{53}{50}\right)^3=\frac{148877}{125000}$, nhân $100$ được $\frac{148877}{1250}$.`, why: "Lũy thừa phân số. Không làm tròn trước khi nhân xong." },
      ],
      check: { expr: "100*(Rational(53,50))**3", expect: "Rational(148877,1250)" },
    },
    {
      kind: "thuc-te",
      prompt: R`Một quần thể tăng $8\%$ mỗi năm theo $N=10\cdot(1{,}08)^t$, đơn vị nghìn cá thể. Sau $5$ năm số cá thể bằng bao nhiêu nghìn?`,
      think: R`Thay $t=5$. Viết $1{,}08=\frac{27}{25}$ để có giá trị đúng.`,
      answer: R`Đáp số là $10\cdot\left(\frac{27}{25}\right)^5$ nghìn cá thể.`,
      steps: [
        { claim: R`Ta có $1{,}08=\frac{27}{25}$.`, why: R`Vì $1{,}08=\frac{108}{100}=\frac{27}{25}$.` },
        { claim: R`Sau $5$ năm, $N=10\left(\frac{27}{25}\right)^5$.`, why: R`Thay đúng số mũ. Không cộng $8\%$ năm lần theo lãi đơn.` },
      ],
      check: { expr: "10*(Rational(27,25))**5", expect: "10*(Rational(27,25))**5" },
    },
    {
      kind: "thuc-te",
      prompt: R`Một chất phóng xạ còn $N(t)=80\cdot 2^{-t/10}$ gam sau $t$ năm. Sau $20$ năm còn bao nhiêu gam?`,
      think: R`Số mũ $-\frac{20}{10}=-2$ nghĩa là chia cho $4$, không phải chia cho $2$ hai lần một cách cộng dồn sai.`,
      answer: "Đáp số là $20$ gam",
      steps: [
        { claim: R`Ta có $2^{-20/10}=2^{-2}=\frac{1}{4}$.`, why: "Rút gọn số mũ trước khi nhân." },
        { claim: R`Ta có $N(20)=80\cdot\frac{1}{4}=20$.`, why: "Nhân với lượng ban đầu." },
      ],
      check: { expr: "80*2**(-2)", expect: "20" },
    },
    {
      kind: "thuc-te",
      prompt: R`Độ pH của dung dịch là $-\log_{10}(10^{-3})$. Giá trị bằng bao nhiêu?`,
      think: "Logarit cơ số $10$ của một lũy thừa của $10$ cho đúng số mũ.",
      answer: "Đáp số là $3$",
      steps: [
        { claim: R`Ta có $\log_{10}(10^{-3})=-3$.`, why: "Định nghĩa, cơ số $10$ hợp lệ và đối số dương." },
        { claim: R`Đối dấu được $3$.`, why: "Công thức pH đã có dấu trừ ở ngoài." },
      ],
      check: { expr: "-log(10**(-3),10)", expect: "3" },
    },
    {
      kind: "tu-ra-de",
      prompt: R`Hãy tự đặt một phương trình logarit có đúng một nghiệm, và nhớ ghi điều kiện đối số. Đề mẫu ở lời giải là $\log_2(x-1)=3$.`,
      think: "Viết điều kiện trước. Sau khi đổi về mũ, thử lại điều kiện. Nghiệm không thỏa thì loại.",
      answer: "Nghiệm mẫu là $x=9$.",
      steps: [
        { claim: R`Điều kiện $x-1>0$, tức $x>1$.`, why: "Đối số của logarit phải dương." },
        { claim: R`Phương trình tương đương $x-1=2^3=8$.`, why: "Định nghĩa logarit với cơ số $2$." },
        { claim: R`Ta có $x=9$ thỏa $x>1$.`, why: "Thử lại điều kiện cần." },
      ],
      check: { expr: "log(8,2)", expect: "3" },
    },
  ],
};
