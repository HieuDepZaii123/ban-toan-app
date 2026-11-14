import katex from "katex";
import { useEffect, useMemo, useState } from "react";
import { formulaGroups, searchFormulas } from "../content/formulaBook.ts";
import { t } from "../lib/text.ts";
import { MathText } from "../ui/MathText.tsx";
import { PageFrame } from "../ui/PageFrame.tsx";
import { useLang } from "../ui/useLang.ts";

export function FormulaPage() {
  const lang = useLang();
  const [query, setQuery] = useState("");
  const groups = searchFormulas(query);
  const total = formulaGroups.reduce((sum, group) => sum + group.items.length, 0);
  useEffect(() => {
    document.title = t(lang, "Sổ công thức · Bàn Toán", "Formula book · Bàn Toán");
  }, [lang]);
  return (
    <PageFrame
      kicker={t(lang, "Sổ công thức", "Formula book")}
      title={t(lang, "Công thức cần nhớ", "Formulas to remember")}
      lead={t(lang, "Các công thức Toán THPT xếp theo chuyên đề. Mỗi công thức ghi kèm điều kiện để dùng được, vì một công thức đúng có thể cho kết quả sai nếu quên điều kiện. Ví dụ và bài luyện nằm trong từng chuyên đề.", "Each formula comes with the condition for using it. Worked methods and examples are in each topic.")}
    >
      <form className="search" role="search" onSubmit={(event) => event.preventDefault()}>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t(lang, "Tìm, ví dụ Viète hoặc đạo hàm", "Search, for example Viète or đạo hàm")}
          aria-label={t(lang, "Tìm công thức", "Search formulas")}
        />
      </form>
      {lang === "en" ? <p className="lecture-note vi-only-note">Formula names and conditions are written in Vietnamese.</p> : null}
      {groups.length === 0 ? <p className="empty">{t(lang, `Không thấy công thức khớp «${query.trim()}».`, `No formula matches “${query.trim()}”.`)}</p> : null}
      <div className="panel" lang="vi">
        {groups.map((group) => (
          <section key={group.title} className="tool-card">
            <h2>{group.title}</h2>
            {group.items.map((item) => (
              <article key={item.name} className="fitem">
                <h3 className="formula-name">{item.name}</h3>
                <Tex tex={item.tex} />
                {item.note ? <p className="formula-note"><b>{t(lang, "Điều kiện. ", "Condition. ")}</b><MathText text={item.note} /></p> : null}
              </article>
            ))}
          </section>
        ))}
      </div>
      <p className="lecture-note">{t(lang, `${total} công thức, xếp theo chủ đề.`, `${total} formulas, grouped by topic.`)}</p>
    </PageFrame>
  );
}

function Tex({ tex }: { tex: string }) {
  const html = useMemo(() => katex.renderToString(tex, { throwOnError: false, displayMode: true }), [tex]);
  return <div className="tex-block" dangerouslySetInnerHTML={{ __html: html }} />;
}
