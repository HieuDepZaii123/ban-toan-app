import type { TopicKnowledge } from "./types.ts";

const R = String.raw;

export const vectorKnowledge: TopicKnowledge = {
  id: "vector",
  tongQuat: {
    la: R`Vectơ là một đoạn thẳng có hướng: có điểm đầu, điểm cuối, độ dài và hướng. Trong hệ tọa độ, một vectơ được xác định bởi một bộ số, và các phép toán hình học như cộng, nhân với một số, tích vô hướng đều quy về phép tính trên các số đó. Ma trận là bảng số vuông dùng để ghi các phép biến đổi và hệ phương trình.`,
    dungDe: R`Mô tả lực, vận tốc, độ dời, và mọi đại lượng có hướng. Trong bài thi, chuyên đề cho bài chứng minh đẳng thức vectơ, bài tính độ dài và góc bằng tọa độ, bài về ba điểm thẳng hàng và hai đường vuông góc, và bài giải hệ hai ẩn bằng định thức.`,
    lienHe: R`Tích vô hướng chứa $\cos$ của góc giữa hai vectơ nên nối với Lượng giác. Phương trình đường thẳng và khoảng cách trong Hình giải tích đều xây trên vectơ pháp tuyến và chỉ phương. Định thức cấp hai cho diện tích hình bình hành ở chuyên đề Hình phẳng.`,
  },
  tuDau: [
    R`Chỉ đường cho một người bạn: «đi $300$ mét» thì chưa đủ, phải nói «đi $300$ mét về hướng đông». Nhiều đại lượng cần cả độ lớn lẫn hướng như vậy: quãng dịch chuyển, vận tốc gió, lực kéo. Vectơ là cách ghi lại một đại lượng có hướng, và được vẽ bằng một mũi tên: mũi tên dài bao nhiêu là độ lớn, chỉ về đâu là hướng.`,
    R`Điều quan trọng nhất về vectơ là nó là một «chỉ dẫn di chuyển», không gắn với nơi xuất phát. «Sang phải $3$, lên $2$» là cùng một chỉ dẫn dù bạn đứng ở đâu. Vì vậy hai mũi tên cùng hướng và cùng độ dài được coi là một vectơ, dù vẽ ở hai chỗ khác nhau.`,
    R`Cộng hai vectơ là làm theo hai chỉ dẫn nối tiếp nhau. Nhân vectơ với một số là lặp lại hoặc co giãn chỉ dẫn đó. Khi viết chỉ dẫn bằng hai con số (đi ngang bao nhiêu; đi dọc bao nhiêu) thì mọi phép toán hình học biến thành cộng và nhân các con số, máy tính nào cũng làm được. Đó là sức mạnh của tọa độ.`,
    R`Ma trận là bước tiếp theo: một bảng số ghi lại một phép biến đổi áp dụng cho mọi vectơ cùng lúc, như quay, co giãn hay kéo xiên. Định thức của bảng cho biết phép biến đổi làm diện tích phóng to hay thu nhỏ bao nhiêu lần, và chính con số đó quyết định một hệ hai phương trình có đúng một nghiệm hay không.`,
  ],
  kyHieu: [
    { kh: R`$\overrightarrow{AB}$`, doc: R`Vectơ đi từ điểm $A$ đến điểm $B$: mũi tên có gốc ở $A$ và ngọn ở $B$.` },
    { kh: R`$\vec{a}$`, doc: R`Một vectơ được đặt tên bằng một chữ, không cần nói rõ gốc và ngọn.` },
    { kh: R`$|\vec{a}|$`, doc: R`Độ dài của vectơ $\vec{a}$, là một số không âm.` },
    { kh: R`$\vec{0}$`, doc: R`Vectơ không: chỉ dẫn «đứng yên», có độ dài $0$.` },
    { kh: R`$k\vec{a}$`, doc: R`Vectơ $\vec{a}$ được kéo dài gấp $k$ lần; nếu $k$ âm thì thêm việc quay ngược hướng.` },
    { kh: R`$(x;y)$`, doc: R`Tọa độ của một vectơ: đi ngang $x$ đơn vị và đi dọc $y$ đơn vị.` },
    { kh: R`$\vec{a}\cdot\vec{b}$`, doc: R`Tích vô hướng của hai vectơ. Kết quả là một con số, cho biết hai vectơ cùng chiều đến mức nào.` },
    { kh: R`$\det$`, doc: R`Định thức của một ma trận, một con số tính từ các phần tử của bảng.` },
  ],
  canBiet: [
    R`Hệ trục tọa độ $Oxy$ và tọa độ của một điểm.`,
    R`Định lí Pythagore và tỉ số lượng giác của góc nhọn.`,
    R`Giải hệ hai phương trình bậc nhất hai ẩn bằng phép thế hoặc cộng đại số.`,
  ],
  sections: [
    {
      title: "Vectơ và các phép toán hình học",
      items: [
        {
          kind: "dinh-nghia", title: "Vectơ",
          text: R`Vectơ $\overrightarrow{AB}$ có điểm đầu $A$ và điểm cuối $B$, độ dài $|\overrightarrow{AB}|=AB$. Hai vectơ bằng nhau khi cùng hướng và cùng độ dài. Vectơ không $\vec{0}$ có độ dài $0$ và hướng tùy ý.`,
          de: R`Vectơ là một mũi tên: nó nói đi theo hướng nào và đi bao xa. Hai mũi tên song song, cùng chiều và dài bằng nhau là cùng một vectơ, giống như lệnh «tiến ba bước» là một lệnh dù phát ra ở đầu sân hay cuối sân. Vectơ không là lệnh «đứng yên», nên không có hướng riêng.`,
        },
        {
          kind: "dinh-ly", title: "Quy tắc ba điểm và hình bình hành",
          text: R`Với ba điểm $A,B,C$ bất kì: $\overrightarrow{AB}+\overrightarrow{BC}=\overrightarrow{AC}$ và $\overrightarrow{AB}-\overrightarrow{AC}=\overrightarrow{CB}$. Nếu $ABCD$ là hình bình hành thì $\overrightarrow{AB}+\overrightarrow{AD}=\overrightarrow{AC}$.`,
          suy: [
            R`Cộng hai vectơ là thực hiện hai lần di chuyển nối tiếp. Đi từ $A$ đến $B$ rồi từ $B$ đến $C$ thì kết quả là đã đi từ $A$ đến $C$, nên $\overrightarrow{AB}+\overrightarrow{BC}=\overrightarrow{AC}$.`,
            R`Trừ một vectơ là cộng với vectơ đối của nó, và vectơ đối của $\overrightarrow{AC}$ là $\overrightarrow{CA}$. Vậy $\overrightarrow{AB}-\overrightarrow{AC}=\overrightarrow{CA}+\overrightarrow{AB}=\overrightarrow{CB}$, theo quy tắc ba điểm.`,
            R`Trong hình bình hành $ABCD$, hai cạnh đối $AD$ và $BC$ song song, cùng chiều và bằng nhau, nên $\overrightarrow{AD}=\overrightarrow{BC}$. Do đó $\overrightarrow{AB}+\overrightarrow{AD}=\overrightarrow{AB}+\overrightarrow{BC}=\overrightarrow{AC}$.`,
          ],
          suyKhac: [
            {
              cach: "Bằng tọa độ",
              buoc: [
                R`Chọn một hệ trục tọa độ và gọi tọa độ các điểm là $A(x_A;y_A)$, $B(x_B;y_B)$, $C(x_C;y_C)$. Theo định nghĩa, tọa độ của vectơ là tọa độ điểm cuối trừ tọa độ điểm đầu, nên $\overrightarrow{AB}=(x_B-x_A;\,y_B-y_A)$ và $\overrightarrow{BC}=(x_C-x_B;\,y_C-y_B)$.`,
                R`Cộng từng thành phần: $(x_B-x_A)+(x_C-x_B)=x_C-x_A$, vì $x_B$ bị triệt tiêu; thành phần thứ hai tương tự. Kết quả $(x_C-x_A;\,y_C-y_A)$ chính là tọa độ của $\overrightarrow{AC}$, nên $\overrightarrow{AB}+\overrightarrow{BC}=\overrightarrow{AC}$.`,
                R`Với phép trừ: $\overrightarrow{AB}-\overrightarrow{AC}=(x_B-x_C;\,y_B-y_C)$, đó là tọa độ của $\overrightarrow{CB}$ (điểm cuối $B$ trừ điểm đầu $C$).`,
                R`Với hình bình hành $ABCD$ ta có $\overrightarrow{AD}=\overrightarrow{BC}$, tức hai vectơ này có cùng tọa độ: $x_D-x_A=x_C-x_B$ và $y_D-y_A=y_C-y_B$. Suy ra $x_A+x_C=x_B+x_D$ và $y_A+y_C=y_B+y_D$. Khi đó $(x_B-x_A)+(x_D-x_A)=x_B+x_D-2x_A=x_C-x_A$, và thành phần thứ hai tương tự.`,
                R`Vậy $\overrightarrow{AB}+\overrightarrow{AD}$ có tọa độ $(x_C-x_A;\,y_C-y_A)$, tức là $\overrightarrow{AC}$. Cách này chỉ dùng định nghĩa tọa độ, không cần vẽ hình.`,
              ],
            },
          ],
        },
        {
          kind: "cong-thuc", title: "Nhân vectơ với một số",
          text: R`Vectơ $k\vec{a}$ cùng hướng với $\vec{a}$ khi $k>0$, ngược hướng khi $k<0$, và có độ dài $|k|\cdot|\vec{a}|$. Nhân với $-1$ cho vectơ đối.`,
          suy: [
            R`Đây là một định nghĩa, được chọn để khớp với phép cộng. Tổng $\vec{a}+\vec{a}$ là đi hai lần liên tiếp cùng một bước: cùng hướng và dài gấp đôi, nên gọi nó là $2\vec{a}$. Tương tự cho mọi số dương $k$.`,
            R`Với số âm: $\vec{a}+(-1)\vec{a}$ phải bằng $\vec{0}$, tức đi rồi quay về chỗ cũ. Vậy $(-1)\vec{a}$ là bước ngược lại, cùng độ dài nhưng ngược hướng. Nhân với $k<0$ là kéo giãn $|k|$ lần rồi quay ngược.`,
          ],
        },
        {
          kind: "tinh-chat", title: "Cùng phương và thẳng hàng",
          text: R`Với $\vec{a}\neq\vec{0}$, vectơ $\vec{b}$ cùng phương với $\vec{a}$ khi và chỉ khi có số $k$ để $\vec{b}=k\vec{a}$. Ba điểm $A,B,C$ thẳng hàng khi và chỉ khi $\overrightarrow{AB}=k\overrightarrow{AC}$ với một số $k$ nào đó.`,
          suy: [
            R`Nếu $\vec{b}=k\vec{a}$ thì theo định nghĩa phép nhân với một số, $\vec{b}$ cùng hướng hoặc ngược hướng với $\vec{a}$, tức cùng phương.`,
            R`Ngược lại, nếu $\vec{b}$ cùng phương với $\vec{a}\neq\vec{0}$: chọn $k=\frac{|\vec{b}|}{|\vec{a}|}$ khi hai vectơ cùng hướng và $k=-\frac{|\vec{b}|}{|\vec{a}|}$ khi ngược hướng. Vectơ $k\vec{a}$ khi đó có đúng hướng và đúng độ dài của $\vec{b}$, nên bằng $\vec{b}$.`,
            R`Hai vectơ $\overrightarrow{AB}$ và $\overrightarrow{AC}$ chung gốc $A$. Chúng cùng phương đúng khi hai mũi tên nằm trên cùng một đường thẳng đi qua $A$, tức là khi $A,B,C$ thẳng hàng.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Trung điểm và trọng tâm",
          text: R`$I$ là trung điểm của $AB$ khi $\overrightarrow{IA}+\overrightarrow{IB}=\vec{0}$, và khi đó $\overrightarrow{MA}+\overrightarrow{MB}=2\overrightarrow{MI}$ với mọi điểm $M$. $G$ là trọng tâm tam giác $ABC$ khi $\overrightarrow{GA}+\overrightarrow{GB}+\overrightarrow{GC}=\vec{0}$, và $\overrightarrow{MA}+\overrightarrow{MB}+\overrightarrow{MC}=3\overrightarrow{MG}$.`,
          suy: [
            R`Nếu $I$ là trung điểm của $AB$ thì $\overrightarrow{IA}$ và $\overrightarrow{IB}$ dài bằng nhau và ngược hướng, nên tổng của chúng là $\vec{0}$.`,
            R`Chèn điểm $I$ vào: $\overrightarrow{MA}=\overrightarrow{MI}+\overrightarrow{IA}$ và $\overrightarrow{MB}=\overrightarrow{MI}+\overrightarrow{IB}$. Cộng lại được $2\overrightarrow{MI}+\vec{0}=2\overrightarrow{MI}$.`,
            R`Trọng tâm $G$ nằm trên trung tuyến $AI$ (với $I$ là trung điểm $BC$) và cách $A$ xa gấp đôi cách $I$, nên $\overrightarrow{GA}=-2\overrightarrow{GI}$. Mà $\overrightarrow{GB}+\overrightarrow{GC}=2\overrightarrow{GI}$ theo bước trên, nên tổng ba vectơ bằng $\vec{0}$.`,
            R`Chèn điểm $G$ vào ba vectơ: $\overrightarrow{MA}+\overrightarrow{MB}+\overrightarrow{MC}=3\overrightarrow{MG}+\left(\overrightarrow{GA}+\overrightarrow{GB}+\overrightarrow{GC}\right)=3\overrightarrow{MG}$.`,
          ],
        },
        { kind: "luu-y", text: R`Vectơ có hướng, nên không cộng độ dài như cộng số. Nói chung $|\vec{a}+\vec{b}|\le|\vec{a}|+|\vec{b}|$, và dấu bằng chỉ khi hai vectơ cùng hướng.` },
        { kind: "vi-du", text: R`Với $M$ là trung điểm của $BC$, ta có $\overrightarrow{AM}=\frac{1}{2}\left(\overrightarrow{AB}+\overrightarrow{AC}\right)$. Chứng minh: cộng $\overrightarrow{AB}=\overrightarrow{AM}+\overrightarrow{MB}$ và $\overrightarrow{AC}=\overrightarrow{AM}+\overrightarrow{MC}$, rồi dùng $\overrightarrow{MB}+\overrightarrow{MC}=\vec{0}$.` },
      ],
    },
    {
      title: "Tọa độ của vectơ",
      items: [
        {
          kind: "dinh-nghia", title: "Tọa độ",
          text: R`Trong mặt phẳng, $\vec{a}=(x;y)$ nghĩa là $\vec{a}=x\vec{i}+y\vec{j}$. Trong không gian có thêm thành phần $z$. Với hai điểm $A$ và $B$, tọa độ vectơ $\overrightarrow{AB}$ là tọa độ điểm cuối trừ tọa độ điểm đầu.`,
          de: R`Tọa độ tách một chỉ dẫn di chuyển thành hai phần: đi ngang bao nhiêu và đi dọc bao nhiêu. Vectơ $(3;2)$ nghĩa là sang phải $3$ rồi lên $2$. Muốn biết chỉ dẫn đưa từ $A$ đến $B$, lấy vị trí của $B$ trừ vị trí của $A$ theo từng phần: đó là quãng phải đi ngang và quãng phải đi dọc.`,
        },
        {
          kind: "cong-thuc", title: "Phép toán theo tọa độ",
          text: R`$(a_1;a_2)\pm(b_1;b_2)=(a_1\pm b_1;\,a_2\pm b_2)$ và $k\cdot(a_1;a_2)=(ka_1;\,ka_2)$. Phép toán thực hiện từng thành phần một.`,
          suy: [
            R`Viết $\vec{a}=a_1\vec{i}+a_2\vec{j}$ và $\vec{b}=b_1\vec{i}+b_2\vec{j}$, với $\vec{i}$ là một bước ngang và $\vec{j}$ là một bước dọc. Cộng lại rồi gom các bước cùng loại: $\vec{a}+\vec{b}=(a_1+b_1)\vec{i}+(a_2+b_2)\vec{j}$.`,
            R`Nói bằng lời: đi ngang $a_1$ rồi đi ngang thêm $b_1$ thì tổng cộng đi ngang $a_1+b_1$, và phần dọc cũng vậy.`,
            R`Nhân với $k$ là kéo giãn cả hai phần: $k\vec{a}=ka_1\vec{i}+ka_2\vec{j}$, nên tọa độ là $(ka_1;ka_2)$.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Độ dài",
          text: R`$|\vec{a}|=\sqrt{x^2+y^2}$ trong mặt phẳng và $|\vec{a}|=\sqrt{x^2+y^2+z^2}$ trong không gian. Khoảng cách $AB=\sqrt{(x_B-x_A)^2+(y_B-y_A)^2}$ chính là độ dài của $\overrightarrow{AB}$.`,
          suy: [
            R`Vectơ $(x;y)$ là đi ngang $|x|$ rồi đi dọc $|y|$. Hai đoạn này vuông góc nhau và là hai cạnh góc vuông của một tam giác vuông, còn mũi tên là cạnh huyền. Theo định lí Pythagore, độ dài là $\sqrt{x^2+y^2}$.`,
            R`Vectơ $\overrightarrow{AB}$ có tọa độ $(x_B-x_A;\,y_B-y_A)$, nên khoảng cách $AB$ là độ dài của vectơ này.`,
            R`Trong không gian dùng Pythagore hai lần: đường chéo ở mặt đáy dài $\sqrt{x^2+y^2}$, rồi đường chéo đó cùng với đoạn thẳng đứng $|z|$ tạo một tam giác vuông có cạnh huyền $\sqrt{x^2+y^2+z^2}$.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Trung điểm và trọng tâm",
          text: R`Trung điểm $I$ của $AB$ có tọa độ $\left(\frac{x_A+x_B}{2};\frac{y_A+y_B}{2}\right)$. Trọng tâm $G$ của tam giác $ABC$ có tọa độ $\left(\frac{x_A+x_B+x_C}{3};\frac{y_A+y_B+y_C}{3}\right)$.`,
          suy: [
            R`Trong hệ thức $\overrightarrow{MA}+\overrightarrow{MB}=2\overrightarrow{MI}$, chọn $M$ là gốc tọa độ $O$: $\overrightarrow{OI}=\frac{1}{2}\left(\overrightarrow{OA}+\overrightarrow{OB}\right)$.`,
            R`Tọa độ của một điểm chính là tọa độ của vectơ đi từ gốc tới điểm đó. Cộng hai vectơ theo từng thành phần rồi chia đôi được tọa độ trung điểm là trung bình cộng tọa độ hai đầu.`,
            R`Với trọng tâm, từ $\overrightarrow{OA}+\overrightarrow{OB}+\overrightarrow{OC}=3\overrightarrow{OG}$ suy ra tọa độ $G$ là trung bình cộng tọa độ ba đỉnh.`,
          ],
        },
        {
          kind: "tinh-chat", title: "Điều kiện cùng phương",
          text: R`Hai vectơ $(a_1;a_2)$ và $(b_1;b_2)$ cùng phương khi và chỉ khi $a_1b_2-a_2b_1=0$. Biểu thức này là định thức, sẽ gặp lại ở phần ma trận.`,
          suy: [
            R`Chiều thuận: nếu $\vec{b}=k\vec{a}$ thì $b_1=ka_1$ và $b_2=ka_2$. Thay vào: $a_1b_2-a_2b_1=a_1ka_2-a_2ka_1=0$.`,
            R`Chiều ngược: giả sử $a_1b_2=a_2b_1$ và $\vec{a}\neq\vec{0}$, chẳng hạn $a_1\neq 0$. Đặt $k=\frac{b_1}{a_1}$, khi đó $b_1=ka_1$ và $b_2=\frac{a_2b_1}{a_1}=ka_2$. Vậy $\vec{b}=k\vec{a}$, hai vectơ cùng phương. Trường hợp $a_2\neq 0$ làm tương tự.`,
          ],
        },
        { kind: "luu-y", text: R`Tọa độ $\overrightarrow{AB}$ là ngọn trừ gốc, tức là điểm cuối trừ điểm đầu. Đổi thứ tự ra vectơ đối $\overrightarrow{BA}$, đổi dấu cả hai thành phần.` },
        { kind: "vi-du", text: R`Với $A(1;2)$ và $B(4;6)$ có $\overrightarrow{AB}=(3;4)$ và $|\overrightarrow{AB}|=\sqrt{9+16}=5$. Trung điểm của $AB$ là $\left(\frac{5}{2};4\right)$.` },
        { kind: "vi-du", text: R`Độ dài của $(2;1;2)$ là $\sqrt{4+1+4}=3$, không phải $2+1+2=5$. Cộng các thành phần là lỗi hay gặp, vì độ dài cần bình phương trước rồi lấy căn.` },
      ],
    },
    {
      title: "Tích vô hướng và góc",
      items: [
        {
          kind: "dinh-nghia", title: "Tích vô hướng",
          text: R`Tích vô hướng của hai vectơ khác $\vec{0}$ là $\vec{a}\cdot\vec{b}=|\vec{a}|\,|\vec{b}|\cos\varphi$ với $\varphi$ là góc giữa chúng, $0^\circ\le\varphi\le 180^\circ$. Kết quả là một số, không phải vectơ.`,
          de: R`Tích vô hướng đo xem hai vectơ «giúp nhau» đến đâu. Kéo một chiếc xe: lực kéo cùng hướng xe chạy thì có ích trọn vẹn; kéo chếch đi thì chỉ một phần có ích; kéo vuông góc với hướng chạy thì không giúp gì; kéo ngược lại thì cản trở. Thừa số cosin của góc chính là «tỉ lệ có ích» đó.`,
        },
        {
          kind: "cong-thuc", title: "Theo tọa độ",
          text: R`$\vec{a}\cdot\vec{b}=a_1b_1+a_2b_2$ trong mặt phẳng, và thêm $a_3b_3$ trong không gian. Công thức này suy ra từ định nghĩa và quy tắc phân phối, không cần biết góc.`,
          suy: [
            R`Vẽ hai vectơ $\vec{a}$, $\vec{b}$ chung gốc; cạnh thứ ba của tam giác là $\vec{a}-\vec{b}$. Định lí cosin cho $|\vec{a}-\vec{b}|^2=|\vec{a}|^2+|\vec{b}|^2-2|\vec{a}|\,|\vec{b}|\cos\varphi$.`,
            R`Số hạng cuối chính là hai lần tích vô hướng, nên $\vec{a}\cdot\vec{b}=\frac{1}{2}\left(|\vec{a}|^2+|\vec{b}|^2-|\vec{a}-\vec{b}|^2\right)$.`,
            R`Thay tọa độ: $\frac{1}{2}\left[a_1^2+a_2^2+b_1^2+b_2^2-(a_1-b_1)^2-(a_2-b_2)^2\right]$. Khai triển hai bình phương, các số hạng bình phương triệt tiêu hết, còn lại $\frac{1}{2}(2a_1b_1+2a_2b_2)=a_1b_1+a_2b_2$.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Góc giữa hai vectơ",
          text: R`$\cos\varphi=\frac{\vec{a}\cdot\vec{b}}{|\vec{a}|\,|\vec{b}|}$. Tích vô hướng dương thì góc nhọn, âm thì góc tù, bằng $0$ thì góc vuông.`,
          suy: [
            R`Chia hai vế của định nghĩa $\vec{a}\cdot\vec{b}=|\vec{a}|\,|\vec{b}|\cos\varphi$ cho tích hai độ dài, là số dương vì hai vectơ khác $\vec{0}$.`,
            R`Hai độ dài dương nên dấu của tích vô hướng là dấu của $\cos\varphi$. Với góc từ $0^\circ$ đến $180^\circ$: cosin dương khi góc nhọn, bằng $0$ khi góc vuông, âm khi góc tù.`,
          ],
        },
        {
          kind: "tinh-chat", title: "Các tính chất",
          text: R`Hai vectơ vuông góc khi và chỉ khi $\vec{a}\cdot\vec{b}=0$. Có $\vec{a}\cdot\vec{a}=|\vec{a}|^2$, tích vô hướng giao hoán và phân phối đối với phép cộng. Luôn có $|\vec{a}\cdot\vec{b}|\le|\vec{a}|\,|\vec{b}|$.`,
          suy: [
            R`Vuông góc nghĩa là $\varphi=90^\circ$, mà $\cos 90^\circ=0$ nên tích bằng $0$. Ngược lại, với hai vectơ khác $\vec{0}$, tích bằng $0$ buộc $\cos\varphi=0$, tức góc vuông.`,
            R`Một vectơ tạo với chính nó góc $0^\circ$, và $\cos 0^\circ=1$, nên $\vec{a}\cdot\vec{a}=|\vec{a}|^2$.`,
            R`Giao hoán và phân phối thấy ngay từ công thức tọa độ: $a_1b_1+a_2b_2=b_1a_1+b_2a_2$, và $a_1(b_1+c_1)+a_2(b_2+c_2)=(a_1b_1+a_2b_2)+(a_1c_1+a_2c_2)$.`,
            R`Vì $|\cos\varphi|\le 1$ nên $|\vec{a}\cdot\vec{b}|=|\vec{a}|\,|\vec{b}|\,|\cos\varphi|\le|\vec{a}|\,|\vec{b}|$.`,
          ],
        },
        { kind: "cach-lam", title: "Tìm tham số để vuông góc", text: R`Cho tích vô hướng bằng $0$ rồi giải phương trình theo tham số. Với $\vec{a}=(m;3)$ và $\vec{b}=(2;-1)$ có $2m-3=0$, nên $m=\frac{3}{2}$.` },
        { kind: "luu-y", text: R`Tích vô hướng là một số, nên $(\vec{a}\cdot\vec{b})\vec{c}$ là một vectơ cùng phương với $\vec{c}$, còn $\vec{a}(\vec{b}\cdot\vec{c})$ cùng phương với $\vec{a}$. Hai vectơ này nói chung khác nhau, tích vô hướng không có tính kết hợp.` },
        { kind: "vi-du", text: R`Có $(1;2;-1)\cdot(2;-1;0)=2-2+0=0$, nên hai vectơ vuông góc. Góc giữa $(1;0)$ và $(1;1)$ có $\cos\varphi=\frac{1}{1\cdot\sqrt{2}}=\frac{\sqrt{2}}{2}$, tức $\varphi=45^\circ$.` },
      ],
    },
    {
      title: "Ma trận và định thức cấp hai",
      items: [
        {
          kind: "dinh-nghia", title: "Ma trận và định thức",
          text: R`Ma trận cấp hai là bảng $\begin{pmatrix}a&b\\c&d\end{pmatrix}$. Định thức của nó là $\det=ad-bc$, tích đường chéo chính trừ tích đường chéo phụ.`,
          de: R`Ma trận là một bảng số xếp theo hàng và cột. Có thể coi bảng cấp hai là hai vectơ viết chồng lên nhau, hoặc là một cái máy biến mỗi vectơ thành một vectơ khác. Định thức là một con số rút ra từ bảng: lấy tích hai số trên đường chéo đi xuống trừ tích hai số trên đường chéo đi lên.`,
        },
        {
          kind: "cong-thuc", title: "Cộng và nhân ma trận",
          text: R`Cộng hai ma trận cùng cỡ thì cộng từng vị trí. Phép nhân là $\begin{pmatrix}a&b\\c&d\end{pmatrix}\begin{pmatrix}e&f\\g&h\end{pmatrix}=\begin{pmatrix}ae+bg&af+bh\\ce+dg&cf+dh\end{pmatrix}$: lấy hàng của ma trận đầu nhân với cột của ma trận sau.`,
          suy: [
            R`Coi ma trận $\begin{pmatrix}a&b\\c&d\end{pmatrix}$ là cái máy biến vectơ $(x;y)$ thành $(ax+by;\,cx+dy)$. Nhân hai ma trận được định nghĩa là nối hai máy: cho máy đứng sau chạy trước.`,
            R`Máy thứ hai biến $(x;y)$ thành $(x';y')=(ex+fy;\,gx+hy)$. Máy thứ nhất biến tiếp thành $(ax'+by';\,cx'+dy')$.`,
            R`Thay vào: $ax'+by'=(ae+bg)x+(af+bh)y$ và $cx'+dy'=(ce+dg)x+(cf+dh)y$. Bốn hệ số này chính là bốn phần tử của ma trận tích, và mỗi hệ số là một hàng của ma trận đầu nhân với một cột của ma trận sau.`,
          ],
        },
        {
          kind: "tinh-chat", title: "Nhân không giao hoán",
          text: R`Nói chung $AB\neq BA$. Phép nhân có tính kết hợp và có ma trận đơn vị $I=\begin{pmatrix}1&0\\0&1\end{pmatrix}$ thỏa $AI=IA=A$.`,
          suy: [
            R`Một ví dụ là đủ: với $A=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ và $B=\begin{pmatrix}1&0\\1&1\end{pmatrix}$ thì $AB=\begin{pmatrix}2&1\\1&1\end{pmatrix}$ còn $BA=\begin{pmatrix}1&1\\1&2\end{pmatrix}$. Thứ tự làm hai phép biến đổi có ảnh hưởng, như đi tất rồi đi giày khác với đi giày rồi đi tất.`,
            R`Tính kết hợp: nhân ma trận là nối các phép biến đổi. Làm ba phép liên tiếp thì nhóm hai phép đầu hay hai phép sau lại với nhau, kết quả cuối cùng vẫn thế.`,
            R`Ma trận $I$ biến $(x;y)$ thành $(1x+0y;\,0x+1y)=(x;y)$, tức không làm gì cả. Nối một máy với máy «không làm gì» thì vẫn được chính máy đó.`,
          ],
        },
        {
          kind: "dinh-ly", title: "Định thức và nghịch đảo",
          text: R`Có $\det(AB)=\det A\cdot\det B$. Ma trận có nghịch đảo khi và chỉ khi $\det A\neq 0$, và khi đó $A^{-1}=\frac{1}{ad-bc}\begin{pmatrix}d&-b\\-c&a\end{pmatrix}$.`,
          suy: [
            R`Tính định thức của ma trận tích: $(ae+bg)(cf+dh)-(af+bh)(ce+dg)$. Khai triển, các số hạng $aecf$ và $bgdh$ triệt tiêu, còn lại $adeh+bcfg-adfg-bceh=(ad-bc)(eh-fg)$. Vậy $\det(AB)=\det A\cdot\det B$.`,
            R`Nhân thử: $\begin{pmatrix}a&b\\c&d\end{pmatrix}\begin{pmatrix}d&-b\\-c&a\end{pmatrix}=\begin{pmatrix}ad-bc&0\\0&ad-bc\end{pmatrix}$. Khi $ad-bc\neq 0$, chia cho số đó thì được ma trận đơn vị $I$, nên ma trận nghịch đảo đúng như công thức.`,
            R`Nếu $\det A=0$ mà vẫn có nghịch đảo thì $\det A\cdot\det A^{-1}=\det I=1$, tức $0=1$, vô lí. Vậy định thức bằng $0$ thì không có nghịch đảo.`,
          ],
          suyKhac: [
            {
              cach: "Bằng diện tích",
              buoc: [
                R`Ma trận $M$ đưa hình vuông đơn vị thành hình bình hành dựng trên hai cột của nó. Theo mục «Ý nghĩa hình học», diện tích hình đó là $|\det M|$ (mục này tính cho hai vectơ $(a;b)$, $(c;d)$ và cho hai cột $(a;c)$, $(b;d)$ thì kết quả vẫn là $|ad-bc|$). Một phép biến đổi như vậy đổi mọi diện tích với cùng một tỉ lệ: hình bất kì được chia thành các ô vuông nhỏ, và ô nào cũng bị đổi theo tỉ lệ $|\det M|$.`,
                R`Làm phép biến đổi $B$ rồi phép biến đổi $A$ chính là nhân với ma trận $AB$. Diện tích bị nhân với $|\det B|$ rồi với $|\det A|$, tức nhân với $|\det A|\cdot|\det B|$ sau hai bước, và cũng bằng $|\det(AB)|$ sau một bước. Vậy $|\det(AB)|=|\det A|\,|\det B|$: cách này chứng minh phần giá trị tuyệt đối.`,
                R`Phần dấu lấy từ phép tính trực tiếp ở cách thứ nhất: đó là khai triển đại số cho $\det(AB)=\det A\cdot\det B$, có cả dấu. Cách diện tích cho thấy lí do hình học vì sao hệ số đổi diện tích nhân lên khi ghép hai phép biến đổi, và nó chỉ dựa trên tính chất đổi diện tích đều của phép biến đổi tuyến tính.`,
              ],
            },
            {
              cach: "Bằng cách giải hệ phương trình",
              buoc: [
                R`Ma trận nghịch đảo $X$ của $A=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ thỏa $AX=I$. Cột thứ nhất $(x;y)$ của $X$ phải thỏa hệ $ax+by=1$, $cx+dy=0$; cột thứ hai $(x';y')$ phải thỏa $ax'+by'=0$, $cx'+dy'=1$.`,
                R`Giải hệ thứ nhất bằng quy tắc Cramer ở phần sau (chứng minh ở đó bằng khử ẩn, không dùng nghịch đảo), với $D=ad-bc\neq 0$: $D_x=1\cdot d-b\cdot 0=d$ và $D_y=a\cdot 0-1\cdot c=-c$, nên $(x;y)=\left(\frac{d}{D};\frac{-c}{D}\right)$.`,
                R`Hệ thứ hai có vế phải $(0;1)$: $D_x=0\cdot d-b\cdot 1=-b$ và $D_y=a\cdot 1-0\cdot c=a$, nên $(x';y')=\left(\frac{-b}{D};\frac{a}{D}\right)$. Ghép hai cột lại: $A^{-1}=\frac{1}{ad-bc}\begin{pmatrix}d&-b\\-c&a\end{pmatrix}$. Nhân thử phía còn lại cũng cho $XA=I$, nên $X$ là nghịch đảo hai phía.`,
                R`Nếu $D=0$ thì hai cột của $A$ cùng phương, nên mọi vectơ $A\begin{pmatrix}x\\y\end{pmatrix}$ đều nằm trên một đường thẳng qua gốc. Hai vectơ $(1;0)$ và $(0;1)$ không cùng phương nên không thể cùng nằm trên đường đó, vì thế không tồn tại $X$ thỏa $AX=I$ và $A$ không có nghịch đảo.`,
              ],
            },
          ],
        },
        {
          kind: "tinh-chat", title: "Ý nghĩa hình học",
          text: R`Giá trị $|ad-bc|$ là diện tích hình bình hành dựng trên hai vectơ $(a;b)$ và $(c;d)$. Định thức bằng $0$ nghĩa là hai vectơ cùng phương và hình bình hành bị dẹt thành đoạn thẳng.`,
          suy: [
            R`Hình bình hành dựng trên $\vec{u}=(a;b)$ và $\vec{v}=(c;d)$ có đáy $|\vec{u}|$ và chiều cao $|\vec{v}|\sin\varphi$, nên diện tích là $S=|\vec{u}|\,|\vec{v}|\sin\varphi$.`,
            R`Bình phương lên và dùng $\sin^2\varphi=1-\cos^2\varphi$: $S^2=|\vec{u}|^2|\vec{v}|^2-(\vec{u}\cdot\vec{v})^2=(a^2+b^2)(c^2+d^2)-(ac+bd)^2$.`,
            R`Khai triển và rút gọn, vế phải bằng $(ad-bc)^2$. Lấy căn được $S=|ad-bc|$. Khi định thức bằng $0$ thì diện tích bằng $0$, đúng với điều kiện hai vectơ cùng phương.`,
          ],
        },
        { kind: "luu-y", text: R`Định thức không cộng tính: nói chung $\det(A+B)\neq\det A+\det B$. Chỉ phép nhân mới có $\det(AB)=\det A\cdot\det B$.` },
        { kind: "vi-du", text: R`Với $A=\begin{pmatrix}1&2\\3&4\end{pmatrix}$ có $\det A=4-6=-2$ và $A^{-1}=-\frac{1}{2}\begin{pmatrix}4&-2\\-3&1\end{pmatrix}=\begin{pmatrix}-2&1\\ \frac{3}{2}&-\frac{1}{2}\end{pmatrix}$. Hình bình hành dựng trên $(3;1)$ và $(1;2)$ có diện tích $|3\cdot 2-1\cdot 1|=5$.` },
      ],
    },
    {
      title: "Hệ hai phương trình bậc nhất hai ẩn",
      items: [
        {
          kind: "dinh-ly", title: "Quy tắc Cramer",
          text: R`Xét hệ $ax+by=e$ và $cx+dy=f$, đặt $D=ad-bc$, $D_x=ed-bf$ và $D_y=af-ec$. Nếu $D\neq 0$ thì hệ có đúng một nghiệm $x=\frac{D_x}{D}$, $y=\frac{D_y}{D}$.`,
          suy: [
            R`Khử $y$: nhân phương trình thứ nhất với $d$, phương trình thứ hai với $b$ rồi trừ nhau. Phần chứa $y$ triệt tiêu, còn $(ad-bc)x=ed-bf$, tức $D\cdot x=D_x$.`,
            R`Khử $x$: nhân phương trình thứ hai với $a$, phương trình thứ nhất với $c$ rồi trừ nhau, còn $(ad-bc)y=af-ec$, tức $D\cdot y=D_y$.`,
            R`Khi $D\neq 0$, chia được và chỉ có một đáp số: $x=\frac{D_x}{D}$, $y=\frac{D_y}{D}$. Thay ngược vào phương trình đầu: $a(ed-bf)+b(af-ec)=e(ad-bc)$, nên vế trái đúng bằng $e$; phương trình sau kiểm tương tự.`,
          ],
          suyKhac: [
            {
              cach: "Bằng ma trận nghịch đảo",
              buoc: [
                R`Viết hệ dưới dạng ma trận $A\begin{pmatrix}x\\y\end{pmatrix}=\begin{pmatrix}e\\f\end{pmatrix}$ với $A=\begin{pmatrix}a&b\\c&d\end{pmatrix}$. Khi $D=ad-bc\neq 0$, ma trận $A$ có nghịch đảo $A^{-1}=\frac{1}{D}\begin{pmatrix}d&-b\\-c&a\end{pmatrix}$, kiểm được bằng cách nhân thử hai phía như ở mục «Định thức và nghịch đảo», vì $\begin{pmatrix}d&-b\\-c&a\end{pmatrix}A=D\cdot I$ cũng đúng như $A\begin{pmatrix}d&-b\\-c&a\end{pmatrix}=D\cdot I$.`,
                R`Nhân cả hai vế với $A^{-1}$ từ bên trái: $\begin{pmatrix}x\\y\end{pmatrix}=A^{-1}\begin{pmatrix}e\\f\end{pmatrix}$. Vế phải chỉ có một giá trị, nên hệ có không quá một nghiệm. Ngược lại, nhân $A$ vào giá trị đó thì được đúng $\begin{pmatrix}e\\f\end{pmatrix}$, nên nó thật sự là nghiệm.`,
                R`Tính tích: $\frac{1}{D}\begin{pmatrix}de-bf\\-ce+af\end{pmatrix}$. Thành phần đầu là $\frac{ed-bf}{D}=\frac{D_x}{D}$, thành phần sau là $\frac{af-ec}{D}=\frac{D_y}{D}$.`,
              ],
            },
            {
              cach: "Bằng diện tích",
              buoc: [
                R`Gọi $\vec{u}=(a;c)$, $\vec{v}=(b;d)$ là hai cột và $\vec{w}=(e;f)$ là vế phải. Hệ nói rằng $x\vec{u}+y\vec{v}=\vec{w}$. Với hai vectơ $\vec{p}=(p_1;p_2)$, $\vec{q}=(q_1;q_2)$, gọi $[\vec{p},\vec{q}]=p_1q_2-p_2q_1$ là diện tích có dấu của hình bình hành dựng trên chúng; số này tuyến tính theo từng vectơ và bằng $0$ khi hai vectơ cùng phương. Khi đó $D=[\vec{u},\vec{v}]$.`,
                R`Xét hình bình hành dựng trên $\vec{w}$ và $\vec{v}$, có diện tích có dấu là $ed-bf=D_x$. Thay $\vec{w}=x\vec{u}+y\vec{v}$: phần $y\vec{v}$ cùng phương với đáy $\vec{v}$ nên chỉ trượt đỉnh dọc theo đáy, không đổi diện tích. Còn lại hình bình hành dựng trên $x\vec{u}$ và $\vec{v}$, diện tích $x\cdot D$.`,
                R`Vậy nếu có nghiệm thì $D_x=x\cdot D$, tức $x=\frac{D_x}{D}$ khi $D\neq 0$. Nghiệm có tồn tại vì khi $D\neq 0$ hai vectơ $\vec{u},\vec{v}$ không cùng phương nên mọi $\vec{w}$ là tổ hợp của chúng. Với $y$: hình bình hành dựng trên $\vec{u}$ và $\vec{w}$ có diện tích có dấu $af-ec=D_y$, và cùng lí do cho $D_y=y\cdot D$.`,
              ],
            },
          ],
        },
        {
          kind: "dinh-ly", title: "Khi định thức bằng không",
          text: R`Nếu $D=0$ mà $D_x$ hoặc $D_y$ khác $0$ thì hệ vô nghiệm. Nếu $D=D_x=D_y=0$, và mỗi phương trình có ít nhất một hệ số khác $0$, thì hệ có vô số nghiệm.`,
          suy: [
            R`Hai hệ thức $D\cdot x=D_x$ và $D\cdot y=D_y$ ở mục trước đúng với mọi nghiệm của hệ. Nếu $D=0$ thì vế trái bằng $0$; nếu lúc đó $D_x\neq 0$ hoặc $D_y\neq 0$ thì ta có $0$ bằng một số khác $0$, vô lí. Vậy hệ không có nghiệm.`,
            R`Nếu cả ba định thức bằng $0$ thì $ad=bc$, $ed=bf$ và $af=ec$: các hệ số của hai phương trình tỉ lệ với nhau, nên phương trình này là bội của phương trình kia. Hai phương trình thực ra là một, biểu diễn cùng một đường thẳng, và mọi điểm trên đường thẳng đó đều là nghiệm.`,
          ],
          suyKhac: [
            {
              cach: "Bằng hình học của hai cột",
              buoc: [
                R`Gọi $\vec{u}=(a;c)$, $\vec{v}=(b;d)$ là hai cột và $\vec{w}=(e;f)$. Hệ là $x\vec{u}+y\vec{v}=\vec{w}$: tìm cách ghép $\vec{u}$ và $\vec{v}$ để ra $\vec{w}$. Điều kiện cùng phương cho biết $D=ad-bc=0$ khi và chỉ khi $\vec{u}$ và $\vec{v}$ cùng phương.`,
                R`Vì mỗi phương trình có ít nhất một hệ số khác $0$, hai cột không đồng thời bằng $\vec{0}$. Khi hai cột cùng phương, mọi tổ hợp $x\vec{u}+y\vec{v}$ đều nằm trên cùng một đường thẳng $L$ qua gốc, dù chọn $x$, $y$ thế nào.`,
                R`Nếu $\vec{w}$ không nằm trên $L$ thì không tổ hợp nào ra được $\vec{w}$, hệ vô nghiệm. Việc $\vec{w}$ không cùng phương với cột khác $\vec{0}$ chính là điều kiện $D_x=ed-bf\neq 0$ hoặc $D_y=af-ec\neq 0$, vì hai số này là các định thức của $(\vec{w},\vec{v})$ và $(\vec{u},\vec{w})$.`,
                R`Nếu $\vec{w}$ nằm trên $L$ (tức $D_x=D_y=0$), giả sử $\vec{u}\neq\vec{0}$ và $\vec{v}=k\vec{u}$, $\vec{w}=s\vec{u}$. Khi đó $x\vec{u}+y\vec{v}=(x+ky)\vec{u}$ và hệ chỉ còn đòi $x+ky=s$: một phương trình cho hai ẩn, có vô số nghiệm $(x;y)$. Trường hợp $\vec{u}=\vec{0}$ làm tương tự với $\vec{v}$.`,
              ],
            },
          ],
        },
        { kind: "cach-lam", title: "Ý nghĩa hình học", text: R`Mỗi phương trình là một đường thẳng. Nếu $D\neq 0$ hai đường cắt nhau tại một điểm. Nếu $D=0$ hai đường song song, vô nghiệm, hoặc trùng nhau, vô số nghiệm.` },
        { kind: "cach-lam", title: "Giải và biện luận theo tham số", text: R`Tính $D$ theo tham số, giải $D=0$ để tìm các giá trị đặc biệt, rồi xét riêng từng giá trị đó. Với mọi giá trị còn lại, hệ có nghiệm duy nhất theo công thức Cramer.` },
        { kind: "luu-y", text: R`Phải kiểm $D\neq 0$ trước khi chia cho $D$. Nhiều bài tham số mất điểm vì quên xét các giá trị làm $D=0$.` },
        { kind: "vi-du", text: R`Hệ $x+2y=5$ và $3x+4y=6$ có $D=4-6=-2$, $D_x=5\cdot 4-2\cdot 6=8$, $D_y=1\cdot 6-5\cdot 3=-9$. Nghiệm là $x=\frac{8}{-2}=-4$ và $y=\frac{-9}{-2}=\frac{9}{2}$; thay lại: $-4+9=5$ và $-12+18=6$.` },
        { kind: "vi-du", text: R`Hệ $mx+y=1$ và $x+my=1$ có $D=m^2-1$ nên có một nghiệm khi $m\neq\pm 1$. Với $m=1$ hai phương trình trùng nhau, vô số nghiệm. Với $m=-1$ hệ thành $-x+y=1$ và $x-y=1$, vô nghiệm.` },
      ],
    },
  ],
  canNho: [
    R`Quy tắc ba điểm: $\overrightarrow{AB}+\overrightarrow{BC}=\overrightarrow{AC}$; hình bình hành $ABCD$: $\overrightarrow{AB}+\overrightarrow{AD}=\overrightarrow{AC}$.`,
    R`Tọa độ $\overrightarrow{AB}$ là điểm cuối trừ điểm đầu; độ dài là căn của tổng bình phương các thành phần.`,
    R`Ba điểm thẳng hàng khi $\overrightarrow{AB}=k\overrightarrow{AC}$; hai vectơ cùng phương khi $a_1b_2-a_2b_1=0$.`,
    R`Tích vô hướng: $\vec{a}\cdot\vec{b}=a_1b_1+a_2b_2=|\vec{a}||\vec{b}|\cos\varphi$; bằng $0$ thì vuông góc.`,
    R`Góc giữa hai vectơ: $\cos\varphi=\frac{\vec{a}\cdot\vec{b}}{|\vec{a}||\vec{b}|}$.`,
    R`Định thức cấp hai: $\det=ad-bc$; $|ad-bc|$ là diện tích hình bình hành.`,
    R`Nhân ma trận không giao hoán; $\det(AB)=\det A\det B$; có nghịch đảo khi $\det\neq 0$.`,
    R`Hệ hai ẩn có đúng một nghiệm khi $D=ad-bc\neq 0$, nghiệm là $x=\frac{D_x}{D}$, $y=\frac{D_y}{D}$.`,
  ],
  lienQuan: [
    { id: "analytic", vi: R`Vectơ pháp tuyến và vectơ chỉ phương là công cụ để viết phương trình đường thẳng và tính khoảng cách.` },
    { id: "trig", vi: R`Tích vô hướng chứa $\cos\varphi$, nên tính góc giữa hai vectơ thực chất là một bài lượng giác.` },
    { id: "triangle", vi: R`Trọng tâm, trung điểm và diện tích hình bình hành bằng định thức đều là kiến thức hình học viết bằng vectơ.` },
  ],
  checks: [
    { expr: "sqrt(2**2+1**2+2**2)", expect: "3" },
    { expr: "2+1+2", expect: "5" },
    { expr: "sqrt((4-1)**2+(6-2)**2)", expect: "5" },
    { expr: "Rational(1+4,2)", expect: "Rational(5,2)" },
    { expr: "Rational(2+6,2)", expect: "4" },
    { expr: "1*2+2*(-1)+(-1)*0", expect: "0" },
    { expr: "(1*1+0*1)/(1*sqrt(2))", expect: "sqrt(2)/2" },
    { expr: "acos(sqrt(2)/2)", expect: "pi/4" },
    { expr: "solve(2*m-3, m)", expect: "[3/2]" },
    { expr: "Matrix([[1,2],[3,4]]).det()", expect: "-2" },
    { expr: "Matrix([[1,2],[3,4]])*Matrix([[0,1],[1,0]])", expect: "Matrix([[2,1],[4,3]])" },
    { expr: "Matrix([[0,1],[1,0]])*Matrix([[1,2],[3,4]])", expect: "Matrix([[3,4],[1,2]])" },
    { expr: "Matrix([[1,2],[3,4]]).inv()", expect: "Matrix([[-2,1],[Rational(3,2),Rational(-1,2)]])" },
    { expr: "simplify(Matrix([[a,b],[c,d]]).det()*Matrix([[e,f],[g,h]]).det()-(Matrix([[a,b],[c,d]])*Matrix([[e,f],[g,h]])).det())", expect: "0" },
    { expr: "abs(3*2-1*1)", expect: "5" },
    { expr: "1*4-2*3", expect: "-2" },
    { expr: "5*4-2*6", expect: "8" },
    { expr: "1*6-5*3", expect: "-9" },
    { expr: "Rational(8,-2)", expect: "-4" },
    { expr: "Rational(-9,-2)", expect: "Rational(9,2)" },
    { expr: "-4+2*Rational(9,2)", expect: "5" },
    { expr: "3*(-4)+4*Rational(9,2)", expect: "6" },
    { expr: "solve([x+2*y-5, 3*x+4*y-6], [x,y])", expect: "{x: -4, y: Rational(9,2)}" },
    { expr: "Matrix([[m,1],[1,m]]).det()", expect: "m**2-1" },
    { expr: "solve([-x+y-1, x-y-1], [x,y])", expect: "[]" },
    { expr: "simplify((xB-xA)+(xC-xB)-(xC-xA))", expect: "0" },
    { expr: "simplify((xB-xA)+((xA+xC-xB)-xA)-(xC-xA))", expect: "0" },
    { expr: "simplify((Matrix([[a,b],[c,d]]).inv())[0,0]-d/(a*d-b*c))", expect: "0" },
    { expr: "simplify((Matrix([[a,b],[c,d]]).inv()*Matrix([e,f]))[0]-(e*d-b*f)/(a*d-b*c))", expect: "0" },
    { expr: "simplify((Matrix([[a,b],[c,d]]).inv()*Matrix([e,f]))[1]-(a*f-e*c)/(a*d-b*c))", expect: "0" },
    { expr: "Matrix([[e,b],[f,d]]).det()-(e*d-b*f)", expect: "0" },
    { expr: "Matrix([[a,e],[c,f]]).det()-(a*f-e*c)", expect: "0" },
    { expr: "simplify(Matrix([[x*a+y*b,b],[x*c+y*d,d]]).det()-x*(a*d-b*c))", expect: "0" },
    { expr: "simplify(Matrix([[a,x*a+y*b],[c,x*c+y*d]]).det()-y*(a*d-b*c))", expect: "0" },
  ],
};
