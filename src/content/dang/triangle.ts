import type { TopicDang } from "./types.ts";

const R = String.raw;

export const triangleDang: TopicDang = {
  id: "triangle",
  title: "Hình phẳng và khối",
  dang: [
    {
      name: "Diện tích tam giác và thể tích chóp",
      nhanDang: "Biết đáy và chiều cao tương ứng, hỏi diện tích hoặc thể tích.",
      phuongPhap: R`Diện tích tam giác bằng $\frac{1}{2}ah$ khi $h$ là đường cao ứng với cạnh $a$. Thể tích chóp bằng $\frac{1}{3}Sh$, lăng trụ bằng $Sh$. Đổi $\frac{1}{2}$ thành $\frac{1}{3}$ là đổi loại khối, không phải làm tròn. Chiều cao phải vuông góc với mặt đáy.`,
      viDu: {
        prompt: R`Chóp tứ giác đều có cạnh đáy $2$ và chiều cao $3$. Tính thể tích.`,
        steps: [
          { claim: R`Diện tích đáy vuông bằng $2\cdot 2=4$.`, why: "Đáy là hình vuông cạnh $2$." },
          { claim: R`Thể tích bằng $\frac{1}{3}\cdot 4\cdot 3=4$.`, why: "Công thức chóp. Chiều cao đề cho đã vuông góc với đáy." },
        ],
        ket: "Thể tích bằng $4$.",
        check: { expr: "Rational(1,3)*4*3", expect: "4" },
      },
      loi: "Tính thể tích chóp bằng diện tích đáy nhân chiều cao, tức dùng công thức lăng trụ.",
      luyen: {
        kind: "luyen",
        prompt: R`Tam giác có đáy $6$ và đường cao tương ứng $4$. Diện tích bằng bao nhiêu?`,
        think: "Một nửa tích đáy và đường cao đúng ứng với đáy đó.",
        answer: "Đáp số là $12$",
        steps: [
          { claim: R`Diện tích bằng $\frac{1}{2}\cdot 6\cdot 4$.`, why: R`Công thức $\frac{1}{2}ah$.` },
          { claim: R`Tích bằng $12$.`, why: "Nhân các số đã cho." },
        ],
        check: { expr: "Rational(1,2)*6*4", expect: "12" },
      },
    },
    {
      name: "Khối tròn xoay và đường chéo",
      nhanDang: "Trụ, nón, cầu, hoặc đường chéo của hình hộp.",
      phuongPhap: R`Nón có $V=\frac{1}{3}\pi r^2 h$. Trụ có $V=\pi r^2 h$. Cầu có $V=\frac{4}{3}\pi r^3$. Bán kính là nửa đường kính. Đường chéo hình hộp chữ nhật cạnh $a,b,c$ bằng $\sqrt{a^2+b^2+c^2}$. Dùng đường kính thay bán kính trong $r^2$ làm thể tích lớn gấp bốn lần.`,
      viDu: {
        prompt: R`Hình nón có bán kính đáy $3$ và chiều cao $6$. Thể tích bằng bao nhiêu?`,
        steps: [
          { claim: R`Ta có $r^2 h=9\cdot 6=54$.`, why: "Thay đúng bán kính, không thay đường kính $6$." },
          { claim: R`Thể tích bằng $\frac{1}{3}\pi\cdot 54=18\pi$.`, why: R`Công thức nón. Hệ số $\frac{1}{3}$ phân biệt nón với trụ.` },
        ],
        ket: R`Thể tích bằng $18\pi$, không phải $54\pi$.`,
        check: { expr: "Rational(1,3)*pi*9*6", expect: "18*pi" },
      },
      loi: R`Quên hệ số $\frac{1}{3}$ của hình nón.`,
      luyen: {
        kind: "luyen",
        prompt: R`Lập phương cạnh $a$ có đường chéo không gian dài bao nhiêu?`,
        think: "Đường chéo không gian là căn của tổng bình phương ba cạnh.",
        answer: R`Đáp số là $a\sqrt{3}$`,
        steps: [
          { claim: R`Đường chéo mặt đáy bằng $a\sqrt{2}$.`, why: "Pythagore trên mặt." },
          { claim: R`Đường chéo không gian bằng $\sqrt{2a^2+a^2}=a\sqrt{3}$.`, why: R`Tam giác vuông thứ hai có cạnh góc vuông $a\sqrt{2}$ và $a$.` },
        ],
        check: { expr: "sqrt(2+1)", expect: "sqrt(3)" },
      },
    },
  ],
  sangTao: [
    {
      kind: "thuc-te",
      prompt: R`Một lăng trụ đứng có đáy là tam giác đều cạnh $2$, chiều cao $3$. Thể tích bằng bao nhiêu?`,
      think: R`Diện tích tam giác đều cạnh $a$ là $\frac{a^2\sqrt{3}}{4}$. Lăng trụ thì nhân tiếp chiều cao, không chia $3$.`,
      answer: R`Đáp số là $3\sqrt{3}$`,
      steps: [
        { claim: R`Diện tích đáy bằng $\frac{4\sqrt{3}}{4}=\sqrt{3}$.`, why: "Công thức tam giác đều với $a^2=4$." },
        { claim: R`Thể tích bằng $\sqrt{3}\cdot 3=3\sqrt{3}$.`, why: "Lăng trụ: $V=Sh$." },
      ],
      check: { expr: "sqrt(3)*3", expect: "3*sqrt(3)" },
    },
    {
      kind: "thuc-te",
      prompt: R`Một bể trụ bán kính $2$ mét, mực nước cao $1$ mét. Thể tích nước bằng bao nhiêu mét khối?`,
      think: "Nước chiếm một hình trụ nhỏ hơn, cùng bán kính, chiều cao bằng mực nước.",
      answer: R`Đáp số là $4\pi$ mét khối`,
      steps: [
        { claim: R`Ta có $V=\pi r^2 h=\pi\cdot 4\cdot 1$.`, why: "Công thức trụ." },
        { claim: R`Kết quả bằng $4\pi$.`, why: "Nhân các hệ số." },
      ],
      check: { expr: "pi*4*1", expect: "4*pi" },
    },
    {
      kind: "thuc-te",
      prompt: R`Một quả bóng bán kính $3$ có thể tích $\frac{4}{3}\pi r^3$. Thể tích bằng bao nhiêu?`,
      think: R`Thay $r=3$ vào $r^3$ trước, rồi nhân $\frac{4}{3}\pi$.`,
      answer: R`Đáp số là $36\pi$`,
      steps: [
        { claim: R`Ta có $r^3=27$.`, why: "Vì $3^3=27$." },
        { claim: R`Ta có $\frac{4}{3}\pi\cdot 27=36\pi$.`, why: R`Vì $\frac{4}{3}\cdot 27=36$.` },
      ],
      check: { expr: "Rational(4,3)*pi*27", expect: "36*pi" },
    },
    {
      kind: "thuc-te",
      prompt: R`Một tấm bìa hình chữ nhật $8$ dm trên $3$ dm. Cắt theo đường chéo được hai tam giác. Diện tích một tam giác bằng bao nhiêu?`,
      think: "Đường chéo chia chữ nhật thành hai tam giác cùng diện tích, mỗi tam giác bằng nửa hình chữ nhật.",
      answer: "Đáp số là $12$ đêximét vuông",
      steps: [
        { claim: R`Diện tích chữ nhật bằng $24$.`, why: R`Vì $8\cdot 3=24$.` },
        { claim: R`Một tam giác bằng $\frac{1}{2}\cdot 24=12$.`, why: "Hai tam giác từ đường chéo có cùng đáy và cùng chiều cao, nên cùng diện tích và cộng lại bằng hình chữ nhật." },
      ],
      check: { expr: "Rational(1,2)*8*3", expect: "12" },
    },
    {
      kind: "tu-ra-de",
      prompt: "Hãy tự đặt một bài thể tích nón, ghi rõ bán kính chứ không ghi lẫn đường kính. Đề mẫu: bán kính $2$, chiều cao $3$.",
      think: R`Viết công thức có hệ số $\frac{1}{3}$ trước khi thay số. Đối chiếu với trụ cùng đáy cùng chiều cao: nón bằng một phần ba trụ.`,
      answer: R`Thể tích mẫu bằng $4\pi$.`,
      steps: [
        { claim: R`Trụ cùng kích thước có thể tích $\pi\cdot 4\cdot 3=12\pi$.`, why: "Dùng để đối chiếu hệ số." },
        { claim: R`Nón bằng $\frac{1}{3}$ trụ, tức $4\pi$.`, why: "Công thức nón." },
      ],
      check: { expr: "Rational(1,3)*pi*4*3", expect: "4*pi" },
    },
  ],
};
