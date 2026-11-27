---
summary: Alert title spacing doubles; font switches to heading family
affectedExports:
  - Banner
  - Callout
  - Toast
  - ToastStack
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a Banner, Callout, or Toast that carries a title
---

The alert title's space below it doubled, from `theme.spacing(1)` 0.286rem to `Spacing2` 0.571rem, and the block gained `fontFamily: TypographyFamilyHeading`, so the title now renders in Aeonik rather than inheriting the body family. If Aeonik is not served, the fallback chain starts at Inter and the metrics are unchanged. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:133-147; v1.0.0 components.tsx:206-221.
