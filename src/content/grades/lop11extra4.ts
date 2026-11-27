/** Lớp 11, hoàn thiện hình học không gian: viết lại bốn bài cũ và thêm chương đại cương. */
import type { GradeChapter, GradeLesson } from "./types.ts";
import { bai, buoc, chuong, luyen, vd } from "./types.ts";

const R = String.raw;

/** Bốn bài của chương "khong-gian" được viết lại, giữ nguyên mã bài. */
export const songSongMoi: GradeLesson = bai("song-song", "Quan hệ song song",
  R`Đường thẳng $d$ song song với mặt phẳng $(P)$ nếu $d$ không nằm trong $(P)$ và song song với một đường thẳng nằm trong $(P)$. Hai mặt phẳng song song nếu một mặt chứa hai đường thẳng cắt nhau cùng song song với mặt kia. Đường trung bình của tam giác song song với cạnh thứ ba và bằng nửa cạnh ấy. Hai mặt phẳng cắt nhau theo giao tuyến $d$ mà chứa hai đường thẳng song song thì giao tuyến song song với hai đường đó.`,
  [
    vd(R`Hình chóp $S.ABCD$ có đáy là hình bình hành, $M$ và $N$ là trung điểm của $SA$ và $SB$, và $CD=8$. Chứng tỏ $MN\parallel(SCD)$ và tính $MN$.`,
      [
        buoc(R`Đoạn $MN$ là đường trung bình của tam giác $SAB$ nên $MN\parallel AB$ và $MN=\frac{AB}{2}$.`, R`Hai điểm $M$ và $N$ là trung điểm của hai cạnh của tam giác.`),
        buoc(R`Đáy là hình bình hành nên $AB=CD=8$ và $AB\parallel CD$, do đó $MN\parallel CD$ và $MN=4$.`, R`Hai cạnh đối của hình bình hành song song và bằng nhau.`),
        buoc(R`Đường $CD$ nằm trong $(SCD)$ còn $MN$ không nằm trong $(SCD)$, nên $MN\parallel(SCD)$.`, R`Nếu $MN\subset(SCD)$ thì $M$ cùng với $S$ là hai điểm chung của đường $SA$ và $(SCD)$, nên $SA\subset(SCD)$, vô lý vì $A\notin(SCD)$; do đó dùng được điều kiện đường thẳng song song với mặt phẳng.`),
      ],
      R`Đường $MN\parallel(SCD)$ và $MN=4$.`,
      [{ expr: "Matrix([2,0,0]).cross(Matrix([5-1,3-3,0])).norm()", expect: "0" }, { expr: "Rational(8,2)", expect: "4" }]),
    vd(R`Hình chóp $S.ABCD$ có đáy là hình bình hành. Tìm giao tuyến của $(SAB)$ và $(SCD)$.`,
      [
        buoc(R`Điểm $S$ thuộc cả hai mặt phẳng nên $S$ là một điểm chung.`, R`Một giao tuyến cần ít nhất một điểm chung.`),
        buoc(R`Hai mặt phẳng phân biệt chứa hai đường $AB$ và $CD$ song song nhau, nên giao tuyến, vốn không trùng với $AB$ hay $CD$ vì $S$ không thuộc hai đường đó, là đường thẳng $d$ qua $S$ và song song với $AB$ (và $CD$).`, R`Theo tính chất: giao tuyến song song với hai đường song song đã cho.`),
      ],
      R`Giao tuyến là đường thẳng qua $S$ song song với $AB$.`,
      [{ expr: "Matrix([4,0,0]).cross(Matrix([5-1,3-3,0])).norm()", expect: "0" }]),
  ],
  [
    { ...luyen(R`Cùng hình chóp ở ví dụ đầu. Đường $MN$ có song song với mặt phẳng đáy $(ABCD)$ không?`, R`Có, vì $MN\parallel AB$ và $AB$ nằm trong $(ABCD)$.`, [{ expr: "Matrix([2,0,0]).cross(Matrix([4,0,0])).norm()", expect: "0" }], R`Vì $MN$ không nằm trong $(ABCD)$ và song song với đường $AB$ của mặt phẳng đáy.`), ask: { kind: "choice", options: ["Có, vì $MN\\parallel AB$ và $AB\\subset(ABCD)$.", "Không, vì $MN$ cắt $(ABCD)$."], correct: 0 } },
    luyen(R`Hình chóp $S.ABCD$ có đáy là hình bình hành với $AD=6$. Gọi $M$ và $Q$ là trung điểm của $SA$ và $SD$. Tính $MQ$.`, R`Đoạn $MQ$ dài $3$.`, [{ expr: "6/2", expect: "3" }], R`Vì $MQ$ là đường trung bình của tam giác $SAD$ nên bằng nửa $AD$.`),
    luyen(R`Lăng trụ $ABC.A'B'C'$ có $BC=8$. Gọi $M$ và $N$ là trung điểm của $A'B'$ và $A'C'$. Tính $MN$. Đường $MN$ có song song với mặt phẳng $(ABC)$ không?`, R`Đoạn $MN$ dài $4$ và $MN$ song song với $(ABC)$.`, [{ expr: "8/2", expect: "4" }], R`Vì $MN$ là đường trung bình của tam giác $A'B'C'$ nên $MN\parallel B'C'\parallel BC$, mà $BC\subset(ABC)$ và $MN\not\subset(ABC)$.`),
  ],
  { topicId: "triangle" });

