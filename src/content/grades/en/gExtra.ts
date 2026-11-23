/** Bản tiếng Anh của các bài bổ sung lớp 9, 10, 11 (lopExtra.ts). */
import type { LessonEn } from "./types.ts";

const R = String.raw;

export const g9ExtraEn: Record<string, LessonEn> = {
  "lai-suat": {
    s: R`Depositing $A$ with interest rate $r$ per period, compounded, gives $A(1+r)^n$ after $n$ periods. If a value falls by $r$ per period, then after $n$ periods it is $A(1-r)^n$.`,
    w: R`Each period the amount is multiplied by the same factor $1+r$, because the interest of the earlier period earns interest too. Multiplying $n$ times in a row gives the $n$th power of that factor.`,
    p: R`Adding interest as simple interest: $100+10+10=120$ instead of $121$. Compound interest is charged on the interest already earned, so you must multiply by $1.1$ each period.`,
    ex: [
      [R`Deposit $100$ million dong at $10\%$ a year, compounded. How many million dong after $2$ years?`, [
        [R`Each year the amount is multiplied by $1+0.1=1.1$.`, R`An increase of $10\%$ means multiplying by $110\%$, that is, by $1.1$.`],
        [R`After $2$ years there are $100\cdot 1.1^2=121$ million dong.`, R`Multiplying twice in a row by $1.1$ gives the second power of $1.1$ times the amount deposited.`],
      ], R`After $2$ years there are $121$ million dong.`],
      [R`A car costing $200$ million dong loses $10\%$ of its value each year. What is its value in million dong after $2$ years?`, [
        [R`Each year the value is multiplied by $1-0.1=0.9$.`, R`Losing $10\%$ means only $90\%$ of last year's value is left.`],
        [R`After $2$ years the value is $200\cdot 0.9^2=162$ million dong.`, R`Two years in a row multiply twice by $0.9$, giving the square of $0.9$.`],
      ], R`The car is worth $162$ million dong.`],
    ],
    dr: [
      [R`Deposit $50$ million dong at $8\%$ a year, compounded. How many million dong after $2$ years?`, R`There are $58.32$ million dong.`, R`Multiply by $1.08$ twice: $50\cdot 1.1664=58.32$.`],
      [R`A town's population grows $2\%$ a year and is now $10000$. How many people after $2$ years?`, R`There are $10404$ people.`, R`Multiply by $1.02$ twice, and $1.02^2=1.0404$.`],
      [R`Deposit $100$ million dong at compound rate $r$ a year; after $2$ years it is $121$ million dong. Find $r$.`, R`The rate is $10\%$ a year.`, R`Solving $(1+r)^2=1.21$ gives $1+r=1.1$ because $1+r>0$, so $r=0.1$.`],
    ],
  },
  "dong-nuoc": {
    s: R`Going downstream, the actual speed is the boat's own speed plus the speed of the current. Going upstream, take the difference of the two speeds. Let the two speeds be two unknowns and write a system of equations from distance and time.`,
    w: R`The current flows in the downstream direction, so it speeds the boat up, and it holds the boat back going upstream. Adding the two equations removes the current's speed, while subtracting them removes the boat's own speed.`,
    p: R`Using the boat's own speed for both directions. Downstream you must add the speed of the current and upstream you must subtract it, so the two actual speeds differ.`,
    ex: [
      [R`A boat goes $30$ km downstream in $2$ hours and $30$ km upstream in $3$ hours. Find the boat's own speed and the speed of the current.`, [
        [R`Let $x$ be the own speed and $y$ the speed of the current (km/h). Then $(x+y)\cdot 2=30$ and $(x-y)\cdot 3=30$.`, R`Distance is speed times time, with actual speed $x+y$ downstream and $x-y$ upstream.`],
        [R`The system becomes $x+y=15$ and $x-y=10$.`, R`Divide both sides of each equation by the corresponding time.`],
        [R`Adding the two sides gives $2x=25$, so $x=12.5$, and $y=15-12.5=2.5$.`, R`Algebraic addition removes $y$; then substitute $x$ into the first equation to find $y$.`],
      ], R`The own speed is $12.5$ km/h and the speed of the current is $2.5$ km/h.`],
      [R`A boat goes $36$ km downstream in $2$ hours and $24$ km upstream in $2$ hours. Find the speed of the current.`, [
        [R`The downstream speed is $\frac{36}{2}=18$ km/h and the upstream speed is $\frac{24}{2}=12$ km/h.`, R`Speed equals distance divided by time.`],
        [R`The speed of the current is half the difference of the two speeds: $\frac{18-12}{2}=3$ km/h.`, R`The difference of the two speeds is $2y$ because $(x+y)-(x-y)=2y$.`],
      ], R`The speed of the current is $3$ km/h.`],
    ],
    dr: [
      [R`A boat goes $20$ km downstream in $1$ hour and $20$ km upstream in $2$ hours. Find the boat's own speed.`, R`The own speed is $15$ km/h.`, R`We have $x+y=20$ and $x-y=10$, so $2x=30$ and $x=15$.`],
      [R`For the boat in the previous exercise, find the speed of the current.`, R`The speed of the current is $5$ km/h.`, R`The speed of the current is $y=20-15=5$ km/h.`],
      [R`A boat has own speed $18$ km/h. It goes downstream along a stretch of river in $2$ hours and back in $3$ hours. Find the speed of the current.`, R`The speed of the current is $3.6$ km/h.`, R`Both directions cover the same distance, so $2(18+y)=3(18-y)$, giving $5y=18$ and $y=3.6$.`],
    ],
  },
};

