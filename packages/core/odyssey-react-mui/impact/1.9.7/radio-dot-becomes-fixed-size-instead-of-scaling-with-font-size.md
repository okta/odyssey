---
summary: Radio dot becomes fixed size instead of scaling with font size
affectedExports:
  - Radio
  - RadioGroup
  - Checkbox
  - CheckboxGroup
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: c076b5bff
---

The radio dot moved from `0.5em` to the fixed Spacing2, so it no longer scales with font size, and the disabled border and checked dot moved from HueNeutral300 (#cbcbcb) to BorderColorDisabled, which resolves to HueNeutral200 (#e1e1e1) and is lighter. MuiFormControl gained `marginBlockStart: Spacing1` on a nested FormGroup, and MuiFormControlLabel's label slot gained `lineHeight: TypographyLineHeightUi`. MuiFormLabel already carried that line height before this commit. Check vertical rhythm in checkbox and radio groups and the disabled contrast.
