/** Lớp Sáng tạo, thêm bên cạnh Cơ bản và Chuẩn thi đã có trên tờ. */
export const advanced: Record<string, { lines: string[]; drill: string; answer: string; steps: string[] }> = {
  quadratic: {
    lines: ["Tìm $m$ để có hai nghiệm thỏa điều kiện: cần $\\Delta>0$ rồi dùng Viète.", "GTLN–GTNN trên đoạn: so sánh hai đầu mút và đỉnh nếu đỉnh nằm trong đoạn."],
    drill: "GTNN của $y=x^2-4x+1$.",
    answer: "$-3$",
    steps: ["Đỉnh $x=2$.", "$y(2)=-3$.", "$a>0$ nên đây là giá trị nhỏ nhất."],
  },
  ineq: {
    lines: ["AM–GM chỉ chốt khi điểm rơi đạt được.", "Có thể đổi sang khảo sát một hàm một biến."],
    drill: "$x>0$. GTNN của $x+4/x$.",
    answer: "$4$",
    steps: ["$x+4/x\\ge 2\\sqrt{4}=4$.", "Dấu bằng khi $x=2$."],
  },
  exp: {
    lines: ["Lãi kép $T=A(1+r)^n$.", "Đặt $t=a^x>0$ khi phương trình đổi bậc."],
    drill: "Giải $\\log_3(x+2)=2$.",
    answer: "$x=7$",
    steps: ["Điều kiện $x>-2$.", "$x+2=9$.", "$x=7$ thỏa."],
  },
  sequence: {
    lines: ["CSN lùi vô hạn khi $|q|<1$: $S=u_1/(1-q)$.", "Ba số lập cấp số cộng khi số giữa là trung bình cộng."],
    drill: "$1+1/2+1/4+\\cdots$",
    answer: "$2$",
    steps: ["$u_1=1$, $q=1/2$.", "$S=1/(1-1/2)=2$."],
  },
  trig: {
    lines: ["$a\\sin x+b\\cos x$ có nghiệm khi $a^2+b^2\\ge c^2$.", "Giá trị lớn nhất là $\\sqrt{a^2+b^2}$."],
    drill: "GTLN của $3\\sin x+4\\cos x$.",
    answer: "$5$",
    steps: ["$\\sqrt{3^2+4^2}=5$."],
  },
  limit: {
    lines: ["Căn thức: nhân liên hợp.", "Tại vô cực: chia cho lũy thừa cao nhất."],
    drill: "$\\lim_{x\\to 0}(\\sqrt{x+4}-2)/x$.",
    answer: "$1/4$",
    steps: ["Nhân liên hợp.", "Còn $1/(\\sqrt{x+4}+2)$.", "Thế $x=0$ được $1/4$."],
  },
  derivative: {
    lines: ["Bài tối ưu: lập một hàm một biến trên miền xác định.", "Hàm hợp: đạo hàm lớp ngoài nhân đạo hàm lớp trong."],
    drill: "$f(x)=(x^2+1)^3$. Tính $f'(1)$.",
    answer: "$24$",
    steps: ["$f'=3(x^2+1)^2\\cdot 2x$.", "$f'(1)=3\\cdot 4\\cdot 2=24$."],
  },
  survey: {
    lines: ["Bậc ba có hai cực trị khi $y'=0$ có hai nghiệm phân biệt.", "Tiệm cận của phân thức bậc nhất: đứng và ngang."],
    drill: "GTLN của $y=-x^2+4x$ trên $[0;3]$.",
    answer: "$4$",
    steps: ["$y'=0$ tại $x=2$, nằm trong đoạn.", "$y(2)=4$ lớn hơn hai đầu mút."],
  },
  integral: {
    lines: ["Từng phần: $\\int u\\,dv=uv-\\int v\\,du$.", "Thể tích tròn xoay $V=\\pi\\int_a^b y^2\\,dx$."],
    drill: "Diện tích giữa $y=x$ và $y=x^2$ trên $[0;1]$.",
    answer: "$1/6$",
    steps: ["Trên đoạn, $x\\ge x^2$.", "$\\int_0^1(x-x^2)dx=1/2-1/3=1/6$."],
  },
  vector: {
    lines: ["Vuông góc khi tích vô hướng bằng 0.", "Độ dài là căn bậc hai của tổng bình phương tọa độ."],
    drill: "$A(1;0)$, $B(3;4)$. Tính $AB$.",
    answer: "$2\\sqrt{5}$",
    steps: ["$\\vec{AB}=(2;4)$.", "$AB=\\sqrt{20}=2\\sqrt{5}$."],
  },
  analytic: {
    lines: ["Khoảng cách điểm–mặt phẳng dùng pháp tuyến ở mẫu.", "Mặt cầu: hoàn thành bình phương để ra tâm và bán kính."],
    drill: "Khoảng cách từ $O$ đến $3x+4y-10=0$.",
    answer: "$2$",
    steps: ["$|-10|/\\sqrt{9+16}=10/5=2$."],
  },
  triangle: {
    lines: ["Chóp $V=\\dfrac13 Sh$, lăng trụ $V=Sh$.", "Đường chéo lập phương cạnh $a$ là $a\\sqrt{3}$."],
    drill: "Chóp tứ giác đều, cạnh đáy 2, cao 3. Tính $V$.",
    answer: "$4$",
    steps: ["Diện tích đáy $4$.", "$V=\\dfrac13\\cdot 4\\cdot 3=4$."],
  },
  combo: {
    lines: ["Có thứ tự thì chỉnh hợp, không thứ tự thì tổ hợp.", "Hệ số trong nhị thức lấy đúng số mũ cần tìm."],
    drill: "Hệ số của $x^2$ trong $(1+2x)^5$.",
    answer: "$40$",
    steps: ["Chọn $k=2$.", "$C_5^2\\cdot 2^2=40$."],
  },
  probability: {
    lines: ["Xác suất có điều kiện đổi mẫu số.", "Câu «ít nhất» thường đi đường biến cố đối."],
    drill: "Tung 3 đồng xu. Xác suất có ít nhất một mặt ngửa.",
    answer: "$7/8$",
    steps: ["Cả ba sấp có xác suất $1/8$.", "$1-1/8=7/8$."],
  },
};
