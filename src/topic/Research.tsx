import { Suspense, useState, type ComponentType } from "react";
import { lessonBounds } from "../research/bounds.ts";
import { STUDY_ROWS, studyDone } from "../research/done.ts";
import { studiesFor } from "../research/index.ts";
import type { Study } from "../research/types.ts";
import { readParams, saveStudy, stageParams, studyKey, useSlice, type StudyLog } from "../lib/store.ts";
import { t } from "../lib/text.ts";
import { fmt } from "../lib/format.ts";
import { MathText } from "../ui/MathText.tsx";
import { useLang } from "../ui/useLang.ts";
import { useRoute } from "../lib/useRoute.ts";
import { StudyPlot } from "./StudyPlot.tsx";

const EMPTY: StudyLog = { choice: "", hypothesis: "", rows: [], conclusion: "", revealed: false };

function sameRow(a: Record<string, number>, b: Record<string, number>): boolean {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  for (const key of keys) {
    if (Math.abs((a[key] ?? 0) - (b[key] ?? 0)) > 1e-9) return false;
  }
  return true;
}

export function Research({ topicId, Lab }: { topicId: string; Lab: ComponentType | null }) {
  const { search } = useRoute();
  const picked = new URLSearchParams(search).get("n") ?? "";
  const studies = studiesFor(topicId);
  const study = studies.find((item) => item.id === picked);
  if (!study) {
    return <StudyList topicId={topicId} studies={studies} />;
  }
  return <StudyDesk topicId={topicId} study={study} Lab={Lab} />;
}

