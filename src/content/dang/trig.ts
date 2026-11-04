import type { TopicDang } from "./types.ts";

const R = String.raw;

export const trigDang: TopicDang = {
  id: "trig",
  title: "Lượng giác",
  dang: [
    {
      name: "Giá trị lượng giác của góc đặc biệt",
      nhanDang: "Bài hỏi sin, cos của một góc đưa được về góc nút trên đường tròn.",
      phuongPhap: R`Đưa góc về một góc có giá trị đã biết, rồi giữ đúng dấu theo quý. Công thức $\cos(180^\circ-\alpha)=-\cos\alpha$ là một tương đương, không phải ước lượng. Quên dấu là sai đáp số, không phải sai số làm tròn.`,
      viDu: {
        prompt: R`Tính $\sin 150^\circ$ và $\cos 150^\circ$.`,
        steps: [
          { claim: R`Ta có $150^\circ=180^\circ-30^\circ$.`, why: R`Đưa về góc $30^\circ$ đã biết.` },
          { claim: R`Ta có $\sin 150^\circ=\sin 30^\circ=\frac{1}{2}$.`, why: "Sin của góc bù bằng sin của góc nhọn." },
          { claim: R`Ta có $\cos 150^\circ=-\cos 30^\circ=-\frac{\sqrt{3}}{2}$.`, why: "Góc ở quý thứ hai có côsin âm." },
        ],
        ket: R`Kết quả là $\sin 150^\circ=\frac{1}{2}$ và $\cos 150^\circ=-\frac{\sqrt{3}}{2}$.`,
        check: { expr: "sin(rad(150))", expect: "Rational(1,2)" },
      },
      loi: "Lấy côsin của góc ở quý hai thành số dương.",
      luyen: {
        kind: "luyen",
        prompt: R`Tính $\cos^2 15^\circ-\sin^2 15^\circ$.`,
        think: R`Nhận ra cos của góc nhân đôi, không cần tính riêng sin và cos của $15^\circ$.`,
        answer: R`Đáp số là $\frac{\sqrt{3}}{2}$`,
        steps: [
          { claim: R`Hiệu bình phương bằng $\cos 30^\circ$.`, why: R`Công thức $\cos 2a=\cos^2 a-\sin^2 a$ với $a=15^\circ$.` },
          { claim: R`Ta có $\cos 30^\circ=\frac{\sqrt{3}}{2}$.`, why: "Giá trị đúng của góc đặc biệt, không làm tròn." },
        ],
        check: { expr: "cos(rad(30))", expect: "sqrt(3)/2" },
      },
    },
    {
      name: R`Cực trị của $a\sin x+b\cos x$`,
      nhanDang: "Biểu thức bậc nhất theo sin và cos của cùng một đối số, hỏi giá trị lớn nhất hoặc điều kiện có nghiệm.",
      phuongPhap: R`Đặt $t=a\sin x+b\cos x$. Điều kiện có nghiệm của $t=c$ là $a^2+b^2\ge c^2$, và đây là điều kiện cần và đủ. Giá trị lớn nhất bằng $\sqrt{a^2+b^2}$, giá trị nhỏ nhất bằng số đối. Không được cộng $|a|+|b|$ để lấy giá trị lớn nhất, vì sin và cos không đồng thời bằng $\pm 1$.`,
      viDu: {
        prompt: R`Tìm giá trị lớn nhất của $3\sin x+4\cos x$.`,
        steps: [
          { claim: R`Ta có $3^2+4^2=25$.`, why: "Bình phương hai hệ số." },
          { claim: R`Giá trị lớn nhất bằng $\sqrt{25}=5$.`, why: R`Định lý về dạng $a\sin x+b\cos x$, điều kiện đủ vì căn số học của tổng bình phương.` },
        ],
        ket: "Giá trị lớn nhất bằng $5$.",
        check: { expr: "sqrt(9+16)", expect: "5" },
      },
      loi: "Cộng $3+4=7$ và gọi đó là giá trị lớn nhất.",
      luyen: {
        kind: "luyen",
        prompt: R`Phương trình $3\sin x+4\cos x=5$ có nghiệm hay không?`,
        think: "So sánh bình phương vế phải với $a^2+b^2$. Bằng nhau thì có nghiệm, đó là trường hợp đạt cực đại.",
        answer: "Có nghiệm.",
        steps: [
          { claim: R`Ta có $a^2+b^2=25$ và $c^2=25$.`, why: "Tính cả hai vế của điều kiện." },
          { claim: R`Điều kiện $a^2+b^2\ge c^2$ thỏa, nên phương trình có nghiệm.`, why: "Đây là điều kiện cần và đủ." },
        ],
        check: { expr: "9+16-25", expect: "0" },
      },
    },
  ],
  sangTao: [
    {
      kind: "thuc-te",
      prompt: R`Từ chân một cái cây, đứng cách $20$ mét, nhìn lên ngọn một góc $30^\circ$. Mắt người quan sát cao $1{,}5$ mét. Cây cao bao nhiêu mét?`,
      think: R`Phần cây phía trên tầm mắt là cạnh đối của góc $30^\circ$ trong tam giác vuông. Cộng thêm chiều cao tầm mắt.`,
      answer: R`Đáp số là $\frac{20\sqrt{3}}{3}+\frac{3}{2}$ mét`,
      steps: [
        { claim: R`Phần trên tầm mắt bằng $20\tan 30^\circ=20\cdot\frac{\sqrt{3}}{3}$.`, why: R`Vì $\tan=\frac{\text{đối}}{\text{kề}}$ và $\tan 30^\circ=\frac{1}{\sqrt{3}}=\frac{\sqrt{3}}{3}$.` },
        { claim: R`Cộng $1{,}5=\frac{3}{2}$ được tổng $\frac{20\sqrt{3}}{3}+\frac{3}{2}$.`, why: "Chiều cao cây bằng phần trên tầm mắt cộng chiều cao mắt." },
      ],
      check: { expr: "20*tan(rad(30))+Rational(3,2)", expect: "20*sqrt(3)/3+Rational(3,2)" },
    },
    {
      kind: "thuc-te",
      prompt: R`Một đoạn dốc dài $10$ mét, góc nghiêng $30^\circ$ so với phương ngang. Độ cao dốc lên được bao nhiêu mét?`,
      think: "Độ cao là cạnh đối trong tam giác vuông, cạnh huyền là chiều dài dốc.",
      answer: "Đáp số là $5$ mét",
      steps: [
        { claim: R`Độ cao bằng $10\sin 30^\circ$.`, why: "Sin bằng đối chia huyền." },
        { claim: R`Ta có $\sin 30^\circ=\frac{1}{2}$, nên độ cao bằng $5$.`, why: "Giá trị đúng, không làm tròn." },
      ],
      check: { expr: "10*sin(rad(30))", expect: "5" },
    },
    {
      kind: "thuc-te",
      prompt: R`Một bánh xe bán kính $1$ mét lăn đủ một phần tư vòng. Điểm trên vành, ban đầu ở đỉnh, đã hạ một đoạn bằng bao nhiêu so với tâm?`,
      think: "Sau một phần tư vòng, điểm ở đỉnh chuyển sang vị trí ngang tâm. Độ hạ bằng đúng bán kính.",
      answer: "Đáp số là $1$ mét",
      steps: [
        { claim: R`Góc quay $\frac{\pi}{2}$ đưa điểm từ $(0;1)$ tới $(1;0)$ nếu tâm là gốc và bán kính bằng $1$.`, why: "Quay quanh tâm, tung độ từ $1$ về $0$." },
        { claim: R`Độ hạ bằng $1-0=1$.`, why: "Hiệu tung độ." },
      ],
      check: { expr: "1-0", expect: "1" },
    },
    {
      kind: "thuc-te",
      prompt: R`Dòng điện $I(t)=5\sin t$ có biên độ bằng bao nhiêu?`,
      think: "Biên độ là hệ số dương đứng trước sin, cũng là giá trị lớn nhất của $|I(t)|$.",
      answer: "Đáp số là $5$",
      steps: [
        { claim: R`Ta có $|\sin t|\le 1$, đẳng thức đạt được.`, why: "Sin nhận đủ đoạn $[-1;1]$." },
        { claim: R`Vậy giá trị lớn nhất của $|5\sin t|$ bằng $5$.`, why: "Nhân với hằng số dương bảo toàn chỗ đạt cực trị." },
      ],
      check: { expr: "5*1", expect: "5" },
    },
    {
      kind: "tu-ra-de",
      prompt: R`Hãy tự đặt một bài tính chiều cao bằng tam giác vuông và một góc đặc biệt. Đề mẫu: khoảng cách ngang $6$ mét, góc nâng $45^\circ$, mắt nằm sát mặt đất.`,
      think: R`Góc $45^\circ$ cho tan bằng $1$, nên chiều cao bằng đúng khoảng cách ngang, miễn là mắt sát đất như đề mẫu.`,
      answer: "Chiều cao mẫu bằng $6$ mét.",
      steps: [
        { claim: R`Ta có $\tan 45^\circ=1$.`, why: "Giá trị góc đặc biệt." },
        { claim: R`Chiều cao bằng $6\cdot 1=6$.`, why: "Cạnh đối bằng kề nhân tan, và mắt sát đất nên không cộng thêm." },
      ],
      check: { expr: "6*tan(rad(45))", expect: "6" },
    },
  ],
};
