import type { GradeBook } from "./types.ts";
import { bai, buoc, chuong, luyen, vd } from "./types.ts";

const R = String.raw;

export const lop09: GradeBook = {
  grade: 9,
  band: "thcs",
  title: "Căn bậc hai và căn bậc ba, hàm số bậc hai, bất phương trình, đường tròn, xác suất, và một chương ôn thi vào lớp 10.",
  chapters: [
    chuong("can", "Căn bậc hai", [
      bai(
        "rut-gon-can",
        "Đưa thừa số ra ngoài căn",
        R`Với $b\ge 0$, $\sqrt{a^2 b}=|a|\sqrt{b}$. Căn số học không âm, nên thừa số đưa ra ngoài căn là trị tuyệt đối của $a$, không phải chính $a$ khi $a$ âm.`,
        [vd(
          R`Rút gọn $\sqrt{12}$.`,
          [
            buoc(R`Viết $12=2^2\cdot 3$.`, "Số $4$ là số chính phương, và $3$ không phải số chính phương. Tách $12$ thành tích của hai số này."),
            buoc(R`Vậy $\sqrt{12}=|2|\sqrt{3}=2\sqrt{3}$.`, "Công thức đưa thừa số ra ngoài căn dùng trị tuyệt đối. Ở đây $|2|=2$."),
          ],
          R`Dạng rút gọn là $2\sqrt{3}$.`,
          [{ expr: "sqrt(12)", expect: "2*sqrt(3)" }],
        )],
        [
          luyen(R`Rút gọn $\sqrt{50}$.`, R`Dạng rút gọn là $5\sqrt{2}$.`, [{ expr: "sqrt(50)", expect: "5*sqrt(2)" }], "Tách $50=25\\cdot 2$. Căn của $25$ bằng $5$ và được đưa ra ngoài căn."),
          luyen(R`Tính $\sqrt{9}+\sqrt{16}$.`, R`Tổng bằng $7$.`, [{ expr: "sqrt(9)+sqrt(16)", expect: "7" }], "Mỗi căn của số chính phương là một số nguyên không âm. Cộng $3$ với $4$."),
          luyen(R`Rút gọn $\sqrt{(-3)^2\cdot 2}$.`, R`Dạng rút gọn là $3\sqrt{2}$.`, [{ expr: "sqrt((-3)**2*2)", expect: "Abs(-3)*sqrt(2)" }], "Vì $-3$ âm, thừa số đưa ra ngoài căn là $|-3|=3$, không phải $-3$."),
        ],
      ),
      bai(
        "nhan-can",
        "Nhân hai căn bậc hai",
        R`Với $a\ge 0$ và $b\ge 0$, $\sqrt{a}\cdot\sqrt{b}=\sqrt{ab}$. Điều kiện không âm giữ cho cả hai căn số học.`,
        [vd(
          R`Tính $\sqrt{3}\cdot\sqrt{12}$.`,
          [
            buoc(R`Tích hai căn bằng $\sqrt{3\cdot 12}=\sqrt{36}$.`, "Nhân các số trong căn khi cả hai đều không âm."),
            buoc(R`Căn số học của $36$ bằng $6$.`, "Số $36$ là số chính phương. Căn lấy giá trị không âm."),
          ],
          R`Tích bằng $6$.`,
          [{ expr: "sqrt(3)*sqrt(12)", expect: "6" }],
        )],
        [
          luyen(R`Tính $\sqrt{8}\cdot\sqrt{2}$.`, R`Tích bằng $4$.`, [{ expr: "sqrt(8)*sqrt(2)", expect: "4" }], "Tích trong căn bằng $16$. Căn số học của $16$ bằng $4$."),
          luyen(R`Tính $\sqrt{5}\cdot\sqrt{5}$.`, R`Tích bằng $5$.`, [{ expr: "sqrt(5)*sqrt(5)", expect: "5" }], "Tích hai căn cùng một số không âm bằng chính số đó."),
          luyen(R`Rút gọn $\sqrt{18}\cdot\sqrt{2}$.`, R`Tích bằng $6$.`, [{ expr: "sqrt(18)*sqrt(2)", expect: "6" }], "Tích trong căn bằng $36$. Căn số học bằng $6$."),
        ],
      ),
      bai(
        "can-bac-ba",
        "Căn bậc ba",
        R`Căn bậc ba của số $a$ là số $x$ sao cho $x^3=a$. Mọi số thực đều có đúng một căn bậc ba. Căn bậc ba của số âm là số âm.`,
        [vd(
          R`Tính $\sqrt[3]{27}$ và $\sqrt[3]{-8}$.`,
          [
            buoc(R`Vì $3^3=27$ nên $\sqrt[3]{27}=3$.`, R`Tìm số có lập phương bằng số dưới dấu căn.`),
            buoc(R`Vì $(-2)^3=-8$ nên $\sqrt[3]{-8}=-2$.`, R`Lập phương của một số âm là số âm, nên căn bậc ba của số âm tồn tại.`),
          ],
          R`Hai giá trị là $3$ và $-2$.`,
          [{ expr: "real_root(27,3)", expect: "3" }, { expr: "real_root(-8,3)", expect: "-2" }],
        )],
        [
          luyen(R`Tính $\sqrt[3]{64}$.`, R`Kết quả bằng $4$.`, [{ expr: "real_root(64,3)", expect: "4" }], R`Ta có $4^3=64$, nên căn bậc ba của $64$ là $4$.`),
          luyen(R`Tính $\sqrt[3]{-125}$.`, R`Kết quả bằng $-5$.`, [{ expr: "real_root(-125,3)", expect: "-5" }], R`Ta có $(-5)^3=-125$, nên căn bậc ba là $-5$.`),
          luyen(R`Một khối lập phương có thể tích $216$ xentimét khối. Cạnh của khối dài bao nhiêu xentimét?`, R`Cạnh dài $6$ xentimét.`, [{ expr: "real_root(216,3)", expect: "6" }], R`Thể tích bằng lập phương của cạnh, và $6^3=216$.`),
        ],
        {
          whyTrue: R`Hàm số $y=x^3$ luôn tăng và nhận mọi giá trị thực. Vì thế với mỗi số $a$ có đúng một số $x$ thỏa $x^3=a$, kể cả khi $a$ âm.`,
          pitfalls: R`Cho rằng số âm không có căn bậc ba, giống như căn bậc hai. Căn bậc ba của số âm tồn tại và là số âm.`,
        },
      ),
    ]),
    chuong("ham-b2", "Hàm số $y=ax^2$", [
      bai(
        "y-ax2",
        "Hàm số $y=ax^2$",
        R`Hàm số $y=ax^2$ với $a\neq 0$ có đồ thị là một parabol đỉnh $O$. Nếu $a>0$ thì giá trị nhỏ nhất bằng $0$ tại $x=0$. Nếu $a<0$ thì giá trị lớn nhất bằng $0$ tại $x=0$.`,
        [vd(
          R`Cho $y=x^2$ và $y=-2x^2$. Tính giá trị tại $x=3$ của hàm thứ nhất, và cho biết hàm thứ hai đạt giá trị lớn nhất bằng bao nhiêu.`,
          [
            buoc(R`Tại $x=3$, $y=3^2=9$.`, "Hệ số $a=1>0$. Parabol nằm phía trên trục hoành và có giá trị nhỏ nhất $0$ tại đỉnh."),
            buoc(R`Hàm $y=-2x^2$ có $a<0$, nên giá trị lớn nhất bằng $0$ tại $x=0$.`, "Mọi giá trị khác của $-2x^2$ đều âm. Đỉnh vẫn là gốc tọa độ."),
          ],
          R`Giá trị $x^2$ tại $x=3$ bằng $9$. Giá trị lớn nhất của $-2x^2$ bằng $0$.`,
          [{ expr: "3**2", expect: "9" }, { expr: "(-2)*0**2", expect: "0" }],
        )],
        [
          luyen(R`Tính $y=2x^2$ tại $x=4$.`, R`Tung độ bằng $32$.`, [{ expr: "2*4**2", expect: "32" }], "Bình phương hoành độ trước, rồi nhân hệ số $2$. Hệ số dương nên tung độ không âm."),
          luyen(R`Tính $y=-x^2$ tại $x=5$.`, R`Tung độ bằng $-25$.`, [{ expr: "-(5**2)", expect: "-25" }], "Hệ số âm nên tung độ âm khi $x$ khác $0$. Bình phương $5$ bằng $25$."),
          luyen(R`Đỉnh của parabol $y=ax^2$ có tọa độ nào?`, R`Đỉnh là gốc $O(0;0)$.`, [{ expr: "0*0**2", expect: "0" }], "Công thức $y=ax^2$ không có hạng tử bậc nhất, nên trục đối xứng là trục tung và đỉnh nằm tại gốc."),
        ],
      ),
      bai(
        "doi-xung",
        "Tính đối xứng của đồ thị $y=ax^2$",
        R`Đồ thị $y=ax^2$ nhận trục tung làm trục đối xứng, vì $a(-x)^2=ax^2$. Hai điểm có hoành độ đối nhau thì có cùng tung độ.`,
        [vd(
          R`Cho $y=3x^2$. So sánh tung độ tại $x=2$ và tại $x=-2$.`,
          [
            buoc(R`Tại $x=2$, tung độ bằng $3\cdot 4=12$.`, "Bình phương của $2$ bằng $4$, rồi nhân hệ số $3$."),
            buoc(R`Tại $x=-2$, bình phương vẫn bằng $4$, nên tung độ cũng bằng $12$.`, "Bình phương của số đối bằng bình phương của chính số đó. Đây là lí do đồ thị đối xứng qua trục tung."),
          ],
          R`Hai tung độ cùng bằng $12$.`,
          [{ expr: "3*2**2", expect: "12" }, { expr: "3*((-2)**2)", expect: "12" }],
        )],
        [
          luyen(R`Cho $y=x^2$. Hiệu tung độ tại $x=4$ và tại $x=-4$ bằng bao nhiêu?`, R`Hiệu bằng $0$.`, [{ expr: "4**2-(-4)**2", expect: "0" }], "Hai hoành độ đối nhau cho cùng một bình phương. Hiệu hai tung độ bằng $0$."),
          luyen(R`Tính $y=\frac{1}{2}x^2$ tại $x=6$.`, R`Tung độ bằng $18$.`, [{ expr: "Rational(1,2)*6**2", expect: "18" }], "Bình phương $6$ bằng $36$. Một nửa của $36$ bằng $18$."),
          luyen(R`Hệ số $a$ của $y=-3x^2$ cho giá trị lớn nhất hay nhỏ nhất tại đỉnh?`, R`Cho giá trị lớn nhất, và giá trị đó bằng $0$.`, [{ expr: "(-3)*0**2", expect: "0" }], "Hệ số âm làm parabol quay bề lõm xuống. Đỉnh là điểm cao nhất."),
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
          [{ expr: "solve([x+y-5, x-y-1],[x,y])[x]", expect: "3" }, { expr: "solve([x+y-5, x-y-1],[x,y])[y]", expect: "2" }],
        )],
        [
          luyen(R`Giải $x+y=10$ và $x-y=4$.`, R`Nghiệm là $x=7$ và $y=3$.`, [{ expr: "solve([x+y-10, x-y-4],[x,y])[x]", expect: "7" }], "Cộng hai phương trình để khử $y$. Nghiệm $x=7$ được thế lại để tìm $y=3$."),
          luyen(R`Từ $2x=8$, tìm $x$.`, R`Nghiệm là $x=4$.`, [{ expr: "solve(2*x-8, x)[0]", expect: "4" }], "Hệ số của $x$ khác $0$. Chia cả hai vế cho $2$."),
          luyen(R`Cặp $x=1$, $y=1$ có thỏa $x+2y=3$ không?`, R`Có, vì vế trái bằng $3$.`, [{ expr: "1+2*1", expect: "3" }], "Thay cả hai ẩn vào cùng một phương trình. Vế trái khớp vế phải."),
        ],
      ),
      bai(
        "he-the",
        "Giải hệ bằng thế",
        R`Từ một phương trình, rút một ẩn theo ẩn kia rồi thế vào phương trình còn lại. Nghiệm của phương trình một ẩn được thay trở lại để tìm ẩn đã rút.`,
        [vd(
          R`Giải hệ $y=2x$ và $x+y=9$.`,
          [
            buoc(R`Thế $y=2x$ vào phương trình thứ hai được $x+2x=9$.`, "Phương trình thứ nhất đã cho $y$ theo $x$. Thế là thay đúng biểu thức đó."),
            buoc(R`Suy ra $3x=9$, nên $x=3$ và $y=6$.`, "Chia cho hệ số khác $0$. Thay lại $y=2\\cdot 3$ được $6$, và $3+6=9$."),
          ],
          R`Nghiệm là $x=3$ và $y=6$.`,
          [{ expr: "solve([y-2*x, x+y-9],[x,y])[x]", expect: "3" }],
        )],
        [
          luyen(R`Giải $y=x+1$ và $x+y=7$.`, R`Nghiệm là $x=3$ và $y=4$.`, [{ expr: "solve([y-x-1, x+y-7],[x,y])[y]", expect: "4" }], "Thế $y$ vào phương trình tổng. Nghiệm thỏa cả hai phương trình của hệ."),
          luyen(R`Từ $y=3x$ và $y=12$, tìm $x$.`, R`Nghiệm là $x=4$.`, [{ expr: "solve(3*x-12, x)[0]", expect: "4" }], "Hai biểu thức của $y$ bằng nhau. Chia $12$ cho hệ số $3$."),
          luyen(R`Cặp $x=2$, $y=5$ có thỏa $y=2x+1$ không?`, R`Có, vì vế phải bằng $5$.`, [{ expr: "2*2+1", expect: "5" }], "Thay hoành độ vào biểu thức. Kết quả trùng tung độ đã cho."),
        ],
      ),
    ]),
    chuong("pt-b2", "Phương trình bậc hai", [
      bai(
        "delta",
        "Biệt thức và ba trường hợp nghiệm",
        R`Với $a\neq 0$, biệt thức $\Delta=b^2-4ac$. Nếu $\Delta>0$ thì có hai nghiệm phân biệt $x=\frac{-b\pm\sqrt{\Delta}}{2a}$. Nếu $\Delta=0$ thì có nghiệm kép $x=-\frac{b}{2a}$. Nếu $\Delta<0$ thì phương trình vô nghiệm trong tập số thực. Nếu $a=0$ thì công thức này không dùng được.`,
        [vd(
          R`Xét $x^2-2x+1=0$ và $x^2+1=0$.`,
          [
            buoc(R`Với $x^2-2x+1$, ta có $\Delta=4-4=0$, nên nghiệm kép $x=1$.`, "Biệt thức bằng $0$ là điều kiện của nghiệm kép. Công thức còn một giá trị $x=-\\frac{b}{2a}$."),
            buoc(R`Với $x^2+1$, ta có $\Delta=-4<0$, nên vô nghiệm thực.`, "Biệt thức âm thì căn của biệt thức không là số thực. Tập nghiệm thực là tập rỗng."),
          ],
          R`Phương trình thứ nhất có nghiệm kép $x=1$. Phương trình thứ hai vô nghiệm thực vì $\Delta<0$.`,
          [
            { expr: "(-2)**2-4*1*1", expect: "0" },
            { expr: "solve(x**2-2*x+1, x)[0]", expect: "1" },
            { expr: "solveset(x**2+1, x, S.Reals)", expect: "EmptySet" },
          ],
        )],
        [
          luyen(R`Giải $x^2-3x+2=0$.`, R`Vì $\Delta=1>0$, hai nghiệm là $x=1$ và $x=2$.`, [{ expr: "solve(x**2-3*x+2, x)[0]", expect: "1" }, { expr: "solve(x**2-3*x+2, x)[1]", expect: "2" }], "Biệt thức dương cho hai nghiệm thực phân biệt. Công thức nghiệm dùng được vì hệ số bậc hai khác $0$."),
          luyen(R`Tính $\Delta$ của $x^2+x+1=0$.`, R`Biệt thức bằng $-3$, nên $\Delta<0$ và phương trình vô nghiệm thực.`, [{ expr: "1**2-4*1*1", expect: "-3" }], "Bình phương hệ số bậc nhất trừ bốn lần tích hai hệ số còn lại. Kết quả âm nên không có nghiệm thực."),
          luyen(R`Phương trình $0\cdot x^2+2x-6=0$ có nghiệm nào?`, R`Vì hệ số bậc hai bằng $0$, đây là phương trình bậc nhất và nghiệm là $x=3$.`, [{ expr: "solve(2*x-6, x)[0]", expect: "3" }], "Công thức biệt thức không dùng khi $a=0$. Phương trình còn lại là bậc nhất một ẩn."),
        ],
      ),
      bai(
        "viete",
        "Định lí Vi-ét",
        R`Nếu $x^2+bx+c=0$ có hai nghiệm thì tổng hai nghiệm bằng $-b$ và tích hai nghiệm bằng $c$. Với phương trình $ax^2+bx+c=0$, $a\neq 0$, tổng bằng $-\frac{b}{a}$ và tích bằng $\frac{c}{a}$, khi các nghiệm tồn tại.`,
        [vd(
          R`Phương trình $x^2-5x+6=0$ có hai nghiệm. Tính tổng và tích hai nghiệm theo định lí Vi-ét, rồi đối chiếu.`,
          [
            buoc(R`Tổng bằng $5$ và tích bằng $6$.`, "Hệ số bậc hai bằng $1$. Tổng là số đối của hệ số bậc nhất, tích là hạng tử tự do."),
            buoc(R`Hai nghiệm $2$ và $3$ có tổng $5$ và tích $6$.`, "Đối chiếu với nghiệm tìm được. Định lí Vi-ét khớp cả tổng lẫn tích."),
          ],
          R`Tổng hai nghiệm bằng $5$ và tích hai nghiệm bằng $6$.`,
          [
            { expr: "solve(x**2-5*x+6, x)[0]+solve(x**2-5*x+6, x)[1]", expect: "5" },
            { expr: "solve(x**2-5*x+6, x)[0]*solve(x**2-5*x+6, x)[1]", expect: "6" },
          ],
        )],
        [
          luyen(R`Phương trình $x^2+3x-4=0$ có tổng hai nghiệm bằng bao nhiêu?`, R`Tổng bằng $-3$.`, [{ expr: "solve(x**2+3*x-4, x)[0]+solve(x**2+3*x-4, x)[1]", expect: "-3" }], "Định lí Vi-ét lấy số đối của hệ số bậc nhất khi hệ số bậc hai bằng $1$."),
          luyen(R`Cùng phương trình đó, tích hai nghiệm bằng bao nhiêu?`, R`Tích bằng $-4$.`, [{ expr: "solve(x**2+3*x-4, x)[0]*solve(x**2+3*x-4, x)[1]", expect: "-4" }], "Tích hai nghiệm bằng hạng tử tự do khi hệ số của $x^2$ bằng $1$."),
          luyen(R`Phương trình $2x^2-8x+6=0$ có tổng hai nghiệm bằng bao nhiêu?`, R`Tổng bằng $4$.`, [{ expr: "-(-8)/2", expect: "4" }], "Tổng bằng trừ hệ số bậc nhất, chia cho hệ số bậc hai. Mẫu $2$ khác $0$."),
        ],
      ),
    ]),
    chuong("bpt", "Bất phương trình bậc nhất một ẩn", [
      bai(
        "bpt-mot-an",
        "Bất phương trình bậc nhất một ẩn",
        R`Với $a>0$, bất phương trình $ax+b>0$ tương đương $x>-\frac{b}{a}$. Bất phương trình chặt, dấu lớn hơn, nên nghiệm làm vế trái bằng $0$ không thuộc tập nghiệm. Dạng một ẩn này học trước các bất phương trình hai ẩn của lớp 10.`,
        [vd(
          R`Giải bất phương trình $2x-6>0$.`,
          [
            buoc(R`Hệ số của $x$ bằng $2>0$, nên giữ chiều khi chia.`, "Chia cho số dương không đảo chiều bất phương trình."),
            buoc(R`Ta được $x>3$. Bất phương trình chặt, dấu lớn hơn, nên $x=3$ không thuộc tập nghiệm.`, "Tại $x=3$, vế trái bằng $0$, không thỏa dấu lớn hơn."),
          ],
          R`Tập nghiệm là $(3;+\infty)$.`,
          [{ expr: "solve_univariate_inequality(2*x-6>0, x, relational=False)", expect: "Interval.open(3, oo)" }],
        )],
        [
          luyen(R`Giải bất phương trình $3x+6\le 0$.`, R`Tập nghiệm là $(-\infty;-2]$.`, [{ expr: "solve_univariate_inequality(3*x+6<=0, x, relational=False)", expect: "Interval(-oo, -2)" }], "Hệ số của $x$ dương nên giữ chiều. Dấu nhỏ hơn hoặc bằng nhận cả điểm làm vế trái bằng $0$."),
          luyen(R`Giải bất phương trình $x-1\ge 0$.`, R`Tập nghiệm là $[1;+\infty)$.`, [{ expr: "solve_univariate_inequality(x-1>=0, x, relational=False)", expect: "Interval(1, oo)" }], "Nghiệm biên $x=1$ làm vế trái bằng $0$ và được nhận vì bất phương trình không chặt."),
          luyen(R`Số $x=3$ có thuộc tập nghiệm của bất phương trình $2x-6>0$ không?`, R`Không thuộc. Bất phương trình chặt, dấu lớn hơn, nên $x=3$ không thuộc tập nghiệm.`, [{ expr: "solve_univariate_inequality(2*x-6>0, x, relational=False)", expect: "Interval.open(3, oo)" }], "Điểm biên của một bất phương trình chặt bị loại. Tập nghiệm là khoảng mở."),
        ],
      ),
      bai(
        "bpt-am",
        "Chia cho số âm thì đổi chiều",
        R`Khi nhân hoặc chia cả hai vế của một bất phương trình cho một số âm, chiều của bất phương trình đổi ngược. Chia cho số dương thì giữ chiều.`,
        [vd(
          R`Giải bất phương trình $-x<4$.`,
          [
            buoc(R`Nhân cả hai vế với $-1$ và đổi chiều, được $x>-4$.`, "Thừa số $-1$ âm, nên dấu nhỏ hơn đổi thành dấu lớn hơn."),
            buoc(R`Tập nghiệm là $(-4;+\infty)$.`, "Bất phương trình chặt nên $-4$ không thuộc tập nghiệm. Mọi số lớn hơn $-4$ đều thỏa."),
          ],
          R`Tập nghiệm là $(-4;+\infty)$.`,
          [{ expr: "solve_univariate_inequality(-x-4<0, x, relational=False)", expect: "Interval.open(-4, oo)" }],
        )],
        [
          luyen(R`Giải bất phương trình $-2x\ge 6$.`, R`Tập nghiệm là $(-\infty;-3]$.`, [{ expr: "solve_univariate_inequality(-2*x-6>=0, x, relational=False)", expect: "Interval(-oo, -3)" }], "Chia cho $-2$ thì đổi chiều. Dấu lớn hơn hoặc bằng đổi thành nhỏ hơn hoặc bằng, và $-3$ được nhận."),
          luyen(R`Giải bất phương trình $-x+1>0$.`, R`Tập nghiệm là $(-\infty;1)$.`, [{ expr: "solve_univariate_inequality(-x+1>0, x, relational=False)", expect: "Interval.open(-oo, 1)" }], "Đưa về $-x>-1$, rồi đổi chiều khi nhân với $-1$. Điểm $1$ không thuộc tập nghiệm."),
          luyen(R`Số $x=-4$ có thuộc tập nghiệm của $-x<4$ không?`, R`Không thuộc, vì bất phương trình chặt loại điểm làm hai vế bằng nhau.`, [{ expr: "solve_univariate_inequality(-x-4<0, x, relational=False)", expect: "Interval.open(-4, oo)" }], "Tại $x=-4$, hai vế cùng bằng $4$. Dấu nhỏ hơn không nhận trường hợp bằng."),
        ],
      ),
    ]),
    chuong("lg-vuong", "Tỉ số lượng giác của góc nhọn", [
      bai(
        "ti-so-lg",
        "Sin, côsin và tang của góc nhọn",
        R`Trong tam giác vuông, sin của một góc nhọn bằng cạnh đối chia cho cạnh huyền, côsin bằng cạnh kề chia cho cạnh huyền, và tang bằng cạnh đối chia cho cạnh kề.`,
        [vd(
          R`Tam giác vuông có cạnh đối một góc nhọn bằng $3$, cạnh kề bằng $4$ và cạnh huyền bằng $5$. Tính sin và côsin của góc đó.`,
          [
            buoc(R`Sin bằng $\frac{3}{5}$.`, "Cạnh đối là $3$, cạnh huyền là $5$. Tỉ số này là sin của góc nhọn đã chọn."),
            buoc(R`Côsin bằng $\frac{4}{5}$.`, "Cạnh kề góc đó là $4$. Cùng cạnh huyền $5$ ở mẫu."),
          ],
          R`Sin bằng $\frac{3}{5}$ và côsin bằng $\frac{4}{5}$.`,
          [{ expr: "Rational(3,5)", expect: "3/5" }, { expr: "Rational(4,5)", expect: "4/5" }],
        )],
        [
          luyen(R`Cùng tam giác trên, tang của góc đối diện cạnh $3$ bằng bao nhiêu?`, R`Tang bằng $\frac{3}{4}$.`, [{ expr: "Rational(3,4)", expect: "3/4" }], "Tang là cạnh đối chia cho cạnh kề. Mẫu là cạnh $4$, không phải cạnh huyền."),
          luyen(R`Góc nhọn có cạnh kề $8$ và cạnh huyền $10$. Côsin bằng bao nhiêu?`, R`Côsin bằng $\frac{4}{5}$.`, [{ expr: "Rational(8,10)", expect: "Rational(4,5)" }], "Chia cạnh kề cho cạnh huyền rồi rút gọn. Ước chung của $8$ và $10$ là $2$."),
          luyen(R`Sin của một góc nhọn bằng $\frac{5}{13}$ và cạnh huyền bằng $13$. Cạnh đối bằng bao nhiêu?`, R`Cạnh đối bằng $5$.`, [{ expr: "13*Rational(5,13)", expect: "5" }], "Cạnh đối bằng cạnh huyền nhân với sin của góc đó."),
        ],
        { figure: "triangle" },
      ),
      bai(
        "canh-lg",
        "Tính cạnh bằng tỉ số lượng giác",
        R`Biết cạnh huyền và một tỉ số thì cạnh góc vuông bằng cạnh huyền nhân với sin hoặc với côsin tương ứng. Tang dùng khi biết một cạnh góc vuông và cần cạnh góc vuông còn lại.`,
        [vd(
          R`Cạnh huyền bằng $10$ và sin của một góc nhọn bằng $\frac{3}{5}$. Cạnh đối góc đó bằng bao nhiêu?`,
          [
            buoc(R`Cạnh đối bằng cạnh huyền nhân sin.`, "Đảo định nghĩa sin. Mẫu của tỉ số là cạnh huyền, tử là cạnh đối."),
            buoc(R`Vậy cạnh đối bằng $10\cdot\frac{3}{5}=6$.`, "Rút gọn $\\frac{10}{5}$ trước khi nhân với $3$. Kết quả là độ dài cạnh đối."),
          ],
          R`Cạnh đối bằng $6$.`,
          [{ expr: "10*Rational(3,5)", expect: "6" }],
        )],
        [
          luyen(R`Cạnh huyền $13$, côsin của góc nhọn bằng $\frac{5}{13}$. Cạnh kề bằng bao nhiêu?`, R`Cạnh kề bằng $5$.`, [{ expr: "13*Rational(5,13)", expect: "5" }], "Cạnh kề bằng cạnh huyền nhân với côsin. Tích rút gọn còn $5$."),
          luyen(R`Cạnh đối bằng $6$ và tang bằng $\frac{3}{4}$. Cạnh kề bằng bao nhiêu?`, R`Cạnh kề bằng $8$.`, [{ expr: "6/Rational(3,4)", expect: "8" }], "Tang bằng đối chia kề, nên cạnh kề bằng cạnh đối chia cho tang."),
          luyen(R`Cạnh huyền $25$ và cạnh đối $7$. Sin của góc đối cạnh $7$ bằng bao nhiêu?`, R`Sin bằng $\frac{7}{25}$.`, [{ expr: "Rational(7,25)", expect: "7/25" }], "Sin là tỉ số cạnh đối trên cạnh huyền. Hai số đã cho chưa có ước chung lớn hơn $1$."),
        ],
      ),
    ]),
    chuong("tron", "Đường tròn", [
      bai(
        "tiep-tuyen",
        "Tiếp tuyến của đường tròn",
        R`Tiếp tuyến vuông góc với bán kính tại tiếp điểm. Nếu từ một điểm ngoài đường tròn kẻ một tiếp tuyến, thì bình phương độ dài tiếp tuyến bằng hiệu giữa bình phương khoảng cách tới tâm và bình phương bán kính.`,
        [vd(
          R`Đường tròn tâm $O$ bán kính $5$. Điểm $A$ cách $O$ một đoạn $13$. Tiếp tuyến kẻ từ $A$ chạm đường tròn tại $H$. Tính $AH$.`,
          [
            buoc(R`Tam giác $OHA$ vuông tại $H$, vì tiếp tuyến vuông góc với bán kính $OH$.`, "Tiếp điểm là chân của bán kính vuông góc với tiếp tuyến."),
            buoc(R`Độ dài $AH$ bằng $\sqrt{13^2-5^2}=12$.`, "Cạnh góc vuông còn lại lấy căn không âm của hiệu hai bình phương."),
          ],
          R`Đoạn tiếp tuyến $AH$ dài $12$.`,
          [{ expr: "sqrt(13**2-5**2)", expect: "12" }],
        )],
        [
          luyen(R`Tâm cách điểm ngoài một đoạn $10$, bán kính bằng $6$. Đoạn tiếp tuyến dài bao nhiêu?`, R`Đoạn tiếp tuyến dài $8$.`, [{ expr: "sqrt(10**2-6**2)", expect: "8" }], "Tam giác vuông tại tiếp điểm. Hiệu $100-36$ bằng $64$, căn không âm bằng $8$."),
          luyen(R`Bán kính $9$ và đoạn tiếp tuyến $12$. Khoảng cách từ tâm đến điểm ngoài bằng bao nhiêu?`, R`Khoảng cách bằng $15$.`, [{ expr: "sqrt(9**2+12**2)", expect: "15" }], "Khoảng cách tới tâm là cạnh huyền của tam giác vuông tạo bởi bán kính và tiếp tuyến."),
          luyen(R`Bán kính $5$, tiếp tuyến $12$ và khoảng cách từ tâm đến điểm ngoài $13$. Hệ thức nào xác nhận góc tại tiếp điểm là góc vuông?`, R`Ta có $5^2+12^2=13^2$, nên góc tại tiếp điểm là góc vuông.`, [{ expr: "5**2+12**2-13**2", expect: "0" }], "Bán kính và tiếp tuyến là hai cạnh góc vuông, khoảng cách tới tâm là cạnh huyền. Hiệu bằng $0$ xác nhận góc vuông."),
        ],
      ),
      bai(
        "goc-noi-tiep",
        "Góc nội tiếp và góc ở tâm",
        R`Góc nội tiếp chắn một cung có số đo bằng nửa số đo góc ở tâm cùng chắn cung đó. Góc nội tiếp chắn nửa đường tròn là góc vuông.`,
        [vd(
          R`Góc ở tâm chắn một cung bằng $80^\circ$. Góc nội tiếp chắn cùng cung đó bằng bao nhiêu độ?`,
          [
            buoc(R`Góc nội tiếp bằng nửa góc ở tâm cùng chắn một cung.`, "Đỉnh góc nội tiếp nằm trên đường tròn, đỉnh góc ở tâm là tâm."),
            buoc(R`Số đo bằng $\frac{80^\circ}{2}=40^\circ$.`, "Chia số đo cung, cũng là số đo góc ở tâm, cho $2$."),
          ],
          R`Góc nội tiếp bằng $40^\circ$.`,
          [{ expr: "80/2", expect: "40" }],
        )],
        [
          luyen(R`Góc ở tâm bằng $120^\circ$. Góc nội tiếp cùng chắn cung đó bằng bao nhiêu độ?`, R`Góc nội tiếp bằng $60^\circ$.`, [{ expr: "120/2", expect: "60" }], "Cùng một cung, góc nội tiếp bằng nửa góc ở tâm."),
          luyen(R`Góc nội tiếp chắn nửa đường tròn. Nửa đường tròn là cung $180^\circ$. Góc đó bằng bao nhiêu độ?`, R`Góc bằng $90^\circ$.`, [{ expr: "180/2", expect: "90" }], "Góc nội tiếp chắn nửa đường tròn là góc vuông. Nửa của $180^\\circ$ bằng $90^\\circ$."),
          luyen(R`Góc nội tiếp bằng $35^\circ$. Góc ở tâm cùng chắn cung đó bằng bao nhiêu độ?`, R`Góc ở tâm bằng $70^\circ$.`, [{ expr: "35*2", expect: "70" }], "Đảo hệ thức: góc ở tâm bằng hai lần góc nội tiếp cùng chắn một cung."),
        ],
        { figure: "circle" },
      ),
      bai(
        "tu-giac-noi-tiep",
        "Tứ giác nội tiếp",
        R`Tứ giác nội tiếp là tứ giác có bốn đỉnh cùng nằm trên một đường tròn. Trong tứ giác nội tiếp, tổng hai góc đối bằng $180^\circ$.`,
        [vd(
          R`Tứ giác $ABCD$ nội tiếp đường tròn, góc $A$ bằng $70^\circ$ và góc $B$ bằng $95^\circ$. Tính góc $C$ và góc $D$.`,
          [
            buoc(R`Góc $C$ đối với góc $A$ nên bằng $180^\circ-70^\circ=110^\circ$.`, R`Tổng hai góc đối của tứ giác nội tiếp bằng $180^\circ$.`),
            buoc(R`Góc $D$ đối với góc $B$ nên bằng $180^\circ-95^\circ=85^\circ$.`, R`Áp dụng cùng tính chất cho cặp góc đối còn lại.`),
          ],
          R`Góc $C$ bằng $110^\circ$ và góc $D$ bằng $85^\circ$.`,
          [{ expr: "180-70", expect: "110" }, { expr: "180-95", expect: "85" }],
        )],
        [
          luyen(R`Tứ giác nội tiếp có một góc $120^\circ$. Góc đối của nó bằng bao nhiêu độ?`, R`Góc đối bằng $60^\circ$.`, [{ expr: "180-120", expect: "60" }], R`Hai góc đối của tứ giác nội tiếp bù nhau.`),
          luyen(R`Tứ giác có hai góc đối bằng $100^\circ$ và $70^\circ$. Tứ giác đó có nội tiếp được đường tròn không?`, R`Không, vì tổng hai góc đối khác $180^\circ$.`, [{ expr: "100+70", expect: "170" }], R`Tổng hai góc đối là $170^\circ$, không bằng $180^\circ$ nên tứ giác không nội tiếp.`),
          luyen(R`Hình chữ nhật có nội tiếp được đường tròn không? Tổng hai góc đối của nó bằng bao nhiêu độ?`, R`Có, tổng hai góc đối bằng $180^\circ$.`, [{ expr: "90+90", expect: "180" }], R`Mỗi góc của hình chữ nhật bằng $90^\circ$, nên hai góc đối có tổng $180^\circ$.`),
        ],
        {
          figure: "circle",
          whyTrue: R`Hai góc đối của tứ giác nội tiếp là hai góc nội tiếp chắn hai cung ghép lại thành cả đường tròn $360^\circ$. Mỗi góc bằng nửa số đo cung bị chắn, nên tổng hai góc bằng $180^\circ$.`,
          pitfalls: R`Cho rằng tứ giác nào cũng nội tiếp được. Hình bình hành không phải hình chữ nhật có hai góc đối bằng nhau và khác $90^\circ$, nên không nội tiếp.`,
        },
      ),
      bai(
        "do-dai-cung",
        "Độ dài cung tròn và diện tích hình quạt",
        R`Cung $n^\circ$ của đường tròn bán kính $R$ có độ dài $\frac{\pi Rn}{180}$. Hình quạt tròn ứng với cung đó có diện tích $\frac{\pi R^2n}{360}$.`,
        [vd(
          R`Đường tròn bán kính $6$. Tính độ dài cung $60^\circ$ và diện tích hình quạt tương ứng.`,
          [
            buoc(R`Độ dài cung là $\frac{\pi\cdot 6\cdot 60}{180}=2\pi$.`, R`Cung $60^\circ$ chiếm một phần sáu đường tròn có chu vi $12\pi$.`),
            buoc(R`Diện tích hình quạt là $\frac{\pi\cdot 36\cdot 60}{360}=6\pi$.`, R`Hình quạt $60^\circ$ chiếm một phần sáu hình tròn có diện tích $36\pi$.`),
          ],
          R`Độ dài cung bằng $2\pi$ và diện tích hình quạt bằng $6\pi$.`,
          [{ expr: "pi*6*60/180", expect: "2*pi" }, { expr: "pi*36*60/360", expect: "6*pi" }],
        )],
        [
          luyen(R`Tính độ dài cung $90^\circ$ của đường tròn bán kính $4$.`, R`Độ dài cung bằng $2\pi$.`, [{ expr: "pi*4*90/180", expect: "2*pi" }], R`Cung $90^\circ$ là một phần tư đường tròn có chu vi $8\pi$.`),
          luyen(R`Tính diện tích hình quạt $120^\circ$ của hình tròn bán kính $3$.`, R`Diện tích bằng $3\pi$.`, [{ expr: "pi*9*120/360", expect: "3*pi" }], R`Hình quạt $120^\circ$ chiếm một phần ba hình tròn có diện tích $9\pi$.`),
          luyen(R`Một cung của đường tròn bán kính $9$ dài $3\pi$. Số đo cung bằng bao nhiêu độ?`, R`Số đo cung bằng $60^\circ$.`, [{ expr: "3*pi*180/(pi*9)", expect: "60" }], R`Từ $\frac{\pi\cdot 9\cdot n}{180}=3\pi$ suy ra $n=60$.`),
        ],
        {
          figure: "circle",
          whyTrue: R`Cả đường tròn ứng với $360^\circ$ và có chu vi $2\pi R$. Cung $n^\circ$ chiếm $\frac{n}{360}$ đường tròn, nên độ dài cung và diện tích hình quạt lần lượt bằng $\frac{n}{360}$ của chu vi và của diện tích hình tròn.`,
          pitfalls: R`Dùng mẫu $360$ cho độ dài cung. Công thức độ dài cung đã rút gọn số $2$ nên có mẫu $180$, còn diện tích hình quạt có mẫu $360$.`,
        },
      ),
    ]),
    chuong("khoi", "Hình trụ, hình nón và hình cầu", [
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
          luyen(R`Hình trụ bán kính $1$ và chiều cao $5$ có thể tích bằng bao nhiêu?`, R`Thể tích bằng $5\pi$.`, [{ expr: "pi*1**2*5", expect: "5*pi" }], "Diện tích đáy là $\\pi$ nhân bình phương bán kính $1$. Nhân tiếp với chiều cao $5$."),
          luyen(R`Đường kính đáy bằng $6$. Bán kính bằng bao nhiêu?`, R`Bán kính bằng $3$.`, [{ expr: "6/2", expect: "3" }], "Bán kính là nửa đường kính. Công thức thể tích dùng bán kính, không dùng đường kính."),
          luyen(R`Hình trụ bán kính $3$ và chiều cao $2$ có thể tích bằng bao nhiêu?`, R`Thể tích bằng $18\pi$.`, [{ expr: "pi*3**2*2", expect: "18*pi" }], "Bình phương bán kính bằng $9$. Nhân với chiều cao $2$ và với $\\pi$."),
        ],
        { figure: "circle" },
      ),
      bai(
        "non-cau",
        "Thể tích hình nón và hình cầu",
        R`Hình nón có cùng bán kính đáy và cùng chiều cao với một hình trụ thì thể tích bằng một phần ba thể tích trụ đó. Hình cầu bán kính $r$ có thể tích $\frac{4}{3}\pi r^3$.`,
        [vd(
          R`Hình nón có bán kính đáy $2$ và chiều cao $3$. Hình cầu có bán kính $3$. Tính hai thể tích.`,
          [
            buoc(R`Thể tích nón bằng $\frac{1}{3}\pi\cdot 4\cdot 3=4\pi$.`, "Lấy một phần ba tích diện tích đáy với chiều cao. Chiều cao vuông góc với đáy."),
            buoc(R`Thể tích cầu bằng $\frac{4}{3}\pi\cdot 27=36\pi$.`, "Lập phương bán kính trước. Hệ số $\\frac{4}{3}\\pi$ nhân với $27$."),
          ],
          R`Nón có thể tích $4\pi$ và cầu có thể tích $36\pi$.`,
          [{ expr: "Rational(1,3)*pi*2**2*3", expect: "4*pi" }, { expr: "Rational(4,3)*pi*3**3", expect: "36*pi" }],
        )],
        [
          luyen(R`Hình nón bán kính đáy $3$ và chiều cao $4$ có thể tích bằng bao nhiêu?`, R`Thể tích bằng $12\pi$.`, [{ expr: "Rational(1,3)*pi*3**2*4", expect: "12*pi" }], "Diện tích đáy là $9\\pi$. Một phần ba của $9\\pi\\cdot 4$ bằng $12\\pi$."),
          luyen(R`Hình cầu bán kính $1$ có thể tích bằng bao nhiêu?`, R`Thể tích bằng $\frac{4}{3}\pi$.`, [{ expr: "Rational(4,3)*pi*1**3", expect: "Rational(4,3)*pi" }], "Lập phương bán kính $1$ vẫn bằng $1$. Còn lại đúng hệ số của công thức."),
          luyen(R`Hình nón và hình trụ có cùng đáy bán kính $2$ và cùng chiều cao $3$. Thể tích nón bằng một phần mấy thể tích trụ?`, R`Thể tích nón bằng một phần ba thể tích trụ, tức $4\pi$ khi trụ là $12\pi$.`, [{ expr: "Rational(1,3)*pi*2**2*3", expect: "4*pi" }], "Cùng đáy và cùng chiều cao thì nón bằng một phần ba trụ. Phép tính cho đúng thể tích nón."),
        ],
      ),
    ]),
    chuong("tan-so", "Tần số tương đối", [
      bai(
        "tan-so-tuong-doi",
        "Tần số và tần số tương đối",
        R`Tần số là số lần một giá trị xuất hiện. Tần số tương đối bằng tần số chia cho cỡ mẫu. Tổng các tần số bằng cỡ mẫu.`,
        [vd(
          R`Một mẫu $20$ bạn có $4$ bạn chọn môn A. Tần số tương đối của môn A bằng bao nhiêu?`,
          [
            buoc(R`Tần số là $4$ và cỡ mẫu là $20$.`, "Tần số đếm số bạn chọn môn A. Cỡ mẫu đếm toàn bộ bạn được hỏi."),
            buoc(R`Tần số tương đối bằng $\frac{4}{20}=\frac{1}{5}$.`, "Chia tần số cho cỡ mẫu rồi rút gọn. Kết quả là tần số tương đối, không phải tần số."),
          ],
          R`Tần số tương đối bằng $\frac{1}{5}$.`,
          [{ expr: "Rational(4,20)", expect: "Rational(1,5)" }],
        )],
        [
          luyen(R`Mẫu $10$ số có $3$ số bằng $5$. Tần số tương đối của giá trị $5$ bằng bao nhiêu?`, R`Tần số tương đối bằng $\frac{3}{10}$.`, [{ expr: "Rational(3,10)", expect: "3/10" }], "Chia tần số $3$ cho cỡ mẫu $10$. Phân số này đã tối giản."),
          luyen(R`Ba nhóm có tần số $2$, $5$ và $3$. Cỡ mẫu bằng bao nhiêu?`, R`Cỡ mẫu bằng $10$.`, [{ expr: "2+5+3", expect: "10" }], "Tổng các tần số bằng cỡ mẫu. Mẫu số của mọi tần số tương đối là số này."),
          luyen(R`Tần số $4$ trên mẫu $20$ bạn. Tần số tương đối của nhóm còn lại, gồm $16$ bạn, bằng bao nhiêu?`, R`Tần số tương đối bằng $\frac{4}{5}$.`, [{ expr: "Rational(16,20)", expect: "Rational(4,5)" }], "Nhóm còn lại có tần số $16$. Chia cho cỡ mẫu $20$ rồi rút gọn."),
        ],
        { figure: "bar" },
      ),
      bai(
        "tong-tuong-doi",
        "Tổng các tần số tương đối",
        R`Tổng các tần số tương đối của một bảng phân loại đủ và không chồng nhau bằng $1$. Mỗi tần số tương đối nằm trong đoạn $[0;1]$.`,
        [vd(
          R`Một mẫu chia hai nhóm với tần số tương đối $\frac{1}{5}$ và phần còn lại. Tính tần số tương đối của phần còn lại.`,
          [
            buoc(R`Hai nhóm phủ hết mẫu và không chồng nhau.`, "Mỗi phần tử thuộc đúng một nhóm, nên hai tần số tương đối cộng đủ $1$."),
            buoc(R`Phần còn lại có tần số tương đối $1-\frac{1}{5}=\frac{4}{5}$.`, "Lấy $1$ trừ tần số tương đối đã biết. Kết quả vẫn không âm và không vượt quá $1$."),
          ],
          R`Tần số tương đối của phần còn lại bằng $\frac{4}{5}$.`,
          [{ expr: "1-Rational(1,5)", expect: "Rational(4,5)" }],
        )],
        [
          luyen(R`Ba tần số tương đối là $\frac{1}{2}$, $\frac{1}{5}$ và phần còn lại. Phần còn lại bằng bao nhiêu?`, R`Tần số tương đối còn lại bằng $\frac{3}{10}$.`, [{ expr: "1-Rational(1,2)-Rational(1,5)", expect: "Rational(3,10)" }], "Tổng cả bảng bằng $1$. Trừ lần lượt hai tần số tương đối đã biết."),
          luyen(R`Tần số $2$, $3$ và $5$ trên mẫu $10$. Tổng ba tần số tương đối bằng bao nhiêu?`, R`Tổng bằng $1$.`, [{ expr: "Rational(2,10)+Rational(3,10)+Rational(5,10)", expect: "1" }], "Cộng các tỉ số tần số trên cùng một cỡ mẫu. Tử cộng lại đúng bằng mẫu."),
          luyen(R`Trung bình của các giá trị đại diện $1;\ 2;\ 3$ với tần số $1;\ 1;\ 2$ bằng bao nhiêu?`, R`Trung bình bằng $\frac{9}{4}$.`, [{ expr: "Rational(1*1+2*1+3*2,1+1+2)", expect: "Rational(9,4)" }], "Nhân mỗi giá trị với tần số của nó, cộng lại rồi chia cho tổng tần số."),
        ],
      ),
      bai(
        "khong-gian-mau-9",
        "Không gian mẫu và xác suất",
        R`Không gian mẫu là tập hợp mọi kết quả có thể của một phép thử. Khi các kết quả đồng khả năng, xác suất của biến cố bằng số kết quả thuận lợi chia cho số phần tử của không gian mẫu.`,
        [vd(
          R`Gieo hai đồng xu cân đối và phân biệt. Liệt kê không gian mẫu, rồi tính xác suất được đúng một mặt sấp.`,
          [
            buoc(R`Không gian mẫu gồm $4$ kết quả: SS, SN, NS và NN.`, R`Mỗi đồng xu có hai mặt, hai đồng xu phân biệt cho $2\cdot 2=4$ kết quả.`),
            buoc(R`Biến cố đúng một mặt sấp gồm SN và NS, nên xác suất là $\frac{2}{4}=\frac{1}{2}$.`, R`Có hai kết quả thuận lợi trong bốn kết quả đồng khả năng.`),
          ],
          R`Xác suất bằng $\frac{1}{2}$.`,
          [{ expr: "Rational(2,4)", expect: "Rational(1,2)" }],
        )],
        [
          luyen(R`Gieo một con xúc xắc hai lần. Không gian mẫu có bao nhiêu phần tử?`, R`Không gian mẫu có $36$ phần tử.`, [{ expr: "6*6", expect: "36" }], R`Mỗi lần gieo có $6$ kết quả, hai lần gieo cho $6\cdot 6=36$ cặp.`),
          luyen(R`Gieo một con xúc xắc hai lần. Xác suất để tổng số chấm bằng $7$ là bao nhiêu?`, R`Xác suất bằng $\frac{1}{6}$.`, [{ expr: "Rational(6,36)", expect: "Rational(1,6)" }], R`Có $6$ cặp cho tổng $7$ là $(1;6)$, $(2;5)$, $(3;4)$, $(4;3)$, $(5;2)$ và $(6;1)$.`),
          luyen(R`Hộp có $2$ bi đỏ và $1$ bi xanh. Lấy lần lượt hai bi, không trả lại. Xác suất lấy được hai bi đỏ bằng bao nhiêu?`, R`Xác suất bằng $\frac{1}{3}$.`, [{ expr: "Rational(2*1,3*2)", expect: "Rational(1,3)" }], R`Có $3\cdot 2=6$ cách lấy có thứ tự, trong đó $2\cdot 1=2$ cách được hai bi đỏ.`),
        ],
        {
          whyTrue: R`Liệt kê đầy đủ không gian mẫu bảo đảm không bỏ sót và không đếm trùng kết quả nào. Khi mọi kết quả đồng khả năng, chỉ cần đếm là tính được xác suất.`,
          pitfalls: R`Coi SN và NS là một kết quả. Hai đồng xu phân biệt nên đó là hai kết quả khác nhau của không gian mẫu.`,
        },
      ),
    ]),
    chuong("on-vao-10", "Ôn thi vào lớp 10", [
      bai(
        "on10-rut-gon",
        "Rút gọn biểu thức chứa căn và bài toán phụ",
        R`Câu đầu của đề thi vào lớp 10 thường cho một biểu thức chứa căn: tìm điều kiện xác định, rút gọn, rồi tính giá trị hoặc tìm $x$ để biểu thức thỏa một điều kiện. Làm theo thứ tự: điều kiện trước, quy đồng, phân tích tử và mẫu thành nhân tử, rút gọn, cuối cùng mới thay số.`,
        [vd(
          R`Cho $A=\frac{\sqrt{x}}{\sqrt{x}-1}-\frac{1}{\sqrt{x}-1}$ với $x\ge 0$ và $x\neq 1$. Rút gọn $A$ rồi tính $A$ khi $x=9$.`,
          [
            buoc(R`Hai phân thức có cùng mẫu, nên $A=\frac{\sqrt{x}-1}{\sqrt{x}-1}$.`, R`Cùng mẫu thì trừ hai tử và giữ nguyên mẫu, không cần quy đồng.`),
            buoc(R`Vì $x\neq 1$ nên $\sqrt{x}-1\neq 0$, do đó $A=1$.`, R`Điều kiện $x\neq 1$ bảo đảm mẫu khác $0$ nên được phép rút gọn tử với mẫu.`),
            buoc(R`Với $x=9$ thỏa điều kiện, $A=1$.`, R`Biểu thức đã rút gọn là hằng số trên toàn bộ miền xác định, nên tại $x=9$ cũng bằng $1$.`),
          ],
          R`Biểu thức $A=1$ với mọi $x\ge 0$, $x\neq 1$; tại $x=9$ thì $A=1$.`,
          [{ expr: "(sqrt(9)-1)/(sqrt(9)-1)", expect: "1" }],
        ), vd(
          R`Cho $B=\frac{x-4}{\sqrt{x}-2}$ với $x\ge 0$ và $x\neq 4$. Rút gọn $B$ rồi tìm $x$ để $B=5$.`,
          [
            buoc(R`Viết $x-4=(\sqrt{x}-2)(\sqrt{x}+2)$, nên $B=\sqrt{x}+2$.`, R`Với $x\ge 0$ thì $x=\left(\sqrt{x}\right)^2$, và tử là hiệu hai bình phương.`),
            buoc(R`Giải $\sqrt{x}+2=5$ được $\sqrt{x}=3$, tức $x=9$.`, R`Căn bậc hai số học bằng $3$ khi số dưới căn bằng $3^2$.`),
            buoc(R`Đối chiếu: $x=9$ thỏa $x\ge 0$ và $x\neq 4$, nên nhận.`, R`Nghiệm tìm được phải nằm trong điều kiện xác định đã ghi từ đầu.`),
          ],
          R`Rút gọn được $B=\sqrt{x}+2$, và $B=5$ khi $x=9$.`,
          [{ expr: "(9-4)/(sqrt(9)-2)", expect: "5" }],
        )],
        [
          luyen(R`Rút gọn $\frac{x-9}{\sqrt{x}+3}$ với $x\ge 0$.`, R`Kết quả là $\sqrt{x}-3$.`, [{ expr: "(16-9)/(sqrt(16)+3)", expect: "sqrt(16)-3" }], R`Tử là $(\sqrt{x}-3)(\sqrt{x}+3)$, rút gọn với mẫu $\sqrt{x}+3$ luôn dương.`),
          luyen(R`Cho $C=\sqrt{x}+2$ với $x\ge 0$. Tính $C$ khi $x=16$.`, R`Khi đó $C=6$.`, [{ expr: "sqrt(16)+2", expect: "6" }], R`Thay $x=16$ vào biểu thức đã rút gọn: $\sqrt{16}+2=4+2=6$.`),
          luyen(R`Cho $D=\frac{\sqrt{x}+1}{\sqrt{x}}$ với $x>0$. Tìm $x$ để $D=2$.`, R`Giá trị cần tìm là $x=1$.`, [{ expr: "(sqrt(1)+1)/sqrt(1)", expect: "2" }], R`Từ $\sqrt{x}+1=2\sqrt{x}$ suy ra $\sqrt{x}=1$, nên $x=1$, thỏa $x>0$.`),
        ],
        {
          whyTrue: R`Rút gọn chỉ đổi cách viết, không đổi giá trị, khi mọi bước chia đều chia cho số khác $0$. Vì vậy phải viết điều kiện xác định trước tiên: nó cho biết được phép chia cho những gì.`,
          pitfalls: R`Tìm được $x$ rồi quên đối chiếu với điều kiện xác định. Giá trị làm mẫu bằng $0$ hoặc làm số dưới căn âm phải bị loại.`,
        },
      ),
      bai(
        "on10-vi-et",
        "Phương trình bậc hai có tham số và hệ thức Vi-ét",
        R`Câu hỏi quen thuộc: tìm $m$ để phương trình bậc hai có hai nghiệm thỏa một hệ thức. Các bước: tính $\Delta$ và tìm điều kiện để có nghiệm, viết tổng và tích hai nghiệm theo Vi-ét, biến đổi hệ thức về tổng và tích, giải tìm $m$, rồi đối chiếu với điều kiện có nghiệm.`,
        [vd(
          R`Tìm $m$ để phương trình $x^2-2x+m-3=0$ có hai nghiệm $x_1$, $x_2$ thỏa $x_1^2+x_2^2=10$.`,
          [
            buoc(R`Ta có $\Delta'=1-(m-3)=4-m$. Có hai nghiệm khi $4-m\ge 0$, tức $m\le 4$.`, R`Điều kiện có nghiệm phải tìm trước, vì Vi-ét chỉ nói về nghiệm khi nghiệm tồn tại.`),
            buoc(R`Theo Vi-ét: $x_1+x_2=2$ và $x_1x_2=m-3$.`, R`Với phương trình $x^2+bx+c=0$, tổng hai nghiệm là $-b$ và tích là $c$.`),
            buoc(R`Biến đổi $x_1^2+x_2^2=(x_1+x_2)^2-2x_1x_2=4-2(m-3)=10-2m$. Cho bằng $10$ được $m=0$.`, R`Tổng bình phương viết được qua tổng và tích bằng hằng đẳng thức bình phương của tổng.`),
            buoc(R`Giá trị $m=0$ thỏa $m\le 4$, nên nhận.`, R`Giá trị tìm được phải nằm trong điều kiện có nghiệm đã tìm ở bước đầu.`),
          ],
          R`Giá trị cần tìm là $m=0$.`,
          [{ expr: "2**2-2*(0-3)", expect: "10" }],
        )],
        [
          luyen(R`Phương trình $x^2-6x+5=0$ có hai nghiệm $x_1$, $x_2$. Tính $x_1^2+x_2^2$.`, R`Kết quả là $26$.`, [{ expr: "6**2-2*5", expect: "26" }], R`Tổng là $6$, tích là $5$, nên $x_1^2+x_2^2=36-10=26$.`),
          luyen(R`Tìm $m$ để $x^2-4x+m=0$ có nghiệm kép.`, R`Giá trị cần tìm là $m=4$.`, [{ expr: "solve(16-4*m, m)[0]", expect: "4" }], R`Nghiệm kép khi $\Delta=16-4m=0$, tức $m=4$.`),
          luyen(R`Tìm $m$ để $x^2-2x+m=0$ có hai nghiệm thỏa $x_1-x_2=4$, biết $x_1>x_2$.`, R`Giá trị cần tìm là $m=-3$.`, [{ expr: "solve(2**2-4*m-16, m)[0]", expect: "-3" }], R`Ta có $(x_1-x_2)^2=(x_1+x_2)^2-4x_1x_2=4-4m$, cho bằng $16$ được $m=-3$, thỏa $\Delta'=1-m>0$.`),
        ],
        {
          whyTrue: R`Nếu $x_1$, $x_2$ là hai nghiệm thì $x^2+bx+c=(x-x_1)(x-x_2)$. Nhân vế phải ra và so hệ số, ta được tổng hai nghiệm bằng $-b$ và tích bằng $c$.`,
          pitfalls: R`Giải ra $m$ mà không đối chiếu điều kiện $\Delta\ge 0$, nhận cả giá trị làm phương trình vô nghiệm.`,
        },
      ),
      bai(
        "on10-lap-he",
        "Giải bài toán bằng cách lập hệ phương trình",
        R`Bài toán có lời văn thường có hai đại lượng chưa biết. Gọi mỗi đại lượng là một ẩn, ghi đơn vị và điều kiện. Từ hai mối quan hệ trong đề, lập hai phương trình. Giải hệ, đối chiếu điều kiện, rồi trả lời đúng câu đề hỏi.`,
        [vd(
          R`Một mảnh vườn hình chữ nhật có chu vi $34$ m. Nếu tăng chiều dài thêm $3$ m và tăng chiều rộng thêm $2$ m thì diện tích tăng thêm $45$ m². Tính chiều dài và chiều rộng.`,
          [
            buoc(R`Gọi chiều dài là $x$ m, chiều rộng là $y$ m, với $x\ge y>0$. Chu vi cho $x+y=17$.`, R`Nửa chu vi bằng tổng chiều dài và chiều rộng.`),
            buoc(R`Diện tích mới là $(x+3)(y+2)=xy+45$, rút gọn được $2x+3y=39$.`, R`Khai triển vế trái, số hạng $xy$ ở hai vế triệt tiêu, còn lại một phương trình bậc nhất.`),
            buoc(R`Từ $x=17-y$ thế vào: $34-2y+3y=39$, nên $y=5$ và $x=12$.`, R`Rút $x$ từ phương trình thứ nhất rồi thế vào phương trình thứ hai để còn một ẩn.`),
            buoc(R`Kiểm tra: $12+5=17$ và $15\cdot 7-12\cdot 5=45$. Cả hai đều đúng.`, R`Thử lại vào đề bài gốc, không chỉ vào hệ đã lập, để phát hiện lỗi khi lập phương trình.`),
          ],
          R`Chiều dài $12$ m, chiều rộng $5$ m.`,
          [{ expr: "solve([x+y-17, 2*x+3*y-39],[x,y])[x]", expect: "12" }, { expr: "solve([x+y-17, 2*x+3*y-39],[x,y])[y]", expect: "5" }],
        )],
        [
          luyen(R`Hai số có tổng $50$ và hiệu $12$. Tìm số lớn.`, R`Số lớn bằng $31$.`, [{ expr: "solve([x+y-50, x-y-12],[x,y])[x]", expect: "31" }], R`Cộng hai phương trình: $2x=62$, nên $x=31$.`),
          luyen(R`Mua $3$ bút và $2$ vở hết $26$ nghìn đồng, mua $1$ bút và $4$ vở hết $32$ nghìn đồng. Một quyển vở giá bao nhiêu nghìn đồng?`, R`Một quyển vở giá $7$ nghìn đồng.`, [{ expr: "solve([3*x+2*y-26, x+4*y-32],[x,y])[y]", expect: "7" }], R`Nhân phương trình thứ hai với $3$ rồi trừ phương trình thứ nhất: $10y=70$, nên $y=7$.`),
          luyen(R`Một ca nô đi xuôi dòng $60$ km hết $2$ giờ và ngược dòng $60$ km hết $3$ giờ. Vận tốc dòng nước là bao nhiêu km/h?`, R`Vận tốc dòng nước là $5$ km/h.`, [{ expr: "solve([x+y-30, x-y-20],[x,y])[y]", expect: "5" }], R`Vận tốc xuôi là $30$, ngược là $20$. Vận tốc dòng nước bằng nửa hiệu: $5$ km/h.`),
        ],
        {
          whyTrue: R`Mỗi câu trong đề mô tả một quan hệ giữa các đại lượng. Viết quan hệ đó bằng ẩn là chuyển câu chữ thành phương trình, nên nghiệm của hệ chính là các đại lượng cần tìm.`,
          pitfalls: R`Quên điều kiện của ẩn và đơn vị, hoặc trả lời sai đại lượng: đề hỏi vận tốc dòng nước nhưng lại trả lời vận tốc ca nô.`,
        },
      ),
      bai(
        "on10-hinh",
        "Hình học đường tròn trong đề thi vào lớp 10",
        R`Bài hình thường có ba ý: chứng minh bốn điểm cùng thuộc một đường tròn, chứng minh một hệ thức về độ dài, và một ý nâng cao. Công cụ chính: tứ giác có tổng hai góc đối bằng $180^\circ$ thì nội tiếp, tiếp tuyến vuông góc với bán kính, góc nội tiếp bằng nửa góc ở tâm, và tam giác đồng dạng.`,
        [vd(
          R`Từ điểm $A$ nằm ngoài đường tròn tâm $O$, kẻ hai tiếp tuyến $AB$, $AC$ với $B$, $C$ là tiếp điểm. Chứng minh bốn điểm $A$, $B$, $O$, $C$ cùng thuộc một đường tròn. Nếu $OA=10$ và bán kính bằng $6$ thì $AB$ dài bao nhiêu?`,
          [
            buoc(R`Tiếp tuyến vuông góc với bán kính tại tiếp điểm, nên $\widehat{ABO}=\widehat{ACO}=90^\circ$.`, R`Đây là tính chất cơ bản của tiếp tuyến, dùng ở hầu hết bài hình có tiếp tuyến.`),
            buoc(R`Tứ giác $ABOC$ có $\widehat{ABO}+\widehat{ACO}=180^\circ$, nên nội tiếp đường tròn đường kính $OA$.`, R`Hai góc đối có tổng $180^\circ$ là dấu hiệu tứ giác nội tiếp; hai góc vuông cùng nhìn $OA$ nên $OA$ là đường kính.`),
            buoc(R`Tam giác $ABO$ vuông tại $B$: $AB^2=OA^2-OB^2=100-36=64$, nên $AB=8$.`, R`Định lí Pythagore trong tam giác vuông có cạnh huyền là $OA$.`),
          ],
          R`Bốn điểm cùng thuộc đường tròn đường kính $OA$, và $AB=8$.`,
          [{ expr: "sqrt(10**2-6**2)", expect: "8" }],
        )],
        [
          luyen(R`Tứ giác nội tiếp có một góc bằng $75^\circ$. Góc đối diện bằng bao nhiêu độ?`, R`Góc đó bằng $105^\circ$.`, [{ expr: "180-75", expect: "105" }], R`Hai góc đối của tứ giác nội tiếp có tổng $180^\circ$.`),
          luyen(R`Đường tròn bán kính $5$, điểm $A$ cách tâm $13$. Tính độ dài tiếp tuyến kẻ từ $A$.`, R`Độ dài tiếp tuyến bằng $12$.`, [{ expr: "sqrt(13**2-5**2)", expect: "12" }], R`Tam giác tạo bởi tâm, $A$ và tiếp điểm vuông tại tiếp điểm, nên tiếp tuyến dài $\sqrt{169-25}=12$.`),
          luyen(R`Góc ở tâm chắn cung $AB$ bằng $110^\circ$. Góc nội tiếp chắn cung $AB$ bằng bao nhiêu độ?`, R`Góc đó bằng $55^\circ$.`, [{ expr: "110/2", expect: "55" }], R`Góc nội tiếp bằng nửa góc ở tâm cùng chắn một cung.`),
        ],
        {
          figure: "circle",
          whyTrue: R`Một tứ giác nội tiếp khi bốn đỉnh cùng cách đều một điểm. Hai góc vuông cùng nhìn một đoạn thẳng thì hai đỉnh đó nằm trên đường tròn nhận đoạn ấy làm đường kính, vì góc nội tiếp chắn nửa đường tròn là góc vuông.`,
          pitfalls: R`Vẽ hình đặc biệt, như tam giác cân hay vuông, rồi dùng tính chất của hình đặc biệt đó cho trường hợp tổng quát.`,
        },
      ),
    ]),
  ],
};
