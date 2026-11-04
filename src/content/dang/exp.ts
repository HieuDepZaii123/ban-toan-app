import type { TopicDang } from "./types.ts";

const R = String.raw;

export const expDang: TopicDang = {
  id: "exp",
  title: "Mũ và logarit",
  dang: [
    {
      name: "Đưa về cùng cơ số",
      nhanDang: "Phương trình mũ mà hai vế viết được thành lũy thừa của cùng một cơ số dương khác $1$.",
      phuongPhap: R`Với $a>0$ và $a\neq 1$, đẳng thức $a^u=a^v$ tương đương $u=v$. Đây là điều kiện cần và đủ, vì hàm mũ cơ số $a$ đơn ánh. Nếu cơ số nằm trong $(0;1)$, hàm vẫn đơn ánh nên vẫn tương đương, không đảo chiều ở phương trình. Điều kiện cơ số phải được kiểm trước khi dùng.`,
      viDu: {
        prompt: R`Giải $2^{x+1}=16$.`,
        steps: [
          { claim: R`Cơ số $2>1$ hợp lệ, và $16=2^4$.`, why: "Hai vế phải cùng cơ số thì mới so được số mũ. Cơ số đã thỏa điều kiện của hàm mũ." },
          { claim: R`Phương trình tương đương $x+1=4$.`, why: "Hàm $2^t$ đơn ánh trên tập số thực, nên hai lũy thừa bằng nhau khi và chỉ khi số mũ bằng nhau." },
          { claim: R`Nghiệm là $x=3$.`, why: "Phương trình bậc nhất này xác định với mọi số thực, không còn điều kiện loại." },
        ],
        ket: "Nghiệm duy nhất là $x=3$.",
        checks: [{ expr: "2**(3+1)", expect: "16" }],
      },
      loi: "Đổi chiều một phương trình mũ khi cơ số lớn hơn $1$. Việc đổi chiều chỉ đặt ra với bất phương trình.",
      luyen: {
        kind: "luyen",
        prompt: R`Giải $3^{2x}=81$.`,
        think: "Viết $81$ theo cơ số $3$, kiểm tra cơ số, rồi dùng tính đơn ánh.",
        answer: R`Đáp số là $x=2$.`,
        steps: [
          { claim: R`Cơ số $3>1$ và $81=3^4$.`, why: "Cơ số hợp lệ. Hai vế cùng cơ số thì số mũ mới so được." },
          { claim: R`Vậy $2x=4$, nên $x=2$.`, why: "Hàm mũ cơ số $3$ đơn ánh, nên đẳng thức tương đương với đẳng thức số mũ." },
        ],
        checks: [{ expr: "3**(2*2)", expect: "81" }],
      },
    },
    {
      name: "Logarit, điều kiện xác định và nghiệm ngoại lai",
      nhanDang: "Phương trình có logarit. Sau khi biến đổi có thể xuất hiện nghiệm làm đối số không dương.",
      phuongPhap: R`Biểu thức $\log_a b$ xác định khi $a>0$, $a\neq 1$ và $b>0$. Điều kiện đối số dương là cần. Quy tắc $\log_a b=c$ tương đương $a^c=b$ chỉ trên miền đó. Nếu biến đổi làm nới miền, mỗi nghiệm của phương trình mới chỉ là điều kiện cần và phải thử lại điều kiện xác định. Nghiệm không thỏa thì loại.`,
      viDu: {
        prompt: R`Giải $\log_2 x+\log_2(x-2)=3$.`,
        steps: [
          { claim: R`Điều kiện xác định là $x>0$ và $x-2>0$, tức $x>2$.`, why: "Cơ số $2$ hợp lệ. Cả hai đối số phải dương. Giao của hai điều kiện là $x>2$." },
          { claim: R`Trên miền này, phương trình tương đương $\log_2\bigl(x(x-2)\bigr)=3$, nên $x(x-2)=8$.`, why: "Tổng hai logarit cùng cơ số bằng logarit của tích chỉ khi cả hai đối số dương. Bước này tương đương trên miền đã ghi." },
          { claim: R`Phương trình $x^2-2x-8=0$ có nghiệm $x=4$ và $x=-2$.`, why: "Đây là điều kiện cần sau khi đã nhân khai triển. Chưa được nhận cả hai." },
          { claim: R`Giá trị $x=-2$ không thỏa $x>2$, nên bị loại. Giá trị $x=4$ thỏa, và $\log_2 4+\log_2 2=3$.`, why: "Thử lại điều kiện xác định. Nghiệm ngoại lai sinh ra khi phương trình bậc hai được giải trên tập rộng hơn miền logarit." },
        ],
        ket: "Nghiệm duy nhất là $x=4$.",
        checks: [
          { expr: "(-2)*((-2)-2)", expect: "8" },
          { expr: "4*(4-2)", expect: "8" },
          { expr: "log(4,2)+log(2,2)", expect: "3" },
        ],
      },
      loi: "Nhận nghiệm làm đối số âm hoặc bằng $0$.",
      luyen: {
        kind: "luyen",
        prompt: R`Giải $\log_3(x+2)=2$.`,
        think: "Viết điều kiện đối số trước. Đổi về mũ, rồi thử lại điều kiện. Nếu nghiệm không vào miền thì loại.",
        answer: R`Đáp số là $x=7$.`,
        steps: [
          { claim: R`Điều kiện xác định là $x+2>0$, tức $x>-2$. Cơ số $3$ hợp lệ.`, why: "Đối số của logarit phải dương. Đây là điều kiện cần." },
          { claim: R`Phương trình tương đương $x+2=9$ trên miền đó, nên $x=7$.`, why: "Định nghĩa logarit. Bước này chỉ tương đương khi nghiệm còn thỏa $x>-2$." },
          { claim: R`Vì $7>-2$, nghiệm được nhận.`, why: "Thử lại điều kiện cần. Ở bài này không có nghiệm nào bị loại." },
        ],
        checks: [{ expr: "log(9,3)", expect: "2" }],
      },
    },
    {
      name: "Quy tắc logarit",
      nhanDang: "Biểu thức có tổng, hiệu hoặc bội của các logarit cùng cơ số.",
      phuongPhap: R`Với cơ số hợp lệ, $\log_a(bc)=\log_a b+\log_a c$ khi $b>0$ và $c>0$, và $\log_a(b^k)=k\log_a b$ khi $b>0$. Hai điều kiện đối số là cần. Chiều ngược, nếu đã có tổng hai logarit thì tích trong một logarit chỉ viết được khi từng đối số dương. Bỏ điều kiện có thể hợp thức hóa một biểu thức không tồn tại.`,
      viDu: {
        prompt: R`Tính $\log_2 8+\log_2 4$.`,
        steps: [
          { claim: R`Cơ số $2$ hợp lệ, và cả $8$ lẫn $4$ đều dương.`, why: "Điều kiện của quy tắc tổng được thỏa, nên được gộp thành một logarit." },
          { claim: R`Tổng bằng $\log_2(8\cdot 4)=\log_2 32=5$.`, why: "Vì $2^5=32$. Có thể tính riêng $3+2$ và được cùng kết quả." },
        ],
        ket: "Giá trị bằng $5$.",
        checks: [
          { expr: "log(8,2)+log(4,2)", expect: "5" },
          { expr: "log(32,2)", expect: "5" },
        ],
      },
      loi: R`Gộp $\\log_a b+\\log_a c$ khi một trong hai đối số âm.`,
      luyen: {
        kind: "luyen",
        prompt: R`Tính $\log_3 9+\log_3 27$.`,
        think: "Mỗi số là lũy thừa của $3$. Có thể cộng số mũ, hoặc gộp thành một logarit rồi đổi về mũ.",
        answer: R`Đáp số là $5$.`,
        steps: [
          { claim: R`Ta có $\log_3 9=2$ và $\log_3 27=3$, vì $3^2=9$ và $3^3=27$.`, why: "Cơ số hợp lệ và đối số dương. Định nghĩa cho từng số hạng." },
          { claim: R`Tổng bằng $5$, và cũng bằng $\log_3 243$.`, why: R`Quy tắc tích áp dụng được vì cả hai đối số dương. Ta có $3^5=243$.` },
        ],
        checks: [{ expr: "log(9,3)+log(27,3)", expect: "5" }],
      },
    },
    {
      name: "Đổi cơ số",
      nhanDang: "Logarit có cơ số không thuận, hoặc cần so hai logarit khác cơ số.",
      phuongPhap: R`Với các cơ số và đối số hợp lệ, $\log_a b=\frac{\log_c b}{\log_c a}=\frac{1}{\log_b a}$. Đổi cơ số đòi hỏi cơ số mới dương và khác $1$, đối số dương, và mẫu khác $0$. Mẫu $\log_c a$ khác $0$ đúng khi $a\neq 1$, điều này đã có trong điều kiện cơ số.`,
      viDu: {
        prompt: R`Tính $\log_4 8$.`,
        steps: [
          { claim: R`Cơ số $4$ và đối số $8$ đều hợp lệ.`, why: "Cơ số lớn hơn $0$ và khác $1$, đối số dương. Logarit tồn tại." },
          { claim: R`Ta có $\log_4 8=\frac{\log_2 8}{\log_2 4}=\frac{3}{2}$.`, why: "Đổi về cơ số $2$. Tử là $3$ vì $2^3=8$, mẫu là $2$ vì $2^2=4$." },
        ],
        ket: R`Giá trị bằng $\frac{3}{2}$.`,
        checks: [{ expr: "log(8,4)", expect: "Rational(3,2)" }],
      },
      loi: "Đổi cơ số khi mẫu bằng $0$, tức là lấy logarit của $1$ ở mẫu.",
      luyen: {
        kind: "luyen",
        prompt: R`Tính $\log_8 4$.`,
        think: R`Đổi về cơ số $2$. Kết quả là nghịch đảo của $\\log_4 8$ vì vai trò cơ số và đối số đổi chỗ.`,
        answer: R`Đáp số là $\frac{2}{3}$.`,
        steps: [
          { claim: R`Cơ số $8$ và đối số $4$ hợp lệ.`, why: "Logarit tồn tại trước khi đổi cơ số." },
          { claim: R`Ta có $\log_8 4=\frac{\log_2 4}{\log_2 8}=\frac{2}{3}$.`, why: "Công thức đổi cơ số. Tử và mẫu đều khác $0$." },
        ],
        checks: [{ expr: "log(4,8)", expect: "Rational(2,3)" }],
      },
    },
    {
      name: "So sánh hai lũy thừa hoặc hai logarit",
      nhanDang: "Bài hỏi số nào lớn hơn, chưa cần tính giá trị thập phân.",
      phuongPhap: R`Để so sánh hai số dương, có thể nâng cả hai lên cùng một lũy thừa nguyên dương, vì hàm $t\mapsto t^k$ với $k$ nguyên dương đồng biến trên $(0;+\infty)$. Phép nâng là tương đương với bất đẳng thức cũ. Với logarit cùng cơ số lớn hơn $1$, hàm logarit đồng biến nên bảo toàn thứ tự của đối số.`,
      viDu: {
        prompt: R`So sánh $\sqrt{2}$ và $\sqrt[3]{3}$.`,
        steps: [
          { claim: R`Cả hai số đều dương. Xét lũy thừa bậc $6$ của mỗi số.`, why: "Bậc $6$ là bội của $2$ và của $3$, nên căn mất đi. Hàm $t^6$ đồng biến trên khoảng dương." },
          { claim: R`Ta có $\bigl(\sqrt{2}\bigr)^6=8$ và $\bigl(\sqrt[3]{3}\bigr)^6=9$.`, why: "Vì $8<9$ và phép nâng bậc $6$ tương đương trên tập số dương, căn bậc hai của $2$ nhỏ hơn căn bậc ba của $3$." },
        ],
        ket: R`Ta có $\sqrt{2}<\sqrt[3]{3}$.`,
        checks: [
          { expr: "3**2-2**3", expect: "1" },
          { expr: "(2**Rational(1,2))**6", expect: "8" },
          { expr: "(3**Rational(1,3))**6", expect: "9" },
        ],
      },
      loi: "So sánh các số mũ khác cơ số mà không đưa về cùng một phép thử.",
      luyen: {
        kind: "luyen",
        prompt: R`So sánh $\log_2 3$ và $\log_2 5$.`,
        think: "Cùng cơ số lớn hơn $1$, nên chỉ cần so đối số. Nêu chiều của hàm logarit trước khi kết luận.",
        answer: R`Ta có $\log_2 3<\log_2 5$.`,
        steps: [
          { claim: R`Cơ số $2>1$, hàm $\log_2$ đồng biến trên $(0;+\infty)$.`, why: R`Đạo hàm của $\\log_2 x$ là $1/(x\\ln 2)$, dương khi $x>0$.` },
          { claim: R`Vì $3<5$ và cả hai dương, $\log_2 3<\log_2 5$.`, why: "Hàm đồng biến bảo toàn thứ tự. Đây là điều kiện đủ." },
        ],
        checks: [
          { expr: "log(5,2)-log(3,2)", expect: "log(Rational(5,3),2)" },
          { expr: "5-3", expect: "2" },
        ],
      },
    },
    {
      name: "Hàm số mũ và hàm số logarit",
      nhanDang: "Bài hỏi tập xác định, chiều biến thiên hoặc tập giá trị của hàm mũ hay logarit.",
      phuongPhap: R`Hàm $y=a^x$ với $a>1$ xác định trên tập số thực, đồng biến, và có tập giá trị $(0;+\infty)$. Hàm $y=\log_a x$ với $a>1$ xác định khi $x>0$, đồng biến, và có tập giá trị là tập số thực. Đạo hàm của $\ln x$ là $1/x>0$ trên miền xác định, đó là điều kiện đủ của đồng biến. Giới hạn ở hai đầu miền cho tập giá trị.`,
      viDu: {
        prompt: R`Với $y=\ln x$, tìm tập xác định, chiều biến thiên và tập giá trị.`,
        steps: [
          { claim: R`Tập xác định là $x>0$.`, why: "Đối số của logarit tự nhiên phải dương. Cơ số $e$ đã hợp lệ." },
          { claim: R`Đạo hàm $y'=1/x>0$ trên $(0;+\infty)$, nên hàm đồng biến.`, why: "Đạo hàm dương trên cả miền là điều kiện đủ của đồng biến ngặt." },
          { claim: R`Khi $x$ tiến tới $0$ từ bên phải, $y$ tiến tới âm vô cực. Khi $x$ ra dương vô cực, $y$ ra dương vô cực.`, why: "Hàm liên tục và đồng biến, hai giới hạn này cho tập giá trị là toàn bộ tập số thực." },
        ],
        ket: R`Tập xác định là $(0;+\infty)$, hàm đồng biến, tập giá trị là $\mathbb{R}$.`,
        checks: [
          { expr: "diff(log(x), x)", expect: "1/x" },
          { expr: "log(E)", expect: "1" },
        ],
      },
      loi: R`Cho logarit nhận đối số âm, hoặc nói hàm $\\ln x$ nghịch biến.`,
      luyen: {
        kind: "luyen",
        prompt: R`Giải $\ln(x-1)=0$.`,
        think: R`Viết điều kiện $x-1>0$ trước. Phương trình $\\ln t=0$ tương đương $t=1$ chỉ khi $t>0$.`,
        answer: R`Nghiệm là $x=2$.`,
        steps: [
          { claim: R`Điều kiện xác định là $x>1$.`, why: "Đối số của logarit phải dương." },
          { claim: R`Phương trình tương đương $x-1=1$ trên miền đó, nên $x=2$.`, why: R`Vì $\\ln t=0$ khi và chỉ khi $t=1$, với $t>0$.` },
          { claim: R`Giá trị $x=2$ thỏa $x>1$.`, why: "Thử lại điều kiện cần. Không có nghiệm bị loại." },
        ],
        checks: [{ expr: "log(2-1)", expect: "0" }],
      },
    },
    {
      name: "Ẩn phụ",
      nhanDang: "Phương trình mũ viết được thành phương trình bậc hai theo $a^x$.",
      phuongPhap: R`Đặt $t=a^x$. Điều kiện cần và đủ của ẩn mới là $t>0$, vì hàm mũ cơ số dương khác $1$ có tập giá trị $(0;+\infty)$. Giải phương trình theo $t$, loại mọi nghiệm $t\le 0$, rồi giải $a^x=t$ với từng $t$ còn lại. Nghiệm $t$ không dương là nghiệm ngoại lai của phép đặt.`,
      viDu: {
        prompt: R`Giải $4^x-3\cdot 2^x-4=0$.`,
        steps: [
          { claim: R`Vì $4^x=(2^x)^2$, đặt $t=2^x$. Điều kiện là $t>0$.`, why: "Hàm $2^x$ chỉ nhận giá trị dương. Đây là điều kiện cần và đủ của ẩn phụ." },
          { claim: R`Phương trình trở thành $t^2-3t-4=0$, có nghiệm $t=4$ và $t=-1$.`, why: "Phân tích $(t-4)(t+1)=0$. Cả hai mới là điều kiện cần." },
          { claim: R`Loại $t=-1$ vì không dương. Với $t=4$ được $2^x=4$, nên $x=2$.`, why: "Thử lại điều kiện của ẩn phụ. Thay $x=2$ vào phương trình gốc được $16-12-4=0$." },
        ],
        ket: "Nghiệm duy nhất là $x=2$.",
        checks: [
          { expr: "4**2-3*2**2-4", expect: "0" },
          { expr: "(-1)**2-3*(-1)-4", expect: "0" },
        ],
      },
      loi: "Nhận nghiệm $t$ âm của phương trình bậc hai rồi lấy logarit của số âm.",
      luyen: {
        kind: "luyen",
        prompt: R`Giải $9^x-4\cdot 3^x+3=0$.`,
        think: "Đặt $t=3^x>0$. Giải bậc hai, giữ mọi nghiệm dương, rồi đổi về số mũ.",
        answer: R`Hai nghiệm là $x=0$ và $x=1$.`,
        steps: [
          { claim: R`Đặt $t=3^x>0$, được $t^2-4t+3=0$, tức $(t-1)(t-3)=0$.`, why: "Ẩn phụ phải dương. Hai nghiệm $1$ và $3$ đều thỏa điều kiện này." },
          { claim: R`Từ $t=1$ được $x=0$, từ $t=3$ được $x=1$.`, why: "Không có nghiệm $t$ nào bị loại. Cả hai thay lại đều thỏa phương trình gốc." },
        ],
        checks: [
          { expr: "9**0-4*3**0+3", expect: "0" },
          { expr: "9**1-4*3**1+3", expect: "0" },
        ],
      },
    },
    {
      name: "Logarit hóa",
      nhanDang: "Phương trình mũ không đưa được về cùng một lũy thừa nguyên quen thuộc.",
      phuongPhap: R`Nếu hai vế dương và cơ số logarit hợp lệ, lấy logarit hai vế là phép tương đương, vì hàm logarit đơn ánh trên $(0;+\infty)$. Với $a^x=b$ và $b>0$, $a>0$, $a\neq 1$, nghiệm duy nhất là $x=\log_a b$. Phải kiểm tra vế phải dương trước khi lấy logarit.`,
      viDu: {
        prompt: R`Giải $2^x=5$.`,
        steps: [
          { claim: R`Cơ số $2>1$ và vế phải $5>0$.`, why: "Hàm mũ luôn dương, vế phải dương nên phương trình có thể có nghiệm. Điều kiện để lấy logarit được thỏa." },
          { claim: R`Lấy $\log_2$ hai vế được $x=\log_2 5$.`, why: "Hàm logarit đơn ánh trên khoảng dương, nên bước này tương đương với phương trình đã cho." },
        ],
        ket: R`Nghiệm duy nhất là $x=\log_2 5$.`,
        checks: [{ expr: "2**log(5,2)", expect: "5" }],
      },
      loi: "Lấy logarit khi một vế âm hoặc bằng $0$.",
      luyen: {
        kind: "luyen",
        prompt: R`Giải $3^{x+1}=7$.`,
        think: "Hai vế dương. Lấy logarit cơ số $3$, rồi tách số mũ $x+1$.",
        answer: R`Đáp số là $x=\log_3 7-1$.`,
        steps: [
          { claim: R`Cơ số $3>1$ và $7>0$, nên lấy $\log_3$ hai vế được $x+1=\log_3 7$.`, why: "Phép lấy logarit tương đương vì hàm logarit đơn ánh trên khoảng dương." },
          { claim: R`Vậy $x=\log_3 7-1$.`, why: "Phương trình bậc nhất theo $x$ không thêm nghiệm và không loại nghiệm." },
        ],
        checks: [{ expr: "3**(log(7,3)-1+1)", expect: "7" }],
      },
    },
    {
      name: "Bất phương trình mũ có cơ số nhỏ hơn 1",
      nhanDang: "Bất phương trình mũ, và cơ số nằm trong khoảng $(0;1)$.",
      phuongPhap: R`Nếu $0<a<1$, hàm $a^x$ nghịch biến, nên $a^u>a^v$ tương đương $u<v$. Việc đổi chiều là điều kiện cần và đủ trong trường hợp này. Nếu $a>1$, hàm đồng biến và không đổi chiều. Phải xác định cơ số thuộc khoảng nào trước khi viết bất phương trình của số mũ.`,
      viDu: {
        prompt: R`Giải $\left(\frac{1}{2}\right)^x>4$.`,
        steps: [
          { claim: R`Cơ số $\frac{1}{2}$ nằm trong $(0;1)$, và $4=\left(\frac{1}{2}\right)^{-2}$.`, why: "Cơ số hợp lệ cho hàm mũ. Viết $4$ cùng cơ số để so số mũ." },
          { claim: R`Bất phương trình tương đương $x<-2$.`, why: "Hàm mũ cơ số trong $(0;1)$ nghịch biến, nên dấu bất phương trình đổi chiều. Đây là điều kiện cần và đủ." },
          { claim: R`Tại $x=-3$, vế trái bằng $8>4$. Tại $x=-2$, vế trái bằng $4$, không thỏa dấu lớn hơn.`, why: "Thử một điểm trong miền kết luận và đúng biên. Biên bị loại vì dấu là lớn hơn chặt." },
        ],
        ket: "Nghiệm là $x<-2$.",
        checks: [
          { expr: "(Rational(1,2))**(-3)", expect: "8" },
          { expr: "(Rational(1,2))**(-2)", expect: "4" },
        ],
      },
      loi: "Quên đổi chiều khi cơ số nằm trong $(0;1)$.",
      luyen: {
        kind: "luyen",
        prompt: R`Giải $\left(\frac{1}{3}\right)^x<9$.`,
        think: R`Viết $9$ theo cơ số $\\frac{1}{3}$. Cơ số nhỏ hơn $1$ nên đổi chiều, và dấu nhỏ hơn chặt loại đúng biên.`,
        answer: "Nghiệm là $x>-2$.",
        steps: [
          { claim: R`Ta có $9=\left(\frac{1}{3}\right)^{-2}$ và cơ số nằm trong $(0;1)$.`, why: "Hàm nghịch biến, nên bất phương trình của số mũ đổi chiều." },
          { claim: R`Bất phương trình tương đương $x>-2$.`, why: "Đổi chiều khi đưa về số mũ. Biên $x=-2$ cho hai vế bằng nhau, nên không thuộc nghiệm." },
        ],
        checks: [
          { expr: "(Rational(1,3))**0", expect: "1" },
          { expr: "(Rational(1,3))**(-2)", expect: "9" },
        ],
      },
    },
    {
      name: "Phương trình mũ chứa tham số",
      nhanDang: "Bài tìm tham số để một phương trình mũ có nghiệm, hoặc đếm số nghiệm.",
      phuongPhap: R`Đưa phương trình về dạng một hàm đã biết bằng tham số. Tìm tập giá trị của hàm đó bằng đạo hàm hoặc bằng bất đẳng thức tương đương. Tham số thuộc tập giá trị là điều kiện cần và đủ để có nghiệm. Khi đạt cực trị, phải xét riêng số nghiệm tại giá trị biên.`,
      viDu: {
        prompt: R`Tìm $m$ để $2^x+2^{-x}=m$ có nghiệm.`,
        steps: [
          { claim: R`Đặt $t=2^x>0$. Phương trình thành $t+\frac{1}{t}=m$.`, why: R`Ẩn phụ dương là điều kiện cần và đủ. Mọi $t>0$ đều đạt được tại $x=\log_2 t$.` },
          { claim: R`Với $t>0$, $(t-1)^2\ge 0$ nên $t+\frac{1}{t}\ge 2$, đẳng thức tại $t=1$.`, why: R`Khai triển $(t-1)^2\ge 0$ rồi chia cho $t>0$. Đây là bất đẳng thức tương đương trên miền $t>0$.` },
          { claim: R`Vậy $m\ge 2$ là điều kiện cần và đủ. Khi $m=2$ có đúng $x=0$.`, why: "Giá trị nhỏ nhất bằng $2$ đạt tại $t=1$, tức $x=0$. Với $m>2$, phương trình $t+1/t=m$ có nghiệm dương." },
        ],
        ket: R`Điều kiện cần và đủ là $m\ge 2$.`,
        checks: [
          { expr: "2**0+2**0", expect: "2" },
          { expr: "2**1+2**(-1)", expect: "Rational(5,2)" },
          { expr: "simplify((t+1/t-2)*t-(t-1)**2)", expect: "0" },
        ],
      },
      loi: "Kết luận mọi $m$ đều cho nghiệm, dù vế trái không bao giờ nhỏ hơn $2$.",
      luyen: {
        kind: "luyen",
        prompt: R`Với $m=\frac{5}{2}$, tìm một nghiệm của $2^x+2^{-x}=m$.`,
        think: R`Vì $\\frac{5}{2}>2$, phương trình có nghiệm. Thử $x=1$ và nhớ hàm chẵn nên $x=-1$ cũng là nghiệm.`,
        answer: R`Một nghiệm là $x=1$. Nghiệm còn lại là $x=-1$.`,
        steps: [
          { claim: R`Vì $\frac{5}{2}>2$, tham số thuộc tập giá trị.`, why: "Điều kiện cần và đủ đã chứng minh ở ví dụ. Bài này rơi vào trường hợp có nghiệm." },
          { claim: R`Ta có $2^1+2^{-1}=\frac{5}{2}$, và $2^{-1}+2^{1}$ cũng bằng $\frac{5}{2}$.`, why: "Thay trực tiếp. Hàm chẵn vì thay $x$ bởi $-x$ không đổi biểu thức." },
        ],
        checks: [
          { expr: "2**1+2**(-1)", expect: "Rational(5,2)" },
          { expr: "2**(-1)+2**1", expect: "Rational(5,2)" },
        ],
      },
    },
  ],
  sangTao: [
    {
      kind: "thuc-te",
      sao: 3,
      prompt: R`Số liệu giả định. Gửi $100$ triệu đồng, lãi kép $6\%$ mỗi năm, không rút lãi. Sau $3$ năm có bao nhiêu triệu đồng?`,
      think: R`Công thức $T=A\left(1+r\right)^n$ với $r=\frac{6}{100}$. Tính phân số đúng trước khi làm tròn.`,
      answer: R`Đáp số là $\frac{148877}{1250}$ triệu đồng, khoảng $119{,}10$ triệu đồng; sau ba năm số tiền lớn hơn gốc.`,
      steps: [
        { claim: R`Ta có $T=100\left(\frac{53}{50}\right)^3$.`, why: R`Vì $1+\frac{6}{100}=\frac{53}{50}$. Lãi kép nhân cơ số này ba lần.` },
        { claim: R`Khai triển được $\frac{148877}{1250}$ triệu đồng.`, why: "Lũy thừa phân số được tính hết trước khi nhân với số tiền gốc. Đơn vị là triệu đồng." },
      ],
      checks: [{ expr: "100*(Rational(53,50))**3", expect: "Rational(148877,1250)" }],
    },
    {
      kind: "thuc-te",
      sao: 3,
      prompt: R`Số liệu giả định. Một quần thể tăng $8\%$ mỗi năm theo $N=10\cdot\left(\frac{27}{25}\right)^t$ nghìn cá thể. Sau $5$ năm số cá thể bằng bao nhiêu nghìn?`,
      think: R`Thay $t=5$. Giữ phân số $\frac{27}{25}$ để có giá trị đúng, không cộng $8\%$ theo lãi đơn.`,
      answer: R`Đáp số là $\frac{28697814}{1953125}$ nghìn cá thể; quần thể lớn hơn mức ban đầu $10$ nghìn.`,
      steps: [
        { claim: R`Vì $1{,}08=\frac{108}{100}=\frac{27}{25}$, công thức đã viết đúng cơ số.`, why: "Cơ số lớn hơn $1$, nên dãy cá thể tăng. Điều kiện cơ số của hàm mũ được thỏa." },
        { claim: R`Sau $5$ năm, $N=10\left(\frac{27}{25}\right)^5=\frac{28697814}{1953125}$.`, why: "Thay đúng số mũ. Đơn vị là nghìn cá thể." },
      ],
      checks: [{ expr: "10*(Rational(27,25))**5", expect: "Rational(28697814,1953125)" }],
    },
    {
      kind: "thuc-te",
      sao: 2,
      prompt: R`Số liệu giả định. Một chất còn $N(t)=80\cdot 2^{-\frac{t}{10}}$ gam sau $t$ năm, với $t\ge 0$. Sau $20$ năm còn bao nhiêu gam?`,
      think: R`Miền của mô hình là $t\ge 0$. Số mũ $-\frac{20}{10}=-2$ nghĩa là chia cho $4$. Kiểm tra $20$ có thuộc miền trước khi thay.`,
      answer: "Đáp số là $20$ gam; sau $20$ năm còn một phần tư lượng ban đầu.",
      steps: [
        { claim: R`Thời điểm $t=20$ thỏa $t\ge 0$, và $2^{-\frac{20}{10}}=2^{-2}=\frac{1}{4}$.`, why: "Hàm mũ xác định với mọi số thực, còn mô hình chỉ dùng thời gian không âm. Điểm đang hỏi nằm trong miền." },
        { claim: R`Ta có $N(20)=80\cdot\frac{1}{4}=20$.`, why: "Nhân với lượng ban đầu. Đơn vị là gam." },
      ],
      checks: [{ expr: "80*2**(-2)", expect: "20" }],
    },
    {
      kind: "thuc-te",
      sao: 2,
      prompt: R`Số liệu giả định. Độ pH của một dung dịch là $-\log_{10}(10^{-3})$. Giá trị bằng bao nhiêu, và dung dịch này đứng về phía nào so với mức trung tính $7$?`,
      think: "Logarit cơ số $10$ của một lũy thừa của $10$ cho đúng số mũ. Đối số $10^{-3}$ phải dương.",
      answer: "Đáp số là $3$ độ pH; dung dịch axit hơn mức trung tính $7$.",
      steps: [
        { claim: R`Cơ số $10$ hợp lệ và đối số $10^{-3}>0$, nên $\log_{10}(10^{-3})=-3$.`, why: "Điều kiện xác định của logarit được thỏa. Định nghĩa cho đúng số mũ." },
        { claim: R`Đối dấu được $3$, và $3<7$.`, why: "Công thức pH có dấu trừ ở ngoài. Giá trị nhỏ hơn $7$ nghĩa là axit hơn nước trung tính." },
      ],
      checks: [{ expr: "-log(10**(-3), 10)", expect: "3" }],
    },
    {
      kind: "mo",
      sao: 3,
      prompt: R`Hãy chọn một cơ số trong $(0;1)$ và viết một bất phương trình mũ phải đổi chiều. Viết thêm một bất phương trình cùng dạng với cơ số lớn hơn $1$ để thấy chỗ không đổi chiều.`,
      think: "Cơ số quyết định chiều. Một ví dụ trong $(0;1)$ phải đổi chiều. Một ví dụ lớn hơn $1$ giữ chiều.",
      answer: R`Với cơ số $\frac{1}{2}$, $\left(\frac{1}{2}\right)^x>4$ tương đương $x<-2$. Với cơ số $2$, $2^x>4$ tương đương $x>2$.`,
      steps: [
        { claim: R`Cơ số $\frac{1}{2}$ nằm trong $(0;1)$ và $4=\left(\frac{1}{2}\right)^{-2}$, nên dấu đổi chiều thành $x<-2$.`, why: "Hàm nghịch biến. Đây là một ví dụ hợp lệ của yêu cầu mở." },
        { claim: R`Cơ số $2>1$ và $4=2^2$, nên $2^x>4$ tương đương $x>2$.`, why: "Hàm đồng biến, không đổi chiều. Cùng số $4$ nhưng kết luận ngược phía vì cơ số khác khoảng." },
      ],
      checks: [
        { expr: "(Rational(1,2))**(-3)", expect: "8" },
        { expr: "2**3", expect: "8" },
      ],
    },
    {
      kind: "phan-bien",
      sao: 4,
      prompt: R`Bạn A giải $\log_2 x+\log_2(x-2)=3$ và nhận cả $x=4$ lẫn $x=-2$. Hãy phản biện.`,
      think: "Viết điều kiện xác định trước. Nghiệm của phương trình bậc hai chỉ là điều kiện cần sau khi đã bỏ logarit.",
      answer: "Lập luận chưa đúng. Giá trị $x=-2$ làm đối số âm, nên bị loại. Nghiệm duy nhất là $x=4$.",
      steps: [
        { claim: R`Điều kiện xác định là $x>2$.`, why: "Cả hai đối số $x$ và $x-2$ phải dương. Đây là điều kiện cần mà bạn A chưa dùng." },
        { claim: R`Giá trị $x=-2$ không thỏa $x>2$, dù $(-2)(-4)=8$.`, why: "Tích bằng $8$ chỉ giải phương trình sau khi đã lấy mũ. Nó không cứu được một logarit không tồn tại." },
        { claim: R`Giá trị $x=4$ thỏa, và $\log_2 4+\log_2 2=3$.`, why: "Thử lại trên miền. Chỉ nghiệm này được nhận." },
      ],
      checks: [
        { expr: "(-2)*(-4)", expect: "8" },
        { expr: "log(4,2)+log(2,2)", expect: "3" },
      ],
    },
    {
      kind: "doc",
      sao: 2,
      prompt: R`Bảng giá trị của $\log_2$ ghi $\log_2 1=0$, $\log_2 2=1$, $\log_2 4=2$ và $\log_2 8=3$. Hãy đọc $\log_2 4+\log_2 2$ và cho biết hàm đang tăng hay giảm trên các mốc này.`,
      think: "Cộng hai ô trong bảng. So các đối số tăng với các giá trị logarit để đọc chiều biến thiên.",
      answer: R`Tổng bằng $3$. Trên các mốc này hàm tăng, vì đối số tăng thì giá trị logarit tăng.`,
      steps: [
        { claim: R`Ô $\log_2 4$ bằng $2$ và ô $\log_2 2$ bằng $1$, tổng bằng $3$.`, why: "Quy tắc cộng áp dụng được vì cả hai đối số dương và cùng cơ số hợp lệ." },
        { claim: R`Dãy đối số $1,2,4,8$ tăng và dãy giá trị $0,1,2,3$ tăng.`, why: "Bảng cho một bằng chứng hữu hạn của chiều đồng biến. Với cơ số $2>1$, điều này khớp với tính đồng biến của hàm." },
      ],
      checks: [
        { expr: "log(4,2)+log(2,2)", expect: "3" },
        { expr: "log(8,2)-log(1,2)", expect: "3" },
      ],
    },
    {
      kind: "uoc-luong",
      sao: 3,
      prompt: R`Ước lượng $\log_2 3$ bằng một khoảng mở, không dùng máy tính.`,
      think: "Kẹp $3$ giữa hai lũy thừa của $2$ mà số mũ là phân số. Vì hàm mũ cơ số $2$ đồng biến, thứ tự ngược lại thành khoảng của logarit.",
      answer: R`Ta có $\frac{3}{2}<\log_2 3<\frac{8}{5}$.`,
      steps: [
        { claim: R`Ta có $2^3=8<9=3^2$, nên $2^{3/2}<3$.`, why: R`Nâng bậc $2$ bảo toàn thứ tự trên tập số dương. Chia số mũ cho $2$ được lũy thừa bậc $\\frac{3}{2}$.` },
        { claim: R`Ta có $2^8=256>243=3^5$, nên $2^{8/5}>3$.`, why: "Cùng một lý do với bậc $5$. Hai bất đẳng thức này kẹp $3$ giữa hai lũy thừa của $2$." },
        { claim: R`Vì hàm $\log_2$ đồng biến, $\frac{3}{2}<\log_2 3<\frac{8}{5}$.`, why: "Lấy logarit cơ số lớn hơn $1$ giữ chiều bất đẳng thức. Hai đầu là đúng hai số mũ vừa dùng." },
      ],
      checks: [
        { expr: "3**2-2**3", expect: "1" },
        { expr: "2**8-3**5", expect: "13" },
      ],
    },
    {
      kind: "tu-ra-de",
      sao: 4,
      prompt: R`Bài xuất phát: $\log_2(x-1)=3$ có điều kiện $x>1$ và nghiệm $x=9$. Hãy đổi giả thiết bằng cách thay vế phải bởi một số khác, dự đoán nghiệm mới, rồi kiểm lại điều kiện xác định.`,
      think: "Dự đoán đối số bằng lũy thừa của vế phải mới, trước khi cộng thêm $1$. Sau đó mới thử $x>1$.",
      answer: R`Một đề hợp lệ là $\log_2(x-1)=1$. Dự đoán $x-1=2$, và nghiệm đúng là $x=3$.`,
      steps: [
        { claim: R`Đổi vế phải từ $3$ sang $1$. Điều kiện xác định vẫn là $x>1$.`, why: "Đối số không đổi, nên miền không đổi. Vế phải mới làm đổi nghiệm, không đổi điều kiện." },
        { claim: R`Dự đoán $x-1=2^1=2$, nên $x=3$.`, why: "Định nghĩa logarit cho dự đoán này trước khi thử miền." },
        { claim: R`Vì $3>1$, dự đoán được nhận. Thay lại, $\log_2 2=1$.`, why: "Thử điều kiện cần. Nghiệm không bị loại." },
      ],
      checks: [
        { expr: "log(3-1,2)", expect: "1" },
        { expr: "2**1", expect: "2" },
      ],
    },
  ],
};
