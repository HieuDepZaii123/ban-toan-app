import type { ReactNode } from "react";
import type { Picture, Tone } from "../content/grades/pictures.ts";
import { pictureInEnglish } from "../content/grades/en/pictures.ts";

/** Chọn chữ theo ngôn ngữ đang hiển thị: tr(tiếng Việt, tiếng Anh). */
type Tr = (vi: string, en: string) => string;

const W = 320;
const H = 150;

function Dot({ x, y, r = 9, tone, gone }: { x: number; y: number; r?: number; tone: Tone; gone?: boolean }) {
  return (
    <g className={gone ? "pic-gone" : undefined}>
      <circle cx={x} cy={y} r={r} className={`pic-${tone}`} />
      {gone ? <line x1={x - r} y1={y - r} x2={x + r} y2={y + r} className="pic-cross" /> : null}
    </g>
  );
}

function Label({ x, y, children, anchor = "middle", size = 13 }: { x: number; y: number; children: ReactNode; anchor?: "start" | "middle" | "end"; size?: number }) {
  return <text x={x} y={y} textAnchor={anchor} fontSize={size} className="pic-text">{children}</text>;
}

function Groups({ spec, tr }: { spec: Extract<Picture, { k: "groups" }>; tr: Tr }) {
  const total = spec.items.reduce((s, g) => s + g.n, 0);
  const gap = Math.min(30, (W - 60) / Math.max(total + spec.items.length, 1));
  let x = (W - gap * (total + spec.items.length - 1)) / 2;
  const out: ReactNode[] = [];
  spec.items.forEach((group, gi) => {
    if (gi > 0) {
      out.push(<Label key={`op${gi}`} x={x} y={80} size={20}>{spec.op ?? "·"}</Label>);
      x += gap;
    }
    for (let i = 0; i < group.n; i += 1) {
      out.push(<Dot key={`${gi}-${i}`} x={x} y={74} r={Math.min(11, gap * 0.4)} tone={group.tone} gone={i >= group.n - (group.gone ?? 0)} />);
      x += gap;
    }
  });
  const left = spec.items.reduce((s, g) => s + g.n - (g.gone ?? 0), 0);
  return (
    <>
      {out}
      <Label x={W / 2} y={128}>{spec.op === "-" ? tr(`Còn lại ${left}`, `Left ${left}`) : tr(`Tất cả ${total}`, `Altogether ${total}`)}</Label>
    </>
  );
}

function Rows({ spec }: { spec: Extract<Picture, { k: "rows" }> }) {
  const gap = 26;
  return (
    <>
      {spec.rows.map((row, ri) => (
        <g key={row.name}>
          <Label x={44} y={48 + ri * 48} anchor="end">{row.name}</Label>
          {Array.from({ length: row.n }, (_, i) => <Dot key={i} x={66 + i * gap} y={44 + ri * 48} tone={row.tone} />)}
        </g>
      ))}
    </>
  );
}

/** Tấm trăm, bó chục và que lẻ của một hoặc hai số. */
function Place({ spec, tr }: { spec: Extract<Picture, { k: "place" }>; tr: Tr }) {
  const band = W / spec.numbers.length;
  return (
    <>
      {spec.numbers.map((value, ni) => {
        const h = Math.floor(value / 100), t = Math.floor((value % 100) / 10), o = value % 10;
        const items: ReactNode[] = [];
        let x = ni * band + 10;
        for (let i = 0; i < h; i += 1, x += 26) items.push(<rect key={`h${i}`} x={x} y={28} width={22} height={70} rx={3} className="pic-purple" />);
        for (let i = 0; i < t; i += 1, x += 11) items.push(<rect key={`t${i}`} x={x} y={28} width={8} height={70} rx={2} className="pic-blue" />);
        x += 4;
        for (let i = 0; i < o; i += 1, x += 9) items.push(<rect key={`o${i}`} x={x} y={84} width={6} height={14} rx={1.5} className="pic-orange" />);
        return (
          <g key={value}>
            {items}
            <Label x={ni * band + band / 2} y={124} size={16}>{value}</Label>
            <Label x={ni * band + band / 2} y={142} size={11}>{[h ? tr(`${h} trăm`, `${h} hundreds`) : "", tr(`${t} chục`, `${t} tens`), tr(`${o} lẻ`, `${o} ones`)].filter(Boolean).join(", ")}</Label>
          </g>
        );
      })}
    </>
  );
}

