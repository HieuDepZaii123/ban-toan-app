import type { GradeDang } from "./types.ts";
import { b } from "./types.ts";

const R = String.raw;

const lop03: GradeDang[] = [
  {
    name: b(R`Nhân số có hai chữ số với số có một chữ số`, R`Multiplying a two-digit number by a one-digit number`),
    spot: b(R`Đề có nhiều nhóm bằng nhau, mỗi nhóm có hai chữ số đồ vật.`, R`The problem has several equal groups, each with a two-digit number of things.`),
    method: [
      b(R`Nhân hàng đơn vị trước, viết chữ số đơn vị và nhớ phần chục.`, R`Multiply the ones first, write the ones digit and carry the tens part.`),
      b(R`Nhân hàng chục rồi cộng thêm số nhớ.`, R`Multiply the tens, then add the carried digit.`),
    ],
    example: {
      prompt: b(R`Mỗi hộp có $34$ viên kẹo. $3$ hộp có bao nhiêu viên?`, R`Each box has $34$ sweets. How many sweets are in $3$ boxes?`),
      steps: [
        b(R`Hàng đơn vị: $4\times 3=12$, viết $2$ nhớ $1$.`, R`Ones: $4\times 3=12$, write $2$ and carry $1$.`),
        b(R`Hàng chục: $3\times 3=9$, thêm $1$ là $10$. Vậy $34\times 3=102$.`, R`Tens: $3\times 3=9$, plus $1$ is $10$. So $34\times 3=102$.`),
      ],
      ket: b(R`Ba hộp có $102$ viên kẹo.`, R`Three boxes have $102$ sweets.`),
      checks: [{ expr: "34*3", expect: "102" }],
    },
    mistake: b(R`Quên cộng số nhớ vào tích hàng chục.`, R`Forgetting to add the carried digit to the tens product.`),
    drill: { prompt: b(R`Tính $26\times 4$.`, R`Work out $26\times 4$.`), answer: b(R`Kết quả là $104$.`, R`The result is $104$.`), checks: [{ expr: "26*4", expect: "104" }] },
  },
  {
    name: b(R`Chia số có ba chữ số cho số có một chữ số`, R`Dividing a three-digit number by a one-digit number`),
    spot: b(R`Chia đều một số lớn thành vài phần, hoặc hỏi cần mấy nhóm.`, R`Sharing a big number into a few parts, or asking how many groups are needed.`),
    method: [
      b(R`Chia từ hàng trăm xuống hàng đơn vị; phần dư ở mỗi hàng ghép với chữ số kế tiếp.`, R`Divide from the hundreds down to the ones; the remainder at each place joins the next digit.`),
      b(R`Thử lại bằng phép nhân: thương nhân số chia cộng số dư phải bằng số bị chia.`, R`Check by multiplying: quotient times divisor plus remainder must equal the dividend.`),
    ],
    example: {
      prompt: b(R`Tính $492:4$.`, R`Work out $492:4$.`),
      steps: [
        b(R`Chia hàng trăm: $4:4=1$, dư $0$. Hạ $9$ chia $4$ được $2$ dư $1$.`, R`Hundreds: $4:4=1$, remainder $0$. Bring down $9$, which divided by $4$ is $2$ remainder $1$.`),
        b(R`Hạ $2$ được $12$, $12:4=3$. Thương là $123$.`, R`Bring down $2$ to get $12$, and $12:4=3$. The quotient is $123$.`),
      ],
      ket: b(R`Ta có $492:4=123$.`, R`We have $492:4=123$.`),
      checks: [{ expr: "492/4", expect: "123" }],
    },
    mistake: b(R`Bỏ chữ số $0$ trong thương khi một hàng không đủ chia.`, R`Leaving out a $0$ in the quotient when a place is too small to divide.`),
    drill: { prompt: b(R`Tính $756:6$.`, R`Work out $756:6$.`), answer: b(R`Thương bằng $126$.`, R`The quotient is $126$.`), checks: [{ expr: "756/6", expect: "126" }] },
  },
  {
    name: b(R`Phép chia có dư`, R`Division with a remainder`),
    spot: b(R`Số bị chia không chia hết cho số chia, hoặc hỏi "còn thừa", "cần thêm".`, R`The dividend does not divide exactly, or the problem asks what is left over or needed.`),
    method: [
      b(R`Tìm thương lớn nhất sao cho tích với số chia chưa vượt số bị chia.`, R`Find the biggest quotient whose product with the divisor does not exceed the dividend.`),
      b(R`Số dư bằng số bị chia trừ tích, và phải nhỏ hơn số chia.`, R`The remainder is the dividend minus that product, and it must be smaller than the divisor.`),
    ],
    example: {
      prompt: b(R`Có $23$ quả cam xếp vào các túi, mỗi túi $5$ quả. Được mấy túi đầy và còn thừa mấy quả?`, R`There are $23$ oranges put into bags of $5$. How many full bags are there and how many oranges are left over?`),
      steps: [
        b(R`Ta có $5\times 4=20$ và $5\times 5=25$ vượt $23$, nên thương là $4$.`, R`We have $5\times 4=20$ and $5\times 5=25$ is more than $23$, so the quotient is $4$.`),
        b(R`Số dư là $23-20=3$, nhỏ hơn $5$.`, R`The remainder is $23-20=3$, which is less than $5$.`),
      ],
      ket: b(R`Được $4$ túi đầy và thừa $3$ quả.`, R`There are $4$ full bags and $3$ oranges left over.`),
      checks: [{ expr: "23//5", expect: "4" }, { expr: "23%5", expect: "3" }],
    },
    mistake: b(R`Để số dư lớn hơn hoặc bằng số chia.`, R`Leaving a remainder that is as big as or bigger than the divisor.`),
    drill: { prompt: b(R`Tính $29:6$. Thương và số dư là bao nhiêu?`, R`Work out $29:6$. What are the quotient and remainder?`), answer: b(R`Thương $4$, dư $5$.`, R`Quotient $4$, remainder $5$.`), checks: [{ expr: "29//6", expect: "4" }, { expr: "29%6", expect: "5" }] },
  },
  {
    name: b(R`Làm tròn số đến hàng chục và hàng trăm`, R`Rounding to the nearest ten and hundred`),
    spot: b(R`Đề hỏi "khoảng bao nhiêu" hoặc làm tròn số.`, R`The problem asks "about how many" or to round a number.`),
    method: [
      b(R`Xác định hàng cần làm tròn rồi nhìn chữ số ngay bên phải nó.`, R`Find the place to round to and look at the digit just to its right.`),
      b(R`Từ $5$ trở lên thì tăng hàng đó thêm $1$, nhỏ hơn $5$ thì giữ nguyên; các hàng bên phải thành $0$.`, R`From $5$ upwards, add $1$ to that place; below $5$, keep it; the places on the right become $0$.`),
    ],
    example: {
      prompt: b(R`Làm tròn $847$ đến hàng chục và đến hàng trăm.`, R`Round $847$ to the nearest ten and to the nearest hundred.`),
      steps: [
        b(R`Đến hàng chục: chữ số đơn vị là $7\ge 5$ nên được $850$.`, R`To the nearest ten: the ones digit is $7\ge 5$, giving $850$.`),
        b(R`Đến hàng trăm: chữ số hàng chục là $4<5$ nên được $800$.`, R`To the nearest hundred: the tens digit is $4<5$, giving $800$.`),
      ],
      ket: b(R`Làm tròn thành $850$ và $800$.`, R`It rounds to $850$ and $800$.`),
      checks: [{ expr: "850-847", expect: "3" }, { expr: "847-800", expect: "47" }],
    },
    mistake: b(R`Nhìn nhầm chữ số: làm tròn đến hàng trăm mà lại nhìn hàng đơn vị.`, R`Looking at the wrong digit: rounding to hundreds but looking at the ones.`),
    drill: { prompt: b(R`Làm tròn $3\,562$ đến hàng trăm.`, R`Round $3\,562$ to the nearest hundred.`), answer: b(R`Được $3\,600$.`, R`It is $3\,600$.`), checks: [{ expr: "3600-3562", expect: "38" }] },
  },
  {
    name: b(R`Tìm một phần mấy của một số`, R`Finding a fraction of a number`),
    spot: b(R`Đề có "một phần hai", "một phần ba", "một phần tư" của một số.`, R`The problem has "one half", "one third", "one quarter" of a number.`),
    method: [
      b(R`Chia số đó thành số phần bằng nhau theo mẫu số.`, R`Split the number into the number of equal parts given by the denominator.`),
      b(R`Mỗi phần là một phần mấy cần tìm; nhân lên nếu lấy nhiều phần.`, R`Each part is the fraction asked for; multiply if several parts are taken.`),
    ],
    example: {
      prompt: b(R`Một phần tư của $36$ quả táo là bao nhiêu quả?`, R`What is one quarter of $36$ apples?`),
      steps: [
        b(R`Một phần tư nghĩa là chia thành $4$ phần bằng nhau.`, R`One quarter means splitting into $4$ equal parts.`),
        b(R`Mỗi phần có $36:4=9$ quả.`, R`Each part has $36:4=9$ apples.`),
      ],
      ket: b(R`Vậy một phần tư của $36$ quả là $9$ quả.`, R`One quarter of $36$ apples is $9$ apples.`),
      checks: [{ expr: "36/4", expect: "9" }],
    },
    mistake: b(R`Chia cho số phần nhỏ hơn hoặc nhân thay vì chia.`, R`Dividing by the wrong number of parts or multiplying instead of dividing.`),
    drill: { prompt: b(R`Một phần năm của $45$ là bao nhiêu?`, R`What is one fifth of $45$?`), answer: b(R`Bằng $9$.`, R`It is $9$.`), checks: [{ expr: "45/5", expect: "9" }] },
  },
  {
    name: b(R`Chu vi hình chữ nhật và hình vuông`, R`Perimeter of rectangles and squares`),
    spot: b(R`Đề hỏi hàng rào, đường viền, hay độ dài đi một vòng quanh hình.`, R`The problem asks about a fence, a border, or the distance once round a shape.`),
    method: [
      b(R`Hình chữ nhật: cộng chiều dài với chiều rộng rồi nhân $2$.`, R`Rectangle: add the length and width, then multiply by $2$.`),
      b(R`Hình vuông: lấy cạnh nhân $4$.`, R`Square: multiply the side by $4$.`),
    ],
    example: {
      prompt: b(R`Mảnh đất hình chữ nhật dài $12$ m, rộng $8$ m. Rào quanh mảnh đất cần bao nhiêu mét hàng rào?`, R`A rectangular plot is $12$ m long and $8$ m wide. How many metres of fence go round it?`),
      steps: [
        b(R`Chiều dài cộng chiều rộng: $12+8=20$ m.`, R`Length plus width: $12+8=20$ m.`),
        b(R`Chu vi là $20\times 2=40$ m.`, R`The perimeter is $20\times 2=40$ m.`),
      ],
      ket: b(R`Cần $40$ mét hàng rào.`, R`You need $40$ metres of fence.`),
      checks: [{ expr: "(12+8)*2", expect: "40" }],
    },
    mistake: b(R`Chỉ cộng một chiều dài với một chiều rộng, mới đi nửa vòng.`, R`Adding only one length and one width, which is only half way round.`),
    drill: { prompt: b(R`Hình vuông có cạnh $7$ cm. Chu vi bằng bao nhiêu?`, R`A square has sides of $7$ cm. What is its perimeter?`), answer: b(R`Chu vi bằng $28$ xentimét.`, R`The perimeter is $28$ centimetres.`), checks: [{ expr: "7*4", expect: "28" }] },
  },
  {
    name: b(R`Diện tích hình chữ nhật và hình vuông`, R`Area of rectangles and squares`),
    spot: b(R`Đề hỏi lát gạch, phủ kín, hoặc số ô vuông; đơn vị là xentimét vuông.`, R`The problem asks about tiling, covering, or the number of squares; the unit is square centimetres.`),
    method: [
      b(R`Hình chữ nhật: nhân chiều dài với chiều rộng.`, R`Rectangle: multiply the length by the width.`),
      b(R`Hình vuông: nhân cạnh với chính nó; ghi đơn vị vuông.`, R`Square: multiply the side by itself; write a square unit.`),
    ],
    example: {
      prompt: b(R`Một tờ giấy hình chữ nhật dài $9$ cm, rộng $4$ cm. Diện tích tờ giấy là bao nhiêu?`, R`A rectangular sheet of paper is $9$ cm long and $4$ cm wide. What is its area?`),
      steps: [
        b(R`Diện tích bằng chiều dài nhân chiều rộng.`, R`Area is length times width.`),
        b(R`Ta có $9\times 4=36$ xentimét vuông.`, R`We have $9\times 4=36$ square centimetres.`),
      ],
      ket: b(R`Diện tích là $36$ xentimét vuông.`, R`The area is $36$ square centimetres.`),
      checks: [{ expr: "9*4", expect: "36" }],
    },
    mistake: b(R`Nhầm diện tích với chu vi và ghi đơn vị xentimét thay vì xentimét vuông.`, R`Mixing up area and perimeter and writing centimetres instead of square centimetres.`),
    drill: { prompt: b(R`Hình vuông cạnh $6$ cm có diện tích bao nhiêu?`, R`What is the area of a square with sides of $6$ cm?`), answer: b(R`Bằng $36$ xentimét vuông.`, R`It is $36$ square centimetres.`), checks: [{ expr: "6*6", expect: "36" }] },
  },
  {
    name: b(R`Đổi các đơn vị độ dài, khối lượng, dung tích`, R`Changing units of length, mass and capacity`),
    spot: b(R`Đề trộn hai đơn vị như kilôgam và gam, lít và mililít.`, R`The problem mixes two units such as kilograms and grams, litres and millilitres.`),
    method: [
      b(R`Nhớ $1$ kilôgam là $1000$ gam, $1$ lít là $1000$ mililít, $1$ kilômét là $1000$ mét.`, R`Remember $1$ kilogram is $1000$ grams, $1$ litre is $1000$ millilitres, $1$ kilometre is $1000$ metres.`),
      b(R`Đổi về cùng đơn vị nhỏ hơn rồi mới cộng hoặc trừ.`, R`Change to the smaller unit before adding or subtracting.`),
    ],
    example: {
      prompt: b(R`Một túi gạo nặng $2$ kg $300$ g. Túi nặng bao nhiêu gam?`, R`A bag of rice weighs $2$ kg $300$ g. How many grams is that?`),
      steps: [
        b(R`Đổi $2$ kg thành $2\times 1000=2000$ g.`, R`Change $2$ kg to $2\times 1000=2000$ g.`),
        b(R`Cộng $300$ g: $2000+300=2300$ g.`, R`Add $300$ g: $2000+300=2300$ g.`),
      ],
      ket: b(R`Túi gạo nặng $2300$ gam.`, R`The bag of rice weighs $2300$ grams.`),
      checks: [{ expr: "2*1000+300", expect: "2300" }],
    },
    mistake: b(R`Nhân với $100$ thay vì $1000$.`, R`Multiplying by $100$ instead of $1000$.`),
    drill: { prompt: b(R`Đổi $3$ lít ra mililít.`, R`Change $3$ litres to millilitres.`), answer: b(R`Bằng $3000$ mililít.`, R`It is $3000$ millilitres.`), checks: [{ expr: "3*1000", expect: "3000" }] },
  },
  {
    name: b(R`Bài toán gấp lên và giảm đi một số lần`, R`Problems about times as many and times fewer`),
    spot: b(R`Có từ "gấp … lần", "giảm đi … lần".`, R`The words "times as many" or "times fewer" appear.`),
    method: [
      b(R`Gấp lên một số lần thì làm phép nhân.`, R`"Times as many" means multiplying.`),
      b(R`Giảm đi một số lần thì làm phép chia.`, R`"Times fewer" means dividing.`),
    ],
    example: {
      prompt: b(R`Thùng nhỏ có $8$ lít dầu. Thùng to gấp $4$ lần thùng nhỏ. Thùng to có bao nhiêu lít?`, R`The small can holds $8$ litres of oil. The big can holds $4$ times as much. How many litres does the big can hold?`),
      steps: [
        b(R`Gấp $4$ lần nên làm phép nhân $8\times 4$.`, R`Times $4$ as much means multiplying: $8\times 4$.`),
        b(R`Ta có $8\times 4=32$ lít.`, R`We have $8\times 4=32$ litres.`),
      ],
      ket: b(R`Thùng to có $32$ lít dầu.`, R`The big can holds $32$ litres of oil.`),
      checks: [{ expr: "8*4", expect: "32" }],
    },
    mistake: b(R`Cộng thêm $4$ thay vì gấp lên $4$ lần.`, R`Adding $4$ instead of multiplying by $4$.`),
    drill: { prompt: b(R`Bao gạo to nặng $48$ kg, gấp $6$ lần bao gạo nhỏ. Bao nhỏ nặng bao nhiêu kg?`, R`A big sack of rice weighs $48$ kg, which is $6$ times the small sack. How many kg does the small sack weigh?`), answer: b(R`Bao nhỏ nặng $8$ kg.`, R`The small sack weighs $8$ kg.`), checks: [{ expr: "48/6", expect: "8" }] },
  },
  {
    name: b(R`Xếp loại các việc: chắc chắn, có thể, không thể`, R`Sorting events: certain, possible, impossible`),
    spot: b(R`Đề cho một túi hoặc một con xúc xắc và hỏi một việc thuộc loại nào.`, R`The problem gives a bag or a die and asks what kind of event something is.`),
    method: [
      b(R`Liệt kê mọi kết quả có thể xảy ra.`, R`List every result that can happen.`),
      b(R`Mọi kết quả đều thuận thì chắc chắn, không kết quả nào thuận thì không thể, còn lại là có thể.`, R`If every result fits it is certain, if none fits it is impossible, otherwise it is possible.`),
    ],
    example: {
      prompt: b(R`Hộp có $3$ bi đỏ và $2$ bi xanh. Rút một bi. Việc rút được bi vàng thuộc loại nào?`, R`A box has $3$ red and $2$ blue marbles. One is drawn. What kind of event is drawing a yellow marble?`),
      steps: [
        b(R`Các kết quả có thể là bi đỏ hoặc bi xanh.`, R`The possible results are red or blue.`),
        b(R`Không có kết quả nào là bi vàng nên việc đó không thể xảy ra.`, R`No result is yellow, so it cannot happen.`),
      ],
      ket: b(R`Rút được bi vàng là việc không thể.`, R`Drawing a yellow marble is impossible.`),
      checks: [{ expr: "3+2", expect: "5" }],
    },
    mistake: b(R`Coi việc rất dễ xảy ra là chắc chắn.`, R`Calling a very likely event certain.`),
    drill: { prompt: b(R`Gieo một xúc xắc sáu mặt. Việc ra mặt có số chấm bé hơn $7$ thuộc loại nào?`, R`A six-sided die is rolled. What kind of event is a face with fewer than $7$ dots?`), answer: b(R`Đó là việc chắc chắn.`, R`It is certain.`), checks: [{ expr: "6+1", expect: "7" }] },
  },
];

export default lop03;
