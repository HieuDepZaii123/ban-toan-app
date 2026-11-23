import { intervalCoverage, twoProportionZ, varianceBias, variance } from "../../algo/index.ts";
import { fmt } from "../../lib/format.ts";
import { mulberry32 } from "../../lib/prng.ts";
import type { DiscoverCard } from "./discover.tsx";

const R = String.raw;

const seOptions = [0.25, 0.5, 1];
const standardError: DiscoverCard = {
  id: "stats-se",
  title: ["Đoán trước: gấp bốn cỡ mẫu thì sai số chuẩn thay đổi thế nào?", "Guess first: how does the standard error change when the sample is four times larger?"],
  question: [
    R`Sai số chuẩn của trung bình mẫu là $\frac{\sigma}{\sqrt n}$. Nếu ta lấy mẫu lớn gấp $4$ lần, sai số chuẩn bằng bao nhiêu lần so với trước?`,
    R`The standard error of the sample mean is $\frac{\sigma}{\sqrt n}$. If we take a sample $4$ times larger, how many times the old value is the standard error?`,
  ],
  options: seOptions.map((v) => ({
    label: [`${fmt(v, 2)} lần`, `${fmt(v, 2)} times`] as [string, string],
    hint: [R`Hãy thay $n$ bằng $4n$ vào $\frac{\sigma}{\sqrt n}$ và so sánh. Chú ý căn bậc hai.`, R`Replace $n$ by $4n$ in $\frac{\sigma}{\sqrt n}$ and compare. Mind the square root.`] as [string, string],
  })),
  answer: () => seOptions.indexOf(1 / Math.sqrt(4)),
  numbers: () => [`$\\frac{\\sigma}{\\sqrt{4n}}=\\frac12\\cdot\\frac{\\sigma}{\\sqrt n}$: sai số giảm một nửa chứ không giảm còn một phần tư.`, `$\\frac{\\sigma}{\\sqrt{4n}}=\\frac12\\cdot\\frac{\\sigma}{\\sqrt n}$: the error halves rather than dropping to a quarter.`],
  reveal: [R`Sai số giảm theo căn bậc hai của cỡ mẫu. Muốn giảm sai số $10$ lần phải lấy mẫu lớn gấp $100$ lần, đây là lí do thu thêm dữ liệu có hiệu quả giảm dần.`, R`The error falls with the square root of the sample size. To cut the error ten times you need a sample $100$ times larger, which is why extra data has diminishing returns.`],
};

const abOptions = ["Khác biệt có ý nghĩa thống kê ($p<0{,}05$)", "Chưa đủ bằng chứng ($p>0{,}05$)"];
const abTest: DiscoverCard = {
  id: "stats-ab",
  title: ["Đoán trước: $20\\%$ so với $24\\%$ trên $1000$ lượt, có thật sự khác không?", "Guess first: $20\\%$ versus $24\\%$ over $1000$ views each, is it truly different?"],
  question: [
    R`Phiên bản A có $200$ lượt bấm trên $1000$ lượt xem ($20\%$), phiên bản B có $240$ trên $1000$ ($24\%$). Theo bạn, sự chênh lệch bốn điểm phần trăm này có đủ lớn để loại trừ may rủi ở mức $0{,}05$ không?`,
    R`Version A has $200$ clicks on $1000$ views ($20\%$) and version B has $240$ on $1000$ ($24\%$). Do you think this four-percentage-point gap is large enough to rule out chance at the $0.05$ level?`,
  ],
  options: [
    { label: [abOptions[0] as string, "A significant difference ($p<0.05$)"], hint: [R``, R``] },
    { label: [abOptions[1] as string, "Not enough evidence ($p>0.05$)"], hint: [R`Hãy tính $z=\frac{\hat p_1-\hat p_2}{\sqrt{\hat p(1-\hat p)(1/n_1+1/n_2)}}$ với tỉ lệ gộp $\hat p=0{,}22$ và so với $1{,}96$.`, R`Compute $z=\frac{\hat p_1-\hat p_2}{\sqrt{\hat p(1-\hat p)(1/n_1+1/n_2)}}$ with the pooled rate $\hat p=0.22$ and compare with $1.96$.`] },
  ],
  answer: () => (twoProportionZ(200, 1000, 240, 1000).p < 0.05 ? 0 : 1),
  numbers: () => {
    const t = twoProportionZ(200, 1000, 240, 1000);
    return [`$z=${fmt(t.z, 3)}$ và giá trị $p\\approx${fmt(t.p, 4)}$. Nhưng với cỡ mẫu $500$ mỗi bên, cùng chênh lệch này cho $p\\approx${fmt(twoProportionZ(100, 500, 120, 500).p, 3)}$.`, `$z=${fmt(t.z, 3)}$ and the $p$-value $\\approx${fmt(t.p, 4)}$. But with $500$ per group, the same gap gives $p\\approx${fmt(twoProportionZ(100, 500, 120, 500).p, 3)}$.`];
  },
  reveal: [R`Với $1000$ lượt mỗi bên, chênh lệch này đủ lớn để bác bỏ giả thuyết «hai phiên bản như nhau». Cùng một chênh lệch nhưng mẫu nhỏ hơn thì chưa kết luận được: ý nghĩa thống kê phụ thuộc cỡ mẫu.`, R`With $1000$ views per group this gap is large enough to reject the hypothesis «the two versions are the same». The same gap with a smaller sample is inconclusive: statistical significance depends on sample size.`],
};

