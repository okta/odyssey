---
summary: Checkbox and radio hint text error rule narrowed to fewer elements
affectedExports:
  - Checkbox
  - CheckboxGroup
  - Radio
  - RadioGroup
files:
  - packages/core/odyssey-react-mui/src/Fields/Hint.tsx
commit: da4a55f58
onlyRelevantIf: the consumer renders other elements carrying an error class inside a Radio or Checkbox hint, or has CSS competing at single-class specificity there
---

The hint-text rule that keeps helper text subordinate gray under an invalid field narrowed from a single `.Mui-error` class to the form helper text root and error classes together. It matches fewer elements and at higher specificity. Check hint text color under invalid radios and checkboxes, especially where the hint holds other error-styled content.
