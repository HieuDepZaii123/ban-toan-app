import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";
import { resetStore } from "../lib/store.ts";

// jsdom has no layout, so scrolling is a no-op here; the app calls it after sending and navigating.
window.scrollTo = () => undefined;
Element.prototype.scrollTo = () => undefined;

afterEach(() => {
  cleanup();
  localStorage.clear();
  sessionStorage.clear();
  resetStore();
  window.history.replaceState(null, "", "/");
});
