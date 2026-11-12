import type { TopicDang } from "./types.ts";

const R = String.raw;

export const comboDang: TopicDang = {
  id: "combo",
  title: "Tổ hợp và thống kê",
  dang: [
    {
      name: "Quy tắc cộng và quy tắc nhân",
      nhanDang: "Một việc được tách thành các trường hợp rời nhau, hoặc thành nhiều bước liên tiếp.",
      phuongPhap: R`Quy tắc cộng dùng khi các cách thực hiện loại trừ lẫn nhau: số cách của việc là tổng số cách của từng trường hợp. Quy tắc nhân dùng khi việc gồm các bước nối tiếp và số cách của bước sau không phụ thuộc cách đã chọn ở bước trước: số cách là tích. Cộng nhầm một dãy bước sẽ đếm thiếu. Nhân nhầm hai trường hợp rời sẽ đếm những cách không tồn tại.`,
      viDu: {
        prompt: R`Từ $A$ tới $B$ có $2$ đường, từ $B$ tới $C$ có $3$ đường, và có thêm $4$ đường đi thẳng từ $A$ tới $C$ không qua $B$. Hỏi có bao nhiêu cách đi từ $A$ tới $C$ nếu chỉ xét đường thẳng hoặc đường qua đúng $B$?`,
        steps: [
          { claim: R`Đi qua $B$ có $2\cdot 3=6$ cách.`, why: "Hai bước nối tiếp, mỗi đường ở chặng sau ghép được với mỗi đường ở chặng trước. Đây là quy tắc nhân." },
          { claim: R`Hai kiểu đường loại trừ nhau, nên tổng cộng $6+4=10$ cách.`, why: "Đường qua $B$ và đường thẳng không xảy ra đồng thời trong một cách đi. Quy tắc cộng áp dụng cho hai trường hợp này." },
        ],
        ket: R`Có $10$ cách.`,
        checks: [{ expr: "2*3+4", expect: "10" }],
      },
      loi: "Cộng $2+3$ cho chặng qua $B$, trong khi hai chặng phải đi nối tiếp.",
      luyen: {
        kind: "luyen",
        prompt: R`Một phần ăn gồm một món trong $3$ món và một đồ uống trong $4$ loại. Có bao nhiêu phần ăn?`,
        think: "Chọn món và chọn đồ uống là hai bước nối tiếp. Mỗi món ghép được với mỗi đồ uống.",
        answer: R`Có $12$ phần ăn.`,
        steps: [
          { claim: R`Mỗi món ghép với mỗi đồ uống.`, why: "Không có điều kiện cấm một cặp nào. Số cách của bước sau không đổi theo bước trước." },
          { claim: R`Tích $3\cdot 4$ bằng $12$.`, why: "Quy tắc nhân. Đây không phải tổng, vì một phần ăn phải có cả món lẫn đồ uống." },
        ],
        checks: [{ expr: "3*4", expect: "12" }],
      },
    },
    {
      name: "Đếm có điều kiện",
      nhanDang: "Đếm các cách thỏa một điều kiện, thường bằng phần bù hoặc bằng cách xếp vị trí bị ràng buộc trước.",
      phuongPhap: R`Nếu điều kiện có dạng có ít nhất một phần tử của một nhóm, phần bù là các cách không lấy phần tử nào của nhóm đó. Hiệu giữa toàn bộ và phần bù là điều kiện cần và đủ khi hai tập này tách nhau và phủ hết tập đang đếm. Nếu điều kiện gắn với một vị trí, chọn vị trí đó trước rồi mới chọn các vị trí còn lại trong số phần tử chưa dùng.`,
      viDu: {
        prompt: R`Trong $10$ học sinh có $2$ cán sự. Số cách chọn $3$ bạn sao cho có ít nhất một cán sự bằng bao nhiêu?`,
        steps: [
          { claim: R`Toàn bộ cách chọn là $C_{10}^3=120$.`, why: "Chọn không kể thứ tự. Mỗi bộ ba được tính một lần trong tổ hợp." },
          { claim: R`Phần bù, tức không có cán sự nào, là $C_8^3=56$.`, why: "Còn $8$ học sinh ngoài hai cán sự. Các bộ ba này và các bộ có ít nhất một cán sự tách nhau và hợp thành mọi bộ ba." },
          { claim: R`Hiệu $120-56=64$ là số cách cần tìm.`, why: "Trừ phần bù đủ vì hai tập phủ hết và không giao nhau. Không cần cộng riêng trường hợp một cán sự và hai cán sự nữa." },
        ],
        ket: R`Có $64$ cách.`,
        checks: [{ expr: "(10*9*8)/6-(8*7*6)/6", expect: "64" }],
      },
      loi: "Lấy $C_{10}^3$ rồi không trừ phần không thỏa điều kiện.",
      luyen: {
        kind: "luyen",
        prompt: R`Lập mã ba chữ số khác nhau từ $\{1;2;3;4;5\}$, chữ số cuối chẵn. Có bao nhiêu mã?`,
        think: "Chọn chữ số cuối trước vì đó là vị trí có điều kiện. Các chữ số chẵn trong tập là $2$ và $4$.",
        answer: R`Có $24$ mã.`,
        steps: [
          { claim: R`Chữ số cuối có $2$ cách.`, why: "Điều kiện chẵn chỉ còn $2$ và $4$. Chọn vị trí này trước để các vị trí sau biết phần còn lại." },
          { claim: R`Hai vị trí đầu còn $4\cdot 3$ cách, nên tổng cộng $2\cdot 4\cdot 3=24$.`, why: "Các chữ số phải khác nhau. Quy tắc nhân nối bước đã bị ràng buộc với hai bước còn lại." },
        ],
        checks: [{ expr: "2*4*3", expect: "24" }],
      },
    },
    {
      name: "Chọn có thứ tự hay không",
      nhanDang: "Bài đếm số cách chọn hoặc sắp xếp một nhóm từ một tập hữu hạn.",
      phuongPhap: R`Nếu đổi thứ tự ra một cách khác thì dùng chỉnh hợp $A_n^k=\frac{n!}{(n-k)!}$. Nếu không kể thứ tự thì dùng tổ hợp $C_n^k=\frac{n!}{k!(n-k)!}$. Hai công thức chỉ khác nhau ở chỗ có chia cho $k!$ hay không. Dùng nhầm công thức là đếm sai bài toán, không phải làm tròn.`,
      viDu: {
        prompt: R`Có $10$ học sinh. Số cách chọn $3$ bạn đi trực nhật, không phân biệt vai trò, bằng bao nhiêu?`,
        steps: [
          { claim: R`Không phân biệt vai trò nên không kể thứ tự.`, why: "Đề nói chọn bạn trực, không giao chức vụ khác nhau. Đổi thứ tự trong một bộ ba không thành cách mới." },
          { claim: R`Ta có $C_{10}^3=\frac{10\cdot 9\cdot 8}{6}=120$.`, why: "Chia cho $3!$ vì mỗi bộ ba bị đếm $6$ lần nếu giữ thứ tự chọn." },
        ],
        ket: R`Có $120$ cách.`,
        checks: [{ expr: "(10*9*8)/6", expect: "120" }],
      },
      loi: "Dùng $A_{10}^3=720$ cho một việc không phân biệt thứ tự.",
      luyen: {
        kind: "luyen",
        prompt: R`Số mật khẩu $3$ chữ số khác nhau lập từ $\{1;2;3;4;5\}$, có kể thứ tự, bằng bao nhiêu?`,
        think: "Đảo chữ số làm đổi mật khẩu, và không được lặp chữ số. Đây là chỉnh hợp.",
        answer: R`Có $60$ mật khẩu.`,
        steps: [
          { claim: R`Có thứ tự và không lặp.`, why: "Đề đòi các chữ số khác nhau. Hai mật khẩu đảo chỗ nhau được tính là hai cách." },
          { claim: R`Ta có $A_5^3=5\cdot 4\cdot 3=60$.`, why: "Chọn dần từng vị trí, mỗi bước bớt một chữ số còn lại." },
        ],
        checks: [{ expr: "5*4*3", expect: "60" }],
      },
    },
    {
      name: "Nhị thức Newton",
      nhanDang: R`Khai triển $(a+b)^n$ hoặc hỏi hệ số của một lũy thừa trong khai triển.`,
      phuongPhap: R`Nhị thức Newton viết $(a+b)^n=\sum_{k=0}^{n}C_n^k a^{n-k}b^k$. Hệ số của số hạng ứng với $k$ là $C_n^k$ nhân các hệ số đến từ $a^{n-k}$ và $b^k$. Muốn số mũ của $x$ bằng một số cho trước thì giải đúng giá trị $k$ đó. Các bài ở đây lấy số mũ $n$ không vượt quá $5$. Công thức này không liên quan đến trung bình hay trung vị của một dãy số liệu.`,
      viDu: {
        prompt: R`Tìm hệ số của $x^2$ trong khai triển $(1+2x)^5$.`,
        steps: [
          { claim: R`Số hạng ứng với $k=2$ là $C_5^2\cdot 1^{3}\cdot (2x)^2$.`, why: "Số mũ của $x$ bằng $k$. Các số mũ còn lại của thừa số $1$ là $5-2$." },
          { claim: R`Hệ số bằng $C_5^2\cdot 2^2=10\cdot 4=40$.`, why: "Tổ hợp $C_5^2$ bằng $10$, và bình phương của $2$ bằng $4$. Tích này là hệ số, chưa kèm theo $x^2$." },
        ],
        ket: R`Hệ số của $x^2$ bằng $40$.`,
        checks: [{ expr: "binomial(5,2)*2**2", expect: "40" }],
      },
      loi: "Lấy $k$ bằng số mũ của cả hai thừa số cộng lại, thay vì số mũ của riêng $x$.",
      luyen: {
        kind: "luyen",
        prompt: R`Tìm hệ số của $x^3$ trong khai triển $(1+x)^5$.`,
        think: "Số mũ $n=5$ không vượt quá $5$. Số hạng cần là $C_5^3 x^3$, và thừa số còn lại bằng $1$.",
        answer: R`Hệ số bằng $10$.`,
        steps: [
          { claim: R`Lấy $k=3$ trong $(1+x)^5$.`, why: "Số mũ của $x$ trong số hạng tổng quát chính là chỉ số $k$. Số mũ của nhị thức là $5$." },
          { claim: R`Hệ số $C_5^3$ bằng $10$.`, why: "Vì $\\frac{5\\cdot 4\\cdot 3}{6}=10$. Thừa số $1^{2}$ không đổi hệ số." },
        ],
        checks: [{ expr: "binomial(5,3)", expect: "10" }],
      },
    },
    {
      name: "Trung bình và trung vị",
      nhanDang: "Một dãy số liệu, hỏi trung bình cộng hoặc trung vị.",
      phuongPhap: R`Trung bình cộng là tổng chia cho số phần tử. Trung vị là số ở giữa sau khi xếp tăng. Nếu số phần tử chẵn thì trung vị là trung bình cộng của hai số giữa. Một giá trị rất lớn kéo trung bình nhưng có thể không đổi trung vị. Hai đại lượng này không thay thế được cho nhau.`,
      viDu: {
        prompt: R`Dãy điểm $2;\ 4;\ 4;\ 6;\ 9$. Trung bình và trung vị bằng bao nhiêu?`,
        steps: [
          { claim: R`Tổng bằng $25$, có $5$ số, trung bình bằng $5$.`, why: "Định nghĩa trung bình cộng. Mẫu là số phần tử của chính dãy, không phải số giá trị khác nhau." },
          { claim: R`Dãy đã tăng, số đứng giữa là số thứ ba, bằng $4$.`, why: "Số phần tử lẻ nên có đúng một vị trí giữa. Phải xếp tăng trước khi gọi số đó là trung vị." },
        ],
        ket: R`Trung bình bằng $5$, trung vị bằng $4$.`,
        checks: [{ expr: "Rational(2+4+4+6+9,5)", expect: "5" }],
      },
      loi: "Lấy trung vị trước khi xếp dãy tăng.",
      luyen: {
        kind: "luyen",
        prompt: R`Bốn mức giờ là $6;\ 7;\ 7;\ 8$. Trung vị và trung bình bằng bao nhiêu?`,
        think: "Dãy đã xếp tăng và có bốn số. Trung vị là trung bình của hai số giữa. Trung bình cộng lấy tổng chia cho $4$.",
        answer: R`Trung vị bằng $7$ và trung bình bằng $7$.`,
        steps: [
          { claim: R`Hai số giữa là $7$ và $7$, nên trung vị bằng $7$.`, why: "Số phần tử chẵn. Vị trí giữa là số thứ hai và số thứ ba sau khi đã xếp tăng." },
          { claim: R`Trung bình bằng $\frac{6+7+7+8}{4}=7$.`, why: "Tổng $28$ chia cho đúng bốn mức. Ở dãy này hai đại lượng tình cờ bằng nhau." },
        ],
        checks: [
          { expr: "Rational(7+7,2)", expect: "7" },
          { expr: "Rational(6+7+7+8,4)", expect: "7" },
        ],
      },
    },
    {
      name: "Phương sai",
      nhanDang: "Một dãy số liệu hữu hạn, hỏi độ phân tán quanh trung bình theo cách chia cho số phần tử.",
      phuongPhap: R`Gọi $\bar x$ là trung bình cộng của $n$ số $x_1;\ \ldots;\ x_n$. Phương sai là $\frac{1}{n}\sum_{i=1}^{n}(x_i-\bar x)^2$. Mẫu số là $n$, tức chia cho số phần tử. Phải tính trung bình trước khi bình phương các độ lệch. Phương sai bằng $0$ khi và chỉ khi mọi số liệu bằng nhau.`,
      viDu: {
        prompt: R`Tính trung bình và phương sai của dãy điểm $2;\ 4;\ 4;\ 6;\ 9$.`,
        steps: [
          { claim: R`Trung bình bằng $\frac{25}{5}=5$.`, why: "Tổng năm số là $25$. Phương sai chưa tính được khi chưa có trung bình này." },
          { claim: R`Tổng bình phương độ lệch bằng $9+1+1+1+16=28$, nên phương sai bằng $\frac{28}{5}$ điểm$^2$.`, why: "Các độ lệch là $-3;\\ -1;\\ -1;\\ 1;\\ 4$. Chia tổng bình phương cho $n=5$. Đơn vị là điểm$^2$ vì đã bình phương độ lệch điểm." },
        ],
        ket: R`Trung bình bằng $5$ điểm và phương sai bằng $\frac{28}{5}$ điểm$^2$.`,
        checks: [{ expr: "Rational((2-5)**2+(4-5)**2+(4-5)**2+(6-5)**2+(9-5)**2,5)", expect: "Rational(28,5)" }],
      },
      loi: "Chia tổng bình phương độ lệch cho $n-1$ khi đề đang dùng phương sai chia cho $n$.",
      luyen: {
        kind: "luyen",
        prompt: R`Tính phương sai của dãy điểm $1;\ 2;\ 3$.`,
        think: "Trung bình là $2$ điểm. Bình phương các độ lệch $-1;\\ 0;\\ 1$ rồi chia cho $3$. Đơn vị của phương sai là điểm$^2$.",
        answer: R`Phương sai bằng $\frac{2}{3}$ điểm$^2$.`,
        steps: [
          { claim: R`Trung bình bằng $2$.`, why: "Tổng $6$ chia cho ba phần tử. Mọi độ lệch đều lấy so với số này." },
          { claim: R`Phương sai bằng $\frac{1+0+1}{3}=\frac{2}{3}$ điểm$^2$.`, why: "Hai độ lệch đầu và cuối có bình phương $1$, độ lệch giữa bằng $0$. Mẫu số là số phần tử, và đơn vị là điểm$^2$." },
        ],
        checks: [{ expr: "Rational((1-2)**2+(2-2)**2+(3-2)**2,3)", expect: "Rational(2,3)" }],
      },
    },
    {
      name: "Tứ phân vị",
      nhanDang: "Dãy đã xếp tăng, hỏi tứ phân vị thứ nhất, trung vị và tứ phân vị thứ ba.",
      phuongPhap: R`Sắp dãy tăng. Nếu số phần tử chẵn, trung vị là trung bình của hai số đứng giữa, rồi chia dãy thành hai nửa bằng nhau: nửa dưới là nửa đầu, nửa trên là nửa cuối. Mỗi nửa giữ một trong hai số đứng giữa, không bỏ hai số đó ra khỏi dãy trước khi chia. Tứ phân vị thứ nhất là trung vị của nửa dưới, tứ phân vị thứ ba là trung vị của nửa trên. Nửa có số lẻ phần tử thì lấy đúng số giữa. Nửa có số chẵn phần tử thì lấy trung bình hai số giữa của nửa.`,
      viDu: {
        prompt: R`Dãy đã xếp $1;\ 3;\ 5;\ 7;\ 9;\ 11$. Tìm tứ phân vị thứ nhất, trung vị và tứ phân vị thứ ba.`,
        steps: [
          { claim: R`Hai số giữa là $5$ và $7$, nên trung vị bằng $6$.`, why: "Sáu số, vị trí giữa là số thứ ba và thứ tư. Trung vị là trung bình của đúng hai số đó." },
          { claim: R`Nửa dưới $1;\ 3;\ 5$ có số giữa $3$. Nửa trên $7;\ 9;\ 11$ có số giữa $9$.`, why: "Sáu số chia thành hai nửa ba số. Số $5$ ở lại nửa dưới và số $7$ ở lại nửa trên. Số giữa của mỗi nửa là tứ phân vị tương ứng." },
        ],
        ket: R`Tứ phân vị thứ nhất bằng $3$, trung vị bằng $6$, tứ phân vị thứ ba bằng $9$.`,
        checks: [
          { expr: "Rational(5+7,2)", expect: "6" },
          { expr: "Rational(7+11,2)", expect: "9" },
        ],
      },
      loi: "Lấy tứ phân vị khi dãy chưa xếp tăng, hoặc lấy trung vị của cả dãy làm tứ phân vị thứ nhất.",
      luyen: {
        kind: "luyen",
        prompt: R`Dãy đã xếp $1;\ 2;\ 3;\ 4$. Tìm ba mốc tứ phân vị.`,
        think: "Trung vị là trung bình của $2$ và $3$. Nửa dưới còn $1;\\ 2$ và nửa trên còn $3;\\ 4$.",
        answer: R`Tứ phân vị thứ nhất bằng $\frac{3}{2}$, trung vị bằng $\frac{5}{2}$, tứ phân vị thứ ba bằng $\frac{7}{2}$.`,
        steps: [
          { claim: R`Trung vị bằng $\frac{2+3}{2}=\frac{5}{2}$.`, why: "Bốn số, hai số giữa là số thứ hai và số thứ ba. Chưa dùng hai số đầu mút cho trung vị." },
          { claim: R`Tứ phân vị thứ nhất bằng $\frac{1+2}{2}$ và tứ phân vị thứ ba bằng $\frac{3+4}{2}$.`, why: "Mỗi nửa còn hai số, nên lấy trung bình hai số của nửa đó. Ba mốc lần lượt là $\\frac{3}{2}$, $\\frac{5}{2}$ và $\\frac{7}{2}$." },
        ],
        checks: [
          { expr: "Rational(2+3,2)", expect: "Rational(5,2)" },
          { expr: "Rational(1+2,2)", expect: "Rational(3,2)" },
          { expr: "Rational(3+4,2)", expect: "Rational(7,2)" },
        ],
      },
    },
  ],
  sangTao: [
    {
      kind: "thuc-te",
      sao: 3,
      prompt: R`Số liệu giả định. Một lớp $30$ người chọn $2$ bạn đại diện. Tính số cách khi không phân biệt chức vụ, rồi số cách khi một người là trưởng và người kia là phó.`,
      think: "Không phân biệt chức vụ thì dùng tổ hợp. Có trưởng và phó thì đổi vai làm đổi cách, nên dùng chỉnh hợp. So hai kết quả.",
      answer: "Không phân biệt chức vụ có $435$ cách chọn trong $30$ người. Khi có trưởng và phó thì có $870$ cách.",
      steps: [
        { claim: R`Số cách không kể thứ tự là $C_{30}^2=\frac{30\cdot 29}{2}=435$.`, why: "Mỗi cặp người bị đếm hai lần nếu giữ thứ tự. Chia cho $2!$ để mỗi bộ đại diện còn một cách." },
        { claim: R`Số cách có trưởng và phó là $A_{30}^2=30\cdot 29=870$.`, why: "Đổi hai chức vụ tạo một cách khác. Diễn giải: phân biệt chức vụ làm số cách gấp đôi so với chỉ chọn một cặp người." },
      ],
      checks: [
        { expr: "(30*29)/2", expect: "435" },
        { expr: "30*29", expect: "870" },
      ],
    },
    {
      kind: "thuc-te",
      sao: 3,
      prompt: R`Số liệu giả định. Điểm của $4$ người là $1;\ 2;\ 3;\ 100$. Tính trung vị và trung bình, rồi cho biết điểm $100$ kéo đại lượng nào.`,
      think: "Xếp tăng đã xong. Trung vị lấy hai số giữa. Trung bình lấy tổng $106$ chia cho $4$.",
      answer: R`Trung vị là $\frac{5}{2}$ điểm. Trung bình là $\frac{53}{2}$ điểm, và điểm $100$ của một người kéo trung bình lên khỏi trung vị.`,
      steps: [
        { claim: R`Hai số giữa là $2$ và $3$, nên trung vị bằng $\frac{5}{2}$.`, why: "Bốn người, dãy đã tăng. Trung vị không dùng điểm $100$ vì điểm đó đứng cuối." },
        { claim: R`Trung bình bằng $\frac{106}{4}=\frac{53}{2}$.`, why: "Tổng bốn điểm là $106$. Diễn giải: một người đạt $100$ làm trung bình thành $26{,}5$ điểm, trong khi nửa số người vẫn nằm quanh trung vị $2{,}5$." },
      ],
      checks: [
        { expr: "Rational(2+3,2)", expect: "Rational(5,2)" },
        { expr: "Rational(1+2+3+100,4)", expect: "Rational(53,2)" },
      ],
    },
    {
      kind: "thuc-te",
      sao: 3,
      prompt: R`Số liệu giả định. Điểm của $5$ người là $2;\ 4;\ 4;\ 6;\ 9$. Tính trung bình và phương sai, với phương sai chia cho số người.`,
      think: "Trung bình là $5$. Bình phương từng độ lệch so với $5$, cộng lại rồi chia cho $5$.",
      answer: R`Trung bình là $5$ điểm. Phương sai là $\frac{28}{5}$ điểm$^2$ trên mẫu $5$ người.`,
      steps: [
        { claim: R`Trung bình bằng $\frac{2+4+4+6+9}{5}=5$.`, why: "Tổng $25$ điểm của năm người. Độ lệch phải lấy so với trung bình này." },
        { claim: R`Phương sai bằng $\frac{9+1+1+1+16}{5}=\frac{28}{5}$ điểm$^2$.`, why: "Các độ lệch là $-3;\\ -1;\\ -1;\\ 1;\\ 4$. Diễn giải: phương sai $\\frac{28}{5}$ điểm$^2$ là trung bình các bình phương độ lệch của năm người." },
      ],
      checks: [{ expr: "Rational((2-5)**2+(4-5)**2+(4-5)**2+(6-5)**2+(9-5)**2,5)", expect: "Rational(28,5)" }],
    },
    {
      kind: "thuc-te",
      sao: 3,
      prompt: R`Số liệu giả định. Sáu mốc thời gian đã xếp tăng là $1;\ 3;\ 5;\ 7;\ 9;\ 11$ phút. Tìm tứ phân vị thứ nhất, trung vị và tứ phân vị thứ ba.`,
      think: "Hai mốc giữa là $5$ và $7$ phút. Nửa dưới còn ba mốc đầu, nửa trên còn ba mốc cuối.",
      answer: "Tứ phân vị thứ nhất là $3$ phút, trung vị là $6$ phút và tứ phân vị thứ ba là $9$ phút.",
      steps: [
        { claim: R`Trung vị bằng $\frac{5+7}{2}=6$ phút.`, why: "Sáu mốc, hai số giữa đứng ở vị trí thứ ba và thứ tư. Đơn vị phút được giữ." },
        { claim: R`Tứ phân vị thứ nhất là $3$ phút và tứ phân vị thứ ba là $9$ phút.`, why: "Nửa dưới $1;\\ 3;\\ 5$ có số giữa $3$. Nửa trên $7;\\ 9;\\ 11$ có số giữa $9$. Khoảng từ tứ phân vị thứ nhất đến tứ phân vị thứ ba chạy từ $3$ phút đến $9$ phút." },
      ],
      checks: [
        { expr: "Rational(5+7,2)", expect: "6" },
        { expr: "Rational(1+5,2)", expect: "3" },
      ],
    },
    {
      kind: "mo",
      sao: 2,
      prompt: R`Khi nào đếm bằng quy tắc cộng, và khi nào đếm bằng quy tắc nhân? Hãy nêu mỗi quy tắc kèm một ví dụ một câu.`,
      think: "Nhìn các trường hợp có loại trừ nhau hay là các bước phải làm nối tiếp. Hai ví dụ nên có số nhỏ để kiểm được.",
      answer: "Quy tắc cộng dùng cho các trường hợp loại trừ nhau, chẳng hạn $4$ đường thẳng cộng với $6$ đường qua một điểm giữa thành $10$ cách. Quy tắc nhân dùng cho các bước nối tiếp, chẳng hạn $3$ món với $4$ đồ uống thành $12$ phần ăn.",
      steps: [
        { claim: R`Hai kiểu đường không đi cùng một lúc thì cộng $6+4=10$.`, why: "Mỗi cách đi thuộc đúng một kiểu. Cộng đủ các kiểu loại trừ nhau cho toàn bộ cách." },
        { claim: R`Món và đồ uống phải có cả hai thì nhân $3\cdot 4=12$.`, why: "Mỗi lựa chọn của bước trước ghép với mỗi lựa chọn của bước sau. Nhân là đếm các cặp nối tiếp." },
      ],
      checks: [
        { expr: "6+4", expect: "10" },
        { expr: "3*4", expect: "12" },
      ],
    },
    {
      kind: "phan-bien",
      sao: 3,
      prompt: R`Lớp $30$ người chọn $2$ đại diện, không phân biệt chức vụ. Bạn A tính $30\cdot 29=870$ và dừng. Hãy phản biện.`,
      think: "Tích $30\\cdot 29$ còn kể thứ tự. Khi chức vụ không phân biệt, mỗi cặp đã bị đếm hai lần.",
      answer: "Số cách đúng là $435$. Bạn A đã đếm chỉnh hợp cho một việc không kể thứ tự.",
      steps: [
        { claim: R`Đổi chỗ hai người trong một cặp không tạo chức vụ mới.`, why: "Đề không phân biệt hai suất. Điều kiện không kể thứ tự buộc phải gom hai cách có thứ tự thành một." },
        { claim: R`Số cách là $\frac{30\cdot 29}{2}=435$.`, why: "Chia cho $2!$ vì mỗi cặp có đúng hai thứ tự. Kết quả $870$ lớn gấp đôi số cặp người." },
      ],
      checks: [{ expr: "(30*29)/2", expect: "435" }],
    },
    {
      kind: "doc",
      sao: 2,
      prompt: R`Bảng tần số của $10$ người có $2$ người ở mốc $5$, $3$ người ở mốc $15$ và $5$ người ở mốc $25$. Hãy đọc bảng và tính trung bình.`,
      think: "Nhân mỗi mốc với số người, cộng ba tích, rồi chia cho tổng số người.",
      answer: "Trung bình của $10$ người là $18$.",
      steps: [
        { claim: R`Tổng điểm bằng $2\cdot 5+3\cdot 15+5\cdot 25=180$.`, why: "Đọc đúng ba cột tần số. Mỗi người ở một mốc đóng góp đúng giá trị mốc đó." },
        { claim: R`Trung bình bằng $\frac{180}{10}=18$.`, why: "Mẫu số là tổng số người, tức $2+3+5=10$. Trung bình này là điểm bình quân của cả bảng." },
      ],
      checks: [{ expr: "Rational(2*5+3*15+5*25,10)", expect: "18" }],
    },
    {
      kind: "uoc-luong",
      sao: 2,
      prompt: R`Ước lượng $C_{100}^2$ bằng cách chặn giữa $4000$ và $5000$, rồi tính đúng.`,
      think: "Viết $\\frac{100\\cdot 99}{2}$. So kết quả với hai mốc nguyên đã cho.",
      answer: R`Giá trị đúng là $4950$, nên $4000<C_{100}^2<5000$. Số này kém $5000$ đúng $50$ đơn vị.`,
      steps: [
        { claim: R`Ta có $C_{100}^2=\frac{100\cdot 99}{2}=4950$.`, why: "Tổ hợp chập $2$ chia tích có thứ tự cho $2$. Phép này ra đúng $4950$, chưa làm tròn." },
        { claim: R`Vì $4950-4000=950$ và $5000-4950=50$, giá trị nằm giữa hai mốc.`, why: "Hai hiệu đều dương. Ước lượng hai đầu đúng, và giá trị sát mốc $5000$ hơn." },
      ],
      checks: [
        { expr: "(100*99)/2", expect: "4950" },
        { expr: "5000-4950", expect: "50" },
      ],
    },
    {
      kind: "tu-ra-de",
      sao: 4,
      prompt: R`Bài xuất phát: chọn $2$ bạn trong $30$ người, không phân biệt chức vụ, có $435$ cách. Hãy đổi giả thiết thành có phân biệt trưởng và phó, dự đoán số cách tăng hay giảm, rồi tính.`,
      think: "Phân biệt hai chức vụ làm mỗi cặp người ứng với hai cách. Dự đoán số cách nhân đôi, rồi mới tính chỉnh hợp.",
      answer: "Dự đoán số cách tăng gấp đôi. Khi có trưởng và phó thì có $870$ cách.",
      steps: [
        { claim: R`Đổi từ không kể thứ tự sang có hai chức vụ khác nhau.`, why: "Mỗi cặp vô hướng tách thành hai cách gán chức vụ. Dự đoán số cách mới lớn hơn $435$." },
        { claim: R`Số cách mới là $30\cdot 29=870$.`, why: "Chỉnh hợp chập $2$ của $30$ người. Kết quả đúng gấp đôi tổ hợp, khớp dự đoán nhân đôi." },
      ],
      checks: [{ expr: "30*29", expect: "870" }],
    },
  ],
};
