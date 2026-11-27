import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { t } from "../lib/text.ts";
import { useLang } from "../ui/useLang.ts";
import { type Crop, dragCrop, exportPhoto, fileToCanvas, FULL, type Grip, renderCrop, rotateCanvas, toCanvas } from "./photo.ts";

export type StudioStart = { kind: "camera" } | { kind: "file"; file: Blob };

/**
 * Full-screen photo studio for "Hỏi toán".
 * Camera: live view (back camera on phones, webcam on laptops), framing guide, flash and camera switch where
 * the device has them. Edit: crop to the one problem, rotate, "Làm rõ chữ" (a clean black-on-white scan), retake.
 * `onDone` gets a JPEG data URL small enough for the server. The camera is off whenever the camera stage is not shown.
 */
export function PhotoStudio({ start, onDone, onClose }: {
  start: StudioStart;
  onDone: (dataUrl: string) => void;
  onClose: () => void;
}) {
  const lang = useLang();
  const [stage, setStage] = useState<"camera" | "edit">(start.kind === "camera" ? "camera" : "edit");
  const [image, setImage] = useState<HTMLCanvasElement | null>(null);
  /** Bumped for each new or rotated picture, so the editor starts with a fresh crop. */
  const [version, setVersion] = useState(0);
  const [enhance, setEnhance] = useState(false);
  const [error, setError] = useState("");
  const [fromCamera, setFromCamera] = useState(start.kind === "camera");
  const library = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const body = document.body.style;
    const before = body.overflow;
    body.overflow = "hidden";
    return () => { body.overflow = before; };
  }, []);

  useEffect(() => {
    if (start.kind !== "file") return;
    let live = true;
    void fileToCanvas(start.file).then((canvas) => {
      if (!live) return;
      if (canvas) show(canvas);
      else setError(t(lang, "Ảnh này chưa đọc được. Thử ảnh khác.", "That picture could not be read. Try another."));
    });
    return () => { live = false; };
    // Only the picture the studio opened with; later picks go through openFile.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function show(canvas: HTMLCanvasElement): void {
    setImage(canvas);
    setVersion((n) => n + 1);
  }

  async function openFile(file: File | undefined): Promise<void> {
    if (!file) return;
    const canvas = await fileToCanvas(file);
    if (!canvas) return setError(t(lang, "Ảnh này chưa đọc được. Thử ảnh khác.", "That picture could not be read. Try another."));
    setError("");
    setFromCamera(false);
    show(canvas);
    setStage("edit");
  }

  return createPortal(
    <div className="studio" role="dialog" aria-modal="true" aria-label={t(lang, "Ảnh đề bài", "Photo of the problem")}>
      <input
        ref={library}
        type="file"
        accept="image/*"
        hidden
        onChange={(event) => {
          void openFile(event.target.files?.[0]);
          event.target.value = "";
        }}
      />
      {stage === "camera" ? (
        <CameraStage
          onShot={(canvas) => { show(canvas); setFromCamera(true); setStage("edit"); }}
          onLibrary={() => library.current?.click()}
          onClose={onClose}
        />
      ) : image ? (
        <EditStage
          key={version}
          image={image}
          enhance={enhance}
          onEnhance={setEnhance}
          onRotate={(turn) => show(rotateCanvas(image, turn))}
          retakeLabel={fromCamera ? t(lang, "Chụp lại", "Retake") : t(lang, "Chọn ảnh khác", "Choose another")}
          onRetake={() => (fromCamera ? setStage("camera") : library.current?.click())}
          onDone={onDone}
          onClose={onClose}
        />
      ) : (
        <div className="studio-center">
          <p>{error || t(lang, "Đang mở ảnh…", "Opening the picture…")}</p>
          <div className="studio-row">
            <button type="button" className="studio-btn" onClick={onClose}>{t(lang, "Đóng", "Close")}</button>
            {error ? <button type="button" className="studio-btn is-primary" onClick={() => library.current?.click()}>{t(lang, "Chọn ảnh khác", "Choose another")}</button> : null}
          </div>
        </div>
      )}
    </div>,
    document.body,
  );
}

