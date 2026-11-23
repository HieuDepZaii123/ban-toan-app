/** Bốn mảng Khoa học mở rộng: Sinh học tính toán, Thuật toán, Sóng và quang học, Nhiệt và chất khí. */
import type { ScienceLesson } from "./lessons.ts";
import type { MoreLayer } from "./more.ts";

export const extraLessons = {
  sinh: {
    basic: {
      bits: [
        "Gen có hai alen: $A$ trội và $a$ lặn. Cơ thể $Aa$ cho giao tử $A$ và $a$ với xác suất $\\dfrac12$ mỗi loại.",
        "Phép lai $Aa\\cdot Aa$ cho tỉ lệ kiểu gen $1AA:2Aa:1aa$ và tỉ lệ kiểu hình $3$ trội $:1$ lặn.",
      ],
      drill: {
        q: "Lai $Aa\\cdot Aa$. Xác suất con có kiểu hình lặn là bao nhiêu?",
        answer: "$\\dfrac14$",
        steps: ["Kiểu hình lặn chỉ có kiểu gen $aa$.", "Cần giao tử $a$ từ cả bố và mẹ: $\\dfrac12\\cdot\\dfrac12=\\dfrac14$."],
      },
    },
    exam: {
      bits: [
        "Phân li độc lập: xác suất của hai tính trạng nhân với nhau. Lai $AaBb\\cdot AaBb$ cho tỉ lệ kiểu hình $9:3:3:1$.",
        "Quần thể cân bằng Hardy–Weinberg có tần số alen $p+q=1$ và tần số kiểu gen $p^2+2pq+q^2=1$.",
      ],
      drill: {
        q: "Quần thể cân bằng có tần số alen lặn $q=0{,}2$. Tần số kiểu gen đồng hợp lặn bằng bao nhiêu?",
        answer: "$0{,}04$",
        steps: ["Kiểu gen $aa$ có tần số $q^2$.", "$0{,}2^2=0{,}04$."],
      },
    },
    adv: {
      bits: [
        "Quần thể tăng trưởng theo hàm mũ: $N=N_0\\cdot 2^{t/T}$ khi số lượng nhân đôi sau mỗi chu kỳ $T$.",
        "Tăng trưởng $r$ phần trăm mỗi năm thì sau $n$ năm số lượng là $N_0(1+r)^n$.",
      ],
      drill: {
        q: "Một quần thể vi khuẩn nhân đôi sau mỗi 30 phút. Từ 200 con, sau 2 giờ có bao nhiêu con?",
        answer: "3200",
        steps: ["Hai giờ là 120 phút, tức $4$ chu kỳ.", "$200\\cdot 2^4=3200$."],
      },
    },
  },
  "thuat-toan": {
    basic: {
      bits: [
        "Hệ nhị phân dùng chữ số $0$ và $1$. Mỗi chữ số từ phải sang trái ứng với $1;\\ 2;\\ 4;\\ 8;\\ \\dots$",
        "Đổi số thập phân sang nhị phân bằng cách chia liên tiếp cho $2$ rồi ghi các số dư từ dưới lên.",
      ],
      code: "n = 13\nbits = \"\"\nwhile n > 0:\n    bits = str(n % 2) + bits\n    n = n // 2",
      drill: {
        q: "Viết số $13$ ở hệ nhị phân.",
        answer: "1101",
        steps: ["$13=1\\cdot 8+1\\cdot 4+0\\cdot 2+1$.", "Các chữ số là $1101$."],
      },
    },
    exam: {
      bits: [
        "Tìm kiếm nhị phân chỉ dùng cho dãy đã sắp xếp: mỗi bước so với phần tử giữa rồi bỏ đi một nửa.",
        "Dãy $n$ phần tử cần nhiều nhất $\\lceil\\log_2 n\\rceil+1$ lần so sánh, trong khi tìm tuần tự cần tới $n$ lần.",
      ],
      code: "def tim_nhi_phan(a, x):\n    lo, hi = 0, len(a) - 1\n    dem = 0\n    while lo <= hi:\n        dem = dem + 1\n        mid = (lo + hi) // 2\n        if a[mid] == x:\n            return mid, dem\n        if a[mid] < x:\n            lo = mid + 1\n        else:\n            hi = mid - 1\n    return -1, dem",
      drill: {
        q: "Dãy có $8$ số đã sắp xếp. Tìm kiếm nhị phân cần nhiều nhất bao nhiêu lần so sánh?",
        answer: "4",
        steps: ["$\\log_2 8=3$.", "Số lần so sánh nhiều nhất là $3+1=4$."],
      },
    },
    adv: {
      bits: [
        "Bài toán đếm cách đi lên cầu thang: $f(n)=f(n-1)+f(n-2)$, vì bước cuối là $1$ bậc hoặc $2$ bậc.",
        "Quy hoạch động lưu lại kết quả của các bài nhỏ để không tính lặp, nên chạy trong $n$ bước thay vì $2^n$ bước.",
      ],
      code: "def so_cach(n):\n    f = [1, 1]\n    for i in range(2, n + 1):\n        f.append(f[i-1] + f[i-2])\n    return f[n]",
      drill: {
        q: "Có bao nhiêu cách leo $4$ bậc thang nếu mỗi lần bước $1$ hoặc $2$ bậc?",
        answer: "5",
        steps: ["$f(1)=1$ và $f(2)=2$.", "$f(3)=3$ và $f(4)=f(3)+f(2)=5$."],
      },
    },
  },
  "song-quang": {
    basic: {
      bits: [
        "Sóng có vận tốc truyền $v=\\lambda f$, trong đó $\\lambda$ là bước sóng và $f$ là tần số.",
        "Âm truyền trong không khí với vận tốc khoảng $340\\ \\mathrm{m/s}$, còn ánh sáng truyền với khoảng $3\\cdot 10^8\\ \\mathrm{m/s}$.",
      ],
      drill: {
        q: "Sóng có bước sóng $2\\ \\mathrm{m}$ và tần số $5\\ \\mathrm{Hz}$. Vận tốc truyền bằng bao nhiêu m/s?",
        answer: "10",
        steps: ["$v=\\lambda f$.", "$2\\cdot 5=10$."],
      },
    },
    exam: {
      bits: [
        "Định luật khúc xạ: $n_1\\sin i=n_2\\sin r$, với $n$ là chiết suất của môi trường.",
        "Thấu kính mỏng: $\\dfrac1f=\\dfrac1d+\\dfrac1{d'}$, với $d$ là khoảng cách vật, $d'$ là khoảng cách ảnh, và độ phóng đại $k=-\\dfrac{d'}{d}$.",
      ],
      drill: {
        q: "Tia sáng từ không khí ($n=1$) vào thủy tinh ($n=1{,}5$) với $\\sin i=0{,}75$. Tính $\\sin r$.",
        answer: "0,5",
        steps: ["$1\\cdot 0{,}75=1{,}5\\sin r$.", "$\\sin r=\\dfrac{0{,}75}{1{,}5}=0{,}5$."],
      },
    },
    adv: {
      bits: [
        "Giao thoa hai khe Young: khoảng vân $i=\\dfrac{\\lambda D}{a}$, với $D$ là khoảng cách từ hai khe tới màn và $a$ là khoảng cách giữa hai khe.",
        "Mức cường độ âm $L=10\\log\\dfrac{I}{I_0}$ đo bằng đê-xi-ben. Cường độ tăng $10$ lần thì mức tăng $10$ dB.",
      ],
      drill: {
        q: "Cường độ âm tăng $1000$ lần so với $I_0$. Mức cường độ âm bằng bao nhiêu dB?",
        answer: "30",
        steps: ["$L=10\\log 1000$.", "$10\\cdot 3=30$."],
      },
    },
  },
  "nhiet-khi": {
    basic: {
      bits: [
        "Nhiệt lượng thu vào hay tỏa ra: $Q=mc\\,\\Delta t$, với nhiệt dung riêng của nước $c=4200\\ \\mathrm{J/(kg\\cdot K)}$.",
        "Nhiệt độ tuyệt đối $T=t+273$, với $t$ tính bằng độ C và $T$ tính bằng kenvin.",
      ],
      drill: {
        q: "Đun nóng $1\\ \\mathrm{kg}$ nước từ $20\\ ^\\circ\\mathrm{C}$ lên $30\\ ^\\circ\\mathrm{C}$. Nhiệt lượng cần bao nhiêu jun?",
        answer: "42000",
        steps: ["$\\Delta t=10$.", "$Q=1\\cdot 4200\\cdot 10=42000$."],
      },
    },
    exam: {
      bits: [
        "Đẳng nhiệt (định luật Bôi-lơ–Ma-ri-ốt): $p_1V_1=p_2V_2$. Đẳng áp: $\\dfrac{V_1}{T_1}=\\dfrac{V_2}{T_2}$.",
        "Phương trình trạng thái khí lí tưởng: $\\dfrac{p_1V_1}{T_1}=\\dfrac{p_2V_2}{T_2}$, và $T$ phải tính bằng kenvin.",
      ],
      drill: {
        q: "Khí $4\\ \\mathrm{L}$ ở áp suất $1\\ \\mathrm{atm}$ bị nén đẳng nhiệt tới $2\\ \\mathrm{atm}$. Thể tích mới bằng bao nhiêu lít?",
        answer: "2",
        steps: ["$p_1V_1=p_2V_2$.", "$V_2=\\dfrac{1\\cdot 4}{2}=2$."],
      },
    },
    adv: {
      bits: [
        "Nguyên lý thứ nhất: $\\Delta U=Q+A$, với $A$ là công mà khí nhận. Khí sinh công thì $A<0$.",
        "Hiệu suất lí tưởng của động cơ nhiệt giữa hai nguồn $T_1>T_2$ là $H=1-\\dfrac{T_2}{T_1}$.",
      ],
      drill: {
        q: "Động cơ nhiệt lí tưởng chạy giữa nguồn nóng $600\\ \\mathrm{K}$ và nguồn lạnh $300\\ \\mathrm{K}$. Hiệu suất bằng bao nhiêu?",
        answer: "0,5",
        steps: ["$H=1-\\dfrac{T_2}{T_1}$.", "$1-\\dfrac{300}{600}=0{,}5$."],
      },
    },
  },
} satisfies Record<string, ScienceLesson>;

