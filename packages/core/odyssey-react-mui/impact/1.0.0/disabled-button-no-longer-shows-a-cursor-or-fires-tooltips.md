---
summary: Disabled button no longer shows a cursor or fires tooltips
affectedExports:
  - Button
  - MenuButton
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a disabled Button wrapped in a Tooltip, or one whose disabled cursor was relied on
---

A disabled button stopped receiving pointer events and lost its cursor hint. `&:disabled` was `{ cursor: "not-allowed", pointerEvents: "initial" }` with a companion `&:disabled:active { pointerEvents: "none" }`; it is now just `{ pointerEvents: "none" }`. The primary variant's own `pointerEvents: "initial"` is gone too. A tooltip or hover handler attached to a disabled button no longer fires, and the cursor reverts to the default arrow. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:246, 390-397; v1.0.0 components.tsx:344-346.
