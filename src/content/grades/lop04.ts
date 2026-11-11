import type { GradeBook } from "./types.ts";
import { bai, buoc, chuong, luyen, vd } from "./types.ts";

const R = String.raw;

export const lop04: GradeBook = {
  grade: 4,
  band: "tieu-hoc",
  title: "Số đến lớp triệu, phân số, góc, đường thẳng và biểu đồ cột.",
  chapters: [
    chuong("lop-trieu", "Số đến lớp triệu", [
      bai(
        "doc-trieu",
        "Đọc số có lớp triệu",
        R`Lớp triệu gồm hàng trăm triệu, chục triệu và triệu. Số $2\,345\,678$ có $2$ ở lớp triệu.`,
        [vd(
          R`Viết số gồm $2$ triệu, $345$ nghìn và $678$ đơn vị.`,
          [
            buoc(R`Hai triệu là $2\,000\,000$, ba trăm bốn mươi lăm nghìn là $345\,000$.`, "Lớp triệu đứng trước lớp nghìn. Mỗi lớp có ba hàng."),
            buoc(R`Cộng $2\,000\,000+345\,000+678=2\,345\,678$.`, "Ghép lớp triệu, lớp nghìn và lớp đơn vị."),
          ],
          R`Số cần viết là $2\,345\,678$.`,
          [{ expr: "2*1000000+345*1000+678", expect: "2345678" }],
        )],
        [
          luyen(R`Bốn triệu bằng bao nhiêu?`, R`Bốn triệu bằng $4\,000\,000$.`, [{ expr: "4*1000000", expect: "4000000" }], "Mỗi triệu là $1\\,000\\,000$. Bốn lần số đó nằm trong lớp triệu."),
          luyen(R`Số nào lớn hơn, $3\,000\,000$ hay $999\,999$?`, R`Số $3\,000\,000$ lớn hơn.`, [{ expr: "3000000-999999", expect: "2000001" }], "Số có lớp triệu lớn hơn số chỉ tới lớp nghìn."),
          luyen(R`Tính $1\,000\,000+20\,000$.`, R`Tổng bằng $1\,020\,000$.`, [{ expr: "1000000+20000", expect: "1020000" }], "Một triệu thêm hai mươi nghìn. Hàng triệu vẫn là $1$."),
        ],
      ),
      bai(
        "so-sanh-trieu",
        "So sánh số trong phạm vi lớp triệu",
        R`So sánh từ lớp triệu sang lớp nghìn, rồi đến lớp đơn vị. Lớp đầu tiên khác nhau quyết định số nào lớn hơn.`,
        [vd(
          R`So sánh $2\,450\,000$ và $2\,399\,000$.`,
          [
            buoc(R`Cả hai số có $2$ triệu.`, "Lớp triệu bằng nhau thì xét tiếp lớp nghìn."),
            buoc(R`Lớp nghìn của số thứ nhất là $450$, của số thứ hai là $399$, nên số thứ nhất lớn hơn.`, "Hàng trăm nghìn $4$ lớn hơn hàng trăm nghìn $3$."),
          ],
          R`Số $2\,450\,000$ lớn hơn số $2\,399\,000$.`,
          [{ expr: "2450000-2399000", expect: "51000" }],
        )],
        [
          luyen(R`Số nào lớn hơn, $5\,000\,000$ hay $4\,999\,999$?`, R`Số $5\,000\,000$ lớn hơn.`, [{ expr: "5000000-4999999", expect: "1" }], "Năm triệu đứng ngay sau $4\\,999\\,999$, nên lớn hơn đúng $1$."),
          luyen(R`So sánh $1\,200\,000$ và $1\,200\,500$.`, R`Số $1\,200\,500$ lớn hơn.`, [{ expr: "1200500-1200000", expect: "500" }], "Hai lớp triệu và lớp nghìn giống nhau. Lớp đơn vị $500$ lớn hơn $0$."),
          luyen(R`Sắp $30\,000$ và $3\,000\,000$. Số nhỏ hơn là số nào?`, R`Số nhỏ hơn là $30\,000$.`, [{ expr: "3000000/30000", expect: "100" }], "Ba mươi nghìn thuộc lớp nghìn. Ba triệu thuộc lớp triệu và lớn hơn đúng một trăm lần."),
        ],
      ),
    ]),
    chuong("phan-so", "Phân số", [
      bai(
        "phan-bang",
        "Phân số bằng nhau",
        R`Hai phân số bằng nhau khi nhân tử và mẫu của phân số này với cùng một số khác $0$ thì được phân số kia.`,
        [vd(
          R`Chứng tỏ $\frac{1}{2}=\frac{2}{4}$.`,
          [
            buoc(R`Nhân tử và mẫu của $\frac{1}{2}$ với $2$.`, "Nhân tử và mẫu với cùng một số khác $0$ thì giá trị phân số không đổi."),
            buoc(R`Được $\frac{2}{4}$, nên hai phân số bằng nhau.`, "Hiệu hai phân số bằng $0$ khi chúng biểu diễn cùng một số."),
          ],
          R`Hai phân số bằng nhau.`,
          [{ expr: "Rational(1,2)-Rational(2,4)", expect: "0" }],
        )],
        [
          luyen(R`Phân số $\frac{1}{3}$ có bằng $\frac{2}{6}$ không?`, R`Có, hai phân số bằng nhau.`, [{ expr: "Rational(1,3)-Rational(2,6)", expect: "0" }], "Nhân tử và mẫu của phân số thứ nhất với $2$ được phân số thứ hai."),
          luyen(R`Rút gọn $\frac{4}{10}$.`, R`Phân số tối giản là $\frac{2}{5}$.`, [{ expr: "Rational(4,10)", expect: "Rational(2,5)" }], "Chia tử và mẫu cho ước chung $2$. Giá trị phân số không đổi."),
          luyen(R`Hai phân số $\frac{3}{5}$ và $\frac{6}{10}$ có bằng nhau không?`, R`Có.`, [{ expr: "Rational(3,5)-Rational(6,10)", expect: "0" }], "Nhân tử và mẫu của $\\frac{3}{5}$ với $2$ được $\\frac{6}{10}$."),
        ],
      ),
      bai(
        "so-sanh-phan-4",
        "So sánh và chia phân số",
        R`Hai phân số dương cùng mẫu thì phân số có tử lớn hơn là phân số lớn hơn. Chia cho một phân số khác $0$ là nhân với phân số đảo.`,
        [vd(
          R`So sánh $\frac{3}{7}$ với $\frac{5}{7}$, rồi tính $\frac{3}{4}:\frac{1}{2}$.`,
          [
            buoc(R`Cùng mẫu $7$ và $3<5$, nên $\frac{3}{7}<\frac{5}{7}$.`, "Mẫu dương và bằng nhau thì chỉ so sánh tử."),
            buoc(R`Phép chia bằng $\frac{3}{4}\times\frac{2}{1}=\frac{3}{2}$.`, "Phân số đảo của $\\frac{1}{2}$ là $\\frac{2}{1}$. Nhân tử với tử và mẫu với mẫu."),
          ],
          R`Phân số $\frac{3}{7}$ bé hơn $\frac{5}{7}$, và thương bằng $\frac{3}{2}$.`,
          [{ expr: "Rational(5,7)-Rational(3,7)", expect: "Rational(2,7)" }, { expr: "Rational(3,4)/Rational(1,2)", expect: "Rational(3,2)" }],
        )],
        [
          luyen(R`So sánh $\frac{1}{2}$ và $\frac{1}{3}$.`, R`Phân số $\frac{1}{2}$ lớn hơn.`, [{ expr: "Rational(1,2)-Rational(1,3)", expect: "Rational(1,6)" }], "Quy đồng mẫu $6$ được $\\frac{3}{6}$ và $\\frac{2}{6}$. Tử lớn hơn thì phân số lớn hơn."),
          luyen(R`Tính $\frac{2}{3}:\frac{4}{5}$.`, R`Thương bằng $\frac{5}{6}$.`, [{ expr: "Rational(2,3)/Rational(4,5)", expect: "Rational(5,6)" }], "Nhân $\\frac{2}{3}$ với phân số đảo $\\frac{5}{4}$, rồi rút gọn."),
          luyen(R`Tính $\frac{2}{8}+\frac{1}{8}$.`, R`Tổng bằng $\frac{3}{8}$.`, [{ expr: "Rational(2,8)+Rational(1,8)", expect: "Rational(3,8)" }], "Cùng mẫu thì cộng tử và giữ mẫu. Đây là phép cộng, không phải phép nhân."),
        ],
      ),
    ]),
    chuong("goc-duong", "Góc và hai đường thẳng", [
      bai(
        "goc-4",
        "Góc nhọn, góc tù, góc bẹt và đo góc",
        R`Góc nhọn nhỏ hơn $90^\circ$. Góc vuông bằng $90^\circ$. Góc tù lớn hơn $90^\circ$ và nhỏ hơn $180^\circ$. Góc bẹt bằng $180^\circ$. Đơn vị đo góc là độ.`,
        [vd(
          R`Góc $40^\circ$ và góc $120^\circ$ là góc gì?`,
          [
            buoc(R`Góc $40^\circ$ nhỏ hơn $90^\circ$, nên là góc nhọn.`, "So sánh số đo với góc vuông."),
            buoc(R`Góc $120^\circ$ lớn hơn $90^\circ$ và nhỏ hơn $180^\circ$, nên là góc tù.`, "Góc chưa tới góc bẹt thì chưa thành một góc bẹt."),
          ],
          R`Góc $40^\circ$ là góc nhọn và góc $120^\circ$ là góc tù.`,
          [{ expr: "90-40", expect: "50" }, { expr: "120-90", expect: "30" }],
        )],
        [
          luyen(R`Góc bẹt bằng bao nhiêu độ?`, R`Góc bẹt bằng $180^\circ$.`, [{ expr: "90+90", expect: "180" }], "Hai góc vuông kề nhau trên một đường thẳng tạo thành góc bẹt."),
          luyen(R`Góc $180^\circ$ là góc gì?`, R`Đó là góc bẹt.`, [{ expr: "180-90", expect: "90" }], "Số đo $180$ lớn hơn góc vuông đúng $90$ độ và đúng bằng góc bẹt."),
          luyen(R`Dùng thước đo góc, một góc vuông là bao nhiêu độ?`, R`Góc vuông là $90^\circ$.`, [{ expr: "180/2", expect: "90" }], "Góc vuông là nửa góc bẹt. Thước đo góc ghi vạch $90$ tại góc này."),
        ],
        { figure: "angle" },
      ),
      bai(
        "vuong-song",
        "Hai đường thẳng vuông góc và song song",
        R`Hai đường thẳng vuông góc cắt nhau tạo góc $90^\circ$. Hai đường thẳng song song không cắt nhau. Hình bình hành có hai cặp cạnh đối song song và bằng nhau. Bài này tính chu vi từ các cạnh đối, không tính diện tích.`,
        [vd(
          R`Hình bình hành có hai cạnh kề dài $6$ xentimét và $4$ xentimét. Chu vi bằng bao nhiêu?`,
          [
            buoc(R`Cạnh đối của cạnh $6$ cũng dài $6$, cạnh đối của cạnh $4$ cũng dài $4$.`, "Hình bình hành có các cặp cạnh đối bằng nhau và song song."),
            buoc(R`Chu vi bằng $(6+4)\times 2=20$ xentimét.`, "Đi một vòng qua hai cặp cạnh. Không dùng công thức diện tích."),
          ],
          R`Chu vi bằng $20$ xentimét.`,
          [{ expr: "(6+4)*2", expect: "20" }],
        )],
        [
          luyen(R`Hai đường thẳng vuông góc tạo góc bao nhiêu độ?`, R`Góc đó bằng $90^\circ$.`, [{ expr: "180/2", expect: "90" }], "Góc vuông là nửa góc bẹt. Êke dùng để vẽ góc này."),
          luyen(R`Hình bình hành cạnh $5$ và $3$ có chu vi bằng bao nhiêu?`, R`Chu vi bằng $16$.`, [{ expr: "(5+3)*2", expect: "16" }], "Hai cặp cạnh đối bằng nhau. Chu vi là hai lần tổng hai cạnh kề."),
          luyen(R`Một đường thẳng vuông góc với cả hai đường song song. Tổng hai góc vuông đó bằng bao nhiêu độ?`, R`Tổng bằng $180^\circ$, vì mỗi góc là $90^\circ$.`, [{ expr: "90+90", expect: "180" }], "Đường vuông góc với một trong hai đường song song thì vuông góc với đường còn lại. Hai góc vuông cộng thành góc bẹt."),
        ],
      ),
    ]),
    chuong("thong-ke-4", "Trung bình cộng và biểu đồ cột", [
      bai(
        "trung-binh-4",
        "Trung bình cộng",
        R`Trung bình cộng của vài số là tổng các số đó chia cho số các số. Mỗi số được cộng một lần.`,
        [vd(
          R`Điểm bốn bài là $6, 7, 7, 8$. Trung bình cộng bằng bao nhiêu?`,
          [
            buoc(R`Tổng bằng $6+7+7+8=28$.`, "Hai bài điểm $7$ đều được cộng."),
            buoc(R`Trung bình bằng $28:4=7$.`, "Chia tổng cho bốn bài, không chia cho số điểm khác nhau."),
          ],
          R`Trung bình cộng bằng $7$.`,
          [{ expr: "Rational(6+7+7+8,4)", expect: "7" }],
        )],
        [
          luyen(R`Trung bình cộng của $4, 6, 8$ bằng bao nhiêu?`, R`Trung bình bằng $6$.`, [{ expr: "Rational(4+6+8,3)", expect: "6" }], "Tổng ba số là $18$. Chia cho ba số được $6$."),
          luyen(R`Ba số có tổng $15$. Trung bình cộng bằng bao nhiêu?`, R`Trung bình bằng $5$.`, [{ expr: "Rational(15,3)", expect: "5" }], "Chia tổng cho số các số. Ở đây có đúng ba số."),
          luyen(R`Trung bình cộng của $2$ và $8$ bằng bao nhiêu?`, R`Trung bình bằng $5$.`, [{ expr: "Rational(2+8,2)", expect: "5" }], "Tổng hai số là $10$. Chia cho $2$ được $5$."),
        ],
      ),
      bai(
        "bieu-do-cot-4",
        "Biểu đồ cột",
        R`Trên biểu đồ cột, chiều cao mỗi cột là số liệu của nhóm đó. Cột cao nhất là nhóm có số liệu lớn nhất.`,
        [vd(
          R`Ba cột cao $2$, $5$ và $3$. Cột nào cao nhất, và tổng ba cột bằng bao nhiêu?`,
          [
            buoc(R`Cột cao nhất có độ cao $5$.`, "So sánh ba số liệu đọc trên biểu đồ."),
            buoc(R`Tổng bằng $2+5+3=10$.`, "Cộng đủ ba cột khi cần cả nhóm số liệu."),
          ],
          R`Cột cao nhất là cột $5$ và tổng bằng $10$.`,
          [{ expr: "Max(2,5,3)", expect: "5" }, { expr: "2+5+3", expect: "10" }],
        )],
        [
          luyen(R`Biểu đồ có các cột $4, 4, 1$. Có một cột cao nhất duy nhất không?`, R`Không. Hai cột cùng cao $4$.`, [{ expr: "Max(4,4,1)", expect: "4" }], "Giá trị lớn nhất xuất hiện hai lần, nên không có một cột cao nhất duy nhất."),
          luyen(R`Cột $8$ cao hơn cột $3$ bao nhiêu đơn vị?`, R`Cao hơn $5$ đơn vị.`, [{ expr: "8-3", expect: "5" }], "Hiệu hai độ cao là phần cột này nhô hơn cột kia."),
          luyen(R`Ba cột $1, 2, 3$ có tổng bằng bao nhiêu?`, R`Tổng bằng $6$.`, [{ expr: "1+2+3", expect: "6" }], "Cộng các số đọc được trên biểu đồ cột."),
        ],
        { figure: "bar" },
      ),
    ]),
  ],
};
