import type { GradeBook } from "./types.ts";
import { bai, buoc, chuong, luyen, vd } from "./types.ts";

const R = String.raw;

export const lop03: GradeBook = {
  grade: 3,
  band: "tieu-hoc",
  title: "Số đến 100 000, nhân, một phần mấy, đo lường và hình tròn.",
  chapters: [
    chuong("so-100000", "Các số đến 100 000", [
      bai(
        "doc-100000",
        "Đọc và viết số đến 100 000",
        R`Số $100\,000$ là mười chục nghìn. Số có nhiều chữ số gồm hàng chục nghìn, nghìn, trăm, chục và đơn vị.`,
        [vd(
          R`Viết số gồm $4$ chục nghìn, $5$ nghìn, $3$ chục và $2$ đơn vị.`,
          [
            buoc(R`Bốn chục nghìn là $40\,000$, năm nghìn là $5\,000$.`, "Mỗi hàng có giá trị riêng. Hàng trăm không có chữ số thì viết $0$."),
            buoc(R`Cộng $40\,000+5\,000+30+2=45\,032$.`, "Ghép các hàng được số nằm trong phạm vi $100\,000$."),
          ],
          R`Số cần viết là $45\,032$.`,
          [{ expr: "4*10000+5*1000+30+2", expect: "45032" }],
        )],
        [
          luyen(R`Ba chục nghìn bằng bao nhiêu?`, R`Ba chục nghìn bằng $30\,000$.`, [{ expr: "3*10000", expect: "30000" }], "Mỗi chục nghìn là $10\,000$. Ba lần số đó là $30\,000$."),
          luyen(R`Tính $60\,000+4\,000$.`, R`Tổng bằng $64\,000$.`, [{ expr: "60000+4000", expect: "64000" }], "Sáu chục nghìn thêm bốn nghìn. Các hàng còn lại là $0$."),
          luyen(R`Số $100\,000$ hơn $99\,999$ bao nhiêu đơn vị?`, R`Hơn $1$ đơn vị.`, [{ expr: "100000-99999", expect: "1" }], "Số đứng ngay sau $99\,999$ trong phạm vi đã học là $100\,000$."),
        ],
        { figure: "segment" },
      ),
      bai(
        "lam-tron-3",
        "Làm tròn số",
        R`Làm tròn đến một hàng: nhìn chữ số ngay bên phải hàng đó. Từ $5$ trở lên thì tăng chữ số của hàng làm tròn. Nhỏ hơn $5$ thì giữ nguyên.`,
        [vd(
          R`Làm tròn $46$ và $23$ đến hàng chục.`,
          [
            buoc(R`Số $46$ có chữ số đơn vị $6$, nên làm tròn thành $50$.`, "Chữ số bên phải hàng chục từ $5$ trở lên thì tăng hàng chục."),
            buoc(R`Số $23$ có chữ số đơn vị $3$, nên làm tròn thành $20$.`, "Chữ số nhỏ hơn $5$ thì giữ nguyên hàng chục và các hàng bên phải thành $0$."),
          ],
          R`Hai số làm tròn thành $50$ và $20$.`,
          [{ expr: "round(46,-1)", expect: "50" }, { expr: "round(23,-1)", expect: "20" }],
        )],
        [
          luyen(R`Làm tròn $860$ đến hàng trăm.`, R`Kết quả là $900$.`, [{ expr: "round(860,-2)", expect: "900" }], "Chữ số hàng chục là $6$, nên tăng hàng trăm từ $8$ lên $9$."),
          luyen(R`Làm tròn $820$ đến hàng trăm.`, R`Kết quả là $800$.`, [{ expr: "round(820,-2)", expect: "800" }], "Chữ số hàng chục là $2$, nhỏ hơn $5$, nên giữ hàng trăm."),
          luyen(R`Làm tròn $74$ đến hàng chục.`, R`Kết quả là $70$.`, [{ expr: "round(74,-1)", expect: "70" }], "Chữ số đơn vị là $4$, nên số tròn chục gần nhất theo quy tắc này là $70$."),
        ],
      ),
      bai(
        "so-la-ma",
        "Số La Mã",
        R`Một số La Mã dùng $I$ cho $1$, $V$ cho $5$ và $X$ cho $10$. Chữ đứng sau thì cộng. Chữ nhỏ đứng trước chữ lớn thì trừ.`,
        [vd(
          R`Số La Mã $XII$ và $IV$ bằng những số nào?`,
          [
            buoc(R`Số $XII$ là $10+1+1=12$.`, "Chữ $X$ đứng trước hai chữ $I$. Các chữ sau được cộng thêm."),
            buoc(R`Số $IV$ là $5-1=4$.`, "Chữ $I$ đứng trước chữ $V$ lớn hơn, nên lấy $5$ trừ $1$."),
          ],
          R`Số $XII$ bằng $12$ và số $IV$ bằng $4$.`,
          [{ expr: "10+1+1", expect: "12" }, { expr: "5-1", expect: "4" }],
        )],
        [
          luyen(R`Số La Mã $VI$ bằng bao nhiêu?`, R`Bằng $6$.`, [{ expr: "5+1", expect: "6" }], "Chữ $I$ đứng sau $V$ nên được cộng. Năm thêm một là sáu."),
          luyen(R`Số La Mã $IX$ bằng bao nhiêu?`, R`Bằng $9$.`, [{ expr: "10-1", expect: "9" }], "Chữ $I$ đứng trước $X$ nên lấy mười trừ một."),
          luyen(R`Số La Mã $XV$ bằng bao nhiêu?`, R`Bằng $15$.`, [{ expr: "10+5", expect: "15" }], "Chữ $V$ đứng sau $X$ nên cộng $10$ với $5$."),
        ],
      ),
    ]),
    chuong("nhan-chia", "Nhân và chia", [
      bai(
        "nhan-hai-chu",
        "Nhân số có hai chữ số",
        R`Nhân số có hai chữ số với số có một chữ số: nhân hàng đơn vị trước, có nhớ thì cộng vào hàng chục. Dấu nhân là $\times$.`,
        [vd(
          R`Tính $23\times 4$.`,
          [
            buoc(R`Hàng đơn vị: $3\times 4=12$, viết $2$ nhớ $1$.`, "Tích hàng đơn vị lớn hơn $9$ thì tách thành một chục nhớ và chữ số đơn vị."),
            buoc(R`Hàng chục: $2\times 4+1=9$. Tích bằng $92$.`, "Nhớ được cộng vào tích của hàng chục. Kết quả là $92$."),
          ],
          R`Tích bằng $92$.`,
          [{ expr: "23*4", expect: "92" }],
        )],
        [
          luyen(R`Tính $12\times 3$.`, R`Tích bằng $36$.`, [{ expr: "12*3", expect: "36" }], "Ba lần $12$ là $36$. Hàng đơn vị $2\times 3$ chưa cần nhớ."),
          luyen(R`Tính $15\times 4$.`, R`Tích bằng $60$.`, [{ expr: "15*4", expect: "60" }], "Bốn lần $15$ bằng $60$. Có thể tính $10\times 4$ rồi cộng $5\times 4$."),
          luyen(R`Tính $25\times 4$.`, R`Tích bằng $100$.`, [{ expr: "25*4", expect: "100" }], "Bốn lần $25$ bằng một trăm."),
        ],
      ),
      bai(
        "chia-du",
        "Chia hết và phép chia có dư",
        R`Phép chia viết bằng dấu hai chấm. Khi chia không hết, số bị chia bằng thương nhân số chia, rồi cộng số dư. Số dư nhỏ hơn số chia.`,
        [vd(
          R`Tính $17:5$. Tìm thương và số dư.`,
          [
            buoc(R`Ta có $5\times 3=15$ và $5\times 4=20$ lớn hơn $17$.`, "Thương là số nguyên lớn nhất sao cho tích chưa vượt số bị chia."),
            buoc(R`Vậy thương bằng $3$ và số dư bằng $17-15=2$.`, "Số dư phải nhỏ hơn số chia $5$. Kiểm tra lại: $5\times 3+2=17$."),
          ],
          R`Thương bằng $3$ và số dư bằng $2$.`,
          [{ expr: "5*3+2", expect: "17" }],
        )],
        [
          luyen(R`Tính $20:6$. Thương và số dư bằng bao nhiêu?`, R`Thương bằng $3$ và dư $2$.`, [{ expr: "6*3+2", expect: "20" }], "Sáu nhân $3$ bằng $18$, còn dư $2$. Số dư nhỏ hơn số chia."),
          luyen(R`Tính $25:4$. Số dư bằng bao nhiêu?`, R`Thương bằng $6$ và số dư bằng $1$.`, [{ expr: "25-4*6", expect: "1" }], "Bốn nhân $6$ bằng $24$. Hiệu $25-24$ là số dư."),
          luyen(R`Tính $18:5$.`, R`Thương bằng $3$ và dư $3$, vì $5\times 3+3=18$.`, [{ expr: "5*3+3", expect: "18" }], "Số bị chia bằng thương nhân số chia, rồi cộng số dư."),
        ],
      ),
    ]),
    chuong("mot-phan", "Một phần mấy", [
      bai(
        "phan-nho",
        "Một phần hai, một phần ba và một phần tư",
        R`Một phần hai của một số là số đó chia cho $2$. Một phần ba là chia cho $3$. Một phần tư là chia cho $4$.`,
        [vd(
          R`Một phần hai của $8$ quả táo là bao nhiêu quả?`,
          [
            buoc(R`Một phần hai nghĩa là chia thành $2$ phần bằng nhau.`, "Chia đều nhóm táo thành hai phần."),
            buoc(R`Mỗi phần có $8:2=4$ quả.`, "Hai phần bằng nhau cộng lại đủ $8$ quả."),
          ],
          R`Một phần hai của $8$ quả là $4$ quả.`,
          [{ expr: "8/2", expect: "4" }],
        )],
        [
          luyen(R`Một phần ba của $12$ bằng bao nhiêu?`, R`Kết quả bằng $4$.`, [{ expr: "12/3", expect: "4" }], "Chia $12$ thành ba phần bằng nhau. Mỗi phần là $4$."),
          luyen(R`Một phần tư của $20$ bằng bao nhiêu?`, R`Kết quả bằng $5$.`, [{ expr: "20/4", expect: "5" }], "Chia $20$ cho $4$. Mỗi phần là $5$."),
          luyen(R`Một phần hai của $10$ bằng bao nhiêu?`, R`Kết quả bằng $5$.`, [{ expr: "10/2", expect: "5" }], "Chia $10$ thành hai phần bằng nhau. Mỗi phần là $5$."),
        ],
      ),
      bai(
        "phan-lon",
        "Từ một phần năm đến một phần chín",
        R`Một phần năm của một số là số đó chia cho $5$. Cứ tiếp tục như vậy đến một phần chín, là chia cho $9$.`,
        [vd(
          R`Một phần năm của $20$ và một phần chín của $18$ bằng bao nhiêu?`,
          [
            buoc(R`Một phần năm của $20$ là $20:5=4$.`, "Chia $20$ thành năm phần bằng nhau."),
            buoc(R`Một phần chín của $18$ là $18:9=2$.`, "Chia $18$ thành chín phần bằng nhau. Mỗi phần là $2$."),
          ],
          R`Hai kết quả lần lượt bằng $4$ và $2$.`,
          [{ expr: "20/5", expect: "4" }, { expr: "18/9", expect: "2" }],
        )],
        [
          luyen(R`Một phần sáu của $24$ bằng bao nhiêu?`, R`Kết quả bằng $4$.`, [{ expr: "24/6", expect: "4" }], "Chia $24$ cho $6$. Mỗi phần là $4$."),
          luyen(R`Một phần tám của $16$ bằng bao nhiêu?`, R`Kết quả bằng $2$.`, [{ expr: "16/8", expect: "2" }], "Chia $16$ cho $8$. Mỗi phần là $2$."),
          luyen(R`Một phần bảy của $21$ bằng bao nhiêu?`, R`Kết quả bằng $3$.`, [{ expr: "21/7", expect: "3" }], "Chia $21$ cho $7$. Mỗi phần là $3$."),
        ],
      ),
    ]),
    chuong("do", "Đơn vị đo và chu vi", [
      bai(
        "don-vi-do",
        "Đơn vị đo độ dài",
        R`Một đềximét bằng $10$ xentimét. Một mét bằng $10$ đềximét, tức $100$ xentimét. Đổi đơn vị lớn ra đơn vị nhỏ thì nhân.`,
        [vd(
          R`Đổi $3$ mét ra xentimét và đổi $4$ đềximét ra xentimét.`,
          [
            buoc(R`Ba mét bằng $3\times 100=300$ xentimét.`, "Mỗi mét có một trăm xentimét."),
            buoc(R`Bốn đềximét bằng $4\times 10=40$ xentimét.`, "Mỗi đềximét có mười xentimét."),
          ],
          R`Ba mét bằng $300$ xentimét và bốn đềximét bằng $40$ xentimét.`,
          [{ expr: "3*100", expect: "300" }, { expr: "4*10", expect: "40" }],
        )],
        [
          luyen(R`Đổi $2$ mét ra xentimét.`, R`Bằng $200$ xentimét.`, [{ expr: "2*100", expect: "200" }], "Nhân số mét với $100$ vì mỗi mét có một trăm xentimét."),
          luyen(R`Đổi $500$ xentimét ra mét bằng $500:100$.`, R`Bằng $5$ mét.`, [{ expr: "500/100", expect: "5" }], "Một mét có $100$ xentimét. Chia số xentimét cho $100$."),
          luyen(R`Đoạn $1$ mét nối với đoạn $20$ xentimét. Cả đoạn dài bao nhiêu xentimét?`, R`Dài $120$ xentimét.`, [{ expr: "100+20", expect: "120" }], "Đổi mét ra xentimét trước khi cộng."),
        ],
        { figure: "segment" },
      ),
      bai(
        "chu-vi-3",
        "Chu vi hình chữ nhật",
        R`Hình chữ nhật dài $a$ và rộng $b$ có chu vi $(a+b)\times 2$. Chu vi là độ dài đi hết một vòng quanh hình.`,
        [vd(
          R`Hình chữ nhật dài $5$ xentimét và rộng $3$ xentimét. Chu vi bằng bao nhiêu?`,
          [
            buoc(R`Một chiều dài và một chiều rộng cộng được $5+3=8$.`, "Đi nửa vòng qua một cạnh dài và một cạnh ngắn."),
            buoc(R`Chu vi bằng $8\times 2=16$ xentimét.`, "Hình có hai cặp cạnh như vậy, nên nhân đôi."),
          ],
          R`Chu vi bằng $16$ xentimét.`,
          [{ expr: "(5+3)*2", expect: "16" }],
        )],
        [
          luyen(R`Hình vuông cạnh $4$ xentimét có chu vi bằng bao nhiêu?`, R`Chu vi bằng $16$ xentimét.`, [{ expr: "4*4", expect: "16" }], "Hình vuông có bốn cạnh bằng nhau. Chu vi bằng bốn lần một cạnh."),
          luyen(R`Hình chữ nhật dài $9$ và rộng $2$ có diện tích bằng bao nhiêu?`, R`Diện tích bằng $18$.`, [{ expr: "9*2", expect: "18" }], "Diện tích là số ô vuông phủ kín hình, tính bằng dài nhân rộng."),
          luyen(R`Hình chữ nhật dài $6$ và rộng $1$ có chu vi bằng bao nhiêu?`, R`Chu vi bằng $14$.`, [{ expr: "(6+1)*2", expect: "14" }], "Cộng dài với rộng được $7$, rồi nhân $2$."),
        ],
        { figure: "rect" },
      ),
    ]),
    chuong("hinh-3", "Trung điểm, hình tròn và bảng số liệu", [
      bai(
        "trung-diem",
        "Trung điểm của đoạn thẳng",
        R`Trung điểm chia đoạn thẳng thành hai đoạn bằng nhau. Nếu cả đoạn dài $d$ thì mỗi đoạn nhỏ dài $d:2$.`,
        [vd(
          R`Đoạn $AB$ dài $8$ xentimét. Trung điểm $M$ cách $A$ bao nhiêu xentimét?`,
          [
            buoc(R`Trung điểm nằm chính giữa $A$ và $B$.`, "Hai đoạn $AM$ và $MB$ bằng nhau."),
            buoc(R`Độ dài $AM$ bằng $8:2=4$ xentimét.`, "Chia độ dài cả đoạn cho $2$."),
          ],
          R`Điểm $M$ cách $A$ đúng $4$ xentimét.`,
          [{ expr: "8/2", expect: "4" }],
        )],
        [
          luyen(R`Đoạn dài $12$ xentimét. Trung điểm chia mỗi phần dài bao nhiêu?`, R`Mỗi phần dài $6$ xentimét.`, [{ expr: "12/2", expect: "6" }], "Hai phần bằng nhau. Chia độ dài cả đoạn cho $2$."),
          luyen(R`Mỗi đoạn từ đầu mút đến trung điểm dài $5$ xentimét. Cả đoạn dài bao nhiêu?`, R`Cả đoạn dài $10$ xentimét.`, [{ expr: "5*2", expect: "10" }], "Hai phần bằng nhau cộng lại thành cả đoạn."),
          luyen(R`Đoạn $10$ xentimét, trung điểm $M$. Đoạn còn lại sau $AM$ dài bao nhiêu?`, R`Dài $5$ xentimét.`, [{ expr: "10-5", expect: "5" }], "Đoạn còn lại bằng nửa kia, cũng là cả đoạn trừ một nửa."),
        ],
        { figure: "segment" },
      ),
      bai(
        "hinh-tron-3",
        "Hình tròn: tâm và bán kính",
        R`Hình tròn có một tâm. Bán kính là đoạn từ tâm đến một điểm trên đường cong. Đường kính đi qua tâm và dài gấp đôi bán kính.`,
        [vd(
          R`Hình tròn có bán kính $5$ xentimét. Đường kính dài bao nhiêu?`,
          [
            buoc(R`Đường kính gồm hai bán kính nối tiếp.`, "Đường kính đi qua tâm và chạm đường cong ở hai đầu."),
            buoc(R`Đường kính bằng $5\times 2=10$ xentimét.`, "Gấp đôi bán kính. Không dùng số $3{,}14$ ở bài nhận biết này."),
          ],
          R`Đường kính dài $10$ xentimét.`,
          [{ expr: "5*2", expect: "10" }],
        )],
        [
          luyen(R`Đường kính $14$ xentimét. Bán kính bằng bao nhiêu?`, R`Bán kính bằng $7$ xentimét.`, [{ expr: "14/2", expect: "7" }], "Bán kính là một nửa đường kính."),
          luyen(R`Bán kính $6$ xentimét. Đường kính bằng bao nhiêu?`, R`Đường kính bằng $12$ xentimét.`, [{ expr: "6*2", expect: "12" }], "Đường kính gấp đôi bán kính."),
          luyen(R`Đường kính dài $8$ xentimét. Bán kính của hình tròn đó bằng bao nhiêu?`, R`Bán kính bằng $4$ xentimét.`, [{ expr: "8/2", expect: "4" }], "Bán kính là nửa đường kính. Phép $8:2$ cho độ dài bán kính."),
        ],
        { figure: "circle" },
      ),
      bai(
        "bang-so-lieu",
        "Bảng số liệu",
        R`Bảng số liệu xếp số theo hàng và cột. Muốn biết cả bảng thì cộng các số. Ô lớn nhất là số lớn nhất trong bảng.`,
        [vd(
          R`Ba lớp có $20$, $25$ và $30$ bạn. Cả ba lớp có bao nhiêu bạn, và lớp nào đông nhất?`,
          [
            buoc(R`Tổng bằng $20+25+30=75$ bạn.`, "Cộng đủ ba ô của bảng. Không bỏ một lớp nào."),
            buoc(R`Số lớn nhất là $30$, nên lớp thứ ba đông nhất.`, "So sánh ba số trong cùng một cột số bạn."),
          ],
          R`Cả ba lớp có $75$ bạn và lớp đông nhất có $30$ bạn.`,
          [{ expr: "20+25+30", expect: "75" }, { expr: "Max(20,25,30)", expect: "30" }],
        )],
        [
          luyen(R`Bảng ghi $4$, $7$ và $9$. Tổng bằng bao nhiêu?`, R`Tổng bằng $20$.`, [{ expr: "4+7+9", expect: "20" }], "Cộng lần lượt các ô của bảng."),
          luyen(R`Trong các số $12$, $8$ và $15$, số lớn nhất là số nào?`, R`Số lớn nhất là $15$.`, [{ expr: "Max(12,8,15)", expect: "15" }], "Ô có số lớn nhất là ô nổi bật của bảng khi hỏi giá trị cao nhất."),
          luyen(R`Ô $14$ hơn ô $9$ bao nhiêu?`, R`Hơn $5$.`, [{ expr: "14-9", expect: "5" }], "Hiệu hai ô trong cùng bảng cho phần chênh lệch."),
        ],
        { figure: "bar" },
      ),
    ]),
  ],
};
