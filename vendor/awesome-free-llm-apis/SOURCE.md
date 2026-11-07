# awesome-free-llm-apis (vendored)

- Upstream: https://github.com/mnfst/awesome-free-llm-apis
- Commit: 095e35e (data `lastUpdated` 2026-10-25)
- License: CC0 1.0 (see `license`)

`data.json` is copied unchanged. The tutor does not read it at runtime: `npm run free-llm:sync`
regenerates `server/chat/freeCatalog.ts` from it, keeping only the providers listed in
`server/chat/free.ts`. To update, replace `data.json` with a newer upstream copy, then run the sync
and `npm test`.
