import type { TopicKnowledge } from "./types.ts";

const R = String.raw;

export const quadraticKnowledge: TopicKnowledge = {
  id: "quadratic",
  tongQuat: {
    la: R`Hàm số bậc hai là hàm có dạng $y=ax^2+bx+c$ với $a\neq 0$. Đồ thị của nó là một parabol: đường cong đối xứng qua một đường thẳng đứng, có đúng một điểm cao nhất hoặc thấp nhất gọi là đỉnh.`,
    dungDe: R`Mô tả mọi đại lượng tăng rồi giảm hoặc giảm rồi tăng: quỹ đạo của vật ném, diện tích lớn nhất khi chu vi cố định, lợi nhuận theo giá bán. Trong bài thi, chuyên đề cho ba loại bài: tìm nghiệm và xét dấu, tìm giá trị lớn nhất hoặc nhỏ nhất, và bài có tham số.`,
    lienHe: R`Phương trình bậc hai là trường hợp $y=0$ của hàm này, bất phương trình bậc hai là bài xét dấu của hàm. Ở lớp 12, đạo hàm cho một cách tìm đỉnh khác là giải $y'=0$. Bất đẳng thức dùng chính phép biến đổi thành bình phương ở đây.`,
  },
  tuDau: [
    R`Ném một quả bóng lên trời: nó bay lên chậm dần, dừng một thoáng ở điểm cao nhất rồi rơi xuống. Ghi lại độ cao sau mỗi giây rồi chấm lên giấy, các chấm xếp thành một đường cong hình vòm. Đường cong đó tên là parabol, và công thức sinh ra nó là hàm số bậc hai.`,
    R`Hàm số là một cái máy: bỏ vào một số $x$, máy trả ra đúng một số $y$. Máy bậc hai làm ba việc: lấy $x$ nhân với chính nó rồi nhân với $a$, cộng thêm $b$ lần $x$, rồi cộng $c$. Chẳng hạn máy $y=x^2-4x+3$ nhận số $5$ thì trả ra $25-20+3=8$.`,
    R`Đồ thị là bức ảnh của cái máy. Mỗi cặp số (bỏ vào; trả ra) là một chấm: số bỏ vào cho vị trí ngang, số trả ra cho độ cao. Nối mọi chấm lại thì được đường cong. Mọi câu hỏi của chuyên đề đều là câu hỏi về bức ảnh này: điểm thấp nhất ở đâu, đường cong chạm mặt đất (trục hoành) ở đâu, đoạn nào nằm phía trên mặt đất.`,
    R`Chỉ cần một ý để suy ra gần như mọi công thức ở đây: một số nhân với chính nó không bao giờ âm, vì âm nhân âm cũng ra dương. Khi viết được hàm thành «một bình phương cộng một hằng số» thì đỉnh, nghiệm và dấu đều đọc ra được. Các phần «Vì sao đúng» bên dưới đi lại đúng con đường đó, từng bước một.`,
  ],
  kyHieu: [
    { kh: R`$x^2$`, doc: R`Đọc là «x bình phương», nghĩa là $x$ nhân với chính nó. Chẳng hạn $3^2=9$ và $(-3)^2=9$.` },
    { kh: R`$a,\ b,\ c$`, doc: R`Ba số cho sẵn, gọi là hệ số. Trong một bài chúng đứng yên, còn $x$ thì thay đổi.` },
    { kh: R`$a\neq 0$`, doc: R`Đọc là «a khác không». Nếu $a=0$ thì mất hạng tử $x^2$ và đường cong duỗi ra thành đường thẳng.` },
    { kh: R`$\Delta$`, doc: R`Chữ Hy Lạp «đen-ta», tên gọi tắt của số $b^2-4ac$. Dấu của số này cho biết parabol chạm trục hoành mấy lần.` },
    { kh: R`$\sqrt{9}$`, doc: R`Căn bậc hai: số không âm mà bình phương lên thì bằng số dưới dấu căn. Ở đây là $3$ vì $3^2=9$.` },
    { kh: R`$\pm$`, doc: R`Đọc là «cộng trừ», viết gọn hai trường hợp: một lần lấy dấu cộng, một lần lấy dấu trừ.` },
    { kh: R`$[3;5]$`, doc: R`Đoạn từ $3$ đến $5$: mọi số $x$ có $3\le x\le 5$, tính cả hai đầu.` },
    { kh: R`$\mathbb{R}$`, doc: R`Tập mọi số thực, tức là mọi điểm trên trục số.` },
  ],
  canBiet: [
    R`Khai triển và hằng đẳng thức $(a\pm b)^2$.`,
    R`Giải phương trình bậc nhất và lấy căn bậc hai.`,
    R`Đọc điểm và đường cong trên hệ trục tọa độ.`,
  ],
  sections: [
    {
      title: "Định nghĩa và hình dạng đồ thị",
      items: [
        {
          kind: "dinh-nghia", title: "Hàm số bậc hai",
          text: R`Hàm số cho bởi $y=ax^2+bx+c$ với $a,b,c$ là các số thực và $a\neq 0$. Tập xác định là $\mathbb{R}$. Nếu $a=0$ thì chỉ còn $y=bx+c$, là hàm bậc nhất có đồ thị là đường thẳng.`,
          de: R`Đây là công thức «bình phương số bỏ vào, nhân với $a$, cộng $b$ lần số đó, rồi cộng $c$». Tập xác định là $\mathbb{R}$ nghĩa là bỏ số nào vào cũng tính được, vì chỉ có phép nhân và phép cộng. Điều kiện $a\neq 0$ giữ cho hạng tử bình phương còn đó, chính nó làm đồ thị cong.`,
        },
        {
          kind: "tinh-chat", title: "Hướng của parabol",
          text: R`Khi $a>0$, parabol mở lên và đỉnh là điểm thấp nhất. Khi $a<0$, parabol mở xuống và đỉnh là điểm cao nhất. Giá trị $|a|$ càng lớn thì parabol càng hẹp.`,
          suy: [
            R`Viết lại hàm bằng cách hoàn thiện bình phương (các bước nằm ở mục «Tọa độ đỉnh»): $y=a\left(x+\frac{b}{2a}\right)^2-\frac{\Delta}{4a}$. Số hạng sau là hằng số, chỉ số hạng đầu thay đổi theo $x$.`,
            R`Bình phương $\left(x+\frac{b}{2a}\right)^2$ không bao giờ âm, bằng $0$ tại $x=-\frac{b}{2a}$ và càng lớn khi $x$ càng xa điểm đó.`,
            R`Nếu $a>0$ thì nhân với $a$ vẫn không âm: $y$ nhỏ nhất tại điểm đó và tăng dần về hai phía, nên parabol mở lên. Nếu $a<0$ thì nhân với $a$ thành không dương: $y$ lớn nhất tại đó và giảm dần về hai phía, nên parabol mở xuống.`,
            R`Khi $|a|$ lớn, cùng một bước đi ngang làm $y$ thay đổi nhiều hơn, nên đường cong dốc hơn và trông hẹp hơn.`,
          ],
        },
        {
          kind: "tinh-chat", title: "Trục đối xứng",
          text: R`Đồ thị đối xứng qua đường thẳng đứng $x=-\frac{b}{2a}$. Hai điểm cùng độ cao nằm cách đều trục này, nên nếu biết một điểm thì suy ra được điểm đối xứng với nó.`,
          suy: [
            R`Đặt $h=-\frac{b}{2a}$. Sau khi hoàn thiện bình phương, hàm có dạng $y=a(x-h)^2+k$ với $k$ là một hằng số.`,
            R`Lấy hai điểm cách $h$ cùng một khoảng $t$ về hai phía: $x=h+t$ và $x=h-t$. Thay vào hàm được $a\,t^2+k$ và $a(-t)^2+k$.`,
            R`Vì $(-t)^2=t^2$ nên hai giá trị bằng nhau. Hai điểm cách đều đường thẳng đứng $x=h$ luôn cùng độ cao, và đó chính là nghĩa của «đối xứng qua đường $x=h$».`,
          ],
        },
        {
          kind: "tinh-chat", title: "Giao với trục tung",
          text: R`Đồ thị cắt trục tung tại điểm $(0;c)$ vì $y(0)=c$. Hệ số $c$ vì vậy cho biết ngay parabol bắt đầu từ đâu.`,
          suy: [
            R`Trục tung là đường thẳng đứng gồm mọi điểm có $x=0$. Điểm của đồ thị nằm trên trục tung vì vậy là điểm ứng với $x=0$.`,
            R`Thay $x=0$ vào hàm: $y=a\cdot 0^2+b\cdot 0+c=c$. Vậy điểm đó là $(0;c)$.`,
          ],
        },
        { kind: "vi-du", text: R`Với $y=x^2-4x+3$ có $a=1>0$ nên parabol mở lên, trục đối xứng là $x=2$ và đồ thị cắt trục tung tại $(0;3)$. Điểm $(1;0)$ và $(3;0)$ đối xứng nhau qua trục $x=2$.` },
      ],
    },
    {
      title: "Đỉnh, giá trị lớn nhất và nhỏ nhất",
      items: [
        {
          kind: "cong-thuc", title: "Tọa độ đỉnh",
          text: R`Đỉnh là $I\left(-\frac{b}{2a};\,-\frac{\Delta}{4a}\right)$ với $\Delta=b^2-4ac$. Hoành độ đỉnh nằm trên trục đối xứng, tung độ là giá trị của hàm tại đó.`,
          suy: [
            R`Mục tiêu là gom mọi chỗ có $x$ vào trong một bình phương. Trước hết rút $a$ ra ngoài: $ax^2+bx+c=a\left(x^2+\frac{b}{a}x\right)+c$.`,
            R`Hằng đẳng thức $(x+m)^2=x^2+2mx+m^2$ cho thấy muốn có $x^2+\frac{b}{a}x$ thì chọn $m=\frac{b}{2a}$, và phải trừ đi phần thừa $m^2=\frac{b^2}{4a^2}$. Vậy $x^2+\frac{b}{a}x=\left(x+\frac{b}{2a}\right)^2-\frac{b^2}{4a^2}$.`,
            R`Thay lại và nhân $a$ vào: $y=a\left(x+\frac{b}{2a}\right)^2-\frac{b^2}{4a}+c=a\left(x+\frac{b}{2a}\right)^2-\frac{b^2-4ac}{4a}$. Đặt $\Delta=b^2-4ac$ cho gọn.`,
            R`Bình phương nhỏ nhất là $0$, đạt khi $x=-\frac{b}{2a}$, và lúc đó $y=-\frac{\Delta}{4a}$. Đây là điểm thấp nhất khi $a>0$ hoặc cao nhất khi $a<0$, tức là đỉnh.`,
          ],
        },
        { kind: "cach-lam", title: "Vì sao có công thức đỉnh", text: R`Hoàn thiện bình phương: $ax^2+bx+c=a\left(x+\frac{b}{2a}\right)^2-\frac{\Delta}{4a}$. Bình phương không âm và bằng $0$ đúng khi $x=-\frac{b}{2a}$, nên giá trị cực trị đạt tại điểm đó và bằng $-\frac{\Delta}{4a}$.` },
        {
          kind: "dinh-nghia", title: "Dạng đỉnh",
          text: R`Hàm $y=a(x-h)^2+k$ có đỉnh $(h;k)$ ngay trên mặt chữ. Dạng này cho thấy ngay phép tịnh tiến: đồ thị $y=ax^2$ dịch sang phải $h$ đơn vị và lên $k$ đơn vị.`,
          de: R`Viết hàm ở dạng này thì không phải tính gì nữa: số bị trừ trong ngoặc là vị trí ngang của đỉnh, số cộng ở ngoài là độ cao của đỉnh. Lý do là bình phương bằng $0$ đúng khi $x=h$, và lúc đó $y=k$.`,
        },
        {
          kind: "dinh-ly", title: "Giá trị lớn nhất và nhỏ nhất trên cả trục số",
          text: R`Nếu $a>0$ thì hàm có giá trị nhỏ nhất $-\frac{\Delta}{4a}$ tại $x=-\frac{b}{2a}$ và không có giá trị lớn nhất. Nếu $a<0$ thì hàm có giá trị lớn nhất $-\frac{\Delta}{4a}$ và không có giá trị nhỏ nhất.`,
          suy: [
            R`Từ $y=a\left(x+\frac{b}{2a}\right)^2-\frac{\Delta}{4a}$ và bình phương luôn không âm: nếu $a>0$ thì $y\ge-\frac{\Delta}{4a}$ với mọi $x$, dấu bằng xảy ra tại $x=-\frac{b}{2a}$. Có cận dưới và có điểm đạt cận đó, nên đó là giá trị nhỏ nhất.`,
            R`Không có giá trị lớn nhất, vì bình phương lớn bao nhiêu cũng được: cho $x$ đi xa dần thì $y$ vượt qua mọi số cho trước.`,
            R`Nếu $a<0$, nhân «bình phương $\ge 0$» với số âm $a$ làm đổi chiều: $y\le-\frac{\Delta}{4a}$. Đó là giá trị lớn nhất, còn $y$ xuống thấp tùy ý nên không có giá trị nhỏ nhất.`,
          ],
        },
        { kind: "cach-lam", title: "Trên một đoạn cho trước", text: R`Tính giá trị hàm tại hai đầu mút, rồi tại đỉnh nếu hoành độ đỉnh nằm trong đoạn. Số lớn nhất trong các giá trị đó là giá trị lớn nhất, số nhỏ nhất là giá trị nhỏ nhất. Đỉnh nằm ngoài đoạn thì hàm đơn điệu trên đoạn và cực trị nằm ở đầu mút.` },
        { kind: "vi-du", text: R`Với $y=-2x^2+8x-3$, hoành độ đỉnh là $-\frac{8}{2\cdot(-2)}=2$ và $y(2)=5$, nên giá trị lớn nhất trên $\mathbb{R}$ là $5$. Trên đoạn $[3;5]$ đỉnh nằm ngoài, ta có $y(3)=3$ và $y(5)=-13$, nên giá trị lớn nhất là $3$.` },
      ],
    },
    {
      title: "Phương trình bậc hai và biệt thức",
      items: [
        {
          kind: "cong-thuc", title: "Công thức nghiệm",
          text: R`Phương trình $ax^2+bx+c=0$ với $\Delta=b^2-4ac\ge 0$ có nghiệm $x=\frac{-b\pm\sqrt{\Delta}}{2a}$. Công thức này suy ra từ dạng đỉnh bằng cách đặt bình phương bằng $\frac{\Delta}{4a^2}$.`,
          suy: [
            R`Phương trình $ax^2+bx+c=0$ viết theo dạng đỉnh là $a\left(x+\frac{b}{2a}\right)^2=\frac{\Delta}{4a}$. Chia hai vế cho $a$ được $\left(x+\frac{b}{2a}\right)^2=\frac{\Delta}{4a^2}$.`,
            R`Khi $\Delta\ge 0$, có hai số mà bình phương bằng $\frac{\Delta}{4a^2}$, đó là $\frac{\sqrt{\Delta}}{2a}$ và $-\frac{\sqrt{\Delta}}{2a}$.`,
            R`Vậy $x+\frac{b}{2a}=\pm\frac{\sqrt{\Delta}}{2a}$. Chuyển $\frac{b}{2a}$ sang vế phải được $x=\frac{-b\pm\sqrt{\Delta}}{2a}$.`,
          ],
        },
        {
          kind: "dinh-ly", title: "Số nghiệm theo biệt thức",
          text: R`Nếu $\Delta>0$ có hai nghiệm phân biệt, nếu $\Delta=0$ có một nghiệm kép $x=-\frac{b}{2a}$, nếu $\Delta<0$ vô nghiệm thực. Về hình học, đó là số giao điểm của parabol với trục hoành: hai, một (tiếp xúc), hoặc không có.`,
          suy: [
            R`Vẫn từ $\left(x+\frac{b}{2a}\right)^2=\frac{\Delta}{4a^2}$: vế trái là một bình phương nên không âm, vế phải có mẫu dương nên cùng dấu với $\Delta$.`,
            R`Nếu $\Delta<0$, một số không âm không thể bằng một số âm, nên không có $x$ nào thỏa. Nếu $\Delta=0$, bình phương bằng $0$ chỉ khi $x=-\frac{b}{2a}$, nên có một nghiệm. Nếu $\Delta>0$, có hai số đối nhau cùng bình phương ra vế phải, nên có hai nghiệm khác nhau.`,
            R`Nghiệm là giá trị $x$ làm $y=0$, tức là chỗ đồ thị chạm trục hoành. Vì vậy số nghiệm bằng số điểm chung của parabol với trục hoành.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Biệt thức thu gọn",
          text: R`Khi $b=2b'$ đặt $\Delta'=b'^2-ac$ và nghiệm là $x=\frac{-b'\pm\sqrt{\Delta'}}{a}$. Cách này tránh số lớn khi hệ số $b$ chẵn, và $\Delta=4\Delta'$ nên dấu của hai biệt thức luôn giống nhau.`,
          suy: [
            R`Thay $b=2b'$ vào $\Delta=b^2-4ac$ được $\Delta=4b'^2-4ac=4(b'^2-ac)=4\Delta'$. Vì $4>0$ nên $\Delta$ và $\Delta'$ cùng dấu.`,
            R`Thay vào công thức nghiệm: $x=\frac{-2b'\pm\sqrt{4\Delta'}}{2a}=\frac{-2b'\pm 2\sqrt{\Delta'}}{2a}$. Rút gọn số $2$ ở tử và mẫu được $x=\frac{-b'\pm\sqrt{\Delta'}}{a}$.`,
          ],
        },
        {
          kind: "dinh-ly", title: "Hệ thức Viète",
          text: R`Nếu phương trình có hai nghiệm $x_1,x_2$ (kể cả nghiệm kép) thì $x_1+x_2=-\frac{b}{a}$ và $x_1x_2=\frac{c}{a}$. Ngược lại, hai số có tổng $S$ và tích $P$ là nghiệm của $X^2-SX+P=0$ khi $S^2-4P\ge 0$.`,
          suy: [
            R`Hai nghiệm là $x_1=\frac{-b+\sqrt{\Delta}}{2a}$ và $x_2=\frac{-b-\sqrt{\Delta}}{2a}$. Cộng lại thì hai căn triệt tiêu: $x_1+x_2=\frac{-2b}{2a}=-\frac{b}{a}$.`,
            R`Nhân lại, dùng $(m+n)(m-n)=m^2-n^2$ cho tử số: $x_1x_2=\frac{b^2-\Delta}{4a^2}=\frac{b^2-(b^2-4ac)}{4a^2}=\frac{4ac}{4a^2}=\frac{c}{a}$.`,
            R`Chiều ngược lại: nếu hai số $u,v$ có $u+v=S$ và $uv=P$ thì $(X-u)(X-v)=X^2-(u+v)X+uv=X^2-SX+P$. Tích bằng $0$ đúng khi $X=u$ hoặc $X=v$, nên $u$ và $v$ là hai nghiệm. Hai số thực như vậy tồn tại khi biệt thức $S^2-4P\ge 0$.`,
          ],
        },
        {
          kind: "tinh-chat", title: "Nhẩm nghiệm",
          text: R`Nếu $a+b+c=0$ thì $x=1$ là một nghiệm và nghiệm còn lại là $\frac{c}{a}$. Nếu $a-b+c=0$ thì $x=-1$ là một nghiệm và nghiệm còn lại là $-\frac{c}{a}$.`,
          suy: [
            R`Thay $x=1$ vào vế trái được $a\cdot 1+b\cdot 1+c=a+b+c$. Nếu tổng này bằng $0$ thì $x=1$ thỏa phương trình, tức là một nghiệm.`,
            R`Theo Viète, tích hai nghiệm là $\frac{c}{a}$. Một nghiệm bằng $1$ nên nghiệm kia bằng $\frac{c}{a}$.`,
            R`Thay $x=-1$ được $a-b+c$. Nếu số này bằng $0$ thì $x=-1$ là nghiệm, và nghiệm kia bằng tích chia cho $-1$, tức $-\frac{c}{a}$.`,
          ],
        },
        { kind: "cach-lam", title: "Biểu thức đối xứng của hai nghiệm", text: R`Đặt $S=x_1+x_2$, $P=x_1x_2$ rồi quy mọi biểu thức về $S$ và $P$: $x_1^2+x_2^2=S^2-2P$, $x_1^3+x_2^3=S^3-3SP$, $|x_1-x_2|=\frac{\sqrt{\Delta}}{|a|}$. Không cần giải ra nghiệm.` },
        { kind: "luu-y", text: R`Dùng Viète mà quên điều kiện $\Delta\ge 0$ là lỗi hay gặp nhất ở bài có tham số. Tìm được giá trị của tham số xong, phải thay lại để kiểm phương trình có nghiệm.` },
        { kind: "vi-du", text: R`Với $x^2-5x+6=0$ có $\Delta=1$ và nghiệm $x=2$, $x=3$; đúng với $S=5$ và $P=6$. Với $2x^2+3x-5=0$ có $a+b+c=0$ nên $x=1$, nghiệm kia là $\frac{-5}{2}$.` },
      ],
    },
    {
      title: "Dấu của tam thức bậc hai",
      items: [
        {
          kind: "dinh-ly", title: "Định lí về dấu",
          text: R`Xét $f(x)=ax^2+bx+c$. Nếu $\Delta<0$ thì $f(x)$ cùng dấu với $a$ với mọi $x$. Nếu $\Delta=0$ thì $f(x)$ cùng dấu với $a$ trừ tại nghiệm kép, nơi bằng $0$. Nếu $\Delta>0$ thì $f(x)$ cùng dấu với $a$ khi $x$ nằm ngoài hai nghiệm và trái dấu với $a$ khi $x$ nằm giữa hai nghiệm.`,
          suy: [
            R`Dạng đỉnh cho $f(x)=a\left[\left(x+\frac{b}{2a}\right)^2-\frac{\Delta}{4a^2}\right]$. Dấu của $f(x)$ là dấu của $a$ nhân với dấu của ngoặc vuông.`,
            R`Nếu $\Delta<0$ thì $-\frac{\Delta}{4a^2}>0$, ngoặc vuông là một số không âm cộng một số dương nên luôn dương: $f(x)$ cùng dấu với $a$. Nếu $\Delta=0$, ngoặc vuông là một bình phương: dương, trừ lúc bằng $0$ tại nghiệm kép.`,
            R`Nếu $\Delta>0$, gọi hai nghiệm là $x_1<x_2$. Khai triển $a(x-x_1)(x-x_2)=ax^2-a(x_1+x_2)x+ax_1x_2$ rồi dùng Viète thì được đúng $ax^2+bx+c$. Vậy $f(x)=a(x-x_1)(x-x_2)$.`,
            R`Khi $x$ nằm giữa hai nghiệm, $x-x_1>0$ còn $x-x_2<0$, tích âm, nên $f(x)$ trái dấu với $a$. Khi $x$ nằm ngoài, hai thừa số cùng dương hoặc cùng âm, tích dương, nên $f(x)$ cùng dấu với $a$.`,
          ],
        },
        { kind: "luu-y", title: "Trong trái, ngoài cùng", text: R`Cách nhớ: giữa hai nghiệm thì trái dấu với $a$, ngoài hai nghiệm thì cùng dấu với $a$. Vẽ parabol phác ra giấy sẽ thấy ngay vì dấu của $f$ là dấu của đồ thị so với trục hoành.` },
        { kind: "cach-lam", title: "Giải bất phương trình bậc hai", text: R`Tìm nghiệm của vế trái, đặt hai nghiệm lên trục số, xét dấu theo định lí trên rồi chọn khoảng thỏa dấu yêu cầu. Chú ý bất phương trình có dấu bằng thì lấy cả hai nghiệm.` },
        {
          kind: "tinh-chat", title: "Luôn dương, luôn không âm",
          text: R`Bất phương trình $ax^2+bx+c>0$ đúng với mọi $x$ khi và chỉ khi $a>0$ và $\Delta<0$. Bất phương trình $ax^2+bx+c\ge 0$ đúng với mọi $x$ khi và chỉ khi $a>0$ và $\Delta\le 0$. Với chiều ngược lại, đổi dấu của $a$.`,
          suy: [
            R`Chiều thuận: theo định lí về dấu, nếu $\Delta<0$ thì $f(x)$ cùng dấu với $a$ tại mọi $x$. Thêm $a>0$ thì $f(x)>0$ với mọi $x$.`,
            R`Chiều ngược: giả sử $f(x)>0$ với mọi $x$. Nếu $\Delta\ge 0$ thì phương trình có nghiệm, tại đó $f=0$, trái giả thiết; vậy $\Delta<0$. Khi đó $f$ luôn cùng dấu với $a$, mà $f$ dương, nên $a>0$.`,
            R`Với yêu cầu $f(x)\ge 0$ thì cho phép $f$ bằng $0$ tại một điểm, tức cho phép nghiệm kép, nên điều kiện nới thành $\Delta\le 0$.`,
          ],
        },
        { kind: "luu-y", text: R`Khi hệ số $a$ chứa tham số, hãy xét riêng trường hợp $a=0$ trước, vì lúc đó biểu thức là bậc nhất và định lí về dấu không áp dụng.` },
        { kind: "vi-du", text: R`Bất phương trình $x^2-5x+6<0$ có hai nghiệm $2$ và $3$, hệ số $a=1>0$, nên đúng khi $2<x<3$. Còn $x^2+x+1>0$ đúng với mọi $x$ vì $\Delta=-3<0$ và $a=1>0$.` },
      ],
    },
    {
      title: "Parabol và đường thẳng, so sánh nghiệm với một số",
      items: [
        { kind: "cach-lam", title: "Giao điểm với đường thẳng", text: R`Cho parabol $y=f(x)$ và đường thẳng $y=px+q$, giải phương trình hoành độ giao điểm $f(x)=px+q$. Số nghiệm của nó là số giao điểm. Nghiệm kép nghĩa là đường thẳng tiếp xúc với parabol.` },
        {
          kind: "dinh-ly", title: "Hai nghiệm ở hai phía của một số",
          text: R`Phương trình $f(x)=0$ có hai nghiệm phân biệt $x_1<\alpha<x_2$ khi và chỉ khi $a\cdot f(\alpha)<0$. Điều kiện này gọn vì tự chứa cả $\Delta>0$, không cần kiểm riêng.`,
          suy: [
            R`Chiều thuận: giả sử có hai nghiệm $x_1<\alpha<x_2$. Số $\alpha$ nằm giữa hai nghiệm nên theo định lí về dấu, $f(\alpha)$ trái dấu với $a$. Hai số trái dấu có tích âm, tức $a\cdot f(\alpha)<0$.`,
            R`Chiều ngược: giả sử $a\cdot f(\alpha)<0$, tức $f(\alpha)$ trái dấu với $a$. Khi $\Delta\le 0$ thì $f$ không bao giờ trái dấu với $a$, nên buộc phải có $\Delta>0$: tự động có hai nghiệm phân biệt.`,
            R`Khi đã có hai nghiệm, $f$ chỉ trái dấu với $a$ ở khoảng giữa hai nghiệm, nên $\alpha$ nằm giữa chúng.`,
          ],
        },
        { kind: "cach-lam", title: "Hai nghiệm cùng phía của một số", text: R`Để cả hai nghiệm cùng lớn hơn $\alpha$, cần $\Delta\ge 0$, $a\cdot f(\alpha)>0$ và $\frac{S}{2}>\alpha$. Đổi chiều dấu cuối để được hai nghiệm cùng nhỏ hơn $\alpha$.` },
        { kind: "luu-y", text: R`Hai nghiệm cùng dương nghĩa là $\Delta\ge 0$, $P>0$ và $S>0$; hai nghiệm trái dấu chỉ cần $P<0$. Đừng dùng điều kiện $P>0$ riêng lẻ, vì nó cho cả trường hợp hai nghiệm cùng âm.` },
        { kind: "vi-du", text: R`Parabol $y=x^2$ và đường thẳng $y=2x+m$ cho phương trình $x^2-2x-m=0$ có $\Delta'=1+m$. Có hai giao điểm khi $m>-1$, tiếp xúc khi $m=-1$ tại $x=1$, và không giao khi $m<-1$.` },
      ],
    },
    {
      title: "Ứng dụng và những lỗi hay gặp",
      items: [
        { kind: "cach-lam", title: "Bài tối ưu", text: R`Gọi đại lượng cần tối ưu là $y$, chọn biến $x$ sao cho $y$ là một hàm bậc hai của $x$, tìm đỉnh rồi trả lời trong miền hợp lệ của $x$. Đừng quên đổi kết quả về đơn vị của đề.` },
        { kind: "vi-du", text: R`Có $40$ m lưới rào ba cạnh một chuồng tựa vào tường, cạnh vuông góc dài $x$. Diện tích $S=x(40-2x)=-2x^2+40x$ có đỉnh tại $x=10$, và $S(10)=200$ m$^2$. Miền hợp lệ là $0<x<20$, nên đỉnh thuộc miền.` },
        { kind: "vi-du", text: R`Một vật ném lên có độ cao $h=20t-5t^2$ mét sau $t$ giây. Đỉnh ở $t=2$ và độ cao lớn nhất là $h(2)=20$ mét, rồi vật rơi xuống đất khi $h=0$, tức $t=4$ giây.` },
        { kind: "luu-y", text: R`Đỉnh chỉ có nghĩa với bài toán khi hoành độ của nó nằm trong miền của biến. Nếu miền bị giới hạn, so sánh với đầu mút như mục giá trị lớn nhất trên một đoạn.` },
        { kind: "luu-y", text: R`Nhầm hay gặp: lấy $-\frac{\Delta}{4a}$ làm hoành độ đỉnh, hoặc quên dấu trừ trong $-\frac{b}{2a}$. Hoành độ đỉnh chỉ phụ thuộc $a$ và $b$; $\Delta$ chỉ xuất hiện ở tung độ.` },
        { kind: "luu-y", text: R`Biệt thức âm không có nghĩa là hàm số không xác định, mà chỉ là đồ thị không cắt trục hoành. Hàm vẫn nhận mọi giá trị $x$ và vẫn có đỉnh.` },
      ],
    },
  ],
  canNho: [
    R`Hàm bậc hai có $a\neq 0$; $a>0$ thì parabol mở lên, $a<0$ thì mở xuống.`,
    R`Trục đối xứng $x=-\frac{b}{2a}$, đỉnh $\left(-\frac{b}{2a};-\frac{\Delta}{4a}\right)$ với $\Delta=b^2-4ac$.`,
    R`Số nghiệm theo $\Delta$: dương hai nghiệm, bằng $0$ nghiệm kép, âm vô nghiệm.`,
    R`Viète: $x_1+x_2=-\frac{b}{a}$ và $x_1x_2=\frac{c}{a}$, chỉ dùng khi $\Delta\ge 0$.`,
    R`Dấu của tam thức: giữa hai nghiệm trái dấu $a$, ngoài hai nghiệm cùng dấu $a$.`,
    R`Luôn dương với mọi $x$: $a>0$ và $\Delta<0$.`,
    R`Giá trị lớn nhất hoặc nhỏ nhất trên đoạn: so đầu mút với đỉnh khi đỉnh nằm trong đoạn.`,
    R`Bài có tham số: xét riêng $a=0$, và thay lại để kiểm $\Delta\ge 0$.`,
  ],
  lienQuan: [
    { id: "derivative", vi: R`Đỉnh của parabol là nơi $y'=0$, nên đạo hàm cho cách tìm cực trị cho mọi hàm, không chỉ hàm bậc hai.` },
    { id: "ineq", vi: R`Phép biến đổi thành bình phương ở đây là công cụ chính để chứng minh bất đẳng thức và tìm giá trị nhỏ nhất.` },
    { id: "analytic", vi: R`Parabol cũng là một đường conic; giao điểm và tiếp xúc với đường thẳng giải bằng đúng điều kiện về $\Delta$.` },
  ],
  checks: [
    { expr: "-8/(2*(-2))", expect: "2" },
    { expr: "-2*2**2+8*2-3", expect: "5" },
    { expr: "-2*3**2+8*3-3", expect: "3" },
    { expr: "-2*5**2+8*5-3", expect: "-13" },
    { expr: "(-5)**2-4*1*6", expect: "1" },
    { expr: "solve(x**2-5*x+6, x)", expect: "[2, 3]" },
    { expr: "sorted(solve(2*x**2+3*x-5, x))", expect: "[Rational(-5,2), 1]" },
    { expr: "2+3+(-5)", expect: "0" },
    { expr: "2+3", expect: "5" },
    { expr: "2*3", expect: "6" },
    { expr: "(2-3)**2", expect: "1" },
    { expr: "1**2-4*1*1", expect: "-3" },
    { expr: "diff(x*(40-2*x), x).subs(x,10)", expect: "0" },
    { expr: "10*(40-2*10)", expect: "200" },
    { expr: "diff(20*t-5*t**2, t).subs(t,2)", expect: "0" },
    { expr: "20*2-5*2**2", expect: "20" },
    { expr: "solve(20*t-5*t**2, t)", expect: "[0, 4]" },
    { expr: "discriminant(x**2-2*x-m, x)/4", expect: "1+m" },
    { expr: "(x**2-4*x+3).subs(x,1)", expect: "0" },
    { expr: "(x**2-4*x+3).subs(x,3)", expect: "0" },
    { expr: "simplify(a*(x+b/(2*a))**2-(b**2-4*a*c)/(4*a)-(a*x**2+b*x+c))", expect: "0" },
    { expr: "simplify(((x1+x2)**2-2*x1*x2)-(x1**2+x2**2))", expect: "0" },
    { expr: "simplify(((x1+x2)**3-3*(x1+x2)*x1*x2)-(x1**3+x2**3))", expect: "0" },
  ],
};
