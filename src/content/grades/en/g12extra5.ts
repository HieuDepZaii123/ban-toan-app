/** Bản tiếng Anh của lớp 12 chi tiết, phần năm: tích vô hướng, song song và vuông góc trong Oxyz (lop12extra5.ts). */
import type { LessonEn } from "./types.ts";

const R = String.raw;

export const g12Extra5En: Record<string, LessonEn> = {
  "tich-vo-huong-kg": {
    s: R`For $\vec a=(a_1;\ a_2;\ a_3)$ and $\vec b=(b_1;\ b_2;\ b_3)$, the dot product is $\vec a\cdot\vec b=a_1b_1+a_2b_2+a_3b_3$ and the length is $|\vec a|=\sqrt{a_1^2+a_2^2+a_3^2}$. The angle $\varphi$ between two vectors different from $\vec0$ satisfies $\cos\varphi=\frac{\vec a\cdot\vec b}{|\vec a|\,|\vec b|}$, and two vectors are perpendicular when the dot product is $0$.`,
    w: R`The dot product equals the product of the lengths times $\cos\varphi$, so $\cos\varphi$ follows when the dot product and the lengths are known. A dot product of $0$ means $\cos\varphi=0$, that is, the vectors are perpendicular.`,
    p: R`Forgetting the square root when computing a length, or confusing the dot product, which is a number, with the cross product, which is a vector.`,
    ex: [
      [R`Let $\vec a=(1;\ 2;\ 2)$ and $\vec b=(2;\ -1;\ 0)$. Find $|\vec a|$ and decide whether the two vectors are perpendicular.`, [
        [R`The length is $|\vec a|=\sqrt{1+4+4}=3$.`, R`Add the squares of the three coordinates and take the root.`],
        [R`The dot product is $1\cdot2+2\cdot(-1)+2\cdot0=0$, so the vectors are perpendicular.`, R`Two vectors are perpendicular when the dot product is $0$.`],
      ], R`The length is $3$ and the vectors are perpendicular.`],
      [R`Find the angle between $\vec a=(1;\ 1;\ 0)$ and $\vec b=(0;\ 1;\ 1)$.`, [
        [R`The dot product is $0+1+0=1$, and $|\vec a|=|\vec b|=\sqrt2$.`, R`Compute the numerator and denominator of $\cos\varphi$.`],
        [R`So $\cos\varphi=\frac{1}{\sqrt2\cdot\sqrt2}=\frac12$ and $\varphi=60^\circ$.`, R`This is a familiar trigonometric value.`],
      ], R`The angle between the vectors is $60^\circ$.`],
    ],
    dr: [
      [R`Find $m$ so that $\vec a=(1;\ m;\ 2)$ is perpendicular to $\vec b=(2;\ 1;\ 1)$.`, R`The required value is $m=-4$.`, R`We need $1\cdot2+m\cdot1+2\cdot1=0$, so $m=-4$.`],
      [R`Compute the dot product of $(3;\ -1;\ 2)$ and $(1;\ 4;\ 2)$.`, R`The dot product is $3$.`, R`We have $3\cdot1+(-1)\cdot4+2\cdot2=3-4+4=3$.`],
      [R`Find the angle between $(1;\ 0;\ 0)$ and $(1;\ 1;\ \sqrt2)$ in degrees.`, R`The angle is $60$ degrees.`, R`The dot product is $1$ and $|(1;\ 1;\ \sqrt2)|=2$, so $\cos\varphi=\frac12$ and $\varphi=60^\circ$.`],
    ],
  },
  "goc-hai-dt-kg": {
    s: R`The angle $\varphi$ between two lines with direction vectors $\vec{u_1}$ and $\vec{u_2}$ satisfies $\cos\varphi=\frac{|\vec{u_1}\cdot\vec{u_2}|}{|\vec{u_1}|\,|\vec{u_2}|}$ with $0^\circ\le\varphi\le90^\circ$. Two lines are perpendicular when $\vec{u_1}\cdot\vec{u_2}=0$, and parallel or coincident when the two direction vectors are parallel.`,
    w: R`The angle between two lines depends only on their directions, so use the two direction vectors and take the absolute value to get a non-obtuse angle. Two skew lines still have a well-defined angle in this way.`,
    p: R`Dropping the absolute value and getting an obtuse angle, or concluding that two lines are perpendicular and then assuming they meet. Two skew lines can also be perpendicular.`,
    ex: [
      [R`Find the angle between two lines with direction vectors $(1;\ 1;\ 0)$ and $(1;\ 0;\ 1)$.`, [
        [R`The dot product is $1$ and each direction vector has length $\sqrt2$.`, R`Compute the numerator and the length of each vector.`],
        [R`So $\cos\varphi=\frac{1}{2}$ and $\varphi=60^\circ$.`, R`Use the absolute value so the angle does not exceed $90^\circ$.`],
      ], R`The angle between the two lines is $60^\circ$.`],
      [R`Find $m$ so that two lines with direction vectors $(1;\ 1;\ m)$ and $(1;\ 2;\ -1)$ are perpendicular.`, [
        [R`We need $1\cdot1+1\cdot2+m\cdot(-1)=0$.`, R`Two lines are perpendicular when the dot product of the direction vectors is $0$.`],
        [R`So $3-m=0$ and $m=3$.`, R`Solve the linear equation in $m$.`],
      ], R`The required value is $m=3$.`],
    ],
    dr: [
      [R`Find the angle between two lines with direction vectors $(1;\ 1;\ 0)$ and $(0;\ 1;\ 0)$ in degrees.`, R`The angle is $45$ degrees.`, R`The dot product is $1$, the lengths are $\sqrt2$ and $1$, so $\cos\varphi=\frac{1}{\sqrt2}$ and $\varphi=45^\circ$.`],
      [R`Find $m$ so that two lines with direction vectors $(m;\ 1;\ 2)$ and $(1;\ -3;\ 1)$ are perpendicular.`, R`The required value is $m=1$.`, R`We need $m-3+2=0$, so $m=1$.`],
      [R`Two lines have direction vectors $(1;\ 2;\ 3)$ and $(2;\ 4;\ 6)$. What is the relation between the direction vectors?`, R`The direction vectors are parallel.`, R`Since $(2;\ 4;\ 6)=2\cdot(1;\ 2;\ 3)$ the cross product is $\vec0$, the lines are parallel or coincide, and they are not perpendicular.`, [], ["The direction vectors are parallel.", "The direction vectors are perpendicular.", "Neither parallel nor perpendicular."]],
    ],
  },
  "song-song-vuong-goc-mp": {
    s: R`Two planes $(P):\ A_1x+B_1y+C_1z+D_1=0$ and $(Q):\ A_2x+B_2y+C_2z+D_2=0$ are parallel when their normals are parallel and the planes do not coincide, and perpendicular when $\vec{n_1}\cdot\vec{n_2}=0$. The angle between them satisfies $\cos\varphi=\frac{|\vec{n_1}\cdot\vec{n_2}|}{|\vec{n_1}|\,|\vec{n_2}|}$.`,
    w: R`Each plane is perpendicular to its normal, so the angle between two planes equals the angle between the normals or is supplementary to it. Parallel normals give parallel or coincident planes, and the constants decide which.`,
    p: R`Concluding parallel just because the normals are parallel, without checking whether the planes coincide.`,
    ex: [
      [R`Find the relative position of $(P):\ x+2y-z+1=0$ and $(Q):\ 2x+4y-2z+5=0$.`, [
        [R`The normals $(1;\ 2;\ -1)$ and $(2;\ 4;\ -2)$ are parallel because the cross product is $\vec0$.`, R`The normal of $(Q)$ is twice the normal of $(P)$.`],
        [R`Writing $(Q)$ as $x+2y-z+\frac52=0$ gives a constant different from $1$, so the planes do not coincide.`, R`Divide both sides of $(Q)$ by $2$ to have the same coefficients as $(P)$.`],
      ], R`The two planes are parallel.`],
      [R`Find $m$ so that $(P):\ x+y+z=0$ is perpendicular to $(Q):\ 2x-y+mz+1=0$.`, [
        [R`The normals are $(1;\ 1;\ 1)$ and $(2;\ -1;\ m)$.`, R`Take the coefficients of $x$, $y$, $z$ in each equation.`],
        [R`We need $1\cdot2+1\cdot(-1)+1\cdot m=0$, so $m=-1$.`, R`Two planes are perpendicular when the dot product of the normals is $0$.`],
      ], R`The required value is $m=-1$.`],
    ],
    dr: [
      [R`Find the angle between $(P):\ \sqrt3x+y=0$ and $(Q):\ y=0$ in degrees.`, R`The angle is $60$ degrees.`, R`The normal $(\sqrt3;\ 1;\ 0)$ has length $2$ and $(0;\ 1;\ 0)$ has length $1$, so $\cos\varphi=\frac12$ and $\varphi=60^\circ$.`],
      [R`Find $m$ so that $(P):\ x+my+2z-1=0$ is parallel to $(Q):\ 2x+4y+4z+3=0$.`, R`The required value is $m=2$.`, R`The normal $(2;\ 4;\ 4)$ is twice $(1;\ 2;\ 2)$ so $m=2$, and the constant $-1$ is not proportional to $\frac32$, so the planes do not coincide.`],
      [R`What is the relation between the planes $2x-y+z=0$ and $x+y-z=0$?`, R`The planes are perpendicular.`, R`The normals $(2;\ -1;\ 1)$ and $(1;\ 1;\ -1)$ have dot product $2-1-1=0$.`, [], ["The planes are perpendicular.", "The planes are parallel.", "They intersect but are not perpendicular."]],
    ],
  },
  "duong-mat-quan-he": {
    s: R`A line $d$ has direction vector $\vec u$ and a plane $(P)$ has normal $\vec n$. When $\vec u\cdot\vec n=0$, $d$ is parallel to $(P)$ if a point of $d$ is not on $(P)$, and lies in $(P)$ if that point is on $(P)$. When $\vec u$ and $\vec n$ are parallel, $d$ is perpendicular to $(P)$. The angle $\varphi$ between $d$ and $(P)$ satisfies $\sin\varphi=\frac{|\vec u\cdot\vec n|}{|\vec u|\,|\vec n|}$.`,
    w: R`A line is parallel to a plane when its direction is perpendicular to the normal, and perpendicular to the plane when its direction is parallel to the normal. The angle between a line and a plane is the complement of the angle between the line and the normal, so we use the sine.`,
    p: R`Using cosine instead of sine for the angle between a line and a plane, or forgetting to test a point and so confusing parallel with lying in the plane.`,
    ex: [
      [R`The line $d$ through $M(0;\ 0;\ 1)$ has direction vector $(1;\ 1;\ 1)$ and $(P):\ x-2y+z-3=0$. Find the relative position of $d$ and $(P)$.`, [
        [R`The normal is $(1;\ -2;\ 1)$ and $\vec u\cdot\vec n=1-2+1=0$.`, R`A dot product of $0$ means $d$ is parallel to $(P)$ or lies in it.`],
        [R`For the point $M$ we get $0-0+1-3=-2\ne0$, so it is not on $(P)$.`, R`Test a point of $d$ in the equation of $(P)$.`],
      ], R`The line $d$ is parallel to $(P)$.`],
      [R`Find the angle between the line with direction vector $(0;\ 0;\ 1)$ and the plane $x+z=0$.`, [
        [R`The normal is $(1;\ 0;\ 1)$, the dot product is $1$, and the lengths are $1$ and $\sqrt2$.`, R`Take the coefficients of $x$, $y$, $z$ as the normal.`],
        [R`So $\sin\varphi=\frac{1}{\sqrt2}$ and $\varphi=45^\circ$.`, R`The angle between a line and a plane uses sine and not cosine.`],
      ], R`The angle between the line and the plane is $45^\circ$.`],
    ],
    dr: [
      [R`Find $m$ so that the line with direction vector $(1;\ 2;\ m)$ is perpendicular to the plane with normal $(2;\ 4;\ 6)$.`, R`The required value is $m=3$.`, R`The direction vector must be parallel to the normal, so $\frac{1}{2}=\frac{m}{6}$ and $m=3$.`],
      [R`Find $m$ so that the line with direction vector $(1;\ -1;\ 2)$ is parallel to the plane with normal $(1;\ m;\ -1)$ (a point of the line is not on the plane).`, R`The required value is $m=-1$.`, R`We need $\vec u\cdot\vec n=1-m-2=0$, so $m=-1$.`],
      [R`Find the angle between the line with direction vector $(1;\ 0;\ \sqrt3)$ and the plane $z=0$ in degrees.`, R`The angle is $60$ degrees.`, R`The normal $(0;\ 0;\ 1)$ gives $\sin\varphi=\frac{\sqrt3}{2}$, that is $\varphi=60^\circ$.`],
    ],
  },
};
