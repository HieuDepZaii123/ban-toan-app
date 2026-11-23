/** Bản tiếng Anh của các bài bổ sung lớp 1–8 (lopExtra2.ts). */
import type { LessonEn } from "./types.ts";

const R = String.raw;

export const g1ExtraEn: Record<string, LessonEn> = {
  "toan-them": {
    s: R`When more things are added, we add. Lan has $5$ balls and her mother buys $3$ more, so she has $5+3=8$ balls. After reading the problem, ask yourself: how many were there at first, how many were added, and only then write the calculation.`,
    w: R`Adding to a group joins two groups into a bigger one, and joining groups is addition. So when the problem says more, a gift or bought more, we add.`,
    p: R`Seeing two numbers and rushing to subtract. Check whether the things get more or fewer: more means add, fewer means subtract.`,
    ex: [
      [R`Lan has $5$ balls and her mother buys $3$ more. How many balls does Lan have in all?`, [
        [R`At first there are $5$ and $3$ more are added, so we add.`, R`Adding more makes the number bigger, so we use addition.`],
        [R`The calculation is $5+3=8$.`, R`Counting on from $5$ by three steps gives $6$, $7$, $8$.`],
      ], R`Lan has $8$ balls in all.`],
      [R`Nam has $4$ sweets and a friend gives him $6$ more. How many sweets does Nam have in all?`, [
        [R`There are $4$ and $6$ more are added, so we add.`, R`A friend giving more means adding, so we use addition.`],
        [R`The calculation is $4+6=10$.`, R`Four and six put together make exactly ten.`],
      ], R`Nam has $10$ sweets in all.`],
    ],
    dr: [
      [R`There are $7$ cars and $2$ more come. How many cars are there in all?`, R`There are $9$ cars.`, R`Adding more means we add: $7+2=9$.`],
      [R`Hoa has $6$ flowers and a friend gives her $4$ more. How many flowers does Hoa have in all?`, R`There are $10$ flowers.`, R`Adding more means we add: $6+4=10$.`],
      [R`Binh has $3$ blue marbles and $5$ red marbles, then gets $2$ yellow marbles. How many marbles does Binh have in all?`, R`There are $10$ marbles.`, R`Join all three groups: $3+5+2=10$.`],
    ],
  },
  "toan-bot": {
    s: R`When things are eaten, given away or taken away, we subtract. Mai has $9$ cakes and eats $4$, so $9-4=5$ cakes are left. To check, add back: $5+4=9$.`,
    w: R`Taking away removes a part from the group, so fewer remain than at first. Subtraction gives exactly how many remain, and adding back what was taken gives the starting number.`,
    p: R`Adding the two numbers in the problem instead of subtracting. Ask whether things were taken away or added, and only then choose the operation.`,
    ex: [
      [R`Mai has $9$ cakes and eats $4$ of them. How many cakes does Mai have left?`, [
        [R`There are $9$ and $4$ are eaten, so we subtract.`, R`Eating means taking away, so we use subtraction.`],
        [R`The calculation is $9-4=5$.`, R`Check: $5+4=9$, so the result is right.`],
      ], R`Mai has $5$ cakes left.`],
      [R`There are $10$ children in the class and $6$ go out to play. How many children are left in the class?`, [
        [R`There are $10$ and $6$ go out, so we subtract.`, R`Going out of the room means taking away, so we use subtraction.`],
        [R`The calculation is $10-6=4$.`, R`Check: $4+6=10$, so the result is right.`],
      ], R`There are $4$ children left in the class.`],
    ],
    dr: [
      [R`There are $8$ eggs and $3$ are used up. How many eggs are left?`, R`There are $5$ eggs left.`, R`Used up means taken away, so $8-3=5$.`],
      [R`Tu has $7$ pens and gives $2$ to a friend. How many pens does Tu have left?`, R`Tu has $5$ pens left.`, R`Giving away means taking away, so $7-2=5$.`],
      [R`There are $10$ birds in a tree, $3$ fly away and then $2$ fly in. How many birds are in the tree?`, R`There are $9$ birds.`, R`Take away $3$ birds then add $2$ birds: $10-3+2=9$.`],
    ],
  },
};

