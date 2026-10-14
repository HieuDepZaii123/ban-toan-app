import type { Lang } from "../lib/math.ts";
import { setLang, setTheme, useSlice } from "../lib/store.ts";
import { t } from "../lib/text.ts";

export function Prefs() {
  const theme = useSlice((data) => data.theme);
  const lang = useSlice((data) => data.lang);
  return (
    <div className="prefs">
      <button
        type="button"
        aria-pressed={theme === "night"}
        onClick={() => setTheme(theme === "night" ? "paper" : "night")}
      >
        {theme === "night" ? t(lang, "Đêm", "Night") : t(lang, "Giấy", "Paper")}
      </button>
      <div className="seg" role="group" aria-label={t(lang, "Ngôn ngữ", "Language")}>
        <button type="button" aria-pressed={lang === "vi"} onClick={() => setLang("vi")}>
          VI
        </button>
        <button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")}>
          EN
        </button>
      </div>
    </div>
  );
}

export function useLang(): Lang {
  return useSlice((data) => data.lang);
}
