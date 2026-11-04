import type { GradeBook } from "./types.ts";
import { bai, buoc, chuong, luyen, vd } from "./types.ts";

const R = String.raw;

export const lop10: GradeBook = {
  grade: 10,
  band: "thpt",
  title: "Mệnh đề, hàm số, vectơ, thống kê và xác suất.",
  chapters: [
    chuong("tap-hop", "Mệnh đề và tập hợp", [
      bai(
        "giao-hop",
        "Số phần tử của hợp hai tập",
        R`Với hai tập hữu hạn, $n(A\cup B)=n(A)+n(B)-n(A\cap B)$. Phải trừ phần giao vì phần đó đã được đếm hai lần.`,
        [vd(
          R`Lớp có $20$ bạn học Toán, $15$ bạn học Văn, và $8$ bạn học cả hai. Hỏi có bao nhiêu bạn học ít nhất một môn?`,
          [
            buoc(R`Công thức hợp là $20+15-8$.`, "Phần $8$ bạn học cả hai nằm trong cả hai số đầu, nên phải trừ một lần."),
            buoc(R`Kết quả bằng $27$ bạn.`, "Phép tính $20+15-8$ ra $27$. Đây là số bạn thuộc ít nhất một trong hai tập."),
          ],
          R`Có $27$ bạn học ít nhất một môn.`,
          [{ expr: "20+15-8", expect: "27" }],
        )],
        [
          luyen(R`Cho $n(A)=12$, $n(B)=9$ và $n(A\cap B)=4$. Tính $n(A\cup B)$.`, R`Hợp có $17$ phần tử.`, [{ expr: "12+9-4", expect: "17" }]),
          luyen(R`Hai tập rời nhau có $6$ và $5$ phần tử. Hợp có bao nhiêu phần tử?`, R`Hợp có $11$ phần tử.`, [{ expr: "6+5-0", expect: "11" }]),
          luyen(R`Cho $n(A)=10$, $n(A\cup B)=16$ và $n(A\cap B)=3$. Tính $n(B)$.`, R`Tập $B$ có $9$ phần tử.`, [{ expr: "16-10+3", expect: "9" }]),
        ],
      ),
    ]),
    chuong("bpt", "Bất đẳng thức", [
      bai(
        "bpt-bac-nhat",
        "Bất phương trình bậc nhất một ẩn",
        R`Với $a>0$, bất phương trình $ax+b>0$ tương đương $x>-\frac{b}{a}$. Khi nhân hoặc chia với số âm thì đảo chiều.`,
        [vd(
          R`Giải $2x-6>0$.`,
          [
            buoc(R`Vì hệ số của $x$ bằng $2>0$, chuyển $-6$ sang vế kia và giữ chiều.`, "Chia cho số dương không đảo chiều bất phương trình."),
            buoc(R`Ta được $x>3$.`, "Nghiệm là mọi số lớn hơn $3$. Điểm $x=3$ làm vế trái bằng $0$ nên không thuộc tập nghiệm chặt."),
          ],
          R`Tập nghiệm là $(3;+\infty)$.`,
          [{ expr: "2*4-6", expect: "2" }],
        )],
        [
          luyen(R`Giải $3x+6\le 0$.`, R`Tập nghiệm là $(-\infty;-2]$.`, [{ expr: "3*(-2)+6", expect: "0" }]),
          luyen(R`Giải $-x<4$.`, R`Tập nghiệm là $(-4;+\infty)$.`, [{ expr: "-(-5)", expect: "5" }]),
          luyen(R`Số $x=1$ có thỏa $5x-5>0$ không?`, R`Không, vì vế trái bằng $0$.`, [{ expr: "5*1-5", expect: "0" }]),
        ],
        { topicId: "ineq" },
      ),
    ]),
    chuong("ham", "Hàm số bậc hai", [
      bai(
        "dinh-parabol",
        "Đỉnh của parabol",
        R`Hàm $y=ax^2+bx+c$ với $a\neq 0$ viết được thành $a\left(x+\frac{b}{2a}\right)^2$ cộng một hằng số. Hoành độ đỉnh là $x=-\frac{b}{2a}$.`,
        [vd(
          R`Tìm giá trị nhỏ nhất của $y=x^2-4x+1$ trên $\mathbb{R}$.`,
          [
            buoc(R`Ta có $y=(x-2)^2-3$.`, "Hoàn thành bình phương: $x^2-4x+1=(x-2)^2-4+1$. Đẳng thức đúng với mọi $x$."),
            buoc(R`Vì $(x-2)^2\ge 0$, giá trị nhỏ nhất bằng $-3$ tại $x=2$.`, "Bình phương bằng $0$ khi $x=2$. Hệ số của bình phương dương nên đây là giá trị nhỏ nhất."),
          ],
          R`Giá trị nhỏ nhất bằng $-3$, đạt tại $x=2$.`,
          [{ expr: "(2-2)**2-3", expect: "-3" }],
        )],
        [
          luyen(R`Tìm hoành độ đỉnh của $y=x^2-6x+5$.`, R`Hoành độ đỉnh bằng $3$.`, [{ expr: "-(-6)/(2*1)", expect: "3" }]),
          luyen(R`Tính $y(3)$ với $y=x^2-6x+5$.`, R`Tung độ đỉnh bằng $-4$.`, [{ expr: "3**2-6*3+5", expect: "-4" }]),
          luyen(R`Hệ số $a$ của $y=-2x^2+x$ âm hay dương?`, R`Hệ số $a$ bằng $-2$, nên parabol quay bề lõm xuống dưới.`, [{ expr: "-(2*1)", expect: "-2" }]),
        ],
        { topicId: "quadratic" },
      ),
    ]),
    chuong("he-thuc", "Hệ thức lượng trong tam giác", [
      bai(
        "cosin",
        "Định lí côsin",
        R`Trong tam giác, $c^2=a^2+b^2-2ab\cos C$, với $C$ là góc xen giữa hai cạnh $a$ và $b$. Độ dài lấy căn không âm.`,
        [vd(
          R`Hai cạnh $2$ và $3$ kẹp góc $60^\circ$. Tính cạnh thứ ba.`,
          [
            buoc(R`Bình phương cạnh thứ ba bằng $4+9-2\cdot 2\cdot 3\cdot\frac{1}{2}=7$.`, "Côsin của $60^\\circ$ bằng $\\frac{1}{2}$. Góc này là góc xen giữa hai cạnh đã cho."),
            buoc(R`Cạnh thứ ba bằng $\sqrt{7}$.`, "Độ dài là căn không âm của $7$. Nghiệm âm của phương trình $t^2=7$ không phải độ dài."),
          ],
          R`Cạnh thứ ba bằng $\sqrt{7}$.`,
          [{ expr: "2**2+3**2-2*2*3*cos(pi/3)", expect: "7" }],
        )],
        [
          luyen(R`Tam giác vuông có hai cạnh góc vuông $6$ và $8$. Cạnh huyền bằng bao nhiêu?`, R`Cạnh huyền bằng $10$.`, [{ expr: "sqrt(6**2+8**2)", expect: "10" }]),
          luyen(R`Hai cạnh $5$ và $5$ kẹp góc $60^\circ$. Cạnh còn lại bằng bao nhiêu?`, R`Cạnh còn lại bằng $5$.`, [{ expr: "sqrt(5**2+5**2-2*5*5*cos(pi/3))", expect: "5" }]),
          luyen(R`Diện tích tam giác hai cạnh $6$, $4$ và góc kẹp $30^\circ$ bằng bao nhiêu?`, R`Diện tích bằng $6$.`, [{ expr: "Rational(1,2)*6*4*sin(pi/6)", expect: "6" }]),
        ],
        { topicId: "triangle", figure: "triangle" },
      ),
    ]),
    chuong("vecto", "Vectơ", [
      bai(
        "do-dai",
        "Độ dài vectơ trong mặt phẳng",
        R`Vectơ $\vec u=(x;y)$ có độ dài $\sqrt{x^2+y^2}$. Căn lấy giá trị không âm. Cộng độ dài chỉ bằng độ dài tổng khi hai vectơ cùng hướng.`,
        [vd(
          R`Tính độ dài vectơ $(3;4)$.`,
          [
            buoc(R`Tổng bình phương hai tọa độ bằng $9+16=25$.`, "Độ dài trong mặt phẳng cộng bình phương đúng hai tọa độ đã cho."),
            buoc(R`Căn không âm của $25$ bằng $5$.`, "Nghiệm âm của $t^2=25$ không phải độ dài."),
          ],
          R`Độ dài bằng $5$.`,
          [{ expr: "sqrt(3**2+4**2)", expect: "5" }],
        )],
        [
          luyen(R`Tính độ dài vectơ $(6;8)$.`, R`Độ dài bằng $10$.`, [{ expr: "sqrt(6**2+8**2)", expect: "10" }]),
          luyen(R`Tính $(1;2)+(3;-1)$.`, R`Tổng bằng $(4;1)$.`, [{ expr: "1+3", expect: "4" }]),
          luyen(R`Tích vô hướng của $(2;0)$ và $(0;5)$ bằng bao nhiêu?`, R`Tích vô hướng bằng $0$, nên hai vectơ vuông góc.`, [{ expr: "2*0+0*5", expect: "0" }]),
        ],
        { topicId: "vector" },
      ),
    ]),
    chuong("thong-ke", "Thống kê", [
      bai(
        "trung-binh",
        "Số trung bình cộng",
        R`Số trung bình của $n$ số là tổng chia cho $n$. Một giá trị rất lớn kéo trung bình, nên cần nói rõ mẫu số là số phần tử.`,
        [vd(
          R`Tính số trung bình của dãy điểm $2, 4, 4, 6, 9$.`,
          [
            buoc(R`Tổng năm số bằng $25$.`, "Cộng đủ mọi số liệu trước khi chia. Không bỏ số lặp."),
            buoc(R`Trung bình bằng $\frac{25}{5}=5$ điểm.`, "Mẫu số là số phần tử của dãy, tức $5$."),
          ],
          R`Số trung bình bằng $5$ điểm.`,
          [{ expr: "Rational(2+4+4+6+9,5)", expect: "5" }],
        )],
        [
          luyen(R`Trung bình của $1, 2, 3$ bằng bao nhiêu?`, R`Trung bình bằng $2$.`, [{ expr: "Rational(1+2+3,3)", expect: "2" }]),
          luyen(R`Bốn số có tổng $28$. Trung bình bằng bao nhiêu?`, R`Trung bình bằng $7$.`, [{ expr: "Rational(28,4)", expect: "7" }]),
          luyen(R`Phương sai của $1, 2, 3$, chia cho $3$, bằng bao nhiêu?`, R`Phương sai bằng $\frac{2}{3}$ điểm$^2$.`, [{ expr: "Rational((1-2)**2+(2-2)**2+(3-2)**2,3)", expect: "Rational(2,3)" }]),
        ],
        { topicId: "combo", figure: "bar" },
      ),
    ]),
    chuong("xac-suat", "Xác suất", [
      bai(
        "co-dien",
        "Xác suất cổ điển",
        R`Khi các kết quả đồng khả năng, xác suất của biến cố $A$ là $P(A)=\frac{n(A)}{n(\Omega)}$. Tử là số kết quả thuận lợi, mẫu là số kết quả có thể.`,
        [vd(
          R`Túi có $3$ bi đỏ và $2$ bi xanh, rút một bi. Tính xác suất được bi đỏ.`,
          [
            buoc(R`Có $5$ bi, nên không gian mẫu có $5$ kết quả đồng khả năng.`, "Mỗi bi được rút với cùng một khả năng. Mẫu số là tổng số bi."),
            buoc(R`Có $3$ bi đỏ, nên $P=\frac{3}{5}$.`, "Tử đếm đúng biến cố được bi đỏ. Phân số này đã tối giản."),
          ],
          R`Xác suất được bi đỏ bằng $\frac{3}{5}$.`,
          [{ expr: "Rational(3,5)", expect: "Rational(3,3+2)" }],
        )],
        [
          luyen(R`Tung một xúc xắc cân đối. Xác suất ra mặt chẵn bằng bao nhiêu?`, R`Xác suất bằng $\frac{1}{2}$.`, [{ expr: "Rational(3,6)", expect: "Rational(1,2)" }]),
          luyen(R`Hai đồng xu cân đối. Xác suất được hai mặt ngửa bằng bao nhiêu?`, R`Xác suất bằng $\frac{1}{4}$.`, [{ expr: "Rational(1,4)", expect: "Rational(1,2)*Rational(1,2)" }]),
          luyen(R`Rút một lá từ bộ $10$ lá, trong đó $4$ lá đạt. Xác suất đạt bằng bao nhiêu?`, R`Xác suất bằng $\frac{2}{5}$.`, [{ expr: "Rational(4,10)", expect: "Rational(2,5)" }]),
        ],
        { topicId: "probability" },
      ),
    ]),
  ],
};
