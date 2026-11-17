import type { TopicKnowledge } from "./types.ts";

const R = String.raw;

export const integralKnowledge: TopicKnowledge = {
  id: "integral",
  tongQuat: {
    la: R`Tích phân xác định $\int_a^b f(x)\,dx$ là diện tích có dấu giữa đồ thị $y=f(x)$ và trục hoành trên đoạn $[a;b]$: phần phía trên trục tính dương, phần phía dưới tính âm. Nguyên hàm là phép toán ngược của đạo hàm, và định lí cơ bản nối hai khái niệm: $\int_a^b f=F(b)-F(a)$.`,
    dungDe: R`Tính diện tích hình phẳng, thể tích khối tròn xoay, quãng đường từ vận tốc, lượng tích lũy từ tốc độ thay đổi, và giá trị trung bình của một hàm. Trong bài thi, chuyên đề cho bài nguyên hàm cơ bản, đổi biến, từng phần, diện tích giữa hai đường, và thể tích.`,
    lienHe: R`Nguyên hàm là phép ngược của đạo hàm, nên bảng đạo hàm đọc ngược lại là bảng nguyên hàm. Tích phân xác định là giới hạn của tổng diện tích các hình chữ nhật, nối với chuyên đề Giới hạn. Phần diện tích giữa hai đồ thị cần giải phương trình hoành độ giao điểm.`,
  },
  tuDau: [
    R`Muốn tính diện tích một mảnh vườn hình chữ nhật thì nhân dài với rộng. Nhưng nếu một cạnh của mảnh vườn là bờ sông uốn cong thì sao? Cách làm tự nhiên là cắt mảnh vườn thành nhiều dải hẹp, coi mỗi dải gần như một hình chữ nhật, rồi cộng diện tích các dải lại. Dải càng hẹp, kết quả càng chính xác. Tích phân là phép cộng đó khi các dải hẹp vô cùng.`,
    R`Cùng ý tưởng ấy trả lời nhiều câu hỏi khác. Xe chạy với tốc độ thay đổi liên tục thì đi được bao xa? Chia thời gian thành từng khoảnh khắc ngắn, trong mỗi khoảnh khắc coi tốc độ không đổi, lấy tốc độ nhân thời gian rồi cộng tất cả lại. Tích phân luôn là «cộng rất nhiều mẩu rất nhỏ».`,
    R`Điều bất ngờ là phép cộng khổng lồ này có đường tắt. Đạo hàm đi từ quãng đường ra tốc độ; đi ngược lại, từ tốc độ về quãng đường, gọi là tìm nguyên hàm. Định lí cơ bản nói rằng tổng của mọi mẩu nhỏ đúng bằng «giá trị nguyên hàm ở cuối trừ giá trị ở đầu», giống như quãng đường đã đi bằng số trên đồng hồ cây số lúc đến trừ lúc xuất phát.`,
    R`Vì vậy chuyên đề có hai nửa. Nửa đầu học cách đi ngược đạo hàm: mỗi công thức nguyên hàm chỉ là một công thức đạo hàm đọc từ phải sang trái, và luôn kiểm lại được bằng cách lấy đạo hàm. Nửa sau dùng nó để tính diện tích, thể tích và quãng đường.`,
  ],
  kyHieu: [
    { kh: R`$\int$`, doc: R`Dấu tích phân, là chữ S kéo dài, viết tắt của «tổng» (summa trong tiếng Latinh).` },
    { kh: R`$dx$`, doc: R`Bề rộng của một dải rất hẹp theo phương $x$. Nó cũng cho biết biến nào đang được dùng.` },
    { kh: R`$\int f(x)\,dx$`, doc: R`Nguyên hàm của $f$: họ các hàm mà lấy đạo hàm thì ra $f$.` },
    { kh: R`$+C$`, doc: R`Một hằng số tùy ý. Cộng thêm hằng số nào thì đạo hàm vẫn như cũ, nên phải ghi để không bỏ sót nguyên hàm nào.` },
    { kh: R`$\int_a^b f(x)\,dx$`, doc: R`Tích phân từ $a$ đến $b$: tổng các dải «chiều cao $f(x)$ nhân bề rộng $dx$» khi $x$ chạy từ $a$ đến $b$. Kết quả là một con số.` },
    { kh: R`$F(x)\Big|_a^b$`, doc: R`Cách viết gọn của $F(b)-F(a)$: giá trị ở cận trên trừ giá trị ở cận dưới.` },
    { kh: R`$|f(x)|$`, doc: R`Độ lớn của $f(x)$, bỏ dấu âm nếu có, vì chiều cao của một dải không thể âm.` },
  ],
  canBiet: [
    R`Bảng đạo hàm và quy tắc đạo hàm hàm hợp.`,
    R`Giải phương trình để tìm hoành độ giao điểm của hai đồ thị.`,
    R`Diện tích hình chữ nhật, hình tam giác và thể tích hình trụ, hình nón.`,
  ],
  sections: [
    {
      title: "Nguyên hàm",
      items: [
        {
          kind: "dinh-nghia", title: "Nguyên hàm",
          text: R`Hàm $F$ là nguyên hàm của $f$ trên khoảng $K$ nếu $F'(x)=f(x)$ với mọi $x\in K$. Viết $\int f(x)\,dx=F(x)+C$ với $C$ là hằng số tùy ý.`,
          de: R`Tìm nguyên hàm là chơi ngược trò đạo hàm: cho biết độ dốc ở mọi điểm, hãy tìm lại đường cong. Chẳng hạn hàm nào có đạo hàm là $2x$? Một đáp án là $x^2$. Nhưng $x^2+5$ hay $x^2-3$ cũng đúng, vì nâng cả đường cong lên hay hạ xuống không làm đổi độ dốc; chữ $C$ ghi lại sự tự do đó.`,
        },
        {
          kind: "tinh-chat", title: "Sai khác một hằng số",
          text: R`Hai nguyên hàm bất kì của cùng một hàm chỉ khác nhau một hằng số, vì hiệu của chúng có đạo hàm bằng $0$. Đó là lý do cần ghi $+C$ khi tìm nguyên hàm.`,
          suy: [
            R`Giả sử $F$ và $G$ đều là nguyên hàm của $f$, tức $F'=f$ và $G'=f$. Khi đó hiệu $F-G$ có đạo hàm $f-f=0$ tại mọi điểm.`,
            R`Một hàm có độ dốc bằng $0$ ở mọi nơi trên một khoảng thì đồ thị nằm ngang, tức là hàm hằng. Chặt chẽ hơn, định lí giá trị trung bình cho hiệu hai giá trị bất kì của nó bằng độ dốc tại một điểm ở giữa nhân với khoảng cách, tức bằng $0$.`,
            R`Vậy $F-G=C$, hay $F=G+C$. Ngược lại, $(F+C)'=F'+0=f$, nên cộng hằng số nào vào cũng vẫn được một nguyên hàm.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Bảng nguyên hàm cơ bản",
          text: R`$\int x^n\,dx=\frac{x^{n+1}}{n+1}+C$ với $n\neq -1$, $\int\frac{dx}{x}=\ln|x|+C$, $\int e^x\,dx=e^x+C$, $\int a^x\,dx=\frac{a^x}{\ln a}+C$, $\int\sin x\,dx=-\cos x+C$, $\int\cos x\,dx=\sin x+C$ và $\int\frac{dx}{\cos^2x}=\tan x+C$.`,
          suy: [
            R`Mỗi dòng của bảng kiểm bằng cách lấy đạo hàm vế phải và thấy ra đúng hàm dưới dấu tích phân. Với lũy thừa: $\left(\frac{x^{n+1}}{n+1}\right)'=\frac{(n+1)x^n}{n+1}=x^n$. Khi $n=-1$ mẫu bằng $0$ nên công thức này không dùng được.`,
            R`Trường hợp $n=-1$: với $x>0$ có $(\ln x)'=\frac{1}{x}$; với $x<0$ có $(\ln(-x))'=\frac{-1}{-x}=\frac{1}{x}$. Gộp hai trường hợp được $(\ln|x|)'=\frac{1}{x}$.`,
            R`Các dòng còn lại đọc ngược bảng đạo hàm: $(e^x)'=e^x$, $\left(\frac{a^x}{\ln a}\right)'=a^x$, $(-\cos x)'=\sin x$, $(\sin x)'=\cos x$ và $(\tan x)'=\frac{1}{\cos^2x}$.`,
          ],
        },
        {
          kind: "tinh-chat", title: "Tính tuyến tính",
          text: R`$\int(f\pm g)\,dx=\int f\,dx\pm\int g\,dx$ và $\int kf\,dx=k\int f\,dx$ với hằng số $k$. Nhờ đó tính nguyên hàm của đa thức từng hạng tử một.`,
          suy: [
            R`Gọi $F$ và $G$ là nguyên hàm của $f$ và $g$. Đạo hàm của tổng bằng tổng các đạo hàm, nên $(F\pm G)'=f\pm g$. Vậy $F\pm G$ là nguyên hàm của $f\pm g$.`,
            R`Hằng số đứng ngoài khi lấy đạo hàm: $(kF)'=kF'=kf$. Vậy $kF$ là nguyên hàm của $kf$.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Biến trong là bậc nhất",
          text: R`Nếu $\int f(x)\,dx=F(x)+C$ thì $\int f(ax+b)\,dx=\frac{1}{a}F(ax+b)+C$ với $a\neq 0$. Chẳng hạn $\int\cos 2x\,dx=\frac{1}{2}\sin 2x+C$.`,
          suy: [
            R`Lấy đạo hàm của $F(ax+b)$ theo quy tắc hàm hợp: đạo hàm lớp ngoài nhân đạo hàm phần bên trong, tức $F'(ax+b)\cdot a=a\,f(ax+b)$.`,
            R`Kết quả thừa một thừa số $a$. Chia sẵn cho $a$ để bù: $\left[\frac{1}{a}F(ax+b)\right]'=f(ax+b)$. Đó là lý do có hệ số $\frac{1}{a}$.`,
          ],
        },
        { kind: "luu-y", text: R`Đừng quên hằng số $C$ khi tìm nguyên hàm. Đừng viết $\int uv\,dx=\int u\,dx\cdot\int v\,dx$, quy tắc này sai. Cách tự kiểm tốt nhất là lấy đạo hàm kết quả và so với hàm dưới dấu tích phân.` },
        { kind: "vi-du", text: R`Có $\int(3x^2+2x)\,dx=x^3+x^2+C$ vì đạo hàm của $x^3+x^2$ là $3x^2+2x$. Có $\int\left(\frac{1}{x}+e^x\right)dx=\ln|x|+e^x+C$.` },
      ],
    },
    {
      title: "Tích phân xác định và định lí cơ bản",
      items: [
        {
          kind: "dinh-nghia", title: "Công thức Newton–Leibniz",
          text: R`Nếu $F$ là một nguyên hàm của $f$ trên $[a;b]$ thì $\int_a^b f(x)\,dx=F(b)-F(a)$, viết gọn là $F(x)\Big|_a^b$. Hằng số $C$ triệt tiêu khi lấy hiệu nên không cần ghi.`,
          de: R`Muốn biết một đại lượng đã thay đổi tổng cộng bao nhiêu, không cần cộng từng thay đổi nhỏ: chỉ cần lấy giá trị cuối trừ giá trị đầu. Quãng đường xe đi được bằng số trên đồng hồ cây số lúc đến trừ lúc xuất phát. Ở đây nguyên hàm $F$ đóng vai đồng hồ cây số, còn $f$ là tốc độ.`,
          suy: [
            R`Gọi $A(x)$ là diện tích dưới đồ thị tính từ $a$ đến $x$. Khi $x$ tăng thêm một bước nhỏ $h$, diện tích có thêm một dải mỏng rộng $h$ và cao xấp xỉ $f(x)$, nên $A(x+h)-A(x)\approx f(x)\cdot h$.`,
            R`Chia cho $h$ rồi cho $h$ tiến về $0$ thì sai số biến mất: $A'(x)=f(x)$. Vậy hàm diện tích $A$ là một nguyên hàm của $f$.`,
            R`Với một nguyên hàm $F$ bất kì, $A(x)=F(x)+C$. Vì $A(a)=0$ (chưa quét được gì) nên $C=-F(a)$. Do đó diện tích tới $b$ là $A(b)=F(b)-F(a)$.`,
          ],
        },
        {
          kind: "dinh-nghia", title: "Ý nghĩa là diện tích có dấu",
          text: R`Chia $[a;b]$ thành $n$ đoạn bằng nhau rồi cộng diện tích các hình chữ nhật có chiều cao $f$. Giới hạn của tổng đó khi $n$ tăng vô hạn chính là $\int_a^b f$, và nó bằng diện tích phần trên trục trừ diện tích phần dưới trục.`,
          de: R`Tích phân cộng các dải mỏng «chiều cao nhân bề rộng». Ở chỗ đồ thị nằm dưới trục hoành, chiều cao được tính là số âm, nên phần đó bị trừ đi thay vì cộng vào. Kết quả là diện tích phía trên trục trừ diện tích phía dưới trục, giống tài khoản có khoản thu và khoản chi.`,
        },
        {
          kind: "tinh-chat", title: "Các tính chất",
          text: R`$\int_a^a f=0$, $\int_a^b f=-\int_b^a f$ và $\int_a^b f=\int_a^c f+\int_c^b f$ với $c$ bất kì. Ngoài ra tích phân bảo toàn thứ tự: nếu $f\le g$ trên $[a;b]$ thì $\int_a^b f\le\int_a^b g$.`,
          suy: [
            R`Dùng Newton–Leibniz: $\int_a^a f=F(a)-F(a)=0$, và $\int_b^a f=F(a)-F(b)=-\left(F(b)-F(a)\right)$, nên đổi chỗ hai cận thì đổi dấu.`,
            R`Tách cận: $\left[F(c)-F(a)\right]+\left[F(b)-F(c)\right]=F(b)-F(a)$, vì $F(c)$ triệt tiêu. Đi từ $a$ tới $c$ rồi từ $c$ tới $b$ cũng là đi từ $a$ tới $b$.`,
            R`Bảo toàn thứ tự, với $a<b$: nếu $f\le g$ thì ở mỗi dải, hình chữ nhật của $f$ không cao hơn của $g$. Cộng các dải lại, tổng của $f$ không vượt tổng của $g$, và điều đó giữ nguyên khi lấy giới hạn.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Giá trị trung bình",
          text: R`Giá trị trung bình của $f$ trên $[a;b]$ là $\frac{1}{b-a}\int_a^b f(x)\,dx$. Nó là chiều cao của hình chữ nhật có cùng đáy $b-a$ và cùng diện tích với phần dưới đồ thị.`,
          suy: [
            R`Lấy $n$ điểm cách đều trên đoạn và tính trung bình thông thường của các giá trị: $\frac{f(x_1)+\dots+f(x_n)}{n}$.`,
            R`Bề rộng mỗi dải là $\Delta x=\frac{b-a}{n}$, nên $\frac{1}{n}=\frac{\Delta x}{b-a}$. Trung bình trên viết lại thành $\frac{1}{b-a}\left[f(x_1)\Delta x+\dots+f(x_n)\Delta x\right]$.`,
            R`Biểu thức trong ngoặc vuông là tổng các hình chữ nhật, tiến về $\int_a^b f(x)\,dx$ khi $n$ tăng vô hạn. Vậy trung bình của vô số giá trị là $\frac{1}{b-a}\int_a^b f(x)\,dx$.`,
          ],
        },
        { kind: "luu-y", title: "Diện tích có dấu", text: R`Tích phân có thể âm hoặc bằng $0$ dù hình có diện tích. Chẳng hạn $\int_{-1}^{1}x\,dx=0$ vì hai phần diện tích $\frac{1}{2}$ nằm ở hai phía trục hoành triệt tiêu nhau.` },
        { kind: "luu-y", text: R`Tích phân xác định là một số, không phải một hàm. Biến lấy tích phân là biến câm: $\int_a^b f(x)\,dx=\int_a^b f(t)\,dt$, đổi tên biến không đổi giá trị.` },
        { kind: "vi-du", text: R`Có $\int_0^2 x\,dx=\frac{x^2}{2}\Big|_0^2=2$ và $\int_0^1 x^3\,dx=\frac{1}{4}$. Giá trị trung bình của $x^2$ trên $[0;3]$ là $\frac{1}{3}\int_0^3 x^2\,dx=\frac{1}{3}\cdot 9=3$.` },
        { kind: "vi-du", text: R`Tổng diện tích các hình chữ nhật của $y=x$ trên $[0;1]$ chia $n$ đoạn, lấy chiều cao ở đầu mút phải, là $\frac{n+1}{2n}$. Với $n=4$ là $\frac{5}{8}$, và khi $n\to\infty$ tiến về $\frac{1}{2}=\int_0^1 x\,dx$.` },
      ],
    },
    {
      title: "Phương pháp đổi biến số",
      items: [
        { kind: "cach-lam", title: "Nguyên tắc", text: R`Đặt $u=u(x)$ thì $du=u'(x)\,dx$ và $\int f(u(x))\,u'(x)\,dx=\int f(u)\,du$. Dùng khi dưới dấu tích phân có một hàm và đạo hàm của nó cùng xuất hiện, hoặc sai khác một hằng số.` },
        { kind: "cach-lam", title: "Với tích phân xác định", text: R`Đổi cả cận: $x=a$ ứng với $u(a)$ và $x=b$ ứng với $u(b)$. Sau đó tính theo $u$ với cận mới, không cần quay lại biến $x$.` },
        { kind: "luu-y", text: R`Khi đổi biến phải đổi đủ ba thứ: biểu thức, $dx$ và cận. Quên đổi cận, hoặc đổi cận rồi lại thế $x$ trở lại, là lỗi gặp nhiều nhất.` },
        { kind: "vi-du", text: R`Tính $\int_0^1 2x(x^2+1)^3\,dx$. Đặt $u=x^2+1$ thì $du=2x\,dx$, cận $x=0$ thành $u=1$ và $x=1$ thành $u=2$. Khi đó tích phân là $\int_1^2 u^3\,du=\frac{u^4}{4}\Big|_1^2=\frac{16-1}{4}=\frac{15}{4}$.` },
        { kind: "vi-du", text: R`Có $\int\frac{2x}{x^2+1}\,dx=\ln(x^2+1)+C$ vì tử là đạo hàm của mẫu. Dạng $\int\frac{u'}{u}\,dx=\ln|u|+C$ rất hay gặp.` },
        { kind: "vi-du", text: R`Có $\int\sin x\cos x\,dx=\frac{\sin^2x}{2}+C$ bằng cách đặt $u=\sin x$. Kiểm lại: đạo hàm của $\frac{\sin^2x}{2}$ là $\sin x\cos x$.` },
      ],
    },
    {
      title: "Tích phân từng phần",
      items: [
        {
          kind: "cong-thuc", title: "Công thức",
          text: R`$\int u\,dv=uv-\int v\,du$. Với tích phân xác định: $\int_a^b u\,dv=\big[uv\big]_a^b-\int_a^b v\,du$. Công thức này là quy tắc đạo hàm của tích đọc ngược lại.`,
          suy: [
            R`Bắt đầu từ quy tắc đạo hàm của tích: $(uv)'=u'v+uv'$.`,
            R`Lấy nguyên hàm hai vế: $uv=\int u'v\,dx+\int uv'\,dx$. Chuyển vế được $\int uv'\,dx=uv-\int u'v\,dx$.`,
            R`Viết gọn $du=u'\,dx$ và $dv=v'\,dx$ thì được $\int u\,dv=uv-\int v\,du$. Với tích phân xác định, áp dụng Newton–Leibniz cho $(uv)'$ được số hạng $\big[uv\big]_a^b$.`,
          ],
        },
        { kind: "cach-lam", title: "Chọn phần để lấy đạo hàm", text: R`Chọn $u$ là phần mà lấy đạo hàm làm đơn giản đi, như đa thức hoặc $\ln x$. Chọn $dv$ là phần dễ tìm nguyên hàm, như $e^x$, $\sin x$, $\cos x$. Mục tiêu là $\int v\,du$ đơn giản hơn $\int u\,dv$.` },
        { kind: "cach-lam", title: "Áp dụng lặp lại", text: R`Với $\int x^2e^x\,dx$ phải làm hai lần: mỗi lần giảm bậc của đa thức đi một. Với $\int\ln x\,dx$ chọn $dv=dx$ để được $x\ln x-x+C$.` },
        { kind: "luu-y", text: R`Nếu sau khi làm từng phần tích phân mới phức tạp hơn, hãy đổi vai trò của $u$ và $dv$. Một lựa chọn sai thường lộ ra ngay ở bước đầu.` },
        { kind: "vi-du", text: R`Tính $\int xe^x\,dx$ với $u=x$ và $dv=e^x\,dx$: được $xe^x-\int e^x\,dx=xe^x-e^x+C=(x-1)e^x+C$. Đạo hàm của $(x-1)e^x$ là $xe^x$, khớp.` },
        { kind: "vi-du", text: R`Tính $\int_0^{\pi}x\sin x\,dx$ với $u=x$ và $dv=\sin x\,dx$: được $\big[-x\cos x\big]_0^{\pi}+\int_0^{\pi}\cos x\,dx=\pi+0=\pi$.` },
      ],
    },
    {
      title: "Diện tích hình phẳng",
      items: [
        {
          kind: "cong-thuc", title: "Diện tích dưới một đồ thị",
          text: R`Diện tích hình giới hạn bởi $y=f(x)$, trục hoành và hai đường $x=a$, $x=b$ là $S=\int_a^b|f(x)|\,dx$. Dấu giá trị tuyệt đối là điều kiện để diện tích không âm.`,
          suy: [
            R`Ở chỗ $f\ge 0$, tích phân cộng các dải có chiều cao $f(x)$ nên bằng đúng diện tích giữa đồ thị và trục hoành.`,
            R`Ở chỗ $f<0$, các dải có chiều cao âm nên tích phân bằng số đối của diện tích. Lấy $|f|$ là lật phần nằm dưới trục lên phía trên: hình lật có cùng diện tích, và giờ mọi dải đều được cộng.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Diện tích giữa hai đồ thị",
          text: R`Diện tích hình giới hạn bởi hai đồ thị $y=f(x)$, $y=g(x)$ và hai đường $x=a$, $x=b$ là $S=\int_a^b|f(x)-g(x)|\,dx$.`,
          suy: [
            R`Cắt hình thành các dải dọc mỏng có bề rộng $dx$. Tại vị trí $x$, dải kéo từ đồ thị này tới đồ thị kia nên có chiều cao bằng khoảng cách giữa hai đồ thị, tức $|f(x)-g(x)|$.`,
            R`Diện tích mỗi dải là $|f(x)-g(x)|\,dx$. Cộng mọi dải từ $x=a$ đến $x=b$ là lấy tích phân. Dấu giá trị tuyệt đối giữ cho chiều cao không âm dù đồ thị nào nằm trên.`,
          ],
        },
        { kind: "cach-lam", title: "Bỏ dấu giá trị tuyệt đối", text: R`Tìm các giao điểm bằng cách giải $f(x)=g(x)$, xét dấu $f-g$ trên từng khoảng giữa các nghiệm, rồi tách tích phân thành nhiều đoạn sao cho trên mỗi đoạn dấu không đổi. Trên đoạn nào $f-g<0$ thì đổi dấu biểu thức.` },
        { kind: "luu-y", text: R`Không bỏ giá trị tuyệt đối khi hàm đổi dấu trong đoạn lấy tích phân. Ví dụ $\int_0^{2\pi}\sin x\,dx=0$, trong khi diện tích hình bị giới hạn là $2\int_0^{\pi}\sin x\,dx=4$.` },
        { kind: "vi-du", text: R`Hình giới hạn bởi $y=x$ và $y=x^2$: giải $x=x^2$ được $x=0$ và $x=1$, và trên $[0;1]$ có $x\ge x^2$. Diện tích là $\int_0^1(x-x^2)\,dx=\frac{1}{2}-\frac{1}{3}=\frac{1}{6}$.` },
        { kind: "vi-du", text: R`Hình giới hạn bởi $y=4-x^2$ và trục hoành: giao điểm là $x=\pm 2$ và hàm không âm trên $[-2;2]$. Diện tích là $\int_{-2}^{2}(4-x^2)\,dx=\frac{32}{3}$.` },
      ],
    },
    {
      title: "Thể tích khối tròn xoay và các ứng dụng khác",
      items: [
        {
          kind: "cong-thuc", title: "Quay quanh trục hoành",
          text: R`Hình giới hạn bởi $y=f(x)$, trục hoành và $x=a$, $x=b$ quay quanh trục hoành tạo khối có thể tích $V=\pi\int_a^b\left[f(x)\right]^2\,dx$. Mỗi lát cắt vuông góc với trục là một đĩa tròn bán kính $|f(x)|$.`,
          suy: [
            R`Cắt khối thành các lát mỏng vuông góc với trục hoành, mỗi lát dày $dx$, như cắt một ổ bánh mì thành khoanh.`,
            R`Lát tại vị trí $x$ gần như một đĩa tròn bán kính $|f(x)|$. Thể tích đĩa bằng diện tích mặt tròn nhân bề dày: $\pi\left[f(x)\right]^2dx$.`,
            R`Cộng mọi lát từ $a$ đến $b$ được $V=\pi\int_a^b\left[f(x)\right]^2dx$. Kiểm lại với hàm hằng $f(x)=r$ trên $[0;h]$: công thức cho $\pi r^2h$, đúng thể tích hình trụ.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Quãng đường và độ dời",
          text: R`Nếu vật chuyển động với vận tốc $v(t)$ thì độ dời từ $t_1$ đến $t_2$ là $\int_{t_1}^{t_2}v(t)\,dt$, còn quãng đường đã đi là $\int_{t_1}^{t_2}|v(t)|\,dt$. Hai số này khác nhau khi vật đổi chiều.`,
          suy: [
            R`Vận tốc là đạo hàm của vị trí, nên vị trí $s(t)$ là một nguyên hàm của $v(t)$. Theo Newton–Leibniz, $\int_{t_1}^{t_2}v(t)\,dt=s(t_2)-s(t_1)$: vị trí cuối trừ vị trí đầu, tức độ dời.`,
            R`Khi $v<0$ vật đi lùi: độ dời bị trừ bớt, nhưng quãng đường thì vẫn cộng thêm. Quãng đường dùng tốc độ $|v|$, không quan tâm chiều, nên bằng $\int_{t_1}^{t_2}|v(t)|\,dt$.`,
          ],
        },
        { kind: "vi-du", text: R`Quay $y=\sqrt{x}$ với $0\le x\le 4$ quanh trục hoành: $V=\pi\int_0^4 x\,dx=\pi\cdot 8=8\pi$. Quay đoạn $y=\frac{r}{h}x$ với $0\le x\le h$ thì được hình nón có $V=\pi\int_0^h\frac{r^2}{h^2}x^2\,dx=\frac{1}{3}\pi r^2h$, đúng công thức hình nón.` },
        { kind: "vi-du", text: R`Vận tốc $v(t)=3t^2$ m/s, nên từ $t=0$ đến $t=2$ giây vật đi được $\int_0^2 3t^2\,dt=t^3\Big|_0^2=8$ mét. Vì $v\ge 0$, độ dời cũng bằng quãng đường.` },
        { kind: "luu-y", text: R`Công thức thể tích bình phương hàm trước khi lấy tích phân: $\pi\int f^2\neq\pi\left(\int f\right)^2$. Đây là lỗi hay gặp khi tính thể tích.` },
        { kind: "luu-y", text: R`Khi hình giới hạn bởi hai đồ thị rồi quay quanh trục hoành, với $f\ge g\ge 0$ thể tích là hiệu hai thể tích $\pi\int(f^2-g^2)$, không phải $\pi\int(f-g)^2$.` },
      ],
    },
  ],
  canNho: [
    R`Nguyên hàm: $F'=f$; mọi nguyên hàm sai khác một hằng số $C$.`,
    R`Bảng nguyên hàm: $\int x^n=\frac{x^{n+1}}{n+1}$, $\int\frac{1}{x}=\ln|x|$, $\int e^x=e^x$, $\int\sin x=-\cos x$, $\int\cos x=\sin x$.`,
    R`Newton–Leibniz: $\int_a^b f=F(b)-F(a)$; tích phân xác định là diện tích có dấu.`,
    R`Đổi biến: đổi cả biểu thức, $dx$ và cận.`,
    R`Từng phần: $\int u\,dv=uv-\int v\,du$; chọn $u$ là phần đạo hàm làm đơn giản đi.`,
    R`Diện tích giữa hai đồ thị: $\int_a^b|f-g|$; tách đoạn tại các nghiệm của $f=g$.`,
    R`Thể tích khối tròn xoay quanh trục hoành: $V=\pi\int_a^b f^2$.`,
    R`Quãng đường dùng $|v|$, độ dời dùng $v$.`,
  ],
  lienQuan: [
    { id: "derivative", vi: R`Tích phân và đạo hàm là hai phép toán ngược nhau; kiểm một nguyên hàm bằng cách lấy đạo hàm nó.` },
    { id: "limit", vi: R`Tích phân xác định là giới hạn của tổng diện tích các hình chữ nhật khi số đoạn chia tăng vô hạn.` },
    { id: "quadratic", vi: R`Giao điểm của parabol với đường thẳng cho các cận của tích phân tính diện tích giữa chúng.` },
  ],
  checks: [
    { expr: "integrate(3*x**2+2*x, x)", expect: "x**3+x**2" },
    { expr: "diff(x**3+x**2, x)", expect: "3*x**2+2*x" },
    { expr: "integrate(1/x+exp(x), x)", expect: "log(x)+exp(x)" },
    { expr: "integrate(cos(2*x), x)", expect: "sin(2*x)/2" },
    { expr: "integrate(x, (x,0,2))", expect: "2" },
    { expr: "integrate(x**3, (x,0,1))", expect: "Rational(1,4)" },
    { expr: "integrate(x, (x,-1,1))", expect: "0" },
    { expr: "integrate(x**2, (x,0,3))/3", expect: "3" },
    { expr: "Rational(4+1,2*4)", expect: "Rational(5,8)" },
    { expr: "limit((n+1)/(2*n), n, oo)", expect: "Rational(1,2)" },
    { expr: "integrate(2*x*(x**2+1)**3, (x,0,1))", expect: "Rational(15,4)" },
    { expr: "integrate(u**3, (u,1,2))", expect: "Rational(15,4)" },
    { expr: "diff(log(x**2+1), x)", expect: "2*x/(x**2+1)" },
    { expr: "diff(sin(x)**2/2, x)", expect: "sin(x)*cos(x)" },
    { expr: "diff((x-1)*exp(x), x)", expect: "x*exp(x)" },
    { expr: "integrate(x*sin(x), (x,0,pi))", expect: "pi" },
    { expr: "diff(x*log(x)-x, x)", expect: "log(x)" },
    { expr: "integrate(sin(x), (x,0,2*pi))", expect: "0" },
    { expr: "2*integrate(sin(x), (x,0,pi))", expect: "4" },
    { expr: "solve(x-x**2, x)", expect: "[0, 1]" },
    { expr: "integrate(x-x**2, (x,0,1))", expect: "Rational(1,6)" },
    { expr: "integrate(4-x**2, (x,-2,2))", expect: "Rational(32,3)" },
    { expr: "pi*integrate(x, (x,0,4))", expect: "8*pi" },
    { expr: "simplify(pi*integrate(r**2*x**2/h**2, (x,0,h))-pi*r**2*h/3)", expect: "0" },
    { expr: "integrate(3*t**2, (t,0,2))", expect: "8" },
  ],
};
