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
          luyen(R`Số đứng ngay sau $7$ là số nào?`, R`Số đứng sau là $8$.`, [{ expr: "7+1", expect: "8" }], "Số đứng ngay sau một số là số đó cộng thêm $1$. Sau $7$ là $8$."),
          luyen(R`Số đứng ngay trước $6$ là số nào?`, R`Số đứng trước là $5$.`, [{ expr: "6-1", expect: "5" }], "Số đứng ngay trước một số là số đó bớt đi $1$. Trước $6$ là $5$."),
          luyen(R`Đếm $3$ rồi đếm thêm $1$. Được số nào?`, R`Được số $4$.`, [{ expr: "3+1", expect: "4" }], "Đếm thêm một là đi một bước trên dãy số. Từ $3$ tới $4$."),
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
          luyen(R`Số nào lớn hơn, $2$ hay $9$?`, R`Số $9$ lớn hơn số $2$.`, [{ expr: "9-2", expect: "7" }], "Số $9$ đứng sau số $2$ trên dãy đếm, nên $9$ lớn hơn $2$."),
          luyen(R`Điền dấu so sánh cho $4$ và $4$.`, R`Hai số bằng nhau: $4=4$.`, [{ expr: "4-4", expect: "0" }], "Hiệu bằng $0$ khi hai số cùng giá trị. Hai số này bằng nhau."),
          luyen(R`Số $1$ và số $10$, số nào bé hơn?`, R`Số $1$ bé hơn số $10$.`, [{ expr: "10-1", expect: "9" }], "Số $1$ đứng trước số $10$. Số đứng trước thì bé hơn."),
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
          luyen(R`Tính $4+3$.`, R`Tổng bằng $7$.`, [{ expr: "4+3", expect: "7" }], "Gộp nhóm $4$ với nhóm $3$. Đếm tiếp từ $4$ được $7$."),
          luyen(R`Tính $6+4$.`, R`Tổng bằng $10$.`, [{ expr: "6+4", expect: "10" }], "Gộp $6$ với $4$ vẫn nằm trong phạm vi $10$. Tổng đúng bằng $10$."),
          luyen(R`Có $1$ con cá, thêm $5$ con. Hỏi có tất cả bao nhiêu con?`, R`Có tất cả $6$ con cá.`, [{ expr: "1+5", expect: "6" }], "Phép cộng gộp cả hai nhóm cá. Một thêm năm được sáu."),
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
          luyen(R`Tính $9-2$.`, R`Hiệu bằng $7$.`, [{ expr: "9-2", expect: "7" }], "Bớt $2$ khỏi $9$ còn $7$. Lấy $7$ cộng lại $2$ thì được $9$."),
          luyen(R`Tính $10-6$.`, R`Hiệu bằng $4$.`, [{ expr: "10-6", expect: "4" }], "Từ $10$ bớt $6$ còn $4$. Phép trừ này nằm trong phạm vi $10$."),
          luyen(R`Có $5$ cái kẹo, ăn hết $5$ cái. Hỏi còn bao nhiêu cái?`, R`Còn $0$ cái kẹo.`, [{ expr: "5-5", expect: "0" }], "Bớt hết nhóm đã có thì không còn cái nào. Hiệu bằng $0$."),
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
          luyen(R`Hai chục bằng bao nhiêu?`, R`Hai chục bằng $20$.`, [{ expr: "2*10", expect: "20" }], "Mỗi chục là $10$ đơn vị. Hai chục là $2$ lần $10$."),
          luyen(R`Tính $50+7$.`, R`Tổng bằng $57$.`, [{ expr: "50+7", expect: "57" }], "Năm chục thêm $7$ đơn vị. Ghép hai hàng được số $57$."),
          luyen(R`Tính $20+30$.`, R`Tổng bằng $50$.`, [{ expr: "20+30", expect: "50" }], "Cộng các chục với nhau. Hai chục thêm ba chục được năm chục."),
        ],
        { figure: "segment" },
      ),
      bai(
        "so-sanh-chuc",
        "So sánh số có hai chữ số",
        R`So sánh hàng chục trước. Nếu hàng chục bằng nhau thì so sánh hàng đơn vị. Số có hàng chục lớn hơn thì lớn hơn.`,
        [vd(
          R`So sánh $46$ và $38$.`,
          [
            buoc(R`Số $46$ có $4$ chục, số $38$ có $3$ chục.`, "Hàng chục là chữ số bên trái. So sánh hàng này trước hàng đơn vị."),
            buoc(R`Vì $4>3$, ta có $46>38$.`, "Hàng chục lớn hơn thì cả số lớn hơn, dù hàng đơn vị có thể nhỏ hơn."),
          ],
          R`Số $46$ lớn hơn số $38$.`,
          [{ expr: "4*10+6-(3*10+8)", expect: "8" }],
        )],
        [
          luyen(R`Số nào lớn hơn, $25$ hay $52$?`, R`Số $52$ lớn hơn số $25$.`, [{ expr: "5*10+2-(2*10+5)", expect: "27" }], "Số $52$ có $5$ chục, số $25$ có $2$ chục. Hàng chục lớn hơn thì số lớn hơn."),
          luyen(R`So sánh $61$ và $67$.`, R`Số $67$ lớn hơn số $61$.`, [{ expr: "67-61", expect: "6" }], "Hai số cùng $6$ chục, nên so sánh hàng đơn vị. Số $7$ lớn hơn số $1$."),
          luyen(R`Ba chục và bảy đơn vị là số nào?`, R`Số đó là $37$.`, [{ expr: "3*10+7", expect: "37" }], "Ba chục là $30$, thêm $7$ đơn vị được $37$."),
        ],
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
          luyen(R`Hình vuông cạnh $3$ xentimét có chu vi bằng bao nhiêu?`, R`Chu vi bằng $12$ xentimét.`, [{ expr: "4*3", expect: "12" }], "Hình vuông có bốn cạnh bằng nhau. Chu vi bằng bốn lần độ dài một cạnh."),
          luyen(R`Ba hình tam giác có tất cả bao nhiêu cạnh?`, R`Có tất cả $9$ cạnh.`, [{ expr: "3*3", expect: "9" }], "Mỗi hình tam giác có ba cạnh. Ba hình thì nhân $3$ với $3$."),
          luyen(R`Đoạn thẳng dài $6$ xentimét được nối thêm một đoạn dài $2$ xentimét. Cả đường dài bao nhiêu?`, R`Cả đường dài $8$ xentimét.`, [{ expr: "6+2", expect: "8" }], "Hai đoạn nối tiếp cộng độ dài. Đoạn mới dài hơn đoạn cũ đúng $2$ xentimét."),
        ],
        { figure: "rect" },
      ),
      bai(
        "hinh-chu-nhat",
        "Hình chữ nhật",
        R`Hình chữ nhật có $4$ cạnh và $4$ góc vuông. Hai cạnh dài bằng nhau, hai cạnh ngắn bằng nhau. Chu vi bằng hai lần tổng chiều dài và chiều rộng.`,
        [vd(
          R`Hình chữ nhật dài $5$ xentimét và rộng $2$ xentimét. Chu vi bằng bao nhiêu?`,
          [
            buoc(R`Tổng một cạnh dài và một cạnh ngắn bằng $5+2=7$.`, "Đi một nửa vòng qua một chiều dài và một chiều rộng."),
            buoc(R`Chu vi bằng $2\cdot 7=14$ xentimét.`, "Hình chữ nhật có hai cặp cạnh như vậy. Nhân đôi tổng vừa tính."),
          ],
          R`Chu vi bằng $14$ xentimét.`,
          [{ expr: "2*(5+2)", expect: "14" }],
        )],
        [
          luyen(R`Hình chữ nhật dài $4$ và rộng $1$ có chu vi bằng bao nhiêu?`, R`Chu vi bằng $10$.`, [{ expr: "2*(4+1)", expect: "10" }], "Cộng chiều dài với chiều rộng rồi nhân $2$. Tổng một cặp cạnh là $5$."),
          luyen(R`Hình chữ nhật có mấy góc vuông?`, R`Hình chữ nhật có $4$ góc vuông.`, [{ expr: "4*90", expect: "360" }], "Mỗi góc vuông là một góc của hình. Bốn góc vuông có tổng số đo $360$ độ."),
          luyen(R`Hình vuông là hình chữ nhật có cạnh $4$. Chu vi bằng bao nhiêu?`, R`Chu vi bằng $16$.`, [{ expr: "4*4", expect: "16" }], "Bốn cạnh bằng nhau. Chu vi là bốn lần cạnh của hình vuông."),
        ],
        { figure: "rect" },
      ),
    ]),
  ],
};
