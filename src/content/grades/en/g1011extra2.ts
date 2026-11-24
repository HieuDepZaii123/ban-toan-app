/** Bản tiếng Anh của lớp 10 và 11 chi tiết, phần hai (lop1011extra2.ts). */
import type { LessonEn } from "./types.ts";

const R = String.raw;

export const g10Extra3En: Record<string, LessonEn> = {
  "vi-tri-hai-dt": {
    s: R`Two lines $d_1:\ a_1x+b_1y+c_1=0$ and $d_2:\ a_2x+b_2y+c_2=0$ intersect when $a_1b_2-a_2b_1\ne0$. When $a_1b_2-a_2b_1=0$, the lines are parallel if they have no common point and coincide if a point of one lies on the other.`,
    w: R`Two lines whose normals are not parallel meet in exactly one point. When the normals are parallel, the lines either have no common point or coincide, and a test point tells the two cases apart.`,
    p: R`Concluding parallel just because the determinant is $0$ without checking for coincidence, or comparing the ratios of the three coefficients with a wrong multiplication.`,
    ex: [
      [R`Find the relative position of $d_1:\ x+2y-3=0$ and $d_2:\ 2x+4y-5=0$.`, [
        [R`Compute $a_1b_2-a_2b_1=1\cdot4-2\cdot2=0$, so the lines are parallel or coincide.`, R`A determinant of $0$ means the two normals are parallel.`],
        [R`The point $(3;\ 0)$ lies on $d_1$ but $2\cdot3-5=1\ne0$, so it is not on $d_2$.`, R`Test one point of $d_1$ in $d_2$ to tell parallel from coincident.`],
      ], R`The lines are parallel and do not coincide.`],
      [R`Find the intersection of $d_1:\ x+y-3=0$ and $d_2:\ x-y-1=0$.`, [
        [R`Adding the two equations gives $2x-4=0$, so $x=2$.`, R`Adding side by side eliminates the unknown $y$.`],
        [R`Substituting into $d_1$ gives $y=3-2=1$.`, R`Substitute $x=2$ into one of the equations.`],
      ], R`The intersection is $(2;\ 1)$.`],
    ],
    dr: [
      [R`Find $m$ so that $x+my-1=0$ is parallel to $2x+4y+3=0$.`, R`The required value is $m=2$.`, R`We need $1\cdot4-2\cdot m=0$, so $m=2$, and then the lines do not coincide since $\frac{-1}{3}\ne\frac{1}{2}$.`],
      [R`The lines $2x+y-5=0$ and $x-y-1=0$ meet at $(x_0;\ y_0)$. Compute $x_0+y_0$.`, R`The sum is $3$.`, R`Adding the two equations gives $3x=6$, so $x_0=2$ and $y_0=5-2\cdot2=1$.`],
      [R`What is the relation between the lines $x+2y-3=0$ and $2x+4y-6=0$?`, R`The lines coincide.`, R`The determinant is $0$ and the second equation is twice the first, so the lines coincide.`, [], ["The lines coincide.", "The lines are parallel and do not coincide.", "The lines intersect."]],
    ],
  },
  "goc-hai-dt": {
    s: R`The angle $\varphi$ between two lines with normal vectors $\vec{n_1}$ and $\vec{n_2}$ satisfies $\cos\varphi=\frac{|\vec{n_1}\cdot\vec{n_2}|}{|\vec{n_1}|\,|\vec{n_2}|}$ and $0^\circ\le\varphi\le90^\circ$. Two lines are perpendicular when $\vec{n_1}\cdot\vec{n_2}=0$.`,
    w: R`The angle between two lines equals the angle between their normals or is supplementary to it. Taking the absolute value of the dot product always gives a non-obtuse angle.`,
    p: R`Dropping the absolute value and getting an obtuse angle for two lines, or using the direction vector of one line with the normal of the other.`,
    ex: [
      [R`Find the angle between $x-y=0$ and $y=0$.`, [
        [R`The normals are $(1;\ -1)$ and $(0;\ 1)$, with dot product $-1$.`, R`Take the coefficients of $x$ and $y$ in each equation.`],
        [R`So $\cos\varphi=\frac{|-1|}{\sqrt2\cdot1}=\frac{\sqrt2}{2}$, and $\varphi=45^\circ$.`, R`Use the absolute value because the angle between two lines is at most $90^\circ$.`],
      ], R`The angle between the lines is $45^\circ$.`],
      [R`Find $m$ so that $mx+y-1=0$ is perpendicular to $x+2y+3=0$.`, [
        [R`The normals are $(m;\ 1)$ and $(1;\ 2)$.`, R`Take the coefficients of $x$ and $y$.`],
        [R`We need $m\cdot1+1\cdot2=0$, so $m=-2$.`, R`Two lines are perpendicular when the dot product of the normals is $0$.`],
      ], R`The required value is $m=-2$.`],
    ],
    dr: [
      [R`Find the angle between $x+y=0$ and $x=0$ in degrees.`, R`The angle is $45$ degrees.`, R`The normals $(1;\ 1)$ and $(1;\ 0)$ give $\cos\varphi=\frac{1}{\sqrt2}$, that is $\varphi=45^\circ$.`],
      [R`Find $m$ so that $3x+my+1=0$ is perpendicular to $2x-y+5=0$.`, R`The required value is $m=6$.`, R`We need $3\cdot2+m\cdot(-1)=0$, so $m=6$.`],
      [R`Find the angle between $x-\sqrt3y=0$ and $y=0$ in degrees.`, R`The angle is $30$ degrees.`, R`The normal $(1;\ -\sqrt3)$ has length $2$ and $(0;\ 1)$ has length $1$, so $\cos\varphi=\frac{\sqrt3}{2}$ and $\varphi=30^\circ$.`],
    ],
  },
  "kc-hai-song-song": {
    s: R`Two parallel lines $ax+by+c_1=0$ and $ax+by+c_2=0$ are at distance $\frac{|c_1-c_2|}{\sqrt{a^2+b^2}}$. Another way is to take a point on one line and compute its distance to the other.`,
    w: R`The distance between two parallel lines equals the distance from any point of one line to the other. When $a$ and $b$ are the same, this reduces to the difference of the two constants divided by the length of the normal.`,
    p: R`Using the formula when the two equations do not yet have the same coefficients $a$ and $b$, for example $x+y-2=0$ and $2x+2y+3=0$. One must first bring them to the same coefficients.`,
    ex: [
      [R`Find the distance between $3x+4y-5=0$ and $3x+4y+10=0$.`, [
        [R`The two lines have the same coefficients $a=3$, $b=4$ and $c_1=-5$, $c_2=10$.`, R`The condition for the formula is that the two equations have the same normal.`],
        [R`The distance is $\frac{|10-(-5)|}{\sqrt{9+16}}=\frac{15}{5}=3$.`, R`Substitute the coefficients $a$, $b$, $c_1$, $c_2$ into the distance formula.`],
      ], R`The distance is $3$.`],
      [R`Find the lines parallel to $x+y-1=0$ at distance $\sqrt2$ from it.`, [
        [R`The required line has the form $x+y+c=0$ with $\frac{|c+1|}{\sqrt2}=\sqrt2$.`, R`Use the formula for the distance between parallel lines.`],
        [R`Hence $|c+1|=2$, so $c=1$ or $c=-3$.`, R`Remove the absolute value in two cases.`],
      ], R`There are two lines, $x+y+1=0$ and $x+y-3=0$.`],
    ],
    dr: [
      [R`Find the distance between $x+y-2=0$ and $x+y+4=0$.`, R`The distance is $3\sqrt2$.`, R`We have $\frac{|4-(-2)|}{\sqrt2}=\frac{6}{\sqrt2}=3\sqrt2$.`],
      [R`The lines $2x-y+1=0$ and $2x-y+m=0$ are at distance $\sqrt5$. Find the positive value of $m$.`, R`The required value is $m=6$.`, R`We need $\frac{|m-1|}{\sqrt5}=\sqrt5$, that is $|m-1|=5$, so $m=6$ or $m=-4$; take the positive value.`],
      [R`Find the distance from the origin $O$ to the line through $A(3;\ 0)$ and $B(0;\ 4)$.`, R`The distance is $\frac{12}{5}$.`, R`The line $AB$ is $4x+3y-12=0$, so the distance from $O$ is $\frac{12}{\sqrt{16+9}}=\frac{12}{5}$.`],
    ],
  },
  "lap-pt-dt": {
    s: R`The line through $M(x_0;\ y_0)$ with normal vector $(a;\ b)$ is $a(x-x_0)+b(y-y_0)=0$. A line parallel to $ax+by+c=0$ has the form $ax+by+c'=0$, and a perpendicular line has the form $bx-ay+c'=0$.`,
    w: R`A parallel line keeps the same normal, so only the constant is unknown and one point is enough to find it. A perpendicular line uses the direction vector of the other line as its normal.`,
    p: R`Confusing the normal with the direction vector when writing a perpendicular line, or forgetting to change the sign of the constant when passing from $a(x-x_0)+b(y-y_0)=0$ to $ax+by+c=0$.`,
    ex: [
      [R`Write the line through $A(1;\ 2)$ parallel to $2x-y+3=0$.`, [
        [R`The required line has the form $2x-y+c'=0$.`, R`Parallel lines have the same normal.`],
        [R`The point $A$ lies on it, so $2\cdot1-2+c'=0$, that is $c'=0$.`, R`Substitute the coordinates of $A$ to find the constant.`],
      ], R`The required line is $2x-y=0$.`],
      [R`Write the line through $A(1;\ 2)$ perpendicular to $x+3y-1=0$.`, [
        [R`The normal of the required line is the direction vector of the given line, that is $(3;\ -1)$.`, R`The direction vector of $x+3y-1=0$ is $(3;\ -1)$ because it is perpendicular to the normal $(1;\ 3)$.`],
        [R`The equation is $3(x-1)-(y-2)=0$, that is $3x-y-1=0$.`, R`Use the formula for a line through a point with a known normal.`],
      ], R`The required line is $3x-y-1=0$.`],
    ],
    dr: [
      [R`The line through $B(2;\ 3)$ parallel to $3x+y-1=0$ has the form $3x+y+c=0$. Find $c$.`, R`The required value is $c=-9$.`, R`The point $B$ lies on it, so $3\cdot2+3+c=0$, that is $c=-9$.`],
      [R`The perpendicular bisector of $A(0;\ 0)$ and $B(2;\ 4)$ has the form $x+2y+c=0$. Find $c$.`, R`The required value is $c=-5$.`, R`The line passes through the midpoint $M(1;\ 2)$, so $1+2\cdot2+c=0$, that is $c=-5$.`],
      [R`The line through $C(1;\ 1)$ perpendicular to $x-2y+3=0$ has the form $2x+y+c=0$. Find $c$.`, R`The required value is $c=-3$.`, R`The point $C$ lies on it, so $2\cdot1+1+c=0$, that is $c=-3$.`],
    ],
  },
  "so-trung-binh": {
    s: R`For values $x_1;\ x_2;\ \dots$ with frequencies $n_1;\ n_2;\ \dots$ and sample size $n$, the mean is $\bar x=\frac{n_1x_1+n_2x_2+\cdots}{n}$. Adding or removing a value changes the mean according to the new total and the new sample size.`,
    w: R`The mean is the total divided by the sample size, and each repeated value counts by its frequency. Knowing the mean and the sample size gives the total, and then the value added or removed can be found.`,
    p: R`Dividing by the number of different values instead of the sample size, or using the old sample size to compute the new mean after adding a value.`,
    ex: [
      [R`The values $1;\ 2;\ 3$ have frequencies $2;\ 5;\ 3$. Find the mean.`, [
        [R`The sample size is $n=2+5+3=10$.`, R`The sample size equals the sum of all the frequencies.`],
        [R`The mean is $\frac{1\cdot2+2\cdot5+3\cdot3}{10}=\frac{21}{10}$.`, R`Multiply each value by its frequency and divide by the sample size.`],
      ], R`The mean is $\frac{21}{10}$.`],
      [R`The sample $4;\ 6;\ 8$ has mean $6$. One more number is added so that the new mean is $7$. What is that number?`, [
        [R`The original total is $3\cdot6=18$ and the new total must be $4\cdot7=28$.`, R`The total equals the mean times the sample size.`],
        [R`The added number is $28-18=10$.`, R`The difference of the two totals is exactly the added value.`],
      ], R`The number to add is $10$.`],
    ],
    dr: [
      [R`Find the mean of the sample $5;\ 7;\ 9;\ 11$.`, R`The mean is $8$.`, R`The total is $32$ and the sample size is $4$, so the mean is $8$.`],
      [R`The values $1;\ 2;\ 3$ have frequencies $1;\ 1;\ 2$. Find the mean.`, R`The mean is $\frac{9}{4}$.`, R`The total is $1+2+6=9$ and the sample size is $4$.`],
      [R`Five numbers have mean $8$. If the number $14$ is added, what is the new mean?`, R`The new mean is $9$.`, R`The old total is $40$, the new total is $54$ and the new sample size is $6$, so the mean is $9$.`],
    ],
  },
  "so-ngoai-le": {
    s: R`A value is an outlier if it is below $Q_1-1.5\Delta_Q$ or above $Q_3+1.5\Delta_Q$, where $\Delta_Q=Q_3-Q_1$ is the interquartile range. An outlier may come from a data-entry mistake or be a genuinely unusual case, so it should be examined and not discarded automatically.`,
    w: R`The interquartile range contains the middle half of the data, so values lying more than one and a half of that width away are unusual compared with most of the sample. We use quartiles because they are barely affected by the extreme values themselves.`,
    p: R`Computing the fences with the standard deviation instead of the interquartile range, or assuming that an outlier is always wrong data that can be dropped at once.`,
    ex: [
      [R`Does the sample $2;\ 4;\ 5;\ 6;\ 7;\ 8;\ 30$ have an outlier?`, [
        [R`We have $Q_1=4$ and $Q_3=8$, so $\Delta_Q=4$.`, R`The median is $6$; then take the median of the lower half $2;\ 4;\ 5$ and of the upper half $7;\ 8;\ 30$.`],
        [R`The upper fence is $8+1.5\cdot4=14$, and $30>14$, so $30$ is an outlier.`, R`Compare each extreme value with the two fences.`],
      ], R`The value $30$ is an outlier.`],
      [R`Does the sample $3;\ 5;\ 6;\ 7;\ 9$ have an outlier?`, [
        [R`We have $Q_1=\frac{3+5}{2}=4$, $Q_3=\frac{7+9}{2}=8$ and $\Delta_Q=4$.`, R`Leave out the median $6$ and take the median of each half.`],
        [R`The lower fence is $4-1.5\cdot4=-2$ and the upper fence is $14$, so every value lies between the fences.`, R`The smallest value $3>-2$ and the largest $9<14$.`],
      ], R`The sample has no outlier.`],
    ],
    dr: [
      [R`A sample has $Q_1=10$ and $Q_3=20$. What is the upper fence for outliers?`, R`The upper fence is $35$.`, R`The interquartile range is $10$, so the upper fence is $20+1.5\cdot10=35$.`],
      [R`A sample has $Q_1=10$ and $Q_3=20$. What is the lower fence for outliers?`, R`The lower fence is $-5$.`, R`The lower fence is $10-1.5\cdot10=-5$.`],
      [R`With $Q_1=10$ and $Q_3=20$, is the value $40$ an outlier?`, R`Yes, because $40$ is above the upper fence $35$.`, R`The upper fence is $35$ and $40>35$, so $40$ is an outlier.`, [], ["Yes, because it is above the upper fence.", "No, because it is below the upper fence."]],
    ],
  },
};

