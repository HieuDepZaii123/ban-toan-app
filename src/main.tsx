import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles.css";

const root = document.getElementById("root");
if (!root) throw new Error("root");

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

if (import.meta.env.PROD) {
  window.addEventListener("load", () => {
    const start = () => {
      void import("virtual:pwa-register").then(({ registerSW }) => {
        registerSW({ immediate: true });
      });
    };
    const host = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    };
    if (host.requestIdleCallback) host.requestIdleCallback(start, { timeout: 2500 });
    else window.setTimeout(start, 1500);
  });
}
