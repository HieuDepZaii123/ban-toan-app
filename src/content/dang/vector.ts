import type { TopicDang } from "./types.ts";

const R = String.raw;

export const vectorDang: TopicDang = {
  id: "vector",
  title: "Vectơ",
  dang: [
    {
      name: "Độ dài và góc",
      nhanDang: "Cho hai vectơ tọa độ, hỏi độ dài hoặc côsin góc giữa chúng.",
      phuongPhap: R`Tích vô hướng trong mặt phẳng là $x_1x_2+y_1y_2$. Độ dài là căn tổng bình phương, lấy giá trị không âm. Công thức côsin là $\cos(\vec u,\vec v)=\frac{\vec u\cdot\vec v}{|\vec u||\vec v|}$ khi cả hai vectơ khác $\vec 0$. Mẫu khác $0$ là điều kiện cần để viết côsin. Kết quả côsin phải nằm trong $[-1;1]$. Nếu ra ngoài đoạn đó thì đã tính sai, không phải một góc thật.`,
      viDu: {
        prompt: R`Cho $\vec u=(1;2)$ và $\vec v=(3;-1)$. Tính $\cos(\vec u,\vec v)$.`,
        steps: [
          { claim: R`Ta có $\vec u\cdot\vec v=3-2=1$.`, why: "Nhân từng tọa độ rồi cộng." },
          { claim: R`Ta có $|\vec u|=\sqrt{5}$ và $|\vec v|=\sqrt{10}$.`, why: R`Cả hai khác $\vec 0$, nên được viết côsin.` },
          { claim: R`Côsin bằng $\frac{1}{\sqrt{50}}=\frac{\sqrt{2}}{10}$.`, why: R`Vì $\sqrt{5}\cdot\sqrt{10}=\sqrt{50}=5\sqrt{2}$, rồi hữu tỉ hóa.` },
        ],
        ket: R`Kết quả là $\cos(\vec u,\vec v)=\frac{\sqrt{2}}{10}$.`,
        check: { expr: "1/sqrt(50)", expect: "sqrt(2)/10" },
      },
      loi: "Cộng độ dài hai vectơ để ra độ dài tổng, khi hai vectơ không cùng phương.",
      luyen: {
        kind: "luyen",
        prompt: R`Tính độ dài của $\vec w=(2;1;2)$.`,
        think: "Ba tọa độ thì vẫn lấy căn tổng bình phương. Kết quả không âm.",
        answer: "Đáp số là $3$",
        steps: [
          { claim: R`Ta có $|\vec w|=\sqrt{4+1+4}$.`, why: "Định nghĩa độ dài trong không gian." },
          { claim: R`Ta có $\sqrt{9}=3$.`, why: "Vì $4+1+4=9$." },
        ],
        check: { expr: "sqrt(4+1+4)", expect: "3" },
      },
    },
    {
      name: "Vuông góc",
      nhanDang: "Bài hỏi điều kiện hai vectơ vuông góc, thường còn tham số.",
      phuongPhap: R`Với hai vectơ đã cho, vuông góc tương đương tích vô hướng bằng $0$. Đây là điều kiện cần và đủ, kể cả khi một vectơ bằng $\vec 0$ theo quy ước độ dài không. Nếu đề thêm yêu cầu vectơ khác $\vec 0$ thì phải loại nghiệm làm vectơ đó thành vectơ không.`,
      viDu: {
        prompt: R`Tìm $m$ để $\vec u=(2;3)$ vuông góc với $\vec v=(m;-2)$.`,
        steps: [
          { claim: R`Tích vô hướng bằng $2m-6$.`, why: "Nhân tọa độ tương ứng." },
          { claim: R`Vuông góc khi và chỉ khi $2m-6=0$, tức $m=3$.`, why: R`Điều kiện cần và đủ. Vectơ $\vec v=(3;-2)$ khác $\vec 0$, không bị loại.` },
        ],
        ket: "Kết quả là $m=3$.",
        check: { expr: "2*3+3*(-2)", expect: "0" },
      },
      loi: "Đặt tỉ số tọa độ bằng nhau để kết luận vuông góc. Đẳng thức tỉ số là điều kiện cùng phương.",
      luyen: {
        kind: "luyen",
        prompt: R`Cho $A(1;0)$ và $B(3;4)$. Tính độ dài $AB$.`,
        think: "Độ dài đoạn bằng độ dài vectơ hiệu.",
        answer: R`Đáp số là $2\sqrt{5}$`,
        steps: [
          { claim: R`Ta có $\overrightarrow{AB}=(2;4)$.`, why: "Trừ tọa độ." },
          { claim: R`Ta có $AB=\sqrt{4+16}=\sqrt{20}=2\sqrt{5}$.`, why: "Đưa thừa số chính phương ra ngoài căn." },
        ],
        check: { expr: "sqrt(4+16)", expect: "2*sqrt(5)" },
      },
    },
  ],
  sangTao: [
    {
      kind: "thuc-te",
      prompt: R`Một thuyền chịu gió $(3;0)$ và dòng nước $(0;4)$, đơn vị hải lý mỗi giờ. Tốc độ hợp lực bằng bao nhiêu?`,
      think: "Hai vectơ vuông góc nên độ dài tổng là căn tổng bình phương, không phải tổng độ dài.",
      answer: "Đáp số là $5$ hải lý mỗi giờ",
      steps: [
        { claim: R`Vectơ tổng là $(3;4)$.`, why: "Cộng từng tọa độ." },
        { claim: R`Độ dài $\sqrt{9+16}=5$.`, why: "Pythagore, vì hai thành phần vuông góc." },
      ],
      check: { expr: "sqrt(9+16)", expect: "5" },
    },
    {
      kind: "thuc-te",
      prompt: R`Lực $(2;0)$ tác dụng khi vật dịch chuyển theo $(3;0)$. Công bằng bao nhiêu, nếu đơn vị chọn sao cho công là tích vô hướng?`,
      think: "Công của lực không đổi là tích vô hướng với độ dời. Cùng hướng nên bằng tích độ lớn.",
      answer: "Đáp số là $6$",
      steps: [
        { claim: R`Tích vô hướng bằng $2\cdot 3+0\cdot 0$.`, why: "Định nghĩa theo tọa độ." },
        { claim: R`Kết quả bằng $6$.`, why: "Không còn thành phần nào khác." },
      ],
      check: { expr: "2*3", expect: "6" },
    },
    {
      kind: "thuc-te",
      prompt: R`Một camera nhìn theo vectơ $(1;0)$, lối đi theo vectơ $(0;1)$. Hai hướng có vuông góc không?`,
      think: "Tính một tích vô hướng. Bằng $0$ thì vuông góc, đó là điều kiện cần và đủ.",
      answer: "Có, hai hướng vuông góc.",
      steps: [
        { claim: R`Tích vô hướng bằng $0$.`, why: R`Vì $1\cdot 0+0\cdot 1=0$.` },
        { claim: R`Vậy hai vectơ vuông góc.`, why: R`Điều kiện cần và đủ, và cả hai vectơ đều khác $\vec 0$.` },
      ],
      check: { expr: "1*0+0*1", expect: "0" },
    },
    {
      kind: "thuc-te",
      prompt: R`Từ trạm $A(0;0)$ đến trạm $B(6;8)$, đường chim bay dài bao nhiêu kilômét?`,
      think: "Độ dài vectơ $(6;8)$.",
      answer: "Đáp số là $10$ kilômét",
      steps: [
        { claim: R`Ta có $\sqrt{36+64}=\sqrt{100}$.`, why: "Tổng bình phương hai thành phần." },
        { claim: R`Độ dài bằng $10$.`, why: R`Vì $\sqrt{100}=10$.` },
      ],
      check: { expr: "sqrt(36+64)", expect: "10" },
    },
    {
      kind: "tu-ra-de",
      prompt: R`Hãy tự đặt một bài tìm tham số để hai vectơ vuông góc. Đề mẫu: $\vec u=(1;2)$ và $\vec v=(4;m)$.`,
      think: "Viết tích vô hướng, cho bằng $0$, rồi kiểm tra vectơ không bị triệt tiêu nếu đề yêu cầu.",
      answer: "Mẫu có $m=-2$.",
      steps: [
        { claim: R`Tích vô hướng bằng $4+2m$.`, why: "Nhân tọa độ." },
        { claim: R`Ta có $4+2m=0$ khi $m=-2$.`, why: "Điều kiện cần và đủ của vuông góc." },
        { claim: R`Vectơ $(4;-2)$ khác $\vec 0$.`, why: "Không phải loại nghiệm." },
      ],
      check: { expr: "1*4+2*(-2)", expect: "0" },
    },
  ],
};
