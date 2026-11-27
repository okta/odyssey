---
summary: Radio shifts down slightly to align with its label
affectedExports:
  - Radio
  - RadioGroup
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: dddd7dd69
onlyRelevantIf: a Radio is rendered
---

MuiRadio's root gained `position: relative` and a small `inset-block-start` of 2px expressed against the theme font size, to line the control up with its label. The radio shifts down relative to where it sat before.
