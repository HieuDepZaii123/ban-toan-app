/** Lớp 11 bằng tiếng Anh. Thứ tự ví dụ và bài luyện khớp bản tiếng Việt. */
import type { LessonEn } from "./types.ts";

const R = String.raw;

export const g11En: Record<string, LessonEn> = {
  "goc-lg": {
    s: R`A trigonometric angle has a starting side and an ending side. On the unit circle, sine is the vertical coordinate and cosine the horizontal one. Two angles differing by a multiple of $2\pi$ have the same sine and the same cosine.`,
    w: R`On the unit circle each angle corresponds to a point, and one more full turn of $2\pi$ brings you back to the same point. Sine and cosine are that point's coordinates, so they repeat after every turn.`,
    p: R`Leaving the calculator in degree mode when the angle is in radians. The angle $\frac{5\pi}{6}$ radians is $150^\circ$.`,
    ex: [
      [R`Find $\sin\frac{5\pi}{6}$ and $\cos\frac{5\pi}{6}$.`, [
        [R`The sine equals $\sin\frac{\pi}{6}=\frac{1}{2}$.`, R`The angles $\frac{5\pi}{6}$ and $\frac{\pi}{6}$ are supplementary. Supplementary angles have the same sine.`],
        [R`The cosine equals $-\frac{\sqrt{3}}{2}$.`, R`For the same pair of supplementary angles the cosine changes sign. This angle is in the second quadrant, so its cosine is negative.`],
      ], R`The sine is $\frac{1}{2}$ and the cosine is $-\frac{\sqrt{3}}{2}$.`],
      [R`Convert $135^\circ$ to radians and find $\sin 135^\circ$, $\cos 135^\circ$.`, [
        [R`We have $135^\circ=135\cdot\frac{\pi}{180}=\frac{3\pi}{4}$.`, R`One degree is $\frac{\pi}{180}$ radians, so multiply the number of degrees by this ratio.`],
        [R`The angle $135^\circ$ is supplementary to $45^\circ$, so $\sin 135^\circ=\frac{\sqrt2}{2}$ and $\cos 135^\circ=-\frac{\sqrt2}{2}$.`, R`Supplementary angles have the same sine and opposite cosines.`],
      ], R`The angle is $\frac{3\pi}{4}$ radians, with sine $\frac{\sqrt2}{2}$ and cosine $-\frac{\sqrt2}{2}$.`],
    ],
    dr: [
      [R`Find $\sin\frac{\pi}{2}$.`, R`The sine is $1$.`, R`The ending side lies on the positive vertical axis of the unit circle, so the vertical coordinate is $1$.`],
      [R`Find $\cos\frac{7\pi}{6}$.`, R`The cosine is $-\frac{\sqrt{3}}{2}$.`, R`This angle is more than $\pi$ and less than $\frac{3\pi}{2}$, so it is in the third quadrant, where cosine is negative.`],
      [R`Do the angles $\frac{\pi}{3}$ and $\frac{7\pi}{3}$ have the same sine?`, R`Yes, because they differ by exactly $2\pi$.`, R`Adding a full turn of $2\pi$ does not change the vertical coordinate on the unit circle.`],
    ],
  },
  "cong-thuc": {
    s: R`Addition formula: $\sin(a+b)=\sin a\cos b+\cos a\sin b$. Double angle: $\cos 2a=2\cos^2 a-1$. Sum to product: $\sin a+\sin b=2\sin\frac{a+b}{2}\cos\frac{a-b}{2}$.`,
    w: R`The addition formula follows from the dot product of two unit vectors making angles $a$ and $b$ with the horizontal axis. Setting $b=a$ in the addition formula gives the double-angle formulas.`,
    p: R`Writing $\sin(a+b)=\sin a+\sin b$. Try $a=b=90^\circ$: the left-hand side is $0$ and the right-hand side is $2$.`,
    ex: [
      [R`Find $\sin 75^\circ$ using the addition formula for $45^\circ$ and $30^\circ$.`, [
        [R`Expand $\sin 45^\circ\cos 30^\circ+\cos 45^\circ\sin 30^\circ$.`, R`The addition formula applies exactly to a sum of two angles. Each term is a product of a sine and a cosine.`],
        [R`The value is $\frac{\sqrt{6}+\sqrt{2}}{4}$.`, R`Substitute $\sin 45^\circ=\cos 45^\circ=\frac{\sqrt{2}}{2}$, $\cos 30^\circ=\frac{\sqrt{3}}{2}$ and $\sin 30^\circ=\frac{1}{2}$, then use the common denominator $4$.`],
      ], R`The sine of $75^\circ$ is $\frac{\sqrt{6}+\sqrt{2}}{4}$.`],
      [R`Given $\cos a=\frac{3}{5}$ with $0<a<\frac{\pi}{2}$, find $\sin 2a$ and $\cos 2a$.`, [
        [R`An acute angle has positive sine, so $\sin a=\sqrt{1-\frac{9}{25}}=\frac{4}{5}$.`, R`The basic identity gives the sine from the cosine, with the sign chosen by the quadrant.`],
        [R`By the double-angle formulas, $\sin 2a=2\sin a\cos a=\frac{24}{25}$ and $\cos 2a=2\cos^2 a-1=-\frac{7}{25}$.`, R`A double-angle formula is the addition formula with two equal angles.`],
      ], R`We have $\sin 2a=\frac{24}{25}$ and $\cos 2a=-\frac{7}{25}$.`],
    ],
    dr: [
      [R`Use $\cos 2a=2\cos^2 a-1$ to find $\cos\frac{\pi}{3}$ from $\cos\frac{\pi}{6}$.`, R`The cosine is $\frac{1}{2}$.`, R`Doubling the angle $\frac{\pi}{6}$ gives $\frac{\pi}{3}$. The double-angle formula gives exactly the cosine of the new angle.`],
      [R`Compute $\sin\frac{\pi}{3}+\sin\frac{\pi}{6}$ using sum to product, then compare the values.`, R`The sum is $\frac{\sqrt{3}+1}{2}$.`, R`Turning a sum into a product does not change the value. Adding the two sines directly gives the same number.`],
      [R`Compute $\sin\frac{\pi}{2}$ using the addition formula for $\frac{\pi}{6}$ and $\frac{\pi}{3}$.`, R`The sine is $1$.`, R`The two angles add up to a right angle. The addition formula must give the sine of a right angle.`],
    ],
  },
  "do-thi-lg": {
    s: R`The function $y=\sin x$ has range $[-1,1]$ and period $2\pi$. The function $y=a\sin x$ with $a>0$ has maximum $a$ and minimum $-a$.`,
    w: R`Sine is the vertical coordinate of a point moving round the unit circle, so it always stays in $[-1,1]$ and repeats after every turn of $2\pi$. Multiplying by a positive $a$ stretches the graph vertically $a$ times.`,
    p: R`Thinking $y=\sin 2x$ has period $4\pi$. The coefficient of $x$ squeezes the graph, so the period is $\frac{2\pi}{2}=\pi$.`,
    ex: [
      [R`Find the maximum and minimum of $y=2\sin x$.`, [
        [R`Since $-1\le\sin x\le 1$, multiplying by $2$ gives $-2\le 2\sin x\le 2$.`, R`Multiplying an inequality by a positive number keeps its direction. The coefficient $2$ is the amplitude.`],
        [R`The value $2$ is reached when $\sin x=1$, and $-2$ when $\sin x=-1$.`, R`Both values belong to the range of sine, so both bounds are actually reached.`],
      ], R`The maximum is $2$ and the minimum is $-2$.`],
      [R`Find the period, maximum and minimum of $y=3\cos 2x+1$.`, [
        [R`The coefficient $2$ of $x$ shrinks the period to $\frac{2\pi}{2}=\pi$.`, R`The function $\cos kx$ repeats after every interval of length $\frac{2\pi}{|k|}$.`],
        [R`Since $-1\le\cos 2x\le 1$ we get $-2\le 3\cos 2x+1\le 4$.`, R`Multiply the inequality by the positive number $3$, then add $1$ to all three parts.`],
      ], R`The period is $\pi$, the maximum is $4$ and the minimum is $-2$.`],
    ],
    dr: [
      [R`What is the maximum of $y=3\cos x$?`, R`The maximum is $3$.`, R`Cosine reaches $1$, so the amplitude $3$ is the maximum.`],
      [R`What is the period of $y=\sin x$ in radians?`, R`The period is $2\pi$.`, R`After one turn of $2\pi$, sine returns to the same value.`],
      [R`Does the range of $y=\sin x$ contain the number $2$?`, R`No, because sine only takes values in $[-1,1]$.`, R`The equation $\sin x=2$ has no real solution, so $2$ is not in the range.`],
    ],
  },
  "pt-lg": {
    s: R`If $\sin\alpha=m$ with $m\in[-1,1]$, then $\sin x=m$ has general solution $x=\alpha+k\cdot 2\pi$ and $x=\pi-\alpha+k\cdot 2\pi$, $k\in\mathbb{Z}$. If $\cos\alpha=m$ with $m\in[-1,1]$, then $\cos x=m$ has solutions $x=\pm\alpha+k\cdot 2\pi$. If $\tan\alpha=m$, then $\tan x=m$ has solutions $x=\alpha+k\pi$.`,
    w: R`The line $y=m$ meets the unit circle at two points symmetric about the vertical axis, corresponding to the angles $\alpha$ and $\pi-\alpha$. Each point repeats after every turn, so $k\cdot 2\pi$ must be added.`,
    p: R`Writing only the family $x=\alpha+k\cdot 2\pi$ for a sine equation. There is a second family $x=\pi-\alpha+k\cdot 2\pi$.`,
    ex: [
      [R`Solve $\sin x=\frac{1}{2}$, with $\alpha=\frac{\pi}{6}$.`, [
        [R`Since $\sin\frac{\pi}{6}=\frac{1}{2}$, the two families are $x=\frac{\pi}{6}+k\cdot 2\pi$ and $x=\pi-\frac{\pi}{6}+k\cdot 2\pi$.`, R`The general solution for sine uses the angle $\alpha$ and its supplement $\pi-\alpha$, each plus multiples of $2\pi$.`],
        [R`On $[0,2\pi)$ the two solutions are $x=\frac{\pi}{6}$ and $x=\frac{5\pi}{6}$.`, R`Take $k=0$ in the first family. The second family with $k=0$ gives $\frac{5\pi}{6}$, still within one turn.`],
      ], R`The general solution is $x=\frac{\pi}{6}+k\cdot 2\pi$ and $x=\frac{5\pi}{6}+k\cdot 2\pi$.`],
      [R`Solve the equation $\cos x=-\frac{1}{2}$.`, [
        [R`We have $\cos\frac{2\pi}{3}=-\frac{1}{2}$, so take $\alpha=\frac{2\pi}{3}$.`, R`Find a familiar angle whose cosine equals the given value.`],
        [R`General solution: $x=\pm\frac{2\pi}{3}+k2\pi$ with $k\in\mathbb{Z}$.`, R`Two points of the circle with the same horizontal coordinate are symmetric about the horizontal axis.`],
      ], R`The equation has solutions $x=\pm\frac{2\pi}{3}+k2\pi$, $k\in\mathbb{Z}$.`],
    ],
    dr: [
      [R`Solve $\sin x=\frac{\sqrt{2}}{2}$ with $\alpha=\frac{\pi}{4}$. Write the general solution.`, R`The two families are $x=\frac{\pi}{4}+k\cdot 2\pi$ and $x=\frac{3\pi}{4}+k\cdot 2\pi$.`, R`Same formulas $x=\alpha+k\cdot 2\pi$ and $x=\pi-\alpha+k\cdot 2\pi$. Sine does not change when adding $2\pi$ or when taking the supplement.`],
      [R`Solve $\cos x=\frac{1}{2}$ with $\alpha=\frac{\pi}{3}$.`, R`The general solution is $x=\pm\frac{\pi}{3}+k\cdot 2\pi$.`, R`Cosine is symmetric about the horizontal axis within one turn, so both $\alpha$ and $-\alpha$ are solutions, then add $k\cdot 2\pi$.`],
      [R`Solve $\tan x=1$ with $\alpha=\frac{\pi}{4}$.`, R`The general solution is $x=\frac{\pi}{4}+k\pi$.`, R`Tangent has period $\pi$. Adding $k\pi$ to one solution gives the whole general solution.`],
    ],
  },
  "cap-so": {
    s: R`An arithmetic sequence has $u_n=u_1+(n-1)d$ and $S_n=\frac{n}{2}(u_1+u_n)$. A finite geometric sequence with $q\neq 1$ has $S_n=u_1\frac{1-q^n}{1-q}$. Infinite sums are not part of this lesson.`,
    w: R`Write the arithmetic sum forwards and backwards and add: each pair of terms sums to $u_1+u_n$, and there are $n$ such pairs. For a geometric sequence, subtracting $qS_n$ from $S_n$ cancels the middle terms and leaves $u_1(1-q^n)$.`,
    p: R`Using $u_n=u_1+nd$. From the first term to the $n$-th term there are only $n-1$ steps.`,
    ex: [
      [R`An arithmetic sequence has $u_1=3$, $d=4$. Find $u_{10}$ and $S_{10}$.`, [
        [R`The tenth term is $3+9\cdot 4=39$.`, R`From the first term to the tenth there are nine common differences.`],
        [R`The sum of ten terms is $\frac{10}{2}(3+39)=210$.`, R`The two-ends sum formula uses exactly ten terms.`],
      ], R`The results are $u_{10}=39$ and $S_{10}=210$.`],
      [R`A geometric sequence has $u_1=3$ and $q=2$. Find $u_6$ and the sum of the first $6$ terms.`, [
        [R`The sixth term: $u_6=u_1q^5=3\cdot 32=96$.`, R`From the first term to the sixth there are five multiplications by the ratio.`],
        [R`The sum: $S_6=u_1\frac{q^6-1}{q-1}=3\cdot 63=189$.`, R`The geometric sum formula applies because the ratio is not one.`],
      ], R`We have $u_6=96$ and $S_6=189$.`],
    ],
    dr: [
      [R`A geometric sequence has $u_1=2$, $q=3$. Find $S_5$.`, R`The finite sum is $242$.`, R`The ratio is not $1$, so use the finite sum. Infinite sums are not considered here.`],
      [R`An arithmetic sequence has $u_1=2$, $d=3$. Find $u_5$.`, R`The fifth term is $14$.`, R`There are four steps from the first term to the fifth.`],
      [R`Compute $2+4+8+16$.`, R`The sum of the four terms is $30$.`, R`This is a finite geometric sum with ratio $2$.`],
    ],
  },
  "don-dieu": {
    s: R`A sequence is increasing when $u_{n+1}>u_n$ for every positive integer $n$, and decreasing when $u_{n+1}<u_n$ for every $n$. It is bounded when it has both a lower bound and an upper bound not depending on $n$.`,
    w: R`Look at the difference $u_{n+1}-u_n$: if it is always positive, each term is larger than the one before. For $u_n=1-\frac{1}{n}$ the difference is $\frac{1}{n(n+1)}$, always positive, and every term lies in the half-open interval $[0,1)$.`,
    p: R`Concluding that a sequence increases after trying a few first terms. You must prove the difference is positive for every $n$.`,
    ex: [
      [R`Consider $u_n=1-\frac{1}{n}$. Is the sequence increasing, and is it bounded?`, [
        [R`The difference $u_{n+1}-u_n=\frac{1}{n(n+1)}>0$, so the sequence increases.`, R`The numerator and denominator are positive for every positive integer $n$. The strict inequality matches the definition of increasing.`],
        [R`For every $n\ge 1$, $0\le u_n<1$.`, R`The first term is $0$. Later terms are positive and less than $1$, so the whole sequence lies in $[0,1)$.`],
      ], R`The sequence is increasing and bounded, namely $0\le u_n<1$.`],
      [R`Is the sequence $u_n=\frac{n+1}{n}$ increasing or decreasing?`, [
        [R`Write $u_n=1+\frac{1}{n}$, then $u_{n+1}-u_n=\frac{1}{n+1}-\frac{1}{n}=-\frac{1}{n(n+1)}$.`, R`The sign of the difference of two consecutive terms tells whether the sequence goes up or down.`],
        [R`The difference is always negative, and $1<u_n\le 2$ for every $n$.`, R`The fraction $\frac{1}{n}$ is positive and at most one, so the sequence is bounded on both sides.`],
      ], R`The sequence is decreasing and bounded: $1<u_n\le 2$.`],
    ],
    dr: [
      [R`Is the sequence $u_n=2+\frac{1}{n}$ increasing or decreasing?`, R`It is decreasing.`, R`Each term minus the next one is positive, so the sequence goes down strictly.`],
      [R`Take the sequence $u_n=n$ and the bound $4$. Does the term $u_5$ go past the bound?`, R`Yes, $u_5=5$ is greater than $4$, so $4$ does not bound the sequence.`, R`Each term equals its index. A bound passed by some term is not an upper bound for the sequence.`],
      [R`What is the first term of $u_n=1-\frac{1}{n}$?`, R`The first term is $0$.`, R`The lower bound $0$ is reached at the first term, so the left-hand inequality is not strict.`],
    ],
  },
  "gh-day": {
    s: R`If $|q|<1$, the partial sums of the geometric series $u_1+u_1q+u_1q^2+\cdots$ approach $\frac{u_1}{1-q}$. The condition $|q|<1$ is needed for the infinite sum to be finite when $u_1\neq 0$.`,
    w: R`The sum of the first $n$ terms is $u_1\frac{1-q^n}{1-q}$. When $|q|<1$, $q^n$ approaches $0$, so the sum approaches $\frac{u_1}{1-q}$.`,
    p: R`Using the infinite-sum formula when $|q|\ge 1$. With $q=2$ the terms keep growing and the sum does not approach any finite number.`,
    ex: [
      [R`Find the infinite sum $1+\frac{1}{2}+\frac{1}{4}+\cdots$.`, [
        [R`The ratio $q=\frac{1}{2}$ has absolute value less than $1$.`, R`This is the condition for the partial sums to approach a finite number.`],
        [R`The sum is $\frac{1}{1-\frac{1}{2}}=2$.`, R`This is the formula for the limit of the partial sums. The first term is $1$.`],
      ], R`The infinite sum is $2$.`],
      [R`Find $\lim\frac{2n^2+3}{n^2-n}$.`, [
        [R`Divide numerator and denominator by $n^2$: this gives $\frac{2+\frac{3}{n^2}}{1-\frac{1}{n}}$.`, R`Dividing by the highest power reveals the terms that go to zero.`],
        [R`As $n\to+\infty$, the two small fractions go to $0$, so the limit is $\frac{2}{1}=2$.`, R`A fixed number divided by an ever-growing power of $n$ goes to zero.`],
      ], R`The limit is $2$.`],
    ],
    dr: [
      [R`What is the infinite sum $3+\frac{3}{2}+\frac{3}{4}+\cdots$?`, R`The sum is $6$.`, R`The ratio one half has absolute value less than $1$, so use the limit of the partial sums.`],
      [R`What does the sequence $u_n=\frac{1}{n}$ approach?`, R`It approaches $0$.`, R`The numerator is fixed and the denominator goes to positive infinity, so the quotient goes to $0$.`],
      [R`Does the geometric sequence with $u_1=1$, $q=2$ have a finite infinite sum?`, R`No, because $|2|=2$ is not less than $1$.`, R`The condition for a finite infinite sum is that the absolute value of the ratio is less than $1$. With ratio $2$ this fails.`],
    ],
  },
  "gh-ham": {
    s: R`The right-hand and left-hand limits are separate questions. Limits as $x$ goes to positive infinity and as $x$ goes to negative infinity are also computed separately. The form $\frac{0}{0}$ needs a common factor cancelled before concluding.`,
    w: R`The limit at $2$ only concerns values of $x$ near $2$ but different from $2$. For those $x$, $\frac{x^2-4}{x-2}$ and $x+2$ are equal, so their limits are equal.`,
    p: R`Substituting, getting $\frac{0}{0}$, and concluding the limit does not exist. That form only signals that more work is needed.`,
    ex: [
      [R`Find $\lim_{x\to 2}\frac{x^2-4}{x-2}$ and $\lim_{x\to +\infty}\frac{2x+1}{x}$.`, [
        [R`For $x\neq 2$ the first quotient equals $x+2$, so the limit at $2$ is $4$.`, R`Cancel the factor $x-2$. The function $x+2$ is continuous at $2$.`],
        [R`Dividing the numerator and denominator of the second quotient by $x$ gives $2+\frac{1}{x}$, whose limit at positive infinity is $2$.`, R`The term $\frac{1}{x}$ goes to $0$ as $x$ goes to positive infinity. This direction must be stated separately.`],
      ], R`The limit at $2$ is $4$. The limit as $x$ goes to positive infinity is $2$.`],
      [R`Find $\lim_{x\to 1^+}\frac{1}{x-1}$ and $\lim_{x\to 1^-}\frac{1}{x-1}$.`, [
        [R`As $x$ approaches $1$ from the right, $x-1$ is a tiny positive number, so the fraction grows to $+\infty$.`, R`Dividing one by a smaller and smaller positive number gives a larger and larger quotient.`],
        [R`As $x$ approaches $1$ from the left, $x-1$ is tiny and negative, so the fraction falls to $-\infty$.`, R`A negative denominator makes the quotient negative.`],
      ], R`The two one-sided limits differ, so there is no limit at $x=1$.`],
    ],
    dr: [
      [R`Find the right-hand limit of $\frac{x-2}{|x-2|}$ at $2$.`, R`The right-hand limit is $1$.`, R`To the right of $2$ the expression inside the absolute value is positive, so the quotient is $1$.`],
      [R`Find the left-hand limit of $\frac{x-2}{|x-2|}$ at $2$.`, R`The left-hand limit is $-1$.`, R`On the left, the absolute value flips the sign of the difference, so the quotient is $-1$. The two one-sided limits differ.`],
      [R`Find $\lim_{x\to +\infty}\frac{2x+500}{x}$.`, R`The limit is $2$.`, R`Split it as $2+\frac{500}{x}$. The fraction goes to $0$ as $x$ goes to positive infinity.`],
    ],
  },
  "lien-tuc": {
    s: R`A function is continuous at $x_0$ when its limit at $x_0$ exists, is finite and equals the value of the function at $x_0$. Polynomials are continuous everywhere.`,
    w: R`Continuity means the function's value at the point matches the trend of the nearby values, with no break or jump in the graph there. Sums and products of continuous functions are continuous, so polynomials are continuous everywhere.`,
    p: R`Only checking that the function is defined at the point. The limit must also exist and equal exactly the function's value.`,
    ex: [
      [R`Is $f(x)=x^2$ continuous at $x=3$?`, [
        [R`The limit of $x^2$ as $x$ approaches $3$ is $9$.`, R`A polynomial's limit at any finite point equals its value there.`],
        [R`The value $f(3)$ is also $9$, so the function is continuous at $3$.`, R`The condition is that the limit equals the function's value. Both are $9$.`],
      ], R`The function is continuous at $x=3$.`],
      [R`Find $m$ so that $f(x)=\frac{x^2-4}{x-2}$ for $x\neq 2$ and $f(2)=m$ is continuous at $x=2$.`, [
        [R`For $x\neq 2$, $f(x)=x+2$, so the limit at $2$ is $4$.`, R`Cancel the common factor before taking a limit of zero-over-zero form.`],
        [R`Continuity at $2$ needs the limit to equal the value: $m=4$.`, R`The definition of continuity requires the limit to exist and equal the function's value at the point.`],
      ], R`The function is continuous at $x=2$ when $m=4$.`],
    ],
    dr: [
      [R`Compute $f(2)$ for $f(x)=x+1$, then compare it with the limit at $2$.`, R`The function value and the limit are both $3$, so the function is continuous at $2$.`, R`The limit of a linear polynomial equals its value at the point.`],
      [R`What is the limit of $\frac{x^2-1}{x-1}$ as $x$ approaches $1$?`, R`The limit is $2$.`, R`Cancel the factor $x-1$ when $x$ is not $1$. The function $x+1$ gives limit $2$.`],
      [R`Is the constant function $f(x)=4$ continuous at $0$?`, R`Yes, because the limit and the function value are both $4$.`, R`A constant does not change as $x$ approaches $0$, so the limit is that constant.`],
    ],
  },
  "phep-tinh-log": {
    s: R`For $a>0$, $a\neq 1$ and $b>0$, $\log_a b=\frac{\ln b}{\ln a}$. In particular $\log_a(a^n)=n$. For powers, $a^m\cdot a^n=a^{m+n}$.`,
    w: R`The logarithm undoes the power: $\log_a b$ is the exponent to put on $a$ to get $b$. Because $a^m\cdot a^n=a^{m+n}$, logarithms turn multiplication into addition.`,
    p: R`Writing $\log_a(b+c)=\log_a b+\log_a c$. The correct rule is $\log_a(bc)=\log_a b+\log_a c$ for positive $b$ and $c$.`,
    ex: [
      [R`Find $\log_3 81$ and $2^5$.`, [
        [R`Since $81=3^4$, the logarithm is $4$.`, R`By definition, base $3$ to the power $4$ gives exactly $81$.`],
        [R`The power $2^5$ equals $32$.`, R`Five factors of $2$ multiplied together. This is a computation, not an equation.`],
      ], R`The logarithm is $4$ and the power is $32$.`],
      [R`Find $\log_2 12-\log_2 3$ and $\log_3 5\cdot\log_5 9$.`, [
        [R`We have $\log_2 12-\log_2 3=\log_2 4=2$.`, R`The difference of two logarithms with the same base is the logarithm of the quotient.`],
        [R`Change of base: $\log_3 5\cdot\log_5 9=\log_3 9=2$.`, R`The product $\log_a b\cdot\log_b c$ equals $\log_a c$ by the change-of-base formula.`],
      ], R`Both expressions equal $2$.`],
    ],
    dr: [
      [R`Find $\log_2 32$.`, R`The logarithm is $5$.`, R`Since $32=2^5$, the definition of the logarithm returns exactly the exponent.`],
      [R`Compute $3^2\cdot 3^3$.`, R`The product is $3^5=243$.`, R`With the same base, add the exponents. Five factors of $3$ give $243$.`],
      [R`Compute $9^{\frac{1}{2}}$.`, R`The root is $3$.`, R`The power $\frac{1}{2}$ is the principal square root, which takes the non-negative value.`],
    ],
  },
  "ham-mu": {
    s: R`The function $y=a^x$ with $a>1$ is increasing on $\mathbb{R}$. The function $y=\log_a x$ with $a>1$ is defined for $x>0$ and is also increasing. The two functions are inverses on their domains.`,
    w: R`When $a>1$, increasing $x$ by a positive amount multiplies $a^x$ by a number greater than $1$, so the exponential function increases. The logarithm is the inverse of the exponential, so its graph is the reflection in the line $y=x$ and it increases too.`,
    p: R`Forgetting the domain of the logarithm. The expression $\log_a x$ only makes sense when $x>0$.`,
    ex: [
      [R`Find $2^3$ and $\log_2 8$.`, [
        [R`The power $2^3$ equals $8$.`, R`Three factors of $2$ multiplied. This point lies on the graph of the exponential function.`],
        [R`The logarithm $\log_2 8$ equals $3$.`, R`The base $2$ logarithm undoes the base $2$ exponential, so it returns exactly the exponent $3$.`],
      ], R`The two values are $8$ and $3$.`],
      [R`Compare $0.5^{2}$ with $0.5^{3}$, then compare $\log_2 5$ with $\log_2 7$.`, [
        [R`The base $0.5<1$, so $0.5^x$ is decreasing, hence $0.5^2>0.5^3$.`, R`For an exponential with base less than one, a larger exponent gives a smaller value.`],
        [R`The base $2>1$, so $\log_2 x$ is increasing, hence $\log_2 5<\log_2 7$.`, R`A logarithm with base greater than one keeps the order of positive numbers.`],
      ], R`We have $0.5^2>0.5^3$ and $\log_2 5<\log_2 7$.`],
    ],
    dr: [
      [R`Compute $5^0$.`, R`The value is $1$.`, R`Any positive base to the power $0$ gives $1$, and the base here is not $0$.`],
      [R`What is the number $\log_2 \frac{1}{2}$?`, R`The logarithm is $-1$.`, R`Because $2^{-1}$ equals $\frac{1}{2}$. The argument is positive, so the logarithm is defined.`],
      [R`Compute $10^2$.`, R`The value is $100$.`, R`Two factors of $10$ give one hundred. The point $(2,100)$ lies on the graph of the base $10$ exponential.`],
    ],
  },
  "pt-log": {
    s: R`With a base greater than $1$, exponentials and logarithms are increasing, so an inequality keeps its direction when the same function is applied to both sides. The equation $\log_a x=b$ needs $x>0$ and has solution $x=a^b$.`,
    w: R`Exponentials and logarithms are monotonic, so each value is reached at one point only, and the same function can be removed from both sides. With a base greater than $1$ the function increases, so the inequality keeps its direction.`,
    p: R`Keeping the direction when the base is between $0$ and $1$. Then the function is decreasing and the inequality must be reversed.`,
    ex: [
      [R`Solve $2^x=8$ and $\log_2 x=3$.`, [
        [R`Since $8=2^3$, the exponential equation has solution $x=3$.`, R`The base $2$ exponential is one-to-one, so the exponent is uniquely determined.`],
        [R`The logarithmic equation has solution $x=2^3=8$.`, R`The argument must be positive. The value $8$ is positive and is exactly $2$ to the power $3$.`],
      ], R`The exponential equation has solution $x=3$. The logarithmic equation has solution $x=8$.`],
      [R`Solve the inequality $\log_3(x-1)<2$.`, [
        [R`The condition is $x-1>0$, that is, $x>1$.`, R`The expression inside the logarithm must be positive.`],
        [R`The base $3>1$, so the direction is kept: $x-1<9$, that is, $x<10$.`, R`A logarithm with base greater than one is increasing, so removing it from both sides keeps the direction.`],
      ], R`The solution set is $(1,10)$.`],
    ],
    dr: [
      [R`Solve $2^x>4$.`, R`The solution set is $(2,+\infty)$.`, R`The base is greater than $1$, so the exponential increases. The strict inequality excludes $x=2$.`],
      [R`Solve $\log_3 x=2$.`, R`The solution is $x=9$.`, R`The argument $9$ is positive. Base $3$ to the power $2$ is $9$.`],
      [R`Solve $3^x=1$.`, R`The solution is $x=0$.`, R`Any positive base other than $1$ to the power $0$ gives $1$, and this is the only solution.`],
    ],
  },
  "dinh-nghia-dh": {
    s: R`The derivative of $f$ at $x_0$ is the limit of $\frac{f(x_0+h)-f(x_0)}{h}$ as $h$ approaches $0$, if that limit is finite. A constant has derivative $0$.`,
    w: R`The quotient $\frac{f(x_0+h)-f(x_0)}{h}$ is the slope of the secant through two points of the graph. As $h$ approaches $0$ the secant turns into the tangent, so the derivative is the slope of the tangent.`,
    p: R`Putting $h=0$ straight away and getting $\frac{0}{0}$. Simplify the quotient first, then let $h$ approach $0$.`,
    ex: [
      [R`Use the definition to find the derivative of $f(x)=x^2$ at $x=3$.`, [
        [R`The quotient is $\frac{(3+h)^2-9}{h}=6+h$ when $h\neq 0$.`, R`Expand the square and cancel $h$ in the numerator and denominator. This holds before taking the limit.`],
        [R`The limit as $h$ approaches $0$ is $6$.`, R`The $h$ part goes to $0$. This finite limit is exactly the derivative at $3$.`],
      ], R`The derivative at $3$ is $6$.`],
      [R`Use the definition to find the derivative of $f(x)=\frac{1}{x}$ at $x=1$.`, [
        [R`The difference quotient is $\frac{f(1+h)-f(1)}{h}=\frac{\frac{1}{1+h}-1}{h}=-\frac{1}{1+h}$.`, R`Combine the numerator into one fraction and cancel $h$ before letting $h$ go to zero.`],
        [R`Letting $h\to 0$ gives $-1$.`, R`The simplified expression is continuous at $h=0$, so substitute directly.`],
      ], R`The derivative of $\frac{1}{x}$ at $x=1$ is $-1$.`],
    ],
    dr: [
      [R`What is the derivative of the constant $5$?`, R`The derivative is $0$.`, R`A constant has derivative $0$, because its difference quotient is zero whatever the change in the variable.`],
      [R`Using the definition, what is the derivative of $x^2$ at $x=1$?`, R`The derivative is $2$.`, R`Cancel $h$ in the difference quotient the same way, then let $h$ approach $0$.`],
      [R`What is the derivative of $x$ at every point?`, R`The derivative is $1$.`, R`The difference quotient of the identity function equals $1$ for every change other than $0$.`],
    ],
  },
  "tich-thuong": {
    s: R`The derivative of a product $uv$ is $u'v+uv'$. The derivative of a quotient $\frac{u}{v}$ is $\frac{u'v-uv'}{v^2}$ when $v\neq 0$. A composite $f(g(x))$ has derivative $f'(g(x))g'(x)$.`,
    w: R`When both sides $u$ and $v$ of a rectangle change, the extra area is made of two strips $u'v$ and $uv'$, while the small corner is negligible. For a composite function, rates of change multiply through each layer.`,
    p: R`Writing $(uv)'=u'v'$, or forgetting to multiply by the derivative of the inner function. The derivative of $(2x+1)^2$ is $2(2x+1)\cdot 2$.`,
    ex: [
      [R`Find the derivative of $(2x+1)^2$ at $x=1$.`, [
        [R`The chain rule gives $2(2x+1)\cdot 2=4(2x+1)$.`, R`Differentiate the outer function at the inner one, then multiply by the derivative of the inner function.`],
        [R`At $x=1$ the derivative is $4\cdot 3=12$.`, R`Substitute the point after obtaining the derivative formula. Do not substitute before differentiating.`],
      ], R`The derivative at $1$ is $12$.`],
      [R`Find the derivative of $y=\frac{2x+1}{x-1}$.`, [
        [R`By the quotient rule: $y'=\frac{2(x-1)-(2x+1)\cdot 1}{(x-1)^2}$.`, R`The derivative of a quotient is the numerator's derivative times the denominator, minus the numerator times the denominator's derivative, over the denominator squared.`],
        [R`Simplify the numerator: $2x-2-2x-1=-3$.`, R`The terms in $x$ cancel, leaving a constant.`],
      ], R`The derivative is $y'=-\frac{3}{(x-1)^2}$, always negative on the domain.`],
    ],
    dr: [
      [R`What is the derivative of $x\cdot x$ at $x=2$?`, R`The derivative is $4$.`, R`The product rule gives $1\cdot x+x\cdot 1=2x$. At $2$ the value is $4$.`],
      [R`What is the derivative of $\frac{x}{x+1}$ at $x=1$?`, R`The derivative is $\frac{1}{4}$.`, R`Use the quotient rule. The denominator $x+1$ is not $0$ at $x=1$, so the derivative exists.`],
      [R`What is the derivative of $(x^2+1)^3$ at $x=0$?`, R`The derivative is $0$.`, R`The chain rule brings a factor $2x$ from the inner derivative. That factor is $0$ at $x=0$.`],
    ],
  },
  "dh-lg-mu": {
    s: R`The derivative of $\sin x$ is $\cos x$, and of $\cos x$ is $-\sin x$. The derivative of $e^x$ is $e^x$. The derivative of $\ln x$ on $(0,+\infty)$ is $\frac{1}{x}$.`,
    w: R`At $x=0$ the graph of $\sin x$ rises with slope $1$, exactly $\cos 0$, and at the peak $x=\frac{\pi}{2}$ the tangent is horizontal, exactly $\cos\frac{\pi}{2}=0$. The number $e$ is chosen so that $e^x$ grows at a rate equal to its own value.`,
    p: R`Dropping the minus sign in the derivative of cosine. The derivative of $\cos x$ is $-\sin x$.`,
    ex: [
      [R`Find the derivative of $\sin x$ at $0$ and of $\ln x$ at $1$.`, [
        [R`The derivative of $\sin x$ at $0$ is $\cos 0=1$.`, R`The derivative of sine is cosine. The cosine of $0$ is $1$.`],
        [R`The derivative of $\ln x$ at $1$ is $\frac{1}{1}=1$.`, R`The point $1$ lies in $(0,+\infty)$. The derivative is the reciprocal of the argument.`],
      ], R`Both derivatives equal $1$.`],
      [R`Find the derivative of $y=e^{2x}\sin x$.`, [
        [R`The derivative of $e^{2x}$ is $2e^{2x}$, and of $\sin x$ is $\cos x$.`, R`The chain rule for $e^{u}$ gives $u'e^{u}$ with $u=2x$.`],
        [R`By the product rule: $y'=2e^{2x}\sin x+e^{2x}\cos x$.`, R`The derivative of a product is the first factor's derivative times the second, plus the first times the second's derivative.`],
      ], R`We have $y'=e^{2x}(2\sin x+\cos x)$.`],
    ],
    dr: [
      [R`What is the derivative of $\cos x$ at $0$?`, R`The derivative is $0$.`, R`The derivative of cosine is minus sine. The sine of $0$ is $0$.`],
      [R`What is the derivative of $e^x$ at $0$?`, R`The derivative is $1$.`, R`The exponential with base $e$ is its own derivative. Its value at $0$ is $1$.`],
      [R`What is the derivative of $\ln x$ at $e$?`, R`The derivative is $\frac{1}{e}$.`, R`The argument $e$ is positive. The derivative is the reciprocal of that argument.`],
    ],
  },
  "cap-hai": {
    s: R`The second derivative is the derivative of the first derivative. The tangent to the graph at the point with first coordinate $x_0$ is $y=f(x_0)+f'(x_0)(x-x_0)$, when $f'(x_0)$ exists.`,
    w: R`The tangent is the line through the point $(x_0,f(x_0))$ with slope $f'(x_0)$. Writing the line through a point with a given slope gives the formula.`,
    p: R`Leaving the slope as $f'(x)$, still containing $x$. Substitute $x_0$ so the slope is a specific number.`,
    ex: [
      [R`Let $f(x)=x^2$. Write the tangent at $x=1$.`, [
        [R`We have $f(1)=1$ and $f'(1)=2$.`, R`The derivative of $x^2$ is $2x$. Substitute the point $1$ into both the function and the derivative.`],
        [R`The tangent is $y=1+2(x-1)$, that is, $y=2x-1$.`, R`The tangent formula uses exactly the function value and the slope at that point.`],
      ], R`The tangent is $y=2x-1$.`],
      [R`Let $f(x)=x^3-3x^2$. Find $f''(x)$ and write the tangent to the graph at $x=1$.`, [
        [R`We have $f'(x)=3x^2-6x$ and $f''(x)=6x-6$.`, R`The second derivative is the derivative of the first derivative.`],
        [R`At $x=1$: $f(1)=-2$ and $f'(1)=-3$, so the tangent is $y=-3(x-1)-2=-3x+1$.`, R`The tangent passes through the point of the graph and has slope equal to the derivative there.`],
      ], R`The second derivative is $6x-6$, and the tangent at $x=1$ is $y=-3x+1$.`],
    ],
    dr: [
      [R`What is the second derivative of $x^3-3x$ at $x=1$?`, R`The second derivative is $6$.`, R`The first derivative is $3x^2-3$. Differentiating $3x^2$ again gives $6x$, which is $6$ at $1$.`],
      [R`What is the slope of the tangent to $y=x^2$ at $x=1$?`, R`The slope is $2$.`, R`The slope of the tangent is the derivative at the point of contact.`],
      [R`Substitute $x=1$ into the tangent $y=2x-1$. What is the height?`, R`The height is $1$, the same as the graph at the point of contact.`, R`The tangent and the graph meet at the point of contact, so they share the height there.`],
    ],
  },
  "song-song": {
    s: R`If a plane $(P)$ contains a line parallel to the line $d$, and $d$ does not lie in $(P)$, then $d$ is parallel to $(P)$. Two distinct planes with no common point are parallel. In a triangle, the midline is parallel to the third side and half as long.`,
    w: R`If $d$ were parallel to a line $a$ lying in $(P)$ and yet met $(P)$, the meeting point would have to lie on $a$, contradicting the parallelism. So $d$ has no point in common with $(P)$.`,
    p: R`Thinking that two lines in space that do not meet must be parallel. They may also be skew, lying in no common plane.`,
    ex: [
      [R`On the sides $SA$ and $SB$ of triangle $SAB$, let $M$ and $N$ be the midpoints. Given $AB=8$, find $MN$ and state how $MN$ relates to $AB$.`, [
        [R`The segment $MN$ is a midline of triangle $SAB$.`, R`Its endpoints are midpoints of two sides. The midline lies in the plane of the triangle.`],
        [R`So $MN$ is parallel to $AB$ and $MN=\frac{8}{2}=4$.`, R`The midline is parallel to the third side and half as long.`],
      ], R`The segment $MN$ is parallel to $AB$ and has length $4$.`],
      [R`The pyramid $S.ABCD$ has a parallelogram base. Let $M$ be the midpoint of $SA$. Prove that $SC$ is parallel to the plane $(MBD)$.`, [
        [R`Let $O$ be the intersection of the base diagonals; $O$ is the midpoint of $AC$.`, R`The diagonals of a parallelogram bisect each other.`],
        [R`In triangle $SAC$, the segment $MO$ joins the midpoints of two sides, so $MO$ is parallel to $SC$.`, R`The midline of a triangle is parallel to the third side.`],
        [R`The line $MO$ lies in the plane $(MBD)$, while $SC$ does not lie in that plane.`, R`A line parallel to a line of a plane, and lying outside the plane, is parallel to the plane.`],
      ], R`Therefore $SC$ is parallel to the plane $(MBD)$.`],
    ],
    dr: [
      [R`A triangle has base $10$. How long is the corresponding midline?`, R`The midline has length $5$ and is parallel to the base.`, R`The midline is half as long as the third side. The parallelism comes together with this length relation.`],
      [R`The plane $(P)$ contains the line $a$. The line $d$ is parallel to $a$ and does not lie in $(P)$. Are $d$ and $(P)$ parallel or intersecting?`, R`The line $d$ is parallel to $(P)$.`, R`A line parallel to a line lying in a plane, and not itself in that plane, is parallel to the plane.`],
      [R`Let $AB=12$ and $M, N$ be the midpoints of $SA, SB$. Find $MN$.`, R`The segment $MN$ has length $6$.`, R`The same midline theorem in the plane of triangle $SAB$.`],
    ],
  },
  "vuong-goc": {
    s: R`A line is perpendicular to a plane when it is perpendicular to two intersecting lines lying in the plane. Theorem of three perpendiculars: if $AH$ is perpendicular to a plane, $H$ lies in the plane, and a line $d$ of the plane passes through $B$, then $d$ is perpendicular to $AB$ exactly when $d$ is perpendicular to the projection $HB$.`,
    w: R`Two intersecting lines fix the directions of the whole plane: every vector in the plane can be written using their two direction vectors. Being perpendicular to both means the dot product with every vector of the plane is $0$.`,
    p: R`Concluding a line is perpendicular to a plane after checking only one line, or two parallel lines. You need two intersecting lines in the plane.`,
    ex: [
      [R`The line $AH$ is perpendicular to a plane at $H$, $HB$ lies in the plane, $AH=6$ and $HB=8$. Find $AB$. If a line $d$ in the plane passes through $B$ and is perpendicular to $HB$, how does $d$ relate to $AB$?`, [
        [R`Triangle $AHB$ has a right angle at $H$, so $AB=\sqrt{6^2+8^2}=10$.`, R`A line perpendicular to a plane is perpendicular to every line of the plane through its foot, including $HB$.`],
        [R`The line $d$ is perpendicular to $AB$.`, R`By the theorem of three perpendiculars: $d$ is perpendicular to the projection $HB$, so $d$ is perpendicular to the slanting line $AB$.`],
      ], R`The length $AB$ is $10$, and $d$ is perpendicular to $AB$.`],
      [R`The pyramid $S.ABCD$ has a square base and $SA$ perpendicular to the base. Prove that $BC$ is perpendicular to the plane $(SAB)$.`, [
        [R`The base is a square, so $BC$ is perpendicular to $AB$.`, R`Adjacent sides of a square are perpendicular.`],
        [R`Since $SA$ is perpendicular to the base, $SA$ is perpendicular to $BC$.`, R`A line perpendicular to a plane is perpendicular to every line lying in that plane.`],
        [R`The lines $AB$ and $SA$ meet at $A$ and both lie in $(SAB)$.`, R`Being perpendicular to two intersecting lines of a plane is enough to be perpendicular to the whole plane.`],
      ], R`So $BC$ is perpendicular to the plane $(SAB)$.`],
    ],
    dr: [
      [R`Let $AH$ be perpendicular to a plane, with $AH=5$ and $HB=12$. Find $AB$.`, R`The length $AB$ is $13$.`, R`Triangle $AHB$ has its right angle at the foot of the perpendicular. The slanting segment is the hypotenuse.`],
      [R`If $AH=9$ and $AB=15$, with $AH$ perpendicular to the plane, how long is the projection $HB$?`, R`The projection $HB$ has length $12$.`, R`In the triangle with the right angle at $H$, the squared projection is the difference of the other two squares.`],
      [R`A line $d$ in the base plane is perpendicular to the projection $HB$. By the theorem of three perpendiculars, is $d$ perpendicular to $AB$?`, R`Yes. Being perpendicular to the projection is necessary and sufficient.`, R`The perpendicularity of $d$ and $AB$ is exactly what the theorem of three perpendiculars states; no lengths are needed.`],
    ],
  },
  "goc-kc": {
    s: R`The plane angle of a dihedral angle is formed by two lines perpendicular to the common edge at one point of it, one line in each face. The distance between the two parallel bases of a prism equals the prism's height.`,
    w: R`Two lines perpendicular to the common edge at one point measure exactly how far the faces open, like measuring the opening of a book with two edges of paper perpendicular to the spine. Distance is always measured along a perpendicular segment because that is the shortest one.`,
    p: R`Taking the angle between any two lines lying in the two faces. Both lines must be perpendicular to the common edge at the same point.`,
    ex: [
      [R`A regular pyramid has a square base of side $4$, the foot of the height $O$ is the centre of the base, and $SO=2$. Let $M$ be the midpoint of a base edge, so $OM=2$. Find the tangent of the plane angle of the dihedral angle between a lateral face and the base, given that this plane angle is $\widehat{SMO}$.`, [
        [R`Since $SO$ is perpendicular to the base and $OM$ is perpendicular to the base edge at $M$, the angle $\widehat{SMO}$ is a plane angle of the dihedral angle.`, R`The lines $OM$ and $SM$ are both perpendicular to the common edge at $M$, one in each face.`],
        [R`Triangle $SOM$ has a right angle at $O$, so $\tan\widehat{SMO}=\frac{SO}{OM}=\frac{2}{2}=1$. The angle is $45^\circ$.`, R`The side opposite the angle at $M$ is $SO$, and the adjacent side is $OM$. A tangent of $1$ gives $45^\circ$.`],
      ], R`The tangent of the plane angle is $1$, so the dihedral angle is $45^\circ$.`],
      [R`The cube $ABCD.A'B'C'D'$ has edge $a$. Find the distance from $A$ to the plane $(A'B'C'D')$ and the angle between $AC'$ and the base $(ABCD)$.`, [
        [R`The segment $AA'$ is perpendicular to the top plane, so the distance is $AA'=a$.`, R`The distance from a point to a plane is the length of the perpendicular dropped from that point.`],
        [R`The projection of $AC'$ onto the base is $AC=a\sqrt2$, and $CC'=a$, so $\tan\varphi=\frac{a}{a\sqrt2}=\frac{\sqrt2}{2}$.`, R`The angle between a line and a plane is the angle between the line and its projection onto the plane.`],
      ], R`The distance is $a$, and the angle $\varphi$ satisfies $\tan\varphi=\frac{\sqrt2}{2}$, about $35.3^\circ$.`],
    ],
    dr: [
      [R`For the same pyramid, if $SO=6$ and $OM=3$, what is the tangent of the plane angle?`, R`The tangent is $2$.`, R`The tangent of the plane angle is the height divided by the distance from the base centre to the base edge.`],
      [R`A prism has two parallel bases and height $9$. What is the distance between the two bases?`, R`The distance is $9$.`, R`The distance between the two parallel base planes is the height dropped perpendicularly onto the other base.`],
      [R`If $SO=OM=5$, how many degrees is the plane angle $\widehat{SMO}$?`, R`The angle is $45^\circ$.`, R`The tangent is $1$ when the two legs of the right triangle are equal.`],
    ],
  },
  "the-tich-11": {
    s: R`This lesson deals with prisms and pyramids whose bases are polygons. The volume of a prism is the base area times the height. The volume of a pyramid is one third of that product. The height is perpendicular to the base. A solid with a circular base is not a pyramid.`,
    w: R`A prism is a stack of equal base slices, so its volume is the base area times the height. A triangular prism can be cut into three pyramids of equal volume, so a pyramid is one third of the prism with the same base and height.`,
    p: R`Using a lateral edge of a pyramid or oblique prism as the height. The height is the perpendicular distance from the apex to the base.`,
    ex: [
      [R`A right prism has a right-triangle base with legs $3$ and $4$, and height $6$. Find the volume of the prism and of the pyramid with the same base and height.`, [
        [R`The base area is $\frac{1}{2}\cdot 3\cdot 4=6$. The prism's volume is $6\cdot 6=36$.`, R`The base is a polygon, here a right triangle. A prism takes the full product of base area and height.`],
        [R`The pyramid's volume is $\frac{1}{3}\cdot 6\cdot 6=12$.`, R`With the same polygonal base and the same height, the pyramid is one third of the prism.`],
      ], R`The prism has volume $36$ and the pyramid has volume $12$.`],
      [R`The pyramid $S.ABC$ has an equilateral base of side $6$ and height $SH=4$. Find its volume.`, [
        [R`The area of an equilateral triangle with side $6$ is $\frac{\sqrt3}{4}\cdot 36=9\sqrt3$.`, R`An equilateral triangle with side $a$ has area $\frac{\sqrt3}{4}a^2$.`],
        [R`The volume is $V=\frac{1}{3}\cdot 9\sqrt3\cdot 4=12\sqrt3$.`, R`A pyramid's volume is one third of the base area times the height.`],
      ], R`The volume of the pyramid is $12\sqrt3$.`],
    ],
    dr: [
      [R`A prism has a triangular base of area $10$ and height $4$. What is its volume?`, R`The volume is $40$.`, R`Polygonal base. A prism is not divided by three.`],
      [R`A pyramid has the same base of area $10$ and the same height $4$. What is its volume?`, R`The volume is $\frac{40}{3}$.`, R`A pyramid with a polygonal base takes one third of base times height.`],
      [R`A pyramid has a square base of side $6$ and height $5$. What is its volume?`, R`The volume is $60$.`, R`The polygonal base has area $36$. One third of $36\cdot 5$ is $60$.`],
    ],
  },
  "tb-nhom": {
    s: R`The mean of grouped data multiplies each group's representative value by its frequency, then divides by the sample size. The group containing the median is the one where the cumulative frequency first reaches at least half the sample size.`,
    w: R`Once data are grouped, the individual values are lost. Treating every element of a group as sitting at the group's midpoint gives a reasonable estimate of the mean.`,
    p: R`Averaging the representative values while ignoring the frequencies. A group with more elements must weigh more.`,
    ex: [
      [R`Three groups have representative values $5, 15, 25$ and frequencies $2, 3, 5$. Find the mean and the group containing the median.`, [
        [R`The mean is $\frac{2\cdot 5+3\cdot 15+5\cdot 25}{10}=18$.`, R`The sample size is $2+3+5=10$. Each representative value is multiplied by its group's frequency.`],
        [R`Half the sample size is $5$. The cumulative frequency goes $2$ then $2+3=5$, so the median is in the second group.`, R`The cumulative frequency first reaches $5$ at the group with representative value $15$.`],
      ], R`The mean is $18$. The median lies in the second group.`],
      [R`Self-study time of $20$ students: the group $[0,2)$ has $4$ students, $[2,4)$ has $10$, $[4,6)$ has $6$. Find the mean.`, [
        [R`The representative values of the three groups are $1$, $3$ and $5$.`, R`The representative value is the midpoint of each group.`],
        [R`The mean is $\bar x=\frac{4\cdot 1+10\cdot 3+6\cdot 5}{20}=\frac{64}{20}=3.2$.`, R`Multiply each representative value by its group's frequency, then divide by the sample size.`],
      ], R`The mean self-study time is about $3.2$ hours.`],
    ],
    dr: [
      [R`With the same frequency table, what is the cumulative frequency after the first two groups?`, R`The cumulative frequency is $5$.`, R`Add the frequencies in turn. This mark is exactly half the sample size.`],
      [R`What is the sample size for frequencies $2, 3, 5$?`, R`The sample size is $10$.`, R`The sample size is the total frequency, used as the denominator of the mean.`],
      [R`How much does the representative value $25$, with frequency $5$, contribute to the numerator of the mean?`, R`It contributes $125$.`, R`Each group contributes the product of its representative value and its frequency.`],
    ],
  },
  "tu-phan-vi-11": {
    s: R`The modal group is the group with the highest frequency. The group containing the first quartile is the one where the cumulative frequency first reaches at least a quarter of the sample size. The group containing the third quartile corresponds to three quarters of the sample size.`,
    w: R`The cumulative frequency counts the elements from the start to the end of each group. The group where that count first passes a quarter of the sample size holds the element at the quarter position.`,
    p: R`Comparing the mark $\frac{n}{4}$ with each group's own frequency. It must be compared with the cumulative frequency.`,
    ex: [
      [R`The sample size is $10$, with frequencies $2, 3, 5$. Which group is modal, and which cumulative frequency reaches the quarter mark?`, [
        [R`The highest frequency is $5$, so the third group is modal.`, R`The mode of grouped data lies in the group with the highest frequency. Exactly one group reaches frequency $5$.`],
        [R`A quarter of $10$ is $2.5$. The first group's cumulative frequency is $2$, not enough, so the mark lies in the second group.`, R`The cumulative frequency must reach at least $2.5$. The first group only has $2$.`],
      ], R`The modal group is the third. The first quartile lies in the second group.`],
      [R`Self-study time of $20$ students: the group $[0,2)$ has $4$ students, $[2,4)$ has $10$, $[4,6)$ has $6$. Which group is modal, and which contains the third quartile?`, [
        [R`The group $[2,4)$ has the highest frequency, $10$, so it is modal.`, R`The modal group is the one with the highest frequency.`],
        [R`Three quarters of the sample size is $15$. The cumulative frequencies are $4$, $14$, $20$, so $15$ is first reached in the group $[4,6)$.`, R`Compare the mark with the cumulative frequency, not with each group's own frequency.`],
      ], R`The mode is in $[2,4)$ and the third quartile is in $[4,6)$.`],
    ],
    dr: [
      [R`What is three quarters of a sample size of $10$?`, R`The mark is $7.5$.`, R`The third quartile uses the three-quarter mark of the sample size.`],
      [R`Does the cumulative frequency $2+3+5$ reach the mark $7.5$?`, R`Yes, because the total is $10$, more than $7.5$.`, R`The last cumulative frequency must equal the whole sample size.`],
      [R`Among the frequencies $4, 4, 1$, is there a single group with the highest frequency?`, R`No, two groups share the frequency $4$.`, R`When two groups share the highest frequency, there is no single modal group.`],
    ],
  },
  "hop-giao": {
    s: R`The union event $A\cup B$ happens when at least one of the two events happens. The intersection $A\cap B$ happens when both happen. If $A$ and $B$ are mutually exclusive, their intersection is the empty event.`,
    w: R`An event is a subset of the sample space, so the union and intersection of events are the union and intersection of sets. The counting formula for the union of two sets therefore carries over unchanged to probability.`,
    p: R`Confusing "or" with "and". The union needs at least one of the two to happen; the intersection needs both.`,
    ex: [
      [R`Given $P(A)=0.3$, $P(B)=0.4$ and $P(A\cap B)=0.1$, find $P(A\cup B)$.`, [
        [R`Use $P(A\cup B)=P(A)+P(B)-P(A\cap B)$.`, R`The intersection is counted twice if the two probabilities are simply added, so subtract it once.`],
        [R`The result is $0.3+0.4-0.1=0.6$.`, R`The three given numbers are all the formula needs. The probability of the union lies in $[0,1]$.`],
      ], R`The probability of the union is $0.6$.`],
      [R`In a class, $60\%$ of students like Maths, $50\%$ like Literature, and $30\%$ like both. One student is picked at random. Find the probability that they like at least one of the two subjects.`, [
        [R`Let $T$ be liking Maths and $V$ liking Literature. The event wanted is $T\cup V$.`, R`Liking at least one subject means liking Maths or liking Literature.`],
        [R`We have $P(T\cup V)=0.6+0.5-0.3=0.8$.`, R`Those who like both are added twice, so subtract them once.`],
      ], R`The probability is $0.8$.`],
    ],
    dr: [
      [R`Two mutually exclusive events have $P(A)=0.3$ and $P(B)=0.4$. What is the probability of their union?`, R`The probability of the union is $0.7$.`, R`The intersection is empty, so nothing is subtracted. The addition rule for mutually exclusive events is just a sum.`],
      [R`Given $P(A)=0.2$ and $P(B)=0.5$ for two mutually exclusive events, what is the probability of their union?`, R`The probability of the union is $0.7$.`, R`The intersection has probability $0$ when the events are mutually exclusive, so the addition rule subtracts nothing.`],
      [R`Given $P(A\cup B)=0.6$, $P(A)=0.3$ and $P(B)=0.4$, find $P(A\cap B)$.`, R`The probability of the intersection is $0.1$.`, R`Rearrange the union formula to find the intersection. The result is non-negative and does not exceed either probability.`],
    ],
  },
  "quy-tac-cong": {
    s: R`For any two events, $P(A\cup B)=P(A)+P(B)-P(A\cap B)$. If they are mutually exclusive, $P(A\cup B)=P(A)+P(B)$. This rule is an exact formula, not an estimate.`,
    w: R`Adding $P(A)$ and $P(B)$ counts the common part $A\cap B$ twice, so it must be subtracted once. When the events are mutually exclusive the common part is empty and there is nothing to subtract.`,
    p: R`Adding two probabilities directly when the events can happen together. The result is then too large, sometimes even greater than $1$.`,
    ex: [
      [R`One event has probability $\frac{1}{4}$, and an event mutually exclusive with it has probability $\frac{1}{2}$. What is the probability of their union?`, [
        [R`The events are mutually exclusive, so add the two probabilities directly.`, R`The intersection contributes nothing to subtract. The addition rule reduces to a plain sum.`],
        [R`The sum is $\frac{1}{4}+\frac{1}{2}=\frac{3}{4}$.`, R`Use the common denominator $4$. The probability of the union still does not exceed $1$.`],
      ], R`The probability of the union is $\frac{3}{4}$.`],
      [R`Draw one card at random from a standard $52$-card deck. Find the probability of a heart or an ace.`, [
        [R`There are $13$ hearts and $4$ aces, and $1$ card is both a heart and an ace.`, R`The two events overlap, so they are not mutually exclusive.`],
        [R`The probability is $\frac{13}{52}+\frac{4}{52}-\frac{1}{52}=\frac{16}{52}=\frac{4}{13}$.`, R`The general addition rule subtracts the probability of the common part.`],
      ], R`The probability of a heart or an ace is $\frac{4}{13}$.`],
    ],
    dr: [
      [R`Add $\frac{1}{5}$ and $\frac{2}{5}$ for two mutually exclusive events.`, R`The probability of the union is $\frac{3}{5}$.`, R`With the same denominator, add the numerators. Mutually exclusive events need no intersection subtracted.`],
      [R`If $P(A)=0.2$, $P(B)=0.5$ and $P(A\cap B)=0.1$, find $P(A\cup B)$.`, R`The probability of the union is $0.6$.`, R`The events are not mutually exclusive, so the intersection must be subtracted.`],
      [R`Find $P(A)+P(\overline A)$ when the two probabilities are $\frac{2}{5}$ and $\frac{3}{5}$.`, R`The sum is $1$.`, R`An event and its complement are mutually exclusive and together make up the whole sample space.`],
    ],
  },
  "doc-lap": {
    s: R`If $A$ and $B$ are independent, then $P(A\cap B)=P(A)P(B)$. This product rule is used when the problem states independence. Do not infer independence from a product that happens to match.`,
    w: R`Independence means that knowing $B$ happened does not change the chance of $A$. Among the times $B$ happens, $A$ still occurs in exactly the proportion $P(A)$, so both happen with probability $P(A)P(B)$.`,
    p: R`Confusing independent with mutually exclusive. Two mutually exclusive events with positive probabilities are not independent, because one happening rules out the other completely.`,
    ex: [
      [R`Two independent events have $P(A)=\frac{1}{2}$ and $P(B)=\frac{1}{5}$. Find $P(A\cap B)$.`, [
        [R`Because they are independent, the intersection has probability equal to the product of the two.`, R`The definition used here takes the product as the probability of the intersection. Independence must be stated in the problem.`],
        [R`The product is $\frac{1}{2}\cdot\frac{1}{5}=\frac{1}{10}$.`, R`Multiply numerators together and denominators together. The result is the probability of the intersection.`],
      ], R`The probability of the intersection is $\frac{1}{10}$.`],
      [R`Two shooters fire independently at a target, hitting with probabilities $0.8$ and $0.7$. Find the probability that the target is hit at least once.`, [
        [R`The probability that both miss is $0.2\cdot 0.3=0.06$.`, R`The two shots are independent, so the probability of both happening is the product.`],
        [R`The probability of at least one hit is $1-0.06=0.94$.`, R`At least one hit is the complement of both missing.`],
      ], R`The probability that the target is hit is $0.94$.`],
    ],
    dr: [
      [R`Two draws with replacement are treated as independent, and each draw gives red with probability $\frac{3}{5}$. What is the probability that both draws are red?`, R`The probability is $\frac{9}{25}$.`, R`With replacement and independent, so multiply the two probabilities. No need to list the whole sample space again.`],
      [R`If $P(A)=\frac{1}{4}$ and $A$ is independent of an event with probability $\frac{1}{2}$, what is the product?`, R`The product is $\frac{1}{8}$.`, R`The product rule for two independent events multiplies the two probabilities.`],
      [R`The intersection has probability $\frac{1}{10}$ and $P(B)=\frac{1}{5}$. If the events are independent, what is $P(A)$?`, R`The probability $P(A)$ is $\frac{1}{2}$.`, R`From the known product, divide by the probability that is not $0$ to find the other factor.`],
    ],
  },
};
