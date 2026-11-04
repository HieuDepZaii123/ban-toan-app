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
          luyen(R`Tính $48$ chia $6$.`, R`Thương bằng $8$.`, [{ expr: "48/6", expect: "8" }]),
          luyen(R`Tính $25\cdot 4$.`, R`Tích bằng $100$.`, [{ expr: "25*4", expect: "100" }]),
          luyen(R`Tính $7\cdot 8$.`, R`Tích bằng $56$.`, [{ expr: "7*8", expect: "56" }]),
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
          luyen(R`Một phần ba của $12$ bằng bao nhiêu?`, R`Kết quả bằng $4$.`, [{ expr: "12/3", expect: "4" }]),
          luyen(R`Một phần tư của $20$ bằng bao nhiêu?`, R`Kết quả bằng $5$.`, [{ expr: "20/4", expect: "5" }]),
          luyen(R`Hai phần tư của $8$ bằng bao nhiêu?`, R`Kết quả bằng $4$.`, [{ expr: "8*Rational(2,4)", expect: "4" }]),
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
          luyen(R`Hình vuông cạnh $4$ có chu vi bằng bao nhiêu?`, R`Chu vi bằng $16$.`, [{ expr: "4*4", expect: "16" }]),
          luyen(R`Hình chữ nhật dài $9$ và rộng $2$ có diện tích bằng bao nhiêu?`, R`Diện tích bằng $18$.`, [{ expr: "9*2", expect: "18" }]),
          luyen(R`Đổi $2000$ gam ra kilôgam.`, R`Bằng $2$ kilôgam.`, [{ expr: "2000/1000", expect: "2" }]),
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
          luyen(R`Tính $7\cdot 10$.`, R`Tích bằng $70$.`, [{ expr: "7*10", expect: "70" }]),
          luyen(R`Tính $7\cdot 100$.`, R`Tích bằng $700$.`, [{ expr: "7*100", expect: "700" }]),
          luyen(R`Tính $40\cdot 10$.`, R`Tích bằng $400$.`, [{ expr: "40*10", expect: "400" }]),
        ],
      ),
    ]),
  ],
};
