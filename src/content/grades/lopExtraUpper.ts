/** Chương bổ sung cho lớp 6–8: dãy số, lũy thừa, tính nhanh, phương trình tích và ẩn ở mẫu. */
import type { GradeChapter, GradeLesson } from "./types.ts";
import { bai, buoc, chuong, luyen, vd } from "./types.ts";

const R = String.raw;

export const tinhNhanh: GradeLesson = bai("tinh-nhanh", "Tính nhanh bằng tính chất của phép tính",
  R`Dùng tính chất giao hoán, kết hợp và phân phối để ghép các số thành số tròn chục hoặc tròn trăm, rồi tính nhanh. Tính chất phân phối là $a\cdot b+a\cdot c=a\cdot(b+c)$.`,
  [
    vd(R`Tính nhanh $25\cdot37\cdot4$.`,
      [
        buoc(R`Dùng tính chất giao hoán và kết hợp để ghép $25\cdot4$.`, R`Tích $25\cdot4=100$ là số tròn trăm nên dễ nhân tiếp.`),
        buoc(R`Ta có $25\cdot37\cdot4=(25\cdot4)\cdot37=100\cdot37=3700$.`, R`Nhân một số với $100$ chỉ cần viết thêm hai chữ số $0$.`),
      ],
      R`Kết quả là $3700$.`,
      [{ expr: "25*37*4", expect: "3700" }]),
    vd(R`Tính nhanh $87\cdot13+13\cdot13$.`,
      [
        buoc(R`Đặt thừa số chung $13$ ra ngoài: $13\cdot(87+13)$.`, R`Tính chất phân phối của phép nhân đối với phép cộng cho phép đặt thừa số chung.`),
        buoc(R`Ta có $13\cdot(87+13)=13\cdot100=1300$.`, R`Tổng $87+13=100$ là số tròn trăm.`),
      ],
      R`Kết quả là $1300$.`,
      [{ expr: "87*13+13*13", expect: "1300" }]),
  ],
  [
    luyen(R`Tính nhanh $125\cdot8\cdot17$.`, R`Kết quả là $17000$.`, [{ expr: "125*8*17", expect: "17000" }], R`Ghép $125\cdot8=1000$ rồi nhân với $17$ được $17000$.`),
    luyen(R`Tính nhanh $45\cdot99+45$.`, R`Kết quả là $4500$.`, [{ expr: "45*99+45", expect: "4500" }], R`Đặt $45$ làm thừa số chung: $45\cdot(99+1)=4500$.`),
    luyen(R`Tính nhanh $101\cdot99$.`, R`Kết quả là $9999$.`, [{ expr: "101*99", expect: "9999" }], R`Ta có $(100+1)(100-1)=100^2-1=9999$.`),
  ]);

export const luyThuaHuuTi: GradeLesson = bai("luy-thua-huu-ti", "Lũy thừa của số hữu tỉ",
  R`Lũy thừa bậc $n$ của $x$ là tích của $n$ thừa số $x$. Ta có $x^m\cdot x^n=x^{m+n}$, $x^m:x^n=x^{m-n}$ và $(x^m)^n=x^{mn}$.`,
  [
    vd(R`Tính $\left(\frac{2}{3}\right)^3$.`,
      [
        buoc(R`Lũy thừa bậc ba của $\frac{2}{3}$ là tích của ba thừa số $\frac{2}{3}$.`, R`Số mũ cho biết có bao nhiêu thừa số bằng nhau.`),
        buoc(R`Cả tử và mẫu cùng được nâng lên lũy thừa: $\frac{2^3}{3^3}=\frac{8}{27}$.`, R`Nhân ba phân số bằng nhau thì nhân tử với tử và mẫu với mẫu.`),
      ],
      R`Kết quả là $\frac{8}{27}$.`,
      [{ expr: "Rational(2,3)**3", expect: "Rational(8,27)" }]),
    vd(R`Tính $2^5\cdot2^3:2^6$.`,
      [
        buoc(R`Nhân hai lũy thừa cùng cơ số thì cộng số mũ: $2^5\cdot2^3=2^8$.`, R`Có $5$ thừa số $2$ rồi thêm $3$ thừa số $2$, tức là $8$ thừa số.`),
        buoc(R`Chia hai lũy thừa cùng cơ số thì trừ số mũ: $2^8:2^6=2^2=4$.`, R`Bớt $6$ thừa số $2$ khỏi $8$ thừa số thì còn $2$ thừa số.`),
      ],
      R`Kết quả là $4$.`,
      [{ expr: "2**5*2**3/2**6", expect: "4" }]),
  ],
  [
    luyen(R`Tính $(-2)^3$.`, R`Bằng $-8$.`, [{ expr: "(-2)**3", expect: "-8" }], R`Ba thừa số $-2$ nhân với nhau cho $-8$ vì số thừa số âm là lẻ.`),
    luyen(R`Tính $\left(\frac{1}{2}\right)^4$.`, R`Bằng $\frac{1}{16}$.`, [{ expr: "Rational(1,2)**4", expect: "Rational(1,16)" }], R`Tử là $1^4=1$ và mẫu là $2^4=16$.`),
    luyen(R`Tính $(3^2)^3:3^4$.`, R`Bằng $9$.`, [{ expr: "(3**2)**3/3**4", expect: "9" }], R`Ta có $(3^2)^3=3^6$, rồi $3^6:3^4=3^2=9$.`),
  ]);

