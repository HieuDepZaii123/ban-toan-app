import type { GradeBook } from "./types.ts";
import { bai, buoc, chuong, luyen, vd } from "./types.ts";

const R = String.raw;

export const lop08: GradeBook = {
  grade: 8,
  band: "thcs",
  title: "Hằng đẳng thức, phân thức, hàm số bậc nhất, định lí Thalès, Pythagore, hình chóp đều và xác suất.",
  chapters: [
    chuong("dang-thuc", "Hằng đẳng thức, phân tích đa thức và phân thức", [
      bai(
        "binh-phuong-tong",
        "Bình phương của tổng và của hiệu",
        R`Với mọi số $a, b$, $(a+b)^2=a^2+2ab+b^2$ và $(a-b)^2=a^2-2ab+b^2$. Hiệu hai bình phương là $a^2-b^2=(a-b)(a+b)$.`,
        [vd(
          R`Tính $(10+3)^2$ và $(10-3)^2$.`,
          [
            buoc(R`Ta có $(10+3)^2=100+60+9=169$.`, "Ba số hạng là bình phương số thứ nhất, hai lần tích, và bình phương số thứ hai."),
            buoc(R`Ta có $(10-3)^2=100-60+9=49$.`, "Bình phương của hiệu đổi dấu số hạng $2ab$. Kết quả trùng $7^2$."),
          ],
          R`Hai giá trị lần lượt bằng $169$ và $49$.`,
          [{ expr: "(10+3)**2", expect: "169" }, { expr: "(10-3)**2", expect: "49" }],
        )],
        [
          luyen(R`Tính $(8-3)^2$.`, R`Giá trị bằng $25$.`, [{ expr: "(8-3)**2", expect: "25" }], "Khai triển $64-48+9$. Tổng này bằng bình phương của $5$."),
          luyen(R`Tính $17^2-3^2$ bằng $(17-3)(17+3)$.`, R`Hiệu bằng $280$.`, [{ expr: "(17-3)*(17+3)", expect: "280" }], "Hiệu hai bình phương bằng tích của hiệu và tổng. Tích $14$ với $20$ bằng $280$."),
          luyen(R`Tính $(a-b)^2$ khi $a=6$ và $b=1$.`, R`Giá trị bằng $25$.`, [{ expr: "6**2-2*6*1+1**2", expect: "25" }], "Số hạng giữa mang dấu trừ. Phép $36-12+1$ bằng $25$."),
        ],
      ),
      bai(
        "hieu-binh",
        "Lập phương và hiệu, tổng hai lập phương",
        R`Hằng đẳng thức $(a+b)^3=a^3+3a^2b+3ab^2+b^3$ và $(a-b)^3=a^3-3a^2b+3ab^2-b^3$. Ngoài ra $a^3+b^3=(a+b)(a^2-ab+b^2)$ và $a^3-b^3=(a-b)(a^2+ab+b^2)$.`,
        [vd(
          R`Tính $(2+1)^3$ và $5^3-2^3$.`,
          [
            buoc(R`Ta có $(2+1)^3=8+3\cdot 4\cdot 1+3\cdot 2\cdot 1+1=27$.`, "Bốn số hạng là lập phương, ba lần bình phương thứ nhất nhân số thứ hai, ba lần số thứ nhất nhân bình phương thứ hai, và lập phương số thứ hai."),
            buoc(R`Ta có $5^3-2^3=(5-2)(25+10+4)=117$.`, "Hiệu hai lập phương tách thành hiệu nhân với tổng bình phương và tích."),
          ],
          R`Lập phương của tổng bằng $27$ và hiệu hai lập phương bằng $117$.`,
          [{ expr: "(2+1)**3", expect: "27" }, { expr: "(5-2)*(5**2+5*2+2**2)", expect: "117" }],
        )],
        [
          luyen(R`Tính $(4-1)^3$.`, R`Giá trị bằng $27$.`, [{ expr: "(4-1)**3", expect: "27" }], "Bình phương của hiệu đổi dấu các số hạng bậc lẻ. Kết quả trùng $3^3$."),
          luyen(R`Tính $3^3+1^3$ bằng $(3+1)(9-3+1)$.`, R`Tổng hai lập phương bằng $28$.`, [{ expr: "(3+1)*(3**2-3*1+1**2)", expect: "28" }], "Tổng hai lập phương bằng tổng nhân với hiệu của hai bình phương và tích."),
          luyen(R`Tính $6^3-3^3$.`, R`Hiệu bằng $189$.`, [{ expr: "6**3-3**3", expect: "189" }], "Có thể tính $216-27$, hoặc $(6-3)(36+18+9)$. Cả hai cách cùng ra $189$."),
        ],
      ),
      bai(
        "phan-tich",
        "Phân tích đa thức thành nhân tử",
        R`Phân tích thành nhân tử là viết đa thức thành tích các đa thức bậc nhỏ hơn. Đặt thừa số chung ra ngoài ngoặc, hoặc dùng hằng đẳng thức, rồi có thể tách tiếp.`,
        [vd(
          R`Phân tích $x^2-5x+6$ và $2x^2+4x$.`,
          [
            buoc(R`Tam thức $x^2-5x+6$ bằng $(x-2)(x-3)$.`, "Hai số $-2$ và $-3$ có tổng $-5$ và tích $6$. Đây là cách tách thành hai nhân tử bậc nhất."),
            buoc(R`Đa thức $2x^2+4x$ bằng $2x(x+2)$.`, "Thừa số chung của hai số hạng là $2x$. Trong ngoặc còn $x+2$."),
          ],
          R`Hai phân tích là $(x-2)(x-3)$ và $2x(x+2)$.`,
          [
            { expr: "factor(x**2-5*x+6)", expect: "(x-2)*(x-3)" },
            { expr: "factor(2*x**2+4*x)", expect: "2*x*(x+2)" },
          ],
        )],
        [
          luyen(R`Phân tích $x^2-9$.`, R`Dạng nhân tử là $(x-3)(x+3)$.`, [{ expr: "factor(x**2-9)", expect: "(x-3)*(x+3)" }], "Đây là hiệu hai bình phương. Hai nhân tử là hiệu và tổng của $x$ với $3$."),
          luyen(R`Tính giá trị của $(x-2)(x-3)$ khi $x=4$.`, R`Giá trị bằng $2$.`, [{ expr: "(4-2)*(4-3)", expect: "2" }], "Đa thức đã tách nhân tử thì thay số vào từng nhân tử rồi nhân. Tích $2\\cdot 1$ bằng $2$."),
          luyen(R`Đặt thừa số chung của $6x+9$. Hệ số trong ngoặc của hạng tử không chứa $x$, khi đã đặt $3$, bằng bao nhiêu?`, R`Hạng tử đó là $3$, và đa thức bằng $3(2x+3)$.`, [{ expr: "factor(6*x+9).subs(x,1)", expect: "15" }], "Thừa số chung bằng $3$. Thay $x=1$ vào đa thức gốc được $15$, trùng giá trị của dạng đã phân tích."),
        ],
      ),
      bai(
        "phan-thuc",
        "Phân thức đại số",
        R`Phân thức đại số là thương của hai đa thức, mẫu không phải đa thức không. Rút gọn được khi tử và mẫu có nhân tử chung, và giá trị làm mẫu bằng $0$ bị loại khỏi điều kiện xác định.`,
        [vd(
          R`Rút gọn $\frac{x^2-1}{x-1}$ với $x\neq 1$.`,
          [
            buoc(R`Tử là $(x-1)(x+1)$.`, "Hiệu hai bình phương tách được nhân tử $x-1$, cùng nhân tử với mẫu."),
            buoc(R`Với $x\neq 1$, phân thức bằng $x+1$.`, "Chia tử và mẫu cho nhân tử chung $x-1$. Điều kiện $x\\neq 1$ giữ nguyên sau khi rút gọn."),
          ],
          R`Phân thức rút gọn thành $x+1$ khi $x\neq 1$.`,
          [{ expr: "simplify((x**2-1)/(x-1))", expect: "x+1" }],
        )],
        [
          luyen(R`Tính giá trị của phân thức đã rút gọn $x+1$ tại $x=2$.`, R`Giá trị bằng $3$.`, [{ expr: "(2**2-1)/(2-1)", expect: "3" }], "Điểm $x=2$ không làm mẫu bằng $0$. Giá trị của phân thức gốc trùng $2+1$."),
          luyen(R`Rút gọn $\frac{x^2-4}{x-2}$ với $x\neq 2$.`, R`Phân thức bằng $x+2$.`, [{ expr: "simplify((x**2-4)/(x-2))", expect: "x+2" }], "Tử có nhân tử $x-2$. Sau khi chia, còn $x+2$, với điều kiện mẫu khác $0$."),
          luyen(R`Tại $x=3$, phân thức $\frac{x^2-4}{x-2}$ bằng bao nhiêu?`, R`Giá trị bằng $5$.`, [{ expr: "(3**2-4)/(3-2)", expect: "5" }], "Mẫu tại $x=3$ khác $0$. Thay vào dạng rút gọn $x+2$ cũng được $5$."),
        ],
      ),
    ]),
    chuong("pt-ham", "Phương trình bậc nhất và hàm số bậc nhất", [
      bai(
        "pt-bac-nhat",
        "Phương trình bậc nhất một ẩn",
        R`Phương trình $ax+b=0$ với $a\neq 0$ có nghiệm duy nhất $x=-\frac{b}{a}$. Nếu $a=0$ thì không dùng công thức này.`,
        [vd(
          R`Giải $3x-12=0$.`,
          [
            buoc(R`Hệ số của $x$ bằng $3$, khác $0$.`, "Đây là điều kiện để phương trình bậc nhất có đúng một nghiệm."),
            buoc(R`Nghiệm là $x=4$.`, "Chuyển số hạng không chứa $x$ rồi chia cho hệ số của $x$. Thử lại, vế trái bằng $0$."),
          ],
          R`Nghiệm duy nhất là $x=4$.`,
          [{ expr: "solve(3*x-12, x)[0]", expect: "4" }],
        )],
        [
          luyen(R`Giải $2x+8=0$.`, R`Nghiệm là $x=-4$.`, [{ expr: "solve(2*x+8, x)[0]", expect: "-4" }], "Hệ số của $x$ khác $0$. Chia $-8$ cho $2$ được nghiệm âm."),
          luyen(R`Giải $5x=15$.`, R`Nghiệm là $x=3$.`, [{ expr: "solve(5*x-15, x)[0]", expect: "3" }], "Chuyển về $5x-15=0$ rồi chia cho hệ số khác $0$."),
          luyen(R`Giải $4x-8=0$.`, R`Nghiệm là $x=2$.`, [{ expr: "solve(4*x-8, x)[0]", expect: "2" }], "Nghiệm duy nhất là số đối của hạng tử tự do, chia cho hệ số của $x$."),
        ],
      ),
      bai(
        "ham-bac-nhat",
        "Hàm số bậc nhất",
        R`Đồ thị của hàm số $y=ax+b$ với $a\neq 0$ là một đường thẳng. Hệ số $a$ là hệ số góc: khi $x$ tăng $1$ thì $y$ tăng thêm $a$.`,
        [vd(
          R`Cho $y=2x+1$. Tính $y$ khi $x=3$, và độ tăng của $y$ khi $x$ tăng thêm $1$.`,
          [
            buoc(R`Thay $x=3$ được $y=2\cdot 3+1=7$.`, "Mỗi giá trị của $x$ cho đúng một giá trị của $y$ trên đường thẳng."),
            buoc(R`Khi $x$ tăng $1$, $y$ tăng thêm $2$.`, "Hệ số góc chính là $a=2$. Đây là mức thay đổi của tung độ trên mỗi đơn vị hoành độ."),
          ],
          R`Tại $x=3$, tung độ bằng $7$, và hệ số góc bằng $2$.`,
          [{ expr: "2*3+1", expect: "7" }],
        )],
        [
          luyen(R`Cho $y=-x+4$. Tính $y$ khi $x=1$.`, R`Tung độ bằng $3$.`, [{ expr: "-1+4", expect: "3" }], "Thay hoành độ vào đúng hàm đã cho. Hệ số góc âm nên đường thẳng đi xuống."),
          luyen(R`Đồ thị của $y=3x-6$ cắt trục hoành tại điểm có hoành độ bao nhiêu?`, R`Hoành độ giao điểm bằng $2$.`, [{ expr: "solve(3*x-6, x)[0]", expect: "2" }], "Giao với trục hoành là điểm có tung độ bằng $0$. Giải phương trình bậc nhất đó."),
          luyen(R`Hai điểm trên đồ thị $y=2x$ có hoành độ $1$ và $4$. Hiệu tung độ bằng bao nhiêu?`, R`Hiệu tung độ bằng $6$.`, [{ expr: "2*4-2*1", expect: "6" }], "Hệ số góc $2$ nhân với hiệu hoành độ $3$ cũng ra hiệu tung độ $6$."),
        ],
      ),
      bai(
        "lap-pt",
        "Giải bài toán bằng cách lập phương trình",
        R`Chọn ẩn và đặt điều kiện cho ẩn. Biểu diễn các đại lượng chưa biết theo ẩn rồi lập phương trình từ mối quan hệ trong đề. Giải phương trình, đối chiếu điều kiện rồi trả lời.`,
        [vd(
          R`Một hình chữ nhật có chiều dài hơn chiều rộng $4$ mét và chu vi $32$ mét. Tìm chiều rộng.`,
          [
            buoc(R`Gọi chiều rộng là $x$ mét, với $x>0$. Chiều dài là $x+4$ mét.`, R`Chọn đại lượng cần tìm làm ẩn và biểu diễn đại lượng còn lại theo ẩn.`),
            buoc(R`Chu vi cho phương trình $2(x+x+4)=32$, tức $4x+8=32$, nên $x=6$.`, R`Giá trị $6$ dương nên thỏa điều kiện của ẩn.`),
          ],
          R`Chiều rộng bằng $6$ mét.`,
          [{ expr: "Rational(32-8,4)", expect: "6" }, { expr: "2*(6+6+4)", expect: "32" }],
        )],
        [
          luyen(R`Hai số có tổng $45$, số thứ nhất gấp đôi số thứ hai. Tìm số thứ hai.`, R`Số thứ hai bằng $15$.`, [{ expr: "Rational(45,3)", expect: "15" }], R`Gọi số thứ hai là $x$ thì $2x+x=45$, nên $x=15$.`),
          luyen(R`Một xe đi từ $A$ đến $B$ với vận tốc $40$ kilômét trên giờ và trở về với vận tốc $60$ kilômét trên giờ, tổng thời gian là $5$ giờ. Quãng đường $AB$ dài bao nhiêu kilômét?`, R`Quãng đường dài $120$ kilômét.`, [{ expr: "5/(Rational(1,40)+Rational(1,60))", expect: "120" }], R`Gọi quãng đường là $x$ thì $\frac{x}{40}+\frac{x}{60}=5$, tức $\frac{5x}{120}=5$, nên $x=120$.`),
          luyen(R`Tuổi mẹ gấp $3$ lần tuổi con. Sau $10$ năm, tuổi mẹ gấp $2$ lần tuổi con. Hiện nay con bao nhiêu tuổi?`, R`Hiện nay con $10$ tuổi.`, [{ expr: "2*10-10", expect: "10" }, { expr: "3*10+10-2*(10+10)", expect: "0" }], R`Gọi tuổi con là $x$ thì $3x+10=2(x+10)$, suy ra $x=10$.`),
        ],
        {
          whyTrue: R`Phương trình là câu văn của đề bài được viết lại bằng kí hiệu. Mỗi mối quan hệ như tổng, hiệu, gấp mấy lần trở thành một phép tính trên ẩn, nên giải phương trình là giải đề bài.`,
          pitfalls: R`Giải xong phương trình rồi dừng. Còn phải đối chiếu điều kiện của ẩn và trả lời đúng đại lượng đề hỏi.`,
        },
      ),
    ]),
    chuong("tam-giac", "Tam giác đồng dạng và định lí Pythagore", [
      bai(
        "ti-so-dong-dang",
        "Tỉ số đồng dạng",
        R`Hai tam giác đồng dạng có các cạnh tương ứng tỉ lệ. Nếu tỉ số đồng dạng bằng $k$ thì mỗi cạnh của tam giác này bằng $k$ lần cạnh tương ứng của tam giác kia.`,
        [vd(
          R`Tam giác nhỏ đồng dạng với tam giác lớn theo tỉ số $\frac{2}{3}$. Cạnh tương ứng của tam giác lớn dài $12$. Cạnh của tam giác nhỏ dài bao nhiêu?`,
          [
            buoc(R`Cạnh nhỏ bằng $\frac{2}{3}\cdot 12$.`, "Tỉ số đồng dạng nhân với cạnh của tam giác lấy làm gốc so sánh."),
            buoc(R`Kết quả bằng $8$.`, "Rút gọn $\\frac{2}{3}$ nhân $12$ được $8$. Đơn vị đo theo đề không đổi."),
          ],
          R`Cạnh của tam giác nhỏ dài $8$.`,
          [{ expr: "Rational(2,3)*12", expect: "8" }],
        )],
        [
          luyen(R`Tỉ số đồng dạng bằng $3$. Cạnh gốc dài $5$. Cạnh tương ứng bằng bao nhiêu?`, R`Cạnh tương ứng dài $15$.`, [{ expr: "3*5", expect: "15" }], "Nhân tỉ số đồng dạng với cạnh gốc. Cạnh ảnh dài gấp ba cạnh gốc."),
          luyen(R`Hai đoạn $4$ và $10$ có tỉ số bằng bao nhiêu?`, R`Tỉ số bằng $\frac{2}{5}$.`, [{ expr: "Rational(4,10)", expect: "Rational(2,5)" }], "Chia độ dài đoạn nhỏ cho đoạn lớn rồi rút gọn. Ước chung của $4$ và $10$ là $2$."),
          luyen(R`Trong tam giác $ABC$, đường thẳng song song với $BC$ cắt $AB$ và $AC$. Đường này chia mỗi cạnh kể từ đỉnh $A$ theo tỉ số $\frac{1}{2}$, và $BC=18$. Đoạn nằm giữa hai giao điểm dài bao nhiêu?`, R`Đoạn đó dài $9$.`, [{ expr: "18*Rational(1,2)", expect: "9" }], "Định lí Thales cần điều kiện đường thẳng song song với cạnh thứ ba. Khi ấy đoạn chắn bằng nửa cạnh $BC$."),
        ],
        { figure: "triangle" },
      ),
      bai(
        "pitago",
        "Định lí Pythagore",
        R`Trong tam giác vuông, bình phương cạnh huyền bằng tổng bình phương hai cạnh góc vuông. Cạnh huyền là cạnh đối diện góc vuông. Căn lấy khi tìm độ dài là căn không âm.`,
        [vd(
          R`Tam giác vuông có hai cạnh góc vuông $3$ và $4$. Tính cạnh huyền.`,
          [
            buoc(R`Tổng hai bình phương bằng $9+16=25$.`, "Định lí Pythagore cộng bình phương hai cạnh góc vuông, chưa lấy căn."),
            buoc(R`Cạnh huyền bằng $\sqrt{25}=5$.`, "Độ dài là căn không âm của tổng vừa tính. Bộ $3, 4, 5$ là một tam giác vuông."),
          ],
          R`Cạnh huyền bằng $5$.`,
          [{ expr: "sqrt(3**2+4**2)", expect: "5" }],
        )],
        [
          luyen(R`Cạnh huyền bằng $13$, một cạnh góc vuông bằng $5$. Cạnh góc vuông còn lại bằng bao nhiêu?`, R`Cạnh còn lại bằng $12$.`, [{ expr: "sqrt(13**2-5**2)", expect: "12" }], "Từ định lí Pythagore, bình phương cạnh còn lại bằng hiệu hai bình phương. Căn không âm bằng $12$."),
          luyen(R`Tam giác vuông cân có cạnh góc vuông $1$. Cạnh huyền bằng bao nhiêu?`, R`Cạnh huyền bằng $\sqrt{2}$.`, [{ expr: "sqrt(1**2+1**2)", expect: "sqrt(2)" }], "Hai cạnh góc vuông bằng nhau. Tổng hai bình phương bằng $2$, căn không âm là $\\sqrt{2}$."),
          luyen(R`Kiểm tra bộ độ dài $6, 8, 10$ có phải tam giác vuông không.`, R`Có, vì $6^2+8^2=10^2$.`, [{ expr: "6**2+8**2-10**2", expect: "0" }], "Đảo định lí Pythagore: nếu bình phương một cạnh bằng tổng bình phương hai cạnh kia thì tam giác vuông tại góc giữa hai cạnh đó."),
        ],
        { figure: "triangle" },
      ),
    ]),
    chuong("tu-giac", "Tứ giác và hình chóp đều", [
      bai(
        "binh-hanh",
        "Hình bình hành và hình chữ nhật",
        R`Hình bình hành có các cặp cạnh đối song song và bằng nhau. Diện tích bằng đáy nhân chiều cao tương ứng. Hình chữ nhật là hình bình hành có một góc vuông, diện tích bằng dài nhân rộng.`,
        [vd(
          R`Hình bình hành có đáy $6$ và chiều cao tương ứng $4$. Tính diện tích. Hình chữ nhật dài $6$ và rộng $4$ thì diện tích bằng bao nhiêu?`,
          [
            buoc(R`Diện tích hình bình hành bằng $6\cdot 4=24$.`, "Chiều cao phải vuông góc với đường chứa đáy đã chọn. Nhân đúng cặp đáy và cao đó."),
            buoc(R`Diện tích hình chữ nhật cùng số đo cũng bằng $24$.`, "Hình chữ nhật dùng dài nhân rộng. Ở đây hai phép nhân cùng ra $24$."),
          ],
          R`Cả hai diện tích đều bằng $24$.`,
          [{ expr: "6*4", expect: "24" }],
        )],
        [
          luyen(R`Hình thoi có hai đường chéo $6$ và $8$. Diện tích bằng nửa tích hai đường chéo. Tính diện tích.`, R`Diện tích bằng $24$.`, [{ expr: "Rational(1,2)*6*8", expect: "24" }], "Hình thoi là một hình bình hành đặc biệt. Công thức đường chéo lấy một nửa tích hai đường chéo."),
          luyen(R`Hình chữ nhật dài $7$ và rộng $3$ có diện tích bằng bao nhiêu?`, R`Diện tích bằng $21$.`, [{ expr: "7*3", expect: "21" }], "Diện tích hình chữ nhật là tích chiều dài với chiều rộng."),
          luyen(R`Hình vuông cạnh $5$ có chu vi bằng bao nhiêu?`, R`Chu vi bằng $20$.`, [{ expr: "4*5", expect: "20" }], "Hình vuông có bốn cạnh bằng nhau. Chu vi bằng bốn lần một cạnh."),
        ],
        { figure: "rect" },
      ),
      bai(
        "chop-deu",
        "Hình chóp đều",
        R`Hình chóp đều có đáy là đa giác đều và chân đường cao trùng với tâm của đáy. Thể tích bằng $\frac{1}{3}$ diện tích đáy nhân chiều cao.`,
        [vd(
          R`Hình chóp đều có đáy hình vuông cạnh $6$ và chiều cao $4$. Tính thể tích.`,
          [
            buoc(R`Diện tích đáy bằng $6\cdot 6=36$.`, "Đáy là hình vuông, một đa giác đều. Chân đường cao là tâm của hình vuông đó."),
            buoc(R`Thể tích bằng $\frac{1}{3}\cdot 36\cdot 4=48$.`, "Công thức hình chóp lấy một phần ba tích diện tích đáy với chiều cao."),
          ],
          R`Thể tích bằng $48$.`,
          [{ expr: "Rational(1,3)*6*6*4", expect: "48" }],
        )],
        [
          luyen(R`Hình chóp đều đáy vuông cạnh $4$, chiều cao $3$. Thể tích bằng bao nhiêu?`, R`Thể tích bằng $16$.`, [{ expr: "Rational(1,3)*4*4*3", expect: "16" }], "Diện tích đáy bằng $16$. Một phần ba của $16\\cdot 3$ bằng $16$."),
          luyen(R`Đáy là tam giác đều có diện tích $12$, chiều cao chóp bằng $5$. Thể tích bằng bao nhiêu?`, R`Thể tích bằng $20$.`, [{ expr: "Rational(1,3)*12*5", expect: "20" }], "Đáy đa giác đều. Thể tích vẫn là một phần ba tích diện tích đáy với chiều cao."),
          luyen(R`Nếu thể tích hình chóp đều bằng $48$ và diện tích đáy bằng $36$, chiều cao bằng bao nhiêu?`, R`Chiều cao bằng $4$.`, [{ expr: "solve(Rational(1,3)*36*h-48, h)[0]", expect: "4" }], "Từ công thức thể tích, nhân $3$ rồi chia cho diện tích đáy khác $0$ để tìm chiều cao."),
        ],
      ),
    ]),
    chuong("thales", "Định lí Thalès và đường trung bình", [
      bai(
        "thales",
        "Định lí Thalès",
        R`Nếu một đường thẳng song song với một cạnh của tam giác và cắt hai cạnh còn lại thì nó định ra trên hai cạnh đó những đoạn thẳng tương ứng tỉ lệ. Định lí đảo: nếu đường thẳng cắt hai cạnh và định ra các đoạn tương ứng tỉ lệ thì nó song song với cạnh còn lại.`,
        [vd(
          R`Trong tam giác $ABC$, đường thẳng song song với $BC$ cắt $AB$ tại $M$ và $AC$ tại $N$. Biết $AM=4$, $MB=6$ và $AN=6$. Tính $NC$.`,
          [
            buoc(R`Theo định lí Thalès, $\frac{AM}{MB}=\frac{AN}{NC}$.`, R`Đường thẳng $MN$ song song với $BC$ nên chia hai cạnh theo cùng một tỉ số.`),
            buoc(R`Thay số: $\frac{4}{6}=\frac{6}{NC}$, suy ra $NC=\frac{6\cdot 6}{4}=9$.`, R`Dùng tích chéo của tỉ lệ thức để tìm số hạng chưa biết.`),
          ],
          R`Độ dài $NC$ bằng $9$.`,
          [{ expr: "Rational(6*6,4)", expect: "9" }],
        )],
        [
          luyen(R`Đường thẳng song song với $BC$ cắt $AB$, $AC$ tại $M$, $N$. Biết $AM=3$, $AB=9$ và $AC=12$. Tính $AN$.`, R`Độ dài $AN$ bằng $4$.`, [{ expr: "Rational(3,9)*12", expect: "4" }], R`Ta có $\frac{AM}{AB}=\frac{AN}{AC}$, nên $AN=\frac{3}{9}\cdot 12=4$.`),
          luyen(R`Biết $AM=2$, $MB=4$, $AN=3$ và $NC=6$. Đường thẳng $MN$ có song song với $BC$ không?`, R`Có, vì hai tỉ số bằng nhau.`, [{ expr: "Rational(2,4)-Rational(3,6)", expect: "0" }], R`Ta có $\frac{2}{4}=\frac{3}{6}$, nên theo định lí Thalès đảo thì $MN$ song song với $BC$.`),
          luyen(R`Bóng của một cây cột cao $2$ mét dài $3$ mét. Cùng lúc đó bóng của một cái cây dài $12$ mét. Cây cao bao nhiêu mét?`, R`Cây cao $8$ mét.`, [{ expr: "Rational(2,3)*12", expect: "8" }], R`Chiều cao và bóng tỉ lệ với nhau: $\frac{2}{3}=\frac{h}{12}$, nên $h=8$.`),
        ],
        {
          figure: "triangle",
          whyTrue: R`Chia cạnh $AB$ thành các đoạn bằng nhau rồi kẻ qua các điểm chia những đường thẳng song song với $BC$. Các đường này cũng chia cạnh $AC$ thành các đoạn bằng nhau, nên tỉ số số đoạn trên hai cạnh là như nhau.`,
          pitfalls: R`Lập hai tỉ số lệch nhau: một bên lấy đoạn trên so với cả cạnh, bên kia lấy đoạn trên so với đoạn dưới. Hai tỉ số phải được lập theo cùng một cách.`,
        },
      ),
      bai(
        "duong-trung-binh",
        "Đường trung bình của tam giác",
        R`Đường trung bình của tam giác là đoạn thẳng nối trung điểm hai cạnh. Nó song song với cạnh thứ ba và dài bằng một nửa cạnh ấy.`,
        [vd(
          R`Tam giác $ABC$ có $BC=10$. Gọi $M$, $N$ là trung điểm của $AB$ và $AC$. Tính $MN$.`,
          [
            buoc(R`Đoạn $MN$ là đường trung bình của tam giác $ABC$.`, R`Hai điểm $M$ và $N$ là trung điểm của hai cạnh.`),
            buoc(R`Vậy $MN=\frac{1}{2}BC=5$.`, R`Đường trung bình dài bằng một nửa cạnh thứ ba.`),
          ],
          R`Độ dài $MN$ bằng $5$.`,
          [{ expr: "Rational(10,2)", expect: "5" }],
        )],
        [
          luyen(R`Đường trung bình ứng với cạnh đáy dài $14$ thì dài bao nhiêu?`, R`Đường trung bình dài $7$.`, [{ expr: "Rational(14,2)", expect: "7" }], R`Đường trung bình bằng một nửa cạnh mà nó song song.`),
          luyen(R`Đường trung bình dài $6$. Cạnh song song với nó dài bao nhiêu?`, R`Cạnh đó dài $12$.`, [{ expr: "6*2", expect: "12" }], R`Cạnh thứ ba dài gấp đôi đường trung bình.`),
          luyen(R`Tam giác có ba cạnh $6$, $8$ và $10$. Tam giác tạo bởi ba đường trung bình có chu vi bằng bao nhiêu?`, R`Chu vi bằng $12$.`, [{ expr: "Rational(6+8+10,2)", expect: "12" }], R`Mỗi đường trung bình bằng nửa một cạnh, nên chu vi bằng nửa chu vi tam giác ban đầu.`),
        ],
        {
          figure: "triangle",
          whyTrue: R`Vì $\frac{AM}{AB}=\frac{AN}{AC}=\frac{1}{2}$ nên theo định lí Thalès đảo, $MN$ song song với $BC$. Tam giác $AMN$ đồng dạng với tam giác $ABC$ theo tỉ số $\frac{1}{2}$, nên $MN$ bằng nửa $BC$.`,
          pitfalls: R`Nhầm đường trung bình với đường trung tuyến. Đường trung tuyến nối một đỉnh với trung điểm cạnh đối diện, đường trung bình nối hai trung điểm.`,
        },
      ),
      bai(
        "phan-giac",
        "Tính chất đường phân giác của tam giác",
        R`Trong tam giác, đường phân giác của một góc chia cạnh đối diện thành hai đoạn thẳng tỉ lệ với hai cạnh kề hai đoạn ấy.`,
        [vd(
          R`Tam giác $ABC$ có $AB=6$, $AC=9$ và $BC=10$. Đường phân giác của góc $A$ cắt $BC$ tại $D$. Tính $DB$ và $DC$.`,
          [
            buoc(R`Ta có $\frac{DB}{DC}=\frac{AB}{AC}=\frac{6}{9}=\frac{2}{3}$.`, R`Đường phân giác chia cạnh đối diện theo tỉ số hai cạnh kề.`),
            buoc(R`Chia $BC=10$ thành $5$ phần bằng nhau: $DB=4$ và $DC=6$.`, R`Tổng hai đoạn là $10$ và tỉ số là $2:3$, nên mỗi phần dài $2$.`),
          ],
          R`Độ dài $DB$ bằng $4$ và $DC$ bằng $6$.`,
          [{ expr: "Rational(10,5)*2", expect: "4" }, { expr: "Rational(10,5)*3", expect: "6" }],
        )],
        [
          luyen(R`Tam giác có $AB=4$ và $AC=8$. Phân giác góc $A$ cắt $BC$ tại $D$ với $DB=3$. Tính $DC$.`, R`Độ dài $DC$ bằng $6$.`, [{ expr: "3*Rational(8,4)", expect: "6" }], R`Ta có $\frac{DB}{DC}=\frac{4}{8}$, nên $DC$ dài gấp đôi $DB$.`),
          luyen(R`Tam giác có $AB=5$, $AC=5$ và $BC=8$. Phân giác góc $A$ cắt $BC$ tại $D$. Tính $DB$.`, R`Độ dài $DB$ bằng $4$.`, [{ expr: "Rational(8,2)", expect: "4" }], R`Hai cạnh kề bằng nhau nên $D$ là trung điểm của $BC$.`),
          luyen(R`Tam giác có $AB=6$, $AC=12$ và $BC=15$. Phân giác góc $A$ cắt $BC$ tại $D$. Tính $DC$.`, R`Độ dài $DC$ bằng $10$.`, [{ expr: "Rational(15,3)*2", expect: "10" }], R`Tỉ số $DB:DC$ là $6:12$, tức $1:2$, nên $DC$ chiếm hai phần ba của $15$.`),
        ],
        {
          whyTrue: R`Qua $B$ kẻ đường thẳng song song với $AD$, cắt đường thẳng $AC$ tại $E$. Tam giác $ABE$ cân tại $A$ nên $AE=AB$, và định lí Thalès cho $\frac{DB}{DC}=\frac{AE}{AC}=\frac{AB}{AC}$.`,
          pitfalls: R`Ghép sai cặp cạnh. Đoạn $DB$ đi với cạnh $AB$, đoạn $DC$ đi với cạnh $AC$.`,
        },
      ),
    ]),
    chuong("xac-suat-8", "Xác suất", [
      bai(
        "xs-ti-so",
        "Xác suất của biến cố bằng tỉ số",
        R`Khi mọi kết quả của một phép thử có cùng khả năng xảy ra, xác suất của một biến cố bằng số kết quả thuận lợi chia cho tổng số kết quả có thể. Xác suất luôn nằm trong đoạn từ $0$ đến $1$.`,
        [vd(
          R`Gieo một con xúc xắc cân đối. Tính xác suất được mặt có số chấm chẵn.`,
          [
            buoc(R`Có $6$ kết quả có thể, cùng khả năng xảy ra.`, R`Xúc xắc cân đối nên sáu mặt có khả năng xuất hiện như nhau.`),
            buoc(R`Các mặt chẵn là $2$, $4$ và $6$, nên xác suất là $\frac{3}{6}=\frac{1}{2}$.`, R`Có ba kết quả thuận lợi trong sáu kết quả có thể.`),
          ],
          R`Xác suất bằng $\frac{1}{2}$.`,
          [{ expr: "Rational(3,6)", expect: "Rational(1,2)" }],
        )],
        [
          luyen(R`Gieo một con xúc xắc cân đối. Xác suất được mặt có số chấm lớn hơn $4$ bằng bao nhiêu?`, R`Xác suất bằng $\frac{1}{3}$.`, [{ expr: "Rational(2,6)", expect: "Rational(1,3)" }], R`Các mặt lớn hơn $4$ là $5$ và $6$, tức hai kết quả thuận lợi trong sáu.`),
          luyen(R`Hộp có $4$ thẻ ghi các số $1$, $2$, $3$, $4$. Rút ngẫu nhiên một thẻ. Xác suất rút được số lớn hơn $1$ bằng bao nhiêu?`, R`Xác suất bằng $\frac{3}{4}$.`, [{ expr: "Rational(4-1,4)", expect: "Rational(3,4)" }], R`Các số lớn hơn $1$ là $2$, $3$ và $4$, tức ba kết quả thuận lợi trong bốn.`),
          luyen(R`Lớp có $18$ bạn nam và $22$ bạn nữ. Chọn ngẫu nhiên một bạn. Xác suất chọn được bạn nữ bằng bao nhiêu?`, R`Xác suất bằng $\frac{11}{20}$.`, [{ expr: "Rational(22,18+22)", expect: "Rational(11,20)" }], R`Có $22$ kết quả thuận lợi trong $40$ kết quả có thể, rút gọn được $\frac{11}{20}$.`),
        ],
        {
          whyTrue: R`Các kết quả đồng khả năng chia đều toàn bộ khả năng, mỗi kết quả nhận một phần bằng nhau. Biến cố gồm bao nhiêu kết quả thì nhận bấy nhiêu phần.`,
          pitfalls: R`Quên kiểm tra các kết quả có đồng khả năng không. Một con xúc xắc bị lệch thì không dùng được công thức này.`,
        },
      ),
      bai(
        "xs-thuc-nghiem-8",
        "Xác suất thực nghiệm và xác suất lí thuyết",
        R`Xác suất thực nghiệm bằng số lần biến cố xảy ra chia cho số lần thử. Khi số lần thử càng lớn, xác suất thực nghiệm càng gần xác suất tính theo tỉ số.`,
        [vd(
          R`Gieo một đồng xu cân đối $200$ lần, được $104$ lần mặt ngửa. Tính xác suất thực nghiệm của mặt ngửa và so với xác suất lí thuyết.`,
          [
            buoc(R`Xác suất thực nghiệm là $\frac{104}{200}=0{,}52$.`, R`Lấy số lần được mặt ngửa chia cho tổng số lần gieo.`),
            buoc(R`Xác suất lí thuyết là $\frac{1}{2}=0{,}5$, hai số chênh nhau $0{,}02$.`, R`Đồng xu cân đối có hai mặt đồng khả năng.`),
          ],
          R`Xác suất thực nghiệm bằng $0{,}52$, gần với xác suất lí thuyết $0{,}5$.`,
          [{ expr: "Rational(104,200)", expect: "Rational(13,25)" }],
        )],
        [
          luyen(R`Gieo xúc xắc $60$ lần, được $12$ lần mặt $6$ chấm. Xác suất thực nghiệm của mặt $6$ chấm bằng bao nhiêu?`, R`Xác suất thực nghiệm bằng $\frac{1}{5}$.`, [{ expr: "Rational(12,60)", expect: "Rational(1,5)" }], R`Lấy $12$ chia $60$ rồi rút gọn thành $\frac{1}{5}$.`),
          luyen(R`Kiểm tra $500$ sản phẩm thấy $15$ sản phẩm lỗi. Xác suất thực nghiệm của sản phẩm lỗi bằng bao nhiêu phần trăm?`, R`Bằng $3\%$.`, [{ expr: "Rational(15,500)*100", expect: "3" }], R`Ta có $\frac{15}{500}=0{,}03$, tức $3\%$.`),
          luyen(R`Xác suất thực nghiệm của một biến cố là $0{,}3$ sau $200$ lần thử. Biến cố đã xảy ra bao nhiêu lần?`, R`Biến cố đã xảy ra $60$ lần.`, [{ expr: "Rational(3,10)*200", expect: "60" }], R`Số lần xảy ra bằng xác suất thực nghiệm nhân với số lần thử.`),
        ],
        {
          whyTrue: R`Mỗi lần thử có kết quả ngẫu nhiên, nhưng qua rất nhiều lần thử thì tỉ lệ xuất hiện của một biến cố ổn định dần. Giá trị mà tỉ lệ ấy tiến gần tới chính là xác suất của biến cố.`,
          pitfalls: R`Chờ đợi xác suất thực nghiệm bằng đúng xác suất lí thuyết. Hai số chỉ gần nhau, và gần hơn khi số lần thử lớn.`,
        },
      ),
    ]),
  ],
};
