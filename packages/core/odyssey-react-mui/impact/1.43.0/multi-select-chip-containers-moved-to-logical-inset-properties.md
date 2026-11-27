---
summary: Multi-select chip containers moved to logical inset properties
affectedExports:
  - Select
files:
  - packages/core/odyssey-react-mui/src/Select.tsx
commit: 8a51f693d
onlyRelevantIf: a Select that accepts multiple choices, which is what renders the chip containers
---

The selected-value chip containers moved to logical inset properties with changed values, and the inner container gained negative block margin and inline-end margin. Check the position and spacing of selected-value chips in a multi-select, at both narrow and wide field widths.
