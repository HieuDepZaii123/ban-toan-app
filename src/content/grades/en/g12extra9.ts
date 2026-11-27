/** Bản tiếng Anh của lớp 12 chi tiết, phần chín: khoảng cách trong Oxyz và cực trị của hiệu (lop12extra9.ts). */
import type { LessonEn } from "./types.ts";

const R = String.raw;

export const g12Extra9En: Record<string, LessonEn> = {
  "kc-diem-oxyz": {
    s: R`The distance from $M(x_0;\ y_0;\ z_0)$ to the plane $(P):\ Ax+By+Cz+D=0$ is $\frac{\left|Ax_0+By_0+Cz_0+D\right|}{\sqrt{A^2+B^2+C^2}}$. The distance between two parallel planes equals the distance from any point of one plane to the other, and when they have the same normal it equals $\frac{\left|D_1-D_2\right|}{\sqrt{A^2+B^2+C^2}}$. The distance from $M$ to the line through $A$ with direction vector $\vec u$ is $\frac{\left|\left[\overrightarrow{AM},\vec u\right]\right|}{\left|\vec u\right|}$.`,
    w: R`The distance from a point to a plane is the length of the perpendicular segment, so we divide the value of the left side by the length of the normal; for a line, the cross product gives the area of a parallelogram, so dividing by the base gives the height.`,
    p: R`Forgetting the absolute value in the numerator, or using the formula for two parallel planes before both equations have the same coefficients, that is before writing them in the same form.`,
    ex: [
      [R`Find the distance from $M(1;\ 2;\ 3)$ to $(P):\ 2x-y+2z-4=0$.`, [
        [R`The value of the left side at $M$ is $2-2+6-4=2$.`, R`Substitute the coordinates of the point into the left side of the plane equation.`],
        [R`The denominator is $\sqrt{4+1+4}=3$, so the distance is $\frac23$.`, R`The denominator is the length of the normal vector.`],
      ], R`The distance is $\frac23$.`],
      [R`Find the distance from $M(1;\ 2;\ 3)$ to the line $\Delta$ through $A(1;\ 0;\ 0)$ with direction vector $\vec u=(0;\ 1;\ 1)$.`, [
        [R`We have $\overrightarrow{AM}=(0;\ 2;\ 3)$ and $\left[\vec u,\overrightarrow{AM}\right]=(1;\ 0;\ 0)$.`, R`The cross product gives the area of the parallelogram built on the two vectors.`],
        [R`The distance is $\frac{1}{\sqrt2}=\frac{\sqrt2}{2}$.`, R`Divide the area of the parallelogram by the base length $\left|\vec u\right|$ to get the height.`],
      ], R`The distance equals $\frac{\sqrt2}{2}$.`],
    ],
    dr: [
      [R`Find the distance from the origin $O$ to the plane $2x-2y+z-6=0$.`, R`The distance equals $2$.`, R`We have $\frac{\left|-6\right|}{\sqrt{4+4+1}}=\frac63=2$.`],
      [R`Find the distance between the planes $2x+2y-z+3=0$ and $2x+2y-z-6=0$.`, R`The distance equals $3$.`, R`The planes have the same normal, so the distance is $\frac{\left|3+6\right|}{3}=3$.`],
      [R`Let $(P):\ x+2y+2z-6=0$. Decide whether each statement is true or false.`, R`Statements a, b and d are true, statement c is false.`, R`The distance from $O$ is $\frac63=2$, from $M(1;\ 1;\ 1)$ it is $\frac{1}{3}$, between the two parallel planes it is $\frac{\left|-6-3\right|}{3}=3$ and not $1$, and the new constant $D'$ satisfies $\left|D'+6\right|=9$, which has exactly two values.`, [], [R`The distance from the origin $O$ to $(P)$ equals $2$.`, R`The distance from $M(1;\ 1;\ 1)$ to $(P)$ equals $\frac13$.`, R`The distance between $(P)$ and $(Q):\ x+2y+2z+3=0$ equals $1$.`, R`There are exactly two planes parallel to $(P)$ at distance $3$ from $(P)$.`]],
    ],
  },
  "cuc-tri-hieu-oxyz": {
    s: R`For $M\in(P)$ and two points $A$, $B$ on the same side of $(P)$, we have $\left|MA-MB\right|\le AB$, with equality when $M$ is the intersection of the line $AB$ with $(P)$. If $A$, $B$ lie on opposite sides, reflect one point in $(P)$ to reduce to the same-side case. The least distance from a point $A$ to a point $M$ moving on a line $d$ is attained at the orthogonal projection of $A$ onto $d$, that is when $\overrightarrow{AM}\cdot\vec u=0$.`,
    w: R`The difference of two sides of a triangle does not exceed the third side, so $\left|MA-MB\right|\le AB$; equality holds only when the three points are collinear. The least distance to a line is the perpendicular segment.`,
    p: R`Using the intersection of $AB$ with the plane, which gives the minimum of the sum, as the maximum of the difference, or forgetting to reflect when the points are on opposite sides.`,
    ex: [
      [R`Let $(P):\ z=0$, $A(1;\ 2;\ 3)$ and $B(3;\ 0;\ 1)$. Find the maximum of $\left|MA-MB\right|$ for $M\in(P)$ and the corresponding point $M$.`, [
        [R`Both points have $z>0$ so they are on the same side of $(P)$, hence $\left|MA-MB\right|\le AB=\sqrt{4+4+4}=2\sqrt3$.`, R`The triangle inequality says that the difference of two sides does not exceed the third side.`],
        [R`The line $AB$ is $(1+2t;\ 2-2t;\ 3-2t)$; $z=0$ gives $t=\frac32$, so $M=(4;\ -1;\ 0)$.`, R`Equality holds when $A$, $B$, $M$ are collinear with $M$ outside the segment $AB$.`],
      ], R`The maximum is $2\sqrt3$, attained at $M(4;\ -1;\ 0)$.`],
      [R`Find the point $M$ on $d:\ x=t,\ y=1+t,\ z=2t$ closest to $A(1;\ 0;\ 0)$ and the least value of $MA$.`, [
        [R`For $M(t;\ 1+t;\ 2t)$ we have $\overrightarrow{AM}=(t-1;\ 1+t;\ 2t)$ and $\vec u=(1;\ 1;\ 2)$.`, R`Express $M$ with the parameter of the line.`],
        [R`The condition $\overrightarrow{AM}\cdot\vec u=0$ gives $6t=0$, so $t=0$ and $M(0;\ 1;\ 0)$.`, R`The closest point is the foot of the perpendicular from $A$ to $d$.`],
        [R`The least distance is $MA=\sqrt{1+1+0}=\sqrt2$.`, R`Compute the length of $\overrightarrow{AM}=(-1;\ 1;\ 0)$ at $t=0$.`],
      ], R`The closest point is $M(0;\ 1;\ 0)$ and $MA=\sqrt2$.`],
    ],
    dr: [
      [R`Let $(P):\ z=0$ and let $A(0;\ 0;\ 1)$ and $B(0;\ 4;\ 4)$ lie on the same side of $(P)$. Find the maximum of $\left|MA-MB\right|$ for $M\in(P)$.`, R`The maximum equals $5$.`, R`We have $\left|MA-MB\right|\le AB=\sqrt{0+16+9}=5$, and equality is attained.`],
      [R`Find the least distance from the origin $O$ to a point of the line through $P_0(3;\ 0;\ 0)$ with direction vector $(0;\ 3;\ 4)$.`, R`The least distance equals $3$.`, R`Since $\overrightarrow{OP_0}\cdot\vec u=0$, the point $P_0$ is the foot of the perpendicular and the distance equals $OP_0=3$.`],
      [R`Let $(P):\ z=0$ and let $A(0;\ 0;\ 1)$, $B(0;\ 3;\ -2)$ lie on opposite sides of $(P)$. To find the maximum of $\left|MA-MB\right|$, what should we do first?`, R`Reflect one point in $(P)$ to reduce to the case of two points on the same side.`, R`For points on opposite sides, the intersection of $AB$ with $(P)$ gives a small difference and not the maximum, so we reflect a point first and take $A'B=\sqrt{10}$.`, [], [R`Reflect one point in $(P)$ and then use the triangle inequality.`, R`Take the intersection of $AB$ with $(P)$.`, R`Conclude that there is no maximum.`]],
    ],
  },
};