export const lop6BaiToan: GradeChapter = chuong("bai-toan-6", "Phân số của một số và dãy số cách đều", [
  tinhNhanh,
  bai("day-cach-deu", "Dãy số cách đều",
    R`Dãy số cách đều có hiệu hai số liên tiếp không đổi, gọi là công sai $d$. Số hạng thứ $n$ là $a_1+(n-1)\cdot d$ và tổng của $n$ số hạng là $\frac{(a_1+a_n)\cdot n}{2}$.`,
    [
      vd(R`Cho dãy $3;\ 7;\ 11;\ 15;\ \dots$ Tìm số hạng thứ $10$.`,
        [
          buoc(R`Hiệu hai số liên tiếp là $7-3=4$.`, R`Dãy cách đều có hiệu không đổi giữa hai số hạng liền nhau.`),
          buoc(R`Số hạng thứ $10$ là $3+(10-1)\cdot4=39$.`, R`Từ số hạng đầu, cộng $9$ lần hiệu để tới số hạng thứ mười.`),
        ],
        R`Số hạng thứ $10$ là $39$.`,
        [{ expr: "3+9*4", expect: "39" }]),
      vd(R`Tính tổng $1+3+5+\dots+19$.`,
        [
          buoc(R`Số số hạng là $\frac{19-1}{2}+1=10$.`, R`Số số hạng bằng hiệu hai đầu chia cho công sai, rồi cộng một.`),
          buoc(R`Tổng là $\frac{(1+19)\cdot10}{2}=100$.`, R`Ghép số đầu với số cuối, mỗi cặp có tổng $20$ và có năm cặp.`),
        ],
        R`Tổng là $100$.`,
        [{ expr: "(1+19)*10/2", expect: "100" }]),
    ],
    [
      luyen(R`Cho dãy $5;\ 8;\ 11;\ 14;\ \dots$ Tìm số hạng thứ $20$.`, R`Số hạng thứ $20$ là $62$.`, [{ expr: "5+19*3", expect: "62" }], R`Ta có $5+(20-1)\cdot3=5+57=62$.`),
      luyen(R`Tính tổng $2+4+6+\dots+20$.`, R`Tổng là $110$.`, [{ expr: "(2+20)*10/2", expect: "110" }], R`Có $10$ số hạng nên tổng là $\frac{(2+20)\cdot10}{2}=110$.`),
      luyen(R`Tính tổng các số tự nhiên từ $1$ đến $100$.`, R`Tổng là $5050$.`, [{ expr: "(1+100)*100/2", expect: "5050" }], R`Có $100$ số hạng nên tổng là $\frac{(1+100)\cdot100}{2}=5050$.`),
    ]),
]);

