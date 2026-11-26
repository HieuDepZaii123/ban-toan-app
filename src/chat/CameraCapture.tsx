import { useEffect, useRef, useState } from "react";
import { t } from "../lib/text.ts";
import { useLang } from "../ui/useLang.ts";

/**
 * Live camera view inside the tutor panel: the back camera on a phone, the webcam on a laptop.
 * "Chụp" freezes the current frame into a JPEG file and hands it to `onShot`; the camera is turned off
 * whenever the view closes. If the camera can't start (no camera, permission refused), `onFail` is called
 * so the panel can fall back to the device's own camera or file picker.
 */
export function CameraCapture({ onShot, onClose, onFail }: {
  onShot: (file: File) => void;
  onClose: () => void;
  onFail: (reason: "denied" | "none") => void;
}) {
  const lang = useLang();
  const video = useRef<HTMLVideoElement>(null);
  const stream = useRef<MediaStream | null>(null);
  const [ready, setReady] = useState(false);
  // Latest onFail without restarting the camera when the parent re-renders.
  const fail = useRef(onFail);
  useEffect(() => { fail.current = onFail; }, [onFail]);

  useEffect(() => {
    let live = true;
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: { ideal: "environment" }, width: { ideal: 1920 }, height: { ideal: 1080 } }, audio: false })
      .then((media) => {
        if (!live) return media.getTracks().forEach((track) => track.stop());
        stream.current = media;
        const el = video.current;
        if (!el) return;
        el.srcObject = media;
        void el.play().catch(() => { /* autoplay is allowed for muted inline video; ignore a rare refusal */ });
      })
      .catch((error: unknown) => {
        if (!live) return;
        const name = error instanceof DOMException ? error.name : "";
        fail.current(name === "NotAllowedError" || name === "SecurityError" ? "denied" : "none");
      });
    return () => {
      live = false;
      stream.current?.getTracks().forEach((track) => track.stop());
      stream.current = null;
    };
  }, []);

  function shoot(): void {
    const el = video.current;
    if (!el || !el.videoWidth) return;
    const canvas = document.createElement("canvas");
    canvas.width = el.videoWidth;
    canvas.height = el.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(el, 0, 0);
    canvas.toBlob((blob) => {
      if (blob) onShot(new File([blob], "de-bai.jpg", { type: "image/jpeg" }));
    }, "image/jpeg", 0.92);
  }

  return (
    <div className="chat-camera" role="group" aria-label={t(lang, "Máy ảnh", "Camera")}>
      <video
        ref={video}
        muted
        playsInline
        onLoadedData={() => setReady(true)}
        aria-label={t(lang, "Khung ngắm máy ảnh", "Camera viewfinder")}
      />
      <p className="chat-camera-tip">
        {ready
          ? t(lang, "Đặt cả đề bài trong khung, đủ sáng, rồi bấm Chụp.", "Fit the whole problem in the frame, in good light, then press Take.")
          : t(lang, "Đang mở máy ảnh…", "Opening the camera…")}
      </p>
      <div className="chat-camera-actions">
        <button type="button" className="text-btn" onClick={onClose}>{t(lang, "Hủy", "Cancel")}</button>
        <button type="button" className="pay-btn" disabled={!ready} onClick={shoot}>{t(lang, "Chụp", "Take")}</button>
      </div>
    </div>
  );
}
