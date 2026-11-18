---
name: run-ban-toan
description: Build, run, test and drive Bàn Toán (React/Vite maths study app with a Fetch-style API). Use when asked to start the app, run its tests, build it, screenshot a topic page or its interactive figures, or call /api/chat marking.
---

Hướng dẫn đầy đủ nằm trong `AGENTS.md` ở gốc repo (dùng chung cho mọi agent). Tóm tắt:

```bash
npm ci
nohup npm run dev > /tmp/dev.log 2>&1 &
npm run drive -- trig vi        # ảnh ở /tmp/ban-toan-shots, JSON kết quả, mã thoát 1 nếu lỗi
npx tsc -b && npx oxlint && npm run test:content && npm run test:ui
```

Driver là `scripts/drive-topic.mjs`. Xem `AGENTS.md` cho các điểm dễ vấp (cổng 43123, khóa localStorage `ban-toan`, thanh trượt dùng `fill`).
