---
summary: Error and warning Alert icons change shape
affectedExports:
  - Banner
  - Callout
  - Toast
  - ToastStack
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a Banner, Callout, or Toast with severity error or warning
---

The error and warning glyphs are different shapes now. `iconMapping.error` went from `AlertTriangleFilledIcon` to `DangerDiamondFilledIcon`, and `iconMapping.warning` from `AlertTriangleFilledIcon` to `WarningFilledIcon`, so error and warning no longer share one triangle. Both new glyphs have different silhouettes and optical weight. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:46-53; v1.0.0 components.tsx:57-64.
