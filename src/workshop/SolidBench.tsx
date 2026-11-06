import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { t } from "../lib/text.ts";
import { MathText } from "../ui/MathText.tsx";
import { useLang } from "../ui/useLang.ts";
import { GeoQuiz } from "./GeoQuiz.tsx";
import {
  SOLID_LABEL,
  solidFormula,
  solidMesh,
  usesB,
  usesH,
  type SolidKind,
  type SolidParams,
} from "./solids.ts";

const KINDS: SolidKind[] = ["tru", "non", "cau", "lang", "chop", "tu", "hop", "lap"];

const START: SolidParams = { a: 3, b: 4, h: 5 };

type View = { kind: SolidKind; params: SolidParams };

function project(x: number, y: number, z: number, yaw: number, pitch: number, zoom: number, cx: number, cy: number) {
  const cyaw = Math.cos(yaw);
  const syaw = Math.sin(yaw);
  const cp = Math.cos(pitch);
  const sp = Math.sin(pitch);
  const x1 = x * cyaw - z * syaw;
  const z1 = x * syaw + z * cyaw;
  const y1 = y * cp - z1 * sp;
  const z2 = y * sp + z1 * cp;
  const scale = 26 * zoom;
  return { x: cx + x1 * scale, y: cy - y1 * scale, z: z2 };
}

function Icon({ kind }: { kind: SolidKind }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.6 };
  if (kind === "tru") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <ellipse cx="16" cy="8" rx="8" ry="3" {...common} />
        <path d="M8 8 v14 a8 3 0 0 0 16 0 V8" {...common} />
      </svg>
    );
  }
  if (kind === "non") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <ellipse cx="16" cy="24" rx="9" ry="3" {...common} />
        <path d="M7 24 L16 6 L25 24" {...common} />
      </svg>
    );
  }
  if (kind === "cau") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="9" {...common} />
        <ellipse cx="16" cy="16" rx="9" ry="3.5" {...common} />
      </svg>
    );
  }
  if (kind === "lang") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M6 22 L16 8 L26 22 Z M6 22 L10 26 L20 12 L16 8 M26 22 L20 26 L10 26" {...common} />
      </svg>
    );
  }
  if (kind === "chop") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M8 24 L24 24 L20 18 L4 18 Z M8 24 L16 8 L24 24 M4 18 L16 8" {...common} />
      </svg>
    );
  }
  if (kind === "tu") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M6 24 L26 24 L16 8 Z M16 8 L18 22 M6 24 L18 22 M26 24 L18 22" {...common} />
      </svg>
    );
  }
  if (kind === "lap") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M8 10 H22 V24 H8 Z M22 10 L26 14 V28 L22 24 M8 10 L12 14 H26" {...common} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M8 14 L20 10 L26 16 L14 20 Z M8 14 V22 L14 28 V20 M14 28 L26 24 V16" {...common} />
    </svg>
  );
}

