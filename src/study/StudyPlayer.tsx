import { useEffect, useId, useRef, useState } from "react";
import { t } from "../lib/text.ts";
import { OPEN_MUSIC_EVENT } from "../ui/events.ts";
import { useLang } from "../ui/useLang.ts";
import { FALLBACK_MESSAGE, FALLBACK_MESSAGE_EN, STUDY_CATEGORIES, categoryById } from "./catalog.ts";
import { afterDelete, hideTrack, nextRepeat, pickNext, readHidden, readPrefs, restoreCategory, undoHide, visibleTracks, writeHidden, writePrefs, type HiddenBook, type RepeatMode } from "./logic.ts";

const OPEN_KEY = "bt-study-open";

export function StudyPlayer() {
  const lang = useLang();
  const panelId = useId();
  const [open, setOpenState] = useState(() => {
    try { return localStorage.getItem(OPEN_KEY) === "1"; } catch { return false; }
  });
  const setOpen = (next: boolean) => {
    setOpenState(next);
    try { localStorage.setItem(OPEN_KEY, next ? "1" : "0"); } catch { /* ignore */ }
  };
  const [seed] = useState(readPrefs);
  const [book, setBook] = useState<HiddenBook>(readHidden);
  const [categoryId, setCategoryId] = useState(seed.categoryId);
  const opening = visibleTracks(categoryById(seed.categoryId), book.ids);
  const [trackId, setTrackId] = useState(opening.some((item) => item.id === seed.trackId) ? seed.trackId : (opening[0]?.id ?? ""));
  const [volume, setVolume] = useState(seed.volume);
  const [shuffle, setShuffle] = useState(seed.shuffle);
  const [repeat, setRepeat] = useState<RepeatMode>(seed.repeat);
  const [playing, setPlaying] = useState(false);
  const [broken, setBroken] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const playingRef = useRef(false);
  const controls = useRef({ shuffle: seed.shuffle, repeat: seed.repeat, categoryId: seed.categoryId, trackId: seed.trackId, hidden: book.ids });

  const category = categoryById(categoryId);
  const playlist = visibleTracks(category, book.ids);
  const track = playlist.find((item) => item.id === trackId) ?? playlist[0] ?? null;

  useEffect(() => {
    writePrefs({ categoryId: category.id, trackId: track?.id || seed.trackId, volume, shuffle, repeat });
    writeHidden(book);
  }, [book, category.id, seed.trackId, track?.id, volume, shuffle, repeat]);

  useEffect(() => {
    playingRef.current = playing;
    controls.current = { shuffle, repeat, categoryId: category.id, trackId: track?.id ?? "", hidden: book.ids };
  }, [book.ids, category.id, playing, repeat, shuffle, track?.id, volume]);

  function stop() {
    setPlaying(false);
    video.current?.pause();
  }

  function play() {
    const el = video.current;
    if (!el) return;
    setBroken(false);
    void el.play().catch(() => setPlaying(false));
  }

  // Chỉ đọc ref và setter ổn định, nên bản tạo lúc mount vẫn đúng khi gọi từ onStateChange.
  const advance = useRef((delta: 1 | -1, auto: boolean) => {
    const live = controls.current;
    const list = visibleTracks(categoryById(live.categoryId), live.hidden);
    const pick = pickNext(list.map((item) => item.id), live.trackId, delta, { shuffle: live.shuffle, repeat: live.repeat, auto });
    if (pick.stop) return stop();
    if (pick.restart) {
      // Cùng một bài: đổi id không tải lại tệp, nên tua về đầu.
      const el = video.current;
      if (el) el.currentTime = 0;
      if (auto || playingRef.current) play();
      return;
    }
    setTrackId(pick.id);
  });

  // A new track: the <video> src changes; keep playing if music was on.
  useEffect(() => {
    if (!track) {
      // Danh sách trống (đổi sang thể loại đã xóa hết, hoặc vừa xóa bài cuối): dừng hẳn bài cũ.
      stop();
      return;
    }
    setBroken(false);
    if (playingRef.current) play();
  }, [track?.id]);

  useEffect(() => {
    if (video.current) video.current.volume = Math.max(0, Math.min(1, volume / 100));
  }, [volume]);

  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener(OPEN_MUSIC_EVENT, show);
    return () => window.removeEventListener(OPEN_MUSIC_EVENT, show);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function removeTrack(id: string) {
    setBook(hideTrack(book, category.id, id));
    if (track?.id === id) setTrackId(afterDelete(playlist.map((item) => item.id), id, id).nextId);
  }

  function toggle() {
    if (playing) return stop();
    playingRef.current = true;
    play();
  }

  const repeatLabel = repeat === "one" ? t(lang, "Lặp một bài", "Repeat one") : repeat === "all" ? t(lang, "Lặp cả danh sách", "Repeat all") : t(lang, "Không lặp", "No repeat");

  return (
    <section className={`study-player${open ? " is-open" : ""}`} id="nhac-hoc" aria-label={t(lang, "Nhạc học", "Study music")}>
      <div className="study-screen" hidden={!open}>
        <video
          key={track?.id ?? "none"}
          ref={video}
          preload="none"
          playsInline
          onPlay={() => { playingRef.current = true; setPlaying(true); setBroken(false); }}
          onPause={() => { playingRef.current = false; setPlaying(false); }}
          onEnded={() => advance.current(1, true)}
          onError={() => { if (track) { setBroken(true); setPlaying(false); playingRef.current = false; } }}
          aria-label={track ? t(lang, track.title, track.titleEn) : undefined}
        >
          {track?.webm ? <source src={track.webm} type="video/webm" /> : null}
          {/* With <source> children the video element never fires "error"; the last source does when all fail. */}
          {track ? <source src={track.src} type="video/mp4" onError={() => { setBroken(true); setPlaying(false); playingRef.current = false; }} /> : null}
        </video>
        {track ? <small className="study-credit">{track.credit}</small> : null}
      </div>
      {open ? (
        <div className="study-panel" id={panelId}>
          <div className="study-panel-head">
            <b>{t(lang, "Nhạc học", "Study music")}</b>
            <button type="button" className="text-btn" onClick={() => setOpen(false)}>{t(lang, "Thu gọn", "Close")}</button>
          </div>
          <label>
            {t(lang, "Thể loại", "Genre")}
            <select aria-label={t(lang, "Thể loại nhạc", "Music genre")} value={category.id} onChange={(event) => {
              const next = categoryById(event.target.value);
              const first = visibleTracks(next, book.ids)[0];
              setCategoryId(next.id);
              setTrackId(first?.id ?? "");
              setBroken(false);
            }}>
              {STUDY_CATEGORIES.map((item) => <option key={item.id} value={item.id}>{t(lang, item.title, item.titleEn)}</option>)}
            </select>
          </label>
          <ul className="study-queue">
            {playlist.map((item) => (
              <li key={item.id} aria-current={item.id === track?.id ? "true" : undefined}>
                <button type="button" className="study-pick" onClick={() => setTrackId(item.id)}>{t(lang, item.title, item.titleEn)}</button>
                <button
                  type="button"
                  className="text-btn"
                  aria-label={t(lang, `Xóa ${item.title}`, `Delete ${item.titleEn}`)}
                  onClick={() => removeTrack(item.id)}
                >
                  {t(lang, "Xóa", "Delete")}
                </button>
              </li>
            ))}
          </ul>
          {playlist.length === 0 ? <p className="study-fallback" role="status">{t(lang, "Danh sách trống. Bài gốc vẫn còn, bấm khôi phục để hiện lại.", "This playlist is empty. The original tracks are still there. Restore them to show the list again.")}</p> : null}
          <div className="study-row">
            {book.undo && book.undo.categoryId === category.id && book.ids.includes(book.undo.trackId) ? (
              <button type="button" className="text-btn" onClick={() => { setBook(undoHide(book)); }}>{t(lang, "Hoàn tác", "Undo")}</button>
            ) : null}
            {playlist.length < category.tracks.length ? (
              <button type="button" className="text-btn" onClick={() => setBook(restoreCategory(book, category))}>{t(lang, "Khôi phục danh sách", "Restore list")}</button>
            ) : null}
            <button type="button" className="text-btn" aria-pressed={shuffle} onClick={() => setShuffle((value) => !value)}>{t(lang, "Ngẫu nhiên", "Shuffle")}</button>
            <button type="button" className="text-btn" aria-pressed={repeat !== "off"} aria-label={repeatLabel} onClick={() => setRepeat((mode) => nextRepeat(mode))}>{repeatLabel}</button>
          </div>
          <label className="study-vol">
            {t(lang, "Âm lượng", "Volume")}
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={volume}
              aria-label={t(lang, "Âm lượng nhạc học", "Study music volume")}
              onChange={(event) => setVolume(Number(event.target.value))}
            />
          </label>
        </div>
      ) : null}
      <div className="study-bar">
        <button type="button" className="study-icon" aria-label={t(lang, "Bài trước", "Previous track")} onClick={() => advance.current(-1, false)}>‹</button>
        <button
          type="button"
          id="nhac-phat"
          className="study-play"
          aria-pressed={playing}
          aria-label={playing ? t(lang, "Tạm dừng nhạc", "Pause music") : t(lang, "Phát nhạc", "Play music")}
          disabled={!track}
          onClick={toggle}
        >
          <span aria-hidden="true">{playing ? "❚❚" : "▶"}</span>
        </button>
        <button type="button" className="study-icon" aria-label={t(lang, "Bài sau", "Next track")} onClick={() => advance.current(1, false)}>›</button>
        <span className={`study-now${broken ? " is-broken" : ""}`} role={broken ? "status" : undefined}>
          {broken ? t(lang, FALLBACK_MESSAGE, FALLBACK_MESSAGE_EN) : track ? t(lang, track.title, track.titleEn) : t(lang, "Danh sách trống", "Playlist empty")}
        </span>
        <button type="button" className="study-icon" aria-expanded={open} aria-controls={panelId} aria-label={open ? t(lang, "Thu gọn nhạc", "Close music") : t(lang, "Mở danh sách nhạc", "Open music list")} onClick={() => setOpen(!open)}>
          {open ? "▾" : "▴"}
        </button>
      </div>
    </section>
  );
}
