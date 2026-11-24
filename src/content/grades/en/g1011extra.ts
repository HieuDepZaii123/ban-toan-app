/** Bản tiếng Anh của lớp 10 và 11 chi tiết (lop1011extra.ts). */
import type { LessonEn } from "./types.ts";

const R = String.raw;

export const g10Extra2En: Record<string, LessonEn> = {
  "tap-xac-dinh": {
    s: R`The domain of a function is the set of values of $x$ for which the expression makes sense. A denominator must differ from $0$, an expression under a square root must be non-negative, and an expression under a square root that sits in a denominator must be positive.`,
    w: R`Division by $0$ and the square root of a negative number have no meaning among real numbers, so each part of the expression sets a condition on $x$. The domain is the part common to all these conditions.`,
    p: R`Forgetting that an expression under a root in a denominator must be positive, not just non-negative, and so accepting a value that makes the denominator $0$.`,
    ex: [
      [R`Find the domain of $y=\frac{x+1}{x^2-4}$.`, [
        [R`The function is defined when the denominator differs from $0$, that is $x^2-4\ne0$.`, R`A fraction only makes sense when its denominator differs from $0$.`],
        [R`We have $x^2-4=0$ when $x=2$ or $x=-2$, so these two values are excluded.`, R`Solve the equation that sets the denominator equal to $0$ to see which values must be removed.`],
      ], R`The domain is $\mathbb{R}\setminus\{-2;\ 2\}$.`],
      [R`Find the domain of $y=\sqrt{3-x}$.`, [
        [R`The expression under the root must be non-negative, that is $3-x\ge0$.`, R`The square root of a negative number has no meaning among real numbers.`],
        [R`Hence $x\le3$, because $3-x=0$ at $x=3$ and $3-x$ decreases as $x$ increases.`, R`The point $x=3$ makes the expression equal to $0$, so it belongs to the domain.`],
      ], R`The domain is $(-\infty;\ 3]$.`],
    ],
    dr: [
      [R`At which value of $x$ is the function $y=\frac{1}{x+5}$ undefined?`, R`At $x=-5$.`, R`The denominator is $0$ when $x+5=0$, that is $x=-5$.`],
      [R`What is the smallest value of $x$ for which $\sqrt{2x-6}$ makes sense?`, R`The smallest value is $3$.`, R`We need $2x-6\ge0$, that is $x\ge3$.`],
      [R`How many integers $x$ lie in the domain of $y=\sqrt{6-x}+\sqrt{x+2}$?`, R`There are $9$ integers.`, R`We need $6-x\ge0$ and $x+2\ge0$, that is $-2\le x\le6$, which has $6-(-2)+1=9$ integers.`],
    ],
  },
  "chan-le": {
    s: R`A function $f$ whose domain is symmetric about $0$ is called even if $f(-x)=f(x)$ for all $x$, and odd if $f(-x)=-f(x)$ for all $x$. The graph of an even function is symmetric about the vertical axis, and that of an odd function is symmetric about the origin.`,
    w: R`Replacing $x$ by $-x$ is a reflection in the vertical axis. If the value does not change the graph is symmetric about the vertical axis, and if it changes sign the graph is symmetric about the origin.`,
    p: R`Drawing a conclusion from one particular value. A single pair of values is enough to rule out a property, but to assert it one must prove it for all $x$ and check that the domain is symmetric.`,
    ex: [
      [R`Decide whether $f(x)=x^4-2x^2$ is even or odd.`, [
        [R`The domain is $\mathbb{R}$, which is symmetric about $0$.`, R`The first condition is that the domain must be symmetric.`],
        [R`We have $f(-x)=(-x)^4-2(-x)^2=x^4-2x^2=f(x)$.`, R`An even power of $-x$ equals the same power of $x$.`],
      ], R`The function $f$ is even.`],
      [R`Decide whether $f(x)=x^2+x$ is even or odd.`, [
        [R`Test at $x=1$: $f(1)=2$ and $f(-1)=0$.`, R`One pair of values is enough to rule out a property.`],
        [R`Since $f(-1)=0$ differs from $f(1)=2$ and from $-f(1)=-2$, the function is neither even nor odd.`, R`Even needs $f(-1)=f(1)$ and odd needs $f(-1)=-f(1)$.`],
      ], R`The function is neither even nor odd.`],
    ],
    dr: [
      [R`Let $f(x)=x^3-3x$. Compute $f(2)+f(-2)$ to decide whether the function is even or odd.`, R`It equals $0$, so the function is odd.`, R`An odd function has $f(-2)=-f(2)$, so the two values add up to $0$.`],
      [R`For $f(x)=x^2+1$, what is $f(3)-f(-3)$?`, R`It equals $0$.`, R`The function is even, so $f(-3)=f(3)$ and the difference is $0$.`],
      [R`Find $m$ so that $f(x)=x^3+mx^2$ is an odd function.`, R`The required value is $m=0$.`, R`An odd function needs $f(1)+f(-1)=2m=0$, and for $m=0$ we get $f(x)=x^3$, which is indeed odd.`],
    ],
  },
  "tinh-tien-do-thi": {
    s: R`The graph of $y=f(x)+a$ is obtained from the graph of $y=f(x)$ by translating it up by $a$ units. The graph of $y=f(x-b)$ is obtained by translating it to the right by $b$ units. Negative numbers give the opposite direction.`,
    w: R`A point $(x;\ y)$ lies on the new graph $y=f(x-b)$ when $(x-b;\ y)$ lies on the old graph, so every point moves right by $b$ units. Adding $a$ to $f$ raises every height by $a$.`,
    p: R`Getting the direction of a horizontal translation wrong: $f(x+1)$ shifts to the left, not to the right, because the sign inside the bracket is opposite to the direction of the shift.`,
    ex: [
      [R`The graph of $y=x^2$ is translated $2$ units right and $3$ units up. Write the new function and find its vertex.`, [
        [R`Translating $2$ units right replaces $x$ by $x-2$, and then up $3$ units adds $3$.`, R`The two translations use the two rules above.`],
        [R`The new function is $y=(x-2)^2+3$, with vertex $(2;\ 3)$.`, R`The vertex $(0;\ 0)$ of $y=x^2$ moves with the translation to $(2;\ 3)$.`],
      ], R`The new function is $y=(x-2)^2+3$ with vertex $(2;\ 3)$.`],
      [R`The graph of $y=x^2$ is translated $1$ unit left and $2$ units down. Find the value of the new function at $x=0$.`, [
        [R`Moving $1$ unit left replaces $x$ by $x+1$, and moving $2$ units down subtracts $2$.`, R`The leftward direction corresponds to the plus sign in the bracket.`],
        [R`The new function is $y=(x+1)^2-2$, so at $x=0$ we get $y=1-2=-1$.`, R`Substitute $x=0$ into the new function.`],
      ], R`The value at $x=0$ is $-1$.`],
    ],
    dr: [
      [R`The graph of $y=x^2$ is translated $3$ units to the right. What value does the new function take at $x=3$?`, R`The value is $0$.`, R`The new function is $y=(x-3)^2$, so at $x=3$ we get $y=0$.`],
      [R`The graph of $y=x^2$ is translated $5$ units up. What value does the new function take at $x=0$?`, R`The value is $5$.`, R`The new function is $y=x^2+5$, so at $x=0$ we get $y=5$.`],
      [R`The graph of $y=x^2$ is translated $2$ units right and $b$ units up, and then passes through the point $(0;\ 7)$. Find $b$.`, R`The required value is $b=3$.`, R`The new function is $y=(x-2)^2+b$, and substituting $(0;\ 7)$ gives $4+b=7$, so $b=3$.`],
    ],
  },
  "don-dieu-bac-hai": {
    s: R`The function $y=ax^2+bx+c$ has its vertex at $x=-\frac{b}{2a}$. When $a>0$ the function is decreasing on the interval to the left of the vertex and increasing on the interval to the right, while for $a<0$ it is the other way round.`,
    w: R`A parabola is symmetric about the line through its vertex, so the direction of variation changes at the x-coy-coordinate of the vertex. With $a>0$ the vertex is the lowest point, so on both sides the values increase as we move away from it.`,
    p: R`Getting the sign of the x-coy-coordinate $-\frac{b}{2a}$ of the vertex wrong, or forgetting to check the sign of $a$ before saying increasing or decreasing.`,
    ex: [
      [R`Study the variation of $y=x^2-4x+1$.`, [
        [R`The x-coy-coordinate of the vertex is $-\frac{-4}{2\cdot1}=2$.`, R`Substitute $a=1$ and $b=-4$ into $-\frac{b}{2a}$.`],
        [R`Since $a=1>0$, the function is decreasing on $(-\infty;\ 2)$ and increasing on $(2;\ +\infty)$.`, R`The parabola opens upwards, so the values fall and then rise around the vertex.`],
      ], R`Decreasing on $(-\infty;\ 2)$ and increasing on $(2;\ +\infty)$.`],
      [R`Study the variation of $y=-2x^2+8x$.`, [
        [R`The x-coy-coordinate of the vertex is $-\frac{8}{2\cdot(-2)}=2$.`, R`Substitute $a=-2$ and $b=8$ into the formula.`],
        [R`Since $a=-2<0$, the function is increasing on $(-\infty;\ 2)$ and decreasing on $(2;\ +\infty)$.`, R`The parabola opens downwards, so the values rise and then fall around the vertex.`],
      ], R`Increasing on $(-\infty;\ 2)$ and decreasing on $(2;\ +\infty)$.`],
    ],
    dr: [
      [R`Find the x-coy-coordinate of the vertex of $y=x^2+6x$.`, R`The x-coy-coordinate of the vertex is $-3$.`, R`We have $-\frac{6}{2\cdot1}=-3$.`],
      [R`Find the x-coy-coordinate of the vertex of $y=-x^2+2x-5$.`, R`The x-coy-coordinate of the vertex is $1$.`, R`We have $-\frac{2}{2\cdot(-1)}=1$.`],
      [R`Find $m$ so that $y=x^2-mx+1$ is decreasing on $(-\infty;\ 3)$ and increasing on $(3;\ +\infty)$.`, R`The required value is $m=6$.`, R`The vertex is at $x=\frac{m}{2}$ and must equal $3$, so $m=6$.`],
    ],
  },
  "toa-do-vt": {
    s: R`The vector $\overrightarrow{AB}$ has coy-coy-coordinates $(x_B-x_A;\ y_B-y_A)$. For $\vec a=(x_1;\ y_1)$ and $\vec b=(x_2;\ y_2)$ we have $\vec a+\vec b=(x_1+x_2;\ y_1+y_2)$, $k\vec a=(kx_1;\ ky_1)$, and the length is $|\vec a|=\sqrt{x_1^2+y_1^2}$.`,
    w: R`A vector depends only on the difference of two points, so take the coy-coy-coordinates of the end point minus those of the start point. Addition and multiplication by a number are done on each coy-coordinate separately.`,
    p: R`Taking the start point minus the end point, which reverses the sign of both coy-coy-coordinates, or forgetting the square root when computing a length.`,
    ex: [
      [R`Let $A(1;\ 2)$ and $B(4;\ 6)$. Find the coy-coy-coordinates and the length of $\overrightarrow{AB}$.`, [
        [R`The coy-coy-coordinates are $\overrightarrow{AB}=(4-1;\ 6-2)=(3;\ 4)$.`, R`Take the coy-coy-coordinates of the end point minus those of the start point.`],
        [R`The length is $\sqrt{3^2+4^2}=5$.`, R`Use the length formula in coy-coy-coordinates.`],
      ], R`The vector $\overrightarrow{AB}=(3;\ 4)$ has length $5$.`],
      [R`Let $\vec a=(2;\ -1)$ and $\vec b=(1;\ 3)$. Find the coy-coy-coordinates of $2\vec a-\vec b$.`, [
        [R`We have $2\vec a=(4;\ -2)$.`, R`Multiply each coy-coordinate by $2$.`],
        [R`Subtract $\vec b$: $(4-1;\ -2-3)=(3;\ -5)$.`, R`Subtract the corresponding coy-coy-coordinates.`],
      ], R`The vector $2\vec a-\vec b=(3;\ -5)$.`],
    ],
    dr: [
      [R`Let $A(1;\ 1)$ and $B(7;\ 9)$. Find the length $AB$.`, R`The length is $10$.`, R`The vector $\overrightarrow{AB}=(6;\ 8)$ has length $\sqrt{36+64}=10$.`],
      [R`Let $\vec a=(3;\ 1)$ and $\vec b=(-1;\ 2)$. What is the second coy-coordinate of $\vec a+\vec b$?`, R`The second coy-coordinate is $3$.`, R`Add the two second coy-coy-coordinates of the vectors: $1+2=3$.`],
      [R`Find the length of the vector $(5;\ 12)$.`, R`The length is $13$.`, R`We have $\sqrt{25+144}=13$.`],
    ],
  },
  "trung-diem-trong-tam": {
    s: R`The midpoint $M$ of $AB$ has coy-coy-coordinates $\left(\frac{x_A+x_B}{2};\ \frac{y_A+y_B}{2}\right)$. The centroid $G$ of triangle $ABC$ has coy-coy-coordinates $\left(\frac{x_A+x_B+x_C}{3};\ \frac{y_A+y_B+y_C}{3}\right)$.`,
    w: R`The midpoint splits a segment into two equal parts, so its coy-coy-coordinates are the mean of the end points. The centroid balances three points, so its coy-coy-coordinates are the mean of the three.`,
    p: R`Dividing by $2$ instead of $3$ when finding a centroid, or forgetting to find both coy-coy-coordinates of the point.`,
    ex: [
      [R`Find the midpoint $M$ of $AB$ with $A(1;\ 2)$ and $B(5;\ 8)$.`, [
        [R`The x-coy-coordinate is $\frac{1+5}{2}=3$.`, R`Take the mean of the two x-coy-coy-coordinates.`],
        [R`The y-coordinate is $\frac{2+8}{2}=5$.`, R`Take the mean of the two y-coy-coordinates.`],
      ], R`The midpoint is $M(3;\ 5)$.`],
      [R`Find the centroid $G$ of the triangle with $A(0;\ 0)$, $B(6;\ 0)$ and $C(0;\ 3)$.`, [
        [R`The x-coy-coordinate is $\frac{0+6+0}{3}=2$.`, R`Take the mean of the three x-coy-coy-coordinates.`],
        [R`The y-coordinate is $\frac{0+0+3}{3}=1$.`, R`Take the mean of the three y-coy-coordinates.`],
      ], R`The centroid is $G(2;\ 1)$.`],
    ],
    dr: [
      [R`Find the x-coy-coordinate of the midpoint of the segment joining $A(-2;\ 4)$ and $B(4;\ 0)$.`, R`The x-coy-coordinate is $1$.`, R`We have $\frac{-2+4}{2}=1$.`],
      [R`Find the x-coy-coordinate of the centroid of the triangle with vertices $(1;\ 1)$, $(4;\ 2)$ and $(1;\ 6)$.`, R`The x-coy-coordinate is $2$.`, R`We have $\frac{1+4+1}{3}=2$.`],
      [R`The point $M(2;\ 3)$ is the midpoint of $AB$ with $A(1;\ 1)$. Find the y-coordinate of $B$.`, R`The y-coordinate is $5$.`, R`From $\frac{1+y_B}{2}=3$ we get $y_B=2\cdot3-1=5$.`],
    ],
  },
  "goc-hai-vt": {
    s: R`The dot product of $\vec a=(x_1;\ y_1)$ and $\vec b=(x_2;\ y_2)$ is $\vec a\cdot\vec b=x_1x_2+y_1y_2$. The angle $\varphi$ between two vectors different from $\vec0$ satisfies $\cos\varphi=\frac{\vec a\cdot\vec b}{|\vec a|\,|\vec b|}$.`,
    w: R`The dot product measures how much two vectors point the same way: it equals the product of the lengths times $\cos\varphi$. Knowing the dot product and the lengths gives the angle, and a dot product of $0$ means a right angle.`,
    p: R`Forgetting to divide by the product of the two lengths when computing $\cos\varphi$, or forgetting the square root when computing a length.`,
    ex: [
      [R`Find the angle between $\vec a=(1;\ 0)$ and $\vec b=(1;\ 1)$.`, [
        [R`The dot product is $1\cdot1+0\cdot1=1$, and the lengths are $|\vec a|=1$ and $|\vec b|=\sqrt2$.`, R`Compute the numerator and denominator of the formula for $\cos\varphi$.`],
        [R`Hence $\cos\varphi=\frac{1}{\sqrt2}=\frac{\sqrt2}{2}$, so $\varphi=45^\circ$.`, R`This is a familiar trigonometric value of the angle $45^\circ$.`],
      ], R`The angle between the vectors is $45^\circ$.`],
      [R`Show that $\vec a=(1;\ 2)$ and $\vec b=(2;\ -1)$ are perpendicular.`, [
        [R`The dot product is $1\cdot2+2\cdot(-1)=0$.`, R`Two vectors are perpendicular when their dot product is $0$.`],
        [R`The product is $0$, so $\cos\varphi=0$ and $\varphi=90^\circ$.`, R`If the numerator is $0$, the whole fraction is $0$.`],
      ], R`The two vectors are perpendicular.`],
    ],
    dr: [
      [R`Compute the dot product of $(3;\ 4)$ and $(1;\ 2)$.`, R`The dot product is $11$.`, R`We have $3\cdot1+4\cdot2=11$.`],
      [R`Compute $\cos\varphi$ for the vectors $(1;\ 0)$ and $(0;\ 1)$.`, R`It equals $0$.`, R`The dot product is $0$, so $\cos\varphi=0$.`],
      [R`What angle in degrees do the vectors $(2;\ -3)$ and $(3;\ 2)$ make?`, R`The angle is $90$ degrees.`, R`The dot product is $6-6=0$, so $\cos\varphi=0$, that is $\varphi=90^\circ$.`],
    ],
  },
  "dk-song-song-vuong": {
    s: R`Two vectors $\vec a=(x_1;\ y_1)$ and $\vec b=(x_2;\ y_2)$ are parallel when $x_1y_2-x_2y_1=0$, and perpendicular when $x_1x_2+y_1y_2=0$. Three points $A$, $B$, $C$ are collinear when $\overrightarrow{AB}$ and $\overrightarrow{AC}$ are parallel.`,
    w: R`Two vectors are parallel when their coy-coy-coordinates are proportional, that is when the determinant $x_1y_2-x_2y_1$ is $0$. They are perpendicular when the dot product is $0$, so the two conditions use two different expressions.`,
    p: R`Confusing the parallel condition with the perpendicular one, because both lead to an expression equal to $0$ but the expressions are different.`,
    ex: [
      [R`Are the vectors $\vec a=(2;\ 3)$ and $\vec b=(4;\ 6)$ parallel?`, [
        [R`Compute $x_1y_2-x_2y_1=2\cdot6-4\cdot3$.`, R`Substitute the coy-coy-coordinates into the parallel condition.`],
        [R`The result is $0$, so the vectors are parallel.`, R`Indeed $\vec b=2\vec a$.`],
      ], R`The vectors are parallel.`],
      [R`Find $m$ so that $\vec a=(1;\ m)$ is perpendicular to $\vec b=(2;\ 4)$.`, [
        [R`We need $1\cdot2+m\cdot4=0$.`, R`Two vectors are perpendicular when their dot product is $0$.`],
        [R`Solving gives $4m=-2$, so $m=-\frac{1}{2}$.`, R`Divide both sides of $4m=-2$ by $4$.`],
      ], R`The required value is $m=-\frac{1}{2}$.`],
    ],
    dr: [
      [R`Find $m$ so that $(1;\ 2)$ is parallel to $(3;\ m)$.`, R`The required value is $m=6$.`, R`We need $1\cdot m-3\cdot2=0$, so $m=6$.`],
      [R`Find $m$ so that $(m;\ 3)$ is perpendicular to $(2;\ -1)$.`, R`The required value is $m=\frac{3}{2}$.`, R`We need $2m-3=0$, so $m=\frac{3}{2}$.`],
      [R`The three points $A(0;\ 0)$, $B(1;\ 2)$ and $C(3;\ m)$ are collinear. Find $m$.`, R`The required value is $m=6$.`, R`The vectors $(1;\ 2)$ and $(3;\ m)$ are parallel, so $1\cdot m-3\cdot2=0$ and $m=6$.`],
    ],
  },
};

