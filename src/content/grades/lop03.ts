import type { GradeBook } from "./types.ts";
import { bai, buoc, chuong, luyen, vd } from "./types.ts";

const R = String.raw;

export const lop03: GradeBook = {
  grade: 3,
  band: "tieu-hoc",
  title: "Số đến 100 000, bảng nhân và phép chia, một phần mấy, đo lường, diện tích và hình tròn.",
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
            buoc(R`Cộng $40\,000+5\,000+30+2=45\,032$.`, "Ghép các hàng được số nằm trong phạm vi $100\\,000$."),
          ],
          R`Số cần viết là $45\,032$.`,
          [{ expr: "4*10000+5*1000+30+2", expect: "45032" }],
        )],
        [
          luyen(R`Ba chục nghìn bằng bao nhiêu?`, R`Ba chục nghìn bằng $30\,000$.`, [{ expr: "3*10000", expect: "30000" }], "Mỗi chục nghìn là $10\\,000$. Ba lần số đó là $30\\,000$."),
          luyen(R`Tính $60\,000+4\,000$.`, R`Tổng bằng $64\,000$.`, [{ expr: "60000+4000", expect: "64000" }], "Sáu chục nghìn thêm bốn nghìn. Các hàng còn lại là $0$."),
          luyen(R`Số $100\,000$ hơn $99\,999$ bao nhiêu đơn vị?`, R`Hơn $1$ đơn vị.`, [{ expr: "100000-99999", expect: "1" }], "Số đứng ngay sau $99\\,999$ trong phạm vi đã học là $100\\,000$."),
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
          luyen(R`Tính $12\times 3$.`, R`Tích bằng $36$.`, [{ expr: "12*3", expect: "36" }], "Ba lần $12$ là $36$. Hàng đơn vị $2\\times 3$ chưa cần nhớ."),
          luyen(R`Tính $15\times 4$.`, R`Tích bằng $60$.`, [{ expr: "15*4", expect: "60" }], "Bốn lần $15$ bằng $60$. Có thể tính $10\\times 4$ rồi cộng $5\\times 4$."),
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
            buoc(R`Vậy thương bằng $3$ và số dư bằng $17-15=2$.`, "Số dư phải nhỏ hơn số chia $5$. Kiểm tra lại: $5\\times 3+2=17$."),
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
      bai(
        "bang-nhan-3-9",
        "Bảng nhân từ $3$ đến $9$",
        R`Mỗi bảng nhân là một dãy đếm thêm đều: bảng nhân $6$ là $6;\ 12;\ 18;\ 24$ và cứ thế thêm $6$. Đổi chỗ hai thừa số thì tích không đổi, nên $7\times 8$ và $8\times 7$ đều bằng $56$.`,
        [vd(
          R`Mỗi hộp có $6$ cái bánh. Hỏi $7$ hộp có bao nhiêu cái bánh?`,
          [
            buoc(R`Bảy hộp là bảy lần số $6$, viết $6\times 7$.`, R`Các hộp có số bánh bằng nhau nên dùng phép nhân.`),
            buoc(R`Ta có $6\times 7=42$.`, R`Từ $6\times 5=30$, thêm hai lần $6$ nữa là $42$.`),
          ],
          R`Bảy hộp có $42$ cái bánh.`,
          [{ expr: "6*7", expect: "42" }],
        )],
        [
          luyen(R`Tính $8\times 9$.`, R`Tích bằng $72$.`, [{ expr: "8*9", expect: "72" }], R`Từ $8\times 10=80$, bớt đi một lần $8$ thì còn $72$.`),
          luyen(R`Tính $7\times 7$.`, R`Tích bằng $49$.`, [{ expr: "7*7", expect: "49" }], R`Từ $7\times 5=35$, thêm hai lần $7$ là $14$, được $49$.`),
          luyen(R`Một tuần có $7$ ngày. Hỏi $4$ tuần có bao nhiêu ngày?`, R`Bốn tuần có $28$ ngày.`, [{ expr: "7*4", expect: "28" }], R`Bốn lần $7$ ngày là $28$ ngày.`),
        ],
        {
          figure: "count",
          whyTrue: R`Bảng nhân nào cũng dựng được từ phép cộng lặp. Không cần nhớ rời từng dòng: từ một tích đã biết, thêm hoặc bớt một lần thừa số là ra tích bên cạnh.`,
          pitfalls: R`Nhầm $6\times 8$ với $7\times 8$ vì hai kết quả $48$ và $56$ đứng gần nhau. Kiểm tra bằng cách thêm một lần $8$ vào $48$.`,
        },
      ),
      bai(
        "chia-ba-chu",
        "Chia số có ba chữ số cho số có một chữ số",
        R`Chia lần lượt từ hàng trăm, đến hàng chục, rồi hàng đơn vị. Phần còn dư ở một hàng được đổi sang hàng liền sau và gộp vào để chia tiếp.`,
        [vd(
          R`Tính $936:4$.`,
          [
            buoc(R`Hàng trăm: $9$ chia $4$ được $2$, dư $1$. Gộp với hàng chục thành $13$.`, R`Một trăm còn dư đổi thành mười chục, cộng với $3$ chục là $13$ chục.`),
            buoc(R`Tiếp tục: $13$ chia $4$ được $3$, dư $1$. Gộp thành $16$, chia $4$ được $4$. Thương là $234$.`, R`Một chục còn dư đổi thành mười đơn vị, cộng với $6$ đơn vị là $16$.`),
          ],
          R`Thương bằng $234$.`,
          [{ expr: "936/4", expect: "234" }],
        )],
        [
          luyen(R`Tính $848:4$.`, R`Thương bằng $212$.`, [{ expr: "848/4", expect: "212" }], R`Chia từng hàng: $8:4=2$, $4:4=1$, $8:4=2$.`),
          luyen(R`Tính $375:5$.`, R`Thương bằng $75$.`, [{ expr: "375/5", expect: "75" }], R`Hàng trăm $3$ không đủ chia cho $5$, nên lấy $37$ chia $5$ được $7$ dư $2$, rồi $25$ chia $5$ được $5$.`),
          luyen(R`Có $126$ quyển vở chia đều cho $3$ lớp. Mỗi lớp được bao nhiêu quyển?`, R`Mỗi lớp được $42$ quyển.`, [{ expr: "126/3", expect: "42" }], R`Lấy $12$ chia $3$ được $4$, rồi $6$ chia $3$ được $2$, thương là $42$.`),
        ],
        {
          whyTrue: R`Số $936$ gồm $9$ trăm, $3$ chục và $6$ đơn vị. Chia đều từng loại, loại nào còn thừa thì đổi ra loại nhỏ hơn rồi chia tiếp, nên không bỏ sót phần nào.`,
          pitfalls: R`Bỏ quên chữ số $0$ ở giữa thương. Với $612:6$, sau khi chia hàng trăm, hàng chục $1$ không đủ chia nên phải viết $0$ vào thương, kết quả là $102$.`,
        },
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
    chuong("kha-nang", "Khả năng xảy ra", [
      bai(
        "chan-chan",
        "Chắc chắn, có thể và không thể",
        R`Số liệu giả định. Một việc chắc chắn xảy ra khi mọi kết quả đều thuận. Một việc không thể xảy ra khi không có kết quả thuận nào. Còn lại là việc có thể xảy ra.`,
        [vd(
          R`Túi chỉ có $5$ viên bi đỏ. Rút một viên. Việc được bi đỏ thuộc loại nào? Việc được bi xanh thuộc loại nào?`,
          [
            buoc(R`Cả $5$ viên đều đỏ, nên được bi đỏ là việc chắc chắn.`, "Mọi kết quả đều là bi đỏ. Không còn kết quả khác."),
            buoc(R`Không có bi xanh, nên được bi xanh là việc không thể.`, "Không có kết quả thuận nào thì việc không xảy ra."),
          ],
          R`Được bi đỏ là chắc chắn. Được bi xanh là không thể.`,
          [{ expr: "5/5", expect: "1" }, { expr: "0/5", expect: "0" }],
        )],
        [
          luyen(R`Số liệu giả định. Túi có $3$ bi đỏ và $2$ bi xanh. Rút một bi đỏ là việc gì?`, R`Đó là việc có thể xảy ra.`, [{ expr: "Rational(3,5)", expect: "3/5" }], "Có bi đỏ nên việc xảy ra được, nhưng không phải viên nào cũng đỏ nên chưa chắc chắn."),
          luyen(R`Gieo một xúc xắc cân đối. Ra một số từ $1$ đến $6$ là việc gì?`, R`Đó là việc chắc chắn.`, [{ expr: "6/6", expect: "1" }], "Cả sáu mặt đều là một số từ $1$ đến $6$. Mọi kết quả đều thuận."),
          luyen(R`Túi chỉ có bi đỏ. Rút được bi xanh là việc gì?`, R`Đó là việc không thể xảy ra.`, [{ expr: "0/4", expect: "0" }], "Không có bi xanh nên không có kết quả thuận."),
        ],
      ),
      bai(
        "so-kha-nang",
        "So sánh hai khả năng",
        R`Số liệu giả định. Khi rút ngẫu nhiên một viên, việc nào có nhiều viên thuận hơn thì dễ xảy ra hơn.`,
        [vd(
          R`Túi có $4$ bi đỏ và $1$ bi xanh. Việc nào dễ xảy ra hơn khi rút một viên?`,
          [
            buoc(R`Bi đỏ nhiều hơn bi xanh: $4>1$.`, "So sánh số viên của mỗi màu trong cùng một túi."),
            buoc(R`Vậy rút được bi đỏ dễ hơn rút được bi xanh.`, "Nhiều kết quả thuận hơn thì khả năng xảy ra lớn hơn."),
          ],
          R`Rút được bi đỏ dễ xảy ra hơn.`,
          [{ expr: "4-1", expect: "3" }],
        )],
        [
          luyen(R`Số liệu giả định. Túi có $2$ bi đỏ và $6$ bi xanh. Màu nào dễ được rút hơn?`, R`Bi xanh dễ được rút hơn.`, [{ expr: "6-2", expect: "4" }], "Sáu lớn hơn hai, nên bi xanh có nhiều kết quả thuận hơn."),
          luyen(R`Túi có $3$ bi đỏ và $3$ bi xanh. Hai việc rút đỏ và rút xanh có cùng khả năng không?`, R`Có, hai việc cùng khả năng.`, [{ expr: "3-3", expect: "0" }], "Hai màu có cùng số viên thì không màu nào dễ hơn."),
          luyen(R`Túi có $1$ bi đỏ và $8$ bi xanh. Hiệu số bi xanh trừ bi đỏ bằng bao nhiêu?`, R`Hiệu bằng $7$, nên bi xanh dễ được rút hơn.`, [{ expr: "8-1", expect: "7" }], "Hiệu dương cho biết màu đứng trước trong phép trừ ít hơn màu đứng sau."),
        ],
      ),
    ]),
    chuong("dien-tich-khoi-luong-3", "Diện tích, khối lượng và dung tích", [
      bai(
        "dien-tich-3",
        "Diện tích hình chữ nhật và hình vuông",
        R`Xentimét vuông là diện tích của hình vuông cạnh $1$ xentimét. Diện tích hình chữ nhật bằng chiều dài nhân chiều rộng, cùng một đơn vị đo. Diện tích hình vuông bằng cạnh nhân cạnh.`,
        [vd(
          R`Hình chữ nhật dài $5$ xentimét và rộng $3$ xentimét. Diện tích bằng bao nhiêu xentimét vuông?`,
          [
            buoc(R`Chia hình thành $3$ hàng, mỗi hàng $5$ ô vuông cạnh $1$ xentimét.`, R`Mỗi ô vuông nhỏ có diện tích đúng một xentimét vuông.`),
            buoc(R`Số ô là $5\times 3=15$.`, R`Các hàng có số ô bằng nhau nên đếm bằng phép nhân.`),
          ],
          R`Diện tích bằng $15$ xentimét vuông.`,
          [{ expr: "5*3", expect: "15" }],
        )],
        [
          luyen(R`Hình vuông cạnh $4$ xentimét có diện tích bao nhiêu xentimét vuông?`, R`Diện tích bằng $16$ xentimét vuông.`, [{ expr: "4*4", expect: "16" }], R`Hình vuông có $4$ hàng, mỗi hàng $4$ ô, tức $16$ ô.`),
          luyen(R`Hình chữ nhật dài $8$ xentimét và rộng $2$ xentimét. Tính diện tích.`, R`Diện tích bằng $16$ xentimét vuông.`, [{ expr: "8*2", expect: "16" }], R`Lấy chiều dài nhân chiều rộng: $8\times 2=16$.`),
          luyen(R`Hình chữ nhật có diện tích $24$ xentimét vuông và chiều rộng $4$ xentimét. Chiều dài bằng bao nhiêu xentimét?`, R`Chiều dài bằng $6$ xentimét.`, [{ expr: "24/4", expect: "6" }], R`Diện tích bằng dài nhân rộng, nên chiều dài bằng $24:4=6$.`),
        ],
        {
          figure: "rect",
          whyTrue: R`Diện tích đếm số ô vuông đơn vị phủ kín hình. Hình chữ nhật xếp được thành các hàng ô bằng nhau, nên số ô bằng số ô mỗi hàng nhân với số hàng.`,
          pitfalls: R`Nhầm diện tích với chu vi. Chu vi đo đường viền bằng xentimét, diện tích đo phần bên trong bằng xentimét vuông.`,
        },
      ),
      bai(
        "gam-ml",
        "Gam và mililít",
        R`Một kilôgam bằng $1000$ gam. Một lít bằng $1000$ mililít. Gam dùng cho vật nhẹ, mililít dùng cho lượng chất lỏng nhỏ.`,
        [vd(
          R`Một gói đường nặng $500$ gam. Hai gói như thế nặng bao nhiêu gam, và bằng bao nhiêu kilôgam?`,
          [
            buoc(R`Hai gói nặng $500\times 2=1000$ gam.`, R`Hai gói bằng nhau nên lấy khối lượng một gói nhân với $2$.`),
            buoc(R`Vì $1000$ gam bằng $1$ kilôgam nên hai gói nặng $1$ kilôgam.`, R`Cứ đủ $1000$ gam thì đổi được thành một kilôgam.`),
          ],
          R`Hai gói nặng $1000$ gam, tức $1$ kilôgam.`,
          [{ expr: "500*2", expect: "1000" }],
        )],
        [
          luyen(R`Đổi $3$ kilôgam ra gam.`, R`Bằng $3000$ gam.`, [{ expr: "3*1000", expect: "3000" }], R`Mỗi kilôgam là $1000$ gam, ba kilôgam là $3000$ gam.`),
          luyen(R`Chai nước có $1000$ mililít, đã uống $250$ mililít. Còn lại bao nhiêu mililít?`, R`Còn lại $750$ mililít.`, [{ expr: "1000-250", expect: "750" }], R`Lấy lượng ban đầu trừ lượng đã uống: $1000-250=750$.`),
          luyen(R`Mỗi cốc chứa $200$ mililít. Cần mấy cốc để rót hết $1$ lít nước?`, R`Cần $5$ cốc.`, [{ expr: "1000/200", expect: "5" }], R`Một lít là $1000$ mililít, và $1000:200=5$.`),
        ],
        {
          whyTrue: R`Tiền tố kilô nghĩa là một nghìn và mili nghĩa là một phần nghìn. Vì thế kilôgam gấp gam $1000$ lần, còn lít gấp mililít $1000$ lần.`,
          pitfalls: R`Đổi kilôgam ra gam bằng cách nhân với $100$. Bậc đổi ở đây là $1000$.`,
        },
      ),
    ]),
  ],
};
