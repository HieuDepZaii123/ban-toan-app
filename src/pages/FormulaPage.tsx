import katex from "katex";
import { useEffect, useMemo, useState } from "react";
import { formulaGroups, searchFormulas } from "../content/formulaBook.ts";
import { t } from "../lib/text.ts";
import { PageFrame } from "../ui/PageFrame.tsx";
import { useLang } from "../ui/useLang.ts";

const formulaCount = formulaGroups.reduce((sum, group) => sum + group.items.length, 0);

export function FormulaPage() {
  const lang = useLang();
  const [query, setQuery] = useState("");
  useEffect(() => {
    document.title = t(lang, "Sổ công thức · Bàn Toán", "Formulas · Bàn Toán");
  }, [lang]);
  const groups = searchFormulas(query);
  return (
    <PageFrame
      kicker={t(lang, "Sổ công thức", "Formula book")}
      title={t(lang, "Công thức cần nhớ", "Formulas to remember")}
      lead={t(lang, "Công thức và điều kiện dùng. Cách tính ở từng tờ.", "Formulas and when they apply. Worked methods are on each sheet.")}
    >
      <form className="search" role="search" onSubmit={(event) => event.preventDefault()}>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t(lang, "Tìm, ví dụ Viète hoặc đạo hàm", "Search, e.g. Viète or derivative")}
          aria-label={t(lang, "Tìm công thức", "Search formulas")}
        />
      </form>
      {groups.length === 0 ? <p className="empty">{t(lang, `Không thấy công thức khớp «${query.trim()}».`, `No formulas match «${query.trim()}».`)}</p> : null}
      <div className="panel">
        {groups.map((group) => (
          <section key={group.title} className="tool-card">
            <h2>{group.title}</h2>
            {group.items.map((item) => (
              <article key={item.name} className="fitem">
                <small>{item.name}</small>
                <Tex tex={item.tex} />
              </article>
            ))}
          </section>
        ))}
      </div>
      <p className="lecture-note">{formulaCount} {t(lang, "công thức, xếp theo chủ đề.", "formulas, grouped by topic.")}</p>
    </PageFrame>
  );
}

function Tex({ tex }: { tex: string }) {
  const html = useMemo(() => katex.renderToString(tex, { throwOnError: false, displayMode: true }), [tex]);
  return <div className="tex-block" dangerouslySetInnerHTML={{ __html: html }} />;
}