export const g2ExtraEn: Record<string, LessonEn> = {
  "nhieu-hon": {
    s: R`To find which side has more and by how much, subtract the smaller number from the larger. Lan has $15$ exercise books and Mai has $9$, so Lan has $15-9=6$ more. When we know the smaller side and the difference, we add to find the larger.`,
    w: R`When two groups are lined up in pairs, the part left over in the larger group is exactly the difference. So when asked how many more, subtract the smaller number from the larger.`,
    p: R`Subtracting as soon as the word fewer appears. When the problem gives the smaller number and asks for the larger, we must add, because the larger number is the smaller one plus the difference.`,
    ex: [
      [R`Lan has $15$ exercise books and Mai has $9$. How many more books does Lan have than Mai?`, [
        [R`Asked how many more books, so subtract the smaller number from the larger.`, R`The difference of two numbers tells how much bigger the larger group is.`],
        [R`The calculation is $15-9=6$.`, R`Check: $9+6=15$, so the result is right.`],
      ], R`Lan has $6$ more books than Mai.`],
      [R`Binh has $12$ marbles, which is $5$ fewer than An. How many marbles does An have?`, [
        [R`An has $5$ more than Binh, so add $5$ to Binh's number.`, R`Knowing the smaller number and the difference, find the larger number by adding.`],
        [R`The calculation is $12+5=17$.`, R`Check: $17-12=5$, so the result is right.`],
      ], R`An has $17$ marbles.`],
    ],
    dr: [
      [R`There are $18$ oranges and $11$ apples. How many more oranges are there than apples?`, R`There are $7$ more oranges than apples.`, R`Take the smaller number from the larger: $18-11=7$.`],
      [R`Nga has $20$ sweets, which is $8$ fewer than Ha. How many sweets does Ha have?`, R`Ha has $28$ sweets.`, R`Ha has $8$ more than Nga, so $20+8=28$.`],
      [R`A shop sold $34$ cakes in the morning and $9$ fewer in the afternoon. How many cakes did it sell all day?`, R`It sold $59$ cakes all day.`, R`The afternoon sales are $34-9=25$ cakes, and all day is $34+25=59$ cakes.`],
    ],
  },
  "chia-deu": {
    s: R`Sharing equally means making equal parts, all exactly alike. Sharing $10$ sweets between $2$ children gives each child $10:2=5$ sweets. To check, multiply back: $2\times5=10$.`,
    w: R`Sharing equally gives out equal parts until the group is used up, so the number of parts times the amount in each part equals the whole group. Division is the operation that undoes that multiplication.`,
    p: R`Dividing the smaller number by the larger, or not checking after dividing. The number divided is the total amount, and the result can be checked by multiplying.`,
    ex: [
      [R`There are $10$ sweets shared equally between $2$ children. How many sweets does each child get?`, [
        [R`Sharing $10$ sweets equally between $2$ children, so we divide.`, R`Making equal parts is done with division.`],
        [R`The calculation is $10:2=5$.`, R`Check: $2\times5=10$, so the result is right.`],
      ], R`Each child gets $5$ sweets.`],
      [R`There are $15$ oranges put equally onto $5$ plates. How many oranges are on each plate?`, [
        [R`Putting $15$ oranges equally onto $5$ plates, so we divide.`, R`Each plate has the same number, so we use division.`],
        [R`The calculation is $15:5=3$.`, R`Check: $5\times3=15$, so the result is right.`],
      ], R`Each plate has $3$ oranges.`],
    ],
    dr: [
      [R`There are $20$ pens shared equally between $5$ children. How many pens does each child get?`, R`Each child gets $4$ pens.`, R`Sharing equally is division: $20:5=4$.`],
      [R`There are $18$ cakes put equally into $2$ boxes. How many cakes are in each box?`, R`Each box has $9$ cakes.`, R`Sharing equally is division: $18:2=9$.`],
      [R`There are $24$ sweets shared equally between $4$ children, then each child gets $3$ more from the teacher. How many sweets does each child have in all?`, R`Each child has $9$ sweets.`, R`Each child gets $24:4=6$ sweets, and with $3$ more that is $9$ sweets.`],
    ],
  },
};

