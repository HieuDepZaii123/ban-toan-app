import type { TopicDang } from "./types.ts";

const R = String.raw;

export const trigDang: TopicDang = {
  id: "trig",
  title: "Lượng giác",
  dang: [
    {
      name: "Radian và góc phần tư",
      nhanDang: "Bài đổi độ sang radian, hoặc hỏi dấu của sin, cos theo vị trí trên đường tròn.",
      phuongPhap: R`Một góc $180^\circ$ ứng với $\pi$ radian, nên $\alpha^\circ$ ứng với $\alpha\cdot\frac{\pi}{180}$. Dấu của sin và cos đọc theo góc phần tư: góc phần tư thứ nhất cả hai dương, thứ hai sin dương và cos âm, thứ ba cả hai âm, thứ tư sin âm và cos dương. Đưa về góc phần tư là điều kiện đủ để kết luận dấu.`,
      viDu: {
        prompt: R`Đổi $150^\circ$ sang radian và cho biết $\cos 150^\circ$ dương hay âm.`,
        steps: [
          { claim: R`Ta có $150\cdot\frac{\pi}{180}=\frac{5\pi}{6}$.`, why: "Đổi độ sang radian bằng cách nhân với $\\frac{\\pi}{180}$ rồi rút gọn phân số." },
          { claim: R`Góc $\frac{5\pi}{6}$ nằm ở góc phần tư thứ hai.`, why: "Nó lớn hơn $\\frac{\\pi}{2}$ và nhỏ hơn $\\pi$." },
          { claim: R`Vì vậy $\cos\frac{5\pi}{6}$ âm, và bằng $-\frac{\sqrt{3}}{2}$.`, why: R`Ở góc phần tư thứ hai, côsin âm. Vì $\frac{5\pi}{6}$ và $\frac{\pi}{6}$ bù nhau, giá trị tuyệt đối bằng côsin của $\frac{\pi}{6}$.` },
        ],
        ket: R`Góc bằng $\frac{5\pi}{6}$ radian và côsin bằng $-\frac{\sqrt{3}}{2}$.`,
        checks: [
          { expr: "150*pi/180", expect: "5*pi/6" },
          { expr: "cos(5*pi/6)", expect: "-sqrt(3)/2" },
        ],
      },
      loi: "Lấy côsin ở góc phần tư thứ hai thành số dương.",
      luyen: {
        kind: "luyen",
        prompt: R`Tính $\sin\frac{5\pi}{6}$.`,
        think: "Đưa về góc $\\frac{\\pi}{6}$. Ở góc phần tư thứ hai, sin giữ dấu dương.",
        answer: R`Đáp số là $\frac{1}{2}$.`,
        steps: [
          { claim: R`Góc $\frac{5\pi}{6}$ thuộc góc phần tư thứ hai, và $\sin\frac{5\pi}{6}=\sin\frac{\pi}{6}$.`, why: R`Sin của góc bù bằng sin của chính góc đó: $\sin(\pi-\alpha)=\sin\alpha$ với $\alpha=\frac{\pi}{6}$. Dấu ở góc phần tư này là dương.` },
          { claim: R`Giá trị bằng $\frac{1}{2}$.`, why: "Đây là giá trị đúng của sin một góc phần sáu radian, không làm tròn." },
        ],
        checks: [{ expr: "sin(5*pi/6)", expect: "Rational(1,2)" }],
      },
    },
    {
      name: "Hệ thức lượng giác cơ bản",
      nhanDang: "Biết một giá trị sin hoặc cos và góc phần tư, hỏi giá trị kia.",
      phuongPhap: R`Hệ thức $\sin^2 x+\cos^2 x=1$ đúng với mọi $x$. Từ một bình phương suy ra giá trị tuyệt đối của số còn lại. Dấu được chọn theo góc phần tư, nên điều kiện góc phần tư là cần để kết luận dấu. Thiếu góc phần tư thì còn hai khả năng.`,
      viDu: {
        prompt: R`Biết $\sin x=\frac{3}{5}$ và $x$ ở góc phần tư thứ nhất. Tính $\cos x$.`,
        steps: [
          { claim: R`Từ hệ thức cơ bản, $\cos^2 x=1-\frac{9}{25}=\frac{16}{25}$.`, why: "Bình phương sin đã biết. Hệ thức cho bình phương cos, chưa cho dấu." },
          { claim: R`Vì $x$ ở góc phần tư thứ nhất, $\cos x$ dương, nên $\cos x=\frac{4}{5}$.`, why: "Góc phần tư chọn đúng một trong hai căn. Căn âm bị loại." },
        ],
        ket: R`Côsin bằng $\frac{4}{5}$.`,
        checks: [
          { expr: "1-Rational(9,25)", expect: "Rational(16,25)" },
          { expr: "Rational(3,5)**2+Rational(4,5)**2", expect: "1" },
        ],
      },
      loi: "Lấy cả hai dấu khi đề đã cho góc phần tư.",
      luyen: {
        kind: "luyen",
        prompt: R`Biết $\cos x=-\frac{4}{5}$ và $x$ ở góc phần tư thứ hai. Tính $\sin x$.`,
        think: "Lấy bình phương từ hệ thức cơ bản. Góc phần tư thứ hai buộc sin dương.",
        answer: R`Đáp số là $\frac{3}{5}$.`,
        steps: [
          { claim: R`Ta có $\sin^2 x=1-\frac{16}{25}=\frac{9}{25}$.`, why: "Hệ thức cơ bản cho bình phương, chưa cho dấu." },
          { claim: R`Ở góc phần tư thứ hai, sin dương, nên $\sin x=\frac{3}{5}$.`, why: "Điều kiện góc phần tư loại căn âm." },
        ],
        checks: [{ expr: "1-Rational(16,25)", expect: "Rational(9,25)" }],
      },
    },
    {
      name: "Công thức cộng và biến đổi",
      nhanDang: "Góc là tổng hoặc hiệu của hai góc đặc biệt, hoặc cần biến một tích thành tổng.",
      phuongPhap: R`Công thức cộng $\cos(a-b)=\cos a\cos b+\sin a\sin b$ là một đẳng thức, dùng được khi đã biết sin và cos của $a$ và của $b$. Biến đổi ngược, một tích $\cos a\cos b$ chưa tự cho một cos của hiệu nếu thiếu số hạng $\sin a\sin b$. Phải viết đủ các số hạng của công thức trước khi thay số.`,
      viDu: {
        prompt: R`Tính $\cos 15^\circ$ bằng cách viết $15^\circ=45^\circ-30^\circ$.`,
        steps: [
          { claim: R`Ta có $\cos 15^\circ=\cos 45^\circ\cos 30^\circ+\sin 45^\circ\sin 30^\circ$.`, why: "Đây là công thức cộng cho hiệu hai góc. Cả bốn giá trị đều là góc đặc biệt." },
          { claim: R`Thay số được $\frac{\sqrt{2}}{2}\cdot\frac{\sqrt{3}}{2}+\frac{\sqrt{2}}{2}\cdot\frac{1}{2}=\frac{\sqrt{6}+\sqrt{2}}{4}$.`, why: "Nhân từng cặp rồi quy đồng mẫu $4$. Không bỏ số hạng sin." },
        ],
        ket: R`Kết quả là $\frac{\sqrt{6}+\sqrt{2}}{4}$.`,
        checks: [{ expr: "cos(rad(15))", expect: "(sqrt(6)+sqrt(2))/4" }],
      },
      loi: "Chỉ nhân hai cos và bỏ số hạng sin khi khai triển cos của một hiệu.",
      luyen: {
        kind: "luyen",
        prompt: R`Tính $\sin 75^\circ$ bằng $\sin(45^\circ+30^\circ)$.`,
        think: "Công thức $\\sin(a+b)=\\sin a\\cos b+\\cos a\\sin b$. Thay đủ bốn giá trị đặc biệt.",
        answer: R`Đáp số là $\frac{\sqrt{6}+\sqrt{2}}{4}$.`,
        steps: [
          { claim: R`Ta có $\sin 75^\circ=\sin 45^\circ\cos 30^\circ+\cos 45^\circ\sin 30^\circ$.`, why: "Công thức cộng đủ hai số hạng. Thiếu một số hạng thì chưa tương đương." },
          { claim: R`Kết quả bằng $\frac{\sqrt{2}}{2}\cdot\frac{\sqrt{3}}{2}+\frac{\sqrt{2}}{2}\cdot\frac{1}{2}=\frac{\sqrt{6}+\sqrt{2}}{4}$.`, why: "Cùng các giá trị đặc biệt như bài côsin của $15^\\circ$, nhưng vai trò sin và cos đổi chỗ." },
        ],
        checks: [{ expr: "sin(rad(75))", expect: "(sqrt(6)+sqrt(2))/4" }],
      },
    },
    {
      name: "Hàm số lượng giác dạng a sin x cộng b cos x",
      nhanDang: "Biểu thức bậc nhất theo sin và cos của cùng một đối số, hỏi giá trị lớn nhất và chỗ đạt.",
      phuongPhap: R`Với $R=\sqrt{a^2+b^2}>0$, đặt $\cos\varphi=\frac{a}{R}$ và $\sin\varphi=\frac{b}{R}$. Khi đó $a\sin x+b\cos x=R\sin(x+\varphi)$. Đây là một đẳng thức, không phải ước lượng. Giá trị lớn nhất bằng $R$, đạt khi và chỉ khi $\sin(x+\varphi)=1$, tức $x=\frac{\pi}{2}-\varphi+2k\pi$. Không được lấy $|a|+|b|$, vì sin và cos không đồng thời bằng $1$.`,
      viDu: {
        prompt: R`Viết $3\sin x+4\cos x$ dưới dạng $R\sin(x+\varphi)$ và tìm $x$ để biểu thức bằng $5$.`,
        steps: [
          { claim: R`Ta có $R=\sqrt{3^2+4^2}=5$, $\cos\varphi=\frac{3}{5}$ và $\sin\varphi=\frac{4}{5}$.`, why: R`Hai hệ số chia cho $R$ là côsin và sin của góc $\varphi$ xác định bởi hai hệ thức này. Bình phương của chúng cộng lại bằng $1$.` },
          { claim: R`Vậy $3\sin x+4\cos x=5\left(\sin x\cos\varphi+\cos x\sin\varphi\right)=5\sin(x+\varphi)$.`, why: "Công thức cộng biến ngoặc thành sin của một tổng. Hệ số $5$ là biên độ." },
          { claim: R`Biểu thức bằng $5$ khi $\sin(x+\varphi)=1$, tức $x=\frac{\pi}{2}-\varphi+2k\pi$.`, why: "Sin bằng $1$ khi và chỉ khi đối số bằng $\\frac{\\pi}{2}$ cộng bội của $2\\pi$." },
          { claim: R`Một nghiệm thỏa $\sin x=\frac{3}{5}$ và $\cos x=\frac{4}{5}$.`, why: "Khi đó $x=\\frac{\\pi}{2}-\\varphi$. Thay lại được $3\\cdot\\frac{3}{5}+4\\cdot\\frac{4}{5}=5$, đúng giá trị lớn nhất." },
        ],
        ket: R`Biểu thức bằng $5\sin(x+\varphi)$ với $\cos\varphi=\frac{3}{5}$, $\sin\varphi=\frac{4}{5}$. Giá trị $5$ đạt tại $x=\frac{\pi}{2}-\varphi+2k\pi$.`,
        checks: [
          { expr: "sqrt(9+16)", expect: "5" },
          { expr: "Rational(3,5)**2+Rational(4,5)**2", expect: "1" },
          { expr: "3*Rational(3,5)+4*Rational(4,5)", expect: "5" },
        ],
      },
      loi: "Cộng $3+4=7$ và gọi đó là giá trị lớn nhất.",
      luyen: {
        kind: "luyen",
        prompt: R`Phương trình $3\sin x+4\cos x=5$ có nghiệm không? Nếu có, nêu một điều kiện của nghiệm.`,
        think: "So $5$ với biên độ $R$. Bằng biên độ thì sin của tổng bằng $1$, và đó là điều kiện cần và đủ.",
        answer: R`Có nghiệm, khi $x=\frac{\pi}{2}-\varphi+2k\pi$ với $\cos\varphi=\frac{3}{5}$ và $\sin\varphi=\frac{4}{5}$.`,
        steps: [
          { claim: R`Biên độ bằng $5$, đúng bằng vế phải.`, why: R`Phương trình $R\sin(x+\varphi)=R$ với $R>0$ tương đương $\sin(x+\varphi)=1$.` },
          { claim: R`Nghiệm là $x=\frac{\pi}{2}-\varphi+2k\pi$.`, why: "Đây là điều kiện cần và đủ để sin bằng $1$." },
        ],
        checks: [{ expr: "9+16-25", expect: "0" }],
      },
    },
    {
      name: "Phương trình lượng giác",
      nhanDang: "Phương trình đưa được về sin hoặc cos của một đối số bằng một số trong đoạn $[-1;1]$.",
      phuongPhap: R`Phương trình $\sin x=m$ có nghiệm khi và chỉ khi $m\in[-1;1]$. Khi đó nghiệm là $x=\alpha+2k\pi$ và $x=\pi-\alpha+2k\pi$, với $\sin\alpha=m$ và $\alpha\in\left[-\frac{\pi}{2};\frac{\pi}{2}\right]$. Trên một đoạn đóng phải thử từng họ và chỉ giữ nghiệm thuộc đoạn. Bỏ một họ là thiếu nghiệm.`,
      viDu: {
        prompt: R`Giải $\sin x=\frac{1}{2}$ trên $[0;2\pi]$.`,
        steps: [
          { claim: R`Vì $\frac{1}{2}$ thuộc $[-1;1]$, phương trình có nghiệm.`, why: "Điều kiện cần và đủ của sự tồn tại nghiệm." },
          { claim: R`Hai họ là $x=\frac{\pi}{6}+2k\pi$ và $x=\frac{5\pi}{6}+2k\pi$.`, why: "Sin bằng $\\frac{1}{2}$ tại góc phần sáu và tại góc bù của nó. Cả hai họ đều phải giữ." },
          { claim: R`Trên $[0;2\pi]$, với $k=0$, được $\frac{\pi}{6}$ và $\frac{5\pi}{6}$.`, why: "Thử $k=1$ thì cả hai họ đều vượt quá $2\\pi$. Hai nghiệm này nằm trong đoạn." },
        ],
        ket: R`Có hai nghiệm, $\frac{\pi}{6}$ và $\frac{5\pi}{6}$.`,
        checks: [
          { expr: "sin(pi/6)", expect: "Rational(1,2)" },
          { expr: "sin(5*pi/6)", expect: "Rational(1,2)" },
        ],
      },
      loi: "Chỉ viết một nghiệm khi sin nhận cùng một giá trị tại hai họ.",
      luyen: {
        kind: "luyen",
        prompt: R`Phương trình $\sin x=2$ có nghiệm hay không?`,
        think: "So $2$ với đoạn giá trị của sin. Ngoài đoạn thì điều kiện tồn tại nghiệm không thỏa.",
        answer: "Không có nghiệm.",
        steps: [
          { claim: R`Tập giá trị của $\sin x$ là $[-1;1]$.`, why: "Đây là hệ quả của hệ thức cơ bản và định nghĩa trên đường tròn." },
          { claim: R`Vì $2$ không thuộc đoạn đó, phương trình vô nghiệm.`, why: "Điều kiện cần $m\\in[-1;1]$ đã thất bại, nên không cần tìm góc." },
        ],
        checks: [{ expr: "2-1", expect: "1" }],
      },
    },
  ],
  sangTao: [
    {
      kind: "thuc-te",
      sao: 3,
      prompt: R`Số liệu giả định. Đứng cách một cái cây $20$ mét, mắt cao $\frac{3}{2}$ mét, nhìn lên ngọn một góc $30^\circ$. Cây có cao hơn $15$ mét không?`,
      think: "Phần trên tầm mắt là cạnh đối của tam giác vuông. Cộng chiều cao mắt, rồi so với $15$ mét. Kết luận phải trả lời câu so sánh.",
      answer: R`Cây cao $\frac{20\sqrt{3}}{3}+\frac{3}{2}$ mét, khoảng $13{,}05$ mét, nên không cao hơn $15$ mét.`,
      steps: [
        { claim: R`Phần trên tầm mắt bằng $20\tan 30^\circ=\frac{20\sqrt{3}}{3}$ mét.`, why: "Tan của góc nâng bằng đối chia kề. Giá trị $\\tan 30^\\circ$ bằng $\\frac{\\sqrt{3}}{3}$." },
        { claim: R`Chiều cao cây bằng $\frac{20\sqrt{3}}{3}+\frac{3}{2}$ mét.`, why: "Cộng chiều cao mắt. Đây chưa phải câu trả lời cuối, vì đề hỏi so với $15$ mét." },
        { claim: R`Vì $\frac{20\sqrt{3}}{3}+\frac{3}{2}<15$, cây không cao hơn $15$ mét.`, why: "Hiệu $15$ trừ chiều cao này dương. Diễn giải: ngọn còn thấp hơn mốc $15$ mét." },
      ],
      checks: [
        { expr: "20*tan(rad(30))+Rational(3,2)", expect: "20*sqrt(3)/3+Rational(3,2)" },
        { expr: "15-(20*sqrt(3)/3+Rational(3,2))", expect: "(81-40*sqrt(3))/6" },
      ],
    },
    {
      kind: "thuc-te",
      sao: 3,
      prompt: R`Số liệu giả định. Một đoạn dốc dài $10$ mét, nghiêng $30^\circ$ so với phương ngang. Độ cao tăng thêm và quãng ngang bằng bao nhiêu mét?`,
      think: "Độ cao là cạnh đối, quãng ngang là cạnh kề. Cạnh huyền là chiều dài dốc. Tính cả hai rồi diễn giải độ dốc.",
      answer: "Độ cao tăng $5$ mét và quãng ngang dài $5\\sqrt{3}$ mét; đi $10$ mét trên dốc thì lên cao $5$ mét.",
      steps: [
        { claim: R`Độ cao bằng $10\sin 30^\circ=5$ mét.`, why: "Sin bằng đối chia huyền, và sin của $30^\\circ$ bằng $\\frac{1}{2}$." },
        { claim: R`Quãng ngang bằng $10\cos 30^\circ=5\sqrt{3}$ mét.`, why: "Cos bằng kề chia huyền. Cả hai cạnh cùng xác định tam giác vuông." },
      ],
      checks: [
        { expr: "10*sin(rad(30))", expect: "5" },
        { expr: "10*cos(rad(30))", expect: "5*sqrt(3)" },
      ],
    },
    {
      kind: "thuc-te",
      sao: 3,
      prompt: R`Số liệu giả định. Một điểm trên vành bánh xe bán kính $1$ mét, ban đầu ở đỉnh so với tâm, quay thêm $\frac{\pi}{2}$ radian. Điểm hạ bao nhiêu mét so với vị trí cũ?`,
      think: "Đổi góc sang radian đã có sẵn. Tung độ trên đường tròn tâm gốc đi từ $1$ đến $0$. Hiệu tung độ là độ hạ.",
      answer: "Điểm hạ $1$ mét, từ độ cao $1$ mét trên tâm xuống ngang tâm.",
      steps: [
        { claim: R`Lấy tâm làm gốc, điểm ban đầu là $(0;1)$.`, why: "Đỉnh của vành có tung độ bằng bán kính." },
        { claim: R`Quay $\frac{\pi}{2}$ đưa điểm tới $(1;0)$.`, why: "Một góc phần tư radian đổi sin và cos của vị trí. Tung độ mới bằng $0$." },
        { claim: R`Độ hạ bằng $1-0=1$ mét.`, why: "Hiệu tung độ dương nghĩa là điểm đi xuống đúng một bán kính." },
      ],
      checks: [
        { expr: "sin(pi/2)", expect: "1" },
        { expr: "cos(pi/2)", expect: "0" },
      ],
    },
    {
      kind: "thuc-te",
      sao: 4,
      prompt: R`Số liệu giả định. Dòng điện, tính bằng ampe, là $I(t)=3\sin t+4\cos t$. Biên độ bằng bao nhiêu ampe, và dòng đạt biên độ khi nào?`,
      think: "Đưa về $5\\sin(t+\\varphi)$. Biên độ là hệ số $5$, đạt khi sin của tổng bằng $1$. Nêu góc $t$, không chỉ nêu số $5$.",
      answer: R`Biên độ là $5$ ampe. Dòng đạt $5$ ampe khi $t=\frac{\pi}{2}-\varphi+2k\pi$, với $\cos\varphi=\frac{3}{5}$ và $\sin\varphi=\frac{4}{5}$.`,
      steps: [
        { claim: R`Ta có $I(t)=5\sin(t+\varphi)$ với $\cos\varphi=\frac{3}{5}$ và $\sin\varphi=\frac{4}{5}$.`, why: "Chia hai hệ số cho $\\sqrt{9+16}$. Công thức cộng cho đúng dạng sin của một tổng." },
        { claim: R`Giá trị lớn nhất là $5$, đạt khi $\sin(t+\varphi)=1$.`, why: "Sin không vượt quá $1$, và giá trị $1$ đạt được. Đơn vị của biên độ là ampe." },
      ],
      checks: [
        { expr: "sqrt(9+16)", expect: "5" },
        { expr: "3*Rational(3,5)+4*Rational(4,5)", expect: "5" },
      ],
    },
    {
      kind: "mo",
      sao: 3,
      prompt: R`Hãy chọn một góc ở góc phần tư thứ hai và tính sin, cos của góc đó. Nêu vì sao cos âm. Có nhiều góc đúng.`,
      think: "Góc phải nằm giữa $\\frac{\\pi}{2}$ và $\\pi$. Dấu đọc theo góc phần tư, giá trị đưa về một góc đặc biệt nếu chọn được.",
      answer: R`Một góc đúng là $\frac{5\pi}{6}$. Sin bằng $\frac{1}{2}$ và cos bằng $-\frac{\sqrt{3}}{2}$, vì góc phần tư thứ hai làm cos âm.`,
      steps: [
        { claim: R`Góc $\frac{5\pi}{6}$ thuộc góc phần tư thứ hai.`, why: "Nó nằm giữa góc vuông và góc bẹt. Đây là một lựa chọn, không phải lựa chọn duy nhất." },
        { claim: R`Sin bằng $\frac{1}{2}$ và cos bằng $-\frac{\sqrt{3}}{2}$.`, why: "Sin giữ dấu dương, cos đổi dấu so với góc $\\frac{\\pi}{6}$." },
      ],
      checks: [{ expr: "cos(5*pi/6)", expect: "-sqrt(3)/2" }],
    },
    {
      kind: "phan-bien",
      sao: 3,
      prompt: R`Bạn A nói giá trị lớn nhất của $3\sin x+4\cos x$ là $7$, vì $3+4=7$. Hãy phản biện.`,
      think: "Sin và cos không đồng thời bằng $1$. Biên độ đúng là căn của tổng bình phương.",
      answer: "Lập luận chưa đúng. Giá trị lớn nhất là $5$, không phải $7$.",
      steps: [
        { claim: R`Nếu $\sin x=1$ thì $\cos x=0$, nên biểu thức chỉ bằng $3$, không bằng $7$.`, why: "Hệ thức cơ bản cấm hai hàm cùng đạt $1$. Phép cộng $3+4$ không có nghiệm." },
        { claim: R`Dạng $5\sin(x+\varphi)$ cho giá trị lớn nhất $5$.`, why: "Biên độ là $\\sqrt{9+16}$. Số $7$ lớn hơn biên độ nên không đạt được." },
      ],
      checks: [{ expr: "sqrt(9+16)", expect: "5" }],
    },
    {
      kind: "doc",
      sao: 2,
      prompt: R`Trên đường tròn đơn vị, một điểm ở góc phần tư thứ hai có hoành độ $-\frac{\sqrt{3}}{2}$ và tung độ $\frac{1}{2}$. Hãy đọc sin và cos của góc tương ứng.`,
      think: "Hoành độ trên đường tròn đơn vị là cos, tung độ là sin. Dấu đã nằm trong tọa độ.",
      answer: R`Cos bằng $-\frac{\sqrt{3}}{2}$ và sin bằng $\frac{1}{2}$.`,
      steps: [
        { claim: R`Hoành độ là cos, nên $\cos=-\frac{\sqrt{3}}{2}$.`, why: "Định nghĩa trên đường tròn đơn vị. Dấu âm khớp góc phần tư thứ hai." },
        { claim: R`Tung độ là sin, nên $\sin=\frac{1}{2}$.`, why: "Cùng định nghĩa. Hai giá trị thỏa hệ thức cơ bản vì bình phương cộng lại bằng $1$." },
      ],
      checks: [{ expr: "(-sqrt(3)/2)**2+(Rational(1,2))**2", expect: "1" }],
    },
    {
      kind: "uoc-luong",
      sao: 3,
      prompt: R`Ước lượng $\sin\frac{1}{10}$, với đối số tính bằng radian, bằng cách so với chính đối số.`,
      think: R`Trên khoảng $(0;\frac{\pi}{2})$ có $\sin x<x<\tan x$. Mốc $\frac{1}{10}$ nằm trong khoảng đó.`,
      answer: R`Ta có $\sin\frac{1}{10}<\frac{1}{10}<\tan\frac{1}{10}$.`,
      steps: [
        { claim: R`Với mọi $x$ thuộc $(0;\frac{\pi}{2})$, $\sin x<x<\tan x$.`, why: "Đây là bất đẳng thức lượng giác trên góc phần tư thứ nhất, tính bằng radian. Không so sánh độ dài cung với dây cung theo chiều ngược." },
        { claim: R`Vì $0<\frac{1}{10}<\frac{\pi}{2}$, bất đẳng thức áp dụng tại $x=\frac{1}{10}$.`, why: "Mốc dương và nhỏ hơn góc vuông, nên thuộc đúng khoảng của mệnh đề." },
      ],
      checks: [{ expr: "sin(Rational(1,10))**2+cos(Rational(1,10))**2", expect: "1" }],
    },
    {
      kind: "tu-ra-de",
      sao: 4,
      prompt: R`Bài xuất phát: $\sin x=\frac{1}{2}$ trên $[0;2\pi]$ có hai nghiệm $\frac{\pi}{6}$ và $\frac{5\pi}{6}$. Hãy đổi giả thiết bằng cách thay vế phải bởi một số khác trong $(-1;1)$, dự đoán còn hai nghiệm hay không, rồi kiểm.`,
      think: "Miền giá trị của sin không đổi. Dự đoán vẫn hai họ, rồi mới tìm góc mới và thử trên đoạn.",
      answer: R`Một đề hợp lệ là $\sin x=\frac{\sqrt{2}}{2}$. Dự đoán vẫn hai nghiệm trên $[0;2\pi]$, đúng là $\frac{\pi}{4}$ và $\frac{3\pi}{4}$.`,
      steps: [
        { claim: R`Đổi vế phải từ $\frac{1}{2}$ sang $\frac{\sqrt{2}}{2}$. Số này vẫn thuộc $(-1;1)$, nên dự đoán còn nghiệm.`, why: "Điều kiện tồn tại nghiệm không phụ thuộc giá trị cụ thể, miễn là giá trị còn trong đoạn." },
        { claim: R`Hai nghiệm trên $[0;2\pi]$ là $\frac{\pi}{4}$ và $\frac{3\pi}{4}$.`, why: "Vẫn đủ hai họ. Góc chính đổi theo giá trị mới, và cả hai đều nằm trong đoạn." },
      ],
      checks: [
        { expr: "sin(pi/4)", expect: "sqrt(2)/2" },
        { expr: "sin(3*pi/4)", expect: "sqrt(2)/2" },
      ],
    },
  ],
};
