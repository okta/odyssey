---
summary: FormLabel line-height tightens, gains bottom margin
affectedExports:
  - odysseyTheme
  - PasswordInput
files:
  - packages/odyssey-react-mui/src/themes/odyssey/components.ts
commit: d91679779
onlyRelevantIf: you render Odyssey's PasswordInput, or pass odysseyTheme to MUI's own ThemeProvider
---

MuiCheckbox, MuiRadio, MuiFormControlLabel and MuiFormHelperText gained theme overrides, and MuiFormLabel changed: line height tightened from 1.42857143 to 1.14285714, a 0.57142857rem bottom margin was added, and the label colour is now pinned to text.primary in the focused, error and disabled states. Check form rows whose height or label colour you depended on, and any hover styling you applied to your own checkbox or radio rows.
