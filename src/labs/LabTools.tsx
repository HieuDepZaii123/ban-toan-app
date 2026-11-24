import { useEffect, useMemo, useRef, useState } from "react";
import { allLabSpecs } from "../content/labSpecs.ts";
import { readParams, useSlice, writeParams } from "../lib/store.ts";
import { t } from "../lib/text.ts";
import { useLang } from "../ui/useLang.ts";
import { getLabSpeed, setLabSpeed } from "./clock.ts";
import { History, type Params } from "./history.ts";
import { encodeParams, sanitizeParams } from "./shared.ts";

type Saved = { name: string; params: Params; at: number };
type Row = { key: string; label: string; value: string; text: string };
type Snapshot = { params: Params; rows: Row[] };

const SAVED_KEY = "ban-toan:lab-saved";

function loadSaved(id: string): Saved[] {
  try {
    const raw = JSON.parse(window.localStorage.getItem(`${SAVED_KEY}:${id}`) ?? "[]") as unknown;
    if (!Array.isArray(raw)) return [];
    return raw
      .filter((item): item is Saved => !!item && typeof item === "object" && typeof (item as Saved).name === "string" && !!(item as Saved).params && typeof (item as Saved).params === "object" && !Array.isArray((item as Saved).params))
      .map((item) => ({ name: item.name.slice(0, 40), params: item.params, at: Number(item.at) || 0 }))
      .slice(0, 12);
  } catch {
    return [];
  }
}

function storeSaved(id: string, list: Saved[]): void {
  try {
    window.localStorage.setItem(`${SAVED_KEY}:${id}`, JSON.stringify(list));
  } catch {
    /* private window: the list stays on screen only */
  }
}

function scrape(main: Element | null): Row[] {
  if (!main) return [];
  return [...main.querySelectorAll(".readout > div")].flatMap((div) => {
    const dt = div.querySelector("dt");
    const dd = div.querySelector("dd");
    if (!dt || !dd) return [];
    return [{ key: dt.textContent ?? "", label: dt.innerHTML, value: dd.innerHTML, text: dd.textContent ?? "" }];
  });
}

function nudge(el: HTMLInputElement, dir: number, big: boolean): void {
  const step = Number(el.step) || 1;
  const min = el.min === "" ? -Infinity : Number(el.min);
  const max = el.max === "" ? Infinity : Number(el.max);
  const next = Math.min(max, Math.max(min, Number(el.value) + dir * step * (big ? 10 : 1)));
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
  setter?.call(el, String(Math.round(next * 1e6) / 1e6));
  el.dispatchEvent(new Event("input", { bubbles: true }));
}

