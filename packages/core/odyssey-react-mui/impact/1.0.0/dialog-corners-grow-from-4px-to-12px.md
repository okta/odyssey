---
summary: Dialog corners grow from 4px to 12px
affectedExports:
  - Dialog
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a Dialog
---

The dialog's corners went from 4px to 12px. The paper slot gained an explicit `borderRadius: BorderRadiusOuter` 12px; it previously had no radius rule and inherited MUI's Paper default, which comes from `shape.borderRadius`, itself derived from the old 4px base radius. That is a threefold increase, larger than the 4px-to-6px move in the default radius token. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:975-980; v1.0.0 components.tsx:1137-1143.
