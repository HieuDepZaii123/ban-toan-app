import { degreeSum, eulerPath, logisticSolution, modPow, rsaToy } from "../../algo/index.ts";
import { fmt } from "../../lib/format.ts";
import type { DiscoverCard } from "./discover.tsx";

const R = String.raw;

const dblOptions = [0.5, 0.69, 1];
const doubling: DiscoverCard = {
  id: "disc-doubling",
  title: ["Đoán trước: khi $y'=y$, sau bao lâu thì gấp đôi?", "Guess first: when $y'=y$, how long until it doubles?"],
  question: [
    R`Đại lượng $y$ có tốc độ tăng đúng bằng chính nó, $y'=y$, và $y(0)=1$. Theo bạn, sau bao nhiêu đơn vị thời gian thì $y$ đạt $2$?`,
    R`A quantity $y$ grows at a rate equal to itself, $y'=y$, with $y(0)=1$. After how many time units do you think $y$ reaches $2$?`,
  ],
  options: dblOptions.map((v) => ({
    label: [`Khoảng $${fmt(v, 2)}$`, `About $${fmt(v, 2)}$`] as [string, string],
    hint: [R`Nếu tốc độ luôn bằng $1$ thì mất đúng $1$ đơn vị. Nhưng tốc độ tăng cùng $y$, nên nhanh hơn. Thử đi từng bước nhỏ bằng phương pháp Euler.`, R`If the rate stayed $1$ it would take exactly $1$ unit. But the rate grows with $y$, so it is faster. Try small steps with Euler's method.`] as [string, string],
  })),
  answer: () => {
    const p = eulerPath((_x, y) => y, 0, 1, 0.001, 2000);
    const t = p.find((q) => q.y >= 2)!.x;
    return dblOptions.reduce((best, v, i) => (Math.abs(v - t) < Math.abs((dblOptions[best] as number) - t) ? i : best), 0);
  },
  numbers: () => {
    const p = eulerPath((_x, y) => y, 0, 1, 0.001, 2000);
    return [`Đi từng bước $0{,}001$ thì $y$ đạt $2$ lúc $t\\approx${fmt(p.find((q) => q.y >= 2)!.x, 3)}$, đúng bằng $\\ln2\\approx0{,}693$ vì nghiệm là $y=e^{t}$.`, `With steps of $0.001$, $y$ reaches $2$ at $t\\approx${fmt(p.find((q) => q.y >= 2)!.x, 3)}$, which is $\\ln2\\approx0.693$ since the solution is $y=e^{t}$.`];
  },
  reveal: [R`Với $y'=ky$, thời gian nhân đôi là $\frac{\ln2}{k}$, không phụ thuộc giá trị bắt đầu: bất kể $y$ đang là bao nhiêu, cứ sau $\frac{\ln2}{k}$ thì nó nhân đôi.`, R`For $y'=ky$ the doubling time is $\frac{\ln2}{k}$, independent of the starting value: whatever $y$ is now, it doubles every $\frac{\ln2}{k}$.`],
};

const limOptions = [0, 50, 100];
const logistic: DiscoverCard = {
  id: "disc-logistic",
  title: ["Đoán trước: quần thể logistic dần tiến về đâu?", "Guess first: where does a logistic population head?"],
  question: [
    R`Quần thể có $y'=0{,}5\,y\left(1-\frac{y}{100}\right)$, bắt đầu từ $y_0=10$. Theo bạn, sau thật lâu $y$ gần giá trị nào?`,
    R`A population obeys $y'=0.5\,y\left(1-\frac{y}{100}\right)$, starting from $y_0=10$. After a very long time, which value do you think $y$ is near?`,
  ],
  options: limOptions.map((v) => ({
    label: [`$${v}$`, `$${v}$`] as [string, string],
    hint: [R`Khi nào tốc độ $y'$ bằng $0$? Giải $0{,}5\,y\left(1-\frac{y}{100}\right)=0$ rồi xem nghiệm nào mà $y$ đi tới chứ không rời khỏi.`, R`When does the rate $y'$ equal $0$? Solve $0.5\,y\left(1-\frac{y}{100}\right)=0$ and see which solution $y$ moves toward rather than away from.`] as [string, string],
  })),
  answer: () => {
    const y = logisticSolution(0.5, 100, 10, 200);
    return limOptions.reduce((best, v, i) => (Math.abs(v - y) < Math.abs((limOptions[best] as number) - y) ? i : best), 0);
  },
  numbers: () => [`$y(10)=${fmt(logisticSolution(0.5, 100, 10, 10), 2)}$ và $y(30)=${fmt(logisticSolution(0.5, 100, 10, 30), 4)}$: nghiệm tiến sát $100$.`, `$y(10)=${fmt(logisticSolution(0.5, 100, 10, 10), 2)}$ and $y(30)=${fmt(logisticSolution(0.5, 100, 10, 30), 4)}$: the solution closes in on $100$.`],
  reveal: [R`Hai trạng thái cân bằng là $0$ và $K=100$. Quanh $K$, đạo hàm $f'(K)=-r<0$ nên $K$ ổn định: nghiệm bị kéo về. Quanh $0$, $f'(0)=r>0$ nên $0$ không ổn định: nghiệm đi ra xa.`, R`The two equilibria are $0$ and $K=100$. Around $K$, $f'(K)=-r<0$ so $K$ is stable: solutions are drawn in. Around $0$, $f'(0)=r>0$ so $0$ is unstable: solutions move away.`],
};