/** Reset, undo and redo, share link, saved setups, keyboard and Play speed, and a side-by-side snapshot of the readouts. */
export function LabTools({ id, onPreset }: { id: string; onPreset: () => void }) {
  const lang = useLang();
  const spec = allLabSpecs[id];
  const stored = useSlice((data) => data.params[id]);
  const current = useMemo(() => (spec ? readParams(id, spec.init, spec.range) : {}), [id, spec, stored]);
  const rootRef = useRef<HTMLDivElement>(null);
  const hist = useRef<History>(new History(current));
  const lastRange = useRef<HTMLInputElement | null>(null);
  const [, bump] = useState(0);
  const [speed, setSpeed] = useState(getLabSpeed());
  const [status, setStatus] = useState("");
  const [keysOn, setKeysOnState] = useState<boolean>(() => {
    try {
      return window.localStorage.getItem("ban-toan:lab-keys") !== "off";
    } catch {
      return true;
    }
  });
  const keysOnRef = useRef(keysOn);
  const setKeysOn = (on: boolean) => {
    keysOnRef.current = on;
    setKeysOnState(on);
    try {
      window.localStorage.setItem("ban-toan:lab-keys", on ? "on" : "off");
    } catch {
      /* private window: the choice lasts until the page closes */
    }
  };
  const [shareUrl, setShareUrl] = useState("");
  const [saved, setSaved] = useState<Saved[]>(() => loadSaved(id));
  const [name, setName] = useState("");
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [rows, setRows] = useState<Row[]>([]);

  const main = () => rootRef.current?.parentElement?.querySelector(".lab-main") ?? null;

  useEffect(() => {
    hist.current = new History(readParams(id, spec?.init ?? {}, spec?.range ?? {}));
    setSaved(loadSaved(id));
    setSnapshot(null);
    setStatus("");
    setShareUrl("");
    bump((n) => n + 1);
  }, [id, spec]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (hist.current.record(current)) bump((n) => n + 1);
    }, 350);
    return () => window.clearTimeout(timer);
  }, [current]);

  const flush = () => {
    if (spec) hist.current.record(readParams(id, spec.init, spec.range));
  };
  const apply = (p: Params) => {
    writeParams(id, p);
    onPreset();
    bump((n) => n + 1);
  };
  const undo = () => {
    flush();
    const p = hist.current.undo();
    if (p) apply(p);
  };
  const redo = () => {
    flush();
    const p = hist.current.redo();
    if (p) apply(p);
  };
  const reset = () => {
    if (!spec) return;
    flush();
    hist.current.record({ ...spec.init });
    apply({ ...spec.init });
    setStatus(t(lang, "Đã đặt lại về ban đầu.", "Back to the starting setup."));
  };
  const actions = useRef({ undo, redo });
  useEffect(() => {
    actions.current = { undo, redo };
  });

  useEffect(() => {
    const onFocus = (event: FocusEvent) => {
      const el = event.target;
      if (el instanceof HTMLInputElement && el.type === "range" && main()?.contains(el)) lastRange.current = el;
    };
    const onKey = (event: KeyboardEvent) => {
      const el = event.target;
      if (!(el instanceof HTMLElement)) return;
      const singleKeysOn = keysOnRef.current;
      const typing = (el instanceof HTMLInputElement && el.type !== "range") || el instanceof HTMLTextAreaElement || el.isContentEditable;
      if (typing) return;
      const mod = event.ctrlKey || event.metaKey;
      const key = event.key.toLowerCase();
      if (mod && key === "z" && !event.shiftKey) {
        event.preventDefault();
        actions.current.undo();
      } else if (mod && (key === "y" || (key === "z" && event.shiftKey))) {
        event.preventDefault();
        actions.current.redo();
      } else if (!mod && !event.altKey && singleKeysOn) {
        const area = main();
        const onControl = el instanceof HTMLButtonElement || el instanceof HTMLAnchorElement || el instanceof HTMLInputElement || el instanceof HTMLSelectElement;
        if (event.key === " " && !onControl) {
          const play = area?.querySelector<HTMLButtonElement>(".play");
          if (play && !play.disabled) {
            event.preventDefault();
            play.click();
          }
        } else if (/^[1-4]$/.test(event.key) && !(el instanceof HTMLInputElement && el.type !== "range")) {
          const chip = area?.querySelectorAll<HTMLButtonElement>(".stage-bar .chips button")[Number(event.key) - 1];
          if (chip) {
            event.preventDefault();
            chip.click();
            chip.focus();
          }
        } else if ((event.key === "ArrowLeft" || event.key === "ArrowRight") && !(el instanceof HTMLInputElement) && !onControl) {
          const target = lastRange.current?.isConnected ? lastRange.current : area?.querySelector<HTMLInputElement>(".stage input[type=range]") ?? null;
          if (target) {
            event.preventDefault();
            nudge(target, event.key === "ArrowRight" ? 1 : -1, event.shiftKey);
          }
        }
      }
    };
    document.addEventListener("focusin", onFocus);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("keydown", onKey);
    };
  }, [id]);

  useEffect(() => {
    if (snapshot && snapshot.params.scene !== current.scene) {
      setSnapshot(null);
      setStatus(t(lang, "Đã đổi cảnh nên ảnh chụp cũ bị bỏ.", "The scene changed, so the old snapshot was dropped."));
    }
  }, [snapshot, current.scene, lang]);

  useEffect(() => {
    if (!snapshot) return;
    const area = main();
    if (!area) return;
    let frame = 0;
    const read = () => {
      frame = 0;
      const next = scrape(area);
      setRows((prev) => (JSON.stringify(prev) === JSON.stringify(next) ? prev : next));
    };
    read();
    const observer = new MutationObserver(() => {
      if (!frame) frame = requestAnimationFrame(read);
    });
    observer.observe(area, { subtree: true, childList: true, characterData: true });
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [snapshot, id]);

  if (!spec) return null;

  const share = async () => {
    const url = new URL(`/t/${id}`, window.location.origin);
    url.searchParams.set("tab", "tn");
    url.searchParams.set("p", encodeParams(current));
    setShareUrl(url.toString());
    try {
      await navigator.clipboard.writeText(url.toString());
      setStatus(t(lang, "Đã chép liên kết: ai mở sẽ thấy đúng cảnh và các giá trị này.", "Link copied: whoever opens it sees this exact scene and these values."));
    } catch {
      setStatus(t(lang, "Chưa chép được tự động. Hãy chép liên kết bên dưới.", "Could not copy automatically. Copy the link below."));
    }
  };
  const save = () => {
    const label = name.trim() || t(lang, `Cấu hình ${saved.length + 1}`, `Setup ${saved.length + 1}`);
    const next = [{ name: label.slice(0, 40), params: { ...current }, at: Date.now() }, ...saved].slice(0, 12);
    setSaved(next);
    storeSaved(id, next);
    setName("");
    setStatus(t(lang, `Đã lưu "${label}".`, `Saved "${label}".`));
  };
  const openSaved = (item: Saved) => {
    const clean = sanitizeParams(item.params, spec.init, spec.range);
    if (!clean) {
      setStatus(t(lang, "Cấu hình này bị hỏng nên đã bỏ khỏi danh sách.", "This saved setup is damaged, so it was removed from the list."));
      drop(item.at);
      return;
    }
    apply(clean);
    setStatus(t(lang, `Đã mở "${item.name}".`, `Opened "${item.name}".`));
  };
  const drop = (at: number) => {
    const next = saved.filter((item) => item.at !== at);
    setSaved(next);
    storeSaved(id, next);
  };
  const takeSnapshot = () => {
    setSnapshot({ params: { ...current }, rows: scrape(main()) });
    setStatus(t(lang, "Đã giữ ảnh chụp. Kéo thanh trượt để so sánh.", "Snapshot kept. Move the sliders to compare."));
  };
  const faster = (value: number) => {
    setLabSpeed(value);
    setSpeed(value);
  };

  const union = snapshot
    ? [...snapshot.rows.map((row) => row.key), ...rows.map((row) => row.key).filter((key) => !snapshot.rows.some((row) => row.key === key))]
    : [];

  return (
    <div className="lab-tools" ref={rootRef}>
      <div className="lab-tools-row" role="group" aria-label={t(lang, "Công cụ lab", "Lab tools")}>
        <button type="button" className="text-btn" onClick={undo} disabled={hist.current.past.length === 0}>{t(lang, "Hoàn tác", "Undo")}</button>
        <button type="button" className="text-btn" onClick={redo} disabled={hist.current.future.length === 0}>{t(lang, "Làm lại", "Redo")}</button>
        <button type="button" className="text-btn" onClick={reset}>{t(lang, "Đặt lại", "Reset")}</button>
        <button type="button" className="text-btn" onClick={() => void share()}>{t(lang, "Chia sẻ liên kết", "Share link")}</button>
        <button type="button" className="text-btn" onClick={takeSnapshot}>{t(lang, "Giữ ảnh chụp", "Keep snapshot")}</button>
      </div>
      <div className="lab-tools-row">
        <span className="lab-tools-label" id={`speed-${id}`}>{t(lang, "Tốc độ chạy", "Play speed")}</span>
        <div className="chips" role="group" aria-labelledby={`speed-${id}`}>
          {[0.5, 1, 2].map((value) => (
            <button key={value} type="button" aria-pressed={speed === value} onClick={() => faster(value)}>{value === 0.5 ? "0,5×" : `${value}×`}</button>
          ))}
        </div>
      </div>
      <div className="lab-tools-row">
        <input
          className="lab-name"
          type="text"
          value={name}
          maxLength={40}
          onChange={(event) => setName(event.target.value)}
          placeholder={t(lang, "Tên hoặc ghi chú cho cấu hình", "Name or note for this setup")}
          aria-label={t(lang, "Tên cấu hình", "Setup name")}
        />
        <button type="button" className="text-btn" onClick={save}>{t(lang, "Lưu cấu hình", "Save setup")}</button>
      </div>
      <p className="note lab-status" role="status" aria-live="polite">{status}</p>
      {shareUrl ? <input className="lab-share" readOnly value={shareUrl} aria-label={t(lang, "Liên kết chia sẻ", "Share link")} onFocus={(event) => event.currentTarget.select()} /> : null}
      {saved.length > 0 ? (
        <ul className="lab-saved" aria-label={t(lang, "Cấu hình đã lưu", "Saved setups")}>
          {saved.map((item) => (
            <li key={item.at}>
              <span>{item.name}</span>
              <button type="button" className="text-btn" onClick={() => openSaved(item)}>{t(lang, "Mở", "Open")}</button>
              <button type="button" className="text-btn" onClick={() => drop(item.at)} aria-label={t(lang, `Xóa ${item.name}`, `Delete ${item.name}`)}>{t(lang, "Xóa", "Delete")}</button>
            </li>
          ))}
        </ul>
      ) : null}
      {snapshot ? (
        <div className="lab-compare">
          <div className="lab-tools-row">
            <b>{t(lang, "So sánh với ảnh chụp", "Compare with the snapshot")}</b>
            <button type="button" className="text-btn" onClick={() => apply(snapshot.params)}>{t(lang, "Quay về ảnh chụp", "Go back to snapshot")}</button>
            <button type="button" className="text-btn" onClick={() => setSnapshot(null)}>{t(lang, "Bỏ ảnh chụp", "Drop snapshot")}</button>
          </div>
          <table className="cmp">
            <thead>
              <tr>
                <th scope="col"><span className="sr-only">{t(lang, "Đại lượng", "Quantity")}</span></th>
                <th scope="col">{t(lang, "Ảnh chụp", "Snapshot")}</th>
                <th scope="col">{t(lang, "Bây giờ", "Now")}</th>
              </tr>
            </thead>
            <tbody>
              {union.map((key) => {
                const before = snapshot.rows.find((row) => row.key === key);
                const now = rows.find((row) => row.key === key);
                const changed = (before?.text ?? "") !== (now?.text ?? "");
                const label = (before ?? now)?.label ?? "";
                return (
                  <tr key={key} className={changed ? "changed" : undefined}>
                    <th scope="row" dangerouslySetInnerHTML={{ __html: label }} />
                    <td>{before ? <span dangerouslySetInnerHTML={{ __html: before.value }} /> : "—"}</td>
                    <td>{now ? <span dangerouslySetInnerHTML={{ __html: now.value }} /> : "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
      <details className="lab-keys" open>
        <summary>{t(lang, "Phím tắt", "Keyboard shortcuts")}</summary>
        <label className="lab-keys-switch">
          <input type="checkbox" checked={keysOn} onChange={(event) => setKeysOn(event.target.checked)} />
          {t(lang, "Bật phím tắt một phím (dấu cách, 1 đến 4, mũi tên). Ctrl+Z và Ctrl+Y luôn dùng được.", "Turn on single-key shortcuts (space, 1 to 4, arrows). Ctrl+Z and Ctrl+Y always work.")}
        </label>
        <ul>
          <li>{t(lang, "Dấu cách: chạy hoặc dừng.", "Space: play or stop.")}</li>
          <li>{t(lang, "Phím 1 đến 4: chọn cảnh.", "Keys 1 to 4: pick a scene.")}</li>
          <li>{t(lang, "Mũi tên trái, phải: chỉnh thanh trượt vừa dùng. Giữ Shift để nhảy mười bước.", "Left and right arrows: adjust the slider you used last. Hold Shift for ten steps.")}</li>
          <li>{t(lang, "Ctrl+Z hoàn tác, Ctrl+Y làm lại.", "Ctrl+Z undoes, Ctrl+Y redoes.")}</li>
        </ul>
      </details>
    </div>
  );
}
