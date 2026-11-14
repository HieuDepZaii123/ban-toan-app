/** Lớp 4 bằng tiếng Anh. Thứ tự ví dụ và bài luyện khớp bản tiếng Việt. */
import type { LessonEn } from "./types.ts";

const R = String.raw;

export const g4En: Record<string, LessonEn> = {
  "doc-trieu": {
    s: R`The millions group has the hundred millions, ten millions and millions places. The number $2\,345\,678$ has $2$ in the millions group.`,
    w: R`Every three places next to each other make a group: the ones group, the thousands group, the millions group. One million is a thousand thousands, so the millions group sits just to the left of the thousands group.`,
    p: R`Leaving out a $0$ inside a group. Every group after the first must have three digits; for example, two million and five thousand is $2\,005\,000$.`,
    ex: [
      [R`Write the number with $2$ millions, $345$ thousands and $678$ ones.`, [
        [R`Two million is $2\,000\,000$, and three hundred and forty-five thousand is $345\,000$.`, R`The millions group comes before the thousands group. Each group has three places.`],
        [R`Add $2\,000\,000+345\,000+678=2\,345\,678$.`, R`Put the millions, thousands and ones groups together.`],
      ], R`The number is $2\,345\,678$.`],
      [R`Read the number $12\,056\,300$ and say how many groups it has.`, [
        [R`Split it from right to left into groups of three digits: $12$, $056$, $300$.`, R`Each group has three places; splitting from the right avoids mistakes.`],
        [R`It is read as twelve million fifty-six thousand three hundred. The number has three groups: millions, thousands and ones.`, R`Read each group with its name; a zero in the hundreds of a group is still taken into account.`],
      ], R`The number $12\,056\,300$ has three groups: millions, thousands and ones.`],
    ],
    dr: [
      [R`How much is four million?`, R`Four million is $4\,000\,000$.`, R`Each million is $1\,000\,000$. Four lots of that lie in the millions group.`],
      [R`Which is bigger, $3\,000\,000$ or $999\,999$?`, R`The number $3\,000\,000$ is bigger.`, R`A number with something in the millions group is bigger than one that only reaches the thousands group.`],
      [R`Work out $1\,000\,000+20\,000$.`, R`The sum is $1\,020\,000$.`, R`One million and twenty thousand more. The millions digit is still $1$.`],
    ],
  },
  "so-sanh-trieu": {
    s: R`Compare from the millions group to the thousands group, then the ones group. The first group that differs decides which number is bigger.`,
    w: R`One unit in a place on the left is bigger than any number written with the places on its right. So the first difference from the left is enough to decide.`,
    p: R`Thinking a number is bigger because its later digits are big. The number $2\,399\,000$ has two $9$s but is still smaller than $2\,450\,000$, because $3$ hundred thousands is fewer than $4$ hundred thousands.`,
    ex: [
      [R`Compare $2\,450\,000$ and $2\,399\,000$.`, [
        [R`Both numbers have $2$ millions.`, R`When the millions groups are equal, move on to the thousands group.`],
        [R`The thousands group of the first number is $450$ and of the second is $399$, so the first number is bigger.`, R`The hundred thousands digit $4$ is bigger than the hundred thousands digit $3$.`],
      ], R`The number $2\,450\,000$ is bigger than $2\,399\,000$.`],
      [R`Assumed data. Province A has a population of $1\,250\,400$ people and province B has $1\,205\,900$. Which province has more people?`, [
        [R`Both numbers have seven digits, and both have $1$ in the millions place.`, R`With the same number of digits, compare place by place from left to right.`],
        [R`The hundred thousands are equal at $2$; in the ten thousands, $5>0$, so $1\,250\,400>1\,205\,900$.`, R`Stop at the first place where the two digits differ.`],
      ], R`Province A has more people than province B.`],
    ],
    dr: [
      [R`Which is bigger, $5\,000\,000$ or $4\,999\,999$?`, R`The number $5\,000\,000$ is bigger.`, R`Five million comes right after $4\,999\,999$, so it is exactly $1$ more.`],
      [R`Compare $1\,200\,000$ and $1\,200\,500$.`, R`The number $1\,200\,500$ is bigger.`, R`The millions and thousands groups are the same. The ones group $500$ is bigger than $0$.`],
      [R`Order $30\,000$ and $3\,000\,000$. Which is smaller?`, R`The smaller number is $30\,000$.`, R`Thirty thousand is in the thousands group. Three million is in the millions group and is exactly one hundred times as big.`],
    ],
  },
  "phan-bang": {
    s: R`Two fractions are equal when multiplying the numerator and denominator of one by the same number other than $0$ gives the other.`,
    w: R`Cutting each piece of a cake into two smaller pieces doubles both the pieces taken and the total pieces, while the amount of cake stays the same. So $\frac{1}{2}$ and $\frac{2}{4}$ are the same amount.`,
    p: R`Adding the same number to the numerator and the denominator. Only multiplying or dividing both by the same number other than $0$ keeps the value the same.`,
    ex: [
      [R`Show that $\frac{1}{2}=\frac{2}{4}$.`, [
        [R`Multiply the numerator and denominator of $\frac{1}{2}$ by $2$.`, R`Multiplying the numerator and denominator by the same number other than $0$ does not change the fraction's value.`],
        [R`This gives $\frac{2}{4}$, so the two fractions are equal.`, R`The difference of two fractions is $0$ when they stand for the same number.`],
      ], R`The two fractions are equal.`],
      [R`Fill in the missing numbers: $\frac{3}{5}=\frac{\square}{20}$ and $\frac{12}{18}=\frac{2}{\square}$.`, [
        [R`The denominator $5$ times $4$ is $20$, so the numerator is also multiplied by $4$: $\frac{3}{5}=\frac{12}{20}$.`, R`Multiplying the numerator and denominator by the same number gives an equal fraction.`],
        [R`The numerator $12$ divided by $6$ is $2$, so the denominator is also divided by $6$: $\frac{12}{18}=\frac{2}{3}$.`, R`Dividing the numerator and denominator by the same number other than zero does not change the fraction.`],
      ], R`The missing numbers are $12$ and $3$.`],
    ],
    dr: [
      [R`Is the fraction $\frac{1}{3}$ equal to $\frac{2}{6}$?`, R`Yes, the two fractions are equal.`, R`Multiplying the numerator and denominator of the first fraction by $2$ gives the second.`],
      [R`Simplify $\frac{4}{10}$.`, R`In lowest terms it is $\frac{2}{5}$.`, R`Divide the numerator and denominator by the common factor $2$. The fraction's value does not change.`],
      [R`Are the fractions $\frac{3}{5}$ and $\frac{6}{10}$ equal?`, R`Yes.`, R`Multiplying the numerator and denominator of $\frac{3}{5}$ by $2$ gives $\frac{6}{10}$.`],
    ],
  },
  "so-sanh-phan-4": {
    s: R`Of two positive fractions with the same denominator, the one with the bigger numerator is bigger. Dividing by a fraction other than $0$ means multiplying by the fraction turned upside down.`,
    w: R`The same denominator means pieces of the same size, so taking more pieces gives more. And dividing by $\frac{1}{2}$ asks how many halves fit into the number, so the result is doubled.`,
    p: R`Dividing numerator by numerator and denominator by denominator, and getting stuck when it does not go exactly. The reliable way is to keep the first fraction and multiply by the second fraction turned upside down.`,
    ex: [
      [R`Compare $\frac{3}{7}$ with $\frac{5}{7}$, then work out $\frac{3}{4}:\frac{1}{2}$.`, [
        [R`Same denominator $7$ and $3<5$, so $\frac{3}{7}<\frac{5}{7}$.`, R`With equal positive denominators, only the numerators need comparing.`],
        [R`The division is $\frac{3}{4}\times\frac{2}{1}=\frac{3}{2}$.`, R`The fraction $\frac{1}{2}$ turned upside down is $\frac{2}{1}$. Multiply numerators together and denominators together.`],
      ], R`The fraction $\frac{3}{7}$ is smaller than $\frac{5}{7}$, and the quotient is $\frac{3}{2}$.`],
      [R`Compare $\frac{2}{3}$ and $\frac{3}{4}$.`, [
        [R`Use the common denominator $12$: $\frac{2}{3}=\frac{8}{12}$ and $\frac{3}{4}=\frac{9}{12}$.`, R`Fractions with different denominators are brought to the same denominator before comparing.`],
        [R`Same denominator, so compare the numerators: $8<9$, so $\frac{2}{3}<\frac{3}{4}$.`, R`Both are cut into twelve pieces; taking fewer pieces gives less.`],
      ], R`We have $\frac{2}{3}<\frac{3}{4}$.`],
    ],
    dr: [
      [R`Compare $\frac{1}{2}$ and $\frac{1}{3}$.`, R`The fraction $\frac{1}{2}$ is bigger.`, R`With the common denominator $6$ they become $\frac{3}{6}$ and $\frac{2}{6}$. The bigger numerator gives the bigger fraction.`],
      [R`Work out $\frac{2}{3}:\frac{4}{5}$.`, R`The quotient is $\frac{5}{6}$.`, R`Multiply $\frac{2}{3}$ by the upside-down fraction $\frac{5}{4}$, then simplify.`],
      [R`Work out $\frac{2}{8}+\frac{1}{8}$.`, R`The sum is $\frac{3}{8}$.`, R`With the same denominator, add the numerators and keep the denominator. This is addition, not multiplication.`],
    ],
  },
  "quy-dong": {
    s: R`Simplifying means dividing the numerator and denominator by the same number greater than $1$. Bringing two fractions to a common denominator means rewriting them with the same denominator, by multiplying the numerator and denominator of each by a suitable number.`,
    w: R`Cutting each piece of a shape into equal smaller pieces multiplies both the pieces taken and the total pieces, while the amount taken stays the same. Simplifying does the opposite, joining small pieces into bigger ones.`,
    p: R`Multiplying only the denominator and forgetting the numerator. Then the new fraction is smaller than the original.`,
    ex: [
      [R`Bring $\frac{1}{2}$ and $\frac{1}{3}$ to a common denominator.`, [
        [R`The common denominator is $6$, because $6$ is divisible by both $2$ and $3$.`, R`The common denominator must be divisible by each denominator for the change to work.`],
        [R`We have $\frac{1}{2}=\frac{3}{6}$ and $\frac{1}{3}=\frac{2}{6}$.`, R`Multiplying the numerator and denominator by the same number does not change the fraction's value.`],
      ], R`With a common denominator the two fractions are $\frac{3}{6}$ and $\frac{2}{6}$.`],
      [R`Simplify $\frac{18}{24}$, then bring $\frac{3}{4}$ and $\frac{5}{6}$ to a common denominator.`, [
        [R`Divide the numerator and denominator by $6$: $\frac{18}{24}=\frac{3}{4}$.`, R`The number $6$ is the biggest number dividing both $18$ and $24$, so one step is enough.`],
        [R`The least common denominator is $12$: $\frac{3}{4}=\frac{9}{12}$ and $\frac{5}{6}=\frac{10}{12}$.`, R`The number $12$ is divisible by both $4$ and $6$, so it is chosen as the common denominator.`],
      ], R`We have $\frac{18}{24}=\frac{3}{4}$, and with a common denominator the two fractions are $\frac{9}{12}$, $\frac{10}{12}$.`],
    ],
    dr: [
      [R`Simplify $\frac{6}{8}$.`, R`In lowest terms it is $\frac{3}{4}$.`, R`Divide the numerator and denominator by $2$ to get $\frac{3}{4}$.`],
      [R`Write $\frac{2}{5}$ as a fraction with denominator $10$. What is the new numerator?`, R`The new numerator is $4$.`, R`Multiply the numerator and denominator by $2$, because $5\times 2=10$.`],
      [R`Bring $\frac{3}{4}$ and $\frac{5}{6}$ to the common denominator $12$. What is the new numerator of the first fraction?`, R`The new numerator is $9$.`, R`The denominator $4$ times $3$ is $12$, so the numerator is also multiplied by $3$: $3\times 3=9$.`],
    ],
  },
  "cong-tru-phan-so": {
    s: R`To add or subtract two fractions with the same denominator, add or subtract the numerators and keep the denominator. With different denominators, find a common denominator first. To multiply two fractions, multiply numerator by numerator and denominator by denominator.`,
    w: R`Fractions with the same denominator are pieces of the same size, so adding them is like adding apples. Multiplying by $\frac{3}{4}$ means taking three quarters of an amount: the denominator grows because the pieces are cut smaller, and the numerator grows because more pieces are taken.`,
    p: R`Adding numerator to numerator and denominator to denominator. The sum $\frac{1}{2}+\frac{1}{3}$ is $\frac{5}{6}$, not $\frac{2}{5}$.`,
    ex: [
      [R`Work out $\frac{1}{2}+\frac{1}{3}$ and $\frac{2}{3}\times\frac{3}{4}$.`, [
        [R`Common denominator: $\frac{1}{2}+\frac{1}{3}=\frac{3}{6}+\frac{2}{6}=\frac{5}{6}$.`, R`The pieces must be the same size before the numbers of pieces can be added.`],
        [R`Multiply: $\frac{2}{3}\times\frac{3}{4}=\frac{6}{12}=\frac{1}{2}$.`, R`Numerator times numerator, denominator times denominator, then simplify the result.`],
      ], R`The sum is $\frac{5}{6}$ and the product is $\frac{1}{2}$.`],
      [R`On a card, Mai colours $\frac{2}{5}$ of it and Lan colours another $\frac{1}{3}$. What fraction of the card is coloured, and what fraction is not?`, [
        [R`The two girls colour $\frac{2}{5}+\frac{1}{3}=\frac{6}{15}+\frac{5}{15}=\frac{11}{15}$ of the card.`, R`Use the common denominator $15$, then add the two numerators.`],
        [R`What is left is $1-\frac{11}{15}=\frac{4}{15}$ of the card, not coloured.`, R`The whole card is $\frac{15}{15}$.`],
      ], R`They coloured $\frac{11}{15}$ of the card, and $\frac{4}{15}$ is not coloured.`],
    ],
    dr: [
      [R`Work out $\frac{3}{5}-\frac{1}{5}$.`, R`The difference is $\frac{2}{5}$.`, R`With the same denominator $5$, subtract the numerators: $3-1=2$.`],
      [R`Work out $\frac{1}{4}+\frac{1}{2}$.`, R`The sum is $\frac{3}{4}$.`, R`Change $\frac{1}{2}$ to $\frac{2}{4}$, then add the numerators: $1+2=3$.`],
      [R`Work out $\frac{2}{5}\times\frac{1}{3}$.`, R`The product is $\frac{2}{15}$.`, R`Numerator times numerator gives $2$, and denominator times denominator gives $15$.`],
    ],
  },
  "goc-4": {
    s: R`An acute angle is less than $90^\circ$. A right angle is $90^\circ$. An obtuse angle is more than $90^\circ$ and less than $180^\circ$. A straight angle is $180^\circ$. Angles are measured in degrees.`,
    w: R`An angle's measure tells how far its two sides open. The right angle is the mark at $90^\circ$: narrower is acute, wider is obtuse, and opening into a straight line is a straight angle.`,
    p: R`Reading the wrong scale on a protractor. A protractor has two scales running in opposite directions; read the one that starts at $0$ on the side where the protractor is placed.`,
    ex: [
      [R`What kind of angle is $40^\circ$, and what kind is $120^\circ$?`, [
        [R`The angle $40^\circ$ is less than $90^\circ$, so it is acute.`, R`Compare the measure with a right angle.`],
        [R`The angle $120^\circ$ is more than $90^\circ$ and less than $180^\circ$, so it is obtuse.`, R`An angle that has not reached a straight angle is not yet a straight angle.`],
      ], R`The angle $40^\circ$ is acute and the angle $120^\circ$ is obtuse.`],
      [R`What angle do the hour hand and minute hand make at exactly $3$ o'clock? And at exactly $6$ o'clock?`, [
        [R`At $3$ o'clock, the minute hand points at $12$ and the hour hand at $3$, making a right angle.`, R`A quarter of the way round the clock is an angle of $90^\circ$.`],
        [R`At $6$ o'clock, the two hands point in opposite directions in a straight line, making a straight angle.`, R`Half way round the clock is an angle of $180^\circ$.`],
      ], R`At $3$ o'clock it is a right angle, and at $6$ o'clock it is a straight angle.`],
    ],
    dr: [
      [R`How many degrees is a straight angle?`, R`A straight angle is $180^\circ$.`, R`Two right angles side by side on a line make a straight angle.`],
      [R`What kind of angle is $180^\circ$?`, R`It is a straight angle.`, R`The measure $180$ is exactly $90$ degrees more than a right angle and equals a straight angle.`],
      [R`Using a protractor, how many degrees is a right angle?`, R`A right angle is $90^\circ$.`, R`A right angle is half a straight angle. The protractor marks $90$ at this angle.`],
    ],
  },
  "vuong-song": {
    s: R`Two perpendicular lines meet at an angle of $90^\circ$. Two parallel lines never meet. A parallelogram has two pairs of opposite sides that are parallel and equal. This lesson finds the perimeter from the opposite sides, not the area.`,
    w: R`Two parallel lines always stay the same distance apart, so they never meet. In a parallelogram the opposite sides are equal, so the perimeter is twice the sum of two neighbouring sides.`,
    p: R`Thinking two segments that do not meet in the drawing are parallel. Extend them; if they meet, they are not parallel.`,
    ex: [
      [R`A parallelogram has neighbouring sides of $6$ centimetres and $4$ centimetres. What is its perimeter?`, [
        [R`The side opposite the $6$ side is also $6$, and the side opposite the $4$ side is also $4$.`, R`A parallelogram has pairs of opposite sides that are equal and parallel.`],
        [R`The perimeter is $(6+4)\times 2=20$ centimetres.`, R`Go once round both pairs of sides. The area formula is not used.`],
      ], R`The perimeter is $20$ centimetres.`],
      [R`Rectangle $ABCD$ has side $AB$ of $8$ centimetres and side $BC$ of $5$ centimetres. Name the pairs of parallel sides and the pairs of perpendicular sides, and find the perimeter.`, [
        [R`Side $AB$ is parallel to $CD$, and $AD$ is parallel to $BC$; two sides meeting at a corner are perpendicular, for example $AB$ is perpendicular to $BC$.`, R`A rectangle has four right angles, and its opposite sides are parallel.`],
        [R`The perimeter is $(8+5)\times 2=26$ centimetres.`, R`Opposite sides are equal, so add the length and width and double it.`],
      ], R`The perimeter of the rectangle is $26$ centimetres.`],
    ],
    dr: [
      [R`How many degrees is the angle between two perpendicular lines?`, R`The angle is $90^\circ$.`, R`A right angle is half a straight angle. A set square is used to draw it.`],
      [R`What is the perimeter of a parallelogram with sides $5$ and $3$?`, R`The perimeter is $16$.`, R`The two pairs of opposite sides are equal. The perimeter is twice the sum of two neighbouring sides.`],
      [R`A line is perpendicular to both of two parallel lines. What do those two right angles add up to?`, R`They add up to $180^\circ$, because each is $90^\circ$.`, R`A line perpendicular to one of two parallel lines is perpendicular to the other too. Two right angles make a straight angle.`],
    ],
  },
  "trung-binh-4": {
    s: R`The mean of some numbers is their total divided by how many numbers there are. Each number is added once.`,
    w: R`The mean evens things out: gather everything together and share it equally among the parts. After sharing, every part is the same and the total does not change.`,
    p: R`Dividing by the wrong number of terms. With four numbers, divide by $4$, even if some numbers repeat or one of them is $0$.`,
    ex: [
      [R`The marks for four tests are $6, 7, 7, 8$. What is the mean?`, [
        [R`The total is $6+7+7+8=28$.`, R`Both tests with mark $7$ are added.`],
        [R`The mean is $28:4=7$.`, R`Divide the total by the four tests, not by the number of different marks.`],
      ], R`The mean is $7$.`],
      [R`In the first three days of the week a shop sells $35$, $42$ and $28$ cakes. On average, how many cakes does it sell each day?`, [
        [R`The total number of cakes is $35+42+28=105$.`, R`Finding a mean starts with adding all the numbers.`],
        [R`Divide by the number of days: $105:3=35$ cakes.`, R`Share the total equally over three days, as if each day sold the same.`],
      ], R`On average the shop sells $35$ cakes a day.`],
    ],
    dr: [
      [R`What is the mean of $4, 6, 8$?`, R`The mean is $6$.`, R`The three numbers add up to $18$. Dividing by three numbers gives $6$.`],
      [R`Three numbers add up to $15$. What is their mean?`, R`The mean is $5$.`, R`Divide the total by how many numbers there are. Here there are exactly three.`],
      [R`What is the mean of $2$ and $8$?`, R`The mean is $5$.`, R`The two numbers add up to $10$. Dividing by $2$ gives $5$.`],
    ],
  },
  "bieu-do-cot-4": {
    s: R`On a bar chart, the height of each bar is that group's data. The tallest bar is the group with the largest value.`,
    w: R`All the bars share one scale on the vertical axis. However many marks taller a bar is, its value is that much bigger.`,
    p: R`Reading a bar's height without looking at the scale. Each mark might stand for $2$, $5$ or $10$ units, not always $1$.`,
    ex: [
      [R`Three bars have heights $2$, $5$ and $3$. Which bar is tallest, and what do the three bars add up to?`, [
        [R`The tallest bar has height $5$.`, R`Compare the three values read from the chart.`],
        [R`The total is $2+5+3=10$.`, R`Add all three bars when the whole set of data is needed.`],
      ], R`The tallest bar is the bar of height $5$, and the total is $10$.`],
      [R`Assumed data. A bar chart shows the number of pupils from four classes going on a trip: $28$, $32$, $25$, $35$. On average, how many pupils from each class go?`, [
        [R`Read the heights of the four bars and add them: $28+32+25+35=120$.`, R`Each bar stands for the number of pupils in one class.`],
        [R`Divide by the number of classes: $120:4=30$ pupils.`, R`There are four bars, so divide the total by four.`],
      ], R`On average, $30$ pupils from each class go on the trip.`],
    ],
    dr: [
      [R`A chart has bars of $4, 4, 1$. Is there one single tallest bar?`, R`No. Two bars are both $4$ tall.`, R`The largest value appears twice, so there is no single tallest bar.`],
      [R`How many units taller is the bar of $8$ than the bar of $3$?`, R`It is $5$ units taller.`, R`The difference of the two heights is how much one bar stands above the other.`],
      [R`What do the three bars $1, 2, 3$ add up to?`, R`The total is $6$.`, R`Add the numbers read from the bar chart.`],
    ],
  },
  "nhan-hai-chu-so": {
    s: R`Split the two-digit number into tens and ones, multiply by each in turn, then add the two partial products. The second partial product is written one column to the left because it is a number of tens.`,
    w: R`Multiplying by $23$ means taking $23$ lots, which is $3$ lots and $20$ lots. Work out each part separately and add them; that is the distributive property of multiplication over addition.`,
    p: R`Writing the second partial product in the same columns as the first. The second partial product is a number of tens, so it must move one column to the left.`,
    ex: [
      [R`Work out $36\times 23$.`, [
        [R`Multiply by the ones: $36\times 3=108$.`, R`The number $23$ is $2$ tens and $3$ ones; multiply by the $3$ ones first.`],
        [R`Multiply by the tens: $36\times 20=720$. Add: $108+720=828$.`, R`Multiplying by $2$ tens gives a number of tens, so this partial product ends in $0$.`],
      ], R`The product is $828$.`],
      [R`A hall has $28$ rows of seats with $45$ seats in each row. How many seats does the hall have?`, [
        [R`Work out the two partial products: $45\times 8=360$ and $45\times 2=90$, the second written one place to the left.`, R`The digit $2$ is in the tens place, so the second partial product is really $900$.`],
        [R`Add the two partial products: $360+900=1260$.`, R`The product is the sum of the partial products in their correct places.`],
      ], R`The hall has $1260$ seats.`],
    ],
    dr: [
      [R`Work out $12\times 11$.`, R`The product is $132$.`, R`We have $12\times 1=12$ and $12\times 10=120$, which add up to $132$.`],
      [R`Work out $45\times 20$.`, R`The product is $900$.`, R`Multiply $45$ by $2$ to get $90$, then add one $0$ because it is $2$ tens.`],
      [R`Each crate has $24$ bottles of water. How many bottles are in $15$ crates?`, R`There are $360$ bottles.`, R`We have $24\times 5=120$ and $24\times 10=240$, which add up to $360$.`],
    ],
  },
  "chia-hai-chu-so": {
    s: R`Divide from left to right. Each time, estimate one digit of the quotient, multiply back and subtract. The remainder each time must be smaller than the divisor.`,
    w: R`Division asks how many lots of the divisor make exactly the number being divided. Dividing part by part from the highest place down answers that question in tens, then in ones.`,
    p: R`Forgetting to write $0$ in the quotient when the part just brought down is smaller than the divisor. For $240:12$, the quotient is $20$, not $2$.`,
    ex: [
      [R`Work out $672:21$.`, [
        [R`Take $67$ divided by $21$ to get $3$, because $21\times 3=63$. The remainder is $67-63=4$.`, R`Estimate with $60:20=3$, then multiply back to check.`],
        [R`Bring down $2$ to get $42$. Then $42$ divided by $21$ is $2$, remainder $0$. The quotient is $32$.`, R`Each time a digit is brought down, write one more digit in the quotient.`],
      ], R`The quotient is $32$.`],
      [R`There are $1035$ books packed into boxes of $45$. How many boxes are needed?`, [
        [R`Take $103$ divided by $45$ to get $2$, because $45\times 2=90$, remainder $13$.`, R`Estimate the quotient by rounding $45$ to $50$, then check.`],
        [R`Bring down $5$ to get $135$, which divided by $45$ is $3$. So $1035:45=23$.`, R`Check: $45\times 23=1035$, with nothing left over.`],
      ], R`You need $23$ boxes.`],
    ],
    dr: [
      [R`Work out $240:12$.`, R`The quotient is $20$.`, R`Take $24$ divided by $12$ to get $2$, bring down $0$, which divided by $12$ is $0$; the quotient is $20$.`],
      [R`Work out $156:13$.`, R`The quotient is $12$.`, R`We have $13\times 12=156$, so the division is exact and the quotient is $12$.`],
      [R`Pack $375$ books into boxes of $25$. How many boxes are needed?`, R`You need $15$ boxes.`, R`We have $25\times 15=375$, so exactly $15$ boxes are filled.`],
    ],
  },
  "tinh-chat": {
    s: R`Swapping the numbers being added does not change the sum, and swapping the factors does not change the product. Numbers can be grouped in a convenient way. Multiplying a number by a sum means multiplying it by each term, then adding.`,
    w: R`Arrange dots in $3$ rows of $5$. Counting by rows gives $3\times 5$, counting by columns gives $5\times 3$, and the number of dots stays the same. Splitting each row into two pieces shows the distributive property.`,
    p: R`Using the swapping rule for subtraction and division. The difference $8-3$ is not $3-8$, and the quotient $8:2$ is not $2:8$.`,
    ex: [
      [R`Work out $25\times 7\times 4$ quickly.`, [
        [R`Swap and regroup: $(25\times 4)\times 7$.`, R`Multiplication can be swapped and regrouped, so this is allowed.`],
        [R`We have $100\times 7=700$.`, R`Grouping $25$ with $4$ gives a round hundred, leaving an easy multiplication.`],
      ], R`The product is $700$.`],
      [R`Work out $47\times 36+47\times 64$ quickly.`, [
        [R`Both products share the factor $47$, so write it as $47\times(36+64)$.`, R`The distributive property lets you take the common factor outside.`],
        [R`We have $36+64=100$, so the result is $47\times 100=4700$.`, R`Multiplying by one hundred just means writing two more zeros.`],
      ], R`The result is $4700$.`],
    ],
    dr: [
      [R`Work out $36+47+64$ quickly.`, R`The sum is $147$.`, R`Group $36$ with $64$ to make $100$, then add $47$ to get $147$.`],
      [R`Work out $8\times(10+5)$ in two ways.`, R`The result is $120$.`, R`First way: $8\times 15=120$. Second way: $8\times 10+8\times 5=80+40=120$.`],
      [R`Work out $17\times 6+17\times 4$ quickly.`, R`The result is $170$.`, R`Take $17$ as the common factor: $17\times(6+4)=17\times 10=170$.`],
    ],
  },
  "tong-hieu": {
    s: R`When you know the sum and difference of two numbers, the bigger number is the sum plus the difference, divided by $2$. The smaller number is the sum minus the difference, divided by $2$.`,
    w: R`Draw two bars, the longer one longer than the shorter by exactly the difference. Cut off the extra and you have two bars equal to the smaller number, so the sum minus the difference is twice the smaller number.`,
    p: R`Halving the sum and calling it one of the numbers. Halving the sum only gives the number exactly in the middle of the two.`,
    ex: [
      [R`Two numbers have sum $70$ and difference $10$. Find them.`, [
        [R`The bigger number is $(70+10):2=40$.`, R`Adding the difference to the sum gives twice the bigger number.`],
        [R`The smaller number is $70-40=30$.`, R`The two numbers add up to $70$; taking away the bigger one leaves the smaller.`],
      ], R`The two numbers are $40$ and $30$.`],
      [R`Two drums hold $96$ litres of oil altogether. The first holds $14$ litres more than the second. How many litres are in each drum?`, [
        [R`The smaller number is the sum minus the difference, halved: $(96-14):2=41$ litres.`, R`Take the extra away from the bigger drum and the two drums are equal.`],
        [R`The bigger number is $41+14=55$ litres.`, R`Check: $55+41=96$ and $55-41=14$.`],
      ], R`The first drum holds $55$ litres and the second holds $41$ litres.`],
    ],
    dr: [
      [R`Two numbers have sum $100$ and difference $20$. What is the bigger number?`, R`The bigger number is $60$.`, R`Add the sum and the difference, then halve: $120:2=60$.`],
      [R`Two numbers have sum $50$ and difference $6$. What is the smaller number?`, R`The smaller number is $22$.`, R`Take the difference from the sum, then halve: $44:2=22$.`],
      [R`A class has $35$ pupils, with $3$ more girls than boys. How many girls are there?`, R`There are $19$ girls.`, R`The girls are the bigger number: $(35+3):2=19$.`],
    ],
  },
  "yen-ta-tan": {
    s: R`One yen, a Vietnamese unit, is $10$ kilograms. One quintal is $10$ yen, that is $100$ kilograms. One tonne is $10$ quintals, that is $1000$ kilograms.`,
    w: R`The units of mass go up in steps of ten, like the places of whole numbers. Each unit is $10$ times the next smaller one.`,
    p: R`Thinking one quintal is $1000$ kilograms. A quintal is $100$ kilograms; it is the tonne that is $1000$ kilograms.`,
    ex: [
      [R`Change $3$ tonnes $5$ quintals to kilograms.`, [
        [R`We have $3$ tonnes equal to $3000$ kilograms and $5$ quintals equal to $500$ kilograms.`, R`Each tonne is $1000$ kilograms and each quintal is $100$ kilograms.`],
        [R`Add: $3000+500=3500$ kilograms.`, R`Both parts are now in kilograms, so they can be added.`],
      ], R`The result is $3500$ kilograms.`],
      [R`A lorry can carry $4$ tonnes. It already carries $25$ sacks of rice of $1$ quintal each. How many more kilograms can it carry?`, [
        [R`Change to kilograms: $4$ tonnes is $4000$ kilograms, and $25$ sacks is $25\times 100=2500$ kilograms.`, R`One tonne is one thousand kilograms, and one quintal is one hundred kilograms.`],
        [R`It can carry $4000-2500=1500$ kilograms more.`, R`Both numbers are now in the same unit, so one can be taken from the other.`],
      ], R`The lorry can carry $1500$ kilograms more.`],
    ],
    dr: [
      [R`Change $4$ quintals to kilograms.`, R`It is $400$ kilograms.`, R`Each quintal is $100$ kilograms, so four quintals is $400$ kilograms.`],
      [R`Change $2000$ kilograms to tonnes.`, R`It is $2$ tonnes.`, R`Every $1000$ kilograms is one tonne, so $2000$ kilograms is $2$ tonnes.`],
      [R`One lorry carries $2$ tonnes of rice and another carries $15$ quintals. How many quintals of rice do both lorries carry?`, R`Both lorries carry $35$ quintals of rice.`, R`Change $2$ tonnes to $20$ quintals, then add $15$ quintals to get $35$ quintals.`],
    ],
  },
  "giay-the-ki": {
    s: R`One minute has $60$ seconds. One century has $100$ years. The first century covers the years $1$ to $100$, and the twenty-first century covers the years $2001$ to $2100$.`,
    w: R`The first century starts in year $1$; there is no year $0$. So each century ends in a round hundred, and the round-hundred year belongs to the old century.`,
    p: R`Taking the first two digits of the year as the century. The year $1945$ is in the $20$th century, not the $19$th.`,
    ex: [
      [R`Change $3$ minutes $20$ seconds to seconds.`, [
        [R`We have $3$ minutes equal to $3\times 60=180$ seconds.`, R`Each minute has $60$ seconds, so three minutes is three lots of $60$.`],
        [R`Add the $20$ seconds: $180+20=200$ seconds.`, R`The extra seconds are added after changing the minutes.`],
      ], R`The result is $200$ seconds.`],
      [R`Which century is the year $2025$ in? Which century is $1945$ in?`, [
        [R`The twenty-first century covers the years $2001$ to $2100$, so $2025$ is in century $XXI$.`, R`Each century lasts one hundred years and starts with a year ending in one.`],
        [R`The twentieth century covers the years $1901$ to $2000$, so $1945$ is in century $XX$.`, R`Take the first two digits and add one when the year is not a round hundred.`],
      ], R`The year $2025$ is in century $XXI$, and $1945$ is in century $XX$.`],
    ],
    dr: [
      [R`How many years are in two centuries?`, R`There are $200$ years.`, R`Each century has $100$ years, so two centuries have $200$ years.`],
      [R`Change $120$ seconds to minutes.`, R`It is $2$ minutes.`, R`Every $60$ seconds is one minute, so $120$ seconds is $2$ minutes.`],
      [R`Which century is the year $1945$ in?`, R`The year $1945$ is in the $20$th century.`, R`The years $1901$ to $2000$ make up the $20$th century, and $1945$ falls in that range.`],
    ],
  },
  "dien-tich-4": {
    s: R`A square decimetre is the area of a square with sides of $1$ decimetre. One square decimetre is $100$ square centimetres. One square metre is $100$ square decimetres.`,
    w: R`A square with sides of $1$ decimetre has sides $10$ centimetres long, so it can be split into $10$ rows of $10$ squares with sides of $1$ centimetre. So two neighbouring units of area are $100$ times apart, not $10$ times.`,
    p: R`Changing units of area in steps of $10$ as with length. One metre is $10$ decimetres, but one square metre is $100$ square decimetres.`,
    ex: [
      [R`A rectangular card is $3$ decimetres long and $2$ decimetres wide. What is its area in square centimetres?`, [
        [R`The area is $3\times 2=6$ square decimetres.`, R`The area of a rectangle is length times width, in the same unit.`],
        [R`Change the unit: $6\times 100=600$ square centimetres.`, R`Each square decimetre holds $10\times 10=100$ squares with sides of one centimetre.`],
      ], R`The area of the card is $600$ square centimetres.`],
      [R`A rectangular room $5$ metres long and $4$ metres wide is tiled with square tiles with sides of $5$ decimetres. How many tiles are needed?`, [
        [R`The room's area is $5\times 4=20$ square metres, that is $2000$ square decimetres.`, R`One square metre is one hundred square decimetres.`],
        [R`Each tile has area $5\times 5=25$ square decimetres, so $2000:25=80$ tiles are needed.`, R`Divide the room's area by one tile's area, both in square decimetres.`],
      ], R`You need $80$ tiles.`],
    ],
    dr: [
      [R`Change $5$ square metres to square decimetres.`, R`It is $500$ square decimetres.`, R`Each square metre is $100$ square decimetres, so five square metres is $500$.`],
      [R`Change $300$ square centimetres to square decimetres.`, R`It is $3$ square decimetres.`, R`Every $100$ square centimetres is one square decimetre.`],
      [R`A rectangular room is $5$ metres long and $4$ metres wide. What is its area in square metres?`, R`The area is $20$ square metres.`, R`Multiply the length by the width: $5\times 4=20$ square metres.`],
    ],
  },
};
