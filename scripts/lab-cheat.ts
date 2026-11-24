/**
 * Không ăn gian tiến độ thử thách: mở lab rồi bấm "Kiểm tra" ngay, ở trạng thái mặc định hoặc ngay sau khi chọn đề,
 * thì bộ đếm "đã giải" phải vẫn bằng 0. Cần máy chủ xem thử đang chạy ở BASE (mặc định http://127.0.0.1:4173).
 * Chạy: tsx scripts/lab-cheat.ts
 */
import { chromium } from "playwright";
import { allLabSpecs } from "../src/content/labSpecs.ts";

const BASE = process.env.BASE ?? "http://127.0.0.1:4173";
const fails: string[] = [];
const browser = await chromium.launch();

for (const [topic, spec] of Object.entries(allLabSpecs)) {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(`${BASE}/t/${topic}?tab=tn`, { waitUntil: "networkidle" });
  await page.locator(".challenge").waitFor({ timeout: 15000 });
  const count = async (): Promise<string> => (await page.locator(".challenge-count").innerText()).trim();
  const total = spec.challenges.length;
  const none = `0/${total}`;

  const press = async (): Promise<void> => {
    const opt = page.locator(".challenge-guess .chips button").first();
    if (await opt.count()) await opt.click();
    const button = page.locator(".challenge-actions button.play").first();
    if (!(await button.isDisabled())) await button.click();
    await page.waitForTimeout(80);
  };

  // 1. Bấm Kiểm tra ngay khi mở trang, chưa đặt đề.
  await press();
  if ((await count()) !== none) fails.push(`${topic}: bấm Kiểm tra ngay khi mở trang đã được tính`);

  // 2. Chọn từng đề rồi bấm Kiểm tra mà chưa làm gì.
  const chips = page.locator('.challenge [role=group] button');
  const n = Math.min(await chips.count(), total);
  for (let i = 0; i < n; i += 1) {
    await chips.nth(i).click();
    await press();
    if ((await count()) !== none) fails.push(`${topic}: đề ${i + 1} được tính khi chưa làm gì`);
  }

  // 3. Hoàn tác phải dùng được ngay sau khi kéo, không phải chờ bộ trễ ghi lịch sử (thử trên trang mới, chưa có lịch sử).
  const fresh = await context.newPage();
  await fresh.goto(`${BASE}/t/${topic}?tab=tn`, { waitUntil: "networkidle" });
  await fresh.locator(".lab-main").waitFor({ timeout: 15000 });
  const slider = fresh.locator(".lab-main input[type=range]").first();
  if (await slider.count()) {
    await slider.focus();
    const before = await slider.inputValue();
    await fresh.keyboard.press("ArrowRight");
    // Thanh trượt đang ở mút phải thì ArrowRight không đổi gì: đi ngược lại.
    if ((await slider.inputValue()) === before) await fresh.keyboard.press("ArrowLeft");
    const undo = fresh.getByRole("button", { name: /Hoàn tác|Undo/ }).first();
    if (await undo.isDisabled()) fails.push(`${topic}: nút Hoàn tác còn bị khóa ngay sau khi kéo thanh trượt`);
  }
  await context.close();
}
await browser.close();

if (fails.length) {
  console.error(fails.join("\n"));
  console.error(`lab-cheat: ${fails.length} lỗi`);
  process.exit(1);
}
console.log(`lab-cheat ok: ${Object.keys(allLabSpecs).length} lab, không đề nào tự đạt`);
