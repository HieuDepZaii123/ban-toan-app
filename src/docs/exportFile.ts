import regularUrl from "./fonts/Sans-Regular.ttf";
import boldUrl from "./fonts/Sans-Bold.ttf";
import italicUrl from "./fonts/Sans-Italic.ttf";
import { downloadBytes } from "./download.ts";

async function fontBytes(url: string): Promise<Uint8Array> {
  const response = await fetch(url);
  if (!response.ok) throw new Error("font");
  return new Uint8Array(await response.arrayBuffer());
}

/** Build a doc source into a PDF or DOCX and hand it to the browser as a download. The exporters load on demand. */
export async function exportDoc(kind: "pdf" | "docx", source: string, basename: string): Promise<string> {
  const filename = `${basename}.${kind}`;
  if (kind === "docx") {
    const { docToDocx } = await import("./docx.ts");
    downloadBytes(docToDocx(source), filename, "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
  } else {
    const { buildPdf } = await import("./pdf.ts");
    const [regular, bold, italic] = await Promise.all([fontBytes(regularUrl), fontBytes(boldUrl), fontBytes(italicUrl)]);
    downloadBytes(await buildPdf(source, { regular, bold, italic }), filename, "application/pdf");
  }
  return filename;
}
