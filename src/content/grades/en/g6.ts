/** Lớp 6 bằng tiếng Anh. Thứ tự ví dụ và bài luyện khớp bản tiếng Việt. */
import type { LessonEn } from "./types.ts";

const R = String.raw;

export const g6En: Record<string, LessonEn> = {
  "thu-tu-tinh": {
    s: R`In a calculation, work inside brackets first, then multiply and divide, and only then add and subtract. Operations of the same level go from left to right.`,
    w: R`Multiplication is short for repeated addition, so $3\cdot 4$ is a block $4+4+4$ that must be finished before adding anything else. Brackets mark a block to be worked out before everything else.`,
    p: R`Working strictly left to right without looking at the kind of operation. The expression $2+3\cdot 4$ equals $14$, not $20$.`,
    ex: [
      [R`Compute $2+3\cdot 4$.`, [
        [R`Multiply first: $3\cdot 4=12$.`, R`Multiplication comes before addition when there are no brackets.`],
        [R`Add afterwards: $2+12=14$.`, R`Add only once the product is known. Doing $2+3$ first gives a different result.`],
      ], R`The value of the expression is $14$.`],
      [R`Compute $48:(2+6)\cdot 3-5$.`, [
        [R`Brackets first: $2+6=8$.`, R`The part in brackets is always worked out before any other operation.`],
        [R`Multiply and divide from left to right: $48:8=6$, then $6\cdot 3=18$.`, R`Multiplication and division have the same level, so do them in reading order from left to right.`],
        [R`Finally subtract: $18-5=13$.`, R`Addition and subtraction come last.`],
      ], R`The result is $13$.`],
    ],
    dr: [
      [R`Compute $(2+3)\cdot 4$.`, R`The value is $20$.`, R`The brackets force the two numbers to be added first. The sum $5$ times $4$ is $20$.`],
      [R`Compute $20-6:2$.`, R`The value is $17$.`, R`Division comes before subtraction. The quotient $3$ is subtracted from $20$.`],
      [R`Compute $8:2+1$.`, R`The value is $5$.`, R`Divide first to get $4$, then add $1$. Do not add $2$ and $1$ before dividing.`],
    ],
  },
  "luy-thua": {
    s: R`With a positive whole exponent, $a^n$ is the product of $n$ factors equal to $a$. In particular $a^1=a$. The exponent counts how many times to multiply, not a number to multiply $a$ by.`,
    w: R`A power is short for a product of equal factors, just as multiplication is short for a sum of equal terms. So $2^5$ means $2\cdot 2\cdot 2\cdot 2\cdot 2$.`,
    p: R`Multiplying the base by the exponent. The value of $2^5$ is $32$, not $2\cdot 5=10$.`,
    ex: [
      [R`Compute $2^5$.`, [
        [R`Five factors of $2$ multiplied together: $2\cdot 2\cdot 2\cdot 2\cdot 2$.`, R`The exponent $5$ counts the factors; it does not add $5$.`],
        [R`The product is $32$.`, R`Multiplying in turn gives $4$, $8$, $16$, then $32$.`],
      ], R`The value is $32$.`],
      [R`Simplify $3^4\cdot 3^2$ and compute $5^6:5^4$.`, [
        [R`Multiplying powers with the same base adds the exponents: $3^4\cdot 3^2=3^6=729$.`, R`There are four factors of $3$ and then two more factors of $3$, six factors in all.`],
        [R`Dividing powers with the same base subtracts the exponents: $5^6:5^4=5^2=25$.`, R`The four factors of $5$ in the divisor cancel four factors in the dividend.`],
      ], R`We have $3^4\cdot 3^2=3^6=729$ and $5^6:5^4=25$.`],
    ],
    dr: [
      [R`Compute $3^3$.`, R`The value is $27$.`, R`Three factors of $3$ multiplied. The product $3\cdot 3\cdot 3$ is $27$.`],
      [R`Compute $10^2$.`, R`The value is $100$.`, R`The square of $10$ is the product of two factors of $10$.`],
      [R`Compute $5^1$.`, R`The value is $5$.`, R`The exponent $1$ means exactly one factor, equal to the base itself.`],
    ],
  },
  ucln: {
    s: R`The greatest common divisor of two positive integers is the largest positive integer dividing both. The least common multiple is the smallest positive integer divisible by both.`,
    w: R`Prime factorisation shows which factors each number is built from. The shared part gives the greatest common divisor, while taking every factor with its highest power gives the least common multiple.`,
    p: R`Taking the product of the two numbers as the least common multiple. The product $12\cdot 18=216$ is a common multiple, but the least one is only $36$.`,
    ex: [
      [R`Find the greatest common divisor and the least common multiple of $12$ and $18$.`, [
        [R`The greatest common divisor is $6$.`, R`The number $6$ divides $12$ and $18$, and no larger common divisor exists.`],
        [R`The least common multiple is $36$.`, R`The product of the two numbers divided by the greatest common divisor also gives $36$. It is the smallest positive common multiple.`],
      ], R`The greatest common divisor is $6$ and the least common multiple is $36$.`],
      [R`There are $24$ notebooks and $36$ pens to share equally among gift bags with nothing left over. What is the largest number of gift bags?`, [
        [R`The number of bags must be a common divisor of $24$ and $36$, and as large as possible.`, R`Sharing equally with nothing left over means the number of bags divides both the notebooks and the pens.`],
        [R`Factorise: $24=2^3\cdot 3$ and $36=2^2\cdot 3^2$, so the greatest common divisor is $2^2\cdot 3=12$.`, R`The greatest common divisor takes the shared factors with the smaller exponents.`],
      ], R`At most $12$ gift bags can be made, each with $2$ notebooks and $3$ pens.`],
    ],
    dr: [
      [R`Find the greatest common divisor of $8$ and $12$.`, R`The greatest common divisor is $4$.`, R`The number $4$ divides both $8$ and $12$, and no larger positive common divisor exists.`],
      [R`Find the least common multiple of $4$ and $6$.`, R`The least common multiple is $12$.`, R`The number $12$ is the smallest positive multiple of both $4$ and $6$.`],
      [R`Is $135$ divisible by $9$? Use the sum of its digits.`, R`Yes, because the digit sum is $9$ and $135=9\cdot 15$.`, R`A number is divisible by $9$ when the sum of its digits is divisible by $9$.`],
    ],
  },
  "so-nguyen-to": {
    s: R`A prime number is an integer greater than $1$ whose only positive divisors are $1$ and itself. A composite number has other divisors. Every composite number can be written as a product of primes.`,
    w: R`A composite number can always be split into a product of two smaller numbers. Splitting each factor again until nothing more can be split leaves only primes.`,
    p: R`Counting $1$ as a prime, or thinking every odd number is prime. The number $1$ has only one divisor, and $9$ is odd but divisible by $3$.`,
    ex: [
      [R`Is $13$ prime or composite? Write $12$ as a product of primes.`, [
        [R`The number $13$ is prime.`, R`The number $13$ is greater than $1$ and not divisible by $2$, $3$ or $5$, so it has no positive divisor other than $1$ and $13$.`],
        [R`We have $12=2^2\cdot 3$.`, R`Split $12=2\cdot 6$, then $6=2\cdot 3$. The factors $2$ and $3$ are both prime.`],
      ], R`The number $13$ is prime and $12=2^2\cdot 3$.`],
      [R`Write $180$ as a product of prime factors.`, [
        [R`Divide by small primes in turn: $180=2\cdot 90=2\cdot 2\cdot 45$.`, R`Keep dividing by $2$ while possible, then move to the next prime.`],
        [R`Continue: $45=3\cdot 15=3\cdot 3\cdot 5$.`, R`Stop when the remaining quotient is a prime.`],
      ], R`We have $180=2^2\cdot 3^2\cdot 5$.`],
    ],
    dr: [
      [R`Is $15$ a prime number?`, R`No. The number $15$ is composite because $15=3\cdot 5$.`, R`The number $15$ has the divisor $3$, which is neither $1$ nor the number itself, so it is not prime.`],
      [R`Is $2$ a prime number?`, R`Yes. The number $2$ is the only even prime.`, R`The number $2$ is greater than $1$ and its only positive divisors are $1$ and $2$.`],
      [R`Check the factorisation $18=2\cdot 3^2$.`, R`It is correct, because $2\cdot 9=18$.`, R`Every factor is prime. The square of $3$ counts the factor $3$ twice.`],
    ],
  },
  "cong-tru-nguyen": {
    s: R`Adding a negative number means subtracting its absolute value. The product of two numbers with the same sign is positive; with different signs it is negative.`,
    w: R`On the number line, adding a positive number steps right and adding a negative number steps left. And $(-4)\cdot(-3)$ must be $12$ so that the pattern $(-4)\cdot 2=-8$, $(-4)\cdot 1=-4$, $(-4)\cdot 0=0$ keeps rising by $4$ each time.`,
    p: R`Using the sign rule for multiplication when adding. The sum $(-3)+(-5)$ is $-8$, not $8$.`,
    ex: [
      [R`Compute $(-3)+5$ and $(-4)\cdot(-3)$.`, [
        [R`The sum $(-3)+5$ is $2$.`, R`From $-3$, moving $5$ units in the positive direction reaches $2$.`],
        [R`The product $(-4)\cdot(-3)$ is $12$.`, R`Both factors are negative, so the product is positive and equals the product of the absolute values.`],
      ], R`The sum is $2$ and the product is $12$.`],
      [R`The morning temperature is $-5^\circ\mathrm{C}$. By noon it rises by $9^\circ\mathrm{C}$, and in the evening it falls by $7^\circ\mathrm{C}$. What is the evening temperature?`, [
        [R`At noon: $-5+9=4$ degrees.`, R`A rise in temperature means adding a positive number, a step to the right on the number line.`],
        [R`In the evening: $4-7=-3$ degrees.`, R`A fall means subtracting; passing the point $0$ takes you to the negative side.`],
      ], R`The evening temperature is $-3^\circ\mathrm{C}$.`],
    ],
    dr: [
      [R`Compute $7+(-10)$.`, R`The sum is $-3$.`, R`Adding a negative number means subtracting its absolute value from $7$.`],
      [R`Compute $(-6)\cdot 2$.`, R`The product is $-12$.`, R`The factors have different signs, so the product is negative and equals $6\cdot 2$ in size.`],
      [R`Compute $(-8)-(-3)$.`, R`The difference is $-5$.`, R`Subtracting a negative number means adding its absolute value. From $-8$, adding $3$ gives $-5$.`],
    ],
  },
  "tri-tuyet-doi": {
    s: R`The absolute value of an integer is its distance from $0$ on the number line. A number further to the right is larger.`,
    w: R`A distance is never negative, so an absolute value is always greater than or equal to $0$. Of two negative numbers, the one further from $0$ lies further left, so it is smaller.`,
    p: R`Thinking $-7$ is greater than $-2$ because $7$ is greater than $2$. On the number line $-7$ lies left of $-2$, so $-7<-2$.`,
    ex: [
      [R`Find $|-7|$ and compare $-7$ with $-2$.`, [
        [R`The absolute value $|-7|$ is $7$.`, R`The distance from $-7$ to $0$ is $7$ units. An absolute value is never negative.`],
        [R`We have $-7<-2$, because $-7$ lies left of $-2$.`, R`On the number line, the number on the left is smaller than the number on the right.`],
      ], R`The absolute value is $7$ and $-7<-2$.`],
      [R`Put the numbers $-4$, $3$, $-9$, $0$, $|-6|$ in increasing order.`, [
        [R`We have $|-6|=6$.`, R`An absolute value is a distance to $0$, so it is not negative.`],
        [R`A negative number with a larger absolute value is smaller: $-9<-4<0<3<6$.`, R`On the number line, the number further to the left is smaller.`],
      ], R`The increasing order is $-9$, $-4$, $0$, $3$, $|-6|$.`],
    ],
    dr: [
      [R`Find $|4|$ and $|-4|$.`, R`Both absolute values equal $4$.`, R`Opposite numbers are the same distance from $0$, so they have the same absolute value.`],
      [R`Which is larger, $-10$ or $-1$?`, R`The number $-1$ is larger than $-10$.`, R`The number $-1$ lies to the right of $-10$ on the number line. The difference of the absolute values gives the distance between them.`],
      [R`Compute $|-3|+|2|$.`, R`The sum is $5$.`, R`Each absolute value is non-negative. Adding $3$ and $2$ gives $5$.`],
    ],
  },
  "phan-am": {
    s: R`A negative fraction is the opposite of a positive fraction. Adding a negative fraction means subtracting its absolute value.`,
    w: R`Negative fractions follow exactly the rules of negative integers, since both are opposites of positive numbers. Find a common denominator first, then add the numerators using the sign rules.`,
    p: R`Putting a minus sign in both the numerator and the denominator. The fraction $\frac{-1}{-2}$ equals $\frac{1}{2}$, which is positive.`,
    ex: [
      [R`Compute $\left(-\frac{1}{2}\right)+\frac{3}{4}$.`, [
        [R`Use the common denominator $4$: $-\frac{2}{4}+\frac{3}{4}$.`, R`The common denominator of $2$ and $4$ is $4$. The negative fraction keeps its minus sign in the numerator.`],
        [R`The sum is $\frac{1}{4}$.`, R`Adding the numerators $-2+3$ gives $1$. The result is positive because the positive term has the larger absolute value.`],
      ], R`The sum is $\frac{1}{4}$.`],
      [R`Compute $\frac{-2}{3}-\frac{1}{4}$.`, [
        [R`The common denominator is $12$: $\frac{-8}{12}-\frac{3}{12}$.`, R`Bring the fractions to pieces of the same size before subtracting.`],
        [R`Subtract the numerators: $\frac{-8-3}{12}=\frac{-11}{12}$.`, R`Subtracting a positive number from a negative one gives a negative number with a larger absolute value.`],
      ], R`The result is $-\frac{11}{12}$.`],
    ],
    dr: [
      [R`Compute $\frac{2}{5}+\left(-\frac{1}{5}\right)$.`, R`The sum is $\frac{1}{5}$.`, R`With the same denominator, add the numerators. The numerator $2+(-1)$ is $1$.`],
      [R`Compute $\left(-\frac{3}{4}\right)\cdot\frac{2}{3}$.`, R`The product is $-\frac{1}{2}$.`, R`A negative fraction times a positive fraction gives a negative product. It simplifies to one half.`],
      [R`What is the opposite of $-\frac{5}{6}$?`, R`The opposite is $\frac{5}{6}$.`, R`The opposite of a negative number is the positive number with the same absolute value.`],
    ],
  },
  "hon-so": {
    s: R`A mixed number has a whole part and a fraction less than $1$. The mixed number $n\frac{a}{b}$ equals $n+\frac{a}{b}$, with $b\neq 0$.`,
    w: R`Each whole unit can be changed into $b$ pieces with denominator $b$. The mixed number $2\frac{1}{3}$ has $2\cdot 3=6$ thirds, plus $1$ third, that is $\frac{7}{3}$.`,
    p: R`Reading $2\frac{1}{3}$ as $2$ times $\frac{1}{3}$. Between the whole part and the fraction there is an addition.`,
    ex: [
      [R`Write the mixed number $2\frac{1}{3}$ as a fraction.`, [
        [R`The whole part $2$ equals $\frac{6}{3}$.`, R`Change the whole part into a fraction with the same denominator as the fractional part.`],
        [R`Add $\frac{6}{3}+\frac{1}{3}=\frac{7}{3}$.`, R`A mixed number is the sum of its whole part and its fraction. The numerator $6+1$ is $7$.`],
      ], R`The mixed number equals $\frac{7}{3}$.`],
      [R`Compute $1\frac{1}{2}+2\frac{2}{3}$.`, [
        [R`Change to fractions: $\frac{3}{2}+\frac{8}{3}$.`, R`A mixed number is its whole part plus its fraction, so it can be written as one fraction.`],
        [R`Use the common denominator $6$: $\frac{9}{6}+\frac{16}{6}=\frac{25}{6}=4\frac{1}{6}$.`, R`The result is greater than $1$, so rewrite it as a mixed number to make it easier to read.`],
      ], R`The sum is $4\frac{1}{6}$.`],
    ],
    dr: [
      [R`Write $1\frac{1}{4}$ as a fraction.`, R`The fraction is $\frac{5}{4}$.`, R`One unit is four quarters. One more quarter makes five quarters.`],
      [R`Written as a mixed number, what whole part does $\frac{11}{4}$ have?`, R`The whole part is $2$, because $\frac{11}{4}=2\frac{3}{4}$.`, R`Divide the numerator by the denominator. The whole quotient is the whole part, and the remainder is the numerator of the fraction.`],
      [R`Compute $3\frac{1}{2}+1\frac{1}{2}$.`, R`The sum is $5$.`, R`Add the whole parts together and the fractions together. A half plus a half makes one whole.`],
    ],
  },
  "cong-tru-phan-so-6": {
    s: R`To add two fractions with different denominators, bring them to a common denominator, add the numerators and keep the denominator. Subtracting a fraction means adding its opposite. Simplify the result to lowest terms.`,
    w: R`The denominator tells how many equal pieces a unit is cut into. Adding the numbers of pieces only makes sense when the pieces are the same size, that is, with the same denominator.`,
    p: R`Choosing a common denominator that is too large and forgetting to simplify. For denominators $6$ and $4$, the least common denominator is $12$; there is no need for $24$.`,
    ex: [
      [R`Compute $\frac{2}{3}+\frac{1}{4}$ and $\frac{1}{6}-\frac{1}{2}$.`, [
        [R`Common denominator $12$: $\frac{2}{3}+\frac{1}{4}=\frac{8}{12}+\frac{3}{12}=\frac{11}{12}$.`, R`The least common multiple of $3$ and $4$ is $12$, used as the common denominator.`],
        [R`Common denominator $6$: $\frac{1}{6}-\frac{1}{2}=\frac{1}{6}-\frac{3}{6}=-\frac{2}{6}=-\frac{1}{3}$.`, R`The numerator $1-3$ is negative, so the difference is a negative fraction, then simplify by $2$.`],
      ], R`The sum is $\frac{11}{12}$ and the difference is $-\frac{1}{3}$.`],
      [R`A tank is $\frac{3}{4}$ full of water. Water equal to $\frac{1}{3}$ of the tank is used. What fraction of the tank is left?`, [
        [R`The calculation is $\frac{3}{4}-\frac{1}{3}$.`, R`What is left equals what there was minus what was used.`],
        [R`Common denominator $12$: $\frac{9}{12}-\frac{4}{12}=\frac{5}{12}$.`, R`Both fractions refer to parts of the same tank, so they can be subtracted after finding a common denominator.`],
      ], R`The tank has $\frac{5}{12}$ of its volume of water left.`],
    ],
    dr: [
      [R`Compute $\frac{3}{8}+\frac{1}{8}$.`, R`The sum is $\frac{1}{2}$.`, R`With the same denominator $8$, adding the numerators gives $\frac{4}{8}$, which simplifies to $\frac{1}{2}$.`],
      [R`Compute $\frac{5}{6}-\frac{1}{4}$.`, R`The difference is $\frac{7}{12}$.`, R`Common denominator $12$: $\frac{10}{12}-\frac{3}{12}=\frac{7}{12}$.`],
      [R`Compute $-\frac{1}{3}+\frac{1}{2}$.`, R`The sum is $\frac{1}{6}$.`, R`Common denominator $6$: $-\frac{2}{6}+\frac{3}{6}=\frac{1}{6}$.`],
    ],
  },
  "nhan-chia-phan-so-6": {
    s: R`To multiply two fractions, multiply numerator by numerator and denominator by denominator. Dividing by a fraction other than $0$ means multiplying by its reciprocal. To find $\frac{m}{n}$ of a number, multiply the number by $\frac{m}{n}$.`,
    w: R`Multiplying by $\frac{1}{n}$ means cutting into $n$ equal parts and taking one. Division undoes multiplication, so dividing by $\frac{a}{b}$ means multiplying by $\frac{b}{a}$, since these two numbers have product $1$.`,
    p: R`Flipping both fractions when dividing. Only flip the fraction after the division sign.`,
    ex: [
      [R`Compute $\frac{2}{3}\cdot\frac{9}{4}$ and find $\frac{3}{4}$ of $20$.`, [
        [R`Multiply: $\frac{2}{3}\cdot\frac{9}{4}=\frac{18}{12}=\frac{3}{2}$.`, R`Numerator times numerator, denominator times denominator, then simplify by $6$.`],
        [R`Three quarters of $20$ is $20\cdot\frac{3}{4}=15$.`, R`Cut $20$ into $4$ equal parts of $5$ each, then take $3$ parts.`],
      ], R`The product is $\frac{3}{2}$, and $\frac{3}{4}$ of $20$ is $15$.`],
      [R`A piece of cloth $\frac{15}{4}$ m long is cut into pieces $\frac{3}{8}$ m long. How many pieces are there?`, [
        [R`The number of pieces is $\frac{15}{4}:\frac{3}{8}$.`, R`Asking how many equal lengths fit into a length is a division.`],
        [R`Multiply by the reciprocal: $\frac{15}{4}\cdot\frac{8}{3}=\frac{120}{12}=10$.`, R`Dividing by a fraction means multiplying by that fraction turned upside down.`],
      ], R`There are $10$ pieces of cloth.`],
    ],
    dr: [
      [R`Compute $\frac{3}{5}:\frac{9}{10}$.`, R`The quotient is $\frac{2}{3}$.`, R`Multiply by the reciprocal: $\frac{3}{5}\cdot\frac{10}{9}=\frac{30}{45}=\frac{2}{3}$.`],
      [R`Compute $-\frac{1}{2}\cdot\frac{4}{7}$.`, R`The product is $-\frac{2}{7}$.`, R`The factors have different signs, so the product is negative, and $\frac{4}{14}$ simplifies to $\frac{2}{7}$.`],
      [R`A class has $40$ students, and $\frac{2}{5}$ of them join a club. How many join?`, R`There are $16$ students who join.`, R`Multiply $40$ by $\frac{2}{5}$: $40$ divided by $5$ is $8$, then multiply by $2$.`],
    ],
  },
  "thap-phan-am": {
    s: R`Negative decimals lie to the left of $0$ on the number line. Adding a negative decimal means moving towards the negative side by its absolute value.`,
    w: R`A negative decimal is a negative fraction written another way, so all the sign rules still hold. On the number line, adding $2.5$ to $-1.5$ is a step of $2.5$ units to the right, ending at $1$.`,
    p: R`Comparing $-1.5$ with $-1.2$ as if they were positive. Since $1.5>1.2$, we get $-1.5<-1.2$.`,
    ex: [
      [R`Compute $-1.5+2.5$.`, [
        [R`Write $-1.5=-\frac{3}{2}$ and $2.5=\frac{5}{2}$.`, R`One decimal place means a fraction with denominator $2$ or $10$ after simplifying.`],
        [R`The sum is $\frac{2}{2}=1$.`, R`With the same denominator, add the numerators $-3+5$. The result is the whole number $1$.`],
      ], R`The sum is $1$.`],
      [R`Compute $-2.4-1.6+3.5$.`, [
        [R`Combine the two negative parts first: $-2.4-1.6=-4$.`, R`Subtracting another positive number from a negative one moves further to the negative side.`],
        [R`Then add: $-4+3.5=-0.5$.`, R`For numbers with opposite signs, take the difference of the absolute values, with the sign of the one with the larger absolute value.`],
      ], R`The result is $-0.5$.`],
    ],
    dr: [
      [R`Compute $-2.5+1$.`, R`The sum is $-1.5$.`, R`From $-2.5$, moving one unit in the positive direction reaches $-1.5$.`],
      [R`Which is larger, $-0.4$ or $-0.7$?`, R`The number $-0.4$ is larger.`, R`On the number line, $-0.4$ lies to the right of $-0.7$. A positive difference confirms the comparison.`],
      [R`Compute $|-1.5|$.`, R`The absolute value is $1.5$.`, R`The absolute value of a negative decimal is the opposite positive decimal.`],
    ],
  },
  "uoc-luong": {
    s: R`Estimate a calculation by rounding each number to the place being used, then computing with the rounded numbers. The estimate is close to the exact result and is used to check the calculation.`,
    w: R`Rounding only changes each number by a small amount, so a calculation with rounded numbers stays close to the exact result. If the two results are very far apart, the original calculation has an error.`,
    p: R`Treating the estimate as the answer. Estimating $48+37$ gives $90$, while the exact sum is $85$.`,
    ex: [
      [R`Estimate $48+37$ by rounding to the nearest ten.`, [
        [R`Round $48$ to $50$ and $37$ to $40$.`, R`A units digit of $5$ or more increases the tens. Both numbers round up.`],
        [R`The estimate is $50+40=90$.`, R`Add the two rounded numbers. The exact sum $48+37=85$ is close to $90$.`],
      ], R`The estimate is $90$.`],
      [R`Buy $3$ items costing $19\,800$ dong, $31\,200$ dong and $48\,900$ dong. Estimate the total to the nearest thousand.`, [
        [R`Round each price to the nearest thousand: $20\,000$, $31\,000$ and $49\,000$.`, R`Rounding first makes the addition quick to do mentally.`],
        [R`The estimated total is $100\,000$ dong; the exact total is $99\,900$ dong.`, R`The estimate is close to the exact result, so it can be used to check the calculation.`],
      ], R`The total is about $100\,000$ dong.`],
    ],
    dr: [
      [R`Round $46$ and $23$ to the nearest ten, then estimate their sum.`, R`The estimate is $50+20=70$.`, R`The number $46$ rounds to $50$ and $23$ rounds to $20$. Add the two round numbers.`],
      [R`What is the exact sum of $48$ and $37$?`, R`The exact sum is $85$.`, R`The estimate $90$ is only for checking. The exact sum is computed from the original numbers.`],
      [R`Estimate $62-18$ to the nearest ten.`, R`The estimate is $60-20=40$.`, R`Round each number before subtracting. The difference of the two round numbers is the estimate.`],
    ],
  },
  "ti-so-phan-tram": {
    s: R`The percentage of $a$ relative to $b$, with $b\neq 0$, is $\frac{a}{b}\cdot 100\%$. It tells what percent of $b$ the number $a$ is.`,
    w: R`The ratio $\frac{15}{60}$ equals $\frac{25}{100}$. Writing every ratio over $100$ puts them all on the same scale, so they can be compared at once.`,
    p: R`Dividing the numbers the wrong way round. To find what percent of $b$ the number $a$ is, divide $a$ by $b$; the number after "of" goes in the denominator.`,
    ex: [
      [R`A class of $60$ students has $15$ prize winners. What percentage won a prize?`, [
        [R`The ratio is $\frac{15}{60}=\frac{1}{4}$.`, R`The numerator counts prize winners and the denominator counts the whole class.`],
        [R`As a percentage, $\frac{1}{4}\cdot 100\%=25\%$.`, R`Multiply the ratio by $100$ to turn it into a percentage.`],
      ], R`The percentage is $25\%$.`],
      [R`A shirt priced at $250\,000$ dong is reduced by $50\,000$ dong. What percentage of the original price is the reduction?`, [
        [R`The ratio of the reduction to the original price is $\frac{50\,000}{250\,000}=\frac{1}{5}$.`, R`The number after "of" is the original price, so it goes in the denominator.`],
        [R`As a percentage: $\frac{1}{5}\cdot 100\%=20\%$.`, R`Multiply the ratio by one hundred percent to turn it into a percentage.`],
      ], R`The shirt is reduced by $20\%$.`],
    ],
    dr: [
      [R`Write the ratio $\frac{3}{5}$ as a percentage.`, R`The ratio is $60\%$.`, R`Multiply the fraction by $100$. Three fifths is sixty percent.`],
      [R`Compare $60\%$ and $50\%$. What is the difference in percentage points?`, R`The difference is $10$ percentage points, so $60\%$ is larger.`, R`Once two ratios are written as percentages, subtract the percentages.`],
      [R`Out of $40$ students, $8$ choose subject A. What is the percentage?`, R`The percentage is $20\%$.`, R`Dividing $8$ by $40$ gives $\frac{1}{5}$, then multiply by $100$.`],
    ],
  },
  "so-sanh-ti-so": {
    s: R`To compare two ratios, turn both into percentages and compare the two percentages. The ratio with the larger percentage is larger.`,
    w: R`Two fractions with different denominators are hard to compare directly. Turning them into percentages brings both to the denominator $100$, so only the numerators need comparing.`,
    p: R`Comparing numerators or denominators on their own when the denominators differ. The fraction $\frac{3}{5}$ is $60\%$, larger than $\frac{1}{2}$, which is $50\%$, even though $5$ is larger than $2$.`,
    ex: [
      [R`Compare $\frac{3}{5}$ and $\frac{1}{2}$ using percentages.`, [
        [R`We have $\frac{3}{5}=60\%$ and $\frac{1}{2}=50\%$.`, R`Multiplying each ratio by $100$ gives a percentage.`],
        [R`Since $60>50$, the ratio $\frac{3}{5}$ is larger.`, R`In the same unit of percent, the larger number belongs to the larger ratio.`],
      ], R`The ratio $\frac{3}{5}$ is larger than the ratio $\frac{1}{2}$.`],
      [R`In class A, $18$ out of $30$ students earn top grades; in class B, $14$ out of $20$. Which class has the higher rate?`, [
        [R`Class A: $\frac{18}{30}=60\%$. Class B: $\frac{14}{20}=70\%$.`, R`Turn both into percentages so the two ratios share the denominator one hundred.`],
        [R`Since $70\%>60\%$, class B has the higher rate.`, R`Class A has more top students but also more students in total, so compare rates rather than counts.`],
      ], R`Class B has the higher rate of top students.`],
    ],
    dr: [
      [R`What percentage is the ratio $\frac{1}{4}$?`, R`It is $25\%$.`, R`One quarter of $100$ is $25$.`],
      [R`Of the two ratios $\frac{4}{5}$ and $\frac{3}{4}$, which is larger?`, R`The ratio $\frac{4}{5}$ is larger, because $80\%>75\%$.`, R`Turn both ratios into percentages. The difference of $5$ percentage points shows which is larger.`],
      [R`If $25\%$ of a number is $10$, what is the whole number?`, R`The whole number is $40$.`, R`Knowing one part, divide by its percentage to find the whole.`],
    ],
  },
  "so-do-goc": {
    s: R`An angle has a vertex and two sides. Angles are measured in degrees. Two adjacent angles share a vertex and one side, and the combined angle measures the sum of the two.`,
    w: R`Two adjacent angles fit together into a larger angle without overlapping, like two segments placed end to end. So the combined angle measures the sum of the two measures.`,
    p: R`Adding the measures of two angles that overlap. They can only be added when the angles are adjacent and lie on opposite sides of the shared side.`,
    ex: [
      [R`Two adjacent angles measure $50^\circ$ and $70^\circ$. How many degrees is the combined angle?`, [
        [R`Add the two given measures.`, R`The combined angle is made of exactly the two adjacent angles, without counting the shared side twice.`],
        [R`The sum is $120^\circ$.`, R`The addition $50+70$ gives the measure of the larger angle.`],
      ], R`The combined angle is $120^\circ$.`],
      [R`The ray $Oy$ lies between the rays $Ox$ and $Oz$, with $\widehat{xOy}=35^\circ$ and $\widehat{xOz}=110^\circ$. Find $\widehat{yOz}$.`, [
        [R`Since $Oy$ lies between them, $\widehat{xOy}+\widehat{yOz}=\widehat{xOz}$.`, R`Two adjacent angles fit together into the larger angle without overlapping.`],
        [R`Therefore $\widehat{yOz}=110^\circ-35^\circ=75^\circ$.`, R`To find one part when the whole and the other part are known, subtract.`],
      ], R`The angle $\widehat{yOz}=75^\circ$.`],
    ],
    dr: [
      [R`Two angles are supplementary and adjacent. One is $35^\circ$. How many degrees is the other?`, R`The other angle is $145^\circ$.`, R`Adjacent supplementary angles add up to $180^\circ$. The other angle is $180^\circ$ minus the known one.`],
      [R`An angle of $90^\circ$ is split into an angle of $40^\circ$ and a remaining angle. How many degrees is the remaining angle?`, R`The remaining angle is $50^\circ$.`, R`The two parts add up to the original angle. Subtract the $40^\circ$ angle from the right angle.`],
      [R`Three adjacent angles of $20^\circ$, $30^\circ$ and $40^\circ$ are combined. How many degrees is the result?`, R`The combined angle is $90^\circ$.`, R`Add the three measures in turn. The sum is exactly a right angle.`],
    ],
  },
  "hinh-deu": {
    s: R`A regular shape has equal sides and equal angles. A line of symmetry splits the shape into two halves that match when folded. A square has $4$ lines of symmetry. An equilateral triangle has $3$ lines of symmetry.`,
    w: R`Folding a shape along a line of symmetry makes the two halves fit exactly. A square folds along the two lines joining midpoints of opposite sides and along the two diagonals, so it has $4$ lines.`,
    p: R`Thinking a diagonal of a rectangle is a line of symmetry. Folding a rectangle along a diagonal, the two halves do not match.`,
    ex: [
      [R`A square with side $5$ has what perimeter, and how many lines of symmetry?`, [
        [R`The perimeter is $4\cdot 5=20$.`, R`The shape is regular, so the four sides are equal. The perimeter is the sum of the four sides.`],
        [R`A square has $4$ lines of symmetry.`, R`Two lines pass through midpoints of opposite sides, and two lie along the diagonals.`],
      ], R`The perimeter is $20$ and there are $4$ lines of symmetry.`],
      [R`A regular hexagon has side $4$ cm. Find its perimeter and say how many lines of symmetry it has.`, [
        [R`A regular hexagon has $6$ equal sides, so its perimeter is $6\cdot 4=24$ cm.`, R`A regular shape has all sides equal, so the perimeter is the number of sides times the length of one side.`],
        [R`There are $3$ lines through pairs of opposite vertices and $3$ lines through midpoints of pairs of opposite sides.`, R`A regular polygon with $n$ sides has exactly $n$ lines of symmetry.`],
      ], R`The perimeter is $24$ cm and the regular hexagon has $6$ lines of symmetry.`],
    ],
    dr: [
      [R`What is the perimeter of an equilateral triangle with side $6$?`, R`The perimeter is $18$.`, R`The three sides of an equilateral triangle are equal. Multiply the length of one side by $3$.`],
      [R`A regular shape has $6$ sides, each of length $4$. What is its perimeter?`, R`The perimeter is $24$.`, R`A regular shape has all sides equal. The perimeter is the number of sides times the length of one side.`],
      [R`A square has $4$ lines of symmetry and an equilateral triangle has $3$. What is the difference?`, R`The difference is $1$ line.`, R`Subtract the number of lines of the equilateral triangle from that of the square.`],
    ],
  },
  "diem-duong": {
    s: R`A point has no size. Through two distinct points there is exactly one line. A ray has one endpoint and goes on in one direction. A segment has two endpoints.`,
    w: R`Each pair of points gives exactly one segment. Three points $A$, $B$, $C$ form three pairs, $AB$, $BC$ and $CA$, so there are three segments.`,
    p: R`Mixing up lines, rays and segments. A line goes on forever in both directions, a ray is cut off at one end, and a segment is cut off at both ends.`,
    ex: [
      [R`How many segments do three non-collinear points determine?`, [
        [R`Each pair of points gives one segment.`, R`Two distinct points determine exactly one segment joining them.`],
        [R`Three points give $3$ segments.`, R`The number of pairs chosen from three points is $3$. These three segments are the sides of a triangle.`],
      ], R`Three points determine $3$ segments.`],
      [R`There are $5$ points, no three of them collinear. How many lines can be drawn through two of the points?`, [
        [R`Each point can be joined to the $4$ other points, giving $5\cdot 4=20$ joins in total.`, R`Counting point by point, each line is counted twice, once from each end.`],
        [R`Halve it: $20:2=10$ lines.`, R`Through two distinct points there is exactly one line.`],
      ], R`There are $10$ lines.`],
    ],
    dr: [
      [R`How many segments do four points, no three collinear, determine?`, R`There are $6$ segments.`, R`Each pair of points gives one segment. The number of pairs chosen from four points is $6$.`],
      [R`The segment $AB$ is $9$ centimetres long, the point $M$ lies between the endpoints, and $AM=4$ centimetres. How long is $MB$?`, R`The segment $MB$ is $5$ centimetres long.`, R`When a point lies between the endpoints, the whole segment is the sum of the two smaller segments.`],
      [R`A ray has one endpoint. How many endpoints do two rays with different endpoints have altogether?`, R`They have $2$ endpoints.`, R`Each ray has exactly one endpoint. Two rays with different endpoints have two endpoints.`],
    ],
  },
  "thu-thap": {
    s: R`Assumed data. Collecting data means recording every value observed. The sample size is the number of values recorded. The counts add up to the sample size.`,
    w: R`Each observation is recorded exactly once, under exactly one value. So adding the counts of all values counts all the observations again.`,
    p: R`Recording one observation under two values, or missing one out. Check by adding the counts and comparing with the sample size.`,
    ex: [
      [R`Assumed data. A group records value A $4$ times, value B $3$ times and value C $3$ times. What is the sample size?`, [
        [R`Add the recorded counts: $4+3+3$.`, R`Each observation is counted once, and no group is left out.`],
        [R`The sample size is $10$.`, R`The total of the counts is the number of values in the sample.`],
      ], R`The sample size is $10$.`],
      [R`Ask $30$ students about their favourite sport: $12$ choose football, $8$ choose badminton, and the rest choose swimming. How many choose swimming?`, [
        [R`The sample size is $30$, and each student chooses exactly one sport.`, R`The counts of all the choices must add up to the sample size.`],
        [R`The number choosing swimming is $30-12-8=10$.`, R`The rest equals the whole sample minus the known parts.`],
      ], R`There are $10$ students who choose swimming.`],
    ],
    dr: [
      [R`Assumed data. Three groups are counted $2$, $5$ and $1$ times. What is the sample size?`, R`The sample size is $8$.`, R`Add all three counts. The result is the number of observations collected.`],
      [R`Assumed data. A sample has $12$ values, and $7$ values of type one have been recorded. How many values of other types remain?`, R`There are $5$ values left.`, R`The rest is the sample size minus the number counted for type one.`],
      [R`Assumed data. Two people count the same sample and both get $9$. What is the difference between their counts?`, R`The difference is $0$; the two counts agree.`, R`Two collections of the same sample giving the same number have a difference of zero.`],
    ],
  },
  "bieu-dien-6": {
    s: R`Assumed data. A bar chart uses height to show counts. The tallest bar is the most frequent value. The bar heights add up to the sample size when each unit is one observation.`,
    w: R`A bar chart turns each count into a height on one common scale. Comparing data becomes comparing heights by eye.`,
    p: R`Drawing the vertical axis without starting at $0$. Then the differences between bars look bigger than they really are.`,
    ex: [
      [R`Assumed data. Three bars have heights $2$, $6$ and $4$. Which value is the most frequent, and what is the sample size?`, [
        [R`The tallest bar is the bar of height $6$.`, R`Compare the three heights. The number $6$ is greater than $2$ and $4$.`],
        [R`The sample size is $2+6+4=12$.`, R`Add the counts shown. Do not leave out any bar.`],
      ], R`The value with the bar of height $6$ is the most frequent. The sample size is $12$.`],
      [R`Assumed data. A bar chart shows the books read by four groups: $6$, $9$, $4$, $11$. Which group read the most, and how many books in total?`, [
        [R`The tallest bar corresponds to $11$, the fourth group.`, R`On a bar chart, the height of a bar is the data value.`],
        [R`In total $6+9+4+11=30$ books.`, R`Add the heights of all bars to get the total.`],
      ], R`The fourth group read the most, and the class read $30$ books in total.`],
    ],
    dr: [
      [R`Assumed data. How many units taller is the bar of height $8$ than the bar of height $3$?`, R`It is $5$ units taller.`, R`The difference of the two heights is the gap shown on the chart.`],
      [R`Assumed data. Three bars have heights $1$, $1$ and $5$. Is there a single tallest bar?`, R`Yes. The bar of height $5$ is the single tallest bar.`, R`Two bars both have height $1$, and the remaining one is taller, so it is the single tallest.`],
      [R`Assumed data. What is the total of bars of heights $3$, $3$ and $4$?`, R`The total is $10$.`, R`Add the numbers read from the chart. Both bars of equal height are added.`],
    ],
  },
  "xs-thuc-nghiem": {
    s: R`Assumed data. The experimental probability of an event is the number of times it happens divided by the number of trials. This number changes while the sample is small, and is used as an estimate.`,
    w: R`Experimental probability is the frequency observed in one particular set of trials. The more trials, the more this frequency settles around one value.`,
    p: R`Treating the result of $20$ coin tosses as the true probability for the coin. Another set of trials might give $11$ heads instead of $9$.`,
    ex: [
      [R`Assumed data. A coin is tossed $20$ times and lands heads $9$ times. What is the experimental probability of heads?`, [
        [R`The number of favourable results is $9$, and the number of trials is $20$.`, R`The numerator of the estimate is how often the event was observed. The denominator is the size of the experiment.`],
        [R`The experimental probability is $\frac{9}{20}$.`, R`Divide the favourable count by the number of trials. It cannot be simplified further.`],
      ], R`The experimental probability is $\frac{9}{20}$.`],
      [R`Assumed data. A ball is drawn from a box and put back, $50$ times, and a red ball comes up $18$ times. Find the experimental probability of red.`, [
        [R`The experimental probability is the number of red draws divided by the number of trials: $\frac{18}{50}$.`, R`This is the proportion observed in this particular set of trials.`],
        [R`It simplifies to $\frac{9}{25}=0.36$.`, R`Writing it as a decimal makes it easy to compare with other sets of trials.`],
      ], R`The experimental probability of red is $0.36$.`],
    ],
    dr: [
      [R`Assumed data. In $10$ trials, the event happens $3$ times. What is the experimental probability?`, R`It is $\frac{3}{10}$.`, R`Divide the number of times it happens by the number of trials.`],
      [R`Assumed data. In $20$ trials heads came up $9$ times. How many times were tails, if each toss shows exactly one face?`, R`Tails came up $11$ times.`, R`Each trial shows exactly one face. The rest are tails.`],
      [R`Assumed data. In $5$ trials all $5$ were favourable. What is the experimental probability?`, R`It is $1$.`, R`When every trial is favourable the estimate is one. A larger sample might give a different number.`],
    ],
  },
};