export const g3ExtraEn: Record<string, LessonEn> = {
  "rut-ve-don-vi": {
    s: R`Knowing the price of several items, find the price of one item first. Buying $4$ notebooks costs $24$ thousand dong, so one notebook is $24:4=6$ thousand dong. Then buying $7$ notebooks costs $6\times7=42$ thousand dong.`,
    w: R`Equal units have equal value, so dividing the total by the number of units gives the value of one unit. More units multiply the value by the same number, so we multiply.`,
    p: R`Doing only one calculation and stopping. First divide to get the value of one unit, and only then multiply by the new number of units.`,
    ex: [
      [R`Buying $4$ notebooks costs $24$ thousand dong. How many thousand dong does it cost to buy $7$ of the same notebooks?`, [
        [R`The price of one notebook is $24:4=6$ thousand dong.`, R`Divide the total money by the number of notebooks to find the price of one.`],
        [R`The price of $7$ notebooks is $6\times7=42$ thousand dong.`, R`Multiply the price of one notebook by the number to buy.`],
      ], R`Buying $7$ notebooks costs $42$ thousand dong.`],
      [R`A lorry carries $40$ tonnes of rice in $5$ trips. How many tonnes does it carry in $8$ such trips?`, [
        [R`Each trip carries $40:5=8$ tonnes of rice.`, R`Divide the total tonnes by the number of trips to find one trip.`],
        [R`Eight trips carry $8\times8=64$ tonnes of rice.`, R`Multiply the tonnes of one trip by $8$ trips.`],
      ], R`The lorry carries $64$ tonnes of rice.`],
    ],
    dr: [
      [R`$3$ boxes hold $18$ pens. How many pens do $5$ such boxes hold?`, R`They hold $30$ pens.`, R`One box holds $18:3=6$ pens, and $5$ boxes hold $6\times5=30$ pens.`],
      [R`A car travels $200$ km in $4$ hours. How many kilometres does it travel in $6$ hours at the same rate?`, R`It travels $300$ km.`, R`Each hour it travels $200:4=50$ km, so $6$ hours is $50\times6=300$ km.`],
      [R`A worker earns $480$ thousand dong in $6$ days. How many thousand dong does the worker earn in $9$ such days?`, R`The worker earns $720$ thousand dong.`, R`Each day earns $480:6=80$ thousand dong, and $9$ days earn $80\times9=720$ thousand dong.`],
    ],
  },
  "hai-buoc": {
    s: R`Some problems need two calculations, done one after the other. There are $45$ kg of rice, and $18$ kg then $15$ kg are sold. Step one: sold $18+15=33$ kg. Step two: left $45-33=12$ kg.`,
    w: R`In a two-step problem the result of the first calculation is the input of the second. Skipping the first step leaves too little information for the second.`,
    p: R`Giving the result of the first calculation as the final answer. Reread the question to check you answered what was asked.`,
    ex: [
      [R`A shop has $45$ kg of rice, sells $18$ kg in the morning and $15$ kg in the afternoon. How many kilograms of rice are left?`, [
        [R`All day it sold $18+15=33$ kg.`, R`Join the two sales to find how much rice was sold.`],
        [R`What is left is $45-33=12$ kg.`, R`Take the amount sold from the rice at the start.`],
      ], R`The shop has $12$ kg of rice left.`],
      [R`Each box has $6$ cakes. Mother buys $4$ boxes and gives $9$ cakes to a friend. How many cakes does Mother have left?`, [
        [R`Mother buys $6\times4=24$ cakes.`, R`Each box has $6$ cakes, and for $4$ boxes we multiply.`],
        [R`Mother has $24-9=15$ cakes left.`, R`Giving cakes away takes them away, so we subtract.`],
      ], R`Mother has $15$ cakes left.`],
    ],
    dr: [
      [R`A class has $32$ pupils, of whom $14$ are girls. Each boy plants $2$ trees. How many trees do the boys plant?`, R`The boys plant $36$ trees.`, R`There are $32-14=18$ boys, who plant $18\times2=36$ trees.`],
      [R`A rope is $50$ m long and $2$ pieces of $12$ m each are cut off. How many metres are left?`, R`$26$ m are left.`, R`Two pieces are $2\times12=24$ m, so $50-24=26$ m are left.`],
      [R`A shop sells $3$ bags of rice of $5$ kg each and $4$ bags of sugar of $2$ kg each. How many kilograms do the rice and sugar weigh together?`, R`They weigh $23$ kg.`, R`The rice weighs $3\times5=15$ kg and the sugar $4\times2=8$ kg, so the total is $15+8=23$ kg.`],
    ],
  },
};

