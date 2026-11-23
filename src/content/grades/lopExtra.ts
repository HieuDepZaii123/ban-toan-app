/** Chương bổ sung cho lớp 9, 10 và 11: toán thực tế, hàm bậc hai ứng dụng, góc và thể tích trong không gian. */
import type { GradeChapter } from "./types.ts";
import { bai, buoc, chuong, luyen, vd } from "./types.ts";

const R = String.raw;

export const lop9ThucTe: GradeChapter = chuong("thuc-te-9", "Giải toán thực tế bằng phương trình", [
  bai("lai-suat", "Lãi suất và tăng trưởng phần trăm",
    R`Gửi $A$ đồng với lãi suất $r$ mỗi kỳ theo lãi kép thì sau $n$ kỳ có $A(1+r)^n$ đồng. Nếu giá trị giảm $r$ phần trăm mỗi kỳ thì sau $n$ kỳ còn $A(1-r)^n$.`,
    [
      vd(R`Gửi $100$ triệu đồng với lãi suất $10\%$ mỗi năm theo lãi kép. Sau $2$ năm có bao nhiêu triệu đồng?`,
        [
          buoc(R`Sau mỗi năm số tiền nhân với $1+0{,}1=1{,}1$.`, R`Tăng $10\%$ nghĩa là nhân với $110\%$, tức là $1{,}1$.`),
          buoc(R`Sau $2$ năm có $100\cdot 1{,}1^2=121$ triệu đồng.`, R`Nhân hai lần liên tiếp với $1{,}1$ nên số tiền là lũy thừa bậc hai của $1{,}1$ nhân với số tiền gửi.`),
        ],
        R`Sau $2$ năm có $121$ triệu đồng.`,
        [{ expr: "100*Rational(11,10)**2", expect: "121" }],
      ),
      vd(R`Một chiếc xe giá $200$ triệu đồng mất giá $10\%$ mỗi năm. Sau $2$ năm xe còn giá bao nhiêu triệu đồng?`,
        [
          buoc(R`Mỗi năm giá xe nhân với $1-0{,}1=0{,}9$.`, R`Mất giá $10\%$ nghĩa là chỉ còn $90\%$ giá năm trước.`),
          buoc(R`Sau $2$ năm giá xe là $200\cdot 0{,}9^2=162$ triệu đồng.`, R`Hai năm liên tiếp nhân hai lần với $0{,}9$ nên được bình phương của $0{,}9$.`),
        ],
        R`Chiếc xe còn giá $162$ triệu đồng.`,
        [{ expr: "200*Rational(9,10)**2", expect: "162" }],
      ),
    ],
    [
      luyen(R`Gửi $50$ triệu đồng với lãi suất $8\%$ mỗi năm theo lãi kép. Sau $2$ năm có bao nhiêu triệu đồng?`, R`Có $58{,}32$ triệu đồng.`, [{ expr: "50*Rational(108,100)**2", expect: "Rational(1458,25)" }], R`Nhân với $1{,}08$ hai lần: $50\cdot 1{,}1664=58{,}32$.`),
      luyen(R`Dân số một thị trấn tăng $2\%$ mỗi năm và hiện có $10000$ người. Sau $2$ năm có bao nhiêu người?`, R`Có $10404$ người.`, [{ expr: "10000*Rational(102,100)**2", expect: "10404" }], R`Nhân với $1{,}02$ hai lần, và $1{,}02^2=1{,}0404$.`),
      luyen(R`Gửi $100$ triệu đồng với lãi kép $r$ mỗi năm, sau $2$ năm được $121$ triệu đồng. Tìm $r$.`, R`Lãi suất là $10\%$ mỗi năm.`, [{ expr: "Max(*solve(100*(1+x)**2-121, x))", expect: "Rational(1,10)" }], R`Giải $(1+r)^2=1{,}21$ cho $1+r=1{,}1$ vì $1+r>0$, nên $r=0{,}1$.`),
    ]),
  bai("dong-nuoc", "Chuyển động có dòng nước",
    R`Khi xuôi dòng, vận tốc thực bằng vận tốc riêng cộng vận tốc dòng nước. Khi ngược dòng thì lấy hiệu hai vận tốc đó. Gọi hai vận tốc là hai ẩn rồi lập hệ phương trình từ quãng đường và thời gian.`,
    [
      vd(R`Một ca nô đi xuôi dòng $30$ km hết $2$ giờ và đi ngược dòng $30$ km hết $3$ giờ. Tìm vận tốc riêng của ca nô và vận tốc dòng nước.`,
        [
          buoc(R`Gọi $x$ là vận tốc riêng và $y$ là vận tốc dòng nước (km/h). Ta có $(x+y)\cdot 2=30$ và $(x-y)\cdot 3=30$.`, R`Quãng đường bằng vận tốc nhân thời gian, với vận tốc thực là $x+y$ khi xuôi dòng và $x-y$ khi ngược dòng.`),
          buoc(R`Hệ trở thành $x+y=15$ và $x-y=10$.`, R`Chia hai vế của mỗi phương trình cho thời gian tương ứng.`),
          buoc(R`Cộng hai vế được $2x=25$ nên $x=12{,}5$, và $y=15-12{,}5=2{,}5$.`, R`Cộng đại số khử $y$, rồi thế $x$ vào phương trình đầu để tìm $y$.`),
        ],
        R`Vận tốc riêng là $12{,}5$ km/h và vận tốc dòng nước là $2{,}5$ km/h.`,
        [{ expr: "Rational(15+10,2)", expect: "Rational(25,2)" }, { expr: "15-Rational(25,2)", expect: "Rational(5,2)" }],
      ),
      vd(R`Một ca nô đi xuôi dòng $36$ km hết $2$ giờ và đi ngược dòng $24$ km hết $2$ giờ. Tìm vận tốc dòng nước.`,
        [
          buoc(R`Vận tốc xuôi dòng là $\frac{36}{2}=18$ km/h và vận tốc ngược dòng là $\frac{24}{2}=12$ km/h.`, R`Vận tốc bằng quãng đường chia cho thời gian.`),
          buoc(R`Vận tốc dòng nước bằng nửa hiệu hai vận tốc: $\frac{18-12}{2}=3$ km/h.`, R`Hiệu hai vận tốc bằng $2y$ vì $(x+y)-(x-y)=2y$.`),
        ],
        R`Vận tốc dòng nước là $3$ km/h.`,
        [{ expr: "Rational(18-12,2)", expect: "3" }],
      ),
    ],
    [
      luyen(R`Ca nô đi xuôi dòng $20$ km hết $1$ giờ và ngược dòng $20$ km hết $2$ giờ. Tìm vận tốc riêng của ca nô.`, R`Vận tốc riêng là $15$ km/h.`, [{ expr: "Rational(20+10,2)", expect: "15" }], R`Có $x+y=20$ và $x-y=10$, nên $2x=30$ và $x=15$.`),
      luyen(R`Với ca nô ở bài trên, tìm vận tốc dòng nước.`, R`Vận tốc dòng nước là $5$ km/h.`, [{ expr: "Rational(20-10,2)", expect: "5" }], R`Vận tốc dòng nước là $y=20-15=5$ km/h.`),
      luyen(R`Một ca nô có vận tốc riêng $18$ km/h. Đi xuôi dòng một đoạn sông hết $2$ giờ rồi quay lại hết $3$ giờ. Tìm vận tốc dòng nước.`, R`Vận tốc dòng nước là $3{,}6$ km/h.`, [{ expr: "solve((18+x)*2-(18-x)*3, x)[0]", expect: "Rational(18,5)" }], R`Hai chiều đi cùng quãng đường nên $2(18+y)=3(18-y)$, suy ra $5y=18$ và $y=3{,}6$.`),
    ]),
]);