export const vuongGocMoi: GradeLesson = bai("vuong-goc", "Quan hệ vuông góc",
  R`Đường thẳng vuông góc với mặt phẳng khi nó vuông góc với hai đường cắt nhau nằm trong mặt phẳng. Định lí ba đường vuông góc: nếu $AH$ vuông góc với mặt phẳng, $H$ thuộc mặt phẳng, và một đường $d$ của mặt phẳng đi qua $B$ thì $d$ vuông góc với $AB$ khi và chỉ khi $d$ vuông góc với hình chiếu $HB$. Hai mặt phẳng vuông góc khi một mặt chứa một đường thẳng vuông góc với mặt kia.`,
  [
    vd(R`Đường $AH$ vuông góc với mặt phẳng tại $H$, $HB$ nằm trong mặt phẳng, $AH=6$ và $HB=8$. Tính $AB$. Nếu đường $d$ trong mặt phẳng đi qua $B$ và vuông góc với $HB$, $d$ quan hệ thế nào với $AB$?`,
      [
        buoc(R`Tam giác $AHB$ vuông tại $H$, nên $AB=\sqrt{6^2+8^2}=10$.`, R`Đường vuông góc với mặt phẳng thì vuông góc với mọi đường của mặt phẳng đi qua chân đường vuông góc, trong đó có $HB$.`),
        buoc(R`Đường $d$ vuông góc với $AB$.`, R`Định lí ba đường vuông góc: $d$ vuông góc với hình chiếu $HB$ nên $d$ vuông góc với đường xiên $AB$.`),
      ],
      R`Độ dài $AB$ bằng $10$, và $d$ vuông góc với $AB$.`,
      [{ expr: "sqrt(6**2+8**2)", expect: "10" }]),
    vd(R`Hình chóp $S.ABCD$ có đáy là hình vuông cạnh $2$, $SA\perp(ABCD)$ và $SA=3$. Chứng tỏ $BC\perp SB$ rồi tính $SC$.`,
      [
        buoc(R`Ta có $BC\perp AB$ (hình vuông) và $BC\perp SA$ (vì $SA\perp(ABCD)$), nên $BC\perp(SAB)$.`, R`Đường $BC$ vuông góc với hai đường cắt nhau $AB$ và $SA$ của mặt phẳng $(SAB)$.`),
        buoc(R`Vì $SB\subset(SAB)$ nên $BC\perp SB$.`, R`Đường vuông góc với mặt phẳng thì vuông góc với mọi đường nằm trong mặt phẳng đó.`),
        buoc(R`Với $AC=2\sqrt2$, tam giác $SAC$ vuông tại $A$ nên $SC=\sqrt{3^2+(2\sqrt2)^2}=\sqrt{17}$.`, R`Cạnh $SA$ vuông góc với $AC$ nằm trong đáy.`),
      ],
      R`Ta có $BC\perp SB$ và $SC=\sqrt{17}$.`,
      [{ expr: "Matrix([2,0,-3]).dot(Matrix([0,2,0]))", expect: "0" }, { expr: "sqrt(3**2+2**2+2**2)", expect: "sqrt(17)" }]),
  ],
  [
    luyen(R`Cho $AH$ vuông góc với mặt phẳng, $AH=5$ và $HB=12$. Tính $AB$.`, R`Độ dài $AB$ bằng $13$.`, [{ expr: "sqrt(5**2+12**2)", expect: "13" }], R`Tam giác $AHB$ vuông tại chân đường vuông góc. Cạnh xiên là cạnh huyền.`),
    luyen(R`Nếu $AH=9$ và $AB=15$, với $AH$ vuông góc mặt phẳng, hình chiếu $HB$ dài bao nhiêu?`, R`Hình chiếu $HB$ dài $12$.`, [{ expr: "sqrt(15**2-9**2)", expect: "12" }], R`Từ tam giác vuông tại $H$, bình phương hình chiếu bằng hiệu hai bình phương còn lại.`),
    { ...luyen(R`Hình chóp $S.ABCD$ có đáy là hình chữ nhật và $SA\perp(ABCD)$. Đường $BC$ có vuông góc với $SB$ không?`, R`Có, vì $BC\perp(SAB)$.`, [{ expr: "Matrix([2,0,-3]).dot(Matrix([0,3,0]))", expect: "0" }], R`Vì $BC$ vuông góc với $AB$ và $SA$ nên vuông góc với $(SAB)$, và $SB$ nằm trong mặt phẳng đó.`), ask: { kind: "choice", options: ["Có, vì $BC\\perp(SAB)$.", "Không, chưa đủ điều kiện.", "Chỉ vuông góc khi đáy là hình vuông."], correct: 0 } },
  ],
  { topicId: "triangle" });