export const lop7BaiToan: GradeChapter = chuong("bai-toan-7", "Chia theo tỉ lệ và giá trị biểu thức đại số", [
  bai("chia-ti-le", "Chia một số theo tỉ lệ",
    R`Để chia số $S$ thành các phần tỉ lệ với $a$, $b$, $c$, đặt các phần là $ka$, $kb$, $kc$ rồi dùng tính chất dãy tỉ số bằng nhau: $k=\frac{S}{a+b+c}$.`,
    [
      vd(R`Chia $60$ thành hai phần tỉ lệ với $2$ và $3$.`,
        [
          buoc(R`Gọi hai phần là $2k$ và $3k$ với $2k+3k=60$.`, R`Hai phần tỉ lệ với $2$ và $3$ nên viết được dưới dạng tích của $k$ với các số đó.`),
          buoc(R`Suy ra $k=12$, nên hai phần là $24$ và $36$.`, R`Từ $5k=60$ có $k=12$, rồi nhân $2$ và $3$ với $k$.`),
        ],
        R`Hai phần là $24$ và $36$.`,
        [{ expr: "60/5", expect: "12" }]),
      vd(R`Ba bạn góp vốn theo tỉ lệ $1$, $2$, $3$ và lãi tổng cộng $180$ nghìn đồng, chia theo tỉ lệ vốn. Mỗi bạn được bao nhiêu?`,
        [
          buoc(R`Gọi số lãi của ba bạn là $k$, $2k$ và $3k$ với $k+2k+3k=180$.`, R`Số lãi tỉ lệ với vốn $1$, $2$, $3$ nên có dạng $k$, $2k$, $3k$.`),
          buoc(R`Có $6k=180$ nên $k=30$; ba bạn được $30$, $60$ và $90$ nghìn đồng.`, R`Chia tổng cho tổng các phần là $180:6=30$, rồi nhân với từng hệ số.`),
        ],
        R`Ba bạn được $30$, $60$ và $90$ nghìn đồng.`,
        [{ expr: "180/6", expect: "30" }]),
    ],
    [
      luyen(R`Chia $100$ thành hai phần tỉ lệ với $2$ và $3$. Tìm phần lớn.`, R`Phần lớn là $60$.`, [{ expr: "100/5*3", expect: "60" }], R`Có $k=100:5=20$ nên phần lớn là $3\cdot20=60$.`),
      luyen(R`Chu vi một tam giác là $36$ cm, ba cạnh tỉ lệ với $3$, $4$, $5$. Tìm cạnh dài nhất.`, R`Cạnh dài nhất là $15$ cm.`, [{ expr: "36/12*5", expect: "15" }], R`Có $k=36:12=3$ nên cạnh dài nhất là $5\cdot3=15$ cm.`),
      luyen(R`Ba số $x$, $y$, $z$ tỉ lệ với $2$, $3$, $4$ và $x+y+z=45$. Tính $z-x$.`, R`Ta có $z-x=10$.`, [{ expr: "45/9*(4-2)", expect: "10" }], R`Có $k=45:9=5$ nên $z-x=(4-2)\cdot5=10$.`),
    ]),
  luyThuaHuuTi,
]);

