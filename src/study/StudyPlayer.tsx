import { useEffect, useRef, useState } from "react";
import { t } from "../lib/text.ts";
import { useLang } from "../ui/useLang.ts";
import { FALLBACK_MESSAGE, STUDY_CATEGORIES, categoryById } from "./catalog.ts";
import { afterDelete, hideTrack, nextRepeat, pickNext, readHidden, readPrefs, restoreCategory, undoHide, visibleTracks, writeHidden, writePrefs, type HiddenBook, type RepeatMode } from "./logic.ts";

type YtPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  loadVideoById: (id: string) => void;
  cueVideoById: (id: string) => void;
  setVolume: (volume: number) => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  destroy: () => void;
};

type YtNamespace = {
  Player: new (element: HTMLElement, options: object) => YtPlayer;
  PlayerState: { ENDED: number; PLAYING: number; PAUSED: number };
};

declare global {
  interface Window {
    YT?: YtNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiReady: Promise<void> | null = null;

function youtubeReady(): Promise<void> {
  if (window.YT?.Player) return Promise.resolve();
  if (apiReady) return apiReady;
  apiReady = new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve();
    };
    if (!document.querySelector("script[data-study-yt]")) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.dataset.studyYt = "1";
      script.onerror = () => {
        apiReady = null;
        resolve();
      };
      document.head.appendChild(script);
    }
  });
  return apiReady;
}

