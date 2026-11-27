---
summary: Banner close button moves closer to the banner edge
affectedExports:
  - Banner
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a Banner with a close button
---

The banner's absolutely positioned action moved inward. Its inline-end inset went from `theme.spacing(4)` 1.143rem to `Spacing2` 0.571rem, so the close button now sits about 0.57rem closer to the banner edge. A new rule also adds `paddingInline: Spacing6` 2.286rem to the whole banner whenever `onClose` is supplied, widening the text gutters on both sides. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:87-95; v1.0.0 components.tsx:130-162.