function Stage({
  view,
  yaw,
  pitch,
  zoom,
  labels,
  axes,
  onRotate,
}: {
  view: View;
  yaw: number;
  pitch: number;
  zoom: number;
  labels: boolean;
  axes: boolean;
  onRotate: (dyaw: number, dpitch: number) => void;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const drag = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const node = canvas.current;
    if (!node) return;
    const paint = () => {
      const rect = node.getBoundingClientRect();
      const width = Math.max(280, rect.width);
      const height = 320;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      node.width = Math.round(width * dpr);
      node.height = Math.round(height * dpr);
      node.style.height = `${height}px`;
      const ctx = node.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const ink = getComputedStyle(document.documentElement).getPropertyValue("--ink").trim() || "#1c1915";
      const teal = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#0e6b5e";
      const bg = getComputedStyle(document.documentElement).getPropertyValue("--plot-bg").trim() || "#fbf8f2";
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);
      const mesh = solidMesh(view.kind, view.params);
      const cx = width / 2;
      const cy = height / 2 + 10;
      const pts = mesh.verts.map((v) => project(v[0] - view.params.a / 2, v[1] - 1.5, v[2] - view.params.a / 2, yaw, pitch, zoom, cx, cy));
      if (axes) {
        const origin = project(0, 0, 0, yaw, pitch, zoom, cx, cy);
        const axis = (x: number, y: number, z: number, name: string) => {
          const tip = project(x, y, z, yaw, pitch, zoom, cx, cy);
          ctx.strokeStyle = ink;
          ctx.globalAlpha = 0.45;
          ctx.beginPath();
          ctx.moveTo(origin.x, origin.y);
          ctx.lineTo(tip.x, tip.y);
          ctx.stroke();
          ctx.globalAlpha = 1;
          ctx.fillStyle = ink;
          ctx.font = "12px sans-serif";
          ctx.fillText(name, tip.x + 4, tip.y);
        };
        axis(4, 0, 0, "x");
        axis(0, 4, 0, "y");
        axis(0, 0, 4, "z");
      }
      ctx.strokeStyle = teal;
      ctx.lineWidth = 1.8;
      for (const [i, j] of mesh.edges) {
        const a = pts[i];
        const b = pts[j];
        if (!a || !b) continue;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      if (labels) {
        ctx.fillStyle = ink;
        ctx.font = "12px sans-serif";
        pts.forEach((point, index) => {
          ctx.fillText(String(index + 1), point.x + 8, point.y - 8 - (index % 2) * 10);
        });
      }
    };
    paint();
    const observer = new ResizeObserver(() => paint());
    observer.observe(node);
    return () => observer.disconnect();
  }, [view, yaw, pitch, zoom, labels, axes]);

  return (
    <canvas
      ref={canvas}
      className="plane-canvas"
      aria-label={SOLID_LABEL[view.kind]}
      onPointerDown={(event) => {
        drag.current = { x: event.clientX, y: event.clientY };
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event: ReactPointerEvent<HTMLCanvasElement>) => {
        const current = drag.current;
        if (!current) return;
        onRotate((event.clientX - current.x) * 0.01, (event.clientY - current.y) * 0.01);
        drag.current = { x: event.clientX, y: event.clientY };
      }}
      onPointerUp={() => { drag.current = null; }}
      onPointerCancel={() => { drag.current = null; }}
    />
  );
}

