/** Lớp 12, phần chi tiết: thống kê ghép nhóm nâng cao và xác suất nâng cao. */
import type { GradeChapter } from "./types.ts";
import { bai, buoc, chuong, luyen, vd } from "./types.ts";

const R = String.raw;

export const lop12TkNC: GradeChapter = chuong("tk-nang-cao", "Thống kê ghép nhóm nâng cao", [
  bai("trung-vi-nhom", "Trung vị và tứ phân vị thứ hai của mẫu ghép nhóm",
    R`Tứ phân vị thứ hai $Q_2$ là trung vị của mẫu ghép nhóm. Gọi $n$ là cỡ mẫu, nhóm chứa mốc $\frac{n}{2}$ là nhóm đầu tiên có tần số tích lũy không nhỏ hơn $\frac{n}{2}$. Khi đó $Q_2=a+\frac{\frac{n}{2}-N}{n_i}h$, với $a$ là mút trái của nhóm đó, $N$ là tần số tích lũy trước nhóm, $n_i$ là tần số nhóm và $h$ là độ dài nhóm.`,
    [
      vd(R`Bốn nhóm $[0;10)$, $[10;20)$, $[20;30)$, $[30;40)$ có tần số $3;\ 5;\ 8;\ 4$. Tính $Q_2$.`,
        [
          buoc(R`Cỡ mẫu $n=20$ nên mốc là $\frac{n}{2}=10$.`, R`Tổng các tần số là $3+5+8+4=20$.`),
          buoc(R`Tần số tích lũy lần lượt là $3;\ 8;\ 16;\ 20$, nên nhóm đầu tiên có tần số tích lũy không nhỏ hơn $10$ là $[20;30)$.`, R`Nhóm $[10;20)$ chỉ tích lũy được $8<10$ nên chưa chứa mốc.`),
          buoc(R`Ta có $Q_2=20+\frac{10-8}{8}\cdot10=\frac{45}{2}$.`, R`Thay $a=20$, $N=8$, $n_i=8$ và $h=10$ vào công thức.`),
        ],
        R`Trung vị của mẫu bằng $\frac{45}{2}$.`,
        [{ expr: "20+Rational(10-8,8)*10", expect: "Rational(45,2)" }]),
      vd(R`Ba nhóm $[0;5)$, $[5;10)$, $[10;15)$ có tần số $5;\ 10;\ 5$. Tính $Q_2$.`,
        [
          buoc(R`Cỡ mẫu $n=20$ nên mốc là $10$, và tần số tích lũy là $5;\ 15;\ 20$.`, R`Nhóm đầu tiên có tần số tích lũy từ $10$ trở lên là $[5;10)$.`),
          buoc(R`Ta có $Q_2=5+\frac{10-5}{10}\cdot5=\frac{15}{2}$.`, R`Thay $a=5$, $N=5$, $n_i=10$ và $h=5$ vào công thức.`),
        ],
        R`Trung vị của mẫu bằng $\frac{15}{2}$.`,
        [{ expr: "5+Rational(10-5,10)*5", expect: "Rational(15,2)" }]),
    ],
    [
      luyen(R`Ba nhóm $[0;10)$, $[10;20)$, $[20;30)$ có tần số $2;\ 6;\ 2$. Tính $Q_2$.`, R`Trung vị bằng $15$.`, [{ expr: "10+Rational(5-2,6)*10", expect: "15" }], R`Mốc là $5$, nhóm chứa mốc là $[10;20)$ và $Q_2=10+\frac{5-2}{6}\cdot10=15$.`),
      luyen(R`Ba nhóm $[0;5)$, $[5;10)$, $[10;15)$ có tần số $4;\ 4;\ 12$. Tần số tích lũy trước nhóm chứa trung vị bằng bao nhiêu?`, R`Bằng $8$.`, [{ expr: "4+4", expect: "8" }], R`Mốc là $10$ lớn hơn $8$, nên nhóm chứa trung vị là $[10;15)$ và tần số tích lũy trước nó là $4+4=8$.`),
      luyen(R`Ba nhóm $[0;5)$, $[5;10)$, $[10;15)$ có tần số $4;\ 4;\ 12$. Tính $Q_2$.`, R`Trung vị bằng $\frac{65}{6}$.`, [{ expr: "10+Rational(10-8,12)*5", expect: "Rational(65,6)" }], R`Ta có $Q_2=10+\frac{10-8}{12}\cdot5=10+\frac{5}{6}=\frac{65}{6}$.`),
    ],
    { topicId: "combo" }),
  bai("phuong-sai-ngan", "Công thức rút gọn của phương sai",
    R`Phương sai của mẫu ghép nhóm còn tính được bằng $s^2=\frac{1}{n}\sum n_ic_i^2-\bar x^2$, tức là trung bình của bình phương trừ bình phương của trung bình. Cách này chỉ cần một lần tính $\bar x$ và một lần tính trung bình bình phương.`,
    [
      vd(R`Ba nhóm có giá trị đại diện $5;\ 15;\ 25$ và tần số $2;\ 3;\ 5$. Tính phương sai theo công thức rút gọn.`,
        [
          buoc(R`Số trung bình $\bar x=18$ và cỡ mẫu $n=10$.`, R`Tính $\frac{2\cdot5+3\cdot15+5\cdot25}{10}=\frac{150}{10}$ nên $\bar x=18$.`),
          buoc(R`Trung bình bình phương là $\frac{2\cdot25+3\cdot225+5\cdot625}{10}=385$.`, R`Bình phương từng giá trị đại diện rồi nhân với tần số.`),
          buoc(R`Phương sai là $385-18^2=61$.`, R`Lấy trung bình bình phương trừ bình phương của trung bình.`),
        ],
        R`Phương sai bằng $61$, trùng với kết quả tính theo định nghĩa.`,
        [{ expr: "Rational(2*25+3*225+5*625,10)-18**2", expect: "61" }]),
      vd(R`Ba nhóm có giá trị đại diện $1;\ 3;\ 5$ và tần số $1;\ 2;\ 1$. Tính phương sai.`,
        [
          buoc(R`Cỡ mẫu $n=4$ và $\bar x=\frac{1+6+5}{4}=3$.`, R`Cộng các tích $n_ic_i$ rồi chia cho $n$.`),
          buoc(R`Trung bình bình phương là $\frac{1+18+25}{4}=11$, nên $s^2=11-9=2$.`, R`Bình phương của trung bình là $3^2=9$.`),
        ],
        R`Phương sai bằng $2$.`,
        [{ expr: "Rational(1*1+2*9+1*25,4)-3**2", expect: "2" }]),
    ],
    [
      luyen(R`Mẫu có hai giá trị đại diện $2;\ 4$ với tần số $1;\ 1$. Tính phương sai theo công thức rút gọn.`, R`Phương sai bằng $1$.`, [{ expr: "Rational(4+16,2)-3**2", expect: "1" }], R`Trung bình bằng $3$, trung bình bình phương bằng $\frac{4+16}{2}=10$, nên $s^2=10-9=1$.`),
      luyen(R`Giá trị đại diện $10;\ 20;\ 30$ có tần số $1;\ 2;\ 1$. Tính phương sai.`, R`Phương sai bằng $50$.`, [{ expr: "Rational(100+2*400+900,4)-20**2", expect: "50" }], R`Trung bình bằng $20$, trung bình bình phương bằng $\frac{100+800+900}{4}=450$, nên $s^2=450-400=50$.`),
      luyen(R`Giá trị đại diện $0;\ 10$ có tần số $3;\ 1$. Tính phương sai.`, R`Phương sai bằng $\frac{75}{4}$.`, [{ expr: "Rational(100,4)-Rational(5,2)**2", expect: "Rational(75,4)" }], R`Trung bình bằng $\frac{5}{2}$, trung bình bình phương bằng $\frac{100}{4}=25$, nên $s^2=25-\frac{25}{4}=\frac{75}{4}$.`),
    ],
    { topicId: "combo" }),
  bai("so-sanh-hai-mau", "So sánh độ phân tán của hai mẫu",
    R`Khi hai mẫu cùng đơn vị và có số trung bình bằng nhau, mẫu nào có độ lệch chuẩn lớn hơn thì các giá trị phân tán xa trung bình hơn. Khoảng tứ phân vị cũng dùng được cho việc này và ít bị ảnh hưởng bởi giá trị ở hai đầu.`,
    [
      vd(R`Mẫu $A$ có giá trị đại diện $5;\ 15;\ 25$ với tần số $1;\ 8;\ 1$. Mẫu $B$ có cùng giá trị đại diện với tần số $4;\ 2;\ 4$. Mẫu nào phân tán hơn?`,
        [
          buoc(R`Cả hai mẫu có cỡ mẫu $10$ và trung bình bằng $15$.`, R`Hai mẫu đối xứng quanh giá trị đại diện $15$ nên trung bình bằng $15$.`),
          buoc(R`Phương sai của $A$ là $\frac{100+0+100}{10}=20$ và của $B$ là $\frac{400+0+400}{10}=80$.`, R`Bình phương độ lệch $\pm10$ là $100$, nhân với tần số của từng nhóm.`),
        ],
        R`Mẫu $B$ phân tán hơn vì phương sai $80$ lớn hơn $20$.`,
        [{ expr: "Rational(1*100+8*0+1*100,10)", expect: "20" }, { expr: "Rational(4*100+2*0+4*100,10)", expect: "80" }]),
      vd(R`Lớp $X$ có giá trị đại diện $5;\ 7;\ 9$ và lớp $Y$ có $3;\ 7;\ 11$, cùng tần số $1;\ 2;\ 1$. Lớp nào phân tán hơn và độ lệch chuẩn gấp bao nhiêu lần?`,
        [
          buoc(R`Cả hai lớp có trung bình $7$, phương sai của $X$ là $\frac{4+0+4}{4}=2$ và của $Y$ là $\frac{16+0+16}{4}=8$.`, R`Độ lệch của $Y$ gấp đôi độ lệch của $X$ nên bình phương gấp bốn lần.`),
          buoc(R`Độ lệch chuẩn là $\sqrt{2}$ và $\sqrt{8}=2\sqrt{2}$, nên gấp $2$ lần.`, R`Lấy căn bậc hai của phương sai.`),
        ],
        R`Lớp $Y$ phân tán hơn và độ lệch chuẩn gấp $2$ lần.`,
        [{ expr: "sqrt(Rational(16+0+16,4))/sqrt(Rational(4+0+4,4))", expect: "2" }]),
    ],
    [
      luyen(R`Mẫu có giá trị đại diện $5;\ 15;\ 25$ với tần số $1;\ 8;\ 1$ có phương sai bằng bao nhiêu?`, R`Phương sai bằng $20$.`, [{ expr: "Rational(100+0+100,10)", expect: "20" }], R`Trung bình bằng $15$ và độ lệch của hai nhóm biên đều bằng $10$ nên $s^2=\frac{100+100}{10}=20$.`),
      luyen(R`Mẫu $A$ có phương sai $20$ và mẫu $B$ có phương sai $80$, cùng đơn vị. Phương sai của $B$ gấp mấy lần phương sai của $A$?`, R`Gấp $4$ lần.`, [{ expr: "Rational(80,20)", expect: "4" }], R`Ta có $\frac{80}{20}=4$.`),
      luyen(R`Lớp $X$ có phương sai $2$ và lớp $Y$ có phương sai $8$, cùng đơn vị. Độ lệch chuẩn của $Y$ gấp mấy lần của $X$?`, R`Gấp $2$ lần.`, [{ expr: "sqrt(8)/sqrt(2)", expect: "2" }], R`Ta có $\frac{\sqrt{8}}{\sqrt{2}}=\sqrt{4}=2$.`),
    ],
    { topicId: "combo" }),
  bai("bien-doi-mau", "Biến đổi mẫu số liệu và các số đặc trưng",
    R`Nếu cộng cùng một số $a$ vào mọi giá trị thì số trung bình tăng $a$ còn phương sai không đổi. Nếu nhân mọi giá trị với $k$ thì số trung bình nhân $k$, phương sai nhân $k^2$ và độ lệch chuẩn nhân $|k|$.`,
    [
      vd(R`Mẫu có trung bình $18$ và phương sai $61$. Cộng $2$ vào mọi giá trị thì trung bình và phương sai mới là bao nhiêu?`,
        [
          buoc(R`Trung bình mới là $18+2=20$.`, R`Mỗi giá trị tăng $2$ nên trung bình cũng tăng $2$.`),
          buoc(R`Độ lệch của mỗi giá trị so với trung bình không đổi nên phương sai vẫn bằng $61$.`, R`Hiệu giữa giá trị mới và trung bình mới bằng hiệu giữa giá trị cũ và trung bình cũ.`),
        ],
        R`Trung bình bằng $20$ và phương sai vẫn bằng $61$.`,
        [{ expr: "18+2", expect: "20" }]),
      vd(R`Mẫu có trung bình $18$ và phương sai $61$. Nhân mọi giá trị với $3$ thì trung bình và phương sai mới là bao nhiêu?`,
        [
          buoc(R`Trung bình mới là $18\cdot3=54$.`, R`Nhân mọi giá trị với $3$ thì trung bình cũng nhân $3$.`),
          buoc(R`Độ lệch mỗi giá trị nhân $3$ nên bình phương nhân $9$, và phương sai mới là $61\cdot9=549$.`, R`Phương sai là trung bình của bình phương các độ lệch.`),
        ],
        R`Trung bình bằng $54$ và phương sai bằng $549$.`,
        [{ expr: "18*3", expect: "54" }, { expr: "61*3**2", expect: "549" }]),
    ],
    [
      luyen(R`Mẫu có trung bình $10$ và phương sai $4$. Cộng $5$ vào mọi giá trị thì trung bình mới bằng bao nhiêu?`, R`Trung bình bằng $15$.`, [{ expr: "10+5", expect: "15" }], R`Trung bình tăng đúng bằng số được cộng vào mọi giá trị.`),
      luyen(R`Mẫu có phương sai $4$. Nhân mọi giá trị với $2$ thì phương sai mới bằng bao nhiêu?`, R`Phương sai bằng $16$.`, [{ expr: "4*2**2", expect: "16" }], R`Phương sai nhân $k^2=4$, nên bằng $4\cdot4=16$.`),
      luyen(R`Mẫu có độ lệch chuẩn $3$. Nhân mọi giá trị với $\frac{1}{3}$ thì độ lệch chuẩn mới bằng bao nhiêu?`, R`Độ lệch chuẩn bằng $1$.`, [{ expr: "3*Rational(1,3)", expect: "1" }], R`Độ lệch chuẩn nhân $|k|=\frac{1}{3}$, nên bằng $3\cdot\frac{1}{3}=1$.`),
    ],
    { topicId: "combo" }),
]);

