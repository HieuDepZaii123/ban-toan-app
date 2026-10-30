import assert from "node:assert/strict";
import { cards } from "../src/content/cards.ts";
import { embedUrl, isYoutubeId, lectures, lecturesFor, SAMPLE_YOUTUBE_ID, scienceLectures } from "../src/content/lectures.ts";
import { sciences } from "../src/science/catalog.ts";

for (const card of cards) {
  const pair = lectures[card.id];
  assert.equal(pair.length, 2, card.id);
  assert.equal(lecturesFor(card.id).length, 2, card.id);
  for (const video of pair) {
    assert.equal(video.youtubeId === "" || isYoutubeId(video.youtubeId), true, video.slot);
  }
}

for (const area of sciences) {
  const pair = scienceLectures[area.id];
  assert.equal(pair.length, 2, area.id);
  assert.equal(lecturesFor(area.id).length, 2, area.id);
  for (const video of pair) {
    assert.equal(video.youtubeId === "" || isYoutubeId(video.youtubeId), true, video.slot);
  }
}

assert.equal(isYoutubeId(SAMPLE_YOUTUBE_ID), true);
assert.equal(embedUrl(""), null);
assert.equal(embedUrl("KHONG_PHAI_ID"), null);
assert.equal(
  embedUrl(SAMPLE_YOUTUBE_ID),
  `https://www.youtube-nocookie.com/embed/${SAMPLE_YOUTUBE_ID}?rel=0`,
);
assert.equal(lecturesFor("khong-co").length, 0);

console.log(`lectures: ${cards.length} toán + ${sciences.length} khoa học`);
