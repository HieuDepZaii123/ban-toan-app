/** Bản tiếng Anh của lớp 11 chi tiết, phần ba: vectơ, góc, khoảng cách, tỉ lệ trong không gian (lop11extra3.ts). */
import type { LessonEn } from "./types.ts";

const R = String.raw;

export const g11Extra4En: Record<string, LessonEn> = {
  "quy-tac-vecto-kg": {
    s: R`Triangle rule: $\overrightarrow{AB}+\overrightarrow{BC}=\overrightarrow{AC}$. Parallelogram rule: if $ABCD$ is a parallelogram then $\overrightarrow{AB}+\overrightarrow{AD}=\overrightarrow{AC}$. Box rule: for a box $ABCD.A'B'C'D'$ we have $\overrightarrow{AB}+\overrightarrow{AD}+\overrightarrow{AA'}=\overrightarrow{AC'}$. The point $G$ is the centroid of triangle $ABC$ when $\overrightarrow{GA}+\overrightarrow{GB}+\overrightarrow{GC}=\vec0$.`,
    w: R`Each addition rule is just a way to go from the start point to the end point through intermediate points, and the result does not depend on the path. A box has three edges from one vertex, so the sum of those three vectors is the diagonal through that vertex.`,
    p: R`Adding two vectors where the end of the first is not the start of the second, or using the box rule for three vectors that do not start at the same vertex.`,
    ex: [
      [R`Let $ABCD.A'B'C'D'$ be a cube with edge $1$. Simplify $\overrightarrow{AB}+\overrightarrow{BC}+\overrightarrow{CC'}$ and find its length.`, [
        [R`By the triangle rule on consecutive vectors, the sum is $\overrightarrow{AC'}$.`, R`The end of each vector is the start of the next.`],
        [R`The diagonal of a cube with edge $1$ has length $\sqrt{1+1+1}=\sqrt3$.`, R`Use the formula for the diagonal of a cube.`],
      ], R`The sum is $\overrightarrow{AC'}$ and its length is $\sqrt3$.`],
      [R`Triangle $ABC$ has centroid $G$ and $O$ is any point. Show that $\overrightarrow{OA}+\overrightarrow{OB}+\overrightarrow{OC}=3\overrightarrow{OG}$ with a numerical example.`, [
        [R`Take $O$ as the origin, $A(3;\ 0;\ 0)$, $B(0;\ 3;\ 0)$, $C(0;\ 0;\ 3)$, so $G(1;\ 1;\ 1)$.`, R`The centroid has coordinates equal to the mean of the three vertices.`],
        [R`The sum of the three vectors is $(3;\ 3;\ 3)$, exactly $3\overrightarrow{OG}=(3;\ 3;\ 3)$.`, R`Compare each coordinate of the two sides.`],
      ], R`The relation $\overrightarrow{OA}+\overrightarrow{OB}+\overrightarrow{OC}=3\overrightarrow{OG}$ holds.`],
    ],
    dr: [
      [R`For a box $ABCD.A'B'C'D'$, which vector equals $\overrightarrow{AB}+\overrightarrow{AD}+\overrightarrow{AA'}$?`, R`It equals $\overrightarrow{AC'}$.`, R`By the box rule, the sum of the three edges from $A$ is the diagonal $\overrightarrow{AC'}$.`, [], ["$\\overrightarrow{AC'}$", "$\\overrightarrow{AC}$", "$\\overrightarrow{AB'}$"]],
      [R`The rectangular box $ABCD.A'B'C'D'$ has $AB=3$, $AD=4$, $AA'=12$. Find $\left|\overrightarrow{AB}+\overrightarrow{AD}+\overrightarrow{AA'}\right|$.`, R`The length is $13$.`, R`The sum is $\overrightarrow{AC'}$, so the length is $\sqrt{9+16+144}=13$.`],
      [R`Let $AB=2$ and $AC=4$ be perpendicular at $A$, with $M$ the midpoint of $BC$. Find $AM$ using $\overrightarrow{AM}=\frac12\left(\overrightarrow{AB}+\overrightarrow{AC}\right)$.`, R`The length is $\sqrt5$.`, R`The sum vector has length $\sqrt{4+16}=2\sqrt5$ and half of it is $\sqrt5$.`],
    ],
  },
  "phan-tich-vecto": {
    s: R`In a box $ABCD.A'B'C'D'$, let $\vec a=\overrightarrow{AB}$, $\vec b=\overrightarrow{AD}$, $\vec c=\overrightarrow{AA'}$. Every vector in space can be written uniquely as $x\vec a+y\vec b+z\vec c$. To find the coefficients, go from the start point to the end point along the edges of the box.`,
    w: R`The three edges of a box are three non-coplanar vectors and so form a basis, and every vector from one vertex to another is a path along edges. Reversing the direction of an edge changes the sign of the corresponding coefficient.`,
    p: R`Forgetting to change the sign when going against an edge, as in writing $\overrightarrow{BA}=\vec a$, or leaving out the coefficient $\frac12$ when going to a midpoint.`,
    ex: [
      [R`Express $\overrightarrow{BD'}$ in terms of $\vec a$, $\vec b$, $\vec c$.`, [
        [R`Go from $B$ back to $A$, then to $D$, then up to $D'$: $\overrightarrow{BD'}=\overrightarrow{BA}+\overrightarrow{AD}+\overrightarrow{DD'}$.`, R`Split the path into edges of the box.`],
        [R`We have $\overrightarrow{BA}=-\vec a$, $\overrightarrow{AD}=\vec b$, $\overrightarrow{DD'}=\vec c$, so $\overrightarrow{BD'}=-\vec a+\vec b+\vec c$.`, R`Reversing an edge changes the sign of the vector.`],
      ], R`The result is $\overrightarrow{BD'}=-\vec a+\vec b+\vec c$.`],
      [R`Let $M$ be the midpoint of $CC'$. Express $\overrightarrow{AM}$ in terms of $\vec a$, $\vec b$, $\vec c$.`, [
        [R`We have $\overrightarrow{AM}=\overrightarrow{AC}+\overrightarrow{CM}=\vec a+\vec b+\overrightarrow{CM}$.`, R`Go from $A$ to $C$ first and then to $M$.`],
        [R`Since $M$ is the midpoint of $CC'$ we get $\overrightarrow{CM}=\frac12\vec c$, and $\overrightarrow{AM}=\vec a+\vec b+\frac12\vec c$.`, R`The edge $CC'$ is parallel and equal to $AA'$ so the midpoint gives half of $\vec c$.`],
      ], R`The result is $\overrightarrow{AM}=\vec a+\vec b+\frac12\vec c$.`],
    ],
    dr: [
      [R`Write $\overrightarrow{DB'}=x\vec a+y\vec b+z\vec c$. Find $x+y+z$.`, R`The sum is $1$.`, R`We have $\overrightarrow{DB'}=\vec a-\vec b+\vec c$, so $x+y+z=1-1+1=1$.`],
      [R`Let $N$ be the midpoint of $A'D'$. Write $\overrightarrow{AN}=x\vec a+y\vec b+z\vec c$. Find $y$.`, R`The coefficient is $y=\frac12$.`, R`We have $\overrightarrow{AN}=\overrightarrow{AA'}+\overrightarrow{A'N}=\vec c+\frac12\vec b$, so $y=\frac12$.`],
      [R`Let $\overrightarrow{AB}=(3;\ 0;\ 0)$, $\overrightarrow{AC}=(0;\ 3;\ 0)$ and $G$ be the centroid of triangle $ABC$. Find $AG$ using $\overrightarrow{AG}=\frac13\left(\overrightarrow{AB}+\overrightarrow{AC}\right)$.`, R`The length is $\sqrt2$.`, R`The vector $\overrightarrow{AG}=(1;\ 1;\ 0)$ has length $\sqrt2$.`],
    ],
  },
  "tich-vo-huong-hinh": {
    s: R`The dot product of two vectors different from $\vec0$ is $\vec a\cdot\vec b=|\vec a|\,|\vec b|\cos\varphi$ where $\varphi$ is the angle between them. It equals $0$ when the vectors are perpendicular. Also $|\vec a+\vec b|^2=|\vec a|^2+2\vec a\cdot\vec b+|\vec b|^2$.`,
    w: R`The dot product measures how much two vectors point the same way and equals the product of the lengths times $\cos\varphi$. The squared length of a sum expands like the square of a sum, and the middle term is the dot product.`,
    p: R`Using the angle between two segments instead of the angle between two vectors. When the vectors do not share a start point, translate them to the same point first.`,
    ex: [
      [R`The cube $ABCD.A'B'C'D'$ has edge $2$. Find $\overrightarrow{AB}\cdot\overrightarrow{AC}$.`, [
        [R`We have $|\overrightarrow{AB}|=2$, $|\overrightarrow{AC}|=2\sqrt2$ and angle $BAC=45^\circ$.`, R`The segment $AC$ is a diagonal of a square with side $2$ so it has length $2\sqrt2$.`],
        [R`So the product is $2\cdot2\sqrt2\cdot\cos45^\circ=4$.`, R`Substitute into the formula with $\cos45^\circ=\frac{\sqrt2}{2}$.`],
      ], R`The dot product is $4$.`],
      [R`A regular tetrahedron $ABCD$. Show that $\overrightarrow{AB}\cdot\overrightarrow{CD}=0$ using coordinates $A(1;\ 1;\ 1)$, $B(1;\ -1;\ -1)$, $C(-1;\ 1;\ -1)$, $D(-1;\ -1;\ 1)$.`, [
        [R`We have $\overrightarrow{AB}=(0;\ -2;\ -2)$ and $\overrightarrow{CD}=(0;\ -2;\ 2)$.`, R`Take the coordinates of the end point minus those of the start point.`],
        [R`The dot product is $0+4-4=0$, so the two opposite edges are perpendicular.`, R`If the dot product is $0$ the vectors are perpendicular.`],
      ], R`The opposite edges $AB$ and $CD$ are perpendicular.`],
    ],
    dr: [
      [R`Let $|\vec a|=3$, $|\vec b|=4$ and the angle between the vectors be $60^\circ$. Find $\vec a\cdot\vec b$.`, R`The dot product is $6$.`, R`We have $3\cdot4\cdot\cos60^\circ=12\cdot\frac12=6$.`],
      [R`Let $\vec a\cdot\vec b=-6$, $|\vec a|=3$, $|\vec b|=4$. Find the angle between the vectors in degrees.`, R`The angle is $120$ degrees.`, R`We have $\cos\varphi=\frac{-6}{12}=-\frac12$, so $\varphi=120^\circ$.`],
      [R`Two perpendicular vectors have lengths $3$ and $4$. Find the length of their sum.`, R`The length is $5$.`, R`Since the dot product is $0$, $|\vec a+\vec b|^2=9+16=25$.`],
    ],
  },
  "dong-phang-3-vecto": {
    s: R`Three vectors $\vec a$, $\vec b$, $\vec c$ are coplanar when $\vec c=m\vec a+n\vec b$ with $\vec a$, $\vec b$ not parallel. Four points $A$, $B$, $C$, $D$ are coplanar when the three vectors $\overrightarrow{AB}$, $\overrightarrow{AC}$, $\overrightarrow{AD}$ are coplanar.`,
    w: R`If $\vec c=m\vec a+n\vec b$ then $\vec c$ lies in the plane of $\vec a$ and $\vec b$, so the three vectors lie in one plane. By contrast the three edges of a box are not coplanar.`,
    p: R`Believing that three vectors are coplanar just because one pair is parallel. The correct condition is that one vector can be written in terms of the other two non-parallel vectors.`,
    ex: [
      [R`Let $\overrightarrow{AB}=(1;\ 0;\ 0)$, $\overrightarrow{AC}=(0;\ 1;\ 0)$, $\overrightarrow{AD}=(2;\ 3;\ 0)$. Are the four points coplanar?`, [
        [R`We have $\overrightarrow{AD}=2\overrightarrow{AB}+3\overrightarrow{AC}$.`, R`Compare coordinates; the third coordinate is $0$ in all of them.`],
        [R`So $\overrightarrow{AD}$ can be written through the other two vectors, hence the three vectors are coplanar.`, R`This is exactly the definition of coplanar.`],
      ], R`The four points are coplanar.`],
      [R`Are the three vectors $\overrightarrow{AB}$, $\overrightarrow{AD}$, $\overrightarrow{AA'}$ of a box coplanar?`, [
        [R`The three edges from one vertex of a box do not lie in the same plane.`, R`If they were coplanar the box would be flattened into a plane figure.`],
        [R`For instance in a unit rectangular box the triple product is $1\ne0$, so they are not coplanar.`, R`The triple product is $0$ if and only if the three vectors are coplanar.`],
      ], R`The three vectors are not coplanar.`],
    ],
    dr: [
      [R`Let $\overrightarrow{AB}=(1;\ 0;\ 0)$, $\overrightarrow{AC}=(0;\ 1;\ 0)$, $\overrightarrow{AD}=(1;\ 2;\ m)$. Find $m$ so that the four points are coplanar.`, R`The required value is $m=0$.`, R`We need $\overrightarrow{AD}$ to lie in the plane of $\overrightarrow{AB}$, $\overrightarrow{AC}$, that is the third coordinate equals $0$.`],
      [R`Let $\vec c=2\vec a-\vec b$ with $\vec a$, $\vec b$ not parallel. Are $\vec a$, $\vec b$, $\vec c$ coplanar?`, R`Yes, because $\vec c$ can be written through $\vec a$ and $\vec b$.`, R`If one vector is a linear combination of the other two, all three lie in the same plane.`, [], ["Yes, because $\\vec c$ can be written through $\\vec a$ and $\\vec b$.", "No, because there are three different vectors."]],
      [R`Let $\vec a=(1;\ 1;\ 0)$, $\vec b=(0;\ 1;\ 1)$, $\vec c=(1;\ 2;\ k)$. Find $k$ so that the three vectors are coplanar.`, R`The required value is $k=1$.`, R`We need $\vec c=\vec a+\vec b=(1;\ 2;\ 1)$, so $k=1$.`],
    ],
  },
  "goc-hai-dt-cheo": {
    s: R`The angle between two skew lines is the angle between two intersecting lines parallel to them. With direction vectors $\vec u$ and $\vec v$ we have $\cos\varphi=\frac{|\vec u\cdot\vec v|}{|\vec u|\,|\vec v|}$ and $0^\circ\le\varphi\le90^\circ$.`,
    w: R`The angle between two lines depends only on their directions, so one line can be translated to meet the other without changing the angle. Using direction vectors gives a short formula and needs no construction.`,
    p: R`Dropping the absolute value and getting an obtuse angle, or using the angle between two vectors joining vertices instead of the angle between two lines.`,
    ex: [
      [R`The cube $ABCD.A'B'C'D'$ has edge $1$. Find the angle between $AC$ and $A'D$.`, [
        [R`Take $A$ as the origin: $\overrightarrow{AC}=(1;\ 1;\ 0)$ and $\overrightarrow{A'D}=(0;\ 1;\ -1)$.`, R`Take the coordinates of the end point minus those of the start point.`],
        [R`The dot product is $1$ and both lengths are $\sqrt2$, so $\cos\varphi=\frac12$ and $\varphi=60^\circ$.`, R`Use the formula with the absolute value.`],
      ], R`The angle between $AC$ and $A'D$ is $60^\circ$.`],
      [R`The rectangular box $ABCD.A'B'C'D'$ has $AB=3$, $AD=4$, $AA'=12$. Find the $\cos$ of the angle between $BD'$ and $AC$.`, [
        [R`We have $\overrightarrow{BD'}=(-3;\ 4;\ 12)$ of length $13$, and $\overrightarrow{AC}=(3;\ 4;\ 0)$ of length $5$.`, R`Place the axes at $A$ and compute the length of each vector.`],
        [R`The dot product is $-9+16+0=7$, so $\cos\varphi=\frac{7}{13\cdot5}=\frac{7}{65}$.`, R`Take the absolute value of the dot product.`],
      ], R`The value is $\cos\varphi=\frac{7}{65}$.`],
    ],
    dr: [
      [R`The cube $ABCD.A'B'C'D'$ has edge $1$. Find the angle between $AB'$ and $CD'$ in degrees.`, R`The angle is $90$ degrees.`, R`We have $\overrightarrow{AB'}=(1;\ 0;\ 1)$ and $\overrightarrow{CD'}=(-1;\ 0;\ 1)$, whose dot product is $-1+1=0$.`],
      [R`In a regular tetrahedron $ABCD$, what is the angle between the opposite edges $AB$ and $CD$?`, R`It is $90^\circ$.`, R`With the coordinates of a regular tetrahedron, $\overrightarrow{AB}\cdot\overrightarrow{CD}=0$, so the opposite edges are perpendicular.`, [], ["$0^\\circ$", "$60^\\circ$", "$90^\\circ$"]],
      [R`A box has a square base with side $1$ and $AA'=\sqrt2$. Find the angle between $BD'$ and $AA'$ in degrees.`, R`The angle is $45$ degrees.`, R`We have $\overrightarrow{BD'}=(-1;\ 1;\ \sqrt2)$ of length $2$ and $\overrightarrow{AA'}=(0;\ 0;\ \sqrt2)$, so $\cos\varphi=\frac{2}{2\sqrt2}=\frac{\sqrt2}{2}$.`],
    ],
  },
  "goc-duong-mat-11": {
    s: R`The angle between a line $d$ meeting a plane $(P)$ is the angle between $d$ and the orthogonal projection of $d$ onto $(P)$. If $A\in d$ is at distance $h$ from $(P)$ and $d$ meets $(P)$ at $B$ then $\sin\varphi=\frac{h}{AB}$. With $SA\perp(ABC)$ the angle between $SB$ and $(ABC)$ is the angle $SBA$, with $\tan=\frac{SA}{AB}$.`,
    w: R`The orthogonal projection of a line onto a plane is the line closest to it, so the angle between the line and its projection is the smallest angle between the line and the plane. The right triangle formed by the line, its projection and the perpendicular gives the trigonometric ratio.`,
    p: R`Using cosine instead of sine when the distance from a point to the plane is known, or taking the angle between the line and a line perpendicular to the plane.`,
    ex: [
      [R`The pyramid $S.ABC$ has $SA\perp(ABC)$, $SA=3$ and $AB=3$. Find the angle between $SB$ and $(ABC)$.`, [
        [R`The projection of $SB$ onto $(ABC)$ is $AB$, so the required angle is the angle $SBA$.`, R`Since $SA$ is perpendicular to the plane, $A$ is the projection of $S$ onto that plane.`],
        [R`In the right triangle $SAB$ we have $\tan SBA=\frac{3}{3}=1$, so the angle is $45^\circ$.`, R`The tangent of an angle is the opposite side over the adjacent side in a right triangle.`],
      ], R`The angle between $SB$ and $(ABC)$ is $45^\circ$.`],
      [R`The point $A$ is at distance $3$ from the plane $(P)$, the line $AB$ meets $(P)$ at $B$ and $AB=6$. Find the angle between $AB$ and $(P)$.`, [
        [R`Drop $AH\perp(P)$, so $AH=3$ and the required angle is the angle $ABH$.`, R`The point $H$ is the projection of $A$ onto $(P)$ so $AH$ is perpendicular to the plane.`],
        [R`In the right triangle $AHB$ we have $\sin ABH=\frac{3}{6}=\frac12$, so the angle is $30^\circ$.`, R`Opposite side over hypotenuse.`],
      ], R`The angle between $AB$ and $(P)$ is $30^\circ$.`],
    ],
    dr: [
      [R`The pyramid $S.ABCD$ has a square base with side $1$, $SA\perp(ABCD)$ and $SA=\sqrt2$. Find the angle between $SC$ and $(ABCD)$ in degrees.`, R`The angle is $45$ degrees.`, R`The projection of $SC$ is $AC=\sqrt2$, so $\tan SCA=\frac{\sqrt2}{\sqrt2}=1$.`],
      [R`The pyramid $S.ABC$ has $SA\perp(ABC)$, $SA=2$ and $AB=2\sqrt3$. Find the angle between $SB$ and $(ABC)$ in degrees.`, R`The angle is $30$ degrees.`, R`We have $\tan SBA=\frac{2}{2\sqrt3}=\frac{1}{\sqrt3}$, so the angle is $30^\circ$.`],
      [R`The point $A$ is at distance $4$ from the plane $(P)$ and $AB=4\sqrt2$ with $B\in(P)$. Find the angle between $AB$ and $(P)$ in degrees.`, R`The angle is $45$ degrees.`, R`We have $\sin\varphi=\frac{4}{4\sqrt2}=\frac{\sqrt2}{2}$, so $\varphi=45^\circ$.`],
    ],
  },
  "goc-nhi-dien-11": {
    s: R`Two planes are perpendicular when one plane contains a line perpendicular to the other plane. The angle between two intersecting planes is the angle between two lines, one in each plane, both perpendicular to the line of intersection at one point. With $SA\perp(ABCD)$, the angle between $(SBC)$ and $(ABCD)$ has $\tan=\frac{SA}{AB}$ when $BC\perp AB$.`,
    w: R`Lines in each plane that are perpendicular to the intersection at the same point give the plane angle of the dihedral angle. If the line perpendicular to the other plane lies in the first plane, the two planes are perpendicular.`,
    p: R`Taking the angle between two arbitrary edges of the two planes instead of the angle between two lines both perpendicular to the line of intersection.`,
    ex: [
      [R`The pyramid $S.ABCD$ has a square base with side $2$, $SA\perp(ABCD)$, $SA=2$. Find the angle between $(SBC)$ and $(ABCD)$.`, [
        [R`The intersection is $BC$, and $BC\perp AB$, $BC\perp SB$ (because $BC\perp(SAB)$).`, R`Since $BC$ is perpendicular to $AB$ and $SA$, so $BC$ is perpendicular to the plane $(SAB)$.`],
        [R`The angle between the planes is the angle $SBA$ with $\tan SBA=\frac{SA}{AB}=\frac22=1$, that is $45^\circ$.`, R`In the right triangle $SAB$.`],
      ], R`The angle between the planes is $45^\circ$.`],
      [R`The right prism $ABC.A'B'C'$ has an equilateral base with side $2$ and $AA'=\sqrt3$. Find the angle between $(A'BC)$ and $(ABC)$.`, [
        [R`Let $M$ be the midpoint of $BC$, so $AM\perp BC$ and $A'M\perp BC$, and the required angle is the angle $A'MA$.`, R`The intersection is $BC$, and the altitude is $AM=\sqrt3$.`],
        [R`We have $\tan A'MA=\frac{AA'}{AM}=\frac{\sqrt3}{\sqrt3}=1$, so the angle is $45^\circ$.`, R`In the right triangle $A'AM$.`],
      ], R`The angle between the planes is $45^\circ$.`],
    ],
    dr: [
      [R`The pyramid $S.ABCD$ has a square base with side $\sqrt3$, $SA\perp(ABCD)$ and $SA=1$. Find the angle between $(SBC)$ and $(ABCD)$ in degrees.`, R`The angle is $30$ degrees.`, R`We have $\tan SBA=\frac{SA}{AB}=\frac{1}{\sqrt3}$, so the angle is $30^\circ$.`],
      [R`Let $SA\perp(ABCD)$. Is the plane $(SAB)$ perpendicular to $(ABCD)$?`, R`Yes, because $(SAB)$ contains $SA$, which is perpendicular to $(ABCD)$.`, R`Two planes are perpendicular when one contains a line perpendicular to the other.`, [], ["Yes, because $(SAB)$ contains $SA$, which is perpendicular to $(ABCD)$.", "No, because the angle is not known.", "Only when the base is a square."]],
      [R`The point $A$ is at distance $2$ from the plane $(P)$ and at distance $4$ from the line of intersection of the two planes. Find the dihedral angle in degrees.`, R`The angle is $30$ degrees.`, R`We have $\sin\varphi=\frac{2}{4}=\frac12$, so $\varphi=30^\circ$.`],
    ],
  },
  "kc-diem-duong": {
    s: R`The distance from a point $M$ to a line $d$ is the length of $MH$ where $H$ is the foot of the perpendicular from $M$ to $d$. In a right triangle at $A$ with altitude $AH$ we have $AH=\frac{AB\cdot AC}{BC}$. In general $d(M;\ d)=\frac{2S}{AB}$, where $A$, $B$ are two points of $d$ and $S$ is the area of triangle $MAB$.`,
    w: R`Two ways of computing the area of a triangle, half the product of the legs and half the base times the height, are equal, so the altitude equals the product of the legs over the hypotenuse. A distance is always measured along a perpendicular.`,
    p: R`Taking the length of a slanted segment instead of the perpendicular, or forgetting to divide by the hypotenuse when using the altitude formula.`,
    ex: [
      [R`The pyramid $S.ABC$ has $SA\perp(ABC)$, $SA=3$, $AB=4$ and $AB\perp SA$. Find the distance from $A$ to $SB$.`, [
        [R`The triangle $SAB$ is right at $A$ with $SB=\sqrt{9+16}=5$.`, R`Use Pythagoras' theorem for the right triangle $SAB$.`],
        [R`The altitude is $AH=\frac{SA\cdot AB}{SB}=\frac{12}{5}$.`, R`The altitude formula in a right triangle.`],
      ], R`The distance is $\frac{12}{5}$.`],
      [R`A cube with edge $1$. Find the distance from $A$ to the line $BD'$.`, [
        [R`Take $A$ as the origin: $\overrightarrow{BA}=(-1;\ 0;\ 0)$ and $\overrightarrow{BD'}=(-1;\ 1;\ 1)$ of length $\sqrt3$.`, R`Form the vector from a point of the line to $A$ and the direction vector.`],
        [R`The cross product has length $\sqrt2$, so the distance is $\frac{\sqrt2}{\sqrt3}=\frac{\sqrt6}{3}$.`, R`The distance equals the length of the cross product divided by the length of the direction vector.`],
      ], R`The distance is $\frac{\sqrt6}{3}$.`],
    ],
    dr: [
      [R`The triangle $SAB$ is right at $A$ with $SA=5$ and $AB=12$. Find the distance from $A$ to $SB$.`, R`The distance is $\frac{60}{13}$.`, R`We have $SB=13$, so $AH=\frac{5\cdot12}{13}=\frac{60}{13}$.`],
      [R`Find the distance from the origin $O$ to the line through $A(3;\ 0;\ 0)$ and $B(0;\ 4;\ 0)$.`, R`The distance is $\frac{12}{5}$.`, R`The triangle $OAB$ is right at $O$ with $AB=5$, so the distance is $\frac{3\cdot4}{5}$.`],
      [R`The triangle $ABC$ is equilateral with side $2$. Find the distance from $A$ to $BC$.`, R`The distance is $\sqrt3$.`, R`The altitude from $A$ is also the median, so it has length $\sqrt{4-1}=\sqrt3$.`],
    ],
  },
  "kc-song-song-kg": {
    s: R`The distance between a line $d$ and a parallel plane $(P)$ equals the distance from any point of $d$ to $(P)$. The distance between two parallel planes equals the distance from any point of one to the other. Both reduce to the distance from a point to a plane.`,
    w: R`Every point of a line parallel to a plane is at the same distance from the plane, and every point of a plane is at the same distance from a plane parallel to it. So we may choose a convenient point.`,
    p: R`Choosing a point and then computing the distance to a plane that is not the required one, or failing to show that the perpendicular is dropped to the right plane.`,
    ex: [
      [R`The pyramid $S.ABCD$ has a square base with side $2$, $SA\perp(ABCD)$ and $SA=2$. Find the distance between $AB$ and $(SCD)$.`, [
        [R`Since $AB$ is parallel to $CD$ it is parallel to $(SCD)$, and the distance equals $d(A;\ (SCD))$.`, R`Choose the point $A$ on $AB$ for ease of computation.`],
        [R`Drop $AH\perp SD$, then $AH=\frac{SA\cdot AD}{SD}=\frac{2\cdot2}{2\sqrt2}=\sqrt2$.`, R`Since $CD\perp(SAD)$, the altitude $AH$ of triangle $SAD$ is also perpendicular to $(SCD)$.`],
      ], R`The distance is $\sqrt2$.`],
      [R`Find the distance between the parallel planes $2x+y+2z+1=0$ and $2x+y+2z-8=0$.`, [
        [R`Both planes have the same normal $(2;\ 1;\ 2)$ of length $3$.`, R`This is the condition for using the distance formula between parallel planes.`],
        [R`The distance is $\frac{|-8-1|}{3}=3$.`, R`Take the difference of the two constants and divide by the length of the normal.`],
      ], R`The distance is $3$.`],
    ],
    dr: [
      [R`The pyramid $S.ABCD$ has a square base with side $3$, $SA\perp(ABCD)$ and $SA=4$. Find the distance between $AB$ and $(SCD)$.`, R`The distance is $\frac{12}{5}$.`, R`The distance is $AH=\frac{SA\cdot AD}{SD}=\frac{4\cdot3}{5}=\frac{12}{5}$.`],
      [R`Find the distance between the parallel planes $x+y+z-6=0$ and $x+y+z+3=0$.`, R`The distance is $3\sqrt3$.`, R`Both planes have a normal of length $\sqrt3$, so the distance is $\frac{|3-(-6)|}{\sqrt3}=3\sqrt3$.`],
      [R`The right prism $ABC.A'B'C'$ has an equilateral base with side $4$. Find the distance between $AA'$ and the plane $(BCC'B')$.`, R`The distance is $2\sqrt3$.`, R`The distance equals the altitude from $A$ to $BC$ of the equilateral triangle with side $4$, that is $\sqrt{16-4}=2\sqrt3$.`],
    ],
  },
  "kc-cheo-nhau": {
    s: R`The distance between two skew lines $a$ and $b$ is the length of their common perpendicular. A common method: construct a plane containing $b$ and parallel to $a$, and then the required distance equals the distance from a point of $a$ to that plane. If $a$ is perpendicular to a plane containing $b$, project $a$ to a point and reduce to the distance from a point to a line.`,
    w: R`Two skew lines have exactly one common perpendicular, and it equals the distance between one line and the plane through the other parallel to it. When one line is perpendicular to the plane containing the other, project it to a point.`,
    p: R`Taking the distance between two arbitrary points of the two lines instead of the length of the common perpendicular, or forgetting to project onto the same plane.`,
    ex: [
      [R`The rectangular box $ABCD.A'B'C'D'$ has $AB=6$, $AD=8$. Find the distance between $AA'$ and $BD$.`, [
        [R`Since $AA'\perp(ABCD)$, the common perpendicular lies in $(ABCD)$ and is the distance from $A$ to $BD$.`, R`Project $AA'$ onto $(ABCD)$ to get the point $A$.`],
        [R`The triangle $ABD$ is right at $A$ with $BD=10$, so $d=\frac{6\cdot8}{10}=\frac{24}{5}$.`, R`The altitude in a right triangle.`],
      ], R`The distance is $\frac{24}{5}$.`],
      [R`A cube with edge $1$. Find the distance between $AA'$ and $BD$.`, [
        [R`Again project $AA'$ onto $(ABCD)$ to get the point $A$, so $d=d(A;\ BD)$.`, R`Since $AA'$ is perpendicular to the base plane its projection is a point.`],
        [R`The triangle $ABD$ is right isosceles at $A$ with legs $1$, so $d=\frac{1}{\sqrt2}=\frac{\sqrt2}{2}$.`, R`The altitude to the hypotenuse equals half the hypotenuse.`],
      ], R`The distance is $\frac{\sqrt2}{2}$.`],
    ],
    dr: [
      [R`The rectangular box $ABCD.A'B'C'D'$ has $AB=5$, $AD=12$. Find the distance between $CC'$ and $BD$.`, R`The distance is $\frac{60}{13}$.`, R`The distance equals $d(C;\ BD)$ with $BD=13$, so $d=\frac{5\cdot12}{13}=\frac{60}{13}$.`],
      [R`A cube with edge $2$. Find the distance between $AA'$ and $BD$.`, R`The distance is $\sqrt2$.`, R`The distance equals $d(A;\ BD)=\frac{2}{\sqrt2}=\sqrt2$.`],
      [R`The tetrahedron $OABC$ has $OA$, $OB$, $OC$ pairwise perpendicular, $OB=9$ and $OC=12$. Find the distance between $OA$ and $BC$.`, R`The distance is $\frac{36}{5}$.`, R`Since $OA\perp(OBC)$ the distance equals $d(O;\ BC)=\frac{9\cdot12}{15}=\frac{36}{5}$ with $BC=15$.`],
    ],
  },
  "thales-kg": {
    s: R`Three parallel planes cut any two lines in proportional segments. In triangle $SAB$, if $M\in SA$, $N\in SB$ and $MN\parallel AB$ then $\frac{SM}{SA}=\frac{SN}{SB}=\frac{MN}{AB}$.`,
    w: R`Parallel planes cutting two lines form similar triangles, so corresponding pairs of segments are in the same ratio. Choose the corresponding pairs correctly, measured from the same side.`,
    p: R`Writing the segments in the wrong order in the proportion, for example $\frac{SM}{MA}$ in place of $\frac{SM}{SA}$ when computing $MN$.`,
    ex: [
      [R`Three parallel planes meet the line $d$ at $A$, $B$, $C$ and the line $d'$ at $A'$, $B'$, $C'$. Given $AB=2$, $BC=3$ and $A'B'=4$, find $B'C'$.`, [
        [R`By Thales' theorem, $\frac{AB}{BC}=\frac{A'B'}{B'C'}$.`, R`Corresponding segments on the two lines are proportional.`],
        [R`So $B'C'=\frac{A'B'\cdot BC}{AB}=\frac{4\cdot3}{2}=6$.`, R`Solve the proportion for $B'C'$.`],
      ], R`The length $B'C'$ is $6$.`],
      [R`In triangle $SAB$ we have $M\in SA$, $N\in SB$, $MN\parallel AB$, $\frac{SM}{SA}=\frac13$ and $AB=9$. Find $MN$.`, [
        [R`Since $MN\parallel AB$ we have $\frac{MN}{AB}=\frac{SM}{SA}=\frac13$.`, R`The triangles $SMN$ and $SAB$ are similar.`],
        [R`So $MN=\frac13\cdot9=3$.`, R`Multiply the ratio $\frac13$ by the length $AB=9$ of the base.`],
      ], R`The length $MN$ is $3$.`],
    ],
    dr: [
      [R`Three parallel planes meet the line $d$ at $A$, $B$, $C$ with $AB=3$, $BC=5$ and meet $d'$ at $A'$, $B'$, $C'$ with $A'C'=24$. Find $A'B'$.`, R`The length $A'B'$ is $9$.`, R`We have $\frac{A'B'}{A'C'}=\frac{AB}{AC}=\frac38$, so $A'B'=24\cdot\frac38=9$.`],
      [R`In triangle $SAB$, $MN\parallel AB$ with $M\in SA$, $N\in SB$, $\frac{SM}{SA}=\frac25$ and $AB=10$. Find $MN$.`, R`The length $MN$ is $4$.`, R`We have $MN=\frac25\cdot10=4$.`],
      [R`In triangle $SAB$, $MN\parallel AB$ with $SM=4$, $MA=2$ and $MN=8$. Find $AB$.`, R`The length $AB$ is $12$.`, R`We have $SA=6$, so $AB=MN\cdot\frac{SA}{SM}=8\cdot\frac64=12$.`],
    ],
  },
  "thiet-dien-ss": {
    s: R`A plane parallel to the base of a pyramid cuts the lateral edges in the same ratio $k=\frac{SM}{SA}$ and gives a section similar to the base with ratio $k$. Then the area of the section is $k^2$ times the base area, and the volume of the small pyramid is $k^3$ times the volume of the large one.`,
    w: R`A plane parallel to the base cuts the pyramid in a figure similar to the base, and the small pyramid is similar to the large one. Lengths multiply by $k$, areas by $k^2$ and volumes by $k^3$.`,
    p: R`Using $k$ instead of $k^2$ for an area, or forgetting that the ratio $k$ is measured from the apex and not from the base.`,
    ex: [
      [R`The pyramid $S.ABCD$ has a square base with side $6$. A plane parallel to the base meets $SA$ at $M$ with $\frac{SM}{SA}=\frac13$. Find the area of the section.`, [
        [R`The section is a square with side $6\cdot\frac13=2$.`, R`The section is similar to the base with ratio $\frac13$.`],
        [R`Its area is $2^2=4$.`, R`Square the side of the square.`],
      ], R`The area of the section is $4$.`],
      [R`A plane parallel to the base cuts a pyramid in a section of area $16$, while the base has area $36$. Find the ratio $k$.`, [
        [R`The ratio of areas is $k^2=\frac{16}{36}=\frac49$.`, R`Area is proportional to the square of the similarity ratio.`],
        [R`Hence $k=\frac23$.`, R`Take the positive square root of $\frac49$ because the similarity ratio is not negative.`],
      ], R`The ratio is $\frac23$.`],
    ],
    dr: [
      [R`The base of a pyramid has area $20$ and the similarity ratio of a section parallel to the base is $\frac12$. Find the area of the section.`, R`The area is $5$.`, R`The area is $k^2\cdot20=\frac14\cdot20=5$.`],
      [R`The base of the pyramid $S.ABC$ has area $27$ and a section parallel to the base has area $12$. Find the ratio $\frac{SM}{SA}$.`, R`The ratio is $\frac23$.`, R`We have $k^2=\frac{12}{27}=\frac49$, so $k=\frac23$.`],
      [R`A pyramid has volume $54$. A plane parallel to the base cuts the lateral edge in ratio $\frac13$ from the apex. Find the volume of the small pyramid.`, R`The volume is $2$.`, R`The small volume is $k^3\cdot54=\frac{54}{27}=2$.`],
    ],
  },
};
