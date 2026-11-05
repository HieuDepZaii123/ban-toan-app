import { useEffect, useRef, useState } from "react";
import { FALLBACK_MESSAGE, STUDY_CATEGORIES, categoryById, trackIn } from "./catalog.ts";
import { buttonIndex, nextRepeat, readPrefs, shuffledIndex, writePrefs, type RepeatMode } from "./logic.ts";

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
  PlayerState: { ENDED: number; PLAYING: number };
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
  const [seed] = useState(readPrefs);
  const [categoryId, setCategoryId] = useState(seed.categoryId);
  const [trackId, setTrackId] = useState(seed.trackId);
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
  const controls = useRef({ shuffle: seed.shuffle, repeat: seed.repeat, categoryId: seed.categoryId, trackId: seed.trackId });
  const advanceRef = useRef<(delta: 1 | -1) => void>(() => {});
  const goRef = useRef<(delta: 1 | -1) => void>(() => {});

  const category = categoryById(categoryId);
  const track = trackIn(category, trackId);

  useEffect(() => {
    writePrefs({ categoryId: category.id, trackId: track.id, volume, shuffle, repeat });
  }, [category.id, track.id, volume, shuffle, repeat]);

  useEffect(() => {
    playingRef.current = playing;
    volumeRef.current = volume;
    trackRef.current = track.id;
    controls.current = { shuffle, repeat, categoryId: category.id, trackId: track.id };
    const go = (delta: 1 | -1) => {
      const live = controls.current;
      const list = categoryById(live.categoryId).tracks;
      const at = Math.max(0, list.findIndex((item) => item.id === live.trackId));
      if (delta > 0 && live.shuffle) {
        const pick = list[shuffledIndex(list.length, at, Math.random)];
        if (pick) setTrackId(pick.id);
        return;
      }
      const moved = buttonIndex(list.length, at, delta, live.repeat);
      if (moved.stop) {
        setPlaying(false);
        player.current?.pauseVideo();
        return;
      }
      const next = list[moved.index];
      if (next) setTrackId(next.id);
    };
    goRef.current = go;
    advanceRef.current = (delta) => {
      if (controls.current.repeat === "one" && delta > 0) {
        player.current?.seekTo(0, true);
        player.current?.playVideo();
        return;
      }
      go(delta);
    };
  }, [category.id, playing, repeat, shuffle, track.id, volume]);

  useEffect(() => {
    let cancelled = false;
    const mountedId = () => trackIn(categoryById(controls.current.categoryId), trackRef.current).youtubeId;
    void youtubeReady().then(() => {
      if (cancelled || player.current) return;
      if (!host.current || !window.YT?.Player) {
        setBroken(true);
        return;
      }
      const initialId = mountedId();
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
            if (event.data === window.YT.PlayerState.PLAYING) setBroken(false);
            if (event.data === window.YT.PlayerState.ENDED) advanceRef.current(1);
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
    setBroken(false);
    if (playingRef.current) current.loadVideoById(track.youtubeId);
    else current.cueVideoById(track.youtubeId);
  }, [track.youtubeId]);

  useEffect(() => {
    if (!ready.current) return;
    player.current?.setVolume(volume);
  }, [volume]);

  function go(delta: 1 | -1) {
    goRef.current(delta);
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
    <section className="study-player" aria-label="Nhạc học">
      <div className="study-frame" aria-hidden="true"><div ref={host} /></div>
      <label>
        Thể loại
        <select aria-label="Thể loại nhạc" value={category.id} onChange={(event) => {
          const next = categoryById(event.target.value);
          setCategoryId(next.id);
          setTrackId(trackIn(next, "").id);
          setBroken(false);
        }}>
          {STUDY_CATEGORIES.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
        </select>
      </label>
      <label>
        Bài
        <select aria-label="Bài đang chọn" value={track.id} onChange={(event) => { setTrackId(event.target.value); setBroken(false); }}>
          {category.tracks.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
        </select>
      </label>
      <button type="button" className="text-btn" aria-label="Bài trước" onClick={() => go(-1)}>Trước</button>
      <button type="button" className="text-btn" aria-pressed={playing} disabled={!readyUi} onClick={toggle}>{readyUi ? (playing ? "Tạm dừng" : "Phát") : "Đang tải"}</button>
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
