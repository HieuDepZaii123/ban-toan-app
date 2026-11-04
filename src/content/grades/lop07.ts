import type { GradeBook } from "./types.ts";
import { bai, buoc, chuong, luyen, vd } from "./types.ts";

const R = String.raw;

export const lop07: GradeBook = {
  grade: 7,
  band: "thcs",
  title: "Số hữu tỉ, tỉ lệ thức, biểu thức đại số và tam giác.",
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
          luyen(R`Tính $\frac{5}{6}-\frac{1}{6}$.`, R`Hiệu bằng $\frac{2}{3}$.`, [{ expr: "Rational(5,6)-Rational(1,6)", expect: "Rational(2,3)" }]),
          luyen(R`Tính $\left(-\frac{3}{4}\right)\cdot\frac{2}{3}$.`, R`Tích bằng $-\frac{1}{2}$.`, [{ expr: "Rational(-3,4)*Rational(2,3)", expect: "Rational(-1,2)" }]),
          luyen(R`Số $\sqrt{16}$ bằng bao nhiêu?`, R`Căn bậc hai số học bằng $4$.`, [{ expr: "sqrt(16)", expect: "4" }]),
        ],
      ),
    ]),
    chuong("ti-le", "Tỉ lệ thức", [
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
          [{ expr: "2*12/3", expect: "8" }],
        )],
        [
          luyen(R`Cho $\frac{4}{5}=\frac{y}{20}$. Tìm $y$.`, R`Giá trị $y$ bằng $16$.`, [{ expr: "4*20/5", expect: "16" }]),
          luyen(R`Một xe đi $60$ kilômét trong $2$ giờ, cùng vận tốc. Trong $3$ giờ xe đi bao nhiêu kilômét?`, R`Xe đi $90$ kilômét.`, [{ expr: "60/2*3", expect: "90" }]),
          luyen(R`Nếu $ab=24$ và $a=6$, tìm $b$.`, R`Giá trị $b$ bằng $4$.`, [{ expr: "24/6", expect: "4" }]),
        ],
      ),
    ]),
    chuong("dai-so", "Biểu thức đại số", [
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
          luyen(R`Tính $x^2-1$ khi $x=5$.`, R`Giá trị bằng $24$.`, [{ expr: "5**2-1", expect: "24" }]),
          luyen(R`Cộng đơn thức $3x+5x$.`, R`Tổng bằng $8x$.`, [{ expr: "3+5", expect: "8" }]),
          luyen(R`Tính $a+b$ khi $a=2$ và $b=-7$.`, R`Tổng bằng $-5$.`, [{ expr: "2+(-7)", expect: "-5" }]),
        ],
      ),
    ]),
    chuong("tam-giac", "Tam giác", [
      bai(
        "tong-goc",
        "Tổng ba góc trong và tam giác cân",
        R`Tổng ba góc trong của một tam giác bằng $180^\circ$. Tam giác cân có hai góc đáy bằng nhau. Tam giác đều có ba cạnh bằng nhau và mỗi góc bằng $60^\circ$.`,
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
          luyen(R`Tam giác có các góc $40^\circ$, $60^\circ$ và $80^\circ$. Tổng ba góc bằng bao nhiêu độ?`, R`Tổng bằng $180^\circ$.`, [{ expr: "40+60+80", expect: "180" }]),
          luyen(R`Tam giác đều cạnh $6$ có chu vi bằng bao nhiêu?`, R`Chu vi bằng $18$.`, [{ expr: "6*3", expect: "18" }]),
          luyen(R`Góc ngoài kề với một góc trong $50^\circ$ của tam giác, nếu hai góc này kề bù, bằng bao nhiêu độ?`, R`Góc kề bù bằng $130^\circ$.`, [{ expr: "180-50", expect: "130" }]),
        ],
        { figure: "triangle" },
      ),
    ]),
    chuong("tan-so", "Thống kê", [
      bai(
        "tan-so",
        "Tần số và tần suất",
        R`Tần số là số lần một giá trị xuất hiện. Tần suất bằng tần số chia cho cỡ mẫu. Tổng các tần số bằng cỡ mẫu.`,
        [vd(
          R`Một mẫu $20$ bạn có $4$ bạn chọn môn A. Tần suất chọn môn A bằng bao nhiêu?`,
          [
            buoc(R`Tần số là $4$ và cỡ mẫu là $20$.`, "Tần số đếm số bạn chọn môn A. Cỡ mẫu đếm toàn bộ bạn được hỏi."),
            buoc(R`Tần suất bằng $\frac{4}{20}=\frac{1}{5}$.`, "Chia tần số cho cỡ mẫu rồi rút gọn. Phân số $\\frac{1}{5}$ là tần suất."),
          ],
          R`Tần suất bằng $\frac{1}{5}$.`,
          [{ expr: "Rational(4,20)", expect: "Rational(1,5)" }],
        )],
        [
          luyen(R`Mẫu $10$ số có $3$ số bằng $5$. Tần suất giá trị $5$ bằng bao nhiêu?`, R`Tần suất bằng $\frac{3}{10}$.`, [{ expr: "Rational(3,10)", expect: "3/10" }]),
          luyen(R`Ba nhóm có tần số $2$, $5$ và $3$. Cỡ mẫu bằng bao nhiêu?`, R`Cỡ mẫu bằng $10$.`, [{ expr: "2+5+3", expect: "10" }]),
          luyen(R`Trung bình của các mốc $1, 2, 3$ với tần số $1, 1, 2$ bằng bao nhiêu?`, R`Trung bình bằng $\frac{9}{4}$.`, [{ expr: "Rational(1*1+2*1+3*2,1+1+2)", expect: "Rational(9,4)" }]),
        ],
        { figure: "bar" },
      ),
    ]),
  ],
};