const fermatOptions = [1, 3, 4];
const fermat: DiscoverCard = {
  id: "disc-fermat",
  title: ["Đoán trước: số dư của $3^{100}$ khi chia cho $7$", "Guess first: the remainder of $3^{100}$ divided by $7$"],
  question: [
    R`Số $3^{100}$ có hơn bốn mươi chữ số, không ai tính tay. Nhưng có một mẹo: $3^6=729=7\cdot104+1$ có dư $1$. Theo bạn, $3^{100}$ chia cho $7$ dư bao nhiêu?`,
    R`The number $3^{100}$ has over forty digits, nobody computes it by hand. But there is a trick: $3^6=729=7\cdot104+1$ leaves remainder $1$. What remainder do you think $3^{100}$ leaves when divided by $7$?`,
  ],
  options: fermatOptions.map((v) => ({
    label: [`Dư $${v}$`, `Remainder $${v}$`] as [string, string],
    hint: [R`Viết $100=6\cdot16+4$. Khi đó $3^{100}=\left(3^6\right)^{16}\cdot3^4$, và $3^6\equiv1\pmod7$. Còn lại phải tính gì?`, R`Write $100=6\cdot16+4$. Then $3^{100}=\left(3^6\right)^{16}\cdot3^4$, and $3^6\equiv1\pmod7$. What is left to compute?`] as [string, string],
  })),
  answer: () => fermatOptions.indexOf(modPow(3, 100, 7)),
  numbers: () => [`$3^{100}=3^{96}\\cdot3^4\\equiv1\\cdot81=7\\cdot11+4$, nên dư $${modPow(3, 100, 7)}$. Máy tính bằng bình phương liên tiếp cũng cho $${modPow(3, 100, 7)}$.`, `$3^{100}=3^{96}\\cdot3^4\\equiv1\\cdot81=7\\cdot11+4$, so the remainder is $${modPow(3, 100, 7)}$. Computing by repeated squaring also gives $${modPow(3, 100, 7)}$.`],
  reveal: [R`Theo định lí Fermat nhỏ, $a^{p-1}\equiv1\pmod p$ khi $p$ nguyên tố và $p\nmid a$. Vậy số mũ chỉ cần xét theo dư khi chia cho $p-1$, và các lũy thừa khổng lồ co lại thành phép tính nhỏ.`, R`By Fermat's little theorem, $a^{p-1}\equiv1\pmod p$ when $p$ is prime and $p\nmid a$. So the exponent only matters modulo $p-1$, and huge powers shrink to a small computation.`],
};

