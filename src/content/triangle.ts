import type { Lesson, Question } from "./types.ts";

const R = String.raw;

export const triangleLesson: Lesson = {
  basic: [
    { k: "mo", vi: R`Diện tích tam giác là nửa đáy nhân chiều cao. Thể tích hộp là dài nhân rộng nhân cao.`, en: R`A triangle's area is half base times height. A box's volume is length times width times height.` },
    { k: "dinh", vi: R`$S=\dfrac12 bh$. Chóp $V=\dfrac13 Sh$. Tứ diện đều cạnh $a$: $V=\dfrac{a^3\sqrt2}{12}$.`, en: R`$S=\dfrac12 bh$. Pyramid $V=\dfrac13 Sh$. Regular tetrahedron of edge $a$: $V=\dfrac{a^3\sqrt2}{12}$.` },
    { k: "vd", vi: R`Tam giác đáy $6$, cao $4$: $S=\dfrac{6\cdot 4}{2}=12$.`, en: R`A triangle with base $6$ and height $4$: $S=\dfrac{6\cdot 4}{2}=12$.` },
  ],
  exam: [
    { k: "dinh", vi: R`Phóng cạnh theo $k$ thì diện tích nhân $k^2$, thể tích nhân $k^3$.`, en: R`Scaling edges by $k$ multiplies area by $k^2$ and volume by $k^3$.` },
    { k: "vd", vi: R`Chóp đáy vuông cạnh $6$, cao $4$: $S=36$, $V=\dfrac13\cdot 36\cdot 4=48$.`, en: R`Pyramid with square base of side $6$ and height $4$: $S=36$, $V=\dfrac13\cdot 36\cdot 4=48$.` },
    { k: "loi", vi: R`Bỏ $\dfrac12$ thì đáy $6$, cao $4$ thành $24$. Diện tích đúng là $12$.`, en: R`Dropping $\dfrac12$ turns base $6$ and height $4$ into $24$. The area is $12$.` },
    { k: "kiem", vi: R`Hộp $3\cdot 4\cdot 5$ có $V=60$. Cạnh gấp đôi thì diện tích đáy nhân $4$.`, en: R`A $3\times 4\times 5$ box has $V=60$. Doubling the edges multiplies the base area by $4$.` },
  ],
};

