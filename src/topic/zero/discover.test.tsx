import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test } from "vitest";
import { setLang } from "../../lib/store.ts";
import { LIMIT_CARDS } from "./limitCards.ts";
import { Discover } from "./discover.tsx";
import { SURVEY_CARDS } from "./surveyCards.ts";
import { VECTOR_CARDS } from "./vectorCards.ts";
import { LINALG_CARDS } from "./linalgCards.ts";
import { CALC_CARDS } from "./calcCards.ts";
import { STATS_CARDS } from "./statsCards.ts";
import { DISCRETE_CARDS } from "./discreteCards.ts";
import { ANALYTIC_CARDS } from "./analyticCards.ts";
import { TRIANGLE_CARDS } from "./triangleCards.ts";
import { COMBO_CARDS } from "./comboCards.ts";

describe("Thẻ khám phá", () => {
  beforeEach(() => {
    localStorage.clear();
    setLang("vi");
  });

  test("chọn sai thì hiện gợi ý, chưa lộ lời phát hiện", async () => {
    const user = userEvent.setup();
    render(<Discover card={LIMIT_CARDS.hole} />);
    const buttons = screen.getAllByRole("button");
    const wrongIndex = buttons.findIndex((_, i) => i !== LIMIT_CARDS.hole.answer());
    await user.click(buttons[wrongIndex] as HTMLElement);
    expect((await screen.findByRole("status")).textContent).toContain("Chưa đúng");
    expect(screen.queryByText(/Bạn vừa phát hiện/)).toBeNull();
  });

  test("chọn đúng thì hiện lời phát hiện kèm số liệu máy tính", async () => {
    const user = userEvent.setup();
    render(<Discover card={LIMIT_CARDS.indeterminate} />);
    await user.click(screen.getAllByRole("button")[LIMIT_CARDS.indeterminate.answer()] as HTMLElement);
    const note = await screen.findByRole("status");
    expect(note.textContent).toContain("Bạn vừa phát hiện");
    expect(note.textContent).toMatch(/10\u207b|10-6|10−6|10\^\{-6\}/);
  });

  test("đáp án đúng của mỗi thẻ do thuật toán tính và nằm trong các lựa chọn", () => {
    for (const card of Object.values(LIMIT_CARDS)) {
      const index = card.answer();
      expect(index).toBeGreaterThanOrEqual(0);
      expect(index).toBeLessThan(card.options.length);
    }
    expect(LIMIT_CARDS.hole.options[LIMIT_CARDS.hole.answer()]?.label[0]).toContain("2");
    expect(LIMIT_CARDS.asymptote.options[LIMIT_CARDS.asymptote.answer()]?.label[0]).toContain("2");
    expect(LIMIT_CARDS.continuity.options[LIMIT_CARDS.continuity.answer()]?.label[0]).toContain("1");
  });

  test("câu sai được nhớ và hiện nhãn ôn lại sau một ngày", async () => {
    const user = userEvent.setup();
    const first = render(<Discover card={LIMIT_CARDS.hole} />);
    const wrongIndex = screen.getAllByRole("button").findIndex((_, i) => i !== LIMIT_CARDS.hole.answer());
    await user.click(screen.getAllByRole("button")[wrongIndex] as HTMLElement);
    first.unmount();
    const saved = JSON.parse(localStorage.getItem("ban-toan-discover") ?? "{}") as Record<string, { ok: boolean; tries: number; at: number }>;
    expect(saved["limit-hole"]?.ok).toBe(false);
    saved["limit-hole"]!.at = Date.now() - 2 * 86_400_000;
    localStorage.setItem("ban-toan-discover", JSON.stringify(saved));
    render(<Discover card={LIMIT_CARDS.hole} />);
    expect(screen.getByText("Ôn lại")).toBeTruthy();
  });

  test("các thẻ khảo sát hàm số có đáp án đúng do thuật toán tính", () => {
    const label = (card: { options: { label: [string, string] }[]; answer: () => number }) => card.options[card.answer()]?.label[0] ?? "";
    expect(label(SURVEY_CARDS.flat)).toContain("Không phải");
    expect(label(SURVEY_CARDS.maxCount)).toBe("2");
    expect(label(SURVEY_CARDS.line)).toContain("3");
    expect(label(SURVEY_CARDS.quartic)).toBe("3");
    expect(label(SURVEY_CARDS.asymptote)).toContain("3");
  });

  test("các thẻ vectơ có đáp án đúng do thuật toán tính", () => {
    const label = (card: { options: { label: [string, string] }[]; answer: () => number }) => card.options[card.answer()]?.label[0] ?? "";
    expect(label(VECTOR_CARDS.dot)).toBe("$(3;-4)$");
    expect(label(VECTOR_CARDS.order)).toContain("\\neq");
    expect(label(VECTOR_CARDS.area)).toBe("$5$");
    expect(label(VECTOR_CARDS.system)).toContain("Vô nghiệm");
    expect(label(VECTOR_CARDS.centroid)).toBe("$(2;1)$");
  });

  test("các thẻ đại số tuyến tính có đáp án đúng do thuật toán tính", () => {
    const label = (card: { options: { label: [string, string] }[]; answer: () => number }) => card.options[card.answer()]?.label[0] ?? "";
    expect(label(LINALG_CARDS.stay)).toBe("$(1;1)$");
    expect(label(LINALG_CARDS.power)).toBe("$(1;1)$");
    expect(label(LINALG_CARDS.rank)).toBe("$2$");
    expect(label(LINALG_CARDS.eigen)).toBe("$5$");
    expect(label(LINALG_CARDS.regress)).toBe("$1,5$");
  });

  test("các thẻ giải tích có đáp án đúng do thuật toán tính", () => {
    const label = (card: { options: { label: [string, string] }[]; answer: () => number }) => card.options[card.answer()]?.label[0] ?? "";
    expect(label(CALC_CARDS.harmonic)).toContain("Lớn lên mãi");
    expect(label(CALC_CARDS.taylor)).toContain("0,003");
    expect(label(CALC_CARDS.descent)).toBe("$(-4;-6)$");
    expect(label(CALC_CARDS.saddle)).toContain("yên");
    expect(label(CALC_CARDS.lagrange)).toBe("$2$");
  });

  test("các thẻ xác suất thống kê có đáp án đúng do thuật toán tính", () => {
    const label = (card: { options: { label: [string, string] }[]; answer: () => number }) => card.options[card.answer()]?.label[0] ?? "";
    expect(label(STATS_CARDS.standardError)).toBe("0,5 lần");
    expect(label(STATS_CARDS.abTest)).toContain("có ý nghĩa");
    expect(label(STATS_CARDS.coverage)).toContain("95");
    expect(label(STATS_CARDS.bias)).toContain("Thấp hơn");
    expect(label(STATS_CARDS.diceVar)).toBe("$\\frac{35}{6}$");
  });

  test("các thẻ vi phân và rời rạc có đáp án đúng do thuật toán tính", () => {
    const label = (card: { options: { label: [string, string] }[]; answer: () => number }) => card.options[card.answer()]?.label[0] ?? "";
    expect(label(DISCRETE_CARDS.doubling)).toContain("0,69");
    expect(label(DISCRETE_CARDS.logistic)).toBe("$100$");
    expect(label(DISCRETE_CARDS.fermat)).toBe("Dư $4$");
    expect(label(DISCRETE_CARDS.handshake)).toContain("Không thể");
    expect(label(DISCRETE_CARDS.rsa)).toBe("$7$");
  });

  test("các thẻ hình giải tích có đáp án đúng do thuật toán tính", () => {
    const label = (card: { options: { label: [string, string] }[]; answer: () => number }) => card.options[card.answer()]?.label[0] ?? "";
    expect(label(ANALYTIC_CARDS.touch)).toBe("1 điểm");
    expect(label(ANALYTIC_CARDS.distance)).toBe("$2,6$");
    expect(label(ANALYTIC_CARDS.parallel)).toBe("Song song");
    expect(label(ANALYTIC_CARDS.skew)).toBe("Chéo nhau");
    expect(label(ANALYTIC_CARDS.slice)).toBe("$4$");
  });

  test("các thẻ tam giác có đáp án đúng do thuật toán tính", () => {
    const label = (card: { options: { label: [string, string] }[]; answer: () => number }) => card.options[card.answer()]?.label[0] ?? "";
    expect(label(TRIANGLE_CARDS.k51213)).toBe("Tam giác vuông");
    expect(label(TRIANGLE_CARDS.k346)).toBe("Tam giác tù");
    expect(label(TRIANGLE_CARDS.cosine)).toBe("$\\sqrt{57}$");
    expect(label(TRIANGLE_CARDS.areaRatio)).toBe("Gấp 4 lần");
    expect(label(TRIANGLE_CARDS.volume)).toBe("Gấp 8 lần");
  });

  test("các thẻ tổ hợp có đáp án đúng do thuật toán tính", () => {
    const label = (card: { options: { label: [string, string] }[]; answer: () => number }) => card.options[card.answer()]?.label[0] ?? "";
    expect(label(COMBO_CARDS.line5)).toBe("120 cách");
    expect(label(COMBO_CARDS.pick3)).toBe("120 nhóm");
    expect(label(COMBO_CARDS.symmetry)).toContain("bằng");
    expect(label(COMBO_CARDS.rowSum)).toBe("$64$");
    expect(label(COMBO_CARDS.coefficient)).toBe("$10$");
  });
});
