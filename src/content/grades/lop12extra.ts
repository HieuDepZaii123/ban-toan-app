/** Lớp 12: hai chương bổ sung, nối tiếp khảo sát hàm số và tích phân. */
import type { GradeChapter } from "./types.ts";
import { bai, buoc, chuong, luyen, vd } from "./types.ts";

const R = String.raw;

export const lop12UngDung: GradeChapter = chuong("ung-dung-dh", "Bài toán thực tế và tham số với đạo hàm", [
  bai("toi-uu", "Bài toán tối ưu có lời văn",
    R`Bài toán tối ưu có lời văn gồm bốn bước: đặt ẩn $x$ và tìm miền xác định thật theo hình, viết đại lượng cần tối ưu thành hàm một biến, tìm điểm dừng trong miền, rồi so sánh với giá trị ở hai đầu miền. Cuối cùng trả lời đúng đại lượng được hỏi.`,
    [
      vd(R`Có $100$ m hàng rào để rào ba cạnh của một khu đất hình chữ nhật, cạnh còn lại là bức tường. Tìm diện tích lớn nhất của khu đất.`,
        [
          buoc(R`Gọi $x$ là độ dài mỗi cạnh vuông góc với tường. Cạnh song song với tường dài $100-2x$, với $0<x<50$.`, R`Ba cạnh rào dùng hết $100$ m, và mỗi cạnh phải dương nên $x$ nằm trong khoảng $(0;50)$.`),
          buoc(R`Diện tích là $S(x)=x(100-2x)$ và $S'(x)=100-4x=0$ khi $x=25$.`, R`Điểm $x=25$ thuộc khoảng $(0;50)$ nên được nhận làm điểm dừng.`),
          buoc(R`Giá trị $S(25)=25\cdot 50=1250$, còn ở hai đầu miền thì $S$ tiến tới $0$.`, R`Hai đầu miền cho diện tích bằng $0$, nhỏ hơn $1250$, nên $x=25$ cho giá trị lớn nhất.`),
        ],
        R`Diện tích lớn nhất của khu đất là $1250$ mét vuông.`,
        [{ expr: "solve(diff(x*(100-2*x), x), x)[0]", expect: "25" }, { expr: "25*(100-2*25)", expect: "1250" }],
      ),
      vd(R`Từ tấm tôn hình vuông cạnh $12$ dm, cắt bỏ bốn hình vuông cạnh $x$ ở bốn góc rồi gập thành hộp không nắp. Tìm thể tích lớn nhất của hộp.`,
        [
          buoc(R`Đáy hộp là hình vuông cạnh $12-2x$ và chiều cao là $x$, nên $V(x)=x(12-2x)^2$ với $0<x<6$.`, R`Cạnh đáy phải dương nên $12-2x>0$, tức là $x<6$.`),
          buoc(R`Ta có $V'(x)=(12-2x)(12-6x)=0$ khi $x=2$ hoặc $x=6$, và chỉ $x=2$ nằm trong miền.`, R`Đạo hàm của tích gồm hai số hạng, gộp lại được hai nhân tử như trên. Nghiệm $x=6$ ở đầu mút nên bị loại.`),
          buoc(R`Giá trị $V(2)=2\cdot 8^2=128$.`, R`Thể tích bằng $0$ khi $x$ tiến tới hai đầu miền, nên $128$ là giá trị lớn nhất.`),
        ],
        R`Thể tích lớn nhất của hộp là $128$ dm khối.`,
        [{ expr: "Min(*solve(diff(x*(12-2*x)**2, x), x))", expect: "2" }, { expr: "2*(12-2*2)**2", expect: "128" }],
      ),
    ],
    [
      luyen(R`Có $60$ m hàng rào để rào ba cạnh của khu đất hình chữ nhật dựa vào tường. Tìm diện tích lớn nhất.`, R`Diện tích lớn nhất là $450$ mét vuông.`, [{ expr: "15*(60-2*15)", expect: "450" }, { expr: "solve(diff(x*(60-2*x), x), x)[0]", expect: "15" }], R`Hàm $S(x)=x(60-2x)$ có điểm dừng $x=15$, và hai đầu miền cho diện tích bằng $0$.`),
      luyen(R`Tấm tôn hình vuông cạnh $18$ dm được làm thành hộp không nắp như trên. Tìm thể tích lớn nhất.`, R`Thể tích lớn nhất là $432$ dm khối.`, [{ expr: "3*(18-2*3)**2", expect: "432" }, { expr: "Min(*solve(diff(x*(18-2*x)**2, x), x))", expect: "3" }], R`Điểm dừng là $x=3$ và $V(3)=3\cdot 12^2=432$.`),
      luyen(R`Một hình chữ nhật có chu vi $40$ cm. Diện tích lớn nhất của nó bằng bao nhiêu?`, R`Diện tích lớn nhất là $100$ cm vuông, khi hai cạnh đều bằng $10$ cm.`, [{ expr: "10*(20-10)", expect: "100" }, { expr: "solve(diff(x*(20-x), x), x)[0]", expect: "10" }], R`Với một cạnh $x$ thì cạnh kia là $20-x$, và $S(x)=x(20-x)$ có điểm dừng $x=10$.`),
    ],
    { topicId: "survey" }),
  bai("tham-so-dd", "Tham số và tính đơn điệu",
    R`Hàm bậc ba đồng biến trên $\mathbb{R}$ khi $y'\ge 0$ với mọi $x$. Vì $y'$ là tam thức bậc hai, điều kiện là hệ số cao nhất dương và $\Delta'\le 0$. Với nghịch biến thì hệ số cao nhất âm và $\Delta'\le 0$. Giải điều kiện theo tham số, rồi đếm các số nguyên thỏa mãn.`,
    [
      vd(R`Tìm $m$ để hàm số $y=x^3+3x^2+mx+2$ đồng biến trên $\mathbb{R}$.`,
        [
          buoc(R`Ta có $y'=3x^2+6x+m$, hệ số cao nhất là $3>0$.`, R`Hàm đồng biến trên $\mathbb{R}$ khi đạo hàm không âm tại mọi $x$, và đạo hàm ở đây là một tam thức bậc hai.`),
          buoc(R`Cần $\Delta'=3^2-3m=9-3m\le 0$.`, R`Với hệ số cao nhất dương, tam thức không âm với mọi $x$ khi biệt thức thu gọn không dương.`),
          buoc(R`Giải ra được $m\ge 3$.`, R`Chia hai vế của $9-3m\le 0$ cho $-3$ thì đổi chiều bất đẳng thức, nên có $m\ge 3$.`),
        ],
        R`Hàm số đồng biến trên $\mathbb{R}$ khi $m\ge 3$.`,
        [{ expr: "solve(9-3*x, x)[0]", expect: "3" }, { expr: "3*(-1)**2+6*(-1)+3", expect: "0" }],
      ),
      vd(R`Có bao nhiêu số nguyên $m$ thuộc đoạn $[-5;10]$ để hàm số $y=x^3+3x^2+mx+2$ đồng biến trên $\mathbb{R}$?`,
        [
          buoc(R`Theo ví dụ trước, điều kiện là $m\ge 3$.`, R`Đề không đổi hàm số, nên điều kiện đồng biến trên $\mathbb{R}$ vẫn là $m\ge 3$.`),
          buoc(R`Các số nguyên thuộc $[-5;10]$ và không nhỏ hơn $3$ là $3$, $4$, $\dots$, $10$.`, R`Đoạn $[-5;10]$ có cả hai đầu mút, và $m=3$ cũng thỏa mãn vì dấu bằng được lấy.`),
          buoc(R`Có $10-3+1=8$ số nguyên như vậy.`, R`Số các số nguyên từ $3$ đến $10$ bằng hiệu hai đầu cộng một, vì cả hai đầu đều được đếm.`),
        ],
        R`Có $8$ giá trị nguyên của $m$.`,
        [{ expr: "10-3+1", expect: "8" }, { expr: "solve(9-3*x, x)[0]", expect: "3" }],
      ),
    ],
    [
      luyen(R`Tìm $m$ để hàm số $y=x^3-6x^2+mx$ đồng biến trên $\mathbb{R}$.`, R`Điều kiện là $m\ge 12$.`, [{ expr: "36-3*12", expect: "0" }, { expr: "solve(36-3*x, x)[0]", expect: "12" }], R`Đạo hàm $y'=3x^2-12x+m$ có $\Delta'=36-3m\le 0$, nên $m\ge 12$.`),
      luyen(R`Tìm $m$ để hàm số $y=-x^3+3x^2+mx+1$ nghịch biến trên $\mathbb{R}$.`, R`Điều kiện là $m\le -3$.`, [{ expr: "9+3*(-3)", expect: "0" }, { expr: "solve(9+3*x, x)[0]", expect: "-3" }], R`Đạo hàm $y'=-3x^2+6x+m$ có hệ số cao nhất âm và $\Delta'=9+3m\le 0$, nên $m\le -3$.`),
      luyen(R`Có bao nhiêu số nguyên $m$ thuộc đoạn $[0;20]$ để hàm số $y=x^3+6x^2+mx$ đồng biến trên $\mathbb{R}$?`, R`Có $9$ giá trị nguyên của $m$.`, [{ expr: "20-12+1", expect: "9" }, { expr: "solve(36-3*x, x)[0]", expect: "12" }], R`Điều kiện là $36-3m\le 0$, tức $m\ge 12$, và các số nguyên từ $12$ đến $20$ là $9$ số.`),
    ],
    { topicId: "survey" }),
  bai("boi-cuc-tri", "Bội của nghiệm và số điểm cực trị",
    R`Nếu $f'(x)=(x-a)^k g(x)$ với $g(a)\ne 0$ thì $f'$ đổi dấu tại $a$ khi và chỉ khi $k$ lẻ. Vì vậy số điểm cực trị của $f$ bằng số nghiệm bội lẻ của $f'(x)=0$, còn nghiệm bội chẵn không cho cực trị.`,
    [
      vd(R`Hàm số $f$ có $f'(x)=(x-1)^2(x+2)(x-3)$. Hàm số có bao nhiêu điểm cực trị?`,
        [
          buoc(R`Các nghiệm của $f'(x)=0$ là $1$ (bội $2$), $-2$ (bội $1$) và $3$ (bội $1$).`, R`Số mũ của mỗi thừa số cho biết bội của nghiệm tương ứng.`),
          buoc(R`Nghiệm $1$ có bội chẵn nên $f'$ không đổi dấu tại đó.`, R`Bình phương không âm nên $(x-1)^2$ không đổi dấu khi đi qua $1$, còn các thừa số khác giữ nguyên dấu gần $1$.`),
          buoc(R`Nghiệm $-2$ và $3$ có bội lẻ nên $f'$ đổi dấu, và có hai điểm cực trị.`, R`Mỗi nghiệm bội lẻ cho đúng một điểm cực trị của hàm số $f$.`),
        ],
        R`Hàm số có $2$ điểm cực trị.`,
        [{ expr: "Mod(2,2)+Mod(1,2)+Mod(1,2)", expect: "2" }, { expr: "Mod(2,2)", expect: "0" }],
      ),
      vd(R`Hàm số $f$ có $f'(x)=x^3(x-2)^4$. Hàm số có bao nhiêu điểm cực trị?`,
        [
          buoc(R`Nghiệm $0$ có bội $3$ và nghiệm $2$ có bội $4$.`, R`Số mũ $3$ của $x$ và số mũ $4$ của $x-2$ chính là các bội.`),
          buoc(R`Bội $3$ là số lẻ nên $f'$ đổi dấu tại $0$, còn bội $4$ là số chẵn nên $f'$ không đổi dấu tại $2$.`, R`Lũy thừa bậc ba giữ dấu của $x$, còn lũy thừa bậc bốn của $x-2$ luôn không âm.`),
        ],
        R`Hàm số có $1$ điểm cực trị, tại $x=0$.`,
        [{ expr: "Mod(3,2)+Mod(4,2)", expect: "1" }, { expr: "Mod(4,2)", expect: "0" }],
      ),
    ],
    [
      luyen(R`Hàm số $f$ có $f'(x)=(x+1)(x-1)^2(x-2)^3$. Hàm số có bao nhiêu điểm cực trị?`, R`Có $2$ điểm cực trị.`, [{ expr: "Mod(1,2)+Mod(2,2)+Mod(3,2)", expect: "2" }], R`Các bội là $1$, $2$ và $3$, trong đó hai nghiệm bội lẻ là $-1$ và $2$.`),
      luyen(R`Hàm số $f$ có $f'(x)=x^2(x^2-4)$. Hàm số có bao nhiêu điểm cực trị?`, R`Có $2$ điểm cực trị.`, [{ expr: "Mod(2,2)+Mod(1,2)+Mod(1,2)", expect: "2" }, { expr: "expand(x**2*(x-2)*(x+2))", expect: "x**4-4*x**2" }], R`Phân tích $f'(x)=x^2(x-2)(x+2)$ thì nghiệm $0$ bội chẵn bị loại, còn $2$ và $-2$ có bội $1$.`),
      luyen(R`Hàm số $f$ có $f'(x)=x(x-1)(x-2)(x-3)^2$. Hàm số có bao nhiêu điểm cực trị?`, R`Có $3$ điểm cực trị.`, [{ expr: "1+1+1+Mod(2,2)", expect: "3" }], R`Ba nghiệm $0$, $1$, $2$ có bội $1$ nên đổi dấu, còn nghiệm $3$ có bội $2$ nên bị loại.`),
    ],
    { topicId: "survey" }),
]);

