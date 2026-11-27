---
summary: Image adornment in a selected-value chip is now pinned to 16px
affectedExports:
  - PickerWithOptionAdornment
files:
  - packages/core/odyssey-react-mui/src/labs/OdysseyPickers/PickerWithOptionAdornment.tsx
commit: 23e5a9988
onlyRelevantIf: a multi-select Autocomplete whose selected-value chip carries an image adornment rather than an icon
---

A `&:has(> img)` rule pins the adornment height to 16px inside the `isTagContainer` branch. Only `TagAdornment` passes `isTagContainer`, and that feeds the Autocomplete's `renderTags`, so this reaches the selected-value chip in the input. Option rows go through `OptionAdornment`, which leaves the flag false, so their adornments are unchanged. Check the size of an image or logo inside a selected chip.