export const theTichMoi: GradeLesson = bai("the-tich-11", "Thể tích lăng trụ và hình chóp",
  R`Bài này xét lăng trụ và hình chóp có đáy là đa giác. Thể tích lăng trụ bằng diện tích đáy nhân chiều cao. Thể tích hình chóp bằng một phần ba tích đó. Chiều cao vuông góc với mặt đáy, và với lăng trụ xiên bằng cạnh bên nhân sin góc giữa cạnh bên và đáy. Khối có đáy là hình tròn không phải hình chóp.`,
  [
    vd(R`Lăng trụ đứng có đáy là tam giác vuông các cạnh góc vuông $3$ và $4$, chiều cao $6$. Tính thể tích lăng trụ và thể tích hình chóp cùng đáy cùng chiều cao.`,
      [
        buoc(R`Diện tích đáy bằng $\frac{1}{2}\cdot 3\cdot 4=6$. Thể tích lăng trụ bằng $6\cdot 6=36$.`, R`Đáy là đa giác, ở đây là tam giác vuông. Lăng trụ lấy đủ tích của diện tích đáy với chiều cao.`),
        buoc(R`Thể tích hình chóp bằng $\frac{1}{3}\cdot 6\cdot 6=12$.`, R`Cùng đáy đa giác và cùng chiều cao, hình chóp bằng một phần ba lăng trụ.`),
      ],
      R`Lăng trụ có thể tích $36$ và hình chóp có thể tích $12$.`,
      [{ expr: "(Rational(1,2)*3*4)*6", expect: "36" }, { expr: "Rational(1,3)*6*6", expect: "12" }]),
    vd(R`Lăng trụ xiên có đáy là hình vuông cạnh $4$ và cạnh bên $10$ tạo với đáy góc $30^\circ$. Tính thể tích.`,
      [
        buoc(R`Chiều cao là $10\sin30^\circ=5$.`, R`Chiều cao hạ vuông góc xuống đáy, tạo tam giác vuông với cạnh bên.`),
        buoc(R`Diện tích đáy là $16$ nên thể tích là $16\cdot5=80$.`, R`Thể tích lăng trụ bằng diện tích đáy nhân chiều cao, không phải nhân cạnh bên.`),
      ],
      R`Thể tích bằng $80$.`,
      [{ expr: "16*10*sin(pi/6)", expect: "80" }]),
  ],
  [
    luyen(R`Lăng trụ có đáy là tam giác diện tích $10$ và chiều cao $4$. Thể tích bằng bao nhiêu?`, R`Thể tích bằng $40$.`, [{ expr: "10*4", expect: "40" }], R`Đáy đa giác. Lăng trụ không chia ba.`),
    luyen(R`Hình chóp có cùng đáy diện tích $10$ và cùng chiều cao $4$. Thể tích bằng bao nhiêu?`, R`Thể tích bằng $\frac{40}{3}$.`, [{ expr: "Rational(1,3)*10*4", expect: "Rational(40,3)" }], R`Hình chóp đáy đa giác lấy một phần ba tích đáy với chiều cao.`),
    luyen(R`Hình chóp có đáy hình vuông cạnh $6$ và chiều cao $5$. Thể tích bằng bao nhiêu?`, R`Thể tích bằng $60$.`, [{ expr: "Rational(1,3)*6*6*5", expect: "60" }], R`Diện tích đáy bằng $36$. Một phần ba của $36\cdot 5$ bằng $60$.`),
  ],
  { topicId: "triangle" });

