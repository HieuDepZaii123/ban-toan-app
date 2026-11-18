import { useMemo, useState } from "react";
import { reviewDue } from "../../algo/index.ts";
import { MathText } from "../../ui/MathText.tsx";
import { useTx } from "./kit.ts";

/** Một câu hỏi khám phá: người học đoán trước, thử trên hình, rồi máy chấm bằng thuật toán. */
export type DiscoverCard = {
  /** Khóa lưu kết quả theo thiết bị. */
  id: string;
  title: [string, string];
  question: [string, string];
  options: { label: [string, string]; hint: [string, string] }[];
  /** Chỉ số đáp án đúng, do thuật toán tính lúc chạy chứ không gõ cứng. */
  answer: () => number;
  /** Số liệu thật vừa tính, hiện sau khi trả lời. */
  numbers: () => [string, string];
  /** Câu «bạn vừa phát hiện», chỉ hiện khi đã đúng. */
  reveal: [string, string];
};

type Saved = { ok: boolean; tries: number; at: number };

const KEY = "ban-toan-discover";

function readAll(): { [id: string]: Saved } {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === "object" ? (parsed as { [id: string]: Saved }) : {};
  } catch {
    return {};
  }
}

function save(id: string, ok: boolean, previous: Saved | undefined): void {
  try {
    const all = readAll();
    all[id] = { ok, tries: (previous?.tries ?? 0) + 1, at: Date.now() };
    localStorage.setItem(KEY, JSON.stringify(all));
  } catch {
    // Không lưu được (chế độ riêng tư, hết chỗ): thẻ vẫn chạy bình thường.
  }
}

export function Discover({ card }: { card: DiscoverCard }) {
  const tt = useTx();
  const previous = useMemo(() => readAll()[card.id], [card.id]);
  const [picked, setPicked] = useState<number | null>(null);
  const answer = card.answer();
  const due = reviewDue(previous, Date.now());
  const right = picked !== null && picked === answer;
  const wrong = picked !== null && picked !== answer;
  const chosen = picked === null ? null : card.options[picked];

  function choose(index: number) {
    setPicked(index);
    save(card.id, index === answer, previous);
  }

  return (
    <section className="fz-discover" aria-labelledby={`dc-${card.id}`}>
      <h3 id={`dc-${card.id}`}>
        {tt(card.title[0], card.title[1])}
        {due ? <span className="fz-due">{tt("Ôn lại", "Review")}</span> : null}
      </h3>
      <p className="fz-story"><MathText text={tt(card.question[0], card.question[1])} /></p>
      <div className="fz-choices" role="group" aria-label={tt("Dự đoán của bạn", "Your guess")}>
        {card.options.map((option, index) => (
          <button
            key={option.label[0]}
            type="button"
            className={`text-btn fz-choice${picked === index ? (index === answer ? " ok" : " no") : ""}`}
            aria-pressed={picked === index}
            onClick={() => choose(index)}
          >
            <MathText text={tt(option.label[0], option.label[1])} />
          </button>
        ))}
      </div>
      {wrong && chosen ? (
        <p className="fz-read" role="status">
          <b>{tt("Chưa đúng. ", "Not quite. ")}</b>
          <MathText text={tt(chosen.hint[0], chosen.hint[1])} />{" "}
          {tt("Hãy thử trên hình bên dưới rồi chọn lại.", "Try it on the figure below, then choose again.")}
        </p>
      ) : null}
      {right ? (
        <p className="fz-read" role="status">
          <b>{tt("Bạn vừa phát hiện: ", "You just found: ")}</b>
          <MathText text={tt(card.reveal[0], card.reveal[1])} />{" "}
          <MathText text={tt(card.numbers()[0], card.numbers()[1])} />
        </p>
      ) : null}
    </section>
  );
}
