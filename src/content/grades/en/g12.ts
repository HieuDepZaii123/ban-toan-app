/** Lớp 12 bằng tiếng Anh. Thứ tự ví dụ và bài luyện khớp bản tiếng Việt. */
import type { LessonEn } from "./types.ts";

const R = String.raw;

export const g12En: Record<string, LessonEn> = {
  "cuc-tri": {
    s: R`If $f$ is differentiable at an extremum, then $f'(x)=0$ there. This is a necessary condition. A sufficient condition is that $f'$ changes sign as it passes through the point. If $f'$ does not change sign, the stationary point is not an extremum.`,
    w: R`At a differentiable extremum the tangent must be horizontal; otherwise the function would keep rising on one side. A derivative changing from positive to negative means the function was increasing and turns to decreasing, so the point is a maximum.`,
    p: R`Solving $f'(x)=0$ and treating every solution as an extremum. The function $g(x)=x^3$ has $g'(0)=0$ but its derivative does not change sign, so $x=0$ is not an extremum.`,
    ex: [
      [R`Consider $f(x)=-x^2+4x$. Find its extremum, and rule out the stationary point of $g(x)=x^3$.`, [
        [R`We have $f'(x)=-2x+4=0$ when $x=2$. This is the necessary condition.`, R`A polynomial is differentiable everywhere. An extremum, if there is one, must make the derivative $0$.`],
        [R`The derivative $f'(1)$ equals $2>0$ and $f'(3)$ equals $-2<0$, so $f'$ changes from positive to negative. The point $x=2$ is a maximum.`, R`A change of sign of the derivative is the sufficient condition. For $g(x)=x^3$, $g'(0)=0$ but $g'$ does not change sign, so $x=0$ is not an extremum.`],
      ], R`The function $f$ has a maximum at $x=2$. The point $x=0$ of $g(x)=x^3$ is not an extremum.`],
      [R`Find the extrema of $f(x)=x^3-3x^2+2$.`, [
        [R`The derivative $f'(x)=3x^2-6x=3x(x-2)$ is $0$ at $x=0$ and $x=2$.`, R`An extremum of a differentiable function must be a root of the derivative.`],
        [R`The derivative is positive before $0$, negative between $0$ and $2$, and positive after $2$.`, R`Sign of a quadratic: the sign of the leading coefficient outside the roots, the opposite sign between them.`],
        [R`So $x=0$ is a maximum with $f(0)=2$, and $x=2$ is a minimum with $f(2)=-2$.`, R`A derivative changing from positive to negative gives a maximum, from negative to positive a minimum.`],
      ], R`The function has maximum $2$ at $x=0$ and minimum $-2$ at $x=2$.`],
    ],
    dr: [
      [R`Where is the derivative of $x^3-3x$ equal to $0$?`, R`At $x=-1$ and $x=1$.`, R`The necessary condition for an extremum is a derivative equal to $0$. The sign change must still be checked before naming an extremum.`],
      [R`For $f(x)=-x^2+4x$, what do the signs of $f'(1)$ and $f'(3)$ tell you?`, R`The derivative $f'(1)$ is positive and $f'(3)$ is negative, so $x=2$ is a maximum.`, R`The derivative changes from positive to negative. That is the sufficient condition for a maximum.`],
      [R`Compute $f(1)$ for $f(x)=-x^2+4x$.`, R`The value is $3$.`, R`Substitute the point into the function. This is one value of the function, not the maximum value.`],
    ],
  },
  gtln: {
    s: R`A function continuous on the interval $[a,b]$ reaches a maximum and a minimum. If the derivative is $0$ only at some interior points, compare the values at those points and at the two endpoints.`,
    w: R`On an interval, the maximum can only be at an endpoint or at an interior point. If it is interior and the function is differentiable, the derivative is $0$ there, so only finitely many values need comparing.`,
    p: R`Forgetting the values at the endpoints, or including a stationary point outside the interval. Only consider points in the given interval.`,
    ex: [
      [R`Find the maximum and minimum of $f(x)=-x^2+4x$ on $[0,3]$.`, [
        [R`The stationary point $x=2$ lies in $[0,3]$.`, R`The necessary condition $f'(x)=0$ gives $x=2$. This point is in the interval, so it joins the comparison.`],
        [R`The three values are $f(0)=0$, $f(2)=4$ and $f(3)=3$.`, R`The maximum on the interval is $4$ and the minimum is $0$. The endpoints are not left out.`],
      ], R`The maximum is $4$ and the minimum is $0$.`],
      [R`Find the maximum and minimum of $f(x)=x^3-3x$ on the interval $[0,2]$.`, [
        [R`The derivative $f'(x)=3x^2-3$ is $0$ at $x=1$ (the root $x=-1$ lies outside the interval).`, R`Keep only the stationary points inside the interval being studied.`],
        [R`Compare $f(0)=0$, $f(1)=-2$, $f(2)=2$.`, R`The maximum and minimum on the interval lie at stationary points or at the endpoints.`],
      ], R`The maximum is $2$ at $x=2$, and the minimum is $-2$ at $x=1$.`],
    ],
    dr: [
      [R`On $[0,3]$, at which endpoint does $f(x)=-x^2+4x$ reach its minimum?`, R`At $x=0$, where the value is $0$.`, R`It has been compared with the stationary point and the other endpoint. The number $0$ is the smallest of the three values.`],
      [R`Does the stationary point of $f(x)=-x^2+4x$ lie in $[0,3]$?`, R`Yes, because $x=2$ lies between $0$ and $3$.`, R`A stationary point inside the interval must be compared together with the two endpoints.`],
      [R`Compute $f(3)-f(0)$ for $f(x)=-x^2+4x$.`, R`The difference is $3$.`, R`The difference shows the value at $3$ is larger than at $0$, but both are below the value at the stationary point.`],
    ],
  },
  "tiem-can": {
    s: R`The line $y=y_0$ is a horizontal asymptote when the limit at infinity equals $y_0$. The line $x=x_0$ is a vertical asymptote when a one-sided limit at $x_0$ is infinite. Each side is written as its own one-sided limit.`,
    w: R`An asymptote is a line the graph gets close to as a point on the graph moves infinitely far away. A horizontal asymptote describes $y$ for very large $x$; a vertical asymptote describes where $y$ grows or falls without bound.`,
    p: R`Concluding that every root of the denominator gives a vertical asymptote. If the numerator is also $0$ there, simplify and compute the limit first.`,
    ex: [
      [R`Consider $y=\frac{2x^2+1}{x^2-1}$. Find the horizontal asymptote and the vertical asymptotes.`, [
        [R`The limit as $x$ goes to positive infinity is $2$, so $y=2$ is a horizontal asymptote.`, R`The numerator and denominator have the same degree. The ratio of the leading coefficients is $2$.`],
        [R`As $x\to 1^+$, the numerator tends to $3$ and the denominator $x^2-1=(x-1)(x+1)$ tends to $0$ because $x-1\to 0^+$ while $x+1\to 2>0$. So $\lim_{x\to 1^+}\frac{2x^2+1}{x^2-1}=+\infty$. As $x\to 1^-$, the denominator tends to $0^-$, so the left-hand limit is $-\infty$.`, R`A finite numerator other than $0$ over a denominator tending to $0$ from one side gives an infinite quotient with the sign of the denominator.`],
        [R`As $x\to -1^-$, the factor $x+1\to 0^-$ and $x-1\to -2$, so the denominator tends to $0^+$ and the numerator to $3$; the left-hand limit is $+\infty$. As $x\to -1^+$, the denominator tends to $0^-$, so the right-hand limit is $-\infty$.`, R`All four one-sided limits are infinite. So $x=1$ and $x=-1$ are both vertical asymptotes.`],
      ], R`The line $y=2$ is the horizontal asymptote. The vertical asymptotes are $x=-1$ and $x=1$.`],
      [R`Find the asymptotes of the graph of $y=\frac{2x-1}{x+1}$.`, [
        [R`As $x\to\pm\infty$, $y\to\frac{2}{1}=2$, so $y=2$ is a horizontal asymptote.`, R`When numerator and denominator have the same degree, the limit at infinity is the ratio of the leading coefficients.`],
        [R`As $x\to -1$, the denominator tends to $0$ while the numerator tends to $-3$, so $x=-1$ is a vertical asymptote.`, R`A zero denominator with a non-zero numerator makes the function grow or fall without bound.`],
      ], R`The graph has horizontal asymptote $y=2$ and vertical asymptote $x=-1$.`],
    ],
    dr: [
      [R`What is the horizontal asymptote of $y=\frac{3x+1}{x}$ as $x$ goes to positive infinity?`, R`The horizontal asymptote is $y=3$.`, R`Split it as $3+\frac{1}{x}$. The fraction goes to $0$.`],
      [R`Is the right-hand limit of $\frac{2x^2+1}{x^2-1}$ at $1$ equal to $+\infty$ or $-\infty$?`, R`The right-hand limit is $+\infty$, because the numerator tends to $3$ and the denominator to $0^+$.`, R`The positive sign of this one-sided limit is the sign of $+\infty$. The denominator $(x-1)(x+1)$ has the sign of $x-1$ when $x$ is near $1$.`],
      [R`What is the left-hand limit of the same function at $-1$, and what are the two vertical asymptotes?`, R`The left-hand limit is $+\infty$. The two vertical asymptotes are $x=-1$ and $x=1$.`, R`To the left of $-1$ the denominator tends to $0^+$. Both $x=-1$ and $x=1$ have infinite one-sided limits.`],
    ],
  },
  bbt: {
    s: R`A variation table records the points where the derivative is $0$, the sign of the derivative on each interval, the direction of change and the special values. The graph rises where the derivative is positive and falls where it is negative.`,
    w: R`The sign of the derivative tells whether the function increases or decreases on each interval. Recording that sign together with the values at the turning points is enough to picture the shape of the graph.`,
    p: R`Testing the sign of the derivative at one point and applying it to every interval. Each interval between consecutive roots of the derivative must be checked separately.`,
    ex: [
      [R`For $f(x)=x^3-3x$, set up the key points of the variation table.`, [
        [R`The derivative $f'(x)=3x^2-3$ is $0$ at $x=-1$ and $x=1$.`, R`These two roots split the horizontal axis into three intervals. They are the markers of the table.`],
        [R`On $(-\infty,-1)$ and $(1,+\infty)$ the derivative is positive, and on $(-1,1)$ it is negative.`, R`The sign of $3(x+1)(x-1)$ changes at each simple root. The graph goes up, then down, then up again.`],
      ], R`The function increases on $(-\infty,-1]$ and on $[1,+\infty)$, and decreases on $[-1,1]$.`],
      [R`Build the variation table of $y=-x^2+4x$.`, [
        [R`The derivative $y'=-2x+4$ is $0$ at $x=2$, positive when $x<2$ and negative when $x>2$.`, R`A linear derivative changes sign exactly once, at its root.`],
        [R`The function increases on $(-\infty,2)$, reaches its maximum $y(2)=4$, then decreases on $(2,+\infty)$.`, R`The sign of the derivative gives the direction of change on each interval.`],
      ], R`The function rises then falls, reaching its maximum $4$ at $x=2$.`],
    ],
    dr: [
      [R`Compute $f(-1)$ and $f(1)$ for $f(x)=x^3-3x$.`, R`The values are $2$ and $-2$.`, R`These two values are the heights of the extrema, written in the value row of the variation table.`],
      [R`Is the derivative of $x^3-3x$ at $x=0$ negative or positive?`, R`The derivative is $-3$, so it is negative.`, R`The point $0$ lies between the two roots of the derivative. The negative sign confirms the graph goes down on the middle interval.`],
      [R`What is the derivative of $x^3-3x$ at $x=2$?`, R`The derivative is $9$, so the graph is rising.`, R`The point $2$ lies to the right of $1$. The positive sign matches the increasing interval on the right.`],
    ],
  },
  "nguyen-ham": {
    s: R`A function $F$ is an antiderivative of $f$ on an interval when $F'(x)=f(x)$ at every point of the interval. If $F$ is an antiderivative, so is $F+C$, where $C$ is a constant.`,
    w: R`Two functions with the same derivative on an interval have a difference whose derivative is $0$, so that difference is constant. Hence every antiderivative of $f$ on the interval has the form $F(x)+C$.`,
    p: R`Forgetting the constant $C$, or using the power formula backwards. The antiderivative of $x^n$ with $n\neq -1$ is $\frac{x^{n+1}}{n+1}+C$.`,
    ex: [
      [R`Show that $F(x)=x^2$ is an antiderivative of $f(x)=2x$.`, [
        [R`The derivative of $x^2$ is $2x$.`, R`This is the power rule for derivatives. The result matches the given function.`],
        [R`So $x^2$ is an antiderivative of $2x$, and so is $x^2+C$.`, R`The derivative of a constant is $0$, so adding a constant does not change the derivative.`],
      ], R`One antiderivative of $2x$ is $x^2$.`],
      [R`Find the antiderivative $F$ of $f(x)=3x^2-2x+1$ with $F(1)=4$.`, [
        [R`Every antiderivative has the form $F(x)=x^3-x^2+x+C$.`, R`The antiderivative of $x^n$ is $\frac{x^{n+1}}{n+1}$, plus a constant.`],
        [R`The condition $F(1)=1-1+1+C=4$ gives $C=3$.`, R`One condition at one point fixes exactly one value of the constant.`],
      ], R`The required antiderivative is $F(x)=x^3-x^2+x+3$.`],
    ],
    dr: [
      [R`Is the derivative of $\frac{x^3}{3}$ equal to $x^2$?`, R`Yes, so $\frac{x^3}{3}$ is an antiderivative of $x^2$.`, R`Getting the original function back by differentiating is enough to confirm an antiderivative.`],
      [R`Is the derivative of $x^2+7$ the same as the derivative of $x^2$?`, R`Yes, both derivatives equal $2x$.`, R`A constant has derivative $0$. Two antiderivatives of the same function differ by a constant.`],
      [R`One antiderivative of $3x^2$ is $x^3$. What is the derivative of $x^3$?`, R`The derivative is $3x^2$.`, R`Check an antiderivative by differentiating it back.`],
    ],
  },
  "tich-phan-bai": {
    s: R`If $F$ is an antiderivative of $f$, then $\int_a^b f(x)\,\mathrm{d}x=F(b)-F(a)$. The lower and upper limits may not be swapped without changing the sign.`,
    w: R`The function $S(x)$ measuring the area under the graph from $a$ to $x$ grows at exactly the rate $f(x)$, the height, so $S$ is an antiderivative of $f$. The area up to $b$ is therefore $F(b)-F(a)$.`,
    p: R`Computing $F(a)-F(b)$. Always take the value at the upper limit minus the value at the lower limit.`,
    ex: [
      [R`Compute the integral from $0$ to $1$ of $3x^2\,\mathrm{d}x$.`, [
        [R`One antiderivative of $3x^2$ is $x^3$.`, R`The derivative of $x^3$ is $3x^2$, so this antiderivative works.`],
        [R`The difference between the limits is $1^3-0^3=1$.`, R`This is the Newton–Leibniz formula. The lower limit contributes $0$.`],
      ], R`The integral equals $1$.`],
      [R`Compute $\int_0^{\pi}\sin x\,dx$.`, [
        [R`One antiderivative of $\sin x$ is $-\cos x$.`, R`The derivative of $-\cos x$ is $\sin x$.`],
        [R`The integral is $-\cos\pi-(-\cos 0)=1+1=2$.`, R`Take the value at the upper limit minus the value at the lower limit.`],
      ], R`The integral equals $2$.`],
    ],
    dr: [
      [R`Compute $\int_0^2 x\,\mathrm{d}x$.`, R`The integral equals $2$.`, R`The antiderivative $\frac{x^2}{2}$ at $2$ minus its value at $0$ gives $2$.`],
      [R`Compute $\int_0^1 1\,\mathrm{d}x$.`, R`The integral equals $1$.`, R`The antiderivative of the constant $1$ is $x$. The difference between the limits is $1$.`],
      [R`Compute $\int_1^3 2x\,\mathrm{d}x$.`, R`The integral equals $8$.`, R`The antiderivative $x^2$ at $3$ minus at $1$ is $9-1$.`],
    ],
  },
  "dien-tich": {
    s: R`If $f(x)\ge 0$ on $[a,b]$, the area of the region bounded by the graph, the horizontal axis and the lines $x=a$, $x=b$ is $\int_a^b f(x)\,\mathrm{d}x$.`,
    w: R`The integral adds up thin strips of height $f(x)$ and width $\mathrm{d}x$. When $f$ is non-negative, each strip contributes exactly its own area.`,
    p: R`Integrating directly when part of the graph lies below the horizontal axis. That part gives a negative value, so the area must be computed as the integral of $|f(x)|$.`,
    ex: [
      [R`Find the area of the region bounded by $y=x$, the horizontal axis and the lines $x=0$, $x=2$.`, [
        [R`On $[0,2]$ the function $y=x$ is non-negative.`, R`This is the condition for the integral to be the actual area rather than a negative signed area.`],
        [R`The area is $\int_0^2 x\,\mathrm{d}x=2$.`, R`This is also the area of a triangle with base $2$ and height $2$, half the product of the two sides.`],
      ], R`The area is $2$.`],
      [R`Find the area of the region bounded by $y=x^2$ and $y=x$.`, [
        [R`The graphs meet at $x=0$ and $x=1$; on $[0,1]$ the line $y=x$ lies above.`, R`Solve the equation for the intersection points to find the two limits.`],
        [R`The area is $\int_0^1(x-x^2)\,dx=\frac{1}{2}-\frac{1}{3}=\frac{1}{6}$.`, R`The area between two graphs is the integral of the difference, upper function minus lower function.`],
      ], R`The area of the region is $\frac{1}{6}$.`],
    ],
    dr: [
      [R`What is the area under $y=1$ from $0$ to $3$?`, R`The area is $3$.`, R`The region is a rectangle of height $1$ and width $3$. The integral gives the same result.`],
      [R`What is the area under $y=2x$ from $0$ to $1$?`, R`The area is $1$.`, R`The function is non-negative on the interval. The antiderivative $x^2$ gives the difference $1$.`],
      [R`What is the area under $y=3x^2$ from $0$ to $1$?`, R`The area is $1$.`, R`The function is non-negative on the interval. The integral was just computed in the integrals lesson.`],
    ],
  },
  "the-tich-tp": {
    s: R`The solid of revolution formed by rotating the region $0\le y\le f(x)$, $a\le x\le b$ about the horizontal axis has volume $\pi\int_a^b \bigl(f(x)\bigr)^2\,\mathrm{d}x$ if $f$ is continuous.`,
    w: R`Cutting the solid with planes perpendicular to the horizontal axis gives circular discs of radius $f(x)$, with area $\pi\bigl(f(x)\bigr)^2$. Adding up the volumes of these thin discs is an integral.`,
    p: R`Forgetting to square the function or to multiply by $\pi$. The formula is $\pi\int_a^b\bigl(f(x)\bigr)^2\,\mathrm{d}x$.`,
    ex: [
      [R`The region $0\le y\le x$ on $[0,1]$ is rotated about the horizontal axis. Find the volume of the solid.`, [
        [R`The squared radius of a slice is $x^2$.`, R`The boundary function is $y=x$, non-negative on the interval. The formula uses the square of this function.`],
        [R`The volume is $\pi\int_0^1 x^2\,\mathrm{d}x=\frac{\pi}{3}$.`, R`An antiderivative of $x^2$ is $\frac{x^3}{3}$. The difference between the limits is $\frac{1}{3}$, then multiply by $\pi$.`],
      ], R`The volume is $\frac{\pi}{3}$.`],
      [R`Find the volume of the solid formed by rotating the region $0\le y\le\sqrt{x}$, $0\le x\le 4$ about the horizontal axis.`, [
        [R`Each slice perpendicular to the horizontal axis is a disc of radius $\sqrt{x}$, with area $\pi x$.`, R`When rotating about the horizontal axis, the radius of a slice is the height of the graph.`],
        [R`The volume is $V=\pi\int_0^4 x\,dx=\pi\cdot 8=8\pi$.`, R`Adding up the areas of thin slices along the axis is an integral.`],
      ], R`The volume of the solid is $8\pi$.`],
    ],
    dr: [
      [R`Compute $\pi\int_0^1 1\,\mathrm{d}x$.`, R`The volume is $\pi$.`, R`This is a cylinder of radius $1$ and height $1$. The integral confirms the cylinder formula.`],
      [R`Compute $\int_0^1 x^2\,\mathrm{d}x$ before multiplying by $\pi$.`, R`The integral is $\frac{1}{3}$.`, R`Multiply by $\pi$ after the integral is done. This order avoids mistakes with the coefficient.`],
      [R`If the boundary function is $2$ on $[0,1]$, what is the volume of the solid?`, R`The volume is $4\pi$.`, R`The squared radius is $4$. The integral of the constant $4$ over an interval of length $1$ is $4$.`],
    ],
  },
  "vecto-kg": {
    s: R`The vector $\vec u=(x,y,z)$ has length $\sqrt{x^2+y^2+z^2}$. Sums and differences are computed coordinate by coordinate. The dot product is $x_1x_2+y_1y_2+z_1z_2$.`,
    w: R`Length in space comes from using Pythagoras' theorem twice: once in the base plane, once with the height. The dot product is still the product of the two lengths times the cosine of the angle between them, as in the plane.`,
    p: R`Leaving out the third coordinate. The vector $(1,2,2)$ has length $\sqrt{1+4+4}=3$.`,
    ex: [
      [R`Find the length of the vector $(1,2,2)$ and its dot product with $(2,-1,0)$.`, [
        [R`The length is $\sqrt{1+4+4}=3$ (length units).`, R`The length formula in space adds all three squares. The root takes the non-negative value.`],
        [R`The dot product is $1\cdot 2+2\cdot(-1)+2\cdot 0=0$.`, R`All three pairs of coordinates are multiplied. The product is $0$, so the two vectors are perpendicular.`],
      ], R`The length is $3$ (length units) and the dot product is $0$.`],
      [R`Let $A(1,0,2)$, $B(3,2,1)$, $C(2,-1,3)$. Find the dot product $\overrightarrow{AB}\cdot\overrightarrow{AC}$ and the length $AB$.`, [
        [R`We have $\overrightarrow{AB}=(2,2,-1)$ and $\overrightarrow{AC}=(1,-1,1)$.`, R`Subtract the starting point's coordinates from the end point's, component by component.`],
        [R`The dot product is $2-2-1=-1$, and the length is $AB=\sqrt{4+4+1}=3$.`, R`The dot product adds the products of matching coordinates; the length is the root of the sum of squares.`],
      ], R`The dot product is $-1$ and $AB=3$.`],
    ],
    dr: [
      [R`How long is the vector $(2,3,6)$?`, R`The length is $7$ (length units).`, R`Adding the three squares $4+9+36$ gives $49$, whose non-negative root is $7$.`],
      [R`Compute $(1,0,2)+(3,4,-1)$.`, R`The sum is $(4,4,1)$.`, R`Add coordinate by coordinate in space, including the height.`],
      [R`What is the dot product of $(1,1,1)$ and $(1,-1,0)$?`, R`The dot product is $0$.`, R`With this definition, a dot product of $0$ is necessary and sufficient for the vectors to be perpendicular.`],
    ],
  },
  "mat-phang": {
    s: R`The plane through $M_0(x_0,y_0,z_0)$ with non-zero normal vector $\vec n=(a,b,c)$ has equation $a(x-x_0)+b(y-y_0)+c(z-z_0)=0$.`,
    w: R`A point $M$ lies in the plane when the vector $\overrightarrow{M_0M}$ lies in the plane, that is, is perpendicular to the normal. Writing the dot product $\vec n\cdot\overrightarrow{M_0M}=0$ in coordinates gives the equation.`,
    p: R`Using the direction vector of a line in the plane as the normal. The normal must be perpendicular to the plane.`,
    ex: [
      [R`Write the plane through $(1,0,0)$ with normal $(1,1,1)$.`, [
        [R`The equation is $1(x-1)+1(y-0)+1(z-0)=0$.`, R`Each coordinate of the normal multiplies the difference from the given point's coordinate.`],
        [R`Simplifying gives $x+y+z-1=0$.`, R`Expand and move the terms to one side. The normal is still $(1,1,1)$.`],
      ], R`The equation is $x+y+z-1=0$.`],
      [R`Write the equation of the plane through the three points $A(1,0,0)$, $B(0,2,0)$, $C(0,0,3)$.`, [
        [R`The three points lie on the three coordinate axes, so use the intercept form $\frac{x}{1}+\frac{y}{2}+\frac{z}{3}=1$.`, R`A plane meeting the three axes at non-zero $a$, $b$, $c$ has intercept form.`],
        [R`Multiply both sides by $6$: $6x+3y+2z-6=0$.`, R`Clear the denominators to get the general equation with integer coefficients.`],
      ], R`The plane has equation $6x+3y+2z-6=0$.`],
    ],
    dr: [
      [R`Does the point $(1,2,-2)$ lie in the plane $x+y+z-1=0$?`, R`Yes, because the expression equals $0$.`, R`A point lies in the plane exactly when it satisfies the equation.`],
      [R`What are the coordinates of a normal to $2x-y+z+1=0$? Is the vector $(1,2,0)$ a direction lying in the plane, perpendicular to that normal?`, R`One normal is $(2,-1,1)$, and the vector $(1,2,0)$ is perpendicular to it.`, R`The three coefficients of $x, y, z$ form a normal. A dot product of $0$ confirms a direction lying in the plane.`],
      [R`Give a normal to the plane $z=0$.`, R`One normal is $(0,0,1)$.`, R`The horizontal coordinate plane takes the vertical axis as a normal.`],
    ],
  },
  "duong-cau": {
    s: R`The line through $M_0$ with direction vector $\vec u\neq\vec 0$ has a parametric equation in $t$. The sphere with centre $I$ and radius $R>0$ consists of the points at distance exactly $R$ from $I$.`,
    w: R`Moving from $M_0$ in the direction $\vec u$ with every coefficient $t$ sweeps the whole line, so each point of the line corresponds to exactly one value of $t$. The sphere is the condition "distance to the centre equals $R$" written in coordinates.`,
    p: R`Writing $R$ on the right-hand side of the sphere equation. The right-hand side is $R^2$, so a sphere of radius $3$ has right-hand side $9$.`,
    ex: [
      [R`A line passes through $(1,2,3)$ with direction $(1,0,0)$. Which point corresponds to $t=2$? What is the equation of the sphere centred at the origin with radius $3$?`, [
        [R`The point on the line is $(1+2,2,3)=(3,2,3)$.`, R`Add the parameter times the direction to the base point. Only the first coordinate changes, because the other two direction coordinates are $0$.`],
        [R`The sphere is $x^2+y^2+z^2=9$.`, R`The centre is the origin, so there are no first-degree terms. The right-hand side is the squared radius.`],
      ], R`The point for $t=2$ is $(3,2,3)$. The sphere is $x^2+y^2+z^2=9$.`],
      [R`Write the equation of the sphere with diameter $AB$, where $A(1,2,3)$ and $B(3,0,1)$.`, [
        [R`The centre is the midpoint $I(2,1,2)$ of $AB$.`, R`A diameter passes through the centre, so the centre sits halfway between the endpoints.`],
        [R`The radius is $R=IA=\sqrt{1+1+1}=\sqrt3$.`, R`The radius is the distance from the centre to one end of the diameter.`],
      ], R`The sphere has equation $(x-2)^2+(y-1)^2+(z-2)^2=3$.`],
    ],
    dr: [
      [R`Does the point $(1,2,2)$ lie on the sphere $x^2+y^2+z^2=9$?`, R`Yes, because the sum of squares is $9$.`, R`A point is on the sphere when its distance to the centre equals the radius.`],
      [R`What is the radius of the sphere $x^2+y^2+z^2=9$?`, R`The radius is $3$ (length units).`, R`With the centre at the origin, the radius is the non-negative root of the right-hand side.`],
      [R`For the line through $(0,0,0)$ with direction $(0,1,0)$, what is the second coordinate at $t=4$?`, R`The second coordinate is $4$.`, R`Only the second coordinate of the direction is not $0$, so the parameter is added to the second coordinate alone.`],
    ],
  },
  "goc-kc-12": {
    s: R`The cosine of the angle between two non-zero vectors is their dot product divided by the product of their lengths. The distance from a point to a plane uses the absolute value of the equation divided by the length of the normal.`,
    w: R`The distance from a point to a plane is the length of the projection of a connecting vector onto the normal. Dividing by the normal's length normalises it, and the absolute value is taken because distance is non-negative.`,
    p: R`Forgetting to divide by the length of the normal. The result would then change if the whole equation were multiplied by a number, which cannot happen to a distance.`,
    ex: [
      [R`Find the distance from $(0,0,5)$ to the plane $z=0$, and the cosine of the angle between $(1,0,0)$ and $(1,1,0)$.`, [
        [R`The distance is $5$ (length units).`, R`The normal $(0,0,1)$ has length $1$. The numerator is the absolute value of the height.`],
        [R`The dot product is $1$, the lengths are $1$ and $\sqrt{2}$, so the cosine is $\frac{1}{\sqrt{2}}$.`, R`Both vectors are non-zero, so the cosine can be written. The result lies in $[-1,1]$.`],
      ], R`The distance is $5$ (length units). The cosine is $\frac{\sqrt{2}}{2}$.`],
      [R`Find the distance from $M(1,2,3)$ to the plane $(P): 2x-y+2z+1=0$.`, [
        [R`Numerator: $|2\cdot 1-2+2\cdot 3+1|=7$.`, R`Substitute the point's coordinates into the left-hand side of the plane equation and take the absolute value.`],
        [R`Denominator: $\sqrt{4+1+4}=3$.`, R`The denominator is the length of the normal vector.`],
      ], R`The distance is $\frac{7}{3}$.`],
    ],
    dr: [
      [R`What is the distance from $(1,2,2)$ to the origin?`, R`The distance is $3$ (length units).`, R`The three squares add up to $9$. The non-negative root is the distance to the origin.`],
      [R`What is the cosine of the angle between $(1,0,0)$ and $(0,1,0)$?`, R`The cosine is $0$, so the angle is $90^\circ$.`, R`The dot product is $0$ and both lengths are $1$. The angle between the vectors is a right angle.`],
      [R`What is the length of the normal $(0,0,2)$?`, R`The length is $2$.`, R`This length is the denominator of the point-to-plane distance formula.`],
    ],
  },
  "khoang-12": {
    s: R`Grouped data has class boundaries $a_1<a_2<\cdots<a_{k+1}$. The range is $R=a_{k+1}-a_1$. Quartiles are found by interpolation inside the group containing the mark: $Q_1=a+\frac{\frac{n}{4}-N}{n_i}h$ and $Q_3=a+\frac{\frac{3n}{4}-N}{n_i}h$, where $a$ is the group's left boundary, $N$ the cumulative frequency before the group, $n_i$ the group's frequency and $h$ the group's width.`,
    w: R`Inside the group containing the mark, the elements are treated as spread evenly along the group. The mark lies past the left boundary by a fraction equal to the number of elements still needed over the group's frequency.`,
    p: R`Taking $N$ as the cumulative frequency including the current group. The number $N$ counts only the groups before the group containing the mark.`,
    ex: [
      [R`Three groups $[0,10)$, $[10,20)$, $[20,30)$ have frequencies $2, 3, 5$. Find $R$, $Q_1$ and $Q_3$.`, [
        [R`The range is $R=a_{k+1}-a_1=30-0=30$.`, R`The left boundary of the first group is $0$ and the right boundary of the last is $30$. Their difference is the range of the grouped data.`],
        [R`The sample size is $n=10$. The mark $\frac{n}{4}=2.5$ falls in the group $[10,20)$, so $Q_1=10+\frac{2.5-2}{3}\cdot 10=\frac{35}{3}$. The mark $\frac{3n}{4}=7.5$ falls in the group $[20,30)$, so $Q_3=20+\frac{7.5-5}{5}\cdot 10=25$.`, R`Interpolation uses the cumulative frequency before the group and the group's own frequency. Do not average two values as with ungrouped data.`],
      ], R`The range is $30$, the first quartile is $\frac{35}{3}$ and the third quartile is $25$.`],
      [R`Grouped data has groups $[0,10)$, $[10,20)$, $[20,30)$ with frequencies $3$, $5$, $2$. Find the first quartile.`, [
        [R`The sample size is $n=10$ and the mark is $\frac{n}{4}=2.5$; the first group's cumulative frequency is $3$, so $Q_1$ lies in $[0,10)$.`, R`The group containing a quartile is the one where the cumulative frequency first passes the mark.`],
        [R`Interpolate: $Q_1=0+\frac{2.5-0}{3}\cdot 10\approx 8.33$.`, R`Inside the group containing the mark, treat the values as spread evenly along the group's width.`],
      ], R`The first quartile is about $8.33$.`],
    ],
    dr: [
      [R`For the same table, what is the interquartile range $Q_3-Q_1$?`, R`The interquartile range is $\frac{40}{3}$.`, R`Subtract the interpolated first quartile from the third quartile. Do not subtract two group boundaries.`],
      [R`What is the cumulative frequency before the group $[20,30)$?`, R`The cumulative frequency is $5$.`, R`Add the frequencies of the groups before it. The mark $\frac{3n}{4}=7.5$ is greater than $5$, so it lies in the last group.`],
      [R`What is the width of each group in the table above, and how many times that width is $R$?`, R`The group width is $10$ and the range is $3$ times the group width.`, R`Three adjacent groups, each of width $10$, cover the interval from $0$ to $30$.`],
    ],
  },
  "lech-chuan": {
    s: R`With representative values $c_i$ and frequencies $n_i$, the mean is $\bar x=\frac{1}{n}\sum n_i c_i$. The variance is $\frac{1}{n}\sum n_i(c_i-\bar x)^2$. The standard deviation is the non-negative square root of the variance.`,
    w: R`Each group is replaced by its representative value repeated as many times as the group's frequency. Then the usual variance formula is applied to that replacement list.`,
    p: R`Forgetting to multiply the squared deviation by the frequency, or dividing by the number of groups. Divide by the sample size $n$.`,
    ex: [
      [R`Take the same three groups $[0,10)$, $[10,20)$, $[20,30)$ with frequencies $2, 3, 5$ and representative values $5, 15, 25$. Find the mean, the variance and the standard deviation.`, [
        [R`The mean is $\frac{2\cdot 5+3\cdot 15+5\cdot 25}{10}=18$.`, R`Multiply each representative value by its group's frequency, then divide by the sample size $n=10$.`],
        [R`The variance is $\frac{2(5-18)^2+3(15-18)^2+5(25-18)^2}{10}=61$. The standard deviation is $\sqrt{61}$.`, R`Deviations are taken from the representative values, not the original data. Square each deviation, then multiply by $n_i$.`],
      ], R`The mean is $18$, the variance is $61$ and the standard deviation is $\sqrt{61}$.`],
      [R`Two classes have the same mean score $7$; class A has standard deviation $0.8$ and class B has $1.6$. Comment.`, [
        [R`The variances of the two classes are $0.64$ and $2.56$.`, R`The variance is the square of the standard deviation.`],
        [R`Class A has the smaller standard deviation, so its scores cluster more closely around $7$.`, R`The standard deviation measures how spread out the data are around the mean.`],
      ], R`Class A has more consistent results than class B.`],
    ],
    dr: [
      [R`What is the standard deviation of a sample with variance $61$?`, R`The standard deviation is $\sqrt{61}$.`, R`It is the non-negative square root of the variance. The numerator $2\cdot 13^2+3\cdot 3^2+5\cdot 7^2$ is the sum of $n_i$ times the squared deviations.`],
      [R`How much does the representative value $25$ with frequency $5$ contribute to the numerator of the mean?`, R`It contributes $125$.`, R`The mean formula uses the products $n_i c_i$. This group contributes $5$ times $25$.`],
      [R`What is the squared deviation of the representative value $5$ from the mean $18$?`, R`The squared deviation is $169$.`, R`A negative deviation still gives a positive square. The number $169$ is multiplied by the frequency $2$ in the numerator of the variance.`],
    ],
  },
  "co-dieu-kien": {
    s: R`If $P(B)>0$, then $P(A\mid B)=\frac{P(A\cap B)}{P(B)}$. The denominator is the probability of the condition, not of the whole sample space.`,
    w: R`Once $B$ is known to have happened, the sample space shrinks to $B$. In that smaller space $A$ can only happen in the common part $A\cap B$, so the probability is the share of the common part within $B$.`,
    p: R`Confusing $P(A\mid B)$ with $P(B\mid A)$. These two probabilities have different denominators and are generally not equal.`,
    ex: [
      [R`Roll two distinguishable dice. Given that the total is $8$, find the probability that one face shows $6$.`, [
        [R`The outcomes with total $8$ are $(2,6)$, $(3,5)$, $(4,4)$, $(5,3)$ and $(6,2)$, that is, $5$ outcomes.`, R`The condition shrinks the sample space to five equally likely outcomes. Other totals are not used.`],
        [R`Two outcomes have a face $6$, so the conditional probability is $\frac{2}{5}$.`, R`The numerator counts outcomes that satisfy the condition and belong to the event. The denominator is the number of outcomes of the condition.`],
      ], R`The conditional probability is $\frac{2}{5}$.`],
      [R`A box has $5$ red and $3$ blue marbles. Two marbles are drawn one after another without replacement. Given that the first is red, find the probability that the second is also red.`, [
        [R`After a red marble is drawn, the box has $4$ red and $3$ blue marbles.`, R`The known condition changes what is in the box before the second draw.`],
        [R`The required probability is $\frac{4}{7}$.`, R`Among the marbles left, each one is equally likely to be drawn.`],
      ], R`The probability is $\frac{4}{7}$.`],
    ],
    dr: [
      [R`If $P(A\cap B)=\frac{1}{4}$ and $P(B)=\frac{1}{2}$, find $P(A\mid B)$.`, R`The conditional probability is $\frac{1}{2}$.`, R`Divide the probability of the intersection by the probability of the condition; the denominator is not $0$.`],
      [R`Among the outcomes with total $8$, consider $(3,5)$, $(4,4)$ and $(5,3)$. What is the total of each?`, R`Each has total $8$, and these are the three outcomes without a face $6$.`, R`These three pairs satisfy the condition of total $8$ and contain no face $6$. Each total is computed separately.`],
      [R`If $P(A\cap B)=\frac{1}{6}$ and $P(B)=\frac{1}{3}$, what does the conditional formula give?`, R`The conditional probability is $\frac{1}{2}$.`, R`The denominator $P(B)$ is not $0$, so the division is allowed. If the denominator were $0$, the formula could not be used.`],
    ],
  },
  "toan-phan": {
    s: R`If $B$ and $\overline B$ form a complete system and $P(B)$, $P(\overline B)$ are both positive, then $P(A)=P(A\mid B)P(B)+P(A\mid\overline B)P(\overline B)$.`,
    w: R`The event $A$ splits into two disjoint parts: the part happening with $B$ and the part happening with $\overline B$. Each part has probability equal to the branch probability times the conditional probability on that branch.`,
    p: R`Adding $P(A\mid B)$ and $P(A\mid\overline B)$ directly. Each term must be multiplied by the probability of its branch.`,
    ex: [
      [R`Given $P(B)=\frac{1}{3}$, $P(A\mid B)=\frac{1}{2}$ and $P(A\mid\overline B)=\frac{1}{4}$, find $P(A)$.`, [
        [R`The probability of the complement is $1-\frac{1}{3}=\frac{2}{3}$.`, R`The event $B$ and its complement form a complete system. Their probabilities add up to $1$.`],
        [R`The law of total probability gives $\frac{1}{2}\cdot\frac{1}{3}+\frac{1}{4}\cdot\frac{2}{3}=\frac{1}{3}$.`, R`Add the two branches. Each branch is a conditional probability times the probability of that branch.`],
      ], R`The total probability is $\frac{1}{3}$.`],
      [R`Two machines make $60\%$ and $40\%$ of the products, with defect rates $2\%$ and $5\%$ respectively. One product is picked at random. Find the probability that it is defective.`, [
        [R`A defective product from the first machine has probability $0.6\cdot 0.02=0.012$.`, R`A branch's probability is the probability of choosing the branch times the conditional probability on that branch.`],
        [R`From the second machine: $0.4\cdot 0.05=0.02$. Adding gives $0.032$.`, R`The two branches are disjoint and cover every case, so they are added.`],
      ], R`The probability that the product is defective is $0.032$.`],
    ],
    dr: [
      [R`If $P(B)=\frac{1}{4}$, what is $P(\overline B)$?`, R`The probability is $\frac{3}{4}$.`, R`The complement takes the remaining probability so the total is $1$.`],
      [R`Compute $\frac{1}{2}\cdot\frac{1}{4}+\frac{1}{2}\cdot\frac{3}{4}$.`, R`The sum is $\frac{1}{2}$.`, R`These are the two branches of the total probability formula. Here the conditional probability is the same on both branches.`],
      [R`What is one branch $\frac{2}{5}\cdot\frac{1}{2}$ equal to?`, R`The branch equals $\frac{1}{5}$.`, R`Multiply the conditional probability by the probability of the group. The other group is not added yet.`],
    ],
  },
  bayes: {
    s: R`If $P(A)>0$ and $P(B)>0$, then $P(B\mid A)=\frac{P(A\mid B)P(B)}{P(A)}$. The numerator is one branch of the total probability formula. The denominator is the total probability of $A$.`,
    w: R`The probability of $A\cap B$ can be written in two ways: $P(A\mid B)P(B)$ and $P(B\mid A)P(A)$. Setting them equal and dividing by $P(A)$ gives Bayes' formula.`,
    p: R`Ignoring the base rate $P(B)$. When $B$ is rare, $P(B\mid A)$ can still be small even though $P(A\mid B)$ is very large.`,
    ex: [
      [R`Given $P(A\mid B)=\frac{1}{2}$, $P(B)=\frac{1}{3}$ and $P(A)=\frac{1}{3}$, find $P(B\mid A)$.`, [
        [R`The numerator is $\frac{1}{2}\cdot\frac{1}{3}=\frac{1}{6}$.`, R`The numerator is the probability of the intersection, from the multiplication rule for conditional probability.`],
        [R`Dividing by $P(A)=\frac{1}{3}$ gives $\frac{1}{2}$.`, R`The denominator is not $0$. The result is the probability of $B$ once $A$ is known to have happened.`],
      ], R`The probability $P(B\mid A)$ is $\frac{1}{2}$.`],
      [R`Two machines make $60\%$ and $40\%$ of the products, with defect rates $2\%$ and $5\%$, so the overall defect rate is $0.032$. A product picked is defective. Find the probability that the second machine made it.`, [
        [R`By Bayes' formula, the probability is $\frac{0.4\cdot 0.05}{0.032}$.`, R`The numerator is the second machine's branch, and the denominator is the total probability of a defect.`],
        [R`This gives $\frac{0.02}{0.032}=0.625$.`, R`The second machine makes fewer products but has a higher defect rate, so it accounts for most of the defects.`],
      ], R`The probability that the defective product came from the second machine is $0.625$.`],
    ],
    dr: [
      [R`If the Bayes numerator is $\frac{1}{6}$ and $P(A)=\frac{1}{3}$, what is the result?`, R`The result is $\frac{1}{2}$.`, R`Divide the numerator by the total probability of $A$. The denominator is not $0$.`],
      [R`Compute $P(A\mid B)P(B)$ when both factors equal $\frac{1}{2}$.`, R`The product is $\frac{1}{4}$.`, R`This product is the numerator of Bayes' formula, before dividing by $P(A)$.`],
      [R`If $P(A\mid B)=P(A)$ and $P(B)>0$, what does Bayes' formula give for $P(B\mid A)$?`, R`The result is $P(B)$.`, R`When the conditional probability equals the unconditional one, Bayes gives back exactly $P(B)$.`],
    ],
  },
};
