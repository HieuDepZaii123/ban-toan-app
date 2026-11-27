/** Bản tiếng Anh của lớp 10, phần chi tiết thứ tư: đường thẳng và đường tròn (lop1011extra4.ts). */
import type { LessonEn } from "./types.ts";

const R = String.raw;

export const g10Extra5En: Record<string, LessonEn> = {
  "vtt-dt-tron": {
    s: R`Let $(C)$ be a circle with centre $I(x_0;\ y_0)$ and radius $R$ and let $\Delta:\ ax+by+c=0$ be a line. Let $h=\frac{\left|ax_0+by_0+c\right|}{\sqrt{a^2+b^2}}$ be the distance from $I$ to $\Delta$. If $h>R$ then $\Delta$ misses $(C)$, if $h=R$ then $\Delta$ is tangent to $(C)$, and if $h<R$ then $\Delta$ meets $(C)$ at two points with chord length $2\sqrt{R^2-h^2}$.`,
    w: R`The distance from the centre to the line measures how far the line is from the circle's middle, so comparing it with the radius decides whether the line misses, touches or cuts the circle; the half chord, the distance and the radius form a right triangle.`,
    p: R`Comparing the distance with the diameter instead of the radius, or forgetting the absolute value in the numerator of the distance formula.`,
    ex: [
      [R`Let $(C):\ (x-1)^2+(y+2)^2=25$ and $\Delta:\ 3x+4y-10=0$. Find their relative position and the chord length if any.`, [
        [R`The centre is $I(1;\ -2)$ and the radius is $R=5$.`, R`Read the centre and the radius from the standard equation of the circle.`],
        [R`The distance from $I$ to $\Delta$ is $h=\frac{\left|3-8-10\right|}{5}=3$, which is less than $R$, so $\Delta$ meets $(C)$ at two points.`, R`Compare the distance from the centre to the line with the radius.`],
        [R`The chord has length $2\sqrt{25-9}=8$.`, R`The half chord, the distance $h$ and the radius form a right triangle.`],
      ], R`The line cuts the circle and the chord has length $8$.`],
      [R`Find $m$ so that the line $\Delta:\ x+y+m=0$ is tangent to the circle $x^2+y^2=2$.`, [
        [R`The centre is $O(0;\ 0)$ and $R=\sqrt2$, so the distance from $O$ to $\Delta$ is $\frac{\left|m\right|}{\sqrt2}$.`, R`Substitute the coordinates of the centre into the left side and divide by the length of the normal.`],
        [R`Tangency means $\frac{\left|m\right|}{\sqrt2}=\sqrt2$, that is $\left|m\right|=2$.`, R`The condition for tangency is that the distance from the centre equals the radius.`],
      ], R`The required value is $m=2$ or $m=-2$.`],
    ],
    dr: [
      [R`Find the distance from $I(2;\ 1)$ to the line $4x-3y+5=0$.`, R`The distance equals $2$.`, R`We have $\frac{\left|8-3+5\right|}{\sqrt{16+9}}=\frac{10}{5}=2$.`],
      [R`How many points do the circle $x^2+y^2=9$ and the line $x+y-6=0$ have in common?`, R`They have no common point.`, R`The distance from the centre is $\frac{6}{\sqrt2}=3\sqrt2$, which is larger than the radius $3$.`, [], [R`$0$ points.`, R`$1$ point.`, R`$2$ points.`]],
      [R`The line $x=3$ meets the circle $x^2+y^2=25$ at two points. Find the chord length.`, R`The chord has length $8$.`, R`The distance from the centre is $3$, so the chord has length $2\sqrt{25-9}=8$.`],
    ],
  },
  "tiep-tuyen-tron": {
    s: R`The tangent to $(C)$ at $M_0(x_0;\ y_0)\in(C)$ has $\overrightarrow{IM_0}$ as a normal vector, so it has equation $(x_0-a)(x-x_0)+(y_0-b)(y-y_0)=0$ with $I(a;\ b)$. A tangent through a point $A$ outside $(C)$ is found by writing a line through $A$ and setting its distance from $I$ equal to $R$, and there are usually two tangents. A tangent parallel to $ax+by+c=0$ has the form $ax+by+c'=0$ with distance $R$ from $I$.`,
    w: R`A tangent is perpendicular to the radius at the point of contact, which gives its normal vector at once; for tangents from an outside point, the tangency condition becomes an equation in the slope with at most two solutions.`,
    p: R`Forgetting the vertical line when using a slope, or losing one of the two tangents by taking only the positive root.`,
    ex: [
      [R`Write the tangent to $(C):\ (x-1)^2+(y-2)^2=25$ at $M_0(4;\ 6)$.`, [
        [R`The point $M_0$ lies on $(C)$ because $(4-1)^2+(6-2)^2=9+16=25$.`, R`Substitute the coordinates of the point into the equation to check that it lies on the circle.`],
        [R`The vector $\overrightarrow{IM_0}=(3;\ 4)$ is normal, so the tangent is $3(x-4)+4(y-6)=0$.`, R`The tangent is perpendicular to the radius at the point of contact.`],
      ], R`The tangent is $3x+4y-36=0$.`],
      [R`Write the tangents of $x^2+y^2=9$ through $A(5;\ 0)$.`, [
        [R`A line through $A$ is $y=k(x-5)$, that is $kx-y-5k=0$, and the distance from $O$ is $\frac{5\left|k\right|}{\sqrt{k^2+1}}$.`, R`The vertical line $x=5$ is not tangent, so a slope can be used.`],
        [R`Setting the distance equal to $3$: $25k^2=9(k^2+1)$, so $k^2=\frac{9}{16}$ and $k=\pm\frac34$.`, R`Square both sides and solve the equation for $k^2$.`],
      ], R`The two tangents are $3x-4y-15=0$ and $3x+4y-15=0$.`],
    ],
    dr: [
      [R`The tangent to $x^2+y^2=25$ at $M_0(3;\ 4)$ has coefficient $3$ for $x$, coefficient $4$ for $y$ and constant $c$. Find $c$.`, R`The required value is $c=-25$.`, R`The equation is $3(x-3)+4(y-4)=0$, so the constant is $-9-16=-25$.`],
      [R`A tangent of $x^2+y^2=4$ parallel to the line $x+y=0$ has the form $x+y+c=0$. Find the positive value of $c$.`, R`The required value is $c=2\sqrt2$.`, R`We need $\frac{\left|c\right|}{\sqrt2}=2$, so $\left|c\right|=2\sqrt2$.`],
      [R`How many tangents can be drawn from $A(5;\ 0)$ to the circle $x^2+y^2=9$?`, R`Two tangents can be drawn.`, R`Since $OA^2-R^2=25-9=16>0$, the point $A$ lies outside the circle and there are two tangents.`, [], [R`$0$ tangents.`, R`$1$ tangent.`, R`$2$ tangents.`]],
    ],
  },
  "hai-duong-tron": {
    s: R`Let $(C)$ have centre $I$ and radius $R$ and $(C')$ have centre $I'$ and radius $R'$, and put $d=II'$. If $d>R+R'$ the circles are outside each other, if $d=R+R'$ they are externally tangent, if $\left|R-R'\right|<d<R+R'$ they meet at two points, if $d=\left|R-R'\right|$ with $R\ne R'$ they are internally tangent, if $d<\left|R-R'\right|$ one circle contains the other, and if $d=0$ with $R=R'$ the circles coincide. When the circles meet, subtracting the two equations gives the line containing the common chord.`,
    w: R`Two circles touch exactly when the distance between the centres equals the sum or the difference of the radii, so the position is decided by comparing one number with two thresholds.`,
    p: R`Using the sum of the radii in the case of internal tangency, or forgetting that equal radii give difference zero so the circles can never be internally tangent unless they coincide.`,
    ex: [
      [R`Find the relative position of $(C):\ x^2+y^2=9$ and $(C'):\ (x-5)^2+y^2=4$.`, [
        [R`The centre is $O(0;\ 0)$ with $R=3$ and the centre is $I'(5;\ 0)$ with $R'=2$.`, R`Read the centre and the radius of each circle.`],
        [R`The distance between the centres is $d=5$ and $R+R'=5$, so $d=R+R'$.`, R`Compare the distance between the centres with the sum and the difference of the radii.`],
      ], R`The circles are externally tangent.`],
      [R`Let $(C):\ x^2+y^2=25$ and $(C'):\ (x-8)^2+y^2=25$. Show that the circles meet and find the length of the common chord.`, [
        [R`We have $d=8$ and $R+R'=10$, $\left|R-R'\right|=0$, so $0<d<10$ and the circles meet.`, R`The circles meet when the distance between the centres lies between the difference and the sum of the radii.`],
        [R`Subtracting the equations gives $16x-64=0$, so the common chord lies on the line $x=4$.`, R`The difference of the two equations is the line through the two intersection points.`],
        [R`Substituting $x=4$ into $(C)$ gives $y^2=9$, so the intersection points are $(4;\ 3)$ and $(4;\ -3)$ and the common chord has length $6$.`, R`Solve the equation for $y$ and compute the distance between the two intersection points.`],
      ], R`The circles meet and the common chord has length $6$.`],
    ],
    dr: [
      [R`Find the distance between the centres of $(x-1)^2+y^2=1$ and $(x+2)^2+y^2=4$.`, R`The distance equals $3$.`, R`The centres are $(1;\ 0)$ and $(-2;\ 0)$, so the distance equals $\left|1+2\right|=3$.`],
      [R`What is the relative position of the circle with centre $O$ and radius $5$ and the circle with centre $(3;\ 0)$ and radius $2$?`, R`The circles are internally tangent.`, R`The distance between the centres is $3$ and $R-R'=5-2=3$, so they are internally tangent.`, [], [R`Externally tangent.`, R`Internally tangent.`, R`Meeting at two points.`]],
      [R`The circles $x^2+y^2=25$ and $x^2+(y-6)^2=25$ meet. Find the length of the common chord.`, R`The common chord has length $8$.`, R`Subtracting gives $12y-36=0$ so $y=3$ and $x^2=16$, hence the common chord has length $2\cdot4=8$.`],
    ],
  },
};
