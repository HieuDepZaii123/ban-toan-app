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
        R`Các số $1;\ 2;\ 3;\ 4;\ 5;\ 6;\ 7;\ 8;\ 9;\ 10$ đi liền nhau. Số đứng sau lớn hơn số đứng trước đúng $1$.`,
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
          luyen(R`Số đứng ngay sau $3$ và số đứng ngay trước $5$ có phải cùng một số không?`, R`Có. Cả hai cách đều ra số $4$.`, [{ expr: "3+1", expect: "4" }, { expr: "5-1", expect: "4" }], "Số sau $3$ là $3$ thêm $1$. Số trước $5$ là $5$ bớt $1$. Hai kết quả cùng bằng $4$."),
          luyen(R`Số $1$ và số $10$, số nào bé hơn?`, R`Số $1$ bé hơn số $10$.`, [{ expr: "10-1", expect: "9" }], "Số $1$ đứng trước số $10$. Số đứng trước thì bé hơn."),
        ],
      ),
      bai(
        "so-0",
        "Số 0 và nhóm không có gì",
        R`Số $0$ chỉ nhóm không có đồ vật nào. Số $0$ đứng trước số $1$ trên dãy đếm. Cộng thêm $0$ hay bớt đi $0$ thì số không đổi.`,
        [vd(
          R`Trên đĩa có $3$ quả táo. Bạn ăn hết cả $3$ quả. Trên đĩa còn mấy quả?`,
          [
            buoc(R`Bớt $3$ quả từ $3$ quả, viết $3-3$.`, R`Ăn đi là lấy bớt ra, nên dùng phép trừ.`),
            buoc(R`Đĩa không còn quả nào, vậy $3-3=0$.`, R`Không còn đồ vật nào thì ghi bằng số không.`),
          ],
          R`Trên đĩa còn $0$ quả táo.`,
          [{ expr: "3-3", expect: "0" }],
        )],
        [
          luyen(R`Tính $5+0$.`, R`Tổng bằng $5$.`, [{ expr: "5+0", expect: "5" }], R`Thêm không quả nào thì số quả vẫn là $5$.`),
          luyen(R`Tính $4-0$.`, R`Hiệu bằng $4$.`, [{ expr: "4-0", expect: "4" }], R`Không bớt quả nào thì vẫn còn đủ $4$ quả.`),
          luyen(R`Tính $6-6$.`, R`Hiệu bằng $0$.`, [{ expr: "6-6", expect: "0" }], R`Bớt đi hết cả $6$ thì không còn lại gì, tức là $0$.`),
        ],
        {
          whyTrue: R`Đếm số đồ vật trong một cái hộp rỗng thì không có gì để đếm, nên cần một số riêng cho trường hợp đó. Thêm một nhóm rỗng vào không làm nhóm kia nhiều lên.`,
          pitfalls: R`Cho rằng $0$ không phải là một số. Số $0$ vẫn là một số, dùng để nói rằng không có gì.`,
        },
      ),
      bai(
        "tach-gop",
        "Tách số và gộp số",
        R`Một số có thể tách thành hai số nhỏ hơn. Số $5$ tách thành $4$ và $1$, hoặc $3$ và $2$. Gộp hai phần lại thì được số ban đầu.`,
        [vd(
          R`Có $6$ viên bi chia vào hai tay. Tay trái cầm $2$ viên. Tay phải cầm mấy viên?`,
          [
            buoc(R`Số $6$ tách thành $2$ và một số nữa.`, R`Hai tay gộp lại phải đủ $6$ viên bi.`),
            buoc(R`Vì $2$ gộp với $4$ được $6$ nên tay phải cầm $4$ viên.`, R`Đếm tiếp từ $2$: ba, bốn, năm, sáu là thêm bốn viên.`),
          ],
          R`Tay phải cầm $4$ viên bi.`,
          [{ expr: "6-2", expect: "4" }],
        )],
        [
          luyen(R`Số $5$ tách thành $3$ và mấy?`, R`Tách thành $3$ và $2$.`, [{ expr: "5-3", expect: "2" }], R`Ba gộp với hai thì được năm, nên phần còn lại là hai.`),
          luyen(R`Gộp $4$ và $4$ được số mấy?`, R`Được số $8$.`, [{ expr: "4+4", expect: "8" }], R`Đếm tiếp từ $4$ thêm bốn bước là đến $8$.`),
          luyen(R`Số $10$ tách thành $7$ và mấy?`, R`Tách thành $7$ và $3$.`, [{ expr: "10-7", expect: "3" }], R`Bảy gộp với ba thì tròn mười.`),
        ],
        {
          figure: "count",
          whyTrue: R`Chia một nhóm đồ vật ra hai phần không làm mất đi vật nào. Vì thế hai phần gộp lại luôn bằng cả nhóm, và đây là gốc của cả phép cộng lẫn phép trừ.`,
          pitfalls: R`Chỉ nhớ một cách tách. Số $5$ tách được thành $4$ và $1$, cũng tách được thành $3$ và $2$.`,
        },
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
      bai(
        "cong-khong-nho",
        "Cộng không nhớ trong phạm vi 100",
        R`Cộng không nhớ là cộng từng hàng, hàng đơn vị không vượt quá $9$ và không nhớ sang hàng chục.`,
        [vd(
          R`Tính $42+35$.`,
          [
            buoc(R`Hàng đơn vị: $2+5=7$.`, "Tổng hàng đơn vị nhỏ hơn $10$, nên không nhớ sang hàng chục."),
            buoc(R`Hàng chục: $4+3=7$. Tổng bằng $77$.`, "Mỗi hàng được cộng riêng. Ghép $7$ chục và $7$ đơn vị được $77$."),
          ],
          R`Tổng bằng $77$.`,
          [{ expr: "42+35", expect: "77" }],
        )],
        [
          luyen(R`Tính $21+46$.`, R`Tổng bằng $67$.`, [{ expr: "21+46", expect: "67" }], "Hàng đơn vị $1+6$ và hàng chục $2+4$ đều không nhớ."),
          luyen(R`Tính $50+30$.`, R`Tổng bằng $80$.`, [{ expr: "50+30", expect: "80" }], "Hai số tròn chục cộng theo hàng chục. Năm chục thêm ba chục được tám chục."),
          luyen(R`Tính $14+5$.`, R`Tổng bằng $19$.`, [{ expr: "14+5", expect: "19" }], "Chỉ hàng đơn vị đổi. Phép $4+5$ bằng $9$, chưa tới $10$."),
        ],
      ),
      bai(
        "tru-khong-nho",
        "Trừ không nhớ trong phạm vi 100",
        R`Trừ không nhớ là trừ từng hàng khi chữ số hàng đơn vị của số bị trừ không nhỏ hơn chữ số của số trừ. Không mượn sang hàng chục.`,
        [vd(
          R`Tính $57-24$.`,
          [
            buoc(R`Hàng đơn vị: $7-4=3$.`, "Chữ số $7$ lớn hơn $4$, nên trừ được ngay và không mượn."),
            buoc(R`Hàng chục: $5-2=3$. Hiệu bằng $33$.`, "Hàng chục trừ riêng. Ghép $3$ chục và $3$ đơn vị được $33$."),
          ],
          R`Hiệu bằng $33$.`,
          [{ expr: "57-24", expect: "33" }],
        )],
        [
          luyen(R`Tính $68-35$.`, R`Hiệu bằng $33$.`, [{ expr: "68-35", expect: "33" }], "Hàng đơn vị $8-5$ và hàng chục $6-3$ đều trừ được, không mượn."),
          luyen(R`Tính $90-40$.`, R`Hiệu bằng $50$.`, [{ expr: "90-40", expect: "50" }], "Trừ các chục với nhau. Chín chục bớt bốn chục còn năm chục."),
          luyen(R`Tính $29-6$.`, R`Hiệu bằng $23$.`, [{ expr: "29-6", expect: "23" }], "Chỉ hàng đơn vị đổi. Phép $9-6$ bằng $3$, hàng chục giữ nguyên."),
        ],
      ),
    ]),
    chuong("do-xem", "Đo độ dài, xem giờ và xem lịch", [
      bai(
        "hinh-quen",
        "Hình tròn, hình vuông và hình tam giác",
        R`Hình tròn có một đường cong khép kín. Hình vuông có $4$ cạnh. Hình tam giác có $3$ cạnh. Hình chữ nhật có $4$ cạnh.`,
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
          luyen(R`Một hình tam giác và một hình vuông có tất cả bao nhiêu cạnh?`, R`Có tất cả $7$ cạnh.`, [{ expr: "3+4", expect: "7" }], "Tam giác có ba cạnh, hình vuông có bốn cạnh. Cộng hai số cạnh."),
          luyen(R`Ba hình tam giác có tất cả bao nhiêu cạnh?`, R`Có tất cả $9$ cạnh.`, [{ expr: "3*3", expect: "9" }], "Mỗi hình tam giác có ba cạnh. Ba hình thì lấy ba lần số ba."),
          luyen(R`Hai hình chữ nhật có tất cả bao nhiêu cạnh?`, R`Có tất cả $8$ cạnh.`, [{ expr: "4+4", expect: "8" }], "Mỗi hình chữ nhật có bốn cạnh. Hai hình thì cộng bốn với bốn."),
        ],
        { figure: "rect" },
      ),
      bai(
        "do-cm",
        "Đo độ dài bằng xentimét",
        R`Xentimét là đơn vị đo độ dài. Đoạn dài hơn thì số xentimét lớn hơn. Cộng hai đoạn khi muốn biết cả độ dài.`,
        [vd(
          R`Một bút chì dài $12$ xentimét, một cục tẩy dài $3$ xentimét. Bút chì dài hơn tẩy bao nhiêu xentimét?`,
          [
            buoc(R`Lấy độ dài bút chì trừ độ dài tẩy.`, "Phần dài hơn là hiệu của hai số đo cùng đơn vị xentimét."),
            buoc(R`Hiệu bằng $12-3=9$ xentimét.`, "Phép trừ $12$ bớt $3$ còn $9$."),
          ],
          R`Bút chì dài hơn $9$ xentimét.`,
          [{ expr: "12-3", expect: "9" }],
        )],
        [
          luyen(R`Đoạn $7$ xentimét nối với đoạn $2$ xentimét. Cả đoạn dài bao nhiêu?`, R`Cả đoạn dài $9$ xentimét.`, [{ expr: "7+2", expect: "9" }], "Hai đoạn cùng đơn vị xentimét thì cộng độ dài."),
          luyen(R`Thước dài $20$ xentimét, bút dài $15$ xentimét. Thước dài hơn bao nhiêu?`, R`Thước dài hơn $5$ xentimét.`, [{ expr: "20-15", expect: "5" }], "Hiệu hai số đo cho phần dài hơn."),
          luyen(R`Một gang tay dài $10$ xentimét. Hai gang tay đặt nối nhau dài bao nhiêu?`, R`Dài $20$ xentimét.`, [{ expr: "10+10", expect: "20" }], "Hai lần cùng một độ dài thì cộng hai số đo."),
        ],
        { figure: "segment" },
      ),
      bai(
        "xem-gio",
        "Xem giờ đúng",
        R`Giờ đúng là lúc kim phút chỉ số $12$ và kim giờ chỉ một số. Từ $2$ giờ đúng đến $5$ giờ đúng là $3$ giờ.`,
        [vd(
          R`Kim giờ chỉ số $3$, kim phút chỉ số $12$. Bây giờ là mấy giờ đúng? Từ lúc đó đến $6$ giờ đúng còn mấy giờ?`,
          [
            buoc(R`Kim phút ở số $12$ nên đang giờ đúng. Kim giờ ở số $3$, vậy là $3$ giờ đúng.`, "Giờ đúng khi kim phút chỉ đúng số $12$."),
            buoc(R`Từ $3$ giờ đến $6$ giờ là $6-3=3$ giờ.`, "Trừ hai số trên mặt đồng hồ để biết khoảng giờ đúng."),
          ],
          R`Bây giờ là $3$ giờ đúng, và còn $3$ giờ nữa đến $6$ giờ đúng.`,
          [{ expr: "6-3", expect: "3" }],
        )],
        [
          luyen(R`Kim giờ chỉ $8$, kim phút chỉ $12$. Đó là mấy giờ đúng?`, R`Đó là $8$ giờ đúng.`, [{ expr: "7+1", expect: "8" }], "Kim phút ở số $12$ nghĩa là đúng giờ. Số kim giờ chỉ chính là số giờ."),
          luyen(R`Từ $1$ giờ đúng đến $4$ giờ đúng là mấy giờ?`, R`Là $3$ giờ.`, [{ expr: "4-1", expect: "3" }], "Hiệu hai giờ đúng trên mặt đồng hồ là khoảng thời gian."),
          luyen(R`Bây giờ $9$ giờ đúng. Thêm $1$ giờ nữa là mấy giờ?`, R`Là $10$ giờ đúng.`, [{ expr: "9+1", expect: "10" }], "Thêm một giờ đúng là đi tới số tiếp theo trên mặt đồng hồ."),
        ],
      ),
      bai(
        "xem-lich",
        "Xem lịch",
        R`Một tuần có $7$ ngày. Lịch ghi ngày, tháng và năm. Biết số ngày đã qua trong tháng thì số ngày còn lại bằng số ngày của tháng trừ số ngày đã qua.`,
        [vd(
          R`Tháng $3$ có $31$ ngày. Đã qua $10$ ngày. Còn bao nhiêu ngày trong tháng?`,
          [
            buoc(R`Tháng $3$ có $31$ ngày.`, "Nhìn lịch ở hàng tháng $3$ để biết tháng này có bao nhiêu ngày."),
            buoc(R`Còn $31-10=21$ ngày.`, "Số ngày còn lại là hiệu giữa số ngày của tháng và số ngày đã qua."),
          ],
          R`Còn $21$ ngày.`,
          [{ expr: "31-10", expect: "21" }],
        )],
        [
          luyen(R`Hai tuần có bao nhiêu ngày?`, R`Hai tuần có $14$ ngày.`, [{ expr: "7*2", expect: "14" }], "Mỗi tuần có bảy ngày. Hai tuần là hai lần bảy ngày."),
          luyen(R`Tháng $4$ có $30$ ngày. Đã qua $12$ ngày. Còn bao nhiêu ngày?`, R`Còn $18$ ngày.`, [{ expr: "30-12", expect: "18" }], "Lấy số ngày của tháng trừ số ngày đã qua."),
          luyen(R`Một tuần đã qua $3$ ngày. Còn bao nhiêu ngày trong tuần?`, R`Còn $4$ ngày.`, [{ expr: "7-3", expect: "4" }], "Một tuần có bảy ngày. Bảy trừ ba ngày đã qua còn bốn ngày."),
        ],
      ),
    ]),
  ],
};
