/**
 * Quét mọi lab: mỗi cảnh, mỗi thanh trượt kéo tới đầu, giữa và cuối, rồi xem MỌI chuỗi lab hiện ra.
 * Bắt lỗi ký hiệu kiểu biên mà mẫu thử tay bỏ sót:
 *  - KaTeX báo lỗi;
 *  - ký tự toán Unicode (√ − × ≤ ≥ ² …) hiện thô, chưa thành lệnh KaTeX;
 *  - dấu $ hoặc lệnh TeX hiện thô;
 *  - phân số viết a/b trong công thức, số thập phân dùng dấu chấm.
 *
 * Chạy: npm run build && npm run test:labs        (BASE_URL=... để dùng máy chủ đang chạy)
 */
import { spawn, type ChildProcess } from "node:child_process";
import { createRequire } from "node:module";
import { cards } from "../src/content/cards.ts";
import { allLabSpecs } from "../src/content/labSpecs.ts";

const require = createRequire(import.meta.url);
function loadPlaywright(): typeof import("playwright") {
  for (const id of ["playwright", "/opt/node-tools/node_modules/playwright"]) {
    try { return require(id) as typeof import("playwright"); } catch { /* thử nơi kế tiếp */ }
  }
  throw new Error("Chưa cài Playwright. Chạy: npm i -D playwright && npx playwright install chromium");
}

const PORT = 43992;
const BASE = process.env.BASE_URL ?? `http://127.0.0.1:${PORT}`;

async function waitForServer(url: string, ms: number): Promise<boolean> {
  const until = Date.now() + ms;
  while (Date.now() < until) {
    try { if ((await fetch(url)).ok) return true; } catch { /* chưa lên */ }
    await new Promise((done) => setTimeout(done, 300));
  }
  return false;
}

type Finding = { lab: string; where: string; rule: string; detail: string };
const findings: Finding[] = [];
const seen = new Set<string>();

function inspect(): { rule: string; detail: string }[] {
  const out: { rule: string; detail: string }[] = [];
  const stage = document.querySelector(".lab-main") ?? document.body;
  for (const el of stage.querySelectorAll(".katex-error")) out.push({ rule: "KaTeX báo lỗi", detail: el.textContent ?? "" });
  const walker = document.createTreeWalker(stage, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const parent = node.parentElement;
    if (!parent || parent.closest(".katex, canvas, script, style")) continue;
    // Chữ chỉ dành cho trình đọc màn hình (ẩn khỏi mắt) được đọc thành tiếng, không phải ký hiệu in ra.
    const box = parent.getBoundingClientRect();
    if (parent.closest(".sr, .sr-only, [aria-live]") || box.width < 2 || box.height < 2) continue;
    const text = node.nodeValue ?? "";
    if (/[√×÷·≤≥≠≈∞π²³ˣⁿ₀-₉′∫Δ]|[−]\s*\d/.test(text)) out.push({ rule: "ký tự toán Unicode hiện thô", detail: text.trim().slice(0, 80) });
    if (/\$|\\(?:frac|sqrt|cdot|times|le|ge|vec|mathrm|text)\b/.test(text)) out.push({ rule: "công thức hiện thô", detail: text.trim().slice(0, 80) });
  }
  for (const a of stage.querySelectorAll(".katex annotation")) {
    const tex = a.textContent ?? "";
    if (/\d\s*\/\s*\d/.test(tex.replace(/\\frac\{[^}]*\}\{[^}]*\}/g, ""))) out.push({ rule: "phân số viết a/b", detail: tex.slice(0, 80) });
    if (/\d\.\d/.test(tex) && !/\\mathrm/.test(tex)) out.push({ rule: "số thập phân dùng dấu chấm", detail: tex.slice(0, 80) });
    if (/\\\s*[;,]\s*\\\$|\$\s*[;,]\s*\$/.test(tex)) out.push({ rule: "công thức gãy dấu phân cách", detail: tex.slice(0, 80) });
  }
  return out;
}

let server: ChildProcess | undefined;
if (!(await waitForServer(BASE, 800))) {
  if (process.env.BASE_URL) throw new Error(`Không kết nối được ${BASE}`);
  server = spawn("npx", ["vite", "preview", "--port", String(PORT)], { stdio: "ignore", detached: true });
  if (!(await waitForServer(BASE, 30_000))) throw new Error("Máy chủ xem thử không khởi động được. Đã chạy npm run build chưa?");
}

const { chromium } = loadPlaywright();
const browser = await chromium.launch();
let states = 0;
try {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, locale: "vi-VN" });
  const page = await context.newPage();
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  for (const card of cards.filter((c) => allLabSpecs[c.id])) {
    await page.goto(`${BASE}/t/${card.id}?tab=tn`);
    await page.waitForSelector(".lab-main .stage");
    const scenes = await page.locator(".lab-main .stage-bar .chips button").count();
    for (let scene = 0; scene < Math.max(scenes, 1); scene += 1) {
      if (scenes) await page.locator(".lab-main .stage-bar .chips button").nth(scene).click();
      await page.waitForTimeout(150);
      const sliders = await page.locator(".lab-main .stage input[type=range]").count();
      for (let s = 0; s < sliders; s += 1) {
        for (const at of [0, 0.25, 0.5, 0.75, 1]) {
          await page.locator(".lab-main .stage input[type=range]").nth(s).evaluate((el, f) => {
            const input = el as HTMLInputElement;
            const min = Number(input.min);
            const max = Number(input.max);
            const step = Number(input.step) || 1;
            const raw = min + (max - min) * f;
            const snapped = Math.round(raw / step) * step;
            const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
            setter?.call(input, String(Math.min(max, Math.max(min, snapped))));
            input.dispatchEvent(new Event("input", { bubbles: true }));
          }, at);
          await page.waitForTimeout(40);
          states += 1;
          for (const f of await page.evaluate(inspect)) {
            const key = `${card.id}|${f.rule}|${f.detail}`;
            if (seen.has(key)) continue;
            seen.add(key);
            findings.push({ lab: card.id, where: `cảnh ${scene + 1}, thanh trượt ${s + 1}, vị trí ${at}`, rule: f.rule, detail: f.detail });
          }
        }
      }
    }
  }
  for (const e of errors) findings.push({ lab: "-", where: "trang", rule: "lỗi script", detail: e.slice(0, 120) });
} finally {
  await browser.close();
  if (server?.pid) { try { process.kill(-server.pid); } catch { /* đã tắt */ } }
}

if (findings.length) {
  console.error(findings.slice(0, 60).map((f) => `- ${f.lab} (${f.where}) ${f.rule}: ${f.detail}`).join("\n"));
  console.error(`lab-sweep: ${findings.length} lỗi trong ${states} trạng thái`);
  process.exit(1);
}
console.log(`lab-sweep ok: ${states} trạng thái của ${Object.keys(allLabSpecs).length} lab, không lỗi ký hiệu`);