export const lop11DaiCuong: GradeChapter = chuong("dai-cuong-kg-11", "Đại cương hình học không gian", [
  bai("vi-tri-tuong-doi-kg", "Vị trí tương đối của đường thẳng và mặt phẳng",
    R`Hai đường thẳng trong không gian có bốn vị trí: trùng nhau, cắt nhau, song song (phân biệt), hoặc chéo nhau khi không cùng nằm trong một mặt phẳng. Đường thẳng và mặt phẳng có ba vị trí: cắt nhau tại một điểm, song song, hoặc đường thẳng nằm trong mặt phẳng. Hai mặt phẳng có ba vị trí: cắt nhau theo một đường thẳng, song song, hoặc trùng nhau.`,
    [
      vd(R`Tứ diện $SABC$ có $SA\perp(ABC)$. Hai đường thẳng $SA$ và $BC$ có cắt nhau, song song hay chéo nhau?`,
        [
          buoc(R`Đường $BC$ nằm trong mặt phẳng $(ABC)$ và $SA$ cắt $(ABC)$ tại $A$ nằm ngoài đường $BC$ (điểm $A$ không thuộc $BC$).`, R`Đường thẳng cắt mặt phẳng tại một điểm không thuộc đường thẳng kia.`),
          buoc(R`Vậy $SA$ và $BC$ không có điểm chung và không đồng phẳng, tức là chéo nhau.`, R`Nếu chúng đồng phẳng thì $SA$ sẽ nằm trong mặt phẳng chứa $BC$ và $A$, tức $(ABC)$, vô lý.`),
        ],
        R`Hai đường thẳng $SA$ và $BC$ chéo nhau.`,
        [{ expr: "Matrix([0,0,-3]).dot(Matrix([-2,2,0]).cross(Matrix([2,0,-3])))", expect: "12" }]),
      vd(R`Trong hình hộp $ABCD.A'B'C'D'$, hai đường thẳng $AA'$ và $CC'$ có vị trí nào?`,
        [
          buoc(R`Cả $AA'$ và $CC'$ đều song song với cạnh $BB'$ (các cạnh bên của hình hộp).`, R`Các cạnh bên của hình hộp song song và bằng nhau.`),
          buoc(R`Hai đường cùng song song với một đường thứ ba thì song song với nhau.`, R`Tính chất bắc cầu của quan hệ song song.`),
        ],
        R`Hai đường thẳng $AA'$ và $CC'$ song song.`,
        [{ expr: "Matrix([0,0,1]).cross(Matrix([0,0,1])).norm()", expect: "0" }]),
    ],
    [
      { ...luyen(R`Trong hình hộp $ABCD.A'B'C'D'$, hai đường thẳng $AA'$ và $BC$ có vị trí nào?`, R`Hai đường chéo nhau.`, [{ expr: "Matrix([1,0,0]).dot(Matrix([0,0,1]).cross(Matrix([0,1,0])))", expect: "-1" }], R`Hai đường $AA'$ và $BC$ không đồng phẳng: tích hỗn tạp của $\overrightarrow{AB}$, $\overrightarrow{AA'}$, $\overrightarrow{BC}$ khác $0$.`), ask: { kind: "choice", options: ["Song song.", "Cắt nhau.", "Chéo nhau."], correct: 2 } },
      luyen(R`Trong một tứ diện, có bao nhiêu cặp cạnh chéo nhau?`, R`Có $3$ cặp (các cặp cạnh đối).`, [{ expr: "15-4*3", expect: "3" }], R`Tổng $15$ cặp cạnh, trong đó mỗi đỉnh có $3$ cạnh nên có $3$ cặp cắt nhau, tổng $12$ cặp cắt nhau; còn $15-12=3$ cặp chéo nhau.`),
      { ...luyen(R`Hai mặt phẳng phân biệt có một điểm chung. Giao của chúng là gì?`, R`Là một đường thẳng đi qua điểm chung đó.`, [{ expr: "Matrix([1,0,0]).cross(Matrix([0,1,0])).norm()", expect: "1" }], R`Hai mặt phẳng phân biệt đã có điểm chung thì không song song, nên chúng cắt nhau theo một đường thẳng qua điểm đó.`), ask: { kind: "choice", options: ["Một đường thẳng đi qua điểm đó.", "Chỉ riêng điểm đó.", "Tập rỗng."], correct: 0 } },
    ],
    { topicId: "triangle" }),
  bai("giao-tuyen", "Giao tuyến của hai mặt phẳng",
    R`Giao tuyến của hai mặt phẳng phân biệt là đường thẳng gồm các điểm chung của chúng. Để tìm giao tuyến, tìm hai điểm chung. Nếu hai mặt phẳng phân biệt lần lượt chứa hai đường thẳng song song thì giao tuyến song song với hai đường đó hoặc trùng với một trong hai đường. Giao điểm của hai đường chéo của hình bình hành là trung điểm của mỗi đường.`,
    [
      vd(R`Hình chóp $S.ABCD$ có đáy là hình bình hành tâm $O$. Tìm giao tuyến của $(SAC)$ và $(SBD)$.`,
        [
          buoc(R`Điểm $S$ thuộc cả hai mặt phẳng.`, R`Cả hai mặt phẳng đều chứa đỉnh $S$.`),
          buoc(R`Điểm $O=AC\cap BD$ nằm trên $AC\subset(SAC)$ và $BD\subset(SBD)$ nên $O$ cũng là điểm chung.`, R`Hai đường chéo của hình bình hành cắt nhau tại $O$.`),
        ],
        R`Giao tuyến là đường thẳng $SO$.`,
        [{ expr: "(Matrix([1,1,0])+Matrix([4,4,0]))[0]/2", expect: "5/2" }]),
      vd(R`Hình chóp $S.ABCD$ có đáy là hình thang với $AB\parallel CD$, $AB=6$ và $CD=3$. Hai đường $AD$ và $BC$ cắt nhau tại $I$ và $IB=10$. Tìm giao tuyến của $(SAD)$ và $(SBC)$, rồi tính $IC$.`,
        [
          buoc(R`Hai điểm $S$ và $I$ là hai điểm chung ($I\in AD\subset(SAD)$ và $I\in BC\subset(SBC)$), nên giao tuyến là $SI$.`, R`Có hai điểm chung phân biệt nên đã xác định giao tuyến.`),
          buoc(R`Vì $CD\parallel AB$ nên $\frac{IC}{IB}=\frac{CD}{AB}=\frac36=\frac12$, do đó $IC=5$.`, R`Hai tam giác $ICD$ và $IBA$ đồng dạng.`),
        ],
        R`Giao tuyến là $SI$ và $IC=5$.`,
        [{ expr: "10*Rational(3,6)", expect: "5" }]),
    ],
    [
      luyen(R`Đáy hình bình hành $ABCD$ có $AC=10$ và $BD=6$. Gọi $O$ là giao điểm hai đường chéo. Tính $AO$ và $BO$ rồi cho biết $AO+BO$.`, R`Tổng $AO+BO$ bằng $8$.`, [{ expr: "10/2+6/2", expect: "8" }], R`Hai đường chéo của hình bình hành cắt nhau tại trung điểm của mỗi đường: $AO=5$ và $BO=3$.`),
      { ...luyen(R`Hình chóp $S.ABCD$ có đáy là hình bình hành. Giao tuyến của $(SAB)$ và $(SCD)$ song song với đường nào?`, R`Song song với $AB$.`, [{ expr: "Matrix([4,0,0]).cross(Matrix([5-1,3-3,0])).norm()", expect: "0" }], R`Vì $(SAB)$ chứa $AB$, $(SCD)$ chứa $CD$ và $AB\parallel CD$, nên giao tuyến qua $S$ song song với $AB$.`), ask: { kind: "choice", options: ["Song song với $AB$.", "Song song với $SA$.", "Song song với $AC$."], correct: 0 } },
      luyen(R`Đáy là hình thang $AB\parallel CD$ với $AB=8$, $CD=2$. Hai đường $AD$ và $BC$ cắt nhau tại $I$ và $IB=12$. Tính $IC$.`, R`Độ dài $IC$ bằng $3$.`, [{ expr: "12*Rational(2,8)", expect: "3" }], R`Ta có $\frac{IC}{IB}=\frac{CD}{AB}=\frac28$, nên $IC=12\cdot\frac14=3$.`),
    ],
    { topicId: "triangle" }),
  bai("thiet-dien", "Thiết diện của hình khối",
    R`Thiết diện là phần mặt phẳng cắt hình khối, là một đa giác. Mỗi cạnh của thiết diện là giao tuyến của mặt phẳng cắt với một mặt của khối. Mặt phẳng song song với đáy của hình chóp cho thiết diện đồng dạng với đáy. Hình lập phương cắt bởi mặt phẳng qua trung điểm sáu cạnh thích hợp cho thiết diện là lục giác đều, vì sáu trung điểm đồng phẳng và cùng cách tâm hình lập phương một khoảng bằng cạnh lục giác.`,
    [
      vd(R`Tứ diện đều cạnh $4$ bị cắt bởi mặt phẳng qua trung điểm ba cạnh cùng xuất phát từ một đỉnh. Tính diện tích thiết diện.`,
        [
          buoc(R`Mỗi cạnh của thiết diện là đường trung bình của một mặt bên (tam giác đều cạnh $4$), nên dài $2$.`, R`Nối trung điểm hai cạnh của một mặt là đường trung bình.`),
          buoc(R`Thiết diện là tam giác đều cạnh $2$, diện tích $\frac{\sqrt3}{4}\cdot2^2=\sqrt3$.`, R`Dùng công thức diện tích tam giác đều.`),
        ],
        R`Diện tích thiết diện bằng $\sqrt3$.`,
        [{ expr: "sqrt(3)/4*2**2", expect: "sqrt(3)" }]),
      vd(R`Hình lập phương cạnh $2$ bị cắt bởi mặt phẳng qua trung điểm các cạnh $AB$, $BC$, $CC'$, $C'D'$, $D'A'$, $A'A$. Tính diện tích thiết diện.`,
        [
          buoc(R`Chọn $A$ làm gốc với ba cạnh xuất phát từ $A$ dọc ba trục: sáu trung điểm đều thỏa $x-y+z=1$ nên đồng phẳng, và cùng cách tâm $I(1;\ 1;\ 1)$ một khoảng bằng $\sqrt2$.`, R`Sáu điểm nằm trên một đường tròn tâm $I$ trong mặt phẳng cắt, nên chỉ còn phải so sánh cạnh với bán kính.`),
          buoc(R`Mỗi cạnh thiết diện là cạnh huyền của tam giác vuông có hai cạnh góc vuông bằng $1$, nên dài $\sqrt{1^2+1^2}=\sqrt2$, bằng bán kính đường tròn, nên thiết diện là lục giác đều.`, R`Hai trung điểm liên tiếp nằm trên hai cạnh kề nhau của một mặt hình vuông cạnh $2$.`),
          buoc(R`Diện tích lục giác đều cạnh $\sqrt2$ là $\frac{3\sqrt3}{2}\cdot(\sqrt2)^2=3\sqrt3$.`, R`Lục giác đều gồm sáu tam giác đều cạnh bằng cạnh lục giác.`),
        ],
        R`Diện tích thiết diện bằng $3\sqrt3$.`,
        [{ expr: "Rational(3,2)*sqrt(3)*(sqrt(2))**2", expect: "3*sqrt(3)" }]),
    ],
    [
      luyen(R`Tứ diện đều cạnh $6$ bị cắt bởi mặt phẳng qua trung điểm ba cạnh cùng xuất phát từ một đỉnh. Tính diện tích thiết diện.`, R`Diện tích bằng $\frac{9\sqrt3}{4}$.`, [{ expr: "sqrt(3)/4*3**2", expect: "9*sqrt(3)/4" }], R`Thiết diện là tam giác đều cạnh $3$ nên diện tích $\frac{\sqrt3}{4}\cdot9=\frac{9\sqrt3}{4}$.`),
      luyen(R`Hình chóp có đáy diện tích $27$. Mặt phẳng song song với đáy cắt cạnh bên theo tỉ số $\frac{SM}{SA}=\frac23$. Tính diện tích thiết diện.`, R`Diện tích bằng $12$.`, [{ expr: "27*Rational(2,3)**2", expect: "12" }], R`Thiết diện đồng dạng với đáy theo tỉ số $\frac23$ nên diện tích nhân $\frac49$: $27\cdot\frac49=12$.`),
      luyen(R`Hình lập phương cạnh $4$ bị cắt bởi mặt phẳng qua trung điểm sáu cạnh như trên. Tính diện tích thiết diện.`, R`Diện tích bằng $12\sqrt3$.`, [{ expr: "Rational(3,2)*sqrt(3)*(2*sqrt(2))**2", expect: "12*sqrt(3)" }], R`Cạnh lục giác đều là $2\sqrt2$ nên diện tích là $\frac{3\sqrt3}{2}\cdot8=12\sqrt3$.`),
    ],
    { topicId: "triangle" }),
  bai("hinh-chop-deu", "Hình chóp đều và lăng trụ đều",
    R`Hình chóp đều có đáy là đa giác đều và chân đường cao trùng tâm đáy; mọi cạnh bên bằng nhau. Hình chóp tứ giác đều có cạnh đáy $a$ và cạnh bên $b$ thì chiều cao $SO=\sqrt{b^2-\frac{a^2}{2}}$. Trung đoạn là đường cao của mặt bên, và diện tích xung quanh bằng nửa chu vi đáy nhân trung đoạn. Lăng trụ đều là lăng trụ đứng có đáy là đa giác đều.`,
    [
      vd(R`Hình chóp tứ giác đều có cạnh đáy $4$ và cạnh bên $6$. Tính chiều cao và thể tích.`,
        [
          buoc(R`Nửa đường chéo đáy là $OA=2\sqrt2$, nên $SO=\sqrt{6^2-8}=\sqrt{28}=2\sqrt7$.`, R`Tam giác $SOA$ vuông tại $O$ với cạnh huyền $SA=6$.`),
          buoc(R`Thể tích là $\frac13\cdot16\cdot2\sqrt7=\frac{32\sqrt7}{3}$.`, R`Dùng công thức thể tích khối chóp với diện tích đáy $16$.`),
        ],
        R`Chiều cao bằng $2\sqrt7$ và thể tích bằng $\frac{32\sqrt7}{3}$.`,
        [{ expr: "sqrt(36-8)", expect: "2*sqrt(7)" }, { expr: "Rational(1,3)*16*2*sqrt(7)", expect: "32*sqrt(7)/3" }]),
      vd(R`Hình chóp tam giác đều có cạnh đáy $6$ và chiều cao $3$. Tính trung đoạn.`,
        [
          buoc(R`Khoảng cách từ tâm đến một cạnh đáy tam giác đều là $\frac{6}{2\sqrt3}=\sqrt3$.`, R`Bán kính đường tròn nội tiếp tam giác đều cạnh $a$ là $\frac{a}{2\sqrt3}$.`),
          buoc(R`Trung đoạn là cạnh huyền của tam giác vuông có hai cạnh góc vuông $3$ và $\sqrt3$, nên bằng $\sqrt{9+3}=2\sqrt3$.`, R`Trung đoạn nối đỉnh với trung điểm cạnh đáy.`),
        ],
        R`Trung đoạn bằng $2\sqrt3$.`,
        [{ expr: "sqrt(3**2+(sqrt(3))**2)", expect: "2*sqrt(3)" }]),
    ],
    [
      luyen(R`Hình chóp tứ giác đều có cạnh đáy $6$ và cạnh bên $5$. Tính chiều cao.`, R`Chiều cao bằng $\sqrt7$.`, [{ expr: "sqrt(25-18)", expect: "sqrt(7)" }], R`Nửa đường chéo đáy có bình phương $18$ nên $SO=\sqrt{25-18}=\sqrt7$.`),
      luyen(R`Hình chóp tứ giác đều có cạnh đáy $8$ và chiều cao $3$. Tính diện tích xung quanh.`, R`Diện tích xung quanh bằng $80$.`, [{ expr: "4*Rational(1,2)*8*sqrt(3**2+4**2)", expect: "80" }], R`Khoảng cách từ tâm đến cạnh đáy là $4$, nên trung đoạn là $\sqrt{9+16}=5$ và $S_{xq}=\frac12\cdot32\cdot5=80$.`),
      luyen(R`Lăng trụ tam giác đều có cạnh đáy $4$ và chiều cao $5$. Tính thể tích.`, R`Thể tích bằng $20\sqrt3$.`, [{ expr: "sqrt(3)/4*4**2*5", expect: "20*sqrt(3)" }], R`Diện tích đáy là $\frac{\sqrt3}{4}\cdot16=4\sqrt3$ nên thể tích là $4\sqrt3\cdot5=20\sqrt3$.`),
    ],
    { topicId: "triangle" }),
]);