export const g10ExtraEn: Record<string, LessonEn> = {
  "doanh-thu-b2": {
    s: R`Many practical problems give a quantity that is a quadratic function of the price, for instance revenue equals the price times the number of items sold. When the coefficient of $x^2$ is negative, the maximum is at the vertex of the parabola, whose abscissa is $x=-\frac{b}{2a}$.`,
    w: R`A quadratic function with $a<0$ rises up to the vertex and then falls, so the vertex gives the maximum. The abscissa of the vertex lies exactly halfway between the two roots, and equals $-\frac{b}{2a}$.`,
    p: R`Choosing the price that makes the number of items largest instead of the revenue. Revenue is the product of price and quantity, two quantities that move in opposite directions, so the vertex of the product must be found.`,
    ex: [
      [R`A shop sells each item at price $x$ thousand dong and sells $100-2x$ items a day. Find the price $x$ that makes revenue largest.`, [
        [R`The revenue is $R(x)=x(100-2x)=-2x^2+100x$.`, R`Revenue is the price times the number of items sold.`],
        [R`The coefficient of $x^2$ is $-2<0$, so $R$ is largest at the vertex, $x=-\frac{100}{2\cdot(-2)}=25$.`, R`The parabola opens downward, so the vertex is the highest point, and its abscissa is $-\frac{b}{2a}$.`],
        [R`The largest revenue is $R(25)=25\cdot 50=1250$ thousand dong.`, R`Substitute the abscissa of the vertex into the function to get the maximum value.`],
      ], R`The price $25$ thousand dong gives the largest revenue, $1250$ thousand dong.`],
      [R`Each item costs $10$ thousand dong. With the same sales rule, find the price $x$ that makes profit largest.`, [
        [R`The profit is $L(x)=(x-10)(100-2x)=-2x^2+120x-1000$.`, R`The profit per item is $x-10$ thousand dong, multiplied by the number of items sold.`],
        [R`The vertex is at $x=-\frac{120}{2\cdot(-2)}=30$.`, R`The parabola opens downward, so the abscissa of the vertex gives the largest profit.`],
        [R`The largest profit is $L(30)=20\cdot 40=800$ thousand dong.`, R`Substituting $x=30$ gives $x-10=20$ and $100-2x=40$.`],
      ], R`The price $30$ thousand dong gives the largest profit, $800$ thousand dong.`],
    ],
    dr: [
      [R`The number of items sold is $80-2x$, so revenue is $x(80-2x)$. Find $x$ that makes revenue largest.`, R`The price is $x=20$.`, R`The function $-2x^2+80x$ has vertex abscissa $-\frac{80}{2\cdot(-2)}=20$.`],
      [R`What is the largest value of the revenue $-2x^2+80x$?`, R`The largest revenue is $800$.`, R`Substitute $x=20$ into the function: $20\cdot 40=800$.`],
      [R`With cost $5$ per item and $80-2x$ items sold, find the price $x$ that makes profit $(x-5)(80-2x)$ largest.`, R`The price is $x=22.5$.`, R`Expanding $(x-5)(80-2x)=-2x^2+90x-400$ gives vertex abscissa $\frac{90}{4}=22.5$.`],
    ],
  },
  "quy-dao-b2": {
    s: R`A projectile moves along a parabola $y=-ax^2+bx$ with $a>0$ when the origin is taken at the launch point. The greatest height is at the vertex, and the range is the positive root of the equation $y=0$.`,
    w: R`The path of an object under constant gravity is a parabola symmetric about the vertical line through its vertex. So the highest point lies exactly halfway between the launch point and the landing point.`,
    p: R`Taking the root $x=0$ as the range. That is the launch point, and the range is the other, positive root of the equation $y=0$.`,
    ex: [
      [R`A ball flies along the path $y=-0.1x^2+x$ (in metres). Find the greatest height of the ball.`, [
        [R`The abscissa of the vertex is $x=-\frac{1}{2\cdot(-0.1)}=5$.`, R`Use the vertex formula $-\frac{b}{2a}$ with $a=-0.1$ and $b=1$.`],
        [R`The greatest height is $y(5)=-0.1\cdot 25+5=2.5$.`, R`Substitute the abscissa of the vertex into the equation of the path.`],
      ], R`The greatest height of the ball is $2.5$ metres.`],
      [R`For the path above, how far from the launch point does the ball land?`, [
        [R`The ball lands when $y=0$, that is, $-0.1x^2+x=0$.`, R`Height $0$ means the ball is back on the ground.`],
        [R`Factoring $x(1-0.1x)=0$ gives $x=0$ or $x=10$.`, R`The root $x=0$ is the launch point, so the range is the other root $x=10$.`],
      ], R`The ball lands $10$ metres from the launch point.`],
    ],
    dr: [
      [R`The path of an object is $y=-x^2+4x$. Find the greatest height.`, R`The greatest height is $4$.`, R`The vertex is at $x=2$ and $y(2)=-4+8=4$.`],
      [R`For the path $y=-x^2+4x$, how far from the origin does the object land?`, R`It lands $4$ from the origin.`, R`Solving $-x^2+4x=0$ gives $x=0$ or $x=4$.`],
      [R`The path of an object is $y=-0.05x^2+x$. Find the greatest height.`, R`The greatest height is $5$.`, R`The vertex is at $x=\frac{1}{0.1}=10$ and $y(10)=-5+10=5$.`],
    ],
  },
};

