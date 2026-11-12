/** Mọi chuỗi nội dung hiển thị cho người học, kèm cấp học để áp quy ước dấu nhân. */
import { readdirSync, statSync } from "node:fs";
import { pathToFileURL } from "node:url";
import type { Level } from "./mathStyle.ts";

export type Source = { file: string; level: Level; allowTimes: boolean; combo: boolean; prose: boolean; strings: string[]; english: string[] };

const SKIP_KEYS = new Set(["expr", "expect", "code", "id", "checks", "check", "slot", "youtubeId", "topicId", "figure", "widget", "k", "kind", "calc"]);
/** Tệp chứa công thức thô (đã là TeX, không bọc $) hoặc lời giới thiệu ngắn bằng chữ. */
const RAW_TEX = /formulaBook\.ts$/;
const BLURBS = /(cards|catalog|guides|lectures|summary|ideas)\.ts$/;
/** Trong các tệp vectơ, \times còn chỉ kích thước định thức và ký hiệu được đem ra hỏi. */
const TIMES_OK = /vector\.ts$/;
/** Chỉ ở đây A(n,k), C(n,k) mới là chỉnh hợp, tổ hợp; nơi khác A(1,0) là một điểm. */
const COMBO_FILES = /combo|probability|catalog|guides|summary|sharedDrill|assessBank|lop1[0-2]|cards/;

function walk(dir: string, out: string[]): void {
  for (const name of readdirSync(dir)) {
    const path = `${dir}/${name}`;
    if (statSync(path).isDirectory()) walk(path, out);
    else if (/\.ts$/.test(name) && !/(types|index|depth|loadTopic|load)\.ts$/.test(name)) out.push(path);
  }
}

/** Trường tiếng Anh (en, promptEn, hintEn…) theo quy ước Anh: dấu chấm thập phân, dấu phẩy trong tọa độ. */
const ENGLISH_KEY = /^en$|En$|^titleEn|English/;

function collect(value: unknown, vi: string[], en: string[], seen: Set<unknown>, english = false): void {
  if (typeof value === "string") (english ? en : vi).push(value);
  else if (value && typeof value === "object" && !seen.has(value)) {
    seen.add(value);
    for (const [key, item] of Object.entries(value)) {
      if (!SKIP_KEYS.has(key)) collect(item, vi, en, seen, english || ENGLISH_KEY.test(key));
    }
  }
}

function levelOf(file: string): Level {
  if (/lop0[1-5]\.ts$|tieuHoc\.ts$/.test(file)) return "primary";
  return "upper";
}

export async function loadSources(root: string): Promise<Source[]> {
  const files: string[] = [];
  walk(`${root}/src/content`, files);
  walk(`${root}/src/science`, files);
  const sources: Source[] = [];
  for (const path of files.sort()) {
    const file = path.replace(`${root}/`, "");
    if (RAW_TEX.test(file)) continue;
    const mod: unknown = await import(pathToFileURL(path).href);
    const strings: string[] = [];
    const english: string[] = [];
    collect(mod, strings, english, new Set());
    const vi = new Set(strings);
    sources.push({
      file, level: levelOf(file), allowTimes: TIMES_OK.test(file), combo: COMBO_FILES.test(file), prose: !BLURBS.test(file),
      strings: [...vi], english: [...new Set(english)].filter((text) => !vi.has(text)),
    });
  }
  const bank = (await import(pathToFileURL(`${root}/src/grades/practiceBank.ts`).href)) as { gradePractice: { grade: number; prompt: string; choices: string[]; steps: string[] }[] };
  for (const level of ["primary", "upper"] as const) {
    const strings = bank.gradePractice
      .filter((q) => (q.grade <= 5) === (level === "primary"))
      .flatMap((q) => [q.prompt, ...q.choices, ...q.steps]);
    sources.push({ file: `src/grades/practiceBank.ts (${level === "primary" ? "lớp 1–5" : "lớp 6–12"})`, level, allowTimes: false, combo: false, prose: true, strings: [...new Set(strings)], english: [] });
  }
  return sources;
}
