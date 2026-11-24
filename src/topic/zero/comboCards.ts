import { arrange, choose, factorial, pascalRows, permutations } from "../../algo/index.ts";
import type { DiscoverCard } from "./discover.tsx";

const R = String.raw;

const lineOptions = [24, 120, 25];
const line5: DiscoverCard = {
  id: "combo-line",
  title: ["Đoán trước: xếp $5$ người thành một hàng", "Guess first: lining up $5$ people"],
  question: [R`Có $5$ người khác nhau xếp thành một hàng ngang. Theo bạn có bao nhiêu cách xếp?`, R`Five different people line up in a row. How many arrangements do you think there are?`],
  options: lineOptions.map((v) => ({
    label: [`${v} cách`, `${v} ways`] as [string, string],
    hint: [R`Chỗ đầu có mấy người để chọn? Chọn xong thì chỗ thứ hai còn mấy người? Nhân các số đó lại.`, R`How many people can take the first place? Once chosen, how many remain for the second? Multiply these numbers.`] as [string, string],
  })),
  answer: () => lineOptions.indexOf(permutations([1, 2, 3, 4, 5]).length),
  numbers: () => [`Liệt kê thật bằng máy được $${permutations([1, 2, 3, 4, 5]).length}$ hoán vị, đúng bằng $5\\cdot4\\cdot3\\cdot2\\cdot1=5!$.`, `Listing them by machine gives $${permutations([1, 2, 3, 4, 5]).length}$ permutations, exactly $5\\cdot4\\cdot3\\cdot2\\cdot1=5!$.`],
  reveal: [R`Mỗi chỗ có ít lựa chọn hơn chỗ trước một người, và các bước nối tiếp nhau nên nhân lại: $n!$. Cũng có thể thấy bằng quy nạp: thêm người thứ $n+1$ có $n+1$ chỗ để xen vào.`, R`Each place has one fewer choice than the previous, and the steps follow each other so we multiply: $n!$. Induction shows it too: the $(n+1)$th person has $n+1$ places to slot into.`],
};

const pickOptions = [30, 120, 720];
const pick3: DiscoverCard = {
  id: "combo-pick",
  title: ["Đoán trước: chọn $3$ người từ $10$ người, không kể thứ tự", "Guess first: choosing $3$ people out of $10$, order not counted"],
  question: [R`Chọn một nhóm $3$ người từ $10$ người, các thành viên ngang nhau (không phân chức vụ). Có bao nhiêu nhóm?`, R`Choose a group of $3$ people from $10$, all members equal (no roles). How many groups are there?`],
  options: pickOptions.map((v) => ({
    label: [`${v} nhóm`, `${v} groups`] as [string, string],
    hint: [R`Nếu có phân chức vụ thì xếp thứ tự và được $10\cdot9\cdot8$. Ở đây mỗi nhóm bị đếm lặp bao nhiêu lần trong con số đó?`, R`If roles were assigned we would count ordered choices: $10\cdot9\cdot8$. Here, how many times is each group counted in that number?`] as [string, string],
  })),
  answer: () => pickOptions.indexOf(choose(10, 3)),
  numbers: () => [`Có thứ tự: $A_{10}^3=${arrange(10, 3)}$. Mỗi nhóm bị đếm $3!=${factorial(3)}$ lần, nên $C_{10}^3=\\frac{${arrange(10, 3)}}{${factorial(3)}}=${choose(10, 3)}$.`, `Ordered: $A_{10}^3=${arrange(10, 3)}$. Each group is counted $3!=${factorial(3)}$ times, so $C_{10}^3=\\frac{${arrange(10, 3)}}{${factorial(3)}}=${choose(10, 3)}$.`],
  reveal: [R`Chỉnh hợp $A_n^k$ đếm có thứ tự, tổ hợp $C_n^k=\frac{A_n^k}{k!}$ không kể thứ tự. Câu hỏi để chọn: đổi chỗ các phần tử đã chọn có cho kết quả khác không?`, R`The arrangement $A_n^k$ counts with order, the combination $C_n^k=\frac{A_n^k}{k!}$ without order. The question to ask: does swapping the chosen items give a different result?`],
};

const symOptions: [string, string][] = [["$C_{10}^3$ bằng $C_{10}^7$", "$C_{10}^3$ equals $C_{10}^7$"], ["$C_{10}^3$ nhỏ hơn $C_{10}^7$", "$C_{10}^3$ is smaller than $C_{10}^7$"], ["$C_{10}^3$ lớn hơn $C_{10}^7$", "$C_{10}^3$ is larger than $C_{10}^7$"]];
const symmetry: DiscoverCard = {
  id: "combo-symmetry",
  title: ["Đoán trước: chọn $3$ từ $10$ và chọn $7$ từ $10$", "Guess first: choosing $3$ from $10$ and choosing $7$ from $10$"],
  question: [R`Chọn $3$ người từ $10$ người và chọn $7$ người từ $10$ người. Hai số cách này so với nhau thế nào?`, R`Choosing $3$ people from $10$ and choosing $7$ people from $10$. How do the two numbers of ways compare?`],
  options: symOptions.map((l) => ({
    label: l,
    hint: [R`Khi chọn $3$ người vào nhóm thì $7$ người còn lại ở ngoài. Mỗi cách chọn nhóm $3$ ứng với bao nhiêu cách chọn $7$ người đứng ngoài?`, R`When $3$ people are chosen for the group, the other $7$ stay outside. How many ways of choosing $7$ people does each choice of the $3$ correspond to?`] as [string, string],
  })),
  answer: () => (choose(10, 3) === choose(10, 7) ? 0 : choose(10, 3) < choose(10, 7) ? 1 : 2),
  numbers: () => [`$C_{10}^3=${choose(10, 3)}$ và $C_{10}^7=${choose(10, 7)}$: bằng nhau, vì $C_n^k=C_n^{n-k}$.`, `$C_{10}^3=${choose(10, 3)}$ and $C_{10}^7=${choose(10, 7)}$: equal, since $C_n^k=C_n^{n-k}$.`],
  reveal: [R`Chọn người vào nhóm cũng là chọn người ở ngoài nhóm, mỗi cách ứng đúng một cách. Vì thế các hàng của tam giác Pascal đối xứng.`, R`Choosing the people in the group is also choosing the people outside, each choice matching exactly one. That is why the rows of Pascal's triangle are symmetric.`],
};

