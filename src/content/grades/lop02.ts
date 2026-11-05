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
          luyen(R`Tính $36+8$.`, R`Tổng bằng $44$.`, [{ expr: "36+8", expect: "44" }], "Hàng đơn vị $6+8$ bằng $14$, viết $4$ nhớ $1$. Hàng chục thành $4$."),
          luyen(R`Tính $50+18$.`, R`Tổng bằng $68$.`, [{ expr: "50+18", expect: "68" }], "Hàng đơn vị $0+8$ viết $8$. Hàng chục $5+1$ bằng $6$, tổng là $68$."),
          luyen(R`Tính $19+21$.`, R`Tổng bằng $40$.`, [{ expr: "19+21", expect: "40" }], "Hàng đơn vị $9+1$ bằng $10$, nhớ $1$ sang hàng chục và được $40$."),
        ],
      ),
      bai(
        "tru-nho",
        "Phép trừ có nhớ",
        R`Khi chữ số hàng đơn vị của số bị trừ nhỏ hơn số trừ, mượn $1$ chục. Một chục mượn thành $10$ đơn vị rồi mới trừ.`,
        [vd(
          R`Tính $42-15$.`,
          [
            buoc(R`Hàng đơn vị không đủ: mượn $1$ chục, $12-5=7$.`, "Chữ số $2$ nhỏ hơn $5$, nên mượn một chục thành mười hai đơn vị."),
            buoc(R`Hàng chục còn $3-1=2$. Hiệu bằng $27$.`, "Chục đã cho mượn không được tính lại. Còn lại hai chục và bảy đơn vị."),
          ],
          R`Hiệu bằng $27$.`,
          [{ expr: "42-15", expect: "27" }],
        )],
        [
          luyen(R`Tính $30-7$.`, R`Hiệu bằng $23$.`, [{ expr: "30-7", expect: "23" }], "Mượn một chục từ $30$. Mười đơn vị trừ $7$ còn $3$, và còn hai chục."),
          luyen(R`Tính $51-16$.`, R`Hiệu bằng $35$.`, [{ expr: "51-16", expect: "35" }], "Hàng đơn vị mượn một chục. Sau khi trừ hai hàng, hiệu là $35$."),
          luyen(R`Tính $40-25$.`, R`Hiệu bằng $15$.`, [{ expr: "40-25", expect: "15" }], "Số $40$ không có đơn vị sẵn, nên mượn một chục trước khi trừ $5$."),
        ],
      ),
    ]),
    chuong("nhan", "Bảng nhân và bảng chia", [
      bai(
        "bang-nhan",
        "Bảng nhân $2$ và bảng nhân $5$",
        R`Nhân là cộng lặp lại cùng một số. Bốn lần số $5$ viết là $5\times 4$ và bằng $20$.`,
        [vd(
          R`Mỗi túi có $5$ viên bi. Có $4$ túi. Hỏi có tất cả bao nhiêu viên?`,
          [
            buoc(R`Bốn túi là bốn lần số $5$.`, "Số viên mỗi túi giống nhau, nên dùng phép nhân."),
            buoc(R`Ta có $5\times 4=20$ viên.`, "Bảng nhân $5$: năm, mười, mười lăm, hai mươi."),
          ],
          R`Có tất cả $20$ viên bi.`,
          [{ expr: "5*4", expect: "20" }],
        )],
        [
          luyen(R`Tính $2\times 6$.`, R`Tích bằng $12$.`, [{ expr: "2*6", expect: "12" }], "Sáu lần số $2$ là $12$. Đây là kết quả trong bảng nhân $2$."),
          luyen(R`Tính $5\times 5$.`, R`Tích bằng $25$.`, [{ expr: "5*5", expect: "25" }], "Năm lần số $5$ bằng $25$. Bảng nhân $5$ kết thúc ở năm mươi khi nhân với mười."),
          luyen(R`Tính $2\times 9$.`, R`Tích bằng $18$.`, [{ expr: "2*9", expect: "18" }], "Chín lần số $2$ bằng $18$. Cộng chín số $2$ cũng ra cùng kết quả."),
        ],
        { figure: "count" },
      ),
      bai(
        "bang-chia",
        "Phép chia hết",
        R`Phép chia viết bằng dấu hai chấm. Ta có $20:4=5$ vì $4\times 5=20$, và phép chia này hết, không dư.`,
        [vd(
          R`Có $20$ cái kẹo, tính $20:4$. Mỗi bạn được bao nhiêu cái?`,
          [
            buoc(R`Tìm số $n$ sao cho $4\times n=20$.`, "Chia đều nghĩa là các phần bằng nhau và hết kẹo."),
            buoc(R`Vì $4\times 5=20$, mỗi bạn được $5$ cái.`, "Phép nhân lại kiểm tra phép chia. Không còn kẹo dư."),
          ],
          R`Mỗi bạn được $5$ cái kẹo.`,
          [{ expr: "20/4", expect: "5" }],
        )],
        [
          luyen(R`Tính $18:2$.`, R`Thương bằng $9$.`, [{ expr: "18/2", expect: "9" }], "Hai nhân $9$ bằng $18$, nên chia hết và thương là $9$."),
          luyen(R`Tính $15:5$.`, R`Thương bằng $3$.`, [{ expr: "15/5", expect: "3" }], "Năm nhân $3$ bằng $15$. Phép chia này hết, không có dư."),
          luyen(R`Tính $16:2$.`, R`Thương bằng $8$.`, [{ expr: "16/2", expect: "8" }], "Hai nhân $8$ bằng $16$. Thương của phép chia hết là $8$."),
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
          luyen(R`Ba trăm bằng bao nhiêu?`, R`Ba trăm bằng $300$.`, [{ expr: "3*100", expect: "300" }], "Mỗi trăm là $100$ đơn vị. Ba trăm là $3$ lần $100$."),
          luyen(R`Tính $400+50$.`, R`Tổng bằng $450$.`, [{ expr: "400+50", expect: "450" }], "Bốn trăm thêm năm chục. Hàng đơn vị vẫn là $0$."),
          luyen(R`Tính $1000-1$.`, R`Hiệu bằng $999$.`, [{ expr: "1000-1", expect: "999" }], "Số đứng ngay trước $1000$ là $999$. Bớt một đơn vị khỏi một nghìn."),
        ],
        { figure: "segment" },
      ),
      bai(
        "so-sanh-tram",
        "So sánh số có ba chữ số",
        R`So sánh hàng trăm trước. Nếu hàng trăm bằng nhau thì so sánh hàng chục, rồi mới đến hàng đơn vị.`,
        [vd(
          R`So sánh $305$ và $350$.`,
          [
            buoc(R`Cả hai số có $3$ trăm.`, "Hàng trăm bằng nhau nên chưa kết luận được số nào lớn hơn."),
            buoc(R`Hàng chục của $350$ là $5$, của $305$ là $0$, nên $350>305$.`, "Hàng chục lớn hơn thì số lớn hơn. Hàng đơn vị không đổi kết luận này."),
          ],
          R`Số $350$ lớn hơn số $305$.`,
          [{ expr: "350-305", expect: "45" }],
        )],
        [
          luyen(R`Số nào lớn hơn, $280$ hay $802$?`, R`Số $802$ lớn hơn.`, [{ expr: "802-280", expect: "522" }], "Số $802$ có $8$ trăm, số $280$ có $2$ trăm. Hàng trăm lớn hơn thì số lớn hơn."),
          luyen(R`So sánh $640$ và $604$.`, R`Số $640$ lớn hơn số $604$.`, [{ expr: "640-604", expect: "36" }], "Cùng $6$ trăm. Hàng chục $4$ lớn hơn hàng chục $0$."),
          luyen(R`Số gồm $7$ trăm và $8$ đơn vị là số nào?`, R`Số đó là $708$.`, [{ expr: "7*100+8", expect: "708" }], "Không có chục thì chữ số hàng chục là $0$. Ghép $700$ với $8$ được $708$."),
        ],
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
          luyen(R`Hai đoạn $8$ xentimét và $7$ xentimét. Tổng dài bao nhiêu?`, R`Tổng dài $15$ xentimét.`, [{ expr: "8+7", expect: "15" }], "Hai đoạn cùng đơn vị xentimét. Cộng độ dài được độ dài đường gấp khúc hai đoạn."),
          luyen(R`Hình tam giác có ba cạnh $3$, $4$ và $5$ xentimét. Chu vi bằng bao nhiêu?`, R`Chu vi bằng $12$ xentimét.`, [{ expr: "3+4+5", expect: "12" }], "Chu vi là tổng độ dài các cạnh. Ba cạnh cùng đơn vị nên cộng được."),
          luyen(R`Đoạn $20$ xentimét bớt đi $6$ xentimét. Còn bao nhiêu?`, R`Còn $14$ xentimét.`, [{ expr: "20-6", expect: "14" }], "Bớt một phần của đoạn thì lấy hiệu hai độ dài cùng đơn vị."),
        ],
        { figure: "segment" },
      ),
      bai(
        "met-cm",
        "Mét và xentimét",
        R`Một mét bằng $100$ xentimét. Đổi mét ra xentimét thì nhân với $100$. Đổi xentimét ra mét thì chia cho $100$ khi số xentimét chia hết cho $100$.`,
        [vd(
          R`Đổi $3$ mét ra xentimét và đổi $200$ xentimét ra mét.`,
          [
            buoc(R`Ba mét bằng $3\times 100=300$ xentimét.`, "Mỗi mét có một trăm xentimét. Nhân số mét với $100$."),
            buoc(R`Hai trăm xentimét bằng $200:100=2$ mét.`, "Chia cho $100$ vì một mét chứa đúng một trăm xentimét."),
          ],
          R`Ba mét bằng $300$ xentimét và $200$ xentimét bằng $2$ mét.`,
          [{ expr: "3*100", expect: "300" }, { expr: "200/100", expect: "2" }],
        )],
        [
          luyen(R`Đổi $5$ mét ra xentimét.`, R`Bằng $500$ xentimét.`, [{ expr: "5*100", expect: "500" }], "Nhân số mét với $100$. Năm mét là năm trăm xentimét."),
          luyen(R`Đổi $400$ xentimét ra mét.`, R`Bằng $4$ mét.`, [{ expr: "400/100", expect: "4" }], "Chia số xentimét cho $100$. Bốn trăm xentimét là bốn mét."),
          luyen(R`Một đoạn $1$ mét nối với một đoạn $20$ xentimét. Cả đoạn dài bao nhiêu xentimét?`, R`Cả đoạn dài $120$ xentimét.`, [{ expr: "100+20", expect: "120" }], "Đổi mét ra xentimét trước khi cộng. Một mét là $100$ xentimét, thêm $20$ được $120$."),
        ],
      ),
    ]),
  ],
};
