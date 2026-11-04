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
          luyen(R`Tính $\frac{2}{3}\cdot\frac{3}{4}$.`, R`Tích bằng $\frac{1}{2}$.`, [{ expr: "Rational(2,3)*Rational(3,4)", expect: "Rational(1,2)" }]),
          luyen(R`Tính $\frac{5}{8}-\frac{1}{8}$.`, R`Hiệu bằng $\frac{1}{2}$.`, [{ expr: "Rational(5,8)-Rational(1,8)", expect: "Rational(1,2)" }]),
          luyen(R`Rút gọn $\frac{4}{10}$.`, R`Phân số tối giản là $\frac{2}{5}$.`, [{ expr: "Rational(4,10)", expect: "Rational(2,5)" }]),
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
          luyen(R`Tính $0{,}5\cdot 4$.`, R`Tích bằng $2$.`, [{ expr: "Rational(1,2)*4", expect: "2" }]),
          luyen(R`Tính $3{,}2-1{,}2$.`, R`Hiệu bằng $2$.`, [{ expr: "Rational(32,10)-Rational(12,10)", expect: "2" }]),
          luyen(R`Số $125\cdot 8$ bằng bao nhiêu?`, R`Tích bằng $1000$.`, [{ expr: "125*8", expect: "1000" }]),
        ],
      ),
    ]),
    chuong("goc-hinh", "Góc và diện tích", [
      bai(
        "binh-hanh",
        "Diện tích hình bình hành và góc vuông",
        R`Diện tích hình bình hành bằng đáy nhân chiều cao tương ứng. Góc vuông có số đo $90^\circ$.`,
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
          luyen(R`Một góc vuông có số đo bao nhiêu độ?`, R`Góc vuông có số đo $90^\circ$.`, [{ expr: "45+45", expect: "90" }]),
          luyen(R`Hình chữ nhật dài $7$ và rộng $3$ có diện tích bằng bao nhiêu?`, R`Diện tích bằng $21$.`, [{ expr: "7*3", expect: "21" }]),
          luyen(R`Hai góc vuông cộng lại bằng bao nhiêu độ?`, R`Tổng bằng $180^\circ$.`, [{ expr: "90+90", expect: "180" }]),
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
          luyen(R`Tìm $\frac{3}{4}$ của $12$.`, R`Kết quả bằng $9$.`, [{ expr: "12*Rational(3,4)", expect: "9" }]),
          luyen(R`Tìm $\frac{1}{2}$ của $18$.`, R`Kết quả bằng $9$.`, [{ expr: "18*Rational(1,2)", expect: "9" }]),
          luyen(R`Tìm $\frac{2}{3}$ của $9$.`, R`Kết quả bằng $6$.`, [{ expr: "9*Rational(2,3)", expect: "6" }]),
        ],
      ),
    ]),
  ],
};
