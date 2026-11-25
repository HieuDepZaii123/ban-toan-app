/** Bản tiếng Anh của lớp 12 chi tiết, phần bốn: tương giao hai đồ thị và tích có hướng (lop12extra4.ts). */
import type { LessonEn } from "./types.ts";

const R = String.raw;

export const g12Extra4En: Record<string, LessonEn> = {
  "giao-do-thi-duong-thang": {
    s: R`The x-coordinates of the intersections of the graphs $y=f(x)$ and $y=g(x)$ are the roots of the equation $f(x)=g(x)$. The number of intersections equals the number of distinct real roots of this equation, and the y-coordinate is found by substituting the x-coordinate into either function.`,
    w: R`A common point of two graphs has the same x-coordinate and the same y-coordinate, so at that x-coordinate the two functions take the same value. Hence each intersection corresponds to exactly one distinct root of $f(x)=g(x)$.`,
    p: R`Counting a double root as two intersections. A double root gives only one common point, so $(x-1)^2(x+2)=0$ corresponds to two intersections and not three.`,
    ex: [
      [R`Find the number of intersections of $y=x^3-3x$ and $y=x$.`, [
        [R`The equation of x-coordinates is $x^3-3x=x$, that is $x^3-4x=0$.`, R`Move every term to one side.`],
        [R`Factoring gives $x(x-2)(x+2)=0$, so there are three roots $x=0$, $x=2$, $x=-2$.`, R`Take out the common factor $x$ and use a difference of squares.`],
      ], R`The two graphs have $3$ intersections.`],
      [R`Find the coordinates of the intersections of $y=x^2-2x$ and $y=x-2$.`, [
        [R`The equation of x-coordinates is $x^2-2x=x-2$, that is $x^2-3x+2=0$, so $x=1$ or $x=2$.`, R`Factor $(x-1)(x-2)=0$.`],
        [R`Substituting into $y=x-2$ gives the intersections $(1;\ -1)$ and $(2;\ 0)$.`, R`Use the linear function to find the y-coordinates more easily.`],
      ], R`The intersections are $(1;\ -1)$ and $(2;\ 0)$.`],
    ],
    dr: [
      [R`At how many distinct points does the graph of $y=x^3-3x$ meet the line $y=-2$?`, R`At $2$ points.`, R`The equation $x^3-3x+2=(x-1)^2(x+2)=0$ has a double root $x=1$ and a simple root $x=-2$, so there are only two distinct points.`],
      [R`The graph of $y=x^2-1$ meets $y=x+1$ at two points. Find the y-coordinate of the intersection with positive x-coordinate.`, R`The y-coordinate is $3$.`, R`The equation $x^2-x-2=0$ has the positive root $x=2$, and $y=2+1=3$.`],
      [R`At how many distinct points does the graph of $y=x^4-2x^2$ meet the line $y=-1$?`, R`At $2$ points.`, R`The equation $x^4-2x^2+1=(x^2-1)^2=0$ has two double roots $x=\pm1$, so there are only two distinct common points.`],
    ],
  },
  "tuong-giao-tham-so": {
    s: R`When a line containing a parameter $m$ meets a graph, the equation of x-coordinates contains the parameter. For a quadratic equation the number of intersections depends on the sign of $\Delta$: two points when $\Delta>0$, one tangent point when $\Delta=0$, none when $\Delta<0$. If the equation has a fixed root, take that root out first.`,
    w: R`The number of roots of a quadratic equation decides the number of intersections, and the sign of $\Delta$ tells the number of roots. When the equation has a root that does not depend on the parameter, taking it out makes the rest simpler.`,
    p: R`Forgetting the condition that the two roots differ when one root depends on $m$, or forgetting that the coefficient of $x^2$ may equal $0$ for some value of the parameter.`,
    ex: [
      [R`Find $m$ so that $y=x+m$ meets $y=x^2$ at two distinct points.`, [
        [R`The equation of x-coordinates is $x^2-x-m=0$.`, R`Move every term to one side.`],
        [R`We need $\Delta=1+4m>0$, that is $m>-\frac{1}{4}$.`, R`A quadratic has two distinct roots when its discriminant is positive.`],
      ], R`The condition is $m>-\frac{1}{4}$.`],
      [R`For which $m$ does $y=m(x-1)$ meet $y=x^2-1$ at two distinct points?`, [
        [R`The equation of x-coordinates is $x^2-1=m(x-1)$, that is $(x-1)(x+1-m)=0$.`, R`Factor $x^2-1=(x-1)(x+1)$ and take out the common factor.`],
        [R`The roots are $x=1$ and $x=m-1$, and they differ when $m-1\ne1$, that is $m\ne2$.`, R`The two roots coincide when $m-1=1$.`],
      ], R`There are two distinct points when $m\ne2$.`],
    ],
    dr: [
      [R`Find $m$ so that $y=2x+m$ is tangent to $y=x^2$.`, R`The required value is $m=-1$.`, R`The equation $x^2-2x-m=0$ has $\Delta=4+4m=0$ when $m=-1$, that is a double root.`],
      [R`How many integers $m$ in $[-5;\ 5]$ make $y=x+m$ meet $y=x^2$ at two distinct points?`, R`There are $6$ integers.`, R`The condition is $m>-\frac{1}{4}$, so $m\in\{0;\ 1;\ 2;\ 3;\ 4;\ 5\}$, which has $6$ numbers.`],
      [R`The line $y=mx+1$ meets the parabola $y=x^2$ at two points with x-coordinates $x_1$ and $x_2$. Find $x_1x_2$.`, R`The product is $-1$.`, R`The equation $x^2-mx-1=0$ has product of roots $\frac{c}{a}=-1$ by Vieta's formulas, for every $m$.`],
    ],
  },
  "tiep-xuc-hai-do-thi": {
    s: R`Two graphs $y=f(x)$ and $y=g(x)$ are tangent at the point with x-coordinate $x_0$ when $f(x_0)=g(x_0)$ and $f'(x_0)=g'(x_0)$, that is, the graphs share a point and a tangent line. Then $x_0$ is a double root of the equation $f(x)=g(x)$.`,
    w: R`Two graphs are tangent at a point when they touch without crossing, so the difference $f-g$ does not change sign there. This happens when the difference has a double root, that is, both $f-g$ and its derivative equal $0$.`,
    p: R`Checking only $f(x_0)=g(x_0)$ and forgetting $f'(x_0)=g'(x_0)$, so an ordinary crossing is mistaken for a tangent point.`,
    ex: [
      [R`Show that $y=x^2$ and $y=2x-1$ are tangent at $x=1$.`, [
        [R`At $x=1$ we have $f(1)=1$ and $g(1)=2-1=1$, two equal values.`, R`The first condition is that the graphs share a point.`],
        [R`The derivatives $f'(1)=2$ and $g'(1)=2$ are also equal.`, R`The second condition is that the graphs have the same slope of tangent.`],
      ], R`The two graphs are tangent at the point $(1;\ 1)$.`],
      [R`Find $m$ so that $y=x^3$ is tangent to $y=3x+m$.`, [
        [R`We need $3x^2=3$, so the point of tangency has $x=1$ or $x=-1$.`, R`The slopes of the two tangents must be equal.`],
        [R`From $x^3=3x+m$ we get $m=x^3-3x$, which equals $-2$ for $x=1$ and $2$ for $x=-1$.`, R`Substitute each x-coordinate into the equation of x-coordinates.`],
      ], R`There are two values $m=-2$ and $m=2$.`],
    ],
    dr: [
      [R`Find $m$ so that $y=x^2$ is tangent to $y=4x+m$.`, R`The required value is $m=-4$.`, R`The equation $x^2-4x-m=0$ has a double root when $\Delta=16+4m=0$, that is $m=-4$.`],
      [R`Find the positive value of $m$ for which $y=x^3$ is tangent to $y=12x+m$.`, R`The required value is $m=16$.`, R`We need $3x^2=12$, so $x=\pm2$, and $m=x^3-12x$ equals $-16$ for $x=2$ and $16$ for $x=-2$.`],
      [R`The graph of $y=x^3$ is tangent to the line $y=3x+2$. Find the x-coordinate of the point of tangency.`, R`The x-coordinate of the point of tangency is $-1$.`, R`The equation $x^3-3x-2=(x+1)^2(x-2)$ has the double root $x=-1$ so that is the point of tangency, while $x=2$ is the other intersection.`],
    ],
  },
  "tinh-tich-co-huong": {
    s: R`The cross product of $\vec a=(a_1;\ a_2;\ a_3)$ and $\vec b=(b_1;\ b_2;\ b_3)$ is $\left[\vec a,\vec b\right]=(a_2b_3-a_3b_2;\ a_3b_1-a_1b_3;\ a_1b_2-a_2b_1)$. This vector is perpendicular to both $\vec a$ and $\vec b$, has length $|\vec a|\,|\vec b|\sin\varphi$, and equals $\vec0$ when the two vectors are parallel.`,
    w: R`Each coordinate of the cross product is a two-by-two determinant, and its dot product with $\vec a$ or $\vec b$ expands to $0$. So it is perpendicular to both vectors.`,
    p: R`Getting the sign of the second coordinate wrong, since the order is $a_3b_1-a_1b_3$ and not $a_1b_3-a_3b_1$, or swapping the two vectors so that the whole result changes sign.`,
    ex: [
      [R`Compute $\left[\vec a,\vec b\right]$ for $\vec a=(1;\ 2;\ 3)$ and $\vec b=(2;\ -1;\ 0)$ and check that it is perpendicular to $\vec a$.`, [
        [R`The first coordinate is $2\cdot0-3\cdot(-1)=3$, the second is $3\cdot2-1\cdot0=6$, the third is $1\cdot(-1)-2\cdot2=-5$.`, R`Apply the formula to each coordinate.`],
        [R`Its dot product with $\vec a$ is $3\cdot1+6\cdot2-5\cdot3=0$.`, R`Vectors are perpendicular when the dot product is $0$.`],
      ], R`The cross product is $(3;\ 6;\ -5)$ and it is perpendicular to $\vec a$.`],
      [R`What is the cross product of $(1;\ 2;\ 3)$ and $(2;\ 4;\ 6)$?`, [
        [R`Since $(2;\ 4;\ 6)=2\cdot(1;\ 2;\ 3)$, the two vectors are parallel.`, R`One vector is twice the other.`],
        [R`So every coordinate of the cross product is $0$, for example $2\cdot6-3\cdot4=0$.`, R`The cross product of two parallel vectors is $\vec0$.`],
      ], R`The cross product is $\vec0$.`],
    ],
    dr: [
      [R`Find the second coordinate of $\left[\vec a,\vec b\right]$ for $\vec a=(2;\ 1;\ 0)$ and $\vec b=(1;\ 3;\ 1)$.`, R`The second coordinate is $-2$.`, R`The second coordinate is $a_3b_1-a_1b_3=0\cdot1-2\cdot1=-2$.`],
      [R`Find $m$ so that $\vec a=(1;\ 2;\ m)$ and $\vec b=(2;\ 4;\ 6)$ are parallel.`, R`The required value is $m=3$.`, R`They are parallel when $\left[\vec a,\vec b\right]=\vec0$; the second coordinate is $m\cdot2-1\cdot6=0$, so $m=3$.`],
      [R`Find the length of $\left[\vec a,\vec b\right]$ for $\vec a=(3;\ 0;\ 0)$ and $\vec b=(0;\ 4;\ 0)$.`, R`The length is $12$.`, R`The cross product is $(0;\ 0;\ 12)$ because the two vectors are perpendicular with lengths $3$ and $4$.`],
    ],
  },
  "dien-tich-tam-giac": {
    s: R`The area of triangle $ABC$ is $S=\frac12\left|\left[\overrightarrow{AB},\overrightarrow{AC}\right]\right|$. The area of parallelogram $ABCD$ is $\left|\left[\overrightarrow{AB},\overrightarrow{AD}\right]\right|$. The distance from $C$ to the line $AB$ equals $\frac{\left|\left[\overrightarrow{AB},\overrightarrow{AC}\right]\right|}{|\overrightarrow{AB}|}$.`,
    w: R`The length of the cross product equals $|\vec a|\,|\vec b|\sin\varphi$, which is exactly the area of the parallelogram built on the two vectors. The triangle is half of that parallelogram.`,
    p: R`Forgetting to halve when computing the area of a triangle, or using the dot product instead of the cross product.`,
    ex: [
      [R`Find the area of triangle $ABC$ with $A(1;\ 0;\ 0)$, $B(0;\ 2;\ 0)$, $C(0;\ 0;\ 2)$.`, [
        [R`We have $\overrightarrow{AB}=(-1;\ 2;\ 0)$ and $\overrightarrow{AC}=(-1;\ 0;\ 2)$, and the cross product is $(4;\ 2;\ 2)$.`, R`Compute each coordinate with the cross product formula.`],
        [R`Its length is $\sqrt{16+4+4}=2\sqrt6$, so $S=\sqrt6$.`, R`Take half of the length of the cross product.`],
      ], R`The area is $\sqrt6$.`],
      [R`The parallelogram $ABCD$ has $\overrightarrow{AB}=(2;\ 0;\ 0)$ and $\overrightarrow{AD}=(0;\ 3;\ 4)$. Find its area.`, [
        [R`The cross product is $(0\cdot4-0\cdot3;\ 0\cdot0-2\cdot4;\ 2\cdot3-0)=(0;\ -8;\ 6)$.`, R`Compute each coordinate with the formula.`],
        [R`Its length is $\sqrt{64+36}=10$.`, R`The area of the parallelogram equals exactly this length.`],
      ], R`The area of the parallelogram is $10$.`],
    ],
    dr: [
      [R`Find the area of triangle $ABC$ with $A(0;\ 0;\ 0)$, $B(3;\ 0;\ 0)$, $C(0;\ 4;\ 0)$.`, R`The area is $6$.`, R`The cross product of $(3;\ 0;\ 0)$ and $(0;\ 4;\ 0)$ has length $12$, so $S=6$.`],
      [R`Find the area of triangle $ABC$ with $A(0;\ 0;\ 0)$, $B(1;\ 1;\ 0)$, $C(0;\ 1;\ 1)$.`, R`The area is $\frac{\sqrt3}{2}$.`, R`The cross product is $(1;\ -1;\ 1)$ with length $\sqrt3$, so $S=\frac{\sqrt3}{2}$.`],
      [R`Find the distance from $C(0;\ 3;\ 0)$ to the line $AB$ with $A(0;\ 0;\ 0)$ and $B(2;\ 0;\ 0)$.`, R`The distance is $3$.`, R`We have $\frac{|[\overrightarrow{AB},\overrightarrow{AC}]|}{|\overrightarrow{AB}|}=\frac{6}{2}=3$.`],
    ],
  },
  "the-tich-hon-tap": {
    s: R`The volume of the box built on three vectors $\vec a$, $\vec b$, $\vec c$ is $\left|\left[\vec a,\vec b\right]\cdot\vec c\right|$ (the scalar triple product). The volume of the tetrahedron is one sixth of this value. Four points $A$, $B$, $C$, $D$ are coplanar when the triple product of $\overrightarrow{AB}$, $\overrightarrow{AC}$, $\overrightarrow{AD}$ equals $0$.`,
    w: R`The cross product of two vectors gives the base area, and the dot product with the third vector gives height times base area, that is the volume. If three vectors lie in one plane the height is $0$.`,
    p: R`Forgetting the absolute value so that the volume is negative, or forgetting to divide by $6$ when computing the volume of a tetrahedron.`,
    ex: [
      [R`Find the volume of the box built on $\vec a=(1;\ 0;\ 0)$, $\vec b=(0;\ 2;\ 0)$, $\vec c=(0;\ 0;\ 3)$ and the volume of the corresponding tetrahedron.`, [
        [R`The cross product $\left[\vec a,\vec b\right]=(0;\ 0;\ 2)$ and its dot product with $\vec c$ is $6$.`, R`Compute the cross product, then take the dot product with the third vector.`],
        [R`The volume of the box is $6$ and the volume of the tetrahedron is $\frac{6}{6}=1$.`, R`A tetrahedron has one sixth of the volume of the box.`],
      ], R`The volume of the box is $6$ and the volume of the tetrahedron is $1$.`],
      [R`Are the three vectors $\vec a=(1;\ 2;\ 3)$, $\vec b=(0;\ 1;\ 1)$, $\vec c=(1;\ 3;\ 4)$ coplanar?`, [
        [R`The cross product $\left[\vec a,\vec b\right]=(-1;\ -1;\ 1)$.`, R`Compute each coordinate with the formula.`],
        [R`The triple product is $-1-3+4=0$, so the three vectors are coplanar; indeed $\vec c=\vec a+\vec b$.`, R`The triple product is $0$ when the three vectors lie in the same plane.`],
      ], R`The three vectors are coplanar.`],
    ],
    dr: [
      [R`The tetrahedron $OABC$ has $A(2;\ 0;\ 0)$, $B(0;\ 3;\ 0)$, $C(0;\ 0;\ 4)$. Find its volume.`, R`The volume is $4$.`, R`The triple product is $2\cdot3\cdot4=24$, so the volume is $\frac{24}{6}=4$.`],
      [R`The four points $A(0;\ 0;\ 0)$, $B(1;\ 0;\ 0)$, $C(0;\ 1;\ 0)$, $D(1;\ 1;\ m)$ are coplanar. Find $m$.`, R`The required value is $m=0$.`, R`The triple product of $\overrightarrow{AB}$, $\overrightarrow{AC}$, $\overrightarrow{AD}$ equals $m$, so they are coplanar when $m=0$.`],
      [R`A box has $\overrightarrow{AB}=(1;\ 0;\ 0)$, $\overrightarrow{AD}=(1;\ 2;\ 0)$, $\overrightarrow{AA'}=(0;\ 1;\ 3)$. Find its volume.`, R`The volume is $6$.`, R`The cross product of $\overrightarrow{AD}$ and $\overrightarrow{AA'}$ is $(6;\ -3;\ 1)$, and its dot product with $\overrightarrow{AB}$ is $6$.`],
    ],
  },
  "mp-qua-ba-diem": {
    s: R`The plane through three non-collinear points $A$, $B$, $C$ has normal vector $\vec n=\left[\overrightarrow{AB},\overrightarrow{AC}\right]$. Its equation is $n_1(x-x_A)+n_2(y-y_A)+n_3(z-z_A)=0$. The three points are collinear when this cross product equals $\vec0$.`,
    w: R`The vectors $\overrightarrow{AB}$ and $\overrightarrow{AC}$ lie in the plane, so their cross product is perpendicular to the plane and is a normal vector. This holds only when the three points are not collinear.`,
    p: R`Substituting the wrong coordinates when using a point other than $A$ in the formula, or not checking the equation just written by substituting all three points.`,
    ex: [
      [R`Write the equation of the plane through $A(1;\ 0;\ 0)$, $B(0;\ 1;\ 0)$, $C(0;\ 0;\ 1)$.`, [
        [R`We have $\overrightarrow{AB}=(-1;\ 1;\ 0)$ and $\overrightarrow{AC}=(-1;\ 0;\ 1)$, and the cross product is $(1;\ 1;\ 1)$.`, R`The cross product is a normal vector of the plane.`],
        [R`The equation is $1(x-1)+y+z=0$, that is $x+y+z-1=0$.`, R`Use the point $A$ as the point on the plane.`],
      ], R`The required plane is $x+y+z-1=0$.`],
      [R`Write the equation of the plane through $A(0;\ 0;\ 1)$, $B(1;\ 0;\ 0)$, $C(0;\ 2;\ 0)$.`, [
        [R`We have $\overrightarrow{AB}=(1;\ 0;\ -1)$ and $\overrightarrow{AC}=(0;\ 2;\ -1)$, and the cross product is $(2;\ 1;\ 2)$.`, R`Compute each coordinate of the cross product.`],
        [R`The equation has the form $2x+y+2z+d=0$ and passes through $A$, so $d=-2$, that is $2x+y+2z-2=0$.`, R`Substitute the coordinates of $A$ to find the constant.`],
      ], R`The required plane is $2x+y+2z-2=0$.`],
    ],
    dr: [
      [R`The plane through $A(1;\ 0;\ 0)$, $B(0;\ 2;\ 0)$, $C(0;\ 0;\ 3)$ has the form $6x+3y+2z+d=0$. Find $d$.`, R`The required value is $d=-6$.`, R`The point $A$ lies on the plane, so $6\cdot1+d=0$, that is $d=-6$.`],
      [R`Find the distance from the origin $O$ to the plane $6x+3y+2z-6=0$.`, R`The distance is $\frac{6}{7}$.`, R`We have $\frac{|-6|}{\sqrt{36+9+4}}=\frac{6}{7}$.`],
      [R`The three points $A(0;\ 0;\ 0)$, $B(1;\ 2;\ 3)$, $C(2;\ 4;\ m)$ are collinear. Find $m$.`, R`The required value is $m=6$.`, R`We need $\left[\overrightarrow{AB},\overrightarrow{AC}\right]=\vec0$; the second coordinate is $3\cdot2-1\cdot m=0$, so $m=6$.`],
    ],
  },
};
