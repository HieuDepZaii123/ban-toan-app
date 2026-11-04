import type { GradeBook } from "./types.ts";
import { bai, buoc, chuong, luyen, vd } from "./types.ts";

const R = String.raw;

export const lop06: GradeBook = {
  grade: 6,
  band: "thcs",
  title: "Số tự nhiên, số nguyên tố, số nguyên, phân số và hình học trực quan.",
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
          luyen(R`Tính $(2+3)\cdot 4$.`, R`Giá trị bằng $20$.`, [{ expr: "(2+3)*4", expect: "20" }], "Ngoặc bắt buộc cộng hai số trước. Tổng $5$ nhân với $4$ bằng $20$."),
          luyen(R`Tính $20-6\div 2$.`, R`Giá trị bằng $17$.`, [{ expr: "20-6/2", expect: "17" }], "Phép chia đứng trước phép trừ. Thương $3$ được trừ khỏi $20$."),
          luyen(R`Tính $8\div 2+1$.`, R`Giá trị bằng $5$.`, [{ expr: "8/2+1", expect: "5" }], "Chia trước được $4$, rồi cộng $1$. Không cộng $2$ với $1$ trước khi chia."),
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
          luyen(R`Tính $3^3$.`, R`Giá trị bằng $27$.`, [{ expr: "3**3", expect: "27" }], "Ba thừa số $3$ nhân với nhau. Tích $3\\cdot 3\\cdot 3$ bằng $27$."),
          luyen(R`Tính $10^2$.`, R`Giá trị bằng $100$.`, [{ expr: "10**2", expect: "100" }], "Bình phương của $10$ là tích của hai thừa số $10$."),
          luyen(R`Tính $5^1$.`, R`Giá trị bằng $5$.`, [{ expr: "5**1", expect: "5" }], "Số mũ $1$ nghĩa là còn đúng một thừa số, bằng chính cơ số."),
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
          luyen(R`Tìm ước chung lớn nhất của $8$ và $12$.`, R`Ước chung lớn nhất bằng $4$.`, [{ expr: "gcd(8,12)", expect: "4" }], "Số $4$ chia hết cả $8$ và $12$, và không có ước chung dương nào lớn hơn."),
          luyen(R`Tìm bội chung nhỏ nhất của $4$ và $6$.`, R`Bội chung nhỏ nhất bằng $12$.`, [{ expr: "lcm(4,6)", expect: "12" }], "Số $12$ là bội chung dương nhỏ nhất của $4$ và của $6$."),
          luyen(R`Số $135$ có chia hết cho $9$ không? Hãy dùng tổng các chữ số.`, R`Có, vì tổng chữ số bằng $9$ và $135=9\cdot 15$.`, [{ expr: "1+3+5", expect: "9" }], "Một số chia hết cho $9$ khi tổng các chữ số của nó chia hết cho $9$."),
        ],
      ),
      bai(
        "so-nguyen-to",
        "Số nguyên tố và phân tích thừa số nguyên tố",
        R`Số nguyên tố là số nguyên lớn hơn $1$, chỉ có hai ước dương là $1$ và chính nó. Hợp số có ước khác hai ước đó. Mọi hợp số viết được thành tích các số nguyên tố.`,
        [vd(
          R`Số $13$ là số nguyên tố hay hợp số? Phân tích $12$ thành tích các số nguyên tố.`,
          [
            buoc(R`Số $13$ là số nguyên tố.`, "Số $13$ lớn hơn $1$ và không chia hết cho $2$, $3$ hay $5$, tức không có ước dương nào khác $1$ và $13$."),
            buoc(R`Ta có $12=2^2\cdot 3$.`, "Tách $12=2\\cdot 6$, rồi $6=2\\cdot 3$. Các thừa số $2$ và $3$ đều là số nguyên tố."),
          ],
          R`Số $13$ là số nguyên tố và $12=2^2\cdot 3$.`,
          [{ expr: "isprime(13)", expect: "True" }, { expr: "2**2*3", expect: "12" }],
        )],
        [
          luyen(R`Số $15$ có phải số nguyên tố không?`, R`Không. Số $15$ là hợp số vì $15=3\cdot 5$.`, [{ expr: "isprime(15)", expect: "False" }], "Số $15$ có ước $3$ khác $1$ và khác chính nó, nên không phải số nguyên tố."),
          luyen(R`Số $2$ có phải số nguyên tố không?`, R`Có. Số $2$ là số nguyên tố chẵn duy nhất.`, [{ expr: "isprime(2)", expect: "True" }], "Số $2$ lớn hơn $1$ và chỉ có hai ước dương là $1$ và $2$."),
          luyen(R`Kiểm tra phân tích $18=2\cdot 3^2$.`, R`Phân tích đúng, vì $2\cdot 9=18$.`, [{ expr: "2*3**2", expect: "18" }], "Mỗi thừa số đều là số nguyên tố. Bình phương của $3$ đếm hai lần thừa số $3$."),
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
          luyen(R`Tính $7+(-10)$.`, R`Tổng bằng $-3$.`, [{ expr: "7+(-10)", expect: "-3" }], "Cộng một số âm là trừ trị tuyệt đối của số đó khỏi $7$."),
          luyen(R`Tính $(-6)\cdot 2$.`, R`Tích bằng $-12$.`, [{ expr: "(-6)*2", expect: "-12" }], "Hai thừa số khác dấu, nên tích âm và bằng $6\\cdot 2$."),
          luyen(R`Tính $(-8)-(-3)$.`, R`Hiệu bằng $-5$.`, [{ expr: "-8-(-3)", expect: "-5" }], "Trừ một số âm là cộng trị tuyệt đối của số đó. Từ $-8$ cộng $3$ được $-5$."),
        ],
      ),
      bai(
        "tri-tuyet-doi",
        "Trị tuyệt đối và so sánh số nguyên",
        R`Trị tuyệt đối của một số nguyên là khoảng cách từ số đó đến $0$ trên trục số. Số nào nằm bên phải thì lớn hơn.`,
        [vd(
          R`Tính $|-7|$ và so sánh $-7$ với $-2$.`,
          [
            buoc(R`Trị tuyệt đối $|-7|$ bằng $7$.`, "Khoảng cách từ $-7$ đến $0$ bằng $7$ đơn vị. Trị tuyệt đối không âm."),
            buoc(R`Ta có $-7<-2$, vì $-7$ nằm bên trái $-2$.`, "Trên trục số, số bên trái nhỏ hơn số bên phải."),
          ],
          R`Trị tuyệt đối bằng $7$ và $-7<-2$.`,
          [{ expr: "Abs(-7)", expect: "7" }],
        )],
        [
          luyen(R`Tính $|4|$ và $|-4|$.`, R`Cả hai trị tuyệt đối đều bằng $4$.`, [{ expr: "Abs(-4)", expect: "4" }], "Hai số đối nhau có cùng khoảng cách đến $0$, nên cùng trị tuyệt đối."),
          luyen(R`Số nào lớn hơn, $-10$ hay $-1$?`, R`Số $-1$ lớn hơn số $-10$.`, [{ expr: "Abs(-10)-Abs(-1)", expect: "9" }], "Số $-1$ nằm bên phải $-10$ trên trục số. Hiệu hai trị tuyệt đối cho khoảng cách giữa chúng."),
          luyen(R`Tính $|-3|+|2|$.`, R`Tổng bằng $5$.`, [{ expr: "Abs(-3)+Abs(2)", expect: "5" }], "Mỗi trị tuyệt đối là số không âm. Cộng $3$ với $2$ được $5$."),
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
          luyen(R`Tính $\frac{1}{4}+\frac{1}{4}$.`, R`Tổng bằng $\frac{1}{2}$.`, [{ expr: "Rational(1,4)+Rational(1,4)", expect: "Rational(1,2)" }], "Hai phân số cùng mẫu. Cộng tử được $2$, rồi rút gọn $\\frac{2}{4}$."),
          luyen(R`Tính $\frac{3}{5}\cdot\frac{1}{3}$.`, R`Tích bằng $\frac{1}{5}$.`, [{ expr: "Rational(3,5)*Rational(1,3)", expect: "Rational(1,5)" }], "Nhân tử với tử và mẫu với mẫu, rồi rút gọn thừa số $3$."),
          luyen(R`Rút gọn $\frac{6}{8}$.`, R`Phân số tối giản là $\frac{3}{4}$.`, [{ expr: "Rational(6,8)", expect: "Rational(3,4)" }], "Ước chung lớn nhất của tử và mẫu là $2$. Chia cả tử và mẫu cho $2$."),
        ],
      ),
      bai(
        "so-sanh-phan",
        "So sánh hai phân số",
        R`Hai phân số dương cùng mẫu thì phân số nào có tử lớn hơn thì lớn hơn. Khác mẫu thì quy đồng rồi so sánh tử.`,
        [vd(
          R`So sánh $\frac{3}{7}$ và $\frac{5}{7}$.`,
          [
            buoc(R`Hai phân số có cùng mẫu $7$.`, "Khi mẫu bằng nhau, chỉ cần nhìn tử."),
            buoc(R`Vì $3<5$, ta có $\frac{3}{7}<\frac{5}{7}$.`, "Cùng một mẫu dương, tử nhỏ hơn cho phân số nhỏ hơn."),
          ],
          R`Phân số $\frac{3}{7}$ bé hơn phân số $\frac{5}{7}$.`,
          [{ expr: "Rational(5,7)-Rational(3,7)", expect: "Rational(2,7)" }],
        )],
        [
          luyen(R`So sánh $\frac{1}{2}$ và $\frac{1}{3}$.`, R`Phân số $\frac{1}{2}$ lớn hơn phân số $\frac{1}{3}$.`, [{ expr: "Rational(1,2)-Rational(1,3)", expect: "Rational(1,6)" }], "Quy đồng mẫu $6$ được $\\frac{3}{6}$ và $\\frac{2}{6}$. Tử $3$ lớn hơn tử $2$."),
          luyen(R`Tính $\frac{2}{5}+\frac{1}{5}$.`, R`Tổng bằng $\frac{3}{5}$.`, [{ expr: "Rational(2,5)+Rational(1,5)", expect: "Rational(3,5)" }], "Cùng mẫu thì cộng tử và giữ mẫu. Tử $2+1$ bằng $3$."),
          luyen(R`Phân số $\frac{4}{6}$ đã tối giản chưa?`, R`Chưa. Dạng tối giản là $\frac{2}{3}$.`, [{ expr: "Rational(4,6)", expect: "Rational(2,3)" }], "Tử và mẫu còn ước chung $2$. Chia cả hai cho $2$ được phân số tối giản."),
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
          luyen(R`Tính $2{,}5+1{,}5$.`, R`Tổng bằng $4$.`, [{ expr: "Rational(5,2)+Rational(3,2)", expect: "4" }], "Đổi hai số thập phân thành phân số cùng mẫu rồi cộng. Tổng là số nguyên $4$."),
          luyen(R`Tính $10\%$ của $80$.`, R`Kết quả bằng $8$.`, [{ expr: "80*Rational(10,100)", expect: "8" }], "Mười phần trăm là một phần mười. Một phần mười của $80$ bằng $8$."),
          luyen(R`Đổi $\frac{1}{4}$ thành số thập phân.`, R`Phân số bằng $0{,}25$.`, [{ expr: "Rational(1,4)", expect: "Rational(25,100)" }], "Chia tử cho mẫu được $0{,}25$, tức $25$ phần trăm của một đơn vị."),
        ],
      ),
      bai(
        "so-sanh-tp",
        "So sánh số thập phân",
        R`So sánh phần nguyên trước. Nếu phần nguyên bằng nhau thì so sánh lần lượt hàng phần mười, hàng phần trăm.`,
        [vd(
          R`So sánh $3{,}4$ và $3{,}25$.`,
          [
            buoc(R`Hai số có cùng phần nguyên $3$.`, "Phần nguyên bằng nhau thì phải xét chữ số sau dấu phẩy."),
            buoc(R`Hàng phần mười của $3{,}4$ là $4$, của $3{,}25$ là $2$, nên $3{,}4>3{,}25$.`, "Chữ số phần mười lớn hơn thì số thập phân lớn hơn, dù số kia có thêm hàng phần trăm."),
          ],
          R`Số $3{,}4$ lớn hơn số $3{,}25$.`,
          [{ expr: "Rational(34,10)-Rational(325,100)", expect: "Rational(15,100)" }],
        )],
        [
          luyen(R`Số nào lớn hơn, $0{,}8$ hay $0{,}75$?`, R`Số $0{,}8$ lớn hơn.`, [{ expr: "Rational(8,10)-Rational(75,100)", expect: "Rational(5,100)" }], "Hàng phần mười của $0{,}8$ là $8$, lớn hơn hàng phần mười $7$ của $0{,}75$."),
          luyen(R`Tính $0{,}5+0{,}5$.`, R`Tổng bằng $1$.`, [{ expr: "Rational(1,2)+Rational(1,2)", expect: "1" }], "Hai lần một nửa cộng lại đủ một đơn vị."),
          luyen(R`Tính $20\%$ của $50$.`, R`Kết quả bằng $10$.`, [{ expr: "50*Rational(20,100)", expect: "10" }], "Hai mươi phần trăm là một phần năm. Một phần năm của $50$ bằng $10$."),
        ],
      ),
    ]),
    chuong("hinh", "Hình học trực quan", [
      bai(
        "truc-quan",
        "Điểm, đường thẳng, đoạn thẳng và tia",
        R`Hình học trực quan nhận biết điểm, đường thẳng, đoạn thẳng và tia. Qua hai điểm phân biệt có đúng một đường thẳng. Một đoạn thẳng có hai đầu mút. Một tia có một gốc.`,
        [vd(
          R`Ba điểm không thẳng hàng xác định bao nhiêu đoạn thẳng?`,
          [
            buoc(R`Mỗi cặp điểm xác định một đoạn thẳng.`, "Hai điểm phân biệt cho đúng một đoạn nối chúng."),
            buoc(R`Ba điểm cho ba cặp, nên có $3$ đoạn thẳng.`, "Số cách chọn hai điểm trong ba điểm bằng $3$. Mỗi cách là một cạnh của tam giác."),
          ],
          R`Ba điểm không thẳng hàng xác định $3$ đoạn thẳng.`,
          [{ expr: "binomial(3,2)", expect: "3" }],
        )],
        [
          luyen(R`Bốn điểm, không có ba điểm nào thẳng hàng, xác định bao nhiêu đoạn thẳng?`, R`Có $6$ đoạn thẳng.`, [{ expr: "binomial(4,2)", expect: "6" }], "Mỗi cặp điểm cho một đoạn. Số cặp chọn từ bốn điểm bằng $6$."),
          luyen(R`Một đoạn thẳng dài $3$ xentimét nối tiếp một đoạn dài $4$ xentimét. Cả đường dài bao nhiêu?`, R`Cả đường dài $7$ xentimét.`, [{ expr: "3+4", expect: "7" }], "Hai đoạn nối tiếp cộng độ dài. Mỗi đoạn được tính một lần."),
          luyen(R`Đoạn thẳng $AB$ dài $9$ xentimét. Điểm $M$ nằm trên đoạn và $AM=4$ xentimét. Đoạn $MB$ dài bao nhiêu?`, R`Đoạn $MB$ dài $5$ xentimét.`, [{ expr: "9-4", expect: "5" }], "Điểm $M$ nằm giữa hai đầu mút nên độ dài cả đoạn bằng tổng hai đoạn nhỏ. Phần còn lại là $9$ trừ $4$."),
        ],
        { figure: "segment" },
      ),
      bai(
        "goc-truc-quan",
        "Góc nhọn, góc vuông và góc tù",
        R`Hình học trực quan phân biệt góc nhọn, góc vuông và góc tù. Góc vuông có số đo $90^\circ$. Góc nhọn nhỏ hơn góc vuông. Góc tù lớn hơn góc vuông và nhỏ hơn góc bẹt.`,
        [vd(
          R`Góc bẹt có số đo $180^\circ$. Một góc vuông bằng một nửa góc bẹt. Tính số đo đó.`,
          [
            buoc(R`Lấy nửa của $180^\circ$.`, "Góc vuông là nửa góc bẹt khi hai tia của góc vuông tạo với nhau một góc bằng nửa đường thẳng."),
            buoc(R`Số đo bằng $90^\circ$.`, "Chia $180$ cho $2$ được $90$. Đây là số đo của góc vuông."),
          ],
          R`Góc vuông có số đo $90^\circ$.`,
          [{ expr: "180/2", expect: "90" }],
        )],
        [
          luyen(R`Góc $40^\circ$ là góc nhọn, góc vuông hay góc tù?`, R`Đó là góc nhọn, vì $40^\circ<90^\circ$.`, [{ expr: "90-40", expect: "50" }], "Góc nhỏ hơn góc vuông là góc nhọn. Hiệu $50^\\circ$ là phần còn lại để đủ một góc vuông."),
          luyen(R`Góc $120^\circ$ là góc gì?`, R`Đó là góc tù, vì lớn hơn $90^\circ$ và nhỏ hơn $180^\circ$.`, [{ expr: "120-90", expect: "30" }], "Góc vượt góc vuông $30^\\circ$ nhưng chưa tới góc bẹt, nên là góc tù."),
          luyen(R`Hình chữ nhật có $4$ góc vuông. Tổng số đo bốn góc bằng bao nhiêu độ?`, R`Tổng bằng $360^\circ$.`, [{ expr: "4*90", expect: "360" }], "Mỗi góc vuông là $90^\\circ$. Bốn góc của hình chữ nhật cộng lại bằng $360^\\circ$."),
        ],
        { figure: "angle" },
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
          luyen(R`Trung bình của $4, 6, 8$ bằng bao nhiêu?`, R`Trung bình bằng $6$.`, [{ expr: "Rational(4+6+8,3)", expect: "6" }], "Tổng ba số là $18$. Chia cho ba số liệu được $6$."),
          luyen(R`Ba số có tổng $15$. Trung bình bằng bao nhiêu?`, R`Trung bình bằng $5$.`, [{ expr: "Rational(15,3)", expect: "5" }], "Trung bình cộng là tổng chia cho số số liệu. Ở đây có đúng ba số."),
          luyen(R`Một cột ghi $2$ bạn điểm $5$ và $3$ bạn điểm $8$. Tổng điểm bằng bao nhiêu?`, R`Tổng điểm bằng $34$.`, [{ expr: "2*5+3*8", expect: "34" }], "Mỗi nhóm điểm được nhân với số bạn của nhóm, rồi cộng hai tích."),
        ],
        { figure: "bar" },
      ),
      bai(
        "bieu-do-cot",
        "Đọc biểu đồ cột",
        R`Trên biểu đồ cột, chiều cao của mỗi cột là số liệu của nhóm đó. Cột cao nhất là nhóm có số liệu lớn nhất. Tổng các số liệu bằng tổng độ cao đã đọc.`,
        [vd(
          R`Ba cột có độ cao $2$, $5$ và $3$. Cột nào cao nhất, và tổng ba cột bằng bao nhiêu?`,
          [
            buoc(R`Cột cao nhất có độ cao $5$.`, "So sánh ba số liệu. Số $5$ lớn hơn cả $2$ và $3$."),
            buoc(R`Tổng bằng $2+5+3=10$.`, "Cộng đủ ba cột. Không bỏ cột nào khi tính tổng mẫu."),
          ],
          R`Cột cao nhất là cột $5$ và tổng bằng $10$.`,
          [{ expr: "Max(2,5,3)", expect: "5" }, { expr: "2+5+3", expect: "10" }],
        )],
        [
          luyen(R`Biểu đồ có các cột $4, 4, 1$. Có một cột cao nhất duy nhất không?`, R`Không. Hai cột cùng cao $4$.`, [{ expr: "Max(4,4,1)", expect: "4" }], "Giá trị lớn nhất xuất hiện hai lần, nên không có một cột cao nhất duy nhất."),
          luyen(R`Ba cột $2, 5, 3$ có tổng bằng bao nhiêu?`, R`Tổng bằng $10$.`, [{ expr: "2+5+3", expect: "10" }], "Đọc từng cột rồi cộng. Tổng này là cỡ của cả bảng số liệu."),
          luyen(R`Nếu mỗi đơn vị trên cột là $1$ bạn, cột cao $5$ ứng với bao nhiêu bạn?`, R`Cột đó ứng với $5$ bạn.`, [{ expr: "5*1", expect: "5" }], "Chiều cao đã tính theo đơn vị bạn. Cột cao $5$ đơn vị là $5$ bạn."),
        ],
        { figure: "bar" },
      ),
    ]),
  ],
};
