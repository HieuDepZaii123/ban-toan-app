import { atLeastOnce, bayes, binomialPmf, birthdayExact } from "../../algo/index.ts";
import type { DiscoverCard } from "./discover.tsx";

const R = String.raw;

const nearest = (values: number[], target: number) => values.reduce((best, v, i) => (Math.abs(v - target) < Math.abs((values[best] as number) - target) ? i : best), 0);

const posOptions = [95, 50, 16];
const positive: DiscoverCard = {
  id: "prob-positive",
  title: ["Đoán trước: xét nghiệm dương tính thì có bệnh không?", "Guess first: a positive test, so is the person ill?"],
  question: [
    R`Bệnh hiếm: chỉ $1\%$ người mắc. Xét nghiệm dương tính ở $95\%$ người bệnh và nhầm dương tính ở $5\%$ người khỏe. Một người xét nghiệm dương tính. Theo bạn xác suất người đó thật sự bệnh khoảng bao nhiêu?`,
    R`The disease is rare: only $1\%$ are ill. The test is positive for $95\%$ of the ill and wrongly positive for $5\%$ of the healthy. A person tests positive. About how likely is it that they are really ill?`,
  ],
  options: posOptions.map((v) => ({
    label: [`khoảng $${v}\\%$`, `about $${v}\\%$`] as [string, string],
    hint: [R`Hãy hình dung $1000$ người: có bao nhiêu người bệnh dương tính, và bao nhiêu người khỏe bị báo nhầm? So hai nhóm đó.`, R`Picture $1000$ people: how many ill people test positive, and how many healthy ones are wrongly flagged? Compare the two groups.`] as [string, string],
  })),
  answer: () => nearest(posOptions, bayes(0.01, 0.95, 0.05).pBgA * 100),
  numbers: () => {
    const b = bayes(0.01, 0.95, 0.05);
    const pct = (b.pBgA * 100).toFixed(1);
    return [`Trong $1000$ người có $9{,}5$ người bệnh dương tính và $49{,}5$ người khỏe bị báo nhầm, nên xác suất là $\\frac{0{,}0095}{${b.pA.toFixed(3).replace(".", "{,}")}}\\approx ${pct.replace(".", "{,}")}\\%$.`, `Among $1000$ people, $9.5$ ill people test positive and $49.5$ healthy ones are wrongly flagged, so the chance is $\\frac{0.0095}{${b.pA.toFixed(3)}}\\approx ${pct}\\%$.`];
  },
  reveal: [R`Bệnh hiếm nên nhóm người khỏe rất đông, và $5\%$ của nhóm đông vẫn nhiều hơn $95\%$ của nhóm nhỏ. Xác suất $P(\text{bệnh}\mid\text{dương})$ khác hẳn $P(\text{dương}\mid\text{bệnh})$: đó là điều công thức Bayes tính.`, R`Since the disease is rare, the healthy group is huge, and $5\%$ of a big group still beats $95\%$ of a small one. $P(\text{ill}\mid\text{positive})$ is very different from $P(\text{positive}\mid\text{ill})$: that is what Bayes' formula computes.`],
};

