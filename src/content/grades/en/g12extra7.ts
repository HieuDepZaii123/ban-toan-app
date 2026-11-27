/** Bản tiếng Anh của lớp 12 chi tiết, phần bảy: đường thẳng trong Oxyz (lop12extra7.ts). */
import type { LessonEn } from "./types.ts";

const R = String.raw;

export const g12Extra7En: Record<string, LessonEn> = {
  "vtt-hai-dt": {
    s: R`Let $d_1$ pass through $A$ with direction vector $\vec{u_1}$ and $d_2$ pass through $B$ with direction vector $\vec{u_2}$. If $\vec{u_1}$, $\vec{u_2}$ are parallel the lines are parallel or coincide, and they coincide when $A$ lies on $d_2$. If they are not parallel, the lines meet when $\left[\vec{u_1},\vec{u_2}\right]\cdot\overrightarrow{AB}=0$ and are skew when this product is different from $0$.`,
    w: R`Parallel direction vectors give parallel or coincident lines; otherwise a scalar triple product equal to $0$ means the two direction vectors and the vector joining the points are coplanar, so the lines meet, while a product different from $0$ means they are skew.`,
    p: R`Concluding that lines are parallel just because the direction vectors are parallel without checking whether they coincide, or calling skew lines parallel.`,
    ex: [
      [R`Let $d_1$ pass through $A(1;\ 2;\ 3)$ with direction vector $\vec{u_1}=(2;\ -1;\ 1)$. Consider $d_2$ through $B(3;\ 1;\ 4)$ with direction vector $(4;\ -2;\ 2)$ and $d_3$ through $C(1;\ 0;\ -1)$ with direction vector $(1;\ 2;\ 0)$. Find the relative position of $d_1$ with each line.`, [
        [R`The direction vector of $d_2$ is twice $\vec{u_1}$, so the lines are parallel or coincide.`, R`Parallel vectors mean the two lines cannot meet at a single point.`],
        [R`For $t=1$ on $d_1$ we get $(3;\ 1;\ 4)=B$, so $B\in d_1$ and the lines coincide.`, R`One common point is enough to conclude that two parallel lines coincide.`],
        [R`For $d_3$: $\left[\vec{u_1},\vec{u_3}\right]=(-2;\ 1;\ 5)$ and $\overrightarrow{AC}=(0;\ -2;\ -4)$, and the scalar triple product is $-22$.`, R`The directions are not parallel, so we use the scalar triple product with the vector joining the points.`],
        [R`The scalar triple product is different from $0$, so $d_1$ and $d_3$ are skew.`, R`A scalar triple product equal to $0$ is the condition for the lines to lie in one plane.`],
      ], R`The line $d_1$ coincides with $d_2$ and is skew to $d_3$.`],
      [R`What is the relative position of $d:\ x=1+t,\ y=2,\ z=3-t$ and $d':\ x=2+s,\ y=2+s,\ z=2$?`, [
        [R`The direction vectors $(1;\ 0;\ -1)$ and $(1;\ 1;\ 0)$ are not parallel.`, R`The two sets of coefficients are not proportional, so the lines are not parallel.`],
        [R`From $y=2$ we get $s=0$; then $d'$ passes through $(2;\ 2;\ 2)$, and $t=1$ on $d$ gives the same point.`, R`A point common to both lines means that they meet.`],
      ], R`The lines meet at $(2;\ 2;\ 2)$.`],
    ],
    dr: [
      [R`Let $d_1$ pass through $A(0;\ 0;\ 0)$ with direction vector $(1;\ 0;\ 1)$ and $d_2$ through $B(1;\ 1;\ 0)$ with direction vector $(0;\ 1;\ 1)$. Compute $\left[\vec{u_1},\vec{u_2}\right]\cdot\overrightarrow{AB}$.`, R`The result is $-2$, so the lines are skew.`, R`The cross product is $(-1;\ -1;\ 1)$ and $\overrightarrow{AB}=(1;\ 1;\ 0)$, so the dot product is $-2$.`],
      [R`The lines $d:\ x=t,\ y=t,\ z=2t$ and $d':\ x=1+s,\ y=1+s,\ z=m+2s$. Find $m$ so that the lines coincide.`, R`The required value is $m=2$.`, R`The direction vectors are equal; the point $(1;\ 1;\ m)$ lies on $d$ for $t=1$, so $z=2$ and $m=2$.`],
      [R`What is the relative position of $d:\ x=1+t,\ y=1,\ z=2-t$ and $d':\ x=s,\ y=1+s,\ z=3+s$?`, R`The lines meet at the point $(0;\ 1;\ 3)$.`, R`The directions are not parallel; from $y=1$ we get $s=0$, and the point $(0;\ 1;\ 3)$ corresponds to $t=-1$ on $d$.`, [], ["The lines coincide.", "The lines are parallel.", "The lines intersect.", "The lines are skew."]],
      [R`Let $d_1$ pass through $A(0;\ 0;\ 0)$ with direction vector $(1;\ 0;\ 1)$ and $d_2$ pass through $B(1;\ 1;\ 0)$ with direction vector $(0;\ 1;\ 1)$. Decide whether each statement is true or false.`, R`Statements a and c are true, statements b and d are false.`, R`The scalar triple product equals $-2$, which is different from $0$, so the lines are skew: they do not meet and do not lie in one plane.`, [], [R`The lines are not parallel because the direction vectors are not parallel.`, R`The lines meet.`, R`The scalar triple product $\left[\vec{u_1},\vec{u_2}\right]\cdot\overrightarrow{AB}$ equals $-2$.`, R`The lines lie in one plane.`]],
    ],
  },
  "giao-hai-dt": {
    s: R`To find the intersection of $d$ and $d'$ we equate two coordinates and solve the system in the two unknowns $t$, $s$, then substitute into the remaining coordinate to check. The system has exactly one solution satisfying all three equations when the lines meet; when the lines are skew, the solution of the first two equations fails the third, and when they are parallel the first two equations have no solution. A problem with a parameter $m$ usually reduces to making all three equations hold for one pair $(t;\ s)$.`,
    w: R`An intersection point has the same coordinates on both lines, so the two parameters must satisfy all three equations at once; the first two equations find the parameters and the third is a check.`,
    p: R`Using the same letter $t$ for both lines, or forgetting to test the third equation and wrongly accepting skew lines as meeting.`,
    ex: [
      [R`Find the intersection of $d:\ x=1+t,\ y=2-t,\ z=3+2t$ and $d':\ x=2+s,\ y=1+s,\ z=5-s$.`, [
        [R`Equate $x$ and $y$: $1+t=2+s$ and $2-t=1+s$.`, R`The first two equations give a system in the unknowns $t$, $s$.`],
        [R`Adding the equations gives $3=3+2s$, so $s=0$ and $t=1$.`, R`Add the sides to eliminate $t$ and then find $s$.`],
        [R`Check the $z$-coordinate: $3+2\cdot1=5$ and $5-0=5$, which agree.`, R`The third equation must hold for the lines to really meet.`],
      ], R`The intersection is $(2;\ 1;\ 5)$.`],
      [R`Find $m$ so that $d:\ x=1+t,\ y=2-t,\ z=m+t$ meets $d':\ x=2+s,\ y=1+s,\ z=3-s$.`, [
        [R`The first two equations are the same as above and give $s=0$ and $t=1$.`, R`The lines meet only if this pair $(t;\ s)$ also satisfies the third equation.`],
        [R`The third equation gives $m+1=3-0$, so $m=2$.`, R`Substitute $t=1$ and $s=0$ into the $z$-coordinate.`],
      ], R`The lines meet when $m=2$.`],
    ],
    dr: [
      [R`The lines $d:\ x=t,\ y=1+t,\ z=2t$ and $d':\ x=2+s,\ y=3-s,\ z=4+s$ meet. Find the abscissa of the intersection.`, R`The abscissa is $2$.`, R`From $t=2+s$ and $1+t=3-s$ we get $s=0$ and $t=2$, so the abscissa is $2$.`],
      [R`The lines $d:\ x=1+t,\ y=t,\ z=m$ and $d':\ x=1+s,\ y=2-s,\ z=1+s$ meet. Find $m$.`, R`The required value is $m=2$.`, R`From $t=s$ and $t=2-s$ we get $s=1$, then $z=1+1=2$ so $m=2$.`],
      [R`The lines $d:\ x=2t,\ y=1+t,\ z=3$ and $d':\ x=1+s,\ y=2s,\ z=3$ meet. Find the value of $t$ at the intersection.`, R`The required value is $t=1$.`, R`From $2t=1+s$ and $1+t=2s$ we get $s=2t-1$ and then $3t=3$, so $t=1$.`],
    ],
  },
  "duong-cat-hai-dt": {
    s: R`The line through a point $A$ not on $d_1$ or $d_2$ and meeting those two lines is built by taking $P\in d_1$ and $Q\in d_2$ with parameters and requiring $A$, $P$, $Q$ to be collinear, that is $\overrightarrow{AP}=k\overrightarrow{AQ}$. The common perpendicular of two skew lines meets both and is perpendicular to both: $\overrightarrow{PQ}$ must be perpendicular to $\vec{u_1}$ and $\vec{u_2}$, so both dot products equal $0$.`,
    w: R`A line meeting both lines passes through one point of each, so collinearity of three points gives two conditions, enough to find two parameters; for the common perpendicular, collinearity is replaced by two perpendicularity conditions.`,
    p: R`Choosing the same parameter for both lines, or forgetting that the common perpendicular is unique only when the two lines are skew.`,
    ex: [
      [R`Let $d_1:\ x=t,\ y=0,\ z=0$ and $d_2:\ x=0,\ y=s,\ z=1$. Write the line through $A(2;\ 1;\ 2)$ meeting both lines.`, [
        [R`Take $P(t;\ 0;\ 0)\in d_1$ and $Q(0;\ s;\ 1)\in d_2$; then $\overrightarrow{AP}=(t-2;\ -1;\ -2)$ and $\overrightarrow{AQ}=(-2;\ s-1;\ -1)$.`, R`Three points are collinear when these two vectors are parallel.`],
        [R`Setting $\overrightarrow{AP}=k\overrightarrow{AQ}$: the $z$-coordinate gives $-2=-k$, so $k=2$.`, R`The $z$-coordinate has no parameter, so it gives the ratio at once.`],
        [R`From $t-2=-4$ we get $t=-2$, and from $-1=2(s-1)$ we get $s=\frac12$.`, R`Use the $x$ and $y$ coordinates in turn to find $t$ and $s$.`],
        [R`A direction vector is $-2\overrightarrow{AQ}$, that is $(4;\ 1;\ 2)$, so the line is $x=2+4k,\ y=1+k,\ z=2+2k$.`, R`With the point $A$ and a direction vector we can write the equations.`],
      ], R`The required line is $x=2+4k,\ y=1+k,\ z=2+2k$.`],
      [R`Find the common perpendicular of $d_1:\ x=t,\ y=0,\ z=0$ and $d_2:\ x=1+s,\ y=s,\ z=1$.`, [
        [R`Take $P(t;\ 0;\ 0)$ and $Q(1+s;\ s;\ 1)$; then $\overrightarrow{PQ}=(1+s-t;\ s;\ 1)$.`, R`The two feet of the common perpendicular lie on the two lines.`],
        [R`Perpendicularity to $\vec{u_1}=(1;\ 0;\ 0)$ gives $t=1+s$.`, R`The dot product with $\vec{u_1}$ keeps only the $x$-component.`],
        [R`Perpendicularity to $\vec{u_2}=(1;\ 1;\ 0)$ gives $(1+s-t)+s=0$, so $s=0$ and $t=1$.`, R`Substitute $t=1+s$ and solve the equation in $s$.`],
      ], R`The feet of the common perpendicular are $P(1;\ 0;\ 0)$ and $Q(1;\ 0;\ 1)$, so the line is $x=1,\ y=0$ and its length is $PQ=1$.`],
    ],
    dr: [
      [R`With $d_1$, $d_2$ and $A(2;\ 1;\ 2)$ as in the first example, the line through $A$ meets $d_2$ at $Q(0;\ s;\ 1)$. Find $s$.`, R`The required value is $s=\frac12$.`, R`From $-1=2(s-1)$ we get $s-1=-\frac12$, so $s=\frac12$.`],
      [R`The common perpendicular of $d_1$ and $d_2$ in the second example meets $d_1$ at $P(t;\ 0;\ 0)$. Find $t$.`, R`The required value is $t=1$.`, R`From $s=0$ and $t=1+s$ we get $t=1$.`],
      [R`Find the distance between $d_1$ through $O$ with direction vector $(1;\ 0;\ 0)$ and $d_2$ through $B(1;\ 0;\ 1)$ with direction vector $(1;\ 1;\ 0)$.`, R`The distance is $1$.`, R`The cross product $(0;\ 0;\ 1)$ has length $1$ and its dot product with $\overrightarrow{OB}$ is $1$, so the distance is $\frac11=1$.`],
    ],
  },
  "dt-trong-mp": {
    s: R`A line $\Delta$ inside $(P)$ has a direction vector perpendicular to the normal $\vec n$ of $(P)$. If $\Delta$ is also perpendicular to the line $d$ with direction vector $\vec u$, and $\vec n$ is not parallel to $\vec u$, the direction vector of $\Delta$ is $\left[\vec n,\vec u\right]$. When $d$ is not perpendicular to $(P)$, the projection of $d$ onto $(P)$ is the intersection of $(P)$ with the plane $(Q)$ containing $d$ and perpendicular to $(P)$, where the normal of $(Q)$ is $\left[\vec u,\vec n\right]$.`,
    w: R`A line inside a plane must be perpendicular to the normal, and being perpendicular to another line as well makes its direction the cross product of the two vectors. The projection is the intersection of the original plane with the plane containing the line and perpendicular to it.`,
    p: R`Swapping the order in the cross product when the orientation of the vector matters, or forgetting to check that the point used really lies in the plane.`,
    ex: [
      [R`Let $(P):\ x+y+z-6=0$ and $d:\ x=1+t,\ y=2+2t,\ z=3$. Write the line $\Delta$ inside $(P)$ that passes through the intersection of $d$ with $(P)$ and is perpendicular to $d$.`, [
        [R`Substituting $d$ into $(P)$: $1+t+2+2t+3-6=3t=0$ so $t=0$ and the intersection is $M(1;\ 2;\ 3)$.`, R`The intersection corresponds to the value of $t$ that makes the plane equation equal $0$.`],
        [R`A direction vector of $\Delta$ is $\left[\vec n,\vec u\right]=(-2;\ 1;\ 1)$ with $\vec n=(1;\ 1;\ 1)$ and $\vec u=(1;\ 2;\ 0)$.`, R`This vector is perpendicular to both the normal and the direction vector of $d$.`],
        [R`Therefore $\Delta:\ x=1-2k,\ y=2+k,\ z=3+k$.`, R`With the point $M$ and a direction vector we can write the equations.`],
      ], R`The required line is $x=1-2k,\ y=2+k,\ z=3+k$.`],
      [R`With $(P)$ and $d$ as in the previous example, write the projection of $d$ onto $(P)$.`, [
        [R`The normal of $(Q)$ is $\left[\vec u,\vec n\right]=(2;\ -1;\ -1)$, and $(Q)$ passes through $M(1;\ 2;\ 3)$, so $2x-y-z+3=0$.`, R`Substitute $M$ to find the constant: $2-2-3+d=0$ gives $d=3$.`],
        [R`A direction vector of the intersection line is $\left[\vec{n_P},\vec{n_Q}\right]=(0;\ 3;\ -3)$, and we choose $(0;\ 1;\ -1)$.`, R`The intersection of two planes is perpendicular to both normals.`],
      ], R`The projection of $d$ is $x=1,\ y=2+k,\ z=3-k$.`],
    ],
    dr: [
      [R`The plane $(P):\ z-3=0$ has normal $(0;\ 0;\ 1)$ and the line $d$ has direction vector $(1;\ 2;\ 1)$. A direction vector of a line inside $(P)$ and perpendicular to $d$ has the form $(a;\ 1;\ 0)$. Find $a$.`, R`The required value is $a=-2$.`, R`The cross product $\left[(0;\ 0;\ 1),(1;\ 2;\ 1)\right]=(-2;\ 1;\ 0)$ gives $a=-2$.`],
      [R`The line $d:\ x=2t,\ y=1+t,\ z=3-t$ meets $(P):\ x+y+z-6=0$. Find the value of $t$ at the intersection.`, R`The required value is $t=1$.`, R`Substituting gives $2t+4-6=0$, so $t=1$ and the intersection is $(2;\ 2;\ 2)$.`],
      [R`The plane $(Q)$ contains $d$ with direction vector $(1;\ 0;\ 1)$ and is perpendicular to $(P)$ with normal $(0;\ 1;\ 0)$. Find the third component of the normal $\left[\vec u,\vec n\right]$.`, R`The third component is $1$.`, R`The cross product $\left[(1;\ 0;\ 1),(0;\ 1;\ 0)\right]=(-1;\ 0;\ 1)$ has third component $1$.`],
    ],
  },
};
