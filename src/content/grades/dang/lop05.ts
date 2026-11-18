import type { GradeDang } from "./types.ts";
import { b } from "./types.ts";

const R = String.raw;

const lop05: GradeDang[] = [
  {
    name: b(R`Cộng và trừ số thập phân`, R`Adding and subtracting decimals`),
    spot: b(R`Các số có dấu phẩy, tiền, độ dài hay khối lượng viết dạng thập phân.`, R`Numbers with a decimal point, such as money, lengths or masses written as decimals.`),
    method: [
      b(R`Viết các số thẳng dấu phẩy với dấu phẩy, thêm chữ số $0$ nếu thiếu.`, R`Line up the decimal points, adding the digit $0$ where digits are missing.`),
      b(R`Cộng hoặc trừ như số tự nhiên rồi đặt dấu phẩy thẳng cột.`, R`Add or subtract as with whole numbers, then place the point in the same column.`),
    ],
    example: {
      prompt: b(R`Tính $12{,}6+4{,}85-3{,}2$.`, R`Work out $12.6+4.85-3.2$.`),
      steps: [
        b(R`Viết $12{,}60+4{,}85=17{,}45$.`, R`Write $12.60+4.85=17.45$.`),
        b(R`Trừ tiếp: $17{,}45-3{,}20=14{,}25$.`, R`Subtract: $17.45-3.20=14.25$.`),
      ],
      ket: b(R`Kết quả là $14{,}25$.`, R`The result is $14.25$.`),
      checks: [{ expr: "Rational(126,10)+Rational(485,100)-Rational(32,10)", expect: "Rational(1425,100)" }],
    },
    mistake: b(R`Căn thẳng theo chữ số cuối thay vì theo dấu phẩy.`, R`Lining up the last digits instead of the points.`),
    drill: { prompt: b(R`Tính $8{,}4-2{,}75$.`, R`Work out $8.4-2.75$.`), answer: b(R`Bằng $5{,}65$.`, R`It is $5.65$.`), checks: [{ expr: "Rational(84,10)-Rational(275,100)", expect: "Rational(565,100)" }] },
  },
  {
    name: b(R`Nhân và chia số thập phân`, R`Multiplying and dividing decimals`),
    spot: b(R`Phép nhân hoặc chia có số thập phân, hoặc nhân chia với $10$, $100$, $1000$.`, R`A multiplication or division with decimals, or times $10$, $100$, $1000$.`),
    method: [
      b(R`Nhân: bỏ dấu phẩy, nhân như số tự nhiên, đếm tổng chữ số thập phân của hai thừa số để đặt dấu phẩy.`, R`Multiply: ignore the points, multiply as whole numbers, count the total decimal places to place the point.`),
      b(R`Chia: nhân số bị chia và số chia với cùng $10$ hoặc $100$ cho số chia thành số tự nhiên.`, R`Divide: multiply both numbers by the same $10$ or $100$ to make the divisor a whole number.`),
    ],
    example: {
      prompt: b(R`Tính $3{,}2\times 1{,}5$ và $4{,}8:0{,}6$.`, R`Work out $3.2\times 1.5$ and $4.8:0.6$.`),
      steps: [
        b(R`Với phép nhân: $32\times 15=480$, có hai chữ số thập phân nên được $4{,}80=4{,}8$.`, R`For the product: $32\times 15=480$ with two decimal places gives $4.80=4.8$.`),
        b(R`Với phép chia: nhân cả hai số với $10$ được $48:6=8$.`, R`For the quotient: multiply both numbers by $10$ to get $48:6=8$.`),
      ],
      ket: b(R`Tích bằng $4{,}8$ và thương bằng $8$.`, R`The product is $4.8$ and the quotient is $8$.`),
      checks: [{ expr: "Rational(32,10)*Rational(15,10)", expect: "Rational(48,10)" }, { expr: "Rational(48,10)/Rational(6,10)", expect: "8" }],
    },
    mistake: b(R`Chỉ dời dấu phẩy của số chia mà quên số bị chia.`, R`Moving the point only in the divisor and forgetting the dividend.`),
    drill: { prompt: b(R`Tính $2{,}5\times 0{,}4$.`, R`Work out $2.5\times 0.4$.`), answer: b(R`Bằng $1$.`, R`It is $1$.`), checks: [{ expr: "Rational(25,10)*Rational(4,10)", expect: "1" }] },
  },
  {
    name: b(R`Tính phần trăm của một số`, R`Finding a percentage of a number`),
    spot: b(R`Có "giảm giá", "lãi", "chiếm … phần trăm".`, R`Words like "discount", "profit", "makes up … percent".`),
    method: [
      b(R`Đổi phần trăm thành phân số có mẫu $100$.`, R`Turn the percentage into a fraction with denominator $100$.`),
      b(R`Nhân số đó với phân số, rồi trừ đi hoặc cộng thêm nếu đề hỏi giá sau thay đổi.`, R`Multiply the number by the fraction, then subtract or add if the problem asks for the new price.`),
    ],
    example: {
      prompt: b(R`Một đôi giày giá $400\,000$ đồng được giảm $20\%$. Giá sau khi giảm là bao nhiêu?`, R`A pair of shoes costs $400\,000$ dong with a $20\%$ discount. What is the price after the discount?`),
      steps: [
        b(R`Số tiền giảm là $400\,000\times\frac{20}{100}=80\,000$ đồng.`, R`The discount is $400\,000\times\frac{20}{100}=80\,000$ dong.`),
        b(R`Giá sau giảm là $400\,000-80\,000=320\,000$ đồng.`, R`The price after the discount is $400\,000-80\,000=320\,000$ dong.`),
      ],
      ket: b(R`Giá sau khi giảm là $320\,000$ đồng.`, R`The price after the discount is $320\,000$ dong.`),
      checks: [{ expr: "400000*Rational(80,100)", expect: "320000" }],
    },
    mistake: b(R`Lấy số tiền giảm làm giá mới.`, R`Taking the discount itself as the new price.`),
    drill: { prompt: b(R`Tính $15\%$ của $240$.`, R`Find $15\%$ of $240$.`), answer: b(R`Bằng $36$.`, R`It is $36$.`), checks: [{ expr: "240*Rational(15,100)", expect: "36" }] },
  },
  {
    name: b(R`Tìm tỉ số phần trăm của hai số`, R`Finding what percentage one number is of another`),
    spot: b(R`Đề hỏi "bằng bao nhiêu phần trăm", hoặc đổi phân số ra phần trăm.`, R`The problem asks "what percentage", or to change a fraction into a percentage.`),
    method: [
      b(R`Lập tỉ số: số cần so sánh chia cho số làm chuẩn.`, R`Form the ratio: the number being compared divided by the base number.`),
      b(R`Nhân tỉ số với $100$ rồi viết dấu phần trăm.`, R`Multiply the ratio by $100$ and write the percent sign.`),
    ],
    example: {
      prompt: b(R`Lớp có $40$ bạn, trong đó $14$ bạn giỏi Toán. Số bạn giỏi Toán chiếm bao nhiêu phần trăm?`, R`A class has $40$ pupils, of whom $14$ are good at Maths. What percentage are good at Maths?`),
      steps: [
        b(R`Tỉ số là $14:40=0{,}35$.`, R`The ratio is $14:40=0.35$.`),
        b(R`Nhân với $100$: $35\%$.`, R`Multiply by $100$: $35\%$.`),
      ],
      ket: b(R`Chiếm $35\%$ số bạn trong lớp.`, R`They make up $35\%$ of the class.`),
      checks: [{ expr: "Rational(14,40)*100", expect: "35" }],
    },
    mistake: b(R`Chia ngược: lấy số chuẩn chia cho số cần so sánh.`, R`Dividing the wrong way round: the base by the compared number.`),
    drill: { prompt: b(R`Số $18$ trên $60$ bằng bao nhiêu phần trăm?`, R`What percentage is $18$ of $60$?`), answer: b(R`Bằng $30\%$.`, R`It is $30\%$.`), checks: [{ expr: "Rational(18,60)*100", expect: "30" }] },
  },
  {
    name: b(R`Diện tích tam giác và hình thang`, R`Area of triangles and trapeziums`),
    spot: b(R`Đề cho đáy và chiều cao, hoặc hai đáy và chiều cao.`, R`The problem gives a base and height, or two bases and a height.`),
    method: [
      b(R`Tam giác: diện tích bằng đáy nhân chiều cao rồi chia $2$.`, R`Triangle: area is base times height, divided by $2$.`),
      b(R`Hình thang: lấy tổng hai đáy nhân chiều cao rồi chia $2$.`, R`Trapezium: sum of the two bases times the height, divided by $2$.`),
    ],
    example: {
      prompt: b(R`Hình thang có hai đáy $8$ m và $12$ m, chiều cao $5$ m. Diện tích bằng bao nhiêu?`, R`A trapezium has bases of $8$ m and $12$ m and a height of $5$ m. What is its area?`),
      steps: [
        b(R`Tổng hai đáy là $8+12=20$ m.`, R`The two bases add up to $8+12=20$ m.`),
        b(R`Diện tích là $20\times 5:2=50$ mét vuông.`, R`The area is $20\times 5:2=50$ square metres.`),
      ],
      ket: b(R`Diện tích bằng $50$ mét vuông.`, R`The area is $50$ square metres.`),
      checks: [{ expr: "(8+12)*5/2", expect: "50" }],
    },
    mistake: b(R`Dùng cạnh bên thay cho chiều cao.`, R`Using a slanting side instead of the height.`),
    drill: { prompt: b(R`Tam giác có đáy $10$ cm và chiều cao $6$ cm. Diện tích là bao nhiêu?`, R`A triangle has base $10$ cm and height $6$ cm. What is its area?`), answer: b(R`Bằng $30$ xentimét vuông.`, R`It is $30$ square centimetres.`), checks: [{ expr: "10*6/2", expect: "30" }] },
  },
  {
    name: b(R`Chu vi và diện tích hình tròn`, R`Circumference and area of a circle`),
    spot: b(R`Có hình tròn, bánh xe, bàn tròn, cho bán kính hoặc đường kính.`, R`A circle, wheel or round table, given its radius or diameter.`),
    method: [
      b(R`Nếu cho đường kính thì chia $2$ để có bán kính.`, R`If the diameter is given, divide it by $2$ to get the radius.`),
      b(R`Chu vi bằng $2\times 3{,}14\times r$, diện tích bằng $3{,}14\times r\times r$.`, R`Circumference is $2\times 3.14\times r$, area is $3.14\times r\times r$.`),
    ],
    example: {
      prompt: b(R`Một bàn tròn có đường kính $1{,}2$ m. Tính diện tích mặt bàn, lấy $3{,}14$.`, R`A round table has a diameter of $1.2$ m. Find its area, using $3.14$.`),
      steps: [
        b(R`Bán kính là $1{,}2:2=0{,}6$ m.`, R`The radius is $1.2:2=0.6$ m.`),
        b(R`Diện tích là $3{,}14\times 0{,}6\times 0{,}6=1{,}1304$ mét vuông.`, R`The area is $3.14\times 0.6\times 0.6=1.1304$ square metres.`),
      ],
      ket: b(R`Diện tích mặt bàn là $1{,}1304$ mét vuông.`, R`The table top has an area of $1.1304$ square metres.`),
      checks: [{ expr: "Rational(314,100)*Rational(6,10)*Rational(6,10)", expect: "Rational(11304,10000)" }],
    },
    mistake: b(R`Dùng đường kính thay cho bán kính trong công thức diện tích.`, R`Using the diameter instead of the radius in the area formula.`),
    drill: { prompt: b(R`Hình tròn bán kính $10$ cm có chu vi bao nhiêu, lấy $3{,}14$?`, R`What is the circumference of a circle of radius $10$ cm, using $3.14$?`), answer: b(R`Bằng $62{,}8$ xentimét.`, R`It is $62.8$ centimetres.`), checks: [{ expr: "2*Rational(314,100)*10", expect: "Rational(628,10)" }] },
  },
  {
    name: b(R`Thể tích hình hộp chữ nhật và hình lập phương`, R`Volume of a cuboid and a cube`),
    spot: b(R`Đề hỏi bể chứa, thùng chứa bao nhiêu lít hoặc xentimét khối.`, R`The problem asks how much a tank or box holds, in litres or cubic centimetres.`),
    method: [
      b(R`Nhân ba kích thước: dài, rộng, cao (đều cùng đơn vị).`, R`Multiply the three dimensions: length, width, height (all in the same unit).`),
      b(R`Đổi đơn vị nếu cần: $1$ dm³ là $1$ lít, $1$ m³ là $1000$ lít.`, R`Change units if needed: $1$ dm³ is $1$ litre, $1$ m³ is $1000$ litres.`),
    ],
    example: {
      prompt: b(R`Một bể dài $3$ m, rộng $2$ m, cao $1{,}5$ m. Bể chứa được bao nhiêu lít nước?`, R`A tank is $3$ m long, $2$ m wide and $1.5$ m high. How many litres of water can it hold?`),
      steps: [
        b(R`Thể tích là $3\times 2\times 1{,}5=9$ mét khối.`, R`The volume is $3\times 2\times 1.5=9$ cubic metres.`),
        b(R`Một mét khối là $1000$ lít, nên bể chứa $9000$ lít.`, R`One cubic metre is $1000$ litres, so the tank holds $9000$ litres.`),
      ],
      ket: b(R`Bể chứa được $9000$ lít nước.`, R`The tank holds $9000$ litres of water.`),
      checks: [{ expr: "3*2*Rational(3,2)*1000", expect: "9000" }],
    },
    mistake: b(R`Ghi đơn vị thể tích là xentimét vuông.`, R`Writing the unit of volume as square centimetres.`),
    drill: { prompt: b(R`Hình lập phương cạnh $5$ cm có thể tích bao nhiêu?`, R`What is the volume of a cube with edge $5$ cm?`), answer: b(R`Bằng $125$ xentimét khối.`, R`It is $125$ cubic centimetres.`), checks: [{ expr: "5**3", expect: "125" }] },
  },
  {
    name: b(R`Chuyển động đều: quãng đường, vận tốc, thời gian`, R`Steady motion: distance, speed, time`),
    spot: b(R`Đề có xe, người đi, "km/giờ", gặp nhau, đuổi kịp.`, R`Cars or walkers, "km per hour", meeting or catching up.`),
    method: [
      b(R`Nhớ ba công thức: quãng đường bằng vận tốc nhân thời gian, và hai công thức suy ra.`, R`Remember the three links: distance is speed times time, and the two that follow.`),
      b(R`Đổi thời gian về giờ khi vận tốc tính theo kilômét giờ.`, R`Change time to hours when speed is in kilometres per hour.`),
    ],
    example: {
      prompt: b(R`Một xe máy đi $90$ km hết $2$ giờ $30$ phút. Vận tốc của xe là bao nhiêu km/giờ?`, R`A motorbike travels $90$ km in $2$ hours $30$ minutes. What is its speed in km per hour?`),
      steps: [
        b(R`Đổi $2$ giờ $30$ phút thành $2{,}5$ giờ.`, R`Change $2$ hours $30$ minutes to $2.5$ hours.`),
        b(R`Vận tốc là $90:2{,}5=36$ km/giờ.`, R`The speed is $90:2.5=36$ km per hour.`),
      ],
      ket: b(R`Vận tốc của xe là $36$ km/giờ.`, R`The speed is $36$ km per hour.`),
      checks: [{ expr: "90/Rational(5,2)", expect: "36" }],
    },
    mistake: b(R`Viết $2$ giờ $30$ phút thành $2{,}30$ giờ.`, R`Writing $2$ hours $30$ minutes as $2.30$ hours.`),
    drill: { prompt: b(R`Xe đi với vận tốc $48$ km/giờ trong $3$ giờ. Quãng đường là bao nhiêu?`, R`A car goes at $48$ km per hour for $3$ hours. How far does it travel?`), answer: b(R`Bằng $144$ km.`, R`It is $144$ km.`), checks: [{ expr: "48*3", expect: "144" }] },
  },
  {
    name: b(R`Tìm hai số khi biết tổng và tỉ số`, R`Finding two numbers from their sum and ratio`),
    spot: b(R`Đề cho tổng và nói số này bằng một phân số của số kia.`, R`The problem gives the sum and says one number is a fraction of the other.`),
    method: [
      b(R`Vẽ sơ đồ theo số phần bằng nhau của từng số.`, R`Draw a diagram with the equal parts of each number.`),
      b(R`Lấy tổng chia cho tổng số phần được một phần, rồi nhân với số phần của mỗi số.`, R`Divide the sum by the total number of parts to get one part, then multiply by each number's parts.`),
    ],
    example: {
      prompt: b(R`Hai số có tổng $72$ và số bé bằng $\frac{1}{3}$ số lớn. Tìm hai số.`, R`Two numbers have sum $72$ and the smaller is $\frac{1}{3}$ of the bigger. Find them.`),
      steps: [
        b(R`Số bé là $1$ phần, số lớn là $3$ phần, tổng là $4$ phần.`, R`The smaller is $1$ part, the bigger is $3$ parts, $4$ parts in all.`),
        b(R`Một phần là $72:4=18$; số bé $18$, số lớn $18\times 3=54$.`, R`One part is $72:4=18$; the smaller is $18$ and the bigger is $18\times 3=54$.`),
      ],
      ket: b(R`Hai số là $18$ và $54$.`, R`The two numbers are $18$ and $54$.`),
      checks: [{ expr: "72/4", expect: "18" }, { expr: "72/4*3", expect: "54" }],
    },
    mistake: b(R`Chia tổng cho mẫu số của tỉ số.`, R`Dividing the sum by the denominator of the ratio.`),
    drill: { prompt: b(R`Hai số có tổng $60$ và số bé bằng $\frac{2}{3}$ số lớn. Số lớn là bao nhiêu?`, R`Two numbers have sum $60$ and the smaller is $\frac{2}{3}$ of the bigger. What is the bigger number?`), answer: b(R`Số lớn là $36$.`, R`The bigger number is $36$.`), checks: [{ expr: "60/5*3", expect: "36" }] },
  },
  {
    name: b(R`Tìm hai số khi biết hiệu và tỉ số`, R`Finding two numbers from their difference and ratio`),
    spot: b(R`Đề cho hơn kém nhau bao nhiêu và nói số này bằng một phân số của số kia.`, R`The problem gives how much one exceeds the other and says one number is a fraction of the other.`),
    method: [
      b(R`Vẽ sơ đồ theo số phần bằng nhau và tìm hiệu số phần.`, R`Draw a diagram with equal parts and find the difference in parts.`),
      b(R`Lấy hiệu chia cho hiệu số phần được một phần, rồi nhân với số phần của mỗi số.`, R`Divide the difference by the difference in parts to get one part, then multiply by each number's parts.`),
    ],
    example: {
      prompt: b(R`Cha hơn con $28$ tuổi, tuổi con bằng $\frac{1}{5}$ tuổi cha. Tính tuổi mỗi người.`, R`A father is $28$ years older than his child, and the child's age is $\frac{1}{5}$ of his. Find each age.`),
      steps: [
        b(R`Con $1$ phần, cha $5$ phần, hiệu là $4$ phần ứng với $28$ tuổi.`, R`The child is $1$ part and the father $5$ parts; the difference of $4$ parts is $28$ years.`),
        b(R`Một phần là $28:4=7$; con $7$ tuổi, cha $35$ tuổi.`, R`One part is $28:4=7$; the child is $7$ and the father is $35$.`),
      ],
      ket: b(R`Con $7$ tuổi, cha $35$ tuổi.`, R`The child is $7$ and the father is $35$.`),
      checks: [{ expr: "28/4", expect: "7" }, { expr: "28/4*5", expect: "35" }],
    },
    mistake: b(R`Chia hiệu cho tổng số phần như bài tổng và tỉ.`, R`Dividing the difference by the total parts as in a sum-and-ratio problem.`),
    drill: { prompt: b(R`Hai số hơn kém nhau $12$ và số bé bằng $\frac{2}{5}$ số lớn. Số lớn bằng bao nhiêu?`, R`Two numbers differ by $12$ and the smaller is $\frac{2}{5}$ of the bigger. What is the bigger number?`), answer: b(R`Số lớn là $20$.`, R`The bigger number is $20$.`), checks: [{ expr: "12/3*5", expect: "20" }] },
  },
  {
    name: b(R`Đọc biểu đồ hình quạt`, R`Reading a pie chart`),
    spot: b(R`Đề cho biểu đồ hình tròn chia thành các phần ghi phần trăm, rồi hỏi số lượng của một phần.`, R`The problem gives a circle chart split into percentage parts and asks for the amount in one part.`),
    method: [
      b(R`Cộng các phần trăm đã biết, rồi lấy $100\%$ trừ đi để tìm phần còn lại.`, R`Add the known percentages, then take them from $100\%$ to find the remaining part.`),
      b(R`Số lượng của một phần bằng tổng nhân phần trăm của phần đó.`, R`The amount in a part is the total times the percentage of that part.`),
    ],
    example: {
      prompt: b(R`Lớp có $40$ bạn. Biểu đồ cho $45\%$ thích bóng đá, $30\%$ thích bơi, còn lại thích cờ vua. Có bao nhiêu bạn thích cờ vua?`, R`A class has $40$ pupils. The chart shows $45\%$ like football, $30\%$ like swimming and the rest like chess. How many like chess?`),
      steps: [
        b(R`Cờ vua chiếm $100\%-45\%-30\%=25\%$.`, R`Chess takes $100\%-45\%-30\%=25\%$.`),
        b(R`Số bạn là $40\times0{,}25=10$.`, R`The number of pupils is $40\times0.25=10$.`),
      ],
      ket: b(R`Vậy có $10$ bạn thích cờ vua.`, R`So $10$ pupils like chess.`),
      checks: [{ expr: "100-45-30", expect: "25" }, { expr: "40*Rational(25,100)", expect: "10" }],
    },
    mistake: b(R`Quên rằng các phần cộng lại là $100\%$ nên bỏ sót phần còn lại.`, R`Forgetting that the parts add up to $100\%$ and missing the remaining part.`),
    drill: { prompt: b(R`Có $200$ em, biểu đồ cho $15\%$ đi xe buýt. Bao nhiêu em đi xe buýt?`, R`There are $200$ pupils and the chart shows $15\%$ take the bus. How many take the bus?`), answer: b(R`Vậy có $30$ em đi xe buýt.`, R`So $30$ pupils take the bus.`), checks: [{ expr: "200*Rational(15,100)", expect: "30" }] },
  },
];

export default lop05;
