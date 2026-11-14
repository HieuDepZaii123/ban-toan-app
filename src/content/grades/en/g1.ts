/** Lớp 1 bằng tiếng Anh. Thứ tự ví dụ và bài luyện khớp bản tiếng Việt. */
import type { LessonEn } from "./types.ts";

const R = String.raw;

export const g1En: Record<string, LessonEn> = {
  "dem-10": {
    s: R`Counting means pointing at each thing and saying one number, once for each thing. The numbers $1$, $2$, $3$ up to $10$ come one after another. The next number is always exactly $1$ more than the one before, like putting one more marble in a bag.`,
    w: R`Each time you count on by one, you add exactly one more thing, so the next number is always one more than the one before.`,
    p: R`Missing a thing or counting it twice. Touch each thing with your finger, just once each.`,
    ex: [
      [R`There are $4$ stars. Count one more star. What number do you get?`, [
        [R`The number right after $4$ is $5$.`, R`On the number line, each counting step adds one.`],
        [R`So you count to $5$.`, R`One more star makes the group grow from four to five.`],
      ], R`You count to $5$.`],
      [R`Count backwards from $10$ to $6$. Write the numbers you say.`, [
        [R`Start at $10$ and take away one each time: $10$, $9$, $8$, $7$, $6$.`, R`Counting backwards means stepping back one at a time along the numbers.`],
        [R`You say $5$ numbers in all.`, R`Point at each number and count one, two, three, four, five.`],
      ], R`The numbers are $10$, $9$, $8$, $7$, $6$, which is $5$ numbers in all.`],
    ],
    dr: [
      [R`Which number comes right after $7$?`, R`The number after it is $8$.`, R`The number right after a number is that number plus $1$. After $7$ comes $8$.`],
      [R`Which number comes right before $6$?`, R`The number before it is $5$.`, R`The number right before a number is that number take away $1$. Before $6$ comes $5$.`],
      [R`Count to $3$, then count $1$ more. What number do you get?`, R`You get $4$.`, R`Counting one more is one step along the numbers. From $3$ to $4$.`],
    ],
  },
  "so-sanh": {
    s: R`To find which group has more, match the things in the two groups in pairs. The group with things left over has more. The sign $>$ means greater than, the sign $<$ means less than, and the pointed end always points at the smaller number.`,
    w: R`Match each thing in one group with a thing in the other. The group with things left over has more, so its number is bigger.`,
    p: R`Writing the sign the wrong way round. The point of the sign always faces the smaller number, and the open side faces the bigger one.`,
    ex: [
      [R`Compare $8$ and $5$.`, [
        [R`Counting from $5$, you still have to go on to reach $8$.`, R`The number $8$ comes after $5$ when counting.`],
        [R`So $8>5$.`, R`A number that comes later is bigger than one that comes earlier.`],
      ], R`We have $8>5$.`],
      [R`Lan has $6$ sweets and Hoa has $9$ sweets. Who has more sweets?`, [
        [R`Compare the two numbers: $6<9$.`, R`When counting, $9$ comes after $6$, so $9$ is bigger.`],
        [R`So Hoa has more sweets than Lan.`, R`The bigger number means more things.`],
      ], R`Hoa has more sweets.`],
    ],
    dr: [
      [R`Which is bigger, $2$ or $9$?`, R`The number $9$ is bigger than $2$.`, R`The number $9$ comes after $2$ when counting, so $9$ is bigger than $2$.`],
      [R`Are the number right after $3$ and the number right before $5$ the same number?`, R`Yes. Both ways give the number $4$.`, R`The number after $3$ is $3$ plus $1$. The number before $5$ is $5$ take away $1$. Both answers are $4$.`],
      [R`Which is smaller, $1$ or $10$?`, R`The number $1$ is smaller than $10$.`, R`The number $1$ comes before $10$. A number that comes earlier is smaller.`],
    ],
  },
  "so-0": {
    s: R`The number $0$ is used when there is nothing at all. A plate has $3$ apples; eat all $3$ and there are $0$ apples left. Adding $0$ or taking away $0$ does not change a number.`,
    w: R`Counting the things in an empty box gives nothing to count, so we need a special number for that. Adding an empty group does not make the other group any bigger.`,
    p: R`Thinking $0$ is not a number. The number $0$ is still a number, used to say there is nothing.`,
    ex: [
      [R`There are $3$ apples on a plate. A child eats all $3$ apples. How many are left on the plate?`, [
        [R`Take $3$ apples away from $3$ apples, written $3-3$.`, R`Eating them means taking them away, so we subtract.`],
        [R`The plate has no apples left, so $3-3=0$.`, R`When there are no things left, we write the number zero.`],
      ], R`There are $0$ apples left on the plate.`],
      [R`Work out $5-5$ and $0+4$.`, [
        [R`Having $5$ and taking all $5$ away leaves nothing: $5-5=0$.`, R`A number take away itself leaves zero.`],
        [R`Put $4$ into the empty space: $0+4=4$.`, R`Adding zero keeps a number the same.`],
      ], R`We have $5-5=0$ and $0+4=4$.`],
    ],
    dr: [
      [R`Work out $5+0$.`, R`The sum is $5$.`, R`Adding no apples means there are still $5$ apples.`],
      [R`Work out $4-0$.`, R`The difference is $4$.`, R`Taking no apples away leaves all $4$ apples.`],
      [R`Work out $6-6$.`, R`The difference is $0$.`, R`Taking all $6$ away leaves nothing, which is $0$.`],
    ],
  },
  "tach-gop": {
    s: R`A group of things can be split into two parts. With $5$ sweets, if the left hand holds $2$ then the right hand holds $3$. Putting the two parts together gives back exactly the whole group.`,
    w: R`Splitting a group into two parts does not lose anything. So the two parts together always make the whole group, and this is the root of both adding and taking away.`,
    p: R`Remembering only one way to split. The number $5$ splits into $4$ and $1$, and also into $3$ and $2$.`,
    ex: [
      [R`There are $6$ marbles shared between two hands. The left hand holds $2$ marbles. How many does the right hand hold?`, [
        [R`The number $6$ splits into $2$ and another number.`, R`The two hands together must hold all $6$ marbles.`],
        [R`Since $2$ and $4$ make $6$, the right hand holds $4$ marbles.`, R`Count on from $2$: three, four, five, six is four more marbles.`],
      ], R`The right hand holds $4$ marbles.`],
      [R`Split the number $8$ into two numbers. Give three different ways.`, [
        [R`Three ways are $8=1+7$, $8=3+5$ and $8=4+4$.`, R`Take one part away from eight; what is left is the second number.`],
        [R`Check by putting them together: $1+7$, $3+5$, $4+4$ all make $8$.`, R`Putting the two parts back together gives the number you started with.`],
      ], R`You can split $8=1+7$, $8=3+5$ or $8=4+4$.`],
    ],
    dr: [
      [R`The number $5$ splits into $3$ and what?`, R`It splits into $3$ and $2$.`, R`Three and two together make five, so the other part is two.`],
      [R`What do $4$ and $4$ make together?`, R`They make $8$.`, R`Count on four steps from $4$ to reach $8$.`],
      [R`The number $10$ splits into $7$ and what?`, R`It splits into $7$ and $3$.`, R`Seven and three together make exactly ten.`],
    ],
  },
  "cong-10": {
    s: R`Adding means putting two groups together. You have $3$ oranges and Mum gives you $2$ more, so you have $3+2=5$ oranges. You can count on from the bigger number: start at $3$ and count two more steps, $4$, $5$.`,
    w: R`Putting two groups together and counting from the start gives the same answer as counting on from the first group. That is why $3+2$ and $2+3$ both make $5$.`,
    p: R`Counting the number you already have again when counting on. For $3+2$, start counting at $4$, not at $3$.`,
    ex: [
      [R`There are $3$ oranges. Add $2$ more. How many oranges are there altogether?`, [
        [R`Put the $3$ oranges together with the $2$ oranges.`, R`Adding takes both groups, leaving none out.`],
        [R`Counting gives $5$ oranges.`, R`From $3$ count on two steps: four, then five.`],
      ], R`There are $5$ oranges altogether.`],
      [R`In a coop there are $4$ roosters and $5$ hens. How many chickens are there altogether?`, [
        [R`Put the two groups of chickens together, so add: $4+5$.`, R`Asking for how many altogether means putting the groups into one.`],
        [R`Count on four steps from $5$: $6$, $7$, $8$, $9$.`, R`Counting on from the bigger number is quicker.`],
      ], R`There are $9$ chickens altogether.`],
    ],
    dr: [
      [R`Work out $4+3$.`, R`The sum is $7$.`, R`Put the group of $4$ together with the group of $3$. Counting on from $4$ gives $7$.`],
      [R`Work out $6+4$.`, R`The sum is $10$.`, R`Putting $6$ and $4$ together still stays within $10$. The sum is exactly $10$.`],
      [R`There is $1$ fish, and $5$ more come. How many fish are there altogether?`, R`There are $6$ fish altogether.`, R`Adding puts both groups of fish together. One and five more make six.`],
    ],
  },
  "tru-10": {
    s: R`Taking away means removing a part. You have $7$ marbles and give $3$ to a friend, so you have $7-3=4$ marbles left. To check, add what is left to what was taken away: $4+3=7$.`,
    w: R`Taking some away and then putting back exactly the same number brings you back to the start. From $7$ take away $3$ leaves $4$, because $4$ and $3$ more make $7$ again.`,
    p: R`Taking the small number from the big one out of habit. The number before the minus sign is what you start with; the number after it is what you take away.`,
    ex: [
      [R`There are $7$ marbles. Give away $3$. How many are left?`, [
        [R`From $7$ take away $3$.`, R`Taking away makes the first group smaller by exactly the number given away.`],
        [R`There are $4$ marbles left.`, R`Because $7-3=4$. Adding $3$ back to $4$ gives $7$, so the subtraction is right.`],
      ], R`There are $4$ marbles left.`],
      [R`There are $9$ birds on a branch. Then $4$ fly away. How many birds are left on the branch?`, [
        [R`Flying away means taking away, so subtract: $9-4$.`, R`Asking how many are left means starting number take away the number that went.`],
        [R`Count back four steps from $9$: $8$, $7$, $6$, $5$.`, R`Each step back stands for one bird flying away.`],
      ], R`There are $5$ birds left on the branch.`],
    ],
    dr: [
      [R`Work out $9-2$.`, R`The difference is $7$.`, R`Taking $2$ away from $9$ leaves $7$. Adding $2$ back to $7$ gives $9$.`],
      [R`Work out $10-6$.`, R`The difference is $4$.`, R`From $10$ take away $6$ leaves $4$. This subtraction stays within $10$.`],
      [R`You have $5$ sweets and eat all $5$. How many are left?`, R`There are $0$ sweets left.`, R`Taking away the whole group leaves nothing. The difference is $0$.`],
    ],
  },
  chuc: {
    s: R`Ten sticks tied together make one bundle, called a ten. The number $34$ is $3$ bundles of ten and $4$ loose sticks. The left digit tells the number of tens; the right digit tells the number of loose sticks.`,
    w: R`Ten sticks are tied into one bundle of ten. Counting the bundles gives the tens digit, and counting the loose sticks gives the ones digit.`,
    p: R`Reading $34$ as $3$ and $4$ and adding them to get $7$. The digit $3$ here means $3$ tens, that is $30$.`,
    ex: [
      [R`How many tens and how many ones does $34$ have?`, [
        [R`The digit $3$ is in the tens place, so there are $3$ tens.`, R`In a two-digit number, the tens digit is the one on the left.`],
        [R`The digit $4$ means $4$ ones, and $3$ tens and $4$ ones make $34$.`, R`Three tens is $30$, and $4$ more makes $34$.`],
      ], R`The number $34$ has $3$ tens and $4$ ones.`],
      [R`Write the number with $7$ tens and $0$ ones, then the number with $5$ tens and $8$ ones.`, [
        [R`Seven tens and no ones is $70$.`, R`The tens digit is written first and the ones digit after it.`],
        [R`Five tens and eight ones is $58$.`, R`Five bundles of ten sticks plus eight loose sticks.`],
      ], R`The two numbers are $70$ and $58$.`],
    ],
    dr: [
      [R`How much is two tens?`, R`Two tens is $20$.`, R`Each ten is $10$ ones. Two tens is $2$ lots of $10$.`],
      [R`Work out $50+7$.`, R`The sum is $57$.`, R`Five tens and $7$ more ones. Putting the two places together gives $57$.`],
      [R`Work out $20+30$.`, R`The sum is $50$.`, R`Add the tens together. Two tens and three more tens make five tens.`],
    ],
  },
  "so-sanh-chuc": {
    s: R`To compare two two-digit numbers, look at the tens first. The number $46$ has $4$ tens and $38$ has $3$ tens, so $46$ is bigger, even though $8$ is bigger than $6$. Only when the tens are the same do you compare the ones.`,
    w: R`One ten is already more than any number of ones from $0$ to $9$. So the number with more tens is bigger, even if its ones digit is small.`,
    p: R`Looking only at the ones. The number $38$ has a big digit $8$ but is still smaller than $46$, because $3$ tens is less than $4$ tens.`,
    ex: [
      [R`Compare $46$ and $38$.`, [
        [R`The number $46$ has $4$ tens, and $38$ has $3$ tens.`, R`The tens digit is on the left. Compare it before the ones.`],
        [R`Since $4>3$, we have $46>38$.`, R`More tens means a bigger number, even when the ones might be smaller.`],
      ], R`The number $46$ is bigger than $38$.`],
      [R`Put the numbers $52$, $25$, $57$ in order from smallest to biggest.`, [
        [R`Compare the tens first: $25$ has $2$ tens, so it is the smallest.`, R`A number with fewer tens is smaller; there is no need to look at the ones.`],
        [R`The numbers $52$ and $57$ both have $5$ tens, so compare the ones: $2<7$, so $52<57$.`, R`Only when the tens are equal do you move on to the ones.`],
      ], R`From smallest to biggest the order is $25$, $52$, $57$.`],
    ],
    dr: [
      [R`Which is bigger, $25$ or $52$?`, R`The number $52$ is bigger than $25$.`, R`The number $52$ has $5$ tens and $25$ has $2$ tens. More tens means a bigger number.`],
      [R`Compare $61$ and $67$.`, R`The number $67$ is bigger than $61$.`, R`Both numbers have $6$ tens, so compare the ones. The number $7$ is bigger than $1$.`],
      [R`Which number is three tens and seven ones?`, R`That number is $37$.`, R`Three tens is $30$, and $7$ more ones makes $37$.`],
    ],
  },
  "cong-khong-nho": {
    s: R`Line up the two numbers in columns: tens under tens, ones under ones. Add the ones first, then the tens. For example $42+35$: ones $2+5=7$, tens $4+3=7$, giving $77$.`,
    w: R`Tens add to tens and ones add to ones, just like putting the bundles together and the loose sticks together.`,
    p: R`Lining up the columns wrongly. The ones digit must be straight under the ones, and the tens under the tens.`,
    ex: [
      [R`Work out $42+35$.`, [
        [R`Ones: $2+5=7$.`, R`The ones add up to less than $10$, so there is nothing to carry to the tens.`],
        [R`Tens: $4+3=7$. The sum is $77$.`, R`Each place is added on its own. Putting $7$ tens and $7$ ones together gives $77$.`],
      ], R`The sum is $77$.`],
      [R`Class 1A has $23$ children and class 1B has $25$ children. How many children are in the two classes altogether?`, [
        [R`Add the ones: $3+5=8$.`, R`The ones add up to less than ten, so there is nothing to carry.`],
        [R`Add the tens: $2+2=4$. So $23+25=48$.`, R`Four tens and eight ones make forty-eight.`],
      ], R`The two classes have $48$ children altogether.`],
    ],
    dr: [
      [R`Work out $21+46$.`, R`The sum is $67$.`, R`The ones $1+6$ and the tens $2+4$ need no carrying.`],
      [R`Work out $50+30$.`, R`The sum is $80$.`, R`Two whole tens numbers are added by their tens. Five tens and three more tens make eight tens.`],
      [R`Work out $14+5$.`, R`The sum is $19$.`, R`Only the ones change. The sum $4+5$ is $9$, not yet $10$.`],
    ],
  },
  "tru-khong-nho": {
    s: R`Line up the two numbers in columns, then take away the ones first and the tens after. For example $57-24$: ones $7-4=3$, tens $5-2=3$, giving $33$. This lesson only has subtractions that need no borrowing.`,
    w: R`Take loose sticks away from the loose sticks, and bundles away from the bundles. When there are enough loose sticks, there is no need to untie a bundle.`,
    p: R`Taking away the tens and forgetting the ones. Always take away the ones first, then the tens.`,
    ex: [
      [R`Work out $57-24$.`, [
        [R`Ones: $7-4=3$.`, R`The digit $7$ is bigger than $4$, so you can take away straight away without borrowing.`],
        [R`Tens: $5-2=3$. The difference is $33$.`, R`The tens are taken away on their own. Putting $3$ tens and $3$ ones together gives $33$.`],
      ], R`The difference is $33$.`],
      [R`Mum buys $68$ eggs and uses $35$. How many eggs are left?`, [
        [R`Take away the ones: $8-5=3$.`, R`Eight is bigger than five, so you can take away straight away without borrowing.`],
        [R`Take away the tens: $6-3=3$. So $68-35=33$.`, R`Check: $33+35=68$, exactly the number of eggs at the start.`],
      ], R`There are $33$ eggs left.`],
    ],
    dr: [
      [R`Work out $68-35$.`, R`The difference is $33$.`, R`The ones $8-5$ and the tens $6-3$ can both be taken away without borrowing.`],
      [R`Work out $90-40$.`, R`The difference is $50$.`, R`Take the tens away from each other. Nine tens take away four tens leaves five tens.`],
      [R`Work out $29-6$.`, R`The difference is $23$.`, R`Only the ones change. The difference $9-6$ is $3$, and the tens stay the same.`],
    ],
  },
  "hinh-quen": {
    s: R`Count the sides to name a shape. A triangle has $3$ sides. A square has $4$ sides of the same length. A rectangle has $4$ sides, two long and two short. A circle has no straight sides.`,
    w: R`A shape's name goes with its number of sides. Count all the way round the shape: three sides is a triangle; four equal sides and four right angles is a square.`,
    p: R`Not recognising a triangle when it is turned upside down. Turning a shape does not change the number of sides, so its name does not change.`,
    ex: [
      [R`A triangle has $3$ sides. How many sides do two triangles have altogether?`, [
        [R`Each shape has $3$ sides.`, R`Counting the sides of one triangle gives three.`],
        [R`Two shapes have $3+3=6$ sides.`, R`Add the sides of each shape. Each side is counted once.`],
      ], R`The two shapes have $6$ sides altogether.`],
      [R`A square and a triangle have how many sides and how many corners altogether?`, [
        [R`The square has $4$ sides and the triangle has $3$ sides, so $4+3=7$ sides in all.`, R`Count each side of each shape, then add.`],
        [R`Each shape has as many corners as sides, so there are also $7$ corners.`, R`Each corner is where two sides meet; going round a shape shows it has as many corners as sides.`],
      ], R`There are $7$ sides and $7$ corners altogether.`],
    ],
    dr: [
      [R`How many sides do a triangle and a square have altogether?`, R`They have $7$ sides altogether.`, R`A triangle has three sides and a square has four. Add the two numbers of sides.`],
      [R`How many sides do three triangles have altogether?`, R`They have $9$ sides altogether.`, R`Each triangle has three sides. Three shapes means three lots of three.`],
      [R`How many sides do two rectangles have altogether?`, R`They have $8$ sides altogether.`, R`Each rectangle has four sides. Two shapes means adding four and four.`],
    ],
  },
  "do-cm": {
    s: R`The centimetre, written cm, is a unit for measuring length. Put one end of the object at the $0$ mark of the ruler and read the number at the other end. A pencil $12$ cm long is longer than a rubber $3$ cm long by $12-3=9$ cm.`,
    w: R`A ruler is marked in equal spaces, each one centimetre long. The number of spaces along the object is its length.`,
    p: R`Putting the end of the object at the $1$ mark instead of the $0$ mark. Then the reading is one centimetre too much.`,
    ex: [
      [R`A pencil is $12$ centimetres long and a rubber is $3$ centimetres long. How many centimetres longer is the pencil than the rubber?`, [
        [R`Take the length of the rubber away from the length of the pencil.`, R`How much longer is the difference of two measurements in the same unit, centimetres.`],
        [R`The difference is $12-3=9$ centimetres.`, R`Taking $3$ away from $12$ leaves $9$.`],
      ], R`The pencil is $9$ centimetres longer.`],
      [R`A piece of string is $15$ centimetres long. Cut off $4$ centimetres. How many centimetres long is the string now?`, [
        [R`Cutting off means taking away, so work out $15-4$.`, R`Both measurements are in centimetres, so you can take one from the other directly.`],
        [R`We have $15-4=11$.`, R`The ones $5-4=1$, and the tens stay at $1$.`],
      ], R`The string is now $11$ centimetres long.`],
    ],
    dr: [
      [R`A $7$ centimetre piece is joined to a $2$ centimetre piece. How long is the whole piece?`, R`The whole piece is $9$ centimetres long.`, R`Two pieces in the same unit, centimetres, add their lengths.`],
      [R`A ruler is $20$ centimetres long and a pen is $15$ centimetres long. How much longer is the ruler?`, R`The ruler is $5$ centimetres longer.`, R`The difference of the two measurements gives how much longer.`],
      [R`One hand span is $10$ centimetres. How long are two hand spans end to end?`, R`They are $20$ centimetres long.`, R`Two lots of the same length means adding the two measurements.`],
    ],
  },
  "xem-gio": {
    s: R`A clock has a short hand for the hours and a long hand for the minutes. When the long hand points straight at $12$, it is an exact hour, and the number the short hand points at tells what o'clock it is. From $3$ o'clock to $6$ o'clock is $3$ hours.`,
    w: R`When the minute hand goes all the way round once, the hour hand moves on to the next number. When the minute hand is back at $12$, exactly one hour has passed.`,
    p: R`Mixing up the short hand and the long hand. The short hand shows the hours, and the long hand shows the minutes.`,
    ex: [
      [R`The hour hand points at $3$ and the minute hand points at $12$. What time is it? How many hours is it until $6$ o'clock?`, [
        [R`The minute hand is at $12$, so it is an exact hour. The hour hand is at $3$, so it is $3$ o'clock.`, R`It is an exact hour when the minute hand points straight at $12$.`],
        [R`From $3$ o'clock to $6$ o'clock is $6-3=3$ hours.`, R`Take one number on the clock face from the other to find how many whole hours.`],
      ], R`It is $3$ o'clock, and there are $3$ hours until $6$ o'clock.`],
      [R`Nam goes to school at $7$ o'clock and comes home at $11$ o'clock. How many hours is Nam at school?`, [
        [R`Count from $7$ o'clock to $11$ o'clock: $8$, $9$, $10$, $11$.`, R`Each time the hour hand moves on to the next number, one more hour has passed.`],
        [R`That is $4$ steps, so $11-7=4$ hours.`, R`The length of time is the later hour take away the earlier hour.`],
      ], R`Nam is at school for $4$ hours.`],
    ],
    dr: [
      [R`The hour hand points at $8$ and the minute hand at $12$. What time is it?`, R`It is $8$ o'clock.`, R`The minute hand at $12$ means an exact hour. The number the hour hand points at is the hour.`],
      [R`How many hours is it from $1$ o'clock to $4$ o'clock?`, R`It is $3$ hours.`, R`The difference between two exact hours on the clock face is the length of time.`],
      [R`It is now $9$ o'clock. What time is it $1$ hour later?`, R`It is $10$ o'clock.`, R`One more exact hour means moving on to the next number on the clock face.`],
    ],
  },
  "xem-lich": {
    s: R`A week has $7$ days, from Monday to Sunday. A calendar shows the day and the month. A month has $31$ days; if $10$ days have passed, there are $31-10=21$ days left.`,
    w: R`The days of a month are numbered one after another from $1$. The days that have passed and the days left together make exactly the number of days in the whole month.`,
    p: R`Thinking every month has $30$ days. Some months have $31$ days, some have $30$, and month $2$, February, has $28$ or $29$ days.`,
    ex: [
      [R`March, month $3$, has $31$ days. After $10$ days have passed, how many days are left in the month?`, [
        [R`Month $3$ has $31$ days.`, R`Look at month $3$ on the calendar to see how many days it has.`],
        [R`There are $31-10=21$ days left.`, R`The days left are the days in the month take away the days that have passed.`],
      ], R`There are $21$ days left.`],
      [R`Today is Monday. What day will it be in $3$ days?`, [
        [R`Count on one day at a time: Tuesday, Wednesday, Thursday.`, R`The days of the week follow one another in order on the calendar.`],
        [R`The third day counted is Thursday.`, R`Stop at the last day once you have counted three days.`],
      ], R`In $3$ days it will be Thursday.`],
    ],
    dr: [
      [R`How many days are in two weeks?`, R`Two weeks have $14$ days.`, R`Each week has seven days. Two weeks is two lots of seven days.`],
      [R`April, month $4$, has $30$ days. After $12$ days have passed, how many days are left?`, R`There are $18$ days left.`, R`Take the days that have passed away from the days in the month.`],
      [R`In one week, $3$ days have passed. How many days are left in the week?`, R`There are $4$ days left.`, R`A week has seven days. Seven take away the three days that have passed leaves four days.`],
    ],
  },
};
