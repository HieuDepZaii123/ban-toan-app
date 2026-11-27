/** Bản tiếng Anh của các bài lớp 12 chi tiết (lop12extra2.ts). */
import type { LessonEn } from "./types.ts";

const R = String.raw;

export const g12Extra2En: Record<string, LessonEn> = {
  "nhan-dang-do-thi": {
    s: R`From a formula or a variation table we can read features of the graph. A cubic $y=ax^3+bx^2+cx+d$ crosses the y-axis at $y=d$, and has a maximum followed by a minimum when $a>0$. A linear-fractional function $y=\frac{ax+b}{cx+d}$ has vertical asymptote $x=-\frac{d}{c}$, horizontal asymptote $y=\frac{a}{c}$, and is increasing on each interval when $ad-bc>0$.`,
    w: R`The value $y(0)$ is exactly the constant term, and the extreme points are roots of the derivative. For a linear-fractional function the numerator of the derivative is $ad-bc$, so its sign decides whether the function increases or decreases.`,
    p: R`Confusing the horizontal asymptote with the vertical one, or taking the horizontal asymptote to be a ratio involving the constant terms. It is the ratio of the coefficients of $x$ in the numerator and denominator.`,
    ex: [
      [R`Read the features of the graph of $y=x^3-3x^2+2$.`, [
        [R`The graph crosses the y-axis at $y(0)=2$.`, R`Put $x=0$ in the formula; only the constant term remains.`],
        [R`The derivative $y'=3x^2-6x=3x(x-2)$ equals $0$ at $x=0$ and $x=2$.`, R`An extreme point must make the derivative equal to $0$.`],
        [R`Since $a=1>0$, $x=0$ is a maximum with $y(0)=2$, and $x=2$ is a minimum with $y(2)=-2$.`, R`With $a>0$ the sign of $y'$ is positive, negative, then positive, so the maximum comes before the minimum.`],
      ], R`The graph has maximum point $(0;\ 2)$ and minimum point $(2;\ -2)$.`],
      [R`Read the features of the graph of $y=\frac{2x-1}{x+1}$.`, [
        [R`The vertical asymptote is $x=-1$ and the horizontal asymptote is $y=2$.`, R`The denominator is $0$ at $x=-1$ while the numerator is not $0$; the ratio of the coefficients of $x$ is $\frac{2}{1}=2$.`],
        [R`The derivative $y'=\frac{3}{(x+1)^2}>0$, so the function is increasing on each interval of its domain.`, R`The numerator of $y'$ is $ad-bc=2\cdot1-(-1)\cdot1=3>0$.`],
        [R`The graph crosses the y-axis at $y(0)=-1$.`, R`Put $x=0$ in the formula.`],
      ], R`Vertical asymptote $x=-1$, horizontal asymptote $y=2$, increasing on each interval.`],
    ],
    dr: [
      [R`At what height does the graph of $y=x^3-3x+1$ meet the vertical axis?`, R`The height is $1$.`, R`Put $x=0$ in the formula to get $y=1$.`],
      [R`Find the horizontal asymptote of $y=\frac{3x+1}{x-2}$.`, R`The horizontal asymptote is $y=3$.`, R`The ratio of the coefficients of $x$ is $\frac{3}{1}=3$.`],
      [R`Is $y=\frac{x+2}{x-1}$ increasing or decreasing on each interval of its domain?`, R`It is decreasing on each interval of its domain.`, R`The derivative is $\frac{-3}{(x-1)^2}<0$ because $ad-bc=1\cdot(-1)-2\cdot1=-3$.`],
    ],
  },
  "tuong-giao": {
    s: R`The number of roots of $f(x)=k$ equals the number of intersections of the graph $y=f(x)$ with the horizontal line $y=k$. For a cubic with maximum $y_{CD}$ and minimum $y_{CT}$, the equation has three roots when $y_{CT}<k<y_{CD}$, two roots when $k$ equals one of those values, and one root when $k$ lies outside the interval $[y_{CT};\ y_{CD}]$.`,
    w: R`A root of $f(x)=k$ is the x-coordinate of an intersection of the graph with the line $y=k$. The number of intersections depends on where $k$ lies relative to the maximum and the minimum, so only those two values need computing.`,
    p: R`Counting a double root as two roots. When $k$ equals exactly an extreme value the line touches the graph, giving one double root that is still a single intersection.`,
    ex: [
      [R`How many real roots does $x^3-3x=1$ have?`, [
        [R`The function $f(x)=x^3-3x$ has $f'(x)=3x^2-3=0$ at $x=\pm1$.`, R`The extreme points are roots of the derivative.`],
        [R`The maximum is $f(-1)=2$ and the minimum is $f(1)=-2$.`, R`Substitute the two x-coordinates into the function.`],
        [R`Since $-2<1<2$, the line $y=1$ meets the graph at three points.`, R`The value $k=1$ lies between the minimum and the maximum.`],
      ], R`The equation has three real roots.`],
      [R`At how many points does the line $y=-4$ meet the graph of $y=x^3-3x^2$?`, [
        [R`The function has maximum $y(0)=0$ and minimum $y(2)=-4$.`, R`The derivative $3x^2-6x=0$ at $x=0$ and $x=2$.`],
        [R`The value $k=-4$ equals the minimum, so the line touches the graph at the minimum and meets it at one more point.`, R`The equation $x^3-3x^2+4=(x+1)(x-2)^2=0$ has a simple root $-1$ and a double root $2$.`],
      ], R`There are two intersections.`],
    ],
    dr: [
      [R`How many real roots does $x^3-3x^2=-2$ have?`, R`It has $3$ roots.`, R`The value $-2$ lies between the minimum $-4$ and the maximum $0$ of $y=x^3-3x^2$.`],
      [R`How many distinct real roots does $x^3-3x^2=0$ have?`, R`It has $2$ distinct roots.`, R`The value $0$ equals the maximum, so there is a double root $x=0$ and a simple root $x=3$.`],
      [R`How many real roots does $x^3-3x^2=1$ have?`, R`It has $1$ root.`, R`The value $1$ is greater than the maximum $0$, so the line $y=1$ meets the graph once.`],
    ],
  },
  "tham-so-cuc-tri": {
    s: R`A cubic $y=ax^3+bx^2+cx+d$ has two extreme points when $y'=0$ has two distinct roots, that is $\Delta'>0$. A function has an extremum at $x_0$ when $y'(x_0)=0$ and $y'$ changes sign at $x_0$; this can be checked with $y''(x_0)\ne0$.`,
    w: R`The derivative of a cubic is a quadratic. The function has two extreme points when the quadratic changes sign twice, that is, has two distinct roots, so the condition is a positive discriminant.`,
    p: R`Solving only $y'(x_0)=0$ without checking that the derivative changes sign. A double root makes the derivative $0$ but gives no sign change, so there is no extremum.`,
    ex: [
      [R`Find $m$ so that $y=x^3-3x^2+mx$ has two extreme points.`, [
        [R`We have $y'=3x^2-6x+m$, a quadratic trinomial.`, R`Two extreme points correspond to two distinct roots of $y'=0$.`],
        [R`We need $\Delta'=9-3m>0$.`, R`A quadratic has two distinct roots when its reduced discriminant is positive.`],
        [R`Hence $m<3$.`, R`Divide both sides of $9-3m>0$ by $3$ to get $m<3$.`],
      ], R`The function has two extreme points when $m<3$.`],
      [R`Find $m$ so that $y=x^3-3x^2+mx$ has an extremum at $x=2$.`, [
        [R`The necessary condition is $y'(2)=12-12+m=0$, so $m=0$.`, R`An extreme point must make the derivative equal to $0$.`],
        [R`With $m=0$ we have $y'=3x(x-2)$, which changes sign at $x=2$.`, R`Check the sufficient condition: the derivative must change sign.`],
      ], R`The required value is $m=0$.`],
    ],
    dr: [
      [R`Find $m$ so that $y=x^3-6x^2+mx$ has two extreme points.`, R`The condition is $m<12$.`, R`The derivative $3x^2-12x+m$ has $\Delta'=36-3m>0$, so $m<12$.`],
      [R`Find $m$ so that $y=x^3+3x^2+mx$ has a minimum at $x=1$.`, R`The required value is $m=-9$.`, R`From $y'(1)=3+6+m=0$ we get $m=-9$, and $y''(1)=6+6=12>0$, so it is a minimum.`],
      [R`How many integers $m$ in $[-5;\ 5]$ make $y=x^3-3x^2+mx+1$ have two extreme points?`, R`There are $8$ integer values of $m$.`, R`The condition is $m<3$, so the integers from $-5$ to $2$ count: $2-(-5)+1=8$ numbers.`],
    ],
  },
  "tiep-tuyen-hs": {
    s: R`The tangent to $y=f(x)$ at the point with x-coordinate $x_0$ has equation $y=f'(x_0)(x-x_0)+f(x_0)$. Its slope is $f'(x_0)$. Parallel lines have equal slopes, and lines are perpendicular when the product of their slopes is $-1$.`,
    w: R`The derivative at a point is the slope of the line that hugs the graph there. Knowing the slope and one point on the line gives its equation.`,
    p: R`Using an arbitrary point instead of the point of tangency, or forgetting to check whether the tangent found coincides with the given line when the problem asks for a parallel one.`,
    ex: [
      [R`Write the tangent to $y=x^3-3x$ at the point with x-coordinate $x=2$.`, [
        [R`We have $y(2)=8-6=2$ and $y'(x)=3x^2-3$, so $y'(2)=9$.`, R`We need the point of tangency and the slope there.`],
        [R`The equation is $y=9(x-2)+2=9x-16$.`, R`Substitute into $y=f'(x_0)(x-x_0)+f(x_0)$.`],
      ], R`The tangent is $y=9x-16$.`],
      [R`Write a tangent to $y=x^3-3x$ parallel to the line $y=-3x+5$.`, [
        [R`The slope must be $-3$, so $3x^2-3=-3$, that is $x=0$.`, R`Parallel lines have equal slopes.`],
        [R`The point of tangency is $(0;\ 0)$ since $y(0)=0$, so the tangent is $y=-3x$.`, R`This tangent differs from the given line because it does not pass through $(0;\ 5)$.`],
      ], R`The tangent is $y=-3x$.`],
    ],
    dr: [
      [R`What is the slope of the tangent to $y=x^2-4x$ at $x=3$?`, R`The slope is $2$.`, R`We have $y'=2x-4$, so $y'(3)=2$.`],
      [R`Write the tangent to $y=x^2$ at the point with x-coordinate $x=1$.`, R`The tangent is $y=2x-1$.`, R`The slope is $y'(1)=2$ and $y(1)=1$, so $y=2(x-1)+1=2x-1$.`],
      [R`How many tangents to the graph of $y=x^3$ are perpendicular to the line $y=-\frac{x}{3}$?`, R`There are $2$ tangents, because $3x^2=3$ has two roots.`, R`The slope must be $3$ because $3\cdot\left(-\frac{1}{3}\right)=-1$, so $3x^2=3$ gives the two x-coordinates $x=\pm1$.`],
    ],
  },
  "tp-tuyet-doi": {
    s: R`To compute $\int_a^b |f(x)|\,dx$, find the roots of $f(x)=0$ in $[a;\ b]$, split the interval at those roots, remove the absolute value according to the sign of $f$ on each piece, and add the integrals.`,
    w: R`The absolute value changes its formula where the function changes sign. After splitting at the roots, the expression inside has a fixed sign on each piece, so the absolute value can be removed.`,
    p: R`Integrating $f(x)$ over the whole interval first and then taking the absolute value. The two give different results when $f$ changes sign, because the negative parts are subtracted.`,
    ex: [
      [R`Compute $\displaystyle\int_0^3 |x-1|\,dx$.`, [
        [R`The function $x-1$ changes sign at $x=1$: negative on $[0;\ 1]$ and positive on $[1;\ 3]$.`, R`The root of $x-1=0$ splits the interval into two pieces.`],
        [R`We get $\displaystyle\int_0^1(1-x)\,dx+\int_1^3(x-1)\,dx=\frac{1}{2}+2$.`, R`On each piece replace $|x-1|$ by $1-x$ or $x-1$.`],
      ], R`The value is $\frac{5}{2}$.`],
      [R`Compute $\displaystyle\int_{-1}^2 |x^2-1|\,dx$.`, [
        [R`We have $x^2-1=0$ at $x=-1$ and $x=1$; on $[-1;\ 1]$ we have $x^2-1\le0$ and on $[1;\ 2]$ we have $x^2-1\ge0$.`, R`Study the sign of the quadratic on each piece.`],
        [R`We get $\displaystyle\int_{-1}^1(1-x^2)\,dx+\int_1^2(x^2-1)\,dx=\frac{4}{3}+\frac{4}{3}$.`, R`The two integrals are $2-\frac{2}{3}$ and $\frac{7}{3}-1$ respectively.`],
      ], R`The value is $\frac{8}{3}$.`],
    ],
    dr: [
      [R`Compute $\displaystyle\int_0^4 |x-2|\,dx$.`, R`The value is $4$.`, R`Split at $x=2$: $\int_0^2(2-x)\,dx=2$ and $\int_2^4(x-2)\,dx=2$.`],
      [R`Compute $\displaystyle\int_{-2}^1 |x|\,dx$.`, R`The value is $\frac{5}{2}$.`, R`Split at $x=0$: $\int_{-2}^0(-x)\,dx=2$ and $\int_0^1 x\,dx=\frac{1}{2}$.`],
      [R`Compute $\displaystyle\int_0^{\pi}|\cos x|\,dx$.`, R`The value is $2$.`, R`Split at $x=\frac{\pi}{2}$: each piece gives $1$, so the total is $2$.`],
    ],
  },
  "tp-chan-le": {
    s: R`If $f$ is odd then $\int_{-a}^a f(x)\,dx=0$. If $f$ is even then $\int_{-a}^a f(x)\,dx=2\int_0^a f(x)\,dx$. An arbitrary function can be split into an even part and an odd part, and each property applied separately.`,
    w: R`For an odd function the area on the left of the vertical axis is opposite in sign to the area on the right, so the two cancel. For an even function the two parts are equal, so the integral is twice the right-hand part.`,
    p: R`Applying the property to an interval that is not symmetric such as $[-1;\ 2]$, or treating a function with both kinds of terms as odd. Split into separate terms first.`,
    ex: [
      [R`Compute $\displaystyle\int_{-2}^2 (x^3+x)\,dx$.`, [
        [R`The function $f(x)=x^3+x$ is odd because $f(-x)=-f(x)$.`, R`Each term $x^3$ and $x$ changes sign when $x$ is replaced by $-x$.`],
        [R`The interval $[-2;\ 2]$ is symmetric about $0$, so the integral is $0$.`, R`The areas on the two sides of the vertical axis cancel.`],
      ], R`The value is $0$.`],
      [R`Compute $\displaystyle\int_{-1}^1 (3x^2+x)\,dx$.`, [
        [R`Split off $3x^2$, which is even, and $x$, which is odd.`, R`An even function has $f(-x)=f(x)$ and an odd function has $f(-x)=-f(x)$.`],
        [R`We get $\displaystyle 2\int_0^1 3x^2\,dx+0=2\cdot1=2$.`, R`The odd part gives $0$; the even part is twice the integral over $[0;\ 1]$.`],
      ], R`The value is $2$.`],
    ],
    dr: [
      [R`Compute $\displaystyle\int_{-3}^3 x^5\,dx$.`, R`The value is $0$.`, R`The function $x^5$ is odd, so its integral over a symmetric interval is $0$.`],
      [R`Compute $\displaystyle\int_{-2}^2 x^2\,dx$.`, R`The value is $\frac{16}{3}$.`, R`The function $x^2$ is even, so the integral equals $2\int_0^2 x^2\,dx=2\cdot\frac{8}{3}$.`],
      [R`Compute $\displaystyle\int_{-1}^1 (x^4+x^3)\,dx$.`, R`The value is $\frac{2}{5}$.`, R`The odd part $x^3$ gives $0$ and the even part gives $2\int_0^1 x^4\,dx=\frac{2}{5}$.`],
    ],
  },
  "dt-hai-do-thi": {
    s: R`The area of the region bounded by the graphs $y=f(x)$ and $y=g(x)$ is $\int_a^b|f(x)-g(x)|\,dx$, where $a$ and $b$ are consecutive x-coordinates of the intersections. When the graphs cross several times, split the interval at every intersection and take the upper function minus the lower function on each piece.`,
    w: R`The area is the integral of the upper function minus the lower function, because this difference is the height of a thin strip at each $x$. The intersections are where the two functions swap places.`,
    p: R`Taking the difference in a fixed order over the whole interval even though the graphs cross in between. Then the negative parts are subtracted from the positive ones and the area comes out too small.`,
    ex: [
      [R`Find the area of the region bounded by $y=x^2$ and $y=x+2$.`, [
        [R`The x-coordinates of the intersections: $x^2=x+2\iff x^2-x-2=0$, so $x=-1$ or $x=2$.`, R`Solve the equation of intersections to find the limits.`],
        [R`On $[-1;\ 2]$ the line lies above the parabola, so $S=\displaystyle\int_{-1}^2(x+2-x^2)\,dx=\frac{9}{2}$.`, R`Take upper minus lower, for instance at $x=0$: $2>0$.`],
      ], R`The area is $\frac{9}{2}$.`],
      [R`Find the area of the region bounded by $y=x^3$ and $y=x$.`, [
        [R`The x-coordinates of the intersections: $x^3=x$ gives $x=-1$, $x=0$, $x=1$.`, R`The equation $x(x-1)(x+1)=0$ has three roots.`],
        [R`The two parts are symmetric: $S=\displaystyle\int_{-1}^0(x^3-x)\,dx+\int_0^1(x-x^3)\,dx=\frac{1}{4}+\frac{1}{4}$.`, R`On $[-1;\ 0]$ the graph $y=x^3$ is above, and on $[0;\ 1]$ the line is above.`],
      ], R`The area is $\frac{1}{2}$.`],
    ],
    dr: [
      [R`Find the area of the region bounded by $y=x^2$ and $y=4$.`, R`The area is $\frac{32}{3}$.`, R`The intersections are at $x=\pm2$ and $S=\int_{-2}^2(4-x^2)\,dx=16-\frac{16}{3}$.`],
      [R`Find the area of the region bounded by $y=x^2-2x$ and the axis $Ox$.`, R`The area is $\frac{4}{3}$.`, R`The intersections with $Ox$ are at $x=0$ and $x=2$, and the parabola is below the axis, so $S=\int_0^2(2x-x^2)\,dx$.`],
      [R`Find the area of the region bounded by $y=x^2$ and $y=x^3$.`, R`The area is $\frac{1}{12}$.`, R`The intersections are at $x=0$ and $x=1$, where $x^2\ge x^3$, so $S=\frac{1}{3}-\frac{1}{4}$.`],
    ],
  },
  "tp-huu-ti": {
    s: R`An antiderivative of $\frac{1}{x}$ is $\ln|x|+C$, and an antiderivative of $\frac{u'(x)}{u(x)}$ is $\ln|u(x)|+C$. So integrals of the forms $\int\frac{dx}{x+a}$ and $\int\frac{2x}{x^2+1}\,dx$ both lead to logarithms.`,
    w: R`The derivative of $\ln|u|$ is $\frac{u'}{u}$, so an integral whose numerator is the derivative of the denominator returns to $\ln$. If the numerator is only a constant times the derivative of the denominator, move the constant outside.`,
    p: R`Writing the antiderivative of $\frac{1}{x+1}$ as $\frac{1}{(x+1)^2}$, or forgetting the factor when the numerator is not exactly the derivative of the denominator; for example $\frac{x}{x^2+1}$ needs an extra $\frac{1}{2}$.`,
    ex: [
      [R`Compute $\displaystyle\int_0^1\frac{1}{x+1}\,dx$.`, [
        [R`An antiderivative of $\frac{1}{x+1}$ is $\ln|x+1|$.`, R`The derivative of $\ln|x+1|$ is $\frac{1}{x+1}$.`],
        [R`The value is $\ln2-\ln1=\ln2$.`, R`Take the value at the upper limit minus the value at the lower limit, with $\ln1=0$.`],
      ], R`The value is $\ln2$.`],
      [R`Compute $\displaystyle\int_0^1\frac{2x}{x^2+1}\,dx$.`, [
        [R`Let $u=x^2+1$, then $u'=2x$, so the expression has the form $\frac{u'}{u}$.`, R`The numerator is exactly the derivative of the denominator.`],
        [R`The value is $\ln(x^2+1)\Big|_0^1=\ln2-\ln1=\ln2$.`, R`An antiderivative of $\frac{u'}{u}$ is $\ln|u|$.`],
      ], R`The value is $\ln2$.`],
    ],
    dr: [
      [R`Compute $\displaystyle\int_0^2\frac{1}{x+1}\,dx$.`, R`The value is $\ln3$.`, R`An antiderivative is $\ln|x+1|$, and $\ln3-\ln1=\ln3$.`],
      [R`Compute $\displaystyle\int_1^2\frac{3}{x}\,dx$.`, R`The value is $3\ln2$.`, R`An antiderivative is $3\ln|x|$, and $3\ln2-3\ln1=3\ln2$.`],
      [R`Compute $\displaystyle\int_0^1\frac{x}{x^2+1}\,dx$.`, R`The value is $\frac{1}{2}\ln2$.`, R`Write $\frac{x}{x^2+1}=\frac{1}{2}\cdot\frac{2x}{x^2+1}$, so the value is $\frac{1}{2}\ln2$.`],
    ],
  },
  "kc-hai-dt": {
    s: R`Two skew lines: $\Delta_1$ through $A$ with direction vector $\vec{u_1}$, and $\Delta_2$ through $B$ with direction vector $\vec{u_2}$. The distance between them is $d=\frac{\left|\left[\vec{u_1},\vec{u_2}\right]\cdot\overrightarrow{AB}\right|}{\left|\left[\vec{u_1},\vec{u_2}\right]\right|}$.`,
    w: R`The volume of a parallelepiped built on three vectors is the scalar triple product, and the base area is the length of the cross product. The height, which is the distance between the two lines, is the quotient of those two quantities.`,
    p: R`Forgetting the absolute value of the triple product, or using this formula for lines that meet or are parallel. Then the triple product is $0$ or the cross product is $0$.`,
    ex: [
      [R`Find the distance between $\Delta_1$ through $A(0;\ 0;\ 0)$ with $\vec{u_1}=(1;\ 0;\ 0)$ and $\Delta_2$ through $B(0;\ 1;\ 1)$ with $\vec{u_2}=(0;\ 1;\ 0)$.`, [
        [R`The cross product is $\left[\vec{u_1},\vec{u_2}\right]=(0;\ 0;\ 1)$ and $\overrightarrow{AB}=(0;\ 1;\ 1)$.`, R`The cross product of the two direction vectors is perpendicular to both lines.`],
        [R`The dot product is $(0;\ 0;\ 1)\cdot(0;\ 1;\ 1)=1$ and the length is $\left|\left[\vec{u_1},\vec{u_2}\right]\right|=1$, so $d=1$.`, R`Substitute into the distance formula.`],
      ], R`The distance is $1$.`],
      [R`Find the distance between $\Delta_1$ through $A(0;\ 0;\ 0)$ with $\vec{u_1}=(1;\ 1;\ 0)$ and $\Delta_2$ through $B(1;\ 0;\ 2)$ with $\vec{u_2}=(0;\ 1;\ 1)$.`, [
        [R`The cross product is $\left[\vec{u_1},\vec{u_2}\right]=(1;\ -1;\ 1)$ and $\overrightarrow{AB}=(1;\ 0;\ 2)$.`, R`Compute $1\cdot1-0\cdot1$, $0\cdot0-1\cdot1$ and $1\cdot1-1\cdot0$ for the three coordinates.`],
        [R`The dot product is $1+0+2=3$ and the length is $\sqrt{3}$, so $d=\frac{3}{\sqrt{3}}=\sqrt{3}$.`, R`Simplify the fraction by dividing numerator and denominator by $\sqrt{3}$.`],
      ], R`The distance is $\sqrt{3}$.`],
    ],
    dr: [
      [R`The line $\Delta_1$ passes through $O$ with $\vec{u_1}=(2;\ 0;\ 0)$ and the line $\Delta_2$ passes through $B(1;\ 5;\ 4)$ with $\vec{u_2}=(0;\ 3;\ 0)$. Find the distance between them.`, R`The distance is $4$.`, R`The cross product is $(0;\ 0;\ 6)$, its dot product with $\overrightarrow{OB}$ is $24$ and its length is $6$, so $d=\frac{24}{6}=4$.`],
      [R`Two lines have $\vec{u_1}=(1;\ 2;\ 3)$ and $\vec{u_2}=(2;\ 4;\ 6)$. Can the formula for the distance between skew lines be used?`, R`No, because the vectors are parallel so the cross product is $\vec0$.`, R`The cross product is $\vec0$, so the denominator of the formula is $0$, and the lines are parallel or coincide.`, [], ["It can be used.", "It cannot be used."]],
      [R`Find the distance between $\Delta_1$ through $O(0;\ 0;\ 0)$ with $\vec{u_1}=(1;\ 0;\ 0)$ and $\Delta_2$ through $B(0;\ 0;\ 3)$ with $\vec{u_2}=(0;\ 1;\ 0)$.`, R`The distance is $3$.`, R`The cross product is $(0;\ 0;\ 1)$, its dot product with $\overrightarrow{OB}$ is $3$ and its length is $1$, so $d=3$.`],
    ],
  },
  "mat-cau-tx": {
    s: R`A plane $(P)$ is tangent to the sphere with centre $I$ and radius $R$ when the distance $d(I;\ (P))=R$. The distance from $I(x_0;\ y_0;\ z_0)$ to $(P):\ Ax+By+Cz+D=0$ is $\frac{|Ax_0+By_0+Cz_0+D|}{\sqrt{A^2+B^2+C^2}}$.`,
    w: R`A tangent plane touches the sphere at exactly one point, so the distance from the centre to the plane equals the radius. If it is smaller the plane cuts the sphere, and if larger there is no common point.`,
    p: R`Forgetting the absolute value in the numerator and so accepting only one value of the parameter. The equation $|u|=k$ always gives two cases, $u=k$ and $u=-k$.`,
    ex: [
      [R`Is the sphere with centre $I(1;\ 2;\ 3)$ and radius $2$ tangent to the plane $(P):\ x+2y+2z-5=0$?`, [
        [R`The distance is $d=\frac{|1+4+6-5|}{\sqrt{1+4+4}}=\frac{6}{3}=2$.`, R`Substitute the centre into the left side and divide by the length of the normal vector $(1;\ 2;\ 2)$.`],
        [R`Since $d=2=R$, the plane is tangent to the sphere.`, R`The distance from the centre to the plane equals the radius.`],
      ], R`Yes, the plane is tangent to the sphere.`],
      [R`Find $D$ so that the plane $(P):\ x+2y+2z+D=0$ is tangent to the sphere with centre $I(1;\ 2;\ 3)$ and radius $2$.`, [
        [R`The condition is $\frac{|1+4+6+D|}{3}=2$, that is $|11+D|=6$.`, R`The distance from $I$ to $(P)$ must equal the radius.`],
        [R`Hence $11+D=6$ or $11+D=-6$, so $D=-5$ or $D=-17$.`, R`Remove the absolute value in two cases.`],
      ], R`$D=-5$ or $D=-17$.`],
    ],
    dr: [
      [R`Find the distance from $I(0;\ 0;\ 0)$ to the plane $2x+y+2z-9=0$.`, R`The distance is $3$.`, R`We have $\frac{|-9|}{\sqrt{4+1+4}}=\frac{9}{3}=3$.`],
      [R`Find the positive $D$ so that the plane $x+2y+2z+D=0$ is tangent to the sphere with centre $O$ and radius $3$.`, R`The required value is $D=9$.`, R`We need $\frac{|D|}{\sqrt{1+4+4}}=3$, that is $|D|=9$, and we take the positive value $D=9$.`],
      [R`Find the radius of the sphere with centre $I(1;\ 1;\ 1)$ tangent to the plane $x+y+z-6=0$ (answer in the form $\sqrt{3}$).`, R`The radius is $\sqrt{3}$.`, R`The radius equals the distance $\frac{|3-6|}{\sqrt{3}}=\frac{3}{\sqrt{3}}=\sqrt{3}$.`],
    ],
  },
  "hinh-chieu-dx": {
    s: R`The projection $H$ of $M$ onto the plane $(P):\ Ax+By+Cz+D=0$ is $H=M-t\vec{n}$ with $\vec{n}=(A;\ B;\ C)$ and $t=\frac{AM_x+BM_y+CM_z+D}{A^2+B^2+C^2}$. The reflection $M'$ of $M$ in $(P)$ is $M'=M-2t\vec{n}$, that is, $H$ is the midpoint of $MM'$.`,
    w: R`The projection of $M$ lies on the line through $M$ perpendicular to the plane, so we go from $M$ along the normal vector. The reflection goes twice that distance.`,
    p: R`Getting the sign of $t$ wrong and going the wrong way, or taking the projection as the reflection. The projection is the midpoint of the segment joining $M$ to its reflection.`,
    ex: [
      [R`Find the projection and the reflection of $M(1;\ 2;\ 3)$ in the plane $(P):\ x+y+z-3=0$.`, [
        [R`We have $\vec{n}=(1;\ 1;\ 1)$ and $t=\frac{1+2+3-3}{3}=1$.`, R`Substitute the coordinates of $M$ into the left side and divide by $A^2+B^2+C^2=3$.`],
        [R`The projection is $H=M-\vec{n}=(0;\ 1;\ 2)$.`, R`Go from $M$ against the normal by $t\vec{n}$.`],
        [R`The reflection is $M'=M-2\vec{n}=(-1;\ 0;\ 1)$.`, R`$H$ is the midpoint of $MM'$, so $M'=2H-M$.`],
      ], R`The projection is $H(0;\ 1;\ 2)$ and the reflection is $M'(-1;\ 0;\ 1)$.`],
      [R`Find the reflection of $M(4;\ 2;\ 4)$ in the plane $(P):\ 2x+y+2z-9=0$.`, [
        [R`We have $\vec{n}=(2;\ 1;\ 2)$ and $t=\frac{8+2+8-9}{9}=1$.`, R`Substitute the coordinates of $M$ and divide by $4+1+4=9$.`],
        [R`The projection is $H=M-\vec{n}=(2;\ 1;\ 2)$ and the reflection is $M'=M-2\vec{n}=(0;\ 0;\ 0)$.`, R`Subtract the normal vector once and twice from $M$.`],
      ], R`The reflection is $M'(0;\ 0;\ 0)$.`],
    ],
    dr: [
      [R`Find $t$ for the point $M(2;\ 0;\ 0)$ and the plane $x+y+z-1=0$.`, R`The value is $t=\frac{1}{3}$.`, R`We have $\frac{2-1}{3}=\frac{1}{3}$.`],
      [R`Find the reflection $M'$ of $M(1;\ 2;\ 3)$ in the plane $x+y+z-9=0$ and then the sum of the three coordinates of $M'$.`, R`The sum of the coordinates is $12$, since $M'=(3;\ 4;\ 5)$.`, R`We have $t=\frac{6-9}{3}=-1$, so $M'=M-2t\vec{n}=(1;\ 2;\ 3)+2(1;\ 1;\ 1)=(3;\ 4;\ 5)$.`],
      [R`Find the x-coordinate of the projection of $M(2;\ 2;\ 2)$ onto the plane $x+y+z-3=0$.`, R`The x-coordinate is $1$.`, R`We have $t=\frac{3}{3}=1$ and the x-coordinate is $2-1\cdot1=1$.`],
    ],
  },
};
