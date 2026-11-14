/** Lớp 5 bằng tiếng Anh. Thứ tự ví dụ và bài luyện khớp bản tiếng Việt. */
import type { LessonEn } from "./types.ts";

const R = String.raw;

export const g5En: Record<string, LessonEn> = {
  "nhan-thap-phan": {
    s: R`Multiplying decimals can be turned into multiplying fractions. The number of digits after the decimal point in the product is the total number of digits after the point in the two factors, before simplifying the result.`,
    w: R`Write $2.5$ as $\frac{25}{10}$ and $1.2$ as $\frac{12}{10}$. Multiplying the fractions gives $\frac{300}{100}$: the denominator $100$ has two digits $0$, matching the two digits after the point in the product.`,
    p: R`Lining up the decimal points as in addition. In multiplication, count the total digits after the point in both factors, then place the point in the product.`,
    ex: [
      [R`Work out $2.5\times 1.2$.`, [
        [R`Write $2.5=\frac{5}{2}$ and $1.2=\frac{6}{5}$.`, R`One decimal place means denominator $10$, and these fractions are already simplified.`],
        [R`The product is $\frac{5}{2}\times\frac{6}{5}=3$.`, R`Cancel $5$, and $2$ with $6$. The result is the whole number $3$.`],
      ], R`The product is $3$.`],
      [R`Each metre of cloth costs $45.5$ thousand dong. How many thousand dong do $3.2$ metres cost?`, [
        [R`Multiply as whole numbers: $455\times 32=14\,560$.`, R`Leave out the points for now to make the multiplication easy, remembering the total number of decimal places.`],
        [R`The two factors have two decimal places in total, so the product is $145.60=145.6$.`, R`Count two digits from the right, then place the point.`],
      ], R`Buying $3.2$ metres of cloth costs $145.6$ thousand dong.`],
    ],
    dr: [
      [R`Work out $0.5\times 0.4$.`, R`The product is $0.2$.`, R`Change to fractions and multiply. Half of $\frac{2}{5}$ is $\frac{1}{5}$, that is $0.2$.`],
      [R`Work out $1.5\times 2$.`, R`The product is $3$.`, R`One point five is $\frac{3}{2}$. Multiplying by $2$ gives $3$.`],
      [R`Work out $2.4\times 0.5$.`, R`The product is $1.2$.`, R`Half of $2.4$ is $1.2$. This is still a decimal multiplication.`],
    ],
  },
  "lam-tron": {
    s: R`To round to the nearest tenth, look at the hundredths digit. If it is $5$ or more, increase the tenths digit by $1$. If it is less than $5$, keep the tenths digit as it is.`,
    w: R`The number $3.26$ is between $3.2$ and $3.3$, and closer to $3.3$. Rounding takes the nearest mark, and a number exactly in the middle is rounded up by agreement.`,
    p: R`Rounding twice in a row. Rounding $3.249$ to the nearest tenth, only look at the hundredths digit, which is $4$, so the result is $3.2$.`,
    ex: [
      [R`Round $3.26$ and $3.24$ to the nearest tenth.`, [
        [R`The number $3.26$ has hundredths digit $6\ge 5$, so it rounds to $3.3$.`, R`The digit to look at is the one just after the place being rounded to. From $5$ upwards, round up.`],
        [R`The number $3.24$ has hundredths digit $4<5$, so it rounds to $3.2$.`, R`A digit less than $5$ keeps the tenths digit and drops the digits after it.`],
      ], R`The two numbers round to $3.3$ and $3.2$.`],
      [R`Three children are $1.356$ metres, $1.482$ metres and $1.405$ metres tall. Round each to the nearest hundredth.`, [
        [R`Look at the thousandths digit: $6\ge 5$ rounds up, $2<5$ stays the same.`, R`To round to the nearest hundredth, look at the digit just after it.`],
        [R`The three numbers round to $1.36$, $1.48$ and $1.41$ metres.`, R`The digit $5$ in the third number also rounds up.`],
      ], R`The three numbers round to $1.36$, $1.48$ and $1.41$ metres.`],
    ],
    dr: [
      [R`Round $7.86$ to the nearest tenth.`, R`The result is $7.9$.`, R`The hundredths digit is $6$, more than $5$, so the tenths digit goes up from $8$ to $9$.`],
      [R`Round $4.13$ to the nearest tenth.`, R`The result is $4.1$.`, R`The hundredths digit is $3$, less than $5$, so the tenths digit stays the same.`],
      [R`What is the difference between $3.3$ and $3.26$?`, R`The difference is $0.04$.`, R`The rounded-up number is bigger than the original. The difference is four hundredths.`],
    ],
  },
  "cong-tru-thap-phan": {
    s: R`Line the numbers up so the decimal points are in one column, then add or subtract as with whole numbers. The point of the answer goes in the same column as the points above. A missing decimal digit counts as $0$.`,
    w: R`Lining up the points makes ones add to ones and tenths add to tenths. It is still the place-by-place rule for whole numbers, carried on to the right of the point.`,
    p: R`Lining up the last digits instead of the points. Then $3.45+1.8$ comes out as $3.63$.`,
    ex: [
      [R`Work out $3.45+1.8$.`, [
        [R`Write $1.8$ as $1.80$ so both numbers have two decimal places.`, R`Adding a $0$ at the right end of the decimal part does not change the value.`],
        [R`Add place by place: $3.45+1.80=5.25$.`, R`Hundredths add to hundredths and tenths to tenths, carrying into the ones.`],
      ], R`The sum is $5.25$.`],
      [R`A bag of rice weighs $50$ kilograms. First $12.5$ kilograms are taken out, then $8.75$ kilograms. How many kilograms are left in the bag?`, [
        [R`The two amounts taken out total $12.5+8.75=21.25$ kilograms.`, R`Line up digits of the same place, with point under point.`],
        [R`What is left is $50-21.25=28.75$ kilograms.`, R`Write $50$ as $50.00$ so every place can be subtracted.`],
      ], R`The bag has $28.75$ kilograms of rice left.`],
    ],
    dr: [
      [R`Work out $2.5+0.75$.`, R`The sum is $3.25$.`, R`Write $2.5$ as $2.50$, then add $0.75$ to get $3.25$.`],
      [R`Work out $5-1.3$.`, R`The difference is $3.7$.`, R`Write $5$ as $5.0$ and borrow one unit to subtract in the tenths.`],
      [R`A rope is $4.2$ metres long and $1.65$ metres are cut off. How many metres are left?`, R`There are $2.55$ metres left.`, R`Write $4.2$ as $4.20$, then take away $1.65$ to get $2.55$.`],
    ],
  },
  "chia-thap-phan": {
    s: R`To divide a decimal by a whole number, divide as usual and put the point in the quotient when you start bringing down the decimal digits. To divide by a decimal, multiply both numbers by $10$ or $100$ so the divisor becomes a whole number.`,
    w: R`The quotient tells how many times the divisor fits into the number being divided. Multiplying both numbers by the same amount keeps their ratio, so the quotient stays the same.`,
    p: R`Moving the point in the divisor but forgetting the number being divided. Both numbers must be multiplied by the same $10$ or $100$.`,
    ex: [
      [R`Work out $7.2:0.6$.`, [
        [R`Multiply both numbers by $10$: the division becomes $72:6$.`, R`Multiplying both numbers by the same number other than $0$ does not change the quotient.`],
        [R`We have $72:6=12$.`, R`The divisor is now a whole number, so divide as usual.`],
      ], R`The quotient is $12$.`],
      [R`A car travels $157.5$ kilometres on $12.6$ litres of petrol. How many kilometres does it travel on each litre?`, [
        [R`Move the point one place to the right in both numbers: $1575:126$.`, R`Multiplying both numbers by the same number keeps the quotient the same.`],
        [R`We have $1575:126=12.5$.`, R`Check: $12.6\times 12.5=157.5$.`],
      ], R`Each litre of petrol takes the car $12.5$ kilometres.`],
    ],
    dr: [
      [R`Work out $8.4:4$.`, R`The quotient is $2.1$.`, R`Divide $8$ by $4$ to get $2$, put the point, then divide the $4$ tenths by $4$ to get $1$.`],
      [R`Work out $1.5:0.5$.`, R`The quotient is $3$.`, R`Multiply both numbers by $10$ to get $15:5=3$.`],
      [R`There are $4.5$ litres of oil poured equally into bottles of $0.75$ litres. How many bottles are filled?`, R`They fill $6$ bottles.`, R`Multiply both numbers by $100$ to get $450:75=6$.`],
    ],
  },
  "mot-phan-tram": {
    s: R`To find $p\%$ of a number, multiply the number by $\frac{p}{100}$. To find the whole number when a percentage of it is known, do the matching division.`,
    w: R`A percentage is a fraction with denominator $100$. Taking $25\%$ of $80$ means splitting $80$ into $100$ equal parts and taking $25$ of them.`,
    p: R`Mixing up the two kinds of question. Knowing the whole and finding a percentage of it means multiplying. Knowing the value of a percentage and finding the whole means dividing.`,
    ex: [
      [R`Find $25\%$ of $80$, and find the number whose $20\%$ is $6$.`, [
        [R`Taking $25\%$ of $80$ gives $80\times\frac{25}{100}=20$.`, R`A percentage is a fraction with denominator $100$. One quarter of $80$ is also $20$.`],
        [R`If $20\%$ of a number is $6$, the number is $6$ divided by $\frac{20}{100}$, that is $30$.`, R`Knowing one part, divide to find the whole, and the quotient is $30$.`],
      ], R`We have $25\%$ of $80$ equal to $20$, and the number is $30$.`],
      [R`A bicycle costs $2\,400\,000$ dong and is reduced by $15\%$. What is the price after the reduction?`, [
        [R`The reduction is $2\,400\,000\times 15:100=360\,000$ dong.`, R`To find a percentage of a number, multiply by the percentage and divide by one hundred.`],
        [R`The price after the reduction is $2\,400\,000-360\,000=2\,040\,000$ dong.`, R`Take the reduction away from the original price.`],
      ], R`The price after the reduction is $2\,040\,000$ dong.`],
    ],
    dr: [
      [R`Find $10\%$ of $250$.`, R`The answer is $25$.`, R`Ten percent is one tenth. One tenth of $250$ is $25$.`],
      [R`Find $50\%$ of $18$.`, R`The answer is $9$.`, R`Fifty percent is one half. Half of $18$ is $9$.`],
      [R`In a class of $40$ pupils, $30\%$ win a prize. How many pupils win a prize?`, R`There are $12$ pupils who win a prize.`, R`Take $30$ percent of $40$. Multiplying $40$ by $\frac{30}{100}$ gives $12$.`],
    ],
  },
  "doi-phan-tram": {
    s: R`To change a fraction into a percentage, write it with denominator $100$, or multiply the fraction by $100$ and read the result with a percent sign.`,
    w: R`Two equal fractions stand for the same amount. Changing the denominator to $100$ does not change the value, and the numerator is then the percentage.`,
    p: R`Writing $\frac{1}{4}$ as $4\%$ or $14\%$. Multiply the numerator and denominator by $25$ to get $\frac{25}{100}$, that is $25\%$.`,
    ex: [
      [R`Change $\frac{1}{4}$ and $\frac{3}{5}$ into percentages.`, [
        [R`The fraction $\frac{1}{4}$ equals $\frac{25}{100}$, that is $25\%$.`, R`Multiply the numerator and denominator by $25$ to make the denominator $100$. The numerator $25$ is the percentage.`],
        [R`The fraction $\frac{3}{5}$ equals $\frac{60}{100}$, that is $60\%$.`, R`Multiply the numerator and denominator by $20$. Three fifths is sixty percent.`],
      ], R`One quarter is $25\%$ and three fifths is $60\%$.`],
      [R`A class has $40$ pupils, of whom $18$ are girls. What percentage of the class are girls?`, [
        [R`The ratio of girls to the whole class is $18:40=0.45$.`, R`Divide the part by the whole.`],
        [R`As a percentage: $0.45=45\%$.`, R`Multiply by one hundred and add the percent sign.`],
      ], R`Girls make up $45\%$ of the class.`],
    ],
    dr: [
      [R`Change $\frac{1}{2}$ into a percentage.`, R`One half is $50\%$.`, R`Multiply the fraction by $100$. Half of $100$ is $50$.`],
      [R`Change $\frac{1}{5}$ into a percentage.`, R`One fifth is $20\%$.`, R`Multiplying $\frac{1}{5}$ by $100$ gives $20$. That is the percentage.`],
      [R`Given that $25\%$ of a number is $10$, what is the whole number?`, R`The whole number is $40$.`, R`Divide the known part by the percentage as a fraction. The quotient is the whole number.`],
    ],
  },
  "tam-giac-thang": {
    s: R`The area of a triangle is half the base times the height. The area of a trapezium is the average of the two parallel sides, times the height.`,
    w: R`Two equal triangles fit together into a parallelogram with the same base and height, so each triangle is half the base times the height. Two equal trapeziums also fit into a parallelogram whose base is the sum of the two parallel sides.`,
    p: R`Using a slanting side instead of the height. The height must be perpendicular to the base.`,
    ex: [
      [R`A triangle has base $6$ and height $4$. A trapezium has parallel sides $3$ and $5$ and height $4$. Find both areas.`, [
        [R`The triangle's area is $\frac{1}{2}\times 6\times 4=12$.`, R`Half the product of the base and the height that goes with that base.`],
        [R`The trapezium's area is $\frac{3+5}{2}\times 4=16$.`, R`The average of the parallel sides is $4$; times the height $4$ gives $16$.`],
      ], R`The triangle's area is $12$ and the trapezium's area is $16$.`],
      [R`A trapezium-shaped field has parallel sides of $26$ metres and $18$ metres and a height of $15$ metres. Find the area of the field.`, [
        [R`The two parallel sides add up to $26+18=44$ metres.`, R`A trapezium has two parallel sides, and the formula needs their sum.`],
        [R`The area is $44\times 15:2=330$ square metres.`, R`The area of a trapezium is the sum of the parallel sides times the height, divided by two.`],
      ], R`The field has an area of $330$ square metres.`],
    ],
    dr: [
      [R`What is the area of a triangle with base $10$ and height $3$?`, R`The area is $15$.`, R`Half of the product of $10$ and $3$ is $15$. The height must go with the chosen base.`],
      [R`What is the area of a trapezium with parallel sides $2$ and $6$ and height $5$?`, R`The area is $20$.`, R`The average of the parallel sides is $4$. Times the height $5$ gives $20$.`],
      [R`What is the area of a $4$ by $4$ rectangle?`, R`The area is $16$.`, R`This rectangle has two equal sides, so it is a square with side $4$. Its area is the side squared.`],
    ],
  },
  "hinh-tron-5": {
    s: R`In grade $5$, $3.14$ is used for the circle constant. With radius $r$ centimetres, the circumference is $2\times 3.14\times r$ centimetres and the area is $3.14\times r\times r$ square centimetres.`,
    w: R`Measuring many circles of different sizes, the circumference is always the same number of times the diameter, about $3.14$. Cutting a circle into many slices and laying them head to tail makes nearly a rectangle whose length is half the circumference and whose width is the radius.`,
    p: R`Using the diameter in place of the radius. If the problem gives the diameter, halve it before working out the area.`,
    ex: [
      [R`A circle has radius $5$ centimetres. Find its circumference and area, using $3.14$.`, [
        [R`The circumference is $2\times 3.14\times 5=31.4$ centimetres.`, R`Double the radius, then multiply by $3.14$. Do not use the diameter where the radius belongs.`],
        [R`The area is $3.14\times 5\times 5=78.5$ square centimetres.`, R`The radius squared is $25$, then multiply by $3.14$.`],
      ], R`The circumference is $31.4$ centimetres and the area is $78.5$ square centimetres.`],
      [R`A bicycle wheel has a diameter of $0.6$ metres. How many metres does it travel in $100$ turns? Use $3.14$.`, [
        [R`Each turn covers exactly one circumference of the wheel: $0.6\times 3.14=1.884$ metres.`, R`The circumference of a circle is its diameter times $3.14$.`],
        [R`One hundred turns: $1.884\times 100=188.4$ metres.`, R`Multiplying by one hundred moves the decimal point two places to the right.`],
      ], R`The wheel travels $188.4$ metres.`],
    ],
    dr: [
      [R`The diameter is $10$ centimetres. What is the radius?`, R`The radius is $5$ centimetres.`, R`The radius is half the diameter. The circumference and area formulas use the radius.`],
      [R`A circle has radius $1$ centimetre; use $3.14$. What is its circumference?`, R`The circumference is $6.28$ centimetres.`, R`Multiply $2$ by $3.14$ and by the radius $1$.`],
      [R`A circle has radius $3$ centimetres; use $3.14$. What is its area?`, R`The area is $28.26$ square centimetres.`, R`The radius squared is $9$. Multiply $9$ by $3.14$.`],
    ],
  },
  hop: {
    s: R`A cuboid with three dimensions $a, b, c$ has volume $a\times b\times c$. Volume is measured in cubic units of length, such as cubic centimetres.`,
    w: R`Fill the box with small cubes of side $1$ centimetre. One layer holds $a\times b$ cubes and there are $c$ such layers, so the whole box holds $a\times b\times c$ cubes.`,
    p: R`Writing the unit of volume as square centimetres. Area uses square units, and volume uses cubic units.`,
    ex: [
      [R`A box is $2$ centimetres long, $3$ centimetres wide and $4$ centimetres high. What is its volume?`, [
        [R`The base area is $2\times 3=6$ square centimetres.`, R`The base is a rectangle. Base area times height gives the volume.`],
        [R`The volume is $6\times 4=24$ cubic centimetres.`, R`All three dimensions are multiplied. The unit is cubic centimetres.`],
      ], R`The volume is $24$ cubic centimetres.`],
      [R`A cuboid water tank is $2$ metres long, $1.5$ metres wide and $1$ metre high. How many litres of water does it hold?`, [
        [R`The tank's volume is $2\times 1.5\times 1=3$ cubic metres.`, R`The volume of a cuboid is length times width times height.`],
        [R`One cubic metre is $1000$ litres, so the tank holds $3000$ litres.`, R`One cubic decimetre holds exactly one litre of water, and one cubic metre has one thousand cubic decimetres.`],
      ], R`The tank holds $3000$ litres of water.`],
    ],
    dr: [
      [R`What is the volume of a cube with side $3$?`, R`The volume is $27$.`, R`A cube has three equal dimensions. Its volume is the side cubed.`],
      [R`What is the volume of a $5\times 2\times 2$ box?`, R`The volume is $20$.`, R`Multiply the three dimensions in turn. The base area $10$ times the height $2$ also gives $20$.`],
      [R`A box has volume $24$ cubic centimetres and height $4$ centimetres. What is the area of its base?`, R`The base area is $6$ square centimetres.`, R`Volume is base area times height. Working out $24:4$ gives the base area.`],
    ],
  },
  "lap-phuong": {
    s: R`A cube has twelve equal edges and six square faces. Its volume is the edge cubed. Its total surface area is six times the area of one face.`,
    w: R`A cube is a cuboid with three equal dimensions, so its volume is edge times edge times edge. Its six faces are six equal squares, so the total surface area is six times one face.`,
    p: R`Mixing up the lateral area and the total surface area. The lateral area has only the four side faces; the total has all six faces.`,
    ex: [
      [R`A cube has edges of $4$ centimetres. Find its volume and total surface area.`, [
        [R`The volume is $4^3=64$ cubic centimetres.`, R`All three dimensions are $4$. Multiply $4\times 4\times 4$.`],
        [R`One face has area $16$, and six faces have area $96$ square centimetres.`, R`Each face is a square with side $4$. The six faces do not overlap when finding the total surface area.`],
      ], R`The volume is $64$ cubic centimetres and the total surface area is $96$ square centimetres.`],
      [R`A cube-shaped gift box has edges of $2.5$ decimetres. How many square decimetres of paper are needed to cover the box completely?`, [
        [R`Each face has area $2.5\times 2.5=6.25$ square decimetres.`, R`All the faces of a cube are equal squares.`],
        [R`Six faces: $6.25\times 6=37.5$ square decimetres.`, R`Covering it completely means the total surface, including the bottom and the lid.`],
      ], R`You need $37.5$ square decimetres of paper.`],
    ],
    dr: [
      [R`What is the volume of a cube with edge $2$?`, R`The volume is $8$.`, R`The cube of $2$ is $8$. The edge is used three times as a factor.`],
      [R`What is the area of one face of a cube with edge $5$?`, R`The area of one face is $25$.`, R`Each face is a square. The area of one face is the edge squared.`],
      [R`What is the total surface area of a cube with edge $5$?`, R`The total surface area is $150$.`, R`Six square faces, each of area $25$. Six times $25$ is $150$.`],
    ],
  },
  "ti-so-5": {
    s: R`The ratio of $a$ to $b$, with $b\neq 0$, is written $a:b$. The ratio $a:b$ equals the ratio $c:d$ when $a\times d=b\times c$.`,
    w: R`The ratio $a:b$ tells how many times as big $a$ is as $b$, and has the same value as the fraction $\frac{a}{b}$. Two fractions are equal when their cross products are equal.`,
    p: R`Swapping the order of the two numbers. The ratio of $2$ to $3$ is $2:3$, which is different from the ratio of $3$ to $2$.`,
    ex: [
      [R`Is the ratio $2:3$ equal to the ratio $4:6$?`, [
        [R`Cross-multiply: $2\times 6$ and $3\times 4$.`, R`Two ratios are equal when the two cross products are equal.`],
        [R`Both products are $12$, so the ratios are equal.`, R`The difference of the two cross products is $0$.`],
      ], R`The two ratios are equal.`],
      [R`A class has $15$ boys and $20$ girls. Write the ratio of boys to girls, then simplify it.`, [
        [R`The ratio is $15:20$, or $\frac{15}{20}$.`, R`The number mentioned first comes first, so the boys go on top.`],
        [R`Divide both numbers by $5$: $\frac{15}{20}=\frac{3}{4}$.`, R`Simplify a ratio as you would a fraction.`],
      ], R`The ratio of boys to girls is $\frac{3}{4}$.`],
    ],
    dr: [
      [R`Is the ratio $3:5$ equal to $6:10$?`, R`Yes, because both cross products are $30$.`, R`Multiply across. A difference of $0$ means the ratios are equal.`],
      [R`Given $4:x=2:5$ and $x\neq 0$, find $x$.`, R`The value of $x$ is $10$.`, R`Cross-multiplying gives $2x=20$. Dividing by $2$ gives $10$.`],
      [R`What is the ratio $8:2$ equal to?`, R`The ratio is $4$.`, R`Divide the first number by the second when the second is not $0$.`],
    ],
  },
  "ban-do": {
    s: R`A scale of $1:100\,000$ means $1$ centimetre on the map stands for $100\,000$ centimetres on the ground. One kilometre is $100\,000$ centimetres.`,
    w: R`A map shrinks every distance by the same number of times. A scale of $1:100\,000$ means the real length is $100\,000$ times the drawing.`,
    p: R`Forgetting to change units after multiplying. The product is in centimetres and must be changed to metres or kilometres as needed.`,
    ex: [
      [R`On a map with scale $1:100\,000$, a line is $3$ centimetres long. How many kilometres long is it on the ground?`, [
        [R`The real length is $3\times 100\,000=300\,000$ centimetres.`, R`Multiply the length on the map by the scale number.`],
        [R`In kilometres: $300\,000:100\,000=3$ kilometres.`, R`One kilometre has $100\,000$ centimetres.`],
      ], R`The distance on the ground is $3$ kilometres.`],
      [R`A real road is $15$ kilometres long. On a map with scale $1:500\,000$, how many centimetres long is it?`, [
        [R`Change $15$ kilometres to $1\,500\,000$ centimetres.`, R`Change to the same unit as the map length before dividing.`],
        [R`The length on the map is $1\,500\,000:500\,000=3$ centimetres.`, R`The scale says the real length is five hundred thousand times the map length.`],
      ], R`On the map, the road is $3$ centimetres long.`],
    ],
    dr: [
      [R`On a $1:50\,000$ map, a line is $2$ centimetres long. What is the real length in centimetres?`, R`The real length is $100\,000$ centimetres.`, R`Multiply the length on the map by $50\,000$.`],
      [R`What is $100\,000$ centimetres in kilometres?`, R`It is $1$ kilometre.`, R`Divide by $100\,000$, because that is the number of centimetres in a kilometre.`],
      [R`On a $1:100\,000$ map, a real road is $4$ kilometres. How many centimetres long is it on the map?`, R`It is $4$ centimetres long.`, R`Four kilometres is $400\,000$ centimetres. Dividing by the scale number $100\,000$ gives $4$ centimetres.`],
    ],
  },
  "chuyen-dong": {
    s: R`Steady motion has a constant speed. Distance is speed times time. Speed is distance divided by time.`,
    w: R`Speed tells how many kilometres are travelled each hour. Travelling steadily for so many hours makes the distance that many times as big.`,
    p: R`Mismatching units. If the speed is in kilometres per hour, the time must be in hours; for example $30$ minutes is $0.5$ hours.`,
    ex: [
      [R`A car travels steadily $60$ kilometres in $2$ hours. How many kilometres does it travel in $3$ hours?`, [
        [R`The speed is $60:2=30$ kilometres per hour.`, R`Divide the distance by the time when the car travels steadily.`],
        [R`In $3$ hours the car travels $30\times 3=90$ kilometres.`, R`Multiply the speed by the new time.`],
      ], R`The car travels $90$ kilometres.`],
      [R`Two cars set off at the same time from the two ends of a $180$ kilometre road, driving towards each other. The first goes $50$ kilometres per hour and the second $40$ kilometres per hour. When do they meet?`, [
        [R`Each hour the two cars get $50+40=90$ kilometres closer.`, R`Driving towards each other, the gap shrinks by the sum of the two speeds.`],
        [R`They meet after $180:90=2$ hours.`, R`The time is the distance divided by the speed at which the gap shrinks.`],
      ], R`The two cars meet after $2$ hours.`],
    ],
    dr: [
      [R`A car travels steadily at $40$ kilometres per hour for $3$ hours. What is the distance?`, R`The distance is $120$ kilometres.`, R`Multiply the speed by the time.`],
      [R`Travelling steadily, $45$ kilometres take $3$ hours. What is the speed?`, R`The speed is $15$ kilometres per hour.`, R`Divide the distance by the time.`],
      [R`The speed is $20$ kilometres per hour and the distance is $80$ kilometres. How many hours does it take?`, R`It takes $4$ hours.`, R`Time is distance divided by speed, when the speed is not $0$.`],
    ],
  },
  "doi-gio": {
    s: R`One hour is $60$ minutes. One minute is $60$ seconds. To change hours to minutes, multiply by $60$, then add any extra minutes.`,
    w: R`A clock splits an hour into $60$ minutes and a minute into $60$ seconds. So time is changed in steps of $60$, not steps of $10$.`,
    p: R`Writing $2$ hours $15$ minutes as $2.15$ hours. Fifteen minutes is a quarter of an hour, so it is $2.25$ hours.`,
    ex: [
      [R`Change $2$ hours $15$ minutes to minutes.`, [
        [R`Two hours is $2\times 60=120$ minutes.`, R`Each hour has sixty minutes.`],
        [R`Add $15$ minutes to get $135$ minutes.`, R`The extra minutes are added after changing the hours.`],
      ], R`Two hours fifteen minutes is $135$ minutes.`],
      [R`Change $3.5$ hours to hours and minutes, and change $150$ seconds to minutes.`, [
        [R`The extra $0.5$ hours is $0.5\times 60=30$ minutes, so $3.5$ hours is $3$ hours $30$ minutes.`, R`An hour has sixty minutes, not one hundred.`],
        [R`We have $150:60=2.5$, so $150$ seconds is $2.5$ minutes, that is $2$ minutes $30$ seconds.`, R`A minute has sixty seconds.`],
      ], R`We have $3.5$ hours equal to $3$ hours $30$ minutes, and $150$ seconds equal to $2.5$ minutes.`],
    ],
    dr: [
      [R`Change $3$ hours to minutes.`, R`It is $180$ minutes.`, R`Multiply the number of hours by $60$, because each hour has sixty minutes.`],
      [R`Change $90$ minutes to hours and minutes.`, R`It is $1$ hour $30$ minutes.`, R`One hour takes $60$ minutes. The rest is the extra minutes.`],
      [R`Change $2$ minutes to seconds.`, R`It is $120$ seconds.`, R`Each minute has $60$ seconds. Two minutes is two lots of sixty seconds.`],
    ],
  },
  "khoang-gio": {
    s: R`The time from start to finish is the difference between the two times, once both are in the same unit.`,
    w: R`Time passes evenly, so the gap between two times is their difference. Changing both times to minutes means the subtraction does not need borrowing in steps of $60$.`,
    p: R`Borrowing $1$ hour but turning it into $100$ minutes. An hour borrowed is only $60$ minutes.`,
    ex: [
      [R`Start at $8$ o'clock and finish at $10$ hours $30$ minutes. How many minutes is that?`, [
        [R`Change $8$ o'clock to $480$ minutes and $10$ hours $30$ minutes to $630$ minutes.`, R`Only times in the same unit, minutes, can be subtracted.`],
        [R`The difference is $630-480=150$ minutes.`, R`One hundred and fifty minutes is $2$ hours $30$ minutes.`],
      ], R`The length of time is $150$ minutes.`],
      [R`A train leaves at $21$ hours $45$ minutes and arrives at $5$ hours $15$ minutes the next morning. How long is the journey?`, [
        [R`From $21$ hours $45$ minutes to $24$ hours is $2$ hours $15$ minutes.`, R`When the time passes midnight, split it into two parts, before and after the $24$ hour mark.`],
        [R`From $0$ hours to $5$ hours $15$ minutes is $5$ hours $15$ minutes; together that makes $7$ hours $30$ minutes.`, R`Add minutes to minutes and hours to hours.`],
      ], R`The journey takes $7$ hours $30$ minutes.`],
    ],
    dr: [
      [R`How many hours is it from $7$ o'clock to $9$ o'clock?`, R`It is $2$ hours.`, R`Subtract the two times when both are whole hours.`],
      [R`Change $150$ minutes to hours and minutes.`, R`It is $2$ hours $30$ minutes.`, R`Dividing by $60$ gives the hours. The remainder $30$ is the minutes.`],
      [R`A job runs from $14$ hours to $14$ hours $20$ minutes. How many minutes is that?`, R`It is $20$ minutes.`, R`Change both times to minutes and subtract. The hours are the same, so only $20$ minutes are left.`],
    ],
  },
  "quat-5": {
    s: R`The whole circle is $360^\circ$ and stands for the whole set of data. The angle of a sector is that part's share times $360^\circ$.`,
    w: R`The whole circle stands for $100\%$ and is also $360^\circ$. Whatever share of the group a part is, its sector takes that share of $360^\circ$.`,
    p: R`Using the percentage as the number of degrees. A part of $25\%$ has a sector of $90^\circ$, not $25^\circ$.`,
    ex: [
      [R`A part is $25\%$ of the group. How many degrees is its sector?`, [
        [R`The part $25\%$ is $\frac{25}{100}=\frac{1}{4}$.`, R`Change the percentage into a fraction of the whole group.`],
        [R`The sector measures $\frac{1}{4}\times 360=90$ degrees.`, R`Multiply that share by a full turn.`],
      ], R`The sector is $90$ degrees.`],
      [R`Assumed data. In a group, $40\%$ of the children like football, $35\%$ like badminton and the rest like swimming. Find the percentage who like swimming and the angle of that part on a pie chart.`, [
        [R`The part who like swimming is $100\%-40\%-35\%=25\%$.`, R`The whole circle stands for one hundred percent.`],
        [R`The angle of that part is $360^\circ\times 25:100=90^\circ$.`, R`The whole circle is $360^\circ$, shared out in exactly the same proportion as the percentages.`],
      ], R`$25\%$ of the children like swimming, which is an angle of $90^\circ$.`],
    ],
    dr: [
      [R`How many degrees is the sector for half the group?`, R`The sector is $180$ degrees.`, R`Half of $360$ degrees is $180$ degrees.`],
      [R`What share of the whole group does a sector of $72$ degrees stand for?`, R`It stands for $\frac{1}{5}$ of the group.`, R`Divide the sector's measure by $360$ degrees.`],
      [R`Two sectors are $90$ degrees and $120$ degrees. How many degrees is the rest of the circle?`, R`The rest is $150$ degrees.`, R`The sectors of a complete pie chart add up to $360$ degrees.`],
    ],
  },
  "doc-quat": {
    s: R`If you know the whole group and the angle of a sector, the number in that sector is the whole group times the sector angle divided by $360$.`,
    w: R`The sector angle divided by $360$ tells what share of the whole group the sector is. Multiplying that share by the whole group gives the number in it.`,
    p: R`Dividing by $100$ instead of $360$ when the problem gives an angle. Degrees must be compared with the whole circle of $360^\circ$.`,
    ex: [
      [R`A class has $40$ pupils, and the sector for one subject is $90$ degrees. How many pupils chose that subject?`, [
        [R`The sector's share is $90:360=\frac{1}{4}$.`, R`Divide the sector angle by the full turn.`],
        [R`The number of pupils is $\frac{1}{4}\times 40=10$.`, R`Multiply that share by the number of pupils in the class.`],
      ], R`There are $10$ pupils who chose that subject.`],
      [R`Assumed data. A pie chart shows that $30\%$ of the $200$ trees in a garden are orange trees. How many orange trees are there?`, [
        [R`The number of orange trees is $30\%$ of $200$, that is $200\times 30:100$.`, R`Read the percentage on the sector, then find that percentage of the total.`],
        [R`This gives $60$ trees.`, R`Ten percent of two hundred is twenty, and three times that is sixty.`],
      ], R`The garden has $60$ orange trees.`],
    ],
    dr: [
      [R`In a group of $20$ children, a sector is $180$ degrees. How many children are in that sector?`, R`There are $10$ children.`, R`Half a turn is half the group.`],
      [R`In a group of $30$ children, a sector is $120$ degrees. How many children are in that sector?`, R`There are $10$ children.`, R`The share $\frac{120}{360}$ is $\frac{1}{3}$. One third of $30$ is $10$.`],
      [R`How many children are in a $360$ degree sector for a group of $15$ children?`, R`There are $15$ children.`, R`The whole circle is the whole group.`],
    ],
  },
  "tong-ti": {
    s: R`Draw the two numbers as equal parts according to the ratio. Divide the sum by the total number of parts to find one part, then multiply by each number's parts.`,
    w: R`The ratio says the two numbers are built from equal parts, so many for one and so many for the other. The sum of the two numbers is the value of all those parts together.`,
    p: R`Dividing the sum by the denominator of the ratio. Divide by the total number of parts, that is numerator plus denominator.`,
    ex: [
      [R`Two numbers have sum $40$ and ratio $\frac{3}{5}$. Find them.`, [
        [R`The smaller number is $3$ parts and the bigger is $5$ parts, $8$ parts in all.`, R`The ratio $\frac{3}{5}$ means that if the smaller number is cut into $3$ parts, the bigger has $5$ such parts.`],
        [R`One part is $40:8=5$. The smaller number is $5\times 3=15$ and the bigger is $5\times 5=25$.`, R`The sum of the two numbers covers all $8$ equal parts.`],
      ], R`The two numbers are $15$ and $25$.`],
      [R`A mother and child are $45$ years old in total, and the child's age is $\frac{2}{7}$ of the mother's. How old is each?`, [
        [R`Take the child's age as $2$ parts; the mother's is $7$ parts, $9$ parts in all.`, R`The ratio $\frac{2}{7}$ shows how to split the total into equal parts.`],
        [R`Each part is $45:9=5$ years, so the child is $2\times 5=10$ and the mother is $7\times 5=35$.`, R`Check: $10+35=45$, exactly the total age.`],
      ], R`The child is $10$ and the mother is $35$.`],
    ],
    dr: [
      [R`Two numbers have sum $36$ and ratio $\frac{1}{2}$. What is the smaller number?`, R`The smaller number is $12$.`, R`There are $3$ parts in total; one part is $36:3=12$, and the smaller number is $1$ part.`],
      [R`Two numbers have sum $63$ and ratio $\frac{2}{7}$. What is the bigger number?`, R`The bigger number is $49$.`, R`There are $9$ parts in total and one part is $7$; the bigger number is $7$ parts, so it is $49$.`],
      [R`A class has $32$ pupils, and the number of boys is $\frac{3}{5}$ of the number of girls. How many girls are there?`, R`There are $20$ girls.`, R`Boys are $3$ parts and girls $5$ parts; one part is $32:8=4$, so there are $20$ girls.`],
    ],
  },
  "hieu-ti": {
    s: R`Draw the two numbers as equal parts according to the ratio. Divide the difference by the difference in parts to find one part, then multiply by each number's parts.`,
    w: R`Both numbers are made of equal parts, so the bigger number's extra is also a whole number of parts. The difference between the numbers is the value of those extra parts.`,
    p: R`Dividing the difference by the total number of parts, as in sum-and-ratio problems. When the difference is given, divide by the difference in parts.`,
    ex: [
      [R`Two numbers have difference $24$ and ratio $\frac{3}{5}$. Find them.`, [
        [R`The bigger number is $5-3=2$ parts more than the smaller, and those $2$ parts are $24$.`, R`The gap between the two numbers matches the difference in parts.`],
        [R`One part is $24:2=12$. The smaller number is $12\times 3=36$ and the bigger is $12\times 5=60$.`, R`Knowing one part, multiply by each number's parts.`],
      ], R`The two numbers are $36$ and $60$.`],
      [R`The first crate has $30$ more oranges than the second. The second crate has $\frac{2}{5}$ as many oranges as the first. How many oranges are in each crate?`, [
        [R`Take the second crate as $2$ parts; the first is $5$ parts, a difference of $3$ parts.`, R`The difference in parts matches the extra oranges.`],
        [R`Each part is $30:3=10$ oranges, so the second crate has $20$ and the first has $50$.`, R`Check: $50-20=30$, exactly the extra oranges.`],
      ], R`The first crate has $50$ oranges and the second has $20$.`],
    ],
    dr: [
      [R`Two numbers have difference $10$ and ratio $\frac{1}{3}$. What is the smaller number?`, R`The smaller number is $5$.`, R`The difference in parts is $2$; one part is $10:2=5$, and the smaller number is $1$ part.`],
      [R`Two numbers have difference $18$ and ratio $\frac{2}{5}$. What is the bigger number?`, R`The bigger number is $30$.`, R`The difference in parts is $3$ and one part is $6$; the bigger number is $5$ parts, so it is $30$.`],
      [R`A mother is $28$ years older than her child, and the child's age is $\frac{1}{5}$ of hers. How old is the mother?`, R`The mother is $35$.`, R`The difference in parts is $4$; one part is $28:4=7$, and the mother's age is $5$ parts, so $35$.`],
    ],
  },
};
