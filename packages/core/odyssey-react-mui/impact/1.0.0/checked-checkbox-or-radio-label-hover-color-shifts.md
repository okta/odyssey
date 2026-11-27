---
summary: Checked checkbox or radio label hover color shifts
affectedExports:
  - Checkbox
  - CheckboxGroup
  - Radio
  - RadioGroup
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: hovering a Checkbox or Radio through its label
---

Label-hover colours on a checked control moved: #22307c to #2e40a5 in the normal case, and #711200 to #951800 in the error case. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:1098-1109; v1.0.0 components.tsx:1267-1278.
