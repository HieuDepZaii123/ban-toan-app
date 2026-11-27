/** Bản tiếng Anh của lớp 11 hoàn thiện hình học không gian (lop11extra4.ts); ghi đè bốn bài cũ đã viết lại. */
import type { LessonEn } from "./types.ts";

const R = String.raw;

export const g11Extra5En: Record<string, LessonEn> = {
  "song-song": {
    s: R`A line $d$ is parallel to a plane $(P)$ if $d$ is not in $(P)$ and is parallel to a line lying in $(P)$. Two planes are parallel if one contains two intersecting lines both parallel to the other plane. The midline of a triangle is parallel to the third side and half as long. If two planes meet along a line $d$ and contain two parallel lines, the line of intersection is parallel to those two lines.`,
    w: R`A line parallel to a line of a plane never meets that plane, since a meeting point would lie on the plane's line, which it does not meet. This is why the condition needs only one line of the plane.`,
    p: R`Forgetting to check that the line is not in the plane. A line lying in the plane is parallel to many lines of it but is not called parallel to the plane.`,
    ex: [
      [R`The pyramid $S.ABCD$ has a parallelogram base, $M$ and $N$ are the midpoints of $SA$ and $SB$, and $CD=8$. Show that $MN\parallel(SCD)$ and find $MN$.`, [
        [R`The segment $MN$ is a midline of triangle $SAB$, so $MN\parallel AB$ and $MN=\frac{AB}{2}$.`, R`The points $M$ and $N$ are the midpoints of two sides of the triangle.`],
        [R`The base is a parallelogram so $AB=CD=8$ and $AB\parallel CD$, hence $MN\parallel CD$ and $MN=4$.`, R`Opposite sides of a parallelogram are parallel and equal.`],
        [R`The line $CD$ lies in $(SCD)$ while $MN$ does not lie in $(SCD)$, so $MN\parallel(SCD)$.`, R`If $MN\subset(SCD)$ then $M$ together with $S$ would be two common points of the line $SA$ and $(SCD)$, so $SA\subset(SCD)$, which is absurd because $A\notin(SCD)$; hence we may use the condition for a line to be parallel to a plane.`],
      ], R`The line $MN\parallel(SCD)$ and $MN=4$.`],
      [R`The pyramid $S.ABCD$ has a parallelogram base. Find the line of intersection of $(SAB)$ and $(SCD)$.`, [
        [R`The point $S$ lies in both planes, so $S$ is a common point.`, R`A line of intersection needs at least one common point.`],
        [R`The two distinct planes contain the parallel lines $AB$ and $CD$, so the line of intersection, which does not coincide with $AB$ or $CD$ because $S$ lies on neither of them, is the line $d$ through $S$ parallel to $AB$ (and $CD$).`, R`By the property: the line of intersection is parallel to the two given parallel lines.`],
      ], R`The line of intersection is the line through $S$ parallel to $AB$.`],
    ],
    dr: [
      [R`Same pyramid as in the first example. Is $MN$ parallel to the base plane $(ABCD)$?`, R`Yes, because $MN\parallel AB$ and $AB$ lies in $(ABCD)$.`, R`Since $MN$ is not in $(ABCD)$ and is parallel to the line $AB$ of the base plane.`, [], ["Yes, because $MN\\parallel AB$ and $AB\\subset(ABCD)$.", "No, because $MN$ meets $(ABCD)$."]],
      [R`The pyramid $S.ABCD$ has a parallelogram base with $AD=6$. Let $M$ and $Q$ be the midpoints of $SA$ and $SD$. Find $MQ$.`, R`The segment $MQ$ is $3$ long.`, R`Since $MQ$ is a midline of triangle $SAD$, it equals half of $AD$.`],
      [R`The prism $ABC.A'B'C'$ has $BC=8$. Let $M$ and $N$ be the midpoints of $A'B'$ and $A'C'$. Find $MN$. Is $MN$ parallel to the plane $(ABC)$?`, R`The segment $MN$ is $4$ long and $MN$ is parallel to $(ABC)$.`, R`Since $MN$ is a midline of triangle $A'B'C'$, we have $MN\parallel B'C'\parallel BC$, while $BC\subset(ABC)$ and $MN\not\subset(ABC)$.`],
    ],
  },
  "vuong-goc": {
    s: R`A line is perpendicular to a plane when it is perpendicular to two intersecting lines in the plane. Three perpendiculars theorem: if $AH$ is perpendicular to a plane, $H$ lies in the plane, and a line $d$ of the plane passes through $B$, then $d$ is perpendicular to $AB$ if and only if $d$ is perpendicular to the projection $HB$. Two planes are perpendicular when one contains a line perpendicular to the other.`,
    w: R`A line perpendicular to a plane is perpendicular to every line of the plane through its foot, and the three perpendiculars theorem extends this to every line of the plane. This is why one pair of intersecting lines is enough.`,
    p: R`Showing perpendicularity to only one line of the plane and concluding too early. One needs two intersecting lines, not two parallel ones.`,
    ex: [
      [R`The line $AH$ is perpendicular to a plane at $H$, $HB$ lies in the plane, $AH=6$ and $HB=8$. Find $AB$. If a line $d$ in the plane passes through $B$ and is perpendicular to $HB$, how is $d$ related to $AB$?`, [
        [R`Triangle $AHB$ is right at $H$, so $AB=\sqrt{6^2+8^2}=10$.`, R`A line perpendicular to a plane is perpendicular to every line of the plane through the foot, including $HB$.`],
        [R`The line $d$ is perpendicular to $AB$.`, R`Three perpendiculars theorem: $d$ is perpendicular to the projection $HB$ so $d$ is perpendicular to the oblique line $AB$.`],
      ], R`The length $AB$ is $10$ and $d$ is perpendicular to $AB$.`],
      [R`The pyramid $S.ABCD$ has a square base with side $2$, $SA\perp(ABCD)$ and $SA=3$. Show that $BC\perp SB$ and find $SC$.`, [
        [R`We have $BC\perp AB$ (square) and $BC\perp SA$ (since $SA\perp(ABCD)$), so $BC\perp(SAB)$.`, R`The line $BC$ is perpendicular to the two intersecting lines $AB$ and $SA$ of the plane $(SAB)$.`],
        [R`Since $SB\subset(SAB)$ we get $BC\perp SB$.`, R`A line perpendicular to a plane is perpendicular to every line lying in that plane.`],
        [R`With $AC=2\sqrt2$, triangle $SAC$ is right at $A$, so $SC=\sqrt{3^2+(2\sqrt2)^2}=\sqrt{17}$.`, R`The edge $SA$ is perpendicular to $AC$, which lies in the base.`],
      ], R`We have $BC\perp SB$ and $SC=\sqrt{17}$.`],
    ],
    dr: [
      [R`Let $AH$ be perpendicular to a plane, $AH=5$ and $HB=12$. Find $AB$.`, R`The length $AB$ is $13$.`, R`Triangle $AHB$ is right at the foot of the perpendicular. The oblique segment is the hypotenuse.`],
      [R`If $AH=9$ and $AB=15$, with $AH$ perpendicular to the plane, how long is the projection $HB$?`, R`The projection $HB$ is $12$ long.`, R`From the right triangle at $H$, the square of the projection equals the difference of the other two squares.`],
      [R`The pyramid $S.ABCD$ has a rectangular base and $SA\perp(ABCD)$. Is $BC$ perpendicular to $SB$?`, R`Yes, because $BC\perp(SAB)$.`, R`The line $BC$ is perpendicular to $AB$ and $SA$ so it is perpendicular to $(SAB)$, and $SB$ lies in that plane.`, [], ["Yes, because $BC\\perp(SAB)$.", "No, the conditions are not enough.", "Only when the base is a square."]],
    ],
  },
  "the-tich-11": {
    s: R`This lesson deals with prisms and pyramids whose base is a polygon. The volume of a prism equals the base area times the height. The volume of a pyramid is one third of that product. The height is perpendicular to the base, and for an oblique prism it equals the lateral edge times the sine of the angle between the lateral edge and the base. A solid with a circular base is not a pyramid.`,
    w: R`A prism fills its base times its height, and a pyramid with the same base and height fills exactly one third of it. For an oblique prism the volume still uses the perpendicular height, not the slanted edge.`,
    p: R`Using the lateral edge of an oblique prism in place of the perpendicular height, or forgetting the factor one third for a pyramid.`,
    ex: [
      [R`A right prism has a base that is a right triangle with legs $3$ and $4$ and has height $6$. Find the volume of the prism and of the pyramid with the same base and height.`, [
        [R`The base area is $\frac{1}{2}\cdot 3\cdot 4=6$. The volume of the prism is $6\cdot 6=36$.`, R`The base is a polygon, here a right triangle. The prism takes the full product of base area and height.`],
        [R`The volume of the pyramid is $\frac{1}{3}\cdot 6\cdot 6=12$.`, R`With the same polygonal base and height, the pyramid is one third of the prism.`],
      ], R`The prism has volume $36$ and the pyramid has volume $12$.`],
      [R`An oblique prism has a square base with side $4$ and a lateral edge $10$ making a $30^\circ$ angle with the base. Find the volume.`, [
        [R`The height is $10\sin30^\circ=5$.`, R`The height is dropped perpendicular to the base and forms a right triangle with the lateral edge.`],
        [R`The base area is $16$ so the volume is $16\cdot5=80$.`, R`The volume of a prism is the base area times the height, not times the lateral edge.`],
      ], R`The volume is $80$.`],
    ],
    dr: [
      [R`A prism has a triangular base of area $10$ and height $4$. What is the volume?`, R`The volume is $40$.`, R`The base is a polygon. A prism does not divide by three.`],
      [R`A pyramid has the same base of area $10$ and the same height $4$. What is the volume?`, R`The volume is $\frac{40}{3}$.`, R`A pyramid with a polygonal base takes one third of the product of base and height.`],
      [R`A pyramid has a square base with side $6$ and height $5$. What is the volume?`, R`The volume is $60$.`, R`The base area is $36$. One third of $36\cdot 5$ is $60$.`],
    ],
  },
  "vi-tri-tuong-doi-kg": {
    s: R`Two lines in space have four positions: they coincide, intersect, are parallel (distinct), or are skew when they do not lie in one plane. A line and a plane have three positions: they meet in one point, are parallel, or the line lies in the plane. Two planes have three positions: they meet along a line, are parallel, or coincide.`,
    w: R`In space two lines with no common point may still fail to be parallel, because they may not lie in one plane. Only when they are coplanar do they split into intersecting or parallel.`,
    p: R`Thinking that two lines that do not meet are parallel, as in plane geometry. One must also check whether the two lines lie in one plane.`,
    ex: [
      [R`In the tetrahedron $SABC$ we have $SA\perp(ABC)$. Do the lines $SA$ and $BC$ intersect, are they parallel or skew?`, [
        [R`The line $BC$ lies in the plane $(ABC)$ and $SA$ meets $(ABC)$ at $A$, outside the line $BC$ (the point $A$ is not on $BC$).`, R`A line meets a plane at a point that does not belong to the other line.`],
        [R`So $SA$ and $BC$ have no common point and are not coplanar, that is, they are skew.`, R`If they were coplanar then $SA$ would lie in the plane through $BC$ and $A$, that is $(ABC)$, a contradiction.`],
      ], R`The lines $SA$ and $BC$ are skew.`],
      [R`In the box $ABCD.A'B'C'D'$, what is the position of the lines $AA'$ and $CC'$?`, [
        [R`Both $AA'$ and $CC'$ are parallel to the edge $BB'$ (the lateral edges of a box).`, R`The lateral edges of a box are parallel and equal.`],
        [R`Two lines parallel to a third line are parallel to each other.`, R`Transitivity of the parallel relation.`],
      ], R`The lines $AA'$ and $CC'$ are parallel.`],
    ],
    dr: [
      [R`In the box $ABCD.A'B'C'D'$, what is the position of the lines $AA'$ and $BC$?`, R`The lines are skew.`, R`The lines $AA'$ and $BC$ are not coplanar: the triple product of $\overrightarrow{AB}$, $\overrightarrow{AA'}$, $\overrightarrow{BC}$ is not $0$.`, [], ["Parallel.", "Intersecting.", "Skew."]],
      [R`In a tetrahedron, how many pairs of edges are skew?`, R`There are $3$ pairs (the pairs of opposite edges).`, R`There are $15$ pairs of edges in all, and each vertex has $3$ edges, giving $3$ intersecting pairs per vertex, so there are $12$ intersecting pairs; the remaining $15-12=3$ pairs are skew.`],
      [R`Two distinct planes have a common point. What is their intersection?`, R`A line through that common point.`, R`Two distinct planes that already have a common point are not parallel, so they meet along a line through that point.`, [], ["A line through that point.", "Only that point.", "The empty set."]],
    ],
  },
  "giao-tuyen": {
    s: R`The line of intersection of two distinct planes is the line made of their common points. To find it, find two common points. If two distinct planes contain two parallel lines respectively, the line of intersection is parallel to those two lines or coincides with one of them. The intersection of the two diagonals of a parallelogram is the midpoint of each.`,
    w: R`Two distinct points determine a line, so two common points of two planes determine the line of intersection. When the planes contain two parallel lines, the line of intersection cannot meet them, so it must be parallel to them.`,
    p: R`Finding one common point and then drawing the line of intersection at once, or confusing the diagonals of a trapezoid with those of a parallelogram when looking for a common point.`,
    ex: [
      [R`The pyramid $S.ABCD$ has a parallelogram base with centre $O$. Find the line of intersection of $(SAC)$ and $(SBD)$.`, [
        [R`The point $S$ lies in both planes.`, R`Both planes contain the apex $S$.`],
        [R`The point $O=AC\cap BD$ lies on $AC\subset(SAC)$ and on $BD\subset(SBD)$, so $O$ is also a common point.`, R`The two diagonals of the parallelogram meet at $O$.`],
      ], R`The line of intersection is the line $SO$.`],
      [R`The pyramid $S.ABCD$ has a trapezoid base with $AB\parallel CD$, $AB=6$ and $CD=3$. The lines $AD$ and $BC$ meet at $I$ and $IB=10$. Find the line of intersection of $(SAD)$ and $(SBC)$, then find $IC$.`, [
        [R`The points $S$ and $I$ are two common points ($I\in AD\subset(SAD)$ and $I\in BC\subset(SBC)$), so the line of intersection is $SI$.`, R`Two distinct common points already determine the line of intersection.`],
        [R`Since $CD\parallel AB$ we get $\frac{IC}{IB}=\frac{CD}{AB}=\frac36=\frac12$, so $IC=5$.`, R`The triangles $ICD$ and $IBA$ are similar.`],
      ], R`The line of intersection is $SI$ and $IC=5$.`],
    ],
    dr: [
      [R`The parallelogram base $ABCD$ has $AC=10$ and $BD=6$. Let $O$ be the intersection of the diagonals. Find $AO$ and $BO$ and then give $AO+BO$.`, R`The sum $AO+BO$ is $8$.`, R`The diagonals of a parallelogram meet at the midpoint of each: $AO=5$ and $BO=3$.`],
      [R`The pyramid $S.ABCD$ has a parallelogram base. The line of intersection of $(SAB)$ and $(SCD)$ is parallel to which line?`, R`It is parallel to $AB$.`, R`The plane $(SAB)$ contains $AB$, $(SCD)$ contains $CD$ and $AB\parallel CD$, so the line of intersection through $S$ is parallel to $AB$.`, [], ["Parallel to $AB$.", "Parallel to $SA$.", "Parallel to $AC$."]],
      [R`The base is a trapezoid $AB\parallel CD$ with $AB=8$, $CD=2$. The lines $AD$ and $BC$ meet at $I$ and $IB=12$. Find $IC$.`, R`The length $IC$ is $3$.`, R`We have $\frac{IC}{IB}=\frac{CD}{AB}=\frac28$, so $IC=12\cdot\frac14=3$.`],
    ],
  },
  "thiet-dien": {
    s: R`A cross-section is the part of a cutting plane inside a solid, and it is a polygon. Each side of the cross-section is the line of intersection of the cutting plane with a face of the solid. A plane parallel to the base of a pyramid gives a cross-section similar to the base. A cube cut by the plane through the midpoints of six suitable edges gives a regular hexagon, because the six midpoints are coplanar and equidistant from the centre of the cube at a distance equal to the side of the hexagon.`,
    w: R`Each face of the solid meets the cutting plane in a segment, so the cross-section is a polygon with no more sides than the solid has faces. A plane parallel to the base keeps the shape and only changes the scale.`,
    p: R`Forgetting to join the points that lie on one face, or computing the area of a cross-section parallel to the base with the ratio $k$ in place of $k^2$.`,
    ex: [
      [R`A regular tetrahedron with edge $4$ is cut by the plane through the midpoints of three edges from one vertex. Find the area of the cross-section.`, [
        [R`Each side of the cross-section is a midline of a face (an equilateral triangle with side $4$), so it has length $2$.`, R`Joining the midpoints of two sides of a face gives a midline.`],
        [R`The cross-section is an equilateral triangle with side $2$ and area $\frac{\sqrt3}{4}\cdot2^2=\sqrt3$.`, R`Use the formula for the area of an equilateral triangle.`],
      ], R`The area of the cross-section is $\sqrt3$.`],
      [R`A cube with edge $2$ is cut by the plane through the midpoints of the edges $AB$, $BC$, $CC'$, $C'D'$, $D'A'$, $A'A$. Find the area of the cross-section.`, [
        [R`Take $A$ as the origin with the three edges from $A$ along the three axes: the six midpoints all satisfy $x-y+z=1$ so they are coplanar, and they are at the same distance $\sqrt2$ from the centre $I(1;\ 1;\ 1)$.`, R`The six points lie on a circle with centre $I$ in the cutting plane, so it remains to compare the side with the radius.`],
        [R`Each side of the cross-section is the hypotenuse of a right triangle whose two legs equal $1$, so it has length $\sqrt{1^2+1^2}=\sqrt2$, equal to the radius of the circle, so the cross-section is a regular hexagon.`, R`Two consecutive midpoints lie on two adjacent edges of a square face with side $2$.`],
        [R`The area of a regular hexagon with side $\sqrt2$ is $\frac{3\sqrt3}{2}\cdot(\sqrt2)^2=3\sqrt3$.`, R`A regular hexagon consists of six equilateral triangles with side equal to the side of the hexagon.`],
      ], R`The area of the cross-section is $3\sqrt3$.`],
    ],
    dr: [
      [R`A regular tetrahedron with edge $6$ is cut by the plane through the midpoints of three edges from one vertex. Find the area of the cross-section.`, R`The area is $\frac{9\sqrt3}{4}$.`, R`The cross-section is an equilateral triangle with side $3$, so its area is $\frac{\sqrt3}{4}\cdot9=\frac{9\sqrt3}{4}$.`],
      [R`A pyramid has a base of area $27$. A plane parallel to the base cuts the lateral edge in ratio $\frac{SM}{SA}=\frac23$. Find the area of the cross-section.`, R`The area is $12$.`, R`The cross-section is similar to the base with ratio $\frac23$, so the area is multiplied by $\frac49$: $27\cdot\frac49=12$.`],
      [R`A cube with edge $4$ is cut by the plane through the midpoints of six edges as above. Find the area of the cross-section.`, R`The area is $12\sqrt3$.`, R`The side of the regular hexagon is $2\sqrt2$, so the area is $\frac{3\sqrt3}{2}\cdot8=12\sqrt3$.`],
    ],
  },
  "hinh-chop-deu": {
    s: R`A regular pyramid has a regular polygon as its base and the foot of its altitude at the centre of the base; all lateral edges are equal. A regular quadrilateral pyramid with base edge $a$ and lateral edge $b$ has height $SO=\sqrt{b^2-\frac{a^2}{2}}$. The slant height is the altitude of a lateral face, and the lateral area equals half the perimeter of the base times the slant height. A regular prism is a right prism whose base is a regular polygon.`,
    w: R`The foot of the altitude is the centre of the regular base, so it is at the same distance from every base vertex. Hence all lateral edges are equal and the right triangle $SOA$ gives the height through the lateral edge.`,
    p: R`Confusing the slant height, the altitude of a lateral face, with a lateral edge, or using the base edge in place of half the base diagonal when computing the height of a regular quadrilateral pyramid.`,
    ex: [
      [R`A regular quadrilateral pyramid has base edge $4$ and lateral edge $6$. Find the height and the volume.`, [
        [R`Half the base diagonal is $OA=2\sqrt2$, so $SO=\sqrt{6^2-8}=\sqrt{28}=2\sqrt7$.`, R`Triangle $SOA$ is right at $O$ with hypotenuse $SA=6$.`],
        [R`The volume is $\frac13\cdot16\cdot2\sqrt7=\frac{32\sqrt7}{3}$.`, R`Use the volume formula for a pyramid with base area $16$.`],
      ], R`The height is $2\sqrt7$ and the volume is $\frac{32\sqrt7}{3}$.`],
      [R`A regular triangular pyramid has base edge $6$ and height $3$. Find the slant height.`, [
        [R`The distance from the centre to a base edge of an equilateral triangle is $\frac{6}{2\sqrt3}=\sqrt3$.`, R`The inradius of an equilateral triangle with side $a$ is $\frac{a}{2\sqrt3}$.`],
        [R`The slant height is the hypotenuse of a right triangle with legs $3$ and $\sqrt3$, so it equals $\sqrt{9+3}=2\sqrt3$.`, R`The slant height joins the apex to the midpoint of a base edge.`],
      ], R`The slant height is $2\sqrt3$.`],
    ],
    dr: [
      [R`A regular quadrilateral pyramid has base edge $6$ and lateral edge $5$. Find the height.`, R`The height is $\sqrt7$.`, R`The square of half the base diagonal is $18$, so $SO=\sqrt{25-18}=\sqrt7$.`],
      [R`A regular quadrilateral pyramid has base edge $8$ and height $3$. Find the lateral area.`, R`The lateral area is $80$.`, R`The distance from the centre to a base edge is $4$, so the slant height is $\sqrt{9+16}=5$ and $S_{xq}=\frac12\cdot32\cdot5=80$.`],
      [R`A regular triangular prism has base edge $4$ and height $5$. Find the volume.`, R`The volume is $20\sqrt3$.`, R`The base area is $\frac{\sqrt3}{4}\cdot16=4\sqrt3$, so the volume is $4\sqrt3\cdot5=20\sqrt3$.`],
    ],
  },
};
