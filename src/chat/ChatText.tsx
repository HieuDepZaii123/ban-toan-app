import { A } from "../lib/route.tsx";
import { MathText } from "../ui/MathText.tsx";

type Piece =
  | { kind: "text"; text: string }
  | { kind: "link"; href: string; label: string };

const TOKEN = /\$[^$]+\$|\[[^\]]+\]\(\/(?:t\/[a-z0-9-]+|nang-cap)\)/g;

function pieces(text: string): Piece[] {
  const out: Piece[] = [];
  let cursor = 0;
  for (const match of text.matchAll(TOKEN)) {
    const start = match.index ?? 0;
    if (start > cursor) out.push({ kind: "text", text: text.slice(cursor, start) });
    const token = match[0];
    if (token.startsWith("$")) out.push({ kind: "text", text: token });
    else {
      const link = /^\[([^\]]+)\]\((\/(?:t\/[a-z0-9-]+|nang-cap))\)$/.exec(token);
      if (link?.[1] && link[2]) out.push({ kind: "link", label: link[1], href: link[2] });
    }
    cursor = start + token.length;
  }
  if (cursor < text.length) out.push({ kind: "text", text: text.slice(cursor) });
  return out;
}

export function ChatText({ text }: { text: string }) {
  const lines = text.split("\n").filter((line) => line.length > 0);
  return (
    <div className="chat-copy">
      {lines.map((line, index) => (
        <p key={index}>
          {pieces(line).map((piece, pieceIndex) => piece.kind === "link"
            ? <A key={pieceIndex} href={piece.href}>{piece.label}</A>
            : <MathText key={pieceIndex} text={piece.text} />)}
        </p>
      ))}
    </div>
  );
}
