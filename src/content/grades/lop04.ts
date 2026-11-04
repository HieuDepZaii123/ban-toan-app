import type { GradeBook } from "./types.ts";
import { bai, buoc, chuong, luyen, vd } from "./types.ts";

const R = String.raw;

export const lop04: GradeBook = {
  grade: 4,
  band: "tieu-hoc",
  title: "Phân số, số thập phân, góc và diện tích hình bình hành.",
  chapters: [
    chuong("phan-so", "Phân số", [
      bai(
        "cong-cung-mau",
        "Cộng phân số cùng mẫu",
        R`Hai phân số cùng mẫu thì cộng tử và giữ nguyên mẫu. Sau đó rút gọn nếu tử và mẫu còn ước chung lớn hơn $1$.`,
        [vd(
          R`Tính $\frac{1}{4}+\frac{2}{4}$.`,
          [
            buoc(R`Hai phân số có cùng mẫu $4$, nên cộng tử $1+2$.`, "Mẫu đã bằng nhau thì không cần quy đồng thêm."),
            buoc(R`Tổng bằng $\frac{3}{4}$.`, "Tử $3$ và mẫu $4$ không có ước chung lớn hơn $1$, nên phân số đã tối giản."),
          ],
          R`Tổng bằng $\frac{3}{4}$.`,
          [{ expr: "Rational(1,4)+Rational(2,4)", expect: "Rational(3,4)" }],
        )],
        [
          luyen(R`Tính $\frac{2}{3}\cdot\frac{3}{4}$.`, R`Tích bằng $\frac{1}{2}$.`, [{ expr: "Rational(2,3)*Rational(3,4)", expect: "Rational(1,2)" }], "Nhân tử với tử và mẫu với mẫu, rồi rút gọn thừa số $2$ và $3$."),
          luyen(R`Tính $\frac{5}{8}-\frac{1}{8}$.`, R`Hiệu bằng $\frac{1}{2}$.`, [{ expr: "Rational(5,8)-Rational(1,8)", expect: "Rational(1,2)" }], "Cùng mẫu thì trừ tử được $\\frac{4}{8}$. Rút gọn còn $\\frac{1}{2}$."),
          luyen(R`Rút gọn $\frac{4}{10}$.`, R`Phân số tối giản là $\frac{2}{5}$.`, [{ expr: "Rational(4,10)", expect: "Rational(2,5)" }], "Ước chung của tử và mẫu là $2$. Chia cả hai cho $2$."),
        ],
      ),
      bai(
        "quy-dong",
        "Quy đồng mẫu số",
        R`Quy đồng mẫu là viết các phân số thành phân số có cùng mẫu, giá trị không đổi. Mẫu chung có thể là bội chung nhỏ nhất của các mẫu.`,
        [vd(
          R`Quy đồng $\frac{1}{2}$ và $\frac{1}{3}$ về mẫu $6$, rồi tính tổng.`,
          [
            buoc(R`Ta có $\frac{1}{2}=\frac{3}{6}$ và $\frac{1}{3}=\frac{2}{6}$.`, "Nhân tử và mẫu của phân số thứ nhất với $3$, của phân số thứ hai với $2$."),
            buoc(R`Tổng bằng $\frac{5}{6}$.`, "Sau khi cùng mẫu, cộng tử và giữ mẫu. Tử $3+2$ bằng $5$."),
          ],
          R`Tổng bằng $\frac{5}{6}$.`,
          [{ expr: "Rational(1,2)+Rational(1,3)", expect: "Rational(5,6)" }],
        )],
        [
          luyen(R`Tính $\frac{1}{4}+\frac{1}{2}$.`, R`Tổng bằng $\frac{3}{4}$.`, [{ expr: "Rational(1,4)+Rational(1,2)", expect: "Rational(3,4)" }], "Quy đồng về mẫu $4$: một nửa bằng hai phần tư. Cộng tử được $3$."),
          luyen(R`Tính $\frac{2}{5}+\frac{1}{10}$.`, R`Tổng bằng $\frac{1}{2}$.`, [{ expr: "Rational(2,5)+Rational(1,10)", expect: "Rational(1,2)" }], "Mẫu chung $10$. Phân số $\\frac{2}{5}$ bằng $\\frac{4}{10}$, cộng $\\frac{1}{10}$ được $\\frac{5}{10}$."),
          luyen(R`Bội chung nhỏ nhất của mẫu $4$ và mẫu $6$ bằng bao nhiêu?`, R`Bội chung nhỏ nhất bằng $12$.`, [{ expr: "lcm(4,6)", expect: "12" }], "Mẫu chung nhỏ nhất dùng được khi quy đồng là bội chung nhỏ nhất của hai mẫu."),
        ],
      ),
    ]),
    chuong("thap-phan", "Số thập phân", [
      bai(
        "cong-thap-phan",
        "Cộng số thập phân",
        R`Cộng số thập phân thì viết các chữ số cùng hàng thẳng cột: hàng đơn vị với hàng đơn vị, hàng phần mười với hàng phần mười.`,
        [vd(
          R`Tính $2{,}5+1{,}5$.`,
          [
            buoc(R`Đổi $2{,}5=\frac{5}{2}$ và $1{,}5=\frac{3}{2}$.`, "Hai số thập phân một chữ số sau dấu phẩy là các phân số mẫu $2$ hoặc mẫu $10$."),
            buoc(R`Tổng bằng $\frac{8}{2}=4$.`, "Cộng tử khi mẫu đã giống nhau. Kết quả là số nguyên $4$."),
          ],
          R`Tổng bằng $4$.`,
          [{ expr: "Rational(5,2)+Rational(3,2)", expect: "4" }],
        )],
        [
          luyen(R`Tính $0{,}5\cdot 4$.`, R`Tích bằng $2$.`, [{ expr: "Rational(1,2)*4", expect: "2" }], "Một nửa nhân với $4$ bằng $2$. Số thập phân $0{,}5$ là phân số $\\frac{1}{2}$."),
          luyen(R`Tính $3{,}2-1{,}2$.`, R`Hiệu bằng $2$.`, [{ expr: "Rational(32,10)-Rational(12,10)", expect: "2" }], "Hai số có cùng số chữ số thập phân. Trừ hàng phần mười và hàng đơn vị được $2$."),
          luyen(R`Tính $1{,}25+2{,}75$.`, R`Tổng bằng $4$.`, [{ expr: "Rational(125,100)+Rational(275,100)", expect: "4" }], "Cộng các chữ số cùng hàng. Phần thập phân $25$ cộng $75$ thành một đơn vị, tổng là $4$."),
        ],
      ),
      bai(
        "doc-thap-phan",
        "Đọc và viết số thập phân",
        R`Chữ số đầu tiên sau dấu phẩy là hàng phần mười, chữ số tiếp theo là hàng phần trăm. Số $3{,}25$ gồm $3$ đơn vị, $2$ phần mười và $5$ phần trăm.`,
        [vd(
          R`Viết số gồm $3$ đơn vị và $25$ phần trăm dưới dạng số thập phân, rồi đổi thành phân số.`,
          [
            buoc(R`Số thập phân là $3{,}25$.`, "Hai chữ số sau dấu phẩy là hàng phần mười và hàng phần trăm."),
            buoc(R`Phân số tương ứng là $\frac{325}{100}=\frac{13}{4}$.`, "Ba đơn vị là $\\frac{300}{100}$, thêm $25$ phần trăm được tử $325$."),
          ],
          R`Số cần viết là $3{,}25$, tức $\frac{13}{4}$.`,
          [{ expr: "Rational(325,100)", expect: "Rational(13,4)" }],
        )],
        [
          luyen(R`Số $0{,}7$ bằng bao nhiêu phần mười?`, R`Bằng $7$ phần mười.`, [{ expr: "Rational(7,10)", expect: "7/10" }], "Một chữ số sau dấu phẩy đứng ở hàng phần mười. Số $0{,}7$ là $\\frac{7}{10}$."),
          luyen(R`Số $0{,}05$ bằng bao nhiêu phần trăm?`, R`Bằng $5$ phần trăm.`, [{ expr: "Rational(5,100)", expect: "1/20" }], "Hai chữ số sau dấu phẩy, chữ số phần mười là $0$ và chữ số phần trăm là $5$."),
          luyen(R`Tính $0{,}25+0{,}75$.`, R`Tổng bằng $1$.`, [{ expr: "Rational(25,100)+Rational(75,100)", expect: "1" }], "Hai mươi lăm phần trăm cộng bảy mươi lăm phần trăm đủ một trăm phần trăm, tức bằng $1$."),
        ],
      ),
    ]),
    chuong("goc-hinh", "Góc và diện tích", [
      bai(
        "binh-hanh",
        "Diện tích hình bình hành và góc vuông",
        R`Diện tích hình bình hành bằng đáy nhân chiều cao tương ứng. Góc vuông có số đo $90^\circ$. Góc bẹt có số đo $180^\circ$.`,
        [vd(
          R`Hình bình hành có đáy $6$ xentimét và chiều cao tương ứng $4$ xentimét. Diện tích bằng bao nhiêu?`,
          [
            buoc(R`Chiều cao phải vuông góc với đường chứa đáy.`, "Công thức dùng chiều cao ứng với đúng cạnh đáy đã chọn."),
            buoc(R`Diện tích bằng $6\cdot 4=24$ xentimét vuông.`, "Nhân đáy với chiều cao. Đơn vị là xentimét vuông."),
          ],
          R`Diện tích bằng $24$ xentimét vuông.`,
          [{ expr: "6*4", expect: "24" }],
        )],
        [
          luyen(R`Góc vuông bằng nửa góc bẹt $180^\circ$. Số đo góc vuông bằng bao nhiêu độ?`, R`Góc vuông có số đo $90^\circ$.`, [{ expr: "180/2", expect: "90" }], "Nửa của góc bẹt là góc vuông. Chia $180$ cho $2$ được $90$."),
          luyen(R`Hình chữ nhật dài $7$ và rộng $3$ có diện tích bằng bao nhiêu?`, R`Diện tích bằng $21$.`, [{ expr: "7*3", expect: "21" }], "Hình chữ nhật là hình bình hành có góc vuông. Diện tích bằng dài nhân rộng."),
          luyen(R`Hai góc vuông cộng lại bằng bao nhiêu độ?`, R`Tổng bằng $180^\circ$.`, [{ expr: "90+90", expect: "180" }], "Mỗi góc vuông là $90^\\circ$. Tổng hai góc vuông bằng một góc bẹt."),
        ],
        { figure: "angle" },
      ),
      bai(
        "phan-so-cua-so",
        "Tìm phân số của một số",
        R`Muốn tìm $\frac{a}{b}$ của một số, chia số đó cho $b$ rồi nhân với $a$. Mẫu $b$ phải khác $0$.`,
        [vd(
          R`Tìm $\frac{2}{5}$ của $20$ viên bi.`,
          [
            buoc(R`Chia $20$ cho $5$ được $4$.`, "Mẫu $5$ tách $20$ viên thành năm phần bằng nhau, mỗi phần $4$ viên."),
            buoc(R`Lấy $2$ phần: $2\cdot 4=8$ viên.`, "Tử $2$ cho biết lấy hai phần trong năm phần."),
          ],
          R`Có $\frac{2}{5}$ của $20$ viên là $8$ viên.`,
          [{ expr: "20*Rational(2,5)", expect: "8" }],
        )],
        [
          luyen(R`Tìm $\frac{3}{4}$ của $12$.`, R`Kết quả bằng $9$.`, [{ expr: "12*Rational(3,4)", expect: "9" }], "Chia $12$ cho $4$ được $3$, rồi lấy ba phần. Ba nhân $3$ bằng $9$."),
          luyen(R`Tìm $\frac{1}{2}$ của $18$.`, R`Kết quả bằng $9$.`, [{ expr: "18*Rational(1,2)", expect: "9" }], "Một nửa là chia cho $2$. Nửa của $18$ bằng $9$."),
          luyen(R`Tìm $\frac{2}{3}$ của $9$.`, R`Kết quả bằng $6$.`, [{ expr: "9*Rational(2,3)", expect: "6" }], "Một phần ba của $9$ là $3$. Hai phần như vậy bằng $6$."),
        ],
      ),
    ]),
  ],
};
