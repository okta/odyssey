---
summary: "`FormHelperText` becomes a flex row instead of a block element"
affectedExports:
  - Autocomplete
  - Checkbox
  - CheckboxGroup
  - NativeSelect
  - PasswordField
  - RadioGroup
  - SearchField
  - Select
  - TextField
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 1bb47d049
onlyRelevantIf: a field whose hint or error message runs to more than one line, or contains inline markup
---

MuiFormHelperText's root became `display: flex` with `justifyContent: flex-start` and `alignItems: center`, where it was a normal block before. Hint and error text is now a flex row, so inline children become flex items that do not wrap as text, and a multi-line message lays out differently. This reaches every field that renders a hint or an error message.