function CameraStage({ onShot, onLibrary, onClose }: {
  onShot: (canvas: HTMLCanvasElement) => void;
  onLibrary: () => void;
  onClose: () => void;
}) {
  const lang = useLang();
  const video = useRef<HTMLVideoElement>(null);
  const shutter = useRef<HTMLButtonElement>(null);
  const [facing, setFacing] = useState<"environment" | "user">("environment");
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState<"" | "denied" | "none">("");
  const [cameras, setCameras] = useState(0);
  const [track, setTrack] = useState<MediaStreamTrack | null>(null);
  const [torch, setTorch] = useState(false);
  const [flash, setFlash] = useState(false);
  const view = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const frame = useFit(view, size.width, size.height, 0);

  useEffect(() => {
    let live = true;
    let media: MediaStream | null = null;
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: { ideal: facing }, width: { ideal: 2560 }, height: { ideal: 1440 } }, audio: false })
      .then((stream) => {
        if (!live) return stream.getTracks().forEach((item) => item.stop());
        media = stream;
        const el = video.current;
        if (el) {
          el.srcObject = stream;
          void el.play().catch(() => { /* muted inline video may autoplay; a refusal just leaves the first frame */ });
        }
        setTrack(stream.getVideoTracks()[0] ?? null);
        void navigator.mediaDevices.enumerateDevices()
          .then((list) => { if (live) setCameras(list.filter((item) => item.kind === "videoinput").length); })
          .catch(() => {});
      })
      .catch((error: unknown) => {
        if (!live) return;
        const name = error instanceof DOMException ? error.name : "";
        setFailed(name === "NotAllowedError" || name === "SecurityError" ? "denied" : "none");
      });
    return () => {
      live = false;
      media?.getTracks().forEach((item) => item.stop());
      setReady(false);
      setTrack(null);
      setTorch(false);
    };
  }, [facing]);

  useEffect(() => { if (ready) shutter.current?.focus(); }, [ready]);

  const canTorch = (track?.getCapabilities?.() as { torch?: boolean } | undefined)?.torch === true;

  function toggleTorch(): void {
    if (!track) return;
    const next = !torch;
    track.applyConstraints({ advanced: [{ torch: next } as MediaTrackConstraintSet] })
      .then(() => setTorch(next))
      .catch(() => {});
  }

  function shoot(): void {
    const el = video.current;
    if (!el || !el.videoWidth) return;
    const canvas = toCanvas(el, el.videoWidth, el.videoHeight);
    if (!canvas) return;
    setFlash(true);
    window.setTimeout(() => onShot(canvas), 120);
  }

  if (failed) {
    return (
      <div className="studio-center">
        <p>
          {failed === "denied"
            ? t(lang, "Chưa được phép dùng máy ảnh. Cho phép trong cài đặt trình duyệt rồi thử lại, hoặc chọn ảnh có sẵn.", "Camera access was refused. Allow it in your browser settings and try again, or choose a saved picture.")
            : t(lang, "Không mở được máy ảnh trên thiết bị này. Bạn có thể chọn ảnh có sẵn.", "The camera could not start on this device. You can choose a saved picture.")}
        </p>
        <div className="studio-row">
          <button type="button" className="studio-btn" onClick={onClose}>{t(lang, "Đóng", "Close")}</button>
          <button type="button" className="studio-btn is-primary" onClick={onLibrary}>{t(lang, "Chọn ảnh có sẵn", "Choose a saved picture")}</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="studio-top">
        <button type="button" className="studio-btn" onClick={onClose}>{t(lang, "Đóng", "Close")}</button>
        <span className="studio-title">{t(lang, "Chụp đề bài", "Photograph the problem")}</span>
        {canTorch ? (
          <button type="button" className={`studio-btn${torch ? " is-on" : ""}`} aria-pressed={torch} onClick={toggleTorch}>
            {t(lang, "Đèn", "Light")}
          </button>
        ) : <span className="studio-spacer" />}
      </div>
      <div className="studio-view" ref={view}>
        <video
          ref={video}
          muted
          playsInline
          className={facing === "user" ? "is-mirror" : undefined}
          onLoadedData={(event) => {
            setSize({ width: event.currentTarget.videoWidth, height: event.currentTarget.videoHeight });
            setReady(true);
          }}
          onResize={(event) => setSize({ width: event.currentTarget.videoWidth, height: event.currentTarget.videoHeight })}
          aria-label={t(lang, "Khung ngắm máy ảnh", "Camera viewfinder")}
        />
        {/* The guide and flash sit on the picture itself, not the whole screen. */}
        {frame.width > 0 ? (
          <div className="studio-frame" style={{ width: frame.width, height: frame.height }} aria-hidden="true">
            <div className="studio-guide"><i /><i /><i /><i /></div>
            {flash ? <div className="studio-flash" /> : null}
          </div>
        ) : null}
      </div>
      <p className="studio-tip">
        {ready
          ? t(lang, "Giữ máy song song với trang giấy, để đề bài nằm trong khung. Bước sau có thể cắt lại.", "Hold the phone parallel to the page with the problem inside the frame. You can crop next.")
          : t(lang, "Đang mở máy ảnh…", "Opening the camera…")}
      </p>
      <div className="studio-bottom">
        <button type="button" className="studio-btn" onClick={onLibrary}>{t(lang, "Thư viện", "Library")}</button>
        <button
          ref={shutter}
          type="button"
          className="studio-shutter"
          disabled={!ready}
          onClick={shoot}
          aria-label={t(lang, "Chụp", "Take photo")}
        />
        {cameras > 1 ? (
          <button type="button" className="studio-btn" onClick={() => setFacing((side) => (side === "environment" ? "user" : "environment"))}>
            {t(lang, "Đổi camera", "Switch")}
          </button>
        ) : <span className="studio-spacer" />}
      </div>
    </>
  );
}