function Bench({ title, view, setView }: { title: string; view: View; setView: (next: View) => void }) {
  const [yaw, setYaw] = useState(0.7);
  const [pitch, setPitch] = useState(0.45);
  const [zoom, setZoom] = useState(1);
  const [labels, setLabels] = useState(true);
  const [axes, setAxes] = useState(true);
  const [spin, setSpin] = useState(false);
  const yawRef = useRef(yaw);
  yawRef.current = yaw;

  useEffect(() => {
    if (!spin) return;
    let frame = 0;
    let last = performance.now();
    const step = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      setYaw(yawRef.current + dt * 0.7);
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [spin]);

  const lang = useLang();
  const setKind = (kind: SolidKind) => setView({ ...view, kind });
  const setParam = (key: "a" | "b" | "h", value: number) => setView({ ...view, params: { ...view.params, [key]: value } });

  return (
    <section className="solid-bench" aria-label={title}>
      <h2>{title}</h2>
      <div className="solid-kinds" role="toolbar" aria-label="Dạng khối">
        {KINDS.map((kind) => (
          <button key={kind} type="button" className="solid-kind" aria-pressed={view.kind === kind} onClick={() => setKind(kind)}>
            <Icon kind={kind} />
            {t(lang, SOLID_LABEL[kind], kind === "tru" ? "Cylinder" : kind === "non" ? "Cone" : kind === "cau" ? "Sphere" : kind === "lang" ? "Prism" : kind === "chop" ? "Pyramid" : kind === "tu" ? "Tetrahedron" : kind === "hop" ? "Box" : "Cube")}
          </button>
        ))}
      </div>
      <div className="read-switch">
        <button type="button" onClick={() => setZoom((value) => Math.min(2.2, value + 0.2))}>{t(lang, "Phóng to", "Zoom in")}</button>
        <button type="button" onClick={() => setZoom((value) => Math.max(0.6, value - 0.2))}>{t(lang, "Thu nhỏ", "Zoom out")}</button>
        <button type="button" onClick={() => setYaw((value) => value - Math.PI / 12)}>{t(lang, "Xoay trái", "Rotate left")}</button>
        <button type="button" onClick={() => setYaw((value) => value + Math.PI / 12)}>{t(lang, "Xoay phải", "Rotate right")}</button>
        <button type="button" aria-pressed={spin} onClick={() => setSpin((value) => !value)}>{spin ? t(lang, "Dừng xoay", "Stop spin") : t(lang, "Tự xoay", "Spin")}</button>
        <button type="button" onClick={() => { setView({ kind: view.kind, params: { ...START } }); setYaw(0.7); setPitch(0.45); setZoom(1); setSpin(false); }}>{t(lang, "Đặt lại", "Reset")}</button>
        <button type="button" aria-pressed={labels} onClick={() => setLabels((value) => !value)}>{t(lang, "Nhãn điểm", "Labels")}</button>
        <button type="button" aria-pressed={axes} onClick={() => setAxes((value) => !value)}>{t(lang, "Trục", "Axes")}</button>
      </div>
      <Stage
        view={view}
        yaw={yaw}
        pitch={pitch}
        zoom={zoom}
        labels={labels}
        axes={axes}
        onRotate={(dyaw, dpitch) => {
          setSpin(false);
          setYaw((value) => value + dyaw);
          setPitch((value) => Math.max(-1.2, Math.min(1.2, value + dpitch)));
        }}
      />
      <p className="lecture-note">{t(lang, "Kéo trên hình để xoay. Thanh trượt đổi đúng số trong công thức.", "Drag the figure to rotate. The sliders change the numbers in the formula.")}</p>
      <label className="solid-slider">a
        <input type="range" min={1} max={8} step={0.5} value={view.params.a} aria-label="Thanh a" onChange={(event) => setParam("a", Number(event.target.value))} />
        <span>{view.params.a}</span>
      </label>
      {usesB(view.kind) ? (
        <label className="solid-slider">b
          <input type="range" min={1} max={8} step={0.5} value={view.params.b} aria-label="Thanh b" onChange={(event) => setParam("b", Number(event.target.value))} />
          <span>{view.params.b}</span>
        </label>
      ) : null}
      {usesH(view.kind) ? (
        <label className="solid-slider">h
          <input type="range" min={1} max={8} step={0.5} value={view.params.h} aria-label="Thanh h" onChange={(event) => setParam("h", Number(event.target.value))} />
          <span>{view.params.h}</span>
        </label>
      ) : null}
      <p><MathText text={solidFormula(view.kind, view.params)} /></p>
    </section>
  );
}

export function SolidBench() {
  const lang = useLang();
  const [main, setMain] = useState<View>({ kind: "chop", params: { ...START, a: 6, b: 4 } });
  const [compare, setCompare] = useState(false);
  const [other, setOther] = useState<View>({ kind: "lang", params: { a: 3, b: 4, h: 6 } });
  return (
    <div>
      <div className="read-switch">
        <button type="button" aria-pressed={compare} onClick={() => setCompare((value) => !value)}>{compare ? t(lang, "Ẩn so sánh", "Hide compare") : t(lang, "So sánh cạnh nhau", "Compare side by side")}</button>
      </div>
      <div className={compare ? "solid-compare" : ""}>
        <Bench title={compare ? "Hình A" : "Khối đang xem"} view={main} setView={setMain} />
        {compare ? <Bench title="Hình B" view={other} setView={setOther} /> : null}
      </div>
      <GeoQuiz onShow={(item) => setMain({ kind: item.kind, params: { ...item.params } })} />
    </div>
  );
}
