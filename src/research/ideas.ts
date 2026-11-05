const R = String.raw;

export type IdeaKind = "y-tuong" | "chu-de";

export type ResearchIdea = {
  id: string;
  kind: IdeaKind;
  field: string;
  title: string;
  question: string;
  method: string;
  steps: readonly string[];
  /** Existing sheet. Omitted when the brief stands alone. */
  href?: string;
};

export const researchIdeas: readonly ResearchIdea[] = [
  {
    id: "dinh-khi-b-chay",
    kind: "y-tuong",
    field: "Đại số",
    title: "Quỹ tích đỉnh khi b chạy",
    question: R`$y=x^2+bx+1$, $b\in\mathbb{R}$. Đỉnh vẽ đường nào?`,
    method: R`Viết đỉnh $\left(-\dfrac{b}{2};\,1-\dfrac{b^2}{4}\right)$, rồi khử $b$.`,
    steps: [
      R`Đặt $h=-\dfrac{b}{2}$, suy ra $b=-2h$.`,
      R`Tung độ $k=1-h^2$.`,
      R`Quỹ tích là parabol $k=1-h^2$, đỉnh tại $(0;1)$.`,
    ],
    href: "/t/quadratic?tab=nc&n=quad-r-locus",
  },
  {
    id: "quy-tac-72",
    kind: "y-tuong",
    field: "Đại số",
    title: "Quy tắc 72 và thời gian gấp đôi",
    question: R`Với lãi suất $r$, $t=\dfrac{\ln 2}{\ln(1+r)}$ lệch bao nhiêu so với $\dfrac{72}{100r}$?`,
    method: R`Tính cả hai công thức tại $r=0{,}08$ và $r=0{,}20$, rồi so lệch.`,
    steps: [
      R`$r=0{,}08$: $\dfrac{\ln 2}{\ln 1{,}08}\approx 9{,}006$, còn $\dfrac{72}{8}=9$.`,
      R`Lệch khoảng $0{,}006$ năm, tức khoảng $0{,}07\%$.`,
      R`$r=0{,}20$: log cho $\approx 3{,}80$, quy tắc $\dfrac{72}{20}=3{,}6$, lệch khoảng $0{,}20$ năm.`,
    ],
    href: "/t/exp?tab=nc&n=exp-r-double",
  },
  {
    id: "sai-so-trung-diem",
    kind: "y-tuong",
    field: "Giải tích",
    title: "Sai số trung điểm trên $y=x^2$",
    question: R`Trên $[0;2]$, một hình chữ nhật trung điểm lệch bao nhiêu so với $\int_0^2 x^2\,dx$?`,
    method: R`So $\Delta x\cdot f(1)$ với nguyên hàm $\dfrac{x^3}{3}$.`,
    steps: [
      R`$\int_0^2 x^2\,dx=\left[\dfrac{x^3}{3}\right]_0^2=\dfrac{8}{3}$.`,
      R`Trung điểm $x=1$, cao $1$, rộng $2$: diện tích $2$.`,
      R`Chia đôi: hình tại $0{,}5$ và $1{,}5$ cho $0{,}25+2{,}25=2{,}5$. Thiếu còn $\dfrac{8}{3}-\dfrac{5}{2}=\dfrac{1}{6}$.`,
    ],
    href: "/t/integral?tab=nc&n=int-r-mid",
  },
  {
    id: "mau-so-xuc-xac",
    kind: "y-tuong",
    field: "Xác suất",
    title: "Mẫu số sau khi biết có mặt 6",
    question: R`Hai xúc xắc, biết có ít nhất một mặt $6$. Vì sao xác suất cả hai mặt $6$ là $\dfrac{1}{11}$?`,
    method: "Đếm các cặp còn lại sau khi đã biết có mặt 6. Không chia cho 36 của lúc chưa biết.",
    steps: [
      R`Ban đầu có $36$ cặp. Cặp không có mặt $6$: $5\cdot 5=25$.`,
      R`Còn $36-25=11$ cặp.`,
      R`Chỉ $(6;6)$ thỏa. Xác suất là $\dfrac{1}{11}$.`,
    ],
    href: "/t/probability?tab=hoc",
  },
  {
    id: "doi-xung-to-hop",
    kind: "y-tuong",
    field: "Xác suất",
    title: "Vì sao $C(n,k)=C(n,n-k)$",
    question: R`Chọn $k$ phần tử và chọn $n-k$ phần tử để loại có cùng số cách không?`,
    method: "Ghép mỗi tập với phần bù của nó, rồi kiểm bằng một bộ số.",
    steps: [
      R`Với $n=8$, $k=3$: mỗi bộ $3$ người để lại đúng một bộ $5$ người.`,
      R`Phép lấy bù ghép từng bộ với một bộ, nên hai số cách bằng nhau.`,
      R`Kiểm: $C(8,3)=\dfrac{8\cdot 7\cdot 6}{6}=56$ và $C(8,5)=56$.`,
    ],
    href: "/t/combo?tab=nc&n=cmb-r-sym",
  },
  {
    id: "dao-ham-khong-cuc-tri",
    kind: "y-tuong",
    field: "Giải tích",
    title: "$y'=0$ mà không có cực trị",
    question: R`$y=x^3$ có $y'(0)=0$. Vì sao $x=0$ không phải cực trị?`,
    method: R`Xét dấu $y'$ hai bên. Phương trình $y'=0$ chỉ tìm điểm dừng.`,
    steps: [
      R`$y'=3x^2\ge 0$ trên $\mathbb{R}$, bằng $0$ chỉ tại $0$.`,
      R`$y(-1)=-1$, $y(0)=0$, $y(1)=1$: hàm vẫn tăng qua $0$.`,
      R`Với $y=x^3-3x$, $y'=3(x^2-1)$ đổi dấu tại $\pm 1$: đó mới là cực trị.`,
    ],
    href: "/t/survey?tab=nc&n=surv-r-cubic",
  },
  {
    id: "chuong-rao",
    kind: "chu-de",
    field: "Đại số",
    title: "Chuồng rào tựa tường",
    question: R`Có $40$ m rào, một cạnh tựa tường. Cạnh vuông góc tường bằng bao nhiêu thì diện tích lớn nhất?`,
    method: R`Đặt $S(x)=x(40-2x)$ trên $0<x<20$, tìm đỉnh hoặc cho $S'=0$.`,
    steps: [
      R`$S(x)=-2x^2+40x$. Đỉnh $x=-\dfrac{40}{2\cdot(-2)}=10$.`,
      R`$S(10)=200$. Khi $x\to 0^+$ hoặc $x\to 20^-$, $S\to 0$.`,
      R`$S(9)=198$ và $S(11)=198$, đều nhỏ hơn $S(10)=200$.`,
    ],
    href: "/t/quadratic?tab=hoc",
  },
  {
    id: "tra-nguoi",
    kind: "chu-de",
    field: "Giải tích",
    title: "Nước nóng về nhiệt phòng",
    question: R`$T(t)=25+60e^{-t/4}$. Sau bao lâu nhiệt độ còn cách phòng dưới $1^\circ\mathrm{C}$?`,
    method: "Giải bất phương trình mũ, rồi thế một giá trị trở lại.",
    steps: [
      R`$T$ cách $25$ dưới $1$ khi $60e^{-t/4}<1$.`,
      R`$t>4\ln 60$. Vì $\ln 60\approx 4{,}094$ nên $t>16{,}38$ phút.`,
      R`Tại $t=16{,}4$: $60e^{-4{,}1}\approx 0{,}994$, nên $T\approx 25{,}99$.`,
    ],
    href: "/t/limit?tab=nc&n=lim-r-cool",
  },
  {
    id: "khoang-cach-duong",
    kind: "chu-de",
    field: "Hình",
    title: "Khoảng cách từ điểm tới đường thẳng",
    question: R`Vì sao $d=\dfrac{|ax_0+by_0+c|}{\sqrt{a^2+b^2}}$, và tử số chưa phải khoảng cách?`,
    method: "Lấy trị tuyệt đối ở tử, rồi chia cho độ dài của pháp tuyến.",
    steps: [
      R`Với $\vec n=(1;1)$, độ dài là $\sqrt{1+1}=\sqrt2$.`,
      R`Điểm $(3;1)$, đường $x+y-2=0$: tử $|3+1-2|=2$.`,
      R`Chia $\sqrt{2}$ được $d=\sqrt{2}$. Dừng ở $2$ là chưa chia độ dài pháp tuyến.`,
    ],
    href: "/t/analytic?tab=nc&n=ana-r-dist",
  },
  {
    id: "non-noi-tiep",
    kind: "chu-de",
    field: "Hình",
    title: "Nón nội tiếp mặt cầu",
    question: R`Nón nội tiếp mặt cầu bán kính $R$. Chiều cao nào cho thể tích lớn nhất?`,
    method: R`Viết $V(h)$, đạo hàm, rồi kiểm bằng số $R=6$.`,
    steps: [
      R`Với $R=6$ và $h=8$: $r^2=8(12-8)=32$.`,
      R`$V=\dfrac{\pi}{3}(2Rh^2-h^3)$, nên $V'=\dfrac{\pi}{3}h(4R-3h)=0$ khi $h=\dfrac{4R}{3}$.`,
      R`Tại $h=8$, $V=\dfrac{256\pi}{3}$. Tại $h=6$, $V=72\pi$, nhỏ hơn.`,
    ],
    href: "/t/triangle?tab=nc&n=shp-r-cone",
  },
  {
    id: "luat-so-lon",
    kind: "chu-de",
    field: "Xác suất",
    title: "Tần suất một mặt xúc xắc",
    question: R`Tung một xúc xắc $n$ lần. Tần suất một mặt có tiến về $\dfrac{1}{6}$ không?`,
    method: R`Kỳ vọng của tần suất là $\dfrac{1}{6}$. Độ lệch chuẩn giảm theo $\sqrt{n}$.`,
    steps: [
      R`Mỗi mặt có xác suất $\dfrac{1}{6}$. Trong $6$ lần, kỳ vọng là đúng $1$ lần.`,
      R`Độ lệch chuẩn của tần suất là $\sqrt{\dfrac{5}{36n}}$, tiến về $0$ khi $n\to\infty$.`,
      R`Với $n=36$, độ lệch chuẩn là $\sqrt{\dfrac{5}{36\cdot 36}}\approx 0{,}062$. Một mẫu nhỏ vẫn có thể lệch khỏi $\dfrac{1}{6}$.`,
    ],
    href: "/t/probability?tab=nc&n=prob-r-lln",
  },
  {
    id: "xet-nghiem-duong",
    kind: "chu-de",
    field: "Xác suất",
    title: "Xác suất bệnh sau kết quả dương",
    question: R`Dân số $10\,000$, bệnh $1\%$, độ nhạy $99\%$, dương tính giả $5\%$. Dương tính thì xác suất thật sự bệnh bằng bao nhiêu?`,
    method: "Đếm ca dương thật và ca dương giả. Mẫu số là tổng hai số đó.",
    steps: [
      R`Người bệnh: $100$. Người không bệnh: $9\,900$.`,
      R`Dương thật: $99$. Dương giả: $0{,}05\cdot 9\,900=495$.`,
      R`Xác suất hậu nghiệm $\dfrac{99}{99+495}=\dfrac{1}{6}$. Bệnh hiếm làm dương giả chiếm phần lớn mẫu.`,
    ],
    href: "/t/probability?tab=nc&n=prob-r-bayes",
  },
];
