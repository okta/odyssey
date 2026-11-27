---
summary: Floating button hover and active fills become opaque
affectedExports:
  - Button
  - Toast
  - ToastStack
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a Button with variant floating, including the Toast close button
---

The floating button's hover and active tints went from translucent to opaque. Hover was `rgba(29, 29, 33, 0.1)` and is now #ededed; active was `rgba(29, 29, 33, 0.2)` and is now #e1e1e1. On any background other than white the hover state no longer picks up the underlying colour, so a floating button over a coloured surface now shows a flat grey patch. Its disabled label also went #6e6e6e to #aeaeae. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:300-320; v1.0.0 components.tsx:433-449.
