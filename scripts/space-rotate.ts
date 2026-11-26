/**
 * Hình không gian xoay được (src/grades/SpaceFigure.tsx) trên bản build thật: nút bật xoay, kéo bằng chuột hoặc ngón tay,
 * phím mũi tên, Esc để đặt lại, nút trở về hình đứng yên, không lỗi console và không tràn ngang trên điện thoại.
 * Chạy: npm run build && tsx scripts/space-rotate.ts   (hoặc BASE_URL=… để dùng máy chủ đang chạy)
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
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  for (const path of ["/kien-thuc/11/quy-tac-vecto-kg", "/kien-thuc/12/mat-cau-tx", "/kien-thuc/12/vecto-kg"]) {
    await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
    const svg = page.locator("svg.space-figure").first();
    if (!(await svg.count())) { fail(path, "không có hình"); continue; }
    const shot = async () => (await svg.innerHTML()).replace(/\s+/g, " ");
    const still = await shot();
    if (await page.locator("svg.space-turnable").count()) fail(path, "hình đã xoay được khi chưa bật");
    const toggle = page.getByRole("button", { name: /Xoay hình|Rotate figure/ }).first();
    if ((await toggle.getAttribute("aria-pressed")) !== "false") fail(path, "nút xoay phải có aria-pressed=false lúc đầu");
    await toggle.click();
    if (!(await page.locator("svg.space-turnable").count())) { fail(path, "bật xoay mà hình không chuyển sang chế độ xoay"); continue; }
    if (!(await page.getByRole("button", { name: /Hình đứng yên|Fixed figure/ }).first().getAttribute("aria-pressed"))) fail(path, "nút khi đang xoay phải có aria-pressed=true");
    const touch = await svg.evaluate((el) => getComputedStyle(el).touchAction);
    if (touch !== "none") fail(path, `touch-action phải là none khi xoay, đang là ${touch}`);
    const start = await shot();
    if (start === still) fail(path, "chế độ xoay không đổi hình so với hình đứng yên");
    const box = (await svg.boundingBox())!;
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width / 2 + 70, box.y + box.height / 2 + 20, { steps: 6 });
    await page.mouse.up();
    const dragged = await shot();
    if (dragged === start) fail(path, "kéo chuột không xoay hình");
    await svg.focus();
    await page.keyboard.press("ArrowRight");
    const keyed = await shot();
    if (keyed === dragged) fail(path, "phím mũi tên không xoay hình");
    await page.keyboard.press("Escape");
    if ((await shot()) !== start) fail(path, "phím Esc không đặt lại góc nhìn ban đầu");
    await page.keyboard.press("ArrowDown");
    await page.getByRole("button", { name: /Đặt lại góc nhìn|Reset view/ }).click();
    if ((await shot()) !== start) fail(path, "nút đặt lại không đưa về góc nhìn ban đầu");
    await page.getByRole("button", { name: /Hình đứng yên|Fixed figure/ }).click();
    if ((await shot()) !== still) fail(path, "nút hình đứng yên không trở về hình ban đầu");
    const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (over > 1) fail(path, `trang tràn ngang ${over}px`);
  }
  if (errors.length) fail("console", errors.slice(0, 3).join(" | "));
} finally {
  await browser.close();
  if (server?.pid) { try { process.kill(-server.pid); } catch { /* đã tắt */ } }
}
if (fails.length) {
  console.error(`space-rotate: ${fails.length} lỗi\n${fails.map((f) => `  - ${f}`).join("\n")}`);
  process.exit(1);
}
console.log("space-rotate ok: bật, kéo, phím, đặt lại, trở về hình đứng yên");
