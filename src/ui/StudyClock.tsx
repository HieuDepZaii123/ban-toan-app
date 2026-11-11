import { useEffect, useState } from "react";
import { checkPin, grantExtra, limitReached, PARENT_EVENT, readParent } from "../lib/parent.ts";
import { addTime, todaySeconds } from "../lib/studyTime.ts";
import { t } from "../lib/text.ts";
import { readPref } from "./prefs.ts";
import { useLang } from "./useLang.ts";

const TICK = 15;

/** Số phút học liền thì nhắc nghỉ mắt. 0 là tắt; mặc định 25. */
function breakMinutes(): number {
  const raw = readPref("bt-break");
  if (raw === "off") return 0;
  return raw === "20" || raw === "45" ? Number(raw) : 25;
}

/**
 * Đồng hồ học chạy ngầm trên mọi trang: cộng thời gian học của ngày, nhắc nghỉ mắt sau một quãng học liền,
 * và khi phụ huynh có đặt giới hạn thì khóa màn hình lúc hết giờ (phụ huynh nhập PIN để cho thêm).
 */
export function StudyClock() {
  const lang = useLang();
  const [breakDue, setBreakDue] = useState(false);
  const [locked, setLocked] = useState(() => limitReached(todaySeconds()));
  const [pin, setPin] = useState("");
  const [wrong, setWrong] = useState(false);

  useEffect(() => {
    let lastActive = Date.now();
    let run = 0;
    const touch = () => {
      lastActive = Date.now();
    };
    const names = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
    for (const name of names) window.addEventListener(name, touch, { passive: true });
    const id = window.setInterval(() => {
      const idle = Date.now() - lastActive;
      if (idle > 5 * 60_000) run = 0;
      if (document.visibilityState !== "visible" || idle > 90_000) return;
      const book = addTime(TICK);
      run += TICK;
      const every = breakMinutes();
      if (every > 0 && run >= every * 60) {
        run = 0;
        setBreakDue(true);
      }
      setLocked(limitReached(todaySeconds(book)));
    }, TICK * 1000);
    const onParent = () => setLocked(limitReached(todaySeconds()));
    window.addEventListener(PARENT_EVENT, onParent);
    return () => {
      window.clearInterval(id);
      window.removeEventListener(PARENT_EVENT, onParent);
      for (const name of names) window.removeEventListener(name, touch);
    };
  }, []);

  if (locked) {
    const limit = readParent().limitMin;
    return (
      <div className="time-lock" role="dialog" aria-modal="true" aria-labelledby="time-lock-title">
        <div className="time-lock-card">
          <h2 id="time-lock-title">{t(lang, "Hôm nay học đủ rồi", "That is enough for today")}</h2>
          <p>{t(lang, `Phụ huynh đặt giới hạn ${limit} phút mỗi ngày trên máy này. Nghỉ ngơi nhé, mai mình học tiếp.`, `A parent set a limit of ${limit} minutes a day on this device. Take a rest; we continue tomorrow.`)}</p>
          <form
            className="data-row"
            onSubmit={(event) => {
              event.preventDefault();
              void checkPin(pin).then((ok) => {
                setWrong(!ok);
                setPin("");
                if (ok) grantExtra(15);
              });
            }}
          >
            <label>
              <span>{t(lang, "Phụ huynh: nhập mã PIN để cho thêm 15 phút", "Parents: enter the PIN to allow 15 more minutes")}</span>
              <input type="password" inputMode="numeric" autoComplete="off" value={pin} onChange={(event) => setPin(event.target.value)} />
            </label>
            <button type="submit" className="text-btn" disabled={pin === ""}>{t(lang, "Cho thêm 15 phút", "Allow 15 minutes")}</button>
          </form>
          {wrong ? <p className="ask-miss" role="status">{t(lang, "Mã PIN chưa đúng.", "That PIN is not right.")}</p> : null}
        </div>
      </div>
    );
  }

  if (!breakDue) return null;
  return (
    <div className="break-note" role="status">
      <span>
        {t(lang, "Bạn đã học liền một quãng dài. Nghỉ mắt 20 giây: nhìn ra xa khoảng 6 mét, rồi đứng dậy vươn vai.", "You have studied for a good stretch. Rest your eyes for 20 seconds: look at something about 6 metres away, then stand up and stretch.")}
      </span>
      <button type="button" className="text-btn" onClick={() => setBreakDue(false)}>{t(lang, "Đã nghỉ", "Done")}</button>
    </div>
  );
}
