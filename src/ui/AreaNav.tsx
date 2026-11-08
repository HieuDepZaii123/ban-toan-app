import { A } from "../lib/route.tsx";
import { t } from "../lib/text.ts";
import { useRoute } from "../lib/useRoute.ts";
import { NAV_GROUPS, locate } from "./navLinks.ts";
import { useLang } from "./useLang.ts";

/** Tab nhóm trên thanh đầu trang và hàng trang con của nhóm đang mở. */
export function AreaNav() {
  const { path } = useRoute();
  const lang = useLang();
  const here = locate(path);
  const top = NAV_GROUPS.filter((group) => group.top);
  return (
    <>
      <nav className="area-nav" aria-label={t(lang, "Khu vực", "Sections")}>
        {top.map((group) => (
          <A key={group.id} href={group.pages[0]?.href ?? "/"} aria-current={here?.group.id === group.id ? "true" : undefined}>
            {t(lang, group.label, group.en)}
          </A>
        ))}
      </nav>
      {here && here.group.pages.length > 1 ? (
        <nav className="sub-nav" aria-label={t(lang, `Trong mục ${here.group.label}`, `In ${here.group.en}`)}>
          {here.group.pages.map((page) => (
            <A key={page.id} href={page.href} aria-current={here.page.id === page.id ? "page" : undefined}>
              {t(lang, page.label, page.en)}
            </A>
          ))}
        </nav>
      ) : null}
    </>
  );
}
