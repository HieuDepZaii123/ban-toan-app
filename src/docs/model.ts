export type Inline =
  | { kind: "text"; text: string }
  | { kind: "bold"; text: string }
  | { kind: "italic"; text: string }
  | { kind: "math"; tex: string; display: boolean };

export type Block =
  | { kind: "h"; level: 1 | 2 | 3; inlines: Inline[] }
  | { kind: "p"; lines: Inline[][] }
  | { kind: "ul"; items: Inline[][] }
  | { kind: "ol"; items: Inline[][] };

type MathSlot = { tex: string; display: boolean };

function expand(fragment: string, kind: "text" | "bold" | "italic", slots: readonly MathSlot[]): Inline[] {
  const out: Inline[] = [];
  const pattern = /@@([DI])(\d+)@@/g;
  let last = 0;
  for (const match of fragment.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > last) out.push({ kind, text: fragment.slice(last, index) });
    const slot = slots[Number(match[2])];
    out.push({ kind: "math", tex: slot?.tex ?? "", display: match[1] === "D" });
    last = index + match[0].length;
  }
  if (last < fragment.length) out.push({ kind, text: fragment.slice(last) });
  return out.filter((item) => item.kind === "math" || item.text !== "");
}

function parseLine(line: string, slots: readonly MathSlot[]): Inline[] {
  const out: Inline[] = [];
  let i = 0;
  while (i < line.length) {
    if (line.startsWith("**", i)) {
      const end = line.indexOf("**", i + 2);
      if (end !== -1) {
        out.push(...expand(line.slice(i + 2, end), "bold", slots));
        i = end + 2;
        continue;
      }
    }
    if (line.startsWith("*", i)) {
      const end = line.indexOf("*", i + 1);
      if (end !== -1) {
        out.push(...expand(line.slice(i + 1, end), "italic", slots));
        i = end + 1;
        continue;
      }
    }
    const star = line.indexOf("*", i);
    const mark = line.indexOf("@@", i);
    let next = line.length;
    if (star !== -1) next = Math.min(next, star);
    if (mark !== -1) next = Math.min(next, mark);
    if (next === i) {
      const token = /^@@([DI])(\d+)@@/.exec(line.slice(i));
      if (token) {
        const slot = slots[Number(token[2])];
        out.push({ kind: "math", tex: slot?.tex ?? "", display: token[1] === "D" });
        i += token[0].length;
        continue;
      }
      out.push({ kind: "text", text: line.slice(i, i + 1) });
      i += 1;
      continue;
    }
    out.push({ kind: "text", text: line.slice(i, next) });
    i = next;
  }
  return out;
}

/** Đọc bản soạn: tiêu đề, đoạn, danh sách, đậm, nghiêng, và công thức $...$ / $$...$$. */
export function parseDoc(source: string): Block[] {
  const slots: MathSlot[] = [];
  const masked = source.replace(/\r\n/g, "\n").replace(/\r/g, "\n").replace(/\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g, (_full, block: string | undefined, inline: string | undefined) => {
    const display = block !== undefined;
    slots.push({ tex: (block ?? inline ?? "").trim(), display });
    return `@@${display ? "D" : "I"}${slots.length - 1}@@`;
  });
  const lines = masked.split("\n");
  const blocks: Block[] = [];
  let paragraph: Inline[][] = [];
  const flush = () => {
    if (paragraph.length === 0) return;
    blocks.push({ kind: "p", lines: paragraph });
    paragraph = [];
  };
  let index = 0;
  while (index < lines.length) {
    const line = lines[index] ?? "";
    const heading = /^(#{1,3}) (.*)$/.exec(line);
    if (heading?.[1] && heading[2] !== undefined) {
      flush();
      const level = heading[1].length;
      blocks.push({ kind: "h", level: level === 1 || level === 2 || level === 3 ? level : 1, inlines: parseLine(heading[2], slots) });
      index += 1;
      continue;
    }
    if (line.trim() === "") {
      flush();
      index += 1;
      continue;
    }
    const bullet = /^[-•] (.*)$/.exec(line);
    if (bullet) {
      flush();
      const items: Inline[][] = [];
      while (index < lines.length) {
        const item = /^[-•] (.*)$/.exec(lines[index] ?? "");
        if (!item) break;
        items.push(parseLine(item[1] ?? "", slots));
        index += 1;
      }
      blocks.push({ kind: "ul", items });
      continue;
    }
    if (/^\d+\. /.test(line)) {
      flush();
      const items: Inline[][] = [];
      while (index < lines.length) {
        const item = /^\d+\. (.*)$/.exec(lines[index] ?? "");
        if (!item) break;
        items.push(parseLine(item[1] ?? "", slots));
        index += 1;
      }
      blocks.push({ kind: "ol", items });
      continue;
    }
    paragraph.push(parseLine(line, slots));
    index += 1;
  }
  flush();
  return blocks;
}