export const g4ExtraEn: Record<string, LessonEn> = {
  "hinh-binh-hanh-4": {
    s: R`A parallelogram has two pairs of parallel, equal sides. Its area is the length of the base times the corresponding height.`,
    w: R`Cut a triangle from one side of a parallelogram and move it to the other side, and you get a rectangle with the same base and height. The area of a rectangle is base times height, so the same is true of the parallelogram.`,
    p: R`Multiplying the base by the slanted side instead of by the height. The height is the segment perpendicular to the base, usually shorter than the slanted side.`,
    ex: [
      [R`A parallelogram has a base of $8$ cm and a height of $5$ cm. Find its area.`, [
        [R`The area is the base times the height.`, R`Cutting a triangle from one side and moving it to the other makes a rectangle with the same base and height.`],
        [R`We have $S=8\times5=40$ square centimetres.`, R`The product $8\times5$ gives the number of one-centimetre squares that cover the shape.`],
      ], R`The area is $40$ square centimetres.`],
      [R`A parallelogram has area $72$ square cm and base $9$ cm. Find its height.`, [
        [R`The height is the area divided by the base.`, R`Division undoes the multiplication of base by height.`],
        [R`We have $72:9=8$ cm.`, R`Check: $9\times8=72$, so the result is right.`],
      ], R`The height is $8$ cm.`],
    ],
    dr: [
      [R`A parallelogram has base $12$ cm and height $7$ cm. What is its area?`, R`The area is $84$ square centimetres.`, R`The area is the base times the height: $12\times7=84$.`],
      [R`A parallelogram has area $60$ square cm and height $5$ cm. How long is the base?`, R`The base is $12$ cm.`, R`The base is the area divided by the height: $60:5=12$.`],
      [R`A parallelogram has two adjacent sides of $10$ cm and $6$ cm. What is its perimeter?`, R`The perimeter is $32$ cm.`, R`Opposite sides are equal, so the perimeter is $(10+6)\times2=32$.`],
    ],
  },
  "hinh-thoi-4": {
    s: R`A rhombus has four equal sides and perpendicular diagonals. Its area is the product of the two diagonals divided by $2$.`,
    w: R`The diagonals of a rhombus are perpendicular and meet at their midpoints, cutting the rhombus into four equal right triangles. Put together, the rhombus is half of a rectangle whose sides are the two diagonals.`,
    p: R`Forgetting to divide by $2$, so the area is doubled. The formula is the product of the diagonals divided by $2$.`,
    ex: [
      [R`A rhombus has diagonals of $6$ cm and $8$ cm. Find its area.`, [
        [R`The area is the product of the diagonals divided by $2$.`, R`A rhombus is half of a rectangle whose sides are the two diagonals.`],
        [R`We have $S=6\times8:2=24$ square centimetres.`, R`Multiply the two diagonals, then divide by $2$.`],
      ], R`The area is $24$ square centimetres.`],
      [R`A rhombus has sides of $5$ cm. Find its perimeter.`, [
        [R`The four sides are equal, so the perimeter is a side times $4$.`, R`A rhombus has four sides of equal length.`],
        [R`We have $5\times4=20$ cm.`, R`The product $5\times4$ gives the total length of the four sides.`],
      ], R`The perimeter is $20$ cm.`],
    ],
    dr: [
      [R`A rhombus has diagonals of $10$ cm and $12$ cm. What is its area?`, R`The area is $60$ square centimetres.`, R`The area is $10\times12:2=60$.`],
      [R`A rhombus has perimeter $36$ cm. How long is each side?`, R`Each side is $9$ cm.`, R`The four sides are equal, so each is $36:4=9$.`],
      [R`A rhombus has area $48$ square cm and one diagonal of $8$ cm. How long is the other diagonal?`, R`The other diagonal is $12$ cm.`, R`From $S=d_1\times d_2:2$ we get $d_2=2S:d_1=96:8=12$.`],
    ],
  },
};