function Clock({ spec }: { spec: Extract<Picture, { k: "clock" }> }) {
  const cx = W / 2, cy = 72, r = 58;
  const hourAngle = ((spec.h % 12) + spec.m / 60) * 30 - 90;
  const minuteAngle = spec.m * 6 - 90;
  const hand = (angle: number, len: number): [number, number] => [cx + len * Math.cos((angle * Math.PI) / 180), cy + len * Math.sin((angle * Math.PI) / 180)];
  const [hx, hy] = hand(hourAngle, 30);
  const [mx, my] = hand(minuteAngle, 48);
  return (
    <>
      <circle cx={cx} cy={cy} r={r} className="pic-face" />
      {Array.from({ length: 12 }, (_, i) => {
        const [x, y] = hand(i * 30 - 60, r - 12);
        return <Label key={i} x={x} y={y + 4} size={11}>{i + 1}</Label>;
      })}
      <line x1={cx} y1={cy} x2={hx} y2={hy} className="pic-hand pic-hand-hour" />
      <line x1={cx} y1={cy} x2={mx} y2={my} className="pic-hand" />
      <circle cx={cx} cy={cy} r={4} className="pic-red" />
      <Label x={cx + r + 30} y={cy + 4}>{`${spec.h}:${String(spec.m).padStart(2, "0")}`}</Label>
    </>
  );
}

function Ruler({ spec }: { spec: Extract<Picture, { k: "ruler" }> }) {
  const left = 20, right = W - 20, scale = (right - left) / spec.max;
  const every = spec.max > 20 ? 10 : 1;
  return (
    <>
      <rect x={left} y={96} width={right - left} height={26} rx={3} className="pic-ruler" />
      {Array.from({ length: spec.max / every + 1 }, (_, i) => (
        <g key={i}>
          <line x1={left + i * every * scale} y1={96} x2={left + i * every * scale} y2={104} className="pic-tick" />
          {i % (spec.max > 20 ? 2 : 3) === 0 ? <Label x={left + i * every * scale} y={118} size={9}>{i * every}</Label> : null}
        </g>
      ))}
      {spec.marks.map((mark, i) => (
        <g key={mark.name}>
          <Label x={left} y={22 + i * 36} anchor="start" size={12}>{`${mark.name}: ${mark.cm} cm`}</Label>
          <rect x={left} y={28 + i * 36} width={mark.cm * scale} height={14} rx={7} className={`pic-${mark.tone}`} />
        </g>
      ))}
    </>
  );
}

function Bars({ spec }: { spec: Extract<Picture, { k: "bars" }> }) {
  const top = Math.max(...spec.values);
  const width = Math.min(60, (W - 60) / spec.values.length - 20);
  const tones: Tone[] = ["blue", "orange", "green", "purple", "red"];
  return (
    <>
      <line x1={30} y1={118} x2={W - 20} y2={118} className="pic-tick" />
      {spec.values.map((value, i) => {
        const h = (value / top) * 84;
        const x = 50 + i * ((W - 70) / spec.values.length);
        return (
          <g key={spec.labels[i]}>
            <rect x={x} y={118 - h} width={width} height={h} rx={4} className={`pic-${tones[i % tones.length]}`} />
            <Label x={x + width / 2} y={112 - h} size={12}>{`${value}${spec.unit ? ` ${spec.unit}` : ""}`}</Label>
            <Label x={x + width / 2} y={136} size={12}>{spec.labels[i]}</Label>
          </g>
        );
      })}
    </>
  );
}

function ArrayDots({ spec }: { spec: Extract<Picture, { k: "array" }> }) {
  const gap = Math.min(24, (W - 40) / spec.cols, 100 / spec.rows);
  const x0 = (W - gap * (spec.cols - 1)) / 2;
  return (
    <>
      {Array.from({ length: spec.rows }, (_, r) => Array.from({ length: spec.cols }, (_, c) => (
        <circle key={`${r}-${c}`} cx={x0 + c * gap} cy={18 + r * gap} r={Math.max(2.5, gap * 0.36)} className={r % 2 ? "pic-blue" : "pic-green"} />
      )))}
      <Label x={W / 2} y={140}>{`${spec.cols} × ${spec.rows} = ${spec.cols * spec.rows}`}</Label>
    </>
  );
}

