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
        <span>{t(lang, "Tiến độ nằm trên máy này; câu hỏi gửi trợ lý thì rời máy. Sau lần mở đầu, bàn vẫn dùng được khi mất mạng.", "Progress stays on this device; questions sent to the tutor leave it. After the first load, the desk works offline.")}</span>
      </p>
      <nav aria-label={t(lang, "Trang khác", "More pages")}>
        {more.map((page) => (
          <A key={page.id} href={page.href}>{t(lang, page.label, page.en)}</A>
        ))}
      </nav>
    </footer>
  );
}
