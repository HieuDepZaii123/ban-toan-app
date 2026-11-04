import type { GradeBook } from "./types.ts";
import { bai, buoc, chuong, luyen, vd } from "./types.ts";

const R = String.raw;

export const lop05: GradeBook = {
  grade: 5,
  band: "tieu-hoc",
  title: "Số thập phân, phần trăm, diện tích tam giác, hình thang và thể tích hình hộp.",
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
          luyen(R`Tính $0{,}5\cdot 0{,}4$.`, R`Tích bằng $0{,}2$.`, [{ expr: "Rational(1,2)*Rational(2,5)", expect: "Rational(1,5)" }]),
          luyen(R`Tính $3{,}6$ chia $1{,}2$.`, R`Thương bằng $3$.`, [{ expr: "Rational(36,10)/Rational(12,10)", expect: "3" }]),
          luyen(R`Tính $1{,}5+2{,}5$.`, R`Tổng bằng $4$.`, [{ expr: "Rational(3,2)+Rational(5,2)", expect: "4" }]),
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
            buoc(R`Nếu $20\%$ của một số bằng $6$ thì số đó bằng $6$ chia cho $\frac{20}{100}$, tức $30$.`, "Biết một phần thì chia để tìm cả số, và thương $\\frac{6}{0{,}2}$ bằng $30$."),
          ],
          R`Có $25\%$ của $80$ bằng $20$, và số cần tìm bằng $30$.`,
          [
            { expr: "80*Rational(25,100)", expect: "20" },
            { expr: "6/Rational(20,100)", expect: "30" },
          ],
        )],
        [
          luyen(R`Tính $10\%$ của $250$.`, R`Kết quả bằng $25$.`, [{ expr: "250*Rational(10,100)", expect: "25" }]),
          luyen(R`Tính $50\%$ của $18$.`, R`Kết quả bằng $9$.`, [{ expr: "18*Rational(1,2)", expect: "9" }]),
          luyen(R`Một lớp $40$ bạn có $30\%$ đạt giải. Có bao nhiêu bạn đạt giải?`, R`Có $12$ bạn đạt giải.`, [{ expr: "40*Rational(30,100)", expect: "12" }]),
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
          luyen(R`Tam giác đáy $10$ và cao $3$ có diện tích bằng bao nhiêu?`, R`Diện tích bằng $15$.`, [{ expr: "Rational(1,2)*10*3", expect: "15" }]),
          luyen(R`Hình thang hai đáy $2$ và $6$, cao $5$, có diện tích bằng bao nhiêu?`, R`Diện tích bằng $20$.`, [{ expr: "(2+6)/2*5", expect: "20" }]),
          luyen(R`Hình chữ nhật $4$ trên $4$ có diện tích bằng bao nhiêu?`, R`Diện tích bằng $16$.`, [{ expr: "4*4", expect: "16" }]),
        ],
        { figure: "triangle" },
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
          luyen(R`Hình lập phương cạnh $3$ có thể tích bằng bao nhiêu?`, R`Thể tích bằng $27$.`, [{ expr: "3**3", expect: "27" }]),
          luyen(R`Hộp $5\cdot 2\cdot 2$ có thể tích bằng bao nhiêu?`, R`Thể tích bằng $20$.`, [{ expr: "5*2*2", expect: "20" }]),
          luyen(R`Chia $24$ viên xếp đầy hộp thành các lớp cao $4$ viên. Mỗi lớp có bao nhiêu viên?`, R`Mỗi lớp có $6$ viên.`, [{ expr: "24/4", expect: "6" }]),
        ],
        { figure: "rect" },
      ),
    ]),
  ],
};