function Share({ spec, tr }: { spec: Extract<Picture, { k: "share" }>; tr: Tr }) {
  const each = Math.floor(spec.total / spec.groups);
  const left = spec.total - each * spec.groups;
  const boxW = (W - 20 - (left ? 50 : 0)) / spec.groups;
  return (
    <>
      {Array.from({ length: spec.groups }, (_, g) => (
        <g key={g}>
          <rect x={10 + g * boxW + 3} y={14} width={boxW - 6} height={100} rx={8} className="pic-box" />
          {Array.from({ length: each }, (_, i) => (
            <circle key={i} cx={10 + g * boxW + boxW / 2 + ((i % 2) - 0.5) * 14} cy={30 + Math.floor(i / 2) * 15} r={5.5} className="pic-orange" />
          ))}
        </g>
      ))}
      {Array.from({ length: left }, (_, i) => <circle key={`l${i}`} cx={W - 30} cy={30 + i * 15} r={5.5} className="pic-red" />)}
      <Label x={W / 2} y={138}>{left ? `${spec.total} : ${spec.groups} = ${each}, ${tr("dư", "remainder")} ${left}` : `${spec.total} : ${spec.groups} = ${each}`}</Label>
    </>
  );
}

function Grid({ spec, tr }: { spec: Extract<Picture, { k: "grid" }>; tr: Tr }) {
  const s = Math.min(22, 100 / spec.h);
  const x0 = (W - s * spec.w) / 2;
  return (
    <>
      {Array.from({ length: spec.h }, (_, r) => Array.from({ length: spec.w }, (_, c) => (
        <rect key={`${r}-${c}`} x={x0 + c * s} y={12 + r * s} width={s} height={s} className={spec.outline ? "pic-cell-soft" : "pic-cell"} />
      )))}
      {spec.outline ? <rect x={x0} y={12} width={s * spec.w} height={s * spec.h} className="pic-outline" /> : null}
      <Label x={W / 2} y={12 + s * spec.h + 18} size={12}>{`${spec.w} ${spec.unit}`}</Label>
      <Label x={x0 - 8} y={12 + (s * spec.h) / 2 + 4} anchor="end" size={12}>{`${spec.h} ${spec.unit}`}</Label>
      <Label x={W / 2} y={142}>{spec.outline ? `${tr("Chu vi", "Perimeter")} = (${spec.w} + ${spec.h}) × 2 = ${(spec.w + spec.h) * 2} ${spec.unit}` : `${spec.w} × ${spec.h} = ${spec.w * spec.h} ${tr("ô vuông", "squares")}`}</Label>
    </>
  );
}

function Path({ spec }: { spec: Extract<Picture, { k: "path" }> }) {
  const total = spec.lengths.reduce((s, v) => s + v, 0);
  const scale = (W - 60) / total;
  let x = 30, y = 100;
  const pts: [number, number][] = [[x, y]];
  spec.lengths.forEach((len, i) => {
    x += len * scale;
    y = i % 2 === 0 ? 40 : 100;
    pts.push([x, y]);
  });
  return (
    <>
      <polyline points={pts.map((p) => p.join(",")).join(" ")} className="pic-path" />
      {pts.map(([px, py], i) => <circle key={i} cx={px} cy={py} r={4} className="pic-blue" />)}
      {spec.lengths.map((len, i) => {
        const [ax, ay] = pts[i] as [number, number];
        const [bx, by] = pts[i + 1] as [number, number];
        return <Label key={i} x={(ax + bx) / 2} y={(ay + by) / 2 - 8} size={12}>{`${len} ${spec.unit}`}</Label>;
      })}
      <Label x={W / 2} y={140}>{`${spec.lengths.join(" + ")} = ${total} ${spec.unit}`}</Label>
    </>
  );
}

