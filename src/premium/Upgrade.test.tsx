import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test } from "vitest";
import { setLang } from "../lib/store.ts";
import { fakeServer, renderAt } from "../test/render.tsx";
import { LICENSE_KEY } from "./license.ts";
import { Upgrade } from "./Upgrade.tsx";

const allOpen = { wallet: true, qr: true, bank: true, crypto: { "tron-usdt": true } };

function plans(open: unknown = allOpen) {
  return {
    body: {
      sample: false,
      lockContent: false,
      plans: [
        { id: "month", amount: 49000, days: 30 },
        { id: "year", amount: 399000, days: 365 },
      ],
      crypto: { chains: [{ id: "tron-usdt", sample: false }] },
      open,
    },
  };
}

function order(status: "pending" | "paid", extra: Record<string, unknown> = {}) {
  return {
    body: {
      orderId: "ord_1",
      plan: "year",
      method: "wallet",
      amount: 399000,
      status,
      transferCode: "BT1",
      expiresAt: Date.now() + 15 * 60_000,
      licenseKey: null,
      premiumUntil: null,
      payUrl: "https://pay.example/ord_1",
      ...extra,
    },
  };
}

beforeEach(() => setLang("en"));

describe("Upgrade", () => {
  test("creates an order for the picked plan and shows it waiting for payment", async () => {
    const user = userEvent.setup();
    const server = fakeServer({
      "GET /api/premium/plans": () => plans(),
      "POST /api/premium/create": () => order("pending"),
      "GET /api/premium/status": () => order("pending"),
    });
    renderAt("/nang-cap", <Upgrade />);

    expect(await screen.findByText(/399\.000 đ for 365 days/)).toBeInTheDocument();
    const pay = screen.getByRole("button", { name: "Create the payment" });
    await user.click(screen.getByRole("radio", { name: /One year/ }));
    await user.type(screen.getByRole("textbox", { name: "Email for the Premium license" }), "hs@example.com");
    expect(pay).toBeDisabled();

    await user.click(screen.getByRole("checkbox", { name: /I have read the policy/ }));
    await user.click(pay);

    expect(await screen.findByText(/Waiting for payment/)).toBeInTheDocument();
    expect(server.sent("POST /api/premium/create")[0]).toMatchObject({ email: "hs@example.com", plan: "year", method: "wallet" });
    expect(window.location.search).toBe("?orderId=ord_1");
    expect(screen.getByRole("link", { name: "Open MoMo" })).toHaveAttribute("href", "https://pay.example/ord_1");
  });

  test("keeps the license key on this device once the order is paid", async () => {
    fakeServer({
      "GET /api/premium/plans": () => plans(),
      "GET /api/premium/status": (url) => url.searchParams.has("license")
        ? { body: { active: true, premiumUntil: Date.now() + 86_400_000 } }
        : order("paid", { licenseKey: "bt_abcdefghijklmnop" }),
    });
    renderAt("/nang-cap?orderId=ord_1", <Upgrade />);

    expect(await screen.findByText("Paid. Premium is on.")).toBeInTheDocument();
    expect(screen.getByText("bt_abcdefghijklmnop")).toBeInTheDocument();
    expect(localStorage.getItem(LICENSE_KEY)).toBe("bt_abcdefghijklmnop");
  });

  test("says payments are not open and blocks checkout when no method takes money", async () => {
    const user = userEvent.setup();
    fakeServer({
      "GET /api/premium/plans": () => plans({ wallet: false, qr: false, bank: false, crypto: { "tron-usdt": false } }),
    });
    renderAt("/nang-cap", <Upgrade />);

    expect(await screen.findByRole("status")).toHaveTextContent("Payments are being set up");
    await user.click(screen.getByRole("checkbox", { name: /I have read the policy/ }));
    expect(screen.getByRole("button", { name: "Create the payment" })).toBeDisabled();
    expect(screen.getByRole("radio", { name: /MoMo wallet/ })).toBeDisabled();
  });

  test("shows the server's reason when an order is refused", async () => {
    const user = userEvent.setup();
    fakeServer({
      "GET /api/premium/plans": () => plans(),
      "POST /api/premium/create": () => ({ status: 400, body: { message: "That email does not look right." } }),
    });
    renderAt("/nang-cap", <Upgrade />);

    await screen.findByText(/399\.000 đ for 365 days/);
    await user.type(screen.getByRole("textbox", { name: "Email for the Premium license" }), "hs@example.com");
    await user.click(screen.getByRole("checkbox", { name: /I have read the policy/ }));
    await user.click(screen.getByRole("button", { name: "Create the payment" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("That email does not look right.");
    expect(window.location.search).toBe("");
  });

  test("says when the price list cannot load", async () => {
    fakeServer({ "GET /api/premium/plans": () => ({ status: 503, body: {} }) });
    renderAt("/nang-cap", <Upgrade />);

    expect(await screen.findByText("The price list did not load.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Create the payment" })).toBeDisabled();
  });

  test("rejects a malformed license key without asking the server", async () => {
    const user = userEvent.setup();
    const server = fakeServer({ "GET /api/premium/plans": () => plans() });
    renderAt("/nang-cap", <Upgrade />);

    await user.type(screen.getByRole("textbox", { name: "Already have a key?" }), "not-a-key");
    await user.click(screen.getByRole("button", { name: "Activate" }));

    expect(await screen.findByText("The key is wrong, expired or refunded.")).toBeInTheDocument();
    await waitFor(() => expect(server.fetch).toHaveBeenCalledTimes(1));
    expect(localStorage.getItem(LICENSE_KEY)).toBeNull();
  });
});
