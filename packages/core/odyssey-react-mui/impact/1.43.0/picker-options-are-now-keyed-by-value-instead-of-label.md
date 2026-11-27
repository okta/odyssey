---
summary: Picker options are now keyed by value instead of label
affectedExports:
  - Picker
  - PickerWithOptionAdornment
files:
  - packages/core/odyssey-react-mui/src/labs/OdysseyPickers/Picker.tsx
  - packages/core/odyssey-react-mui/src/labs/OdysseyPickers/PickerWithOptionAdornment.tsx
  - packages/core/odyssey-react-mui/src/labs/OdysseyPickers/SearchDropdown.tsx
commit: 557d27bcb
onlyRelevantIf: impact depends on the consumer's own option data, specifically whether two options share a label
---

Picker and PickerWithOptionAdornment options are now keyed by option value rather than option label, so options that share a label no longer collide during reconciliation. SearchDropdown is fixed in the same commit: its key moved off the inner `<Option>` and onto the `<CustomOption>` that `renderOption` returns, which is the only element MUI's listbox reads a key from, so its list had been falling back to index order. Check option lists with duplicate labels, where the rendered order and which option appears selected can both change.