export const g5ExtraEn: Record<string, LessonEn> = {
  "chuyen-dong-2": {
    s: R`Two objects moving towards each other close the gap at the sum of their speeds. If one chases the other in the same direction, it closes the gap at the difference of their speeds.`,
    w: R`When two objects move towards each other, the distance between them shrinks each hour by the sum of the speeds. In the same direction it shrinks by the difference, so the time to meet is the distance divided by that sum or difference.`,
    p: R`Using the sum of the speeds for two cars in the same direction, or the difference for opposite directions. Draw a diagram to see whether the cars approach each other or one chases the other.`,
    ex: [
      [R`Two cars start from two towns $180$ km apart and drive towards each other at $40$ km/h and $50$ km/h. After how many hours do they meet?`, [
        [R`Each hour the cars get closer by $40+50=90$ km.`, R`Moving towards each other, the distance shrinks by the sum of the speeds.`],
        [R`The time to meet is $180:90=2$ hours.`, R`Divide the starting distance by how much the cars close the gap in one hour.`],
      ], R`The cars meet after $2$ hours.`],
      [R`The first car travels at $30$ km/h. At the same moment a second car, $60$ km behind, travels in the same direction at $50$ km/h. After how many hours does the second car catch up?`, [
        [R`Each hour the second car gains $50-30=20$ km.`, R`In the same direction, the gap shrinks by the difference of the speeds.`],
        [R`The time to catch up is $60:20=3$ hours.`, R`Divide the starting gap by how much is gained in one hour.`],
      ], R`The second car catches up after $3$ hours.`],
    ],
    dr: [
      [R`Two cars start $240$ km apart and drive towards each other at $50$ km/h and $70$ km/h. After how many hours do they meet?`, R`They meet after $2$ hours.`, R`Each hour the cars close the gap by $50+70=120$ km, so the time is $240:120=2$ hours.`],
      [R`A motorbike travels at $45$ km/h and a car at $60$ km/h in the same direction, the car $90$ km behind the motorbike. After how many hours does the car catch up?`, R`The car catches up after $6$ hours.`, R`Each hour the car gains $60-45=15$ km, so the time is $90:15=6$ hours.`],
      [R`Two cars $200$ km apart drive towards each other at $40$ km/h and $60$ km/h. How many kilometres from the slower car's start do they meet?`, R`They meet $80$ km away.`, R`They meet after $200:100=2$ hours, and the slower car has travelled $40\times2=80$ km.`],
    ],
  },
  "lai-lo": {
    s: R`Profit is the selling price minus the cost price when the selling price is larger. The percentage profit on the cost price is the profit divided by the cost price, times $100$.`,
    w: R`A percentage compares a quantity with the cost price, so the cost price is $100\%$. A profit of $25\%$ means the selling price is $125\%$ of the cost price.`,
    p: R`Comparing the profit with the selling price instead of the cost price. When the problem says profit on the cost price, divide by the cost price.`,
    ex: [
      [R`A shop buys a shirt for $200$ thousand dong and sells it for $250$ thousand dong. What percentage profit is that on the cost price?`, [
        [R`The profit is $250-200=50$ thousand dong.`, R`Profit is the selling price minus the cost price.`],
        [R`The percentage profit is $\frac{50}{200}\times100=25$.`, R`Compare the profit with the cost price, then multiply by $100$ to get a percentage.`],
      ], R`The shop makes a profit of $25\%$ on the cost price.`],
      [R`A seller makes a profit of $20\%$ on the cost price of $150$ thousand dong. What is the selling price in thousand dong?`, [
        [R`The profit is $150\times20:100=30$ thousand dong.`, R`The profit is $20\%$ of the cost price.`],
        [R`The selling price is $150+30=180$ thousand dong.`, R`The selling price is the cost price plus the profit.`],
      ], R`The selling price is $180$ thousand dong.`],
    ],
    dr: [
      [R`Bought for $80$ thousand dong and sold for $100$ thousand dong. What percentage profit on the cost price?`, R`The profit is $25\%$.`, R`The profit is $20$ thousand dong, and $\frac{20}{80}=0.25$, that is $25\%$.`],
      [R`The cost price is $50$ thousand dong and it is sold at a profit of $30\%$. What is the selling price in thousand dong?`, R`The selling price is $65$ thousand dong.`, R`The selling price is $130\%$ of the cost price: $50\times1.3=65$.`],
      [R`An item sold for $90$ thousand dong makes a loss of $10\%$ on the cost price. What is the cost price in thousand dong?`, R`The cost price is $100$ thousand dong.`, R`The selling price is $90\%$ of the cost price, so the cost price is $90:0.9=100$.`],
    ],
  },
};

