---
summary: Field hint and error text lose flex layout, hint link restyled
affectedExports:
  - TextField
  - Select
  - Autocomplete
  - Checkbox
  - CheckboxGroup
  - Radio
  - RadioGroup
  - Switch
  - NativeSelect
  - SearchField
  - PasswordField
  - FileUploader
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
  - packages/odyssey-react-mui/src/FieldHint.tsx
commit: 8df7d02d1
---

Two changes land together on field hints and error messages. MuiFormHelperText lost display: flex, justifyContent: flex-start and alignItems: center, so helper text is a normal block again rather than a centered flex row, and the .field-hint-link-component marginInlineStart rule was deleted. In FieldHint, the hint link's separator went from a non-breaking space inside a plain span to a regular space inside a styled span, and the link is now restyled to TypographyColorBody with an underline instead of Link's action color. Hint text and its link can now wrap apart from each other, sit on separate lines, and are a different color. This reaches every field that takes a hint or an errorMessage.
