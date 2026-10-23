import type { Question } from "../content/types.ts";
import type { Vary } from "../content/vary/types.ts";
import { mulberry32 } from "../lib/prng.ts";
import { A } from "../lib/route.tsx";
import { dismissWrong, questionKey, setNote, useSlice } from "../lib/store.ts";
import { t } from "../lib/text.ts";
import { MathText } from "../ui/MathText.tsx";
import { useLang } from "../ui/useLang.ts";
import { arrange } from "./show.ts";

export function Notebook({ topicId, questions, vary }: { topicId: string; questions: Question[]; vary: Vary[] }) {
  const lang = useLang();
  const note = useSlice((data) => data.notes[topicId] ?? "");
  const wrong = useSlice((data) => data.wrong);
  const attempts = useSlice((data) => data.attempts);
  const scores = useSlice((data) => data.scores);
  const misses = Object.entries(wrong).filter(([key]) => key.startsWith(`${topicId}:`));

  return (
    <section className="notebook" aria-labelledby="note-title">
      <h2 id="note-title">{t(lang, "Ghi trên bàn", "Notes on the desk")}</h2>
      <textarea
        value={note}
        onChange={(event) => setNote(topicId, event.target.value)}
        placeholder={t(lang, "Một ý vừa thấy trên hình. Chỉ lưu trên máy này.", "A line you just saw on the figure. Stored only on this device.")}
        aria-label={t(lang, "Ghi chú", "Notes")}
      />
      <h3>{t(lang, "Câu đang sai", "Still wrong")}</h3>
      {misses.length === 0 ? (
        <p className="empty">{t(lang, "Chưa có câu sai. Làm ở tab Làm: câu chọn nhầm nằm ở đây cho đến khi làm đúng.", "Nothing missed yet. Use Practice: a wrong choice stays here until the answer is right.")}</p>
      ) : (
        <ul className="misses">
          {misses.map(([key, choice]) => {
            const qid = key.slice(topicId.length + 1);
            const published = questions.find((item) => item.id === qid);
            if (!published) return null;
            const spec = vary.find((item) => item.id === published.id);
            const attempt = attempts[key];
            const question = attempt && spec
              ? arrange(spec.draw(mulberry32(attempt.seed)).stem, attempt.pos, attempt.seed)
              : published;
            const choices = lang === "en" ? question.choicesEn : question.choices;
            const dssScore = question.kind === "dss" ? (scores[key]?.score ?? choice) : null;
            return (
              <li key={key} className="mistake">
                <p><MathText text={lang === "en" ? question.promptEn : question.prompt} /></p>
                {dssScore !== null ? (
                  <p className="miss-line">{t(lang, `Điểm ${dssScore}/4`, `Score ${dssScore}/4`)}</p>
                ) : (
                  <>
                    <p className="miss-line">
                      {t(lang, "Đã chọn", "Chosen")}: <MathText text={choices[choice] ?? "—"} />
                    </p>
                    <p className="miss-line">
                      {t(lang, "Đáp án", "Answer")}: <MathText text={choices[question.answer] ?? "—"} />
                    </p>
                  </>
                )}
                <div className="practice-nav">
                  <A href={`/t/${topicId}?tab=lam&q=${question.id}`}>{t(lang, "Làm lại", "Try again")}</A>
                  <button type="button" className="text-btn" onClick={() => dismissWrong(questionKey(topicId, question.id))}>
                    {t(lang, "Xóa khỏi sổ", "Remove")}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