export const triangleQuestions: Question[] = [
  {
    id: "shp-tri",
    prompt: R`Đáy $6$, cao $4$. $S=?$`,
    promptEn: R`Base $6$, height $4$. $S=?$`,
    choices: ["12", "24", "10", "8"],
    choicesEn: ["12", "24", "10", "8"],
    answer: 0,
    hint: R`$\dfrac12 bh$. Đừng quên $\dfrac12$.`,
    hintEn: R`$\dfrac12 bh$. Do not drop $\dfrac12$.`,
    steps: [
      R`$S=\dfrac{6\cdot4}{2}$.`,
      R`$S=12$.`,
      R`$24=6\cdot4$. $10=6+4$. $8$ không phải công thức.`,
    ],
    stepsEn: [
      R`$S=\dfrac{6\cdot4}{2}$.`,
      R`$S=12$.`,
      R`$24=6\cdot4$. $10=6+4$. $8$ is not the formula.`,
    ],
  },
  {
    id: "shp-right",
    prompt: R`Vuông, cạnh $3$ và $4$. $S=?$`,
    promptEn: R`Right triangle, legs $3$ and $4$. $S=?$`,
    choices: ["6", "12", "5", "7"],
    choicesEn: ["6", "12", "5", "7"],
    answer: 0,
    hint: R`$S=\dfrac{3\cdot4}{2}\neq5$.`,
    hintEn: R`$S=\dfrac{3\cdot4}{2}\neq5$.`,
    steps: [
      R`$\dfrac{3\cdot4}{2}$.`,
      R`$S=6$.`,
      R`$12$: quên $\dfrac12$. $5$: huyền. $7=3+4$.`,
    ],
    stepsEn: [
      R`$\dfrac{3\cdot4}{2}$.`,
      R`$S=6$.`,
      R`$12$: dropped $\dfrac12$. $5$: the hypotenuse. $7=3+4$.`,
    ],
  },
  {
    id: "shp-box",
    prompt: R`Hộp $3;\ 4;\ 5$. $V=?$`,
    promptEn: R`Box $3,4,5$. $V=?$`,
    choices: ["60", "12", "24", "15"],
    choicesEn: ["60", "12", "24", "15"],
    answer: 0,
    hint: R`$V=3\cdot4\cdot5$. Đáy $3\cdot4=12\neq V$.`,
    hintEn: R`$V=3\cdot4\cdot5$. Base $3\cdot4=12\neq V$.`,
    steps: [
      R`$3\cdot4\cdot5=60$.`,
      R`Đáy $12$, cao $5$.`,
      R`$12$: đáy. $24=3\cdot4\cdot2$. $15=3\cdot5$.`,
    ],
    stepsEn: [
      R`$3\cdot4\cdot5=60$.`,
      R`Base $12$, height $5$.`,
      R`$12$: the base. $24=3\cdot4\cdot2$. $15=3\cdot5$.`,
    ],
  },
  {
    id: "shp-pyr",
    prompt: R`Chóp, đáy vuông $6$, cao $4$. $V=?$`,
    promptEn: R`Pyramid, square base $6$, height $4$. $V=?$`,
    choices: ["48", "36", "144", "24"],
    choicesEn: ["48", "36", "144", "24"],
    answer: 0,
    hint: R`$V=\dfrac13\cdot36\cdot4$. Đáy $36\neq V$.`,
    hintEn: R`$V=\dfrac13\cdot36\cdot4$. Base $36\neq V$.`,
    steps: [
      R`$6^2=36$.`,
      R`$\dfrac13\cdot36\cdot4=48$.`,
      R`$36$: đáy. $144=36\cdot4$. $24=6\cdot4$.`,
    ],
    stepsEn: [
      R`$6^2=36$.`,
      R`$\dfrac13\cdot36\cdot4=48$.`,
      R`$36$: the base. $144=36\cdot4$. $24=6\cdot4$.`,
    ],
  },
  {
    id: "shp-tet",
    prompt: R`Tứ diện đều, $a=6$. $V=?$`,
    promptEn: R`Regular tetrahedron, $a=6$. $V=?$`,
    choices: [R`$18\sqrt{2}$`, R`$9\sqrt{3}$`, R`$216$`, R`$36$`],
    choicesEn: [R`$18\sqrt{2}$`, R`$9\sqrt{3}$`, R`$216$`, R`$36$`],
    answer: 0,
    hint: R`Sáu cạnh $=a$. $V=\dfrac{a^3\sqrt{2}}{12}$.`,
    hintEn: R`Six edges $=a$. $V=\dfrac{a^3\sqrt{2}}{12}$.`,
    steps: [
      R`$V=\dfrac{6^3\sqrt{2}}{12}$.`,
      R`$\dfrac{216\sqrt{2}}{12}=18\sqrt{2}$.`,
      R`$9\sqrt{3}$: một mặt. $216=a^3$. $36=a^2$.`,
    ],
    stepsEn: [
      R`$V=\dfrac{6^3\sqrt{2}}{12}$.`,
      R`$\dfrac{216\sqrt{2}}{12}=18\sqrt{2}$.`,
      R`$9\sqrt{3}$: one face. $216=a^3$. $36=a^2$.`,
    ],
  },
  {
    id: "shp-sim",
    prompt: R`Đồng dạng, $k=2$. $\dfrac{S'}{S}=?$`,
    promptEn: R`Similar, $k=2$. $\dfrac{S'}{S}=?$`,
    choices: ["4", "2", "8", "1"],
    choicesEn: ["4", "2", "8", "1"],
    answer: 0,
    hint: R`$\dfrac{S'}{S}=k^2$. $k\neq\dfrac{S'}{S}$.`,
    hintEn: R`$\dfrac{S'}{S}=k^2$. $k\neq\dfrac{S'}{S}$.`,
    steps: [
      R`$\dfrac{S'}{S}=k^2$.`,
      R`$2^2=4$.`,
      R`$2=k$. $8=k^3$. $1$: bằng nhau.`,
    ],
    stepsEn: [
      R`$\dfrac{S'}{S}=k^2$.`,
      R`$2^2=4$.`,
      R`$2=k$. $8=k^3$. $1$: congruent.`,
    ],
  },
];
