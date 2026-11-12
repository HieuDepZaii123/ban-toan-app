import type { GradeBook } from "./types.ts";
import { bai, buoc, chuong, luyen, vd } from "./types.ts";

const R = String.raw;

export const lop06: GradeBook = {
  grade: 6,
  band: "thcs",
  title: "Số tự nhiên, số nguyên tố, phép tính phân số, hỗn số, ước lượng và hình đều.",
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
          luyen(R`Tính $20-6:2$.`, R`Giá trị bằng $17$.`, [{ expr: "20-6/2", expect: "17" }], "Phép chia đứng trước phép trừ. Thương $3$ được trừ khỏi $20$."),
          luyen(R`Tính $8:2+1$.`, R`Giá trị bằng $5$.`, [{ expr: "8/2+1", expect: "5" }], "Chia trước được $4$, rồi cộng $1$. Không cộng $2$ với $1$ trước khi chia."),
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
    chuong("phan-so", "Phân số âm và hỗn số", [
      bai(
        "phan-am",
        "Phân số âm",
        R`Phân số âm là số đối của một phân số dương. Cộng một phân số âm là trừ trị tuyệt đối của phân số đó.`,
        [vd(
          R`Tính $\left(-\frac{1}{2}\right)+\frac{3}{4}$.`,
          [
            buoc(R`Quy đồng mẫu $4$: $-\frac{2}{4}+\frac{3}{4}$.`, "Mẫu chung của $2$ và $4$ là $4$. Phân số âm giữ dấu trừ ở tử."),
            buoc(R`Tổng bằng $\frac{1}{4}$.`, "Cộng tử $-2+3$ được $1$. Kết quả dương vì trị tuyệt đối của số hạng dương lớn hơn."),
          ],
          R`Tổng bằng $\frac{1}{4}$.`,
          [{ expr: "Rational(-1,2)+Rational(3,4)", expect: "Rational(1,4)" }],
        )],
        [
          luyen(R`Tính $\frac{2}{5}+\left(-\frac{1}{5}\right)$.`, R`Tổng bằng $\frac{1}{5}$.`, [{ expr: "Rational(2,5)+Rational(-1,5)", expect: "Rational(1,5)" }], "Cùng mẫu thì cộng tử. Tử $2+(-1)$ bằng $1$."),
          luyen(R`Tính $\left(-\frac{3}{4}\right)\cdot\frac{2}{3}$.`, R`Tích bằng $-\frac{1}{2}$.`, [{ expr: "Rational(-3,4)*Rational(2,3)", expect: "Rational(-1,2)" }], "Một phân số âm nhân một phân số dương cho tích âm. Rút gọn còn một nửa."),
          luyen(R`Số đối của $-\frac{5}{6}$ bằng bao nhiêu?`, R`Số đối bằng $\frac{5}{6}$.`, [{ expr: "-Rational(-5,6)", expect: "Rational(5,6)" }], "Số đối của một số âm là số dương có cùng trị tuyệt đối."),
        ],
      ),
      bai(
        "hon-so",
        "Hỗn số",
        R`Hỗn số gồm phần nguyên và một phân số nhỏ hơn $1$. Hỗn số $n\frac{a}{b}$ bằng $n+\frac{a}{b}$, với $b\neq 0$.`,
        [vd(
          R`Viết hỗn số $2\frac{1}{3}$ thành phân số.`,
          [
            buoc(R`Phần nguyên $2$ bằng $\frac{6}{3}$.`, "Đổi phần nguyên về phân số cùng mẫu với phần phân số."),
            buoc(R`Cộng $\frac{6}{3}+\frac{1}{3}=\frac{7}{3}$.`, "Hỗn số là tổng của phần nguyên và phần phân số. Tử $6+1$ bằng $7$."),
          ],
          R`Hỗn số bằng $\frac{7}{3}$.`,
          [{ expr: "2+Rational(1,3)", expect: "Rational(7,3)" }],
        )],
        [
          luyen(R`Viết $1\frac{1}{4}$ thành phân số.`, R`Phân số là $\frac{5}{4}$.`, [{ expr: "1+Rational(1,4)", expect: "Rational(5,4)" }], "Một đơn vị là bốn phần tư. Thêm một phần tư được năm phần tư."),
          luyen(R`Phân số $\frac{11}{4}$ viết thành hỗn số có phần nguyên nào?`, R`Phần nguyên là $2$, vì $\frac{11}{4}=2\frac{3}{4}$.`, [{ expr: "11//4", expect: "2" }], "Chia tử cho mẫu. Thương nguyên là phần nguyên của hỗn số, dư là tử của phần phân số."),
          luyen(R`Tính $3\frac{1}{2}+1\frac{1}{2}$.`, R`Tổng bằng $5$.`, [{ expr: "(3+Rational(1,2))+(1+Rational(1,2))", expect: "5" }], "Cộng phần nguyên với nhau và phần phân số với nhau. Một nửa cộng một nửa thành một đơn vị."),
        ],
      ),
      bai(
        "cong-tru-phan-so-6",
        "Cộng và trừ phân số",
        R`Muốn cộng hai phân số khác mẫu, quy đồng mẫu rồi cộng các tử và giữ nguyên mẫu. Trừ một phân số là cộng với số đối của nó. Kết quả nên rút gọn về phân số tối giản.`,
        [vd(
          R`Tính $\frac{2}{3}+\frac{1}{4}$ và $\frac{1}{6}-\frac{1}{2}$.`,
          [
            buoc(R`Mẫu chung $12$: $\frac{2}{3}+\frac{1}{4}=\frac{8}{12}+\frac{3}{12}=\frac{11}{12}$.`, R`Bội chung nhỏ nhất của $3$ và $4$ là $12$, dùng làm mẫu chung.`),
            buoc(R`Mẫu chung $6$: $\frac{1}{6}-\frac{1}{2}=\frac{1}{6}-\frac{3}{6}=-\frac{2}{6}=-\frac{1}{3}$.`, R`Tử $1-3$ âm nên hiệu là phân số âm, rồi rút gọn cho $2$.`),
          ],
          R`Tổng bằng $\frac{11}{12}$ và hiệu bằng $-\frac{1}{3}$.`,
          [{ expr: "Rational(2,3)+Rational(1,4)", expect: "Rational(11,12)" }, { expr: "Rational(1,6)-Rational(1,2)", expect: "Rational(-1,3)" }],
        )],
        [
          luyen(R`Tính $\frac{3}{8}+\frac{1}{8}$.`, R`Tổng bằng $\frac{1}{2}$.`, [{ expr: "Rational(3,8)+Rational(1,8)", expect: "Rational(1,2)" }], R`Cùng mẫu $8$, cộng tử được $\frac{4}{8}$, rút gọn thành $\frac{1}{2}$.`),
          luyen(R`Tính $\frac{5}{6}-\frac{1}{4}$.`, R`Hiệu bằng $\frac{7}{12}$.`, [{ expr: "Rational(5,6)-Rational(1,4)", expect: "Rational(7,12)" }], R`Mẫu chung $12$: $\frac{10}{12}-\frac{3}{12}=\frac{7}{12}$.`),
          luyen(R`Tính $-\frac{1}{3}+\frac{1}{2}$.`, R`Tổng bằng $\frac{1}{6}$.`, [{ expr: "Rational(-1,3)+Rational(1,2)", expect: "Rational(1,6)" }], R`Mẫu chung $6$: $-\frac{2}{6}+\frac{3}{6}=\frac{1}{6}$.`),
        ],
        {
          whyTrue: R`Mẫu số cho biết đơn vị được chia thành mấy phần bằng nhau. Chỉ khi các phần to bằng nhau, tức cùng mẫu, thì cộng số phần mới có nghĩa.`,
          pitfalls: R`Chọn mẫu chung quá lớn rồi quên rút gọn. Với hai mẫu $6$ và $4$, mẫu chung nhỏ nhất là $12$, không cần dùng $24$.`,
        },
      ),
      bai(
        "nhan-chia-phan-so-6",
        "Nhân, chia phân số và phân số của một số",
        R`Nhân hai phân số thì lấy tử nhân tử, mẫu nhân mẫu. Chia cho một phân số khác $0$ là nhân với phân số nghịch đảo. Muốn tìm $\frac{m}{n}$ của một số, lấy số đó nhân với $\frac{m}{n}$.`,
        [vd(
          R`Tính $\frac{2}{3}\cdot\frac{9}{4}$ và tìm $\frac{3}{4}$ của $20$.`,
          [
            buoc(R`Nhân: $\frac{2}{3}\cdot\frac{9}{4}=\frac{18}{12}=\frac{3}{2}$.`, R`Tử nhân tử, mẫu nhân mẫu, rồi rút gọn cho $6$.`),
            buoc(R`Ba phần tư của $20$ là $20\cdot\frac{3}{4}=15$.`, R`Chia $20$ thành $4$ phần bằng nhau, mỗi phần $5$, rồi lấy $3$ phần.`),
          ],
          R`Tích bằng $\frac{3}{2}$, và $\frac{3}{4}$ của $20$ bằng $15$.`,
          [{ expr: "Rational(2,3)*Rational(9,4)", expect: "Rational(3,2)" }, { expr: "20*Rational(3,4)", expect: "15" }],
        )],
        [
          luyen(R`Tính $\frac{3}{5}:\frac{9}{10}$.`, R`Thương bằng $\frac{2}{3}$.`, [{ expr: "Rational(3,5)/Rational(9,10)", expect: "Rational(2,3)" }], R`Nhân với nghịch đảo: $\frac{3}{5}\cdot\frac{10}{9}=\frac{30}{45}=\frac{2}{3}$.`),
          luyen(R`Tính $-\frac{1}{2}\cdot\frac{4}{7}$.`, R`Tích bằng $-\frac{2}{7}$.`, [{ expr: "Rational(-1,2)*Rational(4,7)", expect: "Rational(-2,7)" }], R`Hai thừa số khác dấu nên tích âm, và $\frac{4}{14}$ rút gọn thành $\frac{2}{7}$.`),
          luyen(R`Lớp có $40$ bạn, $\frac{2}{5}$ số bạn tham gia câu lạc bộ. Có bao nhiêu bạn tham gia?`, R`Có $16$ bạn tham gia.`, [{ expr: "40*Rational(2,5)", expect: "16" }], R`Lấy $40$ nhân $\frac{2}{5}$: chia $40$ cho $5$ được $8$, rồi nhân $2$.`),
        ],
        {
          whyTrue: R`Nhân với $\frac{1}{n}$ là chia thành $n$ phần bằng nhau rồi lấy một phần. Phép chia là phép ngược của phép nhân, nên chia cho $\frac{a}{b}$ là nhân với $\frac{b}{a}$, vì hai số này có tích bằng $1$.`,
          pitfalls: R`Đảo ngược cả hai phân số khi chia. Chỉ đảo phân số đứng sau dấu chia.`,
        },
      ),
    ]),
    chuong("thap-phan", "Số thập phân âm và ước lượng", [
      bai(
        "thap-phan-am",
        "Số thập phân âm",
        R`Số thập phân âm nằm bên trái số $0$ trên trục số. Cộng một số thập phân âm là đi về phía âm một đoạn bằng trị tuyệt đối của số đó.`,
        [vd(
          R`Tính $-1{,}5+2{,}5$.`,
          [
            buoc(R`Đổi $-1{,}5=-\frac{3}{2}$ và $2{,}5=\frac{5}{2}$.`, "Một chữ số thập phân là phân số mẫu $2$ hoặc mẫu $10$ sau khi rút gọn."),
            buoc(R`Tổng bằng $\frac{2}{2}=1$.`, "Cùng mẫu thì cộng tử $-3+5$. Kết quả là số nguyên $1$."),
          ],
          R`Tổng bằng $1$.`,
          [{ expr: "Rational(-3,2)+Rational(5,2)", expect: "1" }],
        )],
        [
          luyen(R`Tính $-2{,}5+1$.`, R`Tổng bằng $-1{,}5$.`, [{ expr: "Rational(-5,2)+1", expect: "Rational(-3,2)" }], "Từ $-2{,}5$ đi về phía dương một đơn vị thì tới $-1{,}5$."),
          luyen(R`Số nào lớn hơn, $-0{,}4$ hay $-0{,}7$?`, R`Số $-0{,}4$ lớn hơn.`, [{ expr: "Rational(-4,10)-Rational(-7,10)", expect: "Rational(3,10)" }], "Trên trục số, $-0{,}4$ nằm bên phải $-0{,}7$. Hiệu dương xác nhận chiều so sánh."),
          luyen(R`Tính $|-1{,}5|$.`, R`Trị tuyệt đối bằng $1{,}5$.`, [{ expr: "Abs(Rational(-3,2))", expect: "Rational(3,2)" }], "Trị tuyệt đối của số thập phân âm là số thập phân dương đối với nó."),
        ],
      ),
      bai(
        "uoc-luong",
        "Ước lượng kết quả",
        R`Ước lượng một phép tính bằng cách làm tròn từng số tới hàng đang dùng, rồi tính trên các số đã làm tròn. Kết quả ước lượng gần kết quả đúng, và dùng để kiểm tra phép tính.`,
        [vd(
          R`Ước lượng $48+37$ bằng cách làm tròn đến hàng chục.`,
          [
            buoc(R`Làm tròn $48$ thành $50$ và $37$ thành $40$.`, "Chữ số hàng đơn vị từ $5$ trở lên thì tăng hàng chục. Cả hai số đều được làm tròn lên."),
            buoc(R`Ước lượng bằng $50+40=90$.`, "Cộng hai số đã làm tròn. Tổng đúng $48+37=85$ nằm gần $90$."),
          ],
          R`Ước lượng bằng $90$.`,
          [{ expr: "round(48,-1)+round(37,-1)", expect: "90" }],
        )],
        [
          luyen(R`Làm tròn $46$ và $23$ đến hàng chục, rồi ước lượng tổng.`, R`Ước lượng bằng $50+20=70$.`, [{ expr: "round(46,-1)+round(23,-1)", expect: "70" }], "Số $46$ làm tròn thành $50$, số $23$ làm tròn thành $20$. Cộng hai số tròn chục."),
          luyen(R`Tổng đúng của $48$ và $37$ bằng bao nhiêu?`, R`Tổng đúng bằng $85$.`, [{ expr: "48+37", expect: "85" }], "Ước lượng $90$ chỉ để đối chiếu. Phép cộng đúng vẫn tính trên hai số ban đầu."),
          luyen(R`Ước lượng $62-18$ đến hàng chục.`, R`Ước lượng bằng $60-20=40$.`, [{ expr: "round(62,-1)-round(18,-1)", expect: "40" }], "Làm tròn từng số trước khi trừ. Hiệu của hai số tròn chục là ước lượng."),
        ],
      ),
    ]),
    chuong("ti-so-pt", "Tỉ số phần trăm", [
      bai(
        "ti-so-phan-tram",
        "Đổi một tỉ số thành phần trăm",
        R`Tỉ số phần trăm của $a$ so với $b$, với $b\neq 0$, là $\frac{a}{b}\cdot 100\%$. Kết quả cho biết $a$ bằng bao nhiêu phần trăm của $b$.`,
        [vd(
          R`Một lớp $60$ bạn có $15$ bạn đạt giải. Tỉ số phần trăm bạn đạt giải bằng bao nhiêu?`,
          [
            buoc(R`Tỉ số là $\frac{15}{60}=\frac{1}{4}$.`, "Tử đếm bạn đạt giải, mẫu đếm cả lớp."),
            buoc(R`Phần trăm bằng $\frac{1}{4}\cdot 100\%=25\%$.`, "Nhân tỉ số với $100$ để đổi sang phần trăm."),
          ],
          R`Tỉ số phần trăm bằng $25\%$.`,
          [{ expr: "Rational(15,60)*100", expect: "25" }],
        )],
        [
          luyen(R`Đổi tỉ số $\frac{3}{5}$ thành phần trăm.`, R`Tỉ số bằng $60\%$.`, [{ expr: "Rational(3,5)*100", expect: "60" }], "Nhân phân số với $100$. Ba phần năm là sáu mươi phần trăm."),
          luyen(R`So sánh $60\%$ và $50\%$. Hiệu bằng bao nhiêu điểm phần trăm?`, R`Hiệu bằng $10$ điểm phần trăm, nên $60\%$ lớn hơn.`, [{ expr: "60-50", expect: "10" }], "Hai tỉ số đã đổi về cùng cách viết phần trăm thì trừ các số phần trăm."),
          luyen(R`Trong $40$ bạn có $8$ bạn chọn môn A. Tỉ số phần trăm bằng bao nhiêu?`, R`Tỉ số bằng $20\%$.`, [{ expr: "Rational(8,40)*100", expect: "20" }], "Chia $8$ cho $40$ được $\\frac{1}{5}$, rồi nhân $100$."),
        ],
      ),
      bai(
        "so-sanh-ti-so",
        "So sánh hai tỉ số bằng phần trăm",
        R`Muốn so sánh hai tỉ số, đổi cả hai thành phần trăm rồi so sánh hai số phần trăm. Tỉ số nào có phần trăm lớn hơn thì lớn hơn.`,
        [vd(
          R`So sánh $\frac{3}{5}$ và $\frac{1}{2}$ bằng phần trăm.`,
          [
            buoc(R`Ta có $\frac{3}{5}=60\%$ và $\frac{1}{2}=50\%$.`, "Mỗi tỉ số nhân với $100$ cho một số phần trăm."),
            buoc(R`Vì $60>50$, tỉ số $\frac{3}{5}$ lớn hơn.`, "Cùng đơn vị phần trăm thì số lớn hơn ứng với tỉ số lớn hơn."),
          ],
          R`Tỉ số $\frac{3}{5}$ lớn hơn tỉ số $\frac{1}{2}$.`,
          [{ expr: "Rational(3,5)*100-Rational(1,2)*100", expect: "10" }],
        )],
        [
          luyen(R`Tỉ số $\frac{1}{4}$ bằng bao nhiêu phần trăm?`, R`Bằng $25\%$.`, [{ expr: "Rational(1,4)*100", expect: "25" }], "Một phần tư của $100$ là $25$."),
          luyen(R`Trong hai tỉ số $\frac{4}{5}$ và $\frac{3}{4}$, tỉ số nào lớn hơn?`, R`Tỉ số $\frac{4}{5}$ lớn hơn, vì $80\%>75\%$.`, [{ expr: "Rational(4,5)*100-Rational(3,4)*100", expect: "5" }], "Đổi cả hai tỉ số ra phần trăm. Hiệu $5$ điểm phần trăm cho biết chiều so sánh."),
          luyen(R`Nếu $25\%$ của một số bằng $10$, cả số bằng bao nhiêu?`, R`Cả số bằng $40$.`, [{ expr: "10/Rational(25,100)", expect: "40" }], "Biết một phần trăm thì chia cho tỉ số phần trăm đó để tìm cả số."),
        ],
      ),
    ]),
    chuong("hinh", "Góc và hình đều", [
      bai(
        "so-do-goc",
        "Góc và số đo góc",
        R`Một góc có đỉnh và hai cạnh. Số đo góc tính bằng độ. Hai góc kề nhau có chung đỉnh và một cạnh, số đo của góc gộp bằng tổng hai số đo.`,
        [vd(
          R`Hai góc kề nhau có số đo $50^\circ$ và $70^\circ$. Góc gộp bằng bao nhiêu độ?`,
          [
            buoc(R`Cộng hai số đo đã cho.`, "Góc gộp gồm đúng hai góc kề, không tính trùng cạnh chung."),
            buoc(R`Tổng bằng $120^\circ$.`, "Phép cộng $50+70$ cho số đo của góc lớn."),
          ],
          R`Góc gộp bằng $120^\circ$.`,
          [{ expr: "50+70", expect: "120" }],
        )],
        [
          luyen(R`Hai góc kề bù nhau. Một góc $35^\circ$. Góc kia bằng bao nhiêu độ?`, R`Góc kia bằng $145^\circ$.`, [{ expr: "180-35", expect: "145" }], "Hai góc kề bù có tổng số đo $180^\\circ$. Góc còn lại bằng $180^\\circ$ trừ góc đã biết."),
          luyen(R`Một góc $90^\circ$ được chia thành hai góc $40^\circ$ và một góc còn lại. Góc còn lại bằng bao nhiêu độ?`, R`Góc còn lại bằng $50^\circ$.`, [{ expr: "90-40", expect: "50" }], "Tổng hai góc thành phần bằng số đo góc ban đầu. Trừ góc $40^\\circ$ khỏi góc vuông."),
          luyen(R`Ba góc kề nhau $20^\circ$, $30^\circ$ và $40^\circ$ gộp lại bằng bao nhiêu độ?`, R`Góc gộp bằng $90^\circ$.`, [{ expr: "20+30+40", expect: "90" }], "Cộng lần lượt ba số đo. Tổng này đúng bằng một góc vuông."),
        ],
        { figure: "angle" },
      ),
      bai(
        "hinh-deu",
        "Hình đều và trục đối xứng",
        R`Hình đều có các cạnh bằng nhau và các góc bằng nhau. Trục đối xứng chia hình thành hai phần trùng nhau khi gấp. Hình vuông có $4$ trục đối xứng. Tam giác đều có $3$ trục đối xứng.`,
        [vd(
          R`Hình vuông cạnh $5$ có chu vi bao nhiêu, và có mấy trục đối xứng?`,
          [
            buoc(R`Chu vi bằng $4\cdot 5=20$.`, "Hình đều nên bốn cạnh cùng độ dài. Chu vi là tổng bốn cạnh."),
            buoc(R`Hình vuông có $4$ trục đối xứng.`, "Hai trục đi qua trung điểm các cạnh đối, hai trục đi theo hai đường chéo."),
          ],
          R`Chu vi bằng $20$ và có $4$ trục đối xứng.`,
          [{ expr: "4*5", expect: "20" }],
        )],
        [
          luyen(R`Tam giác đều cạnh $6$ có chu vi bằng bao nhiêu?`, R`Chu vi bằng $18$.`, [{ expr: "3*6", expect: "18" }], "Ba cạnh của tam giác đều bằng nhau. Nhân độ dài một cạnh với $3$."),
          luyen(R`Hình đều $6$ cạnh, mỗi cạnh dài $4$. Chu vi bằng bao nhiêu?`, R`Chu vi bằng $24$.`, [{ expr: "6*4", expect: "24" }], "Hình đều có mọi cạnh bằng nhau. Chu vi bằng số cạnh nhân độ dài một cạnh."),
          luyen(R`Hình vuông có $4$ trục đối xứng, tam giác đều có $3$ trục. Hiệu số trục bằng bao nhiêu?`, R`Hiệu bằng $1$ trục.`, [{ expr: "4-3", expect: "1" }], "Lấy số trục của hình vuông trừ số trục của tam giác đều."),
        ],
        { figure: "rect" },
      ),
      bai(
        "diem-duong",
        "Điểm, đường thẳng, tia và đoạn thẳng",
        R`Điểm không có kích thước. Qua hai điểm phân biệt có đúng một đường thẳng. Tia có một gốc và đi về một phía. Đoạn thẳng có hai đầu mút.`,
        [vd(
          R`Ba điểm không thẳng hàng xác định bao nhiêu đoạn thẳng?`,
          [
            buoc(R`Mỗi cặp điểm cho một đoạn thẳng.`, "Hai điểm phân biệt xác định đúng một đoạn nối chúng."),
            buoc(R`Ba điểm cho $3$ đoạn.`, "Số cặp chọn từ ba điểm bằng $3$. Ba đoạn này là ba cạnh của một tam giác."),
          ],
          R`Ba điểm xác định $3$ đoạn thẳng.`,
          [{ expr: "binomial(3,2)", expect: "3" }],
        )],
        [
          luyen(R`Bốn điểm, không có ba điểm nào thẳng hàng, xác định bao nhiêu đoạn thẳng?`, R`Có $6$ đoạn thẳng.`, [{ expr: "binomial(4,2)", expect: "6" }], "Mỗi cặp điểm cho một đoạn. Số cặp chọn từ bốn điểm bằng $6$."),
          luyen(R`Đoạn $AB$ dài $9$ xentimét, điểm $M$ nằm giữa và $AM=4$ xentimét. Đoạn $MB$ dài bao nhiêu?`, R`Đoạn $MB$ dài $5$ xentimét.`, [{ expr: "9-4", expect: "5" }], "Điểm nằm giữa hai đầu mút thì cả đoạn bằng tổng hai đoạn nhỏ."),
          luyen(R`Một tia có một gốc. Hai tia khác gốc có tất cả bao nhiêu gốc?`, R`Có $2$ gốc.`, [{ expr: "1+1", expect: "2" }], "Mỗi tia có đúng một gốc. Hai tia khác gốc thì có hai gốc."),
        ],
        { figure: "segment" },
      ),
    ]),
    chuong("tk-xs-6", "Thống kê và xác suất thực nghiệm", [
      bai(
        "thu-thap",
        "Thu thập dữ liệu",
        R`Số liệu giả định. Thu thập là ghi lại từng giá trị đã quan sát. Cỡ mẫu là số giá trị đã ghi. Tổng các lần đếm bằng cỡ mẫu.`,
        [vd(
          R`Số liệu giả định. Một nhóm ghi $4$ lần giá trị A, $3$ lần giá trị B và $3$ lần giá trị C. Cỡ mẫu bằng bao nhiêu?`,
          [
            buoc(R`Cộng các lần đã ghi: $4+3+3$.`, "Mỗi lần quan sát được tính một lần, không bỏ nhóm nào."),
            buoc(R`Cỡ mẫu bằng $10$.`, "Tổng các lần đếm là số giá trị trong mẫu."),
          ],
          R`Cỡ mẫu bằng $10$.`,
          [{ expr: "4+3+3", expect: "10" }],
        )],
        [
          luyen(R`Số liệu giả định. Ba nhóm được đếm $2$, $5$ và $1$ lần. Cỡ mẫu bằng bao nhiêu?`, R`Cỡ mẫu bằng $8$.`, [{ expr: "2+5+1", expect: "8" }], "Cộng đủ ba lần đếm. Kết quả là số quan sát đã thu."),
          luyen(R`Số liệu giả định. Mẫu $12$ giá trị, đã ghi $7$ giá trị loại một. Còn bao nhiêu giá trị loại khác?`, R`Còn $5$ giá trị.`, [{ expr: "12-7", expect: "5" }], "Phần còn lại bằng cỡ mẫu trừ số đã đếm ở loại một."),
          luyen(R`Số liệu giả định. Hai người cùng đếm một mẫu và cùng ra $9$. Hiệu hai lần đếm bằng bao nhiêu?`, R`Hiệu bằng $0$, hai lần đếm khớp nhau.`, [{ expr: "9-9", expect: "0" }], "Hai lần thu thập cùng một mẫu cho cùng một số thì hiệu bằng không."),
        ],
        { figure: "bar" },
      ),
      bai(
        "bieu-dien-6",
        "Biểu diễn dữ liệu",
        R`Số liệu giả định. Biểu đồ cột dùng độ cao để biểu diễn số lần. Cột cao nhất là giá trị gặp nhiều nhất. Tổng độ cao các cột bằng cỡ mẫu khi mỗi đơn vị là một lần.`,
        [vd(
          R`Số liệu giả định. Ba cột cao $2$, $6$ và $4$. Giá trị nào gặp nhiều nhất, và cỡ mẫu bằng bao nhiêu?`,
          [
            buoc(R`Cột cao nhất là cột $6$.`, "So sánh ba độ cao. Số $6$ lớn hơn $2$ và $4$."),
            buoc(R`Cỡ mẫu bằng $2+6+4=12$.`, "Cộng các lần được biểu diễn. Không bỏ một cột."),
          ],
          R`Giá trị của cột $6$ gặp nhiều nhất. Cỡ mẫu bằng $12$.`,
          [{ expr: "Max(2,6,4)", expect: "6" }, { expr: "2+6+4", expect: "12" }],
        )],
        [
          luyen(R`Số liệu giả định. Cột $8$ cao hơn cột $3$ bao nhiêu đơn vị?`, R`Cao hơn $5$ đơn vị.`, [{ expr: "8-3", expect: "5" }], "Hiệu hai độ cao là phần chênh trên biểu đồ."),
          luyen(R`Số liệu giả định. Ba cột $1$, $1$ và $5$. Có một cột cao nhất duy nhất không?`, R`Có. Cột $5$ là cột cao nhất duy nhất.`, [{ expr: "Max(1,1,5)", expect: "5" }], "Hai cột cùng cao $1$, cột còn lại cao hơn nên là cột cao nhất duy nhất."),
          luyen(R`Số liệu giả định. Các cột $3$, $3$ và $4$ có tổng bằng bao nhiêu?`, R`Tổng bằng $10$.`, [{ expr: "3+3+4", expect: "10" }], "Cộng các số đọc trên biểu đồ. Hai cột cùng độ cao đều được cộng."),
        ],
        { figure: "bar" },
      ),
      bai(
        "xs-thuc-nghiem",
        "Xác suất thực nghiệm",
        R`Số liệu giả định. Xác suất thực nghiệm của một việc bằng số lần việc đó xảy ra chia cho số lần thử. Số này thay đổi khi mẫu thử còn nhỏ, và được dùng như ước lượng.`,
        [vd(
          R`Số liệu giả định. Gieo một đồng xu $20$ lần và được $9$ lần mặt ngửa. Xác suất thực nghiệm của mặt ngửa bằng bao nhiêu?`,
          [
            buoc(R`Số lần thuận là $9$, số lần thử là $20$.`, "Tử của ước lượng là số lần quan sát được việc. Mẫu số là cỡ của thí nghiệm."),
            buoc(R`Xác suất thực nghiệm bằng $\frac{9}{20}$.`, "Chia số lần thuận cho số lần thử. Chưa rút gọn được nữa."),
          ],
          R`Xác suất thực nghiệm bằng $\frac{9}{20}$.`,
          [{ expr: "Rational(9,20)", expect: "9/20" }],
        )],
        [
          luyen(R`Số liệu giả định. Thử $10$ lần, việc xảy ra $3$ lần. Xác suất thực nghiệm bằng bao nhiêu?`, R`Bằng $\frac{3}{10}$.`, [{ expr: "Rational(3,10)", expect: "3/10" }], "Chia số lần xảy ra cho số lần thử."),
          luyen(R`Số liệu giả định. Thử $20$ lần, mặt ngửa $9$ lần. Mặt sấp xảy ra bao nhiêu lần nếu mỗi lần ra đúng một mặt?`, R`Mặt sấp xảy ra $11$ lần.`, [{ expr: "20-9", expect: "11" }], "Mỗi lần thử ra đúng một mặt. Phần còn lại là mặt sấp."),
          luyen(R`Số liệu giả định. Thử $5$ lần và cả $5$ lần đều thuận. Xác suất thực nghiệm bằng bao nhiêu?`, R`Bằng $1$.`, [{ expr: "5/5", expect: "1" }], "Mọi lần thử đều thuận thì ước lượng bằng một. Mẫu lớn hơn có thể cho số khác."),
        ],
      ),
    ]),
  ],
};