const coverOptions = [50, 80, 95];
const coverage: DiscoverCard = {
  id: "stats-cover",
  title: ["Đoán trước: trong 100 khoảng tin cậy 95%, bao nhiêu khoảng phủ giá trị thật?", "Guess first: of 100 95% confidence intervals, how many cover the true value?"],
  question: [
    R`Ta lấy $100$ mẫu độc lập và với mỗi mẫu dựng một khoảng tin cậy $95\%$ cho trung bình. Theo bạn, khoảng bao nhiêu khoảng trong số $100$ sẽ chứa giá trị thật của trung bình?`,
    R`We take $100$ independent samples and from each build a $95\%$ confidence interval for the mean. About how many of the $100$ intervals do you think will contain the true mean?`,
  ],
  options: coverOptions.map((v) => ({
    label: [`Khoảng $${v}$`, `About $${v}$`] as [string, string],
    hint: [R`Mức tin cậy là tỉ lệ khoảng phủ giá trị thật khi lặp lại thật nhiều lần. Nó bằng bao nhiêu?`, R`The confidence level is the share of intervals covering the true value over many repetitions. What is it?`] as [string, string],
  })),
  answer: () => {
    const c = (intervalCoverage(2000, 30, 1.96, mulberry32(11)).covered / 2000) * 100;
    return coverOptions.reduce((best, v, i) => (Math.abs(v - c) < Math.abs((coverOptions[best] as number) - c) ? i : best), 0);
  },
  numbers: () => {
    const c = intervalCoverage(2000, 30, 1.96, mulberry32(11)).covered;
    return [`Mô phỏng $2000$ mẫu cỡ $30$: có $${c}$ khoảng phủ giá trị thật, tức $${fmt((c / 2000) * 100, 1)}\\%$.`, `Simulating $2000$ samples of size $30$: $${c}$ intervals cover the true value, that is $${fmt((c / 2000) * 100, 1)}\\%$.`];
  },
  reveal: [R`Mức $95\%$ nói về quy trình lặp lại, không phải về một khoảng cụ thể. Mỗi khoảng đã dựng xong thì hoặc phủ giá trị thật hoặc không, và ta không biết là trường hợp nào.`, R`The $95\%$ describes the repeated procedure, not one particular interval. Once an interval is built it either covers the true value or it does not, and we do not know which.`],
};

