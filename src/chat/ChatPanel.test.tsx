import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { setLang } from "../lib/store.ts";
import { fakeServer, renderAt } from "../test/render.tsx";
import { ChatPanel } from "./ChatPanel.tsx";

beforeEach(() => setLang("en"));

function question() {
  return screen.getByRole("textbox", { name: "Math question" });
}

describe("ChatPanel", () => {
  test("sends a question as a hint request and shows the reply with the quota left", async () => {
    const user = userEvent.setup();
    const server = fakeServer({
      "POST /api/chat": () => ({ body: { reply: "Think about the power rule.", remaining: 7, limit: 8, premium: false } }),
    });
    renderAt("/", <ChatPanel onClose={() => undefined} />);

    await user.type(question(), "Derivative of x^3?");
    await user.click(screen.getByRole("button", { name: "Send" }));

    expect(await screen.findByText("Think about the power rule.")).toBeInTheDocument();
    expect(screen.getByText("Derivative of x^3?")).toBeInTheDocument();
    expect(screen.getByText(/7 free questions left today/)).toBeInTheDocument();
    expect(question()).toHaveValue("");
    expect(server.sent("POST /api/chat")[0]).toMatchObject({
      mode: "hint",
      messages: [{ role: "user", content: "Derivative of x^3?" }],
    });
  });

  test("keeps free users on hints and points them to Premium for full solutions", async () => {
    const user = userEvent.setup();
    fakeServer({});
    renderAt("/", <ChatPanel onClose={() => undefined} />);

    await user.click(screen.getByRole("radio", { name: /Full solution/ }));

    expect(screen.getByRole("status")).toHaveTextContent("Full solutions, checking work and problem photos are Premium.");
    expect(screen.getByRole("radio", { name: /Hints/ })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("radio", { name: /Full solution/ })).toHaveAttribute("aria-checked", "false");
  });

  test("offers Premium once the free questions for the day are used", async () => {
    const user = userEvent.setup();
    fakeServer({
      "POST /api/chat": () => ({ body: { message: "No questions left today.", remaining: 0, limit: 8, premium: false } }),
    });
    renderAt("/", <ChatPanel onClose={() => undefined} />);

    await user.type(question(), "One more?{Enter}");

    expect(await screen.findByText(/Your 8 free questions for today are used/)).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("No questions left today.");
    expect(screen.getAllByRole("link", { name: "See Premium" })[0]).toHaveAttribute("href", "/nang-cap");
  });

  test("tells the learner to retry when the tutor cannot be reached", async () => {
    const user = userEvent.setup();
    fakeServer({ "POST /api/chat": () => new TypeError("Failed to fetch") });
    renderAt("/", <ChatPanel onClose={() => undefined} />);

    await user.type(question(), "Hello?");
    await user.click(screen.getByRole("button", { name: "Send" }));

    expect(await screen.findByRole("status")).toHaveTextContent("The tutor did not connect. Try again.");
    expect(screen.queryByText("Typing…")).not.toBeInTheDocument();
  });

  test("closes on Escape", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    fakeServer({});
    renderAt("/", <ChatPanel onClose={onClose} />);

    await user.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalledOnce();
  });

  test("keeps the conversation after the panel is reopened", async () => {
    const user = userEvent.setup();
    fakeServer({ "POST /api/chat": () => ({ body: { reply: "Use the vertex formula." } }) });
    const first = renderAt("/", <ChatPanel onClose={() => undefined} />);
    await user.type(question(), "Vertex?{Enter}");
    await screen.findByText("Use the vertex formula.");
    first.unmount();

    renderAt("/", <ChatPanel onClose={() => undefined} />);

    expect(screen.getByText("Vertex?")).toBeInTheDocument();
    expect(screen.getByText("Use the vertex formula.")).toBeInTheDocument();
  });
});
