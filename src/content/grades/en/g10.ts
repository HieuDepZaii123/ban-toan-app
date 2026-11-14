/** Lớp 10 bằng tiếng Anh. Thứ tự ví dụ và bài luyện khớp bản tiếng Việt. */
import type { LessonEn } from "./types.ts";

const R = String.raw;

export const g10En: Record<string, LessonEn> = {
  "menh-de-bai": {
    s: R`A proposition is a statement that is either true or false, never both. The negation of a true proposition is false, and the negation of a false one is true.`,
    w: R`Mathematics only reasons with statements whose truth value is clear. Negation swaps true and false, so negating twice brings back the original proposition.`,
    p: R`Negating "every" as "every... not". The negation of "every natural number is even" is "at least one natural number is not even".`,
    ex: [
      [R`Consider the proposition $P$: "$6$ is even". Is $P$ true or false, and what about the negation of $P$?`, [
        [R`The proposition $P$ is true because $6$ divided by $2$ leaves remainder $0$.`, R`An even number is an integer divisible by $2$. This division leaves no remainder.`],
        [R`The negation of $P$ is "$6$ is not even", and that is false.`, R`Taking the negation swaps true and false. There is no third option.`],
      ], R`The proposition $P$ is true and the negation of $P$ is false.`],
      [R`Consider $Q$: "Every natural number $n$ satisfies $n^2\ge n$". Is it true or false? State the negation of $Q$.`, [
        [R`For $n=0$ we have $0\ge 0$, and for $n\ge 1$ we get $n^2=n\cdot n\ge n$. So $Q$ is true.`, R`A statement with "every" is true only when no case makes it false.`],
        [R`The negation of $Q$ is: "There is at least one natural number $n$ with $n^2<n$".`, R`The negation of "every ... is ..." is "at least one ... is not ...", and the sign $\ge$ becomes $<$.`],
      ], R`The proposition $Q$ is true, so its negation is false.`],
    ],
    dr: [
      [R`Is the proposition "$3\cdot 4=11$" true or false?`, R`The proposition is false.`, R`The product of $3$ and $4$ is $12$, not $11$, so the statement is false.`],
      [R`Is the proposition "$9$ is a perfect square" true or false?`, R`It is true, because $3^2=9$.`, R`A perfect square is the square of an integer. The square of $3$ matches the given number.`],
      [R`Is the proposition "$7$ is odd" true or false?`, R`It is true, because $7$ divided by $2$ leaves remainder $1$.`, R`An odd number leaves remainder $1$ when divided by $2$. This division confirms the proposition.`],
    ],
  },
  "phep-tap": {
    s: R`For two finite sets, $n(A\cup B)=n(A)+n(B)-n(A\cap B)$. The difference $A\setminus B$ consists of the elements in $A$ that are not in $B$.`,
    w: R`Adding $n(A)$ and $n(B)$ counts the elements in both sets twice. Subtracting $n(A\cap B)$ once makes every element counted exactly once.`,
    p: R`Adding $20+15$ directly when some students take both subjects. The eight shared students were counted twice, so the number taking at least one subject is $27$.`,
    ex: [
      [R`There are $20$ students taking Maths, $15$ taking Literature and $8$ taking both. How many take at least one subject?`, [
        [R`Use $n(A\cup B)=20+15-8$.`, R`The eight students taking both are in the $20$ and in the $15$, so plain addition counts them twice.`],
        [R`The union has $27$ elements.`, R`The calculation $20+15-8$ gives $27$. This is the number of students in at least one of the two sets.`],
      ], R`There are $27$ students taking at least one subject.`],
      [R`Let $A=\{1,2,3,4,5\}$ and $B=\{4,5,6,7\}$. Find $A\cap B$, $A\cup B$ and $A\setminus B$.`, [
        [R`The elements in both sets are $4$ and $5$, so $A\cap B=\{4,5\}$.`, R`The intersection consists of the elements present in both sets at once.`],
        [R`Put all elements together, each written once: $A\cup B=\{1,2,3,4,5,6,7\}$.`, R`The union contains the elements in at least one set; shared elements are written only once.`],
        [R`Remove from $A$ the elements of $B$: $A\setminus B=\{1,2,3\}$.`, R`The difference $A\setminus B$ keeps the elements of $A$ that are not in $B$.`],
      ], R`We have $n(A\cup B)=5+4-2=7$, as the counting formula for a union predicts.`],
    ],
    dr: [
      [R`Given $n(A)=12$, $n(B)=9$ and $n(A\cap B)=4$, find $n(A\cup B)$.`, R`The union has $17$ elements.`, R`The intersection is counted in both sets, so it must be subtracted exactly once.`],
      [R`Two disjoint sets have $6$ and $5$ elements. How many elements does their union have?`, R`The union has $11$ elements.`, R`The intersection is empty, so no element is counted twice.`],
      [R`The set $A$ has $10$ elements and $A\cap B$ has $3$ elements. How many elements does $A\setminus B$ have?`, R`The difference has $7$ elements.`, R`The difference removes from $A$ exactly the elements that lie in the intersection.`],
    ],
  },
  "bpt-hai": {
    s: R`The solutions of $ax+by\le c$ form a half-plane, including the boundary line when the inequality is not strict. With extra sign conditions, the solution region is the intersection of several half-planes.`,
    w: R`The line $ax+by=c$ splits the plane into two halves. The expression $ax+by-c$ keeps one sign on each half, because changing sign requires passing through the value $0$, that is, crossing the line.`,
    p: R`Shading the wrong half-plane. Test a point not on the boundary, usually the origin, before deciding which side is the solution region.`,
    ex: [
      [R`Take the region $x+y\le 4$, $x\ge 0$, $y\ge 0$. Does the point $(1,2)$ belong to it, and where does the boundary $x+y=4$ meet the vertical axis?`, [
        [R`At $(1,2)$ we have $1+2=3\le 4$, and both coordinates are non-negative.`, R`All three inequalities hold, so the point lies in the intersection of the three half-planes.`],
        [R`The lines $x=0$ and $x+y=4$ meet at the point $(0,4)$.`, R`On the vertical axis the first coordinate is $0$. Substituting into the boundary gives second coordinate $4$.`],
      ], R`The point $(1,2)$ lies in the region. The boundary meets the vertical axis at $(0,4)$.`],
      [R`A workshop makes $x$ tables and $y$ chairs. Each table takes $2$ hours and each chair $1$ hour, with at most $10$ hours in total. Does the point $(3,5)$ satisfy the condition?`, [
        [R`The time condition is the inequality $2x+y\le 10$, with $x\ge 0$, $y\ge 0$.`, R`Each table takes two hours, so $x$ tables take $2x$ hours, plus $y$ hours for the chairs.`],
        [R`Substituting $(3,5)$ gives $2\cdot 3+5=11>10$, so this point is not in the solution region.`, R`A point is in the solution region when its coordinates make the inequality true.`],
      ], R`Making $3$ tables and $5$ chairs needs $11$ hours, more than the $10$ hours allowed.`],
    ],
    dr: [
      [R`Is the point $(3,2)$ in the region $x+y\le 4$, $x\ge 0$, $y\ge 0$?`, R`No, it is not in the region.`, R`The sum of the coordinates exceeds $4$, so the main inequality of the region fails.`],
      [R`Where does the line $x+2y=6$ meet the horizontal axis?`, R`It meets it at $(6,0)$.`, R`On the horizontal axis the second coordinate is $0$. Substituting into the line gives the first coordinate.`],
      [R`Is the point $(0,0)$ in the half-plane $x+y\le 4$?`, R`Yes, the origin lies in that half-plane.`, R`The sum of the coordinates is $0$, and $0$ does not exceed $4$.`],
    ],
  },
  "he-bpt": {
    s: R`The solution region of a system is the intersection of half-planes. Each vertex of the polygon is the intersection of two boundary lines and must satisfy every other inequality.`,
    w: R`A point solves the system when it satisfies all inequalities at once, so the solution region is the common part of the half-planes. A linear expression $F=ax+by$ on a polygonal region reaches its maximum and minimum at the vertices.`,
    p: R`Taking the intersection of two boundary lines as a vertex without checking it. That point must also satisfy the remaining inequalities to be a vertex of the region.`,
    ex: [
      [R`Find the intersection of $x=3$ and $x+y=4$ in the system $x\ge 0$, $y\ge 0$, $x+y\le 4$, $x\le 3$, then check that point.`, [
        [R`The two lines meet at $(3,1)$.`, R`Substituting $x=3$ into $x+y=4$ gives $y=1$. Two independent linear equations have exactly one solution.`],
        [R`The point $(3,1)$ satisfies $y\ge 0$ and $x\le 3$.`, R`The remaining inequalities all hold, so this intersection is a vertex of the region and is not discarded.`],
      ], R`One vertex of the region is $(3,1)$.`],
      [R`Find the maximum of $F=3x+2y$ on the region $x\ge 0$, $y\ge 0$, $x+y\le 5$, $x\le 3$.`, [
        [R`The vertices of the region are $(0,0)$, $(3,0)$, $(3,2)$ and $(0,5)$.`, R`Each vertex is the intersection of two boundary lines and must satisfy all the other inequalities.`],
        [R`The values of $F$ at the four vertices are $0$, $9$, $13$ and $10$.`, R`A linear expression on a polygon reaches its maximum at one of the vertices.`],
      ], R`The maximum of $F$ is $13$, reached at $(3,2)$.`],
    ],
    dr: [
      [R`Find the intersection of $x=0$ and $x+y=4$.`, R`The intersection is the point $(0,4)$.`, R`Substituting the first equation into the second leaves a single value for the other coordinate.`],
      [R`Is the point $(4,0)$ a vertex of the region $x\le 3$, $x+y\le 4$, $x\ge 0$, $y\ge 0$?`, R`No, because the first coordinate $4$ exceeds $3$.`, R`Lying on two boundary lines is not enough. The point must also satisfy every other inequality of the system.`],
      [R`Over the four vertices $(0,0)$, $(3,0)$, $(3,1)$, $(0,4)$, what is the maximum of $x+2y$?`, R`The maximum is $8$, at $(0,4)$.`, R`A linear function on a closed polygon is largest at a vertex. All four vertices have been checked.`],
    ],
  },
  "do-thi": {
    s: R`The parabola $y=ax^2+bx+c$ with $a\neq 0$ has vertex at $x=-\frac{b}{2a}$ with height $-\frac{\Delta}{4a}$, where $\Delta=b^2-4ac$. If $a>0$ it opens upwards and the vertex gives the minimum. If $a<0$ it opens downwards and the vertex gives the maximum.`,
    w: R`Write $ax^2+bx+c=a\left(x+\frac{b}{2a}\right)^2-\frac{\Delta}{4a}$. The square is smallest, equal to $0$, when $x=-\frac{b}{2a}$, so that is the first coordinate of the vertex and $-\frac{\Delta}{4a}$ is its second coordinate.`,
    p: R`Dropping the minus sign in the vertex formula. For $y=x^2-4x+1$ we get $-\frac{b}{2a}=2$, not $-2$.`,
    ex: [
      [R`For $y=x^2-4x+1$, find the vertex and say whether it gives a minimum or a maximum.`, [
        [R`The vertex is at $-\frac{-4}{2}=2$. Its height is $-\frac{\Delta}{4a}=-\frac{12}{4}=-3$.`, R`The discriminant is $\Delta=16-4=12$. The vertex height is minus the discriminant divided by $4a$.`],
        [R`Since $a=1>0$, the parabola opens upwards and $-3$ is the minimum.`, R`The sign of the leading coefficient decides which way the parabola opens. The vertex is the lowest point when it opens upwards.`],
      ], R`The vertex is $(2,-3)$ and it gives the minimum.`],
      [R`Does $y=-2x^2+8x-3$ have a maximum or a minimum? Find it.`, [
        [R`The coefficient $a=-2<0$, so the parabola opens downwards and the vertex is the highest point.`, R`The sign of $a$ decides whether the parabola opens up or down.`],
        [R`The vertex is at $x=-\frac{8}{2\cdot(-2)}=2$, with height $y=-8+16-3=5$.`, R`Substitute the vertex position into the function to get the value there.`],
      ], R`The function reaches its maximum $5$ at $x=2$.`],
    ],
    dr: [
      [R`Find the first coordinate of the vertex of $y=x^2-6x+5$.`, R`The vertex is at $3$.`, R`The vertex lies halfway between the two roots, which are one and five.`],
      [R`Find the height of the vertex of $y=x^2-6x+5$.`, R`The vertex height is $-4$.`, R`The discriminant is $36-20=16$. The vertex height is $-16$ divided by $4$.`],
      [R`Which way does the leading coefficient of $y=-2x^2+x$ make the parabola open?`, R`It opens downwards, because the leading coefficient is negative.`, R`A negative leading coefficient is enough for the parabola to open downwards.`],
    ],
  },
  "dau-tam-thuc": {
    s: R`If $a\neq 0$ and $\Delta>0$, the two roots split the number line into three intervals. On the two outer intervals the sign is the sign of $a$, and it changes at each simple root.`,
    w: R`With two roots, $f(x)=a(x-x_1)(x-x_2)$. Between the roots the two factors have opposite signs, so their product is negative and $f$ has the sign opposite to $a$. Outside the roots both factors share a sign, so $f$ has the sign of $a$.`,
    p: R`Memorising "opposite inside, same outside" and using it even when $\Delta\le 0$. Then there is no middle interval, and the quadratic has the sign of $a$ at every $x$ other than a double root.`,
    ex: [
      [R`Study the sign of $f(x)=x^2-5x+6$.`, [
        [R`The roots are $x=2$ and $x=3$, and the leading coefficient is $1>0$.`, R`The quadratic factors as $(x-2)(x-3)$. The outer intervals take the positive sign of the leading coefficient.`],
        [R`On $(2,3)$ the quadratic is negative. At $x=\frac{5}{2}$ its value is $-\frac{1}{4}$.`, R`One point in the middle interval decides the whole interval, because the sign only changes at a root.`],
      ], R`The quadratic is positive outside $[2,3]$, negative on $(2,3)$, and $0$ at the two roots.`],
      [R`Study the sign of $f(x)=-x^2+2x+3$.`, [
        [R`Solving $-x^2+2x+3=0$ gives the roots $x=-1$ and $x=3$.`, R`The two roots split the number line into three intervals to examine.`],
        [R`Since $a=-1<0$, $f(x)>0$ when $-1<x<3$, and $f(x)<0$ when $x<-1$ or $x>3$.`, R`Between the two roots the quadratic has the sign opposite to the coefficient $a$.`],
      ], R`The quadratic is positive on $(-1,3)$ and negative on the two outer intervals.`],
    ],
    dr: [
      [R`Is the value of $x^2-5x+6$ at $x=\frac{5}{2}$ negative or positive?`, R`The value is $-\frac{1}{4}$, so it is negative.`, R`The leading coefficient is positive, so the quadratic is negative exactly between the roots.`],
      [R`What are the two roots of $-x^2+1=0$?`, R`The roots are $x=-1$ and $x=1$.`, R`The leading coefficient is negative, so the intervals outside the roots carry the negative sign.`],
      [R`What is $-x^2+1$ at $x=0$?`, R`The value is $1$, so the interval $(-1,1)$ is positive.`, R`One point inside the middle interval is enough to decide the sign on all of it.`],
    ],
  },
  "bpt-bac-hai": {
    s: R`Build the sign table of the quadratic $ax^2+bx+c$ with $a\neq 0$. The solution set is the union of the intervals whose sign matches the inequality. A non-strict inequality also includes the roots of the quadratic.`,
    w: R`Solving the inequality means asking where the quadratic has which sign. The sign table already answers that on each interval; you only pick the intervals with the right sign.`,
    p: R`Solving it like an equation and writing $x\le 2$ or $x\le 3$. The solution set of $x^2-5x+6\le 0$ is the interval $[2,3]$, read from the sign table.`,
    ex: [
      [R`Solve $x^2-5x+6\le 0$.`, [
        [R`The quadratic has roots $2$ and $3$, and is negative between them.`, R`The leading coefficient is positive. The negative sign sits between the two simple roots.`],
        [R`The inequality uses less than or equal, so the solution set is $[2,3]$.`, R`The endpoints make the quadratic equal to $0$, and $0$ satisfies the non-strict inequality.`],
      ], R`The solution set is $[2,3]$.`],
      [R`Solve the inequality $x^2-4\ge 0$.`, [
        [R`The quadratic $x^2-4$ has roots $x=-2$ and $x=2$, with $a=1>0$.`, R`The coefficient is positive, so the quadratic is positive on the two intervals outside the roots.`],
        [R`The inequality is not strict, so both roots are included.`, R`Greater than or equal allows the quadratic to equal zero at the two endpoints.`],
      ], R`The solution set is $(-\infty,-2]\cup[2,+\infty)$.`],
    ],
    dr: [
      [R`Solve $x^2-4>0$.`, R`The solution set is $(-\infty,-2)\cup(2,+\infty)$.`, R`A strict inequality excludes the roots. The leading coefficient is positive, so keep the two outer intervals.`],
      [R`Solve $x^2-4\le 0$.`, R`The solution set is $[-2,2]$.`, R`Less than or equal takes both roots and the interval between them.`],
      [R`Does $x=3$ belong to the solution set of $x^2-5x+6\le 0$?`, R`Yes, because $x=3$ is a root of the quadratic.`, R`A non-strict inequality accepts the roots, where the quadratic equals zero.`],
    ],
  },
  "quy-ve-bac-hai": {
    s: R`For an equation with a square root, the necessary conditions are that the root is defined and the other side is non-negative. Squaring gives a consequence, not an equivalent equation. Every solution of the new equation must be checked.`,
    w: R`Squaring both sides can create extra solutions, because $A^2=B^2$ also holds when $A=-B$. Substituting back into the original equation removes those extra solutions.`,
    p: R`Squaring and keeping every solution. After squaring, $\sqrt{x+1}=x-1$ gives $x=0$ and $x=3$, but $x=0$ makes the right-hand side negative and must be rejected.`,
    ex: [
      [R`Solve $\sqrt{x+1}=x-1$.`, [
        [R`The necessary condition is $x\ge 1$. Squaring gives $x(x-3)=0$, so the candidates are $0$ and $3$.`, R`Squaring keeps the equality, so it only gives a necessary condition. The resulting equation has two solutions.`],
        [R`Reject $x=0$ because it fails $x\ge 1$. Keep $x=3$.`, R`At $x=3$ both sides equal $2$. A rejected candidate is not written in the solution set.`],
      ], R`The only solution is $x=3$.`],
      [R`Solve the equation $\sqrt{2x+3}=x$.`, [
        [R`The condition is $x\ge 0$. Squaring both sides gives $2x+3=x^2$, that is, $x^2-2x-3=0$.`, R`The right-hand side equals a square root, so it must be non-negative before squaring.`],
        [R`The quadratic has roots $x=3$ and $x=-1$; reject $x=-1$ since it is negative.`, R`Squaring can introduce extra solutions, so compare with the condition again.`],
        [R`Check $x=3$: $\sqrt{9}=3$, which is true.`, R`Substitute into the original equation to be sure the remaining root is not an extra one.`],
      ], R`The equation has the single solution $x=3$.`],
    ],
    dr: [
      [R`Solve $\sqrt{x}=x-2$.`, R`The only solution is $x=4$.`, R`Squaring gives a necessary condition. A solution must still satisfy the original equation.`],
      [R`After squaring $\sqrt{x+1}=x-1$ there is a candidate $x=0$. Is it kept?`, R`No, because $0$ does not satisfy the condition $x\ge 1$.`, R`A candidate of the squared equation must still be compared with the condition and with the original equation.`],
      [R`Solve $x^2=9$ over the real numbers.`, R`The two solutions are $x=-3$ and $x=3$.`, R`The equation $x^2=a$ with $a>0$ has two opposite solutions. Both are kept when there is no extra condition.`],
    ],
  },
  gtlg: {
    s: R`For an angle $\alpha$ from $0^\circ$ to $180^\circ$, $\sin(180^\circ-\alpha)=\sin\alpha$ and $\cos(180^\circ-\alpha)=-\cos\alpha$. Sine is non-negative on this range. Cosine is negative when the angle is greater than $90^\circ$.`,
    w: R`On the upper half of the unit circle, the angles $\alpha$ and $180^\circ-\alpha$ correspond to two points symmetric about the vertical axis. They have the same height and opposite horizontal coordinates, so their sines are equal and their cosines are opposite.`,
    p: R`Giving the cosine of an obtuse angle a positive value. An angle greater than $90^\circ$ has its point left of the vertical axis, so its cosine is negative.`,
    ex: [
      [R`Find $\sin 150^\circ$ and $\cos 150^\circ$.`, [
        [R`The angle $150^\circ$ is supplementary to $30^\circ$, so $\sin 150^\circ=\sin 30^\circ=\frac{1}{2}$.`, R`The supplementary-angle formula keeps the sine. The sine of $30^\circ$ is $\frac{1}{2}$.`],
        [R`The cosine changes sign: $\cos 150^\circ=-\cos 30^\circ=-\frac{\sqrt{3}}{2}$.`, R`The supplementary-angle formula is $\cos(180^\circ-\alpha)=-\cos\alpha$. The angle $150^\circ$ is in the second quadrant, so its cosine is negative.`],
      ], R`The sine is $\frac{1}{2}$ and the cosine is $-\frac{\sqrt{3}}{2}$.`],
      [R`Given $\sin\alpha=\frac{3}{5}$ with $90^\circ<\alpha<180^\circ$, find $\cos\alpha$ and $\tan\alpha$.`, [
        [R`From $\sin^2\alpha+\cos^2\alpha=1$ we get $\cos^2\alpha=\frac{16}{25}$.`, R`The basic identity holds for every angle.`],
        [R`An obtuse angle has a negative cosine, so $\cos\alpha=-\frac{4}{5}$ and $\tan\alpha=-\frac{3}{4}$.`, R`The point for an obtuse angle lies left of the vertical axis, so its horizontal coordinate is negative.`],
      ], R`We have $\cos\alpha=-\frac{4}{5}$ and $\tan\alpha=-\frac{3}{4}$.`],
    ],
    dr: [
      [R`Find $\sin 90^\circ$.`, R`The sine is $1$.`, R`A right angle has sine $1$ and cosine $0$.`],
      [R`Find $\cos 120^\circ$.`, R`The cosine is $-\frac{1}{2}$.`, R`A supplementary angle has the same sine, while the cosine changes sign.`],
      [R`Find $\sin 0^\circ$.`, R`The sine is $0$.`, R`The angle $0^\circ$ lies on the starting side of the unit circle, where the height is $0$.`],
    ],
  },
  "dinh-li-sin": {
    s: R`In a triangle, $\frac{a}{\sin A}=\frac{b}{\sin B}=\frac{c}{\sin C}=2R$. Each side goes with the sine of the angle opposite it.`,
    w: R`Draw the diameter through one vertex of the inscribed triangle. An inscribed angle on a semicircle is a right angle, and in that right triangle the side $a$ equals the diameter $2R$ times $\sin A$.`,
    p: R`Pairing a side with the sine of an adjacent angle. The side $a$ always goes with the opposite angle $A$.`,
    ex: [
      [R`The side opposite an angle of $30^\circ$ is $6$. How long is the diameter of the circumcircle?`, [
        [R`The law of sines gives $\frac{6}{\sin 30^\circ}=2R$.`, R`A side and its opposite angle form a ratio equal to the diameter of the circumcircle.`],
        [R`Since $\sin 30^\circ=\frac{1}{2}$, we get $2R=12$.`, R`Dividing by $\frac{1}{2}$ means multiplying by $2$. The diameter is exactly $2R$.`],
      ], R`The diameter is $12$.`],
      [R`Triangle $ABC$ has $A=45^\circ$, $B=60^\circ$ and $a=10$. Find side $b$.`, [
        [R`By the law of sines, $\frac{a}{\sin A}=\frac{b}{\sin B}$.`, R`Each side is proportional to the sine of the angle opposite it.`],
        [R`It follows that $b=\frac{10\sin 60^\circ}{\sin 45^\circ}=5\sqrt6$.`, R`Substitute the values of $\sin 60^\circ$ and $\sin 45^\circ$, then simplify the root.`],
      ], R`The side $b=5\sqrt6\approx 12.25$.`],
    ],
    dr: [
      [R`Angle $A=30^\circ$, angle $B=45^\circ$ and side $a=\sqrt{2}$. Find side $b$.`, R`Side $b$ equals $2$.`, R`The law of sines ties each side to the sine of the angle opposite it.`],
      [R`The side opposite a $90^\circ$ angle is $10$. What is the radius of the circumcircle?`, R`The radius is $5$.`, R`The sine of a right angle is $1$, so the hypotenuse equals the diameter. The radius is half the diameter.`],
      [R`If $\frac{a}{\sin A}=8$ and $\sin B=\frac{1}{2}$, find side $b$.`, R`Side $b$ equals $4$.`, R`Multiply the common ratio by the sine of the angle opposite the side you want.`],
    ],
  },
  "giai-tam-giac": {
    s: R`Two sides and the included angle determine a triangle. The third side comes from the law of cosines. The area is $\frac{1}{2}ab\sin C$ with exactly the included angle.`,
    w: R`The law of cosines is Pythagoras' theorem with a correction term $-2ab\cos C$. When $C=90^\circ$ we have $\cos C=0$ and the formula becomes $c^2=a^2+b^2$.`,
    p: R`Using an angle that is not between the two known sides. Both the cosine formula and the area formula need the angle formed by those two sides.`,
    ex: [
      [R`Two sides are $5$ and $5$, and the included angle is $60^\circ$. Find the third side.`, [
        [R`The square of the third side is $25+25-25=25$.`, R`The cosine of $60^\circ$ is $\frac{1}{2}$, so the term $2ab\cos C$ equals $25$.`],
        [R`The third side is $5$.`, R`The non-negative square root of $25$ is $5$. All three sides are equal, which fits the $60^\circ$ included angle.`],
      ], R`The third side is $5$.`],
      [R`A triangle has sides $a=7$, $b=5$, $c=8$. Find angle $A$.`, [
        [R`By the law of cosines, $\cos A=\frac{b^2+c^2-a^2}{2bc}=\frac{25+64-49}{80}=\frac{1}{2}$.`, R`When all three sides are known, the law of cosines gives the cosine of each angle.`],
        [R`The angle of a triangle whose cosine is $\frac{1}{2}$ is $60^\circ$.`, R`The cosine determines a single angle between $0^\circ$ and $180^\circ$.`],
      ], R`Angle $A=60^\circ$.`],
    ],
    dr: [
      [R`Sides $3$ and $4$ enclose an angle of $90^\circ$. How long is the remaining side?`, R`The remaining side is $5$.`, R`Two sides and the included angle determine the triangle. The remaining side follows from the law of cosines.`],
      [R`Sides $6$ and $4$ enclose an angle of $30^\circ$. What is the area?`, R`The area is $6$.`, R`The area uses the sine of the angle between the two chosen sides.`],
      [R`What is the area of an equilateral triangle with side $2$?`, R`The area is $\sqrt{3}$.`, R`The angle between two sides of an equilateral triangle is $60^\circ$.`],
    ],
  },
  "tong-hieu": {
    s: R`For $\vec u=(x_1,y_1)$ and $\vec v=(x_2,y_2)$, the sum is $(x_1+x_2,y_1+y_2)$ and the difference is $(x_1-x_2,y_1-y_2)$. The multiple $k\vec u$ is $(kx_1,ky_1)$.`,
    w: R`The vector $(x,y)$ is a shift of $x$ units horizontally and $y$ units vertically. Shifting by $\vec u$ and then by $\vec v$ adds the shifts along each axis, so coordinates add component by component.`,
    p: R`Subtracting the end point from the starting point. The vector $\overrightarrow{AB}$ has the coordinates of $B$ minus the coordinates of $A$.`,
    ex: [
      [R`Let $\vec u=(2,1)$ and $\vec v=(1,-3)$. Find $\vec u+\vec v$ and $3\vec u$.`, [
        [R`The sum is $(3,-2)$.`, R`Add coordinate by coordinate: horizontally $2+1$, vertically $1+(-3)$.`],
        [R`The multiple $3\vec u$ is $(6,3)$.`, R`Multiply both coordinates by the same number $3$. The order of the coordinates is kept.`],
      ], R`The sum is $(3,-2)$ and $3\vec u$ is $(6,3)$.`],
      [R`Let $A(1,2)$ and $B(5,-2)$. Find the midpoint $M$ of $AB$ and the vector $\overrightarrow{AB}$.`, [
        [R`The vector $\overrightarrow{AB}=(5-1,-2-2)=(4,-4)$.`, R`The coordinates of a vector are those of its end point minus those of its starting point.`],
        [R`The midpoint is $M=\left(\frac{1+5}{2},\frac{2+(-2)}{2}\right)=(3,0)$.`, R`The midpoint's coordinates are the averages of the endpoints' coordinates.`],
      ], R`The vector $\overrightarrow{AB}=(4,-4)$ and the midpoint is $M(3,0)$.`],
    ],
    dr: [
      [R`Compute $(4,1)-(1,3)$.`, R`The difference is $(3,-2)$.`, R`Add, subtract or multiply coordinate by coordinate. The two coordinates are computed separately.`],
      [R`Compute $2(1,4)$.`, R`The product is $(2,8)$.`, R`Multiplying by a number multiplies both coordinates of the vector.`],
      [R`Compute $2(1,0)+(0,5)$.`, R`The result is $(2,5)$.`, R`Multiply first, then add the coordinates of the other vector.`],
    ],
  },
  "tich-vh": {
    s: R`The dot product is $x_1x_2+y_1y_2$. When both vectors are non-zero, $\cos(\vec u,\vec v)=\frac{\vec u\cdot\vec v}{|\vec u||\vec v|}$. Two vectors are perpendicular exactly when their dot product is $0$.`,
    w: R`Applying the law of cosines to the triangle formed by $\vec u$, $\vec v$ and $\vec u-\vec v$ gives $|\vec u||\vec v|\cos(\vec u,\vec v)=x_1x_2+y_1y_2$. When the vectors are perpendicular the cosine is $0$, so the dot product is $0$.`,
    p: R`Writing the dot product as a vector. The dot product is a number, for example $(1,2)\cdot(3,-1)=3-2=1$.`,
    ex: [
      [R`Let $\vec u=(1,2)$ and $\vec v=(3,-1)$. Find the dot product.`, [
        [R`The products of matching coordinates are $1\cdot 3$ and $2\cdot(-1)$.`, R`In the plane, the definition has only these two terms.`],
        [R`Their sum is $3-2=1$.`, R`Add the two coordinate products. The result is a number, not a vector.`],
      ], R`The dot product is $1$.`],
      [R`Find the angle between $\vec u=(1,1)$ and $\vec v=(0,2)$.`, [
        [R`The dot product is $\vec u\cdot\vec v=0+2=2$; the lengths are $|\vec u|=\sqrt2$, $|\vec v|=2$.`, R`The cosine of the angle needs the dot product and the lengths of both vectors.`],
        [R`Hence $\cos(\vec u,\vec v)=\frac{2}{2\sqrt2}=\frac{\sqrt2}{2}$.`, R`Divide the dot product by the product of the two lengths to get the cosine of the angle.`],
      ], R`The angle between the two vectors is $45^\circ$.`],
    ],
    dr: [
      [R`What is the dot product of $(2,0)$ and $(0,5)$?`, R`The dot product is $0$, so the two vectors are perpendicular.`, R`In the plane the dot product is the sum of the two products of matching coordinates.`],
      [R`Find the $\cos$ of the angle between $(1,2)$ and $(3,-1)$, given that the dot product is $1$ and the denominator is $\sqrt{50}$.`, R`The cosine is $\frac{\sqrt{2}}{10}$.`, R`The cosine is the dot product divided by the product of the lengths. The denominator is not $0$ because neither vector is the zero vector.`],
      [R`How long is the vector $(3,4)$?`, R`The length is $5$.`, R`The length is the non-negative square root of the sum of the squared coordinates.`],
    ],
  },
  "duong-thang": {
    s: R`The line $ax+by+c=0$, with $a$ and $b$ not both $0$, has normal vector $\vec n=(a,b)$ and a direction vector $\vec u$ with $\vec u\cdot\vec n=0$. Its parametric form through $M_0(x_0,y_0)$ is $x=x_0+ut$, $y=y_0+vt$. The distance from $M_0$ to the line is $\frac{|ax_0+by_0+c|}{\sqrt{a^2+b^2}}$.`,
    w: R`If $M$ and $M_0$ both lie on the line, then $a(x-x_0)+b(y-y_0)=0$, that is, $\vec n=(a,b)$ is perpendicular to $\overrightarrow{M_0M}$. The distance from a point to the line is the length of the projection of the connecting vector onto the normal direction, hence the denominator $\sqrt{a^2+b^2}$.`,
    p: R`Taking $(a,b)$ as a direction vector. The vector $(a,b)$ is the normal, and a direction vector is $(-b,a)$ or $(b,-a)$.`,
    ex: [
      [R`Take the line $x+y-4=0$. Give a normal vector, a direction vector, and the distance from the origin to the line.`, [
        [R`A normal vector is $(1,1)$. A direction vector is $(1,-1)$, since the dot product is $0$.`, R`The coefficients of $x$ and of $y$ are the coordinates of the normal. A direction vector is perpendicular to the normal.`],
        [R`The distance from $(0,0)$ is $\frac{|-4|}{\sqrt{2}}=2\sqrt{2}$.`, R`The numerator is the absolute value of the left-hand side at the point. The denominator is the length of the normal, which is not $0$.`],
      ], R`Normal $(1,1)$, direction $(1,-1)$, distance $2\sqrt{2}$.`],
      [R`Write the equation of the line through $A(1,2)$ and $B(3,6)$.`, [
        [R`A direction vector is $\overrightarrow{AB}=(2,4)$, so a normal is $(2,-1)$.`, R`The normal is perpendicular to the direction vector: swap the two coordinates and change one sign.`],
        [R`The line through $A$ is $2(x-1)-(y-2)=0$, that is, $2x-y=0$.`, R`A line through a point with a given normal has the form $a(x-x_0)+b(y-y_0)=0$.`],
        [R`Check $B$: $2\cdot 3-6=0$, which holds.`, R`Substitute the second point to be sure the equation passes through both points.`],
      ], R`The equation of the line is $2x-y=0$.`],
    ],
    dr: [
      [R`What is the distance from the point $(1,1)$ to the line $x+y-4=0$?`, R`The distance is $\sqrt{2}$.`, R`Same distance formula. The numerator $|1+1-4|$ is $2$ and the denominator is $\sqrt{2}$.`],
      [R`The line $2x-y+3=0$ has normal $(2,-1)$. Is $(1,2)$ a direction vector?`, R`Yes, because its dot product with the normal is $0$.`, R`A direction vector is perpendicular to the normal. Neither vector is the zero vector.`],
      [R`The parametric line is $x=1+2t$, $y=3-t$. Which point corresponds to $t=2$?`, R`The point is $(5,1)$.`, R`The parameter multiplies each coordinate of the direction vector, which is then added to the base point.`],
    ],
  },
  "duong-tron": {
    s: R`The circle with centre $I(a,b)$ and radius $R>0$ has equation $(x-a)^2+(y-b)^2=R^2$. A point lies on the circle when its distance from the centre equals $R$.`,
    w: R`A circle is the set of points at distance $R$ from the centre. Writing "distance equals $R$" in coordinates and squaring both sides gives the equation.`,
    p: R`Misreading the signs of the centre and forgetting to take the root of the radius. The equation $(x-1)^2+(y+2)^2=9$ has centre $(1,-2)$ and radius $3$.`,
    ex: [
      [R`Take the circle $(x-1)^2+(y-2)^2=9$. Give its centre and radius, and check the point $(4,2)$.`, [
        [R`The centre is $(1,2)$ and the radius is $3$.`, R`The right-hand side is the squared radius. The non-negative root of $9$ is $3$.`],
        [R`The distance from $(4,2)$ to the centre is $3$, so the point lies on the circle.`, R`The horizontal offset is $3$ and the vertical offset is $0$. Distance equal to the radius is exactly the condition for lying on the circle.`],
      ], R`Centre $(1,2)$, radius $3$, and the point $(4,2)$ lies on the circle.`],
      [R`Find the centre and radius of the circle $x^2+y^2-4x+6y-3=0$.`, [
        [R`Complete the squares: $(x-2)^2+(y+3)^2=3+4+9=16$.`, R`Group by variable, then add the square of half of each coefficient to both sides.`],
        [R`Compare with $(x-a)^2+(y-b)^2=R^2$: centre $(2,-3)$, $R=4$.`, R`The sign inside each bracket is the opposite of the sign of the centre's coordinate.`],
      ], R`The circle has centre $I(2,-3)$ and radius $4$.`],
    ],
    dr: [
      [R`What is the equation of the circle with centre $(0,0)$ and radius $5$?`, R`The equation is $x^2+y^2=25$.`, R`A point is on the circle when its distance from the centre equals the radius.`],
      [R`Is the point $(0,5)$ on the circle $x^2+y^2=25$?`, R`Yes, because its distance from the origin is $5$.`, R`A point is on the circle when its squared distance equals the squared radius.`],
      [R`What is the radius of $(x+2)^2+(y-1)^2=4$?`, R`The radius is $2$.`, R`The centre is $(-2,1)$. The radius is the non-negative root of the right-hand side.`],
    ],
  },
  "ba-conic": {
    s: R`The ellipse $\frac{x^2}{a^2}+\frac{y^2}{b^2}=1$ with $a>b>0$ is longer along the horizontal axis. The hyperbola $\frac{x^2}{a^2}-\frac{y^2}{b^2}=1$ is a difference of two squares. The parabola $y^2=2px$ with $p>0$ has focus $F\left(\frac{p}{2},0\right)$.`,
    w: R`Each curve is defined by distances: an ellipse has a constant sum of distances to two foci, a hyperbola a constant difference, and a parabola equal distances to the focus and to the directrix. Writing those conditions in coordinates gives the three standard equations.`,
    p: R`Taking $a^2$ and $b^2$ as the semi-axis lengths. The ellipse $\frac{x^2}{9}+\frac{y^2}{4}=1$ has semi-major axis $3$ and semi-minor axis $2$.`,
    ex: [
      [R`What are the semi-axes of the ellipse $\frac{x^2}{9}+\frac{y^2}{4}=1$?`, [
        [R`The denominator under $x^2$ is $a^2=9$, so $a=3$.`, R`A semi-axis is the non-negative root of the denominator, not the denominator itself.`],
        [R`The denominator under $y^2$ is $b^2=4$, so $b=2$.`, R`Because $a>b>0$, the major axis lies on the horizontal axis and the minor axis on the vertical axis.`],
      ], R`The semi-axes are $a=3$ and $b=2$, with $a>b>0$.`],
      [R`Find the foci of the ellipse $\frac{x^2}{25}+\frac{y^2}{9}=1$.`, [
        [R`We have $a=5$, $b=3$, and $c^2=a^2-b^2=16$, so $c=4$.`, R`For an ellipse, the distance from the centre to a focus satisfies $c^2=a^2-b^2$.`],
        [R`The foci lie on the major axis, here the horizontal axis: $F_1(-4,0)$ and $F_2(4,0)$.`, R`The major axis is the one with the larger denominator in the standard equation.`],
      ], R`The foci are $F_1(-4,0)$ and $F_2(4,0)$.`],
    ],
    dr: [
      [R`For the hyperbola $\frac{x^2}{9}-\frac{y^2}{4}=1$, what is $a$?`, R`The number $a$ is $3$.`, R`The denominator under $x^2$ is $a^2$. The non-negative root of $9$ is $3$.`],
      [R`Write the parabola $y^2=8x$ as $y^2=2px$. Where is its focus?`, R`Since $2p=8$ we get $p=4$, and the focus is $F(2,0)$.`, R`From $2p=8$ we get $p=4$. The focus lies at $p$ divided by $2$, which is $2$.`],
      [R`Is the point $(3,0)$ on the ellipse $\frac{x^2}{9}+\frac{y^2}{4}=1$?`, R`Yes, because substituting it gives $1$.`, R`A point is on the ellipse when the left-hand side of the standard equation equals $1$.`],
    ],
  },
  "quy-tac": {
    s: R`The product rule applies when a task is made of successive steps. The sum rule applies when the ways of doing it exclude each other. Adding the counts of successive steps undercounts.`,
    w: R`Each way of doing the first step can be followed by every way of doing the second step, so the counts multiply. When the options cannot happen together, each way belongs to exactly one option, so the counts add.`,
    p: R`Adding when the task is a sequence of steps. Going from $A$ through $B$ to $C$ can be done in $2\cdot 3=6$ ways, not $2+3=5$.`,
    ex: [
      [R`There are $2$ roads from $A$ to $B$, $3$ roads from $B$ to $C$, and $4$ direct roads from $A$ to $C$. In how many ways can you go from $A$ to $C$, either via $B$ or directly?`, [
        [R`Going via $B$ gives $2\cdot 3=6$ ways.`, R`The two legs follow one another, and every road of the second leg pairs with every road of the first.`],
        [R`The two kinds of route exclude each other, so the total is $6+4=10$ ways.`, R`No route both passes through $B$ and is direct. The sum rule applies to these two cases.`],
      ], R`There are $10$ ways.`],
      [R`A student has $3$ shirts and $4$ pairs of trousers. In how many ways can they choose an outfit of one shirt and one pair of trousers?`, [
        [R`The choice has two successive steps: pick a shirt, then pick trousers.`, R`When there are successive steps and each must be done, use the product rule.`],
        [R`The number of ways is $3\cdot 4=12$.`, R`Each shirt can be paired with all four pairs of trousers.`],
      ], R`There are $12$ possible outfits.`],
    ],
    dr: [
      [R`A meal is one dish out of $3$ and one drink out of $4$. How many meals are possible?`, R`There are $12$ meals.`, R`Successive steps multiply. Mutually exclusive cases add.`],
      [R`Choose one student out of $5$, or one out of $4$ from another group; the two groups do not overlap. How many ways are there?`, R`There are $9$ ways.`, R`The groups do not overlap, so the choices exclude each other and are added.`],
      [R`Choose the tens digit from $2$ even digits and the units digit from $3$ remaining digits. How many numbers are there?`, R`There are $6$ numbers.`, R`The two places are two successive steps, so multiply the number of choices for each.`],
    ],
  },
  "hoan-vi": {
    s: R`There are $n!$ permutations of $n$ distinct objects. Arrangements of $k$ objects number $A_n^k=n(n-1)\cdots(n-k+1)$. Both count order.`,
    w: R`The first position has $n$ choices, the second $n-1$, and so on, decreasing each time. The product rule gives $n!$ for arranging everything and $A_n^k$ for filling only $k$ positions.`,
    p: R`Using arrangements when order does not matter. When you only pick a group, with no seats or roles, use combinations.`,
    ex: [
      [R`There are $4$ different books to place in a row. In how many ways can this be done?`, [
        [R`All four books are arranged in order, so use the permutation count $4!$.`, R`Swapping two books gives a different arrangement. Every book is used.`],
        [R`We have $4!=24$.`, R`Multiply $4\cdot 3\cdot 2\cdot 1$. Do not divide by a factorial, because different orders count as different.`],
      ], R`There are $24$ arrangements.`],
      [R`In how many ways can a class choose a president, a vice-president and a treasurer from $10$ students, if each student holds at most one role?`, [
        [R`The three roles are different, so order matters: this is an arrangement of $3$ out of $10$.`, R`Swapping roles between students gives a different choice, so order must be counted.`],
        [R`The number of ways is $A_{10}^3=10\cdot 9\cdot 8=720$.`, R`The first role has ten choices, the second nine, and the third eight.`],
      ], R`There are $720$ ways.`],
    ],
    dr: [
      [R`How many $3$-digit passwords with distinct digits can be made from the five digits $1, 2, 3, 4, 5$?`, R`There are $60$ passwords.`, R`Permutations use every object in order. Arrangements use only some of them and still count order.`],
      [R`Choose a leader and then a deputy from $5$ students. How many ways are there?`, R`There are $20$ ways.`, R`The two roles are different, so order counts. Choose the leader first, then the deputy from those remaining.`],
      [R`Compute $3!$.`, R`The number of permutations is $6$.`, R`Three distinct objects can be arranged in $3\cdot 2\cdot 1$ ways.`],
    ],
  },
  "to-hop-bai": {
    s: R`The number of ways to choose $k$ objects out of $n$, ignoring order, is $C_n^k=\frac{n!}{k!(n-k)!}$. If reordering a selection does not give a new one, do not use arrangements.`,
    w: R`Each group of $k$ objects can be ordered in $k!$ ways, and arrangements count all those orders separately. Dividing $A_n^k$ by $k!$ makes each group counted only once.`,
    p: R`Forgetting to divide by $k!$. Choosing $3$ students out of $10$ gives $\frac{10\cdot 9\cdot 8}{3!}=120$ ways, not $720$.`,
    ex: [
      [R`Choose $3$ students out of $10$ for duty, with no distinct roles. How many ways are there?`, [
        [R`There are no roles, so use the combination $C_{10}^3$.`, R`Reordering the three students in a duty group does not give a new choice.`],
        [R`We have $C_{10}^3=\frac{10\cdot 9\cdot 8}{6}=120$.`, R`Divide by $3!$ because each group of three would be counted six times if the order of picking were kept.`],
      ], R`There are $120$ ways.`],
      [R`From $6$ boys and $4$ girls, choose a group of $3$ with $2$ boys and $1$ girl. How many ways are there?`, [
        [R`Choosing $2$ boys out of $6$ gives $C_6^2=15$ ways; choosing $1$ girl out of $4$ gives $4$ ways.`, R`The group has no roles, so use combinations for each part.`],
        [R`The two steps follow each other, so multiply: $15\cdot 4=60$.`, R`Each pair of boys can be combined with any of the girls.`],
      ], R`There are $60$ possible groups.`],
    ],
    dr: [
      [R`Choose $2$ students out of $30$, with no distinct roles. How many ways are there?`, R`There are $435$ ways.`, R`When order does not count, divide the number of ordered choices by the factorial of the number chosen.`],
      [R`Compute $C_5^2$.`, R`The combination equals $10$.`, R`Each pair is counted twice in the product $5\cdot 4$, so divide by $2$.`],
      [R`Compute $C_6^1$.`, R`The combination equals $6$.`, R`Choosing one object out of six can be done in exactly six ways.`],
    ],
  },
  "nhi-thuc": {
    s: R`The binomial theorem writes $(a+b)^n=\sum_{k=0}^{n}C_n^k a^{n-k}b^k$. In these lessons the exponent $n$ is at most $5$. The coefficient of the term with index $k$ is $C_n^k$ times the coefficients coming from the two terms.`,
    w: R`Expanding $(a+b)^n$ multiplies $n$ brackets, each contributing $a$ or $b$. The term $a^{n-k}b^k$ appears once for each way of choosing the $k$ brackets that contribute $b$, that is, $C_n^k$ times.`,
    p: R`Forgetting to raise the coefficient attached to the variable. In $(1+2x)^5$ the coefficient of $x^2$ is $C_5^2\cdot 2^2=40$, not $10$.`,
    ex: [
      [R`Find the coefficient of $x^2$ in $(1+2x)^5$.`, [
        [R`The term with $k=2$ is $C_5^2\cdot 1^{3}\cdot(2x)^2$.`, R`The power of $x$ equals the index $k$. The exponent of the binomial is $5$, which is not more than five.`],
        [R`The coefficient is $C_5^2\cdot 4=10\cdot 4=40$.`, R`Choosing two out of five gives $10$, and the square of $2$ is $4$.`],
      ], R`The coefficient of $x^2$ is $40$.`],
      [R`Expand $(x-1)^4$.`, [
        [R`The binomial coefficients for degree $4$ are $1, 4, 6, 4, 1$.`, R`Row four of Pascal's triangle gives the numbers $C_4^k$.`],
        [R`The term with index $k$ carries the sign of $(-1)^k$: $x^4-4x^3+6x^2-4x+1$.`, R`Odd powers of $-1$ are negative, and even powers are positive.`],
      ], R`We have $(x-1)^4=x^4-4x^3+6x^2-4x+1$.`],
    ],
    dr: [
      [R`Find the coefficient of $x^3$ in $(1+x)^5$.`, R`The coefficient is $10$.`, R`The exponent of the binomial is at most five. The index k is the power of the factor containing x.`],
      [R`Find the coefficient of $x$ in $(1+3x)^4$.`, R`The coefficient is $12$.`, R`Take $k=1$. Multiply $C_4^1$ by the coefficient $3$ of the term $3x$.`],
      [R`How many terms does the expansion of $(1+x)^5$ have?`, R`It has $6$ terms, for $k$ from $0$ to $5$.`, R`The exponent is at most five, so the index $k$ runs from $0$ to $5$ and takes six values.`],
    ],
  },
  "sai-so": {
    s: R`If $a$ approximates the exact value $x$, the absolute error is $|a-x|$. The relative error is the absolute error divided by the absolute value of the exact value, when that value is not $0$.`,
    w: R`The absolute error measures the distance between the approximation and the exact value on the number line. The relative error compares that distance with the size of the exact value, so it can compare the precision of large and small measurements.`,
    p: R`Comparing precision using only the absolute error. An error of $1$ metre when measuring $1$ kilometre is far more precise than an error of $1$ metre when measuring $10$ metres.`,
    ex: [
      [R`Use $3.14$ as an approximation of $\pi$. What is the absolute error?`, [
        [R`The absolute error is $\left|\pi-\frac{314}{100}\right|$.`, R`Subtract the exact value from the approximation and take the absolute value. The order of subtraction does not change the size of the error.`],
        [R`Its value is $\pi-\frac{157}{50}$.`, R`Because $\pi$ is greater than $3.14$, the absolute value can be dropped with the difference written in this order.`],
      ], R`The absolute error is $\pi-\frac{157}{50}$.`],
      [R`A bridge is measured as $152$ m long with absolute error at most $0.5$ m. At most what percentage is the relative error?`, [
        [R`The relative error is $\frac{0.5}{152}\approx 0.0033$.`, R`The relative error compares the absolute error with the size of the measurement.`],
        [R`As a percentage this is about $0.33\%$.`, R`Multiply by one hundred to turn a ratio into a percentage.`],
      ], R`The relative error is at most about $0.33\%$.`],
    ],
    dr: [
      [R`The approximation $2.4$ of the exact value $2.37$ has what absolute error?`, R`The absolute error is $0.03$.`, R`The absolute error is the absolute value of the difference between the approximation and the exact value.`],
      [R`The exact value is $20$ and the approximation is $19$. What is the absolute error?`, R`The absolute error is $1$.`, R`Inside the absolute value, the order of subtraction does not matter.`],
      [R`The absolute error is $1$ and the exact value is $20$. What is the relative error?`, R`The relative error is $\frac{1}{20}$.`, R`The relative error is the absolute error divided by the absolute value of the exact value.`],
    ],
  },
  "trung-vi": {
    s: R`Sort the data in increasing order. With an even number of values, the median is the average of the two middle values, and the data splits into two equal halves. The first quartile is the median of the lower half and the third quartile is the median of the upper half. The mode is the value with the highest frequency.`,
    w: R`The median splits the sorted data into two halves with equal counts, and the quartiles split each half again. These markers depend on positions, so a few very large or very small values barely move them.`,
    p: R`Finding the median before sorting. Sort the data in increasing order first, then take the middle value.`,
    ex: [
      [R`The sorted data is $1, 3, 5, 7, 9, 11$. Find the median, the first quartile and the third quartile.`, [
        [R`The two middle values are $5$ and $7$, so the median is $6$.`, R`With six values, the middle positions are the third and fourth. The median is the average of exactly those two.`],
        [R`The lower half $1, 3, 5$ has middle value $3$. The upper half $7, 9, 11$ has middle value $9$.`, R`Each half keeps one of the two middle values. The middle of each half is the corresponding quartile.`],
      ], R`The median is $6$, the first quartile is $3$ and the third quartile is $9$.`],
      [R`Find the median and the mode of the data $3, 7, 7, 2, 9, 7, 4$.`, [
        [R`Sorted: $2, 3, 4, 7, 7, 7, 9$. There are $7$ values, and the fourth is $7$.`, R`For an odd number of values, the median is the one exactly in the middle after sorting.`],
        [R`The value $7$ appears three times, more than any other.`, R`The mode is the value with the highest frequency in the sample.`],
      ], R`The median is $7$ and the mode is $7$.`],
    ],
    dr: [
      [R`What is the mode of $2, 4, 4, 6$?`, R`The mode is $4$, because it appears $2$ times, more than any other value.`, R`The mode is the value with the highest frequency. Counting the occurrences of $4$ gives two.`],
      [R`The sorted data is $1, 2, 3, 4$. What is the median?`, R`The median is $\frac{5}{2}$.`, R`With four values, the two middle ones are the second and the third.`],
      [R`For the data $1, 3, 5, 7, 9, 11$, what is the first quartile?`, R`The first quartile is $3$.`, R`The lower half has the three values $1, 3, 5$. Its middle value is the first quartile.`],
    ],
  },
  "phuong-sai": {
    s: R`The range is the difference between the largest and the smallest value. The variance is $\frac{1}{n}\sum (x_i-\bar x)^2$. The standard deviation is the non-negative square root of the variance.`,
    w: R`Each deviation $x_i-\bar x$ tells how far one value is from the mean. Squaring stops negative and positive deviations from cancelling, and averaging gives one measure of spread.`,
    p: R`Forgetting to square, or forgetting the square root when the question asks for the standard deviation. The sum of unsquared deviations is always $0$, so it measures nothing.`,
    ex: [
      [R`For the scores $2, 4, 4, 6, 9$, find the range and the variance.`, [
        [R`The range is $9-2=7$ points.`, R`Subtract the smallest value from the largest after looking at the whole list.`],
        [R`The mean is $5$. The variance is $\frac{9+1+1+1+16}{5}=\frac{28}{5}$ points$^2$.`, R`The deviations from the mean are $-3, -1, -1, 1, 4$. Divide the sum of their squares by the number of values.`],
      ], R`The range is $7$ points and the variance is $\frac{28}{5}$ points$^2$.`],
      [R`Two students' scores: An $6, 8, 10$, Binh $8, 8, 8$. Who is more consistent?`, [
        [R`Both have mean score $8$.`, R`When the means are equal, compare the spread to judge consistency.`],
        [R`An's variance is $\frac{4+0+4}{3}=\frac{8}{3}$, and Binh's is $0$.`, R`The variance measures how far the scores lie from the mean.`],
      ], R`Binh is more consistent, with the smaller variance.`],
    ],
    dr: [
      [R`What is the standard deviation of data with variance $\frac{28}{5}$?`, R`The standard deviation is $\sqrt{\frac{28}{5}}$ points.`, R`The variance divides the sum of squared deviations by the count. The standard deviation is its non-negative square root.`],
      [R`What is the variance of $1, 2, 3$?`, R`The variance is $\frac{2}{3}$ points$^2$.`, R`The mean is $2$. Divide the sum of the two non-zero squared deviations by the three values.`],
      [R`What is the range of $4, 7, 10$?`, R`The range is $6$.`, R`It is the difference between the largest and the smallest value in the sample.`],
    ],
  },
  "liet-ke": {
    s: R`When outcomes are equally likely, $P(A)=\frac{n(A)}{n(\Omega)}$. With two coins, list the whole sample space. Do not replace the listing by multiplying two probabilities.`,
    w: R`Two distinguishable coins give four equally likely outcomes: SS, SN, NS and NN, where S means tails and N means heads. The event of two heads has just one favourable outcome among those four.`,
    p: R`Treating SN and NS as one outcome and concluding there are three equally likely outcomes. One tail and one head can happen in two ways, so its probability is $\frac{1}{2}$.`,
    ex: [
      [R`Toss two fair coins. Write S for tails and N for heads. Find the probability of two heads.`, [
        [R`The sample space is $\Omega=\{\mathrm{SS},\mathrm{SN},\mathrm{NS},\mathrm{NN}\}$, with $4$ outcomes.`, R`Each coin has two faces and the two coins are distinguished in each outcome. These four pairs cover every possibility.`],
        [R`Only $\mathrm{NN}$ gives two heads, so the probability is $\frac{1}{4}$.`, R`One favourable outcome out of four equally likely ones. Do not multiply $\frac{1}{2}$ by $\frac{1}{2}$ instead of counting.`],
      ], R`The probability of two heads is $\frac{1}{4}$.`],
      [R`Roll a fair die twice. Find the probability that the total is $9$.`, [
        [R`The sample space has $6\cdot 6=36$ equally likely outcomes.`, R`Each roll has six outcomes, and two rolls form ordered pairs.`],
        [R`The pairs with total $9$ are $(3,6)$, $(4,5)$, $(5,4)$, $(6,3)$, that is, $4$ pairs.`, R`List by the result of the first roll so that no pair is missed.`],
      ], R`The probability is $\frac{4}{36}=\frac{1}{9}$.`],
    ],
    dr: [
      [R`With the four-outcome sample space from the example, what is the probability of exactly one head?`, R`The probability is $\frac{1}{2}$.`, R`The four outcomes are listed and equally likely. Do not multiply the probabilities for each coin.`],
      [R`A bag has $3$ red and $2$ blue marbles, and one is drawn. What is the probability of red?`, R`The probability is $\frac{3}{5}$.`, R`Five equally likely marbles, three favourable. Both numerator and denominator count outcomes.`],
      [R`For a fair die, what is the probability of an even face?`, R`The probability is $\frac{1}{2}$.`, R`Six equally likely faces, three of them even. The even faces are $2, 4, 6$.`],
    ],
  },
  "bien-co-doi": {
    s: R`The complement of $A$, written $\overline A$, happens when $A$ does not. For a finite sample space, $P(\overline A)=1-P(A)$.`,
    w: R`Each outcome belongs either to $A$ or to $\overline A$, never to both. So the two probabilities add up to $1$.`,
    p: R`Ignoring the complement for questions about "at least one". Finding the probability of "none" and subtracting it from $1$ is usually much faster than going case by case.`,
    ex: [
      [R`The probability of drawing a red marble is $\frac{3}{5}$. What is the probability of not drawing red?`, [
        [R`The complement is drawing a marble that is not red.`, R`The rest of the sample space, outside the red event, is exactly the complement.`],
        [R`The probability is $1-\frac{3}{5}=\frac{2}{5}$.`, R`This is the complement formula. The two probabilities add up to $1$.`],
      ], R`The probability of the complement is $\frac{2}{5}$.`],
      [R`Toss three fair coins. Find the probability of at least one head.`, [
        [R`The complement is all three coins showing tails, with probability $\frac{1}{8}$.`, R`An "at least one" question is usually quick through the complement "none at all".`],
        [R`The required probability is $1-\frac{1}{8}=\frac{7}{8}$.`, R`An event and its complement have probabilities adding up to one.`],
      ], R`The probability of at least one head is $\frac{7}{8}$.`],
    ],
    dr: [
      [R`If $P(A)=\frac{1}{4}$, what is $P(\overline A)$?`, R`The probability of the complement is $\frac{3}{4}$.`, R`The complement's probability is one minus the probability of the given event.`],
      [R`What is the probability of rolling a $6$ on a fair die?`, R`The probability is $\frac{1}{6}$.`, R`Six equally likely faces and exactly one favourable face.`],
      [R`What is the probability of not rolling a $6$?`, R`The probability is $\frac{5}{6}$.`, R`The complement takes the rest of the sample space.`],
    ],
  },
};
