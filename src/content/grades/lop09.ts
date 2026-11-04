import type { GradeBook } from "./types.ts";
import { bai, buoc, chuong, luyen, vd } from "./types.ts";

const R = String.raw;

export const lop09: GradeBook = {
  grade: 9,
  band: "thcs",
  title: "Căn bậc hai, hàm số, hệ phương trình và hình không gian đơn giản.",
  chapters: [
    chuong("can", "Căn bậc hai", [
      bai(
        "rut-gon-can",
        "Đưa thừa số ra ngoài căn",
        R`Với $a\ge 0$ và $b\ge 0$, $\sqrt{a^2 b}=a\sqrt{b}$. Căn số học lấy giá trị không âm. Thừa số đưa ra ngoài căn phải không âm.`,
        [vd(
          R`Rút gọn $\sqrt{12}$.`,
          [
            buoc(R`Ta có $12=4\cdot 3$ và $4$ là số chính phương.`, "Tách thừa số chính phương lớn nhất còn trong căn một thừa số không chính phương."),
            buoc(R`Vậy $\sqrt{12}=2\sqrt{3}$.`, "Căn của $4$ bằng $2$, và $2$ không âm nên được đưa ra ngoài căn."),
          ],
          R`Dạng rút gọn là $2\sqrt{3}$.`,
          [{ expr: "sqrt(12)", expect: "2*sqrt(3)" }],
        )],
        [
          luyen(R`Rút gọn $\sqrt{50}$.`, R`Dạng rút gọn là $5\sqrt{2}$.`, [{ expr: "sqrt(50)", expect: "5*sqrt(2)" }]),
          luyen(R`Tính $\sqrt{9}+\sqrt{16}$.`, R`Tổng bằng $7$.`, [{ expr: "sqrt(9)+sqrt(16)", expect: "7" }]),
          luyen(R`Tính $(\sqrt{3})^2$.`, R`Bình phương bằng $3$.`, [{ expr: "sqrt(3)**2", expect: "3" }]),
        ],
      ),
    ]),
    chuong("ham-b1", "Hàm số bậc nhất", [
      bai(
        "y-ax-b",
        "Giá trị của hàm số $y=ax+b$",
        R`Hàm số $y=ax+b$ với $a\neq 0$ là một đường thẳng. Hệ số $a$ là độ dốc: khi $x$ tăng $1$ thì $y$ tăng thêm $a$.`,
        [vd(
          R`Cho $y=2x+1$. Tính $y$ khi $x=3$, và độ tăng của $y$ khi $x$ tăng thêm $1$.`,
          [
            buoc(R`Thay $x=3$ được $y=2\cdot 3+1=7$.`, "Mỗi giá trị của $x$ cho đúng một giá trị của $y$."),
            buoc(R`Khi $x$ tăng $1$, $y$ tăng thêm $2$.`, "Độ dốc chính là hệ số $a=2$. Đây là mức thay đổi của $y$ trên mỗi đơn vị hoành độ."),
          ],
          R`Tại $x=3$, tung độ bằng $7$, và độ dốc bằng $2$.`,
          [{ expr: "2*3+1", expect: "7" }],
        )],
        [
          luyen(R`Cho $y=-x+4$. Tính $y$ khi $x=1$.`, R`Tung độ bằng $3$.`, [{ expr: "-1+4", expect: "3" }]),
          luyen(R`Đường thẳng $y=3x-6$ cắt trục hoành tại điểm có hoành độ bao nhiêu?`, R`Hoành độ giao điểm bằng $2$.`, [{ expr: "6/3", expect: "2" }]),
          luyen(R`Hai điểm trên $y=2x$ có hoành độ $1$ và $4$. Hiệu tung độ bằng bao nhiêu?`, R`Hiệu tung độ bằng $6$.`, [{ expr: "2*4-2*1", expect: "6" }]),
        ],
      ),
    ]),
    chuong("he-pt", "Hệ phương trình bậc nhất hai ẩn", [
      bai(
        "he-hai-an",
        "Giải hệ bằng cộng đại số",
        R`Cộng hoặc trừ từng vế để khử một ẩn khi các hệ số của ẩn đó đối nhau hoặc bằng nhau. Sau khi có một ẩn, thế lại để tìm ẩn còn lại, rồi thử cả hai phương trình.`,
        [vd(
          R`Giải hệ $x+y=5$ và $x-y=1$.`,
          [
            buoc(R`Cộng từng vế được $2x=6$, nên $x=3$.`, "Hệ số của $y$ là $1$ và $-1$, cộng lại thì $y$ bị khử."),
            buoc(R`Thế vào $x+y=5$ được $y=2$.`, "Thử phương trình thứ hai: $3-2=1$, đúng. Cặp $(3;2)$ thỏa cả hệ."),
          ],
          R`Nghiệm là $x=3$ và $y=2$.`,
          [
            { expr: "3+2", expect: "5" },
            { expr: "3-2", expect: "1" },
          ],
        )],
        [
          luyen(R`Giải $x+y=10$ và $x-y=4$.`, R`Nghiệm là $x=7$ và $y=3$.`, [{ expr: "7+3", expect: "10" }]),
          luyen(R`Từ $2x=8$, tìm $x$.`, R`Nghiệm là $x=4$.`, [{ expr: "8/2", expect: "4" }]),
          luyen(R`Cặp $x=1$, $y=1$ có thỏa $x+2y=3$ không?`, R`Có, vì vế trái bằng $3$.`, [{ expr: "1+2*1", expect: "3" }]),
        ],
      ),
    ]),
    chuong("pt-b2", "Phương trình bậc hai", [
      bai(
        "delta",
        "Biệt thức và công thức nghiệm",
        R`Với $a\neq 0$, biệt thức $\Delta=b^2-4ac$. Nếu $\Delta>0$ thì có hai nghiệm phân biệt $x=\frac{-b\pm\sqrt{\Delta}}{2a}$. Dấu của tam thức và bất phương trình bậc hai là nội dung lớp 10. Nếu $a=0$ thì công thức nghiệm không dùng được.`,
        [vd(
          R`Giải $x^2-3x+2=0$.`,
          [
            buoc(R`Ta có $a=1\neq 0$ và $\Delta=9-8=1>0$.`, "Biệt thức dương là điều kiện cần và đủ để có hai nghiệm thực phân biệt."),
            buoc(R`Hai nghiệm là $x=\frac{3\pm 1}{2}$, tức $x=2$ và $x=1$.`, "Công thức nghiệm dùng được vì $a$ khác $0$ và biệt thức không âm."),
          ],
          R`Nghiệm là $x=1$ và $x=2$.`,
          [
            { expr: "solve(x**2-3*x+2, x)[0]", expect: "1" },
            { expr: "solve(x**2-3*x+2, x)[1]", expect: "2" },
          ],
        )],
        [
          luyen(R`Giải $x^2-2x-3=0$.`, R`Hai nghiệm là $x=-1$ và $x=3$.`, [{ expr: "solve(x**2-2*x-3, x)[0]", expect: "-1" }, { expr: "solve(x**2-2*x-3, x)[1]", expect: "3" }]),
          luyen(R`Tính biệt thức của $x^2-2x-3=0$.`, R`Biệt thức bằng $16$.`, [{ expr: "(-2)**2-4*1*(-3)", expect: "16" }]),
          luyen(R`Phương trình $0\cdot x^2+2x-6=0$ có nghiệm nào?`, R`Vì hệ số bậc hai bằng $0$, nghiệm bậc nhất là $x=3$.`, [{ expr: "solve(2*x-6, x)[0]", expect: "3" }]),
        ],
      ),
    ]),
    chuong("lg-vuong", "Hệ thức lượng trong tam giác vuông", [
      bai(
        "pitago",
        "Định lí Pythagore và tỉ số lượng giác",
        R`Trong tam giác vuông, bình phương cạnh huyền bằng tổng bình phương hai cạnh góc vuông. Sin của một góc nhọn là cạnh đối chia cho cạnh huyền.`,
        [vd(
          R`Tam giác vuông có hai cạnh góc vuông $3$ và $4$. Tính cạnh huyền và sin của góc đối diện cạnh $3$.`,
          [
            buoc(R`Cạnh huyền bằng $\sqrt{9+16}=5$.`, "Định lí Pythagore. Căn lấy giá trị không âm."),
            buoc(R`Sin của góc đối diện cạnh $3$ bằng $\frac{3}{5}$.`, "Cạnh đối là $3$, cạnh huyền là $5$. Tỉ số này là sin của góc nhọn đó."),
          ],
          R`Cạnh huyền bằng $5$ và sin bằng $\frac{3}{5}$.`,
          [
            { expr: "sqrt(3**2+4**2)", expect: "5" },
            { expr: "Rational(3,5)", expect: "3/5" },
          ],
        )],
        [
          luyen(R`Cạnh huyền bằng $13$, một cạnh góc vuông bằng $5$. Cạnh góc vuông còn lại bằng bao nhiêu?`, R`Cạnh còn lại bằng $12$.`, [{ expr: "sqrt(13**2-5**2)", expect: "12" }]),
          luyen(R`Cos của góc kề cạnh $4$ và cạnh huyền $5$ bằng bao nhiêu?`, R`Côsin bằng $\frac{4}{5}$.`, [{ expr: "Rational(4,5)", expect: "4/5" }]),
          luyen(R`Tam giác vuông cân cạnh góc vuông $1$ có cạnh huyền bằng bao nhiêu?`, R`Cạnh huyền bằng $\sqrt{2}$.`, [{ expr: "sqrt(1+1)", expect: "sqrt(2)" }]),
        ],
        { figure: "triangle" },
      ),
    ]),
    chuong("khoi", "Hình trụ, hình nón, hình cầu", [
      bai(
        "tru",
        "Thể tích hình trụ",
        R`Hình trụ bán kính đáy $r$ và chiều cao $h$ có thể tích $\pi r^2 h$. Chiều cao phải vuông góc với mặt đáy. Bán kính không phải đường kính.`,
        [vd(
          R`Hình trụ có bán kính đáy $2$ và chiều cao $3$. Thể tích bằng bao nhiêu?`,
          [
            buoc(R`Bình phương bán kính bằng $4$.`, "Dùng bán kính $2$, không thay đường kính $4$ vào công thức."),
            buoc(R`Thể tích bằng $\pi\cdot 4\cdot 3=12\pi$.`, "Nhân diện tích đáy với chiều cao. Hệ số $\\pi$ giữ nguyên trong kết quả chính xác."),
          ],
          R`Thể tích bằng $12\pi$.`,
          [{ expr: "pi*2**2*3", expect: "12*pi" }],
        )],
        [
          luyen(R`Thể tích hình cầu bán kính $3$ bằng $\frac{4}{3}\pi r^3$. Tính thể tích.`, R`Thể tích bằng $36\pi$.`, [{ expr: "Rational(4,3)*pi*27", expect: "36*pi" }]),
          luyen(R`Hình nón cùng đáy bán kính $2$ và cùng chiều cao $3$ có thể tích bằng một phần ba hình trụ. Thể tích nón bằng bao nhiêu?`, R`Thể tích nón bằng $4\pi$.`, [{ expr: "Rational(1,3)*12*pi", expect: "4*pi" }]),
          luyen(R`Đường kính đáy trụ bằng $6$. Bán kính bằng bao nhiêu?`, R`Bán kính bằng $3$.`, [{ expr: "6/2", expect: "3" }]),
        ],
        { figure: "circle" },
      ),
    ]),
  ],
};
