---
summary: Alert background color moves up one hue step
affectedExports:
  - Banner
  - Callout
  - Toast
  - ToastStack
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a Banner, Callout, or Toast is rendered with any severity
---

Every alert background moved one step up the hue ramp, from the old `palette[severity].lighter` to `Hue<colour>100`: error #fff0ee to #ffd8d1, info #f2f3fd to #dbe0fa, success #defae7 to #94f5b3, warning #fcf6ac to #fce101. The success and warning fills are the largest jumps. Check contrast of any text or icon you place inside an alert, and any surrounding surface tuned to the old pale fill. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:59-62; v1.0.0 components.tsx:73-108.
