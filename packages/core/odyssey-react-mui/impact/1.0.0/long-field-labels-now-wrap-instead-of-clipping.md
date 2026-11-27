---
summary: Long field labels now wrap instead of clipping
affectedExports:
  - TextField
  - PasswordField
  - SearchField
  - Select
  - NativeSelect
  - Autocomplete
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a field whose label is long enough to overflow its width
---

Long field labels now wrap instead of being clipped. The block gained `overflow: "unset"` and `whiteSpace: "unset"`, cancelling MUI's InputLabel defaults of `overflow: hidden` and `white-space: nowrap`. A label that previously stayed on one line and got cut off now wraps to a second line and pushes the input down. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:1319-1338; v1.0.0 components.tsx:1475-1496.
