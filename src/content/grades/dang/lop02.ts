import type { GradeDang } from "./types.ts";
import { b } from "./types.ts";

const R = String.raw;

const lop02: GradeDang[] = [
  {
    name: b(R`Cộng có nhớ trong phạm vi 100`, R`Adding with carrying within 100`),
    spot: b(R`Tổng hai chữ số hàng đơn vị từ $10$ trở lên.`, R`The two ones digits add up to $10$ or more.`),
    method: [
      b(R`Đặt tính thẳng cột rồi cộng hàng đơn vị, viết chữ số đơn vị và nhớ $1$ chục.`, R`Line up the columns, add the ones, write the ones digit and carry $1$ ten.`),
      b(R`Cộng hàng chục, nhớ cộng thêm chữ số đã nhớ.`, R`Add the tens, remembering to add the carried digit.`),
    ],
    example: {
      prompt: b(R`Tính $48+35$.`, R`Work out $48+35$.`),
      steps: [
        b(R`Hàng đơn vị: $8+5=13$, viết $3$ nhớ $1$.`, R`Ones: $8+5=13$, write $3$ and carry $1$.`),
        b(R`Hàng chục: $4+3+1=8$, vậy tổng là $83$.`, R`Tens: $4+3+1=8$, so the sum is $83$.`),
      ],
      ket: b(R`Ta có $48+35=83$.`, R`We have $48+35=83$.`),
      checks: [{ expr: "48+35", expect: "83" }],
    },
    mistake: b(R`Quên cộng chữ số nhớ vào hàng chục.`, R`Forgetting to add the carried digit to the tens.`),
    drill: { prompt: b(R`Tính $67+25$.`, R`Work out $67+25$.`), answer: b(R`Kết quả là $92$.`, R`The result is $92$.`), checks: [{ expr: "67+25", expect: "92" }] },
  },
  {
    name: b(R`Trừ có nhớ trong phạm vi 100`, R`Subtracting with borrowing within 100`),
    spot: b(R`Chữ số hàng đơn vị của số bị trừ nhỏ hơn chữ số hàng đơn vị của số trừ.`, R`The ones digit of the first number is smaller than the ones digit of the number being taken away.`),
    method: [
      b(R`Mượn $1$ chục để có thêm $10$ đơn vị rồi trừ hàng đơn vị.`, R`Borrow $1$ ten to get $10$ more ones, then subtract the ones.`),
      b(R`Hàng chục của số bị trừ giảm đi $1$ rồi mới trừ hàng chục.`, R`Reduce the tens of the first number by $1$, then subtract the tens.`),
    ],
    example: {
      prompt: b(R`Tính $61-27$.`, R`Work out $61-27$.`),
      steps: [
        b(R`Hàng đơn vị: $1$ không trừ được $7$, mượn $1$ chục được $11-7=4$.`, R`Ones: $1$ cannot take away $7$, so borrow $1$ ten to get $11-7=4$.`),
        b(R`Hàng chục: $6-1=5$, rồi $5-2=3$, được $34$.`, R`Tens: $6-1=5$, then $5-2=3$, giving $34$.`),
      ],
      ket: b(R`Ta có $61-27=34$.`, R`We have $61-27=34$.`),
      checks: [{ expr: "61-27", expect: "34" }],
    },
    mistake: b(R`Mượn xong nhưng không bớt hàng chục.`, R`Borrowing but not reducing the tens.`),
    drill: { prompt: b(R`Tính $53-18$.`, R`Work out $53-18$.`), answer: b(R`Kết quả là $35$.`, R`The result is $35$.`), checks: [{ expr: "53-18", expect: "35" }] },
  },
  {
    name: b(R`Bảng nhân $2$ và bảng nhân $5$`, R`The $2$ and $5$ times tables`),
    spot: b(R`Có nhiều nhóm bằng nhau, mỗi nhóm $2$ hoặc $5$ đồ vật.`, R`There are several equal groups of $2$ or $5$ things.`),
    method: [
      b(R`Viết phép nhân: số đồ vật mỗi nhóm nhân số nhóm.`, R`Write the multiplication: things in each group times the number of groups.`),
      b(R`Đếm thêm $2$ hoặc $5$ theo từng nhóm để tìm tích.`, R`Count on by $2$ or $5$, once per group, to find the product.`),
    ],
    example: {
      prompt: b(R`Mỗi bàn có $5$ bạn. Có $6$ bàn. Có tất cả bao nhiêu bạn?`, R`Each table has $5$ children and there are $6$ tables. How many children are there altogether?`),
      steps: [
        b(R`Sáu nhóm bằng nhau mỗi nhóm $5$ nên làm phép nhân $5\times 6$.`, R`Six equal groups of $5$ means multiplying: $5\times 6$.`),
        b(R`Đếm thêm năm sáu lần: $5$, $10$, $15$, $20$, $25$, $30$.`, R`Counting in fives six times: $5$, $10$, $15$, $20$, $25$, $30$.`),
      ],
      ket: b(R`Có tất cả $30$ bạn.`, R`There are $30$ children altogether.`),
      checks: [{ expr: "5*6", expect: "30" }],
    },
    mistake: b(R`Cộng số nhóm với số đồ vật mỗi nhóm thay vì nhân.`, R`Adding the number of groups to the number in each group instead of multiplying.`),
    drill: { prompt: b(R`Mỗi con thỏ có $2$ tai. $7$ con thỏ có bao nhiêu tai?`, R`Each rabbit has $2$ ears. How many ears do $7$ rabbits have?`), answer: b(R`Có $14$ cái tai.`, R`They have $14$ ears.`), checks: [{ expr: "2*7", expect: "14" }] },
  },
  {
    name: b(R`Chia đều thành các phần bằng nhau`, R`Sharing equally into equal parts`),
    spot: b(R`Có từ "chia đều", "mỗi bạn được", hoặc hỏi cần mấy nhóm.`, R`The words "share equally" or "each gets" appear, or the problem asks how many groups are needed.`),
    method: [
      b(R`Viết phép chia: tổng số chia cho số phần hoặc số mỗi phần.`, R`Write the division: the total divided by the number of shares or the size of each share.`),
      b(R`Tìm số nhân với số chia ra tổng, rồi thử lại bằng phép nhân.`, R`Find the number that times the divisor gives the total, then check by multiplying.`),
    ],
    example: {
      prompt: b(R`Có $20$ quyển vở chia đều cho $5$ bạn. Mỗi bạn được mấy quyển?`, R`There are $20$ notebooks shared equally among $5$ children. How many does each child get?`),
      steps: [
        b(R`Chia đều nên làm phép chia $20:5$.`, R`Sharing equally means dividing: $20:5$.`),
        b(R`Vì $5\times 4=20$ nên $20:5=4$.`, R`Since $5\times 4=20$, we have $20:5=4$.`),
      ],
      ket: b(R`Mỗi bạn được $4$ quyển vở.`, R`Each child gets $4$ notebooks.`),
      checks: [{ expr: "20/5", expect: "4" }],
    },
    mistake: b(R`Lấy số chia chia cho số bị chia, nên đảo hai số.`, R`Dividing the divisor by the total, which swaps the two numbers.`),
    drill: { prompt: b(R`Có $18$ cái bánh xếp đều vào $2$ đĩa. Mỗi đĩa có mấy cái?`, R`There are $18$ cakes put equally on $2$ plates. How many are on each plate?`), answer: b(R`Mỗi đĩa có $9$ cái bánh.`, R`Each plate has $9$ cakes.`), checks: [{ expr: "18/2", expect: "9" }] },
  },
  {
    name: b(R`Đọc, viết và phân tích số có ba chữ số`, R`Reading, writing and splitting three-digit numbers`),
    spot: b(R`Đề cho số trăm, chục, đơn vị hoặc cho một số rồi hỏi các hàng.`, R`The problem gives hundreds, tens and ones, or gives a number and asks about its places.`),
    method: [
      b(R`Mỗi chữ số đứng ở một hàng: trăm, chục, đơn vị.`, R`Each digit sits in a place: hundreds, tens, ones.`),
      b(R`Hàng không có thì viết chữ số $0$ để giữ chỗ.`, R`A place with nothing in it is written as $0$ to hold the place.`),
    ],
    example: {
      prompt: b(R`Viết số gồm $4$ trăm, $0$ chục và $7$ đơn vị.`, R`Write the number with $4$ hundreds, $0$ tens and $7$ ones.`),
      steps: [
        b(R`Bốn trăm là $400$ và bảy đơn vị là $7$.`, R`Four hundreds is $400$ and seven ones is $7$.`),
        b(R`Hàng chục không có nên viết $0$: $400+7=407$.`, R`There are no tens, so write $0$: $400+7=407$.`),
      ],
      ket: b(R`Số cần viết là $407$.`, R`The number is $407$.`),
      checks: [{ expr: "4*100+0*10+7", expect: "407" }],
    },
    mistake: b(R`Bỏ chữ số $0$ nên viết $47$ thay cho $407$.`, R`Leaving out the $0$, writing $47$ instead of $407$.`),
    drill: { prompt: b(R`Viết số gồm $2$ trăm, $5$ chục và $3$ đơn vị.`, R`Write the number with $2$ hundreds, $5$ tens and $3$ ones.`), answer: b(R`Số $253$.`, R`The number $253$.`), checks: [{ expr: "2*100+5*10+3", expect: "253" }] },
  },
  {
    name: b(R`So sánh và sắp xếp số có ba chữ số`, R`Comparing and ordering three-digit numbers`),
    spot: b(R`Đề hỏi số lớn nhất, bé nhất hoặc sắp xếp ba số.`, R`The problem asks for the biggest or smallest number, or to order three numbers.`),
    method: [
      b(R`So hàng trăm trước, bằng nhau thì so hàng chục, rồi hàng đơn vị.`, R`Compare the hundreds first, then the tens if equal, then the ones.`),
      b(R`Xếp lần lượt từ số bé nhất hoặc lớn nhất theo thứ tự đề yêu cầu.`, R`List them one by one from the smallest or biggest, as the problem asks.`),
    ],
    example: {
      prompt: b(R`Xếp $521$, $512$, $251$ theo thứ tự từ bé đến lớn.`, R`Put $521$, $512$, $251$ in order from smallest to biggest.`),
      steps: [
        b(R`Số $251$ có $2$ trăm nên bé nhất.`, R`The number $251$ has $2$ hundreds, so it is the smallest.`),
        b(R`Hai số còn lại cùng $5$ trăm; hàng chục $1<2$ nên $512<521$.`, R`The other two both have $5$ hundreds; the tens $1<2$, so $512<521$.`),
      ],
      ket: b(R`Thứ tự là $251$, $512$, $521$.`, R`The order is $251$, $512$, $521$.`),
      checks: [{ expr: "Lt(512,521)", expect: "True" }, { expr: "Lt(251,512)", expect: "True" }],
    },
    mistake: b(R`So từ hàng đơn vị lên nên đảo thứ tự.`, R`Comparing from the ones upwards, which mixes up the order.`),
    drill: { prompt: b(R`Số nào lớn nhất: $389$, $398$ hay $839$?`, R`Which is the biggest: $389$, $398$ or $839$?`), answer: b(R`Số $839$ lớn nhất.`, R`The number $839$ is the biggest.`), checks: [{ expr: "Max(389,398,839)", expect: "839" }] },
  },
  {
    name: b(R`Độ dài đường gấp khúc`, R`Length of a broken line`),
    spot: b(R`Đề cho các đoạn thẳng nối tiếp và hỏi cả đường dài bao nhiêu.`, R`The problem gives segments joined end to end and asks how long the whole line is.`),
    method: [
      b(R`Ghi độ dài từng đoạn và kiểm tra cùng đơn vị.`, R`Write the length of each segment and check they share a unit.`),
      b(R`Cộng độ dài các đoạn; nếu các đoạn bằng nhau thì dùng phép nhân.`, R`Add the segment lengths; if the segments are equal, multiply.`),
    ],
    example: {
      prompt: b(R`Đường gấp khúc có các đoạn dài $7$ cm, $8$ cm và $5$ cm. Cả đường dài bao nhiêu xentimét?`, R`A broken line has segments of $7$ cm, $8$ cm and $5$ cm. How many centimetres long is the whole line?`),
      steps: [
        b(R`Cả ba đoạn cùng đơn vị xentimét nên cộng được.`, R`All three segments are in centimetres, so they can be added.`),
        b(R`Độ dài là $7+8+5=20$ xentimét.`, R`The length is $7+8+5=20$ centimetres.`),
      ],
      ket: b(R`Đường gấp khúc dài $20$ xentimét.`, R`The broken line is $20$ centimetres long.`),
      checks: [{ expr: "7+8+5", expect: "20" }],
    },
    mistake: b(R`Bỏ sót một đoạn khi cộng.`, R`Leaving out one segment when adding.`),
    drill: { prompt: b(R`Đường gấp khúc gồm $4$ đoạn, mỗi đoạn dài $6$ cm. Cả đường dài bao nhiêu xentimét?`, R`A broken line has $4$ segments of $6$ cm each. How many centimetres long is it?`), answer: b(R`Dài $24$ xentimét.`, R`It is $24$ centimetres long.`), checks: [{ expr: "6*4", expect: "24" }] },
  },
  {
    name: b(R`Đổi mét và xentimét`, R`Changing metres and centimetres`),
    spot: b(R`Đề cho số đo bằng hai đơn vị khác nhau hoặc hỏi đổi đơn vị.`, R`The problem gives measurements in two units or asks to change units.`),
    method: [
      b(R`Nhớ $1$ mét bằng $100$ xentimét.`, R`Remember $1$ metre is $100$ centimetres.`),
      b(R`Đổi mét ra xentimét thì nhân $100$, đổi ngược lại thì chia $100$.`, R`Metres to centimetres: multiply by $100$; the other way: divide by $100$.`),
    ],
    example: {
      prompt: b(R`Một sợi dây dài $1$ mét $30$ xentimét. Sợi dây dài bao nhiêu xentimét?`, R`A rope is $1$ metre $30$ centimetres long. How many centimetres is that?`),
      steps: [
        b(R`Đổi $1$ mét thành $100$ xentimét.`, R`Change $1$ metre to $100$ centimetres.`),
        b(R`Cộng phần còn lại: $100+30=130$ xentimét.`, R`Add the rest: $100+30=130$ centimetres.`),
      ],
      ket: b(R`Sợi dây dài $130$ xentimét.`, R`The rope is $130$ centimetres long.`),
      checks: [{ expr: "1*100+30", expect: "130" }],
    },
    mistake: b(R`Đổi nhầm $1$ mét bằng $10$ xentimét.`, R`Mistaking $1$ metre for $10$ centimetres.`),
    drill: { prompt: b(R`Đổi $4$ mét ra xentimét.`, R`Change $4$ metres to centimetres.`), answer: b(R`Bằng $400$ xentimét.`, R`It is $400$ centimetres.`), checks: [{ expr: "4*100", expect: "400" }] },
  },
  {
    name: b(R`Xem giờ và tính khoảng thời gian`, R`Telling time and finding a length of time`),
    spot: b(R`Đề cho giờ bắt đầu và giờ kết thúc hoặc giờ rưỡi.`, R`The problem gives a start and end time or a half past hour.`),
    method: [
      b(R`Kim dài chỉ số $12$ là giờ đúng, chỉ số $6$ là giờ rưỡi, tức $30$ phút.`, R`The long hand at $12$ is an exact hour; at $6$ it is half past, that is $30$ minutes.`),
      b(R`Cộng thêm hoặc bớt giờ trước, rồi mới cộng hoặc bớt phút.`, R`Add or take away the hours first, then the minutes.`),
    ],
    example: {
      prompt: b(R`Phim bắt đầu lúc $6$ giờ và chiếu $2$ giờ. Phim kết thúc lúc mấy giờ?`, R`A film starts at $6$ o'clock and runs for $2$ hours. When does it finish?`),
      steps: [
        b(R`Thêm $2$ giờ vào $6$ giờ.`, R`Add $2$ hours to $6$ o'clock.`),
        b(R`Ta có $6+2=8$, vậy phim kết thúc lúc $8$ giờ.`, R`We have $6+2=8$, so the film finishes at $8$ o'clock.`),
      ],
      ket: b(R`Phim kết thúc lúc $8$ giờ.`, R`The film finishes at $8$ o'clock.`),
      checks: [{ expr: "6+2", expect: "8" }],
    },
    mistake: b(R`Đọc kim dài chỉ số $6$ là $6$ phút.`, R`Reading the long hand at $6$ as $6$ minutes.`),
    drill: { prompt: b(R`Bạn Mai học từ $8$ giờ đến $11$ giờ. Mai học mấy giờ?`, R`Mai studies from $8$ o'clock to $11$ o'clock. How many hours does she study?`), answer: b(R`Mai học $3$ giờ.`, R`Mai studies for $3$ hours.`), checks: [{ expr: "11-8", expect: "3" }] },
  },
  {
    name: b(R`Đọc biểu đồ tranh`, R`Reading a pictogram`),
    spot: b(R`Có hình vẽ lặp lại, mỗi hình đại diện cho một số đồ vật.`, R`Repeated pictures where each picture stands for a number of things.`),
    method: [
      b(R`Xem mỗi hình ứng với bao nhiêu đồ vật.`, R`Check how many things each picture stands for.`),
      b(R`Đếm số hình trong từng hàng, nhân với giá trị mỗi hình, rồi so sánh hoặc cộng.`, R`Count the pictures in each row, multiply by each picture's value, then compare or add.`),
    ],
    example: {
      prompt: b(R`Mỗi hình quả cam ứng với $2$ quả. Hàng của An có $3$ hình. An có bao nhiêu quả cam?`, R`Each orange picture stands for $2$ oranges. An's row has $3$ pictures. How many oranges does An have?`),
      steps: [
        b(R`Mỗi hình là hai quả nên $3$ hình là $2\times 3$ quả.`, R`Each picture is two oranges, so $3$ pictures are $2\times 3$ oranges.`),
        b(R`Ta có $2\times 3=6$.`, R`We have $2\times 3=6$.`),
      ],
      ket: b(R`An có $6$ quả cam.`, R`An has $6$ oranges.`),
      checks: [{ expr: "2*3", expect: "6" }],
    },
    mistake: b(R`Coi mỗi hình là một quả mà quên đọc chú thích.`, R`Treating each picture as one orange and forgetting to read the key.`),
    drill: { prompt: b(R`Mỗi hình ứng với $5$ quyển sách. Hàng của Bình có $4$ hình. Bình có mấy quyển sách?`, R`Each picture stands for $5$ books. Binh's row has $4$ pictures. How many books does Binh have?`), answer: b(R`Bình có $20$ quyển sách.`, R`Binh has $20$ books.`), checks: [{ expr: "5*4", expect: "20" }] },
  },
];

export default lop02;
