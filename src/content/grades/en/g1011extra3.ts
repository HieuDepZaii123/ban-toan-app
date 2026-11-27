/** Bản tiếng Anh của lớp 10, phần chi tiết thứ ba: ba đường conic (lop1011extra3.ts). */
import type { LessonEn } from "./types.ts";

const R = String.raw;

export const g10Extra4En: Record<string, LessonEn> = {
  "elip-tieu-diem": {
    s: R`The ellipse $\frac{x^2}{a^2}+\frac{y^2}{b^2}=1$ with $a>b>0$ has $c^2=a^2-b^2$, foci $F_1(-c;\ 0)$ and $F_2(c;\ 0)$, focal length $2c$ and eccentricity $e=\frac{c}{a}$ with $0<e<1$. Every point $M$ of the ellipse has $MF_1+MF_2=2a$. When the larger denominator lies under $y^2$, the major axis is the vertical axis and the foci also lie on it.`,
    w: R`An ellipse is the set of points whose distances to the two foci add up to $2a$, so the relation $c^2=a^2-b^2$ shows that the foci lie closer to the centre than the vertices and the eccentricity is always less than $1$.`,
    p: R`Using $c^2=a^2+b^2$ as for the hyperbola, or forgetting to check which denominator is larger and placing the foci on the wrong axis.`,
    ex: [
      [R`Find the foci, the focal length and the eccentricity of the ellipse $\frac{x^2}{25}+\frac{y^2}{9}=1$.`, [
        [R`We have $a^2=25$ and $b^2=9$, so $c^2=25-9=16$ and $c=4$.`, R`Use the relation $c^2=a^2-b^2$ for the ellipse.`],
        [R`The foci are $F_1(-4;\ 0)$ and $F_2(4;\ 0)$, and the focal length is $2c=8$.`, R`The foci lie on the major axis at distance $c$ from the centre.`],
        [R`The eccentricity is $e=\frac{c}{a}=\frac{4}{5}$.`, R`The eccentricity is the ratio of $c$ to $a$ and is always less than $1$ for an ellipse.`],
      ], R`The foci are $(\pm4;\ 0)$, the focal length is $8$ and the eccentricity is $\frac45$.`],
      [R`The point $M$ lies on the ellipse $\frac{x^2}{25}+\frac{y^2}{9}=1$ and $MF_1=7$. Find $MF_2$.`, [
        [R`With $a=5$ we have $MF_1+MF_2=2a=10$.`, R`The sum of the distances from a point of the ellipse to the two foci is always $2a$.`],
        [R`Therefore $MF_2=10-7=3$, and this value lies between $a-c=1$ and $a+c=9$.`, R`The distance to a focus of an ellipse always lies between $a-c$ and $a+c$.`],
      ], R`The distance $MF_2$ equals $3$.`],
    ],
    dr: [
      [R`What is the focal length of the ellipse $\frac{x^2}{16}+\frac{y^2}{7}=1$?`, R`The focal length is $6$.`, R`We have $c^2=16-7=9$, so $c=3$ and the focal length is $2c=6$.`],
      [R`An ellipse has $a=5$ and eccentricity $e=\frac35$. Find $b$.`, R`The required value is $b=4$.`, R`From $c=ae=3$ we get $b^2=a^2-c^2=25-9=16$, so $b=4$.`],
      [R`On which axis do the foci of the ellipse $\frac{x^2}{9}+\frac{y^2}{16}=1$ lie?`, R`The foci lie on the vertical axis.`, R`The larger denominator $16$ lies under $y^2$, so the major axis and both foci lie on the vertical axis, with $c^2=16-9=7$.`, [], ["The horizontal axis.", "The vertical axis.", "Both axes."]],
    ],
  },
  "hypebol-tieu-diem": {
    s: R`The hyperbola $\frac{x^2}{a^2}-\frac{y^2}{b^2}=1$ has $c^2=a^2+b^2$, foci $F_1(-c;\ 0)$ and $F_2(c;\ 0)$, eccentricity $e=\frac{c}{a}>1$ and two asymptotes $y=\pm\frac{b}{a}x$. Every point $M$ of the hyperbola has $\left|MF_1-MF_2\right|=2a$. Unlike the ellipse, here $a$ may be smaller or larger than $b$.`,
    w: R`A hyperbola is the set of points whose distances to the two foci differ by $2a$ in absolute value, so $c$ is larger than $a$ and the eccentricity is always larger than $1$. The two asymptotes are the lines the branches approach far from the centre.`,
    p: R`Using a minus sign in $c^2=a^2+b^2$, or taking the slope of an asymptote to be $\frac{a}{b}$ instead of $\frac{b}{a}$.`,
    ex: [
      [R`Find the foci, the eccentricity and the asymptotes of the hyperbola $\frac{x^2}{9}-\frac{y^2}{16}=1$.`, [
        [R`We have $a^2=9$ and $b^2=16$, so $c^2=9+16=25$ and $c=5$.`, R`The hyperbola uses $c^2=a^2+b^2$, with a plus sign rather than a minus sign.`],
        [R`The foci are $F_1(-5;\ 0)$ and $F_2(5;\ 0)$, and the eccentricity is $e=\frac{5}{3}$.`, R`The eccentricity of a hyperbola is always larger than $1$.`],
        [R`The two asymptotes are $y=\pm\frac{4}{3}x$.`, R`The slope of an asymptote is $\frac{b}{a}$ with $a=3$ and $b=4$.`],
      ], R`The foci are $(\pm5;\ 0)$, the eccentricity is $\frac53$ and the asymptotes are $y=\pm\frac43x$.`],
      [R`Find the ordinate of the point $M$ with abscissa $5$ on the hyperbola $\frac{x^2}{9}-\frac{y^2}{16}=1$.`, [
        [R`Substituting $x=5$ gives $\frac{25}{9}-\frac{y^2}{16}=1$, so $\frac{y^2}{16}=\frac{16}{9}$.`, R`Move terms to isolate the part containing $y^2$.`],
        [R`Hence $y^2=\frac{256}{9}$ and $y=\pm\frac{16}{3}$.`, R`Take the square root, keeping both signs because the hyperbola is symmetric about the horizontal axis.`],
      ], R`There are two points $M\left(5;\ \frac{16}{3}\right)$ and $M\left(5;\ -\frac{16}{3}\right)$.`],
    ],
    dr: [
      [R`What is the focal length of the hyperbola $\frac{x^2}{4}-\frac{y^2}{5}=1$?`, R`The focal length is $6$.`, R`We have $c^2=4+5=9$, so $c=3$ and the focal length is $2c=6$.`],
      [R`Find the eccentricity of the hyperbola $\frac{x^2}{16}-\frac{y^2}{9}=1$.`, R`The eccentricity is $\frac54$.`, R`We have $c^2=16+9=25$, so $c=5$ and $e=\frac{c}{a}=\frac{5}{4}$.`],
      [R`What are the two asymptotes of the hyperbola $\frac{x^2}{4}-\frac{y^2}{16}=1$?`, R`The two asymptotes are $y=\pm2x$.`, R`The slope of an asymptote is $\frac{b}{a}=\frac{4}{2}=2$.`, [], [R`$y=\pm2x$`, R`$y=\pm\frac12x$`, R`$y=\pm4x$`]],
    ],
  },
  "parabol-chuan": {
    s: R`The parabola $y^2=2px$ with $p>0$ has focus $F\left(\frac{p}{2};\ 0\right)$ and directrix $\Delta:\ x=-\frac{p}{2}$. Every point $M$ of the parabola has $MF=d(M;\ \Delta)=x_M+\frac{p}{2}$. The parabola $x^2=2py$ has its focus on the vertical axis and directrix $y=-\frac{p}{2}$.`,
    w: R`A parabola is the set of points equidistant from the focus and the directrix, so the distance to the focus becomes a distance to a line, which is much easier to compute.`,
    p: R`Confusing $p$ with $2p$ when reading the equation, or putting the focus on the horizontal axis for the parabola $x^2=2py$.`,
    ex: [
      [R`Find the focus and the directrix of the parabola $y^2=12x$, then compute $MF$ when $M$ is the point of the parabola with abscissa $5$.`, [
        [R`From $2p=12$ we get $p=6$, so the focus is $F(3;\ 0)$ and the directrix is $x=-3$.`, R`Compare with the standard form $y^2=2px$ to read off $p$.`],
        [R`The distance from $M$ to the focus equals the distance to the directrix, that is $MF=5+3=8$.`, R`This is the definition of a parabola: every point is equidistant from the focus and the directrix.`],
      ], R`The focus is $(3;\ 0)$, the directrix is $x=-3$ and $MF=8$.`],
      [R`Write the equation of the parabola of the form $y^2=2px$ through $A(2;\ 4)$ and find its focus.`, [
        [R`Substitute the coordinates of $A$: $16=2p\cdot2$, so $p=4$.`, R`A point on the parabola has coordinates satisfying the equation.`],
        [R`The equation is $y^2=8x$ with focus $F(2;\ 0)$.`, R`The focus has abscissa $\frac{p}{2}=2$.`],
      ], R`The parabola is $y^2=8x$ and its focus is $F(2;\ 0)$.`],
    ],
    dr: [
      [R`What is the abscissa of the focus of the parabola $y^2=20x$?`, R`The abscissa is $5$.`, R`From $2p=20$ we get $p=10$ and the abscissa of the focus is $\frac{p}{2}=5$.`],
      [R`The point $M$ lies on the parabola $y^2=8x$ and has abscissa $6$. Find the distance from $M$ to the focus.`, R`The distance is $8$.`, R`We have $p=4$, so $MF=x_M+\frac{p}{2}=6+2=8$.`],
      [R`What is the focus of the parabola $x^2=8y$?`, R`The focus is $F(0;\ 2)$.`, R`From $2p=8$ we get $p=4$ and the focus lies on the vertical axis at $\left(0;\ \frac{p}{2}\right)=(0;\ 2)$.`, [], [R`$F(2;\ 0)$`, R`$F(0;\ 2)$`, R`$F(0;\ 4)$`]],
    ],
  },
  "lap-pt-conic": {
    s: R`To write the equation we find the numbers $a$, $b$ or $p$ from the given conditions. For an ellipse use $b^2=a^2-c^2$, for a hyperbola use $b^2=c^2-a^2$, and for a parabola with vertex $O$ and focus $F\left(\frac{p}{2};\ 0\right)$ we have $y^2=2px$. The eccentricity $e=\frac{c}{a}$ and the asymptote slope $\frac{b}{a}$ help us find $a$ from $c$.`,
    w: R`Each standard equation has only two numbers to find, so two independent conditions are enough; the eccentricity and the asymptotes only convert a condition into $a$, $b$ or $c$.`,
    p: R`Forgetting that $a$ is a semi-axis and not the length of the whole axis, so a major axis of $10$ gives $a=5$ and not $a=10$.`,
    ex: [
      [R`Write the equation of the ellipse with foci $(\pm3;\ 0)$ and eccentricity $e=\frac35$.`, [
        [R`We have $c=3$ and $e=\frac{c}{a}=\frac35$, so $a=5$.`, R`The eccentricity gives the length of the semi-major axis.`],
        [R`Then $b^2=a^2-c^2=25-9=16$.`, R`Use the relation for the ellipse to find the semi-minor axis.`],
      ], R`The required ellipse is $\frac{x^2}{25}+\frac{y^2}{16}=1$.`],
      [R`Write the equation of the hyperbola with foci $(\pm5;\ 0)$ and asymptotes $y=\pm\frac34x$.`, [
        [R`We have $\frac{b}{a}=\frac34$ so $b=\frac34a$, and $c^2=a^2+b^2=25$.`, R`The slope of an asymptote gives the ratio between $a$ and $b$.`],
        [R`Hence $a^2\left(1+\frac{9}{16}\right)=25$, which gives $a^2=16$ and $b^2=9$.`, R`Substitute $b=\frac34a$ into the relation and solve for $a^2$.`],
      ], R`The required hyperbola is $\frac{x^2}{16}-\frac{y^2}{9}=1$.`],
    ],
    dr: [
      [R`An ellipse has major axis of length $10$ and focal length $6$. Find $b^2$.`, R`The required value is $b^2=16$.`, R`We have $2a=10$ so $a=5$, and $2c=6$ so $c=3$, which gives $b^2=25-9=16$.`],
      [R`A hyperbola has focal length $10$ and $a=3$. Find $b$.`, R`The required value is $b=4$.`, R`We have $c=5$ so $b^2=c^2-a^2=25-9=16$ and $b=4$.`],
      [R`What is the equation of the parabola with vertex $O$ and focus $F(3;\ 0)$?`, R`The equation is $y^2=12x$.`, R`From $\frac{p}{2}=3$ we get $p=6$ so $y^2=2px=12x$.`, [], [R`$y^2=6x$`, R`$y^2=12x$`, R`$y^2=3x$`]],
    ],
  },
};
