/** Bản tiếng Anh của các bài lớp 12 bổ sung (lop12extra.ts). */
import type { LessonEn } from "./types.ts";

const R = String.raw;

export const g12ExtraEn: Record<string, LessonEn> = {
  "toi-uu": {
    s: R`An optimisation word problem has four steps: choose the unknown $x$ and find its real domain from the figure, write the quantity to optimise as a function of one variable, find the stationary points in the domain, then compare with the values at the two ends of the domain. Finally answer the quantity that was asked for.`,
    w: R`A function continuous on an interval reaches a maximum and a minimum, and only at a point where the derivative is $0$ or at an endpoint. So only a few values need comparing; there is no need to try every $x$.`,
    p: R`Answering with the value of $x$ instead of the quantity that was asked for, or accepting a root of the derivative outside the domain. The box needs a positive base, so $x$ cannot equal half the side of the sheet.`,
    ex: [
      [R`There are $100$ m of fencing to fence three sides of a rectangular plot, the fourth side being a wall. Find the largest area of the plot.`, [
        [R`Let $x$ be the length of each side perpendicular to the wall. The side parallel to the wall is $100-2x$ long, with $0<x<50$.`, R`The three fenced sides use all $100$ m, and each side must be positive, so $x$ lies in the interval $(0,50)$.`],
        [R`The area is $S(x)=x(100-2x)$ and $S'(x)=100-4x=0$ when $x=25$.`, R`The point $x=25$ lies in $(0,50)$, so it is accepted as the stationary point.`],
        [R`The value is $S(25)=25\cdot 50=1250$, while at the two ends of the domain $S$ tends to $0$.`, R`The two ends give area $0$, smaller than $1250$, so $x=25$ gives the maximum.`],
      ], R`The largest area of the plot is $1250$ square metres.`],
      [R`From a square sheet of metal with side $12$ dm, cut away four squares with side $x$ at the corners and fold the rest into an open box. Find the largest volume of the box.`, [
        [R`The base of the box is a square with side $12-2x$ and the height is $x$, so $V(x)=x(12-2x)^2$ with $0<x<6$.`, R`The base side must be positive, so $12-2x>0$, that is, $x<6$.`],
        [R`We have $V'(x)=(12-2x)(12-6x)=0$ when $x=2$ or $x=6$, and only $x=2$ lies in the domain.`, R`The derivative of the product has two terms; combined they give the two factors above. The root $x=6$ is an endpoint, so it is rejected.`],
        [R`The value is $V(2)=2\cdot 8^2=128$.`, R`The volume is $0$ as $x$ tends to the two ends of the domain, so $128$ is the maximum.`],
      ], R`The largest volume of the box is $128$ cubic dm.`],
    ],
    dr: [
      [R`There are $60$ m of fencing to fence three sides of a rectangular plot against a wall. Find the largest area.`, R`The largest area is $450$ square metres.`, R`The function $S(x)=x(60-2x)$ has stationary point $x=15$, and the two ends of the domain give area $0$.`],
      [R`A square sheet of metal with side $18$ dm is made into an open box as above. Find the largest volume.`, R`The largest volume is $432$ cubic dm.`, R`The stationary point is $x=3$ and $V(3)=3\cdot 12^2=432$.`],
      [R`A rectangle has perimeter $40$ cm. What is its largest possible area?`, R`The largest area is $100$ square cm, when both sides equal $10$ cm.`, R`With one side $x$ the other is $20-x$, and $S(x)=x(20-x)$ has stationary point $x=10$.`],
    ],
  },
  "tham-so-dd": {
    s: R`A cubic is increasing on $\mathbb{R}$ when $y'\ge 0$ for all $x$. Since $y'$ is a quadratic trinomial, the condition is a positive leading coefficient and $\Delta'\le 0$. For decreasing, the leading coefficient is negative and $\Delta'\le 0$. Solve the condition in the parameter, then count the integers that satisfy it.`,
    w: R`A quadratic trinomial with a positive leading coefficient and $\Delta'\le 0$ has a graph above or touching the horizontal axis, so it is not negative for any $x$. Then the derivative is not negative and the function never decreases.`,
    p: R`Dropping the equality sign and so losing the boundary value of the parameter. When $\Delta'=0$ we have $y'=0$ at only one point and the function is still increasing, so the boundary value must be kept.`,
    ex: [
      [R`Find $m$ so that $y=x^3+3x^2+mx+2$ is increasing on $\mathbb{R}$.`, [
        [R`We have $y'=3x^2+6x+m$, with leading coefficient $3>0$.`, R`A function is increasing on $\mathbb{R}$ when its derivative is not negative for any $x$, and here the derivative is a quadratic trinomial.`],
        [R`We need $\Delta'=3^2-3m=9-3m\le 0$.`, R`With a positive leading coefficient, the trinomial is not negative for any $x$ when the reduced discriminant is not positive.`],
        [R`Solving gives $m\ge 3$.`, R`Dividing both sides of $9-3m\le 0$ by $-3$ reverses the inequality, so we get $m\ge 3$.`],
      ], R`The function is increasing on $\mathbb{R}$ when $m\ge 3$.`],
      [R`How many integers $m$ in the interval $[-5,10]$ make $y=x^3+3x^2+mx+2$ increasing on $\mathbb{R}$?`, [
        [R`By the previous example, the condition is $m\ge 3$.`, R`The function has not changed, so the condition for increasing on $\mathbb{R}$ is still $m\ge 3$.`],
        [R`The integers in $[-5,10]$ that are not less than $3$ are $3$, $4$, $\dots$, $10$.`, R`The interval $[-5,10]$ includes both endpoints, and $m=3$ also works because equality is allowed.`],
        [R`There are $10-3+1=8$ such integers.`, R`The number of integers from $3$ to $10$ is the difference of the ends plus one, because both ends are counted.`],
      ], R`There are $8$ integer values of $m$.`],
    ],
    dr: [
      [R`Find $m$ so that $y=x^3-6x^2+mx$ is increasing on $\mathbb{R}$.`, R`The condition is $m\ge 12$.`, R`The derivative $y'=3x^2-12x+m$ has $\Delta'=36-3m\le 0$, so $m\ge 12$.`],
      [R`Find $m$ so that $y=-x^3+3x^2+mx+1$ is decreasing on $\mathbb{R}$.`, R`The condition is $m\le -3$.`, R`The derivative $y'=-3x^2+6x+m$ has a negative leading coefficient and $\Delta'=9+3m\le 0$, so $m\le -3$.`],
      [R`How many integers $m$ in the interval $[0,20]$ make $y=x^3+6x^2+mx$ increasing on $\mathbb{R}$?`, R`There are $9$ integer values of $m$.`, R`The condition is $36-3m\le 0$, that is $m\ge 12$, and the integers from $12$ to $20$ are $9$ numbers.`],
    ],
  },
  "boi-cuc-tri": {
    s: R`If $f'(x)=(x-a)^k g(x)$ with $g(a)\ne 0$, then $f'$ changes sign at $a$ exactly when $k$ is odd. So the number of extrema of $f$ equals the number of odd-multiplicity roots of $f'(x)=0$, and roots of even multiplicity give no extremum.`,
    w: R`The factor $(x-a)^k$ changes sign as $x$ passes $a$ when $k$ is odd, because an odd power keeps the sign of $x-a$. If $k$ is even the power is never negative, so the sign of $f'$ does not change.`,
    p: R`Counting every root of $f'(x)=0$ as an extremum. A root of even multiplicity is still a root, but $f'$ keeps its sign there, so the point is not an extremum of $f$.`,
    ex: [
      [R`A function $f$ has $f'(x)=(x-1)^2(x+2)(x-3)$. How many extrema does it have?`, [
        [R`The roots of $f'(x)=0$ are $1$ (multiplicity $2$), $-2$ (multiplicity $1$) and $3$ (multiplicity $1$).`, R`The exponent of each factor gives the multiplicity of the corresponding root.`],
        [R`The root $1$ has even multiplicity, so $f'$ does not change sign there.`, R`A square is never negative, so $(x-1)^2$ does not change sign passing $1$, and the other factors keep their signs near $1$.`],
        [R`The roots $-2$ and $3$ have odd multiplicity, so $f'$ changes sign, and there are two extrema.`, R`Each odd-multiplicity root gives exactly one extremum of the function $f$.`],
      ], R`The function has $2$ extrema.`],
      [R`A function $f$ has $f'(x)=x^3(x-2)^4$. How many extrema does it have?`, [
        [R`The root $0$ has multiplicity $3$ and the root $2$ has multiplicity $4$.`, R`The exponent $3$ of $x$ and the exponent $4$ of $x-2$ are the multiplicities.`],
        [R`Multiplicity $3$ is odd, so $f'$ changes sign at $0$, while multiplicity $4$ is even, so $f'$ does not change sign at $2$.`, R`A cube keeps the sign of $x$, while a fourth power of $x-2$ is never negative.`],
      ], R`The function has $1$ extremum, at $x=0$.`],
    ],
    dr: [
      [R`A function $f$ has $f'(x)=(x+1)(x-1)^2(x-2)^3$. How many extrema does it have?`, R`It has $2$ extrema.`, R`The multiplicities are $1$, $2$ and $3$, and the two odd-multiplicity roots are $-1$ and $2$.`],
      [R`A function $f$ has $f'(x)=x^2(x^2-4)$. How many extrema does it have?`, R`It has $2$ extrema.`, R`Factoring gives $f'(x)=x^2(x-2)(x+2)$, so the root $0$ of even multiplicity is rejected, while $2$ and $-2$ have multiplicity $1$.`],
      [R`A function $f$ has $f'(x)=x(x-1)(x-2)(x-3)^2$. How many extrema does it have?`, R`It has $3$ extrema.`, R`The three roots $0$, $1$, $2$ have multiplicity $1$ so the sign changes, while the root $3$ has multiplicity $2$ and is rejected.`],
    ],
  },
  "doi-bien-tp": {
    s: R`When the expression under the integral has the form $f(g(x))\cdot g'(x)$, put $t=g(x)$; then $dt=g'(x)\,dx$ and the integral becomes $\int f(t)\,dt$. When changing the variable you must change both limits: the new limits are $g(a)$ and $g(b)$.`,
    w: R`If $F$ is an antiderivative of $f$, then by the chain rule the derivative of $F(g(x))$ is $f(g(x))\,g'(x)$. So $F(g(x))$ is an antiderivative of the expression being integrated, and the value of the integral depends only on the values of $g$ at the two limits.`,
    p: R`Changing the variable but keeping the limits in $x$ after computing in $t$. The limits must be changed using $t=g(x)$, or you must return to the variable $x$ before substituting the limits.`,
    ex: [
      [R`Compute $\displaystyle\int_0^1 2x\,e^{x^2}\,dx$.`, [
        [R`Put $t=x^2$, so $dt=2x\,dx$.`, R`The part $2x\,dx$ in the expression is exactly $dt$, so the substitution removes $x$ completely.`],
        [R`Change the limits: $x=0$ gives $t=0$, and $x=1$ gives $t=1$.`, R`The limits must follow the new variable, computed with $t=x^2$ at the two endpoints.`],
        [R`The integral becomes $\displaystyle\int_0^1 e^t\,dt=e^t\Big|_0^1=e-1$.`, R`The antiderivative of $e^t$ is itself; then take the value at the upper limit minus the value at the lower limit.`],
      ], R`The value of the integral is $e-1$.`],
      [R`Compute $\displaystyle\int_0^{\frac{\pi}{2}}\sin x\cos x\,dx$.`, [
        [R`Put $t=\sin x$, so $dt=\cos x\,dx$.`, R`The derivative of $\sin x$ is $\cos x$, exactly the remaining factor in the expression.`],
        [R`Change the limits: $x=0$ gives $t=0$, and $x=\frac{\pi}{2}$ gives $t=1$.`, R`Compute $\sin 0=0$ and $\sin\frac{\pi}{2}=1$ to get the new limits.`],
        [R`The integral becomes $\displaystyle\int_0^1 t\,dt=\frac{t^2}{2}\Big|_0^1=\frac{1}{2}$.`, R`The antiderivative of $t$ is $\frac{t^2}{2}$; then substitute the two new limits.`],
      ], R`The value of the integral is $\frac{1}{2}$.`],
    ],
    dr: [
      [R`Compute $\displaystyle\int_0^2 (2x+1)^3\,dx$ by putting $t=2x+1$.`, R`The value is $78$.`, R`With $t=2x+1$ we have $dt=2\,dx$, the limits run from $1$ to $5$, and $\frac{1}{2}\cdot\frac{5^4-1}{4}=78$.`],
      [R`Compute $\displaystyle\int_0^1 x(x^2+1)^2\,dx$.`, R`The value is $\frac{7}{6}$.`, R`Put $t=x^2+1$, so $x\,dx=\frac{1}{2}dt$, the limits run from $1$ to $2$, and $\frac{1}{2}\cdot\frac{2^3-1}{3}=\frac{7}{6}$.`],
      [R`Compute $\displaystyle\int_0^{\frac{\pi}{2}}\cos x\,e^{\sin x}\,dx$.`, R`The value is $e-1$.`, R`Put $t=\sin x$, so $dt=\cos x\,dx$, the limits run from $0$ to $1$, and $\int_0^1 e^t\,dt=e-1$.`],
    ],
  },
  "tung-phan-bai": {
    s: R`When the expression under the integral is a product of two different kinds of function, use the formula $\int_a^b u\,dv=uv\Big|_a^b-\int_a^b v\,du$. Choose $u$ as the part that becomes simpler when differentiated, and $dv$ as the part with an easy antiderivative.`,
    w: R`From the derivative of a product $(uv)'=u'v+uv'$, integrating both sides over the interval $[a,b]$ gives $uv\Big|_a^b=\int_a^b v\,du+\int_a^b u\,dv$. Moving a term across gives the formula for integration by parts.`,
    p: R`Choosing $u$ and $dv$ the wrong way round, so the new integral is more complicated. For $x e^x$ choose $u=x$ so the derivative is just $1$, and not $u=e^x$.`,
    ex: [
      [R`Compute $\displaystyle\int_0^1 x\,e^x\,dx$.`, [
        [R`Choose $u=x$ and $dv=e^x\,dx$, so $du=dx$ and $v=e^x$.`, R`The derivative of $x$ is just $1$, while an antiderivative of $e^x$ is still $e^x$.`],
        [R`Apply the formula: $\displaystyle xe^x\Big|_0^1-\int_0^1 e^x\,dx$.`, R`Substitute $u$, $v$, $du$ into $uv\Big|_a^b-\int_a^b v\,du$ with $a=0$ and $b=1$.`],
        [R`We get $e-(e-1)=1$.`, R`The value $xe^x\Big|_0^1$ equals $e$ and $\int_0^1 e^x\,dx=e-1$.`],
      ], R`The value of the integral is $1$.`],
      [R`Compute $\displaystyle\int_0^{\pi}x\sin x\,dx$.`, [
        [R`Choose $u=x$ and $dv=\sin x\,dx$, so $du=dx$ and $v=-\cos x$.`, R`An antiderivative of $\sin x$ is $-\cos x$, and $x$ becomes $1$ when differentiated.`],
        [R`We have $\displaystyle -x\cos x\Big|_0^{\pi}+\int_0^{\pi}\cos x\,dx$.`, R`The formula $uv\Big|_a^b-\int_a^b v\,du$ with $v=-\cos x$ turns the minus sign into a plus sign.`],
        [R`We get $\pi+\sin x\Big|_0^{\pi}=\pi+0=\pi$.`, R`The value $-x\cos x\Big|_0^{\pi}$ equals $-\pi\cdot(-1)-0=\pi$, while $\sin\pi-\sin 0=0$.`],
      ], R`The value of the integral is $\pi$.`],
    ],
    dr: [
      [R`Compute $\displaystyle\int_0^{\frac{\pi}{2}}x\cos x\,dx$.`, R`The value is $\frac{\pi}{2}-1$.`, R`Choose $u=x$ and $dv=\cos x\,dx$ to get $x\sin x\Big|_0^{\frac{\pi}{2}}-\int_0^{\frac{\pi}{2}}\sin x\,dx=\frac{\pi}{2}-1$.`],
      [R`Compute $\displaystyle\int_1^e \ln x\,dx$.`, R`The value is $1$.`, R`Choose $u=\ln x$ and $dv=dx$ to get $x\ln x\Big|_1^e-\int_1^e dx=e-(e-1)=1$.`],
      [R`Compute $\displaystyle\int_0^1 x^2 e^x\,dx$.`, R`The value is $e-2$.`, R`Apply parts twice: $x^2e^x\Big|_0^1-2\int_0^1 xe^x\,dx=e-2\cdot 1$.`],
    ],
  },
  "van-toc-qd": {
    s: R`If an object moves along a line with velocity $v(t)$, the distance it travels from time $t_1$ to $t_2$ is $\int_{t_1}^{t_2}|v(t)|\,dt$. When $v(t)\ge 0$ on that interval, the absolute value can be dropped. The object stops when $v(t)=0$.`,
    w: R`In a very short time $dt$ the object travels about $|v(t)|\,dt$. Adding up these small pieces is exactly the integral, and the absolute value keeps the distance non-negative even when the object reverses.`,
    p: R`Integrating $v(t)$ when the object reverses. Then the part with $v(t)<0$ is subtracted, so the result is the displacement and not the distance, and the interval must be split at the roots of $v(t)=0$.`,
    ex: [
      [R`An object moves with velocity $v(t)=6t-t^2$ (m/s). Find the distance it travels in the first $3$ seconds.`, [
        [R`On $[0,3]$ we have $v(t)=t(6-t)\ge 0$.`, R`Both factors $t$ and $6-t$ are not negative for $t$ in this interval, so the object does not reverse.`],
        [R`The distance is $\displaystyle\int_0^3(6t-t^2)\,dt=\left(3t^2-\frac{t^3}{3}\right)\Big|_0^3$.`, R`An antiderivative of $6t$ is $3t^2$ and an antiderivative of $t^2$ is $\frac{t^3}{3}$.`],
        [R`The value is $27-9=18$.`, R`Substituting $t=3$ in the antiderivative gives $3\cdot 9-\frac{27}{3}$, while at $t=0$ it is $0$.`],
      ], R`The object travels $18$ metres.`],
      [R`A car travelling at $20$ m/s brakes and moves with velocity $v(t)=20-4t$ (m/s). Find the distance from braking until it stops.`, [
        [R`The car stops when $v(t)=0$, that is, $t=5$ seconds.`, R`Solving $20-4t=0$ gives $t=5$, which is the upper limit of the integral.`],
        [R`The distance is $\displaystyle\int_0^5(20-4t)\,dt=(20t-2t^2)\Big|_0^5$.`, R`On $[0,5]$ the velocity is not negative, so no absolute value is needed.`],
        [R`The value is $100-50=50$.`, R`Substitute $t=5$ in the antiderivative $20t-2t^2$.`],
      ], R`The car travels another $50$ metres before it stops.`],
    ],
    dr: [
      [R`An object has velocity $v(t)=3t^2$ (m/s). Find the distance it travels in the first $2$ seconds.`, R`It travels $8$ metres.`, R`An antiderivative of $3t^2$ is $t^3$, so the distance is $2^3-0^3=8$.`],
      [R`A car has velocity $v(t)=12-2t$ (m/s) from the moment it brakes. Find the distance it travels until it stops.`, R`The car travels $36$ metres.`, R`The car stops when $t=6$ and $\int_0^6(12-2t)\,dt=(12t-t^2)\Big|_0^6=36$.`],
      [R`An object has velocity $v(t)=t^2-4t$ (m/s). Find the distance it travels from $t=0$ to $t=4$.`, R`It travels $\frac{32}{3}$ metres.`, R`On $[0,4]$ we have $v(t)\le 0$, so the distance is $\int_0^4(4t-t^2)\,dt=32-\frac{64}{3}=\frac{32}{3}$.`],
    ],
  },
};