export const g6ExtraEn: Record<string, LessonEn> = {
  "tinh-nhanh": {
    s: R`Use the commutative, associative and distributive properties to group numbers into round tens or hundreds, then calculate quickly. The distributive property is $a\cdot b+a\cdot c=a\cdot(b+c)$.`,
    w: R`The commutative, associative and distributive properties hold for all numbers, so reordering or regrouping does not change the result. We only choose the grouping that gives round numbers.`,
    p: R`Taking out the common factor wrongly, for instance turning $45\cdot99+45$ into $45\cdot99$. The last term $45$ is $45\cdot1$, so grouping gives $45\cdot(99+1)$.`,
    ex: [
      [R`Calculate quickly $25\cdot37\cdot4$.`, [
        [R`Use the commutative and associative properties to pair $25\cdot4$.`, R`The product $25\cdot4=100$ is a round hundred, so multiplying on is easy.`],
        [R`We have $25\cdot37\cdot4=(25\cdot4)\cdot37=100\cdot37=3700$.`, R`Multiplying by $100$ just adds two digits $0$.`],
      ], R`The result is $3700$.`],
      [R`Calculate quickly $87\cdot13+13\cdot13$.`, [
        [R`Take out the common factor $13$: $13\cdot(87+13)$.`, R`The distributive property of multiplication over addition allows a common factor to be taken out.`],
        [R`We have $13\cdot(87+13)=13\cdot100=1300$.`, R`The sum $87+13=100$ is a round hundred.`],
      ], R`The result is $1300$.`],
    ],
    dr: [
      [R`Calculate quickly $125\cdot8\cdot17$.`, R`The result is $17000$.`, R`Pair $125\cdot8=1000$, then multiply by $17$ to get $17000$.`],
      [R`Calculate quickly $45\cdot99+45$.`, R`The result is $4500$.`, R`Take $45$ as a common factor: $45\cdot(99+1)=4500$.`],
      [R`Calculate quickly $101\cdot99$.`, R`The result is $9999$.`, R`We have $(100+1)(100-1)=100^2-1=9999$.`],
    ],
  },
  "day-cach-deu": {
    s: R`In an arithmetic sequence the difference of consecutive numbers does not change; it is called the common difference $d$. The $n$th term is $a_1+(n-1)\cdot d$ and the sum of $n$ terms is $\frac{(a_1+a_n)\cdot n}{2}$.`,
    w: R`From the first term, each step to the next term adds the common difference, so reaching the $n$th term takes $n-1$ additions. Pairing the first term with the last, and the second with the one before the last, gives pairs with the same sum.`,
    p: R`Adding the common difference $n$ times instead of $n-1$ times. The first term has no common difference added yet.`,
    ex: [
      [R`For the sequence $3,\ 7,\ 11,\ 15,\ \dots$ find the $10$th term.`, [
        [R`The difference of consecutive terms is $7-3=4$.`, R`In an arithmetic sequence the difference between neighbouring terms is constant.`],
        [R`The $10$th term is $3+(10-1)\cdot4=39$.`, R`From the first term, add the difference $9$ times to reach the tenth term.`],
      ], R`The $10$th term is $39$.`],
      [R`Compute the sum $1+3+5+\dots+19$.`, [
        [R`The number of terms is $\frac{19-1}{2}+1=10$.`, R`The number of terms is the difference of the ends divided by the common difference, plus one.`],
        [R`The sum is $\frac{(1+19)\cdot10}{2}=100$.`, R`Pair the first number with the last; each pair adds to $20$ and there are five pairs.`],
      ], R`The sum is $100$.`],
    ],
    dr: [
      [R`For the sequence $5,\ 8,\ 11,\ 14,\ \dots$ find the $20$th term.`, R`The $20$th term is $62$.`, R`We have $5+(20-1)\cdot3=5+57=62$.`],
      [R`Compute the sum $2+4+6+\dots+20$.`, R`The sum is $110$.`, R`There are $10$ terms, so the sum is $\frac{(2+20)\cdot10}{2}=110$.`],
      [R`Compute the sum of the natural numbers from $1$ to $100$.`, R`The sum is $5050$.`, R`There are $100$ terms, so the sum is $\frac{(1+100)\cdot100}{2}=5050$.`],
    ],
  },
};

