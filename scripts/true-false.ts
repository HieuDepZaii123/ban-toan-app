/**
 * Câu đúng/sai bốn ý của bài luyện (AskForm trong src/grades/GradeDesk.tsx) trên bản build thật: báo thiếu ý, báo số ý đúng,
 * chấp nhận khi đúng cả bốn ý, khóa nút sau khi đúng, có bản tiếng Anh, không tràn ngang trên điện thoại.
 * Chạy: npm run build && tsx scripts/true-false.ts   (hoặc BASE_URL=… để dùng máy chủ đang chạy)
 */
import { spawn, type ChildProcess } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
function loadPlaywright(): typeof import("playwright") {
  for (const id of ["playwright", "/opt/node-tools/node_modules/playwright"]) {
    try { return require(id) as typeof import("playwright"); } catch { /* thử đường khác */ }
  }
  throw new Error("Không tìm thấy playwright");
}

const BASE = process.env.BASE_URL ?? "http://127.0.0.1:43991";
async function waitForServer(url: string, ms: number): Promise<boolean> {
  const until = Date.now() + ms;
  while (Date.now() < until) {
    try { if ((await fetch(url)).ok) return true; } catch { /* chưa lên */ }
    await new Promise((done) => setTimeout(done, 300));
  }
  return false;
}

let server: ChildProcess | undefined;
if (!(await waitForServer(BASE, 800))) {
  if (process.env.BASE_URL) throw new Error(`Không kết nối được ${BASE}`);
  server = spawn("npx", ["vite", "preview"], { stdio: "ignore", detached: true });
  if (!(await waitForServer(BASE, 30_000))) throw new Error("Máy chủ xem thử không khởi động được. Đã chạy npm run build chưa?");
}

const fails: string[] = [];
const fail = (where: string, what: string) => fails.push(`${where}: ${what}`);
const { chromium } = loadPlaywright();
const browser = await chromium.launch();
const CASES = [
  { path: "/kien-thuc/12/vtt-hai-dt", truth: [true, false, true, false] },
  { path: "/kien-thuc/12/pt-mp-dang", truth: [true, true, false, false] },
  { path: "/kien-thuc/10/hypebol-tieu-diem", truth: [true, true, false, false] },
];
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  for (const { path, truth } of CASES) {
    await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
    const box = page.locator("fieldset.grade-tf").first();
    if (!(await box.count())) { fail(path, "không có câu đúng/sai"); continue; }
    const rows = box.locator(".tf-row");
    if ((await rows.count()) !== 4) fail(path, `phải có 4 ý, đang có ${await rows.count()}`);
    const note = box.locator("xpath=ancestor::div[contains(@class,'fitem')]").locator("p[role=status]").first();
    const check = box.getByRole("button", { name: /Kiểm tra|Check/ });
    await check.click();
    if (!/cả bốn ý/.test((await note.textContent()) ?? "")) fail(path, "chưa chọn gì mà không nhắc chọn đủ bốn ý");
    for (let i = 0; i < 4; i += 1) await rows.nth(i).getByLabel(truth[i] ? "Sai" : "Đúng", { exact: true }).check();
    await check.click();
    if (!/Đúng 0\/4/.test((await note.textContent()) ?? "")) fail(path, `chọn sai cả bốn ý phải báo 0/4, đang là: ${await note.textContent()}`);
    if (await check.isDisabled()) fail(path, "nút kiểm tra bị khóa khi chưa đúng");
    await rows.nth(0).getByLabel(truth[0] ? "Đúng" : "Sai", { exact: true }).check();
    await check.click();
    if (!/Đúng 1\/4/.test((await note.textContent()) ?? "")) fail(path, `sửa đúng một ý phải báo 1/4, đang là: ${await note.textContent()}`);
    for (let i = 1; i < 4; i += 1) await rows.nth(i).getByLabel(truth[i] ? "Đúng" : "Sai", { exact: true }).check();
    await check.click();
    if (!/Đúng cả rồi/.test((await note.textContent()) ?? "")) fail(path, "đúng cả bốn ý mà không báo đúng");
    if (!(await check.isDisabled())) fail(path, "đúng rồi mà nút kiểm tra chưa khóa");
    const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (over > 1) fail(path, `trang tràn ngang ${over}px`);
  }
  // Bản tiếng Anh.
  await page.goto(`${BASE}/kien-thuc/12/vtt-hai-dt`, { waitUntil: "networkidle" });
  const lang = page.getByRole("button", { name: /^(EN|English)$/ }).first();
  if (await lang.count()) {
    await lang.click();
    const en = page.locator("fieldset.grade-tf").first();
    if (!(await en.getByLabel("True", { exact: true }).first().count())) fail("en", "không có nút True trong bản tiếng Anh");
  }
  if (errors.length) fail("console", errors.slice(0, 3).join(" | "));
} finally {
  await browser.close();
  if (server?.pid) { try { process.kill(-server.pid); } catch { /* đã tắt */ } }
}
if (fails.length) {
  console.error(`true-false: ${fails.length} lỗi\n${fails.map((f) => `  - ${f}`).join("\n")}`);
  process.exit(1);
}
console.log("true-false ok: báo thiếu ý, báo số ý đúng, chấp nhận khi đúng cả bốn, khóa nút");
