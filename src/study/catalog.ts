/**
 * Danh sách nhạc học: chỉ tệp đặt trên chính máy chủ (public/study-media), không nhúng dịch vụ ngoài.
 *
 * Thêm bài: chép tệp video (.mp4, H.264 + AAC) mà bạn có quyền phát vào public/study-media/,
 * rồi thêm một dòng vào đúng thể loại bên dưới, ghi rõ nguồn và giấy phép ở `credit`.
 * Các bài "on-nau", "mua", "song", "pad-*" do scripts/make-study-media.py tự tổng hợp, không có bản quyền bên thứ ba.
 */

export type StudyTrack = {
  id: string;
  title: string;
  titleEn: string;
  /** Path under the site root, e.g. "/study-media/pad-do.mp4" (H.264 + AAC). */
  src: string;
  /** Optional WebM (VP9 + Opus) copy for browsers without H.264, e.g. open-source Chromium. */
  webm?: string;
  /** Who made it and under what licence; shown under the player. */
  credit: string;
};

export type StudyCategory = { id: string; title: string; titleEn: string; tracks: StudyTrack[] };

const MADE_HERE = "Bàn Toán tự tổng hợp · Synthesised by Bàn Toán";

export const STUDY_CATEGORIES: StudyCategory[] = [
  {
    id: "nen",
    title: "Âm nền",
    titleEn: "Background sound",
    tracks: [
      { id: "on-nau", title: "Tiếng ồn nâu", titleEn: "Brown noise", src: "/study-media/on-nau.mp4", webm: "/study-media/on-nau.webm", credit: MADE_HERE },
      { id: "mua", title: "Mưa nhẹ", titleEn: "Light rain", src: "/study-media/mua.mp4", webm: "/study-media/mua.webm", credit: MADE_HERE },
      { id: "song", title: "Sóng biển", titleEn: "Sea waves", src: "/study-media/song.mp4", webm: "/study-media/song.webm", credit: MADE_HERE },
    ],
  },
  {
    id: "hoa-am",
    title: "Hòa âm chậm",
    titleEn: "Slow chords",
    tracks: [
      { id: "pad-do", title: "Đô trưởng chậm", titleEn: "Slow C major", src: "/study-media/pad-do.mp4", webm: "/study-media/pad-do.webm", credit: MADE_HERE },
      { id: "pad-la", title: "La thứ êm", titleEn: "Soft A minor", src: "/study-media/pad-la.mp4", webm: "/study-media/pad-la.webm", credit: MADE_HERE },
      { id: "pad-vong", title: "Vòng hòa âm I–V–vi–IV", titleEn: "I–V–vi–IV loop", src: "/study-media/pad-vong.mp4", webm: "/study-media/pad-vong.webm", credit: MADE_HERE },
    ],
  },
];

export const FALLBACK_MESSAGE = "Bài này không phát được. Hãy chọn bài khác.";
export const FALLBACK_MESSAGE_EN = "This track could not play. Pick another one.";

export function categoryById(id: string): StudyCategory {
  const found = STUDY_CATEGORIES.find((item) => item.id === id) ?? STUDY_CATEGORIES[0];
  if (!found) throw new Error("Danh sách nhạc trống");
  return found;
}

export function trackIn(category: StudyCategory, trackId: string): StudyTrack {
  const found = category.tracks.find((track) => track.id === trackId) ?? category.tracks[0];
  if (!found) throw new Error("Thể loại không có bài");
  return found;
}
