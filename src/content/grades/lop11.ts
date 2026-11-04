import type { GradeBook } from "./types.ts";
import { bai, buoc, chuong, luyen, vd } from "./types.ts";

const R = String.raw;

export const lop11: GradeBook = {
  grade: 11,
  band: "thpt",
  title: "Lượng giác, dãy số, giới hạn và đạo hàm.",
  chapters: [
    chuong("lg", "Hàm số lượng giác", [
      bai(
        "gia-tri",
        "Giá trị lượng giác của góc đặc biệt",
        R`Trên đường tròn đơn vị, côsin là hoành độ và sin là tung độ. Ta có $\sin\frac{\pi}{6}=\frac{1}{2}$ và $\cos\frac{\pi}{3}=\frac{1}{2}$.`,
        [vd(
          R`Tính $\sin\frac{\pi}{6}$ và $\cos\frac{\pi}{3}$.`,
          [
            buoc(R`Góc $\frac{\pi}{6}$ có tung độ $\frac{1}{2}$ trên đường tròn đơn vị.`, "Sin đọc tung độ. Giá trị này đúng, không làm tròn."),
            buoc(R`Góc $\frac{\pi}{3}$ có hoành độ $\frac{1}{2}$.`, "Côsin đọc hoành độ. Hai giá trị này bằng nhau nhưng là hai hàm khác nhau."),
          ],
          R`Cả hai giá trị đều bằng $\frac{1}{2}$.`,
          [
            { expr: "sin(pi/6)", expect: "Rational(1,2)" },
            { expr: "cos(pi/3)", expect: "Rational(1,2)" },
          ],
        )],
        [
          luyen(R`Hãy tính $\sin\frac{5\pi}{6}$.`, R`Sin bằng $\frac{1}{2}$.`, [{ expr: "sin(5*pi/6)", expect: "Rational(1,2)" }]),
          luyen(R`Hãy tính $\cos\frac{5\pi}{6}$.`, R`Côsin bằng $-\frac{\sqrt{3}}{2}$.`, [{ expr: "cos(5*pi/6)", expect: "-sqrt(3)/2" }]),
          luyen(R`Kiểm tra $\sin^2\frac{\pi}{6}+\cos^2\frac{\pi}{6}$.`, R`Tổng bình phương bằng $1$.`, [{ expr: "sin(pi/6)**2+cos(pi/6)**2", expect: "1" }]),
        ],
        { topicId: "trig" },
      ),
      bai(
        "pt-sin",
        "Phương trình $\\sin x=m$ trên một đoạn",
        R`Phương trình $\sin x=m$ có nghiệm khi $m$ thuộc $[-1;1]$. Trên $[0;2\pi]$, nếu $m$ thuộc $(0;1)$ thì có đúng hai nghiệm: một góc và góc bù của nó.`,
        [vd(
          R`Giải $\sin x=\frac{1}{2}$ trên $[0;2\pi]$.`,
          [
            buoc(R`Một nghiệm là $x=\frac{\pi}{6}$.`, "Sin của góc phần sáu bằng $\\frac{1}{2}$, và góc này nằm trong đoạn."),
            buoc(R`Nghiệm còn lại là $x=\frac{5\pi}{6}$.`, "Sin của góc bù bằng sin của góc đó. Cả hai nghiệm đều thuộc $[0;2\\pi]$."),
          ],
          R`Hai nghiệm là $\frac{\pi}{6}$ và $\frac{5\pi}{6}$.`,
          [
            { expr: "sin(pi/6)", expect: "Rational(1,2)" },
            { expr: "sin(5*pi/6)", expect: "Rational(1,2)" },
          ],
        )],
        [
          luyen(R`Hãy tính $\sin\frac{\pi}{4}$.`, R`Sin bằng $\frac{\sqrt{2}}{2}$.`, [{ expr: "sin(pi/4)", expect: "sqrt(2)/2" }]),
          luyen(R`Hãy tính $\sin\frac{3\pi}{4}$.`, R`Sin bằng $\frac{\sqrt{2}}{2}$.`, [{ expr: "sin(3*pi/4)", expect: "sqrt(2)/2" }]),
          luyen(R`Phương trình $\sin x=2$ có nghiệm không?`, R`Không, vì $2$ nằm ngoài $[-1;1]$.`, [{ expr: "2-1", expect: "1" }]),
        ],
        { topicId: "trig" },
      ),
    ]),
    chuong("day", "Dãy số", [
      bai(
        "csc",
        "Cấp số cộng",
        R`Số hạng là $u_n=u_1+(n-1)d$. Tổng $n$ số hạng đầu là $S_n=\frac{n}{2}(u_1+u_n)$. Số bước từ hạng đầu đến hạng $n$ là $n-1$.`,
        [vd(
          R`Cấp số cộng có $u_1=3$ và $d=4$. Tính $u_{10}$ và $S_{10}$.`,
          [
            buoc(R`Ta có $u_{10}=3+9\cdot 4=39$.`, "Từ hạng thứ nhất đến hạng thứ mười có chín công sai."),
            buoc(R`Ta có $S_{10}=\frac{10}{2}(3+39)=210$.`, "Công thức tổng theo hai đầu dùng đúng mười số hạng."),
          ],
          R`Kết quả là $u_{10}=39$ và $S_{10}=210$.`,
          [
            { expr: "3+9*4", expect: "39" },
            { expr: "10*(3+39)/2", expect: "210" },
          ],
        )],
        [
          luyen(R`Với $u_1=2$ và $d=3$, tính $u_5$.`, R`Số hạng thứ năm bằng $14$.`, [{ expr: "2+4*3", expect: "14" }]),
          luyen(R`Với $u_1=2$ và $u_5=14$, công sai bằng bao nhiêu?`, R`Công sai bằng $3$.`, [{ expr: "Rational(14-2,4)", expect: "3" }]),
          luyen(R`Tổng $1+2+\cdots+10$ bằng bao nhiêu?`, R`Tổng bằng $55$.`, [{ expr: "10*11/2", expect: "55" }]),
        ],
        { topicId: "sequence" },
      ),
      bai(
        "csn",
        "Cấp số nhân",
        R`Số hạng là $u_n=u_1 q^{n-1}$. Khi $q\neq 1$, tổng hữu hạn là $S_n=u_1\frac{1-q^n}{1-q}$.`,
        [vd(
          R`Cấp số nhân $u_1=2$, $q=3$. Tính $S_5$.`,
          [
            buoc(R`Vì $q\neq 1$, dùng $S_5=2\cdot\frac{1-3^5}{1-3}$.`, "Mẫu $1-q$ khác $0$ đúng vì công bội khác $1$."),
            buoc(R`Ta có $3^5=243$, nên $S_5=242$.`, "Rút gọn phân số. Đây là tổng năm số hạng, chưa phải tổng vô hạn."),
          ],
          R`Tổng năm số hạng đầu bằng $242$.`,
          [{ expr: "2*(1-3**5)/(1-3)", expect: "242" }],
        )],
        [
          luyen(R`Với $u_1=5$ và $q=2$, tính $u_4$.`, R`Số hạng thứ tư bằng $40$.`, [{ expr: "5*2**3", expect: "40" }]),
          luyen(R`Tổng vô hạn $1+\frac{1}{2}+\frac{1}{4}+\cdots$ bằng bao nhiêu?`, R`Tổng bằng $2$, vì công bội $\frac{1}{2}$ có trị tuyệt đối nhỏ hơn $1$.`, [{ expr: "1/(1-Rational(1,2))", expect: "2" }]),
          luyen(R`Tính $2+4+8+16$.`, R`Tổng bằng $30$.`, [{ expr: "2+4+8+16", expect: "30" }]),
        ],
        { topicId: "sequence" },
      ),
    ]),
    chuong("gioi-han", "Giới hạn", [
      bai(
        "kh-huu-han",
        "Giới hạn dạng không trên không",
        R`Khi thay điểm vào phân thức mà tử và mẫu cùng bằng $0$, chưa có giá trị giới hạn. Rút nhân tử chung rồi tính lại, nếu biểu thức mới xác định tại điểm đó.`,
        [vd(
          R`Tính $\lim_{x\to 2}\frac{x^2-4}{x-2}$.`,
          [
            buoc(R`Với $x\neq 2$, $\frac{x^2-4}{x-2}=x+2$.`, "Hiệu hai bình phương phân tích thành $(x-2)(x+2)$, rồi rút nhân tử $x-2$ khi $x$ khác $2$."),
            buoc(R`Giới hạn bằng $4$.`, "Hàm $x+2$ liên tục tại $2$. Giới hạn không đòi hàm ban đầu có giá trị tại đúng điểm đó."),
          ],
          R`Giới hạn bằng $4$.`,
          [{ expr: "limit((x**2-4)/(x-2), x, 2)", expect: "4" }],
        )],
        [
          luyen(R`Tính $\lim_{x\to 1}\frac{x^2-1}{x-1}$.`, R`Giới hạn bằng $2$.`, [{ expr: "limit((x**2-1)/(x-1), x, 1)", expect: "2" }]),
          luyen(R`Tính $\lim_{x\to +\infty}\frac{2x+500}{x}$.`, R`Giới hạn bằng $2$.`, [{ expr: "limit((2*x+500)/x, x, oo)", expect: "2" }]),
          luyen(R`Tính $\lim_{x\to 0}\frac{\sin x}{x}$.`, R`Giới hạn bằng $1$, với $x$ tính bằng radian.`, [{ expr: "limit(sin(x)/x, x, 0)", expect: "1" }]),
        ],
        { topicId: "limit" },
      ),
    ]),
    chuong("dao-ham", "Đạo hàm", [
      bai(
        "da-thuc",
        "Đạo hàm của đa thức",
        R`Đạo hàm của $x^n$ là $nx^{n-1}$ với $n$ nguyên dương. Đạo hàm của tổng bằng tổng các đạo hàm. Hệ số hằng có đạo hàm bằng $0$.`,
        [vd(
          R`Cho $f(x)=x^3-3x$. Tính $f'(2)$.`,
          [
            buoc(R`Công thức đạo hàm cho $f'(x)=3x^2-3$.`, "Đạo hàm của $x^3$ là $3x^2$, đạo hàm của $-3x$ là $-3$."),
            buoc(R`Thay $x=2$ được $f'(2)=12-3=9$.`, "Đây là hệ số góc của tiếp tuyến tại hoành độ $2$."),
          ],
          R`Đạo hàm tại $2$ bằng $9$.`,
          [{ expr: "diff(x**3-3*x, x).subs(x,2)", expect: "9" }],
        )],
        [
          luyen(R`Đạo hàm của $x^2$ tại $x=3$ bằng bao nhiêu?`, R`Đạo hàm bằng $6$.`, [{ expr: "diff(x**2, x).subs(x,3)", expect: "6" }]),
          luyen(R`Đạo hàm của $5x+1$ bằng bao nhiêu?`, R`Đạo hàm bằng hằng số $5$.`, [{ expr: "diff(5*x+1, x)", expect: "5" }]),
          luyen(R`Đạo hàm của $x^3-3x$ tại $x=1$ bằng bao nhiêu?`, R`Đạo hàm bằng $0$.`, [{ expr: "diff(x**3-3*x, x).subs(x,1)", expect: "0" }]),
        ],
        { topicId: "derivative" },
      ),
    ]),
    chuong("to-hop", "Tổ hợp", [
      bai(
        "to-hop-bai",
        "Tổ hợp chập k",
        R`Số cách chọn $k$ phần tử từ $n$ phần tử, không kể thứ tự, là $C_n^k=\frac{n!}{k!(n-k)!}$. Có kể thứ tự thì dùng chỉnh hợp, không chia cho $k!$.`,
        [vd(
          R`Số cách chọn $2$ bạn từ $5$ bạn, không phân biệt vai trò, bằng bao nhiêu?`,
          [
            buoc(R`Không phân biệt vai trò nên dùng tổ hợp $C_5^2$.`, "Đổi chỗ hai bạn trong một cặp không tạo một cách mới."),
            buoc(R`Ta có $C_5^2=\frac{5\cdot 4}{2}=10$.`, "Chia cho $2!$ vì mỗi cặp bị đếm hai lần trong tích có thứ tự."),
          ],
          R`Có $10$ cách.`,
          [{ expr: "binomial(5,2)", expect: "10" }],
        )],
        [
          luyen(R`Tính $C_6^1$.`, R`Tổ hợp bằng $6$.`, [{ expr: "binomial(6,1)", expect: "6" }]),
          luyen(R`Tính $A_5^2=5\cdot 4$.`, R`Chỉnh hợp bằng $20$.`, [{ expr: "5*4", expect: "20" }]),
          luyen(R`Hệ số của $x^2$ trong $(1+x)^5$ bằng bao nhiêu?`, R`Hệ số bằng $10$.`, [{ expr: "binomial(5,2)", expect: "10" }]),
        ],
        { topicId: "combo" },
      ),
    ]),
  ],
};
