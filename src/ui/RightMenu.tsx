import { useEffect, useId, useRef, useState } from "react";
import { A } from "../lib/route.tsx";
import { t } from "../lib/text.ts";
import { useRoute } from "../lib/useRoute.ts";
import { LangSwitch } from "./LangSwitch.tsx";
import { MENU_LINKS, menuArea } from "./navLinks.ts";
import { useLang } from "./useLang.ts";

const FOCUSABLE = "a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])";

export function RightMenu() {
  const { path } = useRoute();
  const lang = useLang();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const current = menuArea(path);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : openerRef.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const nodes = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)];
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      returnFocus?.focus();
    };
  }, [open]);

  const close = () => setOpen(false);

  const openMusic = () => {
    setOpen(false);
    window.setTimeout(() => {
      const player = document.getElementById("nhac-hoc");
      player?.scrollIntoView({ block: "nearest" });
      document.getElementById("nhac-phat")?.focus();
    }, 0);
  };

  return (
    <>
      {open ? null : (
        <button
          ref={openerRef}
          type="button"
          className="menu-tab"
          aria-expanded={false}
          aria-controls="side-menu"
          onClick={() => setOpen(true)}
        >
          {t(lang, "Mục lục", "Menu")}
        </button>
      )}
      {open ? (
        <div className="menu-layer">
          <button type="button" className="menu-backdrop" aria-label={t(lang, "Đóng menu", "Close menu")} onClick={close} />
          <nav
            ref={panelRef}
            id="side-menu"
            className="menu-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
          >
            <div className="menu-head">
              <b id={titleId}>{t(lang, "Mục lục", "Menu")}</b>
              <button type="button" className="text-btn" onClick={close}>{t(lang, "Đóng", "Close")}</button>
            </div>
            <div className="menu-lang">
              <LangSwitch />
            </div>
            <ul>
              {MENU_LINKS.map((item) => (
                <li key={item.id}>
                  <A
                    href={item.href}
                    aria-current={current === item.id ? "page" : undefined}
                    onClick={close}
                  >
                    {t(lang, item.label, item.en)}
                  </A>
                </li>
              ))}
              <li>
                <button type="button" onClick={openMusic}>{t(lang, "Nhạc học", "Study music")}</button>
              </li>
            </ul>
          </nav>
        </div>
      ) : null}
    </>
  );
}
