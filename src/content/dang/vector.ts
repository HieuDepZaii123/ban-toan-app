import type { TopicDang } from "./types.ts";

const R = String.raw;

export const vectorDang: TopicDang = {
  id: "vector",
  title: "Vectơ",
  dang: [
    {
      name: "Tổng, hiệu và tích với một số",
      nhanDang: "Cho hai vectơ trong mặt phẳng bằng tọa độ, hỏi tổng, hiệu hoặc một bội số.",
      phuongPhap: R`Với $\vec u=(x_1;y_1)$ và $\vec v=(x_2;y_2)$, tổng là $(x_1+x_2;y_1+y_2)$ và hiệu $\vec u-\vec v$ là $(x_1-x_2;y_1-y_2)$. Tích $k\vec u$ là $(kx_1;ky_1)$. Ba quy tắc này là định nghĩa theo tọa độ, nên mỗi tọa độ được tính riêng. Cộng độ dài hai vectơ chỉ bằng độ dài tổng khi hai vectơ cùng hướng.`,
      viDu: {
        prompt: R`Cho $\vec u=(2;1)$ và $\vec v=(1;-3)$. Tính $\vec u+\vec v$, $\vec u-\vec v$ và $3\vec u$.`,
        steps: [
          { claim: R`Tổng bằng $(3;-2)$ và hiệu bằng $(1;4)$.`, why: "Cộng hoặc trừ từng tọa độ. Hoành của tổng là $2+1$, tung của tổng là $1+(-3)$." },
          { claim: R`Tích $3\vec u$ bằng $(6;3)$.`, why: "Nhân cả hai tọa độ với cùng một số $3$. Thứ tự hoành, tung được giữ nguyên." },
        ],
        ket: R`Kết quả là $(3;-2)$, $(1;4)$ và $(6;3)$.`,
        checks: [
          { expr: "2+1", expect: "3" },
          { expr: "1+(-3)", expect: "-2" },
          { expr: "3*2", expect: "6" },
        ],
      },
      loi: "Cộng hai độ dài để được độ dài của tổng khi hai vectơ không cùng hướng.",
      luyen: {
        kind: "luyen",
        prompt: R`Tính $2(1;4)-(3;-1)$.`,
        think: "Nhân vectơ với $2$ trước, rồi trừ từng tọa độ của vectơ thứ hai.",
        answer: R`Đáp số là $(-1;9)$.`,
        steps: [
          { claim: R`Ta có $2(1;4)=(2;8)$.`, why: "Tích với số nhân cả hai tọa độ. Bước này đi trước phép trừ." },
          { claim: R`Hiệu bằng $(2-3;8-(-1))=(-1;9)$.`, why: "Trừ tung phải thành cộng vì trừ một số âm. Cả hai tọa độ đều đã được tính." },
        ],
        checks: [
          { expr: "2*1-3", expect: "-1" },
          { expr: "2*4-(-1)", expect: "9" },
        ],
      },
    },
    {
      name: "Phân tích một vectơ theo hai vectơ không cùng phương",
      nhanDang: "Viết một vectơ thành tổng hai bội của hai vectơ đã cho trong mặt phẳng.",
      phuongPhap: R`Nếu $\vec a$ và $\vec b$ không cùng phương thì có đúng một cặp số $x,y$ sao cho $\vec w=x\vec a+y\vec b$. Không cùng phương tương đương định thức tọa độ khác $0$, và đó là điều kiện cần và đủ để hệ hai phương trình có nghiệm duy nhất. Giải hệ theo từng tọa độ, rồi thay lại vào cả hai tọa độ.`,
      viDu: {
        prompt: R`Phân tích $\vec w=(3;1)$ theo $\vec a=(1;1)$ và $\vec b=(1;-1)$.`,
        steps: [
          { claim: R`Định thức $1\cdot(-1)-1\cdot 1=-2$ khác $0$.`, why: "Hai vectơ không cùng phương, nên phép phân tích tồn tại và duy nhất trong mặt phẳng." },
          { claim: R`Hệ $x+y=3$ và $x-y=1$ cho $x=2$, $y=1$.`, why: "Cộng hai phương trình được $2x=4$. Thay lại được $y=1$. Cặp này là nghiệm duy nhất." },
          { claim: R`Thử lại: $2(1;1)+1(1;-1)=(3;1)$.`, why: "Cả hoành và tung đều khớp vectơ cần phân tích. Nghiệm không bị loại." },
        ],
        ket: R`Ta có $(3;1)=2(1;1)+1(1;-1)$.`,
        checks: [
          { expr: "1*(-1)-1*1", expect: "-2" },
          { expr: "2*1+1*1", expect: "3" },
          { expr: "2*1+1*(-1)", expect: "1" },
        ],
      },
      loi: "Giải một tọa độ rồi không thử lại tọa độ còn lại.",
      luyen: {
        kind: "luyen",
        prompt: R`Tìm $x,y$ để $(4;0)=x(1;1)+y(1;-1)$.`,
        think: "Viết hệ $x+y=4$ và $x-y=0$. Hai vectơ cơ sở vẫn không cùng phương.",
        answer: R`Đáp số là $x=2$ và $y=2$.`,
        steps: [
          { claim: R`Hệ là $x+y=4$ và $x-y=0$.`, why: "Hoành là tổng hai hệ số, tung là hiệu hai hệ số vì tọa độ thứ hai của hai vectơ trái dấu." },
          { claim: R`Cộng từng vế được $2x=4$, nên $x=2$ và $y=2$.`, why: "Từ phương trình thứ hai, hai ẩn bằng nhau. Thay vào hoành được đúng $4$, vào tung được $0$." },
        ],
        checks: [
          { expr: "2+2", expect: "4" },
          { expr: "2-2", expect: "0" },
        ],
      },
    },
    {
      name: "Trung điểm và trọng tâm",
      nhanDang: "Cho hai hoặc ba điểm trong mặt phẳng, hỏi trung điểm của đoạn hoặc trọng tâm của tam giác.",
      phuongPhap: R`Trung điểm của $A(x_A;y_A)$ và $B(x_B;y_B)$ là $\left(\frac{x_A+x_B}{2};\frac{y_A+y_B}{2}\right)$. Trọng tâm của tam giác $ABC$ là trung bình cộng ba đỉnh, tức mỗi tọa độ chia cho $3$. Công thức trọng tâm cần đủ ba đỉnh. Trung điểm chỉ dùng hai đầu mút.`,
      viDu: {
        prompt: R`Tìm trung điểm của $A(1;3)$ và $B(5;7)$.`,
        steps: [
          { claim: R`Hoành trung điểm bằng $\frac{1+5}{2}=3$.`, why: "Trung điểm lấy trung bình cộng từng tọa độ. Phép này dùng đúng hai đầu mút." },
          { claim: R`Tung trung điểm bằng $\frac{3+7}{2}=5$.`, why: "Cùng quy tắc trên tung độ. Kết quả là một điểm, không phải một vectơ tự do thiếu gốc." },
        ],
        ket: R`Trung điểm là $M(3;5)$.`,
        checks: [
          { expr: "(1+5)/2", expect: "3" },
          { expr: "(3+7)/2", expect: "5" },
        ],
      },
      loi: "Chia tổng ba đỉnh cho $2$ khi đề hỏi trọng tâm.",
      luyen: {
        kind: "luyen",
        prompt: R`Tìm trọng tâm của tam giác có đỉnh $A(0;0)$, $B(6;0)$ và $C(0;6)$.`,
        think: "Cộng ba hoành rồi chia $3$. Làm độc lập với ba tung độ.",
        answer: R`Trọng tâm là $G(2;2)$.`,
        steps: [
          { claim: R`Hoành trọng tâm bằng $\frac{0+6+0}{3}=2$.`, why: "Công thức trọng tâm cộng cả ba đỉnh. Thiếu một đỉnh thì không còn là trọng tâm của tam giác." },
          { claim: R`Tung trọng tâm bằng $\frac{0+0+6}{3}=2$.`, why: "Ba tung độ được xử lý riêng. Điểm $G$ nằm trong mặt phẳng của ba đỉnh." },
        ],
        checks: [
          { expr: "(0+6+0)/3", expect: "2" },
          { expr: "(0+0+6)/3", expect: "2" },
        ],
      },
    },
    {
      name: "Tọa độ vectơ và độ dài",
      nhanDang: "Cho hai điểm trong mặt phẳng, hỏi tọa độ vectơ nối chúng hoặc độ dài đoạn thẳng.",
      phuongPhap: R`Vectơ $\overrightarrow{AB}$ có tọa độ bằng hiệu tọa độ đầu trừ gốc, tức $(x_B-x_A;y_B-y_A)$. Độ dài bằng căn bậc hai của tổng bình phương hai tọa độ, và căn này lấy giá trị không âm. Công thức chỉ có hai tọa độ vì vectơ đang xét nằm trong mặt phẳng.`,
      viDu: {
        prompt: R`Cho $A(1;0)$ và $B(3;4)$. Tính tọa độ $\overrightarrow{AB}$ và độ dài $AB$.`,
        steps: [
          { claim: R`Ta có $\overrightarrow{AB}=(2;4)$.`, why: "Trừ tọa độ điểm cuối cho điểm đầu. Đảo thứ tự sẽ ra vectơ ngược hướng." },
          { claim: R`Độ dài bằng $\sqrt{4+16}=\sqrt{20}=2\sqrt{5}$.`, why: "Căn của tổng bình phương lấy giá trị không âm. Thừa số chính phương $4$ được đưa ra ngoài căn." },
        ],
        ket: R`Vectơ bằng $(2;4)$ và đoạn thẳng dài $2\sqrt{5}$.`,
        checks: [
          { expr: "3-1", expect: "2" },
          { expr: "sqrt(4+16)", expect: "2*sqrt(5)" },
        ],
      },
      loi: "Lấy căn của hiệu hai tọa độ thay vì tổng các bình phương.",
      luyen: {
        kind: "luyen",
        prompt: R`Tính độ dài vectơ $\vec u=(6;8)$ trong mặt phẳng.`,
        think: "Bình phương từng tọa độ, cộng lại, rồi lấy căn không âm.",
        answer: R`Độ dài bằng $10$.`,
        steps: [
          { claim: R`Tổng bình phương bằng $36+64=100$.`, why: "Độ dài trong mặt phẳng chỉ cộng hai bình phương, theo đúng hai tọa độ đã cho." },
          { claim: R`Căn không âm của $100$ bằng $10$.`, why: "Nghiệm âm của phương trình $t^2=100$ không phải độ dài. Độ dài luôn lấy giá trị không âm." },
        ],
        checks: [{ expr: "sqrt(36+64)", expect: "10" }],
      },
    },
    {
      name: "Tích vô hướng và góc",
      nhanDang: "Cho hai vectơ khác vectơ không trong mặt phẳng, hỏi tích vô hướng hoặc côsin góc giữa chúng.",
      phuongPhap: R`Tích vô hướng là $x_1x_2+y_1y_2$. Khi cả hai vectơ khác $\vec 0$, $\cos(\vec u,\vec v)=\frac{\vec u\cdot\vec v}{|\vec u||\vec v|}$. Mẫu khác $0$ là điều kiện cần để viết côsin. Côsin tính ra phải thuộc $[-1;1]$. Nếu ra ngoài đoạn đó thì phép tính đã sai.`,
      viDu: {
        prompt: R`Cho $\vec u=(1;2)$ và $\vec v=(3;-1)$. Tính $\cos(\vec u,\vec v)$.`,
        steps: [
          { claim: R`Tích vô hướng bằng $3-2=1$.`, why: "Nhân từng cặp tọa độ rồi cộng. Kết quả này là một số, không phải một vectơ." },
          { claim: R`Hai độ dài là $\sqrt{5}$ và $\sqrt{10}$, đều khác $0$.`, why: "Cả hai vectơ khác vectơ không, nên được viết côsin. Đây là điều kiện cần của công thức." },
          { claim: R`Côsin bằng $\frac{1}{\sqrt{50}}=\frac{\sqrt{2}}{10}$.`, why: "Tích hai căn bằng $\\sqrt{50}$. Hữu tỉ hóa mẫu. Kết quả thuộc $(-1;1)$, nên là một côsin hợp lệ." },
        ],
        ket: R`Kết quả là $\cos(\vec u,\vec v)=\frac{\sqrt{2}}{10}$.`,
        checks: [
          { expr: "1*3+2*(-1)", expect: "1" },
          { expr: "1/sqrt(50)", expect: "sqrt(2)/10" },
        ],
      },
      loi: "Viết côsin khi một trong hai vectơ là vectơ không, vì khi đó mẫu bằng $0$.",
      luyen: {
        kind: "luyen",
        prompt: R`Tính tích vô hướng của $(1;2)$ và $(2;1)$.`,
        think: "Nhân hoành với hoành, tung với tung, rồi cộng hai tích.",
        answer: R`Tích vô hướng bằng $4$.`,
        steps: [
          { claim: R`Hai tích thành phần là $1\cdot 2$ và $2\cdot 1$.`, why: "Định nghĩa tích vô hướng trong mặt phẳng chỉ có hai số hạng này." },
          { claim: R`Tổng bằng $4$.`, why: "Cộng hai tích thành phần. Chưa cần chia cho độ dài vì đề chỉ hỏi tích vô hướng." },
        ],
        checks: [{ expr: "1*2+2*1", expect: "4" }],
      },
    },
    {
      name: "Hai vectơ vuông góc",
      nhanDang: "Bài tìm tham số để hai vectơ trong mặt phẳng vuông góc, hoặc kiểm tra một cặp đã vuông góc.",
      phuongPhap: R`Hai vectơ vuông góc khi và chỉ khi tích vô hướng bằng $0$. Điều kiện này là cần và đủ, kể cả khi một vectơ bằng $\vec 0$. Nếu đề đòi cả hai vectơ khác $\vec 0$ thì phải loại nghiệm làm một vectơ thành vectơ không. Cùng phương là tỉ lệ tọa độ, không phải điều kiện vuông góc.`,
      viDu: {
        prompt: R`Tìm $m$ để $\vec u=(2;3)$ vuông góc với $\vec v=(m;-2)$.`,
        steps: [
          { claim: R`Tích vô hướng bằng $2m-6$.`, why: "Nhân hoành với hoành và tung với tung. Tung của vectơ thứ hai là $-2$." },
          { claim: R`Vuông góc khi và chỉ khi $2m-6=0$, tức $m=3$.`, why: "Đây là điều kiện cần và đủ. Vectơ $(3;-2)$ khác vectơ không, nên không bị loại." },
        ],
        ket: R`Kết quả là $m=3$.`,
        checks: [{ expr: "2*3+3*(-2)", expect: "0" }],
      },
      loi: "Đặt tỉ số hai tọa độ bằng nhau rồi kết luận vuông góc. Đẳng thức tỉ số là điều kiện cùng phương.",
      luyen: {
        kind: "luyen",
        prompt: R`Tìm $m$ để $(m;1)$ vuông góc với $(2;-4)$.`,
        think: "Cho tích vô hướng bằng $0$ và giải một phương trình bậc nhất. Sau đó kiểm tra vectơ không bị triệt tiêu.",
        answer: R`Đáp số là $m=2$.`,
        steps: [
          { claim: R`Tích vô hướng bằng $2m-4$.`, why: "Tung của vectơ thứ nhất là $1$, tung của vectơ thứ hai là $-4$, nên số hạng thứ hai bằng $-4$." },
          { claim: R`Phương trình $2m-4=0$ cho $m=2$.`, why: "Điều kiện cần và đủ của vuông góc. Vectơ $(2;1)$ khác vectơ không nên nghiệm được giữ." },
        ],
        checks: [{ expr: "2*2+1*(-4)", expect: "0" }],
      },
    },
  ],
  sangTao: [
    {
      kind: "thuc-te",
      sao: 4,
      prompt: R`Số liệu giả định. Vận tốc của thuyền đối với nước là $(3;0)$ kilômét mỗi giờ, vận tốc dòng nước là $(0;4)$ kilômét mỗi giờ. Tính vận tốc của thuyền đối với bờ, tốc độ tương ứng, và quãng đường thẳng sau $2$ giờ.`,
      think: "Cộng hai vận tốc theo từng tọa độ để được vận tốc đối với bờ. Tốc độ là độ dài vectơ đó. Sau hai giờ, nhân cả hai tọa độ với $2$ rồi lấy độ dài.",
      answer: "Vận tốc đối với bờ là $(3;4)$ kilômét mỗi giờ, tốc độ là $5$ kilômét mỗi giờ. Sau $2$ giờ thuyền đi được $10$ kilômét theo đường thẳng.",
      steps: [
        { claim: R`Vận tốc đối với bờ bằng $(3;4)$ kilômét mỗi giờ.`, why: "Cộng vận tốc thuyền đối với nước và vận tốc dòng nước. Cả hai đại lượng đều là vận tốc, đơn vị kilômét mỗi giờ." },
        { claim: R`Tốc độ bằng $\sqrt{9+16}=5$ kilômét mỗi giờ.`, why: "Tốc độ là độ dài của vectơ vận tốc. Hai thành phần vuông góc nên dùng quan hệ cạnh huyền." },
        { claim: R`Sau $2$ giờ, độ dời là $(6;8)$ và dài $10$ kilômét.`, why: "Nhân vận tốc với thời gian $2$ giờ. Diễn giải: đường thẳng nối điểm đầu và điểm cuối dài $10$ kilômét." },
      ],
      checks: [
        { expr: "sqrt(3**2+4**2)", expect: "5" },
        { expr: "sqrt(6**2+8**2)", expect: "10" },
      ],
    },
    {
      kind: "thuc-te",
      sao: 3,
      prompt: R`Số liệu giả định. Một lực phẳng $(3;4)$ niutơn tác dụng khi vật dời $(4;0)$ mét. Tính công của lực. Nếu thay bằng lực $(0;4)$ niutơn trên cùng độ dời đó thì công bằng bao nhiêu?`,
      think: "Công của lực không đổi là tích vô hướng của lực với độ dời. Tính hai trường hợp riêng, rồi so với điều kiện vuông góc.",
      answer: "Công của lực $(3;4)$ là $12$ đơn vị trên quãng dời $4$ mét. Lực $(0;4)$ vuông góc với độ dời nên công bằng $0$ đơn vị.",
      steps: [
        { claim: R`Công thứ nhất bằng $3\cdot 4+4\cdot 0=12$ đơn vị.`, why: "Tích vô hướng của lực với độ dời. Đơn vị độ dời là mét, và số $12$ là công tương ứng." },
        { claim: R`Công thứ hai bằng $0\cdot 4+4\cdot 0=0$.`, why: "Tích vô hướng bằng $0$ khi và chỉ khi lực vuông góc với độ dời. Diễn giải: lực này không sinh công trên quãng dời đã cho." },
      ],
      checks: [
        { expr: "3*4+4*0", expect: "12" },
        { expr: "0*4+4*0", expect: "0" },
      ],
    },
    {
      kind: "thuc-te",
      sao: 3,
      prompt: R`Số liệu giả định. Ba cột ở $A(0;0)$, $B(6;0)$ và $C(0;6)$, đơn vị mét. Tìm trọng tâm tam giác và khoảng cách từ cột $A$ đến trọng tâm.`,
      think: "Trọng tâm là trung bình cộng ba đỉnh. Khoảng cách từ gốc đến $(2;2)$ là độ dài vectơ đó.",
      answer: "Trọng tâm là $(2;2)$ mét. Khoảng cách từ cột $A$ đến trọng tâm là $2\\sqrt{2}$ mét.",
      steps: [
        { claim: R`Trọng tâm có tọa độ $\left(\frac{0+6+0}{3};\frac{0+0+6}{3}\right)=(2;2)$.`, why: "Mỗi tọa độ là trung bình cộng của ba cột. Đơn vị mét được giữ cho cả hoành và tung." },
        { claim: R`Khoảng cách bằng $\sqrt{2^2+2^2}=2\sqrt{2}$ mét.`, why: "Độ dài vectơ từ gốc tới trọng tâm. Diễn giải: điểm cân bằng của ba cột cách cột $A$ đúng $2\\sqrt{2}$ mét." },
      ],
      checks: [
        { expr: "(0+6+0)/3", expect: "2" },
        { expr: "sqrt(2**2+2**2)", expect: "2*sqrt(2)" },
      ],
    },
    {
      kind: "thuc-te",
      sao: 3,
      prompt: R`Số liệu giả định. Một người đi $3$ mét theo vectơ đơn vị $(1;0)$, rồi $4$ mét theo vectơ đơn vị $(0;1)$. Quãng đường gấp khúc và độ dài đoạn thẳng từ điểm đầu đến điểm cuối bằng bao nhiêu mét?`,
      think: "Quãng gấp khúc là tổng hai độ dài. Đoạn thẳng cuối là độ dài của tổng hai vectơ độ dời $(3;0)$ và $(0;4)$.",
      answer: "Quãng đường gấp khúc là $7$ mét. Đoạn thẳng từ điểm đầu đến điểm cuối dài $5$ mét.",
      steps: [
        { claim: R`Quãng gấp khúc bằng $3+4=7$ mét.`, why: "Hai chặng được đi nối tiếp, nên cộng độ dài từng chặng. Đơn vị là mét." },
        { claim: R`Vectơ tổng là $(3;4)$ và dài $\sqrt{9+16}=5$ mét.`, why: "Đoạn thẳng nối đầu và cuối là độ dài tổng hai độ dời vuông góc. Diễn giải: đường thẳng ngắn hơn quãng đã bước." },
      ],
      checks: [
        { expr: "3+4", expect: "7" },
        { expr: "sqrt(9+16)", expect: "5" },
      ],
    },
    {
      kind: "mo",
      sao: 3,
      prompt: R`Với hai vectơ trong mặt phẳng, khi nào độ dài của tổng bằng tổng hai độ dài? Hãy nêu điều kiện và một ví dụ.`,
      think: R`Khai triển $|\vec u+\vec v|^2$ và so với $(|\vec u|+|\vec v|)^2$. Phần còn lại nằm ở tích vô hướng.`,
      answer: R`Đẳng thức xảy ra khi và chỉ khi hai vectơ cùng hướng, kể cả trường hợp một vectơ bằng $\vec 0$. Ví dụ $(1;0)$ và $(2;0)$ cho cả hai vế bằng $3$.`,
      steps: [
        { claim: R`Bình phương hai vế lệch nhau ở số hạng $2|\vec u||\vec v|-2\vec u\cdot\vec v$.`, why: "Khai triển cả hai bình phương. Hiệu này không âm và bằng $0$ khi tích vô hướng đạt giá trị lớn nhất." },
        { claim: R`Tích vô hướng đạt $|\vec u||\vec v|$ khi và chỉ khi hai vectơ cùng hướng.`, why: "Đó là điều kiện cần và đủ. Ví dụ hai vectơ nằm trên cùng một tia làm đẳng thức xảy ra." },
      ],
      checks: [{ expr: "sqrt((1+2)**2+0)", expect: "3" }],
    },
    {
      kind: "phan-bien",
      sao: 3,
      prompt: R`Với vận tốc thuyền đối với nước $(3;0)$ và vận tốc dòng $(0;4)$, bạn A cộng $3+4$ rồi nói tốc độ đối với bờ là $7$. Hãy phản biện.`,
      think: "Cộng độ dài chỉ đúng khi hai vận tốc cùng hướng. Hãy tính độ dài của tổng vectơ.",
      answer: "Tốc độ đối với bờ là $5$ kilômét mỗi giờ. Phép cộng $3+4$ không phải độ dài của tổng hai vectơ vuông góc.",
      steps: [
        { claim: R`Hai vận tốc có tích vô hướng bằng $0$, nên chúng vuông góc.`, why: "Tích $3\\cdot 0+0\\cdot 4$ bằng $0$. Điều kiện vuông góc là cần và đủ, và cả hai vectơ đều khác vectơ không." },
        { claim: R`Độ dài tổng bằng $\sqrt{3^2+4^2}=5$, không bằng $7$.`, why: "Độ dài tổng nhỏ hơn tổng độ dài khi hai vectơ không cùng hướng. Bạn A đã dùng điều kiện cùng hướng dù điều kiện đó sai." },
      ],
      checks: [{ expr: "sqrt(9+16)", expect: "5" }],
    },
    {
      kind: "doc",
      sao: 2,
      prompt: R`Trên mặt phẳng tọa độ, điểm $A$ ở $(1;3)$ và điểm $B$ ở $(5;7)$. Hãy đọc trung điểm của đoạn $AB$.`,
      think: "Đọc hai cặp tọa độ, rồi lấy trung bình cộng từng tọa độ.",
      answer: R`Trung điểm là $(3;5)$.`,
      steps: [
        { claim: R`Hai đầu mút đọc được là $A(1;3)$ và $B(5;7)$.`, why: "Hoành đứng trước, tung đứng sau. Đọc ngược thứ tự sẽ đổi điểm." },
        { claim: R`Trung điểm là $\left(\frac{1+5}{2};\frac{3+7}{2}\right)=(3;5)$.`, why: "Công thức trung điểm của đúng hai điểm đã đọc. Không chia cho $3$ vì đây chưa phải trọng tâm." },
      ],
      checks: [
        { expr: "(1+5)/2", expect: "3" },
        { expr: "(3+7)/2", expect: "5" },
      ],
    },
    {
      kind: "uoc-luong",
      sao: 2,
      prompt: R`Ước lượng độ dài vectơ $(2;3)$ bằng cách chặn $\sqrt{13}$ giữa hai số nguyên liên tiếp.`,
      think: "So sánh $13$ với các bình phương nguyên. Căn là hàm tăng trên các số không âm.",
      answer: R`Vì $9<13<16$ nên $3<\sqrt{13}<4$. Độ dài vectơ $(2;3)$ nằm giữa $3$ và $4$.`,
      steps: [
        { claim: R`Ta có $3^2=9$ và $4^2=16$.`, why: "Hai bình phương nguyên kề nhau bao quanh $13$. Phép so sánh này là chính xác, chưa làm tròn căn." },
        { claim: R`Vì hàm căn tăng trên $[0;+\infty)$, ta có $3<\sqrt{13}<4$.`, why: "Chặn bình phương kéo được sang căn. Độ dài vectơ bằng đúng $\\sqrt{13}$, nên nằm trong khoảng này." },
      ],
      checks: [
        { expr: "3**2", expect: "9" },
        { expr: "4**2", expect: "16" },
        { expr: "2**2+3**2", expect: "13" },
      ],
    },
    {
      kind: "tu-ra-de",
      sao: 4,
      prompt: R`Bài xuất phát: $(2;3)$ vuông góc với $(m;-2)$ khi $m=3$. Hãy đổi giả thiết bằng cách thay vectơ thứ hai bởi $(m;-4)$, dự đoán $m$ có đổi không, rồi giải.`,
      think: "Tích vô hướng mới là $2m-12$. Cho bằng $0$ và kiểm tra vectơ khác vectơ không.",
      answer: R`Dự đoán $m$ đổi. Điều kiện mới cho $m=6$, và vectơ $(6;-4)$ khác vectơ không.`,
      steps: [
        { claim: R`Đổi tung từ $-2$ sang $-4$ làm tích vô hướng thành $2m+3\cdot(-4)=2m-12$.`, why: "Chỉ số hạng chứa tung thứ hai thay đổi. Dự đoán nghiệm của phương trình mới khác $3$." },
        { claim: R`Phương trình $2m-12=0$ cho $m=6$.`, why: "Điều kiện cần và đủ của vuông góc. Vectơ $(6;-4)$ có tung khác $0$ nên được giữ." },
      ],
      checks: [{ expr: "2*6+3*(-4)", expect: "0" }],
    },
  ],
};