const handshake: DiscoverCard = {
  id: "disc-handshake",
  title: ["Đoán trước: $5$ bạn, mỗi bạn bắt tay đúng $3$ bạn khác, có xảy ra không?", "Guess first: $5$ friends, each shaking hands with exactly $3$ others, is it possible?"],
  question: [
    R`Một lớp có $5$ bạn. Mỗi bạn bắt tay với đúng $3$ bạn khác, và mỗi cái bắt tay là giữa hai bạn. Theo bạn, tình huống này có thể xảy ra không?`,
    R`A class has $5$ friends. Each shakes hands with exactly $3$ others, and each handshake is between two friends. Do you think this can happen?`,
  ],
  options: [
    { label: ["Có thể xảy ra", "It can happen"], hint: [R`Mỗi cái bắt tay được đếm hai lần, một lần ở mỗi người. Tổng số lần «được bắt tay» của cả lớp là bao nhiêu, và nó phải chia hết cho mấy?`, R`Each handshake is counted twice, once for each person. What is the total of «times shaken» over the whole class, and what must it be divisible by?`] },
    { label: ["Không thể xảy ra", "It cannot happen"], hint: [R``, R``] },
  ],
  answer: () => {
    const total = 5 * 3;
    return total % 2 === 0 ? 0 : 1;
  },
  numbers: () => {
    const g = degreeSum([[1, 2], [2, 3], [3, 4], [4, 5], [5, 1]]);
    return [`Tổng bậc phải là $5\\cdot3=15$, là số lẻ, nhưng bổ đề bắt tay đòi tổng bậc bằng $2|E|$ là số chẵn. Ví dụ vòng $5$ đỉnh có tổng bậc $${g.sum}=2\\cdot5$ vì mỗi đỉnh chỉ bậc $2$.`, `The sum of degrees would be $5\\cdot3=15$, which is odd, but the handshake lemma demands $2|E|$, an even number. For example a $5$-cycle has degree sum $${g.sum}=2\\cdot5$ since each vertex has only degree $2$.`];
  },
  reveal: [R`Tổng bậc của mọi đỉnh luôn bằng hai lần số cạnh nên luôn chẵn. Do đó số đỉnh có bậc lẻ phải là số chẵn, và $5$ đỉnh cùng bậc $3$ là điều không thể.`, R`The sum of all degrees always equals twice the number of edges, so it is always even. Therefore the number of odd-degree vertices must be even, and $5$ vertices all of degree $3$ is impossible.`],
};

const rsaOptions = [7, 13, 27];
const rsa: DiscoverCard = {
  id: "disc-rsa",
  title: ["Đoán trước: giải mã RSA nhỏ", "Guess first: decrypting a tiny RSA message"],
  question: [
    R`Khóa công khai $(n,e)=(55,3)$, khóa riêng $d=27$. Bản mã nhận được là $c=13$. Tin nhắn gốc $m=c^{27}\bmod55$ là số nào trong ba số dưới đây?`,
    R`Public key $(n,e)=(55,3)$, private key $d=27$. The received ciphertext is $c=13$. Which of the three numbers below is the original message $m=c^{27}\bmod55$?`,
  ],
  options: rsaOptions.map((v) => ({
    label: [`$${v}$`, `$${v}$`] as [string, string],
    hint: [R`Giải mã là phép ngược của mã hóa $c=m^3\bmod55$. Thử mã hóa từng ứng viên: $m^3\bmod55$ có bằng $13$ không?`, R`Decryption undoes the encryption $c=m^3\bmod55$. Try encrypting each candidate: does $m^3\bmod55$ equal $13$?`] as [string, string],
  })),
  answer: () => rsaOptions.indexOf(rsaToy(5, 11, 3, 7)!.plain === modPow(13, 27, 55) ? modPow(13, 27, 55) : -1),
  numbers: () => [`$7^3=343=6\\cdot55+13$ nên $7$ mã hóa thành $13$, và $13^{27}\\bmod55=${modPow(13, 27, 55)}$. Khóa riêng $d=27$ là nghịch đảo của $3$ theo modulo $\\varphi=40$, vì $3\\cdot27=81=2\\cdot40+1$.`, `$7^3=343=6\\cdot55+13$ so $7$ encrypts to $13$, and $13^{27}\\bmod55=${modPow(13, 27, 55)}$. The private key $d=27$ is the inverse of $3$ modulo $\\varphi=40$, since $3\\cdot27=81=2\\cdot40+1$.`],
  reveal: [R`Vì $ed\equiv1\pmod{\varphi}$ và theo định lí Fermat nhỏ, $\left(m^e\right)^d\equiv m\pmod n$: mã hóa rồi giải mã trả về đúng tin nhắn. Người nghe lén biết $n$, $e$, $c$ nhưng muốn có $d$ phải phân tích $n=pq$.`, R`Since $ed\equiv1\pmod{\varphi}$ and by Fermat's little theorem, $\left(m^e\right)^d\equiv m\pmod n$: encrypting then decrypting returns the message. An eavesdropper knows $n$, $e$, $c$, but to get $d$ must factor $n=pq$.`],
};

export const DISCRETE_CARDS = { doubling, logistic, fermat, handshake, rsa };
