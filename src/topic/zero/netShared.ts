import type { NetTarget } from "./widgets.tsx";

export const PARABOLA: NetTarget = { name: "parabol", fn: (x) => 0.5 * x * x - 1, x0: -3, x1: 3, y0: -2, y1: 5 };
export const EXP: NetTarget = { name: "2^x", fn: (x) => 2 ** x, x0: -2, x1: 3, y0: -0.5, y1: 9 };
export const SINE: NetTarget = { name: "sin x", fn: Math.sin, x0: -3.2, x1: 3.2, y0: -1.5, y1: 1.5 };
export const CUBIC: NetTarget = { name: "bậc ba", fn: (x) => 0.25 * x ** 3 - 0.75 * x, x0: -3, x1: 3, y0: -4, y1: 4 };

export const NET_WHY: [string, string] = ["Mạng không chứa công thức của hàm. Nó chỉ có các nơ-ron xếp chồng: mỗi nơ-ron tạo một hình chữ S mờ (các đường xám), cộng chúng lại có trọng số được đường cam. «Học» là bài toán bóng lăn ở trên nhưng với hàng chục ẩn số: tính độ dốc của sai số theo từng trọng số (quy tắc hàm hợp, tức lan truyền ngược), rồi bước ngược dốc. Điều này cho thấy đạo hàm và hàm số không chỉ là bài tập: đó là cách máy học.", "The network contains no formula for the function. It only has stacked neurons: each neuron makes a faint S-shaped curve (the grey lines), and adding them with weights gives the orange line. «Learning» is the rolling-ball problem above but with dozens of unknowns: compute the slope of the error with respect to each weight (the chain rule, i.e. backpropagation), then step against the slope. This shows that derivatives and functions are not just exercises: they are how machines learn."];
