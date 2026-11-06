import { useEffect, useRef, useState } from "react";
import { A } from "../lib/route.tsx";
import { MathText } from "../ui/MathText.tsx";
import { diagramBlocks, sanitizeSvg } from "./diagram.ts";

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

function Prose({ text }: { text: string }) {
  const lines = text.split("\n").filter((line) => line.length > 0);
  return (
    <>
      {lines.map((line, index) => (
        <p key={index}>
          {pieces(line).map((piece, pieceIndex) => piece.kind === "link"
            ? <A key={pieceIndex} href={piece.href}>{piece.label}</A>
            : <MathText key={pieceIndex} text={piece.text} />)}
        </p>
      ))}
    </>
  );
}

function MermaidBlock({ source }: { source: string }) {
  const host = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let cancel = false;
    const id = `mmd-${Math.random().toString(36).slice(2)}`;
    void (async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({ startOnLoad: false, securityLevel: "antiscript", fontFamily: "inherit" });
        const drawn = await mermaid.render(id, source);
        const clean = sanitizeSvg(drawn.svg);
        if (!cancel && host.current) host.current.innerHTML = clean;
        if (!clean && !cancel) setFailed(true);
      } catch {
        if (!cancel) setFailed(true);
      }
    })();
    return () => { cancel = true; };
  }, [source]);
  if (failed) return <pre className="chat-ascii">{source}</pre>;
  return <div className="chat-diagram" ref={host} />;
}

export function ChatText({ text }: { text: string }) {
  return (
    <div className="chat-copy">
      {diagramBlocks(text).map((block, index) => {
        if (block.kind === "mermaid") return <MermaidBlock key={index} source={block.text} />;
        if (block.kind === "svg") {
          const clean = sanitizeSvg(block.text);
          return clean
            ? <div key={index} className="chat-diagram" dangerouslySetInnerHTML={{ __html: clean }} />
            : <pre key={index} className="chat-ascii">{block.text}</pre>;
        }
        if (block.kind === "ascii") return <pre key={index} className="chat-ascii">{block.text}</pre>;
        return <Prose key={index} text={block.text} />;
      })}
    </div>
  );
}
