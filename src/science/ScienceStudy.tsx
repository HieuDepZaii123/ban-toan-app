import { useState } from "react";
import type { ScienceId } from "./catalog.ts";
import { scienceLessons, type ScienceLayer } from "./lessons.ts";
import { MathText } from "../ui/MathText.tsx";

const LAYERS = [
  ["basic", "Cơ bản"],
  ["exam", "Chuẩn thi"],
  ["adv", "Nâng cao"],
] as const;

export function ScienceStudy({ id }: { id: ScienceId }) {
  const lesson = scienceLessons[id];
  const [layer, setLayer] = useState<(typeof LAYERS)[number][0]>("basic");
  return (
    <section className="sang-tao" aria-label="Bài luyện">
      <div className="read-switch" role="tablist" aria-label="Mức bài">
        {LAYERS.map(([key, label]) => (
          <button key={key} type="button" role="tab" aria-selected={layer === key} onClick={() => setLayer(key)}>
            {label}
          </button>
        ))}
      </div>
      <LayerBody key={layer} layer={lesson[layer]} />
    </section>
  );
}

function LayerBody({ layer }: { layer: ScienceLayer }) {
  const [open, setOpen] = useState(0);
  return (
    <>
      {layer.bits.map((bit) => <p key={bit}><MathText text={bit} /></p>)}
      {layer.code ? <pre className="code-block">{layer.code}</pre> : null}
      <p><b>Bài luyện.</b> <MathText text={layer.drill.q} /></p>
      <div className="read-switch">
        <button type="button" onClick={() => setOpen(open > 0 ? 0 : 1)}>Gợi ý</button>
        <button type="button" onClick={() => setOpen(layer.drill.steps.length)}>Lời giải</button>
      </div>
      {open > 0 ? (
        <ol className="steps">
          {layer.drill.steps.slice(0, open).map((step) => <li key={step}><MathText text={step} /></li>)}
        </ol>
      ) : null}
      {open > 0 && open < layer.drill.steps.length ? (
        <button type="button" className="text-btn" onClick={() => setOpen(open + 1)}>Bước tiếp</button>
      ) : null}
      {open >= layer.drill.steps.length ? <p><b>Đáp số:</b> <MathText text={layer.drill.answer} /></p> : null}
    </>
  );
}
