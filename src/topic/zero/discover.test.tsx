import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test } from "vitest";
import { setLang } from "../../lib/store.ts";
import { LIMIT_CARDS } from "./limitDiscover.tsx";
import { Discover } from "./discover.tsx";

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
});
