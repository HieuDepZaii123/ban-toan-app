import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { foot, midpoint, nearIndex, type Pt } from "./plane.ts";

type Tool = "move" | "point" | "seg" | "mid" | "perp";
type Named = Pt & { name: string };

const TOOLS: { id: Tool; label: string; hint: string }[] = [
  { id: "move", label: "Kéo", hint: "Kéo một điểm đã dựng." },
  { id: "point", label: "Điểm", hint: "Chạm lên lưới để đặt điểm." },
  { id: "seg", label: "Đoạn", hint: "Chọn hai điểm để nối đoạn." },
  { id: "mid", label: "Trung điểm", hint: "Chọn hai điểm. Trung điểm hiện ra và nối vào đoạn." },
  { id: "perp", label: "Vuông góc", hint: "Chọn hai điểm của đường, rồi điểm cần hạ vuông góc." },
];
const NAMES = "ABCDEFGHJKLMNPQRSTUVWXYZ";

export function PlaneShop() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Named[]>([]);
  const [tool, setTool] = useState<Tool>("point");
  const [points, setPoints] = useState<Named[]>([]);
  const [segs, setSegs] = useState<{ a: number; b: number }[]>([]);
  const [pending, setPending] = useState<number[]>([]);
  const drag = useRef<number | null>(null);

  useEffect(() => {
    const node = canvas.current;
    if (!node) return;
    const ctx = node.getContext("2d");
    if (!ctx) return;
    const rect = node.getBoundingClientRect();
    const width = Math.max(320, rect.width);
    const height = 420;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    node.width = Math.round(width * dpr);
    node.height = Math.round(height * dpr);
    node.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const ink = getComputedStyle(document.documentElement).getPropertyValue("--ink").trim() || "#1c1914";
    const teal = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#0e6b5e";
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = "rgba(28,25,20,0.12)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x <= width; x += 24) {
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, height);
    }
    for (let y = 0; y <= height; y += 24) {
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(width, y + 0.5);
    }
    ctx.stroke();
    ctx.lineWidth = 1.6;
    ctx.strokeStyle = ink;
    ctx.font = "12px sans-serif";
    ctx.fillStyle = teal;
    for (const seg of segs) {
      const a = points[seg.a];
      const b = points[seg.b];
      if (!a || !b) continue;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
      const len = (Math.hypot(b.x - a.x, b.y - a.y) / 24).toFixed(1);
      ctx.fillText(len, (a.x + b.x) / 2 + 6, (a.y + b.y) / 2 - 6);
    }
    points.forEach((point, index) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, pending.includes(index) ? 7 : 5, 0, Math.PI * 2);
      ctx.fillStyle = pending.includes(index) ? teal : ink;
      ctx.fill();
      ctx.fillStyle = ink;
      ctx.fillText(point.name, point.x + 8, point.y - 8);
    });
  }, [points, segs, pending]);

  function addPoint(x: number, y: number, force = false): number {
    const list = pointsRef.current;
    const hit = nearIndex(list, x, y, 14);
    if (hit >= 0 && !force) return hit;
    const name = NAMES[list.length] ?? `P${list.length + 1}`;
    const next = [...list, { x, y, name }];
    pointsRef.current = next;
    setPoints(next);
    return next.length - 1;
  }

  function link(i: number, j: number) {
    if (i === j) return;
    const a = Math.min(i, j);
    const b = Math.max(i, j);
    setSegs((current) => current.some((seg) => seg.a === a && seg.b === b) ? current : [...current, { a, b }]);
  }

  function onPointerDown(event: ReactPointerEvent<HTMLCanvasElement>) {
    const node = canvas.current;
    if (!node) return;
    const box = node.getBoundingClientRect();
    const x = event.clientX - box.left;
    const y = event.clientY - box.top;
    if (tool === "move") {
      drag.current = nearIndex(points, x, y, 18);
      return;
    }
    if (tool === "point") {
      addPoint(x, y);
      return;
    }
    const index = addPoint(x, y);
    const next = [...pending, index];
    const need = tool === "perp" ? 3 : 2;
    if (next.length < need) {
      setPending(next);
      return;
    }
    const [i, j, k] = next;
    if (tool === "seg" && j !== undefined) link(i!, j);
    if (tool === "mid" && j !== undefined) {
      const a = pointsRef.current[i!];
      const b = pointsRef.current[j];
      if (a && b) {
        const mid = midpoint(a, b);
        const made = addPoint(mid.x, mid.y, true);
        link(i!, made);
        link(made, j);
      }
    }
    if (tool === "perp" && j !== undefined && k !== undefined) {
      const a = pointsRef.current[i!];
      const b = pointsRef.current[j];
      const c = pointsRef.current[k];
      if (a && b && c) {
        const hit = foot(a, b, c);
        const made = addPoint(hit.x, hit.y, true);
        link(k, made);
      }
    }
    setPending([]);
  }

  function onPointerMove(event: ReactPointerEvent<HTMLCanvasElement>) {
    if (drag.current === null || tool !== "move") return;
    const node = canvas.current;
    if (!node) return;
    const box = node.getBoundingClientRect();
    const x = event.clientX - box.left;
    const y = event.clientY - box.top;
    const index = drag.current;
    const next = pointsRef.current.map((point, i) => i === index ? { ...point, x, y } : point);
    pointsRef.current = next;
    setPoints(next);
  }

  const hint = TOOLS.find((item) => item.id === tool)?.hint ?? "";
  return (
    <div className="workshop">
      <div className="read-switch" role="toolbar" aria-label="Công cụ dựng hình">
        {TOOLS.map((item) => (
          <button key={item.id} type="button" aria-pressed={tool === item.id} onClick={() => { setTool(item.id); setPending([]); }}>
            {item.label}
          </button>
        ))}
        <button type="button" onClick={() => { pointsRef.current = []; setPoints([]); setSegs([]); setPending([]); }}>Xóa hình</button>
      </div>
      <canvas
        ref={canvas}
        className="plane-canvas"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={() => { drag.current = null; }}
        onPointerLeave={() => { drag.current = null; }}
      />
      <p className="lecture-note">{hint} Độ dài ghi theo ô lưới. Hình khối 3D vẫn ở chuyên đề Hình.</p>
    </div>
  );
}
