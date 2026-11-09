import { A } from "../lib/route.tsx";
import { t } from "../lib/text.ts";
import { NAV_GROUPS } from "./navLinks.ts";
import { useLang } from "./useLang.ts";

/** Chân trang chung: tên, một dòng về dữ liệu, và các trang nhóm "Khác" (không có tab trên đầu trang). */
export function SiteFooter() {
  const lang = useLang();
  const more = NAV_GROUPS.find((group) => group.id === "more")?.pages ?? [];
  return (
    <footer className="site-foot">
      <p>
        <b>Bàn Toán</b>
        <span>{t(lang, "Số liệu nằm trên máy này. Sau lần mở đầu, bàn vẫn dùng được khi mất mạng.", "Your data stays on this device. After the first load, the desk works offline.")}</span>
      </p>
      <nav aria-label={t(lang, "Trang khác", "More pages")}>
        {more.map((page) => (
          <A key={page.id} href={page.href}>{t(lang, page.label, page.en)}</A>
        ))}
      </nav>
    </footer>
  );
}
