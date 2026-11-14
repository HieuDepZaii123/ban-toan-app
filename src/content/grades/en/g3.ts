/** Lớp 3 bằng tiếng Anh. Thứ tự ví dụ và bài luyện khớp bản tiếng Việt. */
import type { LessonEn } from "./types.ts";

const R = String.raw;

export const g3En: Record<string, LessonEn> = {
  "doc-100000": {
    s: R`Big numbers are split into places: ten thousands, thousands, hundreds, tens, ones. The number $45\,032$ has $4$ ten thousands, $5$ thousands, $0$ hundreds, $3$ tens and $2$ ones. A place with nothing in it is written as the digit $0$ to hold the place.`,
    w: R`Each place is ten times the place on its right: ten thousands is a ten thousand, and ten ten thousands is a hundred thousand.`,
    p: R`Leaving out a place that has nothing in it. The number with $4$ ten thousands, $5$ thousands, $3$ tens and $2$ ones is $45\,032$; the hundreds must be written as $0$.`,
    ex: [
      [R`Write the number with $4$ ten thousands, $5$ thousands, $3$ tens and $2$ ones.`, [
        [R`Four ten thousands is $40\,000$, and five thousands is $5\,000$.`, R`Each place has its own value. The hundreds have no digit, so write $0$.`],
        [R`Add $40\,000+5\,000+30+2=45\,032$.`, R`Putting the places together gives a number within $100\,000$.`],
      ], R`The number is $45\,032$.`],
      [R`Read the number $70\,508$ and say which place the digit $5$ is in.`, [
        [R`The number $70\,508$ is read as seventy thousand five hundred and eight.`, R`Read the thousands first, then the rest; a zero in the tens is not said aloud.`],
        [R`Split into places: $7$ ten thousands, $0$ thousands, $5$ hundreds, $0$ tens, $8$ ones. So the digit $5$ is in the hundreds place.`, R`Count from right to left: ones, tens, hundreds, thousands, ten thousands.`],
      ], R`The digit $5$ is in the hundreds place, with value $500$.`],
    ],
    dr: [
      [R`How much is three ten thousands?`, R`Three ten thousands is $30\,000$.`, R`Each ten thousand is $10\,000$. Three lots of that is $30\,000$.`],
      [R`Work out $60\,000+4\,000$.`, R`The sum is $64\,000$.`, R`Six ten thousands and four thousands more. The other places are $0$.`],
      [R`How many more than $99\,999$ is $100\,000$?`, R`It is $1$ more.`, R`The number right after $99\,999$, within the numbers learned, is $100\,000$.`],
    ],
  },
  "lam-tron-3": {
    s: R`Rounding means finding the nearest round number. The number $46$ is closer to $50$ than to $40$, so rounded to the nearest ten it is $50$. The rule: look at the digit just to the right; $5$ or more rounds up, less than $5$ rounds down.`,
    w: R`The number $46$ is between $40$ and $50$ but closer to $50$, while $23$ is closer to $20$. Rounding picks the nearest round number, and a number exactly in the middle is rounded up by agreement.`,
    p: R`Looking at the wrong digit. To round to the nearest ten, look at the ones; to round to the nearest hundred, look at the tens.`,
    ex: [
      [R`Round $46$ and $23$ to the nearest ten.`, [
        [R`The number $46$ has ones digit $6$, so it rounds to $50$.`, R`If the digit to the right of the tens is $5$ or more, the tens go up by one.`],
        [R`The number $23$ has ones digit $3$, so it rounds to $20$.`, R`A digit less than $5$ keeps the tens the same and turns the places on the right into $0$.`],
      ], R`The two numbers round to $50$ and $20$.`],
      [R`A storybook costs $38\,500$ dong. Round the price to the nearest thousand.`, [
        [R`The hundreds digit is $5$.`, R`To round to the nearest thousand, look at the digit just to the right, which is the hundreds.`],
        [R`Since $5$ is not less than $5$, round up: $39\,000$ dong.`, R`A digit of five or more adds one to the thousands, and the places after become zero.`],
      ], R`Rounded to the nearest thousand, the price is $39\,000$ dong.`],
    ],
    dr: [
      [R`Round $860$ to the nearest hundred.`, R`The result is $900$.`, R`The tens digit is $6$, so the hundreds go up from $8$ to $9$.`],
      [R`Round $820$ to the nearest hundred.`, R`The result is $800$.`, R`The tens digit is $2$, less than $5$, so the hundreds stay the same.`],
      [R`Round $74$ to the nearest ten.`, R`The result is $70$.`, R`The ones digit is $4$, so by this rule the nearest round ten is $70$.`],
    ],
  },
  "so-la-ma": {
    s: R`The Romans wrote numbers with letters: $I$ is $1$, $V$ is $5$, $X$ is $10$. A smaller letter after a bigger one is added, as in $VI=6$. A smaller letter before a bigger one is taken away, as in $IV=4$.`,
    w: R`Roman numerals show a number by adding up the symbols. To avoid writing four of the same letter in a row, a smaller letter is put before a bigger one to show taking away, so $IV$ is $5-1$.`,
    p: R`Reading $IV$ as $6$ and $VI$ as $4$. The letter $I$ in front is taken away; after, it is added.`,
    ex: [
      [R`What numbers are the Roman numerals $XII$ and $IV$?`, [
        [R`The numeral $XII$ is $10+1+1=12$.`, R`The letter $X$ comes before two letters $I$. The letters after it are added.`],
        [R`The numeral $IV$ is $5-1=4$.`, R`The letter $I$ comes before the bigger letter $V$, so take $1$ from $5$.`],
      ], R`The numeral $XII$ is $12$ and $IV$ is $4$.`],
      [R`Write the numbers $9$, $14$ and $20$ in Roman numerals.`, [
        [R`The number $9$ is $IX$, since $I$ before $X$ means $10$ take away $1$.`, R`A smaller letter to the left of a bigger one is taken away; to the right, it is added.`],
        [R`The number $14$ is $XIV$, that is $10+4$; the number $20$ is $XX$, that is $10+10$.`, R`Put the parts together in order from biggest to smallest.`],
      ], R`The three numbers are written $IX$, $XIV$ and $XX$.`],
    ],
    dr: [
      [R`What number is the Roman numeral $VI$?`, R`It is $6$.`, R`The letter $I$ comes after $V$, so it is added. Five and one more is six.`],
      [R`What number is the Roman numeral $IX$?`, R`It is $9$.`, R`The letter $I$ comes before $X$, so take one from ten.`],
      [R`What number is the Roman numeral $XV$?`, R`It is $15$.`, R`The letter $V$ comes after $X$, so add $10$ and $5$.`],
    ],
  },
  "nhan-hai-chu": {
    s: R`To multiply a two-digit number by a one-digit number, multiply the ones first, then the tens. For example $23\times 4$: $3\times 4=12$, write $2$ carry $1$; $2\times 4=8$, plus $1$ is $9$; the answer is $92$.`,
    w: R`The number $23$ is $20$ and $3$. Multiply each part by $4$ and add: $20\times 4=80$ and $3\times 4=12$, giving $92$.`,
    p: R`Forgetting to add the carried digit to the tens product. In $23\times 4$, the tens give $8$, and then the carried $1$ must be added.`,
    ex: [
      [R`Work out $23\times 4$.`, [
        [R`Ones: $3\times 4=12$, write $2$ carry $1$.`, R`If the ones product is more than $9$, split it into a carried ten and the ones digit.`],
        [R`Tens: $2\times 4+1=9$. The product is $92$.`, R`The carried digit is added to the tens product. The result is $92$.`],
      ], R`The product is $92$.`],
      [R`Each box has $24$ pencils. How many pencils are in $3$ boxes?`, [
        [R`Work out $24\times 3$: ones $4\times 3=12$, write $2$ carry $1$.`, R`Twelve ones is one ten and two ones; that ten is carried to the tens.`],
        [R`Tens: $2\times 3=6$, plus $1$ is $7$. So $24\times 3=72$.`, R`Finish multiplying the tens before adding the carried digit.`],
      ], R`Three boxes have $72$ pencils.`],
    ],
    dr: [
      [R`Work out $12\times 3$.`, R`The product is $36$.`, R`Three lots of $12$ is $36$. The ones $2\times 3$ need no carrying.`],
      [R`Work out $15\times 4$.`, R`The product is $60$.`, R`Four lots of $15$ make $60$. You can work out $10\times 4$ and then add $5\times 4$.`],
      [R`Work out $25\times 4$.`, R`The product is $100$.`, R`Four lots of $25$ make one hundred.`],
    ],
  },
  "chia-du": {
    s: R`Not every division comes out exactly. Sharing $17$ sweets among $5$ children, $3$ each uses $15$ sweets and leaves $2$ over. We write $17:5=3$ remainder $2$. The remainder is always smaller than the divisor.`,
    w: R`Sharing $17$ sweets among $5$ children, $3$ each uses $15$ sweets and leaves $2$. If $5$ or more were left, you could go round once more, so the remainder is always less than the divisor.`,
    p: R`Leaving a remainder equal to or bigger than the divisor. Then the quotient is too small and must be increased.`,
    ex: [
      [R`Work out $17:5$. Find the quotient and the remainder.`, [
        [R`We have $5\times 3=15$, and $5\times 4=20$ is more than $17$.`, R`The quotient is the biggest whole number whose product does not go past the number being divided.`],
        [R`So the quotient is $3$ and the remainder is $17-15=2$.`, R`The remainder must be less than the divisor $5$. Check: $5\times 3+2=17$.`],
      ], R`The quotient is $3$ and the remainder is $2$.`],
      [R`There are $30$ pupils and $4$ sit at each desk. What is the smallest number of desks so that everyone has a seat?`, [
        [R`Work out $30:4=7$ remainder $2$, because $4\times 7=28$.`, R`The remainder must always be smaller than the divisor.`],
        [R`Seven desks seat $28$ pupils, and the other $2$ pupils need $1$ more desk, so $8$ desks in all.`, R`The remainder is the pupils without a seat yet, so one more desk is needed for them.`],
      ], R`At least $8$ desks are needed.`],
    ],
    dr: [
      [R`Work out $20:6$. What are the quotient and the remainder?`, R`The quotient is $3$, remainder $2$.`, R`Six times $3$ is $18$, leaving $2$. The remainder is smaller than the divisor.`],
      [R`Work out $25:4$. What is the remainder?`, R`The quotient is $6$ and the remainder is $1$.`, R`Four times $6$ is $24$. The difference $25-24$ is the remainder.`],
      [R`Work out $18:5$.`, R`The quotient is $3$, remainder $3$, because $5\times 3+3=18$.`, R`The number divided equals the quotient times the divisor, plus the remainder.`],
    ],
  },
  "bang-nhan-3-9": {
    s: R`Each times table is a sequence of counting on by the same step. The $6$ times table is $6$, $12$, $18$, $24$ and so on, adding $6$ each time. Swapping the two numbers being multiplied does not change the answer, so $7\times 8$ and $8\times 7$ both make $56$.`,
    w: R`Every times table can be built from repeated adding. You do not need to remember each line separately: from a known product, add or take away one more lot of the number to get the next product.`,
    p: R`Mixing up $6\times 8$ and $7\times 8$ because $48$ and $56$ are close together. Check by adding one more $8$ to $48$.`,
    ex: [
      [R`Each box has $6$ cakes. How many cakes are in $7$ boxes?`, [
        [R`Seven boxes means seven lots of $6$, written $6\times 7$.`, R`The boxes have the same number of cakes, so we multiply.`],
        [R`We have $6\times 7=42$.`, R`From $6\times 5=30$, two more lots of $6$ make $42$.`],
      ], R`Seven boxes have $42$ cakes.`],
      [R`A week has $7$ days. How many days are in $4$ weeks? And in $9$ weeks?`, [
        [R`Four weeks have $7\times 4=28$ days.`, R`Each week has the same number of days, so multiply the days by the number of weeks.`],
        [R`Nine weeks have $7\times 9=63$ days.`, R`From the $7$ times table: seven times nine is sixty-three.`],
      ], R`Four weeks have $28$ days and nine weeks have $63$ days.`],
    ],
    dr: [
      [R`Work out $8\times 9$.`, R`The product is $72$.`, R`From $8\times 10=80$, take away one lot of $8$ to leave $72$.`],
      [R`Work out $7\times 7$.`, R`The product is $49$.`, R`From $7\times 5=35$, two more lots of $7$ make $14$ more, giving $49$.`],
      [R`A week has $7$ days. How many days are in $4$ weeks?`, R`Four weeks have $28$ days.`, R`Four lots of $7$ days is $28$ days.`],
    ],
  },
  "chia-ba-chu": {
    s: R`Divide place by place: hundreds, then tens, then ones. Anything left over in one place is changed into the place on the right and divided further. For example $936:4=234$.`,
    w: R`The number $936$ is $9$ hundreds, $3$ tens and $6$ ones. Share out each kind equally, and change any leftover into the smaller kind before sharing again, so nothing is missed.`,
    p: R`Forgetting a $0$ in the middle of the answer. In $612:6$, after the hundreds, the tens digit $1$ is too small to divide, so write $0$ in the answer, which is $102$.`,
    ex: [
      [R`Work out $936:4$.`, [
        [R`Hundreds: $9$ divided by $4$ is $2$, remainder $1$. Put it with the tens to make $13$.`, R`The hundred left over becomes ten tens, which with the $3$ tens makes $13$ tens.`],
        [R`Next: $13$ divided by $4$ is $3$, remainder $1$. That makes $16$, which divided by $4$ is $4$. The quotient is $234$.`, R`The ten left over becomes ten ones, which with the $6$ ones makes $16$.`],
      ], R`The quotient is $234$.`],
      [R`There are $845$ eggs put into trays of $5$. How many trays are filled?`, [
        [R`Start with the hundreds: $8:5=1$ remainder $3$; bring down $4$ to get $34:5=6$ remainder $4$.`, R`Divide from left to right, joining each remainder to the next digit.`],
        [R`Bring down $5$ to get $45:5=9$. So $845:5=169$.`, R`Check: $169\times 5=845$, with nothing left over.`],
      ], R`They fill $169$ trays of eggs.`],
    ],
    dr: [
      [R`Work out $848:4$.`, R`The quotient is $212$.`, R`Divide place by place: $8:4=2$, $4:4=1$, $8:4=2$.`],
      [R`Work out $375:5$.`, R`The quotient is $75$.`, R`The hundreds digit $3$ is too small to divide by $5$, so take $37$ divided by $5$ to get $7$ remainder $2$, then $25$ divided by $5$ is $5$.`],
      [R`There are $126$ notebooks shared equally among $3$ classes. How many does each class get?`, R`Each class gets $42$ notebooks.`, R`Take $12$ divided by $3$ to get $4$, then $6$ divided by $3$ to get $2$; the quotient is $42$.`],
    ],
  },
  "phan-nho": {
    s: R`Split a group into equal parts. One half means splitting into two equal parts and taking one: one half of $8$ apples is $8:2=4$ apples. The parts must be equal to be called halves.`,
    w: R`Splitting a group into $2$ equal parts makes each part one half. Because the parts are equal, finding one part is a division.`,
    p: R`Calling unequal parts halves. Only when the two parts are equal is each part one half.`,
    ex: [
      [R`What is one half of $8$ apples?`, [
        [R`One half means splitting into $2$ equal parts.`, R`Share the apples equally into two parts.`],
        [R`Each part has $8:2=4$ apples.`, R`The two equal parts together make all $8$ apples.`],
      ], R`One half of $8$ apples is $4$ apples.`],
      [R`A rope is $24$ metres long. One third of it is used to tie up goods. How many metres were used, and how many are left?`, [
        [R`One third of $24$ metres is $24:3=8$ metres.`, R`Finding one third means splitting the number into three equal parts and taking one.`],
        [R`What is left is $24-8=16$ metres.`, R`The part left is two thirds of the rope.`],
      ], R`$8$ metres were used and $16$ metres are left.`],
    ],
    dr: [
      [R`What is one third of $12$?`, R`The answer is $4$.`, R`Split $12$ into three equal parts. Each part is $4$.`],
      [R`What is one quarter of $20$?`, R`The answer is $5$.`, R`Divide $20$ by $4$. Each part is $5$.`],
      [R`What is one half of $10$?`, R`The answer is $5$.`, R`Split $10$ into two equal parts. Each part is $5$.`],
    ],
  },
  "phan-lon": {
    s: R`One fifth means splitting into $5$ equal parts and taking one. The more parts you split into, the smaller each part, so one ninth of a cake is smaller than one fifth of the same cake.`,
    w: R`Splitting into more equal parts makes each part smaller. One ninth of a cake is smaller than one fifth of the very same cake.`,
    p: R`Thinking one ninth is bigger than one fifth because $9$ is bigger than $5$. The more parts there are, the smaller each one is.`,
    ex: [
      [R`What are one fifth of $20$ and one ninth of $18$?`, [
        [R`One fifth of $20$ is $20:5=4$.`, R`Split $20$ into five equal parts.`],
        [R`One ninth of $18$ is $18:9=2$.`, R`Split $18$ into nine equal parts. Each part is $2$.`],
      ], R`The two answers are $4$ and $2$.`],
      [R`A class has $35$ pupils, and one seventh of them wear glasses. How many pupils wear glasses?`, [
        [R`One seventh of $35$ is $35:7$.`, R`Split the pupils into seven equal parts; each part is one seventh.`],
        [R`We have $35:7=5$, because $7\times 5=35$.`, R`Use the seven times table to find the answer.`],
      ], R`There are $5$ pupils who wear glasses.`],
    ],
    dr: [
      [R`What is one sixth of $24$?`, R`The answer is $4$.`, R`Divide $24$ by $6$. Each part is $4$.`],
      [R`What is one eighth of $16$?`, R`The answer is $2$.`, R`Divide $16$ by $8$. Each part is $2$.`],
      [R`What is one seventh of $21$?`, R`The answer is $3$.`, R`Divide $21$ by $7$. Each part is $3$.`],
    ],
  },
  "don-vi-do": {
    s: R`Units of length from big to small: metre, decimetre, centimetre. Each unit is $10$ times the next smaller one. Changing to a smaller unit makes the number bigger: $3$ m is $300$ cm.`,
    w: R`Each unit of length is $10$ times the next smaller one. Going down two steps, from metres to centimetres, is $10$ times and $10$ times again, that is $100$ times.`,
    p: R`Dividing when changing to a smaller unit. The smaller the unit, the more of them it takes to measure the same length, so the number must get bigger.`,
    ex: [
      [R`Change $3$ metres to centimetres and $4$ decimetres to centimetres.`, [
        [R`Three metres is $3\times 100=300$ centimetres.`, R`Each metre has one hundred centimetres.`],
        [R`Four decimetres is $4\times 10=40$ centimetres.`, R`Each decimetre has ten centimetres.`],
      ], R`Three metres is $300$ centimetres and four decimetres is $40$ centimetres.`],
      [R`The road from home to school is $1$ kilometre $200$ metres long. How many metres long is it?`, [
        [R`Change $1$ kilometre to $1000$ metres.`, R`Each kilometre is one thousand metres.`],
        [R`Add the rest: $1000+200=1200$ metres.`, R`Both parts are now in metres, so they can be added.`],
      ], R`The road is $1200$ metres long.`],
    ],
    dr: [
      [R`Change $2$ metres to centimetres.`, R`It is $200$ centimetres.`, R`Multiply the number of metres by $100$, because each metre has one hundred centimetres.`],
      [R`Change $500$ centimetres to metres as $500:100$.`, R`It is $5$ metres.`, R`One metre has $100$ centimetres. Divide the number of centimetres by $100$.`],
      [R`A $1$ metre piece is joined to a $20$ centimetre piece. How many centimetres long is the whole piece?`, R`It is $120$ centimetres long.`, R`Change metres to centimetres before adding.`],
    ],
  },
  "chu-vi-3": {
    s: R`The perimeter is the length of the path all the way round a shape. A rectangle $5$ cm long and $3$ cm wide has perimeter $(5+3)\times 2=16$ cm, because the path goes along two lengths and two widths.`,
    w: R`Going once round a rectangle means going along two lengths and two widths. Take one length and one width together, then double it, to make a full round.`,
    p: R`Adding only one length and one width. That only goes half way round.`,
    ex: [
      [R`A rectangle is $5$ centimetres long and $3$ centimetres wide. What is its perimeter?`, [
        [R`One length and one width add up to $5+3=8$.`, R`That goes half way round, along one long side and one short side.`],
        [R`The perimeter is $8\times 2=16$ centimetres.`, R`The shape has two such pairs of sides, so double it.`],
      ], R`The perimeter is $16$ centimetres.`],
      [R`A square garden has sides of $9$ metres. A fence is put all round it. How many metres long is the fence?`, [
        [R`The length of the fence is the perimeter of the square.`, R`Fencing round the garden means going all the way round its sides.`],
        [R`The perimeter is $9\times 4=36$ metres.`, R`A square has four sides of the same length.`],
      ], R`The fence is $36$ metres long.`],
    ],
    dr: [
      [R`What is the perimeter of a square with sides of $4$ centimetres?`, R`The perimeter is $16$ centimetres.`, R`A square has four equal sides. The perimeter is four times one side.`],
      [R`What is the area of a rectangle $9$ long and $2$ wide?`, R`The area is $18$.`, R`Area is the number of squares covering the shape, found by length times width.`],
      [R`What is the perimeter of a rectangle $6$ long and $1$ wide?`, R`The perimeter is $14$.`, R`Adding the length and the width gives $7$, then multiply by $2$.`],
    ],
  },
  "trung-diem": {
    s: R`The midpoint is the point exactly in the middle of a segment, the same distance from both ends. For a segment $8$ cm long, the midpoint is $8:2=4$ cm from each end.`,
    w: R`The midpoint is exactly in the middle, the same distance from both ends. The two small segments are equal and together make the whole segment, so each is half of it.`,
    p: R`Calling any point between the two ends a midpoint. The point must be the same distance from both ends to be the midpoint.`,
    ex: [
      [R`The segment $AB$ is $8$ centimetres long. How many centimetres from $A$ is its midpoint $M$?`, [
        [R`The midpoint is exactly in the middle of $A$ and $B$.`, R`The two segments $AM$ and $MB$ are equal.`],
        [R`The length $AM$ is $8:2=4$ centimetres.`, R`Divide the length of the whole segment by $2$.`],
      ], R`The point $M$ is exactly $4$ centimetres from $A$.`],
      [R`The point $M$ is the midpoint of segment $AB$, and $AM=6$ centimetres. How many centimetres long is $AB$?`, [
        [R`The midpoint splits the segment into two equal parts, so $MB=AM=6$ centimetres.`, R`The point $M$ is in the middle, the same distance from both ends $A$, $B$.`],
        [R`The segment $AB$ is $6+6=12$ centimetres long.`, R`The whole segment is the two halves put together.`],
      ], R`The segment $AB$ is $12$ centimetres long.`],
    ],
    dr: [
      [R`A segment is $12$ centimetres long. How long is each part made by the midpoint?`, R`Each part is $6$ centimetres long.`, R`The two parts are equal. Divide the length of the whole segment by $2$.`],
      [R`Each part from an end to the midpoint is $5$ centimetres. How long is the whole segment?`, R`The whole segment is $10$ centimetres long.`, R`The two equal parts together make the whole segment.`],
      [R`A segment is $10$ centimetres long with midpoint $M$. How long is the part left after $AM$?`, R`It is $5$ centimetres long.`, R`The part left is the other half, which is also the whole segment take away one half.`],
    ],
  },
  "hinh-tron-3": {
    s: R`A circle has a point exactly in the middle called the centre. The radius is the segment from the centre to the circle. The diameter passes through the centre, joins two points on the circle, and is twice as long as the radius.`,
    w: R`A diameter is two radii joined in a straight line through the centre. Since all radii of a circle are equally long, the diameter is twice the radius.`,
    p: R`Taking a segment joining two points on the circle but not passing through the centre as a diameter. A diameter must go through the centre.`,
    ex: [
      [R`A circle has radius $5$ centimetres. How long is its diameter?`, [
        [R`A diameter is two radii joined end to end.`, R`The diameter passes through the centre and touches the curve at both ends.`],
        [R`The diameter is $5\times 2=10$ centimetres.`, R`Double the radius. The number $3.14$ is not used in this recognition lesson.`],
      ], R`The diameter is $10$ centimetres long.`],
      [R`A round plate has a diameter of $18$ centimetres. How long is its radius?`, [
        [R`A diameter is two radii joined through the centre.`, R`The diameter goes from one edge, through the centre, to the other edge.`],
        [R`The radius is $18:2=9$ centimetres.`, R`To find one radius, divide the diameter in two.`],
      ], R`The radius is $9$ centimetres long.`],
    ],
    dr: [
      [R`The diameter is $14$ centimetres. What is the radius?`, R`The radius is $7$ centimetres.`, R`The radius is half the diameter.`],
      [R`The radius is $6$ centimetres. What is the diameter?`, R`The diameter is $12$ centimetres.`, R`The diameter is twice the radius.`],
      [R`A diameter is $8$ centimetres long. What is the radius of that circle?`, R`The radius is $4$ centimetres.`, R`The radius is half the diameter. Working out $8:2$ gives the length of the radius.`],
    ],
  },
  "bang-so-lieu": {
    s: R`A data table puts numbers in rows and columns so they are easy to read. Follow the row and the column to find a number. Add the numbers in the table to find the total, and find the biggest entry to see which group is largest.`,
    w: R`A table puts each piece of data in exactly one cell, so following the row and column finds it straight away. Adding all the cells puts all the groups together.`,
    p: R`Reading the wrong row or column. Use a ruler or a finger to follow the row before reading the number.`,
    ex: [
      [R`Three classes have $20$, $25$ and $30$ pupils. How many pupils are in the three classes, and which class is biggest?`, [
        [R`The total is $20+25+30=75$ pupils.`, R`Add all three cells of the table. Do not leave out any class.`],
        [R`The biggest number is $30$, so the third class is the biggest.`, R`Compare the three numbers in the same column of pupil numbers.`],
      ], R`The three classes have $75$ pupils, and the biggest class has $30$ pupils.`],
      [R`Assumed data. A table shows the trees planted: group One $12$ trees, group Two $15$ trees, group Three $9$ trees. How many more trees did the group that planted most plant than the group that planted fewest?`, [
        [R`Group Two planted the most with $15$ trees, and group Three the fewest with $9$ trees.`, R`Read each row of the table, then compare the numbers.`],
        [R`The difference is $15-9=6$ trees.`, R`To find how many more, take the smaller number from the bigger.`],
      ], R`Group Two planted $6$ more trees than group Three.`],
    ],
    dr: [
      [R`A table shows $4$, $7$ and $9$. What is the total?`, R`The total is $20$.`, R`Add the cells of the table in turn.`],
      [R`Among the numbers $12$, $8$ and $15$, which is the biggest?`, R`The biggest number is $15$.`, R`The cell with the biggest number is the one that stands out when asked for the highest value.`],
      [R`How much more is the cell $14$ than the cell $9$?`, R`It is $5$ more.`, R`The difference between two cells in the same table shows the gap.`],
    ],
  },
  "chan-chan": {
    s: R`Something is certain when it happens every time. It is impossible when it never happens. Anything else is possible. If a bag has only red marbles, drawing red is certain and drawing blue is impossible.`,
    w: R`Sort an event by looking at all the results that can come up. A bag with only red marbles gives red every time, and never blue.`,
    p: R`Calling something very likely certain. If even one result does not fit, the event is only possible, not certain.`,
    ex: [
      [R`A bag has only $5$ red marbles. Draw one. What kind of event is drawing red? What kind is drawing blue?`, [
        [R`All $5$ marbles are red, so drawing red is certain.`, R`Every result is a red marble. There is no other result.`],
        [R`There are no blue marbles, so drawing blue is impossible.`, R`When no result fits, the event never happens.`],
      ], R`Drawing red is certain. Drawing blue is impossible.`],
      [R`Roll a die with six faces showing $1$ to $6$ dots. What kind of event is rolling $7$ dots, rolling fewer than $7$ dots, and rolling $6$ dots?`, [
        [R`There is no face with $7$ dots, so that is impossible; every face has fewer than $7$ dots, so that is certain.`, R`Look at all the faces that can come up to sort each event.`],
        [R`The face with $6$ dots may or may not come up, so that is possible.`, R`There is a face with six dots, but there are also five other faces.`],
      ], R`They are impossible, certain and possible, in that order.`],
    ],
    dr: [
      [R`Assumed data. A bag has $3$ red marbles and $2$ blue marbles. What kind of event is drawing a red marble?`, R`It is possible.`, R`There are red marbles, so it can happen, but not every marble is red, so it is not certain.`],
      [R`Roll a fair die. What kind of event is getting a number from $1$ to $6$?`, R`It is certain.`, R`All six faces show a number from $1$ to $6$. Every result fits.`],
      [R`A bag has only red marbles. What kind of event is drawing a blue marble?`, R`It is impossible.`, R`There are no blue marbles, so no result fits.`],
    ],
  },
  "so-kha-nang": {
    s: R`When a marble is drawn at random, the colour with more marbles is easier to draw. A bag with $4$ red marbles and $1$ blue marble makes red easier to draw, but blue still comes up sometimes.`,
    w: R`Every marble has the same chance of being drawn. The colour with more marbles has more chances.`,
    p: R`Thinking more likely means it will happen. A bag with $4$ red marbles and $1$ blue marble still sometimes gives blue.`,
    ex: [
      [R`A bag has $4$ red marbles and $1$ blue marble. Which is more likely when one marble is drawn?`, [
        [R`There are more red marbles than blue: $4>1$.`, R`Compare the number of marbles of each colour in the same bag.`],
        [R`So drawing red is more likely than drawing blue.`, R`More favourable results means a bigger chance.`],
      ], R`Drawing red is more likely.`],
      [R`Box one has $3$ red and $3$ blue marbles. Box two has $5$ red and $1$ blue marble. Which box should you draw from to make red more likely?`, [
        [R`Box one has as many red marbles as blue, so the chances are equal.`, R`When the two colours have the same number, neither is more likely.`],
        [R`Box two has far more red marbles than blue, so red is more likely there.`, R`The colour with more marbles is more likely to be drawn.`],
      ], R`You should draw from box two.`],
    ],
    dr: [
      [R`Assumed data. A bag has $2$ red marbles and $6$ blue marbles. Which colour is more likely to be drawn?`, R`Blue is more likely to be drawn.`, R`Six is more than two, so blue has more favourable results.`],
      [R`A bag has $3$ red marbles and $3$ blue marbles. Are drawing red and drawing blue equally likely?`, R`Yes, they are equally likely.`, R`When two colours have the same number of marbles, neither is more likely.`],
      [R`A bag has $1$ red marble and $8$ blue marbles. What is the number of blue marbles take away the number of red marbles?`, R`The difference is $7$, so blue is more likely to be drawn.`, R`A positive difference shows the colour after the minus sign has fewer marbles than the colour before it.`],
    ],
  },
  "dien-tich-3": {
    s: R`Area is the part of the flat surface inside a shape. Count how many squares with sides of $1$ cm cover the shape: a rectangle $5$ cm long and $3$ cm wide has $5\times 3=15$ squares, an area of $15$ square centimetres.`,
    w: R`Area counts the unit squares that cover a shape completely. A rectangle can be filled with equal rows of squares, so the number of squares is the squares in each row times the number of rows.`,
    p: R`Mixing up area and perimeter. Perimeter measures the outline in centimetres; area measures the inside in square centimetres.`,
    ex: [
      [R`A rectangle is $5$ centimetres long and $3$ centimetres wide. What is its area in square centimetres?`, [
        [R`Split the shape into $3$ rows of $5$ squares with sides of $1$ centimetre.`, R`Each small square has an area of exactly one square centimetre.`],
        [R`The number of squares is $5\times 3=15$.`, R`The rows have equal numbers of squares, so count them by multiplying.`],
      ], R`The area is $15$ square centimetres.`],
      [R`A square tile has sides of $4$ decimetres. Find the area of one tile, and how many square decimetres $5$ such tiles cover.`, [
        [R`One tile has area $4\times 4=16$ square decimetres.`, R`The area of a square is the side times itself.`],
        [R`Five tiles cover $16\times 5=80$ square decimetres.`, R`The tiles do not overlap, so their areas add up.`],
      ], R`One tile has area $16$ square decimetres, and five tiles cover $80$ square decimetres.`],
    ],
    dr: [
      [R`What is the area in square centimetres of a square with sides of $4$ centimetres?`, R`The area is $16$ square centimetres.`, R`The square has $4$ rows of $4$ squares, which is $16$ squares.`],
      [R`A rectangle is $8$ centimetres long and $2$ centimetres wide. Find its area.`, R`The area is $16$ square centimetres.`, R`Multiply the length by the width: $8\times 2=16$.`],
      [R`A rectangle has area $24$ square centimetres and width $4$ centimetres. How many centimetres long is it?`, R`The length is $6$ centimetres.`, R`Area is length times width, so the length is $24:4=6$.`],
    ],
  },
  "gam-ml": {
    s: R`Grams are used for light things; $1000$ grams is $1$ kilogram. Millilitres are used for small amounts of water; $1000$ millilitres is $1$ litre. A $500$ gram bag of sugar, two bags make $1000$ grams, which is $1$ kilogram.`,
    w: R`The prefix kilo means one thousand and milli means one thousandth. So a kilogram is $1000$ times a gram, and a litre is $1000$ times a millilitre.`,
    p: R`Changing kilograms to grams by multiplying by $100$. The step here is $1000$.`,
    ex: [
      [R`A bag of sugar weighs $500$ grams. How many grams do two such bags weigh, and how many kilograms is that?`, [
        [R`Two bags weigh $500\times 2=1000$ grams.`, R`The two bags are the same, so multiply one bag's weight by $2$.`],
        [R`Since $1000$ grams is $1$ kilogram, the two bags weigh $1$ kilogram.`, R`Every full $1000$ grams can be changed into one kilogram.`],
      ], R`The two bags weigh $1000$ grams, that is $1$ kilogram.`],
      [R`A bottle holds $1$ litre of water. It is poured into $3$ cups of $250$ millilitres each. How many millilitres are left in the bottle?`, [
        [R`Change $1$ litre to $1000$ millilitres; the three cups take $250\times 3=750$ millilitres.`, R`Change to the same unit, millilitres, before taking away.`],
        [R`The bottle has $1000-750=250$ millilitres left.`, R`Take the water poured out away from the water at the start.`],
      ], R`The bottle has $250$ millilitres left.`],
    ],
    dr: [
      [R`Change $3$ kilograms to grams.`, R`It is $3000$ grams.`, R`Each kilogram is $1000$ grams, so three kilograms is $3000$ grams.`],
      [R`A bottle holds $1000$ millilitres, and $250$ millilitres have been drunk. How many millilitres are left?`, R`There are $750$ millilitres left.`, R`Take the amount drunk from the amount at the start: $1000-250=750$.`],
      [R`Each cup holds $200$ millilitres. How many cups are needed to pour out $1$ litre of water?`, R`You need $5$ cups.`, R`One litre is $1000$ millilitres, and $1000:200=5$.`],
    ],
  },
};
