---
summary: Theme cache invalidation on token and shadow root change restored
affectedExports:
  - OdysseyProvider
  - OdysseyThemeProvider
files:
  - packages/core/odyssey-react-mui/src/useThemeCache.ts
commit: 9aca76960
---

Theme cache invalidation on token and shadow-root change was restored, fixing the stale theme introduced in 1.62.2. A consumer passing a fresh object identity on every render now rebuilds themes every render, which is correct but costs more. Check runtime token switching, and check render cost if token overrides are built inline.
