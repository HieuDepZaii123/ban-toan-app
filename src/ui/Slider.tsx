import { useId } from "react";
import { fmt, snap } from "../lib/format.ts";
import { toTex } from "../lib/tex.ts";
import { MathText } from "./MathText.tsx";

export function Slider({
  label,
  value,
  min,
  max,
  step,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  onChange: (value: number) => void;
}) {
  const id = useId();
  const shown = Math.min(max, Math.max(min, value));
  return (
    <div className="slider">
      <div className="slider-top">
        <label htmlFor={id}><MathText text={toTex(label)} /></label>
        <output htmlFor={id}>
          <MathText text={toTex(`${fmt(shown)}${suffix ?? ""}`)} />
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={shown}
        onChange={(event) => onChange(snap(Number(event.target.value), step, min, max))}
      />
    </div>
  );
}
