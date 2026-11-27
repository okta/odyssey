---
summary: Form label rows switch center to baseline alignment, shifting optional indicator
affectedExports:
  - Autocomplete
  - CheckboxGroup
  - DatePicker
  - DateTimePicker
  - FileUploader
  - GroupPicker
  - NativeSelect
  - PasswordField
  - RadioGroup
  - SearchField
  - Select
  - Switch
  - TextField
files:
  - packages/core/odyssey-react-mui/src/theme/components/Form.tsx
commit: 67174a352
---

Form label rows changed from center to baseline alignment. The optional indicator is a smaller type size than the label, so it shifts on single-line labels too, not only wrapped ones. Checkbox is not reached, because it renders a form control label rather than a form label. Check label rows with wrapped text and label rows mixing type sizes.
