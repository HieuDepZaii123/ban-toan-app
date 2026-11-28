import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { EXAM_KEY } from "../parent/report.ts";
import { setLang } from "../lib/store.ts";
import { renderAt } from "../test/render.tsx";
import { ExamPage } from "./ExamPage.tsx";

beforeEach(() => setLang("en"));

function startFree() {
  return screen.getByRole("button", { name: "Start the paper (90 minutes)" });
}

describe("ExamPage", () => {
  test("lets a free learner sit one paper, then shows the score and locks further papers", async () => {
    const user = userEvent.setup();
    vi.spyOn(window, "confirm").mockReturnValue(true);
    renderAt("/thi-thu", <ExamPage />);

    expect(screen.getByText("Your first paper is free.")).toBeInTheDocument();
    await user.click(startFree());

    expect(screen.getByRole("heading", { name: "Paper in progress" })).toBeInTheDocument();
    expect(screen.getByText("Answered 0/34")).toBeInTheDocument();
    const firstQuestion = screen.getByRole("group", { name: "Question 1" });
    const choice = within(firstQuestion).getAllByRole("button")[0]!;
    await user.click(choice);
    expect(choice).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("Answered 1/34")).toBeInTheDocument();

    await user.click(screen.getAllByRole("button", { name: "Submit" })[0]!);

    expect(window.confirm).toHaveBeenCalledWith("33 items are unanswered. Submit anyway?");
    expect(screen.getByRole("heading", { name: /^Last score: [\d.]+\/10$/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Past papers" })).toBeInTheDocument();
    expect(screen.getByText("You have used your free paper.")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Start/ })).not.toBeInTheDocument();
  });

  test("stays in the paper when the learner cancels an early submit", async () => {
    const user = userEvent.setup();
    vi.spyOn(window, "confirm").mockReturnValue(false);
    renderAt("/thi-thu", <ExamPage />);

    await user.click(startFree());
    await user.click(screen.getAllByRole("button", { name: "Submit" })[0]!);

    expect(screen.getByRole("heading", { name: "Paper in progress" })).toBeInTheDocument();
    expect(screen.queryByText(/Last score/)).not.toBeInTheDocument();
  });

  test("resumes a paper in progress after a reload, with its answers", async () => {
    const user = userEvent.setup();
    const first = renderAt("/thi-thu", <ExamPage />);
    await user.click(startFree());
    await user.type(screen.getByRole("textbox", { name: "Answer to question 1" }), "2,5");
    first.unmount();

    renderAt("/thi-thu", <ExamPage />);

    expect(screen.getByRole("heading", { name: "Paper in progress" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Answer to question 1" })).toHaveValue("2,5");
    expect(screen.getByText("Answered 1/34")).toBeInTheDocument();
  });

  test("finishes the paper on its own when the 90 minutes are already up", () => {
    const startedAt = Date.now() - 91 * 60_000;
    localStorage.setItem(EXAM_KEY, JSON.stringify({
      active: { seed: 7, startedAt, answers: { mcq: {}, tf: {}, short: {} } },
      last: null,
      history: [],
    }));

    renderAt("/thi-thu", <ExamPage />);

    expect(screen.getByRole("heading", { name: "Last score: 0/10" })).toBeInTheDocument();
    expect(screen.getByText(/· 90 min$/)).toBeInTheDocument();
  });

  test("answers the current question from the keyboard and walks the paper with the arrows", async () => {
    const user = userEvent.setup();
    renderAt("/thi-thu", <ExamPage />);
    await user.click(startFree());

    expect(screen.getByText(/^Keys: A–D or 1–4/)).toBeInTheDocument();

    const first = screen.getByRole("group", { name: "Question 1" });
    await user.keyboard("b");
    expect(within(first).getAllByRole("button")[1]).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("Answered 1/34")).toBeInTheDocument();

    await user.keyboard("{ArrowDown}");
    await user.keyboard("3");
    const second = screen.getByRole("group", { name: "Question 2" });
    expect(within(second).getAllByRole("button")[2]).toHaveAttribute("aria-pressed", "true");
    expect(within(first).getAllByRole("button")[0]).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByText("Answered 2/34")).toBeInTheDocument();

    await user.keyboard("{ArrowUp}");
    await user.keyboard("d");
    expect(within(first).getAllByRole("button")[3]).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("Answered 2/34")).toBeInTheDocument();

    await user.keyboard("{Enter}");
    expect(screen.getByRole("group", { name: "Question 2" }).closest("article")).toHaveAttribute("aria-current", "true");
    expect(screen.getByRole("group", { name: "Question 1" }).closest("article")).not.toHaveAttribute("aria-current");
  });

  test("fills a true/false question with T and F, statement by statement", async () => {
    const user = userEvent.setup();
    renderAt("/thi-thu", <ExamPage />);
    await user.click(startFree());

    for (let step = 0; step < 12; step += 1) await user.keyboard("{ArrowDown}");
    const tf = screen.getAllByRole("group", { name: "Statement a" })[0]!;

    await user.keyboard("t");
    expect(within(tf).getByRole("button", { name: "True" })).toHaveAttribute("aria-pressed", "true");
    await user.keyboard("f");
    const next = screen.getAllByRole("group", { name: "Statement b" })[0]!;
    expect(within(next).getByRole("button", { name: "False" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("Answered 2/34")).toBeInTheDocument();

    // The last two statements of the same question come next; then nothing more.
    await user.keyboard("tf");
    expect(screen.getByText("Answered 4/34")).toBeInTheDocument();
    await user.keyboard("t");
    expect(screen.getByText("Answered 4/34")).toBeInTheDocument();
  });

  test("keeps shortcuts off the short answers and moves on with Enter", async () => {
    const user = userEvent.setup();
    renderAt("/thi-thu", <ExamPage />);
    await user.click(startFree());

    const answer = screen.getByRole("textbox", { name: "Answer to question 1" });
    await user.type(answer, "2,5");

    expect(screen.getByText("Answered 1/34")).toBeInTheDocument();
    const first = screen.getByRole("group", { name: "Question 1" });
    expect(within(first).getAllByRole("button").every((button) => button.getAttribute("aria-pressed") === "false")).toBe(true);

    await user.keyboard("{Enter}");
    expect(answer).not.toHaveFocus();
    expect(screen.getByRole("textbox", { name: "Answer to question 2" }).closest("article")).toHaveAttribute("aria-current", "true");
  });
});
