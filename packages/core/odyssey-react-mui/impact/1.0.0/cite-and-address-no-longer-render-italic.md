---
summary: "`cite` and `address` no longer render italic"
affectedExports:
  - ScopedCssBaseline
  - OdysseyProvider
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: content inside ScopedCssBaseline that uses `<cite>` or `<address>`
---

Both elements stopped rendering italic. `cite` had `fontStyle: "italic"` and now has `fontStyle: "normal"`. `address` had no `fontStyle` at all, so it took the browser's italic default, and now sets `fontStyle: "normal"` explicitly. Note `dfn` still sets italic, so it no longer matches `cite`. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:662-671, 690-692; v1.0.0 components.tsx:802-812, 831-833.
