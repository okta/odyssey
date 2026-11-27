---
summary: Field helper text top margin shrinks from `Spacing2` to `Spacing1`
affectedExports:
  - TextField
  - PasswordField
  - SearchField
  - Select
  - NativeSelect
  - Autocomplete
  - CheckboxGroup
  - RadioGroup
  - Switch
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8e9c3346f
onlyRelevantIf: a field renders hint or error text
---

The `MuiFormHelperText` top margin dropped from Spacing2 to Spacing1, so every hint and error line sits closer to the control above it. The commit subject names only the checkbox, but the rule is the shared helper-text override and reaches every field that renders a hint or an error. Each hint or error line moves up by 0.28571429rem, the difference between Spacing2 and Spacing1, so the effect is easiest to see on one page holding several of these fields at once: a long form with a hint under every control loses that much height per control. Check form height and any layout measured against a fixed field height.
