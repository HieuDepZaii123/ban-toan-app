import type { GradeBook } from "./types.ts";
import { bai, buoc, chuong, luyen, vd } from "./types.ts";

const R = String.raw;

export const lop05: GradeBook = {
  grade: 5,
  band: "tieu-hoc",
  title: "Số thập phân, phần trăm, diện tích tam giác, hình tròn và thể tích hình hộp.",
  chapters: [
    chuong("thap-phan", "Số thập phân", [
      bai(
        "nhan-thap-phan",
        "Nhân số thập phân",
        R`Nhân số thập phân có thể đổi về nhân phân số. Số chữ số sau dấu phẩy của tích bằng tổng số chữ số sau dấu phẩy của hai thừa số, trước khi rút gọn kết quả.`,
        [vd(
          R`Tính $2{,}5\cdot 1{,}2$.`,
          [
            buoc(R`Đổi $2{,}5=\frac{5}{2}$ và $1{,}2=\frac{6}{5}$.`, "Một chữ số thập phân là mẫu $10$, và các phân số này đã rút gọn."),
            buoc(R`Tích bằng $\frac{5}{2}\cdot\frac{6}{5}=3$.`, "Rút gọn $5$ và $2$ với $6$. Kết quả là số nguyên $3$."),
          ],
          R`Tích bằng $3$.`,
          [{ expr: "Rational(5,2)*Rational(6,5)", expect: "3" }],
        )],
        [
          luyen(R`Tính $0{,}5\cdot 0{,}4$.`, R`Tích bằng $0{,}2$.`, [{ expr: "Rational(1,2)*Rational(2,5)", expect: "Rational(1,5)" }], "Đổi sang phân số rồi nhân. Một nửa của $\\frac{2}{5}$ bằng $\\frac{1}{5}$, tức $0{,}2$."),
          luyen(R`Tính $3{,}6$ chia $1{,}2$.`, R`Thương bằng $3$.`, [{ expr: "Rational(36,10)/Rational(12,10)", expect: "3" }], "Hai số có cùng một chữ số thập phân. Thương của $36$ và $12$ bằng $3$."),
          luyen(R`Tính $1{,}5+2{,}5$.`, R`Tổng bằng $4$.`, [{ expr: "Rational(3,2)+Rational(5,2)", expect: "4" }], "Cộng phần thập phân cùng hàng. Năm phần mười cộng năm phần mười thành một đơn vị."),
        ],
      ),
      bai(
        "lam-tron",
        "Làm tròn số thập phân",
        R`Làm tròn đến hàng phần mười: nhìn chữ số phần trăm. Nếu chữ số đó từ $5$ trở lên thì tăng chữ số phần mười thêm $1$. Nếu nhỏ hơn $5$ thì giữ nguyên chữ số phần mười.`,
        [vd(
          R`Làm tròn $3{,}26$ và $3{,}24$ đến hàng phần mười.`,
          [
            buoc(R`Số $3{,}26$ có chữ số phần trăm là $6\ge 5$, nên làm tròn thành $3{,}3$.`, "Chữ số cần xét là chữ số ngay sau hàng làm tròn. Từ $5$ trở lên thì làm tròn lên."),
            buoc(R`Số $3{,}24$ có chữ số phần trăm là $4<5$, nên làm tròn thành $3{,}2$.`, "Chữ số nhỏ hơn $5$ thì giữ nguyên chữ số phần mười và bỏ các chữ số phía sau."),
          ],
          R`Hai số làm tròn lần lượt thành $3{,}3$ và $3{,}2$.`,
          [{ expr: "Rational(33,10)", expect: "33/10" }, { expr: "Rational(32,10)", expect: "16/5" }],
        )],
        [
          luyen(R`Làm tròn $7{,}85$ đến hàng phần mười cho kết quả nào?`, R`Kết quả là $7{,}9$.`, [{ expr: "Rational(79,10)", expect: "79/10" }], "Chữ số phần trăm là $5$, nên tăng chữ số phần mười từ $8$ lên $9$."),
          luyen(R`Làm tròn $4{,}13$ đến hàng phần mười cho kết quả nào?`, R`Kết quả là $4{,}1$.`, [{ expr: "Rational(41,10)", expect: "41/10" }], "Chữ số phần trăm là $3$, nhỏ hơn $5$, nên giữ chữ số phần mười."),
          luyen(R`Hiệu giữa $3{,}3$ và $3{,}26$ bằng bao nhiêu?`, R`Hiệu bằng $0{,}04$.`, [{ expr: "Rational(33,10)-Rational(326,100)", expect: "Rational(4,100)" }], "Số đã làm tròn lên lớn hơn số ban đầu. Hiệu là bốn phần trăm."),
        ],
      ),
    ]),
    chuong("phan-tram", "Phần trăm", [
      bai(
        "mot-phan-tram",
        "Tìm một số phần trăm của một số",
        R`Có $p\%$ của một số là lấy số đó nhân với $\frac{p}{100}$. Muốn tìm cả số khi biết một phần trăm thì làm phép chia tương ứng.`,
        [vd(
          R`Tính $25\%$ của $80$ và tìm số mà $20\%$ của nó bằng $6$.`,
          [
            buoc(R`Lấy $25\%$ của $80$ được $80\cdot\frac{25}{100}=20$.`, "Phần trăm là phân số mẫu $100$. Một phần tư của $80$ cũng bằng $20$."),
            buoc(R`Nếu $20\%$ của một số bằng $6$ thì số đó bằng $6$ chia cho $\frac{20}{100}$, tức $30$.`, "Biết một phần thì chia để tìm cả số, và thương bằng $30$."),
          ],
          R`Có $25\%$ của $80$ bằng $20$, và số cần tìm bằng $30$.`,
          [
            { expr: "80*Rational(25,100)", expect: "20" },
            { expr: "6/Rational(20,100)", expect: "30" },
          ],
        )],
        [
          luyen(R`Tính $10\%$ của $250$.`, R`Kết quả bằng $25$.`, [{ expr: "250*Rational(10,100)", expect: "25" }], "Mười phần trăm là một phần mười. Một phần mười của $250$ bằng $25$."),
          luyen(R`Tính $50\%$ của $18$.`, R`Kết quả bằng $9$.`, [{ expr: "18*Rational(1,2)", expect: "9" }], "Năm mươi phần trăm bằng một nửa. Nửa của $18$ là $9$."),
          luyen(R`Một lớp $40$ bạn có $30\%$ đạt giải. Có bao nhiêu bạn đạt giải?`, R`Có $12$ bạn đạt giải.`, [{ expr: "40*Rational(30,100)", expect: "12" }], "Lấy $30$ phần trăm của $40$. Nhân $40$ với $\\frac{30}{100}$ được $12$."),
        ],
      ),
      bai(
        "doi-phan-tram",
        "Đổi phân số thành phần trăm",
        R`Muốn đổi một phân số thành phần trăm, viết phân số đó với mẫu $100$, hoặc nhân phân số với $100$ rồi đọc kết quả kèm dấu phần trăm.`,
        [vd(
          R`Đổi $\frac{1}{4}$ và $\frac{3}{5}$ thành phần trăm.`,
          [
            buoc(R`Phân số $\frac{1}{4}$ bằng $\frac{25}{100}$, tức $25\%$.`, "Nhân tử và mẫu với $25$ để mẫu thành $100$. Tử $25$ là số phần trăm."),
            buoc(R`Phân số $\frac{3}{5}$ bằng $\frac{60}{100}$, tức $60\%$.`, "Nhân tử và mẫu với $20$. Ba phần năm là sáu mươi phần trăm."),
          ],
          R`Một phần tư bằng $25\%$ và ba phần năm bằng $60\%$.`,
          [{ expr: "Rational(1,4)*100", expect: "25" }, { expr: "Rational(3,5)*100", expect: "60" }],
        )],
        [
          luyen(R`Đổi $\frac{1}{2}$ thành phần trăm.`, R`Một nửa bằng $50\%$.`, [{ expr: "Rational(1,2)*100", expect: "50" }], "Nhân phân số với $100$. Một nửa của $100$ là $50$."),
          luyen(R`Đổi $\frac{1}{5}$ thành phần trăm.`, R`Một phần năm bằng $20\%$.`, [{ expr: "Rational(1,5)*100", expect: "20" }], "Nhân $\\frac{1}{5}$ với $100$ được $20$. Đó là số phần trăm."),
          luyen(R`Biết $25\%$ của một số bằng $10$. Cả số bằng bao nhiêu?`, R`Cả số bằng $40$.`, [{ expr: "10/Rational(25,100)", expect: "40" }], "Chia phần đã biết cho phân số phần trăm. Thương là cả số ban đầu."),
        ],
      ),
    ]),
    chuong("dien-tich", "Diện tích", [
      bai(
        "tam-giac-thang",
        "Diện tích hình tam giác và hình thang",
        R`Diện tích tam giác bằng một nửa đáy nhân chiều cao. Diện tích hình thang bằng trung bình cộng hai đáy, rồi nhân với chiều cao.`,
        [vd(
          R`Tam giác có đáy $6$ và chiều cao $4$. Hình thang có hai đáy $3$ và $5$, chiều cao $4$. Tính hai diện tích.`,
          [
            buoc(R`Diện tích tam giác bằng $\frac{1}{2}\cdot 6\cdot 4=12$.`, "Một nửa tích đáy với chiều cao đúng ứng với đáy đó."),
            buoc(R`Diện tích hình thang bằng $\frac{3+5}{2}\cdot 4=16$.`, "Trung bình hai đáy là $4$, nhân với chiều cao $4$ được $16$."),
          ],
          R`Diện tích tam giác bằng $12$ và diện tích hình thang bằng $16$.`,
          [
            { expr: "Rational(1,2)*6*4", expect: "12" },
            { expr: "(3+5)/2*4", expect: "16" },
          ],
        )],
        [
          luyen(R`Tam giác đáy $10$ và cao $3$ có diện tích bằng bao nhiêu?`, R`Diện tích bằng $15$.`, [{ expr: "Rational(1,2)*10*3", expect: "15" }], "Một nửa của tích $10$ với $3$ bằng $15$. Chiều cao phải ứng với đúng đáy đã chọn."),
          luyen(R`Hình thang hai đáy $2$ và $6$, cao $5$, có diện tích bằng bao nhiêu?`, R`Diện tích bằng $20$.`, [{ expr: "(2+6)/2*5", expect: "20" }], "Trung bình hai đáy bằng $4$. Nhân với chiều cao $5$ được $20$."),
          luyen(R`Hình chữ nhật $4$ trên $4$ có diện tích bằng bao nhiêu?`, R`Diện tích bằng $16$.`, [{ expr: "4*4", expect: "16" }], "Hình chữ nhật này có hai kích thước bằng nhau, nên là hình vuông cạnh $4$. Diện tích là bình phương cạnh."),
        ],
        { figure: "triangle" },
      ),
      bai(
        "hinh-tron-5",
        "Chu vi và diện tích hình tròn",
        R`Hình tròn bán kính $r$ có chu vi $2\pi r$ và diện tích $\pi r^2$. Bán kính bằng nửa đường kính. Dùng nhầm đường kính vào chỗ bán kính làm diện tích lớn gấp bốn lần.`,
        [vd(
          R`Hình tròn có bán kính $5$ xentimét. Tính chu vi và diện tích.`,
          [
            buoc(R`Chu vi bằng $2\pi\cdot 5=10\pi$ xentimét.`, "Công thức chu vi nhân đôi bán kính rồi nhân với $\\pi$."),
            buoc(R`Diện tích bằng $\pi\cdot 5^2=25\pi$ xentimét vuông.`, "Bình phương bán kính trước khi nhân $\\pi$. Không bình phương đường kính."),
          ],
          R`Chu vi bằng $10\pi$ xentimét và diện tích bằng $25\pi$ xentimét vuông.`,
          [{ expr: "2*pi*5", expect: "10*pi" }, { expr: "pi*5**2", expect: "25*pi" }],
        )],
        [
          luyen(R`Đường kính bằng $10$ xentimét. Bán kính bằng bao nhiêu?`, R`Bán kính bằng $5$ xentimét.`, [{ expr: "10/2", expect: "5" }], "Bán kính là nửa đường kính. Công thức chu vi và diện tích dùng bán kính."),
          luyen(R`Hình tròn bán kính $1$ có chu vi bằng bao nhiêu?`, R`Chu vi bằng $2\pi$.`, [{ expr: "2*pi*1", expect: "2*pi" }], "Nhân $2\\pi$ với bán kính $1$. Kết quả giữ $\\pi$ trong giá trị chính xác."),
          luyen(R`Hình tròn bán kính $3$ có diện tích bằng bao nhiêu?`, R`Diện tích bằng $9\pi$.`, [{ expr: "pi*3**2", expect: "9*pi" }], "Bình phương bán kính bằng $9$, rồi nhân với $\\pi$."),
        ],
        { figure: "circle" },
      ),
    ]),
    chuong("the-tich", "Thể tích hình hộp", [
      bai(
        "hop",
        "Thể tích hình hộp chữ nhật",
        R`Hình hộp chữ nhật có ba kích thước $a, b, c$ thì thể tích bằng $a\cdot b\cdot c$. Đơn vị thể tích là đơn vị dài lập phương, ví dụ xentimét khối.`,
        [vd(
          R`Hộp có chiều dài $2$ xentimét, chiều rộng $3$ xentimét và chiều cao $4$ xentimét. Thể tích bằng bao nhiêu?`,
          [
            buoc(R`Diện tích đáy bằng $2\cdot 3=6$ xentimét vuông.`, "Đáy là hình chữ nhật. Diện tích đáy nhân với chiều cao ra thể tích."),
            buoc(R`Thể tích bằng $6\cdot 4=24$ xentimét khối.`, "Ba kích thước đều được nhân. Đơn vị là xentimét khối."),
          ],
          R`Thể tích bằng $24$ xentimét khối.`,
          [{ expr: "2*3*4", expect: "24" }],
        )],
        [
          luyen(R`Hình lập phương cạnh $3$ có thể tích bằng bao nhiêu?`, R`Thể tích bằng $27$.`, [{ expr: "3**3", expect: "27" }], "Hình lập phương có ba kích thước bằng nhau. Thể tích là lập phương của cạnh."),
          luyen(R`Hộp $5\cdot 2\cdot 2$ có thể tích bằng bao nhiêu?`, R`Thể tích bằng $20$.`, [{ expr: "5*2*2", expect: "20" }], "Nhân lần lượt ba kích thước. Diện tích đáy $10$ nhân chiều cao $2$ cũng ra $20$."),
          luyen(R`Hộp thể tích $24$ xentimét khối, xếp thành các lớp cao $4$ xentimét, mỗi lớp đặc. Diện tích đáy bằng bao nhiêu?`, R`Diện tích đáy bằng $6$ xentimét vuông.`, [{ expr: "24/4", expect: "6" }], "Thể tích bằng diện tích đáy nhân chiều cao. Chia thể tích cho chiều cao khác $0$."),
        ],
        { figure: "rect" },
      ),
      bai(
        "lap-phuong",
        "Hình lập phương",
        R`Hình lập phương có mười hai cạnh bằng nhau, sáu mặt là hình vuông. Thể tích bằng lập phương cạnh. Diện tích toàn phần bằng sáu lần diện tích một mặt.`,
        [vd(
          R`Hình lập phương cạnh $4$ xentimét. Tính thể tích và diện tích toàn phần.`,
          [
            buoc(R`Thể tích bằng $4^3=64$ xentimét khối.`, "Ba kích thước cùng bằng $4$. Nhân $4\\cdot 4\\cdot 4$."),
            buoc(R`Một mặt có diện tích $16$, sáu mặt có diện tích $96$ xentimét vuông.`, "Mỗi mặt là hình vuông cạnh $4$. Sáu mặt không chồng nhau khi tính diện tích toàn phần."),
          ],
          R`Thể tích bằng $64$ xentimét khối và diện tích toàn phần bằng $96$ xentimét vuông.`,
          [{ expr: "4**3", expect: "64" }, { expr: "6*4**2", expect: "96" }],
        )],
        [
          luyen(R`Hình lập phương cạnh $2$ có thể tích bằng bao nhiêu?`, R`Thể tích bằng $8$.`, [{ expr: "2**3", expect: "8" }], "Lập phương của $2$ là $8$. Cạnh nhân ba lần với chính nó."),
          luyen(R`Hình lập phương cạnh $5$ có diện tích một mặt bằng bao nhiêu?`, R`Diện tích một mặt bằng $25$.`, [{ expr: "5**2", expect: "25" }], "Mỗi mặt là hình vuông. Diện tích một mặt là bình phương cạnh."),
          luyen(R`Hình lập phương cạnh $5$ có diện tích toàn phần bằng bao nhiêu?`, R`Diện tích toàn phần bằng $150$.`, [{ expr: "6*5**2", expect: "150" }], "Sáu mặt vuông, mỗi mặt diện tích $25$. Sáu lần $25$ bằng $150$."),
        ],
      ),
    ]),
  ],
};
