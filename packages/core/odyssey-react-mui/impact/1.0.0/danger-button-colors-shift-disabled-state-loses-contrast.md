---
summary: Danger button colors shift; disabled state loses contrast
affectedExports:
  - Button
  - Dialog
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a Button with variant danger
---

Every danger button state changed colour. Rest #d92300 to #e72500, hover #711200 to #951800, active #d92300 to #711200 so pressing now darkens, and disabled went from white text on #febbae to #fe8f7a text on #ffd8d1. Check the disabled contrast. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:274-298; v1.0.0 components.tsx:412-432.
