import type { GradeBook } from "./types.ts";
import { bai, buoc, chuong, luyen, vd } from "./types.ts";

const R = String.raw;

export const lop02: GradeBook = {
  grade: 2,
  band: "tieu-hoc",
  title: "Cộng trừ có nhớ, bảng nhân và bảng chia 2 và 5, số đến 1000, đo lường, hình khối và biểu đồ tranh.",
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
      bai(
        "chia-2-5",
        "Bảng chia $2$ và bảng chia $5$",
        R`Bảng chia $2$ đọc ngược từ bảng nhân $2$: vì $2\times 7=14$ nên $14:2=7$. Bảng chia $5$ đọc ngược từ bảng nhân $5$.`,
        [vd(
          R`Có $35$ quyển vở xếp đều vào $5$ ngăn. Mỗi ngăn có bao nhiêu quyển?`,
          [
            buoc(R`Phép tính là $35:5$.`, R`Xếp đều vào $5$ ngăn nghĩa là chia thành $5$ phần bằng nhau.`),
            buoc(R`Vì $5\times 7=35$ nên $35:5=7$.`, R`Tìm trong bảng nhân $5$ tích bằng $35$, thừa số còn lại là thương.`),
          ],
          R`Mỗi ngăn có $7$ quyển vở.`,
          [{ expr: "35/5", expect: "7" }],
        )],
        [
          luyen(R`Tính $14:2$.`, R`Thương bằng $7$.`, [{ expr: "14/2", expect: "7" }], R`Hai nhân $7$ bằng $14$, nên $14$ chia $2$ được $7$.`),
          luyen(R`Tính $45:5$.`, R`Thương bằng $9$.`, [{ expr: "45/5", expect: "9" }], R`Năm nhân $9$ bằng $45$, nên $45$ chia $5$ được $9$.`),
          luyen(R`Có $20$ chiếc đũa, ghép thành từng đôi. Được bao nhiêu đôi đũa?`, R`Được $10$ đôi đũa.`, [{ expr: "20/2", expect: "10" }], R`Mỗi đôi có $2$ chiếc, nên lấy $20$ chia cho $2$ và được $10$.`),
        ],
        {
          whyTrue: R`Phép nhân và phép chia đi ngược nhau. Biết một phép nhân trong bảng là biết luôn hai phép chia tương ứng.`,
          pitfalls: R`Đọc bảng nhân rồi lấy nhầm thừa số. Với $35:5$, thương là thừa số còn lại $7$, không phải $5$.`,
        },
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
      bai(
        "cong-tru-1000",
        "Cộng và trừ trong phạm vi 1000",
        R`Đặt tính thẳng cột: đơn vị dưới đơn vị, chục dưới chục, trăm dưới trăm. Tính từ phải sang trái, có nhớ thì nhớ sang hàng liền bên trái.`,
        [vd(
          R`Tính $358+127$.`,
          [
            buoc(R`Hàng đơn vị: $8+7=15$, viết $5$ và nhớ $1$.`, R`Mười đơn vị đổi thành một chục, nên nhớ $1$ sang hàng chục.`),
            buoc(R`Hàng chục: $5+2+1=8$. Hàng trăm: $3+1=4$. Tổng là $485$.`, R`Số nhớ được cộng vào hàng chục, còn hàng trăm không phải nhớ.`),
          ],
          R`Tổng bằng $485$.`,
          [{ expr: "358+127", expect: "485" }],
        )],
        [
          luyen(R`Tính $245+132$.`, R`Tổng bằng $377$.`, [{ expr: "245+132", expect: "377" }], R`Không hàng nào vượt quá $9$, nên cộng từng hàng và được $377$.`),
          luyen(R`Tính $562-238$.`, R`Hiệu bằng $324$.`, [{ expr: "562-238", expect: "324" }], R`Hàng đơn vị mượn một chục: $12-8=4$. Hàng chục còn $5-3=2$, hàng trăm $5-2=3$.`),
          luyen(R`Một trường có $416$ bạn nam và $389$ bạn nữ. Trường có tất cả bao nhiêu bạn?`, R`Trường có $805$ bạn.`, [{ expr: "416+389", expect: "805" }], R`Hàng đơn vị $6+9=15$ nhớ $1$, hàng chục $1+8+1=10$ nhớ $1$, hàng trăm $4+3+1=8$.`),
        ],
        {
          whyTrue: R`Số có ba chữ số vẫn chỉ gồm trăm, chục và đơn vị. Cộng hay trừ từng hàng, rồi đổi mười đơn vị thành một chục, mười chục thành một trăm khi cần.`,
          pitfalls: R`Đặt số có hai chữ số lệch sang trái khi cộng với số có ba chữ số. Chữ số hàng đơn vị phải thẳng cột với hàng đơn vị.`,
        },
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
    chuong("do-luong-2", "Khối lượng, dung tích và thời gian", [
      bai(
        "kg-lit",
        "Kilôgam và lít",
        R`Kilôgam đo độ nặng nhẹ của một vật. Lít đo lượng nước chứa trong bình. Chỉ cộng hoặc trừ các số đo có cùng đơn vị.`,
        [vd(
          R`Một túi gạo nặng $5$ kilôgam, một túi đường nặng $2$ kilôgam. Cả hai túi nặng bao nhiêu kilôgam?`,
          [
            buoc(R`Hai số đo cùng đơn vị kilôgam nên cộng được.`, R`Cùng đơn vị thì cộng các số đo như cộng hai số.`),
            buoc(R`Ta có $5+2=7$ kilôgam.`, R`Đặt cả hai túi lên cân thì kim chỉ tổng của hai khối lượng.`),
          ],
          R`Cả hai túi nặng $7$ kilôgam.`,
          [{ expr: "5+2", expect: "7" }],
        )],
        [
          luyen(R`Can to chứa $10$ lít nước, can nhỏ chứa $4$ lít. Can to chứa nhiều hơn can nhỏ bao nhiêu lít?`, R`Nhiều hơn $6$ lít.`, [{ expr: "10-4", expect: "6" }], R`Tìm phần hơn thì lấy số lớn trừ số bé: $10-4=6$ lít.`),
          luyen(R`Mỗi chai chứa $2$ lít nước. Năm chai như thế chứa bao nhiêu lít?`, R`Chứa $10$ lít.`, [{ expr: "2*5", expect: "10" }], R`Năm chai bằng nhau là năm lần $2$ lít, tức $10$ lít.`),
          luyen(R`Bao gạo nặng $50$ kilôgam, đã dùng $18$ kilôgam. Còn lại bao nhiêu kilôgam?`, R`Còn lại $32$ kilôgam.`, [{ expr: "50-18", expect: "32" }], R`Lấy $50$ trừ $18$, mượn một chục ở hàng đơn vị, được $32$.`),
        ],
        {
          whyTrue: R`Đơn vị đo là một lượng mẫu mọi người thống nhất dùng chung. Vật nặng mấy kilôgam nghĩa là nặng bằng ngần ấy quả cân một kilôgam.`,
          pitfalls: R`Cộng số kilôgam với số lít. Hai đơn vị đo hai thứ khác nhau nên không cộng với nhau được.`,
        },
      ),
      bai(
        "gio-phut",
        "Giờ, phút và ngày",
        R`Một giờ có $60$ phút. Một ngày có $24$ giờ. Khi kim phút chỉ số $6$ là đã qua $30$ phút, gọi là giờ rưỡi. Khi kim phút chỉ số $3$ là đã qua $15$ phút.`,
        [vd(
          R`Kim giờ nằm giữa số $8$ và số $9$, kim phút chỉ số $6$. Đồng hồ chỉ mấy giờ? Còn bao nhiêu phút nữa thì đến $9$ giờ?`,
          [
            buoc(R`Đồng hồ chỉ $8$ giờ $30$ phút.`, R`Kim phút chỉ số $6$ là đi được nửa vòng, tức $30$ phút sau $8$ giờ.`),
            buoc(R`Còn $60-30=30$ phút nữa thì đến $9$ giờ.`, R`Một giờ có $60$ phút, đã qua $30$ phút thì còn lại $30$ phút.`),
          ],
          R`Đồng hồ chỉ $8$ giờ $30$ phút, còn $30$ phút nữa thì đến $9$ giờ.`,
          [{ expr: "60-30", expect: "30" }],
        )],
        [
          luyen(R`Nửa giờ có bao nhiêu phút?`, R`Nửa giờ có $30$ phút.`, [{ expr: "60/2", expect: "30" }], R`Một giờ có $60$ phút, chia đôi thì được $30$ phút.`),
          luyen(R`Bạn Lan học từ $7$ giờ đến $10$ giờ. Lan học trong mấy giờ?`, R`Lan học trong $3$ giờ.`, [{ expr: "10-7", expect: "3" }], R`Lấy giờ kết thúc trừ giờ bắt đầu: $10-7=3$ giờ.`),
          luyen(R`Kim phút chỉ số $3$. Đã qua bao nhiêu phút kể từ giờ đúng?`, R`Đã qua $15$ phút.`, [{ expr: "3*5", expect: "15" }], R`Mỗi số trên mặt đồng hồ cách nhau $5$ phút, nên số $3$ ứng với $15$ phút.`),
        ],
        {
          whyTrue: R`Kim phút đi hết một vòng mặt đồng hồ là $60$ phút, và mặt đồng hồ chia thành $12$ số. Từ số này sang số kế tiếp, kim phút đi $60:12=5$ phút.`,
          pitfalls: R`Thấy kim phút chỉ số $6$ thì đọc là $6$ phút. Số $6$ trên mặt đồng hồ ứng với $30$ phút.`,
        },
      ),
    ]),
    chuong("hinh-so-lieu-2", "Hình khối và biểu đồ tranh", [
      bai(
        "hinh-khoi",
        "Khối trụ, khối cầu và hình tứ giác",
        R`Khối trụ có hai mặt đáy là hình tròn, như hộp sữa. Khối cầu tròn đều mọi phía, như quả bóng. Hình tứ giác có $4$ cạnh và $4$ đỉnh.`,
        [vd(
          R`Một hình tứ giác có $4$ cạnh. Ba hình tứ giác rời nhau có tất cả bao nhiêu cạnh?`,
          [
            buoc(R`Mỗi hình có $4$ cạnh, và có $3$ hình như thế.`, R`Các hình rời nhau nên không có cạnh nào dùng chung.`),
            buoc(R`Ta có $4+4+4=12$ cạnh.`, R`Cộng số cạnh của từng hình, mỗi hình góp đúng bốn cạnh.`),
          ],
          R`Có tất cả $12$ cạnh.`,
          [{ expr: "4*3", expect: "12" }],
        )],
        [
          luyen(R`Hai hình tứ giác rời nhau có tất cả mấy đỉnh?`, R`Có tất cả $8$ đỉnh.`, [{ expr: "4*2", expect: "8" }], R`Mỗi hình tứ giác có $4$ đỉnh, hai hình là $4+4=8$ đỉnh.`),
          luyen(R`Có $5$ hộp sữa dạng khối trụ và $3$ quả bóng dạng khối cầu. Có tất cả bao nhiêu khối?`, R`Có tất cả $8$ khối.`, [{ expr: "5+3", expect: "8" }], R`Gộp số khối trụ với số khối cầu: $5+3=8$ khối.`),
          luyen(R`Một khối trụ có $2$ mặt đáy hình tròn. Bốn khối trụ có tất cả bao nhiêu mặt đáy?`, R`Có tất cả $8$ mặt đáy.`, [{ expr: "2*4", expect: "8" }], R`Bốn khối, mỗi khối $2$ mặt đáy, là bốn lần $2$, tức $8$.`),
        ],
        {
          figure: "rect",
          whyTrue: R`Tên gọi của hình và khối dựa trên đặc điểm đếm được và nhìn được: số cạnh, số đỉnh, mặt phẳng hay mặt cong. Xoay hình hay đổi kích thước không làm đổi các đặc điểm ấy.`,
          pitfalls: R`Chỉ gọi hình vuông và hình chữ nhật là hình tứ giác. Mọi hình khép kín có bốn cạnh thẳng đều là hình tứ giác, kể cả khi méo.`,
        },
      ),
      bai(
        "bieu-do-tranh",
        "Biểu đồ tranh",
        R`Biểu đồ tranh dùng hình vẽ để ghi số lượng. Mỗi hình vẽ thay cho một đồ vật. Đếm số hình trong mỗi hàng để biết số lượng của hàng đó.`,
        [vd(
          R`Biểu đồ tranh có hàng táo vẽ $6$ quả và hàng cam vẽ $4$ quả. Loại nào nhiều hơn, và nhiều hơn mấy quả?`,
          [
            buoc(R`Hàng táo có $6$ hình, hàng cam có $4$ hình.`, R`Mỗi hình vẽ thay cho một quả, nên đếm hình là đếm quả.`),
            buoc(R`Táo nhiều hơn cam $6-4=2$ quả.`, R`So sánh hai hàng bằng phép trừ số lớn cho số bé.`),
          ],
          R`Táo nhiều hơn cam $2$ quả.`,
          [{ expr: "6-4", expect: "2" }],
        )],
        [
          luyen(R`Hàng mèo vẽ $3$ con, hàng chó vẽ $5$ con. Có tất cả bao nhiêu con vật?`, R`Có tất cả $8$ con vật.`, [{ expr: "3+5", expect: "8" }], R`Gộp hai hàng lại: $3+5=8$ con vật.`),
          luyen(R`Hàng bút vẽ $7$ chiếc, hàng thước vẽ $7$ chiếc. Hàng nào nhiều hơn?`, R`Hai hàng bằng nhau.`, [{ expr: "7-7", expect: "0" }], R`Hai hàng cùng có $7$ hình nên số lượng bằng nhau.`),
          luyen(R`Ba hàng vẽ lần lượt $2$, $4$ và $6$ bông hoa. Hàng nhiều nhất hơn hàng ít nhất mấy bông?`, R`Hơn $4$ bông.`, [{ expr: "6-2", expect: "4" }], R`Hàng nhiều nhất có $6$ bông, hàng ít nhất có $2$ bông, hiệu là $4$.`),
        ],
        {
          figure: "bar",
          whyTrue: R`Mỗi hình vẽ ứng với đúng một đồ vật, nên hàng dài hơn là hàng có nhiều đồ vật hơn. Nhìn độ dài các hàng là so sánh được ngay, chưa cần đếm.`,
          pitfalls: R`Vẽ các hình to nhỏ khác nhau hoặc không thẳng cột. Khi đó hàng dài hơn chưa chắc có nhiều hình hơn.`,
        },
      ),
    ]),
  ],
};
