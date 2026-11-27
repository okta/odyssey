---
summary: Field input height becomes fixed again, about 38px
affectedExports:
  - Autocomplete
  - NativeSelect
  - PasswordField
  - SearchField
  - Select
  - TextField
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: dfdc23a8c
---

The `MuiInputBase` inner input went from `height: auto` to `calc(Spacing7 - 2 * BorderWidthMain)`, which is about 38px. This is the token the 1.14.0 comment had claimed all along; Spacing4 was used there by mistake. Field heights become fixed again for one release. Field height is unstable across this whole run: set at 1.14.0, reverted at 1.15.2, set again here, and settled at 1.15.4. An upgrade that crosses all four nets out to almost no change.
