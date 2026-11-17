// Checks that several content tests share. Each test keeps its own `fails` list and reporting.
import katex from "katex";

/** A Vietnamese letter with a diacritic. Inside `$…$` it means prose leaked into the math. */
export const MARK = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;

/** Vietnamese typed without diacritics ("khong", "nghiem", …): learner text must never look like this. */
export const BARE = /\b(khong|duoc|dinh|nghiem|phuong trinh|ham so)\b/i;

/** The bodies of every inline `$…$` in a string. */
function texOf(text: string): string[] {
  return [...text.matchAll(/\$([^$]+)\$/g)].map((match) => match[1] ?? "");
}

/**
 * One message per `$…$` in `text` that KaTeX cannot render or that holds a Vietnamese letter.
 * `strict: "ignore"` silences KaTeX's console warnings; `marks: false` skips the letter check.
 */
export function mathProblems(label: string, text: string, opts: { strict?: "ignore"; marks?: boolean } = {}): string[] {
  const out: string[] = [];
  for (const tex of texOf(text)) {
    try {
      katex.renderToString(tex, opts.strict ? { throwOnError: true, strict: opts.strict } : { throwOnError: true });
    } catch (error) {
      out.push(`${label} KaTeX: ${tex} (${error instanceof Error ? error.message : "fail"})`);
    }
    if (opts.marks !== false && MARK.test(tex)) out.push(`${label} unicode in math: ${tex.slice(0, 160)}`);
  }
  return out;
}
