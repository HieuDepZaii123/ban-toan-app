import type { GradeBook } from "./types.ts";
import { bai, buoc, chuong, luyen, vd } from "./types.ts";

const R = String.raw;

export const lop03: GradeBook = {
  grade: 3,
  band: "tieu-hoc",
  title: "Nhân, chia, phân số đơn giản, chu vi và diện tích.",
  chapters: [
    chuong("nhan-chia", "Nhân và chia các số trong phạm vi đã học", [
      bai(
        "nhan-hai-chu",
        "Nhân số có hai chữ số",
        R`Nhân số có hai chữ số với số có một chữ số: nhân hàng đơn vị trước, có nhớ thì cộng vào hàng chục.`,
        [vd(
          R`Tính $12\cdot 13$ bằng cách viết $12\cdot(10+3)$.`,
          [
            buoc(R`Ta có $12\cdot 10=120$ và $12\cdot 3=36$.`, "Tách $13$ thành $10$ cộng $3$, rồi nhân từng phần với $12$."),
            buoc(R`Cộng $120+36=156$.`, "Phép nhân phân phối qua phép cộng. Tổng hai phần là tích cần tìm."),
          ],
          R`Tích bằng $156$.`,
          [{ expr: "12*13", expect: "156" }],
        )],
        [
          luyen(R`Tính $48$ chia $6$.`, R`Thương bằng $8$.`, [{ expr: "48/6", expect: "8" }], "Sáu nhân $8$ bằng $48$, nên phép chia hết và thương là $8$."),
          luyen(R`Tính $25\cdot 4$.`, R`Tích bằng $100$.`, [{ expr: "25*4", expect: "100" }], "Bốn lần $25$ bằng một trăm. Có thể tính $25\\cdot 2\\cdot 2$."),
          luyen(R`Tính $7\cdot 8$.`, R`Tích bằng $56$.`, [{ expr: "7*8", expect: "56" }], "Bảng nhân $7$ và bảng nhân $8$ cùng cho tích $56$."),
        ],
      ),
      bai(
        "chia-du",
        "Chia hết và phép chia có dư",
        R`Khi chia không hết, thương là số lần lớn nhất mà số chia chứa trong số bị chia, và số dư nhỏ hơn số chia. Số bị chia bằng thương nhân số chia, rồi cộng số dư.`,
        [vd(
          R`Chia $17$ cho $5$. Tìm thương và số dư.`,
          [
            buoc(R`Ta có $5\cdot 3=15$ và $5\cdot 4=20$ lớn hơn $17$.`, "Thương là số nguyên lớn nhất sao cho tích chưa vượt số bị chia."),
            buoc(R`Vậy thương bằng $3$ và số dư bằng $17-15=2$.`, "Số dư phải nhỏ hơn số chia $5$. Kiểm tra lại: $5\\cdot 3+2=17$."),
          ],
          R`Thương bằng $3$ và số dư bằng $2$.`,
          [{ expr: "5*3+2", expect: "17" }],
        )],
        [
          luyen(R`Chia $20$ cho $6$. Thương bằng bao nhiêu và dư bao nhiêu?`, R`Thương bằng $3$ và dư $2$.`, [{ expr: "6*3+2", expect: "20" }], "Sáu nhân $3$ bằng $18$, còn dư $2$. Số dư nhỏ hơn số chia."),
          luyen(R`Chia $25$ cho $4$. Số dư bằng bao nhiêu?`, R`Thương bằng $6$ và số dư bằng $1$.`, [{ expr: "25-4*6", expect: "1" }], "Bốn nhân $6$ bằng $24$. Hiệu $25-24$ là số dư, và số dư nhỏ hơn $4$."),
          luyen(R`Chia $18$ cho $5$. Tích của thương với số chia, rồi cộng dư, có bằng $18$ không?`, R`Có, vì $5\cdot 3+3=18$.`, [{ expr: "5*3+3", expect: "18" }], "Quan hệ chia có dư: số bị chia bằng thương nhân số chia cộng số dư."),
        ],
      ),
    ]),
    chuong("phan-so", "Làm quen với phân số", [
      bai(
        "mot-phan",
        "Một phần mấy của một số",
        R`Một nửa của một số là số đó chia cho $2$. Một phần ba là số đó chia cho $3$. Phần lấy ra không lớn hơn cả nhóm khi tử không lớn hơn mẫu.`,
        [vd(
          R`Một nửa của $8$ quả táo là bao nhiêu quả?`,
          [
            buoc(R`Một nửa nghĩa là chia thành $2$ phần bằng nhau.`, "Mẫu số $2$ cho biết số phần bằng nhau."),
            buoc(R`Mỗi phần có $8$ chia $2$, bằng $4$ quả.`, "Hai phần bằng nhau cộng lại đủ $8$ quả."),
          ],
          R`Một nửa của $8$ quả là $4$ quả.`,
          [{ expr: "8/2", expect: "4" }],
        )],
        [
          luyen(R`Một phần ba của $12$ bằng bao nhiêu?`, R`Kết quả bằng $4$.`, [{ expr: "12/3", expect: "4" }], "Chia $12$ thành ba phần bằng nhau. Mỗi phần là $4$."),
          luyen(R`Một phần tư của $20$ bằng bao nhiêu?`, R`Kết quả bằng $5$.`, [{ expr: "20/4", expect: "5" }], "Mẫu $4$ tách $20$ thành bốn phần bằng nhau, mỗi phần $5$."),
          luyen(R`Hai phần tư của $8$ bằng bao nhiêu?`, R`Kết quả bằng $4$.`, [{ expr: "8*Rational(2,4)", expect: "4" }], "Lấy hai trong bốn phần bằng nhau của $8$. Hai phần tư cũng bằng một nửa."),
        ],
      ),
      bai(
        "phan-bang",
        "Phân số bằng nhau",
        R`Hai phân số bằng nhau khi nhân tử và mẫu của phân số thứ nhất với cùng một số khác $0$ thì được phân số thứ hai. Một nửa bằng hai phần tư.`,
        [vd(
          R`Chứng minh $\frac{1}{2}=\frac{2}{4}$.`,
          [
            buoc(R`Nhân tử và mẫu của $\frac{1}{2}$ với $2$.`, "Nhân tử và mẫu với cùng một số khác $0$ thì giá trị phân số không đổi."),
            buoc(R`Được $\frac{2}{4}$, nên hai phân số bằng nhau.`, "Tử $1\\cdot 2$ và mẫu $2\\cdot 2$. Đây là cùng một phần của một đơn vị."),
          ],
          R`Hai phân số bằng nhau.`,
          [{ expr: "Rational(1,2)-Rational(2,4)", expect: "0" }],
        )],
        [
          luyen(R`Phân số $\frac{1}{3}$ có bằng $\frac{2}{6}$ không?`, R`Có, hai phân số bằng nhau.`, [{ expr: "Rational(1,3)-Rational(2,6)", expect: "0" }], "Nhân tử và mẫu của phân số thứ nhất với $2$ được phân số thứ hai."),
          luyen(R`Một nửa của $10$ bằng bao nhiêu?`, R`Kết quả bằng $5$.`, [{ expr: "10/2", expect: "5" }], "Một nửa là chia thành hai phần bằng nhau. Mỗi phần của $10$ là $5$."),
          luyen(R`Ba phần sáu của $12$ bằng bao nhiêu?`, R`Kết quả bằng $6$.`, [{ expr: "12*Rational(3,6)", expect: "6" }], "Ba phần sáu bằng một nửa. Một nửa của $12$ là $6$."),
        ],
      ),
    ]),
    chuong("do", "Chu vi và diện tích", [
      bai(
        "chu-vi-dien-tich",
        "Chu vi và diện tích hình chữ nhật",
        R`Hình chữ nhật dài $a$ và rộng $b$ có chu vi $2(a+b)$ và diện tích $a\cdot b$. Chu vi đo bằng đơn vị dài. Diện tích đo bằng đơn vị diện tích.`,
        [vd(
          R`Hình chữ nhật dài $5$ xentimét và rộng $3$ xentimét. Tính chu vi và diện tích.`,
          [
            buoc(R`Chu vi bằng $2\cdot(5+3)=16$ xentimét.`, "Đi hết một vòng qua hai chiều dài và hai chiều rộng."),
            buoc(R`Diện tích bằng $5\cdot 3=15$ xentimét vuông.`, "Diện tích là tích chiều dài với chiều rộng, đơn vị là xentimét vuông."),
          ],
          R`Chu vi bằng $16$ xentimét và diện tích bằng $15$ xentimét vuông.`,
          [
            { expr: "2*(5+3)", expect: "16" },
            { expr: "5*3", expect: "15" },
          ],
        )],
        [
          luyen(R`Hình vuông cạnh $4$ có chu vi bằng bao nhiêu?`, R`Chu vi bằng $16$.`, [{ expr: "4*4", expect: "16" }], "Hình vuông có bốn cạnh bằng nhau. Chu vi bằng bốn lần một cạnh."),
          luyen(R`Hình chữ nhật dài $9$ và rộng $2$ có diện tích bằng bao nhiêu?`, R`Diện tích bằng $18$.`, [{ expr: "9*2", expect: "18" }], "Diện tích hình chữ nhật là tích chiều dài với chiều rộng."),
          luyen(R`Hình chữ nhật dài $8$ và rộng $2$ có chu vi bằng bao nhiêu?`, R`Chu vi bằng $20$.`, [{ expr: "2*(8+2)", expect: "20" }], "Cộng chiều dài với chiều rộng được $10$, rồi nhân $2$ vì có hai cặp cạnh."),
        ],
        { figure: "rect" },
      ),
      bai(
        "nhan-10",
        "Nhân với 10 và với 100",
        R`Nhân một số tự nhiên với $10$ là thêm một chữ số $0$ vào bên phải. Nhân với $100$ là thêm hai chữ số $0$.`,
        [vd(
          R`Tính $25\cdot 10$ và $25\cdot 100$.`,
          [
            buoc(R`Tích $25\cdot 10$ bằng $250$.`, "Thêm một chữ số $0$ vì mỗi chục có mười đơn vị."),
            buoc(R`Tích $25\cdot 100$ bằng $2500$.`, "Thêm hai chữ số $0$ vì mỗi trăm có một trăm đơn vị."),
          ],
          R`Hai tích lần lượt bằng $250$ và $2500$.`,
          [
            { expr: "25*10", expect: "250" },
            { expr: "25*100", expect: "2500" },
          ],
        )],
        [
          luyen(R`Tính $7\cdot 10$.`, R`Tích bằng $70$.`, [{ expr: "7*10", expect: "70" }], "Nhân với $10$ thì thêm một chữ số $0$ vào bên phải số $7$."),
          luyen(R`Tính $7\cdot 100$.`, R`Tích bằng $700$.`, [{ expr: "7*100", expect: "700" }], "Nhân với $100$ thì thêm hai chữ số $0$. Bảy trăm là $700$."),
          luyen(R`Tính $40\cdot 10$.`, R`Tích bằng $400$.`, [{ expr: "40*10", expect: "400" }], "Thêm một chữ số $0$ vào $40$ được $400$."),
        ],
      ),
    ]),
  ],
};
