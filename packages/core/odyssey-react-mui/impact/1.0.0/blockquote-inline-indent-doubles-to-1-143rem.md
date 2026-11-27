---
summary: Blockquote inline indent doubles to 1.143rem
affectedExports:
  - ScopedCssBaseline
  - OdysseyProvider
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: content inside ScopedCssBaseline that uses `<blockquote>`
---

The blockquote's inline indent doubled, from `theme.spacing(2)` 0.571rem to `Spacing4` 1.143rem, measured from the 3px rule to the text. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:679; v1.0.0 components.tsx:820.
