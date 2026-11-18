/**
 * Kiến trúc thông tin: ngân sách điều hướng và lối vào. Chạy: tsx scripts/ia.test.ts
 *  - tối đa 4 nhóm trên thanh đầu trang, mỗi nhóm không quá 5 trang;
 *  - không trang nào nằm ở hai nhóm;
 *  - lab và bài tư duy có lối vào ở thanh điều hướng.
 */
import { NAV_GROUPS, MENU_LINKS } from "../src/ui/navLinks.ts";

const fails: string[] = [];
const top = NAV_GROUPS.filter((group) => group.top);
if (top.length > 4) fails.push(`có ${top.length} nhóm trên thanh đầu trang, tối đa 4`);
for (const group of top) {
  if (group.pages.length > 5) fails.push(`nhóm ${group.id} có ${group.pages.length} trang, tối đa 5`);
  if (group.pages.length < 2) fails.push(`nhóm ${group.id} chỉ có ${group.pages.length} trang`);
}
const seen = new Map<string, string>();
for (const group of NAV_GROUPS) {
  for (const page of group.pages) {
    const prev = seen.get(page.href);
    if (prev) fails.push(`${page.href} nằm ở cả ${prev} và ${group.id}`);
    seen.set(page.href, group.id);
  }
}
for (const href of ["/thi-nghiem", "/tu-duy", "/phuong-phap", "/so-cong-thuc"]) {
  if (!MENU_LINKS.some((link) => link.href === href)) fails.push(`${href} chưa có lối vào trong điều hướng`);
}
for (const link of MENU_LINKS) {
  if (!link.label || !link.en) fails.push(`${link.href} thiếu nhãn một ngôn ngữ`);
  if (link.label === link.en && !/^[A-Za-z]+$/.test(link.label)) fails.push(`${link.href}: nhãn Việt và Anh giống hệt nhau`);
}
if (fails.length) {
  console.error(fails.map((line) => `  - ${line}`).join("\n"));
  console.error(`ia: ${fails.length} lỗi`);
  process.exit(1);
}
console.log(`ia ok: ${top.length} nhóm trên thanh đầu, ${MENU_LINKS.length} trang trong Mục lục`);
