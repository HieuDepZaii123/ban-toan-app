/** Danh sách nhạc học. Mỗi youtubeId đã trả về tiêu đề qua oembed. */

export type StudyTrack = { id: string; title: string; youtubeId: string };

export type StudyCategory = { id: string; title: string; tracks: StudyTrack[] };

export const STUDY_CATEGORIES: StudyCategory[] = [
  {
    id: "lofi",
    title: "Lo-fi",
    tracks: [
      { id: "lofi-radio", title: "Lo-fi radio để học", youtubeId: "5qap5aO4i9A" },
      { id: "lofi-1am", title: "Phiên học một giờ sáng", youtubeId: "lTRiuFIWV54" },
      { id: "lofi-chillhop", title: "Chillhop radio", youtubeId: "5yx6BWlEVcY" },
      { id: "lofi-beats", title: "Nhịp lo-fi để thư giãn", youtubeId: "7NOSDKb0HlU" },
    ],
  },
  {
    id: "piano",
    title: "Piano",
    tracks: [
      { id: "piano-clair", title: "Clair de Lune", youtubeId: "WNcsUNKlAKw" },
      { id: "piano-gym", title: "Gymnopédie số 1", youtubeId: "2WfaotSK3mI" },
      { id: "piano-nocturne", title: "Nocturne cung Mi giáng", youtubeId: "9E6b3swbnWg" },
    ],
  },
  {
    id: "classical",
    title: "Nhạc cổ điển",
    tracks: [
      { id: "class-moon", title: "Sonata ánh trăng", youtubeId: "4Tr0otuiQuU" },
      { id: "class-seasons", title: "Bốn mùa của Vivaldi", youtubeId: "GRxofEmo3HA" },
      { id: "class-best", title: "Tuyển tập Mozart, Beethoven, Bach", youtubeId: "jgpJVI3tDbY" },
    ],
  },
  {
    id: "rain",
    title: "Tiếng mưa / ồn trắng",
    tracks: [
      { id: "rain-window", title: "Mưa trên cửa sổ", youtubeId: "mPZkdNFkNps" },
      { id: "rain-night", title: "Mưa đêm nhẹ", youtubeId: "q76bMs-NwRk" },
      { id: "rain-white", title: "Ồn trắng", youtubeId: "nMfPqeZjc2c" },
      { id: "rain-long", title: "Mưa dài để tập trung", youtubeId: "8plwv25NYRo" },
    ],
  },
  {
    id: "jazz",
    title: "Jazz",
    tracks: [
      { id: "jazz-cafe", title: "Jazz quán cà phê đêm", youtubeId: "BywDOO99Ia0" },
      { id: "jazz-smooth", title: "Jazz êm để học", youtubeId: "SORD03t7nlo" },
      { id: "jazz-coffee", title: "Jazz quán cà phê", youtubeId: "fEvM-OUbaKs" },
    ],
  },
  {
    id: "viet",
    title: "Nhạc không lời Việt",
    tracks: [
      { id: "viet-bolero", title: "Hòa tấu bolero không lời", youtubeId: "oGJ4WUbSUUc" },
      { id: "viet-rumba", title: "Nhạc không lời rumba", youtubeId: "sIJaYUkO4Vo" },
      { id: "viet-xa", title: "Hòa tấu Kẻ ở miền xa", youtubeId: "hd5wbNcjIcA" },
    ],
  },
];

export const FALLBACK_MESSAGE = "Video này không phát được. Hãy chọn bài khác.";

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
