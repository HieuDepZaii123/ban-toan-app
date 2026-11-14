/** Lớp 8 bằng tiếng Anh. Thứ tự ví dụ và bài luyện khớp bản tiếng Việt. */
import type { LessonEn } from "./types.ts";

const R = String.raw;

export const g8En: Record<string, LessonEn> = {
  "binh-phuong-tong": {
    s: R`For all numbers $a, b$, $(a+b)^2=a^2+2ab+b^2$ and $(a-b)^2=a^2-2ab+b^2$. The difference of two squares is $a^2-b^2=(a-b)(a+b)$.`,
    w: R`A square with side $a+b$ can be cut into a square of side $a$, a square of side $b$ and two rectangles $a\cdot b$. Adding the four areas gives $a^2+2ab+b^2$.`,
    p: R`Writing $(a+b)^2=a^2+b^2$. The missing term $2ab$ is exactly the two rectangles in the picture.`,
    ex: [
      [R`Compute $(10+3)^2$ and $(10-3)^2$.`, [
        [R`We have $(10+3)^2=100+60+9=169$.`, R`The three terms are the square of the first number, twice the product, and the square of the second number.`],
        [R`We have $(10-3)^2=100-60+9=49$.`, R`The square of a difference changes the sign of the term $2ab$. The result matches $7^2$.`],
      ], R`The two values are $169$ and $49$.`],
      [R`Expand $(2x-3y)^2$, then compute $99^2$ quickly.`, [
        [R`Apply the identity $(a-b)^2=a^2-2ab+b^2$ with $a=2x$ and $b=3y$: $(2x-3y)^2=4x^2-12xy+9y^2$.`, R`The middle term is twice the product of the two quantities, with a minus sign because it is the square of a difference.`],
        [R`Write $99=100-1$, so $99^2=10\,000-200+1=9801$.`, R`Writing it as a difference from a round hundred makes every step easy to do mentally.`],
      ], R`We have $(2x-3y)^2=4x^2-12xy+9y^2$ and $99^2=9801$.`],
    ],
    dr: [
      [R`Compute $(8-3)^2$.`, R`The value is $25$.`, R`Expand to $64-48+9$. This sum is the square of $5$.`],
      [R`Compute $17^2-3^2$ as $(17-3)(17+3)$.`, R`The difference is $280$.`, R`The difference of two squares is the difference times the sum. The product of $14$ and $20$ is $280$.`],
      [R`Compute $(a-b)^2$ when $a=6$ and $b=1$.`, R`The value is $25$.`, R`The middle term carries a minus sign. The calculation $36-12+1$ gives $25$.`],
    ],
  },
  "hieu-binh": {
    s: R`The identities are $(a+b)^3=a^3+3a^2b+3ab^2+b^3$ and $(a-b)^3=a^3-3a^2b+3ab^2-b^3$. Also $a^3+b^3=(a+b)(a^2-ab+b^2)$ and $a^3-b^3=(a-b)(a^2+ab+b^2)$.`,
    w: R`Multiplying $(a+b)^2$ by $(a+b)$ once more and collecting like terms gives the cube of a sum. The sum and difference of two cubes can be checked by expanding the right-hand side; the middle terms all cancel.`,
    p: R`Getting the sign of the middle term wrong. In $a^3+b^3=(a+b)(a^2-ab+b^2)$ the middle sign is the opposite of the sign in the sum.`,
    ex: [
      [R`Compute $(2+1)^3$ and $5^3-2^3$.`, [
        [R`We have $(2+1)^3=8+3\cdot 4\cdot 1+3\cdot 2\cdot 1+1=27$.`, R`The four terms are the cube of the first, three times the first squared times the second, three times the first times the second squared, and the cube of the second.`],
        [R`We have $5^3-2^3=(5-2)(25+10+4)=117$.`, R`The difference of two cubes splits into the difference times the sum of the squares and the product.`],
      ], R`The cube of the sum is $27$ and the difference of the two cubes is $117$.`],
      [R`Factorise $x^3-27$ and expand $(x+2)^3$.`, [
        [R`Write $27=3^3$ and use the difference of two cubes: $x^3-27=(x-3)(x^2+3x+9)$.`, R`The identity $a^3-b^3=(a-b)(a^2+ab+b^2)$ applies with $a=x$ and $b=3$.`],
        [R`By the cube of a sum: $(x+2)^3=x^3+6x^2+12x+8$.`, R`The coefficients $1$, $3$, $3$, $1$ multiply decreasing powers of $x$ and increasing powers of $2$.`],
      ], R`We have $x^3-27=(x-3)(x^2+3x+9)$ and $(x+2)^3=x^3+6x^2+12x+8$.`],
    ],
    dr: [
      [R`Compute $(4-1)^3$.`, R`The value is $27$.`, R`The cube of a difference changes the sign of the odd-numbered terms. The result matches $3^3$.`],
      [R`Compute $3^3+1^3$ as $(3+1)(9-3+1)$.`, R`The sum of the two cubes is $28$.`, R`The sum of two cubes is the sum times the squares minus the product.`],
      [R`Compute $6^3-3^3$.`, R`The difference is $189$.`, R`You can compute $216-27$, or $(6-3)(36+18+9)$. Both give $189$.`],
    ],
  },
  "phan-tich": {
    s: R`Factorising means writing a polynomial as a product of polynomials of lower degree. Take out a common factor, or use an identity, then factorise further if possible.`,
    w: R`Factorising reads the distributive property backwards. Once a polynomial is a product, finding its roots is quick, because a product is $0$ when one of its factors is $0$.`,
    p: R`Taking out a common factor and forgetting the $1$ left behind. The correct factorisation of $2x^2+2x$ is $2x(x+1)$, not $2x\cdot x$.`,
    ex: [
      [R`Factorise $x^2-5x+6$ and $2x^2+4x$.`, [
        [R`The quadratic $x^2-5x+6$ equals $(x-2)(x-3)$.`, R`The numbers $-2$ and $-3$ have sum $-5$ and product $6$. This splits it into two linear factors.`],
        [R`The polynomial $2x^2+4x$ equals $2x(x+2)$.`, R`The common factor of the two terms is $2x$. Inside the brackets $x+2$ is left.`],
      ], R`The two factorisations are $(x-2)(x-3)$ and $2x(x+2)$.`],
      [R`Factorise $x^3-4x$ and $x^2-xy+3x-3y$.`, [
        [R`Take out the common factor $x$: $x^3-4x=x(x^2-4)=x(x-2)(x+2)$.`, R`After taking out the common factor, what is left in the brackets is a difference of two squares.`],
        [R`Group in pairs: $x(x-y)+3(x-y)=(x-y)(x+3)$.`, R`Each group contains the factor $x-y$, so it can be taken out as a common factor.`],
      ], R`We have $x^3-4x=x(x-2)(x+2)$ and $x^2-xy+3x-3y=(x-y)(x+3)$.`],
    ],
    dr: [
      [R`Factorise $x^2-9$.`, R`The factorised form is $(x-3)(x+3)$.`, R`This is a difference of two squares. The two factors are the difference and the sum of $x$ and $3$.`],
      [R`Find the value of $(x-2)(x-3)$ when $x=4$.`, R`The value is $2$.`, R`With a factorised polynomial, substitute into each factor and multiply. The product $2\cdot 1$ is $2$.`],
      [R`Take out the common factor of $6x+9$. After taking out $3$, what is the term without $x$ inside the brackets?`, R`That term is $3$, and the polynomial equals $3(2x+3)$.`, R`The common factor is $3$. Putting $x=1$ into the original polynomial gives $15$, the same as the factorised form.`],
    ],
  },
  "phan-thuc": {
    s: R`An algebraic fraction is a quotient of two polynomials whose denominator is not the zero polynomial. It can be simplified when the numerator and denominator share a factor, and values making the denominator $0$ are excluded from the domain.`,
    w: R`Algebraic fractions behave like ordinary fractions: dividing numerator and denominator by the same factor other than $0$ does not change the value. The domain condition keeps that factor different from $0$.`,
    p: R`Crossing out terms instead of factors. In $\frac{x^2-1}{x-1}$, write the numerator as $(x-1)(x+1)$ before simplifying.`,
    ex: [
      [R`Simplify $\frac{x^2-1}{x-1}$ with $x\neq 1$.`, [
        [R`The numerator is $(x-1)(x+1)$.`, R`The difference of two squares produces the factor $x-1$, the same factor as the denominator.`],
        [R`For $x\neq 1$, the fraction equals $x+1$.`, R`Divide the numerator and denominator by the common factor $x-1$. The condition $x\neq 1$ stays after simplifying.`],
      ], R`The fraction simplifies to $x+1$ when $x\neq 1$.`],
      [R`Compute $\frac{1}{x-2}-\frac{4}{x^2-4}$ with $x\neq 2$ and $x\neq -2$.`, [
        [R`The second denominator is $(x-2)(x+2)$, so the common denominator is $(x-2)(x+2)$.`, R`Factorise the denominators, then take the product of the different factors.`],
        [R`Bring to the common denominator and subtract: $\frac{x+2-4}{(x-2)(x+2)}=\frac{x-2}{(x-2)(x+2)}=\frac{1}{x+2}$.`, R`The numerator and denominator share the factor $x-2$, which is not zero, so it cancels.`],
      ], R`The result is $\frac{1}{x+2}$.`],
    ],
    dr: [
      [R`Find the value of the simplified fraction $x+1$ at $x=2$.`, R`The value is $3$.`, R`The point $x=2$ does not make the denominator $0$. The original fraction's value matches $2+1$.`],
      [R`Simplify $\frac{x^2-4}{x-2}$ with $x\neq 2$.`, R`The fraction equals $x+2$.`, R`The numerator has the factor $x-2$. After dividing, $x+2$ is left, provided the denominator is not $0$.`],
      [R`At $x=3$, what is the fraction $\frac{x^2-4}{x-2}$ equal to?`, R`The value is $5$.`, R`The denominator at $x=3$ is not $0$. Substituting into the simplified form $x+2$ also gives $5$.`],
    ],
  },
  "pt-bac-nhat": {
    s: R`The equation $ax+b=0$ with $a\neq 0$ has the single solution $x=-\frac{b}{a}$. If $a=0$, this formula is not used.`,
    w: R`Adding the same number to both sides, or dividing both sides by the same number other than $0$, does not change the solution set. These two steps turn $ax+b=0$ into $x=-\frac{b}{a}$.`,
    p: R`Moving a term across without changing its sign. From $3x-12=0$ we get $3x=12$, not $3x=-12$.`,
    ex: [
      [R`Solve $3x-12=0$.`, [
        [R`The coefficient of $x$ is $3$, which is not $0$.`, R`This is the condition for a linear equation to have exactly one solution.`],
        [R`The solution is $x=4$.`, R`Move the term without $x$ across, then divide by the coefficient of $x$. Check: the left-hand side is $0$.`],
      ], R`The only solution is $x=4$.`],
      [R`Solve the equation $\frac{x-1}{2}+\frac{x+2}{3}=4$.`, [
        [R`Multiply both sides by $6$: $3(x-1)+2(x+2)=24$.`, R`Multiply by the common denominator to clear the fractions, remembering to multiply the right-hand side too.`],
        [R`Simplify: $5x+1=24$, so $x=\frac{23}{5}$.`, R`Move the constant to the right-hand side, then divide both sides by the coefficient of $x$.`],
      ], R`The equation has solution $x=\frac{23}{5}$.`],
    ],
    dr: [
      [R`Solve $2x+8=0$.`, R`The solution is $x=-4$.`, R`The coefficient of $x$ is not $0$. Dividing $-8$ by $2$ gives a negative solution.`],
      [R`Solve $5x=15$.`, R`The solution is $x=3$.`, R`Rewrite it as $5x-15=0$, then divide by the coefficient, which is not $0$.`],
      [R`Solve $4x-8=0$.`, R`The solution is $x=2$.`, R`The single solution is the opposite of the constant term divided by the coefficient of $x$.`],
    ],
  },
  "ham-bac-nhat": {
    s: R`The graph of the function $y=ax+b$ with $a\neq 0$ is a straight line. The coefficient $a$ is the slope: when $x$ increases by $1$, $y$ increases by $a$.`,
    w: R`When $x$ increases by $1$, $a(x+1)+b$ is exactly $a$ units more than $ax+b$. This constant increase makes the points of the graph lie on a line.`,
    p: R`Taking $b$ as the slope. The slope is the number multiplying $x$, while $b$ is the height where the graph meets the vertical axis.`,
    ex: [
      [R`Let $y=2x+1$. Find $y$ when $x=3$, and how much $y$ increases when $x$ increases by $1$.`, [
        [R`Substituting $x=3$ gives $y=2\cdot 3+1=7$.`, R`Each value of $x$ gives exactly one value of $y$ on the line.`],
        [R`When $x$ increases by $1$, $y$ increases by $2$.`, R`The slope is exactly $a=2$. It is the change in height for each unit of horizontal movement.`],
      ], R`At $x=3$ the height is $7$, and the slope is $2$.`],
      [R`Find the linear function $y=ax+b$ whose graph passes through $A(1,3)$ and $B(3,7)$.`, [
        [R`Substitute the coordinates of the two points: $a+b=3$ and $3a+b=7$.`, R`A point on the graph has coordinates satisfying the function's formula.`],
        [R`Subtract the two equations: $2a=4$, so $a=2$ and $b=1$.`, R`The coefficient $a$ is how much $y$ increases when $x$ increases by one unit, here $\frac{7-3}{3-1}=2$.`],
      ], R`The required function is $y=2x+1$.`],
    ],
    dr: [
      [R`Let $y=-x+4$. Find $y$ when $x=1$.`, R`The height is $3$.`, R`Substitute the value into the given function. The slope is negative, so the line goes down.`],
      [R`Where does the graph of $y=3x-6$ meet the horizontal axis?`, R`It meets it where the first coordinate is $2$.`, R`The point on the horizontal axis has height $0$. Solve that linear equation.`],
      [R`Two points on the graph of $y=2x$ have first coordinates $1$ and $4$. What is the difference in height?`, R`The difference in height is $6$.`, R`The slope $2$ times the horizontal difference $3$ also gives the height difference $6$.`],
    ],
  },
  "lap-pt": {
    s: R`Choose the unknown and state its condition. Express the other unknown quantities in terms of it, then form an equation from the relation in the problem. Solve, check against the condition and answer.`,
    w: R`An equation is the problem's sentence rewritten in symbols. Each relation, such as a sum, a difference or so many times as much, becomes an operation on the unknown, so solving the equation solves the problem.`,
    p: R`Stopping as soon as the equation is solved. You still need to check the unknown's condition and answer exactly the quantity asked for.`,
    ex: [
      [R`A rectangle is $4$ metres longer than it is wide and has perimeter $32$ metres. Find its width.`, [
        [R`Let the width be $x$ metres, with $x>0$. The length is $x+4$ metres.`, R`Take the quantity you want as the unknown and express the other quantity in terms of it.`],
        [R`The perimeter gives the equation $2(x+x+4)=32$, that is $4x+8=32$, so $x=6$.`, R`The value $6$ is positive, so it satisfies the condition on the unknown.`],
      ], R`The width is $6$ metres.`],
      [R`A car travels from A to B at $50$ km/h and returns at $40$ km/h. The whole trip takes $4.5$ hours. Find the distance AB.`, [
        [R`Let the distance be $x$ km with $x>0$. The outward time is $\frac{x}{50}$ and the return time is $\frac{x}{40}$.`, R`Time is distance divided by speed for each direction.`],
        [R`Form the equation $\frac{x}{50}+\frac{x}{40}=4.5$ and multiply both sides by $200$: $9x=900$, so $x=100$.`, R`The common denominator of $50$ and $40$ is $200$; clearing it leaves a linear equation.`],
      ], R`The distance AB is $100$ km.`],
    ],
    dr: [
      [R`Two numbers add up to $45$, and the first is twice the second. Find the second number.`, R`The second number is $15$.`, R`Let the second number be $x$; then $2x+x=45$, so $x=15$.`],
      [R`A car goes from $A$ to $B$ at $40$ kilometres per hour and returns at $60$ kilometres per hour, taking $5$ hours in total. How many kilometres long is the road $AB$?`, R`The road is $120$ kilometres long.`, R`Let the distance be $x$; then $\frac{x}{40}+\frac{x}{60}=5$, that is $\frac{5x}{120}=5$, so $x=120$.`],
      [R`A mother is $3$ times as old as her child. In $10$ years she will be $2$ times as old. How old is the child now?`, R`The child is $10$ years old now.`, R`Let the child's age be $x$; then $3x+10=2(x+10)$, which gives $x=10$.`],
    ],
  },
  "ti-so-dong-dang": {
    s: R`Similar triangles have proportional corresponding sides. If the ratio of similarity is $k$, each side of one triangle is $k$ times the corresponding side of the other.`,
    w: R`Two similar shapes are one shape enlarged or reduced evenly in every direction. Every length is multiplied by the same number $k$, while the angles stay the same.`,
    p: R`Using the ratio $k$ for area. When lengths are multiplied by $k$, area is multiplied by $k^2$.`,
    ex: [
      [R`A small triangle is similar to a large one with ratio $\frac{2}{3}$. The corresponding side of the large triangle is $12$. How long is the side of the small triangle?`, [
        [R`The small side is $\frac{2}{3}\cdot 12$.`, R`Multiply the ratio of similarity by the side of the triangle used as the reference.`],
        [R`The result is $8$.`, R`Simplifying $\frac{2}{3}$ times $12$ gives $8$. The unit of the problem stays the same.`],
      ], R`The side of the small triangle is $8$.`],
      [R`Two triangles are similar with ratio $\frac{3}{2}$. The small triangle has perimeter $20$ cm and area $16$ cm². Find the perimeter and area of the large triangle.`, [
        [R`Perimeter scales with the ratio itself: $20\cdot\frac{3}{2}=30$ cm.`, R`Every length, including the sum of the sides, is multiplied by the same ratio.`],
        [R`Area scales with the square of the ratio: $16\cdot\frac{9}{4}=36$ cm².`, R`Area is the product of two lengths, so the ratio is applied twice.`],
      ], R`The large triangle has perimeter $30$ cm and area $36$ cm².`],
    ],
    dr: [
      [R`The ratio of similarity is $3$. The original side is $5$. What is the corresponding side?`, R`The corresponding side is $15$.`, R`Multiply the ratio by the original side. The image side is three times as long.`],
      [R`What is the ratio of two segments of lengths $4$ and $10$?`, R`The ratio is $\frac{2}{5}$.`, R`Divide the shorter length by the longer one and simplify. The common factor of $4$ and $10$ is $2$.`],
      [R`In triangle $ABC$, a line parallel to $BC$ crosses $AB$ and $AC$. It divides each side, measured from vertex $A$, in the ratio $\frac{1}{2}$, and $BC=18$. How long is the segment between the two crossing points?`, R`That segment is $9$.`, R`Thales' theorem needs the line to be parallel to the third side. Then the segment cut off is half of side $BC$.`],
    ],
  },
  pitago: {
    s: R`In a right triangle, the square of the hypotenuse equals the sum of the squares of the two legs. The hypotenuse is the side opposite the right angle. When finding a length, take the non-negative root.`,
    w: R`Arrange four equal right triangles inside a square of side $a+b$ in two ways. The space left is a square of side $c$ in the first arrangement and two squares of sides $a$ and $b$ in the second, so $c^2=a^2+b^2$.`,
    p: R`Adding the two legs and calling it the hypotenuse. A right triangle with legs $3$ and $4$ has hypotenuse $5$, not $7$.`,
    ex: [
      [R`A right triangle has legs $3$ and $4$. Find the hypotenuse.`, [
        [R`The sum of the two squares is $9+16=25$.`, R`Pythagoras' theorem adds the squares of the two legs, before taking the root.`],
        [R`The hypotenuse is $\sqrt{25}=5$.`, R`The length is the non-negative root of that sum. The triple $3, 4, 5$ is a right triangle.`],
      ], R`The hypotenuse is $5$.`],
      [R`A ladder $5$ m long leans against a wall, with its foot $1.4$ m from the wall. How high up the wall does it reach?`, [
        [R`The ladder, wall and ground form a right triangle whose hypotenuse is the $5$ m ladder.`, R`The wall is perpendicular to the ground, so the right angle is at the foot of the wall.`],
        [R`The height is $\sqrt{5^2-1.4^2}=\sqrt{25-1.96}=\sqrt{23.04}=4.8$ m.`, R`A leg is the root of the squared hypotenuse minus the square of the other leg.`],
      ], R`The top of the ladder reaches a height of $4.8$ m.`],
    ],
    dr: [
      [R`The hypotenuse is $13$ and one leg is $5$. What is the other leg?`, R`The other leg is $12$.`, R`By Pythagoras' theorem, the square of the other leg is the difference of the two squares. Its non-negative root is $12$.`],
      [R`An isosceles right triangle has legs of length $1$. What is the hypotenuse?`, R`The hypotenuse is $\sqrt{2}$.`, R`The two legs are equal. The sum of the two squares is $2$, whose non-negative root is $\sqrt{2}$.`],
      [R`Check whether the lengths $6, 8, 10$ form a right triangle.`, R`Yes, because $6^2+8^2=10^2$.`, R`The converse of Pythagoras' theorem: if the square of one side equals the sum of the squares of the other two, the triangle has a right angle between those two sides.`],
    ],
  },
  "binh-hanh": {
    s: R`A parallelogram has opposite sides parallel and equal. Its area is a base times the corresponding height. A rectangle is a parallelogram with a right angle, and its area is length times width.`,
    w: R`Cutting a right triangle off one side of a parallelogram and moving it to the other side gives a rectangle with the same base and height. The area does not change, so it equals base times height.`,
    p: R`Multiplying two adjacent sides of a parallelogram. Multiply the base by the height perpendicular to that base.`,
    ex: [
      [R`A parallelogram has base $6$ and corresponding height $4$. Find its area. What is the area of a rectangle with length $6$ and width $4$?`, [
        [R`The area of the parallelogram is $6\cdot 4=24$.`, R`The height must be perpendicular to the line containing the chosen base. Multiply exactly that base and height.`],
        [R`The rectangle with the same measures also has area $24$.`, R`A rectangle uses length times width. Here both multiplications give $24$.`],
      ], R`Both areas are $24$.`],
      [R`A rhombus has diagonals of $6$ cm and $8$ cm. Find its side and its area.`, [
        [R`The diagonals are perpendicular and bisect each other, splitting the rhombus into four right triangles with legs $3$ and $4$, so the side is $5$ cm.`, R`A rhombus is a parallelogram whose diagonals are perpendicular and cut each other at their midpoints.`],
        [R`The area is half the product of the diagonals: $\frac{1}{2}\cdot 6\cdot 8=24$ cm².`, R`The four right triangles together make exactly half of the rectangle whose sides are the two diagonals.`],
      ], R`The side of the rhombus is $5$ cm and its area is $24$ cm².`],
    ],
    dr: [
      [R`A rhombus has diagonals $6$ and $8$. Its area is half the product of the diagonals. Find the area.`, R`The area is $24$.`, R`A rhombus is a special parallelogram. The diagonal formula takes half the product of the two diagonals.`],
      [R`What is the area of a rectangle of length $7$ and width $3$?`, R`The area is $21$.`, R`The area of a rectangle is length times width.`],
      [R`What is the perimeter of a square with side $5$?`, R`The perimeter is $20$.`, R`A square has four equal sides. Its perimeter is four times one side.`],
    ],
  },
  "chop-deu": {
    s: R`A regular pyramid has a regular polygon as its base, and the foot of its height is the centre of the base. Its volume is $\frac{1}{3}$ of the base area times the height.`,
    w: R`A cube can be split into three equal pyramids sharing their apex at one corner, with bases the three faces not containing that corner. So a pyramid's volume is one third of the prism with the same base and height.`,
    p: R`Using a lateral edge or the slant height as the height. The height is the perpendicular dropped from the apex to the base.`,
    ex: [
      [R`A regular pyramid has a square base of side $6$ and height $4$. Find its volume.`, [
        [R`The base area is $6\cdot 6=36$.`, R`The base is a square, a regular polygon. The foot of the height is the centre of that square.`],
        [R`The volume is $\frac{1}{3}\cdot 36\cdot 4=48$.`, R`The pyramid formula takes one third of the base area times the height.`],
      ], R`The volume is $48$.`],
      [R`A regular square pyramid has base edge $10$ cm and slant height $13$ cm. Find its lateral area and its height.`, [
        [R`The lateral area is half the base perimeter times the slant height: $\frac{1}{2}\cdot 40\cdot 13=260$ cm².`, R`The four side faces are equal isosceles triangles, each with base $10$ and height $13$.`],
        [R`The height, slant height and half a base edge form a right triangle: $h=\sqrt{13^2-5^2}=12$ cm.`, R`The foot of the height is the centre of the base, which is half an edge, that is $5$ cm, from the midpoint of each base edge.`],
      ], R`The lateral area is $260$ cm² and the height is $12$ cm.`],
    ],
    dr: [
      [R`A regular pyramid has a square base of side $4$ and height $3$. What is its volume?`, R`The volume is $16$.`, R`The base area is $16$. One third of $16\cdot 3$ is $16$.`],
      [R`The base is an equilateral triangle of area $12$, and the pyramid's height is $5$. What is the volume?`, R`The volume is $20$.`, R`The base is a regular polygon. The volume is still one third of base area times height.`],
      [R`If a regular pyramid has volume $48$ and base area $36$, what is its height?`, R`The height is $4$.`, R`From the volume formula, multiply by $3$ and divide by the base area, which is not $0$, to find the height.`],
    ],
  },
  thales: {
    s: R`If a line is parallel to one side of a triangle and crosses the other two sides, it cuts those sides into proportional segments. The converse: if a line crosses two sides and cuts them into proportional segments, it is parallel to the third side.`,
    w: R`Divide side $AB$ into equal segments and draw lines through the division points parallel to $BC$. These lines also divide side $AC$ into equal segments, so the ratio of segments on the two sides is the same.`,
    p: R`Setting up two mismatched ratios: on one side the upper segment over the whole side, on the other the upper segment over the lower one. Both ratios must be set up the same way.`,
    ex: [
      [R`In triangle $ABC$, a line parallel to $BC$ crosses $AB$ at $M$ and $AC$ at $N$. Given $AM=4$, $MB=6$ and $AN=6$, find $NC$.`, [
        [R`By Thales' theorem, $\frac{AM}{MB}=\frac{AN}{NC}$.`, R`The line $MN$ is parallel to $BC$, so it divides the two sides in the same ratio.`],
        [R`Substitute: $\frac{4}{6}=\frac{6}{NC}$, so $NC=\frac{6\cdot 6}{4}=9$.`, R`Cross-multiply the proportion to find the unknown term.`],
      ], R`The length $NC$ is $9$.`],
      [R`To measure a tree's height, a stake $2$ m tall is set up. Its shadow is $1.5$ m long, while at the same moment the tree's shadow is $9$ m long. How tall is the tree?`, [
        [R`The sun's rays are parallel, so the triangle formed by the stake and its shadow is similar to the triangle formed by the tree and its shadow.`, R`The two right triangles have equal angles between the sun's rays and the ground.`],
        [R`Set up the proportion $\frac{h}{9}=\frac{2}{1.5}$, so $h=9\cdot\frac{4}{3}=12$ m.`, R`Height divided by shadow length is the same for every upright object at the same moment.`],
      ], R`The tree is $12$ m tall.`],
    ],
    dr: [
      [R`A line parallel to $BC$ crosses $AB$, $AC$ at $M$, $N$. Given $AM=3$, $AB=9$ and $AC=12$, find $AN$.`, R`The length $AN$ is $4$.`, R`We have $\frac{AM}{AB}=\frac{AN}{AC}$, so $AN=\frac{3}{9}\cdot 12=4$.`],
      [R`Given $AM=2$, $MB=4$, $AN=3$ and $NC=6$, is the line $MN$ parallel to $BC$?`, R`Yes, because the two ratios are equal.`, R`We have $\frac{2}{4}=\frac{3}{6}$, so by the converse of Thales' theorem $MN$ is parallel to $BC$.`],
      [R`A post $2$ metres tall casts a shadow $3$ metres long. At the same time a tree casts a shadow $12$ metres long. How tall is the tree?`, R`The tree is $8$ metres tall.`, R`Height and shadow are proportional: $\frac{2}{3}=\frac{h}{12}$, so $h=8$.`],
    ],
  },
  "duong-trung-binh": {
    s: R`A midline of a triangle is the segment joining the midpoints of two sides. It is parallel to the third side and half as long.`,
    w: R`Because $\frac{AM}{AB}=\frac{AN}{AC}=\frac{1}{2}$, the converse of Thales' theorem makes $MN$ parallel to $BC$. Triangle $AMN$ is similar to triangle $ABC$ with ratio $\frac{1}{2}$, so $MN$ is half of $BC$.`,
    p: R`Confusing a midline with a median. A median joins a vertex to the midpoint of the opposite side; a midline joins two midpoints.`,
    ex: [
      [R`Triangle $ABC$ has $BC=10$. Let $M$, $N$ be the midpoints of $AB$ and $AC$. Find $MN$.`, [
        [R`The segment $MN$ is a midline of triangle $ABC$.`, R`The points $M$ and $N$ are midpoints of two sides.`],
        [R`So $MN=\frac{1}{2}BC=5$.`, R`A midline is half as long as the third side.`],
      ], R`The length $MN$ is $5$.`],
      [R`The trapezium $ABCD$ has parallel sides $AB=6$ cm and $CD=14$ cm. Find the length of its midline.`, [
        [R`The midline joins the midpoints of the two non-parallel sides and is parallel to the two bases.`, R`This is the definition of the midline of a trapezium, similar to the triangle case.`],
        [R`Its length is half the sum of the bases: $\frac{6+14}{2}=10$ cm.`, R`A diagonal splits the trapezium into two triangles, and each piece of the midline is a midline of one of them.`],
      ], R`The midline is $10$ cm long.`],
    ],
    dr: [
      [R`How long is the midline corresponding to a base of length $14$?`, R`The midline is $7$ long.`, R`A midline is half as long as the side it is parallel to.`],
      [R`A midline is $6$ long. How long is the side parallel to it?`, R`That side is $12$ long.`, R`The third side is twice as long as the midline.`],
      [R`A triangle has sides $6$, $8$ and $10$. What is the perimeter of the triangle formed by its three midlines?`, R`The perimeter is $12$.`, R`Each midline is half of a side, so the perimeter is half that of the original triangle.`],
    ],
  },
  "phan-giac": {
    s: R`In a triangle, the bisector of an angle divides the opposite side into two segments proportional to the two sides next to them.`,
    w: R`Through $B$ draw the line parallel to $AD$, meeting the line $AC$ at $E$. Triangle $ABE$ is isosceles at $A$, so $AE=AB$, and Thales' theorem gives $\frac{DB}{DC}=\frac{AE}{AC}=\frac{AB}{AC}$.`,
    p: R`Pairing the wrong sides. The segment $DB$ goes with the side $AB$, and $DC$ goes with $AC$.`,
    ex: [
      [R`Triangle $ABC$ has $AB=6$, $AC=9$ and $BC=10$. The bisector of angle $A$ meets $BC$ at $D$. Find $DB$ and $DC$.`, [
        [R`We have $\frac{DB}{DC}=\frac{AB}{AC}=\frac{6}{9}=\frac{2}{3}$.`, R`The angle bisector divides the opposite side in the ratio of the two adjacent sides.`],
        [R`Split $BC=10$ into $5$ equal parts: $DB=4$ and $DC=6$.`, R`The two segments add up to $10$ in the ratio $2:3$, so each part is $2$.`],
      ], R`The length $DB$ is $4$ and $DC$ is $6$.`],
      [R`Triangle $ABC$ has $AB=4$, $AC=6$, and the bisector of angle $A$ meets $BC$ at $D$ with $BD=2$. Find $DC$ and $BC$.`, [
        [R`By the angle bisector property: $\frac{DB}{DC}=\frac{AB}{AC}=\frac{4}{6}$.`, R`The bisector divides the opposite side into two segments proportional to the two adjacent sides.`],
        [R`Hence $DC=2\cdot\frac{6}{4}=3$, and $BC=2+3=5$.`, R`The point $D$ lies between $B$ and $C$, so $BC$ is the sum of the two segments.`],
      ], R`We have $DC=3$ and $BC=5$.`],
    ],
    dr: [
      [R`A triangle has $AB=4$ and $AC=8$. The bisector of angle $A$ meets $BC$ at $D$ with $DB=3$. Find $DC$.`, R`The length $DC$ is $6$.`, R`We have $\frac{DB}{DC}=\frac{4}{8}$, so $DC$ is twice $DB$.`],
      [R`A triangle has $AB=5$, $AC=5$ and $BC=8$. The bisector of angle $A$ meets $BC$ at $D$. Find $DB$.`, R`The length $DB$ is $4$.`, R`The two adjacent sides are equal, so $D$ is the midpoint of $BC$.`],
      [R`A triangle has $AB=6$, $AC=12$ and $BC=15$. The bisector of angle $A$ meets $BC$ at $D$. Find $DC$.`, R`The length $DC$ is $10$.`, R`The ratio $DB:DC$ is $6:12$, that is $1:2$, so $DC$ is two thirds of $15$.`],
    ],
  },
  "xs-ti-so": {
    s: R`When all outcomes of an experiment are equally likely, the probability of an event is the number of favourable outcomes divided by the total number of possible outcomes. A probability always lies between $0$ and $1$.`,
    w: R`Equally likely outcomes share the whole chance evenly, each getting an equal part. An event made of so many outcomes gets that many parts.`,
    p: R`Forgetting to check that the outcomes are equally likely. A biased die cannot use this formula.`,
    ex: [
      [R`Roll a fair die. Find the probability of an even number of dots.`, [
        [R`There are $6$ possible outcomes, all equally likely.`, R`The die is fair, so the six faces are equally likely to appear.`],
        [R`The even faces are $2$, $4$ and $6$, so the probability is $\frac{3}{6}=\frac{1}{2}$.`, R`There are three favourable outcomes out of six possible ones.`],
      ], R`The probability is $\frac{1}{2}$.`],
      [R`A box has $5$ red, $3$ blue and $2$ yellow marbles. One is taken at random. Find the probability that it is not red.`, [
        [R`There are $10$ equally likely marbles, and $3+2=5$ of them are not red.`, R`The favourable outcomes are the blue or yellow marbles.`],
        [R`The probability is $\frac{5}{10}=\frac{1}{2}$.`, R`It can also be found as one minus the probability of red.`],
      ], R`The probability is $\frac{1}{2}$.`],
    ],
    dr: [
      [R`Roll a fair die. What is the probability of a face with more than $4$ dots?`, R`The probability is $\frac{1}{3}$.`, R`The faces greater than $4$ are $5$ and $6$, two favourable outcomes out of six.`],
      [R`A box holds $4$ cards numbered $1$, $2$, $3$, $4$. One card is drawn at random. What is the probability of a number greater than $1$?`, R`The probability is $\frac{3}{4}$.`, R`The numbers greater than $1$ are $2$, $3$ and $4$, three favourable outcomes out of four.`],
      [R`A class has $18$ boys and $22$ girls. One student is picked at random. What is the probability of picking a girl?`, R`The probability is $\frac{11}{20}$.`, R`There are $22$ favourable outcomes out of $40$ possible ones, which simplifies to $\frac{11}{20}$.`],
    ],
  },
  "xs-thuc-nghiem-8": {
    s: R`Experimental probability is the number of times an event happens divided by the number of trials. The more trials, the closer the experimental probability gets to the probability computed as a ratio.`,
    w: R`Each trial has a random result, but over very many trials the proportion of times an event happens settles down. The value that proportion approaches is the event's probability.`,
    p: R`Expecting the experimental probability to equal the theoretical probability exactly. The two numbers are only close, and closer when there are more trials.`,
    ex: [
      [R`A fair coin is tossed $200$ times and lands heads $104$ times. Find the experimental probability of heads and compare it with the theoretical probability.`, [
        [R`The experimental probability is $\frac{104}{200}=0.52$.`, R`Divide the number of heads by the total number of tosses.`],
        [R`The theoretical probability is $\frac{1}{2}=0.5$; the two differ by $0.02$.`, R`A fair coin has two equally likely faces.`],
      ], R`The experimental probability is $0.52$, close to the theoretical probability $0.5$.`],
      [R`Assumed data. A factory inspects $400$ products and finds $12$ defective. Estimate the number of defective products in a batch of $5000$.`, [
        [R`The experimental probability of a defect is $\frac{12}{400}=0.03$.`, R`The proportion observed in a large sample is used as an estimate of the probability.`],
        [R`Estimated defects: $5000\cdot 0.03=150$ products.`, R`Multiply the probability by the number of products to get the expected number of defects, which is only approximate.`],
      ], R`The batch has about $150$ defective products.`],
    ],
    dr: [
      [R`A die is rolled $60$ times and shows $6$ dots $12$ times. What is the experimental probability of $6$ dots?`, R`The experimental probability is $\frac{1}{5}$.`, R`Divide $12$ by $60$ and simplify to $\frac{1}{5}$.`],
      [R`Of $500$ products inspected, $15$ are defective. What is the experimental probability of a defect as a percentage?`, R`It is $3\%$.`, R`We have $\frac{15}{500}=0.03$, that is $3\%$.`],
      [R`An event's experimental probability is $0.3$ after $200$ trials. How many times did the event happen?`, R`The event happened $60$ times.`, R`The number of times equals the experimental probability times the number of trials.`],
    ],
  },
};
