import assert from "node:assert/strict";
import { FALLBACK_MESSAGE, STUDY_CATEGORIES } from "../src/study/catalog.ts";
import { afterDelete, buttonIndex, pickNext, clampVolume, hideTrack, nextRepeat, readHidden, readPrefs, restoreCategory, shuffledIndex, stepIndex, STUDY_HIDDEN_KEY, STUDY_PREFS_KEY, undoHide, visibleTracks, writeHidden, writePrefs, emptyHidden } from "../src/study/logic.ts";
import { categoryById } from "../src/study/catalog.ts";

const titles = ["Lo-fi", "Piano", "Nhạc cổ điển", "Tiếng mưa / ồn trắng", "Jazz", "Nhạc không lời Việt"];
assert.deepEqual(STUDY_CATEGORIES.map((item) => item.title), titles);

const seen = new Set<string>();
const dead = new Set(["t2rAJI2tM0k", "Dx5qFachx6s", "1zxj-vf04wE", "bvGE_4Kz_sA", "HU7GL5_p5s0", "jfKfPfyJRdk", "7maJOI3QMu0", "vmDDOFXSgAs", "so6ExplQlaY", "NJuSStkIZBg", "ZTzdHGa-sx4", "gD-OMO1pDNk", "5qap5aO4i9A"]);
for (const category of STUDY_CATEGORIES) {
  assert.ok(category.tracks.length >= 3, category.title);
  for (const track of category.tracks) {
    assert.equal(track.youtubeId.length, 11, track.id);
    assert.equal(seen.has(track.youtubeId), false, track.youtubeId);
    assert.equal(dead.has(track.youtubeId), false, track.youtubeId);
    if (track.id === "lofi-radio") assert.equal(track.youtubeId, "rFZHOHl-L8A");
    seen.add(track.youtubeId);
  }
}

assert.equal(stepIndex(4, 1, 1, "off").index, 2);
assert.equal(stepIndex(4, 3, 1, "off").stop, true);
assert.equal(stepIndex(4, 3, 1, "all").index, 0);
assert.equal(stepIndex(4, 0, -1, "off").index, 3);
assert.equal(stepIndex(4, 2, 1, "one").index, 2);
assert.equal(buttonIndex(4, 2, 1, "one").index, 3);
assert.equal(buttonIndex(4, 3, 1, "one").stop, true);
assert.equal(buttonIndex(4, 3, 1, "all").index, 0);
assert.equal(shuffledIndex(1, 0, () => 0), 0);
assert.equal(shuffledIndex(4, 0, () => 0.6), 2);
assert.equal(nextRepeat("off"), "all");
assert.equal(nextRepeat("all"), "one");
assert.equal(nextRepeat("one"), "off");
assert.equal(clampVolume(140), 100);
assert.equal(clampVolume(Number.NaN), 40);
assert.match(FALLBACK_MESSAGE, /không phát được/i);

const mem = new Map<string, string>();
Object.defineProperty(globalThis, "localStorage", {
  configurable: true,
  value: {
    getItem: (key: string) => mem.get(key) ?? null,
    setItem: (key: string, value: string) => { mem.set(key, value); },
    removeItem: (key: string) => { mem.delete(key); },
  },
});
writePrefs({ categoryId: "jazz", trackId: "jazz-smooth", volume: 70, shuffle: true, repeat: "one" });
const saved = readPrefs();
assert.equal(saved.categoryId, "jazz");
assert.equal(saved.trackId, "jazz-smooth");
assert.equal(saved.volume, 70);
assert.equal(saved.shuffle, true);
assert.equal(saved.repeat, "one");
localStorage.setItem(STUDY_PREFS_KEY, "{");
assert.equal(readPrefs().trackId, "lofi-radio");
writePrefs({ categoryId: "missing", trackId: "missing", volume: 400, shuffle: false, repeat: "off" });
const repaired = readPrefs();
assert.equal(repaired.categoryId, "lofi");
assert.equal(repaired.trackId, "lofi-radio");
assert.equal(repaired.volume, 100);

const lofi = categoryById("lofi");
const hidden = hideTrack(emptyHidden(), "lofi", "lofi-1am");
assert.deepEqual(visibleTracks(lofi, hidden.ids).map((item) => item.id), ["lofi-radio", "lofi-chillhop", "lofi-beats"]);
assert.equal(lofi.tracks.length, 4);
const active = afterDelete(lofi.tracks.map((item) => item.id), "lofi-1am", "lofi-1am");
assert.equal(active.nextId, "lofi-chillhop");
assert.equal(active.stop, false);
const other = afterDelete(lofi.tracks.map((item) => item.id), "lofi-radio", "lofi-beats");
assert.equal(other.nextId, "lofi-radio");
const last = afterDelete(["lofi-radio"], "lofi-radio", "lofi-radio");
assert.equal(last.stop, true);
assert.equal(last.nextId, "");
const back = undoHide(hidden);
assert.deepEqual(back.ids, []);
writeHidden(hidden);
writePrefs({ categoryId: "lofi", trackId: "lofi-radio", volume: 55, shuffle: false, repeat: "off" });
assert.equal(readPrefs().volume, 55);
assert.deepEqual(readHidden().ids, ["lofi-1am"]);
assert.equal(restoreCategory(readHidden(), lofi).ids.length, 0);
assert.equal(stepIndex(visibleTracks(lofi, ["lofi-1am"]).length, 2, 1, "all").index, 0);
localStorage.setItem(STUDY_HIDDEN_KEY, "{");
assert.deepEqual(readHidden().ids, []);
// pickNext: danh sách một bài vẫn phát lại khi lặp cả danh sách hoặc ngẫu nhiên.
const one = ["a"];
assert.deepEqual(pickNext(one, "a", 1, { shuffle: false, repeat: "all", auto: true }), { id: "a", stop: false, restart: true });
assert.deepEqual(pickNext(one, "a", 1, { shuffle: true, repeat: "off", auto: true }), { id: "a", stop: false, restart: true });
assert.equal(pickNext(one, "a", 1, { shuffle: false, repeat: "off", auto: true }).stop, true);
const four = ["a", "b", "c", "d"];
assert.deepEqual(pickNext(four, "b", 1, { shuffle: false, repeat: "one", auto: true }), { id: "b", stop: false, restart: true });
assert.deepEqual(pickNext(four, "b", 1, { shuffle: false, repeat: "one", auto: false }), { id: "c", stop: false, restart: false });
assert.equal(pickNext(four, "d", 1, { shuffle: false, repeat: "off", auto: true }).stop, true);
assert.equal(pickNext(four, "d", 1, { shuffle: false, repeat: "all", auto: true }).id, "a");
assert.equal(pickNext(four, "a", -1, { shuffle: true, repeat: "off", auto: false }).id, "d");
assert.equal(pickNext(four, "a", 1, { shuffle: true, repeat: "off", auto: false, rng: () => 0.6 }).id, "c");
assert.equal(pickNext([], "a", 1, { shuffle: false, repeat: "all", auto: false }).stop, true);
console.log("study ok");
