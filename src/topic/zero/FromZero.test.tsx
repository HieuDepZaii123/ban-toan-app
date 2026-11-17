import { render } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { setLang } from "../../lib/store.ts";
import FromZero from "./FromZero.tsx";

const IDS = ["quadratic", "ineq", "exp", "sequence", "trig", "limit", "derivative", "survey", "integral", "vector", "analytic", "triangle", "combo", "probability"];
// Chữ cái có dấu tiếng Việt. «Viète» là tên riêng nên được miễn.
const VN = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;

/** Văn bản người dùng nhìn thấy: bỏ MathML trùng lặp của KaTeX, thêm tùy chọn và nhãn trợ năng. */
function visibleText(root: HTMLElement): string[] {
  const out: string[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if ((n.parentElement as HTMLElement).closest(".katex-mathml")) continue;
    const t = (n.textContent ?? "").trim();
    if (t) out.push(t);
  }
  root.querySelectorAll("[aria-label]").forEach((el) => out.push(el.getAttribute("aria-label") ?? ""));
  return out;
}

describe("Suy từ số 0 (FromZero)", () => {
  // jsdom không có ResizeObserver; các hình dùng nó để vẽ lại khi đổi kích thước.
  beforeEach(() => {
    vi.stubGlobal("ResizeObserver", class { observe() {} unobserve() {} disconnect() {} });
  });

  test.each(IDS)("%s: tiếng Anh không lẫn chữ Việt, tiếng Việt vẫn nguyên", (id) => {
    setLang("en");
    const en = render(<FromZero topicId={id} />);
    const enText = visibleText(en.container).map((t) => t.replace(/Viète/g, "Viete"));
    expect(enText.filter((t) => VN.test(t))).toEqual([]);
    expect(en.container.querySelector("h2")?.textContent).toBe("From zero: run the algorithms yourself");
    expect(en.container.querySelectorAll(".fz-card").length).toBeGreaterThanOrEqual(1);
    en.unmount();

    setLang("vi");
    const vi = render(<FromZero topicId={id} />);
    expect(vi.container.querySelector("h2")?.textContent).toBe("Suy từ số 0: tự tay chạy thuật toán");
    expect(visibleText(vi.container).some((t) => VN.test(t))).toBe(true);
  });

  test("số hình tối thiểu cho từng chuyên đề không bị rớt", () => {
    setLang("en");
    const min: Record<string, number> = { quadratic: 11, ineq: 7, trig: 8, limit: 7, derivative: 10, integral: 9, analytic: 6, triangle: 8 };
    for (const [id, n] of Object.entries(min)) {
      const r = render(<FromZero topicId={id} />);
      expect(r.container.querySelectorAll(".fz-card").length).toBeGreaterThanOrEqual(n);
      r.unmount();
    }
  });
});
