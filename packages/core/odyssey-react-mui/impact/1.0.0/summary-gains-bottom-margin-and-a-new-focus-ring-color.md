---
summary: "`summary` gains bottom margin and a new focus ring color"
affectedExports:
  - ScopedCssBaseline
  - OdysseyProvider
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: content inside ScopedCssBaseline that uses `<details>` and `<summary>`
---

`summary` gained `marginBlockEnd: Spacing2` 0.571rem, adding space between the summary line and the disclosed content where there was none. Its focus ring colour also went #4c64e1 to #546be7. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:944-955; v1.0.0 components.tsx:1105-1117.
