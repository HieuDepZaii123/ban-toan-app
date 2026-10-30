import { useEffect, useState } from "react";
import { t } from "../lib/text.ts";
import { useLang } from "../ui/useLang.ts";

const START = 25 * 60;

export function FocusBar({ onExit }: { onExit: () => void }) {
  const lang = useLang();
  const [left, setLeft] = useState(START);
  const [run, setRun] = useState(true);

  useEffect(() => {
    if (!run) return;
    const id = window.setInterval(() => {
      setLeft((value) => (value > 0 ? value - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, [run]);

  const minute = String(Math.floor(left / 60)).padStart(2, "0");
  const second = String(left % 60).padStart(2, "0");
  return (
    <div className="focus-bar">
      <b>{t(lang, "Tập trung", "Focus")}</b>
      <span className="pay-clock">{minute}:{second}</span>
      <button type="button" className="text-btn" onClick={() => setRun((value) => !value)}>
        {run ? t(lang, "Tạm dừng", "Pause") : t(lang, "Tiếp tục", "Resume")}
      </button>
      <button type="button" className="text-btn" onClick={() => { setLeft(START); setRun(true); }}>
        {t(lang, "25 phút", "25 min")}
      </button>
      <button type="button" className="text-btn" onClick={onExit}>{t(lang, "Thoát", "Exit")}</button>
    </div>
  );
}
