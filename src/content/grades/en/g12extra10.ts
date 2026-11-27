/** Bản tiếng Anh của lớp 12 chi tiết, phần mười: ứng dụng vectơ trong không gian (lop12extra10.ts). */
import type { LessonEn } from "./types.ts";

const R = String.raw;

export const g12Extra10En: Record<string, LessonEn> = {
  "chung-minh-vecto-kg": {
    s: R`Three points $A$, $B$, $C$ are collinear when $\overrightarrow{AB}=k\overrightarrow{AC}$. The lines $AB$ and $CD$ are parallel when $\overrightarrow{AB}=k\overrightarrow{CD}$ and $A$ does not lie on the line $CD$. Four points $A$, $B$, $C$, $D$ are coplanar when $\overrightarrow{AD}=x\overrightarrow{AB}+y\overrightarrow{AC}$ for two numbers $x$, $y$. Each vector of the figure should be written with three non-coplanar edge vectors and the coefficients compared.`,
    w: R`Writing every vector with the same three edge vectors turns a geometric claim into a comparison of coefficients, which can be checked line by line without drawing auxiliary segments.`,
    p: R`Forgetting to rule out that the two lines coincide when proving parallelism, or using vectors that do not start at the same point when testing coplanarity.`,
    ex: [
      [R`Let $ABCD$ be a tetrahedron, $M$ the midpoint of $AB$, $N$ the midpoint of $CD$ and $G$ the midpoint of $MN$. Show that $\overrightarrow{GA}+\overrightarrow{GB}+\overrightarrow{GC}+\overrightarrow{GD}=\vec{0}$.`, [
        [R`Since $M$ is the midpoint of $AB$ we have $\overrightarrow{GA}+\overrightarrow{GB}=2\overrightarrow{GM}$.`, R`The sum of the vectors from one point to the two endpoints of a segment is twice the vector to its midpoint.`],
        [R`Similarly $\overrightarrow{GC}+\overrightarrow{GD}=2\overrightarrow{GN}$.`, R`Apply the same property to the midpoint $N$ of $CD$.`],
        [R`Adding the two equalities gives $2\left(\overrightarrow{GM}+\overrightarrow{GN}\right)=\vec{0}$ because $G$ is the midpoint of $MN$.`, R`The vectors $\overrightarrow{GM}$ and $\overrightarrow{GN}$ are opposite when $G$ lies exactly halfway.`],
      ], R`The sum of the four vectors is $\vec{0}$, that is $G$ is the centroid of the tetrahedron.`],
      [R`Let $ABCD.A'B'C'D'$ be a parallelepiped. Show that the four points $A$, $B$, $C'$, $D'$ are coplanar.`, [
        [R`Put $\vec a=\overrightarrow{AB}$, $\vec b=\overrightarrow{AD}$, $\vec c=\overrightarrow{AA'}$; then $\overrightarrow{AC'}=\vec a+\vec b+\vec c$ and $\overrightarrow{AD'}=\vec b+\vec c$.`, R`Write the vectors under study with the three non-coplanar edge vectors of the parallelepiped.`],
        [R`Hence $\overrightarrow{AD'}=\overrightarrow{AC'}-\overrightarrow{AB}$, so $\overrightarrow{AD'}$ is a combination of $\overrightarrow{AB}$ and $\overrightarrow{AC'}$.`, R`A linear combination of two vectors with the same origin shows that the three vectors are coplanar.`],
      ], R`The four points $A$, $B$, $C'$, $D'$ are coplanar.`],
    ],
    dr: [
      [R`Let $G$ be the centroid of triangle $ABC$ and $O$ any point, with $\overrightarrow{OA}+\overrightarrow{OB}+\overrightarrow{OC}=k\overrightarrow{OG}$. Find $k$.`, R`The required value is $k=3$.`, R`Since $\overrightarrow{OG}=\frac13\left(\overrightarrow{OA}+\overrightarrow{OB}+\overrightarrow{OC}\right)$ we get $k=3$.`],
      [R`Let $ABCD.A'B'C'D'$ be a parallelepiped with $\overrightarrow{AC'}=\overrightarrow{AB}+\overrightarrow{AD}+x\overrightarrow{AA'}$. Find $x$.`, R`The required value is $x=1$.`, R`The diagonal $AC'$ is the sum of the three edge vectors, each with coefficient $1$.`],
      [R`Let $ABCD.A'B'C'D'$ be a parallelepiped. Decide whether each statement is true or false.`, R`Statements a and b are true, statements c and d are false.`, R`Taking $A$ as the origin, the three vectors from $A$ to $B'$, $C$, $D'$ have determinant $2$, which is different from $0$, so they are not coplanar, and $\overrightarrow{BD'}=-\overrightarrow{AB}+\overrightarrow{AD}+\overrightarrow{AA'}$ so statement c is false.`, [], [R`We have $\overrightarrow{AC'}=\overrightarrow{AB}+\overrightarrow{AD}+\overrightarrow{AA'}$.`, R`The four points $A$, $B$, $C'$, $D'$ are coplanar.`, R`We have $\overrightarrow{BD'}=\overrightarrow{AB}+\overrightarrow{AD}+\overrightarrow{AA'}$.`, R`The four points $A$, $B'$, $C$, $D'$ are coplanar.`]],
    ],
  },
  "tinh-goc-do-dai-vecto": {
    s: R`The square of a length is a dot square: $AB^2=\overrightarrow{AB}\cdot\overrightarrow{AB}$. The dot product is $\vec a\cdot\vec b=\left|\vec a\right|\left|\vec b\right|\cos\left(\vec a,\vec b\right)$, and the angle $\varphi$ between two lines satisfies $\cos\varphi=\frac{\left|\vec u\cdot\vec v\right|}{\left|\vec u\right|\left|\vec v\right|}$. To compute, we write the two vectors with three edge vectors whose lengths and pairwise angles are known, then expand the dot product.`,
    w: R`Once every vector is written with the same three edge vectors, the dot product reduces to a few known products, so lengths and angles can be found without constructing any perpendicular.`,
    p: R`Dropping the absolute value for the angle between two lines, or treating the angle between two vectors of a triangle as the angle of the triangle when the vectors do not start at the same point.`,
    ex: [
      [R`Let $ABCD$ be a regular tetrahedron with edge $1$. Find the angle between the lines $AB$ and $CD$.`, [
        [R`Write $\overrightarrow{CD}=\overrightarrow{AD}-\overrightarrow{AC}$, so $\overrightarrow{AB}\cdot\overrightarrow{CD}=\overrightarrow{AB}\cdot\overrightarrow{AD}-\overrightarrow{AB}\cdot\overrightarrow{AC}$.`, R`Rewrite the vector $\overrightarrow{CD}$ with vectors that start at $A$ like $\overrightarrow{AB}$.`],
        [R`Each dot product equals $1\cdot1\cdot\cos60^\circ=\frac12$, so the difference is $0$.`, R`Every angle at the vertex $A$ in the equilateral faces equals $60^\circ$.`],
      ], R`The lines $AB$ and $CD$ are perpendicular.`],
      [R`Let $ABCD.A'B'C'D'$ be a cube with edge $1$. Find the cosine of the angle between the diagonals $AC'$ and $BD'$.`, [
        [R`Put $\vec a=\overrightarrow{AB}$, $\vec b=\overrightarrow{AD}$, $\vec c=\overrightarrow{AA'}$; then $\overrightarrow{AC'}=\vec a+\vec b+\vec c$ and $\overrightarrow{BD'}=-\vec a+\vec b+\vec c$.`, R`The three edge vectors are pairwise perpendicular and have length $1$.`],
        [R`The dot product is $-1+1+1=1$ and each vector has length $\sqrt3$.`, R`The mixed dot products among $\vec a$, $\vec b$, $\vec c$ all equal $0$.`],
        [R`Therefore $\cos\varphi=\frac{1}{\sqrt3\cdot\sqrt3}=\frac13$.`, R`Apply the cosine formula with the absolute value of the dot product.`],
      ], R`The cosine of the angle between the two diagonals equals $\frac13$.`],
    ],
    dr: [
      [R`Let $ABCD.A'B'C'D'$ be a cube with edge $1$. Compute $\overrightarrow{AC}\cdot\overrightarrow{AC'}$.`, R`The dot product equals $2$.`, R`We have $\overrightarrow{AC}=\vec a+\vec b$ and $\overrightarrow{AC'}=\vec a+\vec b+\vec c$, so the dot product is $1+1=2$.`],
      [R`Let $ABCD$ be a regular tetrahedron with edge $2$. Compute $\overrightarrow{AB}\cdot\overrightarrow{AC}$.`, R`The dot product equals $2$.`, R`The dot product equals $2\cdot2\cdot\cos60^\circ=2$.`],
      [R`Let $ABCD.A'B'C'D'$ be a cube with edge $1$. What is the cosine of the angle between the diagonals $AC'$ and $BD'$?`, R`The cosine equals $\frac13$.`, R`The dot product equals $1$ and each diagonal has length $\sqrt3$, so the cosine equals $\frac13$.`, [], [R`$\frac13$`, R`$\frac{\sqrt3}{3}$`, R`$\frac12$`]],
    ],
  },
  "toa-do-hoa-hinh": {
    s: R`When a vertex has three pairwise perpendicular edges, we take that vertex as the origin $O$ and put the three edges along the three axes. Every vertex then has coordinates, and angles, distances and volumes are found with Oxyz formulas. This method replaces construction when a perpendicular is hard to draw.`,
    w: R`Coordinates turn each geometric condition into an equation, so no auxiliary construction is needed; the only creative step is choosing an origin at a vertex with three perpendicular edges.`,
    p: R`Choosing axes that are not perpendicular, or placing a vertex at the wrong height so that the coordinates do not match the lengths given in the problem.`,
    ex: [
      [R`Let $S.ABCD$ be a pyramid whose base is a square of side $2$, with $SA$ perpendicular to the base and $SA=2$. Find the distance from $A$ to the plane $(SBD)$.`, [
        [R`Put $A(0;\ 0;\ 0)$, $B(2;\ 0;\ 0)$, $D(0;\ 2;\ 0)$ and $S(0;\ 0;\ 2)$.`, R`The three edges $AB$, $AD$, $AS$ are pairwise perpendicular, so we place them along the three axes.`],
        [R`The plane $(SBD)$ meets the three axes at $2$, $2$, $2$ so its equation is $x+y+z-2=0$.`, R`We use the intercept form because the three intersections with the axes are known.`],
        [R`The distance from $A$ is $\frac{\left|-2\right|}{\sqrt3}=\frac{2\sqrt3}{3}$.`, R`Substitute the coordinates of $A$ into the left side and divide by the length of the normal.`],
      ], R`The distance equals $\frac{2\sqrt3}{3}$.`],
      [R`For the pyramid in the previous example, show that $SC$ is perpendicular to $BD$.`, [
        [R`We have $C(2;\ 2;\ 0)$, so $\overrightarrow{SC}=(2;\ 2;\ -2)$ and $\overrightarrow{BD}=(-2;\ 2;\ 0)$.`, R`Subtract the coordinates of the starting point from those of the end point.`],
        [R`The dot product is $-4+4+0=0$, so the two lines are perpendicular.`, R`Two lines are perpendicular when the dot product of their direction vectors is $0$.`],
      ], R`The lines $SC$ and $BD$ are perpendicular.`],
    ],
    dr: [
      [R`The pyramid $S.ABC$ has $SA$, $AB$, $AC$ pairwise perpendicular with $SA=AB=AC=1$. Find its volume.`, R`The volume equals $\frac16$.`, R`Taking $A$ as the origin, the determinant of the three edge vectors is $1$, so the volume is $\frac16$.`],
      [R`For the pyramid above, the plane $(SBC)$ has equation $x+y+z-1=0$. Compute $\overrightarrow{AS}\cdot\vec n$ with $\vec n=(1;\ 1;\ 1)$ and $S(0;\ 0;\ 1)$.`, R`The dot product equals $1$.`, R`We have $\overrightarrow{AS}=(0;\ 0;\ 1)$, so its dot product with $(1;\ 1;\ 1)$ is $1$.`],
      [R`For the pyramid above, what are the coordinates of the centroid of triangle $SBC$?`, R`The centroid is $\left(\frac13;\ \frac13;\ \frac13\right)$.`, R`With $S(0;\ 0;\ 1)$, $B(1;\ 0;\ 0)$, $C(0;\ 1;\ 0)$ each coordinate of the centroid equals $\frac{1}{3}$.`, [], [R`$\left(\frac13;\ \frac13;\ \frac13\right)$`, R`$\left(\frac12;\ \frac12;\ \frac12\right)$`, R`$\left(1;\ 1;\ 1\right)$`]],
    ],
  },
};
