---
summary: Field error message renders as a div instead of a p
affectedExports:
  - TextField
  - PasswordField
  - Select
  - NativeSelect
  - Autocomplete
  - CheckboxGroup
  - RadioGroup
  - SearchField
files:
  - packages/odyssey-react-mui/src/FieldError.tsx
commit: c57c96408
onlyRelevantIf: a field renders an error message
---

FieldError's FormHelperText now renders as a `<div>` instead of a `<p>`. Any consumer CSS or selector written as `p.MuiFormHelperText-root` inside a field stops matching, and the default block margins a browser applies to a paragraph no longer apply.
