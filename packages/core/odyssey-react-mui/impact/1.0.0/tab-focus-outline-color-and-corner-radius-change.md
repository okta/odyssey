---
summary: Tab focus outline color and corner radius change
affectedExports:
  - Tabs
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a keyboard user reaching a tab
---

The tab's focus outline, drawn as a `::before` pseudo-element, changed colour from #4c64e1 to #546be7 and its corner radius from 4px to 6px. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:1696-1707; v1.0.0 components.tsx:1879-1890.
