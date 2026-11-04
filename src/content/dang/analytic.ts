import type { TopicDang } from "./types.ts";

const R = String.raw;

export const analyticDang: TopicDang = {
  id: "analytic",
  title: "Hình học không gian Oxyz",
  dang: [
    {
      name: "Khoảng cách từ điểm đến mặt phẳng",
      nhanDang: "Cho một điểm và một mặt phẳng $ax+by+cz+d=0$ trong không gian, hỏi khoảng cách.",
      phuongPhap: R`Khoảng cách bằng $\frac{|ax_0+by_0+cz_0+d|}{\sqrt{a^2+b^2+c^2}}$. Mẫu khác $0$ vì $(a;b;c)$ là một pháp tuyến, không phải vectơ không. Trị tuyệt đối ở tử là cần để khoảng cách không âm. Bỏ trị tuyệt đối chỉ ra một số có dấu, chưa phải khoảng cách.`,
      viDu: {
        prompt: R`Tính khoảng cách từ $A(1;2;3)$ đến mặt phẳng $2x-y+2z-3=0$.`,
        steps: [
          { claim: R`Tử là $|2\cdot 1-2+2\cdot 3-3|=|3|=3$.`, why: "Thay đủ ba tọa độ của điểm vào biểu thức mặt phẳng, rồi lấy trị tuyệt đối." },
          { claim: R`Mẫu là $\sqrt{2^2+(-1)^2+2^2}=\sqrt{9}=3$.`, why: "Đây là độ dài pháp tuyến. Pháp tuyến khác vectơ không nên mẫu hợp lệ." },
          { claim: R`Khoảng cách bằng $\frac{3}{3}=1$.`, why: "Công thức khoảng cách điểm đến mặt phẳng cho đúng thương này." },
        ],
        ket: "Khoảng cách bằng $1$.",
        checks: [{ expr: "Abs(2*1-2+2*3-3)/sqrt(4+1+4)", expect: "1" }],
      },
      loi: "Bỏ trị tuyệt đối, hoặc lấy mẫu là tổng hệ số thay vì căn tổng bình phương.",
      luyen: {
        kind: "luyen",
        prompt: R`Tính khoảng cách từ gốc $O$ đến mặt phẳng $2x+y-2z-6=0$.`,
        think: "Đây vẫn là khoảng cách điểm đến mặt phẳng trong không gian. Tử lấy trị tuyệt đối của hằng số, mẫu là độ dài pháp tuyến $(2;1;-2)$.",
        answer: R`Đáp số là $2$.`,
        steps: [
          { claim: R`Tử bằng $|-6|=6$, mẫu bằng $\sqrt{4+1+4}=3$.`, why: "Điểm gốc làm mất các hạng tử bậc nhất. Pháp tuyến khác vectơ không." },
          { claim: R`Thương bằng $\frac{6}{3}=2$.`, why: "Công thức khoảng cách cho một số không âm." },
        ],
        checks: [{ expr: "Abs(-6)/sqrt(4+1+4)", expect: "2" }],
      },
    },
    {
      name: "Tích vô hướng",
      nhanDang: "Cho hai vectơ trong không gian, hỏi tích vô hướng, góc hoặc sự vuông góc.",
      phuongPhap: R`Tích vô hướng của $(a;b;c)$ và $(a';b';c')$ là $aa'+bb'+cc'$. Hai vectơ khác $\vec 0$ vuông góc khi và chỉ khi tích này bằng $0$. Nếu tích khác $0$ thì chưa kết luận được góc nhọn hay tù cho đến khi xét dấu. Phải nhân đúng từng cặp tọa độ cùng vị trí.`,
      viDu: {
        prompt: R`Xét $\vec u=(1;2;-1)$ và $\vec v=(2;1;4)$. Hai vectơ có vuông góc không?`,
        steps: [
          { claim: R`Tích vô hướng bằng $1\cdot 2+2\cdot 1+(-1)\cdot 4=2+2-4=0$.`, why: "Nhân từng cặp hoành độ, tung độ và cao độ, rồi cộng." },
          { claim: R`Cả hai vectơ đều khác $\vec 0$, và tích bằng $0$.`, why: "Điều kiện cần và đủ của vuông góc là tích vô hướng bằng $0$ khi không vectơ nào bằng không." },
        ],
        ket: "Hai vectơ vuông góc.",
        checks: [{ expr: "1*2+2*1+(-1)*4", expect: "0" }],
      },
      loi: "Kết luận vuông góc khi chỉ một tọa độ triệt tiêu, chưa cộng đủ ba số hạng.",
      luyen: {
        kind: "luyen",
        prompt: R`Tính tích vô hướng của $(1;0;2)$ và $(2;1;-1)$.`,
        think: "Nhân đúng cặp cùng loại. Dấu âm ở cao độ phải được giữ.",
        answer: R`Đáp số là $0$, nên hai vectơ vuông góc.`,
        steps: [
          { claim: R`Tích bằng $1\cdot 2+0\cdot 1+2\cdot(-1)=2-2=0$.`, why: "Ba số hạng được cộng đủ. Số hạng giữa bằng $0$ nhưng vẫn phải viết." },
          { claim: R`Tích bằng $0$ và không vectơ nào là vectơ không.`, why: "Điều kiện đủ của vuông góc được thỏa." },
        ],
        checks: [{ expr: "1*2+0*1+2*(-1)", expect: "0" }],
      },
    },
    {
      name: "Phương trình mặt phẳng",
      nhanDang: "Cho một điểm và một pháp tuyến, hoặc hỏi viết phương trình mặt phẳng.",
      phuongPhap: R`Mặt phẳng qua $M(x_0;y_0;z_0)$ với pháp tuyến $\vec n=(a;b;c)\neq\vec 0$ có phương trình $a(x-x_0)+b(y-y_0)+c(z-z_0)=0$. Điểm $M$ thỏa phương trình là điều kiện cần và đủ để mặt phẳng đi qua $M$. Vectơ $\vec n$ khác không là điều kiện để phương trình thực sự là mặt phẳng.`,
      viDu: {
        prompt: R`Viết phương trình mặt phẳng qua $M(1;2;0)$, pháp tuyến $(1;-1;2)$.`,
        steps: [
          { claim: R`Phương trình là $1(x-1)-1(y-2)+2(z-0)=0$.`, why: "Mỗi hệ số pháp tuyến nhân với hiệu tọa độ tương ứng." },
          { claim: R`Khai triển được $x-y+2z+1=0$.`, why: "Thu gọn hằng số: $-1+2=1$. Pháp tuyến $(1;-1;2)$ khác vectơ không." },
          { claim: R`Thay $M$ được $1-2+0+1=0$.`, why: "Điểm đã cho phải nghiệm đúng phương trình. Phép thử này xác nhận mặt phẳng đi qua $M$." },
        ],
        ket: R`Mặt phẳng có phương trình $x-y+2z+1=0$.`,
        checks: [
          { expr: "1*(1-1)+(-1)*(2-2)+2*(0-0)", expect: "0" },
          { expr: "1-2+0+1", expect: "0" },
        ],
      },
      loi: "Quên đổi dấu khi chuyển điểm sang vế kia, nên mặt phẳng không đi qua điểm đã cho.",
      luyen: {
        kind: "luyen",
        prompt: R`Viết mặt phẳng qua gốc $O$ với pháp tuyến $(1;2;2)$.`,
        think: "Điểm $(0;0;0)$ làm mất các hằng số trừ khi pháp tuyến tạo ra số hạng tự do. Ở đây số hạng tự do bằng $0$.",
        answer: R`Đáp số là $x+2y+2z=0$.`,
        steps: [
          { claim: R`Phương trình là $x+2y+2z=0$.`, why: "Mặt phẳng qua gốc có dạng $ax+by+cz=0$ với $(a;b;c)$ là pháp tuyến khác không." },
          { claim: R`Gốc thỏa $0+0+0=0$.`, why: "Thử lại điểm. Pháp tuyến $(1;2;2)$ khác vectơ không." },
        ],
        checks: [{ expr: "1*0+2*0+2*0", expect: "0" }],
      },
    },
    {
      name: "Đường thẳng trong không gian",
      nhanDang: "Cho một điểm và một vectơ chỉ phương, hỏi phương trình tham số của đường thẳng.",
      phuongPhap: R`Đường thẳng qua $A(x_0;y_0;z_0)$ với vectơ chỉ phương $\vec u=(a;b;c)\neq\vec 0$ có phương trình tham số $x=x_0+at$, $y=y_0+bt$, $z=z_0+ct$. Mỗi giá trị $t$ cho đúng một điểm. Vectơ $\vec u$ khác không là điều kiện cần và đủ để ba phương trình này là một đường thẳng.`,
      viDu: {
        prompt: R`Viết phương trình tham số của đường thẳng qua $A(1;0;2)$, chỉ phương $(1;-1;1)$.`,
        steps: [
          { claim: R`Ba phương trình là $x=1+t$, $y=-t$, $z=2+t$.`, why: "Cộng từng tọa độ của điểm với tham số nhân tọa độ chỉ phương." },
          { claim: R`Khi $t=0$ được đúng điểm $A(1;0;2)$.`, why: "Đường phải đi qua điểm đã cho. Giá trị $t=0$ là phép thử." },
          { claim: R`Chỉ phương $(1;-1;1)$ khác vectơ không.`, why: "Nếu chỉ phương bằng không thì ba phương trình chỉ cho một điểm, không phải đường thẳng." },
        ],
        ket: R`Phương trình tham số là $x=1+t$, $y=-t$, $z=2+t$.`,
        checks: [
          { expr: "1+0", expect: "1" },
          { expr: "-0", expect: "0" },
          { expr: "2+0", expect: "2" },
          { expr: "1**2+(-1)**2+1**2", expect: "3" },
        ],
      },
      loi: "Lấy hiệu hai điểm rồi quên rằng hiệu đó là chỉ phương, không phải một điểm nằm trên đường.",
      luyen: {
        kind: "luyen",
        prompt: R`Đường thẳng qua $O(0;0;0)$ và $B(1;2;2)$ có phương trình tham số nào?`,
        think: "Chỉ phương là hiệu tọa độ $B-O$. Điểm mốc có thể lấy $O$, ứng với tham số $0$.",
        answer: R`Đáp số là $x=t$, $y=2t$, $z=2t$.`,
        steps: [
          { claim: R`Chỉ phương là $(1-0;2-0;2-0)=(1;2;2)$.`, why: "Trừ tọa độ từng thành phần. Hiệu này khác vectơ không vì $B$ khác $O$." },
          { claim: R`Lấy mốc $O$ được $x=t$, $y=2t$, $z=2t$.`, why: "Khi $t=1$ được đúng điểm $B$, nên đường đi qua cả hai điểm." },
        ],
        checks: [{ expr: "1**2+2**2+2**2", expect: "9" }],
      },
    },
    {
      name: "Vị trí tương đối của đường thẳng và mặt phẳng",
      nhanDang: "Cho một đường tham số và một mặt phẳng, hỏi cắt, song song hay nằm trong.",
      phuongPhap: R`Gọi $\vec u$ là chỉ phương và $\vec n$ là pháp tuyến. Nếu $\vec u\cdot\vec n\neq 0$ thì đường cắt mặt phẳng tại đúng một điểm. Nếu tích bằng $0$, đường song song với mặt phẳng hoặc nằm trong mặt phẳng. Muốn phân biệt hai trường hợp này phải thử một điểm của đường: điểm thuộc mặt phẳng thì cả đường nằm trong, điểm không thuộc thì song song và không cắt. Tích bằng $0$ mới chỉ là điều kiện cần của song song.`,
      viDu: {
        prompt: R`Xét đường $x=t$, $y=t$, $z=t$ và mặt phẳng $x+y+z-3=0$.`,
        steps: [
          { claim: R`Chỉ phương $(1;1;1)$ và pháp tuyến $(1;1;1)$ có tích vô hướng bằng $3\neq 0$.`, why: "Tích khác $0$ là điều kiện đủ để đường cắt mặt phẳng tại đúng một điểm." },
          { claim: R`Thay vào mặt phẳng được $3t-3=0$, nên $t=1$.`, why: "Phương trình theo $t$ có đúng một nghiệm vì hệ số của $t$ khác $0$." },
          { claim: R`Điểm cắt là $(1;1;1)$.`, why: "Thay $t=1$ vào phương trình đường. Điểm này thỏa $1+1+1-3=0$." },
        ],
        ket: R`Đường cắt mặt phẳng tại đúng một điểm $(1;1;1)$.`,
        checks: [
          { expr: "1*1+1*1+1*1", expect: "3" },
          { expr: "1+1+1-3", expect: "0" },
        ],
      },
      loi: "Thấy tích vô hướng bằng $0$ rồi kết luận song song, không thử điểm nên bỏ sót trường hợp đường nằm trong mặt phẳng.",
      luyen: {
        kind: "luyen",
        prompt: R`Đường $x=t$, $y=0$, $z=0$ và mặt phẳng $z-1=0$ có vị trí nào?`,
        think: "Tính tích chỉ phương với pháp tuyến. Nếu bằng $0$, hãy thử điểm $(0;0;0)$ có nằm trên mặt phẳng hay không.",
        answer: "Đường song song với mặt phẳng và không cắt mặt phẳng.",
        steps: [
          { claim: R`Chỉ phương $(1;0;0)$ và pháp tuyến $(0;0;1)$ có tích bằng $0$.`, why: "Đây là điều kiện cần của song song. Chưa đủ để biết đường có nằm trong mặt phẳng hay không." },
          { claim: R`Điểm $(0;0;0)$ cho $0-1=-1\neq 0$.`, why: "Một điểm của đường không thuộc mặt phẳng, nên cả đường không nằm trong mặt phẳng. Kết luận là song song và không cắt." },
        ],
        checks: [
          { expr: "1*0+0*0+0*1", expect: "0" },
          { expr: "0-1", expect: "-1" },
        ],
      },
    },
    {
      name: "Góc giữa hai mặt phẳng",
      nhanDang: "Cho hai mặt phẳng, hỏi góc giữa chúng.",
      phuongPhap: R`Góc $\varphi$ giữa hai mặt phẳng là góc giữa hai pháp tuyến, lấy trong $[0;\frac{\pi}{2}]$. Côsin của góc này bằng $\frac{|\vec n_1\cdot\vec n_2|}{|\vec n_1|\,|\vec n_2|}$. Trị tuyệt đối bảo đảm côsin không âm, nên góc không vượt quá góc vuông. Hai pháp tuyến phải khác vectơ không.`,
      viDu: {
        prompt: R`Tính góc giữa mặt phẳng $z=0$ và mặt phẳng $x+z=0$.`,
        steps: [
          { claim: R`Hai pháp tuyến là $(0;0;1)$ và $(1;0;1)$.`, why: "Hệ số của phương trình chính là tọa độ một pháp tuyến. Cả hai đều khác vectơ không." },
          { claim: R`Tích vô hướng bằng $1$, độ dài bằng $1$ và $\sqrt{2}$.`, why: "Tử của công thức côsin là trị tuyệt đối của tích, mẫu là tích hai độ dài." },
          { claim: R`Côsin bằng $\frac{1}{\sqrt{2}}$, nên góc bằng $\frac{\pi}{4}$.`, why: "Góc giữa hai mặt phẳng lấy trong khoảng từ $0$ đến góc vuông, và côsin dương này ứng với $\\frac{\\pi}{4}$." },
        ],
        ket: R`Góc giữa hai mặt phẳng bằng $\frac{\pi}{4}$.`,
        checks: [
          { expr: "Abs(0*1+0*0+1*1)/(1*sqrt(2))", expect: "1/sqrt(2)" },
          { expr: "cos(pi/4)", expect: "1/sqrt(2)" },
        ],
      },
      loi: "Bỏ trị tuyệt đối nên nhận một góc tù làm góc giữa hai mặt phẳng.",
      luyen: {
        kind: "luyen",
        prompt: R`Góc giữa hai mặt phẳng $x=0$ và $y=0$ bằng bao nhiêu?`,
        think: "Pháp tuyến là $(1;0;0)$ và $(0;1;0)$. Tích vô hướng bằng $0$ thì góc là góc vuông.",
        answer: R`Đáp số là $\frac{\pi}{2}$.`,
        steps: [
          { claim: R`Tích vô hướng của hai pháp tuyến bằng $0$.`, why: "Hai vectơ đơn vị trên hai trục tọa độ vuông góc nhau." },
          { claim: R`Côsin bằng $0$, nên góc bằng $\frac{\pi}{2}$.`, why: "Trong khoảng từ $0$ đến góc vuông, côsin bằng $0$ chỉ tại góc vuông." },
        ],
        checks: [{ expr: "1*0+0*1+0*0", expect: "0" }],
      },
    },
    {
      name: "Tâm và bán kính mặt cầu",
      nhanDang: "Phương trình bậc hai $x^2+y^2+z^2+ax+by+cz+d=0$, hỏi tâm và bán kính.",
      phuongPhap: R`Đưa về $(x-x_0)^2+(y-y_0)^2+(z-z_0)^2=R^2$. Tâm có hoành độ $-\frac{a}{2}$ khi hệ số của $x$ là $a$, và tương tự cho tung độ, cao độ. Bán kính dương khi và chỉ khi vế phải dương. Vế phải bằng $0$ là một điểm, vế phải âm thì không có mặt cầu.`,
      viDu: {
        prompt: R`Tìm tâm và bán kính của $x^2+y^2+z^2-2x+4y-4=0$.`,
        steps: [
          { claim: R`Tách bình phương được $(x-1)^2+(y+2)^2+z^2=9$.`, why: "Hệ số của $x$ là $-2$ nên hoành độ tâm bằng $1$. Hệ số của $y$ là $4$ nên tung độ tâm bằng $-2$. Cao độ tâm bằng $0$." },
          { claim: R`Vế phải $9>0$, nên bán kính bằng $3$ và tâm là $(1;-2;0)$.`, why: "Điều kiện đủ để có mặt cầu bán kính dương. Căn không âm của $9$ là $3$." },
        ],
        ket: R`Tâm $(1;-2;0)$, bán kính $3$.`,
        checks: [{ expr: "sqrt(1+4+4)", expect: "3" }],
      },
      loi: "Lấy tâm là $(a;b;c)$ thay vì đổi dấu và chia đôi.",
      luyen: {
        kind: "luyen",
        prompt: R`Mặt cầu $(x-2)^2+(y+1)^2+(z-2)^2=9$ có bán kính bao nhiêu?`,
        think: "Dạng chính tắc cho bán kính là căn của vế phải, với điều kiện vế phải dương.",
        answer: R`Đáp số là $3$.`,
        steps: [
          { claim: R`Vế phải bằng $9>0$.`, why: "Điều kiện đủ để khai căn số học và kết luận có mặt cầu." },
          { claim: R`Bán kính bằng $\sqrt{9}=3$.`, why: "Bán kính lấy giá trị không âm." },
        ],
        checks: [{ expr: "sqrt(9)", expect: "3" }],
      },
    },
    {
      name: "Hình chiếu vuông góc",
      nhanDang: "Cho một điểm và một mặt phẳng tọa độ hoặc một mặt phẳng đơn giản, hỏi hình chiếu.",
      phuongPhap: R`Hình chiếu vuông góc của điểm lên một mặt phẳng là chân đường vuông góc kẻ từ điểm đó. Với mặt phẳng $z=0$, đường vuông góc song song trục cao độ, nên hoành độ và tung độ giữ nguyên, cao độ của hình chiếu bằng $0$. Với mặt phẳng $x=0$, hoành độ của hình chiếu bằng $0$. Phải đổi đúng tọa độ ứng với pháp tuyến, không đổi nhầm trục.`,
      viDu: {
        prompt: R`Tìm hình chiếu vuông góc của $A(2;3;4)$ lên mặt phẳng $z=0$.`,
        steps: [
          { claim: R`Pháp tuyến của $z=0$ là $(0;0;1)$.`, why: "Đường vuông góc từ $A$ xuống mặt phẳng song song với pháp tuyến này, nên chỉ cao độ thay đổi." },
          { claim: R`Hình chiếu là $H(2;3;0)$.`, why: "Hoành độ và tung độ của $A$ được giữ. Cao độ bằng $0$ vì $H$ phải nằm trên mặt phẳng." },
          { claim: R`Đoạn $AH$ có độ dài $4$, trùng khoảng cách từ $A$ đến mặt phẳng.`, why: "Khoảng cách bằng $|4|/1=4$. Hình chiếu đúng khi đoạn nối vuông góc và chân nằm trên mặt phẳng." },
        ],
        ket: R`Hình chiếu là $H(2;3;0)$.`,
        checks: [
          { expr: "Abs(4)/1", expect: "4" },
          { expr: "(2-2)**2+(3-3)**2+(4-0)**2", expect: "16" },
        ],
      },
      loi: "Đổi cả ba tọa độ về $0$, thay vì chỉ đổi tọa độ theo pháp tuyến.",
      luyen: {
        kind: "luyen",
        prompt: R`Tìm hình chiếu vuông góc của $B(3;1;2)$ lên mặt phẳng $x=0$.`,
        think: "Pháp tuyến của $x=0$ là trục hoành. Chỉ hoành độ của hình chiếu bằng $0$.",
        answer: R`Đáp số là $(0;1;2)$.`,
        steps: [
          { claim: R`Điểm hình chiếu có hoành độ $0$, tung độ $1$ và cao độ $2$.`, why: "Chân đường vuông góc nằm trên mặt phẳng $x=0$ và hai tọa độ còn lại trùng điểm đã cho." },
          { claim: R`Độ dài đoạn nối bằng $3$, đúng bằng khoảng cách đến mặt phẳng.`, why: "Khoảng cách từ $B$ đến $x=0$ là $|3|$. Phép thử này xác nhận hình chiếu." },
        ],
        checks: [{ expr: "Abs(3)", expect: "3" }],
      },
    },
  ],
  sangTao: [
    {
      kind: "thuc-te",
      sao: 2,
      prompt: R`Số liệu giả định. Radar đặt tại gốc tọa độ, đơn vị kilômét. Máy bay ở $(2;3;6)$, cao độ $z=6$ kilômét so với radar. Khoảng cách nghiêng từ radar đến máy bay bằng bao nhiêu?`,
      think: "Cao độ $z$ là tọa độ thứ ba, khác $0$. Khoảng cách là độ dài vectơ từ gốc đến điểm, gồm đủ ba bình phương.",
      answer: "Đáp số là $7$ kilômét; máy bay cách radar $7$ kilômét theo đường nghiêng.",
      steps: [
        { claim: R`Vectơ từ radar đến máy bay là $(2;3;6)$.`, why: "Cao độ $z=6$ kilômét được giữ trong tọa độ thứ ba, không bị thay bằng $0$." },
        { claim: R`Độ dài bằng $\sqrt{4+9+36}=\sqrt{49}=7$.`, why: "Tổng ba bình phương bằng $49$, là số chính phương. Đơn vị là kilômét." },
      ],
      checks: [{ expr: "sqrt(2**2+3**2+6**2)", expect: "7" }],
    },
    {
      kind: "thuc-te",
      sao: 2,
      prompt: R`Số liệu giả định. Một bức tường phẳng có phương trình $x+2y+2z-6=0$, đơn vị mét. Khoảng cách từ đèn tại $(1;1;1)$ đến tường bằng bao nhiêu?`,
      think: "Dùng công thức điểm đến mặt phẳng. Nhớ trị tuyệt đối và độ dài pháp tuyến $(1;2;2)$.",
      answer: R`Đáp số là $\frac{1}{3}$ mét; đèn cách tường đúng bằng khoảng đó.`,
      steps: [
        { claim: R`Tử bằng $|1+2+2-6|=1$.`, why: "Thay đủ ba tọa độ của đèn vào phương trình tường." },
        { claim: R`Mẫu bằng $\sqrt{1+4+4}=3$, thương bằng $\frac{1}{3}$.`, why: "Pháp tuyến khác vectơ không. Đơn vị của khoảng cách là mét." },
      ],
      checks: [{ expr: "Abs(1+2+2-6)/sqrt(1+4+4)", expect: "Rational(1,3)" }],
    },
    {
      kind: "thuc-te",
      sao: 2,
      prompt: R`Số liệu giả định. Một quả cầu tâm $(0;0;0)$ có bán kính $5$ mét. Điểm $(3;4;0)$ nằm trong, trên hay ngoài quả cầu?`,
      think: "So bình phương khoảng cách tới tâm với bình phương bán kính, để khỏi làm tròn căn.",
      answer: "Điểm nằm trên quả cầu, vì bình phương khoảng cách bằng $25$ mét vuông, đúng bằng bình phương bán kính.",
      steps: [
        { claim: R`Ta có $3^2+4^2+0^2=25$ và $R^2=25$.`, why: "Cao độ bằng $0$ mét nghĩa là điểm cùng cao độ với tâm, không có nghĩa là bỏ tọa độ đó khi bình phương." },
        { claim: R`Hai bình phương bằng nhau, nên điểm thuộc mặt cầu.`, why: "Với tâm ở gốc, đây là điều kiện cần và đủ để điểm nằm trên quả cầu." },
      ],
      checks: [{ expr: "9+16+0", expect: "25" }],
    },
    {
      kind: "thuc-te",
      sao: 2,
      prompt: R`Số liệu giả định. Đường ống thẳng đi qua $A(0;0;0)$ và $B(1;2;2)$, đơn vị mét. Độ dài đoạn ống $AB$ bằng bao nhiêu?`,
      think: "Độ dài đoạn là độ dài vectơ hiệu. Trừ từng tọa độ, gồm cả cao độ.",
      answer: "Đáp số là $3$ mét; đoạn ống dài đúng $3$ mét.",
      steps: [
        { claim: R`Vectơ $\overrightarrow{AB}=(1-0;2-0;2-0)=(1;2;2)$.`, why: "Trừ tọa độ từng thành phần. Không chỉ trừ tung độ." },
        { claim: R`Độ dài bằng $\sqrt{1+4+4}=3$.`, why: "Tổng bình phương bằng $9$. Đơn vị là mét." },
      ],
      checks: [{ expr: "sqrt(1+4+4)", expect: "3" }],
    },
    {
      kind: "mo",
      sao: 3,
      prompt: "Hãy nêu một mặt phẳng cách gốc tọa độ đúng $2$ đơn vị, rồi kiểm lại bằng công thức khoảng cách. Có nhiều mặt phẳng đúng.",
      think: "Chọn pháp tuyến có độ dài nguyên và chọn hằng số sao cho trị tuyệt đối của hằng số chia cho độ dài ấy bằng $2$.",
      answer: R`Một mặt phẳng đúng là $2x+y-2z-6=0$. Khoảng cách từ gốc bằng $2$.`,
      steps: [
        { claim: R`Pháp tuyến $(2;1;-2)$ có độ dài $3$, hằng số $-6$ có trị tuyệt đối $6$.`, why: "Thương $\\frac{6}{3}$ bằng $2$. Đây là một lựa chọn, không phải lựa chọn duy nhất." },
        { claim: R`Công thức khoảng cách cho $\frac{|-6|}{3}=2$.`, why: "Phép thử lại xác nhận mặt phẳng vừa nêu thỏa yêu cầu." },
      ],
      checks: [{ expr: "Abs(-6)/sqrt(4+1+4)", expect: "2" }],
    },
    {
      kind: "phan-bien",
      sao: 3,
      prompt: R`Bạn A nói điểm $(3;4;0)$ nằm trong quả cầu tâm $O$ bán kính $5$ vì hoành độ $3$ nhỏ hơn $5$. Hãy phản biện.`,
      think: "Một tọa độ nhỏ hơn bán kính chưa đủ. Phải so bình phương khoảng cách với bình phương bán kính.",
      answer: "Lập luận chưa đúng. Điểm nằm trên quả cầu, vì $9+16+0=25$ bằng bình phương bán kính.",
      steps: [
        { claim: R`Điều kiện nằm trong là $x^2+y^2+z^2<R^2$, không phải một tọa độ nhỏ hơn $R$.`, why: "Bạn A chỉ dùng hoành độ. Điều kiện đó không phải điều kiện đủ." },
        { claim: R`Ta có $3^2+4^2+0^2=25=5^2$.`, why: "Hai bình phương bằng nhau, nên điểm thuộc mặt cầu, không nằm trong phần trong." },
      ],
      checks: [{ expr: "3**2+4**2+0**2-5**2", expect: "0" }],
    },
    {
      kind: "doc",
      sao: 2,
      prompt: R`Bảng tọa độ ghi $A(1;2;2)$ và $B(3;4;4)$. Hãy đọc vectơ $\overrightarrow{AB}$ và độ dài $AB$.`,
      think: "Trừ tọa độ $B$ cho tọa độ $A$ theo từng cột. Rồi lấy căn tổng bình phương.",
      answer: R`Vectơ $\overrightarrow{AB}$ bằng $(2;2;2)$, độ dài bằng $2\sqrt{3}$.`,
      steps: [
        { claim: R`Hiệu tọa độ là $(3-1;4-2;4-2)=(2;2;2)$.`, why: "Đọc từng cột của bảng và trừ theo thứ tự đầu trừ đuôi của vectơ." },
        { claim: R`Độ dài bằng $\sqrt{4+4+4}=\sqrt{12}=2\sqrt{3}$.`, why: "Ba bình phương bằng nhau. Rút căn của $4$ ra ngoài căn của $3$." },
      ],
      checks: [{ expr: "sqrt(2**2+2**2+2**2)", expect: "2*sqrt(3)" }],
    },
    {
      kind: "uoc-luong",
      sao: 3,
      prompt: R`Ước lượng $\sqrt{3}$, là khoảng cách từ $(1;1;1)$ đến gốc, bằng một khoảng mở có các mốc một chữ số thập phân.`,
      think: "Bình phương $\frac{17}{10}$ và $\frac{18}{10}$, rồi so với $3$. Hàm bình phương đồng biến trên tập số dương.",
      answer: R`Ta có $\frac{17}{10}<\sqrt{3}<\frac{18}{10}$.`,
      steps: [
        { claim: R`Ta có $\left(\frac{17}{10}\right)^2=\frac{289}{100}<3$ và $\left(\frac{18}{10}\right)^2=\frac{324}{100}>3$.`, why: "So từng bình phương với $3$. Cả hai mốc đều dương." },
        { claim: R`Vì hàm bình phương đồng biến trên $(0;+\infty)$, thứ tự giữ nguyên khi khai căn.`, why: "Từ hai bất đẳng thức bình phương suy ra khoảng của căn. Khoảng cách $\\sqrt{3}$ nằm trong khoảng này." },
      ],
      checks: [
        { expr: "Rational(17,10)**2", expect: "Rational(289,100)" },
        { expr: "Rational(18,10)**2", expect: "Rational(324,100)" },
        { expr: "3-Rational(289,100)", expect: "Rational(11,100)" },
      ],
    },
    {
      kind: "tu-ra-de",
      sao: 4,
      prompt: R`Bài xuất phát: khoảng cách từ gốc đến mặt phẳng $2x-y+2z-3=0$ bằng $1$. Hãy đổi giả thiết bằng cách thay hằng số $-3$ bởi một số khác, dự đoán khoảng cách mới, rồi kiểm bằng công thức.`,
      think: "Pháp tuyến giữ nguyên nên mẫu giữ nguyên bằng $3$. Dự đoán tử đổi theo trị tuyệt đối của hằng số mới, trước khi chia.",
      answer: R`Một đề hợp lệ là mặt phẳng $2x-y+2z-6=0$. Dự đoán khoảng cách bằng $2$, và đáp số đúng là $2$.`,
      steps: [
        { claim: R`Đổi hằng số từ $-3$ sang $-6$. Mẫu vẫn là $\sqrt{9}=3$.`, why: "Pháp tuyến không đổi, nên độ dài mẫu không đổi." },
        { claim: R`Dự đoán tử bằng $6$, thương bằng $2$.`, why: "Điểm gốc chỉ còn hằng số trong tử. Trị tuyệt đối tăng gấp đôi nên khoảng cách tăng gấp đôi." },
        { claim: R`Công thức cho $\frac{|-6|}{3}=2$.`, why: "Phép tính kiểm lại dự đoán. Kết quả khớp." },
      ],
      checks: [{ expr: "Abs(-6)/sqrt(4+1+4)", expect: "2" }],
    },
  ],
};
