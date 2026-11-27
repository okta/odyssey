---
summary: Table sort icon focus ring color and animation speed change
affectedExports:
  - OdysseyProvider
  - ThemeProvider
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a sortable MUI Table column rendered under OdysseyProvider
---

The sort label's focus outline colour went #4c64e1 to #546be7, and its arrow's fade-and-rotate transition went from `theme.transitions.duration.shorter`, MUI's 200ms, to `TransitionDurationMain` 100ms. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:1904-1910, 1931-1933; v1.0.0 components.tsx:2078-2084, 2105-2107.
