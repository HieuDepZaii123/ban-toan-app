import type { TopicKnowledge } from "./types.ts";

const R = String.raw;

export const limitKnowledge: TopicKnowledge = {
  id: "limit",
  tongQuat: {
    la: R`Giới hạn của hàm số $f$ khi $x$ tiến tới $a$ là giá trị mà $f(x)$ tiến sát khi $x$ tiến sát $a$ từ cả hai phía, với $x\neq a$. Giới hạn của dãy số $u_n$ khi $n$ tăng vô hạn là giá trị mà các số hạng tiến sát. Giá trị của hàm tại chính điểm $a$ không quyết định giới hạn.`,
    dungDe: R`Xử lý những chỗ không thể thay số trực tiếp, chẳng hạn $\frac{0}{0}$ hoặc $\frac{\infty}{\infty}$, và mô tả xu hướng dài hạn như dân số, nồng độ thuốc trong máu. Trong bài thi, chuyên đề cho bài tính giới hạn dạng vô định, tìm tiệm cận, xét tính liên tục, và tìm tham số để hàm liên tục.`,
    lienHe: R`Đạo hàm là giới hạn của tỉ số $\frac{f(a+h)-f(a)}{h}$, tích phân là giới hạn của tổng diện tích các hình chữ nhật, và tổng cấp số nhân vô hạn là giới hạn của $S_n$. Tiệm cận trong khảo sát hàm số cũng là giới hạn ở vô cực.`,
  },
  tuDau: [
    R`Đứng cách bức tường $1$ mét. Mỗi bước, bạn đi đúng một nửa quãng đường còn lại: còn $\frac{1}{2}$ mét, rồi $\frac{1}{4}$, rồi $\frac{1}{8}$. Bạn không bao giờ chạm tường, nhưng muốn đứng gần tường đến mức nào cũng được, chỉ cần đi đủ nhiều bước. Ta nói khoảng cách tới tường «có giới hạn bằng $0$».`,
    R`Giới hạn là con số mà một đại lượng tiến sát tới, sát bao nhiêu cũng được, dù có thể không bao giờ chạm đúng con số đó. Điều quan trọng không phải là «đến nơi», mà là «muốn gần cỡ nào cũng làm được». Nhờ ý tưởng ấy ta nói được chính xác về những thứ rất nhỏ và rất lớn mà không cần coi «vô cùng» là một con số.`,
    R`Vì sao cần giới hạn? Vì có những phép tính không thể làm trực tiếp. Tốc độ đúng tại một thời điểm là quãng đường chia thời gian khi thời gian bằng $0$, tức $0$ chia $0$, vô nghĩa. Nhưng ta có thể tính tốc độ trên một giây, một phần mười giây, một phần nghìn giây, rồi xem các con số đó tiến sát tới đâu. Con số ấy là giới hạn.`,
    R`Cách làm việc với giới hạn luôn giống nhau: thử thay số; nếu ra một con số bình thường thì đó là đáp số. Nếu ra thứ vô nghĩa như $0$ chia $0$ thì biến đổi biểu thức, thường là rút gọn nhân tử gây rắc rối, rồi thay số lại. Phần còn lại của chuyên đề nói về các cách biến đổi ấy và lý do chúng đúng.`,
  ],
  kyHieu: [
    { kh: R`$\lim$`, doc: R`Viết tắt của «limit», nghĩa là giới hạn: con số mà biểu thức đứng sau tiến sát tới.` },
    { kh: R`$x\to a$`, doc: R`Đọc là «x tiến tới a»: cho $x$ lấy các giá trị ngày càng gần $a$ nhưng không bằng $a$.` },
    { kh: R`$+\infty$`, doc: R`Đọc là «dương vô cực». Đây không phải một con số, mà là cách nói «lớn hơn mọi số cho trước».` },
    { kh: R`$x\to a^{+}$`, doc: R`Cho $x$ tiến tới $a$ chỉ từ bên phải, tức với các giá trị lớn hơn $a$. Dấu trừ ở trên nghĩa là từ bên trái.` },
    { kh: R`$|u_n-L|$`, doc: R`Khoảng cách trên trục số giữa số hạng $u_n$ và số $L$.` },
    { kh: R`$\frac{0}{0}$`, doc: R`Không phải phép chia thật, mà là nhãn dán cho tình huống cả tử lẫn mẫu cùng tiến về $0$.` },
    { kh: R`$\varepsilon$`, doc: R`Chữ Hy Lạp «ép-xi-lon», quen dùng để chỉ một số dương nhỏ tùy ý.` },
  ],
  canBiet: [
    R`Hàm số, đồ thị và các phép biến đổi phân thức, nhân liên hợp.`,
    R`Phân tích đa thức thành nhân tử.`,
    R`Dãy số và cấp số nhân với công bội $q$.`,
  ],
  sections: [
    {
      title: "Giới hạn của dãy số",
      items: [
        {
          kind: "dinh-nghia", title: "Dãy có giới hạn",
          text: R`Dãy $(u_n)$ có giới hạn $L$, viết $\lim u_n=L$, nếu khoảng cách $|u_n-L|$ nhỏ tùy ý khi $n$ đủ lớn. Dãy có giới hạn hữu hạn gọi là dãy hội tụ, dãy không có giới hạn hữu hạn gọi là dãy phân kì.`,
          de: R`Dãy có giới hạn $L$ nếu các số hạng ngày càng dồn sát về $L$. Phép thử là thế này: ai đó đưa ra một sai số nhỏ bao nhiêu cũng được, chẳng hạn một phần triệu; ta phải chỉ ra được một vị trí trong dãy mà từ đó trở đi mọi số hạng đều cách $L$ ít hơn sai số ấy. Làm được với mọi sai số thì $L$ là giới hạn.`,
        },
        {
          kind: "tinh-chat", title: "Các giới hạn cơ bản",
          text: R`Có $\lim c=c$ với hằng số $c$, $\lim\frac{1}{n^k}=0$ với $k>0$ và $\lim q^n=0$ khi $|q|<1$. Từ đây tính được hầu hết giới hạn của dãy phân thức.`,
          suy: [
            R`Dãy hằng $c,c,c,\dots$ luôn cách $c$ đúng $0$, nên giới hạn là $c$.`,
            R`Với $\frac{1}{n}$: muốn $\frac{1}{n}$ nhỏ hơn một phần nghìn thì chỉ cần $n>1000$; muốn nhỏ hơn một sai số $\varepsilon$ bất kì thì chỉ cần $n>\frac{1}{\varepsilon}$. Lúc nào cũng làm được, nên giới hạn là $0$. Với $\frac{1}{n^k}$ cũng vậy vì $n^k$ lớn tùy ý khi $n$ lớn.`,
            R`Với $q^n$ khi $0<|q|<1$: viết $|q|=\frac{1}{1+h}$ với $h>0$. Mỗi lần nhân thêm $(1+h)$ thì tăng ít nhất $h$, nên $(1+h)^n\ge 1+nh$. Do đó $|q|^n\le\frac{1}{1+nh}$, và vế phải nhỏ tùy ý khi $n$ lớn.`,
          ],
        },
        {
          kind: "dinh-ly", title: "Dãy đơn điệu bị chặn",
          text: R`Dãy tăng và bị chặn trên thì có giới hạn, dãy giảm và bị chặn dưới thì có giới hạn. Định lí này cho biết giới hạn tồn tại mà chưa cần biết nó bằng bao nhiêu.`,
          suy: [
            R`Hình ảnh: các số hạng chỉ đi về bên phải trên trục số, nhưng có một bức tường $M$ không vượt qua được. Chúng buộc phải dồn lại ở đâu đó trước bức tường.`,
            R`Trong tất cả các bức tường chắn được dãy, có một bức đứng sát dãy nhất, gọi là $L$. Sự tồn tại của $L$ là tính chất «không có lỗ hổng» của trục số thực, được công nhận làm nền móng chứ không chứng minh ở mức này.`,
            R`Lấy một sai số $\varepsilon>0$. Số $L-\varepsilon$ không còn chắn được dãy, vì $L$ là bức tường sát nhất, nên có một số hạng $u_N$ vượt qua $L-\varepsilon$. Dãy tăng nên mọi số hạng sau đó nằm giữa $L-\varepsilon$ và $L$, tức cách $L$ ít hơn $\varepsilon$. Vậy giới hạn của dãy là $L$.`,
          ],
          suyKhac: [
            {
              cach: "Bằng đoạn lồng nhau",
              buoc: [
                R`Giả sử $u_n$ tăng và $u_n\le M$ với mọi $n$. Đặt $A_0=u_1$ và $B_0=M$. Ta xây các đoạn $[A_k;B_k]$ sao cho $B_k$ luôn là cận trên của dãy và từ một chỉ số $N_k$ trở đi mọi số hạng đều nằm trong đoạn.`,
                R`Từ $[A_k;B_k]$, lấy điểm giữa $m$. Nếu có số hạng $u_N>m$ thì vì dãy tăng, mọi số hạng sau đó đều lớn hơn $m$: lấy $[A_{k+1};B_{k+1}]=[m;B_k]$. Nếu không, mọi số hạng đều không vượt $m$, và $m$ là cận trên mới: lấy $[A_k;m]$.`,
                R`Các đoạn lồng nhau, độ dài $\frac{M-u_1}{2^k}$ tiến về $0$, nên theo tính chất «không có lỗ hổng» (được công nhận) chúng co về đúng một điểm $L$. Với $\varepsilon>0$, chọn $k$ để độ dài nhỏ hơn $\varepsilon$.`,
                R`Từ chỉ số $N_k$ mọi số hạng nằm trong đoạn thứ $k$, mà đoạn này chứa $L$ và có độ dài nhỏ hơn $\varepsilon$, nên $|u_n-L|<\varepsilon$ khi $n\ge N_k$. Vậy dãy có giới hạn $L$. Cách này dùng phép chia đôi, khác với cách chọn cận trên nhỏ nhất; ở nhánh đầu có thể lấy $N_{k+1}=\max(N_k,N)$. Với dãy giảm bị chặn dưới, áp dụng cho dãy $-u_n$.`,
              ],
            },
          ],
        },
        {
          kind: "cong-thuc", title: "Giới hạn vô cực",
          text: R`$\lim n^k=+\infty$ với $k>0$ và $\lim q^n=+\infty$ khi $q>1$. Nếu $\lim u_n=+\infty$ thì $\lim\frac{1}{u_n}=0$.`,
          suy: [
            R`Nói giới hạn là $+\infty$ nghĩa là: cho trước số $M$ lớn bao nhiêu, từ một lúc nào đó mọi số hạng đều vượt $M$. Với $n^k$, chỉ cần $n$ lớn hơn căn bậc $k$ của $M$.`,
            R`Với $q>1$, viết $q=1+h$ với $h>0$. Như ở mục trước, $q^n\ge 1+nh$, và vế phải vượt mọi $M$ khi $n$ đủ lớn.`,
            R`Nếu $u_n$ lớn hơn $M$ thì $\frac{1}{u_n}$ nhỏ hơn $\frac{1}{M}$. Số $M$ lớn tùy ý nên $\frac{1}{u_n}$ nhỏ tùy ý, tức tiến về $0$.`,
          ],
        },
        { kind: "cach-lam", title: "Dãy phân thức theo chỉ số", text: R`Chia cả tử và mẫu cho lũy thừa cao nhất của $n$ rồi dùng các giới hạn cơ bản. Bậc tử nhỏ hơn bậc mẫu thì giới hạn bằng $0$, bằng nhau thì bằng tỉ số các hệ số cao nhất, lớn hơn thì ra vô cực.` },
        { kind: "luu-y", text: R`Dãy $(-1)^n$ nhận lần lượt các giá trị $-1,1,-1,1,\dots$ nên không có giới hạn. Một dãy bị chặn vẫn có thể phân kì, vì bị chặn chưa đủ, còn cần đơn điệu.` },
        { kind: "vi-du", text: R`$\lim\frac{2n+1}{n}=\lim\left(2+\frac{1}{n}\right)=2$. $\lim\frac{3n^2+1}{n^2-2n}=\lim\frac{3+\frac{1}{n^2}}{1-\frac{2}{n}}=3$. Dãy $\left(\frac{1}{2}\right)^n$ tiến về $0$ vì $q=\frac{1}{2}$ có $|q|<1$.` },
      ],
    },
    {
      title: "Giới hạn của hàm số tại một điểm",
      items: [
        {
          kind: "dinh-nghia", title: "Giới hạn tại một điểm",
          text: R`Nói $\lim_{x\to a}f(x)=L$ khi $f(x)$ tiến sát $L$ lúc $x$ tiến sát $a$ từ cả hai phía, với $x\neq a$. Hàm không cần xác định tại $a$, vì giới hạn chỉ quan tâm các điểm lân cận.`,
          de: R`Hãy che điểm $a$ lại và chỉ nhìn đồ thị ở hai bên. Nếu từ cả hai bên đường cong cùng chạy về một độ cao $L$ thì $L$ là giới hạn. Tại chính điểm $a$, hàm có thể không tính được, hoặc nhận một giá trị khác hẳn; giới hạn không quan tâm điều đó, nó chỉ hỏi «đường cong đang hướng tới đâu».`,
        },
        {
          kind: "dinh-ly", title: "Giới hạn một bên",
          text: R`Giới hạn $\lim_{x\to a}f(x)$ tồn tại khi và chỉ khi giới hạn trái và giới hạn phải tồn tại và bằng nhau. Nếu hai giới hạn một bên khác nhau thì giới hạn không tồn tại.`,
          suy: [
            R`Chiều thuận: nếu $f(x)$ sát $L$ khi $x$ gần $a$ từ bất kì phía nào, thì nói riêng khi $x$ đến từ bên trái nó sát $L$, và khi đến từ bên phải nó cũng sát $L$.`,
            R`Chiều ngược: mọi $x$ gần $a$ đều nằm bên trái hoặc bên phải $a$. Nếu ở cả hai bên $f(x)$ đều sát $L$ thì với mọi $x$ gần $a$, giá trị $f(x)$ sát $L$.`,
            R`Nếu bên trái tiến về $L_1$ còn bên phải tiến về $L_2$ khác $L_1$, thì không có một số nào mà $f(x)$ cùng sát tới từ cả hai phía, nên giới hạn không tồn tại.`,
          ],
          suyKhac: [
            {
              cach: "Dạng ε–δ chặt chẽ của cách thứ nhất",
              buoc: [
                R`Chiều thuận: nếu $\lim_{x\to a}f(x)=L$ thì với mỗi $\varepsilon>0$ có $\delta>0$ để mọi $x$ với $0<|x-a|<\delta$ đều cho $|f(x)-L|<\varepsilon$. Các $x$ trong $(a-\delta;a)$ và trong $(a;a+\delta)$ đều thỏa điều đó, nên giới hạn trái và giới hạn phải đều bằng $L$.`,
                R`Chiều ngược: giả sử giới hạn trái và phải cùng bằng $L$. Với $\varepsilon>0$ có $\delta_1$ sao cho $|f(x)-L|<\varepsilon$ khi $a-\delta_1<x<a$, và có $\delta_2$ sao cho điều đó đúng khi $a<x<a+\delta_2$. Lấy $\delta=\min\{\delta_1,\delta_2\}$.`,
                R`Mọi $x$ với $0<|x-a|<\delta$ đều nằm trong một trong hai khoảng trên nên $|f(x)-L|<\varepsilon$. Đó đúng là định nghĩa $\lim_{x\to a}f(x)=L$.`,
                R`Nếu giới hạn trái là $L_1$ và giới hạn phải là $L_2\neq L_1$ mà giới hạn $L$ tồn tại thì theo chiều thuận cả hai đều bằng $L$, mâu thuẫn. Vậy khi hai giới hạn một bên khác nhau thì không có giới hạn. Cách này không đưa ra hướng mới, chỉ viết lại lập luận trên bằng ngôn ngữ ε–δ của định nghĩa.`,
              ],
            },
          ],
        },
        {
          kind: "dinh-ly", title: "Quy tắc tính",
          text: R`Nếu $\lim f=L$ và $\lim g=M$ thì $\lim(f\pm g)=L\pm M$, $\lim(fg)=LM$ và $\lim\frac{f}{g}=\frac{L}{M}$ khi $M\neq 0$. Cũng có $\lim\sqrt{f}=\sqrt{L}$ khi $L\ge 0$.`,
          suy: [
            R`Viết $f=L+p$ và $g=M+q$, trong đó $p$ và $q$ là hai sai số, nhỏ tùy ý khi $x$ đủ gần $a$.`,
            R`Tổng: $f+g=(L+M)+(p+q)$. Tổng của hai số nhỏ tùy ý vẫn nhỏ tùy ý, nên $f+g$ tiến về $L+M$. Với hiệu cũng vậy.`,
            R`Tích: $fg=LM+(Lq+Mp+pq)$. Trong ngoặc, mỗi số hạng là một số cố định nhân với một sai số, hoặc tích của hai sai số, nên cả ngoặc nhỏ tùy ý. Vậy $fg$ tiến về $LM$.`,
            R`Thương: $\frac{1}{g}-\frac{1}{M}=\frac{-q}{M(M+q)}$. Vì $M\neq 0$, mẫu gần $M^2$ nên không gần $0$, còn tử nhỏ tùy ý. Vậy $\frac{1}{g}$ tiến về $\frac{1}{M}$, rồi dùng quy tắc tích cho $f\cdot\frac{1}{g}$.`,
            R`Căn, khi $L>0$: $\sqrt{f}-\sqrt{L}=\frac{f-L}{\sqrt{f}+\sqrt{L}}$. Tử nhỏ tùy ý còn mẫu không nhỏ hơn $\sqrt{L}$, nên hiệu nhỏ tùy ý.`,
          ],
          suyKhac: [
            {
              cach: "Bằng định nghĩa ε–δ cho tổng và tích",
              buoc: [
                R`Tổng và hiệu: cho $\varepsilon>0$. Chọn $\delta_1$ để $|f-L|<\frac{\varepsilon}{2}$ và $\delta_2$ để $|g-M|<\frac{\varepsilon}{2}$ khi $0<|x-a|<\delta$ với $\delta=\min\{\delta_1,\delta_2\}$. Khi đó $|(f\pm g)-(L\pm M)|\le|f-L|+|g-M|<\varepsilon$.`,
                R`Tích: viết $fg-LM=f\,(g-M)+M\,(f-L)$. Chọn $\delta_0$ để $|f-L|<1$, suy ra $|f|<|L|+1$. Rồi chọn $\delta_1$ để $|g-M|<\frac{\varepsilon}{2(|L|+1)}$ và $\delta_2$ để $|f-L|<\frac{\varepsilon}{2(|M|+1)}$.`,
                R`Với $\delta=\min\{\delta_0,\delta_1,\delta_2\}$ và $0<|x-a|<\delta$: $|fg-LM|\le|f|\,|g-M|+|M|\,|f-L|<\frac{\varepsilon}{2}+\frac{\varepsilon}{2}=\varepsilon$. Thương đưa về tích: chọn $\delta$ để $|g-M|<\frac{|M|}{2}$ thì $|g|>\frac{|M|}{2}$ và $\left|\frac{1}{g}-\frac{1}{M}\right|=\frac{|g-M|}{|g||M|}<\frac{2|g-M|}{M^2}$. Chọn thêm $|g-M|<\frac{\varepsilon M^2}{2}$ thì $\left|\frac{1}{g}-\frac{1}{M}\right|<\varepsilon$, rồi dùng quy tắc tích cho $f\cdot\frac{1}{g}$. Căn khi $L>0$: $|\sqrt{f}-\sqrt{L}|\le\frac{|f-L|}{\sqrt{L}}$, nên chọn $|f-L|<\varepsilon\sqrt{L}$.`,
              ],
            },
          ],
        },
        { kind: "cach-lam", title: "Thay trực tiếp", text: R`Nếu $f$ là hàm sơ cấp xác định tại $a$, như đa thức, phân thức có mẫu khác $0$ hoặc hàm căn, thì $\lim_{x\to a}f(x)=f(a)$. Chỉ khi thay số ra dạng vô định mới cần biến đổi.` },
        { kind: "luu-y", text: R`Giá trị tại điểm không quyết định giới hạn. Hàm $f(x)=\frac{x^2-1}{x-1}$ không xác định tại $1$, nhưng khi $x\neq 1$ nó bằng $x+1$ nên giới hạn tại $1$ là $2$.` },
        { kind: "vi-du", text: R`$\lim_{x\to 2}(x^2+3x)=4+6=10$ bằng cách thay số. $\lim_{x\to 1}\frac{x^2-1}{x-1}=\lim_{x\to 1}(x+1)=2$ sau khi rút nhân tử $x-1$.` },
        { kind: "vi-du", text: R`Với $f(x)=\frac{|x|}{x}$, giới hạn trái tại $0$ là $-1$ còn giới hạn phải là $1$, hai số khác nhau nên $\lim_{x\to 0}f(x)$ không tồn tại.` },
      ],
    },
    {
      title: "Các dạng vô định và cách khử",
      items: [
        {
          kind: "dinh-nghia", title: "Dạng vô định",
          text: R`Các dạng $\frac{0}{0}$, $\frac{\infty}{\infty}$, $\infty-\infty$, $0\cdot\infty$ là những biểu thức mà thay số không cho kết quả xác định. Đây không phải kết luận, chỉ báo hiệu phải biến đổi trước khi lấy giới hạn.`,
          de: R`Gọi là «vô định» vì cùng một nhãn mà đáp số mỗi bài một khác. Khi $x$ tiến về $0$, ba biểu thức $\frac{x}{x}$, $\frac{2x}{x}$ và $\frac{x^2}{x}$ đều có tử và mẫu cùng tiến về $0$, nhưng giới hạn lần lượt là $1$, $2$ và $0$. Vì vậy thấy dạng này thì chưa kết luận được gì, phải rút gọn trước.`,
        },
        { kind: "cach-lam", title: "Phân thức dạng không chia không", text: R`Phân tích tử và mẫu thành nhân tử, rút nhân tử chung $(x-a)$ rồi thay số. Nếu tử và mẫu là các đa thức cùng nhận $a$ làm nghiệm thì cả hai chia hết cho $x-a$.` },
        { kind: "cach-lam", title: "Biểu thức có căn dạng không chia không", text: R`Nhân cả tử và mẫu với biểu thức liên hợp của phần có căn, để tạo hiệu hai bình phương rồi rút nhân tử. Chẳng hạn $\lim_{x\to 0}\frac{\sqrt{x+1}-1}{x}=\lim_{x\to 0}\frac{1}{\sqrt{x+1}+1}=\frac{1}{2}$.` },
        { kind: "cach-lam", title: "Dạng vô cực chia vô cực", text: R`Khi $x\to\pm\infty$, chia cả tử và mẫu cho lũy thừa cao nhất của $x$ ở mẫu. Quy tắc bậc tử so với bậc mẫu giống như với dãy số.` },
        { kind: "cach-lam", title: "Dạng vô cực trừ vô cực", text: R`Quy đồng nếu là hiệu các phân thức, hoặc nhân liên hợp nếu có căn. Chẳng hạn $\lim_{x\to+\infty}\left(\sqrt{x^2+x}-x\right)=\lim\frac{x}{\sqrt{x^2+x}+x}=\frac{1}{2}$.` },
        { kind: "luu-y", text: R`Không áp dụng quy tắc giới hạn của thương khi giới hạn của mẫu bằng $0$. Khi tử khác $0$ và mẫu tiến về $0$, kết quả là vô cực chứ không phải dạng vô định.` },
        { kind: "vi-du", text: R`Với $x\to 2$: $\lim\frac{x^2-4}{x-2}=\lim(x+2)=4$. Với $x\to+\infty$: $\lim\frac{2x^2+1}{x^2-3x}=\lim\frac{2+\frac{1}{x^2}}{1-\frac{3}{x}}=2$.` },
      ],
    },
    {
      title: "Giới hạn vô cực và tiệm cận",
      items: [
        {
          kind: "dinh-nghia", title: "Tiệm cận đứng",
          text: R`Đường thẳng $x=a$ là tiệm cận đứng của đồ thị nếu ít nhất một trong hai giới hạn một bên của $f$ tại $a$ là $+\infty$ hoặc $-\infty$. Đồ thị tiến sát đường thẳng này nhưng không cắt nó.`,
          de: R`Tiệm cận đứng là một đường thẳng đứng mà đồ thị lao vọt lên hoặc cắm xuống dọc theo nó. Càng tới gần đường đó, giá trị của hàm càng lớn, lớn hơn mọi con số. Thường đây là chỗ mẫu số bằng $0$ còn tử số thì không.`,
        },
        {
          kind: "dinh-nghia", title: "Tiệm cận ngang",
          text: R`Đường thẳng $y=L$ là tiệm cận ngang nếu $\lim_{x\to+\infty}f(x)=L$ hoặc $\lim_{x\to-\infty}f(x)=L$. Một hàm có thể có hai tiệm cận ngang khác nhau ở hai phía.`,
          de: R`Tiệm cận ngang là một đường thẳng nằm ngang mà đồ thị nằm sát dần khi đi thật xa về bên phải hoặc bên trái. Nó cho biết «về lâu dài» hàm ổn định ở mức nào, giống nhiệt độ cốc nước nóng nguội dần về nhiệt độ phòng.`,
        },
        { kind: "cach-lam", title: "Hàm phân thức hữu tỉ", text: R`Bậc tử nhỏ hơn bậc mẫu thì tiệm cận ngang là $y=0$. Bậc bằng nhau thì tiệm cận ngang là $y$ bằng tỉ số hệ số cao nhất của tử và mẫu. Bậc tử lớn hơn bậc mẫu đúng $1$ thì có tiệm cận xiên.` },
        {
          kind: "cong-thuc", title: "Vô cực quen thuộc",
          text: R`$\lim_{x\to 0}\frac{1}{x^2}=+\infty$ còn $\lim_{x\to 0^{+}}\frac{1}{x}=+\infty$ và $\lim_{x\to 0^{-}}\frac{1}{x}=-\infty$. Dấu của vô cực phụ thuộc phía mà $x$ tiến tới.`,
          suy: [
            R`Thử số: với $x=0{,}1$ thì $\frac{1}{x}=10$, với $x=0{,}001$ thì $\frac{1}{x}=1000$. Số dương $x$ nhỏ tùy ý thì $\frac{1}{x}$ lớn tùy ý: muốn $\frac{1}{x}>M$ chỉ cần $0<x<\frac{1}{M}$. Vậy giới hạn bên phải là $+\infty$.`,
            R`Khi $x$ âm và gần $0$, số $\frac{1}{x}$ âm và có độ lớn tùy ý, nên giới hạn bên trái là $-\infty$.`,
            R`Còn $x^2$ thì dương dù $x$ âm hay dương, nên $\frac{1}{x^2}$ lớn tùy ý và dương từ cả hai phía: giới hạn là $+\infty$.`,
          ],
        },
        { kind: "luu-y", text: R`Không có tiệm cận đứng tại điểm mà giới hạn hữu hạn. Với $\frac{x^2-1}{x-1}$ tại $x=1$, hàm không xác định nhưng giới hạn bằng $2$, nên đồ thị chỉ thủng một điểm.` },
        { kind: "vi-du", text: R`Với $f(x)=\frac{2x+1}{x-1}$: $\lim_{x\to\pm\infty}f(x)=2$ nên $y=2$ là tiệm cận ngang. Tại $x=1$ có $\lim_{x\to 1^{+}}f=+\infty$ và $\lim_{x\to 1^{-}}f=-\infty$ nên $x=1$ là tiệm cận đứng.` },
      ],
    },
    {
      title: "Giới hạn đặc biệt",
      items: [
        {
          kind: "cong-thuc", title: "Giới hạn của sin và tang",
          text: R`$\lim_{x\to 0}\frac{\sin x}{x}=1$ và $\lim_{x\to 0}\frac{\tan x}{x}=1$ khi $x$ tính bằng radian. Còn $\lim_{x\to 0}\frac{1-\cos x}{x^2}=\frac{1}{2}$.`,
          suy: [
            R`Trên đường tròn bán kính $1$, xét góc $x$ nhỏ và dương. So ba hình lồng nhau: tam giác có diện tích $\frac{1}{2}\sin x$ nằm trong hình quạt có diện tích $\frac{1}{2}x$, và hình quạt nằm trong tam giác vuông lớn có diện tích $\frac{1}{2}\tan x$.`,
            R`Vậy $\sin x\le x\le\tan x$. Chia cho số dương $\sin x$ được $1\le\frac{x}{\sin x}\le\frac{1}{\cos x}$, rồi lấy nghịch đảo: $\cos x\le\frac{\sin x}{x}\le 1$.`,
            R`Khi $x$ tiến về $0$ thì $\cos x$ tiến về $1$. Tỉ số $\frac{\sin x}{x}$ bị kẹp giữa hai đại lượng cùng tiến về $1$ nên cũng tiến về $1$. Với $x$ âm tỉ số không đổi vì cả tử và mẫu cùng đổi dấu.`,
            R`Với tang: $\frac{\tan x}{x}=\frac{\sin x}{x}\cdot\frac{1}{\cos x}$, tiến về $1\cdot 1=1$.`,
            R`Với $1-\cos x$: dùng $1-\cos x=2\sin^2\frac{x}{2}$, được $\frac{1-\cos x}{x^2}=\frac{1}{2}\left(\frac{\sin(x/2)}{x/2}\right)^2$, tiến về $\frac{1}{2}\cdot 1^2=\frac{1}{2}$.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Giới hạn của mũ và logarit",
          text: R`$\lim_{x\to 0}\frac{e^x-1}{x}=1$ và $\lim_{x\to 0}\frac{\ln(1+x)}{x}=1$. Hai giới hạn này nói rằng hàm $e^x$ và $\ln(1+x)$ gần giống hàm $x$ khi $x$ rất nhỏ.`,
          suy: [
            R`Xuất phát từ định nghĩa số $e$ ở mục kế tiếp: $\left(1+\frac{1}{n}\right)^n$ tiến về $e$. Kết quả vẫn đúng khi thay $\frac{1}{n}$ bằng một số $x$ nhỏ bất kì, tức $(1+x)^{1/x}$ tiến về $e$ khi $x$ tiến về $0$; bước mở rộng này được công nhận.`,
            R`Đưa số mũ vào trong logarit: $\frac{\ln(1+x)}{x}=\ln\left[(1+x)^{1/x}\right]$. Biểu thức trong ngoặc vuông tiến về $e$, nên cả biểu thức tiến về $\ln e=1$.`,
            R`Với hàm mũ, đặt $t=e^x-1$, tức $x=\ln(1+t)$; khi $x$ tiến về $0$ thì $t$ cũng tiến về $0$. Khi đó $\frac{e^x-1}{x}=\frac{t}{\ln(1+t)}$, là nghịch đảo của biểu thức ở bước trên nên tiến về $1$.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Giới hạn định nghĩa số e",
          text: R`$\lim_{n\to\infty}\left(1+\frac{1}{n}\right)^n=e\approx 2{,}718$. Đây là giới hạn của lãi kép khi chia kì ghép lãi nhỏ vô hạn.`,
          suy: [
            R`Gửi $1$ đồng với lãi $100\%$ một năm. Nếu chia năm thành $n$ kì và nhập lãi sau mỗi kì thì mỗi kì nhân với $1+\frac{1}{n}$, cuối năm có $\left(1+\frac{1}{n}\right)^n$. Với $n=1$ là $2$, với $n=2$ là $2{,}25$, với $n=12$ khoảng $2{,}613$, với $n=365$ khoảng $2{,}7146$.`,
            R`Dãy này tăng, vì nhập lãi càng thường xuyên càng có lợi. Nhưng nó không vượt quá $3$: khai triển bằng nhị thức Newton, số hạng thứ $k$ không vượt quá $\frac{1}{k!}\le\frac{1}{2^{k-1}}$, nên tổng nhỏ hơn $1+1+\frac{1}{2}+\frac{1}{4}+\dots=3$.`,
            R`Dãy tăng và bị chặn trên thì có giới hạn. Giới hạn đó được đặt tên là $e$.`,
          ],
        },
        { kind: "cach-lam", title: "Đặt biến mới", text: R`Nhân và chia để đưa về đúng dạng đặc biệt. Chẳng hạn $\lim_{x\to 0}\frac{\sin 3x}{x}=3\lim_{x\to 0}\frac{\sin 3x}{3x}=3$, vì khi $x\to 0$ thì $3x\to 0$ và ta dùng $\frac{\sin u}{u}\to 1$ với $u=3x$.` },
        { kind: "luu-y", text: R`Giới hạn $\frac{\sin x}{x}\to 1$ chỉ đúng khi $x$ tính bằng radian. Với $x$ tính bằng độ thì giới hạn là $\frac{\pi}{180}$, vì $1^\circ=\frac{\pi}{180}$ rad.` },
        { kind: "vi-du", text: R`$\lim_{x\to 0}\frac{\sin 3x}{x}=3$ và $\lim_{x\to 0}\frac{\tan 2x}{x}=2$. Còn $\lim_{x\to 0}\frac{\sin 5x}{\sin 2x}=\frac{5}{2}$ vì cả tử và mẫu đều tiến về $0$ theo tỉ lệ $5x$ so với $2x$.` },
      ],
    },
    {
      title: "Hàm số liên tục",
      items: [
        {
          kind: "dinh-nghia", title: "Liên tục tại một điểm",
          text: R`Hàm $f$ liên tục tại $a$ nếu $f(a)$ xác định, giới hạn $\lim_{x\to a}f(x)$ tồn tại và hai số này bằng nhau. Nói nôm na là đồ thị không bị đứt hay nhảy tại $a$.`,
          de: R`Hàm liên tục tại một điểm nếu đồ thị đi qua điểm đó mà không phải nhấc bút. Nói cách khác, nơi đường cong đang hướng tới (giới hạn) trùng với nơi nó thực sự ở (giá trị của hàm). Ba kiểu hỏng là: có lỗ thủng, có bước nhảy, hoặc vọt lên vô cực.`,
        },
        {
          kind: "tinh-chat", title: "Hàm sơ cấp liên tục",
          text: R`Đa thức, phân thức, căn thức, hàm sin, cos, mũ và logarit liên tục trên tập xác định của chúng. Tổng, hiệu, tích, thương (khi mẫu khác $0$) và hàm hợp của các hàm liên tục cũng liên tục.`,
          suy: [
            R`Hàm $y=x$ và hàm hằng liên tục: khi $x$ gần $a$ thì dĩ nhiên $x$ gần $a$, còn hằng số thì đứng yên.`,
            R`Theo quy tắc tính giới hạn, giới hạn của tổng, tích, thương bằng tổng, tích, thương các giới hạn. Vậy cộng, nhân, chia các hàm liên tục (mẫu khác $0$) vẫn được hàm liên tục. Đa thức được ghép từ $x$ và hằng số bằng cộng và nhân, phân thức là thương của hai đa thức, nên chúng liên tục.`,
            R`Với sin và cosin, điểm trên đường tròn di chuyển liền mạch nên tọa độ của nó thay đổi liền mạch. Tính liên tục của hàm mũ, logarit và căn được công nhận ở mức này.`,
          ],
        },
        {
          kind: "dinh-ly", title: "Giá trị trung gian",
          text: R`Nếu $f$ liên tục trên $[a;b]$ và $f(a)f(b)<0$ thì phương trình $f(x)=0$ có ít nhất một nghiệm trong khoảng $(a;b)$. Định lí này cho biết có nghiệm mà không cần giải.`,
          suy: [
            R`Hình ảnh: bắt đầu ở dưới mặt nước, kết thúc ở trên mặt nước, và đi một đường liền nét. Thế thì phải có lúc ngang mặt nước.`,
            R`Lập luận bằng cách chia đôi: giả sử $f(a)<0<f(b)$. Xét điểm chính giữa $m$ của đoạn. Nếu $f(m)=0$ thì xong. Nếu không, trong hai nửa đoạn có đúng một nửa mà giá trị ở hai đầu trái dấu; giữ nửa đó và lặp lại.`,
            R`Sau mỗi lần, đoạn ngắn đi một nửa nhưng hai đầu vẫn trái dấu. Các đoạn lồng nhau này co về một điểm $c$, nhờ tính chất «không có lỗ hổng» của trục số.`,
            R`Sát $c$ tùy ý có điểm mà $f$ âm và có điểm mà $f$ dương. Vì $f$ liên tục, $f(c)$ vừa là giới hạn của các giá trị âm nên không dương, vừa là giới hạn của các giá trị dương nên không âm. Vậy $f(c)=0$.`,
          ],
          suyKhac: [
            {
              cach: "Bằng cận trên nhỏ nhất",
              buoc: [
                R`Giả sử $f$ liên tục trên $[a;b]$ và $f(a)<0<f(b)$. Gọi $S$ là tập các $x\in[a;b]$ có $f(x)<0$. Tập $S$ khác rỗng vì $a\in S$ và bị chặn trên bởi $b$, nên có cận trên nhỏ nhất $c=\sup S$ (tính chất «không có lỗ hổng» của trục số, được công nhận).`,
                R`Giả sử $f(c)<0$. Vì $f$ liên tục nên $f$ vẫn âm trên một khoảng quanh $c$, và $c\neq b$ vì $f(b)>0$. Khi đó có điểm lớn hơn $c$ thuộc $S$, trái với việc $c$ là cận trên.`,
                R`Giả sử $f(c)>0$. Do liên tục nên $f>0$ trên một khoảng $(c-\delta;c]$, nên mọi điểm của $S$ đều không lớn hơn $c-\delta$. Khi đó $c-\delta$ là một cận trên nhỏ hơn $c$, trái với việc $c$ là cận trên nhỏ nhất.`,
                R`Vậy $f(c)=0$. Vì $f(a)$ và $f(b)$ đều khác $0$ nên $c$ nằm trong khoảng $(a;b)$. Cách này không chia đôi nhiều lần mà chỉ dùng một điểm $c$ được chọn bằng cận trên nhỏ nhất. Ở các bước trên, «$f$ liên tục và $f(c)\neq 0$ thì $f$ giữ nguyên dấu quanh $c$» suy ra bằng cách lấy $\varepsilon=|f(c)|$. Trường hợp $f(a)>0>f(b)$ thì xét $-f$.`,
              ],
            },
          ],
        },
        { kind: "cach-lam", title: "Tìm tham số để liên tục", text: R`Với hàm cho bằng hai công thức, tính giới hạn trái, giới hạn phải và giá trị tại điểm nối rồi cho ba số đó bằng nhau. Mỗi điều kiện cho một phương trình theo tham số.` },
        { kind: "luu-y", text: R`Liên tục tại một điểm cần cả ba điều kiện. Hàm có giới hạn nhưng không xác định tại điểm đó, hoặc xác định nhưng giá trị lệch giới hạn, đều bị gián đoạn.` },
        { kind: "vi-du", text: R`Hàm bằng $\frac{x^2-1}{x-1}$ khi $x\neq 1$ và bằng $m$ khi $x=1$ có $\lim_{x\to 1}f(x)=2$, nên liên tục tại $1$ khi và chỉ khi $m=2$.` },
        { kind: "vi-du", text: R`Phương trình $x^3+x-1=0$ có nghiệm trong $(0;1)$ vì hàm $f(x)=x^3+x-1$ liên tục, $f(0)=-1<0$ và $f(1)=1>0$.` },
      ],
    },
  ],
  canNho: [
    R`Giới hạn tại $a$ tồn tại khi giới hạn trái và giới hạn phải bằng nhau; giá trị $f(a)$ không quyết định giới hạn.`,
    R`Hàm sơ cấp xác định tại $a$ thì thay trực tiếp; gặp $\frac{0}{0}$ thì phân tích nhân tử hoặc nhân liên hợp.`,
    R`Dạng $\frac{\infty}{\infty}$: chia cho lũy thừa cao nhất; so bậc tử với bậc mẫu.`,
    R`Giới hạn cơ bản của dãy: $\lim\frac{1}{n}=0$ và $\lim q^n=0$ khi $|q|<1$.`,
    R`Tiệm cận ngang từ giới hạn ở vô cực, tiệm cận đứng từ giới hạn một bên bằng vô cực.`,
    R`Giới hạn đặc biệt: $\lim_{x\to 0}\frac{\sin x}{x}=1$, $\lim_{x\to 0}\frac{e^x-1}{x}=1$, $\lim\left(1+\frac{1}{n}\right)^n=e$.`,
    R`Liên tục tại $a$ cần ba điều kiện: xác định, có giới hạn, và hai số đó bằng nhau.`,
    R`Giá trị trung gian: $f$ liên tục trên $[a;b]$ và $f(a)f(b)<0$ thì có nghiệm trong $(a;b)$.`,
  ],
  lienQuan: [
    { id: "derivative", vi: R`Đạo hàm được định nghĩa là giới hạn $\lim_{h\to 0}\frac{f(a+h)-f(a)}{h}$, một dạng $\frac{0}{0}$ điển hình.` },
    { id: "survey", vi: R`Tiệm cận ngang và tiệm cận đứng của đồ thị đều đọc từ giới hạn, và là một bước bắt buộc trong khảo sát hàm số.` },
    { id: "sequence", vi: R`Tổng vô hạn của cấp số nhân là giới hạn của dãy các tổng riêng $S_n$.` },
  ],
  checks: [
    { expr: "simplify((f*g - L*M) - (f*(g-M) + M*(f-L)))", expect: "0" },
    { expr: "simplify((1/g - 1/M) + (g-M)/(g*M))", expect: "0" },
    { expr: "limit((2*n+1)/n, n, oo)", expect: "2" },
    { expr: "limit((3*n**2+1)/(n**2-2*n), n, oo)", expect: "3" },
    { expr: "limit(Rational(1,2)**n, n, oo)", expect: "0" },
    { expr: "limit(1/n, n, oo)", expect: "0" },
    { expr: "2**2+3*2", expect: "10" },
    { expr: "limit((x**2-1)/(x-1), x, 1)", expect: "2" },
    { expr: "limit(Abs(x)/x, x, 0, '-')", expect: "-1" },
    { expr: "limit(Abs(x)/x, x, 0, '+')", expect: "1" },
    { expr: "limit((x**2-4)/(x-2), x, 2)", expect: "4" },
    { expr: "limit((2*x**2+1)/(x**2-3*x), x, oo)", expect: "2" },
    { expr: "limit((sqrt(x+1)-1)/x, x, 0)", expect: "Rational(1,2)" },
    { expr: "limit(sqrt(x**2+x)-x, x, oo)", expect: "Rational(1,2)" },
    { expr: "limit((2*x+1)/(x-1), x, oo)", expect: "2" },
    { expr: "limit((2*x+1)/(x-1), x, -oo)", expect: "2" },
    { expr: "limit((2*x+1)/(x-1), x, 1, '+')", expect: "oo" },
    { expr: "limit((2*x+1)/(x-1), x, 1, '-')", expect: "-oo" },
    { expr: "limit(1/x**2, x, 0)", expect: "oo" },
    { expr: "limit(1/x, x, 0, '-')", expect: "-oo" },
    { expr: "limit(sin(x)/x, x, 0)", expect: "1" },
    { expr: "limit(tan(x)/x, x, 0)", expect: "1" },
    { expr: "limit((1-cos(x))/x**2, x, 0)", expect: "Rational(1,2)" },
    { expr: "limit((exp(x)-1)/x, x, 0)", expect: "1" },
    { expr: "limit(log(1+x)/x, x, 0)", expect: "1" },
    { expr: "limit((1+1/n)**n, n, oo)", expect: "E" },
    { expr: "limit(sin(3*x)/x, x, 0)", expect: "3" },
    { expr: "limit(tan(2*x)/x, x, 0)", expect: "2" },
    { expr: "limit(sin(5*x)/sin(2*x), x, 0)", expect: "Rational(5,2)" },
    { expr: "limit(sin(x*pi/180)/x, x, 0)", expect: "pi/180" },
    { expr: "0**3+0-1", expect: "-1" },
    { expr: "1**3+1-1", expect: "1" },
  ],
};
