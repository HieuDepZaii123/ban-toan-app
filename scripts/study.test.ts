import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { FALLBACK_MESSAGE, STUDY_CATEGORIES } from "../src/study/catalog.ts";
import { afterDelete, buttonIndex, pickNext, clampVolume, hideTrack, nextRepeat, readHidden, readPrefs, restoreCategory, shuffledIndex, stepIndex, STUDY_HIDDEN_KEY, STUDY_PREFS_KEY, undoHide, visibleTracks, writeHidden, writePrefs, emptyHidden } from "../src/study/logic.ts";
import { categoryById } from "../src/study/catalog.ts";

assert.deepEqual(STUDY_CATEGORIES.map((item) => item.title), ["Âm nền", "Hòa âm chậm"]);
const seen = new Set<string>();
for (const category of STUDY_CATEGORIES) {
  assert.ok(category.tracks.length >= 3 && category.titleEn, category.title);
  for (const track of category.tracks) {
    // Self-hosted only: every track is a file under public/, credited, with no outside service.
    assert.match(track.src, /^\/study-media\/[a-z0-9-]+\.(mp4|webm|m4a|mp3)$/, track.id);
    for (const file of [track.src, track.webm].filter((item): item is string => !!item)) {
      assert.ok(existsSync(new URL(`../public${file}`, import.meta.url)), `${file} is missing`);
    }
    assert.ok(track.credit.length > 3 && track.titleEn, `${track.id} needs a credit and an English title`);
    assert.equal(seen.has(track.id), false, track.id);
    seen.add(track.id);
  }
}
assert.equal(stepIndex(4, 1, 1, "off").index, 2);
assert.equal(stepIndex(4, 3, 1, "off").stop, true);
assert.equal(stepIndex(4, 3, 1, "all").index, 0);
assert.equal(stepIndex(4, 0, -1, "off").index, 3);
assert.equal(stepIndex(4, 2, 1, "one").index, 2);
assert.equal(buttonIndex(4, 2, 1, "one").index, 3);
assert.equal(buttonIndex(4, 3, 1, "one").stop, false);
assert.equal(buttonIndex(4, 3, 1, "one").index, 0);
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
writePrefs({ categoryId: "hoa-am", trackId: "pad-la", volume: 70, shuffle: true, repeat: "one" });
const saved = readPrefs();
assert.equal(saved.categoryId, "hoa-am");
assert.equal(saved.trackId, "pad-la");
assert.equal(saved.volume, 70);
assert.equal(saved.shuffle, true);
assert.equal(saved.repeat, "one");
localStorage.setItem(STUDY_PREFS_KEY, "{");
assert.equal(readPrefs().trackId, "on-nau");
writePrefs({ categoryId: "missing", trackId: "missing", volume: 400, shuffle: false, repeat: "off" });
const repaired = readPrefs();
assert.equal(repaired.categoryId, "nen");
assert.equal(repaired.trackId, "on-nau");
assert.equal(repaired.volume, 100);

const nen = categoryById("nen");
const hidden = hideTrack(emptyHidden(), "nen", "mua");
assert.deepEqual(visibleTracks(nen, hidden.ids).map((item) => item.id), ["on-nau", "song"]);
assert.equal(nen.tracks.length, 3);
const active = afterDelete(nen.tracks.map((item) => item.id), "mua", "mua");
assert.equal(active.nextId, "song");
assert.equal(active.stop, false);
const other = afterDelete(nen.tracks.map((item) => item.id), "on-nau", "song");
assert.equal(other.nextId, "on-nau");
const last = afterDelete(["on-nau"], "on-nau", "on-nau");
assert.equal(last.stop, true);
assert.equal(last.nextId, "");
const back = undoHide(hidden);
assert.deepEqual(back.ids, []);
writeHidden(hidden);
writePrefs({ categoryId: "nen", trackId: "on-nau", volume: 55, shuffle: false, repeat: "off" });
assert.equal(readPrefs().volume, 55);
assert.deepEqual(readHidden().ids, ["mua"]);
assert.equal(restoreCategory(readHidden(), nen).ids.length, 0);
assert.equal(stepIndex(visibleTracks(nen, ["mua"]).length, 1, 1, "all").index, 0);
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
assert.deepEqual(pickNext(four, "d", 1, { shuffle: false, repeat: "one", auto: false }), { id: "a", stop: false, restart: false });
assert.equal(pickNext(four, "d", 1, { shuffle: false, repeat: "all", auto: true }).id, "a");
assert.equal(pickNext(four, "a", -1, { shuffle: true, repeat: "off", auto: false }).id, "d");
assert.equal(pickNext(four, "a", 1, { shuffle: true, repeat: "off", auto: false, rng: () => 0.6 }).id, "c");
assert.equal(pickNext([], "a", 1, { shuffle: false, repeat: "all", auto: false }).stop, true);
console.log("study ok");
