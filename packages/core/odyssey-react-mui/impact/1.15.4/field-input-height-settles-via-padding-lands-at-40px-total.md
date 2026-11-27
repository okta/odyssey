---
summary: Field input height settles via padding, lands at 40px total
affectedExports:
  - Autocomplete
  - NativeSelect
  - PasswordField
  - SearchField
  - Select
  - TextField
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: ace529ffa
---

The field height approach changed a fourth time and settles here. `MuiInputBase.input` and `MuiSelect.select` both take `height: auto` with `padding-block: calc(Spacing3 - BorderWidthMain)`, so the total including borders lands at 40px, this time by padding rather than by a fixed height. This value holds through 1.18.0. Field height is unstable across the whole run from 1.14.0 to here: set at 1.14.0, reverted at 1.15.2, set to a different value at 1.15.3, settled here. An upgrade that crosses all four nets out to almost no change, so this entry matters most to a consumer coming from 1.14.0 through 1.15.3, where the height was fixed rather than padded.
