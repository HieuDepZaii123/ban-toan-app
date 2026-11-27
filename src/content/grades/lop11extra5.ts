/** Lớp 11, bài vận dụng cao: tỉ số thể tích của khối chóp tam giác. */
import type { GradeLesson } from "./types.ts";
import { bai, buoc, luyen, vd } from "./types.ts";

const R = String.raw;

export const tySoTheTich: GradeLesson = bai("ty-so-the-tich", "Tỉ số thể tích của hai khối chóp có chung đỉnh",
  R`Với hình chóp tam giác $S.ABC$ và các điểm $M$, $N$, $P$ lần lượt thuộc $SA$, $SB$, $SC$, tỉ số thể tích là $\frac{V_{S.MNP}}{V_{S.ABC}}=\frac{SM}{SA}\cdot\frac{SN}{SB}\cdot\frac{SP}{SC}$. Để áp dụng cho chóp có đáy tứ giác, ta chia thành các khối chóp tam giác cùng đỉnh, rồi cộng hoặc trừ các thể tích. Hai khối cùng chiều cao thì thể tích tỉ lệ với diện tích đáy.`,
  [
    vd(R`Cho hình chóp tam giác $S.ABC$ và các điểm $M$, $N$, $P$ thuộc $SA$, $SB$, $SC$ với $\frac{SM}{SA}=\frac12$, $\frac{SN}{SB}=\frac23$, $\frac{SP}{SC}=\frac34$. Tính $\frac{V_{S.MNP}}{V_{S.ABC}}$.`,
      [
        buoc(R`Hai khối có chung đỉnh $S$ và chung góc ở đỉnh, nên tỉ số thể tích bằng tích ba tỉ số cạnh.`, R`Thể tích bằng $\frac16\left|\overrightarrow{SM}\cdot\left[\overrightarrow{SN},\overrightarrow{SP}\right]\right|$, và mỗi vectơ từ $S$ được nhân với tỉ số cạnh tương ứng.`),
        buoc(R`Do đó tỉ số bằng $\frac12\cdot\frac23\cdot\frac34=\frac14$.`, R`Nhân ba tỉ số và rút gọn.`),
      ],
      R`Tỉ số thể tích bằng $\frac14$.`,
      [{ expr: "Rational(1,2)*Rational(2,3)*Rational(3,4)", expect: "1/4" }]),
    vd(R`Hình chóp $S.ABCD$ có đáy là hình bình hành, $M$ là trung điểm $SC$ và mặt phẳng $(ABM)$ cắt $SD$ tại $N$. Tính tỉ số thể tích hai phần mà $(ABM)$ chia khối chóp.`,
      [
        buoc(R`Vì $AB\parallel CD$ nên giao tuyến của $(ABM)$ với $(SCD)$ qua $M$ song song $CD$, suy ra $N$ là trung điểm $SD$.`, R`Mặt phẳng chứa $AB$ cắt mặt chứa $CD$ theo đường song song với $AB$ và $CD$.`),
        buoc(R`Gọi $V=V_{S.ABCD}$, thì $V_{S.ABC}=V_{S.ACD}=\frac V2$, và $V_{S.ABM}=\frac12\cdot\frac V2=\frac V4$, $V_{S.AMN}=\frac12\cdot\frac12\cdot\frac V2=\frac V8$.`, R`Chia đáy hình bình hành thành hai tam giác bằng nhau qua đường chéo $AC$ rồi áp dụng tỉ số thể tích.`),
        buoc(R`Phần chứa đỉnh $S$ có thể tích $\frac V4+\frac V8=\frac{3V}{8}$, nên phần còn lại có thể tích $\frac{5V}{8}$.`, R`Hai phần cộng lại bằng toàn khối.`),
      ],
      R`Hai phần có thể tích tỉ lệ $3:5$.`,
      [{ expr: "Rational(1,4)+Rational(1,8)", expect: "3/8" }]),
  ],
  [
    luyen(R`Cho $S.ABC$ và $M$, $N$, $P$ thuộc $SA$, $SB$, $SC$ với $\frac{SM}{SA}=\frac13$, $\frac{SN}{SB}=\frac12$, $\frac{SP}{SC}=\frac15$. Tính $\frac{V_{S.MNP}}{V_{S.ABC}}$.`, R`Tỉ số bằng $\frac{1}{30}$.`, [{ expr: "Rational(1,3)*Rational(1,2)*Rational(1,5)", expect: "1/30" }], R`Nhân ba tỉ số cạnh: $\frac13\cdot\frac12\cdot\frac15=\frac{1}{30}$.`),
    luyen(R`Với các điểm ở bài trên và $V_{S.ABC}=60$, tính $V_{S.MNP}$.`, R`Thể tích bằng $2$.`, [{ expr: "60*Rational(1,30)", expect: "2" }], R`Ta có $V_{S.MNP}=60\cdot\frac1{30}=2$.`),
    { ...luyen(R`Trong ví dụ thứ hai, phần khối chóp chứa đỉnh $S$ và phần còn lại có tỉ lệ thể tích nào?`, R`Tỉ lệ bằng $3:5$.`, [{ expr: "Rational(1,4)+Rational(1,8)", expect: "3/8" }], R`Phần chứa $S$ chiếm $\frac38$ thể tích, phần còn lại chiếm $\frac58$ nên tỉ lệ là $3:5$.`), ask: { kind: "choice", options: [R`$3:5$`, R`$1:1$`, R`$1:3$`], correct: 0 } },
  ],
  { topicId: "triangle" });
