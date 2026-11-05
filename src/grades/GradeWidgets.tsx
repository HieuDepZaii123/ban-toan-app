import { useState } from "react";
import type { GradeWidget } from "../content/grades/types.ts";

export function GradeWidgetView({ kind }: { kind: GradeWidget }) {
  if (kind === "fraction") return <FractionBar />;
  if (kind === "line") return <NumberLine />;
  if (kind === "linear") return <LinearSlider />;
  return <QuadraticSlider />;
}

function FractionBar() {
  const [parts, setParts] = useState(4);
  const [filled, setFilled] = useState(1);
  const safeFilled = Math.min(filled, parts);
  const width = 280 / parts;
  return (
    <div className="grade-widget">
      <p className="lecture-note">Thanh phần: tô một số phần bằng nhau.</p>
      <svg viewBox="0 0 280 48" role="img" aria-label={`Đã tô ${safeFilled} trên ${parts} phần bằng nhau`}>
        {Array.from({ length: parts }, (_, index) => (
          <rect key={index} x={index * width + 1} y="8" width={Math.max(width - 2, 1)} height="32" className="grade-stroke" fill={index < safeFilled ? "var(--accent)" : "none"} />
        ))}
      </svg>
      <label className="grade-ask">
        Số phần bằng nhau
        <input type="range" min={1} max={8} value={parts} aria-valuemin={1} aria-valuemax={8} aria-valuenow={parts} onChange={(event) => setParts(Number(event.target.value))} />
      </label>
      <label className="grade-ask">
        Số phần được tô
        <input type="range" min={0} max={parts} value={safeFilled} aria-valuemin={0} aria-valuemax={parts} aria-valuenow={safeFilled} onChange={(event) => setFilled(Number(event.target.value))} />
      </label>
      <p>Đang tô {safeFilled} phần trong {parts} phần bằng nhau.</p>
    </div>
  );
}

function NumberLine() {
  const [value, setValue] = useState(0);
  const x = 20 + ((value + 5) / 10) * 240;
  return (
    <div className="grade-widget">
      <p className="lecture-note">Trục số từ −5 đến 5.</p>
      <svg viewBox="0 0 280 64" role="img" aria-label={`Điểm đang chọn là ${value}`}>
        <line x1="20" y1="32" x2="260" y2="32" className="grade-stroke" />
        {Array.from({ length: 11 }, (_, index) => {
          const tick = 20 + index * 24;
          return <line key={tick} x1={tick} y1="26" x2={tick} y2="38" className="grade-stroke" />;
        })}
        <circle cx={x} cy="32" r="7" className="grade-ink" />
      </svg>
      <label className="grade-ask">
        Chọn số
        <input type="range" min={-5} max={5} step={1} value={value} aria-valuemin={-5} aria-valuemax={5} aria-valuenow={value} onChange={(event) => setValue(Number(event.target.value))} />
      </label>
      <p>Số đang chọn là {value}.</p>
    </div>
  );
}

function LinearSlider() {
  const [a, setA] = useState(2);
  const [b, setB] = useState(1);
  const points = [-2, -1, 0, 1, 2].map((x) => ({ x, y: a * x + b }));
  return (
    <div className="grade-widget">
      <p className="lecture-note">Đồ thị của hàm số bậc nhất khi đổi hệ số.</p>
      <Graph points={points} label={`Đồ thị y bằng ${a} x cộng ${b}`} />
      <label className="grade-ask">
        Hệ số a
        <input type="range" min={-3} max={3} step={1} value={a} aria-valuemin={-3} aria-valuemax={3} aria-valuenow={a} onChange={(event) => setA(Number(event.target.value))} />
      </label>
      <label className="grade-ask">
        Số hạng b
        <input type="range" min={-3} max={3} step={1} value={b} aria-valuemin={-3} aria-valuemax={3} aria-valuenow={b} onChange={(event) => setB(Number(event.target.value))} />
      </label>
      <p>Tại x bằng 1, y bằng {a + b}.</p>
    </div>
  );
}

function QuadraticSlider() {
  const [a, setA] = useState(1);
  const points = [-2, -1, 0, 1, 2].map((x) => ({ x, y: a * x * x }));
  return (
    <div className="grade-widget">
      <p className="lecture-note">Đồ thị của y bằng a x bình khi đổi hệ số a.</p>
      <Graph points={points} label={`Đồ thị y bằng ${a} x bình`} />
      <label className="grade-ask">
        Hệ số a
        <input type="range" min={-2} max={2} step={1} value={a} aria-valuemin={-2} aria-valuemax={2} aria-valuenow={a} onChange={(event) => setA(Number(event.target.value))} />
      </label>
      <p>Tại x bằng 2, y bằng {a * 4}. Đỉnh vẫn ở gốc tọa độ.</p>
    </div>
  );
}

function Graph({ points, label }: { points: { x: number; y: number }[]; label: string }) {
  const max = Math.max(4, ...points.map((point) => Math.abs(point.y)));
  const xy = points.map((point) => {
    const x = 140 + point.x * 40;
    const y = 70 - (point.y / max) * 50;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 280 140" role="img" aria-label={label}>
      <line x1="20" y1="70" x2="260" y2="70" className="grade-stroke" />
      <line x1="140" y1="12" x2="140" y2="128" className="grade-stroke" />
      <polyline points={xy} className="grade-stroke" fill="none" />
    </svg>
  );
}