function CircleRadius({ spec, tr }: { spec: Extract<Picture, { k: "circle" }>; tr: Tr }) {
  const cx = W / 2, cy = 66, r = 52;
  return (
    <>
      <circle cx={cx} cy={cy} r={r} className="pic-face" />
      <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} className="pic-hand pic-dash" />
      <line x1={cx} y1={cy} x2={cx + r * 0.6} y2={cy - r * 0.8} className="pic-hand" />
      <circle cx={cx} cy={cy} r={4} className="pic-red" />
      <Label x={cx - 8} y={cy + 16} size={12}>O</Label>
      <Label x={cx + r + 8} y={cy - 30} anchor="start" size={12}>{`${tr("bán kính", "radius")} ${spec.r} ${spec.unit}`}</Label>
      <Label x={W / 2} y={140}>{`${tr("đường kính", "diameter")} = ${spec.r} × 2 = ${spec.r * 2} ${spec.unit}`}</Label>
    </>
  );
}

function Shapes({ tr }: { tr: Tr }) {
  return (
    <>
      <circle cx={42} cy={64} r={28} className="pic-orange" />
      <polygon points="118,36 90,92 146,92" className="pic-green" />
      <rect x={168} y={36} width={56} height={56} rx={2} className="pic-blue" />
      <rect x={240} y={46} width={66} height={40} rx={2} className="pic-purple" />
      <Label x={42} y={124} size={11}>{tr("tròn", "circle")}</Label>
      <Label x={118} y={124} size={11}>{tr("tam giác", "triangle")}</Label>
      <Label x={196} y={124} size={11}>{tr("vuông", "square")}</Label>
      <Label x={273} y={124} size={11}>{tr("chữ nhật", "rectangle")}</Label>
    </>
  );
}

function Solids({ tr }: { tr: Tr }) {
  return (
    <>
      <ellipse cx={60} cy={34} rx={30} ry={10} className="pic-blue" />
      <rect x={30} y={34} width={60} height={62} className="pic-blue" />
      <ellipse cx={60} cy={96} rx={30} ry={10} className="pic-blue" />
      <circle cx={160} cy={66} r={36} className="pic-orange" />
      <ellipse cx={160} cy={66} rx={36} ry={11} className="pic-band" />
      <polygon points="232,40 300,52 288,100 240,92" className="pic-green" />
      <Label x={60} y={130} size={11}>{tr("khối trụ", "cylinder")}</Label>
      <Label x={160} y={130} size={11}>{tr("khối cầu", "sphere")}</Label>
      <Label x={266} y={130} size={11}>{tr("tứ giác", "quadrilateral")}</Label>
    </>
  );
}

