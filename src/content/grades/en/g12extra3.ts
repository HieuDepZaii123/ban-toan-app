/** Bản tiếng Anh của lớp 12 chi tiết: thống kê và xác suất nâng cao (lop12extra3.ts). */
import type { LessonEn } from "./types.ts";

const R = String.raw;

export const g12Extra3En: Record<string, LessonEn> = {
  "trung-vi-nhom": {
    s: R`The second quartile $Q_2$ is the median of grouped data. Let $n$ be the sample size; the group containing the position $\frac{n}{2}$ is the first group whose cumulative frequency is not less than $\frac{n}{2}$. Then $Q_2=a+\frac{\frac{n}{2}-N}{n_i}h$, where $a$ is the left end of that group, $N$ the cumulative frequency before it, $n_i$ its frequency and $h$ its width.`,
    w: R`The median splits the sample into two halves of equal size. Interpolating inside the group that contains the position $\frac{n}{2}$ treats the values in the group as evenly spread, so the extra distance to go is the fraction $\frac{\frac{n}{2}-N}{n_i}$ of the group width.`,
    p: R`Choosing the group by the largest frequency instead of the cumulative frequency, or using the sample size $n$ instead of $\frac{n}{2}$ in the numerator. The right group is the first one whose cumulative frequency reaches the mark.`,
    ex: [
      [R`Four groups $[0;10)$, $[10;20)$, $[20;30)$, $[30;40)$ have frequencies $3;\ 5;\ 8;\ 4$. Find $Q_2$.`, [
        [R`The sample size is $n=20$, so the position is $\frac{n}{2}=10$.`, R`The frequencies add up to $3+5+8+4=20$.`],
        [R`The cumulative frequencies are $3;\ 8;\ 16;\ 20$, so the first group whose cumulative frequency is not less than $10$ is $[20;30)$.`, R`The group $[10;20)$ only accumulates $8<10$, so it does not reach that position yet.`],
        [R`We get $Q_2=20+\frac{10-8}{8}\cdot10=\frac{45}{2}$.`, R`Substitute $a=20$, $N=8$, $n_i=8$ and $h=10$ into the formula.`],
      ], R`The median of the sample is $\frac{45}{2}$.`],
      [R`Three groups $[0;5)$, $[5;10)$, $[10;15)$ have frequencies $5;\ 10;\ 5$. Find $Q_2$.`, [
        [R`The sample size is $n=20$, so the position is $10$, and the cumulative frequencies are $5;\ 15;\ 20$.`, R`The first group with cumulative frequency at least $10$ is $[5;10)$.`],
        [R`We get $Q_2=5+\frac{10-5}{10}\cdot5=\frac{15}{2}$.`, R`Substitute $a=5$, $N=5$, $n_i=10$ and $h=5$ into the formula.`],
      ], R`The median of the sample is $\frac{15}{2}$.`],
    ],
    dr: [
      [R`Three groups $[0;10)$, $[10;20)$, $[20;30)$ have frequencies $2;\ 6;\ 2$. Find $Q_2$.`, R`The median is $15$.`, R`The position is $5$, the group containing it is $[10;20)$ and $Q_2=10+\frac{5-2}{6}\cdot10=15$.`],
      [R`Three groups $[0;5)$, $[5;10)$, $[10;15)$ have frequencies $4;\ 4;\ 12$. What is the cumulative frequency before the group containing the median?`, R`It is $8$.`, R`The position $10$ is greater than $8$, so the group containing the median is $[10;15)$ and the cumulative frequency before it is $4+4=8$.`],
      [R`Three groups $[0;5)$, $[5;10)$, $[10;15)$ have frequencies $4;\ 4;\ 12$. Find $Q_2$.`, R`The median is $\frac{65}{6}$.`, R`We have $Q_2=10+\frac{10-8}{12}\cdot5=10+\frac{5}{6}=\frac{65}{6}$.`],
    ],
  },
  "phuong-sai-ngan": {
    s: R`The variance of grouped data can also be computed as $s^2=\frac{1}{n}\sum n_ic_i^2-\bar x^2$, that is, the mean of the squares minus the square of the mean. This needs only one computation of $\bar x$ and one of the mean of the squares.`,
    w: R`Expand $(c_i-\bar x)^2=c_i^2-2c_i\bar x+\bar x^2$ and take the mean; the middle terms combine into $-2\bar x^2$, leaving the mean of the squares minus the square of the mean.`,
    p: R`Squaring the mean of the squares, or forgetting to subtract $\bar x^2$. The mean of the squares is never smaller than the square of the mean, so a negative result signals a mistake.`,
    ex: [
      [R`Three groups have representative values $5;\ 15;\ 25$ and frequencies $2;\ 3;\ 5$. Find the variance with the short formula.`, [
        [R`The mean is $\bar x=18$ and the sample size is $n=10$.`, R`Compute $\frac{2\cdot5+3\cdot15+5\cdot25}{10}=\frac{150}{10}$, so $\bar x=18$.`],
        [R`The mean of the squares is $\frac{2\cdot25+3\cdot225+5\cdot625}{10}=385$.`, R`Square each representative value and multiply by its frequency.`],
        [R`The variance is $385-18^2=61$.`, R`Take the mean of the squares minus the square of the mean.`],
      ], R`The variance is $61$, the same as from the definition.`],
      [R`Three groups have representative values $1;\ 3;\ 5$ and frequencies $1;\ 2;\ 1$. Find the variance.`, [
        [R`The sample size is $n=4$ and $\bar x=\frac{1+6+5}{4}=3$.`, R`Add the products $n_ic_i$ and divide by $n$.`],
        [R`The mean of the squares is $\frac{1+18+25}{4}=11$, so $s^2=11-9=2$.`, R`The square of the mean is $3^2=9$.`],
      ], R`The variance is $2$.`],
    ],
    dr: [
      [R`A sample has two representative values $2;\ 4$ with frequencies $1;\ 1$. Find the variance with the short formula.`, R`The variance is $1$.`, R`The mean is $3$ and the mean of the squares is $\frac{4+16}{2}=10$, so $s^2=10-9=1$.`],
      [R`Representative values $10;\ 20;\ 30$ have frequencies $1;\ 2;\ 1$. Find the variance.`, R`The variance is $50$.`, R`The mean is $20$ and the mean of the squares is $\frac{100+800+900}{4}=450$, so $s^2=450-400=50$.`],
      [R`Representative values $0;\ 10$ have frequencies $3;\ 1$. Find the variance.`, R`The variance is $\frac{75}{4}$.`, R`The mean is $\frac{5}{2}$ and the mean of the squares is $\frac{100}{4}=25$, so $s^2=25-\frac{25}{4}=\frac{75}{4}$.`],
    ],
  },
  "so-sanh-hai-mau": {
    s: R`When two samples have the same unit and equal means, the one with the larger standard deviation has values spread further from the mean. The interquartile range can also be used for this and is less affected by values at the two ends.`,
    w: R`The standard deviation measures the typical distance from a value to the mean and has the same unit as the data. When two means are equal, the sample with the larger standard deviation has its values further from the mean.`,
    p: R`Comparing the variances of two samples in different units, or concluding from the means alone. Two samples with the same mean can be spread very differently.`,
    ex: [
      [R`Sample $A$ has representative values $5;\ 15;\ 25$ with frequencies $1;\ 8;\ 1$. Sample $B$ has the same representative values with frequencies $4;\ 2;\ 4$. Which sample is more spread out?`, [
        [R`Both samples have size $10$ and mean $15$.`, R`Both are symmetric about the representative value $15$, so the mean is $15$.`],
        [R`The variance of $A$ is $\frac{100+0+100}{10}=20$ and that of $B$ is $\frac{400+0+400}{10}=80$.`, R`The square of the deviation $\pm10$ is $100$, multiplied by the frequency of each group.`],
      ], R`Sample $B$ is more spread out because its variance $80$ is larger than $20$.`],
      [R`Class $X$ has representative values $5;\ 7;\ 9$ and class $Y$ has $3;\ 7;\ 11$, both with frequencies $1;\ 2;\ 1$. Which class is more spread out, and how many times larger is its standard deviation?`, [
        [R`Both classes have mean $7$, the variance of $X$ is $\frac{4+0+4}{4}=2$ and that of $Y$ is $\frac{16+0+16}{4}=8$.`, R`The deviations of $Y$ are twice those of $X$, so their squares are four times as large.`],
        [R`The standard deviations are $\sqrt{2}$ and $\sqrt{8}=2\sqrt{2}$, so the ratio is $2$.`, R`Take the square root of each variance.`],
      ], R`Class $Y$ is more spread out and its standard deviation is $2$ times larger.`],
    ],
    dr: [
      [R`What is the variance of the sample with representative values $5;\ 15;\ 25$ and frequencies $1;\ 8;\ 1$?`, R`The variance is $20$.`, R`The mean is $15$ and the deviations of the two outer groups are both $10$, so $s^2=\frac{100+100}{10}=20$.`],
      [R`Sample $A$ has variance $20$ and sample $B$ has variance $80$, in the same unit. How many times larger is the variance of $B$ than that of $A$?`, R`It is $4$ times larger.`, R`We have $\frac{80}{20}=4$.`],
      [R`Class $X$ has variance $2$ and class $Y$ has variance $8$, in the same unit. How many times larger is the standard deviation of $Y$ than that of $X$?`, R`It is $2$ times larger.`, R`We have $\frac{\sqrt{8}}{\sqrt{2}}=\sqrt{4}=2$.`],
    ],
  },
  "bien-doi-mau": {
    s: R`If the same number $a$ is added to every value, the mean increases by $a$ and the variance does not change. If every value is multiplied by $k$, the mean is multiplied by $k$, the variance by $k^2$ and the standard deviation by $|k|$.`,
    w: R`Adding $a$ shifts both the values and the mean by the same amount, so the deviations do not change. Multiplying by $k$ multiplies every deviation by $k$, so the squares are multiplied by $k^2$.`,
    p: R`Multiplying the variance by $k$ instead of $k^2$, or thinking that adding a number increases the variance. The variance only measures spread, so it does not change when the whole sample is shifted.`,
    ex: [
      [R`A sample has mean $18$ and variance $61$. Add $2$ to every value. What are the new mean and variance?`, [
        [R`The new mean is $18+2=20$.`, R`Every value increases by $2$, so the mean increases by $2$ as well.`],
        [R`The deviation of each value from the mean is unchanged, so the variance is still $61$.`, R`The difference between a new value and the new mean equals the difference between the old value and the old mean.`],
      ], R`The mean is $20$ and the variance is still $61$.`],
      [R`A sample has mean $18$ and variance $61$. Multiply every value by $3$. What are the new mean and variance?`, [
        [R`The new mean is $18\cdot3=54$.`, R`Multiplying every value by $3$ multiplies the mean by $3$ too.`],
        [R`Each deviation is multiplied by $3$, so its square is multiplied by $9$, and the new variance is $61\cdot9=549$.`, R`The variance is the mean of the squared deviations.`],
      ], R`The mean is $54$ and the variance is $549$.`],
    ],
    dr: [
      [R`A sample has mean $10$ and variance $4$. Add $5$ to every value. What is the new mean?`, R`The mean is $15$.`, R`The mean increases by exactly the number added to every value.`],
      [R`A sample has variance $4$. Multiply every value by $2$. What is the new variance?`, R`The variance is $16$.`, R`The variance is multiplied by $k^2=4$, so it is $4\cdot4=16$.`],
      [R`A sample has standard deviation $3$. Multiply every value by $\frac{1}{3}$. What is the new standard deviation?`, R`The standard deviation is $1$.`, R`The standard deviation is multiplied by $|k|=\frac{1}{3}$, so it is $3\cdot\frac{1}{3}=1$.`],
    ],
  },
  "cay-xac-suat": {
    s: R`When two items are drawn in a row without replacement, the probability of the second draw depends on the first result. On a tree diagram, the probability of a path is the product of the probabilities on its branches, and the probability of an event is the sum of the probabilities of the paths in it.`,
    w: R`The second branch of a tree diagram carries a conditional probability, so multiplying along a path is exactly the multiplication rule. Different paths exclude each other, so they can be added.`,
    p: R`Using the same denominator for both draws although nothing is put back. After the first draw the total number of items drops by one, so the denominator of the second branch is smaller.`,
    ex: [
      [R`A bag has $3$ red balls and $2$ blue balls. Two balls are drawn in turn without replacement. Find the probability that both are red.`, [
        [R`The first ball is red with probability $\frac{3}{5}$.`, R`There are $3$ red balls among $5$.`],
        [R`Then there are $2$ red balls among $4$, so the second is red with probability $\frac{2}{4}$.`, R`The ball drawn is not put back.`],
        [R`The required probability is $\frac{3}{5}\cdot\frac{2}{4}=\frac{3}{10}$.`, R`Multiply the two probabilities on the path red then red.`],
      ], R`The probability is $\frac{3}{10}$.`],
      [R`For the same bag, find the probability that the two balls have different colours.`, [
        [R`The path red then blue has probability $\frac{3}{5}\cdot\frac{2}{4}=\frac{3}{10}$.`, R`After a red first draw there are $2$ blue balls among $4$.`],
        [R`The path blue then red has probability $\frac{2}{5}\cdot\frac{3}{4}=\frac{3}{10}$, so the total is $\frac{3}{10}+\frac{3}{10}=\frac{3}{5}$.`, R`These two paths exclude each other, so add their probabilities.`],
      ], R`The probability is $\frac{3}{5}$.`],
    ],
    dr: [
      [R`For the same bag, find the probability that both balls are blue.`, R`The probability is $\frac{1}{10}$.`, R`The first is blue with probability $\frac{2}{5}$, then $1$ blue ball is left among $4$, so the probability is $\frac{1}{4}$.`],
      [R`For the same bag, find the probability that at least one ball is red.`, R`The probability is $\frac{9}{10}$.`, R`The complementary event is that both balls are blue, with probability $\frac{1}{10}$.`],
      [R`A box has $4$ red and $6$ yellow pieces. Two pieces are drawn without replacement. Find the probability that both are red.`, R`The probability is $\frac{2}{15}$.`, R`We have $\frac{4}{10}\cdot\frac{3}{9}=\frac{12}{90}=\frac{2}{15}$.`],
    ],
  },
  "cong-thuc-nhan": {
    s: R`From the definition of conditional probability, $P(A\cap B)=P(A)\,P(B\mid A)$ when $P(A)>0$. The rule extends to several events in a row: $P(A\cap B\cap C)=P(A)\,P(B\mid A)\,P(C\mid A\cap B)$.`,
    w: R`The definition $P(B\mid A)=\frac{P(A\cap B)}{P(A)}$ gives the multiplication rule at once by moving a term. For three events, apply the rule twice in a row.`,
    p: R`Multiplying $P(A)$ by $P(B)$ when the events are not independent. One must use $P(B\mid A)$, since once $A$ has happened the probability of $B$ has changed.`,
    ex: [
      [R`Given $P(A)=\frac{2}{5}$ and $P(B\mid A)=\frac{1}{2}$, find $P(A\cap B)$.`, [
        [R`By the multiplication rule, $P(A\cap B)=\frac{2}{5}\cdot\frac{1}{2}$.`, R`We know the probability of $A$ and that of $B$ once $A$ has happened.`],
        [R`The result is $\frac{1}{5}$.`, R`Multiply the fractions and simplify.`],
      ], R`The probability is $\frac{1}{5}$.`],
      [R`Two cards are drawn in a row from a $52$-card deck without replacement. Find the probability that both are aces.`, [
        [R`The first card is an ace with probability $\frac{4}{52}$, and then $3$ aces remain among $51$ cards.`, R`A standard deck has exactly $4$ aces among $52$ cards.`],
        [R`The required probability is $\frac{4}{52}\cdot\frac{3}{51}=\frac{1}{221}$.`, R`Simplify by dividing numerator and denominator by $12$.`],
      ], R`The probability is $\frac{1}{221}$.`],
    ],
    dr: [
      [R`Given $P(A)=\frac{1}{3}$ and $P(B\mid A)=\frac{3}{4}$, find $P(A\cap B)$.`, R`The probability is $\frac{1}{4}$.`, R`Multiply the two probabilities: $\frac{1}{3}\cdot\frac{3}{4}=\frac{1}{4}$.`],
      [R`A class has $10$ boys and $15$ girls. Two students are chosen in turn without replacement. Find the probability that both are girls.`, R`The probability is $\frac{7}{20}$.`, R`We have $\frac{15}{25}\cdot\frac{14}{24}=\frac{210}{600}=\frac{7}{20}$.`],
      [R`Given $P(A\cap B)=\frac{1}{6}$ and $P(A)=\frac{1}{2}$, find $P(B\mid A)$.`, R`The probability is $\frac{1}{3}$.`, R`Divide the probability of the intersection by $P(A)$: $\frac{1}{6}:\frac{1}{2}=\frac{1}{3}$.`],
    ],
  },
  "doc-lap-12": {
    s: R`Two events $A$ and $B$ are independent if and only if $P(A\cap B)=P(A)\,P(B)$. Then knowing that $B$ happened does not change the probability of $A$, that is $P(A\mid B)=P(A)$. For any two events, $P(A\cup B)=P(A)+P(B)-P(A\cap B)$.`,
    w: R`If $A$ does not affect $B$ then $P(B\mid A)=P(B)$, and substituting into the multiplication rule gives $P(A\cap B)=P(A)P(B)$. The converse also holds, so this is a necessary and sufficient condition.`,
    p: R`Confusing independent events with mutually exclusive events. Mutually exclusive events have intersection probability $0$, so they are independent only when one of them has probability $0$.`,
    ex: [
      [R`Given $P(A)=\frac{1}{2}$, $P(B)=\frac{1}{3}$ and $P(A\cap B)=\frac{1}{6}$, are the events independent?`, [
        [R`The product of the two probabilities is $\frac{1}{2}\cdot\frac{1}{3}=\frac{1}{6}$.`, R`The independence condition compares this product with the probability of the intersection.`],
        [R`The product equals $P(A\cap B)=\frac{1}{6}$, so the events are independent.`, R`The two sides of the condition are equal.`],
      ], R`The events are independent.`],
      [R`Given $P(A)=\frac{1}{2}$, $P(B)=\frac{1}{2}$ and $P(A\cap B)=\frac{1}{3}$, are the events independent?`, [
        [R`The product of the two probabilities is $\frac{1}{2}\cdot\frac{1}{2}=\frac{1}{4}$.`, R`Multiply the two probabilities and compare with the probability of the intersection.`],
        [R`Since $\frac{1}{4}\ne\frac{1}{3}$, the events are not independent.`, R`One difference between the two sides is enough to conclude they depend on each other.`],
      ], R`The events are not independent.`],
    ],
    dr: [
      [R`Two independent events have $P(A)=\frac{1}{5}$ and $P(B)=\frac{1}{2}$. Find $P(A\cap B)$.`, R`The probability is $\frac{1}{10}$.`, R`For independent events the probability of the intersection is the product of the two probabilities.`],
      [R`For the two independent events above, find $P(A\cup B)$.`, R`The probability is $\frac{3}{5}$.`, R`We have $\frac{1}{5}+\frac{1}{2}-\frac{1}{10}=\frac{2+5-1}{10}=\frac{3}{5}$.`],
      [R`Given $P(A)=\frac{1}{4}$, $P(B)=\frac{1}{3}$ and $P(A\cap B)=\frac{1}{10}$, what is the product $P(A)P(B)$, and are the events independent?`, R`The product is $\frac{1}{12}$, which differs from $\frac{1}{10}$, so they are not independent.`, R`The product $\frac{1}{12}$ differs from the probability of the intersection $\frac{1}{10}$, so the independence condition fails.`],
    ],
  },
  "bayes-cay": {
    s: R`Draw a tree whose first branches are the causes $B_i$ and whose second branches are the result $A$. The total probability $P(A)$ is the sum of the paths leading to $A$. Bayes' rule gives $P(B_i\mid A)$ as the path through $B_i$ divided by the sum of the paths leading to $A$.`,
    w: R`Each path on the tree is one way to reach the result, and its probability is the product of its branches. Once we know $A$ happened, the probability of a cause is the share of the path through that cause in the total of all paths leading to $A$.`,
    p: R`Dividing by the probability of the cause instead of by the sum of the paths leading to the result. For a rare disease, the probability of being ill after a positive test is often much smaller than many people guess.`,
    ex: [
      [R`A disease has prevalence $\frac{1}{100}$. A test is positive for a sick person with probability $\frac{9}{10}$ and for a healthy person with probability $\frac{1}{10}$. A person tests positive; find the probability that they are ill.`, [
        [R`The path ill then positive has probability $\frac{1}{100}\cdot\frac{9}{10}=\frac{9}{1000}$.`, R`Multiply the probabilities on the two consecutive branches.`],
        [R`The path healthy then positive has probability $\frac{99}{100}\cdot\frac{1}{10}=\frac{99}{1000}$.`, R`The probability of being healthy is $1-\frac{1}{100}=\frac{99}{100}$.`],
        [R`The required probability is $\frac{9}{9+99}=\frac{1}{12}$.`, R`The ill path divided by the sum of the two paths leading to a positive test.`],
      ], R`The probability that the person is ill is $\frac{1}{12}$.`],
      [R`Machine $1$ makes $\frac{3}{5}$ of the products with defect rate $\frac{1}{50}$. Machine $2$ makes $\frac{2}{5}$ with defect rate $\frac{1}{20}$. A random product is defective; find the probability that machine $1$ made it.`, [
        [R`The path machine $1$ then defective is $\frac{3}{5}\cdot\frac{1}{50}=\frac{3}{250}$ and machine $2$ then defective is $\frac{2}{5}\cdot\frac{1}{20}=\frac{5}{250}$.`, R`Use the common denominator $250$ to make adding easy.`],
        [R`The required probability is $\frac{3}{3+5}=\frac{3}{8}$.`, R`The path of machine $1$ divided by the sum of the two paths leading to a defect.`],
      ], R`The probability that machine $1$ made it is $\frac{3}{8}$.`],
    ],
    dr: [
      [R`For the test above, find the probability that a random person tests positive.`, R`The probability is $\frac{27}{250}$.`, R`Add the two paths leading to a positive test: $\frac{9+99}{1000}=\frac{108}{1000}=\frac{27}{250}$.`],
      [R`Half of the people are ill. A test is positive for an ill person with probability $\frac{4}{5}$ and for a healthy person with probability $\frac{1}{5}$. Given a positive test, find the probability of being ill.`, R`The probability is $\frac{4}{5}$.`, R`The two paths are $\frac{2}{5}$ and $\frac{1}{10}$, so the probability is $\frac{\frac{2}{5}}{\frac{2}{5}+\frac{1}{10}}=\frac{4}{5}$.`],
      [R`For the machine example, find the probability that a defective product was made by machine $2$.`, R`The probability is $\frac{5}{8}$.`, R`The two machines form a complete system, so $1-\frac{3}{8}=\frac{5}{8}$.`],
    ],
  },
};
