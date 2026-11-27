---
summary: Primary button colors shift; disabled state loses contrast
affectedExports:
  - Button
  - MenuButton
  - Dialog
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a Button with variant primary, which is the default
---

Every primary button state changed colour. Rest #4c64e1 to #546be7, hover #22307c to #2e40a5, active #4c64e1 to #22307c so pressing now darkens rather than returning to rest, and disabled went from white text on #9daaf1 to #9daaf1 text on #dbe0fa, which is a much lighter and lower-contrast disabled state. Check the disabled contrast in particular. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:228-249; v1.0.0 components.tsx:354-370.