/** The largest width × height with this aspect ratio that fits inside `ref`, less `margin`, kept up to date. */
function useFit(ref: React.RefObject<HTMLElement | null>, width: number, height: number, margin: number): { width: number; height: number } {
  const [fit, setFit] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !width || !height) return;
    const measure = () => {
      const scale = Math.min((el.clientWidth - margin) / width, (el.clientHeight - margin) / height);
      setFit({ width: Math.max(0, Math.floor(width * scale)), height: Math.max(0, Math.floor(height * scale)) });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, width, height, margin]);
  return fit;
}

const GRIPS: Exclude<Grip, "move">[] = ["nw", "ne", "sw", "se"];
const PREVIEW_SIDE = 1100;

function EditStage({ image, enhance, onEnhance, onRotate, retakeLabel, onRetake, onDone, onClose }: {
  image: HTMLCanvasElement;
  enhance: boolean;
  onEnhance: (on: boolean) => void;
  onRotate: (turn: 1 | -1) => void;
  retakeLabel: string;
  onRetake: () => void;
  onDone: (dataUrl: string) => void;
  onClose: () => void;
}) {
  const lang = useLang();
  const stageBox = useRef<HTMLDivElement>(null);
  // Room around the photo so the corner handles stay reachable at the edges.
  const box = useFit(stageBox, image.width, image.height, 40);
  const [crop, setCrop] = useState<Crop>({ x: 0.04, y: 0.04, w: 0.92, h: 0.92 });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const drag = useRef<{ grip: Grip; x: number; y: number; crop: Crop } | null>(null);
  const done = useRef<HTMLButtonElement>(null);

  // One downscaled preview of the whole picture, plain and cleaned up, so toggling is instant.
  const preview = useMemo(() => ({
    plain: renderCrop(image, FULL, false, PREVIEW_SIDE)?.toDataURL("image/jpeg", 0.85) ?? "",
    clean: renderCrop(image, FULL, true, PREVIEW_SIDE)?.toDataURL("image/jpeg", 0.85) ?? "",
  }), [image]);


  useEffect(() => { done.current?.focus(); }, []);

  function down(grip: Grip, event: React.PointerEvent<HTMLElement>): void {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { grip, x: event.clientX, y: event.clientY, crop };
  }

  function move(event: React.PointerEvent<HTMLElement>): void {
    const start = drag.current;
    if (!start || box.width === 0) return;
    setCrop(dragCrop(start.crop, start.grip, (event.clientX - start.x) / box.width, (event.clientY - start.y) / box.height));
  }

  function up(): void {
    drag.current = null;
  }

  /** Arrow keys move the box; with Shift they resize it. For keyboard users. */
  function key(event: React.KeyboardEvent<HTMLElement>): void {
    const step = 0.02;
    const dx = event.key === "ArrowLeft" ? -step : event.key === "ArrowRight" ? step : 0;
    const dy = event.key === "ArrowUp" ? -step : event.key === "ArrowDown" ? step : 0;
    if (!dx && !dy) return;
    event.preventDefault();
    setCrop((current) => dragCrop(current, event.shiftKey ? "se" : "move", dx, dy));
  }

  function finish(): void {
    setBusy(true);
    setError("");
    // Let the button show its busy state before the (synchronous) encode.
    window.setTimeout(() => {
      const url = exportPhoto(image, crop, enhance);
      setBusy(false);
      if (url) onDone(url);
      else setError(t(lang, "Ảnh quá lớn. Cắt nhỏ lại rồi thử lần nữa.", "The picture is too large. Crop it smaller and try again."));
    }, 30);
  }

  const src = enhance ? preview.clean : preview.plain;
  const whole = crop.x === 0 && crop.y === 0 && crop.w === 1 && crop.h === 1;

  return (
    <>
      <div className="studio-top">
        <button type="button" className="studio-btn" onClick={onClose}>{t(lang, "Đóng", "Close")}</button>
        <span className="studio-title">{t(lang, "Cắt đề bài", "Crop")}</span>
        <button type="button" className="studio-btn" onClick={onRetake}>{retakeLabel}</button>
      </div>
      <div className="studio-view" ref={stageBox} onPointerMove={move} onPointerUp={up} onPointerCancel={up}>
        {src && box.width > 0 ? (
          <div className="studio-photo" style={{ width: box.width, height: box.height }}>
            <img src={src} alt={t(lang, "Ảnh đề bài", "Photo of the problem")} draggable={false} />
            <div
              className="studio-crop"
              role="slider"
              tabIndex={0}
              aria-label={t(lang, "Vùng cắt. Phím mũi tên để dời, giữ Shift để đổi cỡ.", "Crop area. Arrow keys move it; hold Shift to resize.")}
              aria-valuetext={`${Math.round(crop.w * 100)}% × ${Math.round(crop.h * 100)}%`}
              style={{ left: `${crop.x * 100}%`, top: `${crop.y * 100}%`, width: `${crop.w * 100}%`, height: `${crop.h * 100}%` }}
              onPointerDown={(event) => down("move", event)}
              onKeyDown={key}
            >
              {GRIPS.map((grip) => (
                <span key={grip} className={`studio-grip is-${grip}`} onPointerDown={(event) => down(grip, event)} />
              ))}
            </div>
          </div>
        ) : (
          <p className="studio-tip">{t(lang, "Đang chuẩn bị ảnh…", "Preparing the picture…")}</p>
        )}
      </div>
      <p className="studio-tip" role={error ? "alert" : undefined}>
        {error || t(lang, "Kéo các góc để chỉ giữ một bài. Ảnh càng gọn, trợ lý đọc đề càng đúng.", "Drag the corners to keep just one problem. The tighter the crop, the better the tutor reads it.")}
      </p>
      <div className="studio-tools">
        <button type="button" className="studio-btn" onClick={() => onRotate(-1)} aria-label={t(lang, "Xoay trái", "Rotate left")}>⟲</button>
        <button type="button" className="studio-btn" onClick={() => onRotate(1)} aria-label={t(lang, "Xoay phải", "Rotate right")}>⟳</button>
        <button type="button" className={`studio-btn${enhance ? " is-on" : ""}`} aria-pressed={enhance} onClick={() => onEnhance(!enhance)}>
          {t(lang, "Làm rõ chữ", "Sharpen text")}
        </button>
        <button type="button" className="studio-btn" disabled={whole} onClick={() => setCrop(FULL)}>{t(lang, "Cả ảnh", "Whole")}</button>
      </div>
      <div className="studio-bottom">
        <button ref={done} type="button" className="studio-btn is-primary is-wide" disabled={busy || !src} onClick={finish}>
          {busy ? t(lang, "Đang xử lý…", "Working…") : t(lang, "Dùng ảnh này", "Use this photo")}
        </button>
      </div>
    </>
  );
}
