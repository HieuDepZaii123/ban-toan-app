import assert from "node:assert/strict";
import { FALLBACK_MESSAGE, STUDY_CATEGORIES } from "../src/study/catalog.ts";
import { buttonIndex, clampVolume, nextRepeat, readPrefs, shuffledIndex, stepIndex, STUDY_PREFS_KEY, writePrefs } from "../src/study/logic.ts";

const titles = ["Lo-fi", "Piano", "Nhạc cổ điển", "Tiếng mưa / ồn trắng", "Jazz", "Nhạc không lời Việt"];
assert.deepEqual(STUDY_CATEGORIES.map((item) => item.title), titles);

const seen = new Set<string>();
const dead = new Set(["t2rAJI2tM0k", "Dx5qFachx6s", "1zxj-vf04wE", "bvGE_4Kz_sA", "HU7GL5_p5s0", "jfKfPfyJRdk", "7maJOI3QMu0", "vmDDOFXSgAs", "neV3EPgvZ3g", "so6ExplQlaY", "NJuSStkIZBg", "ZTzdHGa-sx4", "gD-OMO1pDNk"]);
for (const category of STUDY_CATEGORIES) {
  assert.ok(category.tracks.length >= 3, category.title);
  for (const track of category.tracks) {
    assert.equal(track.youtubeId.length, 11, track.id);
    assert.equal(seen.has(track.youtubeId), false, track.youtubeId);
    assert.equal(dead.has(track.youtubeId), false, track.youtubeId);
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
console.log("study ok");