export const extraMore = {
  sinh: {
    basic: {
      bits: [
        "Xác suất của hai biến cố độc lập thì nhân với nhau, còn các trường hợp loại trừ nhau thì cộng.",
        "Phép lai phân tích dùng cơ thể đồng hợp lặn $aa$ để biết kiểu gen của cơ thể trội: nếu con có cả trội và lặn thì cơ thể đó dị hợp.",
        "Nhóm máu và nhiều tính trạng khác có nhiều hơn hai alen, nhưng mỗi cơ thể vẫn chỉ mang hai alen của một gen.",
      ],
      drills: [
        { q: "Lai $Aa\\cdot Aa$ được $160$ con. Kì vọng có bao nhiêu con kiểu hình trội?", answer: "120", steps: ["Xác suất trội là $\\dfrac34$.", "$160\\cdot\\dfrac34=120$."], num: 120, calc: () => (160 * 3) / 4 },
        { q: "Lai $AaBb\\cdot AaBb$ với phân li độc lập. Xác suất con trội cả hai tính trạng là bao nhiêu?", answer: "0,5625", steps: ["Mỗi tính trạng trội có xác suất $\\dfrac34$.", "$\\dfrac34\\cdot\\dfrac34=\\dfrac{9}{16}=0{,}5625$."], num: 0.5625, calc: () => 9 / 16 },
      ],
    },
    exam: {
      bits: [
        "ADN có hai mạch bổ sung theo nguyên tắc $A=T$ và $G=X$, nên tổng số nuclêôtit bằng $2(A+G)$.",
        "Từ tần số kiểu gen đồng hợp lặn $q^2$ có thể suy ra $q=\\sqrt{q^2}$, rồi tính $p=1-q$ và tần số dị hợp $2pq$.",
        "Mỗi cặp nuclêôtit dài khoảng $0{,}34\\ \\mathrm{nm}$, nên chiều dài đoạn ADN bằng số cặp nuclêôtit nhân $0{,}34\\ \\mathrm{nm}$.",
      ],
      drills: [
        { q: "Quần thể cân bằng có tần số alen lặn $q=0{,}3$. Tần số kiểu gen dị hợp $2pq$ bằng bao nhiêu?", answer: "0,42", steps: ["$p=1-0{,}3=0{,}7$.", "$2\\cdot 0{,}7\\cdot 0{,}3=0{,}42$."], num: 0.42, calc: () => 2 * 0.7 * 0.3 },
        { q: "Một đoạn ADN có $3000$ nuclêôtit, trong đó có $600$ nuclêôtit loại A. Số nuclêôtit loại G bằng bao nhiêu?", answer: "900", steps: ["Mỗi mạch bổ sung nên $A=T=600$.", "$2A+2G=3000$ nên $G=1500-600=900$."], num: 900, calc: () => 3000 / 2 - 600 },
      ],
    },
    adv: {
      bits: [
        "Số lượng tăng theo hàm mũ sẽ không kéo dài mãi: mô hình logistic có sức chứa $K$ làm tăng trưởng chậm lại khi $N$ gần $K$.",
        "Quy tắc $70$: nếu tăng $r$ phần trăm mỗi năm thì số lượng gần gấp đôi sau $\\dfrac{70}{r}$ năm.",
        "Thời gian nhân đôi và hằng số tăng trưởng liên hệ qua $T=\\dfrac{\\ln 2}{k}$ với mô hình $N=N_0e^{kt}$.",
      ],
      drills: [
        { q: "Vi khuẩn nhân đôi sau mỗi $20$ phút. Từ $100$ con, sau $2$ giờ có bao nhiêu con?", answer: "6400", steps: ["Hai giờ là $120$ phút, tức $6$ chu kỳ.", "$100\\cdot 2^6=6400$."], num: 6400, calc: () => 100 * 2 ** (120 / 20) },
        { q: "Một quần thể tăng $4\\%$ mỗi năm. Theo quy tắc $70$, sau khoảng bao nhiêu năm thì số lượng gấp đôi?", answer: "17,5", steps: ["Số năm xấp xỉ $\\dfrac{70}{4}$.", "$\\dfrac{70}{4}=17{,}5$."], num: 17.5, calc: () => 70 / 4 },
      ],
    },
  },
  "thuat-toan": {
    basic: {
      bits: [
        "Một số nhị phân $n$ chữ số (cho phép chữ số $0$ đứng đầu) có thể biểu diễn $2^n$ giá trị khác nhau.",
        "Vòng lặp `while` lặp lại cho đến khi điều kiện sai, nên phải chắc điều kiện sẽ sai sau một số bước hữu hạn.",
        "Thuật toán tốt chạy đúng với mọi đầu vào hợp lệ, kể cả trường hợp biên như dãy rỗng hay một phần tử.",
      ],
      drills: [
        { q: "Số nhị phân $1101$ bằng bao nhiêu ở hệ thập phân?", answer: "13", steps: ["$1\\cdot 8+1\\cdot 4+0\\cdot 2+1\\cdot 1$.", "$8+4+0+1=13$."], num: 13, calc: () => Number.parseInt("1101", 2) },
        { q: "Có bao nhiêu số nhị phân $5$ chữ số, cho phép chữ số $0$ đứng đầu?", answer: "32", steps: ["Mỗi chữ số có $2$ lựa chọn.", "$2^5=32$."], num: 32, calc: () => 2 ** 5 },
      ],
    },
    exam: {
      bits: [
        "Sắp xếp chọn tìm phần tử nhỏ nhất rồi đưa về đầu, lặp lại với phần còn lại; số lần so sánh là $\\dfrac{n(n-1)}{2}$.",
        "Độ phức tạp thời gian cho biết số bước tăng thế nào khi $n$ tăng: $n$ là tuyến tính, $n^2$ là bình phương, $\\log n$ là rất chậm.",
        "Trước khi tìm nhị phân phải sắp xếp dãy; nếu chỉ tìm một lần thì tìm tuần tự có thể nhanh hơn.",
      ],
      drills: [
        { q: "Dãy $1000$ số đã sắp xếp. Số lần chia đôi nhiều nhất để thu hẹp về một phần tử là bao nhiêu?", answer: "10", steps: ["Cần $2^k\\ge 1000$.", "$2^{10}=1024$ nên $k=10$."], num: 10, calc: () => Math.ceil(Math.log2(1000)) },
        { q: "Sắp xếp chọn $20$ số cần bao nhiêu lần so sánh?", answer: "190", steps: ["Số lần so sánh là $\\dfrac{n(n-1)}{2}$.", "$\\dfrac{20\\cdot 19}{2}=190$."], num: 190, calc: () => (20 * 19) / 2 },
      ],
    },
    adv: {
      bits: [
        "Hàm đệ quy gọi lại chính nó với bài nhỏ hơn và phải có điều kiện dừng; thiếu điều kiện dừng thì lặp vô hạn.",
        "Tính $F_n$ bằng đệ quy thuần túy gọi lại cùng giá trị rất nhiều lần nên tốn khoảng $2^n$ bước; ghi nhớ kết quả giảm còn $n$ bước.",
        "Đồ thị và tìm đường ngắn nhất: duyệt theo chiều rộng tìm được đường ít cạnh nhất khi mọi cạnh có độ dài như nhau.",
      ],
      drills: [
        { q: "Dãy Fibonacci có $F_0=0$, $F_1=1$ và $F_n=F_{n-1}+F_{n-2}$. Tính $F_{10}$.", answer: "55", steps: ["Các số là $0;\\ 1;\\ 1;\\ 2;\\ 3;\\ 5;\\ 8;\\ 13;\\ 21;\\ 34;\\ 55$.", "$F_{10}=55$."], num: 55, calc: () => { let a = 0; let b = 1; for (let i = 0; i < 10; i += 1) [a, b] = [b, a + b]; return a; } },
        { q: "Có bao nhiêu cách leo $6$ bậc thang nếu mỗi lần bước $1$ hoặc $2$ bậc?", answer: "13", steps: ["Số cách theo $f(n)=f(n-1)+f(n-2)$ với $f(1)=1$, $f(2)=2$.", "Các giá trị là $1;\\ 2;\\ 3;\\ 5;\\ 8;\\ 13$."], num: 13, calc: () => { const f = [1, 1]; for (let i = 2; i <= 6; i += 1) f.push(f[i - 1]! + f[i - 2]!); return f[6]!; } },
      ],
    },
  },
  "song-quang": {
    basic: {
      bits: [
        "Sóng ngang có phương dao động vuông góc với phương truyền, sóng dọc có phương dao động trùng phương truyền. Âm là sóng dọc.",
        "Chu kỳ $T=\\dfrac1f$. Tần số càng lớn thì âm càng cao, biên độ càng lớn thì âm càng to.",
        "Sét và sấm xảy ra cùng lúc, nhưng ánh sáng đến gần như tức thì còn tiếng sấm đến chậm hơn.",
      ],
      drills: [
        { q: "Sóng âm vận tốc $340\\ \\mathrm{m/s}$ có tần số $170\\ \\mathrm{Hz}$. Bước sóng bằng bao nhiêu mét?", answer: "2", steps: ["$\\lambda=\\dfrac{v}{f}$.", "$\\dfrac{340}{170}=2$."], num: 2, calc: () => 340 / 170 },
        { q: "Thấy chớp sau $3$ giây mới nghe tiếng sấm, lấy vận tốc âm $340\\ \\mathrm{m/s}$. Nơi sét đánh cách bao nhiêu mét?", answer: "1020", steps: ["Bỏ qua thời gian ánh sáng truyền.", "$s=vt=340\\cdot 3=1020$."], num: 1020, calc: () => 340 * 3 },
      ],
    },
    exam: {
      bits: [
        "Khi ánh sáng đi từ môi trường chiết quang kém sang môi trường chiết quang hơn thì tia khúc xạ lại gần pháp tuyến.",
        "Thấu kính hội tụ có $f>0$ và cho ảnh thật khi vật ở xa hơn tiêu cự. Ảnh thật ngược chiều với vật.",
        "Độ phóng đại có giá trị tuyệt đối $|k|=\\dfrac{d'}{d}$, nên chiều cao ảnh bằng $|k|$ nhân chiều cao vật.",
      ],
      drills: [
        { q: "Thấu kính hội tụ có $f=10\\ \\mathrm{cm}$, vật đặt cách thấu kính $30\\ \\mathrm{cm}$. Ảnh cách thấu kính bao nhiêu cm?", answer: "15", steps: ["$\\dfrac{1}{d'}=\\dfrac{1}{10}-\\dfrac{1}{30}=\\dfrac{2}{30}$.", "$d'=15$."], num: 15, calc: () => 1 / (1 / 10 - 1 / 30) },
        { q: "Với thấu kính trên, vật cao $6\\ \\mathrm{cm}$. Ảnh cao bao nhiêu cm?", answer: "3", steps: ["$|k|=\\dfrac{d'}{d}=\\dfrac{15}{30}=0{,}5$.", "Chiều cao ảnh là $0{,}5\\cdot 6=3$."], num: 3, calc: () => 0.5 * 6 },
      ],
    },
    adv: {
      bits: [
        "Vân sáng nằm tại vị trí $x=k\\,i$ với $k$ nguyên, và vân tối nằm ở $x=\\left(k+\\dfrac12\\right)i$.",
        "Hiện tượng phản xạ toàn phần xảy ra khi tia sáng đi từ môi trường chiết quang hơn sang kém hơn với góc tới lớn hơn góc giới hạn, $\\sin i_{gh}=\\dfrac{n_2}{n_1}$.",
        "Năng lượng của một phôtôn là $\\varepsilon=hf$, nên ánh sáng tần số càng cao thì mỗi phôtôn càng mang nhiều năng lượng.",
      ],
      drills: [
        { q: "Hai khe cách nhau $a=1\\ \\mathrm{mm}$, màn cách hai khe $D=2\\ \\mathrm{m}$, ánh sáng có bước sóng $0{,}5\\ \\mu\\mathrm{m}$. Khoảng vân bằng bao nhiêu mm?", answer: "1", steps: ["$i=\\dfrac{\\lambda D}{a}$.", "$\\dfrac{0{,}5\\cdot 10^{-6}\\cdot 2}{10^{-3}}=10^{-3}\\ \\mathrm{m}$, tức $1$ mm."], num: 1, calc: () => ((0.5e-6 * 2) / 1e-3) * 1000 },
        { q: "Tia sáng đi từ thủy tinh ($n_1=2$) ra không khí ($n_2=1$). Tính $\\sin i_{gh}$.", answer: "0,5", steps: ["$\\sin i_{gh}=\\dfrac{n_2}{n_1}$.", "$\\dfrac{1}{2}=0{,}5$."], num: 0.5, calc: () => 1 / 2 },
      ],
    },
  },
  "nhiet-khi": {
    basic: {
      bits: [
        "Khi hai vật khác nhiệt độ tiếp xúc thì nhiệt truyền từ vật nóng sang vật lạnh cho đến khi cân bằng nhiệt, và nhiệt tỏa ra bằng nhiệt thu vào.",
        "Nhiệt dung riêng là nhiệt lượng cần để $1\\ \\mathrm{kg}$ chất tăng thêm $1\\ \\mathrm{K}$. Nước có nhiệt dung riêng lớn nên nóng lên và nguội đi chậm.",
        "Thang kenvin không có số âm: $0\\ \\mathrm{K}$ là độ không tuyệt đối, tương ứng khoảng $-273\\ ^\\circ\\mathrm{C}$.",
      ],
      drills: [
        { q: "Đun nóng $2\\ \\mathrm{kg}$ nước từ $20\\ ^\\circ\\mathrm{C}$ lên $70\\ ^\\circ\\mathrm{C}$, với $c=4200\\ \\mathrm{J/(kg\\cdot K)}$. Nhiệt lượng cần bằng bao nhiêu jun?", answer: "420000", steps: ["$\\Delta t=70-20=50$.", "$Q=2\\cdot 4200\\cdot 50=420000$."], num: 420000, calc: () => 2 * 4200 * 50 },
        { q: "Nhiệt độ $27\\ ^\\circ\\mathrm{C}$ tương ứng bao nhiêu kenvin?", answer: "300", steps: ["$T=t+273$.", "$27+273=300$."], num: 300, calc: () => 27 + 273 },
      ],
    },
    exam: {
      bits: [
        "Khi áp dụng phương trình trạng thái, phải đổi nhiệt độ sang kenvin; dùng độ C sẽ ra kết quả sai.",
        "Đẳng tích: $\\dfrac{p_1}{T_1}=\\dfrac{p_2}{T_2}$. Khí trong bình kín nóng lên thì áp suất tăng.",
        "Phương trình Cla-pê-rôn–Men-đê-lê-ép $pV=nRT$ với $R\\approx 8{,}31\\ \\mathrm{J/(mol\\cdot K)}$ cho biết số mol khi biết ba đại lượng còn lại.",
      ],
      drills: [
        { q: "Khí $2\\ \\mathrm{L}$ ở $300\\ \\mathrm{K}$ được nung đẳng áp tới $450\\ \\mathrm{K}$. Thể tích mới bằng bao nhiêu lít?", answer: "3", steps: ["$\\dfrac{V_1}{T_1}=\\dfrac{V_2}{T_2}$.", "$V_2=2\\cdot\\dfrac{450}{300}=3$."], num: 3, calc: () => (2 * 450) / 300 },
        { q: "Khí trong bình kín có áp suất $1\\ \\mathrm{atm}$ ở $300\\ \\mathrm{K}$. Nung tới $600\\ \\mathrm{K}$ thì áp suất bằng bao nhiêu atm?", answer: "2", steps: ["Thể tích không đổi nên $\\dfrac{p_1}{T_1}=\\dfrac{p_2}{T_2}$.", "$p_2=1\\cdot\\dfrac{600}{300}=2$."], num: 2, calc: () => (1 * 600) / 300 },
      ],
    },
    adv: {
      bits: [
        "Quá trình đẳng nhiệt của khí lí tưởng có $\\Delta U=0$ nên $Q=-A$: nhiệt khí nhận bằng công khí sinh ra.",
        "Hiệu suất động cơ nhiệt thực tế luôn nhỏ hơn hiệu suất lí tưởng $1-\\dfrac{T_2}{T_1}$ vì có ma sát và mất nhiệt.",
        "Nguyên lý thứ hai: nhiệt không tự truyền từ vật lạnh sang vật nóng, và không có động cơ nhiệt nào đạt hiệu suất $100\\%$.",
      ],
      drills: [
        { q: "Động cơ nhiệt lí tưởng chạy giữa nguồn nóng $500\\ \\mathrm{K}$ và nguồn lạnh $300\\ \\mathrm{K}$. Hiệu suất bằng bao nhiêu?", answer: "0,4", steps: ["$H=1-\\dfrac{T_2}{T_1}$.", "$1-\\dfrac{300}{500}=0{,}4$."], num: 0.4, calc: () => 1 - 300 / 500 },
        { q: "Khí nhận nhiệt $300\\ \\mathrm{J}$ và nội năng tăng $200\\ \\mathrm{J}$. Khí đã sinh công bao nhiêu jun?", answer: "100", steps: ["Công khí sinh ra bằng nhiệt nhận trừ phần tăng nội năng.", "$300-200=100$."], num: 100, calc: () => 300 - 200 },
      ],
    },
  },
} satisfies Record<string, Record<"basic" | "exam" | "adv", MoreLayer & { drills: (MoreLayer["drills"][number])[] }>>;
