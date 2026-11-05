import type { FigureKind } from "../content/grades/types.ts";

const LABEL: Record<FigureKind, string> = {
  count: "Năm chấm tròn xếp thành một nhóm",
  segment: "Một đoạn thẳng có hai đầu mút",
  angle: "Một góc tạo bởi hai tia",
  triangle: "Một hình tam giác",
  rect: "Một hình chữ nhật",
  circle: "Một hình tròn",
  bar: "Ba cột cao dần",
};

export function GradeFigure({ kind }: { kind: FigureKind }) {
  return (
    <svg className="grade-figure" viewBox="0 0 160 88" role="img" aria-label={LABEL[kind]}>
      {kind === "count" ? <CountDots /> : null}
      {kind === "segment" ? <Segment /> : null}
      {kind === "angle" ? <AngleMark /> : null}
      {kind === "triangle" ? <Triangle /> : null}
      {kind === "rect" ? <Rect /> : null}
      {kind === "circle" ? <CircleMark /> : null}
      {kind === "bar" ? <Bars /> : null}
    </svg>
  );
}

function CountDots() {
  const xs = [28, 52, 76, 100, 124];
  return (
    <>
      {xs.map((x) => <circle key={x} cx={x} cy={44} r={10} className="grade-ink" />)}
    </>
  );
}

function Segment() {
  return (
    <>
      <line x1="24" y1="44" x2="136" y2="44" className="grade-stroke" />
      <circle cx="24" cy="44" r="5" className="grade-ink" />
      <circle cx="136" cy="44" r="5" className="grade-ink" />
    </>
  );
}

function AngleMark() {
  return (
    <>
      <line x1="28" y1="68" x2="132" y2="68" className="grade-stroke" />
      <line x1="28" y1="68" x2="110" y2="22" className="grade-stroke" />
      <path d="M48 68 A20 20 0 0 0 42 52" className="grade-stroke" fill="none" />
    </>
  );
}

function Triangle() {
  return <polygon points="80,16 28,72 132,72" className="grade-stroke" fill="none" />;
}

function Rect() {
  return <rect x="36" y="18" width="88" height="52" className="grade-stroke" fill="none" />;
}

function CircleMark() {
  return <circle cx="80" cy="44" r="28" className="grade-stroke" fill="none" />;
}

function Bars() {
  return (
    <>
      <rect x="28" y="48" width="24" height="24" className="grade-ink" />
      <rect x="68" y="32" width="24" height="40" className="grade-ink" />
      <rect x="108" y="16" width="24" height="56" className="grade-ink" />
    </>
  );
}
