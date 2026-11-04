import type { TopicDang } from "./types.ts";

const R = String.raw;

export const comboDang: TopicDang = {
  id: "combo",
  title: "Tổ hợp và thống kê",
  dang: [
    {
      name: "Chọn có thứ tự hay không",
      nhanDang: "Bài đếm số cách chọn hoặc sắp xếp một nhóm từ một tập hữu hạn.",
      phuongPhap: R`Nếu đổi thứ tự ra một cách khác thì dùng chỉnh hợp $A_n^k=\frac{n!}{(n-k)!}$. Nếu không kể thứ tự thì dùng tổ hợp $C_n^k=\frac{n!}{k!(n-k)!}$. Hai công thức chỉ khác nhau ở chỗ có chia cho $k!$ hay không. Dùng nhầm công thức không phải xấp xỉ, mà đếm sai bài toán.`,
      viDu: {
        prompt: R`Có $10$ học sinh. Số cách chọn $3$ bạn đi trực nhật, không phân biệt vai trò, bằng bao nhiêu?`,
        steps: [
          { claim: R`Không phân biệt vai trò nên không kể thứ tự.`, why: "Đề nói chọn, không nói xếp chức vụ." },
          { claim: R`Ta có $C_{10}^3=\frac{10\cdot 9\cdot 8}{6}=120$.`, why: "Chia cho $3!$ vì mỗi bộ ba bị đếm $6$ lần trong tích có thứ tự." },
        ],
        ket: "Có $120$ cách.",
        check: { expr: "(10*9*8)/6", expect: "120" },
      },
      loi: "Dùng $A_{10}^3=720$ cho một việc không phân biệt thứ tự.",
      luyen: {
        kind: "luyen",
        prompt: R`Số mật khẩu $3$ chữ số khác nhau lập từ $\{1;2;3;4;5\}$, có kể thứ tự, bằng bao nhiêu?`,
        think: "Chữ số đứng trước hay sau làm đổi mật khẩu, nên đây là chỉnh hợp.",
        answer: "Đáp số là $60$",
        steps: [
          { claim: R`Có thứ tự và không lặp.`, why: "Đề đòi các chữ số khác nhau và mật khẩu đổi khi đảo chữ số." },
          { claim: R`Ta có $A_5^3=5\cdot 4\cdot 3=60$.`, why: "Chọn dần từng vị trí, mỗi bước bớt một chữ số." },
        ],
        check: { expr: "5*4*3", expect: "60" },
      },
    },
    {
      name: "Trung bình và trung vị",
      nhanDang: "Một dãy số liệu, hỏi trung bình cộng hoặc trung vị.",
      phuongPhap: R`Trung bình cộng là tổng chia cho số phần tử. Trung vị là số ở giữa sau khi xếp tăng. Nếu số phần tử chẵn thì trung vị là trung bình cộng của hai số giữa. Một giá trị rất lớn kéo trung bình nhưng có thể không đổi trung vị. Hai đại lượng này không tương đương.`,
      viDu: {
        prompt: "Dãy điểm $2, 4, 4, 6, 9$. Trung bình và trung vị bằng bao nhiêu?",
        steps: [
          { claim: R`Tổng bằng $25$, có $5$ số, trung bình bằng $5$.`, why: "Định nghĩa trung bình cộng." },
          { claim: R`Dãy đã tăng, số đứng giữa là số thứ ba, bằng $4$.`, why: "Số phần tử lẻ nên có đúng một vị trí giữa." },
        ],
        ket: "Trung bình bằng $5$, trung vị bằng $4$.",
        check: { expr: "Rational(2+4+4+6+9,5)", expect: "5" },
      },
      loi: "Lấy trung vị trước khi xếp dãy tăng.",
      luyen: {
        kind: "luyen",
        prompt: R`Hệ số của $x^2$ trong $(1+2x)^5$ bằng bao nhiêu?`,
        think: "Số hạng tổng quát là $C_5^k(2x)^k$. Cần $k=2$.",
        answer: "Đáp số là $40$",
        steps: [
          { claim: R`Lấy $k=2$.`, why: "Muốn số mũ của $x$ bằng $2$." },
          { claim: R`Ta có $C_5^2\cdot 2^2=10\cdot 4=40$.`, why: "Nhị thức Newton." },
        ],
        check: { expr: "10*4", expect: "40" },
      },
    },
  ],
  sangTao: [
    {
      kind: "thuc-te",
      prompt: R`Một lớp $30$ học sinh chọn $2$ bạn đại diện, không phân biệt trưởng và phó. Số cách bằng bao nhiêu?`,
      think: "Không phân biệt chức vụ thì dùng tổ hợp, không dùng chỉnh hợp.",
      answer: "Đáp số là $435$",
      steps: [
        { claim: R`Ta có $C_{30}^2=\frac{30\cdot 29}{2}$.`, why: "Mỗi cặp bị đếm hai lần nếu giữ thứ tự." },
        { claim: R`Thương bằng $435$.`, why: R`Vì $30\cdot 29=870$, chia $2$ được $435$.` },
      ],
      check: { expr: "(30*29)/2", expect: "435" },
    },
    {
      kind: "thuc-te",
      prompt: "Bốn mức giờ ngủ trong một nhóm là $6, 7, 7, 8$ giờ. Trung vị bằng bao nhiêu?",
      think: "Bốn số đã xếp tăng. Trung vị là trung bình của hai số giữa.",
      answer: "Đáp số là $7$ giờ",
      steps: [
        { claim: R`Hai số giữa là $7$ và $7$.`, why: "Dãy chẵn phần tử, vị trí giữa là thứ hai và thứ ba." },
        { claim: R`Trung vị bằng $7$.`, why: "Trung bình của hai số bằng nhau vẫn là số đó." },
      ],
      check: { expr: "Rational(7+7,2)", expect: "7" },
    },
    {
      kind: "thuc-te",
      prompt: "Điểm một nhóm là $1, 2, 3, 100$. Trung vị bằng bao nhiêu, và vì sao nó không bằng trung bình?",
      think: "Xếp tăng xong hãy lấy hai số giữa. Trung bình bị điểm $100$ kéo đi.",
      answer: R`Trung vị $2{,}5$. Trung bình bằng $26{,}5$.`,
      steps: [
        { claim: R`Hai số giữa là $2$ và $3$, trung vị $\frac{5}{2}$.`, why: "Bốn số, đã xếp tăng." },
        { claim: R`Trung bình $\frac{106}{4}=\frac{53}{2}$.`, why: "Tổng $106$. Điểm $100$ làm trung bình khác trung vị." },
      ],
      check: { expr: "Rational(2+3,2)", expect: "Rational(5,2)" },
    },
    {
      kind: "thuc-te",
      prompt: R`Một cửa hàng xếp $4$ món quà khác nhau vào $4$ hộp theo hàng. Số cách xếp bằng bao nhiêu?`,
      think: "Xếp đủ và có thứ tự vị trí hộp, nên là hoán vị $4!$.",
      answer: "Đáp số là $24$",
      steps: [
        { claim: R`Hộp thứ nhất có $4$ cách, rồi $3$, rồi $2$, rồi $1$.`, why: "Mỗi món chỉ vào một hộp." },
        { claim: R`Tích bằng $24$.`, why: "Vì $4!=24$." },
      ],
      check: { expr: "4*3*2*1", expect: "24" },
    },
    {
      kind: "tu-ra-de",
      prompt: R`Hãy tự đặt một bài đếm, và ghi rõ có kể thứ tự hay không. Đề mẫu: chọn $2$ chữ cái khác nhau từ $\{A,B,C,D\}$, không kể thứ tự.`,
      think: "Câu chữ chọn hay xếp quyết định tổ hợp hay chỉnh hợp. Phải viết lý do trước công thức.",
      answer: "Đề mẫu có $6$ cách.",
      steps: [
        { claim: R`Không kể thứ tự nên dùng $C_4^2$.`, why: R`Bộ $\{A,B\}$ trùng bộ $\{B,A\}$.` },
        { claim: R`Ta có $C_4^2=6$.`, why: R`Vì $\frac{4\cdot 3}{2}=6$.` },
      ],
      check: { expr: "(4*3)/2", expect: "6" },
    },
  ],
};
