---
summary: "`abbr` underline turns neutral grey instead of blue"
affectedExports:
  - ScopedCssBaseline
  - OdysseyProvider
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: content inside ScopedCssBaseline that uses `<abbr>` or `<samp>`
---

`abbr`'s dashed underline went from #22307c, a dark blue, to #4b4b4b, a neutral grey, so abbreviations no longer read as blue-tinted. `samp`'s background darkened from #f4f4f4 to #ededed while its one-pixel bottom shadow stayed #f4f4f4, so the two no longer match. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:655-660, 923-932; v1.0.0 components.tsx:795-800, 1080-1089.
