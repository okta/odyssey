---
summary: Checked disabled checkbox check mark lightens to a low-contrast grey
affectedExports:
  - Checkbox
  - CheckboxGroup
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: c076b5bff
onlyRelevantIf: a checkbox that is both checked and disabled
---

The check mark inside a disabled checkbox moved from HueNeutral900 to HueNeutral300 (#cbcbcb) while the box keeps its HueNeutral50 (#f4f4f4) background. The tick is now very low contrast against the box. Check whether a disabled checked state still reads as checked.
