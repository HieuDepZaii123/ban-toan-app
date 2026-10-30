import katex from "katex";
import { useMemo, useState } from "react";
import { formulaGroups, searchFormulas } from "../content/formulaBook.ts";
import { PageFrame } from "../ui/PageFrame.tsx";

export function FormulaPage() {
  const [query, setQuery] = useState("");
  const groups = searchFormulas(query);
  return (
    <PageFrame
      kicker="Sổ công thức"
      title="Công thức cần nhớ"
      lead="Tra nhanh khi luyện. Hiểu sâu vẫn là việc của bạn trên từng tờ."
    >
      <form className="search" role="search" onSubmit={(event) => event.preventDefault()}>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Tìm, ví dụ Viète hoặc đạo hàm"
          aria-label="Tìm công thức"
        />
      </form>
      {groups.length === 0 ? <p className="empty">Không thấy công thức khớp «{query.trim()}».</p> : null}
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
      <p className="lecture-note">{formulaGroups.reduce((sum, group) => sum + group.items.length, 0)} công thức, xếp theo chủ đề.</p>
    </PageFrame>
  );
}

function Tex({ tex }: { tex: string }) {
  const html = useMemo(() => katex.renderToString(tex, { throwOnError: false, displayMode: true }), [tex]);
  return <div className="tex-block" dangerouslySetInnerHTML={{ __html: html }} />;
}
