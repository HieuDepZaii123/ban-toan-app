/**
 * Lời đọc của công thức: các mẫu hay gặp ở bài tiểu học và THCS.
 * Run with: tsx scripts/speak.test.ts
 */
import assert from "node:assert/strict";
import { speakable } from "../src/lib/speakable.ts";

const R = String.raw;
assert.equal(speakable(R`Tính $3 + 4 = 7$.`), "Tính 3 cộng 4 bằng 7.");
assert.equal(speakable(R`$12 - 5$`), "12 trừ 5");
assert.equal(speakable(R`$3 \cdot 4$ và $12 : 3$`), "3 nhân 4 và 12 chia 3");
assert.equal(speakable(R`$\frac{1}{2}$ cái bánh`), "1 phần 2 cái bánh");
assert.equal(speakable(R`$x^2$, $2^3$, $a^{10}$`), "x bình phương, 2 lập phương, a mũ 10");
assert.equal(speakable(R`$\sqrt{16} = 4$`), "căn bậc hai của 16 bằng 4");
assert.equal(speakable(R`$x \le 3$ và $y \neq 0$`), "x nhỏ hơn hoặc bằng 3 và y khác 0");
assert.equal(speakable(R`Góc $30^\circ$`), "Góc 30 độ");
assert.equal(speakable(R`$-2$`), "âm 2");
assert.equal(speakable("Giá 2,5 nghìn đồng"), "Giá 2 phẩy 5 nghìn đồng");
assert.equal(speakable(R`$\Delta = b^2 - 4ac$`), "đen ta bằng b bình phương trừ 4ac");
assert.equal(speakable(R`$\frac{1}{2} + \frac{1}{3}$`, "en"), "1 over 2 plus 1 over 3");
assert.equal(speakable(R`$a - b$ và $5 - x = 2$`), "a trừ b và 5 trừ x bằng 2");
assert.equal(speakable(R`$3\,000$ đồng`), "3000 đồng");
assert.equal(speakable(R`$x = \dfrac{-b \pm \sqrt{\Delta}}{2a}$`), "x bằng âm b cộng trừ căn bậc hai của đen ta phần 2a");
assert.equal(/[\\${}]/.test(speakable(R`$\left(\dfrac{a}{b}\right)^{n} \ge \pi$ với $u_1$`)), false, "no LaTeX marks are left to be read out");

console.log("speak ok");
