import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// Component tests only. Kept apart from vite.config.ts so the PWA and payment-API plugins
// never load under test. The tsx scripts in scripts/ remain the tests for server and content.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.tsx"],
    setupFiles: ["src/test/setup.ts"],
    restoreMocks: true,
    unstubGlobals: true,
  },
});
