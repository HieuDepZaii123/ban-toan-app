import { useEffect, useMemo, useState } from "react";
import { makeSay, type Dense, type Verdict } from "../content/challenges.ts";
import { allLabSpecs as labSpecs } from "../content/labSpecs.ts";
import { readParams, useSlice, writeParams } from "../lib/store.ts";
import { t } from "../lib/text.ts";
import { MathText } from "../ui/MathText.tsx";
import { useLang } from "../ui/useLang.ts";

const KEY = "ban-toan:lab-done";

function loadDone(id: string): string[] {
  try {
    const raw = JSON.parse(window.localStorage.getItem(`${KEY}:${id}`) ?? "[]") as unknown;
    return Array.isArray(raw) ? raw.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function saveDone(id: string, done: string[]): void {
  try {
    window.localStorage.setItem(`${KEY}:${id}`, JSON.stringify(done));
  } catch {
    /* private window: progress stays on screen only */
  }
}

/** Challenges for one lab: preset the figure, predict, move the sliders, then check by computation. */
export function LabChallenges({ id, onPreset }: { id: string; onPreset: () => void }) {
  const lang = useLang();
  const en = lang === "en";
  const spec = labSpecs[id];
  const stored = useSlice((data) => data.params[id]);
  const values = useMemo(() => (spec ? readParams(id, spec.init, spec.range) : {}), [id, spec, stored]);
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState<string[]>(() => loadDone(id));
  const [guess, setGuess] = useState<number | null>(null);
  const [hintOpen, setHintOpen] = useState(false);
  const [revealed, setRevealed] = useState<string[]>([]);
  const [checked, setChecked] = useState<{ verdict: Verdict; at: string; guess: number | null } | null>(null);

  useEffect(() => {
    setIndex(0);
    setDone(loadDone(id));
    setGuess(null);
    setHintOpen(false);
    setRevealed([]);
    setChecked(null);
  }, [id]);

  if (!spec || spec.challenges.length === 0) return null;
  const challenge = spec.challenges[Math.min(index, spec.challenges.length - 1)];
  if (!challenge) return null;
  const say = makeSay(en);
  const stamp = JSON.stringify(values);
  const result = checked && checked.at === stamp ? checked : null;
  const sameScene = values.scene === challenge.set.scene;

  const pick = (next: number) => {
    setIndex(next);
    setGuess(null);
    setHintOpen(false);
    setChecked(null);
  };
  const preset = (target: Record<string, number>) => {
    writeParams(id, { ...spec.init, ...target });
    setChecked(null);
    onPreset();
  };
  const run = () => {
    const verdict = challenge.check(values as Dense, say);
    const at = stamp;
    setChecked({ verdict, at, guess });
    if (verdict.ok && !revealed.includes(challenge.id) && !done.includes(challenge.id)) {
      const next = [...done, challenge.id];
      setDone(next);
      saveDone(id, next);
    }
  };

  const doneCount = spec.challenges.filter((c) => done.includes(c.id)).length;
  const needGuess = challenge.guess !== undefined && guess === null;

  return (
    <section className="challenge" aria-labelledby="challenge-title">
      <div className="challenge-head">
        <h2 id="challenge-title">{t(lang, "Thử thách", "Challenges")}</h2>
        <span className="challenge-count">{doneCount}/{spec.challenges.length}</span>
      </div>
      <div className="chips" role="group" aria-label={t(lang, "Chọn thử thách", "Pick a challenge")}>
        {spec.challenges.map((c, i) => (
          <button key={c.id} type="button" aria-pressed={i === index} onClick={() => pick(i)}>
            {done.includes(c.id) ? "✓ " : ""}
            {t(lang, `Thử thách ${i + 1}`, `Challenge ${i + 1}`)}
          </button>
        ))}
      </div>
      <p className="challenge-prompt">
        {challenge.level ? (
          <span className={`level level-${challenge.level}`}>
            {challenge.level === 1 ? t(lang, "Dễ", "Easy") : challenge.level === 2 ? t(lang, "Vừa", "Medium") : t(lang, "Khó", "Hard")}
          </span>
        ) : null}
        <MathText text={en ? challenge.en : challenge.vi} />
      </p>
      {challenge.guess ? (
        <fieldset className="challenge-guess">
          <legend><b>{t(lang, "Đoán trước: ", "Predict first: ")}</b><MathText text={en ? challenge.guess.en : challenge.guess.vi} /></legend>
          <div className="chips">
            {challenge.guess.options.map((option, i) => (
              <button key={i} type="button" aria-pressed={guess === i} onClick={() => setGuess(i)}>
                <MathText text={en ? option.en : option.vi} />
              </button>
            ))}
          </div>
        </fieldset>
      ) : null}
      <div className="challenge-actions">
        <button
          type="button"
          className="text-btn"
          onClick={() => {
            setRevealed((list) => list.filter((item) => item !== challenge.id));
            preset(challenge.set);
          }}
        >
          {t(lang, "Đặt đề", "Set up")}
        </button>
        <button type="button" className="play" onClick={run} disabled={needGuess}>{t(lang, "Kiểm tra", "Check")}</button>
        {challenge.hint ? (
          <button type="button" className="text-btn" aria-expanded={hintOpen} onClick={() => setHintOpen(!hintOpen)}>{t(lang, "Gợi ý", "Hint")}</button>
        ) : null}
        <button
          type="button"
          className="text-btn"
          onClick={() => {
            setRevealed((list) => (list.includes(challenge.id) ? list : [...list, challenge.id]));
            preset(challenge.sol);
          }}
        >
          {t(lang, "Xem đáp án mẫu", "Show a sample answer")}
        </button>
      </div>
      {hintOpen && challenge.hint ? <p className="note challenge-hint"><MathText text={en ? challenge.hint.en : challenge.hint.vi} /></p> : null}
      {needGuess ? <p className="note">{t(lang, "Chọn một dự đoán rồi mới kiểm tra.", "Pick a prediction before you check.")}</p> : null}
      {!sameScene ? (
        <p className="note">{t(lang, "Hình đang ở cảnh khác: bấm Đặt đề để về đúng cảnh của thử thách.", "The figure is on a different scene: press Set up to return to this challenge's scene.")}</p>
      ) : null}
      <div className="challenge-result" role="status" aria-live="polite">
        {result ? (
          <>
            <p className={result.verdict.ok ? "verdict ok" : "verdict bad"}>
              <b>{result.verdict.ok ? t(lang, "Đúng. ", "Correct. ") : t(lang, "Chưa đúng. ", "Not yet. ")}</b>
              <MathText text={result.verdict.why} />
            </p>
            {challenge.guess && result.guess !== null ? (
              <p className="verdict-guess">
                <b>
                  {result.guess === challenge.guess.answer
                    ? t(lang, "Bạn đoán đúng. ", "Your prediction was right. ")
                    : t(lang, "Dự đoán chưa đúng. ", "Your prediction was off. ")}
                </b>
                <MathText text={en ? challenge.guess.why.en : challenge.guess.why.vi} />
              </p>
            ) : null}
            {result.verdict.ok && revealed.includes(challenge.id) && !done.includes(challenge.id) ? (
              <p className="note">{t(lang, "Bạn đã xem đáp án mẫu nên thử thách này chưa được tính vào tiến độ. Hãy tự làm lại.", "You looked at the sample answer, so this challenge does not count towards progress. Try it again yourself.")}</p>
            ) : null}
            {result.verdict.ok && index + 1 < spec.challenges.length ? (
              <button type="button" className="text-btn" onClick={() => pick(index + 1)}>{t(lang, "Thử thách tiếp theo", "Next challenge")}</button>
            ) : null}
          </>
        ) : null}
      </div>
    </section>
  );
}