export const lop10UngDung: GradeChapter = chuong("ung-dung-b2", "Ứng dụng hàm số bậc hai", [
  bai("doanh-thu-b2", "Doanh thu và lợi nhuận lớn nhất",
    R`Nhiều bài toán thực tế cho một đại lượng là hàm bậc hai của giá bán, chẳng hạn doanh thu bằng giá bán nhân số sản phẩm bán được. Khi hệ số của $x^2$ âm, giá trị lớn nhất đạt tại đỉnh của parabol, có hoành độ $x=-\frac{b}{2a}$.`,
    [
      vd(R`Một cửa hàng bán mỗi sản phẩm với giá $x$ nghìn đồng thì bán được $100-2x$ sản phẩm mỗi ngày. Tìm giá $x$ để doanh thu lớn nhất.`,
        [
          buoc(R`Doanh thu là $R(x)=x(100-2x)=-2x^2+100x$.`, R`Doanh thu bằng giá bán nhân số sản phẩm bán được.`),
          buoc(R`Hệ số của $x^2$ là $-2<0$ nên $R$ lớn nhất tại đỉnh, $x=-\frac{100}{2\cdot(-2)}=25$.`, R`Parabol quay xuống dưới nên đỉnh là điểm cao nhất, và hoành độ đỉnh là $-\frac{b}{2a}$.`),
          buoc(R`Doanh thu lớn nhất là $R(25)=25\cdot 50=1250$ nghìn đồng.`, R`Thay hoành độ đỉnh vào hàm số để có giá trị lớn nhất.`),
        ],
        R`Giá $25$ nghìn đồng cho doanh thu lớn nhất, bằng $1250$ nghìn đồng.`,
        [{ expr: "-100/(2*(-2))", expect: "25" }, { expr: "25*(100-2*25)", expect: "1250" }],
      ),
      vd(R`Mỗi sản phẩm có chi phí $10$ nghìn đồng. Với cùng quy luật bán hàng, tìm giá bán $x$ để lợi nhuận lớn nhất.`,
        [
          buoc(R`Lợi nhuận là $L(x)=(x-10)(100-2x)=-2x^2+120x-1000$.`, R`Lợi nhuận mỗi sản phẩm là $x-10$ nghìn đồng, nhân với số sản phẩm bán được.`),
          buoc(R`Đỉnh ở $x=-\frac{120}{2\cdot(-2)}=30$.`, R`Parabol quay xuống dưới nên hoành độ đỉnh cho lợi nhuận lớn nhất.`),
          buoc(R`Lợi nhuận lớn nhất là $L(30)=20\cdot 40=800$ nghìn đồng.`, R`Thay $x=30$ thì $x-10=20$ và $100-2x=40$.`),
        ],
        R`Giá bán $30$ nghìn đồng cho lợi nhuận lớn nhất, bằng $800$ nghìn đồng.`,
        [{ expr: "-120/(2*(-2))", expect: "30" }, { expr: "(30-10)*(100-2*30)", expect: "800" }],
      ),
    ],
    [
      luyen(R`Số sản phẩm bán được là $80-2x$ nên doanh thu là $x(80-2x)$. Tìm $x$ để doanh thu lớn nhất.`, R`Giá $x=20$.`, [{ expr: "-80/(2*(-2))", expect: "20" }], R`Hàm $-2x^2+80x$ có hoành độ đỉnh $-\frac{80}{2\cdot(-2)}=20$.`),
      luyen(R`Giá trị lớn nhất của doanh thu $-2x^2+80x$ bằng bao nhiêu?`, R`Doanh thu lớn nhất bằng $800$.`, [{ expr: "20*(80-2*20)", expect: "800" }], R`Thay $x=20$ vào hàm số: $20\cdot 40=800$.`),
      luyen(R`Với chi phí $5$ cho mỗi sản phẩm và số sản phẩm bán được là $80-2x$, tìm giá $x$ để lợi nhuận $(x-5)(80-2x)$ lớn nhất.`, R`Giá $x=22{,}5$.`, [{ expr: "Rational(90,4)", expect: "Rational(45,2)" }], R`Khai triển $(x-5)(80-2x)=-2x^2+90x-400$ có hoành độ đỉnh $\frac{90}{4}=22{,}5$.`),
    ],
    { topicId: "quadratic" }),
  bai("quy-dao-b2", "Quỹ đạo parabol",
    R`Vật ném xiên chuyển động theo đường parabol $y=-ax^2+bx$ với $a>0$ khi chọn gốc tọa độ tại điểm ném. Độ cao lớn nhất nằm ở đỉnh, còn tầm xa là nghiệm dương của phương trình $y=0$.`,
    [
      vd(R`Một quả bóng bay theo quỹ đạo $y=-0{,}1x^2+x$ (đơn vị mét). Tìm độ cao lớn nhất của bóng.`,
        [
          buoc(R`Hoành độ đỉnh là $x=-\frac{1}{2\cdot(-0{,}1)}=5$.`, R`Dùng công thức hoành độ đỉnh $-\frac{b}{2a}$ với $a=-0{,}1$ và $b=1$.`),
          buoc(R`Độ cao lớn nhất là $y(5)=-0{,}1\cdot 25+5=2{,}5$.`, R`Thay hoành độ đỉnh vào phương trình quỹ đạo.`),
        ],
        R`Độ cao lớn nhất của bóng là $2{,}5$ mét.`,
        [{ expr: "-1/(2*Rational(-1,10))", expect: "5" }, { expr: "-Rational(1,10)*25+5", expect: "Rational(5,2)" }],
      ),
      vd(R`Với quỹ đạo trên, bóng chạm đất cách chỗ ném bao xa?`,
        [
          buoc(R`Bóng chạm đất khi $y=0$, tức là $-0{,}1x^2+x=0$.`, R`Độ cao bằng $0$ nghĩa là bóng đã trở lại mặt đất.`),
          buoc(R`Phân tích $x(1-0{,}1x)=0$ cho $x=0$ hoặc $x=10$.`, R`Nghiệm $x=0$ là chỗ ném, nên tầm xa là nghiệm còn lại $x=10$.`),
        ],
        R`Bóng chạm đất cách chỗ ném $10$ mét.`,
        [{ expr: "Max(*solve(-Rational(1,10)*x**2+x, x))", expect: "10" }],
      ),
    ],
    [
      luyen(R`Quỹ đạo của một vật là $y=-x^2+4x$. Tìm độ cao lớn nhất.`, R`Độ cao lớn nhất là $4$.`, [{ expr: "-(2**2)+4*2", expect: "4" }], R`Đỉnh ở $x=2$ và $y(2)=-4+8=4$.`),
      luyen(R`Với quỹ đạo $y=-x^2+4x$, vật chạm đất tại điểm cách gốc bao xa?`, R`Cách gốc $4$.`, [{ expr: "Max(*solve(-x**2+4*x, x))", expect: "4" }], R`Giải $-x^2+4x=0$ được $x=0$ hoặc $x=4$.`),
      luyen(R`Quỹ đạo của một vật là $y=-0{,}05x^2+x$. Tìm độ cao lớn nhất.`, R`Độ cao lớn nhất là $5$.`, [{ expr: "-Rational(5,100)*100+10", expect: "5" }], R`Đỉnh ở $x=\frac{1}{0{,}1}=10$ và $y(10)=-5+10=5$.`),
    ],
    { topicId: "quadratic" }),
]);

