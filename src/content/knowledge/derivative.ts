import type { TopicKnowledge } from "./types.ts";

const R = String.raw;

export const derivativeKnowledge: TopicKnowledge = {
  id: "derivative",
  tongQuat: {
    la: R`Đạo hàm của hàm $f$ tại $a$ là hệ số góc của tiếp tuyến với đồ thị tại điểm có hoành độ $a$, và cũng là tốc độ thay đổi tức thời của $f$ tại đó. Theo định nghĩa, nó là giới hạn của hệ số góc cát tuyến khi hai điểm trượt lại gần nhau.`,
    dungDe: R`Tính vận tốc tức thời, tốc độ tăng trưởng và chi phí biên, viết phương trình tiếp tuyến, xét chiều biến thiên của hàm số, và tìm giá trị lớn nhất hoặc nhỏ nhất. Trong bài thi, chuyên đề cho bài tiếp tuyến, bài tìm cực trị, bài tối ưu thực tế, và là công cụ chính của khảo sát hàm số.`,
    lienHe: R`Đạo hàm xây trên giới hạn, nhất là giới hạn dạng $\frac{0}{0}$. Khảo sát hàm số dùng dấu của đạo hàm, còn tích phân là phép toán ngược của đạo hàm. Với hàm bậc hai, đạo hàm cho lại đỉnh của parabol ở chỗ $y'=0$.`,
  },
  tuDau: [
    R`Trên xe máy có hai đồng hồ: một cái đếm quãng đường đã đi, một cái chỉ tốc độ lúc này. Hai con số ấy gắn chặt với nhau: tốc độ cho biết quãng đường đang tăng nhanh hay chậm. Đạo hàm chính là cái đồng hồ tốc độ, nhưng dùng được cho mọi đại lượng đang thay đổi: giá cả, nhiệt độ, dân số, độ cao của một đường cong.`,
    R`Tốc độ trung bình thì dễ: đi $100$ km trong $2$ giờ là $50$ km mỗi giờ. Còn tốc độ «ngay lúc này» thì sao? Trong một khoảnh khắc không có thời gian trôi và cũng không có quãng đường nào, nên phép chia thành $0$ chia $0$. Lối thoát là đo trên những khoảng thời gian ngắn dần, một giây, một phần trăm giây, rồi xem kết quả tiến sát con số nào.`,
    R`Trên đồ thị, tốc độ thay đổi chính là độ dốc. Nối hai điểm của đường cong bằng một đường thẳng, độ dốc của nó là «lên bao nhiêu chia cho sang ngang bao nhiêu». Kéo điểm thứ hai trượt dần về điểm thứ nhất, đường thẳng xoay dần thành đường chỉ chạm đường cong tại một điểm, gọi là tiếp tuyến. Độ dốc của tiếp tuyến là đạo hàm.`,
    R`Biết độ dốc ở mọi điểm là biết hầu hết về đường cong: dốc lên thì hàm đang tăng, dốc xuống thì đang giảm, nằm ngang thì có thể đang ở đỉnh đồi hoặc đáy thung lũng. Nhờ thế, đạo hàm trở thành công cụ để tìm giá trị lớn nhất và nhỏ nhất. Các quy tắc bên dưới giúp tính đạo hàm mà không phải làm lại phép «thu nhỏ dần» mỗi lần.`,
  ],
  kyHieu: [
    { kh: R`$f'(a)$`, doc: R`Đọc là «f phẩy của a»: đạo hàm của hàm $f$ tại điểm $a$, tức độ dốc của đồ thị tại đó.` },
    { kh: R`$h$`, doc: R`Một bước đi ngang nhỏ, khác $0$, từ $a$ sang $a+h$.` },
    { kh: R`$h\to 0$`, doc: R`Cho bước $h$ nhỏ dần về $0$ mà không bao giờ bằng $0$.` },
    { kh: R`$\frac{f(a+h)-f(a)}{h}$`, doc: R`Độ thay đổi của hàm chia cho độ thay đổi của biến: tốc độ thay đổi trung bình trên bước $h$.` },
    { kh: R`$y'$`, doc: R`Đạo hàm của hàm $y$, coi như một hàm mới cho biết độ dốc tại mỗi $x$.` },
    { kh: R`$f''$`, doc: R`Đọc là «f hai phẩy»: đạo hàm của đạo hàm, cho biết độ dốc đang tăng hay giảm.` },
    { kh: R`$f(g(x))$`, doc: R`Hàm hợp: bỏ $x$ vào máy $g$ trước, rồi lấy kết quả bỏ tiếp vào máy $f$.` },
    { kh: R`$\Delta u$`, doc: R`Đọc là «đen-ta u»: lượng thay đổi của $u$ khi $x$ tăng thêm một bước $h$.` },
  ],
  canBiet: [
    R`Giới hạn của hàm số và phép nhân liên hợp.`,
    R`Phương trình đường thẳng $y=kx+m$ và ý nghĩa của hệ số góc $k$.`,
    R`Hàm hợp, hàm mũ, logarit và hàm lượng giác cơ bản.`,
  ],
  sections: [
    {
      title: "Khái niệm và ý nghĩa của đạo hàm",
      items: [
        {
          kind: "dinh-nghia", title: "Đạo hàm tại một điểm",
          text: R`Đạo hàm của $f$ tại $a$ là $f'(a)=\lim_{h\to 0}\frac{f(a+h)-f(a)}{h}$ khi giới hạn này tồn tại hữu hạn. Tử số là độ thay đổi của hàm, mẫu số là độ thay đổi của biến, nên tỉ số là tốc độ thay đổi trung bình trên đoạn có độ dài $h$.`,
          de: R`Đạo hàm tại $a$ trả lời câu hỏi: ngay tại đây, nếu nhích $x$ thêm một chút thì giá trị của hàm thay đổi nhanh gấp mấy lần cái nhích đó? Đạo hàm bằng $3$ nghĩa là hàm đang tăng nhanh gấp ba lần biến; bằng $-2$ nghĩa là hàm đang giảm nhanh gấp đôi; bằng $0$ nghĩa là hàm tạm thời đứng yên.`,
        },
        {
          kind: "tinh-chat", title: "Ý nghĩa hình học",
          text: R`Số $f'(a)$ là hệ số góc của tiếp tuyến với đồ thị tại điểm $(a;f(a))$. Phương trình tiếp tuyến là $y=f'(a)(x-a)+f(a)$.`,
          suy: [
            R`Tỉ số $\frac{f(a+h)-f(a)}{h}$ là độ dốc của đường thẳng đi qua hai điểm của đồ thị ứng với $a$ và $a+h$: tử là phần đi lên, mẫu là phần đi ngang.`,
            R`Khi $h$ tiến về $0$, điểm thứ hai trượt về điểm thứ nhất và đường thẳng xoay dần về tiếp tuyến. Độ dốc của nó tiến về $f'(a)$, nên tiếp tuyến có hệ số góc $f'(a)$.`,
            R`Đường thẳng qua điểm $(a;f(a))$ với độ dốc $k$: đi ngang một đoạn $x-a$ thì lên một đoạn $k(x-a)$, tức $y-f(a)=k(x-a)$. Thay $k=f'(a)$ được phương trình tiếp tuyến.`,
          ],
        },
        {
          kind: "tinh-chat", title: "Ý nghĩa vật lí",
          text: R`Nếu $s(t)$ là quãng đường thì vận tốc tức thời là $v(t)=s'(t)$, và gia tốc là $a(t)=v'(t)$. Đạo hàm theo thời gian là tốc độ thay đổi của một đại lượng.`,
          suy: [
            R`Vận tốc trung bình là quãng đường chia thời gian. Từ lúc $t$ đến lúc $t+h$ vật đi được $s(t+h)-s(t)$, nên vận tốc trung bình là $\frac{s(t+h)-s(t)}{h}$.`,
            R`Thu khoảng thời gian $h$ về $0$ thì được vận tốc đúng tại lúc $t$, và theo định nghĩa đó là $s'(t)$. Gia tốc là tốc độ thay đổi của vận tốc nên lặp lại đúng lập luận này với hàm $v(t)$.`,
          ],
        },
        {
          kind: "dinh-ly", title: "Có đạo hàm thì liên tục",
          text: R`Nếu $f$ có đạo hàm tại $a$ thì $f$ liên tục tại $a$. Điều ngược lại sai: hàm $y=|x|$ liên tục tại $0$ nhưng đồ thị có góc nhọn, giới hạn phải của tỉ số là $1$ còn giới hạn trái là $-1$, nên không có đạo hàm.`,
          suy: [
            R`Viết độ thay đổi của hàm thành một tích: $f(a+h)-f(a)=\frac{f(a+h)-f(a)}{h}\cdot h$.`,
            R`Khi $h$ tiến về $0$, thừa số đầu tiến về số hữu hạn $f'(a)$ còn thừa số sau tiến về $0$, nên tích tiến về $0$. Vậy $f(a+h)$ tiến về $f(a)$, tức hàm liên tục tại $a$.`,
            R`Chiều ngược sai: với $f(x)=|x|$ tại $0$, tỉ số là $\frac{|h|}{h}$, bằng $1$ khi $h>0$ và bằng $-1$ khi $h<0$. Hai phía cho hai độ dốc khác nhau nên không có một tiếp tuyến chung.`,
          ],
          suyKhac: [
            {
              cach: "Bằng định nghĩa ε–δ",
              buoc: [
                R`Cho trước một số $\varepsilon>0$. Vì $\frac{f(a+h)-f(a)}{h}$ tiến về $f'(a)$ khi $h\to 0$, nên có $\delta_1>0$ để mọi $h$ với $0<|h|<\delta_1$ cho $\left|\frac{f(a+h)-f(a)}{h}\right|<|f'(a)|+1$.`,
                R`Nhân hai vế với $|h|$: khi $0<|h|<\delta_1$ thì $|f(a+h)-f(a)|<(|f'(a)|+1)\,|h|$. Độ thay đổi của hàm bị chặn bởi một hằng số nhân với bước $h$.`,
                R`Chọn $\delta=\min\left\{\delta_1,\frac{\varepsilon}{|f'(a)|+1}\right\}$. Khi $0<|h|<\delta$ thì $|f(a+h)-f(a)|<(|f'(a)|+1)\cdot\frac{\varepsilon}{|f'(a)|+1}=\varepsilon$, còn khi $h=0$ thì hiệu bằng $0<\varepsilon$. Đó đúng là định nghĩa $f$ liên tục tại $a$.`,
              ],
            },
          ],
        },
        { kind: "luu-y", text: R`Đạo hàm tại một điểm là một số, còn khi tính ở mọi điểm ta được hàm số $f'(x)$. Đề bài hỏi «đạo hàm tại $x=2$» thì phải thay số vào cuối.` },
        { kind: "vi-du", text: R`Với $f(x)=x^2$ tại $a=1$: $\frac{(1+h)^2-1}{h}=2+h$, và cho $h\to 0$ được $f'(1)=2$. Tiếp tuyến là $y=2(x-1)+1=2x-1$.` },
        { kind: "vi-du", text: R`Một vật rơi có quãng đường $s=5t^2$ mét sau $t$ giây. Vận tốc tức thời là $v=s'=10t$, nên tại $t=2$ giây vận tốc là $20$ m/s.` },
      ],
    },
    {
      title: "Bảng đạo hàm",
      items: [
        {
          kind: "cong-thuc", title: "Hàm đa thức và căn",
          text: R`$(c)'=0$ với hằng số $c$, $(x^n)'=nx^{n-1}$, $(\sqrt{x})'=\frac{1}{2\sqrt{x}}$ và $\left(\frac{1}{x}\right)'=-\frac{1}{x^2}$.`,
          suy: [
            R`Hàm hằng không thay đổi: $f(x+h)-f(x)=c-c=0$, nên tỉ số bằng $0$ và đạo hàm bằng $0$.`,
            R`Với $x^2$: $(x+h)^2-x^2=2xh+h^2$. Chia cho $h$ được $2x+h$, tiến về $2x$ khi $h$ tiến về $0$.`,
            R`Với $x^n$: khai triển $(x+h)^n=x^n+nx^{n-1}h+$ các số hạng chứa $h^2$ trở lên. Trừ $x^n$ rồi chia cho $h$ còn $nx^{n-1}$ cộng các số hạng vẫn chứa $h$; các số hạng này tiến về $0$.`,
            R`Với $\sqrt{x}$: nhân tử và mẫu của $\frac{\sqrt{x+h}-\sqrt{x}}{h}$ với $\sqrt{x+h}+\sqrt{x}$. Tử thành $(x+h)-x=h$, rút gọn với $h$ ở mẫu còn $\frac{1}{\sqrt{x+h}+\sqrt{x}}$, tiến về $\frac{1}{2\sqrt{x}}$.`,
            R`Với $\frac{1}{x}$: $\frac{1}{x+h}-\frac{1}{x}=\frac{-h}{x(x+h)}$. Chia cho $h$ được $\frac{-1}{x(x+h)}$, tiến về $-\frac{1}{x^2}$.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Hàm lượng giác",
          text: R`$(\sin x)'=\cos x$, $(\cos x)'=-\sin x$, $(\tan x)'=\frac{1}{\cos^2x}$ và $(\cot x)'=-\frac{1}{\sin^2x}$. Dấu trừ ở đạo hàm của $\cos$ và $\cot$ là chỗ dễ quên.`,
          suy: [
            R`Dùng công thức cộng: $\sin(x+h)-\sin x=\sin x(\cos h-1)+\cos x\sin h$. Chia cho $h$ được $\sin x\cdot\frac{\cos h-1}{h}+\cos x\cdot\frac{\sin h}{h}$.`,
            R`Hai giới hạn đặc biệt: $\frac{\sin h}{h}$ tiến về $1$, còn $\frac{\cos h-1}{h}=-\frac{1-\cos h}{h^2}\cdot h$ tiến về $-\frac{1}{2}\cdot 0=0$. Vậy $(\sin x)'=\sin x\cdot 0+\cos x\cdot 1=\cos x$.`,
            R`Với cosin, viết $\cos x=\sin\left(\frac{\pi}{2}-x\right)$ rồi dùng quy tắc hàm hợp: $\cos\left(\frac{\pi}{2}-x\right)\cdot(-1)=-\sin x$.`,
            R`Với tang, dùng quy tắc thương cho $\frac{\sin x}{\cos x}$: tử của kết quả là $\cos x\cdot\cos x-\sin x\cdot(-\sin x)=\cos^2x+\sin^2x=1$, nên $(\tan x)'=\frac{1}{\cos^2x}$. Cotang làm tương tự.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Hàm mũ và logarit",
          text: R`$(e^x)'=e^x$, $(a^x)'=a^x\ln a$, $(\ln x)'=\frac{1}{x}$ và $(\log_a x)'=\frac{1}{x\ln a}$.`,
          suy: [
            R`Vì $e^{x+h}=e^x\cdot e^h$ nên $\frac{e^{x+h}-e^x}{h}=e^x\cdot\frac{e^h-1}{h}$. Giới hạn đặc biệt cho $\frac{e^h-1}{h}$ tiến về $1$, nên $(e^x)'=e^x$.`,
            R`Viết $a^x=e^{x\ln a}$ rồi dùng quy tắc hàm hợp: $(a^x)'=e^{x\ln a}\cdot\ln a=a^x\ln a$.`,
            R`Hàm $\ln$ là hàm ngược của hàm mũ: $e^{\ln x}=x$. Lấy đạo hàm hai vế, vế trái theo quy tắc hàm hợp: $e^{\ln x}\cdot(\ln x)'=1$, tức $x\cdot(\ln x)'=1$, nên $(\ln x)'=\frac{1}{x}$.`,
            R`Đổi cơ số $\log_a x=\frac{\ln x}{\ln a}$, hằng số $\frac{1}{\ln a}$ đứng ngoài, được $\frac{1}{x\ln a}$.`,
          ],
        },
        { kind: "luu-y", text: R`Công thức $(x^n)'=nx^{n-1}$ chỉ dùng khi số mũ là hằng số. Với hàm mũ $2^x$ biến nằm ở số mũ, đạo hàm là $2^x\ln 2$ chứ không phải $x\cdot 2^{x-1}$.` },
        { kind: "vi-du", text: R`$(x^5)'=5x^4$, $(3\sqrt{x})'=\frac{3}{2\sqrt{x}}$ và $(\sin x+e^x)'=\cos x+e^x$. Đạo hàm của một tổng là tổng các đạo hàm.` },
      ],
    },
    {
      title: "Quy tắc tính đạo hàm",
      items: [
        {
          kind: "cong-thuc", title: "Tổng và hằng số nhân",
          text: R`$(u\pm v)'=u'\pm v'$ và $(ku)'=k\,u'$ với $k$ là hằng số. Hai quy tắc này cho phép tính đạo hàm của đa thức từng hạng tử một.`,
          suy: [
            R`Khi $x$ tăng một bước $h$, độ thay đổi của $u+v$ bằng độ thay đổi của $u$ cộng độ thay đổi của $v$. Chia cho $h$ rồi cho $h$ tiến về $0$, giới hạn của tổng bằng tổng các giới hạn: $(u+v)'=u'+v'$.`,
            R`Độ thay đổi của $ku$ gấp $k$ lần độ thay đổi của $u$, nên sau khi chia cho $h$ và lấy giới hạn, $(ku)'=ku'$. Nhân một đại lượng lên gấp ba thì tốc độ của nó cũng gấp ba.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Tích",
          text: R`$(uv)'=u'v+uv'$. Mỗi hạng tử giữ nguyên một hàm và lấy đạo hàm hàm còn lại.`,
          suy: [
            R`Coi $u$ và $v$ là hai cạnh của một hình chữ nhật, tích $uv$ là diện tích. Khi $x$ tăng một bước $h$, hai cạnh thành $u+\Delta u$ và $v+\Delta v$. Diện tích tăng thêm ba mảnh: $\Delta u\cdot v$, $u\cdot\Delta v$ và mảnh góc $\Delta u\cdot\Delta v$.`,
            R`Chia phần tăng thêm cho $h$: $\frac{\Delta u}{h}\cdot v+u\cdot\frac{\Delta v}{h}+\frac{\Delta u}{h}\cdot\Delta v$.`,
            R`Cho $h$ tiến về $0$: $\frac{\Delta u}{h}$ tiến về $u'$, $\frac{\Delta v}{h}$ tiến về $v'$, còn $\Delta v$ tiến về $0$ nên số hạng cuối biến mất. Kết quả là $u'v+uv'$.`,
          ],
          suyKhac: [
            {
              cach: "Bằng hằng đẳng thức bình phương",
              buoc: [
                R`Viết tích thành hiệu các bình phương: $uv=\frac{(u+v)^2-u^2-v^2}{2}$. Đây là hằng đẳng thức, kiểm bằng cách khai triển $(u+v)^2$.`,
                R`Quy tắc hàm hợp cho $(w^2)'=2ww'$ với mọi hàm $w$. Áp dụng cho $w=u+v$, $w=u$ và $w=v$: $(uv)'=\frac{2(u+v)(u'+v')-2uu'-2vv'}{2}$.`,
                R`Khai triển tử số: $2(u+v)(u'+v')=2uu'+2uv'+2vu'+2vv'$. Trừ đi $2uu'+2vv'$ còn $2uv'+2vu'$, chia $2$ được $(uv)'=u'v+uv'$.`,
              ],
            },
          ],
        },
        {
          kind: "cong-thuc", title: "Thương",
          text: R`$\left(\frac{u}{v}\right)'=\frac{u'v-uv'}{v^2}$ với $v\neq 0$. Thứ tự trong tử số quan trọng: đạo hàm của tử nhân mẫu, trừ đi tử nhân đạo hàm của mẫu.`,
          suy: [
            R`Đặt $w=\frac{u}{v}$, khi đó $u=w\cdot v$. Lấy đạo hàm hai vế theo quy tắc tích: $u'=w'v+wv'$.`,
            R`Giải ra $w'$: $w'=\frac{u'-wv'}{v}$. Thay $w=\frac{u}{v}$ rồi quy đồng: $w'=\frac{u'-\frac{u}{v}v'}{v}=\frac{u'v-uv'}{v^2}$.`,
          ],
          suyKhac: [
            {
              cach: "Bằng quy tắc tích và hàm hợp",
              buoc: [
                R`Viết thương thành tích: $\frac{u}{v}=u\cdot\frac{1}{v}$. Chỉ còn cần đạo hàm của $\frac{1}{v}$, tức hàm hợp của $t\mapsto\frac{1}{t}$ với $t=v(x)$.`,
                R`Theo bảng đạo hàm, $\left(\frac{1}{t}\right)'=-\frac{1}{t^2}$ với $t\neq 0$, nên quy tắc hàm hợp cho $\left(\frac{1}{v}\right)'=-\frac{v'}{v^2}$.`,
                R`Áp dụng quy tắc tích cho $u\cdot\frac{1}{v}$: $\left(\frac{u}{v}\right)'=u'\cdot\frac{1}{v}+u\cdot\left(-\frac{v'}{v^2}\right)=\frac{u'v-uv'}{v^2}$.`,
              ],
            },
          ],
        },
        {
          kind: "cong-thuc", title: "Hàm hợp",
          text: R`$\left[f(g(x))\right]'=f'(g(x))\cdot g'(x)$. Các dạng thường dùng: $(u^n)'=nu^{n-1}u'$, $(\sin u)'=u'\cos u$, $(e^u)'=u'e^u$ và $(\ln u)'=\frac{u'}{u}$.`,
          suy: [
            R`Ý chính: tốc độ nhân với nhau. Nếu $g$ thay đổi nhanh gấp $3$ lần $x$ và $f$ thay đổi nhanh gấp $2$ lần $g$, thì $f$ thay đổi nhanh gấp $6$ lần $x$.`,
            R`Viết tỉ số thành tích của hai tỉ số: $\frac{f(g(x+h))-f(g(x))}{h}=\frac{f(g(x+h))-f(g(x))}{g(x+h)-g(x)}\cdot\frac{g(x+h)-g(x)}{h}$, khi $g(x+h)\neq g(x)$.`,
            R`Khi $h$ tiến về $0$, $g(x+h)$ tiến về $g(x)$ nên thừa số đầu tiến về $f'(g(x))$, còn thừa số sau tiến về $g'(x)$.`,
            R`Các dạng thường dùng chỉ là thay $f$ bằng lũy thừa, sin, hàm mũ hay logarit: lấy đạo hàm của lớp ngoài, giữ nguyên phần bên trong, rồi nhân với đạo hàm của phần bên trong.`,
          ],
          suyKhac: [
            {
              cach: "Bằng xấp xỉ tuyến tính",
              buoc: [
                R`Đặt $k=g(x+h)-g(x)$. Đạo hàm của $g$ nghĩa là $k=\bigl(g'(x)+\varepsilon_1\bigr)h$ với $\varepsilon_1\to 0$ khi $h\to 0$. Vậy $k\to 0$ khi $h\to 0$.`,
                R`Tương tự với $f$ tại điểm $g(x)$: $f(g(x)+k)-f(g(x))=\bigl(f'(g(x))+\varepsilon_2\bigr)k$, với $\varepsilon_2\to 0$ khi $k\to 0$ (đặt $\varepsilon_2=0$ khi $k=0$). Cách viết này đúng cả khi $k=0$.`,
                R`Thay $k$ vào rồi chia cho $h$: $\frac{f(g(x+h))-f(g(x))}{h}=\bigl(f'(g(x))+\varepsilon_2\bigr)\bigl(g'(x)+\varepsilon_1\bigr)$.`,
                R`Cho $h\to 0$ thì $\varepsilon_1\to 0$ và $\varepsilon_2\to 0$, nên vế phải tiến về $f'(g(x))\cdot g'(x)$. Cách này không cần giả thiết $g(x+h)\neq g(x)$ như cách chia ở trên, chỉ cần $g$ có đạo hàm tại $x$ và $f$ có đạo hàm tại $g(x)$.`,
              ],
            },
          ],
        },
        { kind: "cach-lam", title: "Nhận ra cấu trúc", text: R`Nhìn phép toán ngoài cùng của biểu thức: là tổng thì lấy đạo hàm từng hạng tử, là tích thì dùng quy tắc tích, là thương thì dùng quy tắc thương, là hàm hợp thì đạo hàm hàm ngoài rồi nhân đạo hàm hàm trong. Làm từ ngoài vào trong.` },
        { kind: "luu-y", text: R`Đạo hàm của tích không phải tích các đạo hàm: $(uv)'\neq u'v'$. Tương tự $\left(\frac{u}{v}\right)'\neq\frac{u'}{v'}$. Kiểm bằng $u=v=x$: $(x^2)'=2x$ nhưng $u'v'=1$.` },
        { kind: "vi-du", text: R`Với $y=(x^2+1)^3$: hàm ngoài là lũy thừa bậc $3$, hàm trong là $x^2+1$, nên $y'=3(x^2+1)^2\cdot 2x=6x(x^2+1)^2$. Tại $x=1$ có $y'=6\cdot 1\cdot 4=24$.` },
        { kind: "vi-du", text: R`$(x\sin x)'=\sin x+x\cos x$ theo quy tắc tích. $\left(\frac{x}{x+1}\right)'=\frac{1\cdot(x+1)-x\cdot 1}{(x+1)^2}=\frac{1}{(x+1)^2}$ theo quy tắc thương.` },
      ],
    },
    {
      title: "Phương trình tiếp tuyến",
      items: [
        { kind: "cach-lam", title: "Tiếp tuyến tại một điểm", text: R`Tính $f(a)$ và $f'(a)$ rồi thế vào $y=f'(a)(x-a)+f(a)$. Nếu đề chỉ cho hoành độ, tung độ tiếp điểm tính từ hàm số.` },
        { kind: "cach-lam", title: "Tiếp tuyến có hệ số góc cho trước", text: R`Giải phương trình $f'(x)=k$ để tìm hoành độ tiếp điểm, rồi viết tiếp tuyến tại từng điểm. Có thể có nhiều tiếp điểm, nên có nhiều tiếp tuyến.` },
        { kind: "cach-lam", title: "Tiếp tuyến đi qua một điểm", text: R`Gọi tiếp điểm có hoành độ $x_0$, viết tiếp tuyến theo $x_0$, rồi cho tiếp tuyến đi qua điểm đã cho để được phương trình ẩn $x_0$.` },
        {
          kind: "tinh-chat", title: "Song song và vuông góc",
          text: R`Hai tiếp tuyến song song khi hệ số góc bằng nhau: $k_1=k_2$. Chúng vuông góc khi $k_1k_2=-1$. Đường thẳng song song với một đường cho trước cùng hệ số góc với đường đó.`,
          suy: [
            R`Hệ số góc là độ dốc. Hai đường thẳng có cùng độ dốc thì cùng hướng, nên song song với nhau hoặc trùng nhau.`,
            R`Đường có độ dốc $k$ đi theo bước «sang $1$, lên $k$». Quay bước đó một phần tư vòng thì thành «sang $-k$, lên $1$», có độ dốc $\frac{1}{-k}$. Vậy đường vuông góc có độ dốc $k_2=-\frac{1}{k_1}$, tức $k_1k_2=-1$.`,
          ],
        },
        { kind: "luu-y", text: R`Phân biệt «tiếp tuyến tại điểm $A$» với «tiếp tuyến đi qua điểm $A$». Trường hợp sau, $A$ có thể không là tiếp điểm và có thể không nằm trên đồ thị.` },
        { kind: "vi-du", text: R`Với $y=x^3-3x$ tại $x=2$: $f(2)=2$, $f'(x)=3x^2-3$ nên $f'(2)=9$, và tiếp tuyến là $y=9(x-2)+2=9x-16$.` },
        { kind: "vi-du", text: R`Tiếp tuyến của $y=x^2$ song song với đường thẳng $y=4x+1$ có hệ số góc $4$. Giải $2x=4$ được $x=2$, tiếp điểm là $(2;4)$ và tiếp tuyến là $y=4(x-2)+4=4x-4$.` },
      ],
    },
    {
      title: "Đạo hàm và chiều biến thiên, cực trị",
      items: [
        {
          kind: "dinh-ly", title: "Dấu của đạo hàm",
          text: R`Nếu $f'(x)>0$ trên một khoảng thì $f$ đồng biến trên khoảng đó, và nếu $f'(x)<0$ thì $f$ nghịch biến. Bảng xét dấu của $f'$ cho ngay các khoảng đơn điệu.`,
          suy: [
            R`Ý nghĩa: $f'>0$ tại một điểm nghĩa là tiếp tuyến ở đó dốc lên, đồ thị đang đi lên. Nếu điều này đúng ở mọi điểm của một khoảng thì hàm tăng trên cả khoảng.`,
            R`Để chặt chẽ cần định lí giá trị trung bình, được công nhận: với $x_1<x_2$ luôn có một điểm $c$ ở giữa mà $\frac{f(x_2)-f(x_1)}{x_2-x_1}=f'(c)$. Nôm na: nếu cả chuyến đi có tốc độ trung bình $50$ km mỗi giờ thì có lúc đồng hồ chỉ đúng $50$.`,
            R`Vì $f'(c)>0$ và $x_2-x_1>0$ nên $f(x_2)-f(x_1)>0$, tức $f(x_2)>f(x_1)$: hàm đồng biến. Với $f'<0$ lập luận y hệt cho hàm nghịch biến.`,
          ],
          suyKhac: [
            {
              cach: "Bằng phản chứng với giá trị nhỏ nhất",
              buoc: [
                R`Giả sử $f'>0$ trên khoảng $I$ nhưng có $x_1<x_2$ trong $I$ với $f(x_2)\le f(x_1)$. Hàm có đạo hàm nên liên tục, mà hàm liên tục trên đoạn $[x_1;x_2]$ thì đạt giá trị nhỏ nhất tại một điểm $m$ của đoạn (định lí được công nhận).`,
                R`Nếu $m$ nằm giữa $x_1$ và $x_2$ thì $f$ có cực tiểu tại $m$, nên tiếp tuyến nằm ngang: $f'(m)=0$ (định lí Fermat, được công nhận). Điều này mâu thuẫn với $f'>0$.`,
                R`Nếu $m=x_2$: vì $f'(x_2)>0$ nên với $h>0$ đủ nhỏ có $f(x_2-h)<f(x_2)$, tức có điểm trong đoạn thấp hơn $f(x_2)$. Mâu thuẫn với việc $m=x_2$ là điểm thấp nhất.`,
                R`Nếu $m=x_1$: vì $f(x_2)\le f(x_1)$ và $f(x_1)$ đã là giá trị nhỏ nhất nên $f(x_2)=f(x_1)$, tức $x_2$ cũng là điểm thấp nhất. Rơi về trường hợp vừa rồi, lại mâu thuẫn. Vậy $f(x_2)>f(x_1)$, và $f'<0$ cho kết quả ngược lại bằng lập luận tương tự.`,
              ],
            },
          ],
        },
        {
          kind: "dinh-ly", title: "Điều kiện cực trị",
          text: R`Nếu $f'$ đổi dấu từ dương sang âm khi qua $x_0$ thì $x_0$ là điểm cực đại, từ âm sang dương thì là điểm cực tiểu. Phải có đổi dấu, chỉ riêng $f'(x_0)=0$ chưa đủ.`,
          suy: [
            R`Nếu $f'>0$ ở bên trái $x_0$ thì hàm đi lên cho tới $x_0$; nếu $f'<0$ ở bên phải thì hàm đi xuống sau $x_0$. Lên rồi xuống nghĩa là $f(x_0)$ lớn hơn các giá trị lân cận: đó là cực đại.`,
            R`Ngược lại, xuống rồi lên thì $f(x_0)$ nhỏ hơn các giá trị lân cận: đó là cực tiểu.`,
            R`Vì sao phải có đổi dấu: hàm $y=x^3$ có $y'=3x^2$ bằng $0$ tại $x=0$, nhưng $y'$ dương ở cả hai phía. Hàm tăng suốt, chỉ nằm ngang một thoáng, nên không có cực trị tại đó.`,
          ],
          suyKhac: [
            {
              cach: "Bằng định lí giá trị trung bình",
              buoc: [
                R`Giả sử $f$ liên tục tại $x_0$, và có $\delta>0$ để $f'>0$ trên $(x_0-\delta;x_0)$, $f'<0$ trên $(x_0;x_0+\delta)$. Với $0<|x-x_0|<\delta$, định lí giá trị trung bình (được công nhận) cho một điểm $c$ nằm giữa $x$ và $x_0$ sao cho $f(x)-f(x_0)=f'(c)(x-x_0)$.`,
                R`Nếu $f'$ đổi dấu từ dương sang âm khi qua $x_0$: với $x<x_0$ có $c<x_0$ nên $f'(c)>0$ và $x-x_0<0$, tích âm, tức $f(x)<f(x_0)$.`,
                R`Với $x>x_0$ có $c>x_0$ nên $f'(c)<0$ và $x-x_0>0$, tích cũng âm, tức $f(x)<f(x_0)$. Vậy $f(x_0)$ lớn hơn mọi giá trị lân cận: đó là cực đại. Trường hợp $f'$ đổi dấu từ âm sang dương cho cực tiểu theo cách y hệt.`,
              ],
            },
          ],
        },
        {
          kind: "dinh-nghia", title: "Đạo hàm cấp hai",
          text: R`Đạo hàm cấp hai là $f''=(f')'$. Nếu $f'(x_0)=0$ và $f''(x_0)>0$ thì $x_0$ là điểm cực tiểu, nếu $f''(x_0)<0$ thì là điểm cực đại.`,
          de: R`Đạo hàm cấp hai là tốc độ thay đổi của độ dốc, như gia tốc là tốc độ thay đổi của vận tốc. Nếu tại $x_0$ độ dốc bằng $0$ và đang tăng, thì ngay trước đó độ dốc âm và ngay sau đó dương: đồ thị xuống rồi lên, tức là đáy thung lũng. Nếu độ dốc đang giảm thì ngược lại, là đỉnh đồi.`,
        },
        { kind: "luu-y", text: R`Phương trình $f'(x_0)=0$ chưa đủ để có cực trị. Hàm $y=x^3$ có $y'(0)=0$, nhưng $y(-1)=-1$ và $y(1)=1$ nên hàm vẫn tăng qua $0$, không có cực trị.` },
        { kind: "cach-lam", title: "Giá trị lớn nhất, nhỏ nhất trên đoạn", text: R`Tính $f$ tại hai đầu mút và tại mọi điểm trong đoạn mà $f'=0$ hoặc $f'$ không xác định, rồi so sánh các giá trị. Cách này đúng với hàm liên tục trên đoạn đóng.` },
        { kind: "vi-du", text: R`Với $f(x)=x^3-3x$: $f'=3x^2-3=0$ tại $x=\pm 1$, $f(-1)=2$ là cực đại và $f(1)=-2$ là cực tiểu. Trên đoạn $[0;2]$ có $f(0)=0$, $f(1)=-2$, $f(2)=2$ nên giá trị nhỏ nhất là $-2$ và lớn nhất là $2$.` },
        { kind: "vi-du", text: R`Vật ném lên có $h=20t-5t^2$ mét, nên vận tốc là $v=20-10t$. Vật lên cao nhất khi $v=0$, tức $t=2$ giây, và độ cao đó là $h(2)=20$ mét.` },
      ],
    },
    {
      title: "Ứng dụng tối ưu và tốc độ thay đổi",
      items: [
        { kind: "cach-lam", title: "Quy trình bài tối ưu", text: R`Chọn biến, lập hàm một biến cho đại lượng cần tối ưu, tìm miền xác định thực tế, lấy đạo hàm, tìm điểm $f'=0$ trong miền, rồi so sánh với đầu mút. Cuối cùng trả lời đúng đại lượng và đơn vị mà đề hỏi.` },
        { kind: "vi-du", text: R`Từ tấm bìa vuông cạnh $12$ cm, cắt bốn góc là bốn hình vuông cạnh $x$ rồi gập thành hộp không nắp. Thể tích $V=x(12-2x)^2$ với $0<x<6$ có $V'=(12-2x)(12-6x)$, nên $V'=0$ tại $x=2$ và $V(2)=2\cdot 64=128$ cm$^3$.` },
        { kind: "vi-du", text: R`Chi phí sản xuất $q$ sản phẩm là $C(q)=100+2q+0{,}01q^2$ nghìn đồng. Chi phí biên $C'(q)=2+0{,}02q$ cho biết chi phí thêm cho một sản phẩm nữa, và tại $q=100$ là $4$ nghìn đồng mỗi sản phẩm.` },
        { kind: "luu-y", text: R`Luôn đối chiếu nghiệm của $f'=0$ với miền xác định của bài toán. Nếu nghiệm nằm ngoài miền, giá trị tối ưu nằm ở đầu mút.` },
      ],
    },
  ],
  canNho: [
    R`Định nghĩa: $f'(a)=\lim_{h\to 0}\frac{f(a+h)-f(a)}{h}$, là hệ số góc của tiếp tuyến tại $a$.`,
    R`Tiếp tuyến tại $(a;f(a))$ có phương trình $y=f'(a)(x-a)+f(a)$.`,
    R`Bảng đạo hàm: $(x^n)'=nx^{n-1}$, $(\sin x)'=\cos x$, $(\cos x)'=-\sin x$, $(e^x)'=e^x$, $(\ln x)'=\frac{1}{x}$.`,
    R`Quy tắc tích $(uv)'=u'v+uv'$ và thương $\left(\frac{u}{v}\right)'=\frac{u'v-uv'}{v^2}$.`,
    R`Hàm hợp: đạo hàm hàm ngoài tại hàm trong, rồi nhân với đạo hàm hàm trong.`,
    R`Đạo hàm dương thì hàm đồng biến, âm thì nghịch biến; cực trị cần $f'$ đổi dấu.`,
    R`Giá trị lớn nhất và nhỏ nhất trên đoạn: so đầu mút với các điểm có $f'=0$.`,
    R`Hai tiếp tuyến song song thì cùng hệ số góc, vuông góc thì tích hệ số góc bằng $-1$.`,
  ],
  lienQuan: [
    { id: "limit", vi: R`Đạo hàm là một giới hạn dạng $\frac{0}{0}$, nên mọi kĩ thuật khử dạng vô định đều dùng ở đây.` },
    { id: "survey", vi: R`Bảng biến thiên từ dấu của $f'$ là bước chính của khảo sát và vẽ đồ thị hàm số.` },
    { id: "integral", vi: R`Tích phân là phép toán ngược của đạo hàm: nguyên hàm của $f$ là hàm có đạo hàm bằng $f$.` },
  ],
  checks: [
    { expr: "simplify(((sin(x)+exp(x))**2 - sin(x)**2 - exp(x)**2)/2 - sin(x)*exp(x))", expect: "0" },
    { expr: "simplify(diff(sin(x)/exp(x), x) - (cos(x)*exp(x) - sin(x)*exp(x))/exp(x)**2)", expect: "0" },
    { expr: "simplify(diff(sin(x)*exp(-x), x) - diff(sin(x)/exp(x), x))", expect: "0" },
    { expr: "diff(sin(x**2), x)", expect: "2*x*cos(x**2)" },
    { expr: "diff(1/x, x)", expect: "-1/x**2" },
    { expr: "limit(((1+h)**2-1)/h, h, 0)", expect: "2" },
    { expr: "expand(((1+h)**2-1)/h)", expect: "h+2" },
    { expr: "diff(x**2, x).subs(x,1)", expect: "2" },
    { expr: "2*1-1", expect: "1" },
    { expr: "diff(5*t**2, t).subs(t,2)", expect: "20" },
    { expr: "limit(Abs(h)/h, h, 0, '+')", expect: "1" },
    { expr: "limit(Abs(h)/h, h, 0, '-')", expect: "-1" },
    { expr: "diff(x**5, x)", expect: "5*x**4" },
    { expr: "diff(3*sqrt(x), x)", expect: "3/(2*sqrt(x))" },
    { expr: "diff(sin(x)+exp(x), x)", expect: "cos(x)+exp(x)" },
    { expr: "diff(tan(x), x)", expect: "1/cos(x)**2" },
    { expr: "diff(2**x, x)", expect: "2**x*log(2)" },
    { expr: "diff((x**2+1)**3, x)", expect: "6*x*(x**2+1)**2" },
    { expr: "diff((x**2+1)**3, x).subs(x,1)", expect: "24" },
    { expr: "diff(x*sin(x), x)", expect: "sin(x)+x*cos(x)" },
    { expr: "diff(x/(x+1), x)", expect: "1/(x+1)**2" },
    { expr: "diff(sin(x**2), x)", expect: "2*x*cos(x**2)" },
    { expr: "diff(exp(2*x), x)", expect: "2*exp(2*x)" },
    { expr: "diff(log(x**2+1), x)", expect: "2*x/(x**2+1)" },
    { expr: "(x**3-3*x).subs(x,2)", expect: "2" },
    { expr: "diff(x**3-3*x, x).subs(x,2)", expect: "9" },
    { expr: "expand(9*(x-2)+2)", expect: "9*x-16" },
    { expr: "solve(diff(x**2, x)-4, x)", expect: "[2]" },
    { expr: "expand(4*(x-2)+4)", expect: "4*x-4" },
    { expr: "solve(3*x**2-3, x)", expect: "[-1, 1]" },
    { expr: "(x**3-3*x).subs(x,-1)", expect: "2" },
    { expr: "(x**3-3*x).subs(x,1)", expect: "-2" },
    { expr: "diff(20*t-5*t**2, t).subs(t,2)", expect: "0" },
    { expr: "20*2-5*2**2", expect: "20" },
    { expr: "diff(x*(12-2*x)**2, x)", expect: "(12-2*x)*(12-6*x)" },
    { expr: "2*(12-2*2)**2", expect: "128" },
    { expr: "diff(100+2*q+Rational(1,100)*q**2, q).subs(q,100)", expect: "4" },
  ],
};
