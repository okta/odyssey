---
summary: Required asterisk no longer renders; label spacing changes
affectedExports:
  - Checkbox
  - CheckboxGroup
  - Radio
  - RadioGroup
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 02dd19a18
---

MuiFormControlLabel lost gap: spacing(2) on its root and gained a label-slot rule applying marginInlineStart only when the label is not the first child, plus asterisk: display none. Spacing changes for labelPlacement="start", and MUI's required asterisk no longer renders anywhere. The checkbox error selectors were also narrowed to .Mui-error:not(.Mui-valid).
