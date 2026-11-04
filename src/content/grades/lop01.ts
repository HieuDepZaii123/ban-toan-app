import type { GradeBook } from "./types.ts";
import { bai, buoc, chuong, luyen, vd } from "./types.ts";

const R = String.raw;

export const lop01: GradeBook = {
  grade: 1,
  band: "tieu-hoc",
  title: "Các số đến 10 và đến 100, phép cộng, phép trừ, hình quen thuộc.",
  chapters: [
    chuong("so-10", "Các số đến 10", [
      bai(
        "dem-10",
        "Đếm các số từ 1 đến 10",
        R`Các số $1, 2, 3, 4, 5, 6, 7, 8, 9, 10$ đi liền nhau. Số đứng sau lớn hơn số đứng trước đúng $1$.`,
        [vd(
          R`Có $4$ ngôi sao. Đếm thêm một ngôi. Hỏi được số mấy?`,
          [
            buoc(R`Số đứng ngay sau $4$ là $5$.`, "Trên dãy số, mỗi bước đếm thêm một đơn vị."),
            buoc(R`Vậy đếm được số $5$.`, "Thêm một ngôi sao làm nhóm tăng từ bốn lên năm."),
          ],
          R`Đếm được số $5$.`,
          [{ expr: "4+1", expect: "5" }],
        )],
        [
          luyen(R`Số đứng ngay sau $7$ là số nào?`, R`Số đứng sau là $8$.`, [{ expr: "7+1", expect: "8" }]),
          luyen(R`Số đứng ngay trước $6$ là số nào?`, R`Số đứng trước là $5$.`, [{ expr: "6-1", expect: "5" }]),
          luyen(R`Đếm $3$ rồi đếm thêm $1$. Được số nào?`, R`Được số $4$.`, [{ expr: "3+1", expect: "4" }]),
        ],
        { figure: "count" },
      ),
      bai(
        "so-sanh",
        "So sánh hai số",
        R`Số nào đứng sau trên dãy đếm thì lớn hơn. Dấu $>$ đọc là lớn hơn. Dấu $<$ đọc là bé hơn.`,
        [vd(
          R`So sánh $8$ và $5$.`,
          [
            buoc(R`Đếm từ $5$ còn phải đi tiếp mới tới $8$.`, "Số $8$ đứng sau số $5$ trên dãy đếm."),
            buoc(R`Vậy $8>5$.`, "Số đứng sau lớn hơn số đứng trước."),
          ],
          R`Ta có $8>5$.`,
          [{ expr: "8-5", expect: "3" }],
        )],
        [
          luyen(R`Số nào lớn hơn, $2$ hay $9$?`, R`Số $9$ lớn hơn số $2$.`, [{ expr: "9-2", expect: "7" }]),
          luyen(R`Điền dấu so sánh cho $4$ và $4$.`, R`Hai số bằng nhau: $4=4$.`, [{ expr: "4-4", expect: "0" }]),
          luyen(R`Số $1$ và số $10$, số nào bé hơn?`, R`Số $1$ bé hơn số $10$.`, [{ expr: "10-1", expect: "9" }]),
        ],
      ),
    ]),
    chuong("cong-tru", "Phép cộng và phép trừ trong phạm vi 10", [
      bai(
        "cong-10",
        "Phép cộng trong phạm vi 10",
        R`Phép cộng gộp hai nhóm: $3+2$ là nhóm $3$ thêm nhóm $2$, được $5$.`,
        [vd(
          R`Có $3$ quả cam. Thêm $2$ quả. Hỏi có tất cả bao nhiêu quả?`,
          [
            buoc(R`Gộp $3$ quả với $2$ quả.`, "Phép cộng lấy đủ cả hai nhóm, không bỏ nhóm nào."),
            buoc(R`Đếm được $5$ quả.`, "Từ $3$ đếm tiếp hai bước: bốn, rồi năm."),
          ],
          R`Có tất cả $5$ quả cam.`,
          [{ expr: "3+2", expect: "5" }],
        )],
        [
          luyen(R`Tính $4+3$.`, R`Tổng bằng $7$.`, [{ expr: "4+3", expect: "7" }]),
          luyen(R`Tính $6+4$.`, R`Tổng bằng $10$.`, [{ expr: "6+4", expect: "10" }]),
          luyen(R`Có $1$ con cá, thêm $5$ con. Hỏi có tất cả bao nhiêu con?`, R`Có tất cả $6$ con cá.`, [{ expr: "1+5", expect: "6" }]),
        ],
        { figure: "count" },
      ),
      bai(
        "tru-10",
        "Phép trừ trong phạm vi 10",
        R`Phép trừ lấy bớt một nhóm ra khỏi nhóm lớn hơn: $7-3$ là từ $7$ bớt $3$, còn $4$.`,
        [vd(
          R`Có $7$ viên bi. Cho đi $3$ viên. Hỏi còn bao nhiêu viên?`,
          [
            buoc(R`Từ $7$ bớt đi $3$.`, "Phép trừ làm nhóm đầu giảm đúng số đã cho đi."),
            buoc(R`Còn $4$ viên bi.`, "Vì $7-3=4$. Lấy $4$ cộng lại $3$ thì được $7$, nên phép trừ đúng."),
          ],
          R`Còn $4$ viên bi.`,
          [{ expr: "7-3", expect: "4" }],
        )],
        [
          luyen(R`Tính $9-2$.`, R`Hiệu bằng $7$.`, [{ expr: "9-2", expect: "7" }]),
          luyen(R`Tính $10-6$.`, R`Hiệu bằng $4$.`, [{ expr: "10-6", expect: "4" }]),
          luyen(R`Có $5$ cái kẹo, ăn hết $5$ cái. Hỏi còn bao nhiêu cái?`, R`Còn $0$ cái kẹo.`, [{ expr: "5-5", expect: "0" }]),
        ],
      ),
    ]),
    chuong("so-100", "Các số đến 100", [
      bai(
        "chuc",
        "Chục và đơn vị",
        R`Số $10$ là một chục. Số có hai chữ số gồm chữ số hàng chục và chữ số hàng đơn vị, ví dụ $34$ là $3$ chục và $4$ đơn vị.`,
        [vd(
          R`Số $34$ có mấy chục và mấy đơn vị?`,
          [
            buoc(R`Chữ số $3$ đứng ở hàng chục, nên có $3$ chục.`, "Hàng chục là chữ số bên trái của số có hai chữ số."),
            buoc(R`Chữ số $4$ là $4$ đơn vị, và $3$ chục với $4$ đơn vị bằng $34$.`, "Ba chục là $30$, thêm $4$ được $34$."),
          ],
          R`Số $34$ có $3$ chục và $4$ đơn vị.`,
          [{ expr: "3*10+4", expect: "34" }],
        )],
        [
          luyen(R`Hai chục bằng bao nhiêu?`, R`Hai chục bằng $20$.`, [{ expr: "2*10", expect: "20" }]),
          luyen(R`Tính $50+7$.`, R`Tổng bằng $57$.`, [{ expr: "50+7", expect: "57" }]),
          luyen(R`Tính $20+30$.`, R`Tổng bằng $50$.`, [{ expr: "20+30", expect: "50" }]),
        ],
        { figure: "segment" },
      ),
    ]),
    chuong("hinh", "Hình phẳng quen thuộc", [
      bai(
        "hinh-quen",
        "Hình tròn, hình vuông và hình tam giác",
        R`Hình tròn có một đường cong khép kín. Hình vuông có $4$ cạnh bằng nhau và $4$ góc vuông. Hình tam giác có $3$ cạnh.`,
        [vd(
          R`Một hình tam giác có $3$ cạnh. Hai hình tam giác có tất cả bao nhiêu cạnh?`,
          [
            buoc(R`Mỗi hình có $3$ cạnh.`, "Đếm cạnh của một hình tam giác được ba."),
            buoc(R`Hai hình có $3+3=6$ cạnh.`, "Cộng số cạnh của từng hình. Mỗi cạnh được đếm một lần."),
          ],
          R`Hai hình có tất cả $6$ cạnh.`,
          [{ expr: "3+3", expect: "6" }],
        )],
        [
          luyen(R`Hình vuông có mấy cạnh?`, R`Hình vuông có $4$ cạnh.`, [{ expr: "2+2", expect: "4" }]),
          luyen(R`Ba hình tam giác có tất cả bao nhiêu cạnh?`, R`Có tất cả $9$ cạnh.`, [{ expr: "3*3", expect: "9" }]),
          luyen(R`Một đoạn thẳng có mấy đầu mút?`, R`Một đoạn thẳng có $2$ đầu mút.`, [{ expr: "1+1", expect: "2" }]),
        ],
        { figure: "rect" },
      ),
    ]),
  ],
};