const bdayOptions = [10, 50, 90];
const birthday: DiscoverCard = {
  id: "prob-birthday",
  title: ["Đoán trước: $23$ người có hai người trùng ngày sinh không?", "Guess first: do two of $23$ people share a birthday?"],
  question: [R`Một lớp có $23$ người, ngày sinh phân bố đều trong $365$ ngày. Xác suất có ít nhất hai người trùng ngày sinh khoảng bao nhiêu?`, R`A class has $23$ people with birthdays spread evenly over $365$ days. About how likely is it that at least two share a birthday?`],
  options: bdayOptions.map((v) => ({
    label: [`khoảng $${v}\\%$`, `about $${v}\\%$`] as [string, string],
    hint: [R`Đừng đếm xem ai trùng với mình: có $\binom{23}{2}=253$ cặp người, mỗi cặp là một cơ hội trùng. Dùng biến cố đối «không ai trùng».`, R`Do not ask who matches you: there are $\binom{23}{2}=253$ pairs, each a chance of a match. Use the complement «nobody matches».`] as [string, string],
  })),
  answer: () => nearest(bdayOptions, birthdayExact(23) * 100),
  numbers: () => [`Xác suất không ai trùng là $\\frac{365}{365}\\cdot\\frac{364}{365}\\cdots\\frac{343}{365}\\approx ${(1 - birthdayExact(23)).toFixed(3).replace(".", "{,}")}$, nên có trùng là $${(birthdayExact(23) * 100).toFixed(1).replace(".", "{,}")}\\%$.`, `The probability that nobody matches is $\\frac{365}{365}\\cdot\\frac{364}{365}\\cdots\\frac{343}{365}\\approx ${(1 - birthdayExact(23)).toFixed(3)}$, so a match has probability $${(birthdayExact(23) * 100).toFixed(1)}\\%$.`],
  reveal: [R`Số cặp tăng nhanh theo bình phương số người, nên cơ hội trùng lớn hơn trực giác nhiều. Tính qua biến cố đối «tất cả khác nhau» nhanh hơn cộng từng cặp.`, R`The number of pairs grows with the square of the number of people, so the chance of a match is far larger than intuition says. Computing through the complement «all different» is quicker than adding pairs.`],
};

const atOptions = [10, 65, 100];
const atLeast: DiscoverCard = {
  id: "prob-atleast",
  title: ["Đoán trước: thử $10$ lần, mỗi lần thành công $10\\%$", "Guess first: $10$ tries, each succeeding $10\\%$ of the time"],
  question: [R`Mỗi lần thử thành công với xác suất $10\%$, các lần độc lập. Thử $10$ lần, xác suất có ít nhất một lần thành công khoảng bao nhiêu?`, R`Each try succeeds with probability $10\%$, tries independent. After $10$ tries, about how likely is at least one success?`],
  options: atOptions.map((v) => ({
    label: [`khoảng $${v}\\%$`, `about $${v}\\%$`] as [string, string],
    hint: [R`Đừng cộng $10\%$ mười lần: các biến cố có thể cùng xảy ra. Hãy tính xác suất cả $10$ lần đều thất bại rồi lấy $1$ trừ đi.`, R`Do not add $10\%$ ten times: the events can happen together. Compute the probability that all $10$ tries fail and subtract from $1$.`] as [string, string],
  })),
  answer: () => nearest(atOptions, atLeastOnce(0.1, 10) * 100),
  numbers: () => [`$1-0{,}9^{10}\\approx ${atLeastOnce(0.1, 10).toFixed(3).replace(".", "{,}")}$, tức khoảng $${(atLeastOnce(0.1, 10) * 100).toFixed(1).replace(".", "{,}")}\\%$.`, `$1-0.9^{10}\\approx ${atLeastOnce(0.1, 10).toFixed(3)}$, about $${(atLeastOnce(0.1, 10) * 100).toFixed(1)}\\%$.`],
  reveal: [R`«Ít nhất một» là biến cố đối của «không lần nào», và các lần độc lập nên nhân: $1-(1-p)^n$. Cộng $p$ lên $n$ lần sai vì đếm lặp những trường hợp thành công nhiều lần.`, R`«At least one» is the complement of «none», and independent tries multiply: $1-(1-p)^n$. Adding $p$ up $n$ times is wrong because it double counts cases with several successes.`],
};

