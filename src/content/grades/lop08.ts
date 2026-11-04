import type { GradeBook } from "./types.ts";
import { bai, buoc, chuong, luyen, vd } from "./types.ts";

const R = String.raw;

export const lop08: GradeBook = {
  grade: 8,
  band: "thcs",
  title: "Hằng đẳng thức, phương trình bậc nhất, hình và đường tròn.",
  chapters: [
    chuong("dang-thuc", "Hằng đẳng thức và đa thức", [
      bai(
        "binh-phuong-tong",
        "Bình phương của một tổng",
        R`Hằng đẳng thức $(a+b)^2=a^2+2ab+b^2$ đúng với mọi số $a, b$. Số hạng $2ab$ là hai lần tích, không được bỏ.`,
        [vd(
          R`Tính $(10+3)^2$ bằng hằng đẳng thức.`,
          [
            buoc(R`Khai triển $10^2+2\cdot 10\cdot 3+3^2$.`, "Ba số hạng là bình phương số thứ nhất, hai lần tích, và bình phương số thứ hai."),
            buoc(R`Tổng bằng $100+60+9=169$.`, "Cộng đủ ba số hạng. Kết quả trùng $13^2$."),
          ],
          R`Giá trị bằng $169$.`,
          [{ expr: "(10+3)**2", expect: "169" }],
        )],
        [
          luyen(R`Tính $(5+1)^2$.`, R`Giá trị bằng $36$.`, [{ expr: "(5+1)**2", expect: "36" }]),
          luyen(R`Tính $(a-b)(a+b)$ khi $a=7$ và $b=2$.`, R`Hiệu hai bình phương bằng $45$.`, [{ expr: "7**2-2**2", expect: "45" }]),
          luyen(R`Nhân $2x\cdot 3x$ cho hệ số và lũy thừa khi $x=1$.`, R`Tích bằng $6$ khi $x=1$.`, [{ expr: "2*3*1**2", expect: "6" }]),
        ],
      ),
    ]),
    chuong("pt-b1", "Phương trình và bất phương trình bậc nhất", [
      bai(
        "pt-bac-nhat",
        "Phương trình bậc nhất một ẩn",
        R`Phương trình $ax+b=0$ với $a\neq 0$ có nghiệm duy nhất $x=-\frac{b}{a}$. Nếu $a=0$ thì không dùng công thức này.`,
        [vd(
          R`Giải $3x-12=0$.`,
          [
            buoc(R`Hệ số của $x$ bằng $3$, khác $0$.`, "Đây là điều kiện để phương trình bậc nhất có đúng một nghiệm."),
            buoc(R`Nghiệm là $x=\frac{12}{3}=4$.`, "Chuyển số hạng không chứa $x$ rồi chia cho hệ số của $x$. Thử lại, vế trái bằng $0$."),
          ],
          R`Nghiệm duy nhất là $x=4$.`,
          [{ expr: "3*4-12", expect: "0" }],
        )],
        [
          luyen(R`Giải $2x+8=0$.`, R`Nghiệm là $x=-4$.`, [{ expr: "2*(-4)+8", expect: "0" }]),
          luyen(R`Giải $5x=15$.`, R`Nghiệm là $x=3$.`, [{ expr: "solve(5*x-15, x)[0]", expect: "3" }]),
          luyen(R`Giải $4x-8=0$.`, R`Nghiệm là $x=2$.`, [{ expr: "solve(4*x-8, x)[0]", expect: "2" }]),
        ],
      ),
      bai(
        "bpt-mot-an",
        "Bất phương trình bậc nhất một ẩn",
        R`Với $a>0$, bất phương trình $ax+b>0$ tương đương $x>-\frac{b}{a}$. BPT chặt (dấu $>$) nên nghiệm làm vế trái bằng $0$ không thuộc tập nghiệm. Dạng một ẩn này học trước các bất phương trình hai ẩn của lớp 10.`,
        [vd(
          R`Giải $2x-6>0$.`,
          [
            buoc(R`Hệ số của $x$ bằng $2>0$, nên giữ chiều khi chia.`, "Chia cho số dương không đảo chiều bất phương trình."),
            buoc(R`Ta được $x>3$. BPT chặt (dấu $>$) nên $x=3$ không thuộc tập nghiệm.`, "Tại $x=3$, vế trái bằng $0$, không thỏa dấu lớn hơn."),
          ],
          R`Tập nghiệm là $(3;+\infty)$.`,
          [{ expr: "solve_univariate_inequality(2*x-6>0, x)", expect: "Interval.open(3, oo)" }],
        )],
        [
          luyen(R`Giải $3x+6\le 0$.`, R`Tập nghiệm là $(-\infty;-2]$.`, [{ expr: "solve_univariate_inequality(3*x+6<=0, x)", expect: "Interval(-oo, -2)" }]),
          luyen(R`Giải $-x<4$.`, R`Tập nghiệm là $(-4;+\infty)$.`, [{ expr: "solve_univariate_inequality(-x-4<0, x)", expect: "Interval.open(-4, oo)" }]),
          luyen(R`Số $x=3$ có thuộc tập nghiệm của $2x-6>0$ không?`, R`Không thuộc. BPT chặt (dấu $>$) nên $x=3$ không thuộc tập nghiệm.`, [{ expr: "solve_univariate_inequality(2*x-6>0, x)", expect: "Interval.open(3, oo)" }]),
        ],
      ),
    ]),
    chuong("thales", "Tam giác đồng dạng", [
      bai(
        "ti-so-dong-dang",
        "Tỉ số của hai đoạn tương ứng",
        R`Hai tam giác đồng dạng có các cạnh tương ứng tỉ lệ. Nếu tỉ số đồng dạng bằng $k$ thì mỗi cạnh của tam giác này bằng $k$ lần cạnh tương ứng của tam giác kia.`,
        [vd(
          R`Tam giác nhỏ đồng dạng với tam giác lớn theo tỉ số $\frac{2}{3}$. Cạnh tương ứng của tam giác lớn dài $12$. Cạnh của tam giác nhỏ dài bao nhiêu?`,
          [
            buoc(R`Cạnh nhỏ bằng $\frac{2}{3}\cdot 12$.`, "Tỉ số đồng dạng nhân với cạnh của tam giác lấy làm gốc so sánh."),
            buoc(R`Kết quả bằng $8$.`, "Rút gọn $\\frac{2}{3}$ nhân $12$ được $8$. Đơn vị dài giữ nguyên theo đề."),
          ],
          R`Cạnh của tam giác nhỏ dài $8$.`,
          [{ expr: "Rational(2,3)*12", expect: "8" }],
        )],
        [
          luyen(R`Tỉ số đồng dạng bằng $3$. Cạnh gốc dài $5$. Cạnh tương ứng bằng bao nhiêu?`, R`Cạnh tương ứng dài $15$.`, [{ expr: "3*5", expect: "15" }]),
          luyen(R`Hai đoạn $4$ và $10$ có tỉ số bằng bao nhiêu?`, R`Tỉ số bằng $\frac{2}{5}$.`, [{ expr: "Rational(4,10)", expect: "Rational(2,5)" }]),
          luyen(R`Một đường song song cắt hai cạnh theo tỉ lệ $\frac{1}{2}$. Đoạn lớn dài $18$. Đoạn nhỏ dài bao nhiêu?`, R`Đoạn nhỏ dài $9$.`, [{ expr: "18*Rational(1,2)", expect: "9" }]),
        ],
        { figure: "triangle" },
      ),
    ]),
    chuong("tu-giac", "Tứ giác và đường tròn", [
      bai(
        "chu-vi-tron",
        "Chu vi và diện tích hình tròn",
        R`Đường tròn bán kính $r$ có chu vi $2\pi r$ và diện tích $\pi r^2$. Bán kính là nửa đường kính. Dùng đường kính vào chỗ $r$ làm diện tích lớn gấp bốn lần.`,
        [vd(
          R`Hình tròn có bán kính $5$. Chu vi và diện tích bằng bao nhiêu?`,
          [
            buoc(R`Chu vi bằng $2\pi\cdot 5=10\pi$.`, "Công thức chu vi nhân đôi bán kính rồi nhân với $\\pi$."),
            buoc(R`Diện tích bằng $\pi\cdot 5^2=25\pi$.`, "Bình phương bán kính trước khi nhân $\\pi$. Không bình phương đường kính."),
          ],
          R`Chu vi bằng $10\pi$ và diện tích bằng $25\pi$.`,
          [
            { expr: "2*pi*5", expect: "10*pi" },
            { expr: "pi*5**2", expect: "25*pi" },
          ],
        )],
        [
          luyen(R`Diện tích hình bình hành đáy $6$ và chiều cao $4$ bằng bao nhiêu?`, R`Diện tích bằng $24$.`, [{ expr: "6*4", expect: "24" }]),
          luyen(R`Đường kính bằng $10$. Bán kính bằng bao nhiêu?`, R`Bán kính bằng $5$.`, [{ expr: "10/2", expect: "5" }]),
          luyen(R`Chu vi hình tròn bán kính $1$ bằng bao nhiêu?`, R`Chu vi bằng $2\pi$.`, [{ expr: "2*pi*1", expect: "2*pi" }]),
        ],
        { figure: "circle" },
      ),
    ]),
  ],
};
