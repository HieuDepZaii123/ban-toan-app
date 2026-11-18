import { render, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { RouteProvider } from "../../lib/route.tsx";
import { setLang } from "../../lib/store.ts";
import { EDGES } from "./edges.ts";
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

  test.each(IDS)("%s: tiếng Anh không lẫn chữ Việt, tiếng Việt vẫn nguyên", async (id) => {
    setLang("en");
    const en = render(<RouteProvider><FromZero topicId={id} /></RouteProvider>);
    await waitFor(() => expect(en.container.querySelector(".fz-card")).not.toBeNull());
    const enText = visibleText(en.container).map((t) => t.replace(/Viète/g, "Viete"));
    expect(enText.filter((t) => VN.test(t))).toEqual([]);
    expect(en.container.querySelector("h2")?.textContent).toBe("From zero: run the algorithms yourself");
    expect(en.container.querySelectorAll(".fz-card").length).toBeGreaterThanOrEqual(1);
    en.unmount();

    setLang("vi");
    const vi = render(<RouteProvider><FromZero topicId={id} /></RouteProvider>);
    await waitFor(() => expect(vi.container.querySelector(".fz-card")).not.toBeNull());
    expect(vi.container.querySelector("h2")?.textContent).toBe("Suy từ số 0: tự tay chạy thuật toán");
    expect(visibleText(vi.container).some((t) => VN.test(t))).toBe(true);
  });

  test("mọi chuyên đề có đủ hình, có bản đồ liên kết và danh sách mối nối", async () => {
    setLang("en");
    const min: Record<string, number> = { quadratic: 13, ineq: 12, exp: 10, sequence: 9, trig: 10, limit: 12, derivative: 14, survey: 7, integral: 13, vector: 7, analytic: 7, triangle: 9, combo: 5, probability: 7 };
    for (const [id, n] of Object.entries(min)) {
      const r = render(<RouteProvider><FromZero topicId={id} /></RouteProvider>);
      await waitFor(() => expect(r.container.querySelectorAll(".fz-card").length, `${id}: số hình`).toBeGreaterThanOrEqual(n), { timeout: 5000 });
      expect(r.container.querySelectorAll(".fz-card").length, `${id}: số hình`).toBeGreaterThanOrEqual(n);
      expect(r.container.querySelectorAll(".fz-node").length, `${id}: số nút của bản đồ`).toBe(14);
      expect(r.container.querySelectorAll(".fz-edge-list li").length, `${id}: số mối nối`).toBeGreaterThanOrEqual(3);
      expect(r.container.querySelector(".fz-node.self"), `${id}: nút của chính nó`).not.toBeNull();
      r.unmount();
    }
  });

  test("mọi mối nối nối hai chuyên đề có thật và không trùng lặp", () => {
    const ids = new Set(IDS);
    const seen = new Set<string>();
    for (const e of EDGES) {
      expect(ids.has(e.a) && ids.has(e.b) && e.a !== e.b, `${e.a}–${e.b}`).toBe(true);
      const key = [e.a, e.b].sort().join("|");
      expect(seen.has(key), `trùng ${key}`).toBe(false);
      seen.add(key);
      expect(e.vi.length).toBeGreaterThan(30);
      expect(e.en.length).toBeGreaterThan(30);
    }
    for (const id of IDS) expect(EDGES.filter((e) => e.a === id || e.b === id).length, id).toBeGreaterThanOrEqual(3);
  });
});
