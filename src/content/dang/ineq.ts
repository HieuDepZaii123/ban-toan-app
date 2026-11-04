import type { TopicDang } from "./types.ts";

const R = String.raw;

export const ineqDang: TopicDang = {
  id: "ineq",
  title: "Bất đẳng thức",
  dang: [
    {
      name: "AM–GM cho hai số không âm",
      nhanDang: "Tổng hai số không âm, hoặc tổng một số dương với nghịch đảo của nó, hỏi giá trị nhỏ nhất.",
      phuongPhap: R`Với $a,b\ge 0$, $a+b\ge 2\sqrt{ab}$, và đẳng thức xảy ra khi và chỉ khi $a=b$. Điều kiện dấu bằng là cần và đủ để khẳng định giá trị nhỏ nhất đạt được. Nếu điểm làm $a=b$ nằm ngoài miền của đề thì bất đẳng thức vẫn đúng nhưng chưa cho giá trị nhỏ nhất trên miền đó.`,
      viDu: {
        prompt: R`Với $x>0$, tìm giá trị nhỏ nhất của $x+\frac{4}{x}$.`,
        steps: [
          { claim: R`Ta có $x>0$ và $\frac{4}{x}>0$.`, why: "AM–GM dạng này cần hai số không âm. Ở đây cả hai đều dương." },
          { claim: R`Ta có $x+\frac{4}{x}\ge 2\sqrt{x\cdot\frac{4}{x}}=4$.`, why: "Áp dụng AM–GM. Căn bằng $2$." },
          { claim: R`Dấu bằng khi $x=\frac{4}{x}$, tức $x=2$ vì $x>0$.`, why: "Điều kiện cần và đủ của dấu bằng. Điểm $x=2$ thuộc miền $x>0$, nên giá trị $4$ đạt được." },
        ],
        ket: "Giá trị nhỏ nhất bằng $4$, đạt tại $x=2$.",
        check: { expr: "2*sqrt(4)", expect: "4" },
      },
      loi: "Kết luận giá trị nhỏ nhất dù điểm dấu bằng không thuộc miền đề bài.",
      luyen: {
        kind: "luyen",
        prompt: R`Với $x>0$, chứng minh $x+\frac{1}{x}\ge 2$ và tìm chỗ dấu bằng.`,
        think: R`Hai số dương $x$ và $\frac{1}{x}$. Dấu bằng khi chúng bằng nhau.`,
        answer: R`Bất đẳng thức đúng, dấu bằng tại $x=1$.`,
        steps: [
          { claim: R`Ta có $x+\frac{1}{x}\ge 2\sqrt{x\cdot\frac{1}{x}}=2$.`, why: "AM–GM." },
          { claim: R`Dấu bằng khi $x=1$.`, why: R`Vì $x=\frac{1}{x}$ và $x>0$ cho đúng một nghiệm $x=1$, nằm trong miền.` },
        ],
        check: { expr: "1+1", expect: "2" },
      },
    },
    {
      name: "Cực trị khi biết tổng",
      nhanDang: "Biết tổng hai số không âm, hỏi giá trị lớn nhất của tích.",
      phuongPhap: R`Từ AM–GM, $\sqrt{ab}\le\frac{a+b}{2}$, nên $ab\le\left(\frac{a+b}{2}\right)^2$. Dấu bằng khi $a=b$. Nếu tổng cố định và điểm $a=b$ thuộc miền, thì cận này là giá trị lớn nhất. Đây là điều kiện đủ nhờ dấu bằng đạt được, không phải chỉ là một ước lượng suông.`,
      viDu: {
        prompt: R`Với $x>0$, $y>0$ và $x+y=10$, tìm giá trị lớn nhất của $xy$.`,
        steps: [
          { claim: R`Ta có $xy\le\left(\frac{x+y}{2}\right)^2=25$.`, why: "Hệ quả AM–GM, tổng đã biết." },
          { claim: R`Dấu bằng khi $x=y=5$.`, why: "Cả hai dương và tổng $10$, nên điểm này thuộc miền." },
        ],
        ket: "Giá trị lớn nhất của tích bằng $25$.",
        check: { expr: "(10/2)**2", expect: "25" },
      },
      loi: R`Viết $\left(\frac{x+y}{2}\right)^2$ nhưng không kiểm tra dấu bằng có đạt hay không.`,
      luyen: {
        kind: "luyen",
        prompt: R`So sánh $\frac{4+9}{2}$ và $\sqrt{4\cdot 9}$.`,
        think: "Một vế là trung bình cộng, một vế là trung bình nhân. AM–GM cho thứ tự, còn số thì tính trực tiếp.",
        answer: R`Trung bình cộng bằng $\frac{13}{2}$, trung bình nhân bằng $6$, và $\frac{13}{2}>6$.`,
        steps: [
          { claim: R`Ta có $\frac{4+9}{2}=\frac{13}{2}$.`, why: "Cộng rồi chia đôi." },
          { claim: R`Ta có $\sqrt{36}=6$.`, why: R`Vì $4\cdot 9=36$.` },
          { claim: R`Ta có $\frac{13}{2}-6=\frac{1}{2}>0$.`, why: R`Hiệu dương nên trung bình cộng lớn hơn. Dấu bằng không xảy ra vì $4\neq 9$.` },
        ],
        check: { expr: "Rational(13,2)-6", expect: "Rational(1,2)" },
      },
    },
  ],
  sangTao: [
    {
      kind: "thuc-te",
      prompt: R`Chia một sợi dây dài $20$ cm thành hai đoạn dương, rồi gấp mỗi đoạn thành một hình vuông. Tổng diện tích hai hình vuông nhỏ nhất khi mỗi đoạn dài bao nhiêu?`,
      think: R`Nếu mỗi đoạn dài $x$ và $20-x$ thì cạnh hình vuông là $\frac{x}{4}$ và $\frac{20-x}{4}$. Tổng diện tích là một hàm bậc hai. Có thể đối chiếu với $x=10$.`,
      answer: "Mỗi đoạn $10$ cm.",
      steps: [
        { claim: R`Tổng diện tích $S(x)=\frac{x^2+(20-x)^2}{16}$ với $0<x<20$.`, why: "Diện tích hình vuông bằng bình phương một phần tư đoạn dây." },
        { claim: R`Ta có $x^2+(20-x)^2=2x^2-40x+400$ có đạo hàm $4x-40$, triệt tiêu tại $x=10$.`, why: "Điều kiện cần. Đạo hàm đổi từ âm sang dương nên đây là cực tiểu." },
        { claim: R`Ta có $x=10$ thuộc $(0;20)$, đoạn kia cũng dài $10$.`, why: "Điểm cực tiểu nằm trong miền dây còn chia được." },
      ],
      check: { expr: "(10**2+10**2)/16", expect: "Rational(200,16)" },
    },
    {
      kind: "thuc-te",
      prompt: R`Hai chiều của một hình chữ nhật dương có chu vi $20$ cm. Diện tích lớn nhất bằng bao nhiêu?`,
      think: "Nửa chu vi là $10$, tức tổng hai cạnh kề bằng $10$. Tích lớn nhất khi hai cạnh bằng nhau.",
      answer: "Đáp số là $25$ centimét vuông",
      steps: [
        { claim: R`Gọi hai cạnh là $x$ và $10-x$, với $0<x<10$.`, why: "Chu vi $20$ cho tổng hai cạnh kề bằng $10$." },
        { claim: R`Tích không vượt quá $25$, và bằng $25$ khi $x=5$.`, why: "Kết quả dạng bài tổng cố định, dấu bằng đạt tại điểm trong miền." },
      ],
      check: { expr: "5*5", expect: "25" },
    },
    {
      kind: "thuc-te",
      prompt: R`Một mạch có hai điện trở dương mắc song song, tích hai điện trở bằng $9$. Tổng hai điện trở nhỏ nhất bằng bao nhiêu?`,
      think: R`AM–GM cho tổng khi biết tích: $a+b\ge 2\sqrt{ab}$.`,
      answer: "Đáp số là $6$",
      steps: [
        { claim: R`Ta có $a+b\ge 2\sqrt{9}=6$.`, why: "AM–GM, hai điện trở dương." },
        { claim: R`Dấu bằng khi $a=b=3$.`, why: "Tích bằng $9$ và hai số bằng nhau. Điểm này tồn tại." },
      ],
      check: { expr: "2*sqrt(9)", expect: "6" },
    },
    {
      kind: "thuc-te",
      prompt: R`Một hình chữ nhật nội tiếp trong nửa đường tròn bán kính $1$, đáy là đường kính. Diện tích lớn nhất bằng bao nhiêu?`,
      think: R`Nếu một đỉnh có hoành độ $x$ thì chiều cao $\sqrt{1-x^2}$ và đáy $2x$, với $0<x<1$. Bình phương diện tích để tìm cực trị.`,
      answer: "Đáp số là $1$",
      steps: [
        { claim: R`Ta có $S(x)=2x\sqrt{1-x^2}$ và $S^2=4x^2(1-x^2)$.`, why: "Đáy $2x$, chiều cao là tung độ trên đường tròn đơn vị." },
        { claim: R`Hàm $u(1-u)$ với $u=x^2$ lớn nhất bằng $\frac{1}{4}$ tại $u=\frac{1}{2}$.`, why: R`Đạo hàm $1-2u$ đổi dấu tại $\frac{1}{2}$.` },
        { claim: R`Ta có $S^2$ lớn nhất bằng $1$, nên $S$ lớn nhất bằng $1$.`, why: R`Lấy căn không âm. $x=\frac{\sqrt{2}}{2}$ thuộc $(0;1)$.` },
      ],
      check: { expr: "sqrt(4*Rational(1,2)*Rational(1,2))", expect: "1" },
    },
    {
      kind: "tu-ra-de",
      prompt: R`Hãy tự đặt một bài tìm giá trị nhỏ nhất của $x+\frac{a}{x}$ với $x>0$ và $a$ là số dương cho sẵn. Đề mẫu lấy $a=9$.`,
      think: R`Viết AM–GM, rồi giải $x=\frac{a}{x}$ và chỉ giữ nghiệm dương. Nếu không có nghiệm trong miền thì chưa được tuyên bố giá trị nhỏ nhất.`,
      answer: "Giá trị nhỏ nhất của đề mẫu bằng $6$, tại $x=3$.",
      steps: [
        { claim: R`Ta có $x+\frac{9}{x}\ge 2\sqrt{9}=6$.`, why: "AM–GM cho hai số dương." },
        { claim: R`Dấu bằng khi $x=3$.`, why: R`Vì $x=\frac{9}{x}$ và $x>0$.` },
      ],
      check: { expr: "2*sqrt(9)", expect: "6" },
    },
  ],
};
