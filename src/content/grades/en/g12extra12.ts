/** Bản tiếng Anh của lớp 12 chi tiết, phần mười hai: hai bài vận dụng cao (lop12extra12.ts). */
import type { LessonEn } from "./types.ts";

const R = String.raw;

export const g12Extra12En: Record<string, LessonEn> = {
  "vdc-dung-hinh-oxyz": {
    s: R`A line that meets $d_2$ at $M$ has $M$ with coordinates given by the parameter of $d_2$, and the remaining conditions become equations for that parameter; for instance the line through $A$, perpendicular to $d_1$ and meeting $d_2$ has direction vector $\overrightarrow{AM}$ with $\overrightarrow{AM}\cdot\vec{u_1}=0$. A sphere through $A$, $B$ with centre $I$ on a line $d$ satisfies $IA=IB$, which fixes the position of $I$ on $d$, and then $R=IA$.`,
    w: R`Each geometric condition becomes one equation in the same unknown, so a problem with several conditions reduces to solving a single equation in one parameter; the only care needed is to use the parameter of the right object.`,
    p: R`Using the same letter for the parameters of two different lines, or forgetting to check that the point found really lies on both required objects.`,
    ex: [
      [R`Let $A(0;\ 0;\ 0)$, $d_1:\ x=t;\ y=t;\ z=1$ and $d_2:\ x=1+s;\ y=1-2s;\ z=s$. Write the line through $A$ perpendicular to $d_1$ and meeting $d_2$.`, [
        [R`Let $M(1+s;\ 1-2s;\ s)$ be the intersection with $d_2$, so $\overrightarrow{AM}=(1+s;\ 1-2s;\ s)$.`, R`The intersection point lies on $d_2$, so its coordinates are given by the parameter $s$.`],
        [R`The direction vector of $d_1$ is $\vec{u_1}=(1;\ 1;\ 0)$ and the condition $\overrightarrow{AM}\cdot\vec{u_1}=0$ gives $(1+s)+(1-2s)=0$, so $s=2$.`, R`Being perpendicular to $d_1$ means that the dot product of the two direction vectors is zero.`],
        [R`Then $M(3;\ -3;\ 2)$ and the required line is $x=3k;\ y=-3k;\ z=2k$.`, R`The line passes through $A$ with direction vector $\overrightarrow{AM}$.`],
      ], R`The required line is $x=3k;\ y=-3k;\ z=2k$.`],
      [R`Write the equation of the sphere through $A(0;\ 0;\ 0)$ and $B(2;\ 2;\ 0)$ whose centre lies on the line $d:\ x=t;\ y=t;\ z=2t$.`, [
        [R`The centre is $I(t;\ t;\ 2t)$, and $IA^2=6t^2$, $IB^2=2(t-2)^2+4t^2$.`, R`Express the squared distances from the centre to the two points with the parameter.`],
        [R`Setting $IA^2=IB^2$ gives $6t^2=6t^2-8t+8$, so $t=1$ and $I(1;\ 1;\ 2)$.`, R`The two squares $t^2$ cancel so the remaining equation is linear.`],
        [R`The radius satisfies $R^2=IA^2=1+1+4=6$.`, R`The radius equals the distance from the centre to a point of the sphere.`],
      ], R`The sphere is $(x-1)^2+(y-1)^2+(z-2)^2=6$.`],
    ],
    dr: [
      [R`Let $A(0;\ 0;\ 0)$, $\vec{u_1}=(1;\ 0;\ 1)$ and $d_2:\ x=s;\ y=3;\ z=2-3s$. The line through $A$ perpendicular to $\vec{u_1}$ and meeting $d_2$ at $M$ corresponds to which value of $s$?`, R`The required value is $s=1$.`, R`The condition $\overrightarrow{AM}\cdot\vec{u_1}=s+(2-3s)=2-2s=0$ gives $s=1$.`],
      [R`A sphere with centre $I(1;\ 1;\ 2)$ passes through $A(0;\ 0;\ 0)$. Find $R^2$.`, R`The required value is $R^2=6$.`, R`We have $R^2=IA^2=1+1+4=6$.`],
      [R`Let $A(0;\ 0;\ 0)$, $B(2;\ 2;\ 0)$ and let $(S)$ be the sphere with centre $I(1;\ 1;\ 2)$ and $R^2=6$. Decide whether each statement is true or false.`, R`Statements a, b and d are true, statement c is false.`, R`We have $IA=IB=\sqrt6$ so $A$, $B$ lie on $(S)$, the point $C(0;\ 0;\ 2)$ has $IC^2=2\ne6$, and the plane $z=0$ is at distance $2$ from the centre so it cuts in a circle with $r^2=6-4=2$.`, [], [R`The sphere passes through $A$.`, R`The sphere passes through $B$.`, R`The sphere passes through the point $C(0;\ 0;\ 2)$.`, R`The plane $z=0$ meets the sphere in a circle whose squared radius equals $2$.`]],
    ],
  },
  "vdc-cuc-tri-binh-phuong": {
    s: R`For two points $A$, $B$ with midpoint $I$ of $AB$ we have $MA^2+MB^2=2MI^2+\frac{AB^2}{2}$. In general, for positive numbers $w_i$ with sum $W$ and a point $K$ with $\sum w_i\overrightarrow{KP_i}=\vec{0}$ we have $\sum w_iMP_i^2=W\cdot MK^2+\sum w_iKP_i^2$. Hence when $M$ moves in a plane $(P)$, the sum is least when $M$ is the projection of $K$ onto $(P)$.`,
    w: R`The weighted centre $K$ absorbs the linear terms, so the sum of weighted squares splits into a part that depends on $M$ only through $MK^2$ and a constant; minimising the sum is therefore the same as minimising the distance from $M$ to $K$.`,
    p: R`Using the midpoint when the weights are not equal, or forgetting to add the constant term after finding the least distance.`,
    ex: [
      [R`Let $(P):\ x+y+z-3=0$, $A(1;\ 2;\ 3)$ and $B(3;\ 0;\ 1)$. Find the least value of $MA^2+MB^2$ for $M\in(P)$ and the corresponding point $M$.`, [
        [R`The midpoint is $I(2;\ 1;\ 2)$ and $AB^2=4+4+4=12$, so $MA^2+MB^2=2MI^2+6$.`, R`Use the median formula to reduce the sum to a single distance.`],
        [R`The left side of $(P)$ at $I$ equals $2$, so $d\left(I;\ (P)\right)=\frac{2}{\sqrt3}$ and $MI^2\ge\frac43$.`, R`The distance from $I$ to the plane is the least value of $MI$.`],
        [R`The least value is $2\cdot\frac43+6=\frac{26}{3}$, attained at the projection $M=I-\frac23(1;\ 1;\ 1)=\left(\frac43;\ \frac13;\ \frac43\right)$.`, R`Equality holds when $M$ is the foot of the perpendicular from $I$ to the plane.`],
      ], R`The least value is $\frac{26}{3}$, attained at $M\left(\frac43;\ \frac13;\ \frac43\right)$.`],
      [R`Let $(P):\ z=0$, $A(0;\ 0;\ 3)$ and $B(3;\ 0;\ 0)$. Find the least value of $MA^2+2MB^2$ for $M\in(P)$.`, [
        [R`The point $K$ with $\overrightarrow{KA}+2\overrightarrow{KB}=\vec{0}$ is $K=\frac{A+2B}{3}=(2;\ 0;\ 1)$.`, R`The weight of $A$ is one and that of $B$ is two, so $K$ divides $AB$ in the inverse ratio.`],
        [R`We have $KA^2=8$ and $KB^2=2$, so $MA^2+2MB^2=3MK^2+8+2\cdot2=3MK^2+12$.`, R`Apply the weighted sum of squares formula with total weight three.`],
        [R`The distance from $K$ to $(P)$ equals $1$, so the least value is $3\cdot1+12=15$.`, R`Replace the least $MK$ by the distance from $K$ to the plane.`],
      ], R`The least value equals $15$, attained at $M(2;\ 0;\ 0)$.`],
    ],
    dr: [
      [R`Let $(P):\ z=1$, $A(0;\ 0;\ 0)$ and $B(2;\ 0;\ 0)$. Find the least value of $MA^2+MB^2$ for $M\in(P)$.`, R`The least value equals $4$.`, R`The midpoint $I(1;\ 0;\ 0)$ is at distance $1$ from $(P)$ and $AB^2=4$, so the least value is $2\cdot1+\frac42=4$.`],
      [R`Let $(P):\ z=0$ and the three points $A(3;\ 0;\ 3)$, $B(0;\ 3;\ 3)$, $C(0;\ 0;\ 3)$ with centroid $G(1;\ 1;\ 3)$. Find the least value of $MA^2+MB^2+MC^2$ for $M\in(P)$.`, R`The least value equals $39$.`, R`We have $GA^2=5$, $GB^2=5$, $GC^2=2$ and $G$ is at distance $3$ from $(P)$, so the least value is $3\cdot9+12=39$.`],
      [R`Given a plane $(P)$ and two points $A$, $B$, for which point $M$ is $MA^2+MB^2$ with $M\in(P)$ least?`, R`When $M$ is the projection of the midpoint of $AB$ onto $(P)$.`, R`Since $MA^2+MB^2=2MI^2+\frac{AB^2}{2}$ with $I$ the midpoint of $AB$, the sum is least when $MI$ is least.`, [], [R`The projection of the midpoint of $AB$ onto $(P)$.`, R`The intersection of $AB$ with $(P)$.`, R`The projection of $A$ onto $(P)$.`]],
    ],
  },
};
