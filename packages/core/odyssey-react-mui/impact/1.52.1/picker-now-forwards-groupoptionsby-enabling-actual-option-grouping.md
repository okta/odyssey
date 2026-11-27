---
summary: Picker now forwards `groupOptionsBy`, enabling actual option grouping
affectedExports:
  - Picker
files:
  - packages/core/odyssey-react-mui/src/labs/OdysseyPickers/Picker.tsx
commit: cf09297f8
onlyRelevantIf: a Picker already being passed `groupOptionsBy`, which was previously accepted and ignored
---

`groupOptionsBy` is now forwarded, so option grouping actually happens and the listbox gains group headers and nested list structure. `PickerWithOptionAdornment` already forwarded it, so only `Picker` changes. Check option list layout and height where that prop was being set.
