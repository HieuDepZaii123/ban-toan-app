// Smoke driver for Bàn Toán: opens a topic's "Suy từ số 0" figures, drives one slider, screenshots, checks console errors.
// Usage: npm run drive -- [topicId=trig] [lang=vi|en] [outDir=/tmp/ban-toan-shots]
// Needs the dev server (npm run dev) and Playwright with Chromium. BASE_URL overrides http://127.0.0.1:43123.
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
let chromium;
try {
  ({ chromium } = createRequire(import.meta.url)("playwright"));
} catch {
  console.error("Playwright is missing. Install it with: npm i -D playwright && npx playwright install chromium");
  process.exit(2);
}
const [topic = "trig", lang = "vi", out = "/tmp/ban-toan-shots"] = process.argv.slice(2);
const base = process.env.BASE_URL ?? "http://127.0.0.1:43123";
mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1100, height: 900 }, deviceScaleFactor: 1 });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
await page.addInitScript((l) => { try { localStorage.setItem("ban-toan", JSON.stringify({ v: 1, lang: l, at: { lang: Date.now() } })); } catch {} }, lang);
await page.goto(`${base}/t/${topic}?tab=hoc`, { waitUntil: "domcontentloaded" });
await page.waitForSelector(".fz-card", { timeout: 30000 }); // lazy section module
const heading = await page.locator(".fz h2").first().textContent();
await page.waitForTimeout(1500);
const cards = await page.locator(".fz-card").count();
const nodes = await page.locator(".fz-node").count();
// Drive one real control: move the first slider of the first figure and check its canvas repainted.
const card = page.locator(".fz-card").first();
const canvas = card.locator("canvas").first();
const before = await canvas.evaluate((c) => c.toDataURL().length);
const slider = card.locator('input[type="range"]').first();
if (await slider.count()) {
  // fill() goes through Playwright's input pipeline, so React's onChange fires (plain el.value = ... would not).
  const lo = await slider.getAttribute("min"), hi = await slider.getAttribute("max"), now = await slider.inputValue();
  await slider.fill(now === lo ? hi : lo);
  await page.waitForTimeout(400);
}
const after = await canvas.evaluate((c) => c.toDataURL().length);
await card.scrollIntoViewIfNeeded();
await card.screenshot({ path: `${out}/${topic}-${lang}-figure.png` });
await page.screenshot({ path: `${out}/${topic}-${lang}-page.png`, fullPage: false });
console.log(JSON.stringify({ topic, lang, heading, cards, mapNodes: nodes, canvasChanged: before !== after, errors }, null, 2));
await browser.close();
process.exit(errors.length || cards === 0 ? 1 : 0);
