import type { TopicDang } from "./types.ts";

const R = String.raw;

export const surveyDang: TopicDang = {
  id: "survey",
  title: "Khảo sát hàm số",
  dang: [
    {
      name: "Cực trị của hàm bậc ba",
      nhanDang: "Hàm bậc ba, hỏi số điểm cực trị hoặc tọa độ cực trị.",
      phuongPhap: R`Đạo hàm bậc ba là một tam thức bậc hai. Điều kiện có hai cực trị là tam thức đó có hai nghiệm phân biệt và đổi dấu tại mỗi nghiệm. Chỉ viết $y'=0$ mới là điều kiện cần.`,
      viDu: {
        prompt: R`Tìm cực trị của $y=x^3-3x$.`,
        steps: [
          { claim: R`Ta có $y'=3x^2-3=3(x-1)(x+1)$.`, why: "Phân tích để thấy rõ hai nghiệm." },
          { claim: R`Ta có $y'$ đổi từ dương sang âm tại $x=-1$, và từ âm sang dương tại $x=1$.`, why: "Hệ số $3>0$ nên đạo hàm âm chỉ giữa hai nghiệm. Đổi dấu là điều kiện đủ." },
          { claim: R`Ta có $y(-1)=2$ và $y(1)=-2$.`, why: "Tọa độ đủ gồm cả tung độ, lấy bằng giá trị hàm tại hoành độ vừa tìm." },
        ],
        ket: R`Hàm có cực đại $(-1;2)$ và cực tiểu $(1;-2)$.`,
        check: { expr: "(-1)**3-3*(-1)", expect: "2" },
      },
      loi: "Gọi mọi nghiệm của $y'=0$ là cực trị khi đạo hàm không đổi dấu.",
      luyen: {
        kind: "luyen",
        prompt: R`Hàm $y=x^3-3x+2$ có tung độ cực đại bằng bao nhiêu?`,
        think: "Cùng đạo hàm với $x^3-3x$. Cực đại vẫn ở $x=-1$, nhưng tung độ phải tính lại trên hàm mới.",
        answer: "Đáp số là $4$",
        steps: [
          { claim: R`Đạo hàm vẫn là $3x^2-3$, cực đại tại $x=-1$.`, why: "Hằng số không đổi đạo hàm và không đổi chỗ đổi dấu." },
          { claim: R`Ta có $y(-1)=-1+3+2=4$.`, why: "Thay vào đúng hàm của đề." },
        ],
        check: { expr: "(-1)**3-3*(-1)+2", expect: "4" },
      },
    },
    {
      name: "Tiệm cận của phân thức bậc nhất",
      nhanDang: R`Hàm $y=\frac{ax+b}{cx+d}$ với $c\neq 0$, hỏi tiệm cận.`,
      phuongPhap: R`Tiệm cận đứng là đường $x=-\frac{d}{c}$ khi tử không triệt tiêu cùng chỗ với mẫu. Tiệm cận ngang là $y=\frac{a}{c}$. Hai điều này đọc từ bậc bằng nhau của tử và mẫu. Nếu tử cũng bằng $0$ tại điểm làm mẫu bằng $0$ thì phải rút gọn trước, chưa được kết luận tiệm cận đứng.`,
      viDu: {
        prompt: R`Tìm tiệm cận của $y=\frac{2x+1}{x-1}$.`,
        steps: [
          { claim: R`Mẫu bằng $0$ tại $x=1$, tử bằng $3\neq 0$.`, why: "Tử và mẫu không có nghiệm chung, nên đồ thị thực sự không xác định tại đó và hai bên tiến ra vô cực." },
          { claim: R`Khi $x$ tiến ra vô cực, thương tiến tới $2$.`, why: R`Bậc tử và mẫu cùng bằng $1$, tỉ số hệ số cao nhất là $\frac{2}{1}$.` },
        ],
        ket: R`Đồ thị có tiệm cận đứng $x=1$ và tiệm cận ngang $y=2$.`,
        check: { expr: "(2*10+1)/(10-1)", expect: "21/9" },
      },
      loi: "Viết tiệm cận đứng mọi lúc mẫu bằng $0$, kể cả khi phân thức rút gọn được.",
      luyen: {
        kind: "luyen",
        prompt: R`Tiệm cận ngang của $y=\frac{5x-1}{2x+3}$ là đường nào?`,
        think: "Chỉ cần tỉ số hai hệ số bậc nhất, sau khi đã thấy bậc tử và mẫu bằng nhau.",
        answer: R`Đáp số là $y=\frac{5}{2}$`,
        steps: [
          { claim: R`Bậc tử và bậc mẫu cùng bằng $1$.`, why: "Khi đó có đúng một tiệm cận ngang, không có tiệm cận xiên." },
          { claim: R`Tỉ số hệ số là $\frac{5}{2}$.`, why: "Chia tử và mẫu cho $x$ rồi cho $x$ ra vô cực." },
        ],
        check: { expr: "5/2", expect: "Rational(5,2)" },
      },
    },
  ],
  sangTao: [
    {
      kind: "thuc-te",
      prompt: R`Doanh thu bán $x$ trăm vé là $R(x)=x(12-x)$ triệu đồng, với $0\le x\le 12$. Doanh thu lớn nhất bằng bao nhiêu?`,
      think: "Hàm bậc hai quay xuống. Đỉnh trong đoạn thì so với hai đầu; nếu đỉnh ngoài đoạn thì lớn nhất ở đầu gần đỉnh hơn.",
      answer: "Đáp số là $36$ triệu đồng",
      steps: [
        { claim: R`Ta có $R(x)=12x-x^2$ có đỉnh $x=6$, nằm trong $[0;12]$.`, why: R`Hoành độ đỉnh $-\frac{b}{2a}=6$.` },
        { claim: R`Ta có $R(6)=36$, trong khi $R(0)=R(12)=0$.`, why: "Trên đoạn đóng, giá trị lớn nhất là số lớn nhất tại đỉnh và hai đầu mút." },
      ],
      check: { expr: "6*(12-6)", expect: "36" },
    },
    {
      kind: "thuc-te",
      prompt: R`Nồng độ một chất là $C(t)=\frac{4t}{t+1}$ với $t>0$. Nồng độ có vượt quá $4$ không?`,
      think: "Nhìn tiệm cận ngang và dấu của hiệu $4-C(t)$.",
      answer: "Không vượt quá $4$.",
      steps: [
        { claim: R`Ta có $4-C(t)=\frac{4}{t+1}>0$ với mọi $t>0$.`, why: "Quy đồng. Tử và mẫu đều dương nên hiệu luôn dương." },
        { claim: R`Vậy $C(t)<4$ với mọi $t>0$, và tiến tới $4$ khi $t$ lớn.`, why: "Hiệu dương chặt nên không đạt $4$. Tiệm cận ngang là $4$." },
      ],
      check: { expr: "4*5/(5+1)", expect: "10/3" },
    },
    {
      kind: "thuc-te",
      prompt: R`Một thùng không nắp gập từ tấm tôn vuông cạnh $12$ dm, cắt bốn ô vuông cạnh $x$ dm ở góc, $0<x<6$. Thể tích $V(x)=x(12-2x)^2$. Giá trị $V(2)$ bằng bao nhiêu?`,
      think: "Chưa cần cực trị. Câu chỉ hỏi một giá trị, nên thay số và khai triển đúng.",
      answer: "Đáp số là $128$ đêximét khối",
      steps: [
        { claim: R`Khi $x=2$, đáy là hình vuông cạnh $8$.`, why: "Mỗi chiều mất hai lần $x$." },
        { claim: R`Ta có $V(2)=2\cdot 64=128$.`, why: "Thể tích hộp bằng diện tích đáy nhân chiều cao." },
      ],
      check: { expr: "2*(12-4)**2", expect: "128" },
    },
    {
      kind: "thuc-te",
      prompt: R`Hàm lợi nhuận $P(x)=-x^2+8x-7$ với $x$ là số trăm sản phẩm, $x\ge 0$. Lợi nhuận đạt cực đại tại $x$ bằng bao nhiêu?`,
      think: R`Parabol quay xuống, cực đại tại đỉnh nếu đỉnh nằm trong miền $x\ge 0$.`,
      answer: "Đáp số là $x=4$",
      steps: [
        { claim: R`Đỉnh có hoành độ $-\frac{8}{2\cdot(-1)}=4$.`, why: "Công thức đỉnh cho hàm bậc hai." },
        { claim: R`Ta có $4>0$ nên điểm này được nhận, và vì $a<0$ đây là cực đại. `, why: "Miền đang xét chứa đỉnh. Hệ số bậc hai âm nên đỉnh là điểm cao nhất." },
      ],
      check: { expr: "-8/(2*(-1))", expect: "4" },
    },
    {
      kind: "tu-ra-de",
      prompt: "Hãy tự đặt một bài tìm cực trị của hàm bậc ba có đạo hàm là tam thức bậc hai dễ phân tích. Đề mẫu ở lời giải dùng $y=x^3-3x^2$.",
      think: "Đề cần hỏi tọa độ, không chỉ hỏi nghiệm của đạo hàm. Lời giải phải nói chỗ đạo hàm đổi dấu.",
      answer: R`Cực đại $(0;0)$ và cực tiểu $(2;-4)$.`,
      steps: [
        { claim: R`Đề mẫu: tìm cực trị của $y=x^3-3x^2$.`, why: "Đề nêu rõ hàm và yêu cầu cực trị." },
        { claim: R`Ta có $y'=3x^2-6x=3x(x-2)$.`, why: "Hai nghiệm $0$ và $2$ phân biệt." },
        { claim: R`Đạo hàm đổi dấu tại cả hai nghiệm. $y(0)=0$, $y(2)=8-12=-4$.`, why: "Đổi dấu là điều kiện đủ. Tung độ lấy từ hàm gốc." },
      ],
      check: { expr: "2**3-3*2**2", expect: "-4" },
    },
  ],
};
