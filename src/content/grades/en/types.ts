/**
 * Bản tiếng Anh của một bài học, xếp đúng thứ tự như bản tiếng Việt sau deepen():
 * mỗi ví dụ là [đề, các bước [khẳng định, lý do], kết luận], mỗi bài luyện là
 * [đề, đáp án, lý do, gợi ý, phương án trắc nghiệm]. Công thức giữ nguyên, chỉ đổi
 * dấu thập phân sang dấu chấm và dấu chấm phẩy sang dấu phẩy (en.test.ts kiểm).
 */
export type ExampleEn = [prompt: string, steps: [claim: string, why: string][], ket: string];
export type DrillEn = [prompt: string, answer: string, why?: string, hints?: string[], options?: string[]];
export type LessonEn = { s: string; w?: string; p?: string; ex: ExampleEn[]; dr: DrillEn[] };