export const lop12XsNC: GradeChapter = chuong("xs-nang-cao", "Xác suất nâng cao", [
  bai("cay-xac-suat", "Sơ đồ cây và phép lấy không hoàn lại",
    R`Khi lấy hai lần liên tiếp không hoàn lại, xác suất của lần thứ hai phụ thuộc kết quả lần thứ nhất. Trên sơ đồ cây, xác suất của một đường đi bằng tích các xác suất trên các nhánh của nó, và xác suất của một biến cố bằng tổng xác suất các đường đi thuộc biến cố đó.`,
    [
      vd(R`Một túi có $3$ bi đỏ và $2$ bi xanh. Lấy lần lượt hai bi không hoàn lại. Tính xác suất cả hai bi đều đỏ.`,
        [
          buoc(R`Lần đầu lấy bi đỏ có xác suất $\frac{3}{5}$.`, R`Có $3$ bi đỏ trong $5$ bi.`),
          buoc(R`Sau đó còn $2$ bi đỏ trong $4$ bi nên lần hai đỏ có xác suất $\frac{2}{4}$.`, R`Bi đã lấy không trả lại túi.`),
          buoc(R`Xác suất cần tìm là $\frac{3}{5}\cdot\frac{2}{4}=\frac{3}{10}$.`, R`Nhân hai xác suất trên đường đi đỏ rồi đỏ.`),
        ],
        R`Xác suất bằng $\frac{3}{10}$.`,
        [{ expr: "Rational(3,5)*Rational(2,4)", expect: "Rational(3,10)" }]),
      vd(R`Với túi trên, tính xác suất hai bi lấy ra khác màu.`,
        [
          buoc(R`Đường đỏ rồi xanh có xác suất $\frac{3}{5}\cdot\frac{2}{4}=\frac{3}{10}$.`, R`Sau lần đầu đỏ còn $2$ bi xanh trong $4$ bi.`),
          buoc(R`Đường xanh rồi đỏ có xác suất $\frac{2}{5}\cdot\frac{3}{4}=\frac{3}{10}$, nên tổng là $\frac{3}{10}+\frac{3}{10}=\frac{3}{5}$.`, R`Hai đường đi này loại trừ nhau nên cộng xác suất.`),
        ],
        R`Xác suất bằng $\frac{3}{5}$.`,
        [{ expr: "Rational(3,5)*Rational(2,4)+Rational(2,5)*Rational(3,4)", expect: "Rational(3,5)" }]),
    ],
    [
      luyen(R`Với túi trên, tính xác suất cả hai bi đều xanh.`, R`Xác suất bằng $\frac{1}{10}$.`, [{ expr: "Rational(2,5)*Rational(1,4)", expect: "Rational(1,10)" }], R`Lần đầu xanh có xác suất $\frac{2}{5}$, lần hai còn $1$ bi xanh trong $4$ bi nên xác suất là $\frac{1}{4}$.`),
      luyen(R`Với túi trên, tính xác suất có ít nhất một bi đỏ.`, R`Xác suất bằng $\frac{9}{10}$.`, [{ expr: "1-Rational(1,10)", expect: "Rational(9,10)" }], R`Biến cố đối là cả hai bi xanh, có xác suất $\frac{1}{10}$.`),
      luyen(R`Một hộp có $4$ viên đỏ và $6$ viên vàng. Lấy hai viên không hoàn lại. Tính xác suất cả hai đều đỏ.`, R`Xác suất bằng $\frac{2}{15}$.`, [{ expr: "Rational(4,10)*Rational(3,9)", expect: "Rational(2,15)" }], R`Ta có $\frac{4}{10}\cdot\frac{3}{9}=\frac{12}{90}=\frac{2}{15}$.`),
    ],
    { topicId: "probability" }),
  bai("cong-thuc-nhan", "Công thức nhân xác suất",
    R`Từ định nghĩa xác suất có điều kiện suy ra $P(A\cap B)=P(A)\,P(B\mid A)$ khi $P(A)>0$. Công thức mở rộng cho nhiều biến cố liên tiếp: $P(A\cap B\cap C)=P(A)\,P(B\mid A)\,P(C\mid A\cap B)$.`,
    [
      vd(R`Biết $P(A)=\frac{2}{5}$ và $P(B\mid A)=\frac{1}{2}$. Tính $P(A\cap B)$.`,
        [
          buoc(R`Áp dụng công thức nhân: $P(A\cap B)=\frac{2}{5}\cdot\frac{1}{2}$.`, R`Biết xác suất của $A$ và xác suất của $B$ khi $A$ đã xảy ra.`),
          buoc(R`Kết quả là $\frac{1}{5}$.`, R`Nhân hai phân số rồi rút gọn.`),
        ],
        R`Xác suất bằng $\frac{1}{5}$.`,
        [{ expr: "Rational(2,5)*Rational(1,2)", expect: "Rational(1,5)" }]),
      vd(R`Rút liên tiếp hai lá bài từ bộ bài $52$ lá, không hoàn lại. Tính xác suất cả hai lá đều là át.`,
        [
          buoc(R`Lá đầu là át có xác suất $\frac{4}{52}$, và khi đó còn $3$ át trong $51$ lá.`, R`Bộ bài chuẩn có đúng $4$ lá át trong $52$ lá.`),
          buoc(R`Xác suất cần tìm là $\frac{4}{52}\cdot\frac{3}{51}=\frac{1}{221}$.`, R`Rút gọn bằng cách chia tử và mẫu cho $12$.`),
        ],
        R`Xác suất bằng $\frac{1}{221}$.`,
        [{ expr: "Rational(4,52)*Rational(3,51)", expect: "Rational(1,221)" }]),
    ],
    [
      luyen(R`Biết $P(A)=\frac{1}{3}$ và $P(B\mid A)=\frac{3}{4}$. Tính $P(A\cap B)$.`, R`Xác suất bằng $\frac{1}{4}$.`, [{ expr: "Rational(1,3)*Rational(3,4)", expect: "Rational(1,4)" }], R`Nhân hai xác suất: $\frac{1}{3}\cdot\frac{3}{4}=\frac{1}{4}$.`),
      luyen(R`Một lớp có $10$ nam và $15$ nữ. Chọn lần lượt hai bạn không hoàn lại. Tính xác suất cả hai đều là nữ.`, R`Xác suất bằng $\frac{7}{20}$.`, [{ expr: "Rational(15,25)*Rational(14,24)", expect: "Rational(7,20)" }], R`Ta có $\frac{15}{25}\cdot\frac{14}{24}=\frac{210}{600}=\frac{7}{20}$.`),
      luyen(R`Biết $P(A\cap B)=\frac{1}{6}$ và $P(A)=\frac{1}{2}$. Tính $P(B\mid A)$.`, R`Xác suất bằng $\frac{1}{3}$.`, [{ expr: "Rational(1,6)/Rational(1,2)", expect: "Rational(1,3)" }], R`Chia xác suất giao cho $P(A)$: $\frac{1}{6}:\frac{1}{2}=\frac{1}{3}$.`),
    ],
    { topicId: "probability" }),
  bai("doc-lap-12", "Biến cố độc lập",
    R`Hai biến cố $A$ và $B$ độc lập khi và chỉ khi $P(A\cap B)=P(A)\,P(B)$. Khi đó biết $B$ xảy ra không làm thay đổi xác suất của $A$, tức $P(A\mid B)=P(A)$. Với hai biến cố bất kì, $P(A\cup B)=P(A)+P(B)-P(A\cap B)$.`,
    [
      vd(R`Biết $P(A)=\frac{1}{2}$, $P(B)=\frac{1}{3}$ và $P(A\cap B)=\frac{1}{6}$. Hai biến cố có độc lập không?`,
        [
          buoc(R`Tích hai xác suất là $\frac{1}{2}\cdot\frac{1}{3}=\frac{1}{6}$.`, R`Điều kiện độc lập so sánh tích này với xác suất của giao.`),
          buoc(R`Tích bằng $P(A\cap B)=\frac{1}{6}$ nên hai biến cố độc lập.`, R`Hai vế của điều kiện bằng nhau.`),
        ],
        R`Hai biến cố độc lập.`,
        [{ expr: "Rational(1,2)*Rational(1,3)", expect: "Rational(1,6)" }]),
      vd(R`Biết $P(A)=\frac{1}{2}$, $P(B)=\frac{1}{2}$ và $P(A\cap B)=\frac{1}{3}$. Hai biến cố có độc lập không?`,
        [
          buoc(R`Tích hai xác suất là $\frac{1}{2}\cdot\frac{1}{2}=\frac{1}{4}$.`, R`Nhân hai xác suất rồi so với xác suất của giao.`),
          buoc(R`Vì $\frac{1}{4}\ne\frac{1}{3}$ nên hai biến cố không độc lập.`, R`Chỉ cần hai vế khác nhau là đủ để kết luận phụ thuộc.`),
        ],
        R`Hai biến cố không độc lập.`,
        [{ expr: "Rational(1,2)*Rational(1,2)", expect: "Rational(1,4)" }]),
    ],
    [
      luyen(R`Hai biến cố độc lập có $P(A)=\frac{1}{5}$ và $P(B)=\frac{1}{2}$. Tính $P(A\cap B)$.`, R`Xác suất bằng $\frac{1}{10}$.`, [{ expr: "Rational(1,5)*Rational(1,2)", expect: "Rational(1,10)" }], R`Với biến cố độc lập thì xác suất giao bằng tích hai xác suất.`),
      luyen(R`Với hai biến cố độc lập ở câu trên, tính $P(A\cup B)$.`, R`Xác suất bằng $\frac{3}{5}$.`, [{ expr: "Rational(1,5)+Rational(1,2)-Rational(1,10)", expect: "Rational(3,5)" }], R`Ta có $\frac{1}{5}+\frac{1}{2}-\frac{1}{10}=\frac{2+5-1}{10}=\frac{3}{5}$.`),
      luyen(R`Biết $P(A)=\frac{1}{4}$, $P(B)=\frac{1}{3}$ và $P(A\cap B)=\frac{1}{10}$. Tích $P(A)P(B)$ bằng bao nhiêu, và hai biến cố có độc lập không?`, R`Tích bằng $\frac{1}{12}$, khác $\frac{1}{10}$, nên không độc lập.`, [{ expr: "Rational(1,4)*Rational(1,3)", expect: "Rational(1,12)" }], R`Tích $\frac{1}{12}$ khác xác suất giao $\frac{1}{10}$, nên điều kiện độc lập không thỏa.`),
    ],
    { topicId: "probability" }),
  bai("bayes-cay", "Công thức Bayes trên sơ đồ cây",
    R`Vẽ sơ đồ cây với nhánh đầu là các nguyên nhân $B_i$ và nhánh sau là kết quả $A$. Xác suất toàn phần $P(A)$ là tổng các đường đi dẫn tới $A$. Công thức Bayes cho $P(B_i\mid A)$ bằng đường đi qua $B_i$ chia cho tổng các đường đi dẫn tới $A$.`,
    [
      vd(R`Một bệnh có tỉ lệ mắc $\frac{1}{100}$. Xét nghiệm cho kết quả dương tính với người bệnh có xác suất $\frac{9}{10}$ và với người không bệnh có xác suất $\frac{1}{10}$. Một người có kết quả dương tính, tính xác suất người đó mắc bệnh.`,
        [
          buoc(R`Đường bệnh rồi dương tính có xác suất $\frac{1}{100}\cdot\frac{9}{10}=\frac{9}{1000}$.`, R`Nhân xác suất trên hai nhánh liên tiếp.`),
          buoc(R`Đường không bệnh rồi dương tính có xác suất $\frac{99}{100}\cdot\frac{1}{10}=\frac{99}{1000}$.`, R`Xác suất không bệnh là $1-\frac{1}{100}=\frac{99}{100}$.`),
          buoc(R`Xác suất cần tìm là $\frac{9}{9+99}=\frac{1}{12}$.`, R`Đường bệnh chia cho tổng hai đường dẫn tới dương tính.`),
        ],
        R`Xác suất người đó mắc bệnh bằng $\frac{1}{12}$.`,
        [{ expr: "Rational(9,1000)/(Rational(9,1000)+Rational(99,1000))", expect: "Rational(1,12)" }]),
      vd(R`Máy $1$ làm ra $\frac{3}{5}$ sản phẩm với tỉ lệ lỗi $\frac{1}{50}$. Máy $2$ làm $\frac{2}{5}$ sản phẩm với tỉ lệ lỗi $\frac{1}{20}$. Lấy ngẫu nhiên một sản phẩm bị lỗi, tính xác suất nó do máy $1$ làm.`,
        [
          buoc(R`Đường máy $1$ rồi lỗi là $\frac{3}{5}\cdot\frac{1}{50}=\frac{3}{250}$ và máy $2$ rồi lỗi là $\frac{2}{5}\cdot\frac{1}{20}=\frac{5}{250}$.`, R`Quy đồng mẫu $250$ để dễ cộng.`),
          buoc(R`Xác suất cần tìm là $\frac{3}{3+5}=\frac{3}{8}$.`, R`Đường máy $1$ chia cho tổng hai đường dẫn tới lỗi.`),
        ],
        R`Xác suất do máy $1$ làm bằng $\frac{3}{8}$.`,
        [{ expr: "Rational(3,250)/(Rational(3,250)+Rational(5,250))", expect: "Rational(3,8)" }]),
    ],
    [
      luyen(R`Với bài xét nghiệm trên, tính xác suất một người bất kì có kết quả dương tính.`, R`Xác suất bằng $\frac{27}{250}$.`, [{ expr: "Rational(9,1000)+Rational(99,1000)", expect: "Rational(27,250)" }], R`Cộng hai đường dẫn tới dương tính: $\frac{9+99}{1000}=\frac{108}{1000}=\frac{27}{250}$.`),
      luyen(R`Một nửa số người mắc bệnh, xét nghiệm dương tính với người bệnh có xác suất $\frac{4}{5}$ và với người không bệnh có xác suất $\frac{1}{5}$. Biết kết quả dương tính, tính xác suất mắc bệnh.`, R`Xác suất bằng $\frac{4}{5}$.`, [{ expr: "(Rational(1,2)*Rational(4,5))/(Rational(1,2)*Rational(4,5)+Rational(1,2)*Rational(1,5))", expect: "Rational(4,5)" }], R`Hai đường là $\frac{2}{5}$ và $\frac{1}{10}$, nên xác suất là $\frac{\frac{2}{5}}{\frac{2}{5}+\frac{1}{10}}=\frac{4}{5}$.`),
      luyen(R`Với bài máy sản xuất ở ví dụ thứ hai, tính xác suất sản phẩm lỗi do máy $2$ làm.`, R`Xác suất bằng $\frac{5}{8}$.`, [{ expr: "1-Rational(3,8)", expect: "Rational(5,8)" }], R`Hai máy là hệ đầy đủ nên $1-\frac{3}{8}=\frac{5}{8}$.`),
    ],
    { topicId: "probability" }),
]);
