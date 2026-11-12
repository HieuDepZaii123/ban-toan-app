/**
 * Kiểm tra giao diện tự động trên bản build thật.
 *
 * Bắt những lỗi mà trước đây phải nhờ người xem ảnh mới thấy:
 *  - lỗi console và lỗi script;
 *  - trang tràn ngang trên điện thoại;
 *  - công thức hiện thô (còn dấu $ hoặc lệnh \frac…) vì không đi qua KaTeX;
 *  - công thức KaTeX báo lỗi, hoặc gãy thành ba dòng trở lên;
 *  - nút, đường dẫn bị thanh cố định che mất;
 *  - nút không có tên cho trình đọc màn hình.
 *
 * Chạy: npm run build && npm run test:ui          (mẫu: mỗi chương một bài)
 *       npm run test:ui -- --full                 (mọi bài lớp 1–12)
 *       npm run test:ui -- --report ui-report.md  (ghi báo cáo Markdown)
 *       BASE_URL=http://127.0.0.1:43991 npm run test:ui   (dùng máy chủ đang chạy)
 */
import { spawn, type ChildProcess } from "node:child_process";
import { writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { cards } from "../src/content/cards.ts";
import { gradeBooks } from "../src/content/grades/index.ts";
import { sciences } from "../src/science/catalog.ts";

type Finding = { rule: string; where: string; detail: string };
type Shape = { name: string; width: number; height: number; mobile: boolean };

const require = createRequire(import.meta.url);
function loadPlaywright(): typeof import("playwright") {
  for (const id of ["playwright", "/opt/node-tools/node_modules/playwright"]) {
    try { return require(id) as typeof import("playwright"); } catch { /* thử nơi kế tiếp */ }
  }
  throw new Error("Chưa cài Playwright. Chạy: npm i -D playwright && npx playwright install chromium");
}

const args = process.argv.slice(2);
const FULL = args.includes("--full");
const reportAt = args.indexOf("--report");
const REPORT = reportAt >= 0 ? args[reportAt + 1] : undefined;
const PORT = 43991;
const BASE = process.env.BASE_URL ?? `http://127.0.0.1:${PORT}`;

const PHONE: Shape = { name: "điện thoại", width: 390, height: 844, mobile: true };
const DESKTOP: Shape = { name: "máy tính", width: 1280, height: 800, mobile: false };

const STATIC = [
  "/", "/kien-thuc", "/so-cong-thuc", "/phuong-phap", "/khoa-hoc", "/nghien-cuu", "/luyen", "/luyen-lop", "/luyen-lop/3",
  "/luyen-thpt", "/thi-thu", "/so-loi", "/on-loi-sai", "/danh-gia", "/soan-tai-lieu", "/xuong-hinh", "/may-tinh", "/tai-lieu",
  "/nang-cap", "/chinh-sach", "/gioi-thieu", "/du-lieu", "/phu-huynh",
];

function routes(): { path: string; shapes: Shape[] }[] {
  const out: { path: string; shapes: Shape[] }[] = STATIC.map((path) => ({ path, shapes: [PHONE, DESKTOP] }));
  for (const card of cards) {
    out.push({ path: `/t/${card.id}`, shapes: [PHONE, DESKTOP] });
    for (const tab of ["lam", "so", "nc"]) out.push({ path: `/t/${card.id}?tab=${tab}`, shapes: [PHONE] });
  }
  for (const area of sciences) out.push({ path: `/khoa-hoc/${area.id}`, shapes: [PHONE] });
  for (const book of gradeBooks) {
    out.push({ path: `/kien-thuc/${book.grade}`, shapes: [PHONE, DESKTOP] });
    for (const chapter of book.chapters) {
      const lessons = FULL ? chapter.lessons : chapter.lessons.slice(0, 1);
      for (const lesson of lessons) out.push({ path: `/kien-thuc/${book.grade}/${lesson.id}`, shapes: [PHONE] });
    }
  }
  return out;
}

async function waitForServer(url: string, ms: number): Promise<boolean> {
  const until = Date.now() + ms;
  while (Date.now() < until) {
    try { if ((await fetch(url)).ok) return true; } catch { /* chưa lên */ }
    await new Promise((done) => setTimeout(done, 300));
  }
  return false;
}

/** Chạy trong trang: trả về các lỗi nhìn thấy được. */
function inspect(mobile: boolean): { rule: string; detail: string }[] {
  const found: { rule: string; detail: string }[] = [];
  // Cuộn mượt làm phép đo chạy trước khi trang kịp cuộn; khi đo thì cuộn tức thời.
  document.documentElement.style.scrollBehavior = "auto";
  const say = (rule: string, detail: string) => { if (found.filter((f) => f.rule === rule).length < 4) found.push({ rule, detail: detail.replace(/\s+/g, " ").slice(0, 140) }); };
  const visible = (el: Element) => {
    const box = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    // checkVisibility còn loại phần nằm trong <details> đang đóng (content-visibility: hidden).
    const shown = typeof el.checkVisibility === "function" ? el.checkVisibility() : true;
    return shown && box.width > 0 && box.height > 0 && style.visibility !== "hidden" && style.display !== "none";
  };

  if (document.documentElement.scrollWidth > window.innerWidth + 1) {
    say("trang tràn ngang", `rộng ${document.documentElement.scrollWidth}px trên màn ${window.innerWidth}px`);
  }
  if (/[$\\]/.test(document.title)) say("tiêu đề trang còn ký hiệu thô", document.title);

  // Chữ hiện ra mà còn dấu $ hoặc lệnh TeX nghĩa là chưa đi qua KaTeX.
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const parent = node.parentElement;
    if (!parent || parent.closest(".katex, pre, code, script, style, textarea, noscript, [data-raw-math]")) continue;
    const text = node.nodeValue ?? "";
    if (!text.trim() || !visible(parent) || text.includes("$...$")) continue;
    if (/\$[^$\s][^$]*\$|\$\\|\\(?:d?frac|sqrt|cdot|times|le|ge|neq|vec|mathrm|text)\b|\^\{|_\{/.test(text)) say("công thức hiện thô, chưa qua KaTeX", text);
  }

  // Lời làm và lý do của một bước phải xếp trên dưới, không đứng cạnh nhau.
  for (const why of document.querySelectorAll<HTMLElement>(".step-why")) {
    const claim = why.previousElementSibling;
    if (!claim || !visible(why) || !visible(claim)) continue;
    if (why.getBoundingClientRect().top < claim.getBoundingClientRect().bottom - 4) say("lý do đứng cạnh bước giải thay vì nằm dưới", why.textContent ?? "");
  }
  for (const el of document.querySelectorAll(".katex-error")) say("KaTeX báo lỗi", el.textContent ?? "");
  for (const el of document.querySelectorAll<HTMLElement>(".katex")) {
    if (!visible(el) || el.closest(".katex-display")) continue;
    const lines = new Set([...el.getClientRects()].map((rect) => Math.round(rect.top / 4)));
    const tex = el.querySelector("annotation")?.textContent ?? el.textContent ?? "";
    if (lines.size >= 3) say("công thức gãy thành ba dòng trở lên", tex);
    // Gãy dòng trong một khối hẹp hơn nửa màn hình là dấu hiệu bị ép vào cột.
    const block = el.closest("li, td, p, span.step-why, div");
    const room = block ? block.getBoundingClientRect().width : window.innerWidth;
    if (lines.size >= 2 && room < window.innerWidth * 0.5) say("công thức bị ép vào cột hẹp", `${Math.round(room)}px: ${tex}`);
    const box = el.getBoundingClientRect();
    if (box.right > window.innerWidth + 2 && document.documentElement.scrollWidth <= window.innerWidth + 1) {
      say("công thức bị cắt ở mép phải", el.querySelector("annotation")?.textContent ?? "");
    }
  }

  const controls = [...document.querySelectorAll<HTMLElement>("button, a[href], input, select, textarea, [role=tab]")].filter(visible);
  for (const el of controls) {
    const name = (el.getAttribute("aria-label") ?? el.textContent ?? (el as HTMLInputElement).placeholder ?? el.getAttribute("title") ?? "").trim();
    const labelled = name || el.getAttribute("aria-labelledby") || (el.id && document.querySelector(`label[for="${el.id}"]`)) || el.closest("label") || el.querySelector("img[alt], svg[aria-label]");
    if (!labelled) say("nút hoặc ô nhập không có tên", el.outerHTML);
  }

  if (mobile) {
    const fixed = (el: Element | null): Element | null => {
      for (let at = el; at && at !== document.body; at = at.parentElement) {
        const position = getComputedStyle(at).position;
        if (position === "fixed" || position === "sticky") return at;
      }
      return null;
    };
    const covered = (el: HTMLElement): Element | null => {
      const box = el.getBoundingClientRect();
      if (box.height < 1 || box.bottom > window.innerHeight + 1 || box.top < 0) return null;
      const top = document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2);
      if (!top || el.contains(top) || top.contains(el)) return null;
      return fixed(top);
    };
    const report = (el: HTMLElement, cover: Element) => say("nút bị thanh cố định che", `${(el.textContent ?? "").trim().slice(0, 40) || el.tagName} bị che bởi .${String(cover.className).split(" ")[0]}`);
    // Đưa từng nút vào giữa màn hình: lúc đó không thanh nào được phép đè lên.
    for (const el of controls.slice(0, 80)) {
      if (fixed(el)) continue;
      el.scrollIntoView({ block: "center", inline: "nearest" });
      const cover = covered(el);
      if (cover) report(el, cover);
    }
    // Cuộn hết trang: những gì nằm cuối trang phải ló ra khỏi thanh đáy.
    window.scrollTo(0, document.documentElement.scrollHeight);
    for (const el of controls.slice(-12)) {
      // Chỉ xét nửa dưới màn hình: phần trên còn cuộn xuống được nên thanh đầu trang đè lên là bình thường.
      if (fixed(el) || el.getBoundingClientRect().top < window.innerHeight / 2) continue;
      const cover = covered(el);
      if (cover) report(el, cover);
    }
    // Bàn phím đưa tiêu điểm tới đâu thì chỗ đó không được nằm dưới thanh cố định.
    window.scrollTo(0, 0);
    for (const el of controls.slice(0, 40)) {
      if (fixed(el) || el.tabIndex < 0) continue;
      el.focus();
      if (document.activeElement !== el) continue;
      const cover = covered(el);
      if (cover) say("tiêu điểm bàn phím bị thanh cố định che", `${(el.textContent ?? "").trim().slice(0, 40) || el.tagName} bị che bởi .${String(cover.className).split(" ")[0]}`);
    }
    window.scrollTo(0, 0);
  }
  return found;
}

const findings: Finding[] = [];
let server: ChildProcess | undefined;
if (!(await waitForServer(BASE, 800))) {
  if (process.env.BASE_URL) throw new Error(`Không kết nối được ${BASE}`);
  server = spawn("npx", ["vite", "preview"], { stdio: "ignore", detached: true });
  if (!(await waitForServer(BASE, 30_000))) throw new Error("Máy chủ xem thử không khởi động được. Đã chạy npm run build chưa?");
}

const { chromium } = loadPlaywright();
const browser = await chromium.launch();
const list = routes();
let pages = 0;
try {
  for (const shape of [PHONE, DESKTOP]) {
    const context = await browser.newContext({
      viewport: { width: shape.width, height: shape.height }, isMobile: shape.mobile, hasTouch: shape.mobile, locale: "vi-VN",
      serviceWorkers: "block", reducedMotion: "reduce",
    });
    // tsx bọc hàm bằng __name khi biên dịch; trong trang không có hàm đó nên phải khai trước.
    await context.addInitScript("globalThis.__name = (fn) => fn; try { localStorage.setItem('bt-grade', '10'); } catch {}");
    const page = await context.newPage();
    let errors: string[] = [];
    page.on("pageerror", (error: Error) => errors.push(error.message));
    page.on("console", (message: { type(): string; text(): string }) => {
      if (message.type() === "error" && !/favicon|Failed to load resource|net::ERR/.test(message.text())) errors.push(message.text());
    });
    for (const route of list) {
      if (!route.shapes.includes(shape)) continue;
      errors = [];
      const where = `${route.path} (${shape.name})`;
      try {
        await page.goto(BASE + route.path, { waitUntil: "load", timeout: 30_000 });
        await page.waitForSelector("#content, main", { timeout: 15_000 });
        await page.waitForTimeout(350);
        // Mở các phần ẩn sau nút để đo cả lời giải: hiện bước, gợi ý, lời giải, đáp án.
        await page.evaluate(() => {
          const reveal = /^(Hiện bước|Bước tiếp|Gợi ý|Lời giải|Xem đáp án|Xem lời giải)/;
          for (let round = 0; round < 4; round += 1) {
            for (const button of document.querySelectorAll<HTMLButtonElement>("button")) {
              if (!button.disabled && reveal.test((button.textContent ?? "").trim())) button.click();
            }
          }
        });
        await page.waitForTimeout(150);
        for (const item of await page.evaluate(inspect, shape.mobile)) findings.push({ ...item, where });
      } catch (error) {
        findings.push({ rule: "trang không mở được", where, detail: (String(error).split("\n")[0] ?? "").slice(0, 140) });
      }
      for (const text of errors.slice(0, 3)) findings.push({ rule: "lỗi console", where, detail: text.slice(0, 140) });
      pages += 1;
    }
    await context.close();
  }
} finally {
  await browser.close();
  if (server?.pid) { try { process.kill(-server.pid); } catch { /* đã tắt */ } }
}

const byRule = new Map<string, Finding[]>();
for (const item of findings) byRule.set(item.rule, [...(byRule.get(item.rule) ?? []), item]);
const lines: string[] = [`# Kiểm tra giao diện tự động`, ``, `${pages} lượt mở trang, ${findings.length} lỗi${FULL ? " (đủ mọi bài)" : " (mẫu)"}.`, ``];
for (const [rule, items] of [...byRule].sort((a, b) => b[1].length - a[1].length)) {
  lines.push(`## ${rule} (${items.length})`, ``);
  for (const item of items.slice(0, 25)) lines.push(`- \`${item.where}\`: ${item.detail}`);
  if (items.length > 25) lines.push(`- … và ${items.length - 25} chỗ nữa`);
  lines.push(``);
}
if (REPORT) writeFileSync(REPORT, lines.join("\n"));
if (findings.length) {
  console.error(lines.join("\n"));
  process.exit(1);
}
console.log(`ui ok: ${pages} lượt mở trang, không có lỗi`);
