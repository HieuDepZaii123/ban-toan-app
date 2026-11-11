import { fold } from "../lib/text.ts";

/** `note` là điều kiện dùng của công thức, viết bằng chữ có `$...$`. */
export type FormulaItem = { name: string; tex: string; note?: string };
export type FormulaGroup = { title: string; items: FormulaItem[] };

const R = String.raw;

export const formulaGroups: FormulaGroup[] = [
  {
    title: "Đại số",
    items: [
      { name: "Delta", tex: R`\Delta=b^2-4ac`, note: R`Cho phương trình $ax^2+bx+c=0$ với $a\neq 0$.` },
      { name: "Nghiệm", tex: R`x_{1,2}=\frac{-b\pm\sqrt{\Delta}}{2a}`, note: R`Cần $a\neq 0$ và $\Delta\ge 0$. Khi $\Delta<0$ phương trình không có nghiệm thực.` },
      { name: "Đỉnh", tex: R`I\left(-\frac{b}{2a};-\frac{\Delta}{4a}\right)`, note: R`Parabol $y=ax^2+bx+c$ với $a\neq 0$.` },
      { name: "Viète", tex: R`x_1+x_2=-\dfrac{b}{a},\quad x_1x_2=\dfrac{c}{a}`, note: R`Cần $a\neq 0$ và $\Delta\ge 0$ (phương trình có nghiệm).` },
      { name: "Mũ và logarit", tex: R`a^m a^n=a^{m+n},\quad \log_a b=\frac{\log_c b}{\log_c a}`, note: R`Lũy thừa số mũ thực cần $a>0$. Logarit cần $a>0$, $a\neq 1$, $c>0$, $c\neq 1$ và $b>0$.` },
      { name: "Cấp số cộng", tex: R`u_n=u_1+(n-1)d,\quad S_n=\dfrac{n(u_1+u_n)}{2}`, note: R`$d$ là công sai, $n$ là số nguyên dương.` },
      { name: "Cấp số nhân", tex: R`u_n=u_1 q^{n-1},\quad S_n=u_1\dfrac{1-q^n}{1-q},\quad S_\infty=\dfrac{u_1}{1-q}`, note: R`$S_n$ cần $q\neq 1$ (nếu $q=1$ thì $S_n=nu_1$). Tổng vô hạn $S_\infty$ chỉ có khi $|q|<1$.` },
      { name: "Bất đẳng thức", tex: R`a+b\ge 2\sqrt{ab},\quad (ax+by)^2\le(a^2+b^2)(x^2+y^2)`, note: R`Bất đẳng thức đầu (AM–GM) cần $a\ge 0$, $b\ge 0$, dấu bằng khi $a=b$. Bất đẳng thức sau đúng với mọi số thực.` },
    ],
  },
  {
    title: "Lượng giác",
    items: [
      { name: "Cơ bản", tex: R`\sin^2 x+\cos^2 x=1,\quad 1+\tan^2 x=\dfrac{1}{\cos^2 x}`, note: R`Công thức thứ hai cần $\cos x\neq 0$.` },
      { name: "Cộng", tex: R`\sin(a\pm b)=\sin a\cos b\pm\cos a\sin b` },
      { name: "Nhân đôi", tex: R`\sin 2a=2\sin a\cos a,\quad \cos 2a=2\cos^2 a-1` },
      { name: "Phương trình", tex: R`\cos x=\cos\alpha\Leftrightarrow x=\pm\alpha+k2\pi,\quad k\in\mathbb{Z}`, note: R`Góc tính bằng rađian.` },
    ],
  },
  {
    title: "Giải tích",
    items: [
      { name: "Đạo hàm cơ bản", tex: R`(x^n)'=nx^{n-1},\quad (\sqrt{x})'=\dfrac{1}{2\sqrt{x}},\quad (e^x)'=e^x,\quad (a^x)'=a^x\ln a,\quad (\ln x)'=\dfrac{1}{x}`, note: R`$\sqrt{x}$ và $\ln x$ cần $x>0$. Với $a^x$ cần $a>0$, $a\neq 1$.` },
      { name: "Đạo hàm lượng giác", tex: R`(\sin x)'=\cos x,\quad (\cos x)'=-\sin x,\quad (\tan x)'=\dfrac{1}{\cos^2 x}`, note: R`$x$ tính bằng rađian. $\tan x$ cần $\cos x\neq 0$.` },
      { name: "Quy tắc tính đạo hàm", tex: R`(uv)'=u'v+uv',\quad \left(\dfrac{u}{v}\right)'=\dfrac{u'v-uv'}{v^2},\quad \bigl(f(u)\bigr)'=f'(u)\,u'`, note: R`$u$, $v$ có đạo hàm tại điểm đang xét. Thương cần $v\neq 0$. Công thức cuối là đạo hàm của hàm hợp.` },
      { name: "Tiếp tuyến", tex: R`y=f'(x_0)(x-x_0)+f(x_0)`, note: R`$f$ có đạo hàm tại $x_0$. Tiếp điểm là $\bigl(x_0;f(x_0)\bigr)$.` },
      { name: "Giới hạn", tex: R`\lim_{x\to 0}\dfrac{\sin x}{x}=1,\quad \lim_{x\to\infty}\left(1+\dfrac{1}{x}\right)^x=e`, note: R`Ở giới hạn đầu, $x$ tính bằng rađian.` },
      { name: "Nguyên hàm", tex: R`\int x^n\,dx=\dfrac{x^{n+1}}{n+1}+C,\quad \int\dfrac{dx}{x}=\ln|x|+C`, note: R`Công thức đầu cần $n\neq -1$. Công thức sau dùng trên khoảng không chứa $0$.` },
      { name: "Tích phân", tex: R`\int_a^b f(x)\,dx=F(b)-F(a),\quad \int u\,dv=uv-\int v\,du`, note: R`$f$ liên tục trên $[a;b]$ và $F$ là một nguyên hàm của $f$.` },
      { name: "Diện tích và thể tích", tex: R`S=\int_a^b|f(x)-g(x)|\,dx,\quad V=\pi\int_a^b f^2(x)\,dx`, note: R`$S$ là diện tích hình phẳng giữa hai đồ thị trên $[a;b]$. $V$ là thể tích khối tròn xoay khi quay hình phẳng dưới đồ thị $y=f(x)$ quanh trục $Ox$.` },
    ],
  },
  {
    title: "Hình học",
    items: [
      { name: "Tam giác", tex: R`S=\dfrac{1}{2}ah=\dfrac{1}{2}ab\sin C,\quad a^2=b^2+c^2-2bc\cos A`, note: R`$h$ là đường cao ứng với cạnh $a$. Góc $C$ nằm giữa hai cạnh $a$, $b$.` },
      { name: "Khối đa diện", tex: R`V_{\text{chóp}}=\dfrac{1}{3}Sh,\quad V_{\text{lăng trụ}}=Sh,\quad V_{\text{tứ diện đều}}=\dfrac{a^3\sqrt{2}}{12}`, note: R`$S$ là diện tích đáy, $h$ là chiều cao; $a$ là cạnh của tứ diện đều.` },
      { name: "Khối tròn xoay", tex: R`V_{\text{trụ}}=\pi r^2 h,\quad V_{\text{nón}}=\dfrac{1}{3}\pi r^2 h,\quad V_{\text{cầu}}=\dfrac{4}{3}\pi r^3` },
      { name: "Vectơ", tex: R`\vec u\cdot\vec v=x_1x_2+y_1y_2+z_1z_2`, note: R`$\vec u=(x_1;y_1;z_1)$, $\vec v=(x_2;y_2;z_2)$ trong hệ trục $Oxyz$.` },
      { name: "Khoảng cách trong Oxyz", tex: R`d\bigl(M,(P)\bigr)=\dfrac{|ax_0+by_0+cz_0+d|}{\sqrt{a^2+b^2+c^2}}`, note: R`Mặt phẳng $(P)$: $ax+by+cz+d=0$ và điểm $M(x_0;y_0;z_0)$.` },
    ],
  },
  {
    title: "Tổ hợp và xác suất",
    items: [
      { name: "Đếm", tex: R`P_n=n!,\quad A_n^k=\dfrac{n!}{(n-k)!},\quad C_n^k=\dfrac{n!}{k!(n-k)!}`, note: R`$n$, $k$ là số tự nhiên với $0\le k\le n$.` },
      { name: "Nhị thức", tex: R`(a+b)^n=\sum_{k=0}^{n} C_n^k a^{n-k}b^k` },
      { name: "Xác suất", tex: R`P(A)=\dfrac{n(A)}{n(\Omega)},\quad P(\bar A)=1-P(A)`, note: R`Công thức đầu chỉ dùng khi các kết quả của phép thử đồng khả năng.` },
      { name: "Xác suất có điều kiện", tex: R`P(A|B)=\dfrac{P(AB)}{P(B)}`, note: R`Cần $P(B)>0$.` },
      { name: "Bayes", tex: R`P(A|B)=\dfrac{P(B|A)\,P(A)}{P(B)}`, note: R`Cần $P(A)>0$ và $P(B)>0$.` },
    ],
  },
];

export function searchFormulas(query: string): FormulaGroup[] {
  const needle = fold(query.trim());
  if (!needle) return formulaGroups;
  return formulaGroups.flatMap((group) => {
    const items = group.items.filter((item) => fold(`${group.title} ${item.name} ${item.tex} ${item.note ?? ""}`).includes(needle));
    return items.length ? [{ title: group.title, items }] : [];
  });
}
