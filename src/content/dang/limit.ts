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
          { claim: R`Với $x\neq 2$, $\frac{(x-2)(x+2)}{x-2}=x+2$.`, why: "Hiệu bình phương. Rút gọn hợp lệ đúng trên miền $x$ khác $2$, là miền dùng để lấy giới hạn." },
          { claim: R`Giới hạn bằng $4$.`, why: "Hàm $x+2$ trùng hàm cũ khi $x$ khác $2$ và liên tục tại $2$." },
        ],
        ket: "Giới hạn bằng $4$.",
        checks: [{ expr: "limit((x**2-4)/(x-2), x, 2)", expect: "4" }],
      },
      loi: "Thay $x=2$ vào biểu thức gốc và viết kết quả bằng $0$.",
      luyen: {
        kind: "luyen",
        prompt: R`Tính $\lim_{x\to 0}\frac{\sqrt{x+4}-2}{x}$.`,
        think: "Nhân liên hợp để tạo nhân tử $x$ ở tử, rồi rút với mẫu. Sau đó mới thay $x=0$ vào biểu thức đã rút.",
        answer: R`Đáp số là $\frac{1}{4}$.`,
        steps: [
          { claim: R`Nhân liên hợp, với $x\neq 0$, được $\frac{1}{\sqrt{x+4}+2}$.`, why: "Vì tích của hai thừa số liên hợp bằng $x$. Mẫu mới khác $0$ tại $x=0$." },
          { claim: R`Thay $x=0$ vào biểu thức đã rút được $\frac{1}{4}$.`, why: "Biểu thức mới liên tục tại $0$ và trùng hàm cũ khi $x$ khác $0$." },
        ],
        checks: [{ expr: "limit((sqrt(x+4)-2)/x, x, 0)", expect: "Rational(1,4)" }],
      },
    },
    {
      name: "Giới hạn khi x ra dương vô cực và ra âm vô cực",
      nhanDang: "Tử và mẫu là đa thức, hỏi riêng từng phía vô cực.",
      phuongPhap: R`Chia tử và mẫu cho lũy thừa cao nhất của $x$ ở mẫu. Nếu bậc tử và bậc mẫu bằng nhau, cả hai giới hạn khi $x$ ra dương vô cực và khi $x$ ra âm vô cực đều bằng tỉ số hai hệ số cao nhất. Hai phía phải được viết riêng. Nếu bậc tử lớn hơn bậc mẫu, hai phía có thể khác nhau về dấu, nên không gộp thành một câu. Nếu bậc tử nhỏ hơn, cả hai phía đều bằng $0$.`,
      viDu: {
        prompt: R`Tính $\lim_{x\to +\infty}\frac{2x^2+1}{x^2-3x}$ và $\lim_{x\to -\infty}\frac{2x^2+1}{x^2-3x}$.`,
        steps: [
          { claim: R`Bậc tử và bậc mẫu cùng bằng $2$.`, why: "Xếp đúng trường hợp trước khi chia. Tỉ số hai hệ số cao nhất là $2$." },
          { claim: R`Chia cho $x^2$ được $\frac{2+\frac{1}{x^2}}{1-\frac{3}{x}}$, khi $x\neq 0$.`, why: "Khi $x$ ra vô cực theo phía nào thì $x$ cũng khác $0$, nên phép chia tương đương với phân thức cũ." },
          { claim: R`Khi $x$ ra dương vô cực, các số hạng $\frac{1}{x}$ và $\frac{1}{x^2}$ tiến tới $0$, giới hạn bằng $2$.`, why: "Tử tiến tới $2$ và mẫu tiến tới $1$. Đây mới là một phía." },
          { claim: R`Khi $x$ ra âm vô cực, cùng các số hạng ấy vẫn tiến tới $0$, giới hạn cũng bằng $2$.`, why: "Bậc chẵn ở mẫu làm hai phía cùng dấu. Phải kiểm riêng, không suy từ phía dương sang phía âm nếu chưa nhìn bậc." },
        ],
        ket: "Cả hai giới hạn đều bằng $2$.",
        checks: [
          { expr: "limit((2*x**2+1)/(x**2-3*x), x, oo)", expect: "2" },
          { expr: "limit((2*x**2+1)/(x**2-3*x), x, -oo)", expect: "2" },
        ],
      },
      loi: "Viết một giới hạn tại vô cực rồi im phía còn lại, khi hai phía chưa chắc bằng nhau.",
      luyen: {
        kind: "luyen",
        prompt: R`Tính $\lim_{x\to +\infty}\frac{x+1}{x^2+1}$ và $\lim_{x\to -\infty}\frac{x+1}{x^2+1}$.`,
        think: "Bậc tử nhỏ hơn bậc mẫu. Chia cho $x^2$ rồi xét riêng từng phía. Cả hai phía phải về $0$.",
        answer: "Cả hai giới hạn đều bằng $0$.",
        steps: [
          { claim: R`Chia cho $x^2$ được $\frac{\frac{1}{x}+\frac{1}{x^2}}{1+\frac{1}{x^2}}$.`, why: "Bậc mẫu cao hơn. Mỗi số hạng có mẫu là lũy thừa dương của $x$ đều tiến tới $0$ ở cả hai phía." },
          { claim: R`Cả hai giới hạn bằng $0$.`, why: "Tử tiến tới $0$ và mẫu tiến tới $1$, dù $x$ ra dương vô cực hay âm vô cực." },
        ],
        checks: [
          { expr: "limit((x+1)/(x**2+1), x, oo)", expect: "0" },
          { expr: "limit((x+1)/(x**2+1), x, -oo)", expect: "0" },
        ],
      },
    },
    {
      name: "Giới hạn dãy số",
      nhanDang: "Chỉ số $n$ nguyên dương tiến ra vô cực, hỏi giới hạn của $u_n$.",
      phuongPhap: R`Với dãy hữu tỉ, chia tử và mẫu cho lũy thừa cao nhất của $n$. Giới hạn của dãy chỉ có một phía, vì $n$ tiến ra dương vô cực. Nếu $|q|<1$ thì $q^n$ tiến tới $0$. Điều kiện trị tuyệt đối nhỏ hơn $1$ là đủ cho kết luận này.`,
      viDu: {
        prompt: R`Tính $\lim_{n\to +\infty}\left(1-\frac{1}{n}\right)$.`,
        steps: [
          { claim: R`Dãy xác định với mọi $n$ nguyên dương, và $\frac{1}{n}$ tiến tới $0$.`, why: "Nghịch đảo của chỉ số ra dương vô cực thì tiến tới $0$." },
          { claim: R`Giới hạn bằng $1-0=1$.`, why: "Giới hạn của hiệu một hằng số với một dãy tiến tới $0$ bằng hằng số đó." },
        ],
        ket: "Giới hạn của dãy bằng $1$.",
        checks: [{ expr: "limit(1-1/n, n, oo)", expect: "1" }],
      },
      loi: "Thay $n$ bằng một số lớn rồi coi giá trị đó là giới hạn.",
      luyen: {
        kind: "luyen",
        prompt: R`Tính $\lim_{n\to +\infty}\frac{n}{n+1}$.`,
        think: "Chia tử và mẫu cho $n$. Dãy chỉ chạy ra dương vô cực.",
        answer: R`Đáp số là $1$.`,
        steps: [
          { claim: R`Với $n>0$, $\frac{n}{n+1}=\frac{1}{1+\frac{1}{n}}$.`, why: "Chia tử và mẫu cho $n$. Phép chia hợp lệ vì chỉ số nguyên dương khác $0$." },
          { claim: R`Khi $n$ ra dương vô cực, biểu thức tiến tới $\frac{1}{1+0}=1$.`, why: "Số hạng $\\frac{1}{n}$ tiến tới $0$. Mẫu tiến tới $1$, khác $0$." },
        ],
        checks: [{ expr: "limit(n/(n+1), n, oo)", expect: "1" }],
      },
    },
    {
      name: "Giới hạn một bên",
      nhanDang: "Đề viết $x$ tiến tới một điểm từ bên phải hoặc từ bên trái, hoặc hàm có trị tuyệt đối.",
      phuongPhap: R`Giới hạn bên phải và giới hạn bên trái là hai câu hỏi riêng. Hàm có giới hạn tại điểm khi và chỉ khi hai giới hạn một bên tồn tại, hữu hạn và bằng nhau. Với $\frac{x-a}{|x-a|}$, bên phải bằng $1$ và bên trái bằng $-1$, nên không có giới hạn hai bên.`,
      viDu: {
        prompt: R`Tính $\lim_{x\to 2^+}\frac{x-2}{|x-2|}$ và $\lim_{x\to 2^-}\frac{x-2}{|x-2|}$.`,
        steps: [
          { claim: R`Khi $x>2$, $|x-2|=x-2$, nên thương bằng $1$.`, why: "Bên phải điểm, biểu thức trong trị tuyệt đối dương. Rút gọn được vì $x$ khác $2$." },
          { claim: R`Khi $x<2$, $|x-2|=2-x=-(x-2)$, nên thương bằng $-1$.`, why: "Bên trái, trị tuyệt đối đảo dấu. Hai giới hạn một bên khác nhau." },
          { claim: R`Vì $1\neq -1$, không có giới hạn khi $x$ tiến tới $2$.`, why: "Điều kiện cần và đủ của giới hạn hai bên là hai giới hạn một bên bằng nhau. Ở đây điều kiện đó thất bại." },
        ],
        ket: "Giới hạn bên phải bằng $1$, giới hạn bên trái bằng $-1$, và không có giới hạn hai bên.",
        checks: [
          { expr: "limit((x-2)/Abs(x-2), x, 2, dir='+')", expect: "1" },
          { expr: "limit((x-2)/Abs(x-2), x, 2, dir='-')", expect: "-1" },
        ],
      },
      loi: "Thấy một bên bằng $1$ rồi kết luận giới hạn tại điểm bằng $1$.",
      luyen: {
        kind: "luyen",
        prompt: R`Tính $\lim_{x\to 0^+}\frac{|x|}{x}$.`,
        think: "Bên phải $0$, trị tuyệt đối của $x$ chính là $x$. Rút gọn trước khi kết luận.",
        answer: "Đáp số là $1$.",
        steps: [
          { claim: R`Khi $x>0$, thương $\frac{|x|}{x}$ bằng $1$.`, why: "Trị tuyệt đối không đổi dấu trên khoảng bên phải." },
          { claim: R`Giới hạn bên phải bằng $1$.`, why: "Hàm đã rút gọn là hằng số $1$ trên khoảng đang lấy giới hạn." },
        ],
        checks: [{ expr: "limit(Abs(x)/x, x, 0, dir='+')", expect: "1" }],
      },
    },
    {
      name: "Dạng vô cực trừ vô cực",
      nhanDang: "Hai đại lượng cùng ra vô cực và đang trừ nhau, thường là một căn trừ một đa thức.",
      phuongPhap: R`Dạng vô cực trừ vô cực chưa cho giá trị. Nhân liên hợp để tạo một thương mà tử không còn hiệu hai vô cực. Sau đó chia cho lũy thừa thích hợp và mới lấy giới hạn. Phải ghi rõ phía, vì căn $\sqrt{x^2}$ bằng $x$ khi $x$ dương và bằng $-x$ khi $x$ âm.`,
      viDu: {
        prompt: R`Tính $\lim_{x\to +\infty}\left(\sqrt{x^2+x}-x\right)$.`,
        steps: [
          { claim: R`Nhân liên hợp, với $x>0$, được $\frac{x}{\sqrt{x^2+x}+x}$.`, why: "Tử thành $(x^2+x)-x^2=x$. Mẫu là tổng hai số dương khi $x$ ra dương vô cực, nên khác $0$." },
          { claim: R`Chia tử và mẫu cho $x$ được $\frac{1}{\sqrt{1+\frac{1}{x}}+1}$.`, why: "Vì $x>0$, $\\sqrt{x^2}=x$. Phép chia tương đương trên phía đang xét." },
          { claim: R`Giới hạn bằng $\frac{1}{1+1}=\frac{1}{2}$.`, why: "Số hạng $\\frac{1}{x}$ tiến tới $0$. Mẫu tiến tới $2$, khác $0$." },
        ],
        ket: R`Giới hạn bằng $\frac{1}{2}$.`,
        checks: [{ expr: "limit(sqrt(x**2+x)-x, x, oo)", expect: "Rational(1,2)" }],
      },
      loi: "Viết vô cực trừ vô cực bằng $0$ mà chưa nhân liên hợp.",
      luyen: {
        kind: "luyen",
        prompt: R`Tính $\lim_{x\to +\infty}\left(\sqrt{x^2+2x}-x\right)$.`,
        think: "Cùng cách nhân liên hợp. Tử mới là $2x$, sau khi chia cho $x$ thì còn $2$ ở tử.",
        answer: R`Đáp số là $1$.`,
        steps: [
          { claim: R`Nhân liên hợp được $\frac{2x}{\sqrt{x^2+2x}+x}$ khi $x>0$.`, why: "Hiệu hai bình phương ở tử bằng $2x$. Mẫu dương trên phía dương vô cực." },
          { claim: R`Chia cho $x$ rồi lấy giới hạn được $\frac{2}{1+1}=1$.`, why: "Cùng lý do $\\sqrt{x^2}=x$ khi $x>0$. Mẫu tiến tới $2$." },
        ],
        checks: [{ expr: "limit(sqrt(x**2+2*x)-x, x, oo)", expect: "1" }],
      },
    },
    {
      name: "Hàm số liên tục",
      nhanDang: "Hỏi một hàm có liên tục tại một điểm hay không, nhất là khi công thức đổi tại điểm đó.",
      phuongPhap: R`Hàm liên tục tại $a$ khi $a$ thuộc tập xác định, giới hạn khi $x$ tiến tới $a$ tồn tại và bằng $f(a)$. Ba điều kiện này là cần và đủ. Nếu giới hạn tồn tại nhưng khác giá trị đã gán tại $a$, hàm không liên tục. Gán lại $f(a)$ bằng giới hạn thì thu được hàm liên tục.`,
      viDu: {
        prompt: R`Cho $f(x)=\frac{x^2-1}{x-1}$ khi $x\neq 1$, và $f(1)=2$. Hàm có liên tục tại $1$ không?`,
        steps: [
          { claim: R`Điểm $1$ thuộc tập xác định vì đã gán $f(1)=2$.`, why: "Điều kiện thứ nhất của liên tục là hàm phải có giá trị tại điểm." },
          { claim: R`Với $x\neq 1$, $f(x)=x+1$, nên giới hạn khi $x$ tiến tới $1$ bằng $2$.`, why: "Rút nhân tử $x-1$. Hàm $x+1$ liên tục, và trùng $f$ ngoài điểm $1$." },
          { claim: R`Vì giới hạn bằng $f(1)$, hàm liên tục tại $1$.`, why: "Đủ ba điều kiện. Nếu gán $f(1)$ bằng một số khác $2$ thì hàm gián đoạn." },
        ],
        ket: "Hàm liên tục tại $1$.",
        checks: [{ expr: "limit((x**2-1)/(x-1), x, 1)", expect: "2" }],
      },
      loi: "Thấy mẫu bằng $0$ tại một điểm của công thức cũ rồi kết luận gián đoạn, dù giá trị đã được gán lại đúng bằng giới hạn.",
      luyen: {
        kind: "luyen",
        prompt: R`Cho $g(x)=\frac{x^2-4}{x-2}$ khi $x\neq 2$, và $g(2)=0$. Hàm có liên tục tại $2$ không?`,
        think: "Tính giới hạn bằng cách rút nhân tử. So với giá trị đã gán. Khác nhau thì không liên tục.",
        answer: "Không liên tục tại $2$, vì giới hạn bằng $4$ trong khi $g(2)=0$.",
        steps: [
          { claim: R`Với $x\neq 2$, $g(x)=x+2$, nên giới hạn bằng $4$.`, why: "Rút gọn hợp lệ ngoài điểm $2$. Hàm $x+2$ liên tục tại $2$." },
          { claim: R`Giá trị $g(2)=0$ khác $4$.`, why: "Điều kiện giới hạn bằng giá trị hàm bị thất bại. Hàm không liên tục tại $2$." },
        ],
        checks: [{ expr: "limit((x**2-4)/(x-2), x, 2)", expect: "4" }],
      },
    },
  ],
  sangTao: [
    {
      kind: "thuc-te",
      sao: 3,
      prompt: R`Số liệu giả định. Nồng độ thuốc trong máu là $\frac{5t}{t+2}$ miligam trên lít, $t>0$ tính bằng giờ. Nồng độ tiến tới bao nhiêu khi thời gian ra dương vô cực, và có đạt mức đó không?`,
      think: "Bậc tử và mẫu bằng nhau. Viết giới hạn khi $t$ ra dương vô cực. Sau đó xét hiệu giữa mức giới hạn và nồng độ để biết có đạt hay không.",
      answer: "Nồng độ tiến tới $5$ miligam trên lít và không đạt mức đó với bất kỳ giờ $t>0$ nào.",
      steps: [
        { claim: R`Chia tử và mẫu cho $t$ được $\frac{5}{1+\frac{2}{t}}$.`, why: "Vì $t>0$ nên chia được. Đây là phía dương vô cực, không phải phía âm." },
        { claim: R`Giới hạn khi $t$ ra dương vô cực bằng $5$.`, why: "Số hạng $\\frac{2}{t}$ tiến tới $0$. Đơn vị là miligam trên lít." },
        { claim: R`Hiệu $5-\frac{5t}{t+2}=\frac{10}{t+2}>0$ với mọi $t>0$.`, why: "Nồng độ luôn nhỏ hơn $5$. Diễn giải: nồng độ tiến tới mức $5$ nhưng không đạt trong thời gian hữu hạn." },
      ],
      checks: [
        { expr: "limit(5*t/(t+2), t, oo)", expect: "5" },
        { expr: "simplify(5-5*t/(t+2)-10/(t+2))", expect: "0" },
      ],
    },
    {
      kind: "thuc-te",
      sao: 4,
      prompt: R`Số liệu giả định. Chi phí trung bình mỗi sản phẩm là $C(x)=\frac{2x+500}{x}$ nghìn đồng, với $x>0$ là số sản phẩm. Tính chi phí khi làm $100$ sản phẩm và khi làm $500$ sản phẩm. Khi sản lượng ra dương vô cực, chi phí tiến tới bao nhiêu, và có quyết định được mức dưới $2$ nghìn đồng mỗi sản phẩm hay không?`,
      think: R`Rút $C(x)=2+\frac{500}{x}$. Tính hai sản lượng cụ thể, rồi lấy giới hạn khi $x$ ra dương vô cực. So hiệu $C(x)-2$ để quyết định có xuống dưới $2$ nghìn đồng hay không.`,
      answer: "Làm $100$ sản phẩm thì chi phí là $7$ nghìn đồng mỗi sản phẩm, làm $500$ sản phẩm thì còn $3$ nghìn đồng. Chi phí tiến tới $2$ nghìn đồng nhưng luôn cao hơn $2$, nên không có sản lượng nào đưa chi phí xuống dưới $2$ nghìn đồng mỗi sản phẩm.",
      steps: [
        { claim: R`Với $x=100$, $C(100)=\frac{700}{100}=7$ nghìn đồng mỗi sản phẩm.`, why: "Thay đúng sản lượng. Đây là chi phí trung bình tại một mốc sản xuất, chưa phải giới hạn." },
        { claim: R`Với $x=500$, $C(500)=\frac{1500}{500}=3$ nghìn đồng mỗi sản phẩm.`, why: "Tăng sản lượng làm số hạng $\\frac{500}{x}$ nhỏ đi. Chi phí mỗi sản phẩm giảm từ $7$ xuống $3$ nghìn đồng." },
        { claim: R`Ta có $C(x)=2+\frac{500}{x}$, nên giới hạn khi $x$ ra dương vô cực bằng $2$, và $C(x)>2$ với mọi $x>0$.`, why: "Số $\\frac{500}{x}$ tiến tới $0$ nhưng vẫn dương. Quyết định: sản xuất càng nhiều thì chi phí mỗi sản phẩm càng tiến về $2$ nghìn đồng, và không bao giờ xuống dưới $2$." },
      ],
      checks: [
        { expr: "(2*100+500)/100", expect: "7" },
        { expr: "(2*500+500)/500", expect: "3" },
        { expr: "limit((2*x+500)/x, x, oo)", expect: "2" },
        { expr: "simplify((2*x+500)/x-2-500/x)", expect: "0" },
      ],
    },
    {
      kind: "thuc-te",
      sao: 3,
      prompt: R`Số liệu giả định. Cảm biến báo $\frac{s^2-1}{s-1}$ khi tín hiệu $s$ khác $1$. Hãy tính số báo khi $s=\frac{11}{10}$, rồi cho biết số báo tiến tới bao nhiêu khi $s$ tiến tới $1$.`,
      think: "Tại một tín hiệu cụ thể thì thay số, vì mẫu khác $0$. Khi tiến tới $1$ thì gặp dạng $\\frac{0}{0}$, phải rút nhân tử. So hai kết quả để diễn giải độ lệch.",
      answer: "Khi tín hiệu bằng $\\frac{11}{10}$, cảm biến báo $\\frac{21}{10}$ đơn vị. Khi tín hiệu tiến tới $1$, số báo tiến tới $2$ đơn vị, còn lệch $\\frac{1}{10}$ ở mốc vừa tính.",
      steps: [
        { claim: R`Tại $s=\frac{11}{10}$, mẫu khác $0$ và số báo bằng $\frac{\frac{121}{100}-1}{\frac{1}{10}}=\frac{21}{10}$.`, why: "Tín hiệu chưa bằng $1$ nên được thay trực tiếp. Đơn vị là đơn vị đo của cảm biến." },
        { claim: R`Khi $s$ tiến tới $1$, dạng là $\frac{0}{0}$. Với $s\neq 1$, thương bằng $s+1$.`, why: "Phân tích hiệu bình phương rồi rút nhân tử chung. Giới hạn không cần cảm biến có giá trị tại đúng $s=1$." },
        { claim: R`Giới hạn bằng $2$, và $\frac{21}{10}-2=\frac{1}{10}$.`, why: "Hàm $s+1$ liên tục tại $1$. Diễn giải: ở tín hiệu $1{,}1$, số báo còn cao hơn mức giới hạn đúng $\\frac{1}{10}$ đơn vị." },
      ],
      checks: [
        { expr: "((Rational(11,10))**2-1)/(Rational(11,10)-1)", expect: "Rational(21,10)" },
        { expr: "limit((s**2-1)/(s-1), s, 1)", expect: "2" },
        { expr: "Rational(21,10)-2", expect: "Rational(1,10)" },
      ],
    },
    {
      kind: "thuc-te",
      sao: 3,
      prompt: R`Số liệu giả định. Sau mỗi vòng, phần hao hụt còn lại bằng $\frac{9}{10}$ lần mức ngay trước đó. Ban đầu mức là $1$. Sau $2$ vòng còn bao nhiêu, và phần còn lại tiến tới bao nhiêu khi số vòng nguyên dương ra vô cực?`,
      think: "Số vòng là số nguyên dương, chỉ chạy ra dương vô cực. Tính giá trị sau hai vòng, rồi mới lấy giới hạn. Diễn giải phần còn lại có về đúng $0$ sau hữu hạn vòng hay không.",
      answer: "Sau $2$ vòng còn $\\frac{81}{100}$. Khi số vòng ra dương vô cực, phần còn lại tiến tới $0$, nhưng sau mỗi số vòng hữu hạn thì phần đó vẫn dương.",
      steps: [
        { claim: R`Sau $2$ vòng, phần còn lại bằng $\left(\frac{9}{10}\right)^2=\frac{81}{100}$.`, why: "Nhân hai lần hệ số $\\frac{9}{10}$. Đây là một số hạng của dãy, chưa phải giới hạn." },
        { claim: R`Vì $\left|\frac{9}{10}\right|<1$, giới hạn khi $n$ ra dương vô cực bằng $0$.`, why: "Số vòng là số nguyên dương. Trị tuyệt đối của công bội nhỏ hơn $1$ đủ để kết luận giới hạn này bằng $0$." },
        { claim: R`Với mọi $n$ nguyên dương, $\left(\frac{9}{10}\right)^n>0$.`, why: "Cơ số dương. Diễn giải: phần hao hụt còn lại trở nên nhỏ tùy ý nhưng không hết hẳn sau hữu hạn vòng." },
      ],
      checks: [
        { expr: "(Rational(9,10))**2", expect: "Rational(81,100)" },
        { expr: "limit((Rational(9,10))**n, n, oo)", expect: "0" },
      ],
    },
    {
      kind: "mo",
      sao: 3,
      prompt: R`Hãy nêu một hàm có giới hạn hữu hạn khi $x$ ra dương vô cực khác giới hạn khi $x$ ra âm vô cực. Có nhiều ví dụ đúng.`,
      think: "Hàm $\\frac{x}{\\sqrt{x^2}}$ bằng $1$ ở phía dương và bằng $-1$ ở phía âm, vì căn của $x^2$ lấy giá trị không âm.",
      answer: R`Một ví dụ là $\frac{x}{\sqrt{x^2}}$. Giới hạn phía dương bằng $1$, phía âm bằng $-1$.`,
      steps: [
        { claim: R`Khi $x>0$, $\sqrt{x^2}=x$, nên thương bằng $1$. Giới hạn phía dương bằng $1$.`, why: "Căn số học không âm. Phía dương phải tính riêng." },
        { claim: R`Khi $x<0$, $\sqrt{x^2}=-x$, nên thương bằng $-1$. Giới hạn phía âm bằng $-1$.`, why: "Hai giới hạn hữu hạn khác nhau. Không được gộp hai phía thành một kết quả." },
      ],
      checks: [
        { expr: "limit(x/sqrt(x**2), x, oo)", expect: "1" },
        { expr: "limit(x/sqrt(x**2), x, -oo)", expect: "-1" },
      ],
    },
    {
      kind: "phan-bien",
      sao: 3,
      prompt: R`Bạn A nói $\lim_{x\to 2}\frac{x-2}{|x-2|}=1$, vì bên phải điểm thương bằng $1$. Hãy phản biện.`,
      think: "Một giới hạn hai bên đòi hỏi hai giới hạn một bên bằng nhau. Hãy tính bên trái.",
      answer: "Lập luận chưa đúng. Giới hạn bên trái bằng $-1$, nên không có giới hạn khi $x$ tiến tới $2$.",
      steps: [
        { claim: R`Bên phải, thương bằng $1$. Phần này của bạn A đúng.`, why: "Khi $x>2$, trị tuyệt đối không đổi dấu." },
        { claim: R`Bên trái, thương bằng $-1$.`, why: "Khi $x<2$, trị tuyệt đối đảo dấu. Hai phía khác nhau nên không có giới hạn hai bên." },
      ],
      checks: [
        { expr: "limit((x-2)/Abs(x-2), x, 2, dir='+')", expect: "1" },
        { expr: "limit((x-2)/Abs(x-2), x, 2, dir='-')", expect: "-1" },
      ],
    },
    {
      kind: "doc",
      sao: 2,
      prompt: R`Bảng ghi ba giá trị của $u_n=1-\frac{1}{n}$: $u_1=0$, $u_2=\frac{1}{2}$, $u_4=\frac{3}{4}$. Hãy đọc chiều dãy và dự đoán giới hạn khi $n$ ra dương vô cực, rồi kiểm bằng giới hạn.`,
      think: "Ba mốc tăng chưa chứng minh cả dãy, nhưng gợi ý cận $1$. Giới hạn phải tính từ số hạng tổng quát.",
      answer: "Các mốc đang tăng và tiến gần $1$. Giới hạn của dãy bằng $1$.",
      steps: [
        { claim: R`Từ bảng, $0<\frac{1}{2}<\frac{3}{4}<1$.`, why: "Đọc ba ô. Bảng chưa đủ để kết luận mọi số hạng, nhưng cho thấy dãy đang áp sát $1$." },
        { claim: R`Giới hạn khi $n$ ra dương vô cực bằng $1$.`, why: "Số hạng tổng quát là $1-\\frac{1}{n}$. Phần $\\frac{1}{n}$ tiến tới $0$." },
      ],
      checks: [{ expr: "limit(1-1/n, n, oo)", expect: "1" }],
    },
    {
      kind: "uoc-luong",
      sao: 3,
      prompt: R`Ước lượng $\frac{2\cdot 100^2+1}{100^2-3\cdot 100}$ so với giới hạn $2$ của $\frac{2x^2+1}{x^2-3x}$ khi $x$ ra dương vô cực.`,
      think: "Thay $x=100$ vào phân thức đã chia. Hiệu với $2$ cho biết còn lệch bao nhiêu.",
      answer: R`Giá trị tại $100$ bằng $\frac{20001}{9700}$, lớn hơn $2$ một lượng $\frac{601}{9700}$.`,
      steps: [
        { claim: R`Thay $x=100$ được $\frac{20001}{9700}$.`, why: "Tử $2\\cdot 10000+1$, mẫu $10000-300$. Đây là một giá trị của hàm, chưa phải giới hạn." },
        { claim: R`Hiệu với $2$ bằng $\frac{20001}{9700}-2=\frac{601}{9700}$.`, why: "Lệch dương và nhỏ. Diễn giải: tại $x=100$, hàm đã gần giới hạn $2$ nhưng vẫn lớn hơn $2$." },
      ],
      checks: [
        { expr: "(2*100**2+1)/(100**2-3*100)", expect: "Rational(20001,9700)" },
        { expr: "(2*100**2+1)/(100**2-3*100)-2", expect: "Rational(601,9700)" },
        { expr: "limit((2*x**2+1)/(x**2-3*x), x, oo)", expect: "2" },
      ],
    },
    {
      kind: "tu-ra-de",
      sao: 4,
      prompt: R`Bài xuất phát: $\lim_{x\to 2}\frac{x^2-4}{x-2}=4$. Hãy đổi giả thiết bằng cách đổi điểm giới hạn thành một số khác, dự đoán giới hạn mới, rồi kiểm bằng cách rút nhân tử.`,
      think: "Dự đoán giới hạn bằng hai lần điểm mới, vì sau khi rút còn $x$ cộng điểm ấy. Đừng thay số vào dạng vô định.",
      answer: R`Một đề hợp lệ là $\lim_{x\to 5}\frac{x^2-25}{x-5}$. Dự đoán giới hạn bằng $10$, và kết quả đúng là $10$.`,
      steps: [
        { claim: R`Đổi điểm từ $2$ sang $5$, và đổi tử thành $x^2-25$.`, why: "Hiệu bình phương phải khớp điểm mới, nếu không sẽ không còn dạng $\\frac{0}{0}$." },
        { claim: R`Dự đoán sau khi rút còn $x+5$, nên giới hạn bằng $10$.`, why: "Cùng cơ chế với đề cũ, tổng hai thừa số tại điểm giới hạn." },
        { claim: R`Với $x\neq 5$, phân thức bằng $x+5$, giới hạn bằng $10$.`, why: "Rút gọn kiểm lại dự đoán. Hàm $x+5$ liên tục tại $5$." },
      ],
      checks: [{ expr: "limit((x**2-25)/(x-5), x, 5)", expect: "10" }],
    },
  ],
};
