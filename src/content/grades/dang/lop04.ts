import type { GradeDang } from "./types.ts";
import { b } from "./types.ts";

const R = String.raw;

const lop04: GradeDang[] = [
  {
    name: b(R`Đọc, viết và so sánh số lớp triệu`, R`Reading, writing and comparing numbers in the millions`),
    spot: b(R`Số có từ bảy chữ số trở lên, hoặc đề hỏi số nào lớn hơn.`, R`A number with seven or more digits, or a problem asking which number is bigger.`),
    method: [
      b(R`Tách số thành các lớp ba chữ số từ phải sang trái.`, R`Split the number into groups of three digits from the right.`),
      b(R`So sánh số chữ số trước; bằng nhau thì so từng hàng từ trái sang phải.`, R`Compare the number of digits first; if equal, compare place by place from the left.`),
    ],
    example: {
      prompt: b(R`So sánh $4\,215\,000$ và $4\,125\,000$.`, R`Compare $4\,215\,000$ and $4\,125\,000$.`),
      steps: [
        b(R`Cả hai số có bảy chữ số và cùng $4$ triệu.`, R`Both numbers have seven digits and both have $4$ millions.`),
        b(R`Hàng trăm nghìn: $2>1$, nên $4\,215\,000>4\,125\,000$.`, R`Hundred thousands: $2>1$, so $4\,215\,000>4\,125\,000$.`),
      ],
      ket: b(R`Số $4\,215\,000$ lớn hơn.`, R`The number $4\,215\,000$ is bigger.`),
      checks: [{ expr: "Gt(4215000,4125000)", expect: "True" }],
    },
    mistake: b(R`Thấy chữ số phía sau lớn thì cho cả số lớn hơn.`, R`Thinking a number is bigger because its later digits are bigger.`),
    drill: { prompt: b(R`Số nào lớn hơn, $9\,870\,000$ hay $9\,780\,000$?`, R`Which is bigger, $9\,870\,000$ or $9\,780\,000$?`), answer: b(R`Số $9\,870\,000$.`, R`The number $9\,870\,000$.`), checks: [{ expr: "Max(9870000,9780000)", expect: "9870000" }] },
  },
  {
    name: b(R`Rút gọn phân số và quy đồng mẫu số`, R`Simplifying fractions and common denominators`),
    spot: b(R`Phân số có tử và mẫu cùng chia hết cho một số, hoặc hai phân số khác mẫu.`, R`A fraction whose numerator and denominator share a factor, or two fractions with different denominators.`),
    method: [
      b(R`Rút gọn: chia tử và mẫu cho ước chung lớn nhất.`, R`Simplify: divide the numerator and denominator by their greatest common factor.`),
      b(R`Quy đồng: chọn mẫu chung chia hết cho các mẫu rồi nhân tử và mẫu của từng phân số.`, R`Common denominator: choose a common multiple of the denominators and multiply each fraction's numerator and denominator.`),
    ],
    example: {
      prompt: b(R`Rút gọn $\frac{12}{18}$ rồi quy đồng với $\frac{1}{4}$.`, R`Simplify $\frac{12}{18}$, then bring it to a common denominator with $\frac{1}{4}$.`),
      steps: [
        b(R`Chia tử và mẫu cho $6$: $\frac{12}{18}=\frac{2}{3}$.`, R`Divide numerator and denominator by $6$: $\frac{12}{18}=\frac{2}{3}$.`),
        b(R`Mẫu chung $12$: $\frac{2}{3}=\frac{8}{12}$ và $\frac{1}{4}=\frac{3}{12}$.`, R`Common denominator $12$: $\frac{2}{3}=\frac{8}{12}$ and $\frac{1}{4}=\frac{3}{12}$.`),
      ],
      ket: b(R`Hai phân số là $\frac{8}{12}$ và $\frac{3}{12}$.`, R`The two fractions are $\frac{8}{12}$ and $\frac{3}{12}$.`),
      checks: [{ expr: "Rational(12,18)", expect: "Rational(2,3)" }, { expr: "Rational(2,3)-Rational(8,12)", expect: "0" }],
    },
    mistake: b(R`Chỉ nhân mẫu mà quên nhân tử.`, R`Multiplying only the denominator and forgetting the numerator.`),
    drill: { prompt: b(R`Rút gọn $\frac{15}{25}$.`, R`Simplify $\frac{15}{25}$.`), answer: b(R`Bằng $\frac{3}{5}$.`, R`It is $\frac{3}{5}$.`), checks: [{ expr: "Rational(15,25)", expect: "Rational(3,5)" }] },
  },
  {
    name: b(R`Cộng, trừ phân số khác mẫu`, R`Adding and subtracting fractions with different denominators`),
    spot: b(R`Hai phân số có mẫu khác nhau trong phép cộng hoặc trừ.`, R`Two fractions with different denominators in an addition or subtraction.`),
    method: [
      b(R`Quy đồng mẫu số hai phân số.`, R`Bring the two fractions to a common denominator.`),
      b(R`Cộng hoặc trừ hai tử số, giữ nguyên mẫu, rồi rút gọn nếu được.`, R`Add or subtract the numerators, keep the denominator, then simplify if possible.`),
    ],
    example: {
      prompt: b(R`Tính $\frac{3}{4}-\frac{1}{6}$.`, R`Work out $\frac{3}{4}-\frac{1}{6}$.`),
      steps: [
        b(R`Mẫu chung $12$: $\frac{9}{12}-\frac{2}{12}$.`, R`Common denominator $12$: $\frac{9}{12}-\frac{2}{12}$.`),
        b(R`Trừ hai tử: $\frac{7}{12}$, đã tối giản.`, R`Subtract the numerators: $\frac{7}{12}$, already in lowest terms.`),
      ],
      ket: b(R`Hiệu bằng $\frac{7}{12}$.`, R`The difference is $\frac{7}{12}$.`),
      checks: [{ expr: "Rational(3,4)-Rational(1,6)", expect: "Rational(7,12)" }],
    },
    mistake: b(R`Trừ tử cho tử và mẫu cho mẫu.`, R`Subtracting numerator from numerator and denominator from denominator.`),
    drill: { prompt: b(R`Tính $\frac{1}{3}+\frac{1}{4}$.`, R`Work out $\frac{1}{3}+\frac{1}{4}$.`), answer: b(R`Bằng $\frac{7}{12}$.`, R`It is $\frac{7}{12}$.`), checks: [{ expr: "Rational(1,3)+Rational(1,4)", expect: "Rational(7,12)" }] },
  },
  {
    name: b(R`Nhân và chia phân số`, R`Multiplying and dividing fractions`),
    spot: b(R`Có phép nhân hoặc chia hai phân số, hoặc "một phần mấy của một phân số".`, R`A multiplication or division of two fractions, or "a fraction of a fraction".`),
    method: [
      b(R`Nhân: lấy tử nhân tử, mẫu nhân mẫu, rồi rút gọn.`, R`Multiply: numerator times numerator, denominator times denominator, then simplify.`),
      b(R`Chia: giữ phân số đầu và nhân với phân số thứ hai đảo ngược.`, R`Divide: keep the first fraction and multiply by the second turned upside down.`),
    ],
    example: {
      prompt: b(R`Tính $\frac{3}{5}\times\frac{10}{9}$ và $\frac{2}{3}:\frac{4}{9}$.`, R`Work out $\frac{3}{5}\times\frac{10}{9}$ and $\frac{2}{3}:\frac{4}{9}$.`),
      steps: [
        b(R`Nhân: $\frac{3\times 10}{5\times 9}=\frac{30}{45}=\frac{2}{3}$.`, R`Multiply: $\frac{3\times 10}{5\times 9}=\frac{30}{45}=\frac{2}{3}$.`),
        b(R`Với phép chia: $\frac{2}{3}\times\frac{9}{4}=\frac{18}{12}=\frac{3}{2}$.`, R`For the division: $\frac{2}{3}\times\frac{9}{4}=\frac{18}{12}=\frac{3}{2}$.`),
      ],
      ket: b(R`Hai kết quả là $\frac{2}{3}$ và $\frac{3}{2}$.`, R`The two results are $\frac{2}{3}$ and $\frac{3}{2}$.`),
      checks: [{ expr: "Rational(3,5)*Rational(10,9)", expect: "Rational(2,3)" }, { expr: "Rational(2,3)/Rational(4,9)", expect: "Rational(3,2)" }],
    },
    mistake: b(R`Đảo ngược cả hai phân số khi chia.`, R`Turning both fractions upside down when dividing.`),
    drill: { prompt: b(R`Tính $\frac{4}{7}:\frac{2}{3}$.`, R`Work out $\frac{4}{7}:\frac{2}{3}$.`), answer: b(R`Bằng $\frac{6}{7}$.`, R`It is $\frac{6}{7}$.`), checks: [{ expr: "Rational(4,7)/Rational(2,3)", expect: "Rational(6,7)" }] },
  },
  {
    name: b(R`Trung bình cộng`, R`The mean (average)`),
    spot: b(R`Đề hỏi "trung bình mỗi", hoặc cho trung bình và hỏi tổng.`, R`The problem asks "on average each", or gives the average and asks for the total.`),
    method: [
      b(R`Trung bình bằng tổng các số chia cho số các số.`, R`The mean is the sum of the numbers divided by how many there are.`),
      b(R`Cho trung bình, muốn tìm tổng thì lấy trung bình nhân số các số.`, R`Given the mean, find the total by multiplying the mean by how many numbers there are.`),
    ],
    example: {
      prompt: b(R`Bốn bạn cân nặng $30$ kg, $32$ kg, $35$ kg và $31$ kg. Trung bình mỗi bạn nặng bao nhiêu kilôgam?`, R`Four children weigh $30$ kg, $32$ kg, $35$ kg and $31$ kg. How many kilograms does each weigh on average?`),
      steps: [
        b(R`Tổng cân nặng là $30+32+35+31=128$ kg.`, R`The total weight is $30+32+35+31=128$ kg.`),
        b(R`Chia cho $4$ bạn: $128:4=32$ kg.`, R`Divide by $4$ children: $128:4=32$ kg.`),
      ],
      ket: b(R`Trung bình mỗi bạn nặng $32$ kilôgam.`, R`On average each child weighs $32$ kilograms.`),
      checks: [{ expr: "(30+32+35+31)/4", expect: "32" }],
    },
    mistake: b(R`Chia cho sai số các số hạng.`, R`Dividing by the wrong number of terms.`),
    drill: { prompt: b(R`Trung bình cộng của $12$, $18$ và $24$ bằng bao nhiêu?`, R`What is the mean of $12$, $18$ and $24$?`), answer: b(R`Bằng $18$.`, R`It is $18$.`), checks: [{ expr: "(12+18+24)/3", expect: "18" }] },
  },
  {
    name: b(R`Nhân với số có hai chữ số`, R`Multiplying by a two-digit number`),
    spot: b(R`Một thừa số có hai chữ số, ví dụ $45\times 23$.`, R`One factor has two digits, for example $45\times 23$.`),
    method: [
      b(R`Nhân với hàng đơn vị của thừa số thứ hai.`, R`Multiply by the ones digit of the second factor.`),
      b(R`Nhân với hàng chục, viết lùi một cột, rồi cộng hai tích riêng.`, R`Multiply by the tens digit, write it one column to the left, then add the two partial products.`),
    ],
    example: {
      prompt: b(R`Tính $45\times 23$.`, R`Work out $45\times 23$.`),
      steps: [
        b(R`Nhân với $3$: $45\times 3=135$.`, R`Multiply by $3$: $45\times 3=135$.`),
        b(R`Nhân với $20$: $45\times 20=900$. Cộng lại: $135+900=1035$.`, R`Multiply by $20$: $45\times 20=900$. Add: $135+900=1035$.`),
      ],
      ket: b(R`Tích bằng $1035$.`, R`The product is $1035$.`),
      checks: [{ expr: "45*23", expect: "1035" }],
    },
    mistake: b(R`Viết tích riêng thứ hai thẳng cột với tích riêng thứ nhất.`, R`Writing the second partial product in line with the first.`),
    drill: { prompt: b(R`Tính $34\times 12$.`, R`Work out $34\times 12$.`), answer: b(R`Tích bằng $408$.`, R`The product is $408$.`), checks: [{ expr: "34*12", expect: "408" }] },
  },
  {
    name: b(R`Chia cho số có hai chữ số`, R`Dividing by a two-digit number`),
    spot: b(R`Số chia có hai chữ số, ví dụ $504:12$.`, R`The divisor has two digits, for example $504:12$.`),
    method: [
      b(R`Ước lượng chữ số của thương bằng cách làm tròn số chia.`, R`Estimate each digit of the quotient by rounding the divisor.`),
      b(R`Nhân ngược, trừ, hạ chữ số tiếp theo; lặp lại đến hết.`, R`Multiply back, subtract, bring down the next digit; repeat until done.`),
    ],
    example: {
      prompt: b(R`Tính $504:12$.`, R`Work out $504:12$.`),
      steps: [
        b(R`Lấy $50:12=4$, vì $12\times 4=48$, dư $2$.`, R`Take $50:12=4$, because $12\times 4=48$, remainder $2$.`),
        b(R`Hạ $4$ được $24$, $24:12=2$, dư $0$. Thương là $42$.`, R`Bring down $4$ to get $24$, and $24:12=2$, remainder $0$. The quotient is $42$.`),
      ],
      ket: b(R`Ta có $504:12=42$.`, R`We have $504:12=42$.`),
      checks: [{ expr: "504/12", expect: "42" }],
    },
    mistake: b(R`Ước lượng quá lớn nên tích vượt số bị chia.`, R`Estimating too high so the product exceeds the dividend.`),
    drill: { prompt: b(R`Tính $936:18$.`, R`Work out $936:18$.`), answer: b(R`Thương bằng $52$.`, R`The quotient is $52$.`), checks: [{ expr: "936/18", expect: "52" }] },
  },
  {
    name: b(R`Tìm hai số khi biết tổng và hiệu`, R`Finding two numbers from their sum and difference`),
    spot: b(R`Đề cho tổng của hai số và hơn kém nhau bao nhiêu.`, R`The problem gives the sum of two numbers and how much one exceeds the other.`),
    method: [
      b(R`Số lớn bằng tổng cộng hiệu, rồi chia $2$.`, R`The bigger number is the sum plus the difference, divided by $2$.`),
      b(R`Số bé bằng tổng trừ hiệu, rồi chia $2$; thử lại cả hai.`, R`The smaller number is the sum minus the difference, divided by $2$; check both.`),
    ],
    example: {
      prompt: b(R`Hai thùng có tất cả $84$ lít nước, thùng to nhiều hơn thùng nhỏ $12$ lít. Mỗi thùng có bao nhiêu lít?`, R`Two tanks hold $84$ litres altogether, the big tank holding $12$ litres more. How many litres does each hold?`),
      steps: [
        b(R`Thùng to có $(84+12):2=48$ lít.`, R`The big tank holds $(84+12):2=48$ litres.`),
        b(R`Thùng nhỏ có $84-48=36$ lít; thử lại $48-36=12$.`, R`The small tank holds $84-48=36$ litres; check $48-36=12$.`),
      ],
      ket: b(R`Thùng to có $48$ lít, thùng nhỏ có $36$ lít.`, R`The big tank holds $48$ litres and the small tank holds $36$ litres.`),
      checks: [{ expr: "(84+12)/2", expect: "48" }, { expr: "(84-12)/2", expect: "36" }],
    },
    mistake: b(R`Chia đôi tổng rồi coi đó là một trong hai số.`, R`Halving the sum and calling it one of the numbers.`),
    drill: { prompt: b(R`Hai số có tổng $50$ và hiệu $8$. Số lớn là bao nhiêu?`, R`Two numbers have sum $50$ and difference $8$. What is the bigger number?`), answer: b(R`Số lớn là $29$.`, R`The bigger number is $29$.`), checks: [{ expr: "(50+8)/2", expect: "29" }] },
  },
  {
    name: b(R`Góc, hai đường thẳng vuông góc và song song`, R`Angles, perpendicular and parallel lines`),
    spot: b(R`Đề cho số đo góc hoặc hỏi loại góc, cặp cạnh vuông góc hoặc song song.`, R`The problem gives an angle or asks for the type of angle, or for perpendicular or parallel sides.`),
    method: [
      b(R`So số đo với $90^\circ$: nhỏ hơn là nhọn, bằng là vuông, lớn hơn là tù, bằng $180^\circ$ là bẹt.`, R`Compare the measure with $90^\circ$: smaller is acute, equal is right, bigger is obtuse, $180^\circ$ is straight.`),
      b(R`Hai cạnh vuông góc tạo góc $90^\circ$; hai cạnh song song không bao giờ cắt nhau.`, R`Perpendicular sides make a $90^\circ$ angle; parallel sides never meet.`),
    ],
    example: {
      prompt: b(R`Góc $135^\circ$ là góc gì? Phần bù của nó đến góc bẹt là bao nhiêu độ?`, R`What kind of angle is $135^\circ$? How many degrees remain to make a straight angle?`),
      steps: [
        b(R`Vì $90^\circ<135^\circ<180^\circ$ nên đó là góc tù.`, R`Since $90^\circ<135^\circ<180^\circ$, it is an obtuse angle.`),
        b(R`Phần bù đến góc bẹt là $180-135=45$ độ.`, R`The rest of a straight angle is $180-135=45$ degrees.`),
      ],
      ket: b(R`Góc $135^\circ$ là góc tù và phần còn lại là $45^\circ$.`, R`The angle $135^\circ$ is obtuse and the rest is $45^\circ$.`),
      checks: [{ expr: "180-135", expect: "45" }],
    },
    mistake: b(R`Đọc nhầm vòng số trên thước đo góc.`, R`Reading the wrong scale on the protractor.`),
    drill: { prompt: b(R`Góc $60^\circ$ là góc gì?`, R`What kind of angle is $60^\circ$?`), answer: b(R`Góc nhọn, vì $60^\circ<90^\circ$.`, R`An acute angle, because $60^\circ<90^\circ$.`), checks: [{ expr: "Lt(60,90)", expect: "True" }] },
  },
  {
    name: b(R`Đọc biểu đồ cột`, R`Reading a bar chart`),
    spot: b(R`Có biểu đồ cột và câu hỏi về cột cao nhất, tổng, hay chênh lệch.`, R`A bar chart with questions on the tallest bar, the total, or a difference.`),
    method: [
      b(R`Xem thang đo mỗi vạch ứng với bao nhiêu.`, R`Check what each mark on the scale stands for.`),
      b(R`Đọc chiều cao từng cột rồi cộng, trừ hoặc tính trung bình.`, R`Read each bar's height, then add, subtract or take the mean.`),
    ],
    example: {
      prompt: b(R`Biểu đồ cột cho số sách ba lớp quyên góp: $40$, $55$ và $45$ quyển. Cả ba lớp quyên góp bao nhiêu quyển, và lớp nhiều nhất hơn lớp ít nhất bao nhiêu?`, R`A bar chart shows books donated by three classes: $40$, $55$ and $45$. How many books did the three classes donate, and by how many does the top class beat the lowest?`),
      steps: [
        b(R`Tổng là $40+55+45=140$ quyển.`, R`The total is $40+55+45=140$ books.`),
        b(R`Lớp nhiều nhất hơn lớp ít nhất $55-40=15$ quyển.`, R`The top class beats the lowest by $55-40=15$ books.`),
      ],
      ket: b(R`Ba lớp quyên góp $140$ quyển, chênh lệch cao nhất là $15$ quyển.`, R`The classes donated $140$ books, and the biggest gap is $15$ books.`),
      checks: [{ expr: "40+55+45", expect: "140" }, { expr: "55-40", expect: "15" }],
    },
    mistake: b(R`Đọc chiều cao cột mà không nhìn thang đo.`, R`Reading a bar's height without checking the scale.`),
    drill: { prompt: b(R`Ba cột cao $12$, $20$ và $16$. Trung bình mỗi cột là bao nhiêu?`, R`Three bars are $12$, $20$ and $16$ tall. What is the mean height?`), answer: b(R`Bằng $16$.`, R`It is $16$.`), checks: [{ expr: "(12+20+16)/3", expect: "16" }] },
  },
];

export default lop04;
