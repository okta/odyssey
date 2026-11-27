---
summary: "Dialog body text lightens from #272727 to #4b4b4b"
affectedExports:
  - Dialog
  - DialogContentText
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a Dialog whose body text is a DialogContentText
---

Dialog body text lightened from #272727 to #4b4b4b. The `defaultProps: { color: "text.primary" }` that pinned it to the body colour was removed, and the root now sets `color: HueNeutral700` directly. Check contrast on dialog copy. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:1011-1023; v1.0.0 components.tsx:1178-1188.
