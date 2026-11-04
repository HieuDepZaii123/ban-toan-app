import type { GradeBook } from "./types.ts";
import { bai, buoc, chuong, luyen, vd } from "./types.ts";

const R = String.raw;

export const lop12: GradeBook = {
  grade: 12,
  band: "thpt",
  title: "Khảo sát hàm số, tích phân, mũ, logarit và tọa độ không gian.",
  chapters: [
    chuong("khao-sat", "Ứng dụng đạo hàm", [
      bai(
        "cuc-tri",
        "Điểm dừng của một hàm bậc hai",
        R`Đạo hàm $f'(x)=0$ là điều kiện cần của điểm dừng. Với $f(x)=-x^2+4x$, đạo hàm bậc nhất đổi dấu đúng một lần, và giá trị tại đó là giá trị lớn nhất trên $\mathbb{R}$.`,
        [vd(
          R`Tìm giá trị lớn nhất của $f(x)=-x^2+4x$.`,
          [
            buoc(R`Ta có $f'(x)=-2x+4$, và $f'(x)=0$ khi $x=2$.`, "Đây là điều kiện cần. Phương trình bậc nhất có đúng một nghiệm."),
            buoc(R`Giá trị $f(2)=4$, và $f(x)=-(x-2)^2+4\le 4$.`, "Hoàn thành bình phương cho điều kiện đủ: bình phương không âm, hệ số phía trước âm, nên $4$ là giá trị lớn nhất."),
          ],
          R`Giá trị lớn nhất bằng $4$, đạt tại $x=2$.`,
          [
            { expr: "diff(-x**2+4*x, x).subs(x,2)", expect: "0" },
            { expr: "-(2**2)+4*2", expect: "4" },
          ],
        )],
        [
          luyen(R`Đạo hàm của $x^2-2x$ bằng $0$ tại điểm nào?`, R`Đạo hàm bằng $0$ tại $x=1$.`, [{ expr: "diff(x**2-2*x, x).subs(x,1)", expect: "0" }]),
          luyen(R`Tính $(-1)(1)**2+4\cdot 1$ để thấy $f(1)$ của ví dụ.`, R`Giá trị bằng $3$, nhỏ hơn giá trị tại $x=2$.`, [{ expr: "-(1**2)+4*1", expect: "3" }]),
          luyen(R`Hoành độ đỉnh của $y=x^2-8x$ bằng bao nhiêu?`, R`Hoành độ đỉnh bằng $4$.`, [{ expr: "8/2", expect: "4" }]),
        ],
        { topicId: "survey" },
      ),
    ]),
    chuong("tich-phan", "Nguyên hàm và tích phân", [
      bai(
        "tich-phan-da-thuc",
        "Tích phân của đa thức trên một đoạn",
        R`Một nguyên hàm của $x^n$ là $\frac{x^{n+1}}{n+1}$ với $n$ nguyên không âm. Tích phân từ $a$ đến $b$ bằng hiệu nguyên hàm tại hai đầu mút.`,
        [vd(
          R`Tính $\int_0^2 x\,\mathrm{d}x$.`,
          [
            buoc(R`Một nguyên hàm của $x$ là $\frac{x^2}{2}$.`, "Đạo hàm của $\\frac{x^2}{2}$ bằng $x$, nên đây đúng là một nguyên hàm."),
            buoc(R`Hiệu hai đầu mút bằng $\frac{2^2}{2}-\frac{0^2}{2}=2$.`, "Công thức Newton–Leibniz. Cận dưới đóng góp $0$."),
          ],
          R`Tích phân bằng $2$.`,
          [{ expr: "integrate(x, (x,0,2))", expect: "2" }],
        )],
        [
          luyen(R`Tính $\int_0^1 2x\,\mathrm{d}x$.`, R`Tích phân bằng $1$.`, [{ expr: "integrate(2*x, (x,0,1))", expect: "1" }]),
          luyen(R`Tính $\int_0^3 1\,\mathrm{d}x$.`, R`Tích phân bằng $3$.`, [{ expr: "integrate(1, (x,0,3))", expect: "3" }]),
          luyen(R`Một nguyên hàm của $3x^2$ tại $x=1$, lấy $\frac{x^3}{1}$ dạng $x^3$, bằng bao nhiêu?`, R`Giá trị nguyên hàm $x^3$ tại $1$ bằng $1$.`, [{ expr: "1**3", expect: "1" }]),
        ],
        { topicId: "integral" },
      ),
    ]),
    chuong("mu-log", "Hàm số mũ và logarit", [
      bai(
        "log-co-so",
        "Logarit theo đổi cơ số",
        R`Với $a>0$, $a\neq 1$ và $b>0$, $\log_a b=\frac{\ln b}{\ln a}$. Đặc biệt $\log_a(a^n)=n$ khi số mũ là số thực và biểu thức xác định.`,
        [vd(
          R`Tính $\log_3 81$.`,
          [
            buoc(R`Vì $81=3^4$, logarit bằng $4$.`, "Định nghĩa: cơ số $3$ mũ $4$ ra đúng $81$."),
            buoc(R`Đổi cơ số cũng cho $\frac{\ln 81}{\ln 3}=4$.`, "Hai cách cùng một kết quả. Mẫu $\\ln 3$ khác $0$ vì cơ số khác $1$."),
          ],
          R`Giá trị bằng $4$.`,
          [{ expr: "log(81)/log(3)", expect: "4" }],
        )],
        [
          luyen(R`Tính $2^5$.`, R`Lũy thừa bằng $32$.`, [{ expr: "2**5", expect: "32" }]),
          luyen(R`Tính $\log_2 32$.`, R`Logarit bằng $5$.`, [{ expr: "log(32)/log(2)", expect: "5" }]),
          luyen(R`Tính $9^{\frac{1}{2}}$.`, R`Căn bằng $3$.`, [{ expr: "9**Rational(1,2)", expect: "3" }]),
        ],
        { topicId: "exp" },
      ),
    ]),
    chuong("phuc", "Số phức", [
      bai(
        "mo-dun",
        "Môđun của số phức",
        R`Số phức $a+bi$ có môđun $\sqrt{a^2+b^2}$. Môđun là khoảng cách từ điểm $(a;b)$ đến gốc tọa độ, nên lấy giá trị không âm.`,
        [vd(
          R`Tính môđun của $3+4i$.`,
          [
            buoc(R`Tổng bình phương phần thực và phần ảo bằng $9+16=25$.`, "Công thức môđun dùng cả hai phần, không chỉ phần thực."),
            buoc(R`Môđun bằng $\sqrt{25}=5$.`, "Căn số học không âm. Điểm $(3;4)$ cách gốc đúng $5$."),
          ],
          R`Môđun bằng $5$.`,
          [{ expr: "Abs(3+4*I)", expect: "5" }],
        )],
        [
          luyen(R`Môđun của $1+i$ bằng bao nhiêu?`, R`Môđun bằng $\sqrt{2}$.`, [{ expr: "Abs(1+I)", expect: "sqrt(2)" }]),
          luyen(R`Tính $(1+i)(1-i)$.`, R`Tích bằng $2$.`, [{ expr: "(1+I)*(1-I)", expect: "2" }]),
          luyen(R`Phần thực của $5-2i$ bằng bao nhiêu?`, R`Phần thực bằng $5$.`, [{ expr: "re(5-2*I)", expect: "5" }]),
        ],
      ),
    ]),
    chuong("oxyz", "Phương pháp tọa độ trong không gian", [
      bai(
        "khoang-cach",
        "Khoảng cách từ một điểm đến gốc",
        R`Trong không gian, điểm $M(x;y;z)$ cách gốc $O$ một đoạn $\sqrt{x^2+y^2+z^2}$. Công thức có đủ ba tọa độ.`,
        [vd(
          R`Tính khoảng cách từ $M(1;2;2)$ đến gốc $O$.`,
          [
            buoc(R`Tổng bình phương bằng $1+4+4=9$.`, "Ba tọa độ đều tham gia. Bỏ tung độ hoặc cao độ sẽ ra một khoảng cách khác."),
            buoc(R`Khoảng cách bằng $\sqrt{9}=3$.`, "Căn không âm của $9$ là $3$ đơn vị dài."),
          ],
          R`Khoảng cách $OM$ bằng $3$.`,
          [{ expr: "sqrt(1**2+2**2+2**2)", expect: "3" }],
        )],
        [
          luyen(R`Khoảng cách từ $(2;3;6)$ đến gốc bằng bao nhiêu?`, R`Khoảng cách bằng $7$.`, [{ expr: "sqrt(2**2+3**2+6**2)", expect: "7" }]),
          luyen(R`Trung điểm của $A(0;0;0)$ và $B(2;4;6)$ có hoành độ bao nhiêu?`, R`Hoành độ trung điểm bằng $1$.`, [{ expr: "(0+2)/2", expect: "1" }]),
          luyen(R`Vectơ $\overrightarrow{AB}$ với $A(1;0;2)$ và $B(4;0;2)$ có độ dài bao nhiêu?`, R`Độ dài bằng $3$.`, [{ expr: "sqrt((4-1)**2+(0-0)**2+(2-2)**2)", expect: "3" }]),
        ],
        { topicId: "analytic" },
      ),
    ]),
  ],
};
