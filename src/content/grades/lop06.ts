import type { GradeBook } from "./types.ts";
import { bai, buoc, chuong, luyen, vd } from "./types.ts";

const R = String.raw;

export const lop06: GradeBook = {
  grade: 6,
  band: "thcs",
  title: "Số tự nhiên, số nguyên, phân số, số thập phân và hình phẳng.",
  chapters: [
    chuong("so-tu-nhien", "Số tự nhiên", [
      bai(
        "thu-tu-tinh",
        "Thứ tự thực hiện phép tính",
        R`Trong một dãy tính, làm trong ngoặc trước, rồi nhân và chia, sau đó mới cộng và trừ. Các phép cùng mức làm từ trái sang phải.`,
        [vd(
          R`Tính $2+3\cdot 4$.`,
          [
            buoc(R`Nhân trước: $3\cdot 4=12$.`, "Phép nhân đứng trước phép cộng khi không có ngoặc."),
            buoc(R`Cộng sau: $2+12=14$.`, "Chỉ cộng sau khi đã có tích. Làm $2+3$ trước sẽ ra một kết quả khác."),
          ],
          R`Giá trị của biểu thức bằng $14$.`,
          [{ expr: "2+3*4", expect: "14" }],
        )],
        [
          luyen(R`Tính $(2+3)\cdot 4$.`, R`Giá trị bằng $20$.`, [{ expr: "(2+3)*4", expect: "20" }]),
          luyen(R`Tính $20-6\div 2$.`, R`Giá trị bằng $17$.`, [{ expr: "20-6/2", expect: "17" }]),
          luyen(R`Tính $8\div 2+1$.`, R`Giá trị bằng $5$.`, [{ expr: "8/2+1", expect: "5" }]),
        ],
      ),
      bai(
        "luy-thua",
        "Lũy thừa với số mũ tự nhiên",
        R`Với số mũ nguyên dương, $a^n$ là tích của $n$ thừa số bằng $a$. Riêng $a^1=a$. Số mũ cho biết số lần nhân, không phải số đem nhân thêm vào $a$.`,
        [vd(
          R`Tính $2^5$.`,
          [
            buoc(R`Năm thừa số $2$ nhân với nhau: $2\cdot 2\cdot 2\cdot 2\cdot 2$.`, "Số mũ $5$ đếm số thừa số, không phải cộng thêm $5$."),
            buoc(R`Tích bằng $32$.`, "Nhân lần lượt được $4$, $8$, $16$, rồi $32$."),
          ],
          R`Giá trị bằng $32$.`,
          [{ expr: "2**5", expect: "32" }],
        )],
        [
          luyen(R`Tính $3^3$.`, R`Giá trị bằng $27$.`, [{ expr: "3**3", expect: "27" }]),
          luyen(R`Tính $10^2$.`, R`Giá trị bằng $100$.`, [{ expr: "10**2", expect: "100" }]),
          luyen(R`Tính $5^1$.`, R`Giá trị bằng $5$.`, [{ expr: "5**1", expect: "5" }]),
        ],
      ),
    ]),
    chuong("chia-het", "Tính chia hết", [
      bai(
        "ucln",
        "Ước chung lớn nhất và bội chung nhỏ nhất",
        R`Ước chung lớn nhất của hai số nguyên dương là số nguyên dương lớn nhất chia hết cả hai. Bội chung nhỏ nhất là số nguyên dương nhỏ nhất mà cả hai cùng chia hết.`,
        [vd(
          R`Tìm ước chung lớn nhất và bội chung nhỏ nhất của $12$ và $18$.`,
          [
            buoc(R`Ước chung lớn nhất bằng $6$.`, "Số $6$ chia hết $12$ và $18$, và không có ước chung nào lớn hơn."),
            buoc(R`Bội chung nhỏ nhất bằng $36$.`, "Tích hai số chia cho ước chung lớn nhất cũng ra $36$. Đây là bội chung dương nhỏ nhất."),
          ],
          R`Ước chung lớn nhất bằng $6$ và bội chung nhỏ nhất bằng $36$.`,
          [
            { expr: "gcd(12,18)", expect: "6" },
            { expr: "lcm(12,18)", expect: "36" },
          ],
        )],
        [
          luyen(R`Tìm ước chung lớn nhất của $8$ và $12$.`, R`Ước chung lớn nhất bằng $4$.`, [{ expr: "gcd(8,12)", expect: "4" }]),
          luyen(R`Tìm bội chung nhỏ nhất của $4$ và $6$.`, R`Bội chung nhỏ nhất bằng $12$.`, [{ expr: "lcm(4,6)", expect: "12" }]),
          luyen(R`Số $135$ có chia hết cho $9$ không? Hãy dùng tổng các chữ số.`, R`Có, vì tổng chữ số bằng $9$ và $135=9\cdot 15$.`, [{ expr: "1+3+5", expect: "9" }]),
        ],
      ),
    ]),
    chuong("so-nguyen", "Số nguyên", [
      bai(
        "cong-tru-nguyen",
        "Cộng và nhân số nguyên",
        R`Cộng một số âm là trừ trị tuyệt đối của số đó. Tích hai số cùng dấu thì dương, khác dấu thì âm.`,
        [vd(
          R`Tính $(-3)+5$ và $(-4)\cdot(-3)$.`,
          [
            buoc(R`Tổng $(-3)+5$ bằng $2$.`, "Từ $-3$ đi thêm $5$ đơn vị về phía dương thì tới $2$."),
            buoc(R`Tích $(-4)\cdot(-3)$ bằng $12$.`, "Hai thừa số cùng dấu âm, nên tích dương và bằng tích các trị tuyệt đối."),
          ],
          R`Tổng bằng $2$ và tích bằng $12$.`,
          [
            { expr: "-3+5", expect: "2" },
            { expr: "(-4)*(-3)", expect: "12" },
          ],
        )],
        [
          luyen(R`Tính $7+(-10)$.`, R`Tổng bằng $-3$.`, [{ expr: "7+(-10)", expect: "-3" }]),
          luyen(R`Tính $(-6)\cdot 2$.`, R`Tích bằng $-12$.`, [{ expr: "(-6)*2", expect: "-12" }]),
          luyen(R`Tính $(-8)-(-3)$.`, R`Hiệu bằng $-5$.`, [{ expr: "-8-(-3)", expect: "-5" }]),
        ],
      ),
    ]),
    chuong("phan-so", "Phân số", [
      bai(
        "cong-nhan-phan",
        "Cộng và nhân phân số",
        R`Cộng hai phân số khác mẫu thì quy đồng mẫu. Nhân phân số thì nhân tử với tử và mẫu với mẫu, rồi rút gọn nếu có ước chung.`,
        [vd(
          R`Tính $\frac{1}{2}+\frac{1}{3}$ và $\frac{2}{3}\cdot\frac{3}{4}$.`,
          [
            buoc(R`Tổng bằng $\frac{3}{6}+\frac{2}{6}=\frac{5}{6}$.`, "Mẫu chung của $2$ và $3$ là $6$. Cộng tử sau khi mẫu đã bằng nhau."),
            buoc(R`Tích bằng $\frac{2\cdot 3}{3\cdot 4}=\frac{1}{2}$.`, "Nhân tử với tử, mẫu với mẫu, rồi rút gọn thừa số $2$ và $3$."),
          ],
          R`Tổng bằng $\frac{5}{6}$ và tích bằng $\frac{1}{2}$.`,
          [
            { expr: "Rational(1,2)+Rational(1,3)", expect: "Rational(5,6)" },
            { expr: "Rational(2,3)*Rational(3,4)", expect: "Rational(1,2)" },
          ],
        )],
        [
          luyen(R`Tính $\frac{1}{4}+\frac{1}{4}$.`, R`Tổng bằng $\frac{1}{2}$.`, [{ expr: "Rational(1,4)+Rational(1,4)", expect: "Rational(1,2)" }]),
          luyen(R`Tính $\frac{3}{5}\cdot\frac{1}{3}$.`, R`Tích bằng $\frac{1}{5}$.`, [{ expr: "Rational(3,5)*Rational(1,3)", expect: "Rational(1,5)" }]),
          luyen(R`Rút gọn $\frac{6}{8}$.`, R`Phân số tối giản là $\frac{3}{4}$.`, [{ expr: "Rational(6,8)", expect: "Rational(3,4)" }]),
        ],
      ),
    ]),
    chuong("thap-phan", "Số thập phân và phần trăm", [
      bai(
        "thap-phan-bai",
        "Nhân số thập phân và tính phần trăm",
        R`Số thập phân là một phân số mẫu là lũy thừa của $10$. Phần trăm là phân số có mẫu $100$: $p\%$ của một số là số đó nhân với $\frac{p}{100}$.`,
        [vd(
          R`Tính $1{,}5\cdot 2$ và $15\%$ của $200$.`,
          [
            buoc(R`Ta có $1{,}5=\frac{3}{2}$, nên tích với $2$ bằng $3$.`, "Đổi số thập phân thành phân số trước khi nhân thì hết phần lẻ."),
            buoc(R`Lấy $15\%$ của $200$ được $200\cdot\frac{15}{100}=30$.`, "Phần trăm là một phân số mẫu $100$. Kết quả $30$ là $15$ phần trong $100$ phần của $200$."),
          ],
          R`Tích bằng $3$ và $15\%$ của $200$ bằng $30$.`,
          [
            { expr: "Rational(3,2)*2", expect: "3" },
            { expr: "200*Rational(15,100)", expect: "30" },
          ],
        )],
        [
          luyen(R`Tính $2{,}5+1{,}5$.`, R`Tổng bằng $4$.`, [{ expr: "Rational(5,2)+Rational(3,2)", expect: "4" }]),
          luyen(R`Tính $10\%$ của $80$.`, R`Kết quả bằng $8$.`, [{ expr: "80*Rational(10,100)", expect: "8" }]),
          luyen(R`Đổi $\frac{1}{4}$ thành số thập phân.`, R`Phân số bằng $0{,}25$.`, [{ expr: "Rational(1,4)", expect: "Rational(25,100)" }]),
        ],
      ),
    ]),
    chuong("hinh", "Hình phẳng", [
      bai(
        "tam-giac-lop6",
        "Tổng các góc của một tam giác",
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
          luyen(R`Tam giác đều có mỗi góc bằng bao nhiêu độ?`, R`Mỗi góc bằng $60^\circ$.`, [{ expr: "180/3", expect: "60" }]),
          luyen(R`Tam giác vuông có một góc nhọn $35^\circ$. Góc nhọn còn lại bằng bao nhiêu độ?`, R`Góc còn lại bằng $55^\circ$.`, [{ expr: "90-35", expect: "55" }]),
          luyen(R`Diện tích hình chữ nhật dài $8$ và rộng $3$ bằng bao nhiêu?`, R`Diện tích bằng $24$.`, [{ expr: "8*3", expect: "24" }]),
        ],
        { figure: "triangle" },
      ),
    ]),
    chuong("thong-ke", "Thống kê", [
      bai(
        "tb-lop6",
        "Trung bình cộng của một mẫu",
        R`Trung bình cộng là tổng các số liệu chia cho số số liệu. Mỗi số liệu được cộng một lần, kể cả khi có số lặp.`,
        [vd(
          R`Điểm bốn bài là $6, 7, 7, 8$. Trung bình bằng bao nhiêu?`,
          [
            buoc(R`Tổng bằng $6+7+7+8=28$.`, "Có hai bài điểm $7$, cả hai đều được cộng."),
            buoc(R`Trung bình bằng $\frac{28}{4}=7$.`, "Mẫu số là bốn bài, không phải số điểm khác nhau."),
          ],
          R`Trung bình bằng $7$ điểm.`,
          [{ expr: "Rational(6+7+7+8,4)", expect: "7" }],
        )],
        [
          luyen(R`Trung bình của $4, 6, 8$ bằng bao nhiêu?`, R`Trung bình bằng $6$.`, [{ expr: "Rational(4+6+8,3)", expect: "6" }]),
          luyen(R`Ba số có tổng $15$. Trung bình bằng bao nhiêu?`, R`Trung bình bằng $5$.`, [{ expr: "Rational(15,3)", expect: "5" }]),
          luyen(R`Một cột tần số ghi $2$ bạn điểm $5$ và $3$ bạn điểm $8$. Tổng điểm bằng bao nhiêu?`, R`Tổng điểm bằng $34$.`, [{ expr: "2*5+3*8", expect: "34" }]),
        ],
        { figure: "bar" },
      ),
    ]),
  ],
};
