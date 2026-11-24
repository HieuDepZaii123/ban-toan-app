import type { TopicKnowledge } from "./types.ts";

const R = String.raw;

export const analyticKnowledge: TopicKnowledge = {
  id: "analytic",
  tongQuat: {
    la: R`Hình giải tích dùng tọa độ để biến bài toán hình học thành bài toán đại số: đường thẳng, đường tròn, mặt phẳng, mặt cầu đều được viết thành phương trình, còn khoảng cách, góc và vị trí tương đối được tính bằng công thức. Chuyên đề làm việc trong mặt phẳng $Oxy$ rồi mở rộng sang không gian $Oxyz$.`,
    dungDe: R`Xác định vị trí và khoảng cách trong bản đồ, thiết kế đồ họa, định vị trong không gian. Trong bài thi, chuyên đề cho bài viết phương trình đường thẳng, đường tròn, mặt phẳng, mặt cầu, bài tính khoảng cách và góc, bài xét vị trí tương đối, và bài tìm hình chiếu vuông góc.`,
    lienHe: R`Mọi công thức ở đây dựa trên vectơ: pháp tuyến, chỉ phương và tích vô hướng. Phương trình của đường tròn và mặt cầu chính là định lí Pythagore viết bằng tọa độ, và điều kiện cắt hay tiếp xúc quy về điều kiện của biệt thức ở chuyên đề Hàm số bậc hai.`,
  },
  tuDau: [
    R`Trên bàn cờ, mỗi ô có một địa chỉ như «cột C, hàng 4». Hình giải tích làm đúng việc đó cho cả mặt phẳng: kẻ hai trục số vuông góc, rồi mỗi điểm được ghi bằng hai con số, ngang bao nhiêu và dọc bao nhiêu. Trong không gian thêm một trục thứ ba cho chiều cao, và mỗi điểm cần ba con số.`,
    R`Khi mọi điểm đã có địa chỉ bằng số, một hình trở thành một điều kiện mà địa chỉ phải thỏa. Đường tròn là «mọi điểm cách tâm đúng một khoảng», và câu đó viết được thành một phương trình. Từ đó câu hỏi hình học như «đường thẳng có cắt đường tròn không» trở thành câu hỏi đại số «hệ phương trình có nghiệm không».`,
    R`Chỉ cần hai công cụ để dựng nên hầu hết công thức. Công cụ thứ nhất là định lí Pythagore, cho khoảng cách giữa hai điểm. Công cụ thứ hai là tích vô hướng của hai vectơ, bằng $0$ đúng khi hai vectơ vuông góc; nhờ nó mà viết được phương trình đường thẳng và mặt phẳng.`,
    R`Ý tưởng hay nhất của chuyên đề: muốn mô tả một đường thẳng trong mặt phẳng, hay một mặt phẳng trong không gian, hãy chỉ ra một hướng vuông góc với nó, gọi là pháp tuyến. Một điểm nằm trên hình đúng khi mũi tên từ một điểm cố định của hình tới nó vuông góc với pháp tuyến. Cả phương trình lẫn công thức khoảng cách đều ra từ câu này.`,
  ],
  kyHieu: [
    { kh: R`$M(x_0;y_0)$`, doc: R`Điểm $M$ có địa chỉ ngang $x_0$ và dọc $y_0$. Chỉ số $0$ nhắc rằng đây là một điểm cụ thể đã biết.` },
    { kh: R`$\vec{n}$`, doc: R`Vectơ pháp tuyến: một mũi tên vuông góc với đường thẳng hoặc mặt phẳng đang xét.` },
    { kh: R`$\vec{u}$`, doc: R`Vectơ chỉ phương: một mũi tên nằm dọc theo đường thẳng, cho biết hướng của nó.` },
    { kh: R`$t$`, doc: R`Tham số: một số chạy tự do. Mỗi giá trị của $t$ cho một điểm trên đường thẳng, như thời gian cho vị trí của một vật đang chuyển động.` },
    { kh: R`$d(I,\Delta)$`, doc: R`Khoảng cách từ điểm $I$ đến đường thẳng $\Delta$: độ dài đoạn vuông góc hạ từ $I$ xuống $\Delta$.` },
    { kh: R`$[\vec{a},\vec{b}]$`, doc: R`Tích có hướng của hai vectơ trong không gian: một vectơ mới vuông góc với cả hai.` },
    { kh: R`$(P)$`, doc: R`Tên gọi của một mặt phẳng.` },
    { kh: R`$R$`, doc: R`Bán kính của đường tròn hoặc mặt cầu.` },
  ],
  canBiet: [
    R`Tọa độ vectơ, độ dài và tích vô hướng.`,
    R`Định thức cấp hai để xét hai đường thẳng cắt nhau hay song song.`,
    R`Phương trình đường thẳng $y=kx+m$ và ý nghĩa của hệ số góc.`,
  ],
  sections: [
    {
      title: "Đường thẳng trong mặt phẳng",
      items: [
        {
          kind: "dinh-nghia", title: "Pháp tuyến và chỉ phương",
          text: R`Vectơ pháp tuyến $\vec{n}=(a;b)$ của một đường thẳng là vectơ khác $\vec{0}$ vuông góc với đường thẳng đó. Vectơ chỉ phương là vectơ cùng phương với đường thẳng, chẳng hạn $\vec{u}=(-b;a)$. Phương trình tổng quát là $ax+by+c=0$ với $a$ và $b$ không đồng thời bằng $0$.`,
          de: R`Có hai cách chỉ ra hướng của một đường thẳng. Cách một: đưa ra một mũi tên nằm dọc theo nó, gọi là chỉ phương. Cách hai: đưa ra một mũi tên đâm vuông góc vào nó, gọi là pháp tuyến. Quay mũi tên $(a;b)$ một phần tư vòng thì được $(-b;a)$, nên biết cái này là biết cái kia.`,
        },
        {
          kind: "cong-thuc", title: "Các dạng phương trình",
          text: R`Qua $M(x_0;y_0)$ với pháp tuyến $(a;b)$: $a(x-x_0)+b(y-y_0)=0$. Qua $M$ với chỉ phương $(u_1;u_2)$: $x=x_0+u_1t$, $y=y_0+u_2t$. Khi $b\neq 0$ có thể viết $y=kx+m$ với hệ số góc $k=-\frac{a}{b}$.`,
          suy: [
            R`Điểm $N(x;y)$ nằm trên đường thẳng đúng khi mũi tên $\overrightarrow{MN}=(x-x_0;\,y-y_0)$ nằm dọc đường thẳng, tức vuông góc với pháp tuyến $(a;b)$. Vuông góc nghĩa là tích vô hướng bằng $0$: $a(x-x_0)+b(y-y_0)=0$.`,
            R`Cách khác: $N$ nằm trên đường thẳng đúng khi $\overrightarrow{MN}$ cùng phương với chỉ phương, tức $\overrightarrow{MN}=t\vec{u}$ với một số $t$. Viết theo từng thành phần: $x-x_0=u_1t$ và $y-y_0=u_2t$.`,
            R`Khi $b\neq 0$, giải $ax+by+c=0$ theo $y$ được $y=-\frac{a}{b}x-\frac{c}{b}$. Hệ số của $x$ là độ dốc, nên $k=-\frac{a}{b}$.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Khoảng cách từ điểm đến đường thẳng",
          text: R`Khoảng cách từ $M(x_0;y_0)$ đến $ax+by+c=0$ là $d=\frac{|ax_0+by_0+c|}{\sqrt{a^2+b^2}}$. Mẫu số là độ dài pháp tuyến, tử số là giá trị của vế trái tại $M$ lấy trị tuyệt đối.`,
          suy: [
            R`Gọi $H$ là chân đường vuông góc hạ từ $M$. Đoạn $HM$ vuông góc với đường thẳng nên cùng phương với pháp tuyến: $\overrightarrow{HM}=t(a;b)$, tức $H=(x_0-ta;\,y_0-tb)$. Khoảng cách cần tìm là $|t|\sqrt{a^2+b^2}$.`,
            R`Điểm $H$ nằm trên đường thẳng: $a(x_0-ta)+b(y_0-tb)+c=0$. Giải ra $t=\frac{ax_0+by_0+c}{a^2+b^2}$.`,
            R`Thay vào: $d=\frac{|ax_0+by_0+c|}{a^2+b^2}\cdot\sqrt{a^2+b^2}=\frac{|ax_0+by_0+c|}{\sqrt{a^2+b^2}}$.`,
          ],
        },
        {
          kind: "dinh-ly", title: "Vị trí tương đối của hai đường thẳng",
          text: R`Hai đường $a_1x+b_1y+c_1=0$ và $a_2x+b_2y+c_2=0$ cắt nhau khi và chỉ khi $a_1b_2-a_2b_1\neq 0$. Nếu định thức đó bằng $0$ thì chúng song song hoặc trùng nhau, và xét thêm hệ số tự do để phân biệt.`,
          suy: [
            R`Điểm chung của hai đường thẳng là nghiệm của hệ hai phương trình. Định thức của hệ là $D=a_1b_2-a_2b_1$. Theo quy tắc Cramer, khi $D\neq 0$ hệ có đúng một nghiệm, tức hai đường cắt nhau tại đúng một điểm.`,
            R`Khi $D=0$, hai pháp tuyến $(a_1;b_1)$ và $(a_2;b_2)$ cùng phương, nên hai đường thẳng cùng hướng. Hai đường cùng hướng thì hoặc không có điểm chung (song song), hoặc trùng nhau; so thêm hệ số tự do để biết trường hợp nào.`,
          ],
          suyKhac: [
            {
              cach: "Bằng hệ số góc",
              buoc: [
                R`Giả sử $b_1,b_2\neq 0$. Viết hai đường dưới dạng $y=k_1x+m_1$ và $y=k_2x+m_2$ với $k_i=-\frac{a_i}{b_i}$. Hoành độ điểm chung thỏa $(k_1-k_2)x=m_2-m_1$.`,
                R`Nếu $k_1\neq k_2$ thì có đúng một $x$, rồi $y$ tính từ một đường: hai đường cắt nhau tại đúng một điểm. Vì $k_1-k_2=\frac{a_2b_1-a_1b_2}{b_1b_2}$ nên $k_1\neq k_2$ khi và chỉ khi $a_1b_2-a_2b_1\neq 0$.`,
                R`Nếu $k_1=k_2$, hai đường có cùng độ dốc: khi $m_1\neq m_2$ không có $x$ nào thỏa nên hai đường song song, khi $m_1=m_2$ chúng trùng nhau. Trường hợp này ứng với $a_1b_2-a_2b_1=0$.`,
                R`Nếu một hệ số $b$ bằng $0$, đường thẳng ấy thẳng đứng. Hai đường cùng thẳng đứng thì song song hoặc trùng, và $a_1b_2-a_2b_1=0$. Chỉ một đường thẳng đứng thì hai đường cắt nhau tại một điểm, và $a_1b_2-a_2b_1\neq 0$. `,
              ],
            },
          ],
        },
        {
          kind: "cong-thuc", title: "Góc giữa hai đường thẳng",
          text: R`$\cos\varphi=\frac{|a_1a_2+b_1b_2|}{\sqrt{a_1^2+b_1^2}\cdot\sqrt{a_2^2+b_2^2}}$ với $0^\circ\le\varphi\le 90^\circ$. Đó là côsin của góc giữa hai pháp tuyến, có thêm trị tuyệt đối.`,
          suy: [
            R`Quay cả hai đường thẳng một phần tư vòng thì góc giữa chúng không đổi, mà mỗi đường quay thành hướng pháp tuyến của nó. Vậy góc giữa hai đường thẳng bằng góc giữa hai pháp tuyến, hoặc bằng góc bù của góc đó.`,
            R`Cosin góc giữa hai vectơ bằng tích vô hướng chia tích hai độ dài. Góc giữa hai đường thẳng luôn lấy góc không tù; hai góc bù nhau có cosin đối nhau, nên lấy giá trị tuyệt đối của tử là được góc cần tìm.`,
          ],
        },
        { kind: "luu-y", text: R`Góc giữa hai đường thẳng không vượt quá $90^\circ$ nên có trị tuyệt đối ở tử, còn góc giữa hai vectơ có thể tù. Khoảng cách luôn có tử là trị tuyệt đối. Tử chưa chia cho căn bậc hai chưa phải khoảng cách.` },
        { kind: "vi-du", text: R`Khoảng cách từ $(3;1)$ đến $x+y-2=0$ là $\frac{|3+1-2|}{\sqrt{2}}=\sqrt{2}$. Đường qua $A(1;2)$ có pháp tuyến $(2;-1)$ là $2(x-1)-(y-2)=0$, tức $2x-y=0$. Đường $x+y-2=0$ và trục tung $x=0$ có $\cos\varphi=\frac{|1\cdot 1+1\cdot 0|}{\sqrt{2}\cdot 1}=\frac{\sqrt{2}}{2}$, nên góc là $45^\circ$.` },
      ],
    },
    {
      title: "Đường tròn",
      items: [
        {
          kind: "dinh-nghia", title: "Phương trình đường tròn",
          text: R`Đường tròn tâm $I(a;b)$ bán kính $R$ có phương trình $(x-a)^2+(y-b)^2=R^2$. Đó là tập các điểm cách $I$ một khoảng bằng $R$.`,
          de: R`Đường tròn là vết của đầu bút compa: mọi điểm cách chân compa đúng một khoảng $R$. Phương trình chỉ viết lại câu đó bằng số: theo Pythagore, bình phương khoảng cách từ $(x;y)$ tới tâm $(a;b)$ là $(x-a)^2+(y-b)^2$, và nó phải bằng $R^2$.`,
        },
        {
          kind: "cong-thuc", title: "Dạng khai triển",
          text: R`Phương trình $x^2+y^2-2ax-2by+c=0$ biểu diễn đường tròn tâm $(a;b)$ khi $a^2+b^2-c>0$, với bán kính $R=\sqrt{a^2+b^2-c}$. Phải kiểm điều kiện này trước khi kết luận.`,
          suy: [
            R`Gom thành bình phương: $x^2-2ax=(x-a)^2-a^2$ và $y^2-2by=(y-b)^2-b^2$. Phương trình trở thành $(x-a)^2+(y-b)^2=a^2+b^2-c$.`,
            R`Vế trái là bình phương khoảng cách từ $(x;y)$ tới điểm $(a;b)$. Nếu vế phải dương thì đây là đường tròn tâm $(a;b)$ bán kính $\sqrt{a^2+b^2-c}$.`,
            R`Nếu vế phải bằng $0$ thì chỉ có một điểm thỏa là chính $(a;b)$. Nếu vế phải âm thì không điểm nào thỏa, vì bình phương khoảng cách không thể âm. Đó là lý do phải kiểm điều kiện.`,
          ],
        },
        {
          kind: "dinh-ly", title: "Vị trí tương đối",
          text: R`Điểm $M$ nằm trong, trên hay ngoài đường tròn tùy $IM$ nhỏ hơn, bằng hay lớn hơn $R$. Đường thẳng $\Delta$ và đường tròn: nếu $d(I,\Delta)<R$ thì cắt tại hai điểm, nếu bằng $R$ thì tiếp xúc, nếu lớn hơn $R$ thì không có điểm chung.`,
          suy: [
            R`Với một điểm thì dùng ngay định nghĩa: đường tròn gồm những điểm cách tâm đúng $R$, nên điểm gần tâm hơn $R$ nằm trong, xa hơn $R$ nằm ngoài.`,
            R`Với đường thẳng: gọi $H$ là chân đường vuông góc hạ từ tâm $I$, và $IH=d$. Một điểm $N$ trên đường thẳng cách $H$ một đoạn $t$ thì theo Pythagore $IN^2=d^2+t^2$. Điểm $N$ nằm trên đường tròn đúng khi $t^2=R^2-d^2$.`,
            R`Nếu $d<R$ thì $t$ nhận hai giá trị đối nhau: hai giao điểm. Nếu $d=R$ thì $t=0$: một điểm chung duy nhất là $H$, đường thẳng tiếp xúc. Nếu $d>R$ thì $t^2$ phải âm, không thể: không có điểm chung.`,
          ],
          suyKhac: [
            {
              cach: "Bằng biệt thức của phương trình bậc hai",
              buoc: [
                R`Lấy một điểm $M(x_0;y_0)$ trên đường thẳng, chỉ phương $(u;v)$, và đặt $p=x_0-a$, $q=y_0-b$. Điểm $(x_0+ut;\,y_0+vt)$ nằm trên đường tròn khi $(p+ut)^2+(q+vt)^2=R^2$, tức $(u^2+v^2)t^2+2(up+vq)t+(p^2+q^2-R^2)=0$.`,
                R`Số giao điểm bằng số nghiệm $t$, quyết định bởi dấu của $\Delta'=(up+vq)^2-(u^2+v^2)(p^2+q^2-R^2)$.`,
                R`Dùng đồng nhất thức $(up+vq)^2+(uq-vp)^2=(u^2+v^2)(p^2+q^2)$, ta được $\Delta'=(u^2+v^2)R^2-(uq-vp)^2$.`,
                R`Khoảng cách từ tâm $I(a;b)$ đến đường thẳng có pháp tuyến $(v;-u)$ là $d=\frac{|uq-vp|}{\sqrt{u^2+v^2}}$. Do đó $\Delta'=(u^2+v^2)(R^2-d^2)$, và dấu của $\Delta'$ là dấu của $R^2-d^2$.`,
                R`Vậy có hai nghiệm khi $d<R$, một nghiệm kép khi $d=R$ và vô nghiệm khi $d>R$, tương ứng hai giao điểm, tiếp xúc, không giao nhau.`,
              ],
            },
          ],
        },
        { kind: "cach-lam", title: "Tiếp tuyến tại một điểm của đường tròn", text: R`Tiếp tuyến tại $M$ thuộc đường tròn đi qua $M$ và có vectơ pháp tuyến là $\overrightarrow{IM}$, vì tiếp tuyến vuông góc với bán kính tại tiếp điểm.` },
        { kind: "luu-y", text: R`Không phải phương trình dạng $x^2+y^2-2ax-2by+c=0$ nào cũng là đường tròn. Với $x^2+y^2-2x+4y+6=0$ có $a^2+b^2-c=1+4-6=-1<0$, nên tập hợp điểm là rỗng.` },
        { kind: "vi-du", text: R`Điểm $(3;4)$ thuộc đường tròn $x^2+y^2=25$ vì $9+16=25$. Tiếp tuyến tại đó có pháp tuyến $(3;4)$ nên là $3x+4y-25=0$, và khoảng cách từ gốc đến nó là $\frac{25}{5}=5=R$, đúng điều kiện tiếp xúc.` },
        { kind: "vi-du", text: R`Phương trình $x^2+y^2-2x+4y-4=0$ có $a=1$, $b=-2$, $c=-4$ nên tâm là $(1;-2)$ và bán kính $R=\sqrt{1+4+4}=3$.` },
      ],
    },
    {
      title: "Hệ tọa độ trong không gian",
      items: [
        {
          kind: "dinh-nghia", title: "Hệ trục tọa độ ba chiều",
          text: R`Gồm ba trục $Ox$, $Oy$, $Oz$ đôi một vuông góc tại gốc $O$. Điểm $M(x;y;z)$ ứng với vectơ $\overrightarrow{OM}=(x;y;z)$. Mọi công thức trong mặt phẳng đều có bản sao trong không gian với thêm thành phần $z$.`,
          de: R`Để chỉ vị trí một bóng đèn trong phòng cần ba con số: cách bức tường bên bao xa, cách bức tường phía trước bao xa, và cao hơn sàn bao nhiêu. Ba trục $Ox$, $Oy$, $Oz$ là ba mép của góc phòng. Mọi thứ đã biết trong mặt phẳng được giữ nguyên, chỉ thêm con số thứ ba cho chiều cao.`,
        },
        {
          kind: "cong-thuc", title: "Khoảng cách, trung điểm",
          text: R`$AB=\sqrt{(x_B-x_A)^2+(y_B-y_A)^2+(z_B-z_A)^2}$. Trung điểm của $AB$ có tọa độ là trung bình cộng từng thành phần của $A$ và $B$.`,
          suy: [
            R`Dựng hình hộp chữ nhật nhận $A$ và $B$ làm hai đỉnh đối nhau; ba cạnh của hộp dài $|x_B-x_A|$, $|y_B-y_A|$ và $|z_B-z_A|$. Đường chéo mặt đáy có bình phương bằng tổng bình phương hai cạnh đáy, theo Pythagore.`,
            R`Đường chéo đáy và cạnh đứng lại tạo một tam giác vuông có cạnh huyền là $AB$. Dùng Pythagore lần nữa: $AB^2$ bằng tổng bình phương cả ba cạnh.`,
            R`Trung điểm $I$ thỏa $\overrightarrow{OI}=\frac{1}{2}\left(\overrightarrow{OA}+\overrightarrow{OB}\right)$, tính theo từng thành phần nên mỗi tọa độ của $I$ là trung bình cộng hai tọa độ tương ứng.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Tích có hướng",
          text: R`Với $\vec{a}=(a_1;a_2;a_3)$ và $\vec{b}=(b_1;b_2;b_3)$ thì $[\vec{a},\vec{b}]=(a_2b_3-a_3b_2;\,a_3b_1-a_1b_3;\,a_1b_2-a_2b_1)$. Vectơ này vuông góc với cả $\vec{a}$ và $\vec{b}$, và độ dài của nó là diện tích hình bình hành dựng trên hai vectơ.`,
          suy: [
            R`Kiểm vuông góc bằng tích vô hướng: $\vec{a}\cdot[\vec{a},\vec{b}]=a_1(a_2b_3-a_3b_2)+a_2(a_3b_1-a_1b_3)+a_3(a_1b_2-a_2b_1)$. Khai triển ra sáu số hạng, chúng triệt tiêu từng đôi, nên kết quả bằng $0$. Làm tương tự với $\vec{b}$.`,
            R`Về độ dài: khai triển trực tiếp kiểm được $\left|[\vec{a},\vec{b}]\right|^2=|\vec{a}|^2|\vec{b}|^2-(\vec{a}\cdot\vec{b})^2$.`,
            R`Thay $\vec{a}\cdot\vec{b}=|\vec{a}|\,|\vec{b}|\cos\varphi$, vế phải thành $|\vec{a}|^2|\vec{b}|^2(1-\cos^2\varphi)=\left(|\vec{a}|\,|\vec{b}|\sin\varphi\right)^2$. Trong ngoặc là đáy $|\vec{a}|$ nhân chiều cao $|\vec{b}|\sin\varphi$, tức diện tích hình bình hành.`,
          ],
        },
        { kind: "luu-y", text: R`Tích có hướng là một vectơ, còn tích vô hướng là một số. Đổi thứ tự hai vectơ thì tích có hướng đổi dấu: $[\vec{b},\vec{a}]=-[\vec{a},\vec{b}]$.` },
        { kind: "vi-du", text: R`Với $A(1;2;3)$ và $B(3;-2;1)$ có $AB=\sqrt{4+16+4}=2\sqrt{6}$ và trung điểm là $(2;0;2)$. Tích có hướng $[(1;2;3),(4;5;6)]=(-3;6;-3)$, vuông góc với $(1;2;3)$ vì $-3+12-9=0$.` },
        { kind: "vi-du", text: R`Hai vectơ đơn vị trên trục: $[(1;0;0),(0;1;0)]=(0;0;1)$, đúng hướng của trục $Oz$. Đổi thứ tự cho $(0;0;-1)$, hướng ngược lại.` },
      ],
    },
    {
      title: "Mặt phẳng",
      items: [
        {
          kind: "dinh-nghia", title: "Phương trình mặt phẳng",
          text: R`Mặt phẳng có vectơ pháp tuyến $\vec{n}=(A;B;C)$ khác $\vec{0}$ và đi qua $M(x_0;y_0;z_0)$ có phương trình $A(x-x_0)+B(y-y_0)+C(z-z_0)=0$. Rút gọn được dạng $Ax+By+Cz+D=0$, trong đó $(A;B;C)$ là pháp tuyến.`,
          de: R`Một mặt bàn được xác định bởi hướng của chân bàn (vuông góc với mặt bàn) và một điểm mặt bàn đi qua. Điểm $N$ nằm trên mặt phẳng đúng khi mũi tên từ $M$ tới $N$ nằm trong mặt phẳng, tức vuông góc với pháp tuyến. Viết «tích vô hướng bằng $0$» ra là được phương trình.`,
        },
        { kind: "cach-lam", title: "Mặt phẳng qua ba điểm", text: R`Với ba điểm $A,B,C$ không thẳng hàng, lấy pháp tuyến là $[\overrightarrow{AB},\overrightarrow{AC}]$ rồi viết phương trình qua $A$. Cách này tránh phải giải hệ ba ẩn.` },
        {
          kind: "cong-thuc", title: "Khoảng cách từ điểm đến mặt phẳng",
          text: R`Khoảng cách từ $M(x_0;y_0;z_0)$ đến $Ax+By+Cz+D=0$ là $\frac{|Ax_0+By_0+Cz_0+D|}{\sqrt{A^2+B^2+C^2}}$.`,
          suy: [
            R`Gọi $H$ là chân đường vuông góc hạ từ $M$ xuống mặt phẳng. Đoạn $HM$ cùng phương với pháp tuyến: $\overrightarrow{HM}=t(A;B;C)$, nên $H=(x_0-tA;\,y_0-tB;\,z_0-tC)$ và khoảng cách là $|t|\sqrt{A^2+B^2+C^2}$.`,
            R`Điểm $H$ thuộc mặt phẳng: $A(x_0-tA)+B(y_0-tB)+C(z_0-tC)+D=0$, giải ra $t=\frac{Ax_0+By_0+Cz_0+D}{A^2+B^2+C^2}$.`,
            R`Nhân $|t|$ với độ dài pháp tuyến, một thừa số căn rút gọn với mẫu, được công thức. Cách làm giống hệt trường hợp đường thẳng trong mặt phẳng, chỉ thêm thành phần thứ ba.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Góc giữa hai mặt phẳng",
          text: R`$\cos\varphi=\frac{|\vec{n}_1\cdot\vec{n}_2|}{|\vec{n}_1|\,|\vec{n}_2|}$ với $\vec{n}_1,\vec{n}_2$ là hai pháp tuyến. Góc giữa hai mặt phẳng không vượt quá $90^\circ$.`,
          suy: [
            R`Nhìn dọc theo giao tuyến của hai mặt phẳng: mỗi mặt phẳng hiện ra như một đường thẳng, còn pháp tuyến của nó là đường vuông góc với đường thẳng ấy. Như trong mặt phẳng, góc giữa hai đường bằng góc giữa hai đường vuông góc với chúng, hoặc bù với góc đó.`,
            R`Cosin góc giữa hai pháp tuyến là tích vô hướng chia tích hai độ dài. Lấy giá trị tuyệt đối để chọn góc không tù trong hai góc bù nhau, vì vậy góc giữa hai mặt phẳng không vượt quá $90^\circ$.`,
          ],
        },
        {
          kind: "tinh-chat", title: "Song song và vuông góc",
          text: R`Hai mặt phẳng song song khi hai pháp tuyến cùng phương, và vuông góc khi $\vec{n}_1\cdot\vec{n}_2=0$. Hai mặt phẳng song song cách nhau một khoảng bằng khoảng cách từ một điểm của mặt này đến mặt kia.`,
          suy: [
            R`Hai mặt phẳng song song thì cùng vuông góc với một hướng, nên hai pháp tuyến cùng phương. Ngược lại, hai pháp tuyến cùng phương thì hai mặt phẳng cùng hướng, nên song song hoặc trùng nhau.`,
            R`Hai mặt phẳng vuông góc khi góc giữa chúng là $90^\circ$, tức cosin bằng $0$, tức $\vec{n}_1\cdot\vec{n}_2=0$.`,
            R`Khi hai mặt phẳng song song, mọi điểm của mặt này cách mặt kia như nhau, nên chỉ cần chọn một điểm bất kì rồi dùng công thức khoảng cách từ điểm đến mặt phẳng.`,
          ],
        },
        { kind: "vi-du", text: R`Khoảng cách từ $A(1;2;3)$ đến $2x-y+2z-3=0$ là $\frac{|2-2+6-3|}{\sqrt{4+1+4}}=\frac{3}{3}=1$. Mặt phẳng qua $A(1;0;0)$, $B(0;1;0)$, $C(0;0;1)$ có pháp tuyến $[(-1;1;0),(-1;0;1)]=(1;1;1)$ nên là $x+y+z-1=0$.` },
        { kind: "vi-du", text: R`Hai mặt phẳng $x+y+z-1=0$ và $z=0$ có pháp tuyến $(1;1;1)$ và $(0;0;1)$, nên $\cos\varphi=\frac{1}{\sqrt{3}\cdot 1}=\frac{\sqrt{3}}{3}$.` },
      ],
    },
    {
      title: "Đường thẳng trong không gian",
      items: [
        {
          kind: "cong-thuc", title: "Phương trình đường thẳng",
          text: R`Đường thẳng qua $M(x_0;y_0;z_0)$ với chỉ phương $\vec{u}=(a;b;c)$ có dạng tham số $x=x_0+at$, $y=y_0+bt$, $z=z_0+ct$. Khi $abc\neq 0$ viết được dạng chính tắc $\frac{x-x_0}{a}=\frac{y-y_0}{b}=\frac{z-z_0}{c}$.`,
          suy: [
            R`Điểm $N(x;y;z)$ nằm trên đường thẳng đúng khi mũi tên $\overrightarrow{MN}$ cùng phương với $\vec{u}$, tức $\overrightarrow{MN}=t\vec{u}$. Viết theo ba thành phần: $x-x_0=at$, $y-y_0=bt$, $z-z_0=ct$.`,
            R`Khi cả $a,b,c$ khác $0$, giải $t$ từ mỗi phương trình: $t=\frac{x-x_0}{a}=\frac{y-y_0}{b}=\frac{z-z_0}{c}$. Bỏ $t$ đi còn lại dạng chính tắc.`,
          ],
        },
        {
          kind: "dinh-ly", title: "Đường thẳng và mặt phẳng",
          text: R`Thế dạng tham số vào phương trình mặt phẳng được một phương trình bậc nhất theo $t$. Một nghiệm: đường thẳng cắt mặt phẳng. Vô nghiệm: song song. Mọi $t$ đều là nghiệm: đường thẳng nằm trong mặt phẳng.`,
          suy: [
            R`Thay $x=x_0+at$, $y=y_0+bt$, $z=z_0+ct$ vào $Ax+By+Cz+D=0$ rồi gom theo $t$: $(Aa+Bb+Cc)\,t+(Ax_0+By_0+Cz_0+D)=0$. Đây là phương trình dạng $pt+q=0$.`,
            R`Nếu $p\neq 0$ thì có đúng một giá trị $t$, ứng với đúng một điểm chung: đường thẳng cắt mặt phẳng.`,
            R`Nếu $p=0$, tức chỉ phương vuông góc với pháp tuyến, đường thẳng cùng hướng với mặt phẳng. Khi đó nếu $q\neq 0$ thì không $t$ nào thỏa: song song. Nếu $q=0$ thì mọi $t$ đều thỏa: cả đường thẳng nằm trong mặt phẳng.`,
          ],
          suyKhac: [
            {
              cach: "Bằng hệ ba mặt phẳng",
              buoc: [
                R`Viết đường thẳng thành giao của hai mặt phẳng không song song có pháp tuyến $\vec{n}_1$, $\vec{n}_2$. Chỉ phương $\vec{u}$ vuông góc với cả hai pháp tuyến nên cùng phương với $\vec{n}_1\times\vec{n}_2$. Điểm chung của đường thẳng và mặt phẳng $(P)$ có pháp tuyến $\vec{n}$ là nghiệm của hệ ba phương trình bậc nhất ba ẩn.`,
                R`Định thức của hệ là $\det(\vec{n}_1,\vec{n}_2,\vec{n})=(\vec{n}_1\times\vec{n}_2)\cdot\vec{n}$, tức bằng $k\,\vec{u}\cdot\vec{n}$ với một số $k\neq0$.`,
                R`Nếu $\vec{u}\cdot\vec{n}\neq0$ thì định thức khác $0$ và theo quy tắc Cramer hệ có đúng một nghiệm: đường thẳng cắt mặt phẳng tại đúng một điểm.`,
                R`Nếu $\vec{u}\cdot\vec{n}=0$ thì định thức bằng $0$, không còn nghiệm duy nhất. Khi đó một điểm $M$ của đường thẳng quyết định: nếu $M\notin(P)$ thì hệ vô nghiệm (song song), nếu $M\in(P)$ thì cả đường thẳng nằm trong $(P)$ (vô số nghiệm).`,
              ],
            },
          ],
        },
        {
          kind: "dinh-ly", title: "Hai đường thẳng",
          text: R`Hai đường thẳng trong không gian song song khi chỉ phương cùng phương, cắt nhau khi có một điểm chung, và chéo nhau khi không song song và không có điểm chung. Chéo nhau là tình huống chỉ có trong không gian.`,
          suy: [
            R`Chia theo hai câu hỏi: hai đường có cùng hướng không, và có điểm chung không. Cùng hướng mà không có điểm chung là song song; cùng hướng mà có điểm chung thì trùng nhau.`,
            R`Khác hướng mà có điểm chung là cắt nhau. Khác hướng mà không có điểm chung là chéo nhau.`,
            R`Trong mặt phẳng, hai đường khác hướng luôn cắt nhau vì định thức của hệ khác $0$. Trong không gian có thêm một chiều để hai đường «lách» qua nhau, như cầu vượt đi phía trên con đường bên dưới, nên mới có trường hợp chéo nhau.`,
          ],
          suyKhac: [
            {
              cach: "Bằng tích hỗn tạp",
              buoc: [
                R`Gọi hai đường là $M_1+t\vec{u}$ và $M_2+s\vec{v}$ với $\vec{u}$, $\vec{v}$ không cùng phương. Chúng cắt nhau khi và chỉ khi tồn tại $t$, $s$ để $M_1+t\vec{u}=M_2+s\vec{v}$, tức $\overrightarrow{M_1M_2}=t\vec{u}-s\vec{v}$.`,
                R`Vì $\vec{u}$, $\vec{v}$ độc lập, mọi vectơ trong mặt phẳng của chúng viết được dưới dạng $t\vec{u}-s\vec{v}$. Vậy hai đường cắt nhau khi và chỉ khi $\overrightarrow{M_1M_2}$ nằm trong mặt phẳng của $\vec{u}$ và $\vec{v}$, tức ba vectơ $\vec{u}$, $\vec{v}$, $\overrightarrow{M_1M_2}$ đồng phẳng.`,
                R`Vì $\vec{u}$, $\vec{v}$ không cùng phương nên $[\vec{u},\vec{v}]\neq\vec{0}$ và vuông góc với mặt phẳng của chúng. Do đó $\overrightarrow{M_1M_2}$ nằm trong mặt phẳng ấy khi và chỉ khi $[\vec{u},\vec{v}]\cdot\overrightarrow{M_1M_2}=0$. Giá trị khác $0$ nghĩa là hai đường không cùng nằm trong một mặt phẳng, tức chéo nhau.`,
              ],
            },
          ],
        },
        {
          kind: "cong-thuc", title: "Góc giữa đường thẳng và mặt phẳng",
          text: R`$\sin\varphi=\frac{|\vec{u}\cdot\vec{n}|}{|\vec{u}|\,|\vec{n}|}$ với $\vec{u}$ là chỉ phương và $\vec{n}$ là pháp tuyến. Đây là $\sin$, không phải $\cos$, vì góc giữa đường thẳng và mặt phẳng phụ với góc giữa $\vec{u}$ và $\vec{n}$.`,
          suy: [
            R`Góc giữa đường thẳng và mặt phẳng là góc giữa đường thẳng và hình chiếu của nó trên mặt phẳng. Pháp tuyến vuông góc với mặt phẳng, nên trong tam giác vuông tạo bởi đường thẳng, hình chiếu và pháp tuyến, góc $\varphi$ và góc giữa đường thẳng với pháp tuyến cộng lại bằng $90^\circ$.`,
            R`Hai góc phụ nhau thì sin của góc này bằng cosin của góc kia. Vậy $\sin\varphi$ bằng giá trị tuyệt đối của cosin góc giữa $\vec{u}$ và $\vec{n}$, tức $\frac{|\vec{u}\cdot\vec{n}|}{|\vec{u}|\,|\vec{n}|}$.`,
          ],
        },
        { kind: "cach-lam", title: "Hình chiếu vuông góc của điểm lên mặt phẳng", text: R`Viết đường thẳng qua điểm đó có chỉ phương là pháp tuyến của mặt phẳng, rồi tìm giao điểm của đường này với mặt phẳng. Giao điểm là hình chiếu.` },
        { kind: "luu-y", text: R`Nhớ phân biệt: góc giữa hai mặt phẳng dùng $\cos$ của hai pháp tuyến, góc giữa đường thẳng và mặt phẳng dùng $\sin$. Nhầm hai công thức này là lỗi hay gặp.` },
        { kind: "vi-du", text: R`Hình chiếu của $A(1;2;3)$ lên $2x-y+2z-3=0$: đường thẳng qua $A$ có chỉ phương $(2;-1;2)$ là $(1+2t;\,2-t;\,3+2t)$. Thế vào mặt phẳng: $9t+3=0$, nên $t=-\frac{1}{3}$ và hình chiếu là $\left(\frac{1}{3};\frac{7}{3};\frac{7}{3}\right)$. Khoảng cách $|t|\cdot 3=1$ khớp với kết quả trước.` },
      ],
    },
    {
      title: "Mặt cầu",
      items: [
        {
          kind: "dinh-nghia", title: "Phương trình mặt cầu",
          text: R`Mặt cầu tâm $I(a;b;c)$ bán kính $R$ có phương trình $(x-a)^2+(y-b)^2+(z-c)^2=R^2$.`,
          de: R`Mặt cầu là vỏ của một quả bóng: mọi điểm cách tâm đúng một khoảng $R$. Phương trình chỉ là công thức khoảng cách trong không gian viết ra: bình phương khoảng cách từ $(x;y;z)$ tới tâm phải bằng $R^2$. So với đường tròn chỉ thêm một số hạng cho chiều thứ ba.`,
        },
        {
          kind: "cong-thuc", title: "Dạng khai triển",
          text: R`Phương trình $x^2+y^2+z^2-2ax-2by-2cz+d=0$ là mặt cầu khi $a^2+b^2+c^2-d>0$, có tâm $(a;b;c)$ và bán kính $R=\sqrt{a^2+b^2+c^2-d}$.`,
          suy: [
            R`Gom từng biến thành bình phương như với đường tròn: $x^2-2ax=(x-a)^2-a^2$, và tương tự cho $y$ và $z$. Phương trình trở thành $(x-a)^2+(y-b)^2+(z-c)^2=a^2+b^2+c^2-d$.`,
            R`Vế trái là bình phương khoảng cách tới điểm $(a;b;c)$. Khi vế phải dương, đó là mặt cầu tâm $(a;b;c)$ với $R^2=a^2+b^2+c^2-d$. Khi vế phải bằng $0$ chỉ còn một điểm, khi âm thì không có điểm nào.`,
          ],
        },
        {
          kind: "dinh-ly", title: "Mặt phẳng và mặt cầu",
          text: R`Nếu $d(I,(P))<R$ thì mặt phẳng cắt mặt cầu theo một đường tròn có bán kính $r=\sqrt{R^2-d^2}$. Nếu $d=R$ thì tiếp xúc tại một điểm, nếu $d>R$ thì không giao nhau.`,
          suy: [
            R`Gọi $H$ là hình chiếu vuông góc của tâm $I$ lên mặt phẳng, và $IH=d$. Với mọi điểm $N$ trên mặt phẳng, $IH$ vuông góc với $HN$ nên theo Pythagore $IN^2=d^2+HN^2$.`,
            R`Điểm $N$ nằm trên mặt cầu đúng khi $IN=R$, tức $HN^2=R^2-d^2$. Nếu $d<R$, đó là các điểm của mặt phẳng cách $H$ đúng $\sqrt{R^2-d^2}$: một đường tròn tâm $H$.`,
            R`Nếu $d=R$ thì $HN=0$, chỉ có điểm $H$: mặt phẳng tiếp xúc mặt cầu. Nếu $d>R$ thì $HN^2$ phải âm, không thể: không có điểm chung.`,
          ],
          suyKhac: [
            {
              cach: "Bằng chọn hệ trục thích hợp",
              buoc: [
                R`Phép tịnh tiến và phép quay giữ nguyên khoảng cách, nên ta chọn hệ trục có gốc ở tâm $I$ và mặt phẳng là $z=d$, với $d\ge0$ là khoảng cách từ $I$ tới mặt phẳng.`,
                R`Trong hệ này mặt cầu là $x^2+y^2+z^2=R^2$. Giao với mặt phẳng $z=d$ cho $x^2+y^2=R^2-d^2$.`,
                R`Nếu $d<R$ thì vế phải dương: đó là đường tròn tâm $(0;0;d)$, bán kính $\sqrt{R^2-d^2}$. Nếu $d=R$ thì chỉ có $(0;0;d)$. Nếu $d>R$ thì vế phải âm nên không có điểm nào.`,
              ],
            },
          ],
        },
        { kind: "cach-lam", title: "Viết phương trình mặt cầu", text: R`Biết tâm và một điểm trên mặt cầu thì bán kính là khoảng cách giữa hai điểm. Biết đường kính $AB$ thì tâm là trung điểm $AB$. Biết tiếp xúc với một mặt phẳng thì bán kính là khoảng cách từ tâm đến mặt phẳng.` },
        { kind: "luu-y", text: R`Phải kiểm $a^2+b^2+c^2-d>0$ trước khi nói đó là mặt cầu. Nếu bằng $0$ thì chỉ là một điểm, nếu âm thì không có điểm nào.` },
        { kind: "vi-du", text: R`Phương trình $x^2+y^2+z^2-2x+4y-6z+5=0$ có $a=1$, $b=-2$, $c=3$, $d=5$ nên tâm là $(1;-2;3)$ và $R=\sqrt{1+4+9-5}=3$.` },
        { kind: "vi-du", text: R`Mặt cầu tâm $O$ bán kính $5$ cắt mặt phẳng $z=3$ theo đường tròn bán kính $\sqrt{25-9}=4$, vì khoảng cách từ $O$ đến mặt phẳng là $3$.` },
      ],
    },
  ],
  canNho: [
    R`Khoảng cách từ điểm đến đường thẳng $ax+by+c=0$: $\frac{|ax_0+by_0+c|}{\sqrt{a^2+b^2}}$; tương tự với mặt phẳng, thêm $z$.`,
    R`Hai đường thẳng trong mặt phẳng cắt nhau khi $a_1b_2-a_2b_1\neq 0$.`,
    R`Đường tròn $(x-a)^2+(y-b)^2=R^2$; dạng khai triển cần $a^2+b^2-c>0$.`,
    R`Đường thẳng và đường tròn: so khoảng cách từ tâm với bán kính để biết cắt, tiếp xúc hay không giao.`,
    R`Pháp tuyến của mặt phẳng qua ba điểm là $[\overrightarrow{AB},\overrightarrow{AC}]$.`,
    R`Góc giữa hai mặt phẳng dùng $\cos$ của hai pháp tuyến; góc giữa đường thẳng và mặt phẳng dùng $\sin$.`,
    R`Đường thẳng cắt mặt phẳng: thế tham số vào phương trình mặt phẳng rồi giải $t$.`,
    R`Mặt cầu $(x-a)^2+(y-b)^2+(z-c)^2=R^2$; mặt phẳng cắt mặt cầu theo đường tròn bán kính $\sqrt{R^2-d^2}$.`,
  ],
  lienQuan: [
    { id: "vector", vi: R`Pháp tuyến, chỉ phương, tích vô hướng và tích có hướng đều là vectơ; mọi công thức ở đây dựa trên chúng.` },
    { id: "quadratic", vi: R`Điều kiện cắt, tiếp xúc hay không giao của đường thẳng với đường tròn là điều kiện về biệt thức của phương trình bậc hai.` },
    { id: "triangle", vi: R`Khoảng cách và góc tính bằng tọa độ cho cùng kết quả như tính bằng hình học trong chuyên đề Hình phẳng và không gian.` },
  ],
  checks: [
    { expr: "simplify(-a1/b1+a2/b2+(a1*b2-a2*b1)/(b1*b2))", expect: "0" },
    { expr: "expand((u*p+v*q)**2+(u*q-v*p)**2-(u**2+v**2)*(p**2+q**2))", expect: "0" },
    { expr: "expand((u*p+v*q)**2-(u**2+v**2)*(p**2+q**2-R**2)-((u**2+v**2)*R**2-(u*q-v*p)**2))", expect: "0" },
    { expr: "expand((p+u*t)**2+(q+v*t)**2-R**2-((u**2+v**2)*t**2+2*(u*p+v*q)*t+(p**2+q**2-R**2)))", expect: "0" },
    { expr: "expand(Matrix([[a1,b1,c1],[a2,b2,c2],[a3,b3,c3]]).det()-Matrix([a1,b1,c1]).cross(Matrix([a2,b2,c2])).dot(Matrix([a3,b3,c3])))", expect: "0" },
    { expr: "Matrix([[1,0,0],[0,1,0],[0,0,1]]).det()", expect: "1" },
    { expr: "Matrix([[1,0,0],[0,1,0],[1,1,0]]).det()", expect: "0" },
    { expr: "expand(A*(x0+a*t)+B*(y0+b*t)+C*(z0+c*t)+D-((A*a+B*b+C*c)*t+(A*x0+B*y0+C*z0+D)))", expect: "0" },
    { expr: "Abs(3+1-2)/sqrt(2)", expect: "sqrt(2)" },
    { expr: "expand(2*(x-1)-(y-2))", expect: "2*x-y" },
    { expr: "Abs(1*1+1*0)/(sqrt(2)*1)", expect: "sqrt(2)/2" },
    { expr: "Matrix([[1,2],[2,4]]).det()", expect: "0" },
    { expr: "3**2+4**2", expect: "25" },
    { expr: "Abs(-25)/sqrt(3**2+4**2)", expect: "5" },
    { expr: "1+4-6", expect: "-1" },
    { expr: "sqrt(1+4+4)", expect: "3" },
    { expr: "sqrt((3-1)**2+(-2-2)**2+(1-3)**2)", expect: "2*sqrt(6)" },
    { expr: "Rational(1+3,2)", expect: "2" },
    { expr: "Matrix([1,2,3]).cross(Matrix([4,5,6]))", expect: "Matrix([-3,6,-3])" },
    { expr: "Matrix([1,2,3]).dot(Matrix([-3,6,-3]))", expect: "0" },
    { expr: "Matrix([1,0,0]).cross(Matrix([0,1,0]))", expect: "Matrix([0,0,1])" },
    { expr: "Matrix([0,1,0]).cross(Matrix([1,0,0]))", expect: "Matrix([0,0,-1])" },
    { expr: "Matrix([-1,1,0]).cross(Matrix([-1,0,1]))", expect: "Matrix([1,1,1])" },
    { expr: "Abs(2*1-2+2*3-3)/sqrt(4+1+4)", expect: "1" },
    { expr: "1/sqrt(3)", expect: "sqrt(3)/3" },
    { expr: "solve(2*(1+2*t)-(2-t)+2*(3+2*t)-3, t)", expect: "[-1/3]" },
    { expr: "1+2*Rational(-1,3)", expect: "Rational(1,3)" },
    { expr: "2-Rational(-1,3)", expect: "Rational(7,3)" },
    { expr: "3+2*Rational(-1,3)", expect: "Rational(7,3)" },
    { expr: "abs(Rational(-1,3))*sqrt(4+1+4)", expect: "1" },
    { expr: "sqrt(1+4+9-5)", expect: "3" },
    { expr: "sqrt(25-9)", expect: "4" },
  ],
};
