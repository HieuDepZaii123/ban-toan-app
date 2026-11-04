import type { TopicDang } from "./types.ts";

const R = String.raw;

export const ineqDang: TopicDang = {
  id: "ineq",
  title: "Bất đẳng thức",
  dang: [
    {
      name: "Bất phương trình bậc nhất hai ẩn",
      nhanDang: "Một bất phương trình bậc nhất theo $x$ và $y$, hỏi một điểm có thuộc miền nghiệm hay không.",
      phuongPhap: R`Miền nghiệm của $ax+by\le c$ là một nửa mặt phẳng, gồm đường thẳng biên khi bất phương trình không chặt. Một điểm thuộc miền khi và chỉ khi tọa độ của điểm làm bất phương trình đúng, cùng với các điều kiện dấu nếu đề có $x\ge 0$ hoặc $y\ge 0$. Thử một điểm là đủ để kết luận điểm đó, nhưng chưa mô tả hết miền.`,
      viDu: {
        prompt: R`Xét miền $x+y\le 4$, $x\ge 0$, $y\ge 0$. Điểm $(1;2)$ có thuộc miền không?`,
        steps: [
          { claim: R`Ta có $1\ge 0$, $2\ge 0$ và $1+2=3\le 4$.`, why: "Cả ba bất phương trình của hệ mô tả miền đều đúng tại điểm này. Mỗi bất phương trình là một điều kiện cần." },
          { claim: R`Vậy $(1;2)$ thuộc miền.`, why: "Đủ cả ba điều kiện thì điểm thuộc giao của ba nửa mặt phẳng. Không cần xét thêm đỉnh." },
        ],
        ket: R`Điểm $(1;2)$ thuộc miền.`,
        checks: [{ expr: "1+2", expect: "3" }],
      },
      loi: "Thấy một tọa độ dương rồi kết luận điểm thuộc miền, trong khi tổng hai tọa độ còn vượt quá vế phải.",
      luyen: {
        kind: "luyen",
        prompt: R`Điểm $(3;2)$ có thuộc miền $x+y\le 4$, $x\ge 0$, $y\ge 0$ không?`,
        think: "Tính $3+2$ và so với $4$. Một bất phương trình sai là đủ để điểm nằm ngoài giao.",
        answer: R`Điểm $(3;2)$ không thuộc miền, vì $3+2=5>4$.`,
        steps: [
          { claim: R`Hai tọa độ đều không âm, nhưng $3+2=5$.`, why: "Điều kiện dấu đúng chưa đủ. Còn bất phương trình tổng phải được kiểm riêng." },
          { claim: R`Vì $5>4$, điểm không thuộc nửa mặt phẳng $x+y\le 4$.`, why: "Sai một bất phương trình của giao là điều kiện đủ để loại điểm. Miền đang xét không chứa $(3;2)$." },
        ],
        checks: [{ expr: "3+2", expect: "5" }],
      },
    },
    {
      name: "Hệ bất phương trình bậc nhất hai ẩn",
      nhanDang: "Nhiều bất phương trình bậc nhất cùng lúc, hỏi các đỉnh của miền đa giác.",
      phuongPhap: R`Miền nghiệm của hệ là giao các nửa mặt phẳng. Với một đa giác lồi, mỗi đỉnh là giao của hai đường biên và phải thỏa mọi bất phương trình còn lại. Giao của hai đường thẳng chỉ là ứng viên. Nếu ứng viên làm sai một bất phương trình khác thì bị loại. Liệt kê đủ các cặp biên rồi thử là điều kiện đủ để không thiếu đỉnh và không nhận điểm ngoài.`,
      viDu: {
        prompt: R`Tìm các đỉnh của miền $x\ge 0$, $y\ge 0$, $x+y\le 4$, $x\le 3$.`,
        steps: [
          { claim: R`Bốn ứng viên từ các cặp biên hữu hạn là $(0;0)$, $(3;0)$, $(3;1)$ và $(0;4)$.`, why: "Đó là giao của $x=0$ với $y=0$, của $x=3$ với $y=0$, của $x=3$ với $x+y=4$, và của $x=0$ với $x+y=4$." },
          { claim: R`Điểm $(4;0)$ là giao của $y=0$ và $x+y=4$ nhưng có $x=4>3$, nên bị loại.`, why: "Ứng viên này sai điều kiện $x\\le 3$. Giao hai biên chưa đủ khi còn một bất phương trình khác." },
          { claim: R`Bốn điểm còn lại thỏa cả hệ.`, why: "Tại $(3;1)$ thì $3+1=4$ và $3\\le 3$. Tại $(0;4)$ thì $0+4=4$ và $0\\le 3$. Hai điểm trên các trục cũng thỏa." },
        ],
        ket: R`Các đỉnh là $(0;0)$, $(3;0)$, $(3;1)$ và $(0;4)$.`,
        checks: [
          { expr: "3+1", expect: "4" },
          { expr: "4-3", expect: "1" },
        ],
      },
      loi: "Nhận giao của hai đường biên dù điểm đó vi phạm một bất phương trình còn lại.",
      luyen: {
        kind: "luyen",
        prompt: R`Trong hệ $x\ge 0$, $y\ge 0$, $x+y\le 4$, $x\le 3$, tìm giao của $x=3$ và $x+y=4$, rồi kiểm tra điểm đó.`,
        think: "Từ $x=3$ suy ra $y=1$. Sau đó thử $y\\ge 0$ và $x\\le 3$, cả hai đều là điều kiện của hệ.",
        answer: R`Giao là $(3;1)$ và điểm này là một đỉnh của miền.`,
        steps: [
          { claim: R`Thế $x=3$ vào $x+y=4$ được $y=1$.`, why: "Hai đường biên cắt nhau tại đúng một điểm vì hai phương trình bậc nhất độc lập." },
          { claim: R`Điểm $(3;1)$ thỏa $y\ge 0$ và $x\le 3$.`, why: "Các bất phương trình còn lại đều đúng. Vì vậy giao này không bị loại và là một đỉnh." },
        ],
        checks: [{ expr: "4-3", expect: "1" }],
      },
    },
    {
      name: "Bài toán tối ưu bằng quy hoạch tuyến tính",
      nhanDang: "Hàm bậc nhất trên một đa giác lồi đóng xác định bởi hệ bất phương trình bậc nhất, hỏi giá trị lớn nhất hoặc nhỏ nhất.",
      phuongPhap: R`Trên một đa giác lồi đóng, hàm bậc nhất đạt giá trị lớn nhất và giá trị nhỏ nhất tại đỉnh. Xét đủ mọi đỉnh là điều kiện đủ. Bỏ một đỉnh thì phép xét chưa đủ, vì đỉnh bị bỏ có thể chính là chỗ đạt. Sau khi tính giá trị tại từng đỉnh, chọn số lớn nhất hoặc nhỏ nhất và nêu mọi đỉnh đạt số đó.`,
      viDu: {
        prompt: R`Trên miền $x\ge 0$, $y\ge 0$, $x+y\le 4$, $x\le 3$, tìm giá trị lớn nhất của $x+2y$.`,
        steps: [
          { claim: R`Bốn đỉnh là $(0;0)$, $(3;0)$, $(3;1)$ và $(0;4)$.`, why: "Đã loại giao $(4;0)$ vì vi phạm $x\\le 3$. Hàm bậc nhất trên miền đóng này đạt lớn nhất tại một trong các đỉnh còn lại." },
          { claim: R`Bốn giá trị là $0$, $3$, $5$ và $8$.`, why: "Thay lần lượt vào $x+2y$. Phép xét đủ bốn đỉnh là điều kiện đủ để kết luận." },
          { claim: R`Giá trị lớn nhất bằng $8$, đạt tại $(0;4)$.`, why: "Số $8$ lớn hơn ba giá trị kia. Chỉ đỉnh $(0;4)$ cho giá trị này." },
        ],
        ket: R`Giá trị lớn nhất bằng $8$, đạt tại $(0;4)$.`,
        checks: [
          { expr: "0+2*4", expect: "8" },
          { expr: "3+2*1", expect: "5" },
          { expr: "3+2*0", expect: "3" },
        ],
      },
      loi: "Chỉ tính hai đỉnh rồi kết luận lớn nhất, trong khi còn đỉnh chưa xét.",
      luyen: {
        kind: "luyen",
        prompt: R`Với cùng bốn đỉnh $(0;0)$, $(3;0)$, $(3;1)$ và $(0;4)$, tìm giá trị lớn nhất của $x+y$ và các đỉnh đạt giá trị đó.`,
        think: "Tính $x+y$ tại đủ bốn đỉnh. Nếu hai đỉnh cùng cho số lớn nhất thì phải nêu cả hai.",
        answer: R`Giá trị lớn nhất bằng $4$, đạt tại cả $(3;1)$ và $(0;4)$.`,
        steps: [
          { claim: R`Bốn giá trị là $0$, $3$, $4$ và $4$.`, why: "Tại $(3;1)$ thì $3+1=4$, tại $(0;4)$ thì $0+4=4$. Hai đỉnh trên trục cho $0$ và $3$." },
          { claim: R`Số lớn nhất là $4$ và có hai đỉnh đạt.`, why: "Điều kiện đủ là đã xét hết đỉnh. Bỏ một trong hai đỉnh đạt sẽ làm lời giải thiếu chỗ đạt." },
        ],
        checks: [
          { expr: "3+1", expect: "4" },
          { expr: "0+4", expect: "4" },
        ],
      },
    },
    {
      name: "AM–GM cho hai số không âm (Nâng cao)",
      nhanDang: "Nội dung nâng cao, ngoài phần bắt buộc của sách giáo khoa. Tổng hai số không âm, hoặc một số dương cộng nghịch đảo của nó, hỏi một cận dưới.",
      phuongPhap: R`Với $a,b\ge 0$, $a+b\ge 2\sqrt{ab}$, và đẳng thức trong bất đẳng thức này xảy ra khi và chỉ khi $a=b$. Điều kiện $a=b$ là cần và đủ cho dấu bằng của chính bất đẳng thức. Muốn giá trị nhỏ nhất đạt được trên một miền, điểm làm $a=b$ còn phải thuộc miền. Thuộc miền là điều kiện cần thêm. Nếu điểm đó nằm ngoài miền thì $2\sqrt{ab}$ vẫn là một cận dưới nhưng chưa phải giá trị nhỏ nhất trên miền.`,
      viDu: {
        prompt: R`Với $x>0$, tìm giá trị nhỏ nhất của $x+\frac{4}{x}$.`,
        steps: [
          { claim: R`Hai số $x$ và $\frac{4}{x}$ đều dương.`, why: "Miền $x>0$ làm cả hai số không âm, đúng giả thiết của AM–GM. Đây là nội dung nâng cao." },
          { claim: R`Ta có $x+\frac{4}{x}\ge 2\sqrt{4}=4$.`, why: "Đẳng thức trong AM–GM xảy ra khi và chỉ khi hai số bằng nhau. Căn của tích bằng $2$." },
          { claim: R`Điểm $x=2$ thuộc miền $x>0$ và làm hai số bằng nhau.`, why: "Thuộc miền là điều kiện cần thêm để cận $4$ được đạt. Tại $x=2$, biểu thức bằng $4$, nên giá trị nhỏ nhất đúng bằng $4$." },
        ],
        ket: R`Giá trị nhỏ nhất bằng $4$, đạt tại $x=2$.`,
        checks: [{ expr: "2+4/2", expect: "4" }],
      },
      loi: "Thấy $a=b$ rồi kết luận giá trị nhỏ nhất, trong khi điểm đó không thuộc miền của đề.",
      luyen: {
        kind: "luyen",
        prompt: R`Với $x>0$, chứng minh $x+\frac{1}{x}\ge 2$ và tìm chỗ dấu bằng.`,
        think: "Hai số dương là $x$ và $\\frac{1}{x}$. Giải $x=\\frac{1}{x}$ rồi chỉ giữ nghiệm dương và kiểm tra nghiệm đó thuộc miền.",
        answer: R`Bất đẳng thức đúng, và dấu bằng đạt tại $x=1$.`,
        steps: [
          { claim: R`Ta có $x+\frac{1}{x}\ge 2\sqrt{x\cdot\frac{1}{x}}=2$.`, why: "AM–GM cho hai số không âm. Tích trong căn bằng $1$, nên cận dưới bằng $2$." },
          { claim: R`Dấu bằng khi $x=\frac{1}{x}$ và $x>0$, tức tại $x=1$.`, why: "Phương trình $x^2=1$ có nghiệm dương duy nhất $x=1$, và điểm này thuộc miền. Vì vậy giá trị $2$ đạt được." },
        ],
        checks: [{ expr: "1+1/1", expect: "2" }],
      },
    },
    {
      name: "Tích lớn nhất khi tổng cố định (Nâng cao)",
      nhanDang: "Nội dung nâng cao. Biết tổng hai số không âm, hỏi giá trị lớn nhất của tích.",
      phuongPhap: R`Từ AM–GM, $ab\le\left(\frac{a+b}{2}\right)^2$, và đẳng thức xảy ra khi và chỉ khi $a=b$. Nếu tổng cố định và điểm $a=b$ thuộc miền thì cận này là giá trị lớn nhất. Thuộc miền vẫn là điều kiện cần thêm. Nếu điểm bằng nhau nằm ngoài miền thì bình phương nửa tổng chỉ là một cận trên, chưa phải giá trị lớn nhất trên miền.`,
      viDu: {
        prompt: R`Với $x>0$, $y>0$ và $x+y=10$, tìm giá trị lớn nhất của $xy$.`,
        steps: [
          { claim: R`Ta có $xy\le\left(\frac{10}{2}\right)^2=25$.`, why: "Hệ quả AM–GM khi tổng đã biết. Đây là nội dung nâng cao, và bất đẳng thức cho một cận trên." },
          { claim: R`Dấu bằng khi $x=y=5$, và điểm này thuộc miền.`, why: "Hai số dương, tổng $10$. Thuộc miền làm cận $25$ đạt được, nên đó là giá trị lớn nhất." },
        ],
        ket: R`Giá trị lớn nhất của tích bằng $25$.`,
        checks: [{ expr: "(10/2)**2", expect: "25" }],
      },
      loi: "Viết bình phương của nửa tổng nhưng không kiểm tra điểm dấu bằng có thuộc miền hay không.",
      luyen: {
        kind: "luyen",
        prompt: R`Với $x>0$, $y>0$ và $x+y=6$, tìm giá trị lớn nhất của $xy$.`,
        think: "Tổng cố định bằng $6$. Tích lớn nhất khi hai số bằng nhau, rồi kiểm tra điểm đó còn dương.",
        answer: R`Giá trị lớn nhất của tích bằng $9$, đạt tại $x=y=3$.`,
        steps: [
          { claim: R`Ta có $xy\le\left(\frac{6}{2}\right)^2=9$.`, why: "Hệ quả AM–GM khi tổng đã biết. Đây là nội dung nâng cao, và bất đẳng thức cho cận trên của tích." },
          { claim: R`Dấu bằng khi $x=y=3$, và điểm này thuộc miền.`, why: "Hai số dương và tổng bằng $6$. Thuộc miền làm cận $9$ đạt được, nên đó là giá trị lớn nhất." },
        ],
        checks: [{ expr: "(6/2)**2", expect: "9" }],
      },
    },
  ],
  sangTao: [
    {
      kind: "thuc-te",
      sao: 4,
      prompt: R`Số liệu giả định. Xưởng làm $x$ chiếc bàn và $y$ chiếc ghế, với $x\ge 0$, $y\ge 0$, $x+y\le 4$ và $x\le 3$. Lợi nhuận là $x+2y$ triệu đồng. Tìm phương án lợi nhuận cao nhất và so với phương án $3$ bàn cùng $1$ ghế.`,
      think: "Miền là đa giác có bốn đỉnh. Tính lợi nhuận tại đủ bốn đỉnh. Diễn giải phương án tối ưu theo số bàn và số ghế.",
      answer: "Lợi nhuận cao nhất là $8$ triệu đồng, khi làm $0$ bàn và $4$ ghế. Phương án $3$ bàn và $1$ ghế chỉ được $5$ triệu đồng, thấp hơn $3$ triệu đồng.",
      steps: [
        { claim: R`Bốn đỉnh cho lợi nhuận $0$, $3$, $5$ và $8$ triệu đồng.`, why: "Các đỉnh là $(0;0)$, $(3;0)$, $(3;1)$ và $(0;4)$. Hàm bậc nhất trên đa giác đóng đạt lớn nhất tại một đỉnh, nên xét đủ bốn đỉnh." },
        { claim: R`Mức cao nhất là $8$ triệu đồng tại $(0;4)$.`, why: "Ghế mang hệ số $2$, lớn hơn hệ số của bàn. Diễn giải: phương án chỉ làm $4$ ghế dùng hết ràng buộc $x+y\\le 4$ và không chạm trần $3$ bàn." },
        { claim: R`Phương án $(3;1)$ cho $5$ triệu đồng, kém $3$ triệu đồng.`, why: "Hiệu $8-5=3$. So sánh này cho thấy đỉnh có nhiều bàn hơn không phải phương án lợi nhuận cao nhất." },
      ],
      checks: [
        { expr: "0+2*4", expect: "8" },
        { expr: "3+2*1", expect: "5" },
        { expr: "8-5", expect: "3" },
      ],
    },
    {
      kind: "thuc-te",
      sao: 3,
      prompt: R`Số liệu giả định. Hai cạnh dương của một mảnh vườn có tổng $10$ mét. Tính diện tích lớn nhất, rồi tính diện tích khi hai cạnh là $2$ mét và $8$ mét.`,
      think: "Tổng hai cạnh kề bằng $10$. Tích lớn nhất khi hai cạnh bằng $5$, và điểm này còn dương. Tính thêm một hình chữ nhật không vuông để so.",
      answer: "Diện tích lớn nhất là $25$ mét vuông khi mỗi cạnh dài $5$ mét. Hình $2$ mét trên $8$ mét chỉ có diện tích $16$ mét vuông, kém $9$ mét vuông.",
      steps: [
        { claim: R`Với $x>0$ và $10-x>0$, tích không vượt quá $25$, và bằng $25$ khi $x=5$.`, why: "Hệ quả AM–GM, nội dung nâng cao. Điểm hai cạnh bằng nhau thuộc khoảng $(0;10)$, nên $25$ mét vuông đạt được." },
        { claim: R`Tại các cạnh $2$ mét và $8$ mét, diện tích bằng $16$ mét vuông.`, why: "Tích $2\\cdot 8$. Diễn giải: lệch khỏi hình vuông làm mất $9$ mét vuông so với mức lớn nhất." },
      ],
      checks: [
        { expr: "5*5", expect: "25" },
        { expr: "2*8", expect: "16" },
        { expr: "25-16", expect: "9" },
      ],
    },
    {
      kind: "thuc-te",
      sao: 4,
      prompt: R`Số liệu giả định. Chi phí một mẻ là $t+\frac{4}{t}$ triệu đồng, với thời gian $t\ge 3$ giờ. Chứng minh mức $4$ triệu đồng không đạt được, và tìm chi phí nhỏ nhất trên miền này.`,
      think: "AM–GM cho cận $4$ tại $t=2$, nhưng $2$ không thuộc $[3;+\\infty)$. Phân tích hiệu giữa biểu thức và $\\frac{13}{3}$ thành tích có dấu xác định khi $t\\ge 3$.",
      answer: R`Mức $4$ triệu đồng không đạt trên miền $t\ge 3$. Chi phí nhỏ nhất là $\frac{13}{3}$ triệu đồng, tại $t=3$ giờ.`,
      steps: [
        { claim: R`Điểm $t=2$ làm $t=\frac{4}{t}$ nhưng $2<3$, nên $2$ không thuộc miền.`, why: "Dấu bằng của AM–GM nằm ngoài miền thời gian. Cận $4$ triệu đồng vì thế chưa phải giá trị nhỏ nhất trên miền đã cho." },
        { claim: R`Với $t>0$, $t+\frac{4}{t}-\frac{13}{3}=\frac{(3t-4)(t-3)}{3t}$.`, why: "Quy đồng rồi phân tích tử. Đây là một đẳng thức, dùng để xét dấu trên miền $t\\ge 3$." },
        { claim: R`Khi $t\ge 3$, hiệu này không âm và bằng $0$ tại $t=3$.`, why: "Các thừa số $3t-4$, $t-3$ và $3t$ đều không âm trên miền. Diễn giải: chi phí nhỏ nhất là $\\frac{13}{3}$ triệu đồng tại đúng $3$ giờ." },
      ],
      checks: [
        { expr: "3+Rational(4,3)", expect: "Rational(13,3)" },
        { expr: "simplify((t+4/t-Rational(13,3))-(3*t-4)*(t-3)/(3*t))", expect: "0" },
      ],
    },
    {
      kind: "thuc-te",
      sao: 2,
      prompt: R`Số liệu giả định. Kho nhận lô hàng $x$ kilôgam gạo và $y$ kilôgam đậu khi $x\ge 0$, $y\ge 0$, $x+y\le 4$ và $x\le 3$. Lô $(3;2)$ và lô $(3;1)$ có được nhận không?`,
      think: "Thử từng lô vào mọi bất phương trình. Một bất phương trình sai là đủ để từ chối lô đó.",
      answer: "Lô $3$ kilôgam gạo và $2$ kilôgam đậu không được nhận. Lô $3$ kilôgam gạo và $1$ kilôgam đậu được nhận.",
      steps: [
        { claim: R`Với lô $(3;2)$, tổng bằng $5>4$.`, why: "Sai bất phương trình $x+y\\le 4$. Diễn giải: kho từ chối lô này dù lượng gạo vẫn không vượt $3$ kilôgam." },
        { claim: R`Với lô $(3;1)$, ta có $3+1=4$ và $3\le 3$.`, why: "Mọi bất phương trình của hệ đều đúng. Lô $3$ kilôgam gạo và $1$ kilôgam đậu nằm trên biên và được nhận." },
      ],
      checks: [
        { expr: "3+2", expect: "5" },
        { expr: "3+1", expect: "4" },
      ],
    },
    {
      kind: "mo",
      sao: 3,
      prompt: R`Với $x+\frac{4}{x}$ và $x>0$, điều kiện $x=\frac{4}{x}$ bảo đảm điều gì? Điều kiện đó có đủ để kết luận giá trị nhỏ nhất trên mọi miền con của $(0;+\infty)$ hay không?`,
      think: "Tách hai việc: dấu bằng trong AM–GM, và việc điểm dấu bằng có nằm trong miền đang xét. Nêu một miền làm hai việc này tách nhau.",
      answer: R`Điều kiện $x=2$ là cần và đủ để đẳng thức AM–GM xảy ra. Nó chưa đủ cho mọi miền con. Trên $[3;+\infty)$, giá trị nhỏ nhất là $\frac{13}{3}$ tại $x=3$.`,
      steps: [
        { claim: R`Trong AM–GM, hai số bằng nhau khi và chỉ khi đẳng thức xảy ra.`, why: "Đó là điều kiện cần và đủ của dấu bằng trong bất đẳng thức, với hai số không âm. Nội dung này là nâng cao." },
        { claim: R`Trên miền $x\ge 3$, điểm $x=2$ bị loại và giá trị nhỏ nhất chuyển thành $\frac{13}{3}$.`, why: "Thuộc miền là điều kiện cần thêm. Cùng một biểu thức đổi giá trị nhỏ nhất khi miền đổi." },
      ],
      checks: [{ expr: "3+Rational(4,3)", expect: "Rational(13,3)" }],
    },
    {
      kind: "phan-bien",
      sao: 4,
      prompt: R`Bạn A nói: cứ chỗ hai số bằng nhau là giá trị nhỏ nhất của $x+\frac{4}{x}$ trên mọi miền đều bằng $4$. Xét miền $x\ge 3$ và phản biện.`,
      think: "Giữ nguyên biến $x$. Kiểm tra $x=2$ có thuộc miền $x\\ge 3$ không. Nếu không, tính giá trị tại đầu mút $x=3$ và chỉ ra nó lớn hơn $4$.",
      answer: R`Mệnh đề của bạn A sai trên miền $x\ge 3$. Giá trị nhỏ nhất ở đó bằng $\frac{13}{3}$, đạt tại $x=3$, và $\frac{13}{3}>4$.`,
      steps: [
        { claim: R`Điểm làm hai số bằng nhau là $x=2$, và $2$ không thuộc $[3;+\infty)$.`, why: "Bạn A dùng dấu bằng của AM–GM như thể điểm đó luôn nằm trong miền. Với miền $x\\ge 3$, điều kiện thuộc miền đã thất bại." },
        { claim: R`Tại $x=3$, biểu thức bằng $\frac{13}{3}$, và hiệu $\frac{13}{3}-4=\frac{1}{3}>0$.`, why: "Giá trị tại đầu mút lớn hơn $4$. Vì vậy $4$ không phải giá trị nhỏ nhất của cùng biểu thức theo biến $x$ trên miền này." },
      ],
      checks: [
        { expr: "3+Rational(4,3)", expect: "Rational(13,3)" },
        { expr: "Rational(13,3)-4", expect: "Rational(1,3)" },
      ],
    },
    {
      kind: "doc",
      sao: 2,
      prompt: R`Bảng giá trị của $x+2y$ tại bốn đỉnh ghi $(0;0)\mapsto 0$, $(3;0)\mapsto 3$, $(3;1)\mapsto 5$, $(0;4)\mapsto 8$. Hãy đọc giá trị lớn nhất và đỉnh đạt giá trị đó.`,
      think: "So bốn số đã ghi. Giá trị lớn nhất của hàm bậc nhất trên đa giác là số lớn nhất trong bảng, miễn bảng đủ đỉnh.",
      answer: R`Giá trị lớn nhất bằng $8$, đạt tại đỉnh $(0;4)$.`,
      steps: [
        { claim: R`Bốn số đọc được là $0$, $3$, $5$ và $8$.`, why: "Mỗi số gắn với một đỉnh. Đọc thiếu một cột sẽ có thể bỏ đúng chỗ đạt lớn nhất." },
        { claim: R`Số lớn nhất là $8$, ở dòng $(0;4)$.`, why: "Ba số còn lại đều nhỏ hơn. Kết luận đủ vì bảng đã gồm cả bốn đỉnh của miền." },
      ],
      checks: [{ expr: "0+2*4", expect: "8" }],
    },
    {
      kind: "uoc-luong",
      sao: 2,
      prompt: R`Chi phí $\frac{13}{3}$ triệu đồng cần được chặn giữa hai số nguyên liên tiếp. Hãy ước lượng phân số này.`,
      think: "So $\\frac{13}{3}$ với $4$ và với $5$, tức so $13$ với $12$ và với $15$.",
      answer: R`Vì $4<\frac{13}{3}<5$ nên chi phí nằm giữa $4$ triệu đồng và $5$ triệu đồng.`,
      steps: [
        { claim: R`Ta có $\frac{13}{3}-4=\frac{1}{3}>0$.`, why: "Tử $13$ lớn hơn $12$. Chi phí cao hơn $4$ triệu đồng." },
        { claim: R`Ta có $5-\frac{13}{3}=\frac{2}{3}>0$.`, why: "Tử $13$ nhỏ hơn $15$. Diễn giải: chi phí nhỏ nhất trên miền từ $3$ giờ chưa tới $5$ triệu đồng." },
      ],
      checks: [
        { expr: "Rational(13,3)-4", expect: "Rational(1,3)" },
        { expr: "5-Rational(13,3)", expect: "Rational(2,3)" },
      ],
    },
    {
      kind: "tu-ra-de",
      sao: 4,
      prompt: R`Bài xuất phát: với $x>0$, biểu thức $x+\frac{4}{x}$ có giá trị nhỏ nhất $4$ tại $x=2$. Hãy đổi giả thiết thành miền $x\ge 3$, dự đoán giá trị nhỏ nhất còn bằng $4$ hay không, rồi tính giá trị nhỏ nhất mới.`,
      think: "Điểm $x=2$ sắp bị đẩy ra ngoài miền. Dự đoán cận $4$ không còn đạt, rồi tính giá trị tại $x=3$.",
      answer: R`Dự đoán giá trị nhỏ nhất không còn bằng $4$. Trên miền mới, giá trị nhỏ nhất bằng $\frac{13}{3}$ tại $x=3$.`,
      steps: [
        { claim: R`Đổi miền từ $x>0$ sang $x\ge 3$ làm điểm $x=2$ không còn được dùng.`, why: "Điểm dấu bằng của AM–GM ra khỏi miền. Dự đoán giá trị nhỏ nhất phải tăng lên so với $4$." },
        { claim: R`Tại $x=3$, biểu thức bằng $\frac{13}{3}$, và đó là giá trị nhỏ nhất mới.`, why: "Hiệu so với $\\frac{13}{3}$ phân tích thành $\\frac{(3x-4)(x-3)}{3x}$, không âm trên miền mới và bằng $0$ tại $x=3$." },
      ],
      checks: [{ expr: "3+Rational(4,3)", expect: "Rational(13,3)" }],
    },
  ],
};
