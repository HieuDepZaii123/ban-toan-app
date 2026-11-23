import type { TopicKnowledge } from "../knowledge/types.ts";

const R = String.raw;

export const statsKnowledge: TopicKnowledge = {
  id: "stats",
  tongQuat: {
    la: R`Xác suất thống kê mô tả sự ngẫu nhiên bằng biến ngẫu nhiên, kì vọng và phương sai, rồi dùng các định lí giới hạn (luật số lớn, định lí giới hạn trung tâm) để suy ra điều gì đó chắc chắn từ dữ liệu không chắc chắn. Phần thống kê làm ngược lại: từ một mẫu nhỏ, ước lượng đặc trưng của cả tập lớn và kiểm tra xem một giả thuyết có đứng vững hay không.`,
    dungDe: R`Đánh giá rủi ro, kiểm soát chất lượng, khảo sát dư luận, thử nghiệm thuốc, và A/B test của các sản phẩm số: so hai phiên bản trang web xem phiên bản nào được bấm nhiều hơn một cách đáng tin cậy. Trong thi cử, môn này cho bài kì vọng, phương sai, xấp xỉ chuẩn, khoảng tin cậy và kiểm định.`,
    lienHe: R`Nối từ chuyên đề Xác suất và Tổ hợp ở THPT: nhị thức, kì vọng và phân phối xuất phát từ việc đếm. Tích phân cho xác suất của biến liên tục, hàm mũ xuất hiện trong mật độ chuẩn, và các tổng riêng của Giải tích đứng sau luật số lớn.`,
  },
  tuDau: [
    R`Tung một đồng xu cân đối mười lần, bạn có thể được bảy mặt ngửa, và không ai ngạc nhiên. Tung mười nghìn lần mà được bảy nghìn mặt ngửa thì ai cũng nghi đồng xu bị gian lận. Cái gì đã đổi? Số lần lớn làm cho kết quả trung bình ổn định, và mức ổn định ấy có thể đo được: đó là chủ đề của luật số lớn.`,
    R`Để đo sự ổn định cần hai con số cho một đại lượng ngẫu nhiên: giá trị trung bình lâu dài (kì vọng) và mức dao động quanh giá trị đó (phương sai). Hai con số này chứa gần như mọi thứ ta cần, và chúng cộng được: kì vọng của tổng bằng tổng các kì vọng, còn phương sai của tổng các đại lượng độc lập bằng tổng các phương sai.`,
    R`Điều kì lạ nhất là hình dạng. Cộng nhiều đại lượng ngẫu nhiên độc lập, dù từng đại lượng có hình dạng thế nào, tổng dần có hình chuông. Đó là định lí giới hạn trung tâm, và nó giải thích vì sao đường cong chuông xuất hiện khắp nơi, từ chiều cao con người tới sai số của phép đo.`,
    R`Thống kê dùng các định lí ấy theo chiều ngược. Ta chỉ có một mẫu, không biết giá trị thật của cả tập lớn, nhưng biết trung bình mẫu dao động quanh giá trị thật theo hình chuông có độ rộng tính được. Từ đó ta vẽ khoảng tin cậy và quyết định một sự khác biệt là thật hay chỉ do may rủi.`,
  ],
  kyHieu: [
    { kh: R`$E[X]$`, doc: R`Kì vọng của biến ngẫu nhiên $X$: giá trị trung bình lâu dài nếu lặp lại thật nhiều lần.` },
    { kh: R`$\operatorname{Var}X$`, doc: R`Phương sai của $X$: trung bình của bình phương độ lệch khỏi kì vọng.` },
    { kh: R`$\sigma$`, doc: R`Độ lệch chuẩn, bằng căn bậc hai của phương sai; cùng đơn vị với $X$.` },
    { kh: R`$\bar{x}$`, doc: R`Trung bình mẫu: tổng các giá trị quan sát chia cho số quan sát.` },
    { kh: R`$\binom{n}{k}$`, doc: R`Số cách chọn $k$ phần tử từ $n$ phần tử, không kể thứ tự.` },
    { kh: R`$\Phi(z)$`, doc: R`Hàm phân phối chuẩn tắc: xác suất để biến chuẩn tắc không vượt quá $z$.` },
    { kh: R`$H_0$`, doc: R`Giả thuyết không: điều ta thử bác bỏ, thường là «không có sự khác biệt».` },
    { kh: R`$\hat{p}$`, doc: R`Tỉ lệ mẫu: số lần thành công chia cho số lần quan sát.` },
  ],
  canBiet: [
    R`Xác suất cổ điển, xác suất có điều kiện và biến cố độc lập ở chuyên đề Xác suất.`,
    R`Tổ hợp $\binom{n}{k}$ và nhị thức Newton ở chuyên đề Tổ hợp.`,
    R`Tích phân xác định, dùng cho phân phối liên tục và hàm phân phối.`,
  ],
  sections: [
    {
      title: "Biến ngẫu nhiên và phân phối",
      items: [
        {
          kind: "dinh-nghia", title: "Biến ngẫu nhiên",
          text: R`Biến ngẫu nhiên $X$ là một đại lượng nhận giá trị số tùy theo kết quả của một phép thử ngẫu nhiên. Phân phối của $X$ cho biết xác suất của từng giá trị (rời rạc) hoặc của từng khoảng giá trị (liên tục).`,
          de: R`Tung hai xúc xắc rồi lấy tổng hai mặt: tổng là một con số, nhưng nó thay đổi theo từng lần tung, và ta chưa biết trước. Biến ngẫu nhiên chính là con số chưa biết trước ấy. Ta không dự đoán được từng lần, nhưng biết khá rõ mỗi giá trị xảy ra thường xuyên đến đâu.`,
        },
        {
          kind: "dinh-nghia", title: "Hàm phân phối và mật độ",
          text: R`Hàm phân phối của $X$ là $F(x)=P(X\le x)$. Biến liên tục có mật độ $f\ge0$ sao cho $P(a\le X\le b)=\int_a^bf(x)\,dx$ và $\int_{-\infty}^{\infty}f=1$.`,
          de: R`Hàm phân phối cộng dồn xác suất từ bên trái: tại $x$ nó cho biết bao nhiêu phần trăm giá trị nằm không quá $x$. Mật độ cho biết xác suất «dày» ở đâu: xác suất của một khoảng là diện tích dưới đường mật độ trên khoảng đó, và toàn bộ diện tích dưới đường mật độ bằng $1$.`,
        },
        {
          kind: "cong-thuc", title: "Phân phối nhị thức",
          text: R`Nếu $X$ là số lần thành công trong $n$ phép thử độc lập, mỗi lần thành công với xác suất $p$, thì $P(X=k)=\binom{n}{k}p^k(1-p)^{n-k}$ với $k=0,1,\dots,n$.`,
          suy: [
            R`Một kết quả cụ thể có đúng $k$ lần thành công và $n-k$ lần thất bại, ví dụ thành công ở $k$ lần đầu. Vì các phép thử độc lập nên xác suất của kết quả đó là $p^k(1-p)^{n-k}$.`,
            R`Mọi kết quả khác có đúng $k$ thành công chỉ khác ở vị trí các lần thành công, và có cùng xác suất $p^k(1-p)^{n-k}$. Số cách chọn vị trí của $k$ lần thành công trong $n$ lần là $\binom{n}{k}$.`,
            R`Các kết quả này đôi một xung khắc, nên xác suất có đúng $k$ thành công là tổng của $\binom{n}{k}$ số hạng bằng nhau, tức $\binom{n}{k}p^k(1-p)^{n-k}$.`,
          ],
        },
        {
          kind: "cach-lam", title: "Từ mật độ tính xác suất",
          text: R`Vẽ đường mật độ, xác định khoảng cần tính, rồi lấy diện tích dưới đường mật độ trên khoảng đó bằng tích phân. Với biến liên tục, xác suất của một điểm riêng lẻ bằng $0$, nên có hay không có dấu bằng ở hai đầu khoảng đều cho cùng kết quả.`,
        },
        {
          kind: "vi-du",
          text: R`Biến $X$ có mật độ đều $f=\frac12$ trên $[0;2]$. Khi đó $P(0{,}5\le X\le1{,}5)=\int_{0,5}^{1,5}\frac12\,dx=\frac12$. Với nhị thức $n=10$, $p=\frac12$ thì $P(X=3)=\binom{10}{3}\frac{1}{2^{10}}=\frac{120}{1024}=\frac{15}{128}\approx0{,}117$.`,
        },
        { kind: "luu-y", text: R`Mật độ $f(x)$ không phải xác suất: nó có thể lớn hơn $1$ ở những chỗ hẹp mà xác suất dày. Chỉ diện tích dưới mật độ mới là xác suất.` },
      ],
    },
    {
      title: "Kì vọng và phương sai",
      items: [
        {
          kind: "dinh-nghia", title: "Kì vọng",
          text: R`Kì vọng của biến rời rạc $X$ nhận giá trị $x_i$ với xác suất $p_i$ là $E[X]=\sum x_ip_i$. Với biến liên tục có mật độ $f$ thì $E[X]=\int xf(x)\,dx$.`,
          de: R`Kì vọng là giá trị trung bình mà bạn sẽ nhận nếu lặp lại phép thử thật nhiều lần. Mỗi giá trị được tính theo mức thường xuyên của nó: giá trị nào xảy ra nhiều thì kéo trung bình về phía mình nhiều hơn. Nó giống tâm của một thanh cân, nơi thanh nằm thăng bằng.`,
        },
        {
          kind: "dinh-nghia", title: "Phương sai và độ lệch chuẩn",
          text: R`Phương sai của $X$ có kì vọng $\mu$ là $\operatorname{Var}X=E\left[(X-\mu)^2\right]$. Độ lệch chuẩn là $\sigma=\sqrt{\operatorname{Var}X}$.`,
          de: R`Hai người cùng có điểm trung bình $7$, một người luôn được $7$, người kia lúc $10$ lúc $4$. Kì vọng không phân biệt được họ. Phương sai đo mức dao động: bình phương độ lệch khỏi trung bình rồi lấy trung bình. Độ lệch chuẩn lấy căn để trở về cùng đơn vị với điểm số.`,
        },
        {
          kind: "dinh-ly", title: "Tính tuyến tính của kì vọng",
          text: R`Với mọi biến ngẫu nhiên $X$, $Y$ có kì vọng tồn tại và số $a$, $b$ ta có $E[aX+bY]=aE[X]+bE[Y]$, dù $X$ và $Y$ có độc lập hay không.`,
          suy: [
            R`Với hai biến rời rạc có phân phối đồng thời $P(X=x_i,Y=y_j)=p_{ij}$, kì vọng của $aX+bY$ là $\sum_{i,j}(ax_i+by_j)p_{ij}$.`,
            R`Tách thành hai tổng: $a\sum_ix_i\sum_jp_{ij}+b\sum_jy_j\sum_ip_{ij}$. Tổng $\sum_jp_{ij}$ chính là $P(X=x_i)$ và $\sum_ip_{ij}$ là $P(Y=y_j)$, nên kết quả là $aE[X]+bE[Y]$.`,
            R`Trong cả hai bước ta không dùng đến tính độc lập, vì vậy kết luận đúng cho mọi cặp biến. Chứng minh viết cho biến rời rạc có kì vọng hội tụ tuyệt đối; biến liên tục làm tương tự, thay tổng bằng tích phân.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Công thức tính phương sai",
          text: R`Phương sai bằng kì vọng của bình phương trừ bình phương của kì vọng: $\operatorname{Var}X=E[X^2]-(E[X])^2$.`,
          suy: [
            R`Khai triển bình phương trong định nghĩa: $(X-\mu)^2=X^2-2\mu X+\mu^2$.`,
            R`Lấy kì vọng từng số hạng nhờ tính tuyến tính: $E[X^2]-2\mu E[X]+\mu^2$. Vì $E[X]=\mu$ nên biểu thức bằng $E[X^2]-2\mu^2+\mu^2=E[X^2]-\mu^2$.`,
          ],
        },
        {
          kind: "dinh-ly", title: "Phương sai của tổng độc lập",
          text: R`Nếu $X$ và $Y$ độc lập thì $\operatorname{Var}(X+Y)=\operatorname{Var}X+\operatorname{Var}Y$. Nếu chúng phụ thuộc thì tổng này lệch thêm $2\operatorname{Cov}(X,Y)$, với $\operatorname{Cov}(X,Y)=E[XY]-E[X]E[Y]$.`,
          suy: [
            R`Đặt $\mu_X=E[X]$, $\mu_Y=E[Y]$. Khi đó $E[X+Y]=\mu_X+\mu_Y$, và $\operatorname{Var}(X+Y)=E\left[\big((X-\mu_X)+(Y-\mu_Y)\big)^2\right]$.`,
            R`Khai triển bình phương và lấy kì vọng từng số hạng: $\operatorname{Var}X+\operatorname{Var}Y+2E\big[(X-\mu_X)(Y-\mu_Y)\big]$.`,
            R`Với $X$ và $Y$ độc lập, kì vọng của tích bằng tích các kì vọng: $E\big[(X-\mu_X)(Y-\mu_Y)\big]=E[X-\mu_X]\cdot E[Y-\mu_Y]=0\cdot0=0$. Vậy số hạng giữa biến mất.`,
          ],
          suyKhac: [
            {
              cach: "Bằng hàm sinh moment",
              buoc: [
                R`Giả sử các hàm sinh moment $M_X(t)=E[e^{tX}]$ và $M_Y(t)$ tồn tại gần $t=0$. Vì $X$, $Y$ độc lập nên $E[e^{t(X+Y)}]=E[e^{tX}]E[e^{tY}]$, tức $M_{X+Y}=M_XM_Y$.`,
                R`Lấy logarit: với $K=\ln M$ ta có $K_{X+Y}=K_X+K_Y$. Hàm $K$ có $K(0)=0$, $K'(0)=E[X]$ và $K''(0)=\frac{M''(0)}{M(0)}-\left(\frac{M'(0)}{M(0)}\right)^2=E[X^2]-(E[X])^2=\operatorname{Var}X$.`,
                R`Đạo hàm cấp hai tại $0$ của $K_{X+Y}=K_X+K_Y$ cho $\operatorname{Var}(X+Y)=\operatorname{Var}X+\operatorname{Var}Y$. Cách này không khai triển bình phương, và cho thấy cả các «bán bất biến» bậc cao hơn cũng cộng được.`,
              ],
            },
          ],
        },
        {
          kind: "cong-thuc", title: "Kì vọng và phương sai của nhị thức",
          text: R`Nếu $X$ có phân phối nhị thức với $n$ phép thử, xác suất $p$, đặt $q=1-p$, thì $E[X]=np$ và $\operatorname{Var}X=npq$.`,
          suy: [
            R`Viết $X=B_1+\dots+B_n$ với $B_i=1$ nếu lần thứ $i$ thành công và $B_i=0$ nếu thất bại. Mỗi $B_i$ có $E[B_i]=p$ và $E[B_i^2]=p$, nên $\operatorname{Var}B_i=p-p^2=pq$.`,
            R`Theo tính tuyến tính, $E[X]=np$. Các $B_i$ độc lập nên phương sai của tổng bằng tổng các phương sai: $\operatorname{Var}X=npq$.`,
          ],
        },
        {
          kind: "vi-du",
          text: R`Một xúc xắc có $E[X]=\frac{1+2+3+4+5+6}{6}=\frac72$ và $E[X^2]=\frac{91}{6}$, nên $\operatorname{Var}X=\frac{91}{6}-\frac{49}{4}=\frac{35}{12}$. Hai xúc xắc độc lập có phương sai tổng $\frac{35}{6}$. Tung đồng xu $100$ lần: số mặt ngửa có kì vọng $50$ và phương sai $100\cdot\frac12\cdot\frac12=25$, độ lệch chuẩn $5$.`,
        },
        { kind: "luu-y", text: R`Phương sai không tuyến tính: $\operatorname{Var}(aX)=a^2\operatorname{Var}X$, và $\operatorname{Var}(X-Y)=\operatorname{Var}X+\operatorname{Var}Y$ khi độc lập (phương sai vẫn cộng, không trừ). Chỉ khi hiệp phương sai khác $0$ thì công thức cộng phương sai mới không còn đúng.` },
      ],
    },
    {
      title: "Luật số lớn",
      items: [
        {
          kind: "dinh-ly", title: "Bất đẳng thức Markov",
          text: R`Nếu $X\ge0$ và $a>0$ thì $P(X\ge a)\le\frac{E[X]}{a}$.`,
          suy: [
            R`Vì $X\ge0$ nên $X\ge a$ trên biến cố $\{X\ge a\}$ và $X\ge0$ ở nơi khác. Viết gọn, $X\ge a\cdot\mathbf{1}_{\{X\ge a\}}$ với mọi kết quả, trong đó $\mathbf{1}$ bằng $1$ khi biến cố xảy ra và bằng $0$ khi ngược lại.`,
            R`Lấy kì vọng hai vế: $E[X]\ge a\,P(X\ge a)$. Chia cho $a>0$ được $P(X\ge a)\le\frac{E[X]}{a}$.`,
          ],
        },
        {
          kind: "dinh-ly", title: "Bất đẳng thức Chebyshev",
          text: R`Nếu $X$ có kì vọng $\mu$ và phương sai $\sigma^2$ hữu hạn, $\sigma>0$, thì với mọi $k>0$: $P(|X-\mu|\ge k\sigma)\le\frac{1}{k^2}$.`,
          suy: [
            R`Áp dụng bất đẳng thức Markov cho biến không âm $(X-\mu)^2$ với ngưỡng $a=k^2\sigma^2$.`,
            R`Biến cố $|X-\mu|\ge k\sigma$ xảy ra đúng khi $(X-\mu)^2\ge k^2\sigma^2$. Do đó $P(|X-\mu|\ge k\sigma)\le\frac{E[(X-\mu)^2]}{k^2\sigma^2}=\frac{\sigma^2}{k^2\sigma^2}=\frac1{k^2}$.`,
          ],
          suyKhac: [
            {
              cach: "Bằng chia tổng thành hai phần",
              buoc: [
                R`Cách này dùng cùng ý với Markov nhưng viết thẳng, không gọi tên Markov. Với biến rời rạc (biến liên tục thay tổng bằng tích phân), viết $\sigma^2=\sum(x_i-\mu)^2p_i$ rồi tách thành hai tổng: các giá trị có $|x_i-\mu|\ge\varepsilon$ và các giá trị còn lại, với $\varepsilon=k\sigma$.`,
                R`Bỏ phần thứ hai, vì mọi số hạng đều không âm: $\sigma^2\ge\sum_{|x_i-\mu|\ge\varepsilon}(x_i-\mu)^2p_i$.`,
                R`Trong phần còn lại mỗi $(x_i-\mu)^2\ge\varepsilon^2$, nên $\sigma^2\ge\varepsilon^2\sum_{|x_i-\mu|\ge\varepsilon}p_i=\varepsilon^2P(|X-\mu|\ge\varepsilon)$. Chia cho $\varepsilon^2=k^2\sigma^2$ ta được kết luận, không cần qua bất đẳng thức Markov.`,
              ],
            },
          ],
        },
        {
          kind: "dinh-ly", title: "Luật số lớn yếu",
          text: R`Cho $X_1,\dots,X_n$ độc lập, cùng kì vọng $\mu$ và phương sai $\sigma^2>0$, và $\bar X_n=\frac{X_1+\dots+X_n}{n}$. Với mọi $\varepsilon>0$: $P(|\bar X_n-\mu|\ge\varepsilon)\le\frac{\sigma^2}{n\varepsilon^2}\to0$ khi $n\to\infty$.`,
          suy: [
            R`Theo tính tuyến tính, $E[\bar X_n]=\mu$. Vì các biến độc lập nên $\operatorname{Var}(X_1+\dots+X_n)=n\sigma^2$, và $\operatorname{Var}(\bar X_n)=\frac{1}{n^2}\cdot n\sigma^2=\frac{\sigma^2}{n}$.`,
            R`Áp dụng bất đẳng thức Chebyshev cho $\bar X_n$ với $\varepsilon=k\frac{\sigma}{\sqrt n}$: $P(|\bar X_n-\mu|\ge\varepsilon)\le\frac{\sigma^2/n}{\varepsilon^2}=\frac{\sigma^2}{n\varepsilon^2}$.`,
            R`Với $\varepsilon$ cố định, vế phải tiến về $0$ khi $n\to\infty$. Nghĩa là trung bình mẫu ở gần $\mu$ với xác suất tiến về $1$.`,
          ],
        },
        {
          kind: "cach-lam", title: "Tính số lần thử cần thiết",
          text: R`Muốn trung bình mẫu lệch khỏi $\mu$ quá $\varepsilon$ với xác suất không quá $\delta$, chỉ cần $n\ge\frac{\sigma^2}{\varepsilon^2\delta}$. Đây là một điều kiện đủ, thường rất dư, nhưng nó đúng với mọi phân phối có phương sai hữu hạn.`,
        },
        {
          kind: "vi-du",
          text: R`Trung bình của $n$ lần tung một xúc xắc (có $\sigma^2=\frac{35}{12}$) lệch khỏi $3{,}5$ quá $0{,}1$ với xác suất không quá $0{,}05$ khi $n\ge\frac{35/12}{0{,}01\cdot0{,}05}=\frac{35\cdot2000}{12}\approx5833{,}3$, tức $n=5834$ là đủ. Với $k=2$, Chebyshev cho $P(|X-\mu|\ge2\sigma)\le\frac14$.`,
        },
        { kind: "luu-y", text: R`Chebyshev đúng cho mọi phân phối nên rất lỏng. Với phân phối chuẩn, xác suất lệch quá $2\sigma$ chỉ khoảng $0{,}046$, nhỏ hơn nhiều so với cận $\frac14$.` },
      ],
    },
    {
      title: "Định lí giới hạn trung tâm",
      items: [
        {
          kind: "dinh-nghia", title: "Phân phối chuẩn",
          text: R`Biến $X$ có phân phối chuẩn $N(\mu;\sigma^2)$ nếu mật độ của nó là $f(x)=\frac{1}{\sigma\sqrt{2\pi}}e^{-\frac{(x-\mu)^2}{2\sigma^2}}$. Biến chuẩn tắc $Z\sim N(0;1)$ có hàm phân phối $\Phi(z)$, và $\frac{X-\mu}{\sigma}$ là chuẩn tắc.`,
          de: R`Đường cong chuông: đối xứng quanh giá trị trung bình $\mu$, dày nhất ở giữa và thưa dần hai bên. Độ lệch chuẩn $\sigma$ quyết định độ rộng: khoảng $\mu\pm\sigma$ chứa khoảng $68\%$ giá trị, $\mu\pm2\sigma$ chứa khoảng $95\%$. Đổi sang đơn vị «bao nhiêu độ lệch chuẩn từ trung bình» thì mọi chuông đều thành một.`,
        },
        {
          kind: "dinh-ly", title: "Định lí giới hạn trung tâm",
          text: R`Cho $X_1,\dots,X_n$ độc lập, cùng phân phối, kì vọng $\mu$, phương sai $\sigma^2$ hữu hạn, và $S_n=X_1+\dots+X_n$. Khi $n\to\infty$, biến chuẩn hóa $Z_n=\frac{S_n-n\mu}{\sigma\sqrt n}$ có phân phối tiến về chuẩn tắc $N(0;1)$.`,
          suy: [
            R`Đặt $Y_i=\frac{X_i-\mu}{\sigma}$: $E[Y_i]=0$ và $\operatorname{Var}Y_i=1$. Khi đó $Z_n=\frac{1}{\sqrt n}\sum Y_i$ có kì vọng $0$ và phương sai $\frac{1}{n}\cdot n=1$ với mọi $n$.`,
            R`Để gọn, ta thêm giả thiết hàm sinh moment $M(t)=E[e^{tY}]$ tồn tại gần $0$ (bản đầy đủ chỉ cần phương sai hữu hạn và dùng hàm đặc trưng). Vì các $Y_i$ độc lập nên $E[e^{tZ_n}]=\left(M\left(\frac{t}{\sqrt n}\right)\right)^n$. Khai triển Taylor, $M(s)=1+\frac{s^2}{2}+o(s^2)$ vì $E[Y]=0$ và $E[Y^2]=1$.`,
            R`Thay $s=\frac{t}{\sqrt n}$: $\left(1+\frac{t^2}{2n}+o\left(\frac1n\right)\right)^n\to e^{t^2/2}$ khi $n\to\infty$. Đây chính là hàm sinh moment của phân phối chuẩn tắc.`,
            R`Hội tụ của hàm sinh moment về hàm sinh moment của chuẩn tắc kéo theo hội tụ của phân phối (định lí Curtiss, tương ứng với định lí liên tục Lévy cho hàm đặc trưng). Khẳng định này được dùng mà không chứng minh.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Sai số chuẩn của trung bình mẫu",
          text: R`Trung bình của $n$ quan sát độc lập có độ lệch chuẩn $\frac{\sigma}{\sqrt n}$, gọi là sai số chuẩn. Theo định lí giới hạn trung tâm, $\bar X_n$ xấp xỉ $N\left(\mu;\frac{\sigma^2}{n}\right)$ khi $n$ đủ lớn.`,
          suy: [
            R`Từ chứng minh luật số lớn, $\operatorname{Var}(\bar X_n)=\frac{\sigma^2}{n}$, nên độ lệch chuẩn của $\bar X_n$ là $\frac{\sigma}{\sqrt n}$.`,
            R`$\bar X_n=\frac{S_n}{n}$ nên $\frac{\bar X_n-\mu}{\sigma/\sqrt n}=\frac{S_n-n\mu}{\sigma\sqrt n}=Z_n$, mà $Z_n$ tiến về chuẩn tắc. Vậy $\bar X_n\approx N\left(\mu;\frac{\sigma^2}{n}\right)$.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Xấp xỉ nhị thức bằng chuẩn",
          text: R`Nếu $X$ có phân phối nhị thức $(n;p)$ với $npq$ đủ lớn thì $P(X\le k)\approx\Phi\left(\frac{k+0{,}5-np}{\sqrt{npq}}\right)$, với $0{,}5$ là hiệu chỉnh liên tục.`,
          suy: [
            R`Nhị thức là tổng của $n$ biến Bernoulli độc lập có kì vọng $p$ và phương sai $pq$, nên theo định lí giới hạn trung tâm $\frac{X-np}{\sqrt{npq}}$ xấp xỉ chuẩn tắc.`,
            R`$X$ chỉ nhận giá trị nguyên, và giá trị $k$ ứng với khoảng $[k-0{,}5;k+0{,}5]$ của biến liên tục. Do đó $P(X\le k)$ ứng với $P(Y\le k+0{,}5)$, đây là lí do cộng $0{,}5$.`,
          ],
        },
        {
          kind: "cach-lam", title: "Dùng định lí giới hạn trung tâm",
          text: R`Tính kì vọng và độ lệch chuẩn của đại lượng cần tính, chuẩn hóa bằng cách lấy giá trị trừ kì vọng rồi chia cho độ lệch chuẩn để được $z$, rồi tra $\Phi(z)$. Nhớ dùng độ lệch chuẩn của tổng là $\sigma\sqrt n$, hoặc của trung bình là $\frac{\sigma}{\sqrt n}$, chứ không phải $\sigma$.`,
        },
        {
          kind: "vi-du",
          text: R`Tung đồng xu $100$ lần, tính $P(X\ge60)$ với $np=50$, $\sqrt{npq}=5$. Có $P(X\ge60)=1-P(X\le59)\approx1-\Phi\left(\frac{59{,}5-50}{5}\right)=1-\Phi(1{,}9)\approx0{,}029$. Trung bình $100$ lần tung xúc xắc có phương sai $\frac{35/12}{100}=\frac{7}{240}$ và sai số chuẩn khoảng $0{,}171$.`,
        },
        { kind: "luu-y", text: R`Định lí cho kết quả khi $n$ lớn. Với phân phối rất lệch (như thời gian chờ có đuôi dài) hay $np$, $nq$ nhỏ, cần $n$ lớn hơn nhiều so với quy ước thông thường $n\ge30$ thì xấp xỉ mới tốt.` },
      ],
    },
    {
      title: "Ước lượng và khoảng tin cậy",
      items: [
        {
          kind: "dinh-nghia", title: "Ước lượng không chệch",
          text: R`Một ước lượng $\hat\theta$ của đại lượng $\theta$ là không chệch nếu $E[\hat\theta]=\theta$. Trung bình mẫu $\bar x$ là ước lượng không chệch của $\mu$, và phương sai mẫu $s^2=\frac{1}{n-1}\sum(x_i-\bar x)^2$ là ước lượng không chệch của $\sigma^2$.`,
          de: R`Một cây cân không chệch có thể sai ở từng lần cân, nhưng không sai lệch theo một chiều cố định: cân nhiều lần rồi lấy trung bình thì sát giá trị thật. Ước lượng không chệch cũng vậy. Một ước lượng chệch thì luôn nghiêng về một phía, dù có thêm bao nhiêu mẫu.`,
        },
        {
          kind: "dinh-ly", title: "Phương sai mẫu chia cho n−1",
          text: R`Nếu $x_1,\dots,x_n$ độc lập, cùng kì vọng $\mu$ và phương sai $\sigma^2$, thì $E\left[\sum(x_i-\bar x)^2\right]=(n-1)\sigma^2$. Do đó $s^2=\frac{1}{n-1}\sum(x_i-\bar x)^2$ không chệch, còn chia cho $n$ thì chệch xuống thấp.`,
          suy: [
            R`Phân tích $x_i-\mu=(x_i-\bar x)+(\bar x-\mu)$ rồi bình phương và cộng theo $i$. Số hạng chéo $2\sum(x_i-\bar x)(\bar x-\mu)$ bằng $0$ vì $\sum(x_i-\bar x)=0$, nên $\sum(x_i-\mu)^2=\sum(x_i-\bar x)^2+n(\bar x-\mu)^2$.`,
            R`Lấy kì vọng: $E\left[\sum(x_i-\mu)^2\right]=n\sigma^2$ và $E\left[n(\bar x-\mu)^2\right]=n\operatorname{Var}(\bar x)=n\cdot\frac{\sigma^2}{n}=\sigma^2$.`,
            R`Vậy $E\left[\sum(x_i-\bar x)^2\right]=n\sigma^2-\sigma^2=(n-1)\sigma^2$. Phần mất đi một đơn vị phương sai là do $\bar x$ được tính từ chính mẫu nên làm các độ lệch nhỏ hơn độ lệch thật.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Khoảng tin cậy cho trung bình",
          text: R`Khi $\sigma$ đã biết và $n$ đủ lớn, khoảng tin cậy $95\%$ cho $\mu$ là $\bar x\pm1{,}96\frac{\sigma}{\sqrt n}$. Tổng quát, độ tin cậy $1-\alpha$ dùng $z_{\alpha/2}$ thay cho $1{,}96$.`,
          suy: [
            R`Theo định lí giới hạn trung tâm, $\frac{\bar X-\mu}{\sigma/\sqrt n}$ xấp xỉ chuẩn tắc, và $P(-1{,}96\le Z\le1{,}96)\approx0{,}95$ với $Z$ chuẩn tắc.`,
            R`Giải bất đẳng thức $-1{,}96\le\frac{\bar X-\mu}{\sigma/\sqrt n}\le1{,}96$ theo $\mu$: $\bar X-1{,}96\frac{\sigma}{\sqrt n}\le\mu\le\bar X+1{,}96\frac{\sigma}{\sqrt n}$.`,
            R`Vậy khoảng $\bar X\pm1{,}96\frac{\sigma}{\sqrt n}$ chứa $\mu$ với xác suất khoảng $95\%$, tính trên nhiều mẫu lặp lại.`,
          ],
        },
        {
          kind: "cach-lam", title: "Chọn cỡ mẫu cho sai số cho trước",
          text: R`Muốn nửa độ rộng khoảng tin cậy không quá $E$, giải $z\frac{\sigma}{\sqrt n}\le E$ được $n\ge\left(\frac{z\sigma}{E}\right)^2$. Làm tròn lên số nguyên gần nhất. Sai số giảm một nửa thì cỡ mẫu phải gấp bốn.`,
        },
        {
          kind: "vi-du",
          text: R`Mẫu $n=100$ có $\bar x=50$, biết $\sigma=10$. Sai số chuẩn là $\frac{10}{10}=1$, khoảng tin cậy $95\%$ là $50\pm1{,}96=[48{,}04;51{,}96]$. Muốn nửa độ rộng không quá $1$ thì $n\ge(1{,}96\cdot10)^2=384{,}16$, tức cần ít nhất $385$ quan sát.`,
        },
        { kind: "luu-y", text: R`Mức tin cậy $95\%$ nói về quy trình: trong nhiều mẫu, khoảng $95\%$ chứa giá trị thật khoảng $95$ lần trên $100$. Với một khoảng đã tính xong, giá trị thật hoặc nằm trong đó hoặc không, nên không nói «xác suất $\mu$ nằm trong khoảng này là $95\%$».` },
      ],
    },
    {
      title: "Kiểm định giả thuyết và A/B test",
      items: [
        {
          kind: "dinh-nghia", title: "Giả thuyết không và giá trị p",
          text: R`Kiểm định đặt giả thuyết không $H_0$ (thường là «không có khác biệt») và tính giá trị $p$: xác suất, khi $H_0$ đúng, thu được kết quả cực đoan ít nhất như kết quả đã quan sát. Nếu $p$ nhỏ hơn mức ý nghĩa $\alpha$ (thường $0{,}05$) thì bác bỏ $H_0$.`,
          de: R`Giống một phiên tòa: ban đầu coi bị cáo vô tội ($H_0$). Dữ liệu là chứng cứ, và giá trị $p$ hỏi: nếu bị cáo thật sự vô tội thì có bao nhiêu khả năng ta gặp chứng cứ lạ lùng như thế? Khả năng ấy càng nhỏ thì càng khó tin vào sự vô tội, và ta bác bỏ $H_0$. Không bác bỏ được cũng không phải là chứng minh vô tội.`,
        },
        {
          kind: "cong-thuc", title: "Kiểm định z cho một trung bình",
          text: R`Để kiểm $H_0:\mu=\mu_0$ khi $\sigma$ đã biết, tính $z=\frac{\bar x-\mu_0}{\sigma/\sqrt n}$. Khi $H_0$ đúng và $n$ đủ lớn, $z$ xấp xỉ chuẩn tắc. Kiểm định hai phía bác bỏ $H_0$ ở mức $0{,}05$ nếu $|z|>1{,}96$.`,
          suy: [
            R`Khi $H_0$ đúng, $E[\bar X]=\mu_0$ và độ lệch chuẩn của $\bar X$ là $\frac{\sigma}{\sqrt n}$. Do đó $z$ đo $\bar x$ lệch khỏi $\mu_0$ bao nhiêu sai số chuẩn.`,
            R`Theo định lí giới hạn trung tâm $z\approx N(0;1)$, nên xác suất $|z|>1{,}96$ chỉ khoảng $0{,}05$. Gặp giá trị lớn như thế rất hiếm nếu $H_0$ đúng, là lí do để nghi ngờ $H_0$.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Kiểm định hai tỉ lệ cho A/B test",
          text: R`Phiên bản A có $x_1$ thành công trên $n_1$ lượt, phiên bản B có $x_2$ trên $n_2$ lượt. Với $\hat p_1=\frac{x_1}{n_1}$, $\hat p_2=\frac{x_2}{n_2}$ và $\hat p=\frac{x_1+x_2}{n_1+n_2}$, thống kê kiểm định là $z=\frac{\hat p_1-\hat p_2}{\sqrt{\hat p(1-\hat p)\left(\frac1{n_1}+\frac1{n_2}\right)}}$.`,
          suy: [
            R`Khi $H_0$ đúng, cả hai phiên bản có cùng tỉ lệ thật $p$. Khi đó $\hat p_1-\hat p_2$ có kì vọng $0$ và, vì hai mẫu độc lập, phương sai $\frac{p(1-p)}{n_1}+\frac{p(1-p)}{n_2}=p(1-p)\left(\frac1{n_1}+\frac1{n_2}\right)$.`,
            R`Theo định lí giới hạn trung tâm cho mỗi tỉ lệ, hiệu hai tỉ lệ xấp xỉ chuẩn, nên chia cho độ lệch chuẩn của nó cho $z\approx N(0;1)$.`,
            R`Chưa biết $p$ thật, và vì $H_0$ nói hai phiên bản cùng một tỉ lệ nên ước lượng $p$ bằng tỉ lệ gộp $\hat p$ của cả hai mẫu. Thay vào được công thức trên.`,
          ],
        },
        {
          kind: "cach-lam", title: "Quy trình một cuộc A/B test",
          text: R`Quyết định trước chỉ tiêu và mức $\alpha$, tính cỡ mẫu cần thiết, rồi chia ngẫu nhiên người dùng vào hai nhóm. Chỉ khi đủ cỡ mẫu mới tính $z$ và giá trị $p$. Dừng thử nghiệm ngay khi thấy $p<0{,}05$ là sai cách, vì kiểm tra nhiều lần làm tăng xác suất báo nhầm.`,
        },
        {
          kind: "vi-du",
          text: R`Phiên bản A: $200$ trên $1000$ lượt bấm ($20\%$), phiên bản B: $240$ trên $1000$ ($24\%$). Tỉ lệ gộp $\hat p=\frac{440}{2000}=0{,}22$, sai số $\sqrt{0{,}22\cdot0{,}78\cdot\frac{2}{1000}}=\sqrt{0{,}0003432}\approx0{,}0185$, nên $z=\frac{0{,}04}{0{,}0185}\approx2{,}16$ và giá trị $p$ hai phía khoảng $0{,}031<0{,}05$: bác bỏ $H_0$, B tốt hơn A một cách có ý nghĩa thống kê.`,
        },
        {
          kind: "vi-du",
          text: R`Mức ý nghĩa $\alpha=0{,}05$ nghĩa là nếu làm $100$ thử nghiệm mà ở cả $100$ cái $H_0$ đúng, thì trung bình khoảng $5$ cái vẫn bị báo nhầm là có khác biệt (sai lầm loại I). Sai lầm loại II là bỏ sót khác biệt có thật; tăng cỡ mẫu làm giảm sai lầm loại II.`,
        },
        { kind: "luu-y", text: R`Giá trị $p$ không phải xác suất $H_0$ đúng, và $p$ nhỏ không có nghĩa khác biệt lớn hay quan trọng: mẫu rất lớn có thể làm một khác biệt nhỏ xíu có $p$ rất nhỏ. Luôn báo cả độ lớn khác biệt và khoảng tin cậy.` },
        { kind: "luu-y", text: R`Kiểm định chỉ so sánh với $H_0$. Không bác bỏ được $H_0$ nghĩa là chưa đủ bằng chứng, không phải bằng chứng cho rằng hai phiên bản giống hệt nhau.` },
      ],
    },
  ],
  canNho: [
    R`Kì vọng là trung bình lâu dài và luôn tuyến tính; phương sai đo dao động và chỉ cộng được khi độc lập.`,
    R`Nhị thức có kì vọng $np$ và phương sai $npq$, vì là tổng của $n$ biến Bernoulli độc lập.`,
    R`Công thức tính phương sai: $\operatorname{Var}X=E[X^2]-(E[X])^2$; và $\operatorname{Var}(aX)=a^2\operatorname{Var}X$.`,
    R`Markov và Chebyshev chặn xác suất đuôi cho mọi phân phối; luật số lớn nói trung bình mẫu tiến về kì vọng, với sai số cỡ $\frac{\sigma}{\sqrt n}$.`,
    R`Định lí giới hạn trung tâm: tổng chuẩn hóa của nhiều biến độc lập có phân phối gần chuẩn tắc, dù từng biến có hình dạng nào.`,
    R`Xấp xỉ nhị thức bằng chuẩn có hiệu chỉnh liên tục $0{,}5$; sai số chuẩn của trung bình là $\frac{\sigma}{\sqrt n}$.`,
    R`Phương sai mẫu chia cho $n-1$ để không chệch; khoảng tin cậy $95\%$ là $\bar x\pm1{,}96\frac{\sigma}{\sqrt n}$ và nói về quy trình, không phải về một khoảng cụ thể.`,
    R`Kiểm định: tính $z$ hoặc giá trị $p$ khi giả định $H_0$; A/B test hai tỉ lệ dùng tỉ lệ gộp; giá trị $p$ không phải xác suất $H_0$ đúng.`,
  ],
  lienQuan: [
    { id: "probability", vi: R`Biến cố, xác suất có điều kiện và độc lập ở THPT là nền của biến ngẫu nhiên và các định lí giới hạn.` },
    { id: "combo", vi: R`Hệ số nhị thức $\binom{n}{k}$ cho phân phối nhị thức, nền tảng của xấp xỉ chuẩn và kiểm định tỉ lệ.` },
    { id: "integral", vi: R`Xác suất của biến liên tục là diện tích dưới đường mật độ, tính bằng tích phân.` },
    { id: "exp", vi: R`Hàm mũ $e^{-x^2/2}$ trong mật độ chuẩn, và giới hạn $\left(1+\frac{t^2}{2n}\right)^n\to e^{t^2/2}$ trong chứng minh định lí giới hạn trung tâm.` },
  ],
  checks: [
    { expr: "binomial(10,3)/2**10", expect: "15/128" },
    { expr: "integrate(Rational(1,2), (x, Rational(1,2), Rational(3,2)))", expect: "1/2" },
    { expr: "Rational(1+2+3+4+5+6,6)", expect: "7/2" },
    { expr: "Rational(1+4+9+16+25+36,6)", expect: "91/6" },
    { expr: "Rational(91,6)-Rational(7,2)**2", expect: "35/12" },
    { expr: "2*Rational(35,12)", expect: "35/6" },
    { expr: "100*Rational(1,2)*Rational(1,2)", expect: "25" },
    { expr: "expand((x+y-(mx+my))**2-((x-mx)**2+(y-my)**2+2*(x-mx)*(y-my)))", expect: "0" },
    { expr: "expand(Rational(1,1)*(x-m)**2-(x**2-2*m*x+m**2))", expect: "0" },
    { expr: "simplify(diff(log(f(t)),t,2)-(diff(f(t),t,2)/f(t)-(diff(f(t),t)/f(t))**2))", expect: "0" },
    { expr: "ceiling(Rational(35,12)*2000)", expect: "5834" },
    { expr: "Rational(1,2**2)", expect: "1/4" },
    { expr: "(Rational(119,2)-50)/5", expect: "19/10" },
    { expr: "Rational(35,12)/100", expect: "7/240" },
    { expr: "expand(((x1-u)**2+(x2-u)**2+(x3-u)**2-3*((x1+x2+x3)/3-u)**2)-((x1-(x1+x2+x3)/3)**2+(x2-(x1+x2+x3)/3)**2+(x3-(x1+x2+x3)/3)**2))", expect: "0" },
    { expr: "Rational(196,100)*10/sqrt(100)", expect: "49/25" },
    { expr: "50-Rational(49,25)", expect: "1201/25" },
    { expr: "(Rational(196,100)*10)**2", expect: "9604/25" },
    { expr: "Rational(440,2000)", expect: "11/50" },
    { expr: "Rational(22,100)*Rational(78,100)*Rational(2,1000)", expect: "429/1250000" },
    { expr: "limit((1+t**2/(2*n))**n, n, oo)", expect: "exp(t**2/2)" },
    { expr: "integrate(exp(-x**2/2)/sqrt(2*pi), (x,-oo,oo))", expect: "1" },
  ],
};