const indOptions: [string, string][] = [["Hai biến cố độc lập", "The events are independent"], ["Không độc lập: biết tổng bằng $7$ làm đổi cơ hội của $A$", "Not independent: knowing the sum is $7$ changes the chance of $A$"], ["Hai biến cố xung khắc", "The events are mutually exclusive"]];
const independence: DiscoverCard = {
  id: "prob-independence",
  title: ["Đoán trước: xúc xắc đầu chẵn và tổng bằng $7$", "Guess first: first die even and the sum equal to $7$"],
  question: [R`Tung hai xúc xắc. $A$: xúc xắc đầu ra số chẵn. $B$: tổng hai mặt bằng $7$. Hai biến cố $A$ và $B$ có quan hệ gì?`, R`Roll two dice. $A$: the first die is even. $B$: the sum is $7$. How are $A$ and $B$ related?`],
  options: indOptions.map((label) => ({
    label,
    hint: [R`So $P(A\cap B)$ với $P(A)\cdot P(B)$. Có kết quả nào vừa thuộc $A$ vừa thuộc $B$ không?`, R`Compare $P(A\cap B)$ with $P(A)\cdot P(B)$. Is there an outcome in both $A$ and $B$?`] as [string, string],
  })),
  answer: () => {
    let a = 0, b = 0, ab = 0;
    for (let x = 1; x <= 6; x++) for (let y = 1; y <= 6; y++) {
      const inA = x % 2 === 0, inB = x + y === 7;
      if (inA) a++;
      if (inB) b++;
      if (inA && inB) ab++;
    }
    if (ab === 0) return 2;
    return Math.abs(ab / 36 - (a / 36) * (b / 36)) < 1e-12 ? 0 : 1;
  },
  numbers: () => [`$P(A)=\\frac{1}{2}$, $P(B)=\\frac{6}{36}=\\frac{1}{6}$, $P(A\\cap B)=\\frac{3}{36}=\\frac{1}{12}=\\frac{1}{2}\\cdot\\frac{1}{6}$: độc lập.`, `$P(A)=\\frac{1}{2}$, $P(B)=\\frac{6}{36}=\\frac{1}{6}$, $P(A\\cap B)=\\frac{3}{36}=\\frac{1}{12}=\\frac{1}{2}\\cdot\\frac{1}{6}$: independent.`],
  reveal: [R`Dù tổng bằng $7$, với mỗi số ở xúc xắc đầu vẫn có đúng một số ở xúc xắc sau để tổng là $7$, nên biết $B$ không làm đổi cơ hội của $A$. Độc lập là $P(A\cap B)=P(A)P(B)$, không phải «không liên quan bằng mắt thường»; và nó khác xung khắc.`, R`Even with the sum equal to $7$, each value of the first die has exactly one partner value making $7$, so knowing $B$ does not change the chance of $A$. Independence means $P(A\cap B)=P(A)P(B)$, not «looks unrelated»; and it differs from mutual exclusion.`],
};

const kOptions = [0.25, 0.375, 0.5];
const exactly: DiscoverCard = {
  id: "prob-exactly",
  title: ["Đoán trước: tung đồng xu $4$ lần, đúng $2$ lần ngửa", "Guess first: toss a coin $4$ times, exactly $2$ heads"],
  question: [R`Tung đồng xu cân đối $4$ lần. Xác suất có đúng $2$ lần ngửa là bao nhiêu?`, R`Toss a fair coin $4$ times. What is the probability of exactly $2$ heads?`],
  options: kOptions.map((v) => ({
    label: [`$${String(v).replace(".", "{,}")}$`, `$${v}$`] as [string, string],
    hint: [R`Mỗi dãy cụ thể như NNSS có xác suất $\left(\frac12\right)^4$. Có bao nhiêu dãy có đúng hai lần ngửa?`, R`Each specific sequence like HHTT has probability $\left(\frac12\right)^4$. How many sequences have exactly two heads?`] as [string, string],
  })),
  answer: () => nearest(kOptions, binomialPmf(4, 0.5)[2] as number),
  numbers: () => [`Có $C_4^2=6$ dãy, mỗi dãy xác suất $\\frac{1}{16}$, nên $P=\\frac{6}{16}=${(binomialPmf(4, 0.5)[2] as number).toString().replace(".", "{,}")}$.`, `There are $C_4^2=6$ sequences, each with probability $\\frac{1}{16}$, so $P=\\frac{6}{16}=${binomialPmf(4, 0.5)[2]}$.`],
  reveal: [R`Phép thử lặp: xác suất một dãy cụ thể là $p^k(1-p)^{n-k}$, số dãy là $C_n^k$ (chọn vị trí các lần ngửa), và các dãy xung khắc nên cộng. Đáp án không phải $\frac12$ dù «ngửa» và «sấp» bằng nhau.`, R`Repeated trials: a specific sequence has probability $p^k(1-p)^{n-k}$, there are $C_n^k$ sequences (choose the positions of the heads), and they are exclusive so we add. The answer is not $\frac12$ even though heads and tails are equally likely.`],
};

export const PROB_CARDS = { positive, birthday, atLeast, independence, exactly };
