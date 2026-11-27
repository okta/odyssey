---
summary: "`small`, `sub`, `sup` grow larger; `figcaption` shrinks"
affectedExports:
  - ScopedCssBaseline
  - OdysseyProvider
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: content inside ScopedCssBaseline that uses `<small>`, `<sub>`, `<sup>`, or `<figcaption>`
---

Small text got bigger. `small`, `sub`, and `sup` all read `theme.typography.caption.fontSize`, which is MUI's own 0.75rem because the theme never defines a `caption` variant; they now read `TypographySizeSubordinate` 0.857rem, a 14 percent increase. `figcaption:not([class])` moved the other way, from `body1.fontSize` 1rem down to the same 0.857rem. Check line boxes that contain superscripts and any caption sized to fit. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:778-781, 934-942, 957-961; v1.0.0 components.tsx:929-932, 1091-1103, 1119-1123.
