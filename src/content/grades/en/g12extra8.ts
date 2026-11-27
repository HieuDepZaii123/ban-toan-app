/** Bản tiếng Anh của lớp 12 chi tiết, phần tám: Oxyz tổng hợp (lop12extra8.ts). */
import type { LessonEn } from "./types.ts";

const R = String.raw;

export const g12Extra8En: Record<string, LessonEn> = {
  "mp-cuc-tri-oxyz": {
    s: R`Given a plane $(P)$ and two points $A$, $B$. If $A$, $B$ lie on the same side of $(P)$, then $MA+MB$ with $M\in(P)$ is smallest when $M$ is the intersection of $A'B$ with $(P)$, where $A'$ is the reflection of $A$ in $(P)$, and the minimum is $A'B$. If $A$, $B$ lie on opposite sides, then $M$ is the intersection of $AB$ with $(P)$ and the minimum is $AB$. The two points are on the same side when the two values substituted into the left side of the plane equation have the same sign.`,
    w: R`Reflection in a plane keeps the distance to every point of the plane, so one point is replaced by its mirror image to turn two points on the same side into two points on opposite sides, and then the triangle inequality applies.`,
    p: R`Taking the intersection of $AB$ with the plane when the points are on the same side, or forgetting to check the signs to decide whether the points are on the same side or on opposite sides.`,
    ex: [
      [R`Let $(P):\ z=0$, $A(1;\ 2;\ 3)$ and $B(3;\ 0;\ 1)$. Find $M\in(P)$ so that $MA+MB$ is smallest and compute that minimum.`, [
        [R`Both points have $z>0$ so they lie on the same side of $(P)$, and the reflection of $A$ is $A'(1;\ 2;\ -3)$.`, R`The points are on the same side, so we reflect one point to get two points on opposite sides.`],
        [R`The minimum is $A'B=\sqrt{4+4+16}=2\sqrt6$.`, R`For any $M$ on $(P)$ we have $MA'=MA$, and $MA'+MB\ge A'B$ by the triangle inequality.`],
        [R`The line $A'B$ is $(1+2t;\ 2-2t;\ -3+4t)$; $z=0$ gives $t=\frac34$ so $M=\left(\frac52;\ \frac12;\ 0\right)$.`, R`Equality holds when $M$ lies on the segment $A'B$, that is at its intersection with the plane.`],
      ], R`The minimum is $2\sqrt6$, attained at $M\left(\frac52;\ \frac12;\ 0\right)$.`],
      [R`Let $d:\ x=1+t;\ y=2;\ z=3-t$ and $(P):\ z=0$. Find $M\in d$ at distance $2$ from $(P)$.`, [
        [R`The distance from $M$ to $(P)$ is $\left|3-t\right|$, so we need $\left|3-t\right|=2$.`, R`For the plane $z=0$ the distance is the absolute value of the height.`],
        [R`Hence $t=1$ or $t=5$, giving $M(2;\ 2;\ 2)$ or $M(6;\ 2;\ -2)$.`, R`The absolute value equation gives two solutions, and both work because $d$ meets $(P)$.`],
      ], R`There are two points $M(2;\ 2;\ 2)$ and $M(6;\ 2;\ -2)$.`],
    ],
    dr: [
      [R`Let $(P):\ z=0$, $A(0;\ 0;\ 1)$ and $B(0;\ 3;\ 3)$. Find the minimum of $MA+MB$ for $M\in(P)$.`, R`The minimum equals $5$.`, R`The points are on the same side, $A'(0;\ 0;\ -1)$ and $A'B=\sqrt{0+9+16}=5$.`],
      [R`The point $M$ of the line $d:\ x=t;\ y=0;\ z=2t$ is at distance $4$ from $(P):\ z=0$. Find the positive value of $t$.`, R`The required value is $t=2$.`, R`The distance is $\left|2t\right|=4$, so $t=2$ for the positive value.`],
      [R`Let $(P):\ z=0$, $A(0;\ 0;\ 1)$ and $B(0;\ 0;\ -1)$ on opposite sides of $(P)$. What is the minimum of $MA+MB$ and when is it attained?`, R`The minimum equals $2$, attained when $M$ is the intersection of $AB$ with $(P)$.`, R`The points are on opposite sides so $MA+MB\ge AB=2$, with equality when $M$ lies on the segment $AB$.`, [], [R`Equal to $2$, attained when $M$ is the intersection of $AB$ with $(P)$.`, R`Equal to $0$.`, R`Equal to $\sqrt2$.`]],
    ],
  },
  "tong-hop-oxyz": {
    s: R`A multi-step Oxyz problem often combines: writing a plane from three points with the cross product, computing the volume of a tetrahedron $\frac{1}{6}\left|\left[\overrightarrow{OA},\overrightarrow{OB}\right]\cdot\overrightarrow{OC}\right|$, the area of a triangle $\frac12\left|\left[\overrightarrow{AB},\overrightarrow{AC}\right]\right|$ and the distance $h=\frac{3V}{S}$, and then building a perpendicular line to find a projection. Two ways to compute the same quantity check each other.`,
    w: R`Each quantity in the problem has at least two independent ways of being computed, so when they agree we can trust both; when they differ, some step is wrong and needs rechecking.`,
    p: R`Forgetting to divide by $6$ for the volume of a tetrahedron, or forgetting to halve the length of the cross product for the area of a triangle.`,
    ex: [
      [R`Let $A(1;\ 0;\ 0)$, $B(0;\ 2;\ 0)$, $C(0;\ 0;\ 3)$. Write the plane $(ABC)$, compute the volume of $OABC$, the area of triangle $ABC$ and the distance from $O$ to $(ABC)$.`, [
        [R`We have $\overrightarrow{AB}=(-1;\ 2;\ 0)$, $\overrightarrow{AC}=(-1;\ 0;\ 3)$ and $\left[\overrightarrow{AB},\overrightarrow{AC}\right]=(6;\ 3;\ 2)$, so $(ABC):\ 6x+3y+2z-6=0$.`, R`The normal is the cross product, and we substitute the point $A$ to find the constant.`],
        [R`The volume is $V=\frac{1\cdot2\cdot3}{6}=1$ and the area is $S=\frac12\sqrt{36+9+4}=\frac72$.`, R`The tetrahedron $OABC$ has a right angle at $O$, so its volume is one sixth of the product of three edges.`],
        [R`The distance is $h=\frac{3V}{S}=\frac{3}{\frac72}=\frac67$, which matches $\frac{6}{\sqrt{36+9+4}}=\frac67$.`, R`Two independent computations give the same result, so we can trust both.`],
      ], R`The plane is $6x+3y+2z-6=0$, the volume is $1$, the area is $\frac72$ and the distance is $\frac67$.`],
      [R`Find the projection $H$ of $O$ onto the plane $(ABC):\ 6x+3y+2z-6=0$ from the previous example.`, [
        [R`The line through $O$ perpendicular to $(ABC)$ is $x=6t,\ y=3t,\ z=2t$.`, R`Its direction vector is the normal $(6;\ 3;\ 2)$.`],
        [R`Substituting into the plane: $36t+9t+4t-6=0$, so $t=\frac{6}{49}$.`, R`The value of $t$ that makes the plane equation $0$ gives the intersection.`],
        [R`So $H=\left(\frac{36}{49};\ \frac{18}{49};\ \frac{12}{49}\right)$ and $OH=\frac{6}{49}\cdot7=\frac67$.`, R`The length $OH$ matches the distance computed in the previous example.`],
      ], R`The projection is $H\left(\frac{36}{49};\ \frac{18}{49};\ \frac{12}{49}\right)$.`],
    ],
    dr: [
      [R`Compute the volume of the tetrahedron $OABC$ with $A(2;\ 0;\ 0)$, $B(0;\ 3;\ 0)$, $C(0;\ 0;\ 4)$.`, R`The volume equals $4$.`, R`The tetrahedron has a right angle at $O$, so $V=\frac{2\cdot3\cdot4}{6}=4$.`],
      [R`Compute the distance from $O$ to the plane $6x+3y+2z-12=0$.`, R`The distance equals $\frac{12}{7}$.`, R`We have $\frac{|-12|}{\sqrt{36+9+4}}=\frac{12}{7}$.`],
      [R`The line through $O$ perpendicular to $6x+3y+2z-12=0$ has equations $x=6t,\ y=3t,\ z=2t$. Find $t$ for the projection of $O$.`, R`The required value is $t=\frac{12}{49}$.`, R`Substituting gives $49t-12=0$, so $t=\frac{12}{49}$.`],
    ],
  },
};
