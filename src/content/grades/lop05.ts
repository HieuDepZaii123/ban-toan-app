import type { GradeBook } from "./types.ts";
import { bai, buoc, chuong, luyen, vd } from "./types.ts";

const R = String.raw;

export const lop05: GradeBook = {
  grade: 5,
  band: "tieu-hoc",
  title: "Số thập phân, phần trăm, tổng và tỉ, diện tích tam giác, hình tròn và thể tích hình hộp.",
  chapters: [
    chuong("thap-phan", "Số thập phân", [
      bai(
        "nhan-thap-phan",
        "Nhân số thập phân",
        R`Nhân số thập phân có thể đổi về nhân phân số. Số chữ số sau dấu phẩy của tích bằng tổng số chữ số sau dấu phẩy của hai thừa số, trước khi rút gọn kết quả.`,
        [vd(
          R`Tính $2{,}5\times 1{,}2$.`,
          [
            buoc(R`Đổi $2{,}5=\frac{5}{2}$ và $1{,}2=\frac{6}{5}$.`, "Một chữ số thập phân là mẫu $10$, và các phân số này đã rút gọn."),
            buoc(R`Tích bằng $\frac{5}{2}\times\frac{6}{5}=3$.`, "Rút gọn $5$ và $2$ với $6$. Kết quả là số nguyên $3$."),
          ],
          R`Tích bằng $3$.`,
          [{ expr: "Rational(5,2)*Rational(6,5)", expect: "3" }],
        )],
        [
          luyen(R`Tính $0{,}5\times 0{,}4$.`, R`Tích bằng $0{,}2$.`, [{ expr: "Rational(1,2)*Rational(2,5)", expect: "Rational(1,5)" }], "Đổi sang phân số rồi nhân. Một nửa của $\\frac{2}{5}$ bằng $\\frac{1}{5}$, tức $0{,}2$."),
          luyen(R`Tính $1{,}5\times 2$.`, R`Tích bằng $3$.`, [{ expr: "Rational(3,2)*2", expect: "3" }], "Một phẩy năm là $\\frac{3}{2}$. Nhân với $2$ được $3$."),
          luyen(R`Tính $2{,}4\times 0{,}5$.`, R`Tích bằng $1{,}2$.`, [{ expr: "Rational(24,10)*Rational(1,2)", expect: "Rational(6,5)" }], "Một nửa của $2{,}4$ là $1{,}2$. Đây vẫn là phép nhân số thập phân."),
        ],
      ),
      bai(
        "lam-tron",
        "Làm tròn số thập phân",
        R`Làm tròn đến hàng phần mười: nhìn chữ số phần trăm. Nếu chữ số đó từ $5$ trở lên thì tăng chữ số phần mười thêm $1$. Nếu nhỏ hơn $5$ thì giữ nguyên chữ số phần mười.`,
        [vd(
          R`Làm tròn $3{,}26$ và $3{,}24$ đến hàng phần mười.`,
          [
            buoc(R`Số $3{,}26$ có chữ số phần trăm là $6\ge 5$, nên làm tròn thành $3{,}3$.`, "Chữ số cần xét là chữ số ngay sau hàng làm tròn. Từ $5$ trở lên thì làm tròn lên."),
            buoc(R`Số $3{,}24$ có chữ số phần trăm là $4<5$, nên làm tròn thành $3{,}2$.`, "Chữ số nhỏ hơn $5$ thì giữ nguyên chữ số phần mười và bỏ các chữ số phía sau."),
          ],
          R`Hai số làm tròn lần lượt thành $3{,}3$ và $3{,}2$.`,
          [{ expr: "round(Rational(326,100),1)", expect: "33/10" }, { expr: "round(Rational(324,100),1)", expect: "16/5" }],
        )],
        [
          luyen(R`Làm tròn $7{,}86$ đến hàng phần mười.`, R`Kết quả là $7{,}9$.`, [{ expr: "round(Rational(786,100),1)", expect: "79/10" }], "Chữ số phần trăm là $6$, lớn hơn $5$, nên tăng chữ số phần mười từ $8$ lên $9$."),
          luyen(R`Làm tròn $4{,}13$ đến hàng phần mười.`, R`Kết quả là $4{,}1$.`, [{ expr: "round(Rational(413,100),1)", expect: "41/10" }], "Chữ số phần trăm là $3$, nhỏ hơn $5$, nên giữ chữ số phần mười."),
          luyen(R`Hiệu giữa $3{,}3$ và $3{,}26$ bằng bao nhiêu?`, R`Hiệu bằng $0{,}04$.`, [{ expr: "Rational(33,10)-Rational(326,100)", expect: "Rational(4,100)" }], "Số đã làm tròn lên lớn hơn số ban đầu. Hiệu là bốn phần trăm."),
        ],
      ),
      bai(
        "cong-tru-thap-phan",
        "Cộng và trừ số thập phân",
        R`Đặt tính sao cho các dấu phẩy thẳng cột, rồi cộng hoặc trừ như số tự nhiên. Dấu phẩy của kết quả thẳng cột với các dấu phẩy ở trên. Thiếu chữ số ở phần thập phân thì coi như chữ số $0$.`,
        [vd(
          R`Tính $3{,}45+1{,}8$.`,
          [
            buoc(R`Viết $1{,}8$ thành $1{,}80$ để hai số cùng có hai chữ số thập phân.`, R`Thêm chữ số $0$ vào bên phải phần thập phân không làm đổi giá trị.`),
            buoc(R`Cộng từng hàng: $3{,}45+1{,}80=5{,}25$.`, R`Phần trăm cộng với phần trăm, phần mười cộng với phần mười, có nhớ sang hàng đơn vị.`),
          ],
          R`Tổng bằng $5{,}25$.`,
          [{ expr: "Rational(345,100)+Rational(18,10)", expect: "Rational(21,4)" }],
        )],
        [
          luyen(R`Tính $2{,}5+0{,}75$.`, R`Tổng bằng $3{,}25$.`, [{ expr: "Rational(5,2)+Rational(3,4)", expect: "Rational(13,4)" }], R`Viết $2{,}5$ thành $2{,}50$, rồi cộng với $0{,}75$ được $3{,}25$.`),
          luyen(R`Tính $5-1{,}3$.`, R`Hiệu bằng $3{,}7$.`, [{ expr: "5-Rational(13,10)", expect: "Rational(37,10)" }], R`Viết $5$ thành $5{,}0$, mượn một đơn vị để trừ ở hàng phần mười.`),
          luyen(R`Một sợi dây dài $4{,}2$ mét, cắt đi $1{,}65$ mét. Còn lại bao nhiêu mét?`, R`Còn lại $2{,}55$ mét.`, [{ expr: "Rational(42,10)-Rational(165,100)", expect: "Rational(51,20)" }], R`Viết $4{,}2$ thành $4{,}20$, rồi trừ $1{,}65$ được $2{,}55$.`),
        ],
        {
          whyTrue: R`Dấu phẩy thẳng cột bảo đảm đơn vị cộng với đơn vị, phần mười cộng với phần mười. Đó vẫn là quy tắc cộng từng hàng của số tự nhiên, mở rộng sang bên phải dấu phẩy.`,
          pitfalls: R`Căn thẳng theo chữ số cuối cùng thay vì theo dấu phẩy. Khi đó $3{,}45+1{,}8$ bị tính thành $3{,}63$.`,
        },
      ),
      bai(
        "chia-thap-phan",
        "Chia số thập phân",
        R`Chia một số thập phân cho một số tự nhiên thì chia như thường và đặt dấu phẩy vào thương khi bắt đầu hạ chữ số ở phần thập phân. Chia cho một số thập phân thì nhân cả số bị chia và số chia với $10$ hoặc $100$ để số chia thành số tự nhiên.`,
        [vd(
          R`Tính $7{,}2:0{,}6$.`,
          [
            buoc(R`Nhân cả hai số với $10$: phép chia trở thành $72:6$.`, R`Nhân số bị chia và số chia với cùng một số khác $0$ thì thương không đổi.`),
            buoc(R`Ta có $72:6=12$.`, R`Số chia đã là số tự nhiên nên chia như bình thường.`),
          ],
          R`Thương bằng $12$.`,
          [{ expr: "Rational(72,10)/Rational(6,10)", expect: "12" }],
        )],
        [
          luyen(R`Tính $8{,}4:4$.`, R`Thương bằng $2{,}1$.`, [{ expr: "Rational(84,10)/4", expect: "Rational(21,10)" }], R`Chia $8$ cho $4$ được $2$, đặt dấu phẩy, rồi chia $4$ phần mười cho $4$ được $1$.`),
          luyen(R`Tính $1{,}5:0{,}5$.`, R`Thương bằng $3$.`, [{ expr: "Rational(3,2)/Rational(1,2)", expect: "3" }], R`Nhân cả hai số với $10$ được $15:5=3$.`),
          luyen(R`Có $4{,}5$ lít dầu rót đều vào các chai, mỗi chai $0{,}75$ lít. Rót được bao nhiêu chai?`, R`Rót được $6$ chai.`, [{ expr: "Rational(45,10)/Rational(75,100)", expect: "6" }], R`Nhân cả hai số với $100$ được $450:75=6$.`),
        ],
        {
          whyTrue: R`Thương cho biết số bị chia gấp mấy lần số chia. Gấp cả hai số lên cùng một số lần thì tỉ lệ giữa chúng không đổi, nên thương giữ nguyên.`,
          pitfalls: R`Chỉ dời dấu phẩy của số chia mà quên dời ở số bị chia. Phải nhân cả hai số với cùng $10$ hoặc $100$.`,
        },
      ),
    ]),
    chuong("phan-tram", "Phần trăm", [
      bai(
        "mot-phan-tram",
        "Tìm một số phần trăm của một số",
        R`Có $p\%$ của một số là lấy số đó nhân với $\frac{p}{100}$. Muốn tìm cả số khi biết một phần trăm thì làm phép chia tương ứng.`,
        [vd(
          R`Tính $25\%$ của $80$ và tìm số mà $20\%$ của nó bằng $6$.`,
          [
            buoc(R`Lấy $25\%$ của $80$ được $80\times\frac{25}{100}=20$.`, "Phần trăm là phân số mẫu $100$. Một phần tư của $80$ cũng bằng $20$."),
            buoc(R`Nếu $20\%$ của một số bằng $6$ thì số đó bằng $6$ chia cho $\frac{20}{100}$, tức $30$.`, "Biết một phần thì chia để tìm cả số, và thương bằng $30$."),
          ],
          R`Có $25\%$ của $80$ bằng $20$, và số cần tìm bằng $30$.`,
          [
            { expr: "80*Rational(25,100)", expect: "20" },
            { expr: "6/Rational(20,100)", expect: "30" },
          ],
        )],
        [
          luyen(R`Tính $10\%$ của $250$.`, R`Kết quả bằng $25$.`, [{ expr: "250*Rational(10,100)", expect: "25" }], "Mười phần trăm là một phần mười. Một phần mười của $250$ bằng $25$."),
          luyen(R`Tính $50\%$ của $18$.`, R`Kết quả bằng $9$.`, [{ expr: "18*Rational(1,2)", expect: "9" }], "Năm mươi phần trăm bằng một nửa. Nửa của $18$ là $9$."),
          luyen(R`Một lớp $40$ bạn có $30\%$ đạt giải. Có bao nhiêu bạn đạt giải?`, R`Có $12$ bạn đạt giải.`, [{ expr: "40*Rational(30,100)", expect: "12" }], "Lấy $30$ phần trăm của $40$. Nhân $40$ với $\\frac{30}{100}$ được $12$."),
        ],
      ),
      bai(
        "doi-phan-tram",
        "Đổi phân số thành phần trăm",
        R`Muốn đổi một phân số thành phần trăm, viết phân số đó với mẫu $100$, hoặc nhân phân số với $100$ rồi đọc kết quả kèm dấu phần trăm.`,
        [vd(
          R`Đổi $\frac{1}{4}$ và $\frac{3}{5}$ thành phần trăm.`,
          [
            buoc(R`Phân số $\frac{1}{4}$ bằng $\frac{25}{100}$, tức $25\%$.`, "Nhân tử và mẫu với $25$ để mẫu thành $100$. Tử $25$ là số phần trăm."),
            buoc(R`Phân số $\frac{3}{5}$ bằng $\frac{60}{100}$, tức $60\%$.`, "Nhân tử và mẫu với $20$. Ba phần năm là sáu mươi phần trăm."),
          ],
          R`Một phần tư bằng $25\%$ và ba phần năm bằng $60\%$.`,
          [{ expr: "Rational(1,4)*100", expect: "25" }, { expr: "Rational(3,5)*100", expect: "60" }],
        )],
        [
          luyen(R`Đổi $\frac{1}{2}$ thành phần trăm.`, R`Một nửa bằng $50\%$.`, [{ expr: "Rational(1,2)*100", expect: "50" }], "Nhân phân số với $100$. Một nửa của $100$ là $50$."),
          luyen(R`Đổi $\frac{1}{5}$ thành phần trăm.`, R`Một phần năm bằng $20\%$.`, [{ expr: "Rational(1,5)*100", expect: "20" }], "Nhân $\\frac{1}{5}$ với $100$ được $20$. Đó là số phần trăm."),
          luyen(R`Biết $25\%$ của một số bằng $10$. Cả số bằng bao nhiêu?`, R`Cả số bằng $40$.`, [{ expr: "10/Rational(25,100)", expect: "40" }], "Chia phần đã biết cho phân số phần trăm. Thương là cả số ban đầu."),
        ],
      ),
    ]),
    chuong("dien-tich", "Diện tích", [
      bai(
        "tam-giac-thang",
        "Diện tích hình tam giác và hình thang",
        R`Diện tích tam giác bằng một nửa đáy nhân chiều cao. Diện tích hình thang bằng trung bình cộng hai đáy, rồi nhân với chiều cao.`,
        [vd(
          R`Tam giác có đáy $6$ và chiều cao $4$. Hình thang có hai đáy $3$ và $5$, chiều cao $4$. Tính hai diện tích.`,
          [
            buoc(R`Diện tích tam giác bằng $\frac{1}{2}\times 6\times 4=12$.`, "Một nửa tích đáy với chiều cao đúng ứng với đáy đó."),
            buoc(R`Diện tích hình thang bằng $\frac{3+5}{2}\times 4=16$.`, "Trung bình hai đáy là $4$, nhân với chiều cao $4$ được $16$."),
          ],
          R`Diện tích tam giác bằng $12$ và diện tích hình thang bằng $16$.`,
          [
            { expr: "Rational(1,2)*6*4", expect: "12" },
            { expr: "(3+5)/2*4", expect: "16" },
          ],
        )],
        [
          luyen(R`Tam giác đáy $10$ và cao $3$ có diện tích bằng bao nhiêu?`, R`Diện tích bằng $15$.`, [{ expr: "Rational(1,2)*10*3", expect: "15" }], "Một nửa của tích $10$ với $3$ bằng $15$. Chiều cao phải ứng với đúng đáy đã chọn."),
          luyen(R`Hình thang hai đáy $2$ và $6$, cao $5$, có diện tích bằng bao nhiêu?`, R`Diện tích bằng $20$.`, [{ expr: "(2+6)/2*5", expect: "20" }], "Trung bình hai đáy bằng $4$. Nhân với chiều cao $5$ được $20$."),
          luyen(R`Hình chữ nhật $4$ trên $4$ có diện tích bằng bao nhiêu?`, R`Diện tích bằng $16$.`, [{ expr: "4*4", expect: "16" }], "Hình chữ nhật này có hai kích thước bằng nhau, nên là hình vuông cạnh $4$. Diện tích là bình phương cạnh."),
        ],
        { figure: "triangle" },
      ),
      bai(
        "hinh-tron-5",
        "Chu vi và diện tích hình tròn",
        R`Ở lớp $5$, lấy $3{,}14$ thay cho hệ số của đường tròn. Bán kính $r$ xentimét thì chu vi là $2\times 3{,}14\times r$ xentimét và diện tích là $3{,}14\times r\times r$ xentimét vuông.`,
        [vd(
          R`Hình tròn có bán kính $5$ xentimét. Tính chu vi và diện tích, lấy $3{,}14$.`,
          [
            buoc(R`Chu vi bằng $2\times 3{,}14\times 5=31{,}4$ xentimét.`, "Nhân đôi bán kính rồi nhân với $3{,}14$. Không thay đường kính vào chỗ bán kính."),
            buoc(R`Diện tích bằng $3{,}14\times 5\times 5=78{,}5$ xentimét vuông.`, "Bình phương bán kính là $25$, rồi nhân với $3{,}14$."),
          ],
          R`Chu vi bằng $31{,}4$ xentimét và diện tích bằng $78{,}5$ xentimét vuông.`,
          [{ expr: "Rational(314,100)*2*5", expect: "Rational(157,5)" }, { expr: "Rational(314,100)*5**2", expect: "Rational(157,2)" }],
        )],
        [
          luyen(R`Đường kính bằng $10$ xentimét. Bán kính bằng bao nhiêu?`, R`Bán kính bằng $5$ xentimét.`, [{ expr: "10/2", expect: "5" }], "Bán kính là nửa đường kính. Công thức chu vi và diện tích dùng bán kính."),
          luyen(R`Hình tròn bán kính $1$ xentimét, lấy $3{,}14$. Chu vi bằng bao nhiêu?`, R`Chu vi bằng $6{,}28$ xentimét.`, [{ expr: "Rational(314,100)*2*1", expect: "Rational(157,25)" }], "Nhân $2$ với $3{,}14$ và với bán kính $1$."),
          luyen(R`Hình tròn bán kính $3$ xentimét, lấy $3{,}14$. Diện tích bằng bao nhiêu?`, R`Diện tích bằng $28{,}26$ xentimét vuông.`, [{ expr: "Rational(314,100)*3**2", expect: "Rational(1413,50)" }], "Bình phương bán kính bằng $9$. Nhân $9$ với $3{,}14$."),
        ],
        { figure: "circle" },
      ),
    ]),
    chuong("the-tich", "Thể tích hình hộp", [
      bai(
        "hop",
        "Thể tích hình hộp chữ nhật",
        R`Hình hộp chữ nhật có ba kích thước $a, b, c$ thì thể tích bằng $a\times b\times c$. Đơn vị thể tích là đơn vị dài lập phương, ví dụ xentimét khối.`,
        [vd(
          R`Hộp có chiều dài $2$ xentimét, chiều rộng $3$ xentimét và chiều cao $4$ xentimét. Thể tích bằng bao nhiêu?`,
          [
            buoc(R`Diện tích đáy bằng $2\times 3=6$ xentimét vuông.`, "Đáy là hình chữ nhật. Diện tích đáy nhân với chiều cao ra thể tích."),
            buoc(R`Thể tích bằng $6\times 4=24$ xentimét khối.`, "Ba kích thước đều được nhân. Đơn vị là xentimét khối."),
          ],
          R`Thể tích bằng $24$ xentimét khối.`,
          [{ expr: "2*3*4", expect: "24" }],
        )],
        [
          luyen(R`Hình lập phương cạnh $3$ có thể tích bằng bao nhiêu?`, R`Thể tích bằng $27$.`, [{ expr: "3**3", expect: "27" }], "Hình lập phương có ba kích thước bằng nhau. Thể tích là lập phương của cạnh."),
          luyen(R`Hộp $5\times 2\times 2$ có thể tích bằng bao nhiêu?`, R`Thể tích bằng $20$.`, [{ expr: "5*2*2", expect: "20" }], "Nhân lần lượt ba kích thước. Diện tích đáy $10$ nhân chiều cao $2$ cũng ra $20$."),
          luyen(R`Hộp có thể tích $24$ xentimét khối và chiều cao $4$ xentimét. Diện tích mặt đáy bằng bao nhiêu?`, R`Diện tích mặt đáy bằng $6$ xentimét vuông.`, [{ expr: "24/4", expect: "6" }], "Thể tích bằng diện tích đáy nhân chiều cao. Lấy $24:4$ được diện tích mặt đáy."),
        ],
        { figure: "rect" },
      ),
      bai(
        "lap-phuong",
        "Hình lập phương",
        R`Hình lập phương có mười hai cạnh bằng nhau, sáu mặt là hình vuông. Thể tích bằng lập phương cạnh. Diện tích toàn phần bằng sáu lần diện tích một mặt.`,
        [vd(
          R`Hình lập phương cạnh $4$ xentimét. Tính thể tích và diện tích toàn phần.`,
          [
            buoc(R`Thể tích bằng $4^3=64$ xentimét khối.`, "Ba kích thước cùng bằng $4$. Nhân $4\\times 4\\times 4$."),
            buoc(R`Một mặt có diện tích $16$, sáu mặt có diện tích $96$ xentimét vuông.`, "Mỗi mặt là hình vuông cạnh $4$. Sáu mặt không chồng nhau khi tính diện tích toàn phần."),
          ],
          R`Thể tích bằng $64$ xentimét khối và diện tích toàn phần bằng $96$ xentimét vuông.`,
          [{ expr: "4**3", expect: "64" }, { expr: "6*4**2", expect: "96" }],
        )],
        [
          luyen(R`Hình lập phương cạnh $2$ có thể tích bằng bao nhiêu?`, R`Thể tích bằng $8$.`, [{ expr: "2**3", expect: "8" }], "Lập phương của $2$ là $8$. Cạnh nhân ba lần với chính nó."),
          luyen(R`Hình lập phương cạnh $5$ có diện tích một mặt bằng bao nhiêu?`, R`Diện tích một mặt bằng $25$.`, [{ expr: "5**2", expect: "25" }], "Mỗi mặt là hình vuông. Diện tích một mặt là bình phương cạnh."),
          luyen(R`Hình lập phương cạnh $5$ có diện tích toàn phần bằng bao nhiêu?`, R`Diện tích toàn phần bằng $150$.`, [{ expr: "6*5**2", expect: "150" }], "Sáu mặt vuông, mỗi mặt diện tích $25$. Sáu lần $25$ bằng $150$."),
        ],
      ),
    ]),
    chuong("ti-so", "Tỉ số, tỉ lệ bản đồ và chuyển động đều", [
      bai(
        "ti-so-5",
        "Tỉ số",
        R`Tỉ số của $a$ và $b$, với $b\neq 0$, viết $a:b$. Tỉ số $a:b$ bằng tỉ số $c:d$ khi $a\times d=b\times c$.`,
        [vd(
          R`Tỉ số $2:3$ có bằng tỉ số $4:6$ không?`,
          [
            buoc(R`Tích chéo $2\times 6$ và $3\times 4$.`, "Hai tỉ số bằng nhau khi hai tích chéo bằng nhau."),
            buoc(R`Cả hai tích đều bằng $12$, nên hai tỉ số bằng nhau.`, "Hiệu hai tích chéo bằng $0$."),
          ],
          R`Hai tỉ số bằng nhau.`,
          [{ expr: "2*6-3*4", expect: "0" }],
        )],
        [
          luyen(R`Tỉ số $3:5$ có bằng $6:10$ không?`, R`Có, vì hai tích chéo cùng bằng $30$.`, [{ expr: "3*10-5*6", expect: "0" }], "Nhân các số chéo. Hiệu bằng $0$ thì hai tỉ số bằng nhau."),
          luyen(R`Cho $4:x=2:5$ và $x\neq 0$. Tìm $x$.`, R`Giá trị $x$ bằng $10$.`, [{ expr: "4*5/2", expect: "10" }], "Tích chéo cho $2x=20$. Chia cho $2$ được $10$."),
          luyen(R`Tỉ số $8:2$ bằng bao nhiêu?`, R`Tỉ số bằng $4$.`, [{ expr: "8/2", expect: "4" }], "Chia số đứng trước cho số đứng sau khi số sau khác $0$."),
        ],
      ),
      bai(
        "ban-do",
        "Tỉ lệ bản đồ",
        R`Tỉ lệ $1:100\,000$ nghĩa là $1$ xentimét trên bản đồ ứng với $100\,000$ xentimét ngoài thực địa. Một kilômét bằng $100\,000$ xentimét.`,
        [vd(
          R`Trên bản đồ tỉ lệ $1:100\,000$, đoạn dài $3$ xentimét. Ngoài thực địa đoạn đó dài bao nhiêu kilômét?`,
          [
            buoc(R`Độ dài thực bằng $3\times 100\,000=300\,000$ xentimét.`, "Nhân độ dài trên bản đồ với mẫu tỉ lệ."),
            buoc(R`Đổi ra kilômét: $300\,000:100\,000=3$ kilômét.`, "Một kilômét có $100\\,000$ xentimét."),
          ],
          R`Đoạn ngoài thực địa dài $3$ kilômét.`,
          [{ expr: "3*100000/100000", expect: "3" }],
        )],
        [
          luyen(R`Bản đồ $1:50\,000$, đoạn trên bản đồ dài $2$ xentimét. Độ dài thực bằng bao nhiêu xentimét?`, R`Độ dài thực bằng $100\,000$ xentimét.`, [{ expr: "2*50000", expect: "100000" }], "Nhân độ dài trên bản đồ với $50\\,000$."),
          luyen(R`Đổi $100\,000$ xentimét ra kilômét thì được bao nhiêu?`, R`Bằng $1$ kilômét.`, [{ expr: "100000/100000", expect: "1" }], "Chia cho $100\\,000$ vì đó là số xentimét trong một kilômét."),
          luyen(R`Bản đồ $1:100\,000$, quãng đường thực $4$ kilômét. Trên bản đồ dài bao nhiêu xentimét?`, R`Dài $4$ xentimét.`, [{ expr: "4*100000/100000", expect: "4" }], "Bốn kilômét là $400\\,000$ xentimét. Chia cho mẫu tỉ lệ $100\\,000$ được $4$ xentimét."),
        ],
      ),
      bai(
        "chuyen-dong",
        "Chuyển động đều",
        R`Chuyển động đều có vận tốc không đổi. Quãng đường bằng vận tốc nhân thời gian. Vận tốc bằng quãng đường chia thời gian.`,
        [vd(
          R`Một xe đi đều $60$ kilômét trong $2$ giờ. Hỏi trong $3$ giờ xe đi bao nhiêu kilômét?`,
          [
            buoc(R`Vận tốc bằng $60:2=30$ kilômét mỗi giờ.`, "Chia quãng đường cho thời gian khi xe đi đều."),
            buoc(R`Trong $3$ giờ xe đi $30\times 3=90$ kilômét.`, "Nhân vận tốc với thời gian mới."),
          ],
          R`Xe đi $90$ kilômét.`,
          [{ expr: "60/2*3", expect: "90" }],
        )],
        [
          luyen(R`Xe đi đều $40$ kilômét mỗi giờ trong $3$ giờ. Quãng đường bằng bao nhiêu?`, R`Quãng đường bằng $120$ kilômét.`, [{ expr: "40*3", expect: "120" }], "Nhân vận tốc với thời gian."),
          luyen(R`Đi $45$ kilômét trong $3$ giờ, đều. Vận tốc bằng bao nhiêu?`, R`Vận tốc bằng $15$ kilômét mỗi giờ.`, [{ expr: "45/3", expect: "15" }], "Chia quãng đường cho thời gian."),
          luyen(R`Vận tốc $20$ kilômét mỗi giờ, quãng đường $80$ kilômét. Thời gian bằng bao nhiêu giờ?`, R`Thời gian bằng $4$ giờ.`, [{ expr: "80/20", expect: "4" }], "Thời gian bằng quãng đường chia vận tốc, khi vận tốc khác $0$."),
        ],
      ),
    ]),
    chuong("thoi-gian", "Số đo thời gian", [
      bai(
        "doi-gio",
        "Đổi số đo thời gian",
        R`Một giờ bằng $60$ phút. Một phút bằng $60$ giây. Đổi giờ ra phút thì nhân với $60$, rồi cộng số phút lẻ.`,
        [vd(
          R`Đổi $2$ giờ $15$ phút ra phút.`,
          [
            buoc(R`Hai giờ bằng $2\times 60=120$ phút.`, "Mỗi giờ có sáu mươi phút."),
            buoc(R`Cộng $15$ phút được $135$ phút.`, "Phút lẻ được cộng sau khi đã đổi phần giờ."),
          ],
          R`Hai giờ mười lăm phút bằng $135$ phút.`,
          [{ expr: "2*60+15", expect: "135" }],
        )],
        [
          luyen(R`Đổi $3$ giờ ra phút.`, R`Bằng $180$ phút.`, [{ expr: "3*60", expect: "180" }], "Nhân số giờ với $60$ vì mỗi giờ có sáu mươi phút."),
          luyen(R`Đổi $90$ phút ra giờ và phút.`, R`Bằng $1$ giờ $30$ phút.`, [{ expr: "90-60", expect: "30" }], "Một giờ lấy $60$ phút. Phần còn lại là số phút lẻ."),
          luyen(R`Đổi $2$ phút ra giây.`, R`Bằng $120$ giây.`, [{ expr: "2*60", expect: "120" }], "Mỗi phút có $60$ giây. Hai phút là hai lần sáu mươi giây."),
        ],
      ),
      bai(
        "khoang-gio",
        "Tính khoảng thời gian",
        R`Khoảng thời gian từ lúc bắt đầu đến lúc kết thúc bằng hiệu hai mốc, sau khi đã đổi về cùng một đơn vị.`,
        [vd(
          R`Bắt đầu lúc $8$ giờ và kết thúc lúc $10$ giờ $30$ phút. Khoảng thời gian là bao nhiêu phút?`,
          [
            buoc(R`Đổi $8$ giờ thành $480$ phút và $10$ giờ $30$ phút thành $630$ phút.`, "Cùng đơn vị phút thì mới trừ được."),
            buoc(R`Hiệu bằng $630-480=150$ phút.`, "Một trăm năm mươi phút là $2$ giờ $30$ phút."),
          ],
          R`Khoảng thời gian là $150$ phút.`,
          [{ expr: "(10*60+30)-8*60", expect: "150" }],
        )],
        [
          luyen(R`Từ $7$ giờ đến $9$ giờ là bao nhiêu giờ?`, R`Là $2$ giờ.`, [{ expr: "9-7", expect: "2" }], "Trừ hai mốc giờ khi cả hai đều là giờ đúng."),
          luyen(R`Đổi $150$ phút ra giờ và phút.`, R`Bằng $2$ giờ $30$ phút.`, [{ expr: "150//60", expect: "2" }], "Chia cho $60$ được số giờ. Phần dư $30$ là số phút."),
          luyen(R`Một việc làm từ $14$ giờ đến $14$ giờ $20$ phút. Khoảng thời gian là bao nhiêu phút?`, R`Là $20$ phút.`, [{ expr: "(14*60+20)-(14*60)", expect: "20" }], "Đổi cả hai mốc ra phút rồi trừ. Phần giờ giống nhau nên chỉ còn $20$ phút."),
        ],
      ),
    ]),
    chuong("bieu-do-5", "Biểu đồ hình quạt", [
      bai(
        "quat-5",
        "Biểu đồ hình quạt",
        R`Cả hình tròn là $360^\circ$ và là cả nhóm số liệu. Góc quạt của một phần bằng phần đó nhân với $360^\circ$.`,
        [vd(
          R`Một phần bằng $25\%$ cả nhóm. Quạt đó bao nhiêu độ?`,
          [
            buoc(R`Phần $25\%$ là $\frac{25}{100}=\frac{1}{4}$.`, "Đổi phần trăm thành phân số của cả nhóm."),
            buoc(R`Số đo quạt bằng $\frac{1}{4}\times 360=90$ độ.`, "Nhân phần đó với một vòng."),
          ],
          R`Quạt là $90$ độ.`,
          [{ expr: "Rational(25,100)*360", expect: "90" }],
        )],
        [
          luyen(R`Một nửa nhóm ứng với quạt bao nhiêu độ?`, R`Quạt là $180$ độ.`, [{ expr: "Rational(1,2)*360", expect: "180" }], "Một nửa của $360$ độ là $180$ độ."),
          luyen(R`Quạt $72$ độ ứng với phần nào của cả nhóm?`, R`Ứng với $\frac{1}{5}$ cả nhóm.`, [{ expr: "Rational(72,360)", expect: "Rational(1,5)" }], "Chia số đo quạt cho $360$ độ."),
          luyen(R`Hai quạt $90$ độ và $120$ độ. Phần còn lại của hình tròn là bao nhiêu độ?`, R`Phần còn lại là $150$ độ.`, [{ expr: "360-90-120", expect: "150" }], "Tổng các quạt của một biểu đồ đủ nhóm bằng $360$ độ."),
        ],
        { figure: "circle" },
      ),
      bai(
        "doc-quat",
        "Đọc số liệu trên biểu đồ quạt",
        R`Biết cả nhóm và số đo quạt thì số phần tử của quạt bằng cả nhóm nhân với quạt chia cho $360$.`,
        [vd(
          R`Lớp $40$ bạn, quạt một môn là $90$ độ. Có bao nhiêu bạn chọn môn đó?`,
          [
            buoc(R`Phần của quạt là $90:360=\frac{1}{4}$.`, "Chia số đo quạt cho cả vòng."),
            buoc(R`Số bạn bằng $\frac{1}{4}\times 40=10$.`, "Nhân phần đó với số bạn của cả lớp."),
          ],
          R`Có $10$ bạn chọn môn đó.`,
          [{ expr: "Rational(90,360)*40", expect: "10" }],
        )],
        [
          luyen(R`Nhóm $20$ bạn, quạt $180$ độ. Quạt đó có bao nhiêu bạn?`, R`Có $10$ bạn.`, [{ expr: "Rational(180,360)*20", expect: "10" }], "Một nửa vòng là một nửa nhóm."),
          luyen(R`Nhóm $30$ bạn, quạt $120$ độ. Quạt đó có bao nhiêu bạn?`, R`Có $10$ bạn.`, [{ expr: "Rational(120,360)*30", expect: "10" }], "Phần $\\frac{120}{360}$ bằng $\\frac{1}{3}$. Một phần ba của $30$ là $10$."),
          luyen(R`Quạt $360$ độ của nhóm $15$ bạn có bao nhiêu bạn?`, R`Có $15$ bạn.`, [{ expr: "Rational(360,360)*15", expect: "15" }], "Cả hình tròn là cả nhóm."),
        ],
      ),
    ]),
    chuong("giai-toan-5", "Tìm hai số theo tổng, hiệu và tỉ số", [
      bai(
        "tong-ti",
        "Tìm hai số khi biết tổng và tỉ số",
        R`Vẽ hai số thành các phần bằng nhau theo tỉ số. Lấy tổng chia cho tổng số phần để tìm giá trị một phần, rồi nhân với số phần của mỗi số.`,
        [vd(
          R`Hai số có tổng $40$ và tỉ số $\frac{3}{5}$. Tìm hai số đó.`,
          [
            buoc(R`Số bé gồm $3$ phần, số lớn gồm $5$ phần, tất cả là $8$ phần.`, R`Tỉ số $\frac{3}{5}$ nghĩa là chia số bé thành $3$ phần thì số lớn có $5$ phần như thế.`),
            buoc(R`Một phần là $40:8=5$. Số bé là $5\times 3=15$, số lớn là $5\times 5=25$.`, R`Tổng hai số ứng với cả $8$ phần bằng nhau.`),
          ],
          R`Hai số cần tìm là $15$ và $25$.`,
          [{ expr: "Rational(40,8)*3", expect: "15" }, { expr: "Rational(40,8)*5", expect: "25" }],
        )],
        [
          luyen(R`Hai số có tổng $36$ và tỉ số $\frac{1}{2}$. Số bé bằng bao nhiêu?`, R`Số bé bằng $12$.`, [{ expr: "Rational(36,3)*1", expect: "12" }], R`Tổng số phần là $3$, một phần là $36:3=12$, và số bé gồm $1$ phần.`),
          luyen(R`Hai số có tổng $63$ và tỉ số $\frac{2}{7}$. Số lớn bằng bao nhiêu?`, R`Số lớn bằng $49$.`, [{ expr: "Rational(63,9)*7", expect: "49" }], R`Tổng số phần là $9$, một phần là $7$, số lớn gồm $7$ phần nên bằng $49$.`),
          luyen(R`Lớp có $32$ bạn, số bạn nam bằng $\frac{3}{5}$ số bạn nữ. Lớp có bao nhiêu bạn nữ?`, R`Lớp có $20$ bạn nữ.`, [{ expr: "Rational(32,8)*5", expect: "20" }], R`Nam $3$ phần, nữ $5$ phần, một phần là $32:8=4$, nên nữ có $20$ bạn.`),
        ],
        {
          figure: "segment",
          whyTrue: R`Tỉ số cho biết hai số được ghép từ những phần bằng nhau, số này mấy phần và số kia mấy phần. Tổng hai số chính là giá trị của tất cả các phần đó gộp lại.`,
          pitfalls: R`Lấy tổng chia cho mẫu số của tỉ số. Phải chia cho tổng số phần, tức tử cộng mẫu.`,
        },
      ),
      bai(
        "hieu-ti",
        "Tìm hai số khi biết hiệu và tỉ số",
        R`Vẽ hai số thành các phần bằng nhau theo tỉ số. Lấy hiệu chia cho hiệu số phần để tìm giá trị một phần, rồi nhân với số phần của mỗi số.`,
        [vd(
          R`Hai số có hiệu $24$ và tỉ số $\frac{3}{5}$. Tìm hai số đó.`,
          [
            buoc(R`Số lớn hơn số bé $5-3=2$ phần, và $2$ phần ấy bằng $24$.`, R`Phần chênh lệch giữa hai số ứng với hiệu số phần.`),
            buoc(R`Một phần là $24:2=12$. Số bé là $12\times 3=36$, số lớn là $12\times 5=60$.`, R`Biết một phần thì nhân với số phần của từng số.`),
          ],
          R`Hai số cần tìm là $36$ và $60$.`,
          [{ expr: "Rational(24,2)*3", expect: "36" }, { expr: "Rational(24,2)*5", expect: "60" }],
        )],
        [
          luyen(R`Hai số có hiệu $10$ và tỉ số $\frac{1}{3}$. Số bé bằng bao nhiêu?`, R`Số bé bằng $5$.`, [{ expr: "Rational(10,2)*1", expect: "5" }], R`Hiệu số phần là $2$, một phần là $10:2=5$, số bé gồm $1$ phần.`),
          luyen(R`Hai số có hiệu $18$ và tỉ số $\frac{2}{5}$. Số lớn bằng bao nhiêu?`, R`Số lớn bằng $30$.`, [{ expr: "Rational(18,3)*5", expect: "30" }], R`Hiệu số phần là $3$, một phần là $6$, số lớn gồm $5$ phần nên bằng $30$.`),
          luyen(R`Mẹ hơn con $28$ tuổi, tuổi con bằng $\frac{1}{5}$ tuổi mẹ. Mẹ bao nhiêu tuổi?`, R`Mẹ $35$ tuổi.`, [{ expr: "Rational(28,4)*5", expect: "35" }], R`Hiệu số phần là $4$, một phần là $28:4=7$, tuổi mẹ gồm $5$ phần nên là $35$.`),
        ],
        {
          figure: "segment",
          whyTrue: R`Hai số gồm các phần bằng nhau, nên phần hơn của số lớn cũng là một số nguyên phần. Hiệu hai số chính là giá trị của những phần hơn đó.`,
          pitfalls: R`Chia hiệu cho tổng số phần như bài tổng và tỉ. Bài cho hiệu thì chia cho hiệu số phần.`,
        },
      ),
    ]),
  ],
};
