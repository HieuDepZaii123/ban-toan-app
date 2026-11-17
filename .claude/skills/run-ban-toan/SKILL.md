---
name: run-ban-toan
description: Build, run, test and drive Bàn Toán (React/Vite maths study app with a Fetch-style API). Use when asked to start the app, run its tests, build it, screenshot a topic page or its interactive figures, or call /api/chat marking.
---

Bàn Toán is a Vite + React 19 app; the API (`/api/chat`, `/api/premium/*`) is mounted on the same dev port by a Vite plugin. Drive the UI with `.claude/skills/run-ban-toan/driver.mjs` (Playwright, headless Chromium) and the API with `curl`. Paths are relative to the repo root.

## Prerequisites

Node >= 22.13. Chromium and Playwright are preinstalled in the container (`require('playwright')` works; do not run `playwright install`). `chromium-cli` is NOT installed here, hence the custom driver.

```bash
npm ci
```

## Run (agent path)

```bash
npm run dev > /tmp/dev.log 2>&1 &
timeout 40 bash -c 'until curl -sf http://127.0.0.1:43123 >/dev/null; do sleep 1; done'
node .claude/skills/run-ban-toan/driver.mjs trig vi        # args: topicId lang(vi|en) outDir
```

The driver opens `/t/<topic>?tab=hoc`, waits for the lazy "Suy từ số 0" figures, moves the first figure's slider and checks its canvas repainted, writes `<outDir>/<topic>-<lang>-figure.png` and `-page.png` (default `/tmp/ban-toan-shots`), and prints JSON `{heading, cards, mapNodes, canvasChanged, errors}`. Exit code is 1 on any console/page error or zero figures. Topic ids: quadratic ineq exp sequence trig limit derivative survey integral vector analytic triangle combo probability. Look at the PNG: a blank canvas means failure.

API check (offline "demo" marking, no key needed; free cap is 3 markings per device per week, so change the device id):

```bash
curl -s -XPOST 'http://127.0.0.1:43123/api/chat?do=check' -H 'content-type: application/json' \
  -d '{"problem":"Giải 2x + 6 = 0","steps":["2 + 2 = 5"],"device":"device-smoke-0001"}'
```

Stop: `lsof -ti:43123 -sTCP:LISTEN | xargs -r kill`

## Test and build

```bash
npx tsc -b && npx oxlint
npm run test:server    # tsx scripts + SQLite and PGlite (no external DB)
npm run test:content   # content, math (sympy-free), algorithms
npm run test:ui        # vitest, jsdom
npm run build
```

## Gotchas

- Dev port is fixed at 43123 (`strictPort`); preview is 43991. Not Vite's default 5173.
- The first figure render waits for a lazy chunk; wait for `.fz-card`, not a sleep.
- Language and other prefs live in one localStorage JSON blob `ban-toan` (`{v:1, lang:"en", at:{lang:<ms>}}`); the driver seeds it before load. There is no `lang` key.
- Range sliders: use Playwright `fill`; setting `el.value` plus an `input` event does not reach React and the canvas does not change.
- Marking is in demo mode without model keys: it only checks arithmetic/identities and answers "unclear" for anything else.
- Lint prints many pre-existing warnings; judge by errors and by files you touched.

## Troubleshooting

- `curl: (7)` on port 5173: wrong port, use 43123.
- Driver times out at `.fz-card`: the topic id is wrong or the dev server is still optimising dependencies (check `/tmp/dev.log`), retry.
- 429 `quota` from the check endpoint: use a new `device` id.
