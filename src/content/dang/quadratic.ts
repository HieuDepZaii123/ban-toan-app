import type { TopicDang } from "./types.ts";

const R = String.raw;

export const quadraticDang: TopicDang = {
  id: "quadratic",
  title: "Hàm số bậc hai",
  dang: [
    {
      name: "Phương trình bậc hai và trường hợp $a=0$",
      nhanDang: R`Phương trình viết $ax^2+bx+c=0$, hỏi nghiệm thực. Phải xét hệ số $a$ trước khi gọi là bậc hai.`,
      phuongPhap: R`Nếu $a=0$ và $b\neq 0$ thì phương trình là bậc nhất, nghiệm duy nhất $x=-\frac{c}{b}$. Công thức $\Delta$ không áp dụng vì mẫu $2a$ bằng $0$. Nếu $a=b=0$ thì hoặc vô nghiệm khi $c\neq 0$, hoặc mọi $x$ đều là nghiệm khi $c=0$. Khi $a\neq 0$, đặt $\Delta=b^2-4ac$. Trong số thực, $\Delta>0$ tương đương hai nghiệm phân biệt, $\Delta=0$ tương đương nghiệm kép, $\Delta<0$ tương đương vô nghiệm.`,
      viDu: {
        prompt: R`Giải $x^2-5x+6=0$.`,
        steps: [
          { claim: R`Hệ số $a=1$ khác $0$, và $\Delta=25-24=1>0$.`, why: "Phải xác nhận đúng bậc hai trước khi dùng biệt thức. Biệt thức dương là điều kiện cần và đủ để có hai nghiệm thực phân biệt." },
          { claim: R`Hai nghiệm là $x=\frac{5\pm 1}{2}$, tức $x=3$ và $x=2$.`, why: "Công thức nghiệm dùng được vì $a\\neq 0$ và $\\Delta\\ge 0$. Không có điều kiện phụ nên cả hai nghiệm được nhận." },
        ],
        ket: R`Nghiệm là $x=2$ và $x=3$.`,
        checks: [
          { expr: "25-24", expect: "1" },
          { expr: "2**2-5*2+6", expect: "0" },
          { expr: "3**2-5*3+6", expect: "0" },
        ],
      },
      loi: "Dùng công thức nghiệm khi $a=0$, trong khi mẫu $2a$ lúc đó bằng $0$.",
      luyen: {
        kind: "luyen",
        prompt: R`Giải $0\cdot x^2+2x-6=0$.`,
        think: "Nhìn hệ số của $x^2$ trước. Nếu hệ số đó bằng $0$ thì đây là phương trình bậc nhất, giải bằng cách cô lập $x$.",
        answer: R`Vì $a=0$ và $b=2\neq 0$, nghiệm duy nhất là $x=3$.`,
        steps: [
          { claim: R`Phương trình rút thành $2x-6=0$.`, why: "Hạng tử bậc hai có hệ số $0$ nên biến mất. Phần còn lại là phương trình bậc nhất." },
          { claim: R`Nghiệm là $x=3$.`, why: "Chia cả hai vế cho $2$. Công thức $\\Delta$ không được dùng vì mẫu $2a$ bằng $0$." },
        ],
        checks: [{ expr: "2*3-6", expect: "0" }],
      },
    },
    {
      name: "Phương trình chứa căn",
      nhanDang: "Một phương trình có căn bậc hai, và sau khi bình phương có thể phát sinh nghiệm không thỏa đề.",
      phuongPhap: R`Điều kiện cần gồm căn thức xác định và, khi một vế là căn bậc hai, vế kia không âm. Bình phương hai vế của một đẳng thức là hệ quả, tức điều kiện cần, chưa đủ. Mỗi nghiệm của phương trình mới phải thay lại vào phương trình ban đầu. Nghiệm làm hai vế khác nhau thì bị loại.`,
      viDu: {
        prompt: R`Giải $\sqrt{x+1}=x-1$.`,
        steps: [
          { claim: R`Điều kiện: $x+1\ge 0$ để căn xác định và $x-1\ge 0$ vì căn bậc hai không âm, nên $x\ge 1$.`, why: "Căn bậc hai xác định khi biểu thức trong căn không âm, và bản thân căn thì không âm. Điều kiện chặt hơn là $x\\ge 1$." },
          { claim: R`Bình phương hai vế được $x+1=(x-1)^2$, tức $x(x-3)=0$.`, why: "Bình phương bảo toàn đẳng thức nên là điều kiện cần. Hai ứng viên là $x=0$ và $x=3$." },
          { claim: R`Loại $x=0$ vì $0<1$. Giữ $x=3$.`, why: "Tại $x=0$, căn bằng $1$ còn vế phải bằng $-1$. Tại $x=3$, hai vế cùng bằng $2$. Chỉ nghiệm thứ hai thỏa phương trình ban đầu." },
        ],
        ket: R`Nghiệm duy nhất là $x=3$.`,
        checks: [
          { expr: "sqrt(3+1)-(3-1)", expect: "0" },
          { expr: "sqrt(0+1)-(0-1)", expect: "2" },
        ],
      },
      loi: "Nhận mọi nghiệm sau khi bình phương, bỏ qua bước thử lại.",
      luyen: {
        kind: "luyen",
        prompt: R`Giải $\sqrt{x}=x-2$.`,
        think: "Viết điều kiện $x\\ge 2$ vì vế phải phải không âm. Bình phương, rồi loại nghiệm không thuộc điều kiện hoặc không thỏa phương trình gốc.",
        answer: R`Nghiệm duy nhất là $x=4$. Giá trị $x=1$ bị loại.`,
        steps: [
          { claim: R`Điều kiện để có nghiệm là $x\ge 2$. Hai ứng viên sau khi bình phương là $x=1$ và $x=4$.`, why: "Phương trình hệ quả là $x=(x-2)^2$, tức $x^2-5x+4=0$. Tích và tổng các nghiệm khớp đa thức này." },
          { claim: R`Loại $x=1$ vì $1<2$. Tại $x=4$, hai vế cùng bằng $2$.`, why: "Thay lại là bước đủ. Căn của $1$ bằng $1$, trong khi $1-2$ bằng $-1$, nên $x=1$ không phải nghiệm." },
        ],
        checks: [
          { expr: "sqrt(4)-(4-2)", expect: "0" },
          { expr: "sqrt(1)-(1-2)", expect: "2" },
        ],
      },
    },
    {
      name: "Dấu tam thức bậc hai",
      nhanDang: R`Cho $f(x)=ax^2+bx+c$ với $a\neq 0$, hỏi dấu của $f$ trên từng khoảng.`,
      phuongPhap: R`Nếu $\Delta>0$ thì hai nghiệm phân biệt chia trục hoành thành ba khoảng. Dấu của $f$ trên khoảng ngoài cùng trùng dấu của $a$, và dấu đổi khi đi qua mỗi nghiệm đơn. Thử một điểm trong mỗi khoảng là đủ cho cả khoảng, vì tam thức không đổi dấu giữa hai nghiệm. Nếu $\Delta<0$ thì $f$ cùng dấu với $a$ trên toàn trục. Nếu $\Delta=0$ thì $f$ cùng dấu với $a$ trừ tại nghiệm kép, nơi $f$ bằng $0$.`,
      viDu: {
        prompt: R`Xét dấu $f(x)=x^2-5x+6$.`,
        steps: [
          { claim: R`Ta có $f(x)=(x-2)(x-3)$ và $a=1>0$.`, why: "Hai nghiệm đơn là $2$ và $3$. Hệ số cao nhất dương nên ngoài hai nghiệm tam thức dương." },
          { claim: R`Trên $(2;3)$ tam thức âm. Tại $0$ giá trị bằng $6$, tại $\frac{5}{2}$ giá trị bằng $-\frac{1}{4}$.`, why: "Một điểm âm trong khoảng giữa là đủ cho cả khoảng, vì dấu chỉ đổi khi đi qua nghiệm. Điểm $0$ xác nhận khoảng bên trái dương." },
        ],
        ket: R`Tam thức dương trên $(-\infty;2)$ và trên $(3;+\infty)$, âm trên $(2;3)$, bằng $0$ tại $2$ và $3$.`,
        checks: [
          { expr: "0**2-5*0+6", expect: "6" },
          { expr: "Rational(5,2)**2-5*Rational(5,2)+6", expect: "Rational(-1,4)" },
        ],
      },
      loi: "Kết luận tam thức luôn dương chỉ vì hệ số $a$ dương, trong khi biệt thức còn dương.",
      luyen: {
        kind: "luyen",
        prompt: R`Xét dấu $g(x)=-x^2+1$.`,
        think: "Phân tích $-(x-1)(x+1)$. Hệ số cao nhất âm, hai nghiệm đơn là $-1$ và $1$.",
        answer: R`Tam thức dương trên $(-1;1)$, âm ngoài hai nghiệm, và bằng $0$ tại $-1$ và $1$.`,
        steps: [
          { claim: R`Ta có $g(x)=-(x-1)(x+1)$ và $a=-1<0$.`, why: "Nghiệm đơn là $-1$ và $1$. Dấu khoảng ngoài cùng trùng dấu âm của hệ số cao nhất." },
          { claim: R`Tại $x=0$, $g(0)=1>0$, nên cả khoảng $(-1;1)$ dương.`, why: "Một điểm trong khoảng giữa đủ cho cả khoảng. Dấu này ngược với hai khoảng ngoài." },
        ],
        checks: [{ expr: "-(0-1)*(0+1)", expect: "1" }],
      },
    },
    {
      name: "Bất phương trình bậc hai",
      nhanDang: "Bất phương trình có tam thức bậc hai ở một vế và $0$ ở vế kia.",
      phuongPhap: R`Lập bảng dấu của tam thức, với $a\neq 0$. Tập nghiệm là hợp các khoảng có dấu đúng với chiều bất phương trình. Nếu bất phương trình không chặt thì các nghiệm của tam thức được đưa vào tập nghiệm. Nếu chặt thì các nghiệm đó bị loại. Kết luận phải là một tập, không phải một giá trị dấu.`,
      viDu: {
        prompt: R`Giải $x^2-5x+6\le 0$.`,
        steps: [
          { claim: R`Tam thức bằng $(x-2)(x-3)$ và có hệ số cao nhất dương.`, why: "Hai nghiệm là $2$ và $3$. Dấu âm nằm giữa hai nghiệm, dấu dương nằm ngoài." },
          { claim: R`Bất phương trình không chặt, nên tập nghiệm là $[2;3]$.`, why: "Hai đầu mút làm tam thức bằng $0$, và $0$ thỏa $\\le 0$. Bỏ hai đầu mút chỉ đúng với bất phương trình chặt." },
        ],
        ket: R`Tập nghiệm là $[2;3]$.`,
        checks: [
          { expr: "2**2-5*2+6", expect: "0" },
          { expr: "Rational(5,2)**2-5*Rational(5,2)+6", expect: "Rational(-1,4)" },
        ],
      },
      loi: "Với bất phương trình chặt vẫn lấy cả hai nghiệm của tam thức vào tập nghiệm.",
      luyen: {
        kind: "luyen",
        prompt: R`Giải $x^2-4>0$.`,
        think: "Hai nghiệm là $-2$ và $2$, hệ số cao nhất dương. Bất phương trình chặt nên loại hai nghiệm.",
        answer: R`Tập nghiệm là $(-\infty;-2)\cup(2;+\infty)$.`,
        steps: [
          { claim: R`Ta có $x^2-4=(x-2)(x+2)$.`, why: "Hiệu hai bình phương. Nghiệm đơn là $-2$ và $2$, hệ số cao nhất dương." },
          { claim: R`Tam thức dương ở hai khoảng ngoài, và hai nghiệm không thuộc tập nghiệm.`, why: "Chiều bất phương trình là dấu lớn hơn chặt. Tại chính $x=2$, vế trái bằng $0$ nên không thỏa." },
        ],
        checks: [
          { expr: "2**2-4", expect: "0" },
          { expr: "3**2-4", expect: "5" },
        ],
      },
    },
    {
      name: "Đỉnh parabol bằng cách hoàn thành bình phương",
      nhanDang: R`Parabol $y=ax^2+bx+c$ với $a\neq 0$, hỏi đỉnh hoặc giá trị lớn nhất, nhỏ nhất trên $\mathbb{R}$.`,
      phuongPhap: R`Viết $ax^2+bx+c=a\left(x+\frac{b}{2a}\right)^2+\frac{4ac-b^2}{4a}$. Bình phương luôn không âm, nên nếu $a>0$ thì giá trị nhỏ nhất trên $\mathbb{R}$ là tung độ đỉnh, đạt khi và chỉ khi $x=-\frac{b}{2a}$. Nếu $a<0$ thì đó là giá trị lớn nhất. Đẳng thức $a$ nhân một bình phương cộng hằng số là tương đương với hàm đã cho, và điểm $x=-\frac{b}{2a}$ làm bình phương bằng $0$.`,
      viDu: {
        prompt: R`Tìm giá trị nhỏ nhất của $y=x^2-4x+1$ trên $\mathbb{R}$.`,
        steps: [
          { claim: R`Ta có $y=(x-2)^2-3$.`, why: "Hoàn thành bình phương: $x^2-4x+1=(x-2)^2-4+1$. Đây là một đẳng thức với mọi $x$." },
          { claim: R`Vì $(x-2)^2\ge 0$ và bằng $0$ khi $x=2$, giá trị nhỏ nhất bằng $-3$.`, why: "Hệ số của bình phương bằng $1>0$, nên biểu thức đạt nhỏ nhất đúng khi bình phương bằng $0$. Điểm $x=2$ thuộc $\\mathbb{R}$." },
        ],
        ket: R`Giá trị nhỏ nhất bằng $-3$, đạt tại $x=2$.`,
        checks: [{ expr: "(2-2)**2-3", expect: "-3" }],
      },
      loi: "Lấy biệt thức làm tung độ đỉnh.",
      luyen: {
        kind: "luyen",
        prompt: R`Tìm đỉnh của $y=x^2-2x-3$.`,
        think: "Viết $(x-1)^2$ rồi cộng hằng số còn lại. Hoành độ là chỗ bình phương bằng $0$, tung độ là giá trị hàm tại đó.",
        answer: R`Đỉnh là $(1;-4)$.`,
        steps: [
          { claim: R`Ta có $y=(x-1)^2-4$.`, why: "Vì $x^2-2x-3=(x-1)^2-1-3$. Hằng số $-4$ là tung độ khi bình phương bằng $0$." },
          { claim: R`Đỉnh có hoành độ $1$ và tung độ $-4$.`, why: "Bình phương bằng $0$ khi và chỉ khi $x=1$. Thay vào hàm được tung độ đỉnh." },
        ],
        checks: [{ expr: "(1-1)**2-4", expect: "-4" }],
      },
    },
  ],
  sangTao: [
    {
      kind: "thuc-te",
      sao: 4,
      prompt: R`Số liệu giả định. Dùng $36$ mét lưới rào ba phía của một chuồng chữ nhật, phía còn lại là tường. Gọi $x$ mét là cạnh vuông góc với tường, $0<x<18$. Tìm diện tích lớn nhất và kích thước lúc đó.`,
      think: "Cạnh song song tường là $36-2x$ mét. Diện tích $S=36x-2x^2$. Hoàn thành bình phương để tìm giá trị lớn nhất, rồi kiểm tra hoành độ còn trong khoảng mở.",
      answer: "Diện tích lớn nhất là $162$ mét vuông, khi cạnh vuông góc tường dài $9$ mét và cạnh song song tường dài $18$ mét.",
      steps: [
        { claim: R`Với $0<x<18$, diện tích là $S(x)=36x-2x^2$ mét vuông.`, why: "Hai cạnh vuông góc tường dùng $2x$ mét lưới. Cạnh còn lại phải dương, nên $x$ nhỏ hơn $18$." },
        { claim: R`Ta có $S(x)=-2(x-9)^2+162$.`, why: "Hoàn thành bình phương. Đẳng thức này đúng với mọi $x$, và hệ số $-2$ đứng trước một bình phương." },
        { claim: R`Vì $-2(x-9)^2\le 0$, diện tích lớn nhất bằng $162$ mét vuông tại $x=9$.`, why: "Bình phương bằng $0$ khi và chỉ khi $x=9$, và điểm này thuộc $(0;18)$. Cạnh song song tường lúc đó dài $18$ mét." },
      ],
      checks: [
        { expr: "36*9-2*9**2", expect: "162" },
        { expr: "36-2*9", expect: "18" },
      ],
    },
    {
      kind: "thuc-te",
      sao: 3,
      prompt: R`Số liệu giả định. Độ cao một quả bóng là $h(t)=-5t^2+20t+1$ mét, với $t\ge 0$ tính bằng giây. Tìm độ cao lớn nhất và thời điểm đạt độ cao đó. So với độ cao lúc $t=0$.`,
      think: "Hoàn thành bình phương với hệ số $-5$. Thời điểm làm bình phương bằng $0$ phải không âm thì mới thuộc miền thời gian.",
      answer: "Độ cao lớn nhất là $21$ mét tại $t=2$ giây. Lúc ném, độ cao chỉ là $1$ mét, thấp hơn $20$ mét.",
      steps: [
        { claim: R`Ta có $h(t)=-5(t-2)^2+21$.`, why: "Vì $-5t^2+20t+1=-5(t^2-4t)+1=-5\\left((t-2)^2-4\\right)+1$. Đây là đẳng thức với mọi $t$." },
        { claim: R`Giá trị lớn nhất bằng $21$ mét tại $t=2$ giây.`, why: "Số $-5$ nhân một bình phương thì không dương, và bằng $0$ khi $t=2$. Mốc $2$ giây thuộc miền $t\\ge 0$." },
        { claim: R`Lúc $t=0$, độ cao bằng $1$ mét.`, why: "Thay vào hàm ban đầu. Diễn giải: bóng lên thêm $20$ mét so với lúc vừa ném, rồi mới đạt đỉnh." },
      ],
      checks: [
        { expr: "-5*2**2+20*2+1", expect: "21" },
        { expr: "-5*0**2+20*0+1", expect: "1" },
      ],
    },
    {
      kind: "thuc-te",
      sao: 3,
      prompt: R`Số liệu giả định. Mặt cắt một cổng có dạng $y=4-x^2$, đơn vị mét, và đáy nằm trên trục hoành. Tìm chiều cao cổng và bề rộng đáy.`,
      think: "Chiều cao là tung độ lớn nhất. Đáy là khoảng giữa hai nghiệm của $4-x^2=0$. Hoàn thành bình phương cho thấy đỉnh ở $x=0$.",
      answer: "Cổng cao $4$ mét và đáy rộng $4$ mét, từ $x=-2$ đến $x=2$.",
      steps: [
        { claim: R`Ta có $y=4-x^2$, nên $y\le 4$ và bằng $4$ khi $x=0$.`, why: "Số trừ đi một bình phương đạt lớn nhất khi bình phương bằng $0$. Chiều cao cổng là $4$ mét." },
        { claim: R`Phương trình $4-x^2=0$ cho $x=-2$ và $x=2$.`, why: "Hai nghiệm này là hai chân cổng. Bề rộng bằng hiệu $2-(-2)=4$ mét." },
      ],
      checks: [
        { expr: "4-0**2", expect: "4" },
        { expr: "2-(-2)", expect: "4" },
      ],
    },
    {
      kind: "thuc-te",
      sao: 3,
      prompt: R`Số liệu giả định. Lợi nhuận tính bằng triệu đồng là $P(x)=-2x^2+8x-3$, với $x>0$ là số trăm sản phẩm. Tìm số sản phẩm cho lợi nhuận cao nhất và số tiền đó.`,
      think: "Hoàn thành bình phương. Hoành độ làm bình phương bằng $0$ phải dương thì mới là một mức sản xuất hợp lệ.",
      answer: "Lợi nhuận cao nhất là $5$ triệu đồng khi sản xuất $2$ trăm sản phẩm.",
      steps: [
        { claim: R`Ta có $P(x)=-2(x-2)^2+5$.`, why: "Vì $-2x^2+8x-3=-2(x^2-4x)-3=-2\\left((x-2)^2-4\\right)-3$. Đẳng thức đúng với mọi $x$." },
        { claim: R`Giá trị lớn nhất bằng $5$ triệu đồng tại $x=2$.`, why: "Hệ số $-2$ làm bình phương kéo lợi nhuận xuống. Điểm $x=2$ thuộc miền $x>0$, tức $2$ trăm sản phẩm và lợi nhuận $5$ triệu đồng." },
      ],
      checks: [{ expr: "-2*2**2+8*2-3", expect: "5" }],
    },
    {
      kind: "mo",
      sao: 3,
      prompt: R`Khi hệ số của $x^2$ bằng $0$, phương trình $ax^2+bx+c=0$ còn được giải bằng công thức $\Delta$ hay không? Nêu cách giải đúng.`,
      think: "Nhìn mẫu $2a$ trong công thức nghiệm. Xét tiếp hệ số $b$ để tách trường hợp bậc nhất và trường hợp hằng.",
      answer: R`Công thức $\Delta$ không dùng được khi $a=0$. Nếu $b\neq 0$ thì nghiệm duy nhất là $x=-\frac{c}{b}$. Nếu $b=0$ thì hoặc vô nghiệm, hoặc mọi số thực đều là nghiệm, tùy $c$ có bằng $0$ hay không.`,
      steps: [
        { claim: R`Mẫu $2a$ bằng $0$ khi $a=0$, nên không viết được $\frac{-b\pm\sqrt{\Delta}}{2a}$.`, why: "Phép chia cho $0$ không có nghĩa. Việc gọi $\\Delta$ trong trường hợp này không tạo ra nghiệm." },
        { claim: R`Phần còn lại là $bx+c=0$.`, why: "Nếu $b\\neq 0$ thì có đúng một nghiệm. Nếu $b=0$, phương trình chỉ còn hằng số $c$, và tập nghiệm phụ thuộc $c$ có bằng $0$ hay không." },
      ],
      checks: [{ expr: "2*3-6", expect: "0" }],
    },
    {
      kind: "phan-bien",
      sao: 3,
      prompt: R`Với phương trình $2x-6=0$, bạn A coi đây là phương trình bậc hai có $a=0$, $b=2$, $c=-6$, tính $\Delta=b^2-4ac=4>0$ rồi kết luận phương trình có hai nghiệm phân biệt. Hãy phản biện.`,
      think: "Hệ số của $x^2$ bằng $0$. Hãy chỉ ra mẫu của công thức nghiệm và giải trực tiếp phương trình bậc nhất.",
      answer: "Phương trình có nghiệm duy nhất $x=3$. Biệt thức không áp dụng vì hệ số bậc hai bằng $0$.",
      steps: [
        { claim: R`Phương trình đã cho là bậc nhất, hệ số của $x^2$ bằng $0$.`, why: "Không có hạng tử $x^2$ với hệ số khác $0$. Công thức hai nghiệm của tam thức không có đối tượng để áp dụng." },
        { claim: R`Nghiệm đúng là $x=3$, vì $2\cdot 3-6=0$.`, why: "Cô lập ẩn của phương trình bậc nhất. Công thức nghiệm của tam thức có mẫu $2a$ bằng $0$ nên không dùng được, và phương trình bậc nhất chỉ có một nghiệm. Thử thêm $x=0$: vế trái bằng $-6$, không phải nghiệm." },
      ],
      checks: [
        { expr: "2*3-6", expect: "0" },
        { expr: "2*0-6", expect: "-6" },
      ],
    },
    {
      kind: "doc",
      sao: 2,
      prompt: R`Bảng dấu của $f(x)=x^2-5x+6$ ghi dấu dương trên $(-\infty;2)$, bằng $0$ tại $2$ và tại $3$, dấu âm trên $(2;3)$, rồi dương trên $(3;+\infty)$. Hãy đọc tập nghiệm của $f(x)\le 0$.`,
      think: "Giữ các khoảng có dấu âm và các điểm làm hàm bằng $0$, vì bất phương trình có dấu bằng.",
      answer: R`Tập nghiệm đọc được là $[2;3]$.`,
      steps: [
        { claim: R`Khoảng $(2;3)$ có dấu âm, nên thuộc tập nghiệm.`, why: "Chiều bất phương trình nhận mọi chỗ tam thức âm. Bảng đã cho sẵn dấu này." },
        { claim: R`Hai điểm $2$ và $3$ cũng thuộc tập nghiệm, còn các khoảng dương thì không.`, why: "Tại hai nghiệm, hàm bằng $0$ và $0\\le 0$. Trên hai khoảng dương, hàm không thỏa bất phương trình." },
      ],
      checks: [
        { expr: "2**2-5*2+6", expect: "0" },
        { expr: "4**2-5*4+6", expect: "2" },
      ],
    },
    {
      kind: "uoc-luong",
      sao: 3,
      prompt: R`Nghiệm dương của $x^2-2x-1=0$ là $1+\sqrt{2}$. Hãy chặn nghiệm này giữa hai số nguyên liên tiếp.`,
      think: "Chặn $\\sqrt{2}$ bằng cách so $2$ với $1^2$ và $2^2$. Sau đó cộng thêm $1$.",
      answer: R`Vì $1<\sqrt{2}<2$ nên nghiệm dương nằm giữa $2$ và $3$.`,
      steps: [
        { claim: R`Ta có $1^2<2<2^2$, và hàm căn tăng trên $[0;+\infty)$, nên $1<\sqrt{2}<2$.`, why: "Bình phương $1$ nhỏ hơn $2$ và bình phương $2$ lớn hơn $2$. Chiều của căn giữ nguyên các dấu bất đẳng thức này." },
        { claim: R`Cộng $1$ được $2<1+\sqrt{2}<3$.`, why: "Nghiệm dương đúng bằng $1+\\sqrt{2}$. Khoảng $(2;3)$ là ước lượng nguyên đã xin." },
      ],
      checks: [
        { expr: "(2+sqrt(8))/2", expect: "1+sqrt(2)" },
        { expr: "sqrt(2)**2", expect: "2" },
      ],
    },
    {
      kind: "tu-ra-de",
      sao: 4,
      prompt: R`Bài xuất phát $x^2-5x+6=0$ có hai nghiệm vì $a=1$ và $\Delta=1$. Hãy đổi giả thiết bằng cách xét phương trình $0\cdot x^2+2x-6=0$, dự đoán công thức $\Delta$ còn dùng được không, rồi giải.`,
      think: "Hệ số mới của $x^2$ bằng $0$. Dự đoán phải chuyển sang phương trình bậc nhất, rồi thử lại nghiệm.",
      answer: "Dự đoán công thức biệt thức không còn dùng được. Phương trình mới có nghiệm duy nhất $x=3$.",
      steps: [
        { claim: R`Đổi hệ số bậc hai từ $1$ thành $0$ làm mẫu $2a$ bằng $0$.`, why: "Công thức nghiệm của tam thức đòi hỏi $a\\neq 0$. Dự đoán này loại công thức $\\Delta$ trước khi giải." },
        { claim: R`Phương trình còn $2x-6=0$, nên $x=3$.`, why: "Đây là bậc nhất với hệ số $2$ khác $0$. Thay lại, vế trái bằng $0$, nên nghiệm được giữ." },
      ],
      checks: [{ expr: "2*3-6", expect: "0" }],
    },
  ],
};