function Parts({ spec, tr }: { spec: Extract<Picture, { k: "parts" }>; tr: Tr }) {
  const band = W / spec.parts.length;
  const r = Math.min(44, band / 2 - 10);
  return (
    <>
      {spec.parts.map((n, i) => {
        const cx = band * i + band / 2, cy = 62;
        const slice = (2 * Math.PI) / n;
        const x1 = cx + r * Math.sin(0), y1 = cy - r * Math.cos(0);
        const x2 = cx + r * Math.sin(slice), y2 = cy - r * Math.cos(slice);
        return (
          <g key={n}>
            <circle cx={cx} cy={cy} r={r} className="pic-face" />
            <path d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${slice > Math.PI ? 1 : 0} 1 ${x2},${y2} Z`} className="pic-orange" />
            {Array.from({ length: n }, (_, k) => (
              <line key={k} x1={cx} y1={cy} x2={cx + r * Math.sin(k * slice)} y2={cy - r * Math.cos(k * slice)} className="pic-tick" />
            ))}
            <Label x={cx} y={cy + r + 22} size={13}>{tr(`một phần ${["", "", "hai", "ba", "tư", "năm", "sáu", "bảy", "tám", "chín"][n] ?? n}`, `one ${["", "", "half", "third", "quarter", "fifth", "sixth", "seventh", "eighth", "ninth"][n] ?? `part of ${n}`}`)}</Label>
          </g>
        );
      })}
    </>
  );
}

function NumberLine({ spec }: { spec: Extract<Picture, { k: "line" }> }) {
  const left = 24, right = W - 24, scale = (right - left) / (spec.to - spec.from);
  const at = (v: number) => left + (v - spec.from) * scale;
  return (
    <>
      <line x1={left} y1={80} x2={right} y2={80} className="pic-hand" />
      {Array.from({ length: Math.round((spec.to - spec.from) / spec.step) + 1 }, (_, i) => {
        const v = spec.from + i * spec.step;
        return (
          <g key={v}>
            <line x1={at(v)} y1={74} x2={at(v)} y2={86} className="pic-tick" />
            <Label x={at(v)} y={104} size={10}>{v}</Label>
          </g>
        );
      })}
      {spec.marks.map((mark) => (
        <g key={mark.name}>
          <circle cx={at(mark.at)} cy={80} r={7} className="pic-red" />
          <Label x={at(mark.at)} y={60} size={14}>{mark.name}</Label>
        </g>
      ))}
    </>
  );
}

function Calendar({ spec, tr }: { spec: Extract<Picture, { k: "calendar" }>; tr: Tr }) {
  const s = 18;
  const x0 = (W - s * 7) / 2;
  return (
    <>
      {Array.from({ length: spec.days }, (_, i) => (
        <g key={i}>
          <rect x={x0 + (i % 7) * s} y={8 + Math.floor(i / 7) * s} width={s - 2} height={s - 2} rx={3} className={i < spec.past ? "pic-orange" : "pic-cell"} />
          <Label x={x0 + (i % 7) * s + (s - 2) / 2} y={8 + Math.floor(i / 7) * s + 12} size={8}>{i + 1}</Label>
        </g>
      ))}
      <Label x={W / 2} y={140}>{tr(`Đã qua ${spec.past} ngày, còn ${spec.days - spec.past} ngày`, `${spec.past} days gone, ${spec.days - spec.past} days left`)}</Label>
    </>
  );
}

function Tiles({ spec }: { spec: Extract<Picture, { k: "tiles" }> }) {
  const w = (W - 20) / spec.items.length;
  return (
    <>
      {spec.items.map((item, i) => (
        <g key={`${item.top}-${i}`}>
          <rect x={10 + i * w + 3} y={24} width={w - 6} height={96} rx={10} className="pic-box" />
          <Label x={10 + i * w + w / 2} y={56} size={item.top.length > 6 ? 10 : 16}>{item.top}</Label>
          <Label x={10 + i * w + w / 2} y={98} size={20}>{item.bottom}</Label>
        </g>
      ))}
    </>
  );
}

export function LessonPicture({ spec: source, english = false }: { spec: Picture; english?: boolean }) {
  const spec = english ? pictureInEnglish(source) : source;
  const tr: Tr = (vi, en) => (english ? en : vi);
  return (
    <svg className="lesson-picture" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={spec.alt}>
      {spec.k === "groups" ? <Groups spec={spec} tr={tr} /> : null}
      {spec.k === "rows" ? <Rows spec={spec} /> : null}
      {spec.k === "place" ? <Place spec={spec} tr={tr} /> : null}
      {spec.k === "clock" ? <Clock spec={spec} /> : null}
      {spec.k === "ruler" ? <Ruler spec={spec} /> : null}
      {spec.k === "bars" ? <Bars spec={spec} /> : null}
      {spec.k === "array" ? <ArrayDots spec={spec} /> : null}
      {spec.k === "share" ? <Share spec={spec} tr={tr} /> : null}
      {spec.k === "grid" ? <Grid spec={spec} tr={tr} /> : null}
      {spec.k === "path" ? <Path spec={spec} /> : null}
      {spec.k === "circle" ? <CircleRadius spec={spec} tr={tr} /> : null}
      {spec.k === "shapes" ? <Shapes tr={tr} /> : null}
      {spec.k === "solids" ? <Solids tr={tr} /> : null}
      {spec.k === "parts" ? <Parts spec={spec} tr={tr} /> : null}
      {spec.k === "line" ? <NumberLine spec={spec} /> : null}
      {spec.k === "calendar" ? <Calendar spec={spec} tr={tr} /> : null}
      {spec.k === "tiles" ? <Tiles spec={spec} /> : null}
    </svg>
  );
}
