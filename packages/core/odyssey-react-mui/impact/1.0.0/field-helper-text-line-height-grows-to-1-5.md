---
summary: Field helper text line-height grows to 1.5
affectedExports:
  - TextField
  - PasswordField
  - SearchField
  - Select
  - NativeSelect
  - Autocomplete
  - Checkbox
  - CheckboxGroup
  - Radio
  - RadioGroup
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a field with hint or error text
---

Helper text leading opened up, from a hardcoded `"1.33333333"` to `TypographyLineHeightBody` 1.5. Multi-line hints and error messages are taller, so fields with wrapping help text push the fields below them further down. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:1128; v1.0.0 components.tsx:1295.
