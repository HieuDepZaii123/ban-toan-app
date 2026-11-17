import type { TopicKnowledge } from "./types.ts";

const R = String.raw;

export const trigKnowledge: TopicKnowledge = {
  id: "trig",
  tongQuat: {
    la: R`Lượng giác nghiên cứu mối liên hệ giữa góc và độ dài. Trên đường tròn đơn vị, mỗi góc $\alpha$ ứng với một điểm $M(\cos\alpha;\sin\alpha)$. Từ đó $\sin$, $\cos$, $\tan$, $\cot$ được định nghĩa cho mọi góc, không chỉ góc nhọn của tam giác vuông.`,
    dungDe: R`Đo chiều cao và khoảng cách không thể đo trực tiếp, mô tả mọi dao động tuần hoàn như sóng, dòng điện xoay chiều, thủy triều và con lắc. Trong bài thi, chuyên đề cho bài tính giá trị lượng giác, biến đổi và chứng minh đẳng thức, giải phương trình lượng giác, và bài tam giác dùng định lí sin, cosin.`,
    lienHe: R`Định lí cosin là mở rộng của định lí Pythagore ở chuyên đề Hình phẳng, và tích vô hướng ở chuyên đề Vectơ chứa $\cos$ của góc giữa hai vectơ. Giới hạn $\lim_{x\to 0}\frac{\sin x}{x}=1$ là nền để tính đạo hàm của hàm lượng giác.`,
  },
  tuDau: [
    R`Ngồi trên đu quay: khi vòng quay chuyển động, độ cao của bạn lên rồi xuống, rồi lại lên, lặp đi lặp lại. Lượng giác là môn học về đúng chuyển động đó: một điểm chạy quanh một đường tròn, và ta ghi lại nó đang ở cao bao nhiêu, lệch ngang bao nhiêu. Sóng biển, âm thanh, dòng điện xoay chiều đều lên xuống theo kiểu này.`,
    R`Lấy đường tròn bán kính $1$, tâm đặt ở gốc tọa độ. Cho một điểm xuất phát từ vị trí ngoài cùng bên phải rồi chạy ngược chiều kim đồng hồ. Khi nó đã quay được một góc, vị trí ngang của nó gọi là cosin của góc, còn độ cao của nó gọi là sin của góc. Hai cái tên này chỉ là «ngang» và «cao» của một điểm trên đường tròn.`,
    R`Vì bán kính bằng $1$ nên trong tam giác vuông tạo bởi bán kính, đoạn ngang và đoạn cao, cạnh huyền bằng $1$. Do đó sin đúng bằng «cạnh đối chia cạnh huyền» và cosin đúng bằng «cạnh kề chia cạnh huyền» quen thuộc của tam giác vuông. Đường tròn chỉ mở rộng hai tỉ số này cho mọi góc, kể cả góc tù, góc âm hay góc lớn hơn một vòng.`,
    R`Gần như mọi công thức trong chuyên đề đều đọc ra được từ hình vẽ đường tròn bằng hai công cụ: phép đối xứng (lật hình qua một trục thì tọa độ đổi dấu) và định lí Pythagore (bình phương cạnh huyền bằng tổng bình phương hai cạnh góc vuông). Khi quên một công thức, hãy vẽ lại đường tròn thay vì cố nhớ.`,
  ],
  kyHieu: [
    { kh: R`$\alpha$`, doc: R`Chữ Hy Lạp «an-pha», thường dùng để đặt tên cho một góc.` },
    { kh: R`$\pi$`, doc: R`Số «pi», gần bằng $3{,}14$: độ dài nửa đường tròn bán kính $1$. Góc $\pi$ rad là góc bẹt $180^\circ$.` },
    { kh: R`$\sin\alpha$`, doc: R`Đọc là «sin an-pha»: độ cao của điểm ứng với góc $\alpha$ trên đường tròn bán kính $1$.` },
    { kh: R`$\cos\alpha$`, doc: R`Đọc là «cô-sin an-pha»: vị trí ngang của điểm ứng với góc $\alpha$.` },
    { kh: R`$\tan\alpha$`, doc: R`Đọc là «tang an-pha»: độ dốc của tia từ tâm tới điểm đó, tức sin chia cho cosin.` },
    { kh: R`$\sin^2\alpha$`, doc: R`Cách viết gọn của $(\sin\alpha)^2$: tính sin trước rồi mới bình phương.` },
    { kh: R`$k2\pi$`, doc: R`Số nguyên $k$ lần một vòng. Cộng $k2\pi$ vào góc nghĩa là quay thêm $k$ vòng trọn, điểm trở về chỗ cũ.` },
    { kh: R`$30^\circ$`, doc: R`Ba mươi độ. Một vòng tròn chia thành $360$ phần bằng nhau, mỗi phần là một độ.` },
  ],
  canBiet: [
    R`Định lí Pythagore và các tỉ số trong tam giác vuông.`,
    R`Tọa độ điểm trên hệ trục và khái niệm hàm số tuần hoàn.`,
    R`Biến đổi đại số và giải phương trình bậc hai.`,
  ],
  sections: [
    {
      title: "Góc, đơn vị đo và đường tròn lượng giác",
      items: [
        {
          kind: "dinh-nghia", title: "Radian",
          text: R`Góc $\pi$ rad bằng $180^\circ$, nên $1$ rad $=\frac{180^\circ}{\pi}\approx 57{,}3^\circ$. Cung có số đo $\alpha$ rad trên đường tròn bán kính $R$ dài $l=R\alpha$, công thức không cần hệ số nào khác khi dùng radian.`,
          de: R`Radian đo góc bằng quãng đường đi dọc đường tròn bán kính $1$. Đi hết một vòng là đi chu vi $2\pi$, nên một vòng bằng $2\pi$ rad, nửa vòng bằng $\pi$ rad. Đo như vậy tiện vì góc và độ dài cung trở thành cùng một con số: trên đường tròn lớn gấp $R$ lần, cung dài gấp $R$ lần.`,
        },
        {
          kind: "dinh-nghia", title: "Đường tròn lượng giác",
          text: R`Là đường tròn tâm $O$ bán kính $1$. Góc lượng giác $\alpha$ ứng với điểm $M$ trên đường tròn, khi đó $\cos\alpha$ là hoành độ và $\sin\alpha$ là tung độ của $M$.`,
          de: R`Hãy đứng ở điểm $(1;0)$ rồi đi dọc đường tròn ngược chiều kim đồng hồ một quãng đúng bằng $\alpha$. Nơi dừng chân là điểm $M$. Số $\cos\alpha$ cho biết $M$ lệch sang phải hay trái bao nhiêu so với tâm, số $\sin\alpha$ cho biết $M$ cao hay thấp bao nhiêu so với tâm.`,
        },
        {
          kind: "dinh-nghia", title: "Tang và cotang",
          text: R`Có $\tan\alpha=\frac{\sin\alpha}{\cos\alpha}$ khi $\cos\alpha\neq 0$ và $\cot\alpha=\frac{\cos\alpha}{\sin\alpha}$ khi $\sin\alpha\neq 0$. Hai tỉ số này không xác định tại những góc làm mẫu bằng $0$.`,
          de: R`Tang là độ dốc của tia đi từ tâm tới điểm $M$: lên cao được bao nhiêu trên mỗi đơn vị đi ngang. Khi $M$ nằm thẳng phía trên hoặc phía dưới tâm thì tia dựng đứng, không đi ngang chút nào, nên độ dốc không tính được. Cotang là nghịch đảo của tang: đi ngang bao nhiêu trên mỗi đơn vị lên cao.`,
        },
        {
          kind: "tinh-chat", title: "Giới hạn giá trị",
          text: R`Vì $M$ nằm trên đường tròn bán kính $1$ nên $-1\le\sin\alpha\le 1$ và $-1\le\cos\alpha\le 1$ với mọi $\alpha$. Không có góc nào cho $\sin\alpha=2$.`,
          suy: [
            R`Điểm $M(x;y)$ cách tâm đúng $1$. Theo định lí Pythagore cho tam giác vuông có hai cạnh góc vuông $|x|$, $|y|$ và cạnh huyền $1$: $x^2+y^2=1$.`,
            R`Vì $y^2\ge 0$ nên $x^2\le 1$, tức $-1\le x\le 1$. Tương tự $-1\le y\le 1$. Mà $x=\cos\alpha$ và $y=\sin\alpha$, nên cả hai giá trị đều nằm trong đoạn từ $-1$ đến $1$.`,
          ],
        },
        {
          kind: "tinh-chat", title: "Tuần hoàn",
          text: R`Cộng thêm một vòng $2\pi$ thì $M$ trở về chỗ cũ: $\sin(\alpha+2\pi)=\sin\alpha$ và $\cos(\alpha+2\pi)=\cos\alpha$. Riêng $\tan(\alpha+\pi)=\tan\alpha$, vì cộng nửa vòng đổi dấu cả $\sin$ lẫn $\cos$.`,
          suy: [
            R`Chu vi đường tròn bán kính $1$ là $2\pi$. Đi thêm đúng $2\pi$ là đi trọn một vòng và trở về đúng điểm $M$, nên hai tọa độ của nó, tức cosin và sin, không đổi.`,
            R`Đi thêm $\pi$ là đi nửa vòng, tới điểm đối diện với $M$ qua tâm. Điểm đó có tọa độ $(-x;-y)$, nên cả sin lẫn cosin đổi dấu, còn tang bằng $\frac{-y}{-x}=\frac{y}{x}$ thì giữ nguyên.`,
          ],
        },
        { kind: "vi-du", text: R`Góc $90^\circ$ ứng với điểm $(0;1)$ nên $\sin 90^\circ=1$ và $\cos 90^\circ=0$. Góc $60^\circ=\frac{\pi}{3}$ rad, và cung $60^\circ$ trên đường tròn bán kính $6$ dài $6\cdot\frac{\pi}{3}=2\pi\approx 6{,}28$.` },
      ],
    },
    {
      title: "Giá trị lượng giác của góc đặc biệt",
      items: [
        {
          kind: "cong-thuc", title: "Bảng các góc đặc biệt",
          text: R`Với $0^\circ,30^\circ,45^\circ,60^\circ,90^\circ$ thì $\sin$ lần lượt là $0,\frac{1}{2},\frac{\sqrt{2}}{2},\frac{\sqrt{3}}{2},1$. Giá trị $\cos$ là dãy ngược lại. Giá trị $\tan$ là $0,\frac{\sqrt{3}}{3},1,\sqrt{3}$ và không xác định tại $90^\circ$.`,
          suy: [
            R`Góc $45^\circ$: xét tam giác vuông cân có hai cạnh góc vuông bằng $1$. Theo Pythagore cạnh huyền bằng $\sqrt{2}$, nên $\sin 45^\circ=\cos 45^\circ=\frac{1}{\sqrt{2}}=\frac{\sqrt{2}}{2}$.`,
            R`Góc $30^\circ$ và $60^\circ$: lấy tam giác đều cạnh $2$, kẻ đường cao để chia nó thành hai tam giác vuông. Mỗi tam giác có cạnh huyền $2$, một cạnh góc vuông $1$, cạnh còn lại $\sqrt{2^2-1^2}=\sqrt{3}$, với các góc nhọn $30^\circ$ và $60^\circ$.`,
            R`Đọc tỉ số từ tam giác đó: $\sin 30^\circ=\frac{1}{2}$, $\cos 30^\circ=\frac{\sqrt{3}}{2}$, còn $\sin 60^\circ=\frac{\sqrt{3}}{2}$, $\cos 60^\circ=\frac{1}{2}$.`,
            R`Góc $0^\circ$ ứng với điểm $(1;0)$ và góc $90^\circ$ ứng với điểm $(0;1)$ trên đường tròn. Giá trị tang là sin chia cosin: $\frac{1/2}{\sqrt{3}/2}=\frac{\sqrt{3}}{3}$, rồi $1$, rồi $\sqrt{3}$; tại $90^\circ$ phải chia cho $0$ nên không xác định.`,
          ],
        },
        { kind: "cach-lam", title: "Cách nhớ bảng", text: R`Viết $\sin$ của năm góc là $\frac{\sqrt{0}}{2},\frac{\sqrt{1}}{2},\frac{\sqrt{2}}{2},\frac{\sqrt{3}}{2},\frac{\sqrt{4}}{2}$. Giá trị $\cos$ là dãy đó đọc từ cuối về đầu, vì $\cos\alpha=\sin(90^\circ-\alpha)$.` },
        {
          kind: "dinh-ly", title: "Hệ thức cơ bản",
          text: R`Với mọi góc: $\sin^2\alpha+\cos^2\alpha=1$. Khi các biểu thức có nghĩa: $1+\tan^2\alpha=\frac{1}{\cos^2\alpha}$, $1+\cot^2\alpha=\frac{1}{\sin^2\alpha}$ và $\tan\alpha\cdot\cot\alpha=1$. Hệ thức đầu chính là phương trình của đường tròn đơn vị.`,
          suy: [
            R`Điểm $M(\cos\alpha;\sin\alpha)$ cách tâm đúng $1$. Định lí Pythagore cho tam giác vuông có hai cạnh góc vuông $|\cos\alpha|$, $|\sin\alpha|$ và cạnh huyền $1$: $\sin^2\alpha+\cos^2\alpha=1$.`,
            R`Chia hai vế cho $\cos^2\alpha$ (khi khác $0$): $\frac{\sin^2\alpha}{\cos^2\alpha}+1=\frac{1}{\cos^2\alpha}$, tức $\tan^2\alpha+1=\frac{1}{\cos^2\alpha}$.`,
            R`Chia hai vế cho $\sin^2\alpha$ (khi khác $0$) theo cùng cách được $1+\cot^2\alpha=\frac{1}{\sin^2\alpha}$.`,
            R`Cuối cùng $\tan\alpha\cdot\cot\alpha=\frac{\sin\alpha}{\cos\alpha}\cdot\frac{\cos\alpha}{\sin\alpha}=1$.`,
          ],
        },
        {
          kind: "tinh-chat", title: "Dấu theo góc phần tư",
          text: R`Góc phần tư thứ nhất: cả bốn giá trị dương. Thứ hai: chỉ $\sin$ dương. Thứ ba: chỉ $\tan$ và $\cot$ dương. Thứ tư: chỉ $\cos$ dương. Cách nhớ: «Tất, Sin, Tan, Cos» đi ngược chiều kim đồng hồ.`,
          suy: [
            R`Cosin là hoành độ của $M$ nên dương khi $M$ nằm bên phải trục tung, tức ở góc phần tư thứ nhất và thứ tư. Sin là tung độ nên dương khi $M$ nằm phía trên trục hoành, tức ở góc phần tư thứ nhất và thứ hai.`,
            R`Tang và cotang là thương của sin và cosin nên dương khi hai số đó cùng dấu: cùng dương ở góc phần tư thứ nhất, cùng âm ở góc phần tư thứ ba.`,
          ],
        },
        { kind: "luu-y", text: R`Khi tìm $\cos\alpha$ từ $\sin\alpha$ bằng hệ thức cơ bản, phép khai căn cho hai dấu. Dấu đúng do góc phần tư của $\alpha$ quyết định, đề thường cho điều kiện như «$\alpha$ nhọn» hoặc «$\alpha$ tù» để chọn.` },
        { kind: "vi-du", text: R`Biết $\sin\alpha=\frac{3}{5}$ và $\alpha$ nhọn thì $\cos\alpha=\sqrt{1-\frac{9}{25}}=\frac{4}{5}$ và $\tan\alpha=\frac{3}{4}$. Nếu $\alpha$ tù thì $\cos\alpha=-\frac{4}{5}$ và $\tan\alpha=-\frac{3}{4}$.` },
      ],
    },
    {
      title: "Các góc liên quan",
      items: [
        {
          kind: "tinh-chat", title: "Góc đối",
          text: R`$\cos(-\alpha)=\cos\alpha$, còn $\sin(-\alpha)=-\sin\alpha$, $\tan(-\alpha)=-\tan\alpha$. Cosin là hàm chẵn, còn sin và tang là hàm lẻ, vì điểm ứng với $-\alpha$ đối xứng với điểm ứng với $\alpha$ qua trục hoành.`,
          suy: [
            R`Góc $-\alpha$ nghĩa là đi cùng một quãng đường nhưng theo chiều kim đồng hồ. Điểm dừng là ảnh của $M$ khi lật hình qua trục hoành, có tọa độ $(x;-y)$.`,
            R`Hoành độ giữ nguyên nên $\cos(-\alpha)=\cos\alpha$. Tung độ đổi dấu nên $\sin(-\alpha)=-\sin\alpha$, và $\tan(-\alpha)=\frac{-y}{x}=-\tan\alpha$.`,
          ],
        },
        {
          kind: "tinh-chat", title: "Góc bù",
          text: R`$\sin(\pi-\alpha)=\sin\alpha$ và $\cos(\pi-\alpha)=-\cos\alpha$. Hai góc bù có cùng sin và đối nhau về cos, vì hai điểm ứng với chúng đối xứng qua trục tung.`,
          suy: [
            R`Góc $\pi-\alpha$ nghĩa là đi nửa vòng tới điểm $(-1;0)$ rồi lùi lại một quãng $\alpha$. Điểm dừng là ảnh của $M$ khi lật hình qua trục tung, có tọa độ $(-x;y)$.`,
            R`Tung độ giữ nguyên nên $\sin(\pi-\alpha)=\sin\alpha$. Hoành độ đổi dấu nên $\cos(\pi-\alpha)=-\cos\alpha$.`,
          ],
        },
        {
          kind: "tinh-chat", title: "Góc phụ",
          text: R`$\sin\left(\frac{\pi}{2}-\alpha\right)=\cos\alpha$ và $\cos\left(\frac{\pi}{2}-\alpha\right)=\sin\alpha$. Đây là lý do «co-sin» có nghĩa là sin của góc phụ.`,
          suy: [
            R`Với góc nhọn: trong tam giác vuông, hai góc nhọn là $\alpha$ và $90^\circ-\alpha$ vì ba góc cộng lại bằng $180^\circ$. Cạnh đối của góc này chính là cạnh kề của góc kia, nên sin của góc này bằng cosin của góc kia.`,
            R`Với góc bất kì: điểm ứng với $\frac{\pi}{2}-\alpha$ là ảnh của $M$ khi lật hình qua đường chéo $y=x$. Phép lật này đổi chỗ hai tọa độ, biến $(x;y)$ thành $(y;x)$, nên sin và cosin đổi vai cho nhau.`,
          ],
        },
        {
          kind: "tinh-chat", title: "Góc hơn kém nửa vòng",
          text: R`$\sin(\alpha+\pi)=-\sin\alpha$, $\cos(\alpha+\pi)=-\cos\alpha$ và $\tan(\alpha+\pi)=\tan\alpha$. Cộng nửa vòng đưa điểm sang vị trí đối xứng qua gốc tọa độ.`,
          suy: [
            R`Đi thêm nửa vòng đưa $M(x;y)$ tới điểm đối diện qua tâm, có tọa độ $(-x;-y)$. Cả hoành độ lẫn tung độ đổi dấu, nên $\cos(\alpha+\pi)=-\cos\alpha$ và $\sin(\alpha+\pi)=-\sin\alpha$.`,
            R`Tang là thương của hai số đó: $\frac{-y}{-x}=\frac{y}{x}$, hai dấu trừ khử nhau, nên $\tan(\alpha+\pi)=\tan\alpha$.`,
          ],
        },
        { kind: "cach-lam", title: "Đưa góc lớn về góc nhọn", text: R`Trừ đi bội của $2\pi$ để góc nằm trong $[0;2\pi)$, dùng quan hệ bù hoặc hơn kém $\pi$ để về góc nhọn, rồi chọn dấu theo góc phần tư. Chỉ cần nhớ giá trị của các góc đặc biệt trong góc phần tư thứ nhất.` },
        { kind: "vi-du", text: R`Có $\sin 150^\circ=\sin 30^\circ=\frac{1}{2}$ vì $150^\circ$ bù với $30^\circ$. Có $\cos 120^\circ=-\cos 60^\circ=-\frac{1}{2}$ và $\sin 210^\circ=-\sin 30^\circ=-\frac{1}{2}$ vì $210^\circ=30^\circ+180^\circ$.` },
      ],
    },
    {
      title: "Công thức lượng giác",
      items: [
        {
          kind: "cong-thuc", title: "Công thức cộng",
          text: R`$\sin(a\pm b)=\sin a\cos b\pm\cos a\sin b$ và $\cos(a\pm b)=\cos a\cos b\mp\sin a\sin b$, còn $\tan(a\pm b)=\frac{\tan a\pm\tan b}{1\mp\tan a\tan b}$. Dấu của $\cos$ ngược với dấu ở vế trái.`,
          suy: [
            R`Lấy hai điểm $A(\cos a;\sin a)$ và $B(\cos b;\sin b)$ trên đường tròn bán kính $1$. Bình phương khoảng cách giữa chúng là $(\cos a-\cos b)^2+(\sin a-\sin b)^2$. Khai triển và dùng $\sin^2+\cos^2=1$ hai lần được $AB^2=2-2(\cos a\cos b+\sin a\sin b)$.`,
            R`Quay cả hình quanh tâm sao cho $B$ về điểm $(1;0)$. Khi đó $A$ tới điểm $(\cos(a-b);\sin(a-b))$, và khoảng cách không đổi khi quay: $AB^2=(\cos(a-b)-1)^2+\sin^2(a-b)=2-2\cos(a-b)$.`,
            R`So sánh hai cách tính được $\cos(a-b)=\cos a\cos b+\sin a\sin b$.`,
            R`Thay $b$ bởi $-b$, dùng $\cos(-b)=\cos b$ và $\sin(-b)=-\sin b$, được $\cos(a+b)=\cos a\cos b-\sin a\sin b$.`,
            R`Với sin, dùng góc phụ: $\sin(a+b)=\cos\left(\left(\frac{\pi}{2}-a\right)-b\right)=\cos\left(\frac{\pi}{2}-a\right)\cos b+\sin\left(\frac{\pi}{2}-a\right)\sin b=\sin a\cos b+\cos a\sin b$. Thay $b$ bởi $-b$ được công thức cho $\sin(a-b)$.`,
            R`Với tang, chia $\sin(a+b)$ cho $\cos(a+b)$ rồi chia cả tử và mẫu cho $\cos a\cos b$ thì được $\frac{\tan a+\tan b}{1-\tan a\tan b}$.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Công thức nhân đôi",
          text: R`$\sin 2a=2\sin a\cos a$ và $\cos 2a=\cos^2a-\sin^2a=2\cos^2a-1=1-2\sin^2a$. Có ba dạng của $\cos 2a$, chọn dạng chỉ chứa hàm đã có trong bài.`,
          suy: [
            R`Đặt $b=a$ trong công thức cộng: $\sin(a+a)=\sin a\cos a+\cos a\sin a=2\sin a\cos a$, và $\cos(a+a)=\cos a\cos a-\sin a\sin a=\cos^2a-\sin^2a$.`,
            R`Thay $\sin^2a=1-\cos^2a$ được $\cos 2a=2\cos^2a-1$. Thay $\cos^2a=1-\sin^2a$ được $\cos 2a=1-2\sin^2a$.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Hạ bậc",
          text: R`$\sin^2a=\frac{1-\cos 2a}{2}$ và $\cos^2a=\frac{1+\cos 2a}{2}$. Hai công thức này rút ra từ hai dạng của $\cos 2a$ và dùng nhiều khi tính tích phân.`,
          suy: [
            R`Từ $\cos 2a=1-2\sin^2a$, chuyển vế được $2\sin^2a=1-\cos 2a$, rồi chia đôi: $\sin^2a=\frac{1-\cos 2a}{2}$.`,
            R`Từ $\cos 2a=2\cos^2a-1$, chuyển vế được $2\cos^2a=1+\cos 2a$, rồi chia đôi: $\cos^2a=\frac{1+\cos 2a}{2}$.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Tích và tổng",
          text: R`$\cos a\cos b=\frac{1}{2}\left[\cos(a-b)+\cos(a+b)\right]$, $\sin a\sin b=\frac{1}{2}\left[\cos(a-b)-\cos(a+b)\right]$. Đổi ngược lại: $\sin a+\sin b=2\sin\frac{a+b}{2}\cos\frac{a-b}{2}$ và $\cos a+\cos b=2\cos\frac{a+b}{2}\cos\frac{a-b}{2}$.`,
          suy: [
            R`Viết hai công thức cộng: $\cos(a-b)=\cos a\cos b+\sin a\sin b$ và $\cos(a+b)=\cos a\cos b-\sin a\sin b$. Cộng lại thì phần chứa sin triệt tiêu, được $2\cos a\cos b$. Trừ đi thì phần chứa cosin triệt tiêu, được $2\sin a\sin b$. Chia đôi là ra hai công thức tích thành tổng.`,
            R`Đổi ngược lại: đặt $a=\frac{u+v}{2}$ và $b=\frac{u-v}{2}$, khi đó $a+b=u$ và $a-b=v$. Công thức $\cos(a+b)+\cos(a-b)=2\cos a\cos b$ trở thành $\cos u+\cos v=2\cos\frac{u+v}{2}\cos\frac{u-v}{2}$.`,
            R`Tương tự, cộng $\sin(a+b)$ với $\sin(a-b)$ được $2\sin a\cos b$, và cùng phép đặt cho $\sin u+\sin v=2\sin\frac{u+v}{2}\cos\frac{u-v}{2}$.`,
          ],
        },
        { kind: "cach-lam", title: "Quan hệ giữa các công thức", text: R`Đặt $b=a$ trong công thức cộng thì được công thức nhân đôi. Cộng hoặc trừ hai công thức của $\cos(a+b)$ và $\cos(a-b)$ thì được công thức tích thành tổng. Chỉ cần nhớ công thức cộng, mọi công thức khác suy ra được.` },
        { kind: "luu-y", text: R`Nhầm lẫn hay gặp nhất là viết $\sin(a+b)=\sin a+\sin b$. Công thức này sai ngay cả với $a=b=30^\circ$: vế trái là $\sin 60^\circ\approx 0{,}866$ còn vế phải là $1$.` },
        { kind: "vi-du", text: R`Tính $\sin 75^\circ=\sin(45^\circ+30^\circ)=\frac{\sqrt{2}}{2}\cdot\frac{\sqrt{3}}{2}+\frac{\sqrt{2}}{2}\cdot\frac{1}{2}=\frac{\sqrt{6}+\sqrt{2}}{4}$. Số này xấp xỉ $0{,}966$.` },
      ],
    },
    {
      title: "Hàm số lượng giác",
      items: [
        {
          kind: "tinh-chat", title: "Sin và cosin",
          text: R`Hàm $y=\sin x$ và $y=\cos x$ có tập xác định $\mathbb{R}$, tập giá trị $[-1;1]$ và chu kì $2\pi$. Hàm sin là hàm lẻ nên đồ thị đối xứng qua gốc, hàm cosin là hàm chẵn nên đồ thị đối xứng qua trục tung.`,
          suy: [
            R`Đi quãng đường $x$ nào trên đường tròn cũng dừng ở một điểm, nên sin và cosin tính được với mọi $x$. Độ cao và vị trí ngang của điểm đó nằm giữa $-1$ và $1$, và điểm chạy qua mọi độ cao trong khoảng đó, nên tập giá trị là $[-1;1]$.`,
            R`Chu kì $2\pi$ là vì đi thêm một vòng thì trở về chỗ cũ. Tính lẻ của sin và tính chẵn của cosin chính là tính chất góc đối: $\sin(-x)=-\sin x$ và $\cos(-x)=\cos x$.`,
          ],
        },
        {
          kind: "tinh-chat", title: "Tang và cotang",
          text: R`Hàm $y=\tan x$ xác định khi $x\neq\frac{\pi}{2}+k\pi$, có tập giá trị $\mathbb{R}$ và chu kì $\pi$. Hàm $y=\cot x$ xác định khi $x\neq k\pi$. Đồ thị của chúng có vô số đường tiệm cận đứng.`,
          suy: [
            R`Tang là $\frac{\sin x}{\cos x}$ nên không tính được khi $\cos x=0$, tức khi điểm nằm ở đỉnh trên hoặc đỉnh dưới của đường tròn: $x=\frac{\pi}{2}+k\pi$. Cotang không tính được khi $\sin x=0$, tức $x=k\pi$.`,
            R`Chu kì là $\pi$ vì $\tan(x+\pi)=\tan x$, như đã thấy ở mục góc hơn kém nửa vòng.`,
            R`Khi $x$ tiến gần $\frac{\pi}{2}$, tử $\sin x$ gần $1$ còn mẫu $\cos x$ gần $0$, nên thương lớn tùy ý. Đồ thị vì thế vọt lên sát một đường thẳng đứng, và tang nhận được mọi giá trị thực.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Hàm sin tổng quát",
          text: R`Hàm $y=A\sin(\omega x+\varphi)+C$ có biên độ $|A|$, chu kì $\frac{2\pi}{|\omega|}$ và nhận giá trị từ $C-|A|$ đến $C+|A|$. Mọi bài toán dao động điều hòa đều quy về dạng này.`,
          suy: [
            R`Giá trị $\sin(\omega x+\varphi)$ chạy từ $-1$ đến $1$. Nhân với $A$ thì chạy từ $-|A|$ đến $|A|$, cộng thêm $C$ thì chạy từ $C-|A|$ đến $C+|A|$.`,
            R`Hàm lặp lại khi biểu thức trong sin tăng thêm đúng một vòng $2\pi$. Khi $x$ tăng thêm $T$, biểu thức đó tăng thêm $\omega T$. Cho $|\omega|T=2\pi$ được chu kì $T=\frac{2\pi}{|\omega|}$.`,
          ],
        },
        { kind: "vi-du", text: R`Hàm $y=3\sin 2x+1$ có chu kì $\frac{2\pi}{2}=\pi$, giá trị lớn nhất $4$ tại $x=\frac{\pi}{4}$ và giá trị nhỏ nhất $-2$ tại $x=\frac{3\pi}{4}$.` },
        { kind: "vi-du", text: R`Mực nước một cảng là $h=5+2\sin\frac{\pi t}{6}$ mét sau $t$ giờ. Chu kì là $\frac{2\pi}{\pi/6}=12$ giờ, nước cao nhất $7$ m lúc $t=3$ và thấp nhất $3$ m lúc $t=9$.` },
      ],
    },
    {
      title: "Phương trình lượng giác",
      items: [
        {
          kind: "cong-thuc", title: "Ba phương trình cơ bản",
          text: R`$\sin x=\sin\alpha$ khi $x=\alpha+k2\pi$ hoặc $x=\pi-\alpha+k2\pi$. $\cos x=\cos\alpha$ khi $x=\pm\alpha+k2\pi$. $\tan x=\tan\alpha$ khi $x=\alpha+k\pi$. Ở đây $k$ là số nguyên bất kì.`,
          suy: [
            R`Phương trình $\sin x=\sin\alpha$ đòi điểm ứng với $x$ có cùng độ cao với điểm ứng với $\alpha$. Trên đường tròn có hai điểm ở cùng một độ cao, đối xứng nhau qua trục tung: điểm ứng với $\alpha$ và điểm ứng với $\pi-\alpha$.`,
            R`Mỗi điểm trên đường tròn ứng với vô số góc, hơn kém nhau một số nguyên lần vòng, nên phải cộng thêm $k2\pi$ vào mỗi họ nghiệm.`,
            R`Phương trình $\cos x=\cos\alpha$ đòi cùng vị trí ngang. Hai điểm có cùng vị trí ngang đối xứng nhau qua trục hoành, ứng với $\alpha$ và $-\alpha$, nên $x=\pm\alpha+k2\pi$.`,
            R`Phương trình $\tan x=\tan\alpha$ đòi tia từ tâm có cùng độ dốc. Hai điểm đối diện nhau qua tâm cho cùng một độ dốc, và chúng cách nhau nửa vòng, nên $x=\alpha+k\pi$.`,
          ],
        },
        { kind: "cach-lam", title: "Phương trình sin x bằng một hằng số", text: R`Có nghiệm khi và chỉ khi $|m|\le 1$. Tìm một góc $\alpha$ có $\sin\alpha=m$ rồi viết hai họ nghiệm. Nếu $|m|>1$ thì vô nghiệm, đây là bẫy hay gặp ở bài đặt ẩn phụ.` },
        { kind: "cach-lam", title: "Đặt ẩn phụ", text: R`Với $2\sin^2x-\sin x-1=0$ đặt $t=\sin x$ với điều kiện $|t|\le 1$, được $2t^2-t-1=0$ nên $t=1$ hoặc $t=-\frac{1}{2}$. Từ đó $x=\frac{\pi}{2}+k2\pi$, hoặc $x=-\frac{\pi}{6}+k2\pi$, hoặc $x=\frac{7\pi}{6}+k2\pi$.` },
        { kind: "cach-lam", title: "Phương trình bậc nhất theo sin và cos", text: R`Chia hai vế cho $\sqrt{a^2+b^2}$ để đưa về dạng $\sin(x+\varphi)=\frac{c}{\sqrt{a^2+b^2}}$. Có nghiệm khi và chỉ khi $c^2\le a^2+b^2$. Chẳng hạn $\sin x+\cos x=\sqrt{2}$ có nghiệm $x=\frac{\pi}{4}+k2\pi$.` },
        { kind: "luu-y", title: "Điều kiện của tang và cotang", text: R`Phương trình chứa $\tan x$ cần $\cos x\neq 0$, chứa $\cot x$ cần $\sin x\neq 0$. Sau khi giải, loại những nghiệm làm mẫu bằng $0$, vì chúng có thể lọt vào khi biến đổi.` },
        { kind: "luu-y", text: R`Không trộn độ và radian trong cùng một họ nghiệm. Nếu đề cho góc theo độ thì viết $x=60^\circ+k360^\circ$, nếu theo radian thì viết $x=\frac{\pi}{3}+k2\pi$.` },
        { kind: "vi-du", text: R`Phương trình $\cos x=\frac{1}{2}$ cho $x=\pm\frac{\pi}{3}+k2\pi$. Phương trình $\sin x=\frac{\sqrt{3}}{2}$ cho $x=\frac{\pi}{3}+k2\pi$ hoặc $x=\frac{2\pi}{3}+k2\pi$. Phương trình $\tan x=1$ cho $x=\frac{\pi}{4}+k\pi$.` },
      ],
    },
    {
      title: "Hệ thức lượng trong tam giác",
      items: [
        {
          kind: "dinh-ly", title: "Định lí cosin",
          text: R`Trong tam giác $ABC$ có $a^2=b^2+c^2-2bc\cos A$. Khi $A=90^\circ$ thì $\cos A=0$ và công thức trở thành định lí Pythagore.`,
          suy: [
            R`Đặt đỉnh $A$ ở gốc tọa độ và cạnh $AB$ nằm dọc trục hoành, khi đó $B(c;0)$. Đỉnh $C$ cách $A$ một khoảng $b$ theo hướng góc $A$, nên $C(b\cos A;\,b\sin A)$.`,
            R`Tính bình phương khoảng cách $BC$: $a^2=(b\cos A-c)^2+(b\sin A)^2=b^2\cos^2A-2bc\cos A+c^2+b^2\sin^2A$.`,
            R`Gom $b^2\cos^2A+b^2\sin^2A=b^2$ nhờ hệ thức cơ bản, được $a^2=b^2+c^2-2bc\cos A$.`,
          ],
        },
        {
          kind: "dinh-ly", title: "Định lí sin",
          text: R`$\frac{a}{\sin A}=\frac{b}{\sin B}=\frac{c}{\sin C}=2R$ với $R$ là bán kính đường tròn ngoại tiếp. Tỉ số giữa mỗi cạnh và sin của góc đối diện không đổi.`,
          suy: [
            R`Kẻ đường cao từ $C$ xuống cạnh $AB$, gọi độ dài là $h$. Trong tam giác vuông chứa góc $A$ có $h=b\sin A$, trong tam giác vuông chứa góc $B$ có $h=a\sin B$. Khi một góc tù, kết quả vẫn đúng vì hai góc bù nhau có cùng sin.`,
            R`Vậy $b\sin A=a\sin B$, tức $\frac{a}{\sin A}=\frac{b}{\sin B}$. Kẻ đường cao từ đỉnh khác được đẳng thức với $\frac{c}{\sin C}$.`,
            R`Tỉ số chung bằng $2R$: vẽ đường kính $BD$ của đường tròn ngoại tiếp. Tam giác $BCD$ vuông tại $C$ vì góc nội tiếp chắn nửa đường tròn là góc vuông, và góc $D$ bằng góc $A$ vì cùng chắn cung $BC$. Do đó $a=BC=BD\sin D=2R\sin A$.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Diện tích",
          text: R`Diện tích tam giác là $S=\frac{1}{2}bc\sin A$, cũng bằng $\frac{abc}{4R}$. Công thức đầu dùng khi biết hai cạnh và góc xen giữa.`,
          suy: [
            R`Diện tích tam giác bằng nửa đáy nhân chiều cao. Lấy đáy là $AB=c$; chiều cao hạ từ $C$ là $h=b\sin A$. Vậy $S=\frac{1}{2}\cdot c\cdot b\sin A$.`,
            R`Theo định lí sin, $\sin A=\frac{a}{2R}$. Thay vào được $S=\frac{1}{2}bc\cdot\frac{a}{2R}=\frac{abc}{4R}$.`,
          ],
        },
        { kind: "cach-lam", title: "Chọn định lí nào", text: R`Biết hai cạnh và góc xen giữa thì dùng cosin để tìm cạnh thứ ba. Biết ba cạnh thì dùng cosin để tìm góc. Biết hai góc và một cạnh, hoặc hai cạnh và góc đối với một cạnh đó, thì dùng sin.` },
        { kind: "vi-du", text: R`Tam giác có $b=3$, $c=4$, $A=60^\circ$ thì $a^2=9+16-2\cdot 12\cdot\frac{1}{2}=13$, nên $a=\sqrt{13}$. Diện tích là $\frac{1}{2}\cdot 3\cdot 4\cdot\sin 60^\circ=3\sqrt{3}$.` },
        { kind: "vi-du", text: R`Đứng cách gốc cây $20$ m, nhìn ngọn cây dưới góc $30^\circ$ so với phương ngang, mắt cao $1{,}5$ m. Chiều cao cây là $1{,}5+20\tan 30^\circ=1{,}5+\frac{20\sqrt{3}}{3}\approx 13{,}05$ m.` },
      ],
    },
  ],
  canNho: [
    R`Trên đường tròn đơn vị, $\cos\alpha$ là hoành độ và $\sin\alpha$ là tung độ; $\pi$ rad $=180^\circ$.`,
    R`Hệ thức cơ bản: $\sin^2\alpha+\cos^2\alpha=1$ và $1+\tan^2\alpha=\frac{1}{\cos^2\alpha}$.`,
    R`Bảng $\sin$ của $0^\circ,30^\circ,45^\circ,60^\circ,90^\circ$: $0,\frac{1}{2},\frac{\sqrt{2}}{2},\frac{\sqrt{3}}{2},1$; cos là dãy ngược lại.`,
    R`Góc bù: cùng sin, đối cos. Góc phụ: sin bằng cos của góc kia. Góc hơn kém $\pi$: $\sin$ và $\cos$ đổi dấu, $\tan$ giữ nguyên.`,
    R`Công thức cộng là gốc: $\sin(a\pm b)=\sin a\cos b\pm\cos a\sin b$; từ đó suy ra nhân đôi và tích thành tổng.`,
    R`Phương trình: $\sin x=\sin\alpha$ cho hai họ nghiệm, $\cos x=\cos\alpha$ cho $x=\pm\alpha+k2\pi$, $\tan x=\tan\alpha$ cho $x=\alpha+k\pi$.`,
    R`Đặt ẩn phụ $t=\sin x$ hoặc $\cos x$ thì phải có $|t|\le 1$.`,
    R`Định lí cosin $a^2=b^2+c^2-2bc\cos A$ và định lí sin $\frac{a}{\sin A}=2R$; diện tích $S=\frac{1}{2}bc\sin A$.`,
  ],
  lienQuan: [
    { id: "triangle", vi: R`Định lí cosin và công thức diện tích dùng cho mọi tam giác trong chuyên đề Hình phẳng và không gian.` },
    { id: "vector", vi: R`Tích vô hướng $\vec{a}\cdot\vec{b}=|\vec{a}||\vec{b}|\cos\varphi$ cho góc giữa hai vectơ bằng chính $\cos$ ở đây.` },
    { id: "limit", vi: R`Giới hạn $\lim_{x\to 0}\frac{\sin x}{x}=1$ là giới hạn đặc biệt đầu tiên, và là cơ sở của đạo hàm hàm lượng giác.` },
  ],
  checks: [
    { expr: "sin(pi/3)", expect: "sqrt(3)/2" },
    { expr: "cos(pi/3)", expect: "1/2" },
    { expr: "tan(pi/4)", expect: "1" },
    { expr: "tan(pi/3)", expect: "sqrt(3)" },
    { expr: "tan(pi/6)", expect: "sqrt(3)/3" },
    { expr: "6*pi/3", expect: "2*pi" },
    { expr: "floor(100*2*pi)", expect: "628" },
    { expr: "sqrt(1-Rational(3,5)**2)", expect: "Rational(4,5)" },
    { expr: "Rational(3,5)/Rational(4,5)", expect: "Rational(3,4)" },
    { expr: "sin(5*pi/6)", expect: "1/2" },
    { expr: "cos(2*pi/3)", expect: "-1/2" },
    { expr: "sin(7*pi/6)", expect: "-1/2" },
    { expr: "sin(pi/6)**2+cos(pi/6)**2", expect: "1" },
    { expr: "simplify(1+tan(a)**2-1/cos(a)**2)", expect: "0" },
    { expr: "simplify(expand_trig(sin(2*a))-2*sin(a)*cos(a))", expect: "0" },
    { expr: "simplify(expand_trig(cos(2*a))-(2*cos(a)**2-1))", expect: "0" },
    { expr: "simplify(expand_trig(sin(a+b))-(sin(a)*cos(b)+cos(a)*sin(b)))", expect: "0" },
    { expr: "simplify(expand_trig(cos(a-b))-(cos(a)*cos(b)+sin(a)*sin(b)))", expect: "0" },
    { expr: "simplify(cos(a)*cos(b)-expand_trig(cos(a-b)+cos(a+b))/2)", expect: "0" },
    { expr: "simplify(sin(5*pi/12)-(sqrt(6)+sqrt(2))/4)", expect: "0" },
    { expr: "floor(1000*sin(5*pi/12))", expect: "965" },
    { expr: "3*sin(2*(pi/4))+1", expect: "4" },
    { expr: "3*sin(2*(3*pi/4))+1", expect: "-2" },
    { expr: "2*pi/2", expect: "pi" },
    { expr: "5+2*sin(pi*3/6)", expect: "7" },
    { expr: "5+2*sin(pi*9/6)", expect: "3" },
    { expr: "2*pi/(pi/6)", expect: "12" },
    { expr: "solve(2*t**2-t-1, t)", expect: "[-1/2, 1]" },
    { expr: "sin(-pi/6)", expect: "-1/2" },
    { expr: "sin(pi/4)+cos(pi/4)", expect: "sqrt(2)" },
    { expr: "9+16-2*3*4*cos(pi/3)", expect: "13" },
    { expr: "Rational(1,2)*3*4*sin(pi/3)", expect: "3*sqrt(3)" },
    { expr: "floor(1000*(Rational(3,2)+20*tan(pi/6)))", expect: "13047" },
  ],
};
