/** Bản tiếng Anh của lớp 12 chi tiết, phần sáu: phương trình đường thẳng, đoạn thẳng và mặt phẳng trong Oxyz (lop12extra6.ts). */
import type { LessonEn } from "./types.ts";

const R = String.raw;

export const g12Extra6En: Record<string, LessonEn> = {
  "pt-dt-oxyz": {
    s: R`The line through $M_0(x_0;\ y_0;\ z_0)$ with direction vector $\vec u=(a;\ b;\ c)$ has parametric equations $x=x_0+at$, $y=y_0+bt$, $z=z_0+ct$ and, when $a$, $b$, $c$ are different from $0$, canonical equation $\frac{x-x_0}{a}=\frac{y-y_0}{b}=\frac{z-z_0}{c}$. The line through two points $A$ and $B$ has $\overrightarrow{AB}$ as a direction vector. A point lies on the line when one value of $t$ gives all three coordinates.`,
    w: R`Every point of the line is the starting point plus $t$ times the direction vector, so each value of $t$ gives exactly one point. A point lies on the line when the same value of $t$ satisfies all three coordinates.`,
    p: R`Finding $t$ from one coordinate without checking the other two, or using the coordinates of a point as the direction vector.`,
    ex: [
      [R`Write the parametric equations of the line $d$ through $A(1;\ 2;\ 3)$ with direction vector $\vec u=(2;\ -1;\ 4)$. Does $M(3;\ 1;\ 7)$ lie on $d$?`, [
        [R`The parametric equations are $x=1+2t$, $y=2-t$, $z=3+4t$.`, R`Substitute $x_0=1$, $y_0=2$, $z_0=3$ and $a=2$, $b=-1$, $c=4$.`],
        [R`From $x=3$ we get $t=1$; then $y=2-1=1$ and $z=3+4=7$, which matches $M$.`, R`A point is on the line when one value of $t$ gives all three coordinates.`],
      ], R`Yes, $M$ lies on $d$ for $t=1$.`],
      [R`Write the parametric equations of the line through $A(1;\ 0;\ 2)$ and $B(3;\ 2;\ -2)$.`, [
        [R`A direction vector is $\overrightarrow{AB}=(2;\ 2;\ -4)$.`, R`Subtract the starting point from the end point.`],
        [R`The equations are $x=1+2t$, $y=2t$, $z=2-4t$.`, R`Use $A$ as the point on the line.`],
      ], R`The line has equations $x=1+2t$, $y=2t$, $z=2-4t$.`],
    ],
    dr: [
      [R`The line $d:\ x=1+t,\ y=-2t,\ z=3+t$. What is the ordinate of the point of $d$ whose abscissa is $4$?`, R`The ordinate is $-6$.`, R`From $1+t=4$ we get $t=3$, so $y=-2\cdot3=-6$.`],
      [R`The line $d:\ x=1+2t,\ y=3-t,\ z=-2+t$. Find $m$ so that $A(5;\ m;\ 0)$ lies on $d$.`, R`The required value is $m=1$.`, R`From $1+2t=5$ we get $t=2$, then $z=-2+2=0$ matches and $y=3-2=1$.`],
      [R`The line through $A(1;\ 2;\ 3)$ and $B(4;\ 2;\ 1)$ has parametric equation $z=3+ct$. Find $c$.`, R`The coefficient is $c=-2$.`, R`The direction vector $\overrightarrow{AB}=(3;\ 0;\ -2)$ gives $c=1-3=-2$.`],
    ],
  },
  "doan-thang-oxyz": {
    s: R`The segment $AB$ consists of the points $M=A+t\overrightarrow{AB}$ with $0\le t\le1$, that is $x=x_A+t(x_B-x_A)$ and similarly for $y$, $z$. Then $AM=t\cdot AB$, $t=\frac12$ gives the midpoint, and $AM:MB=t:(1-t)$. The line $AB$ meets a plane at the value of $t$ we find, and if $AB$ is parallel to the plane then no value or every value works; the segment $AB$ meets the plane when that value lies in $[0;\ 1]$.`,
    w: R`For $0\le t\le1$ the point $A+t\overrightarrow{AB}$ runs from $A$ to $B$, so $t$ is exactly the ratio $AM:AB$. An intersection point lies on the segment only when $t$ is in $[0;\ 1]$.`,
    p: R`Concluding that the segment meets a plane just because the line does, without checking that $t$ lies in $[0;\ 1]$.`,
    ex: [
      [R`Let $A(1;\ 2;\ 3)$ and $B(5;\ 6;\ 7)$. Find the midpoint of $AB$ and the point $N$ on $AB$ with $AN=\frac34AB$.`, [
        [R`The midpoint has $t=\frac12$: $\left(1+\frac12\cdot4;\ 2+\frac12\cdot4;\ 3+\frac12\cdot4\right)=(3;\ 4;\ 5)$.`, R`Substitute $t=\frac12$ into the segment equations with $\overrightarrow{AB}=(4;\ 4;\ 4)$.`],
        [R`The point $N$ has $t=\frac34$: $(1+3;\ 2+3;\ 3+3)=(4;\ 5;\ 6)$.`, R`Since the length $AN=t\cdot AB$, we take $t=\frac34$.`],
      ], R`The midpoint is $(3;\ 4;\ 5)$ and $N=(4;\ 5;\ 6)$.`],
      [R`Does the segment $AB$ with $A(1;\ 1;\ 2)$, $B(3;\ -1;\ -2)$ meet the plane $z=0$? If so, find the intersection.`, [
        [R`The segment equations give $z=2-4t$; $z=0$ when $t=\frac12$.`, R`Substitute into the plane equation $z=0$.`],
        [R`Since $\frac12\in[0;\ 1]$ the segment meets the plane, at $(2;\ 0;\ 0)$.`, R`Substitute $t=\frac12$ into $x=1+2t$ and $y=1-2t$.`],
      ], R`Yes, the intersection is $(2;\ 0;\ 0)$.`],
    ],
    dr: [
      [R`Let $A(0;\ 0;\ 0)$ and $B(6;\ 3;\ 9)$. The point $M$ on $AB$ has $AM=\frac13AB$. Find the third coordinate of $M$.`, R`The third coordinate is $3$.`, R`The point $M$ has $t=\frac13$, so $z=\frac13\cdot9=3$.`],
      [R`The point $M$ lies on segment $AB$, where $A$ has abscissa $2$ and $B$ has abscissa $10$, and $AM=\frac14AB$. Find the abscissa of $M$.`, R`The abscissa is $4$.`, R`The abscissa is $2+\frac14\cdot(10-2)=4$.`],
      [R`Does the segment $AB$ with $A(1;\ 1;\ 2)$ and $B(3;\ 1;\ 4)$ meet the plane $z=0$?`, R`No, because the intersection has $t=-1$, outside $[0;\ 1]$.`, R`The segment equations give $z=2+2t=0$, so $t=-1$, which is not in $[0;\ 1]$; the line $AB$ meets the plane but the segment does not.`, [], ["Yes, because the line $AB$ meets the plane.", "No, because the intersection has $t=-1$, outside the segment.", "Not enough information."]],
    ],
  },
  "pt-mp-dang": {
    s: R`The plane through $M(x_0;\ y_0;\ z_0)$ with normal $\vec n=(A;\ B;\ C)$ is $A(x-x_0)+B(y-y_0)+C(z-z_0)=0$. If two non-parallel direction vectors $\vec u$, $\vec v$ are known, then $\vec n=\left[\vec u,\vec v\right]$. The plane meeting the three axes at $(a;\ 0;\ 0)$, $(0;\ b;\ 0)$, $(0;\ 0;\ c)$ with $a$, $b$, $c$ different from $0$ has equation $\frac xa+\frac yb+\frac zc=1$. The perpendicular bisector plane of $AB$ passes through the midpoint of $AB$ and has $\overrightarrow{AB}$ as normal.`,
    w: R`Every method reduces to finding a normal and a point of the plane; the cross product gives the normal when two direction vectors are known, and the intercept form is used only when the three axis intercepts are nonzero.`,
    p: R`Forgetting that a normal multiplied by a nonzero number is still a normal, so multiplying by a number other than $0$ is allowed, or forgetting to substitute the point to find the constant.`,
    ex: [
      [R`Write the equation of the plane through $M(1;\ 2;\ 3)$ with direction vectors $\vec u=(1;\ 0;\ 1)$ and $\vec v=(0;\ 1;\ 2)$.`, [
        [R`The cross product is $\left[\vec u,\vec v\right]=(-1;\ -2;\ 1)$, and we choose the normal $(1;\ 2;\ -1)$.`, R`Changing the sign of the whole vector makes the $x$ coefficient positive and the plane stays the same.`],
        [R`The equation has the form $x+2y-z+d=0$ and passes through $M$, so $1+4-3+d=0$, that is $d=-2$.`, R`Substitute the coordinates of $M$ to find the constant.`],
      ], R`The required plane is $x+2y-z-2=0$.`],
      [R`Write the equation of the perpendicular bisector plane of $AB$ with $A(1;\ 2;\ 3)$ and $B(3;\ 4;\ 1)$.`, [
        [R`The midpoint is $M(2;\ 3;\ 2)$ and $\overrightarrow{AB}=(2;\ 2;\ -2)$, so we choose the normal $(1;\ 1;\ -1)$.`, R`The normal is parallel to $\overrightarrow{AB}$.`],
        [R`The equation $x+y-z+d=0$ passes through $M$, so $2+3-2+d=0$, that is $d=-3$.`, R`Substitute the coordinates of the midpoint $M$.`],
      ], R`The perpendicular bisector plane is $x+y-z-3=0$.`],
    ],
    dr: [
      [R`A plane meets the axes at $A(2;\ 0;\ 0)$, $B(0;\ 3;\ 0)$, $C(0;\ 0;\ 6)$. Find the distance from the origin $O$ to the plane.`, R`The distance is $\frac{3\sqrt{14}}{7}$.`, R`We have $\frac{|-6|}{\sqrt{9+4+1}}=\frac{6}{\sqrt{14}}=\frac{3\sqrt{14}}{7}$.`],
      [R`The plane through $M(1;\ 1;\ 1)$ with normal $(2;\ -1;\ 3)$ has the form $2x-y+3z+d=0$. Find $d$.`, R`The required value is $d=-4$.`, R`Substituting $M$ gives $2-1+3+d=0$, so $d=-4$.`],
      [R`The perpendicular bisector plane of $AB$ with $A(0;\ 0;\ 0)$ and $B(4;\ 0;\ 0)$ has the form $x+d=0$. Find $d$.`, R`The required value is $d=-2$.`, R`The plane passes through the midpoint $(2;\ 0;\ 0)$, so $2+d=0$ and $d=-2$.`],
      [R`Let $(P):\ x+2y-z-2=0$ be a plane. Decide whether each statement is true or false.`, R`Statements a and b are true, statements c and d are false.`, R`Substituting $M$ gives $1+4-3-2=0$, the normal is read from the coefficients, the dot product of the normal with $(0;\ 0;\ 1)$ equals $-1$, which is different from $0$, and the distance from $O$ is $\frac{2}{\sqrt6}$.`, [], [R`The plane passes through $M(1;\ 2;\ 3)$.`, R`A normal vector of the plane is $(1;\ 2;\ -1)$.`, R`The plane is parallel to the axis $Oz$.`, R`The distance from the origin $O$ to the plane equals $2$.`]],
    ],
  },
  "lap-dt-mp": {
    s: R`A line perpendicular to a plane $(P)$ has the normal of $(P)$ as direction vector. A plane parallel to $(P):\ Ax+By+Cz+D=0$ has the form $Ax+By+Cz+D'=0$. The plane containing a line $d$ and passing through a point $A$ off $d$ has normal $\left[\vec u,\overrightarrow{MA}\right]$, where $M\in d$. The projection of a point $A$ onto $(P)$ is the intersection of $(P)$ with the line through $A$ perpendicular to $(P)$.`,
    w: R`Perpendicularity lets us take the normal as a direction vector and the other way round, while parallelism keeps the normal and changes only the constant. The projection of a point is the intersection of the plane with the line through that point perpendicular to the plane.`,
    p: R`Keeping the same constant when building a parallel plane, or mixing up a direction vector with a normal.`,
    ex: [
      [R`Write the line through $A(1;\ 2;\ 3)$ perpendicular to $(P):\ x-2y+z+1=0$ and find the value of $t$ for the projection of $A$ onto $(P)$.`, [
        [R`The direction vector is the normal $(1;\ -2;\ 1)$, so $x=1+t$, $y=2-2t$, $z=3+t$.`, R`A line perpendicular to a plane has the normal as direction vector.`],
        [R`Substituting into $(P)$: $(1+t)-2(2-2t)+(3+t)+1=6t+1=0$, so $t=-\frac16$.`, R`The intersection with $(P)$ is the required projection.`],
      ], R`The projection corresponds to $t=-\frac16$, that is, the point $\left(\frac56;\ \frac73;\ \frac{17}{6}\right)$.`],
      [R`Write the plane through $A(1;\ 0;\ 0)$ containing the line $d:\ x=t,\ y=1+t,\ z=2$.`, [
        [R`The point $B(0;\ 1;\ 2)\in d$, the direction vector is $\vec u=(1;\ 1;\ 0)$ and $\overrightarrow{AB}=(-1;\ 1;\ 2)$.`, R`Take the point of $d$ for $t=0$.`],
        [R`The normal $\left[\vec u,\overrightarrow{AB}\right]=(2;\ -2;\ 2)$, so we choose $(1;\ -1;\ 1)$; passing through $A$ gives $x-y+z-1=0$.`, R`Substitute the coordinates of $A$ to find the constant.`],
      ], R`The required plane is $x-y+z-1=0$.`],
    ],
    dr: [
      [R`The plane through $A(1;\ 2;\ 3)$ parallel to $(P):\ 2x-y+2z-7=0$ has the form $2x-y+2z+d=0$. Find $d$.`, R`The required value is $d=-6$.`, R`Substituting $A$ gives $2-2+6+d=0$, so $d=-6$.`],
      [R`The line through $A(2;\ 0;\ 1)$ has direction vector $(1;\ 2;\ -1)$. What is the ordinate of the point with $t=2$?`, R`The ordinate is $4$.`, R`The equation has $y=0+2t$, so for $t=2$ we get $y=4$.`],
      [R`The line through the origin $O$ perpendicular to the plane $x+y+z-3=0$ has equations $x=t$, $y=t$, $z=t$. Find $t$ for the projection of $O$ onto the plane.`, R`The value is $t=1$.`, R`Substituting gives $3t-3=0$, so $t=1$ and the projection is $(1;\ 1;\ 1)$.`],
    ],
  },
};