function StudyList({ topicId, studies }: { topicId: string; studies: Study[] }) {
  const lang = useLang();
  const logs = useSlice((data) => data.studies);
  const { go } = useRoute();
  const done = studies.filter((study) => studyDone(logs[studyKey(topicId, study.id)])).length;
  return (
    <section className="study" aria-labelledby="study-list-title">
      <h2 id="study-list-title">{t(lang, "Nghiên cứu", "Research")}</h2>
      <p className="note">
        {t(
          lang,
          "Mỗi bài đi sáu bước: câu hỏi, giả thuyết, thí nghiệm, quan sát, kết luận, mở rộng. Giả thuyết, bảng số và kết luận được lưu trên máy này.",
          "Each investigation has six steps: question, hypothesis, experiment, observation, conclusion, extension. The hypothesis, the table, and the conclusion stay on this device.",
        )}
      </p>
      <p className="status">{t(lang, `Đã kết luận ${done}/${studies.length}`, `Concluded ${done}/${studies.length}`)}</p>
      <div className="study-list">
        {studies.map((study) => {
          const log = logs[studyKey(topicId, study.id)];
          const rows = log?.rows.length ?? 0;
          const finished = studyDone(log);
          return (
            <a
              key={study.id}
              className="study-card"
              href={`/t/${topicId}?tab=nc&n=${study.id}`}
              onClick={(event) => {
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                event.preventDefault();
                go(`/t/${topicId}?tab=nc&n=${study.id}`);
              }}
            >
              <b><MathText text={lang === "en" ? study.titleEn : study.title} /></b>
              <span>{finished
                ? t(lang, "Đã kết luận", "Concluded")
                : t(lang, `${rows}/${STUDY_ROWS} dòng`, `${rows}/${STUDY_ROWS} rows`)}</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}

function StudyDesk({ topicId, study, Lab }: { topicId: string; study: Study; Lab: ComponentType | null }) {
  const lang = useLang();
  const { go } = useRoute();
  const key = studyKey(topicId, study.id);
  const saved = useSlice((data) => data.studies[key]);
  const params = useSlice((data) => data.params[topicId]);
  const log = saved ?? EMPTY;
  const [warn, setWarn] = useState("");
  const stamp = `${topicId}:${study.id}`;
  const [applied, setApplied] = useState("");
  if (applied !== stamp) {
    const bounds = lessonBounds[topicId];
    if (bounds) stageParams(topicId, { ...readParams(topicId, bounds.init, bounds.range), ...study.preset });
    setApplied(stamp);
  }

  function commit(next: StudyLog): void {
    saveStudy(key, next);
  }

  function record(): void {
    const source = params ?? study.preset;
    const row = study.measure({ ...source, trial: log.rows.length });
    if (!row) {
      setWarn(lang === "en" ? study.blockEn : study.block);
      return;
    }
    if (log.rows.some((prev) => sameRow(prev, row))) {
      setWarn(t(lang, "Dòng này đã có. Kéo tham số khác rồi ghi.", "That row is already there. Drag a parameter, then record."));
      return;
    }
    if (log.rows.length >= 12) {
      setWarn(t(lang, "Bảng đủ 12 dòng.", "The table holds 12 rows."));
      return;
    }
    setWarn("");
    commit({ ...log, rows: [...log.rows, row] });
  }

  const ready = log.rows.length >= STUDY_ROWS;
  const predicted = log.choice !== "" || log.hypothesis.trim().length > 0;
  const canReveal = ready && predicted && log.conclusion.trim().length > 0 && !log.revealed;
  const title = lang === "en" ? study.titleEn : study.title;
  const question = lang === "en" ? study.questionEn : study.question;

  return (
    <section className="study" aria-labelledby="study-title">
      <p className="kicker">
        <a
          href={`/t/${topicId}?tab=nc`}
          onClick={(event) => {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            go(`/t/${topicId}?tab=nc`);
          }}
        >
          {t(lang, "Cả hai bài", "Both investigations")}
        </a>
      </p>
      <h2 id="study-title"><MathText text={title} /></h2>
      <div className="study-steps">
        <section className="study-step" aria-labelledby="study-q">
          <h3 id="study-q">{t(lang, "1. Câu hỏi", "1. Question")}</h3>
          <p><MathText text={question} /></p>
        </section>
        <section className="study-step" aria-labelledby="study-h">
          <h3 id="study-h">{t(lang, "2. Giả thuyết", "2. Hypothesis")}</h3>
          <div role="radiogroup" aria-labelledby="study-h" className="guesses">
            {study.guesses.map((guess) => {
              const mark = !log.revealed ? "" : guess.id === study.answerId ? " is-right" : log.choice === guess.id ? " is-wrong" : "";
              return (
                <label key={guess.id} className={`guess${mark}`}>
                  <input
                    type="radio"
                    name={`guess-${study.id}`}
                    value={guess.id}
                    checked={log.choice === guess.id}
                    disabled={log.revealed}
                    onChange={() => commit({ ...log, choice: guess.id })}
                  />
                  <MathText text={lang === "en" ? guess.en : guess.vi} />
                </label>
              );
            })}
          </div>
          <label className="study-write">
            <span>{t(lang, "Hoặc viết dự đoán", "Or write a prediction")}</span>
            <textarea
              value={log.hypothesis}
              maxLength={240}
              rows={2}
              onChange={(event) => commit({ ...log, hypothesis: event.target.value })}
              aria-label={t(lang, "Giả thuyết viết tay", "Written hypothesis")}
            />
          </label>
        </section>
        <section className="study-step" aria-labelledby="study-e">
          <h3 id="study-e">{t(lang, "3. Thí nghiệm", "3. Experiment")}</h3>
          <p className="note"><MathText text={lang === "en" ? study.hintEn : study.hint} /></p>
          {Lab && applied === stamp ? (
            <Suspense fallback={<div className="graph-wrap skeleton" aria-hidden="true" />}>
              <Lab key={study.id} />
            </Suspense>
          ) : (
            <div className="graph-wrap skeleton" aria-hidden="true" />
          )}
          <div className="practice-nav">
            <button type="button" className="study-ghi" onClick={record}>
              {t(lang, "Ghi", "Record")}
            </button>
            <span className="status">{t(lang, `${log.rows.length} dòng`, `${log.rows.length} rows`)}</span>
          </div>
          {warn ? <p className="note" role="status"><MathText text={warn} /></p> : null}
          <div id="study-data">
            {log.rows.length === 0 ? (
              <p className="empty">{t(lang, "Chưa có dòng nào. Kéo hình rồi bấm Ghi.", "No rows yet. Drag the figure, then press Record.")}</p>
            ) : (
              <table className="study-table">
                <caption>{t(lang, "Số liệu đã ghi", "Recorded data")}</caption>
                <thead>
                  <tr>
                    {study.columns.map((column) => (
                      <th key={column.key} scope="col"><MathText text={lang === "en" ? column.en : column.vi} /></th>
                    ))}
                    <th scope="col"><span className="sr">{t(lang, "Xóa", "Delete")}</span></th>
                  </tr>
                </thead>
                <tbody>
                  {log.rows.map((row, index) => (
                    <tr key={`${index}-${row[study.plotX] ?? 0}`}>
                      {study.columns.map((column) => (
                        <td key={column.key}>{fmt(row[column.key] ?? Number.NaN, 4)}</td>
                      ))}
                      <td>
                        <button
                          type="button"
                          className="text-btn"
                          onClick={() => commit({ ...log, rows: log.rows.filter((_, place) => place !== index) })}
                        >
                          {t(lang, "Xóa", "Delete")}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
        <section className={`study-step${ready ? "" : " is-locked"}`} aria-labelledby="study-o">
          <h3 id="study-o">{t(lang, "4. Quan sát", "4. Observation")}</h3>
          {ready ? (
            <StudyPlot
              rows={log.rows}
              xKey={study.plotX}
              yKey={study.plotY}
              showCurve={log.revealed}
              formula={(x) => study.formula(x, study.preset)}
              label={t(lang, `Đồ thị ${log.rows.length} điểm đã ghi`, `Chart of ${log.rows.length} recorded points`)}
            />
          ) : (
            <p className="note">{t(lang, `Ghi đủ ${STUDY_ROWS} dòng để vẽ.`, `Record ${STUDY_ROWS} rows to draw the chart.`)}</p>
          )}
        </section>
        <section className={`study-step${ready ? "" : " is-locked"}`} id="study-result" aria-labelledby="study-c">
          <h3 id="study-c">{t(lang, "5. Kết luận", "5. Conclusion")}</h3>
          {ready ? (
            <>
              <label className="study-write">
                <span>{t(lang, "Kết luận của bạn", "Your conclusion")}</span>
                <textarea
                  value={log.conclusion}
                  maxLength={600}
                  rows={3}
                  onChange={(event) => commit({ ...log, conclusion: event.target.value })}
                  aria-label={t(lang, "Kết luận", "Conclusion")}
                />
              </label>
              {log.revealed ? null : (
                <button type="button" className="study-ghi" disabled={!canReveal} onClick={() => commit({ ...log, revealed: true })}>
                  {t(lang, "Đối chiếu", "Compare")}
                </button>
              )}
              {log.revealed ? (
                <div className="solution">
                  <p className="status" role="status">
                    {log.choice === ""
                      ? t(lang, "Đối chiếu với dự đoán bạn viết.", "Compared with the prediction you wrote.")
                      : log.choice === study.answerId
                        ? t(lang, "Giả thuyết trùng kết quả.", "The hypothesis matches the result.")
                        : t(lang, "Giả thuyết khác kết quả.", "The hypothesis differs from the result.")}
                  </p>
                  {log.hypothesis.trim() ? <p><MathText text={log.hypothesis} /></p> : null}
                  <p><MathText text={lang === "en" ? study.resultEn : study.result} /></p>
                </div>
              ) : (
                <p className="note">{t(lang, "Viết kết luận, và chọn hoặc gõ một giả thuyết, rồi đối chiếu.", "Write a conclusion, and pick or type a hypothesis, then compare.")}</p>
              )}
            </>
          ) : (
            <p className="note">{t(lang, `Ghi đủ ${STUDY_ROWS} dòng để kết luận.`, `Record ${STUDY_ROWS} rows before concluding.`)}</p>
          )}
        </section>
        <section className={`study-step${log.revealed ? "" : " is-locked"}`} aria-labelledby="study-x">
          <h3 id="study-x">{t(lang, "6. Mở rộng", "6. Extension")}</h3>
          {log.revealed ? (
            <p><MathText text={lang === "en" ? study.followEn : study.follow} /></p>
          ) : (
            <p className="note">{t(lang, "Câu hỏi thêm hiện sau khi đối chiếu.", "The follow-up appears after the comparison.")}</p>
          )}
        </section>
      </div>
    </section>
  );
}
