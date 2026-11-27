---
summary: IconButton gains border radius, hover background, and focus ring
affectedExports:
  - PasswordField
  - SearchField
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: aa29acad5
---

MuiIconButton previously had nothing but padding. It now has BorderRadiusMain, a HueNeutral100 hover background, and a two-layer `focus-visible` ring (white then PalettePrimaryMain) with `outline: 2px solid transparent`. This reaches a PasswordField's show and hide toggle and a SearchField's clear button. Dialog's close button, Toast's dismiss button and DataTable's row action trigger use Button or MenuButton instead, and TextField uses InputAdornment, so those are unaffected. Check icon buttons sitting on a non-white background, where the hover fill is now visible.