export const lop11GocKhongGian: GradeChapter = chuong("goc-kc-11", "Góc, thể tích và khoảng cách trong hình học không gian", [
  bai("goc-dt-mp", "Góc giữa đường thẳng và mặt phẳng",
    R`Góc giữa đường thẳng và mặt phẳng là góc giữa đường thẳng đó và hình chiếu vuông góc của nó lên mặt phẳng. Khi cạnh bên vuông góc với đáy, hình chiếu của một đường xiên lên đáy là đoạn nối chân đường vuông góc với chân đường xiên, nên góc cần tìm nằm trong một tam giác vuông.`,
    [
      vd(R`Cho hình chóp $S.ABCD$ có đáy là hình vuông cạnh $3$, $SA\perp(ABCD)$ và $SA=3$. Tính góc giữa $SB$ và mặt phẳng đáy.`,
        [
          buoc(R`Hình chiếu của $SB$ lên $(ABCD)$ là $AB$, vì $SA\perp(ABCD)$ và $A$ là chân đường vuông góc.`, R`Hình chiếu của một đường xiên đi qua chân đường vuông góc và chân đường xiên.`),
          buoc(R`Tam giác $SAB$ vuông tại $A$ có $\tan\widehat{SBA}=\frac{SA}{AB}=\frac{3}{3}=1$.`, R`Trong tam giác vuông, tang của một góc nhọn bằng cạnh đối chia cạnh kề.`),
          buoc(R`Suy ra góc giữa $SB$ và đáy bằng $45^\circ$.`, R`Góc nhọn có tang bằng $1$ là góc $45^\circ$.`),
        ],
        R`Góc giữa $SB$ và mặt phẳng đáy bằng $45^\circ$.`,
        [{ expr: "atan(Rational(3,3))*180/pi", expect: "45" }],
      ),
      vd(R`Với hình chóp ở ví dụ trước, tính tang của góc giữa $SC$ và mặt phẳng đáy.`,
        [
          buoc(R`Hình chiếu của $SC$ lên đáy là $AC$, và $AC=3\sqrt{2}$.`, R`Đường chéo hình vuông cạnh $3$ dài $3\sqrt{2}$ theo định lí Py-ta-go.`),
          buoc(R`Tam giác $SAC$ vuông tại $A$ nên $\tan\widehat{SCA}=\frac{SA}{AC}=\frac{3}{3\sqrt{2}}=\frac{\sqrt{2}}{2}$.`, R`Rút gọn phân số bằng cách chia tử và mẫu cho $3$, rồi trục căn ở mẫu.`),
        ],
        R`Tang của góc giữa $SC$ và đáy bằng $\frac{\sqrt{2}}{2}$.`,
        [{ expr: "3/(3*sqrt(2))", expect: "sqrt(2)/2" }],
      ),
    ],
    [
      luyen(R`Cho chóp $S.ABC$ có $SA\perp(ABC)$, $SA=4$ và $AB=4$. Tính góc giữa $SB$ và mặt phẳng $(ABC)$.`, R`Góc bằng $45^\circ$.`, [{ expr: "atan(Rational(4,4))*180/pi", expect: "45" }], R`Tam giác $SAB$ vuông cân tại $A$ vì $SA=AB$, nên góc ở $B$ bằng $45^\circ$.`),
      luyen(R`Chóp $S.ABCD$ có đáy là hình chữ nhật với hai cạnh $3$ và $4$, $SA\perp(ABCD)$ và $SA=10$. Tính tang của góc giữa $SC$ và đáy.`, R`Tang bằng $2$.`, [{ expr: "10/sqrt(3**2+4**2)", expect: "2" }], R`Đường chéo $AC=\sqrt{3^2+4^2}=5$ nên $\tan=\frac{SA}{AC}=\frac{10}{5}=2$.`),
      luyen(R`Hình chóp đều $S.ABCD$ có đáy là hình vuông cạnh $2$ và cạnh bên bằng $3$. Tính côsin của góc giữa cạnh bên và mặt đáy.`, R`Côsin bằng $\frac{\sqrt{2}}{3}$.`, [{ expr: "(2*sqrt(2)/2)/3", expect: "sqrt(2)/3" }], R`Chân đường cao là tâm $O$ của đáy với $AO=\frac{2\sqrt{2}}{2}=\sqrt{2}$, và côsin bằng cạnh kề $AO$ chia cạnh huyền $SA$.`),
    ]),
  bai("the-tich-goc", "Thể tích khối chóp khi biết góc",
    R`Khi đề cho góc giữa cạnh bên và mặt đáy, dùng góc đó để tính chiều cao rồi áp dụng $V=\frac{1}{3}Bh$ cho khối chóp và $V=Bh$ cho khối lăng trụ, với $B$ là diện tích đáy.`,
    [
      vd(R`Chóp $S.ABCD$ có đáy là hình vuông cạnh $3$, $SA\perp(ABCD)$ và $SB$ tạo với đáy góc $45^\circ$. Tính thể tích khối chóp.`,
        [
          buoc(R`Góc giữa $SB$ và đáy là $\widehat{SBA}=45^\circ$ nên tam giác $SAB$ vuông cân, $SA=AB=3$.`, R`Tam giác vuông có một góc nhọn $45^\circ$ thì góc nhọn kia cũng $45^\circ$ và hai cạnh góc vuông bằng nhau.`),
          buoc(R`Diện tích đáy là $B=3^2=9$.`, R`Đáy là hình vuông cạnh $3$.`),
          buoc(R`Thể tích là $V=\frac{1}{3}\cdot 9\cdot 3=9$.`, R`Dùng công thức khối chóp với $B=9$ và chiều cao $h=SA=3$.`),
        ],
        R`Thể tích khối chóp bằng $9$.`,
        [{ expr: "Rational(1,3)*9*3", expect: "9" }, { expr: "3**2", expect: "9" }],
      ),
      vd(R`Chóp $S.ABC$ có đáy $ABC$ vuông tại $B$ với $AB=3$ và $BC=4$, $SA\perp(ABC)$ và $SC$ tạo với đáy góc $60^\circ$. Tính thể tích khối chóp.`,
        [
          buoc(R`Ta có $AC=5$ và $\widehat{SCA}=60^\circ$, nên $SA=AC\cdot\tan60^\circ=5\sqrt{3}$.`, R`Trong tam giác $SAC$ vuông tại $A$, $\tan\widehat{SCA}=\frac{SA}{AC}$.`),
          buoc(R`Diện tích đáy là $B=\frac{1}{2}\cdot 3\cdot 4=6$.`, R`Tam giác vuông có diện tích bằng nửa tích hai cạnh góc vuông.`),
          buoc(R`Thể tích là $V=\frac{1}{3}\cdot 6\cdot 5\sqrt{3}=10\sqrt{3}$.`, R`Thay $B=6$ và $h=5\sqrt{3}$ vào công thức khối chóp.`),
        ],
        R`Thể tích khối chóp bằng $10\sqrt{3}$.`,
        [{ expr: "Rational(1,3)*6*5*sqrt(3)", expect: "10*sqrt(3)" }],
      ),
    ],
    [
      luyen(R`Lăng trụ đứng $ABC.A'B'C'$ có đáy vuông cân tại $A$ với $AB=4$, và $A'B$ tạo với đáy góc $45^\circ$. Tính thể tích.`, R`Thể tích bằng $32$.`, [{ expr: "Rational(1,2)*4*4*4", expect: "32" }], R`Chiều cao $AA'=AB=4$ và diện tích đáy là $\frac{1}{2}\cdot 4\cdot 4=8$, nên $V=8\cdot 4=32$.`),
      luyen(R`Chóp $S.ABCD$ có đáy là hình chữ nhật với hai cạnh $3$ và $4$, $SA\perp(ABCD)$ và $SC$ tạo với đáy góc $45^\circ$. Tính thể tích.`, R`Thể tích bằng $20$.`, [{ expr: "Rational(1,3)*3*4*5", expect: "20" }], R`Đường chéo $AC=5$ nên $SA=5$, và $V=\frac{1}{3}\cdot 12\cdot 5=20$.`),
      luyen(R`Chóp tam giác đều $S.ABC$ có cạnh đáy $6$ và cạnh bên $SA$ tạo với đáy góc $60^\circ$. Tính thể tích.`, R`Thể tích bằng $18\sqrt{3}$.`, [{ expr: "Rational(1,3)*(sqrt(3)/4*36)*(2*sqrt(3)*sqrt(3))", expect: "18*sqrt(3)" }], R`Chân đường cao là tâm đáy, cách mỗi đỉnh $2\sqrt{3}$, nên $h=2\sqrt{3}\cdot\tan60^\circ=6$ và $B=9\sqrt{3}$.`),
    ]),
  bai("kc-diem-mp", "Khoảng cách từ điểm đến mặt phẳng",
    R`Khoảng cách từ điểm $M$ đến mặt phẳng $(P)$ là độ dài đoạn vuông góc $MH$ với $H$ thuộc $(P)$. Với khối chóp, có thể tính khoảng cách từ đỉnh đến mặt đáy qua thể tích: $d=\frac{3V}{B}$.`,
    [
      vd(R`Chóp $S.ABCD$ có đáy là hình vuông cạnh $3$, $SA\perp(ABCD)$ và $SA=3$. Tính khoảng cách từ $A$ đến mặt phẳng $(SBC)$.`,
        [
          buoc(R`Vì $BC\perp AB$ và $BC\perp SA$ nên $BC\perp(SAB)$.`, R`Đường thẳng vuông góc với hai đường cắt nhau của một mặt phẳng thì vuông góc với mặt phẳng đó.`),
          buoc(R`Kẻ $AH\perp SB$ tại $H$. Vì $BC\perp(SAB)$ nên $AH\perp BC$, suy ra $AH\perp(SBC)$.`, R`Đường $AH$ vuông góc với hai đường cắt nhau $SB$ và $BC$ của mặt phẳng $(SBC)$.`),
          buoc(R`Tam giác $SAB$ vuông tại $A$ có đường cao $AH=\frac{SA\cdot AB}{SB}=\frac{3\cdot 3}{3\sqrt{2}}=\frac{3\sqrt{2}}{2}$.`, R`Trong tam giác vuông, tích hai cạnh góc vuông bằng cạnh huyền nhân đường cao ứng với cạnh huyền.`),
        ],
        R`Khoảng cách từ $A$ đến $(SBC)$ bằng $\frac{3\sqrt{2}}{2}$.`,
        [{ expr: "3*3/sqrt(3**2+3**2)", expect: "3*sqrt(2)/2" }],
      ),
      vd(R`Khối chóp có thể tích $18\sqrt{3}$ và diện tích đáy $9\sqrt{3}$. Tính khoảng cách từ đỉnh đến mặt đáy.`,
        [
          buoc(R`Từ $V=\frac{1}{3}Bh$ suy ra $h=\frac{3V}{B}$.`, R`Khoảng cách từ đỉnh đến mặt đáy chính là chiều cao của khối chóp.`),
          buoc(R`Thay số: $h=\frac{3\cdot 18\sqrt{3}}{9\sqrt{3}}=6$.`, R`Rút gọn thừa số chung $\sqrt{3}$ rồi tính $\frac{54}{9}$.`),
        ],
        R`Khoảng cách từ đỉnh đến mặt đáy bằng $6$.`,
        [{ expr: "3*18*sqrt(3)/(9*sqrt(3))", expect: "6" }],
      ),
    ],
    [
      luyen(R`Khối chóp có thể tích $24$ và diện tích đáy $12$. Tính chiều cao.`, R`Chiều cao bằng $6$.`, [{ expr: "3*24/12", expect: "6" }], R`Từ $V=\frac{1}{3}Bh$ có $h=\frac{3V}{B}=\frac{72}{12}=6$.`),
      luyen(R`Tam giác $SAB$ vuông tại $A$ với $SA=3$ và $AB=4$. Tính khoảng cách từ $A$ đến $SB$.`, R`Khoảng cách bằng $\frac{12}{5}$.`, [{ expr: "3*4/sqrt(3**2+4**2)", expect: "Rational(12,5)" }], R`Đường cao ứng với cạnh huyền bằng tích hai cạnh góc vuông chia cạnh huyền: $\frac{3\cdot 4}{5}=\frac{12}{5}$.`),
      luyen(R`Chóp $S.ABCD$ có đáy là hình vuông cạnh $3$, $SA\perp(ABCD)$ và $SA=6$. Tính khoảng cách từ $A$ đến mặt phẳng $(SCD)$.`, R`Khoảng cách bằng $\frac{6\sqrt{5}}{5}$.`, [{ expr: "6*3/sqrt(6**2+3**2)", expect: "6*sqrt(5)/5" }], R`Vì $CD\perp(SAD)$ nên khoảng cách là đường cao của tam giác $SAD$ vuông tại $A$: $\frac{6\cdot 3}{3\sqrt{5}}=\frac{6\sqrt{5}}{5}$.`),
    ]),
]);