export const lop8PhuongTrinh: GradeChapter = chuong("pt-tich-mau-8", "Phương trình tích và phương trình chứa ẩn ở mẫu", [
  bai("pt-tich", "Phương trình tích",
    R`Phương trình $A(x)\cdot B(x)=0$ tương đương với $A(x)=0$ hoặc $B(x)=0$. Đưa vế trái về tích các nhân tử, rồi giải từng phương trình.`,
    [
      vd(R`Giải phương trình $(x-2)(x+3)=0$.`,
        [
          buoc(R`Tích bằng $0$ khi một trong hai thừa số bằng $0$.`, R`Hai số có tích bằng $0$ thì ít nhất một số bằng $0$.`),
          buoc(R`Từ $x-2=0$ được $x=2$ và từ $x+3=0$ được $x=-3$.`, R`Giải từng phương trình bậc nhất nhận được.`),
        ],
        R`Phương trình có hai nghiệm $x=2$ và $x=-3$.`,
        [{ expr: "Max(*solve((x-2)*(x+3), x))", expect: "2" }, { expr: "Min(*solve((x-2)*(x+3), x))", expect: "-3" }]),
      vd(R`Giải phương trình $x^2-5x=0$.`,
        [
          buoc(R`Phân tích $x^2-5x=x(x-5)$.`, R`Đặt nhân tử chung $x$ để vế trái trở thành một tích.`),
          buoc(R`Suy ra $x=0$ hoặc $x-5=0$, tức $x=5$.`, R`Mỗi thừa số bằng $0$ cho một nghiệm.`),
        ],
        R`Phương trình có hai nghiệm $x=0$ và $x=5$.`,
        [{ expr: "Max(*solve(x**2-5*x, x))", expect: "5" }, { expr: "Min(*solve(x**2-5*x, x))", expect: "0" }]),
    ],
    [
      luyen(R`Giải phương trình $(2x-4)(x+1)=0$.`, R`Nghiệm là $x=2$ và $x=-1$.`, [{ expr: "Max(*solve((2*x-4)*(x+1), x))", expect: "2" }], R`Từ $2x-4=0$ được $x=2$ và từ $x+1=0$ được $x=-1$.`),
      luyen(R`Giải phương trình $x^2-9=0$.`, R`Nghiệm là $x=3$ và $x=-3$.`, [{ expr: "Max(*solve(x**2-9, x))", expect: "3" }], R`Phân tích $(x-3)(x+3)=0$ cho $x=3$ hoặc $x=-3$.`),
      luyen(R`Giải phương trình $x^2-3x+2=0$.`, R`Nghiệm là $x=1$ và $x=2$.`, [{ expr: "Max(*solve(x**2-3*x+2, x))", expect: "2" }], R`Phân tích $(x-1)(x-2)=0$ cho $x=1$ hoặc $x=2$.`),
    ]),
  bai("pt-mau", "Phương trình chứa ẩn ở mẫu",
    R`Với phương trình có ẩn ở mẫu, tìm điều kiện để mọi mẫu khác $0$, quy đồng và khử mẫu, giải phương trình nhận được rồi đối chiếu nghiệm với điều kiện.`,
    [
      vd(R`Giải phương trình $\frac{2}{x-1}=1$.`,
        [
          buoc(R`Điều kiện của phương trình là $x\ne1$.`, R`Mẫu $x-1$ phải khác $0$.`),
          buoc(R`Nhân hai vế với $x-1$ được $2=x-1$, nên $x=3$.`, R`Khử mẫu bằng cách nhân cả hai vế với $x-1$.`),
          buoc(R`Giá trị $x=3$ thỏa điều kiện $x\ne1$.`, R`Nghiệm phải khác giá trị làm mẫu bằng $0$.`),
        ],
        R`Nghiệm của phương trình là $x=3$.`,
        [{ expr: "solve(2/(x-1)-1, x)[0]", expect: "3" }]),
      vd(R`Giải phương trình $\frac{x}{x-2}=\frac{2}{x-2}$.`,
        [
          buoc(R`Điều kiện của phương trình là $x\ne2$.`, R`Mẫu $x-2$ phải khác $0$.`),
          buoc(R`Khử mẫu được $x=2$.`, R`Hai phân thức cùng mẫu bằng nhau thì hai tử bằng nhau.`),
          buoc(R`Giá trị $x=2$ không thỏa điều kiện nên bị loại.`, R`Với $x=2$ mẫu bằng $0$, nên phép chia không có nghĩa.`),
        ],
        R`Phương trình vô nghiệm.`,
        [{ expr: "len(solve(x/(x-2)-2/(x-2), x))", expect: "0" }]),
    ],
    [
      luyen(R`Giải phương trình $\frac{3}{x+1}=1$.`, R`Nghiệm là $x=2$.`, [{ expr: "solve(3/(x+1)-1, x)[0]", expect: "2" }], R`Điều kiện $x\ne-1$, khử mẫu được $3=x+1$ nên $x=2$.`),
      luyen(R`Giải phương trình $\frac{1}{x}+\frac{1}{2}=1$.`, R`Nghiệm là $x=2$.`, [{ expr: "solve(1/x+Rational(1,2)-1, x)[0]", expect: "2" }], R`Điều kiện $x\ne0$, ta có $\frac{1}{x}=\frac{1}{2}$ nên $x=2$.`),
      luyen(R`Giải phương trình $\frac{x+1}{x-1}=\frac{2}{x-1}+3$.`, R`Phương trình vô nghiệm.`, [{ expr: "len(solve((x+1)/(x-1)-2/(x-1)-3, x))", expect: "0" }], R`Khử mẫu được $x+1=2+3(x-1)$ nên $x=1$, nhưng $x=1$ làm mẫu bằng $0$ nên bị loại.`),
    ]),
]);
