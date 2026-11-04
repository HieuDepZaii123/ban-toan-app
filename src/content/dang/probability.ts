import type { TopicDang } from "./types.ts";

const R = String.raw;

export const probabilityDang: TopicDang = {
  id: "probability",
  title: "Xác suất",
  dang: [
    {
      name: "Xác suất cổ điển và biến cố đối",
      nhanDang: "Không gian mẫu hữu hạn, các kết quả đồng khả năng, hoặc câu hỏi dạng ít nhất một.",
      phuongPhap: R`Nếu các kết quả đồng khả năng thì $P(A)=\frac{n(A)}{n(\Omega)}$. Tỉ số đếm chỉ là xác suất khi giả thiết đồng khả năng đã có. Với biến cố đối, $P(\overline A)=1-P(A)$ là hệ thức tương đương. Câu ít nhất một thường đổi sang biến cố không có kết quả nào.`,
      viDu: {
        prompt: "Gieo hai xúc xắc cân đối và phân biệt. Xác suất tổng bằng $7$ bằng bao nhiêu?",
        steps: [
          { claim: R`Không gian mẫu có $6\cdot 6=36$ kết quả đồng khả năng.`, why: "Mỗi xúc xắc có $6$ mặt. Hai xúc xắc phân biệt nên cặp đảo thứ tự là hai kết quả." },
          { claim: R`Các cặp tổng $7$ là $(1;6)$, $(2;5)$, $(3;4)$, $(4;3)$, $(5;2)$, $(6;1)$, gồm $6$ cặp.`, why: "Liệt kê đủ. Không gộp $(1;6)$ với $(6;1)$." },
          { claim: R`Xác suất bằng $\frac{6}{36}=\frac{1}{6}$.`, why: "Công thức cổ điển. Giả thiết cân đối đã cho đồng khả năng." },
        ],
        ket: R`Xác suất bằng $\frac{1}{6}$.`,
        checks: [{ expr: "Rational(6,36)", expect: "Rational(1,6)" }],
      },
      loi: "Đếm $(1;6)$ và $(6;1)$ thành một kết quả khi hai xúc xắc phân biệt.",
      luyen: {
        kind: "luyen",
        prompt: "Tung ba đồng xu cân đối. Xác suất có ít nhất một mặt ngửa bằng bao nhiêu?",
        think: "Biến cố đối là cả ba mặt sấp. Không gian mẫu có $8$ bộ đồng khả năng.",
        answer: R`Đáp số là $\frac{7}{8}$.`,
        steps: [
          { claim: R`Có $2^3=8$ kết quả đồng khả năng.`, why: "Mỗi đồng xu hai mặt và các lần tung độc lập." },
          { claim: R`Cả ba sấp là một kết quả, xác suất $\frac{1}{8}$.`, why: "Đây là biến cố đối của ít nhất một mặt ngửa." },
          { claim: R`Xác suất cần tìm là $1-\frac{1}{8}=\frac{7}{8}$.`, why: "Hệ thức biến cố đối. Kết quả không âm và không vượt quá $1$." },
        ],
        checks: [{ expr: "1-Rational(1,8)", expect: "Rational(7,8)" }],
      },
    },
    {
      name: "Xác suất có điều kiện",
      nhanDang: "Đề cho biết một điều đã xảy ra, rồi hỏi xác suất của một biến cố trong tình huống đã thu hẹp.",
      phuongPhap: R`Khi $P(B)>0$, $P(A|B)=\frac{P(AB)}{P(B)}=\frac{n(AB)}{n(B)}$ nếu các kết quả còn lại đồng khả năng. Mẫu số là số kết quả của điều đã biết, không còn là số kết quả của không gian ban đầu. Quên thu hẹp mẫu là chưa dùng điều kiện.`,
      viDu: {
        prompt: "Gieo hai xúc xắc cân đối và phân biệt. Biết tổng bằng $8$, tính xác suất có ít nhất một mặt $6$.",
        steps: [
          { claim: R`Điều kiện tổng bằng $8$ gồm năm kết quả: $(2;6)$, $(3;5)$, $(4;4)$, $(5;3)$, $(6;2)$.`, why: "Không gian đã thu hẹp đúng bằng biến cố điều kiện. Năm kết quả này vẫn đồng khả năng." },
          { claim: R`Trong năm kết quả đó, có mặt $6$ là $(2;6)$ và $(6;2)$, gồm hai kết quả.`, why: "Cặp $(4;4)$ có tổng $8$ nhưng không có mặt $6$, nên không tính." },
          { claim: R`Xác suất có điều kiện bằng $\frac{2}{5}$.`, why: "Mẫu là số phần tử của điều đã biết, tử là số phần tử của giao. Đây là công thức cổ điển trên không gian đã thu hẹp." },
        ],
        ket: R`Xác suất có điều kiện bằng $\frac{2}{5}$.`,
        checks: [{ expr: "2/(2+3)", expect: "Rational(2,5)" }],
      },
      loi: "Lấy mẫu vẫn là $36$ sau khi đề đã cho biết tổng.",
      luyen: {
        kind: "luyen",
        prompt: "Biết tổng hai xúc xắc phân biệt bằng $7$, tính xác suất xúc xắc thứ nhất ra $1$.",
        think: "Liệt kê sáu cặp tổng $7$. Chỉ giữ cặp có số đầu là $1$. Mẫu là số cặp của điều kiện, không phải $36$.",
        answer: R`Đáp số là $\frac{1}{6}$.`,
        steps: [
          { claim: R`Sáu cặp tổng $7$ là $(1;6)$, $(2;5)$, $(3;4)$, $(4;3)$, $(5;2)$, $(6;1)$.`, why: "Đây là không gian đã thu hẹp. Các cặp vẫn đồng khả năng." },
          { claim: R`Chỉ có cặp $(1;6)$ thỏa số đầu bằng $1$, nên xác suất bằng $\frac{1}{6}$.`, why: "Tử đếm giao của biến cố đang hỏi với điều kiện. Mẫu là $6$, không phải $36$." },
        ],
        checks: [{ expr: "1/(1+1+1+1+1+1)", expect: "Rational(1,6)" }],
      },
    },
    {
      name: "Quy tắc cộng",
      nhanDang: "Biến cố là hội của hai biến cố, có thể giao nhau.",
      phuongPhap: R`Luôn có $P(A\cup B)=P(A)+P(B)-P(AB)$. Nếu $A$ và $B$ xung khắc thì giao rỗng và số hạng trừ bằng $0$, quy tắc cộng rút thành tổng. Phải kiểm tra giao trước khi bỏ số hạng trừ. Bỏ số hạng trừ khi giao không rỗng sẽ đếm trùng.`,
      viDu: {
        prompt: "Gieo một xúc xắc cân đối. Xác suất ra mặt chẵn hoặc ra mặt lớn hơn $4$ bằng bao nhiêu?",
        steps: [
          { claim: R`Mặt chẵn là $\{2;4;6\}$, mặt lớn hơn $4$ là $\{5;6\}$, giao là $\{6\}$.`, why: "Giao không rỗng, nên chưa được bỏ số hạng trừ." },
          { claim: R`Xác suất bằng $\frac{3}{6}+\frac{2}{6}-\frac{1}{6}=\frac{4}{6}=\frac{2}{3}$.`, why: "Quy tắc cộng trừ phần giao đã đếm hai lần. Sáu mặt đồng khả năng." },
        ],
        ket: R`Xác suất bằng $\frac{2}{3}$.`,
        checks: [{ expr: "Rational(3,6)+Rational(2,6)-Rational(1,6)", expect: "Rational(2,3)" }],
      },
      loi: "Cộng hai xác suất khi hai biến cố còn có phần chung.",
      luyen: {
        kind: "luyen",
        prompt: R`Một hộp có $3$ bi đỏ và $2$ bi xanh, tổng $5$ bi. Lấy một bi. Xác suất được bi đỏ hoặc bi xanh bằng bao nhiêu?`,
        think: "Hai màu xung khắc khi chỉ lấy một bi. Quy tắc cộng không còn số hạng trừ.",
        answer: R`Đáp số là $1$.`,
        steps: [
          { claim: R`Hai biến cố màu đỏ và màu xanh xung khắc, vì một bi không có hai màu.`, why: "Giao rỗng, nên quy tắc cộng là tổng hai xác suất." },
          { claim: R`Xác suất bằng $\frac{3}{5}+\frac{2}{5}=1$.`, why: "Mọi bi đều thuộc một trong hai màu. Kết quả $1$ khớp với biến cố chắc chắn." },
        ],
        checks: [{ expr: "Rational(3,5)+Rational(2,5)", expect: "1" }],
      },
    },
    {
      name: "Quy tắc nhân và biến cố độc lập",
      nhanDang: "Hai phép thử nối tiếp, hoặc đề nói rõ các lần độc lập.",
      phuongPhap: R`Luôn có $P(AB)=P(A)P(B|A)$ khi $P(A)>0$. Nếu $A$ và $B$ độc lập thì $P(B|A)=P(B)$, và quy tắc nhân thành $P(AB)=P(A)P(B)$. Độc lập là một giả thiết, phải được nêu hoặc kiểm tra. Không được nhân hai xác suất chỉ vì hai biến cố cùng xuất hiện trong câu.`,
      viDu: {
        prompt: "Gieo một xúc xắc cân đối hai lần độc lập. Xác suất cả hai lần đều ra mặt chẵn bằng bao nhiêu?",
        steps: [
          { claim: R`Một lần ra chẵn có xác suất $\frac{3}{6}=\frac{1}{2}$.`, why: "Ba mặt chẵn trong sáu mặt đồng khả năng." },
          { claim: R`Hai lần độc lập, nên xác suất cả hai lần chẵn là $\frac{1}{2}\cdot\frac{1}{2}=\frac{1}{4}$.`, why: "Độc lập cho $P(B|A)=P(B)$. Quy tắc nhân khi đó là tích hai xác suất riêng." },
        ],
        ket: R`Xác suất bằng $\frac{1}{4}$.`,
        checks: [{ expr: "Rational(1,2)*Rational(1,2)", expect: "Rational(1,4)" }],
      },
      loi: "Nhân hai xác suất trong khi đề không cho độc lập và cũng không cho xác suất có điều kiện.",
      luyen: {
        kind: "luyen",
        prompt: "Tung hai đồng xu cân đối, độc lập. Xác suất cả hai mặt ngửa bằng bao nhiêu?",
        think: "Mỗi đồng xu có xác suất ngửa $\\frac{1}{2}$. Độc lập cho phép nhân.",
        answer: R`Đáp số là $\frac{1}{4}$.`,
        steps: [
          { claim: R`Mỗi lần tung, xác suất ngửa bằng $\frac{1}{2}$.`, why: "Đồng xu cân đối có hai mặt đồng khả năng." },
          { claim: R`Vì độc lập, xác suất cả hai ngửa bằng $\frac{1}{4}$.`, why: "Quy tắc nhân cho biến cố độc lập." },
        ],
        checks: [{ expr: "Rational(1,2)*Rational(1,2)", expect: "Rational(1,4)" }],
      },
    },
    {
      name: "Xác suất toàn phần",
      nhanDang: "Có vài nhóm nguyên nhân loại trừ nhau, và kết quả quan sát được xảy ra sau khi đã chọn nhóm.",
      phuongPhap: R`Nếu $B_1$, $B_2$ xung khắc, hợp của chúng là biến cố chắc chắn và đều có xác suất dương, thì $P(A)=P(A|B_1)P(B_1)+P(A|B_2)P(B_2)$. Mỗi số hạng là một nhánh. Bỏ một nhánh làm thiếu xác suất. Công thức này chưa phải xác suất có điều kiện ngược.`,
      viDu: {
        prompt: R`Có hai hộp, chọn một hộp với xác suất $\frac{1}{2}$. Hộp nhất có $1$ bi đỏ trong $4$ bi. Hộp hai có $2$ bi đỏ trong $4$ bi. Xác suất lấy được bi đỏ bằng bao nhiêu?`,
        steps: [
          { claim: R`Hai cách chọn hộp xung khắc và phủ hết các khả năng.`, why: "Điều kiện để cộng các nhánh của công thức toàn phần được thỏa." },
          { claim: R`Xác suất đỏ bằng $\frac{1}{2}\cdot\frac{1}{4}+\frac{1}{2}\cdot\frac{2}{4}=\frac{1}{8}+\frac{1}{4}=\frac{3}{8}$.`, why: "Mỗi số hạng là xác suất đi theo một hộp rồi lấy được bi đỏ. Cộng vì hai nhánh xung khắc." },
        ],
        ket: R`Xác suất bằng $\frac{3}{8}$.`,
        checks: [{ expr: "Rational(1,2)*Rational(1,4)+Rational(1,2)*Rational(2,4)", expect: "Rational(3,8)" }],
      },
      loi: "Chỉ tính xác suất đỏ trong một hộp rồi bỏ nhánh hộp kia.",
      luyen: {
        kind: "luyen",
        prompt: R`Chọn một trong hai máy với xác suất $\frac{1}{2}$. Máy nhất cho sản phẩm đạt với xác suất $\frac{1}{2}$, máy hai với xác suất $1$. Xác suất một sản phẩm đạt bằng bao nhiêu?`,
        think: "Cộng hai nhánh. Mỗi nhánh là xác suất chọn máy nhân xác suất đạt của máy đó.",
        answer: R`Đáp số là $\frac{3}{4}$.`,
        steps: [
          { claim: R`Hai máy phủ hết và xung khắc.`, why: "Công thức toàn phần áp dụng được." },
          { claim: R`Xác suất đạt bằng $\frac{1}{2}\cdot\frac{1}{2}+\frac{1}{2}\cdot 1=\frac{3}{4}$.`, why: "Cộng hai nhánh. Không lấy trung bình cộng của $\\frac{1}{2}$ và $1$ rồi quên rằng mỗi máy đã được nhân $\\frac{1}{2}$." },
        ],
        checks: [{ expr: "Rational(1,2)*Rational(1,2)+Rational(1,2)*1", expect: "Rational(3,4)" }],
      },
    },
    {
      name: "Công thức Bayes và diễn giải",
      nhanDang: "Đã quan sát kết quả, hỏi xác suất của một nguyên nhân.",
      phuongPhap: R`Khi $P(A)>0$, $P(B_1|A)=\frac{P(A|B_1)P(B_1)}{P(A)}$. Mẫu số là xác suất toàn phần của điều đã quan sát. Tử là đúng nhánh của nguyên nhân đang hỏi. Kết quả Bayes phải được diễn giải trên nhóm đã quan sát, không diễn giải thành xác suất ban đầu của nguyên nhân.`,
      viDu: {
        prompt: R`Một bệnh có tỉ lệ $\frac{1}{500}$. Xét nghiệm dương tính với xác suất $\frac{99}{100}$ nếu có bệnh, và với xác suất $\frac{1}{100}$ nếu khỏe. Biết kết quả dương tính, xác suất có bệnh bằng bao nhiêu?`,
        steps: [
          { claim: R`Xác suất vừa có bệnh vừa dương tính là $\frac{1}{500}\cdot\frac{99}{100}=\frac{99}{50000}$.`, why: "Đây là nhánh của nguyên nhân đang hỏi. Nhân theo thứ tự chọn người rồi xét nghiệm." },
          { claim: R`Xác suất dương tính bằng $\frac{99}{50000}+\frac{499}{500}\cdot\frac{1}{100}=\frac{598}{50000}$.`, why: "Mẫu số là xác suất toàn phần, gồm cả người khỏe bị dương tính nhầm." },
          { claim: R`Thương bằng $\frac{99}{598}$.`, why: "Bayes chia nhánh bệnh cho toàn bộ nhánh dương tính. Trong nhóm dương tính, khoảng một phần sáu thực sự có bệnh, phần còn lại là dương tính nhầm vì bệnh hiếm." },
        ],
        ket: R`Xác suất có bệnh khi đã dương tính bằng $\frac{99}{598}$.`,
        checks: [{ expr: "(Rational(1,500)*Rational(99,100))/(Rational(1,500)*Rational(99,100)+Rational(499,500)*Rational(1,100))", expect: "Rational(99,598)" }],
      },
      loi: "Lấy $\\frac{99}{100}$ làm xác suất có bệnh khi dương tính, bỏ mất nhóm khỏe bị dương tính nhầm.",
      luyen: {
        kind: "luyen",
        prompt: R`Một đồng xu công bằng và một đồng xu hai mặt ngửa. Chọn một đồng với xác suất $\frac{1}{2}$, tung được mặt ngửa. Xác suất đã chọn đồng hai mặt ngửa bằng bao nhiêu?`,
        think: "Tử là nhánh chọn đồng hai mặt rồi ra ngửa. Mẫu là xác suất ra ngửa tính trên cả hai đồng.",
        answer: R`Đáp số là $\frac{2}{3}$. Sau khi thấy ngửa, khả năng gặp đồng hai mặt tăng từ $\frac{1}{2}$ lên $\frac{2}{3}$.`,
        steps: [
          { claim: R`Xác suất ra ngửa bằng $\frac{1}{2}\cdot\frac{1}{2}+\frac{1}{2}\cdot 1=\frac{3}{4}$.`, why: "Xác suất toàn phần của điều đã quan sát." },
          { claim: R`Nhánh đồng hai mặt và ra ngửa có xác suất $\frac{1}{2}$. Thương bằng $\frac{1/2}{3/4}=\frac{2}{3}$.`, why: "Bayes. Diễn giải: quan sát ngửa làm tăng xác suất của đồng hai mặt so với xác suất ban đầu $\\frac{1}{2}$." },
        ],
        checks: [{ expr: "(Rational(1,2)*1)/(Rational(1,2)*Rational(1,2)+Rational(1,2)*1)", expect: "Rational(2,3)" }],
      },
    },
    {
      name: "Sơ đồ cây",
      nhanDang: "Phép thử có vài bước, mỗi bước có vài nhánh, và cần xác suất của một đường đi.",
      phuongPhap: R`Vẽ các bước từ trái sang phải. Xác suất một đường đi bằng tích các xác suất trên các cạnh của đường đó. Xác suất của một kết quả gồm nhiều đường là tổng các đường ấy, vì các đường xung khắc. Sơ đồ cây chỉ đúng khi xác suất trên mỗi cạnh là xác suất có điều kiện theo các bước đã đi trước nó.`,
      viDu: {
        prompt: R`Vẽ sơ đồ hai bước: chọn hộp nhất hoặc hộp hai với xác suất $\frac{1}{2}$, rồi lấy bi. Hộp nhất có xác suất đỏ $\frac{1}{4}$, hộp hai có xác suất đỏ $\frac{1}{2}$. Xác suất đi theo đường hộp nhất rồi đỏ bằng bao nhiêu?`,
        steps: [
          { claim: R`Đường hộp nhất rồi đỏ có hai cạnh, xác suất $\frac{1}{2}$ và $\frac{1}{4}$.`, why: "Cạnh thứ hai là xác suất có điều kiện sau khi đã chọn hộp nhất." },
          { claim: R`Tích bằng $\frac{1}{8}$.`, why: "Quy tắc nhân dọc theo một đường. Đường này xung khắc với đường hộp hai." },
          { claim: R`Cộng thêm đường hộp hai rồi đỏ, $\frac{1}{2}\cdot\frac{1}{2}=\frac{1}{4}$, được tổng $\frac{3}{8}$.`, why: "Muốn xác suất đỏ thì cộng mọi đường kết thúc bằng đỏ. Kết quả khớp công thức toàn phần." },
        ],
        ket: R`Đường hộp nhất rồi đỏ có xác suất $\frac{1}{8}$. Xác suất đỏ là $\frac{3}{8}$.`,
        checks: [
          { expr: "Rational(1,2)*Rational(1,4)", expect: "Rational(1,8)" },
          { expr: "Rational(1,8)+Rational(1,2)*Rational(1,2)", expect: "Rational(3,8)" },
        ],
      },
      loi: "Cộng các xác suất trên một đường thay vì nhân.",
      luyen: {
        kind: "luyen",
        prompt: R`Sơ đồ: tung một đồng xu cân đối, nếu ngửa thì tung tiếp xúc xắc, nếu sấp thì dừng. Xác suất đường ngửa rồi ra mặt $6$ bằng bao nhiêu?`,
        think: "Nhân xác suất ngửa với xác suất mặt $6$. Không cộng hai số này.",
        answer: R`Đáp số là $\frac{1}{12}$.`,
        steps: [
          { claim: R`Cạnh ngửa có xác suất $\frac{1}{2}$, cạnh mặt $6$ có xác suất $\frac{1}{6}$.`, why: "Cạnh sau là xác suất có điều kiện sau khi đã đi vào nhánh ngửa." },
          { claim: R`Tích bằng $\frac{1}{12}$.`, why: "Một đường trên sơ đồ cây lấy tích các cạnh." },
        ],
        checks: [{ expr: "Rational(1,2)*Rational(1,6)", expect: "Rational(1,12)" }],
      },
    },
    {
      name: "Thống kê ghép nhóm",
      nhanDang: "Bảng tần số theo lớp, hỏi số trung bình hoặc lớp có tần số lớn nhất.",
      phuongPhap: R`Với các lớp có điểm giữa $x_i$ và tần số $n_i$, số trung bình là $\frac{\sum n_i x_i}{\sum n_i}$. Điểm giữa của một lớp là trung bình hai mút. Lớp có tần số lớn nhất là lớp yếu vị. Không được lấy trung bình các điểm giữa mà bỏ tần số, trừ khi mọi lớp có cùng tần số.`,
      viDu: {
        prompt: R`Ba lớp $[0;10)$, $[10;20)$, $[20;30)$ có tần số $2$, $3$ và $5$. Số trung bình bằng bao nhiêu?`,
        steps: [
          { claim: R`Điểm giữa là $5$, $15$ và $25$. Tổng tần số bằng $10$.`, why: "Điểm giữa bằng trung bình hai đầu lớp. Mẫu số của số trung bình là tổng tần số." },
          { claim: R`Tử bằng $2\cdot 5+3\cdot 15+5\cdot 25=10+45+125=180$.`, why: "Mỗi điểm giữa được nhân với tần số của đúng lớp ấy. Bỏ tần số sẽ coi ba lớp ngang nhau." },
          { claim: R`Số trung bình bằng $\frac{180}{10}=18$.`, why: "Chia tổng có trọng số cho cỡ mẫu. Lớp yếu vị là $[20;30)$ vì tần số $5$ lớn nhất." },
        ],
        ket: "Số trung bình bằng $18$. Lớp yếu vị là $[20;30)$.",
        checks: [{ expr: "(2*5+3*15+5*25)/10", expect: "18" }],
      },
      loi: "Lấy trung bình của $5$, $15$ và $25$ thành $15$, bỏ tần số.",
      luyen: {
        kind: "luyen",
        prompt: R`Hai lớp $[0;10)$ và $[10;20)$ có tần số $4$ và $6$. Số trung bình bằng bao nhiêu?`,
        think: "Điểm giữa là $5$ và $15$. Nhân với tần số, chia cho tổng $10$.",
        answer: R`Đáp số là $11$.`,
        steps: [
          { claim: R`Tử bằng $4\cdot 5+6\cdot 15=20+90=110$.`, why: "Trọng số là tần số, không phải $1$ cho mỗi lớp." },
          { claim: R`Số trung bình bằng $\frac{110}{10}=11$.`, why: "Tổng tần số bằng $10$. Kết quả nằm giữa $5$ và $15$, gần lớp có tần số lớn hơn." },
        ],
        checks: [{ expr: "(4*5+6*15)/10", expect: "11" }],
      },
    },
  ],
  sangTao: [
    {
      kind: "thuc-te",
      sao: 4,
      prompt: R`Số liệu giả định. Trong $500$ người có $1$ người bệnh. Xét nghiệm dương đúng $\frac{99}{100}$ nếu bệnh, và dương nhầm $\frac{1}{100}$ nếu khỏe. Biết một người dương tính, xác suất người đó bệnh bằng bao nhiêu?`,
      think: "Mẫu số phải gồm cả người khỏe dương nhầm. Diễn giải kết quả trên nhóm người đã dương tính, không phải trên cả $500$ người.",
      answer: R`Đáp số là $\frac{99}{598}$. Trong nhóm dương tính, chỉ khoảng một phần sáu là người bệnh.`,
      steps: [
        { claim: R`Nhánh bệnh và dương tính có xác suất $\frac{99}{50000}$.`, why: "Nhân tỉ lệ bệnh với độ nhạy của xét nghiệm." },
        { claim: R`Xác suất dương tính bằng $\frac{598}{50000}$, thương bằng $\frac{99}{598}$.`, why: "Bayes. Diễn giải: phần lớn kết quả dương tính đến từ người khỏe, vì người khỏe đông hơn rất nhiều." },
      ],
      checks: [{ expr: "(Rational(1,500)*Rational(99,100))/(Rational(1,500)*Rational(99,100)+Rational(499,500)*Rational(1,100))", expect: "Rational(99,598)" }],
    },
    {
      kind: "thuc-te",
      sao: 2,
      prompt: R`Số liệu giả định. Một lô có $20$ bóng đèn, trong đó $3$ bóng hỏng. Lấy ngẫu nhiên $1$ bóng. Xác suất lấy được bóng tốt bằng bao nhiêu?`,
      think: "Biến cố đối của lấy bóng hỏng. Mỗi bóng trong lô đồng khả năng.",
      answer: R`Đáp số là $\frac{17}{20}$. Trong $20$ bóng có $17$ bóng tốt.`,
      steps: [
        { claim: R`Số bóng tốt là $20-3=17$.`, why: "Phần bù của số bóng hỏng trong lô." },
        { claim: R`Xác suất bằng $\frac{17}{20}$.`, why: "Mỗi bóng đồng khả năng được rút. Đơn vị đếm là bóng." },
      ],
      checks: [{ expr: "Rational(20-3,20)", expect: "Rational(17,20)" }],
    },
    {
      kind: "thuc-te",
      sao: 2,
      prompt: "Số liệu giả định. Một học sinh đoán ngẫu nhiên một câu trắc nghiệm bốn lựa chọn, chỉ một đáp án đúng. Xác suất đoán sai trong một lần bằng bao nhiêu?",
      think: "Bốn lựa chọn đồng khả năng. Đoán sai là biến cố đối của đoán đúng.",
      answer: R`Đáp số là $\frac{3}{4}$. Mỗi lần đoán, ba lựa chọn trong bốn lựa chọn là sai.`,
      steps: [
        { claim: R`Xác suất đúng trong một lần là $\frac{1}{4}$.`, why: "Một lựa chọn đúng trong bốn lựa chọn đồng khả năng." },
        { claim: R`Xác suất sai là $1-\frac{1}{4}=\frac{3}{4}$.`, why: "Biến cố đối. Kết quả tính trên một lần đoán." },
      ],
      checks: [{ expr: "1-Rational(1,4)", expect: "Rational(3,4)" }],
    },
    {
      kind: "thuc-te",
      sao: 2,
      prompt: R`Số liệu giả định. Gieo một xúc xắc cân đối hai lần độc lập. Xác suất cả hai lần đều ra mặt chẵn bằng bao nhiêu?`,
      think: "Hai lần độc lập. Xác suất một lần ra chẵn là $\\frac{1}{2}$.",
      answer: R`Đáp số là $\frac{1}{4}$. Cứ bốn lần gieo cặp thì khoảng một lần cả hai mặt đều chẵn.`,
      steps: [
        { claim: R`Một lần ra chẵn có xác suất $\frac{1}{2}$.`, why: "Ba mặt chẵn trong sáu mặt." },
        { claim: R`Vì độc lập, xác suất cả hai lần là $\frac{1}{4}$.`, why: "Quy tắc nhân. Diễn giải trên số lần gieo cặp." },
      ],
      checks: [{ expr: "Rational(1,2)*Rational(1,2)", expect: "Rational(1,4)" }],
    },
    {
      kind: "mo",
      sao: 3,
      prompt: "Hãy tự đặt một câu xác suất có điều kiện trên hai xúc xắc, trong đó điều kiện không phải tổng bằng $8$. Nêu không gian đã thu hẹp và đáp số. Có nhiều đề đúng.",
      think: "Điều kiện phải thực sự thu hẹp không gian. Mẫu số là số kết quả của điều kiện, không phải $36$.",
      answer: R`Một đề đúng: biết tổng bằng $7$, xác suất xúc xắc thứ nhất ra $1$ bằng $\frac{1}{6}$. Không gian thu hẹp có $6$ cặp.`,
      steps: [
        { claim: R`Sáu cặp tổng $7$ là không gian đã thu hẹp.`, why: "Điều kiện khác với tổng bằng $8$, nên đây là một đề mới hợp lệ." },
        { claim: R`Chỉ một cặp có số đầu bằng $1$, nên xác suất bằng $\frac{1}{6}$.`, why: "Công thức có điều kiện trên các kết quả đồng khả năng còn lại." },
      ],
      checks: [{ expr: "1/(1+1+1+1+1+1)", expect: "Rational(1,6)" }],
    },
    {
      kind: "phan-bien",
      sao: 3,
      prompt: "Bạn A nói xác suất tổng hai xúc xắc phân biệt bằng $7$ là $\\frac{1}{7}$, vì có bảy tổng có thể từ $1$ đến $7$ và chỉ một tổng đúng. Hãy phản biện.",
      think: "Các tổng không đồng khả năng. Phải đếm số cặp, không đếm số giá trị của tổng.",
      answer: R`Lập luận chưa đúng. Có $6$ cặp tổng $7$ trong $36$ cặp đồng khả năng, nên xác suất bằng $\frac{1}{6}$.`,
      steps: [
        { claim: R`Các giá trị tổng từ $2$ đến $12$ không đồng khả năng.`, why: "Tổng $7$ có nhiều cặp hơn tổng $2$. Bạn A đã dùng công thức cổ điển khi giả thiết đồng khả năng không đúng." },
        { claim: R`Đếm trên $36$ cặp được $\frac{6}{36}=\frac{1}{6}$.`, why: "Không gian mẫu đúng là các cặp mặt, không phải các giá trị của tổng." },
      ],
      checks: [{ expr: "Rational(6,36)", expect: "Rational(1,6)" }],
    },
    {
      kind: "doc",
      sao: 2,
      prompt: R`Bảng ghép nhóm ghi lớp $[0;10)$ tần số $2$, lớp $[10;20)$ tần số $3$, lớp $[20;30)$ tần số $5$. Hãy đọc số trung bình và lớp yếu vị.`,
      think: "Lấy điểm giữa $5$, $15$, $25$. Nhân với tần số trên cùng hàng rồi chia cho tổng tần số. Lớp yếu vị là lớp có tần số lớn nhất.",
      answer: "Số trung bình bằng $18$. Lớp yếu vị là $[20;30)$.",
      steps: [
        { claim: R`Tử bằng $2\cdot 5+3\cdot 15+5\cdot 25=180$, mẫu bằng $10$.`, why: "Đọc tần số từng hàng nhân với điểm giữa của hàng đó." },
        { claim: R`Thương bằng $18$. Tần số lớn nhất là $5$, thuộc lớp $[20;30)$.`, why: "Số trung bình là thương này. Lớp yếu vị đọc ở cột tần số, không phải ở cột điểm giữa." },
      ],
      checks: [{ expr: "(2*5+3*15+5*25)/(2+3+5)", expect: "18" }],
    },
    {
      kind: "uoc-luong",
      sao: 3,
      prompt: R`Ước lượng $\frac{99}{598}$ bằng cách so với $\frac{1}{6}$ và với $\frac{4}{25}$.`,
      think: "Quy đồng để so tử. Không cần chia thập phân dài.",
      answer: R`Ta có $\frac{4}{25}<\frac{99}{598}<\frac{1}{6}$.`,
      steps: [
        { claim: R`So với $\frac{1}{6}$: tích chéo $99\cdot 6=594$ và $598\cdot 1=598$, mà $594<598$.`, why: "Hai mẫu dương, nên phân số nhỏ hơn khi tích chéo kiểu này nhỏ hơn." },
        { claim: R`So với $\frac{4}{25}$: tích chéo $99\cdot 25=2475$ và $598\cdot 4=2392$, mà $2475>2392$.`, why: "Cùng quy tắc so sánh. Phân số Bayes nằm giữa $0{,}16$ và $\\frac{1}{6}$." },
      ],
      checks: [
        { expr: "99*6-598", expect: "-4" },
        { expr: "99*25-598*4", expect: "83" },
      ],
    },
    {
      kind: "tu-ra-de",
      sao: 4,
      prompt: R`Bài xuất phát: biết tổng hai xúc xắc bằng $8$, xác suất có mặt $6$ bằng $\frac{2}{5}$. Hãy đổi giả thiết thành tổng bằng $7$, dự đoán xác suất có mặt $6$, rồi kiểm bằng cách liệt kê.`,
      think: "Dự đoán số cặp tổng $7$ và số cặp trong đó có mặt $6$ trước khi viết phân số. Mẫu không còn là $5$.",
      answer: R`Đề mới lấy điều kiện tổng bằng $7$. Dự đoán có $6$ cặp và $2$ cặp chứa mặt $6$, xác suất bằng $\frac{1}{3}$.`,
      steps: [
        { claim: R`Đổi điều kiện từ tổng $8$ sang tổng $7$. Dự đoán không gian thu hẹp có $6$ cặp, trong đó $(1;6)$ và $(6;1)$ chứa mặt $6$.`, why: "Tổng $7$ nhiều hơn tổng $8$ một cặp, và vẫn có đúng hai cặp chứa mặt $6$." },
        { claim: R`Liệt kê xác nhận sáu cặp, và đúng hai cặp chứa mặt $6$.`, why: "Phép liệt kê kiểm lại dự đoán. Không cặp nào bị đếm trùng." },
        { claim: R`Xác suất bằng $\frac{2}{6}=\frac{1}{3}$.`, why: "Mẫu là số phần tử của điều kiện mới. Kết quả khác $\\frac{2}{5}$ của đề cũ." },
      ],
      checks: [{ expr: "Rational(2,6)", expect: "Rational(1,3)" }],
    },
  ],
};
