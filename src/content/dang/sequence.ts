import type { TopicDang } from "./types.ts";

const R = String.raw;

export const sequenceDang: TopicDang = {
  id: "sequence",
  title: "Dãy số",
  dang: [
    {
      name: "Cấp số cộng",
      nhanDang: "Mỗi số hạng hơn số liền trước một hằng số, hỏi số hạng hoặc tổng.",
      phuongPhap: R`Với công sai $d$, số hạng là $u_n=u_1+(n-1)d$. Công thức này tương đương với việc cộng $d$ đúng $n-1$ lần. Tổng $n$ số hạng đầu là $S_n=\frac{n}{2}(u_1+u_n)$, hoặc $S_n=\frac{n}{2}\bigl(2u_1+(n-1)d\bigr)$. Dùng $n$ thay cho $n-1$ là đếm thừa một bước.`,
      viDu: {
        prompt: R`Cấp số cộng có $u_1=3$, $d=4$. Tính $u_{10}$ và $S_{10}$.`,
        steps: [
          { claim: R`Ta có $u_{10}=3+9\cdot 4=39$.`, why: "Từ hạng thứ nhất đến hạng thứ mười có đúng chín bước cộng." },
          { claim: R`Ta có $S_{10}=\frac{10}{2}(3+39)=210$.`, why: "Công thức tổng theo hai đầu. Có đúng mười số hạng." },
        ],
        ket: R`Kết quả là $u_{10}=39$ và $S_{10}=210$.`,
        checks: [
          { expr: "3+9*4", expect: "39" },
          { expr: "10*(3+39)/2", expect: "210" },
        ],
      },
      loi: "Tính $u_{10}=u_1+10d$, đếm thừa một bước.",
      luyen: {
        kind: "luyen",
        prompt: R`Cấp số cộng $u_1=2$, $d=3$. Tính $S_{10}$.`,
        think: "Tính $u_{10}$ trước bằng chín công sai, rồi mới dùng tổng hai đầu.",
        answer: R`Đáp số là $155$.`,
        steps: [
          { claim: R`Ta có $u_{10}=2+9\cdot 3=29$.`, why: "Số bước là $10-1$, không phải $10$." },
          { claim: R`Ta có $S_{10}=\frac{10}{2}(2+29)=155$.`, why: "Công thức tổng hai đầu với đúng mười số hạng." },
        ],
        checks: [{ expr: "5*(2+29)", expect: "155" }],
      },
    },
    {
      name: "Cấp số nhân và tổng của dãy",
      nhanDang: "Mỗi số hạng bằng số liền trước nhân với một hằng số $q$.",
      phuongPhap: R`Số hạng là $u_n=u_1 q^{n-1}$. Khi $q\neq 1$, tổng hữu hạn là $S_n=u_1\frac{1-q^n}{1-q}$. Nếu $|q|<1$ thì dãy các tổng riêng tiến tới $\frac{u_1}{1-q}$. Điều kiện $|q|<1$ là cần và đủ để tổng vô hạn ấy hữu hạn khi $u_1\neq 0$. Nếu $|q|\ge 1$ và $u_1\neq 0$ thì không có tổng vô hạn hữu hạn.`,
      viDu: {
        prompt: R`Cấp số nhân $u_1=2$, $q=3$. Tính $S_5$.`,
        steps: [
          { claim: R`Vì $q\neq 1$, $S_5=2\cdot\frac{1-3^5}{1-3}$.`, why: R`Công thức tổng hữu hạn. Mẫu $1-q$ khác $0$ đúng vì $q\neq 1$.` },
          { claim: R`Ta có $3^5=243$, nên $S_5=2\cdot\frac{1-243}{-2}=242$.`, why: "Rút gọn phân số. Công thức này không phải tổng vô hạn, vì $|q|=3$ không nhỏ hơn $1$." },
        ],
        ket: "Kết quả là $S_5=242$.",
        checks: [{ expr: "2*(1-3**5)/(1-3)", expect: "242" }],
      },
      loi: "Viết tổng vô hạn khi $|q|$ không nhỏ hơn $1$.",
      luyen: {
        kind: "luyen",
        prompt: R`Tính tổng vô hạn $1+\frac{1}{2}+\frac{1}{4}+\cdots$.`,
        think: "Nhận $u_1=1$ và $q=\\frac{1}{2}$. Chỉ dùng tổng vô hạn sau khi đã thấy $|q|<1$.",
        answer: R`Đáp số là $2$.`,
        steps: [
          { claim: R`Ta có $|q|=\frac{1}{2}<1$.`, why: "Điều kiện cần và đủ để tổng vô hạn của cấp số nhân này hữu hạn." },
          { claim: R`Tổng bằng $\frac{1}{1-\frac{1}{2}}=2$.`, why: "Công thức tổng của dãy các tổng riêng. Không còn số hạng bị bỏ ngoài công thức." },
        ],
        checks: [{ expr: "1/(1-Rational(1,2))", expect: "2" }],
      },
    },
    {
      name: "Dãy tăng và dãy giảm",
      nhanDang: "Hỏi một dãy số hạng tổng quát đi lên hay đi xuống.",
      phuongPhap: R`Theo chương trình, dãy tăng khi $u_{n+1}>u_n$ với mọi số nguyên dương $n$, và dãy giảm khi $u_{n+1}<u_n$ với mọi $n$. Dấu ở đây là dấu lớn hơn hoặc nhỏ hơn chặt. Xét hiệu trên mọi $n$ là điều kiện cần và đủ. Vài số hạng đầu cùng chiều chưa đủ cho cả dãy.`,
      viDu: {
        prompt: R`Xét $u_n=1-\frac{1}{n}$. Dãy có tăng không?`,
        steps: [
          { claim: R`Hiệu $u_{n+1}-u_n=\frac{1}{n}-\frac{1}{n+1}=\frac{1}{n(n+1)}$.`, why: "Quy đồng hai phân số. Mẫu $n(n+1)$ dương với mọi $n$ nguyên dương." },
          { claim: R`Hiệu luôn dương, nên $u_{n+1}>u_n$ với mọi $n$.`, why: "Dấu lớn hơn chặt đúng với định nghĩa dãy tăng. Không cần xét thêm trường hợp $n$." },
        ],
        ket: "Dãy tăng.",
        checks: [{ expr: "1/n-1/(n+1)", expect: "1/(n*(n+1))" }],
      },
      loi: "Thấy vài số hạng đầu tăng rồi kết luận cả dãy tăng, khi chưa xét hiệu tổng quát.",
      luyen: {
        kind: "luyen",
        prompt: R`Dãy $u_n=2+\frac{1}{n}$ tăng hay giảm?`,
        think: "Tính $u_n-u_{n+1}$. Nếu hiệu này dương với mọi $n$ thì dãy giảm.",
        answer: "Dãy giảm.",
        steps: [
          { claim: R`Hiệu $u_n-u_{n+1}=\frac{1}{n}-\frac{1}{n+1}=\frac{1}{n(n+1)}>0$.`, why: "Tử và mẫu đều dương. Hiệu số hạng trước trừ số hạng sau dương nghĩa là dãy đi xuống." },
          { claim: R`Vậy $u_{n+1}<u_n$ với mọi $n$, nên dãy giảm.`, why: "Dấu nhỏ hơn chặt đúng với định nghĩa dãy giảm. Điều này đã được kiểm trên mọi số nguyên dương $n$." },
        ],
        checks: [{ expr: "1/n-1/(n+1)", expect: "1/(n*(n+1))" }],
      },
    },
    {
      name: "Dãy bị chặn",
      nhanDang: "Hỏi dãy có số hạng không vượt quá một hằng số, hoặc không nhỏ hơn một hằng số.",
      phuongPhap: R`Dãy bị chặn trên bởi $M$ khi $u_n\le M$ với mọi $n$. Bị chặn dưới bởi $m$ khi $u_n\ge m$ với mọi $n$. Bị chặn khi có cả hai. Một bất đẳng thức chỉ đúng với vài $n$ chưa đủ. Nếu tìm được một số hạng lớn hơn mọi hằng số dự kiến thì dãy không bị chặn trên.`,
      viDu: {
        prompt: R`Chứng minh $u_n=1-\frac{1}{n}$ bị chặn.`,
        steps: [
          { claim: R`Với mọi $n\ge 1$, $0\le u_n<1$.`, why: R`Vì $\frac{1}{n}$ thuộc $(0;1]$. Khi $n=1$ thì $u_1=0$, và với $n\ge 2$ thì $u_n>0$. Cả dãy nằm trong $[0;1)$.` },
          { claim: R`Dãy bị chặn dưới bởi $0$ và bị chặn trên bởi $1$.`, why: "Hai hằng số này không phụ thuộc $n$. Có cả cận dưới và cận trên nên dãy bị chặn. Cận dưới $0$ đạt tại số hạng đầu." },
        ],
        ket: R`Dãy bị chặn, cụ thể $0\le u_n<1$, tức $u_n$ thuộc $[0;1)$.`,
        checks: [
          { expr: "1-1/1", expect: "0" },
          { expr: "1-1/2", expect: "Rational(1,2)" },
        ],
      },
      loi: "Thấy dãy tăng rồi kết luận không bị chặn, dù có thể có cận trên.",
      luyen: {
        kind: "luyen",
        prompt: R`Dãy $u_n=n$ có bị chặn trên không?`,
        think: "Thử tìm một hằng số $M$ lớn hơn mọi số hạng. Nếu với mỗi $M$ vẫn có số hạng vượt $M$ thì không bị chặn trên.",
        answer: "Dãy không bị chặn trên.",
        steps: [
          { claim: R`Với mỗi số $M$, số hạng $u_n$ với $n$ nguyên lớn hơn $M$ thỏa $u_n>M$.`, why: "Số hạng chính là chỉ số. Không có hằng số nào đứng trên mọi số hạng." },
          { claim: R`Vậy dãy không bị chặn trên.`, why: "Phủ định của bị chặn trên là với mọi hằng số đều có một số hạng vượt hằng số đó." },
        ],
        checks: [{ expr: "5-3", expect: "2" }],
      },
    },
    {
      name: "Tìm số hạng đầu và công sai từ một hệ",
      nhanDang: "Cho hai điều kiện về các số hạng của một cấp số cộng, hỏi $u_1$ và $d$.",
      phuongPhap: R`Viết mỗi điều kiện thành một phương trình bậc nhất theo $u_1$ và $d$, bằng công thức $u_n=u_1+(n-1)d$. Hệ hai phương trình này tương đương với hai điều kiện đã cho. Trừ từng vế để khử $u_1$, rồi thử lại cả hai số hạng.`,
      viDu: {
        prompt: R`Cấp số cộng thỏa $u_2=5$ và $u_5=14$. Tìm $u_1$ và $d$.`,
        steps: [
          { claim: R`Hai phương trình là $u_1+d=5$ và $u_1+4d=14$.`, why: "Hạng thứ hai cách hạng đầu một bước, hạng thứ năm cách bốn bước." },
          { claim: R`Trừ từng vế được $3d=9$, nên $d=3$ và $u_1=2$.`, why: "Khử $u_1$. Thay $d=3$ vào phương trình thứ nhất được $u_1=5-3=2$." },
          { claim: R`Thử lại: $u_2=2+3=5$ và $u_5=2+4\cdot 3=14$.`, why: "Cả hai điều kiện của đề đều thỏa. Nghiệm của hệ không bị loại." },
        ],
        ket: R`Kết quả là $u_1=2$ và $d=3$.`,
        checks: [
          { expr: "2+3", expect: "5" },
          { expr: "2+4*3", expect: "14" },
        ],
      },
      loi: "Lấy $u_5=u_1+5d$, đếm thừa một công sai.",
      luyen: {
        kind: "luyen",
        prompt: R`Cấp số cộng thỏa $u_1+u_3=10$ và $d=2$. Tìm $u_1$.`,
        think: "Viết $u_3=u_1+2d$. Thế $d=2$ vào tổng hai số hạng rồi giải một ẩn.",
        answer: R`Đáp số là $u_1=3$.`,
        steps: [
          { claim: R`Ta có $u_3=u_1+4$, nên $u_1+(u_1+4)=10$.`, why: "Hai bước công sai $2$ làm hạng thứ ba hơn hạng đầu đúng $4$." },
          { claim: R`Suy ra $2u_1=6$, nên $u_1=3$.`, why: "Phương trình bậc nhất có đúng một nghiệm. Thử lại: $u_3=7$ và tổng bằng $10$." },
        ],
        checks: [{ expr: "3+(3+2*2)", expect: "10" }],
      },
    },
    {
      name: "Số thập phân vô hạn tuần hoàn",
      nhanDang: "Một số thập phân có một cụm chữ số lặp mãi, hỏi phân số bằng nó.",
      phuongPhap: R`Đặt $x$ là số thập phân. Nhân $x$ với $10^k$, trong đó $k$ là số chữ số của cụm lặp, để dấu phẩy nhảy qua đúng một cụm. Hiệu hai lũy thừa này triệt phần đuôi tuần hoàn và cho một phương trình bậc nhất. Nghiệm là phân số cần tìm. Phải thử lại bằng cách viết lại phép chia nếu cụm ngắn.`,
      viDu: {
        prompt: R`Viết $0{,}232323\ldots$ thành phân số tối giản.`,
        steps: [
          { claim: R`Đặt $x=0{,}232323\ldots$. Cụm lặp có hai chữ số, nên xét $100x=23{,}232323\ldots$.`, why: "Nhân $10^2$ đẩy dấu phẩy qua đúng một cụm. Phần đuôi của $100x$ trùng phần đuôi của $x$." },
          { claim: R`Hiệu $100x-x=23$, nên $99x=23$ và $x=\frac{23}{99}$.`, why: "Hai phần thập phân vô hạn trừ nhau hết. Mẫu $99$ và tử $23$ nguyên tố cùng nhau, nên phân số đã tối giản." },
        ],
        ket: R`Số đã cho bằng $\frac{23}{99}$.`,
        checks: [{ expr: "Rational(23,99)*100-Rational(23,99)", expect: "23" }],
      },
      loi: "Nhân $10$ khi cụm lặp có hai chữ số, nên phần đuôi chưa trùng và không khử được.",
      luyen: {
        kind: "luyen",
        prompt: R`Viết $0{,}444\ldots$ thành phân số tối giản.`,
        think: "Cụm lặp chỉ có một chữ số $4$. Nhân $10$, trừ đi chính số đó, rồi rút gọn.",
        answer: R`Đáp số là $\frac{4}{9}$.`,
        steps: [
          { claim: R`Đặt $x=0{,}444\ldots$. Khi đó $10x=4{,}444\ldots$ và $10x-x=4$.`, why: "Một chữ số lặp thì nhân $10$ là đủ để đuôi trùng nhau." },
          { claim: R`Suy ra $9x=4$, nên $x=\frac{4}{9}$.`, why: "Tử và mẫu nguyên tố cùng nhau. Phân số này tối giản." },
        ],
        checks: [{ expr: "Rational(4,9)*10-Rational(4,9)", expect: "4" }],
      },
    },
  ],
  sangTao: [
    {
      kind: "thuc-te",
      sao: 3,
      prompt: R`Số liệu giả định. Một người gửi $2$ triệu đồng vào cuối tháng thứ nhất, rồi mỗi tháng sau gửi thêm $1$ triệu đồng so với tháng liền trước, trong $6$ tháng, không lãi. Tổng đã gửi bằng bao nhiêu triệu đồng?`,
      think: "Đây là cấp số cộng, $u_1=2$, $d=1$, $n=6$. Tính số hạng cuối bằng năm bước, rồi tổng hai đầu. Diễn giải số tiền.",
      answer: "Tổng đã gửi là $27$ triệu đồng. Tháng cuối gửi $7$ triệu đồng.",
      steps: [
        { claim: R`Số hạng cuối là $u_6=2+5\cdot 1=7$ triệu đồng.`, why: "Từ tháng thứ nhất đến tháng thứ sáu có năm công sai, mỗi công sai $1$ triệu đồng." },
        { claim: R`Tổng là $S_6=\frac{6}{2}(2+7)=27$ triệu đồng.`, why: "Công thức tổng hai đầu. Diễn giải: sáu khoản tăng dần cộng lại thành $27$ triệu đồng, không phải $6$ lần khoản đầu." },
      ],
      checks: [
        { expr: "2+5*1", expect: "7" },
        { expr: "6*(2+7)/2", expect: "27" },
      ],
    },
    {
      kind: "thuc-te",
      sao: 3,
      prompt: R`Số liệu giả định. Một quần thể có $5$ cá thể và nhân đôi mỗi giờ. Sau $4$ giờ có bao nhiêu cá thể, và quần thể đó có bị chặn nếu cứ nhân đôi mãi không?`,
      think: "Bốn lần nhân đôi là nhân $2^4$. Muốn biết bị chặn hay không, xét dãy $5\\cdot 2^n$ khi số lần nhân đôi tăng.",
      answer: "Sau $4$ giờ có $80$ cá thể. Nếu cứ nhân đôi mãi thì dãy không bị chặn trên.",
      steps: [
        { claim: R`Sau bốn lần nhân đôi, số cá thể là $5\cdot 2^4=80$.`, why: "Mỗi giờ nhân thêm một thừa số $2$. Đơn vị là cá thể." },
        { claim: R`Dãy $5\cdot 2^n$ vượt mọi hằng số khi $n$ đủ lớn.`, why: "Công bội $2$ lớn hơn $1$ và số hạng đầu dương, nên không có cận trên. Diễn giải: bốn giờ thì còn $80$ cá thể, nhưng không có trần nếu sự nhân đôi tiếp tục." },
      ],
      checks: [{ expr: "5*2**4", expect: "80" }],
    },
    {
      kind: "thuc-te",
      sao: 3,
      prompt: R`Số liệu giả định. Một quả bóng rơi từ $10$ mét và mỗi lần nảy chỉ lên $80\%$ độ cao ngay trước đó. Độ cao ngay trước lần rơi thứ ba bằng bao nhiêu mét, và dãy các độ cao này có bị chặn không?`,
      think: "Từ lần rơi thứ nhất sang lần thứ ba có hai bước nhân $\\frac{4}{5}$. Dãy nhân với công bội trong $(0;1)$ thì giảm và bị chặn dưới bởi $0$.",
      answer: R`Độ cao ngay trước lần rơi thứ ba là $\frac{32}{5}$ mét. Dãy các độ cao giảm và bị chặn dưới bởi $0$ mét.`,
      steps: [
        { claim: R`Độ cao ấy bằng $10\cdot\left(\frac{4}{5}\right)^2=\frac{32}{5}$ mét.`, why: "Hai lần nảy, mỗi lần nhân $\\frac{4}{5}$. Vì $80\\%$ viết thành phân số trước khi bình phương." },
        { claim: R`Công bội $\frac{4}{5}$ thuộc $(0;1)$, nên dãy độ cao giảm và luôn dương.`, why: "Nhân với một số trong $(0;1)$ làm số hạng giảm nhưng không xuống dưới $0$. Dãy bị chặn dưới bởi $0$ mét." },
      ],
      checks: [{ expr: "10*(Rational(4,5))**2", expect: "Rational(32,5)" }],
    },
    {
      kind: "thuc-te",
      sao: 3,
      prompt: R`Số liệu giả định. Hàng ghế đầu có $12$ ghế, mỗi hàng sau thêm $2$ ghế. Hàng thứ $8$ có bao nhiêu ghế, và tám hàng đầu có tất cả bao nhiêu ghế?`,
      think: "Cấp số cộng $u_1=12$, $d=2$. Số ghế hàng thứ tám dùng bảy bước. Tổng tám hàng dùng công thức tổng, không nhân $8$ với $12$.",
      answer: "Hàng thứ $8$ có $26$ ghế. Tám hàng đầu có $152$ ghế, tức $152$ chỗ ngồi trong hội trường.",
      steps: [
        { claim: R`Ta có $u_8=12+7\cdot 2=26$ ghế.`, why: "Số bước là $8-1$. Đơn vị là ghế." },
        { claim: R`Tổng tám hàng là $S_8=\frac{8}{2}(12+26)=152$ ghế.`, why: "Công thức tổng hai đầu. Diễn giải: không phải chỉ có hàng cuối, mà cả tám hàng cộng lại." },
      ],
      checks: [
        { expr: "12+7*2", expect: "26" },
        { expr: "8*(12+26)/2", expect: "152" },
      ],
    },
    {
      kind: "mo",
      sao: 3,
      prompt: "Hãy nêu một dãy tăng và bị chặn trên, khác dãy $1-\\frac{1}{n}$. Nêu cận trên. Có nhiều dãy đúng.",
      think: "Hiệu số hạng sau trừ số hạng trước phải không âm. Cận trên là một hằng số không phụ thuộc chỉ số.",
      answer: R`Một dãy đúng là $u_n=2-\frac{1}{n}$. Dãy tăng và bị chặn trên bởi $2$.`,
      steps: [
        { claim: R`Hiệu $u_{n+1}-u_n=\frac{1}{n(n+1)}>0$.`, why: "Cùng kiểu hiệu như dãy $1-\\frac{1}{n}$, chỉ khác một hằng số cộng. Hằng số không đổi chiều tăng." },
        { claim: R`Mọi số hạng đều nhỏ hơn $2$.`, why: "Vì $\\frac{1}{n}>0$. Số $2$ là một cận trên." },
      ],
      checks: [{ expr: "(2-1/(n+1))-(2-1/n)", expect: "1/(n*(n+1))" }],
    },
    {
      kind: "phan-bien",
      sao: 3,
      prompt: R`Bạn A nói dãy $u_n=1-\frac{1}{n}$ không bị chặn vì nó tăng. Hãy phản biện.`,
      think: "Tăng và không bị chặn là hai tính chất khác nhau. Hãy chỉ một hằng số đứng trên mọi số hạng.",
      answer: "Lập luận chưa đúng. Dãy tăng ngặt nhưng bị chặn trên bởi $1$.",
      steps: [
        { claim: R`Hiệu $u_{n+1}-u_n$ dương, nên phần nói dãy tăng là đúng.`, why: "Bạn A đúng về chiều biến thiên. Phần kết luận không bị chặn mới sai." },
        { claim: R`Với mọi $n$, $u_n=1-\frac{1}{n}<1$.`, why: "Số $1$ là cận trên. Một dãy tăng vẫn có thể bị chặn." },
      ],
      checks: [{ expr: "1-1/n", expect: "(n-1)/n" }],
    },
    {
      kind: "doc",
      sao: 2,
      prompt: "Bảng bốn số hạng đầu của một cấp số cộng là $3$, $7$, $11$, $15$. Hãy đọc công sai, số hạng thứ mười và nói dãy có bị chặn trên không.",
      think: "Công sai là hiệu hai số liền nhau. Số hạng thứ mười cách số đầu chín bước. Dãy cộng với công sai dương thì không bị chặn trên.",
      answer: "Công sai bằng $4$, số hạng thứ mười bằng $39$, và dãy không bị chặn trên.",
      steps: [
        { claim: R`Công sai bằng $7-3=4$, và các hiệu sau cũng bằng $4$.`, why: "Đọc từng cặp liền nhau trên bảng. Cùng một hiệu thì đúng là cấp số cộng." },
        { claim: R`Số hạng thứ mười bằng $3+9\cdot 4=39$.`, why: "Công thức số hạng. Chín bước nằm ngoài bảng, nhưng công sai đã đọc được từ bảng." },
        { claim: R`Vì công sai dương, dãy tăng và không bị chặn trên.`, why: "Cộng mãi một số dương thì vượt mọi hằng số." },
      ],
      checks: [{ expr: "3+9*4", expect: "39" }],
    },
    {
      kind: "uoc-luong",
      sao: 2,
      prompt: R`Ước lượng tổng $S_{100}$ của cấp số cộng $u_1=1$, $d=1$, bằng cách so với $100\cdot u_1$ và với $100\cdot u_{100}$.`,
      think: "Mọi số hạng nằm giữa số đầu và số cuối. Tổng một trăm số hạng nằm giữa $100$ lần số nhỏ nhất và $100$ lần số lớn nhất.",
      answer: "Tổng nằm trong đoạn $[100;10000]$. Giá trị đúng là $5050$.",
      steps: [
        { claim: R`Số hạng cuối là $u_{100}=100$, và $1\le u_k\le 100$ với mọi $k$ từ $1$ đến $100$.`, why: "Công sai dương nên dãy tăng. Hai đầu của đoạn là số hạng đầu và số hạng cuối." },
        { claim: R`Vậy $100\le S_{100}\le 10000$.`, why: "Cộng một trăm bất đẳng thức cùng chiều. Đây là ước lượng, chưa phải giá trị đúng." },
        { claim: R`Giá trị đúng là $\frac{100}{2}(1+100)=5050$, nằm trong đoạn ấy.`, why: "Công thức tổng hai đầu kiểm lại ước lượng." },
      ],
      checks: [
        { expr: "100*(1+100)/2", expect: "5050" },
        { expr: "100*1", expect: "100" },
        { expr: "100*100", expect: "10000" },
      ],
    },
    {
      kind: "tu-ra-de",
      sao: 4,
      prompt: R`Bài xuất phát: cấp số cộng $u_1=3$, $d=4$ có $S_{10}=210$. Hãy đổi giả thiết bằng cách thay công sai, dự đoán tổng tăng hay giảm, rồi tính tổng mới.`,
      think: "Công sai lớn hơn thì các số hạng từ hạng thứ hai trở đi lớn hơn, nên tổng mười hạng tăng. Tính lại bằng công thức, không nhân chéo.",
      answer: "Một đề hợp lệ đổi $d$ từ $4$ sang $5$. Dự đoán tổng lớn hơn $210$, và tổng đúng là $255$.",
      steps: [
        { claim: R`Đổi công sai từ $4$ sang $5$, giữ $u_1=3$ và $n=10$.`, why: "Số hạng đầu và số số hạng không đổi. Chỉ các bước cộng thay đổi." },
        { claim: R`Dự đoán $S_{10}$ tăng vì mỗi bước cộng thêm $1$ so với đề cũ, đủ chín bước ở số hạng cuối.`, why: "Số hạng cuối tăng $9$, các số hạng giữa cũng không giảm. Tổng phải tăng." },
        { claim: R`Số hạng cuối mới là $3+9\cdot 5=48$, tổng là $\frac{10}{2}(3+48)=255$.`, why: "Công thức kiểm lại dự đoán. Hiệu $255-210=45$ đúng là phần tăng." },
      ],
      checks: [
        { expr: "3+9*5", expect: "48" },
        { expr: "10*(3+48)/2", expect: "255" },
      ],
    },
  ],
};
