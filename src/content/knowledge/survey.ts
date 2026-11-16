import type { TopicKnowledge } from "./types.ts";

const R = String.raw;

export const surveyKnowledge: TopicKnowledge = {
  id: "survey",
  tongQuat: {
    la: R`Khảo sát hàm số là quy trình có thứ tự để hiểu trọn một hàm số: tập xác định, đạo hàm, chiều biến thiên, cực trị, giới hạn và tiệm cận, bảng biến thiên, các điểm đặc biệt, rồi vẽ đồ thị. Kết quả là một bức tranh đầy đủ mà không cần vẽ từng điểm.`,
    dungDe: R`Từ bức tranh đó đọc được số nghiệm của phương trình, giá trị lớn nhất và nhỏ nhất, so sánh hai đại lượng, và biết đồ thị đi đâu ở hai đầu. Trong bài thi, chuyên đề cho bài khảo sát bốn loại hàm quen thuộc, bài tương giao, bài biện luận số nghiệm theo tham số, và bài nhận dạng đồ thị.`,
    lienHe: R`Đạo hàm cho dấu và cực trị, giới hạn cho tiệm cận và hành vi ở vô cực. Hàm bậc hai là trường hợp đơn giản nhất của quy trình này, còn phương trình hoành độ giao điểm đưa tương giao về chuyên đề Hàm số bậc hai và các phương trình khác.`,
  },
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
        { kind: "dinh-nghia", title: "Bảng biến thiên", text: R`Bảng ghi các giá trị $x$ quan trọng, dấu của $y'$ ở từng khoảng, mũi tên chỉ hàm tăng hay giảm, giá trị của hàm tại cực trị và giới hạn ở các đầu mút. Mọi kết luận về đồ thị đều đọc ra từ bảng này.` },
        { kind: "dinh-nghia", title: "Cực đại và cực tiểu", text: R`Điểm $x_0$ là điểm cực đại nếu $f(x)\le f(x_0)$ với mọi $x$ đủ gần $x_0$. Giá trị $f(x_0)$ là giá trị cực đại. Tương tự với cực tiểu. Cực trị là khái niệm cục bộ, chỉ so sánh với các điểm lân cận.` },
        { kind: "tinh-chat", title: "Điểm uốn", text: R`Điểm uốn là điểm mà $y''$ đổi dấu, nơi đồ thị đổi chiều cong. Với hàm bậc ba, điểm uốn là tâm đối xứng của đồ thị và nằm đúng giữa hai điểm cực trị khi có cực trị.` },
        { kind: "luu-y", text: R`Đừng bỏ bước giới hạn và tiệm cận. Không có chúng thì bảng biến thiên không cho biết đồ thị đi đến đâu ở hai đầu, và bài vẽ sẽ sai dù cực trị đúng.` },
      ],
    },
    {
      title: "Hàm số bậc ba",
      items: [
        { kind: "dinh-nghia", title: "Hàm bậc ba", text: R`Hàm $y=ax^3+bx^2+cx+d$ với $a\neq 0$, có tập xác định $\mathbb{R}$ và đạo hàm $y'=3ax^2+2bx+c$ là tam thức bậc hai.` },
        { kind: "dinh-ly", title: "Số cực trị", text: R`Đặt $\Delta'=b^2-3ac$, biệt thức thu gọn của $y'$. Nếu $\Delta'>0$ hàm có hai điểm cực trị. Nếu $\Delta'\le 0$ thì $y'$ không đổi dấu và hàm đơn điệu trên $\mathbb{R}$, không có cực trị.` },
        { kind: "tinh-chat", title: "Giới hạn ở vô cực", text: R`Khi $a>0$, $y\to+\infty$ lúc $x\to+\infty$ và $y\to-\infty$ lúc $x\to-\infty$. Khi $a<0$ thì ngược lại. Đồ thị không có tiệm cận.` },
        { kind: "cong-thuc", title: "Tâm đối xứng", text: R`Đồ thị hàm bậc ba nhận điểm uốn làm tâm đối xứng, có hoành độ $x=-\frac{b}{3a}$ là nghiệm của $y''=6ax+2b=0$.` },
        { kind: "cach-lam", title: "Nhận dạng bốn kiểu đồ thị", text: R`Có bốn kiểu theo dấu của $a$ và việc có hay không có cực trị. Khi $a>0$ đồ thị đi lên từ trái sang phải, có thể lượn một lần; khi $a<0$ thì đi xuống. Số lần lượn bằng số điểm cực trị.` },
        { kind: "vi-du", text: R`Hàm $y=x^3-3x$ có $y'=3x^2-3$ nên cực đại tại $(-1;2)$ và cực tiểu tại $(1;-2)$. Điểm uốn là $(0;0)$, cũng là tâm đối xứng. Đồ thị cắt trục hoành tại $x=0$ và $x=\pm\sqrt{3}$.` },
        { kind: "vi-du", text: R`Biện luận số nghiệm của $x^3-3x=m$ bằng cách cho đường ngang $y=m$ cắt đồ thị trên. Nếu $|m|>2$ có một nghiệm, nếu $m=\pm 2$ có hai nghiệm (một nghiệm kép), nếu $|m|<2$ có ba nghiệm. Chẳng hạn $m=2$ cho $x^3-3x-2=(x-2)(x+1)^2$.` },
      ],
    },
    {
      title: "Hàm số bậc bốn trùng phương",
      items: [
        { kind: "dinh-nghia", title: "Hàm trùng phương", text: R`Hàm $y=ax^4+bx^2+c$ với $a\neq 0$ là hàm chẵn, nên đồ thị đối xứng qua trục tung. Đạo hàm là $y'=4ax^3+2bx=2x(2ax^2+b)$, luôn có nghiệm $x=0$.` },
        { kind: "dinh-ly", title: "Số cực trị", text: R`Nếu $ab<0$ thì $y'$ có ba nghiệm phân biệt và hàm có ba điểm cực trị. Nếu $ab\ge 0$ thì $y'$ chỉ có nghiệm $x=0$ và hàm có đúng một cực trị, tại $x=0$.` },
        { kind: "tinh-chat", title: "Hình dạng đồ thị", text: R`Khi $a>0$, đồ thị có dạng chữ W nếu có ba cực trị và dạng chữ U nếu có một. Khi $a<0$ thì lật ngược lại, thành chữ M hoặc chữ $\cap$. Hai điểm cực trị ngoài đối xứng nhau qua trục tung.` },
        { kind: "cach-lam", title: "Giao với trục hoành", text: R`Đặt $t=x^2$ với điều kiện $t\ge 0$ để đưa $ax^4+bx^2+c=0$ về phương trình bậc hai theo $t$. Mỗi nghiệm $t>0$ cho hai giá trị $x$, nghiệm $t=0$ cho một, nghiệm $t<0$ bị loại.` },
        { kind: "luu-y", text: R`Số nghiệm của phương trình trùng phương không phải số nghiệm của phương trình theo $t$. Phải xét dấu từng nghiệm $t$ trước khi đếm nghiệm theo $x$.` },
        { kind: "vi-du", text: R`Hàm $y=x^4-2x^2-3$ có $y'=4x(x^2-1)$ nên cực trị tại $x=0$ và $x=\pm 1$. Giá trị $y(0)=-3$ là cực đại, $y(\pm 1)=-4$ là cực tiểu. Giao với trục hoành: $t^2-2t-3=0$ cho $t=3$ hoặc $t=-1$; chỉ $t=3$ nhận, nên $x=\pm\sqrt{3}$.` },
      ],
    },
    {
      title: "Hàm phân thức bậc nhất trên bậc nhất",
      items: [
        { kind: "dinh-nghia", title: "Hàm phân thức", text: R`Hàm $y=\frac{ax+b}{cx+d}$ với $c\neq 0$ và $ad-bc\neq 0$. Điều kiện $ad-bc\neq 0$ để tử và mẫu không tỉ lệ với nhau, nếu không hàm rút gọn thành hằng số.` },
        { kind: "cong-thuc", title: "Đạo hàm và chiều biến thiên", text: R`Đạo hàm là $y'=\frac{ad-bc}{(cx+d)^2}$, luôn cùng dấu với $ad-bc$. Nếu $ad-bc>0$ hàm đồng biến trên từng khoảng xác định, nếu $ad-bc<0$ hàm nghịch biến. Hàm không có cực trị.` },
        { kind: "cong-thuc", title: "Tiệm cận", text: R`Tiệm cận đứng là $x=-\frac{d}{c}$ và tiệm cận ngang là $y=\frac{a}{c}$. Giao điểm của hai tiệm cận là tâm đối xứng của đồ thị.` },
        { kind: "luu-y", text: R`Hàm đơn điệu trên từng khoảng của tập xác định, không đơn điệu trên cả $\mathbb{R}\setminus\{-\frac{d}{c}\}$. Khi viết kết luận phải ghi rõ «trên mỗi khoảng».` },
        { kind: "vi-du", text: R`Hàm $y=\frac{2x+1}{x-1}$ có $y'=\frac{2\cdot(-1)-1\cdot 1}{(x-1)^2}=\frac{-3}{(x-1)^2}<0$. Hàm nghịch biến trên $(-\infty;1)$ và trên $(1;+\infty)$, tiệm cận đứng $x=1$, tiệm cận ngang $y=2$.` },
      ],
    },
    {
      title: "Tương giao và biện luận số nghiệm",
      items: [
        { kind: "cach-lam", title: "Giao điểm của hai đồ thị", text: R`Giải phương trình hoành độ giao điểm $f(x)=g(x)$. Mỗi nghiệm là hoành độ một giao điểm, nên số nghiệm bằng số giao điểm. Đừng quên loại nghiệm không thuộc tập xác định.` },
        { kind: "cach-lam", title: "Biện luận số nghiệm theo tham số", text: R`Số nghiệm bằng số giao điểm của đồ thị $y=f(x)$ với đường ngang $y=m$. Đọc từ bảng biến thiên: cho $m$ chạy từ thấp lên cao và đếm số lần cắt.` },
        { kind: "tinh-chat", title: "Điều kiện tiếp xúc", text: R`Hai đồ thị tiếp xúc nhau tại hoành độ $x_0$ khi hệ $f(x_0)=g(x_0)$ và $f'(x_0)=g'(x_0)$ có nghiệm chung. Khi đó phương trình hoành độ có nghiệm kép tại $x_0$.` },
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
        { kind: "tinh-chat", title: "Hàm chẵn và hàm lẻ", text: R`Hàm chẵn thỏa $f(-x)=f(x)$ nên đồ thị đối xứng qua trục tung. Hàm lẻ thỏa $f(-x)=-f(x)$ nên đồ thị đối xứng qua gốc tọa độ. Nhận ra tính chẵn lẻ giúp vẽ nửa đồ thị rồi lấy đối xứng.` },
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
