import type { TopicDang } from "./types.ts";

const R = String.raw;

export const analyticDang: TopicDang = {
  id: "analytic",
  title: "Hình học không gian Oxyz",
  dang: [
    {
      name: "Khoảng cách từ điểm đến mặt phẳng",
      nhanDang: "Cho điểm và phương trình $ax+by+cz+d=0$, hỏi khoảng cách.",
      phuongPhap: R`Khoảng cách bằng $\frac{|ax_0+by_0+cz_0+d|}{\sqrt{a^2+b^2+c^2}}$. Mẫu khác $0$ vì $(a;b;c)$ là pháp tuyến, không phải vectơ không. Trị tuyệt đối ở tử là cần để khoảng cách không âm. Quên trị tuyệt đối chỉ ra một số có dấu, chưa phải khoảng cách.`,
      viDu: {
        prompt: R`Tính khoảng cách từ $A(1;2;3)$ đến mặt phẳng $2x-y+2z-3=0$.`,
        steps: [
          { claim: R`Tử là $|2\cdot 1-2+2\cdot 3-3|=|3|=3$.`, why: "Thay tọa độ điểm vào biểu thức mặt phẳng, rồi lấy trị tuyệt đối." },
          { claim: R`Mẫu là $\sqrt{2^2+(-1)^2+2^2}=\sqrt{9}=3$.`, why: R`Độ dài pháp tuyến. Pháp tuyến khác $\vec 0$ nên mẫu hợp lệ.` },
          { claim: R`Khoảng cách bằng $\frac{3}{3}=1$.`, why: "Công thức khoảng cách." },
        ],
        ket: "Khoảng cách bằng $1$.",
        check: { expr: "Abs(2-2+6-3)/sqrt(4+1+4)", expect: "1" },
      },
      loi: "Bỏ trị tuyệt đối, hoặc lấy mẫu là tổng hệ số thay vì căn tổng bình phương.",
      luyen: {
        kind: "luyen",
        prompt: R`Khoảng cách từ gốc $O$ đến đường thẳng $3x+4y-10=0$ trong mặt phẳng bằng bao nhiêu?`,
        think: "Cùng ý với khoảng cách điểm–đường: trị tuyệt đối ở tử, căn tổng bình phương hệ số ở mẫu.",
        answer: "Đáp số là $2$",
        steps: [
          { claim: R`Tử $|-10|=10$, mẫu $\sqrt{9+16}=5$.`, why: "Điểm $(0;0)$ làm $3x+4y$ bằng $0$." },
          { claim: R`Thương bằng $2$.`, why: "Công thức khoảng cách trong mặt phẳng." },
        ],
        check: { expr: "Abs(-10)/sqrt(9+16)", expect: "2" },
      },
    },
    {
      name: "Tâm và bán kính mặt cầu",
      nhanDang: "Phương trình $x^2+y^2+z^2+ax+by+cz+d=0$, hỏi tâm và bán kính.",
      phuongPhap: R`Đưa về $(x-x_0)^2+(y-y_0)^2+(z-z_0)^2=R^2$. Tâm là $(x_0;y_0;z_0)$ với $x_0=-\frac{a}{2}$ nếu hệ số của $x$ là $a$, tương tự cho $y,z$. Bán kính chỉ tồn tại khi vế phải dương. Vế phải bằng $0$ là một điểm, vế phải âm thì không có mặt cầu. Điều kiện dương là cần và đủ để có bán kính dương.`,
      viDu: {
        prompt: R`Tìm tâm và bán kính của $x^2+y^2+z^2-2x+4y-4=0$.`,
        steps: [
          { claim: R`Ta có $(x-1)^2-1+(y+2)^2-4+z^2-4=0$.`, why: "Tách bình phương. Hệ số $y$ là $+4$ nên tâm có tung độ $-2$." },
          { claim: R`Ta có $(x-1)^2+(y+2)^2+z^2=9$.`, why: "Chuyển các hằng số sang vế phải: $1+4+4=9$." },
          { claim: R`Vế phải $9>0$, nên $R=3$ và tâm là $(1;-2;0)$.`, why: "Điều kiện đủ để có mặt cầu bán kính dương." },
        ],
        ket: R`Tâm $(1;-2;0)$, bán kính $3$.`,
        check: { expr: "sqrt(1+4+4)", expect: "3" },
      },
      loi: "Lấy tâm là $(a;b;c)$ thay vì đổi dấu và chia đôi.",
      luyen: {
        kind: "luyen",
        prompt: R`Mặt cầu $(x-2)^2+(y+1)^2+(z-2)^2=9$ có bán kính bao nhiêu?`,
        think: "Dạng chính tắc cho bán kính là căn của vế phải, với điều kiện vế phải dương.",
        answer: "Đáp số là $3$",
        steps: [
          { claim: R`Vế phải bằng $9>0$.`, why: "Điều kiện đủ để khai căn số học." },
          { claim: R`Ta có $R=\sqrt{9}=3$.`, why: "Bán kính lấy giá trị không âm." },
        ],
        check: { expr: "sqrt(9)", expect: "3" },
      },
    },
  ],
  sangTao: [
    {
      kind: "thuc-te",
      prompt: R`Một radar ở gốc tọa độ. Máy bay ở $(6;8;0)$ trên mặt phẳng bay. Khoảng cách từ radar đến máy bay bằng bao nhiêu kilômét nếu mỗi đơn vị là một kilômét?`,
      think: "Khoảng cách trong không gian, đây tung độ bằng $0$ nên rút về mặt phẳng.",
      answer: "Đáp số là $10$ kilômét",
      steps: [
        { claim: R`Khoảng cách $\sqrt{6^2+8^2+0^2}=\sqrt{36+64}$.`, why: "Công thức độ dài vectơ từ gốc đến điểm." },
        { claim: R`Ta có $\sqrt{100}=10$.`, why: "Vì $36+64=100$ là số chính phương." },
      ],
      check: { expr: "sqrt(36+64)", expect: "10" },
    },
    {
      kind: "thuc-te",
      prompt: R`Một bức tường phẳng có phương trình $x+2y+2z-6=0$. Khoảng cách từ đèn tại $(1;1;1)$ đến tường bằng bao nhiêu?`,
      think: "Dùng công thức điểm–mặt phẳng. Nhớ trị tuyệt đối và độ dài pháp tuyến $(1;2;2)$.",
      answer: R`Đáp số là $\frac{1}{3}$`,
      steps: [
        { claim: R`Tử $|1+2+2-6|=1$.`, why: "Thay tọa độ đèn." },
        { claim: R`Mẫu $\sqrt{1+4+4}=3$.`, why: "Độ dài pháp tuyến khác $0$." },
        { claim: R`Thương bằng $\frac{1}{3}$.`, why: "Công thức khoảng cách." },
      ],
      check: { expr: "Abs(1+2+2-6)/sqrt(1+4+4)", expect: "Rational(1,3)" },
    },
    {
      kind: "thuc-te",
      prompt: R`Một bồn cầu tâm $(0;0;0)$, bán kính $5$. Điểm $(3;4;0)$ nằm trong, trên hay ngoài mặt cầu?`,
      think: "So sánh bình phương khoảng cách tới tâm với bình phương bán kính, để khỏi làm tròn căn.",
      answer: "Nằm trên mặt cầu.",
      steps: [
        { claim: R`Ta có $3^2+4^2+0^2=25$ và $R^2=25$.`, why: "Điểm nằm trên mặt cầu khi hai bình phương bằng nhau." },
        { claim: R`Hai vế bằng nhau nên điểm thuộc mặt cầu.`, why: "Đây là điều kiện cần và đủ với tâm ở gốc." },
      ],
      check: { expr: "9+16", expect: "25" },
    },
    {
      kind: "thuc-te",
      prompt: R`Đường ống thẳng đi qua $A(0;0;0)$ và $B(1;2;2)$. Độ dài đoạn ống $AB$ bằng bao nhiêu?`,
      think: "Độ dài đoạn là độ dài vectơ hiệu.",
      answer: "Đáp số là $3$",
      steps: [
        { claim: R`Ta có $\overrightarrow{AB}=(1;2;2)$.`, why: "Trừ tung độ tương ứng." },
        { claim: R`Ta có $|\overrightarrow{AB}|=\sqrt{1+4+4}=3$.`, why: "Tổng bình phương bằng $9$." },
      ],
      check: { expr: "sqrt(1+4+4)", expect: "3" },
    },
    {
      kind: "tu-ra-de",
      prompt: "Hãy tự đặt một bài khoảng cách từ một điểm có tọa độ nguyên đến một mặt phẳng có pháp tuyến là bộ ba Pythagore. Đề mẫu dùng điểm $(0;0;0)$ và mặt $2x-y+2z-3=0$.",
      think: "Chọn pháp tuyến có độ dài nguyên để đáp số gọn. Vẫn phải viết trị tuyệt đối.",
      answer: "Khoảng cách mẫu bằng $1$.",
      steps: [
        { claim: R`Tử $|-3|=3$, mẫu $\sqrt{4+1+4}=3$.`, why: "Điểm gốc triệt tiêu phần bậc nhất." },
        { claim: R`Thương bằng $1$.`, why: "Công thức khoảng cách." },
      ],
      check: { expr: "3/sqrt(9)", expect: "1" },
    },
  ],
};