export const g11ExtraEn: Record<string, LessonEn> = {
  "goc-dt-mp": {
    s: R`The angle between a line and a plane is the angle between the line and its orthogonal projection onto the plane. When a lateral edge is perpendicular to the base, the projection of a slanted line onto the base is the segment joining the foot of the perpendicular to the foot of the slanted line, so the required angle lies in a right triangle.`,
    w: R`The angle between a line and a plane is defined as the smallest angle the line makes with the lines in the plane, and that is exactly the angle with the projection. When the lateral edge is perpendicular to the base, the projection already lies in the base, so the right triangle is easy to see.`,
    p: R`Taking the angle between $SB$ and $SA$ in place of the angle between $SB$ and the base. The correct angle is between $SB$ and its projection $AB$ onto the base.`,
    ex: [
      [R`Pyramid $S.ABCD$ has a square base of side $3$, $SA\perp(ABCD)$ and $SA=3$. Find the angle between $SB$ and the base plane.`, [
        [R`The projection of $SB$ onto $(ABCD)$ is $AB$, because $SA\perp(ABCD)$ and $A$ is the foot of the perpendicular.`, R`The projection of a slanted line passes through the foot of the perpendicular and the foot of the slanted line.`],
        [R`Triangle $SAB$ is right-angled at $A$ with $\tan\widehat{SBA}=\frac{SA}{AB}=\frac{3}{3}=1$.`, R`In a right triangle, the tangent of an acute angle is the opposite side over the adjacent side.`],
        [R`So the angle between $SB$ and the base is $45^\circ$.`, R`An acute angle with tangent $1$ is the angle $45^\circ$.`],
      ], R`The angle between $SB$ and the base plane is $45^\circ$.`],
      [R`For the pyramid in the previous example, find the tangent of the angle between $SC$ and the base plane.`, [
        [R`The projection of $SC$ onto the base is $AC$, and $AC=3\sqrt{2}$.`, R`The diagonal of a square of side $3$ is $3\sqrt{2}$ by the Pythagorean theorem.`],
        [R`Triangle $SAC$ is right-angled at $A$, so $\tan\widehat{SCA}=\frac{SA}{AC}=\frac{3}{3\sqrt{2}}=\frac{\sqrt{2}}{2}$.`, R`Simplify the fraction by dividing numerator and denominator by $3$, then rationalise the denominator.`],
      ], R`The tangent of the angle between $SC$ and the base is $\frac{\sqrt{2}}{2}$.`],
    ],
    dr: [
      [R`Pyramid $S.ABC$ has $SA\perp(ABC)$, $SA=4$ and $AB=4$. Find the angle between $SB$ and the plane $(ABC)$.`, R`The angle is $45^\circ$.`, R`Triangle $SAB$ is right isosceles at $A$ because $SA=AB$, so the angle at $B$ is $45^\circ$.`],
      [R`Pyramid $S.ABCD$ has a rectangular base with sides $3$ and $4$, $SA\perp(ABCD)$ and $SA=10$. Find the tangent of the angle between $SC$ and the base.`, R`The tangent is $2$.`, R`The diagonal is $AC=\sqrt{3^2+4^2}=5$, so $\tan=\frac{SA}{AC}=\frac{10}{5}=2$.`],
      [R`A regular pyramid $S.ABCD$ has a square base of side $2$ and lateral edges equal to $3$. Find the cosine of the angle between a lateral edge and the base.`, R`The cosine is $\frac{\sqrt{2}}{3}$.`, R`The foot of the height is the centre $O$ of the base with $AO=\frac{2\sqrt{2}}{2}=\sqrt{2}$, and the cosine is the adjacent side $AO$ over the hypotenuse $SA$.`],
    ],
  },
  "the-tich-goc": {
    s: R`When the problem gives the angle between a lateral edge and the base, use that angle to find the height, then apply $V=\frac{1}{3}Bh$ for a pyramid and $V=Bh$ for a prism, where $B$ is the base area.`,
    w: R`The volume of a pyramid is one third of the volume of the prism with the same base and height. The height comes from the given angle through the right triangle that contains the lateral edge.`,
    p: R`Using the prism formula $V=Bh$ for a pyramid, so the result is three times too large. A pyramid always has the factor one third.`,
    ex: [
      [R`Pyramid $S.ABCD$ has a square base of side $3$, $SA\perp(ABCD)$, and $SB$ makes an angle $45^\circ$ with the base. Find the volume.`, [
        [R`The angle between $SB$ and the base is $\widehat{SBA}=45^\circ$, so triangle $SAB$ is right isosceles and $SA=AB=3$.`, R`A right triangle with an acute angle $45^\circ$ has the other acute angle $45^\circ$ too, and equal legs.`],
        [R`The base area is $B=3^2=9$.`, R`The base is a square of side $3$.`],
        [R`The volume is $V=\frac{1}{3}\cdot 9\cdot 3=9$.`, R`Use the pyramid formula with $B=9$ and height $h=SA=3$.`],
      ], R`The volume of the pyramid is $9$.`],
      [R`Pyramid $S.ABC$ has base $ABC$ right-angled at $B$ with $AB=3$ and $BC=4$, $SA\perp(ABC)$, and $SC$ makes an angle $60^\circ$ with the base. Find the volume.`, [
        [R`We have $AC=5$ and $\widehat{SCA}=60^\circ$, so $SA=AC\cdot\tan60^\circ=5\sqrt{3}$.`, R`In triangle $SAC$, right-angled at $A$, $\tan\widehat{SCA}=\frac{SA}{AC}$.`],
        [R`The base area is $B=\frac{1}{2}\cdot 3\cdot 4=6$.`, R`A right triangle has area half the product of its legs.`],
        [R`The volume is $V=\frac{1}{3}\cdot 6\cdot 5\sqrt{3}=10\sqrt{3}$.`, R`Substitute $B=6$ and $h=5\sqrt{3}$ into the pyramid formula.`],
      ], R`The volume of the pyramid is $10\sqrt{3}$.`],
    ],
    dr: [
      [R`A right prism $ABC.A'B'C'$ has a right isosceles base at $A$ with $AB=4$, and $A'B$ makes an angle $45^\circ$ with the base. Find the volume.`, R`The volume is $32$.`, R`The height is $AA'=AB=4$ and the base area is $\frac{1}{2}\cdot 4\cdot 4=8$, so $V=8\cdot 4=32$.`],
      [R`Pyramid $S.ABCD$ has a rectangular base with sides $3$ and $4$, $SA\perp(ABCD)$, and $SC$ makes an angle $45^\circ$ with the base. Find the volume.`, R`The volume is $20$.`, R`The diagonal $AC=5$ so $SA=5$, and $V=\frac{1}{3}\cdot 12\cdot 5=20$.`],
      [R`A regular triangular pyramid $S.ABC$ has base side $6$, and the lateral edge $SA$ makes an angle $60^\circ$ with the base. Find the volume.`, R`The volume is $18\sqrt{3}$.`, R`The foot of the height is the centre of the base, at distance $2\sqrt{3}$ from each vertex, so $h=2\sqrt{3}\cdot\tan60^\circ=6$ and $B=9\sqrt{3}$.`],
    ],
  },
  "kc-diem-mp": {
    s: R`The distance from a point $M$ to a plane $(P)$ is the length of the perpendicular segment $MH$ with $H$ in $(P)$. For a pyramid, the distance from the apex to the base can be found from the volume: $d=\frac{3V}{B}$.`,
    w: R`The perpendicular segment is the shortest segment joining a point to a plane, so the distance is defined as its length. When the volume and base area are known, the height follows from the volume formula.`,
    p: R`Taking the distance from the point to some point of the plane instead of to the foot of the perpendicular. You must show the segment is perpendicular to two intersecting lines in the plane.`,
    ex: [
      [R`Pyramid $S.ABCD$ has a square base of side $3$, $SA\perp(ABCD)$ and $SA=3$. Find the distance from $A$ to the plane $(SBC)$.`, [
        [R`Since $BC\perp AB$ and $BC\perp SA$, we get $BC\perp(SAB)$.`, R`A line perpendicular to two intersecting lines of a plane is perpendicular to that plane.`],
        [R`Draw $AH\perp SB$ at $H$. Since $BC\perp(SAB)$, we have $AH\perp BC$, so $AH\perp(SBC)$.`, R`The line $AH$ is perpendicular to the two intersecting lines $SB$ and $BC$ of the plane $(SBC)$.`],
        [R`In triangle $SAB$, right-angled at $A$, the altitude is $AH=\frac{SA\cdot AB}{SB}=\frac{3\cdot 3}{3\sqrt{2}}=\frac{3\sqrt{2}}{2}$.`, R`In a right triangle, the product of the legs equals the hypotenuse times the altitude to the hypotenuse.`],
      ], R`The distance from $A$ to $(SBC)$ is $\frac{3\sqrt{2}}{2}$.`],
      [R`A pyramid has volume $18\sqrt{3}$ and base area $9\sqrt{3}$. Find the distance from the apex to the base.`, [
        [R`From $V=\frac{1}{3}Bh$ we get $h=\frac{3V}{B}$.`, R`The distance from the apex to the base is exactly the height of the pyramid.`],
        [R`Substituting: $h=\frac{3\cdot 18\sqrt{3}}{9\sqrt{3}}=6$.`, R`Cancel the common factor $\sqrt{3}$ and compute $\frac{54}{9}$.`],
      ], R`The distance from the apex to the base is $6$.`],
    ],
    dr: [
      [R`A pyramid has volume $24$ and base area $12$. Find its height.`, R`The height is $6$.`, R`From $V=\frac{1}{3}Bh$ we get $h=\frac{3V}{B}=\frac{72}{12}=6$.`],
      [R`Triangle $SAB$ is right-angled at $A$ with $SA=3$ and $AB=4$. Find the distance from $A$ to $SB$.`, R`The distance is $\frac{12}{5}$.`, R`The altitude to the hypotenuse is the product of the legs over the hypotenuse: $\frac{3\cdot 4}{5}=\frac{12}{5}$.`],
      [R`Pyramid $S.ABCD$ has a square base of side $3$, $SA\perp(ABCD)$ and $SA=6$. Find the distance from $A$ to the plane $(SCD)$.`, R`The distance is $\frac{6\sqrt{5}}{5}$.`, R`Since $CD\perp(SAD)$, the distance is the altitude of triangle $SAD$ right-angled at $A$: $\frac{6\cdot 3}{3\sqrt{5}}=\frac{6\sqrt{5}}{5}$.`],
    ],
  },
};
