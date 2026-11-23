import type { TopicKnowledge } from "../knowledge/types.ts";

const R = String.raw;

export const linalgKnowledge: TopicKnowledge = {
  id: "linalg",
  tongQuat: {
    la: R`Đại số tuyến tính nghiên cứu các phép toán «thẳng»: cộng vectơ, nhân với một số, và những phép biến đổi giữ nguyên hai thao tác đó, được ghi bằng ma trận. Môn học này trả lời ba câu hỏi: hệ phương trình có nghiệm không và bao nhiêu nghiệm, một phép biến đổi làm gì với mặt phẳng hay không gian, và có hướng nào mà phép biến đổi chỉ kéo giãn chứ không làm lệch.`,
    dungDe: R`Giải hệ nhiều ẩn trong kĩ thuật và kinh tế, xếp hạng trang web, nén ảnh, dự đoán bằng hồi quy, mô phỏng hệ dao động, và là ngôn ngữ của học máy: một lớp mạng nơ-ron chính là một ma trận cộng một phép gấp. Trong thi cử đại học, môn này cho bài khử Gauss, tìm hạng, tính định thức, tìm giá trị riêng và chéo hóa.`,
    lienHe: R`Nối thẳng từ chuyên đề Vectơ và ma trận ở THPT: định thức cấp hai, nghịch đảo và quy tắc Cramer là trường hợp nhỏ của môn này. Lũy thừa ma trận cho công thức tường minh của dãy Fibonacci và các dãy truy hồi, còn ma trận chuyển trạng thái nối với Xác suất qua chuỗi Markov.`,
  },
  tuDau: [
    R`Hãy nghĩ đến một cửa hàng bán hai loại bánh. Hôm qua bán $3$ bánh ngọt và $2$ bánh mặn thu $19$ nghìn, hôm nay bán $1$ ngọt và $4$ mặn thu $17$ nghìn. Tìm giá từng loại chính là giải một hệ phương trình. Khi có hàng chục loại bánh và hàng chục ngày, ta cần một cách làm có hệ thống thay vì mò: đó là khử Gauss.`,
    R`Bảng số của hệ, gọi là ma trận, còn làm được nhiều hơn việc ghi chép. Ma trận là một cái máy: đưa vào một vectơ, máy trả ra một vectơ khác. Mỗi cột của bảng cho biết máy làm gì với một bước đi theo trục. Hiểu ma trận là hiểu cái máy ấy kéo, xoay hay ép phẳng mặt phẳng như thế nào.`,
    R`Có những phương đặc biệt mà máy không làm lệch, chỉ kéo giãn hoặc co lại. Đặt một chiếc que dọc theo phương ấy thì sau khi qua máy que vẫn nằm trên cùng đường thẳng, chỉ dài hay ngắn đi. Các phương này là vectơ riêng, hệ số kéo giãn là giá trị riêng, và chúng cho ta nhìn rõ nhất cái máy làm gì.`,
    R`Từ ý tưởng đơn giản này mọc ra nhiều ứng dụng: lặp máy nhiều lần cho lũy thừa ma trận và xếp hạng trang web, giữ lại phương kéo giãn mạnh nhất cho phép nén ảnh, còn chiếu vuông góc xuống một không gian con cho bài hồi quy bình phương tối thiểu.`,
  ],
  kyHieu: [
    { kh: R`$A\mathbf{x}=\mathbf{b}$`, doc: R`Hệ phương trình viết gọn: ma trận $A$ nhân vectơ ẩn $\mathbf{x}$ cho vectơ $\mathbf{b}$.` },
    { kh: R`$A^{-1}$`, doc: R`Ma trận nghịch đảo của $A$, thỏa $AA^{-1}=A^{-1}A=I$.` },
    { kh: R`$A^{T}$`, doc: R`Ma trận chuyển vị: đổi hàng thành cột và cột thành hàng.` },
    { kh: R`$\det A$`, doc: R`Định thức của ma trận vuông $A$, một con số cho biết phép biến đổi nhân diện tích lên bao nhiêu lần.` },
    { kh: R`$\operatorname{rank}A$`, doc: R`Hạng của $A$: số cột độc lập tuyến tính tối đa, cũng là số cột chốt sau khi khử Gauss.` },
    { kh: R`$\lambda$`, doc: R`Chữ Hy Lạp «lam-đa», dùng cho giá trị riêng.` },
    { kh: R`$A\mathbf{v}=\lambda\mathbf{v}$`, doc: R`Điều kiện để $\mathbf{v}\neq\mathbf{0}$ là vectơ riêng ứng với giá trị riêng $\lambda$.` },
    { kh: R`$I$`, doc: R`Ma trận đơn vị: có số $1$ trên đường chéo chính và số $0$ ở chỗ khác, không làm thay đổi vectơ nào.` },
    { kh: R`$\operatorname{tr}A$`, doc: R`Vết của $A$: tổng các phần tử trên đường chéo chính.` },
  ],
  canBiet: [
    R`Ma trận, định thức cấp hai và quy tắc Cramer ở chuyên đề Vectơ và ma trận.`,
    R`Giải hệ hai phương trình bậc nhất hai ẩn bằng phép thế hoặc cộng đại số.`,
    R`Phương trình bậc hai và định lí Viète, dùng để tìm giá trị riêng cấp hai.`,
  ],
  sections: [
    {
      title: "Hệ phương trình và khử Gauss",
      items: [
        {
          kind: "dinh-nghia", title: "Hệ tuyến tính và ma trận mở rộng",
          text: R`Hệ tuyến tính gồm $m$ phương trình bậc nhất theo $n$ ẩn, viết gọn là $A\mathbf{x}=\mathbf{b}$ với $A$ là ma trận hệ số cỡ $m\times n$. Ma trận mở rộng $[A\mid\mathbf{b}]$ là $A$ thêm một cột $\mathbf{b}$ ở bên phải.`,
          de: R`Thay vì chép lại các ẩn $x$, $y$, $z$ qua từng dòng, ta chỉ giữ lại các hệ số trong một bảng. Mỗi hàng của bảng là một phương trình, mỗi cột ứng với một ẩn, và cột cuối là vế phải. Bảng này chứa đủ thông tin của hệ, và các phép làm trên bảng nhanh hơn nhiều so với viết lại cả phương trình.`,
        },
        {
          kind: "cong-thuc", title: "Ba phép biến đổi hàng",
          text: R`Ba phép sau không làm đổi tập nghiệm: đổi chỗ hai hàng, nhân một hàng với số khác $0$, và cộng vào một hàng một bội của hàng khác.`,
          suy: [
            R`Mỗi hàng là một phương trình. Đổi chỗ hai phương trình chỉ đổi thứ tự liệt kê, nên tập nghiệm giữ nguyên.`,
            R`Nhân cả hai vế của một phương trình với số $c\neq 0$ cho phương trình tương đương: nghiệm cũ vẫn đúng, và nhân với $\frac{1}{c}$ thì quay về được phương trình ban đầu.`,
            R`Giả sử thay phương trình thứ hai bằng tổng của nó với $c$ lần phương trình thứ nhất. Nghiệm cũ thỏa cả hai nên thỏa phương trình mới. Ngược lại, trừ đi $c$ lần phương trình thứ nhất sẽ khôi phục phương trình cũ, nên nghiệm mới cũng là nghiệm cũ.`,
          ],
        },
        {
          kind: "dinh-ly", title: "Số nghiệm của hệ tuyến tính",
          text: R`Hệ $A\mathbf{x}=\mathbf{b}$ có nghiệm khi và chỉ khi $\operatorname{rank}[A\mid\mathbf{b}]=\operatorname{rank}A$. Khi có nghiệm, hệ có đúng một nghiệm nếu $\operatorname{rank}A=n$ (số ẩn), và có vô số nghiệm nếu $\operatorname{rank}A<n$.`,
          suy: [
            R`Khử Gauss đưa ma trận mở rộng về dạng bậc thang mà không đổi tập nghiệm. Hạng là số hàng khác $0$ của dạng bậc thang, tức số cột chốt.`,
            R`Nếu xuất hiện hàng $(0\ 0\ \cdots\ 0\mid c)$ với $c\neq 0$ thì phương trình tương ứng là $0=c$, vô lí, nên hệ vô nghiệm. Điều đó xảy ra đúng khi $\operatorname{rank}[A\mid\mathbf{b}]>\operatorname{rank}A$.`,
            R`Nếu không có hàng như vậy, mỗi cột chốt cho phép giải một ẩn theo các ẩn còn lại. Những ẩn ứng với cột không chốt là ẩn tự do, có $n-\operatorname{rank}A$ ẩn như vậy.`,
            R`Không có ẩn tự do thì mọi ẩn đã được xác định: đúng một nghiệm. Có ẩn tự do thì mỗi cách chọn giá trị tự do cho một nghiệm khác nhau: vô số nghiệm.`,
          ],
          suyKhac: [
            {
              cach: "Bằng cách nhìn các cột",
              buoc: [
                R`Hệ $A\mathbf{x}=\mathbf{b}$ nói rằng $x_1\mathbf{a}_1+\dots+x_n\mathbf{a}_n=\mathbf{b}$, với $\mathbf{a}_j$ là các cột của $A$. Hệ có nghiệm khi và chỉ khi $\mathbf{b}$ viết được như tổ hợp của các cột, tức thêm $\mathbf{b}$ vào các cột không làm tăng số chiều: $\operatorname{rank}[A\mid\mathbf{b}]=\operatorname{rank}A$.`,
                R`Giả sử $\mathbf{x}$ và $\mathbf{x}'$ đều là nghiệm. Trừ hai vế của $A\mathbf{x}=\mathbf{b}$ và $A\mathbf{x}'=\mathbf{b}$ được $A(\mathbf{x}-\mathbf{x}')=\mathbf{0}$, nên hiệu của hai nghiệm là nghiệm của hệ thuần nhất.`,
                R`Hệ thuần nhất $A\mathbf{z}=\mathbf{0}$ chỉ có nghiệm $\mathbf{z}=\mathbf{0}$ khi và chỉ khi các cột độc lập tuyến tính, tức $\operatorname{rank}A=n$. Vậy khi hệ có nghiệm, nghiệm là duy nhất đúng khi $\operatorname{rank}A=n$.`,
                R`Nếu $\operatorname{rank}A<n$ thì có $\mathbf{z}\neq\mathbf{0}$ với $A\mathbf{z}=\mathbf{0}$. Khi đó mọi $\mathbf{x}+t\mathbf{z}$, với $t$ tùy ý, đều là nghiệm vì $A(\mathbf{x}+t\mathbf{z})=\mathbf{b}+\mathbf{0}$: vô số nghiệm.`,
              ],
            },
          ],
        },
        {
          kind: "cach-lam", title: "Khử Gauss–Jordan",
          text: R`Với mỗi cột từ trái sang phải, chọn một phần tử khác $0$ làm chốt, đổi hàng lên trên nếu cần, chia hàng chốt để chốt bằng $1$, rồi dùng nó khử mọi phần tử khác trong cùng cột. Khi mọi cột chốt đã sạch, đọc nghiệm ngay từ cột cuối.`,
        },
        {
          kind: "vi-du",
          text: R`Hệ $x+y+z=6$, $2y+5z=-4$, $2x+5y-z=27$. Lấy hàng ba trừ hai lần hàng một được $3y-3z=15$, tức $y-z=5$. Từ $2y+5z=-4$ và $y=z+5$ suy ra $7z=-14$, nên $z=-2$, $y=3$, $x=5$. Thử lại: $5+3-2=6$, $6-10=-4$, $10+15+2=27$.`,
        },
        { kind: "luu-y", text: R`Chỉ được chia cho chốt khác $0$. Nếu phần tử định chọn bằng $0$ thì đổi hàng với một hàng bên dưới có phần tử khác $0$ trong cùng cột, đừng bỏ qua cột mà chưa thử.` },
      ],
    },
    {
      title: "Ma trận nghịch đảo và định thức",
      items: [
        {
          kind: "dinh-nghia", title: "Ma trận khả nghịch",
          text: R`Ma trận vuông $A$ khả nghịch nếu tồn tại ma trận $A^{-1}$ sao cho $AA^{-1}=A^{-1}A=I$. Nghịch đảo, nếu có, là duy nhất.`,
          de: R`Nghịch đảo là cỗ máy chạy ngược. Nếu $A$ đưa mỗi vectơ tới một vị trí mới thì $A^{-1}$ đưa vị trí mới về đúng chỗ cũ. Cỗ máy chạy ngược chỉ có khi phép biến đổi ban đầu không làm hai điểm khác nhau rơi vào cùng một chỗ, và không ép cả mặt phẳng thành một đường thẳng.`,
        },
        {
          kind: "cong-thuc", title: "Tìm nghịch đảo bằng khử Gauss",
          text: R`Khử Gauss–Jordan ma trận $[A\mid I]$. Nếu khử được $A$ về $I$ thì phần bên phải khi đó là $A^{-1}$, tức $[A\mid I]\to[I\mid A^{-1}]$. Nếu khử không đưa được $A$ về $I$ thì $A$ không khả nghịch.`,
          suy: [
            R`Mỗi phép biến đổi hàng chính là nhân bên trái với một ma trận $E$. Chuỗi phép biến đổi đưa $A$ về $I$ thì $E_k\cdots E_2E_1A=I$.`,
            R`Từ đó $E_k\cdots E_1$ nhân với $A$ cho $I$, nên nó chính là $A^{-1}$.`,
            R`Áp dụng cùng chuỗi phép biến đổi cho cột bên phải $I$ được $E_k\cdots E_1I=A^{-1}$. Vì vậy sau khi khử, nửa bên phải của $[A\mid I]$ là $A^{-1}$.`,
          ],
        },
        {
          kind: "tinh-chat", title: "Nghịch đảo của tích",
          text: R`Nếu $A$ và $B$ đều khả nghịch thì $AB$ khả nghịch và $(AB)^{-1}=B^{-1}A^{-1}$. Thứ tự bị đảo ngược.`,
          suy: [
            R`Nhân thử: $(AB)(B^{-1}A^{-1})=A(BB^{-1})A^{-1}=AIA^{-1}=AA^{-1}=I$. Tương tự $(B^{-1}A^{-1})(AB)=I$.`,
            R`Nghịch đảo là duy nhất: nếu $X$ và $Y$ cùng là nghịch đảo của $M$ thì $X=XI=X(MY)=(XM)Y=IY=Y$. Vậy $B^{-1}A^{-1}$ chính là $(AB)^{-1}$.`,
            R`Thứ tự đảo vì đi tất rồi đi giày thì muốn quay lại phải cởi giày trước rồi mới cởi tất.`,
          ],
        },
        {
          kind: "tinh-chat", title: "Định thức khi biến đổi hàng",
          text: R`Đổi chỗ hai hàng thì định thức đổi dấu. Nhân một hàng với $k$ thì định thức nhân với $k$. Cộng vào một hàng một bội của hàng khác thì định thức không đổi. Ma trận vuông khả nghịch khi và chỉ khi $\det A\neq 0$.`,
          suy: [
            R`Kiểm cho cỡ $2\times2$ bằng khai triển $ad-bc$. Đổi hai hàng cho $cb-da=-(ad-bc)$, nhân hàng đầu với $k$ cho $kad-kbc=k(ad-bc)$.`,
            R`Cộng $k$ lần hàng hai vào hàng một: $(a+kc)d-(b+kd)c=ad-bc+kcd-kdc=ad-bc$, định thức không đổi.`,
            R`Khử Gauss chỉ dùng ba phép này, nên biến $A$ thành dạng bậc thang mà định thức chỉ đổi theo các hệ số đã biết, khác $0$. Dạng bậc thang có định thức bằng tích các phần tử chốt: khác $0$ đúng khi có đủ chốt trên mọi hàng, tức $A$ khử được về $I$ và khả nghịch.`,
          ],
        },
        {
          kind: "vi-du",
          text: R`Ma trận $\begin{pmatrix}2&1\\5&3\end{pmatrix}$ có định thức $6-5=1$ nên khả nghịch, và nghịch đảo là $\begin{pmatrix}3&-1\\-5&2\end{pmatrix}$. Với hai ma trận $\begin{pmatrix}1&2\\3&5\end{pmatrix}$ và $\begin{pmatrix}2&1\\1&1\end{pmatrix}$, nghịch đảo của tích bằng tích hai nghịch đảo theo thứ tự đảo.`,
        },
        { kind: "luu-y", text: R`Để giải hệ lớn, đừng tính $A^{-1}$ rồi nhân với $\mathbf{b}$: khử Gauss trực tiếp nhanh hơn và ít sai số hơn. Nghịch đảo hữu ích khi cần giải nhiều hệ có cùng $A$ hoặc khi cần công thức.` },
      ],
    },
    {
      title: "Độc lập tuyến tính, cơ sở và hạng",
      items: [
        {
          kind: "dinh-nghia", title: "Độc lập tuyến tính",
          text: R`Các vectơ $\mathbf{v}_1,\dots,\mathbf{v}_k$ độc lập tuyến tính nếu $c_1\mathbf{v}_1+\dots+c_k\mathbf{v}_k=\mathbf{0}$ chỉ xảy ra khi mọi $c_i=0$. Ngược lại chúng phụ thuộc tuyến tính.`,
          de: R`Các vectơ độc lập khi mỗi vectơ đóng góp một hướng mới mà các vectơ còn lại không tạo ra được. Hai mũi tên không cùng phương là độc lập. Thêm mũi tên thứ ba nằm trong mặt phẳng của hai mũi tên đó thì không có hướng mới, ba mũi tên phụ thuộc.`,
        },
        {
          kind: "dinh-nghia", title: "Cơ sở và số chiều",
          text: R`Cơ sở của một không gian là một hệ vectơ độc lập tuyến tính mà mọi vectơ của không gian đều viết được thành tổ hợp của chúng. Số vectơ trong cơ sở là số chiều của không gian.`,
          de: R`Cơ sở là bộ «hướng chuẩn» vừa đủ để chỉ đường tới mọi điểm: thiếu thì có chỗ không tới được, thừa thì có hướng dư. Mặt phẳng cần đúng hai hướng chuẩn, không gian cần ba, nên ta nói mặt phẳng có hai chiều và không gian có ba chiều.`,
        },
        {
          kind: "tinh-chat", title: "Độc lập và định thức",
          text: R`Với $n$ vectơ trong không gian $n$ chiều, xếp thành các cột của ma trận vuông $A$: các vectơ độc lập tuyến tính khi và chỉ khi $\det A\neq 0$.`,
          suy: [
            R`Gọi $\mathbf{c}$ là vectơ hệ số. Điều kiện $c_1\mathbf{v}_1+\dots+c_n\mathbf{v}_n=\mathbf{0}$ chính là $A\mathbf{c}=\mathbf{0}$, nên các vectơ độc lập đúng khi hệ $A\mathbf{c}=\mathbf{0}$ chỉ có nghiệm $\mathbf{c}=\mathbf{0}$.`,
            R`Nếu $A$ khả nghịch thì $\mathbf{c}=A^{-1}\mathbf{0}=\mathbf{0}$. Ngược lại, nếu hệ chỉ có nghiệm không thì khử Gauss không có ẩn tự do, nên có đủ $n$ cột chốt và $A$ khử được về $I$, tức khả nghịch.`,
            R`Theo mục trước, $A$ khả nghịch khi và chỉ khi $\det A\neq 0$. Ghép lại ta có điều cần chứng minh.`,
          ],
        },
        {
          kind: "dinh-ly", title: "Hạng và số khuyết",
          text: R`Với ma trận $A$ cỡ $m\times n$, số nghiệm độc lập của hệ thuần nhất $A\mathbf{x}=\mathbf{0}$ cộng với hạng của $A$ bằng $n$: $\operatorname{nullity}A+\operatorname{rank}A=n$.`,
          suy: [
            R`Sau khử Gauss, số cột chốt là $\operatorname{rank}A$ và số cột không chốt là $n-\operatorname{rank}A$.`,
            R`Mỗi cột không chốt cho một ẩn tự do. Đặt ẩn tự do ấy bằng $1$ và các ẩn tự do khác bằng $0$ thì được một nghiệm của hệ thuần nhất. Các nghiệm này độc lập vì mỗi nghiệm có số $1$ ở một ẩn tự do mà các nghiệm kia có số $0$.`,
            R`Mọi nghiệm khác đều là tổ hợp của chúng, vì nghiệm được xác định hoàn toàn bởi các ẩn tự do. Vậy không gian nghiệm có đúng $n-\operatorname{rank}A$ chiều.`,
          ],
          suyKhac: [
            {
              cach: "Bằng ánh xạ lên không gian cột",
              buoc: [
                R`Xét phép biến đổi $\mathbf{x}\mapsto A\mathbf{x}$ từ không gian $n$ chiều. Ảnh của nó là không gian sinh bởi các cột của $A$, có số chiều bằng hạng của $A$.`,
                R`Chọn cơ sở $\mathbf{z}_1,\dots,\mathbf{z}_k$ của không gian nghiệm $\{A\mathbf{x}=\mathbf{0}\}$ rồi bổ sung thành cơ sở $\mathbf{z}_1,\dots,\mathbf{z}_k,\mathbf{w}_1,\dots,\mathbf{w}_r$ của cả không gian $n$ chiều, với $k+r=n$.`,
                R`Ảnh của $\mathbf{z}_i$ là $\mathbf{0}$, nên ảnh của mọi vectơ là tổ hợp của $A\mathbf{w}_1,\dots,A\mathbf{w}_r$. Các vectơ này độc lập: nếu $\sum c_jA\mathbf{w}_j=\mathbf{0}$ thì $\sum c_j\mathbf{w}_j$ nằm trong không gian nghiệm, nên là tổ hợp của các $\mathbf{z}_i$, và vì cơ sở độc lập nên mọi $c_j=0$.`,
                R`Vậy ảnh có đúng $r$ chiều, tức $\operatorname{rank}A=r=n-k$, và $k+\operatorname{rank}A=n$.`,
              ],
            },
          ],
        },
        {
          kind: "vi-du",
          text: R`Ma trận $\begin{pmatrix}1&2&3\\2&4&6\\1&0&1\end{pmatrix}$ có hàng hai gấp đôi hàng một nên chỉ còn hai hàng độc lập: hạng bằng $2$. Hệ thuần nhất tương ứng có số khuyết $3-2=1$, tức một ẩn tự do và nghiệm là một đường thẳng qua gốc.`,
        },
        { kind: "luu-y", text: R`Hạng không đổi khi biến đổi hàng, nhưng các cột chốt phải đọc từ ma trận gốc, không phải từ ma trận đã khử. Dạng bậc thang chỉ chỉ ra vị trí cột chốt.` },
      ],
    },
    {
      title: "Giá trị riêng và vectơ riêng",
      items: [
        {
          kind: "dinh-nghia", title: "Giá trị riêng và vectơ riêng",
          text: R`Số $\lambda$ là giá trị riêng của ma trận vuông $A$ nếu có vectơ $\mathbf{v}\neq\mathbf{0}$ sao cho $A\mathbf{v}=\lambda\mathbf{v}$. Khi đó $\mathbf{v}$ là vectơ riêng ứng với $\lambda$.`,
          de: R`Đa số vectơ khi qua cỗ máy $A$ sẽ bị xoay sang hướng khác. Vectơ riêng là những hướng may mắn mà máy không làm lệch, chỉ kéo dài ra, co lại hoặc lật ngược. Hệ số kéo giãn là giá trị riêng: bằng $2$ nghĩa là dài gấp đôi, bằng $-1$ nghĩa là lật ngược nhưng giữ độ dài.`,
        },
        {
          kind: "dinh-ly", title: "Phương trình đặc trưng",
          text: R`Số $\lambda$ là giá trị riêng của ma trận vuông $A$ khi và chỉ khi $\det(A-\lambda I)=0$. Vế trái là một đa thức bậc $n$ theo $\lambda$, gọi là đa thức đặc trưng.`,
          suy: [
            R`Phương trình $A\mathbf{v}=\lambda\mathbf{v}$ tương đương $A\mathbf{v}-\lambda I\mathbf{v}=\mathbf{0}$, tức $(A-\lambda I)\mathbf{v}=\mathbf{0}$.`,
            R`Ta cần một nghiệm $\mathbf{v}\neq\mathbf{0}$, nghĩa là hệ thuần nhất với ma trận $A-\lambda I$ có nghiệm khác không.`,
            R`Điều này xảy ra khi và chỉ khi các cột của $A-\lambda I$ phụ thuộc tuyến tính, tức $A-\lambda I$ không khả nghịch, tức $\det(A-\lambda I)=0$ theo mục trước.`,
          ],
          suyKhac: [
            {
              cach: "Bằng khai triển cấp hai",
              buoc: [
                R`Với $A=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ ta có $\det(A-\lambda I)=(a-\lambda)(d-\lambda)-bc=\lambda^2-(a+d)\lambda+(ad-bc)$.`,
                R`Xét hệ $(A-\lambda I)\mathbf{v}=\mathbf{0}$ với $\mathbf{v}=(v_1;v_2)$. Phương trình đầu là $(a-\lambda)v_1+bv_2=0$; nếu $b\neq 0$, chọn $\mathbf{v}=(b;\lambda-a)$ thỏa phương trình đầu.`,
                R`Thế vào phương trình thứ hai: $cb+(d-\lambda)(\lambda-a)=-\left(\lambda^2-(a+d)\lambda+ad-bc\right)$. Vế phải bằng $0$ đúng khi $\lambda$ là nghiệm của đa thức đặc trưng.`,
                R`Vậy với nghiệm $\lambda$ của đa thức đặc trưng, vectơ $(b;\lambda-a)$ khác không và thỏa $A\mathbf{v}=\lambda\mathbf{v}$. Chiều ngược lại: có vectơ riêng khác không thì hai hàng của $A-\lambda I$ buộc tỉ lệ nhau, nên định thức bằng $0$.`,
              ],
            },
          ],
        },
        {
          kind: "cong-thuc", title: "Tổng và tích giá trị riêng",
          text: R`Ma trận cấp hai $A$ có hai giá trị riêng $\lambda_1,\lambda_2$ thì $\lambda_1+\lambda_2=\operatorname{tr}A=a+d$ và $\lambda_1\lambda_2=\det A=ad-bc$.`,
          suy: [
            R`Đa thức đặc trưng là $\lambda^2-(a+d)\lambda+(ad-bc)$, có hai nghiệm là $\lambda_1,\lambda_2$ nên đồng nhất được với $(\lambda-\lambda_1)(\lambda-\lambda_2)=\lambda^2-(\lambda_1+\lambda_2)\lambda+\lambda_1\lambda_2$.`,
            R`So sánh hệ số, ta có $\lambda_1+\lambda_2=a+d$ và $\lambda_1\lambda_2=ad-bc$. Đó cũng chính là hệ thức Viète áp dụng cho đa thức đặc trưng.`,
          ],
        },
        {
          kind: "cach-lam", title: "Tìm giá trị riêng và vectơ riêng cấp hai",
          text: R`Lập $\det(A-\lambda I)=0$ và giải phương trình bậc hai theo $\lambda$. Với mỗi $\lambda$ tìm được, giải hệ $(A-\lambda I)\mathbf{v}=\mathbf{0}$ để được vectơ riêng. Kiểm lại bằng tổng giá trị riêng bằng vết và tích bằng định thức.`,
        },
        {
          kind: "vi-du",
          text: R`Với $A=\begin{pmatrix}2&1\\1&2\end{pmatrix}$ có $\det(A-\lambda I)=(2-\lambda)^2-1=\lambda^2-4\lambda+3$, nên $\lambda=1$ hoặc $\lambda=3$. Với $\lambda=3$ giải $(A-3I)\mathbf{v}=\mathbf{0}$ được $\mathbf{v}=(1;1)$; với $\lambda=1$ được $\mathbf{v}=(1;-1)$. Kiểm: tổng $1+3=4=\operatorname{tr}A$ và tích $1\cdot3=3=\det A$.`,
        },
        { kind: "luu-y", text: R`Vectơ riêng phải khác $\mathbf{0}$. Một phép quay $90^\circ$ trong mặt phẳng không có giá trị riêng thực vì nó đổi hướng của mọi vectơ khác không. Đa thức đặc trưng của nó là $\lambda^2+1$, chỉ có nghiệm phức.` },
      ],
    },
    {
      title: "Chéo hóa và lũy thừa ma trận",
      items: [
        {
          kind: "dinh-nghia", title: "Ma trận chéo hóa được",
          text: R`Ma trận vuông $A$ cỡ $n$ chéo hóa được nếu có $n$ vectơ riêng độc lập tuyến tính. Khi đó $A=PDP^{-1}$, với các cột của $P$ là các vectơ riêng và $D$ là ma trận đường chéo chứa các giá trị riêng tương ứng.`,
          de: R`Chéo hóa là đổi sang «hệ trục riêng» của cỗ máy. Trong hệ trục này máy làm việc rất đơn giản: mỗi trục chỉ bị kéo giãn một hệ số, không trộn lẫn các trục. Làm toán trên bảng đường chéo dễ hơn rất nhiều, rồi đổi về hệ trục cũ ở cuối cùng.`,
        },
        {
          kind: "dinh-ly", title: "Lũy thừa của ma trận chéo hóa được",
          text: R`Nếu $A=PDP^{-1}$ với $D=\operatorname{diag}(\lambda_1,\dots,\lambda_n)$ thì $A^k=PD^kP^{-1}$ với mọi số nguyên dương $k$, và $D^k=\operatorname{diag}(\lambda_1^k,\dots,\lambda_n^k)$.`,
          suy: [
            R`Các cột $\mathbf{p}_i$ của $P$ thỏa $A\mathbf{p}_i=\lambda_i\mathbf{p}_i$. Xếp lại thành $AP=PD$, rồi nhân bên phải với $P^{-1}$ được $A=PDP^{-1}$.`,
            R`Tính bình phương: $A^2=PDP^{-1}PDP^{-1}=PD(P^{-1}P)DP^{-1}=PD^2P^{-1}$. Cứ nhân tiếp thì các cặp $P^{-1}P=I$ ở giữa đều triệt tiêu, nên $A^k=PD^kP^{-1}$.`,
            R`Nhân hai ma trận đường chéo là nhân từng phần tử cùng vị trí, nên $D^k$ có đường chéo gồm $\lambda_i^k$.`,
          ],
          suyKhac: [
            {
              cach: "Bằng cách phân tích vectơ theo cơ sở riêng",
              buoc: [
                R`Các vectơ riêng $\mathbf{p}_1,\dots,\mathbf{p}_n$ độc lập nên làm thành cơ sở. Mọi vectơ $\mathbf{x}$ viết được duy nhất dạng $\mathbf{x}=c_1\mathbf{p}_1+\dots+c_n\mathbf{p}_n$.`,
                R`Áp dụng $A$ lên từng số hạng: $A\mathbf{x}=c_1\lambda_1\mathbf{p}_1+\dots+c_n\lambda_n\mathbf{p}_n$. Áp dụng $k$ lần được $A^k\mathbf{x}=\sum c_i\lambda_i^k\mathbf{p}_i$, vì mỗi lần chỉ nhân thêm một hệ số $\lambda_i$ cho từng thành phần.`,
                R`Vế phải chính là $P\,\operatorname{diag}(\lambda_i^k)\,(c_1,\dots,c_n)^T$, và vì $\mathbf{x}=P\mathbf{c}$ nên $\mathbf{c}=P^{-1}\mathbf{x}$. Vậy $A^k\mathbf{x}=PD^kP^{-1}\mathbf{x}$ với mọi $\mathbf{x}$, tức $A^k=PD^kP^{-1}$.`,
              ],
            },
          ],
        },
        {
          kind: "tinh-chat", title: "Vectơ riêng của ma trận đối xứng",
          text: R`Nếu $A$ đối xứng ($A^T=A$) thì hai vectơ riêng ứng với hai giá trị riêng khác nhau thì vuông góc với nhau.`,
          suy: [
            R`Giả sử $A\mathbf{u}=\lambda\mathbf{u}$ và $A\mathbf{v}=\mu\mathbf{v}$ với $\lambda\neq\mu$. Tính $(A\mathbf{u})\cdot\mathbf{v}=\lambda(\mathbf{u}\cdot\mathbf{v})$.`,
            R`Do $A$ đối xứng, $(A\mathbf{u})\cdot\mathbf{v}=\mathbf{u}\cdot(A^T\mathbf{v})=\mathbf{u}\cdot(A\mathbf{v})=\mu(\mathbf{u}\cdot\mathbf{v})$.`,
            R`Vậy $(\lambda-\mu)(\mathbf{u}\cdot\mathbf{v})=0$. Vì $\lambda\neq\mu$ nên $\mathbf{u}\cdot\mathbf{v}=0$: hai vectơ vuông góc.`,
          ],
        },
        {
          kind: "cach-lam", title: "Lặp lũy thừa tìm giá trị riêng trội",
          text: R`Lấy một vectơ khởi đầu bất kì rồi nhân liên tiếp với $A$, chuẩn hóa độ dài sau mỗi bước. Thành phần theo giá trị riêng lớn nhất tăng nhanh nhất nên hướng của vectơ hội tụ về vectơ riêng trội, và tỉ số hai bước liên tiếp hội tụ về giá trị riêng trội.`,
        },
        {
          kind: "vi-du",
          text: R`Ma trận Fibonacci $F=\begin{pmatrix}1&1\\1&0\end{pmatrix}$ có $F^n=\begin{pmatrix}F_{n+1}&F_n\\F_n&F_{n-1}\end{pmatrix}$, ví dụ $F^{10}=\begin{pmatrix}89&55\\55&34\end{pmatrix}$. Đa thức đặc trưng là $\lambda^2-\lambda-1$, nên giá trị riêng trội là $\frac{1+\sqrt5}{2}\approx1{,}618$, và đó là tốc độ tăng của dãy Fibonacci. Với $A=\begin{pmatrix}2&1\\1&2\end{pmatrix}$, nhân $A^3$ với $(1;0)$ được $(14;13)$, gần hướng vectơ riêng trội $(1;1)$.`,
        },
        { kind: "luu-y", text: R`Không phải ma trận nào cũng chéo hóa được. Ma trận $\begin{pmatrix}1&1\\0&1\end{pmatrix}$ có giá trị riêng $1$ lặp lại hai lần nhưng chỉ có một hướng riêng, nên không đủ hai vectơ riêng độc lập. Ma trận đối xứng thực luôn chéo hóa được.` },
      ],
    },
    {
      title: "Ứng dụng: PageRank, hồi quy và nén ảnh",
      items: [
        {
          kind: "dinh-ly", title: "Phương trình chuẩn của bình phương tối thiểu",
          text: R`Vectơ $\mathbf{x}$ làm cho $\lVert A\mathbf{x}-\mathbf{b}\rVert^2$ nhỏ nhất thì thỏa phương trình chuẩn $A^TA\mathbf{x}=A^T\mathbf{b}$. Khi các cột của $A$ độc lập tuyến tính, nghiệm duy nhất.`,
          suy: [
            R`Khi $\mathbf{x}$ thay đổi, $A\mathbf{x}$ chạy khắp không gian sinh bởi các cột của $A$. Điểm của không gian đó gần $\mathbf{b}$ nhất là hình chiếu vuông góc của $\mathbf{b}$ xuống không gian ấy, vì với mọi điểm $\mathbf{p}$ khác, định lí Pythagore cho $\lVert\mathbf{b}-\mathbf{p}\rVert^2=\lVert\mathbf{b}-\mathbf{p}^*\rVert^2+\lVert\mathbf{p}^*-\mathbf{p}\rVert^2$.`,
            R`Điều đó nghĩa là phần dư $\mathbf{r}=\mathbf{b}-A\mathbf{x}$ vuông góc với mọi cột $\mathbf{a}_j$, tức $\mathbf{a}_j\cdot\mathbf{r}=0$ với mọi $j$. Viết gộp thành $A^T\mathbf{r}=\mathbf{0}$.`,
            R`Thay $\mathbf{r}=\mathbf{b}-A\mathbf{x}$: $A^T(\mathbf{b}-A\mathbf{x})=\mathbf{0}$, tức $A^TA\mathbf{x}=A^T\mathbf{b}$.`,
          ],
          suyKhac: [
            {
              cach: "Bằng đạo hàm riêng",
              buoc: [
                R`Với $A$ có hai cột, $f(p,q)=\lVert A\mathbf{x}-\mathbf{b}\rVert^2$ là tổng bình phương các phần dư, một hàm đa thức bậc hai theo $p,q$ không âm. Cực tiểu của nó phải là điểm mà cả hai đạo hàm riêng bằng $0$.`,
                R`Đạo hàm theo từng ẩn của $\sum(\mathbf{a}\cdot\mathbf{x}-b)^2$ là $2\sum(\mathbf{a}\cdot\mathbf{x}-b)a_j$, nên điều kiện cực tiểu là $\sum(\mathbf{a}\cdot\mathbf{x}-b)a_j=0$ với mỗi cột $j$.`,
                R`Gộp các phương trình theo $j$ ta được đúng $A^T(A\mathbf{x}-\mathbf{b})=\mathbf{0}$, tức $A^TA\mathbf{x}=A^T\mathbf{b}$. Cách này ra cùng phương trình nhưng không cần hình học vuông góc.`,
              ],
            },
          ],
        },
        {
          kind: "cong-thuc", title: "Đường thẳng hồi quy",
          text: R`Với các điểm $(x_i;y_i)$, đường $y=a+bx$ gần nhất theo bình phương tối thiểu có $b=\frac{n\sum x_iy_i-\sum x_i\sum y_i}{n\sum x_i^2-\left(\sum x_i\right)^2}$ và $a=\bar y-b\bar x$.`,
          suy: [
            R`Mỗi hàng của $A$ là $(1\ x_i)$ và $\mathbf{x}=(a;b)$, $\mathbf{b}=(y_i)$. Khi đó $A^TA=\begin{pmatrix}n&\sum x_i\\\sum x_i&\sum x_i^2\end{pmatrix}$ và $A^T\mathbf{b}=\begin{pmatrix}\sum y_i\\\sum x_iy_i\end{pmatrix}$.`,
            R`Giải hệ phương trình chuẩn hai ẩn bằng quy tắc Cramer, với định thức $D=n\sum x_i^2-\left(\sum x_i\right)^2$. Ta có $D_b=n\sum x_iy_i-\sum x_i\sum y_i$, nên $b=\frac{D_b}{D}$.`,
            R`Phương trình đầu của hệ chuẩn là $na+b\sum x_i=\sum y_i$. Chia cho $n$ được $a+b\bar x=\bar y$, nên $a=\bar y-b\bar x$: đường hồi quy đi qua điểm trung bình $(\bar x;\bar y)$.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Giá trị suy biến lớn nhất",
          text: R`Giá trị suy biến lớn nhất của $A$ là $\sigma_1=\sqrt{\lambda_{\max}(A^TA)}$, và $\sigma_1=\max_{\lVert\mathbf{x}\rVert=1}\lVert A\mathbf{x}\rVert$: phương mà $A$ kéo giãn mạnh nhất.`,
          suy: [
            R`Với $\lVert\mathbf{x}\rVert=1$: $\lVert A\mathbf{x}\rVert^2=(A\mathbf{x})^T(A\mathbf{x})=\mathbf{x}^T(A^TA)\mathbf{x}$. Ma trận $M=A^TA$ đối xứng.`,
            R`Ma trận đối xứng có một cơ sở trực chuẩn gồm các vectơ riêng $\mathbf{u}_i$ (định lí phổ, dùng ở đây không chứng minh). Viết $\mathbf{x}=\sum c_i\mathbf{u}_i$ với $\sum c_i^2=1$ thì $\mathbf{x}^TM\mathbf{x}=\sum\lambda_ic_i^2$.`,
            R`Đây là trung bình có trọng số của các $\lambda_i$ với trọng số $c_i^2$ cộng bằng $1$, nên không vượt quá $\lambda_{\max}$, và bằng $\lambda_{\max}$ khi $\mathbf{x}$ là vectơ riêng tương ứng.`,
          ],
        },
        {
          kind: "cach-lam", title: "Nén ảnh bằng xấp xỉ hạng một",
          text: R`Giữ lại thành phần ứng với giá trị suy biến lớn nhất, $A\approx\sigma_1\mathbf{u}_1\mathbf{v}_1^T$, thay vì lưu cả bảng. Ảnh $100\times100$ cần $10000$ số, trong khi xấp xỉ hạng một chỉ cần $100+100+1=201$ số. Giữ thêm các thành phần nhỏ hơn thì ảnh rõ dần.`,
        },
        {
          kind: "vi-du",
          text: R`Ba điểm $(0;1)$, $(1;3)$, $(2;4)$ có $A^TA=\begin{pmatrix}3&3\\3&5\end{pmatrix}$ và $A^T\mathbf{b}=\begin{pmatrix}8\\11\end{pmatrix}$. Giải được $a=\frac{7}{6}$ và $b=\frac{3}{2}$, nên đường hồi quy là $y=\frac{7}{6}+\frac{3}{2}x$.`,
        },
        {
          kind: "vi-du",
          text: R`Hai trang web: từ trang một, $90\%$ khách ở lại và $10\%$ sang trang hai; từ trang hai, $50\%$ ở lại và $50\%$ sang trang một. Ma trận chuyển là $P=\begin{pmatrix}0{,}9&0{,}5\\0{,}1&0{,}5\end{pmatrix}$. Vectơ $\pi=\left(\frac{5}{6};\frac{1}{6}\right)$ thỏa $P\pi=\pi$, nghĩa là lâu dài $\frac{5}{6}$ số khách ở trang một. Đó là ý tưởng của PageRank: điểm xếp hạng là vectơ riêng ứng với giá trị riêng $1$.`,
        },
        { kind: "luu-y", text: R`Hồi quy tốt không có nghĩa là có quan hệ nhân quả, và đường thẳng chỉ phản ánh dữ liệu đã cho. Để có nghiệm duy nhất, các cột của $A$ phải độc lập; nếu hai biến gần như trùng nhau, hệ chuẩn gần suy biến và nghiệm rất nhạy với sai số.` },
      ],
    },
  ],
  canNho: [
    R`Ba phép biến đổi hàng không đổi nghiệm của hệ; khử Gauss đưa hệ về dạng bậc thang để đọc nghiệm.`,
    R`Hệ có nghiệm khi $\operatorname{rank}[A\mid\mathbf{b}]=\operatorname{rank}A$; nghiệm duy nhất khi hạng bằng số ẩn, vô số nghiệm khi nhỏ hơn.`,
    R`Ma trận vuông khả nghịch khi và chỉ khi $\det A\neq 0$ khi và chỉ khi các cột độc lập tuyến tính; $(AB)^{-1}=B^{-1}A^{-1}$.`,
    R`Số khuyết cộng hạng bằng số cột, $\operatorname{nullity}A+\operatorname{rank}A=n$: số ẩn tự do cộng số cột chốt bằng số cột.`,
    R`Giá trị riêng là nghiệm của $\det(A-\lambda I)=0$; ở cấp hai, tổng bằng vết và tích bằng định thức.`,
    R`Nếu $A=PDP^{-1}$ thì $A^k=PD^kP^{-1}$; vectơ riêng của ma trận đối xứng ứng với giá trị riêng khác nhau thì vuông góc.`,
    R`Bình phương tối thiểu giải $A^TA\mathbf{x}=A^T\mathbf{b}$; phần dư vuông góc với các cột của $A$.`,
    R`Giá trị suy biến lớn nhất là phương kéo giãn mạnh nhất, nền tảng của nén ảnh; vectơ riêng ứng với $\lambda=1$ cho PageRank.`,
  ],
  lienQuan: [
    { id: "vector", vi: R`Định thức cấp hai, nghịch đảo và quy tắc Cramer ở THPT là trường hợp nhỏ của hệ tuyến tính và định thức tổng quát.` },
    { id: "sequence", vi: R`Dãy truy hồi như Fibonacci có công thức tường minh nhờ chéo hóa ma trận chuyển.` },
    { id: "probability", vi: R`Ma trận chuyển xác suất và vectơ riêng ứng với giá trị riêng $1$ mô tả trạng thái ổn định lâu dài của chuỗi Markov.` },
  ],
  checks: [
    { expr: "solve([x+y+z-6, 2*y+5*z+4, 2*x+5*y-z-27], [x,y,z])", expect: "{x: 5, y: 3, z: -2}" },
    { expr: "Matrix([[2,1],[5,3]]).inv()", expect: "Matrix([[3,-1],[-5,2]])" },
    { expr: "Matrix([[2,1],[5,3]]).det()", expect: "1" },
    { expr: "(Matrix([[1,2],[3,5]])*Matrix([[2,1],[1,1]])).inv()", expect: "Matrix([[2,1],[1,1]]).inv()*Matrix([[1,2],[3,5]]).inv()" },
    { expr: "Matrix([[c,d],[a,b]]).det()+Matrix([[a,b],[c,d]]).det()", expect: "0" },
    { expr: "Matrix([[k*a,k*b],[c,d]]).det()-k*Matrix([[a,b],[c,d]]).det()", expect: "0" },
    { expr: "Matrix([[a+k*c,b+k*d],[c,d]]).det()-Matrix([[a,b],[c,d]]).det()", expect: "0" },
    { expr: "Matrix([[1,2,3],[2,4,6],[1,0,1]]).rank()", expect: "2" },
    { expr: "3-Matrix([[1,2,3],[2,4,6],[1,0,1]]).rank()", expect: "1" },
    { expr: "Matrix([[2,1],[1,2]]).eigenvals()", expect: "{1: 1, 3: 1}" },
    { expr: "Matrix([[2,1],[1,2]]).charpoly(x).as_expr()", expect: "x**2-4*x+3" },
    { expr: "expand(Matrix([[a,b],[c,d]]).charpoly(x).as_expr()-(x**2-(a+d)*x+a*d-b*c))", expect: "0" },
    { expr: "expand(c*b+(d-x)*(x-a)+(x**2-(a+d)*x+a*d-b*c))", expect: "0" },
    { expr: "Matrix([1,1]).dot(Matrix([1,-1]))", expect: "0" },
    { expr: "Matrix([[1,1],[1,0]])**10", expect: "Matrix([[89,55],[55,34]])" },
    { expr: "Matrix([[1,1],[1,0]]).charpoly(x).as_expr()", expect: "x**2-x-1" },
    { expr: "Matrix([[2,1],[1,2]])**3*Matrix([1,0])", expect: "Matrix([14,13])" },
    { expr: "solve([diff((p-1)**2+(p+q-3)**2+(p+2*q-4)**2,p), diff((p-1)**2+(p+q-3)**2+(p+2*q-4)**2,q)], [p,q])", expect: "{p: 7/6, q: 3/2}" },
    { expr: "(Matrix([[3,3],[3,5]]).inv()*Matrix([8,11]))", expect: "Matrix([Rational(7,6),Rational(3,2)])" },
    { expr: "Matrix([[1,0],[1,1],[1,2]]).T*Matrix([[1,0],[1,1],[1,2]])", expect: "Matrix([[3,3],[3,5]])" },
    { expr: "Rational(3*11-3*8, 3*5-3**2)", expect: "Rational(3,2)" },
    { expr: "Matrix([[Rational(9,10),Rational(1,2)],[Rational(1,10),Rational(1,2)]])*Matrix([Rational(5,6),Rational(1,6)])", expect: "Matrix([Rational(5,6),Rational(1,6)])" },
    { expr: "3*Matrix([1,1])*Matrix([1,1]).T/2", expect: "Matrix([[Rational(3,2),Rational(3,2)],[Rational(3,2),Rational(3,2)]])" },
    { expr: "100+100+1", expect: "201" },
  ],
};
