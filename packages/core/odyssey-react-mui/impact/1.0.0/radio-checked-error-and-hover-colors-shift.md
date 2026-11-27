---
summary: Radio checked, error, and hover colors shift
affectedExports:
  - Radio
  - RadioGroup
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a Radio or RadioGroup in a checked, focused, or error state
---

Radio state colours all moved. The checked dot #4c64e1 to #546be7; the error border and error checked dot #d92300 to #e72500; the error hover border and dot #711200 to #951800; and both focus rings follow their main colours. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:1566-1595; v1.0.0 components.tsx:1734-1763.
