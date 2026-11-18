import { topicById } from "../../content/catalog.ts";
import { A } from "../../lib/route.tsx";
import { useRoute } from "../../lib/useRoute.ts";
import { MathText } from "../../ui/MathText.tsx";
import { edgesOf, EDGES } from "./edges.ts";
import { useTx } from "./kit.ts";

const IDS = ["quadratic", "ineq", "exp", "sequence", "trig", "limit", "derivative", "survey", "integral", "vector", "analytic", "triangle", "combo", "probability"];

/** Bản đồ liên kết: mười bốn chuyên đề trên một vòng tròn; các mối nối của chuyên đề đang xem được tô đậm. */
export function TopicLinks({ topicId }: { topicId: string }) {
  const tt = useTx();
  const { go } = useRoute();
  const mine = edgesOf(topicId);
  const near = new Set(mine.flatMap((e) => [e.a, e.b]));
  const W = 780;
  const H = 400;
  const pos = (i: number) => ({ x: W / 2 + 230 * Math.cos((i / IDS.length) * 2 * Math.PI - Math.PI / 2), y: H / 2 + 150 * Math.sin((i / IDS.length) * 2 * Math.PI - Math.PI / 2) });
  const idx = (id: string) => IDS.indexOf(id);
  const name = (id: string) => { const t = topicById(id); return t ? tt(t.title, t.titleEn) : id; };
  return (
    <section className="fz-links" aria-labelledby="fz-links-title">
      <h3 id="fz-links-title">{tt("Chuyên đề này nối với đâu", "How this topic connects to the others")}</h3>
      <p className="fz-lead">{tt("Mười bốn chuyên đề không phải mười bốn hòn đảo. Đường đậm là những mối nối của chuyên đề đang xem; bấm vào một chuyên đề để sang đó.", "The fourteen topics are not fourteen islands. The bold lines are the connections of the topic you are viewing; click a topic to go there.")}</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="fz-map" role="img" aria-label={tt("Bản đồ liên kết các chuyên đề", "Map of the connections between topics")}>
        {EDGES.map((e) => {
          const p = pos(idx(e.a)); const q = pos(idx(e.b));
          const on = e.a === topicId || e.b === topicId;
          return <line key={e.a + e.b} x1={p.x} y1={p.y} x2={q.x} y2={q.y} className={on ? "fz-edge on" : "fz-edge"} />;
        })}
        {IDS.map((id, i) => {
          const p = pos(i);
          const cls = id === topicId ? "fz-node self" : near.has(id) ? "fz-node near" : "fz-node";
          const right = p.x >= W / 2;
          return (
            <g key={id} className={cls} role="button" tabIndex={0} aria-label={name(id)} onClick={() => go(`/t/${id}?tab=hoc`)} onKeyDown={(ev) => { if (ev.key === "Enter" || ev.key === " ") go(`/t/${id}?tab=hoc`); }}>
              <circle cx={p.x} cy={p.y} r={id === topicId ? 11 : 8} />
              <text x={p.x + (right ? 14 : -14)} y={p.y + 4} textAnchor={right ? "start" : "end"}>{name(id)}</text>
            </g>
          );
        })}
      </svg>
      <ul className="fz-edge-list">
        {mine.map((e) => {
          const other = e.a === topicId ? e.b : e.a;
          return (
            <li key={e.a + e.b}>
              <A href={`/t/${other}?tab=hoc`}>{name(other)}</A>: <MathText text={tt(e.vi, e.en)} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
