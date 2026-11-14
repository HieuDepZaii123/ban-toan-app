/** Lớp 7 bằng tiếng Anh. Thứ tự ví dụ và bài luyện khớp bản tiếng Việt. */
import type { LessonEn } from "./types.ts";

const R = String.raw;

export const g7En: Record<string, LessonEn> = {
  "huu-ti-bai": {
    s: R`A rational number can be written as a fraction with integer numerator and denominator, the denominator not $0$. The sign rules for integers still apply when multiplying and adding.`,
    w: R`Rational numbers extend the integers so that all the rules for addition, multiplication and signs still hold. The product $\left(-\frac{2}{5}\right)\cdot\left(-\frac{5}{2}\right)$ equals $1$ because two negatives multiply to a positive and the two fractions are reciprocals.`,
    p: R`Adding numerator to numerator and denominator to denominator. To add two fractions, first bring them to a common denominator.`,
    ex: [
      [R`Compute $\left(-\frac{1}{2}\right)+\frac{3}{4}$ and $\left(-\frac{2}{5}\right)\cdot\left(-\frac{5}{2}\right)$.`, [
        [R`The sum is $-\frac{2}{4}+\frac{3}{4}=\frac{1}{4}$.`, R`Use the common denominator $4$, then add the numerators. The numerator $-2+3$ is $1$.`],
        [R`The product is $1$.`, R`Two negatives multiply to a positive, and the factors $2$ and $5$ cancel completely.`],
      ], R`The sum is $\frac{1}{4}$ and the product is $1$.`],
      [R`Compute $\left(\frac{1}{2}-\frac{2}{3}\right):\frac{-5}{6}$.`, [
        [R`Inside the brackets: $\frac{3}{6}-\frac{4}{6}=-\frac{1}{6}$.`, R`Bring to a common denominator, then subtract the numerators.`],
        [R`Multiply by the reciprocal: $-\frac{1}{6}\cdot\frac{6}{-5}=\frac{1}{5}$.`, R`Dividing by a fraction means multiplying by its reciprocal, and two negatives give a positive result.`],
      ], R`The result is $\frac{1}{5}$.`],
    ],
    dr: [
      [R`Compute $\frac{5}{6}-\frac{1}{6}$.`, R`The difference is $\frac{2}{3}$.`, R`With the same denominator, subtract the numerators. The difference $\frac{4}{6}$ simplifies to $\frac{2}{3}$.`],
      [R`Compute $\left(-\frac{3}{4}\right)\cdot\frac{2}{3}$.`, R`The product is $-\frac{1}{2}$.`, R`The factors have different signs, so the product is negative. Cancelling $3$ and $2$ gives $\frac{1}{2}$.`],
      [R`Compute $\frac{7}{2}+\left(-\frac{1}{2}\right)$.`, R`The sum is $3$.`, R`Same denominator: adding the numerators $7+(-1)$ gives $6$. The fraction $\frac{6}{2}$ equals $3$.`],
    ],
  },
  "so-thuc": {
    s: R`Every rational number is a real number. The principal square root of a non-negative number is the non-negative real number whose square is that number. The square root of a perfect square is an integer.`,
    w: R`The principal square root undoes squaring on non-negative numbers. Since $4^2=16$ and $4\ge 0$, we have $\sqrt{16}=4$, and by the very definition $\left(\sqrt{2}\right)^2=2$.`,
    p: R`Writing $\sqrt{16}=\pm 4$. The root sign only takes the non-negative value; it is the equation $x^2=16$ that has two solutions, $4$ and $-4$.`,
    ex: [
      [R`Compute $\sqrt{16}$ and $\left(\sqrt{2}\right)^2$.`, [
        [R`The principal square root of $16$ is $4$.`, R`The square of $4$ is $16$ and $4$ is non-negative. This is a rational number.`],
        [R`The square of $\sqrt{2}$ is $2$.`, R`By definition, squaring a principal square root gives back exactly the number under the root.`],
      ], R`The root of $16$ is $4$ and the square of $\sqrt{2}$ is $2$.`],
      [R`Compare $\sqrt{50}$ with $7$, and compute $\sqrt{0.49}+\sqrt{\frac{9}{4}}$.`, [
        [R`We have $7=\sqrt{49}$ and $49<50$, so $7<\sqrt{50}$.`, R`Of two non-negative numbers, the one with the larger square is larger.`],
        [R`We have $\sqrt{0.49}=0.7$ and $\sqrt{\frac{9}{4}}=\frac{3}{2}$, so the sum is $2.2$.`, R`Because $0.7^2=0.49$ and $\left(\frac{3}{2}\right)^2=\frac{9}{4}$.`],
      ], R`We have $\sqrt{50}>7$, and the sum of the two roots is $2.2$.`],
    ],
    dr: [
      [R`Compute $\sqrt{36}$.`, R`The principal square root is $6$.`, R`The square of $6$ is $36$ and $6$ is non-negative, so it is the principal root.`],
      [R`Compute $\sqrt{9}+\sqrt{4}$.`, R`The sum is $5$.`, R`The root of each perfect square is an integer. Adding $3$ and $2$ gives $5$.`],
      [R`Is the number $-\sqrt{4}$ the principal square root of $4$?`, R`No. The principal root is $2$, while $-\sqrt{4}$ equals $-2$.`, R`The principal square root is taken to be non-negative. A negative number whose square is $4$ is not the principal root.`],
    ],
  },
  "ti-le-thuc": {
    s: R`A proportion $\frac{a}{b}=\frac{c}{d}$ with $b,d\neq 0$ is equivalent to $ad=bc$. From a known product and one factor other than $0$, the other factor can be found.`,
    w: R`Multiplying both sides of $\frac{a}{b}=\frac{c}{d}$ by $bd$, which is not $0$, gives $ad=bc$. Since we only multiply by a number other than $0$, the two equations are equivalent.`,
    p: R`Multiplying the two numbers of the same fraction by mistake. Cross-multiplying takes the numerator of one fraction times the denominator of the other.`,
    ex: [
      [R`Given $\frac{2}{3}=\frac{x}{12}$, find $x$.`, [
        [R`Cross-multiplying gives $3x=2\cdot 12=24$.`, R`The two cross products of a proportion are equal. This is necessary and sufficient when the denominators are not $0$.`],
        [R`Since $3\neq 0$, we get $x=8$.`, R`Divide both sides by $3$. Check: $\frac{2}{3}$ and $\frac{8}{12}$ are the same number after simplifying.`],
      ], R`The value of $x$ is $8$.`],
      [R`Find two numbers $x$, $y$ with $\frac{x}{3}=\frac{y}{5}$ and $x+y=32$.`, [
        [R`By the property of equal ratios: $\frac{x}{3}=\frac{y}{5}=\frac{x+y}{3+5}=\frac{32}{8}=4$.`, R`Adding numerators together and denominators together still gives a ratio equal to the given ones.`],
        [R`Hence $x=3\cdot 4=12$ and $y=5\cdot 4=20$.`, R`Each number equals its denominator times the common value of the ratios.`],
      ], R`The two numbers are $x=12$ and $y=20$.`],
    ],
    dr: [
      [R`Given $\frac{4}{5}=\frac{y}{20}$, find $y$.`, R`The value of $y$ is $16$.`, R`Cross-multiplying gives $5y=80$. The coefficient of $y$ is not $0$, so we can divide.`],
      [R`If $ab=24$ and $a=6$, find $b$.`, R`The value of $b$ is $4$.`, R`From the product of two factors, divide by the factor other than $0$ to find the other one.`],
      [R`Given $\frac{3}{x}=\frac{1}{4}$ with $x\neq 0$, find $x$.`, R`The value of $x$ is $12$.`, R`Cross-multiplying gives $x=12$. Check: both sides of the proportion equal $\frac{1}{4}$.`],
    ],
  },
  "dai-luong-ti-le": {
    s: R`Two quantities are directly proportional when their quotient stays the same. They are inversely proportional when their product stays the same. Knowing one pair of values lets you find the other.`,
    w: R`Direct proportion means that when one quantity is multiplied by some factor, the other is multiplied by the same factor, so the quotient stays the same. Inverse proportion means that when one is multiplied by some factor, the other is divided by it, so the product stays the same.`,
    p: R`Using direct proportion for an inverse proportion problem. More workers must mean fewer days; if the result goes up, the wrong kind was chosen.`,
    ex: [
      [R`A car travels steadily $60$ kilometres in $2$ hours. How far does it travel in $3$ hours? Six people finish a job in $4$ days. How many days do eight people need, if everyone works at the same rate?`, [
        [R`Distance is directly proportional to time, so in $3$ hours the car travels $\frac{60}{2}\cdot 3=90$ kilometres.`, R`Distance divided by time is the speed, which stays the same when the car travels steadily.`],
        [R`The number of people is inversely proportional to the number of days, so eight people need $\frac{6\cdot 4}{8}=3$ days.`, R`The product of people and days stays the same when the amount of work and each person's rate stay the same.`],
      ], R`The car travels $90$ kilometres, and eight people need $3$ days.`],
      [R`Share $120$ notebooks among three groups in direct proportion to their numbers of students, $8$, $10$ and $12$. How many notebooks does each group get?`, [
        [R`There are $30$ students in total, so each student corresponds to $\frac{120}{30}=4$ notebooks.`, R`Direct proportion means notebooks divided by students is one constant shared by all three groups.`],
        [R`The three groups get $8\cdot 4=32$, $10\cdot 4=40$ and $12\cdot 4=48$ notebooks.`, R`Multiply that constant by each group's number of students.`],
      ], R`The three groups get $32$, $40$ and $48$ notebooks, adding up to exactly $120$.`],
    ],
    dr: [
      [R`A tap fills $15$ litres in $5$ minutes at a steady rate. How many litres does it fill in $8$ minutes?`, R`The tap fills $24$ litres.`, R`The amount of water is directly proportional to time. The rate $3$ litres per minute times $8$ minutes.`],
      [R`Four machines finish a batch in $6$ hours. How many hours do three machines of the same rate need?`, R`Three machines need $8$ hours.`, R`The number of machines is inversely proportional to the number of hours. The product $4\cdot 6$ stays the same, then divide by $3$.`],
      [R`The value $y$ is directly proportional to $x$, and $y=12$ when $x=3$. Find $y$ when $x=5$.`, R`The value of $y$ is $20$.`, R`The quotient of $y$ by $x$ is $4$ and stays the same. Multiplying $4$ by $5$ gives $20$.`],
    ],
  },
  "gia-tri-bt": {
    s: R`Substitute a number for each letter, then compute in the correct order of operations. Two different letters can take two different values.`,
    w: R`A letter in an expression stands for a number. Replacing the letters by numbers turns the expression into an ordinary calculation that follows the usual order of operations.`,
    p: R`Forgetting brackets when substituting a negative number. With $x=-2$, $x^2$ is $(-2)^2=4$, not $-2^2=-4$.`,
    ex: [
      [R`Find the value of $2x+3$ when $x=4$.`, [
        [R`Substituting $x=4$ gives $2\cdot 4+3$.`, R`Every place with the letter $x$ takes the same value $4$.`],
        [R`Multiply first, then add: $8+3=11$.`, R`The rule of multiplying before adding still applies after substituting.`],
      ], R`The value of the expression is $11$.`],
      [R`Find the value of $3x^2-2xy+y^2$ when $x=-1$ and $y=2$.`, [
        [R`Substitute: $3\cdot(-1)^2-2\cdot(-1)\cdot 2+2^2$.`, R`A negative number must be put in brackets when substituted to keep the sign right.`],
        [R`Compute: $3+4+4=11$.`, R`Powers first, then multiplication, and finally addition.`],
      ], R`The value of the expression is $11$.`],
    ],
    dr: [
      [R`Compute $x^2-1$ when $x=5$.`, R`The value is $24$.`, R`Substitute the same value wherever $x$ appears. Square $5$, then subtract $1$.`],
      [R`Add the monomials $3x+5x$.`, R`The sum is $8x$.`, R`Two monomials with the same variable and the same exponent add their coefficients. The variable $x$ stays as it is.`],
      [R`Compute $a+b$ when $a=2$ and $b=-7$.`, R`The sum is $-5$.`, R`Two different letters take two different values. Adding $2$ and $-7$ gives $-5$.`],
    ],
  },
  "da-thuc": {
    s: R`A polynomial in one variable is a sum of monomials in that variable. To add polynomials, add the coefficients of terms with the same exponent. To multiply two polynomials, multiply term by term and add the products.`,
    w: R`Terms with the same exponent are quantities of the same kind, so they combine like $2$ apples plus $3$ apples. Multiplying every term by every term uses the distributive property of multiplication over addition.`,
    p: R`Adding coefficients of terms of different degrees. The sum $2x+3x^2$ cannot be combined into $5x^3$ or $5x^2$.`,
    ex: [
      [R`Compute $(2x+1)+(3x-4)$ and check it at $x=2$.`, [
        [R`Add the coefficients of $x$ and the constant terms: $(2+3)x+(1-4)=5x-3$.`, R`Only add terms of the same degree. A constant term is a term without the variable.`],
        [R`When $x=2$, the value is $5\cdot 2-3=7$.`, R`Substitute after simplifying. Substituting into the original sum gives the same result.`],
      ], R`The sum is the polynomial $5x-3$, and its value at $x=2$ is $7$.`],
      [R`Let $P(x)=x^2-3x+2$. Compute $P(1)$ and $P(2)$, then say whether $x=1$, $x=2$ are roots of $P$.`, [
        [R`We have $P(1)=1-3+2=0$ and $P(2)=4-6+2=0$.`, R`Substitute each value into the polynomial and compute in the order of operations.`],
        [R`Both values make the polynomial equal to $0$, so both are roots.`, R`A root of a polynomial is a value of the variable that makes the polynomial zero.`],
      ], R`Both $x=1$ and $x=2$ are roots of $P(x)$.`],
    ],
    dr: [
      [R`Expand $(x+2)(x+3)$, then evaluate at $x=1$.`, R`The polynomial is $x^2+5x+6$, and its value at $x=1$ is $12$.`, R`Multiplying term by term gives $x^2+3x+2x+6$. At $x=1$, the product of the two factors $3$ and $4$ is also $12$.`],
      [R`Compute $4x-x$ when $x=6$.`, R`The value is $18$.`, R`The difference of two monomials of the same degree is a monomial with coefficient $3$. Multiplying $3$ by $6$ gives $18$.`],
      [R`What is the polynomial $x^2-4$ at $x=3$?`, R`The value is $5$.`, R`Substitute $3$ for the variable. The square is $9$, and subtracting $4$ leaves $5$.`],
    ],
  },
  "tong-goc": {
    s: R`The three interior angles of a triangle add up to $180^\circ$. Knowing two angles, the third is $180^\circ$ minus their sum.`,
    w: R`Through one vertex draw the line parallel to the opposite side. The two base angles equal two alternate angles, and together with the angle at the vertex they fill a straight angle of $180^\circ$.`,
    p: R`Using $360^\circ$ as the angle sum of a triangle. The sum $360^\circ$ belongs to a quadrilateral.`,
    ex: [
      [R`A triangle has two angles of $50^\circ$ and $60^\circ$. How many degrees is the third angle?`, [
        [R`The two known angles add up to $110^\circ$.`, R`Add exactly the two given measures, before subtracting from $180^\circ$.`],
        [R`The third angle is $180^\circ-110^\circ=70^\circ$.`, R`The interior angles add up to $180^\circ$. The remaining angle is $180^\circ$ minus the sum of the two known angles.`],
      ], R`The third angle is $70^\circ$.`],
      [R`Triangle $ABC$ has $\widehat{A}=2\widehat{B}$ and $\widehat{C}=30^\circ$. Find $\widehat{A}$ and $\widehat{B}$.`, [
        [R`From the angle sum: $\widehat{A}+\widehat{B}=180^\circ-30^\circ=150^\circ$.`, R`The three angles of a triangle always add up to $180^\circ$.`],
        [R`Substitute $\widehat{A}=2\widehat{B}$: $3\widehat{B}=150^\circ$, so $\widehat{B}=50^\circ$ and $\widehat{A}=100^\circ$.`, R`Angle $A$ is made of two parts equal to angle $B$, so the sum corresponds to three parts.`],
      ], R`We have $\widehat{A}=100^\circ$ and $\widehat{B}=50^\circ$.`],
    ],
    dr: [
      [R`How many degrees is each angle of an equilateral triangle?`, R`Each angle is $60^\circ$.`, R`The three angles are equal and add up to $180^\circ$. Share it equally among the three angles.`],
      [R`A right triangle has an acute angle of $35^\circ$. How many degrees is the other acute angle?`, R`The other angle is $55^\circ$.`, R`The two acute angles of a right triangle add up to $90^\circ$. The right angle already takes $90^\circ$ of the $180^\circ$ total.`],
      [R`A triangle has angles $40^\circ$, $60^\circ$ and $80^\circ$. What is the sum of the three angles?`, R`The sum is $180^\circ$.`, R`Add all three measures. The result agrees with the angle-sum theorem.`],
    ],
  },
  "bang-nhau": {
    s: R`Two triangles are congruent when corresponding sides and angles are equal. The side-side-side case: if the three sides of one triangle equal the three sides of the other, the triangles are congruent.`,
    w: R`Three sides already fix the shape of a triangle: building a triangle from three given segments gives only one shape, up to position. So equal sides force all three angles to be equal as well.`,
    p: R`Writing the corresponding vertices in the wrong order. In $\triangle ABC=\triangle DEF$, vertex $A$ matches $D$, $B$ matches $E$ and $C$ matches $F$.`,
    ex: [
      [R`Triangle $ABC$ has sides $5$, $6$ and $7$. Triangle $DEF$ has sides $5$, $6$ and $7$. Are the triangles congruent, and what is the perimeter of each?`, [
        [R`The three pairs of corresponding sides are equal, so the triangles are congruent by side-side-side.`, R`Three sides are enough; no angle is needed. The corresponding angles are then equal too.`],
        [R`The perimeter of each triangle is $5+6+7=18$.`, R`Congruent triangles have equal perimeters because their corresponding sides are equal.`],
      ], R`The triangles are congruent and each has perimeter $18$.`],
      [R`Triangle $ABC$ has $AB=AC$, and $M$ is the midpoint of $BC$. Prove that $\triangle ABM=\triangle ACM$, then deduce that $\widehat{B}=\widehat{C}$.`, [
        [R`The two triangles have $AB=AC$, $BM=CM$ and the common side $AM$.`, R`The point $M$ is the midpoint, so it splits $BC$ into two equal segments.`],
        [R`By side-side-side, $\triangle ABM=\triangle ACM$, so $\widehat{B}=\widehat{C}$.`, R`Congruent triangles have equal corresponding angles.`],
      ], R`The two triangles are congruent, and an isosceles triangle has equal base angles.`],
    ],
    dr: [
      [R`A triangle is congruent to the triangle with sides $5$, $6$ and $7$. What is its perimeter?`, R`The perimeter is $18$.`, R`Congruent triangles have equal corresponding sides, so the perimeter is the sum of exactly the three given sides.`],
      [R`A triangle has sides $3$, $4$ and $5$. What is its perimeter?`, R`The perimeter is $12$.`, R`The perimeter is the sum of the three sides. This triple also works for side-side-side when the other triangle has the same three sides.`],
      [R`Two triangles have sides $7$, $8$, $9$ and $7$, $8$, $9$. By which case are they congruent, and what is the perimeter of each?`, R`They are congruent by side-side-side. The perimeter is $24$.`, R`Three pairs of equal corresponding sides call for side-side-side. The perimeter is the sum of the three sides.`],
    ],
  },
  "can-deu": {
    s: R`An isosceles triangle has two equal legs and two equal base angles. An equilateral triangle has three equal sides and each angle is $60^\circ$.`,
    w: R`Folding an isosceles triangle along the line from the apex to the midpoint of the base makes the two halves match, so the base angles are equal. An equilateral triangle is isosceles at all three vertices, so its three angles are equal, each $180^\circ:3=60^\circ$.`,
    p: R`Confusing the apex angle with a base angle. Knowing the apex angle, each base angle is $180^\circ$ minus the apex angle, then divided by $2$.`,
    ex: [
      [R`An isosceles triangle has an apex angle of $40^\circ$. How many degrees is each base angle?`, [
        [R`The two base angles together make $180^\circ-40^\circ=140^\circ$.`, R`The interior angles add up to $180^\circ$. The apex angle is known, so the rest belongs to the two base angles.`],
        [R`The two base angles are equal, so each is $70^\circ$.`, R`An isosceles triangle has equal base angles. Dividing $140^\circ$ by $2$ gives $70^\circ$.`],
      ], R`Each base angle is $70^\circ$.`],
      [R`An isosceles triangle has a base angle of $65^\circ$. Find the apex angle.`, [
        [R`The two base angles of an isosceles triangle are equal, both $65^\circ$.`, R`The symmetry of an isosceles triangle makes the two base angles equal.`],
        [R`The apex angle is $180^\circ-2\cdot 65^\circ=50^\circ$.`, R`Subtract the two base angles from the angle sum.`],
      ], R`The apex angle is $50^\circ$.`],
    ],
    dr: [
      [R`What is the perimeter of an equilateral triangle with side $6$?`, R`The perimeter is $18$.`, R`The three sides of an equilateral triangle are equal. Multiply the length of one side by $3$.`],
      [R`An isosceles triangle has two base angles of $50^\circ$ each. How many degrees is the apex angle?`, R`The apex angle is $80^\circ$.`, R`The two base angles are equal. What is left of the $180^\circ$ total is the apex angle.`],
      [R`How many degrees is the exterior angle adjacent and supplementary to an interior angle of $50^\circ$?`, R`The supplementary angle is $130^\circ$.`, R`Adjacent supplementary angles add up to $180^\circ$. Knowing one, the other is what remains up to $180^\circ$.`],
    ],
  },
  "doan-thang": {
    s: R`A line graph joins points in time order. A segment goes up when the data increase and down when they decrease. The difference between two consecutive points is the change.`,
    w: R`The horizontal axis shows time in order, and the vertical axis shows the data. Whether the segment between two neighbouring points slopes up or down shows at once whether the data rose or fell.`,
    p: R`Reading the steepest segment as the largest value. Steepness shows the size of the change, while the largest value is the highest point.`,
    ex: [
      [R`The temperatures at three times of day are $20^\circ\mathrm{C}$, $26^\circ\mathrm{C}$ and $23^\circ\mathrm{C}$. From the first to the second, how many degrees does the temperature rise?`, [
        [R`The two consecutive points are $20$ and $26$.`, R`A line graph is read in the order of the points, without skipping.`],
        [R`The rise is $26-20=6$ degrees.`, R`A positive difference means the segment goes up.`],
      ], R`The temperature rises by $6$ degrees.`],
      [R`Assumed data. A shop's customers on four days in a row are $40$, $55$, $50$, $70$. On which day is the increase over the day before largest?`, [
        [R`The changes are $+15$, $-5$ and $+20$.`, R`The change between two days is the later number minus the earlier one.`],
        [R`The largest increase is $+20$, from the third day to the fourth.`, R`On a line graph, the segment rising most steeply corresponds to the largest increase.`],
      ], R`The fourth day has the largest increase, with $20$ more customers.`],
    ],
    dr: [
      [R`From $26^\circ\mathrm{C}$ down to $23^\circ\mathrm{C}$, how many degrees does the temperature fall?`, R`The temperature falls by $3$ degrees.`, R`The earlier point minus the later one is the fall. The corresponding segment goes down.`],
      [R`A segment on the graph joins the point $4$ to the point $9$. What is the increase?`, R`The increase is $5$.`, R`Read from left to right in time. The later point is larger than the earlier one, so the segment goes up.`],
      [R`For the three points $2, 5, 5$, does the second segment go up, go down or stay level?`, R`The second segment is level.`, R`Two equal points have difference $0$. The segment is horizontal.`],
    ],
  },
  "quat-tron": {
    s: R`A pie chart uses the whole circle, that is $360^\circ$, to represent the whole group surveyed. The central angle of a sector is that group's share times $360^\circ$.`,
    w: R`The whole circle is the whole group, so each part takes a share of the circle exactly equal to its proportion. A group making up $\frac{10}{40}$ of the class takes $\frac{10}{40}$ of $360^\circ$, that is $90^\circ$.`,
    p: R`Using a pie chart for overlapping groups. The sectors only fill the circle exactly when each person belongs to exactly one group.`,
    ex: [
      [R`In a class of $40$ students, $10$ choose subject A. How many degrees is the sector for subject A?`, [
        [R`The share of subject A is $\frac{10}{40}=\frac{1}{4}$.`, R`The numerator counts students choosing A. The denominator counts the whole class, that is, the whole circle.`],
        [R`The sector measures $\frac{1}{4}\cdot 360^\circ=90^\circ$.`, R`Multiply that share by a full turn of $360^\circ$. A right-angled sector is a quarter of the circle.`],
      ], R`The sector for subject A is $90^\circ$.`],
      [R`Assumed data. A sector with central angle $72^\circ$ represents one group out of $50$ people asked. How many people are in that group?`, [
        [R`This group takes $\frac{72}{360}=\frac{1}{5}$ of the circle.`, R`The central angle compared with the full turn tells what share of the whole sample the group is.`],
        [R`The number of people is $\frac{1}{5}\cdot 50=10$.`, R`Multiply that share by the total number of people asked.`],
      ], R`The group has $10$ people.`],
    ],
    dr: [
      [R`How many degrees is half a circle?`, R`Half is $180^\circ$.`, R`Half of $360^\circ$ is a straight angle. This sector takes half the chart.`],
      [R`A group makes up $\frac{1}{5}$ of the students. How many degrees is its sector?`, R`The sector is $72^\circ$.`, R`Multiply the group's share by $360^\circ$. One fifth of $360$ is $72$.`],
      [R`Three sectors are $90^\circ$, $120^\circ$ and the rest. How many degrees is the rest?`, R`The rest is $150^\circ$.`, R`The sectors of a complete chart add up to $360^\circ$. Subtract the two known sectors.`],
    ],
  },
  "xs-bien-co": {
    s: R`When outcomes are equally likely, the probability of an event $A$ is $\frac{n(A)}{n(\Omega)}$. The numerator counts favourable outcomes. The denominator counts all possible outcomes.`,
    w: R`When every outcome is equally likely, each takes an equal share of the whole. An event made of so many favourable outcomes takes that many shares.`,
    p: R`Using the formula when outcomes are not equally likely. Getting red or blue does not mean each colour has probability $\frac{1}{2}$; count marble by marble.`,
    ex: [
      [R`A bag has $3$ red and $2$ blue marbles, each equally likely to be drawn. What is the probability of drawing red?`, [
        [R`There are $5$ marbles, so $n(\Omega)=5$. There are $3$ red marbles.`, R`Each marble is an outcome. A red marble is a favourable outcome for this event.`],
        [R`The probability is $\frac{3}{5}$.`, R`Divide the number of favourable outcomes by the number of possible outcomes. The fraction is already in lowest terms.`],
      ], R`The probability of drawing red is $\frac{3}{5}$.`],
      [R`A number from $1$ to $20$ is chosen at random. Find the probability that it is divisible by $3$.`, [
        [R`The numbers divisible by $3$ are $3$, $6$, $9$, $12$, $15$, $18$, that is, $6$ numbers.`, R`List the favourable outcomes so that none is missed.`],
        [R`The probability is $\frac{6}{20}=\frac{3}{10}$.`, R`There are twenty equally likely outcomes.`],
      ], R`The probability is $\frac{3}{10}$.`],
    ],
    dr: [
      [R`A fair die has $6$ faces. What is the probability of rolling a $6$?`, R`The probability is $\frac{1}{6}$.`, R`One favourable face out of six equally likely faces.`],
      [R`A bag has $3$ red and $2$ blue marbles. What is the probability of drawing blue?`, R`The probability is $\frac{2}{5}$.`, R`Two blue marbles out of five. This is the remaining event compared with drawing red.`],
      [R`The probability of red is $\frac{3}{5}$ and of blue is $\frac{2}{5}$. What is the sum of the two probabilities?`, R`The sum is $1$.`, R`These two events cannot happen together and between them cover every marble in the bag.`],
    ],
  },
  "doi-dinh": {
    s: R`Two adjacent supplementary angles share one side, their other sides are opposite rays, and they add up to $180^\circ$. Two vertical angles have each side of one opposite to a side of the other, and they are equal.`,
    w: R`Two vertical angles are both supplementary to the same third angle. Each equals $180^\circ$ minus that angle, so they are equal.`,
    p: R`Calling two equal angles with a shared vertex vertical angles. Their sides must form two pairs of opposite rays to be vertical angles.`,
    ex: [
      [R`Two intersecting lines make an angle of $50^\circ$. Find the other three angles.`, [
        [R`The angle vertical to the given one is also $50^\circ$.`, R`Vertical angles are equal.`],
        [R`Each angle supplementary to the $50^\circ$ angle is $180^\circ-50^\circ=130^\circ$.`, R`Adjacent supplementary angles add up to $180^\circ$.`],
      ], R`The other three angles are $50^\circ$, $130^\circ$ and $130^\circ$.`],
      [R`Two intersecting lines make four angles, one of which is twice the angle next to it. Find the four angles.`, [
        [R`Call the smaller angle $x$ and the adjacent one $2x$. They are supplementary, so $3x=180^\circ$, that is, $x=60^\circ$.`, R`Adjacent supplementary angles add up to $180^\circ$.`],
        [R`The other two angles are vertical to these two, so they are $60^\circ$ and $120^\circ$.`, R`Vertical angles are equal.`],
      ], R`The four angles are $60^\circ$, $120^\circ$, $60^\circ$ and $120^\circ$.`],
    ],
    dr: [
      [R`How many degrees is the angle supplementary to a $70^\circ$ angle?`, R`That angle is $110^\circ$.`, R`Supplementary angles add up to $180^\circ$, so the required angle is $180^\circ-70^\circ$.`],
      [R`Two vertical angles add up to $80^\circ$. How many degrees is each?`, R`Each angle is $40^\circ$.`, R`Vertical angles are equal, so each is half the sum.`],
      [R`An angle bisector splits a $120^\circ$ angle into two angles. How many degrees is each?`, R`Each angle is $60^\circ$.`, R`An angle bisector splits the angle into two equal angles, each half of it.`],
    ],
  },
  "song-song-7": {
    s: R`If a line crosses two lines and makes a pair of equal alternate angles, or a pair of equal corresponding angles, then the two lines are parallel. Conversely, when two parallel lines are crossed by a third line, alternate angles are equal and corresponding angles are equal.`,
    w: R`Through a point not on a line there is exactly one line parallel to it. Because there is only one such line, the angle it makes with the transversal is fixed and equals the alternate angle exactly.`,
    p: R`Using equal alternate angles before knowing the lines are parallel. That property only holds once parallelism is established.`,
    ex: [
      [R`Line $a$ is parallel to line $b$. Line $c$ crosses $a$, making an angle of $65^\circ$. Find the alternate angle and the co-interior angle to it at $b$.`, [
        [R`The alternate angle is $65^\circ$.`, R`When two lines are parallel, alternate angles are equal.`],
        [R`The co-interior angle is $180^\circ-65^\circ=115^\circ$.`, R`The co-interior angle is supplementary to the alternate angle just found.`],
      ], R`The alternate angle is $65^\circ$ and the co-interior angle is $115^\circ$.`],
      [R`Line $a$ is parallel to $b$, and line $c$ crosses $a$ at $A$ and $b$ at $B$. The angle between $c$ and $a$ at $A$ is $3x+10^\circ$, and the alternate angle at $B$ is $5x-30^\circ$. Find $x$.`, [
        [R`Since $a$ is parallel to $b$, the alternate angles are equal: $3x+10=5x-30$.`, R`When parallel lines are crossed, alternate angles are equal.`],
        [R`Solving gives $2x=40$, that is, $x=20$, and each angle is $70^\circ$.`, R`Move the terms with $x$ to one side, then divide by the coefficient.`],
      ], R`We have $x=20$, and each angle is $70^\circ$.`],
    ],
    dr: [
      [R`Two parallel lines are crossed by a line. One angle is $48^\circ$. How many degrees is its co-interior angle?`, R`That angle is $132^\circ$.`, R`Co-interior angles between two parallel lines add up to $180^\circ$.`],
      [R`A line crosses two lines, making two alternate angles both equal to $70^\circ$. Are the two lines parallel?`, R`Yes, the two lines are parallel.`, R`A pair of equal alternate angles is a test for parallel lines.`],
      [R`Line $a$ is parallel to $b$ and $c$ is perpendicular to $a$. How many degrees is the angle between $c$ and $b$?`, R`That angle is $90^\circ$.`, R`The angle corresponding to the right angle at $a$ is also a right angle, so $c$ is perpendicular to $b$.`],
    ],
  },
  "hop-7": {
    s: R`A cuboid has $6$ rectangular faces, $12$ edges and $8$ vertices. Its lateral area is the perimeter of the base times the height. Its volume is the base area times the height.`,
    w: R`Cutting along a vertical edge and unfolding, the four lateral faces form one rectangle. Its length is the perimeter of the base and its width is the height of the cuboid.`,
    p: R`Including the two bases in the lateral area. The lateral area covers only the side faces; adding the two bases gives the total surface area.`,
    ex: [
      [R`A cuboid has a base of length $5$ and width $3$, and height $4$. Find its lateral area and volume.`, [
        [R`The perimeter of the base is $2\cdot(5+3)=16$, so the lateral area is $16\cdot 4=64$.`, R`Unfold the four side faces into one rectangle as long as the base perimeter and as wide as the height.`],
        [R`The volume is $5\cdot 3\cdot 4=60$.`, R`The base area $15$ times the height $4$.`],
      ], R`The lateral area is $64$ and the volume is $60$.`],
      [R`A cuboid fish tank is $60$ cm long, $40$ cm wide and $50$ cm high, and holds water $30$ cm deep. How many litres of water does it hold?`, [
        [R`The water forms a cuboid of $60\cdot 40\cdot 30=72\,000$ cm³.`, R`The water fills the bottom part of the tank, with the same base and a height equal to the water level.`],
        [R`One litre is $1000$ cm³, so there are $72$ litres of water.`, R`Convert the volume to litres to answer the question asked.`],
      ], R`The tank holds $72$ litres of water.`],
    ],
    dr: [
      [R`What is the volume of a cube with edge $3$?`, R`The volume is $27$.`, R`The volume of a cube is edge times edge times edge.`],
      [R`What is the lateral area of a cube with edge $3$?`, R`The lateral area is $36$.`, R`The four side faces are squares with side $3$, each of area $9$.`],
      [R`A cuboid water tank is $2$ metres long, $1$ metre wide and $1.5$ metres high. How many cubic metres of water does it hold?`, R`It holds $3$ cubic metres.`, R`The volume is $2\cdot 1\cdot 1.5=3$ cubic metres.`],
    ],
  },
  "lang-tru-7": {
    s: R`A right triangular prism has two congruent triangular bases and three rectangular side faces. Its lateral area is the perimeter of the base times the height. Its volume is the base area times the height.`,
    w: R`A right prism is a base lifted straight up through the height. Every slice parallel to the base equals the base, so the volume is the base area times the height.`,
    p: R`Confusing the height of the base triangle with the height of the prism. The prism's height is the length of a lateral edge, perpendicular to both bases.`,
    ex: [
      [R`A right prism has a right-triangle base with legs $3$ and $4$ and hypotenuse $5$, and prism height $10$. Find the lateral area and the volume.`, [
        [R`The perimeter of the base is $3+4+5=12$, so the lateral area is $12\cdot 10=120$.`, R`The three side faces unfold into one rectangle as long as the base perimeter.`],
        [R`The base area is $\frac{1}{2}\cdot 3\cdot 4=6$, so the volume is $6\cdot 10=60$.`, R`The base is a right triangle, so its area is half the product of the two legs.`],
      ], R`The lateral area is $120$ and the volume is $60$.`],
      [R`A right prism has a right-triangle base with legs $6$ cm and $8$ cm, and prism height $10$ cm. Find the total surface area.`, [
        [R`The hypotenuse of the base is $\sqrt{36+64}=10$ cm, the base perimeter is $24$ cm, and the lateral area is $24\cdot 10=240$ cm².`, R`The lateral area is the base perimeter times the height.`],
        [R`Each base has area $\frac{1}{2}\cdot 6\cdot 8=24$ cm², so the two bases make $48$ cm². Total: $240+48=288$ cm².`, R`The total surface area is the lateral area plus the two bases.`],
      ], R`The total surface area is $288$ cm².`],
    ],
    dr: [
      [R`A right prism has base area $12$ and height $5$. What is its volume?`, R`The volume is $60$.`, R`The volume of a right prism is the base area times the height.`],
      [R`A right triangular prism has an equilateral base with side $4$ and height $6$. What is its lateral area?`, R`The lateral area is $72$.`, R`The base perimeter is $12$; times the height $6$ gives $72$.`],
      [R`A right prism has a trapezium base with parallel sides $3$ and $5$ and trapezium height $2$, and prism height $7$. What is its volume?`, R`The volume is $56$.`, R`The trapezium base has area $\frac{(3+5)\cdot 2}{2}=8$; times $7$ gives $56$.`],
    ],
  },
};
