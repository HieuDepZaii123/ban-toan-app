import type { TopicDang } from "./types.ts";

const R = String.raw;

export const probabilityDang: TopicDang = {
  id: "probability",
  title: "Xác suất",
  dang: [
    {
      name: "Xác suất cổ điển và biến cố đối",
      nhanDang: "Không gian mẫu hữu hạn, các kết quả đồng khả năng, hoặc câu hỏi dạng ít nhất một.",
      phuongPhap: R`Nếu các kết quả đồng khả năng thì $P(A)=\frac{n(A)}{n(\Omega)}$. Điều này cần giả thiết đồng khả năng; thiếu giả thiết đó thì tỉ số đếm chưa phải xác suất. Với biến cố đối, $P(\overline A)=1-P(A)$ là tương đương, nên câu ít nhất một thường đổi sang biến cố không có kết quả nào.`,
      viDu: {
        prompt: "Gieo hai xúc xắc cân đối. Xác suất tổng bằng $7$ bằng bao nhiêu?",
        steps: [
          { claim: R`Không gian mẫu có $6\cdot 6=36$ kết quả đồng khả năng.`, why: "Mỗi xúc xắc có $6$ mặt và hai lần gieo độc lập." },
          { claim: R`Các cặp thuận là $(1;6)$, $(2;5)$, $(3;4)$, $(4;3)$, $(5;2)$, $(6;1)$, gồm $6$ cặp.`, why: "Liệt kê đủ, không bỏ các cặp đảo thứ tự vì hai xúc xắc phân biệt." },
          { claim: R`Xác suất bằng $\frac{6}{36}=\frac{1}{6}$.`, why: "Công thức cổ điển, giả thiết cân đối đã có." },
        ],
        ket: R`Xác suất bằng $\frac{1}{6}$.`,
        check: { expr: "Rational(6,36)", expect: "Rational(1,6)" },
      },
      loi: "Đếm $(1;6)$ và $(6;1)$ thành một kết quả khi hai xúc xắc phân biệt.",
      luyen: {
        kind: "luyen",
        prompt: "Tung ba đồng xu cân đối. Xác suất có ít nhất một mặt ngửa bằng bao nhiêu?",
        think: R`Biến cố đối là cả ba mặt sấp. Một kết quả sấp có xác suất $\frac{1}{8}$ vì có $8$ bộ đồng khả năng.`,
        answer: R`Đáp số là $\frac{7}{8}$`,
        steps: [
          { claim: R`Có $2^3=8$ kết quả đồng khả năng.`, why: "Mỗi đồng xu hai mặt, các lần tung độc lập." },
          { claim: R`Cả ba sấp là một kết quả, xác suất $\frac{1}{8}$.`, why: "Biến cố đối của ít nhất một mặt ngửa." },
          { claim: R`Xác suất cần tìm là $1-\frac{1}{8}=\frac{7}{8}$.`, why: "Công thức biến cố đối." },
        ],
        check: { expr: "1-Rational(1,8)", expect: "Rational(7,8)" },
      },
    },
    {
      name: "Xác suất có điều kiện",
      nhanDang: "Đề đã biết một phần kết quả, rồi hỏi xác suất của phần còn lại.",
      phuongPhap: R`Quy tắc là $P(A|B)=\frac{P(AB)}{P(B)}$ khi $P(B)>0$. Mẫu số là xác suất của điều đã biết, không còn là xác suất của toàn bộ không gian ban đầu. Quên đổi mẫu là nhầm điều kiện cần của phép chia.`,
      viDu: {
        prompt: R`Hộp có $3$ bi đỏ và $2$ bi xanh. Lấy đồng thời $2$ bi. Xác suất hai bi cùng màu bằng bao nhiêu?`,
        steps: [
          { claim: R`Số cách lấy $2$ bi từ $5$ bi là $C_5^2=10$.`, why: "Lấy đồng thời nên không kể thứ tự." },
          { claim: R`Hai đỏ có $C_3^2=3$ cách, hai xanh có $C_2^2=1$ cách.`, why: "Hai trường hợp loại trừ nhau, cộng được." },
          { claim: R`Xác suất bằng $\frac{4}{10}=\frac{2}{5}$.`, why: "Các cách lấy đồng khả năng." },
        ],
        ket: R`Xác suất bằng $\frac{2}{5}$.`,
        check: { expr: "Rational(3+1,10)", expect: "Rational(2,5)" },
      },
      loi: "Dùng chỉnh hợp khi đề lấy không kể thứ tự, làm mẫu số lớn hơn thật.",
      luyen: {
        kind: "luyen",
        prompt: R`Lớp có $5$ nam và $4$ nữ. Chọn ngẫu nhiên $2$ bạn. Xác suất cả hai là nữ bằng bao nhiêu?`,
        think: "Mẫu số là $C_9^2$. Tử là $C_4^2$. Không kể thứ tự.",
        answer: R`Đáp số là $\frac{1}{6}$`,
        steps: [
          { claim: R`Ta có $C_9^2=36$ và $C_4^2=6$.`, why: "Chọn không phân biệt thứ tự." },
          { claim: R`Tỉ số bằng $\frac{6}{36}=\frac{1}{6}$.`, why: "Các cặp bạn đồng khả năng." },
        ],
        check: { expr: "Rational(6,36)", expect: "Rational(1,6)" },
      },
    },
  ],
  sangTao: [
    {
      kind: "thuc-te",
      prompt: R`Một bệnh có tỉ lệ $\frac{1}{500}$. Xét nghiệm dương tính với xác suất $\frac{99}{100}$ nếu có bệnh, và dương tính với xác suất $\frac{1}{100}$ nếu khỏe. Biết kết quả dương tính, xác suất có bệnh bằng bao nhiêu?`,
      think: "Đây là Bayes. Mẫu số là xác suất dương tính tính theo công thức xác suất toàn phần, gồm cả người khỏe bị dương tính nhầm.",
      answer: R`Đáp số là $\frac{99}{598}$`,
      steps: [
        { claim: R`Xác suất vừa có bệnh vừa dương tính là $\frac{1}{500}\cdot\frac{99}{100}=\frac{99}{50000}$.`, why: "Nhân vì mô hình lấy bệnh trước, rồi xét nghiệm theo tình trạng bệnh." },
        { claim: R`Xác suất dương tính là $\frac{99}{50000}+\frac{499}{500}\cdot\frac{1}{100}=\frac{598}{50000}$.`, why: "Hai trường hợp có bệnh và khỏe, loại trừ nhau." },
        { claim: R`Thương bằng $\frac{99}{598}$.`, why: "Bayes: chia cho xác suất của điều đã quan sát." },
      ],
      check: { expr: "(Rational(1,500)*Rational(99,100))/(Rational(1,500)*Rational(99,100)+Rational(499,500)*Rational(1,100))", expect: "Rational(99,598)" },
    },
    {
      kind: "thuc-te",
      prompt: R`Một lô có $20$ bóng đèn, trong đó $3$ bóng hỏng. Lấy ngẫu nhiên $1$ bóng. Xác suất lấy được bóng tốt bằng bao nhiêu?`,
      think: "Biến cố đối của lấy bóng hỏng. Không cần tổ hợp vì chỉ lấy một bóng.",
      answer: R`Đáp số là $\frac{17}{20}$`,
      steps: [
        { claim: R`Số bóng tốt là $20-3=17$.`, why: "Phần bù của số bóng hỏng." },
        { claim: R`Xác suất bằng $\frac{17}{20}$.`, why: "Mỗi bóng đồng khả năng được rút." },
      ],
      check: { expr: "Rational(17,20)", expect: "Rational(17,20)" },
    },
    {
      kind: "thuc-te",
      prompt: "Một học sinh đoán ngẫu nhiên một câu trắc nghiệm bốn lựa chọn, chỉ một đáp án đúng. Xác suất đoán sai bằng bao nhiêu?",
      think: "Bốn lựa chọn đồng khả năng. Đoán sai là biến cố đối của đoán đúng.",
      answer: R`Đáp số là $\frac{3}{4}$`,
      steps: [
        { claim: R`Xác suất đúng là $\frac{1}{4}$.`, why: "Một lựa chọn đúng trong bốn lựa chọn." },
        { claim: R`Xác suất sai là $1-\frac{1}{4}=\frac{3}{4}$.`, why: "Biến cố đối." },
      ],
      check: { expr: "1-Rational(1,4)", expect: "Rational(3,4)" },
    },
    {
      kind: "thuc-te",
      prompt: R`Gieo một xúc xắc cân đối hai lần. Xác suất cả hai lần đều ra mặt chẵn bằng bao nhiêu?`,
      think: R`Hai lần độc lập. Xác suất một lần ra chẵn là $\frac{3}{6}$.`,
      answer: R`Đáp số là $\frac{1}{4}$`,
      steps: [
        { claim: R`Một lần ra chẵn có xác suất $\frac{3}{6}=\frac{1}{2}$.`, why: "Ba mặt chẵn trong sáu mặt." },
        { claim: R`Hai lần độc lập nên xác suất là $\frac{1}{2}\cdot\frac{1}{2}=\frac{1}{4}$.`, why: "Độc lập cho phép nhân xác suất." },
      ],
      check: { expr: "Rational(1,2)*Rational(1,2)", expect: "Rational(1,4)" },
    },
    {
      kind: "tu-ra-de",
      prompt: "Hãy tự đặt một bài ít nhất một, dùng biến cố đối trên một không gian mẫu đếm được. Đề mẫu: tung hai đồng xu, hỏi xác suất có ít nhất một mặt ngửa.",
      think: "Viết rõ số phần tử của không gian mẫu và vì sao chúng đồng khả năng, rồi mới lấy phần bù.",
      answer: R`Xác suất mẫu bằng $\frac{3}{4}$.`,
      steps: [
        { claim: R`Có $4$ kết quả đồng khả năng.`, why: "Hai đồng xu, mỗi xu hai mặt." },
        { claim: R`Cả hai sấp là một kết quả.`, why: "Biến cố đối." },
        { claim: R`Xác suất ít nhất một mặt ngửa là $1-\frac{1}{4}=\frac{3}{4}$.`, why: "Công thức biến cố đối." },
      ],
      check: { expr: "1-Rational(1,4)", expect: "Rational(3,4)" },
    },
  ],
};
