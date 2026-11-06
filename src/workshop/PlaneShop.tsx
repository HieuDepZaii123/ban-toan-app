import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { t } from "../lib/text.ts";
import { useLang } from "../ui/useLang.ts";
import { foot, midpoint, nearIndex, type Pt } from "./plane.ts";
import { withoutPoint, withoutSeg, type SegRef } from "./select.ts";

type Tool = "chon" | "move" | "point" | "seg" | "mid" | "perp";
type Named = Pt & { name: string };
type Sel = { kind: "point"; index: number } | { kind: "seg"; index: number };

const TOOLS: { id: Tool; vi: string; en: string; hintVi: string; hintEn: string }[] = [
  { id: "chon", vi: "Chọn", en: "Select", hintVi: "Chạm một điểm hoặc một đoạn để tô sáng.", hintEn: "Tap a point or a segment to highlight it." },
  { id: "move", vi: "Kéo", en: "Drag", hintVi: "Kéo một điểm đã dựng.", hintEn: "Drag a point you already placed." },
  { id: "point", vi: "Điểm", en: "Point", hintVi: "Chạm lên lưới để đặt điểm.", hintEn: "Tap the grid to place a point." },
  { id: "seg", vi: "Đoạn", en: "Segment", hintVi: "Chọn hai điểm để nối đoạn.", hintEn: "Pick two points to draw a segment." },
  { id: "mid", vi: "Trung điểm", en: "Midpoint", hintVi: "Chọn hai điểm. Trung điểm hiện ra và nối vào đoạn.", hintEn: "Pick two points. The midpoint appears on the segment." },
  { id: "perp", vi: "Vuông góc", en: "Perpendicular", hintVi: "Chọn hai điểm của đường, rồi điểm cần hạ vuông góc.", hintEn: "Pick two points of a line, then the point to drop a perpendicular from." },
];
const NAMES = "ABCDEFGHJKLMNPQRSTUVWXYZ";

export function PlaneShop() {
  const lang = useLang();
  const canvas = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Named[]>([]);
  const [tool, setTool] = useState<Tool>("point");
  const [points, setPoints] = useState<Named[]>([]);
  const [segs, setSegs] = useState<SegRef[]>([]);
  const [pending, setPending] = useState<number[]>([]);
  const [selected, setSelected] = useState<Sel | null>(null);
  const drag = useRef<number | null>(null);

  useEffect(() => {
    const node = canvas.current;
    if (!node) return;
    const ctx = node.getContext("2d");
    if (!ctx) return;
    const paint = () => {
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
    ctx.font = "12px sans-serif";
    ctx.fillStyle = teal;
    segs.forEach((seg, index) => {
      const a = points[seg.a];
      const b = points[seg.b];
      if (!a || !b) return;
      const on = selected?.kind === "seg" && selected.index === index;
      ctx.lineWidth = on ? 4 : 1.6;
      ctx.strokeStyle = on ? teal : ink;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const span = Math.hypot(dx, dy) || 1;
      const len = (span / 24).toFixed(1);
      ctx.fillStyle = ink;
      ctx.fillText(len, (a.x + b.x) / 2 + (-dy / span) * 14, (a.y + b.y) / 2 + (dx / span) * 14);
    });
    points.forEach((point, index) => {
      const on = selected?.kind === "point" && selected.index === index;
      const grouped = selected?.kind === "seg" && (segs[selected.index]?.a === index || segs[selected.index]?.b === index);
      ctx.beginPath();
      ctx.arc(point.x, point.y, on || grouped ? 8 : 5, 0, Math.PI * 2);
      ctx.fillStyle = pending.includes(index) || on ? teal : ink;
      ctx.fill();
      if (on || grouped) {
        ctx.strokeStyle = teal;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      ctx.fillStyle = ink;
      ctx.fillText(point.name, point.x + 12, point.y - 12 - (index % 3) * 11);
    });
    };
    paint();
    const observer = new ResizeObserver(() => paint());
    observer.observe(node);
    return () => observer.disconnect();
  }, [points, segs, pending, selected]);

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

  function pickAt(x: number, y: number): Sel | null {
    let bestSeg = -1;
    let bestDist = 12;
    segs.forEach((seg, index) => {
      const a = points[seg.a];
      const b = points[seg.b];
      if (!a || !b) return;
      const vx = b.x - a.x;
      const vy = b.y - a.y;
      const den = vx * vx + vy * vy;
      const t = den === 0 ? 0 : Math.max(0, Math.min(1, ((x - a.x) * vx + (y - a.y) * vy) / den));
      const dist = Math.hypot(a.x + t * vx - x, a.y + t * vy - y);
      if (dist < bestDist) {
        bestDist = dist;
        bestSeg = index;
      }
    });
    const point = nearIndex(points, x, y, 16);
    if (point >= 0) return { kind: "point", index: point };
    if (bestSeg >= 0) return { kind: "seg", index: bestSeg };
    return null;
  }

  function removeSelected() {
    if (!selected) return;
    if (selected.kind === "point") {
      const nextPoints = points.filter((_, index) => index !== selected.index);
      pointsRef.current = nextPoints;
      setPoints(nextPoints);
      setSegs(withoutPoint(segs, selected.index));
    } else {
      setSegs(withoutSeg(segs, selected.index));
    }
    setSelected(null);
    setPending([]);
  }

  function onPointerDown(event: ReactPointerEvent<HTMLCanvasElement>) {
    const node = canvas.current;
    if (!node) return;
    const box = node.getBoundingClientRect();
    const x = event.clientX - box.left;
    const y = event.clientY - box.top;
    if (tool === "chon") {
      setSelected(pickAt(x, y));
      return;
    }
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

  const currentTool = TOOLS.find((item) => item.id === tool);
  const hint = currentTool ? t(lang, currentTool.hintVi, currentTool.hintEn) : "";
  return (
    <div className="workshop">
      <div className="read-switch" role="toolbar" aria-label={t(lang, "Công cụ dựng hình", "Drawing tools")}>
        {TOOLS.map((item) => (
          <button key={item.id} type="button" aria-pressed={tool === item.id} onClick={() => { setTool(item.id); setPending([]); }}>
            {t(lang, item.vi, item.en)}
          </button>
        ))}
        <button type="button" disabled={selected === null} onClick={removeSelected}>{t(lang, "Xóa đang chọn", "Delete selection")}</button>
      </div>
      <canvas
        ref={canvas}
        className="plane-canvas"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={() => { drag.current = null; }}
        onPointerLeave={() => { drag.current = null; }}
      />
      <p className="lecture-note">{hint} {selected ? t(lang, "Đang chọn một thành phần. Xóa chỉ xóa phần đó.", "One part is selected. Delete removes only that part.") : t(lang, "Chưa chọn thành phần.", "Nothing is selected.")} {t(lang, "Độ dài ghi theo ô lưới.", "Lengths are in grid squares.")}</p>
    </div>
  );
}
