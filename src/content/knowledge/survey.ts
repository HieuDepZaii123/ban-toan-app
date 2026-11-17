import type { TopicKnowledge } from "./types.ts";

const R = String.raw;

export const surveyKnowledge: TopicKnowledge = {
  id: "survey",
  tongQuat: {
    la: R`Khảo sát hàm số là quy trình có thứ tự để hiểu trọn một hàm số: tập xác định, đạo hàm, chiều biến thiên, cực trị, giới hạn và tiệm cận, bảng biến thiên, các điểm đặc biệt, rồi vẽ đồ thị. Kết quả là một bức tranh đầy đủ mà không cần vẽ từng điểm.`,
    dungDe: R`Từ bức tranh đó đọc được số nghiệm của phương trình, giá trị lớn nhất và nhỏ nhất, so sánh hai đại lượng, và biết đồ thị đi đâu ở hai đầu. Trong bài thi, chuyên đề cho bài khảo sát bốn loại hàm quen thuộc, bài tương giao, bài biện luận số nghiệm theo tham số, và bài nhận dạng đồ thị.`,
    lienHe: R`Đạo hàm cho dấu và cực trị, giới hạn cho tiệm cận và hành vi ở vô cực. Hàm bậc hai là trường hợp đơn giản nhất của quy trình này, còn phương trình hoành độ giao điểm đưa tương giao về chuyên đề Hàm số bậc hai và các phương trình khác.`,
  },
  tuDau: [
    R`Trước một chuyến leo núi, người ta xem bản đồ để biết đoạn nào lên dốc, đoạn nào xuống dốc, đỉnh ở đâu, thung lũng ở đâu. Khảo sát hàm số là vẽ tấm bản đồ như thế cho một công thức: chưa cần chấm hàng trăm điểm, ta vẫn biết đường cong lên xuống thế nào và có hình dáng gì.`,
    R`Công cụ chính là đạo hàm, tức độ dốc của đường cong tại mỗi điểm. Độ dốc dương thì đường cong đang đi lên, độ dốc âm thì đang đi xuống. Chỗ độ dốc bằng $0$ và đổi dấu là chỗ đường cong quay đầu: từ lên sang xuống là đỉnh đồi, từ xuống sang lên là đáy thung lũng.`,
    R`Mọi thông tin được ghi vào một bảng nhỏ gọi là bảng biến thiên: hàng trên là các giá trị $x$ quan trọng, hàng giữa là dấu của độ dốc, hàng dưới là các mũi tên lên xuống kèm độ cao tại những điểm quay đầu. Đọc bảng này cũng như đọc bản đồ: nhìn là biết hàm lớn nhất ở đâu, nhỏ nhất ở đâu, và một đường ngang cắt đồ thị mấy lần.`,
    R`Ngoài ra cần biết đường cong đi về đâu khi $x$ thật lớn hoặc khi tới gần chỗ hàm không tính được. Nếu nó nằm sát dần một đường thẳng thì đường đó gọi là tiệm cận. Ba họ hàm trong chuyên đề (bậc ba, bậc bốn trùng phương, phân thức bậc nhất trên bậc nhất) mỗi họ chỉ có vài kiểu dáng, và các phần «Vì sao đúng» cho thấy lý do.`,
  ],
  kyHieu: [
    { kh: R`$y'$`, doc: R`Đạo hàm của $y$: độ dốc của đồ thị tại mỗi điểm $x$.` },
    { kh: R`$y''$`, doc: R`Đạo hàm của đạo hàm: cho biết độ dốc đang tăng hay giảm, tức đồ thị đang cong ngửa lên hay úp xuống.` },
    { kh: R`$x\to+\infty$`, doc: R`Cho $x$ lớn dần, vượt qua mọi số cho trước, tức đi thật xa về bên phải.` },
    { kh: R`$\Delta'$`, doc: R`Biệt thức thu gọn của một tam thức bậc hai, ở đây là của đạo hàm. Dấu của nó cho biết đạo hàm có mấy nghiệm.` },
    { kh: R`$\nearrow$`, doc: R`Mũi tên đi lên trong bảng biến thiên: hàm đồng biến trên khoảng đó. Mũi tên đi xuống nghĩa là nghịch biến.` },
    { kh: R`$f(-x)$`, doc: R`Giá trị của hàm tại điểm đối xứng với $x$ qua số $0$.` },
    { kh: R`$ad-bc$`, doc: R`Một con số tính từ bốn hệ số của hàm phân thức. Dấu của nó quyết định hàm tăng hay giảm.` },
  ],
  canBiet: [
    R`Đạo hàm và mối liên hệ giữa dấu của $y'$ với chiều biến thiên.`,
    R`Giới hạn ở vô cực, tiệm cận đứng và tiệm cận ngang.`,
    R`Giải phương trình bậc hai và các phương trình quy về bậc hai.`,
  ],
  sections: [
    {
      title: "Quy trình khảo sát một hàm số",
      items: [
        { kind: "cach-lam", title: "Bảy bước", text: R`Bước một: tìm tập xác định. Bước hai: tính $y'$ và giải $y'=0$. Bước ba: tính giới hạn ở các đầu mút và tìm tiệm cận. Bước bốn: lập bảng biến thiên. Bước năm: nêu cực trị. Bước sáu: tìm điểm đặc biệt như giao với trục và điểm uốn. Bước bảy: vẽ đồ thị.` },
        {
          kind: "dinh-nghia", title: "Bảng biến thiên",
          text: R`Bảng ghi các giá trị $x$ quan trọng, dấu của $y'$ ở từng khoảng, mũi tên chỉ hàm tăng hay giảm, giá trị của hàm tại cực trị và giới hạn ở các đầu mút. Mọi kết luận về đồ thị đều đọc ra từ bảng này.`,
          de: R`Bảng biến thiên là bản tóm tắt chuyến đi dọc đồ thị từ trái sang phải: tới đâu thì lên, tới đâu thì xuống, quay đầu ở độ cao nào, và ở hai đầu thì đi về đâu. Lập xong bảng là coi như đã thấy đồ thị, dù chưa vẽ nét nào.`,
        },
        {
          kind: "dinh-nghia", title: "Cực đại và cực tiểu",
          text: R`Điểm $x_0$ là điểm cực đại nếu $f(x)\le f(x_0)$ với mọi $x$ đủ gần $x_0$. Giá trị $f(x_0)$ là giá trị cực đại. Tương tự với cực tiểu. Cực trị là khái niệm cục bộ, chỉ so sánh với các điểm lân cận.`,
          de: R`Cực đại là một đỉnh đồi: cao hơn mọi chỗ xung quanh nó, nhưng không nhất thiết là nơi cao nhất của cả dãy núi. Cực tiểu là một đáy thung lũng theo đúng nghĩa đó. Một hàm có thể có nhiều đỉnh đồi và thung lũng, và có khi một thung lũng còn nằm cao hơn một đỉnh đồi khác.`,
        },
        {
          kind: "tinh-chat", title: "Điểm uốn",
          text: R`Điểm uốn là điểm mà $y''$ đổi dấu, nơi đồ thị đổi chiều cong. Với hàm bậc ba, điểm uốn là tâm đối xứng của đồ thị và nằm đúng giữa hai điểm cực trị khi có cực trị.`,
          suy: [
            R`Khi $y''>0$, độ dốc đang tăng nên đồ thị cong ngửa lên như lòng bát. Khi $y''<0$, độ dốc đang giảm nên đồ thị cong úp xuống. Chỗ $y''$ đổi dấu là chỗ đồ thị chuyển từ kiểu cong này sang kiểu kia.`,
            R`Với hàm bậc ba, $y''=6ax+2b$ là biểu thức bậc nhất nên đổi dấu đúng một lần, tại $x=-\frac{b}{3a}$. Vậy hàm bậc ba có đúng một điểm uốn.`,
            R`Hai điểm cực trị là hai nghiệm của $y'=3ax^2+2bx+c$. Theo hệ thức Viète tổng của chúng là $-\frac{2b}{3a}$, nên điểm chính giữa có hoành độ $-\frac{b}{3a}$, trùng với điểm uốn.`,
          ],
        },
        { kind: "luu-y", text: R`Đừng bỏ bước giới hạn và tiệm cận. Không có chúng thì bảng biến thiên không cho biết đồ thị đi đến đâu ở hai đầu, và bài vẽ sẽ sai dù cực trị đúng.` },
      ],
    },
    {
      title: "Hàm số bậc ba",
      items: [
        {
          kind: "dinh-nghia", title: "Hàm bậc ba",
          text: R`Hàm $y=ax^3+bx^2+cx+d$ với $a\neq 0$, có tập xác định $\mathbb{R}$ và đạo hàm $y'=3ax^2+2bx+c$ là tam thức bậc hai.`,
          de: R`Đây là hàm có thêm hạng tử $x^3$ so với hàm bậc hai. Vì lập phương của số âm là số âm, hai đầu của đồ thị đi về hai hướng ngược nhau: một đầu lên mãi, một đầu xuống mãi. Ở giữa, đồ thị hoặc đi thẳng một mạch, hoặc lượn một lần lên xuống tạo thành một đỉnh đồi và một thung lũng.`,
        },
        {
          kind: "dinh-ly", title: "Số cực trị",
          text: R`Đặt $\Delta'=b^2-3ac$, biệt thức thu gọn của $y'$. Nếu $\Delta'>0$ hàm có hai điểm cực trị. Nếu $\Delta'\le 0$ thì $y'$ không đổi dấu và hàm đơn điệu trên $\mathbb{R}$, không có cực trị.`,
          suy: [
            R`Đạo hàm $y'=3ax^2+2bx+c$ là tam thức bậc hai. Hệ số của $x$ là $2b$ nên biệt thức thu gọn là $\Delta'=b^2-3a\cdot c$.`,
            R`Nếu $\Delta'>0$ thì $y'$ có hai nghiệm phân biệt và đổi dấu khi đi qua mỗi nghiệm, theo định lí về dấu của tam thức. Mỗi lần đổi dấu là một lần đồ thị quay đầu, nên hàm có hai điểm cực trị.`,
            R`Nếu $\Delta'\le 0$ thì $y'$ luôn cùng dấu với $a$, cùng lắm bằng $0$ tại một điểm. Độ dốc không đổi dấu nên hàm chỉ tăng hoặc chỉ giảm trên cả trục số, không có chỗ quay đầu.`,
          ],
        },
        {
          kind: "tinh-chat", title: "Giới hạn ở vô cực",
          text: R`Khi $a>0$, $y\to+\infty$ lúc $x\to+\infty$ và $y\to-\infty$ lúc $x\to-\infty$. Khi $a<0$ thì ngược lại. Đồ thị không có tiệm cận.`,
          suy: [
            R`Đặt $x^3$ làm nhân tử chung: $y=x^3\left(a+\frac{b}{x}+\frac{c}{x^2}+\frac{d}{x^3}\right)$. Khi $x$ rất lớn về độ lớn, ba phân số trong ngoặc rất nhỏ, nên ngoặc gần bằng $a$.`,
            R`Thừa số $x^3$ lớn tùy ý và dương khi $x$ đi về bên phải, âm khi $x$ đi về bên trái vì lập phương giữ dấu. Nhân với một số gần $a$: nếu $a>0$ thì $y$ lên $+\infty$ ở bên phải và xuống $-\infty$ ở bên trái; nếu $a<0$ thì ngược lại.`,
            R`Hàm tính được tại mọi $x$ và không tiến về một số hữu hạn nào ở hai đầu, nên không có tiệm cận đứng và cũng không có tiệm cận ngang.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Tâm đối xứng",
          text: R`Đồ thị hàm bậc ba nhận điểm uốn làm tâm đối xứng, có hoành độ $x=-\frac{b}{3a}$ là nghiệm của $y''=6ax+2b=0$.`,
          suy: [
            R`Đặt $x_0=-\frac{b}{3a}$ và dời gốc tọa độ ngang tới đó bằng cách viết $x=x_0+t$. Khai triển $a(x_0+t)^3+b(x_0+t)^2+c(x_0+t)+d$ theo $t$, hệ số của $t^2$ là $3ax_0+b$, bằng $0$ do cách chọn $x_0$.`,
            R`Vậy hàm có dạng $y=at^3+pt+y_0$, với $p$ là một hằng số và $y_0$ là giá trị của hàm tại $x_0$. Phần $at^3+pt$ đổi dấu khi đổi $t$ thành $-t$.`,
            R`Nghĩa là nếu đi sang phải một đoạn $t$ mà lên cao hơn $y_0$ một lượng $s$, thì đi sang trái đoạn $t$ sẽ xuống thấp hơn $y_0$ đúng lượng $s$. Hai điểm như thế đối xứng nhau qua điểm $(x_0;y_0)$, nên đó là tâm đối xứng.`,
          ],
        },
        { kind: "cach-lam", title: "Nhận dạng bốn kiểu đồ thị", text: R`Có bốn kiểu theo dấu của $a$ và việc có hay không có cực trị. Khi $a>0$ đồ thị đi lên từ trái sang phải, có thể lượn một lần; khi $a<0$ thì đi xuống. Số lần lượn bằng số điểm cực trị.` },
        { kind: "vi-du", text: R`Hàm $y=x^3-3x$ có $y'=3x^2-3$ nên cực đại tại $(-1;2)$ và cực tiểu tại $(1;-2)$. Điểm uốn là $(0;0)$, cũng là tâm đối xứng. Đồ thị cắt trục hoành tại $x=0$ và $x=\pm\sqrt{3}$.` },
        { kind: "vi-du", text: R`Biện luận số nghiệm của $x^3-3x=m$ bằng cách cho đường ngang $y=m$ cắt đồ thị trên. Nếu $|m|>2$ có một nghiệm, nếu $m=\pm 2$ có hai nghiệm (một nghiệm kép), nếu $|m|<2$ có ba nghiệm. Chẳng hạn $m=2$ cho $x^3-3x-2=(x-2)(x+1)^2$.` },
      ],
    },
    {
      title: "Hàm số bậc bốn trùng phương",
      items: [
        {
          kind: "dinh-nghia", title: "Hàm trùng phương",
          text: R`Hàm $y=ax^4+bx^2+c$ với $a\neq 0$ là hàm chẵn, nên đồ thị đối xứng qua trục tung. Đạo hàm là $y'=4ax^3+2bx=2x(2ax^2+b)$, luôn có nghiệm $x=0$.`,
          de: R`Đây là hàm bậc bốn chỉ có các lũy thừa chẵn của $x$. Vì $(-x)^2=x^2$ và $(-x)^4=x^4$, thay $x$ bằng $-x$ không làm đổi giá trị của hàm. Đồ thị vì vậy giống hệt nhau ở hai bên trục tung, như hai cánh bướm, và chỉ cần khảo sát nửa bên phải.`,
        },
        {
          kind: "dinh-ly", title: "Số cực trị",
          text: R`Nếu $ab<0$ thì $y'$ có ba nghiệm phân biệt và hàm có ba điểm cực trị. Nếu $ab\ge 0$ thì $y'$ chỉ có nghiệm $x=0$ và hàm có đúng một cực trị, tại $x=0$.`,
          suy: [
            R`Đạo hàm là $y'=2x(2ax^2+b)$, bằng $0$ khi $x=0$ hoặc khi $x^2=-\frac{b}{2a}$.`,
            R`Nếu $ab<0$ thì $-\frac{b}{2a}>0$, phương trình $x^2=-\frac{b}{2a}$ có hai nghiệm đối nhau khác $0$. Cùng với $x=0$ là ba nghiệm phân biệt, và $y'$ đổi dấu qua mỗi nghiệm, nên có ba điểm cực trị.`,
            R`Nếu $ab\ge 0$ thì $-\frac{b}{2a}\le 0$, bình phương không thể bằng số âm, nên ngoài $x=0$ không có nghiệm nào khác. Thừa số $2ax^2+b$ không đổi dấu, còn thừa số $2x$ đổi dấu tại $0$, nên $y'$ đổi dấu đúng một lần: có đúng một điểm cực trị.`,
          ],
        },
        {
          kind: "tinh-chat", title: "Hình dạng đồ thị",
          text: R`Khi $a>0$, đồ thị có dạng chữ W nếu có ba cực trị và dạng chữ U nếu có một. Khi $a<0$ thì lật ngược lại, thành chữ M hoặc chữ $\cap$. Hai điểm cực trị ngoài đối xứng nhau qua trục tung.`,
          suy: [
            R`Khi $x$ rất lớn về độ lớn, hạng tử $ax^4$ lấn át các hạng tử còn lại, và $x^4$ luôn dương. Vậy với $a>0$ cả hai đầu đồ thị cùng đi lên, với $a<0$ cả hai đầu cùng đi xuống.`,
            R`Với $a>0$ và một cực trị, đồ thị xuống rồi lên: dạng chữ U. Với ba cực trị, đồ thị xuống, lên, xuống, lên: dạng chữ W. Với $a<0$ mọi thứ lật ngược.`,
            R`Hàm chẵn nên đồ thị đối xứng qua trục tung. Hai điểm cực trị nằm ngoài có hoành độ đối nhau, vì vậy đối xứng nhau qua trục tung và có cùng độ cao.`,
          ],
        },
        { kind: "cach-lam", title: "Giao với trục hoành", text: R`Đặt $t=x^2$ với điều kiện $t\ge 0$ để đưa $ax^4+bx^2+c=0$ về phương trình bậc hai theo $t$. Mỗi nghiệm $t>0$ cho hai giá trị $x$, nghiệm $t=0$ cho một, nghiệm $t<0$ bị loại.` },
        { kind: "luu-y", text: R`Số nghiệm của phương trình trùng phương không phải số nghiệm của phương trình theo $t$. Phải xét dấu từng nghiệm $t$ trước khi đếm nghiệm theo $x$.` },
        { kind: "vi-du", text: R`Hàm $y=x^4-2x^2-3$ có $y'=4x(x^2-1)$ nên cực trị tại $x=0$ và $x=\pm 1$. Giá trị $y(0)=-3$ là cực đại, $y(\pm 1)=-4$ là cực tiểu. Giao với trục hoành: $t^2-2t-3=0$ cho $t=3$ hoặc $t=-1$; chỉ $t=3$ nhận, nên $x=\pm\sqrt{3}$.` },
      ],
    },
    {
      title: "Hàm phân thức bậc nhất trên bậc nhất",
      items: [
        {
          kind: "dinh-nghia", title: "Hàm phân thức",
          text: R`Hàm $y=\frac{ax+b}{cx+d}$ với $c\neq 0$ và $ad-bc\neq 0$. Điều kiện $ad-bc\neq 0$ để tử và mẫu không tỉ lệ với nhau, nếu không hàm rút gọn thành hằng số.`,
          de: R`Đây là thương của hai biểu thức bậc nhất. Tại giá trị $x$ làm mẫu bằng $0$ thì không chia được, nên đồ thị đứt làm hai nhánh ở hai bên chỗ đó. Điều kiện $ad-bc\neq 0$ loại trường hợp tử là bội của mẫu, khi ấy phân thức rút gọn thành một hằng số.`,
        },
        {
          kind: "cong-thuc", title: "Đạo hàm và chiều biến thiên",
          text: R`Đạo hàm là $y'=\frac{ad-bc}{(cx+d)^2}$, luôn cùng dấu với $ad-bc$. Nếu $ad-bc>0$ hàm đồng biến trên từng khoảng xác định, nếu $ad-bc<0$ hàm nghịch biến. Hàm không có cực trị.`,
          suy: [
            R`Dùng quy tắc đạo hàm của thương với $u=ax+b$, $u'=a$, $v=cx+d$, $v'=c$: $y'=\frac{a(cx+d)-c(ax+b)}{(cx+d)^2}$.`,
            R`Khai triển tử: $acx+ad-acx-bc=ad-bc$. Phần chứa $x$ triệt tiêu, nên $y'=\frac{ad-bc}{(cx+d)^2}$.`,
            R`Mẫu là một bình phương khác $0$ nên luôn dương. Dấu của $y'$ vì thế là dấu của $ad-bc$, không đổi và không bao giờ bằng $0$: hàm không có cực trị.`,
            R`Phải nói «trên từng khoảng xác định» vì đồ thị đứt tại $x=-\frac{d}{c}$. Hàm tăng trên mỗi nhánh, nhưng nhảy từ nhánh này sang nhánh kia thì giá trị có thể tụt xuống.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Tiệm cận",
          text: R`Tiệm cận đứng là $x=-\frac{d}{c}$ và tiệm cận ngang là $y=\frac{a}{c}$. Giao điểm của hai tiệm cận là tâm đối xứng của đồ thị.`,
          suy: [
            R`Mẫu bằng $0$ tại $x=-\frac{d}{c}$, còn tử tại đó khác $0$ vì $ad-bc\neq 0$. Khi $x$ tiến sát giá trị này, tử gần một số khác $0$ còn mẫu gần $0$, nên thương lớn tùy ý: đó là tiệm cận đứng.`,
            R`Chia cả tử và mẫu cho $x$: $y=\frac{a+\frac{b}{x}}{c+\frac{d}{x}}$. Khi $x$ rất lớn về độ lớn, hai phân số nhỏ biến mất và $y$ tiến về $\frac{a}{c}$: đó là tiệm cận ngang.`,
            R`Dời gốc tọa độ về giao điểm hai tiệm cận bằng cách đặt $X=x+\frac{d}{c}$ và $Y=y-\frac{a}{c}$. Quy đồng được $Y=\frac{bc-ad}{c^2X}$, có dạng $\frac{k}{X}$. Đổi $X$ thành $-X$ thì $Y$ đổi dấu, nên đồ thị đối xứng qua gốc mới.`,
          ],
        },
        { kind: "luu-y", text: R`Hàm đơn điệu trên từng khoảng của tập xác định, không đơn điệu trên cả $\mathbb{R}\setminus\{-\frac{d}{c}\}$. Khi viết kết luận phải ghi rõ «trên mỗi khoảng».` },
        { kind: "vi-du", text: R`Hàm $y=\frac{2x+1}{x-1}$ có $y'=\frac{2\cdot(-1)-1\cdot 1}{(x-1)^2}=\frac{-3}{(x-1)^2}<0$. Hàm nghịch biến trên $(-\infty;1)$ và trên $(1;+\infty)$, tiệm cận đứng $x=1$, tiệm cận ngang $y=2$.` },
      ],
    },
    {
      title: "Tương giao và biện luận số nghiệm",
      items: [
        { kind: "cach-lam", title: "Giao điểm của hai đồ thị", text: R`Giải phương trình hoành độ giao điểm $f(x)=g(x)$. Mỗi nghiệm là hoành độ một giao điểm, nên số nghiệm bằng số giao điểm. Đừng quên loại nghiệm không thuộc tập xác định.` },
        { kind: "cach-lam", title: "Biện luận số nghiệm theo tham số", text: R`Số nghiệm bằng số giao điểm của đồ thị $y=f(x)$ với đường ngang $y=m$. Đọc từ bảng biến thiên: cho $m$ chạy từ thấp lên cao và đếm số lần cắt.` },
        {
          kind: "tinh-chat", title: "Điều kiện tiếp xúc",
          text: R`Hai đồ thị tiếp xúc nhau tại hoành độ $x_0$ khi hệ $f(x_0)=g(x_0)$ và $f'(x_0)=g'(x_0)$ có nghiệm chung. Khi đó phương trình hoành độ có nghiệm kép tại $x_0$.`,
          suy: [
            R`Hai đồ thị tiếp xúc nhau tại một điểm nghĩa là chúng có điểm chung và tại đó có chung tiếp tuyến. Có điểm chung tại $x_0$ là $f(x_0)=g(x_0)$.`,
            R`Hai tiếp tuyến cùng đi qua điểm chung nên trùng nhau đúng khi chúng có cùng độ dốc, tức $f'(x_0)=g'(x_0)$.`,
            R`Về nghiệm kép: đặt $h=f-g$, khi đó $h(x_0)=0$ và $h'(x_0)=0$. Với đa thức, $h(x)=(x-x_0)q(x)$ nên $h'(x)=q(x)+(x-x_0)q'(x)$ và $h'(x_0)=q(x_0)=0$. Vậy $q$ cũng chia hết cho $x-x_0$, và $h$ chứa nhân tử $(x-x_0)^2$.`,
          ],
        },
        { kind: "luu-y", text: R`Khi tách tham số $m$ về một vế để dùng bảng biến thiên, phải giữ nguyên miền của $x$. Mất một điểm của miền sẽ làm sai số nghiệm.` },
        { kind: "vi-du", text: R`Đường thẳng $y=x+m$ và đồ thị $y=\frac{2x+1}{x-1}$ cho phương trình $2x+1=(x+m)(x-1)$, tức $x^2+(m-3)x-m-1=0$. Có $\Delta=(m-1)^2+12>0$ với mọi $m$, và $x=1$ không là nghiệm, nên luôn có hai giao điểm.` },
      ],
    },
    {
      title: "Đọc bảng biến thiên và đồ thị",
      items: [
        { kind: "cach-lam", title: "Từ bảng suy ra gì", text: R`Từ bảng biến thiên đọc được khoảng đồng biến, nghịch biến, các cực trị, giá trị lớn nhất và nhỏ nhất trên một đoạn, và số nghiệm của $f(x)=m$. Một bảng chính xác trả lời cả loạt câu hỏi.` },
        { kind: "luu-y", title: "Cực trị khác giá trị lớn nhất", text: R`Giá trị cực đại chỉ lớn nhất so với các điểm lân cận. Hàm $x^3-3x$ có giá trị cực đại $2$ nhưng không có giá trị lớn nhất trên $\mathbb{R}$, vì $y\to+\infty$ khi $x\to+\infty$.` },
        { kind: "cach-lam", title: "Nhận dạng đồ thị", text: R`Xét lần lượt: hướng ở hai đầu cho dấu của $a$, số điểm cực trị cho số nghiệm của $y'=0$, giao với trục tung cho hệ số tự do. Ba dữ kiện thường đủ để chọn đúng đồ thị trong bốn phương án.` },
        {
          kind: "tinh-chat", title: "Hàm chẵn và hàm lẻ",
          text: R`Hàm chẵn thỏa $f(-x)=f(x)$ nên đồ thị đối xứng qua trục tung. Hàm lẻ thỏa $f(-x)=-f(x)$ nên đồ thị đối xứng qua gốc tọa độ. Nhận ra tính chẵn lẻ giúp vẽ nửa đồ thị rồi lấy đối xứng.`,
          suy: [
            R`Hàm chẵn: nếu điểm $(x;y)$ thuộc đồ thị thì $f(-x)=f(x)=y$, nên điểm $(-x;y)$ cũng thuộc đồ thị. Hai điểm này cùng độ cao và cách đều trục tung, tức đối xứng nhau qua trục tung.`,
            R`Hàm lẻ: nếu $(x;y)$ thuộc đồ thị thì $f(-x)=-y$, nên $(-x;-y)$ cũng thuộc đồ thị. Hai điểm này nằm đối diện nhau qua gốc tọa độ.`,
          ],
        },
        { kind: "vi-du", text: R`Hàm $y=x^3-3x$ trên đoạn $[-2;2]$ có $y(-2)=-2$, $y(-1)=2$, $y(1)=-2$ và $y(2)=2$. Giá trị lớn nhất là $2$ và nhỏ nhất là $-2$, đạt ở cả cực trị lẫn đầu mút.` },
      ],
    },
  ],
  canNho: [
    R`Quy trình: tập xác định, đạo hàm, giới hạn và tiệm cận, bảng biến thiên, cực trị, điểm đặc biệt, vẽ đồ thị.`,
    R`Hàm bậc ba có hai cực trị khi $b^2-3ac>0$; tâm đối xứng là điểm uốn, hoành độ $-\frac{b}{3a}$.`,
    R`Hàm trùng phương có ba cực trị khi $ab<0$, một cực trị khi $ab\ge 0$; luôn đối xứng qua trục tung.`,
    R`Hàm $\frac{ax+b}{cx+d}$ không có cực trị; đơn điệu trên từng khoảng theo dấu của $ad-bc$.`,
    R`Tiệm cận của $\frac{ax+b}{cx+d}$: đứng $x=-\frac{d}{c}$, ngang $y=\frac{a}{c}$.`,
    R`Số nghiệm của $f(x)=m$ là số giao điểm của đồ thị với đường ngang $y=m$.`,
    R`Tương giao: giải phương trình hoành độ giao điểm; tiếp xúc khi có nghiệm kép.`,
    R`Cực đại chỉ là lớn nhất ở lân cận; giá trị lớn nhất trên đoạn so thêm cả đầu mút.`,
  ],
  lienQuan: [
    { id: "derivative", vi: R`Dấu của $y'$ cho chiều biến thiên và cực trị; mọi bước của bảng biến thiên đều dùng đạo hàm.` },
    { id: "limit", vi: R`Tiệm cận ngang, tiệm cận đứng và hành vi ở hai đầu của đồ thị đều đọc ra từ giới hạn.` },
    { id: "quadratic", vi: R`Phương trình hoành độ giao điểm thường quy về bậc hai, và điều kiện về số giao điểm là điều kiện về biệt thức.` },
  ],
  checks: [
    { expr: "diff(x**3-3*x, x)", expect: "3*x**2-3" },
    { expr: "solve(3*x**2-3, x)", expect: "[-1, 1]" },
    { expr: "(x**3-3*x).subs(x,-1)", expect: "2" },
    { expr: "(x**3-3*x).subs(x,1)", expect: "-2" },
    { expr: "diff(x**3-3*x, x, 2).subs(x,0)", expect: "0" },
    { expr: "(x**3-3*x).subs(x,0)", expect: "0" },
    { expr: "FiniteSet(*solve(x**3-3*x, x))", expect: "FiniteSet(-sqrt(3), 0, sqrt(3))" },
    { expr: "factor(x**3-3*x-2)", expect: "(x-2)*(x+1)**2" },
    { expr: "simplify(discriminant(3*a*x**2+2*b*x+c, x)/4-(b**2-3*a*c))", expect: "0" },
    { expr: "solve(diff(a*x**3+b*x**2+c*x+d, x, 2), x)", expect: "[-b/(3*a)]" },
    { expr: "(-2)**3-3*(-2)", expect: "-2" },
    { expr: "2**3-3*2", expect: "2" },
    { expr: "solve(diff(x**4-2*x**2-3, x), x)", expect: "[-1, 0, 1]" },
    { expr: "0**4-2*0**2-3", expect: "-3" },
    { expr: "1**4-2*1**2-3", expect: "-4" },
    { expr: "solve(t**2-2*t-3, t)", expect: "[-1, 3]" },
    { expr: "sqrt(3)**4-2*sqrt(3)**2-3", expect: "0" },
    { expr: "simplify((x**4-2*x**2-3).subs(x,-x)-(x**4-2*x**2-3))", expect: "0" },
    { expr: "simplify(diff((2*x+1)/(x-1), x)+3/(x-1)**2)", expect: "0" },
    { expr: "limit((2*x+1)/(x-1), x, oo)", expect: "2" },
    { expr: "simplify(diff((a*x+b)/(c*x+d), x)-(a*d-b*c)/(c*x+d)**2)", expect: "0" },
    { expr: "simplify(expand((x+m)*(x-1)-(2*x+1))-(x**2+(m-3)*x-m-1))", expect: "0" },
    { expr: "simplify(discriminant(x**2+(m-3)*x-m-1, x)-((m-1)**2+12))", expect: "0" },
    { expr: "simplify(1**2+(m-3)*1-m-1)", expect: "-3" },
  ],
};
