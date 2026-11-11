import { useEffect, useState } from "react";
import { speakable } from "../lib/speakable.ts";
import { t } from "../lib/text.ts";
import { useLang } from "./useLang.ts";

/**
 * Nút Đọc to: đọc một đoạn bằng giọng đọc có sẵn của trình duyệt (không gửi gì ra ngoài).
 * `speech` là ngôn ngữ của chính đoạn chữ: bài lớp 1–12 viết bằng tiếng Việt nên luôn đọc giọng Việt.
 * Máy không có giọng đọc thì nút không hiện.
 */
export function Speak({ text, speech = "vi" }: { text: string; speech?: "vi" | "en" }) {
  const lang = useLang();
  const [on, setOn] = useState(false);
  const can = typeof window !== "undefined" && "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";

  useEffect(() => () => {
    if (on) window.speechSynthesis.cancel();
  }, [on]);

  if (!can) return null;
  return (
    <button
      type="button"
      className="text-btn speak-btn"
      aria-pressed={on}
      onClick={() => {
        const synth = window.speechSynthesis;
        synth.cancel();
        if (on) {
          setOn(false);
          return;
        }
        const say = new SpeechSynthesisUtterance(speakable(text, speech));
        say.lang = speech === "en" ? "en-GB" : "vi-VN";
        say.rate = 0.9;
        say.onend = () => setOn(false);
        say.onerror = () => setOn(false);
        setOn(true);
        synth.speak(say);
      }}
    >
      <span aria-hidden="true" className="speak-icon">{on ? "■" : "▶"}</span>
      {on ? t(lang, "Dừng đọc", "Stop reading") : t(lang, "Đọc to", "Read aloud")}
    </button>
  );
}
