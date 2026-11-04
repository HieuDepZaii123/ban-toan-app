import type { TopicDang } from "./types.ts";

const R = String.raw;

export const derivativeDang: TopicDang = {
  id: "derivative",
  title: "Đạo hàm",
  dang: [
    {
      name: "Tiếp tuyến tại một điểm",
      nhanDang: "Bài cho hàm số và một hoành độ, rồi hỏi phương trình tiếp tuyến tại điểm đó.",
      phuongPhap: R`Tiếp tuyến tại $x_0$ là $y=f'(x_0)(x-x_0)+f(x_0)$, với điều kiện $f$ khả vi tại $x_0$. Hệ số góc $f'(x_0)$ là điều kiện cần và đủ để viết đúng đường thẳng này khi đã biết tiếp điểm. Nếu đề chỉ cho tiếp tuyến song song một đường, điều kiện bằng hệ số góc mới là cần; phải giải rồi thử lại điểm tiếp xúc.`,
      viDu: {
        prompt: R`Viết tiếp tuyến của $y=x^3-3x^2$ tại $x=1$.`,
        steps: [
          { claim: R`Ta tính $y(1)=1-3=-2$.`, why: "Tiếp điểm phải nằm trên đồ thị, nên tung độ lấy bằng giá trị hàm." },
          { claim: R`Đạo hàm là $y'=3x^2-6x$, nên $y'(1)=3-6=-3$.`, why: "Quy tắc $(x^n)'=nx^{n-1}$ áp dụng từng hạng tử, rồi thay đúng hoành độ tiếp xúc." },
          { claim: R`Phương trình là $y=-3(x-1)-2$, tức là $y=-3x+1$.`, why: "Đây là dạng điểm-hệ số góc. Hàm đa thức nên khả vi tại mọi điểm, không phải loại nghiệm." },
        ],
        ket: R`Tiếp tuyến cần tìm là $y=-3x+1$.`,
        check: { expr: "-3*(1-1)-2", expect: "-2" },
      },
      loi: "Lấy hệ số góc bằng giá trị hàm, hoặc quên thay $x_0$ vào đạo hàm.",
      luyen: {
        kind: "luyen",
        prompt: R`Tính $f'(1)$ với $f(x)=(x^2+1)^3$.`,
        think: "Hàm có dạng lũy thừa của một biểu thức. Đạo hàm lớp ngoài nhân đạo hàm lớp trong, rồi mới thay số.",
        answer: "Đáp số là $24$",
        steps: [
          { claim: R`Ta có $f'(x)=3(x^2+1)^2\cdot 2x$.`, why: "Quy tắc hàm hợp: đạo hàm của $u^3$ là $3u^2u'$." },
          { claim: R`Thay $x=1$ được $3\cdot 4\cdot 2=24$.`, why: "Vì $(1^2+1)^2=4$ và $2x=2$. Không còn điều kiện loại." },
        ],
        check: { expr: "3*(1**2+1)**2*2*1", expect: "24" },
      },
    },
    {
      name: "Cực trị và bài toán tối ưu một biến",
      nhanDang: "Bài hỏi điểm cực trị, hoặc một đại lượng thực tế viết được thành hàm một biến trên một khoảng.",
      phuongPhap: R`Điều kiện $f'(x_0)=0$ chỉ là cần cho cực trị của hàm khả vi. Điều kiện đủ là $f'$ đổi dấu qua $x_0$. Trên một đoạn đóng, giá trị lớn nhất và nhỏ nhất nằm ở các điểm tới hạn trong đoạn hoặc ở hai đầu mút; phải so sánh hết các điểm đó.`,
      viDu: {
        prompt: R`Một rào dài $40$ m chắn ba phía của hình chữ nhật, phía còn lại là tường. Diện tích lớn nhất bằng bao nhiêu?`,
        steps: [
          { claim: R`Gọi $x$ là cạnh vuông góc với tường, $0<x<20$. Cạnh còn lại là $40-2x$.`, why: "Hai cạnh vuông góc dùng hết $2x$ mét lưới. Điều kiện $x<20$ để cạnh kia dương." },
          { claim: R`Diện tích là $S(x)=x(40-2x)=40x-2x^2$.`, why: "Diện tích hình chữ nhật bằng tích hai cạnh kề." },
          { claim: R`Ta có $S'(x)=40-4x=0$ khi $x=10$, và $S'$ đổi từ dương sang âm.`, why: "Nghiệm đạo hàm là điều kiện cần. Đổi dấu cho điều kiện đủ của cực đại." },
          { claim: R`Ta có $S(10)=10\cdot 20=200$.`, why: "Cạnh song song tường bằng $40-20=20$. Đây là giá trị duy nhất cần so, vì trên khoảng mở cực đại này là lớn nhất." },
        ],
        ket: "Diện tích lớn nhất bằng $200$ mét vuông, khi cạnh vuông góc tường dài $10$ mét.",
        check: { expr: "10*(40-2*10)", expect: "200" },
      },
      loi: "Chỉ giải $S'=0$ rồi không xét dấu, hoặc chọn $x$ nằm ngoài miền hình còn dựng được.",
      luyen: {
        kind: "luyen",
        prompt: R`Tìm giá trị lớn nhất của $y=-x^2+4x$ trên đoạn $[0;3]$.`,
        think: "Trên đoạn đóng phải tính tại đầu mút và tại điểm tới hạn nếu điểm đó thuộc đoạn.",
        answer: "Đáp số là $4$",
        steps: [
          { claim: R`Đạo hàm $y'=-2x+4$ triệt tiêu tại $x=2$, và $2$ thuộc $[0;3]$.`, why: "Điểm tới hạn trong đoạn là ứng viên, cùng với hai đầu mút." },
          { claim: R`Ba giá trị là $y(0)=0$, $y(2)=4$, $y(3)=3$.`, why: "Hàm liên tục trên đoạn đóng nên giá trị lớn nhất là số lớn nhất trong danh sách này." },
        ],
        check: { expr: "-2**2+4*2", expect: "4" },
      },
    },
  ],
  sangTao: [
    {
      kind: "thuc-te",
      prompt: R`Một vật được ném lên với độ cao $h(t)=20t-5t^2$ mét, $t$ tính bằng giây và $t\ge 0$. Độ cao lớn nhất bằng bao nhiêu?`,
      think: "Độ cao là parabol quay xuống. Điểm cao nhất ứng với đạo hàm triệt tiêu và đổi dấu, rồi phải kiểm tra $t$ không âm.",
      answer: "Đáp số là $20$ mét tại $t=2$ giây",
      steps: [
        { claim: R`Ta có $h'(t)=20-10t=0$ khi $t=2$.`, why: "Đây là điều kiện cần. Vì $h'$ đổi từ dương sang âm nên đây là cực đại, tức điều kiện đủ." },
        { claim: R`Ta có $h(2)=40-20=20$, và $t=2>0$.`, why: "Thay vào hàm. Thời điểm nằm trong miền đang xét nên không bị loại." },
      ],
      check: { expr: "20*2-5*2**2", expect: "20" },
    },
    {
      kind: "thuc-te",
      prompt: R`Chi phí sản xuất $x$ sản phẩm là $C(x)=x^2+20x+100$, với $x>0$. Đạo hàm chi phí tại $x=10$ bằng bao nhiêu?`,
      think: "Đạo hàm chi phí cho tốc độ tăng chi phí tại mức sản lượng đang xét, không phải chính chi phí.",
      answer: "Đáp số là $40$",
      steps: [
        { claim: R`Ta có $C'(x)=2x+20$.`, why: "Đạo hàm từng hạng tử của đa thức." },
        { claim: R`Ta có $C'(10)=20+20=40$.`, why: "Thay đúng sản lượng. Không cộng thêm hằng số $100$ vì hằng số đã mất khi đạo hàm." },
      ],
      check: { expr: "2*10+20", expect: "40" },
    },
    {
      kind: "thuc-te",
      prompt: R`Một hình chữ nhật nội tiếp nửa đường tròn bán kính $2$, đáy nằm trên đường kính. Diện tích lớn nhất bằng bao nhiêu?`,
      think: "Đặt nửa đáy là $x$. Chiều cao là tung độ trên đường tròn. Sau đó xét đạo hàm trên miền đáy còn dương.",
      answer: "Đáp số là $4$",
      steps: [
        { claim: R`Với $0<x<2$, chiều cao là $\sqrt{4-x^2}$ và diện tích là $S(x)=2x\sqrt{4-x^2}$.`, why: "Đáy bằng $2x$. Điểm trên đường tròn thỏa $x^2+y^2=4$ và $y>0$." },
        { claim: R`Bình phương $S^2=4x^2(4-x^2)$ đạt lớn nhất khi $u=x^2=2$.`, why: "Hàm $u(4-u)$ trên $(0;4)$ có đạo hàm $4-2u$, triệt tiêu tại $u=2$ và đổi dấu từ dương sang âm." },
        { claim: R`Ta có $S=\sqrt{4\cdot 2\cdot 2}=4$.`, why: R`Lấy căn không âm của giá trị lớn nhất của $S^2$. Điểm $x=\sqrt{2}$ nằm trong $(0;2)$.` },
      ],
      check: { expr: "sqrt(4*2*2)", expect: "4" },
    },
    {
      kind: "thuc-te",
      prompt: R`Nhiệt độ một cốc nước là $T(t)=25+60e^{-t/4}$ độ, $t\ge 0$ tính bằng phút. Tốc độ giảm nhiệt tại $t=0$ có trị tuyệt đối bằng bao nhiêu?`,
      think: "Tốc độ thay đổi là đạo hàm. Dấu âm nghĩa là đang giảm; trị tuyệt đối mới là mức giảm.",
      answer: "Đáp số là $15$ độ mỗi phút",
      steps: [
        { claim: R`Ta có $T'(t)=60\cdot e^{-t/4}\cdot\left(-\frac{1}{4}\right)=-15e^{-t/4}$.`, why: R`Đạo hàm hàm mũ hợp, hệ số trong mũ là $-\frac{1}{4}$.` },
        { claim: R`Ta có $T'(0)=-15$, nên trị tuyệt đối bằng $15$.`, why: "Vì $e^0=1$. Dấu âm xác nhận nhiệt đang giảm." },
      ],
      check: { expr: "60*(1/4)", expect: "15" },
    },
    {
      kind: "tu-ra-de",
      prompt: "Hãy tự đặt một bài tìm tiếp tuyến của một đa thức bậc ba tại một điểm nguyên. Dưới đây là một đề mẫu đã giải để đối chiếu cách trình bày.",
      think: "Đề mẫu phải cho hàm và một điểm. Lời giải phải tính cả tung độ tiếp điểm lẫn hệ số góc, rồi viết đủ phương trình.",
      answer: R`Với đề mẫu $y=x^3$ tại $x=2$, tiếp tuyến là $y=12x-16$.`,
      steps: [
        { claim: R`Đề mẫu: viết tiếp tuyến của $y=x^3$ tại $x=2$.`, why: "Một đề hợp lệ phải nêu hàm và vị trí tiếp xúc." },
        { claim: R`Ta có $y(2)=8$ và $y'=3x^2$ nên $y'(2)=12$.`, why: "Cần cả hai số này. Chỉ có đạo hàm thì chưa có tiếp điểm." },
        { claim: R`Phương trình là $y=12(x-2)+8=12x-16$.`, why: "Đa thức khả vi mọi nơi, nên không phải thử lại điều kiện tồn tại." },
      ],
      check: { expr: "12*(2-2)+8", expect: "8" },
    },
  ],
};
