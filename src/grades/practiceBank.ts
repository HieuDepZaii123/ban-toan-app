/** Luyện nhanh lớp 1–9. Tách khỏi bài học trong /kien-thuc và khỏi đề THPT. */

export type GradeQuestion = {
  id: string;
  grade: number;
  prompt: string;
  choices: [string, string, string, string];
  answer: 0 | 1 | 2 | 3;
  steps: [string, string, string];
  check: string;
  expect: string;
};

function q(
  id: string,
  grade: number,
  prompt: string,
  choices: [string, string, string, string],
  answer: 0 | 1 | 2 | 3,
  steps: [string, string, string],
  check: string,
  expect: string,
): GradeQuestion {
  return { id, grade, prompt, choices, answer, steps, check, expect };
}

export const gradePractice: GradeQuestion[] = [
  q("l1-cong", 1, "Tính $4+3$.", ["$7$", "$6$", "$8$", "$5$"], 0,
    ["Gộp nhóm $4$ với nhóm $3$.", "Đếm tiếp: $5, 6, 7$.", "Tổng là $7$."], "4+3", "7"),
  q("l1-tru", 1, "Tính $9-2$.", ["$7$", "$11$", "$6$", "$8$"], 0,
    ["Từ $9$ bớt đi $2$.", "Đếm lùi: $8$, rồi $7$.", "Hiệu là $7$. Lấy $7+2$ lại được $9$."], "9-2", "7"),
  q("l1-qua", 1, "Có $3$ quả cam, thêm $2$ quả. Hỏi có tất cả bao nhiêu quả?", ["$5$ quả", "$6$ quả", "$4$ quả", "$1$ quả"], 0,
    ["Thêm là phép cộng.", "$3+2=5$.", "Có $5$ quả cam."], "3+2", "5"),
  q("l1-lon", 1, "Số nào lớn hơn, $2$ hay $9$?", ["Số $9$", "Số $2$", "Hai số bằng nhau", "Số $1$"], 0,
    ["Trên dãy đếm, $9$ đứng sau $2$.", "Số đứng sau thì lớn hơn.", "Số $9$ lớn hơn số $2$."], "9", "9"),

  q("l2-cong", 2, "Tính $23+14$.", ["$37$", "$47$", "$27$", "$36$"], 0,
    ["Cộng hàng đơn vị: $3+4=7$.", "Cộng hàng chục: $2+1=3$.", "Tổng là $37$."], "23+14", "37"),
  q("l2-tru", 2, "Tính $40-16$.", ["$24$", "$36$", "$26$", "$14$"], 0,
    ["$40$ bớt $10$ còn $30$.", "Bớt thêm $6$ còn $24$.", "Hiệu là $24$."], "40-16", "24"),
  q("l2-tui", 2, "Có $3$ túi, mỗi túi $6$ viên bi. Hỏi có tất cả bao nhiêu viên?", ["$18$ viên", "$9$ viên", "$36$ viên", "$12$ viên"], 0,
    ["Mỗi túi $6$ viên, có $3$ túi.", "$6+6+6=18$.", "Cũng là $3\\times 6=18$ viên."], "3*6", "18"),
  q("l2-chu-vi", 2, "Hình chữ nhật dài $5$ cm, rộng $2$ cm. Chu vi bằng bao nhiêu?", ["$14$ cm", "$10$ cm", "$7$ cm", "$20$ cm"], 0,
    ["Chu vi là vòng quanh hình: hai cạnh dài và hai cạnh rộng.", "$5+2+5+2=14$.", "Chu vi bằng $14$ cm."], "2*(5+2)", "14"),

  q("l3-nhan", 3, "Tính $46\\times 3$.", ["$138$", "$148$", "$128$", "$136$"], 0,
    ["$40\\times 3=120$.", "$6\\times 3=18$.", "Cộng lại $120+18=138$."], "46*3", "138"),
  q("l3-chia", 3, "Tính $84\\div 4$.", ["$21$", "$20$", "$24$", "$18$"], 0,
    ["$4\\times 20=80$.", "Còn $4$, tức thêm $1$ lần.", "Thương là $21$."], "84/4", "21"),
  q("l3-chu-vi", 3, "Hình chữ nhật cạnh $5$ cm và $3$ cm. Chu vi bằng bao nhiêu?", ["$16$ cm", "$15$ cm", "$8$ cm", "$30$ cm"], 0,
    ["Chu vi $=2\\times(5+3)$.", "$5+3=8$, rồi $2\\times 8=16$.", "Chu vi bằng $16$ cm, không phải diện tích $15$ cm²."], "2*(5+3)", "16"),
  q("l3-nua", 3, "Một nửa của $8$ cái kẹo là bao nhiêu cái?", ["$4$ cái", "$8$ cái", "$2$ cái", "$16$ cái"], 0,
    ["Một nửa là chia cho $2$.", "$8\\div 2=4$.", "Một nửa là $4$ cái kẹo."], "8/2", "4"),

  q("l4-phan-so", 4, "Tính $\\dfrac{1}{2}+\\dfrac{1}{4}$.", ["$\\dfrac{3}{4}$", "$\\dfrac{2}{6}$", "$\\dfrac{1}{6}$", "$\\dfrac{2}{4}$"], 0,
    ["Quy đồng mẫu $4$: $\\dfrac{1}{2}=\\dfrac{2}{4}$.", "$\\dfrac{2}{4}+\\dfrac{1}{4}=\\dfrac{3}{4}$.", "Tổng là $\\dfrac{3}{4}$."], "Rational(1,2)+Rational(1,4)", "Rational(3,4)"),
  q("l4-dien-tich", 4, "Hình chữ nhật dài $6$ cm, rộng $4$ cm. Diện tích bằng bao nhiêu?", ["$24$ cm²", "$20$ cm²", "$10$ cm²", "$48$ cm²"], 0,
    ["Diện tích hình chữ nhật là dài nhân rộng.", "$6\\times 4=24$.", "Diện tích bằng $24$ cm². Chu vi mới là $20$ cm."], "6*4", "24"),
  q("l4-gio", 4, "$2$ giờ bằng bao nhiêu phút?", ["$120$ phút", "$60$ phút", "$100$ phút", "$200$ phút"], 0,
    ["Mỗi giờ có $60$ phút.", "$2\\times 60=120$.", "$2$ giờ bằng $120$ phút."], "2*60", "120"),
  q("l4-nhan", 4, "Tính $125\\times 8$.", ["$1000$", "$800$", "$100$", "$132$"], 0,
    ["$125\\times 8=1000$ vì $8$ phần tám của $1000$ là $125$.", "Hoặc $100\\times 8+25\\times 8=800+200$.", "Tích bằng $1000$."], "125*8", "1000"),

  q("l5-thap-phan", 5, "Tính $2{,}5\\times 4$.", ["$10$", "$8$", "$6$", "$12$"], 0,
    ["$2\\times 4=8$ và $0{,}5\\times 4=2$.", "Cộng $8+2=10$.", "Tích bằng $10$."], "Rational(5,2)*4", "10"),
  q("l5-phan", 5, "$\\dfrac{3}{4}$ của $20$ bằng bao nhiêu?", ["$15$", "$12$", "$16$", "$5$"], 0,
    ["Một phần tư của $20$ là $5$.", "Ba phần tư là $3\\times 5$.", "Kết quả bằng $15$."], "Rational(3,4)*20", "15"),
  q("l5-tam-giac", 5, "Tam giác đáy $6$ cm, cao $4$ cm. Diện tích bằng bao nhiêu?", ["$12$ cm²", "$24$ cm²", "$10$ cm²", "$8$ cm²"], 0,
    ["Diện tích tam giác bằng nửa đáy nhân cao.", "$\\dfrac{1}{2}\\times 6\\times 4=12$.", "Diện tích bằng $12$ cm². Bỏ $\\dfrac{1}{2}$ thì ra $24$ cm²."], "Rational(1,2)*6*4", "12"),
  q("l5-phan-tram", 5, "$20\\%$ của $50$ bằng bao nhiêu?", ["$10$", "$20$", "$25$", "$70$"], 0,
    ["$20\\%$ là $\\dfrac{20}{100}=\\dfrac{1}{5}$.", "$\\dfrac{1}{5}$ của $50$ là $10$.", "Kết quả bằng $10$."], "Rational(20,100)*50", "10"),

  q("l6-am", 6, "Tính $-7+12$.", ["$5$", "$-5$", "$19$", "$4$"], 0,
    ["Từ $-7$ đi thêm $12$ đơn vị về phía dương.", "Bù $7$ để tới $0$, còn $5$.", "Kết quả là $5$."], "-7+12", "5"),
  q("l6-phan", 6, "Tính $\\dfrac{2}{3}+\\dfrac{1}{6}$.", ["$\\dfrac{5}{6}$", "$\\dfrac{3}{9}$", "$\\dfrac{3}{6}$", "$\\dfrac{1}{2}$"], 0,
    ["Quy đồng mẫu $6$: $\\dfrac{2}{3}=\\dfrac{4}{6}$.", "$\\dfrac{4}{6}+\\dfrac{1}{6}=\\dfrac{5}{6}$.", "Tổng là $\\dfrac{5}{6}$."], "Rational(2,3)+Rational(1,6)", "Rational(5,6)"),
  q("l6-tuyet-doi", 6, "$|-8|$ bằng", ["$8$", "$-8$", "$0$", "$16$"], 0,
    ["Trị tuyệt đối là khoảng cách tới $0$.", "$-8$ cách $0$ đúng $8$ đơn vị.", "$|-8|=8$, không còn dấu trừ."], "Abs(-8)", "8"),
  q("l6-vuong", 6, "Hình vuông cạnh $5$ cm. Chu vi bằng bao nhiêu?", ["$20$ cm", "$25$ cm", "$10$ cm", "$15$ cm"], 0,
    ["Hình vuông có $4$ cạnh bằng nhau.", "$4\\times 5=20$.", "Chu vi bằng $20$ cm. Diện tích mới là $25$ cm²."], "4*5", "20"),

  q("l7-pt", 7, "Giải $2x+3=11$.", ["$x=4$", "$x=7$", "$x=8$", "$x=5$"], 0,
    ["Chuyển $3$ sang vế kia: $2x=11-3=8$.", "Chia hai vế cho $2$: $x=4$.", "Thử lại: $2\\times 4+3=11$."], "solve(2*x+3-11, x)[0]", "4"),
  q("l7-am", 7, "Tính $(-3)\\times(-4)$.", ["$12$", "$-12$", "$7$", "$-7$"], 0,
    ["Hai số âm nhân nhau được số dương.", "$3\\times 4=12$.", "Tích bằng $12$."], "(-3)*(-4)", "12"),
  q("l7-goc", 7, "Tam giác có hai góc $50^\\circ$ và $60^\\circ$. Góc thứ ba bằng bao nhiêu?", ["$70^\\circ$", "$110^\\circ$", "$90^\\circ$", "$50^\\circ$"], 0,
    ["Tổng ba góc trong tam giác là $180^\\circ$.", "$180-50-60=70$.", "Góc còn lại bằng $70^\\circ$."], "180-50-60", "70"),
  q("l7-phan-tram", 7, "$15\\%$ của $200$ bằng bao nhiêu?", ["$30$", "$15$", "$20$", "$35$"], 0,
    ["$15\\%=\\dfrac{15}{100}$.", "$\\dfrac{15}{100}\\times 200=30$.", "Kết quả bằng $30$."], "Rational(15,100)*200", "30"),

  q("l8-hieu-binh", 8, "Giá trị của $(x-2)(x+2)$ tại $x=5$ bằng", ["$21$", "$25$", "$10$", "$9$"], 0,
    ["$(x-2)(x+2)=x^2-4$.", "Tại $x=5$: $25-4=21$.", "Không nhân nhầm thành $5\\times 2-2=8$."], "(5-2)*(5+2)", "21"),
  q("l8-can", 8, "$\\sqrt{81}$ bằng", ["$9$", "$8$", "$3$", "$27$"], 0,
    ["Tìm số không âm có bình phương bằng $81$.", "$9\\times 9=81$.", "$\\sqrt{81}=9$."], "sqrt(81)", "9"),
  q("l8-mu", 8, "$2^3\\times 2^2$ bằng", ["$32$", "$64$", "$12$", "$16$"], 0,
    ["Cùng cơ số thì cộng số mũ: $2^{3+2}=2^5$.", "$2^5=32$.", "Nhân hai số mũ $3\\times 2$ thì ra $2^6=64$, sai quy tắc."], "2**3 * 2**2", "32"),
  q("l8-pyta", 8, "Tam giác vuông cạnh góc vuông $3$ cm và $4$ cm. Cạnh huyền bằng bao nhiêu?", ["$5$ cm", "$7$ cm", "$6$ cm", "$12$ cm"], 0,
    ["Pytago: $c^2=3^2+4^2=9+16=25$.", "$c=\\sqrt{25}=5$ vì độ dài dương.", "Cạnh huyền bằng $5$ cm."], "sqrt(3**2+4**2)", "5"),

  q("l9-tich", 9, "Phương trình $x^2-3x+2=0$ có tích hai nghiệm bằng", ["$2$", "$3$", "$-2$", "$1$"], 0,
    ["$\\Delta=9-8=1$, hai nghiệm $x=\\dfrac{3\\pm 1}{2}$.", "Nghiệm là $2$ và $1$.", "Tích bằng $2$, đúng Viète $\\dfrac{c}{a}=2$. Tổng $3$ là đáp án khác."], "2*1", "2"),
  q("l9-binh-phuong", 9, "$(3+1)^2$ bằng", ["$16$", "$10$", "$9$", "$12$"], 0,
    ["$(3+1)^2=4^2=16$.", "Hoặc $3^2+2\\cdot 3\\cdot 1+1^2=9+6+1=16$.", "Bỏ số hạng $2\\cdot 3\\cdot 1$ thì chỉ còn $10$, sai."], "(3+1)**2", "16"),
  q("l9-he", 9, "Hệ $x+y=5$, $x-y=1$ có nghiệm $x$ bằng", ["$3$", "$4$", "$2$", "$5$"], 0,
    ["Cộng hai phương trình: $2x=6$, nên $x=3$.", "Thế vào $x+y=5$: $y=2$.", "Thử $x-y=3-2=1$, đúng."], "(5+1)/2", "3"),
  q("l9-xs", 9, "Hộp có $2$ bi đỏ và $1$ bi xanh. Lấy ngẫu nhiên $1$ bi. Xác suất được bi đỏ là", ["$\\dfrac{2}{3}$", "$\\dfrac{1}{2}$", "$\\dfrac{1}{3}$", "$\\dfrac{3}{2}$"], 0,
    ["Có $3$ bi, mỗi bi một khả năng như nhau.", "Bi đỏ có $2$ viên.", "$P=\\dfrac{2}{3}$. Bi xanh mới là $\\dfrac{1}{3}$."], "Rational(2,3)", "Rational(2,3)"),
];

export function questionsForGrade(grade: number): GradeQuestion[] {
  return gradePractice.filter((item) => item.grade === grade);
}