export function StudyPlayer() {
  const lang = useLang();
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
  const [readyUi, setReadyUi] = useState(false);
  const host = useRef<HTMLDivElement>(null);
  const player = useRef<YtPlayer | null>(null);
  const ready = useRef(false);
  const playingRef = useRef(false);
  const volumeRef = useRef(seed.volume);
  const trackRef = useRef(seed.trackId);
  const hiddenRef = useRef(book.ids);
  const controls = useRef({ shuffle: seed.shuffle, repeat: seed.repeat, categoryId: seed.categoryId, trackId: seed.trackId });
  const advanceRef = useRef<(delta: 1 | -1, auto: boolean) => void>(() => {});

  const category = categoryById(categoryId);
  const playlist = visibleTracks(category, book.ids);
  const track = playlist.find((item) => item.id === trackId) ?? playlist[0] ?? null;

  useEffect(() => {
    writePrefs({ categoryId: category.id, trackId: track?.id || seed.trackId, volume, shuffle, repeat });
    writeHidden(book);
  }, [book, category.id, seed.trackId, track?.id, volume, shuffle, repeat]);

  useEffect(() => {
    playingRef.current = playing;
    volumeRef.current = volume;
    hiddenRef.current = book.ids;
    trackRef.current = track?.id ?? "";
    controls.current = { shuffle, repeat, categoryId: category.id, trackId: track?.id ?? "" };
    advanceRef.current = (delta, auto) => {
      const live = controls.current;
      const list = visibleTracks(categoryById(live.categoryId), hiddenRef.current);
      const pick = pickNext(list.map((item) => item.id), live.trackId, delta, { shuffle: live.shuffle, repeat: live.repeat, auto });
      if (pick.stop) {
        setPlaying(false);
        player.current?.pauseVideo();
        return;
      }
      if (pick.restart) {
        // Cùng một bài: đổi id không tải lại video, nên tua về đầu.
        player.current?.seekTo(0, true);
        if (auto || playingRef.current) player.current?.playVideo();
        return;
      }
      setBroken(false);
      setTrackId(pick.id);
    };
  }, [book.ids, category.id, playing, repeat, shuffle, track?.id, volume]);

  useEffect(() => {
    let cancelled = false;
    const mountedId = () => {
      const list = visibleTracks(categoryById(controls.current.categoryId), hiddenRef.current);
      return list.find((item) => item.id === trackRef.current)?.youtubeId ?? list[0]?.youtubeId ?? "";
    };
    void youtubeReady().then(() => {
      if (cancelled || player.current) return;
      if (!host.current || !window.YT?.Player) {
        setBroken(true);
        return;
      }
      const initialId = mountedId() || categoryById(controls.current.categoryId).tracks[0]?.youtubeId || "";
      if (!initialId) return;
      player.current = new window.YT.Player(host.current, {
        videoId: initialId,
        width: "200",
        height: "120",
        playerVars: { rel: 0, modestbranding: 1, playsinline: 1, origin: window.location.origin },
        events: {
          onReady: (event: { target: YtPlayer }) => {
            ready.current = true;
            setReadyUi(true);
            event.target.setVolume(volumeRef.current);
            const latestId = mountedId();
            if (latestId !== initialId) {
              if (playingRef.current) event.target.loadVideoById(latestId);
              else event.target.cueVideoById(latestId);
            } else if (playingRef.current) event.target.playVideo();
          },
          onError: () => {
            setBroken(true);
            setPlaying(false);
            playingRef.current = false;
          },
          onStateChange: (event: { data: number }) => {
            if (!window.YT) return;
            // Giữ nút Phát/Tạm dừng khớp với trạng thái thật (trình duyệt có thể chặn tự phát).
            if (event.data === window.YT.PlayerState.PLAYING) {
              setBroken(false);
              setPlaying(true);
            }
            if (event.data === window.YT.PlayerState.PAUSED) setPlaying(false);
            if (event.data === window.YT.PlayerState.ENDED) advanceRef.current(1, true);
          },
        },
      });
    });
    return () => {
      cancelled = true;
      ready.current = false;
      setReadyUi(false);
      player.current?.destroy();
      player.current = null;
    };
  }, []);

  useEffect(() => {
    const current = player.current;
    if (!ready.current || !current) return;
    if (!track) {
      // Danh sách trống (ví dụ đổi sang thể loại đã xóa hết): đừng để bài cũ phát tiếp mà không tắt được.
      current.pauseVideo();
      setPlaying(false);
      return;
    }
    setBroken(false);
    if (playingRef.current) current.loadVideoById(track.youtubeId);
    else current.cueVideoById(track.youtubeId);
  }, [track?.youtubeId]);

  useEffect(() => {
    if (!ready.current) return;
    player.current?.setVolume(volume);
  }, [volume]);

  function go(delta: 1 | -1) {
    advanceRef.current(delta, false);
  }

  function removeTrack(id: string) {
    const wasActive = track?.id === id;
    const nextBook = hideTrack(book, category.id, id);
    const moved = afterDelete(playlist.map((item) => item.id), track?.id ?? "", id);
    setBook(nextBook);
    if (wasActive) {
      setTrackId(moved.nextId);
      if (moved.stop) {
        setPlaying(false);
        player.current?.pauseVideo();
      }
    }
  }

  function toggle() {
    const current = player.current;
    if (!current || !ready.current) return;
    if (playing) {
      current.pauseVideo();
      setPlaying(false);
      return;
    }
    setBroken(false);
    setPlaying(true);
    current.playVideo();
  }

  const repeatLabel = repeat === "one" ? "Lặp một bài" : repeat === "all" ? "Lặp cả danh sách" : "Không lặp";

  return (
    <section className="study-player" id="nhac-hoc" aria-label="Nhạc học">
      <div className="study-frame" aria-hidden="true"><div ref={host} /></div>
      <label>
        Thể loại
        <select aria-label="Thể loại nhạc" value={category.id} onChange={(event) => {
          const next = categoryById(event.target.value);
          const first = visibleTracks(next, book.ids)[0];
          setCategoryId(next.id);
          setTrackId(first?.id ?? "");
          setBroken(false);
        }}>
          {STUDY_CATEGORIES.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
        </select>
      </label>
      <label>
        Bài
        <select aria-label="Bài đang chọn" value={track?.id ?? ""} disabled={playlist.length === 0} onChange={(event) => { setTrackId(event.target.value); setBroken(false); }}>
          {playlist.length === 0 ? <option value="">{t(lang, "Danh sách trống", "Playlist empty")}</option> : null}
          {playlist.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
        </select>
      </label>
      <ul className="study-queue">
        {playlist.map((item) => (
          <li key={item.id} className={item.id === track?.id ? "is-current" : undefined} aria-current={item.id === track?.id ? "true" : undefined}>
            <button type="button" className="study-pick" onClick={() => { setTrackId(item.id); setBroken(false); }}>{item.title}</button>
            <button
              type="button"
              className="text-btn"
              aria-label={t(lang, `Xóa ${item.title}`, `Delete ${item.title}`)}
              onClick={() => removeTrack(item.id)}
            >
              {t(lang, "Xóa", "Delete")}
            </button>
          </li>
        ))}
      </ul>
      {playlist.length === 0 ? <p className="study-fallback" role="status">{t(lang, "Danh sách trống. Bài gốc vẫn còn, bấm khôi phục để hiện lại.", "This playlist is empty. The original tracks are still there. Restore them to show the list again.")}</p> : null}
      {book.undo && book.undo.categoryId === category.id && book.ids.includes(book.undo.trackId) ? (
        <button type="button" className="text-btn" onClick={() => { setBook(undoHide(book)); }}>{t(lang, "Hoàn tác", "Undo")}</button>
      ) : null}
      {playlist.length < category.tracks.length ? (
        <button type="button" className="text-btn" onClick={() => setBook(restoreCategory(book, category))}>{t(lang, "Khôi phục danh sách", "Restore list")}</button>
      ) : null}
      <button type="button" className="text-btn" aria-label="Bài trước" onClick={() => go(-1)}>Trước</button>
      <button type="button" id="nhac-phat" className="text-btn" aria-pressed={playing} disabled={!readyUi || !track} onClick={toggle}>{readyUi ? (playing ? "Tạm dừng" : "Phát") : "Đang tải"}</button>
      <button type="button" className="text-btn" aria-label="Bài sau" onClick={() => go(1)}>Sau</button>
      <button type="button" className="text-btn" aria-pressed={shuffle} aria-label="Phát ngẫu nhiên" onClick={() => setShuffle((value) => !value)}>Ngẫu nhiên</button>
      <button type="button" className="text-btn" aria-pressed={repeat !== "off"} aria-label={repeatLabel} onClick={() => setRepeat((mode) => nextRepeat(mode))}>{repeatLabel}</button>
      <label className="study-vol">
        Âm lượng
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={volume}
          aria-label="Âm lượng nhạc học"
          onChange={(event) => setVolume(Number(event.target.value))}
        />
      </label>
      {broken ? <p className="study-fallback" role="status">{FALLBACK_MESSAGE}</p> : null}
    </section>
  );
}
