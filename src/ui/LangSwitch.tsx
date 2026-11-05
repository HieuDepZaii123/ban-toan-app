import { setLang } from "../lib/store.ts";
import { t } from "../lib/text.ts";
import { useLang } from "./useLang.ts";

export function LangSwitch() {
  const lang = useLang();
  return (
    <div className="lang-switch" role="group" aria-label={t(lang, "Ngôn ngữ", "Language")}>
      <button type="button" aria-pressed={lang === "vi"} onClick={() => setLang("vi")}>Tiếng Việt</button>
      <button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")}>English</button>
    </div>
  );
}
