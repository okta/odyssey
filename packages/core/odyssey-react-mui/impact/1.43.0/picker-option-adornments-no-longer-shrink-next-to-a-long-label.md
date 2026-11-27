---
summary: Picker option adornments no longer shrink next to a long label
affectedExports:
  - PickerWithOptionAdornment
files:
  - packages/core/odyssey-react-mui/src/labs/OdysseyPickers/PickerWithOptionAdornment.tsx
commit: 2b772c9ee
onlyRelevantIf: a picker whose options carry an adornment
---

Option adornments gained `flexShrink: 0`, so they keep their size instead of compressing when the label is long. Check option rows with both an adornment and a long label.
