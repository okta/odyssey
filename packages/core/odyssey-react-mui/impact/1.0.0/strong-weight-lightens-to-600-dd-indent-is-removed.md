---
summary: "`strong` weight lightens to 600; `dd` indent is removed"
affectedExports:
  - ScopedCssBaseline
  - OdysseyProvider
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: content inside ScopedCssBaseline that uses `<strong>` or `<dd>`
---

Two elements gained a rule where they previously took the browser default. `strong` now sets `fontWeight: TypographyWeightBodyBold` 600, lighter than the browser's 700, so bold runs in prose get visibly thinner. `dd` now sets `marginInlineStart: Spacing0` 0, removing the browser's 40px indent; the block is a two-column grid, so the indent was pushing the description column's text off its track. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. Neither rule exists at v0.24.0; v1.0.0 components.tsx:899-903, 1095-1097.
