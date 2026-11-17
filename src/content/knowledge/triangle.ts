import type { TopicKnowledge } from "./types.ts";

const R = String.raw;

export const triangleKnowledge: TopicKnowledge = {
  id: "triangle",
  tongQuat: {
    la: R`Chuyên đề này tính độ dài, góc, diện tích và thể tích của các hình quen thuộc: tam giác, tứ giác, đường tròn trong mặt phẳng; hình chóp, lăng trụ, hình trụ, hình nón và hình cầu trong không gian. Mọi kết quả quy về vài công thức nền: diện tích đáy nhân chiều cao, định lí Pythagore, và hệ thức lượng trong tam giác.`,
    dungDe: R`Tính lượng vật liệu, thể tích bể chứa, độ cao của công trình, và giải bài khảo sát đo đạc. Trong bài thi, chuyên đề cho bài giải tam giác, bài tính diện tích, bài về góc và khoảng cách trong không gian, và bài thể tích của khối đa diện hoặc khối tròn xoay.`,
    lienHe: R`Định lí cosin và định lí sin dùng lượng giác ở chuyên đề Lượng giác. Khoảng cách và góc trong không gian cũng tính được bằng tọa độ và vectơ ở chuyên đề Hình giải tích. Thể tích khối tròn xoay là ứng dụng của tích phân.`,
  },
  tuDau: [
    R`Hình học bắt đầu từ việc đo đất: mảnh ruộng này rộng bao nhiêu, cái bể này chứa được bao nhiêu nước, cây cột này cao bao nhiêu khi không trèo lên được. Mọi câu hỏi như vậy quy về ba loại số đo: độ dài (một chiều), diện tích (hai chiều) và thể tích (ba chiều).`,
    R`Tam giác là viên gạch của mọi hình phẳng: đa giác nào cũng cắt được thành các tam giác. Vì vậy hiểu tam giác là hiểu được gần hết. Trong các tam giác, tam giác vuông đặc biệt nhất, vì nó có định lí Pythagore nối ba cạnh với nhau; phần lớn công thức độ dài ở đây là Pythagore dùng một hoặc hai lần.`,
    R`Diện tích được định nghĩa bằng cách đếm ô vuông đơn vị: hình chữ nhật dài $4$ rộng $3$ chứa $4\cdot 3=12$ ô. Mọi công thức diện tích khác đều ra từ đó bằng cách cắt hình rồi ghép lại thành hình chữ nhật. Thể tích cũng vậy với các khối lập phương đơn vị, và với việc cắt khối thành những lát mỏng.`,
    R`Một ý dùng đi dùng lại là đồng dạng: phóng to một hình lên $k$ lần thì mọi độ dài nhân với $k$, mọi diện tích nhân với $k^2$, mọi thể tích nhân với $k^3$. Tấm ảnh in to gấp đôi mỗi chiều thì tốn giấy gấp bốn; quả bóng to gấp đôi thì chứa lượng khí gấp tám.`,
  ],
  kyHieu: [
    { kh: R`$a,\ b,\ c$`, doc: R`Ba cạnh của tam giác $ABC$, đặt tên theo đỉnh đối diện: cạnh $a$ nằm đối diện đỉnh $A$.` },
    { kh: R`$180^\circ$`, doc: R`Một góc bẹt, tức nửa vòng tròn. Góc vuông là $90^\circ$.` },
    { kh: R`$h_a$`, doc: R`Đường cao ứng với cạnh $a$: đoạn hạ vuông góc từ đỉnh $A$ xuống cạnh $a$.` },
    { kh: R`$p$`, doc: R`Nửa chu vi của tam giác: $p=\frac{a+b+c}{2}$.` },
    { kh: R`$S$`, doc: R`Diện tích: số ô vuông đơn vị phủ kín hình.` },
    { kh: R`$V$`, doc: R`Thể tích: số khối lập phương đơn vị lấp đầy khối.` },
    { kh: R`$\pi$`, doc: R`Số «pi», gần bằng $3{,}14$: chu vi của một đường tròn chia cho đường kính của nó.` },
    { kh: R`$B$`, doc: R`Diện tích mặt đáy của một khối.` },
  ],
  canBiet: [
    R`Định lí Pythagore và tỉ số lượng giác trong tam giác vuông.`,
    R`Diện tích hình chữ nhật, hình tam giác, hình tròn.`,
    R`Định lí cosin và định lí sin.`,
  ],
  sections: [
    {
      title: "Tam giác và các đường đặc biệt",
      items: [
        {
          kind: "dinh-ly", title: "Góc và cạnh",
          text: R`Tổng ba góc của tam giác bằng $180^\circ$. Ba cạnh $a,b,c$ thỏa bất đẳng thức tam giác: $|b-c|<a<b+c$. Góc đối diện cạnh dài hơn thì lớn hơn.`,
          suy: [
            R`Tổng ba góc: qua đỉnh $A$ kẻ đường thẳng song song với cạnh $BC$. Hai góc tạo thành ở hai bên góc $A$ lần lượt bằng góc $B$ và góc $C$ vì là các góc so le trong. Ba góc xếp cạnh nhau tại $A$ tạo thành một góc bẹt, nên tổng bằng $180^\circ$.`,
            R`Bất đẳng thức tam giác: đoạn thẳng là đường ngắn nhất nối hai điểm, nên đi thẳng từ $B$ đến $C$ ngắn hơn đi vòng qua $A$, tức $a<b+c$. Viết điều tương tự cho hai cạnh kia, $b<a+c$ và $c<a+b$, rồi chuyển vế được $a>|b-c|$.`,
            R`Góc đối diện cạnh lớn hơn: giả sử $b>c$. Trên cạnh $AC$ lấy điểm $D$ với $AD=c$. Tam giác $ABD$ cân tại $A$ nên hai góc ở $B$ và $D$ của nó bằng nhau. Góc ở $D$ là góc ngoài của tam giác $BDC$ nên lớn hơn góc $C$, còn góc $B$ của tam giác lớn chứa góc $ABD$. Vậy góc $B$ lớn hơn góc $C$.`,
          ],
        },
        {
          kind: "dinh-nghia", title: "Bốn điểm đặc biệt",
          text: R`Ba đường trung tuyến đồng quy tại trọng tâm. Ba đường cao đồng quy tại trực tâm. Ba đường phân giác đồng quy tại tâm đường tròn nội tiếp. Ba đường trung trực đồng quy tại tâm đường tròn ngoại tiếp.`,
          de: R`Mỗi tam giác có bốn «tâm». Trọng tâm là điểm giữ thăng bằng: đặt tam giác bằng bìa lên đầu bút chì tại đó thì nó không rơi. Tâm ngoại tiếp cách đều ba đỉnh nên là tâm của đường tròn đi qua ba đỉnh. Tâm nội tiếp cách đều ba cạnh nên là tâm của đường tròn nằm gọn bên trong. Trực tâm là nơi ba đường cao gặp nhau.`,
          suy: [
            R`Trung trực: mọi điểm trên đường trung trực của $AB$ cách đều $A$ và $B$. Gọi $O$ là giao của trung trực $AB$ và trung trực $BC$, khi đó $OA=OB$ và $OB=OC$. Vậy $OA=OC$, nên $O$ cũng nằm trên trung trực của $CA$: ba đường đồng quy tại điểm cách đều ba đỉnh.`,
            R`Phân giác: mọi điểm trên đường phân giác của một góc cách đều hai cạnh của góc. Lập luận y hệt cho giao của hai đường phân giác: nó cách đều cả ba cạnh nên nằm trên đường phân giác thứ ba.`,
            R`Đường cao: qua mỗi đỉnh kẻ đường song song với cạnh đối diện, ba đường này tạo một tam giác lớn nhận $A,B,C$ làm trung điểm các cạnh. Ba đường cao của tam giác $ABC$ chính là ba đường trung trực của tam giác lớn nên đồng quy. Với trung tuyến, xem mục «Trọng tâm».`,
          ],
        },
        {
          kind: "tinh-chat", title: "Trọng tâm",
          text: R`Trọng tâm chia mỗi đường trung tuyến thành hai phần theo tỉ lệ $2:1$ tính từ đỉnh. Đường trung bình của tam giác song song với cạnh thứ ba và bằng một nửa cạnh đó.`,
          suy: [
            R`Đường trung bình: gọi $M,N$ là trung điểm của $AB$ và $AC$. Khi đó $\overrightarrow{MN}=\overrightarrow{AN}-\overrightarrow{AM}=\frac{1}{2}\left(\overrightarrow{AC}-\overrightarrow{AB}\right)=\frac{1}{2}\overrightarrow{BC}$. Vậy $MN$ song song với $BC$ và dài bằng một nửa.`,
            R`Hai trung tuyến $BN$ và $CM$ cắt nhau tại $G$. Vì $MN$ song song với $BC$, hai tam giác $GMN$ và $GCB$ đồng dạng với tỉ số $\frac{MN}{BC}=\frac{1}{2}$. Do đó $GN=\frac{1}{2}GB$: điểm $G$ chia trung tuyến $BN$ theo tỉ lệ $2:1$ tính từ đỉnh.`,
            R`Làm lại với trung tuyến $BN$ và trung tuyến kẻ từ $A$: giao điểm của chúng cũng chia $BN$ theo tỉ lệ $2:1$ tính từ $B$, nên trùng với $G$. Vậy ba trung tuyến cùng đi qua $G$.`,
          ],
        },
        {
          kind: "dinh-ly", title: "Định lí Pythagore",
          text: R`Tam giác $ABC$ vuông tại $A$ khi và chỉ khi $a^2=b^2+c^2$. Chiều thuận cho độ dài cạnh huyền, chiều đảo dùng để nhận ra tam giác vuông từ ba cạnh.`,
          suy: [
            R`Lấy bốn tam giác vuông bằng nhau có hai cạnh góc vuông $b$, $c$ và cạnh huyền $a$. Xếp chúng vào bốn góc của một hình vuông cạnh $b+c$; phần trống ở giữa là một tứ giác có bốn cạnh đều bằng $a$.`,
            R`Tứ giác ở giữa là hình vuông: tại mỗi đỉnh của nó, hai góc nhọn của hai tam giác cộng lại bằng $90^\circ$, nên góc còn lại trên đường thẳng là $180^\circ-90^\circ=90^\circ$.`,
            R`Tính diện tích hình vuông lớn theo hai cách: $(b+c)^2=4\cdot\frac{1}{2}bc+a^2$. Khai triển vế trái được $b^2+2bc+c^2=2bc+a^2$, bỏ $2bc$ ở hai vế còn $a^2=b^2+c^2$.`,
            R`Chiều đảo: nếu $a^2=b^2+c^2$, dựng một tam giác vuông có hai cạnh góc vuông $b$ và $c$. Cạnh huyền của nó bằng $\sqrt{b^2+c^2}=a$. Hai tam giác có ba cạnh bằng nhau thì bằng nhau, nên tam giác ban đầu cũng có góc vuông.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Hệ thức trong tam giác vuông",
          text: R`Gọi $h$ là đường cao ứng với cạnh huyền $a$. Khi đó $a\cdot h=b\cdot c$ và $\frac{1}{h^2}=\frac{1}{b^2}+\frac{1}{c^2}$. Trung tuyến ứng với cạnh huyền bằng một nửa cạnh huyền.`,
          suy: [
            R`Tính diện tích tam giác vuông theo hai cách: lấy hai cạnh góc vuông làm đáy và chiều cao được $\frac{1}{2}bc$; lấy cạnh huyền làm đáy được $\frac{1}{2}ah$. Vậy $ah=bc$.`,
            R`Từ đó $h=\frac{bc}{a}$, nên $\frac{1}{h^2}=\frac{a^2}{b^2c^2}=\frac{b^2+c^2}{b^2c^2}=\frac{1}{c^2}+\frac{1}{b^2}$, nhờ Pythagore.`,
            R`Trung tuyến: ghép thêm một tam giác vuông bằng nó để được hình chữ nhật nhận cạnh huyền làm đường chéo. Hai đường chéo của hình chữ nhật bằng nhau và cắt nhau tại trung điểm mỗi đường, nên trung điểm cạnh huyền cách đỉnh góc vuông đúng một nửa đường chéo, tức $\frac{a}{2}$.`,
          ],
        },
        {
          kind: "dinh-ly", title: "Tam giác đồng dạng",
          text: R`Nếu hai tam giác đồng dạng với tỉ số $k$ thì tỉ số hai chu vi là $k$ còn tỉ số hai diện tích là $k^2$. Tỉ số diện tích là bình phương vì diện tích có hai chiều.`,
          suy: [
            R`Đồng dạng với tỉ số $k$ nghĩa là mọi độ dài của tam giác này bằng $k$ lần độ dài tương ứng của tam giác kia. Chu vi mới là $ka+kb+kc=k(a+b+c)$, gấp $k$ lần chu vi cũ.`,
            R`Diện tích bằng nửa đáy nhân chiều cao. Đáy nhân với $k$ và chiều cao cũng nhân với $k$, nên diện tích nhân với $k\cdot k=k^2$.`,
          ],
        },
        { kind: "vi-du", text: R`Tam giác $3$, $4$, $5$ vuông vì $9+16=25$. Đường cao ứng với cạnh huyền là $\frac{3\cdot 4}{5}=\frac{12}{5}$ và trung tuyến ứng với cạnh huyền là $\frac{5}{2}$. Tam giác đồng dạng với tỉ số $2$ có diện tích gấp $4$ lần: từ $6$ thành $24$.` },
      ],
    },
    {
      title: "Hệ thức lượng và diện tích tam giác",
      items: [
        {
          kind: "dinh-ly", title: "Định lí cosin và định lí sin",
          text: R`Có $a^2=b^2+c^2-2bc\cos A$ và $\frac{a}{\sin A}=\frac{b}{\sin B}=\frac{c}{\sin C}=2R$ với $R$ là bán kính đường tròn ngoại tiếp. Cosin dùng khi biết hai cạnh và góc xen giữa, hoặc ba cạnh. Sin dùng khi biết cặp cạnh và góc đối.`,
          suy: [
            R`Kẻ đường cao $CH$ xuống cạnh $AB$ (xét góc $A$ nhọn). Trong tam giác vuông $ACH$: $CH=b\sin A$ và $AH=b\cos A$, nên $HB=c-b\cos A$.`,
            R`Dùng Pythagore cho tam giác vuông $CHB$: $a^2=(b\sin A)^2+(c-b\cos A)^2=b^2\sin^2A+b^2\cos^2A+c^2-2bc\cos A$. Vì $\sin^2A+\cos^2A=1$ nên $a^2=b^2+c^2-2bc\cos A$.`,
            R`Cũng đường cao đó tính từ phía góc $B$ là $CH=a\sin B$. Vậy $b\sin A=a\sin B$, tức $\frac{a}{\sin A}=\frac{b}{\sin B}$.`,
            R`Tỉ số chung bằng $2R$: vẽ đường kính $BD$ của đường tròn ngoại tiếp. Tam giác $BCD$ vuông tại $C$, và góc $D$ bằng góc $A$ vì cùng chắn cung $BC$, nên $a=BD\sin D=2R\sin A$.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Các công thức diện tích",
          text: R`$S=\frac{1}{2}a\,h_a=\frac{1}{2}bc\sin A=\frac{abc}{4R}=p\,r$, trong đó $p=\frac{a+b+c}{2}$ là nửa chu vi và $r$ là bán kính đường tròn nội tiếp. Chọn công thức theo dữ kiện đề cho.`,
          suy: [
            R`Ghép hai tam giác bằng nhau thành một hình bình hành có đáy $a$ và chiều cao $h_a$; hình bình hành cắt ghép được thành hình chữ nhật $a\times h_a$. Tam giác là một nửa nên $S=\frac{1}{2}a\,h_a$.`,
            R`Lấy đáy là cạnh $c$: chiều cao hạ từ $C$ là $b\sin A$, nên $S=\frac{1}{2}bc\sin A$. Theo định lí sin, $\sin A=\frac{a}{2R}$, thay vào được $S=\frac{abc}{4R}$.`,
            R`Nối tâm đường tròn nội tiếp với ba đỉnh, tam giác được chia thành ba tam giác nhỏ có đáy $a$, $b$, $c$ và cùng chiều cao $r$. Cộng lại: $S=\frac{1}{2}(a+b+c)r=p\,r$.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Công thức Heron",
          text: R`$S=\sqrt{p(p-a)(p-b)(p-c)}$. Công thức này cho diện tích khi chỉ biết ba cạnh, không cần dựng đường cao.`,
          suy: [
            R`Từ $S=\frac{1}{2}bc\sin A$: $S^2=\frac{1}{4}b^2c^2\sin^2A=\frac{1}{4}b^2c^2(1-\cos A)(1+\cos A)$.`,
            R`Thay $\cos A=\frac{b^2+c^2-a^2}{2bc}$ từ định lí cosin: $1+\cos A=\frac{(b+c)^2-a^2}{2bc}=\frac{(b+c-a)(b+c+a)}{2bc}$ và $1-\cos A=\frac{a^2-(b-c)^2}{2bc}=\frac{(a-b+c)(a+b-c)}{2bc}$.`,
            R`Nhân lại, $b^2c^2$ rút gọn hết: $S^2=\frac{1}{16}(a+b+c)(b+c-a)(a+c-b)(a+b-c)$.`,
            R`Với $p=\frac{a+b+c}{2}$ thì $a+b+c=2p$, $b+c-a=2(p-a)$, $a+c-b=2(p-b)$ và $a+b-c=2(p-c)$. Bốn thừa số $2$ khử với $16$, còn $S^2=p(p-a)(p-b)(p-c)$.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Độ dài đường trung tuyến",
          text: R`$m_a^2=\frac{2b^2+2c^2-a^2}{4}$ với $m_a$ là trung tuyến kẻ từ đỉnh $A$ tới trung điểm cạnh $a$.`,
          suy: [
            R`Gọi $M$ là trung điểm của cạnh $a$ và $m=m_a$. Trung tuyến chia tam giác thành hai tam giác nhỏ có chung cạnh $m$, mỗi tam giác có một cạnh $\frac{a}{2}$, và hai góc tại $M$ bù nhau.`,
            R`Dùng định lí cosin cho từng tam giác nhỏ, nhớ rằng hai góc bù có cosin đối nhau: $c^2=m^2+\frac{a^2}{4}-am\cos\theta$ và $b^2=m^2+\frac{a^2}{4}+am\cos\theta$.`,
            R`Cộng hai đẳng thức, phần chứa cosin triệt tiêu: $b^2+c^2=2m^2+\frac{a^2}{2}$. Giải ra $m^2=\frac{2b^2+2c^2-a^2}{4}$.`,
          ],
        },
        { kind: "cach-lam", title: "Giải tam giác", text: R`Giải một tam giác là tìm mọi cạnh và góc chưa biết. Dùng cosin để tìm cạnh thứ ba hoặc một góc, dùng sin để tìm góc kế tiếp, và dùng tổng ba góc bằng $180^\circ$ để tìm góc cuối.` },
        { kind: "luu-y", text: R`Biết hai cạnh và một góc không xen giữa có thể cho hai tam giác, một, hoặc không có tam giác nào. Từ $\sin A$ suy ra hai góc $A$ và $180^\circ-A$, nên phải kiểm góc nào thỏa tổng ba góc.` },
        { kind: "vi-du", text: R`Đáy $6$ và chiều cao $4$ cho $S=\frac{1}{2}\cdot 6\cdot 4=12$. Tam giác $3,4,5$ có $p=6$, và Heron cho $S=\sqrt{6\cdot 3\cdot 2\cdot 1}=6$, khớp với nửa tích hai cạnh góc vuông. Từ đó $R=\frac{abc}{4S}=\frac{60}{24}=\frac{5}{2}$ và $r=\frac{S}{p}=1$.` },
        { kind: "vi-du", text: R`Tam giác $13,14,15$ có $p=21$ và $S=\sqrt{21\cdot 8\cdot 7\cdot 6}=84$. Đường cao ứng với cạnh $14$ là $\frac{2\cdot 84}{14}=12$.` },
      ],
    },
    {
      title: "Tứ giác, đường tròn và đa giác",
      items: [
        {
          kind: "cong-thuc", title: "Diện tích các tứ giác",
          text: R`Hình chữ nhật $S=ab$. Hình bình hành $S=a\,h$. Hình thoi $S=\frac{1}{2}d_1d_2$ với $d_1,d_2$ là hai đường chéo. Hình thang $S=\frac{(a+b)\,h}{2}$ với $a,b$ là hai đáy.`,
          suy: [
            R`Hình chữ nhật: lát bằng các ô vuông đơn vị thì được $a$ cột, mỗi cột $b$ ô, tổng cộng $ab$ ô.`,
            R`Hình bình hành: cắt một tam giác vuông ở một đầu rồi ghép sang đầu kia thì được hình chữ nhật có cùng đáy $a$ và chiều cao $h$, nên $S=ah$.`,
            R`Hình thoi: hai đường chéo vuông góc và cắt nhau tại trung điểm, chia hình thành bốn tam giác vuông có hai cạnh góc vuông $\frac{d_1}{2}$ và $\frac{d_2}{2}$. Tổng diện tích là $4\cdot\frac{1}{2}\cdot\frac{d_1}{2}\cdot\frac{d_2}{2}=\frac{1}{2}d_1d_2$.`,
            R`Hình thang: ghép hai hình thang bằng nhau, một cái lật ngược, thì được hình bình hành có đáy $a+b$ và chiều cao $h$. Một hình thang là một nửa: $S=\frac{(a+b)h}{2}$.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Đường tròn và hình quạt",
          text: R`Chu vi đường tròn là $2\pi r$ và diện tích hình tròn là $\pi r^2$. Cung có góc ở tâm $\alpha$ rad dài $l=r\alpha$, và hình quạt tương ứng có diện tích $\frac{1}{2}r^2\alpha$.`,
          suy: [
            R`Mọi đường tròn đều đồng dạng với nhau, nên tỉ số giữa chu vi và đường kính là như nhau ở mọi đường tròn. Tỉ số đó được đặt tên là $\pi$, do đó chu vi bằng $\pi\cdot 2r$.`,
            R`Diện tích: cắt hình tròn thành rất nhiều múi nhỏ như cắt bánh, rồi xếp các múi xen kẽ ngược đầu nhau. Hình thu được gần như một hình chữ nhật có chiều dài bằng nửa chu vi, tức $\pi r$, và chiều cao $r$. Vậy diện tích là $\pi r\cdot r=\pi r^2$.`,
            R`Cung và hình quạt chiếm một phần của cả hình tròn, tỉ lệ với góc: phần đó là $\frac{\alpha}{2\pi}$. Vậy độ dài cung là $2\pi r\cdot\frac{\alpha}{2\pi}=r\alpha$ và diện tích quạt là $\pi r^2\cdot\frac{\alpha}{2\pi}=\frac{1}{2}r^2\alpha$.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Tam giác đều",
          text: R`Tam giác đều cạnh $a$ có chiều cao $\frac{\sqrt{3}}{2}a$ và diện tích $\frac{\sqrt{3}}{4}a^2$.`,
          suy: [
            R`Đường cao của tam giác đều chia đôi cạnh đáy, tạo ra tam giác vuông có cạnh huyền $a$ và một cạnh góc vuông $\frac{a}{2}$. Theo Pythagore, $h^2=a^2-\frac{a^2}{4}=\frac{3a^2}{4}$, nên $h=\frac{\sqrt{3}}{2}a$.`,
            R`Diện tích bằng nửa đáy nhân chiều cao: $S=\frac{1}{2}\cdot a\cdot\frac{\sqrt{3}}{2}a=\frac{\sqrt{3}}{4}a^2$.`,
          ],
        },
        {
          kind: "tinh-chat", title: "Tứ giác nội tiếp",
          text: R`Tứ giác nội tiếp đường tròn khi và chỉ khi tổng hai góc đối bằng $180^\circ$. Hình chữ nhật và hình thang cân luôn nội tiếp được.`,
          suy: [
            R`Góc nội tiếp bằng nửa số đo của cung mà nó chắn. Trong tứ giác $ABCD$ nội tiếp, góc $A$ chắn cung $BCD$ còn góc $C$ chắn cung $BAD$. Hai cung này ghép lại thành cả đường tròn $360^\circ$, nên hai góc cộng lại bằng nửa của $360^\circ$, tức $180^\circ$.`,
            R`Chiều ngược chứng minh bằng phản chứng: vẽ đường tròn qua $A,B,C$. Nếu $D$ nằm ngoài hoặc nằm trong đường tròn thì góc tại $D$ nhỏ hơn hoặc lớn hơn góc nội tiếp cùng chắn cung đó, và tổng hai góc đối không còn đúng $180^\circ$.`,
            R`Hình chữ nhật có hai góc đối $90^\circ+90^\circ=180^\circ$. Hình thang cân có hai góc kề một cạnh bên bù nhau (vì hai đáy song song) và hai góc kề một đáy bằng nhau, nên hai góc đối cũng bù nhau.`,
          ],
        },
        { kind: "luu-y", text: R`Diện tích tính bằng đơn vị bình phương nên phải đưa mọi độ dài về cùng một đơn vị trước khi tính. Đổi $1$ m thành $100$ cm làm diện tích đổi $10000$ lần, không phải $100$ lần.` },
        { kind: "vi-du", text: R`Hình thang có hai đáy $6$ và $10$, cao $4$ có diện tích $\frac{(6+10)\cdot 4}{2}=32$. Hình quạt bán kính $6$ và góc ở tâm $\frac{\pi}{3}$ có diện tích $\frac{1}{2}\cdot 36\cdot\frac{\pi}{3}=6\pi$. Tam giác đều cạnh $6$ có diện tích $\frac{\sqrt{3}}{4}\cdot 36=9\sqrt{3}$.` },
      ],
    },
    {
      title: "Quan hệ song song và vuông góc trong không gian",
      items: [
        {
          kind: "dinh-nghia", title: "Vị trí của hai đường thẳng",
          text: R`Hai đường thẳng trong không gian có ba vị trí: song song, cắt nhau, hoặc chéo nhau khi không cùng nằm trong một mặt phẳng. Hai đường chéo nhau không song song và cũng không có điểm chung.`,
          de: R`Trên mặt giấy, hai đường thẳng chỉ có thể cắt nhau hoặc song song. Trong không gian có thêm khả năng thứ ba: chúng lệch tầng với nhau, như đường ray trên cầu vượt và con đường chạy ngang bên dưới. Hai đường như vậy không gặp nhau mà cũng không cùng hướng, gọi là chéo nhau.`,
        },
        {
          kind: "dinh-ly", title: "Đường thẳng vuông góc với mặt phẳng",
          text: R`Đường thẳng vuông góc với mặt phẳng khi nó vuông góc với hai đường thẳng cắt nhau nằm trong mặt phẳng đó. Khi đó nó vuông góc với mọi đường thẳng trong mặt phẳng.`,
          suy: [
            R`Gọi $\vec{u}$ là chỉ phương của đường thẳng, còn $\vec{a}$ và $\vec{b}$ là chỉ phương của hai đường cắt nhau trong mặt phẳng. Giả thiết cho $\vec{u}\cdot\vec{a}=0$ và $\vec{u}\cdot\vec{b}=0$.`,
            R`Hai hướng khác nhau trong một mặt phẳng ghép ra được mọi hướng của mặt phẳng đó: chỉ phương $\vec{c}$ của một đường bất kì trong mặt phẳng viết được là $\vec{c}=m\vec{a}+n\vec{b}$.`,
            R`Khi đó $\vec{u}\cdot\vec{c}=m(\vec{u}\cdot\vec{a})+n(\vec{u}\cdot\vec{b})=0$, nên đường thẳng vuông góc với mọi đường trong mặt phẳng.`,
            R`Phải là hai đường cắt nhau: nếu chúng song song thì $\vec{a}$ và $\vec{b}$ cùng phương, không ghép ra được các hướng khác, và kết luận có thể sai.`,
          ],
        },
        {
          kind: "dinh-ly", title: "Hai mặt phẳng vuông góc",
          text: R`Hai mặt phẳng vuông góc khi mặt phẳng này chứa một đường thẳng vuông góc với mặt phẳng kia. Đường thẳng nằm trong một mặt phẳng và vuông góc với giao tuyến thì vuông góc với mặt phẳng còn lại.`,
          suy: [
            R`Giả sử mặt phẳng thứ nhất chứa đường thẳng $d$ vuông góc với mặt phẳng thứ hai. Đường $d$ chỉ hướng pháp tuyến của mặt phẳng thứ hai; mà $d$ nằm trong mặt phẳng thứ nhất nên vuông góc với pháp tuyến của mặt phẳng thứ nhất. Hai pháp tuyến vuông góc nhau, nên hai mặt phẳng vuông góc.`,
            R`Phần sau: cho hai mặt phẳng vuông góc, và đường $a$ nằm trong mặt thứ nhất, vuông góc với giao tuyến. Trong mặt thứ nhất có đường $d$ vuông góc với mặt thứ hai, nên $d$ vuông góc với giao tuyến.`,
            R`Trong cùng một mặt phẳng, hai đường $a$ và $d$ cùng vuông góc với giao tuyến nên song song với nhau. Vì $d$ vuông góc với mặt thứ hai, đường $a$ cũng vậy.`,
          ],
        },
        {
          kind: "tinh-chat", title: "Góc đường thẳng với mặt phẳng",
          text: R`Góc giữa đường thẳng và mặt phẳng là góc giữa đường thẳng đó và hình chiếu vuông góc của nó lên mặt phẳng. Góc này không vượt quá $90^\circ$.`,
          suy: [
            R`Lấy điểm $M$ trên đường thẳng, gọi $H$ là hình chiếu vuông góc của $M$ lên mặt phẳng và $O$ là giao điểm của đường thẳng với mặt phẳng. Tam giác $MHO$ vuông tại $H$, và góc tại $O$ là góc giữa đường thẳng với hình chiếu của nó.`,
            R`Góc tại $O$ của một tam giác vuông tại $H$ là góc nhọn, nên không vượt quá $90^\circ$; nó bằng $90^\circ$ chỉ khi đường thẳng vuông góc với mặt phẳng.`,
            R`Chọn hình chiếu là hợp lý vì đó là đường trong mặt phẳng nghiêng ít nhất so với đường thẳng: $MH$ là khoảng cách ngắn nhất từ $M$ tới mặt phẳng, nên với mọi đường khác qua $O$, góc tạo thành đều lớn hơn.`,
          ],
        },
        { kind: "cach-lam", title: "Dựng góc giữa hai mặt phẳng", text: R`Tìm giao tuyến của hai mặt phẳng, rồi kẻ trong mỗi mặt phẳng một đường vuông góc với giao tuyến tại cùng một điểm. Góc giữa hai đường đó chính là góc giữa hai mặt phẳng.` },
        { kind: "cach-lam", title: "Khoảng cách từ điểm đến mặt phẳng", text: R`Là độ dài đoạn vuông góc từ điểm đến mặt phẳng. Với hình chóp có thể tính nhờ thể tích: $d=\frac{3V}{B}$ với $B$ là diện tích đáy, khi điểm là đỉnh và mặt phẳng là đáy.` },
        { kind: "luu-y", text: R`Trong không gian, «vuông góc» không có nghĩa là «cắt nhau». Hai đường chéo nhau vẫn có thể vuông góc, khi chỉ phương của chúng vuông góc.` },
      ],
    },
    {
      title: "Thể tích khối đa diện",
      items: [
        {
          kind: "cong-thuc", title: "Lăng trụ và hình hộp",
          text: R`Thể tích lăng trụ là $V=B\cdot h$ với $B$ là diện tích đáy và $h$ là chiều cao. Hình hộp chữ nhật có $V=abc$ và lập phương cạnh $a$ có $V=a^3$.`,
          suy: [
            R`Hình hộp chữ nhật: xếp các khối lập phương đơn vị thì mỗi lớp có $a\cdot b$ khối, và có $c$ lớp chồng lên nhau, tổng cộng $abc$ khối.`,
            R`Lăng trụ đứng: coi nó là một chồng các lát mỏng giống hệt mặt đáy. Mỗi lát có thể tích bằng diện tích đáy $B$ nhân bề dày, và tổng bề dày là $h$, nên $V=Bh$.`,
            R`Lăng trụ xiên: đẩy lệch một chồng bài thì hình dáng nghiêng đi nhưng lượng giấy không đổi. Vì vậy thể tích vẫn là $Bh$, miễn $h$ là chiều cao đo vuông góc với đáy.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Hình chóp",
          text: R`Thể tích hình chóp là $V=\frac{1}{3}B\cdot h$ với $B$ là diện tích đáy. Chóp có thể tích bằng một phần ba lăng trụ cùng đáy và cùng chiều cao.`,
          suy: [
            R`Một trường hợp thấy ngay: nối tâm của khối lập phương cạnh $a$ với tám đỉnh, khối được chia thành sáu hình chóp bằng nhau, mỗi chóp có đáy là một mặt (diện tích $a^2$) và chiều cao $\frac{a}{2}$. Mỗi chóp có thể tích $\frac{a^3}{6}$, đúng bằng $\frac{1}{3}\cdot a^2\cdot\frac{a}{2}$.`,
            R`Tổng quát: cắt chóp bằng mặt phẳng song song với đáy, cách đỉnh một khoảng $x$. Lát cắt đồng dạng với đáy theo tỉ số $\frac{x}{h}$ nên có diện tích $B\cdot\frac{x^2}{h^2}$.`,
            R`Cộng thể tích các lát mỏng từ đỉnh xuống đáy là lấy tích phân: $V=\int_0^h B\frac{x^2}{h^2}\,dx=\frac{B}{h^2}\cdot\frac{h^3}{3}=\frac{1}{3}Bh$.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Đường chéo hình hộp chữ nhật",
          text: R`$d=\sqrt{a^2+b^2+c^2}$ với ba kích thước $a,b,c$. Công thức này là định lí Pythagore áp dụng hai lần.`,
          suy: [
            R`Mặt đáy là hình chữ nhật cạnh $a$ và $b$, đường chéo của nó dài $\sqrt{a^2+b^2}$ theo Pythagore.`,
            R`Đường chéo đáy và cạnh đứng $c$ vuông góc nhau, tạo một tam giác vuông có cạnh huyền là đường chéo của hộp. Dùng Pythagore lần nữa: $d^2=(a^2+b^2)+c^2$.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Tỉ số thể tích",
          text: R`Cho chóp tam giác $S.ABC$ và các điểm $A',B',C'$ lần lượt trên $SA,SB,SC$. Khi đó $\frac{V_{S.A'B'C'}}{V_{S.ABC}}=\frac{SA'}{SA}\cdot\frac{SB'}{SB}\cdot\frac{SC'}{SC}$.`,
          suy: [
            R`So hai chóp $S.A'BC$ và $S.ABC$ bằng cách coi tam giác $SBC$ là đáy chung, còn $A'$ và $A$ là đỉnh. Hai chiều cao hạ từ $A'$ và từ $A$ xuống mặt $SBC$ tỉ lệ với $\frac{SA'}{SA}$ nhờ hai tam giác đồng dạng. Cùng đáy nên tỉ số thể tích bằng $\frac{SA'}{SA}$.`,
            R`Lặp lại: thay $B$ bằng $B'$ thì thể tích nhân thêm $\frac{SB'}{SB}$, thay $C$ bằng $C'$ thì nhân thêm $\frac{SC'}{SC}$. Nhân ba tỉ số lại được công thức.`,
            R`Lập luận dùng việc mỗi mặt bên là một tam giác chứa đỉnh $S$, nên công thức chỉ đúng cho chóp tam giác. Chóp có đáy tứ giác phải chia thành hai chóp tam giác trước.`,
          ],
        },
        { kind: "cach-lam", title: "Xác định chiều cao", text: R`Chiều cao là khoảng cách từ đỉnh đến mặt đáy. Với chóp đều, chân đường cao là tâm của đáy. Với chóp có một cạnh bên vuông góc với đáy, cạnh đó là chiều cao.` },
        { kind: "luu-y", text: R`Hay quên hệ số $\frac{1}{3}$ khi tính thể tích chóp. Đáy $6\times 6$ và chiều cao $4$ cho $V=48$, không phải $144$.` },
        { kind: "vi-du", text: R`Chóp có đáy hình vuông cạnh $6$ và chiều cao $4$ có $V=\frac{1}{3}\cdot 36\cdot 4=48$. Hộp chữ nhật $3\times 4\times 12$ có đường chéo $\sqrt{9+16+144}=13$. Lăng trụ tam giác đều có cạnh đáy $2$ và cao $3$ có $V=\frac{\sqrt{3}}{4}\cdot 4\cdot 3=3\sqrt{3}$.` },
        { kind: "vi-du", text: R`Lấy $A'$ và $B'$ là trung điểm của $SA$ và $SB$, còn $C'$ trùng $C$. Tỉ số thể tích là $\frac{1}{2}\cdot\frac{1}{2}\cdot 1=\frac{1}{4}$.` },
      ],
    },
    {
      title: "Khối tròn xoay",
      items: [
        {
          kind: "cong-thuc", title: "Hình trụ",
          text: R`Hình trụ bán kính đáy $r$ và chiều cao $h$ có $V=\pi r^2h$, diện tích xung quanh $S_{xq}=2\pi rh$ và diện tích toàn phần $S_{tp}=2\pi rh+2\pi r^2$.`,
          suy: [
            R`Hình trụ là một lăng trụ có đáy tròn: một chồng các đĩa tròn giống nhau. Thể tích bằng diện tích đáy nhân chiều cao: $V=\pi r^2\cdot h$.`,
            R`Diện tích xung quanh: cắt vỏ hình trụ theo một đường thẳng đứng rồi trải phẳng ra, được hình chữ nhật có một cạnh là chu vi đáy $2\pi r$ và cạnh kia là $h$. Vậy $S_{xq}=2\pi rh$.`,
            R`Diện tích toàn phần cộng thêm hai mặt đáy, mỗi mặt $\pi r^2$.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Hình nón",
          text: R`Hình nón có đường sinh $l=\sqrt{r^2+h^2}$, thể tích $V=\frac{1}{3}\pi r^2h$ và diện tích xung quanh $S_{xq}=\pi rl$.`,
          suy: [
            R`Bán kính đáy, chiều cao và đường sinh tạo thành một tam giác vuông với đường sinh là cạnh huyền, nên $l=\sqrt{r^2+h^2}$.`,
            R`Thể tích: hình nón là một hình chóp có đáy tròn. Lát cắt cách đỉnh một khoảng $x$ là hình tròn bán kính $\frac{rx}{h}$, và lập luận cắt lát như ở hình chóp cho $V=\frac{1}{3}\pi r^2h$.`,
            R`Diện tích xung quanh: cắt vỏ nón theo một đường sinh rồi trải phẳng, được một hình quạt có bán kính $l$ và cung dài bằng chu vi đáy $2\pi r$. Diện tích hình quạt bằng nửa bán kính nhân độ dài cung: $\frac{1}{2}\cdot l\cdot 2\pi r=\pi rl$.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Hình cầu",
          text: R`Hình cầu bán kính $R$ có thể tích $V=\frac{4}{3}\pi R^3$ và diện tích mặt cầu $S=4\pi R^2$.`,
          suy: [
            R`Cắt hình cầu bằng mặt phẳng cách tâm một khoảng $x$. Theo Pythagore, lát cắt là hình tròn bán kính $\sqrt{R^2-x^2}$, có diện tích $\pi(R^2-x^2)$.`,
            R`Cộng các lát mỏng từ $x=-R$ đến $x=R$: $V=\int_{-R}^{R}\pi(R^2-x^2)\,dx=\pi\left(2R^3-\frac{2R^3}{3}\right)=\frac{4}{3}\pi R^3$.`,
            R`Diện tích mặt cầu: chia mặt cầu thành rất nhiều mảnh nhỏ rồi nối mỗi mảnh với tâm, được những khối gần như hình chóp có chiều cao $R$. Tổng thể tích là $V=\frac{1}{3}\cdot S\cdot R$, nên $S=\frac{3V}{R}=4\pi R^2$.`,
          ],
        },
        { kind: "luu-y", text: R`Đường sinh $l$ của hình nón khác chiều cao $h$. Diện tích xung quanh dùng đường sinh, còn thể tích dùng chiều cao. Nhầm hai độ dài này là lỗi hay gặp.` },
        { kind: "vi-du", text: R`Hình nón có $r=3$ và $h=4$ thì $l=\sqrt{9+16}=5$, thể tích $V=\frac{1}{3}\pi\cdot 9\cdot 4=12\pi$ và $S_{xq}=\pi\cdot 3\cdot 5=15\pi$. Hình cầu bán kính $3$ có $V=\frac{4}{3}\pi\cdot 27=36\pi$ và $S=4\pi\cdot 9=36\pi$.` },
        { kind: "vi-du", text: R`Hình trụ ngoại tiếp hình cầu bán kính $R$ có chiều cao $2R$ nên thể tích hình trụ là $V_1=2\pi R^3$. Gọi $V_2$ là thể tích hình cầu, tỉ số $\frac{V_2}{V_1}=\frac{\frac{4}{3}\pi R^3}{2\pi R^3}=\frac{2}{3}$, kết quả mà Archimedes đã tìm ra.` },
      ],
    },
  ],
  canNho: [
    R`Pythagore: $a^2=b^2+c^2$; tam giác vuông có $a\,h=b\,c$ và trung tuyến ứng cạnh huyền bằng nửa cạnh huyền.`,
    R`Đồng dạng tỉ số $k$: chu vi nhân $k$, diện tích nhân $k^2$, thể tích nhân $k^3$.`,
    R`Định lí cosin: $a^2=b^2+c^2-2bc\cos A$; định lí sin: $\frac{a}{\sin A}=2R$.`,
    R`Diện tích tam giác: $\frac{1}{2}ah$, $\frac{1}{2}bc\sin A$, Heron $\sqrt{p(p-a)(p-b)(p-c)}$.`,
    R`Hình thang $\frac{(a+b)h}{2}$; hình thoi $\frac{1}{2}d_1d_2$; hình quạt $\frac{1}{2}r^2\alpha$.`,
    R`Thể tích lăng trụ $B\,h$ và chóp $\frac{1}{3}B\,h$ với $B$ là diện tích đáy; đừng quên $\frac{1}{3}$.`,
    R`Đường chéo hình hộp chữ nhật $\sqrt{a^2+b^2+c^2}$.`,
    R`Nón: $V=\frac{1}{3}\pi r^2h$, $S_{xq}=\pi rl$ với $l=\sqrt{r^2+h^2}$; cầu: $V=\frac{4}{3}\pi R^3$, $S=4\pi R^2$.`,
  ],
  lienQuan: [
    { id: "trig", vi: R`Định lí cosin, định lí sin và công thức diện tích $\frac{1}{2}bc\sin A$ đều là lượng giác trong tam giác.` },
    { id: "analytic", vi: R`Khoảng cách và góc trong không gian cũng tính được bằng tọa độ, và cho cùng kết quả với cách dựng hình.` },
    { id: "integral", vi: R`Thể tích khối tròn xoay là $\pi\int f^2$, và các công thức hình nón, hình cầu suy ra được từ đó.` },
  ],
  checks: [
    { expr: "3**2+4**2", expect: "25" },
    { expr: "Rational(3*4,5)", expect: "Rational(12,5)" },
    { expr: "Rational(1,1)/Rational(12,5)**2", expect: "Rational(1,9)+Rational(1,16)" },
    { expr: "Rational(1,2)*5", expect: "Rational(5,2)" },
    { expr: "6*2**2", expect: "24" },
    { expr: "Rational(1,2)*6*4", expect: "12" },
    { expr: "sqrt(6*3*2*1)", expect: "6" },
    { expr: "Rational(3*4,2)", expect: "6" },
    { expr: "Rational(3*4*5,4*6)", expect: "Rational(5,2)" },
    { expr: "sqrt(21*8*7*6)", expect: "84" },
    { expr: "Rational(2*84,14)", expect: "12" },
    { expr: "Rational((6+10)*4,2)", expect: "32" },
    { expr: "Rational(1,2)*6**2*(pi/3)", expect: "6*pi" },
    { expr: "sqrt(3)/4*6**2", expect: "9*sqrt(3)" },
    { expr: "Rational(3*48,36)", expect: "4" },
    { expr: "Rational(1,3)*6**2*4", expect: "48" },
    { expr: "sqrt(3**2+4**2+12**2)", expect: "13" },
    { expr: "sqrt(3)/4*2**2*3", expect: "3*sqrt(3)" },
    { expr: "Rational(1,2)*Rational(1,2)*1", expect: "Rational(1,4)" },
    { expr: "sqrt(3**2+4**2)", expect: "5" },
    { expr: "Rational(1,3)*pi*3**2*4", expect: "12*pi" },
    { expr: "pi*3*5", expect: "15*pi" },
    { expr: "Rational(4,3)*pi*3**3", expect: "36*pi" },
    { expr: "4*pi*3**2", expect: "36*pi" },
    { expr: "simplify(Rational(4,3)*pi*R**3/(pi*R**2*(2*R)))", expect: "Rational(2,3)" },
  ],
};
