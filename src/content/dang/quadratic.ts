import type { TopicDang } from "./types.ts";

const R = String.raw;

export const quadraticDang: TopicDang = {
  id: "quadratic",
  title: "Hàm số bậc hai",
  dang: [
    {
      name: "Giải phương trình bậc hai",
      nhanDang: R`Phương trình $ax^2+bx+c=0$ với $a\neq 0$, hỏi nghiệm thực.`,
      phuongPhap: R`Đặt $\Delta=b^2-4ac$. Trong số thực, $\Delta>0$ tương đương có hai nghiệm phân biệt, $\Delta=0$ tương đương có nghiệm kép, $\Delta<0$ tương đương vô nghiệm. Công thức $x=\frac{-b\pm\sqrt{\Delta}}{2a}$ chỉ dùng khi $\Delta\ge 0$. Nếu đề thêm điều kiện phụ, chẳng hạn nghiệm dương, thì $\Delta>0$ mới là điều kiện cần. Phải thử lại từng nghiệm.`,
      viDu: {
        prompt: R`Giải $x^2-5x+6=0$.`,
        steps: [
          { claim: R`Ta có $a=1\neq 0$ và $\Delta=25-24=1>0$.`, why: "Xác nhận đúng bậc hai, rồi tính biệt thức." },
          { claim: R`Có đúng hai nghiệm thực phân biệt.`, why: R`Dấu của $\Delta$ là điều kiện cần và đủ trong $\mathbb{R}$.` },
          { claim: R`Ta có $x=\frac{5\pm 1}{2}$, nên $x=3$ hoặc $x=2$.`, why: "Công thức nghiệm. Không có điều kiện phụ nên cả hai nghiệm được nhận." },
        ],
        ket: "Nghiệm là $x=2$ và $x=3$.",
        check: { expr: "25-24", expect: "1" },
      },
      loi: "Dùng công thức nghiệm khi $a=0$, hoặc nhận cả nghiệm không thỏa điều kiện phụ của đề.",
      luyen: {
        kind: "luyen",
        prompt: R`Giải $x^2-2x-3=0$.`,
        think: R`Tính $\Delta$ trước. Nếu dương thì viết đủ hai nghiệm, đừng chỉ lấy nghiệm dương.`,
        answer: "Đáp số là $x=-1$ hoặc $x=3$",
        steps: [
          { claim: R`Ta có $\Delta=4+12=16>0$.`, why: R`Vì $b^2-4ac=(-2)^2-4\cdot 1\cdot(-3)$.` },
          { claim: R`Ta có $x=\frac{2\pm 4}{2}$, tức $x=3$ hoặc $x=-1$.`, why: "Công thức nghiệm, không điều kiện phụ." },
        ],
        check: { expr: "4-4*1*(-3)", expect: "16" },
      },
    },
    {
      name: "Đỉnh và giá trị lớn nhất, nhỏ nhất",
      nhanDang: R`Parabol $y=ax^2+bx+c$, hỏi đỉnh hoặc giá trị lớn nhất, nhỏ nhất trên $\mathbb{R}$ hay trên một đoạn.`,
      phuongPhap: R`Hoành độ đỉnh $x=-\frac{b}{2a}$ là điều kiện cần và đủ của điểm dừng, vì đạo hàm $2ax+b$ chỉ có một nghiệm. Nếu $a>0$, đỉnh là giá trị nhỏ nhất trên $\mathbb{R}$. Nếu $a<0$, đỉnh là giá trị lớn nhất. Trên một đoạn, vẫn phải so với hai đầu mút khi đỉnh nằm trong đoạn, và chỉ so hai đầu mút khi đỉnh nằm ngoài.`,
      viDu: {
        prompt: R`Tìm giá trị nhỏ nhất của $y=x^2-4x+1$ trên $\mathbb{R}$.`,
        steps: [
          { claim: R`Ta có $a=1>0$, nên parabol có giá trị nhỏ nhất tại đỉnh.`, why: "Hệ số bậc hai dương. Đây là điều kiện đủ cho cực tiểu toàn cục." },
          { claim: R`Hoành độ đỉnh bằng $-\frac{-4}{2}=2$.`, why: "Công thức đỉnh." },
          { claim: R`Ta có $y(2)=4-8+1=-3$.`, why: R`Thay hoành độ vào hàm. Không lấy $\Delta$ làm tung độ.` },
        ],
        ket: "Giá trị nhỏ nhất bằng $-3$, đạt tại $x=2$.",
        check: { expr: "2**2-4*2+1", expect: "-3" },
      },
      loi: R`Dùng $\Delta$ để thay cho tung độ đỉnh.`,
      luyen: {
        kind: "luyen",
        prompt: R`Tìm đỉnh của $y=x^2-2x-3$.`,
        think: R`Hoành độ theo $-\frac{b}{2a}$, tung độ bằng giá trị hàm, không đổi dấu tùy tiện.`,
        answer: "Đáp số là $(1;-4)$",
        steps: [
          { claim: R`Hoành độ bằng $-\frac{-2}{2}=1$.`, why: "Công thức đỉnh với $a=1$, $b=-2$." },
          { claim: R`Ta có $y(1)=1-2-3=-4$.`, why: "Thay vào hàm." },
        ],
        check: { expr: "1-2-3", expect: "-4" },
      },
    },
  ],
  sangTao: [
    {
      kind: "thuc-te",
      prompt: R`Dùng $36$ mét lưới rào ba phía của một chuồng chữ nhật, phía còn lại là tường. Diện tích lớn nhất bằng bao nhiêu mét vuông?`,
      think: "Gọi cạnh vuông góc tường là $x$. Viết miền $x$ để cạnh kia còn dương, rồi tìm đỉnh của hàm bậc hai.",
      answer: "Đáp số là $162$ mét vuông",
      steps: [
        { claim: R`Với $0<x<18$, cạnh song song tường là $36-2x$ và $S(x)=36x-2x^2$.`, why: "Hai cạnh vuông góc dùng $2x$ mét lưới." },
        { claim: R`Ta có $S'(x)=36-4x=0$ khi $x=9$, và $S'$ đổi từ dương sang âm.`, why: "Điều kiện cần, rồi đổi dấu cho điều kiện đủ của cực đại." },
        { claim: R`Ta có $S(9)=9\cdot 18=162$.`, why: "Cạnh còn lại $36-18=18$. Điểm nằm trong miền mở." },
      ],
      check: { expr: "9*(36-18)", expect: "162" },
    },
    {
      kind: "thuc-te",
      prompt: R`Một quả bóng được ném theo $h(t)=-5t^2+20t+1$ mét, $t\ge 0$. Độ cao lớn nhất bằng bao nhiêu?`,
      think: "Hệ số bậc hai âm nên đỉnh là độ cao lớn nhất, miễn thời điểm đỉnh không âm.",
      answer: "Đáp số là $21$ mét",
      steps: [
        { claim: R`Hoành độ đỉnh $t=-\frac{20}{2\cdot(-5)}=2$.`, why: R`Công thức đỉnh. $t=2\ge 0$ nên nhận.` },
        { claim: R`Ta có $h(2)=-20+40+1=21$.`, why: "Thay vào hàm. Vì $a<0$, đây là giá trị lớn nhất." },
      ],
      check: { expr: "-5*4+20*2+1", expect: "21" },
    },
    {
      kind: "thuc-te",
      prompt: R`Cổng parabol có phương trình $y=4-x^2$ trên mặt cắt, đơn vị mét, đáy trên trục hoành. Chiều cao cổng bằng bao nhiêu?`,
      think: "Chiều cao là tung độ đỉnh. Hệ số $a$ âm nên đỉnh ở trên.",
      answer: "Đáp số là $4$ mét",
      steps: [
        { claim: R`Đỉnh có hoành độ $0$ vì không có hạng tử bậc một.`, why: R`Vì $-\frac{b}{2a}=0$.` },
        { claim: R`Tung độ bằng $4$.`, why: "Thay $x=0$ vào $4-x^2$." },
      ],
      check: { expr: "4-0", expect: "4" },
    },
    {
      kind: "thuc-te",
      prompt: R`Lợi nhuận $P(x)=-2x^2+8x-3$, với $x>0$ là số trăm sản phẩm. Hoành độ của điểm lợi nhuận cao nhất bằng bao nhiêu?`,
      think: "Chỉ hỏi hoành độ đỉnh, chưa cần tung độ. Kiểm tra hoành độ dương.",
      answer: "Đáp số là $x=2$",
      steps: [
        { claim: R`Ta có $x=-\frac{8}{2\cdot(-2)}=2$.`, why: "Công thức đỉnh." },
        { claim: R`Ta có $2>0$ nên điểm này thuộc miền đang bán.`, why: "Miền $x>0$ chứa đỉnh, và $a<0$ nên đỉnh là chỗ cao nhất." },
      ],
      check: { expr: "-8/(2*(-2))", expect: "2" },
    },
    {
      kind: "tu-ra-de",
      prompt: R`Hãy tự đặt một phương trình bậc hai có $\Delta$ là số chính phương, rồi giải đủ hai nghiệm. Đề mẫu: $x^2-4x+3=0$.`,
      think: R`Tính $\Delta$ và nêu rõ $\Delta>0$ trước khi viết hai nghiệm. Kết luận phải là tập nghiệm, không phải giá trị $\Delta$.`,
      answer: "Nghiệm mẫu là $x=1$ và $x=3$.",
      steps: [
        { claim: R`Ta có $\Delta=16-12=4>0$.`, why: "Điều kiện cần và đủ để có hai nghiệm phân biệt." },
        { claim: R`Ta có $x=\frac{4\pm 2}{2}$, nên $x=3$ hoặc $x=1$.`, why: "Công thức nghiệm." },
      ],
      check: { expr: "16-12", expect: "4" },
    },
  ],
};
