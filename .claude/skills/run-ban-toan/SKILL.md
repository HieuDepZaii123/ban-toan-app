---
name: run-ban-toan
description: Launch the Bàn Toán web app (Vite + React, with its /api/chat and /api/premium routes) and drive it in headless Chromium to see a change working - pages in Vietnamese or English, the tutor and marking APIs. Use when asked to run, start, screenshot or try the app, or to confirm a UI or API change works in the real app rather than only in tests.
---

# Run Bàn Toán

Verified cold in a Linux container (Node 22, the pre-installed Chromium + Playwright). No env vars or keys are needed: without AI keys the tutor and marking answer in **demo mode**, and without `DATABASE_URL` quotas and payments use in-memory/SQLite stores.

## 1. Install and start the dev server

```bash
npm ci --no-audit --no-fund          # once per checkout or after package.json changes
lsof -ti:43123 -sTCP:LISTEN | xargs -r kill   # free the port from an earlier run
npm run dev > /tmp/ban-toan-dev.log 2>&1 &
timeout 60 bash -c 'until curl -sf http://127.0.0.1:43123/ >/dev/null; do sleep 1; done'
```

- The port is fixed: `vite.config.ts` sets `127.0.0.1:43123` with `strictPort`, so a second server fails instead of moving ports. In a git worktree next to another running copy, start this one with `npx vite --port <free port>` and pass `--base http://127.0.0.1:<port>` to the driver.
- The same Vite process serves the API (`server/pay/vitePlugin.ts`): `/api/chat` (tutor, and marking at `/api/chat?do=check`) and `/api/premium/*`.
- Stop with the same `lsof … | xargs -r kill`. Don't use a broad `pkill -f`.

## 2. Drive the UI

```bash
node .claude/skills/run-ban-toan/drive.cjs --lang en /kien-thuc/9/rut-gon-can /cham-bai /thi-thu
```

It switches the site language through the UI, opens each path, waits for the `<h1>`, takes a full-page screenshot (420×900, default folder `$TMPDIR/ban-toan-shots`, override with `--out`), and prints one JSON line per page: `path`, `title` (browser tab), `h1`, `kicker`, `errors` (page and console errors), `shot`. It exits 1 if a page has no `<h1>` or logged an error. **Open the screenshots and look at them.**

For a flow the driver doesn't cover (filling a form, clicking through a paper), copy `drive.cjs` to the scratchpad and add steps after `page.goto`; Playwright's `fill`/`click` go through React's input pipeline.

Useful paths: `/` home · `/kien-thuc/<grade>[/<lessonId>]` grade lessons (ids are the first argument of `bai(...)` in `src/content/grades/lopNN.ts`) · `/t/<topicId>` topic sheets · `/luyen-thpt`, `/thi-thu` practice and mock exam · `/cham-bai` mark my working · `/phu-huynh`, `/bao-cao#r=…` parent mode and report · `/nang-cap` Premium · `/khoa-hoc` science. Every route is in `src/App.tsx` and `src/ui/navLinks.ts`.

## 3. Hit the API

```bash
curl -s -X POST 'http://127.0.0.1:43123/api/chat?do=check' -H 'content-type: application/json' \
  -d '{"problem":"Tính","steps":["2 + 3 = 6"],"device":"device-run-0001"}'
# {"verdict":"wrong","step":1,...,"mode":"demo","limit":3,"period":"week","remaining":2}

curl -s -X POST http://127.0.0.1:43123/api/chat -H 'content-type: application/json' \
  -d '{"messages":[{"role":"user","content":"Đạo hàm của x mũ 2"}]}'
```

`"mode":"demo"` means no AI key is set; that is expected locally. Free quotas count per `device`; use a fresh id to get a clean allowance.

## Gotchas

- **Language switch:** the header button is labelled "Tùy chọn" in Vietnamese and "Settings" in English; inside it are "Tiếng Việt" / "English". Setting localStorage by hand doesn't take reliably; the driver clicks the UI.
- **Lazy routes:** pages are lazy chunks compiled on first visit, so the first load of a route can take several seconds. Wait for an element, not a timer.
- **Lesson content is Vietnamese-only by design:** in English mode, headings, kickers, tab titles and UI labels are English, while lesson summaries and exercises stay Vietnamese.
- **Running alongside the test suite:** `npm run check` while a dev server and browser are busy can make the `ExamPage.test.tsx` UI test hit its 5s timeout. Rerun it when the machine is idle before treating it as a failure.
- **Vercel deploys** count serverless functions in `api/`: keep it at 12 files or fewer (`scripts/check.test.ts` enforces this). Local dev doesn't show this limit.
