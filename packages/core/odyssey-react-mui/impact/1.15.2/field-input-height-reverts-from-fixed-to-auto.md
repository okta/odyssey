---
summary: Field input height reverts from fixed to auto
affectedExports:
  - Autocomplete
  - NativeSelect
  - PasswordField
  - SearchField
  - Select
  - TextField
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: dbe1c8538
---

The `MuiInputBase` inner input height set at 1.14.0 was reverted to `auto`, so inputs size to their padding again after nine releases at roughly 14px. Check field heights and anything laid out beside a field. Field height is unstable across this whole run: set at 1.14.0, reverted here, set to a different value at 1.15.3, and settled at 1.15.4. An upgrade that crosses all four nets out to almost no change.
