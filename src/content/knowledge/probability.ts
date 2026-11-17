import type { TopicKnowledge } from "./types.ts";

const R = String.raw;

export const probabilityKnowledge: TopicKnowledge = {
  id: "probability",
  tongQuat: {
    la: R`Xác suất là một số từ $0$ đến $1$ đo mức độ có thể xảy ra của một biến cố. Khi mọi kết quả đều có cùng khả năng, xác suất là tỉ số giữa số kết quả thuận lợi và số kết quả có thể. Khi biết thêm một thông tin, xác suất được cập nhật: đó là xác suất có điều kiện.`,
    dungDe: R`Đánh giá rủi ro, độ tin cậy của một xét nghiệm, khả năng một sản phẩm bị lỗi, và đọc hiểu các tuyên bố về may rủi. Trong bài thi, chuyên đề cho bài xác suất cổ điển, bài quy tắc cộng và nhân, bài xác suất có điều kiện, xác suất toàn phần và công thức Bayes, và bài thống kê ghép nhóm.`,
    lienHe: R`Xác suất cổ điển cần đếm số kết quả bằng chuyên đề Tổ hợp. Phép thử lặp dùng nhị thức Newton, và số đặc trưng của dữ liệu ghép nhóm mở rộng các khái niệm trung bình và phương sai ở chuyên đề Tổ hợp và thống kê.`,
  },
  tuDau: [
    R`Tung một đồng xu: không ai biết trước mặt nào ngửa, nhưng tung hàng nghìn lần thì khoảng một nửa số lần là ngửa. Xác suất là con số mô tả sự ổn định ẩn trong sự ngẫu nhiên đó: điều không đoán được ở một lần thì lại đoán được rất chắc khi lặp thật nhiều lần.`,
    R`Cách tính đơn giản nhất: nếu mọi kết quả có cơ hội như nhau thì xác suất là số kết quả «ta quan tâm» chia cho tổng số kết quả. Tung xúc xắc, ra mặt chẵn có $3$ trong $6$ kết quả, nên xác suất là một nửa. Vì vậy xác suất luôn nằm giữa $0$ (không thể xảy ra) và $1$ (chắc chắn xảy ra).`,
    R`Khi biết thêm thông tin thì xác suất đổi. Rút một lá bài từ cỗ bài, rồi rút lá thứ hai: lá thứ hai ít còn nguyên cơ hội như ban đầu, vì bộ bài đã thiếu một lá. Xác suất có điều kiện chính là «cơ hội mới sau khi đã biết điều đó». Công thức Bayes đảo chiều câu hỏi: từ kết quả quan sát được, suy ra nguyên nhân có khả năng nhất.`,
    R`Chuyên đề cũng đo dữ liệu: khi số liệu chia theo nhóm, ta đại diện mỗi nhóm bằng điểm giữa của nó. Hãy dùng phòng mô phỏng trong trang: tung xúc xắc cả nghìn lần để thấy tỉ lệ dồn về con số mà phép đếm đã tính trước.`,
  ],
  kyHieu: [
    { kh: R`$\Omega$`, doc: R`Chữ Hy Lạp «ô-mê-ga»: tập mọi kết quả có thể xảy ra của một phép thử.` },
    { kh: R`$P(A)$`, doc: R`Xác suất của biến cố $A$, một số từ $0$ đến $1$.` },
    { kh: R`$\overline{A}$`, doc: R`Biến cố đối của $A$: xảy ra đúng khi $A$ không xảy ra.` },
    { kh: R`$A\cup B$`, doc: R`Hợp: biến cố «$A$ hoặc $B$ xảy ra».` },
    { kh: R`$A\cap B$`, doc: R`Giao: biến cố «cả $A$ lẫn $B$ cùng xảy ra».` },
    { kh: R`$P(A\mid B)$`, doc: R`Xác suất của $A$ khi đã biết $B$ xảy ra. Gạch đứng đọc là «biết rằng».` },
    { kh: R`$n(A)$`, doc: R`Số kết quả thuận lợi cho $A$.` },
  ],
  canBiet: [
    R`Quy tắc đếm, hoán vị, chỉnh hợp và tổ hợp.`,
    R`Phân số, tỉ lệ phần trăm và phép tính với số thập phân.`,
    R`Số trung bình và phương sai của một mẫu số liệu.`,
  ],
  sections: [
    {
      title: "Xác suất cổ điển và biến cố đối",
      items: [
        {
          kind: "dinh-nghia", title: "Phép thử và biến cố",
          text: R`Phép thử là một hành động mà kết quả không đoán chắc được. Không gian mẫu $\Omega$ là tập mọi kết quả có thể, và biến cố $A$ là một tập con của $\Omega$. Biến cố đối $\overline{A}$ xảy ra đúng khi $A$ không xảy ra.`,
          de: R`Phép thử là việc làm có kết quả không đoán chắc, như tung xúc xắc. Không gian mẫu là danh sách mọi kết quả có thể. Biến cố là một câu hỏi «có ra điều này không», ứng với một nhóm các kết quả. Biến cố đối là câu trả lời ngược lại.`,
        },
        {
          kind: "cong-thuc", title: "Xác suất cổ điển",
          text: R`Khi các kết quả của $\Omega$ đồng khả năng, $P(A)=\frac{n(A)}{n(\Omega)}$ với $n(A)$ là số kết quả thuận lợi cho $A$. Tử và mẫu đều đếm bằng quy tắc tổ hợp.`,
          suy: [
            R`Nếu $n(\Omega)$ kết quả đồng khả năng thì cơ hội phải chia đều: mỗi kết quả có cơ hội $\frac{1}{n(\Omega)}$, vì cộng tất cả lại phải bằng $1$.`,
            R`Biến cố $A$ gồm $n(A)$ kết quả, nên cơ hội của nó là $n(A)$ lần $\frac{1}{n(\Omega)}$, tức $P(A)=\frac{n(A)}{n(\Omega)}$.`,
          ],
        },
        {
          kind: "tinh-chat", title: "Các tính chất cơ bản",
          text: R`$0\le P(A)\le 1$, $P(\Omega)=1$ và $P(\varnothing)=0$. Xác suất không bao giờ âm hoặc lớn hơn $1$, và biến cố chắc chắn có xác suất $1$.`,
          suy: [
            R`Số kết quả thuận lợi là một phần của tất cả kết quả, nên $0\le n(A)\le n(\Omega)$. Chia cho $n(\Omega)$ được $0\le P(A)\le 1$.`,
            R`Biến cố chắc chắn gồm toàn bộ $\Omega$ nên $P(\Omega)=\frac{n(\Omega)}{n(\Omega)}=1$, còn biến cố không thể xảy ra không có kết quả nào nên $P(\varnothing)=0$.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Biến cố đối",
          text: R`$P(\overline{A})=1-P(A)$. Dùng khi bài hỏi «ít nhất một», vì tính xác suất của việc «không có cái nào» thường dễ hơn.`,
          suy: [
            R`Mỗi kết quả của phép thử thuộc đúng một trong hai nhóm: thuận lợi cho $A$ hoặc thuận lợi cho $\overline{A}$. Vậy $n(A)+n(\overline{A})=n(\Omega)$.`,
            R`Chia hai vế cho $n(\Omega)$: $P(A)+P(\overline{A})=1$, tức $P(\overline{A})=1-P(A)$.`,
          ],
        },
        { kind: "luu-y", title: "Điều kiện đồng khả năng", text: R`Công thức cổ điển chỉ đúng khi các kết quả có cùng khả năng. Tung hai đồng xu có bốn kết quả đồng khả năng $SS,SN,NS,NN$, không phải ba kết quả «hai sấp, một sấp, hai ngửa», vì ba kết quả này không đồng khả năng.` },
        { kind: "vi-du", text: R`Tung hai xúc xắc, tổng bằng $7$ có $6$ kết quả trong $36$ nên $P=\frac{6}{36}=\frac{1}{6}$. Số chấm của một xúc xắc là số chẵn có $P=\frac{3}{6}=\frac{1}{2}$.` },
        { kind: "vi-du", text: R`Chọn hai người từ nhóm $10$ người gồm $6$ nam và $4$ nữ. Xác suất cả hai là nữ là $\frac{C_4^2}{C_{10}^2}=\frac{6}{45}=\frac{2}{15}$. Xác suất có ít nhất một nam là $1-\frac{2}{15}=\frac{13}{15}$.` },
      ],
    },
    {
      title: "Quy tắc cộng xác suất",
      items: [
        {
          kind: "cong-thuc", title: "Quy tắc cộng tổng quát",
          text: R`$P(A\cup B)=P(A)+P(B)-P(A\cap B)$. Phần giao được cộng hai lần ở hai số hạng đầu nên phải trừ đi một lần.`,
          suy: [
            R`Vẽ $A$ và $B$ thành hai vòng tròn chồng nhau. Cộng $n(A)+n(B)$ thì phần chung bị đếm hai lần.`,
            R`Trừ đi phần chung một lần để mỗi kết quả chỉ được đếm một lần: $n(A\cup B)=n(A)+n(B)-n(A\cap B)$. Chia cho $n(\Omega)$ được công thức xác suất.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Biến cố xung khắc",
          text: R`Hai biến cố xung khắc nếu không thể cùng xảy ra, tức $P(A\cap B)=0$. Khi đó $P(A\cup B)=P(A)+P(B)$.`,
          suy: [
            R`Hai biến cố xung khắc không có kết quả chung, nên phần chung rỗng và $P(A\cap B)=0$.`,
            R`Thay vào quy tắc cộng tổng quát, số hạng trừ biến mất: $P(A\cup B)=P(A)+P(B)$.`,
          ],
        },
        { kind: "luu-y", text: R`Quên trừ phần giao là lỗi phổ biến nhất của quy tắc cộng. Trước khi cộng, hỏi hai biến cố có thể cùng xảy ra không: nếu có thì phải trừ.` },
        { kind: "vi-du", text: R`Rút một lá từ bộ $52$ lá. Xác suất được lá cơ hoặc lá K là $\frac{13}{52}+\frac{4}{52}-\frac{1}{52}=\frac{16}{52}=\frac{4}{13}$, trừ đi lá K cơ vì nó thuộc cả hai nhóm.` },
        { kind: "vi-du", text: R`Tung một xúc xắc. Gọi $A$ là «số chẵn» có $P=\frac{1}{2}$ và $B$ là «chia hết cho $3$» có $P=\frac{1}{3}$. Giao của hai biến cố chỉ có mặt $6$ nên $P(A\cap B)=\frac{1}{6}$, và $P(A\cup B)=\frac{1}{2}+\frac{1}{3}-\frac{1}{6}=\frac{2}{3}$, đúng với bốn mặt $2,3,4,6$.` },
      ],
    },
    {
      title: "Xác suất có điều kiện và quy tắc nhân",
      items: [
        {
          kind: "dinh-nghia", title: "Xác suất có điều kiện",
          text: R`Xác suất của $A$ khi đã biết $B$ xảy ra là $P(A\mid B)=\frac{P(A\cap B)}{P(B)}$, với $P(B)>0$. Không gian mẫu bị thu hẹp thành $B$, nên mẫu số không còn là mẫu lúc đầu.`,
          de: R`Biết $B$ đã xảy ra nghĩa là ta chỉ còn nhìn vào những kết quả thuộc $B$, như bỏ đi cả phần còn lại của bàn cờ. Trong phần thu hẹp đó, tỉ lệ kết quả cũng thuộc $A$ chính là xác suất có điều kiện. Mẫu số đổi từ cả không gian thành riêng $B$.`,
        },
        {
          kind: "cong-thuc", title: "Quy tắc nhân",
          text: R`$P(A\cap B)=P(B)\cdot P(A\mid B)=P(A)\cdot P(B\mid A)$. Dùng cho các bước nối tiếp nhau, như rút liên tiếp không hoàn lại.`,
          suy: [
            R`Xuất phát từ định nghĩa $P(A\mid B)=\frac{P(A\cap B)}{P(B)}$ và nhân hai vế với $P(B)$.`,
            R`Được $P(A\cap B)=P(B)\cdot P(A\mid B)$. Đổi vai $A$ và $B$ thì được dạng thứ hai. Nghĩa là cơ hội cả hai cùng xảy ra bằng cơ hội của bước một nhân cơ hội của bước hai khi bước một đã xảy ra.`,
          ],
        },
        {
          kind: "dinh-nghia", title: "Hai biến cố độc lập",
          text: R`Hai biến cố độc lập nếu việc biết $B$ xảy ra không đổi xác suất của $A$, tức $P(A\mid B)=P(A)$. Khi đó $P(A\cap B)=P(A)\cdot P(B)$.`,
          de: R`Hai biến cố độc lập khi cái này xảy ra hay không cũng chẳng làm đổi cơ hội của cái kia, như hai lần tung đồng xu. Khi đó cơ hội xảy ra cả hai bằng tích hai cơ hội. Rút hai lá bài không hoàn lại thì không độc lập, vì lá đầu làm đổi bộ bài.`,
        },
        { kind: "luu-y", title: "Độc lập khác xung khắc", text: R`Hai biến cố xung khắc có xác suất dương thì không độc lập, vì biết $B$ xảy ra thì chắc chắn $A$ không xảy ra, $P(A\mid B)=0$. Đừng nhầm hai khái niệm này.` },
        { kind: "luu-y", text: R`Nói chung $P(A\mid B)\neq P(B\mid A)$. Xác suất «bị bệnh khi xét nghiệm dương tính» khác xác suất «xét nghiệm dương tính khi bị bệnh», và nhầm chúng là lỗi suy luận hay gặp ngoài đời.` },
        { kind: "vi-du", text: R`Hộp có $5$ bi đỏ và $3$ bi xanh, rút liên tiếp hai viên không hoàn lại. Xác suất cả hai đỏ là $\frac{5}{8}\cdot\frac{4}{7}=\frac{5}{14}$, vì viên thứ hai chỉ còn $4$ đỏ trong $7$ viên.` },
        { kind: "vi-du", text: R`Tung hai xúc xắc, biết tổng không nhỏ hơn $10$. Có $6$ kết quả là $(4,6),(6,4),(5,5),(5,6),(6,5),(6,6)$, trong đó $5$ kết quả có ít nhất một mặt $6$. Xác suất có điều kiện là $\frac{5}{6}$, mẫu số là $6$ chứ không phải $36$.` },
      ],
    },
    {
      title: "Xác suất toàn phần và công thức Bayes",
      items: [
        {
          kind: "dinh-ly", title: "Công thức xác suất toàn phần",
          text: R`Nếu $B_1,\dots,B_n$ là nhóm đầy đủ các biến cố, tức đôi một xung khắc và hợp lại là $\Omega$, thì $P(A)=\sum_{i=1}^{n}P(B_i)\,P(A\mid B_i)$. Mỗi nhánh đóng góp «xác suất rơi vào nhánh» nhân «xác suất xảy ra $A$ trong nhánh đó».`,
          suy: [
            R`Các nhánh $B_1,\dots,B_n$ chia $\Omega$ thành những phần rời nhau phủ kín, nên $A$ cũng bị chia thành các phần $A\cap B_1,\dots,A\cap B_n$ rời nhau.`,
            R`Cộng xác suất các phần: $P(A)=\sum P(A\cap B_i)$. Dùng quy tắc nhân cho mỗi phần, $P(A\cap B_i)=P(B_i)P(A\mid B_i)$, được công thức.`,
          ],
        },
        {
          kind: "dinh-ly", title: "Công thức Bayes",
          text: R`$P(B_i\mid A)=\frac{P(B_i)\,P(A\mid B_i)}{P(A)}$ với mẫu số tính bằng xác suất toàn phần. Công thức này đảo chiều điều kiện: biết kết quả $A$, hỏi nguyên nhân $B_i$.`,
          suy: [
            R`Quy tắc nhân cho $P(B_i\cap A)$ theo hai cách: $P(B_i\cap A)=P(A)\,P(B_i\mid A)=P(B_i)\,P(A\mid B_i)$.`,
            R`Chia hai vế cho $P(A)$ được $P(B_i\mid A)=\frac{P(B_i)P(A\mid B_i)}{P(A)}$, và mẫu số $P(A)$ tính bằng xác suất toàn phần. Công thức đổi chiều điều kiện.`,
          ],
        },
        { kind: "cach-lam", title: "Sơ đồ cây", text: R`Vẽ nhánh theo từng giai đoạn, ghi xác suất có điều kiện lên mỗi nhánh. Nhân các số dọc theo một đường đi, rồi cộng các đường dẫn tới cùng một kết quả. Tổng xác suất các nhánh xuất phát từ một nút luôn bằng $1$.` },
        { kind: "cach-lam", title: "Nhận ra toàn phần hay Bayes", text: R`Nếu bài hỏi xác suất của kết quả cuối cùng thì dùng xác suất toàn phần. Nếu bài đã cho biết kết quả và hỏi nguyên nhân nào gây ra nó thì dùng Bayes.` },
        { kind: "luu-y", title: "Nhóm đầy đủ", text: R`Phải kiểm các $B_i$ đôi một xung khắc và tổng xác suất bằng $1$. Thiếu một trường hợp thì công thức toàn phần cho kết quả nhỏ hơn thực tế.` },
        { kind: "vi-du", text: R`Máy $A$ làm $60\%$ sản phẩm với tỉ lệ lỗi $2\%$, máy $B$ làm $40\%$ với tỉ lệ lỗi $5\%$. Xác suất một sản phẩm lỗi là $0{,}6\cdot 0{,}02+0{,}4\cdot 0{,}05=0{,}032$. Biết sản phẩm lỗi, xác suất nó từ máy $A$ là $\frac{0{,}012}{0{,}032}=\frac{3}{8}$.` },
        { kind: "vi-du", text: R`Một bệnh có $1\%$ người mắc, xét nghiệm cho kết quả dương tính ở $95\%$ người bệnh và $5\%$ người khỏe. Xác suất dương tính là $0{,}01\cdot 0{,}95+0{,}99\cdot 0{,}05=0{,}059$. Biết dương tính, xác suất thật sự bệnh chỉ là $\frac{0{,}0095}{0{,}059}\approx 16{,}1\%$, nhỏ hơn nhiều so với cảm giác ban đầu vì bệnh hiếm.` },
      ],
    },
    {
      title: "Biến cố độc lập và phép thử lặp",
      items: [
        {
          kind: "cong-thuc", title: "Nhiều biến cố độc lập",
          text: R`Nếu các biến cố độc lập thì xác suất cùng xảy ra bằng tích các xác suất: $P(A_1\cap A_2\cap\dots\cap A_n)=P(A_1)P(A_2)\cdots P(A_n)$.`,
          suy: [
            R`Với hai biến cố độc lập, $P(A_1\cap A_2)=P(A_1)P(A_2)$ theo quy tắc nhân khi $P(A_2\mid A_1)=P(A_2)$.`,
            R`Thêm biến cố thứ ba: giao của hai biến cố đầu cũng độc lập với biến cố thứ ba, nên lại nhân thêm một thừa số. Lặp lại $n$ lần được tích $n$ xác suất.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Phép thử lặp",
          text: R`Thực hiện $n$ lần độc lập một phép thử, mỗi lần thành công với xác suất $p$. Xác suất có đúng $k$ lần thành công là $C_n^k\,p^k(1-p)^{n-k}$. Hệ số tổ hợp đếm vị trí của các lần thành công.`,
          suy: [
            R`Mỗi dãy kết quả cụ thể có đúng $k$ lần thành công và $n-k$ lần thất bại có xác suất $p^k(1-p)^{n-k}$, nhờ tích các biến cố độc lập.`,
            R`Số dãy như vậy là số cách chọn $k$ vị trí cho các lần thành công trong $n$ lần thử, tức $C_n^k$. Các dãy khác nhau xung khắc nhau nên xác suất cộng lại: $C_n^k\,p^k(1-p)^{n-k}$.`,
          ],
        },
        { kind: "cach-lam", title: "Ít nhất một lần thành công", text: R`Dùng biến cố đối: xác suất ít nhất một lần thành công là $1-(1-p)^n$. Cách này nhanh hơn nhiều so với cộng từng trường hợp có $1,2,\dots,n$ lần thành công.` },
        { kind: "luu-y", text: R`Rút có hoàn lại thì các lần độc lập, còn rút không hoàn lại thì các lần phụ thuộc nhau và phải dùng xác suất có điều kiện. Đọc kĩ đề xem sản phẩm đã rút có được trả lại không.` },
        { kind: "vi-du", text: R`Tung đồng xu cân đối $4$ lần, xác suất đúng $2$ lần sấp là $C_4^2\cdot\left(\frac{1}{2}\right)^4=\frac{6}{16}=\frac{3}{8}$.` },
        { kind: "vi-du", text: R`Một xạ thủ bắn trúng với xác suất $0{,}8$ mỗi lần và bắn $3$ lần độc lập. Xác suất ít nhất một lần trúng là $1-0{,}2^3=0{,}992$.` },
      ],
    },
    {
      title: "Thống kê cho mẫu số liệu ghép nhóm",
      items: [
        {
          kind: "dinh-nghia", title: "Mẫu số liệu ghép nhóm",
          text: R`Dữ liệu được chia thành các nhóm $[a_i;a_{i+1})$ liên tiếp, mỗi nhóm có tần số $n_i$. Giá trị đại diện của nhóm là trung điểm $c_i=\frac{a_i+a_{i+1}}{2}$, coi mọi số liệu trong nhóm bằng giá trị đó.`,
          de: R`Khi số liệu quá nhiều, ta không ghi từng con số mà ghi «có bao nhiêu số rơi vào khoảng này». Mất thông tin chi tiết, nên ta coi mọi số trong một nhóm đều bằng điểm giữa của nhóm, đại diện cho cả nhóm. Kết quả chỉ xấp xỉ, nhưng đủ tốt khi nhóm hẹp.`,
        },
        {
          kind: "cong-thuc", title: "Số trung bình",
          text: R`$\bar{x}=\frac{n_1c_1+n_2c_2+\dots+n_kc_k}{n}$ với $n$ là tổng tần số. Đây là số trung bình có trọng số, trọng số là tần số của từng nhóm.`,
          suy: [
            R`Coi mọi số liệu trong nhóm thứ $i$ bằng giá trị đại diện $c_i$. Nhóm đó có $n_i$ số liệu nên đóng góp $n_ic_i$ vào tổng.`,
            R`Cộng tổng các nhóm và chia cho tổng số liệu $n$: $\bar{x}=\frac{n_1c_1+\dots+n_kc_k}{n}$. Đây là trung bình có trọng số, trọng số là số lượng của mỗi nhóm.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Trung vị và tứ phân vị",
          text: R`Gọi $[u_m;u_{m+1})$ là nhóm chứa phân vị cần tìm, $C$ là tổng tần số các nhóm đứng trước, $n_m$ là tần số của nhóm đó. Khi đó $Q_j=u_m+\frac{\frac{jn}{4}-C}{n_m}\,(u_{m+1}-u_m)$ với $j=1,2,3$, và $j=2$ là trung vị.`,
          suy: [
            R`Muốn tìm giá trị mà $\frac{jn}{4}$ số liệu nằm dưới nó, đi qua các nhóm theo thứ tự và cộng dồn số lượng cho đến khi tới nhóm chứa mốc đó. Trước nhóm này có $C$ số liệu.`,
            R`Trong nhóm đó, ta coi số liệu rải đều. Cần thêm $\frac{jn}{4}-C$ số liệu nữa trong tổng $n_m$ của nhóm, tức đi hết tỉ lệ $\frac{jn/4-C}{n_m}$ bề rộng nhóm.`,
            R`Vậy giá trị cần tìm là mép dưới $u_m$ cộng tỉ lệ đó nhân bề rộng $u_{m+1}-u_m$, đúng công thức.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Phương sai",
          text: R`$s^2=\frac{n_1c_1^2+\dots+n_kc_k^2}{n}-\bar{x}^2$ và độ lệch chuẩn $s=\sqrt{s^2}$. Cách tính giống dữ liệu không ghép nhóm, thay mỗi giá trị bằng giá trị đại diện.`,
          suy: [
            R`Dùng đồng nhất thức $s^2=\overline{x^2}-\bar{x}^2$ cho dữ liệu đã quy về giá trị đại diện: bình phương trung bình của các $x_i^2$ trừ bình phương của trung bình.`,
            R`Thay mỗi giá trị bằng đại diện $c_i$ của nhóm, xuất hiện $n_i$ lần: $\overline{x^2}=\frac{n_1c_1^2+\dots+n_kc_k^2}{n}$, rồi trừ $\bar{x}^2$.`,
          ],
        },
        { kind: "cach-lam", title: "Tìm nhóm chứa phân vị", text: R`Lập cột tần số tích lũy, rồi tìm nhóm đầu tiên có tần số tích lũy không nhỏ hơn $\frac{jn}{4}$. Nhóm đó là nhóm chứa phân vị $Q_j$.` },
        { kind: "luu-y", text: R`Ghép nhóm làm mất thông tin bên trong mỗi nhóm nên mọi số đặc trưng chỉ là xấp xỉ. Nhóm càng hẹp thì xấp xỉ càng tốt.` },
        { kind: "vi-du", text: R`Các nhóm $[0;10)$, $[10;20)$, $[20;30)$ có tần số $5$, $10$, $5$, nên $n=20$ và đại diện là $5,15,25$. Trung bình $\bar{x}=\frac{25+150+125}{20}=15$. Trung vị thuộc nhóm $[10;20)$ nên $Q_2=10+\frac{10-5}{10}\cdot 10=15$. Phương sai là $\frac{5\cdot 25+10\cdot 225+5\cdot 625}{20}-15^2=275-225=50$.` },
      ],
    },
  ],
  canNho: [
    R`Xác suất cổ điển: $P(A)=\frac{n(A)}{n(\Omega)}$ khi các kết quả đồng khả năng.`,
    R`Biến cố đối: $P(\overline{A})=1-P(A)$; dùng cho «ít nhất một».`,
    R`Quy tắc cộng: $P(A\cup B)=P(A)+P(B)-P(A\cap B)$; xung khắc thì không có phần giao.`,
    R`Xác suất có điều kiện: $P(A\mid B)=\frac{P(A\cap B)}{P(B)}$, mẫu số thu hẹp về $B$.`,
    R`Quy tắc nhân: $P(A\cap B)=P(B)P(A\mid B)$; độc lập thì $P(A\cap B)=P(A)P(B)$.`,
    R`Xác suất toàn phần: $P(A)=\sum P(B_i)P(A\mid B_i)$; Bayes đảo chiều điều kiện.`,
    R`Phép thử lặp: có đúng $k$ lần thành công với xác suất $C_n^kp^k(1-p)^{n-k}$.`,
    R`Thống kê ghép nhóm dùng giá trị đại diện của nhóm; mọi số đặc trưng chỉ là xấp xỉ.`,
  ],
  lienQuan: [
    { id: "combo", vi: R`Số kết quả thuận lợi và số kết quả có thể của xác suất cổ điển đều đếm bằng quy tắc nhân và tổ hợp.` },
    { id: "ineq", vi: R`Các bất đẳng thức về trung bình được dùng để so sánh các số đặc trưng của một mẫu số liệu.` },
    { id: "integral", vi: R`Với biến ngẫu nhiên liên tục, xác suất tính bằng diện tích dưới đường mật độ, tức là một tích phân.` },
  ],
  checks: [
    { expr: "Rational(6,36)", expect: "Rational(1,6)" },
    { expr: "Rational(3,6)", expect: "Rational(1,2)" },
    { expr: "binomial(4,2)/binomial(10,2)", expect: "Rational(2,15)" },
    { expr: "1-Rational(2,15)", expect: "Rational(13,15)" },
    { expr: "Rational(13,52)+Rational(4,52)-Rational(1,52)", expect: "Rational(4,13)" },
    { expr: "Rational(1,2)+Rational(1,3)-Rational(1,6)", expect: "Rational(2,3)" },
    { expr: "Rational(1,2)*Rational(1,3)", expect: "Rational(1,6)" },
    { expr: "Rational(5,8)*Rational(4,7)", expect: "Rational(5,14)" },
    { expr: "Rational(5,6)", expect: "1-Rational(1,6)" },
    { expr: "Rational(6,10)*Rational(2,100)+Rational(4,10)*Rational(5,100)", expect: "Rational(32,1000)" },
    { expr: "Rational(6,10)*Rational(2,100)/Rational(32,1000)", expect: "Rational(3,8)" },
    { expr: "Rational(1,100)*Rational(95,100)+Rational(99,100)*Rational(5,100)", expect: "Rational(59,1000)" },
    { expr: "floor(1000*Rational(95,10000)/Rational(59,1000))", expect: "161" },
    { expr: "binomial(4,2)*Rational(1,2)**4", expect: "Rational(3,8)" },
    { expr: "1-Rational(1,5)**3", expect: "Rational(124,125)" },
    { expr: "Rational(5*5+10*15+5*25,20)", expect: "15" },
    { expr: "10+Rational(10-5,10)*10", expect: "15" },
    { expr: "Rational(5*25+10*225+5*625,20)-15**2", expect: "50" },
  ],
};
