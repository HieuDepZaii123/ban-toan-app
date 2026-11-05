import katex from "katex";

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Xem trước bản soạn: tiêu đề, đậm, nghiêng, và KaTeX $...$ / $$...$$. */
export function renderDoc(source: string): string {
  const slots: string[] = [];
  const masked = source.replace(/\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g, (_full, block: string | undefined, inline: string | undefined) => {
    const tex = (block ?? inline ?? "").trim();
    const html = katex.renderToString(tex, { throwOnError: false, displayMode: Boolean(block) });
    const token = `@@M${slots.length}@@`;
    slots.push(html);
    return token;
  });
  const marked = escapeHtml(masked)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>");
  const blocks: string[] = [];
  let para: string[] = [];
  const flush = () => {
    if (para.length === 0) return;
    blocks.push(`<p>${para.join("<br>")}</p>`);
    para = [];
  };
  for (const line of marked.split("\n")) {
    const heading = /^(#{1,3}) (.+)$/.exec(line);
    if (heading?.[1] && heading[2]) {
      flush();
      blocks.push(`<h${heading[1].length}>${heading[2]}</h${heading[1].length}>`);
    } else if (line.trim() === "") {
      flush();
    } else {
      para.push(line);
    }
  }
  flush();
  return blocks.join("").replace(/@@M(\d+)@@/g, (_match, index: string) => slots[Number(index)] ?? "");
}
