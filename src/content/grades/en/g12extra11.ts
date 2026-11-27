/** Bản tiếng Anh của lớp 12 chi tiết, phần mười một: mặt cầu và Oxyz vận dụng cao (lop12extra11.ts). */
import type { LessonEn } from "./types.ts";

const R = String.raw;

export const g12Extra11En: Record<string, LessonEn> = {
  "cau-cat-mp-dt": {
    s: R`Let $(S)$ be a sphere with centre $I$ and radius $R$. A plane $(P)$ with $h=d\left(I;\ (P)\right)<R$ meets $(S)$ in a circle of radius $r=\sqrt{R^2-h^2}$ whose centre is the projection of $I$ onto $(P)$. A line $\Delta$ with $h=d(I;\ \Delta)<R$ meets $(S)$ at two points with chord length $2\sqrt{R^2-h^2}$. When $h=R$ they are tangent, and when $h>R$ they have no common point.`,
    w: R`The radius of the sphere, the distance from the centre to the plane and the radius of the circle form a right triangle, so one Pythagorean relation gives the radius of the circle or the half chord.`,
    p: R`Using the radius of the sphere as the radius of the circle, or forgetting that the centre of the circle is the projection of the centre of the sphere and not the centre itself.`,
    ex: [
      [R`Let $(S):\ (x-1)^2+(y-2)^2+(z-3)^2=25$ and $(P):\ 2x-y+2z+3=0$. Show that $(P)$ meets $(S)$ and find the radius and the centre of the circle of intersection.`, [
        [R`The centre is $I(1;\ 2;\ 3)$ and $R=5$, and the distance from $I$ to $(P)$ is $h=\frac{\left|2-2+6+3\right|}{\sqrt{4+1+4}}=3$.`, R`Substitute the coordinates of the centre into the left side and divide by the length of the normal.`],
        [R`Since $h<R$ the plane meets the sphere, and the radius of the circle is $r=\sqrt{25-9}=4$.`, R`The radius of the sphere is the hypotenuse, and the distance $h$ and the radius $r$ are the two legs.`],
        [R`The centre is the projection of $I$: $I-\frac{9}{9}(2;\ -1;\ 2)=(-1;\ 3;\ 1)$.`, R`Move from $I$ back along the normal by exactly $h$ to land in the plane.`],
      ], R`The radius of the circle equals $4$ and its centre is the point $(-1;\ 3;\ 1)$.`],
      [R`The line $\Delta:\ x=2;\ y=2;\ z=t$ meets the sphere $x^2+y^2+z^2=9$ at two points. Find the two points and the length of the chord.`, [
        [R`Substituting into the equation of the sphere: $4+4+t^2=9$, so $t^2=1$ and $t=\pm1$.`, R`An intersection point satisfies both the equation of the line and that of the sphere.`],
        [R`The two intersection points are $(2;\ 2;\ 1)$ and $(2;\ 2;\ -1)$, so the chord has length $2$.`, R`The two points differ in the $z$-coordinate by $2$.`],
      ], R`The chord has length $2$ and joins $(2;\ 2;\ 1)$ to $(2;\ 2;\ -1)$.`],
    ],
    dr: [
      [R`A plane $(P)$ at distance $5$ from the centre of a sphere of radius $13$. Find the radius of the circle of intersection.`, R`The radius equals $12$.`, R`We have $r=\sqrt{13^2-5^2}=\sqrt{144}=12$.`],
      [R`A line at distance $6$ from the centre of a sphere of radius $10$ meets the sphere. Find the length of the chord.`, R`The chord has length $16$.`, R`We have $2\sqrt{10^2-6^2}=2\cdot8=16$.`],
      [R`Let $(S):\ x^2+y^2+z^2=25$. Decide whether each statement is true or false.`, R`Statements a, b and d are true, statement c is false.`, R`The planes $z=3$ and $z=-3$ cut in circles of radius $\sqrt{25-9}=4$ with centre $(0;\ 0;\ 3)$, while the plane $z=5$ is tangent so the intersection is a single point and not a circle of radius $5$.`, [], [R`The plane $z=3$ meets $(S)$ in a circle of radius $4$.`, R`The centre of the circle of intersection with the plane $z=3$ is $(0;\ 0;\ 3)$.`, R`The plane $z=5$ meets $(S)$ in a circle of radius $5$.`, R`The plane $z=-3$ meets $(S)$ in a circle of radius $4$.`]],
    ],
  },
  "hai-cau-kc-ss": {
    s: R`Two spheres $(S)$, $(S')$ with centres $I$, $I'$, radii $R$, $R'$ and $d=II'$ behave like two circles: they are outside each other when $d>R+R'$, externally tangent when $d=R+R'$, meet in a circle when $\left|R-R'\right|<d<R+R'$, are internally tangent when $d=\left|R-R'\right|$ and one contains the other when $d<\left|R-R'\right|$. Subtracting the two equations gives the plane containing the circle of intersection. The distance between two parallel lines, or between a line and a parallel plane, equals the distance from one point of the first object to the other one.`,
    w: R`Subtracting the equations of two spheres cancels the squares and leaves a linear equation, which is exactly a plane through all common points; the distance between parallel objects does not depend on which point we choose, so we pick the most convenient one.`,
    p: R`Forgetting to check that the lines are distinct before using the distance formula, or using a point of the second object instead of a point of the first for a line parallel to a plane.`,
    ex: [
      [R`Let $(S):\ x^2+y^2+z^2=25$ and $(S'):\ (x-8)^2+y^2+z^2=25$. Show that the spheres meet and find the plane containing the circle of intersection and its radius.`, [
        [R`The distance between the centres is $d=8$, and $R+R'=10$, $\left|R-R'\right|=0$, so $0<d<10$ and the spheres meet.`, R`The spheres meet when the distance between the centres lies between the difference and the sum of the radii.`],
        [R`Subtracting the equations gives $16x-64=0$, so the circle of intersection lies in the plane $x=4$.`, R`The difference of the two sphere equations is a linear equation satisfied by every common point.`],
        [R`Substituting $x=4$ into $(S)$ gives $y^2+z^2=9$, so the circle of intersection has radius $3$.`, R`The plane $x=4$ cuts the sphere in a circle, so the remaining equation is that of the circle.`],
      ], R`The spheres meet in a circle of radius $3$ lying in the plane $x=4$.`],
      [R`Find the distance between two parallel lines: $\Delta_1$ through $A(0;\ 0;\ 0)$ and $\Delta_2$ through $B(0;\ 3;\ 0)$, both with direction vector $\vec u=(1;\ 2;\ 2)$.`, [
        [R`The lines are parallel and distinct, so the distance equals the distance from $B$ to $\Delta_1$.`, R`Take any point of one line and compute its distance to the other line.`],
        [R`We have $\left[\overrightarrow{AB},\vec u\right]=(6;\ 0;\ -3)$ with length $3\sqrt5$ and $\left|\vec u\right|=3$.`, R`Use the formula for the distance from a point to a line with the cross product.`],
        [R`Hence the distance equals $\frac{3\sqrt5}{3}=\sqrt5$.`, R`Divide the area of the parallelogram by the base $\left|\vec u\right|$.`],
      ], R`The distance equals $\sqrt5$.`],
    ],
    dr: [
      [R`A sphere of radius $3$ and a sphere of radius $2$ have centres at distance $5$. What is their relative position?`, R`The spheres are externally tangent.`, R`The distance between the centres equals $5=3+2$, so the spheres are externally tangent.`, [], [R`Outside each other.`, R`Externally tangent.`, R`Meeting in a circle.`]],
      [R`The line through $A(1;\ 2;\ 3)$ with direction vector $(1;\ 0;\ -1)$ is parallel to $(P):\ 2x-y+2z+3=0$. Find the distance between the line and the plane.`, R`The distance equals $3$.`, R`The distance equals the distance from $A$ to $(P)$, that is $\frac{\left|2-2+6+3\right|}{3}=3$.`],
      [R`The line $\Delta_1$ through $O$ and the line $\Delta_2$ through $B(5;\ 0;\ 0)$ both have direction vector $(0;\ 3;\ 4)$. Find the distance between the lines.`, R`The distance equals $5$.`, R`The cross product $\left[\overrightarrow{OB},\vec u\right]=(0;\ -20;\ 15)$ has length $25$ and $\left|\vec u\right|=5$, so the distance equals $5$.`],
    ],
  },
  "mp-chua-dt-cuc-tri": {
    s: R`Let $A$ be a point and $d$ a line not through $A$. For every plane $(P)$ containing $d$ we have $d\left(A;\ (P)\right)\le d(A;\ d)$, with equality when $(P)$ is perpendicular to $AH$, where $H$ is the projection of $A$ onto $d$; then $\overrightarrow{HA}$ is a normal vector of $(P)$. In a problem with a parameter $m$ we reduce the condition to an equation in $m$ and solve it, remembering to check every solution.`,
    w: R`A plane through the line $d$ pivots around $d$, and the foot of the perpendicular from $A$ to the plane always lies on a circle with diameter $AH$ in the plane perpendicular to that line, so the distance is largest when the plane is perpendicular to $AH$.`,
    p: R`Taking the plane through $A$ and $d$, which has distance $0$ from that point, as the extremal one, or forgetting to check that the plane found really contains $d$.`,
    ex: [
      [R`Let $A(1;\ 0;\ 0)$ and $d:\ x=t,\ y=1+t,\ z=2t$. Among the planes containing $d$, find the one farthest from $A$ and compute that distance.`, [
        [R`With $H(t;\ 1+t;\ 2t)$ and $\vec u=(1;\ 1;\ 2)$, the condition $\overrightarrow{AH}\cdot\vec u=0$ gives $6t=0$, so $H(0;\ 1;\ 0)$.`, R`The vector joining $A$ to its projection on $d$ is perpendicular to the direction vector of $d$.`],
        [R`The largest distance is $AH=\sqrt{1+1+0}=\sqrt2$, attained when the normal is $\overrightarrow{HA}=(1;\ -1;\ 0)$.`, R`For a plane containing $d$, the distance to $A$ does not exceed the length of the perpendicular segment $AH$.`],
        [R`The plane through $H$ with that normal is $x-y+1=0$, and it contains $d$ because $(1;\ -1;\ 0)\cdot(1;\ 1;\ 2)=0$.`, R`The normal is perpendicular to the direction vector of $d$ and the plane passes through the point $H$ of $d$.`],
      ], R`The required plane is $x-y+1=0$ and the largest distance equals $\sqrt2$.`],
      [R`Find $m$ so that the plane $(P_m):\ 2x+2y+mz-6=0$ is tangent to the sphere $x^2+y^2+z^2=4$.`, [
        [R`The distance from the centre $O$ to $(P_m)$ is $\frac{6}{\sqrt{8+m^2}}$ and the radius equals $2$.`, R`Substitute the coordinates of the centre into the left side and divide by the length of the normal.`],
        [R`Tangency means $\frac{6}{\sqrt{8+m^2}}=2$, that is $8+m^2=9$ and $m^2=1$.`, R`Square both sides and solve the equation for $m^2$.`],
      ], R`The required value is $m=1$ or $m=-1$.`],
    ],
    dr: [
      [R`Let $A$ be the origin $O$ and let $d$ pass through $P_0(3;\ 0;\ 0)$ with direction vector $(0;\ 3;\ 4)$. Find the largest distance from $O$ to a plane containing $d$.`, R`The largest distance equals $3$.`, R`Since $\overrightarrow{OP_0}\cdot\vec u=0$, the point $P_0$ is the projection of $O$ onto $d$ and the largest distance equals $OP_0=3$.`],
      [R`The plane $2x+y+2z+m=0$ with $m>0$ is tangent to the sphere $x^2+y^2+z^2=9$. Find $m$.`, R`The required value is $m=9$.`, R`The distance from $O$ is $\frac{m}{3}$ and must equal the radius $3$, so $m=9$.`],
      [R`Among the planes containing a line $d$, what property does the plane farthest from a point $A$ have?`, R`It is perpendicular to $AH$, where $H$ is the projection of $A$ onto $d$.`, R`The distance from $A$ to any plane containing $d$ does not exceed $AH$, with equality when the plane is perpendicular to $AH$.`, [], [R`It is perpendicular to $AH$ with $H$ the projection of $A$ onto $d$.`, R`It is parallel to $AH$.`, R`It passes through the point $A$.`]],
    ],
  },
  "cuc-tri-mat-cau": {
    s: R`Let $(S)$ be a sphere with centre $I$ and radius $R$ and let $A$ be a point. For $M\in(S)$ we have $\left|IA-R\right|\le MA\le IA+R$, and both extreme values are attained when $M$ lies on the line $IA$. For a plane $(P)$ that does not meet $(S)$ and $h=d\left(I;\ (P)\right)>R$, the distance from $M$ to $(P)$ lies in the interval from $h-R$ to $h+R$.`,
    w: R`The triangle inequality for the triangle $IMA$ bounds $MA$ between the difference and the sum of $IA$ and $R$, and the bounds are attained exactly when the three points are collinear.`,
    p: R`Using $IA-R$ for a point inside the sphere without taking the absolute value, or applying the interval $h-R$ to $h+R$ when the plane actually cuts the sphere.`,
    ex: [
      [R`Let the sphere have centre $I(1;\ 2;\ 3)$ and radius $2$, and let $A(4;\ 6;\ 3)$. Find the least and the greatest value of $MA$ and the point $M$ closest to $A$.`, [
        [R`We have $\overrightarrow{IA}=(3;\ 4;\ 0)$ and $IA=5$, and $A$ lies outside the sphere because $5>2$.`, R`Compare $IA$ with the radius to know whether $A$ is inside or outside the sphere.`],
        [R`Hence the least value is $5-2=3$ and the greatest value is $5+2=7$.`, R`The two extreme points lie on the line joining the centre to $A$, on the two sides of the centre.`],
        [R`The closest point is $M=I+2\cdot\frac{\overrightarrow{IA}}{5}=\left(\frac{11}{5};\ \frac{18}{5};\ 3\right)$.`, R`Move from the centre towards $A$ by exactly the radius.`],
      ], R`The least value is $3$, the greatest is $7$ and $M=\left(\frac{11}{5};\ \frac{18}{5};\ 3\right)$.`],
      [R`For the sphere in the previous example and $(P):\ 2x-y+2z+3=0$, find the least and the greatest distance from $M\in(S)$ to $(P)$.`, [
        [R`The distance from $I$ to $(P)$ is $h=\frac{\left|2-2+6+3\right|}{3}=3$, which is larger than the radius $2$, so the plane does not meet the sphere.`, R`We must know that the plane lies outside the sphere for the boundary formula to hold.`],
        [R`The least distance is $3-2=1$ and the greatest is $3+2=5$.`, R`The line through $I$ perpendicular to $(P)$ meets the sphere at the two extreme points.`],
      ], R`The least distance is $1$ and the greatest is $5$.`],
    ],
    dr: [
      [R`The sphere has centre $O$ and radius $3$, and $A(2;\ 3;\ 6)$. Find the least value of $MA$ for $M$ on the sphere.`, R`The least value equals $4$.`, R`We have $OA=7$, so the least value is $7-3=4$.`],
      [R`The sphere $x^2+y^2+z^2=4$ and $(P):\ 2x-y+2z-9=0$. Find the greatest distance from a point of the sphere to $(P)$.`, R`The greatest distance equals $5$.`, R`The distance from $O$ to $(P)$ is $3$, so the greatest distance is $3+2=5$.`],
      [R`Let the sphere be $x^2+y^2+z^2=4$ and $A(0;\ 0;\ 5)$. Decide whether each statement is true or false.`, R`Statements a, b and d are true, statement c is false.`, R`We have $OA=5$, so the least $MA$ equals $5-2=3$ and not $1$, the greatest equals $7$, and the point $(0;\ 0;\ 2)$ lies on the segment $OA$ so it gives the least value.`, [], [R`The least value of $MA$ equals $3$.`, R`The greatest value of $MA$ equals $7$.`, R`The least value of $MA$ equals $1$.`, R`The point $(0;\ 0;\ 2)$ is the point of the sphere closest to $A$.`]],
    ],
  },
};