export const g7ExtraEn: Record<string, LessonEn> = {
  "luy-thua-huu-ti": {
    s: R`The $n$th power of $x$ is the product of $n$ factors $x$. We have $x^m\cdot x^n=x^{m+n}$, $x^m:x^n=x^{m-n}$ and $(x^m)^n=x^{mn}$.`,
    w: R`A power is repeated multiplication, so multiplying two powers of the same base adds the number of factors, that is, adds the exponents. Dividing removes factors, that is, subtracts exponents.`,
    p: R`Multiplying the exponents when multiplying two powers of the same base. For $2^3\cdot2^2$ we add the exponents to get $2^5$, not $2^6$.`,
    ex: [
      [R`Calculate $\left(\frac{2}{3}\right)^3$.`, [
        [R`The third power of $\frac{2}{3}$ is the product of three factors $\frac{2}{3}$.`, R`The exponent tells how many equal factors there are.`],
        [R`Numerator and denominator are both raised to the power: $\frac{2^3}{3^3}=\frac{8}{27}$.`, R`Multiplying three equal fractions multiplies numerators together and denominators together.`],
      ], R`The result is $\frac{8}{27}$.`],
      [R`Calculate $2^5\cdot2^3:2^6$.`, [
        [R`Multiplying powers of the same base adds the exponents: $2^5\cdot2^3=2^8$.`, R`There are $5$ factors of $2$ and then $3$ more factors of $2$, making $8$ factors.`],
        [R`Dividing powers of the same base subtracts the exponents: $2^8:2^6=2^2=4$.`, R`Taking $6$ factors of $2$ from $8$ factors leaves $2$ factors.`],
      ], R`The result is $4$.`],
    ],
    dr: [
      [R`Calculate $(-2)^3$.`, R`It equals $-8$.`, R`Three factors $-2$ multiply to $-8$ because the number of negative factors is odd.`],
      [R`Calculate $\left(\frac{1}{2}\right)^4$.`, R`It equals $\frac{1}{16}$.`, R`The numerator is $1^4=1$ and the denominator is $2^4=16$.`],
      [R`Calculate $(3^2)^3:3^4$.`, R`It equals $9$.`, R`We have $(3^2)^3=3^6$, then $3^6:3^4=3^2=9$.`],
    ],
  },
  "chia-ti-le": {
    s: R`To split a number $S$ into parts proportional to $a$, $b$, $c$, write the parts as $ka$, $kb$, $kc$ and use the property of equal ratios: $k=\frac{S}{a+b+c}$.`,
    w: R`Parts proportional to $a$, $b$, $c$ are $ka$, $kb$, $kc$ with the same factor $k$. They add up to $k(a+b+c)$, which equals the total, and that gives $k$.`,
    p: R`Dividing the total by the number of ratios without adding the ratios. You must divide by $a+b+c$, the sum of the parts.`,
    ex: [
      [R`Split $60$ into two parts proportional to $2$ and $3$.`, [
        [R`Let the parts be $2k$ and $3k$ with $2k+3k=60$.`, R`Parts proportional to $2$ and $3$ can be written as $k$ times those numbers.`],
        [R`So $k=12$, and the parts are $24$ and $36$.`, R`From $5k=60$ we get $k=12$, then multiply $2$ and $3$ by $k$.`],
      ], R`The two parts are $24$ and $36$.`],
      [R`Three friends invest in the ratio $1$, $2$, $3$ and make a total profit of $180$ thousand dong, shared in proportion to their investment. How much does each get?`, [
        [R`Let the three profits be $k$, $2k$ and $3k$ with $k+2k+3k=180$.`, R`The profits are proportional to the investments $1$, $2$, $3$, so they have the form $k$, $2k$, $3k$.`],
        [R`We have $6k=180$, so $k=30$; the friends get $30$, $60$ and $90$ thousand dong.`, R`Divide the total by the sum of the parts, $180:6=30$, then multiply by each factor.`],
      ], R`The three friends get $30$, $60$ and $90$ thousand dong.`],
    ],
    dr: [
      [R`Split $100$ into two parts proportional to $2$ and $3$. Find the larger part.`, R`The larger part is $60$.`, R`We have $k=100:5=20$, so the larger part is $3\cdot20=60$.`],
      [R`A triangle has perimeter $36$ cm and sides proportional to $3$, $4$, $5$. Find the longest side.`, R`The longest side is $15$ cm.`, R`We have $k=36:12=3$, so the longest side is $5\cdot3=15$ cm.`],
      [R`Three numbers $x$, $y$, $z$ are proportional to $2$, $3$, $4$ and $x+y+z=45$. Find $z-x$.`, R`We have $z-x=10$.`, R`We have $k=45:9=5$, so $z-x=(4-2)\cdot5=10$.`],
    ],
  },
};

