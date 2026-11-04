import type { GradeBook } from "./types.ts";
import { bai, buoc, chuong, luyen, vd } from "./types.ts";

const R = String.raw;

export const lop07: GradeBook = {
  grade: 7,
  band: "thcs",
  title: "Số hữu tỉ, tỉ lệ thuận, đa thức một biến và tam giác bằng nhau.",
  chapters: [
    chuong("huu-ti", "Số hữu tỉ và số thực", [
      bai(
        "huu-ti-bai",
        "Phép tính với số hữu tỉ",
        R`Số hữu tỉ viết được thành phân số có tử và mẫu nguyên, mẫu khác $0$. Các quy tắc dấu của số nguyên vẫn dùng khi nhân và cộng.`,
        [vd(
          R`Tính $\left(-\frac{1}{2}\right)+\frac{3}{4}$ và $\left(-\frac{2}{5}\right)\cdot\left(-\frac{5}{2}\right)$.`,
          [
            buoc(R`Tổng bằng $-\frac{2}{4}+\frac{3}{4}=\frac{1}{4}$.`, "Quy đồng mẫu $4$ rồi cộng tử. Tử $-2+3$ bằng $1$."),
            buoc(R`Tích bằng $1$.`, "Hai số âm nhân với nhau ra số dương, và các thừa số $2$ cùng $5$ được rút gọn hết."),
          ],
          R`Tổng bằng $\frac{1}{4}$ và tích bằng $1$.`,
          [
            { expr: "Rational(-1,2)+Rational(3,4)", expect: "Rational(1,4)" },
            { expr: "Rational(-2,5)*Rational(-5,2)", expect: "1" },
          ],
        )],
        [
          luyen(R`Tính $\frac{5}{6}-\frac{1}{6}$.`, R`Hiệu bằng $\frac{2}{3}$.`, [{ expr: "Rational(5,6)-Rational(1,6)", expect: "Rational(2,3)" }], "Cùng mẫu thì trừ tử. Hiệu $\\frac{4}{6}$ rút gọn thành $\\frac{2}{3}$."),
          luyen(R`Tính $\left(-\frac{3}{4}\right)\cdot\frac{2}{3}$.`, R`Tích bằng $-\frac{1}{2}$.`, [{ expr: "Rational(-3,4)*Rational(2,3)", expect: "Rational(-1,2)" }], "Hai thừa số khác dấu nên tích âm. Rút gọn $3$ và $2$ được $\\frac{1}{2}$."),
          luyen(R`Tính $\frac{7}{2}+\left(-\frac{1}{2}\right)$.`, R`Tổng bằng $3$.`, [{ expr: "Rational(7,2)+Rational(-1,2)", expect: "3" }], "Cùng mẫu, cộng tử $7+(-1)$ được $6$. Phân số $\\frac{6}{2}$ bằng $3$."),
        ],
      ),
      bai(
        "so-thuc",
        "Số thực và căn bậc hai số học",
        R`Mỗi số hữu tỉ là một số thực. Căn bậc hai số học của một số không âm là số thực không âm có bình phương bằng số đó. Căn của một số chính phương là một số nguyên.`,
        [vd(
          R`Tính $\sqrt{16}$ và $\left(\sqrt{2}\right)^2$.`,
          [
            buoc(R`Căn bậc hai số học của $16$ bằng $4$.`, "Bình phương của $4$ bằng $16$ và $4$ không âm. Đây là số hữu tỉ."),
            buoc(R`Bình phương của $\sqrt{2}$ bằng $2$.`, "Theo định nghĩa, bình phương của căn bậc hai số học trả lại đúng số trong căn."),
          ],
          R`Căn của $16$ bằng $4$ và bình phương của $\sqrt{2}$ bằng $2$.`,
          [{ expr: "sqrt(16)", expect: "4" }, { expr: "sqrt(2)**2", expect: "2" }],
        )],
        [
          luyen(R`Tính $\sqrt{36}$.`, R`Căn bậc hai số học bằng $6$.`, [{ expr: "sqrt(36)", expect: "6" }], "Bình phương của $6$ bằng $36$ và $6$ không âm, nên đúng là căn số học."),
          luyen(R`Tính $\sqrt{9}+\sqrt{4}$.`, R`Tổng bằng $5$.`, [{ expr: "sqrt(9)+sqrt(4)", expect: "5" }], "Mỗi căn của số chính phương là một số nguyên. Cộng $3$ với $2$ được $5$."),
          luyen(R`Số $-\sqrt{4}$ có phải căn bậc hai số học của $4$ không?`, R`Không. Căn số học bằng $2$, còn $-\sqrt{4}$ bằng $-2$.`, [{ expr: "-sqrt(4)", expect: "-2" }], "Căn bậc hai số học được quy ước không âm. Số âm có bình phương bằng $4$ nhưng không phải căn số học."),
        ],
      ),
    ]),
    chuong("ti-le", "Tỉ lệ thức và đại lượng tỉ lệ", [
      bai(
        "ti-le-thuc",
        "Tính chất cơ bản của tỉ lệ thức",
        R`Tỉ lệ thức $\frac{a}{b}=\frac{c}{d}$ với $b,d\neq 0$ tương đương $ad=bc$. Từ một tích đã biết và một thừa số khác $0$, tìm được thừa số còn lại.`,
        [vd(
          R`Cho $\frac{2}{3}=\frac{x}{12}$. Tìm $x$.`,
          [
            buoc(R`Tích chéo cho $3x=2\cdot 12=24$.`, "Hai tích chéo của một tỉ lệ thức bằng nhau. Đây là điều kiện cần và đủ khi các mẫu khác $0$."),
            buoc(R`Vì $3\neq 0$, ta được $x=8$.`, "Chia cả hai vế cho $3$. Thử lại: $\\frac{2}{3}$ và $\\frac{8}{12}$ cùng bằng một số sau khi rút gọn."),
          ],
          R`Giá trị $x$ bằng $8$.`,
          [{ expr: "solve(3*x-24, x)[0]", expect: "8" }],
        )],
        [
          luyen(R`Cho $\frac{4}{5}=\frac{y}{20}$. Tìm $y$.`, R`Giá trị $y$ bằng $16$.`, [{ expr: "solve(5*y-80, y)[0]", expect: "16" }], "Tích chéo cho $5y=80$. Hệ số của $y$ khác $0$ nên chia được."),
          luyen(R`Nếu $ab=24$ và $a=6$, tìm $b$.`, R`Giá trị $b$ bằng $4$.`, [{ expr: "solve(6*b-24, b)[0]", expect: "4" }], "Từ tích hai thừa số, chia cho thừa số khác $0$ để tìm thừa số còn lại."),
          luyen(R`Cho $\frac{3}{x}=\frac{1}{4}$ với $x\neq 0$. Tìm $x$.`, R`Giá trị $x$ bằng $12$.`, [{ expr: "solve(x-12, x)[0]", expect: "12" }], "Tích chéo cho $x=12$. Thử lại, cả hai vế của tỉ lệ thức bằng $\\frac{1}{4}$."),
        ],
      ),
      bai(
        "dai-luong-ti-le",
        "Đại lượng tỉ lệ thuận và tỉ lệ nghịch",
        R`Hai đại lượng tỉ lệ thuận khi thương của chúng không đổi. Hai đại lượng tỉ lệ nghịch khi tích của chúng không đổi. Biết một cặp giá trị thì tìm được cặp còn lại.`,
        [vd(
          R`Một xe đi đều $60$ kilômét trong $2$ giờ. Hỏi trong $3$ giờ xe đi bao nhiêu kilômét? Sáu người làm xong một việc trong $4$ ngày. Tám người làm việc đó trong bao nhiêu ngày, nếu năng suất mỗi người như nhau?`,
          [
            buoc(R`Quãng đường tỉ lệ thuận với thời gian, nên trong $3$ giờ xe đi $\frac{60}{2}\cdot 3=90$ kilômét.`, "Thương quãng đường chia cho thời gian là vận tốc, không đổi khi xe đi đều."),
            buoc(R`Số người tỉ lệ nghịch với số ngày, nên tám người làm trong $\frac{6\cdot 4}{8}=3$ ngày.`, "Tích số người với số ngày không đổi khi khối lượng việc và năng suất mỗi người không đổi."),
          ],
          R`Xe đi $90$ kilômét, và tám người làm trong $3$ ngày.`,
          [{ expr: "60/2*3", expect: "90" }, { expr: "6*4/8", expect: "3" }],
        )],
        [
          luyen(R`Một vòi chảy đều được $15$ lít trong $5$ phút. Trong $8$ phút vòi chảy được bao nhiêu lít?`, R`Vòi chảy được $24$ lít.`, [{ expr: "15/5*8", expect: "24" }], "Lượng nước tỉ lệ thuận với thời gian. Lưu lượng $3$ lít mỗi phút nhân với $8$ phút."),
          luyen(R`Bốn máy làm xong một lô hàng trong $6$ giờ. Ba máy cùng năng suất làm trong bao nhiêu giờ?`, R`Ba máy làm trong $8$ giờ.`, [{ expr: "4*6/3", expect: "8" }], "Số máy tỉ lệ nghịch với số giờ. Tích $4\\cdot 6$ giữ nguyên, rồi chia cho $3$."),
          luyen(R`Giá trị $y$ tỉ lệ thuận với $x$ và $y=12$ khi $x=3$. Tìm $y$ khi $x=5$.`, R`Giá trị $y$ bằng $20$.`, [{ expr: "12/3*5", expect: "20" }], "Thương $y$ chia cho $x$ bằng $4$, không đổi. Nhân $4$ với $5$ được $20$."),
        ],
      ),
    ]),
    chuong("dai-so", "Biểu thức đại số và đa thức một biến", [
      bai(
        "gia-tri-bt",
        "Giá trị của biểu thức",
        R`Thay số vào mỗi chữ rồi tính theo đúng thứ tự phép tính. Hai chữ khác nhau có thể nhận hai giá trị khác nhau.`,
        [vd(
          R`Tính giá trị của $2x+3$ khi $x=4$.`,
          [
            buoc(R`Thay $x=4$ được $2\cdot 4+3$.`, "Mỗi chỗ có chữ $x$ đều nhận cùng giá trị $4$."),
            buoc(R`Nhân trước rồi cộng: $8+3=11$.`, "Thứ tự nhân trước cộng sau vẫn giữ khi đã thay số."),
          ],
          R`Giá trị của biểu thức bằng $11$.`,
          [{ expr: "2*4+3", expect: "11" }],
        )],
        [
          luyen(R`Tính $x^2-1$ khi $x=5$.`, R`Giá trị bằng $24$.`, [{ expr: "5**2-1", expect: "24" }], "Thay đúng một giá trị vào mọi chỗ có $x$. Bình phương $5$ rồi trừ $1$."),
          luyen(R`Cộng đơn thức $3x+5x$.`, R`Tổng bằng $8x$.`, [{ expr: "3+5", expect: "8" }], "Hai đơn thức cùng biến và cùng số mũ thì cộng hệ số. Biến $x$ được giữ nguyên."),
          luyen(R`Tính $a+b$ khi $a=2$ và $b=-7$.`, R`Tổng bằng $-5$.`, [{ expr: "2+(-7)", expect: "-5" }], "Hai chữ khác nhau nhận hai giá trị khác nhau. Cộng $2$ với $-7$ được $-5$."),
        ],
      ),
      bai(
        "da-thuc",
        "Đa thức một biến",
        R`Đa thức một biến là tổng các đơn thức của cùng biến đó. Cộng đa thức thì cộng các hệ số của cùng số mũ. Nhân hai đa thức thì nhân từng số hạng rồi cộng các tích.`,
        [vd(
          R`Tính $(2x+1)+(3x-4)$ và kiểm tra khi $x=2$.`,
          [
            buoc(R`Cộng hệ số của $x$ và các hạng tử tự do: $(2+3)x+(1-4)=5x-3$.`, "Chỉ cộng các số hạng cùng bậc. Hạng tử tự do là số hạng không chứa biến."),
            buoc(R`Khi $x=2$, giá trị bằng $5\cdot 2-3=7$.`, "Thay số sau khi đã thu gọn. Cùng kết quả nếu thay vào tổng ban đầu."),
          ],
          R`Tổng là đa thức $5x-3$, và giá trị tại $x=2$ bằng $7$.`,
          [{ expr: "(2+3)*2+(1-4)", expect: "7" }],
        )],
        [
          luyen(R`Viết gọn $(x+2)(x+3)$ rồi tính tại $x=1$.`, R`Đa thức là $x^2+5x+6$, và giá trị tại $x=1$ bằng $12$.`, [{ expr: "(1+2)*(1+3)", expect: "12" }], "Nhân từng số hạng được $x^2+3x+2x+6$. Tại $x=1$, tích hai thừa số $3$ và $4$ cũng bằng $12$."),
          luyen(R`Tính $4x-x$ khi $x=6$.`, R`Giá trị bằng $18$.`, [{ expr: "(4-1)*6", expect: "18" }], "Hiệu hai đơn thức cùng bậc là đơn thức hệ số $3$. Nhân $3$ với $6$ được $18$."),
          luyen(R`Đa thức $x^2-4$ tại $x=3$ bằng bao nhiêu?`, R`Giá trị bằng $5$.`, [{ expr: "3**2-4", expect: "5" }], "Thay $3$ vào biến. Bình phương bằng $9$, trừ $4$ còn $5$."),
        ],
      ),
    ]),
    chuong("tam-giac", "Tam giác", [
      bai(
        "tong-goc",
        "Tổng ba góc trong của một tam giác",
        R`Tổng số đo ba góc trong của một tam giác bằng $180^\circ$. Biết hai góc thì góc còn lại bằng $180^\circ$ trừ tổng hai góc đó.`,
        [vd(
          R`Tam giác có hai góc $50^\circ$ và $60^\circ$. Góc thứ ba bằng bao nhiêu độ?`,
          [
            buoc(R`Tổng hai góc đã biết bằng $110^\circ$.`, "Cộng đúng hai số đo đã cho, chưa trừ khỏi $180^\\circ$."),
            buoc(R`Góc thứ ba bằng $180^\circ-110^\circ=70^\circ$.`, "Tổng ba góc trong bằng $180^\\circ$, nên góc còn lại là phần bù của tổng hai góc kia."),
          ],
          R`Góc thứ ba bằng $70^\circ$.`,
          [{ expr: "180-50-60", expect: "70" }],
        )],
        [
          luyen(R`Tam giác đều có mỗi góc bằng bao nhiêu độ?`, R`Mỗi góc bằng $60^\circ$.`, [{ expr: "180/3", expect: "60" }], "Ba góc bằng nhau và có tổng $180^\\circ$. Chia đều cho ba góc."),
          luyen(R`Tam giác vuông có một góc nhọn $35^\circ$. Góc nhọn còn lại bằng bao nhiêu độ?`, R`Góc còn lại bằng $55^\circ$.`, [{ expr: "90-35", expect: "55" }], "Hai góc nhọn của tam giác vuông có tổng $90^\\circ$. Góc vuông đã chiếm $90^\\circ$ trong tổng $180^\\circ$."),
          luyen(R`Tam giác có các góc $40^\circ$, $60^\circ$ và $80^\circ$. Tổng ba góc bằng bao nhiêu độ?`, R`Tổng bằng $180^\circ$.`, [{ expr: "40+60+80", expect: "180" }], "Cộng đủ ba số đo. Kết quả khớp định lí tổng ba góc trong."),
        ],
        { figure: "triangle" },
      ),
      bai(
        "bang-nhau",
        "Tam giác bằng nhau",
        R`Hai tam giác bằng nhau khi các cạnh và các góc tương ứng bằng nhau. Trường hợp cạnh-cạnh-cạnh: nếu ba cạnh của tam giác này lần lượt bằng ba cạnh của tam giác kia thì hai tam giác bằng nhau.`,
        [vd(
          R`Tam giác $ABC$ có các cạnh $5$, $6$ và $7$. Tam giác $DEF$ có các cạnh $5$, $6$ và $7$. Hai tam giác có bằng nhau không, và chu vi mỗi tam giác bằng bao nhiêu?`,
          [
            buoc(R`Ba cặp cạnh tương ứng bằng nhau, nên hai tam giác bằng nhau theo trường hợp cạnh-cạnh-cạnh.`, "Đủ ba cạnh, không cần thêm một góc. Các góc tương ứng khi đó cũng bằng nhau."),
            buoc(R`Chu vi mỗi tam giác bằng $5+6+7=18$.`, "Hai tam giác bằng nhau có chu vi bằng nhau vì các cạnh tương ứng bằng nhau."),
          ],
          R`Hai tam giác bằng nhau và mỗi tam giác có chu vi $18$.`,
          [{ expr: "5+6+7", expect: "18" }],
        )],
        [
          luyen(R`Tam giác bằng nhau với tam giác có các cạnh $5$, $6$ và $7$. Chu vi của tam giác kia bằng bao nhiêu?`, R`Chu vi bằng $18$.`, [{ expr: "5+6+7", expect: "18" }], "Tam giác bằng nhau thì các cạnh tương ứng bằng nhau, nên chu vi bằng tổng đúng ba cạnh đã cho."),
          luyen(R`Tam giác có các cạnh $3$, $4$ và $5$. Chu vi bằng bao nhiêu?`, R`Chu vi bằng $12$.`, [{ expr: "3+4+5", expect: "12" }], "Chu vi là tổng ba cạnh. Bộ ba này cũng là một trường hợp dùng được cho cạnh-cạnh-cạnh khi tam giác kia có cùng ba cạnh."),
          luyen(R`Trường hợp cạnh-góc-cạnh dùng hai cạnh và góc xen giữa. Nếu hai cạnh là $5$ và $8$, tổng hai cạnh đó bằng bao nhiêu?`, R`Tổng bằng $13$.`, [{ expr: "5+8", expect: "13" }], "Góc dùng trong trường hợp này phải là góc nằm giữa đúng hai cạnh đã lấy. Tổng hai cạnh là số liệu kèm theo, chưa phải cạnh thứ ba."),
        ],
        { figure: "triangle" },
      ),
      bai(
        "can-deu",
        "Tam giác cân và tam giác đều",
        R`Tam giác cân có hai cạnh bên bằng nhau và hai góc đáy bằng nhau. Tam giác đều có ba cạnh bằng nhau và mỗi góc bằng $60^\circ$.`,
        [vd(
          R`Tam giác cân có góc ở đỉnh bằng $40^\circ$. Mỗi góc đáy bằng bao nhiêu độ?`,
          [
            buoc(R`Hai góc đáy cộng lại bằng $180^\circ-40^\circ=140^\circ$.`, "Tổng ba góc trong bằng $180^\\circ$. Góc đỉnh đã biết nên phần còn lại thuộc hai góc đáy."),
            buoc(R`Hai góc đáy bằng nhau, nên mỗi góc bằng $70^\circ$.`, "Tam giác cân có hai góc đáy bằng nhau. Chia $140^\\circ$ cho $2$ ra $70^\\circ$."),
          ],
          R`Mỗi góc đáy bằng $70^\circ$.`,
          [{ expr: "(180-40)/2", expect: "70" }],
        )],
        [
          luyen(R`Tam giác đều cạnh $6$ có chu vi bằng bao nhiêu?`, R`Chu vi bằng $18$.`, [{ expr: "6*3", expect: "18" }], "Ba cạnh của tam giác đều bằng nhau. Nhân độ dài một cạnh với $3$."),
          luyen(R`Tam giác cân có hai góc đáy, mỗi góc $50^\circ$. Góc ở đỉnh bằng bao nhiêu độ?`, R`Góc ở đỉnh bằng $80^\circ$.`, [{ expr: "180-50-50", expect: "80" }], "Hai góc đáy bằng nhau. Phần còn lại của tổng $180^\\circ$ là góc đỉnh."),
          luyen(R`Góc ngoài kề bù với một góc trong $50^\circ$ bằng bao nhiêu độ?`, R`Góc kề bù bằng $130^\circ$.`, [{ expr: "180-50", expect: "130" }], "Hai góc kề bù có tổng $180^\\circ$. Biết một góc thì góc kia là phần bù đến $180^\\circ$."),
        ],
        { figure: "triangle" },
      ),
    ]),
  ],
};
