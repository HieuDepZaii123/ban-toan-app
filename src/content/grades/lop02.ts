import type { GradeBook } from "./types.ts";
import { bai, buoc, chuong, luyen, vd } from "./types.ts";

const R = String.raw;

export const lop02: GradeBook = {
  grade: 2,
  band: "tieu-hoc",
  title: "Phép cộng, phép trừ trong phạm vi 100, bảng nhân, bảng chia và số đến 1000.",
  chapters: [
    chuong("cong-tru", "Cộng và trừ trong phạm vi 100", [
      bai(
        "cong-nho",
        "Phép cộng có nhớ",
        R`Khi cộng hàng đơn vị được từ $10$ trở lên, viết chữ số đơn vị và nhớ $1$ sang hàng chục.`,
        [vd(
          R`Tính $27+15$.`,
          [
            buoc(R`Hàng đơn vị: $7+5=12$, viết $2$ và nhớ $1$.`, "Tổng hàng đơn vị lớn hơn $9$, nên tách thành $1$ chục và $2$ đơn vị."),
            buoc(R`Hàng chục: $2+1+1=4$. Vậy tổng bằng $42$.`, "Chữ số nhớ $1$ được cộng vào hàng chục cùng với $2$ và $1$."),
          ],
          R`Tổng bằng $42$.`,
          [{ expr: "27+15", expect: "42" }],
        )],
        [
          luyen(R`Tính $36+8$.`, R`Tổng bằng $44$.`, [{ expr: "36+8", expect: "44" }]),
          luyen(R`Tính $50-18$.`, R`Hiệu bằng $32$.`, [{ expr: "50-18", expect: "32" }]),
          luyen(R`Tính $19+21$.`, R`Tổng bằng $40$.`, [{ expr: "19+21", expect: "40" }]),
        ],
      ),
    ]),
    chuong("nhan", "Bảng nhân và bảng chia", [
      bai(
        "bang-nhan",
        "Bảng nhân $2$ và bảng nhân $5$",
        R`Nhân là cộng lặp lại cùng một số. Bốn lần số $5$ viết là $5\cdot 4$ và bằng $20$.`,
        [vd(
          R`Mỗi túi có $5$ viên bi. Có $4$ túi. Hỏi có tất cả bao nhiêu viên?`,
          [
            buoc(R`Bốn túi là bốn lần số $5$.`, "Số viên mỗi túi giống nhau, nên dùng phép nhân."),
            buoc(R`Ta có $5\cdot 4=20$ viên.`, "Bảng nhân $5$: năm, mười, mười lăm, hai mươi."),
          ],
          R`Có tất cả $20$ viên bi.`,
          [{ expr: "5*4", expect: "20" }],
        )],
        [
          luyen(R`Tính $2\cdot 6$.`, R`Tích bằng $12$.`, [{ expr: "2*6", expect: "12" }]),
          luyen(R`Tính $5\cdot 5$.`, R`Tích bằng $25$.`, [{ expr: "5*5", expect: "25" }]),
          luyen(R`Tính $2\cdot 9$.`, R`Tích bằng $18$.`, [{ expr: "2*9", expect: "18" }]),
        ],
        { figure: "count" },
      ),
      bai(
        "bang-chia",
        "Phép chia hết",
        R`Chia hết là tách một nhóm thành các phần bằng nhau và không dư. Chia $20$ cho $4$ được $5$, vì $4\cdot 5=20$.`,
        [vd(
          R`Có $20$ cái kẹo, chia đều cho $4$ bạn. Mỗi bạn được bao nhiêu cái?`,
          [
            buoc(R`Tìm số $n$ sao cho $4\cdot n=20$.`, "Chia đều nghĩa là các phần bằng nhau và hết kẹo."),
            buoc(R`Vì $4\cdot 5=20$, mỗi bạn được $5$ cái.`, "Phép nhân lại kiểm tra phép chia. Không còn kẹo dư."),
          ],
          R`Mỗi bạn được $5$ cái kẹo.`,
          [{ expr: "20/4", expect: "5" }],
        )],
        [
          luyen(R`Tính $18$ chia $2$.`, R`Thương bằng $9$.`, [{ expr: "18/2", expect: "9" }]),
          luyen(R`Tính $15$ chia $5$.`, R`Thương bằng $3$.`, [{ expr: "15/5", expect: "3" }]),
          luyen(R`Tính $8$ chia $2$.`, R`Thương bằng $4$.`, [{ expr: "8/2", expect: "4" }]),
        ],
      ),
    ]),
    chuong("den-1000", "Các số đến 1000", [
      bai(
        "tram",
        "Trăm, chục và đơn vị",
        R`Số $100$ là một trăm. Số $1000$ là mười trăm. Số $246$ gồm $2$ trăm, $4$ chục và $6$ đơn vị.`,
        [vd(
          R`Viết số gồm $2$ trăm, $4$ chục và $6$ đơn vị.`,
          [
            buoc(R`Hai trăm là $200$, bốn chục là $40$.`, "Mỗi hàng có giá trị riêng: trăm, chục, rồi đơn vị."),
            buoc(R`Cộng $200+40+6=246$.`, "Ghép ba hàng được số có ba chữ số."),
          ],
          R`Số cần viết là $246$.`,
          [{ expr: "2*100+4*10+6", expect: "246" }],
        )],
        [
          luyen(R`Ba trăm bằng bao nhiêu?`, R`Ba trăm bằng $300$.`, [{ expr: "3*100", expect: "300" }]),
          luyen(R`Tính $400+50$.`, R`Tổng bằng $450$.`, [{ expr: "400+50", expect: "450" }]),
          luyen(R`Tính $1000-1$.`, R`Hiệu bằng $999$.`, [{ expr: "1000-1", expect: "999" }]),
        ],
        { figure: "segment" },
      ),
    ]),
    chuong("do-dai", "Độ dài đường gấp khúc", [
      bai(
        "gap-khuc",
        "Độ dài đường gấp khúc",
        R`Độ dài đường gấp khúc bằng tổng độ dài các đoạn thẳng. Đo cùng một đơn vị rồi mới cộng.`,
        [vd(
          R`Đường gấp khúc có ba đoạn dài $4$ xentimét, $5$ xentimét và $6$ xentimét. Cả đường dài bao nhiêu xentimét?`,
          [
            buoc(R`Cộng $4+5$ được $9$.`, "Hai đoạn đầu cùng đơn vị xentimét, nên cộng được."),
            buoc(R`Cộng tiếp $9+6=15$ xentimét.`, "Đoạn thứ ba cũng tính bằng xentimét. Tổng ba đoạn là độ dài cả đường."),
          ],
          R`Đường gấp khúc dài $15$ xentimét.`,
          [{ expr: "4+5+6", expect: "15" }],
        )],
        [
          luyen(R`Hai đoạn $8$ xentimét và $7$ xentimét. Tổng dài bao nhiêu?`, R`Tổng dài $15$ xentimét.`, [{ expr: "8+7", expect: "15" }]),
          luyen(R`Hình tam giác có ba cạnh $3$, $4$ và $5$ xentimét. Chu vi bằng bao nhiêu?`, R`Chu vi bằng $12$ xentimét.`, [{ expr: "3+4+5", expect: "12" }]),
          luyen(R`Đoạn $20$ xentimét bớt đi $6$ xentimét. Còn bao nhiêu?`, R`Còn $14$ xentimét.`, [{ expr: "20-6", expect: "14" }]),
        ],
        { figure: "segment" },
      ),
    ]),
  ],
};
