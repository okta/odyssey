---
summary: Alert severity icon shrinks and changes color
affectedExports:
  - Banner
  - Callout
  - Toast
  - ToastStack
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a Banner, Callout, or Toast with its severity icon visible
---

The severity icon shrank and changed colour. Its `fontSize` went from a hardcoded 1.429rem to `TypographySizeHeading6` 1.143rem, a 20 percent reduction, and the slot gained a fixed `height: calc(1.143rem * 1.3)` plus `alignSelf: center` where it previously took `fontSize: inherit`. Icon colours: info #4c64e1 to #546be7, error #d92300 to #e72500, success #197f48 to #16884a, warning #4c3302 to #664402. Check alert rows sized around the larger glyph. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:102-117; v1.0.0 components.tsx:169-191.