export const lop12KyThuat: GradeChapter = chuong("ky-thuat-tp", "Kĩ thuật tính tích phân và chuyển động", [
  bai("doi-bien-tp", "Tích phân đổi biến số",
    R`Khi biểu thức dưới dấu tích phân có dạng $f(g(x))\cdot g'(x)$, đặt $t=g(x)$ thì $dt=g'(x)\,dx$ và tích phân trở thành $\int f(t)\,dt$. Đổi biến thì phải đổi cả hai cận: cận mới là $g(a)$ và $g(b)$.`,
    [
      vd(R`Tính $\displaystyle\int_0^1 2x\,e^{x^2}\,dx$.`,
        [
          buoc(R`Đặt $t=x^2$, khi đó $dt=2x\,dx$.`, R`Phần $2x\,dx$ trong biểu thức chính là $dt$, nên đổi biến loại bỏ hoàn toàn $x$.`),
          buoc(R`Đổi cận: $x=0$ thì $t=0$, và $x=1$ thì $t=1$.`, R`Cận phải đi theo biến mới, tính bằng $t=x^2$ tại hai đầu mút.`),
          buoc(R`Tích phân thành $\displaystyle\int_0^1 e^t\,dt=e^t\Big|_0^1=e-1$.`, R`Nguyên hàm của $e^t$ là chính nó, rồi lấy giá trị tại cận trên trừ giá trị tại cận dưới.`),
        ],
        R`Giá trị của tích phân là $e-1$.`,
        [{ expr: "integrate(2*x*exp(x**2),(x,0,1))", expect: "E-1" }, { expr: "diff(exp(x**2),x)", expect: "2*x*exp(x**2)" }],
      ),
      vd(R`Tính $\displaystyle\int_0^{\frac{\pi}{2}}\sin x\cos x\,dx$.`,
        [
          buoc(R`Đặt $t=\sin x$, khi đó $dt=\cos x\,dx$.`, R`Đạo hàm của $\sin x$ là $\cos x$, đúng bằng thừa số còn lại trong biểu thức.`),
          buoc(R`Đổi cận: $x=0$ thì $t=0$, và $x=\frac{\pi}{2}$ thì $t=1$.`, R`Tính $\sin 0=0$ và $\sin\frac{\pi}{2}=1$ để có cận mới.`),
          buoc(R`Tích phân thành $\displaystyle\int_0^1 t\,dt=\frac{t^2}{2}\Big|_0^1=\frac{1}{2}$.`, R`Nguyên hàm của $t$ là $\frac{t^2}{2}$, rồi thay hai cận mới.`),
        ],
        R`Giá trị của tích phân là $\frac{1}{2}$.`,
        [{ expr: "integrate(sin(x)*cos(x),(x,0,pi/2))", expect: "Rational(1,2)" }],
      ),
    ],
    [
      luyen(R`Tính $\displaystyle\int_0^2 (2x+1)^3\,dx$ bằng cách đặt $t=2x+1$.`, R`Giá trị bằng $78$.`, [{ expr: "integrate((2*x+1)**3,(x,0,2))", expect: "78" }], R`Với $t=2x+1$ thì $dt=2\,dx$, cận từ $1$ đến $5$, và $\frac{1}{2}\cdot\frac{5^4-1}{4}=78$.`),
      luyen(R`Tính $\displaystyle\int_0^1 x(x^2+1)^2\,dx$.`, R`Giá trị bằng $\frac{7}{6}$.`, [{ expr: "integrate(x*(x**2+1)**2,(x,0,1))", expect: "Rational(7,6)" }], R`Đặt $t=x^2+1$ thì $x\,dx=\frac{1}{2}dt$, cận từ $1$ đến $2$, và $\frac{1}{2}\cdot\frac{2^3-1}{3}=\frac{7}{6}$.`),
      luyen(R`Tính $\displaystyle\int_0^{\frac{\pi}{2}}\cos x\,e^{\sin x}\,dx$.`, R`Giá trị bằng $e-1$.`, [{ expr: "integrate(cos(x)*exp(sin(x)),(x,0,pi/2))", expect: "E-1" }], R`Đặt $t=\sin x$ thì $dt=\cos x\,dx$, cận từ $0$ đến $1$, và $\int_0^1 e^t\,dt=e-1$.`),
    ],
    { topicId: "integral" }),
  bai("tung-phan-bai", "Tích phân từng phần",
    R`Khi biểu thức dưới dấu tích phân là tích của hai loại hàm khác nhau, dùng công thức $\int_a^b u\,dv=uv\Big|_a^b-\int_a^b v\,du$. Chọn $u$ là phần trở nên đơn giản hơn khi lấy đạo hàm, và $dv$ là phần có nguyên hàm dễ tính.`,
    [
      vd(R`Tính $\displaystyle\int_0^1 x\,e^x\,dx$.`,
        [
          buoc(R`Chọn $u=x$ và $dv=e^x\,dx$, nên $du=dx$ và $v=e^x$.`, R`Đạo hàm của $x$ chỉ còn $1$, còn nguyên hàm của $e^x$ vẫn là $e^x$.`),
          buoc(R`Áp dụng công thức: $\displaystyle xe^x\Big|_0^1-\int_0^1 e^x\,dx$.`, R`Thay $u$, $v$, $du$ vào $uv\Big|_a^b-\int_a^b v\,du$ với $a=0$ và $b=1$.`),
          buoc(R`Tính được $e-(e-1)=1$.`, R`Giá trị $xe^x\Big|_0^1$ bằng $e$ và $\int_0^1 e^x\,dx=e-1$.`),
        ],
        R`Giá trị của tích phân là $1$.`,
        [{ expr: "integrate(x*exp(x),(x,0,1))", expect: "1" }, { expr: "E-(E-1)", expect: "1" }],
      ),
      vd(R`Tính $\displaystyle\int_0^{\pi}x\sin x\,dx$.`,
        [
          buoc(R`Chọn $u=x$ và $dv=\sin x\,dx$, nên $du=dx$ và $v=-\cos x$.`, R`Nguyên hàm của $\sin x$ là $-\cos x$, và $x$ trở thành $1$ khi lấy đạo hàm.`),
          buoc(R`Ta có $\displaystyle -x\cos x\Big|_0^{\pi}+\int_0^{\pi}\cos x\,dx$.`, R`Công thức $uv\Big|_a^b-\int_a^b v\,du$ với $v=-\cos x$ biến dấu trừ thành dấu cộng.`),
          buoc(R`Tính được $\pi+\sin x\Big|_0^{\pi}=\pi+0=\pi$.`, R`Giá trị $-x\cos x\Big|_0^{\pi}$ bằng $-\pi\cdot(-1)-0=\pi$, còn $\sin\pi-\sin 0=0$.`),
        ],
        R`Giá trị của tích phân là $\pi$.`,
        [{ expr: "integrate(x*sin(x),(x,0,pi))", expect: "pi" }],
      ),
    ],
    [
      luyen(R`Tính $\displaystyle\int_0^{\frac{\pi}{2}}x\cos x\,dx$.`, R`Giá trị bằng $\frac{\pi}{2}-1$.`, [{ expr: "integrate(x*cos(x),(x,0,pi/2))", expect: "pi/2-1" }], R`Chọn $u=x$ và $dv=\cos x\,dx$ thì có $x\sin x\Big|_0^{\frac{\pi}{2}}-\int_0^{\frac{\pi}{2}}\sin x\,dx=\frac{\pi}{2}-1$.`),
      luyen(R`Tính $\displaystyle\int_1^e \ln x\,dx$.`, R`Giá trị bằng $1$.`, [{ expr: "integrate(log(x),(x,1,E))", expect: "1" }, { expr: "E-(E-1)", expect: "1" }], R`Chọn $u=\ln x$ và $dv=dx$ thì có $x\ln x\Big|_1^e-\int_1^e dx=e-(e-1)=1$.`),
      luyen(R`Tính $\displaystyle\int_0^1 x^2 e^x\,dx$.`, R`Giá trị bằng $e-2$.`, [{ expr: "integrate(x**2*exp(x),(x,0,1))", expect: "E-2" }], R`Áp dụng từng phần hai lần: $x^2e^x\Big|_0^1-2\int_0^1 xe^x\,dx=e-2\cdot 1$.`),
    ],
    { topicId: "integral" }),
  bai("van-toc-qd", "Vận tốc và quãng đường",
    R`Nếu vật chuyển động thẳng với vận tốc $v(t)$ thì quãng đường đi được từ thời điểm $t_1$ đến $t_2$ là $\int_{t_1}^{t_2}|v(t)|\,dt$. Khi $v(t)\ge 0$ trên đoạn đó, có thể bỏ dấu giá trị tuyệt đối. Vật dừng lại khi $v(t)=0$.`,
    [
      vd(R`Một vật chuyển động với vận tốc $v(t)=6t-t^2$ (m/s). Tính quãng đường vật đi được trong $3$ giây đầu.`,
        [
          buoc(R`Trên $[0;3]$ ta có $v(t)=t(6-t)\ge 0$.`, R`Cả hai thừa số $t$ và $6-t$ không âm khi $t$ thuộc đoạn này, nên vật không đổi chiều.`),
          buoc(R`Quãng đường là $\displaystyle\int_0^3(6t-t^2)\,dt=\left(3t^2-\frac{t^3}{3}\right)\Big|_0^3$.`, R`Nguyên hàm của $6t$ là $3t^2$ và nguyên hàm của $t^2$ là $\frac{t^3}{3}$.`),
          buoc(R`Giá trị bằng $27-9=18$.`, R`Thay $t=3$ vào nguyên hàm được $3\cdot 9-\frac{27}{3}$, còn tại $t=0$ thì bằng $0$.`),
        ],
        R`Vật đi được $18$ mét.`,
        [{ expr: "integrate(6*x-x**2,(x,0,3))", expect: "18" }, { expr: "3*3**2-3**3/3", expect: "18" }],
      ),
      vd(R`Một ô tô chạy với vận tốc $20$ m/s thì phanh, chuyển động với vận tốc $v(t)=20-4t$ (m/s). Tính quãng đường từ lúc phanh đến khi dừng.`,
        [
          buoc(R`Xe dừng khi $v(t)=0$, tức là $t=5$ giây.`, R`Giải $20-4t=0$ cho $t=5$, đây là cận trên của tích phân.`),
          buoc(R`Quãng đường là $\displaystyle\int_0^5(20-4t)\,dt=(20t-2t^2)\Big|_0^5$.`, R`Trên $[0;5]$ vận tốc không âm, nên không cần dấu giá trị tuyệt đối.`),
          buoc(R`Giá trị bằng $100-50=50$.`, R`Thay $t=5$ vào nguyên hàm $20t-2t^2$.`),
        ],
        R`Ô tô đi thêm $50$ mét trước khi dừng.`,
        [{ expr: "solve(20-4*x, x)[0]", expect: "5" }, { expr: "integrate(20-4*x,(x,0,5))", expect: "50" }],
      ),
    ],
    [
      luyen(R`Một vật có vận tốc $v(t)=3t^2$ (m/s). Tính quãng đường vật đi được trong $2$ giây đầu.`, R`Vật đi được $8$ mét.`, [{ expr: "integrate(3*x**2,(x,0,2))", expect: "8" }], R`Nguyên hàm của $3t^2$ là $t^3$ nên quãng đường là $2^3-0^3=8$.`),
      luyen(R`Ô tô có vận tốc $v(t)=12-2t$ (m/s) kể từ lúc phanh. Tính quãng đường đi được đến khi dừng.`, R`Ô tô đi được $36$ mét.`, [{ expr: "integrate(12-2*x,(x,0,6))", expect: "36" }, { expr: "solve(12-2*x, x)[0]", expect: "6" }], R`Xe dừng khi $t=6$ và $\int_0^6(12-2t)\,dt=(12t-t^2)\Big|_0^6=36$.`),
      luyen(R`Một vật có vận tốc $v(t)=t^2-4t$ (m/s). Tính quãng đường vật đi được từ $t=0$ đến $t=4$.`, R`Vật đi được $\frac{32}{3}$ mét.`, [{ expr: "integrate(4*x-x**2,(x,0,4))", expect: "Rational(32,3)" }], R`Trên $[0;4]$ ta có $v(t)\le 0$ nên quãng đường là $\int_0^4(4t-t^2)\,dt=32-\frac{64}{3}=\frac{32}{3}$.`),
    ],
    { topicId: "integral" }),
]);
