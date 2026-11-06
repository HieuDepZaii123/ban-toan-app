import type { SolidKind, SolidParams } from "./solids.ts";

export type GeoItem = {
  id: string;
  kind: SolidKind;
  params: SolidParams;
  prompt: string;
  choices?: readonly [string, string, string, string];
  answerIndex?: 0 | 1 | 2 | 3;
  numeric?: number;
  tol?: number;
  steps: string[];
};

export const GEO_QUIZ: GeoItem[] = [
  {
    id: "chop-v",
    kind: "chop",
    params: { a: 2, b: 3, h: 1 },
    prompt: "Chóp tứ giác đều cạnh đáy $2$, cao $3$. Thể tích bằng",
    numeric: 4,
    steps: ["Đáy vuông: $S=2\\cdot 2=4$.", "$V=\\dfrac13\\cdot 4\\cdot 3$.", "$V=4$."],
  },
  {
    id: "lang-v",
    kind: "lang",
    params: { a: 3, b: 4, h: 5 },
    prompt: "Lăng trụ đứng, đáy tam giác vuông cạnh $3$ và $4$, cao $5$. Thể tích bằng",
    numeric: 30,
    steps: ["Diện tích đáy $S=\\dfrac12\\cdot 3\\cdot 4=6$.", "$V=6\\cdot 5$.", "$V=30$."],
  },
  {
    id: "tu-v",
    kind: "tu",
    params: { a: 3, b: 2, h: 2 },
    prompt: "Tứ diện đều cạnh $3$. Thể tích làm tròn $2$ chữ số là",
    numeric: (27 * Math.SQRT2) / 12,
    tol: 0.01,
    steps: ["$V=\\dfrac{a^3\\sqrt{2}}{12}$.", "$a=3\\Rightarrow V=\\dfrac{9\\sqrt{2}}{4}$.", "$V\\approx 3{,}18$."],
  },
  {
    id: "tru-12",
    kind: "tru",
    params: { a: 2, b: 3, h: 1 },
    prompt: "Hình trụ đường kính đáy $4$, cao $3$. Thể tích bằng",
    choices: ["$6\\pi$", "$12\\pi$", "$24\\pi$", "$48\\pi$"],
    answerIndex: 1,
    steps: ["$r=2$.", "$V=\\pi\\cdot 4\\cdot 3$.", "$V=12\\pi$."],
  },
  {
    id: "non-xq",
    kind: "non",
    params: { a: 3, b: 4, h: 1 },
    prompt: "Nón đường kính đáy $6$, cao $4$. Diện tích xung quanh bằng",
    choices: ["$12\\pi$", "$15\\pi$", "$24\\pi$", "$30\\pi$"],
    answerIndex: 1,
    steps: ["$r=3$, đường sinh $l=\\sqrt{3^2+4^2}=5$.", "Diện tích xung quanh $\\pi\\cdot 3\\cdot 5$.", "Bằng $15\\pi$."],
  },
  {
    id: "cau-v",
    kind: "cau",
    params: { a: 3, b: 1, h: 1 },
    prompt: "Khối cầu đường kính $6$. Thể tích làm tròn $2$ chữ số là",
    numeric: 36 * Math.PI,
    tol: 0.05,
    steps: ["$r=3$.", "$V=\\dfrac43\\pi r^3=36\\pi$.", "$V\\approx 113{,}10$."],
  },
  {
    id: "hop-d",
    kind: "hop",
    params: { a: 2, b: 3, h: 4 },
    prompt: "Hộp $2\\times 3\\times 4$. Đường chéo làm tròn $2$ chữ số là",
    numeric: Math.sqrt(29),
    tol: 0.01,
    steps: ["$d=\\sqrt{a^2+b^2+c^2}$.", "$d=\\sqrt{4+9+16}=\\sqrt{29}$.", "$d\\approx 5{,}39$."],
  },
  {
    id: "lap-s",
    kind: "lap",
    params: { a: 3, b: 3, h: 3 },
    prompt: "Lập phương cạnh $3$. Diện tích toàn phần bằng",
    numeric: 54,
    steps: ["Sáu mặt vuông cạnh $3$.", "Mỗi mặt $9$.", "$S=6\\cdot 9=54$."],
  },
  {
    id: "non-v",
    kind: "non",
    params: { a: 3, b: 4, h: 1 },
    prompt: "Nón đường kính đáy $6$, cao $4$. Thể tích làm tròn $2$ chữ số là",
    numeric: 12 * Math.PI,
    tol: 0.05,
    steps: ["$r=3$.", "$V=\\dfrac13\\pi\\cdot 9\\cdot 4$.", "$V=12\\pi\\approx 37{,}70$."],
  },
  {
    id: "chop-xq",
    kind: "chop",
    params: { a: 2, b: 3, h: 1 },
    prompt: "Chóp tứ giác đều cạnh đáy $2$, cao $3$. Diện tích xung quanh làm tròn $2$ chữ số là",
    numeric: 4 * Math.sqrt(10),
    tol: 0.01,
    steps: ["Trung đoạn $\\sqrt{3^2+1^2}=\\sqrt{10}$.", "Mỗi mặt bên $\\sqrt{10}$.", "Xung quanh $4\\sqrt{10}\\approx 12{,}65$."],
  },
  {
    id: "lang-tp",
    kind: "lang",
    params: { a: 3, b: 4, h: 5 },
    prompt: "Lăng trụ đứng đáy tam giác vuông $3$, $4$, cao $5$. Diện tích toàn phần bằng",
    numeric: 72,
    steps: ["Cạnh huyền đáy $5$.", "Xung quanh $(3+4+5)\\cdot 5=60$.", "$S=60+2\\cdot 6=72$."],
  },
  {
    id: "tru-20",
    kind: "tru",
    params: { a: 2, b: 5, h: 1 },
    prompt: "Trụ đường kính đáy $4$, cao $5$. Thể tích bằng",
    choices: ["$10\\pi$", "$20\\pi$", "$40\\pi$", "$80\\pi$"],
    answerIndex: 1,
    steps: ["$r=2$.", "$V=\\pi\\cdot 4\\cdot 5$.", "$V=20\\pi$."],
  },
  {
    id: "hop-3",
    kind: "hop",
    params: { a: 1, b: 2, h: 2 },
    prompt: "Hộp $1\\times 2\\times 2$. Đường chéo không gian bằng",
    numeric: 3,
    steps: ["$d=\\sqrt{1+4+4}$.", "$d=\\sqrt{9}$.", "$d=3$."],
  },
  {
    id: "tu-2",
    kind: "tu",
    params: { a: 2, b: 2, h: 2 },
    prompt: "Tứ diện đều cạnh $2$. Thể tích làm tròn $2$ chữ số là",
    numeric: (8 * Math.SQRT2) / 12,
    tol: 0.01,
    steps: ["$V=\\dfrac{a^3\\sqrt{2}}{12}$.", "$a=2\\Rightarrow V=\\dfrac{2\\sqrt{2}}{3}$.", "$V\\approx 0{,}94$."],
  },
  {
    id: "cau-s",
    kind: "cau",
    params: { a: 2, b: 1, h: 1 },
    prompt: "Mặt cầu bán kính $2$. Diện tích bằng",
    choices: ["$4\\pi$", "$8\\pi$", "$16\\pi$", "$32\\pi$"],
    answerIndex: 2,
    steps: ["$S=4\\pi r^2$.", "$r=2\\Rightarrow S=4\\pi\\cdot 4$.", "$S=16\\pi$."],
  },
];

export function gradeGeo(item: GeoItem, input: { choice?: number; value?: number }): boolean {
  if (item.choices && item.answerIndex !== undefined) return input.choice === item.answerIndex;
  if (item.numeric === undefined || input.value === undefined || !Number.isFinite(input.value)) return false;
  return Math.abs(input.value - item.numeric) <= (item.tol ?? 0.001);
}
