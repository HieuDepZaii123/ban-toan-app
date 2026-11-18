import type { TopicKnowledge } from "./types.ts";

const R = String.raw;

export const ineqKnowledge: TopicKnowledge = {
  id: "ineq",
  tongQuat: {
    la: R`Bất đẳng thức là mệnh đề so sánh hai biểu thức bằng $<$, $>$, $\le$ hoặc $\ge$ và đúng với mọi giá trị trong một miền cho trước. Chuyên đề dạy hai việc: chứng minh một bất đẳng thức luôn đúng, và tìm giá trị lớn nhất hoặc nhỏ nhất của một biểu thức.`,
    dungDe: R`Cho biết một đại lượng không thể vượt quá mức nào: chi phí nhỏ nhất, diện tích lớn nhất, sai số cho phép. Trong bài thi, chuyên đề xuất hiện ở bài chứng minh, bài tìm cực trị của biểu thức nhiều biến có điều kiện ràng buộc, và bài chứng minh một đáp số là tối ưu.`,
    lienHe: R`Hoàn thiện bình phương ở hàm bậc hai là nguồn gốc của nhiều bất đẳng thức, còn đạo hàm là cách khác để tìm cực trị. Trung bình cộng và trung bình nhân trong bất đẳng thức Cauchy là cùng hai khái niệm với dãy số và thống kê.`,
  },
  tuDau: [
    R`Đặt hai vật lên hai đĩa cân: đĩa nào trĩu xuống thì bên đó nặng hơn. Bất đẳng thức là câu «bên này lớn hơn bên kia» viết bằng ký hiệu, chẳng hạn $5>3$. Khác với phương trình hỏi «khi nào hai bên bằng nhau», bất đẳng thức hỏi «bên nào lớn hơn, và lớn hơn trong những trường hợp nào».`,
    R`Rất nhiều câu hỏi đời thường không hỏi «bằng bao nhiêu» mà hỏi «nhiều nhất là bao nhiêu», «ít nhất là bao nhiêu». Có $20$ mét rào thì quây được mảnh vườn chữ nhật rộng nhất là bao nhiêu? Muốn trả lời phải chứng minh hai điều: diện tích không thể vượt một con số nào đó, và có một cách quây đạt đúng con số ấy.`,
    R`Cả chuyên đề đứng trên hai viên gạch. Viên thứ nhất: so sánh hai số là xét hiệu của chúng, hiệu dương thì số bị trừ lớn hơn. Viên thứ hai: một số nhân với chính nó không bao giờ âm, vì dương nhân dương ra dương và âm nhân âm cũng ra dương. Mọi bất đẳng thức nổi tiếng bên dưới đều là viên gạch thứ hai được viết lại khéo léo.`,
    R`Mỗi bất đẳng thức có một «lúc bằng nhau», gọi là dấu bằng. Đó là lúc cái cân thăng bằng, và cũng là lúc đại lượng đạt giá trị lớn nhất hoặc nhỏ nhất. Vì vậy khi đọc phần chứng minh, hãy luôn tìm xem dấu bằng xảy ra ở đâu: thiếu nó thì bài tìm cực trị chưa xong.`,
  ],
  kyHieu: [
    { kh: R`$a>b$`, doc: R`Đọc là «a lớn hơn b». Trên trục số, điểm $a$ nằm bên phải điểm $b$.` },
    { kh: R`$a\ge b$`, doc: R`Đọc là «a lớn hơn hoặc bằng b». Câu này đúng cả khi hai số bằng nhau, chẳng hạn $3\ge 3$.` },
    { kh: R`$|x|$`, doc: R`Giá trị tuyệt đối: khoảng cách từ $x$ đến số $0$ trên trục số, luôn không âm. Chẳng hạn $|-4|=4$ và $|4|=4$.` },
    { kh: R`$\sqrt{ab}$`, doc: R`Căn bậc hai của tích $ab$: số không âm mà bình phương lên thì bằng $ab$.` },
    { kh: R`$\sqrt[3]{8}$`, doc: R`Căn bậc ba: số mà nhân ba lần với chính nó thì ra số dưới dấu căn. Ở đây là $2$ vì $2\cdot 2\cdot 2=8$.` },
    { kh: R`$\frac{a+b}{2}$`, doc: R`Trung bình cộng của hai số: cộng lại rồi chia đôi, là điểm chính giữa của $a$ và $b$ trên trục số.` },
    { kh: R`$x\in D$`, doc: R`Đọc là «x thuộc D»: số $x$ nằm trong tập $D$ các giá trị được phép.` },
  ],
  canBiet: [
    R`Tính chất của thứ tự trên số thực: cộng và nhân hai vế với một số.`,
    R`Hằng đẳng thức $(a\pm b)^2$ và phép khai căn bậc hai.`,
    R`Hàm số bậc hai và giá trị nhỏ nhất của nó.`,
  ],
  sections: [
    {
      title: "Tính chất cơ bản của bất đẳng thức",
      items: [
        {
          kind: "dinh-nghia", title: "So sánh hai số",
          text: R`Nói $a>b$ nghĩa là $a-b>0$. Mọi bất đẳng thức đều có thể quy về việc xét dấu của một hiệu, đó là lý do cách chứng minh «xét hiệu» luôn dùng được.`,
          de: R`Muốn biết hai số ai lớn hơn, lấy số này trừ số kia rồi nhìn dấu của kết quả. Kết quả dương thì số đứng trước lớn hơn, âm thì nhỏ hơn, bằng $0$ thì hai số bằng nhau. Cách này biến mọi câu hỏi so sánh thành câu hỏi «một biểu thức dương hay âm».`,
        },
        {
          kind: "tinh-chat", title: "Cộng, nhân với một số",
          text: R`Cộng cùng một số vào hai vế thì giữ nguyên chiều. Nhân hai vế với số dương thì giữ chiều, nhân với số âm thì đổi chiều. Bắc cầu: từ $a>b$ và $b>c$ suy ra $a>c$.`,
          suy: [
            R`Theo định nghĩa, $a>b$ nghĩa là $a-b>0$. Cộng $c$ vào hai vế rồi xét hiệu: $(a+c)-(b+c)=a-b>0$, nên $a+c>b+c$. Thêm cùng một quả cân vào hai đĩa thì cân vẫn nghiêng như cũ.`,
            R`Nhân với $c>0$: hiệu mới là $ac-bc=c(a-b)$, tích của hai số dương nên dương, vậy $ac>bc$. Nhân với $c<0$: tích của một số âm và một số dương là số âm, nên $ac-bc<0$, tức $ac<bc$: chiều bị đổi.`,
            R`Bắc cầu: viết $a-c=(a-b)+(b-c)$. Đây là tổng của hai số dương nên dương, vậy $a>c$.`,
          ],
        },
        {
          kind: "tinh-chat", title: "Cộng và nhân hai bất đẳng thức",
          text: R`Hai bất đẳng thức cùng chiều cộng được với nhau: $a>b$ và $c>d$ cho $a+c>b+d$. Nhân được khi mọi vế đều dương: $a>b>0$ và $c>d>0$ cho $ac>bd$. Không được trừ hoặc chia hai bất đẳng thức cho nhau.`,
          suy: [
            R`Cộng: xét hiệu $(a+c)-(b+d)=(a-b)+(c-d)$. Cả hai ngoặc đều dương nên tổng dương, vậy $a+c>b+d$.`,
            R`Nhân: thêm bớt $bc$ để tách hiệu: $ac-bd=(ac-bc)+(bc-bd)=c(a-b)+b(c-d)$. Vì $c>0$, $b>0$ và hai ngoặc dương, cả hai số hạng đều dương, vậy $ac>bd$.`,
            R`Trừ thì không được, một ví dụ là đủ: $5>4$ và $3>1$ đều đúng, nhưng trừ vế theo vế được $5-3=2$ và $4-1=3$, mà $2<3$.`,
          ],
        },
        {
          kind: "tinh-chat", title: "Lũy thừa và căn",
          text: R`Với $a>b>0$ và $n$ nguyên dương thì $a^n>b^n$ và $\sqrt{a}>\sqrt{b}$. Điều kiện dương là bắt buộc: $-3<-2$ nhưng $(-3)^2=9>4=(-2)^2$.`,
          suy: [
            R`Nhân bất đẳng thức $a>b$ với chính nó, được phép vì mọi vế đều dương: $a\cdot a>b\cdot b$, tức $a^2>b^2$. Nhân tiếp với $a>b$ được $a^3>b^3$, và cứ thế tới $a^n>b^n$.`,
            R`Với căn, lập luận ngược: giả sử $\sqrt{a}\le\sqrt{b}$. Hai số này không âm nên bình phương lên vẫn giữ chiều, được $a\le b$, trái với $a>b$. Vậy điều giả sử sai, tức $\sqrt{a}>\sqrt{b}$.`,
            R`Điều kiện dương cần vì bước nhân hai bất đẳng thức chỉ đúng khi mọi vế dương; với số âm, bình phương xóa mất dấu trừ nên thứ tự có thể đảo.`,
          ],
        },
        { kind: "luu-y", title: "Nghịch đảo", text: R`Nếu $a>b>0$ thì $\frac{1}{a}<\frac{1}{b}$, nghịch đảo đổi chiều khi hai số cùng dấu dương. Nếu hai số khác dấu thì chiều được giữ nguyên: $2>-1$ và $\frac{1}{2}>\frac{1}{-1}$.` },
        { kind: "vi-du", text: R`Từ $3>2$, nhân hai vế với $-1$ được $-3<-2$ (chiều đổi). Bình phương hai vế của $-3<-2$ cho $9>4$ (chiều ngược lại), vì hai số âm không được bình phương tùy ý.` },
      ],
    },
    {
      title: "Bình phương không âm và giá trị tuyệt đối",
      items: [
        {
          kind: "dinh-ly", title: "Bình phương không âm",
          text: R`Với mọi số thực $a$ có $a^2\ge 0$, dấu bằng xảy ra khi và chỉ khi $a=0$. Từ $(a-b)^2\ge 0$ suy ra $a^2+b^2\ge 2ab$, dấu bằng khi $a=b$.`,
          suy: [
            R`Xét ba khả năng của $a$. Nếu $a>0$ thì $a\cdot a$ là dương nhân dương, ra dương. Nếu $a<0$ thì $a\cdot a$ là âm nhân âm, cũng ra dương. Nếu $a=0$ thì $a^2=0$. Vậy $a^2\ge 0$, và bằng $0$ chỉ khi $a=0$.`,
            R`Áp dụng cho số $a-b$: $(a-b)^2\ge 0$. Khai triển vế trái được $a^2-2ab+b^2\ge 0$.`,
            R`Cộng $2ab$ vào hai vế được $a^2+b^2\ge 2ab$. Dấu bằng xảy ra khi $(a-b)^2=0$, tức $a=b$.`,
          ],
          suyKhac: [
            {
              cach: "Bằng diện tích",
              buoc: [
                R`Với $a,b>0$, xếp bốn hình chữ nhật $a\times b$ thành một khung vuông có cạnh ngoài $a+b$. Phần trống ở giữa là một hình vuông cạnh $|a-b|$. Hình «Hai hình vuông luôn phủ được hai hình chữ nhật» ở phần Suy từ số 0 cũng chia hình vuông lớn cạnh $a+b$ theo cách gần với ý này.`,
                R`Diện tích toàn khung là tổng diện tích bốn hình chữ nhật và phần trống: $(a+b)^2=4ab+(a-b)^2$. Diện tích hình vuông ở giữa không âm nên $(a+b)^2\ge 4ab$, tức $a^2+b^2+2ab\ge 4ab$.`,
                R`Trừ $2ab$ hai vế được $a^2+b^2\ge 2ab$, dấu bằng khi phần trống không còn, tức $a=b$. Nếu $a=0$ hoặc $b=0$ thì $a^2+b^2\ge 0=2ab$. Với số thực bất kì, dùng $a^2+b^2=|a|^2+|b|^2\ge 2|a|\,|b|\ge 2ab$.`,
              ],
            },
          ],
        },
        {
          kind: "cong-thuc", title: "Bình phương ba số",
          text: R`Với mọi $a,b,c$ có $a^2+b^2+c^2\ge ab+bc+ca$, dấu bằng khi $a=b=c$. Chứng minh bằng cách viết hiệu hai vế là $\frac{1}{2}\left[(a-b)^2+(b-c)^2+(c-a)^2\right]\ge 0$.`,
          suy: [
            R`Dùng $x^2+y^2\ge 2xy$ cho ba cặp: $a^2+b^2\ge 2ab$, $b^2+c^2\ge 2bc$ và $c^2+a^2\ge 2ca$.`,
            R`Cộng ba bất đẳng thức cùng chiều: $2(a^2+b^2+c^2)\ge 2(ab+bc+ca)$. Chia hai vế cho số dương $2$ được điều cần chứng minh.`,
            R`Dấu bằng cần cả ba bất đẳng thức nhỏ cùng xảy ra dấu bằng, tức $a=b$, $b=c$ và $c=a$.`,
          ],
        },
        {
          kind: "dinh-ly", title: "Bất đẳng thức tam giác",
          text: R`Với mọi số thực $a,b$ có $|a+b|\le |a|+|b|$ và $\big||a|-|b|\big|\le |a-b|$. Dấu bằng của bất đẳng thức đầu xảy ra khi $ab\ge 0$.`,
          suy: [
            R`Hai nhận xét: $|x|^2=x^2$ vì bình phương xóa dấu, và $ab\le|a|\,|b|$ vì vế phải là độ lớn của $ab$, mà mọi số đều không vượt quá độ lớn của nó.`,
            R`So sánh hai bình phương: $(|a|+|b|)^2-(a+b)^2=2|a|\,|b|-2ab\ge 0$. Vậy $(a+b)^2\le(|a|+|b|)^2$.`,
            R`Lấy căn hai vế (cả hai căn đều không âm) được $|a+b|\le|a|+|b|$. Dấu bằng khi $ab=|a|\,|b|$, tức $ab\ge 0$: hai số cùng dấu hoặc có một số bằng $0$.`,
            R`Phần sau: viết $a=(a-b)+b$ rồi dùng phần đầu, $|a|\le|a-b|+|b|$, nên $|a|-|b|\le|a-b|$. Đổi vai $a$ và $b$ được $|b|-|a|\le|a-b|$. Hai điều này gộp lại là $\big||a|-|b|\big|\le|a-b|$.`,
          ],
          suyKhac: [
            {
              cach: "Bằng cách kẹp giữa hai số đối nhau",
              buoc: [
                R`Mọi số thực $x$ đều thỏa $-|x|\le x\le|x|$, vì $x$ bằng $|x|$ hoặc bằng $-|x|$. Áp dụng cho $a$ và $b$: $-|a|\le a\le|a|$ và $-|b|\le b\le|b|$.`,
                R`Cộng vế theo vế: $-(|a|+|b|)\le a+b\le|a|+|b|$. Một số nằm giữa $-M$ và $M$ (với $M=|a|+|b|\ge 0$) thì có độ lớn không vượt $M$.`,
                R`Vậy $|a+b|\le|a|+|b|$ (xem hình «Đi thẳng không bao giờ dài hơn đi vòng»). Dấu bằng khi $a+b=|a|+|b|$ hoặc $a+b=-(|a|+|b|)$. Trường hợp đầu cùng với $a\le|a|$, $b\le|b|$ buộc $a=|a|$ và $b=|b|$, tức $a,b\ge 0$; trường hợp sau cho $a,b\le 0$. Vậy hai số cùng dấu hoặc có một số bằng $0$.`,
                R`Phần sau của định lí: viết $a=(a-b)+b$ rồi áp dụng bất đẳng thức vừa chứng minh, $|a|\le|a-b|+|b|$, nên $|a|-|b|\le|a-b|$. Đổi vai $a$ và $b$ được $|b|-|a|\le|a-b|$, gộp lại là $\big||a|-|b|\big|\le|a-b|$.`,
              ],
            },
          ],
        },
        {
          kind: "tinh-chat", title: "Giá trị tuyệt đối với một hằng",
          text: R`Với $r>0$: $|x|\le r$ khi và chỉ khi $-r\le x\le r$, còn $|x|\ge r$ khi và chỉ khi $x\le -r$ hoặc $x\ge r$. Hai tính chất này biến bất phương trình chứa dấu giá trị tuyệt đối thành bất phương trình thường.`,
          suy: [
            R`Số $|x|$ là khoảng cách từ điểm $x$ đến điểm $0$ trên trục số. Điều kiện $|x|\le r$ nói rằng $x$ cách $0$ không quá $r$, tức $x$ nằm trong đoạn từ $-r$ đến $r$.`,
            R`Điều kiện $|x|\ge r$ nói rằng $x$ cách $0$ ít nhất $r$, tức $x$ nằm bên trái $-r$ hoặc bên phải $r$, kể cả hai điểm đó.`,
          ],
        },
        { kind: "cach-lam", title: "Chứng minh bằng xét hiệu", text: R`Để chứng minh $A\ge B$, xét $A-B$ rồi biến đổi thành tổng các bình phương hoặc tích các thừa số có dấu rõ ràng. Đừng chuyển vế rồi nhân chéo khi chưa biết dấu của mẫu số.` },
        { kind: "vi-du", text: R`Với $a=3$ và $b=5$: $a^2+b^2=34$ và $2ab=30$, đúng $34\ge 30$, và hiệu $4=(3-5)^2$. Dấu bằng xảy ra khi $a=b$, chẳng hạn $a=b=4$ cho $32=32$.` },
      ],
    },
    {
      title: "Bất đẳng thức Cauchy giữa trung bình cộng và trung bình nhân",
      items: [
        {
          kind: "dinh-ly", title: "Hai số không âm",
          text: R`Với $a,b\ge 0$ có $\frac{a+b}{2}\ge\sqrt{ab}$, dấu bằng xảy ra khi và chỉ khi $a=b$. Với $n$ số không âm thì trung bình cộng không nhỏ hơn trung bình nhân, dấu bằng khi tất cả các số bằng nhau.`,
          suy: [
            R`Vì $a,b\ge 0$ nên có căn bậc hai. Đặt $x=\sqrt{a}$ và $y=\sqrt{b}$, khi đó $a=x^2$, $b=y^2$ và $\sqrt{ab}=xy$.`,
            R`Bình phương không âm: $(x-y)^2\ge 0$, khai triển được $x^2+y^2\ge 2xy$. Viết lại theo $a,b$: $a+b\ge 2\sqrt{ab}$. Chia hai vế cho $2$ là xong.`,
            R`Dấu bằng khi $x=y$, tức $\sqrt{a}=\sqrt{b}$, tức $a=b$.`,
            R`Với nhiều số hơn, cách chứng minh là đi từ $2$ số lên $4$ số rồi lùi về $3$ số; các bước đó nằm ở mục «Các dạng hay dùng» ngay dưới.`,
          ],
          suyKhac: [
            {
              cach: "Bằng nửa đường tròn",
              buoc: [
                R`Nếu $a=0$ hoặc $b=0$ thì $\sqrt{ab}=0\le\frac{a+b}{2}$. Với $a,b>0$, vẽ đoạn $AB$ dài $a+b$ gồm $AH=a$ và $HB=b$. Nửa đường tròn đường kính $AB$ có tâm $O$ và bán kính $\frac{a+b}{2}$. Dựng đường vuông góc với $AB$ tại $H$ cắt nửa đường tròn tại $C$ (xem hình «Điểm nối trượt»).`,
                R`Góc nội tiếp chắn nửa đường tròn là góc vuông, nên tam giác $ACB$ vuông tại $C$ và $CH$ là đường cao ứng với cạnh huyền. Do đó $CH^2=AH\cdot HB=ab$, tức $CH=\sqrt{ab}$.`,
                R`Với $OC^2=OH^2+CH^2$ (Pythagore trong tam giác $OHC$ vuông tại $H$, hoặc $CH=OC$ khi $H$ trùng $O$) ta có $CH\le OC$, mà $OC$ là bán kính. Vậy $\sqrt{ab}\le\frac{a+b}{2}$, dấu bằng khi $OH=0$, tức $a=b$.`,
              ],
            },
          ],
        },
        { kind: "cach-lam", title: "Vì sao đúng", text: R`Xét hiệu: $a+b-2\sqrt{ab}=(\sqrt{a}-\sqrt{b})^2\ge 0$. Bình phương nên không âm, và bằng $0$ đúng khi $\sqrt{a}=\sqrt{b}$.` },
        {
          kind: "cong-thuc", title: "Các dạng hay dùng",
          text: R`Với $a>0$: $a+\frac{1}{a}\ge 2$. Với $a,b>0$: $\frac{a}{b}+\frac{b}{a}\ge 2$ và $(a+b)^2\ge 4ab$. Với ba số không âm: $a+b+c\ge 3\sqrt[3]{abc}$.`,
          suy: [
            R`Áp dụng cho hai số $a$ và $\frac{1}{a}$, có tích bằng $1$: $a+\frac{1}{a}\ge 2\sqrt{1}=2$. Hai số $\frac{a}{b}$ và $\frac{b}{a}$ cũng có tích bằng $1$ nên tổng của chúng không nhỏ hơn $2$.`,
            R`Dạng $(a+b)^2\ge 4ab$ là vì $(a+b)^2-4ab=a^2-2ab+b^2=(a-b)^2\ge 0$.`,
            R`Bốn số: dùng trường hợp hai số ba lần, $a+b+c+d\ge 2\sqrt{ab}+2\sqrt{cd}\ge 2\cdot 2\sqrt{\sqrt{ab}\cdot\sqrt{cd}}=4\sqrt[4]{abcd}$.`,
            R`Ba số: đặt $m=\frac{a+b+c}{3}$ và dùng bốn số $a,b,c,m$. Tổng của chúng là $3m+m=4m$, nên $4m\ge 4\sqrt[4]{abcm}$, tức $m^4\ge abc\cdot m$. Khi $m>0$, chia cho $m$ được $m^3\ge abc$, tức $\frac{a+b+c}{3}\ge\sqrt[3]{abc}$. Khi $m=0$ thì cả ba số bằng $0$ và hai vế cùng bằng $0$.`,
          ],
        },
        {
          kind: "tinh-chat", title: "Tổng và tích",
          text: R`Nếu tích $ab$ không đổi thì tổng $a+b$ nhỏ nhất khi $a=b$. Nếu tổng $a+b$ không đổi thì tích $ab$ lớn nhất khi $a=b$. Đây là hai dạng cực trị quen thuộc nhất.`,
          suy: [
            R`Xét hai số không âm. Nếu tích $ab=P$ không đổi thì $a+b\ge 2\sqrt{ab}=2\sqrt{P}$. Vế phải là một số cố định, và tổng chạm đúng số đó khi $a=b$. Vậy tổng nhỏ nhất là $2\sqrt{P}$, đạt khi $a=b=\sqrt{P}$.`,
            R`Nếu tổng $a+b=S$ không đổi thì từ $\sqrt{ab}\le\frac{a+b}{2}$ suy ra $ab\le\frac{S^2}{4}$. Vế phải cố định, và tích chạm đúng số đó khi $a=b=\frac{S}{2}$. Vậy tích lớn nhất là $\frac{S^2}{4}$.`,
            R`Hình ảnh: trong các hình chữ nhật cùng chu vi, hình vuông có diện tích lớn nhất.`,
          ],
        },
        { kind: "luu-y", title: "Ba điều kiện", text: R`Dùng Cauchy phải kiểm đủ ba điều kiện: các số đều không âm; vế còn lại là hằng số; dấu bằng xảy ra được tại một giá trị cụ thể của biến. Thiếu điều kiện cuối thì chỉ có một cận, chưa phải giá trị nhỏ nhất.` },
        { kind: "cach-lam", title: "Điểm rơi", text: R`Dự đoán lúc dấu bằng xảy ra rồi tách hạng tử để các số được áp dụng bằng nhau tại đó. Với $x+\frac{4}{x}$ ($x>0$), hai hạng tử bằng nhau khi $x=\frac{4}{x}$, tức $x=2$, nên giá trị nhỏ nhất là $2+2=4$.` },
        { kind: "luu-y", text: R`Bất đẳng thức $a+\frac{1}{a}\ge 2$ chỉ đúng khi $a>0$. Với $a<0$ thì ngược lại: $a+\frac{1}{a}\le -2$, vì áp dụng cho $-a>0$.` },
        { kind: "vi-du", text: R`Với $x>0$: $x+\frac{9}{x}\ge 2\sqrt{9}=6$, dấu bằng khi $x=3$. Với $x>1$: $x+\frac{1}{x-1}=(x-1)+\frac{1}{x-1}+1\ge 3$, dấu bằng khi $x-1=1$, tức $x=2$.` },
      ],
    },
    {
      title: "Bất đẳng thức Cauchy–Schwarz",
      items: [
        {
          kind: "dinh-ly", title: "Dạng hai cặp số",
          text: R`Với mọi số thực $a,b,x,y$ có $(ax+by)^2\le (a^2+b^2)(x^2+y^2)$. Dấu bằng xảy ra khi $ay=bx$, nghĩa là hai cặp số tỉ lệ với nhau.`,
          suy: [
            R`Khai triển vế phải: $(a^2+b^2)(x^2+y^2)=a^2x^2+a^2y^2+b^2x^2+b^2y^2$. Khai triển vế trái: $(ax+by)^2=a^2x^2+2abxy+b^2y^2$.`,
            R`Lấy vế phải trừ vế trái, hai số hạng $a^2x^2$ và $b^2y^2$ triệt tiêu, còn lại $a^2y^2-2abxy+b^2x^2=(ay-bx)^2$.`,
            R`Một bình phương thì không âm, nên vế phải không nhỏ hơn vế trái. Dấu bằng khi $ay-bx=0$, tức $ay=bx$.`,
          ],
          suyKhac: [
            {
              cach: "Bằng tam thức bậc hai",
              buoc: [
                R`Xét $g(t)=(at-x)^2+(bt-y)^2$. Đây là tổng hai bình phương nên $g(t)\ge 0$ với mọi số thực $t$ (xem hình «Tam thức không bao giờ âm»).`,
                R`Khai triển: $g(t)=(a^2+b^2)t^2-2(ax+by)t+(x^2+y^2)$. Nếu $a=b=0$ thì bất đẳng thức cần chứng minh là $0\le 0$, đúng ngay. Nếu không, đây là tam thức bậc hai có hệ số cao nhất $a^2+b^2>0$.`,
                R`Một tam thức bậc hai luôn không âm thì không có hai nghiệm phân biệt, nên biệt thức thu gọn không dương: $(ax+by)^2-(a^2+b^2)(x^2+y^2)\le 0$. Chuyển vế được $(ax+by)^2\le(a^2+b^2)(x^2+y^2)$.`,
                R`Dấu bằng khi $g$ có nghiệm: có $t$ để $at=x$ và $bt=y$, tức $(x;y)$ tỉ lệ với $(a;b)$, hay $ay=bx$.`,
              ],
            },
          ],
        },
        { kind: "cach-lam", title: "Vì sao đúng", text: R`Hiệu hai vế là $(a^2+b^2)(x^2+y^2)-(ax+by)^2=(ay-bx)^2$. Đẳng thức này kiểm được bằng khai triển, và vế phải là bình phương nên không âm.` },
        {
          kind: "cong-thuc", title: "Dạng cộng mẫu",
          text: R`Với $x,y>0$ có $\frac{a^2}{x}+\frac{b^2}{y}\ge\frac{(a+b)^2}{x+y}$, dấu bằng khi $\frac{a}{x}=\frac{b}{y}$. Dạng này gọn khi cần đánh giá tổng các phân số có tử là bình phương.`,
          suy: [
            R`Dùng dạng hai cặp số cho cặp $\left(\frac{a}{\sqrt{x}};\frac{b}{\sqrt{y}}\right)$ và cặp $(\sqrt{x};\sqrt{y})$. Tổng các tích tương ứng là $\frac{a}{\sqrt{x}}\cdot\sqrt{x}+\frac{b}{\sqrt{y}}\cdot\sqrt{y}=a+b$.`,
            R`Bất đẳng thức cho $(a+b)^2\le\left(\frac{a^2}{x}+\frac{b^2}{y}\right)(x+y)$. Chia hai vế cho số dương $x+y$ được điều cần chứng minh.`,
            R`Dấu bằng khi hai cặp tỉ lệ: $\frac{a}{\sqrt{x}}\cdot\sqrt{y}=\frac{b}{\sqrt{y}}\cdot\sqrt{x}$. Nhân hai vế với $\sqrt{x}\sqrt{y}$ được $ay=bx$, tức $\frac{a}{x}=\frac{b}{y}$.`,
          ],
        },
        { kind: "cach-lam", title: "Giá trị lớn nhất của một biểu thức bậc nhất", text: R`Biết $x^2+y^2=r^2$, áp dụng bất đẳng thức được $|ax+by|\le r\sqrt{a^2+b^2}$. Giá trị lớn nhất $r\sqrt{a^2+b^2}$ đạt khi $(x;y)$ cùng hướng với $(a;b)$.` },
        { kind: "luu-y", text: R`Dấu bằng cần điều kiện tỉ lệ, phải kiểm điều kiện đó có thỏa ràng buộc của đề không. Nếu không thỏa thì cận tìm được không phải giá trị lớn nhất.` },
        { kind: "vi-du", text: R`Biết $x^2+y^2=1$ thì $(3x+4y)^2\le (9+16)(x^2+y^2)=25$ nên $3x+4y\le 5$. Dấu bằng khi $(x;y)=\left(\frac{3}{5};\frac{4}{5}\right)$, và khi đó $3x+4y=\frac{9}{5}+\frac{16}{5}=5$.` },
      ],
    },
    {
      title: "Tìm giá trị lớn nhất và nhỏ nhất",
      items: [
        {
          kind: "dinh-nghia", title: "Giá trị lớn nhất",
          text: R`Số $M$ là giá trị lớn nhất của $f$ trên miền $D$ nếu $f(x)\le M$ với mọi $x\in D$ và tồn tại $x_0\in D$ để $f(x_0)=M$. Cả hai vế đều cần: có cận trên chưa đủ, phải chỉ ra được điểm đạt cận đó.`,
          de: R`Giá trị lớn nhất giống kỷ lục của một giải chạy: phải có hai điều. Một là không ai chạy nhanh hơn thành tích đó. Hai là có người thật sự đã chạy được thành tích đó. Chỉ nói «không ai dưới $9$ giây» mà chưa ai chạy đúng $9$ giây thì $9$ giây chưa phải kỷ lục.`,
        },
        { kind: "cach-lam", title: "Hai bước của một bài cực trị", text: R`Bước một: chứng minh $f(x)\ge m$ bằng một bất đẳng thức đã biết. Bước hai: chỉ ra giá trị của biến để dấu bằng xảy ra và nêu rõ giá trị đó. Thiếu bước hai thì lời giải chưa kết luận được.` },
        { kind: "cach-lam", title: "Đưa về một biến", text: R`Dùng điều kiện ràng buộc để thay một biến theo biến kia rồi dùng hàm bậc hai hoặc Cauchy. Chẳng hạn $x+y=10$ cho $xy=x(10-x)=25-(x-5)^2\le 25$.` },
        { kind: "luu-y", title: "Miền của biến", text: R`Nếu biến chỉ chạy trên một đoạn thì cực trị có thể nằm ở đầu mút, nơi bất đẳng thức Cauchy không thấy được. Khi đó nên so sánh giá trị tại đầu mút với giá trị tại điểm dấu bằng.` },
        { kind: "vi-du", text: R`Với $x,y>0$ và $x+y=10$, tích $xy\le \left(\frac{x+y}{2}\right)^2=25$, dấu bằng khi $x=y=5$. Cũng với ràng buộc này, $x^2+y^2\ge\frac{(x+y)^2}{2}=50$, nhỏ nhất khi $x=y=5$.` },
        { kind: "vi-du", text: R`Chi phí trung bình cho mỗi sản phẩm là $C(x)=x+\frac{100}{x}$ nghìn đồng khi sản xuất $x$ sản phẩm một ngày. Theo Cauchy, $C(x)\ge 2\sqrt{100}=20$, đạt tại $x=10$ sản phẩm.` },
      ],
    },
    {
      title: "Các loại trung bình và chuỗi bất đẳng thức",
      items: [
        {
          kind: "dinh-ly", title: "Chuỗi bốn trung bình",
          text: R`Với $a,b>0$: $\frac{2ab}{a+b}\le\sqrt{ab}\le\frac{a+b}{2}\le\sqrt{\frac{a^2+b^2}{2}}$, dấu bằng khi $a=b$. Từ trái sang phải là trung bình điều hòa, nhân, cộng, bình phương.`,
          suy: [
            R`Mắt xích giữa $\sqrt{ab}\le\frac{a+b}{2}$ chính là bất đẳng thức Cauchy cho hai số.`,
            R`Mắt xích trái: từ $a+b\ge 2\sqrt{ab}$, nhân hai vế với số dương $\frac{\sqrt{ab}}{a+b}$ được $\sqrt{ab}\ge\frac{2ab}{a+b}$.`,
            R`Mắt xích phải: xét hiệu hai bình phương, $\frac{a^2+b^2}{2}-\left(\frac{a+b}{2}\right)^2=\frac{2a^2+2b^2-a^2-2ab-b^2}{4}=\frac{(a-b)^2}{4}\ge 0$. Hai số không âm mà bình phương lớn hơn thì số đó lớn hơn, nên $\frac{a+b}{2}\le\sqrt{\frac{a^2+b^2}{2}}$.`,
            R`Ở cả ba mắt xích, dấu bằng đều xảy ra khi $(a-b)^2=0$ hoặc $\sqrt{a}=\sqrt{b}$, tức $a=b$.`,
          ],
          suyKhac: [
            {
              cach: "Bằng đặt trung bình cộng và nửa hiệu",
              buoc: [
                R`Đặt $m=\frac{a+b}{2}>0$ và $d=\frac{a-b}{2}$, nên $a=m+d$ và $b=m-d$. Khai triển cho $ab=m^2-d^2$ và $\frac{a^2+b^2}{2}=m^2+d^2$ (xem hình «Bốn loại trung bình dồn về một»).`,
                R`Vì $d^2\ge 0$ nên $ab\le m^2$, suy ra $\sqrt{ab}\le m$. Cũng vì $d^2\ge 0$ nên $\frac{a^2+b^2}{2}\ge m^2$, suy ra $m\le\sqrt{\frac{a^2+b^2}{2}}$.`,
                R`Trung bình điều hòa là $\frac{2ab}{a+b}=\frac{ab}{m}$. Chia hai vế của $\sqrt{ab}\le m$ cho số dương $m$ rồi nhân với $\sqrt{ab}$ được $\frac{ab}{m}\le\sqrt{ab}$, vậy cả chuỗi đã đủ. Cả ba dấu bằng cùng xảy ra khi $d=0$, tức $a=b$.`,
              ],
            },
          ],
        },
        { kind: "vi-du", text: R`Với $a=4$ và $b=9$: điều hòa $\frac{72}{13}\approx 5{,}54$, nhân $6$, cộng $6{,}5$, bình phương $\sqrt{\frac{97}{2}}\approx 6{,}96$. Các giá trị tăng dần đúng như chuỗi trên.` },
        {
          kind: "cong-thuc", title: "Tích tổng nghịch đảo",
          text: R`Với $a,b>0$ có $(a+b)\left(\frac{1}{a}+\frac{1}{b}\right)\ge 4$, dấu bằng khi $a=b$. Với $a=1$ và $b=2$ vế trái bằng $3\cdot\frac{3}{2}=\frac{9}{2}\ge 4$.`,
          suy: [
            R`Nhân phá ngoặc: $(a+b)\left(\frac{1}{a}+\frac{1}{b}\right)=1+\frac{a}{b}+\frac{b}{a}+1=2+\frac{a}{b}+\frac{b}{a}$.`,
            R`Theo mục «Các dạng hay dùng», $\frac{a}{b}+\frac{b}{a}\ge 2$, nên cả biểu thức không nhỏ hơn $4$. Dấu bằng khi $\frac{a}{b}=\frac{b}{a}$, tức $a=b$.`,
          ],
        },
        { kind: "luu-y", title: "Chuỗi dấu bằng", text: R`Khi dùng hai bất đẳng thức liên tiếp để đánh giá, dấu bằng của cả hai phải xảy ra tại cùng một giá trị của biến. Nếu hai dấu bằng xảy ra ở hai nơi khác nhau, cận tìm được không đạt tới.` },
        { kind: "luu-y", text: R`Nhầm hay gặp: coi $\sqrt{a+b}=\sqrt{a}+\sqrt{b}$. Thật ra $\sqrt{a+b}\le\sqrt{a}+\sqrt{b}$ với $a,b\ge 0$, dấu bằng khi một trong hai số bằng $0$.` },
      ],
    },
  ],
  canNho: [
    R`Chứng minh $A\ge B$ bằng cách xét $A-B$ và đưa về tổng bình phương hoặc tích có dấu rõ ràng.`,
    R`Nhân hai vế với số âm thì đổi chiều; bình phương hai vế chỉ giữ chiều khi hai vế không âm.`,
    R`Cauchy: $\frac{a+b}{2}\ge\sqrt{ab}$ với $a,b\ge 0$, dấu bằng khi $a=b$.`,
    R`Tích không đổi thì tổng nhỏ nhất khi hai số bằng nhau; tổng không đổi thì tích lớn nhất khi hai số bằng nhau.`,
    R`Bất đẳng thức $a+\frac{1}{a}\ge 2$ chỉ đúng khi $a>0$; khi $a<0$ thì $a+\frac{1}{a}\le -2$.`,
    R`Cauchy–Schwarz: $(ax+by)^2\le (a^2+b^2)(x^2+y^2)$, dấu bằng khi $ay=bx$.`,
    R`Bài cực trị phải có hai bước: chứng minh cận, rồi chỉ ra dấu bằng xảy ra.`,
    R`Dùng nhiều bất đẳng thức liên tiếp thì mọi dấu bằng phải xảy ra cùng một lúc.`,
  ],
  lienQuan: [
    { id: "quadratic", vi: R`Hoàn thiện bình phương cho giá trị nhỏ nhất của tam thức, và là gốc của mọi chứng minh bằng $(a-b)^2\ge 0$.` },
    { id: "derivative", vi: R`Khi bất đẳng thức không áp dụng được, đạo hàm cho cách tìm cực trị của hàm một biến theo bảng biến thiên.` },
    { id: "sequence", vi: R`Trung bình cộng và trung bình nhân chính là số hạng giữa của cấp số cộng và cấp số nhân.` },
  ],
  checks: [
    { expr: "expand((a+b)**2) - 4*a*b - (a-b)**2", expect: "0" },
    { expr: "expand((a*x+b*y)**2 - (a**2+b**2)*(x**2+y**2) + (a*y-b*x)**2)", expect: "0" },
    { expr: "expand((m+d)*(m-d)) - (m**2 - d**2)", expect: "0" },
    { expr: "expand(((m+d)**2+(m-d)**2)/2) - (m**2 + d**2)", expect: "0" },
    { expr: "expand((a*t-x)**2+(b*t-y)**2) - ((a**2+b**2)*t**2 - 2*(a*x+b*y)*t + (x**2+y**2))", expect: "0" },
    { expr: "3**2+5**2-2*3*5", expect: "4" },
    { expr: "(-3)**2", expect: "9" },
    { expr: "(-2)**2", expect: "4" },
    { expr: "simplify((a**2+b**2+c**2-a*b-b*c-c*a)-((a-b)**2+(b-c)**2+(c-a)**2)/2)", expect: "0" },
    { expr: "simplify((a**2+b**2)*(x**2+y**2)-(a*x+b*y)**2-(a*y-b*x)**2)", expect: "0" },
    { expr: "(sqrt(4)-sqrt(9))**2", expect: "1" },
    { expr: "4+9-2*sqrt(4*9)", expect: "1" },
    { expr: "diff(x+9/x, x).subs(x,3)", expect: "0" },
    { expr: "3+9/3", expect: "6" },
    { expr: "diff(x+4/x, x).subs(x,2)", expect: "0" },
    { expr: "2+4/2", expect: "4" },
    { expr: "(2-1)+1/(2-1)+1", expect: "3" },
    { expr: "diff(x+1/(x-1), x).subs(x,2)", expect: "0" },
    { expr: "(9+16)*(Rational(9,25)+Rational(16,25))", expect: "25" },
    { expr: "3*Rational(3,5)+4*Rational(4,5)", expect: "5" },
    { expr: "Rational(3,5)**2+Rational(4,5)**2", expect: "1" },
    { expr: "5*(10-5)", expect: "25" },
    { expr: "diff(x*(10-x), x).subs(x,5)", expect: "0" },
    { expr: "5**2+5**2", expect: "50" },
    { expr: "diff(x+100/x, x).subs(x,10)", expect: "0" },
    { expr: "10+100/10", expect: "20" },
    { expr: "Rational(2*4*9,4+9)", expect: "Rational(72,13)" },
    { expr: "sqrt(4*9)", expect: "6" },
    { expr: "Rational(4+9,2)", expect: "Rational(13,2)" },
    { expr: "sqrt(Rational(4**2+9**2,2))", expect: "sqrt(Rational(97,2))" },
    { expr: "(1+2)*(1+Rational(1,2))", expect: "Rational(9,2)" },
    { expr: "simplify(x*(10-x)-(25-(x-5)**2))", expect: "0" },
    { expr: "floor(1000*Rational(72,13))", expect: "5538" },
    { expr: "floor(1000*sqrt(Rational(97,2)))", expect: "6964" },
  ],
};