export const g11Extra2En: Record<string, LessonEn> = {
  "pt-asin-bcos": {
    s: R`The equation $a\sin x+b\cos x=c$ has solutions if and only if $c^2\le a^2+b^2$. Then divide both sides by $\sqrt{a^2+b^2}$ to reduce it to the form $\sin(x+\alpha)=\frac{c}{\sqrt{a^2+b^2}}$.`,
    w: R`Expanding $\sin(x+\alpha)=\sin x\cos\alpha+\cos x\sin\alpha$ shows that $a\sin x+b\cos x=\sqrt{a^2+b^2}\sin(x+\alpha)$. The largest value of the left side is $\sqrt{a^2+b^2}$, so $c$ cannot exceed that number.`,
    p: R`Forgetting to check the condition $c^2\le a^2+b^2$ and solving anyway. When $c^2>a^2+b^2$ the equation has no solution even though the manipulation can still be carried out.`,
    ex: [
      [R`Solve $\sqrt3\sin x+\cos x=2$.`, [
        [R`We have $a^2+b^2=3+1=4$ and $c^2=4$, so the equation has solutions.`, R`The condition for solutions is $c^2\le a^2+b^2$, and here equality holds.`],
        [R`Divide both sides by $2$: $\frac{\sqrt3}{2}\sin x+\frac12\cos x=1$, that is $\sin\left(x+\frac{\pi}{6}\right)=1$.`, R`Since $\cos\frac{\pi}{6}=\frac{\sqrt3}{2}$ and $\sin\frac{\pi}{6}=\frac12$, the left side is $\sin\left(x+\frac{\pi}{6}\right)$.`],
        [R`Hence $x+\frac{\pi}{6}=\frac{\pi}{2}+k2\pi$ and $x=\frac{\pi}{3}+k2\pi$.`, R`Solve the equation $\sin t=1$.`],
      ], R`The solutions are $x=\frac{\pi}{3}+k2\pi$ with $k$ an integer.`],
      [R`Does the equation $\sin x+\cos x=3$ have a solution?`, [
        [R`We have $a^2+b^2=1+1=2$ and $c^2=9$.`, R`Compute the two sides of the condition for solutions.`],
        [R`Since $9>2$, the equation has no solution.`, R`The largest value of $\sin x+\cos x$ is only $\sqrt2$.`],
      ], R`The equation has no solution.`],
    ],
    dr: [
      [R`How many integers $c$ make the equation $3\sin x+4\cos x=c$ have a solution?`, R`There are $11$ integers.`, R`We need $c^2\le9+16=25$, that is $-5\le c\le5$, which gives $11$ integers.`],
      [R`What is the largest positive integer $c$ for which $\sin x+\sqrt3\cos x=c$ has a solution?`, R`It is $2$.`, R`We need $c^2\le1+3=4$, that is $c\le2$; the value $c=2$ still has a solution because equality can occur.`],
      [R`Solve $\sin x+\cos x=\sqrt2$ on $[0;\ 2\pi)$. How many degrees is that solution?`, R`It is $45$ degrees, that is $x=\frac{\pi}{4}$.`, R`We have $\sqrt2\sin\left(x+\frac{\pi}{4}\right)=\sqrt2$, so $x+\frac{\pi}{4}=\frac{\pi}{2}$ and $x=\frac{\pi}{4}$.`],
    ],
  },
  "pt-bac-hai-lg": {
    s: R`An equation of the form $at^2+bt+c=0$ with $t=\sin x$ or $t=\cos x$ is solved by substituting $t$, solving the quadratic, and keeping only the roots with $-1\le t\le1$.`,
    w: R`Every value of $\sin x$ and $\cos x$ lies in $[-1;\ 1]$, so only a root $t$ in this interval corresponds to some value of $x$.`,
    p: R`Keeping a root $t$ outside $[-1;\ 1]$ and then solving $\sin x=t$, or forgetting to solve the basic trigonometric equation after finding $t$.`,
    ex: [
      [R`Solve $2\sin^2x-\sin x-1=0$.`, [
        [R`Let $t=\sin x$ with $|t|\le1$, giving $2t^2-t-1=0$.`, R`Reduce to a quadratic equation in $t$.`],
        [R`The equation has roots $t=1$ and $t=-\frac12$, both in $[-1;\ 1]$.`, R`Factor $2t^2-t-1=(t-1)(2t+1)$.`],
        [R`For $t=1$ we get $x=\frac{\pi}{2}+k2\pi$; for $t=-\frac12$ we get $x=-\frac{\pi}{6}+k2\pi$ or $x=\frac{7\pi}{6}+k2\pi$.`, R`Solve each basic trigonometric equation.`],
      ], R`There are three families of solutions as above.`],
      [R`Solve $2\cos^2x+3\cos x-2=0$.`, [
        [R`Let $t=\cos x$, giving $2t^2+3t-2=0$ with roots $t=\frac12$ and $t=-2$.`, R`Factor $2t^2+3t-2=(2t-1)(t+2)$.`],
        [R`The root $t=-2$ is less than $-1$ so it is rejected, and $\cos x=\frac12$ gives $x=\pm\frac{\pi}{3}+k2\pi$.`, R`The value of $\cos x$ is never less than $-1$.`],
      ], R`The solutions are $x=\pm\frac{\pi}{3}+k2\pi$.`],
    ],
    dr: [
      [R`Solve $t^2-3t+2=0$ with $t=\sin x$. Which root of $t$ can be used?`, R`Only $t=1$, because $t=2$ is greater than $1$.`, R`The equation has roots $t=1$ and $t=2$, but $|\sin x|\le1$.`],
      [R`Solve $2t^2-t=0$. What is the larger root?`, R`The larger root is $\frac12$.`, R`Factor $t(2t-1)=0$, so $t=0$ or $t=\frac12$.`],
      [R`What is the larger root of $t^2+t-6=0$, and can it be used for $t=\cos x$?`, R`It equals $2$, which is greater than $1$, so it cannot be used.`, R`The equation has two roots $2$ and $-3$, both outside $[-1;\ 1]$, so the trigonometric equation has no solution.`],
    ],
  },
  "nghiem-trong-khoang": {
    s: R`The general solution of $\sin x=\sin\alpha$ is $x=\alpha+k2\pi$ or $x=\pi-\alpha+k2\pi$, and that of $\cos x=\cos\alpha$ is $x=\pm\alpha+k2\pi$. To pick the solutions in an interval, try integer values of $k$ and keep the solutions that lie in the interval.`,
    w: R`Each time $k$ increases by $1$ the solution grows by one period, so only a few values of $k$ put a solution in the interval. Try neighbouring values of $k$ and stop when the solution leaves the interval.`,
    p: R`Taking one family of solutions and dropping the second, or including a solution at an end point when the interval is open.`,
    ex: [
      [R`Find the solutions of $\sin x=\frac12$ in $[0;\ 2\pi]$.`, [
        [R`We have $\sin\frac{\pi}{6}=\frac12$, so $x=\frac{\pi}{6}+k2\pi$ or $x=\frac{5\pi}{6}+k2\pi$.`, R`Use the two families of solutions of $\sin x=\sin\alpha$ with $\alpha=\frac{\pi}{6}$.`],
        [R`For $k=0$ both solutions lie in $[0;\ 2\pi]$, while other values of $k$ push the solutions outside the interval.`, R`Each increase of $k$ adds $2\pi$, which goes beyond $2\pi$.`],
      ], R`There are two solutions, $\frac{\pi}{6}$ and $\frac{5\pi}{6}$.`],
      [R`Find the solutions of $\cos x=-\frac12$ in $[0;\ 2\pi]$.`, [
        [R`We have $\cos\frac{2\pi}{3}=-\frac12$, so $x=\pm\frac{2\pi}{3}+k2\pi$.`, R`Use the family of solutions of $\cos x=\cos\alpha$ with $\alpha=\frac{2\pi}{3}$.`],
        [R`Choose $x=\frac{2\pi}{3}$ with the plus sign and $k=0$, and $x=-\frac{2\pi}{3}+2\pi=\frac{4\pi}{3}$ with $k=1$.`, R`A negative solution needs $2\pi$ added to enter the interval.`],
      ], R`There are two solutions, $\frac{2\pi}{3}$ and $\frac{4\pi}{3}$.`],
    ],
    dr: [
      [R`What is the solution of $\tan x=1$ in $[0;\ \pi)$?`, R`The solution is $x=\frac{\pi}{4}$.`, R`We have $\tan\frac{\pi}{4}=1$ and the tangent has period $\pi$, so there is only one solution in $[0;\ \pi)$.`],
      [R`What is the solution of $\sin x=1$ in $[0;\ 2\pi]$?`, R`The solution is $x=\frac{\pi}{2}$.`, R`The two families of solutions coincide, and there is only one solution in the interval.`],
      [R`Find the sum of the two solutions of $\sin x=-\frac12$ in $[0;\ 2\pi]$ in degrees.`, R`The sum is $540$ degrees, that is $3\pi$.`, R`The two solutions are $\frac{7\pi}{6}$ and $\frac{11\pi}{6}$, whose sum is $3\pi$, that is $540^\circ$.`],
    ],
  },
  "gtln-lg": {
    s: R`The expression $a\sin x+b\cos x$ takes every value in the interval $[-\sqrt{a^2+b^2};\ \sqrt{a^2+b^2}]$. So the maximum and minimum of $y=a\sin x+b\cos x+d$ are $d\pm\sqrt{a^2+b^2}$.`,
    w: R`The expression $a\sin x+b\cos x$ is a dot product of two vectors, and by the Cauchy–Schwarz inequality its absolute value does not exceed the product of the lengths. Equality is reached at some value of $x$.`,
    p: R`Adding the constant $d$ to both ends of the interval but forgetting that the upper and lower bounds both shift by the same amount.`,
    ex: [
      [R`Find the maximum and minimum of $y=3\sin x+4\cos x$.`, [
        [R`We have $\sqrt{a^2+b^2}=\sqrt{9+16}=5$.`, R`Substitute $a=3$ and $b=4$ into the formula.`],
        [R`So $y$ takes every value in $[-5;\ 5]$.`, R`The ends of the interval are $\pm\sqrt{a^2+b^2}$.`],
      ], R`The maximum is $5$ and the minimum is $-5$.`],
      [R`Find the maximum of $y=\sin x+\cos x+2$.`, [
        [R`We have $\sqrt{1^2+1^2}=\sqrt2$.`, R`Substitute $a=1$ and $b=1$ into the formula.`],
        [R`The maximum is $2+\sqrt2$.`, R`Add the constant $2$ to the maximum of the trigonometric part.`],
      ], R`The maximum is $2+\sqrt2$.`],
    ],
    dr: [
      [R`Find the maximum of $y=5\sin x+12\cos x$.`, R`The maximum is $13$.`, R`We have $\sqrt{25+144}=13$.`],
      [R`Find the minimum of $y=\sqrt3\sin x-\cos x$.`, R`The minimum is $-2$.`, R`We have $\sqrt{3+1}=2$, so the minimum is $-2$.`],
      [R`Find the minimum of $y=\sin x-\cos x+3$.`, R`The minimum is $3-\sqrt2$.`, R`The trigonometric part has minimum $-\sqrt2$, which we add to $3$.`],
    ],
  },
  "pt-mu-an-phu": {
    s: R`Equations of the form $a^{2x}+b\cdot a^x+c=0$ are solved by setting $t=a^x$ with $t>0$, solving the quadratic in $t$, discarding any non-positive root, and then returning to $x$.`,
    w: R`Writing $a^{2x}=(a^x)^2$ reduces the equation to a quadratic in $t=a^x$. A power with a positive base is always positive, so a root $t\le0$ corresponds to no value of $x$.`,
    p: R`Keeping a negative root $t$ and then solving $a^x=t$ meaninglessly, or stopping at $t$ and forgetting to find $x$.`,
    ex: [
      [R`Solve $4^x-3\cdot2^x+2=0$.`, [
        [R`Let $t=2^x>0$, giving $t^2-3t+2=0$.`, R`Because $4^x=(2^x)^2$ so the substitution $t=2^x$ is reasonable.`],
        [R`The equation has roots $t=1$ and $t=2$, both positive.`, R`Factor $t^2-3t+2=(t-1)(t-2)$.`],
        [R`For $t=1$ we get $x=0$; for $t=2$ we get $x=1$.`, R`Solve $2^x=1$ and $2^x=2$.`],
      ], R`The equation has two solutions $x=0$ and $x=1$.`],
      [R`Solve $4^x+2^x-6=0$.`, [
        [R`Let $t=2^x>0$, giving $t^2+t-6=0$ with roots $t=2$ and $t=-3$.`, R`Factor $t^2+t-6=(t-2)(t+3)$.`],
        [R`The root $t=-3$ is rejected because $2^x>0$, and $2^x=2$ gives $x=1$.`, R`A power with a positive base is always positive.`],
      ], R`The equation has one solution $x=1$.`],
    ],
    dr: [
      [R`Solve $4^x-5\cdot2^x+4=0$. What is the larger solution for $x$?`, R`The larger solution is $2$.`, R`Setting $t=2^x$ gives $t^2-5t+4=0$, so $t=1$ or $t=4$; the larger solution corresponds to $2^x=4$.`],
      [R`Solve $9^x-10\cdot3^x+9=0$. What is the larger solution for $x$?`, R`The larger solution is $2$.`, R`Setting $t=3^x$ gives $t=1$ or $t=9$; the larger solution corresponds to $3^x=9$.`],
      [R`For the equation $4^x+2^x-2=0$, what is the positive value of $t=2^x$?`, R`It equals $1$, so $x=0$.`, R`The equation $t^2+t-2=0$ has roots $t=1$ and $t=-2$, and only $t=1$ is positive.`],
    ],
  },
  "bpt-log-dk": {
    s: R`When solving a logarithmic inequality, first require that the expression under each logarithm be positive. With a base greater than $1$ the inequality sign is kept when the logarithm is removed; with a base between $0$ and $1$ the sign reverses.`,
    w: R`A logarithm is defined only for positive numbers, so the condition comes before any manipulation. The logarithm is increasing when the base is greater than $1$, so removing it does not change the direction of the sign.`,
    p: R`Skipping the condition for the logarithm to be defined, or forgetting to reverse the inequality when the base lies between $0$ and $1$.`,
    ex: [
      [R`Solve $\log_2(x-1)<3$.`, [
        [R`The condition is $x-1>0$, that is $x>1$.`, R`The expression under the logarithm must be positive.`],
        [R`The base $2>1$, so $x-1<2^3=8$, that is $x<9$.`, R`Remove the logarithm and keep the direction of the sign.`],
      ], R`The solution set is $(1;\ 9)$.`],
      [R`Solve $\log_3(2x-4)\ge2$.`, [
        [R`The condition is $2x-4>0$, that is $x>2$.`, R`The expression under the logarithm must be positive.`],
        [R`The inequality gives $2x-4\ge3^2=9$, so $x\ge\frac{13}{2}$, which satisfies the condition $x>2$.`, R`The base $3>1$, so the direction of the sign is kept.`],
      ], R`The solution set is $\left[\frac{13}{2};\ +\infty\right)$.`],
    ],
    dr: [
      [R`The condition for $\log_5(x-7)$ is that $x$ be greater than which number?`, R`Greater than $7$.`, R`The expression under the logarithm must be positive, that is $x-7>0$.`],
      [R`Solve $\log_2x<4$. What is the upper bound of $x$?`, R`The upper bound is $16$.`, R`The base $2>1$, so $x<2^4=16$, and with the condition $x>0$ we get $0<x<16$.`],
      [R`Solve $\log_3(x-1)\ge1$. What is the lower bound of $x$?`, R`The lower bound is $4$.`, R`We need $x-1\ge3$, that is $x\ge4$, which satisfies the condition $x>1$.`],
    ],
  },
  "ung-dung-mu-log": {
    s: R`An amount $A$ deposited at compound interest rate $r$ per period becomes $A(1+r)^n$ after $n$ periods. To find the number of periods $n$ needed, solve the exponential inequality by taking logarithms of both sides and rounding up to an integer.`,
    w: R`Taking logarithms of both sides turns the exponential inequality into a linear inequality in $n$, and the logarithm is increasing so the direction is kept. The number of periods is an integer, so we must round up.`,
    p: R`Rounding down or to the nearest integer, so that the real amount has not yet reached the target at the period found.`,
    ex: [
      [R`A deposit of $100$ million VND earns $10\%$ per year at compound interest. After at least how many years does the amount double?`, [
        [R`We need $100\cdot1.1^n\ge200$, that is $1.1^n\ge2$.`, R`Divide both sides of the inequality by the initial amount $100$.`],
        [R`Taking logarithms: $n\ge\frac{\ln2}{\ln1.1}\approx7.27$.`, R`Dividing both sides by $\ln1.1>0$ keeps the direction of the sign.`],
        [R`The number of years is an integer, so $n=8$.`, R`Round up to meet the requirement.`],
      ], R`After at least $8$ years.`],
      [R`The population of a town grows $2\%$ per year. After at least how many years does the population double?`, [
        [R`We need $1.02^n\ge2$, so $n\ge\frac{\ln2}{\ln1.02}\approx35.0$.`, R`Take logarithms of both sides to bring the exponent $n$ down as a factor.`],
        [R`The value $35.0$ is slightly more than $35$, so $n=36$.`, R`For $n=35$ the power $1.02^{35}$ is still slightly less than $2$.`],
      ], R`After at least $36$ years.`],
    ],
    dr: [
      [R`A deposit of $100$ million VND earns $10\%$ per year at compound interest. How many million VND are there after $3$ years?`, R`There are $133.1$ million VND.`, R`We have $100\cdot1.1^3=133.1$.`],
      [R`The interest rate is $8\%$ per year at compound interest. After at least how many years does the amount triple?`, R`After at least $15$ years.`, R`We need $n\ge\frac{\ln3}{\ln1.08}\approx14.27$, and rounding up gives $15$.`],
      [R`A radioactive substance halves in each period. What fraction of the original mass remains after $3$ periods?`, R`A fraction $\frac{1}{8}$ remains.`, R`Each period multiplies by $\frac12$, so after $3$ periods $\left(\frac12\right)^3=\frac18$ remains.`],
    ],
  },
  "so-sanh-mu-log": {
    s: R`For a base $a>1$ the functions $a^x$ and $\log_ax$ are increasing; for $0<a<1$ they are decreasing. Use the definition $\log_ab=c\iff a^c=b$ to compute exact values, and use the direction of variation to compare.`,
    w: R`An exponential and a logarithm with the same base are inverse functions and vary in the same direction. Knowing the direction of variation, we compare two values by comparing their arguments.`,
    p: R`Forgetting that a base between $0$ and $1$ reverses the comparison, or confusing $\log_ab$ with $\log_ba$.`,
    ex: [
      [R`Compare $\log_23$ with $\frac32$.`, [
        [R`We have $\frac32=\log_22^{3/2}=\log_2\left(2\sqrt2\right)$.`, R`Write $\frac32$ as a logarithm to base $2$.`],
        [R`Since $3^2=9>8=\left(2\sqrt2\right)^2$ we have $3>2\sqrt2$, and the function $\log_2$ is increasing.`, R`Square the two positive numbers to compare them.`],
      ], R`Hence $\log_23>\frac32$.`],
      [R`Compare $\left(\frac12\right)^3$ and $\left(\frac12\right)^2$.`, [
        [R`The base $\frac12$ lies between $0$ and $1$, so the exponential is decreasing.`, R`A larger exponent gives a smaller value.`],
        [R`Since $3>2$ we have $\left(\frac12\right)^3<\left(\frac12\right)^2$, that is $\frac18<\frac14$.`, R`Check by computing the two powers directly.`],
      ], R`Hence $\left(\frac12\right)^3<\left(\frac12\right)^2$.`],
    ],
    dr: [
      [R`Which is larger: $\log_{1/2}3$ or $\log_{1/2}5$?`, R`The number $\log_{1/2}3$ is larger, because a base between $0$ and $1$ makes the function decreasing.`, R`The base $\frac12$ lies between $0$ and $1$, so $3<5$ gives $\log_{1/2}3>\log_{1/2}5$; indeed $\log_{1/2}3\approx-1.58$ and $\log_{1/2}5\approx-2.32$.`, [], ["$\\log_{1/2}3$", "$\\log_{1/2}5$"]],
      [R`Compute $\log_3\frac19$.`, R`It equals $-2$.`, R`By the definition of the logarithm, since $3^{-2}=\frac19$ the result is $-2$.`],
      [R`Compute $\log_{1/2}4$.`, R`It equals $-2$.`, R`By the definition of the logarithm, since $\left(\frac12\right)^{-2}=4$ the result is $-2$.`],
    ],
  },
};
