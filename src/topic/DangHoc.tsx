import { useState } from "react";
import { dangFor } from "../content/dang/index.ts";
import type { Drill, ReasonStep, Worked } from "../content/dang/types.ts";
import { MathText } from "../ui/MathText.tsx";

const KIND_LABEL: Record<Drill["kind"], string> = {
  luyen: "Tự luyện",
  "thuc-te": "Thực tế",
  "tu-ra-de": "Tự ra đề",
  mo: "Mở",
  "phan-bien": "Phản biện",
  doc: "Đọc bảng hoặc đồ thị",
  "uoc-luong": "Ước lượng",
};

export function DangHoc({ topicId }: { topicId: string }) {
  const pack = dangFor(topicId);
  if (!pack) return null;
  return (
    <section className="dang-hoc" aria-label="Dạng bài">
      <h2>Dạng bài</h2>
      <p className="lecture-note">Mỗi bước có lý do. Điều kiện cần thì phải thử lại.</p>
      {pack.dang.map((dang) => (
        <article key={dang.name} className="tool-card">
          <h3>{dang.name}</h3>
          <p><b>Nhận dạng.</b> <MathText text={dang.nhanDang} /></p>
          <p><b>Phương pháp.</b> <MathText text={dang.phuongPhap} /></p>
          <WorkedBlock item={dang.viDu} />
          <p><b>Lỗi hay gặp.</b> <MathText text={dang.loi} /></p>
          <DrillBlock item={dang.luyen} />
        </article>
      ))}
      <article className="tool-card">
        <h3>Câu sáng tạo và thực tế</h3>
        {pack.sangTao.map((item) => (
          <DrillBlock key={item.prompt} item={item} />
        ))}
      </article>
    </section>
  );
}

function WorkedBlock({ item }: { item: Worked }) {
  return (
    <div>
      <p><b>Ví dụ mẫu.</b> <MathText text={item.prompt} /></p>
      <Steps steps={item.steps} />
      <p><b>Kết luận.</b> <MathText text={item.ket} /></p>
    </div>
  );
}

function DrillBlock({ item }: { item: Drill }) {
  const [open, setOpen] = useState(false);
  const label = KIND_LABEL[item.kind];
  return (
    <div className="fitem">
      <p><b>{label}.</b> <MathText text={item.prompt} /></p>
      {item.sao ? <p className="lecture-note">Độ khó: {"★".repeat(item.sao)}{"☆".repeat(5 - item.sao)}</p> : null}
      <p><b>Nghĩ thế nào.</b> <MathText text={item.think} /></p>
      <button type="button" className="text-btn" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        {open ? "Ẩn lời giải" : "Xem lời giải"}
      </button>
      {open ? (
        <>
          <Steps steps={item.steps} />
          <p><b>Đáp số.</b> <MathText text={item.answer} /></p>
        </>
      ) : null}
    </div>
  );
}

function Steps({ steps }: { steps: ReasonStep[] }) {
  return (
    <ol className="steps">
      {steps.map((step) => (
        <li key={step.claim}>
          <MathText text={step.claim} />
          <span className="lecture-note"> Lý do: <MathText text={step.why} /></span>
        </li>
      ))}
    </ol>
  );
}
