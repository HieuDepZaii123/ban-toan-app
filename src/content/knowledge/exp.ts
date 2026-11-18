import type { TopicKnowledge } from "./types.ts";

const R = String.raw;

export const expKnowledge: TopicKnowledge = {
  id: "exp",
  tongQuat: {
    la: R`Hàm số mũ $y=a^x$ với $a>0$, $a\neq 1$ mô tả đại lượng được nhân với cùng một tỉ số sau mỗi bước bằng nhau. Logarit là phép ngược của nó: $\log_a b$ là số mũ cần có để lũy thừa của $a$ bằng $b$.`,
    dungDe: R`Mô tả lãi kép, tăng trưởng dân số, sự phân rã của chất phóng xạ, độ pH, độ lớn của động đất và cường độ âm thanh. Trong bài thi, chuyên đề cho bài rút gọn biểu thức, giải phương trình và bất phương trình mũ, logarit, so sánh các số, và bài toán lãi kép.`,
    lienHe: R`Mũ là phép nhân lặp lại nên nối trực tiếp với cấp số nhân ở chuyên đề Dãy số. Đạo hàm của $a^x$ và $\ln x$ nằm ở chuyên đề Đạo hàm, và nguyên hàm của $e^x$ ở chuyên đề Tích phân. Phương trình mũ thường quy về phương trình bậc hai bằng cách đặt ẩn phụ.`,
  },
  tuDau: [
    R`Gấp đôi một tờ giấy, nó dày gấp $2$. Gấp lần nữa, dày gấp $4$, rồi $8$, rồi $16$. Sau $10$ lần gấp tờ giấy dày gấp $1024$ lần lúc đầu. Kiểu lớn lên «mỗi bước nhân với cùng một số» gọi là tăng theo hàm mũ: vi khuẩn sinh sôi, tiền gửi có lãi nhập gốc, tin đồn lan đi đều theo kiểu này.`,
    R`Lũy thừa là cách viết gọn phép nhân lặp, cũng như phép nhân là cách viết gọn phép cộng lặp. Viết $2^5$ nghĩa là $2\cdot 2\cdot 2\cdot 2\cdot 2=32$: số $2$ ở dưới là cơ số, tức thứ được nhân, còn số $5$ ở trên là số mũ, tức số lần nhân. Mọi quy tắc của lũy thừa đều ra từ việc đếm xem có bao nhiêu thừa số.`,
    R`Logarit là câu hỏi ngược lại. Lũy thừa hỏi «nhân $2$ với chính nó $5$ lần thì được bao nhiêu», còn logarit hỏi «phải nhân $2$ với chính nó mấy lần thì được $32$». Câu trả lời là $5$, viết $\log_2 32=5$. Logarit là một số mũ, không có gì bí ẩn hơn thế.`,
    R`Vì logarit là số mũ, và khi nhân hai lũy thừa cùng cơ số thì số mũ cộng lại, nên logarit biến phép nhân thành phép cộng. Đó là lý do người ta dùng nó để đo những thứ trải từ rất nhỏ đến rất lớn như độ to của âm thanh hay sức mạnh động đất: mỗi lần đại lượng gấp $10$ thì con số đo chỉ tăng thêm một nấc.`,
  ],
  kyHieu: [
    { kh: R`$a^n$`, doc: R`Đọc là «a mũ n»: tích của $n$ thừa số $a$. Số $a$ là cơ số, số $n$ là số mũ.` },
    { kh: R`$a^{-n}$`, doc: R`Số mũ âm nghĩa là chia thay vì nhân: $a^{-n}=\frac{1}{a^n}$. Chẳng hạn $2^{-3}=\frac{1}{8}$.` },
    { kh: R`$a^{\frac{1}{2}}$`, doc: R`Số mũ một phần hai chính là căn bậc hai: $a^{\frac{1}{2}}=\sqrt{a}$.` },
    { kh: R`$\log_a b$`, doc: R`Đọc là «lô-ga cơ số a của b»: số mũ phải đặt lên $a$ để được $b$.` },
    { kh: R`$\lg b$`, doc: R`Logarit cơ số $10$: số mũ phải đặt lên $10$ để được $b$. Chẳng hạn $\lg 1000=3$.` },
    { kh: R`$\ln b$`, doc: R`Logarit tự nhiên, tức logarit cơ số $e$.` },
    { kh: R`$e$`, doc: R`Một hằng số gần bằng $2{,}718$, xuất hiện khi lãi được nhập gốc liên tục. Nó đặc biệt như số $\pi$ của đường tròn.` },
    { kh: R`$(0;+\infty)$`, doc: R`Tập mọi số dương: lớn hơn $0$ và lớn bao nhiêu cũng được.` },
  ],
  canBiet: [
    R`Lũy thừa với số mũ nguyên và các quy tắc nhân, chia lũy thừa.`,
    R`Căn thức và khái niệm hàm số đồng biến, nghịch biến.`,
    R`Giải phương trình bậc hai, dùng cho phép đặt ẩn phụ.`,
  ],
  sections: [
    {
      title: "Lũy thừa và căn",
      items: [
        {
          kind: "dinh-nghia", title: "Số mũ nguyên",
          text: R`Với $n$ nguyên dương, $a^n$ là tích của $n$ thừa số $a$. Quy ước $a^0=1$ và $a^{-n}=\frac{1}{a^n}$ khi $a\neq 0$, để các quy tắc nhân chia lũy thừa vẫn đúng.`,
          de: R`Số mũ đếm số lần nhân: $2^3=2\cdot 2\cdot 2=8$. Mỗi lần giảm số mũ đi $1$ là chia cho cơ số: từ $2^3=8$ xuống $2^2=4$, rồi $2^1=2$. Đi tiếp theo đúng nhịp đó thì $2^0=1$ và $2^{-1}=\frac{1}{2}$. Hai quy ước cho số mũ $0$ và số mũ âm chỉ là kéo dài cái nhịp chia này.`,
        },
        {
          kind: "dinh-nghia", title: "Số mũ hữu tỉ",
          text: R`Với $a>0$ và $\frac{m}{n}$ là số hữu tỉ, $a^{m/n}=\sqrt[n]{a^m}$. Điều kiện $a>0$ là để định nghĩa không phụ thuộc cách viết phân số của số mũ.`,
          de: R`Muốn quy tắc «nhân thì cộng số mũ» vẫn đúng thì $a^{1/2}\cdot a^{1/2}$ phải bằng $a^{1}=a$. Số nhân với chính nó ra $a$ là căn bậc hai của $a$, nên $a^{1/2}=\sqrt{a}$. Tương tự, số mũ có mẫu $n$ nghĩa là lấy căn bậc $n$, còn tử $m$ nghĩa là nâng lên lũy thừa $m$.`,
        },
        {
          kind: "cong-thuc", title: "Quy tắc lũy thừa",
          text: R`Với $a,b>0$: $a^m\cdot a^n=a^{m+n}$, $\frac{a^m}{a^n}=a^{m-n}$, $(a^m)^n=a^{mn}$, $(ab)^n=a^nb^n$ và $\left(\frac{a}{b}\right)^n=\frac{a^n}{b^n}$.`,
          suy: [
            R`Với số mũ nguyên dương, chỉ cần đếm thừa số. Tích $a^m\cdot a^n$ gồm $m$ thừa số $a$ rồi thêm $n$ thừa số $a$, tổng cộng $m+n$ thừa số. Chẳng hạn $2^2\cdot 2^3=(2\cdot 2)(2\cdot 2\cdot 2)=2^5$.`,
            R`Thương $\frac{a^m}{a^n}$ với $m>n$: gạch $n$ thừa số chung ở tử và mẫu, còn lại $m-n$ thừa số ở tử. Các quy ước $a^0=1$ và $a^{-n}=\frac{1}{a^n}$ được chọn để công thức vẫn đúng khi $m\le n$.`,
            R`Lũy thừa của lũy thừa $(a^m)^n$ là $n$ nhóm, mỗi nhóm $m$ thừa số, tổng cộng $mn$ thừa số. Còn $(ab)^n$ là $n$ lần tích $ab$; đổi chỗ để gom các chữ $a$ lại với nhau và các chữ $b$ lại với nhau thì được $a^nb^n$.`,
            R`Với số mũ là phân số, định nghĩa bằng căn được đặt ra đúng để các quy tắc trên vẫn giữ. Với số mũ thực bất kì, các quy tắc được công nhận, vì số thực nào cũng kẹp được giữa hai phân số gần nhau tùy ý.`,
          ],
        },
        {
          kind: "tinh-chat", title: "So sánh hai lũy thừa cùng cơ số",
          text: R`Nếu $a>1$ thì $a^m>a^n$ khi và chỉ khi $m>n$. Nếu $0<a<1$ thì $a^m>a^n$ khi và chỉ khi $m<n$. Cơ số nhỏ hơn $1$ làm đổi chiều.`,
          suy: [
            R`Giả sử $a>1$ và $m>n$. Tách $a^m=a^n\cdot a^{m-n}$. Thừa số $a^{m-n}$ là tích của các số lớn hơn $1$ nên lớn hơn $1$, và nhân số dương $a^n$ với một số lớn hơn $1$ thì được số lớn hơn. Vậy $a^m>a^n$.`,
            R`Nếu $0<a<1$ thì $a^{m-n}$ là tích của các số nhỏ hơn $1$ nên nhỏ hơn $1$, và nhân vào làm nhỏ đi: $a^m<a^n$. Mỗi lần nhân thêm với một số nhỏ hơn $1$, kết quả co lại.`,
            R`Chiều ngược lại: với $a>1$, nếu $m\le n$ thì theo bước đầu $a^m\le a^n$. Vậy muốn $a^m>a^n$ thì buộc phải có $m>n$.`,
          ],
        },
        { kind: "luu-y", text: R`Không viết $(-8)^{1/3}$ theo định nghĩa lũy thừa hữu tỉ, vì cơ số phải dương. Căn bậc ba $\sqrt[3]{-8}=-2$ vẫn có nghĩa, nhưng đó là căn, không phải lũy thừa số mũ $\frac{1}{3}$.` },
        { kind: "vi-du", text: R`Có $8^{2/3}=\left(\sqrt[3]{8}\right)^2=4$ và $2^{-3}=\frac{1}{8}$. Cũng có $\left(\frac{1}{2}\right)^{-3}=8$: nghịch đảo cơ số rồi đổi dấu số mũ.` },
      ],
    },
    {
      title: "Hàm số mũ",
      items: [
        {
          kind: "dinh-nghia", title: "Hàm số mũ",
          text: R`Hàm số $y=a^x$ với $a>0$ và $a\neq 1$ có tập xác định $\mathbb{R}$ và tập giá trị $(0;+\infty)$. Mọi lũy thừa của một số dương đều dương nên đồ thị luôn nằm phía trên trục hoành.`,
          de: R`Đây là cái máy «nhân lặp»: mỗi lần số bỏ vào tăng thêm $1$ thì số trả ra được nhân thêm một lần với $a$. Kết quả luôn dương vì nhân các số dương với nhau không bao giờ ra số âm hay số $0$. Cơ số $a=1$ bị loại vì $1$ nhân bao nhiêu lần vẫn là $1$, không có gì để xem.`,
        },
        {
          kind: "tinh-chat", title: "Chiều biến thiên và đồ thị",
          text: R`Hàm đồng biến trên $\mathbb{R}$ khi $a>1$ và nghịch biến khi $0<a<1$. Đồ thị luôn đi qua $(0;1)$ và $(1;a)$, nhận trục hoành làm tiệm cận ngang, và không cắt trục hoành.`,
          suy: [
            R`Đồng biến hay nghịch biến chính là tính chất so sánh hai lũy thừa cùng cơ số: với $a>1$, số mũ lớn hơn cho giá trị lớn hơn; với $0<a<1$ thì ngược lại.`,
            R`Vì $a^0=1$ nên đồ thị qua $(0;1)$, và vì $a^1=a$ nên đồ thị qua $(1;a)$, với mọi cơ số.`,
            R`Giá trị luôn dương nên đồ thị không chạm trục hoành. Với $a>1$, mỗi bước lùi sang trái một đơn vị là chia cho $a$: giá trị nhỏ dần về $0$ nhưng không bao giờ bằng $0$. Đồ thị vì thế sát dần trục hoành mà không chạm, tức trục hoành là tiệm cận ngang.`,
          ],
          suyKhac: [
            {
              cach: "Bằng đạo hàm",
              buoc: [
                R`Theo mục «Số e và đạo hàm», $(a^x)'=a^x\ln a$. Vì $a^x>0$ với mọi $x$ nên dấu của đạo hàm là dấu của $\ln a$.`,
                R`Khi $a>1$ thì $\ln a>0$, đạo hàm dương trên cả trục số, nên hàm đồng biến. Khi $0<a<1$ thì $\ln a<0$, đạo hàm âm, nên hàm nghịch biến.`,
                R`Tại $x=0$ độ dốc là $a^0\ln a=\ln a$: cơ số càng lớn thì đồ thị cắt trục tung càng dốc. Xem hình «Độ dốc của hàm mũ luôn tỉ lệ với chính giá trị của nó» ở phần Suy từ số 0.`,
              ],
            },
          ],
        },
        { kind: "luu-y", text: R`Loại $a=1$ vì khi đó $y=1^x$ là hàm hằng, không đơn điệu và không có hàm ngược. Loại $a\le 0$ vì khi đó $a^x$ không xác định với nhiều số mũ không nguyên.` },
        {
          kind: "cong-thuc", title: "Số e và đạo hàm",
          text: R`Số $e\approx 2{,}718$ là cơ số làm cho $(e^x)'=e^x$. Với cơ số bất kì, $(a^x)'=a^x\ln a$, nên tốc độ tăng của hàm mũ tỉ lệ với chính giá trị hiện có.`,
          suy: [
            R`Tốc độ thay đổi của $a^x$ trên một bước nhỏ $h$ là $\frac{a^{x+h}-a^x}{h}=a^x\cdot\frac{a^h-1}{h}$, vì $a^{x+h}=a^x\cdot a^h$. Thừa số sau không chứa $x$.`,
            R`Khi $h$ nhỏ dần về $0$, thừa số $\frac{a^h-1}{h}$ tiến về một hằng số chỉ phụ thuộc cơ số: khoảng $0{,}693$ với $a=2$ và khoảng $1{,}099$ với $a=3$. Vậy đạo hàm của hàm mũ luôn bằng chính nó nhân một hằng số.`,
            R`Số $e$ nằm giữa $2$ và $3$ là cơ số làm cho hằng số đó đúng bằng $1$, nên $(e^x)'=e^x$.`,
            R`Với cơ số khác, viết $a=e^{\ln a}$ nên $a^x=e^{x\ln a}$. Lấy đạo hàm theo quy tắc hàm hợp được $e^{x\ln a}\cdot\ln a=a^x\ln a$. Hằng số nói ở bước hai chính là $\ln a$.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Lãi kép và phân rã",
          text: R`Gửi $P$ với lãi $r$ mỗi kì, sau $n$ kì có $A=P(1+r)^n$. Chất có chu kì bán rã $T$ còn lại $N=N_0\left(\frac{1}{2}\right)^{t/T}$ sau thời gian $t$.`,
          suy: [
            R`Sau một kì, tiền gốc $P$ có thêm tiền lãi $Pr$, thành $P+Pr=P(1+r)$. Vậy mỗi kì số tiền được nhân với $(1+r)$.`,
            R`Lãi nhập vào gốc nên kì sau lại nhân tiếp với $(1+r)$. Sau $n$ kì đã nhân $n$ lần: $A=P(1+r)^n$.`,
            R`Phân rã cũng là nhân lặp, với thừa số $\frac{1}{2}$ cho mỗi chu kì $T$. Trong thời gian $t$ có $\frac{t}{T}$ chu kì, nên lượng còn lại là $N_0\left(\frac{1}{2}\right)^{t/T}$.`,
          ],
          suyKhac: [
            {
              cach: "Bằng cấp số nhân",
              buoc: [
                R`Gọi $A_k$ là số tiền sau $k$ kì, $A_0=P$. Tiền lãi của kì thứ $k+1$ là $rA_k$, nên $A_{k+1}=A_k+rA_k=(1+r)A_k$.`,
                R`Hai số hạng liên tiếp của dãy $A_0,A_1,A_2,\dots$ luôn có tỉ số $1+r$, nên đó là một cấp số nhân với công bội $q=1+r$ (xem chuyên đề Dãy số). Số hạng tổng quát là $A_n=A_0q^n=P(1+r)^n$.`,
                R`Phân rã cũng là cấp số nhân, công bội $\frac{1}{2}$ cho mỗi chu kì $T$: sau $k$ chu kì còn $N_0\left(\frac{1}{2}\right)^k$. Với $t=kT$, tức $k=\frac{t}{T}$, được $N=N_0\left(\frac{1}{2}\right)^{t/T}$; công thức này đúng cả khi $t$ không là bội của $T$ nhờ số mũ thực.`,
              ],
            },
          ],
        },
        { kind: "vi-du", text: R`Gửi $10$ triệu đồng, lãi kép $8\%$ mỗi năm, sau $5$ năm có $10\cdot(1{,}08)^5\approx 14{,}69$ triệu. Lãi đơn chỉ cho $10(1+5\cdot 0{,}08)=14$ triệu, nên lãi kép hơn khoảng $0{,}69$ triệu vì tiền lãi cũng sinh lãi.` },
      ],
    },
    {
      title: "Logarit và các tính chất",
      items: [
        {
          kind: "dinh-nghia", title: "Logarit",
          text: R`Với $a>0$, $a\neq 1$ và $b>0$: $\log_a b=c$ khi và chỉ khi $a^c=b$. Cả ba điều kiện đều cần, vì lũy thừa dương của cơ số dương luôn dương.`,
          de: R`Logarit trả lời câu hỏi «mũ mấy». Hỏi $2$ mũ mấy thì bằng $8$: trả lời là $3$, nên $\log_2 8=3$. Số $b$ phải dương vì lũy thừa của một số dương luôn dương, không có số mũ nào cho ra số âm. Cơ số $1$ bị loại vì $1$ mũ mấy cũng vẫn bằng $1$.`,
        },
        {
          kind: "tinh-chat", title: "Giá trị đặc biệt",
          text: R`Có $\log_a 1=0$ và $\log_a a=1$. Với mọi $b>0$ có $a^{\log_a b}=b$, và với mọi số thực $c$ có $\log_a a^c=c$. Hai biểu thức cuối cho thấy mũ và logarit khử nhau.`,
          suy: [
            R`Vì $a^0=1$ nên số mũ cho ra $1$ là $0$, tức $\log_a 1=0$. Vì $a^1=a$ nên $\log_a a=1$.`,
            R`Số $\log_a b$ theo định nghĩa là số mũ đặt lên $a$ thì được $b$. Đặt đúng số mũ đó lên $a$ thì dĩ nhiên được $b$: $a^{\log_a b}=b$.`,
            R`Biểu thức $\log_a a^c$ hỏi «$a$ mũ mấy thì bằng $a^c$», và câu trả lời là $c$.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Quy tắc tính",
          text: R`Với $b,c>0$: $\log_a(bc)=\log_a b+\log_a c$, $\log_a\frac{b}{c}=\log_a b-\log_a c$ và $\log_a b^{\alpha}=\alpha\log_a b$. Logarit biến phép nhân thành phép cộng.`,
          suy: [
            R`Đặt $m=\log_a b$ và $n=\log_a c$. Theo định nghĩa, $b=a^m$ và $c=a^n$.`,
            R`Nhân lại: $bc=a^m\cdot a^n=a^{m+n}$. Số mũ cho ra $bc$ là $m+n$, tức $\log_a(bc)=\log_a b+\log_a c$.`,
            R`Chia: $\frac{b}{c}=a^{m-n}$, nên $\log_a\frac{b}{c}=m-n$.`,
            R`Lũy thừa: $b^{\alpha}=(a^m)^{\alpha}=a^{\alpha m}$, nên $\log_a b^{\alpha}=\alpha m=\alpha\log_a b$.`,
          ],
          suyKhac: [
            {
              cach: "Bằng đạo hàm",
              buoc: [
                R`Với $c>0$ cố định, xét $F(x)=\ln(cx)$ và $G(x)=\ln x$ trên $x>0$. Theo quy tắc hàm hợp và $(\ln u)'=\frac{u'}{u}$: $F'(x)=\frac{c}{cx}=\frac{1}{x}$, và $G'(x)=\frac{1}{x}$.`,
                R`Hai hàm có cùng đạo hàm trên khoảng $(0;+\infty)$ thì hiệu của chúng có đạo hàm bằng $0$, nên là một hằng số (xem chuyên đề Đạo hàm): $\ln(cx)=\ln x+k$ với một số $k$.`,
                R`Thay $x=1$: $\ln c=\ln 1+k=k$. Vậy $\ln(cx)=\ln x+\ln c$ với mọi $x,c>0$, tức $\ln(bc)=\ln b+\ln c$. Với cơ số $a$, chia hai vế cho $\ln a$ theo công thức đổi cơ số. Xem hình «Thước logarit» ở phần Suy từ số 0 cho cùng ý dưới dạng đoạn thẳng.`,
              ],
            },
          ],
        },
        {
          kind: "cong-thuc", title: "Đổi cơ số",
          text: R`Công thức đổi cơ số là $\log_a b=\frac{\log_c b}{\log_c a}$ với mọi cơ số $c$ hợp lệ. Hệ quả là $\log_a b\cdot\log_b a=1$ và $\log_{a^\alpha}b=\frac{1}{\alpha}\log_a b$.`,
          suy: [
            R`Đặt $x=\log_a b$, tức $a^x=b$. Lấy logarit cơ số $c$ của hai vế và dùng quy tắc lũy thừa: $x\log_c a=\log_c b$.`,
            R`Vì $a\neq 1$ nên $\log_c a\neq 0$, chia được: $x=\frac{\log_c b}{\log_c a}$.`,
            R`Chọn $c=b$ thì tử bằng $\log_b b=1$, nên $\log_a b=\frac{1}{\log_b a}$, tức $\log_a b\cdot\log_b a=1$.`,
            R`Chọn $c=a$ cho cơ số $a^{\alpha}$: $\log_{a^{\alpha}}b=\frac{\log_a b}{\log_a a^{\alpha}}=\frac{\log_a b}{\alpha}$.`,
          ],
        },
        {
          kind: "dinh-nghia", title: "Hai cơ số đặc biệt",
          text: R`Logarit thập phân $\lg b=\log_{10}b$ và logarit tự nhiên $\ln b=\log_e b$. Trên máy tính chỉ có hai nút này, nên mọi logarit khác tính bằng công thức đổi cơ số.`,
          de: R`Hai logarit này có tên riêng vì dùng nhiều nhất. Cơ số $10$ hợp với cách đếm của con người: $\lg$ của một số cho biết số đó có khoảng bao nhiêu chữ số. Cơ số $e$ hợp với mọi thứ lớn lên liên tục, và làm cho các công thức đạo hàm gọn nhất.`,
        },
        { kind: "luu-y", text: R`Quy tắc $\log_a(bc)=\log_a b+\log_a c$ chỉ đúng khi cả $b$ và $c$ dương. Với $x$ có thể âm, phải viết $\log_a x^2=2\log_a|x|$ chứ không phải $2\log_a x$, nếu không sẽ làm mất nghiệm.` },
        { kind: "vi-du", text: R`Có $\log_2 32=5$ vì $2^5=32$, và $\log_2 8-\log_2 1=3-0=3$. Đổi cơ số: $\log_4 8=\frac{\log_2 8}{\log_2 4}=\frac{3}{2}$. Cũng có $\log_3 9=2$.` },
      ],
    },
    {
      title: "Hàm số logarit",
      items: [
        {
          kind: "dinh-nghia", title: "Hàm số logarit",
          text: R`Hàm số $y=\log_a x$ với $a>0$, $a\neq 1$ có tập xác định $(0;+\infty)$ và tập giá trị $\mathbb{R}$. Đây là hàm ngược của $y=a^x$.`,
          de: R`Đây là cái máy chạy ngược của hàm mũ. Máy mũ nhận số mũ và trả ra kết quả; máy logarit nhận kết quả và trả lại số mũ. Máy chỉ nhận số dương vì máy mũ chỉ trả ra số dương, còn số nó trả ra thì âm, dương hay bằng $0$ đều được.`,
        },
        {
          kind: "tinh-chat", title: "Chiều biến thiên và đồ thị",
          text: R`Hàm đồng biến khi $a>1$ và nghịch biến khi $0<a<1$. Đồ thị đi qua $(1;0)$ và $(a;1)$, nhận trục tung làm tiệm cận đứng, và đối xứng với đồ thị $y=a^x$ qua đường thẳng $y=x$.`,
          suy: [
            R`Điểm $(p;q)$ nằm trên đồ thị $y=a^x$ nghĩa là $q=a^p$, tức $p=\log_a q$, tức điểm $(q;p)$ nằm trên đồ thị $y=\log_a x$. Đổi chỗ hai tọa độ của một điểm chính là lấy đối xứng điểm đó qua đường thẳng $y=x$.`,
            R`Vì vậy hai điểm $(0;1)$ và $(1;a)$ của đồ thị mũ thành $(1;0)$ và $(a;1)$, còn tiệm cận ngang là trục hoành thành tiệm cận đứng là trục tung.`,
            R`Chiều biến thiên: lấy $0<u<v$, đặt $u=a^m$ và $v=a^n$. Với $a>1$, từ $a^m<a^n$ suy ra $m<n$, tức $\log_a u<\log_a v$: hàm đồng biến. Với $0<a<1$ thì chiều đảo lại.`,
          ],
          suyKhac: [
            {
              cach: "Bằng đạo hàm",
              buoc: [
                R`Với $x>0$, $(\log_a x)'=\frac{1}{x\ln a}$. Vì $x>0$ nên dấu của đạo hàm là dấu của $\ln a$.`,
                R`Khi $a>1$ thì đạo hàm dương, hàm đồng biến; khi $0<a<1$ thì đạo hàm âm, hàm nghịch biến.`,
                R`Khi $a>1$, độ dốc $\frac{1}{x\ln a}$ giảm dần theo $x$: hàm logarit tăng nhưng chậm dần, trái với hàm mũ tăng nhanh dần.`,
              ],
            },
          ],
        },
        {
          kind: "cong-thuc", title: "Đạo hàm",
          text: R`Đạo hàm là $(\log_a x)'=\frac{1}{x\ln a}$ và đặc biệt $(\ln x)'=\frac{1}{x}$ với $x>0$. Đạo hàm của $\ln x$ chỉ là $\frac{1}{x}$, không còn hệ số $\frac{1}{\ln a}$, nên $\ln$ là logarit gọn nhất khi làm giải tích.`,
          suy: [
            R`Đặt $y=\ln x$, nghĩa là $e^y=x$. Lấy đạo hàm hai vế theo $x$, vế trái dùng quy tắc hàm hợp: $e^y\cdot y'=1$.`,
            R`Giải ra $y'=\frac{1}{e^y}$, và vì $e^y=x$ nên $(\ln x)'=\frac{1}{x}$.`,
            R`Với cơ số khác, đổi cơ số: $\log_a x=\frac{\ln x}{\ln a}$. Số $\frac{1}{\ln a}$ là hằng số nên đứng ngoài khi lấy đạo hàm, được $\frac{1}{x\ln a}$.`,
          ],
          suyKhac: [
            {
              cach: "Bằng giới hạn",
              buoc: [
                R`Theo định nghĩa, $(\ln x)'=\lim_{h\to 0}\frac{\ln(x+h)-\ln x}{h}=\lim_{h\to 0}\frac{1}{h}\ln\left(1+\frac{h}{x}\right)$, dùng quy tắc logarit của thương.`,
                R`Với $x>0$ cố định, đặt $s=\frac{h}{x}$, tức $h=xs$. Biểu thức thành $\frac{1}{x}\cdot\frac{\ln(1+s)}{s}=\frac{1}{x}\ln\left((1+s)^{1/s}\right)$, vì $\alpha\ln u=\ln u^{\alpha}$.`,
                R`Khi $s\to 0$ thì $(1+s)^{1/s}\to e$ (giới hạn đặc biệt, được công nhận), và $\ln$ liên tục nên $\ln\left((1+s)^{1/s}\right)\to\ln e=1$. Vậy $(\ln x)'=\frac{1}{x}$, rồi đổi cơ số để được $\frac{1}{x\ln a}$ cho $\log_a x$.`,
              ],
            },
          ],
        },
        { kind: "luu-y", title: "Điều kiện xác định", text: R`Biểu thức $\log_a f(x)$ chỉ có nghĩa khi $f(x)>0$. Mọi bài logarit phải bắt đầu bằng việc đặt điều kiện này, rồi kiểm lại nghiệm ở cuối.` },
        { kind: "vi-du", text: R`Tập xác định của $y=\log_2(x^2-3x+2)$ là tập các $x$ có $x^2-3x+2>0$. Tam thức có nghiệm $1$ và $2$, hệ số $a=1>0$, nên tập xác định là $x<1$ hoặc $x>2$. Tại $x=\frac{3}{2}$ biểu thức trong ngoặc bằng $-\frac{1}{4}<0$ nên không thuộc tập.` },
      ],
    },
    {
      title: "Phương trình và bất phương trình mũ",
      items: [
        { kind: "cach-lam", title: "Đưa về cùng cơ số", text: R`Với $a>0$, $a\neq 1$: $a^{f(x)}=a^{g(x)}$ khi và chỉ khi $f(x)=g(x)$. Viết hai vế thành lũy thừa của cùng một cơ số rồi so sánh số mũ.` },
        { kind: "cach-lam", title: "Đặt ẩn phụ", text: R`Đặt $t=a^x$ với điều kiện $t>0$, đưa về phương trình đại số theo $t$, giải rồi quay lại $a^x=t$. Với $4^x-3\cdot 2^x+2=0$ đặt $t=2^x$ được $t^2-3t+2=0$, nên $t=1$ hoặc $t=2$, tức $x=0$ hoặc $x=1$.` },
        { kind: "cach-lam", title: "Lấy logarit hai vế", text: R`Khi hai vế không cùng cơ số, lấy logarit cả hai vế. Chẳng hạn $2^x=7$ cho $x=\log_2 7$, số này nằm giữa $2$ và $3$ vì $2^2=4<7<8=2^3$.` },
        {
          kind: "tinh-chat", title: "Bất phương trình mũ",
          text: R`Nếu $a>1$ thì $a^u>a^v$ khi và chỉ khi $u>v$. Nếu $0<a<1$ thì chiều đổi ngược. Như vậy $\left(\frac{1}{2}\right)^x>\frac{1}{4}$ khi và chỉ khi $x<2$.`,
          suy: [
            R`Đây là tính chất so sánh hai lũy thừa cùng cơ số ở phần đầu, đọc với hai số mũ là hai biểu thức $u$ và $v$: cơ số lớn hơn $1$ thì lũy thừa lớn hơn ứng với số mũ lớn hơn, cơ số nhỏ hơn $1$ thì ngược lại.`,
            R`Trong ví dụ, viết $\frac{1}{4}=\left(\frac{1}{2}\right)^2$ để hai vế cùng cơ số $\frac{1}{2}$. Cơ số này nhỏ hơn $1$ nên bỏ cơ số thì đổi chiều: $x<2$.`,
          ],
        },
        { kind: "luu-y", text: R`Sau khi đặt $t=a^x$ phải loại các giá trị $t\le 0$. Chẳng hạn $2^x=-3$ vô nghiệm vì lũy thừa của $2$ luôn dương, dù phương trình theo $t$ có nghiệm.` },
        { kind: "vi-du", text: R`Phương trình $2^{x+1}=32$ viết thành $2^{x+1}=2^5$ nên $x=4$. Phương trình $9^x-4\cdot 3^x+3=0$ đặt $t=3^x$ được $t^2-4t+3=0$, nên $t=1$ hoặc $t=3$, tức $x=0$ hoặc $x=1$.` },
      ],
    },
    {
      title: "Phương trình và bất phương trình logarit",
      items: [
        { kind: "cach-lam", title: "Đặt điều kiện trước", text: R`Viết điều kiện để mọi biểu thức trong logarit dương, giải rồi so nghiệm với điều kiện. Quy tắc $\log_a f=\log_a g$ khi và chỉ khi $f=g>0$ đã bao gồm điều kiện dương.` },
        { kind: "cach-lam", title: "Mũ hóa hai vế", text: R`Từ $\log_a f(x)=c$ suy ra $f(x)=a^c$. Đây là bước ngược lại của logarit, dùng khi vế phải là một hằng số.` },
        {
          kind: "tinh-chat", title: "Bất phương trình logarit",
          text: R`Với $a>1$ thì $\log_a u>\log_a v$ khi và chỉ khi $u>v>0$. Với $0<a<1$ thì khi và chỉ khi $0<u<v$. Điều kiện dương luôn phải giữ.`,
          suy: [
            R`Logarit chỉ có nghĩa với số dương nên trước hết cần $u>0$ và $v>0$. Đặt $m=\log_a u$ và $n=\log_a v$, tức $u=a^m$ và $v=a^n$.`,
            R`Với $a>1$: $m>n$ khi và chỉ khi $a^m>a^n$, tức $u>v$. Với $0<a<1$: $m>n$ khi và chỉ khi $a^m<a^n$, tức $u<v$. Ghép với điều kiện dương được kết luận của mục.`,
          ],
        },
        { kind: "luu-y", title: "Nghiệm ngoại lai", text: R`Biến đổi gộp các logarit có thể thêm nghiệm làm một biểu thức trong logarit âm. Luôn thử lại nghiệm vào điều kiện, và chỉ giữ những nghiệm thỏa.` },
        { kind: "vi-du", text: R`Với $\log_3(2x+1)=2$ có $2x+1=9$, nên $x=4$. Với $\log_2 x+\log_2(x-1)=1$ điều kiện là $x>1$, gộp được $x(x-1)=2$, nên $x=2$ hoặc $x=-1$. Nghiệm $x=-1$ không thỏa $x>1$ nên bị loại, và chỉ còn $x=2$.` },
      ],
    },
    {
      title: "Ứng dụng: lãi kép, phân rã, thang đo logarit",
      items: [
        {
          kind: "cong-thuc", title: "Thời gian gấp đôi",
          text: R`Vốn gấp đôi khi $(1+r)^n=2$, tức $n=\frac{\ln 2}{\ln(1+r)}$. Với lãi $8\%$ mỗi năm thì $n\approx 9{,}006$ năm, gần với quy tắc ước lượng $\frac{70}{8}\approx 8{,}75$ năm.`,
          suy: [
            R`Vốn gấp đôi nghĩa là $P(1+r)^n=2P$. Chia hai vế cho $P$ còn $(1+r)^n=2$: thời gian gấp đôi không phụ thuộc số tiền ban đầu.`,
            R`Lấy $\ln$ hai vế và đưa số mũ ra ngoài: $n\ln(1+r)=\ln 2$, nên $n=\frac{\ln 2}{\ln(1+r)}$.`,
            R`Quy tắc ước lượng: khi $r$ nhỏ thì $\ln(1+r)$ gần bằng $r$, còn $\ln 2\approx 0{,}693$. Vậy $n\approx\frac{0{,}693}{r}$, tức khoảng $70$ chia cho lãi suất tính bằng phần trăm.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Chu kì bán rã",
          text: R`Sau $T$ thì còn một nửa, sau $2T$ còn một phần tư, sau $3T$ còn $\left(\frac{1}{2}\right)^3=\frac{1}{8}$ lượng ban đầu. Thời gian để còn một tỉ lệ cho trước giải bằng logarit.`,
          suy: [
            R`Mỗi chu kì $T$ lượng chất nhân với $\frac{1}{2}$. Sau $k$ chu kì đã nhân $k$ lần, còn $\left(\frac{1}{2}\right)^k$ lượng ban đầu.`,
            R`Muốn còn lại tỉ lệ $p$ thì giải $\left(\frac{1}{2}\right)^{t/T}=p$. Lấy $\ln$ hai vế: $\frac{t}{T}\ln\frac{1}{2}=\ln p$, nên $t=T\cdot\frac{\ln p}{\ln\frac{1}{2}}$.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Thang đo logarit",
          text: R`Độ to của âm thanh tính bằng $L=10\lg\frac{I}{I_0}$ đêxiben. Cường độ tăng gấp $10$ lần thì $L$ tăng $10$ dB, tăng gấp đôi thì $L$ tăng $10\lg 2\approx 3{,}01$ dB. Độ pH và độ Richter cũng dùng thang logarit.`,
          suy: [
            R`Khi cường độ gấp $10$: $10\lg\frac{10I}{I_0}=10\left(\lg 10+\lg\frac{I}{I_0}\right)=10+L$, vì logarit của tích bằng tổng các logarit và $\lg 10=1$.`,
            R`Khi cường độ gấp đôi: $10\lg\frac{2I}{I_0}=10\lg 2+L$, và $\lg 2\approx 0{,}301$ nên mức tăng khoảng $3{,}01$ dB.`,
          ],
        },
        { kind: "luu-y", text: R`Lãi kép khác lãi đơn: số tiền là $P(1+r)^n$, không phải $P(1+nr)$. Với thời gian dài, hai kết quả cách xa nhau rất nhanh.` },
      ],
    },
  ],
  canNho: [
    R`Quy tắc lũy thừa: nhân cộng số mũ, chia trừ số mũ, lũy thừa của lũy thừa nhân số mũ.`,
    R`Hàm $y=a^x$ đồng biến khi $a>1$, nghịch biến khi $0<a<1$; luôn dương và đi qua $(0;1)$.`,
    R`Định nghĩa: $\log_a b=c$ khi và chỉ khi $a^c=b$, với $a>0$, $a\neq 1$, $b>0$.`,
    R`Logarit của tích bằng tổng logarit, của thương bằng hiệu, của lũy thừa bằng số mũ nhân logarit; chỉ khi các số đều dương.`,
    R`Đổi cơ số: $\log_a b=\frac{\log_c b}{\log_c a}$.`,
    R`Phương trình mũ: đưa về cùng cơ số, đặt $t=a^x>0$, hoặc lấy logarit hai vế.`,
    R`Bất phương trình mũ và logarit: cơ số lớn hơn $1$ giữ chiều, cơ số nhỏ hơn $1$ đổi chiều.`,
    R`Bài logarit luôn đặt điều kiện dương trước và thử lại nghiệm ở cuối.`,
    R`Lãi kép là $A=P(1+r)^n$; chu kì bán rã cho tỉ lệ $\left(\frac{1}{2}\right)^{t/T}$.`,
  ],
  lienQuan: [
    { id: "sequence", vi: R`Dãy các giá trị $a^n$ là cấp số nhân, và tổng lãi kép nhiều kì dùng công thức tổng cấp số nhân.` },
    { id: "derivative", vi: R`Đạo hàm $(e^x)'=e^x$ và $(\ln x)'=\frac{1}{x}$ cho phép khảo sát các hàm chứa mũ và logarit.` },
    { id: "integral", vi: R`Nguyên hàm của $e^x$ là $e^x$ và của $\frac{1}{x}$ là $\ln|x|$, nên diện tích dưới đường mũ tính được trực tiếp.` },
  ],
  checks: [
    { expr: "diff(log(c*x), x) - 1/x", expect: "0" },
    { expr: "limit(log(1+s)/s, s, 0)", expect: "1" },
    { expr: "simplify(diff(a**x, x) - a**x*log(a))", expect: "0" },
    { expr: "simplify(diff(log(x)/log(a), x) - 1/(x*log(a)))", expect: "0" },
    { expr: "simplify(P*(1+r)**3 - (1+r)*((1+r)*((1+r)*P)))", expect: "0" },
    { expr: "Rational(8)**Rational(2,3)", expect: "4" },
    { expr: "2**(-3)", expect: "Rational(1,8)" },
    { expr: "Rational(1,2)**(-3)", expect: "8" },
    { expr: "floor(100*10*Rational(108,100)**5)", expect: "1469" },
    { expr: "10*(1+5*Rational(8,100))", expect: "14" },
    { expr: "log(32,2)", expect: "5" },
    { expr: "log(8,2)-log(1,2)", expect: "3" },
    { expr: "simplify(log(8,4))", expect: "Rational(3,2)" },
    { expr: "log(9,3)", expect: "2" },
    { expr: "simplify(log(b,a)*log(a,b))", expect: "1" },
    { expr: "diff(a**x, x)", expect: "a**x*log(a)" },
    { expr: "diff(log(x,a), x)", expect: "1/(x*log(a))" },
    { expr: "(x**2-3*x+2).subs(x,Rational(3,2))", expect: "Rational(-1,4)" },
    { expr: "solve(x**2-3*x+2, x)", expect: "[1, 2]" },
    { expr: "solve(2**(x+1)-32, x)", expect: "[4]" },
    { expr: "solve(t**2-3*t+2, t)", expect: "[1, 2]" },
    { expr: "4**0-3*2**0+2", expect: "0" },
    { expr: "4**1-3*2**1+2", expect: "0" },
    { expr: "solve(t**2-4*t+3, t)", expect: "[1, 3]" },
    { expr: "9**0-4*3**0+3", expect: "0" },
    { expr: "9**1-4*3**1+3", expect: "0" },
    { expr: "Rational(1,2)**2", expect: "Rational(1,4)" },
    { expr: "2*4+1", expect: "9" },
    { expr: "solve(x*(x-1)-2, x)", expect: "[-1, 2]" },
    { expr: "log(2,2)+log(2-1,2)", expect: "1" },
    { expr: "floor(1000*log(2)/log(Rational(108,100)))", expect: "9006" },
    { expr: "Rational(70,8)", expect: "Rational(35,4)" },
    { expr: "Rational(1,2)**3", expect: "Rational(1,8)" },
    { expr: "floor(1000*log(2,10))", expect: "301" },
  ],
};
