/** Lớp 9 bằng tiếng Anh. Thứ tự ví dụ và bài luyện khớp bản tiếng Việt. */
import type { LessonEn } from "./types.ts";

const R = String.raw;

export const g9En: Record<string, LessonEn> = {
  "rut-gon-can": {
    s: R`For $b\ge 0$, $\sqrt{a^2 b}=|a|\sqrt{b}$. A principal square root is non-negative, so the factor taken out of the root is the absolute value of $a$, not $a$ itself when $a$ is negative.`,
    w: R`The root of a product of two non-negative numbers is the product of the roots, so $\sqrt{a^2b}=\sqrt{a^2}\cdot\sqrt{b}$. A principal root is non-negative, so $\sqrt{a^2}$ is $|a|$.`,
    p: R`Writing $\sqrt{a^2}=a$ for every $a$. When $a=-3$, $\sqrt{(-3)^2}=3$, not $-3$.`,
    ex: [
      [R`Simplify $\sqrt{12}$.`, [
        [R`Write $12=2^2\cdot 3$.`, R`The number $4$ is a perfect square and $3$ is not. Split $12$ into a product of these two.`],
        [R`So $\sqrt{12}=|2|\sqrt{3}=2\sqrt{3}$.`, R`Taking a factor out of the root uses the absolute value. Here $|2|=2$.`],
      ], R`The simplified form is $2\sqrt{3}$.`],
      [R`Simplify $\sqrt{50}-\sqrt{18}+\sqrt{8}$.`, [
        [R`Take factors out of the roots: $\sqrt{50}=5\sqrt{2}$, $\sqrt{18}=3\sqrt{2}$ and $\sqrt{8}=2\sqrt{2}$.`, R`Split each number under the root into a perfect square times $2$.`],
        [R`Combine like roots: $(5-3+2)\sqrt{2}=4\sqrt{2}$.`, R`All the roots are $\sqrt{2}$, so add and subtract the coefficients as with like terms.`],
      ], R`The expression equals $4\sqrt{2}$.`],
    ],
    dr: [
      [R`Simplify $\sqrt{50}$.`, R`The simplified form is $5\sqrt{2}$.`, R`Split $50=25\cdot 2$. The root of $25$ is $5$, which comes out of the root.`],
      [R`Compute $\sqrt{9}+\sqrt{16}$.`, R`The sum is $7$.`, R`The root of each perfect square is a non-negative integer. Add $3$ and $4$.`],
      [R`Simplify $\sqrt{(-3)^2\cdot 2}$.`, R`The simplified form is $3\sqrt{2}$.`, R`Because $-3$ is negative, the factor taken out is $|-3|=3$, not $-3$.`],
    ],
  },
  "nhan-can": {
    s: R`For $a\ge 0$ and $b\ge 0$, $\sqrt{a}\cdot\sqrt{b}=\sqrt{ab}$. The non-negativity condition keeps both roots principal.`,
    w: R`The square of $\sqrt{a}\cdot\sqrt{b}$ is $ab$, and the product is non-negative. By the definition of the principal square root, that is exactly $\sqrt{ab}$.`,
    p: R`Applying it to addition. The sum $\sqrt{9}+\sqrt{16}$ is $7$, while $\sqrt{9+16}$ is $5$.`,
    ex: [
      [R`Compute $\sqrt{3}\cdot\sqrt{12}$.`, [
        [R`The product of the two roots is $\sqrt{3\cdot 12}=\sqrt{36}$.`, R`Multiply the numbers under the roots when both are non-negative.`],
        [R`The principal root of $36$ is $6$.`, R`The number $36$ is a perfect square. The root takes the non-negative value.`],
      ], R`The product is $6$.`],
      [R`Rationalise the denominator of $\frac{2}{\sqrt{3}-1}$.`, [
        [R`Multiply the numerator and the denominator by the conjugate $\sqrt{3}+1$.`, R`The product $(\sqrt{3}-1)(\sqrt{3}+1)$ is a difference of two squares, so the roots disappear.`],
        [R`The denominator is $3-1=2$, so the fraction is $\frac{2(\sqrt{3}+1)}{2}=\sqrt{3}+1$.`, R`The numerator and denominator share the factor $2$, so it cancels.`],
      ], R`We have $\frac{2}{\sqrt{3}-1}=\sqrt{3}+1$.`],
    ],
    dr: [
      [R`Compute $\sqrt{8}\cdot\sqrt{2}$.`, R`The product is $4$.`, R`The product under the root is $16$. The principal root of $16$ is $4$.`],
      [R`Compute $\sqrt{5}\cdot\sqrt{5}$.`, R`The product is $5$.`, R`The product of two roots of the same non-negative number is that number.`],
      [R`Simplify $\sqrt{18}\cdot\sqrt{2}$.`, R`The product is $6$.`, R`The product under the root is $36$. Its principal root is $6$.`],
    ],
  },
  "can-bac-ba": {
    s: R`The cube root of a number $a$ is the number $x$ with $x^3=a$. Every real number has exactly one cube root. The cube root of a negative number is negative.`,
    w: R`The function $y=x^3$ always increases and takes every real value. So for each number $a$ there is exactly one number $x$ with $x^3=a$, even when $a$ is negative.`,
    p: R`Thinking negative numbers have no cube root, as with square roots. The cube root of a negative number exists and is negative.`,
    ex: [
      [R`Compute $\sqrt[3]{27}$ and $\sqrt[3]{-8}$.`, [
        [R`Since $3^3=27$, $\sqrt[3]{27}=3$.`, R`Find the number whose cube is the number under the root.`],
        [R`Since $(-2)^3=-8$, $\sqrt[3]{-8}=-2$.`, R`The cube of a negative number is negative, so a negative number has a cube root.`],
      ], R`The two values are $3$ and $-2$.`],
      [R`Compute $\sqrt[3]{54}:\sqrt[3]{2}+\sqrt[3]{-125}$.`, [
        [R`Combine the division under one root: $\sqrt[3]{54:2}=\sqrt[3]{27}=3$.`, R`The quotient of two cube roots is the cube root of the quotient.`],
        [R`We have $\sqrt[3]{-125}=-5$, so the total is $3-5=-2$.`, R`The cube root of a negative number is negative, because $(-5)^3=-125$.`],
      ], R`The result is $-2$.`],
    ],
    dr: [
      [R`Compute $\sqrt[3]{64}$.`, R`The result is $4$.`, R`We have $4^3=64$, so the cube root of $64$ is $4$.`],
      [R`Compute $\sqrt[3]{-125}$.`, R`The result is $-5$.`, R`We have $(-5)^3=-125$, so the cube root is $-5$.`],
      [R`A cube has volume $216$ cubic centimetres. How many centimetres long is its edge?`, R`The edge is $6$ centimetres long.`, R`The volume is the cube of the edge, and $6^3=216$.`],
    ],
  },
  "y-ax2": {
    s: R`The function $y=ax^2$ with $a\neq 0$ has a parabola with vertex $O$ as its graph. If $a>0$, its minimum is $0$ at $x=0$. If $a<0$, its maximum is $0$ at $x=0$.`,
    w: R`The square $x^2$ is never negative and is $0$ only when $x=0$. Multiplying by a positive $a$ keeps every value at $0$ or above; multiplying by a negative $a$ keeps every value at $0$ or below.`,
    p: R`Computing $-2x^2$ at $x=3$ as $(-2\cdot 3)^2=36$. Powers come before multiplication, so the result is $-2\cdot 9=-18$.`,
    ex: [
      [R`Take $y=x^2$ and $y=-2x^2$. Find the value of the first at $x=3$, and the maximum value of the second.`, [
        [R`At $x=3$, $y=3^2=9$.`, R`The coefficient $a=1>0$. The parabola lies above the horizontal axis and its minimum $0$ is at the vertex.`],
        [R`The function $y=-2x^2$ has $a<0$, so its maximum is $0$ at $x=0$.`, R`Every other value of $-2x^2$ is negative. The vertex is still the origin.`],
      ], R`The value of $x^2$ at $x=3$ is $9$. The maximum of $-2x^2$ is $0$.`],
      [R`Find $a$ so that the graph of $y=ax^2$ passes through $M(2,-8)$, then find $y$ when $x=-3$.`, [
        [R`Substitute the coordinates of $M$: $-8=a\cdot 4$, so $a=-2$.`, R`A point on the graph has coordinates satisfying the function's formula.`],
        [R`When $x=-3$, $y=-2\cdot 9=-18$.`, R`The square of $-3$ is $9$, which is then multiplied by the negative coefficient.`],
      ], R`We have $a=-2$, and at $x=-3$, $y=-18$.`],
    ],
    dr: [
      [R`Compute $y=2x^2$ at $x=4$.`, R`The value is $32$.`, R`Square the input first, then multiply by the coefficient $2$. The coefficient is positive, so the value is not negative.`],
      [R`Compute $y=-x^2$ at $x=5$.`, R`The value is $-25$.`, R`The coefficient is negative, so the value is negative when $x$ is not $0$. The square of $5$ is $25$.`],
      [R`What are the coordinates of the vertex of the parabola $y=ax^2$?`, R`The vertex is the origin $O(0,0)$.`, R`The formula $y=ax^2$ has no first-degree term, so the axis of symmetry is the vertical axis and the vertex is at the origin.`],
    ],
  },
  "doi-xung": {
    s: R`The graph of $y=ax^2$ is symmetric about the vertical axis, because $a(-x)^2=ax^2$. Two points with opposite first coordinates have the same height.`,
    w: R`Two opposite numbers have the same square. So the points $(x,ax^2)$ and $(-x,ax^2)$ both lie on the graph and are mirror images in the vertical axis.`,
    p: R`Thinking the graph is symmetric about the horizontal axis. With $a\neq 0$, the graph lies entirely on one side of the horizontal axis, touching it only at the origin.`,
    ex: [
      [R`Take $y=3x^2$. Compare the heights at $x=2$ and at $x=-2$.`, [
        [R`At $x=2$, the height is $3\cdot 4=12$.`, R`The square of $2$ is $4$, then multiply by the coefficient $3$.`],
        [R`At $x=-2$ the square is still $4$, so the height is also $12$.`, R`The square of the opposite number equals the square of the number itself. That is why the graph is symmetric about the vertical axis.`],
      ], R`Both heights equal $12$.`],
      [R`The graph of $y=\frac{1}{2}x^2$ passes through $A(4,8)$. Find the point symmetric to $A$ on the same graph, and the graph's axis of symmetry.`, [
        [R`The axis of symmetry is the vertical axis, that is, the line $x=0$.`, R`Replacing $x$ by $-x$ does not change $x^2$, so $y$ does not change.`],
        [R`The point symmetric to $A$ is $A'(-4,8)$; check: $\frac{1}{2}\cdot 16=8$.`, R`Reflecting in the vertical axis changes the sign of the first coordinate and keeps the height.`],
      ], R`The symmetric point is $A'(-4,8)$, and the axis of symmetry is the vertical axis.`],
    ],
    dr: [
      [R`Take $y=x^2$. What is the difference between the heights at $x=4$ and at $x=-4$?`, R`The difference is $0$.`, R`Two opposite inputs give the same square. The difference of the two heights is $0$.`],
      [R`Compute $y=\frac{1}{2}x^2$ at $x=6$.`, R`The value is $18$.`, R`The square of $6$ is $36$. Half of $36$ is $18$.`],
      [R`Does the coefficient $a$ of $y=-3x^2$ give a maximum or a minimum at the vertex?`, R`It gives a maximum, and that maximum is $0$.`, R`A negative coefficient makes the parabola open downwards. The vertex is the highest point.`],
    ],
  },
  "he-hai-an": {
    s: R`Add or subtract the equations side by side to eliminate an unknown whose coefficients are opposite or equal. Once one unknown is found, substitute back to find the other, then check both equations.`,
    w: R`Adding two true equations side by side gives a true equation. When an unknown has opposite coefficients, it cancels and an equation in one unknown remains.`,
    p: R`Subtracting side by side but forgetting to change the sign of every term of the equation being subtracted. Put the second equation in brackets before subtracting.`,
    ex: [
      [R`Solve the system $x+y=5$ and $x-y=1$.`, [
        [R`Adding side by side gives $2x=6$, so $x=3$.`, R`The coefficients of $y$ are $1$ and $-1$, so adding eliminates $y$.`],
        [R`Substituting into $x+y=5$ gives $y=2$.`, R`Check the second equation: $3-2=1$, which holds. The pair $(3,2)$ satisfies the system.`],
      ], R`The solution is $x=3$ and $y=2$.`],
      [R`Solve the system $2x+3y=13$ and $3x-2y=0$.`, [
        [R`Multiply the first equation by $2$ and the second by $3$: $4x+6y=26$ and $9x-6y=0$.`, R`Make the coefficients of $y$ opposite so that adding eliminates $y$.`],
        [R`Adding gives $13x=26$, so $x=2$, and substituting gives $y=3$.`, R`Substitute $x$ into either equation to find the other unknown.`],
      ], R`The system has solution $(x,y)=(2,3)$.`],
    ],
    dr: [
      [R`Solve $x+y=10$ and $x-y=4$.`, R`The solution is $x=7$ and $y=3$.`, R`Add the two equations to eliminate $y$. The value $x=7$ is substituted back to find $y=3$.`],
      [R`From $2x=8$, find $x$.`, R`The solution is $x=4$.`, R`The coefficient of $x$ is not $0$. Divide both sides by $2$.`],
      [R`Does the pair $x=1$, $y=1$ satisfy $x+2y=3$?`, R`Yes, because the left-hand side equals $3$.`, R`Substitute both unknowns into the same equation. The left-hand side matches the right.`],
    ],
  },
  "he-the": {
    s: R`From one equation, express one unknown in terms of the other and substitute into the other equation. The solution of the resulting one-unknown equation is put back to find the unknown that was expressed.`,
    w: R`At a solution of the system, both sides of the first equation are the same number. So replacing that unknown by its expression in the other equation neither loses nor adds solutions.`,
    p: R`Substituting back into the very equation used to express the unknown. That only gives an always-true statement such as $0=0$.`,
    ex: [
      [R`Solve the system $y=2x$ and $x+y=9$.`, [
        [R`Substituting $y=2x$ into the second equation gives $x+2x=9$.`, R`The first equation already gives $y$ in terms of $x$. Substitution means replacing it with exactly that expression.`],
        [R`So $3x=9$, giving $x=3$ and $y=6$.`, R`Divide by the coefficient, which is not $0$. Putting back $y=2\cdot 3$ gives $6$, and $3+6=9$.`],
      ], R`The solution is $x=3$ and $y=6$.`],
      [R`Solve the system $x-2y=1$ and $3x+y=10$.`, [
        [R`From the first equation, $x=1+2y$; substitute into the second: $3(1+2y)+y=10$.`, R`Express the unknown whose coefficient is $1$ to avoid working with fractions.`],
        [R`Solving gives $7y=7$, that is $y=1$, so $x=3$.`, R`Put the value just found into the expression to get the other unknown.`],
      ], R`The system has solution $(x,y)=(3,1)$.`],
    ],
    dr: [
      [R`Solve $y=x+1$ and $x+y=7$.`, R`The solution is $x=3$ and $y=4$.`, R`Substitute $y$ into the sum equation. The solution satisfies both equations of the system.`],
      [R`From $y=3x$ and $y=12$, find $x$.`, R`The solution is $x=4$.`, R`The two expressions for $y$ are equal. Divide $12$ by the coefficient $3$.`],
      [R`Does the pair $x=2$, $y=5$ satisfy $y=2x+1$?`, R`Yes, because the right-hand side equals $5$.`, R`Substitute the first coordinate into the expression. The result matches the given second coordinate.`],
    ],
  },
  delta: {
    s: R`With $a\neq 0$, the discriminant is $\Delta=b^2-4ac$. If $\Delta>0$ there are two distinct solutions $x=\frac{-b\pm\sqrt{\Delta}}{2a}$. If $\Delta=0$ there is a double root $x=-\frac{b}{2a}$. If $\Delta<0$ the equation has no real solution. If $a=0$ this formula cannot be used.`,
    w: R`Completing the square turns the equation into $\left(x+\frac{b}{2a}\right)^2=\frac{\Delta}{4a^2}$. The left-hand side is non-negative, so the sign of $\Delta$ decides whether there are two solutions, a double root or none.`,
    p: R`Getting the sign of $\Delta$ wrong when $c$ is negative. For $x^2-2x-3=0$, $\Delta=4-4\cdot 1\cdot(-3)=16$, not $-8$.`,
    ex: [
      [R`Consider $x^2-2x+1=0$ and $x^2+1=0$.`, [
        [R`For $x^2-2x+1$ we have $\Delta=4-4=0$, so there is a double root $x=1$.`, R`A discriminant of $0$ is the condition for a double root. The formula gives one value $x=-\frac{b}{2a}$.`],
        [R`For $x^2+1$ we have $\Delta=-4<0$, so there is no real solution.`, R`When the discriminant is negative its root is not a real number. The real solution set is empty.`],
      ], R`The first equation has the double root $x=1$. The second has no real solution because $\Delta<0$.`],
      [R`Solve the equation $2x^2-5x-3=0$.`, [
        [R`Compute the discriminant: $\Delta=(-5)^2-4\cdot 2\cdot(-3)=25+24=49$.`, R`The discriminant is positive, so there are two distinct solutions.`],
        [R`The two solutions are $x=\frac{5\pm 7}{4}$, that is $x=3$ and $x=-\frac{1}{2}$.`, R`Because $\sqrt{49}=7$, the formula gives two values.`],
      ], R`The equation has two solutions, $x=3$ and $x=-\frac{1}{2}$.`],
    ],
    dr: [
      [R`Solve $x^2-3x+2=0$.`, R`Since $\Delta=1>0$, the two solutions are $x=1$ and $x=2$.`, R`A positive discriminant gives two distinct real solutions. The formula applies because the leading coefficient is not $0$.`],
      [R`Compute $\Delta$ for $x^2+x+1=0$.`, R`The discriminant is $-3$, so $\Delta<0$ and there is no real solution.`, R`The square of the middle coefficient minus four times the product of the other two. The result is negative, so there is no real solution.`],
      [R`What solution does $0\cdot x^2+2x-6=0$ have?`, R`Since the leading coefficient is $0$, this is a linear equation, with solution $x=3$.`, R`The discriminant formula is not used when $a=0$. What remains is a linear equation in one unknown.`],
    ],
  },
  viete: {
    s: R`If $x^2+bx+c=0$ has two solutions, their sum is $-b$ and their product is $c$. For $ax^2+bx+c=0$ with $a\neq 0$, the sum is $-\frac{b}{a}$ and the product is $\frac{c}{a}$, when the solutions exist.`,
    w: R`If the two solutions are $x_1$ and $x_2$, then $ax^2+bx+c=a(x-x_1)(x-x_2)$. Expanding the right-hand side and comparing coefficients shows the sum is $-\frac{b}{a}$ and the product is $\frac{c}{a}$.`,
    p: R`Using the theorem when the equation has no solution. Check $\Delta\ge 0$ first; otherwise the sum and product found belong to no real solutions.`,
    ex: [
      [R`The equation $x^2-5x+6=0$ has two solutions. Find their sum and product by Vieta's theorem, then compare.`, [
        [R`The sum is $5$ and the product is $6$.`, R`The leading coefficient is $1$. The sum is the opposite of the middle coefficient, and the product is the constant term.`],
        [R`The two solutions $2$ and $3$ have sum $5$ and product $6$.`, R`Compare with the solutions found. Vieta's theorem matches both the sum and the product.`],
      ], R`The sum of the solutions is $5$ and their product is $6$.`],
      [R`The equation $x^2-7x+3=0$ has two solutions $x_1$, $x_2$. Without solving it, find $x_1^2+x_2^2$.`, [
        [R`By Vieta's theorem: $x_1+x_2=7$ and $x_1x_2=3$.`, R`The discriminant $49-12=37$ is positive, so the equation has two solutions.`],
        [R`Rewrite: $x_1^2+x_2^2=(x_1+x_2)^2-2x_1x_2=49-6=43$.`, R`The expression is symmetric, so it can be written in terms of the sum and product of the solutions.`],
      ], R`We have $x_1^2+x_2^2=43$.`],
    ],
    dr: [
      [R`What is the sum of the solutions of $x^2+3x-4=0$?`, R`The sum is $-3$.`, R`Vieta's theorem takes the opposite of the middle coefficient when the leading coefficient is $1$.`],
      [R`For the same equation, what is the product of the solutions?`, R`The product is $-4$.`, R`The product of the solutions is the constant term when the coefficient of $x^2$ is $1$.`],
      [R`What is the sum of the solutions of $2x^2-8x+6=0$?`, R`The sum is $4$.`, R`The sum is minus the middle coefficient divided by the leading coefficient. The denominator $2$ is not $0$.`],
    ],
  },
  "bpt-mot-an": {
    s: R`For $a>0$, the inequality $ax+b>0$ is equivalent to $x>-\frac{b}{a}$. The inequality is strict, with a greater-than sign, so the value making the left-hand side $0$ is not in the solution set. This one-unknown form comes before the two-unknown inequalities of grade 10.`,
    w: R`Adding the same number to both sides, or dividing both sides by the same positive number, does not change the order of the two sides. Those two steps turn $2x-6>0$ into $x>3$.`,
    p: R`Including the boundary value in the solution set. With a strict greater-than sign, $x=3$ makes the left-hand side $0$, so it is not a solution.`,
    ex: [
      [R`Solve the inequality $2x-6>0$.`, [
        [R`The coefficient of $x$ is $2>0$, so the direction is kept when dividing.`, R`Dividing by a positive number does not reverse an inequality.`],
        [R`We get $x>3$. The inequality is strict, with a greater-than sign, so $x=3$ is not in the solution set.`, R`At $x=3$ the left-hand side is $0$, which does not satisfy the greater-than sign.`],
      ], R`The solution set is $(3,+\infty)$.`],
      [R`Solve the inequality $3(x-1)\le x+5$.`, [
        [R`Expand: $3x-3\le x+5$, and moving terms across gives $2x\le 8$.`, R`Moving a term to the other side changes its sign, while the inequality keeps its direction.`],
        [R`Divide both sides by $2$: $x\le 4$.`, R`Dividing by a positive number keeps the direction of the inequality.`],
      ], R`The solution of the inequality is $x\le 4$.`],
    ],
    dr: [
      [R`Solve the inequality $3x+6\le 0$.`, R`The solution set is $(-\infty,-2]$.`, R`The coefficient of $x$ is positive, so the direction is kept. Less than or equal includes the point where the left-hand side is $0$.`],
      [R`Solve the inequality $x-1\ge 0$.`, R`The solution set is $[1,+\infty)$.`, R`The boundary value $x=1$ makes the left-hand side $0$ and is included because the inequality is not strict.`],
      [R`Does $x=3$ belong to the solution set of $2x-6>0$?`, R`No. The inequality is strict, with a greater-than sign, so $x=3$ is not in the solution set.`, R`The boundary point of a strict inequality is excluded. The solution set is an open interval.`],
    ],
  },
  "bpt-am": {
    s: R`When both sides of an inequality are multiplied or divided by a negative number, the inequality reverses. Dividing by a positive number keeps the direction.`,
    w: R`On the number line, taking opposites flips points across $0$, so the order is reversed: from $2<5$ we get $-2>-5$. Multiplying or dividing by a negative number always includes such a flip.`,
    p: R`Dividing by a negative number and keeping the direction. From $-x<4$ we get $x>-4$, not $x<-4$.`,
    ex: [
      [R`Solve the inequality $-x<4$.`, [
        [R`Multiply both sides by $-1$ and reverse the direction, giving $x>-4$.`, R`The factor $-1$ is negative, so the less-than sign becomes a greater-than sign.`],
        [R`The solution set is $(-4,+\infty)$.`, R`The inequality is strict, so $-4$ is not in the solution set. Every number greater than $-4$ works.`],
      ], R`The solution set is $(-4,+\infty)$.`],
      [R`Solve the inequality $5-3x>11$.`, [
        [R`Move $5$ to the right-hand side: $-3x>6$.`, R`Moving a constant across changes its sign.`],
        [R`Divide both sides by $-3$ and reverse the direction: $x<-2$.`, R`Multiplying or dividing both sides by a negative number flips the order on the number line.`],
      ], R`The solution of the inequality is $x<-2$.`],
    ],
    dr: [
      [R`Solve the inequality $-2x\ge 6$.`, R`The solution set is $(-\infty,-3]$.`, R`Dividing by $-2$ reverses the direction. Greater than or equal becomes less than or equal, and $-3$ is included.`],
      [R`Solve the inequality $-x+1>0$.`, R`The solution set is $(-\infty,1)$.`, R`Rewrite as $-x>-1$, then reverse the direction when multiplying by $-1$. The point $1$ is not in the solution set.`],
      [R`Does $x=-4$ belong to the solution set of $-x<4$?`, R`No, because a strict inequality excludes the point where both sides are equal.`, R`At $x=-4$ both sides equal $4$. The less-than sign does not accept equality.`],
    ],
  },
  "ti-so-lg": {
    s: R`In a right triangle, the sine of an acute angle is the opposite side over the hypotenuse, the cosine is the adjacent side over the hypotenuse, and the tangent is the opposite side over the adjacent side.`,
    w: R`Right triangles sharing an acute angle are similar to each other. So the ratios of their sides depend only on the angle, not on how big the triangle is.`,
    p: R`Mixing up the opposite and adjacent sides. The opposite side faces the angle in question; the adjacent side is the leg that forms that angle.`,
    ex: [
      [R`A right triangle has the side opposite an acute angle equal to $3$, the adjacent side $4$ and the hypotenuse $5$. Find the sine and cosine of that angle.`, [
        [R`The sine is $\frac{3}{5}$.`, R`The opposite side is $3$ and the hypotenuse is $5$. This ratio is the sine of the chosen acute angle.`],
        [R`The cosine is $\frac{4}{5}$.`, R`The side adjacent to the angle is $4$. The same hypotenuse $5$ is the denominator.`],
      ], R`The sine is $\frac{3}{5}$ and the cosine is $\frac{4}{5}$.`],
      [R`Triangle $ABC$ has a right angle at $A$, with $AB=5$ and $BC=13$. Find $\sin B$, $\cos B$ and $\tan B$.`, [
        [R`By Pythagoras' theorem: $AC=\sqrt{169-25}=12$.`, R`All three sides are needed to form all three ratios.`],
        [R`For angle $B$: $\sin B=\frac{12}{13}$, $\cos B=\frac{5}{13}$ and $\tan B=\frac{12}{5}$.`, R`The side opposite angle $B$ is $AC$, the adjacent side is $AB$, and the hypotenuse is $BC$.`],
      ], R`We have $\sin B=\frac{12}{13}$, $\cos B=\frac{5}{13}$ and $\tan B=\frac{12}{5}$.`],
    ],
    dr: [
      [R`In the same triangle, what is the tangent of the angle opposite the side $3$?`, R`The tangent is $\frac{3}{4}$.`, R`The tangent is the opposite side over the adjacent side. The denominator is the side $4$, not the hypotenuse.`],
      [R`An acute angle has adjacent side $8$ and hypotenuse $10$. What is its cosine?`, R`The cosine is $\frac{4}{5}$.`, R`Divide the adjacent side by the hypotenuse and simplify. The common factor of $8$ and $10$ is $2$.`],
      [R`The sine of an acute angle is $\frac{5}{13}$ and the hypotenuse is $13$. What is the opposite side?`, R`The opposite side is $5$.`, R`The opposite side equals the hypotenuse times the sine of the angle.`],
    ],
  },
  "canh-lg": {
    s: R`Knowing the hypotenuse and a ratio, a leg equals the hypotenuse times the matching sine or cosine. The tangent is used when one leg is known and the other leg is wanted.`,
    w: R`By definition, the sine is the opposite side over the hypotenuse. Multiplying both sides by the hypotenuse shows the opposite side is the hypotenuse times the sine.`,
    p: R`Dividing by the sine when you should multiply. A leg is always shorter than the hypotenuse; if your result is longer, the calculation is upside down.`,
    ex: [
      [R`The hypotenuse is $10$ and the sine of an acute angle is $\frac{3}{5}$. How long is the side opposite that angle?`, [
        [R`The opposite side is the hypotenuse times the sine.`, R`Reverse the definition of sine. The denominator of the ratio is the hypotenuse and the numerator is the opposite side.`],
        [R`So the opposite side is $10\cdot\frac{3}{5}=6$.`, R`Simplify $\frac{10}{5}$ before multiplying by $3$. The result is the length of the opposite side.`],
      ], R`The opposite side is $6$.`],
      [R`A kite flies on a string $50$ m long that makes an angle of $30^\circ$ with the ground. How many metres above the person's hand is the kite?`, [
        [R`The string is the hypotenuse, and the height is the side opposite the $30^\circ$ angle.`, R`Ignore the sag of the string and treat it as a straight segment.`],
        [R`The height is $50\cdot\sin 30^\circ=50\cdot\frac{1}{2}=25$ m.`, R`The opposite side is the hypotenuse times the sine of the angle.`],
      ], R`The kite is $25$ m above the person's hand.`],
    ],
    dr: [
      [R`The hypotenuse is $13$ and the cosine of an acute angle is $\frac{5}{13}$. How long is the adjacent side?`, R`The adjacent side is $5$.`, R`The adjacent side is the hypotenuse times the cosine. The product simplifies to $5$.`],
      [R`The opposite side is $6$ and the tangent is $\frac{3}{4}$. How long is the adjacent side?`, R`The adjacent side is $8$.`, R`The tangent is opposite over adjacent, so the adjacent side is the opposite side divided by the tangent.`],
      [R`The hypotenuse is $25$ and the opposite side is $7$. What is the sine of the angle opposite the side $7$?`, R`The sine is $\frac{7}{25}$.`, R`The sine is the ratio of the opposite side to the hypotenuse. The two numbers have no common factor greater than $1$.`],
    ],
  },
  "tiep-tuyen": {
    s: R`A tangent is perpendicular to the radius at the point of contact. If a tangent is drawn from a point outside the circle, the square of the tangent length equals the square of the distance to the centre minus the square of the radius.`,
    w: R`The point of contact is the point of the tangent closest to the centre, and the shortest segment from a point to a line is the perpendicular one. So the radius is perpendicular to the tangent, and triangle $OAH$ has a right angle at $H$, so Pythagoras' theorem applies.`,
    p: R`Taking $OA$ as a leg. The right angle is at the point of contact $H$, so $OA$ is the hypotenuse and $AH^2=OA^2-OH^2$.`,
    ex: [
      [R`A circle has centre $O$ and radius $5$. The point $A$ is $13$ from $O$. The tangent from $A$ touches the circle at $H$. Find $AH$.`, [
        [R`Triangle $OHA$ has a right angle at $H$, because the tangent is perpendicular to the radius $OH$.`, R`The point of contact is the foot of the radius perpendicular to the tangent.`],
        [R`The length $AH$ is $\sqrt{13^2-5^2}=12$.`, R`The remaining leg is the non-negative root of the difference of the two squares.`],
      ], R`The tangent segment $AH$ has length $12$.`],
      [R`From a point $A$ outside the circle with centre $O$ and radius $3$ cm, two tangents $AB$, $AC$ are drawn, with $AB=4$ cm. Find $OA$ and the perimeter of quadrilateral $ABOC$.`, [
        [R`A tangent is perpendicular to the radius at the point of contact, so $OA=\sqrt{3^2+4^2}=5$ cm.`, R`Triangle $OBA$ has a right angle at $B$, with hypotenuse $OA$.`],
        [R`The two tangents meet at $A$, so $AC=AB=4$, and the perimeter is $4+4+3+3=14$ cm.`, R`Two tangents from the same point give two equal tangent segments.`],
      ], R`We have $OA=5$ cm and the perimeter of the quadrilateral is $14$ cm.`],
    ],
    dr: [
      [R`The centre is $10$ from an outside point and the radius is $6$. How long is the tangent segment?`, R`The tangent segment is $8$ long.`, R`The triangle has its right angle at the point of contact. The difference $100-36$ is $64$, whose non-negative root is $8$.`],
      [R`The radius is $9$ and the tangent segment is $12$. How far is the outside point from the centre?`, R`The distance is $15$.`, R`The distance to the centre is the hypotenuse of the right triangle formed by the radius and the tangent.`],
      [R`The radius is $5$, the tangent is $12$ and the distance from the centre to the outside point is $13$. Which relation confirms the angle at the point of contact is a right angle?`, R`We have $5^2+12^2=13^2$, so the angle at the point of contact is a right angle.`, R`The radius and the tangent are the two legs, and the distance to the centre is the hypotenuse. A difference of $0$ confirms the right angle.`],
    ],
  },
  "goc-noi-tiep": {
    s: R`An inscribed angle measures half the central angle on the same arc. An inscribed angle on a semicircle is a right angle.`,
    w: R`Joining the centre to the vertex of the inscribed angle creates isosceles triangles whose equal sides are radii. The exterior angle of each isosceles triangle is twice its base angle, so adding up, the central angle is twice the inscribed angle.`,
    p: R`Doubling the wrong way. The inscribed angle is the smaller one, half the central angle on the same arc.`,
    ex: [
      [R`A central angle cuts off an arc of $80^\circ$. How many degrees is the inscribed angle on the same arc?`, [
        [R`The inscribed angle is half the central angle on the same arc.`, R`The vertex of the inscribed angle is on the circle; the vertex of the central angle is the centre.`],
        [R`It measures $\frac{80^\circ}{2}=40^\circ$.`, R`Divide the arc measure, which is also the central angle, by $2$.`],
      ], R`The inscribed angle is $40^\circ$.`],
      [R`Let $AB$ be a diameter of the circle with centre $O$, and $C$ a point on the circle with $\widehat{CAB}=35^\circ$. Find $\widehat{ACB}$ and $\widehat{ABC}$.`, [
        [R`The angle $\widehat{ACB}$ is an inscribed angle on a semicircle, so it is $90^\circ$.`, R`A semicircle is an arc of $180^\circ$, and an inscribed angle is half the arc it cuts off.`],
        [R`In the right triangle $ACB$: $\widehat{ABC}=90^\circ-35^\circ=55^\circ$.`, R`The two acute angles of a right triangle are complementary.`],
      ], R`We have $\widehat{ACB}=90^\circ$ and $\widehat{ABC}=55^\circ$.`],
    ],
    dr: [
      [R`A central angle is $120^\circ$. How many degrees is the inscribed angle on the same arc?`, R`The inscribed angle is $60^\circ$.`, R`On the same arc, the inscribed angle is half the central angle.`],
      [R`An inscribed angle stands on a semicircle, which is an arc of $180^\circ$. How many degrees is the angle?`, R`The angle is $90^\circ$.`, R`An inscribed angle on a semicircle is a right angle. Half of $180^\circ$ is $90^\circ$.`],
      [R`An inscribed angle is $35^\circ$. How many degrees is the central angle on the same arc?`, R`The central angle is $70^\circ$.`, R`Reverse the relation: the central angle is twice the inscribed angle on the same arc.`],
    ],
  },
  "tu-giac-noi-tiep": {
    s: R`A cyclic quadrilateral has all four vertices on one circle. In a cyclic quadrilateral, opposite angles add up to $180^\circ$.`,
    w: R`Two opposite angles of a cyclic quadrilateral are inscribed angles on two arcs that together make the whole circle of $360^\circ$. Each angle is half its arc, so the two angles add up to $180^\circ$.`,
    p: R`Thinking every quadrilateral is cyclic. A parallelogram that is not a rectangle has two equal opposite angles other than $90^\circ$, so it is not cyclic.`,
    ex: [
      [R`Quadrilateral $ABCD$ is inscribed in a circle, with angle $A$ equal to $70^\circ$ and angle $B$ equal to $95^\circ$. Find angles $C$ and $D$.`, [
        [R`Angle $C$ is opposite angle $A$, so it is $180^\circ-70^\circ=110^\circ$.`, R`Opposite angles of a cyclic quadrilateral add up to $180^\circ$.`],
        [R`Angle $D$ is opposite angle $B$, so it is $180^\circ-95^\circ=85^\circ$.`, R`Apply the same property to the other pair of opposite angles.`],
      ], R`Angle $C$ is $110^\circ$ and angle $D$ is $85^\circ$.`],
      [R`Triangle $ABC$ has two altitudes $BD$ and $CE$. Prove that the four points $B$, $C$, $D$, $E$ lie on one circle.`, [
        [R`We have $\widehat{BDC}=90^\circ$ and $\widehat{BEC}=90^\circ$.`, R`An altitude is perpendicular to the opposite side at its foot.`],
        [R`The points $D$, $E$ both see the segment $BC$ at a right angle, so both lie on the circle with diameter $BC$.`, R`Every point that sees a segment at a right angle lies on the circle with that segment as diameter.`],
      ], R`The quadrilateral $BCDE$ is inscribed in the circle with diameter $BC$.`],
    ],
    dr: [
      [R`A cyclic quadrilateral has an angle of $120^\circ$. How many degrees is the opposite angle?`, R`The opposite angle is $60^\circ$.`, R`Opposite angles of a cyclic quadrilateral are supplementary.`],
      [R`A quadrilateral has two opposite angles of $100^\circ$ and $70^\circ$. Can it be inscribed in a circle?`, R`No, because the opposite angles do not add up to $180^\circ$.`, R`The opposite angles add up to $170^\circ$, not $180^\circ$, so the quadrilateral is not cyclic.`],
      [R`Can a rectangle be inscribed in a circle? What do its opposite angles add up to?`, R`Yes; its opposite angles add up to $180^\circ$.`, R`Each angle of a rectangle is $90^\circ$, so two opposite angles add up to $180^\circ$.`],
    ],
  },
  "do-dai-cung": {
    s: R`An arc of $n^\circ$ on a circle of radius $R$ has length $\frac{\pi Rn}{180}$. The sector on that arc has area $\frac{\pi R^2n}{360}$.`,
    w: R`The whole circle corresponds to $360^\circ$ and has circumference $2\pi R$. An arc of $n^\circ$ is $\frac{n}{360}$ of the circle, so the arc length and sector area are $\frac{n}{360}$ of the circumference and of the disc's area.`,
    p: R`Using the denominator $360$ for arc length. The arc-length formula has already cancelled the $2$, so its denominator is $180$, while the sector area has denominator $360$.`,
    ex: [
      [R`A circle has radius $6$. Find the length of a $60^\circ$ arc and the area of the corresponding sector.`, [
        [R`The arc length is $\frac{\pi\cdot 6\cdot 60}{180}=2\pi$.`, R`An arc of $60^\circ$ is one sixth of the circle, whose circumference is $12\pi$.`],
        [R`The sector area is $\frac{\pi\cdot 36\cdot 60}{360}=6\pi$.`, R`A sector of $60^\circ$ is one sixth of the disc, whose area is $36\pi$.`],
      ], R`The arc length is $2\pi$ and the sector area is $6\pi$.`],
      [R`A wheel of radius $30$ cm turns through $120^\circ$. How far does a point on the rim travel?`, [
        [R`The distance is the length of a $120^\circ$ arc: $l=\frac{\pi\cdot 30\cdot 120}{180}$.`, R`The arc length is the circumference times the fraction the arc makes of $360^\circ$.`],
        [R`This gives $l=20\pi\approx 62.8$ cm.`, R`Use $\pi\approx 3.14$ to get an approximate number.`],
      ], R`The point travels $20\pi$ cm, about $62.8$ cm.`],
    ],
    dr: [
      [R`Find the length of a $90^\circ$ arc of a circle with radius $4$.`, R`The arc length is $2\pi$.`, R`An arc of $90^\circ$ is a quarter of the circle, whose circumference is $8\pi$.`],
      [R`Find the area of a $120^\circ$ sector of a disc with radius $3$.`, R`The area is $3\pi$.`, R`A sector of $120^\circ$ is a third of the disc, whose area is $9\pi$.`],
      [R`An arc of a circle with radius $9$ has length $3\pi$. How many degrees is the arc?`, R`The arc measures $60^\circ$.`, R`From $\frac{\pi\cdot 9\cdot n}{180}=3\pi$ we get $n=60$.`],
    ],
  },
  tru: {
    s: R`A cylinder with base radius $r$ and height $h$ has volume $\pi r^2 h$. The height must be perpendicular to the base. The radius is not the diameter.`,
    w: R`A cylinder is a stack of equal circular slices. Each slice has area $\pi r^2$, and stacking to height $h$ gives volume $\pi r^2h$.`,
    p: R`Using the diameter instead of the radius. This makes the volume four times too large, because the radius is squared.`,
    ex: [
      [R`A cylinder has base radius $2$ and height $3$. What is its volume?`, [
        [R`The square of the radius is $4$.`, R`Use the radius $2$; do not put the diameter $4$ into the formula.`],
        [R`The volume is $\pi\cdot 4\cdot 3=12\pi$.`, R`Multiply the base area by the height. The factor $\pi$ is kept in the exact answer.`],
      ], R`The volume is $12\pi$.`],
      [R`A cylindrical drum has base diameter $60$ cm and height $90$ cm. About how many litres does it hold?`, [
        [R`The base radius is $30$ cm, and the volume is $V=\pi\cdot 30^2\cdot 90=81\,000\pi$ cm³.`, R`The volume of a cylinder is the base area times the height.`],
        [R`Converting: $81\,000\pi$ cm³ is about $254\,469$ cm³, that is, about $254$ litres.`, R`One litre is one thousand cubic centimetres.`],
      ], R`The drum holds about $254$ litres.`],
    ],
    dr: [
      [R`What is the volume of a cylinder with radius $1$ and height $5$?`, R`The volume is $5\pi$.`, R`The base area is $\pi$ times the square of the radius $1$. Then multiply by the height $5$.`],
      [R`The base diameter is $6$. What is the radius?`, R`The radius is $3$.`, R`The radius is half the diameter. The volume formula uses the radius, not the diameter.`],
      [R`What is the volume of a cylinder with radius $3$ and height $2$?`, R`The volume is $18\pi$.`, R`The square of the radius is $9$. Multiply by the height $2$ and by $\pi$.`],
    ],
  },
  "non-cau": {
    s: R`A cone with the same base radius and height as a cylinder has one third of the cylinder's volume. A sphere of radius $r$ has volume $\frac{4}{3}\pi r^3$.`,
    w: R`Fill a cone with water and pour it into a cylinder with the same base and height: it takes exactly three pours to fill it. A similar experiment shows a sphere takes up two thirds of the cylinder that just encloses it, which gives $\frac{4}{3}\pi r^3$.`,
    p: R`Forgetting the factor $\frac{1}{3}$ for a cone, or squaring the sphere's radius instead of cubing it. The sphere's volume uses $r^3$.`,
    ex: [
      [R`A cone has base radius $2$ and height $3$. A sphere has radius $3$. Find both volumes.`, [
        [R`The cone's volume is $\frac{1}{3}\pi\cdot 4\cdot 3=4\pi$.`, R`Take one third of the base area times the height. The height is perpendicular to the base.`],
        [R`The sphere's volume is $\frac{4}{3}\pi\cdot 27=36\pi$.`, R`Cube the radius first. The factor $\frac{4}{3}\pi$ multiplies $27$.`],
      ], R`The cone has volume $4\pi$ and the sphere has volume $36\pi$.`],
      [R`A spherical ball has diameter $20$ cm. Find its surface area and its volume.`, [
        [R`The radius is $10$ cm, and the surface area is $4\pi\cdot 10^2=400\pi$ cm².`, R`The surface area of a sphere is four times the area of its great circle.`],
        [R`The volume is $\frac{4}{3}\pi\cdot 10^3=\frac{4000}{3}\pi$ cm³, about $4189$ cm³.`, R`The volume of a sphere is proportional to the cube of the radius.`],
      ], R`The surface area is $400\pi$ cm² and the volume is $\frac{4000}{3}\pi$ cm³.`],
    ],
    dr: [
      [R`What is the volume of a cone with base radius $3$ and height $4$?`, R`The volume is $12\pi$.`, R`The base area is $9\pi$. One third of $9\pi\cdot 4$ is $12\pi$.`],
      [R`What is the volume of a sphere with radius $1$?`, R`The volume is $\frac{4}{3}\pi$.`, R`The cube of the radius $1$ is still $1$. Only the formula's coefficient remains.`],
      [R`A cone and a cylinder share a base of radius $2$ and the same height $3$. What fraction of the cylinder's volume is the cone's?`, R`The cone's volume is one third of the cylinder's, namely $4\pi$ when the cylinder's is $12\pi$.`, R`With the same base and height, a cone is one third of a cylinder. The calculation gives exactly the cone's volume.`],
    ],
  },
  "tan-so-tuong-doi": {
    s: R`The frequency is the number of times a value appears. The relative frequency is the frequency divided by the sample size. The frequencies add up to the sample size.`,
    w: R`The relative frequency tells what share of the whole sample a value makes up. It lets you compare two samples of different sizes.`,
    p: R`Comparing frequencies from two samples of different sizes. Having $4$ out of $20$ students is $20\%$, more than $6$ out of $50$, which is $12\%$.`,
    ex: [
      [R`In a sample of $20$ students, $4$ choose subject A. What is the relative frequency of subject A?`, [
        [R`The frequency is $4$ and the sample size is $20$.`, R`The frequency counts the students choosing subject A. The sample size counts everyone asked.`],
        [R`The relative frequency is $\frac{4}{20}=\frac{1}{5}$.`, R`Divide the frequency by the sample size and simplify. The result is the relative frequency, not the frequency.`],
      ], R`The relative frequency is $\frac{1}{5}$.`],
      [R`Assumed data. Test scores of $40$ students: $6$ scored below $5$, $18$ scored from $5$ to below $8$, and the rest scored $8$ or more. Make a relative frequency table.`, [
        [R`The last group has $40-6-18=16$ students.`, R`The frequencies must add up to the sample size.`],
        [R`The relative frequencies are $\frac{6}{40}=15\%$, $\frac{18}{40}=45\%$ and $\frac{16}{40}=40\%$.`, R`Divide each group's frequency by the sample size and convert to a percentage.`],
      ], R`The three groups make up $15\%$, $45\%$ and $40\%$.`],
    ],
    dr: [
      [R`A sample of $10$ numbers has $3$ numbers equal to $5$. What is the relative frequency of the value $5$?`, R`The relative frequency is $\frac{3}{10}$.`, R`Divide the frequency $3$ by the sample size $10$. The fraction is in lowest terms.`],
      [R`Three groups have frequencies $2$, $5$ and $3$. What is the sample size?`, R`The sample size is $10$.`, R`The frequencies add up to the sample size. This number is the denominator of every relative frequency.`],
      [R`A frequency of $4$ in a sample of $20$ students. What is the relative frequency of the remaining group, of $16$ students?`, R`The relative frequency is $\frac{4}{5}$.`, R`The remaining group has frequency $16$. Divide by the sample size $20$ and simplify.`],
    ],
  },
  "tong-tuong-doi": {
    s: R`The relative frequencies of a complete, non-overlapping classification add up to $1$. Each relative frequency lies in the interval $[0,1]$.`,
    w: R`The frequencies add up to the sample size. Dividing both sides by the sample size shows the relative frequencies add up to $1$.`,
    p: R`Getting a total other than $1$ and not checking again. Then the table has missed or double-counted something, or the relative frequencies were rounded too roughly.`,
    ex: [
      [R`A sample is split into two groups, one with relative frequency $\frac{1}{5}$ and the rest. Find the relative frequency of the rest.`, [
        [R`The two groups cover the whole sample without overlapping.`, R`Each element belongs to exactly one group, so the two relative frequencies add up to $1$.`],
        [R`The rest has relative frequency $1-\frac{1}{5}=\frac{4}{5}$.`, R`Subtract the known relative frequency from $1$. The result is still non-negative and at most $1$.`],
      ], R`The relative frequency of the rest is $\frac{4}{5}$.`],
      [R`Assumed data. A relative frequency table has three groups: $25\%$, $40\%$ and $x\%$. The sample size is $60$. Find $x$ and the number of elements in the third group.`, [
        [R`The relative frequencies add up to $100\%$, so $x=100-25-40=35$.`, R`Each element of the sample belongs to exactly one group.`],
        [R`The third group has $60\cdot 35\%=21$ elements.`, R`The frequency is the sample size times the relative frequency.`],
      ], R`We have $x=35$ and the third group has $21$ elements.`],
    ],
    dr: [
      [R`Three relative frequencies are $\frac{1}{2}$, $\frac{1}{5}$ and the rest. What is the rest?`, R`The remaining relative frequency is $\frac{3}{10}$.`, R`The whole table adds up to $1$. Subtract the two known relative frequencies in turn.`],
      [R`Frequencies $2$, $3$ and $5$ in a sample of $10$. What is the sum of the three relative frequencies?`, R`The sum is $1$.`, R`Add the frequency ratios over the same sample size. The numerators add up to exactly the denominator.`],
      [R`What is the mean of the representative values $1, 2, 3$ with frequencies $1, 1, 2$?`, R`The mean is $\frac{9}{4}$.`, R`Multiply each value by its frequency, add them up, then divide by the total frequency.`],
    ],
  },
  "khong-gian-mau-9": {
    s: R`The sample space is the set of all possible outcomes of an experiment. When outcomes are equally likely, the probability of an event is the number of favourable outcomes divided by the number of elements of the sample space.`,
    w: R`Listing the whole sample space makes sure no outcome is missed or counted twice. When every outcome is equally likely, counting is all you need to find the probability.`,
    p: R`Treating SN and NS as one outcome. The two coins are distinguishable, so these are two different outcomes of the sample space.`,
    ex: [
      [R`Toss two fair, distinguishable coins, writing S for tails and N for heads. List the sample space, then find the probability of exactly one tail.`, [
        [R`The sample space has $4$ outcomes: SS, SN, NS and NN.`, R`Each coin has two faces, and two distinguishable coins give $2\cdot 2=4$ outcomes.`],
        [R`The event of exactly one tail is SN and NS, so its probability is $\frac{2}{4}=\frac{1}{2}$.`, R`There are two favourable outcomes out of four equally likely ones.`],
      ], R`The probability is $\frac{1}{2}$.`],
      [R`Roll two fair dice together. Find the probability that the total is $7$.`, [
        [R`The sample space has $6\cdot 6=36$ equally likely outcomes.`, R`Each die has six faces, and the results of the two dice are independent.`],
        [R`The pairs with total $7$ are $(1,6)$, $(2,5)$, $(3,4)$, $(4,3)$, $(5,2)$, $(6,1)$, that is $6$ outcomes, so the probability is $\frac{6}{36}=\frac{1}{6}$.`, R`The two dice are distinguishable, so $(1,6)$ and $(6,1)$ are two different outcomes.`],
      ], R`The probability is $\frac{1}{6}$.`],
    ],
    dr: [
      [R`A die is rolled twice. How many elements does the sample space have?`, R`The sample space has $36$ elements.`, R`Each roll has $6$ outcomes, and two rolls give $6\cdot 6=36$ pairs.`],
      [R`A die is rolled twice. What is the probability that the total is $7$?`, R`The probability is $\frac{1}{6}$.`, R`There are $6$ pairs with total $7$: $(1,6)$, $(2,5)$, $(3,4)$, $(4,3)$, $(5,2)$ and $(6,1)$.`],
      [R`A box has $2$ red marbles and $1$ blue marble. Two marbles are drawn one after another without replacement. What is the probability of two red marbles?`, R`The probability is $\frac{1}{3}$.`, R`There are $3\cdot 2=6$ ordered draws, of which $2\cdot 1=2$ give two red marbles.`],
    ],
  },
  "on10-rut-gon": {
    s: R`The first question of the grade 10 entrance exam usually gives an expression with roots: find the domain, simplify, then compute a value or find $x$ so that the expression meets a condition. Work in order: the domain first, then a common denominator, factorise the numerator and denominator, simplify, and only then substitute numbers.`,
    w: R`Simplifying only changes how an expression is written, not its value, as long as every division is by a number other than $0$. That is why the domain comes first: it tells you what you are allowed to divide by.`,
    p: R`Finding $x$ and forgetting to check it against the domain. A value that makes a denominator $0$ or a number under a root negative must be rejected.`,
    ex: [
      [R`Let $A=\frac{\sqrt{x}}{\sqrt{x}-1}-\frac{1}{\sqrt{x}-1}$ with $x\ge 0$ and $x\neq 1$. Simplify $A$, then find $A$ when $x=9$.`, [
        [R`The two fractions have the same denominator, so $A=\frac{\sqrt{x}-1}{\sqrt{x}-1}$.`, R`With the same denominator, subtract the numerators and keep the denominator; no common denominator is needed.`],
        [R`Since $x\neq 1$, $\sqrt{x}-1\neq 0$, so $A=1$.`, R`The condition $x\neq 1$ makes the denominator other than $0$, so the numerator and denominator may be cancelled.`],
        [R`With $x=9$, which satisfies the conditions, $A=1$.`, R`The simplified expression is constant on the whole domain, so it also equals $1$ at $x=9$.`],
      ], R`The expression $A=1$ for every $x\ge 0$, $x\neq 1$; at $x=9$, $A=1$.`],
      [R`Let $B=\frac{x-4}{\sqrt{x}-2}$ with $x\ge 0$ and $x\neq 4$. Simplify $B$, then find $x$ so that $B=5$.`, [
        [R`Write $x-4=(\sqrt{x}-2)(\sqrt{x}+2)$, so $B=\sqrt{x}+2$.`, R`For $x\ge 0$ we have $x=\left(\sqrt{x}\right)^2$, and the numerator is a difference of two squares.`],
        [R`Solving $\sqrt{x}+2=5$ gives $\sqrt{x}=3$, that is $x=9$.`, R`A principal square root equals $3$ when the number under it is $3^2$.`],
        [R`Check: $x=9$ satisfies $x\ge 0$ and $x\neq 4$, so it is accepted.`, R`The solution found must lie in the domain written at the start.`],
      ], R`Simplifying gives $B=\sqrt{x}+2$, and $B=5$ when $x=9$.`],
    ],
    dr: [
      [R`Simplify $\frac{x-9}{\sqrt{x}+3}$ with $x\ge 0$.`, R`The result is $\sqrt{x}-3$.`, R`The numerator is $(\sqrt{x}-3)(\sqrt{x}+3)$, which cancels with the denominator $\sqrt{x}+3$, always positive.`],
      [R`Let $C=\sqrt{x}+2$ with $x\ge 0$. Find $C$ when $x=16$.`, R`Then $C=6$.`, R`Substitute $x=16$ into the simplified expression: $\sqrt{16}+2=4+2=6$.`],
      [R`Let $D=\frac{\sqrt{x}+1}{\sqrt{x}}$ with $x>0$. Find $x$ so that $D=2$.`, R`The required value is $x=1$.`, R`From $\sqrt{x}+1=2\sqrt{x}$ we get $\sqrt{x}=1$, so $x=1$, which satisfies $x>0$.`],
    ],
  },
  "on10-vi-et": {
    s: R`A familiar question: find $m$ so that a quadratic equation has two solutions satisfying some relation. The steps: compute $\Delta$ and find the condition for solutions to exist, write the sum and product of the solutions by Vieta, rewrite the relation in terms of the sum and product, solve for $m$, then check against the condition for solutions.`,
    w: R`If $x_1$, $x_2$ are the two solutions, then $x^2+bx+c=(x-x_1)(x-x_2)$. Expanding the right-hand side and comparing coefficients shows the sum of the solutions is $-b$ and their product is $c$.`,
    p: R`Solving for $m$ without checking the condition $\Delta\ge 0$, and accepting values for which the equation has no solution.`,
    ex: [
      [R`Find $m$ so that the equation $x^2-2x+m-3=0$ has two solutions $x_1$, $x_2$ with $x_1^2+x_2^2=10$.`, [
        [R`We have $\Delta'=1-(m-3)=4-m$. There are two solutions when $4-m\ge 0$, that is $m\le 4$.`, R`Find the condition for solutions first, because Vieta only speaks about solutions when they exist.`],
        [R`By Vieta: $x_1+x_2=2$ and $x_1x_2=m-3$.`, R`For the equation $x^2+bx+c=0$, the sum of the solutions is $-b$ and the product is $c$.`],
        [R`Rewrite $x_1^2+x_2^2=(x_1+x_2)^2-2x_1x_2=4-2(m-3)=10-2m$. Setting it equal to $10$ gives $m=0$.`, R`The sum of squares can be written through the sum and product using the square-of-a-sum identity.`],
        [R`The value $m=0$ satisfies $m\le 4$, so it is accepted.`, R`The value found must lie within the condition for solutions found in the first step.`],
      ], R`The required value is $m=0$.`],
      [R`Consider the equation $x^2-2(m+1)x+m^2=0$. Find $m$ so that the equation has two distinct solutions with $x_1+x_2=x_1x_2$.`, [
        [R`The condition for two distinct solutions: $\Delta'=(m+1)^2-m^2=2m+1>0$, that is $m>-\frac{1}{2}$.`, R`The coefficient $b$ is even, so the reduced discriminant keeps things short.`],
        [R`By Vieta: $x_1+x_2=2(m+1)$ and $x_1x_2=m^2$. This gives the equation $2m+2=m^2$, that is $m^2-2m-2=0$, so $m=1\pm\sqrt{3}$.`, R`Substitute the sum and product into the given relation to get an equation in $m$.`],
        [R`Check the condition: $1-\sqrt{3}\approx -0.73<-\frac{1}{2}$ is rejected.`, R`The value found must satisfy the condition for solutions from the first step.`],
      ], R`The required value is $m=1+\sqrt{3}$.`],
    ],
    dr: [
      [R`The equation $x^2-6x+5=0$ has two solutions $x_1$, $x_2$. Find $x_1^2+x_2^2$.`, R`The result is $26$.`, R`The sum is $6$ and the product is $5$, so $x_1^2+x_2^2=36-10=26$.`],
      [R`Find $m$ so that $x^2-4x+m=0$ has a double root.`, R`The required value is $m=4$.`, R`There is a double root when $\Delta=16-4m=0$, that is $m=4$.`],
      [R`Find $m$ so that $x^2-2x+m=0$ has two solutions with $x_1-x_2=4$, given $x_1>x_2$.`, R`The required value is $m=-3$.`, R`We have $(x_1-x_2)^2=(x_1+x_2)^2-4x_1x_2=4-4m$; setting it equal to $16$ gives $m=-3$, which satisfies $\Delta'=1-m>0$.`],
    ],
  },
  "on10-lap-he": {
    s: R`A word problem often has two unknown quantities. Let each be an unknown, with its unit and condition. Form two equations from the two relations in the problem. Solve the system, check the conditions, and answer exactly what the problem asks.`,
    w: R`Each sentence of the problem describes a relation between quantities. Writing that relation with the unknowns turns words into an equation, so the solution of the system is exactly the quantities wanted.`,
    p: R`Forgetting the unknowns' conditions and units, or answering the wrong quantity: the problem asks for the speed of the current but the answer gives the speed of the boat.`,
    ex: [
      [R`A rectangular garden has perimeter $34$ m. If the length is increased by $3$ m and the width by $2$ m, the area increases by $45$ m². Find the length and the width.`, [
        [R`Let the length be $x$ m and the width $y$ m, with $x\ge y>0$. The perimeter gives $x+y=17$.`, R`Half the perimeter is the sum of the length and the width.`],
        [R`The new area is $(x+3)(y+2)=xy+45$, which simplifies to $2x+3y=39$.`, R`Expand the left-hand side; the term $xy$ cancels on both sides, leaving a linear equation.`],
        [R`From $x=17-y$, substitute: $34-2y+3y=39$, so $y=5$ and $x=12$.`, R`Express $x$ from the first equation, then substitute into the second to leave one unknown.`],
        [R`Check: $12+5=17$ and $15\cdot 7-12\cdot 5=45$. Both hold.`, R`Check against the original problem, not just the system formed, to catch mistakes in setting up the equations.`],
      ], R`The length is $12$ m and the width is $5$ m.`],
      [R`Two taps together fill an empty tank in $6$ hours. If the first tap runs for $2$ hours and then the second for $3$ hours, they fill $\frac{2}{5}$ of the tank. How long does each tap take on its own?`, [
        [R`Let $u$, $v$ be the fractions of the tank each tap fills in one hour. Then $u+v=\frac{1}{6}$ and $2u+3v=\frac{2}{5}$.`, R`Taking the hourly rates as unknowns makes both equations linear.`],
        [R`Substitute $u=\frac{1}{6}-v$ into the second equation: $\frac{1}{3}+v=\frac{2}{5}$, so $v=\frac{1}{15}$ and $u=\frac{1}{10}$.`, R`Multiplying the first equation by $2$ and subtracting gives the same result.`],
      ], R`The first tap alone takes $10$ hours, and the second takes $15$ hours.`],
    ],
    dr: [
      [R`Two numbers have sum $50$ and difference $12$. Find the larger one.`, R`The larger number is $31$.`, R`Add the two equations: $2x=62$, so $x=31$.`],
      [R`Buying $3$ pens and $2$ notebooks costs $26$ thousand dong, and $1$ pen and $4$ notebooks costs $32$ thousand dong. How many thousand dong does one notebook cost?`, R`One notebook costs $7$ thousand dong.`, R`Multiply the second equation by $3$ and subtract the first: $10y=70$, so $y=7$.`],
      [R`A boat travels $60$ km downstream in $2$ hours and $60$ km upstream in $3$ hours. What is the speed of the current in km/h?`, R`The speed of the current is $5$ km/h.`, R`The downstream speed is $30$ and the upstream speed is $20$. The current's speed is half the difference: $5$ km/h.`],
    ],
  },
  "on10-hinh": {
    s: R`The geometry question usually has three parts: proving four points lie on one circle, proving a relation between lengths, and a harder part. The main tools: a quadrilateral whose opposite angles add up to $180^\circ$ is cyclic, a tangent is perpendicular to the radius, an inscribed angle is half the central angle, and similar triangles.`,
    w: R`A quadrilateral is cyclic when its four vertices are equally far from one point. Two right angles seeing the same segment put those two vertices on the circle with that segment as diameter, because an inscribed angle on a semicircle is a right angle.`,
    p: R`Drawing a special figure, such as an isosceles or right triangle, and then using properties of that special figure for the general case.`,
    ex: [
      [R`From a point $A$ outside the circle with centre $O$, draw two tangents $AB$, $AC$, with $B$, $C$ the points of contact. Prove that the four points $A$, $B$, $O$, $C$ lie on one circle. If $OA=10$ and the radius is $6$, how long is $AB$?`, [
        [R`A tangent is perpendicular to the radius at the point of contact, so $\widehat{ABO}=\widehat{ACO}=90^\circ$.`, R`This is the basic property of tangents, used in almost every geometry question with tangents.`],
        [R`Quadrilateral $ABOC$ has $\widehat{ABO}+\widehat{ACO}=180^\circ$, so it is inscribed in the circle with diameter $OA$.`, R`Opposite angles adding up to $180^\circ$ mark a cyclic quadrilateral; the two right angles both see $OA$, so $OA$ is a diameter.`],
        [R`Triangle $ABO$ has a right angle at $B$: $AB^2=OA^2-OB^2=100-36=64$, so $AB=8$.`, R`Pythagoras' theorem in the right triangle whose hypotenuse is $OA$.`],
      ], R`The four points lie on the circle with diameter $OA$, and $AB=8$.`],
      [R`In a circle with centre $O$, the chord $AB$ does not pass through the centre, and $M$ is the midpoint of $AB$. The radius is $10$ cm and $AB=16$ cm. Find the distance from $O$ to $AB$.`, [
        [R`A diameter through the midpoint of a chord not through the centre is perpendicular to the chord, so $OM\perp AB$.`, R`Triangle $OAB$ is isosceles at $O$, so the median $OM$ is also an altitude.`],
        [R`In the right triangle $OMA$: $OM=\sqrt{10^2-8^2}=6$ cm.`, R`We have $MA$ equal to half the chord, that is $8$ cm, and $OA$ is a radius.`],
      ], R`The distance from $O$ to $AB$ is $6$ cm.`],
    ],
    dr: [
      [R`A cyclic quadrilateral has an angle of $75^\circ$. How many degrees is the opposite angle?`, R`That angle is $105^\circ$.`, R`Opposite angles of a cyclic quadrilateral add up to $180^\circ$.`],
      [R`A circle has radius $5$, and the point $A$ is $13$ from the centre. Find the length of the tangent from $A$.`, R`The tangent length is $12$.`, R`The triangle formed by the centre, $A$ and the point of contact has its right angle at the point of contact, so the tangent is $\sqrt{169-25}=12$ long.`],
      [R`The central angle on arc $AB$ is $110^\circ$. How many degrees is the inscribed angle on arc $AB$?`, R`That angle is $55^\circ$.`, R`An inscribed angle is half the central angle on the same arc.`],
    ],
  },
};
