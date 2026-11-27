---
summary: Controlled Switch stops flipping optimistically, renders strictly from prop
affectedExports:
  - Switch
files:
  - packages/core/odyssey-react-mui/src/Switch.tsx
commit: bd493334f
onlyRelevantIf: a controlled Switch, meaning one given `isChecked`, whose handler does not actually update that value
---

A controlled switch no longer updates its own internal state on click and renders strictly from the prop. An app that relied on the optimistic local flip without updating the prop will now see the switch not move. Check controlled switches end to end.
