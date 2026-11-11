/**
 * Chạy lại các bộ test thanh toán trên Postgres (PGlite), cùng kịch bản đã chạy trên SQLite.
 * Đặt PAY_TEST_STORE=postgres và TEST_DATABASE_URL để chạy trên máy chủ Postgres thật.
 * Run with: tsx scripts/pgSuites.ts
 */
import { execFileSync } from "node:child_process";

const SUITES = ["scripts/pay.test.ts", "scripts/crypto.test.ts", "scripts/affiliate.test.ts", "scripts/db.test.ts"];
const store = process.env.PAY_TEST_STORE === "postgres" ? "postgres" : "pglite";

for (const suite of SUITES) {
  execFileSync(process.execPath, ["--import", "tsx", "--disable-warning=ExperimentalWarning", suite], {
    stdio: "inherit",
    env: { ...process.env, PAY_TEST_STORE: store },
  });
}
console.log(`postgres suites ok (${store})`);
