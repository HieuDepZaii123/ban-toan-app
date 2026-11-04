import type { TopicDang } from "./types.ts";

const R = String.raw;

export const integralDang: TopicDang = {
  id: "integral",
  title: "Nguyên hàm và tích phân",
  dang: [
    {
      name: "Nguyên hàm cơ bản",
      nhanDang: "Bài hỏi một hàm có đạo hàm bằng hàm đã cho, thường kèm hằng số cộng.",
      phuongPhap: R`Một nguyên hàm của $f$ trên một khoảng là hàm $F$ thỏa $F'=f$ trên khoảng đó. Nếu $F$ là một nguyên hàm thì mọi nguyên hàm có dạng $F+C$ với $C$ hằng số, và đây là điều kiện cần và đủ trên một khoảng. Phải thử lại bằng cách đạo hàm. Công thức hay dùng là $\frac{x^{n+1}}{n+1}$ khi $n\neq -1$, $\ln|x|$ cho $\frac{1}{x}$ trên khoảng không chứa $0$, và $e^x$ cho chính nó.`,
      viDu: {
        prompt: R`Tìm họ nguyên hàm của $4x^3+e^x$ trên $\mathbb{R}$.`,
        steps: [
          { claim: R`Hàm $F(x)=x^4+e^x$ có đạo hàm $4x^3+e^x$.`, why: "Đạo hàm từng số hạng trả lại đúng hàm trong đề. Đây là phép thử lại điều kiện đủ." },
          { claim: R`Mọi nguyên hàm trên $\mathbb{R}$ là $x^4+e^x+C$ với $C$ hằng số.`, why: "Hai nguyên hàm trên một khoảng khác nhau bởi một hằng số. Tập số thực là một khoảng." },
        ],
        ket: R`Họ nguyên hàm là $x^4+e^x+C$.`,
        checks: [
          { expr: "simplify(diff(x**4+exp(x), x)-(4*x**3+exp(x)))", expect: "0" },
          { expr: "simplify(diff((x**4+exp(x)+5)-(x**4+exp(x)), x))", expect: "0" },
        ],
      },
      loi: "Quên hằng số, hoặc viết nguyên hàm của $e^x$ thành $\frac{e^x}{x}$.",
      luyen: {
        kind: "luyen",
        prompt: R`Tính $\int_1^e \frac{1}{x}\,dx$.`,
        think: R`Nguyên hàm của $\frac{1}{x}$ trên $(0;+\infty)$ là $\ln x$. Đoạn $[1;e]$ nằm trọn trong khoảng này, nên công thức Newton–Leibniz dùng được.`,
        answer: R`Đáp số là $1$.`,
        steps: [
          { claim: R`Trên $[1;e]$, hàm $\frac{1}{x}$ liên tục và một nguyên hàm là $\ln x$.`, why: R`Đoạn này không chứa $0$, nên $\ln|x|=\ln x$ và đạo hàm của nó là $\frac{1}{x}$.` },
          { claim: R`Ta có $\ln e-\ln 1=1-0=1$.`, why: "Newton–Leibniz trừ giá trị nguyên hàm ở cận trên cho cận dưới." },
        ],
        checks: [
          { expr: "integrate(1/x, (x, 1, E))", expect: "1" },
          { expr: "simplify(diff(log(x), x)-1/x)", expect: "0" },
        ],
      },
    },
    {
      name: "Tích phân của đa thức trên một đoạn",
      nhanDang: "Đề cho đa thức và hai cận, hỏi đúng một số.",
      phuongPhap: R`Tìm một nguyên hàm $F$, rồi tính $F(b)-F(a)$. Công thức Newton–Leibniz dùng được khi $f$ liên tục trên đoạn. Đó là điều kiện đủ thường gặp ở phổ thông. Đảo cận làm đổi dấu, nên phải giữ đúng thứ tự cận.`,
      viDu: {
        prompt: R`Tính $\int_0^2 (2x+1)\,dx$.`,
        steps: [
          { claim: R`Một nguyên hàm là $F(x)=x^2+x$.`, why: "Đạo hàm của $x^2+x$ trả lại $2x+1$. Phép thử này xác nhận nguyên hàm." },
          { claim: R`Ta có $F(2)-F(0)=6-0=6$.`, why: "Newton–Leibniz. Hàm đa thức liên tục trên $[0;2]$, nên công thức áp dụng được." },
        ],
        ket: "Tích phân bằng $6$.",
        checks: [
          { expr: "integrate(2*x+1, (x, 0, 2))", expect: "6" },
          { expr: "simplify(diff(x**2+x, x)-(2*x+1))", expect: "0" },
        ],
      },
      loi: "Quên trừ giá trị ở cận dưới, hoặc lấy nguyên hàm của $2x$ thành $x^2$ nhưng bỏ nguyên hàm của $1$.",
      luyen: {
        kind: "luyen",
        prompt: R`Tính $\int_0^1 (3x^2+2x)\,dx$.`,
        think: "Nguyên hàm của $3x^2$ là $x^3$, của $2x$ là $x^2$. Sau đó trừ theo hai cận.",
        answer: R`Đáp số là $2$.`,
        steps: [
          { claim: R`Nguyên hàm $F(x)=x^3+x^2$.`, why: "Đạo hàm từng số hạng trả lại $3x^2+2x$." },
          { claim: R`Ta có $F(1)-F(0)=2$.`, why: "Cận dưới cho $0$, nên kết quả bằng đúng $F(1)$. Đa thức liên tục trên đoạn." },
        ],
        checks: [{ expr: "integrate(3*x**2+2*x, (x, 0, 1))", expect: "2" }],
      },
    },
    {
      name: "Đổi biến",
      nhanDang: "Trong tích phân có một thừa số gần giống đạo hàm của biểu thức còn lại.",
      phuongPhap: R`Đặt $u=u(x)$ khả vi và đơn điệu trên đoạn đang xét, đổi $du=u'(x)\,dx$, rồi đổi cả hai cận theo $u$. Phép đổi là tương đương khi $u$ đơn điệu liên tục và $u'$ liên tục, vì khi đó có hàm ngược. Sau khi tính ở biến mới, nếu đề hỏi nguyên hàm thì phải trở lại biến cũ.`,
      viDu: {
        prompt: R`Tính $\int_0^1 \frac{2x}{x^2+1}\,dx$.`,
        steps: [
          { claim: R`Đặt $u=x^2+1$. Khi $x=0$ thì $u=1$, khi $x=1$ thì $u=2$, và $du=2x\,dx$.`, why: "Hàm $u$ tăng ngặt trên $[0;1]$ vì đạo hàm $2x$ không âm và chỉ bằng $0$ tại một điểm. Phép đổi cận là tương đương." },
          { claim: R`Tích phân trở thành $\int_1^2 \frac{1}{u}\,du=\ln 2-\ln 1=\ln 2$.`, why: R`Trên $[1;2]$, $u>0$ nên nguyên hàm là $\ln u$. Cận mới vẫn đúng thứ tự tăng.` },
        ],
        ket: R`Tích phân bằng $\ln 2$.`,
        checks: [
          { expr: "integrate(2*x/(x**2+1), (x, 0, 1))", expect: "log(2)" },
          { expr: "simplify(diff(log(x**2+1), x)-2*x/(x**2+1))", expect: "0" },
        ],
      },
      loi: "Đổi biến nhưng vẫn giữ cận cũ, hoặc quên nhân vi phân.",
      luyen: {
        kind: "luyen",
        prompt: R`Tìm một nguyên hàm của $2x(x^2+1)^3$.`,
        think: "Thừa số $2x$ là đạo hàm của $x^2+1$. Đặt $u=x^2+1$, tính nguyên hàm theo $u$, rồi trở lại $x$.",
        answer: R`Một nguyên hàm là $\frac{(x^2+1)^4}{4}$.`,
        steps: [
          { claim: R`Đặt $u=x^2+1$ thì $du=2x\,dx$, nên nguyên hàm là $\frac{u^4}{4}$.`, why: "Nguyên hàm của $u^3$ là $\frac{u^4}{4}$. Bước này còn ở biến mới." },
          { claim: R`Trở lại $x$ được $\frac{(x^2+1)^4}{4}$.`, why: "Đề hỏi nguyên hàm theo $x$. Đạo hàm của kết quả này trả lại hàm ban đầu." },
        ],
        checks: [{ expr: "simplify(diff((x**2+1)**4/4, x)-2*x*(x**2+1)**3)", expect: "0" }],
      },
    },
    {
      name: "Tích phân từng phần",
      nhanDang: "Tích của một đa thức bậc thấp với hàm mũ, lượng giác hoặc logarit.",
      phuongPhap: R`Công thức $\int u\,dv=uv-\int v\,du$ dùng khi $u'$ đơn giản hơn $u$ và $v$ tìm được. Với tích phân xác định phải gắn cận vào cả số hạng $uv$. Chọn $u$ là logarit hoặc đa thức, và $dv$ là phần còn lại, là một quy ước đủ cho các bài phổ thông này. Phải thử lại bằng cách đạo hàm vế phải nếu đề hỏi nguyên hàm.`,
      viDu: {
        prompt: R`Tính $\int_0^1 x e^x\,dx$.`,
        steps: [
          { claim: R`Đặt $u=x$, $dv=e^x\,dx$, thì $du=dx$ và $v=e^x$.`, why: "Đạo hàm của $u$ làm mất bậc đa thức, còn nguyên hàm của $e^x$ vẫn là $e^x$." },
          { claim: R`Ta có $\left[xe^x\right]_0^1-\int_0^1 e^x\,dx=e-(e-1)=1$.`, why: "Công thức từng phần trên đoạn. Giá trị $xe^x$ tại $0$ bằng $0$, và $e^x$ liên tục trên đoạn." },
        ],
        ket: "Tích phân bằng $1$.",
        checks: [{ expr: "integrate(x*exp(x), (x, 0, 1))", expect: "1" }],
      },
      loi: "Chọn $u=e^x$ làm phần lấy đạo hàm, nên bậc đa thức không giảm.",
      luyen: {
        kind: "luyen",
        prompt: R`Tính $\int_1^e \ln x\,dx$.`,
        think: R`Đặt $u=\ln x$ để đạo hàm ra $\frac{1}{x}$. Phần $dv$ là $dx$. Nhớ gắn cận vào số hạng $x\ln x$.`,
        answer: R`Đáp số là $1$.`,
        steps: [
          { claim: R`Đặt $u=\ln x$, $dv=dx$, thì $du=\frac{1}{x}\,dx$ và $v=x$.`, why: R`Trên $[1;e]$ logarit xác định vì đối số dương. Đạo hàm của $\ln x$ là $\frac{1}{x}$.` },
          { claim: R`Ta có $\left[x\ln x\right]_1^e-\int_1^e 1\,dx=e-(e-1)=1$.`, why: R`Tại cận $1$, tích $x\ln x$ bằng $0$. Phần còn lại là độ dài đoạn.` },
        ],
        checks: [{ expr: "integrate(log(x), (x, 1, E))", expect: "1" }],
      },
    },
    {
      name: "Tích phân hàm trị tuyệt đối",
      nhanDang: "Biểu thức trong dấu trị tuyệt đối đổi dấu bên trong đoạn lấy tích phân.",
      phuongPhap: R`Tìm nghiệm của biểu thức trong dấu trị tuyệt đối. Mỗi nghiệm nằm trong khoảng mở của đoạn là một điểm phải tách. Trên từng đoạn con, bỏ trị tuyệt đối theo dấu đã xác định, rồi cộng các tích phân. Bỏ trị tuyệt đối trên cả đoạn chỉ đúng khi đã chứng minh biểu thức không đổi dấu.`,
      viDu: {
        prompt: R`Tính $\int_{-1}^{2} |x|\,dx$.`,
        steps: [
          { claim: R`Biểu thức $x$ bằng $0$ tại $x=0$, và $0$ nằm trong $(-1;2)$.`, why: "Điểm này là chỗ phải tách. Hai đầu mút không thêm một điểm tách mới." },
          { claim: R`Trên $[-1;0]$ thì $|x|=-x$, trên $[0;2]$ thì $|x|=x$.`, why: "Dấu của $x$ đã xét đủ hai phía. Đây là điều kiện đủ để bỏ trị tuyệt đối trên từng đoạn con." },
          { claim: R`Ta có $\int_{-1}^{0}(-x)\,dx+\int_0^{2}x\,dx=\frac{1}{2}+2=\frac{5}{2}$.`, why: "Cộng hai tích phân đa thức liên tục. Nguyên hàm của $-x$ là $-\frac{x^2}{2}$, của $x$ là $\frac{x^2}{2}$." },
        ],
        ket: R`Tích phân bằng $\frac{5}{2}$.`,
        checks: [{ expr: "integrate(Abs(x), (x, -1, 2))", expect: "Rational(5,2)" }],
      },
      loi: "Viết $|x|=x$ trên cả đoạn có chứa cả số âm.",
      luyen: {
        kind: "luyen",
        prompt: R`Tính $\int_{-2}^{1} |x+1|\,dx$.`,
        think: "Giải $x+1=0$ được $x=-1$, nằm trong đoạn. Tách tại đó rồi xét dấu từng bên.",
        answer: R`Đáp số là $\frac{5}{2}$.`,
        steps: [
          { claim: R`Điểm $x=-1$ thuộc $(-2;1)$, nên phải tách đoạn.`, why: "Đây là nghiệm duy nhất của biểu thức trong dấu trị tuyệt đối." },
          { claim: R`Trên $[-2;-1]$ thì $|x+1|=-(x+1)$, trên $[-1;1]$ thì $|x+1|=x+1$.`, why: "Thừa số $x+1$ âm bên trái điểm $-1$ và dương bên phải." },
          { claim: R`Hai tích phân bằng $\frac{1}{2}$ và $2$, tổng bằng $\frac{5}{2}$.`, why: "Nguyên hàm của $-(x+1)$ và của $x+1$ đều là đa thức. Cộng hai kết quả đã tính theo cận." },
        ],
        checks: [{ expr: "integrate(Abs(x+1), (x, -2, 1))", expect: "Rational(5,2)" }],
      },
    },
    {
      name: "Diện tích giữa hai đồ thị",
      nhanDang: "Đề hỏi diện tích miền nằm giữa hai đường trên một đoạn.",
      phuongPhap: R`Diện tích là $\int_a^b |f-g|\,dx$. Trị tuyệt đối bắt buộc khi $f-g$ đổi dấu. Trước hết giải $f(x)=g(x)$ để tìm giao điểm. Mỗi giao điểm nằm trong khoảng mở của đoạn là một chỗ tách. Trên từng đoạn con, lấy hiệu theo đường nằm phía trên. Bỏ trị tuyệt đối trên cả đoạn chỉ là điều kiện đủ khi đã chứng minh hiệu không đổi dấu.`,
      viDu: {
        prompt: R`Tính diện tích giữa $y=x$ và $y=x^2$ trên $[0;2]$.`,
        steps: [
          { claim: R`Phương trình $x=x^2$ cho $x=0$ hoặc $x=1$. Trong $(0;2)$ điểm cần tách là $x=1$.`, why: "Giao điểm là nghiệm của hiệu bằng $0$. Điểm $0$ là đầu mút, điểm $1$ nằm trong khoảng mở." },
          { claim: R`Trên $[0;1]$, $x-x^2=x(1-x)\ge 0$. Trên $[1;2]$, $x^2-x=x(x-1)\ge 0$.`, why: "Xét dấu từng thừa số. Đường thẳng nằm trên parabol ở đoạn đầu, và parabol nằm trên đường thẳng ở đoạn sau." },
          { claim: R`Diện tích bằng $\int_0^1(x-x^2)\,dx+\int_1^2(x^2-x)\,dx=\frac{1}{6}+\frac{5}{6}=1$.`, why: "Mỗi tích phân là diện tích một mảnh. Cộng chúng vì diện tích không lấy dấu âm." },
        ],
        ket: "Diện tích bằng $1$.",
        checks: [
          { expr: "integrate(x-x**2, (x, 0, 1))+integrate(x**2-x, (x, 1, 2))", expect: "1" },
          { expr: "integrate(x-x**2, (x, 0, 2))", expect: "Rational(-2,3)" },
        ],
      },
      loi: "Lấy một hiệu trên cả đoạn khi hiệu đó đổi dấu, nên có thể ra số âm và gọi nhầm là diện tích.",
      luyen: {
        kind: "luyen",
        prompt: R`Tính diện tích miền nằm dưới parabol $y=2x-x^2$ và trên trục hoành, trên đoạn $[0;2]$.`,
        think: R`Hàm $2x-x^2=x(2-x)$ không âm trên $[0;2]$. Diện tích bằng tích phân này, không cần tách thêm.`,
        answer: R`Đáp số là $\frac{4}{3}$.`,
        steps: [
          { claim: R`Trên $[0;2]$, hai thừa số $x$ và $2-x$ đều không âm.`, why: "Hiệu không đổi dấu, nên bỏ trị tuyệt đối trên cả đoạn là hợp lệ." },
          { claim: R`Nguyên hàm $x^2-\frac{x^3}{3}$ tại $2$ bằng $4-\frac{8}{3}=\frac{4}{3}$, tại $0$ bằng $0$.`, why: "Newton–Leibniz trên đoạn hàm đa thức liên tục." },
        ],
        checks: [{ expr: "integrate(2*x-x**2, (x, 0, 2))", expect: "Rational(4,3)" }],
      },
    },
    {
      name: "Tính chất của tích phân",
      nhanDang: "Bài tách một tích phân thành hai đoạn kề, hoặc tách một tổng ra khỏi dấu tích phân.",
      phuongPhap: R`Nếu $f$ liên tục trên đoạn chứa $a$, $b$ và $c$ thì $\int_a^c f=\int_a^b f+\int_b^c f$. Đây là cộng tính, đúng cả khi $b$ nằm giữa $a$ và $c$. Nếu $f$ và $g$ liên tục thì $\int_a^b(\alpha f+\beta g)=\alpha\int_a^b f+\beta\int_a^b g$. Hai hằng số $\alpha$, $\beta$ kéo ra được vì đạo hàm tuyến tính. Phải giữ đúng cận khi áp dụng.`,
      viDu: {
        prompt: R`Tính $\int_0^2 x\,dx$ bằng cách tách tại $1$.`,
        steps: [
          { claim: R`Hàm $x$ liên tục trên $[0;2]$, nên $\int_0^2 x\,dx=\int_0^1 x\,dx+\int_1^2 x\,dx$.`, why: "Cộng tính áp dụng được vì điểm tách $1$ nằm trên đoạn và hàm liên tục." },
          { claim: R`Nguyên hàm $\frac{x^2}{2}$ cho $\frac{1}{2}$ trên đoạn đầu và $\frac{3}{2}$ trên đoạn sau.`, why: R`Tại $1$ được $\frac{1}{2}$, tại $2$ được $2$, hiệu $2-\frac{1}{2}=\frac{3}{2}$.` },
          { claim: R`Tổng bằng $\frac{1}{2}+\frac{3}{2}=2$.`, why: "Cộng hai phần. Kết quả trùng tích phân tính thẳng từ $0$ đến $2$." },
        ],
        ket: "Tích phân bằng $2$.",
        checks: [
          { expr: "integrate(x, (x, 0, 1))+integrate(x, (x, 1, 2))", expect: "2" },
          { expr: "integrate(x, (x, 0, 2))", expect: "2" },
        ],
      },
      loi: "Tách cận nhưng quên đổi cận của từng phần, nên cộng hai lần cùng một đoạn.",
      luyen: {
        kind: "luyen",
        prompt: R`Tính $\int_0^1(2x+3x^2)\,dx$ bằng cách tách tổng.`,
        think: R`Kéo hệ số ra khỏi từng tích phân. Tính $\int_0^1 x\,dx$ và $\int_0^1 x^2\,dx$ rồi nhân hệ số.`,
        answer: R`Đáp số là $2$.`,
        steps: [
          { claim: R`Vì $2x$ và $3x^2$ liên tục, tích phân bằng $2\int_0^1 x\,dx+3\int_0^1 x^2\,dx$.`, why: "Tính chất tuyến tính. Hệ số hằng số được đưa ra ngoài." },
          { claim: R`Hai tích phân nhỏ bằng $\frac{1}{2}$ và $\frac{1}{3}$, nên kết quả là $2\cdot\frac{1}{2}+3\cdot\frac{1}{3}=2$.`, why: "Nhân rồi cộng. Đây là cùng giá trị với cách tìm một nguyên hàm của cả tổng." },
        ],
        checks: [{ expr: "2*integrate(x, (x, 0, 1))+3*integrate(x**2, (x, 0, 1))", expect: "2" }],
      },
    },
    {
      name: "Nguyên hàm thỏa một giá trị ban đầu",
      nhanDang: "Biết đạo hàm và biết giá trị của nguyên hàm tại một điểm.",
      phuongPhap: R`Tìm họ $F(x)+C$, rồi thay điều kiện $F(x_0)+C=y_0$ để giải $C$. Điều kiện tại một điểm là cần và đủ để chọn đúng một nguyên hàm trong họ, vì trên một khoảng hai nguyên hàm chỉ khác một hằng số. Sau khi tìm $C$ phải thử lại cả đạo hàm lẫn giá trị tại $x_0$.`,
      viDu: {
        prompt: R`Tìm $F$ sao cho $F'(x)=2x$ và $F(1)=5$.`,
        steps: [
          { claim: R`Một họ nguyên hàm là $x^2+C$.`, why: "Đạo hàm của $x^2$ bằng $2x$. Hằng số $C$ chưa bị điều kiện ban đầu ràng buộc." },
          { claim: R`Điều kiện $F(1)=5$ cho $1+C=5$, nên $C=4$.`, why: "Thay đúng điểm $x_0=1$. Phương trình này xác định duy nhất $C$." },
          { claim: R`Vậy $F(x)=x^2+4$. Đạo hàm vẫn là $2x$ và $F(1)=5$.`, why: "Thử lại cả hai điều kiện. Hằng số không làm đổi đạo hàm." },
        ],
        ket: R`Hàm cần tìm là $F(x)=x^2+4$.`,
        checks: [
          { expr: "diff(x**2+4, x)", expect: "2*x" },
          { expr: "(1**2+4)", expect: "5" },
        ],
      },
      loi: "Lấy một nguyên hàm bất kỳ rồi bỏ qua giá trị $F(x_0)$.",
      luyen: {
        kind: "luyen",
        prompt: R`Tìm $F$ sao cho $F'(x)=3x^2$ và $F(0)=1$.`,
        think: "Họ nguyên hàm là $x^3+C$. Thay $x=0$ để tìm $C$, rồi thử lại đạo hàm.",
        answer: R`Đáp số là $F(x)=x^3+1$.`,
        steps: [
          { claim: R`Họ nguyên hàm là $x^3+C$, và $F(0)=C=1$.`, why: "Tại $0$, lũy thừa bậc ba bằng $0$, nên hằng số chính là giá trị đã cho." },
          { claim: R`Hàm $x^3+1$ có đạo hàm $3x^2$ và nhận giá trị $1$ tại $0$.`, why: "Thử lại đủ hai điều kiện của đề." },
        ],
        checks: [
          { expr: "diff(x**3+1, x)", expect: "3*x**2" },
          { expr: "(0**3+1)", expect: "1" },
        ],
      },
    },
    {
      name: "Thể tích vật thể tròn xoay",
      nhanDang: "Một miền phẳng quay quanh trục hoành, hỏi thể tích khối tạo thành.",
      phuongPhap: R`Khi miền dưới $y=R(x)\ge 0$ trên $[a;b]$ quay quanh trục hoành, thể tích là $\pi\int_a^b \bigl(R(x)\bigr)^2\,dx$. Điều kiện đủ để dùng công thức là $R$ liên tục trên đoạn. Bình phương bán kính phải đứng trong tích phân. Quên bình phương, hoặc quên hệ số $\pi$, cho một đại lượng khác thể tích.`,
      viDu: {
        prompt: R`Miền dưới $y=x$ trên $[0;1]$ quay quanh trục hoành. Thể tích khối bằng bao nhiêu?`,
        steps: [
          { claim: R`Hàm $y=x$ liên tục và không âm trên $[0;1]$.`, why: "Điều kiện đủ của công thức đĩa tròn được thỏa. Bán kính thiết diện tại hoành độ $x$ bằng $x$." },
          { claim: R`Thể tích là $\pi\int_0^1 x^2\,dx=\pi\left[\frac{x^3}{3}\right]_0^1=\frac{\pi}{3}$.`, why: "Bình phương bán kính là $x^2$. Nguyên hàm của $x^2$ là $\frac{x^3}{3}$." },
        ],
        ket: R`Thể tích bằng $\frac{\pi}{3}$.`,
        checks: [{ expr: "pi*integrate(x**2, (x, 0, 1))", expect: "pi/3" }],
      },
      loi: "Tích phân chính hàm $y$ mà không bình phương bán kính.",
      luyen: {
        kind: "luyen",
        prompt: R`Miền dưới $y=\sqrt{x}$ trên $[0;1]$ quay quanh trục hoành. Thể tích bằng bao nhiêu?`,
        think: R`Bán kính là $\sqrt{x}$, nên trong tích phân là chính $x$. Nhân với $\pi$ sau khi tính tích phân.`,
        answer: R`Đáp số là $\frac{\pi}{2}$.`,
        steps: [
          { claim: R`Trên $[0;1]$, $\sqrt{x}$ liên tục và không âm, bình phương bằng $x$.`, why: "Căn xác định trên đoạn này. Bình phương triệt căn." },
          { claim: R`Thể tích là $\pi\int_0^1 x\,dx=\pi\cdot\frac{1}{2}=\frac{\pi}{2}$.`, why: "Nguyên hàm của $x$ là $\frac{x^2}{2}$, hiệu hai cận bằng $\frac{1}{2}$." },
        ],
        checks: [{ expr: "pi*integrate(x, (x, 0, 1))", expect: "pi/2" }],
      },
    },
  ],
  sangTao: [
    {
      kind: "thuc-te",
      sao: 2,
      prompt: R`Số liệu giả định. Vận tốc một xe là $v(t)=6t$ mét mỗi giây trên $[0;3]$, với $t$ tính bằng giây. Quãng đường đi được bằng bao nhiêu?`,
      think: "Quãng đường theo một chiều là tích phân vận tốc. Phải xét dấu vận tốc trước khi bỏ trị tuyệt đối.",
      answer: "Đáp số là $27$ mét; trong $3$ giây xe đi về phía dương được $27$ mét.",
      steps: [
        { claim: R`Trên $[0;3]$, $v(t)=6t\ge 0$.`, why: "Vận tốc không âm, nên quãng đường bằng đúng tích phân vận tốc, không cần trị tuyệt đối." },
        { claim: R`Ta có $\int_0^3 6t\,dt=3t^2$ từ $0$ đến $3$ bằng $27$.`, why: "Nguyên hàm của $6t$ là $3t^2$. Đơn vị của kết quả là mét." },
      ],
      checks: [{ expr: "integrate(6*t, (t, 0, 3))", expect: "27" }],
    },
    {
      kind: "thuc-te",
      sao: 3,
      prompt: R`Số liệu giả định. Một mảnh vườn có biên trên là $y=4-x^2$ mét và biên dưới là trục hoành, từ $x=-2$ đến $x=2$, với $x$ tính bằng mét. Diện tích bằng bao nhiêu?`,
      think: "Parabol cắt trục hoành tại hai đầu đoạn. Phải chứng minh hàm không âm ở giữa rồi mới lấy tích phân.",
      answer: R`Đáp số là $\frac{32}{3}$ mét vuông; đó là diện tích mảnh vườn nằm trên trục hoành.`,
      steps: [
        { claim: R`Trên $[-2;2]$, $4-x^2\ge 0$.`, why: R`Hai nghiệm là $\pm 2$ và hệ số của $x^2$ âm, nên trong khoảng giữa hàm không âm.` },
        { claim: R`Ta có $\int_{-2}^{2}(4-x^2)\,dx=\frac{32}{3}$.`, why: "Hàm chẵn và liên tục. Diện tích mang đơn vị mét vuông." },
      ],
      checks: [{ expr: "integrate(4-x**2, (x, -2, 2))", expect: "Rational(32,3)" }],
    },
    {
      kind: "thuc-te",
      sao: 2,
      prompt: R`Số liệu giả định. Nước chảy vào bể với lưu lượng $2$ lít mỗi phút, đều trong $15$ phút. Thể tích nước vào bể bằng bao nhiêu?`,
      think: "Lưu lượng không đổi và dương. Thể tích là tích phân của hằng số, tức là tích lưu lượng với thời gian.",
      answer: "Đáp số là $30$ lít sau $15$ phút; bể nhận thêm đúng lượng nước đó.",
      steps: [
        { claim: R`Lưu lượng $r(t)=2$ dương trên $[0;15]$.`, why: "Không có chiều chảy ngược, nên thể tích bằng tích phân lưu lượng." },
        { claim: R`Ta có $\int_0^{15} 2\,dt=30$.`, why: "Nguyên hàm của hằng số $2$ là $2t$. Đơn vị là lít." },
      ],
      checks: [{ expr: "integrate(2, (t, 0, 15))", expect: "30" }],
    },
    {
      kind: "thuc-te",
      sao: 3,
      prompt: R`Số liệu giả định. Quay tam giác dưới đường $y=x$ mét, từ $x=0$ đến $x=1$, quanh trục hoành. Khối tạo thành là một khối nón bán kính $1$ mét và chiều cao $1$ mét. Thể tích bằng bao nhiêu?`,
      think: R`Bán kính thiết diện bằng $x$. Thể tích đĩa tròn lấy bình phương bán kính rồi nhân $\pi$. Một mét khối bằng $1000$ lít.`,
      answer: R`Đáp số là $\frac{\pi}{3}$ mét khối, khoảng $1047$ lít; đó là thể tích khối nón này.`,
      steps: [
        { claim: R`Hàm $y=x$ liên tục và không âm trên $[0;1]$.`, why: "Điều kiện đủ của công thức thể tích tròn xoay được thỏa." },
        { claim: R`Thể tích là $\pi\int_0^1 x^2\,dx=\frac{\pi}{3}$ mét khối.`, why: "Bình phương bán kính là $x^2$. Đây là công thức thể tích khối nón bán kính $1$ và chiều cao $1$." },
        { claim: R`Đổi đơn vị, $\frac{1000\pi}{3}$ lít làm tròn gần nhất thành $1047$ lít.`, why: "Một mét khối bằng $1000$ lít. Phần lẻ của thương này nhỏ hơn một nửa, nên làm tròn xuống $1047$." },
      ],
      checks: [{ expr: "pi*integrate(x**2, (x, 0, 1))", expect: "pi/3" }],
    },
    {
      kind: "mo",
      sao: 3,
      prompt: "Hãy nêu hai nguyên hàm khác nhau của $2x$ trên tập số thực, rồi chứng minh hiệu của chúng là một hằng số. Có nhiều cặp đúng.",
      think: "Mỗi nguyên hàm là $x^2$ cộng một hằng số tùy chọn. Hiệu hai lựa chọn phải có đạo hàm bằng $0$.",
      answer: R`Một cặp là $x^2$ và $x^2+5$. Hiệu bằng $5$, là hằng số.`,
      steps: [
        { claim: R`Đạo hàm của $x^2$ và của $x^2+5$ đều bằng $2x$.`, why: "Cả hai đều là nguyên hàm. Hằng số $5$ biến mất khi đạo hàm." },
        { claim: R`Hiệu $(x^2+5)-x^2$ bằng $5$ với mọi $x$.`, why: "Trên một khoảng, hai nguyên hàm khác nhau đúng bởi một hằng số. Phép trừ xác nhận hằng số này." },
      ],
      checks: [
        { expr: "simplify(diff(x**2+5, x)-diff(x**2, x))", expect: "0" },
        { expr: "(x**2+5)-x**2", expect: "5" },
      ],
    },
    {
      kind: "phan-bien",
      sao: 4,
      prompt: R`Bạn A nói diện tích giữa $y=2x$ và $y=x^2$ trên $[0;3]$ bằng $\int_0^3(2x-x^2)\,dx=0$. Hãy phản biện.`,
      think: "Diện tích không âm. Hãy xét dấu của $2x-x^2$ trên đoạn. Nếu hiệu đổi dấu thì tích phân có dấu chưa phải diện tích.",
      answer: R`Lập luận chưa đúng. Hiệu đổi dấu tại $x=2$, tích phân có dấu bằng $0$, còn diện tích bằng $\frac{8}{3}$.`,
      steps: [
        { claim: R`Giao điểm trong $(0;3)$ là $x=2$, và trên $(2;3)$ thì $2x-x^2<0$.`, why: "Bạn A lấy một hiệu trên cả đoạn trong khi hiệu đổi dấu. Điều kiện để bỏ trị tuyệt đối chưa được thỏa." },
        { claim: R`Tích phân có dấu bằng $0$, trong khi diện tích của hai mảnh là $\frac{4}{3}+\frac{4}{3}=\frac{8}{3}$.`, why: "Số $0$ là phần bù của hai mảnh trái dấu, không phải diện tích." },
      ],
      checks: [
        { expr: "integrate(2*x-x**2, (x, 0, 3))", expect: "0" },
        { expr: "integrate(2*x-x**2, (x, 0, 2))+integrate(x**2-2*x, (x, 2, 3))", expect: "Rational(8,3)" },
      ],
    },
    {
      kind: "doc",
      sao: 3,
      prompt: R`Bảng dấu của $2x-x^2$ trên $[0;3]$ ghi không âm trên $[0;2]$ và không dương trên $[2;3]$. Biết mỗi mảnh $\int_0^2(2x-x^2)\,dx$ và $\int_2^3(x^2-2x)\,dx$ đều bằng $\frac{4}{3}$. Hãy đọc diện tích giữa $y=2x$ và $y=x^2$, cùng với tích phân có dấu.`,
      think: "Diện tích cộng hai mảnh dương. Tích phân có dấu lấy hiệu theo đúng dấu đã ghi trên bảng.",
      answer: R`Diện tích bằng $\frac{8}{3}$. Tích phân có dấu bằng $\frac{4}{3}-\frac{4}{3}=0$.`,
      steps: [
        { claim: R`Hai mảnh diện tích đều bằng $\frac{4}{3}$, tổng bằng $\frac{8}{3}$.`, why: "Bảng dấu cho biết $y=2x$ nằm trên ở đoạn đầu và $y=x^2$ nằm trên ở đoạn sau. Diện tích cộng các phần dương." },
        { claim: R`Tích phân có dấu của $2x-x^2$ bằng $\frac{4}{3}$ cộng với $-\frac{4}{3}$.`, why: "Trên đoạn sau, $2x-x^2$ âm. Đổi dấu mảnh thứ hai thì được tích phân có dấu." },
      ],
      checks: [
        { expr: "Rational(4,3)+Rational(4,3)", expect: "Rational(8,3)" },
        { expr: "Rational(4,3)-Rational(4,3)", expect: "0" },
      ],
    },
    {
      kind: "uoc-luong",
      sao: 3,
      prompt: R`Trên $[0;1]$, có $x^3\le x^2\le x$. Dùng hai tích phân đã biết để ước lượng $\int_0^1 x^2\,dx$.`,
      think: "Tích phân bảo toàn thứ tự của hàm không âm. Cận dưới là tích phân của $x^3$, cận trên là tích phân của $x$.",
      answer: R`Ước lượng là đoạn $\left[\frac{1}{4};\frac{1}{2}\right]$. Giá trị đúng bằng $\frac{1}{3}$.`,
      steps: [
        { claim: R`Vì $x^3\le x^2\le x$ trên $[0;1]$, ta có $\int_0^1 x^3\,dx\le \int_0^1 x^2\,dx\le \int_0^1 x\,dx$.`, why: "Cả ba hàm liên tục. Tích phân trên một đoạn bảo toàn bất đẳng thức." },
        { claim: R`Hai đầu là $\frac{1}{4}$ và $\frac{1}{2}$.`, why: "Nguyên hàm của $x^3$ là $\frac{x^4}{4}$, của $x$ là $\frac{x^2}{2}$, tính từ $0$ đến $1$." },
        { claim: R`Giá trị đúng là $\frac{1}{3}$, nằm trong đoạn ước lượng.`, why: "Tính trực tiếp để kiểm lại khoảng vừa tìm." },
      ],
      checks: [
        { expr: "integrate(x**3, (x, 0, 1))", expect: "Rational(1,4)" },
        { expr: "integrate(x, (x, 0, 1))", expect: "Rational(1,2)" },
        { expr: "integrate(x**2, (x, 0, 1))", expect: "Rational(1,3)" },
      ],
    },
    {
      kind: "tu-ra-de",
      sao: 4,
      prompt: R`Bài xuất phát: diện tích giữa $y=x$ và $y=x^2$ trên $[0;1]$ bằng $\frac{1}{6}$, vì hiệu không đổi dấu. Hãy đổi giả thiết sang cặp $y=2x$ và $y=x^2$ trên $[0;3]$, dự đoán chỗ phải tách, rồi tính diện tích.`,
      think: "Dự đoán giao điểm trong khoảng mở trước khi tính. Với cặp mới, nghiệm dương của $x^2=2x$ là $x=2$, nằm trong $(0;3)$.",
      answer: R`Đề mới dùng $y=2x$ và $y=x^2$ trên $[0;3]$. Dự đoán phải tách tại $x=2$, và diện tích bằng $\frac{8}{3}$.`,
      steps: [
        { claim: R`Đổi cả hai đường và đoạn. Giao điểm trong $(0;3)$ là $x=2$, nên dự đoán phải tách.`, why: "Đề cũ không có giao điểm trong khoảng mở. Đề mới có, nên cách tính một hiệu trên cả đoạn không còn đủ." },
        { claim: R`Trên $[0;2]$ đường thẳng ở trên, trên $[2;3]$ parabol ở trên.`, why: "Xét dấu $x(2-x)$. Dự đoán được kiểm lại bằng dấu." },
        { claim: R`Diện tích bằng $\frac{4}{3}+\frac{4}{3}=\frac{8}{3}$.`, why: "Cộng hai mảnh sau khi đã biết đường nào nằm trên." },
      ],
      checks: [
        { expr: "integrate(2*x-x**2, (x, 0, 2))", expect: "Rational(4,3)" },
        { expr: "integrate(2*x-x**2, (x, 0, 2))+integrate(x**2-2*x, (x, 2, 3))", expect: "Rational(8,3)" },
      ],
    },
  ],
};
