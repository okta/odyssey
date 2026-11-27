---
summary: "`del`, `ins`, and `mark` highlight fills move to a lighter palette"
affectedExports:
  - ScopedCssBaseline
  - OdysseyProvider
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: content inside ScopedCssBaseline that uses `<del>`, `<ins>`, or `<mark>`
---

All three highlight fills moved to the new `highlight` palette step. `del` #febbae to `PaletteDangerHighlight` #ffd8d1, `ins` #7be09e to `PaletteSuccessHighlight` #94f5b3, `mark` #f9c503 to `PaletteWarningHighlight` #fce101. Each is lighter and more saturated; check text contrast over `mark` in particular, which went from a mid ochre-yellow to near-pure yellow. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:701, 793, 832; v1.0.0 components.tsx:851, 944, 983.
