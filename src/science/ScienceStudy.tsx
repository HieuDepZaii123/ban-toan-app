import { useState } from "react";
import type { ScienceId } from "./catalog.ts";
import { scienceLessons, type ScienceDrill, type ScienceLayer } from "./lessons.ts";
import { scienceMore, type LayerKey, type MoreLayer } from "./more.ts";
import { scienceWorked, type ScienceWorked } from "./worked.ts";
import { MathText } from "../ui/MathText.tsx";
import { CodeTrace } from "./CodeTrace.tsx";
import { useLang } from "../ui/useLang.ts";

const LAYERS: readonly (readonly [LayerKey, string])[] = [
  ["basic", "Cơ bản"],
  ["exam", "Chuẩn thi"],
  ["adv", "Nâng cao"],
];

export function ScienceStudy({ id }: { id: ScienceId }) {
  const lesson = scienceLessons[id];
  const [layer, setLayer] = useState<LayerKey>("basic");
  return (
    <section className="sang-tao" aria-label="Bài luyện">
      <div className="read-switch" role="tablist" aria-label="Mức bài">
        {LAYERS.map(([key, label]) => (
          <button key={key} type="button" role="tab" aria-selected={layer === key} onClick={() => setLayer(key)}>
            {label}
          </button>
        ))}
      </div>
      <LayerBody key={layer} layer={lesson[layer]} more={scienceMore[id][layer]} worked={scienceWorked[id][layer]} />
    </section>
  );
}

function LayerBody({ layer, more, worked }: { layer: ScienceLayer; more: MoreLayer; worked: ScienceWorked }) {
  const lang = useLang();
  const drills = [layer.drill, ...more.drills];
  return (
    <>
      {[...layer.bits, ...more.bits].map((bit) => <p key={bit}><MathText text={bit} /></p>)}
      {layer.code ? <CodeTrace code={layer.code} lang={lang} /> : null}
      {more.code ? <CodeTrace code={more.code} lang={lang} /> : null}
      <WorkedBox worked={worked} />
      {drills.map((drill, index) => <DrillBox key={drill.q} drill={drill} label={`Bài luyện ${index + 1}.`} />)}
    </>
  );
}

function WorkedBox({ worked }: { worked: ScienceWorked }) {
  const lang = useLang();
  return (
    <div className="science-drill science-worked">
      <p><b>{lang === "en" ? "Worked example." : "Ví dụ có lời giải."}</b> <MathText text={worked.q} /></p>
      <ol className="steps">
        {worked.steps.map((step) => (
          <li key={step.claim}>
            <MathText text={step.claim} />
            <br /><small><MathText text={step.why} /></small>
          </li>
        ))}
      </ol>
      <p><b>{lang === "en" ? "Answer:" : "Đáp số:"}</b> <MathText text={worked.answer} /></p>
      <p><b>{lang === "en" ? "Common mistake:" : "Lỗi hay gặp:"}</b> <MathText text={worked.pitfall} /></p>
    </div>
  );
}

function DrillBox({ drill, label }: { drill: ScienceDrill; label: string }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="science-drill">
      <p><b>{label}</b> <MathText text={drill.q} /></p>
      <div className="read-switch">
        <button type="button" aria-expanded={open > 0} onClick={() => setOpen(open > 0 ? 0 : 1)}>Gợi ý</button>
        <button type="button" onClick={() => setOpen(drill.steps.length)}>Lời giải</button>
      </div>
      {open > 0 ? (
        <ol className="steps">
          {drill.steps.slice(0, open).map((step) => <li key={step}><MathText text={step} /></li>)}
        </ol>
      ) : null}
      {open > 0 && open < drill.steps.length ? (
        <button type="button" className="text-btn" onClick={() => setOpen(open + 1)}>Bước tiếp</button>
      ) : null}
      {open >= drill.steps.length ? <p><b>Đáp số:</b> <MathText text={drill.answer} /></p> : null}
    </div>
  );
}
