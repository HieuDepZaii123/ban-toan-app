import type { TopicKnowledge } from "../knowledge/types.ts";

const R = String.raw;

export const discreteKnowledge: TopicKnowledge = {
  id: "discrete",
  tongQuat: {
    la: R`Môn này gồm hai nửa. Phương trình vi phân mô tả đại lượng biến đổi liên tục theo thời gian bằng một quy luật về tốc độ thay đổi, ví dụ dân số tăng nhanh bao nhiêu thì tùy vào dân số hiện có. Toán rời rạc nghiên cứu những đối tượng đếm được: đồ thị (các điểm và đường nối) và số nguyên với phép chia dư, nền của mật mã hiện đại.`,
    dungDe: R`Mô hình tăng trưởng quần thể, phân rã phóng xạ, lan truyền dịch bệnh, mạch điện và cơ học. Đồ thị mô tả mạng xã hội, bản đồ đường đi và mạng máy tính. Đồng dư và nhân tử nguyên tố bảo vệ giao dịch ngân hàng qua mật mã RSA. Trong thi cử, môn này cho bài giải phương trình vi phân cấp một, chứng minh về đồ thị và tính toán đồng dư.`,
    lienHe: R`Phương trình vi phân dùng nguyên hàm của chuyên đề Tích phân và hàm mũ của chuyên đề Hàm mũ và logarit. Đồ thị dùng kĩ thuật đếm của chuyên đề Tổ hợp, còn đồng dư và quy nạp nối với chuyên đề Dãy số.`,
  },
  tuDau: [
    R`Gửi tiết kiệm lãi kép: số tiền hiện có càng nhiều thì tiền lãi sinh ra mỗi ngày càng lớn. Điều đó là một phương trình: tốc độ tăng của số tiền tỉ lệ với số tiền đang có, $y'=ky$. Nghiệm của phương trình là hàm mũ, và phương trình vi phân là cách ghi lại quy luật «tốc độ phụ thuộc vào trạng thái» để tìm ra cả quá trình.`,
    R`Quy luật đơn giản đó có nhiều biến thể. Quần thể không tăng mãi vì thức ăn có hạn, nên tốc độ tăng chậm dần khi gần mức tối đa: mô hình logistic. Dịch bệnh chia dân số thành người chưa nhiễm, đang nhiễm và đã khỏi, và tốc độ lây phụ thuộc vào tích số của hai nhóm đầu. Khi không giải được bằng công thức, máy tính đi từng bước nhỏ theo phương pháp Euler.`,
    R`Chuyển sang rời rạc: tập hợp bạn bè trên một mạng xã hội là một đồ thị, mỗi người là một điểm và mỗi quan hệ là một đoạn nối. Có những sự thật đơn giản đến bất ngờ, ví dụ tổng số lượng bạn của mọi người luôn chẵn vì mỗi quan hệ được đếm đúng hai lần.`,
    R`Phần cuối nói về số nguyên và phép chia dư. Giờ trên đồng hồ là một phép tính modulo $12$: bảy giờ sau năm giờ là hai giờ. Từ phép tính đơn giản ấy, ta có thể xây dựng một hệ mật mã trong đó ai cũng có thể mã hóa tin nhắn, nhưng chỉ người nắm khóa riêng mới đọc được: đó là RSA.`,
  ],
  kyHieu: [
    { kh: R`$y'=f(x;y)$`, doc: R`Phương trình vi phân cấp một: tốc độ thay đổi của $y$ cho trước bằng một hàm của $x$ và $y$.` },
    { kh: R`$e^{kt}$`, doc: R`Hàm mũ cơ số $e$: nghiệm của quy luật «tốc độ tỉ lệ với giá trị hiện có».` },
    { kh: R`$R_0$`, doc: R`Hệ số lây cơ bản của dịch bệnh: số người trung bình một người nhiễm làm nhiễm thêm khi mọi người xung quanh chưa miễn dịch.` },
    { kh: R`$\deg v$`, doc: R`Bậc của đỉnh $v$ trong đồ thị: số cạnh nối vào $v$.` },
    { kh: R`$|E|$`, doc: R`Số cạnh của đồ thị.` },
    { kh: R`$a\equiv b\pmod m$`, doc: R`$a$ đồng dư với $b$ theo modulo $m$: hai số có cùng số dư khi chia cho $m$, tức $m$ chia hết $a-b$.` },
    { kh: R`$\gcd(a,b)$`, doc: R`Ước chung lớn nhất của hai số nguyên $a$ và $b$.` },
    { kh: R`$\varphi(n)$`, doc: R`Hàm Euler: số các số từ $1$ đến $n$ nguyên tố cùng nhau với $n$. Với $n=pq$ là tích hai số nguyên tố, $\varphi(n)=(p-1)(q-1)$.` },
  ],
  canBiet: [
    R`Nguyên hàm và tích phân, hàm mũ $e^x$ và logarit tự nhiên.`,
    R`Chia hết, ước chung lớn nhất và số nguyên tố.`,
    R`Quy nạp toán học và nhị thức Newton.`,
  ],
  sections: [
    {
      title: "Phương trình vi phân cấp một",
      items: [
        {
          kind: "dinh-nghia", title: "Phương trình vi phân và nghiệm",
          text: R`Phương trình vi phân cấp một là hệ thức $y'=f(x;y)$ giữa hàm chưa biết $y(x)$ và đạo hàm của nó. Nghiệm là hàm $y(x)$ thỏa hệ thức; nghiệm riêng là nghiệm thỏa thêm điều kiện đầu $y(x_0)=y_0$.`,
          de: R`Thay vì cho biết giá trị của hàm tại mỗi điểm, phương trình vi phân chỉ cho biết hàm đang đi theo hướng nào ở mỗi điểm. Biết hướng đi và điểm xuất phát thì tìm ra được cả quãng đường, giống đi theo la bàn từng bước. Điểm xuất phát khác nhau cho các nghiệm khác nhau.`,
        },
        {
          kind: "cach-lam", title: "Đọc trường hướng",
          text: R`Tại mỗi điểm $(x;y)$ của mặt phẳng, vẽ một đoạn ngắn có độ dốc $f(x;y)$. Nghiệm đi qua một điểm là đường cong luôn tiếp xúc với các đoạn ngắn ấy. Nhìn trường hướng ta thấy trước hình dạng nghiệm và các đường nghiệm hằng số, mà chưa cần giải phương trình.`,
        },
        {
          kind: "dinh-ly", title: "Phương pháp tách biến",
          text: R`Với phương trình $y'=g(x)h(y)$ và $h(y)\neq0$, nghiệm thỏa $\int\frac{dy}{h(y)}=\int g(x)\,dx+C$. Nghiệm hằng số $y\equiv c$ ứng với $h(c)=0$ cần xét riêng.`,
          suy: [
            R`Gọi $H(y)=\int\frac{dy}{h(y)}$ là một nguyên hàm của $\frac{1}{h}$, nên $H'(y)=\frac{1}{h(y)}$.`,
            R`Theo quy tắc đạo hàm hàm hợp, $\frac{d}{dx}H(y(x))=H'(y)\,y'=\frac{y'}{h(y)}=g(x)$, vì $y'=g(x)h(y)$.`,
            R`Hai hàm có cùng đạo hàm chỉ khác nhau một hằng số, nên $H(y(x))=\int g(x)\,dx+C$. Đó chính là $\int\frac{dy}{h(y)}=\int g\,dx+C$.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Phương trình tuyến tính cấp một",
          text: R`Với $y'+p(x)y=q(x)$, đặt $\mu=e^{P(x)}$ với $P'=p$. Khi đó $y=\frac{1}{\mu}\left(\int\mu q\,dx+C\right)$.`,
          suy: [
            R`Nhân hai vế với $\mu=e^{P}$, trong đó $P'=p$. Vì $\mu'=pe^{P}=p\mu$ nên $(\mu y)'=\mu y'+\mu'y=\mu(y'+py)$.`,
            R`Vế trái của phương trình sau khi nhân là $\mu(y'+py)=(\mu y)'$, và vế phải là $\mu q$. Vậy $(\mu y)'=\mu q$.`,
            R`Lấy nguyên hàm: $\mu y=\int\mu q\,dx+C$, rồi chia cho $\mu\neq0$ được công thức nghiệm.`,
          ],
        },
        {
          kind: "vi-du",
          text: R`Phương trình $y'=2xy$ tách biến thành $\frac{dy}{y}=2x\,dx$, cho $\ln|y|=x^2+c$ và $y=Ce^{x^2}$. Phương trình $y'+y=x$ có $\mu=e^x$, $\int xe^x\,dx=(x-1)e^x$, nên $y=x-1+Ce^{-x}$. Kiểm lại: $y'+y=1-Ce^{-x}+x-1+Ce^{-x}=x$.`,
        },
        { kind: "luu-y", text: R`Khi chia cho $h(y)$ có thể mất nghiệm hằng số. Với $y'=2xy$, nghiệm $y\equiv0$ ứng với $C=0$ nên không mất, nhưng với $y'=y^2$ thì nghiệm $y\equiv0$ không nằm trong họ $y=-\frac{1}{x+C}$ và phải nêu riêng.` },
      ],
    },
    {
      title: "Mô hình tăng trưởng",
      items: [
        {
          kind: "cong-thuc", title: "Tăng trưởng và phân rã mũ",
          text: R`Phương trình $y'=ky$ có nghiệm $y=y_0e^{kt}$. Với $k>0$ là tăng trưởng, thời gian nhân đôi là $\frac{\ln2}{k}$. Với $k<0$ là phân rã, chu kì bán rã là $\frac{\ln2}{|k|}$.`,
          suy: [
            R`Tách biến: $\frac{dy}{y}=k\,dt$. Lấy nguyên hàm hai vế, $\ln|y|=kt+c$, nên $y=\pm e^{c}e^{kt}=Ce^{kt}$. Điều kiện đầu $y(0)=y_0$ cho $C=y_0$.`,
            R`Thời gian nhân đôi $T$ thỏa $y_0e^{kT}=2y_0$, nên $e^{kT}=2$ và $T=\frac{\ln2}{k}$. Chu kì bán rã tính tương tự với $e^{kT}=\frac12$.`,
          ],
        },
        {
          kind: "dinh-ly", title: "Mô hình logistic",
          text: R`Nghiệm của $y'=ry\left(1-\frac{y}{K}\right)$ với $0<y_0<K$ là $y=\frac{K}{1+Ae^{-rt}}$ với $A=\frac{K-y_0}{y_0}$. Nghiệm tăng dần về sức chứa $K$.`,
          suy: [
            R`Đặt $u=\frac1y$. Khi đó $u'=-\frac{y'}{y^2}=-r\cdot\frac1y\left(1-\frac yK\right)=-r\left(u-\frac1K\right)$.`,
            R`Đây là phương trình tuyến tính cho $v=u-\frac1K$: $v'=-rv$, có nghiệm $v=Ce^{-rt}$. Vậy $u=\frac1K+Ce^{-rt}$.`,
            R`Đổi lại $y=\frac1u=\frac{K}{1+KCe^{-rt}}$. Đặt $A=KC$; điều kiện $y(0)=y_0$ cho $1+A=\frac{K}{y_0}$, tức $A=\frac{K-y_0}{y_0}$.`,
          ],
          suyKhac: [
            {
              cach: "Bằng tách biến và phân thức đơn giản",
              buoc: [
                R`Tách biến: $\frac{dy}{y(1-y/K)}=r\,dt$. Phân tích thành phân thức đơn giản: $\frac{1}{y(1-y/K)}=\frac{K}{y(K-y)}=\frac1y+\frac{1}{K-y}$.`,
                R`Lấy nguyên hàm: $\ln|y|-\ln|K-y|=rt+c$, tức $\frac{y}{K-y}=Be^{rt}$ với $B$ là hằng số dương vì $0<y<K$.`,
                R`Giải theo $y$: $y=\frac{KBe^{rt}}{1+Be^{rt}}=\frac{K}{1+B^{-1}e^{-rt}}$. Điều kiện đầu cho $B=\frac{y_0}{K-y_0}$, nên $A=B^{-1}=\frac{K-y_0}{y_0}$, trùng kết quả của cách đổi biến.`,
              ],
            },
          ],
        },
        {
          kind: "tinh-chat", title: "Trạng thái cân bằng",
          text: R`Với $y'=f(y)$, nghiệm hằng $y\equiv y^*$ ứng với $f(y^*)=0$. Trạng thái cân bằng ổn định nếu $f'(y^*)<0$ và không ổn định nếu $f'(y^*)>0$. Mô hình logistic có hai cân bằng: $0$ không ổn định, $K$ ổn định.`,
          suy: [
            R`Nếu $f(y^*)=0$ thì $y\equiv y^*$ thỏa phương trình, vì cả hai vế đều bằng $0$.`,
            R`Gần $y^*$, $f(y)\approx f'(y^*)(y-y^*)$. Đặt $w=y-y^*$ thì $w'\approx f'(y^*)w$ nên $w\approx w_0e^{f'(y^*)t}$. Độ lệch $w$ co về $0$ khi $f'(y^*)<0$ và lớn lên khi $f'(y^*)>0$.`,
            R`Với $f(y)=ry\left(1-\frac yK\right)$ ta có $f'(y)=r\left(1-\frac{2y}{K}\right)$, nên $f'(0)=r>0$ và $f'(K)=-r<0$.`,
          ],
        },
        {
          kind: "vi-du",
          text: R`Quần thể có $r=0{,}5$ mỗi tháng, sức chứa $K=100$, ban đầu $y_0=10$. Khi đó $A=\frac{100-10}{10}=9$ và $y=\frac{100}{1+9e^{-0,5t}}$. Lúc $t=0$ có $y=10$, và về sau $y$ tiến tới $100$. Với tăng trưởng mũ $k=0{,}03$ mỗi ngày, số lượng nhân đôi sau khoảng $\frac{\ln2}{0{,}03}\approx23{,}1$ ngày.`,
        },
        { kind: "luu-y", text: R`Mô hình mũ chỉ đúng khi tài nguyên không hạn chế; dùng nó cho thời gian dài cho kết quả vô lí. Tăng trưởng logistic có dạng chữ S: ban đầu gần như mũ, sau đó chậm dần khi tiến sát $K$.` },
      ],
    },
    {
      title: "Nghiệm số và mô hình dịch bệnh",
      items: [
        {
          kind: "cong-thuc", title: "Phương pháp Euler",
          text: R`Với $y'=f(x;y)$, $y(x_0)=y_0$ và bước $h$, tính $y_{n+1}=y_n+h\,f(x_n;y_n)$ với $x_{n+1}=x_n+h$. Mỗi bước đi theo tiếp tuyến một đoạn $h$.`,
          suy: [
            R`Gần $x_n$, hàm được xấp xỉ bằng tiếp tuyến: $y(x_n+h)\approx y(x_n)+h\,y'(x_n)$, theo khai triển Taylor bậc một.`,
            R`Vì $y'(x_n)=f(x_n;y(x_n))$ và ta chỉ có xấp xỉ $y_n\approx y(x_n)$, thay vào được $y_{n+1}=y_n+h\,f(x_n;y_n)$.`,
          ],
        },
        {
          kind: "tinh-chat", title: "Sai số của phương pháp Euler",
          text: R`Với $f$ đủ trơn và liên tục Lipschitz theo $y$, sai số sau một đoạn cố định $[x_0;x_0+T]$ cỡ $h$: giảm bước đi một nửa thì sai số giảm khoảng một nửa.`,
          suy: [
            R`Theo khai triển Taylor với phần dư Lagrange, $y(x+h)=y(x)+h\,y'(x)+\frac{h^2}{2}y''(c)$. Mỗi bước Euler mắc sai số cục bộ cỡ $\frac{h^2}{2}|y''|\le\frac{M}{2}h^2$.`,
            R`Để đi hết đoạn dài $T$ cần $\frac{T}{h}$ bước. Các sai số cục bộ cộng dồn, và điều kiện Lipschitz đảm bảo sai số cũ không bị khuếch đại quá một hệ số hữu hạn, nên sai số toàn cục cỡ $\frac{T}{h}\cdot\frac{M}{2}h^2$, tức cỡ $h$.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Mô hình dịch bệnh SIR",
          text: R`Chia dân số $N$ thành $S$ (chưa nhiễm), $I$ (đang nhiễm), $R$ (đã khỏi): $S'=-\beta\frac{SI}{N}$, $I'=\beta\frac{SI}{N}-\gamma I$, $R'=\gamma I$. Dịch bùng phát khi $R_0\frac{S}{N}>1$ với $R_0=\frac{\beta}{\gamma}$.`,
          suy: [
            R`Cộng ba phương trình: $S'+I'+R'=-\beta\frac{SI}{N}+\beta\frac{SI}{N}-\gamma I+\gamma I=0$, nên $S+I+R=N$ không đổi theo thời gian.`,
            R`Viết $I'=I\left(\beta\frac{S}{N}-\gamma\right)$. Số người nhiễm tăng ($I'>0$) khi và chỉ khi $\beta\frac SN>\gamma$, tức $\frac{\beta}{\gamma}\cdot\frac SN>1$.`,
            R`Lúc đầu gần như mọi người chưa nhiễm, $S\approx N$, nên dịch bùng khi $R_0=\frac{\beta}{\gamma}>1$. Số người nhiễm đạt đỉnh khi $S=\frac{N}{R_0}$, vì lúc đó $I'=0$.`,
          ],
        },
        {
          kind: "cach-lam", title: "Chọn bước cho phương pháp số",
          text: R`Bắt đầu với một bước $h$ vừa phải, tính lại với $\frac h2$ và so sánh. Nếu hai kết quả gần nhau thì dừng, nếu không thì chia đôi tiếp. Với phương trình có thành phần phân rã nhanh, phải chọn $h$ đủ nhỏ để thành phần đó không dao động.`,
        },
        {
          kind: "vi-du",
          text: R`Phương trình $y'=y$ với $y(0)=1$ và $h=0{,}1$: Euler cho $y_{10}=1{,}1^{10}\approx2{,}5937$, còn nghiệm đúng là $y(1)=e\approx2{,}7183$. Với $\beta=0{,}3$ và $\gamma=0{,}1$ ta có $R_0=3$, và dịch dừng lây khi $\frac SN$ giảm xuống dưới $\frac13$, tức khi khoảng $1-\frac13=\frac23$ dân số đã miễn dịch.`,
        },
        { kind: "luu-y", text: R`Phương pháp Euler có thể mất ổn định khi bước quá lớn. Với $y'=-10y$ và $h=0{,}3$ thì $y_{n+1}=(1-3)y_n=-2y_n$, nghiệm số dao động và lớn lên trong khi nghiệm thật $e^{-10t}$ co về $0$.` },
      ],
    },
    {
      title: "Đồ thị",
      items: [
        {
          kind: "dinh-nghia", title: "Đồ thị và bậc",
          text: R`Đồ thị đơn gồm tập đỉnh $V$ và tập cạnh $E$, mỗi cạnh nối hai đỉnh khác nhau, không có hai cạnh nối cùng một cặp đỉnh. Bậc của đỉnh $v$, viết $\deg v$, là số cạnh có đầu mút tại $v$.`,
          de: R`Đồ thị là bản vẽ của «ai nối với ai»: mỗi điểm là một người hay một thành phố, mỗi đoạn nối là một quan hệ hay một con đường. Bậc của một điểm là số đoạn xuất phát từ nó, tức số bạn của người đó hay số con đường dẫn tới thành phố đó. Hình vẽ không quan trọng, chỉ quan hệ nối mới quan trọng.`,
        },
        {
          kind: "dinh-ly", title: "Bổ đề bắt tay",
          text: R`Trong mọi đồ thị đơn, tổng bậc của các đỉnh bằng hai lần số cạnh: $\sum_{v\in V}\deg v=2|E|$.`,
          suy: [
            R`Đếm số cặp (đỉnh, cạnh) mà đỉnh là đầu mút của cạnh, theo hai cách.`,
            R`Theo từng đỉnh: đỉnh $v$ xuất hiện trong đúng $\deg v$ cặp, nên tổng số cặp là $\sum\deg v$.`,
            R`Theo từng cạnh: mỗi cạnh có đúng hai đầu mút nên xuất hiện trong đúng $2$ cặp, và tổng số cặp là $2|E|$. Hai cách đếm cùng một tập hợp nên $\sum\deg v=2|E|$.`,
          ],
          suyKhac: [
            {
              cach: "Bằng quy nạp theo số cạnh",
              buoc: [
                R`Với $|E|=0$, mọi đỉnh có bậc $0$ nên $\sum\deg v=0=2\cdot0$.`,
                R`Giả sử đẳng thức đúng với mọi đồ thị có $k$ cạnh. Xét đồ thị $G$ có $k+1$ cạnh và bỏ đi một cạnh $e=uv$ để được đồ thị $G'$ có $k$ cạnh.`,
                R`Bỏ $e$ làm bậc của $u$ và của $v$ cùng giảm đi $1$ và không đổi bậc của đỉnh nào khác. Do đó $\sum_G\deg=\sum_{G'}\deg+2=2k+2=2(k+1)$.`,
              ],
            },
          ],
        },
        {
          kind: "tinh-chat", title: "Số đỉnh bậc lẻ là số chẵn",
          text: R`Trong mọi đồ thị đơn, số đỉnh có bậc lẻ là một số chẵn.`,
          suy: [
            R`Theo bổ đề bắt tay, $\sum\deg v=2|E|$ là số chẵn.`,
            R`Tách tổng thành phần các đỉnh bậc chẵn, luôn chẵn, và phần các đỉnh bậc lẻ. Tổng toàn bộ chẵn nên tổng các bậc lẻ phải chẵn.`,
            R`Tổng của các số lẻ chỉ chẵn khi có một số chẵn các số hạng. Vậy số đỉnh bậc lẻ là số chẵn.`,
          ],
        },
        {
          kind: "dinh-nghia", title: "Đường đi, liên thông và cây",
          text: R`Đồ thị liên thông nếu giữa hai đỉnh bất kì có đường đi. Chu trình là đường đi khép kín không lặp đỉnh. Cây là đồ thị liên thông và không có chu trình.`,
          de: R`Liên thông nghĩa là từ chỗ nào cũng đi được tới chỗ nào, nghĩa là mạng không bị đứt làm nhiều mảnh. Chu trình là một vòng tròn khép kín: đi từ một nơi, qua vài nơi khác, rồi về đúng chỗ đầu. Cây là mạng nối mọi nơi bằng đủ đường mà không thừa đường nào, giống cây gia phả hay thư mục trong máy tính.`,
        },
        {
          kind: "dinh-ly", title: "Cây có n−1 cạnh",
          text: R`Mọi cây có $n$ đỉnh (với $n\ge1$) có đúng $n-1$ cạnh, không nhiều hơn và không ít hơn.`,
          suy: [
            R`Chứng minh bằng quy nạp theo $n$. Cây một đỉnh không có cạnh nào, và $1-1=0$.`,
            R`Với $n\ge2$, xét một đường đi dài nhất $v_0v_1\dots v_k$ trong cây. Đỉnh $v_0$ có bậc $1$: nếu có thêm một láng giềng $w$, thì hoặc $w$ nằm trên đường đi, tạo chu trình, hoặc $w$ nằm ngoài, tạo đường đi dài hơn.`,
            R`Bỏ đỉnh $v_0$ cùng cạnh duy nhất của nó. Đồ thị còn lại vẫn liên thông (vì $v_0$ chỉ là đầu mút) và không có chu trình, nên là cây có $n-1$ đỉnh, với $n-2$ cạnh theo giả thiết quy nạp.`,
            R`Thêm lại đỉnh $v_0$ và cạnh của nó, cây ban đầu có $n-2+1=n-1$ cạnh.`,
          ],
        },
        {
          kind: "cach-lam", title: "Kiểm tra liên thông",
          text: R`Chọn một đỉnh xuất phát, đánh dấu nó, rồi lặp: đánh dấu mọi láng giềng của các đỉnh đã đánh dấu. Khi không đánh dấu thêm được nữa, đồ thị liên thông nếu mọi đỉnh đều đã được đánh dấu. Đó là ý tưởng của tìm kiếm theo chiều rộng.`,
        },
        {
          kind: "vi-du",
          text: R`Một đồ thị có $7$ cạnh thì tổng bậc các đỉnh là $14$. Trong một lớp $10$ bạn, nếu mỗi bạn bắt tay đúng $3$ bạn khác thì có $\frac{10\cdot3}{2}=15$ cái bắt tay. Còn không thể có lớp $5$ bạn mà mỗi bạn bắt tay đúng $3$ bạn, vì $\frac{5\cdot3}{2}$ không nguyên.`,
        },
        { kind: "luu-y", text: R`Bổ đề bắt tay cho đồ thị đơn. Với đồ thị có khuyên (cạnh nối một đỉnh với chính nó), ta quy ước khuyên đóng góp $2$ vào bậc của đỉnh đó thì đẳng thức vẫn đúng.` },
      ],
    },
    {
      title: "Đồng dư và số học",
      items: [
        {
          kind: "dinh-nghia", title: "Đồng dư",
          text: R`Với số nguyên dương $m$, ta viết $a\equiv b\pmod m$ nếu $m$ chia hết $a-b$, tức $a$ và $b$ có cùng số dư khi chia cho $m$.`,
          de: R`Đồng dư là phép tính trên chiếc đồng hồ. Trên đồng hồ $12$ giờ, $15$ giờ và $3$ giờ chỉ vào cùng một vị trí, vì chúng hơn kém nhau một bội của $12$. Hai số đồng dư theo modulo $m$ khi chúng «giống nhau» nếu ta chỉ để ý tới số dư khi chia cho $m$.`,
        },
        {
          kind: "cong-thuc", title: "Cộng và nhân đồng dư",
          text: R`Nếu $a\equiv b$ và $c\equiv d\pmod m$ thì $a+c\equiv b+d$ và $ac\equiv bd\pmod m$. Do đó $a^k\equiv b^k\pmod m$ với mọi số nguyên dương $k$.`,
          suy: [
            R`Viết $a=b+km$ và $c=d+lm$ với $k$, $l$ nguyên. Khi đó $a+c=(b+d)+(k+l)m$, nên $m$ chia hết $(a+c)-(b+d)$.`,
            R`Với tích: $ac=(b+km)(d+lm)=bd+m(bl+dk+klm)$, nên $ac-bd$ chia hết cho $m$. Áp dụng liên tiếp cho lũy thừa.`,
          ],
        },
        {
          kind: "dinh-ly", title: "Nghịch đảo theo modulo",
          text: R`Số $a$ có nghịch đảo theo modulo $m$, tức có $x$ để $ax\equiv1\pmod m$, khi và chỉ khi $\gcd(a,m)=1$.`,
          suy: [
            R`Nếu $\gcd(a,m)=1$ thì theo đẳng thức Bézout có các số nguyên $x$, $y$ để $ax+my=1$. Lấy modulo $m$ được $ax\equiv1$.`,
            R`Ngược lại, nếu $ax\equiv1\pmod m$ thì $ax-1=km$ với một $k$ nguyên, tức $ax-km=1$. Mọi ước chung của $a$ và $m$ chia hết vế trái nên chia hết $1$, và $\gcd(a,m)=1$.`,
          ],
        },
        {
          kind: "dinh-ly", title: "Định lí Fermat nhỏ",
          text: R`Nếu $p$ là số nguyên tố và $p$ không chia hết $a$ thì $a^{p-1}\equiv1\pmod p$.`,
          suy: [
            R`Xét các số $a,2a,3a,\dots,(p-1)a$ theo modulo $p$. Mỗi số khác $0\pmod p$ vì $p$ nguyên tố và không chia hết $a$ hay $k$.`,
            R`Chúng đôi một khác nhau modulo $p$: nếu $ia\equiv ja$ thì $p\mid(i-j)a$, nên $p\mid(i-j)$, và vì $|i-j|<p$ nên $i=j$. Vậy chúng là một hoán vị của $1,2,\dots,p-1$.`,
            R`Nhân tất cả lại: $a^{p-1}(p-1)!\equiv(p-1)!\pmod p$. Vì $(p-1)!$ không chia hết cho $p$ nên có nghịch đảo, và chia hai vế cho nó được $a^{p-1}\equiv1$.`,
          ],
          suyKhac: [
            {
              cach: "Bằng quy nạp và nhị thức Newton",
              buoc: [
                R`Ta chứng minh $a^p\equiv a\pmod p$ với mọi số nguyên $a\ge0$ bằng quy nạp theo $a$. Với $a=0$ điều đó đúng vì hai vế đều bằng $0$.`,
                R`Khai triển $(a+1)^p=\sum_{k=0}^{p}\binom pk a^k$. Với $0<k<p$, $\binom pk=\frac{p!}{k!(p-k)!}$ có $p$ ở tử mà không có ở mẫu (vì $p$ nguyên tố và $k,p-k<p$), nên $p\mid\binom pk$.`,
                R`Vậy $(a+1)^p\equiv a^p+1\equiv a+1\pmod p$ theo giả thiết quy nạp.`,
                R`Nếu $p\nmid a$, từ $a^p\equiv a$ ta có $a(a^{p-1}-1)\equiv0\pmod p$. Vì $a$ có nghịch đảo modulo $p$ nên $a^{p-1}\equiv1$.`,
              ],
            },
          ],
        },
        {
          kind: "cach-lam", title: "Lũy thừa modulo bằng bình phương liên tiếp",
          text: R`Để tính $a^e\bmod m$, viết $e$ trong hệ nhị phân, bình phương liên tiếp $a$, $a^2$, $a^4$, $\dots$ theo modulo $m$ và nhân các số ứng với chữ số $1$ của $e$. Mỗi bước rút gọn theo modulo nên số không bao giờ lớn, ngay cả với số mũ rất lớn.`,
        },
        {
          kind: "vi-du",
          text: R`Tính $3^{100}\bmod7$. Vì $3^6\equiv1\pmod7$ theo định lí Fermat nhỏ, $3^{100}=3^{96}\cdot3^4\equiv3^4=81\equiv4\pmod7$. Nghịch đảo của $3$ theo modulo $11$ là $4$ vì $3\cdot4=12\equiv1$. Và $2^{10}=1024\equiv1\pmod{11}$.`,
        },
        { kind: "luu-y", text: R`Định lí Fermat nhỏ cần $p$ nguyên tố. Với hợp số có thể sai: modulo $6$ và $a=2$ có $2^{5}=32\equiv2$, không phải $1$. Chia cả hai vế của một đồng dư cho một số cũng chỉ được khi số đó có nghịch đảo modulo $m$.` },
      ],
    },
    {
      title: "Ứng dụng: mật mã RSA",
      items: [
        {
          kind: "dinh-nghia", title: "Khóa RSA",
          text: R`Chọn hai số nguyên tố $p$, $q$, đặt $n=pq$ và $\varphi=(p-1)(q-1)$. Chọn $e$ với $\gcd(e,\varphi)=1$, và $d$ thỏa $ed\equiv1\pmod\varphi$. Khóa công khai là $(n,e)$, khóa riêng là $d$. Mã hóa $c=m^e\bmod n$, giải mã $m=c^d\bmod n$.`,
          de: R`Hình dung một cái hộp có khóa bấm: ai cũng có thể bấm khóa lại, nhưng chỉ người có chìa mới mở được. Khóa công khai $(n,e)$ là cách bấm khóa, phát cho mọi người. Khóa riêng $d$ là chìa. Tính ra $d$ từ $n$ và $e$ đòi hỏi phải biết $p$, $q$, tức phân tích $n$ ra thừa số, việc cực khó khi $n$ rất lớn.`,
        },
        {
          kind: "dinh-ly", title: "RSA giải mã đúng",
          text: R`Với $n=pq$, $ed\equiv1\pmod{(p-1)(q-1)}$ và $0\le m<n$, ta có $\left(m^{e}\right)^{d}\equiv m\pmod n$.`,
          suy: [
            R`Vì $ed\equiv1\pmod{(p-1)(q-1)}$ nên $ed=1+k(p-1)(q-1)$ với một $k\ge0$ nguyên. Cần chứng minh $m^{ed}\equiv m$ theo từng modulo $p$ và $q$.`,
            R`Theo modulo $p$: nếu $p\mid m$ thì cả hai vế đều $\equiv0$. Nếu $p\nmid m$ thì theo Fermat nhỏ $m^{p-1}\equiv1$, nên $m^{ed}=m\cdot\left(m^{p-1}\right)^{k(q-1)}\equiv m\pmod p$.`,
            R`Tương tự, $m^{ed}\equiv m\pmod q$ với vai trò của $q$ và $\left(m^{q-1}\right)^{k(p-1)}$.`,
            R`Vậy $p$ và $q$ cùng chia hết $m^{ed}-m$. Vì $p$, $q$ là hai số nguyên tố khác nhau nên tích $n=pq$ cũng chia hết $m^{ed}-m$, tức $m^{ed}\equiv m\pmod n$.`,
          ],
        },
        {
          kind: "cach-lam", title: "Tạo một khóa nhỏ",
          text: R`Chọn $p=5$ và $q=11$, được $n=55$ và $\varphi=4\cdot10=40$. Chọn $e=3$ vì $\gcd(3,40)=1$. Tìm $d$ với $3d\equiv1\pmod{40}$ bằng thuật toán Euclid mở rộng, được $d=27$ vì $3\cdot27=81=2\cdot40+1$.`,
        },
        {
          kind: "vi-du",
          text: R`Với khóa trên, mã hóa tin nhắn $m=7$ cho $c=7^3\bmod55=343-6\cdot55=13$. Giải mã: $13^{27}\bmod55=7$, đúng tin nhắn ban đầu. Người nghe lén chỉ có $n=55$, $e=3$ và $c=13$. Với số nhỏ như vậy họ phân tích được $55=5\cdot11$ ngay, nhưng với $n$ hàng trăm chữ số thì không làm nổi.`,
        },
        { kind: "luu-y", text: R`RSA thật dùng số nguyên tố hàng trăm chữ số, kèm các bước đệm ngẫu nhiên cho tin nhắn. Phiên bản trong bài chỉ để hiểu toán, không dùng để bảo vệ dữ liệu thật.` },
      ],
    },
  ],
  canNho: [
    R`Phương trình vi phân cho hướng đi tại từng điểm; tách biến $\int\frac{dy}{h(y)}=\int g\,dx$ và nhân tử $\mu=e^{\int p}$ cho phương trình tuyến tính.`,
    R`Phương trình $y'=ky$ có nghiệm $y_0e^{kt}$, thời gian nhân đôi $\frac{\ln2}{k}$; logistic có nghiệm $\frac{K}{1+Ae^{-rt}}$ tiến về sức chứa $K$.`,
    R`Cân bằng $y^*$ ổn định khi $f'(y^*)<0$; Euler $y_{n+1}=y_n+hf(x_n;y_n)$ có sai số cỡ $h$ và có thể mất ổn định khi $h$ lớn.`,
    R`Trong mô hình SIR, dịch bùng khi $R_0\frac SN>1$ với $R_0=\frac\beta\gamma$, và đạt đỉnh khi $S=\frac{N}{R_0}$.`,
    R`Bổ đề bắt tay: $\sum\deg v=2|E|$, nên số đỉnh bậc lẻ là số chẵn; cây có $n$ đỉnh có $n-1$ cạnh.`,
    R`Đồng dư giữ nguyên phép cộng và nhân; $a$ có nghịch đảo modulo $m$ khi và chỉ khi $\gcd(a,m)=1$.`,
    R`Fermat nhỏ: $p$ nguyên tố, $p\nmid a$ thì $a^{p-1}\equiv1\pmod p$; tính lũy thừa modulo bằng bình phương liên tiếp.`,
    R`RSA: $n=pq$, $ed\equiv1\pmod{(p-1)(q-1)}$, mã hóa $c=m^e$, giải mã $m=c^d$ theo modulo $n$; an toàn nhờ khó phân tích $n$.`,
  ],
  lienQuan: [
    { id: "exp", vi: R`Nghiệm của $y'=ky$ là hàm mũ $e^{kt}$, và thời gian nhân đôi dùng logarit tự nhiên.` },
    { id: "integral", vi: R`Tách biến và nhân tử tích phân đều dựa vào nguyên hàm; phương pháp Euler là phiên bản rời rạc của tích phân.` },
    { id: "combo", vi: R`Đếm theo hai cách là kĩ thuật chung của bổ đề bắt tay và hệ số nhị thức trong chứng minh Fermat nhỏ.` },
    { id: "sequence", vi: R`Phương pháp Euler cho một dãy truy hồi, và quy nạp là công cụ để chứng minh tính chất của đồ thị và đồng dư.` },
  ],
  checks: [
    { expr: "simplify(diff(C*exp(x**2),x)-2*x*C*exp(x**2))", expect: "0" },
    { expr: "simplify(diff(x-1+C*exp(-x),x)+(x-1+C*exp(-x))-x)", expect: "0" },
    { expr: "integrate(x*exp(x), x)", expect: "(x-1)*exp(x)" },
    { expr: "simplify(diff(exp(P(x))*y(x),x)-exp(P(x))*(diff(y(x),x)+diff(P(x),x)*y(x)))", expect: "0" },
    { expr: "simplify(K/(y*(K-y))-(1/y+1/(K-y)))", expect: "0" },
    { expr: "simplify(diff(K/(1+A*exp(-r*t)),t)-r*(K/(1+A*exp(-r*t)))*(1-1/(1+A*exp(-r*t))))", expect: "0" },
    { expr: "(100-10)/10", expect: "9" },
    { expr: "100/(1+9)", expect: "10" },
    { expr: "diff(r*y*(1-y/K),y).subs(y,K)", expect: "-r" },
    { expr: "diff(r*y*(1-y/K),y).subs(y,0)", expect: "r" },
    { expr: "Rational(11,10)**10", expect: "25937424601/10000000000" },
    { expr: "1-10*Rational(3,10)", expect: "-2" },
    { expr: "1-Rational(1,3)", expect: "2/3" },
    { expr: "simplify(-b*s*i/n+(b*s*i/n-g*i)+g*i)", expect: "0" },
    { expr: "10*3/2", expect: "15" },
    { expr: "Rational(7*2,1)", expect: "14" },
    { expr: "binomial(7,3)%7", expect: "0" },
    { expr: "Mod(3**100, 7)", expect: "4" },
    { expr: "Mod(3*4, 11)", expect: "1" },
    { expr: "Mod(2**10, 11)", expect: "1" },
    { expr: "Mod(3*27, 40)", expect: "1" },
    { expr: "Mod(7**3, 55)", expect: "13" },
    { expr: "Mod(13**27, 55)", expect: "7" },
    { expr: "gcd(3,40)", expect: "1" },
    { expr: "expand((b+k*m)*(d+l*m)-(b*d+m*(b*l+d*k+k*l*m)))", expect: "0" },
  ],
};
