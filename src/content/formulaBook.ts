import { fold } from "../lib/text.ts";

export type FormulaItem = { name: string; tex: string };
export type FormulaGroup = { title: string; items: FormulaItem[] };

export const formulaGroups: FormulaGroup[] = [
  {
    title: "Đại số",
    items: [
      { name: "Delta", tex: String.raw`\Delta=b^2-4ac` },
      { name: "Nghiệm", tex: String.raw`x_{1,2}=\frac{-b\pm\sqrt{\Delta}}{2a}` },
      { name: "Đỉnh", tex: String.raw`I\left(-\frac{b}{2a};-\frac{\Delta}{4a}\right)` },
      { name: "Viète", tex: String.raw`x_1+x_2=-\dfrac{b}{a},\quad x_1x_2=\dfrac{c}{a}` },
      { name: "Mũ và logarit", tex: String.raw`a^m a^n=a^{m+n},\quad \log_a b=\frac{\log_c b}{\log_c a}` },
      { name: "Cấp số cộng", tex: String.raw`u_n=u_1+(n-1)d,\quad S_n=\dfrac{n(u_1+u_n)}{2}` },
      { name: "Cấp số nhân", tex: String.raw`u_n=u_1 q^{n-1},\quad S_n=u_1\dfrac{1-q^n}{1-q},\quad S=u_1/(1-q)\ (|q|<1)` },
      { name: "Bất đẳng thức", tex: String.raw`a+b\ge 2\sqrt{ab},\quad (ax+by)^2\le(a^2+b^2)(x^2+y^2)` },
    ],
  },
  {
    title: "Lượng giác",
    items: [
      { name: "Cơ bản", tex: String.raw`\sin^2 x+\cos^2 x=1,\quad 1+\tan^2 x=\dfrac{1}{\cos^2 x}` },
      { name: "Cộng", tex: String.raw`\sin(a\pm b)=\sin a\cos b\pm\cos a\sin b` },
      { name: "Nhân đôi", tex: String.raw`\sin 2a=2\sin a\cos a,\quad \cos 2a=2\cos^2 a-1` },
      { name: "Phương trình", tex: String.raw`\cos x=\cos\alpha\Leftrightarrow x=\pm\alpha+k2\pi` },
    ],
  },
  {
    title: "Giải tích",
    items: [
      { name: "Đạo hàm", tex: String.raw`(x^n)'=nx^{n-1},\quad (e^x)'=e^x,\quad (\ln x)'=\dfrac{1}{x},\quad (uv)'=u'v+uv'` },
      { name: "Tiếp tuyến", tex: String.raw`y=f'(x_0)(x-x_0)+f(x_0)` },
      { name: "Giới hạn", tex: String.raw`\lim_{x\to 0}\dfrac{\sin x}{x}=1,\quad \lim_{x\to\infty}\left(1+\dfrac{1}{x}\right)^x=e` },
      { name: "Nguyên hàm", tex: String.raw`\int x^n\,dx=\dfrac{x^{n+1}}{n+1}+C,\quad \int\dfrac{dx}{x}=\ln|x|+C` },
      { name: "Tích phân", tex: String.raw`\int_a^b f(x)\,dx=F(b)-F(a),\quad \int u\,dv=uv-\int v\,du` },
      { name: "Diện tích", tex: String.raw`S=\int_a^b|f-g|\,dx,\quad V=\pi\int_a^b f^2(x)\,dx` },
    ],
  },
  {
    title: "Hình học",
    items: [
      { name: "Tam giác", tex: String.raw`S=\dfrac{1}{2}ah=\dfrac{1}{2}ab\sin C,\quad a^2=b^2+c^2-2bc\cos A` },
      { name: "Khối đa diện", tex: String.raw`V_{\text{chóp}}=\dfrac{1}{3}Sh,\quad V_{\text{lăng trụ}}=Sh,\quad V_{\text{tứ diện đều}}=\dfrac{a^3\sqrt{2}}{12}` },
      { name: "Khối tròn xoay", tex: String.raw`V_{\text{trụ}}=\pi r^2 h,\quad V_{\text{nón}}=\dfrac{1}{3}\pi r^2 h,\quad V_{\text{cầu}}=\dfrac{4}{3}\pi r^3` },
      { name: "Vectơ", tex: String.raw`\vec u\cdot\vec v=x_1x_2+y_1y_2+z_1z_2` },
      { name: "Oxyz", tex: String.raw`d=\dfrac{|ax_0+by_0+cz_0+d|}{\sqrt{a^2+b^2+c^2}}` },
    ],
  },
  {
    title: "Tổ hợp và xác suất",
    items: [
      { name: "Đếm", tex: String.raw`P_n=n!,\quad A_n^k=\dfrac{n!}{(n-k)!},\quad C_n^k=\dfrac{n!}{k!(n-k)!}` },
      { name: "Nhị thức", tex: String.raw`(a+b)^n=\sum_{k=0}^{n} C_n^k a^{n-k}b^k` },
      { name: "Xác suất", tex: String.raw`P(A)=\dfrac{n(A)}{n(\Omega)},\quad P(\bar A)=1-P(A)` },
      { name: "Bayes", tex: String.raw`P(A|B)=\dfrac{P(AB)}{P(B)}` },
    ],
  },
];

export function searchFormulas(query: string): FormulaGroup[] {
  const needle = fold(query.trim());
  if (!needle) return formulaGroups;
  return formulaGroups.flatMap((group) => {
    const items = group.items.filter((item) => fold(`${group.title} ${item.name} ${item.tex}`).includes(needle));
    return items.length ? [{ title: group.title, items }] : [];
  });
}
