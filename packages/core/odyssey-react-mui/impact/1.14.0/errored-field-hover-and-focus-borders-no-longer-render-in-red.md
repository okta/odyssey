---
summary: Errored field hover and focus borders no longer render in red
affectedExports:
  - Autocomplete
  - NativeSelect
  - PasswordField
  - SearchField
  - Select
  - TextField
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: d59886ed3
---

An errored field no longer shows a red border outside its resting state. `.Mui-error:hover` moved from BorderColorDangerDark to HueNeutral900, and `.Mui-error.Mui-focused` moved from BorderColorDangerControl with a danger shadow to FocusOutlineColorPrimary with a primary shadow. Check anything that relies on the red border to convey validation state on hover or focus.
