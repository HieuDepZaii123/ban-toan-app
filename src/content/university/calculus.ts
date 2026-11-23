import type { TopicKnowledge } from "../knowledge/types.ts";

const R = String.raw;

export const calculusKnowledge: TopicKnowledge = {
  id: "calculus",
  tongQuat: {
    la: R`Giải tích đại học làm chặt ba ý lớn ở THPT: giới hạn (nói đúng bằng ε–δ), tổng vô hạn (chuỗi, chuỗi Taylor) và đạo hàm, tích phân của hàm nhiều biến. Hàm một biến được thay bằng hàm hai hay ba biến, đạo hàm thành gradient chỉ hướng, tích phân thành tích phân bội trên miền phẳng hay khối.`,
    dungDe: R`Xấp xỉ hàm phức tạp bằng đa thức trong máy tính bỏ túi và thư viện số, tìm giá trị lớn nhất hay nhỏ nhất khi có ràng buộc trong kinh tế và kĩ thuật, huấn luyện mạng nơ-ron bằng hạ gradient, và tính diện tích, khối lượng, xác suất trên miền nhiều chiều. Trong thi cử, môn này cho bài chuỗi, khai triển Taylor, đạo hàm riêng, cực trị và tích phân bội.`,
    lienHe: R`Nối từ chuyên đề Giới hạn, Đạo hàm và Tích phân ở THPT, và dùng dãy số, cấp số nhân làm nền cho chuỗi. Đại số tuyến tính cho ma trận Hessian của cực trị nhiều biến, còn Xác suất thống kê dùng tích phân bội cho phân phối liên tục.`,
  },
  tuDau: [
    R`Máy tính bỏ túi tính $\sin 0{,}3$ thế nào, khi nó chỉ biết cộng, trừ, nhân, chia? Nó thay hàm sin bằng một đa thức rất gần: $x-\frac{x^3}{6}+\frac{x^5}{120}$, và chỉ cần cộng vài số hạng là đủ chính xác tới chữ số thứ chín. Đó là ý tưởng trung tâm của chuỗi Taylor: một đường cong trơn trông giống một đa thức nếu ta nhìn đủ gần.`,
    R`Ý tưởng ấy kéo theo một câu hỏi: cộng vô hạn số hạng có ý nghĩa không? Cộng $\frac12+\frac14+\frac18+\cdots$ dần tới $1$, nhưng $1+\frac12+\frac13+\cdots$ lại lớn lên mãi. Muốn phân biệt hai trường hợp ta cần định nghĩa chính xác «dần tới», đó là việc của ε–δ.`,
    R`Khi hàm có hai biến, ví dụ độ cao của một ngọn đồi theo vị trí $(x;y)$, đạo hàm không còn là một con số mà là một mũi tên: gradient, chỉ về hướng dốc lên nhanh nhất. Đi ngược mũi tên thì xuống dốc nhanh nhất, và đó chính là cách máy tính huấn luyện mạng nơ-ron: xuống thung lũng từng bước nhỏ.`,
    R`Cuối cùng, nếu thay độ cao bằng mật độ của một tấm kim loại, thì khối lượng cả tấm là tích phân bội. Cắt tấm thành vô số ô nhỏ, nhân mật độ với diện tích ô, rồi cộng lại. Mọi ứng dụng trong môn học này đều là một trong bốn ý trên: xấp xỉ, cộng vô hạn, hướng dốc và cộng các ô nhỏ.`,
  ],
  kyHieu: [
    { kh: R`$\varepsilon,\ \delta$`, doc: R`Hai chữ Hy Lạp «ê-xi-lon» và «đen-ta», dùng cho những số dương rất nhỏ trong định nghĩa giới hạn.` },
    { kh: R`$\sum_{k=1}^{\infty}a_k$`, doc: R`Chuỗi: tổng vô hạn các số hạng $a_1+a_2+a_3+\cdots$.` },
    { kh: R`$f^{(k)}(a)$`, doc: R`Đạo hàm cấp $k$ của $f$ tại $a$; $f^{(0)}=f$.` },
    { kh: R`$k!$`, doc: R`Giai thừa: $k!=1\cdot2\cdots k$, và $0!=1$.` },
    { kh: R`$f_x,\ f_y$`, doc: R`Đạo hàm riêng theo $x$ và theo $y$: đạo hàm theo một biến, giữ biến kia cố định.` },
    { kh: R`$\nabla f$`, doc: R`Gradient của $f$: vectơ $(f_x;f_y)$, đọc là «nabla f».` },
    { kh: R`$\iint_D f\,dA$`, doc: R`Tích phân bội hai lớp của $f$ trên miền phẳng $D$, với $dA$ là yếu tố diện tích.` },
    { kh: R`$\lambda$`, doc: R`Nhân tử Lagrange, số làm cho gradient hàm mục tiêu tỉ lệ với gradient của ràng buộc.` },
  ],
  canBiet: [
    R`Giới hạn, đạo hàm và tích phân ở THPT, kể cả quy tắc đạo hàm hợp và nguyên hàm cơ bản.`,
    R`Cấp số nhân và tổng của nó, được dùng để hiểu chuỗi hình học.`,
    R`Vectơ, tích vô hướng và độ dài vectơ, được dùng cho gradient và đạo hàm theo hướng.`,
  ],
  sections: [
    {
      title: "Giới hạn ε–δ và dãy hội tụ",
      items: [
        {
          kind: "dinh-nghia", title: "Dãy hội tụ",
          text: R`Dãy $(u_n)$ hội tụ về $L$, viết $u_n\to L$, nếu với mọi $\varepsilon>0$ có một số $N$ sao cho $|u_n-L|<\varepsilon$ với mọi $n>N$.`,
          de: R`Hãy tưởng tượng một khoảng nhỏ quanh $L$ rộng $\varepsilon$ về mỗi phía, nhỏ tùy ý bạn chọn. Dãy hội tụ về $L$ nghĩa là đến một lúc nào đó, mọi số hạng về sau đều nằm trong khoảng ấy. Khoảng càng hẹp thì phải đợi càng lâu, nhưng bao giờ cũng có lúc dãy vào hẳn trong khoảng.`,
        },
        {
          kind: "dinh-ly", title: "Giới hạn là duy nhất",
          text: R`Nếu dãy $(u_n)$ hội tụ về $a$ và cũng hội tụ về $b$ thì $a=b$: một dãy chỉ có một giới hạn.`,
          suy: [
            R`Giả sử $a\neq b$ và đặt $\varepsilon=\frac{|a-b|}{2}>0$. Hai khoảng $(a-\varepsilon;a+\varepsilon)$ và $(b-\varepsilon;b+\varepsilon)$ không có điểm chung.`,
            R`Vì $u_n\to a$, có $N_1$ để $|u_n-a|<\varepsilon$ với mọi $n>N_1$. Vì $u_n\to b$, có $N_2$ để $|u_n-b|<\varepsilon$ với mọi $n>N_2$. Lấy $n$ lớn hơn cả $N_1$ và $N_2$.`,
            R`Theo bất đẳng thức tam giác, $|a-b|\le|a-u_n|+|u_n-b|<2\varepsilon=|a-b|$. Vậy $|a-b|<|a-b|$, vô lí, nên $a=b$.`,
          ],
        },
        {
          kind: "tinh-chat", title: "Nguyên lí kẹp",
          text: R`Nếu $a_n\le u_n\le b_n$ với mọi $n$ lớn và $a_n\to L$, $b_n\to L$ thì $u_n\to L$.`,
          suy: [
            R`Cho $\varepsilon>0$. Vì $a_n\to L$ nên có $N_1$ để $a_n>L-\varepsilon$ với mọi $n>N_1$. Vì $b_n\to L$ nên có $N_2$ để $b_n<L+\varepsilon$ với mọi $n>N_2$.`,
            R`Gọi $N_0$ là mốc từ đó $a_n\le u_n\le b_n$. Với $n$ lớn hơn cả $N_0$, $N_1$ và $N_2$, ta có $L-\varepsilon<a_n\le u_n\le b_n<L+\varepsilon$, tức $|u_n-L|<\varepsilon$. Vậy $u_n\to L$.`,
          ],
        },
        {
          kind: "cach-lam", title: "Tìm số N ứng với ε",
          text: R`Giải bất phương trình $|u_n-L|<\varepsilon$ theo $n$ để được điều kiện $n>N(\varepsilon)$. Nếu cần, thay $|u_n-L|$ bằng một biểu thức lớn hơn nhưng dễ giải hơn. Việc có $N$ cho mọi $\varepsilon$ chính là chứng minh hội tụ.`,
        },
        {
          kind: "vi-du",
          text: R`Với $u_n=\frac{2n+1}{n+3}$ có $|u_n-2|=\frac{5}{n+3}$. Muốn $\frac{5}{n+3}<0{,}01$ cần $n+3>500$, tức $n>497$. Vậy $N=497$ đủ cho $\varepsilon=0{,}01$, và tổng quát $u_n\to2$. Với $u_n=\frac1n$ thì $|u_n|<0{,}01$ khi $n>100$.`,
        },
        { kind: "luu-y", text: R`Số $N$ phụ thuộc vào $\varepsilon$: khoảng càng hẹp thì $N$ càng lớn. Để chứng minh hội tụ phải chỉ ra $N$ cho mọi $\varepsilon$, chứ không chỉ cho một vài giá trị cụ thể như $0{,}01$.` },
      ],
    },
    {
      title: "Chuỗi số",
      items: [
        {
          kind: "dinh-nghia", title: "Chuỗi hội tụ",
          text: R`Chuỗi $\sum_{k=1}^{\infty}a_k$ hội tụ về $S$ nếu dãy tổng riêng $S_m=a_1+\dots+a_m$ hội tụ về $S$. Ngược lại chuỗi phân kì.`,
          de: R`Cộng vô hạn số hạng nghĩa là cộng dần, từng số một, và xem tổng chạy tới đâu. Nếu tổng ngày càng sát một số cố định thì số ấy là tổng của chuỗi. Nếu tổng lớn lên mãi hoặc nhảy qua nhảy lại không dừng thì chuỗi không có tổng.`,
        },
        {
          kind: "dinh-ly", title: "Chuỗi hình học",
          text: R`Chuỗi $\sum_{k=0}^{\infty}q^k$ hội tụ khi và chỉ khi $|q|<1$, và khi đó tổng bằng $\frac{1}{1-q}$.`,
          suy: [
            R`Với tổng riêng $S_m=1+q+\dots+q^m$, ta nhân $qS_m=q+\dots+q^{m+1}$ rồi trừ hai tổng: các số hạng giữa triệt tiêu, còn $(1-q)S_m=1-q^{m+1}$. Với $q\neq1$ ta có $S_m=\frac{1-q^{m+1}}{1-q}$.`,
            R`Nếu $|q|<1$ thì $q^{m+1}\to0$, nên $S_m\to\frac{1}{1-q}$: chuỗi hội tụ về tổng đó.`,
            R`Nếu $|q|\ge1$ thì số hạng $q^k$ không tiến về $0$, nên chuỗi phân kì theo điều kiện cần ở mục sau.`,
          ],
          suyKhac: [
            {
              cach: "Bằng tính tự đồng dạng",
              buoc: [
                R`Giả sử chuỗi hội tụ về $s$. Tách số hạng đầu: $s=1+(q+q^2+q^3+\cdots)=1+q(1+q+q^2+\cdots)=1+qs$.`,
                R`Giải phương trình $s=1+qs$ được $s(1-q)=1$, nên $s=\frac{1}{1-q}$ khi $q\neq1$.`,
                R`Cách này chỉ cho biết giá trị tổng nếu chuỗi đã hội tụ. Sự hội tụ khi $|q|<1$ vẫn cần cách thứ nhất, hoặc lập luận rằng các tổng riêng với $0\le q<1$ tăng và bị chặn trên bởi $\frac{1}{1-q}$.`,
              ],
            },
          ],
        },
        {
          kind: "tinh-chat", title: "Điều kiện cần của chuỗi hội tụ",
          text: R`Nếu chuỗi $\sum a_k$ hội tụ thì $a_k\to0$. Điều ngược lại không đúng.`,
          suy: [
            R`Gọi $S_m$ là tổng riêng, hội tụ về $S$. Khi đó $S_{m-1}$ cũng hội tụ về $S$, và $a_m=S_m-S_{m-1}$ tiến về $S-S=0$.`,
            R`Chuỗi điều hòa $\sum\frac1k$ có $\frac1k\to0$ nhưng vẫn phân kì (xem mục sau), nên điều kiện $a_k\to0$ chưa đủ để hội tụ.`,
          ],
        },
        {
          kind: "dinh-ly", title: "Chuỗi điều hòa phân kì",
          text: R`Chuỗi $1+\frac12+\frac13+\frac14+\cdots$ phân kì: tổng riêng lớn lên vượt mọi số cho trước.`,
          suy: [
            R`Gom các số hạng thành từng nhóm: $\frac13+\frac14\ge\frac14+\frac14=\frac12$, và $\frac15+\dots+\frac18\ge4\cdot\frac18=\frac12$, rồi $\frac19+\dots+\frac1{16}\ge8\cdot\frac1{16}=\frac12$.`,
            R`Nhóm thứ $j$ gồm $2^{j-1}$ số hạng, mỗi số hạng không nhỏ hơn $\frac1{2^j}$, nên nhóm đó không nhỏ hơn $\frac12$.`,
            R`Vậy $S_{2^m}\ge1+\frac m2$, và vế phải lớn lên không giới hạn khi $m$ tăng. Dãy tổng riêng không bị chặn, nên chuỗi phân kì dù số hạng tiến về $0$.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Tiêu chuẩn tỉ số",
          text: R`Nếu $\left|\frac{a_{k+1}}{a_k}\right|\to\rho$ với $\rho<1$ thì chuỗi $\sum a_k$ hội tụ. Nếu $\rho>1$ thì chuỗi phân kì. Nếu $\rho=1$ thì tiêu chuẩn không kết luận được.`,
          suy: [
            R`Giả sử mọi $a_k\neq0$ để tỉ số có nghĩa. Với $\rho<1$, chọn số $r$ sao cho $\rho<r<1$. Từ một chỉ số $K$ trở đi, $\left|\frac{a_{k+1}}{a_k}\right|<r$, nên $|a_{K+j}|\le r^j|a_K|$.`,
            R`So sánh với chuỗi hình học: các số hạng của $\sum|a_k|$ từ $K$ trở đi không vượt quá $|a_K|r^j$, mà $\sum r^j$ hội tụ vì $r<1$. Tổng riêng của chuỗi dương $\sum|a_k|$ tăng và bị chặn nên hội tụ, và chuỗi hội tụ tuyệt đối thì hội tụ vì $0\le a_k+|a_k|\le2|a_k|$.`,
            R`Với $\rho>1$ thì từ một chỉ số nào đó $|a_{k+1}|>|a_k|$, số hạng không tiến về $0$, và chuỗi phân kì theo điều kiện cần.`,
          ],
        },
        {
          kind: "vi-du",
          text: R`Chuỗi $\sum_{k=0}^{\infty}\frac{1}{2^k}=\frac{1}{1-\frac12}=2$. Chuỗi $\sum_{k=1}^{\infty}\frac{k}{2^k}$ có tỉ số $\frac{k+1}{2k}\to\frac12<1$ nên hội tụ, và tổng bằng $2$. Chuỗi $\sum\frac1{k^2}$ hội tụ về $\frac{\pi^2}{6}$.`,
        },
        { kind: "luu-y", text: R`Số hạng tiến về $0$ chưa đủ để chuỗi hội tụ: chuỗi điều hòa là phản ví dụ. Khi tỉ số tiến về $1$, như với $\sum\frac1k$ và $\sum\frac1{k^2}$, phải dùng tiêu chuẩn khác.` },
      ],
    },
    {
      title: "Chuỗi Taylor",
      items: [
        {
          kind: "dinh-nghia", title: "Đa thức Taylor",
          text: R`Đa thức Taylor bậc $n$ của $f$ tại $a$ là $T_n(x)=\sum_{k=0}^{n}\frac{f^{(k)}(a)}{k!}(x-a)^k$. Đây là đa thức bậc không quá $n$ có cùng giá trị và cùng $n$ đạo hàm đầu tiên với $f$ tại $a$.`,
          de: R`Nhìn một đường cong thật gần thì nó giống đường thẳng, đó là tiếp tuyến. Nhìn kĩ hơn thì nó giống một parabol, rồi một đường bậc ba. Đa thức Taylor ghép các «mức nhìn gần» ấy lại: đạo hàm cấp càng cao càng sửa thêm những chi tiết nhỏ hơn, và đa thức càng bám sát đường cong quanh điểm $a$.`,
        },
        {
          kind: "cong-thuc", title: "Hệ số của đa thức Taylor",
          text: R`Hệ số của $(x-a)^k$ trong $T_n$ là $c_k=\frac{f^{(k)}(a)}{k!}$.`,
          suy: [
            R`Viết $p(x)=c_0+c_1(x-a)+c_2(x-a)^2+\dots+c_n(x-a)^n$. Đạo hàm $k$ lần rồi thay $x=a$: mọi số hạng có bậc nhỏ hơn $k$ bị đạo hàm thành $0$, mọi số hạng bậc lớn hơn $k$ còn thừa một lũy thừa của $(x-a)$ nên bằng $0$ tại $a$.`,
            R`Chỉ còn số hạng bậc $k$, cho $p^{(k)}(a)=k!\,c_k$. Muốn $p^{(k)}(a)=f^{(k)}(a)$ thì $c_k=\frac{f^{(k)}(a)}{k!}$.`,
          ],
        },
        {
          kind: "dinh-ly", title: "Phần dư Lagrange",
          text: R`Nếu $f$ có đạo hàm cấp $n+1$ liên tục thì với mọi $x$ có số $c$ nằm giữa $a$ và $x$ sao cho $f(x)-T_n(x)=\frac{f^{(n+1)}(c)}{(n+1)!}(x-a)^{n+1}$.`,
          suy: [
            R`Theo công thức Newton–Leibniz, $f(x)=f(a)+\int_a^x f'(t)\,dt$. Tích phân từng phần với $u=f'(t)$, $v=-(x-t)$ cho $\int_a^x f'(t)\,dt=f'(a)(x-a)+\int_a^x(x-t)f''(t)\,dt$.`,
            R`Lặp lại phép tích phân từng phần, mỗi lần tách ra thêm một số hạng $\frac{f^{(k)}(a)}{k!}(x-a)^k$ và còn lại phần dư $R_n=\int_a^x\frac{(x-t)^n}{n!}f^{(n+1)}(t)\,dt$. Vậy $f(x)=T_n(x)+R_n$.`,
            R`Với $x>a$, hàm $\frac{(x-t)^n}{n!}$ không âm trên $[a;x]$. Theo định lí giá trị trung bình cho tích phân, $R_n=f^{(n+1)}(c)\int_a^x\frac{(x-t)^n}{n!}\,dt=f^{(n+1)}(c)\frac{(x-a)^{n+1}}{(n+1)!}$. Trường hợp $x<a$ làm tương tự.`,
          ],
          suyKhac: [
            {
              cach: "Bằng định lí Rolle",
              buoc: [
                R`Cố định $x\neq a$ và đặt $F(t)=f(x)-\sum_{k=0}^{n}\frac{f^{(k)}(t)}{k!}(x-t)^k-M\frac{(x-t)^{n+1}}{(n+1)!}$, trong đó $M$ chọn để $F(a)=0$. Việc chọn được vì $(x-a)^{n+1}\neq0$.`,
                R`Tại $t=x$ mọi lũy thừa $(x-t)^k$ với $k\ge1$ đều bằng $0$ còn số hạng $k=0$ là $f(x)$, nên $F(x)=f(x)-f(x)=0$. Vậy $F(a)=F(x)=0$.`,
                R`Đạo hàm theo $t$, các số hạng của tổng khử nhau từng cặp, chỉ còn $F'(t)=-\frac{f^{(n+1)}(t)}{n!}(x-t)^n+M\frac{(x-t)^n}{n!}$.`,
                R`Theo định lí Rolle có $c$ nằm giữa $a$ và $x$ sao cho $F'(c)=0$. Vì $(x-c)^n\neq0$ nên $M=f^{(n+1)}(c)$.`,
                R`Thay $M$ vào điều kiện $F(a)=0$ được $f(x)-T_n(x)=f^{(n+1)}(c)\frac{(x-a)^{n+1}}{(n+1)!}$, đúng như công thức cần chứng minh.`,
              ],
            },
          ],
        },
        {
          kind: "cong-thuc", title: "Khai triển của các hàm cơ bản tại 0",
          text: R`$e^x=\sum\frac{x^k}{k!}$, $\sin x=\sum\frac{(-1)^kx^{2k+1}}{(2k+1)!}$, $\cos x=\sum\frac{(-1)^kx^{2k}}{(2k)!}$, và $\ln(1+x)=\sum_{k\ge1}\frac{(-1)^{k+1}x^k}{k}$ với $-1<x\le1$.`,
          suy: [
            R`Với $f(x)=e^x$ mọi đạo hàm đều bằng $e^x$, bằng $1$ tại $0$, nên hệ số là $\frac{1}{k!}$. Với $\sin x$, các đạo hàm tại $0$ lặp theo chu kì $0,1,0,-1$, nên chỉ còn các lũy thừa lẻ với dấu đan xen; $\cos x$ cho các lũy thừa chẵn.`,
            R`Phần dư Lagrange của $e^x$, $\sin x$ và $\cos x$ có độ lớn không vượt $\frac{e^{|x|}|x|^{n+1}}{(n+1)!}$, tiến về $0$ khi $n\to\infty$ với mọi $x$, nên chuỗi hội tụ về chính hàm với mọi $x$.`,
            R`Với $\ln(1+x)$, phần dư Lagrange không dùng được khi $x<-\frac12$. Thay vào đó, lấy tích phân chuỗi hình học $\frac{1}{1+t}=\sum(-t)^k$ (hội tụ khi $|t|<1$) từ $0$ tới $x$ với $|x|<1$. Tại $x=1$, phần dư $\int_0^1\frac{t^n}{1+t}\,dt\le\frac1{n+1}$ tiến về $0$, nên chuỗi vẫn hội tụ về $\ln2$.`,
          ],
        },
        {
          kind: "cach-lam", title: "Khai triển nhờ thay biến",
          text: R`Không cần tính đạo hàm nhiều lần: từ $e^x=\sum\frac{x^k}{k!}$, thay $x$ bằng $-x^2$ được khai triển của $e^{-x^2}$. Lấy tích phân hay đạo hàm từng số hạng của một chuỗi lũy thừa trong khoảng hội tụ của nó cũng cho khai triển mới.`,
        },
        {
          kind: "vi-du",
          text: R`Xấp xỉ $e^{0{,}5}$ bằng $T_3$: $1+\frac12+\frac18+\frac1{48}=\frac{79}{48}\approx1{,}6458$. Phần dư không vượt $\frac{e^{c}(0{,}5)^4}{24}<\frac{2}{24\cdot16}=\frac1{192}\approx0{,}0052$, và giá trị thật là $1{,}6487$, lệch khoảng $0{,}0029$.`,
        },
        { kind: "luu-y", text: R`Chuỗi Taylor chỉ bằng hàm trong khoảng hội tụ. Chuỗi của $\ln(1+x)$ hội tụ khi $-1<x\le1$, và với $x>1$ thì các tổng riêng càng cộng càng xa giá trị đúng.` },
      ],
    },
    {
      title: "Hàm hai biến và gradient",
      items: [
        {
          kind: "dinh-nghia", title: "Đạo hàm riêng",
          text: R`Đạo hàm riêng của $f(x;y)$ theo $x$ tại $(a;b)$ là $f_x(a;b)=\lim_{h\to0}\frac{f(a+h;b)-f(a;b)}{h}$. Đạo hàm riêng theo $y$ định nghĩa tương tự, giữ $x$ cố định.`,
          de: R`Hãy đứng trên một sườn đồi. Đi thẳng về phía đông thì dốc bao nhiêu? Đó là đạo hàm riêng theo $x$. Đi thẳng về phía bắc thì dốc bao nhiêu? Đó là đạo hàm riêng theo $y$. Mỗi lần ta chỉ cho một hướng chuyển động và giữ nguyên hướng còn lại, nên cách tính hệt như đạo hàm một biến.`,
        },
        {
          kind: "cong-thuc", title: "Gradient và đạo hàm theo hướng",
          text: R`Gradient của $f$ là vectơ $\nabla f=(f_x;f_y)$. Đạo hàm của $f$ theo hướng vectơ đơn vị $\mathbf{u}$ là $D_{\mathbf{u}}f=\nabla f\cdot\mathbf{u}$.`,
          suy: [
            R`Đi từ $(a;b)$ theo hướng $\mathbf{u}=(u_1;u_2)$ một đoạn $t$ thì tới $(a+tu_1;b+tu_2)$. Đạo hàm theo hướng là $\lim_{t\to0}\frac{f(a+tu_1;b+tu_2)-f(a;b)}{t}$.`,
            R`Với hàm khả vi, $f(a+tu_1;b+tu_2)-f(a;b)\approx f_x\,tu_1+f_y\,tu_2$ với sai số nhỏ hơn bậc $t$. Chia cho $t$ và cho $t\to0$ được $D_{\mathbf{u}}f=f_xu_1+f_yu_2=\nabla f\cdot\mathbf{u}$.`,
          ],
        },
        {
          kind: "dinh-ly", title: "Gradient chỉ hướng tăng nhanh nhất",
          text: R`Nếu $\nabla f\neq\vec{0}$ thì trong mọi hướng, $f$ tăng nhanh nhất theo hướng $\nabla f$, với tốc độ $|\nabla f|$, và giảm nhanh nhất theo hướng $-\nabla f$.`,
          suy: [
            R`Với vectơ đơn vị $\mathbf{u}$ tạo với $\nabla f$ một góc $\theta$, ta có $D_{\mathbf{u}}f=\nabla f\cdot\mathbf{u}=|\nabla f|\,|\mathbf{u}|\cos\theta=|\nabla f|\cos\theta$.`,
            R`Biểu thức này lớn nhất khi $\cos\theta=1$, tức $\theta=0$: $\mathbf{u}$ cùng hướng với $\nabla f$, và giá trị lớn nhất bằng $|\nabla f|$. Nó nhỏ nhất bằng $-|\nabla f|$ khi $\theta=180^\circ$.`,
          ],
          suyKhac: [
            {
              cach: "Bằng nhân tử Lagrange",
              buoc: [
                R`Cần tìm vectơ đơn vị $\mathbf{u}=(u_1;u_2)$ làm lớn nhất $\varphi(\mathbf{u})=f_xu_1+f_yu_2$, với ràng buộc $u_1^2+u_2^2=1$.`,
                R`Đường tròn đơn vị đóng và bị chặn nên $\varphi$ đạt giá trị lớn nhất trên nó. Theo điều kiện Lagrange (chứng minh ở phần cực trị), tại điểm tối ưu $\nabla\varphi=\mu\nabla g$ với $g=u_1^2+u_2^2$. Ở đây $\nabla\varphi=(f_x;f_y)$ và $\nabla g=2\mathbf{u}$, nên $\mathbf{u}$ cùng phương với $(f_x;f_y)$, và $\mu\neq0$ vì $\nabla f\neq\vec{0}$.`,
                R`Hai vectơ đơn vị cùng phương với $\nabla f$ là $\pm\frac{\nabla f}{|\nabla f|}$, cho $\varphi=\pm|\nabla f|$. Giá trị lớn nhất là $+|\nabla f|$ tại $\mathbf{u}=\frac{\nabla f}{|\nabla f|}$.`,
              ],
            },
          ],
        },
        {
          kind: "tinh-chat", title: "Gradient vuông góc với đường đồng mức",
          text: R`Tại mỗi điểm mà $\nabla f\neq\vec{0}$, gradient vuông góc với đường đồng mức $f(x;y)=c$ đi qua điểm đó.`,
          suy: [
            R`Gọi $\mathbf{r}(t)=(x(t);y(t))$ là một cách đi dọc đường đồng mức. Vì $f$ không đổi dọc đường nên $f(x(t);y(t))=c$ với mọi $t$.`,
            R`Đạo hàm hai vế theo $t$ bằng quy tắc đạo hàm hàm hợp: $f_xx'(t)+f_yy'(t)=0$, tức $\nabla f\cdot\mathbf{r}'(t)=0$. Vectơ tiếp tuyến $\mathbf{r}'(t)$ của đường đồng mức vuông góc với $\nabla f$.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Mặt phẳng tiếp xúc",
          text: R`Mặt phẳng tiếp xúc của mặt $z=f(x;y)$ tại $(a;b)$ là $z=f(a;b)+f_x(a;b)(x-a)+f_y(a;b)(y-b)$.`,
          suy: [
            R`Gần $(a;b)$, hàm khả vi xấp xỉ tốt bằng hàm tuyến tính: $f(a+h;b+k)\approx f(a;b)+f_xh+f_yk$.`,
            R`Đặt $h=x-a$ và $k=y-b$. Vế phải là phương trình một mặt phẳng, đi qua điểm $(a;b;f(a;b))$ và có độ dốc $f_x$ theo hướng $x$, $f_y$ theo hướng $y$, nên là mặt phẳng tiếp xúc.`,
          ],
        },
        {
          kind: "vi-du",
          text: R`Với $f(x;y)=x^2y$ tại $(1;2)$: $f_x=2xy=4$ và $f_y=x^2=1$, nên $\nabla f=(4;1)$ và $|\nabla f|=\sqrt{17}$. Hướng tăng nhanh nhất là $\frac{(4;1)}{\sqrt{17}}$, tốc độ tăng $\sqrt{17}\approx4{,}12$. Mặt phẳng tiếp xúc là $z=2+4(x-1)+(y-2)$.`,
        },
        { kind: "luu-y", text: R`Gradient là một vectơ trong mặt phẳng $xy$ (mặt phẳng của biến), không phải trong không gian của đồ thị. Hướng đi xuống dốc nhanh nhất là $-\nabla f$, không phải một hướng chiếu từ đồ thị.` },
      ],
    },
    {
      title: "Cực trị và nhân tử Lagrange",
      items: [
        {
          kind: "dinh-nghia", title: "Điểm dừng",
          text: R`Điểm $(a;b)$ là điểm dừng của $f$ nếu $\nabla f(a;b)=\vec{0}$, tức $f_x=f_y=0$ tại đó. Cực trị nằm trong miền mở chỉ có thể là điểm dừng.`,
          de: R`Đứng trên đỉnh đồi hay dưới đáy thung lũng thì mặt đất nằm ngang theo mọi hướng, không có hướng nào dốc. Điểm dừng là mọi chỗ mà mặt đất nằm ngang như vậy. Có điểm dừng là đỉnh hay đáy, và có điểm dừng là yên ngựa: lên theo hướng này nhưng xuống theo hướng kia.`,
        },
        {
          kind: "dinh-ly", title: "Phân loại điểm dừng bằng ma trận Hessian",
          text: R`Tại điểm dừng, đặt $D=f_{xx}f_{yy}-f_{xy}^2$. Nếu $D>0$ và $f_{xx}>0$ thì là cực tiểu; nếu $D>0$ và $f_{xx}<0$ thì là cực đại; nếu $D<0$ thì là điểm yên; nếu $D=0$ thì chưa kết luận được.`,
          suy: [
            R`Tại điểm dừng, các số hạng bậc nhất của khai triển Taylor bậc hai biến mất. Với $f$ có đạo hàm riêng cấp hai liên tục, $f(a+h;b+k)-f(a;b)=\frac12\left(f_{xx}h^2+2f_{xy}hk+f_{yy}k^2\right)+o(h^2+k^2)$.`,
            R`Khi $f_{xx}\neq0$ (với $D>0$ điều này tự có vì $f_{xx}f_{yy}>f_{xy}^2\ge0$), hoàn thành bình phương: $f_{xx}h^2+2f_{xy}hk+f_{yy}k^2=f_{xx}\left(h+\frac{f_{xy}}{f_{xx}}k\right)^2+\frac{D}{f_{xx}}k^2$.`,
            R`Nếu $D>0$ thì hai hệ số $f_{xx}$ và $\frac{D}{f_{xx}}$ cùng dấu, nên biểu thức giữ nguyên một dấu với mọi $(h;k)\neq(0;0)$: dương khi $f_{xx}>0$ (cực tiểu), âm khi $f_{xx}<0$ (cực đại).`,
            R`Nếu $D<0$ thì hai hệ số trái dấu: biểu thức dương theo một hướng và âm theo hướng khác, tức điểm yên. Nếu $f_{xx}=0$ thì $D=-f_{xy}^2<0$ và dạng bậc hai $2f_{xy}hk+f_{yy}k^2$ vẫn đổi dấu vì $f_{xy}\neq0$. Với $D\neq0$, dạng bậc hai khác $0$ theo mọi hướng nên trội hơn phần dư $o(h^2+k^2)$ (dạng xác định thì $\ge m(h^2+k^2)$ với $m>0$). Khi $D=0$ số hạng bậc hai có thể bằng $0$ theo một hướng và phải xét các số hạng bậc cao hơn.`,
          ],
        },
        {
          kind: "dinh-ly", title: "Điều kiện Lagrange",
          text: R`Nếu $f$ đạt cực trị tại một điểm của đường $g(x;y)=c$, và $\nabla g\neq\vec{0}$ tại đó, thì tồn tại số $\lambda$ để $\nabla f=\lambda\nabla g$.`,
          suy: [
            R`Gần điểm đó, đường $g=c$ là một đường cong trơn, ta tham số hóa thành $\mathbf{r}(t)$ với $\mathbf{r}'(t_0)\neq\vec{0}$. Hàm $h(t)=f(\mathbf{r}(t))$ đạt cực trị tại $t_0$ nên $h'(t_0)=0$.`,
            R`Theo quy tắc hàm hợp, $h'(t_0)=\nabla f\cdot\mathbf{r}'(t_0)=0$: $\nabla f$ vuông góc với tiếp tuyến của đường ràng buộc.`,
            R`Mặt khác $g(\mathbf{r}(t))=c$ nên $\nabla g\cdot\mathbf{r}'(t_0)=0$, tức $\nabla g$ cũng vuông góc với tiếp tuyến. Trong mặt phẳng, hai vectơ cùng vuông góc với một vectơ khác $\vec{0}$ thì cùng phương, nên $\nabla f=\lambda\nabla g$.`,
          ],
        },
        {
          kind: "cach-lam", title: "Tìm cực trị có điều kiện",
          text: R`Giải hệ gồm $f_x=\lambda g_x$, $f_y=\lambda g_y$ và ràng buộc $g=c$, được các điểm ứng viên. Tính $f$ tại từng điểm ứng viên rồi so sánh. Nếu miền ràng buộc đóng và bị chặn, giá trị lớn nhất và nhỏ nhất thật sự nằm trong số đó.`,
        },
        {
          kind: "vi-du",
          text: R`Tìm giá trị nhỏ nhất của $x^2+y^2$ trên đường $x+y=2$. Ta có $\nabla f=(2x;2y)=\lambda(1;1)$ nên $x=y$, và ràng buộc cho $x=y=1$. Giá trị nhỏ nhất là $2$, tại $(1;1)$. Với $f=x^2-y^2$ có $\nabla f=(0;0)$ tại gốc, Hessian $\begin{pmatrix}2&0\\0&-2\end{pmatrix}$ có $D=-4<0$ nên gốc là điểm yên.`,
        },
        { kind: "luu-y", text: R`Điều kiện $\nabla f=\lambda\nabla g$ chỉ là điều kiện cần. Các điểm tìm được là ứng viên, và phải so sánh giá trị hoặc dùng miền đóng bị chặn để biết điểm nào thật sự là cực đại hay cực tiểu.` },
      ],
    },
    {
      title: "Tích phân bội và ứng dụng",
      items: [
        {
          kind: "cong-thuc", title: "Định lí Fubini cho hình chữ nhật",
          text: R`Nếu $f$ liên tục trên hình chữ nhật $[a;b]\times[c;d]$ thì $\iint f\,dA=\int_a^b\left(\int_c^d f(x;y)\,dy\right)dx=\int_c^d\left(\int_a^b f(x;y)\,dx\right)dy$.`,
          suy: [
            R`Chia hình chữ nhật thành lưới ô nhỏ, tổng Riemann là $\sum_i\sum_j f(x_i;y_j)\,\Delta x\,\Delta y$, gồm một số hữu hạn các số hạng.`,
            R`Cộng hữu hạn số hạng thì được cộng theo hàng trước hay theo cột trước đều cho cùng kết quả. Cho các ô co lại, cộng theo $j$ trước cho tích phân theo $y$ trong ngoặc, còn cộng theo $i$ trước cho tích phân theo $x$, nên hai tích phân lặp bằng nhau. Việc chuyển giới hạn hợp lệ vì $f$ liên tục trên hình chữ nhật đóng nên liên tục đều, và tổng theo $y$ hội tụ đều theo $x$.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Tọa độ cực",
          text: R`Với $x=r\cos\theta$, $y=r\sin\theta$, yếu tố diện tích là $dA=r\,dr\,d\theta$, và $\iint_D f\,dA=\iint f(r\cos\theta;r\sin\theta)\,r\,dr\,d\theta$.`,
          suy: [
            R`Một ô cực nằm giữa hai bán kính $r$ và $r+dr$ và giữa hai góc $\theta$ và $\theta+d\theta$ là hiệu hai hình quạt, diện tích $\frac12\left((r+dr)^2-r^2\right)d\theta=\left(r\,dr+\frac12dr^2\right)d\theta$.`,
            R`Khi $dr$ rất nhỏ, số hạng $\frac12dr^2$ nhỏ hơn hẳn số hạng $r\,dr$ và biến mất trong giới hạn, còn lại $r\,dr\,d\theta$. Ô gần như hình chữ nhật có hai cạnh $dr$ và $r\,d\theta$.`,
          ],
        },
        {
          kind: "dinh-ly", title: "Tích phân Gauss",
          text: R`Diện tích dưới đường chuông thỏa $\int_{-\infty}^{\infty}e^{-x^2}\,dx=\sqrt{\pi}$.`,
          suy: [
            R`Với $L>0$ đặt $I_L=\int_{-L}^{L}e^{-x^2}dx$. Theo định lí Fubini cho hình vuông $[-L;L]^2$, $I_L^2=\iint_{[-L;L]^2}e^{-(x^2+y^2)}\,dx\,dy$.`,
            R`Hình vuông này nằm giữa hình tròn bán kính $L$ và hình tròn bán kính $L\sqrt2$. Hàm dưới dấu dương nên $\iint_{D_L}\le I_L^2\le\iint_{D_{L\sqrt2}}$, với $D_\rho$ là hình tròn tâm gốc bán kính $\rho$.`,
            R`Trong tọa độ cực, $\iint_{D_\rho}e^{-r^2}dA=\int_0^{2\pi}\int_0^{\rho}e^{-r^2}r\,dr\,d\theta=2\pi\cdot\frac{1-e^{-\rho^2}}{2}=\pi\left(1-e^{-\rho^2}\right)$, vì $-\frac12e^{-r^2}$ là một nguyên hàm của $e^{-r^2}r$.`,
            R`Hai cận $\pi(1-e^{-L^2})$ và $\pi(1-e^{-2L^2})$ cùng tiến về $\pi$ khi $L\to\infty$. Theo nguyên lí kẹp, $I_L^2\to\pi$, và $I=\lim I_L=\sqrt{\pi}$ vì $I_L>0$.`,
          ],
        },
        {
          kind: "cach-lam", title: "Hạ gradient",
          text: R`Để tìm điểm làm $f$ nhỏ nhất, xuất phát từ một điểm rồi lặp $(x;y)\leftarrow(x;y)-\eta\,\nabla f(x;y)$ với $\eta>0$ là bước học. Mỗi lần ta đi một đoạn ngắn theo hướng xuống dốc nhanh nhất. Bước $\eta$ quá lớn thì nhảy qua đáy và dao động, quá nhỏ thì tới đáy rất chậm.`,
        },
        {
          kind: "vi-du",
          text: R`Với $f=x^2+3y^2$ có $\nabla f=(2x;6y)$. Xuất phát từ $(4;2)$ với $\eta=0{,}1$, $\nabla f=(8;12)$, bước một tới $(4-0{,}8;2-1{,}2)=(3{,}2;0{,}8)$. Giá trị $f$ giảm từ $28$ xuống $12{,}16$, và các bước tiếp theo dần tới điểm cực tiểu $(0;0)$.`,
        },
        {
          kind: "vi-du",
          text: R`Tích phân $\iint xy\,dA$ trên $[0;1]\times[0;2]$ bằng $\int_0^1x\,dx\cdot\int_0^2y\,dy=\frac12\cdot2=1$. Để tính $\iint_D e^{-(x^2+y^2)}dA$ trên hình tròn bán kính $1$, đổi sang tọa độ cực được $2\pi\int_0^1e^{-r^2}r\,dr=\pi\left(1-e^{-1}\right)$.`,
        },
        { kind: "luu-y", text: R`Khi đổi sang tọa độ cực phải nhớ nhân thêm $r$ của yếu tố diện tích. Bỏ quên $r$ là lỗi hay gặp: tích phân $\iint e^{-r^2}\,dr\,d\theta$ khác hẳn $\iint e^{-r^2}\,r\,dr\,d\theta$.` },
      ],
    },
  ],
  canNho: [
    R`Dãy hội tụ về $L$ nghĩa là mọi khoảng quanh $L$ cuối cùng chứa trọn đuôi của dãy; giới hạn là duy nhất, và kẹp giữa hai dãy cùng giới hạn thì có cùng giới hạn.`,
    R`Chuỗi hình học $\sum q^k=\frac{1}{1-q}$ khi $|q|<1$. Số hạng phải tiến về $0$ để chuỗi hội tụ, nhưng chưa đủ: chuỗi điều hòa phân kì.`,
    R`Tiêu chuẩn tỉ số: giới hạn của $\left|\frac{a_{k+1}}{a_k}\right|$ nhỏ hơn $1$ thì hội tụ, lớn hơn $1$ thì phân kì.`,
    R`Hệ số Taylor là $\frac{f^{(k)}(a)}{k!}$; phần dư Lagrange $\frac{f^{(n+1)}(c)}{(n+1)!}(x-a)^{n+1}$ cho sai số của xấp xỉ.`,
    R`Gradient $\nabla f=(f_x;f_y)$ chỉ hướng tăng nhanh nhất với tốc độ $|\nabla f|$, vuông góc với đường đồng mức.`,
    R`Điểm dừng có $\nabla f=\vec{0}$; với $D=f_{xx}f_{yy}-f_{xy}^2$: $D>0$ là cực trị (dấu $f_{xx}$ cho cực tiểu hay cực đại), $D<0$ là điểm yên.`,
    R`Cực trị có điều kiện $g=c$: giải $\nabla f=\lambda\nabla g$ cùng với ràng buộc, rồi so sánh các giá trị.`,
    R`Fubini cho phép tính tích phân bội bằng hai tích phân lặp; tọa độ cực thêm yếu tố $r$; hạ gradient lặp $\mathbf{x}\leftarrow\mathbf{x}-\eta\nabla f$.`,
  ],
  lienQuan: [
    { id: "limit", vi: R`Định nghĩa ε–δ làm chặt khái niệm giới hạn học ở THPT, và các quy tắc kẹp, duy nhất là bản chính xác của nhận xét trực giác.` },
    { id: "derivative", vi: R`Đạo hàm riêng và gradient là đạo hàm một biến áp dụng từng hướng; phần dư Taylor dùng định lí giá trị trung bình.` },
    { id: "integral", vi: R`Tích phân bội là tích phân từng lớp; tích phân Gauss dùng đổi biến sang tọa độ cực.` },
    { id: "sequence", vi: R`Chuỗi hình học là tổng cấp số nhân lùi vô hạn, và chuỗi nói chung là giới hạn của dãy tổng riêng.` },
  ],
  checks: [
    { expr: "5/Rational(1,100)-3", expect: "497" },
    { expr: "limit((2*n+1)/(n+3), n, oo)", expect: "2" },
    { expr: "simplify((2*n+1)/(n+3)-2+5/(n+3))", expect: "0" },
    { expr: "simplify((1+q+q**2+q**3)*(1-q)-(1-q**4))", expect: "0" },
    { expr: "solve(s-1-q*s, s)[0]", expect: "1/(1-q)" },
    { expr: "summation(1/2**k, (k,0,oo))", expect: "2" },
    { expr: "summation(k/2**k, (k,1,oo))", expect: "2" },
    { expr: "summation(1/k**2, (k,1,oo))", expect: "pi**2/6" },
    { expr: "limit(((k+1)/2**(k+1))/(k/2**k), k, oo)", expect: "1/2" },
    { expr: "Rational(1,3)+Rational(1,4)-Rational(1,2)", expect: "1/12" },
    { expr: "simplify(diff(f(t)+diff(f(t),t)*(x-t)+diff(f(t),t,2)*(x-t)**2/2,t)-diff(f(t),t,3)*(x-t)**2/2)", expect: "0" },
    { expr: "simplify(integrate((x-t)**2/2,(t,a,x))-(x-a)**3/6)", expect: "0" },
    { expr: "1+Rational(1,2)+Rational(1,8)+Rational(1,48)", expect: "79/48" },
    { expr: "Rational(2,24*16)", expect: "1/192" },
    { expr: "series(exp(x), x, 0, 4).removeO()", expect: "1+x+x**2/2+x**3/6" },
    { expr: "series(sin(x), x, 0, 6).removeO()", expect: "x-x**3/6+x**5/120" },
    { expr: "series(cos(x), x, 0, 5).removeO()", expect: "1-x**2/2+x**4/24" },
    { expr: "series(log(1+x), x, 0, 5).removeO()", expect: "x-x**2/2+x**3/3-x**4/4" },
    { expr: "diff(x**2*y, x).subs({x:1,y:2})", expect: "4" },
    { expr: "diff(x**2*y, y).subs({x:1,y:2})", expect: "1" },
    { expr: "(4*4+1*1)/sqrt(17)", expect: "sqrt(17)" },
    { expr: "simplify(p*h**2+2*q*h*k+r*k**2-(p*(h+q*k/p)**2+(p*r-q**2)/p*k**2))", expect: "0" },
    { expr: "Matrix([[2,0],[0,-2]]).det()", expect: "-4" },
    { expr: "solve([2*x-l, 2*y-l, x+y-2], [x,y,l])", expect: "{x: 1, y: 1, l: 2}" },
    { expr: "expand(((r+d)**2-r**2)/2-(r*d+d**2/2))", expect: "0" },
    { expr: "integrate(exp(-r**2)*r, (r,0,oo))", expect: "1/2" },
    { expr: "integrate(exp(-x**2), (x,-oo,oo))", expect: "sqrt(pi)" },
    { expr: "integrate(x*y, (x,0,1), (y,0,2))", expect: "1" },
    { expr: "2*pi*integrate(exp(-r**2)*r, (r,0,1))", expect: "pi*(1-exp(-1))" },
    { expr: "4-Rational(1,10)*2*4", expect: "16/5" },
    { expr: "2-Rational(1,10)*6*2", expect: "4/5" },
    { expr: "Rational(16,5)**2+3*Rational(4,5)**2", expect: "304/25" },
    { expr: "4**2+3*2**2", expect: "28" },
  ],
};
