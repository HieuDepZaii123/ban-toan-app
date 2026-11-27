/** Bản tiếng Anh của lớp 11, bài vận dụng cao về tỉ số thể tích (lop11extra5.ts). */
import type { LessonEn } from "./types.ts";

const R = String.raw;

export const g11Extra6En: Record<string, LessonEn> = {
  "ty-so-the-tich": {
    s: R`For a triangular pyramid $S.ABC$ and points $M$, $N$, $P$ on $SA$, $SB$, $SC$ respectively, the ratio of volumes is $\frac{V_{S.MNP}}{V_{S.ABC}}=\frac{SM}{SA}\cdot\frac{SN}{SB}\cdot\frac{SP}{SC}$. For a pyramid with a quadrilateral base we split it into triangular pyramids with the same apex and add or subtract the volumes. Two solids with the same height have volumes proportional to their base areas.`,
    w: R`Two pyramids sharing the apex and the angle at the apex have base areas and heights that both scale with the ratios of the edges from the apex, so the ratio of volumes is the product of the three edge ratios; every pyramid with a quadrilateral base splits into triangular pyramids.`,
    p: R`Taking the edge ratios from the base instead of from the apex $S$, or using the product of three ratios when the two solids do not share an apex.`,
    ex: [
      [R`Let $S.ABC$ be a triangular pyramid and $M$, $N$, $P$ points of $SA$, $SB$, $SC$ with $\frac{SM}{SA}=\frac12$, $\frac{SN}{SB}=\frac23$, $\frac{SP}{SC}=\frac34$. Find $\frac{V_{S.MNP}}{V_{S.ABC}}$.`, [
        [R`The two solids share the apex $S$ and the angle at the apex, so the ratio of volumes equals the product of the three edge ratios.`, R`Both the base area and the height change with the ratios of the edges from $S$.`],
        [R`Hence the ratio equals $\frac12\cdot\frac23\cdot\frac34=\frac14$.`, R`Multiply the three ratios and simplify.`],
      ], R`The ratio of volumes equals $\frac14$.`],
      [R`The pyramid $S.ABCD$ has a parallelogram base, $M$ is the midpoint of $SC$ and the plane $(ABM)$ meets $SD$ at $N$. Find the ratio of the volumes of the two parts into which $(ABM)$ cuts the solid.`, [
        [R`Since $AB\parallel CD$, the line of intersection of $(ABM)$ with $(SCD)$ passes through $M$ parallel to $CD$, so $N$ is the midpoint of $SD$.`, R`A plane containing $AB$ meets the plane containing $CD$ in a line parallel to $AB$ and $CD$.`],
        [R`Let $V=V_{S.ABCD}$, then $V_{S.ABC}=V_{S.ACD}=\frac V2$, and $V_{S.ABM}=\frac12\cdot\frac V2=\frac V4$, $V_{S.AMN}=\frac12\cdot\frac12\cdot\frac V2=\frac V8$.`, R`Split the parallelogram base into two equal triangles along the diagonal $AC$ and then apply the volume ratio.`],
        [R`The part containing the apex $S$ has volume $\frac V4+\frac V8=\frac{3V}{8}$, so the other part has volume $\frac{5V}{8}$.`, R`The two parts add up to the whole solid.`],
      ], R`The two parts have volumes in the ratio $3:5$.`],
    ],
    dr: [
      [R`Let $S.ABC$ with $M$, $N$, $P$ on $SA$, $SB$, $SC$ and $\frac{SM}{SA}=\frac13$, $\frac{SN}{SB}=\frac12$, $\frac{SP}{SC}=\frac15$. Find $\frac{V_{S.MNP}}{V_{S.ABC}}$.`, R`The ratio equals $\frac{1}{30}$.`, R`Multiply the three edge ratios: $\frac13\cdot\frac12\cdot\frac15=\frac{1}{30}$.`],
      [R`With the points above and $V_{S.ABC}=60$, find $V_{S.MNP}$.`, R`The volume equals $2$.`, R`We have $V_{S.MNP}=60\cdot\frac1{30}=2$.`],
      [R`In the second example, what is the ratio of the volume of the part containing the apex $S$ to that of the other part?`, R`The ratio is $3:5$.`, R`The part containing $S$ takes $\frac38$ of the volume and the other part takes $\frac58$, so the ratio is $3:5$.`, [], [R`$3:5$`, R`$1:1$`, R`$1:3$`]],
    ],
  },
};
