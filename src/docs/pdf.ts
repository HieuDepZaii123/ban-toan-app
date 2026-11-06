import fontkit from "@pdf-lib/fontkit";
import { PDFDocument, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { parseDoc, type Inline } from "./model.ts";
import { inlinesToPlain, texToPlain } from "./plain.ts";

export type PdfFaces = {
  regular: Uint8Array;
  bold: Uint8Array;
  italic: Uint8Array;
};

type FaceName = "regular" | "bold" | "italic";
type Run = { text: string; face: FaceName; size: number };

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN = 54;

function glyphSet(font: PDFFont): Set<number> {
  return new Set(font.getCharacterSet());
}

function supported(text: string, glyphs: Set<number>): string {
  let out = "";
  for (const ch of text) out += glyphs.has(ch.codePointAt(0) ?? -1) ? ch : "?";
  return out;
}

function widthOf(font: PDFFont, text: string, size: number): number {
  return text.length === 0 ? 0 : font.widthOfTextAtSize(text, size);
}

function piecesOf(text: string, font: PDFFont, size: number, max: number): string[] {
  if (text.length === 0) return [];
  if (widthOf(font, text, size) <= max) return [text];
  const out: string[] = [];
  let buf = "";
  for (const ch of text) {
    const next = buf + ch;
    if (buf && widthOf(font, next, size) > max) {
      out.push(buf);
      buf = ch;
    } else {
      buf = next;
    }
  }
  if (buf) out.push(buf);
  return out;
}

function wrap(runs: readonly Run[], fonts: Record<FaceName, PDFFont>, max: number): Run[][] {
  const lines: Run[][] = [];
  let line: Run[] = [];
  let used = 0;
  const push = () => {
    if (line.length > 0) lines.push(line);
    line = [];
    used = 0;
  };
  for (const run of runs) {
    const font = fonts[run.face];
    const tokens = run.text.split(/(\s+)/).filter((token) => token.length > 0);
    for (const token of tokens) {
      for (const piece of piecesOf(token, font, run.size, max)) {
        const pieceWidth = widthOf(font, piece, run.size);
        const blank = piece.trim() === "";
        if (blank && line.length === 0) continue;
        if (!blank && used + pieceWidth > max && line.length > 0) push();
        line.push({ text: piece, face: run.face, size: run.size });
        used += pieceWidth;
      }
    }
  }
  push();
  return lines;
}

function inlineRuns(inlines: readonly Inline[], size: number, glyphs: Record<FaceName, Set<number>>): Run[] {
  return inlines.map((part) => {
    const face: FaceName = part.kind === "bold" ? "bold" : part.kind === "italic" || part.kind === "math" ? "italic" : "regular";
    const raw = part.kind === "math" ? texToPlain(part.tex) : part.text;
    return { text: supported(raw, glyphs[face]), face, size };
  }).filter((run) => run.text.length > 0);
}

/** PDF có chữ thật và phông nhúng, không phải ảnh chụp hộp thoại in. */
export async function buildPdf(source: string, faces: PdfFaces): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  pdf.registerFontkit(fontkit as Parameters<PDFDocument["registerFontkit"]>[0]);
  const fonts: Record<FaceName, PDFFont> = {
    regular: await pdf.embedFont(faces.regular, { subset: true }),
    bold: await pdf.embedFont(faces.bold, { subset: true }),
    italic: await pdf.embedFont(faces.italic, { subset: true }),
  };
  const glyphs: Record<FaceName, Set<number>> = {
    regular: glyphSet(fonts.regular),
    bold: glyphSet(fonts.bold),
    italic: glyphSet(fonts.italic),
  };
  const blocks = parseDoc(source);
  const titleBlock = blocks.find((block) => block.kind === "h");
  pdf.setTitle(titleBlock?.kind === "h" ? inlinesToPlain(titleBlock.inlines) || "Bàn Toán" : "Bàn Toán");
  pdf.setLanguage("vi");
  pdf.setProducer("Bàn Toán");
  const max = PAGE_WIDTH - MARGIN * 2;
  let page: PDFPage = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let y = PAGE_HEIGHT - MARGIN;
  const nextPage = () => {
    page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    y = PAGE_HEIGHT - MARGIN;
  };
  const paint = (lines: Run[][], indent: number, gap: number) => {
    if (lines.length === 0) {
      y -= gap;
      return;
    }
    for (const line of lines) {
      const size = line[0]?.size ?? 12;
      const height = size * 1.4;
      if (y - height < MARGIN) nextPage();
      let x = MARGIN + indent;
      for (const run of line) {
        page.drawText(run.text, { x, y: y - size, size: run.size, font: fonts[run.face], color: rgb(0.1, 0.09, 0.07) });
        x += widthOf(fonts[run.face], run.text, run.size);
      }
      y -= height;
    }
    y -= gap;
  };
  if (blocks.length === 0) return pdf.save();
  for (const block of blocks) {
    if (block.kind === "h") {
      const size = block.level === 1 ? 20 : block.level === 2 ? 16 : 13;
      const headingRuns = inlineRuns(block.inlines, size, glyphs).map((run) => ({ ...run, face: "bold" as const, text: supported(run.text, glyphs.bold) }));
      paint(wrap(headingRuns, fonts, max), 0, 8);
    } else if (block.kind === "p") {
      const runs = block.lines.flatMap((line, index) => {
        const body = inlineRuns(line, 12, glyphs);
        return index === 0 ? body : [{ text: " ", face: "regular" as const, size: 12 }, ...body];
      });
      paint(wrap(runs, fonts, max), 0, 8);
    } else {
      block.items.forEach((item, index) => {
        const prefix = block.kind === "ul" ? "• " : `${index + 1}. `;
        const runs = [{ text: supported(prefix, glyphs.regular), face: "regular" as const, size: 12 }, ...inlineRuns(item, 12, glyphs)];
        paint(wrap(runs, fonts, max - 16), 16, 2);
      });
      y -= 6;
    }
  }
  return pdf.save();
}
