#!/usr/bin/env node
/**
 * Drive the running Bàn Toán dev server in headless Chromium and screenshot each page.
 *
 *   node .claude/skills/run-ban-toan/drive.cjs [--lang vi|en] [--out DIR] [--base URL] PATH...
 *   (screenshots default to $TMPDIR/ban-toan-shots, outside the repo)
 *
 * Example:
 *   node .claude/skills/run-ban-toan/drive.cjs --lang en /kien-thuc/9 /cham-bai
 *
 * For each path it prints one JSON line: { path, title, h1, kicker, errors, shot }.
 * `errors` collects page errors and console errors seen while that page loaded.
 * Exits 1 if any page threw or had no <h1>.
 */
const { chromium } = require("playwright");
const { mkdirSync } = require("node:fs");
const { join } = require("node:path");
const { tmpdir } = require("node:os");

const args = process.argv.slice(2);
let lang = "vi";
let out = join(tmpdir(), "ban-toan-shots");
let base = "http://127.0.0.1:43123";
const paths = [];
for (let i = 0; i < args.length; i += 1) {
  if (args[i] === "--lang") lang = args[++i];
  else if (args[i] === "--out") out = args[++i];
  else if (args[i] === "--base") base = args[++i];
  else paths.push(args[i]);
}
if (paths.length === 0) paths.push("/");
mkdirSync(out, { recursive: true });

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 420, height: 900 }, deviceScaleFactor: 1 });
  let errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  // The language lives in the app's own store (localStorage "ban-toan"); the reliable way to set it
  // is the UI: header button "Tùy chọn" (vi) / "Settings" (en), then "English" / "Tiếng Việt".
  await page.goto(`${base}/`);
  await page.getByRole("button", { name: /^(Tùy chọn|Settings)$/ }).click();
  await page.getByRole("button", { name: lang === "en" ? "English" : "Tiếng Việt" }).click();

  let failed = false;
  for (const path of paths) {
    errors = [];
    await page.goto(`${base}${path}`);
    // Routes are lazy chunks; the first visit compiles on demand, so wait for the heading, not a timer.
    const h1 = await page.locator("h1").first().innerText({ timeout: 30_000 }).catch(() => "");
    const kicker = await page.locator(".kicker").first().innerText({ timeout: 1_000 }).catch(() => "");
    const shot = join(out, `${path.replace(/[^a-z0-9]+/gi, "_").replace(/^_|_$/g, "") || "home"}-${lang}.png`);
    await page.screenshot({ path: shot, fullPage: true });
    const row = { path, title: await page.title(), h1: h1.replace(/\s+/g, " ").trim(), kicker: kicker.replace(/\s+/g, " ").trim(), errors, shot };
    if (!row.h1 || errors.length > 0) failed = true;
    console.log(JSON.stringify(row));
  }
  await browser.close();
  process.exit(failed ? 1 : 0);
})();
