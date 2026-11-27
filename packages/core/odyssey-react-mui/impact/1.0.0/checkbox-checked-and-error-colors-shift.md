---
summary: Checkbox checked and error colors shift
affectedExports:
  - Checkbox
  - CheckboxGroup
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a Checkbox or CheckboxGroup in a checked, focused, or error state
---

Checkbox state colours all moved. Checked fill and border #4c64e1 to #546be7; checked under a hovered label #22307c to #2e40a5; the error border #d92300 to #e72500 with its checked fill matching; the error hover border and fill #711200 to #951800; and both focus rings, primary and error, follow their main colours. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:463-502; v1.0.0 components.tsx:540-579.
