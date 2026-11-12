import type { GradeBook } from "./types.ts";
import { bai, buoc, chuong, luyen, vd } from "./types.ts";

const R = String.raw;

export const lop04: GradeBook = {
  grade: 4,
  band: "tieu-hoc",
  title: "Số đến lớp triệu, bốn phép tính, phân số, đo lường, góc, đường thẳng và biểu đồ cột.",
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
      bai(
        "quy-dong",
        "Rút gọn và quy đồng mẫu số",
        R`Rút gọn là chia cả tử và mẫu cho cùng một số lớn hơn $1$. Quy đồng mẫu số hai phân số là viết lại chúng với cùng một mẫu, bằng cách nhân tử và mẫu của mỗi phân số với một số thích hợp.`,
        [vd(
          R`Quy đồng mẫu số $\frac{1}{2}$ và $\frac{1}{3}$.`,
          [
            buoc(R`Mẫu chung là $6$, vì $6$ chia hết cho cả $2$ và $3$.`, R`Mẫu chung phải chia hết cho từng mẫu thì mới đổi được.`),
            buoc(R`Ta có $\frac{1}{2}=\frac{3}{6}$ và $\frac{1}{3}=\frac{2}{6}$.`, R`Nhân tử và mẫu với cùng một số thì giá trị phân số không đổi.`),
          ],
          R`Hai phân số sau khi quy đồng là $\frac{3}{6}$ và $\frac{2}{6}$.`,
          [{ expr: "Rational(1,2)*6", expect: "3" }, { expr: "Rational(1,3)*6", expect: "2" }],
        )],
        [
          luyen(R`Rút gọn $\frac{6}{8}$.`, R`Phân số tối giản là $\frac{3}{4}$.`, [{ expr: "Rational(6,8)", expect: "Rational(3,4)" }], R`Chia cả tử và mẫu cho $2$ thì được $\frac{3}{4}$.`),
          luyen(R`Viết $\frac{2}{5}$ thành phân số có mẫu $10$. Tử số mới bằng bao nhiêu?`, R`Tử số mới bằng $4$.`, [{ expr: "Rational(2,5)*10", expect: "4" }], R`Nhân cả tử và mẫu với $2$, vì $5\times 2=10$.`),
          luyen(R`Quy đồng $\frac{3}{4}$ và $\frac{5}{6}$ với mẫu chung $12$. Tử số mới của phân số thứ nhất bằng bao nhiêu?`, R`Tử số mới bằng $9$.`, [{ expr: "Rational(3,4)*12", expect: "9" }], R`Mẫu $4$ nhân $3$ được $12$, nên tử cũng nhân $3$: $3\times 3=9$.`),
        ],
        {
          whyTrue: R`Chia mỗi phần của hình thành các phần nhỏ bằng nhau thì số phần lấy và tổng số phần cùng gấp lên, lượng được lấy không đổi. Rút gọn là làm ngược lại, gộp các phần nhỏ thành phần lớn.`,
          pitfalls: R`Chỉ nhân mẫu mà quên nhân tử. Khi đó phân số mới nhỏ hơn phân số ban đầu.`,
        },
      ),
      bai(
        "cong-tru-phan-so",
        "Cộng, trừ và nhân phân số",
        R`Cộng hoặc trừ hai phân số cùng mẫu thì cộng hoặc trừ hai tử và giữ nguyên mẫu. Khác mẫu thì quy đồng trước. Nhân hai phân số thì lấy tử nhân tử, mẫu nhân mẫu.`,
        [vd(
          R`Tính $\frac{1}{2}+\frac{1}{3}$ và $\frac{2}{3}\times\frac{3}{4}$.`,
          [
            buoc(R`Quy đồng: $\frac{1}{2}+\frac{1}{3}=\frac{3}{6}+\frac{2}{6}=\frac{5}{6}$.`, R`Các phần phải to bằng nhau thì mới cộng số phần được.`),
            buoc(R`Nhân: $\frac{2}{3}\times\frac{3}{4}=\frac{6}{12}=\frac{1}{2}$.`, R`Tử nhân tử, mẫu nhân mẫu, rồi rút gọn kết quả.`),
          ],
          R`Tổng bằng $\frac{5}{6}$ và tích bằng $\frac{1}{2}$.`,
          [{ expr: "Rational(1,2)+Rational(1,3)", expect: "Rational(5,6)" }, { expr: "Rational(2,3)*Rational(3,4)", expect: "Rational(1,2)" }],
        )],
        [
          luyen(R`Tính $\frac{3}{5}-\frac{1}{5}$.`, R`Hiệu bằng $\frac{2}{5}$.`, [{ expr: "Rational(3,5)-Rational(1,5)", expect: "Rational(2,5)" }], R`Cùng mẫu $5$, lấy tử trừ tử: $3-1=2$.`),
          luyen(R`Tính $\frac{1}{4}+\frac{1}{2}$.`, R`Tổng bằng $\frac{3}{4}$.`, [{ expr: "Rational(1,4)+Rational(1,2)", expect: "Rational(3,4)" }], R`Đổi $\frac{1}{2}$ thành $\frac{2}{4}$, rồi cộng tử: $1+2=3$.`),
          luyen(R`Tính $\frac{2}{5}\times\frac{1}{3}$.`, R`Tích bằng $\frac{2}{15}$.`, [{ expr: "Rational(2,5)*Rational(1,3)", expect: "Rational(2,15)" }], R`Tử nhân tử được $2$, mẫu nhân mẫu được $15$.`),
        ],
        {
          whyTrue: R`Phân số cùng mẫu là các phần to bằng nhau, nên cộng chúng giống như cộng số quả táo. Nhân với $\frac{3}{4}$ là lấy ba phần tư của một lượng: mẫu nhân lên vì chia nhỏ thêm, tử nhân lên vì lấy nhiều phần.`,
          pitfalls: R`Cộng tử với tử và mẫu với mẫu. Tổng $\frac{1}{2}+\frac{1}{3}$ là $\frac{5}{6}$, không phải $\frac{2}{5}$.`,
        },
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
    chuong("bon-phep-tinh", "Bốn phép tính với số tự nhiên", [
      bai(
        "nhan-hai-chu-so",
        "Nhân với số có hai chữ số",
        R`Tách số có hai chữ số thành chục và đơn vị, nhân lần lượt rồi cộng hai tích riêng. Tích riêng thứ hai viết lùi sang trái một cột vì đó là số chục.`,
        [vd(
          R`Tính $36\times 23$.`,
          [
            buoc(R`Nhân với hàng đơn vị: $36\times 3=108$.`, R`Số $23$ gồm $2$ chục và $3$ đơn vị, nhân với $3$ đơn vị trước.`),
            buoc(R`Nhân với hàng chục: $36\times 20=720$. Cộng lại: $108+720=828$.`, R`Nhân với $2$ chục cho kết quả là số chục, nên tích riêng này tận cùng bằng $0$.`),
          ],
          R`Tích bằng $828$.`,
          [{ expr: "36*23", expect: "828" }],
        )],
        [
          luyen(R`Tính $12\times 11$.`, R`Tích bằng $132$.`, [{ expr: "12*11", expect: "132" }], R`Ta có $12\times 1=12$ và $12\times 10=120$, cộng lại được $132$.`),
          luyen(R`Tính $45\times 20$.`, R`Tích bằng $900$.`, [{ expr: "45*20", expect: "900" }], R`Nhân $45$ với $2$ được $90$, rồi thêm một chữ số $0$ vì nhân với $2$ chục.`),
          luyen(R`Mỗi thùng có $24$ chai nước. Hỏi $15$ thùng có bao nhiêu chai?`, R`Có $360$ chai.`, [{ expr: "24*15", expect: "360" }], R`Ta có $24\times 5=120$ và $24\times 10=240$, tổng là $360$.`),
        ],
        {
          whyTrue: R`Nhân với $23$ là lấy $23$ lần, gồm $3$ lần và $20$ lần. Tính riêng từng phần rồi cộng lại, đó là tính chất phân phối của phép nhân đối với phép cộng.`,
          pitfalls: R`Viết tích riêng thứ hai thẳng cột với tích riêng thứ nhất. Tích riêng thứ hai là số chục nên phải lùi sang trái một cột.`,
        },
      ),
      bai(
        "chia-hai-chu-so",
        "Chia cho số có hai chữ số",
        R`Chia lần lượt từ trái sang phải. Mỗi lần ước lượng một chữ số của thương, nhân ngược lại rồi trừ. Số dư mỗi lần phải nhỏ hơn số chia.`,
        [vd(
          R`Tính $672:21$.`,
          [
            buoc(R`Lấy $67$ chia $21$ được $3$, vì $21\times 3=63$. Dư $67-63=4$.`, R`Ước lượng bằng $60:20=3$, rồi nhân ngược lại để kiểm tra.`),
            buoc(R`Hạ $2$ được $42$. Lấy $42$ chia $21$ được $2$, dư $0$. Thương là $32$.`, R`Mỗi lần hạ một chữ số thì viết thêm một chữ số vào thương.`),
          ],
          R`Thương bằng $32$.`,
          [{ expr: "672/21", expect: "32" }],
        )],
        [
          luyen(R`Tính $240:12$.`, R`Thương bằng $20$.`, [{ expr: "240/12", expect: "20" }], R`Lấy $24$ chia $12$ được $2$, hạ $0$ chia $12$ được $0$, thương là $20$.`),
          luyen(R`Tính $156:13$.`, R`Thương bằng $12$.`, [{ expr: "156/13", expect: "12" }], R`Ta có $13\times 12=156$, nên phép chia hết và thương là $12$.`),
          luyen(R`Xếp $375$ quyển sách vào các thùng, mỗi thùng $25$ quyển. Cần bao nhiêu thùng?`, R`Cần $15$ thùng.`, [{ expr: "375/25", expect: "15" }], R`Ta có $25\times 15=375$, nên xếp vừa đủ $15$ thùng.`),
        ],
        {
          whyTrue: R`Phép chia hỏi số chia được lấy bao nhiêu lần thì vừa bằng số bị chia. Chia từng phần từ hàng cao xuống hàng thấp là trả lời câu hỏi đó theo từng chục, rồi từng đơn vị.`,
          pitfalls: R`Quên viết chữ số $0$ vào thương khi phần vừa hạ nhỏ hơn số chia. Với $240:12$, thương là $20$ chứ không phải $2$.`,
        },
      ),
      bai(
        "tinh-chat",
        "Tính chất giao hoán, kết hợp và phân phối",
        R`Đổi chỗ các số hạng thì tổng không đổi, đổi chỗ các thừa số thì tích không đổi. Có thể nhóm các số theo cách thuận tiện. Nhân một số với một tổng thì nhân số đó với từng số hạng rồi cộng lại.`,
        [vd(
          R`Tính nhanh $25\times 7\times 4$.`,
          [
            buoc(R`Đổi chỗ và nhóm lại: $(25\times 4)\times 7$.`, R`Phép nhân có tính chất giao hoán và kết hợp, nên được phép đổi chỗ và nhóm lại.`),
            buoc(R`Ta có $100\times 7=700$.`, R`Nhóm $25$ với $4$ để được số tròn trăm, phép nhân còn lại rất dễ.`),
          ],
          R`Tích bằng $700$.`,
          [{ expr: "25*7*4", expect: "700" }],
        )],
        [
          luyen(R`Tính nhanh $36+47+64$.`, R`Tổng bằng $147$.`, [{ expr: "36+47+64", expect: "147" }], R`Nhóm $36$ với $64$ được $100$, rồi cộng $47$ thành $147$.`),
          luyen(R`Tính $8\times(10+5)$ theo hai cách.`, R`Kết quả bằng $120$.`, [{ expr: "8*(10+5)", expect: "120" }, { expr: "8*10+8*5", expect: "120" }], R`Cách một: $8\times 15=120$. Cách hai: $8\times 10+8\times 5=80+40=120$.`),
          luyen(R`Tính nhanh $17\times 6+17\times 4$.`, R`Kết quả bằng $170$.`, [{ expr: "17*6+17*4", expect: "170" }], R`Đặt $17$ làm thừa số chung: $17\times(6+4)=17\times 10=170$.`),
        ],
        {
          whyTrue: R`Xếp các chấm tròn thành $3$ hàng, mỗi hàng $5$ chấm. Đếm theo hàng được $3\times 5$, đếm theo cột được $5\times 3$, và số chấm vẫn như cũ. Tách mỗi hàng thành hai đoạn thì thấy tính chất phân phối.`,
          pitfalls: R`Dùng tính chất giao hoán cho phép trừ và phép chia. Hiệu $8-3$ khác $3-8$, thương $8:2$ khác $2:8$.`,
        },
      ),
      bai(
        "tong-hieu",
        "Tìm hai số khi biết tổng và hiệu",
        R`Biết tổng và hiệu của hai số thì số lớn bằng tổng cộng hiệu, rồi chia $2$. Số bé bằng tổng trừ hiệu, rồi chia $2$.`,
        [vd(
          R`Hai số có tổng $70$ và hiệu $10$. Tìm hai số đó.`,
          [
            buoc(R`Số lớn là $(70+10):2=40$.`, R`Thêm phần hiệu vào tổng thì được hai lần số lớn.`),
            buoc(R`Số bé là $70-40=30$.`, R`Tổng hai số là $70$, bớt số lớn đi thì còn số bé.`),
          ],
          R`Hai số cần tìm là $40$ và $30$.`,
          [{ expr: "(70+10)/2", expect: "40" }, { expr: "(70-10)/2", expect: "30" }],
        )],
        [
          luyen(R`Hai số có tổng $100$ và hiệu $20$. Số lớn bằng bao nhiêu?`, R`Số lớn bằng $60$.`, [{ expr: "(100+20)/2", expect: "60" }], R`Lấy tổng cộng hiệu rồi chia đôi: $120:2=60$.`),
          luyen(R`Hai số có tổng $50$ và hiệu $6$. Số bé bằng bao nhiêu?`, R`Số bé bằng $22$.`, [{ expr: "(50-6)/2", expect: "22" }], R`Lấy tổng trừ hiệu rồi chia đôi: $44:2=22$.`),
          luyen(R`Lớp có $35$ bạn, số bạn nữ nhiều hơn số bạn nam $3$ bạn. Lớp có bao nhiêu bạn nữ?`, R`Lớp có $19$ bạn nữ.`, [{ expr: "(35+3)/2", expect: "19" }], R`Số bạn nữ là số lớn: $(35+3):2=19$.`),
        ],
        {
          figure: "segment",
          whyTrue: R`Vẽ hai đoạn thẳng, đoạn dài hơn đoạn ngắn đúng bằng hiệu. Cắt bỏ phần hơn thì còn hai đoạn bằng số bé, nên tổng trừ hiệu bằng hai lần số bé.`,
          pitfalls: R`Chia đôi tổng rồi coi đó là một trong hai số. Chia đôi tổng chỉ cho số nằm chính giữa hai số cần tìm.`,
        },
      ),
    ]),
    chuong("do-luong-4", "Đo khối lượng, thời gian và diện tích", [
      bai(
        "yen-ta-tan",
        "Yến, tạ và tấn",
        R`Một yến bằng $10$ kilôgam. Một tạ bằng $10$ yến, tức $100$ kilôgam. Một tấn bằng $10$ tạ, tức $1000$ kilôgam.`,
        [vd(
          R`Đổi $3$ tấn $5$ tạ ra kilôgam.`,
          [
            buoc(R`Ta có $3$ tấn bằng $3000$ kilôgam và $5$ tạ bằng $500$ kilôgam.`, R`Mỗi tấn là $1000$ kilôgam, mỗi tạ là $100$ kilôgam.`),
            buoc(R`Cộng lại: $3000+500=3500$ kilôgam.`, R`Hai phần đã cùng đơn vị kilôgam nên cộng được.`),
          ],
          R`Kết quả là $3500$ kilôgam.`,
          [{ expr: "3*1000+5*100", expect: "3500" }],
        )],
        [
          luyen(R`Đổi $4$ tạ ra kilôgam.`, R`Bằng $400$ kilôgam.`, [{ expr: "4*100", expect: "400" }], R`Mỗi tạ là $100$ kilôgam, bốn tạ là $400$ kilôgam.`),
          luyen(R`Đổi $2000$ kilôgam ra tấn.`, R`Bằng $2$ tấn.`, [{ expr: "2000/1000", expect: "2" }], R`Cứ $1000$ kilôgam là một tấn, nên $2000$ kilôgam là $2$ tấn.`),
          luyen(R`Một xe chở $2$ tấn gạo, xe khác chở $15$ tạ gạo. Cả hai xe chở bao nhiêu tạ gạo?`, R`Cả hai xe chở $35$ tạ gạo.`, [{ expr: "2*10+15", expect: "35" }], R`Đổi $2$ tấn thành $20$ tạ, rồi cộng $15$ tạ được $35$ tạ.`),
        ],
        {
          whyTrue: R`Các đơn vị đo khối lượng xếp theo bậc mười, giống các hàng của số tự nhiên. Mỗi đơn vị gấp $10$ lần đơn vị bé hơn liền sau nó.`,
          pitfalls: R`Nhầm một tạ là $1000$ kilôgam. Tạ là $100$ kilôgam, tấn mới là $1000$ kilôgam.`,
        },
      ),
      bai(
        "giay-the-ki",
        "Giây và thế kỉ",
        R`Một phút có $60$ giây. Một thế kỉ có $100$ năm. Thế kỉ thứ nhất gồm các năm từ $1$ đến $100$, thế kỉ thứ hai mươi mốt gồm các năm từ $2001$ đến $2100$.`,
        [vd(
          R`Đổi $3$ phút $20$ giây ra giây.`,
          [
            buoc(R`Ta có $3$ phút bằng $3\times 60=180$ giây.`, R`Mỗi phút có $60$ giây, ba phút là ba lần $60$.`),
            buoc(R`Cộng thêm $20$ giây: $180+20=200$ giây.`, R`Phần giây lẻ được cộng vào sau khi đã đổi số phút.`),
          ],
          R`Kết quả là $200$ giây.`,
          [{ expr: "3*60+20", expect: "200" }],
        )],
        [
          luyen(R`Hai thế kỉ có bao nhiêu năm?`, R`Có $200$ năm.`, [{ expr: "2*100", expect: "200" }], R`Mỗi thế kỉ có $100$ năm, hai thế kỉ là $200$ năm.`),
          luyen(R`Đổi $120$ giây ra phút.`, R`Bằng $2$ phút.`, [{ expr: "120/60", expect: "2" }], R`Cứ $60$ giây là một phút, nên $120$ giây là $2$ phút.`),
          luyen(R`Năm $1945$ thuộc thế kỉ thứ mấy?`, R`Năm $1945$ thuộc thế kỉ thứ $20$.`, [{ expr: "floor(Rational(1945-1,100))+1", expect: "20" }], R`Các năm từ $1901$ đến $2000$ thuộc thế kỉ thứ $20$, và $1945$ nằm trong khoảng đó.`),
        ],
        {
          whyTrue: R`Thế kỉ thứ nhất bắt đầu từ năm $1$, không có năm $0$. Vì vậy mỗi thế kỉ kết thúc ở một năm tròn trăm, và năm tròn trăm thuộc về thế kỉ cũ.`,
          pitfalls: R`Lấy hai chữ số đầu của năm làm số thế kỉ. Năm $1945$ thuộc thế kỉ thứ $20$, không phải thế kỉ thứ $19$.`,
        },
      ),
      bai(
        "dien-tich-4",
        "Đềximét vuông và mét vuông",
        R`Đềximét vuông là diện tích hình vuông cạnh $1$ đềximét. Một đềximét vuông bằng $100$ xentimét vuông. Một mét vuông bằng $100$ đềximét vuông.`,
        [vd(
          R`Một tấm bìa hình chữ nhật dài $3$ đềximét và rộng $2$ đềximét. Diện tích tấm bìa bằng bao nhiêu xentimét vuông?`,
          [
            buoc(R`Diện tích là $3\times 2=6$ đềximét vuông.`, R`Diện tích hình chữ nhật bằng chiều dài nhân chiều rộng cùng đơn vị.`),
            buoc(R`Đổi đơn vị: $6\times 100=600$ xentimét vuông.`, R`Mỗi đềximét vuông chứa $10\times 10=100$ ô vuông cạnh một xentimét.`),
          ],
          R`Diện tích tấm bìa bằng $600$ xentimét vuông.`,
          [{ expr: "3*2*100", expect: "600" }],
        )],
        [
          luyen(R`Đổi $5$ mét vuông ra đềximét vuông.`, R`Bằng $500$ đềximét vuông.`, [{ expr: "5*100", expect: "500" }], R`Mỗi mét vuông bằng $100$ đềximét vuông, năm mét vuông là $500$.`),
          luyen(R`Đổi $300$ xentimét vuông ra đềximét vuông.`, R`Bằng $3$ đềximét vuông.`, [{ expr: "300/100", expect: "3" }], R`Cứ $100$ xentimét vuông là một đềximét vuông.`),
          luyen(R`Căn phòng hình chữ nhật dài $5$ mét và rộng $4$ mét. Diện tích căn phòng bằng bao nhiêu mét vuông?`, R`Diện tích bằng $20$ mét vuông.`, [{ expr: "5*4", expect: "20" }], R`Lấy chiều dài nhân chiều rộng: $5\times 4=20$ mét vuông.`),
        ],
        {
          figure: "rect",
          whyTrue: R`Hình vuông cạnh $1$ đềximét có cạnh dài $10$ xentimét, nên chia được thành $10$ hàng, mỗi hàng $10$ ô vuông cạnh $1$ xentimét. Vì thế hai đơn vị diện tích liền nhau gấp nhau $100$ lần, không phải $10$ lần.`,
          pitfalls: R`Đổi đơn vị diện tích theo bậc $10$ như đơn vị độ dài. Một mét bằng $10$ đềximét, nhưng một mét vuông bằng $100$ đềximét vuông.`,
        },
      ),
    ]),
  ],
};
