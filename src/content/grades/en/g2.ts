/** Lớp 2 bằng tiếng Anh. Thứ tự ví dụ và bài luyện khớp bản tiếng Việt. */
import type { LessonEn } from "./types.ts";

const R = String.raw;

export const g2En: Record<string, LessonEn> = {
  "cong-nho": {
    s: R`When the ones add up to $10$ or more, ten ones are swapped for one ten. Write the ones digit down and carry $1$ to the tens. For example $27+15$: ones $7+5=12$, write $2$ carry $1$; tens $2+1+1=4$; the answer is $42$.`,
    w: R`Ten ones bundle together into one ten. When the ones reach $10$ or more, that bundle of ten moves to the tens, and that is the carried digit.`,
    p: R`Forgetting to add the carried digit to the tens. Write the small carried digit above the tens as soon as you carry it.`,
    ex: [
      [R`Work out $27+15$.`, [
        [R`Ones: $7+5=12$, write $2$ and carry $1$.`, R`The ones add up to more than $9$, so split it into $1$ ten and $2$ ones.`],
        [R`Tens: $2+1+1=4$. So the sum is $42$.`, R`The carried $1$ is added to the tens together with $2$ and $1$.`],
      ], R`The sum is $42$.`],
      [R`The first crate has $38$ pomelos and the second has $46$. How many pomelos are in both crates?`, [
        [R`Ones: $8+6=14$, write $4$ and carry $1$.`, R`Fourteen ones is one ten and four ones, so that ten moves to the tens.`],
        [R`Tens: $3+4+1=8$. So $38+46=84$.`, R`Do not forget to add the carried digit to the tens.`],
      ], R`The two crates have $84$ pomelos.`],
    ],
    dr: [
      [R`Work out $36+8$.`, R`The sum is $44$.`, R`The ones $6+8$ make $14$, write $4$ carry $1$. The tens become $4$.`],
      [R`Work out $50+18$.`, R`The sum is $68$.`, R`The ones $0+8$ give $8$. The tens $5+1$ make $6$, so the sum is $68$.`],
      [R`Work out $19+21$.`, R`The sum is $40$.`, R`The ones $9+1$ make $10$, so carry $1$ to the tens and get $40$.`],
    ],
  },
  "tru-nho": {
    s: R`When there are not enough ones to take away, borrow $1$ ten, which adds $10$ ones. For example $42-15$: $2$ is less than $5$, so borrow to get $12-5=7$; the tens become $3-1=2$; the answer is $27$. Remember to take away the ten that was lent.`,
    w: R`Untying one bundle of ten into ten loose sticks does not change the total number of sticks. Then there are enough ones to take away.`,
    p: R`Borrowing but not reducing the tens. After borrowing, the tens of the first number must go down by $1$.`,
    ex: [
      [R`Work out $42-15$.`, [
        [R`Not enough ones: borrow $1$ ten, $12-5=7$.`, R`The digit $2$ is less than $5$, so borrow one ten to make twelve ones.`],
        [R`The tens become $3-1=2$. The difference is $27$.`, R`The ten that was lent is not counted again. Two tens and seven ones are left.`],
      ], R`The difference is $27$.`],
      [R`A shop has $73$ melons and has sold $28$. How many are left?`, [
        [R`Ones: $3$ is less than $8$, so borrow $1$ ten to get $13-8=5$.`, R`One ten is ten ones, so after borrowing there are thirteen ones.`],
        [R`The tens become $7-1=6$, then $6-2=4$. So $73-28=45$.`, R`Check: $45+28=73$, exactly the number of melons at the start.`],
      ], R`The shop has $45$ melons left.`],
    ],
    dr: [
      [R`Work out $30-7$.`, R`The difference is $23$.`, R`Borrow one ten from $30$. Ten ones take away $7$ leaves $3$, and two tens are left.`],
      [R`Work out $51-16$.`, R`The difference is $35$.`, R`The ones borrow one ten. After taking away both places, the difference is $35$.`],
      [R`Work out $40-25$.`, R`The difference is $15$.`, R`The number $40$ has no ones to start with, so borrow one ten before taking away $5$.`],
    ],
  },
  "bang-nhan": {
    s: R`Multiplying means adding the same number many times. There are $4$ bags with $5$ marbles each, so $5+5+5+5=20$ marbles, written shortly as $5\times 4=20$. The $2$ and $5$ times tables help you work it out quickly without adding each time.`,
    w: R`Multiplication counts equal groups. Four bags of $5$ marbles each is $5+5+5+5$, so $5\times 4=20$.`,
    p: R`Learning the tables by heart without understanding, then getting stuck when you forget. If you forget $5\times 6$, take $5\times 5=25$ and add one more $5$.`,
    ex: [
      [R`Each bag has $5$ marbles. There are $4$ bags. How many marbles are there altogether?`, [
        [R`Four bags means four lots of $5$.`, R`Each bag has the same number of marbles, so we multiply.`],
        [R`We have $5\times 4=20$ marbles.`, R`The $5$ times table: five, ten, fifteen, twenty.`],
      ], R`There are $20$ marbles altogether.`],
      [R`Each chicken has $2$ legs. How many legs do $8$ chickens have?`, [
        [R`Eight lots of $2$, so multiply $2\times 8$.`, R`Each chicken has the same number of legs; putting equal groups together means multiplying.`],
        [R`From the $2$ times table: $2\times 8=16$.`, R`Count on in twos: two, four, six, eight, ten, twelve, fourteen, sixteen.`],
      ], R`Eight chickens have $16$ legs.`],
    ],
    dr: [
      [R`Work out $2\times 6$.`, R`The product is $12$.`, R`Six lots of $2$ is $12$. This is in the $2$ times table.`],
      [R`Work out $5\times 5$.`, R`The product is $25$.`, R`Five lots of $5$ make $25$. The $5$ times table ends at fifty when multiplying by ten.`],
      [R`Work out $2\times 9$.`, R`The product is $18$.`, R`Nine lots of $2$ make $18$. Adding nine lots of $2$ gives the same answer.`],
    ],
  },
  "bang-chia": {
    s: R`Dividing means sharing equally. Sharing $20$ sweets equally among $4$ children gives each child $20:4=5$ sweets, because $4\times 5=20$. If you know the multiplication, you can find the division.`,
    w: R`Dividing means finding the missing number in a multiplication. Asking $20:4$ is the same as asking $4$ times what makes $20$.`,
    p: R`Mixing up the number being divided and the number you divide by. The number before the division sign is the total number of things; the number after it is the number of equal shares.`,
    ex: [
      [R`There are $20$ sweets; work out $20:4$. How many sweets does each child get?`, [
        [R`Find the number $n$ so that $4\times n=20$.`, R`Sharing equally means equal shares with no sweets left over.`],
        [R`Since $4\times 5=20$, each child gets $5$ sweets.`, R`Multiplication checks the division. No sweets are left over.`],
      ], R`Each child gets $5$ sweets.`],
      [R`There are $18$ flowers put equally into vases, $2$ flowers in each vase. How many vases are needed?`, [
        [R`Split $18$ flowers into groups of $2$, so work out $18:2$.`, R`When you know how many are in each group and want the number of groups, divide.`],
        [R`Since $2\times 9=18$, we have $18:2=9$.`, R`Use the $2$ times table to find the answer to the division.`],
      ], R`You need $9$ vases.`],
    ],
    dr: [
      [R`Work out $18:2$.`, R`The quotient is $9$.`, R`Two times $9$ makes $18$, so it divides exactly and the quotient is $9$.`],
      [R`Work out $15:5$.`, R`The quotient is $3$.`, R`Five times $3$ makes $15$. This division is exact, with nothing left over.`],
      [R`Work out $16:2$.`, R`The quotient is $8$.`, R`Two times $8$ makes $16$. The quotient of this exact division is $8$.`],
    ],
  },
  "chia-2-5": {
    s: R`The $2$ division table is the $2$ times table read backwards, and the $5$ division table is the $5$ times table read backwards. Since $5\times 7=35$, we have $35:5=7$. To divide, ask what the divisor must be multiplied by to make the number being divided.`,
    w: R`Multiplication and division undo each other. Knowing one fact in the times table means knowing the two matching division facts.`,
    p: R`Reading the times table and taking the wrong factor. For $35:5$, the answer is the other factor $7$, not $5$.`,
    ex: [
      [R`There are $35$ notebooks put equally on $5$ shelves. How many notebooks are on each shelf?`, [
        [R`The calculation is $35:5$.`, R`Putting them equally on $5$ shelves means sharing into $5$ equal parts.`],
        [R`Since $5\times 7=35$, we have $35:5=7$.`, R`Find the product $35$ in the $5$ times table; the other factor is the answer.`],
      ], R`Each shelf has $7$ notebooks.`],
      [R`There are $45$ marbles shared equally among $5$ children. How many marbles does each child get? Could they be shared equally between $2$ children?`, [
        [R`We have $45:5=9$, because $5\times 9=45$.`, R`The $5$ times table helps find the answer when dividing by $5$.`],
        [R`The number $45$ ends in $5$, so it is odd and cannot be shared equally between $2$ children.`, R`Only even numbers can be split into two equal parts.`],
      ], R`Each child gets $9$ marbles; sharing between $2$ children would not be equal.`],
    ],
    dr: [
      [R`Work out $14:2$.`, R`The quotient is $7$.`, R`Two times $7$ makes $14$, so $14$ divided by $2$ is $7$.`],
      [R`Work out $45:5$.`, R`The quotient is $9$.`, R`Five times $9$ makes $45$, so $45$ divided by $5$ is $9$.`],
      [R`There are $20$ chopsticks put into pairs. How many pairs of chopsticks are there?`, R`There are $10$ pairs of chopsticks.`, R`Each pair has $2$ chopsticks, so divide $20$ by $2$ to get $10$.`],
    ],
  },
  tram: {
    s: R`Ten tens together make one hundred. The number $246$ has $2$ hundreds, $4$ tens and $6$ ones. Each digit sits in a place, and each place is ten times the place on its right.`,
    w: R`Ten tens bundle into one hundred, just as ten ones bundle into one ten. Each place is worth ten times the place to its right.`,
    p: R`Leaving out the place-holding $0$. The number with $3$ hundreds and $5$ ones is $305$, not $35$.`,
    ex: [
      [R`Write the number with $2$ hundreds, $4$ tens and $6$ ones.`, [
        [R`Two hundreds is $200$, and four tens is $40$.`, R`Each place has its own value: hundreds, tens, then ones.`],
        [R`Add $200+40+6=246$.`, R`Putting the three places together gives a three-digit number.`],
      ], R`The number is $246$.`],
      [R`How many hundreds, tens and ones does $507$ have? Write it as a sum.`, [
        [R`The number $507$ has $5$ hundreds, $0$ tens and $7$ ones.`, R`The $0$ in the middle shows there are no tens, but it must still be written to keep the places right.`],
        [R`As a sum: $507=500+7$.`, R`The tens are zero, so they do not need to appear in the sum.`],
      ], R`We have $507=500+7$, made of $5$ hundreds and $7$ ones.`],
    ],
    dr: [
      [R`How much is three hundreds?`, R`Three hundreds is $300$.`, R`Each hundred is $100$ ones. Three hundreds is $3$ lots of $100$.`],
      [R`Work out $400+50$.`, R`The sum is $450$.`, R`Four hundreds and five tens. The ones are still $0$.`],
      [R`Work out $1000-1$.`, R`The difference is $999$.`, R`The number just before $1000$ is $999$. Take one away from one thousand.`],
    ],
  },
  "so-sanh-tram": {
    s: R`To compare two three-digit numbers, look at the hundreds first. If the hundreds are equal, compare the tens, and only then the ones. For example $305$ and $350$: both have $3$ hundreds, the tens are $0<5$, so $305<350$.`,
    w: R`One hundred is more than any two-digit number. So the hundreds decide first, and only when they are equal do the tens matter.`,
    p: R`Comparing from the ones upwards. For $305$ and $350$ the hundreds are equal, so compare the tens: $0$ tens is fewer than $5$ tens.`,
    ex: [
      [R`Compare $305$ and $350$.`, [
        [R`Both numbers have $3$ hundreds.`, R`The hundreds are equal, so you cannot yet tell which is bigger.`],
        [R`The tens of $350$ are $5$ and of $305$ are $0$, so $350>305$.`, R`More tens means a bigger number. The ones do not change this.`],
      ], R`The number $350$ is bigger than $305$.`],
      [R`Put $640$, $604$, $460$ in order from biggest to smallest.`, [
        [R`Compare the hundreds: $460$ has $4$ hundreds, so it is the smallest.`, R`A number with fewer hundreds is smaller; there is no need to look at the other places.`],
        [R`The numbers $640$ and $604$ both have $6$ hundreds; compare the tens: $4>0$, so $640>604$.`, R`Only when the hundreds are equal do you move on to the tens.`],
      ], R`From biggest to smallest the order is $640$, $604$, $460$.`],
    ],
    dr: [
      [R`Which is bigger, $280$ or $802$?`, R`The number $802$ is bigger.`, R`The number $802$ has $8$ hundreds and $280$ has $2$ hundreds. More hundreds means a bigger number.`],
      [R`Compare $640$ and $604$.`, R`The number $640$ is bigger than $604$.`, R`Both have $6$ hundreds. The tens digit $4$ is bigger than the tens digit $0$.`],
      [R`Which number has $7$ hundreds and $8$ ones?`, R`That number is $708$.`, R`With no tens, the tens digit is $0$. Putting $700$ and $8$ together gives $708$.`],
    ],
  },
  "cong-tru-1000": {
    s: R`Line the numbers up in columns: hundreds under hundreds, tens under tens, ones under ones. Work from right to left, carrying to the place on the left when needed. For example $358+127=485$.`,
    w: R`A three-digit number is still just hundreds, tens and ones. Add or subtract place by place, swapping ten ones for one ten, or ten tens for one hundred, when needed.`,
    p: R`Putting a two-digit number too far to the left when adding it to a three-digit number. The ones digit must line up with the ones.`,
    ex: [
      [R`Work out $358+127$.`, [
        [R`Ones: $8+7=15$, write $5$ and carry $1$.`, R`Ten ones are swapped for one ten, so carry $1$ to the tens.`],
        [R`Tens: $5+2+1=8$. Hundreds: $3+1=4$. The sum is $485$.`, R`The carried digit is added to the tens; the hundreds have nothing to carry.`],
      ], R`The sum is $485$.`],
      [R`A school has $625$ pupils, of whom $348$ are girls. How many boys are there?`, [
        [R`The number of boys is $625-348$.`, R`Taking the girls away from all the pupils leaves the boys.`],
        [R`Subtract with borrowing: ones $15-8=7$, tens $11-4-1=6$, hundreds $6-3-1=2$, giving $277$.`, R`Each time you borrow from the place above, that place goes down by one.`],
      ], R`The school has $277$ boys.`],
    ],
    dr: [
      [R`Work out $245+132$.`, R`The sum is $377$.`, R`No place goes over $9$, so add place by place to get $377$.`],
      [R`Work out $562-238$.`, R`The difference is $324$.`, R`The ones borrow one ten: $12-8=4$. The tens become $5-3=2$, and the hundreds $5-2=3$.`],
      [R`A school has $416$ boys and $389$ girls. How many pupils are there altogether?`, R`The school has $805$ pupils.`, R`Ones $6+9=15$ carry $1$, tens $1+8+1=10$ carry $1$, hundreds $4+3+1=8$.`],
    ],
  },
  "gap-khuc": {
    s: R`A broken line is made of several straight segments joined end to end. Its length is the sum of the segments' lengths. Three segments of $4$ cm, $5$ cm and $6$ cm make a line $4+5+6=15$ cm long.`,
    w: R`Going along the whole broken line means going along each segment in turn. The distance travelled is the lengths of the segments added together.`,
    p: R`Adding segments with different units. Change them all to centimetres or all to metres before adding.`,
    ex: [
      [R`A broken line has three segments of $4$ centimetres, $5$ centimetres and $6$ centimetres. How many centimetres long is the whole line?`, [
        [R`Add $4+5$ to get $9$.`, R`The first two segments are both in centimetres, so they can be added.`],
        [R`Then add $9+6=15$ centimetres.`, R`The third segment is also in centimetres. The total of the three segments is the length of the whole line.`],
      ], R`The broken line is $15$ centimetres long.`],
      [R`An ant crawls along a broken line of $4$ segments, each $3$ centimetres long. How many centimetres does the ant crawl?`, [
        [R`The four segments are equal, so the length is $3\times 4$.`, R`Adding four equal numbers can be replaced by multiplying.`],
        [R`We have $3\times 4=12$.`, R`Check by adding: $3+3+3+3=12$.`],
      ], R`The ant crawls $12$ centimetres.`],
    ],
    dr: [
      [R`Two segments are $8$ centimetres and $7$ centimetres. How long are they altogether?`, R`They are $15$ centimetres long altogether.`, R`Both segments are in centimetres. Adding the lengths gives the length of the two-segment broken line.`],
      [R`A triangle has three sides of $3$, $4$ and $5$ centimetres. What is its perimeter?`, R`The perimeter is $12$ centimetres.`, R`The perimeter is the total length of the sides. All three sides are in the same unit, so they can be added.`],
      [R`A $20$ centimetre segment has $6$ centimetres taken off. How much is left?`, R`There are $14$ centimetres left.`, R`Taking part of a segment away means finding the difference of two lengths in the same unit.`],
    ],
  },
  "met-cm": {
    s: R`One metre is $100$ centimetres. To change metres to centimetres, multiply by $100$: $3$ m is $300$ cm. To change centimetres to metres, divide by $100$: $200$ cm is $2$ m.`,
    w: R`A metre ruler is divided into $100$ spaces of one centimetre each. So every metre is exactly $100$ centimetres.`,
    p: R`Doing the opposite operation. From metres to centimetres the number gets bigger, so multiply by $100$; from centimetres to metres the number gets smaller, so divide by $100$.`,
    ex: [
      [R`Change $3$ metres to centimetres and $200$ centimetres to metres.`, [
        [R`Three metres is $3\times 100=300$ centimetres.`, R`Each metre has one hundred centimetres. Multiply the number of metres by $100$.`],
        [R`Two hundred centimetres is $200:100=2$ metres.`, R`Divide by $100$ because one metre holds exactly one hundred centimetres.`],
      ], R`Three metres is $300$ centimetres and $200$ centimetres is $2$ metres.`],
      [R`A blue cloth is $2$ metres long and a red cloth is $150$ centimetres long. Which is longer, and by how many centimetres?`, [
        [R`Change to the same unit: $2$ metres is $200$ centimetres.`, R`To compare two measurements, write them in the same unit.`],
        [R`Compare: $200-150=50$ centimetres.`, R`The blue cloth has the bigger measurement, so it is longer.`],
      ], R`The blue cloth is $50$ centimetres longer than the red cloth.`],
    ],
    dr: [
      [R`Change $5$ metres to centimetres.`, R`It is $500$ centimetres.`, R`Multiply the number of metres by $100$. Five metres is five hundred centimetres.`],
      [R`Change $400$ centimetres to metres.`, R`It is $4$ metres.`, R`Divide the number of centimetres by $100$. Four hundred centimetres is four metres.`],
      [R`A $1$ metre piece is joined to a $20$ centimetre piece. How many centimetres long is the whole piece?`, R`The whole piece is $120$ centimetres long.`, R`Change metres to centimetres before adding. One metre is $100$ centimetres, and $20$ more makes $120$.`],
    ],
  },
  "kg-lit": {
    s: R`The kilogram, written kg, is used to weigh how heavy something is. The litre, written l, is used to measure how much water is in a container. Only add or subtract measurements in the same unit.`,
    w: R`A unit of measure is a standard amount everyone agrees to use. A thing weighing so many kilograms is as heavy as that many one-kilogram weights.`,
    p: R`Adding kilograms to litres. The two units measure different things, so they cannot be added together.`,
    ex: [
      [R`A bag of rice weighs $5$ kilograms and a bag of sugar weighs $2$ kilograms. How many kilograms do both bags weigh?`, [
        [R`Both measurements are in kilograms, so they can be added.`, R`With the same unit, add the measurements like two numbers.`],
        [R`We have $5+2=7$ kilograms.`, R`Putting both bags on the scales shows the total of the two weights.`],
      ], R`Both bags weigh $7$ kilograms.`],
      [R`A can holds $10$ litres of water. It is poured into $3$ bottles of $2$ litres each. How many litres are left in the can?`, [
        [R`The three bottles hold $2\times 3=6$ litres.`, R`Each bottle holds the same amount, so multiply.`],
        [R`The can has $10-6=4$ litres left.`, R`The water poured out is taken away from the amount at the start.`],
      ], R`The can has $4$ litres of water left.`],
    ],
    dr: [
      [R`A big can holds $10$ litres of water and a small can holds $4$ litres. How many more litres does the big can hold?`, R`It holds $6$ litres more.`, R`To find how much more, take the smaller number from the bigger: $10-4=6$ litres.`],
      [R`Each bottle holds $2$ litres of water. How many litres do five such bottles hold?`, R`They hold $10$ litres.`, R`Five equal bottles is five lots of $2$ litres, that is $10$ litres.`],
      [R`A bag of rice weighs $50$ kilograms and $18$ kilograms have been used. How many kilograms are left?`, R`There are $32$ kilograms left.`, R`Take $18$ from $50$, borrowing one ten for the ones, to get $32$.`],
    ],
  },
  "gio-phut": {
    s: R`One hour has $60$ minutes and one day has $24$ hours. When the long hand points at $6$, $30$ minutes have passed, which is half past. The numbers on the clock face are $5$ minutes apart.`,
    w: R`The minute hand going once round the clock face is $60$ minutes, and the face is divided into $12$ numbers. From one number to the next, the minute hand moves $60:12=5$ minutes.`,
    p: R`Seeing the minute hand at $6$ and reading it as $6$ minutes. The number $6$ on the clock face stands for $30$ minutes.`,
    ex: [
      [R`The hour hand is between $8$ and $9$, and the minute hand points at $6$. What time does the clock show? How many minutes until $9$ o'clock?`, [
        [R`The clock shows $8$ hours $30$ minutes.`, R`The minute hand at $6$ has gone half way round, that is $30$ minutes after $8$ o'clock.`],
        [R`There are $60-30=30$ minutes until $9$ o'clock.`, R`An hour has $60$ minutes; with $30$ minutes gone, $30$ minutes are left.`],
      ], R`The clock shows $8$ hours $30$ minutes, and there are $30$ minutes until $9$ o'clock.`],
      [R`A film starts at $7$ o'clock in the evening and lasts $1$ hour $30$ minutes. What time does it end?`, [
        [R`Add $1$ hour: $7$ o'clock becomes $8$ o'clock.`, R`Add the hours first because it is easier, then add the minutes.`],
        [R`Add $30$ minutes: $8$ o'clock becomes $8$ hours $30$ minutes.`, R`Thirty minutes is half an hour, with the minute hand pointing at six.`],
      ], R`The film ends at $8$ hours $30$ minutes in the evening.`],
    ],
    dr: [
      [R`How many minutes are in half an hour?`, R`Half an hour has $30$ minutes.`, R`One hour has $60$ minutes; halving it gives $30$ minutes.`],
      [R`Lan studies from $7$ o'clock to $10$ o'clock. For how many hours does Lan study?`, R`Lan studies for $3$ hours.`, R`Take the starting time from the finishing time: $10-7=3$ hours.`],
      [R`The minute hand points at $3$. How many minutes have passed since the hour?`, R`$15$ minutes have passed.`, R`The numbers on the clock face are $5$ minutes apart, so the number $3$ stands for $15$ minutes.`],
    ],
  },
  "hinh-khoi": {
    s: R`A milk carton shaped like a can is a cylinder, with two circular ends. A ball is a sphere, round in every direction. A quadrilateral is a shape with $4$ straight sides and $4$ corners; even when it is lopsided it is still a quadrilateral.`,
    w: R`Shapes and solids are named by features you can count and see: the number of sides, the number of corners, flat faces or curved ones. Turning a shape or changing its size does not change those features.`,
    p: R`Calling only squares and rectangles quadrilaterals. Every closed shape with four straight sides is a quadrilateral, even a lopsided one.`,
    ex: [
      [R`A quadrilateral has $4$ sides. How many sides do three separate quadrilaterals have altogether?`, [
        [R`Each shape has $4$ sides, and there are $3$ such shapes.`, R`The shapes are separate, so no side is shared.`],
        [R`We have $4+4+4=12$ sides.`, R`Add the sides of each shape; each shape gives exactly four sides.`],
      ], R`There are $12$ sides altogether.`],
      [R`Among these things: a ball, a drink can, a pencil box, a marble. Which are spheres and which are cylinders?`, [
        [R`The ball and the marble are round in every direction, so they are spheres.`, R`A sphere can roll in any direction and has no flat face.`],
        [R`The drink can has two equal circular ends, so it is a cylinder.`, R`A cylinder can stand on its end and roll when laid on its side.`],
      ], R`The ball and the marble are spheres, the drink can is a cylinder, and the pencil box is neither.`],
    ],
    dr: [
      [R`How many corners do two separate quadrilaterals have altogether?`, R`They have $8$ corners altogether.`, R`Each quadrilateral has $4$ corners; two shapes have $4+4=8$ corners.`],
      [R`There are $5$ cylinder-shaped milk cartons and $3$ sphere-shaped balls. How many solids are there altogether?`, R`There are $8$ solids altogether.`, R`Put the cylinders and the spheres together: $5+3=8$ solids.`],
      [R`A cylinder has $2$ circular ends. How many ends do four cylinders have altogether?`, R`They have $8$ ends altogether.`, R`Four solids with $2$ ends each is four lots of $2$, that is $8$.`],
    ],
  },
  "bieu-do-tranh": {
    s: R`A pictogram shows each thing as a small picture. The row with more pictures has more things. Count the pictures in each row to compare and to find totals.`,
    w: R`Each picture stands for exactly one thing, so a longer row has more things. Looking at the lengths of the rows lets you compare straight away, even before counting.`,
    p: R`Drawing the pictures in different sizes or not lined up. Then a longer row does not necessarily have more pictures.`,
    ex: [
      [R`A pictogram has a row of $6$ apples and a row of $4$ oranges. Which fruit is there more of, and by how many?`, [
        [R`The apple row has $6$ pictures and the orange row has $4$.`, R`Each picture stands for one fruit, so counting pictures means counting fruit.`],
        [R`There are $6-4=2$ more apples than oranges.`, R`Compare two rows by taking the smaller number from the bigger.`],
      ], R`There are $2$ more apples than oranges.`],
      [R`In a pictogram, each book picture stands for $2$ books. Minh's row has $4$ pictures and An's row has $3$. How many books did the two children read altogether?`, [
        [R`Minh read $2\times 4=8$ books, and An read $2\times 3=6$ books.`, R`Each picture is not one book but two, so multiply by two.`],
        [R`Altogether that is $8+6=14$ books.`, R`Add the two children's books together.`],
      ], R`The two children read $14$ books altogether.`],
    ],
    dr: [
      [R`The cat row shows $3$ cats and the dog row shows $5$ dogs. How many animals are there altogether?`, R`There are $8$ animals altogether.`, R`Put the two rows together: $3+5=8$ animals.`],
      [R`The pen row shows $7$ pens and the ruler row shows $7$ rulers. Which row has more?`, R`The two rows are equal.`, R`Both rows have $7$ pictures, so the numbers are the same.`],
      [R`Three rows show $2$, $4$ and $6$ flowers. How many more flowers does the biggest row have than the smallest?`, R`It has $4$ more flowers.`, R`The biggest row has $6$ flowers and the smallest has $2$; the difference is $4$.`],
    ],
  },
};
