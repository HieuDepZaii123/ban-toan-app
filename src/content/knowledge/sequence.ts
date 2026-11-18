import type { TopicKnowledge } from "./types.ts";

const R = String.raw;

export const sequenceKnowledge: TopicKnowledge = {
  id: "sequence",
  tongQuat: {
    la: R`Dãy số là một danh sách các số xếp theo thứ tự $u_1,u_2,u_3,\dots$, tức là một hàm số xác định trên các số nguyên dương. Hai dãy quan trọng nhất là cấp số cộng, mỗi số hạng hơn số hạng trước một lượng không đổi $d$, và cấp số nhân, mỗi số hạng bằng số hạng trước nhân với một số không đổi $q$.`,
    dungDe: R`Mô tả những đại lượng đổi theo từng bước đều đặn: tiền tiết kiệm mỗi tháng, số ghế tăng dần theo hàng, quãng đường của quả bóng nảy, lãi kép, dân số. Trong bài thi, chuyên đề cho bài tìm số hạng, tính tổng, xác định công sai hoặc công bội từ điều kiện, bài toán thực tế và tổng vô hạn.`,
    lienHe: R`Cấp số cộng là hàm bậc nhất của chỉ số $n$, cấp số nhân là hàm mũ của $n$, nên chuyên đề nối với Hàm số bậc hai và Mũ và logarit. Tổng vô hạn và dãy hội tụ là nền của chuyên đề Giới hạn, còn phép chứng minh quy nạp dùng được cho mọi công thức theo $n$.`,
  },
  tuDau: [
    R`Mỗi tuần bỏ ống thêm $10$ nghìn đồng so với tuần trước: tuần đầu $10$, tuần hai $20$, tuần ba $30$. Viết các con số đó thành một hàng theo thứ tự, ta có một dãy số. Dãy số chỉ là một danh sách các số có đánh số thứ tự: số thứ nhất, số thứ hai, số thứ ba, và cứ thế mãi.`,
    R`Có hai kiểu dãy đơn giản mà gặp ở khắp nơi. Kiểu thứ nhất, mỗi bước cộng thêm cùng một số, như bậc cầu thang cao đều nhau: gọi là cấp số cộng. Kiểu thứ hai, mỗi bước nhân với cùng một số, như số vi khuẩn cứ mỗi giờ lại gấp đôi: gọi là cấp số nhân.`,
    R`Với một dãy, người ta thường hỏi hai câu. Câu một: số đứng ở vị trí thứ $n$ là bao nhiêu, mà không phải viết ra tất cả các số trước nó? Câu hai: cộng $n$ số đầu tiên lại thì được bao nhiêu? Các công thức của chuyên đề chỉ là lời đáp cho hai câu này, và mỗi công thức đều suy ra được bằng cách đếm số bước.`,
    R`Cách suy luận quan trọng nhất ở đây là hiệu ứng quân cờ domino: nếu quân đầu đổ, và quân nào đổ cũng kéo quân kế tiếp đổ theo, thì mọi quân đều đổ. Trong toán, cách này gọi là quy nạp, dùng để chắc chắn một công thức đúng với mọi số thứ tự chứ không chỉ với vài số đã thử.`,
  ],
  kyHieu: [
    { kh: R`$u_n$`, doc: R`Đọc là «u n»: số đứng ở vị trí thứ $n$ của dãy. Chẳng hạn $u_3$ là số thứ ba.` },
    { kh: R`$(u_n)$`, doc: R`Cả dãy số, tức toàn bộ danh sách $u_1,u_2,u_3,\dots$ kéo dài mãi.` },
    { kh: R`$u_{n+1}$`, doc: R`Số đứng ngay sau $u_n$ trong dãy.` },
    { kh: R`$d$`, doc: R`Công sai: số được cộng thêm ở mỗi bước của cấp số cộng.` },
    { kh: R`$q$`, doc: R`Công bội: số được nhân vào ở mỗi bước của cấp số nhân.` },
    { kh: R`$S_n$`, doc: R`Tổng của $n$ số hạng đầu tiên: $S_n=u_1+u_2+\dots+u_n$.` },
    { kh: R`$|q|<1$`, doc: R`Độ lớn của $q$ nhỏ hơn $1$, tức $q$ nằm giữa $-1$ và $1$.` },
    { kh: R`$P(n)$`, doc: R`Một câu khẳng định có chứa số $n$, có thể đúng hoặc sai tùy theo $n$.` },
  ],
  canBiet: [
    R`Hàm số bậc nhất và hàm mũ, để thấy dãy là hàm của chỉ số.`,
    R`Giải phương trình và hệ hai ẩn.`,
    R`Ký hiệu chỉ số dưới như $u_n$ và cách đọc «số hạng thứ $n$».`,
  ],
  sections: [
    {
      title: "Dãy số và cách cho dãy số",
      items: [
        {
          kind: "dinh-nghia", title: "Dãy số",
          text: R`Dãy số $(u_n)$ gán cho mỗi số nguyên dương $n$ một số thực $u_n$, gọi là số hạng thứ $n$. Số hạng $u_1$ là số hạng đầu, và $u_n$ là số hạng tổng quát.`,
          de: R`Dãy số là một hàng số có thứ tự, giống hàng người xếp hàng có số báo danh. Ký hiệu $u_n$ chỉ «người mang số báo danh $n$». Biết quy luật của dãy thì hỏi số thứ một trăm hay số thứ một triệu cũng trả lời được mà không cần viết cả hàng ra.`,
        },
        { kind: "cach-lam", title: "Ba cách cho một dãy", text: R`Cho bằng công thức số hạng tổng quát $u_n=f(n)$; cho bằng hệ thức truy hồi, tức là cho $u_1$ và cách tính $u_{n+1}$ từ các số hạng trước; hoặc cho bằng lời mô tả. Công thức tổng quát cho phép tính ngay số hạng bất kì, còn truy hồi phải tính lần lượt.` },
        {
          kind: "tinh-chat", title: "Dãy tăng, giảm, bị chặn",
          text: R`Dãy tăng nếu $u_{n+1}>u_n$ với mọi $n$, giảm nếu $u_{n+1}<u_n$ với mọi $n$. Dãy bị chặn trên nếu có số $M$ để $u_n\le M$ với mọi $n$, bị chặn dưới nếu có số $m$ để $u_n\ge m$.`,
          suy: [
            R`Mục này là cách gọi tên, điều cần nắm là cách kiểm. So sánh hai số là xét dấu của hiệu, nên dãy tăng đúng khi hiệu $u_{n+1}-u_n$ dương với mọi $n$, và giảm đúng khi hiệu đó âm với mọi $n$.`,
            R`Thử với $u_n=\frac{n}{n+1}$: hiệu $\frac{n+1}{n+2}-\frac{n}{n+1}=\frac{(n+1)^2-n(n+2)}{(n+1)(n+2)}=\frac{1}{(n+1)(n+2)}>0$, nên dãy tăng. Tử số luôn nhỏ hơn mẫu số nên $u_n<1$ với mọi $n$: dãy bị chặn trên bởi $1$.`,
          ],
        },
        { kind: "luu-y", text: R`Dãy khác tập hợp ở chỗ thứ tự và sự lặp lại có ý nghĩa. Dãy $1,2,1,2,\dots$ vẫn là một dãy, dù chỉ có hai giá trị khác nhau.` },
        { kind: "vi-du", text: R`Với $u_n=2n+1$ ta có $3,5,7,9,\dots$, một dãy tăng. Với $u_1=1$ và $u_{n+1}=2u_n$ ta có $1,2,4,8,\dots$, dãy này được cho bằng truy hồi.` },
        { kind: "vi-du", text: R`Dãy $u_n=\frac{n}{n+1}$ cho $\frac{1}{2},\frac{2}{3},\frac{3}{4},\dots$ là dãy tăng và bị chặn trên bởi $1$. Các số hạng tiến sát $1$ nhưng không bao giờ bằng $1$.` },
      ],
    },
    {
      title: "Cấp số cộng",
      items: [
        {
          kind: "dinh-nghia", title: "Cấp số cộng",
          text: R`Dãy $(u_n)$ là cấp số cộng nếu $u_{n+1}=u_n+d$ với mọi $n$, trong đó $d$ không đổi và gọi là công sai. Hai số hạng liên tiếp luôn hơn kém nhau đúng $d$.`,
          de: R`Đây là dãy «bậc thang đều»: từ số này sang số kế tiếp luôn cộng thêm cùng một lượng $d$. Nếu $d$ dương thì dãy đi lên, $d$ âm thì đi xuống, $d$ bằng $0$ thì đứng yên. Ví dụ $3,7,11,15$ có $d=4$.`,
        },
        {
          kind: "cong-thuc", title: "Số hạng tổng quát",
          text: R`Công thức là $u_n=u_1+(n-1)d$. Số hạng thứ $n$ bằng số hạng đầu cộng $n-1$ lần công sai, vì từ $u_1$ đến $u_n$ có $n-1$ bước.`,
          suy: [
            R`Viết vài số đầu: $u_2=u_1+d$, $u_3=u_2+d=u_1+2d$, $u_4=u_1+3d$. Số lần cộng $d$ luôn ít hơn số thứ tự đúng $1$.`,
            R`Lý do: đi từ số thứ nhất đến số thứ $n$ phải bước $n-1$ bước, giống như $n$ cái cọc thì có $n-1$ khoảng trống ở giữa. Mỗi bước cộng $d$, nên $u_n=u_1+(n-1)d$.`,
            R`Để chắc chắn với mọi $n$, dùng quy nạp: công thức đúng khi $n=1$; nếu $u_k=u_1+(k-1)d$ thì $u_{k+1}=u_k+d=u_1+kd$, tức công thức đúng với $k+1$.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Quan hệ giữa hai số hạng bất kì",
          text: R`Có $u_m=u_k+(m-k)d$, nên $d=\frac{u_m-u_k}{m-k}$ khi $m\neq k$. Biết hai số hạng bất kì là đủ để tìm cả cấp số cộng.`,
          suy: [
            R`Viết hai số hạng theo công thức tổng quát: $u_m=u_1+(m-1)d$ và $u_k=u_1+(k-1)d$.`,
            R`Trừ vế theo vế, $u_1$ triệt tiêu: $u_m-u_k=(m-k)d$. Chuyển vế được $u_m=u_k+(m-k)d$, và chia cho $m-k\neq 0$ được $d=\frac{u_m-u_k}{m-k}$.`,
          ],
        },
        {
          kind: "tinh-chat", title: "Số hạng giữa",
          text: R`Mỗi số hạng, trừ số hạng đầu, bằng trung bình cộng của hai số hạng kề nó: $u_k=\frac{u_{k-1}+u_{k+1}}{2}$. Ba số $a,b,c$ lập thành cấp số cộng khi và chỉ khi $a+c=2b$.`,
          suy: [
            R`Số đứng trước $u_k$ là $u_{k-1}=u_k-d$ và số đứng sau là $u_{k+1}=u_k+d$. Cộng lại thì $d$ triệt tiêu: $u_{k-1}+u_{k+1}=2u_k$. Chia đôi được công thức.`,
            R`Ngược lại, $a+c=2b$ viết lại là $b-a=c-b$: bước từ $a$ sang $b$ bằng bước từ $b$ sang $c$, nên ba số lập thành cấp số cộng.`,
          ],
        },
        { kind: "luu-y", text: R`Công sai dương thì dãy tăng, âm thì dãy giảm, bằng $0$ thì dãy là hằng số. Dãy hằng vẫn là cấp số cộng, nên đừng loại $d=0$ khi đề không cấm.` },
        { kind: "cach-lam", title: "Tìm số hạng đầu và công sai từ hai số hạng", text: R`Lập hai phương trình bậc nhất theo $u_1$ và $d$ rồi giải, hoặc tính $d$ bằng công thức giữa hai số hạng rồi suy ra $u_1$. Cách thứ hai gọn hơn vì không cần giải hệ.` },
        { kind: "vi-du", text: R`Cho $u_1=3$ và $d=4$ thì $u_{10}=3+9\cdot 4=39$. Cho $u_3=7$ và $u_8=22$ thì $d=\frac{22-7}{8-3}=3$ và $u_1=7-2\cdot 3=1$.` },
      ],
    },
    {
      title: "Tổng của cấp số cộng",
      items: [
        {
          kind: "cong-thuc", title: "Tổng của các số hạng đầu",
          text: R`Công thức là $S_n=\frac{n(u_1+u_n)}{2}=\frac{n\left[2u_1+(n-1)d\right]}{2}$. Dạng đầu dùng khi biết số hạng cuối, dạng sau dùng khi biết công sai.`,
          suy: [
            R`Viết tổng theo thứ tự xuôi $S_n=u_1+u_2+\dots+u_n$ và viết lại theo thứ tự ngược $S_n=u_n+u_{n-1}+\dots+u_1$, rồi cộng từng cột.`,
            R`Ở cột thứ $i$, số hàng trên là $u_1+(i-1)d$ còn số hàng dưới là $u_n-(i-1)d$. Phần $(i-1)d$ triệt tiêu nên cột nào cũng có tổng $u_1+u_n$.`,
            R`Có $n$ cột nên $2S_n=n(u_1+u_n)$, tức $S_n=\frac{n(u_1+u_n)}{2}$. Thay $u_n=u_1+(n-1)d$ được dạng thứ hai.`,
            R`Thử với $1+2+\dots+100$: mỗi cặp $1+100$, $2+99$ đều bằng $101$, nên tổng là $\frac{100\cdot 101}{2}=5050$.`,
          ],
        },
        { kind: "cach-lam", title: "Vì sao có công thức", text: R`Viết tổng hai lần, một lần theo thứ tự xuôi và một lần ngược rồi cộng từng cặp. Mỗi cặp bằng $u_1+u_n$ và có $n$ cặp, nên $2S_n=n(u_1+u_n)$.` },
        {
          kind: "tinh-chat", title: "Tổng là hàm bậc hai của chỉ số",
          text: R`Khai triển được $S_n=\frac{d}{2}n^2+\left(u_1-\frac{d}{2}\right)n$, một đa thức bậc hai của $n$ không có hạng tử tự do. Vì vậy $S_n$ và $S_{n-1}$ cho lại $u_n=S_n-S_{n-1}$.`,
          suy: [
            R`Nhân phá ngoặc công thức tổng: $\frac{n\left[2u_1+(n-1)d\right]}{2}=u_1n+\frac{d}{2}n^2-\frac{d}{2}n=\frac{d}{2}n^2+\left(u_1-\frac{d}{2}\right)n$.`,
            R`Số $S_n$ là tổng của $n$ số đầu, còn $S_{n-1}$ là tổng của $n-1$ số đầu. Hai tổng chỉ hơn kém nhau đúng số thứ $n$, nên $u_n=S_n-S_{n-1}$ khi $n\ge 2$.`,
          ],
        },
        { kind: "luu-y", title: "Đếm đủ số số hạng", text: R`Từ số hạng thứ $a$ đến số hạng thứ $b$ có $b-a+1$ số hạng, không phải $b-a$. Đếm thiếu một số hạng là lỗi hay gặp nhất khi tính tổng một đoạn.` },
        { kind: "vi-du", text: R`Tổng $1+2+\dots+100$ có $u_1=1$, $u_{100}=100$ nên $S_{100}=\frac{100\cdot 101}{2}=5050$.` },
        { kind: "vi-du", text: R`Một rạp có $20$ ghế ở hàng đầu, mỗi hàng sau nhiều hơn hàng trước $2$ ghế, và có $15$ hàng. Hàng cuối có $20+14\cdot 2=48$ ghế, và tổng số ghế là $\frac{15(20+48)}{2}=510$.` },
      ],
    },
    {
      title: "Cấp số nhân",
      items: [
        {
          kind: "dinh-nghia", title: "Cấp số nhân",
          text: R`Dãy $(u_n)$ là cấp số nhân nếu $u_{n+1}=u_n\cdot q$ với mọi $n$, trong đó $q$ không đổi và gọi là công bội. Hai số hạng liên tiếp luôn có thương bằng $q$.`,
          de: R`Đây là dãy mà từ số này sang số kế tiếp luôn nhân với cùng một số $q$. Ví dụ $3,6,12,24$ có $q=2$. Nếu $q$ lớn hơn $1$ dãy phình ra rất nhanh; nếu $q$ nằm giữa $0$ và $1$ dãy co dần về $0$, như quả bóng mỗi lần nảy chỉ cao bằng một nửa lần trước.`,
        },
        {
          kind: "cong-thuc", title: "Số hạng tổng quát",
          text: R`Công thức là $u_n=u_1\cdot q^{n-1}$, và $u_m=u_k\cdot q^{m-k}$ cho hai số hạng bất kì. Số mũ là số bước từ số hạng này sang số hạng kia.`,
          suy: [
            R`Viết vài số đầu: $u_2=u_1q$, $u_3=u_2q=u_1q^2$, $u_4=u_1q^3$. Số mũ của $q$ luôn ít hơn số thứ tự đúng $1$, vì từ số thứ nhất đến số thứ $n$ có $n-1$ bước, mỗi bước nhân một lần với $q$.`,
            R`Với hai số hạng bất kì và $m\ge k$: $u_m=u_1q^{m-1}=u_1q^{k-1}\cdot q^{m-k}=u_k\cdot q^{m-k}$. Từ vị trí $k$ đến vị trí $m$ có $m-k$ bước.`,
          ],
        },
        {
          kind: "tinh-chat", title: "Số hạng giữa",
          text: R`Với mọi số hạng không phải số hạng đầu, $u_k^2=u_{k-1}\cdot u_{k+1}$. Ba số khác $0$ là $a,b,c$ lập thành cấp số nhân khi và chỉ khi $b^2=ac$, và nếu chúng cùng dấu thì $b$ là trung bình nhân của $a$ và $c$.`,
          suy: [
            R`Theo định nghĩa, $u_k=u_{k-1}\cdot q$ và $u_{k+1}=u_k\cdot q$. Do đó $u_{k-1}\cdot u_{k+1}=u_{k-1}\cdot u_k\cdot q=u_k\cdot(u_{k-1}q)=u_k^2$.`,
            R`Ngược lại, với ba số khác $0$, chia hai vế của $b^2=ac$ cho $ab$ được $\frac{b}{a}=\frac{c}{b}$: tỉ số giữa hai số liền nhau không đổi, nên ba số lập thành cấp số nhân.`,
          ],
        },
        {
          kind: "tinh-chat", title: "Chiều biến thiên",
          text: R`Với $u_1>0$: nếu $q>1$ dãy tăng, nếu $0<q<1$ dãy giảm. Nếu $q<0$ dãy đổi dấu liên tục nên không đơn điệu. Nếu $q=1$ dãy là hằng số.`,
          suy: [
            R`Khi $u_1>0$ và $q>0$, mọi số hạng đều dương. Xét hiệu hai số liền nhau: $u_{n+1}-u_n=u_nq-u_n=u_n(q-1)$. Vì $u_n>0$, dấu của hiệu là dấu của $q-1$: dương khi $q>1$ nên dãy tăng, âm khi $0<q<1$ nên dãy giảm.`,
            R`Khi $q<0$, mỗi lần nhân với số âm thì đổi dấu, nên các số hạng lần lượt dương, âm, dương, âm. Dãy lúc lên lúc xuống nên không tăng cũng không giảm.`,
          ],
        },
        { kind: "luu-y", text: R`Công bội $q=0$ hoặc $u_1=0$ làm mọi số hạng sau đều bằng $0$ và thương không xác định, nên thường được loại khi đề nói «cấp số nhân». Đừng nhầm cấp số nhân với cấp số cộng khi đọc đề: cộng thêm $d$ khác nhân lên $q$ lần.` },
        { kind: "vi-du", text: R`Với $u_1=2$ và $q=3$ ta có $2,6,18,54,162$, nên $u_5=2\cdot 3^4=162$. Ba số $2,6,18$ là cấp số nhân vì $6^2=36=2\cdot 18$.` },
      ],
    },
    {
      title: "Tổng của cấp số nhân và tổng vô hạn",
      items: [
        {
          kind: "cong-thuc", title: "Tổng của các số hạng đầu",
          text: R`Với $q\neq 1$ có $S_n=u_1\cdot\frac{1-q^n}{1-q}$. Với $q=1$ mọi số hạng bằng nhau và $S_n=n\,u_1$.`,
          suy: [
            R`Viết tổng: $S_n=u_1+u_1q+u_1q^2+\dots+u_1q^{n-1}$. Nhân cả hai vế với $q$: $qS_n=u_1q+u_1q^2+\dots+u_1q^n$.`,
            R`Hai dòng có chung mọi số hạng trừ số đầu của dòng trên và số cuối của dòng dưới. Trừ dòng dưới khỏi dòng trên: $S_n-qS_n=u_1-u_1q^n$.`,
            R`Đặt nhân tử chung: $S_n(1-q)=u_1(1-q^n)$. Khi $q\neq 1$, chia cho $1-q$ được công thức. Khi $q=1$ không chia được, nhưng lúc đó $n$ số hạng đều bằng $u_1$ nên tổng là $nu_1$.`,
          ],
        },
        { kind: "cach-lam", title: "Vì sao có công thức", text: R`Nhân $S_n$ với $q$ rồi trừ cho $S_n$: các số hạng ở giữa triệt tiêu, còn lại $S_n(1-q)=u_1(1-q^n)$. Chia hai vế cho $1-q$ khi $q\neq 1$ thì được công thức.` },
        {
          kind: "dinh-ly", title: "Tổng vô hạn",
          text: R`Nếu $|q|<1$ thì $q^n$ tiến về $0$ khi $n$ tăng, nên tổng vô hạn là $S=\frac{u_1}{1-q}$. Nếu $|q|\ge 1$ và $u_1\neq 0$ thì tổng các số hạng không tiến tới một số hữu hạn.`,
          suy: [
            R`Tách công thức tổng: $S_n=\frac{u_1}{1-q}-\frac{u_1}{1-q}\cdot q^n$. Số hạng đầu không phụ thuộc $n$, chỉ số hạng sau thay đổi.`,
            R`Khi $|q|<1$, mỗi lần nhân với $q$ thì độ lớn co lại theo cùng một tỉ lệ nhỏ hơn $1$, nên $q^n$ nhỏ hơn bất cứ số dương nào cho trước khi $n$ đủ lớn. Chẳng hạn với $q=\frac{1}{2}$: $\frac{1}{2},\frac{1}{4},\frac{1}{8},\dots$ Số hạng sau vì thế tiến về $0$ và $S_n$ tiến về $\frac{u_1}{1-q}$.`,
            R`Hình ảnh: ăn nửa cái bánh, rồi nửa của phần còn lại, rồi lại nửa của phần còn lại. Tổng $\frac{1}{2}+\frac{1}{4}+\frac{1}{8}+\dots$ tiến về đúng một cái bánh, khớp với $\frac{1/2}{1-1/2}=1$.`,
            R`Khi $|q|\ge 1$ và $u_1\neq 0$, độ lớn các số hạng không nhỏ đi: mỗi lần cộng thêm, tổng lại xê dịch ít nhất $|u_1|$, nên không thể dừng lại gần một số nào.`,
          ],
        },
        { kind: "luu-y", text: R`Điều kiện $|q|<1$ là bắt buộc. Với $1+2+4+\dots$ công thức $\frac{1}{1-2}=-1$ cho một số vô nghĩa, vì thực tế tổng này lớn vô hạn.` },
        { kind: "vi-du", text: R`Tổng $1+\frac{1}{2}+\frac{1}{4}+\dots$ có $u_1=1$ và $q=\frac{1}{2}$ nên bằng $\frac{1}{1-\frac{1}{2}}=2$. Tổng $2+6+18+54+162$ bằng $2\cdot\frac{1-3^5}{1-3}=242$.` },
        { kind: "vi-du", text: R`Quả bóng rơi từ độ cao $10$ m rồi nảy lên $\frac{3}{5}$ độ cao trước đó. Các độ cao nảy là $6;3{,}6;\dots$ có tổng $\frac{6}{1-\frac{3}{5}}=15$. Mỗi lần nảy bóng đi lên rồi xuống, nên tổng quãng đường là $10+2\cdot 15=40$ m.` },
        { kind: "vi-du", text: R`Gửi vào đầu mỗi năm $10$ triệu đồng, lãi kép $8\%$ mỗi năm. Sau $3$ năm tiền là $10\left(1{,}08+1{,}08^2+1{,}08^3\right)=10\cdot 1{,}08\cdot\frac{1{,}08^3-1}{0{,}08}\approx 35{,}06$ triệu, là tổng của một cấp số nhân có công bội $1{,}08$.` },
      ],
    },
    {
      title: "Quy nạp và hệ thức truy hồi",
      items: [
        {
          kind: "dinh-ly", title: "Nguyên lí quy nạp",
          text: R`Để chứng minh mệnh đề $P(n)$ đúng với mọi $n\ge n_0$, làm hai bước. Bước cơ sở: kiểm $P(n_0)$ đúng. Bước quy nạp: giả sử $P(k)$ đúng với một $k\ge n_0$, chứng minh $P(k+1)$ đúng.`,
          suy: [
            R`Hình ảnh là hàng quân domino: bước cơ sở nói quân đầu tiên đổ, bước quy nạp nói quân nào đổ cũng kéo quân kế tiếp đổ. Hai điều đó cùng nhau làm cả hàng đổ.`,
            R`Lập luận chặt chẽ: giả sử có một số $n$ mà $P(n)$ sai. Trong các số như vậy lấy số nhỏ nhất, gọi là $m$. Số $m$ không thể là $n_0$ vì bước cơ sở đã kiểm $P(n_0)$ đúng.`,
            R`Vậy $m-1\ge n_0$, và $P(m-1)$ đúng vì $m$ là số nhỏ nhất làm mệnh đề sai. Bước quy nạp khi đó cho $P(m)$ đúng, trái với cách chọn $m$. Mâu thuẫn này chứng tỏ không có số nào làm $P(n)$ sai.`,
            R`Điều duy nhất được công nhận ở đây: trong một nhóm số nguyên dương bất kì luôn có số nhỏ nhất.`,
          ],
        },
        { kind: "cach-lam", title: "Mẫu chứng minh", text: R`Muốn chứng minh $1+3+5+\dots+(2n-1)=n^2$: với $n=1$ hai vế cùng bằng $1$. Giả sử tổng của $k$ số đầu là $k^2$, thì tổng của $k+1$ số đầu là $k^2+(2k+1)=(k+1)^2$, đúng công thức với $n=k+1$.` },
        { kind: "luu-y", text: R`Bước cơ sở không được bỏ. Nếu chỉ có bước quy nạp thì «mọi số bằng nhau» cũng chứng minh được bằng một lập luận sai, vì thiếu điểm xuất phát.` },
        { kind: "cach-lam", title: "Dãy cho bằng truy hồi", text: R`Tính vài số hạng đầu, đoán công thức tổng quát, rồi chứng minh công thức bằng quy nạp. Cách này đáng tin vì phép đoán chưa phải là phép chứng minh.` },
        { kind: "vi-du", text: R`Dãy $u_1=1$ và $u_{n+1}=u_n+2n+1$ cho $u_2=1+3=4$ và $u_3=4+5=9$, gợi ý $u_n=n^2$. Với $n=5$, tổng $1+3+5+7+9=25=5^2$ cũng khớp.` },
      ],
    },
  ],
  canNho: [
    R`Cấp số cộng: $u_{n+1}=u_n+d$ và $u_n=u_1+(n-1)d$.`,
    R`Tổng cấp số cộng: $S_n=\frac{n(u_1+u_n)}{2}$; đếm đúng $n$ trước khi thay vào.`,
    R`Ba số lập thành cấp số cộng khi $a+c=2b$, và cấp số nhân khi $b^2=ac$.`,
    R`Cấp số nhân: $u_{n+1}=u_nq$ và $u_n=u_1q^{n-1}$.`,
    R`Tổng cấp số nhân: $S_n=u_1\frac{1-q^n}{1-q}$ khi $q\neq 1$.`,
    R`Tổng vô hạn $S=\frac{u_1}{1-q}$ chỉ khi $|q|<1$.`,
    R`Biết hai số hạng bất kì thì tìm được công sai hoặc công bội qua $u_m=u_k+(m-k)d$ hoặc $u_m=u_kq^{m-k}$.`,
    R`Chứng minh bằng quy nạp luôn có hai bước: cơ sở và quy nạp.`,
  ],
  lienQuan: [
    { id: "exp", vi: R`Cấp số nhân là hàm mũ theo chỉ số, và lãi kép chính là cấp số nhân với công bội $1+r$.` },
    { id: "limit", vi: R`Tổng vô hạn và dãy $\frac{n}{n+1}$ tiến tới một số là những ví dụ đầu tiên của giới hạn.` },
    { id: "ineq", vi: R`Trung bình cộng và trung bình nhân của hai số là số hạng giữa của cấp số cộng và cấp số nhân qua chúng.` },
  ],
  checks: [
    { expr: "3+(10-1)*4", expect: "39" },
    { expr: "Rational(22-7,8-3)", expect: "3" },
    { expr: "7-2*3", expect: "1" },
    { expr: "Rational(100*101,2)", expect: "5050" },
    { expr: "20+14*2", expect: "48" },
    { expr: "Rational(15*(20+48),2)", expect: "510" },
    { expr: "simplify(n*(2*u1+(n-1)*d)/2-(d/2*n**2+(u1-d/2)*n))", expect: "0" },
    { expr: "Rational(3+11,2)", expect: "7" },
    { expr: "2*3**4", expect: "162" },
    { expr: "2*18", expect: "6**2" },
    { expr: "1/(1-Rational(1,2))", expect: "2" },
    { expr: "2*(1-3**5)/(1-3)", expect: "242" },
    { expr: "2+6+18+54+162", expect: "242" },
    { expr: "limit(n/(n+1), n, oo)", expect: "1" },
    { expr: "10+2*Rational(6,1)/(1-Rational(3,5))", expect: "40" },
    { expr: "Rational(6,1)/(1-Rational(3,5))", expect: "15" },
    { expr: "floor(100000*10*Rational(108,100)*(Rational(108,100)**3-1)/Rational(8,100))", expect: "3506112" },
    { expr: "simplify(10*Rational(108,100)*(Rational(108,100)**3-1)/Rational(8,100)-10*(Rational(108,100)+Rational(108,100)**2+Rational(108,100)**3))", expect: "0" },
    { expr: "summation(2*k-1, (k,1,n))", expect: "n**2" },
    { expr: "1+3+5+7+9", expect: "25" },
    { expr: "1+(2*1+1)", expect: "4" },
    { expr: "4+(2*2+1)", expect: "9" },
    { expr: "simplify(k**2+(2*k+1)-(k+1)**2)", expect: "0" },
  ],
};