export const g11Extra3En: Record<string, LessonEn> = {
  "phep-chieu-ss": {
    s: R`Parallel projection sends lines to lines, preserves parallelism, and preserves the ratio of lengths of segments on the same line or on parallel lines. It does not preserve lengths, angles or perpendicularity.`,
    w: R`Parallel projection sends parallel lines to parallel lines and keeps ratios on each line, so it keeps midpoints. It does not keep lengths or angles because the projecting lines are slanted relative to the plane.`,
    p: R`Believing that the projection of a right angle is still a right angle, or that equal segments on non-parallel lines stay equal. Only ratios on the same line or on parallel lines are preserved.`,
    ex: [
      [R`The points $M$, $N$, $P$ are collinear with $MN:NP=1:3$. Their projections $M'$, $N'$, $P'$ have $M'N'=2$. Find $N'P'$.`, [
        [R`The projection keeps ratios, so $M'N':N'P'=1:3$.`, R`The three points lie on one line.`],
        [R`Hence $N'P'=3\cdot M'N'=6$.`, R`From the ratio $1:3$, $N'P'$ is $3$ times $M'N'=2$.`],
      ], R`The length $N'P'$ is $6$.`],
      [R`The quadrilateral $ABCD$ is a parallelogram with $AB=4$ and $BC=3$. Its projection $A'B'C'D'$ has $A'B'=2$. Find $C'D'$ and $A'B':C'D'$.`, [
        [R`Since $AB$ and $CD$ are parallel and equal, they project to two parallel segments with the same ratio.`, R`Projection preserves ratios on parallel lines.`],
        [R`Hence $C'D'=A'B'=2$ and the ratio $A'B':C'D'=1$.`, R`Two segments that were equal remain equal after projection.`],
      ], R`The length $C'D'$ is $2$ and the projection is still a parallelogram.`],
    ],
    dr: [
      [R`The points $M$, $N$, $P$ are collinear with $MN:NP=2:5$ and the projection has $M'N'=4$. Find $N'P'$.`, R`The length is $10$.`, R`The ratio $M'N':N'P'=2:5$ gives $N'P'=4\cdot\frac{5}{2}=10$.`],
      [R`Does parallel projection always preserve the lengths of segments?`, R`No, it only preserves ratios on the same line or on parallel lines.`, R`For example two segments $MN=1$ and $NP=3$ can project to segments $2$ and $6$, so lengths change but the ratio stays $1:3$.`, [], ["Yes, it always preserves lengths.", "No, it only preserves ratios on the same line or on parallel lines."]],
      [R`The point $M$ is the midpoint of $AB$ and the projection has $A'B'=10$. Find $A'M'$.`, R`The length is $5$.`, R`Projection keeps midpoints, so $M'$ is the midpoint of $A'B'$ and $A'M'=\frac{10}{2}=5$.`],
    ],
  },
  "hinh-hop-11": {
    s: R`A rectangular box with dimensions $a$, $b$, $c$ has diagonal $\sqrt{a^2+b^2+c^2}$, volume $abc$ and total surface area $2(ab+bc+ca)$. A cube with edge $a$ has diagonal $a\sqrt3$.`,
    w: R`The diagonal of the base and the height are the two legs of a right triangle whose hypotenuse is the diagonal of the box. Applying Pythagoras twice gives the formula $\sqrt{a^2+b^2+c^2}$.`,
    p: R`Using the cube formula $a\sqrt3$ for a box with unequal dimensions, or leaving out the factor $2$ in the total surface area.`,
    ex: [
      [R`Find the diagonal of a rectangular box with dimensions $3$, $4$, $12$.`, [
        [R`The diagonal of the base is $\sqrt{3^2+4^2}=5$.`, R`Apply Pythagoras to the base.`],
        [R`The diagonal of the box is $\sqrt{5^2+12^2}=13$.`, R`A right triangle whose legs are the base diagonal and the height.`],
      ], R`The diagonal is $13$.`],
      [R`A cube has diagonal $6\sqrt3$. Find its edge.`, [
        [R`The diagonal of a cube is $a\sqrt3$.`, R`All three dimensions equal $a$, so $\sqrt{a^2+a^2+a^2}=a\sqrt3$.`],
        [R`From $a\sqrt3=6\sqrt3$ we get $a=6$.`, R`Divide both sides by $\sqrt3$.`],
      ], R`The edge of the cube is $6$.`],
    ],
    dr: [
      [R`Find the diagonal of a rectangular box with dimensions $2$, $3$, $6$.`, R`The diagonal is $7$.`, R`We have $\sqrt{4+9+36}=\sqrt{49}=7$.`],
      [R`A rectangular box has a square base with side $3$ and diagonal $\sqrt{34}$. Find its height.`, R`The height is $4$.`, R`We need $9+9+c^2=34$, so $c^2=16$ and $c=4$.`],
      [R`Find the total surface area of a rectangular box with dimensions $2$, $3$, $4$.`, R`The total surface area is $52$.`, R`We have $2\cdot(6+12+8)=52$.`],
    ],
  },
};