const biasOptions = ["Thấp hơn $\\sigma^2$", "Đúng bằng $\\sigma^2$", "Cao hơn $\\sigma^2$"];
const bias: DiscoverCard = {
  id: "stats-bias",
  title: ["Đoán trước: chia tổng bình phương độ lệch cho $n$ có sai không?", "Guess first: is dividing the sum of squared deviations by $n$ wrong?"],
  question: [
    R`Lấy nhiều mẫu cỡ $5$ từ cùng một tập, mỗi mẫu tính $\frac{1}{n}\sum(x_i-\bar x)^2$ (chia cho $n$). Theo bạn, trung bình của các kết quả này so với phương sai thật $\sigma^2$ thế nào?`,
    R`Take many samples of size $5$ from the same population and for each compute $\frac{1}{n}\sum(x_i-\bar x)^2$ (dividing by $n$). How do you think the average of these results compares with the true variance $\sigma^2$?`,
  ],
  options: biasOptions.map((v, i) => ({
    label: [v, ["Below $\\sigma^2$", "Exactly $\\sigma^2$", "Above $\\sigma^2$"][i] as string] as [string, string],
    hint: [R`Độ lệch được đo từ $\bar x$, là chính trung bình của mẫu, nên các độ lệch có xu hướng nhỏ hơn độ lệch thật từ $\mu$. Điều đó làm kết quả lớn hay nhỏ đi?`, R`Deviations are measured from $\bar x$, the sample's own mean, so they tend to be smaller than the true deviations from $\mu$. Does that make the result larger or smaller?`] as [string, string],
  })),
  answer: () => {
    const b = varianceBias(5, 4000, mulberry32(3));
    return b.divN < 1 / 12 - 0.004 ? 0 : b.divN > 1 / 12 + 0.004 ? 2 : 1;
  },
  numbers: () => {
    const b = varianceBias(5, 4000, mulberry32(3));
    return [`Với số liệu $U(0;1)$, $\\sigma^2=\\frac1{12}\\approx${fmt(1 / 12, 4)}$. Chia cho $n$ cho trung bình $${fmt(b.divN, 4)}$, còn chia cho $n-1$ cho $${fmt(b.divN1, 4)}$. Tỉ lệ giữa hai cách là $\\frac{n-1}{n}=\\frac45$.`, `For $U(0;1)$ data, $\\sigma^2=\\frac1{12}\\approx${fmt(1 / 12, 4)}$. Dividing by $n$ averages $${fmt(b.divN, 4)}$, while dividing by $n-1$ gives $${fmt(b.divN1, 4)}$. The ratio between them is $\\frac{n-1}{n}=\\frac45$.`];
  },
  reveal: [R`Chia cho $n$ cho kết quả thấp hơn $\sigma^2$ trung bình, vì $\bar x$ đã lấy mất một bậc tự do. Chia cho $n-1$ bù lại đúng phần đó và cho ước lượng không chệch.`, R`Dividing by $n$ gives a result below $\sigma^2$ on average, because $\bar x$ has used up one degree of freedom. Dividing by $n-1$ compensates for exactly that and gives an unbiased estimate.`],
};

const dsOptions = ["$\\frac{35}{12}$", "$\\frac{35}{6}$", "$\\frac{35}{3}$"];
const diceVar: DiscoverCard = {
  id: "stats-dicevar",
  title: ["Đoán trước: phương sai tổng của hai xúc xắc", "Guess first: the variance of the sum of two dice"],
  question: [
    R`Một xúc xắc có phương sai $\frac{35}{12}$. Tung hai xúc xắc độc lập rồi cộng hai mặt. Phương sai của tổng là bao nhiêu?`,
    R`One die has variance $\frac{35}{12}$. Roll two independent dice and add the faces. What is the variance of the sum?`,
  ],
  options: dsOptions.map((v) => ({
    label: [v, v] as [string, string],
    hint: [R`Tính thử bằng cách liệt kê $36$ kết quả của tổng hai mặt, hoặc nhớ rằng với biến độc lập phương sai của tổng bằng tổng các phương sai.`, R`Try listing the $36$ outcomes of the sum of two faces, or remember that for independent variables the variance of the sum is the sum of the variances.`] as [string, string],
  })),
  answer: () => {
    const sums: number[] = [];
    for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) sums.push(a + b);
    const v = variance(sums);
    return [35 / 12, 35 / 6, 35 / 3].reduce((best, c, i, all) => (Math.abs(c - v) < Math.abs((all[best] as number) - v) ? i : best), 0);
  },
  numbers: () => {
    const sums: number[] = [];
    for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) sums.push(a + b);
    return [`Liệt kê $36$ kết quả, phương sai của tổng là $${fmt(variance(sums), 4)}=\\frac{35}{6}$. Ngược lại, hai lần cùng một xúc xắc ($2X$, không độc lập) có phương sai $4\\cdot\\frac{35}{12}=\\frac{35}{3}$.`, `Listing the $36$ outcomes, the variance of the sum is $${fmt(variance(sums), 4)}=\\frac{35}{6}$. By contrast, doubling the same die ($2X$, not independent) has variance $4\\cdot\\frac{35}{12}=\\frac{35}{3}$.`];
  },
  reveal: [R`Với hai biến độc lập, phương sai cộng lại: $\operatorname{Var}(X+Y)=\operatorname{Var}X+\operatorname{Var}Y$. Hai biến phụ thuộc thì không: hiệp phương sai $2\operatorname{Cov}(X,Y)$ làm phương sai tổng khác tổng các phương sai.`, R`For two independent variables the variances add: $\operatorname{Var}(X+Y)=\operatorname{Var}X+\operatorname{Var}Y$. Dependent variables do not: the covariance term $2\operatorname{Cov}(X,Y)$ makes the variance of the sum differ from the sum of the variances.`],
};

export const STATS_CARDS = { standardError, abTest, coverage, bias, diceVar };