const sumOptions = [36, 64, 128];
const rowSum: DiscoverCard = {
  id: "combo-rowsum",
  title: ["Đoán trước: tổng các số ở hàng thứ $6$ của tam giác Pascal", "Guess first: the sum of the numbers in row $6$ of Pascal's triangle"],
  question: [R`Hàng thứ $6$ của tam giác Pascal là $1,6,15,20,15,6,1$. Tổng các số trong hàng đó bằng bao nhiêu?`, R`Row $6$ of Pascal's triangle is $1,6,15,20,15,6,1$. What is the sum of the numbers in that row?`],
  options: sumOptions.map((v) => ({
    label: [`$${v}$`, `$${v}$`] as [string, string],
    hint: [R`Hãy cộng thử các hàng nhỏ: hàng $2$ có tổng $4$, hàng $3$ có tổng $8$. Quy luật là gì?`, R`Try adding small rows: row $2$ sums to $4$, row $3$ to $8$. What is the pattern?`] as [string, string],
  })),
  answer: () => sumOptions.indexOf((pascalRows(6)[6] as number[]).reduce((a, b) => a + b, 0)),
  numbers: () => [`$1+6+15+20+15+6+1=${(pascalRows(6)[6] as number[]).reduce((a, b) => a + b, 0)}=2^6$.`, `$1+6+15+20+15+6+1=${(pascalRows(6)[6] as number[]).reduce((a, b) => a + b, 0)}=2^6$.`],
  reveal: [R`Tổng hàng $n$ là $2^n$: mỗi trong $n$ người có hai khả năng, vào nhóm hoặc không, nên tổng số nhóm (mọi cỡ) là $2^n$. Cũng là $(1+1)^n$ trong khai triển nhị thức.`, R`The sum of row $n$ is $2^n$: each of the $n$ people has two possibilities, in the group or not, so the total number of groups (of every size) is $2^n$. It is also $(1+1)^n$ in the binomial expansion.`],
};

const coefOptions = [5, 10, 20];
const coefficient: DiscoverCard = {
  id: "combo-coefficient",
  title: ["Đoán trước: hệ số của $x^2$ trong $(1+x)^5$", "Guess first: the coefficient of $x^2$ in $(1+x)^5$"],
  question: [R`Khai triển $(1+x)^5=(1+x)(1+x)(1+x)(1+x)(1+x)$. Hệ số của $x^2$ là bao nhiêu?`, R`Expand $(1+x)^5=(1+x)(1+x)(1+x)(1+x)(1+x)$. What is the coefficient of $x^2$?`],
  options: coefOptions.map((v) => ({
    label: [`$${v}$`, `$${v}$`] as [string, string],
    hint: [R`Để ra $x^2$, trong $5$ ngoặc phải chọn $x$ ở đúng $2$ ngoặc và số $1$ ở $3$ ngoặc còn lại. Có bao nhiêu cách chọn $2$ ngoặc?`, R`To get $x^2$, among the $5$ brackets we choose $x$ from exactly $2$ and $1$ from the other $3$. In how many ways can we choose $2$ brackets?`] as [string, string],
  })),
  answer: () => coefOptions.indexOf(choose(5, 2)),
  numbers: () => [`Có $C_5^2=${choose(5, 2)}$ cách chọn $2$ ngoặc lấy $x$, nên hệ số là $${choose(5, 2)}$. Cả hàng thứ $5$ của Pascal: ${(pascalRows(5)[5] as number[]).join(", ")}.`, `There are $C_5^2=${choose(5, 2)}$ ways to choose $2$ brackets for $x$, so the coefficient is $${choose(5, 2)}$. The whole row $5$ of Pascal: ${(pascalRows(5)[5] as number[]).join(", ")}.`],
  reveal: [R`Hệ số của $a^{n-k}b^k$ trong $(a+b)^n$ là số cách chọn $k$ ngoặc lấy $b$, tức $C_n^k$. Khai triển nhị thức là đếm viết ra thành đa thức.`, R`The coefficient of $a^{n-k}b^k$ in $(a+b)^n$ is the number of ways to choose $k$ brackets giving $b$, that is $C_n^k$. The binomial expansion is counting written as a polynomial.`],
};

export const COMBO_CARDS = { line5, pick3, symmetry, rowSum, coefficient };
