import { A } from "../lib/route.tsx";
import { t } from "../lib/text.ts";
import { useRoute } from "../lib/useRoute.ts";
import { openChat, openMenu } from "./events.ts";
import { locate } from "./navLinks.ts";
import { useLang } from "./useLang.ts";

const ICON = {
  learn: "M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5zM4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5",
  practice: "M4 20l1-5L16.5 3.5a2.1 2.1 0 0 1 3 3L8 18zM14 6l4 4",
  ask: "M4 5h16v11H9l-5 4z",
  menu: "M4 6h16M4 12h16M4 18h16",
} as const;

function Icon({ kind }: { kind: keyof typeof ICON }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={ICON[kind]} />
    </svg>
  );
}

/**
 * Thanh đáy trên điện thoại: bốn lối đi chính. Thanh là nền đặc và trang chừa sẵn chỗ cho nó,
 * nên không có gì nổi che đáp án hay lời giải. Trên màn hình rộng các nút này nằm ở đầu trang.
 */
export function Dock() {
  const lang = useLang();
  const { path } = useRoute();
  const group = locate(path)?.group.id;
  return (
    <nav className="dock" aria-label={t(lang, "Lối tắt", "Shortcuts")}>
      <A href="/" aria-current={group === "learn" ? "true" : undefined}>
        <Icon kind="learn" />
        <span>{t(lang, "Học", "Learn")}</span>
      </A>
      <A href="/luyen" aria-current={group === "practice" ? "true" : undefined}>
        <Icon kind="practice" />
        <span>{t(lang, "Luyện tập", "Practice")}</span>
      </A>
      <button type="button" onClick={openChat}>
        <Icon kind="ask" />
        <span>{t(lang, "Hỏi toán", "Ask")}</span>
      </button>
      <button type="button" onClick={openMenu}>
        <Icon kind="menu" />
        <span>{t(lang, "Mục lục", "Menu")}</span>
      </button>
    </nav>
  );
}