export const g8ExtraEn: Record<string, LessonEn> = {
  "pt-tich": {
    s: R`The equation $A(x)\cdot B(x)=0$ is equivalent to $A(x)=0$ or $B(x)=0$. Bring the left side to a product of factors, then solve each equation.`,
    w: R`If a product is $0$, at least one factor is $0$, because the product of two numbers different from $0$ is different from $0$. So we only need to set each factor equal to $0$ and solve separately.`,
    p: R`Dividing both sides by $x$ and so losing the root $x=0$. For $x^2-5x=0$ take out the common factor $x(x-5)=0$; do not divide.`,
    ex: [
      [R`Solve the equation $(x-2)(x+3)=0$.`, [
        [R`A product is $0$ when one of the two factors is $0$.`, R`If two numbers have product $0$, at least one of them is $0$.`],
        [R`From $x-2=0$ we get $x=2$ and from $x+3=0$ we get $x=-3$.`, R`Solve each linear equation obtained.`],
      ], R`The equation has two solutions, $x=2$ and $x=-3$.`],
      [R`Solve the equation $x^2-5x=0$.`, [
        [R`Factorise $x^2-5x=x(x-5)$.`, R`Take out the common factor $x$ so the left side becomes a product.`],
        [R`So $x=0$ or $x-5=0$, that is $x=5$.`, R`Each factor equal to $0$ gives one solution.`],
      ], R`The equation has two solutions, $x=0$ and $x=5$.`],
    ],
    dr: [
      [R`Solve the equation $(2x-4)(x+1)=0$.`, R`The solutions are $x=2$ and $x=-1$.`, R`From $2x-4=0$ we get $x=2$ and from $x+1=0$ we get $x=-1$.`],
      [R`Solve the equation $x^2-9=0$.`, R`The solutions are $x=3$ and $x=-3$.`, R`Factorising $(x-3)(x+3)=0$ gives $x=3$ or $x=-3$.`],
      [R`Solve the equation $x^2-3x+2=0$.`, R`The solutions are $x=1$ and $x=2$.`, R`Factorising $(x-1)(x-2)=0$ gives $x=1$ or $x=2$.`],
    ],
  },
  "pt-mau": {
    s: R`For an equation with the unknown in a denominator, find the condition that makes every denominator different from $0$, clear the denominators, solve the resulting equation, then check the solutions against the condition.`,
    w: R`A fraction only makes sense when its denominator is not $0$, so the condition is found first. Clearing denominators can produce a solution that makes a denominator $0$, so every solution must be checked against the condition.`,
    p: R`Solving and accepting every solution without checking the condition. A solution that makes a denominator $0$ is extraneous and must be rejected.`,
    ex: [
      [R`Solve the equation $\frac{2}{x-1}=1$.`, [
        [R`The condition of the equation is $x\ne1$.`, R`The denominator $x-1$ must not be $0$.`],
        [R`Multiplying both sides by $x-1$ gives $2=x-1$, so $x=3$.`, R`Clear the denominator by multiplying both sides by $x-1$.`],
        [R`The value $x=3$ satisfies the condition $x\ne1$.`, R`A solution must differ from the value that makes the denominator $0$.`],
      ], R`The solution of the equation is $x=3$.`],
      [R`Solve the equation $\frac{x}{x-2}=\frac{2}{x-2}$.`, [
        [R`The condition of the equation is $x\ne2$.`, R`The denominator $x-2$ must not be $0$.`],
        [R`Clearing the denominator gives $x=2$.`, R`Two fractions with the same denominator are equal when their numerators are equal.`],
        [R`The value $x=2$ does not satisfy the condition, so it is rejected.`, R`With $x=2$ the denominator is $0$, so the division has no meaning.`],
      ], R`The equation has no solution.`],
    ],
    dr: [
      [R`Solve the equation $\frac{3}{x+1}=1$.`, R`The solution is $x=2$.`, R`The condition is $x\ne-1$, and clearing the denominator gives $3=x+1$, so $x=2$.`],
      [R`Solve the equation $\frac{1}{x}+\frac{1}{2}=1$.`, R`The solution is $x=2$.`, R`The condition is $x\ne0$, and $\frac{1}{x}=\frac{1}{2}$, so $x=2$.`],
      [R`Solve the equation $\frac{x+1}{x-1}=\frac{2}{x-1}+3$.`, R`The equation has no solution.`, R`Clearing denominators gives $x+1=2+3(x-1)$, so $x=1$, but $x=1$ makes a denominator $0$ so it is rejected.`],
    ],
  },
};
