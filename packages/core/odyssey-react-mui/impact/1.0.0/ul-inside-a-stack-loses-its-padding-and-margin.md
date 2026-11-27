---
summary: "`<ul>` inside a Stack loses its padding and margin"
affectedExports:
  - ScopedCssBaseline
  - OdysseyProvider
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a `<ul>` inside ScopedCssBaseline that is also a MUI Stack
---

A new rule zeroes `padding` and `margin` on any `ul` carrying `MuiStack-root`. A `<Stack component="ul">` previously kept the browser's list padding and margin; it now sits flush. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. No such rule at v0.24.0; v1.0.0 components.tsx:1027-1032.
