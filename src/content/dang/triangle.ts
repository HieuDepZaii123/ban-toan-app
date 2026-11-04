import type { TopicDang } from "./types.ts";

const R = String.raw;

export const triangleDang: TopicDang = {
  id: "triangle",
  title: "Hình phẳng và khối",
  dang: [
    {
      name: "Định lí côsin",
      nhanDang: "Biết hai cạnh và góc xen giữa, hỏi cạnh còn lại, hoặc biết ba cạnh và hỏi côsin một góc.",
      phuongPhap: R`Trong tam giác, $c^2=a^2+b^2-2ab\cos C$, với $C$ là góc xen giữa hai cạnh $a$ và $b$. Công thức này là điều kiện cần và đủ để cạnh $c$ và góc $C$ khớp nhau khi $a,b>0$ và $C$ là góc trong. Nếu $C=90^\circ$ thì $\cos C=0$ và hệ thức trở thành định lí Pythagore. Góc không kẹp giữa hai cạnh đã chọn thì không được thay vào công thức.`,
      viDu: {
        prompt: R`Tam giác có hai cạnh $2$ và $3$, góc xen giữa bằng $60^\circ$. Tính cạnh thứ ba.`,
        steps: [
          { claim: R`Côsin của $60^\circ$ bằng $\frac{1}{2}$.`, why: "Giá trị này đúng cho góc bằng radian $\\frac{\\pi}{3}$. Góc này là góc xen giữa hai cạnh đã cho." },
          { claim: R`Bình phương cạnh thứ ba bằng $4+9-2\cdot 2\cdot 3\cdot\frac{1}{2}=7$.`, why: "Định lí côsin. Số hạng $2ab\\cos C$ phải giữ dấu trừ đúng như công thức." },
          { claim: R`Cạnh thứ ba bằng $\sqrt{7}$, vì độ dài lấy căn không âm.`, why: "Nghiệm âm của phương trình $t^2=7$ không phải độ dài. Đáp số là độ dài cạnh." },
        ],
        ket: R`Cạnh thứ ba bằng $\sqrt{7}$.`,
        checks: [{ expr: "2**2+3**2-2*2*3*cos(pi/3)", expect: "7" }],
      },
      loi: "Thay một góc không kẹp giữa hai cạnh đã chọn vào định lí côsin.",
      luyen: {
        kind: "luyen",
        prompt: R`Hai cạnh $5$ và $5$ kẹp góc $60^\circ$. Tính cạnh còn lại.`,
        think: "Dùng định lí côsin với $\\cos 60^\\circ=\\frac{1}{2}$. Hai cạnh bằng nhau và góc kẹp $60^\\circ$ gợi ý tam giác đều.",
        answer: R`Cạnh còn lại bằng $5$.`,
        steps: [
          { claim: R`Bình phương cạnh còn lại bằng $25+25-2\cdot 5\cdot 5\cdot\frac{1}{2}=25$.`, why: "Định lí côsin với đúng góc xen giữa. Tích $2ab\\cos C$ bằng $25$." },
          { claim: R`Cạnh còn lại bằng $5$.`, why: "Căn không âm của $25$ là $5$. Ba cạnh bằng nhau, khớp với góc kẹp $60^\\circ$." },
        ],
        checks: [{ expr: "5**2+5**2-2*5*5*cos(pi/3)", expect: "25" }],
      },
    },
    {
      name: "Định lí sin",
      nhanDang: "Biết một cặp cạnh và góc đối diện, hoặc hỏi đường kính đường tròn ngoại tiếp.",
      phuongPhap: R`Định lí sin viết $\frac{a}{\sin A}=\frac{b}{\sin B}=\frac{c}{\sin C}=2R$, với $R$ là bán kính đường tròn ngoại tiếp. Tỉ số này là điều kiện cần và đủ để cạnh và góc đối diện cùng thuộc một tam giác có đường tròn ngoại tiếp ấy. Sin của góc trong thì dương. Đổi từ góc này sang cạnh đối diện phải dùng đúng sin của góc đối diện cạnh đó.`,
      viDu: {
        prompt: R`Tam giác có góc $A=30^\circ$, góc $B=45^\circ$ và cạnh $a=\sqrt{2}$. Tính cạnh $b$.`,
        steps: [
          { claim: R`Định lí sin cho $\frac{b}{\sin 45^\circ}=\frac{\sqrt{2}}{\sin 30^\circ}$.`, why: "Mỗi cạnh đứng với sin của góc đối diện. Cạnh $a$ đối diện góc $A$, cạnh $b$ đối diện góc $B$." },
          { claim: R`Vì $\sin 30^\circ=\frac{1}{2}$ và $\sin 45^\circ=\frac{\sqrt{2}}{2}$, ta có $b=2$.`, why: "Nhân cả hai vế với sin của góc $B$. Phép tính này ra một độ dài dương, đúng với cạnh." },
        ],
        ket: R`Cạnh $b$ bằng $2$.`,
        checks: [{ expr: "sqrt(2)*(sin(pi/4)/sin(pi/6))", expect: "2" }],
      },
      loi: "Lấy cạnh chia cho sin của một góc kề chứ không phải góc đối diện.",
      luyen: {
        kind: "luyen",
        prompt: R`Cạnh đối diện góc $30^\circ$ bằng $6$. Đường kính đường tròn ngoại tiếp bằng bao nhiêu?`,
        think: "Tỉ số cạnh trên sin góc đối diện bằng $2R$. Sin của $30^\\circ$ bằng $\\frac{1}{2}$.",
        answer: R`Đường kính bằng $12$.`,
        steps: [
          { claim: R`Ta có $\frac{6}{\sin 30^\circ}=2R$.`, why: "Định lí sin. Vế này vừa cho cạnh, vừa cho bán kính đường tròn ngoại tiếp." },
          { claim: R`Vì $\sin 30^\circ=\frac{1}{2}$, ta có $2R=12$.`, why: "Chia cho $\\frac{1}{2}$ là nhân $2$. Đường kính chính là $2R$, không cần chia đôi thêm lần nữa." },
        ],
        checks: [{ expr: "6/sin(pi/6)", expect: "12" }],
      },
    },
    {
      name: "Diện tích tam giác",
      nhanDang: "Biết đáy và đường cao tương ứng, hoặc biết hai cạnh và góc xen giữa, hỏi diện tích.",
      phuongPhap: R`Nếu $h$ là đường cao ứng với cạnh $a$ thì diện tích bằng $\frac{1}{2}ah$. Nếu biết hai cạnh $a,b$ và góc xen giữa $C$ thì diện tích bằng $\frac{1}{2}ab\sin C$. Hai công thức cùng cho một diện tích khi các dữ kiện mô tả đúng một tam giác. Sin trong công thức thứ hai phải là sin của góc kẹp, không phải góc đối diện một cạnh khác.`,
      viDu: {
        prompt: R`Hai cạnh $6$ và $4$ kẹp góc $30^\circ$. Tính diện tích tam giác.`,
        steps: [
          { claim: R`Diện tích bằng $\frac{1}{2}\cdot 6\cdot 4\cdot\sin 30^\circ$.`, why: "Công thức hai cạnh và sin của góc xen giữa. Góc $30^\\circ$ đúng là góc kẹp trong đề." },
          { claim: R`Vì $\sin 30^\circ=\frac{1}{2}$, diện tích bằng $6$.`, why: "Thay giá trị sin rồi nhân. Kết quả là diện tích, đơn vị sẽ theo đơn vị cạnh của đề." },
        ],
        ket: R`Diện tích bằng $6$.`,
        checks: [{ expr: "Rational(1,2)*6*4*sin(pi/6)", expect: "6" }],
      },
      loi: "Dùng $\\frac{1}{2}ab$ khi góc xen giữa không vuông.",
      luyen: {
        kind: "luyen",
        prompt: R`Tam giác có đáy $6$ và đường cao tương ứng $4$. Diện tích bằng bao nhiêu?`,
        think: "Đường cao này phải ứng với đúng cạnh đáy đã chọn. Diện tích là một nửa tích hai số đó.",
        answer: R`Diện tích bằng $12$.`,
        steps: [
          { claim: R`Diện tích bằng $\frac{1}{2}\cdot 6\cdot 4$.`, why: "Công thức đáy và đường cao tương ứng. Đường cao phải vuông góc với đường chứa đáy." },
          { claim: R`Tích bằng $12$.`, why: "Nhân các số đã cho. Không dùng sin vì đề đã cho đường cao chứ chưa cho góc." },
        ],
        checks: [{ expr: "Rational(1,2)*6*4", expect: "12" }],
      },
    },
    {
      name: "Giải tam giác",
      nhanDang: "Cho đủ bộ dữ kiện xác định tam giác, tìm cạnh hoặc góc còn lại và diện tích.",
      phuongPhap: R`Hai cạnh và góc xen giữa xác định đúng một tam giác. Cạnh thứ ba tìm bằng định lí côsin, diện tích tìm bằng $\frac{1}{2}ab\sin C$. Nếu góc xen giữa là vuông thì côsin bằng $0$ và cạnh thứ ba là cạnh huyền. Sau khi ra số, kiểm tra độ dài dương và tổng ba góc bằng $180^\circ$ khi đề hỏi góc.`,
      viDu: {
        prompt: R`Giải tam giác biết hai cạnh $5$, $5$ và góc xen giữa $60^\circ$: tìm cạnh thứ ba và diện tích.`,
        steps: [
          { claim: R`Bình phương cạnh thứ ba bằng $25+25-25=25$, nên cạnh đó bằng $5$.`, why: "Định lí côsin với $\\cos 60^\\circ=\\frac{1}{2}$. Ba cạnh bằng nhau." },
          { claim: R`Diện tích bằng $\frac{1}{2}\cdot 5\cdot 5\cdot\sin 60^\circ=\frac{25\sqrt{3}}{4}$.`, why: "Sin của góc xen giữa bằng $\\frac{\\sqrt{3}}{2}$. Diện tích dương, phù hợp một tam giác thật." },
        ],
        ket: R`Cạnh thứ ba bằng $5$ và diện tích bằng $\frac{25\sqrt{3}}{4}$.`,
        checks: [
          { expr: "5**2+5**2-2*5*5*cos(pi/3)", expect: "25" },
          { expr: "Rational(1,2)*5*5*sin(pi/3)", expect: "Rational(25,4)*sqrt(3)" },
        ],
      },
      loi: "Tính cạnh thứ ba bằng định lí côsin nhưng lấy sin của góc đó để tính diện tích ở một góc khác.",
      luyen: {
        kind: "luyen",
        prompt: R`Hai cạnh góc vuông bằng $3$ và $4$. Tính cạnh huyền và diện tích.`,
        think: "Góc xen giữa là $90^\\circ$, côsin bằng $0$. Diện tích là một nửa tích hai cạnh góc vuông.",
        answer: R`Cạnh huyền bằng $5$ và diện tích bằng $6$.`,
        steps: [
          { claim: R`Bình phương cạnh huyền bằng $9+16-0=25$, nên cạnh huyền bằng $5$.`, why: "Định lí côsin với côsin của góc vuông bằng $0$. Đây chính là định lí Pythagore." },
          { claim: R`Diện tích bằng $\frac{1}{2}\cdot 3\cdot 4=6$.`, why: "Sin của góc vuông bằng $1$. Công thức hai cạnh và góc xen giữa cho cùng kết quả với một nửa tích hai cạnh góc vuông." },
        ],
        checks: [
          { expr: "3**2+4**2-2*3*4*cos(pi/2)", expect: "25" },
          { expr: "Rational(1,2)*3*4", expect: "6" },
        ],
      },
    },
    {
      name: "Thể tích chóp và lăng trụ",
      nhanDang: "Biết diện tích đáy và chiều cao vuông góc với đáy, hỏi thể tích chóp hoặc lăng trụ.",
      phuongPhap: R`Thể tích lăng trụ bằng $Sh$ và thể tích chóp bằng $\frac{1}{3}Sh$. Chiều cao phải là đoạn vuông góc với mặt đáy. Hệ số $\frac{1}{3}$ phân biệt chóp với lăng trụ cùng đáy cùng chiều cao. Diện tích đáy phải tính đúng hình của đáy trước khi nhân chiều cao.`,
      viDu: {
        prompt: R`Chóp có đáy hình vuông cạnh $2$ và chiều cao $3$ vuông góc với đáy. Tính thể tích.`,
        steps: [
          { claim: R`Diện tích đáy bằng $2\cdot 2=4$.`, why: "Đáy là hình vuông cạnh $2$. Diện tích này là $S$ trong công thức thể tích." },
          { claim: R`Thể tích chóp bằng $\frac{1}{3}\cdot 4\cdot 3=4$.`, why: "Công thức chóp. Chiều cao đề cho đã vuông góc với đáy, nên được dùng làm $h$." },
        ],
        ket: R`Thể tích bằng $4$.`,
        checks: [{ expr: "Rational(1,3)*4*3", expect: "4" }],
      },
      loi: "Tính thể tích chóp bằng diện tích đáy nhân chiều cao, tức dùng công thức lăng trụ.",
      luyen: {
        kind: "luyen",
        prompt: R`Lăng trụ đứng có đáy là tam giác đều cạnh $2$ và chiều cao $3$. Tính thể tích.`,
        think: "Diện tích tam giác đều cạnh $a$ là $\\frac{a^2\\sqrt{3}}{4}$. Lăng trụ nhân tiếp chiều cao, không chia $3$.",
        answer: R`Thể tích bằng $3\sqrt{3}$.`,
        steps: [
          { claim: R`Diện tích đáy bằng $\frac{4\sqrt{3}}{4}=\sqrt{3}$.`, why: "Công thức tam giác đều với bình phương cạnh bằng $4$. Đây là diện tích đáy của lăng trụ." },
          { claim: R`Thể tích bằng $\sqrt{3}\cdot 3=3\sqrt{3}$.`, why: "Lăng trụ có thể tích bằng đáy nhân chiều cao. Không dùng hệ số của hình chóp." },
        ],
        checks: [{ expr: "((2**2)*sqrt(3)/4)*3", expect: "3*sqrt(3)" }],
      },
    },
    {
      name: "Khối tròn xoay và đường chéo hình hộp",
      nhanDang: "Tính thể tích nón, trụ, cầu, hoặc đường chéo của hình hộp chữ nhật.",
      phuongPhap: R`Nón có thể tích $\frac{1}{3}\pi r^2 h$, trụ có $\pi r^2 h$, cầu có $\frac{4}{3}\pi r^3$. Bán kính là nửa đường kính. Đường chéo hình hộp chữ nhật cạnh $a,b,c$ bằng $\sqrt{a^2+b^2+c^2}$. Với lập phương cạnh $a$, đường chéo đó bằng $a\sqrt{3}$. Dùng đường kính thay bán kính trong $r^2$ làm thể tích lớn gấp bốn lần.`,
      viDu: {
        prompt: R`Hình nón có bán kính đáy $3$ và chiều cao $6$. Thể tích bằng bao nhiêu?`,
        steps: [
          { claim: R`Ta có $r^2 h=9\cdot 6=54$.`, why: "Thay đúng bán kính $3$, không thay đường kính. Bình phương bán kính bằng $9$." },
          { claim: R`Thể tích bằng $\frac{1}{3}\pi\cdot 54=18\pi$.`, why: "Công thức hình nón. Hệ số $\\frac{1}{3}$ phân biệt nón với trụ cùng đáy cùng chiều cao." },
        ],
        ket: R`Thể tích bằng $18\pi$.`,
        checks: [{ expr: "Rational(1,3)*pi*9*6", expect: "18*pi" }],
      },
      loi: "Quên hệ số $\\frac{1}{3}$ của hình nón, hoặc thay đường kính vào chỗ bán kính.",
      luyen: {
        kind: "luyen",
        prompt: R`Lập phương cạnh $a$ có đường chéo không gian dài bao nhiêu?`,
        think: "Đường chéo một mặt là $a\\sqrt{2}$. Đường chéo không gian là cạnh huyền của tam giác vuông thứ hai, với cạnh còn lại bằng $a$.",
        answer: R`Đường chéo bằng $a\sqrt{3}$.`,
        steps: [
          { claim: R`Đường chéo một mặt bằng $a\sqrt{2}$.`, why: "Định lí Pythagore trên mặt hình vuông. Hai cạnh của mặt đều bằng $a$." },
          { claim: R`Đường chéo không gian bằng $\sqrt{2a^2+a^2}=a\sqrt{3}$.`, why: "Tam giác vuông thứ hai có các cạnh góc vuông $a\\sqrt{2}$ và $a$. Tổng các bình phương bằng $3a^2$." },
        ],
        checks: [{ expr: "sqrt(2+1)", expect: "sqrt(3)" }],
      },
    },
  ],
  sangTao: [
    {
      kind: "thuc-te",
      sao: 4,
      prompt: R`Số liệu giả định. Một khu đất hình tam giác có hai cạnh $40$ mét và $30$ mét, góc xen giữa bằng $60^\circ$. Tính cạnh còn lại và diện tích khu đất.`,
      think: "Cạnh còn lại dùng định lí côsin với $\\cos 60^\\circ=\\frac{1}{2}$. Diện tích dùng $\\frac{1}{2}ab\\sin C$ với cùng góc xen giữa. Diễn giải cả độ dài và diện tích.",
      answer: R`Cạnh còn lại dài $10\sqrt{13}$ mét. Diện tích khu đất bằng $300\sqrt{3}$ mét vuông.`,
      steps: [
        { claim: R`Bình phương cạnh còn lại bằng $1600+900-1200=1300$, nên cạnh bằng $10\sqrt{13}$ mét.`, why: "Định lí côsin. Tích $2\\cdot 40\\cdot 30\\cdot\\frac{1}{2}$ bằng $1200$. Độ dài lấy căn không âm và đơn vị là mét." },
        { claim: R`Diện tích bằng $\frac{1}{2}\cdot 40\cdot 30\cdot\sin 60^\circ=300\sqrt{3}$ mét vuông.`, why: "Sin của đúng góc xen giữa bằng $\\frac{\\sqrt{3}}{2}$. Diễn giải: khu đất rộng $300\\sqrt{3}$ mét vuông, không phải chỉ có số đo cạnh." },
      ],
      checks: [
        { expr: "40**2+30**2-2*40*30*cos(pi/3)", expect: "1300" },
        { expr: "sqrt(1300)", expect: "10*sqrt(13)" },
        { expr: "Rational(1,2)*40*30*sin(pi/3)", expect: "300*sqrt(3)" },
      ],
    },
    {
      kind: "thuc-te",
      sao: 3,
      prompt: R`Số liệu giả định. Cần một kho chứa ít nhất $10$ mét khối. Chóp đáy vuông cạnh $2$ mét, cao $3$ mét, và lăng trụ cùng đáy cùng chiều cao đều có chiều cao vuông góc với đáy. Chọn khối nào thì đủ chỗ?`,
      think: "Tính thể tích từng khối. Chóp lấy một phần ba tích đáy với chiều cao, lăng trụ lấy đủ tích đó. So từng số với $10$ mét khối rồi mới chọn.",
      answer: "Chọn lăng trụ, vì thể tích $12$ mét khối vượt nhu cầu $10$ mét khối. Chóp chỉ có $4$ mét khối, không đủ chỗ.",
      steps: [
        { claim: R`Thể tích chóp bằng $\frac{1}{3}\cdot 4\cdot 3=4$ mét khối.`, why: "Đáy vuông có diện tích $4$ mét vuông và chiều cao đã vuông góc với đáy. Hệ số $\\frac{1}{3}$ là của hình chóp." },
        { claim: R`Lăng trụ cùng kích thước có thể tích $4\cdot 3=12$ mét khối.`, why: "Lăng trụ dùng $Sh$. So với nhu cầu: $4<10$ nên chóp bị loại, $12>10$ nên quyết định chọn lăng trụ." },
      ],
      checks: [
        { expr: "Rational(1,3)*4*3", expect: "4" },
        { expr: "4*3", expect: "12" },
        { expr: "12-10", expect: "2" },
      ],
    },
    {
      kind: "thuc-te",
      sao: 3,
      prompt: R`Số liệu giả định. Bể trụ bán kính $2$ mét đang có mực nước $1$ mét. Một mẻ cần $12\pi$ mét khối nước. Mực hiện tại có đủ không? Nếu chưa đủ, phải nâng mực thêm bao nhiêu mét?`,
      think: "Thể tích hiện tại là $\\pi r^2 h$ với $h=1$. So với $12\\pi$. Nếu thiếu, giải $\\pi\\cdot 4\\cdot h=12\\pi$ để tìm mực cần, rồi trừ mực đang có.",
      answer: "Mực $1$ mét chỉ có $4\\pi$ mét khối, chưa đủ $12\\pi$ mét khối. Phải nâng mực thêm $2$ mét, lên mực $3$ mét.",
      steps: [
        { claim: R`Thể tích hiện tại bằng $\pi\cdot 4\cdot 1=4\pi$ mét khối, nhỏ hơn $12\pi$.`, why: "Công thức hình trụ với đúng bán kính. So hai thể tích: $4\\pi<12\\pi$, nên quyết định là chưa bơm đủ cho mẻ." },
        { claim: R`Mực cần thỏa $4h=12$, tức $h=3$ mét, nên phải nâng thêm $3-1=2$ mét.`, why: "Bán kính không đổi, thể tích tỉ lệ với chiều cao. Diễn giải: bơm thêm đúng $2$ mét nước thì bể mới đủ $12\\pi$ mét khối." },
      ],
      checks: [
        { expr: "pi*4*1", expect: "4*pi" },
        { expr: "12*pi/(pi*4)", expect: "3" },
        { expr: "3-1", expect: "2" },
      ],
    },
    {
      kind: "thuc-te",
      sao: 3,
      prompt: R`Số liệu giả định. Cần $30\pi$ mét khối vật liệu đúc. Một quả cầu bán kính $3$ mét có đủ không, và còn dư bao nhiêu? Cùng lúc, một tấm bìa $8$ dm trên $3$ dm cần cho một miếng tam giác ít nhất $10$ đêximét vuông. Cắt theo đường chéo thì miếng đó có đủ không, và nhát cắt dài bao nhiêu?`,
      think: "Thể tích cầu là $\\frac{4}{3}\\pi r^3$. So với $30\\pi$ rồi lấy hiệu. Diện tích một tam giác từ đường chéo là nửa hình chữ nhật. So với $10$, rồi tính độ dài đường chéo.",
      answer: "Quả cầu có $36\\pi$ mét khối, đủ nhu cầu $30\\pi$ và còn dư $6\\pi$ mét khối. Tam giác cắt ra rộng $12$ đêximét vuông, đủ mức $10$, và nhát cắt dài $\\sqrt{73}$ dm.",
      steps: [
        { claim: R`Thể tích cầu bằng $\frac{4}{3}\pi\cdot 27=36\pi$ mét khối, dư $36\pi-30\pi=6\pi$.`, why: "Lập phương bán kính $3$ được $27$. Vì $36\\pi>30\\pi$, quyết định là dùng một quả cầu này và còn dư $6\\pi$ mét khối." },
        { claim: R`Một tam giác có diện tích $\frac{1}{2}\cdot 8\cdot 3=12$ đêximét vuông.`, why: "Hai tam giác từ một đường chéo có cùng đáy và cùng chiều cao. So với mức cần: $12>10$, nên miếng cắt đủ." },
        { claim: R`Đường chéo dài $\sqrt{8^2+3^2}=\sqrt{73}$ dm.`, why: "Định lí Pythagore trên tấm bìa. Diễn giải: nhát cắt dài $\\sqrt{73}$ dm và cho một tam giác đủ $12$ đêximét vuông." },
      ],
      checks: [
        { expr: "Rational(4,3)*pi*27", expect: "36*pi" },
        { expr: "36*pi-30*pi", expect: "6*pi" },
        { expr: "Rational(1,2)*8*3", expect: "12" },
        { expr: "sqrt(8**2+3**2)", expect: "sqrt(73)" },
      ],
    },
    {
      kind: "mo",
      sao: 2,
      prompt: R`Định lí côsin trở thành định lí Pythagore trong trường hợp nào? Hãy nêu điều kiện và một ví dụ số.`,
      think: "Nhìn số hạng $-2ab\\cos C$. Số hạng này bằng $0$ khi côsin bằng $0$ và hai cạnh dương.",
      answer: R`Điều kiện cần và đủ là góc xen giữa bằng $90^\circ$. Ví dụ các cạnh $3$, $4$ và $5$ thỏa $9+16=25$.`,
      steps: [
        { claim: R`Với $a,b>0$, số hạng $2ab\cos C$ bằng $0$ khi và chỉ khi $\cos C=0$.`, why: "Tích $2ab$ dương. Trong một góc trong của tam giác, côsin bằng $0$ đúng tại góc vuông." },
        { claim: R`Khi đó $c^2=a^2+b^2$. Bộ $3,4,5$ cho $25=9+16$.`, why: "Đây là trường hợp đặc biệt của định lí côsin. Ví dụ số xác nhận đẳng thức Pythagore." },
      ],
      checks: [{ expr: "3**2+4**2-5**2", expect: "0" }],
    },
    {
      kind: "phan-bien",
      sao: 3,
      prompt: R`Hai cạnh $6$ và $4$ kẹp góc $30^\circ$. Bạn A coi góc kẹp ấy là vuông và tính diện tích bằng $\frac{1}{2}\cdot 6\cdot 4=12$. Hãy phản biện.`,
      think: "Công thức $\\frac{1}{2}ab\\sin C$ lấy $C$ là góc xen giữa đúng hai cạnh đã cho. Ở đây $C=30^\\circ$, nên dùng $\\sin 30^\\circ$.",
      answer: R`Diện tích đúng bằng $6$. Góc kẹp là $30^\circ$, và $\sin 30^\circ=\frac{1}{2}$.`,
      steps: [
        { claim: R`Góc đưa vào công thức là góc kẹp $30^\circ$, với $\sin 30^\circ=\frac{1}{2}$.`, why: "Hai cạnh $6$ và $4$ xác định đúng một góc xen giữa, và đề cho góc đó bằng $30^\\circ$. Coi góc này là vuông thì đổi dữ kiện của tam giác." },
        { claim: R`Diện tích bằng $\frac{1}{2}\cdot 6\cdot 4\cdot\frac{1}{2}=6$.`, why: "Thay sin của góc kẹp đã cho. Kết quả $12$ chỉ đúng khi góc kẹp là vuông, còn tam giác này có góc kẹp $30^\\circ$." },
      ],
      checks: [{ expr: "Rational(1,2)*6*4*sin(pi/6)", expect: "6" }],
    },
    {
      kind: "doc",
      sao: 2,
      prompt: R`Bảng một tam giác ghi cạnh $a=3$, cạnh $b=4$ và góc xen giữa $C=90^\circ$. Hãy đọc bảng rồi tính cạnh $c$.`,
      think: "Góc xen giữa vuông nên côsin bằng $0$. Cạnh còn lại là căn của tổng hai bình phương.",
      answer: R`Cạnh $c$ bằng $5$.`,
      steps: [
        { claim: R`Bảng cho hai cạnh $3$, $4$ và góc kẹp vuông.`, why: "Đọc đúng cột góc xen giữa. Nếu lấy nhầm một góc khác thì định lí côsin không còn dùng bộ số này." },
        { claim: R`Ta có $c^2=9+16=25$, nên $c=5$.`, why: "Côsin của $90^\\circ$ bằng $0$. Căn không âm của $25$ là độ dài cạnh còn lại." },
      ],
      checks: [{ expr: "sqrt(3**2+4**2)", expect: "5" }],
    },
    {
      kind: "uoc-luong",
      sao: 3,
      prompt: R`Cạnh $10\sqrt{13}$ mét ở bài khu đất có bình phương bằng $1300$. Hãy chặn độ dài này giữa hai số nguyên liên tiếp, đơn vị mét.`,
      think: "So $1300$ với $36^2$ và $37^2$. Hàm căn tăng trên các số không âm.",
      answer: "Vì $1296<1300<1369$ nên cạnh nằm giữa $36$ mét và $37$ mét.",
      steps: [
        { claim: R`Ta có $36^2=1296$ và $37^2=1369$.`, why: "Hai bình phương nguyên liên tiếp. Hiệu $1300-1296$ bằng $4$, nên $1300$ nằm sát phía trên $36^2$." },
        { claim: R`Do đó $36<10\sqrt{13}<37$.`, why: "Căn bậc hai tăng trên $[0;+\\infty)$. Diễn giải: cạnh khu đất dài hơn $36$ mét và ngắn hơn $37$ mét." },
      ],
      checks: [
        { expr: "36**2", expect: "1296" },
        { expr: "37**2", expect: "1369" },
        { expr: "1300-1296", expect: "4" },
      ],
    },
    {
      kind: "tu-ra-de",
      sao: 4,
      prompt: R`Bài xuất phát: hai cạnh $2$ và $3$ kẹp góc $60^\circ$ cho cạnh thứ ba $\sqrt{7}$. Hãy đổi giả thiết bằng cách đổi góc xen giữa thành $90^\circ$, dự đoán bình phương cạnh còn lại, rồi tính.`,
      think: "Khi góc thành vuông, số hạng côsin biến mất. Dự đoán bình phương bằng $4+9$, rồi lấy căn không âm.",
      answer: R`Dự đoán bình phương tăng thành $13$ vì mất số hạng trừ $6$. Cạnh còn lại bằng $\sqrt{13}$.`,
      steps: [
        { claim: R`Đổi góc sang $90^\circ$ làm $\cos C=0$, nên $c^2=4+9=13$.`, why: "Định lí côsin còn lại mỗi tổng bình phương. Dự đoán $13$ lớn hơn $7$ vì số hạng $2ab\\cos C$ của bài cũ bằng $6$ và đang bị bỏ." },
        { claim: R`Cạnh còn lại bằng $\sqrt{13}$.`, why: "Độ dài lấy căn không âm. Đây là cạnh huyền của tam giác vuông có hai cạnh góc vuông $2$ và $3$." },
      ],
      checks: [{ expr: "2**2+3**2-2*2*3*cos(pi/2)", expect: "13" }],
    },
  ],
};
