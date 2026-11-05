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
      name: "Phương trình mặt cầu, tâm và bán kính",
      nhanDang: "Viết phương trình khi biết tâm và bán kính, hoặc nhận dạng một phương trình bậc hai tổng.",
      phuongPhap: R`Mặt cầu tâm $I(x_I;y_I;z_I)$ bán kính $R>0$ có phương trình $(x-x_I)^2+(y-y_I)^2+(z-z_I)^2=R^2$. Dạng khai triển $x^2+y^2+z^2+Dx+Ey+Fz+G=0$ có tâm $\left(-\frac{D}{2};-\frac{E}{2};-\frac{F}{2}\right)$. Ký hiệu $D,E,F,G$ không trùng hệ số $a,b,c$ của mặt phẳng. Đặt $R^2=\frac{D^2+E^2+F^2}{4}-G$. Nếu lượng này dương thì có mặt cầu. Nếu lượng này bằng $0$ thì chỉ là một điểm. Nếu lượng này âm, tức vế phải sau khi tách bình phương không dương, thì không phải mặt cầu.`,
      viDu: {
        prompt: R`Xét $x^2+y^2+z^2-2x+4y-4=0$ và $x^2+y^2+z^2+1=0$. Phương trình nào là mặt cầu?`,
        steps: [
          { claim: R`Phương trình thứ nhất tách thành $(x-1)^2+(y+2)^2+z^2=9$.`, why: "Hệ số $D=-2$, $E=4$, $F=0$. Tâm là $(1;-2;0)$, không dùng bộ $(a;b;c)$ của pháp tuyến." },
          { claim: R`Vế phải $9>0$, nên đây là mặt cầu bán kính $3$. Phương trình chính tắc là $(x-1)^2+(y+2)^2+z^2=9$.`, why: "Bán kính dương khi và chỉ khi vế phải sau khi tách bình phương là số dương." },
          { claim: R`Phương trình thứ hai tương đương $x^2+y^2+z^2=-1$.`, why: "Vế phải âm, nên không có điểm thực nào. Đây không phải mặt cầu." },
        ],
        ket: R`Chỉ phương trình thứ nhất là mặt cầu, tâm $(1;-2;0)$, bán kính $3$.`,
        checks: [
          { expr: "(4+16+0)/4-(-4)", expect: "9" },
          { expr: "1+4+4", expect: "9" },
          { expr: "0+0+0+1", expect: "1" },
        ],
      },
      loi: "Gọi mọi phương trình có $x^2+y^2+z^2$ là mặt cầu, kể cả khi vế phải không dương.",
      luyen: {
        kind: "luyen",
        prompt: R`Viết phương trình mặt cầu tâm $(2;-1;2)$, bán kính $3$.`,
        think: "Thay tâm và bán kính vào dạng chính tắc. Vế phải phải là bình phương bán kính, và bán kính phải dương.",
        answer: R`Đáp số là $(x-2)^2+(y+1)^2+(z-2)^2=9$.`,
        steps: [
          { claim: R`Vì $3>0$, mặt cầu tồn tại và vế phải bằng $9$.`, why: "Bán kính dương là điều kiện đủ để viết phương trình mặt cầu theo tâm." },
          { claim: R`Phương trình là $(x-2)^2+(y+1)^2+(z-2)^2=9$.`, why: "Mỗi tọa độ tâm đổi dấu khi đưa vào ngoặc. Tung độ tâm $-1$ cho thừa số $y+1$." },
        ],
        checks: [{ expr: "(2-2)**2+(-1+1)**2+(2-2)**2", expect: "0" }],
      },
    },
    {
      name: "Vị trí tương đối của mặt phẳng và mặt cầu",
      nhanDang: "Cho một mặt cầu và một mặt phẳng, hỏi cắt, tiếp xúc hay không gặp nhau.",
      phuongPhap: R`Gọi $d$ là khoảng cách từ tâm đến mặt phẳng và $R$ là bán kính. Nếu $d<R$ thì mặt phẳng cắt mặt cầu theo một đường tròn. Nếu $d=R$ thì tiếp xúc tại một điểm. Nếu $d>R$ thì không có điểm chung. So sánh $d$ với $R$ là điều kiện cần và đủ, sau khi đã tính đúng $d$ bằng công thức khoảng cách.`,
      viDu: {
        prompt: R`Mặt cầu tâm $O$, bán kính $3$, và mặt phẳng $z-4=0$. Chúng có điểm chung không?`,
        steps: [
          { claim: R`Khoảng cách từ $O$ đến mặt phẳng bằng $\frac{|-4|}{1}=4$.`, why: "Pháp tuyến $(0;0;1)$ có độ dài $1$. Tâm là gốc nên chỉ còn hằng số." },
          { claim: R`Vì $4>3$, mặt phẳng không gặp mặt cầu.`, why: "Điều kiện $d>R$ là đủ để kết luận không có điểm chung." },
        ],
        ket: "Mặt phẳng và mặt cầu không có điểm chung.",
        checks: [{ expr: "Abs(-4)/1", expect: "4" }],
      },
      loi: "Kết luận cắt nhau chỉ vì mặt phẳng và mặt cầu cùng có trong đề, chưa so $d$ với $R$.",
      luyen: {
        kind: "luyen",
        prompt: R`Mặt cầu tâm $O$, bán kính $3$, và mặt phẳng $z-3=0$ có vị trí nào?`,
        think: "Tính khoảng cách từ tâm đến mặt phẳng, rồi so với bán kính. Bằng nhau thì tiếp xúc.",
        answer: "Mặt phẳng tiếp xúc mặt cầu.",
        steps: [
          { claim: R`Khoảng cách từ tâm đến mặt phẳng bằng $3$.`, why: "Cùng cách tính như ví dụ, hằng số đổi từ $-4$ sang $-3$." },
          { claim: R`Vì khoảng cách bằng bán kính, mặt phẳng tiếp xúc mặt cầu tại một điểm.`, why: "Điều kiện $d=R$ là đủ cho tiếp xúc. Điểm tiếp xúc là $(0;0;3)$." },
        ],
        checks: [{ expr: "Abs(-3)/1", expect: "3" }],
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
      prompt: R`Số liệu giả định. Quy định an toàn yêu cầu đèn cách tường ít nhất $1$ mét. Tường có phương trình $x+2y+2z-6=0$, đèn đặt tại $(1;1;1)$. Đèn có đạt khoảng cách an toàn không?`,
      think: "Tính khoảng cách điểm đến mặt phẳng, giữ trị tuyệt đối. Sau đó so với $1$ mét. Kết luận phải trả lời câu hỏi an toàn, không chỉ nêu thương.",
      answer: R`Khoảng cách là $\frac{1}{3}$ mét, nhỏ hơn $1$ mét, nên đèn chưa đạt khoảng cách an toàn.`,
      steps: [
        { claim: R`Tử bằng $|1+2+2-6|=1$ và mẫu bằng $\sqrt{1+4+4}=3$.`, why: "Thay đủ ba tọa độ. Pháp tuyến $(1;2;2)$ khác vectơ không nên mẫu hợp lệ." },
        { claim: R`Khoảng cách bằng $\frac{1}{3}$ mét.`, why: "Công thức khoảng cách cho thương này. Đơn vị là mét." },
        { claim: R`Vì $\frac{1}{3}<1$, đèn gần tường hơn mức cho phép.`, why: "So sánh với mốc an toàn mới trả lời đúng câu hỏi. Chỉ nêu $\\frac{1}{3}$ thì chưa kết luận đạt hay chưa." },
      ],
      checks: [
        { expr: "Abs(1+2+2-6)/sqrt(1+4+4)", expect: "Rational(1,3)" },
        { expr: "Rational(1,3)-1", expect: "Rational(-2,3)" },
      ],
    },
    {
      kind: "thuc-te",
      sao: 2,
      prompt: R`Số liệu giả định. Bể hình cầu tâm $O$, bán kính $5$ mét. Cảm biến $A(3;4;0)$ và cảm biến $B(6;0;0)$ lần lượt nằm trên thành, trong lòng hay ngoài bể?`,
      think: "So bình phương khoảng cách tới tâm với $25$. Nhỏ hơn là trong lòng, bằng là trên thành, lớn hơn là ngoài. Làm cả hai điểm.",
      answer: "Cảm biến $A$ nằm trên thành bể, cảm biến $B$ nằm ngoài bể $1$ mét.",
      steps: [
        { claim: R`Với $A$, $3^2+4^2+0^2=25=5^2$.`, why: "Bình phương khoảng cách bằng bình phương bán kính là điều kiện cần và đủ để điểm nằm trên mặt cầu." },
        { claim: R`Với $B$, $6^2+0+0=36>25$.`, why: "Điểm ở ngoài khi bình phương khoảng cách lớn hơn bình phương bán kính." },
        { claim: R`Độ lệch của $B$ so với thành là $6-5=1$ mét.`, why: "Vì $B$ nằm trên trục hoành, khoảng cách tới tâm chính là $6$ mét. Diễn giải: $A$ chạm thành, $B$ đã ra ngoài $1$ mét." },
      ],
      checks: [
        { expr: "3**2+4**2+0**2-25", expect: "0" },
        { expr: "6**2-25", expect: "11" },
        { expr: "6-5", expect: "1" },
      ],
    },
    {
      kind: "thuc-te",
      sao: 2,
      prompt: R`Số liệu giả định. Một rãnh chỉ dài $4$ mét. Ống thẳng nối $A(0;0;0)$ với $B(1;2;2)$, đơn vị mét. Ống có đặt vừa rãnh không, và điểm giữa của ống ở đâu?`,
      think: "Trừ từng tọa độ để có vectơ ống, tính độ dài, rồi so với $4$ mét. Trung điểm là trung bình từng tọa độ.",
      answer: "Ống dài $3$ mét nên đặt vừa rãnh $4$ mét. Điểm giữa là $\\left(\\frac{1}{2};1;1\\right)$.",
      steps: [
        { claim: R`Vectơ $\overrightarrow{AB}=(1;2;2)$, độ dài $\sqrt{1+4+4}=3$ mét.`, why: "Trừ tọa độ từng thành phần rồi lấy căn tổng bình phương." },
        { claim: R`Vì $3<4$, ống ngắn hơn rãnh nên đặt vừa.`, why: "So sánh độ dài với chiều dài rãnh mới trả lời câu hỏi đặt vừa hay không." },
        { claim: R`Trung điểm có tọa độ $\left(\frac{0+1}{2};\frac{0+2}{2};\frac{0+2}{2}\right)=\left(\frac{1}{2};1;1\right)$.`, why: "Mỗi tọa độ của trung điểm là trung bình cộng hai đầu mút. Đây là chỗ kê đỡ ở giữa ống." },
      ],
      checks: [
        { expr: "sqrt(1+4+4)", expect: "3" },
        { expr: "4-3", expect: "1" },
        { expr: "(0+1)/2", expect: "Rational(1,2)" },
      ],
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
      think: R`Bình phương $\frac{17}{10}$ và $\frac{18}{10}$, rồi so với $3$. Hàm bình phương đồng biến trên tập số dương.`,
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
