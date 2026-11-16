import type { GradeDang } from "./types.ts";
import { b } from "./types.ts";

const R = String.raw;

const lop01: GradeDang[] = [
  {
    name: b(R`Đếm thêm và đếm bớt trong phạm vi 10`, R`Counting on and counting back within 10`),
    spot: b(R`Đề cho một số và hỏi số đứng ngay sau hoặc ngay trước nó.`, R`The problem gives a number and asks for the number right after or right before it.`),
    method: [
      b(R`Đọc dãy số từ đầu cho tới số đã cho, chỉ tay vào từng số.`, R`Say the numbers from the start up to the given number, pointing at each one.`),
      b(R`Đếm thêm một bước để lấy số sau, lùi một bước để lấy số trước.`, R`Count one step forward for the next number, one step back for the previous number.`),
    ],
    example: {
      prompt: b(R`Số nào đứng ngay sau $6$ và số nào đứng ngay trước $6$?`, R`Which number comes right after $6$ and which comes right before $6$?`),
      steps: [
        b(R`Đếm thêm một từ $6$ được $7$, vì sau sáu là bảy.`, R`Counting on one from $6$ gives $7$, because seven comes after six.`),
        b(R`Đếm lùi một từ $6$ được $5$, vì trước sáu là năm.`, R`Counting back one from $6$ gives $5$, because five comes before six.`),
      ],
      ket: b(R`Số đứng sau là $7$ và số đứng trước là $5$.`, R`The number after is $7$ and the number before is $5$.`),
      checks: [{ expr: "6+1", expect: "7" }, { expr: "6-1", expect: "5" }],
    },
    mistake: b(R`Đếm luôn cả số đang có, nên bị lệch một số.`, R`Counting the number you already have, which makes the answer one off.`),
    drill: { prompt: b(R`Số nào đứng ngay sau $9$?`, R`Which number comes right after $9$?`), answer: b(R`Số $10$.`, R`The number $10$.`), checks: [{ expr: "9+1", expect: "10" }] },
  },
  {
    name: b(R`So sánh hai số trong phạm vi 10`, R`Comparing two numbers within 10`),
    spot: b(R`Đề hỏi số nào lớn hơn, bé hơn, hoặc cần điền dấu $>$, $<$, $=$.`, R`The problem asks which number is greater or smaller, or to fill in $>$, $<$, $=$.`),
    method: [
      b(R`Xem số nào đứng sau khi đếm thì số đó lớn hơn.`, R`See which number comes later when counting; that number is greater.`),
      b(R`Viết dấu sao cho đầu nhọn chỉ vào số bé.`, R`Write the sign so that its point faces the smaller number.`),
    ],
    example: {
      prompt: b(R`Điền dấu vào chỗ trống: $4\ \square\ 7$.`, R`Fill in the sign: $4\ \square\ 7$.`),
      steps: [
        b(R`Khi đếm, số $7$ đến sau số $4$, nên $4$ bé hơn $7$.`, R`When counting, $7$ comes after $4$, so $4$ is smaller than $7$.`),
        b(R`Đầu nhọn của dấu chỉ vào số $4$, nên viết $4<7$.`, R`The point of the sign faces $4$, so write $4<7$.`),
      ],
      ket: b(R`Dấu cần điền là $<$, tức $4<7$.`, R`The sign to fill in is $<$, so $4<7$.`),
      checks: [{ expr: "Lt(4,7)", expect: "True" }],
    },
    mistake: b(R`Viết ngược dấu vì quên đầu nhọn luôn chỉ vào số bé.`, R`Writing the sign the wrong way round, forgetting the point always faces the smaller number.`),
    drill: { prompt: b(R`Điền dấu: $8\ \square\ 3$.`, R`Fill in the sign: $8\ \square\ 3$.`), answer: b(R`Dấu $>$, vì $8>3$.`, R`The sign $>$, because $8>3$.`), checks: [{ expr: "Gt(8,3)", expect: "True" }] },
  },
  {
    name: b(R`Tách một số thành hai số`, R`Splitting a number into two numbers`),
    spot: b(R`Đề cho cả nhóm và một phần, hỏi phần còn lại, hoặc xin các cách tách.`, R`The problem gives the whole group and one part and asks for the other part, or asks for ways to split.`),
    method: [
      b(R`Nhớ rằng hai phần gộp lại phải được đúng cả nhóm.`, R`Remember the two parts together must make exactly the whole group.`),
      b(R`Đếm tiếp từ phần đã biết cho tới cả nhóm; số bước là phần còn lại.`, R`Count on from the known part up to the whole; the number of steps is the other part.`),
    ],
    example: {
      prompt: b(R`Số $9$ tách thành $5$ và mấy?`, R`The number $9$ splits into $5$ and what?`),
      steps: [
        b(R`Đếm tiếp từ $5$ tới $9$: sáu, bảy, tám, chín, là bốn bước.`, R`Count on from $5$ to $9$: six, seven, eight, nine, which is four steps.`),
        b(R`Thử lại: $5$ gộp với $4$ được $9$.`, R`Check: $5$ and $4$ together make $9$.`),
      ],
      ket: b(R`Số $9$ tách thành $5$ và $4$.`, R`The number $9$ splits into $5$ and $4$.`),
      checks: [{ expr: "9-5", expect: "4" }],
    },
    mistake: b(R`Chỉ nhớ một cách tách, bỏ sót các cách khác.`, R`Remembering only one way to split and missing the others.`),
    drill: { prompt: b(R`Số $10$ tách thành $6$ và mấy?`, R`The number $10$ splits into $6$ and what?`), answer: b(R`Tách thành $6$ và $4$.`, R`It splits into $6$ and $4$.`), checks: [{ expr: "10-6", expect: "4" }] },
  },
  {
    name: b(R`Bài toán gộp (thêm vào)`, R`Joining problems (putting more in)`),
    spot: b(R`Có từ "thêm", "có tất cả", "cả hai nhóm".`, R`The words "more", "altogether" or "both groups" appear.`),
    method: [
      b(R`Xác định hai nhóm cần gộp và viết số của từng nhóm.`, R`Find the two groups to join and write the number of each.`),
      b(R`Làm phép cộng hai số, rồi trả lời kèm tên đồ vật.`, R`Add the two numbers, then answer with the name of the things.`),
    ],
    example: {
      prompt: b(R`Có $4$ con vịt, thêm $3$ con nữa. Có tất cả mấy con vịt?`, R`There are $4$ ducks and $3$ more come. How many ducks are there altogether?`),
      steps: [
        b(R`Gộp hai nhóm nên làm phép cộng $4+3$.`, R`Joining two groups means adding: $4+3$.`),
        b(R`Đếm tiếp từ $4$ ba bước được $7$.`, R`Counting on three steps from $4$ gives $7$.`),
      ],
      ket: b(R`Có tất cả $7$ con vịt.`, R`There are $7$ ducks altogether.`),
      checks: [{ expr: "4+3", expect: "7" }],
    },
    mistake: b(R`Lấy cả số vịt rồi đếm lại từ $0$ nên bị sai một hai đơn vị.`, R`Starting the count again from $0$ and ending up off by one or two.`),
    drill: { prompt: b(R`Lan có $5$ cái kẹo, mẹ cho thêm $4$ cái. Lan có tất cả mấy cái?`, R`Lan has $5$ sweets and Mum gives her $4$ more. How many does she have altogether?`), answer: b(R`Lan có $9$ cái kẹo.`, R`Lan has $9$ sweets.`), checks: [{ expr: "5+4", expect: "9" }] },
  },
  {
    name: b(R`Bài toán bớt (cho đi, ăn mất)`, R`Taking-away problems (giving away, eating up)`),
    spot: b(R`Có từ "cho", "ăn", "bay đi", "còn lại".`, R`The words "give", "eat", "fly away" or "left" appear.`),
    method: [
      b(R`Xác định số lúc đầu và số bị bớt đi.`, R`Find the starting number and the number taken away.`),
      b(R`Làm phép trừ số đầu trừ số bớt, rồi thử lại bằng phép cộng.`, R`Subtract the taken-away number from the start, then check by adding.`),
    ],
    example: {
      prompt: b(R`Có $8$ quả bóng, bạn Nam lấy đi $3$ quả. Còn mấy quả?`, R`There are $8$ balls and Nam takes $3$ away. How many are left?`),
      steps: [
        b(R`Lấy đi là bớt, nên làm phép trừ $8-3$.`, R`Taking away means subtracting: $8-3$.`),
        b(R`Đếm lùi ba bước từ $8$ được $5$; thử lại $5+3=8$.`, R`Counting back three steps from $8$ gives $5$; check $5+3=8$.`),
      ],
      ket: b(R`Còn $5$ quả bóng.`, R`There are $5$ balls left.`),
      checks: [{ expr: "8-3", expect: "5" }],
    },
    mistake: b(R`Lấy số bé trừ số lớn vì quên số đứng trước dấu trừ là số lúc đầu.`, R`Taking the big number from the small one, forgetting the number before the minus sign is the start.`),
    drill: { prompt: b(R`Trên cây có $9$ con chim, bay đi $4$ con. Còn mấy con?`, R`There are $9$ birds in a tree and $4$ fly away. How many are left?`), answer: b(R`Còn $5$ con chim.`, R`There are $5$ birds left.`), checks: [{ expr: "9-4", expect: "5" }] },
  },
  {
    name: b(R`Tìm số còn thiếu trong phép cộng`, R`Finding the missing number in an addition`),
    spot: b(R`Phép tính có ô trống như $3+\square=8$ hoặc $\square+2=7$.`, R`The sum has a blank like $3+\square=8$ or $\square+2=7$.`),
    method: [
      b(R`Nhớ rằng số cần tìm cộng với số đã biết thì bằng tổng.`, R`Remember the missing number plus the known number makes the total.`),
      b(R`Lấy tổng trừ số đã biết, rồi thay lại ô trống để kiểm tra.`, R`Take the known number from the total, then put it back in the blank to check.`),
    ],
    example: {
      prompt: b(R`Tìm số thích hợp: $3+\square=8$.`, R`Find the missing number: $3+\square=8$.`),
      steps: [
        b(R`Số cần tìm bằng tổng trừ số đã biết: $8-3$.`, R`The missing number is the total minus the known number: $8-3$.`),
        b(R`Tính được $5$; thử lại $3+5=8$.`, R`This gives $5$; check $3+5=8$.`),
      ],
      ket: b(R`Số cần điền là $5$.`, R`The number to fill in is $5$.`),
      checks: [{ expr: "solve(3+x-8,x)[0]", expect: "5" }],
    },
    mistake: b(R`Cộng $3$ với $8$ thay vì trừ.`, R`Adding $3$ and $8$ instead of subtracting.`),
    drill: { prompt: b(R`Tìm số thích hợp: $\square+4=9$.`, R`Find the missing number: $\square+4=9$.`), answer: b(R`Số cần điền là $5$.`, R`The number to fill in is $5$.`), checks: [{ expr: "solve(x+4-9,x)[0]", expect: "5" }] },
  },
  {
    name: b(R`Chục và đơn vị của số có hai chữ số`, R`Tens and ones of a two-digit number`),
    spot: b(R`Đề hỏi một số có mấy chục mấy đơn vị, hoặc viết số từ số chục và số đơn vị.`, R`The problem asks how many tens and ones a number has, or to write a number from its tens and ones.`),
    method: [
      b(R`Chữ số bên trái là số chục, chữ số bên phải là số đơn vị.`, R`The left digit is the tens and the right digit is the ones.`),
      b(R`Giá trị của số bằng số chục nhân $10$ rồi cộng số đơn vị.`, R`The value of the number is the tens times $10$ plus the ones.`),
    ],
    example: {
      prompt: b(R`Viết số gồm $6$ chục và $5$ đơn vị.`, R`Write the number made of $6$ tens and $5$ ones.`),
      steps: [
        b(R`Sáu chục là $60$.`, R`Six tens is $60$.`),
        b(R`Thêm $5$ đơn vị được $60+5=65$.`, R`Adding $5$ ones gives $60+5=65$.`),
      ],
      ket: b(R`Số cần viết là $65$.`, R`The number is $65$.`),
      checks: [{ expr: "6*10+5", expect: "65" }],
    },
    mistake: b(R`Đọc $65$ thành $6$ cộng $5$ bằng $11$, bỏ qua giá trị của hàng chục.`, R`Reading $65$ as $6$ plus $5$ equal to $11$, ignoring the value of the tens place.`),
    drill: { prompt: b(R`Số $47$ có mấy chục và mấy đơn vị?`, R`How many tens and ones does $47$ have?`), answer: b(R`Có $4$ chục và $7$ đơn vị.`, R`It has $4$ tens and $7$ ones.`), checks: [{ expr: "47//10", expect: "4" }, { expr: "47%10", expect: "7" }] },
  },
  {
    name: b(R`So sánh số có hai chữ số`, R`Comparing two-digit numbers`),
    spot: b(R`Đề hỏi số nào lớn hơn trong hai số có hai chữ số, hoặc xếp thứ tự.`, R`The problem asks which of two two-digit numbers is greater, or to put numbers in order.`),
    method: [
      b(R`So số chục trước; số nào nhiều chục hơn thì lớn hơn.`, R`Compare the tens first; the number with more tens is greater.`),
      b(R`Khi số chục bằng nhau thì mới so số đơn vị.`, R`Only when the tens are equal, compare the ones.`),
    ],
    example: {
      prompt: b(R`So sánh $63$ và $58$.`, R`Compare $63$ and $58$.`),
      steps: [
        b(R`Số $63$ có $6$ chục, số $58$ có $5$ chục.`, R`The number $63$ has $6$ tens and $58$ has $5$ tens.`),
        b(R`Vì $6>5$ nên $63>58$, dù $8$ lớn hơn $3$.`, R`Since $6>5$, we have $63>58$, even though $8$ is greater than $3$.`),
      ],
      ket: b(R`Số $63$ lớn hơn số $58$.`, R`The number $63$ is greater than $58$.`),
      checks: [{ expr: "Gt(63,58)", expect: "True" }],
    },
    mistake: b(R`Chỉ nhìn chữ số hàng đơn vị lớn hơn rồi kết luận.`, R`Looking only at the bigger ones digit and concluding.`),
    drill: { prompt: b(R`Số nào bé hơn, $39$ hay $41$?`, R`Which is smaller, $39$ or $41$?`), answer: b(R`Số $39$ bé hơn.`, R`The number $39$ is smaller.`), checks: [{ expr: "Lt(39,41)", expect: "True" }] },
  },
  {
    name: b(R`Cộng và trừ không nhớ trong phạm vi 100`, R`Adding and subtracting without carrying within 100`),
    spot: b(R`Phép tính hai số có hai chữ số mà hàng đơn vị cộng hoặc trừ được ngay.`, R`A sum or difference of two-digit numbers where the ones can be added or taken away directly.`),
    method: [
      b(R`Đặt tính thẳng cột: chục dưới chục, đơn vị dưới đơn vị.`, R`Line up the columns: tens under tens, ones under ones.`),
      b(R`Tính hàng đơn vị trước, hàng chục sau, rồi ghép lại.`, R`Work out the ones first, the tens next, then put them together.`),
    ],
    example: {
      prompt: b(R`Tính $54+23$ và $79-35$.`, R`Work out $54+23$ and $79-35$.`),
      steps: [
        b(R`Với $54+23$: hàng đơn vị $4+3=7$, hàng chục $5+2=7$, được $77$.`, R`For $54+23$: ones $4+3=7$, tens $5+2=7$, giving $77$.`),
        b(R`Với $79-35$: hàng đơn vị $9-5=4$, hàng chục $7-3=4$, được $44$.`, R`For $79-35$: ones $9-5=4$, tens $7-3=4$, giving $44$.`),
      ],
      ket: b(R`Ta có $54+23=77$ và $79-35=44$.`, R`We have $54+23=77$ and $79-35=44$.`),
      checks: [{ expr: "54+23", expect: "77" }, { expr: "79-35", expect: "44" }],
    },
    mistake: b(R`Đặt tính lệch cột nên cộng chục với đơn vị.`, R`Lining up the columns wrongly and adding tens to ones.`),
    drill: { prompt: b(R`Tính $62+35$.`, R`Work out $62+35$.`), answer: b(R`Kết quả là $97$.`, R`The result is $97$.`), checks: [{ expr: "62+35", expect: "97" }] },
  },
  {
    name: b(R`Bài toán về độ dài và giờ`, R`Problems about length and time`),
    spot: b(R`Đề cho số đo bằng xentimét hoặc giờ đúng và hỏi dài hơn bao nhiêu, hoặc còn bao lâu.`, R`The problem gives measurements in centimetres or whole hours and asks how much longer or how long until.`),
    method: [
      b(R`Kiểm tra các số đo cùng đơn vị rồi mới tính.`, R`Check that the measurements share a unit before calculating.`),
      b(R`Hỏi "dài hơn bao nhiêu" hoặc "bao lâu" thì lấy số lớn trừ số bé.`, R`For "how much longer" or "how long", take the smaller number from the bigger.`),
    ],
    example: {
      prompt: b(R`Cây bút dài $15$ xentimét, cây thước dài $20$ xentimét. Thước dài hơn bút bao nhiêu xentimét?`, R`A pen is $15$ centimetres long and a ruler is $20$ centimetres long. How many centimetres longer is the ruler?`),
      steps: [
        b(R`Hai số đo cùng đơn vị xentimét nên so sánh được.`, R`Both measurements are in centimetres, so they can be compared.`),
        b(R`Phần dài hơn là $20-15=5$ xentimét.`, R`The extra length is $20-15=5$ centimetres.`),
      ],
      ket: b(R`Thước dài hơn bút $5$ xentimét.`, R`The ruler is $5$ centimetres longer than the pen.`),
      checks: [{ expr: "20-15", expect: "5" }],
    },
    mistake: b(R`Cộng hai số đo khi đề hỏi phần dài hơn.`, R`Adding the two measurements when the problem asks how much longer.`),
    drill: { prompt: b(R`Bạn Hà đi học lúc $7$ giờ và về lúc $11$ giờ. Hà ở trường mấy giờ?`, R`Ha goes to school at $7$ o'clock and comes home at $11$ o'clock. How many hours is Ha at school?`), answer: b(R`Hà ở trường $4$ giờ.`, R`Ha is at school for $4$ hours.`), checks: [{ expr: "11-7", expect: "4" }] },
  },
];

export default lop01;
