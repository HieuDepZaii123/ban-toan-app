import type { GradeDang } from "./types.ts";
import { b } from "./types.ts";

const R = String.raw;

const lop06: GradeDang[] = [
  {
    name: b(R`Tính giá trị biểu thức theo thứ tự phép tính`, R`Evaluating an expression in the right order`),
    spot: b(R`Biểu thức có nhiều phép tính, dấu ngoặc và lũy thừa.`, R`An expression with several operations, brackets and powers.`),
    method: [
      b(R`Làm trong ngoặc trước, rồi lũy thừa, rồi nhân chia từ trái sang phải.`, R`Brackets first, then powers, then multiplication and division from left to right.`),
      b(R`Cộng trừ làm sau cùng, cũng từ trái sang phải.`, R`Addition and subtraction last, also from left to right.`),
    ],
    example: {
      prompt: b(R`Tính $3\cdot(7-2)^2-20:4$.`, R`Work out $3\cdot(7-2)^2-20:4$.`),
      steps: [
        b(R`Trong ngoặc: $7-2=5$, rồi lũy thừa: $5^2=25$.`, R`Brackets: $7-2=5$, then the power: $5^2=25$.`),
        b(R`Nhân chia: $3\cdot 25=75$ và $20:4=5$; cuối cùng $75-5=70$.`, R`Multiply and divide: $3\cdot 25=75$ and $20:4=5$; finally $75-5=70$.`),
      ],
      ket: b(R`Giá trị biểu thức là $70$.`, R`The value of the expression is $70$.`),
      checks: [{ expr: "3*(7-2)**2-20/4", expect: "70" }],
    },
    mistake: b(R`Làm cộng trừ trước nhân chia vì đọc từ trái sang phải.`, R`Adding and subtracting before multiplying and dividing just because they are read left to right.`),
    drill: { prompt: b(R`Tính $2^3+4\cdot(10-6)$.`, R`Work out $2^3+4\cdot(10-6)$.`), answer: b(R`Bằng $24$.`, R`It is $24$.`), checks: [{ expr: "2**3+4*(10-6)", expect: "24" }] },
  },
  {
    name: b(R`Nhân, chia lũy thừa cùng cơ số`, R`Multiplying and dividing powers with the same base`),
    spot: b(R`Có tích hoặc thương các lũy thừa cùng cơ số.`, R`A product or quotient of powers with the same base.`),
    method: [
      b(R`Nhân hai lũy thừa cùng cơ số thì cộng số mũ.`, R`Multiplying powers with the same base adds the exponents.`),
      b(R`Chia hai lũy thừa cùng cơ số thì trừ số mũ.`, R`Dividing powers with the same base subtracts the exponents.`),
    ],
    example: {
      prompt: b(R`Viết gọn $2^5\cdot 2^3:2^6$ và tính giá trị.`, R`Simplify $2^5\cdot 2^3:2^6$ and find its value.`),
      steps: [
        b(R`Nhân: $2^5\cdot 2^3=2^{5+3}=2^8$.`, R`Multiply: $2^5\cdot 2^3=2^{5+3}=2^8$.`),
        b(R`Rồi chia: $2^8:2^6=2^{8-6}=2^2=4$.`, R`Then divide: $2^8:2^6=2^{8-6}=2^2=4$.`),
      ],
      ket: b(R`Biểu thức bằng $2^2=4$.`, R`The expression equals $2^2=4$.`),
      checks: [{ expr: "2**5*2**3/2**6", expect: "4" }],
    },
    mistake: b(R`Nhân các số mũ với nhau thay vì cộng.`, R`Multiplying the exponents instead of adding them.`),
    drill: { prompt: b(R`Viết $3^4\cdot 3^2$ dưới dạng một lũy thừa rồi tính.`, R`Write $3^4\cdot 3^2$ as a single power, then evaluate.`), answer: b(R`Bằng $3^6=729$.`, R`It is $3^6=729$.`), checks: [{ expr: "3**4*3**2", expect: "729" }] },
  },
  {
    name: b(R`Phân tích ra thừa số nguyên tố và dấu hiệu chia hết`, R`Prime factorisation and divisibility tests`),
    spot: b(R`Đề hỏi một số chia hết cho số nào, hoặc yêu cầu phân tích.`, R`The problem asks what a number is divisible by, or to factorise it.`),
    method: [
      b(R`Dùng dấu hiệu chia hết cho $2$, $3$, $5$, $9$ để thử các số nguyên tố nhỏ.`, R`Use the divisibility tests for $2$, $3$, $5$, $9$ to try the small primes.`),
      b(R`Chia liên tiếp cho các số nguyên tố đến khi thương bằng $1$, rồi viết dưới dạng lũy thừa.`, R`Divide repeatedly by primes until the quotient is $1$, then write with powers.`),
    ],
    example: {
      prompt: b(R`Phân tích $360$ ra thừa số nguyên tố.`, R`Factorise $360$ into primes.`),
      steps: [
        b(R`Chia cho $2$ ba lần: $360=2^3\cdot 45$.`, R`Dividing by $2$ three times gives $360=2^3\cdot 45$.`),
        b(R`Rồi $45=3^2\cdot 5$, nên $360=2^3\cdot 3^2\cdot 5$.`, R`Then $45=3^2\cdot 5$, so $360=2^3\cdot 3^2\cdot 5$.`),
      ],
      ket: b(R`Ta có $360=2^3\cdot 3^2\cdot 5$.`, R`We have $360=2^3\cdot 3^2\cdot 5$.`),
      checks: [{ expr: "2**3*3**2*5", expect: "360" }],
    },
    mistake: b(R`Coi $1$ là số nguyên tố hoặc coi mọi số lẻ là nguyên tố.`, R`Counting $1$ as prime or thinking every odd number is prime.`),
    drill: { prompt: b(R`Phân tích $84$ ra thừa số nguyên tố.`, R`Factorise $84$ into primes.`), answer: b(R`Ta có $84=2^2\cdot 3\cdot 7$.`, R`We have $84=2^2\cdot 3\cdot 7$.`), checks: [{ expr: "2**2*3*7", expect: "84" }] },
  },
  {
    name: b(R`Ước chung lớn nhất và bội chung nhỏ nhất trong bài toán`, R`Greatest common divisor and least common multiple in word problems`),
    spot: b(R`Chia đều không thừa (ƯCLN), hoặc hai việc lặp lại cùng lúc (BCNN).`, R`Sharing equally with nothing left (GCD), or two repeating events happening together (LCM).`),
    method: [
      b(R`Phân tích các số ra thừa số nguyên tố.`, R`Factorise the numbers into primes.`),
      b(R`ƯCLN lấy thừa số chung với số mũ nhỏ nhất; BCNN lấy mọi thừa số với số mũ lớn nhất.`, R`GCD takes common factors with the smallest exponents; LCM takes every factor with the largest exponent.`),
    ],
    example: {
      prompt: b(R`Hai đèn nháy mỗi $12$ giây và $18$ giây. Sau bao lâu thì cả hai nháy cùng lúc lần tiếp theo?`, R`Two lights flash every $12$ seconds and every $18$ seconds. After how long do they next flash together?`),
      steps: [
        b(R`Cần tìm bội chung nhỏ nhất của $12=2^2\cdot 3$ và $18=2\cdot 3^2$.`, R`We need the least common multiple of $12=2^2\cdot 3$ and $18=2\cdot 3^2$.`),
        b(R`Lấy $2^2\cdot 3^2=36$.`, R`Take $2^2\cdot 3^2=36$.`),
      ],
      ket: b(R`Sau $36$ giây hai đèn nháy cùng lúc.`, R`After $36$ seconds the two lights flash together.`),
      checks: [{ expr: "lcm(12,18)", expect: "36" }],
    },
    mistake: b(R`Lấy tích hai số làm bội chung nhỏ nhất.`, R`Taking the product of the two numbers as the least common multiple.`),
    drill: { prompt: b(R`Có $30$ cái bút và $45$ quyển vở chia vào các túi như nhau, không thừa. Nhiều nhất bao nhiêu túi?`, R`There are $30$ pens and $45$ notebooks shared equally into bags with nothing left. What is the most bags?`), answer: b(R`Nhiều nhất $15$ túi.`, R`At most $15$ bags.`), checks: [{ expr: "gcd(30,45)", expect: "15" }] },
  },
  {
    name: b(R`Cộng, trừ, nhân, chia số nguyên`, R`Adding, subtracting, multiplying and dividing integers`),
    spot: b(R`Có số âm, nhiệt độ dưới $0$, tiền nợ, hoặc độ cao dưới mực nước biển.`, R`Negative numbers, temperatures below $0$, debts, or heights below sea level.`),
    method: [
      b(R`Cộng, trừ: đi trên trục số, số dương sang phải và số âm sang trái.`, R`Adding and subtracting: move along the number line, right for positive, left for negative.`),
      b(R`Nhân, chia: hai số cùng dấu cho kết quả dương, khác dấu cho kết quả âm.`, R`Multiplying and dividing: the same signs give a positive result, different signs give a negative one.`),
    ],
    example: {
      prompt: b(R`Tính $(-8)\cdot 3+(-15):5-(-4)$.`, R`Work out $(-8)\cdot 3+(-15):5-(-4)$.`),
      steps: [
        b(R`Nhân chia: $(-8)\cdot 3=-24$ và $(-15):5=-3$.`, R`Multiply and divide: $(-8)\cdot 3=-24$ and $(-15):5=-3$.`),
        b(R`Cộng trừ: $-24+(-3)-(-4)=-27+4=-23$.`, R`Add and subtract: $-24+(-3)-(-4)=-27+4=-23$.`),
      ],
      ket: b(R`Giá trị biểu thức là $-23$.`, R`The value of the expression is $-23$.`),
      checks: [{ expr: "(-8)*3+Rational(-15,5)-(-4)", expect: "-23" }],
    },
    mistake: b(R`Cho rằng trừ một số âm vẫn là đi về phía âm.`, R`Thinking that subtracting a negative number still goes towards the negative side.`),
    drill: { prompt: b(R`Tính $(-6)\cdot(-4)-10$.`, R`Work out $(-6)\cdot(-4)-10$.`), answer: b(R`Bằng $14$.`, R`It is $14$.`), checks: [{ expr: "(-6)*(-4)-10", expect: "14" }] },
  },
  {
    name: b(R`Cộng, trừ, nhân, chia phân số và hỗn số`, R`Adding, subtracting, multiplying and dividing fractions and mixed numbers`),
    spot: b(R`Có phân số hoặc hỗn số trong một phép tính hay bài toán lời văn.`, R`Fractions or mixed numbers in a calculation or a word problem.`),
    method: [
      b(R`Đổi hỗn số ra phân số.`, R`Change mixed numbers into fractions.`),
      b(R`Cộng trừ thì quy đồng mẫu; nhân thì tử nhân tử, mẫu nhân mẫu; chia thì nhân với phân số đảo.`, R`For adding or subtracting find a common denominator; for multiplying, numerators and denominators; for dividing, multiply by the reciprocal.`),
    ],
    example: {
      prompt: b(R`Tính $2\frac{1}{2}:\frac{5}{4}+\frac{1}{3}$.`, R`Work out $2\frac{1}{2}:\frac{5}{4}+\frac{1}{3}$.`),
      steps: [
        b(R`Đổi $2\frac{1}{2}=\frac{5}{2}$, rồi chia: $\frac{5}{2}\cdot\frac{4}{5}=2$.`, R`Change $2\frac{1}{2}=\frac{5}{2}$, then divide: $\frac{5}{2}\cdot\frac{4}{5}=2$.`),
        b(R`Cộng: $2+\frac{1}{3}=\frac{7}{3}$.`, R`Add: $2+\frac{1}{3}=\frac{7}{3}$.`),
      ],
      ket: b(R`Kết quả là $\frac{7}{3}$.`, R`The result is $\frac{7}{3}$.`),
      checks: [{ expr: "Rational(5,2)/Rational(5,4)+Rational(1,3)", expect: "Rational(7,3)" }],
    },
    mistake: b(R`Cộng phần nguyên rồi cộng phần phân số mà không đổi khi tổng phân số vượt $1$.`, R`Adding the whole parts and fractions separately without converting when the fractions exceed $1$.`),
    drill: { prompt: b(R`Tính $1\frac{1}{4}+2\frac{2}{3}$.`, R`Work out $1\frac{1}{4}+2\frac{2}{3}$.`), answer: b(R`Bằng $\frac{47}{12}$.`, R`It is $\frac{47}{12}$.`), checks: [{ expr: "Rational(5,4)+Rational(8,3)", expect: "Rational(47,12)" }] },
  },
  {
    name: b(R`Tính phần trăm: giảm giá, tăng giá, tỉ lệ`, R`Percentages: discounts, rises and proportions`),
    spot: b(R`Có "phần trăm", "giảm", "tăng", "chiếm".`, R`The words "percent", "decrease", "increase" or "make up".`),
    method: [
      b(R`Tìm phần trăm của một số: nhân với phân số $\frac{p}{100}$.`, R`A percentage of a number: multiply by the fraction $\frac{p}{100}$.`),
      b(R`Tìm tỉ số phần trăm: chia hai số rồi nhân $100$; tìm cả số khi biết một phần thì chia.`, R`A percentage ratio: divide the two numbers and multiply by $100$; for the whole from a part, divide.`),
    ],
    example: {
      prompt: b(R`Giá một cuốn sách tăng từ $80\,000$ đồng lên $92\,000$ đồng. Giá tăng bao nhiêu phần trăm?`, R`The price of a book rises from $80\,000$ dong to $92\,000$ dong. By what percentage does it rise?`),
      steps: [
        b(R`Giá tăng $92\,000-80\,000=12\,000$ đồng.`, R`The price rises by $92\,000-80\,000=12\,000$ dong.`),
        b(R`Tỉ số phần trăm là $\frac{12\,000}{80\,000}\cdot 100\%=15\%$.`, R`As a percentage it is $\frac{12\,000}{80\,000}\cdot 100\%=15\%$.`),
      ],
      ket: b(R`Giá sách tăng $15\%$.`, R`The price rises by $15\%$.`),
      checks: [{ expr: "Rational(12000,80000)*100", expect: "15" }],
    },
    mistake: b(R`Lấy số mới làm chuẩn thay vì số ban đầu.`, R`Using the new price as the base instead of the original.`),
    drill: { prompt: b(R`Tìm số mà $30\%$ của nó bằng $45$.`, R`Find the number whose $30\%$ is $45$.`), answer: b(R`Số đó là $150$.`, R`The number is $150$.`), checks: [{ expr: "45/Rational(30,100)", expect: "150" }] },
  },
  {
    name: b(R`Số thập phân âm và so sánh số`, R`Negative decimals and comparing numbers`),
    spot: b(R`Số thập phân có dấu trừ, hoặc xếp thứ tự số nguyên, phân số, số thập phân.`, R`Decimals with minus signs, or ordering integers, fractions and decimals.`),
    method: [
      b(R`Đổi các số về cùng dạng thập phân hoặc phân số.`, R`Convert the numbers to the same form, decimal or fraction.`),
      b(R`Đặt trên trục số: số nằm bên phải thì lớn hơn; với số âm, trị tuyệt đối lớn hơn thì số bé hơn.`, R`Place them on the number line: further right is bigger; among negatives, the larger absolute value is smaller.`),
    ],
    example: {
      prompt: b(R`Sắp xếp $-0{,}5$, $\frac{1}{4}$, $-\frac{3}{4}$, $0{,}3$ theo thứ tự tăng dần.`, R`Order $-0.5$, $\frac{1}{4}$, $-\frac{3}{4}$, $0.3$ from smallest to biggest.`),
      steps: [
        b(R`Đổi về thập phân: $-0{,}5$, $0{,}25$, $-0{,}75$, $0{,}3$.`, R`Convert to decimals: $-0.5$, $0.25$, $-0.75$, $0.3$.`),
        b(R`Số âm trước: $-0{,}75<-0{,}5$; số dương: $0{,}25<0{,}3$.`, R`Negatives first: $-0.75<-0.5$; then positives: $0.25<0.3$.`),
      ],
      ket: b(R`Thứ tự tăng dần là $-\frac{3}{4}$, $-0{,}5$, $\frac{1}{4}$, $0{,}3$.`, R`The increasing order is $-\frac{3}{4}$, $-0.5$, $\frac{1}{4}$, $0.3$.`),
      checks: [{ expr: "Lt(Rational(-3,4),Rational(-1,2))", expect: "True" }, { expr: "Lt(Rational(1,4),Rational(3,10))", expect: "True" }],
    },
    mistake: b(R`Cho rằng $-0{,}75$ lớn hơn $-0{,}5$ vì $0{,}75$ lớn hơn $0{,}5$.`, R`Thinking $-0.75$ is bigger than $-0.5$ because $0.75$ is bigger than $0.5$.`),
    drill: { prompt: b(R`Số nào lớn hơn, $-1{,}2$ hay $-1{,}05$?`, R`Which is bigger, $-1.2$ or $-1.05$?`), answer: b(R`Số $-1{,}05$ lớn hơn.`, R`The number $-1.05$ is bigger.`), checks: [{ expr: "Max(Rational(-12,10),Rational(-105,100))", expect: "Rational(-105,100)" }] },
  },
  {
    name: b(R`Tính số đo góc và góc kề bù`, R`Finding angles and supplementary angles`),
    spot: b(R`Có tia nằm giữa, hai góc kề, hoặc góc bẹt, góc vuông.`, R`A ray between two others, adjacent angles, or a straight or right angle.`),
    method: [
      b(R`Tia nằm giữa thì số đo góc lớn bằng tổng hai góc nhỏ.`, R`If a ray lies between, the big angle is the sum of the two small angles.`),
      b(R`Hai góc kề bù có tổng $180^\circ$, hai góc phụ nhau có tổng $90^\circ$.`, R`Adjacent supplementary angles total $180^\circ$; complementary angles total $90^\circ$.`),
    ],
    example: {
      prompt: b(R`Tia $Oy$ nằm giữa hai tia $Ox$, $Oz$ với $\widehat{xOz}=130^\circ$ và $\widehat{xOy}=3\cdot\widehat{yOz}$. Tính $\widehat{yOz}$.`, R`The ray $Oy$ lies between rays $Ox$ and $Oz$ with $\widehat{xOz}=130^\circ$ and $\widehat{xOy}=3\cdot\widehat{yOz}$. Find $\widehat{yOz}$.`),
      steps: [
        b(R`Vì $Oy$ nằm giữa nên $\widehat{xOy}+\widehat{yOz}=130^\circ$.`, R`Since $Oy$ lies between, $\widehat{xOy}+\widehat{yOz}=130^\circ$.`),
        b(R`Thay $\widehat{xOy}=3\cdot\widehat{yOz}$: $4\cdot\widehat{yOz}=130^\circ$, nên $\widehat{yOz}=32{,}5^\circ$.`, R`Substituting $\widehat{xOy}=3\cdot\widehat{yOz}$: $4\cdot\widehat{yOz}=130^\circ$, so $\widehat{yOz}=32.5^\circ$.`),
      ],
      ket: b(R`Góc $\widehat{yOz}=32{,}5^\circ$.`, R`The angle $\widehat{yOz}=32.5^\circ$.`),
      checks: [{ expr: "solve(4*x-130,x)[0]", expect: "Rational(65,2)" }],
    },
    mistake: b(R`Cộng hai góc không kề nhau hoặc có phần chồng lên.`, R`Adding two angles that are not adjacent or that overlap.`),
    drill: { prompt: b(R`Hai góc kề bù, góc này gấp đôi góc kia. Tính góc nhỏ.`, R`Two adjacent supplementary angles, one twice the other. Find the smaller angle.`), answer: b(R`Góc nhỏ bằng $60^\circ$.`, R`The smaller angle is $60^\circ$.`), checks: [{ expr: "solve(3*x-180,x)[0]", expect: "60" }] },
  },
  {
    name: b(R`Thu thập, biểu diễn dữ liệu và xác suất thực nghiệm`, R`Collecting and showing data, and experimental probability`),
    spot: b(R`Có bảng số liệu, biểu đồ cột, hoặc thử nhiều lần rồi hỏi tỉ lệ.`, R`A data table, bar chart, or many trials followed by a question about the proportion.`),
    method: [
      b(R`Kiểm tra tổng các lần đếm bằng cỡ mẫu.`, R`Check that the counts add up to the sample size.`),
      b(R`Xác suất thực nghiệm bằng số lần xảy ra chia cho số lần thử.`, R`Experimental probability is the number of times it happens divided by the number of trials.`),
    ],
    example: {
      prompt: b(R`Số liệu giả định. Tung đồng xu $50$ lần được $23$ lần mặt ngửa. Xác suất thực nghiệm của mặt ngửa là bao nhiêu?`, R`Assumed data. A coin is tossed $50$ times and lands heads $23$ times. What is the experimental probability of heads?`),
      steps: [
        b(R`Số lần ngửa là $23$ và số lần thử là $50$.`, R`The number of heads is $23$ and the number of trials is $50$.`),
        b(R`Xác suất thực nghiệm là $\frac{23}{50}=0{,}46$.`, R`The experimental probability is $\frac{23}{50}=0.46$.`),
      ],
      ket: b(R`Xác suất thực nghiệm của mặt ngửa là $0{,}46$.`, R`The experimental probability of heads is $0.46$.`),
      checks: [{ expr: "Rational(23,50)", expect: "Rational(46,100)" }],
    },
    mistake: b(R`Coi kết quả vài lần thử là xác suất đúng của đồng xu.`, R`Treating the result of a few trials as the true probability of the coin.`),
    drill: { prompt: b(R`Số liệu giả định. Một ô tô qua cổng $40$ lần, trong đó $10$ lần là xe tải. Xác suất thực nghiệm của xe tải là bao nhiêu?`, R`Assumed data. A gate saw $40$ vehicles, $10$ of them lorries. What is the experimental probability of a lorry?`), answer: b(R`Bằng $\frac{1}{4}$.`, R`It is $\frac{1}{4}$.`), checks: [{ expr: "Rational(10,40)", expect: "Rational(1,4)" }] },
  },
];

export default lop06;
